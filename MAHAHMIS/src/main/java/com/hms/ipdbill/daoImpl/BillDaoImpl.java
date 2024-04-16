package com.hms.ipdbill.daoImpl;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.SimpleExpression;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

//import sun.nio.cs.ext.Big5;

import com.hms.ehat.controller.RegistrationController;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillMasterDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.ComAdvbifergationDto;
import com.hms.ehat.dto.CommonadvDto;
import com.hms.ehat.dto.ConfigurServicesDto;
import com.hms.ehat.dto.EhatBillPrefix;
import com.hms.ehat.dto.EhatOtherBillDetailForOpdDto;
import com.hms.ehat.dto.FinanceReportAmtDto;
import com.hms.ehat.dto.LabRequestDTO;
import com.hms.ehat.dto.LabRequestSlaveDTO;
import com.hms.ehat.dto.LabTestResultDto;
import com.hms.ehat.dto.MultiBulkReceiptMasterDTO;
import com.hms.ehat.dto.PercentSlaveDto;
import com.hms.ehat.dto.ProfessionalFeesDto;
import com.hms.ehat.dto.RadiologyFileMasterDTO;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.dto.TokenDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipdbill.dao.BillDao;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.BillReceiptSlaveDTO;
import com.hms.ipdbill.dto.BillRefundMasterDTO;
import com.hms.ipdbill.dto.BillRefundSlaveDTO;
import com.hms.ipdbill.dto.BulkSettledDetailsDto;
import com.hms.ipdbill.dto.BulkSettlementMasterDTO;
import com.hms.ipdbill.dto.BulkSettlementMultiSpsrViewDTO;
import com.hms.ipdbill.dto.BulkSettlementSlaveDTO;
import com.hms.ipdbill.dto.BulkSettlementViewDTO;
import com.hms.ipdbill.dto.MultiBillReceiptMasterDTO;
import com.hms.opdbill.dao.OpdBillDao;
import com.hms.opdbill.dto.PatientHeaderInfoDto;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.BankMaster;
import com.hms.utility.ApplicationContextUtils;
//import com.sun.org.omg.CORBA.ParameterMode;
import com.hms.utility.SendSMSNoble;


@Repository
public class BillDaoImpl implements BillDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	OpdBillDao obobj;
	
	
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	public int getCurrentRecId(String tblName,Session session,Integer deptId){
			
		int maxId=0;
		
		try {
			
			String sqlRef="select ifnull(max(receipt_count),0) from "+tblName+" where department_id="+deptId;
			Query refQuery = session.createSQLQuery(sqlRef);
			maxId = ((Number)refQuery.uniqueResult()).intValue();
		}catch (Exception e) {
			
			e.printStackTrace();			
			return 0;
		}
		return (maxId+1);
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@SuppressWarnings("unchecked")
	public int saveBillDetails(String masterIdsChecked,String servIdsChecked,Integer refDocId,BillReceiptMasterDTO billRecMaster,String multiPayDetails){	
		
		Integer maxReceiptId=0;		
		Session session = sessionFactory.openSession(); // create session object from the session factory
		session.beginTransaction(); // initialize the transaction object from session
		
		String sqlBill="select department_id FROM ehat_treatment where treatment_id="+billRecMaster.getTreatmentId();
		Query deptQuery = session.createSQLQuery(sqlBill);		
		Integer deptId = (Integer) deptQuery.uniqueResult();
		
		String sqlCaseType="select case_type FROM ehat_treatment where treatment_id="+billRecMaster.getTreatmentId();
		Query caseTypeQuery = session.createSQLQuery(sqlCaseType);		
		Integer caseType = (Integer) caseTypeQuery.uniqueResult();
		
		int curRecId=getCurrentRecId("ehat_receipt_master",session,deptId);
		ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		int cmnAdvcPaymodeId =Integer.parseInt(resourceBundle.getObject("cmnAdvcPaymodeId").toString());
		int creditPaymodeId =Integer.parseInt(resourceBundle.getObject("creditPaymodeId").toString());
		
		ResourceBundle resource2 = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName2 = resource2.getObject("hospitalname").toString();
		
		
				
		int cmdchk=0;
		Double totComAdvcNew =0.0;
		try {
			MultiBillReceiptMasterDTO billDto = (MultiBillReceiptMasterDTO) ConfigUIJSONUtility
		            .getObjectFromJSON(multiPayDetails, MultiBillReceiptMasterDTO.class);		
					
			int billId=0,patientId=0,departId=0,sourceTypeId=0,lastCredit=0,distributeFlag=0;
			double totAmt=0,totDisc=0,totQty=0;	
			
			String doctorIds="",compName="";
			List<BillReceiptSlaveDTO> listBillReceiptSlave=new ArrayList<BillReceiptSlaveDTO>();
			
			BillReceiptMasterDTO billMaster = new BillReceiptMasterDTO();
			
			ArrayList<Integer> masterChecked=new ArrayList<Integer>();			
			String[] mstIds;
			ArrayList<Integer> slaveChecked=new ArrayList<Integer>();			
			String[] servIds;
						
			// get checked service masters
			if(masterIdsChecked.length()>0){
				
				mstIds=masterIdsChecked.split(",");
				for(String id:mstIds){
					
					masterChecked.add(Integer.parseInt(id));					
				}
			}
			// get checked service slaves
			if(servIdsChecked.length()>0){
				
				servIds=servIdsChecked.split(",");
				for(String id:servIds){
					
					slaveChecked.add(Integer.parseInt(id));					
				}
			}			
		
			Criteria criteriaRec = session.createCriteria(BillReceiptMasterDTO.class);			
			criteriaRec.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));	
			criteriaRec.setProjection(Projections.rowCount());			
			
			long count = (Long)criteriaRec.uniqueResult();
			
			Integer pid=0;
			if(billRecMaster.getPayMode()==cmnAdvcPaymodeId){
				pid =(Integer) sessionFactory.getCurrentSession().createSQLQuery("SELECT patient_id FROM ehat_treatment where treatment_id='"+ billRecMaster.getTreatmentId()+"'").uniqueResult();
           if (pid==null){
        	   pid=0;
           }
				Criteria criteria = session.createCriteria(CommonadvDto.class);
			//	criteria.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
				criteria.add(Restrictions.eq("patient_ID", pid));

		    	criteria.add(Restrictions.eq("deleted", "N"));
		    	SimpleExpression dept1 = Restrictions.eq("departmentId", 11); // for all 
				SimpleExpression dept2 = Restrictions.eq("departmentId", deptId);
				
				criteria.add(Restrictions.or(dept1, dept2));
		    	
		    	//criteria.setProjection(Projections.sum("commonadv_amnt"));
		    	criteria.setProjection(Projections.sum("remaining_amnt"));
		    	totComAdvcNew	 = (Double) criteria.uniqueResult();
		    	 //chk by cadvacned for patien is null or noamount 	
		    	if( totComAdvcNew==null   ){
		    		cmdchk =-2;//no amount
		    		maxReceiptId  =-2;//no amount
			}else if(totComAdvcNew==0.0 ){

	    		cmdchk =-2;//no amount
	    		maxReceiptId  =-2;//no amount
		
			}else if(totComAdvcNew==0){

	    		cmdchk =-2;//no amount
	    		maxReceiptId  =-2;//no amount
		
			}else
		//end
		    	if(totComAdvcNew<billRecMaster.getTotalPaid()){
		    		
		    		cmdchk =-2;//no amount
		    		maxReceiptId  =-2;//no amount
		    		
		    	}
			}
			
			
			if(billRecMaster.getPayMode() == creditPaymodeId){
				
				billRecMaster.setTotalRemain(billRecMaster.getTotalPaid());
				billRecMaster.setTotalPaid(0);
			}
			
			
		//chk coomanadv is applible or not	
			if(cmdchk != -2){
				if(count > 0 && billRecMaster.getAgainstId() > 0){
					
					Criteria criteriaRecDetails = session.createCriteria(BillReceiptMasterDTO.class);			
					criteriaRecDetails.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));					
					criteriaRecDetails.add(Restrictions.eq("billReceiptId", billRecMaster.getAgainstId()));	
					
					List<BillReceiptMasterDTO> listRecDetails = (List<BillReceiptMasterDTO>) criteriaRecDetails.list();
					for(BillReceiptMasterDTO obj:listRecDetails){
											
						// set receipt master 	
						billMaster.setReceiptCount(curRecId);
						billMaster.setUnitId(obj.getUnitId());
						billMaster.setTreatmentId(obj.getTreatmentId());
						billMaster.setPatientId(obj.getPatientId());
						billMaster.setBillId(obj.getBillId());				
						billMaster.setDepartmentId(obj.getDepartmentId());
						billMaster.setReceiptOf(billRecMaster.getReceiptOf());
						billMaster.setCreatedBy(billRecMaster.getCreatedBy());
						billMaster.setCreatedDateTime(new Date());
						billMaster.setSourceTypeId(sourceTypeId);
						billMaster.setDeleted("N");
						billMaster.setPayMode(billRecMaster.getPayMode());
						billMaster.setbNumber(billRecMaster.getbNumber());
						billMaster.setbName(billRecMaster.getbName());	
						billMaster.setBatchNumber(billRecMaster.getBatchNumber());
						
						
						billMaster.setTotalAmt(billRecMaster.getTotalAmt());							
						billMaster.setDiscGivenBy(billRecMaster.getDiscGivenBy());
						billMaster.setDiscNarrtn(billRecMaster.getDiscNarrtn());
						billMaster.setDiscRemark(billRecMaster.getDiscRemark());
						billMaster.setTotalQty(1);
						billMaster.setTotalPaid(billRecMaster.getTotalPaid());// payable
						billMaster.setAccountStatusOpdDiagno("N");		
						// for profees
						totAmt=billRecMaster.getTotalAmt();
						billMaster.setActualAmt(totAmt);
						billMaster.setActualTotConcn(totDisc);
						if(totDisc>0){
							
							billMaster.setActualConPer((totDisc*100)/totAmt);
						}else{
							
							billMaster.setActualConPer(0);
						}
						
						billMaster.setActualPayable(totAmt-totDisc);
						billMaster.setActualDiscPer(billRecMaster.getTotalDisc());
						
						double payable=0;
						double amt=0;
						if(billRecMaster.getTotalDisc()>0){
							
							/*amt=((totAmt-totDisc)*billRecMaster.getTotalDisc())/100;
							payable=totAmt-(totDisc+amt);*/
							payable=totAmt-(totDisc+billRecMaster.getFirstDisc());
						
							
						//added by vishant	
						if(hospitalName2.equalsIgnoreCase("Siddhivinayak"))	{
							//for discount approval
							billMaster.setTotalDisc(0);
							//added by vishant
							billMaster.setDiscountApprovelAmt(billRecMaster.getFirstDisc());
							billMaster.setDiscountStatus("Y");
							billMaster.setDiscountFrom(billRecMaster.getDiscountFrom());
						}else {
							billMaster.setTotalDisc(billRecMaster.getFirstDisc());
							
						}
							
							
							
							
							
						}else{
							
							payable=(totAmt-totDisc);
							billMaster.setTotalDisc(0);
						}								
						billMaster.setPayable(payable);							
						billMaster.setTotalRemain(payable-(billRecMaster.getTotalPaid()));
							
						billMaster.setAgainstId(obj.getBillReceiptId());
						billMaster.setSourceTypeId(billRecMaster.getSourceTypeId());
						billMaster.setSponsorCatId(billRecMaster.getSponsorCatId());
						
						billMaster.setPayeeTypeId(billRecMaster.getPayeeTypeId());
						billMaster.setPayeeMainId(billRecMaster.getPayeeMainId());
						billMaster.setPayeeLeafId(billRecMaster.getPayeeLeafId());
						
						if(billMaster.getTotalRemain()>0){
							
							billMaster.setReceiptStatus("unpaid");
														
						}else{
							
							billMaster.setReceiptStatus("paid");
							lastCredit=1;
						
						}
						
						billMaster.setFirstPaid(billRecMaster.getTotalPaid());
						
						if(!hospitalName2.equalsIgnoreCase("Siddhivinayak"))	{	
							billMaster.setFirstDisc(billRecMaster.getFirstDisc());
						}
						
						billMaster.setFirstRemain(payable-billRecMaster.getTotalPaid());
												
						// update credit flag of receipt which is against id
						BillReceiptMasterDTO objectToUpdate = (BillReceiptMasterDTO) session.get(BillReceiptMasterDTO.class, billRecMaster.getAgainstId());
						objectToUpdate.setCreditFlag("Y");
												
						// Save Master list
						session.merge(billMaster);
											 
						// set receipt slave
						BillReceiptSlaveDTO slave=new BillReceiptSlaveDTO();
						slave.setUnitId(billRecMaster.getUnitId());				
						slave.setTreatmentId(billRecMaster.getTreatmentId());
						slave.setPatientId(obj.getPatientId());
						slave.setBillId(obj.getBillId());						
						slave.setDepartmentId(obj.getDepartmentId());
						slave.setCreatedBy(billRecMaster.getCreatedBy());
						slave.setCreatedDateTime(new Date());
						
						// to get only date from dateTime
						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
						Date assignDate = sdf.parse(sdf.format(new Date()));
						patientId = obj.getPatientId();
						slave.setServiceAssignDate(assignDate);					
						slave.setSourceTypeId(billRecMaster.getSponsorCatId());
						slave.setDoctorId(0);
						slave.setServiceId(0);
						slave.setSubServiceId(0);						
						slave.setRate(obj.getTotalRemain());
						slave.setAmount(obj.getTotalRemain());
						slave.setDiscount(billRecMaster.getTotalDisc());
						slave.setQuantity(1);
						slave.setPaid(billRecMaster.getTotalPaid());
						slave.setRemain(0);
											
						// for profees						
						slave.setActualDiscPer(billRecMaster.getTotalDisc());	
						slave.setActualAmt(obj.getTotalRemain());
						slave.setActualPayable(obj.getTotalRemain());
						double disc=((obj.getTotalRemain())*billRecMaster.getTotalDisc())/100;
						slave.setActualDiscAmt(disc);
						slave.setActualFinalPayable((obj.getTotalRemain())-disc);
						slave.setActualFinalPaid((obj.getTotalRemain())-disc);
						// for profees											
					
						slave.setCompName(obj.getReceiptCount().toString());	
						slave.setAgainstId(obj.getReceiptCount());	
						listBillReceiptSlave.add(slave);					
					}
									
					// Get max master id
					Criteria criteriaMax = session.createCriteria(BillReceiptMasterDTO.class).setProjection(Projections.max("billReceiptId"));
					maxReceiptId = (Integer) criteriaMax.uniqueResult();
					
					if (maxReceiptId == null) {
			
						maxReceiptId = 0;
					}				
				
					// Calling stored procedure for get super master of receipt
					Query query2 = session.createSQLQuery("CALL fetchSuperReceiptId (:receiptId)").setParameter("receiptId", maxReceiptId);
					Integer superRecId = (Integer) query2.uniqueResult();
												
					// Set all credit receipts status paid if remain 0
					if(lastCredit==1){
											
						// Calling stored procedure
						Query query = session.createSQLQuery("CALL fetchCreditReceiptIds (:receiptId)").setParameter("receiptId", maxReceiptId);
						String result = (String) query.uniqueResult();
						String[] creditIds = result.split(",");
			
						for (int i = 0; i < creditIds.length; i++) {
							
							BillReceiptMasterDTO objectToUp = (BillReceiptMasterDTO) session.get(BillReceiptMasterDTO.class, Integer.parseInt(creditIds[i]));
							objectToUp.setReceiptStatus("paid");								
						}										
			
						BillReceiptMasterDTO objectToUp = (BillReceiptMasterDTO) session.get(BillReceiptMasterDTO.class, superRecId);
						objectToUp.setTotalRemain(0);				
						objectToUp.setTotalPaid(objectToUp.getTotalAmt());		
						
					}				
						
					// Query for get details amounts of super master
					double actualTotalAmt=0;
					double actualTotalPaid=0;
					double actualTotalDisc=0;
					double actualTotalCon=0;
					double actualTotalRefund=0;
					List<BillReceiptSlaveDTO> lstRecSlave=new ArrayList<BillReceiptSlaveDTO>();
					String sql2="select actual_amt,total_paid,total_discount,actual_tot_concn from ehat_receipt_master where bill_receipt_id="+superRecId+" "; 
					SQLQuery getMaster = session.createSQLQuery(sql2);
					getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
					List<Map<String, Object>> masterRow = getMaster.list();
				          
				    for(Map<String, Object> row : masterRow){
			    		
				    	actualTotalAmt=(Double)row.get("actual_amt");
				    	actualTotalPaid=(Double)row.get("total_paid");
				    	actualTotalDisc=(Double)row.get("total_discount");
				    	actualTotalCon=(Double)row.get("actual_tot_concn");
				    	//actualTotalRefund=(Double)row.get("refund_amt");
			    	}
				    				    
				    String sql3="select bill_details_id,actual_amt from ehat_receipt_slave where bill_receipt_master_id="+superRecId+" "; 
					SQLQuery getSlave = session.createSQLQuery(sql3);
					getSlave.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			  
					List<Map<String, Object>> lstSlave = getSlave.list();
				          
				    for(Map<String, Object> row : lstSlave){
			    		
				    	BillReceiptSlaveDTO obj=new BillReceiptSlaveDTO();
				    	obj.setBillDetailsId((Integer)row.get("bill_details_id"));
				    	obj.setActualAmt((Double)row.get("actual_amt"));			    	
				    	lstRecSlave.add(obj);
				    	obj=null;
			    	}			    
				   
				    //distributePaidBySlave(superRecId, lstRecSlave, actualTotalAmt, (actualTotalPaid+billRecMaster.getTotalPaid()),session);
								    
				    double actualTotRemain=actualTotalAmt-(actualTotalPaid+billRecMaster.getTotalPaid()+actualTotalDisc+billMaster.getTotalDisc()+actualTotalCon);
				    
					BillReceiptMasterDTO objectToUp = (BillReceiptMasterDTO) session.get(BillReceiptMasterDTO.class, superRecId);
					objectToUp.setTotalDisc(actualTotalDisc+billMaster.getTotalDisc());			
					objectToUp.setTotalRemain(actualTotRemain);				
					objectToUp.setTotalPaid(actualTotalPaid+billRecMaster.getTotalPaid());	
					
					distributeFlag=1;
					
				}else{			
					
					int depId=1;
					int unitId=billRecMaster.getUnitId();
					
					ArrayList<Integer> sIds11=new ArrayList<Integer>();
			      	String[] servIds1 = null;
					String servIds2=null;
					String sql2="select IFEMPTY(service_id, '0') as service_id from users where User_ID="+billRecMaster.getCreatedBy()+" and " 
				 			+ "(dept_id = "+depId+" OR dept_id LIKE '"+depId+",%' OR dept_id LIKE '%,"+depId+",%' OR dept_id LIKE '%,"+depId+"') and " 
				 			+ "(unitmaster_id = "+unitId+" OR unitmaster_id LIKE '"+unitId+",%' OR unitmaster_id LIKE '%,"+unitId+",%' OR unitmaster_id LIKE '%,"+unitId+"')"; 
			        SQLQuery query2 = session.createSQLQuery(sql2);
			        query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);	           
					List<Map<String, Object>> data2 = query2.list();
			      
			        if(query2.list().isEmpty()){
			            	
			        }else{
			            	
			        	for(Map<String, Object> row : data2){
			        		servIds2=(String)row.get("service_id");
			        	}
			         
			        	if(servIds2.length()>0){
			        		servIds1=servIds2.split(",");
			        		for(String id:servIds1){
			        			
			        			if(masterChecked.contains(Integer.parseInt(id))){
			        				
			        				sIds11.add(Integer.parseInt(id));
			        			}			        			
			        		}
			        	}  
			        }   
					
			        ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
					String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");   
					String pharmacy_Serve_Id = (String)resourceBundleEhat.getString("pharmacy");    
					int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
					int pharmacyServId = Integer.parseInt(pharmacy_Serve_Id);
					
			        ArrayList<Integer> excludeServicesIds = new ArrayList<Integer>();
			        excludeServicesIds.add(-5);
			        excludeServicesIds.add(pharmacyInvoice);
			        excludeServicesIds.add(pharmacyServId);
			        
					Criteria criteria = session.createCriteria(BillDetailsDto.class);			
					criteria.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));	
					criteria.add(Restrictions.eq("cancle", "N"));
					criteria.add(Restrictions.eq("deleted", "N"));
					criteria.add(Restrictions.eq("paidFlag", "N"));
					criteria.add(Restrictions.not(Restrictions.in("serviceId", excludeServicesIds)));
					/*if(masterChecked.size()!=0){
						
						criteria.add(Restrictions.in("serviceId", masterChecked));
					}*/
					
					/*if(sIds11.size()!=0){
						
						criteria.add(Restrictions.in("serviceId", sIds11));
					}else{
						
						List<Integer> forReg=new ArrayList<Integer>();
						if(!sIds11.contains(1)){
							
							forReg.add(1);
						}						
						criteria.add(Restrictions.not(Restrictions.in("serviceId", forReg)));
					}*/
					
					if(billRecMaster.getPaidByCashFlag().equals("Y")){
						
						if(sIds11.size()==0){
							
							slaveChecked.add(billRecMaster.getBulkMstId());
							
						}else{
							
							if(!sIds11.contains(1)){
								
								slaveChecked.add(billRecMaster.getBulkMstId());											
							}
						}	
						
						if(slaveChecked.size()!=0){
							
							criteria.add(Restrictions.in("billDetailsId", slaveChecked));
						}
						
					}else{
						
						if(sIds11.size()==0){
							
							slaveChecked.add(billRecMaster.getBulkMstId());
							
						}else{
							
							if(!sIds11.contains(1)){
								
								slaveChecked.add(billRecMaster.getBulkMstId());											
							}
						}				
											
						if(slaveChecked.size()!=0){
							
							criteria.add(Restrictions.not(Restrictions.in("billDetailsId", slaveChecked)));
						}
					}
						
					
					List<BillDetailsDto> listBillDetails = (List<BillDetailsDto>) criteria.list();
					
					//added by vishant billRecMaster
		            //distributeTotalOpdAmount(listBillDetails,session,billRecMaster.getTotalPaid(),billRecMaster.getFirstDisc(),billRecMaster.getTotalAmt(),billRecMaster.getActualPayable());
		               
					
					int mstChrgSlaveId=billRecMaster.getSponsorCatId();
										
					for(BillDetailsDto billSlave:listBillDetails){
						
						int slaveChrgSlaveId = billSlave.getChargesSlaveId();
						
						if(mstChrgSlaveId == slaveChrgSlaveId){
				
							departId	= billSlave.getDepartmentId();
							billId		= billSlave.getBillId();
							patientId	= billSlave.getPatienttId();
							if(billRecMaster.getReceiptOf().equals("sponsor")){
								
								totAmt		= totAmt+billSlave.getOtherAmount();
								totDisc		= totDisc+billSlave.getOtherConcession();
								
							}else{
								
								totAmt		= totAmt+billSlave.getAmount();
								totDisc		= totDisc+billSlave.getConcession();						
							}
							totQty		= totQty+billSlave.getQuantity();			
							sourceTypeId= billSlave.getSourceTypeId();
							if(billSlave.getServiceId()==2){
								
								doctorIds 	= doctorIds+billSlave.getDoctorId()+",";
							}		
							
							// set receipt slave 
							BillReceiptSlaveDTO slave=new BillReceiptSlaveDTO();
							slave.setUnitId(billRecMaster.getUnitId());				
							slave.setTreatmentId(billRecMaster.getTreatmentId());
							slave.setPatientId(patientId);
							slave.setBillId(billId);						
							slave.setDepartmentId(departId);
							slave.setSourceTypeId(billSlave.getChargesSlaveId());
							
							// for profees
							slave.setActualConcnPer(billSlave.getConcessionOnPerc());
							slave.setActualDiscPer(billRecMaster.getTotalDisc());
							// added on 04-04-2024 Rohini
							
							
							Double profeesPercentage = 0.0;
							
							ResourceBundle resource = ResourceBundle.getBundle("hospitalaccess");
							String hospitalName = resource.getObject("hospitalname").toString();
							
							if(billSlave.getServiceId() != 1 && hospitalName.equalsIgnoreCase("Siddhivinayak")) {
								
								if(billSlave.getDoctorId()!= 0) {
									int chargesSlaveIdForProfees = getProfeesChargeSlaveId(billSlave.getChargesSlaveId(),billSlave.getDoctorId());
									  profeesPercentage = getProfeesPercentage(billSlave.getDoctorId(),departId,billRecMaster.getUnitId(),
											caseType,billSlave.getServiceId(),billSlave.getSubServiceId(),chargesSlaveIdForProfees);
								}					
							}
							
							if(billRecMaster.getReceiptOf().equals("sponsor")){
																	
								slave.setRate(billSlave.getOtherRate());
								slave.setAmount(billSlave.getOtherAmount());
								slave.setConcession(billSlave.getOtherConcession());	
								slave.setPaid(billSlave.getOtherAmount()-billSlave.getOtherConcession());
								
								// for profees
								slave.setActualAmt(billSlave.getOtherAmount());			
								slave.setActualConcnAmt(billSlave.getOtherConcession());
								slave.setActualPayable(billSlave.getOtherAmount()-billSlave.getOtherConcession());	
								double disc=((billSlave.getOtherAmount()-billSlave.getOtherConcession())*billRecMaster.getTotalDisc())/100;
								slave.setActualDiscAmt(disc);
								slave.setActualFinalPayable((billSlave.getOtherAmount()-billSlave.getOtherConcession())-disc);
								slave.setActualFinalPaid((billSlave.getOtherAmount()-billSlave.getOtherConcession())-disc);
								slave.setProfeesPercentage(profeesPercentage);
								// for profees
							}else{
														
								slave.setRate(billSlave.getRate());
								slave.setAmount(billSlave.getAmount());
								slave.setConcession(billSlave.getConcession());						
								slave.setPaid(billSlave.getAmount()-billSlave.getConcession());							
								
								// for profees
								slave.setActualAmt(billSlave.getAmount());
								slave.setActualConcnAmt(billSlave.getConcession());	
								slave.setActualPayable(billSlave.getAmount()-billSlave.getConcession());
								double disc=((billSlave.getAmount()-billSlave.getConcession())*billRecMaster.getTotalDisc())/100;
								slave.setActualDiscAmt(disc);
								slave.setActualFinalPayable((billSlave.getAmount()-billSlave.getConcession())-disc);
								slave.setActualFinalPaid((billSlave.getAmount()-billSlave.getConcession())-disc);
								slave.setProfeesPercentage(profeesPercentage);
								// for profees
							}
											
							slave.setQuantity(billSlave.getQuantity());
							//slave.setRemain(0);
							slave.setCreatedBy(billRecMaster.getCreatedBy());
							slave.setCreatedDateTime(new Date());
							
							// to get only date from dateTime
							SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
							Date assignDate = sdf.parse(sdf.format(billSlave.getCreatedDateTime()));
				
							slave.setServiceAssignDate(assignDate);
							//slave.setSourceTypeId(billRecMaster.getSourceTypeId());
							slave.setSpecialityId(billSlave.getSpecialityId());
							slave.setDoctorId(billSlave.getDoctorId());
							slave.setServiceId(billSlave.getServiceId());
							slave.setSubServiceId(billSlave.getSubServiceId());
							slave.setConcession(billSlave.getConcession());
							slave.setBillDetailsId(billSlave.getBillDetailsId());
							
							if(slave.getServiceId()==1){
								
								compName="Registration Charges";
								
							}else{
								
								Criteria criteriaCompName = session.createCriteria(SubServiceDto.class);			
								criteriaCompName.add(Restrictions.eq("subId", billSlave.getSubServiceId()));	
								criteriaCompName.add(Restrictions.eq("deleted", "N"));
								List<SubServiceDto> listCompNames = (List<SubServiceDto>) criteriaCompName.list();
								for(SubServiceDto bojComp:listCompNames){
									
									compName=bojComp.getCategoryName();
								}
							}
							
							slave.setCompName(compName);
							listBillReceiptSlave.add(slave);
							slave=null;	
							
						}
					}
					
					// set receipt master 		
					billMaster.setReceiptCount(curRecId);
					billMaster.setUnitId(billRecMaster.getUnitId());
					billMaster.setTreatmentId(billRecMaster.getTreatmentId());
					billMaster.setPatientId(patientId);
					billMaster.setBillId(billId);				
					billMaster.setDepartmentId(departId);
					billMaster.setReceiptOf(billRecMaster.getReceiptOf());				
					billMaster.setTotalAmt(totAmt-totDisc);				
					billMaster.setDiscGivenBy(billRecMaster.getDiscGivenBy());
					billMaster.setDiscNarrtn(billRecMaster.getDiscNarrtn());
					billMaster.setDiscRemark(billRecMaster.getDiscRemark());
					billMaster.setTotalQty(totQty);
					billMaster.setTotalPaid(billRecMaster.getTotalPaid());								
					billMaster.setCreatedBy(billRecMaster.getCreatedBy());
					billMaster.setCreatedDateTime(new Date());			
					billMaster.setDeleted("N");
					billMaster.setPayMode(billRecMaster.getPayMode());
					billMaster.setbNumber(billRecMaster.getbNumber());
					billMaster.setbName(billRecMaster.getbName());
					billMaster.setBatchNumber(billRecMaster.getBatchNumber());	
					billMaster.setSourceTypeId(billRecMaster.getSourceTypeId());
					billMaster.setSponsorCatId(billRecMaster.getSponsorCatId());
					
					billMaster.setPayeeTypeId(billRecMaster.getPayeeTypeId());
					billMaster.setPayeeMainId(billRecMaster.getPayeeMainId());
					billMaster.setPayeeLeafId(billRecMaster.getPayeeLeafId());
					
					// for profees
					billMaster.setActualAmt(totAmt);
					billMaster.setActualTotConcn(totDisc);
					if(totDisc>0){
						
						billMaster.setActualConPer((totDisc*100)/totAmt);
					}else{
						
						billMaster.setActualConPer(0);
					}
					
					billMaster.setActualPayable(totAmt-totDisc);
					billMaster.setActualDiscPer(billRecMaster.getTotalDisc());
					
					double payable=0;
					double amt=0;
					if(billRecMaster.getTotalDisc()>0){
						
						/*amt=((totAmt-totDisc)*billRecMaster.getTotalDisc())/100;
						payable=totAmt-(totDisc+amt);*/
						payable=totAmt-(totDisc+billRecMaster.getFirstDisc());
						
						if(hospitalName2.equalsIgnoreCase("Siddhivinayak"))	{
							billMaster.setTotalDisc(0);
							
						}else {
							billMaster.setTotalDisc(billRecMaster.getFirstDisc());
						}
						
//						
					}else{
						
						payable=(totAmt-totDisc);
						billMaster.setTotalDisc(0);
					}								
					billMaster.setPayable(payable);
					
					billMaster.setTotalRemain(payable-billRecMaster.getTotalPaid());
					
					// for profees				
					
					if(billMaster.getTotalRemain()>0){
						
						billMaster.setReceiptStatus("unpaid");
						distributeFlag=1;
					}else{
						
						billMaster.setReceiptStatus("paid");
					}	
					
					billMaster.setFirstPaid(billRecMaster.getTotalPaid());
					if (hospitalName2.equalsIgnoreCase("Siddhivinayak")) {
						if (billRecMaster.getDiscountStatus().equalsIgnoreCase("Y")) {
							billMaster.setDiscountApprovelAmt(billRecMaster.getFirstDisc());
							billMaster.setDiscountFrom(billRecMaster.getDiscountFrom());
							billMaster.setDiscountStatus(billRecMaster.getDiscountStatus());
						}
					}else {
						billMaster.setFirstDisc(billRecMaster.getFirstDisc());
					}
					
					billMaster.setFirstRemain(payable-billRecMaster.getTotalPaid());
					
					billMaster.setPaidByCashFlag(billRecMaster.getPaidByCashFlag());		
					billMaster.setPaidByCashServices(billRecMaster.getPaidByCashServices());
					
					// Save Master list
					session.merge(billMaster);	
												
				}
				
				// Get max master id
				Criteria criteriaMax = session.createCriteria(BillReceiptMasterDTO.class)
						.setProjection(Projections.max("billReceiptId"));
				maxReceiptId = (Integer) criteriaMax.uniqueResult();
				if (maxReceiptId == null) {
			
					maxReceiptId = 0;
				}		
				
				
				int multiPaymodeId =Integer.parseInt(resourceBundle.getObject("multiPaymodeId").toString());
				
				// Save Multiple pay mode list
				if(billRecMaster.getPayMode()==multiPaymodeId){
					
					saveMultiPayMode(maxReceiptId,billMaster,billDto.getListMultiBillReceiptMaster(),session);
				}			
							
			
				// Save Multiple pay mode list
				if(billRecMaster.getPayMode()==cmnAdvcPaymodeId){
					
				
			//end
	// Save Master list
						if(billRecMaster.getPayMode()==cmnAdvcPaymodeId){
							Criteria criteria1 = session.createCriteria(CommonadvDto.class);
							criteria1.add(Restrictions.eq("patient_ID", patientId));
					//		criteria1.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
							criteria1.add(Restrictions.eq("paidflag", "N"));
					    	criteria1.add(Restrictions.eq("deleted", "N"));
					    	SimpleExpression dept1 = Restrictions.eq("departmentId", 11); // for all 
							SimpleExpression dept2 = Restrictions.eq("departmentId", deptId);
							
							criteria1.add(Restrictions.or(dept1, dept2));
					    	criteria1.addOrder(Order.asc("commonadv_id"));
					    	List<CommonadvDto> listcdav	 = criteria1.list();
					    	//Session session = session;
					//		String hql = "UPDATE CommonadvDto set  deduct_amnt  =:deamt ,remaining_amnt  =:reamt ,paidflag =:paidflag WHERE treatmentId =:trid and  commonadv_id =:cadid ";
							String hql = "UPDATE CommonadvDto set  deduct_amnt  =:deamt ,remaining_amnt  =:reamt ,paidflag =:paidflag WHERE patient_ID =:pid and  commonadv_id =:cadid ";

					    	Query query = session.createQuery(hql);
							int pay=0;
							double paodamount=billRecMaster.getTotalPaid();
					    	for(CommonadvDto cd: listcdav){
					    		
					    	double camunt =	cd.getRemaining_amnt();
					    	
					    	if(camunt != 0.0 || camunt != 0){

					    		if(camunt < paodamount){
					    			ComAdvbifergationDto cadvbi = new ComAdvbifergationDto();
										
					    			paodamount =	paodamount - camunt;//00
					    			double deamt = camunt + cd.getDeduct_amnt();
					    			query.setParameter("deamt",deamt); 
					    			query.setParameter("reamt",0.0); 
					    			query.setParameter("paidflag", "Y");
								//	query.setParameter("trid",billRecMaster.getTreatmentId());
					    			query.setParameter("pid",patientId);
                        			query.setParameter("cadid", cd.getCommonadv_id());
									
									query.executeUpdate();
									
									cadvbi.setAmount(camunt);
									cadvbi.setCadvid( cd.getCommonadv_id());
									cadvbi.setReceipt_id(maxReceiptId);
									
									session.merge(cadvbi);
					    		}else{
					    			if(pay==0){
					    				ComAdvbifergationDto cadvbi = new ComAdvbifergationDto();
										
						    			double deamt=paodamount;
						    			paodamount = camunt - paodamount;//
						    			
						    			query.setParameter("deamt",(deamt + cd.getDeduct_amnt())); 
						    			query.setParameter("reamt",paodamount);
						    			query.setParameter("paidflag", "N");  
									//	query.setParameter("trid",billRecMaster.getTreatmentId());  
						    			query.setParameter("pid",patientId);
						    			query.setParameter("cadid", cd.getCommonadv_id());
										query.executeUpdate();
										cadvbi.setAmount(deamt);
										cadvbi.setCadvid(cd.getCommonadv_id());
										cadvbi.setReceipt_id(maxReceiptId);
										
								    	session.merge(cadvbi);
								    	pay=1;
								    //	break;
					    			}
					    			
					    		}
					    			
					    	}
					    		
					    }
							
							
						
					}
					
				/*	
					Criteria criteria = session.createCriteria(CommonadvDto.class);
					criteria.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
			    	criteria.add(Restrictions.eq("deleted", "N"));
			    	criteria.setProjection(Projections.sum("commonadv_amnt"));
			    	double totComAdvc = (Double) criteria.uniqueResult();
					
			    	if(totComAdvc<billRecMaster.getTotalPaid()){
			    		
			    		maxReceiptId=-2;
			    		
			    	}else{
			    		
			    		totComAdvc=totComAdvc-billRecMaster.getTotalPaid();
			    	}*/
			    	
					//Session session = session;
					/*String hql = "UPDATE CommonadvDto set commonadv_amnt =:amt WHERE treatmentId =:trid";
					Query query = session.createQuery(hql);
					query.setParameter("amt",totComAdvc);  
					query.setParameter("trid",billRecMaster.getTreatmentId());  
					query.executeUpdate();*/
				}						
				
				// Save Slave list
				getSlaveList(maxReceiptId,billRecMaster.getAgainstId(),listBillReceiptSlave,session,billRecMaster.getSponsorCatId());
				
				// Distrubute paid amount of slave of remain > 0
				//if(distributeFlag==1){
							
				if(billRecMaster.getPaidByCashFlag().equals("N")){
				
					setOpdRecMasterSlave(maxReceiptId,billRecMaster.getAgainstId(),billRecMaster.getDiscountFrom(),session);
				}
					
					//distributePaidBySlave(maxReceiptId, listBillReceiptSlave, totAmt, billRecMaster.getTotalPaid(),session);
				//}	
			}
				
			session.getTransaction().commit(); // commit the transaction
			session.close();
			
			//Save Generated Token no
			saveGeneratedTokenNo(billRecMaster.getTreatmentId());
			
			// Set bill master totals
			if(billRecMaster.getPaidByCashFlag().equals("N")){
				
			//	setBillMasterTotalsForOpd(billRecMaster.getTreatmentId());
				setMultiSponsorTotalsForOpd(billRecMaster);
			}else{
				
				if(billRecMaster.getPaidByCashFlag().equals("Y")){
					
					ArrayList<Integer> alPaid=new ArrayList<Integer>();
					String[] cashIds = null;
					// get checked service masters
					if(billRecMaster.getPaidByCashServices().length()>0){
						
						if(billRecMaster.getPaidByCashServices().contains(",")){
							
							cashIds=billRecMaster.getPaidByCashServices().split(",");
							for(String id:cashIds){
								
								alPaid.add(Integer.parseInt(id));
								// Update amount in multiSponsor start
								String hqlForMultiSponsr = "UPDATE BillDetailsDto set paidByCashFlag =:paidByCashFlag WHERE billDetailsId =:billDetailsId";
								Query queryForMultiSponsr = sessionFactory.getCurrentSession().createQuery(hqlForMultiSponsr);
								//queryForMultiSponsr.setDate("updatedDateTime",new Date(new java.util.Date().getTime()));
								queryForMultiSponsr.setParameter("paidByCashFlag","Y");  
								queryForMultiSponsr.setParameter("billDetailsId",Integer.parseInt(id));  						
								queryForMultiSponsr.executeUpdate();	
							}
						}else{
							
							alPaid.add(Integer.parseInt(billRecMaster.getPaidByCashServices()));
							// Update amount in multiSponsor start
							String hqlForMultiSponsr = "UPDATE BillDetailsDto set paidByCashFlag =:paidByCashFlag WHERE billDetailsId =:billDetailsId";
							Query queryForMultiSponsr = sessionFactory.getCurrentSession().createQuery(hqlForMultiSponsr);
							//queryForMultiSponsr.setDate("updatedDateTime",new Date(new java.util.Date().getTime()));
							queryForMultiSponsr.setParameter("paidByCashFlag","Y");  
							queryForMultiSponsr.setParameter("billDetailsId",Integer.parseInt(billRecMaster.getPaidByCashServices()));  						
							queryForMultiSponsr.executeUpdate();	
						}							
					}										
				}
			}			
			
		} catch (Exception e) {
			
			e.printStackTrace();
			session.getTransaction().rollback();
			return 0;
		}
		// Update ivf_pay_flag in ehat_treatment
		String hql="UPDATE TreatmentDto set ivfPayFlag='Y'  where treatmentId="+billRecMaster.getTreatmentId()+" ";
		Query q=  sessionFactory.getCurrentSession().createQuery(hql);
		q.executeUpdate();
		//
		
		// added for send sms 
		   		 
		 ResourceBundle resource1 = ResourceBundle.getBundle("Ehat");
		 String meesha = (String) resource1.getObject("meesha").toString();
		 if(meesha.equalsIgnoreCase("on")) {
			 
			 String sqlCount="select count(*) from ehat_receipt_master where treatment_id="+ billRecMaster.getTreatmentId()+" and deleted='N' ";      
			   SQLQuery	qCount= sessionFactory.getCurrentSession().createSQLQuery(sqlCount);
			   int countReceipt=((Number) qCount.uniqueResult()).intValue();
			 if(countReceipt == 1 ) {
				Query querySp =  sessionFactory.getCurrentSession().createSQLQuery("call sp_opd_bill_get_patient_info_by_treatment_id(:treatmentId)");
					querySp.setParameter("treatmentId", billRecMaster.getTreatmentId());
					querySp.setResultTransformer(new AliasToBeanResultTransformer(PatientHeaderInfoDto.class));
					@SuppressWarnings("unchecked")
					List<PatientHeaderInfoDto> lstOpdQueueDto = querySp.list();		
					
					if(lstOpdQueueDto.size() > 0) {
					SendSMSNoble.sendSMS("Meesha Hospital", lstOpdQueueDto.get(0).getMobile(),lstOpdQueueDto.get(0).getPatientId(), lstOpdQueueDto.get(0).getPatientName(),lstOpdQueueDto.get(0).getDepartmentId());
					}
			 }
		}
		// end for sms
		
		
		return maxReceiptId;		
	}
	

	@SuppressWarnings("unchecked")
	public int saveGeneratedTokenNo(int treatmentId) {
		
		/*int tokencount=0;
		String sql="";
		String specialityWiseToken = resourceBundleEhat.getObject("specialityWiseToken").toString();
		String meeshaFlow = resourceBundleEhat.getObject("meesha").toString();
		
		if(!meeshaFlow.equalsIgnoreCase("on")) {
			
			try {
				
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillReceiptSlaveDTO.class);
				criteria.add(Restrictions.eq("treatmentId", treatmentId));
				criteria.add(Restrictions.eq("serviceId", 2));
				criteria.add(Restrictions.eq("tokenNo", 0));
				criteria.add(Restrictions.eq("deleted", "N"));
				List<BillReceiptSlaveDTO> listBill = criteria.list();
		    	for(BillReceiptSlaveDTO obj : listBill) {
		    		
					TokenDto tn=new TokenDto();
					Query tqry = null;
					
					if(specialityWiseToken.equalsIgnoreCase("true")){
						
						sql="SELECT max(token) from token_number where unit_id = "+obj.getUnitId()+" and token_gen_date >=CURDATE() and department_id =(:dId) and doctor_id=(:drid) and speciality_id =(:splId)";
						tqry = sessionFactory.getCurrentSession().createSQLQuery(sql);
						tqry.setParameter("dId", 1);
						tqry.setParameter("drid",obj.getDoctorId());
						tqry.setParameter("splId",obj.getSpecialityId());

					}else{
						sql = "SELECT max(token) from token_number where unit_id = "+obj.getUnitId()+" and token_gen_date >=CURDATE() and department_id =(:dId)";
						tqry = sessionFactory.getCurrentSession().createSQLQuery(sql);
						tqry.setParameter("dId", 1);
					}
						
					List<Integer> tokencnt = tqry.list();
				 	if(tokencnt.contains(null)){
						tokencount++;	
					}else{
						tokencount = (Integer) tqry.uniqueResult();
						tokencount++;
					}
				 	
				 	int nextLimitCount=0, existNextCount=0;
				 	String queueStatus = "wait";
				 	sql = "SELECT in_count,next_count,wait_count FROM opd_token_limit where unit_id = "+obj.getUnitId()+" and speciality_id = "+obj.getSpecialityId()+" and deleted='N' ";
				 	Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					billDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listBillDetails = billDetailsQuery.list();
					for(Map<String, Object> row : listBillDetails){
						
						nextLimitCount = (Integer)row.get("next_count");
						//waitCount = (Integer)row.get("wait_count");
					}	
					
					sql = "select count(*) from token_number n where n.queue_status = 'next' and n.unit_id = "+obj.getUnitId()+" and n.speciality_id="+obj.getSpecialityId()+" and n.doctor_id="+obj.getDoctorId()
						+ " and date(n.token_gen_date)=current_date() and (select t_flag from ehat_treatment t where t.treatment_id = n.treatment_id) ='Y' ";
				 	tqry = sessionFactory.getCurrentSession().createSQLQuery(sql);
				 	existNextCount = ((Number) tqry.uniqueResult()).intValue();
				 	
				 	if(existNextCount < nextLimitCount) {
				 		
				 		queueStatus = "next";
				 	}
				 	
				 	Criteria criteriaToken = sessionFactory.getCurrentSession().createCriteria(TokenDto.class);
				 	criteriaToken.add(Restrictions.eq("treatmentId", treatmentId));
					criteriaToken.add(Restrictions.eq("deleted", "N"));
					//List<TokenDto> listToken = criteria.list();
					List<TokenDto> listToken = criteriaToken.list();
			    	for(TokenDto objToken : listToken) {
			    		
			    		if(objToken.getDoctorIdList().equals("0")) {
			    			
					 		TokenDto objMaster = (TokenDto) sessionFactory.getCurrentSession().get(TokenDto.class, objToken.getTokenId());
					 		
					 		if(!(obj.getDoctorId() > 0))
					 			objMaster.setDoctorIdList("0");
							else {
								objMaster.setDoctorIdList(String.valueOf(obj.getDoctorId()));
								objMaster.setSpecialityId(obj.getSpecialityId());
								objMaster.setToken(tokencount);
						 		objMaster.setTokenGenDate(new Date());
						 		objMaster.setQueueStatus(queueStatus);
							}
								
			    		}else {
			    			
			    			sql="SELECT count(tokenId) as tokenIdCount from token_number where unit_id = "+obj.getUnitId()+" and treatment_id = "+obj.getTreatmentId()+" and doctor_id = "+obj.getDoctorId()+" and speciality_id = "+obj.getSpecialityId()+" and queue_status!='cancel' ";
						 	tqry = sessionFactory.getCurrentSession().createSQLQuery(sql);
							int tokenIdCount = ((Number) tqry.uniqueResult()).intValue();
							
						 	if(tokenIdCount > 0) {
						 		
						 		sql="SELECT ifnull(tokenId,0) as tokenId from token_number where unit_id = "+obj.getUnitId()+" and treatment_id = "+obj.getTreatmentId()+" and doctor_id = "+obj.getDoctorId()+" and speciality_id = "+obj.getSpecialityId()+" and queue_status!='cancel' ";
							 	tqry = sessionFactory.getCurrentSession().createSQLQuery(sql);
								int tokenId = ((Number) tqry.uniqueResult()).intValue();
							
						 		TokenDto objMaster = (TokenDto) sessionFactory.getCurrentSession().get(TokenDto.class, tokenId);
						 		objMaster.setToken(tokencount);
						 		objMaster.setTokenGenDate(new Date());
						 		objMaster.setQueueStatus(queueStatus);
						 	}else {
						 		
						 		tn.setToken(tokencount);
								tn.setDepartmentId(obj.getDepartmentId());
								tn.setPatientId(obj.getPatientId());
								tn.setTreatmentId(obj.getTreatmentId());
								tn.setSpecialityId(obj.getSpecialityId());
								if(!(obj.getDoctorId() > 0))
									tn.setDoctorIdList("0");
								else
									tn.setDoctorIdList(String.valueOf(obj.getDoctorId()));
								
								tn.setCreatedDateTime(obj.getCreatedDateTime());
								tn.setUnitId(obj.getUnitId());
								tn.setTokenGenDate(new Date());
								tn.setQueueStatus(queueStatus);
								sessionFactory.getCurrentSession().merge(tn);
						 	}
			    		}
			    	}
			    	
					obj.setTokenNo(tokencount);
					tokencount=0;
			  	}
							
			}catch(Exception e) {
				
				e.printStackTrace();
				return 0;
			}
		}
		
		return tokencount; */
		

		
		int tokencount=0;
		String sql="";
		String specialityWiseToken = resourceBundleEhat.getObject("specialityWiseToken").toString();
		String meeshaFlow = resourceBundleEhat.getObject("meesha").toString();
		
		if(!meeshaFlow.equalsIgnoreCase("on")) {
			
			try {
				
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillReceiptSlaveDTO.class);
				criteria.add(Restrictions.eq("treatmentId", treatmentId));
				criteria.add(Restrictions.eq("serviceId", 2));
				criteria.add(Restrictions.eq("tokenNo", 0));
				criteria.add(Restrictions.eq("deleted", "N"));
				List<BillReceiptSlaveDTO> listBill = criteria.list();
		    	for(BillReceiptSlaveDTO obj : listBill) {
		    		
					TokenDto tn=new TokenDto();
					Query tqry = null;
					
					if(specialityWiseToken.equalsIgnoreCase("true")){
						
						sql="SELECT max(token) from token_number where unit_id = "+obj.getUnitId()+" and token_gen_date >=CURDATE() and department_id =(:dId) and doctor_id=(:drid) and speciality_id =(:splId)";
						tqry = sessionFactory.getCurrentSession().createSQLQuery(sql);
						tqry.setParameter("dId", 1);
						tqry.setParameter("drid",obj.getDoctorId());
						tqry.setParameter("splId",obj.getSpecialityId());

					}else{
						sql = "SELECT max(token) from token_number where unit_id = "+obj.getUnitId()+" and token_gen_date >=CURDATE() and department_id =(:dId)";
						tqry = sessionFactory.getCurrentSession().createSQLQuery(sql);
						tqry.setParameter("dId", 1);
					}
						
					List<Integer> tokencnt = tqry.list();
				 	if(tokencnt.contains(null)){
						tokencount++;	
					}else{
						tokencount = (Integer) tqry.uniqueResult();
						tokencount++;
					}
				 	
				 	int nextLimitCount=0, existNextCount=0;
				 	String queueStatus = "wait";
				 	sql = "SELECT in_count,next_count,wait_count FROM opd_token_limit where unit_id = "+obj.getUnitId()+" and speciality_id = "+obj.getSpecialityId()+" and deleted='N' ";
				 	Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					billDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listBillDetails = billDetailsQuery.list();
					for(Map<String, Object> row : listBillDetails){
						
						nextLimitCount = (Integer)row.get("next_count");
						//waitCount = (Integer)row.get("wait_count");
					}	
					
					sql = "select count(*) from token_number n where n.queue_status = 'next' and n.unit_id = "+obj.getUnitId()+" and n.speciality_id="+obj.getSpecialityId()+" and n.doctor_id="+obj.getDoctorId()
						+ " and date(n.token_gen_date)=current_date() and (select t_flag from ehat_treatment t where t.treatment_id = n.treatment_id) ='Y' ";
				 	tqry = sessionFactory.getCurrentSession().createSQLQuery(sql);
				 	existNextCount = ((Number) tqry.uniqueResult()).intValue();
				 	
				 	if(existNextCount < nextLimitCount) {
				 		
				 		queueStatus = "next";
				 	}
				 	
				 	sql="SELECT count(tokenId) as tokenIdCount from token_number where unit_id = "+obj.getUnitId()+" and treatment_id = "+obj.getTreatmentId()+" and doctor_id = "+obj.getDoctorId()+" and speciality_id = "+obj.getSpecialityId()+" and queue_status!='cancel'" ;
				 	tqry = sessionFactory.getCurrentSession().createSQLQuery(sql);
					int tokenIdCount = ((Number) tqry.uniqueResult()).intValue();
					
				 	if(tokenIdCount > 0) {
				 		
				 		sql="SELECT ifnull(tokenId,0) as tokenId from token_number where unit_id = "+obj.getUnitId()+" and treatment_id = "+obj.getTreatmentId()+" and doctor_id = "+obj.getDoctorId()+" and speciality_id = "+obj.getSpecialityId()+" and queue_status!='cancel' ";
					 	tqry = sessionFactory.getCurrentSession().createSQLQuery(sql);
						int tokenId = ((Number) tqry.uniqueResult()).intValue();
					
				 		TokenDto objMaster = (TokenDto) sessionFactory.getCurrentSession().get(TokenDto.class, tokenId);
				 		objMaster.setToken(tokencount);
				 		objMaster.setTokenGenDate(new Date());
				 		objMaster.setQueueStatus(queueStatus);
				 	}else {
				 		
				 		tn.setToken(tokencount);
						tn.setDepartmentId(obj.getDepartmentId());
						tn.setPatientId(obj.getPatientId());
						tn.setTreatmentId(obj.getTreatmentId());
						tn.setSpecialityId(obj.getSpecialityId());
						if(!(obj.getDoctorId() > 0))
							tn.setDoctorIdList("0");
						else
							tn.setDoctorIdList(String.valueOf(obj.getDoctorId()));
						
						tn.setCreatedDateTime(obj.getCreatedDateTime());
						tn.setUnitId(obj.getUnitId());
						tn.setTokenGenDate(new Date());
						tn.setQueueStatus(queueStatus);
						sessionFactory.getCurrentSession().merge(tn);
				 	}
				 	
					obj.setTokenNo(tokencount);
					tokencount=0;
			  	}
							
			}catch(Exception e) {
				
				e.printStackTrace();
				return 0;
			}
		}
		
		return tokencount;
	
	}
	
	//added by vishant
	@Override
	public int setOpdRecMasterSlave(int maxRecId,int againstId,String callFrom,Session session) {
	       
        int result=0;
        ResourceBundle resource = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = resource.getObject("hospitalname").toString();
       
        try {           
            double mastTotAmt=0, mastTotPaid=0, mastPaidPer=0, mastTotConsn=0,mastConsnPer=0, mastPayable=0, mastTotDisc=0, mastDiscPer=0, mastFinalPayable=0, mastTotRemain=0, mastTotRefund=0;
            double slaveTotAmt=0, slaveTotPaid=0, slaveTotConsn=0, slavePayable=0, slaveTotDisc=0, slaveDiscPer=0, slaveFinalPayable=0, slaveTotRefund=0;
            int masterRecId=0,spId=0;
            String discountApprovedStatus="";
           
            if(againstId > 0){
               
                // Calling stored procedure for get super master of receipt
                Query query2 = session.createSQLQuery("CALL fetchSuperReceiptId (:receiptId)").setParameter("receiptId", maxRecId);
                masterRecId = (Integer) query2.uniqueResult();
                       
            }else{
               
                masterRecId=maxRecId;
            }
            //Get master receipt totals
            String sql="select * from ehat_receipt_master where deleted='N' and bill_receipt_id="+masterRecId;
            Query recQuery = session.createSQLQuery(sql);
            recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> listRec = recQuery.list();
            for(Map<String, Object> row : listRec){
               
            	
            	spId=(Integer)row.get("sponsor_cat_id");
                mastTotAmt=(Double)row.get("actual_amt");
                mastTotConsn=(Double)row.get("actual_tot_concn");
                mastTotDisc=(Double)row.get("total_discount");
                mastTotPaid=(Double)row.get("total_paid");               
                mastTotRemain=(Double)row.get("total_remain");
                mastTotRefund=(Double)row.get("refund_amt");
                discountApprovedStatus=(String)row.get("discount_approved_status"); 
               
                
            }
            mastConsnPer=(mastTotConsn*100)/mastTotAmt;
            mastPayable=mastTotAmt-mastTotConsn;
            
	       if(hospitalName.equalsIgnoreCase("Siddhivinayak")) {    
	           if(discountApprovedStatus.equalsIgnoreCase("Y")) {
	        	   mastDiscPer=(mastTotDisc*100)/mastPayable;
	           }
	       }else {
	    	   mastDiscPer=(mastTotDisc*100)/mastPayable;
	       }
            
            mastFinalPayable=mastPayable-mastTotDisc;
            mastPaidPer=(mastTotPaid*100)/mastFinalPayable;
            if(Double.isNaN(mastPaidPer)) {
            	mastPaidPer=0.0;
            }
            if(Double.isNaN(mastDiscPer)) {
            	mastDiscPer=0.0;
            }
            if(Double.isNaN(mastConsnPer)) {
            	mastConsnPer=0.0;
            }
                       
            sql="update ehat_receipt_master set actual_con_per="+mastConsnPer+", actual_payable ="+mastPayable+",actual_disc_per="+mastDiscPer+","
                    + "payable="+mastFinalPayable+" where bill_receipt_id = "+masterRecId;   
                Query recMastQuery = session.createSQLQuery(sql);
                recMastQuery.executeUpdate();   
           
            //Get slave receipt totals
            sql="select * from ehat_receipt_slave where bill_receipt_master_id="+masterRecId;
            Query slaveQuery = session.createSQLQuery(sql);
            slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> listRecSlave = slaveQuery.list();
            for(Map<String, Object> row : listRecSlave){
                           	
            	int slaveId=(Integer)row.get("bill_rec_slave_id");
                slaveTotAmt=(Double)row.get("actual_amt");
                slaveTotConsn=(Double)row.get("actual_concn_amt");                
                int billDetailsId=(Integer)row.get("bill_details_id");                
               
                slavePayable=slaveTotAmt-slaveTotConsn;
                slaveTotDisc=(slavePayable*mastDiscPer)/100;
                slaveFinalPayable=slavePayable-slaveTotDisc;
                slaveTotPaid=(slaveFinalPayable*mastPaidPer)/100;
                           
                sql="update ehat_receipt_slave set actual_payable ="+slavePayable+",actual_disc_per="+mastDiscPer+",actual_disc_amt="+slaveTotDisc+","
                        + "actual_final_payable="+slaveFinalPayable+",actual_final_paid="+slaveTotPaid+" where bill_rec_slave_id = "+slaveId;   
                    Query recSlaveQuery2 = session.createSQLQuery(sql);
                    recSlaveQuery2.executeUpdate(); 
                    
               int servId=(Integer)row.get("service_id");
               
               
               updateRecord(billDetailsId,mastDiscPer,slaveTotDisc,slaveTotPaid,mastPaidPer,session,callFrom);
               

               
               sql="select ifnull(iscombination,'N') from ehat_service_master where deleted = 'N' and service_id = "+servId;
               Query billDetailsQuery = session.createSQLQuery(sql);					
               String isCombine = (String) billDetailsQuery.uniqueResult();
               
               if(isCombine.equals("Y")){
            	   
//            	   slavePaidPer = (slaveTotPaid * 100) / slaveTotAmt;
            	   setOpdPkgMasterSlaveNew(servId, billDetailsId, session, callFrom, slaveTotPaid, spId,masterRecId,mastPaidPer);
				
//            	   setOpdPkgMasterSlave(maxRecId,servId,billDetailsId,session,spId);
               }                
            }
                       
            result=1;
           
        } catch (Exception e) {
            e.printStackTrace();
            session.getTransaction().rollback();
        }
        return result;
    }
	

	//added by vishant
	private void updateRecord(int billDetailsId, double mastDiscPer, double slaveTotDisc, double slaveTotPaid,
			double mastPaidPer, Session session,String discFrom) {
		try {
			
			BillDetailsDto billDetailsDto = (BillDetailsDto) session.get(BillDetailsDto.class, billDetailsId);
			billDetailsDto.setPaidAmt(slaveTotPaid);
			billDetailsDto.setPaidPer(mastPaidPer);
			//billDetailsDto.setDiscount(slaveTotDisc);
			billDetailsDto.setDiscountPer(mastDiscPer);
			
			
			
			if (discFrom.equalsIgnoreCase("Hospital")) {
				billDetailsDto.setHospitalDiscount(slaveTotDisc);
				billDetailsDto.setDiscountFrom(discFrom);
			} else if (discFrom.equalsIgnoreCase("RefDoctor")) {
				billDetailsDto.setRefDoctorDiscount(slaveTotDisc);
				billDetailsDto.setDiscountFrom(discFrom);
			} else if (discFrom.equalsIgnoreCase("delete")) {

				billDetailsDto.setHospitalDiscount(0.0);
				billDetailsDto.setRefDoctorDiscount(0.0);
				billDetailsDto.setDiscountStatus("N");
				billDetailsDto.setDiscount(slaveTotDisc);
				billDetailsDto.setDiscountFrom("-");
			}else if (discFrom.equalsIgnoreCase("")) {

				//billDetailsDto.setHospitalDiscount(slaveTotDisc);
				//billDetailsDto.setRefDoctorDiscount(slaveTotDisc);
				//billDetailsDto.setDiscountFrom("-");
				billDetailsDto.setDiscount(slaveTotDisc);
			}
			 
			
			session.merge(billDetailsDto);
		} catch (Exception ex) {
			ex.printStackTrace();
			// Handle the exception or log it appropriately
		}}

	
	//added by vishant
	public int setOpdPkgMasterSlaveNew(int servId,int billDetailsId,Session session,String callFrom,double mastPaidAmt,int spId, int maxRecId, double mastPaidPer2) {
	//public int setOpdPkgMasterSlaveNew(int servId,int billDetailsId,Session session,String spId, double mastPaidPer, int sponsorId) {
		
		double mastConsnPer=0, mastDiscPer=0, mastRefPer=0,mastPaidPer=0.0;
		double concessionAmt=0;
		double actualFinalPayble=0;
        double slaveTotAmt=0, slaveTotConsn=0, slavePayable=0, slaveTotPaid=0, slaveTotDisc=0, slaveTotRef=0;       
       		
     // Get slave receipt totals
     		String sql = "select * from ehat_receipt_slave where service_id=" + servId + " and bill_details_id="
     				+ billDetailsId;
     		Query mastQuery = session.createSQLQuery(sql);
     		mastQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

     		@SuppressWarnings("unchecked")
     		List<Map<String, Object>> listRecMast = mastQuery.list();
     		for (Map<String, Object> row : listRecMast) {

     			mastConsnPer = (Double) row.get("actual_concn_per");
     			mastDiscPer = (Double) row.get("actual_disc_per");
     			actualFinalPayble = (Double) row.get("actual_final_payable");
     		}
		
		//Get pkg slave receipt totals
        sql="select * from ehat_other_bill_detail_for_opd where deleted='N' and bill_details_id="+billDetailsId;
        Query slaveQuery = session.createSQLQuery(sql);
        slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> listRecSlave = slaveQuery.list();
        for(Map<String, Object> row : listRecSlave){
                       	        	
        	//int sponsorId=(Integer)row.get("chargesSlave_id");
        	int pkgSlaveId=(Integer)row.get("other_bill_details_id_for_Opd");
        	
        	if(spId > 0){
        		
        		slaveTotAmt=(Double)row.get("other_amount");
        		concessionAmt = (Double)row.get("other_concession");
        		
        	}else{
        		
        		slaveTotAmt=(Double)row.get("amount");
        		concessionAmt = (Double)row.get("concession");
//        		concessionAmt = concessionAmt2.intValue();
        	}
        	            
        	slaveTotConsn=(slaveTotAmt*mastConsnPer)/100;
        	slavePayable=slaveTotAmt - slaveTotConsn;
            slaveTotDisc=(slavePayable*mastDiscPer)/100;
            
            slavePayable= slavePayable-(slaveTotDisc);
           if(mastPaidAmt!=0.0) 
            mastPaidPer=(mastPaidAmt*100)/actualFinalPayble;
           
            slaveTotPaid=(slavePayable*mastPaidPer)/100;
            slaveTotRef=(slaveTotPaid*mastRefPer)/100;	
            
            if (spId > 0) {

				sql = "update ehat_other_bill_detail_for_opd set concession_in_Perc=" + mastConsnPer
						+ ",other_concession=" + slaveTotConsn + ",discount_per=" + mastDiscPer + ",discount="+ slaveTotDisc + " "
						+ " ,paid_other_amt=" + slaveTotPaid + " ,paid_other_per=" + mastPaidPer + " "
						 + " where other_bill_details_id_for_Opd = " + pkgSlaveId;
			} else {

				sql = "update ehat_other_bill_detail_for_opd set concession_in_Perc=" + mastConsnPer + ",concession="
						+ slaveTotConsn + ",discount_per=" + mastDiscPer + ",discount=" + slaveTotDisc + " "
						+ " ,paid_other_amt=" + slaveTotPaid + " ,paid_other_per=" + mastPaidPer + " "
						+ " where other_bill_details_id_for_Opd = " + pkgSlaveId;
			}
           
            Query recSlaveQuery2 = session.createSQLQuery(sql);
            recSlaveQuery2.executeUpdate();
            
            //save discount from 
			/*
			 * try { String discSqlQuery=""; if(callFrom.equalsIgnoreCase("Hospital")) {
			 * discSqlQuery="update ehat_other_bill_detail_for_opd set hospital_disc="
			 * +slaveTotDisc +",discount_from="+callFrom
			 * +" where other_bill_details_id_for_Opd"+pkgSlaveId;
			 * 
			 * }else if(callFrom.equalsIgnoreCase("RefDoctor")) {
			 * discSqlQuery="update ehat_other_bill_detail_for_opd set ref_doctor_disc="
			 * +slaveTotDisc +",discount_from="+callFrom
			 * +" where other_bill_details_id_for_Opd"+pkgSlaveId; }else
			 * if(callFrom.equalsIgnoreCase("delete")) {
			 * 
			 * discSqlQuery="update ehat_other_bill_detail_for_opd set ref_doctor_disc="
			 * +slaveTotDisc +"hospital_disc="+slaveTotDisc
			 * +",discount_from='-' where other_bill_details_id_for_Opd"+pkgSlaveId; } Query
			 * recSlaveQuery3 = session.createSQLQuery(discSqlQuery);
			 * recSlaveQuery3.executeUpdate(); }catch (Exception e) { e.printStackTrace(); }
			 */
            
        }
		return 1;
	}
	
	//added by vishant
		public int setOpdPkgMasterSlaveNewForBulk(int servId,int billDetailsId,Session session,String callFrom,double mastPaidAmt,int spId,double mastPaidPer2, double totalAmt) {
		//public int setOpdPkgMasterSlaveNew(int servId,int billDetailsId,Session session,String spId, double mastPaidPer, int sponsorId) {
			
			double mastConsnPer=0, mastDiscPer=0, mastRefPer=0,mastPaidPer=0.0;
			double concessionAmt=0;
	        double slaveTotAmt=0, slaveTotConsn=0, slavePayable=0, slaveTotPaid=0, slaveTotDisc=0, slaveTotRef=0;       
	       		
	     
			//Get pkg slave receipt totals
	       String sql="select * from ehat_other_bill_detail_for_opd where deleted='N' and bill_details_id="+billDetailsId;
	        Query slaveQuery = session.createSQLQuery(sql);
	        slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        @SuppressWarnings("unchecked")
	        List<Map<String, Object>> listRecSlave = slaveQuery.list();
	        for(Map<String, Object> row : listRecSlave){
	                       	        	
	        	//int sponsorId=(Integer)row.get("chargesSlave_id");
	        	int pkgSlaveId=(Integer)row.get("other_bill_details_id_for_Opd");
	        	
	        	if(spId > 0){
	        		
	        		slaveTotAmt=(Double)row.get("other_amount");
	        		concessionAmt = (Double)row.get("other_concession");
	        		mastConsnPer = (Double)row.get("concession_in_Perc");
	        		
	        		
	        	}else{
	        		
	        		slaveTotAmt=(Double)row.get("amount");
	        		concessionAmt = (Double)row.get("concession");
	        		mastConsnPer = (Double)row.get("concession_in_Perc");
//	        		concessionAmt = concessionAmt2.intValue();
	        	}
	        	            
	        	slaveTotConsn=(slaveTotAmt*mastConsnPer)/100;
	        	slavePayable=slaveTotAmt - slaveTotConsn;
	            slaveTotDisc=(slavePayable*mastDiscPer)/100;
	            
	            slavePayable= slavePayable-(slaveTotDisc);
	           if(mastPaidAmt!=0.0) 
	            mastPaidPer=(mastPaidAmt*100)/totalAmt;
	           
	            slaveTotPaid=(slavePayable*mastPaidPer)/100;
	            slaveTotRef=(slaveTotPaid*mastRefPer)/100;	
	            
	            if (spId > 0) {

					sql = "update ehat_other_bill_detail_for_opd set concession_in_Perc=" + mastConsnPer
							+ ",other_concession=" + slaveTotConsn + ",discount_per=" + mastDiscPer + ",discount="+ slaveTotDisc + " "
							+ " ,sponsor_paid=" + slaveTotPaid + " ,sponsor_paid_per=" + mastPaidPer + " "
							 + " where other_bill_details_id_for_Opd = " + pkgSlaveId;
				} else {

					sql = "update ehat_other_bill_detail_for_opd set concession_in_Perc=" + mastConsnPer + ",concession="
							+ slaveTotConsn + ",discount_per=" + mastDiscPer + ",discount=" + slaveTotDisc + " "
							+ " ,sponsor_paid=" + slaveTotPaid + " ,sponsor_paid_per=" + mastPaidPer + " "
							+ " where other_bill_details_id_for_Opd = " + pkgSlaveId;
				}
	           
	            Query recSlaveQuery2 = session.createSQLQuery(sql);
	            recSlaveQuery2.executeUpdate();            
	        }
			return 1;
		}
	
		//added by vishant
		public int setIpdPkgMasterSlaveNewForBulk(int servId, int billDetailsId, Session session, String callFrom,
				double mastPaidAmt, int spId, double mastPaidPer2, double totalAmt) {
			// public int setOpdPkgMasterSlaveNew(int servId,int billDetailsId,Session
			// session,String spId, double mastPaidPer, int sponsorId) {

			double mastConsnPer = 0, mastDiscPer = 0, mastRefPer = 0, mastPaidPer = 0.0;
			double concessionAmt = 0;
			double slaveTotAmt = 0, slaveTotConsn = 0, slavePayable = 0, slaveTotPaid = 0, slaveTotDisc = 0,
					slaveTotRef = 0;

			// Get pkg slave receipt totals
			String sql = "select * from ehat_other_bill_detail_for_ipd where deleted='N' and bill_details_id="
					+ billDetailsId;
			Query slaveQuery = session.createSQLQuery(sql);
			slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listRecSlave = slaveQuery.list();
			for (Map<String, Object> row : listRecSlave) {

				// int sponsorId=(Integer)row.get("chargesSlave_id");
				int pkgSlaveId = (Integer) row.get("other_bill_details_id_for_ipd");

				if (spId > 0) {

					slaveTotAmt = (Double) row.get("other_amount");
					concessionAmt = (Double) row.get("other_concession");
					mastConsnPer = (Double) row.get("concession_per");
					mastDiscPer = (Double) row.get("discount_per");

				} else {

					slaveTotAmt = (Double) row.get("amount");
					 concessionAmt = (Double) row.get("concession");
					 mastConsnPer = (Double) row.get("concession_per");
					 mastDiscPer = (Double) row.get("discount_per");
					//concessionAmt = concessionAmt2.intValue();
				}

				slaveTotConsn = (slaveTotAmt * mastConsnPer) / 100;
				slavePayable = slaveTotAmt - slaveTotConsn;
				slaveTotDisc = (slavePayable * mastDiscPer) / 100;

				slavePayable = slavePayable - (slaveTotDisc);
				if (mastPaidAmt != 0.0)
					mastPaidPer = (mastPaidAmt * 100) / totalAmt;

				slaveTotPaid = (slavePayable * mastPaidPer) / 100;
				slaveTotRef = (slaveTotPaid * mastRefPer) / 100;

				if (spId > 0) {

					sql = "update ehat_other_bill_detail_for_ipd set concession_per=" + mastConsnPer
							+ ",other_concession=" + slaveTotConsn + ",discount_per=" + mastDiscPer + ",discount="
							+ slaveTotDisc + " " + " ,sponsor_paid=" + slaveTotPaid + " ,sponsor_paid_per="
							+ mastPaidPer + " " + " where other_bill_details_id_for_ipd = " + pkgSlaveId;
				} else {

					sql = "update ehat_other_bill_detail_for_ipd set concession_per=" + mastConsnPer
							+ ",concession=" + slaveTotConsn + ",discount_per=" + mastDiscPer + ",discount="
							+ slaveTotDisc + " " + " ,sponsor_paid=" + slaveTotPaid + " ,sponsor_paid_per="
							+ mastPaidPer + " " + " where other_bill_details_id_for_ipd = " + pkgSlaveId;
				}

				Query recSlaveQuery2 = session.createSQLQuery(sql);
				recSlaveQuery2.executeUpdate();
			}
			return 1;
		}	
	
	public int setOpdPkgMasterSlave(int maxRecId, int servId, int billDetailsId, Session session, int spId) {

		double mastConsnPer = 0, mastDiscPer = 0;
		double slaveTotAmt = 0, slaveTotConsn = 0, slaveTotPayable = 0, slaveTotDisc = 0;

		// Get slave receipt totals
		String sql = "select * from ehat_receipt_slave where service_id=" + servId + " and bill_receipt_master_id="
				+ maxRecId;
		Query mastQuery = session.createSQLQuery(sql);
		mastQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

		@SuppressWarnings("unchecked")
		List<Map<String, Object>> listRecMast = mastQuery.list();
		for (Map<String, Object> row : listRecMast) {

			mastConsnPer = (Double) row.get("actual_concn_per");
			mastDiscPer = (Double) row.get("actual_disc_per");
		}

		// Get pkg slave receipt totals
		sql = "select * from ehat_other_bill_detail_for_opd where deleted='N' and bill_details_id=" + billDetailsId;
		Query slaveQuery = session.createSQLQuery(sql);
		slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

		@SuppressWarnings("unchecked")
		List<Map<String, Object>> listRecSlave = slaveQuery.list();
		for (Map<String, Object> row : listRecSlave) {

			// int sponsorId=(Integer)row.get("chargesSlave_id");
			int pkgSlaveId = (Integer) row.get("other_bill_details_id_for_Opd");

			if (spId > 0) {

				slaveTotAmt = (Double) row.get("other_amount");

			} else {

				slaveTotAmt = (Double) row.get("amount");
			}

			slaveTotConsn = (slaveTotAmt * mastConsnPer) / 100;
			slaveTotPayable = slaveTotAmt - slaveTotConsn;
			slaveTotDisc = (slaveTotPayable * mastDiscPer) / 100;

			if (spId > 0) {

				sql = "update ehat_other_bill_detail_for_opd set concession_in_Perc=" + mastConsnPer
						+ ",other_concession=" + slaveTotConsn + ",discount_per=" + mastDiscPer + ",discount="
						+ slaveTotDisc + " " + " where other_bill_details_id_for_Opd = " + pkgSlaveId;
			} else {

				sql = "update ehat_other_bill_detail_for_opd set concession_in_Perc=" + mastConsnPer + ",concession="
						+ slaveTotConsn + ",discount_per=" + mastDiscPer + ",discount=" + slaveTotDisc + " "
						+ " where other_bill_details_id_for_Opd = " + pkgSlaveId;
			}

			Query recSlaveQuery2 = session.createSQLQuery(sql);
			recSlaveQuery2.executeUpdate();
		}
		return 1;
	}
	 
	
	public int setOpdRefMasterSlave(int againstId,String callFrom,Session session) {
	       
        int result=0;
       
        try {           
            double mastTotPaid=0, mastTotRefund=0, mastRefPer;
            double slaveTotPaid=0, slaveTotRefund=0, slaveRefPer;
           
            //Get master receipt totals
            String sql="select * from ehat_receipt_master where bill_receipt_id="+againstId;
            Query recQuery = session.createSQLQuery(sql);
            recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> listRec = recQuery.list();
            for(Map<String, Object> row : listRec){
                              
                mastTotPaid=(Double)row.get("total_paid");                
                mastTotRefund=(Double)row.get("refund_amt");               
            }
            
            mastRefPer=(mastTotRefund*100)/mastTotPaid;
                   
            sql="update ehat_receipt_master set actual_ref_per="+mastRefPer+" where bill_receipt_id = "+againstId;   
            Query recMastQuery = session.createSQLQuery(sql);
            recMastQuery.executeUpdate();   
            
            //Get slave receipt totals
            sql="select * from ehat_receipt_slave where bill_receipt_master_id="+againstId;
            Query slaveQuery = session.createSQLQuery(sql);
            slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> listRecSlave = slaveQuery.list();
            for(Map<String, Object> row : listRecSlave){
                  
            	int slaveId=(Integer)row.get("bill_rec_slave_id");
            	slaveTotPaid=(Double)row.get("actual_final_paid");               
                slaveTotRefund=(slaveTotPaid*mastRefPer)/100;
                
                int billDetailsId=(Integer)row.get("bill_details_id");                              
                
                sql="update ehat_receipt_slave set actual_ref_amt="+slaveTotRefund+",actual_ref_per="+mastRefPer+" where bill_rec_slave_id="+slaveId;   
                Query recSlaveQuery2 = session.createSQLQuery(sql);
                recSlaveQuery2.executeUpdate();   
                
                int servId=(Integer)row.get("service_id");
                sql="select ifnull(iscombination,'N') from ehat_service_master where deleted = 'N' and service_id = "+servId;
                Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);					
                String isCombine = (String) billDetailsQuery.uniqueResult();
                
                if(isCombine.equals("Y")){
             	   
                	setRefundOpdPkgMasterSlave(againstId,servId,billDetailsId,session);
                }                
            }            
            
            result=1;
           
        } catch (Exception e) {
            e.printStackTrace();
           
        }
        return result;
    }	
	
	public int setRefundOpdPkgMasterSlave(int maxRecId,int servId,int billDetailsId,Session session) {
		
		double mastTotAmt=0, mastRefPer=0, mastTotPaid=0, mastPaidPer=0;
        double slaveTotAmt=0,slaveTotPaid=0, slaveTotRefund=0;       
       		
		//Get slave receipt totals
		String sql="select * from ehat_receipt_slave where service_id="+servId+" and bill_receipt_master_id="+maxRecId;
        Query mastQuery = session.createSQLQuery(sql);
        mastQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> listRecMast = mastQuery.list();
        for(Map<String, Object> row : listRecMast){
        	
        	mastTotAmt=(Double)row.get("actual_amt");  
        	mastRefPer=(Double)row.get("actual_ref_per");  
        	mastTotPaid=(Double)row.get("actual_final_paid");  
        }       
        
        mastPaidPer=(mastTotPaid*100)/mastTotAmt;        
		
		//Get pkg slave receipt totals
        sql="select * from ehat_other_bill_detail_for_opd where deleted='N' and bill_details_id="+billDetailsId;
        Query slaveQuery = session.createSQLQuery(sql);
        slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> listRecSlave = slaveQuery.list();
        for(Map<String, Object> row : listRecSlave){
                       	        	
        	int sponsorId=(Integer)row.get("chargesSlave_id");
        	int pkgSlaveId=(Integer)row.get("other_bill_details_id_for_Opd");
        	
        	if(sponsorId > 0){
        		
        		slaveTotAmt=(Double)row.get("other_amount");
        		
        	}else{
        		
        		slaveTotAmt=(Double)row.get("amount");
        	}
        	
        	slaveTotPaid=(slaveTotAmt*mastPaidPer)/100;        	            
        	slaveTotRefund=(slaveTotPaid*mastRefPer)/100;
               
	    	sql="update ehat_other_bill_detail_for_opd set refund_per="+mastRefPer+",refund="+slaveTotRefund+" "
	                 +" where other_bill_details_id_for_Opd = "+pkgSlaveId;           
           
            Query recSlaveQuery2 = session.createSQLQuery(sql);
            recSlaveQuery2.executeUpdate();            
        }
		return 1;
	}
	
	public int saveMultiPayMode(int maxId,BillReceiptMasterDTO obj,List<MultiBillReceiptMasterDTO> lst,Session session){
			
		int result=0;
		try{
			for(MultiBillReceiptMasterDTO multiObj:lst){
				
				multiObj.setBillReceiptId(maxId);
				multiObj.setUnitId(obj.getUnitId());
				multiObj.setTreatmentId(obj.getTreatmentId());
				multiObj.setPatientId(obj.getPatientId());
				multiObj.setBillId(obj.getBillId());				
				multiObj.setDepartmentId(obj.getDepartmentId());			
				multiObj.setTotalAmt(obj.getTotalAmt());
				multiObj.setTotalDisc(obj.getTotalDisc());
				multiObj.setTotalQty(obj.getTotalQty());		
				multiObj.setTotalRemain(obj.getTotalAmt()-multiObj.getTotalPaid());	
				multiObj.setCreatedBy(obj.getCreatedBy());
				multiObj.setCreatedDateTime(new Date());			
				multiObj.setDeleted("N");
				/*multiObj.setTotalPaid(obj.getTotalPaid());
				multiObj.setPayMode(billRecMaster.getPayMode());
				multiObj.setbNumber(billRecMaster.getbNumber());
				multiObj.setbName(billRecMaster.getbName());*/
				multiObj.setSourceTypeId(obj.getSourceTypeId());
				multiObj.setSponsorCatId(obj.getSponsorCatId());
				multiObj.setReceiptStatus("unpaid");
				
				// Save multi paymode list
				session.merge(multiObj);			
				result=1;	
				// update  comman adavnce start
			               if(multiObj.getPayMode()==4) {
							Criteria criteria1 = session.createCriteria(CommonadvDto.class);
							criteria1.add(Restrictions.eq("patient_ID", multiObj.getPatientId()));
							criteria1.add(Restrictions.eq("paidflag", "N"));
					    	criteria1.add(Restrictions.eq("deleted", "N"));
					    	criteria1.addOrder(Order.asc("commonadv_id"));
					    	List<CommonadvDto> listcdav	 = criteria1.list();
					    	//Session session = session;
					
							String hql = "UPDATE CommonadvDto set  deduct_amnt  =:deamt ,remaining_amnt  =:reamt ,paidflag =:paidflag WHERE patient_ID =:pid and  commonadv_id =:cadid ";
			
					    	Query query = session.createQuery(hql);
							int pay=0;
							double paodamount=multiObj.getTotalPaid();
					    	for(CommonadvDto cd: listcdav){
					    		
					    	double camunt =	cd.getRemaining_amnt();
					    	
					    	if(camunt != 0.0 || camunt != 0){
			
					    		if(camunt < paodamount){
					    			ComAdvbifergationDto cadvbi = new ComAdvbifergationDto();
										
					    			paodamount =	paodamount - camunt;//00
					    			double deamt = camunt + cd.getDeduct_amnt();
					    			query.setParameter("deamt",deamt); 
					    			query.setParameter("reamt",0.0); 
					    			query.setParameter("paidflag", "Y");
								
					    			query.setParameter("pid",multiObj.getPatientId());
			            			query.setParameter("cadid", cd.getCommonadv_id());
									
									query.executeUpdate();
									
									cadvbi.setAmount(camunt);
									cadvbi.setCadvid( cd.getCommonadv_id());
									//cadvbi.setReceipt_id(maxReceiptId);
									cadvbi.setReceipt_id(maxId);
									
									session.merge(cadvbi);
					    		}else{
					    			if(pay==0){
					    				ComAdvbifergationDto cadvbi = new ComAdvbifergationDto();
										
						    			double deamt=paodamount;
						    			paodamount = camunt - paodamount;//
						    			
						    			query.setParameter("deamt",(deamt + cd.getDeduct_amnt())); 
						    			query.setParameter("reamt",paodamount);
						    			query.setParameter("paidflag", "N");  
								 
						    			query.setParameter("pid",multiObj.getPatientId());
						    			query.setParameter("cadid", cd.getCommonadv_id());
										query.executeUpdate();
										cadvbi.setAmount(deamt);
										cadvbi.setCadvid(cd.getCommonadv_id());
									//	cadvbi.setReceipt_id(maxReceiptId);
										cadvbi.setReceipt_id(maxId);
								    	session.merge(cadvbi);
								    	pay=1;
								    //	break;
					    			}
					    			
					    		}
					    			
					    	}
					    		
					    }
							
			          }
			
		
				// end
				
			}	
		}catch (Exception e) {
			
			e.printStackTrace();
			return 0;
		}		
		return result;
	}	
	
	public int saveBulkMultiPayMode(int maxId,BulkSettlementMasterDTO obj,List<MultiBulkReceiptMasterDTO> lst,Session session){
		
		int result=0;
		try{
			for(MultiBulkReceiptMasterDTO multiObj:lst){
				
				multiObj.setBulkReceiptId(maxId);
				multiObj.setUnitId(obj.getUnitId());
				multiObj.setTreatmentId(obj.getTreatmentId());
				multiObj.setPatientId(obj.getPatientId());
				multiObj.setBillId(obj.getBillId());				
				multiObj.setDepartmentId(obj.getDepartmentId());			
				multiObj.setTotalAmt(obj.getTotalAmt());
				multiObj.setTotalDisc(obj.getTotalConsn());
				multiObj.setTotalQty(obj.getTotalQty());
				multiObj.setTotalPaid(obj.getTotalPaid());
				multiObj.setTotalRemain(obj.getTotalAmt()-multiObj.getTotalPaid());	
				multiObj.setCreatedBy(obj.getCreatedBy());
				multiObj.setCreatedDateTime(new Date());			
				multiObj.setDeleted("N");
				multiObj.setAccountStatusBulk("N");
				/*multiObj.setTotalPaid(obj.getTotalPaid());
				multiObj.setPayMode(billRecMaster.getPayMode());
				multiObj.setbNumber(billRecMaster.getbNumber());
				multiObj.setbName(billRecMaster.getbName());*/
				multiObj.setSourceTypeId(obj.getSourceTypeId());
				multiObj.setSponsorCatId(obj.getSponsorCatId());
				multiObj.setReceiptStatus("unpaid");
				
				// Save multi paymode list
				session.merge(multiObj);			
				result=1;		
			}	
		}catch (Exception e) {
			
			e.printStackTrace();
			return 0;
		}		
		return result;
	}	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 12-July-2017
	* @codeFor	: Save Refund bill details
	 ************/
	@SuppressWarnings("unchecked")
	public int saveRefundBillDetails(String servIdsChecked,Integer refDocId,BillReceiptMasterDTO billRecMaster){	
			
		Integer result=0;
		int againstId=billRecMaster.getAgainstId();
		Session session = sessionFactory.openSession(); // create session object from the session factory
		session.beginTransaction(); // initialize the transaction object from session
		
		String sqlBill="select department_id FROM ehat_treatment where treatment_id="+billRecMaster.getTreatmentId();
		Query deptQuery = session.createSQLQuery(sqlBill);		
		Integer deptId = (Integer) deptQuery.uniqueResult();
		
		int curRecId=getCurrentRecId("ehat_refund_master",session,deptId);
		try {
				
			int billId=0,patientId=0,departId=0,sourceTypeId=0;			
			
			/*ArrayList<Integer> masterChecked=new ArrayList<Integer>();			
			String[] servIds;
			
			// get checked service masters
			if(servIdsChecked.length()>0){
				
				servIds=servIdsChecked.split(",");
				for(String id:servIds){
					
					masterChecked.add(Integer.parseInt(id));
				}
			}	*/		
		
			Criteria criteriaRec = session.createCriteria(BillReceiptMasterDTO.class);			
			criteriaRec.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));			
			criteriaRec.setProjection(Projections.rowCount());
			long count = (Long)criteriaRec.uniqueResult();
			BillRefundMasterDTO billMaster = new BillRefundMasterDTO();
			if(count>0){
								
				double totalPaid=0,recPaid=0,recRefund=0,totalPayable=0,recPayable=0;
				Criteria criteriaAllDetails = session.createCriteria(BillReceiptMasterDTO.class);			
				criteriaAllDetails.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));	
				List<BillReceiptMasterDTO> listAllDetails = (List<BillReceiptMasterDTO>) criteriaAllDetails.list();
				for(BillReceiptMasterDTO obj:listAllDetails){
					
					billId=obj.getBillId();
					departId=obj.getDepartmentId();
					patientId=obj.getPatientId();
					int recId=obj.getReceiptCount();
					
					// Total paid & refund for overall
					totalPaid=totalPaid+obj.getTotalPaid();
					
					/*if(obj.getRefundFlag().equals("Y")){
						
						totalRefund=totalRefund+obj.getRefundAmt();
					}	
					
					totalPayable=totalPaid-totalRefund;*/ // Overall payable
										
					if(againstId==recId){
						
						recPaid=recPaid+obj.getTotalPaid();
					}
					
					if(againstId==recId && obj.getRefundFlag().equals("Y")){
						
						recRefund=recRefund+obj.getRefundAmt();
					}
						
					recPayable=recPaid-recRefund; // receipt wise payable
				}
				
				Criteria criteriaRef = session.createCriteria(BillRefundMasterDTO.class);			
				criteriaRef.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));			
				criteriaRef.setProjection(Projections.rowCount());
				long countRef = (Long)criteriaRef.uniqueResult();
				
				if(countRef>0){
					
					Criteria criteriaSum = session.createCriteria(BillRefundMasterDTO.class);			
					criteriaSum.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
					criteriaSum.setProjection(Projections.sum("totalPaid"));	
					double sumOfRefund = (Double)criteriaSum.uniqueResult();
					totalPayable=totalPaid-sumOfRefund;
				}else{
					
					totalPayable=totalPaid-0;
				}
				
				
				// Total paid & refund for receipt wise
				if(billRecMaster.getAgainstId()!=0){
					
					if(billRecMaster.getTotalPaid()<=totalPayable && billRecMaster.getTotalPaid()<=recPayable){
							
						// Update receipt master
						/*BillReceiptMasterDTO objectToUpdate = (BillReceiptMasterDTO) session.get(BillReceiptMasterDTO.class, againstId);
						objectToUpdate.setRefundFlag("Y");
						objectToUpdate.setRefundAmt(recRefund+billRecMaster.getTotalPaid());
						objectToUpdate.setReduction(billRecMaster.getTotalAmt()-billRecMaster.getTotalPaid());
						objectToUpdate.setActualRefAmt(recRefund+billRecMaster.getTotalPaid());*/
						//objectToUpdate.setActualRefPer(billRecMaster.getActualRefPer());								      
						
						String sql="update ehat_receipt_master set refund_flag='Y',refund_amt="+(recRefund+billRecMaster.getTotalPaid())+",reduction="+(billRecMaster.getTotalAmt()-billRecMaster.getTotalPaid())+",actual_ref_amt="+(recRefund+billRecMaster.getTotalPaid())+" where receipt_count = "+againstId;   
			            Query recMastQuery = session.createSQLQuery(sql);
			            recMastQuery.executeUpdate();  						
						
						// Make entry in refund master						
						billMaster.setRefundCount(curRecId);
						billMaster.setUnitId(billRecMaster.getUnitId());
						billMaster.setTreatmentId(billRecMaster.getTreatmentId());
						billMaster.setPatientId(patientId);
						billMaster.setBillId(billId);				
						billMaster.setDepartmentId(departId);
						billMaster.setReceiptOf(billRecMaster.getReceiptOf());
						billMaster.setCreatedBy(billRecMaster.getCreatedBy());
						billMaster.setCreatedDateTime(new Date());
						billMaster.setSourceTypeId(sourceTypeId);
						
						billMaster.setPayeeTypeId(billRecMaster.getPayeeTypeId());
						billMaster.setPayeeMainId(billRecMaster.getPayeeMainId());
						billMaster.setPayeeLeafId(billRecMaster.getPayeeLeafId());
						
						billMaster.setDeleted("N");
						billMaster.setRefundFlag("Y");
						billMaster.setPayMode(billRecMaster.getPayMode());
						billMaster.setbNumber(billRecMaster.getbNumber());
						billMaster.setBatchNumber(billRecMaster.getBatchNumber());
						billMaster.setbName(billRecMaster.getbName());
						billMaster.setTotalAmt(billRecMaster.getTotalAmt());
						billMaster.setTotalDisc(billRecMaster.getTotalDisc());
						billMaster.setTotalQty(1);
						billMaster.setTotalPaid(billRecMaster.getTotalPaid());// payable
						billMaster.setTotalRemain(billRecMaster.getTotalAmt()-(billRecMaster.getTotalPaid()+billRecMaster.getTotalDisc()));
						billMaster.setAgainstId(billRecMaster.getAgainstId());		
						
						billMaster.setRefGivenBy(billRecMaster.getRefGivenBy());		
						billMaster.setRefRemark(billRecMaster.getRefRemark());		
												
						// Save Refund Master list
						session.merge(billMaster);	
						
						// Get max master id
						Criteria criteriaMax = session.createCriteria(BillRefundMasterDTO.class)
								.setProjection(Projections.max("billRefundId"));
						result = (Integer) criteriaMax.uniqueResult();
						if (result == null) {

							result = -3;
						}
						
						
					}else{
						
						result=-1;
					}					
					
				}else{
					
					if(billRecMaster.getTotalPaid()<=totalPayable){
						
						// Make entry in refund master
						//BillRefundMasterDTO billMaster = new BillRefundMasterDTO();
						billMaster.setRefundCount(curRecId);
						billMaster.setUnitId(billRecMaster.getUnitId());
						billMaster.setTreatmentId(billRecMaster.getTreatmentId());
						billMaster.setPatientId(patientId);
						billMaster.setBillId(billId);				
						billMaster.setDepartmentId(departId);
						billMaster.setReceiptOf(billRecMaster.getReceiptOf());
						billMaster.setCreatedBy(billRecMaster.getCreatedBy());
						billMaster.setCreatedDateTime(new Date());
						billMaster.setSourceTypeId(sourceTypeId);
						
						billMaster.setPayeeTypeId(billRecMaster.getPayeeTypeId());
						billMaster.setPayeeMainId(billRecMaster.getPayeeMainId());
						billMaster.setPayeeLeafId(billRecMaster.getPayeeLeafId());
						
						billMaster.setDeleted("N");
						billMaster.setRefundFlag("Y");
						billMaster.setPayMode(billRecMaster.getPayMode());
						billMaster.setbNumber(billRecMaster.getbNumber());
						billMaster.setBatchNumber(billRecMaster.getBatchNumber());
						billMaster.setbName(billRecMaster.getbName());
						billMaster.setTotalAmt(billRecMaster.getTotalAmt());
						billMaster.setTotalDisc(billRecMaster.getTotalDisc());
						billMaster.setTotalQty(1);
						billMaster.setTotalPaid(billRecMaster.getTotalPaid());// payable
						billMaster.setTotalRemain(billRecMaster.getTotalAmt()-(billRecMaster.getTotalPaid()+billRecMaster.getTotalDisc()));
						billMaster.setAgainstId(billRecMaster.getAgainstId());	
						
						billMaster.setRefGivenBy(billRecMaster.getRefGivenBy());		
						billMaster.setRefRemark(billRecMaster.getRefRemark());		
						
						// Save Refund Master list
						session.merge(billMaster);
						
						// Get max master id
						Criteria criteriaMax = session.createCriteria(BillRefundMasterDTO.class)
								.setProjection(Projections.max("billRefundId"));
						result = (Integer) criteriaMax.uniqueResult();
						if (result == null) {

							result = -3;
						}
						
					}else{
						
						result=-1;
					}
				}
					
				ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
				int cmnAdvcPaymodeId =Integer.parseInt(resourceBundle.getObject("cmnAdvcPaymodeId").toString());
				// Save Multiple pay mode list
				if(billRecMaster.getPayMode()==cmnAdvcPaymodeId){
					
					// update credit flag of receipt which is against id
					/*CommonadvDto objectToUpdate = (CommonadvDto) session.get(BillReceiptMasterDTO.class, billRecMaster.getAgainstId());
					objectToUpdate.setCommonadv_amnt(billRecMaster.getTotalPaid());*/
					
					Criteria criteria = session.createCriteria(CommonadvDto.class);
					criteria.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
		        	criteria.add(Restrictions.eq("deleted", "N"));
		        	criteria.setProjection(Projections.sum("commonadv_amnt"));
		        	double totComAdvc = (Double) criteria.uniqueResult();
					
					//Session session = session;
					String hql = "UPDATE CommonadvDto set commonadv_amnt =:amt WHERE treatmentId =:trid";
					Query query = session.createQuery(hql);
					
					totComAdvc=totComAdvc-billRecMaster.getTotalPaid();
					query.setParameter("amt",totComAdvc);  
					query.setParameter("trid",billRecMaster.getTreatmentId());  
					query.executeUpdate();
				}
				
			}else{
				
				result=-2;
			}	
			
			setOpdRefMasterSlave(againstId,"refund",session);
			
			session.getTransaction().commit(); // commit the transaction					
			session.close();
			
			// Set bill master totals
			//setBillMasterTotalsForOpd(billRecMaster.getTreatmentId());
			
		} catch (Exception e) {
			
			e.printStackTrace();
			session.getTransaction().rollback();
			return 0;
		}
		
		return result;		
	}
	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	public int getSlaveList(int maxId,int againstId,List<BillReceiptSlaveDTO> lstSlave,Session session,int chargesSlaveId){
		try{
			List<Integer> al=new ArrayList<Integer>();
			int billId=0,treatId=0;
			String docIds="";
			
			String sqlBill="select receipt_count FROM ehat_receipt_master where bill_receipt_id="+maxId;
			Query conQuery = session.createSQLQuery(sqlBill);		
			int receiptMasterCount = (Integer) conQuery.uniqueResult();
					
			for(BillReceiptSlaveDTO slave:lstSlave){
				
				int spsrId = slave.getSourceTypeId();
				if(spsrId == chargesSlaveId){
					
					slave.setBillReceiptMasterId(maxId);
					slave.setReceiptMasterCount(receiptMasterCount);
					al.add(slave.getBillDetailsId());
					session.merge(slave);		
				}						
				
				billId=slave.getBillId();
				treatId=slave.getTreatmentId();
				//docIds =slave.getDoctorId()+",";				
			}	
			
			if(againstId==0){	
			
				//doctor id in opd receipt master
				Criteria criteria = session.createCriteria(BillReceiptSlaveDTO.class);
				criteria.add(Restrictions.eq("treatmentId", treatId));
				criteria.add(Restrictions.eq("billId", billId));		
				criteria.add(Restrictions.eq("billReceiptMasterId", maxId));
				criteria.setProjection( Projections.distinct( Projections.property("doctorId")));			
				@SuppressWarnings("unchecked")
				List<Integer> listDocs = (List<Integer>) criteria.list();
				for(Integer id:listDocs){
					
					docIds=docIds+id+",";
				}
				
				String exactDoctIds=docIds.substring(0,docIds.length()-1);
				
				BillReceiptMasterDTO objMaster = (BillReceiptMasterDTO) session.get(BillReceiptMasterDTO.class, maxId);
				objMaster.setDoctorIds(exactDoctIds);
				//BillDetailsDto dto=new BillDetailsDto();
				
				for(int id:al){
					
					BillDetailsDto objectToUpdate = (BillDetailsDto) session.get(BillDetailsDto.class, id);
					objectToUpdate.setPaidFlag("Y");				
				}
			}
			
		}catch (Exception e) {
			
			e.printStackTrace();
			return 0;
		}				
		return 1;
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Get bill receipt details
	 ************/
	public BillReceiptMasterDTO getBillReceiptDetails(BillReceiptMasterDTO billRecMaster,String callFrom){	
					
		try {
			BillReceiptMasterDTO billReceiptMasterObj=new BillReceiptMasterDTO();
			List<BillReceiptMasterDTO> blist = new ArrayList<BillReceiptMasterDTO>();
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillReceiptMasterDTO.class);			
			criteria.add(Restrictions.eq("unitId", billRecMaster.getUnitId()));
			if(callFrom.equals("console")){
				
				List<TreatmentDto> lstTreatDto = billRecMaster.getListTreatDto();
				List<Integer> treatIds=new ArrayList<Integer>();
				treatIds.add(0);
				int cashPaidSpId=0;
				for(TreatmentDto dto:lstTreatDto){
					
					treatIds.add(dto.getTreatmentId());
					cashPaidSpId =  dto.getCount();
				}
								
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.in("treatmentId", treatIds));
				if(cashPaidSpId == -10){
					
					criteria.add(Restrictions.eq("paidByCashFlag", "Y"));
				}else{
					
					criteria.add(Restrictions.eq("paidByCashFlag", "N"));
				}				
				criteria.add(Restrictions.eq("patientId", billRecMaster.getPatientId()));
				if(billRecMaster.getSponsorCatId() > 0){
					
					criteria.add(Restrictions.eq("sponsorCatId", billRecMaster.getSponsorCatId()));	
				}
				
			}else{
				
				criteria.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
				//criteria.add(Restrictions.eq("billId", billRecMaster.getBillId()));	
				if(billRecMaster.getSponsorCatId() > 0){
					
					criteria.add(Restrictions.eq("sponsorCatId", billRecMaster.getSponsorCatId()));	
				}
				//Added by Vinod 
				int userId=billRecMaster.getCreatedBy();
				
				/*String sql="select ifnull(user_Type,'') as user_Type FROM users where status='Y' and User_ID="+userId;                
				Query uTypeQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);                        
				String uType = (String) uTypeQuery.uniqueResult(); 
				
				if (! uType.equals("admin"))  {
	                criteria.add(Restrictions.eq("createdBy", billRecMaster.getCreatedBy()));
	            }*/	
				if(callFrom.equals("allForChk")){
					
					criteria.add(Restrictions.eq("deleted", "N"));
					criteria.add(Restrictions.eq("paidByCashFlag", "N"));
					
				}else{
								
					if(callFrom.equals("cash")){
						
						criteria.add(Restrictions.eq("totalRemain", 0.0));
						criteria.add(Restrictions.eq("deleted", "N"));
						criteria.add(Restrictions.eq("paidByCashFlag", "N"));
						//criteria.add(Restrictions.eq("receiptOf", billRecMaster.getReceiptOf()));
						
					}else if(callFrom.equals("refundable")){
						
						criteria.add(Restrictions.eq("deleted", "N"));
						criteria.add(Restrictions.eq("againstId", 0));
						criteria.add(Restrictions.eq("paidByCashFlag", "N"));
						//criteria.add(Restrictions.eq("receiptOf", billRecMaster.getReceiptOf()));					
					}
					
					else if(callFrom.equals("credit")){
						
						criteria.add(Restrictions.gt("totalRemain", 0.0));
						criteria.add(Restrictions.eq("deleted", "N"));
						criteria.add(Restrictions.eq("paidByCashFlag", "N"));
						//criteria.add(Restrictions.eq("receiptOf", billRecMaster.getReceiptOf()));
						
					}else if(callFrom.equals("refund")){
						
						criteria.add(Restrictions.eq("refundFlag", "Y"));
						criteria.add(Restrictions.eq("deleted", "N"));
						criteria.add(Restrictions.eq("paidByCashFlag", "N"));
						//criteria.add(Restrictions.eq("receiptOf", billRecMaster.getReceiptOf()));
						
					}else if(callFrom.equals("deleted")){
						
						criteria.add(Restrictions.eq("deleted", "Y"));
						criteria.add(Restrictions.not(Restrictions.eq("totalAmt", 0.0)));
						criteria.add(Restrictions.eq("paidByCashFlag", "N"));
						//criteria.add(Restrictions.eq("receiptOf", billRecMaster.getReceiptOf()));
						
					}else if(callFrom.equals("cashPaid")){
						
						criteria.add(Restrictions.eq("paidByCashFlag", "Y"));
						criteria.add(Restrictions.eq("deleted", "N"));
						
					}else{
						criteria.add(Restrictions.eq("deleted", "N"));
						criteria.add(Restrictions.eq("paidByCashFlag", "N"));
						//criteria.add(Restrictions.eq("receiptOf", billRecMaster.getReceiptOf()));
					}				
				}	
				
			}
			
			
			@SuppressWarnings("unchecked")
			List<BillReceiptMasterDTO> listBillMaster = (List<BillReceiptMasterDTO>) criteria.list();		
			
			for(BillReceiptMasterDTO billMaster:listBillMaster){
									
				Criteria criteriaSlave = sessionFactory.getCurrentSession().createCriteria(BillReceiptSlaveDTO.class);		
				criteriaSlave.add(Restrictions.eq("unitId", billRecMaster.getUnitId()));
				criteriaSlave.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
				criteriaSlave.add(Restrictions.eq("billId", billRecMaster.getBillId()));		
				criteriaSlave.add(Restrictions.eq("billReceiptMasterId", billMaster.getBillReceiptId()));
				if(!callFrom.equals("deleted")){
					
					criteriaSlave.add(Restrictions.eq("deleted", "N"));
				}
								
				@SuppressWarnings("unchecked")
				List<BillReceiptSlaveDTO> listBillReceiptSlave  = criteriaSlave.list();
				for (BillReceiptSlaveDTO billReceiptSlaveDTO : listBillReceiptSlave) {
					
					try {
						String sql = "select IFNULL(doc_name,'-') from ehat_bill_details opd LEFT JOIN doctor d on(d.Doctor_ID=opd.doctor_id) where bill_details_id="
								+ billReceiptSlaveDTO.getBillDetailsId();
						String docName = (String) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult();
						billReceiptSlaveDTO.setDoctorName(docName);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
				billMaster.setListBillReceiptSlave(listBillReceiptSlave);
				blist.add(billMaster);
			} 
			billReceiptMasterObj.setListBillReceiptMaster(blist);
						
			return billReceiptMasterObj;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return null;
		}				
	}
		
	/************
	* @author	: Vinod Udawant
	* @date		: 14-July-2017
	* @codeFor	: Get bill receipt details
	 ************/
	public BillRefundMasterDTO getBillRefundDetails(BillRefundMasterDTO billRecMaster,String callFrom){	
					
		try {
			BillRefundMasterDTO billReceiptMasterObj=new BillRefundMasterDTO();
			List<BillRefundMasterDTO> blist = new ArrayList<BillRefundMasterDTO>();
			
			String hql = "select user_Type from users where User_ID="+billRecMaster.getCreatedBy();
			Query query = sessionFactory.getCurrentSession().createSQLQuery(hql);
			String userType = query.uniqueResult().toString();
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillRefundMasterDTO.class);			
			criteria.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
			criteria.add(Restrictions.eq("billId", billRecMaster.getBillId()));		
			criteria.add(Restrictions.eq("deleted", "N"));	
			criteria.add(Restrictions.eq("unitId", billRecMaster.getUnitId()));	
			//criteria.add(Restrictions.eq("receiptOf", billRecMaster.getReceiptOf()));
			
			if(!userType.equalsIgnoreCase("Admin")) {
			
				criteria.add(Restrictions.eq("createdBy", billRecMaster.getCreatedBy()));
			}
			
			/*if(callFrom.equals("cash") || callFrom.equals("refundable")){
				
				criteria.add(Restrictions.eq("receiptStatus", "paid"));
			}else if(callFrom.equals("credit")){
				
				criteria.add(Restrictions.eq("receiptStatus", "unpaid"));
				
			}else if(callFrom.equals("refund")){
				
				criteria.add(Restrictions.eq("refundFlag", "Y"));
			}*/
			
			
			@SuppressWarnings("unchecked")
			List<BillRefundMasterDTO> listBillMaster = (List<BillRefundMasterDTO>) criteria.list();		
			
			for(BillRefundMasterDTO billMaster:listBillMaster){
									
				Criteria criteriaSlave = sessionFactory.getCurrentSession().createCriteria(BillReceiptSlaveDTO.class);			
				criteriaSlave.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
				criteriaSlave.add(Restrictions.eq("billId", billRecMaster.getBillId()));		
				criteriaSlave.add(Restrictions.eq("billReceiptMasterId", billMaster.getBillRefundId()));
				criteriaSlave.add(Restrictions.eq("deleted", "N"));
				criteriaSlave.add(Restrictions.eq("unitId", billRecMaster.getUnitId()));	
				
				@SuppressWarnings("unchecked")
				List<BillRefundSlaveDTO> listBillReceiptSlave  = criteriaSlave.list();					
				billMaster.setListBillRefundSlave(listBillReceiptSlave);
				blist.add(billMaster);
			} 
			billReceiptMasterObj.setListBillRefundMaster(blist);
						
			return billReceiptMasterObj;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return null;
		}				
	}
	
	//Irfan Khan @date: 20-June-2017 @reason : To calculate and insert profees
	public int professionalFees(int maxId, List<BillReceiptSlaveDTO> lstSlave,int refDocId) {

		ProfessionalFeesDto professionalFeesDto = new ProfessionalFeesDto();

		try {

			for (BillReceiptSlaveDTO slave : lstSlave) {
				// setting values from receipt slave list(component)
				professionalFeesDto.setUnitId(slave.getUnitId());
				professionalFeesDto.setDeptId(slave.getDepartmentId());
				professionalFeesDto.setDoctorId(slave.getDoctorId());
				professionalFeesDto.setServiceId(slave.getServiceId());
				professionalFeesDto.setSubServiceId(slave.getSubServiceId());
				professionalFeesDto.setRate(slave.getRate());
				professionalFeesDto.setQuantity(slave.getQuantity());
				professionalFeesDto.setConcession(slave.getConcession());
				professionalFeesDto.setDiscount(slave.getDiscount());
				professionalFeesDto.setAmount(slave.getAmount()-slave.getConcession());
				professionalFeesDto.setTreatmentId(slave.getTreatmentId());
				professionalFeesDto.setPatientId(slave.getPatientId());
				professionalFeesDto.setBillReceiptMasterId(maxId);
				professionalFeesDto.setBillReceiptSlaveId(slave.getBillRecSlaveId());
				professionalFeesDto.setCreatedBy(slave.getCreatedBy());
				professionalFeesDto.setCreatedDateTime(new Date());
				professionalFeesDto.setDeleted("N");
				professionalFeesDto.setVoucherGenerated("N");
				professionalFeesDto.setComponentName(slave.getCompName());
				professionalFeesDto.setRefDrId(refDocId);

				// to get only date from dateTime
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				Date assignDate = sdf.parse(sdf.format(slave
						.getCreatedDateTime()));

				professionalFeesDto.setServiceAssignDate(assignDate);
				//int refDrId = 0;
				double refPfCut = 0;
				double refper = 0;
				Double hospitalPercent = 0.0;
				double hospitalPercentInAmount = 0;
				double pfAmount = 0;

				// get the hospital cut percent for the perticular doctor
				Query q = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT percentage FROM ehat_dr_percentage where doctor_id = "
								+ professionalFeesDto.getDoctorId() + " and"
								+ " dept_id = "
								+ professionalFeesDto.getDeptId()
								+ " and  unit_id ="
								+ professionalFeesDto.getUnitId()
								+ " and  service_id ="
								+ professionalFeesDto.getServiceId());

				@SuppressWarnings("unchecked")
				List<Double> list = q.list();

				// if cut percent is available
				if (list.size() > 0) {
					hospitalPercent = list.get(0);
				} else {// else hospital will get 100%
					hospitalPercent = 100.0;
				}

				// calculate hospitalCut in amount
				hospitalPercentInAmount = ((professionalFeesDto.getAmount() * hospitalPercent) / 100);

				// calculate profees of doctor
				pfAmount = professionalFeesDto.getAmount()
						- hospitalPercentInAmount;

				// calculation for referred patient
				if (refDocId > 0) {

					// query to fetch refdr percent from table
					
					Query q1 = sessionFactory.getCurrentSession().createSQLQuery("SELECT refDocPer FROM hospitalaccinfo");

					@SuppressWarnings("unchecked")
					List<Double> list1 = q1.list();
					if(list1.size() > 0){
						refper =list1.get(0);
					}
					

					if (slave.getServiceId() == 1) {// registration
						hospitalPercent = 100 - refper;
						refPfCut = (refper * slave.getAmount()) / 100;

						hospitalPercentInAmount = slave.getAmount() - refPfCut;
					} else {
						if (pfAmount > 0) {
							refPfCut = (refper * pfAmount) / 100;

							pfAmount = pfAmount - refPfCut;
						} else {
							hospitalPercent = 100 - refper;
							refPfCut = (refper * slave.getAmount()) / 100;
							hospitalPercentInAmount = slave.getAmount()
									- refPfCut;
						}
					}
				}

				// Setting values after calculations
				professionalFeesDto.setPfAmount(pfAmount);
				professionalFeesDto.setPfPaid(0);
				professionalFeesDto.setPfUnpaid(pfAmount);
				professionalFeesDto.setPfPaidStatus("unpaid");
				professionalFeesDto.setRefDrPercent(refper);
				professionalFeesDto.setRefDrAmount(refPfCut);
				professionalFeesDto.setHospPercent(hospitalPercent);
				professionalFeesDto.setHospPercentInAmount(hospitalPercentInAmount);

				// insert record in profees table
				sessionFactory.getCurrentSession().merge(professionalFeesDto);
			}
		} catch (Exception e) {

			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 26-July-2017
	* @codeFor	: Get total payable
	 ************/
	public BillDetailsDto getTotalPayable(BillDetailsDto billRecMaster,String callFrom){	
			
		int unitId=billRecMaster.getUnitId();
		int depId=billRecMaster.getDepartmentId();
		try {
			
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
			String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");   
			String pharmacy_Serve_Id = (String)resourceBundleEhat.getString("pharmacy");    
			int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
			int pharmacyServId = Integer.parseInt(pharmacy_Serve_Id);
			
                      
			//service  list by user
          	ArrayList<Integer> sIds11=new ArrayList<Integer>();
          	String[] servIds1 = null;
 			String servIds2=null;
            String sql2="select IFEMPTY(service_id, '0') as service_id from users where User_ID="+billRecMaster.getCreatedBy()+" and " 
 			+ "(dept_id = "+depId+" OR dept_id LIKE '"+depId+",%' OR dept_id LIKE '%,"+depId+",%' OR dept_id LIKE '%,"+depId+"') and " 
 			+ "(unitmaster_id = "+unitId+" OR unitmaster_id LIKE '"+unitId+",%' OR unitmaster_id LIKE '%,"+unitId+",%' OR unitmaster_id LIKE '%,"+unitId+"')"; 
            SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
            query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            @SuppressWarnings("unchecked")
			List<Map<String, Object>> data2 = query2.list();
          
            if(query2.list().isEmpty()){
                	
            }else{
                	
	        	for(Map<String, Object> row : data2){
	        		servIds2=(String)row.get("service_id");
	        	}
             
	        	if(servIds2.length()>0){
	        		servIds1=servIds2.split(",");
	        		for(String id:servIds1){
	        			sIds11.add(Integer.parseInt(id));
	        		}
	        	}  
            }
				
            
            BillDetailsDto billObj=new BillDetailsDto();
			List<BillDetailsDto> blist = new ArrayList<BillDetailsDto>();
			     
           if(billRecMaster.getChargesSlaveId() > 0){
        	   
        	   if(billRecMaster.getServiceId()>0){
	            	
	            	sql2="select amount,concession,other_amount,other_concession,service_id from ehat_bill_details where unit_id="+billRecMaster.getUnitId()+" and treatment_id="+billRecMaster.getTreatmentId()+" and charges_slave_id="+billRecMaster.getChargesSlaveId()+" and deleted='N' and paid_by_cash_flag='N' and paid_flag='N' and cancle='N' and service_id="+billRecMaster.getServiceId()+" ";
	            	
	            }else if(servIds2!=null){
	            					
	            	sql2="select amount,concession,other_amount,other_concession,service_id from ehat_bill_details where unit_id="+billRecMaster.getUnitId()+" and treatment_id="+billRecMaster.getTreatmentId()+" and charges_slave_id="+billRecMaster.getChargesSlaveId()+" and deleted='N' and paid_by_cash_flag='N' and paid_flag='N' and cancle='N' and service_id in("+servIds2+") and service_id !="+pharmacyInvoice+" ";
				
	            }else{
					
					sql2="select amount,concession,other_amount,other_concession,service_id from ehat_bill_details where unit_id="+billRecMaster.getUnitId()+" and treatment_id="+billRecMaster.getTreatmentId()+" and charges_slave_id="+billRecMaster.getChargesSlaveId()+" and deleted='N' and paid_by_cash_flag='N' and paid_flag='N' and cancle='N' and service_id !="+pharmacyInvoice+" ";
				}
	            
	            SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
	            query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	            @SuppressWarnings("unchecked")
	        	List<Map<String, Object>> listBillMaster = query3.list();
				
	            for(Map<String, Object> row : listBillMaster){
	        		
	            	BillDetailsDto billMaster=new BillDetailsDto();
	            	billMaster.setAmount((Double)row.get("amount"));
	            	billMaster.setConcession((Double)row.get("concession"));
	            	billMaster.setOtherAmount((Double)row.get("other_amount"));
	            	billMaster.setOtherConcession((Double)row.get("other_concession"));    
	            	billMaster.setServiceId((Integer)row.get("service_id"));    
	            	blist.add(billMaster);
	        	}
        	   
	       }else{
				
				if(billRecMaster.getServiceId()>0){
	            	
	            	sql2="select amount,concession,other_amount,other_concession,service_id from ehat_bill_details where unit_id="+billRecMaster.getUnitId()+" and treatment_id="+billRecMaster.getTreatmentId()+" and deleted='N' and paid_by_cash_flag='N' and paid_flag='N' and cancle='N' and service_id="+billRecMaster.getServiceId()+" ";
	            	
	            }else if(servIds2!=null){
	            					
	            	sql2="select amount,concession,other_amount,other_concession,service_id from ehat_bill_details where unit_id="+billRecMaster.getUnitId()+" and treatment_id="+billRecMaster.getTreatmentId()+" and deleted='N' and paid_by_cash_flag='N' and paid_flag='N' and cancle='N' and service_id in("+servIds2+") and service_id !="+pharmacyInvoice+" ";
				
	            }else{
					
					sql2="select amount,concession,other_amount,other_concession,service_id from ehat_bill_details where unit_id="+billRecMaster.getUnitId()+" and treatment_id="+billRecMaster.getTreatmentId()+" and deleted='N' and paid_by_cash_flag='N' and paid_flag='N' and cancle='N' and service_id !="+pharmacyInvoice+" ";
				}
	            
	            SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
	            query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	            @SuppressWarnings("unchecked")
	        	List<Map<String, Object>> listBillMaster = query3.list();
				
	            for(Map<String, Object> row : listBillMaster){
	        		
	            	BillDetailsDto billMaster=new BillDetailsDto();
	            	billMaster.setAmount((Double)row.get("amount"));
	            	billMaster.setConcession((Double)row.get("concession"));
	            	billMaster.setOtherAmount((Double)row.get("other_amount"));
	            	billMaster.setOtherConcession((Double)row.get("other_concession"));    
	            	billMaster.setServiceId((Integer)row.get("service_id"));    
	            	blist.add(billMaster);
	        	}        
	        }
			billObj.setListBillDetails(blist);		
			return billObj;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return null;
		}				
	}
	
	//@author : Sagar kadam @date: 10-Aug-2017 @reason : To fetch Bank Master List
 	@SuppressWarnings("unchecked")
	@Override
	public  BankMaster getBankMasterList() {
		List<BankMaster> ltBankMaster = null;
		BankMaster obj=new BankMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BankMaster.class);
			criteria.add(Restrictions.eq("bankDeleteFlag", 0));
 			ltBankMaster = criteria.list();
 			obj.setLtBankMaster(ltBankMaster);
 			
		} catch (Exception e) {
			e.printStackTrace();
			return obj;
		}
		return obj;
	}	 
 	
	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Get bill receipt details
	 ************/
	public BulkSettlementViewDTO getBulkReceiptDetails(BulkSettlementMasterDTO billRecMaster,String callFrom){	
					
		try {
			BulkSettlementViewDTO bulkSettlement=new BulkSettlementViewDTO();			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BulkSettlementViewDTO.class);			
			criteria.add(Restrictions.not(Restrictions.eq("finalRemain", 0.0)));
			criteria.add(Restrictions.gt("finalRemain", 0.0));			
			criteria.setMaxResults(15);
			/*if(callFrom.equals("cash")){
				
				criteria.add(Restrictions.eq("receiptStatus", "paid"));
				criteria.add(Restrictions.eq("deleted", "N"));
			}else if(callFrom.equals("credit")){
				
				criteria.add(Restrictions.eq("receiptStatus", "unpaid"));
				criteria.add(Restrictions.eq("deleted", "N"));
				
			}else if(callFrom.equals("refund")){
				
				criteria.add(Restrictions.eq("refundFlag", "Y"));
				criteria.add(Restrictions.eq("deleted", "N"));
			}else if(callFrom.equals("deleted")){
				
				criteria.add(Restrictions.eq("deleted", "Y"));
				criteria.add(Restrictions.not(Restrictions.eq("totalAmt", 0.0)));
				
			}else{
				criteria.add(Restrictions.eq("deleted", "N"));
			}*/			
			
			@SuppressWarnings("unchecked")
			List<BulkSettlementViewDTO> listBulkSettlement = (List<BulkSettlementViewDTO>) criteria.list();		
			
			/*for(BillReceiptMasterDTO billMaster:listBillMaster){
									
				Criteria criteriaSlave = sessionFactory.getCurrentSession().createCriteria(BillReceiptSlaveDTO.class);			
				criteriaSlave.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
				criteriaSlave.add(Restrictions.eq("billId", billRecMaster.getBillId()));		
				criteriaSlave.add(Restrictions.eq("billReceiptMasterId", billMaster.getBillReceiptId()));
				criteriaSlave.add(Restrictions.eq("deleted", "N"));
				
				@SuppressWarnings("unchecked")
				List<BillReceiptSlaveDTO> listBillReceiptSlave  = criteriaSlave.list();					
				billMaster.setListBillReceiptSlave(listBillReceiptSlave);
				blist.add(billMaster);
			}*/ 
			bulkSettlement.setListBulkSettlement(listBulkSettlement);						
			return bulkSettlement;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return null;
		}				
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	public int saveBulkDetails(BulkSettlementMasterDTO bulkMaster,String multiPayDetails,String bulkSlaveDetails){	
			
		Session session = sessionFactory.openSession(); // create session object from the session factory
		session.beginTransaction(); // initialize the transaction object from session
		Integer bulkMstId=0;
		try {		
			
			MultiBulkReceiptMasterDTO objMultiPayMode = (MultiBulkReceiptMasterDTO) ConfigUIJSONUtility
                    .getObjectFromJSON(multiPayDetails, MultiBulkReceiptMasterDTO.class);
			
			BulkSettlementSlaveDTO objBulkSlave = (BulkSettlementSlaveDTO) ConfigUIJSONUtility
                    .getObjectFromJSON(bulkSlaveDetails, BulkSettlementSlaveDTO.class);
			
			// Save Main Bulk Master start	
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
			String todays_date = formatter.format(currentDate.getTime());
			
			bulkMaster.setCreatedDateTimeStr(todays_date);
			bulkMaster.setCreatedDateTime(new Date());
			bulkMaster.setAccountStatusBulk("N");
			session.merge(bulkMaster);
			
			Criteria criteriaMax = session.createCriteria(BulkSettlementMasterDTO.class).setProjection(Projections.max("bulkMasterId"));
			bulkMstId = (Integer) criteriaMax.uniqueResult();
			
			if (bulkMstId == null) {

				bulkMstId = 0;
			}
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			int multiPaymodeId =Integer.parseInt(resourceBundle.getObject("multiPaymodeId").toString());
			
			// Save Multiple pay mode list
			if(bulkMaster.getPayMode()==multiPaymodeId){
				
				saveBulkMultiPayMode(bulkMstId,bulkMaster,objMultiPayMode.getListMultiBillReceiptMaster(),session);
			}
			
			//Save Bulk Slave start	
			int treatmentId=0;
			int departmentId=0;
			for(int i=0;i<objBulkSlave.getListBulkSettlementSlave().size();i++){
				
				BulkSettlementSlaveDTO objSlave = objBulkSlave.getListBulkSettlementSlave().get(i);
				objSlave.setBulkMasterId(bulkMstId);
				objSlave.setCreatedDateTime(new Date());
				objSlave.setAccountStatusBulk("N");
				treatmentId=objSlave.getTreatmentId();
				departmentId = objSlave.getDepartmentId();
				session.merge(objSlave);
				objSlave=null;		
				
				 // update paid flag in ehat_bill_details or  ehat_bill_details_ipd
				  if(departmentId == 1 || departmentId == 3) {
				    	String sqlOpd="update  ehat_bill_details set paid_flag='Y' where treatment_id="+treatmentId+"   ";
				       SQLQuery q  =session.createSQLQuery(sqlOpd);
				       q.executeUpdate();
				    }else if(departmentId == 2) {
				    	String sqlOpd="update  ehat_bill_details_ipd set paid_flag='Y' where treatment_id="+treatmentId+"   ";
					       SQLQuery q  =session.createSQLQuery(sqlOpd);
					       q.executeUpdate();
				    }
			}
			
			// Refact remains in receipts
			setRemainInReceiptMaster(objBulkSlave,session);
			
			//set bulk amount distribute into ipd and opd 
			setBulkAmountDistribute(objBulkSlave,session);
			
			 // update paid flag in ehat_bill_details or  ehat_bill_details_ipd
			//    if(bulkMaster.getDepartmentId() == 1 || bulkMaster.getDepartmentId() == 3) {
			/*  if(departmentId == 1 || departmentId == 3) {
			    	String sqlOpd="update  ehat_bill_details set paid_flag='Y' where treatment_id="+treatmentId+"   ";
			       SQLQuery q  =session.createSQLQuery(sqlOpd);
			       q.executeUpdate();
			    }else if(departmentId == 2) {
			    	String sqlOpd="update  ehat_bill_details_ipd set paid_flag='Y' where treatment_id="+treatmentId+"   ";
				       SQLQuery q  =session.createSQLQuery(sqlOpd);
				       q.executeUpdate();
			    }*/
			// end
			
			session.getTransaction().commit(); // commit the transaction
			session.close();
			
		} catch (Exception e) {
			
			e.printStackTrace();
			session.getTransaction().rollback();
			return 0;
		}		
		return bulkMstId;		
	}
	
	//added by vishant for distribute bulk setlment amount nd discount
		private void setBulkAmountDistribute(BulkSettlementSlaveDTO objBulkSlave, Session session) {

			// double paidAmt = 0.0;
//			double remainAmt = bulk.getRemainAmt();
			try {
				List<BulkSettlementSlaveDTO> listBulkSettlementSlave = objBulkSlave.getListBulkSettlementSlave();
				if (listBulkSettlementSlave.size() > 0) {

					for (BulkSettlementSlaveDTO bulk : listBulkSettlementSlave) {
						
						Integer treatmentId = bulk.getTreatmentId();
						Double paidAmt=0.0;
						Double concessionAmt=0.0;
						Double tdsAmt=0.0;
						String sql = "select IFNULL(SUM(paid_amt),0) as paid_amt,IFNULL(SUM(concession),0) as concession,IFNULL(SUM(tds_amt),0) as tds_amt from ehat_bulk_settlement_slave where treatment_id =" + treatmentId;
						Query mastQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						mastQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						@SuppressWarnings("unchecked")
						List<Map<String, Double>> listRecMast = mastQuery.list();
						for (Map<String, Double> row : listRecMast) {

							paidAmt = (Double) row.get("paid_amt");
							concessionAmt = (Double) row.get("concession");
							tdsAmt = (Double) row.get("tds_amt");
							
						}
						
						if(paidAmt==0.0) {
							paidAmt = bulk.getPaidAmt();
							concessionAmt = bulk.getConcession();
							tdsAmt = bulk.getTdsAmt();
							
						}

					if(bulk.getDepartmentId()==1 || bulk.getDepartmentId()==3) {	
						double mastPaidPer = 0.0;
						double slaveTotPaid = 0.0;
						
						double mastConPer = 0.0;
						double slaveTotCon = 0.0;
						double servNetamount = 0.0;
						double concessionAmtPaid = 0.0;
						double slaveTotAmt=0.0;
						
						paidAmt= paidAmt+(concessionAmt+tdsAmt);
						//double paidAmt = bulk.getPaidAmt();

						String hql = "SELECT * FROM ehat_bill_details where deleted='N' and cancle='N' and (case when charges_slave_id=0 then (amount+concession)<>(paid_amt+discount) else " + 
								" (other_amount+other_concession)<>(paid_amt+discount) end) and treatment_id ="+treatmentId;
						Query mastQuery2 = session.createSQLQuery(hql);
						mastQuery2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						@SuppressWarnings("unchecked")
						List<Map<String, Object>> listRecMastDb = mastQuery2.list() ;
						for (Map<String, Object> row : listRecMastDb) {

							int sponsorId = (Integer) row.get("charges_slave_id");
							int detailsId = (Integer) row.get("bill_details_id");
//							double otherAmount=0.00;
							double amount=0.00;
							double discount=0.0;
							double paid_amt=0;
							//double servNetamount=0.00;
							double servConamount=0.00;
							if (sponsorId > 0) {

								slaveTotAmt = (Double) row.get("other_pay");
								discount = (Double) row.get("discount");
								amount = (Double) row.get("other_amount");
								servConamount = (Double) row.get("other_concession");
								paid_amt = (Double) row.get("paid_amt");

							} else {

								discount = (Double) row.get("discount");
								slaveTotAmt = (Double) row.get("co_pay");
								amount = (Double) row.get("amount");
								servConamount = (Double) row.get("concession");
								paid_amt = (Double) row.get("paid_amt");
							}
							
							servNetamount = amount-(servConamount+discount);
							double totalAmt = servNetamount;
						
							Integer bill_details_id = (Integer)row.get("bill_details_id");
//							Integer bill_receipt_master_id = (Integer)row.get("bill_receipt_master_id");
							
							servNetamount = amount-(servConamount+discount);
							//servNetamount = servNetamount;
							
							double servNetamount2 = servNetamount - paid_amt;
							mastPaidPer = (servNetamount2 / paidAmt) * 100;
							slaveTotPaid = (mastPaidPer / 100) * paidAmt;
							
//							mastPaidPer = (paidAmt*100) /totalAmt;
//							
//							
//							slaveTotPaid = (mastPaidPer*servNetamount)/ 100;
							

							
							String billDetails = "update ehat_bill_details set sponsor_paid=" + slaveTotPaid
									+ "  , sponsor_paid_per=" + mastPaidPer 
								//	+", sponsor_con_per="+mastConPer+" ,sponsor_con="+slaveTotCon
									+ " where deleted='N' and cancle='N' and bill_details_id=" + bill_details_id;
							SQLQuery billDetailsQuery = session.createSQLQuery(billDetails);
							billDetailsQuery.executeUpdate();
							
							int servId = (Integer) row.get("service_id"); 
							sql = "select ifnull(iscombination,'N') from ehat_service_master where deleted = 'N' and service_id = "
									+ servId;
							Query billDetailsQuery2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
							String isCombine = (String) billDetailsQuery2.uniqueResult();

							if (isCombine.equals("Y")) {

								//slavePaidPer = (slaveTotPaid * 100) / servNetamount;
								setOpdPkgMasterSlaveNewForBulk(servId, bill_details_id, session, " ", slaveTotPaid, sponsorId, mastPaidPer,servNetamount);
							}
						}	

					}else {
						
						
						double mastPaidPer = 0.0;
						double slaveTotPaid = 0.0;
						double servNetamount = 0.0;
						double slaveTotAmt=0.0;
						//double paidAmt = bulk.getPaidAmt();
						paidAmt= paidAmt+(concessionAmt+tdsAmt);

						String hql = "SELECT * FROM ehat_bill_details_ipd where deleted='N' and cancle='N' "
								+ " and paid_per!=100 and case when charges_slave_id=0 then amount!=0 else other_amount!=0 end "
								+ "and treatment_id ="+bulk.getTreatmentId();
						Query mastQuery2 = session.createSQLQuery(hql);
						mastQuery2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						@SuppressWarnings("unchecked")
						List<Map<String, Object>> listRecMastDb = mastQuery2.list();
						for (Map<String, Object> row : listRecMastDb) {

							int sponsorId = (Integer) row.get("charges_slave_id");
							int detailsId = (Integer) row.get("bill_details_id");
//							double otherAmount=0.00;
							double amount=0.00;
							double servNetamountIpd=0.0;
							double servConamount=0.0;
							double discount=0.0;
							double slavePaidPer=0.0;
							double paidAmtDistribute=0.0;
							if (sponsorId > 0) {

								paidAmtDistribute = (Double) row.get("paid_amt");
								amount = (Double) row.get("other_amount");
								servConamount = (Double) row.get("other_concession");
								discount = (Double) row.get("discount");

							} else {

								paidAmtDistribute = (Double) row.get("paid_amt");
								amount = (Double) row.get("amount");
								servConamount = (Double) row.get("concession");
								discount = (Double) row.get("discount");
							}

							double totalAmt = amount - (servConamount + discount);
							servNetamount = amount - (servConamount + discount);
							servNetamount = servNetamount - paidAmtDistribute;
							mastPaidPer = (servNetamount/paidAmt) * 100;
							slaveTotPaid = (mastPaidPer/100)* paidAmt;

							
								sql = "update ehat_bill_details_ipd set sponsor_paid_per=" + mastPaidPer + ",sponsor_paid=" + slaveTotPaid
										
										+ " where bill_details_id = " + detailsId;
							
							Query recSlaveQuery2 = session.createSQLQuery(sql);
							recSlaveQuery2.executeUpdate();

							int servId = (Integer) row.get("service_id"); 
							sql = "select ifnull(iscombination,'N') from ehat_service_master where deleted = 'N' and service_id = "
									+ servId;
							Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
							String isCombine = (String) billDetailsQuery.uniqueResult();

							if (isCombine.equals("Y")) {

								slavePaidPer = (slaveTotPaid / paidAmt) * 100;
								setIpdPkgMasterSlaveNewForBulk(servId, detailsId, session, "r", slaveTotPaid, sponsorId, slavePaidPer, totalAmt);
								//setIpdPkgMasterSlaveNewForBulk(servId, detailsId, session, "refund", slaveTotPaid, sponsorId, slavePaidPer, totalAmt);
								//setIpdPkgMasterSlave(servId, detailsId, session, "refund", slavePaidPer, sponsorId);
							}
						}	

					}
					
					}}
			} catch (Exception e) {
				e.printStackTrace();
			}

		}
		
		
		//added by vishant
		public int setIpdPkgMasterSlave(int servId,int billDetailsId,Session session,String callFrom,double mastPaidPer,int spId) {
			
			double mastConsnPer=0, mastDiscPer=0, mastRefPer=0,paid_other_amt=0;
	        double slaveTotAmt=0, slaveTotConsn=0, slavePayable=0, slaveTotPaid=0, slaveTotDisc=0, slaveTotRef=0;       
	       		
			//Get slave receipt totals
			String sql="select * from ehat_bill_details_ipd where service_id="+servId+" and bill_details_id="+billDetailsId;
	        Query mastQuery = session.createSQLQuery(sql);
	        mastQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        @SuppressWarnings("unchecked")
	        List<Map<String, Object>> listRecMast = mastQuery.list();
	        for(Map<String, Object> row : listRecMast){
	        	
	        	mastConsnPer=(Double)row.get("concession_per");                
	        	mastDiscPer=(Double)row.get("discount_per");  
	        	mastRefPer=(Double)row.get("refund_per");  
	        }
			
			//Get pkg slave receipt totals
	        sql="select * from ehat_other_bill_detail_for_ipd where deleted='N' and bill_details_id="+billDetailsId;
	        Query slaveQuery = session.createSQLQuery(sql);
	        slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        @SuppressWarnings("unchecked")
	        List<Map<String, Object>> listRecSlave = slaveQuery.list();
	        for(Map<String, Object> row : listRecSlave){
	                       	        	
	        	//int sponsorId=(Integer)row.get("chargesSlave_id");
	        	int pkgSlaveId=(Integer)row.get("other_bill_details_id_for_ipd");
	        	
	        	if(spId > 0){
	        		
	        		slaveTotAmt=(Double)row.get("other_amount");
	        		paid_other_amt=(Double)row.get("paid_other_amt");
	        		
	        	}else{
	        		
	        		slaveTotAmt=(Double)row.get("amount");
	        		paid_other_amt=(Double)row.get("paid_other_amt");
	        	}
	        	            
				/*
				 * slaveTotConsn=(slaveTotAmt*mastConsnPer)/100; slavePayable=slaveTotAmt -
				 * slaveTotConsn; slaveTotDisc=(slavePayable*mastDiscPer)/100;
				 */
	        	slaveTotAmt = slaveTotAmt-paid_other_amt;
	            slaveTotPaid=(slaveTotAmt*mastPaidPer)/100;
	            //slaveTotRef=(slaveTotPaid*mastRefPer)/100;	
	            
	            if(spId > 0){
	            	
	            	 if(callFrom.equals("refund")){
	            		 
	            		 sql="update ehat_other_bill_detail_for_ipd set "
	            		 		+ "sponsor_paid_per="+mastPaidPer+",sponsor_paid="+slaveTotPaid
	            		 		//+",discount_per="+mastDiscPer+",discount="+slaveTotDisc+",refund_per="+mastRefPer+",refund="+slaveTotRef+" "
//	            				 + " ,paid_other_amt=" + slaveTotPaid + " ,paid_other_per=" + mastPaidPer + " "
	            				 +" where other_bill_details_id_for_ipd = "+pkgSlaveId;   
	            	 }else{
	            		 
	            		 sql="update ehat_other_bill_detail_for_ipd set concession_per="+mastConsnPer+",other_concession="+slaveTotConsn+",discount_per="+mastDiscPer+",discount="+slaveTotDisc+",refund_per="+mastRefPer+",refund="+slaveTotRef+" "
	            				 + " ,paid_other_amt=" + slaveTotPaid + " ,paid_other_per=" + mastPaidPer + " "
	            				 +" where other_bill_details_id_for_ipd = "+pkgSlaveId;   
	            	 }            	
	            	
	            }else{
	            	
	            	if(callFrom.equals("refund")){
	            		
	            		sql="update ehat_other_bill_detail_for_ipd set "
	            		 		+ "sponsor_paid_per="+mastPaidPer+",sponsor_paid="+slaveTotPaid
	            		 		//+",discount_per="+mastDiscPer+",discount="+slaveTotDisc+",refund_per="+mastRefPer+",refund="+slaveTotRef+" "
//	            				 + " ,paid_other_amt=" + slaveTotPaid + " ,paid_other_per=" + mastPaidPer + " "
	            				 +" where other_bill_details_id_for_ipd = "+pkgSlaveId;   
	            	}else{
	            		
	            		sql="update ehat_other_bill_detail_for_ipd set concession_per="+mastConsnPer+",concession="+slaveTotConsn+",discount_per="+mastDiscPer+",discount="+slaveTotDisc+",refund_per="+mastRefPer+",refund="+slaveTotRef+" "
	            				+ " ,paid_other_amt=" + slaveTotPaid + " ,paid_other_per=" + mastPaidPer + " "
	            				+" where other_bill_details_id_for_ipd = "+pkgSlaveId;   
	            	}
	            	 
	            }
	           
	            Query recSlaveQuery2 = session.createSQLQuery(sql);
	            recSlaveQuery2.executeUpdate();            
	        }
			return 1;
		}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 15-Jan-2018
	* @codeFor	: Set remains in receipts
	 ************/
	int setRemainInReceiptMaster(BulkSettlementSlaveDTO objSlave,Session session){
		
		try {			
			//Save Bulk Slave start			
			for(int i=0;i<objSlave.getListBulkSettlementSlave().size();i++){
				
				int mulSpsrId=objSlave.getListBulkSettlementSlave().get(i).getBillId();
				double paidAmt=objSlave.getListBulkSettlementSlave().get(i).getPaidAmt();
				double concession=objSlave.getListBulkSettlementSlave().get(i).getConcession();
				double tdsAmt=objSlave.getListBulkSettlementSlave().get(i).getTdsAmt();
				
				String sql="select count(mul_sponsor_id) FROM ehat_multiple_sponsor where deleted='N' and mul_sponsor_id="+mulSpsrId;
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				int count = ((Number)countQuery.uniqueResult()).intValue();
				
				if(count > 0){
					
					sql="select * FROM ehat_multiple_sponsor where deleted='N' and mul_sponsor_id="+mulSpsrId;
					Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")			
					List<Map<String, Object>> listSpDetails = spDetailsQuery.list();
					for(Map<String, Object> row : listSpDetails){
						
						int mulSponsorId=(Integer)row.get("mul_sponsor_id");
						
						double totalAmt=(Double)row.get("total_bill");	
						double totPaid=(Double)row.get("total_paid") + paidAmt;
						double totRemain=(Double)row.get("total_remain");
						double totRefund=(Double)row.get("total_refund");
						//double totDisc=(Double)row.get("discount") + concession;
						double totDisc=0;
						double totConcn=(Double)row.get("total_concn") + concession;	
						double totTds=(Double)row.get("total_tds") + tdsAmt;	
						
						totRemain = totalAmt - (totConcn + totDisc + totPaid + totTds);	
	
						// Update amount in multiSponsor start
						//String hqlForMultiSponsr = "UPDATE MultipleSponsorDto set totalBill =:totalBill,totalPaid =:totalPaid,total_remain =:remaining,totalRefund =:totalRefund,discount =:discount,total_concn =:totalConcn,totalTds =:totalTds WHERE mulSponsorId =:mulSponsorId";
						String hqlForMultiSponsr = "UPDATE MultipleSponsorDto set totalPaid =:totalPaid,total_remain =:remaining,totalRefund =:totalRefund,discount =:discount,total_concn =:totalConcn,totalTds =:totalTds WHERE mulSponsorId =:mulSponsorId";
						Query queryForMultiSponsr = sessionFactory.getCurrentSession().createQuery(hqlForMultiSponsr);
						//queryForMultiSponsr.setDate("updatedDateTime",new Date(new java.util.Date().getTime()));
						//queryForMultiSponsr.setParameter("totalBill",totalAmt);  
						queryForMultiSponsr.setParameter("totalPaid",totPaid);  
						queryForMultiSponsr.setParameter("remaining",totRemain);  
						queryForMultiSponsr.setParameter("totalRefund",totRefund);  
						queryForMultiSponsr.setParameter("discount",totDisc);  
						queryForMultiSponsr.setParameter("totalConcn",totConcn);  
						queryForMultiSponsr.setParameter("totalTds",totTds);  
						queryForMultiSponsr.setParameter("mulSponsorId",mulSponsorId);  
						queryForMultiSponsr.executeUpdate();
						// Update amount in multiSponsor end	
					}			
				}								
			}
			return 1;
		}catch(Exception e){
					
			e.printStackTrace();
			return 0;
		}
	}
	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Get bill receipt details
	 ************/
	@SuppressWarnings("unchecked")
	public BulkSettlementMultiSpsrViewDTO getBulkSearchData(String callFrom,int unitId,int deptId,int sponId,
			Integer sponsorF, Integer sponsorL,String fromDate,String lastDate,String letter){	
					
		try {			
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.setTime(sdf.parse(lastDate));
			c.add(Calendar.DATE, 1);  // number of days to add
			lastDate = sdf.format(c.getTime());  // dt is now the new date		
			
			ArrayList<Integer> al=new ArrayList<Integer>();
			if (sponsorL > 0) {
				
				String sql111 = "SELECT ifnull(isCategory,'-') FROM ehat_charges_master_slave where id="+sponsorL;					
				SQLQuery query111 = sessionFactory.getCurrentSession().createSQLQuery(sql111);		        
				String isCat=(String)query111.uniqueResult();
				
				if(isCat.equals("N")){
					
					al.add(sponsorL);		
				}else{
					
					if (sponsorL > 0) {
						List<ChargesMasterSlave> list=getSponsorList2( sponsorF,sponsorL);
						for (int i = 0; i < list.size(); i++) {
							
							al.add(list.get(i).getSlaveId());				
						}
					}
				}	
			}
						
			BulkSettlementMultiSpsrViewDTO bulkSettlement=new BulkSettlementMultiSpsrViewDTO();			
			
			Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(BulkSettlementMultiSpsrViewDTO.class);			
			criteria2.add(Restrictions.gt("totalRemain", 0.0));				
			criteria2.add(Restrictions.ge("createdDateTime", fromDate)); 
			criteria2.add(Restrictions.le("createdDateTime", lastDate));
			criteria2.addOrder(Order.desc("billId"));
			
			if(callFrom.equalsIgnoreCase("search")){
			
				Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
				Criterion rest2= Restrictions.like("pIdd", "%" + letter + "%");
	 			criteria2.add(Restrictions.or(rest1,rest2));
			}			
			if(unitId>0){
				
				criteria2.add(Restrictions.eq("unitId", unitId));
			}
			if(deptId>0){
				
				criteria2.add(Restrictions.eq("departmentId", deptId));
			}			
			if(al.size()>0 && sponsorL > 0){
				
				criteria2.add(Restrictions.in("sponsorCatId", al));
			}/*else if(sponsorL > 0 && al.size() == 0){
				criteria2.add(Restrictions.eq("sponsorCatId", 0));
				//criteria2.add(Restrictions.eq("sourceTypeId", 1));
			}*/
		
			List<BulkSettlementMultiSpsrViewDTO> listBulkSettlement = (List<BulkSettlementMultiSpsrViewDTO>) criteria2.list();						
			bulkSettlement.setListBulkSettlementMultiSpsr(listBulkSettlement);			
			
			return bulkSettlement;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return null;
		}				
	}
	// getting sponsor ids
	@SuppressWarnings("unchecked")
	public List<ChargesMasterSlave> getSponsorList2(int selfId, int sponsorL) {
		
		List<ChargesMasterSlave> ltCharges = new ArrayList<ChargesMasterSlave>();

		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterSlave.class);

			// conditions check with criteria for fetching proper list

			if (selfId == 0) {
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("chargesMasterDto", 1));
				criteria.add(Restrictions.eq("isCategory", "N"));
			} else {

				// for all service
				List<ChargesMasterSlave> ltCharges2 = null;
				Criteria criteria2 = sessionFactory.getCurrentSession()
						.createCriteria(ChargesMasterSlave.class);
				criteria2.add(Restrictions.eq("deleted", "N"));
				criteria2.add(Restrictions.eq("isCategory", "N"));
				criteria2.add(Restrictions.eq("selfId", selfId));
				ltCharges2 = criteria2.list();

				// select catagories
				List<ChargesMasterSlave> ltCharges3 = null;
				List<ChargesMasterSlave> ltCharges4 = null;
				Criteria criteria3 = sessionFactory.getCurrentSession()
						.createCriteria(ChargesMasterSlave.class);
				criteria3.add(Restrictions.eq("deleted", "N"));
				criteria3.add(Restrictions.eq("isCategory", "Y"));
				criteria3.add(Restrictions.eq("selfId", selfId));
				ltCharges3 = criteria3.list();
				if (ltCharges3 != null) {
					if (ltCharges3.size() > 0) {
						List<Integer> ae2 = new ArrayList<Integer>();

						for (ChargesMasterSlave integer : ltCharges3) {
							ae2.add(integer.getSlaveId());

						}				

						Criteria criteria4 = sessionFactory.getCurrentSession()
								.createCriteria(ChargesMasterSlave.class);
						criteria4.add(Restrictions.eq("deleted", "N"));
						criteria4.add(Restrictions.eq("isCategory", "N"));

						criteria4.add(Restrictions.in("selfId", ae2));
						ltCharges4 = criteria4.list();

					}
				}
				List<Integer> ae = new ArrayList<Integer>();

				for (ChargesMasterSlave integer : ltCharges2) {
					ae.add(integer.getSlaveId());

				}
				if (ltCharges4 != null) {
					for (ChargesMasterSlave integer : ltCharges4) {
						ae.add(integer.getSlaveId());

					}
				}
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("chargesMasterDto", 1));
				criteria.add(Restrictions.eq("isCategory", "N"));
				criteria.add(Restrictions.in("slaveId", ae));
			}
			ltCharges = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltCharges;
		}
		return ltCharges;
	
	}
	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Get bill receipt details
	 ************/
	@SuppressWarnings("unchecked")
	public BillReceiptMasterDTO searchDailyCashReport(String callFrom,int unitId,int deptId,int userId,String fromDate,String toDate){	
					
		try {  
			
			BillReceiptMasterDTO billObj=new BillReceiptMasterDTO();
			List<BillReceiptMasterDTO> blist = new ArrayList<BillReceiptMasterDTO>();
			List<BillRefundMasterDTO> refList = new ArrayList<BillRefundMasterDTO>();
			
			String sql2="";
			String sql3="";
			
			String sql="select ifnull(user_Type,'') as user_Type FROM users where status='Y' and User_ID="+userId;
			Query uTypeQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
			String uType = (String) uTypeQuery.uniqueResult();
			
			if(uType.equals("admin")){
				
				userId = 0;
			}								
			/*sql2="SELECT distinct r.patient_id,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master_ipd r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
					"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+userId+" and r.department_id= "+deptId+" group by r.patient_id";*/
			
			if(deptId==2){
				
				if(userId == 0){
					
					sql2="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master_ipd r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' group by r.patient_id";
										
					sql3="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_refund_master_ipd r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' group by r.patient_id";
					
					refList = setDailyRefundDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql3,refList);
					
					blist = setDailyRepDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql2,blist);
					
				}else{
					sql2="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master_ipd r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+userId+" group by r.patient_id";
										
					sql3="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_refund_master_ipd r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+userId+" group by r.patient_id";
					
					refList = setDailyRefundDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql3,refList);
					
					blist = setDailyRepDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql2,blist);	
				}
				
							
				
			}else if(deptId==0){
				
				if(userId == 0){
					
					sql2="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master_ipd r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' group by r.patient_id";
										
					sql3="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_refund_master_ipd r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' group by r.patient_id";
					
					refList = setDailyRefundDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql3,refList);				
					blist = setDailyRepDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql2,blist);
					
					
					sql2="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' group by r.patient_id";
				
					sql3="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_refund_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' group by r.patient_id";
					
					refList = setDailyRefundDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql3,refList);					
					blist = setDailyRepDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql2,blist);
					
				}else{
				
					sql2="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master_ipd r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+userId+" group by r.patient_id";
										
					sql3="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_refund_master_ipd r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+userId+" group by r.patient_id";
					
					refList = setDailyRefundDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql3,refList);				
					blist = setDailyRepDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql2,blist);
					
					
					sql2="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+userId+"  group by r.patient_id";
				
					sql3="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_refund_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+userId+" group by r.patient_id";
					
					refList = setDailyRefundDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql3,refList);					
					blist = setDailyRepDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql2,blist);
					
				}				
				
             
			}else if(deptId==3){
				
				if(userId == 0){
					sql2="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.department_id = "+deptId+" group by r.patient_id";
				
					sql3="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_refund_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.department_id = "+deptId+" group by r.patient_id";
					
					refList = setDailyRefundDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql3,refList);				
					
					blist = setDailyRepDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql2,blist);
				}else{
					sql2="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.department_id = "+deptId+" and r.created_by = "+userId+"  group by r.patient_id";
				
					sql3="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_refund_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.department_id = "+deptId+" and r.created_by = "+userId+" group by r.patient_id";
					
					refList = setDailyRefundDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql3,refList);				
					
					blist = setDailyRepDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql2,blist);	
				}				
				
			}else{
				
				if(userId == 0){
					sql2="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.department_id = "+deptId+" group by r.patient_id";
				
					sql3="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_refund_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.department_id = "+deptId+" group by r.patient_id";
					
					refList = setDailyRefundDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql3,refList);				
					
					blist = setDailyRepDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql2,blist);
				}else{
					sql2="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.department_id = "+deptId+" and r.created_by = "+userId+"  group by r.patient_id";
				
					sql3="SELECT r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_refund_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.department_id = "+deptId+" and r.created_by = "+userId+" group by r.patient_id";
					
					refList = setDailyRefundDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql3,refList);				
					
					blist = setDailyRepDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql2,blist);	
				}
							
			}
				
			/*sql2="SELECT distinct r.patient_id,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
					"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+userId+" and r.department_id= "+deptId+" group by r.patient_id";*/
			
						
			billObj.setListBillReceiptMaster(blist);	
			billObj.setListBillRefundMaster(refList);
			return billObj;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return null;
		}				
	}
		
	public List<BillReceiptMasterDTO> setDailyRepDto(String callFrom,int unitId,int deptId,int userId,String fromDate,String toDate,String sql2,List<BillReceiptMasterDTO> blist){
		
		if(userId == 0){
			SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
	        query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        
	    	List<Map<String, Object>> listBillMaster = query3.list();
			
	        for(Map<String, Object> row : listBillMaster){
	        
	        	int pid=(Integer)row.get("patient_id");
	        	int depId=(Integer)row.get("department_id");
	        	int payId=(Integer)row.get("pay_mode");  
	        	
	        	String sql="select count(opdipdno) as opdipdno FROM ehat_treatment where deleted='N' and patient_id="+pid;
	    		Query opCountQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
	    		Integer opCount = ((Number) opCountQuery.uniqueResult()).intValue();
	    		String opdipdno = "";
	    		if(opCount > 0){
	    			
	    			if(opCount == 1){
	    				
	    				sql="select ifnull(opdipdno,'-') as opdipdno FROM ehat_treatment where deleted='N' and patient_id="+pid;
			    		Query noQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
			    		opdipdno = (String) noQuery.uniqueResult();
	    			}else{
	    				
	    				sql="select max(treatment_id) FROM ehat_treatment where deleted='N' and patient_id="+pid;
	    	    		Query maxQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
	    	    		Integer maxTreatId = ((Number) maxQuery.uniqueResult()).intValue();
	    	    		
	    	    		sql="select ifnull(opdipdno,'-') as opdipdno FROM ehat_treatment where deleted='N' and treatment_id="+maxTreatId;
			    		Query noQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
			    		opdipdno = (String) noQuery.uniqueResult();
	    			}
	    			
	    		}	        	
	        	
	        	BillReceiptMasterDTO billMaster=new BillReceiptMasterDTO();
	        	billMaster.setbName((String)row.get("patient_name"));            
	        	billMaster.setPatientId((Integer)row.get("patient_id"));  
	        	billMaster.setCreatedDateTime((Date)row.get("created_date_time"));
	        	billMaster.setBillReceiptId((Integer)row.get("bill_receipt_id"));
	        	billMaster.setBatchNumber(opdipdno);	        	
	        	billMaster.setDepartmentId(depId);
	        	
	        	String sqlRemark="";
	        	if(depId==1){
	        		
	        		sqlRemark = "select ifnull(disc_remark,'') as disc_remark,ifnull(receipt_count,0) as receipt_count,ifnull(created_by,0) as created_by from ehat_receipt_master where deleted='N' and date(created_date_time) >= '"+fromDate+"' and date(created_date_time) <= '"+toDate+"' and patient_id="+pid;
	        	}else{
	        		
	        		sqlRemark = "select ifnull(remark,'') as disc_remark,ifnull(receipt_count,0) as receipt_count,ifnull(created_by,0) as created_by from ehat_receipt_master_ipd where deleted='N' and date(created_date_time) >= '"+fromDate+"' and date(created_date_time) <= '"+toDate+"' and patient_id="+pid;
	        	}
	        	
	        	SQLQuery queryRemark = sessionFactory.getCurrentSession().createSQLQuery(sqlRemark);
	        	queryRemark.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        		List<Map<String, Object>> listRemark = queryRemark.list();
        		String createdByName = "";
        		String remarkAll = "";
                for(Map<String, Object> multiRow : listRemark){
                	
                	BigInteger receiptCount = (BigInteger)multiRow.get("receipt_count");  
                	BigInteger createdById = (BigInteger)multiRow.get("created_by");
                	
                	sql="select concat(title,' ',f_name,' ',m_name,' ',l_name) AS user_name FROM users where status='Y' and User_ID="+createdById;
		    		Query noQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
		    		String userName = (String) noQuery.uniqueResult();
                	
                	createdByName = createdByName + userName + "("+receiptCount+") , ";    
                	String remark = (String)multiRow.get("disc_remark");
                	if(!remark.equals("")){
                		
                		remarkAll = remarkAll + remark + "("+receiptCount+") , ";                 	
                	}                	
                }
	        	      
                billMaster.setDiscRemark(remarkAll);
                billMaster.setDoctorIds(createdByName);
                
	        	Double result = (double) 0;
				Double totalDisc = (double) 0;
	        	
	        	for(int i=1;i<=5;i++){
	        		
	        		// Calling stored procedure
					Query query = sessionFactory.getCurrentSession().createSQLQuery("CALL getTotAmtAll (:paymode,:pid,:tblname,:fDate,:tDate)");
					//query.setParameter("uid", userId);
					query.setParameter("paymode", i);
					query.setParameter("pid", pid);
					//Object[] respnseCode = (Object[])query.list();
					
					if(depId==2){
						
						query.setParameter("tblname", "ehat_receipt_master_ipd");
					}else{
						
						query.setParameter("tblname", "ehat_receipt_master");
					}					
					
					query.setParameter("fDate", fromDate);
					query.setParameter("tDate", toDate);
									
					@SuppressWarnings("unchecked")
					List<Object> lstResult = query.list();	
					for (int k=0; k< lstResult.size(); k++){
						   
						Object[] rows = (Object[]) lstResult.get(k);
						Arrays.toString(rows);
						result = Double.valueOf(rows[0].toString());
						if(depId == 2){
							
							totalDisc = Double.valueOf(rows[1].toString());
						}else{
							
							totalDisc = totalDisc + Double.valueOf(rows[1].toString());
						}						
					}
								
					if(i==1)
						billMaster.setTotalAmt(result);  // for cash
					if(i==2)
						billMaster.setTotalPaid(result); // for card
					if(i==3)
						billMaster.setTotalRemain(result); // for cheque
					if(i==4)
						billMaster.setTotalDisc(result); // for common advance
					if(i==5)
						billMaster.setRefundAmt(result); // for multiple
	        	}       	
	        	
	        	String sqlRef="";	        	
	        	if(depId==1){
	        		
	        		sqlRef="select ifnull(count(bill_receipt_id),0) from ehat_receipt_master where deleted='N' and pay_mode=-1 and patient_id="+pid;
	        		
	        	}else{
	        		
	        		sqlRef="select ifnull(count(bill_receipt_id),0) from ehat_receipt_master_ipd where deleted='N' and pay_mode=-1 and patient_id="+pid;
	        	}
	        	
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
				int count = ((Number)refQuery.uniqueResult()).intValue();
	        	
				double discM=0;
				
	        	if(count > 0){
	        		
	        		String multiSql="SELECT ifnull(r.total_paid,0) as totPaid,ifnull(r.total_discount,0) as totalDisc,r.pay_mode from ehat_multi_receipt_master r where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.department_id= "+depId+" and r.patient_id="+pid+" ";			
	        		SQLQuery query4 = sessionFactory.getCurrentSession().createSQLQuery(multiSql);
	        		query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        		List<Map<String, Object>> listMultiMaster = query4.list();
	    			
	                for(Map<String, Object> multiRow : listMultiMaster){
	                
	                	int multiPayId=(Integer)multiRow.get("pay_mode");  
	                	double totPaid=(Double)multiRow.get("totPaid");  
	                	double totDisc=(Double)multiRow.get("totalDisc");  
	                	                    	
	                	if(multiPayId==1){
	                		
	                		totPaid=totPaid+billMaster.getTotalAmt();                    		
	                		billMaster.setTotalAmt(totPaid);  // for cash
	                	}                    		
	    				if(multiPayId==2){
	    					
	    					totPaid=totPaid+billMaster.getTotalPaid();      
	    					billMaster.setTotalPaid(totPaid); // for card
	    				}
	    				
	    				if(multiPayId==3){
	    					
	    					totPaid=totPaid+billMaster.getTotalRemain();      
	    					billMaster.setTotalRemain(totPaid); // for cheque
	    				}
	    					
	    				if(multiPayId==4){
	    					
	    					totPaid=totPaid+billMaster.getTotalDisc();      
	    					billMaster.setTotalDisc(totPaid); // for common advance
	    				}
	    					
	    				if(multiPayId==5){
	    					
	    					result=result+billMaster.getRefundAmt();      
	    					billMaster.setRefundAmt(result); // for multiple
	    				} 
	    				
	    				discM = discM + totDisc;
	                }               
	        	}
	        	
	        	totalDisc = totalDisc + discM;
	        	billMaster.setActualTotConcn(totalDisc);	        	
	        	
	        	blist.add(billMaster);
	        	billMaster = null;
	    	}       
		}else{
			SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
	        query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        
	    	List<Map<String, Object>> listBillMaster = query3.list();
			
	        for(Map<String, Object> row : listBillMaster){
	        
	        	int pid=(Integer)row.get("patient_id");
	        	int depId=(Integer)row.get("department_id");
	        	int payId=(Integer)row.get("pay_mode");  
	        	
	        	String sql="select count(opdipdno) as opdipdno FROM ehat_treatment where deleted='N' and patient_id="+pid;
	    		Query opCountQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
	    		Integer opCount = ((Number) opCountQuery.uniqueResult()).intValue();
	    		String opdipdno = "";
	    		if(opCount > 0){
	    			
	    			if(opCount == 1){
	    				
	    				sql="select ifnull(opdipdno,'-') as opdipdno FROM ehat_treatment where deleted='N' and patient_id="+pid;
			    		Query noQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
			    		opdipdno = (String) noQuery.uniqueResult();
	    			}else{
	    				
	    				sql="select max(treatment_id) FROM ehat_treatment where deleted='N' and patient_id="+pid;
	    	    		Query maxQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
	    	    		Integer maxTreatId = ((Number) maxQuery.uniqueResult()).intValue();
	    	    		
	    	    		sql="select ifnull(opdipdno,'-') as opdipdno FROM ehat_treatment where deleted='N' and treatment_id="+maxTreatId;
			    		Query noQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
			    		opdipdno = (String) noQuery.uniqueResult();
	    			}
	    			
	    		}	
	        	
	        	BillReceiptMasterDTO billMaster=new BillReceiptMasterDTO();
	        	billMaster.setbName((String)row.get("patient_name"));            
	        	billMaster.setPatientId((Integer)row.get("patient_id"));  
	        	billMaster.setCreatedDateTime((Date)row.get("created_date_time"));
	        	billMaster.setBillReceiptId((Integer)row.get("bill_receipt_id"));
	        	billMaster.setBatchNumber(opdipdno);	        	
	        	billMaster.setDepartmentId(depId);
	        	       
	        	String sqlRemark="";
	        	if(depId==1){
	        		
	        		sqlRemark = "select ifnull(disc_remark,'') as disc_remark,ifnull(receipt_count,0) as receipt_count,ifnull(created_by,0) as created_by from ehat_receipt_master where deleted='N' and created_by="+userId+" and date(created_date_time) >= '"+fromDate+"' and date(created_date_time) <= '"+toDate+"' and patient_id="+pid;
	        	}else{
	        		
	        		sqlRemark = "select ifnull(remark,'') as disc_remark,ifnull(receipt_count,0) as receipt_count,ifnull(created_by,0) as created_by from ehat_receipt_master_ipd where deleted='N' and created_by="+userId+" and date(created_date_time) >= '"+fromDate+"' and date(created_date_time) <= '"+toDate+"' and patient_id="+pid;
	        	}
	        	SQLQuery queryRemark = sessionFactory.getCurrentSession().createSQLQuery(sqlRemark);
	        	queryRemark.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        		List<Map<String, Object>> listRemark = queryRemark.list();
        		String createdByName = "";
        		String remarkAll = "";
                for(Map<String, Object> multiRow : listRemark){
                	
                	BigInteger receiptCount = (BigInteger)multiRow.get("receipt_count");  
                	BigInteger createdById = (BigInteger)multiRow.get("created_by");
                	
                	sql="select concat(title,' ',f_name,' ',m_name,' ',l_name) AS user_name FROM users where status='Y' and User_ID="+createdById;
		    		Query noQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
		    		String userName = (String) noQuery.uniqueResult();
                	
                	createdByName = createdByName + userName + "("+receiptCount +") , ";                 	                	
                	String remark = (String)multiRow.get("disc_remark");
                	if(!remark.equals("")){
                		
                		remarkAll = remarkAll + remark + "("+receiptCount +") , ";                 	
                	}                	
                }
                billMaster.setDiscRemark(remarkAll);
                billMaster.setDoctorIds(createdByName);
	        	
	        	Double result = (double) 0;
				Double totalDisc = (double) 0;
	        	
	        	for(int i=1;i<=5;i++){
	        		
	        		// Calling stored procedure
					Query query = sessionFactory.getCurrentSession().createSQLQuery("CALL getTotAmt (:uid,:paymode,:pid,:tblname,:fDate,:tDate)");
					query.setParameter("uid", userId);
					query.setParameter("paymode", i);
					query.setParameter("pid", pid);
					if(depId==2){
						
						query.setParameter("tblname", "ehat_receipt_master_ipd");
					}else{
						
						query.setParameter("tblname", "ehat_receipt_master");
					}					
					
					query.setParameter("fDate", fromDate);
					query.setParameter("tDate", toDate);
									
					@SuppressWarnings("unchecked")
					List<Object> lstResult = query.list();	
					for (int k=0; k< lstResult.size(); k++){
						   
						Object[] rows = (Object[]) lstResult.get(k);
						Arrays.toString(rows);
						result = Double.valueOf(rows[0].toString());
						totalDisc = totalDisc +Double.valueOf(rows[1].toString());
					}
				  				
					if(i==1)
						billMaster.setTotalAmt(result);  // for cash
					if(i==2)
						billMaster.setTotalPaid(result); // for card
					if(i==3)
						billMaster.setTotalRemain(result); // for cheque
					if(i==4)
						billMaster.setTotalDisc(result); // for common advance
					if(i==5)
						billMaster.setRefundAmt(result); // for multiple
	        	}       	
	        	
	        	String sqlRef="";
	        	if(depId==1){
	        		
	        		sqlRef="select ifnull(count(bill_receipt_id),0) from ehat_receipt_master where deleted='N' and pay_mode=-1 and patient_id="+pid;
	        	}else{
	        		
	        		sqlRef="select ifnull(count(bill_receipt_id),0) from ehat_receipt_master_ipd where deleted='N' and pay_mode=-1 and patient_id="+pid;
	        	}
	        	
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
				int count = ((Number)refQuery.uniqueResult()).intValue();
	        	
				double discM=0;
				
	        	if(count > 0){
	        		
	        		String multiSql="SELECT ifnull(r.total_paid,0) as totPaid,ifnull(r.total_discount,0) as totalDisc,r.pay_mode from ehat_multi_receipt_master r where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.department_id= "+depId+" and r.patient_id="+pid+" ";			
	        		SQLQuery query4 = sessionFactory.getCurrentSession().createSQLQuery(multiSql);
	        		query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        		List<Map<String, Object>> listMultiMaster = query4.list();
	    			
	                for(Map<String, Object> multiRow : listMultiMaster){
	                
	                	int multiPayId=(Integer)multiRow.get("pay_mode");  
	                	double totPaid=(Double)multiRow.get("totPaid");  
	                	double totDisc=(Double)multiRow.get("totalDisc");  
	                	                    	
	                	if(multiPayId==1){
	                		
	                		totPaid=totPaid+billMaster.getTotalAmt();                    		
	                		billMaster.setTotalAmt(totPaid);  // for cash
	                	}                    		
	    				if(multiPayId==2){
	    					
	    					totPaid=totPaid+billMaster.getTotalPaid();      
	    					billMaster.setTotalPaid(totPaid); // for card
	    				}
	    				
	    				if(multiPayId==3){
	    					
	    					totPaid=totPaid+billMaster.getTotalRemain();      
	    					billMaster.setTotalRemain(totPaid); // for cheque
	    				}
	    					
	    				if(multiPayId==4){
	    					
	    					totPaid=totPaid+billMaster.getTotalDisc();      
	    					billMaster.setTotalDisc(totPaid); // for common advance
	    				}
	    					
	    				if(multiPayId==5){
	    					
	    					result=result+billMaster.getRefundAmt();      
	    					billMaster.setRefundAmt(totPaid); // for multiple
	    				} 
	    				
	    				discM = discM + totDisc;
	                }               
	        	}
	        	
	        	totalDisc = totalDisc + discM;
	        	billMaster.setActualTotConcn(totalDisc);	        	
	        	
	        	blist.add(billMaster);
	        	billMaster = null;
	    	}       
		}
		
		
        return blist;
	}
	
	public List<BillRefundMasterDTO> setDailyRefundDto(String callFrom,int unitId,int deptId,int userId,String fromDate,String toDate,String sql2,List<BillRefundMasterDTO> blist){
		
		if(userId == 0){

			SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
	        query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        
	    	List<Map<String, Object>> listBillMaster = query3.list();
			
	        for(Map<String, Object> row : listBillMaster){
	        
	        	int pid=(Integer)row.get("patient_id");
	        	int depId=(Integer)row.get("department_id");
	        	int payId=(Integer)row.get("pay_mode");            	
	        	
	        	BillRefundMasterDTO billMaster=new BillRefundMasterDTO();
	        	billMaster.setbName((String)row.get("patient_name"));            
	        	billMaster.setPatientId((Integer)row.get("patient_id"));  
	        	billMaster.setDepartmentId(depId);
	        	
	        	billMaster.setCreatedDateTime((Date)row.get("created_date_time"));  
	        	
	        	String sql="select count(opdipdno) as opdipdno FROM ehat_treatment where deleted='N' and patient_id="+pid;
	    		Query opCountQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
	    		Integer opCount = ((Number) opCountQuery.uniqueResult()).intValue();
	    		String opdipdno = "";
	    		if(opCount > 0){
	    			
	    			if(opCount == 1){
	    				
	    				sql="select ifnull(opdipdno,'-') as opdipdno FROM ehat_treatment where deleted='N' and patient_id="+pid;
			    		Query noQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
			    		opdipdno = (String) noQuery.uniqueResult();
	    			}else{
	    				
	    				sql="select max(treatment_id) FROM ehat_treatment where deleted='N' and patient_id="+pid;
	    	    		Query maxQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
	    	    		Integer maxTreatId = ((Number) maxQuery.uniqueResult()).intValue();
	    	    		
	    	    		sql="select ifnull(opdipdno,'-') as opdipdno FROM ehat_treatment where deleted='N' and treatment_id="+maxTreatId;
			    		Query noQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
			    		opdipdno = (String) noQuery.uniqueResult();
	    			}
	    			
	    		}
	        	
	    		billMaster.setBatchNumber(opdipdno);
	    		
	    		String sqlRemark="";
	        	if(depId==1){
	        		
	        		sqlRemark = "select ifnull(ref_remark,'') as ref_remark,ifnull(receipt_count,0) as receipt_count,ifnull(created_by,0) as created_by from ehat_refund_master where deleted='N' and date(created_date_time) >= '"+fromDate+"' and date(created_date_time) <= '"+toDate+"' and patient_id="+pid;
	        	}else{
	        		
	        		sqlRemark = "select ifnull(remark,'') as ref_remark,ifnull(receipt_count,0) as receipt_count,ifnull(created_by,0) as created_by from ehat_refund_master_ipd where deleted='N' and date(created_date_time) >= '"+fromDate+"' and date(created_date_time) <= '"+toDate+"' and patient_id="+pid;
	        	}
	        	SQLQuery queryRemark = sessionFactory.getCurrentSession().createSQLQuery(sqlRemark);
	        	queryRemark.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        		List<Map<String, Object>> listRemark = queryRemark.list();
        		String createdByName = "";
        		String remarkAll = "";
                for(Map<String, Object> multiRow : listRemark){
                	
                	BigInteger receiptCount = (BigInteger)multiRow.get("receipt_count");  
                	BigInteger createdById = (BigInteger)multiRow.get("created_by");
                	
                	sql="select concat(title,' ',f_name,' ',m_name,' ',l_name) AS user_name FROM users where status='Y' and User_ID="+createdById;
		    		Query noQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
		    		String userName = (String) noQuery.uniqueResult();
                	
                	createdByName = createdByName + userName + "("+receiptCount +") , ";                 	                	
                	String remark = (String)multiRow.get("ref_remark");
                	if(!remark.equals("")){
                		
                		remarkAll = remarkAll + remark + "("+receiptCount +") , ";                 	
                	}                	
                }
                billMaster.setRefRemark(remarkAll);
                billMaster.setDoctorIds(createdByName);
	    			        	
	        	for(int i=1;i<=5;i++){
	        		
	        		// Calling stored procedure
					Query query = sessionFactory.getCurrentSession().createSQLQuery("CALL getTotRefAmtAll (:paymode,:pid,:tblname,:fDate,:tDate)");
					//query.setParameter("uid", userId);
					query.setParameter("paymode", i);
					query.setParameter("pid", pid);
					if(depId==2){
						
						query.setParameter("tblname", "ehat_refund_master_ipd");
					}else{
						
						query.setParameter("tblname", "ehat_refund_master");
					}
						
					
					query.setParameter("fDate", fromDate);
					query.setParameter("tDate", toDate);
					double result = (Double) query.uniqueResult();
					    				
					if(i==1)
						billMaster.setTotalAmt(result);  // for cash
					if(i==2)
						billMaster.setTotalPaid(result); // for card
					if(i==3)
						billMaster.setTotalRemain(result); // for cheque
					if(i==4)
						billMaster.setTotalDisc(result); // for common advance
					if(i==5)
						billMaster.setTotalQty(result); // for multiple
	        	}      
	        	
	        	String sqlRef="";
	        	if(depId==2){
	        		
	        		sqlRef="select ifnull(count(bill_refund_id),0) from ehat_refund_master_ipd where deleted='N' and pay_mode=-1 and patient_id="+pid;
	        		        		
	        	}else{
	        		
	        		sqlRef="select ifnull(count(bill_refund_id),0) from ehat_refund_master where deleted='N' and pay_mode=-1 and patient_id="+pid;
	        	}
	        	
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
				int count = ((Number)refQuery.uniqueResult()).intValue();
	        	
	        	if(count > 0){
	        		
	        		String multiSql="SELECT ifnull(r.total_paid,0) as totPaid,r.pay_mode from ehat_multi_receipt_master r where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.department_id= "+depId+" and r.patient_id="+pid+" ";			
	        		SQLQuery query4 = sessionFactory.getCurrentSession().createSQLQuery(multiSql);
	        		query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        		List<Map<String, Object>> listMultiMaster = query4.list();
	    			
	                for(Map<String, Object> multiRow : listMultiMaster){
	                
	                	int multiPayId=(Integer)multiRow.get("pay_mode");  
	                	double result=(Double)multiRow.get("totPaid");  
	                	                    	
	                	if(multiPayId==1){
	                		
	                		result=result+billMaster.getTotalAmt();                    		
	                		billMaster.setTotalAmt(result);  // for cash
	                	}                    		
	    				if(multiPayId==2){
	    					
	    					result=result+billMaster.getTotalPaid();      
	    					billMaster.setTotalPaid(result); // for card
	    				}
	    				
	    				if(multiPayId==3){
	    					
	    					result=result+billMaster.getTotalRemain();      
	    					billMaster.setTotalRemain(result); // for cheque
	    				}
	    					
	    				if(multiPayId==4){
	    					
	    					result=result+billMaster.getTotalDisc();      
	    					billMaster.setTotalDisc(result); // for common advance
	    				}
	    					
	    				if(multiPayId==5){
	    					
	    					result=result+billMaster.getTotalQty();      
	    					billMaster.setTotalQty(result); // for multiple
	    				}                   	
	                }            		
	        	}
	        	
	        	blist.add(billMaster);
	    	}       
	        
		}else{
			SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
	        query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        
	    	List<Map<String, Object>> listBillMaster = query3.list();
			
	        for(Map<String, Object> row : listBillMaster){
	        
	        	int pid=(Integer)row.get("patient_id");
	        	int depId=(Integer)row.get("department_id");
	        	int payId=(Integer)row.get("pay_mode");            	
	        	
	        	BillRefundMasterDTO billMaster=new BillRefundMasterDTO();
	        	billMaster.setbName((String)row.get("patient_name"));            
	        	billMaster.setPatientId((Integer)row.get("patient_id"));  
	        	billMaster.setDepartmentId(depId);
	        	
	        	billMaster.setCreatedDateTime((Date)row.get("created_date_time"));  
	        	
	        	String sql="select count(opdipdno) as opdipdno FROM ehat_treatment where deleted='N' and patient_id="+pid;
	    		Query opCountQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
	    		Integer opCount = ((Number) opCountQuery.uniqueResult()).intValue();
	    		String opdipdno = "";
	    		if(opCount > 0){
	    			
	    			if(opCount == 1){
	    				
	    				sql="select ifnull(opdipdno,'-') as opdipdno FROM ehat_treatment where deleted='N' and patient_id="+pid;
			    		Query noQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
			    		opdipdno = (String) noQuery.uniqueResult();
	    			}else{
	    				
	    				sql="select max(treatment_id) FROM ehat_treatment where deleted='N' and patient_id="+pid;
	    	    		Query maxQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
	    	    		Integer maxTreatId = ((Number) maxQuery.uniqueResult()).intValue();
	    	    		
	    	    		sql="select ifnull(opdipdno,'-') as opdipdno FROM ehat_treatment where deleted='N' and treatment_id="+maxTreatId;
			    		Query noQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
			    		opdipdno = (String) noQuery.uniqueResult();
	    			}
	    			
	    		}
	        	
	    		billMaster.setBatchNumber(opdipdno);
	    		
	    		String sqlRemark="";
	        	if(depId==1){
	        		
	        		sqlRemark = "select ifnull(ref_remark,'') as ref_remark,ifnull(receipt_count,0) as receipt_count,ifnull(created_by,0) as created_by from ehat_refund_master where deleted='N' and created_by="+userId+" and date(created_date_time) >= '"+fromDate+"' and date(created_date_time) <= '"+toDate+"' and patient_id="+pid;
	        	}else{
	        		
	        		sqlRemark = "select ifnull(remark,'') as ref_remark,ifnull(receipt_count,0) as receipt_count,ifnull(created_by,0) as created_by from ehat_refund_master_ipd where deleted='N' and created_by="+userId+" and date(created_date_time) >= '"+fromDate+"' and date(created_date_time) <= '"+toDate+"' and patient_id="+pid;
	        	}
	        	SQLQuery queryRemark = sessionFactory.getCurrentSession().createSQLQuery(sqlRemark);
	        	queryRemark.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        		List<Map<String, Object>> listRemark = queryRemark.list();
        		String createdByName = "";
        		String remarkAll = "";
                for(Map<String, Object> multiRow : listRemark){
                	
                	BigInteger receiptCount = (BigInteger)multiRow.get("receipt_count");  
                	BigInteger createdById = (BigInteger)multiRow.get("created_by");
                	
                	sql="select concat(title,' ',f_name,' ',m_name,' ',l_name) AS user_name FROM users where status='Y' and User_ID="+createdById;
		    		Query noQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
		    		String userName = (String) noQuery.uniqueResult();
                	
                	createdByName = createdByName + userName + "("+receiptCount +") , ";                 	                	
                	String remark = (String)multiRow.get("ref_remark");
                	if(!remark.equals("")){
                		
                		remarkAll = remarkAll + remark + "("+receiptCount +") , ";                 	
                	}                	
                }
                billMaster.setRefRemark(remarkAll);
                billMaster.setDoctorIds(createdByName);	        	
	        	
	        	for(int i=1;i<=5;i++){
	        		
	        		// Calling stored procedure
					Query query = sessionFactory.getCurrentSession().createSQLQuery("CALL getTotRefAmt (:uid,:paymode,:pid,:tblname,:fDate,:tDate)");
					query.setParameter("uid", userId);
					query.setParameter("paymode", i);
					query.setParameter("pid", pid);
					if(depId==2){
						
						query.setParameter("tblname", "ehat_refund_master_ipd");
					}else{
						
						query.setParameter("tblname", "ehat_refund_master");
					}
						
					
					query.setParameter("fDate", fromDate);
					query.setParameter("tDate", toDate);
					double result = (Double) query.uniqueResult();
					    				
					if(i==1)
						billMaster.setTotalAmt(result);  // for cash
					if(i==2)
						billMaster.setTotalPaid(result); // for card
					if(i==3)
						billMaster.setTotalRemain(result); // for cheque
					if(i==4)
						billMaster.setTotalDisc(result); // for common advance
					if(i==5)
						billMaster.setTotalQty(result); // for multiple
	        	}      
	        	
	        	String sqlRef="";
	        	if(depId==2){
	        		
	        		sqlRef="select ifnull(count(bill_refund_id),0) from ehat_refund_master_ipd where deleted='N' and pay_mode=-1 and patient_id="+pid;
	        		        		
	        	}else{
	        		
	        		sqlRef="select ifnull(count(bill_refund_id),0) from ehat_refund_master where deleted='N' and pay_mode=-1 and patient_id="+pid;
	        	}
	        	
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
				int count = ((Number)refQuery.uniqueResult()).intValue();
	        	
	        	if(count > 0){
	        		
	        		String multiSql="SELECT ifnull(r.total_paid,0) as totPaid,r.pay_mode from ehat_multi_receipt_master r where " +
							"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+userId+" and r.department_id= "+depId+" and r.patient_id="+pid+" ";			
	        		SQLQuery query4 = sessionFactory.getCurrentSession().createSQLQuery(multiSql);
	        		query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        		List<Map<String, Object>> listMultiMaster = query4.list();
	    			
	                for(Map<String, Object> multiRow : listMultiMaster){
	                
	                	int multiPayId=(Integer)multiRow.get("pay_mode");  
	                	double result=(Double)multiRow.get("totPaid");  
	                	                    	
	                	if(multiPayId==1){
	                		
	                		result=result+billMaster.getTotalAmt();                    		
	                		billMaster.setTotalAmt(result);  // for cash
	                	}                    		
	    				if(multiPayId==2){
	    					
	    					result=result+billMaster.getTotalPaid();      
	    					billMaster.setTotalPaid(result); // for card
	    				}
	    				
	    				if(multiPayId==3){
	    					
	    					result=result+billMaster.getTotalRemain();      
	    					billMaster.setTotalRemain(result); // for cheque
	    				}
	    					
	    				if(multiPayId==4){
	    					
	    					result=result+billMaster.getTotalDisc();      
	    					billMaster.setTotalDisc(result); // for common advance
	    				}
	    					
	    				if(multiPayId==5){
	    					
	    					result=result+billMaster.getTotalQty();      
	    					billMaster.setTotalQty(result); // for multiple
	    				}                   	
	                }            		
	        	}
	        	
	        	blist.add(billMaster);
	    	}       
	        
		}
		
		return blist;
		
	}
	
	
	
	public boolean masterConfigAccess(int unitId, int deptId, int serviceId) {
		
		Query q = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT count(*) FROM ehat_master_config where deleted='N' and unit_id="
						+ unitId + " and dept_id=" + deptId
						+ " and service_id=" + serviceId);

		Integer count = ((Number) q.uniqueResult()).intValue();

		if (count > 0) {
			return true;
		} else {
			return false;
		}

	}
	/************
	* @author	: BILAL
	* @date		: 31-10-2017
	* @codeFor	: Get bill receipt id
	 ************/
	@Override
	public int fetchreceiptId(int treatmentId, int billDetailsId) {
		 Integer a=0;
			try {	
				Query hallType = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT bill_receipt_master_id FROM ehat_receipt_slave where bill_details_id="+billDetailsId+" and treatment_id="+treatmentId+" and deleted='N'");

				a =(Integer) hallType.uniqueResult();
			} catch (Exception e) {
				e.printStackTrace();
				return  a;
			}
			return  a;
	}

	@Override
	public BillReceiptMasterDTO fetchAllReceiptTotals(BillReceiptMasterDTO obj,String callFrom) {
		
		BillReceiptMasterDTO masterObj=new BillReceiptMasterDTO();
		
		try {			
			
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
			String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");   
			String pharmacy_Serve_Id = (String)resourceBundleEhat.getString("pharmacy");    
			int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
			int pharmacyServId = Integer.parseInt(pharmacy_Serve_Id);
						
			if(callFrom.equals("sponsorWiseOpd") || callFrom.equals("sponsorWiseIpd")){
				
				String sql="";
				double ipdRefund=0;
				double totAmt=0,totConcn=0,totDisc=0,totPaid=0,totRemain=0,totRefund=0;
				
				if(callFrom.equals("sponsorWiseOpd")){
						
					sql="select ifnull(sum(other_amount),0) as totAmt,ifnull(sum(other_concession),0) as totConcn FROM ehat_bill_details where deleted='N' and treatment_id="+obj.getTreatmentId()+" and charges_slave_id="+obj.getSponsorCatId()+" and cancle='N' and paid_by_cash_flag='N' and service_id != "+pharmacyInvoice+" ";
					
				}else{
						
					sql="select ifnull(sum(other_amount),0) as totAmt,ifnull(sum(other_concession),0) as totConcn,service_id FROM ehat_bill_details_ipd where deleted='N' and treatment_id="+obj.getTreatmentId()+" and charges_slave_id="+obj.getSponsorCatId()+" and cancle='N' and paid_by_cash_flag='N' and service_id != "+pharmacyInvoice+" and service_id != "+pharmacyServId+" ";
					
				}					
				
				Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				billDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listBillDetails = billDetailsQuery.list();
				for(Map<String, Object> row : listBillDetails){
					
					totAmt=(Double)row.get("totAmt");
					totConcn=(Double)row.get("totConcn");					
				}
				
				if(callFrom.equals("sponsorWiseOpd")){
					
					sql="select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid," +
							"ifnull(sum(total_remain),0) as totRemain,ifnull(sum(refund_amt),0) as totRefund FROM ehat_receipt_master where deleted='N' and paid_by_cash_flag='N' and treatment_id="+obj.getTreatmentId()+" and sponsor_cat_id="+obj.getSponsorCatId()+" and against_id=0 ";
					
				}else{
					
					sql="select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid," +
							"ifnull(sum(total_remain),0) as totRemain FROM ehat_receipt_master_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+obj.getTreatmentId()+" and sponsor_cat_id="+obj.getSponsorCatId()+" and against_id=0 ";
					
					String sqlRef="select ifnull(sum(total_paid),0) from ehat_refund_master_ipd where deleted='N' and sponsor_cat_id="+obj.getSponsorCatId()+" and treatment_id="+obj.getTreatmentId()+" ";
					Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
					ipdRefund =(Double) refQuery.uniqueResult();
				}
					
				
				Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> listRec = recQuery.list();
				for(Map<String, Object> row : listRec){
					
					totDisc=(Double)row.get("totDisc");
					totPaid=(Double)row.get("totPaid");			
					totRemain=(Double)row.get("totRemain");	
					
					if(callFrom.equals("sponsorWiseOpd")){
						
						totRefund=(Double)row.get("totRefund");	
					
					}else{
						
						totRefund=ipdRefund;					
					}
				}
				
				/*sql="select ifnull(sum(total_paid),0) FROM ehat_multiple_sponsor where deleted='N' and charges_slave_id="+obj.getSponsorCatId()+" and treatment_id="+obj.getTreatmentId();
				Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrpaid =(Double) spQuery.uniqueResult();
				
				sql="select ifnull(sum(discount),0) FROM ehat_multiple_sponsor where deleted='N' and charges_slave_id="+obj.getSponsorCatId()+" and treatment_id="+obj.getTreatmentId();
				Query conQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrCon =(Double) conQuery.uniqueResult();
				
				sql="select ifnull(sum(total_tds),0) FROM ehat_multiple_sponsor where deleted='N' and charges_slave_id="+obj.getSponsorCatId()+" and treatment_id="+obj.getTreatmentId();
				Query tdsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrTds =(Double) tdsQuery.uniqueResult();*/
				
				sql="select ifnull(sum(paid_amt),0) FROM ehat_bulk_settlement_slave where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrpaid =(Double) spQuery.uniqueResult();
				
				sql="select ifnull(sum(concession),0) FROM ehat_bulk_settlement_slave where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query conQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrCon =(Double) conQuery.uniqueResult();
				
				sql="select ifnull(sum(tds_amt),0) FROM ehat_bulk_settlement_slave where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query tdsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrTds =(Double) tdsQuery.uniqueResult();
							
				//totalSpnsrpaid = totalSpnsrpaid - totPaid;
				//totalSpnsrCon = totalSpnsrCon - totDisc;
				
				totalSpnsrpaid = totalSpnsrpaid + totalSpnsrCon + totalSpnsrTds;
				
				masterObj.setActualAmt(totAmt);
				masterObj.setActualTotConcn(totConcn);
				masterObj.setTotalDisc(totDisc);
				masterObj.setTotalPaid(totPaid);
				masterObj.setTotalRemain(totRemain);
				masterObj.setRefundAmt(totRefund);
				masterObj.setTotalSonsorAmt(totalSpnsrpaid);
					
			}else{
				
				/*RegistrationController regCon=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
	            RegTreBillDto rtd = new RegTreBillDto();            
	            
	            if(regCon != null){
	               
	            	rtd=regCon.fetchPatientsRecordByTreatmentId(obj.getTreatmentId());
	                rtd=rtd.getListRegTreBillDto().get(0);
	                rtd.getPatientName();
	                
	                obj.setSponsorCatId(rtd.getSourceTypeId()); 
	            }*/	                
				
				String sql="";
				double ipdRefund=0;
				double totAmt=0,totConcn=0,totDisc=0,totPaid=0,totRemain=0,totRefund=0;
				
				if(callFrom.equals("opd")){
					
					if(obj.getSponsorCatId()>0){
						
						sql="select ifnull(sum(other_amount),0) as totAmt,ifnull(sum(other_concession),0) as totConcn FROM ehat_bill_details where deleted='N' and paid_by_cash_flag='N' and treatment_id="+obj.getTreatmentId()+" and cancle='N' and paid_by_cash_flag='N' and service_id != "+pharmacyInvoice+" ";
					}else{
						
						sql="select ifnull(sum(amount),0) as totAmt,ifnull(sum(concession),0) as totConcn FROM ehat_bill_details where deleted='N' and paid_by_cash_flag='N' and treatment_id="+obj.getTreatmentId()+" and cancle='N' and paid_by_cash_flag='N' and service_id != "+pharmacyInvoice+" ";
					}
				}else{
					
					if(obj.getSponsorCatId()>0){
						
						sql="select ifnull(sum(other_amount),0) as totAmt,ifnull(sum(other_concession),0) as totConcn,service_id FROM ehat_bill_details_ipd where deleted='N' and treatment_id="+obj.getTreatmentId()+" and cancle='N' and paid_by_cash_flag='N' and service_id != "+pharmacyInvoice+" and service_id != "+pharmacyServId+" ";
					}else{
						
						sql="select ifnull(sum(amount),0) as totAmt,ifnull(sum(concession),0) as totConcn,service_id FROM ehat_bill_details_ipd where deleted='N' and treatment_id="+obj.getTreatmentId()+" and cancle='N' and paid_by_cash_flag='N' and service_id != "+pharmacyInvoice+" and service_id != "+pharmacyServId+" ";
					}
				}					
				
				Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				billDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listBillDetails = billDetailsQuery.list();
				for(Map<String, Object> row : listBillDetails){
					
					totAmt=(Double)row.get("totAmt");
					totConcn=(Double)row.get("totConcn");					
				}
				
				if(callFrom.equals("opd")){
					
					sql="select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid," +
							"ifnull(sum(total_remain),0) as totRemain,ifnull(sum(refund_amt),0) as totRefund FROM ehat_receipt_master where deleted='N' and paid_by_cash_flag='N' and treatment_id="+obj.getTreatmentId()+" and against_id=0 ";
					
				}else{
					
					sql="select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid," +
							"ifnull(sum(total_remain),0) as totRemain FROM ehat_receipt_master_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+obj.getTreatmentId()+" and against_id=0 ";
					
					String sqlRef="select ifnull(sum(total_paid),0) from ehat_refund_master_ipd where deleted='N' and treatment_id="+obj.getTreatmentId()+" ";
					Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
					ipdRefund =(Double) refQuery.uniqueResult();
				}
					
				
				Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> listRec = recQuery.list();
				for(Map<String, Object> row : listRec){
					
					totDisc=(Double)row.get("totDisc");
					totPaid=(Double)row.get("totPaid");			
					totRemain=(Double)row.get("totRemain");	
					
					if(callFrom.equals("opd")){
						
						totRefund=(Double)row.get("totRefund");	
					
					}else{
						
						totRefund=ipdRefund;					
					}
				}
				
				/*sql="select ifnull(sum(total_paid),0) FROM ehat_multiple_sponsor where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrpaid =(Double) spQuery.uniqueResult();
				
				sql="select ifnull(sum(discount),0) FROM ehat_multiple_sponsor where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query conQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrCon =(Double) conQuery.uniqueResult();
				
				sql="select ifnull(sum(total_tds),0) FROM ehat_multiple_sponsor where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query tdsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrTds =(Double) tdsQuery.uniqueResult();*/
				
				sql="select ifnull(sum(paid_amt),0) FROM ehat_bulk_settlement_slave where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrpaid =(Double) spQuery.uniqueResult();
				
				sql="select ifnull(sum(concession),0) FROM ehat_bulk_settlement_slave where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query conQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrCon =(Double) conQuery.uniqueResult();
				
				sql="select ifnull(sum(tds_amt),0) FROM ehat_bulk_settlement_slave where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query tdsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrTds =(Double) tdsQuery.uniqueResult();
							
				//totalSpnsrpaid = totalSpnsrpaid - totPaid;
				//totalSpnsrCon = totalSpnsrCon - totDisc;
				
				totalSpnsrpaid = totalSpnsrpaid + totalSpnsrCon + totalSpnsrTds;
				
				double remain=(totAmt)-(totDisc+totPaid+totConcn+totalSpnsrpaid);	
				
				masterObj.setActualAmt(totAmt);
				masterObj.setActualTotConcn(totConcn);
				masterObj.setTotalDisc(totDisc);
				masterObj.setTotalPaid(totPaid);
				masterObj.setTotalRemain(remain);
				masterObj.setRefundAmt(totRefund);
				masterObj.setTotalSonsorAmt(totalSpnsrpaid);
				
			}
			
					
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		return masterObj;
	}

	
	//irfan miracleous code for bulk 11 nov
	public int saveMultiPayModeBulk(int maxId,BulkSettlementMasterDTO obj,List<MultiBillReceiptMasterDTO> lst){
		
		int result=0;
		try{
			System.err.println("size--->"+lst.size());
			for(MultiBillReceiptMasterDTO multiObj:lst){
				
				multiObj.setBillReceiptId(maxId);
				multiObj.setAgainstId(0);
				multiObj.setUnitId(obj.getUnitId());
				multiObj.setTreatmentId(obj.getTreatmentId());
				multiObj.setPatientId(obj.getPatientId());
				multiObj.setBillId(obj.getBillId());				
				multiObj.setDepartmentId(obj.getDepartmentId());			
				multiObj.setTotalAmt(obj.getTotalAmt());
				multiObj.setTotalDisc(obj.getTotalConsn());
				multiObj.setTotalQty(obj.getTotalQty());		
				multiObj.setTotalRemain(obj.getTotalAmt()-multiObj.getTotalPaid());	
				multiObj.setCreatedBy(obj.getCreatedBy());
				multiObj.setCreatedDateTime(new Date());			
				multiObj.setDeleted("N");
				/*multiObj.setTotalPaid(obj.getTotalPaid());
				multiObj.setPayMode(billRecMaster.getPayMode());
				multiObj.setbNumber(billRecMaster.getbNumber());
				multiObj.setbName(billRecMaster.getbName());*/
				multiObj.setSourceTypeId(0);
				multiObj.setSponsorCatId(0);
				multiObj.setReceiptStatus("unpaid");
				
				// Save multi paymode list
				sessionFactory.getCurrentSession().merge(multiObj);			
				result=1;		
			}	
		}catch (Exception e) {
			
			e.printStackTrace();
			return 0;
		}		
		return result;
	}	
	
	/*public int setOpdRecMasterSlave(BillReceiptMasterDTO recMaster,String callFrom,Session session) {
		
		int result=0;
		try {
			
			double totalAmt=0, totPaid=0, totDiscount=0, totRemain=0, totRefund=0;
			int treatmentId=0, soprId=0, recId=0;
			double compAmt=0,compConPer=0,compPayable=0,totCompConAmt=0,totCompPayable=0,compDiscAmt=0,totCompDiscAmt=0,compDiscPer=0;
			
			// Get receipt master amounts
			totalAmt=recMaster.getActualAmt();
			totPaid=recMaster.getTotalPaid();
			totRefund=recMaster.getRefundAmt();
			int maxReceiptId=recMaster.getBillReceiptId();
			if(recMaster.getAgainstId()>0){
				
				// Calling stored procedure for get super master of receipt
				Query query2 = session.createSQLQuery("CALL fetchSuperReceiptId (:receiptId)").setParameter("receiptId", maxReceiptId);
				Integer superRecId = (Integer) query2.uniqueResult();
								
				// Query for get details amounts of super master
				double actualTotalAmt=0;
				double actualTotalPaid=0;
				double actualTotalDisc=0;
				double actualTotalRefund=0;
				List<BillReceiptSlaveDTO> lstRecSlave=new ArrayList<BillReceiptSlaveDTO>();
				String sql2="select actual_amt,total_paid,total_discount,actual_tot_concn from ehat_receipt_master where bill_receipt_id="+superRecId+" "; 
				SQLQuery getMaster = session.createSQLQuery(sql2);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
				List<Map<String, Object>> masterRow = getMaster.list();
			          
			    for(Map<String, Object> row : masterRow){
		    		
			    	actualTotalAmt=(Double)row.get("actual_amt");
			    	actualTotalPaid=(Double)row.get("total_paid");
			    	actualTotalDisc=(Double)row.get("total_discount");
			    	totalAmt=actualTotalAmt;
			    	//actualTotalRefund=(Double)row.get("refund_amt");
		    	}
			    				    
			    String sql3="select bill_details_id,actual_amt from ehat_receipt_slave where bill_receipt_master_id="+superRecId+" "; 
				SQLQuery getSlave = session.createSQLQuery(sql3);
				getSlave.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			  
				List<Map<String, Object>> lstSlave = getSlave.list();
			          
			    for(Map<String, Object> row : lstSlave){
		    		
			    	BillReceiptSlaveDTO obj=new BillReceiptSlaveDTO();
			    	obj.setBillDetailsId((Integer)row.get("bill_details_id"));
			    	obj.setActualAmt((Double)row.get("actual_amt"));			    	
			    	lstRecSlave.add(obj);
			    	obj=null;
		    	}	
			}
			
			totDiscount=recMaster.getTotalDisc();
			treatmentId=recMaster.getTreatmentId();
			soprId=recMaster.getSponsorCatId();
			recId=recMaster.getBillReceiptId();			
			
			String sql="select ifnull(sum(actual_payable),0) from ehat_receipt_slave where deleted='N' and bill_receipt_master_id="+recId+" and treatment_id="+treatmentId+" ";
			Query recQuery = session.createSQLQuery(sql);		
			totCompPayable = (Double) recQuery.uniqueResult();
			
			// Calculate comp disc amt given on total rec master
			compDiscAmt=(totCompPayable*totDiscount)/100;
			// Calculate each comp disc percentage
			compDiscPer=(totCompPayable*100)/totalAmt;
			
			sql="update ehat_receipt_slave set actual_disc_per = "+compDiscPer+" where bill_receipt_master_id = "+recId+" and treatment_id="+treatmentId+" ";	
			Query recSlaveQuery = session.createSQLQuery(sql);
			recSlaveQuery.executeUpdate();				
			
			sql="update ehat_receipt_slave set actual_final_payable = (actual_amt - (actual_amt * (actual_concn_per + actual_disc_per) / 100)), "+
				" actual_final_paid = (actual_amt - (actual_amt * (actual_concn_per + actual_disc_per) / 100)) where bill_receipt_master_id = "+recId+" and treatment_id="+treatmentId+" ";	
			Query recSlaveQuery2 = session.createSQLQuery(sql);
			recSlaveQuery2.executeUpdate();			
			
			sql="select ifnull(sum(actual_concn_amt),0) from ehat_receipt_slave where deleted='N' and bill_receipt_master_id="+recId+" and treatment_id="+treatmentId+" ";
			Query recMasterQuery = session.createSQLQuery(sql);		
			totCompConAmt = (Double) recMasterQuery.uniqueResult();
			
			sql="select ifnull(sum(actual_disc_amt),0) from ehat_receipt_slave where deleted='N' and bill_receipt_master_id="+recId+" and treatment_id="+treatmentId+" ";
			Query recMasterQuery2 = session.createSQLQuery(sql);		
			totCompDiscAmt = (Double) recMasterQuery2.uniqueResult();
			
			double mastConPer=(totCompConAmt*100)/totalAmt;
			double mastDiscPer=(totCompDiscAmt*100)/totalAmt;
						
			sql="update ehat_receipt_master set actual_con_per="+mastConPer+",actual_disc_per = "+mastDiscPer+"  "+
				"where bill_receipt_master_id = "+recId+" and treatment_id="+treatmentId+" ";	
			Query recSlaveQuery3 = session.createSQLQuery(sql);
			recSlaveQuery3.executeUpdate();	
			
			
			// distributePaidBySlave(recId, lstRecSlave, totalAmt, (actualTotalPaid+totPaid));
						
			result=1;
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return result;
	}*/

	
	@Override
	public BillReceiptMasterDTO fetchPrevPending(BillReceiptMasterDTO obj,String callFrom) {
		
		BillReceiptMasterDTO masterObj=new BillReceiptMasterDTO();
		List<BillReceiptMasterDTO> lstBillMaster=new ArrayList<BillReceiptMasterDTO>();
		try {			
			
			RegistrationController regCon=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
            RegTreBillDto rtd = new RegTreBillDto();     
            int patId=0;
            int sprId=0;
            int treatId=0;
            if(regCon != null){
               
            	rtd=regCon.fetchPatientsRecordByTreatmentId(obj.getTreatmentId());
                rtd=rtd.getListRegTreBillDto().get(0);
                rtd.getPatientName();
                patId=rtd.getPatientId();
                sprId=rtd.getSourceTypeId();
                treatId=rtd.getTreatmentId();     
                obj.setSponsorCatId(rtd.getSourceTypeId()); 
            }            
            
            String sqlRef="select ifnull(count(treatment_id),0) from ehat_treatment where deleted='N' and patient_id="+patId+" and treatment_id <>"+treatId;
			Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
			int count = ((Number)refQuery.uniqueResult()).intValue();
			String trIds="";   
			double totPending=0;
			if(count > 0){
				
				//sqlRef="select GROUP_CONCAT(treatment_id SEPARATOR ',') from ehat_treatment where deleted='N' and patient_id="+patId;
				sqlRef="select treatment_id from ehat_treatment where deleted='N' and t_flag='N' and patient_id="+patId+" and treatment_id <>"+treatId;
				//trIds = ((Number) refQuery.uniqueResult()).intValue();
				Query billQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
				billQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listBill = billQuery.list();
				for(Map<String, Object> row : listBill){
					
					trIds=trIds+(Integer)row.get("treatment_id")+",";					
				}
				trIds=trIds.substring(0, (trIds.length()-1));
				
				if(callFrom.equals("onload")){
					
					sqlRef="select ifnull(sum(total_remain), 0) from ehat_receipt_master where deleted = 'N' and patient_id = "+patId+" and treatment_id in ("+trIds+") and total_remain > 0 and against_id=0 and source_type_id=0";
					Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);					
					totPending = (Double) billDetailsQuery.uniqueResult();
					
					masterObj.setTotalRemain(totPending);
				}else{			
				
					sqlRef="select * from ehat_receipt_master where deleted = 'N' and patient_id = "+patId+" and treatment_id in ("+trIds+") and total_remain > 0 and against_id=0 and source_type_id=0";
					Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
					billDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")			
					List<Map<String, Object>> listBillDetails = billDetailsQuery.list();
					for(Map<String, Object> row : listBillDetails){
						
						BillReceiptMasterDTO objData=new BillReceiptMasterDTO();
						objData.setTreatmentId((Integer)row.get("treatment_id"));		
						objData.setBillReceiptId((Integer)row.get("bill_receipt_id"));		
						objData.setActualAmt((Double)row.get("actual_amt"));		
						objData.setTotalPaid((Double)row.get("total_paid"));
						objData.setTotalDisc((Double)row.get("total_discount"));
						objData.setActualTotConcn((Double)row.get("actual_tot_concn"));
						objData.setTotalRemain((Double)row.get("total_remain"));
						objData.setCreatedDateTime((java.util.Date)row.get("created_date_time"));
						lstBillMaster.add(objData);
						objData=null;
					}
					masterObj.setListBillReceiptMaster(lstBillMaster);
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		return masterObj;
	}

	@Override
	public EhatBillPrefix getBillPrefix(EhatBillPrefix obj, String callFrom) {
		
		List<EhatBillPrefix> ltBillPrefix = null;
		EhatBillPrefix objPrefix=new EhatBillPrefix();
		int depId=obj.getDepId();
		ArrayList<Integer> depIds=new ArrayList<Integer>();
		depIds.add(depId);
		depIds.add(0);
		depIds.add(4);
		
		Criteria criteriaPrefix = sessionFactory.getCurrentSession().createCriteria(EhatBillPrefix.class);
		criteriaPrefix.add(Restrictions.eq("deleted", "N"));				
		criteriaPrefix.add(Restrictions.in("depId", depIds));
		ltBillPrefix = criteriaPrefix.list();
		
		objPrefix.setListEhatBillPrefix(ltBillPrefix);
		return objPrefix;
	}
	
	@Override
	public double getEmergancyCharges() {
		   double a=0;
			try {	
				Query emerChr = sessionFactory.getCurrentSession().createSQLQuery(
						"select emrChrPer from hospitalaccinfo where idhospitalAccInfo=1"
								);

				a =(Double) emerChr.uniqueResult();
			} catch (Exception e) {
				
				e.printStackTrace();
				System.err.println("ehatException -: Class Name :"+
	                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
	                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
				return  a;
			}
			return  a;
		}
	


	@SuppressWarnings("unchecked")
	@Override
	public Integer paidTestSendToLab(Integer treatmentId,HttpServletRequest request){
		List<ConfigurServicesDto> listSubSerId=null;
		List<BillDetailsDto> billDetObjList=null;
		List<EhatOtherBillDetailForOpdDto> listOpdSubSerId=null;
		String sid = (String)resourceBundleEhat.getString("labHeadingID");
		String pkgID = (String)resourceBundleEhat.getString("packageID");
		String LabMachineFlow = (String)resourceBundleEhat.getString("LabMachineFlow");
		
		int packageID = Integer.parseInt(pkgID);//13
		int serviceId = Integer.parseInt(sid);//11
		Integer serId[]={packageID,serviceId};
		String currentRec = (String)resourceBundleEhat.getString("currentRec");
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		Calendar calendar = Calendar.getInstance();
		try{
		Criteria criteriaBillDet= sessionFactory.getCurrentSession().createCriteria(BillDetailsDto.class);
		criteriaBillDet.add(Restrictions.eq("treatmentId", treatmentId));
		criteriaBillDet.add(Restrictions.eq("paidFlag", "Y"));
		criteriaBillDet.add(Restrictions.eq("sndToLabFlag", "N"));
		criteriaBillDet.add(Restrictions.in("serviceId", serId));
		
		billDetObjList = criteriaBillDet.list();
		
		for(BillDetailsDto billDetailsDto:billDetObjList){
				//Getting object of LabRequestDTO to genereate requivision number
				LabRequestDTO  labReq = new LabRequestDTO();
				//setting values
				labReq.setInsertedBy(userId);
				labReq.setInsertedDatetime(calendar);
				labReq.setDeptId(billDetailsDto.getDepartmentId());
				labReq.setPatientId(billDetailsDto.getPatienttId());
				labReq.setTreatmentId(billDetailsDto.getTreatmentId());
				labReq.setUnitId(unitId);
				//Added by Laxman for test_status.
				labReq.setTestStatus(currentRec);
				
				//Saving LabRequest pojo
				int labReqId = (Integer) sessionFactory.getCurrentSession().save(labReq);
				//check service id for package or profile. 
				if(billDetailsDto.getServiceId()==serviceId){//for profile 11.
					
					String code =(String) sessionFactory.getCurrentSession().createSQLQuery("SELECT ifnull(code_name,'-') FROM ehat_subservice where id='"+billDetailsDto.getSubServiceId()+"'").uniqueResult();
					
					LabRequestSlaveDTO labReqtSlv = new LabRequestSlaveDTO();
					labReqtSlv.setLabRequestId(labReqId);
					labReqtSlv.setBillDetailsID(billDetailsDto.getBillDetailsId());
					labReqtSlv.setServiceId(billDetailsDto.getServiceId());
					labReqtSlv.setSubServiceId(billDetailsDto.getSubServiceId());
					labReqtSlv.setLabTestCode(code);
					labReqtSlv.setRefDocId(billDetailsDto.getDoctorId());
					labReqtSlv.setDeptId(billDetailsDto.getDepartmentId());
					//Insert value in lab slave
					int labReqslvid = (Integer) sessionFactory.getCurrentSession().save(labReqtSlv);
					labReqtSlv.setLabReqSlvId(labReqslvid);
					
					if (LabMachineFlow.equalsIgnoreCase("on")) {
						//Call saveLabTestData().
						int res = saveLabTestData(labReq,labReqtSlv,labReqId,labReqslvid);
							if(res==0){
								return -4;
							}
					}
				}
				else if(billDetailsDto.getServiceId()==packageID){//for package 13,
					int packageId = billDetailsDto.getSubServiceId();
					
						//if count greater than zero then package will be assign 
						
						/*if (billDetailsDto.getSponsorId() == 0 && billDetailsDto.getChargesSlaveId()==0) {
							try {
								
								int	count = getCount(billDetailsDto.getSponsorId(),billDetailsDto.getChargesSlaveId(),0,0,packageId,billDetailsDto.getServiceId());
								
								if (count > 0) {
									listSubSerId=getListSubSerIdInPkg(billDetailsDto.getSponsorId(),billDetailsDto.getChargesSlaveId(),0,0,packageId);
								}
								
							} catch (Exception e) {
								e.printStackTrace();
							}
						} else if (billDetailsDto.getSponsorId() > 0 && billDetailsDto.getChargesSlaveId() > 0) {

							try {
								int	count = getCount(billDetailsDto.getSponsorId(),billDetailsDto.getChargesSlaveId(),0,0,packageId,billDetailsDto.getServiceId());
								
								if (count > 0) {
									listSubSerId=getListSubSerIdInPkg(billDetailsDto.getSponsorId(),billDetailsDto.getChargesSlaveId(),0,0,packageId);
								}else{
									listSubSerId=getListSubSerIdInPkg(0,0,0,0,packageId);
								}
								
							} catch (Exception e) {
								e.printStackTrace();
							}
						}*/
					try{
						Criteria criteriaSubSerId= sessionFactory.getCurrentSession().createCriteria(EhatOtherBillDetailForOpdDto.class);
						criteriaSubSerId.add(Restrictions.eq("serviceId", packageID));
						criteriaSubSerId.add(Restrictions.eq("subServiceId", billDetailsDto.getSubServiceId()));
						criteriaSubSerId.add(Restrictions.eq("childServiceId",serviceId));
						criteriaSubSerId.add(Restrictions.eq("treatmentId",treatmentId));
						criteriaSubSerId.add(Restrictions.eq("billDetailsId",billDetailsDto.getBillDetailsId()));
						criteriaSubSerId.add(Restrictions.eq("departmentId",billDetailsDto.getDepartmentId()));
						criteriaSubSerId.add(Restrictions.eq("cancle","N"));
						criteriaSubSerId.add(Restrictions.eq("deleted","N"));
						
						listOpdSubSerId = criteriaSubSerId.list();
						
						for(EhatOtherBillDetailForOpdDto objOthOpd:listOpdSubSerId)
						{
							//set profile/subserviceId to Labslavepojo.
							String code =(String) sessionFactory.getCurrentSession().createSQLQuery("SELECT ifnull(code_name,'-') FROM ehat_subservice where id='"+billDetailsDto.getSubServiceId()+"'").uniqueResult();
							
							LabRequestSlaveDTO labReqtSlv = new LabRequestSlaveDTO();
							labReqtSlv.setLabRequestId(labReqId);
							labReqtSlv.setBillDetailsID(billDetailsDto.getBillDetailsId());
							labReqtSlv.setServiceId(billDetailsDto.getServiceId());
							labReqtSlv.setSubServiceId(objOthOpd.getChildSubServiceId());
							labReqtSlv.setLabTestCode(code);
							labReqtSlv.setRefDocId(objOthOpd.getDoctorId());
							
							labReqtSlv.setPackageId(packageId);
							labReqtSlv.setIsPackageFlag("Y");
							labReqtSlv.setDeptId(billDetailsDto.getDepartmentId());
							//Insert value in lab slave
							int labReqslvid = (Integer) sessionFactory.getCurrentSession().save(labReqtSlv);
							labReqtSlv.setLabReqSlvId(labReqslvid);
							
							if (LabMachineFlow.equalsIgnoreCase("on")) {
								//Call saveLabTestData().
								int res = saveLabTestData(labReq,labReqtSlv,labReqId,labReqslvid);
									if(res==0){
										return -4;
									}
							}
							
						}
						
						}catch (Exception e) {
							e.printStackTrace();
						}
				}
				
				String hql="update BillDetailsDto set sndToLabFlag = :sndToLabFlag where treatmentId= :treatmentId and billDetailsId= :billDetailsId and sndToLabFlag='N'";
				Query update = sessionFactory.getCurrentSession().createQuery(hql);
				update.setParameter("sndToLabFlag", "Y");
				update.setParameter("treatmentId", treatmentId);
				update.setParameter("billDetailsId", billDetailsDto.getBillDetailsId());
				update.executeUpdate();
			}
				
				
		}catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
		return 1;
	}

	//Sanjay Kr Shah for sending investigation test to ris after bill pay from OPd Help desk
	@SuppressWarnings("unchecked")
	@Override
	public Integer paidTestSendToRis(String subservIdsChecked,Integer treatmentId,
			HttpServletRequest request) {
		int response=0;
		try
		{
		List<BillDetailsDto> blist = new ArrayList<BillDetailsDto>();
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillDetailsDto.class);			
		criteria.add(Restrictions.eq("treatmentId", treatmentId));
		criteria.add(Restrictions.eq("paidFlag", "Y"));   
		criteria.add(Restrictions.eq("sndToRisFlag", "N")); 
		criteria.add(Restrictions.eq("serviceId", 12));   
		
		blist=criteria.list();
		
		for(BillDetailsDto billObj: blist)
		{
			HttpSession session = request.getSession();
			
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			RadiologyFileMasterDTO  radmst = new RadiologyFileMasterDTO();
			Timestamp  fromTimestamp = new  java.sql.Timestamp(new java.util.Date().getTime());
			//setting values
			radmst.setInsertedBy(userId);
			radmst.setInsertedDatetime(fromTimestamp);
			radmst.setPatientId(billObj.getPatienttId());
			radmst.setTreatmentId(treatmentId);
			radmst.setUnitId(unitId);
			radmst.setSubSerId(billObj.getSubServiceId());
			radmst.setIdbill(billObj.getBillDetailsId());
			radmst.setRadioTotal((float)billObj.getAmount());
			
			int  radMstId =(Integer) sessionFactory.getCurrentSession().save(radmst);
			

					SQLQuery insertQuery1 = sessionFactory.getCurrentSession().createSQLQuery("" +
			  		 		 "INSERT INTO radiology_assign_test(idradiology_file_master,idtest_radiology,test_amount,asign_by,assign_date,radiologyUrgentflag,radiologyRISFlag,bill_details_id) values(?,?,?,?,?,?,?,?)");
			  		 		 insertQuery1.setParameter(0,radMstId);
			  		 		 insertQuery1.setParameter(1,billObj.getSubServiceId());
			  				 insertQuery1.setParameter(2,billObj.getAmount());
			  				 insertQuery1.setParameter(3, userId);
			  				 insertQuery1.setParameter(4,new Date());
			  				 insertQuery1.setParameter(5,1);
			  				 insertQuery1.setParameter(6,'Y');
			  				insertQuery1.setParameter(7,billObj.getBillDetailsId());
			  				 insertQuery1.executeUpdate();
			  				 
			  		String sql="update ehat_bill_details set sndtorisflag='Y' where bill_details_id='"+billObj.getBillDetailsId()+"'";            
			  		Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
			  	response = updateSql.executeUpdate();

			
			
		}
	} catch (Exception e) {
		
		e.printStackTrace();
		return -1;
	}
	return response;
}
	
	@Override
	public Integer paidTestSendToRadiation(String subservIdsChecked,
			Integer treatmentId, HttpServletRequest request) {
		
		String radId = resourceBundleEhat.getObject("radiationId").toString();
		int radiationId = Integer.parseInt(radId);
		
			List<BillDetailsDto> blist = new ArrayList<BillDetailsDto>();
			int response=0;
			
			try{
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillDetailsDto.class);			
				criteria.add(Restrictions.eq("treatmentId", treatmentId));
				criteria.add(Restrictions.eq("paidFlag", "Y"));   
				criteria.add(Restrictions.eq("rFlag", "N")); 
				criteria.add(Restrictions.eq("serviceId", radiationId)); 
				
				blist=criteria.list();
			
			
			if(blist.size()==0){
				response = 0;
			}else{
					for(BillDetailsDto billObj: blist){
						
						String sql="update ehat_bill_details set r_flag='Y' where bill_details_id='"+billObj.getBillDetailsId()+"'";            
				  		Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
				  		response = updateSql.executeUpdate();
						
					}
				}
			}catch (Exception e) {
				
				e.printStackTrace();
				return -1;
			}
	return response;
}
	
	/*****
	 * @author   :Laxman
	 * @Date     :09-04-2018
	 * @Code     :For Package count in configuration
	 * ******/
	private int getCount(Integer sponsorId, Integer chargesSlaveId,
			Integer hallId, Integer hallSlaveId, int subServId, int serviceId) {
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String pkgID = (String)resourceBundleEhat.getString("packageID");
		int packageID = Integer.parseInt(pkgID);
		
				Query q = sessionFactory.getCurrentSession().createSQLQuery(
				                    "SELECT count(*) as count FROM ehat_configuration_services where deleted='N' "
				                     +" and charges_id="+sponsorId+" and chargesSlave_id="
				                     +chargesSlaveId+" and hall_id="+hallId+" and hallSlave_id="+hallSlaveId+" and is_com_servId="
				                     +packageID+" and is_com_servlastId="+subServId );

				Integer count = ((Number) q.uniqueResult()).intValue();
		return count;
	}
	
	/**
	 * @author Laxman Nikam
	 * @throws ParseException 
	 * @date 09-March-2018
	 * @code For get List of SubServiceId In Pkg.
	 ***/
	@SuppressWarnings("unchecked")
	private List<ConfigurServicesDto> getListSubSerIdInPkg(Integer sponsorId,
			Integer chargesSlaveId, int hallId, int hallSlaveId, int packageId) {
		
		List<ConfigurServicesDto> listSubSerId=null;
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String pkgID = (String)resourceBundleEhat.getString("packageID");
		int packageSerID = Integer.parseInt(pkgID);
		try{
		Criteria criteriaSubSerId= sessionFactory.getCurrentSession().createCriteria(ConfigurServicesDto.class);
		criteriaSubSerId.add(Restrictions.eq("isComServlastId", packageId));
		criteriaSubSerId.add(Restrictions.eq("chargesId", sponsorId));
		criteriaSubSerId.add(Restrictions.eq("chargesSlaveId", chargesSlaveId));
		criteriaSubSerId.add(Restrictions.eq("hallId",hallId));
		criteriaSubSerId.add(Restrictions.eq("hallSlaveId",hallSlaveId));
		criteriaSubSerId.add(Restrictions.eq("isComServId",packageSerID));
		criteriaSubSerId.add(Restrictions.eq("deleted","N"));
		criteriaSubSerId.setProjection(Projections.projectionList().add(Projections.property("serviceId"), "serviceId"));
		criteriaSubSerId.setResultTransformer(Transformers.aliasToBean(ConfigurServicesDto.class));
		listSubSerId = criteriaSubSerId.list();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return listSubSerId;
	}

	
	
	/**
	 * @author Mohd Tarique Aalam
	 * @throws ParseException 
	 ***/
	@Override
	public BillReceiptMasterDTO searchDailyCollectionReport(String callFrom,
			int unitId, int deptId, int userId, String fromDate, String toDate) {	
		
			try {  

					BillReceiptMasterDTO billObj=new BillReceiptMasterDTO();
					List<BillReceiptMasterDTO> blist = new ArrayList<BillReceiptMasterDTO>();
					List<BillRefundMasterDTO> refList = new ArrayList<BillRefundMasterDTO>();

					String sql2="";
					String sql3="";
					
						/*sql2="SELECT distinct r.patient_id,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master_ipd r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
						"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+userId+" and r.department_id= "+deptId+" group by r.patient_id";*/

							if(deptId==2){
	
									sql2="SELECT distinct r.patient_id,r.created_date_time,r.department_id, r.bill_receipt_id, r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master_ipd r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
											"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+userId+" group by r.patient_id";
						
									sql3="SELECT distinct r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_refund_master_ipd r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
									"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+userId+" group by r.patient_id";
	
									refList = setDailyRefundDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql3,refList);
	
									blist = setDailyRepDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql2,blist);				
	
								}else if(deptId==0){
	
									sql2="SELECT distinct r.patient_id,r.created_date_time,r.department_id, r.bill_receipt_id, r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master_ipd r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
											"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+userId+" group by r.patient_id";
						
									sql3="SELECT distinct r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_refund_master_ipd r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
											"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+userId+" group by r.patient_id";
	
									refList = setDailyRefundDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql3,refList);				
									blist = setDailyRepDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql2,blist);
	
	
									sql2="SELECT distinct r.patient_id,r.created_date_time,r.department_id, r.bill_receipt_id, r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
											"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+userId+"  group by r.patient_id";

									sql3="SELECT distinct r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_refund_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
											"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+userId+" group by r.patient_id";
	
										refList = setDailyRefundDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql3,refList);					
										blist = setDailyRepDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql2,blist);
 
								}else if(deptId==3){
	
									sql2="SELECT distinct r.patient_id,r.created_date_time,r.department_id, r.bill_receipt_id, r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
											"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.department_id = "+deptId+" and r.created_by = "+userId+"  group by r.patient_id";
								
									sql3="SELECT distinct r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_refund_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
											"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.department_id = "+deptId+" and r.created_by = "+userId+" group by r.patient_id";
									
									refList = setDailyRefundDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql3,refList);				
									
									blist = setDailyRepDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql2,blist);
									}else{
	
										sql2="SELECT distinct r.patient_id,r.created_date_time,r.department_id, r.bill_receipt_id, r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
												"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+userId+"  group by r.patient_id";
									
										sql3="SELECT distinct r.patient_id,r.created_date_time,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_refund_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
												"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.department_id = "+deptId+" and r.created_by = "+userId+" group by r.patient_id";
										
										refList = setDailyRefundDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql3,refList);				
										
										blist = setDailyRepDto(callFrom,unitId,deptId,userId,fromDate,toDate,sql2,blist);
										}
	
/*sql2="SELECT distinct r.patient_id,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
		"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+userId+" and r.department_id= "+deptId+" group by r.patient_id";*/

			
						billObj.setListBillReceiptMaster(blist);	
						billObj.setListBillRefundMaster(refList);
						return billObj;

			} catch (Exception e) {

					e.printStackTrace();
					return null;
}				
}
	
	/*******
	 * @author    :Laxman Nikam
	 * @param LabRequestDTO 
	 * @param LabRequestSlaveDTO 
	 * @param labReqslvid 
	 * @param labReqId 
	 * @Date      :07-04-2018
	 * @Code      :For Machine-Interface save Lab test result at the time of test send to lab.
	 * *******/
	private int saveLabTestData(LabRequestDTO labReq,LabRequestSlaveDTO labReqtSlv, int labReqId, int labReqslvid) {
		int response=0;
		String tempFlag="N";
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String sid = (String)resourceBundleEhat.getString("labHeadingID");
		int serviceId = Integer.parseInt(sid);
		try {
		
			String sql ="SELECT lt.idTest,lt.valueType FROM labprofile lp left join labprofiletestcomp lpc on lpc.idprofile=lp.idprofile left join labtest lt on lt.idTest=lpc.idTest where lp.service_id ='"+serviceId+"' and lp.subservice_id='"+labReqtSlv.getSubServiceId()+"' and lp.profileStatus='Y' and lt.testStatus='Y'";
		
			Query labTestResQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			labTestResQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			
			
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listLabTest = labTestResQuery.list();
		if(listLabTest.size()>0){
			for(Map<String, Object> row : listLabTest){
				LabTestResultDto labResultDtoObj=new LabTestResultDto();
				
				tempFlag = (String)row.get("valueType");
				if(tempFlag.equalsIgnoreCase("t")){
					labResultDtoObj.setIsTemplateFlag("Y");
				}else{
					labResultDtoObj.setIsTemplateFlag("N");
				}

				labResultDtoObj.setTestId((Integer)row.get("idTest"));
				labResultDtoObj.setInsertedBy(labReq.getInsertedBy());
				labResultDtoObj.setDeleteFlag("N");
				labResultDtoObj.setInsertedDatetime(new Date(new java.util.Date().getTime()));
				labResultDtoObj.setPatientId(labReq.getPatientId());
				labResultDtoObj.setTreatmentId(labReq.getTreatmentId());
				labResultDtoObj.setDepartmentId(labReq.getDeptId());
				labResultDtoObj.setUnitId(labReq.getUnitId());
				labResultDtoObj.setLabRequestId(labReqId);
				labResultDtoObj.setLabReqSlvId(labReqslvid);
				labResultDtoObj.setServiceId(labReqtSlv.getServiceId());
				labResultDtoObj.setSubServiceId(labReqtSlv.getSubServiceId());
				labResultDtoObj.setImpressions("");
				labResultDtoObj.setTestTemplate("");
				labResultDtoObj.setNarration("");
				labResultDtoObj.setTestResult("");
				
				//Call generic save method.
				response= (Integer) sessionFactory.getCurrentSession().save(labResultDtoObj);
				
			}
		}else{
			response=1;
		}
		} catch (Exception e) {
			response=0;
			e.printStackTrace();
			System.out.println("database error...could not insert: "
					+ e.getMessage());
		}
		
		return response;
	}
	
	
	/*******
	 * @author    :Laxman Nikam
	 * @param LabRequestDTO 
	 * @param LabRequestSlaveDTO 
	 * @param labReqslvid 
	 * @param labReqId 
	 * @Date      :07-04-2018
	 * @Code      :For Machine-Interface save Lab test result at the time of test send to lab.
	 * *******/
	@Override
	public Integer getPharmacyInBillOrNot(int treatmentId,int unitId,int userId,int deptId,int chargesSlaveId) {
		Integer response=0;
		try {
		
			String sql = "";
			if(deptId == 2){
				
				sql ="SELECT count(treatment_id) FROM ehat_bill_details_ipd where service_id=-5 and charges_slave_id="+chargesSlaveId+" and treatment_id="+treatmentId;
			}else{
				
				sql ="SELECT count(treatment_id) FROM ehat_bill_details where service_id=-5 and charges_slave_id="+chargesSlaveId+" and treatment_id="+treatmentId;
			}			
		
			Query trCount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			response = ((Number)trCount.uniqueResult()).intValue();
			
		} catch (Exception e) {
			
			response=0;
			e.printStackTrace();			
		}
		
		return response;
	}
	
	public int setBillMasterTotalsForOpd(int treatmentId) {
		
		int result = 0;
		int billId = 0;
		int sponsorId = 0;
		try {
			// Update amount in bill master start
			double totalAmt=0;				
			double totPaid=0;
			double totRemain=0;
			double totRefund=0;
			double totDisc=0;
			double totConcn=0;		
			String callFrom = "opd";
			
			String sql = "select bill_id,charges_master_slave_id from ehat_bill_master where treatment_id="+treatmentId;
			Query labTestResQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			labTestResQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listLabTest = labTestResQuery.list();
			if(listLabTest.size()>0){
				for(Map<String, Object> row : listLabTest){
					
					billId = (Integer)row.get("bill_id");
					sponsorId = (Integer)row.get("charges_master_slave_id");
				}
			}	
			
			BillReceiptMasterDTO obj=new BillReceiptMasterDTO();
			obj.setTreatmentId(treatmentId);
			obj.setSponsorCatId(sponsorId);
			BillReceiptMasterDTO objRec = fetchAllReceiptTotals(obj,callFrom);
			
			totalAmt = objRec.getActualAmt();
			totConcn = objRec.getActualTotConcn();
			totDisc = objRec.getTotalDisc();
			totPaid = objRec.getTotalPaid();		
			totRefund = objRec.getRefundAmt();
			totRemain = totalAmt - (totConcn + totDisc + totPaid);		
			
			//Session session = session;
			String hql = "UPDATE BillMasterDto set updatedDateTime =:updatedDateTime, totalBill =:totalBill,totalPaid =:totalPaid,total_remain =:remaining,totalRefund =:totalRefund,discount =:discount,total_concn =:totalConcn WHERE billId =:billId";
			Query query = sessionFactory.getCurrentSession().createQuery(hql);
			query.setDate("updatedDateTime",new Date(new java.util.Date().getTime()));
			query.setParameter("totalBill",totalAmt);  
			query.setParameter("totalPaid",totPaid);  
			query.setParameter("remaining",totRemain);  
			query.setParameter("totalRefund",totRefund);  
			query.setParameter("discount",totDisc);  
			query.setParameter("totalConcn",totConcn);  
			query.setParameter("billId",billId);  
			query.executeUpdate();
			// Update amount in bill master end
					
			result=1;
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
		}
		return result;
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 19-Sept-2018
	* @codeFor	: Get Settled Bills 
	 ************/
	@SuppressWarnings("unchecked")
	public BulkSettlementMasterDTO getSettledBills(BulkSettlementMasterDTO obj,String callFrom,String letter,String fDate,String lDate,Integer startIndex){	
					
		try {			
			String fromDate = fDate;
			String lastDate = lDate;
			int sponsorF = obj.getPayeeMainId();
			int sponsorL = obj.getPayeeLeafId();
			int unitId = obj.getUnitId();
			int deptId = obj.getDepartmentId();	
			int recId = Integer.parseInt(letter);
					
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.setTime(sdf.parse(lastDate));
			c.add(Calendar.DATE, 1);  // number of days to add
			lastDate = sdf.format(c.getTime());  // dt is now the new date
			
			BulkSettlementMasterDTO bulkSettlement=new BulkSettlementMasterDTO();			
			
			Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(BulkSettlementMasterDTO.class);			
			criteria2.add(Restrictions.ge("createdDateTimeStr", fromDate)); 
			criteria2.add(Restrictions.le("createdDateTimeStr", lastDate));
			criteria2.addOrder(Order.desc("bulkMasterId"));
			criteria2.setFirstResult(startIndex);
			criteria2.setMaxResults(10);
			
			if(recId > 0 && callFrom.equalsIgnoreCase("search")){
			
				Criterion rest2= Restrictions.like("bulk_id", "%" + letter + "%");
	 			criteria2.add(Restrictions.or(rest2));
	 			//criteria2.add(Restrictions.eq("bulkMasterId", recId));
			}			
			if(unitId>0){
				
				criteria2.add(Restrictions.eq("unitId", unitId));
			}
			if(deptId>0){
				
				criteria2.add(Restrictions.eq("departmentId", deptId));
			}
			
			List<BulkSettlementMasterDTO> listBulkSettlement = (List<BulkSettlementMasterDTO>) criteria2.list();			
			bulkSettlement.setListBulkSettlementMst(listBulkSettlement);	
			
			int cnt = getSettledBillCount(fDate, lDate);
			
			bulkSettlement.setSettledBillCount(cnt);
			
			return bulkSettlement;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return null;
		}				
	}

	@Override
	public BulkSettlementMasterDTO fetchbulsetlmentskdetails(int bulk_master_id) {
		List<BulkSettlementMasterDTO> blist1 = new ArrayList<BulkSettlementMasterDTO>();
		List<BulkSettlementSlaveDTO> bslavelist1 = new ArrayList<BulkSettlementSlaveDTO>();
		BulkSettlementMasterDTO blistmaster= new BulkSettlementMasterDTO();	
		try{
			
			Query bulkSp = sessionFactory.getCurrentSession().createSQLQuery("call sp_bulk_settlement_details(:bulkMasterId)");//s.createStoredProcedureQuery("sp_get_dropdown_list_by_prefix_name", PrefixDto.class);
			bulkSp.setParameter("bulkMasterId", bulk_master_id);
			bulkSp.setResultTransformer(new AliasToBeanResultTransformer(BulkSettledDetailsDto.class));
			@SuppressWarnings("unchecked")
			List<BulkSettledDetailsDto> lstBulkDetails = bulkSp.list();
			
			if(lstBulkDetails.size() > 0) {
				
				blistmaster.setBulkMasterId(lstBulkDetails.get(0).getBulkMasterId());
				blistmaster.setCreatedDateTime(lstBulkDetails.get(0).getBulkCreatedDate());
				blistmaster.setTotalTds(lstBulkDetails.get(0).getTotalTds());
				blistmaster.setTotalConsn(lstBulkDetails.get(0).getTotalConsn());
				blistmaster.setTotalPaid(lstBulkDetails.get(0).getTotalPaid());
				blistmaster.setbNumber(lstBulkDetails.get(0).getbNumber());
				blistmaster.setbName(lstBulkDetails.get(0).getBankName());
				blistmaster.setChequeNo(lstBulkDetails.get(0).getChequeNo());
				blistmaster.setCreatedBy(lstBulkDetails.get(0).getCreatedBy());
				blist1.add(blistmaster);
				
				for(BulkSettledDetailsDto obj : lstBulkDetails) {
					
					BulkSettlementSlaveDTO bslaveobj= new BulkSettlementSlaveDTO();
					bslaveobj.setPatientId(obj.getPatientId());
					bslaveobj.setCenterPatientId(obj.getCenterPatientId());
					bslaveobj.setBillno(obj.getBillId());
					bslaveobj.setBillDate(obj.getBillDate());
				    bslaveobj.setPatientname(obj.getPatientname());
				    bslaveobj.setTotalpaidrecipt(obj.getTotalpaidReceipt());
					bslaveobj.setCompanyname(obj.getCompanyName());
					bslaveobj.setBillTotal(obj.getBillTotal());
					bslaveobj.setBillPaid(obj.getBillPaid());
					bslaveobj.setRemainAmt(obj.getRemainAmt());
					bslaveobj.setAmount(obj.getAmount());
					bslaveobj.setTdsAmt(obj.getTdsAmt());
					bslaveobj.setConcession(obj.getConcession());
					bslaveobj.setPaidAmt(obj.getPaidAmt());
					bslaveobj.setConcession(obj.getConcession());
					//bslaveobj.setCreatedBy(obj.getCreatedBy());
					bslavelist1.add(bslaveobj);
				}
				
				blistmaster.setListBulkSettlementMst(blist1);
				blistmaster.setListBulkSettlementSlave(bslavelist1);
			}
		
			/*Criteria criteria= sessionFactory.getCurrentSession().createCriteria(BulkSettlementMasterDTO.class);
			criteria.add(Restrictions.eq("bulkMasterId", bulk_master_id));
			criteria.add(Restrictions.eq("deleted", "N"));
			List<BulkSettlementMasterDTO> blist=criteria.list();
			blistmaster.setListBulkSettlementMst(blist);
			
			for(BulkSettlementMasterDTO bl: blist){
					//master details
				String BankName="-";
				if(	Integer.parseInt( bl.getbName()) > 0){
					 BankName =(String) sessionFactory.getCurrentSession().createSQLQuery("SELECT bank_name FROM pharma_bank_master where bank_id='"+ bl.getbName()+"'").uniqueResult();
		
				}
			    Double tds=bl.getTotalTds();
			    Double tpaid=bl.getTotalPaid();
			    if(tds ==null){
			    	
			    	tds=0.00;
			    }
			    if(tpaid==null){
	        	  
			    	tpaid=0.00;
			    }
				blistmaster.setbName(BankName);
				blistmaster.setCreatedDateTime(bl.getCreatedDateTime());
				blistmaster.setTotalTds(tds);
				blistmaster.setTotalPaid(tpaid);
				blistmaster.setbNumber(bl.getbNumber());
				blistmaster.setBulkMasterId(bl.getBulkMasterId());
				blistmaster.setChequeNo(bl.getChequeNo());
				blistmaster.setTotalConsn(bl.getTotalConsn());
				//blistmaster.setPatientname(patientName);
				blist1.add(blistmaster);
				///end
				
				//recipt details
			    Criteria criteria1= sessionFactory.getCurrentSession().createCriteria(BulkSettlementSlaveDTO.class);
				criteria1.add(Restrictions.eq("bulkMasterId", bl.getBulkMasterId()));
				criteria1.add(Restrictions.eq("deleted", "N"));
				List<BulkSettlementSlaveDTO> bslavelist=criteria1.list();
				
				for(BulkSettlementSlaveDTO blslave: bslavelist){
					
					BulkSettlementSlaveDTO bslaveobj= new BulkSettlementSlaveDTO();
	
					String sql ="SELECT  b.bill_id, b.created_date_time, concat(`p`.`prefix`,'',`p`.`f_name`,' ',`p`.`m_name`,' ',`p`.`l_name`) AS patient_name , ifnull(sum( m.total_paid ),0.0) AS total_paid FROM markvisitview p LEFT JOIN ehat_bill_master b ON b.treatment_id = p.treatment_id LEFT JOIN ehat_receipt_master m  ON m.treatment_id =p.treatment_id where p.patient_id='"+ blslave.getPatientId()+"'";
					Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")
					List<Map<String, Object>> listbill = query.list();
				    if(listbill.size()>0){
						for(Map<String, Object> row : listbill){
							
							Date createdDateTime =  (Date)row.get("created_date_time");
							Integer biilno       =	(Integer)row.get("bill_id");
							String patientName   =  (String)row.get("patient_name");
							Double total_paid    =  (Double)row.get("total_paid"); 
							if(total_paid==null){
								total_paid=0.0;
							}
							bslaveobj.setBillDate(createdDateTime);
							bslaveobj.setBillno(biilno);
						    bslaveobj.setPatientname(patientName);
						    bslaveobj.setTotalpaidrecipt(total_paid);
						}
					}
		           sql="select category_name as sponsor_name from ehat_charges_master_slave where id="+blslave.getSponsorCatId();
		           Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		           String companyName=(String) spQuery.uniqueResult();
		           // String patientName =(String) sessionFactory.getCurrentSession().createSQLQuery("SELECT concat(`p`.`prefix`,'',`p`.`f_name`,' ',`p`.`m_name`,' ',`p`.`l_name`) AS patient_name FROM  ehat_patient p where p.patient_id='"+ blslave.getPatientId()+"'").uniqueResult();
				
				   bslaveobj.setCompanyname(companyName);
			       bslaveobj.setBillTotal(blslave.getBillTotal());
				   bslaveobj.setBillPaid(blslave.getBillPaid());
				   bslaveobj.setRemainAmt(blslave.getRemainAmt());
				   bslaveobj.setAmount(blslave.getAmount());
				   bslaveobj.setTdsAmt(blslave.getTdsAmt());
				   bslaveobj.setPatientId(blslave.getPatientId());
				   bslaveobj.setConcession(blslave.getConcession());
				   bslaveobj.setPaidAmt(blslave.getPaidAmt());
				   bslaveobj.setConcession(blslave.getConcession());
				   bslavelist1.add(bslaveobj);
				}
				//end
				blistmaster.setListBulkSettlementMst(blist1);
				blistmaster.setListBulkSettlementSlave(bslavelist1);
					
			}*/
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return blistmaster;
	}
	
	public int setMultiSponsorTotalsForOpd(BillReceiptMasterDTO billRecMaster) {
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
		String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");   
		String pharmacy_Serve_Id = (String)resourceBundleEhat.getString("pharmacy");    
		int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
		int pharmacyServId = Integer.parseInt(pharmacy_Serve_Id);
		int treatmentId = billRecMaster.getTreatmentId();
		
		int result=0;
		try {
			
			String sql="select count(treatment_id) FROM ehat_multiple_sponsor where deleted='N' and treatment_id="+treatmentId;
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			int count = ((Number)countQuery.uniqueResult()).intValue();
			
			if(count > 0){
				
				sql="select * FROM ehat_multiple_sponsor where deleted='N' and treatment_id="+treatmentId;
				Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listSpDetails = spDetailsQuery.list();
				for(Map<String, Object> row : listSpDetails){
					
					int mulSponsorId=(Integer)row.get("mul_sponsor_id");
					int chargesSlaveId=(Integer)row.get("charges_slave_id");
					double totalAmt=0;				
					double totPaid=0;
					double totRemain=0;
					double totRefund=0;
					double totDisc=0;
					double totConcn=0;
					double totPaidForSponsor=0;
					double totRemainForSponsor=0;
					
					sql="select ifnull(sum(other_amount),0) as totAmt,ifnull(sum(other_concession),0) as totConcn FROM ehat_bill_details where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" and charges_slave_id="+chargesSlaveId+" and cancle='N' and service_id != "+pharmacyInvoice+" ";
					Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					billDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")			
					List<Map<String, Object>> listBillDetails = billDetailsQuery.list();
					for(Map<String, Object> bill : listBillDetails){
						
						totalAmt=(Double)bill.get("totAmt");
						totConcn=(Double)bill.get("totConcn");					
					}				
					
					sql="select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid,ifnull(sum(total_remain),0) as totRemain,ifnull(sum(refund_amt),0) as totRefund FROM ehat_receipt_master where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" and sponsor_cat_id="+chargesSlaveId+" and against_id=0 ";
					Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")
					List<Map<String, Object>> listRec = recQuery.list();
					for(Map<String, Object> rec : listRec){
						
						totDisc=(Double)rec.get("totDisc");
						totPaid=(Double)rec.get("totPaid");			
						totRemain=(Double)rec.get("totRemain");						
						totRefund=(Double)rec.get("totRefund");							
					}
					
					String sql2="SELECT ifnull((sum(paid_amt)+sum(concession)+sum(tds_amt)),0) sponsorAmount FROM ehat_bulk_settlement_slave where treatment_id="+treatmentId;
					Query bulkQuery = sessionFactory.getCurrentSession().createSQLQuery(sql2);			
					totPaidForSponsor = ((Number)bulkQuery.uniqueResult()).doubleValue();
					
					totRemain = totalAmt - (totConcn + totDisc + totPaid);	
					
					totRemainForSponsor = totRemain-totPaidForSponsor;

					// Update amount in multiSponsor start
					//String hqlForMultiSponsr = "UPDATE MultipleSponsorDto set totalBill =:totalBill,totalPaid =:totalPaid,total_remain =:remaining,totalRefund =:totalRefund,discount =:discount,total_concn =:totalConcn WHERE mulSponsorId =:mulSponsorId";
					String hqlForMultiSponsr = "UPDATE MultipleSponsorDto set totalBill =:totalBill,total_remain =:remaining,totalRefund =:totalRefund,discount =:discount WHERE mulSponsorId =:mulSponsorId";
					Query queryForMultiSponsr = sessionFactory.getCurrentSession().createQuery(hqlForMultiSponsr);
					//queryForMultiSponsr.setDate("updatedDateTime",new Date(new java.util.Date().getTime()));
					queryForMultiSponsr.setParameter("totalBill",totRemain);  
					//queryForMultiSponsr.setParameter("totalPaid",totPaid);  
					queryForMultiSponsr.setParameter("remaining",totRemainForSponsor);  
					queryForMultiSponsr.setParameter("totalRefund",totRefund);  
					queryForMultiSponsr.setParameter("discount",totDisc);  
					//queryForMultiSponsr.setParameter("totalConcn",totConcn);  
					queryForMultiSponsr.setParameter("mulSponsorId",mulSponsorId);  
					queryForMultiSponsr.executeUpdate();
					// Update amount in multiSponsor end	
				}			
			}		
			
			result=1;
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
		}
		return result;
	}

	/************
	* @author	: Vinod Udawant
	* @date		: 28-12-2018
	* @codeFor	: Get bill receipt count
	 ************/
	@Override
	public int fetchreceiptCount(int treatmentId, int billDetailsId) {
		 Integer a=0;
			try {	
				Query hallType = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT receipt_master_count FROM ehat_receipt_slave where bill_details_id="+billDetailsId+" and treatment_id="+treatmentId+" and deleted='N'");

				a =(Integer) hallType.uniqueResult();
			} catch (Exception e) {
				e.printStackTrace();
				return  a;
			}
			return  a;
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 05-03-2019
	* @codeFor	: Set BillMaster Totals
	 ************/
	@Override
	public int setOpdBillMaster(BillReceiptMasterDTO obj,String callFrom) {
		
		int result=0;
		int treatmentId = obj.getTreatmentId();
		try {
			
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
			String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");   
			int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
			
			//=========================== Update amount in Bill Master start ===================================//		
			double totalAmt=0;				
			double totPaid=0;
			double totRemain=0;
			double totRefund=0;
			double totDisc=0;
			double totConcn=0;	
			double totalSpnsrpaid=0;
			int billId = 0;
			
			String sql="select count(treatment_id) FROM ehat_bill_details where deleted='N' and cancle='N' and treatment_id="+treatmentId;
			Query countBillQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			int billCount = ((Number)countBillQuery.uniqueResult()).intValue();
			
			if(billCount > 0) {
				
				sql="select if((charges_slave_id > 0),ifnull(sum(other_amount), 0),ifnull(sum(amount),0)) as totAmt,if((charges_slave_id > 0),ifnull(sum(other_concession), 0),ifnull(sum(concession),0)) as totConcn,"
						+ "bill_id FROM ehat_bill_details where deleted = 'N' and paid_by_cash_flag = 'N' and treatment_id = "+treatmentId+" and cancle = 'N' and service_id != "+pharmacyInvoice+" group by bill_id, charges_slave_id";
					
				Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				billDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listBillDetails = billDetailsQuery.list();
				for(Map<String, Object> row : listBillDetails){
					
					totalAmt=(Double)row.get("totAmt");
					totConcn=(Double)row.get("totConcn");	
					billId=(Integer)row.get("bill_id");
				}		
				
				sql="select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid," +
							"ifnull(sum(total_remain),0) as totRemain,ifnull(sum(refund_amt),0) as totRefund FROM ehat_receipt_master where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" and against_id=0 ";
							
				Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> listRec = recQuery.list();
				for(Map<String, Object> row : listRec){
					
					totDisc=(Double)row.get("totDisc");
					totPaid=(Double)row.get("totPaid");			
					totRemain=(Double)row.get("totRemain");						
					totRefund=(Double)row.get("totRefund");				
				}
							
				sql="select ifnull(sum(paid_amt),0) FROM ehat_bulk_settlement_slave where deleted='N' and treatment_id="+treatmentId;
				Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				totalSpnsrpaid =(Double) spQuery.uniqueResult();
				
				sql="select ifnull(sum(concession),0) FROM ehat_bulk_settlement_slave where deleted='N' and treatment_id="+treatmentId;
				Query conQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrCon =(Double) conQuery.uniqueResult();
				
				sql="select ifnull(sum(tds_amt),0) FROM ehat_bulk_settlement_slave where deleted='N' and treatment_id="+treatmentId;
				Query tdsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				double totalSpnsrTds =(Double) tdsQuery.uniqueResult();
						
				totalSpnsrpaid = totalSpnsrpaid + totalSpnsrCon + totalSpnsrTds;
				totPaid = totPaid + totalSpnsrpaid;
				totRemain = (totalAmt)-(totDisc+totPaid+totConcn);	
				
				String hql = "UPDATE BillMasterDto set updatedDateTime =:updatedDateTime, totalBill =:totalBill,totalPaid =:totalPaid,total_remain =:remaining,totalRefund =:totalRefund,discount =:discount,totalConcn =:totalConcn WHERE billId =:billId";
				Query query = sessionFactory.getCurrentSession().createQuery(hql);
				query.setDate("updatedDateTime",new Date(new java.util.Date().getTime()));
				query.setParameter("totalBill",totalAmt);  
				query.setParameter("totalPaid",totPaid);  
				query.setParameter("remaining",totRemain);  
				query.setParameter("totalRefund",totRefund);  
				query.setParameter("discount",totDisc);  
				query.setParameter("totalConcn",totConcn);  
				query.setParameter("billId",billId);  
				query.executeUpdate();
			}			
			//=========================== Update amount in Bill Master end ===================================//		
			
			//=========================== Update amount in multiple sponsor start ===========================//
			sql="select count(treatment_id) FROM ehat_multiple_sponsor where deleted='N' and treatment_id="+treatmentId;
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			int count = ((Number)countQuery.uniqueResult()).intValue();
			
			if(count > 0){
				
				sql="select * FROM ehat_multiple_sponsor where deleted='N' and treatment_id="+treatmentId;
				Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listSpDetails = spDetailsQuery.list();
				for(Map<String, Object> row : listSpDetails){
					
					int mulSponsorId=(Integer)row.get("mul_sponsor_id");	
					totPaid = totPaid + totalSpnsrpaid;
					totRemain = totalAmt - (totConcn + totDisc + totPaid);	

					String hqlForMultiSponsr = "UPDATE MultipleSponsorDto set totalBill =:totalBill,totalPaid =:totalPaid,total_remain =:remaining,totalRefund =:totalRefund,discount =:discount,total_concn =:totalConcn WHERE mulSponsorId =:mulSponsorId";
					Query queryForMultiSponsr = sessionFactory.getCurrentSession().createQuery(hqlForMultiSponsr);
					queryForMultiSponsr.setParameter("totalBill",totalAmt);  
					queryForMultiSponsr.setParameter("totalPaid",totPaid);  
					queryForMultiSponsr.setParameter("remaining",totRemain);  
					queryForMultiSponsr.setParameter("totalRefund",totRefund);  
					queryForMultiSponsr.setParameter("discount",totDisc);  
					queryForMultiSponsr.setParameter("totalConcn",totConcn);  
					queryForMultiSponsr.setParameter("mulSponsorId",mulSponsorId);  
					queryForMultiSponsr.executeUpdate();					
				}			
			}	
			//=========================== Update amount in multiple sponsor end =============================//
				
			result=1;
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
		}
		return result;
	}
	
	@Override
	public BulkSettlementMasterDTO getBulkReport(String fromDate,String toDate) {
		List<BulkSettlementMasterDTO> blist1 = new ArrayList<BulkSettlementMasterDTO>();
		List<BulkSettlementSlaveDTO> bslavelist1 = new ArrayList<BulkSettlementSlaveDTO>();
		BulkSettlementMasterDTO blistmaster= new BulkSettlementMasterDTO();	
		try{
		
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.setTime(sdf.parse(toDate));
			c.add(Calendar.DATE, 1);  // number of days to add
			toDate = sdf.format(c.getTime());  // dt is now the new date
			
			Criteria criteria= sessionFactory.getCurrentSession().createCriteria(BulkSettlementMasterDTO.class);
			//criteria.add(Restrictions.eq("bulkMasterId", bulk_master_id));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.ge("createdDateTime", sdf.parse(fromDate))); 
			criteria.add(Restrictions.le("createdDateTime", sdf.parse(toDate)));
			List<BulkSettlementMasterDTO> blist=criteria.list();
			blistmaster.setListBulkSettlementMst(blist);
			
			for(BulkSettlementMasterDTO bl: blist){
				//master details
				String BankName="-";
				if(	Integer.parseInt( bl.getbName()) > 0){
					 BankName =(String) sessionFactory.getCurrentSession().createSQLQuery("SELECT bank_name FROM pharma_bank_master where bank_id='"+ bl.getbName()+"'").uniqueResult();
		
				}
			    Double tds=bl.getTotalTds();
			    Double tpaid=bl.getTotalPaid();
			    if(tds ==null){
			    	
			    	tds=0.00;
			    }
			    if(tpaid==null){
	        	  
			    	tpaid=0.00;
			    }
				blistmaster.setbName(BankName);
				blistmaster.setCreatedDateTime(bl.getCreatedDateTime());
				blistmaster.setTotalTds(tds);
				blistmaster.setTotalPaid(tpaid);
				blistmaster.setbNumber(bl.getbNumber());
				blistmaster.setBulkMasterId(bl.getBulkMasterId());
				blistmaster.setChequeNo(bl.getChequeNo());
				blistmaster.setTotalConsn(bl.getTotalConsn());
				//blistmaster.setPatientname(patientName);
				blist1.add(blistmaster);
				///end
				
				//recipt details
			    Criteria criteria1= sessionFactory.getCurrentSession().createCriteria(BulkSettlementSlaveDTO.class);
				criteria1.add(Restrictions.eq("bulkMasterId", bl.getBulkMasterId()));
				criteria1.add(Restrictions.eq("deleted", "N"));
				List<BulkSettlementSlaveDTO> bslavelist=criteria1.list();
				
				for(BulkSettlementSlaveDTO blslave: bslavelist){
					
					BulkSettlementSlaveDTO bslaveobj= new BulkSettlementSlaveDTO();
	
					String sql ="SELECT  b.bill_id, b.created_date_time, concat(`p`.`prefix`,'',`p`.`f_name`,' ',`p`.`m_name`,' ',`p`.`l_name`) AS patient_name , ifnull(sum( m.total_paid ),0.0) AS total_paid FROM markvisitview p LEFT JOIN ehat_bill_master b ON b.treatment_id = p.treatment_id LEFT JOIN ehat_receipt_master m  ON m.treatment_id =p.treatment_id where p.patient_id='"+ blslave.getPatientId()+"'";
					Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")
					List<Map<String, Object>> listbill = query.list();
				    if(listbill.size()>0){
						for(Map<String, Object> row : listbill){
							
							Date createdDateTime =  (Date)row.get("created_date_time");
							Integer biilno       =	(Integer)row.get("bill_id");
							String patientName   =  (String)row.get("patient_name");
							Double total_paid    =  (Double)row.get("total_paid"); 
							if(total_paid==null){
								total_paid=0.0;
							}
							bslaveobj.setBillDate(createdDateTime);
							bslaveobj.setBillno(biilno);
						    bslaveobj.setPatientname(patientName);
						    bslaveobj.setTotalpaidrecipt(total_paid);
						}
					}
		           sql="select category_name as sponsor_name from ehat_charges_master_slave where id="+blslave.getSponsorCatId();
		           Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		           String companyName=(String) spQuery.uniqueResult();
		           // String patientName =(String) sessionFactory.getCurrentSession().createSQLQuery("SELECT concat(`p`.`prefix`,'',`p`.`f_name`,' ',`p`.`m_name`,' ',`p`.`l_name`) AS patient_name FROM  ehat_patient p where p.patient_id='"+ blslave.getPatientId()+"'").uniqueResult();
				
				   bslaveobj.setCompanyname(companyName);
			       bslaveobj.setBillTotal(blslave.getBillTotal());
				   bslaveobj.setBillPaid(blslave.getBillPaid());
				   bslaveobj.setRemainAmt(blslave.getRemainAmt());
				   bslaveobj.setAmount(blslave.getAmount());
				   bslaveobj.setTdsAmt(blslave.getTdsAmt());
				   bslaveobj.setPatientId(blslave.getPatientId());
				   bslaveobj.setConcession(blslave.getConcession());
				   bslaveobj.setPaidAmt(blslave.getPaidAmt());
				   bslaveobj.setConcession(blslave.getConcession());
				   bslavelist1.add(bslaveobj);
				}
				//end
				blistmaster.setListBulkSettlementMst(blist1);
				blistmaster.setListBulkSettlementSlave(bslavelist1);
					
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return blistmaster;
	}
	
	public CommonadvDto dailyCommonAdvReport(String callFrom,int unitId,int userId,String fromDate,String toDate){
		
		CommonadvDto cAdv = new CommonadvDto();
		List<CommonadvDto> cAdvList = new ArrayList<CommonadvDto>();
		try {
			
			String sql="select ifnull(user_Type,'') as user_Type FROM users where status='Y' and User_ID="+userId;
			Query uTypeQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
			String uType = (String) uTypeQuery.uniqueResult();
			
			if(uType.equals("admin")){
				
				userId = 0;
			}	
			
			if(userId == 0){
				
				sql = "select distinct(patient_id) from ehat_common_advance_master c where c.deleted='N' and date(c.created_date_time) >= '"+fromDate+"' and date(c.created_date_time) <= '"+toDate+"' ";				
			}else{
				
				sql = "select distinct(patient_id) from ehat_common_advance_master c where c.deleted='N' and date(c.created_date_time) >= '"+fromDate+"' and date(c.created_date_time) <= '"+toDate+"' and c.created_by = "+userId+" ";				
			}
			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listbill = query.list();
		    if(listbill.size()>0 || listbill != null){
				
		    	for(Map<String, Object> row : listbill){
					
					int patId = (Integer)row.get("patient_id");
					CommonadvDto objDto = new CommonadvDto();
					double totAmt = 0;
					double totRefAmt = 0;
					for( int i = 1; i < 4; i++){
						
						if(userId == 0){
							
							sql = "select c.patient_id,sum(c.common_adv_amnt) as common_adv_amnt,sum(c.refund_amnt) as refund_amnt,"
									+ "c.created_date_time,concat(p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,t.opdipdno from ehat_common_advance_master c"
									+ " left join ehat_patient p ON (p.patient_id = c.patient_id) left join ehat_treatment t ON (t.treatment_id = c.treatment_id)"
									+ " where c.patient_id="+patId+" and c.paymode = "+i+" and date(c.created_date_time) >= '"+fromDate+"' and date(c.created_date_time) <= '"+toDate+"' ";
						}else{
							
							sql = "select c.patient_id,sum(c.common_adv_amnt) as common_adv_amnt,sum(c.refund_amnt) as refund_amnt,"
									+ "c.created_date_time,concat(p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,t.opdipdno from ehat_common_advance_master c"
									+ " left join ehat_patient p ON (p.patient_id = c.patient_id) left join ehat_treatment t ON (t.treatment_id = c.treatment_id)"
									+ " where c.patient_id="+patId+" and c.paymode = "+i+" and date(c.created_date_time) >= '"+fromDate+"' and date(c.created_date_time) <= '"+toDate+"' and c.created_by = "+userId+" ";
						}
						
						Query query2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
						query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						@SuppressWarnings("unchecked")
						List<Map<String, Object>> listbill2 = query2.list();
					   
						for(Map<String, Object> row2 : listbill2){
								
							if((Integer)row2.get("patient_id") != null){
								
								objDto.setPatient_ID((Integer)row2.get("patient_id"));
					    		objDto.setPatientName((String)row2.get("patient_name"));
					    		objDto.setOpdIpdNo((String)row2.get("opdipdno"));
					    		totAmt = totAmt + ((Double)row2.get("common_adv_amnt"));
					    		totRefAmt = totRefAmt + (Double)row2.get("refund_amnt");
					    		objDto.setCreatedDate((Date)row2.get("created_date_time"));
					    		
					    		if(i==1){
					    			objDto.setCashAmt((Double)row2.get("common_adv_amnt"));
					    		}
					    		else if(i==2){
					    			objDto.setCardAmt((Double)row2.get("common_adv_amnt"));
					    		}
					    		else if(i==3){
					    			objDto.setChequeAmt((Double)row2.get("common_adv_amnt"));
					    		}
					    		
					    		objDto.setTotAmt(totAmt);
					    		objDto.setRefund_amnt(totRefAmt);	
					    		//objDto.setCreatedBy()(totAmt);
							}					    		
					    }					    
					}		
					String sql2 = "";
					if(userId == 0){
						
						sql2 = "select ifnull(narration,'') as narration,ifnull(common_adv_id,0) as common_adv_id,ifnull(created_by,0) as created_by from ehat_common_advance_master c where " 
								+ "c.patient_id="+patId+" and date(c.created_date_time) >= '"+fromDate+"' and date(c.created_date_time) <= '"+toDate+"' ";
					}else{
						
						sql2 = "select ifnull(narration,'') as narration,ifnull(common_adv_id,0) as common_adv_id,ifnull(created_by,0) as created_by from ehat_common_advance_master c where " 
								+ "c.patient_id="+patId+" and date(c.created_date_time) >= '"+fromDate+"' and date(c.created_date_time) <= '"+toDate+"' and c.created_by = "+userId+" ";
					}
					
					Query query3 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
					query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")
					List<Map<String, Object>> listbill3 = query3.list();				   
					String createdByName = "";
	        		String remarkAll = "";
	                for(Map<String, Object> multiRow : listbill3){
	                	
	                	BigInteger receiptCount = (BigInteger)multiRow.get("common_adv_id");  
	                	BigInteger createdById = (BigInteger)multiRow.get("created_by");
	                	
	                	sql="select concat(title,' ',f_name,' ',m_name,' ',l_name) AS user_name FROM users where status='Y' and User_ID="+createdById;
			    		Query noQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
			    		String userName = (String) noQuery.uniqueResult();
	                	
	                	createdByName = createdByName + userName + "("+receiptCount+") , ";    
	                	String remark = (String)multiRow.get("narration");
	                	if(!remark.equals("")){
	                		
	                		remarkAll = remarkAll + remark + "("+receiptCount+") , ";                 	
	                	}                	
	                }				
					
	                objDto.setNarration(remarkAll);
	                objDto.setUserNames(createdByName);
	                
					cAdvList.add(objDto);	
					objDto = null;
				}		    	
		    	cAdv.setLstCommonadv(cAdvList);
			}
		    
		} catch (Exception e) {
			
			e.printStackTrace();
		}		
		return cAdv;
	}
	
	//@codeBy : Vinod @codeDate : 26-Dec-2016 @codeFor : Fetch All payment mode opd discount of closed hisab
	public List<BillReceiptMasterDTO> getOpdRecDetails(int billId,int treatId,int patId,int recId,String callFrom) {
		
		List<BillReceiptMasterDTO> lstPojo = new ArrayList<BillReceiptMasterDTO>();
		List<BillReceiptSlaveDTO> lstSlave = new ArrayList<BillReceiptSlaveDTO>();
		List<BillRefundMasterDTO> lstRefundPojo = new ArrayList<BillRefundMasterDTO>();
		List<BillRefundSlaveDTO> lstRefundSlave = new ArrayList<BillRefundSlaveDTO>();
		List<Map<String, Object>> tretdata = null;
		int rowCount=0;

		try {
			// execute this code if fetch data using click on show button
			String sql="";
			if(callFrom.equals("receipt")){
				
				sql = "select * from ehat_receipt_master where bill_id="+billId+" and treatment_id="+treatId+" and patient_id="+patId+" and bill_receipt_id="+recId+" and deleted='N'";
			
			}else if(callFrom.equals("prevReceipt")){
				
				sql = "select * from ehat_receipt_master where bill_receipt_id="+recId+" and deleted='N'";
				
			}else if(callFrom.equals("receiptIpd")){
				
				sql = "select * from ehat_receipt_master_ipd where bill_id="+billId+" and treatment_id="+treatId+" and patient_id="+patId+" and bill_receipt_id="+recId+" and deleted='N'";
			
			}else if(callFrom.equals("prevReceiptIpd")){
				
				sql = "select * from ehat_receipt_master_ipd where bill_id="+billId+" and treatment_id="+treatId+" and patient_id="+patId+" and bill_receipt_id="+recId+" and deleted='N'";
			
			}else if(callFrom.equals("refundIpd")){
				
				String sql1 = "select receipt_count from ehat_refund_master_ipd where bill_refund_id="+recId+" and deleted='N'";
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				rowCount = (Integer) refQuery.uniqueResult();		
				//rowCount = getJdbcTemplate().queryForObject(sql1, Integer.class);
				
				//sql = "select *,sum(total_paid) as totPaid from ehat_refund_master_ipd where bill_id=? and treatment_id=? and patient_id=? and bill_refund_id=? and deleted='N'";
				sql = "select *,sum(total_paid) as total_refund from ehat_refund_master_ipd where bill_id="+billId+" and treatment_id="+treatId+" and patient_id="+patId+" and receipt_count="+rowCount+" and deleted='N'";
						
			}else if(callFrom.equals("ipdSummary")){
				
				sql="select * from ehat_view_patient_service_detail_ipd where treatment_id="+treatId+"";
				
			}else if(callFrom.equals("OtherReceipt")){
				
				sql = "select * from ehat_receipt_master_other where patient_id="+patId+" and bill_receipt_id="+recId+" and deleted='N'";
				
			}else if(callFrom.equals("OtherRefund")){
				
				sql = "select * from ehat_refund_master_other where patient_id="+patId+" and bill_refund_id="+recId+" and deleted='N'";
				
			}else if(callFrom.equals("receiptris")){ // receipt no is 0 so getting result without recipt no
				
				sql = "select * from ehat_receipt_master where bill_id="+billId+" and treatment_id="+treatId+" and patient_id="+patId+" and deleted='N'";
			
			}else if(callFrom.equals("receiptRisIpd")){  // receipt no is 0 so getting result without recipt no
				
				sql = "select * from ehat_receipt_master_ipd where bill_id="+billId+" and treatment_id="+treatId+" and patient_id="+patId+"  and deleted='N'";
			
			}else{
				
				sql = "select * from ehat_refund_master where bill_id="+billId+" and treatment_id="+treatId+" and patient_id="+patId+" and bill_refund_id="+recId+" and deleted='N'";
			}
			
			if(callFrom.equals("ipdSummary")){
				
				Query query1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				tretdata = query1.list();
				
				//tretdata = getJdbcTemplate().queryForList(sql,new Object[] { treatId });
				// set fetched data in List to DTO class properties 
				if((tretdata != null || !tretdata.isEmpty()) && callFrom !="refund"){
					for (Map rs : tretdata) {
						
						int servId=(Integer)rs.get("service_id");
						BillReceiptMasterDTO ob=new BillReceiptMasterDTO();
						ob.setReceiptCount((Integer)rs.get("receipt_count"));
						ob.setbName((String)rs.get("service_name"));
						ob.setTotalAmt((Double)rs.get("amount"));
						Long qty=(Long)rs.get("service_count");
						ob.setbName((String)rs.get("bank_name"));
						ob.setbNumber((String)rs.get("bank_number"));
						ob.setDiscRemark((String)rs.get("disc_remark"));
						ob.setCreatedDateTime((Date)rs.get("created_date_time"));
						//ob.setBillSettledFlag((String)rs.get("bill_settled_flag"));						
						ob.setTotalQty(qty.doubleValue());
						//ob.setCommon_advanced_amount((String)rs.get("common_advanced_amount"));	//jitendra
						
						sql = "select * from ehat_view_patient_sub_service_details_ipd where treatment_id="+treatId+" and service_id="+servId+" and cancle='N' ";
						Query query2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
						query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						tretdata = query2.list();
						
						List<BillReceiptSlaveDTO> lstIpdSlave = new ArrayList<BillReceiptSlaveDTO>();
						
						// set fetched data in List to DTO class properties 
						if(tretdata != null || !tretdata.isEmpty()){
							for (Map rs1 : tretdata) {
								
								BillReceiptSlaveDTO ob2=new BillReceiptSlaveDTO();
								ob2.setCompName((String)rs1.get("category_name"));
								ob2.setAmount((Double)rs1.get("amount"));
								ob2.setQuantity((Double)rs1.get("quantity"));							
								//ob.setbName((String)rs.get("bank_name"));
								lstIpdSlave.add(ob2);
								ob2=null;				
							}
						}
							
						ob.setListBillReceiptSlave(lstIpdSlave);						
						lstPojo.add(ob);
						ob=null;					
					}
				}
				
			}else{
				
				/*if(callFrom.equals("prevReceipt")){
					
					tretdata = getJdbcTemplate().queryForList(sql,new Object[] { recId });	
				}else if(callFrom.equals("OtherReceipt") || callFrom.equals("OtherRefund")){
					
					tretdata = getJdbcTemplate().queryForList(sql,new Object[] { patId,recId });	
				}else if(callFrom.equals("refundIpd")){
					
					tretdata = getJdbcTemplate().queryForList(sql,new Object[] { billId,treatId,patId,rowCount });	
				} else{
					
					tretdata = getJdbcTemplate().queryForList(sql,new Object[] { billId,treatId,patId,recId });	
				}*/
				
				Query query3 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				tretdata = query3.list();
				
				// set fetched data in List to DTO class properties 
				if((tretdata != null || !tretdata.isEmpty()) && callFrom != "refund"){
					for (Map rs : tretdata) {
						
						BillReceiptMasterDTO ob=new BillReceiptMasterDTO();
						ob.setReceiptCount((Integer)rs.get("receipt_count"));
						ob.setTotalAmt((Double)rs.get("total_amt"));
						ob.setTotalDisc((Double)rs.get("total_discount"));
						
						if(callFrom.equals("refundIpd")){
							
							ob.setTotalPaid((Double)rs.get("total_refund"));
						}else {
							
							ob.setTotalPaid((Double)rs.get("total_paid"));
						}
						
						//ob.setTotalPaid((Double)rs.get("totPaid"));
						ob.setTotalRemain((Double)rs.get("total_remain"));
						ob.setAgainstId((Integer)rs.get("against_id"));
						ob.setPayMode((Integer)rs.get("pay_mode"));
						ob.setbName((String)rs.get("bank_name"));
						ob.setbNumber((String)rs.get("bank_number"));
						ob.setBatchNumber((String)rs.get("batch_number"));
						ob.setCreatedDateTime((Date)rs.get("created_date_time"));
						ob.setDiscRemark((String)rs.get("disc_remark"));
						ob.setCreatedBy((Integer)rs.get("created_by"));
						
						//ob.setCommon_advanced_amount((String)rs.get("common_advanced_amount"));	//jitendra
						
						if(callFrom.equals("receipt")){
							
							ob.setSponsorCatId((Integer)rs.get("sponsor_cat_id"));
							ob.setFirstPaid((Double)rs.get("first_paid"));
							ob.setFirstDisc((Double)rs.get("first_disc"));
							ob.setFirstRemain((Double)rs.get("first_remain"));
							ob.setCreatedBy((Integer)rs.get("created_by"));
						}
						if(callFrom.equals("prevReceipt")){
							
							ob.setSponsorCatId((Integer)rs.get("sponsor_cat_id"));
							ob.setFirstPaid((Double)rs.get("first_paid"));
							ob.setFirstDisc((Double)rs.get("first_disc"));
							ob.setFirstRemain((Double)rs.get("first_remain"));
						}
						
						if(callFrom.equals("receiptIpd")){
							
							ob.setBillSettledFlag((String)rs.get("bill_settled_flag"));
							ob.setDiscRemark((String)rs.get("remark"));
							
							String sqlCommon = "select fn_get_common_adv("+treatId+",'ipdBill')";
							Query queryCommon = sessionFactory.getCurrentSession().createSQLQuery(sqlCommon);
							String commonAdv = (String) queryCommon.uniqueResult();
							
							ob.setCommonAdv(commonAdv);
							
							
						}	
						
						if(callFrom.equals("refundIpd")){
							
							ob.setRefRemark((String)rs.get("remark"));
							
							/*String sqlBill="select sum(amount) as totAmt FROM ehat_bill_details_ipd where deleted='N' and treatment_id="+treatId+" and cancle='N' ";
							double totBill = (Double) getJdbcTemplate().queryForObject(sqlBill, Double.class);							
							ob.setTotalAmt(totBill);*/
							
							String sqlAdv="select ifnull(sum(total_paid),0) from ehat_receipt_master_ipd where deleted='N' and treatment_id="+treatId+" ";
							//double totAdvc = (Double) getJdbcTemplate().queryForObject(sqlAdv, Double.class);		
							Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlAdv);
							double totAdvc = (Double) refQuery.uniqueResult();	
							ob.setTotalDisc(totAdvc);
							ob.setCreatedBy((Integer)rs.get("created_by"));
							
						}
						
						if(callFrom.equals("receipt")){
							
							// execute this code if fetch data using click on show button
							sql = "select * from ehat_receipt_slave where bill_id="+billId+" and treatment_id="+treatId+" and patient_id="+patId+" and bill_receipt_master_id="+recId+" and deleted='N'";
							//tretdata = getJdbcTemplate().queryForList(sql,new Object[] { billId,treatId,patId,recId });	
							Query query4 = sessionFactory.getCurrentSession().createSQLQuery(sql);
							query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							tretdata = query4.list();
										
							// set fetched data in List to DTO class properties 
							if(tretdata != null || !tretdata.isEmpty()){
								for (Map rs1 : tretdata) {
									
									BillReceiptSlaveDTO ob2=new BillReceiptSlaveDTO();
									ob2.setCompName((String)rs1.get("comp_name"));
									ob2.setRate((Double)rs1.get("rate"));
									ob2.setQuantity((Double)rs1.get("quantity"));
									ob2.setAmount((Double)rs1.get("amount"));
									ob2.setConcession((Double)rs1.get("concession"));
									ob2.setDoctorId((Integer)rs1.get("doctor_id"));
									ob2.setServiceId((Integer)rs1.get("service_id"));
									ob2.setReceiptMasterCount((Integer)rs1.get("receipt_master_count"));
									ob2.setSubServiceId(((Number)rs1.get("sub_service_id")).intValue());
									//ob.setbName((String)rs.get("bank_name"));
									lstSlave.add(ob2);
									ob2=null;				
								}
							}
							ob.setListBillReceiptSlave(lstSlave);
						}else if(callFrom.equals("OtherReceipt")){
							
							// execute this code if fetch data using click on show button
							sql = "select * from ehat_receipt_slave_other where patient_id="+patId+" and bill_receipt_master_id="+recId+" and deleted='N'";
							//tretdata = getJdbcTemplate().queryForList(sql,new Object[] { patId,recId });	
							Query query4 = sessionFactory.getCurrentSession().createSQLQuery(sql);
							query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							tretdata = query4.list();
										
							// set fetched data in List to DTO class properties 
							if(tretdata != null || !tretdata.isEmpty()){
								for (Map rs1 : tretdata) {
									
									BillReceiptSlaveDTO ob2=new BillReceiptSlaveDTO();
									ob2.setCompName((String)rs1.get("comp_name"));
									ob2.setRate((Double)rs1.get("rate"));
									ob2.setQuantity((Double)rs1.get("quantity"));
									ob2.setAmount((Double)rs1.get("amount"));
									ob2.setConcession((Double)rs1.get("concession"));
									ob2.setDoctorId((Integer)rs1.get("doctor_id"));
									ob2.setServiceId((Integer)rs1.get("service_id"));
									lstSlave.add(ob2);
									ob2=null;				
								}
							}
							ob.setListBillReceiptSlave(lstSlave);
						}else if(callFrom.equals("prevReceipt")){
								
							sql = "select * from ehat_receipt_slave where bill_receipt_master_id="+recId+" and deleted='N'";
							//tretdata = getJdbcTemplate().queryForList(sql,new Object[] { recId });		
							Query query4 = sessionFactory.getCurrentSession().createSQLQuery(sql);
							query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							tretdata = query4.list();
							
							// set fetched data in List to DTO class properties 
							if(tretdata != null || !tretdata.isEmpty()){
								for (Map rs1 : tretdata) {
									
									BillReceiptSlaveDTO ob2=new BillReceiptSlaveDTO();
									ob2.setCompName((String)rs1.get("comp_name"));
									ob2.setRate((Double)rs1.get("rate"));
									ob2.setQuantity((Double)rs1.get("quantity"));
									ob2.setAmount((Double)rs1.get("amount"));
									ob2.setConcession((Double)rs1.get("concession"));
									ob2.setDoctorId((Integer)rs1.get("doctor_id"));
									//ob.setbName((String)rs.get("bank_name"));
									ob2.setServiceId((Integer)rs1.get("service_id"));
									lstSlave.add(ob2);
									ob2=null;				
								}
							}
							ob.setListBillReceiptSlave(lstSlave);
						}else if(callFrom.equals("receiptIpd")){
							
							// execute this code if fetch data using click on show button
							sql = "select * from ehat_receipt_slave_ipd where bill_id="+billId+" and treatment_id="+treatId+" and patient_id="+patId+" and bill_receipt_master_id="+recId+" and deleted='N'";
							//tretdata = getJdbcTemplate().queryForList(sql,new Object[] { billId,treatId,patId,recId });	
							Query query4 = sessionFactory.getCurrentSession().createSQLQuery(sql);
							query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							tretdata = query4.list();
												
							// set fetched data in List to DTO class properties 
							if(tretdata != null || !tretdata.isEmpty()){
								for (Map rs1 : tretdata) {
									
									BillReceiptSlaveDTO ob2=new BillReceiptSlaveDTO();
									ob2.setCompName((String)rs1.get("comp_name"));
									ob2.setRate((Double)rs1.get("rate"));
									ob2.setQuantity((Double)rs1.get("quantity"));
									ob2.setAmount((Double)rs1.get("amount"));
									ob2.setConcession((Double)rs1.get("concession"));	
									//ob.setbName((String)rs.get("bank_name"));
									lstSlave.add(ob2);
									ob2=null;				
								}
							}
							ob.setListBillReceiptSlave(lstSlave);
						}else if(callFrom.equals("prevReceiptIpd")){
							
							// execute this code if fetch data using click on show button
							sql = "select * from ehat_receipt_slave_ipd where bill_receipt_master_id="+recId+" and deleted='N'";
							//tretdata = getJdbcTemplate().queryForList(sql,new Object[] { recId });
							Query query4 = sessionFactory.getCurrentSession().createSQLQuery(sql);
							query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							tretdata = query4.list();
												
							// set fetched data in List to DTO class properties 
							if(tretdata != null || !tretdata.isEmpty()){
								for (Map rs1 : tretdata) {
									
									BillReceiptSlaveDTO ob2=new BillReceiptSlaveDTO();
									ob2.setCompName((String)rs1.get("comp_name"));
									ob2.setRate((Double)rs1.get("rate"));
									ob2.setQuantity((Double)rs1.get("quantity"));
									ob2.setAmount((Double)rs1.get("amount"));
									ob2.setConcession((Double)rs1.get("concession"));	
									//ob.setbName((String)rs.get("bank_name"));
									lstSlave.add(ob2);
									ob2=null;				
								}
							}
							ob.setListBillReceiptSlave(lstSlave);
						
						}
						
						
						lstPojo.add(ob);					
						ob=null;					
					}
				}	
				
			}					
			
		} catch (Exception e) {
			e.printStackTrace();
		}
			
		return lstPojo;		
	}
	
	public List<MultiBillReceiptMasterDTO> getMultiRecDetails(int billId,
			int treatId, int patId, int recId, int departmentId) {
		List<MultiBillReceiptMasterDTO> lstPojo = new ArrayList<MultiBillReceiptMasterDTO>();
		List<Map<String, Object>> tretdata = null;
		
		//fetching data from tables
		String sql = "SELECT mrm.*,pm.pay_name FROM ehat_multi_receipt_master mrm,payment_master pm where mrm.bill_id="+billId+" and mrm.treatment_id="+treatId+" and mrm.patient_id="+patId+" and mrm.bill_receipt_id="+recId+" and mrm.department_id="+departmentId+" and mrm.deleted='N' and mrm.pay_mode=pm.pay_id";
		//tretdata = getJdbcTemplate().queryForList(sql,new Object[] { billId,treatId,patId,recId,departmentId });
		Query query4 = sessionFactory.getCurrentSession().createSQLQuery(sql);
		query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		tretdata = query4.list();
		
		if (tretdata != null || !tretdata.isEmpty()) {
			for (Map rs : tretdata) {
				MultiBillReceiptMasterDTO ob=new MultiBillReceiptMasterDTO();
								
				ob.setMultiBillReceiptId((Integer)rs.get("multi_bill_receipt_id"));
				
				//Due to bankId in String coloumn !!!typcast!!!
				String bankIdStr = (String) rs.get("bank_name");
				int bankId = 0;
				if (!bankIdStr.equalsIgnoreCase("")
						&& !bankIdStr.equalsIgnoreCase(null)) {
					bankId = Integer.parseInt(bankIdStr);
				}

				//To fetch Bank Name of particular bankId
				String bName = "";
				if (bankId > 0) {
					sql = "SELECT bank_name FROM pharma_bank_master where bank_id="+bankId+" ";
					//bName = (String) getJdbcTemplate().queryForObject(sql,new Object[] { bankId }, String.class);					
					Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					bName = (String) refQuery.uniqueResult();	
				}
				//set fetch bank name
				ob.setbName(bName);
				
				ob.setbNumber((String)rs.get("bank_number"));
				ob.setBatchNumber((String)rs.get("batch_no"));
				ob.setBillId((Integer)rs.get("bill_id"));
				ob.setBillReceiptId((Integer)rs.get("bill_receipt_id"));
				ob.setDepartmentId((Integer)rs.get("department_id"));
				ob.setPatientId((Integer)rs.get("patient_id"));
				ob.setPayMode((Integer)rs.get("pay_mode"));
				ob.setPayName((String)rs.get("pay_name"));
				ob.setTotalPaid((Double)rs.get("total_paid"));
				ob.setCreatedDateTime((Date)rs.get("created_date_time"));
				lstPojo.add(ob);
			}
		}
		return lstPojo;
	}
	
	public List<BillRefundMasterDTO> getOpdRefundDetails(int billId,
			int treatId, int patId, int recId, String callFrom) {
		List<BillRefundMasterDTO> lstRefundPojo = new ArrayList<BillRefundMasterDTO>();
		List<BillRefundSlaveDTO> lstRefundSlave = new ArrayList<BillRefundSlaveDTO>();
		List<Map<String, Object>> tretdata = null;
		int rowCount = 0;

		try {
			// execute this code if fetch data using click on show button
			String sql = "";
			sql = "select * from ehat_refund_master where bill_id="+billId+" and treatment_id="+treatId+" and patient_id="+patId+" and bill_refund_id="+recId+" and deleted='N'";
			//tretdata = getJdbcTemplate().queryForList(sql,new Object[] { billId,treatId,patId,recId });
			Query query4 = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			tretdata = query4.list();
			
			if (callFrom == "refund") {
				for (Map rs : tretdata) {
					BillRefundMasterDTO billRefundMasterDTO = new BillRefundMasterDTO();
					billRefundMasterDTO.setRefundCount((Integer) rs
							.get("receipt_count"));
					billRefundMasterDTO.setTotalAmt((Double) rs
							.get("total_amt"));
					billRefundMasterDTO.setTotalDisc((Double) rs
							.get("total_discount"));
					billRefundMasterDTO.setTotalPaid((Double) rs
							.get("total_paid"));
					billRefundMasterDTO.setTotalRemain((Double) rs
							.get("total_remain"));
					billRefundMasterDTO.setAgainstId((Integer) rs
							.get("against_id"));
					billRefundMasterDTO
							.setPayMode((Integer) rs.get("pay_mode"));
					billRefundMasterDTO.setbName((String) rs.get("bank_name"));
					billRefundMasterDTO.setbNumber((String) rs
							.get("bank_number"));
					billRefundMasterDTO.setBatchNumber((String) rs
							.get("batch_number"));
					billRefundMasterDTO.setCreatedDateTime((Date) rs
							.get("created_date_time"));
					billRefundMasterDTO.setCreatedBy((Integer) rs
							.get("created_by"));
					if (callFrom.equals("refund")) {
						billRefundMasterDTO.setSponsorCatId((Integer) rs
								.get("sponsor_cat_id"));
						billRefundMasterDTO.setTotalPaid((Double) rs
								.get("total_paid"));
						billRefundMasterDTO.setTotalRemain((Double) rs
								.get("total_remain"));
						billRefundMasterDTO.setRefRemark((String) rs
								.get("ref_remark"));
						billRefundMasterDTO.setBillRefundId((Integer) rs.get("bill_refund_id"));
						
						sql = "select * from ehat_refund_slave where bill_receipt_master_id="+recId+" and deleted='N'";
						Query query5 = sessionFactory.getCurrentSession().createSQLQuery(sql);
						query5.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						tretdata = query5.list();
						if (tretdata != null || !tretdata.isEmpty()) {
							for (Map rs1 : tretdata) {
								BillRefundSlaveDTO billRefundSlaveDTO = new BillRefundSlaveDTO();
								billRefundSlaveDTO.setCompName((String) rs1
										.get("comp_name"));
								billRefundSlaveDTO.setRate((Double) rs1
										.get("rate"));
								billRefundSlaveDTO.setQuantity((Double) rs1
										.get("quantity"));
								billRefundSlaveDTO.setAmount((Double) rs1
										.get("amount"));
								billRefundSlaveDTO.setPaid((Double) rs1
										.get("paid"));
								billRefundSlaveDTO.setConcession((Double) rs1
										.get("concession"));
								billRefundSlaveDTO.setDiscount((Double) rs1
										.get("discount"));
								// ob.setbName((String)rs.get("bank_name"));
								lstRefundSlave.add(billRefundSlaveDTO);
								billRefundSlaveDTO = null;
							}
						}
						billRefundMasterDTO
								.setListBillRefundSlave(lstRefundSlave);
					}
					lstRefundPojo.add(billRefundMasterDTO);
					billRefundMasterDTO = null;
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return lstRefundPojo;
	}
	
	//@codeBy : Vinod @codeDate : 26-Dec-2016 @codeFor : Fetch All payment mode opd discount of closed hisab
	public List<BillReceiptMasterDTO> getIvfOpdRecDetails(int billId,int treatId,int patId,int recId,String callFrom) {
		
		List<BillReceiptMasterDTO> lstPojo = new ArrayList<BillReceiptMasterDTO>();
		List<BillReceiptSlaveDTO> lstSlave = new ArrayList<BillReceiptSlaveDTO>();
		List<BillRefundMasterDTO> lstRefundPojo = new ArrayList<BillRefundMasterDTO>();
		List<BillRefundSlaveDTO> lstRefundSlave = new ArrayList<BillRefundSlaveDTO>();
		List<Map<String, Object>> tretdata = null;
		int rowCount=0;

		try {
			// execute this code if fetch data using click on show button
			String sql="";
			if(callFrom.equals("receipt")){
				
				sql = "select * from ivf_ehat_receipt_master where bill_id="+billId+" and treatment_id="+treatId+" and patient_id="+patId+" and bill_receipt_id="+recId+" and deleted='N'";
			
			}else if(callFrom.equals("prevReceipt")){
				
				sql = "select * from ivf_ehat_receipt_master where bill_receipt_id="+recId+" and deleted='N'";
				
			}else if(callFrom.equals("receiptIpd")){
				
				sql = "select * from ivf_ehat_receipt_master_ipd where bill_id="+billId+" and treatment_id="+treatId+" and patient_id="+patId+" and bill_receipt_id="+recId+" and deleted='N'";
			
			}else if(callFrom.equals("prevReceiptIpd")){
				
				sql = "select * from ivf_ehat_receipt_master_ipd where bill_id="+billId+" and treatment_id="+treatId+" and patient_id="+patId+" and bill_receipt_id="+recId+" and deleted='N'";
			
			}else if(callFrom.equals("refundIpd")){
				
				String sql1 = "select receipt_count from ivf_ehat_refund_master_ipd where bill_refund_id="+recId+" and deleted='N'";
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				rowCount = (Integer) refQuery.uniqueResult();		
				//rowCount = getJdbcTemplate().queryForObject(sql1, Integer.class);
				
				//sql = "select *,sum(total_paid) as totPaid from ehat_refund_master_ipd where bill_id=? and treatment_id=? and patient_id=? and bill_refund_id=? and deleted='N'";
				sql = "select *,sum(total_paid) as total_paid from ivf_ehat_refund_master_ipd where bill_id="+billId+" and treatment_id="+treatId+" and patient_id="+patId+" and receipt_count="+rowCount+" and deleted='N'";
						
			}else if(callFrom.equals("ipdSummary")){
				
				sql="select * from ehat_view_patient_service_detail_ipd where treatment_id="+treatId+"";
				
			}else if(callFrom.equals("OtherReceipt")){
				
				sql = "select * from ivf_ehat_receipt_master_other where patient_id="+patId+" and bill_receipt_id="+recId+" and deleted='N'";
				
			}else if(callFrom.equals("OtherRefund")){
				
				sql = "select * from ivf_ehat_refund_master_other where patient_id="+patId+" and bill_refund_id="+recId+" and deleted='N'";
				
			}else{
				
				sql = "select * from ivf_ehat_refund_master where bill_id="+billId+" and treatment_id="+treatId+" and patient_id="+patId+" and bill_refund_id="+recId+" and deleted='N'";
			}
			
			if(callFrom.equals("ipdSummary")){
				
				Query query1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				tretdata = query1.list();
				
				//tretdata = getJdbcTemplate().queryForList(sql,new Object[] { treatId });
				// set fetched data in List to DTO class properties 
				if((tretdata != null || !tretdata.isEmpty()) && callFrom !="refund"){
					for (Map rs : tretdata) {
						
						int servId=(Integer)rs.get("service_id");
						BillReceiptMasterDTO ob=new BillReceiptMasterDTO();
						ob.setReceiptCount((Integer)rs.get("receipt_count"));
						ob.setbName((String)rs.get("service_name"));
						ob.setTotalAmt((Double)rs.get("amount"));
						Long qty=(Long)rs.get("service_count");
						ob.setbName((String)rs.get("bank_name"));
						ob.setbNumber((String)rs.get("bank_number"));
						ob.setDiscRemark((String)rs.get("disc_remark"));
						ob.setCreatedDateTime((Date)rs.get("created_date_time"));
						//ob.setBillSettledFlag((String)rs.get("bill_settled_flag"));						
						ob.setTotalQty(qty.doubleValue());
						//ob.setCommon_advanced_amount((String)rs.get("common_advanced_amount"));	//jitendra
						
						sql = "select * from ehat_view_patient_sub_service_details_ipd where treatment_id="+treatId+" and service_id="+servId+" and cancle='N' ";
						Query query2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
						query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						tretdata = query2.list();
						
						List<BillReceiptSlaveDTO> lstIpdSlave = new ArrayList<BillReceiptSlaveDTO>();
						
						// set fetched data in List to DTO class properties 
						if(tretdata != null || !tretdata.isEmpty()){
							for (Map rs1 : tretdata) {
								
								BillReceiptSlaveDTO ob2=new BillReceiptSlaveDTO();
								ob2.setCompName((String)rs1.get("category_name"));
								ob2.setAmount((Double)rs1.get("amount"));
								ob2.setQuantity((Double)rs1.get("quantity"));							
								//ob.setbName((String)rs.get("bank_name"));
								lstIpdSlave.add(ob2);
								ob2=null;				
							}
						}
							
						ob.setListBillReceiptSlave(lstIpdSlave);						
						lstPojo.add(ob);
						ob=null;					
					}
				}
				
			}else{
				
				/*if(callFrom.equals("prevReceipt")){
					
					tretdata = getJdbcTemplate().queryForList(sql,new Object[] { recId });	
				}else if(callFrom.equals("OtherReceipt") || callFrom.equals("OtherRefund")){
					
					tretdata = getJdbcTemplate().queryForList(sql,new Object[] { patId,recId });	
				}else if(callFrom.equals("refundIpd")){
					
					tretdata = getJdbcTemplate().queryForList(sql,new Object[] { billId,treatId,patId,rowCount });	
				} else{
					
					tretdata = getJdbcTemplate().queryForList(sql,new Object[] { billId,treatId,patId,recId });	
				}*/
				
				Query query3 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				tretdata = query3.list();
				
				// set fetched data in List to DTO class properties 
				if((tretdata != null || !tretdata.isEmpty()) && callFrom != "refund"){
					for (Map rs : tretdata) {
						
						BillReceiptMasterDTO ob=new BillReceiptMasterDTO();
						ob.setReceiptCount((Integer)rs.get("receipt_count"));
						ob.setTotalAmt((Double)rs.get("total_amt"));
						ob.setTotalDisc((Double)rs.get("total_discount"));
						ob.setTotalPaid((Double)rs.get("total_paid"));
						//ob.setTotalPaid((Double)rs.get("totPaid"));
						ob.setTotalRemain((Double)rs.get("total_remain"));
						ob.setAgainstId((Integer)rs.get("against_id"));
						ob.setPayMode((Integer)rs.get("pay_mode"));
						ob.setbName((String)rs.get("bank_name"));
						ob.setbNumber((String)rs.get("bank_number"));
						ob.setBatchNumber((String)rs.get("batch_number"));
						ob.setCreatedDateTime((Date)rs.get("created_date_time"));
						ob.setDiscRemark((String)rs.get("disc_remark"));
						//ob.setCommon_advanced_amount((String)rs.get("common_advanced_amount"));	//jitendra
						
						if(callFrom.equals("receipt")){
							
							ob.setSponsorCatId((Integer)rs.get("sponsor_cat_id"));
							ob.setFirstPaid((Double)rs.get("first_paid"));
							ob.setFirstDisc((Double)rs.get("first_disc"));
							ob.setFirstRemain((Double)rs.get("first_remain"));
						}
						if(callFrom.equals("prevReceipt")){
							
							ob.setSponsorCatId((Integer)rs.get("sponsor_cat_id"));
							ob.setFirstPaid((Double)rs.get("first_paid"));
							ob.setFirstDisc((Double)rs.get("first_disc"));
							ob.setFirstRemain((Double)rs.get("first_remain"));
						}
						
						if(callFrom.equals("receiptIpd")){
							
							ob.setBillSettledFlag((String)rs.get("bill_settled_flag"));
							ob.setDiscRemark((String)rs.get("remark"));
							
						}	
						
						if(callFrom.equals("refundIpd")){
							
							ob.setRefRemark((String)rs.get("remark"));
							
							/*String sqlBill="select sum(amount) as totAmt FROM ehat_bill_details_ipd where deleted='N' and treatment_id="+treatId+" and cancle='N' ";
							double totBill = (Double) getJdbcTemplate().queryForObject(sqlBill, Double.class);							
							ob.setTotalAmt(totBill);*/
							
							String sqlAdv="select ifnull(sum(total_paid),0) from ivf_ehat_receipt_master_ipd where deleted='N' and treatment_id="+treatId+" ";
							//double totAdvc = (Double) getJdbcTemplate().queryForObject(sqlAdv, Double.class);		
							Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlAdv);
							double totAdvc = (Double) refQuery.uniqueResult();	
							ob.setTotalDisc(totAdvc);
							
						}
						
						if(callFrom.equals("receipt")){
							
							// execute this code if fetch data using click on show button
							sql = "select * from ivf_ehat_receipt_slave where bill_id="+billId+" and treatment_id="+treatId+" and patient_id="+patId+" and bill_receipt_master_id="+recId+" and deleted='N'";
							//tretdata = getJdbcTemplate().queryForList(sql,new Object[] { billId,treatId,patId,recId });	
							Query query4 = sessionFactory.getCurrentSession().createSQLQuery(sql);
							query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							tretdata = query4.list();
										
							// set fetched data in List to DTO class properties 
							if(tretdata != null || !tretdata.isEmpty()){
								for (Map rs1 : tretdata) {
									
									BillReceiptSlaveDTO ob2=new BillReceiptSlaveDTO();
									ob2.setCompName((String)rs1.get("comp_name"));
									ob2.setRate((Double)rs1.get("rate"));
									ob2.setQuantity((Double)rs1.get("quantity"));
									ob2.setAmount((Double)rs1.get("amount"));
									ob2.setConcession((Double)rs1.get("concession"));
									ob2.setDoctorId((Integer)rs1.get("doctor_id"));
									ob2.setServiceId((Integer)rs1.get("service_id"));
									ob2.setReceiptMasterCount((Integer)rs1.get("receipt_master_count"));
									//ob.setbName((String)rs.get("bank_name"));
									lstSlave.add(ob2);
									ob2=null;				
								}
							}
							ob.setListBillReceiptSlave(lstSlave);
						}else if(callFrom.equals("OtherReceipt")){
							
							// execute this code if fetch data using click on show button
							sql = "select * from ivf_ehat_receipt_slave_other where patient_id="+patId+" and bill_receipt_master_id="+recId+" and deleted='N'";
							//tretdata = getJdbcTemplate().queryForList(sql,new Object[] { patId,recId });	
							Query query4 = sessionFactory.getCurrentSession().createSQLQuery(sql);
							query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							tretdata = query4.list();
										
							// set fetched data in List to DTO class properties 
							if(tretdata != null || !tretdata.isEmpty()){
								for (Map rs1 : tretdata) {
									
									BillReceiptSlaveDTO ob2=new BillReceiptSlaveDTO();
									ob2.setCompName((String)rs1.get("comp_name"));
									ob2.setRate((Double)rs1.get("rate"));
									ob2.setQuantity((Double)rs1.get("quantity"));
									ob2.setAmount((Double)rs1.get("amount"));
									ob2.setConcession((Double)rs1.get("concession"));
									ob2.setDoctorId((Integer)rs1.get("doctor_id"));
									ob2.setServiceId((Integer)rs1.get("service_id"));
									lstSlave.add(ob2);
									ob2=null;				
								}
							}
							ob.setListBillReceiptSlave(lstSlave);
						}else if(callFrom.equals("prevReceipt")){
								
							sql = "select * from ivf_ehat_receipt_slave where bill_receipt_master_id="+recId+" and deleted='N'";
							//tretdata = getJdbcTemplate().queryForList(sql,new Object[] { recId });		
							Query query4 = sessionFactory.getCurrentSession().createSQLQuery(sql);
							query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							tretdata = query4.list();
							
							// set fetched data in List to DTO class properties 
							if(tretdata != null || !tretdata.isEmpty()){
								for (Map rs1 : tretdata) {
									
									BillReceiptSlaveDTO ob2=new BillReceiptSlaveDTO();
									ob2.setCompName((String)rs1.get("comp_name"));
									ob2.setRate((Double)rs1.get("rate"));
									ob2.setQuantity((Double)rs1.get("quantity"));
									ob2.setAmount((Double)rs1.get("amount"));
									ob2.setConcession((Double)rs1.get("concession"));
									ob2.setDoctorId((Integer)rs1.get("doctor_id"));
									//ob.setbName((String)rs.get("bank_name"));
									ob2.setServiceId((Integer)rs1.get("service_id"));
									lstSlave.add(ob2);
									ob2=null;				
								}
							}
							ob.setListBillReceiptSlave(lstSlave);
						}else if(callFrom.equals("receiptIpd")){
							
							// execute this code if fetch data using click on show button
							sql = "select * from ivf_ehat_receipt_slave_ipd where bill_id="+billId+" and treatment_id="+treatId+" and patient_id="+patId+" and bill_receipt_master_id="+recId+" and deleted='N'";
							//tretdata = getJdbcTemplate().queryForList(sql,new Object[] { billId,treatId,patId,recId });	
							Query query4 = sessionFactory.getCurrentSession().createSQLQuery(sql);
							query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							tretdata = query4.list();
												
							// set fetched data in List to DTO class properties 
							if(tretdata != null || !tretdata.isEmpty()){
								for (Map rs1 : tretdata) {
									
									BillReceiptSlaveDTO ob2=new BillReceiptSlaveDTO();
									ob2.setCompName((String)rs1.get("comp_name"));
									ob2.setRate((Double)rs1.get("rate"));
									ob2.setQuantity((Double)rs1.get("quantity"));
									ob2.setAmount((Double)rs1.get("amount"));
									ob2.setConcession((Double)rs1.get("concession"));	
									//ob.setbName((String)rs.get("bank_name"));
									lstSlave.add(ob2);
									ob2=null;				
								}
							}
							ob.setListBillReceiptSlave(lstSlave);
						}else if(callFrom.equals("prevReceiptIpd")){
							
							// execute this code if fetch data using click on show button
							sql = "select * from ivf_ehat_receipt_slave_ipd where bill_receipt_master_id="+recId+" and deleted='N'";
							//tretdata = getJdbcTemplate().queryForList(sql,new Object[] { recId });
							Query query4 = sessionFactory.getCurrentSession().createSQLQuery(sql);
							query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							tretdata = query4.list();
												
							// set fetched data in List to DTO class properties 
							if(tretdata != null || !tretdata.isEmpty()){
								for (Map rs1 : tretdata) {
									
									BillReceiptSlaveDTO ob2=new BillReceiptSlaveDTO();
									ob2.setCompName((String)rs1.get("comp_name"));
									ob2.setRate((Double)rs1.get("rate"));
									ob2.setQuantity((Double)rs1.get("quantity"));
									ob2.setAmount((Double)rs1.get("amount"));
									ob2.setConcession((Double)rs1.get("concession"));	
									//ob.setbName((String)rs.get("bank_name"));
									lstSlave.add(ob2);
									ob2=null;				
								}
							}
							ob.setListBillReceiptSlave(lstSlave);
						
						}
						lstPojo.add(ob);					
						ob=null;					
					}
				}	
				
			}					
			
		} catch (Exception e) {
			e.printStackTrace();
		}
			
		return lstPojo;		
	}
	
	public List<BillRefundMasterDTO> getIvfOpdRefundDetails(int billId,
			int treatId, int patId, int recId, String callFrom) {
		List<BillRefundMasterDTO> lstRefundPojo = new ArrayList<BillRefundMasterDTO>();
		List<BillRefundSlaveDTO> lstRefundSlave = new ArrayList<BillRefundSlaveDTO>();
		List<Map<String, Object>> tretdata = null;
		int rowCount = 0;

		try {
			// execute this code if fetch data using click on show button
			String sql = "";
			sql = "select * from ivf_ehat_refund_master where bill_id="+billId+" and treatment_id="+treatId+" and patient_id="+patId+" and bill_refund_id="+recId+" and deleted='N'";
			//tretdata = getJdbcTemplate().queryForList(sql,new Object[] { billId,treatId,patId,recId });
			Query query4 = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			tretdata = query4.list();
			
			if (callFrom == "refund") {
				for (Map rs : tretdata) {
					BillRefundMasterDTO billRefundMasterDTO = new BillRefundMasterDTO();
					billRefundMasterDTO.setRefundCount((Integer) rs
							.get("receipt_count"));
					billRefundMasterDTO.setTotalAmt((Double) rs
							.get("total_amt"));
					billRefundMasterDTO.setTotalDisc((Double) rs
							.get("total_discount"));
					billRefundMasterDTO.setTotalPaid((Double) rs
							.get("total_paid"));
					billRefundMasterDTO.setTotalRemain((Double) rs
							.get("total_remain"));
					billRefundMasterDTO.setAgainstId((Integer) rs
							.get("against_id"));
					billRefundMasterDTO
							.setPayMode((Integer) rs.get("pay_mode"));
					billRefundMasterDTO.setbName((String) rs.get("bank_name"));
					billRefundMasterDTO.setbNumber((String) rs
							.get("bank_number"));
					billRefundMasterDTO.setBatchNumber((String) rs
							.get("batch_number"));
					billRefundMasterDTO.setCreatedDateTime((Date) rs
							.get("created_date_time"));
					if (callFrom.equals("refund")) {
						billRefundMasterDTO.setSponsorCatId((Integer) rs
								.get("sponsor_cat_id"));
						billRefundMasterDTO.setTotalPaid((Double) rs
								.get("total_paid"));
						billRefundMasterDTO.setTotalRemain((Double) rs
								.get("total_remain"));
						billRefundMasterDTO.setRefRemark((String) rs
								.get("ref_remark"));
						billRefundMasterDTO.setBillRefundId((Integer) rs.get("bill_refund_id"));
						
						/*sql = "select * from ehat_refund_slave where bill_receipt_master_id="+recId+" and deleted='N'";
						Query query5 = sessionFactory.getCurrentSession().createSQLQuery(sql);
						query5.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						tretdata = query5.list();
						if (tretdata != null || !tretdata.isEmpty()) {
							for (Map rs1 : tretdata) {
								BillRefundSlaveDTO billRefundSlaveDTO = new BillRefundSlaveDTO();
								billRefundSlaveDTO.setCompName((String) rs1
										.get("comp_name"));
								billRefundSlaveDTO.setRate((Double) rs1
										.get("rate"));
								billRefundSlaveDTO.setQuantity((Double) rs1
										.get("quantity"));
								billRefundSlaveDTO.setAmount((Double) rs1
										.get("amount"));
								billRefundSlaveDTO.setPaid((Double) rs1
										.get("paid"));
								billRefundSlaveDTO.setConcession((Double) rs1
										.get("concession"));
								billRefundSlaveDTO.setDiscount((Double) rs1
										.get("discount"));
								// ob.setbName((String)rs.get("bank_name"));
								lstRefundSlave.add(billRefundSlaveDTO);
								billRefundSlaveDTO = null;
							}
						}
						billRefundMasterDTO
								.setListBillRefundSlave(lstRefundSlave);*/
					}
					lstRefundPojo.add(billRefundMasterDTO);
					billRefundMasterDTO = null;
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return lstRefundPojo;
	}

	@Override
	public String checkUserNameandPasswordByRefundApproved(Integer userId,
			String username, String password) {
		
		String status=null;
		SQLQuery sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT User_Name,password FROM users where User_ID="+userId);
		sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> listsubservice2 = sql.list();
	    for (Map<String, Object> rs1 : listsubservice2) {
	    	String  UserNamecheck=(String) rs1.get("User_Name");
	    	String  Passwordcheck=(String) rs1.get("password");
	    	if(UserNamecheck.equals(username) && Passwordcheck.equals(password)){
	            status="Approved  Succssefully";
	        }
	        else{
	            status="Invalid User Name or Password";
	        }
		
	}
	    return status;
}

	@Override
	public int updateBillMasterTotalForOPD(int treatmentId) {
		
		int result = 0;
		int billId = 0;
		int sponsorId = 0;
		try {
			// Update amount in bill master start
			double totalAmt=0;				
			double totPaid=0;
			double totRemain=0;
			double totRefund=0;
			double totDisc=0;
			double totConcn=0;		
			String callFrom = "opd";
			
			String sql = "select bill_id,charges_master_slave_id from ehat_bill_master where treatment_id="+treatmentId;
			Query labTestResQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			labTestResQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listLabTest = labTestResQuery.list();
			if(listLabTest.size()>0){
				for(Map<String, Object> row : listLabTest){
					
					billId = (Integer)row.get("bill_id");
					sponsorId = (Integer)row.get("charges_master_slave_id");
				}
			}	
			
			BillReceiptMasterDTO obj=new BillReceiptMasterDTO();
			obj.setTreatmentId(treatmentId);
			obj.setSponsorCatId(sponsorId);
			BillReceiptMasterDTO objRec = fetchAllReceiptTotals(obj,callFrom);
			
			totalAmt = objRec.getActualAmt();
			totConcn = objRec.getActualTotConcn();
			totDisc = objRec.getTotalDisc();
			totPaid = objRec.getTotalPaid();		
			totRefund = objRec.getRefundAmt();
			totRemain = totalAmt - (totConcn + totDisc + totPaid);		
			
			//Session session = session;
			String hql = "UPDATE BillMasterDto set updatedDateTime =:updatedDateTime, totalBill =:totalBill,totalPaid =:totalPaid,total_remain =:remaining,totalRefund =:totalRefund,discount =:discount,total_concn =:totalConcn WHERE billId =:billId";
			Query query = sessionFactory.getCurrentSession().createQuery(hql);
			query.setDate("updatedDateTime",new Date(new java.util.Date().getTime()));
			query.setParameter("totalBill",totalAmt);  
			query.setParameter("totalPaid",totPaid);  
			query.setParameter("remaining",totRemain);  
			query.setParameter("totalRefund",totRefund);  
			query.setParameter("discount",totDisc);  
			query.setParameter("totalConcn",totConcn);  
			query.setParameter("billId",billId);  
			query.executeUpdate();
			// Update amount in bill master end
					
			result=1;
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
		}
		return result;
	}

	public Integer getSettledBillCount(String fDate, String tDate) {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = " select count(*) from ehat_bulk_settlement_master where DATE(created_date_time) >= '"+fDate+"'" + 
					"AND DATE(created_date_time) <= '"+tDate+"' AND deleted='N'" ;
			
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}

	@Override
	@Transactional
	public int saveOutStandingRemark(int treatmentId, String remark,String outStandingReson) {
		// TODO Auto-generated method stub
		Integer billId = 0;
		try {
			String sqlQuery = "SELECT bill_id from ehat_bill_master where deleted='N' and treatment_id=" + treatmentId;
			// String sqlQuery = "SELECT column1 as property1, column2 as property2 FROM
			// your_table WHERE condition";
			SQLQuery createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlQuery);
			billId = ((Integer) createSQLQuery.uniqueResult()).intValue();
			if (billId != 0 || billId != null) {
				BillMasterDto billMasterDto = (BillMasterDto) sessionFactory.getCurrentSession()
						.get(BillMasterDto.class, billId);

				billMasterDto.setBillOutstandingRemark(remark);
				billMasterDto.setBillOutstandingReason(outStandingReson);
				sessionFactory.getCurrentSession().merge(billMasterDto);
				return 1;

			}
			else {
				return 0;
			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return 0;
	}

	
	
	//added by vishant to distribute service wise amount in bill details ipd table
			public int setOpdBillDetails(int treatmentId, double refunfForReflcn, String callFrom, Session session) {
				double mastTotAmt = 0, mastTotConcn = 0, mastConcnPer = 0, mastTotDisc = 0, mastDiscPer = 0,
						mastTotPaid = 0, mastPaidPer = 0, mastTotRefund = 0, mastRefPer = 0;
				double slaveTotAmt = 0, slaveTotConcn = 0, slavePayable = 0, slaveTotDisc = 0, slaveTotPaid = 0,
						slaveTotRef = 0, slavePaidPer = 0;

				
				
				Integer chragesSlaveId=0;
				Integer deptId=0;
				String sql = "select charges_slave_id,department_id from ehat_treatment where treatment_id =" + treatmentId;
				Query mastQuery = session.createSQLQuery(sql);
				mastQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> listRecMast = mastQuery.list();
				for (Map<String, Object> row : listRecMast) {

					chragesSlaveId = (Integer) row.get("charges_slave_id");
					deptId = (Integer) row.get("department_id");
					
				}
				
				FinanceReportAmtDto fobj = getTotalAmtsForDistributeNew(treatmentId, deptId, chragesSlaveId,session);
				mastTotAmt = fobj.getTotalAMt();
				mastTotDisc = fobj.getTotalDiscountAMt();
				mastTotConcn = fobj.getTotalConAMt();
				mastTotPaid = fobj.getTotalPaidAMt();
				// mastTotRemain=(Double)row.get("total_remain");
				mastTotRefund = fobj.getTotalRefundAMt();
				
				Double totalNetAmount= mastTotAmt-(mastTotConcn+mastTotDisc);
				if(mastTotPaid>totalNetAmount) {
					mastTotPaid=totalNetAmount;
				}
				//Double totalAmtPaid= mastTotAmt-mastTotRefund;
				//Double totalNetAmt = mastTotAmt - (mastTotConcn);

				if(mastTotAmt  >0) {
				mastConcnPer = (mastTotConcn * 100) / mastTotAmt;
				mastDiscPer = (mastTotDisc * 100) / mastTotAmt;
				}
				
				if(totalNetAmount  > 0)
			    	mastPaidPer = (mastTotPaid * 100) / totalNetAmount;
				
				if(mastTotPaid > 0)
				mastRefPer = ((refunfForReflcn) * 100) / mastTotPaid;

				//Get pkg slave receipt totals
				sql = "select * from ehat_bill_details where deleted='N' and treatment_id=" + treatmentId
						+ " and cancle='N' ";
				Query slaveQuery = session.createSQLQuery(sql);
				slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> listRecSlave = slaveQuery.list();
				for (Map<String, Object> row : listRecSlave) {

					int sponsorId = (Integer) row.get("charges_slave_id");
					int detailsId = (Integer) row.get("bill_details_id");
//					double otherAmount=0.00;
					double amount=0.00;
					double servNetamount=0.00;
					double servConamount=0.00;
					if (sponsorId > 0) {

						slaveTotAmt = (Double) row.get("other_pay");
						amount = (Double) row.get("other_amount");
						servConamount = (Double) row.get("other_concession");

					} else {

						slaveTotAmt = (Double) row.get("co_pay");
						amount = (Double) row.get("amount");
						servConamount = (Double) row.get("concession");
					}

					slaveTotConcn = (slaveTotAmt * mastConcnPer) / 100;
					slavePayable = slaveTotAmt;
					slaveTotDisc = (amount * mastDiscPer) / 100;
					
					servNetamount = amount - (servConamount + slaveTotDisc);
					
					slaveTotPaid = (servNetamount * mastPaidPer) / 100;
//					slaveTotPaid = (slaveTotAmt / totalNetAmt);
//					double finalDistributePaid= slaveTotPaid*mastTotPaid;
					slaveTotRef = (slaveTotPaid * mastRefPer) / 100;

//					if (callFrom.equals("refund")) {
	//
//						sql = "update ehat_bill_details_ipd set discount_per=" + mastDiscPer + ",discount=" + slaveTotDisc
//								+ ",refund_per=" + mastRefPer + ",refund=" + slaveTotRef + " ,paid_amt=" + slaveTotPaid
//								+ " ,paid_per=" + mastPaidPer + " " + " where bill_details_id = " + detailsId;
//					} else {

						sql = "update ehat_bill_details set discount_per=" + mastDiscPer + ",discount=" + slaveTotDisc
								+ " ,paid_amt=" + slaveTotPaid + " ,paid_per=" + mastPaidPer + " "
								+ " where bill_details_id = " + detailsId;
//					}

					Query recSlaveQuery2 = session.createSQLQuery(sql);
					recSlaveQuery2.executeUpdate();

					int servId = (Integer) row.get("service_id");
					sql = "select ifnull(iscombination,'N') from ehat_service_master where deleted = 'N' and service_id = "
							+ servId;
					Query billDetailsQuery = session.createSQLQuery(sql);
					String isCombine = (String) billDetailsQuery.uniqueResult();

					if (isCombine.equals("Y")) {

						slavePaidPer = (slaveTotPaid * 100) / slaveTotAmt;
						setOpdPkgMasterSlave(servId, servId, detailsId, session, sponsorId);
//						setOpdPkgMasterSlaveNew(servId, detailsId, session, "r", slavePaidPer, sponsorId,slaveTotDisc,slavePayable);
					}
				}
				return 1;
			}
			
			//added by vishant
			public int setOpdPkgMasterSlave(int servId, int billDetailsId, Session session, String callFrom,
					double mastPaidPer, int spId,double totalServiceDiscount, double slavePayable2) {

				double mastConsnPer = 0, mastDiscPer = 0, mastRefPer = 0;
				double slaveTotAmt = 0, slaveTotConsn = 0, slavePayable = 0, slaveTotPaid = 0, slaveTotDisc = 0,
						slaveTotRef = 0;

				// Get slave receipt totals
				String sql = "select * from ehat_bill_details where service_id=" + servId + " and bill_details_id="
						+ billDetailsId;
				Query mastQuery = session.createSQLQuery(sql);
				mastQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> listRecMast = mastQuery.list();
				for (Map<String, Object> row : listRecMast) {

					mastConsnPer = (Double) row.get("concession_per");
					mastDiscPer = (Double) row.get("discount_per");
					mastRefPer = (Double) row.get("refund_per");
				}

				// Get pkg slave receipt totals
				sql = "select * from ehat_other_bill_detail_for_opd where deleted='N' and bill_details_id=" + billDetailsId;
				Query slaveQuery = session.createSQLQuery(sql);
				slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> listRecSlave = slaveQuery.list();
				for (Map<String, Object> row : listRecSlave) {

					// int sponsorId=(Integer)row.get("chargesSlave_id");
					int pkgSlaveId = (Integer) row.get("other_bill_details_id_for_Opd");

					if (spId > 0) {

						slaveTotAmt = (Double) row.get("other_amount");
						slaveTotConsn = (Double) row.get("other_concession");

					} else {

						slaveTotAmt = (Double) row.get("amount");
						slaveTotConsn = (Double) row.get("concession");
					}

					
					  slaveTotConsn=(slaveTotAmt*mastConsnPer)/100; 
					  slavePayable=slaveTotAmt -slaveTotConsn; 
//					  slaveTotDisc=(slavePayable*mastDiscPer)/100;
					 
					double totalAmount = slaveTotAmt;
					
					mastDiscPer = (totalServiceDiscount * 100) / slavePayable2;
					
					slaveTotPaid = (slaveTotAmt * mastPaidPer) / 100;
					slaveTotDisc=(totalAmount*mastDiscPer)/100;

					if (spId > 0) {

//						if (callFrom.equals("refund")) {
	//
//							sql = "update ehat_other_bill_detail_for_ipd set " + "sponsor_paid_per=" + mastPaidPer
//									+ ",sponsor_paid=" + slaveTotPaid
//									// +",discount_per="+mastDiscPer+",discount="+slaveTotDisc+",refund_per="+mastRefPer+",refund="+slaveTotRef+"
//									// "
////				            				 + " ,paid_other_amt=" + slaveTotPaid + " ,paid_other_per=" + mastPaidPer + " "
//									+ " where other_bill_details_id_for_ipd = " + pkgSlaveId;
//						} else {

							sql = "update ehat_other_bill_detail_for_opd set concession_in_Perc=" + mastConsnPer
									+ ",other_concession=" + slaveTotConsn + ",discount_per=" + mastDiscPer + ",discount="
									+ slaveTotDisc + ",refund_per=" + mastRefPer + ",refund=" + slaveTotRef + " "
									+ " ,paid_other_amt=" + slaveTotPaid + " ,paid_other_per=" + mastPaidPer + " "
									+ " where other_bill_details_id_for_Opd = " + pkgSlaveId;
//						}

					} else {

//						if (callFrom.equals("refund")) {
	//
//							sql = "update ehat_other_bill_detail_for_ipd set " + "sponsor_paid_per=" + mastPaidPer
//									+ ",sponsor_paid=" + slaveTotPaid
//									// +",discount_per="+mastDiscPer+",discount="+slaveTotDisc+",refund_per="+mastRefPer+",refund="+slaveTotRef+"
//									// "
////				            				 + " ,paid_other_amt=" + slaveTotPaid + " ,paid_other_per=" + mastPaidPer + " "
//									+ " where other_bill_details_id_for_ipd = " + pkgSlaveId;
//						} else {

							sql = "update ehat_other_bill_detail_for_opd set concession_in_Perc=" + mastConsnPer
									+ ",concession=" + slaveTotConsn + ",discount_per=" + mastDiscPer + ",discount="
									+ slaveTotDisc + ",refund_per=" + mastRefPer + ",refund=" + slaveTotRef + " "
									+ " ,paid_other_amt=" + slaveTotPaid + " ,paid_other_per=" + mastPaidPer + " "
									+ " where other_bill_details_id_for_Opd = " + pkgSlaveId;
//						}

					}

					Query recSlaveQuery2 = session.createSQLQuery(sql);
					recSlaveQuery2.executeUpdate();
				}
				return 1;
			}		
			
	
	public FinanceReportAmtDto getTotalAmtsForDistribute(Integer treatmentId, Integer departmentId, Integer sponsorId) {

		FinanceReportAmtDto obj = new FinanceReportAmtDto();

		String sqlAMt = " select  fn_get_rpt_total_bill_amt(" + treatmentId + "," + departmentId + "," + sponsorId
				+ ") as totalBillAMt ";
		double totalAMt = (double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();

		sqlAMt = " select  fn_get_rpt_total_discount_amt(" + treatmentId + "," + departmentId
				+ ") as totalDiscountAmt ";
		double totalDiscountAMt = (double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();

		sqlAMt = " select  fn_get_sponsor_total_paid_amt_new(" + treatmentId + "," + departmentId + "," + sponsorId
				+ ") as totalPaidAmt ";
		double totalPaidAMt = (double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();

		sqlAMt = " select  fn_get_rpt_total_concession_amt(" + treatmentId + "," + departmentId + "," + sponsorId
				+ ") as totalConAmt ";
		double totalConAMt = (double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();

		sqlAMt = " select  fn_get_rpt_total_refund_amt(" + treatmentId + "," + departmentId + ") as totalRefundAmt ";
		double totalRefundAMt = (double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();

		obj.setTotalAMt(totalAMt);
		obj.setTotalDiscountAMt(totalDiscountAMt);
		obj.setTotalPaidAMt(totalPaidAMt);
		obj.setTotalConAMt(totalConAMt);
		obj.setTotalRefundAMt(totalRefundAMt);

		return obj;

	}
	
	@Override
	public Integer setOpdBillDetailsDistribute(Integer treatId, HttpServletRequest request) {
		
		int bill_receipt_id=0,against_id=0;
		Session session = sessionFactory.openSession();
	try {
//		Session session = sessionFactory.openSession(); // create session object from the session factory
		session.beginTransaction(); // initialize the transaction object from session
//		Session session = sessionFactory.getCurrentSession();
		String sql="select * from ehat_receipt_master where deleted='N' and against_id=0 and treatment_id="+treatId;
        Query recQuery = session.createSQLQuery(sql);
        recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> listRec = recQuery.list();
        if(listRec.size()>0) {
        for(Map<String, Object> row : listRec){
           
        	bill_receipt_id=(Integer)row.get("bill_receipt_id");
        	against_id=(Integer)row.get("against_id");
              
            
            int setOpdRecMasterSlave = setOpdRecMasterSlave(bill_receipt_id,against_id,"",session);
            
            
            //return setOpdRecMasterSlave;
        }
        }else {
        	
        	//int setOpdBillDetails = setOpdBillDetails(treatId, 0, "r", session);
        	//return setOpdBillDetails;
        }
        
        
        
        
        session.getTransaction().commit(); // commit the transaction
		session.close();
	}catch (Exception e) {
		e.printStackTrace();
		session.getTransaction().rollback();
	}
		// TODO Auto-generated method stub
		return null;
	}
	

	@Override
	public Integer setBulkSettleDistributeOnload(Integer treatId, HttpServletRequest request) {
		int bill_receipt_id = 0, against_id = 0;
		BulkSettlementSlaveDTO objBulkSlave = new BulkSettlementSlaveDTO();
		Session session = sessionFactory.openSession();
		try {
			
			session.beginTransaction(); // initialize the transaction object from session
			
			List<BulkSettlementSlaveDTO> bulkSettlementSlaveDTOs = session.createCriteria(BulkSettlementSlaveDTO.class)
			.add(Restrictions.eq("deleted", "N"))
			.add(Restrictions.eq("treatmentId", treatId))
			.list();
			
			if(bulkSettlementSlaveDTOs.size()>0) {
				
				objBulkSlave.setListBulkSettlementSlave(bulkSettlementSlaveDTOs);
				setBulkAmountDistributeOnLoad(objBulkSlave,session);
			}
				
			

			
			 session.getTransaction().commit(); // commit the transaction
				session.close();
			}catch (Exception e) {
				e.printStackTrace();
				session.getTransaction().rollback();
			}
		// TODO Auto-generated method stub
		return 1;
	}
	
	public FinanceReportAmtDto getTotalAmtsForDistributeNew(Integer treatmentId, Integer departmentId, Integer sponsorId,Session session) {

		FinanceReportAmtDto obj = new FinanceReportAmtDto();

		String sqlAMt = " select  fn_get_rpt_total_bill_amt(" + treatmentId + "," + departmentId + "," + sponsorId
				+ ") as totalBillAMt ";
		double totalAMt = (double) session.createSQLQuery(sqlAMt).uniqueResult();

		sqlAMt = " select  fn_get_rpt_total_discount_amt(" + treatmentId + "," + departmentId
				+ ") as totalDiscountAmt ";
		double totalDiscountAMt = (double) session.createSQLQuery(sqlAMt).uniqueResult();

		sqlAMt = " select  fn_get_sponsor_total_paid_amt_new(" + treatmentId + "," + departmentId + "," + sponsorId
				+ ") as totalPaidAmt ";
		double totalPaidAMt = (double) session.createSQLQuery(sqlAMt).uniqueResult();

		sqlAMt = " select  fn_get_rpt_total_concession_amt(" + treatmentId + "," + departmentId + "," + sponsorId
				+ ") as totalConAmt ";
		double totalConAMt = (double) session.createSQLQuery(sqlAMt).uniqueResult();

		sqlAMt = " select  fn_get_rpt_total_refund_amt(" + treatmentId + "," + departmentId + ") as totalRefundAmt ";
		double totalRefundAMt = (double) session.createSQLQuery(sqlAMt).uniqueResult();

		obj.setTotalAMt(totalAMt);
		obj.setTotalDiscountAMt(totalDiscountAMt);
		obj.setTotalPaidAMt(totalPaidAMt);
		obj.setTotalConAMt(totalConAMt);
		obj.setTotalRefundAMt(totalRefundAMt);

		return obj;

	}
	
	
	//added by vishant for distribute bulk setlment amount nd discount
	private void setBulkAmountDistributeOnLoad(BulkSettlementSlaveDTO objBulkSlave, Session session) {

		// double paidAmt = 0.0;
//				double remainAmt = bulk.getRemainAmt();
		try {
			List<BulkSettlementSlaveDTO> listBulkSettlementSlave = objBulkSlave.getListBulkSettlementSlave();
			if (listBulkSettlementSlave.size() > 0) {

				for (BulkSettlementSlaveDTO bulk : listBulkSettlementSlave) {

					Integer treatmentId = bulk.getTreatmentId();
					Double paidAmt = 0.0;
					Double concessionAmt = 0.0;
					Double tdsAmt = 0.0;
					String sql = "select IFNULL(SUM(paid_amt),0) as paid_amt,IFNULL(SUM(concession),0) as concession,IFNULL(SUM(tds_amt),0) as tds_amt from ehat_bulk_settlement_slave where treatment_id ="
							+ treatmentId;
					Query mastQuery = session.createSQLQuery(sql);
					mastQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")
					List<Map<String, Double>> listRecMast = mastQuery.list();
					for (Map<String, Double> row : listRecMast) {

						paidAmt = (Double) row.get("paid_amt");
						concessionAmt = (Double) row.get("concession");
						tdsAmt = (Double) row.get("tds_amt");

					}

					if (paidAmt == 0.0) {
						paidAmt = bulk.getPaidAmt();
						concessionAmt = bulk.getConcession();
						tdsAmt = bulk.getTdsAmt();

					}

					if (bulk.getDepartmentId() == 1 || bulk.getDepartmentId() == 3) {
						double mastPaidPer = 0.0;
						double slaveTotPaid = 0.0;

						double mastConPer = 0.0;
						double slaveTotCon = 0.0;
						double servNetamount = 0.0;
						double concessionAmtPaid = 0.0;
						double slaveTotAmt = 0.0;

						paidAmt = paidAmt + (concessionAmt + tdsAmt);
						// double paidAmt = bulk.getPaidAmt();

						String hql = "SELECT * FROM ehat_bill_details where deleted='N' and cancle='N' and (case when charges_slave_id=0 then (amount+concession)<>(paid_amt+discount) else "
								+ " (other_amount+other_concession)<>(paid_amt+discount) end) and treatment_id ="
								+ treatmentId;
						Query mastQuery2 = session.createSQLQuery(hql);
						mastQuery2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						@SuppressWarnings("unchecked")
						List<Map<String, Object>> listRecMastDb = mastQuery2.list();
						for (Map<String, Object> row : listRecMastDb) {

							int sponsorId = (Integer) row.get("charges_slave_id");
							int detailsId = (Integer) row.get("bill_details_id");
//								double otherAmount=0.00;
							double amount = 0.00;
							double discount = 0.0;
							double paid_amt = 0;
							// double servNetamount=0.00;
							double servConamount = 0.00;
							if (sponsorId > 0) {

								slaveTotAmt = (Double) row.get("other_pay");
								discount = (Double) row.get("discount");
								amount = (Double) row.get("other_amount");
								servConamount = (Double) row.get("other_concession");
								paid_amt = (Double) row.get("paid_amt");

							} else {

								discount = (Double) row.get("discount");
								slaveTotAmt = (Double) row.get("co_pay");
								amount = (Double) row.get("amount");
								servConamount = (Double) row.get("concession");
								paid_amt = (Double) row.get("paid_amt");
							}

							servNetamount = amount - (servConamount + discount);
							double totalAmt = servNetamount;

							Integer bill_details_id = (Integer) row.get("bill_details_id");
//								Integer bill_receipt_master_id = (Integer)row.get("bill_receipt_master_id");

							servNetamount = amount - (servConamount + discount);
							// servNetamount = servNetamount;
							
							double servNetamount2 = servNetamount - paid_amt;
							mastPaidPer = (servNetamount2 / paidAmt) * 100;
							slaveTotPaid = (mastPaidPer / 100) * paidAmt;

//							mastPaidPer = (servNetamount * 100) / p;
//
//							slaveTotPaid = (mastPaidPer * servNetamount) / 100;


							String billDetails = "update ehat_bill_details set sponsor_paid=" + slaveTotPaid
									+ "  , sponsor_paid_per=" + mastPaidPer
									// +", sponsor_con_per="+mastConPer+" ,sponsor_con="+slaveTotCon
									+ " where deleted='N' and cancle='N' and bill_details_id=" + bill_details_id;
							SQLQuery billDetailsQuery = session.createSQLQuery(billDetails);
							billDetailsQuery.executeUpdate();

							int servId = (Integer) row.get("service_id");
							sql = "select ifnull(iscombination,'N') from ehat_service_master where deleted = 'N' and service_id = "
									+ servId;
							Query billDetailsQuery2 = session.createSQLQuery(sql);
							String isCombine = (String) billDetailsQuery2.uniqueResult();

							if (isCombine.equals("Y")) {

								// slavePaidPer = (slaveTotPaid * 100) / servNetamount;
								setOpdPkgMasterSlaveNewForBulk(servId, bill_details_id, session, " ", slaveTotPaid,
										sponsorId, mastPaidPer, servNetamount);
							}
						}

					} else {

						double mastPaidPer = 0.0;
						double slaveTotPaid = 0.0;
						double servNetamount = 0.0;
						double slaveTotAmt = 0.0;
						// double paidAmt = bulk.getPaidAmt();
						paidAmt = paidAmt + (concessionAmt + tdsAmt);

						String hql = "SELECT * FROM ehat_bill_details_ipd where deleted='N' and cancle='N' "
								+ " and paid_per!=100 and case when charges_slave_id=0 then amount!=0 else other_amount!=0 end "
								+ "and treatment_id =" + bulk.getTreatmentId();
						Query mastQuery2 = session.createSQLQuery(hql);
						mastQuery2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						@SuppressWarnings("unchecked")
						List<Map<String, Object>> listRecMastDb = mastQuery2.list();
						for (Map<String, Object> row : listRecMastDb) {

							int sponsorId = (Integer) row.get("charges_slave_id");
							int detailsId = (Integer) row.get("bill_details_id");
//								double otherAmount=0.00;
							double amount = 0.00;
							double servNetamountIpd = 0.0;
							double servConamount = 0.0;
							double discount = 0.0;
							double slavePaidPer = 0.0;
							double paidAmtDistribute = 0.0;
							if (sponsorId > 0) {

								paidAmtDistribute = (Double) row.get("paid_amt");
								amount = (Double) row.get("other_amount");
								servConamount = (Double) row.get("other_concession");
								discount = (Double) row.get("discount");

							} else {

								paidAmtDistribute = (Double) row.get("paid_amt");
								amount = (Double) row.get("amount");
								servConamount = (Double) row.get("concession");
								discount = (Double) row.get("discount");
							}

							double totalAmt = amount - (servConamount + discount);
							servNetamount = amount - (servConamount + discount);
							
							double servNetamount2 = servNetamount - paidAmtDistribute;
							mastPaidPer = (servNetamount2 / paidAmt) * 100;
							slaveTotPaid = (mastPaidPer / 100) * paidAmt;

							sql = "update ehat_bill_details_ipd set sponsor_paid_per=" + mastPaidPer + ",sponsor_paid="
									+ slaveTotPaid

									+ " where bill_details_id = " + detailsId;

							Query recSlaveQuery2 = session.createSQLQuery(sql);
							recSlaveQuery2.executeUpdate();

							int servId = (Integer) row.get("service_id");
							sql = "select ifnull(iscombination,'N') from ehat_service_master where deleted = 'N' and service_id = "
									+ servId;
							Query billDetailsQuery = session.createSQLQuery(sql);
							String isCombine = (String) billDetailsQuery.uniqueResult();

							if (isCombine.equals("Y")) {

								slavePaidPer = (slaveTotPaid / paidAmt) * 100;
								setIpdPkgMasterSlaveNewForBulk(servId, detailsId, session, "r", slaveTotPaid,
										sponsorId, slavePaidPer, totalAmt);
								// setIpdPkgMasterSlaveNewForBulk(servId, detailsId, session, "refund",
								// slaveTotPaid, sponsorId, slavePaidPer, totalAmt);
								// setIpdPkgMasterSlave(servId, detailsId, session, "refund", slavePaidPer,
								// sponsorId);
							}
						}

					}

				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	public int saveRefundBillDetailsNew(String servIdsChecked, Integer refDocId,
			BillReceiptMasterDTO billReceiptMaster) {
		Integer maxReceiptId = 0;
		Integer result = 0;
		int againstId = billReceiptMaster.getAgainstId();
		Session session = sessionFactory.openSession(); // create session object from the session factory
		session.beginTransaction(); // initialize the transaction object from session

		String sqlBill = "select department_id FROM ehat_treatment where treatment_id="
				+ billReceiptMaster.getTreatmentId();
		Query deptQuery = session.createSQLQuery(sqlBill);
		Integer deptId = (Integer) deptQuery.uniqueResult();

		int curRecId = getCurrentRecId("ehat_refund_master", session, deptId);
		try {

			int billId = 0, patientId = 0, departId = 0, sourceTypeId = 0;

			/*
			 * ArrayList<Integer> masterChecked=new ArrayList<Integer>(); String[] servIds;
			 * 
			 * // get checked service masters if(servIdsChecked.length()>0){
			 * 
			 * servIds=servIdsChecked.split(","); for(String id:servIds){
			 * 
			 * masterChecked.add(Integer.parseInt(id)); } }
			 */

			Criteria criteriaRec = session.createCriteria(BillReceiptMasterDTO.class);
			criteriaRec.add(Restrictions.eq("billReceiptId", billReceiptMaster.getAgainstId()));
			criteriaRec.setProjection(Projections.rowCount());
			long count = (Long) criteriaRec.uniqueResult();
			BillRefundMasterDTO billRefundMaster = new BillRefundMasterDTO();

			if (count > 0) {

				double totalPaid = 0, recPaid = 0, recRefund = 0, totalPayable = 0, recPayable = 0,totalRefund=0;
				Criteria criteriaAllDetails = session.createCriteria(BillReceiptMasterDTO.class);
				criteriaAllDetails.add(Restrictions.eq("billReceiptId", billReceiptMaster.getAgainstId()));
//				criteriaAllDetails.add(Restrictions.eq("treatmentId", billReceiptMaster.getTreatmentId()));
				criteriaAllDetails.add(Restrictions.eq("deleted", "N"));
				List<BillReceiptMasterDTO> listAllDetails = (List<BillReceiptMasterDTO>) criteriaAllDetails.list();
				for (BillReceiptMasterDTO obj : listAllDetails) {

					billId = obj.getBillId();
					departId = obj.getDepartmentId();
					patientId = obj.getPatientId();
					int recId = obj.getReceiptCount();

					// Total paid & refund for overall
					totalPaid = totalPaid + obj.getTotalPaid();

					
					  if(obj.getRefundFlag().equals("Y")){
					  
					  totalRefund=totalRefund+obj.getRefundAmt(); 
					 }
					  
					  totalPayable=totalPaid-totalRefund;
					  // Overall payable

					if (againstId == recId) {

						recPaid = recPaid + obj.getTotalPaid();
					}

					if (againstId == recId && obj.getRefundFlag().equals("Y")) {

						recRefund = recRefund + obj.getRefundAmt();
					}

					recPayable = recPaid - recRefund; // receipt wise payable
				}

				Criteria criteriaRef = session.createCriteria(BillRefundMasterDTO.class);
				criteriaRef.add(Restrictions.eq("treatmentId", billReceiptMaster.getTreatmentId()));
				criteriaRef.add(Restrictions.eq("deleted", "N"));
				criteriaRef.setProjection(Projections.rowCount());
				long countRef = (Long) criteriaRef.uniqueResult();

				if (countRef > 0) {

					Criteria criteriaSum = session.createCriteria(BillRefundMasterDTO.class);
					criteriaSum.add(Restrictions.eq("treatmentId", billReceiptMaster.getTreatmentId()));
					criteriaSum.add(Restrictions.eq("deleted", "N"));
					criteriaSum.setProjection(Projections.sum("totalPaid"));
					double sumOfRefund = (Double) criteriaSum.uniqueResult();
					totalPayable = totalPaid - sumOfRefund;
				} else {

					totalPayable = totalPaid - 0;
				}

				// Total paid & refund for receipt wise
				if (billReceiptMaster.getAgainstId() != 0) {

					// if(billRecMaster.getTotalPaid()<=totalPayable &&
					// billRecMaster.getTotalPaid()<=recPayable){

					// Update receipt master
					/*
					 * BillReceiptMasterDTO objectToUpdate = (BillReceiptMasterDTO)
					 * session.get(BillReceiptMasterDTO.class, againstId);
					 * objectToUpdate.setRefundFlag("Y");
					 * objectToUpdate.setRefundAmt(recRefund+billRecMaster.getTotalPaid());
					 * objectToUpdate.setReduction(billRecMaster.getTotalAmt()-billRecMaster.
					 * getTotalPaid());
					 * objectToUpdate.setActualRefAmt(recRefund+billRecMaster.getTotalPaid());
					 */
					// objectToUpdate.setActualRefPer(billRecMaster.getActualRefPer());

					String sql = "update ehat_receipt_master set refund_flag='Y',refund_amt="
							+ (totalRefund + billReceiptMaster.getTotalPaid()) + ",reduction="
							+ (billReceiptMaster.getTotalAmt() - billReceiptMaster.getTotalPaid()) + ",actual_ref_amt="
							+ (totalRefund + billReceiptMaster.getTotalPaid()) + " where bill_receipt_id = " + againstId;
					Query recMastQuery = session.createSQLQuery(sql);
					recMastQuery.executeUpdate();

					// Make entry in refund master
					billRefundMaster.setRefundCount(curRecId);
					billRefundMaster.setUnitId(billReceiptMaster.getUnitId());
					billRefundMaster.setTreatmentId(billReceiptMaster.getTreatmentId());
					billRefundMaster.setPatientId(patientId);
					billRefundMaster.setBillId(billId);
					billRefundMaster.setDepartmentId(departId);
					billRefundMaster.setReceiptOf(billReceiptMaster.getReceiptOf());
					billRefundMaster.setCreatedBy(billReceiptMaster.getCreatedBy());
					billRefundMaster.setCreatedDateTime(new Date());
					billRefundMaster.setSourceTypeId(sourceTypeId);

					billRefundMaster.setPayeeTypeId(billReceiptMaster.getPayeeTypeId());
					billRefundMaster.setPayeeMainId(billReceiptMaster.getPayeeMainId());
					billRefundMaster.setPayeeLeafId(billReceiptMaster.getPayeeLeafId());

					billRefundMaster.setDeleted("N");
					billRefundMaster.setRefundFlag("Y");
					billRefundMaster.setPayMode(billReceiptMaster.getPayMode());
					billRefundMaster.setbNumber(billReceiptMaster.getbNumber());
					billRefundMaster.setBatchNumber(billReceiptMaster.getBatchNumber());
					billRefundMaster.setbName(billReceiptMaster.getbName());
					billRefundMaster.setTotalAmt(billReceiptMaster.getTotalAmt());
					billRefundMaster.setTotalDisc(billReceiptMaster.getTotalDisc());
					billRefundMaster.setTotalQty(1);
					billRefundMaster.setTotalPaid(billReceiptMaster.getTotalPaid());// payable
					billRefundMaster.setTotalRemain(billReceiptMaster.getTotalAmt()
							- (billReceiptMaster.getTotalPaid() + billReceiptMaster.getTotalDisc()));

					String sqlBillId = "select receipt_count FROM ehat_receipt_master where bill_receipt_id="
							+ billReceiptMaster.getAgainstId();
					Query billQuery = session.createSQLQuery(sqlBillId);
					Integer agaistRecCount = (Integer) billQuery.uniqueResult();

					/*
					 * Criteria criteria = session.createCriteria(BillReceiptMasterDTO.class);
					 * criteria.add(Restrictions.eq("billReceiptId", billRecMaster.getAgainstId()));
					 * int agaistRecCount = (Integer) criteria.uniqueResult();
					 */

					billRefundMaster.setAgainstId(agaistRecCount);

					billRefundMaster.setRefGivenBy(billReceiptMaster.getRefGivenBy());
					billRefundMaster.setRefRemark(billReceiptMaster.getRefRemark());

					// Save Refund Master list
					session.merge(billRefundMaster);

					// Get max master id
					Criteria criteriaMax = session.createCriteria(BillRefundMasterDTO.class)
							.setProjection(Projections.max("billRefundId"));
					result = (Integer) criteriaMax.uniqueResult();
					if (result == null) {

						result = -3;
					}

					ArrayList<Integer> slaveChecked = new ArrayList<Integer>();
					String[] servIds;

					// get checked service slaves
					if (servIdsChecked.length() > 0) {

						servIds = servIdsChecked.split(",");
						for (String id : servIds) {

							slaveChecked.add(Integer.parseInt(id));
						}
					}

					Criteria criteriaSlaveDetails = session.createCriteria(BillReceiptSlaveDTO.class);
					criteriaSlaveDetails.add(Restrictions.in("billDetailsId", slaveChecked));
					criteriaSlaveDetails.add(Restrictions.eq("deleted", "N"));
					List<BillReceiptSlaveDTO> listSlaveDetails = (List<BillReceiptSlaveDTO>) criteriaSlaveDetails
							.list();
					for (BillReceiptSlaveDTO billSlave : listSlaveDetails) {

						// below query to update the ehat_bill_details table when we refund
						// service(consultation charges) to patient that time that record will get
						// removed from doctor desk tab
						// added by Rohit on 02-02-2021
						
					try {	
						String sqlBillSlave = "update ehat_bill_details set refund_flag='Y',updated_by="
								+ billReceiptMaster.getCreatedBy() 
								+" ,refund_amt="+billSlave.getActualFinalPaid()+" ,refund_per=100"
								+ ",updated_date_time=now() where bill_details_id = "
								+ billSlave.getBillDetailsId();
						Query billSlaveQuery = session.createSQLQuery(sqlBillSlave);
						billSlaveQuery.executeUpdate();
						
						
						//update package refund added by vishant
						int servId = billSlave.getServiceId();
						sql = "select ifnull(iscombination,'N') from ehat_service_master where deleted = 'N' and service_id = "
								+ servId;
						Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						String isCombine = (String) billDetailsQuery.uniqueResult();

						if (isCombine.equals("Y")) {

							setOpdPkgMasterSlaveFoRefund(servId, billSlave.getBillDetailsId());
						}
						
					}catch (Exception e) {
						e.printStackTrace();
					}	

						// below query to update the LIS current records details table when we refund
						// service to patient that time that record will get removed from current record
						// tab
						String sqllabrequestslave = "update ehat_lab_request_slave set refund_flag='Y',updated_by="
								+ billReceiptMaster.getCreatedBy() + ",updated_date_time=now() where bill_details_id = "
								+ billSlave.getBillDetailsId();
						Query labrequestslaveQuery = session.createSQLQuery(sqllabrequestslave);
						labrequestslaveQuery.executeUpdate();

						// added by ajay:5-feb-2021:-below query to update the LIS process area records
						// details table when we refund service to patient that time that record will
						// get removed from process area records details tab

						Integer subserviceid = 0;
						Integer labrequestId = 0;
						String sql1 = " SELECT ep.sub_service_id,ep.lab_request_id FROM ehat_lab_request_slave ep WHERE ep.bill_details_id="
								+ billSlave.getBillDetailsId();
						SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
						;
						query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> listId = query1.list();
						for (Map<String, Object> rs : listId) {
							subserviceid = (Integer) rs.get("sub_service_id");
							labrequestId = (Integer) rs.get("lab_request_id");
						}
						
					

						String sql3 = " SELECT ep.id FROM  pathology_labprofile ep WHERE ep.subservice_id="
								+ subserviceid;
						SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
						Integer profileId = (Integer) query3.uniqueResult();

//						String hql1 = "UPDATE LabPhlebotomyMasterSalveTest set RefundSample='Y' where labrequestId="
//								+ labrequestId + " and profileId=" + profileId + "";
//						Query sampleTest = sessionFactory.getCurrentSession().createQuery(hql1);
//						sampleTest.executeUpdate();

						// added by Rohit on 23-06-2021 to set refund status under outsource table
//						String hqlOutSourceQuery = "UPDATE SendToOutSourceDto set refundStatus='Y' where labrequestId="
//								+ labrequestId + "";
//						Query sampleTestOutSourceRefund = sessionFactory.getCurrentSession()
//								.createQuery(hqlOutSourceQuery);
//						System.out.println("hqlOutSourceQuery::" + hqlOutSourceQuery);
//						sampleTestOutSourceRefund.executeUpdate();

						// below query to update the RIS records details table when we refund service to
						// patient that time that record will get removed from record tab
						// added by Rohit on 21-01-2021
						String sqlRisRequestSlave = "update radiology_assign_test set ris_refund = 'Y' where bill_details_id = "
								+ billSlave.getBillDetailsId();
						Query sqlRis = session.createSQLQuery(sqlRisRequestSlave);
						sqlRis.executeUpdate();

						/*
						 * String sqlDoctorDeskQuery =
						 * "update ehat_bill_details set r_flag = 'Y' where bill_details_id = "
						 * +billSlave.getBillDetailsId(); Query sqlDoctorDesk =
						 * session.createSQLQuery(sqlDoctorDeskQuery); sqlDoctorDesk.executeUpdate();
						 */

						if (billSlave.getDepartmentId() == 1) {
							int treatId = billSlave.getTreatmentId();
							sql = "select ifnull(doctor_id,'0') as doctor_id from ehat_treatment where treatment_id="
									+ treatId;
							Query docIdList = sessionFactory.getCurrentSession().createSQLQuery(sql);
							String docIdListStr = (String) docIdList.uniqueResult();
							if (!docIdListStr.isEmpty()) {
								String docIdListStrNew = "";
								String[] ary = docIdListStr.split(",");
								for (int i = 0; i < ary.length; i++) {
									if (Integer.parseInt(ary[i]) != billSlave.getDoctorId()) {
										docIdListStrNew = docIdListStrNew + ary[i] + ",";
										/*
										 * if(docIdListStrNew == ""){
										 * 
										 * docIdListStrNew = null; }
										 */

									}
								}

								if (docIdListStrNew != "") {
									sql = "UPDATE ehat_treatment set doctor_id ='"
											+ docIdListStrNew.substring(0, docIdListStrNew.length() - 1)
											+ "' WHERE treatment_id =" + treatId;
								} else {
									sql = "UPDATE ehat_treatment set doctor_id ='' WHERE treatment_id =" + treatId;
								}
								// System.out.println("sql remove doctor::"+sql);
								Query queryTreat = sessionFactory.getCurrentSession().createSQLQuery(sql);
								queryTreat.executeUpdate();
							}
						}

						// refund_amt="+(billSlave.getPaid())+"
						// actual_ref_amt="+(billSlave.getPaid())+"
						String sqlSlave = "update ehat_receipt_slave set refund_flag='Y',refund_amt="
								+ (billSlave.getActualFinalPaid()) + ",actual_ref_amt="
								+ (billSlave.getActualFinalPaid()) + ",actual_ref_per=100,updated_by="
								+ billReceiptMaster.getCreatedBy() + ",updated_date_time=now() where bill_details_id = "
								+ billSlave.getBillDetailsId();
						Query recSlaveQuery = session.createSQLQuery(sqlSlave);
						recSlaveQuery.executeUpdate();
						
						
						

						/*
						 * String billDetails
						 * ="update ehat_bill_details set deleted='Y' where bill_details_id = "
						 * +billSlave.getBillDetailsId(); Query billDetailsQuery =
						 * session.createSQLQuery(billDetails); billDetailsQuery.executeUpdate();
						 */

						BillRefundSlaveDTO slave = new BillRefundSlaveDTO();

						slave.setBillReceiptMasterId(result);
						slave.setUnitId(billReceiptMaster.getUnitId());
						slave.setTreatmentId(billReceiptMaster.getTreatmentId());
						slave.setPatientId(patientId);
						slave.setBillId(billId);
						slave.setDepartmentId(departId);

						slave.setRate(billSlave.getRate());
						slave.setAmount(billSlave.getAmount());
						slave.setConcession(billSlave.getConcession());
						// added by Rohit 06-01-2021
						// slave.setPaid(billSlave.getAmount()-billSlave.getConcession());
						slave.setPaid(billSlave.getActualFinalPaid());
						slave.setQuantity(billSlave.getQuantity());
						slave.setCreatedBy(billReceiptMaster.getCreatedBy());
						slave.setCreatedDateTime(new Date());
						// added by Rohit on 15-01-2021
						slave.setDiscount(billSlave.getActualDiscAmt());
						// to get only date from dateTime
						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
						Date assignDate = sdf.parse(sdf.format(billSlave.getCreatedDateTime()));

						slave.setServiceAssignDate(assignDate);
						slave.setDoctorId(billSlave.getDoctorId());
						slave.setServiceId(billSlave.getServiceId());
						slave.setSubServiceId(billSlave.getSubServiceId());
						slave.setConcession(billSlave.getConcession());
						slave.setBillDetailsId(billSlave.getBillDetailsId());

						String compName = null;

						if (slave.getServiceId() == 1) {

							compName = "Registration Charges";

						} else {

							Criteria criteriaCompName = session.createCriteria(SubServiceDto.class);
							criteriaCompName.add(Restrictions.eq("subId", billSlave.getSubServiceId()));
							criteriaCompName.add(Restrictions.eq("deleted", "N"));
							List<SubServiceDto> listCompNames = (List<SubServiceDto>) criteriaCompName.list();
							for (SubServiceDto bojComp : listCompNames) {

								compName = bojComp.getCategoryName();
							}
						}
						slave.setCompName(compName);
						session.merge(slave);
					}
					/**
					 * @since 10-02-2022
					 * @author Rohit Sandbhor
					 * @Comment Added common advance refund flow here
					 */
					ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
					int cmnAdvcPaymodeId = Integer.parseInt(resourceBundle.getObject("cmnAdvcPaymodeId").toString());
					// Save Master list
					if (billReceiptMaster.getPayMode() == cmnAdvcPaymodeId) {
						
						// update credit flag of receipt which is against id
						/*CommonadvDto objectToUpdate = (CommonadvDto) session.get(BillReceiptMasterDTO.class, billRecMaster.getAgainstId());
						objectToUpdate.setCommonadv_amnt(billRecMaster.getTotalPaid());*/
						
						Criteria criteria = session.createCriteria(CommonadvDto.class);
						criteria.add(Restrictions.eq("treatmentId", billReceiptMaster.getTreatmentId()));
			        	criteria.add(Restrictions.eq("deleted", "N"));
			        	criteria.setProjection(Projections.sum("commonadv_amnt"));
			        	double totComAdvc = (Double) criteria.uniqueResult();
						
						//Session session = session;
						String hql = "UPDATE CommonadvDto set commonadv_amnt =:amt WHERE treatmentId =:trid";
						Query query = session.createQuery(hql);
						
						totComAdvc=totComAdvc-billReceiptMaster.getTotalPaid();
						query.setParameter("amt",totComAdvc);  
						query.setParameter("trid",billReceiptMaster.getTreatmentId());  
						query.executeUpdate();
						/*
						 * Criteria criteria1 = session.createCriteria(CommonadvDto.class);
						 * criteria1.add(Restrictions.eq("patient_ID", patientId));
						 * criteria1.add(Restrictions.eq("deleted", "N"));
						 * criteria1.addOrder(Order.asc("commonadv_id")); List<CommonadvDto> listcdav =
						 * criteria1.list();
						 * 
						 * // remaining_common_amnt =:remainingAmount , String hql =
						 * "UPDATE CommonadvDto set  refund_amnt_from_billing  =:refundAmount , remaining_common_amnt  =:remainingAmount , deduct_common_amnt  =:deductAmount ,paidflag =:paidflag WHERE patient_ID =:pid and  commonadv_id =:cadid "
						 * ; Query query = session.createQuery(hql); int pay = 0; // double
						 * refundAmount=billMaster.getTotalPaid(); double refundAmount =
						 * billReceiptMaster.getTotalPaid(); double remainingAmount = 0.0; double
						 * deductAmount = 0.0; double refundAmountUpdated = 0.0; for (CommonadvDto cd :
						 * listcdav) { double remainingAmountFromTable = cd.getRemaining_amnt();
						 * 
						 * double addedCommonAdvanceAmount = cd.getCommonadv_amnt(); if
						 * (addedCommonAdvanceAmount == cd.getDeduct_amnt()) { ComAdvbifergationDto
						 * cadvbi = new ComAdvbifergationDto(); deductAmount = cd.getDeduct_amnt();
						 * remainingAmount = deductAmount; refundAmount =
						 * billReceiptMaster.getTotalPaid() + cd.getRefundAmntFromBilling(); //
						 * refundAmount = cd.getDeduct_amnt(); double updatedRemainingAmount =
						 * remainingAmountFromTable + refundAmount; query.setParameter("refundAmount",
						 * refundAmount); query.setParameter("remainingAmount", updatedRemainingAmount);
						 * query.setParameter("deductAmount", 0.0); query.setParameter("paidflag", "Y");
						 * query.setParameter("pid", patientId); query.setParameter("cadid",
						 * cd.getCommonadv_id()); query.executeUpdate(); //
						 * cadvbi.setAmount(remainingAmountFromTable);
						 * cadvbi.setCadvid(cd.getCommonadv_id()); cadvbi.setReceipt_id(maxReceiptId);
						 * session.merge(cadvbi); // break; } else { if (pay == 0) {
						 * ComAdvbifergationDto cadvbi = new ComAdvbifergationDto(); double decAmt =
						 * 0.0; double updatedRemainingAmount = 0.0; if (cd.getDeduct_amnt() <
						 * cd.getCommonadv_amnt()) { // decAmt = cd.getDeduct_amnt(); decAmt =
						 * billReceiptMaster.getTotalPaid() + cd.getRefundAmntFromBilling();
						 * deductAmount = cd.getDeduct_amnt() - billReceiptMaster.getTotalPaid();
						 * remainingAmount = billReceiptMaster.getTotalPaid() +
						 * cd.getRemaining_amnt();// updatedRemainingAmount = remainingAmountFromTable +
						 * decAmt + cd.getRefund_amnt(); } else { decAmt = cd.getRefundAmntFromBilling()
						 * + refundAmount; deductAmount = cd.getDeduct_amnt() - refundAmount;
						 * remainingAmount = refundAmount + cd.getRemaining_amnt();//
						 * updatedRemainingAmount = remainingAmountFromTable + decAmt +
						 * cd.getRefund_amnt(); } query.setParameter("refundAmount", (decAmt));
						 * query.setParameter("remainingAmount", remainingAmount);
						 * query.setParameter("deductAmount", deductAmount);
						 * query.setParameter("paidflag", "N"); query.setParameter("pid", patientId);
						 * query.setParameter("cadid", cd.getCommonadv_id()); query.executeUpdate();
						 * cadvbi.setCadvid(cd.getCommonadv_id()); cadvbi.setReceipt_id(maxReceiptId);
						 * session.merge(cadvbi); pay = 1; if (remainingAmountFromTable >
						 * billRefundMaster.getTotalPaid()) { break; } }
						 * 
						 * } }
						 */}
				} else {

					// if(billRecMaster.getTotalPaid()<=totalPayable){
					// Make entry in refund master
					// BillRefundMasterDTO billMaster = new BillRefundMasterDTO();
					billRefundMaster.setRefundCount(curRecId);
					billRefundMaster.setUnitId(billReceiptMaster.getUnitId());
					billRefundMaster.setTreatmentId(billReceiptMaster.getTreatmentId());
					billRefundMaster.setPatientId(patientId);
					billRefundMaster.setBillId(billId);
					billRefundMaster.setDepartmentId(departId);
					billRefundMaster.setReceiptOf(billReceiptMaster.getReceiptOf());
					billRefundMaster.setCreatedBy(billReceiptMaster.getCreatedBy());
					billRefundMaster.setCreatedDateTime(new Date());
					billRefundMaster.setSourceTypeId(sourceTypeId);
					billRefundMaster.setPayeeTypeId(billReceiptMaster.getPayeeTypeId());
					billRefundMaster.setPayeeMainId(billReceiptMaster.getPayeeMainId());
					billRefundMaster.setPayeeLeafId(billReceiptMaster.getPayeeLeafId());
					billRefundMaster.setDeleted("N");
					billRefundMaster.setRefundFlag("Y");
					billRefundMaster.setPayMode(billReceiptMaster.getPayMode());
					billRefundMaster.setbNumber(billReceiptMaster.getbNumber());
					billRefundMaster.setBatchNumber(billReceiptMaster.getBatchNumber());
					billRefundMaster.setbName(billReceiptMaster.getbName());
					billRefundMaster.setTotalAmt(billReceiptMaster.getTotalAmt());
					billRefundMaster.setTotalDisc(billReceiptMaster.getTotalDisc());
					billRefundMaster.setTotalQty(1);
					billRefundMaster.setTotalPaid(billReceiptMaster.getTotalPaid());// payable
					billRefundMaster.setTotalRemain(billReceiptMaster.getTotalAmt()
							- (billReceiptMaster.getTotalPaid() + billReceiptMaster.getTotalDisc()));
					billRefundMaster.setAgainstId(billReceiptMaster.getAgainstId());
					billRefundMaster.setRefGivenBy(billReceiptMaster.getRefGivenBy());
					billRefundMaster.setRefRemark(billReceiptMaster.getRefRemark());
					// Save Refund Master list
					session.merge(billRefundMaster);
					// Get max master id
					Criteria criteriaMax = session.createCriteria(BillRefundMasterDTO.class)
							.setProjection(Projections.max("billRefundId"));
					result = (Integer) criteriaMax.uniqueResult();
					if (result == null) {

						result = -3;
					}

					/*
					 * }else{
					 * 
					 * result=-1; }
					 */
				}

				// Save Multiple pay mode list
				// if(billRefundMaster.getPayMode()==cmnAdvcPaymodeId){
				/*
				 * Criteria criteria = session.createCriteria(CommonadvDto.class);
				 * criteria.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
				 * criteria.add(Restrictions.eq("deleted", "N"));
				 * criteria.setProjection(Projections.sum("commonadv_amnt")); double totComAdvc
				 * = (Double) criteria.uniqueResult();
				 * 
				 * //Session session = session; String hql =
				 * "UPDATE CommonadvDto set commonadv_amnt =:amt WHERE treatmentId =:trid";
				 * Query query = session.createQuery(hql);
				 * 
				 * totComAdvc=totComAdvc-billRecMaster.getTotalPaid();
				 * query.setParameter("amt",totComAdvc);
				 * query.setParameter("trid",billRecMaster.getTreatmentId());
				 * query.executeUpdate();
				 */

				/*
				 * Criteria criteria1 = session.createCriteria(CommonadvDto.class);
				 * criteria1.add(Restrictions.eq("patient_ID", patientId));
				 * criteria1.add(Restrictions.eq("paidflag", "N"));
				 * criteria1.add(Restrictions.eq("deleted", "N"));
				 * criteria1.addOrder(Order.asc("commonadv_id")); List < CommonadvDto > listcdav
				 * = criteria1.list(); String hql =
				 * "UPDATE CommonadvDto set  refund_amnt  =:deamt ,remaining_amnt  =:reamt ,paidflag =:paidflag WHERE patient_ID =:pid and  commonadv_id =:cadid "
				 * ; Query query = session.createQuery(hql); int pay = 0; double refundedAmount
				 * = billMaster.getListBillRefundSlave().get(0).getAmount();
				 * System.out.println("ro::" + listcdav.size()); for (CommonadvDto cd: listcdav)
				 * { double remainingAmount = cd.getRemaining_amnt(); if (remainingAmount != 0.0
				 * || remainingAmount != 0) { if (remainingAmount < refundedAmount) {
				 * ComAdvbifergationDto cadvbi = new ComAdvbifergationDto(); refundedAmount =
				 * remainingAmount - refundedAmount; //00 double deamt = remainingAmount +
				 * cd.getDeduct_amnt(); query.setParameter("deamt", deamt);
				 * query.setParameter("reamt", 0.0); query.setParameter("paidflag", "Y");
				 * query.setParameter("pid", patientId); query.setParameter("cadid",
				 * cd.getCommonadv_id()); query.executeUpdate();
				 * cadvbi.setAmount(remainingAmount); cadvbi.setCadvid(cd.getCommonadv_id());
				 * cadvbi.setReceipt_id(maxReceiptId); session.merge(cadvbi); } else { if (pay
				 * == 0) { ComAdvbifergationDto cadvbi = new ComAdvbifergationDto(); double
				 * deamt = refundedAmount; refundedAmount = remainingAmount + refundedAmount; //
				 * query.setParameter("deamt", (deamt + cd.getDeduct_amnt()));
				 * query.setParameter("reamt", refundedAmount); query.setParameter("paidflag",
				 * "N"); query.setParameter("pid", patientId); query.setParameter("cadid",
				 * cd.getCommonadv_id()); query.executeUpdate(); cadvbi.setAmount(deamt);
				 * cadvbi.setCadvid(cd.getCommonadv_id()); cadvbi.setReceipt_id(maxReceiptId);
				 * session.merge(cadvbi); pay = 1; }
				 * 
				 * }
				 * 
				 * }
				 * 
				 * }
				 */

				// }

				// }else{

				//// result=-2;
			}

			// setOpdRefMasterSlave(againstId,"refund",session);

			session.getTransaction().commit(); // commit the transaction
			session.close();

			// Set bill master totals
			setBillMasterTotalsForOpd(billReceiptMaster.getTreatmentId());

		} catch (Exception e) {

			e.printStackTrace();
			session.getTransaction().rollback();
			return 0;
		}

		return result;
	}
	
	
	//added by vishant
		public int setOpdPkgMasterSlaveFoRefund(int servId,int billDetailsId) {
		//public int setOpdPkgMasterSlaveNew(int servId,int billDetailsId,Session session,String spId, double mastPaidPer, int sponsorId) {
			
			double mastConsnPer=0, mastDiscPer=0, mastRefPer=0,mastPaidPer=0.0;
			double concessionAmt=0;
			double actualFinalPayble=0;
			int spId =0;
	        double slaveTotAmt=0, slaveTotConsn=0, slavePayable=0, slaveTotPaid=0, slaveTotDisc=0, slaveTotRef=0;       
	       		
	     // Get slave receipt totals
	     		String sql = "select * from ehat_receipt_slave where deleted='N' and service_id=" + servId + " and bill_details_id="
	     				+ billDetailsId;
	     		Query mastQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
	     		mastQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

	     		@SuppressWarnings("unchecked")
	     		List<Map<String, Object>> listRecMast = mastQuery.list();
	     		for (Map<String, Object> row : listRecMast) {

	     			slaveTotRef = (Double) row.get("actual_final_paid");
	     			mastRefPer = (Double) row.get("actual_ref_per");
	     		}
	     	mastRefPer=100;
			//Get pkg slave receipt totals
	        sql="select * from ehat_other_bill_detail_for_opd where deleted='N' and bill_details_id="+billDetailsId;
	        Query slaveQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
	        slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        @SuppressWarnings("unchecked")
	        List<Map<String, Object>> listRecSlave = slaveQuery.list();
	        for(Map<String, Object> row : listRecSlave){
	                       	        	
	        	//int sponsorId=(Integer)row.get("chargesSlave_id");
	        	int pkgSlaveId=(Integer)row.get("other_bill_details_id_for_Opd");
	        	spId= (Integer)row.get("chargesSlave_id");
	        	if(spId > 0){
	        		
	        		slaveTotAmt=(Double)row.get("other_amount");
	        		concessionAmt = (Double)row.get("other_concession");
	        		slaveTotDisc = (Double)row.get("discount");
	        		
	        	}else{
	        		
	        		slaveTotAmt=(Double)row.get("amount");
	        		concessionAmt = (Double)row.get("concession");
	        		slaveTotDisc = (Double)row.get("discount");
	        	}
	        	            
//	        	slaveTotConsn=(slaveTotAmt*mastConsnPer)/100;
	        	slavePayable=slaveTotAmt - (concessionAmt+slaveTotDisc);
//	            slaveTotDisc=(slavePayable*mastDiscPer)/100;
	            
//	            slavePayable= slavePayable-(slaveTotDisc);
//	           if(mastPaidAmt!=0.0) 
//	            mastPaidPer=(mastPaidAmt*100)/actualFinalPayble;
	           
//	            slaveTotPaid=(slavePayable*mastPaidPer)/100;
	            slaveTotRef=(slavePayable*mastRefPer)/100;	
	            if(Double.isNaN(slaveTotRef))
	            	slaveTotRef=0;
	            
	            if (spId > 0) {

					sql = "update ehat_other_bill_detail_for_opd set refund=" + slaveTotRef
							+",refund_per=100"
						//	+ ",other_concession=" + slaveTotConsn + ",discount_per=" + mastDiscPer + ",discount="+ slaveTotDisc + " "
						//	+ " ,paid_other_amt=" + slaveTotPaid + " ,paid_other_per=" + mastPaidPer + " "
							 + " where other_bill_details_id_for_Opd = " + pkgSlaveId;
				} else {

					sql = "update ehat_other_bill_detail_for_opd set refund=" + slaveTotRef
							+",refund_per=100"
						//	+ ",other_concession=" + slaveTotConsn + ",discount_per=" + mastDiscPer + ",discount="+ slaveTotDisc + " "
						//	+ " ,paid_other_amt=" + slaveTotPaid + " ,paid_other_per=" + mastPaidPer + " "
							 + " where other_bill_details_id_for_Opd = " + pkgSlaveId;
				}
	           
	            Query recSlaveQuery2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
	            recSlaveQuery2.executeUpdate();            
	        }
			return 1;
		}

		
		private Double getProfeesPercentage(int doctorId, int departId, int unitId,int caseType,int serviceId,int subServiceId,Integer chargesSlaveId) {
			// TODO Auto-generated method stub
			double profeesPercentage = 0.0;
			
			try {
				
				String sqldeptid="select department FROM doctor where doctor_id ="+doctorId;
				Query deptQuery = sessionFactory.getCurrentSession().createSQLQuery(sqldeptid);		
				String docdeptId = (String) deptQuery.uniqueResult();
				
				
				// get the hospital cut percent for the perticular doctor
				Query qq = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT ifnull(CASE WHEN(select count(*) from percent_master "
						+"where doctor_id = :doctorId and case_type = :caseType "
						+"and dept_id = :deptId and deleted='N' and service_id = :serviceId and charges_slave_id = :chargesSlaveId and dr_dept_id = :drDeptId and unit_id = :unitId > 0) "
						+"THEN(select hosp_percent from percent_master where "
						+"doctor_id = :doctorId and deleted='N' and case_type = :caseType and dept_id = :deptId and service_id = :serviceId and charges_slave_id = :chargesSlaveId and dr_dept_id = :drDeptId and unit_id = :unitId) "
						+"ELSE (select hosp_percent from percent_master where doctor_id = :doctorId and deleted='N' and case_type = 0 "
						+"and dept_id = :deptId and service_id = :serviceId and charges_slave_id = 0 and dr_dept_id = :drDeptId and unit_id = 0) END,0) AS hosp_percent ");
				
				qq.setParameter("doctorId", doctorId); //pflist.get(i).getDoctorId()
				qq.setParameter("caseType",caseType);  // pflist.get(i).getCaseType()
				qq.setParameter("deptId", departId);   //pflist.get(i).getDeptId()
				qq.setParameter("serviceId", serviceId); // pflist.get(i).getServiceId()
				qq.setParameter("unitId", unitId);     // pflist.get(i).getUnitId()
				qq.setParameter("chargesSlaveId", chargesSlaveId);
				qq.setParameter("drDeptId",docdeptId);
				
				@SuppressWarnings("unchecked")
				double hosp_percent = (Double) qq.uniqueResult();
				
				//fetch subservice percentage 
				double subServicePercent = fetchSubServicePercent(//pflist.get(i).getDoctorId(),pflist.get(i).getCaseType(),pflist.get(i).getDeptId(),
						//pflist.get(i).getSubServiceId(),pflist.get(i).getUnitId(),chargesSlaveId,pflist.get(i).getDrDeptIdStr()
						doctorId,caseType,departId,subServiceId,unitId,chargesSlaveId,docdeptId);

				//If subservice percent is given use else use service percent
				if(subServicePercent >= 0){
					hosp_percent = subServicePercent;
					profeesPercentage = hosp_percent;
				}else {
					profeesPercentage = hosp_percent;
				}
				
			}catch (Exception e) {
				e.printStackTrace();
				return profeesPercentage;
			}
			
			return profeesPercentage;
		}

		
		public double fetchSubServicePercent(int doctorId,int caseType,int deptId,
				int subServiceId, int unitId, int chargesSlaveId,
				String drDeptId) {

			double hosp_percent = 0;
			int ctr = 0;

			Integer subServCount = profeesCountSubServcId(doctorId, caseType,
					deptId, subServiceId, unitId, chargesSlaveId, drDeptId);
			if (subServCount > 0) {
				ctr++;
				// get the hospital cut percent for the perticular doctor
				Query qq = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"select ifnull(CASE WHEN(select count(*) from percent_slave where doctor_id =:doctorId and deleted = 'N' and case_type = :caseType "
										+ "and dept_id = :deptId and sub_service_id = :subServiceId and charges_slave_id = :chargesSlaveId " +" and dr_dept_id = :drDeptId  and unit_id = :unitId >0) " //
										+ "THEN(select hosp_percent from percent_slave where doctor_id =:doctorId and deleted = 'N' and case_type = :caseType "
										+ "and dept_id = :deptId and sub_service_id = :subServiceId and charges_slave_id = :chargesSlaveId  " + " and dr_dept_id = :drDeptId " 
										+ " and unit_id = :unitId) "
										+ "ELSE (select hosp_percent from percent_slave where doctor_id =:doctorId and deleted = 'N' and case_type = 0 "
										+ "and dept_id = :deptId and sub_service_id = :subServiceId and charges_slave_id = 0 " +" and dr_dept_id = :drDeptId " 
										+ "and unit_id = 0) END,0) as hosp_percent");

				qq.setParameter("doctorId", doctorId);
				qq.setParameter("caseType", caseType);
				qq.setParameter("deptId", deptId);
				qq.setParameter("subServiceId", subServiceId);

				// qq.setParameter("chargesId", pflist.get(i).getChargesId());
				qq.setParameter("chargesSlaveId", chargesSlaveId);
				qq.setParameter("drDeptId", drDeptId);
				qq.setParameter("unitId", unitId);

				hosp_percent = (Double) qq.uniqueResult();
			} else {
				List<Integer> ltSubServId = new ArrayList<Integer>();
				ltSubServId = fetchSubServSuperList(subServiceId);
				for (int j = 0; j < ltSubServId.size(); j++) {
					Integer count1 = profeesCountSubServcId(doctorId, caseType,
							deptId, ltSubServId.get(j), unitId, chargesSlaveId, drDeptId);

					if (count1 > 0) {
						ctr++;
						
						// get the hospital cut percent for the perticular doctor
						Query qq = sessionFactory
								.getCurrentSession()
								.createSQLQuery(
										"select ifnull(CASE WHEN(select count(*) from percent_slave where doctor_id =:doctorId and deleted = 'N' and case_type = :caseType "
												+ "and dept_id = :deptId and sub_service_id = :subServiceId and charges_slave_id = :chargesSlaveId and dr_dept_id = :drDeptId and unit_id = :unitId >0) "
												+ "THEN(select hosp_percent from percent_slave where doctor_id =:doctorId and deleted = 'N' and case_type = :caseType "
												+ "and dept_id = :deptId and sub_service_id = :subServiceId and charges_slave_id = :chargesSlaveId and dr_dept_id = :drDeptId and unit_id = :unitId) "
												+ "ELSE (select hosp_percent from percent_slave where doctor_id =:doctorId and deleted = 'N' and case_type = 0 "
												+ "and dept_id = :deptId and sub_service_id = :subServiceId and charges_slave_id = 0 and dr_dept_id = :drDeptId and unit_id = 0) END,0) as hosp_percent");

						qq.setParameter("doctorId", doctorId);
						qq.setParameter("caseType", caseType);
						qq.setParameter("deptId", deptId);
						qq.setParameter("subServiceId", ltSubServId.get(j));

						// qq.setParameter("chargesId", pflist.get(i).getChargesId());
						qq.setParameter("chargesSlaveId", chargesSlaveId);
						qq.setParameter("drDeptId", drDeptId);
						qq.setParameter("unitId", unitId);

						hosp_percent = (Double) qq.uniqueResult();
						
						break;
					}
				}
			}

			if(ctr > 0){
				return hosp_percent;
			}else{
				return -200;
			}
			
		}
		
		public int profeesCountSubServcId( int doctorId,int caseType, int deptId,
				int subServiceId, int unitId,int chargesSlaveId, String drDeptId) {
		int count = 0;
			try {
				String[] mstIds;
				ArrayList<Integer> masterChecked=new ArrayList<Integer>();	
				// get checked service masters
							if(drDeptId.length()>0){
								
								mstIds=drDeptId.split(",");
								for(String id:mstIds){
									
									masterChecked.add(Integer.parseInt(id));					
								}
							}
							
				/*Query qq = sessionFactory
						.getCurrentSession()
						.createQuery(
								"select count(*) from PercentSlaveDto where doctorId =:doctorId and caseType =:caseType and deptId =:deptId "
										+ "and deleted='N' and subServiceId =:subServiceId and chargesSlaveId =:chargesSlaveId and "
										+ "drDeptId In(:drDeptId) and unitId =:unitId");

				qq.setParameter("doctorId", doctorId);
				qq.setParameter("caseType", caseType);
				qq.setParameter("deptId", deptId);
				qq.setParameter("subServiceId", subServiceId);
				qq.setParameter("chargesSlaveId", chargesSlaveId);
				//qq.setParameter("drDeptId", Integer.parseInt(drDeptId));
				//qq.setParameter("drDeptId",drDeptId);
				qq.setParameter("drDeptId",masterChecked);
				qq.setParameter("unitId", unitId);
				count = ((Number)qq.uniqueResult()).intValue();*/			
				//count = ((Number) qq.uniqueResult()).intValue();
				//List<PercentSlaveDto> percentSlaveDtolist = qq.list();
				// count = (int) percentSlaveDtolist.stream().count();
				//Integer count1 =  ((BigInteger) qq.uniqueResult()).intValue();
				//Integer counta = Integer.parseInt(count1);
				
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PercentSlaveDto.class);			
			criteria.add(Restrictions.eq("doctorId",doctorId));	
			criteria.add(Restrictions.eq("caseType", caseType));
			criteria.add(Restrictions.eq("deptId", deptId));
			criteria.add(Restrictions.eq("subServiceId", subServiceId));
			
			criteria.add(Restrictions.eq("chargesSlaveId", chargesSlaveId));
			//criteria.add(Restrictions.not(Restrictions.in("drDeptId", masterChecked)));
			criteria.add(Restrictions.eq("drDeptId", Integer.parseInt(drDeptId)));
			criteria.add(Restrictions.eq("unitId", unitId));
			
			//criteria.add(Restrictions.not(Restrictions.in("drDeptId", masterChecked)));
			 List<PercentSlaveDto> percentSlaveDtolist = (List<PercentSlaveDto>) criteria.list();	
			 count = (int) percentSlaveDtolist.stream().count();
			 
				if(count == 0){
					Query qqDefault = sessionFactory
							.getCurrentSession()
							.createQuery(
									"select count(*) from PercentSlaveDto where doctorId =:doctorId and caseType =:caseType and deptId =:deptId "
											+ "and deleted='N' and subServiceId =:subServiceId and chargesSlaveId =:chargesSlaveId and "
											+ "drDeptId =:drDeptId and "
											+ " unitId =:unitId");

					qqDefault.setParameter("doctorId", doctorId);
					qqDefault.setParameter("caseType", 0);
					qqDefault.setParameter("deptId", deptId);
					qqDefault.setParameter("subServiceId", subServiceId);
					qqDefault.setParameter("chargesSlaveId", 0);
					qqDefault.setParameter("drDeptId", Integer.parseInt(drDeptId));
					qqDefault.setParameter("unitId", 0);
					count = ((Number) qqDefault.uniqueResult()).intValue();
					
				}

			} catch (Exception e) {
				e.printStackTrace();
				return count;
			}
			return count;

		}
		
		public List<Integer> fetchSubServSuperList(Integer subServiceId) {

			// Calling stored procedure
			Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery("CALL  fetchSuperCatogoiresSubSrv (:subServId)")
					.setParameter("subServId", subServiceId);
			String result = (String) query.uniqueResult();
			String[] ary = result.split(",");

			// converting string object into Integer
			List<Integer> ae = new ArrayList<Integer>();
			for (int i = 0; i < ary.length; i++) {
				ae.add(Integer.parseInt(ary[i]));
			}

			return ae;
		}
		
		
		//added Rohini on 02-04-2024 for percent master parent chreges id 
		public Integer getProfeesChargeSlaveId(int chargesSlaveId1,int profeesDocId) {
			// TODO Auto-generated method stub
			
			Integer profeesChargesSlaveid =0;
			try {
				
				Query q = sessionFactory.getCurrentSession().createSQLQuery("select ifnull(fun_get_charges_slave_id("
				+chargesSlaveId1+","+profeesDocId+"),0)");
				profeesChargesSlaveid =	((Number) q.uniqueResult()).intValue();
			  
			}catch (Exception e) {
				e.printStackTrace();
				return 0;
			}
			return profeesChargesSlaveid;
		}
}			