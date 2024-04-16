package com.hms.ehat.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.OtherBillingDao;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.OtherBillReceiptMasterDTO;
import com.hms.ehat.dto.OtherBillReceiptSlaveDTO;
import com.hms.ehat.dto.OtherBillRefundMasterDTO;
import com.hms.ehat.dto.OtherBillingDto;
import com.hms.ehat.dto.RegistrationOtherDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ipdbill.dto.MultiBillReceiptMasterDTO;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class OtherBillingDaoImpl implements OtherBillingDao{
	@Autowired
	SessionFactory sessionFactory;
	
	ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	
	
	/**@author   :Kishor
	 * @date     :9-Aug-2017
	 * @code     :for Ipd package billing save and update  **/
	@Override
	public int saveOtherBilling(OtherBillingDto otherBillingDto,
			HttpServletRequest request, String queryType) {
		Integer otherBillDetailsId = otherBillingDto.getBillDetailsId();
		/*Integer billDetailsId = ehatOtherBillDetailForOpdDto.getBillDetailsId();
		Integer chargesId = ehatOtherBillDetailForOpdDto.getChargesId();
		Integer chargesSlaveId = ehatOtherBillDetailForOpdDto.getChargesSlaveId();*/
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		int records=0;
		try {
			if (queryType.equals("update")) {
				
				OtherBillingDto obj = (OtherBillingDto) sessionFactory
									.getCurrentSession().get(OtherBillingDto.class,
											otherBillDetailsId);
				obj.setAmount(otherBillingDto.getAmount());
				obj.setBillDetailsId(otherBillingDto.getBillDetailsId());
				obj.setBillId(otherBillingDto.getBillId());
				obj.setQuantity(otherBillingDto.getQuantity());
				obj.setRate(otherBillingDto.getRate());
				obj.setPay(otherBillingDto.getPay());
				obj.setCoPay(otherBillingDto.getCoPay());
				obj.setConcession(otherBillingDto.getConcession());
				obj.setConcessionOnPerc(otherBillingDto.getConcessionOnPerc());
				//obj.setChildSubServiceId(otherBillingDto.getChildSubServiceId());
				obj.setDoctorId(otherBillingDto.getDoctorId());
 				obj.setServiceId(otherBillingDto.getServiceId());
 				obj.setSubServiceId(otherBillingDto.getSubServiceId());
 				obj.setOtherServiceName(otherBillingDto.getOtherServiceName());
 				obj.setUpdatedBy(userId);
 				obj.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
				  
			} else {
				
				/*BillDetailsDto obj = (BillDetailsDto) sessionFactory
						.getCurrentSession().get(BillDetailsDto.class,
								billDetailsId);
				double amount    =obj.getAmount();
				double copay     =obj.getCoPay();
				double pay       =obj.getPay();
				double concession=obj.getConcession();
				
				double amountPak = ehatOtherBillDetailForOpdDto.getAmount();*/
				int otherSId =Integer.parseInt(resourceBundle.getObject("otherServiceId").toString());
				int servid=otherBillingDto.getServiceId();
				int subservId = otherBillingDto.getSubServiceId();
				if(servid == 0){					
					otherBillingDto.setServiceId(otherSId);
					
				}
				
					if (subservId == 0) {
					String catName=otherBillingDto.getSubservicesname();
					double rate=otherBillingDto.getRate();
					
					 String sql2 = "insert into ehat_subservice(category_name,code_name,created_by,created_date_time,deleted,isCategory,selfId,service_id,charges,isModify,status,iscombination,cgscode)" +
					 		"values('"+catName+"','"+catName+"','"+userId+"',now(),'N','N',0,'"+otherSId+"','"+rate+"','Y',0,'N','-')";						
						SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
				         query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
				         query2.executeUpdate();
				         
				         String sql= "SELECT max(id) FROM ehat_subservice";
					        Query query= sessionFactory.getCurrentSession().createSQLQuery(sql);					        	 
					        int id = (Integer) query.uniqueResult();
					        otherBillingDto.setSubServiceId(id);
				}
					
				otherBillingDto.setCreatedBy(userId);	
				otherBillingDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
				otherBillingDto.setDeleted("N");
				otherBillingDto.setCancle("N");
				
				sessionFactory.getCurrentSession().merge(otherBillingDto);
			}
			 
			 records=1;
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return records;
		}

		return records;
	}




	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 11_July_2017 
	 * @Code Fetching patient data bye id for given particular access to user.
	 ******************************************************************************/
	@Override
	public  List<OtherBillingDto> fetchPatientBillAmountOther(
			Integer treatmentId, Integer userId) {
		List<OtherBillingDto> ltPatientRecord = new ArrayList<OtherBillingDto>();
		try {
			String servIds=null;
			String sql1="select service_id from users where User_ID="+userId+"";
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> data1 = query1.list();
			
			for(Map<String, Object> row : data1){
				
				servIds=(String)row.get("service_id");
				
			}
				
			ArrayList<Integer> servIds11=new ArrayList<Integer>();
			//int[] servIds11 = new int[10];
			
			String[] servIds1 = null;
			
			// get checked service masters
			if(servIds.length()>0){
				
				servIds1=servIds.split(",");
				
				for(String id:servIds1){
					
					servIds11.add(Integer.parseInt(id));					
				}
			}		
			
	
			if(!servIds.equals(null)){
				for(int i=0;i<servIds1.length;i++){
				 String sql = "SELECT * FROM ehat_bill_details_other where patient_id = "+treatmentId+" and deleted='N' and service_id="+Integer.parseInt(servIds1[i])+"";
				 SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         List<Map<String, Object>> data = query.list();
		       
		         for(Map<String, Object> row : data){
		        	 
		        	OtherBillingDto objDTO= new OtherBillingDto();
		        	objDTO.setServiceId((Integer)row.get("service_id"));
		        	objDTO.setTreatmentId((Integer)row.get("treatment_id"));
		        	objDTO.setBillDetailsId((Integer)row.get("bill_details_id_otherbilling"));
		        	objDTO.setDoctorId((Integer)row.get("doctor_id"));
		        	objDTO.setPatienttId((Integer)row.get("patient_id"));
		        	 
		        	 
			        String sql9= "SELECT doc_name FROM doctor where Doctor_ID=:docId";
			        Query query9= sessionFactory.getCurrentSession().createSQLQuery(sql9)
			        	 .setParameter("docId", objDTO.getDoctorId());
			        String docName = (String) query9.uniqueResult();			        
			        objDTO.setDocName(docName);	        	 
		        	objDTO.setOtherServiceName((String)row.get("other_service_name"));
		        	objDTO.setPay((Double)row.get("pay"));
		        	objDTO.setQuantity((Double)row.get("quantity"));
		        	objDTO.setCoPay((Double)row.get("co_pay"));
		        	objDTO.setRate((Double)row.get("rate"));
		        	objDTO.setConcession((Double)row.get("concession"));
		        	objDTO.setConcessionOnPerc((Double)row.get("concession_in_Perc"));
		        	objDTO.setAmount((Double)row.get("amount"));
		        	objDTO.setOtherAmount((Double)row.get("other_amount"));
		        	objDTO.setSubServiceId((Integer)row.get("sub_service_id"));
		        	objDTO.setAppointId((Integer)row.get("appoint_id"));		        	
		        	objDTO.setCreatedBy((Integer)row.get("created_by"));
		        	objDTO.setCreatedDateTime((Date)row.get("created_date_time"));
		        	objDTO.setPaidFlag((String)row.get("paid_flag"));
		        	 
		        	 //objDTO.setServiceCount((BigInteger)row.get("service_count"));
		        	 //objDTO.setIsCombination((String)row.get("iscombination"));

		        	
		        	 ltPatientRecord.add(objDTO);
		        	 objDTO=null;
		         }
				}
			}
			
	         
	         
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}

	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 3_June_2017 
	 * @Code Fetching patient data bye id.
	 ******************************************************************************/
	@Override
	public List<OtherBillingDto> fetchPatientBillAmountOther(Integer treatmentId) {
	{
		List<OtherBillingDto> ltPatientRecord = new ArrayList<OtherBillingDto>();
		try {
			
			
			 String sql = "SELECT * FROM ehat_bill_details_other where patient_id = "+treatmentId+" and deleted='N'";
	         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
	         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         List<Map<String, Object>> data = query.list();
	       
	         for(Map<String, Object> row : data){
	        	 
	        	 OtherBillingDto objDTO= new OtherBillingDto();
	        	 objDTO.setServiceId((Integer)row.get("service_id"));
	        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
	        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id_otherbilling"));
	        	 objDTO.setDoctorId((Integer)row.get("doctor_id"));
	        	 
	        	 String sql9= "SELECT doc_name FROM doctor where Doctor_ID=:docId";
			        Query query9= sessionFactory.getCurrentSession().createSQLQuery(sql9)
			        	 .setParameter("docId", objDTO.getDoctorId());
			        String docName = (String) query9.uniqueResult();
			        
			        objDTO.setDocName(docName);
	        	 
	        	 objDTO.setOtherServiceName((String)row.get("other_service_name"));
	        	 objDTO.setPay((Double)row.get("pay"));
	        	 objDTO.setQuantity((Double)row.get("quantity"));

	        	 objDTO.setCoPay((Double)row.get("co_pay"));
	        	 objDTO.setRate((Double)row.get("rate"));
	        	 objDTO.setConcession((Double)row.get("concession"));
	        	 objDTO.setConcessionOnPerc((Double)row.get("concession_in_Perc"));
	        	 objDTO.setAmount((Double)row.get("amount"));
	        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
	        	 objDTO.setSubServiceId((Integer)row.get("sub_service_id"));
	        	 objDTO.setAppointId((Integer)row.get("appoint_id"));
	        	 objDTO.setPaidFlag((String)row.get("paid_flag"));
	        	 objDTO.setPatienttId((Integer)row.get("patient_id"));
	        	 objDTO.setCreatedBy((Integer)row.get("created_by"));
		        	objDTO.setCreatedDateTime((Date)row.get("created_date_time"));
	        	 //objDTO.setIsCombination((String)row.get("iscombination"));

	        	// objDTO.setServiceCount((BigInteger)row.get("service_count"));
	        	
	        	 ltPatientRecord.add(objDTO);
	        	 objDTO=null;
	         }
	         
	         
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}
}

	@Override
	public int deleteservdetailsOther(String labservicelist, Integer userId, String callform) {
		String[] ary = labservicelist.split(",");
		try {
			
		    System.out.println("id isssss="+ labservicelist);
	    	for (int i = 0; i < ary.length; i++) {
			System.err.println(ary[i]);
			OtherBillingDto otherBillingDto = new OtherBillingDto();
			otherBillingDto = (OtherBillingDto) sessionFactory
					.getCurrentSession().get(OtherBillingDto.class, Integer.parseInt(ary[i]));
			
			otherBillingDto.setDeleted("Y");
			otherBillingDto.setDeletedBy(userId);
			otherBillingDto.setDeletedDateTime((new Date(new java.util.Date().getTime())));
			//billDetailsDto.setBillDetailsId(Integer.parseInt(ary[i]));
			//sessionFactory.getCurrentSession().update(billDetailsDto);
		}
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return 0;
		}
		
		
		return 1;
	}
	
	
	// @author : Sagar Kadam @date: 14-July-2017 @reason :getAllRecordsforOPDque1
	@Override
	public RegistrationOtherDto getAllRecordsForOPDque1ToOther(Integer deptId) {
		//System.err.println("in daoIMPL=="+deptId);
		RegistrationOtherDto obj=new RegistrationOtherDto();
		DoctorDto obj1 = new DoctorDto();
		List<RegistrationOtherDto> ltPatientRecord = null;
		List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
		try {
			  
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(RegistrationOtherDto.class);
			
			if(deptId == 1)
			{
					criteria.add(Restrictions.eq("departmentId", deptId));
				criteria.add(Restrictions.eq("tFlag", "Y"));
					criteria.addOrder(Order.desc("patientId"));

				criteria.setMaxResults(10);
				ltPatientRecord = criteria.list();
				
				Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
				  		
				ltDoctorDto=criteria2.list();
				obj.setListReg(ltPatientRecord);
			
				obj1.setLstDoctorDto(ltDoctorDto);
				}else{
					criteria.add(Restrictions.eq("departmentId", deptId));
				criteria.add(Restrictions.eq("tFlag", "Y"));
					criteria.addOrder(Order.desc("patientId"));

				criteria.setMaxResults(10);
				ltPatientRecord = criteria.list();
				
				Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
				  		
				ltDoctorDto=criteria2.list();
				obj.setListReg(ltPatientRecord);
			
				obj1.setLstDoctorDto(ltDoctorDto);
				}
			 
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return obj;
		}
		return obj;
	}






	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 3_June_2017 
	 * @Code Fetching patient data bye id.
	 ******************************************************************************/
	@Override
	public List<RegistrationOtherDto> getPatientDataByPatientIdOther(
			Integer patientId) {
			List<RegistrationOtherDto> ltPatientRecord = null;
		try {
			/*RegistrationDto registrationDto = (RegistrationDto )sessionFactory.getCurrentSession()
                    .get(RegistrationDto.class, patientId);*/
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(RegistrationOtherDto.class);
			//criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.addOrder(Order.desc("unitId"));
			criteria.add(Restrictions.eq("patientId", patientId));
			criteria.setMaxResults(10);
			ltPatientRecord = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}


	@Override
	public RegistrationOtherDto getOtherBillingRecordsAuto(Integer deptId,
			String letter, String usertype) {
		List<RegistrationOtherDto> ltPatientRecord = null;
		RegistrationOtherDto obj=new RegistrationOtherDto();
		List<DoctorDto> ltDoctorDto=null;
				
		try {
				Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(RegistrationOtherDto.class);
				if(deptId==0){
				if(usertype.equals("Y"))
				{
					 criteria.add(Restrictions.eq("patientId", Integer.parseInt(letter)));
					}else{
					/*Criterion patientName = Restrictions.like("patientName","%" + letter + "%");
				Criterion mobileno = Restrictions.like("mobile","%" + letter + "%");
					LogicalExpression orExp = Restrictions.or( patientName,mobileno);*/
						Criterion rest1= Restrictions.like("fName", "%" + letter + "%");
						Criterion rest2= Restrictions.like("mobile", "%" + letter + "%");
						Criterion rest3= Restrictions.like("dob", "%" + letter + "%");
						
						criteria.add(Restrictions.or(rest1,rest2,rest3));
					/*criteria.add(orExp);*/}
				criteria.add(Restrictions.eq("departmentId", deptId));
				//criteria.add(Restrictions.eq("tFlag", "Y"));
				criteria.addOrder(Order.desc("patientId"));
			ltPatientRecord = criteria.list();
			
				Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
			ltDoctorDto=criteria2.list();
			obj.setListReg(ltPatientRecord);
			obj.setListDoctorDto(ltDoctorDto);
		}

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());			
		}
		return obj;
	}
	
	/************get
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	public int getCurrentRecId(String tblName,Session session){
			
		int maxId=0;
		
		try {
			
			String sqlRef="select ifnull(max(receipt_count),0) from "+tblName+" ";
			Query refQuery = session.createSQLQuery(sqlRef);
			maxId = ((Number)refQuery.uniqueResult()).intValue();
		}catch (Exception e) {
			
			e.printStackTrace();	
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return 0;
		}
		return (maxId+1);
	}

	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@Override
	public Integer saveOtherBillDetails(String masterIdsChecked,String servIdsChecked, Integer refDocId,
			OtherBillReceiptMasterDTO billRecMaster, String multiPayDetails) {	
		
		Integer maxReceiptId=0;		
		Session session = sessionFactory.openSession(); // create session object from the session factory
		session.beginTransaction(); // initialize the transaction object from session
		int curRecId=getCurrentRecId("ehat_receipt_master_other",session);
		ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		int cmnAdvcPaymodeId =Integer.parseInt(resourceBundle.getObject("cmnAdvcPaymodeId").toString());
		int cmdchk=0;
		Double totComAdvcNew =0.0;
		try {
			MultiBillReceiptMasterDTO billDto = (MultiBillReceiptMasterDTO) ConfigUIJSONUtility
		            .getObjectFromJSON(multiPayDetails, MultiBillReceiptMasterDTO.class);		
					
			int billId=0,patientId=0,departId=0,sourceTypeId=0,lastCredit=0,distributeFlag=0;
			double totAmt=0,totDisc=0,totQty=0;	
			
			String doctorIds="",compName="";
			List<OtherBillReceiptSlaveDTO> listBillReceiptSlave=new ArrayList<OtherBillReceiptSlaveDTO>();
			
			OtherBillReceiptMasterDTO billMaster = new OtherBillReceiptMasterDTO();
			
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
			
			Criteria criteriaRec = session.createCriteria(OtherBillReceiptMasterDTO.class);			
			criteriaRec.add(Restrictions.eq("patientId", billRecMaster.getPatientId()));	
			criteriaRec.setProjection(Projections.rowCount());			
			
			long count = (Long)criteriaRec.uniqueResult();
						
			/*if(billRecMaster.getPayMode()==cmnAdvcPaymodeId){
				Criteria criteria = session.createCriteria(CommonadvDto.class);
				criteria.add(Restrictions.eq("patientId", billRecMaster.getPatientId()));
		    	criteria.add(Restrictions.eq("deleted", "N"));
		    	criteria.setProjection(Projections.sum("commonadv_amnt"));
		    	totComAdvcNew	 = (Double) criteria.uniqueResult();
		    	 //chk by cadvacned for patien is null or noamount 	
		    	if(totComAdvcNew==0.0 || totComAdvcNew==null || totComAdvcNew==0 ){
		    		cmdchk =-2;//no amount
		    		maxReceiptId  =-2;//no amount
			}
		//end
		    	if(totComAdvcNew<billRecMaster.getTotalPaid()){
		    		
		    		cmdchk =-2;//no amount
		    		maxReceiptId  =-2;//no amount
		    		
		    	}
			}*/
		//chk coomanadv is applible or not	
		/*	if(cmdchk != -2){*/
				if(count>0 && billRecMaster.getAgainstId()>0){
					
					Criteria criteriaRecDetails = session.createCriteria(OtherBillReceiptMasterDTO.class);			
					criteriaRecDetails.add(Restrictions.eq("patientId", billRecMaster.getPatientId()));					
					criteriaRecDetails.add(Restrictions.eq("billReceiptId", billRecMaster.getAgainstId()));	
					
					List<OtherBillReceiptMasterDTO> listRecDetails = (List<OtherBillReceiptMasterDTO>) criteriaRecDetails.list();
					for(OtherBillReceiptMasterDTO obj:listRecDetails){
																
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
							
						billMaster.setTotalAmt(billRecMaster.getTotalAmt());							
						billMaster.setDiscGivenBy(billRecMaster.getDiscGivenBy());
						billMaster.setDiscNarrtn(billRecMaster.getDiscNarrtn());
						billMaster.setDiscRemark(billRecMaster.getDiscRemark());
						billMaster.setTotalQty(1);
						billMaster.setTotalPaid(billRecMaster.getTotalPaid());// payable
								
						// for profees
						totAmt=billRecMaster.getTotalAmt();
						billMaster.setActualAmt(totAmt);
						billMaster.setActualTotConcn(totDisc);
						billMaster.setActualPayable(totAmt-totDisc);
						billMaster.setActualDiscPer(billRecMaster.getTotalDisc());
						
						double payable=0;
						double amt=0;
						if(billRecMaster.getTotalDisc()>0){
							
							amt=((totAmt-totDisc)*billRecMaster.getTotalDisc())/100;
							payable=totAmt-totDisc-amt;
							billMaster.setTotalDisc(amt);
						}else{
							
							payable=(totAmt-totDisc);
							billMaster.setTotalDisc(0);
						}								
						billMaster.setPayable(payable);							
						billMaster.setTotalRemain(payable-billRecMaster.getTotalPaid());
							
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
						billMaster.setFirstDisc(amt);
						billMaster.setFirstRemain(payable-billRecMaster.getTotalPaid());
												
						// update credit flag of receipt which is against id
						OtherBillReceiptMasterDTO objectToUpdate = (OtherBillReceiptMasterDTO) session.get(OtherBillReceiptMasterDTO.class, billRecMaster.getAgainstId());
						objectToUpdate.setCreditFlag("Y");
												
						// Save Master list
						session.merge(billMaster);
											 
						// set receipt slave
						OtherBillReceiptSlaveDTO slave=new OtherBillReceiptSlaveDTO();
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
						slave.setSourceTypeId(billRecMaster.getSourceTypeId());
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
					
						slave.setCompName(obj.getBillReceiptId().toString());	
						slave.setAgainstId(obj.getBillReceiptId());	
						listBillReceiptSlave.add(slave);					
					}
									
					// Get max master id
					Criteria criteriaMax = session.createCriteria(OtherBillReceiptMasterDTO.class).setProjection(Projections.max("billReceiptId"));
					maxReceiptId = (Integer) criteriaMax.uniqueResult();
					
					if (maxReceiptId == null) {
			
						maxReceiptId = 0;
					}				
				
					// Calling stored procedure for get super master of receipt
					Query query2 = session.createSQLQuery("CALL fetchSuperReceiptIdOther (:receiptId)").setParameter("receiptId", maxReceiptId);
					Integer superRecId = (Integer) query2.uniqueResult();
												
					// Set all credit receipts status paid if remain 0
					if(lastCredit==1){
											
						// Calling stored procedure
						Query query = session.createSQLQuery("CALL fetchOtherCreditReceiptIds (:receiptId)").setParameter("receiptId", maxReceiptId);
						String result = (String) query.uniqueResult();
						String[] creditIds = result.split(",");
			
						for (int i = 0; i < creditIds.length; i++) {
							
							OtherBillReceiptMasterDTO objectToUp = (OtherBillReceiptMasterDTO) session.get(OtherBillReceiptMasterDTO.class, Integer.parseInt(creditIds[i]));
							objectToUp.setReceiptStatus("paid");								
						}										
			
						OtherBillReceiptMasterDTO objectToUp = (OtherBillReceiptMasterDTO) session.get(OtherBillReceiptMasterDTO.class, superRecId);
						objectToUp.setTotalRemain(0);				
						objectToUp.setTotalPaid(objectToUp.getTotalAmt());		
						
					}				
						
					// Query for get details amounts of super master
					double actualTotalAmt=0;
					double actualTotalPaid=0;
					double actualTotalDisc=0;
					double actualTotalRefund=0;
					List<OtherBillReceiptSlaveDTO> lstRecSlave=new ArrayList<OtherBillReceiptSlaveDTO>();
					String sql2="select actual_amt,total_paid,total_discount,actual_tot_concn from ehat_receipt_master_other where bill_receipt_id="+superRecId+" "; 
					SQLQuery getMaster = session.createSQLQuery(sql2);
					getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
					List<Map<String, Object>> masterRow = getMaster.list();
				          
				    for(Map<String, Object> row : masterRow){
			    		
				    	actualTotalAmt=(Double)row.get("actual_amt");
				    	actualTotalPaid=(Double)row.get("total_paid");
				    	actualTotalDisc=(Double)row.get("total_discount");
				    	//actualTotalRefund=(Double)row.get("refund_amt");
			    	}
				    				    
				    String sql3="select bill_details_id,actual_amt from ehat_receipt_slave_other where bill_receipt_master_id="+superRecId+" "; 
					SQLQuery getSlave = session.createSQLQuery(sql3);
					getSlave.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			  
					List<Map<String, Object>> lstSlave = getSlave.list();
				          
				    for(Map<String, Object> row : lstSlave){
			    		
				    	OtherBillReceiptSlaveDTO obj=new OtherBillReceiptSlaveDTO();
				    	obj.setBillDetailsId((Integer)row.get("bill_details_id"));
				    	obj.setActualAmt((Double)row.get("actual_amt"));			    	
				    	lstRecSlave.add(obj);
				    	obj=null;
			    	}			    
				   		    
				    double actualTotRemain=actualTotalAmt-(actualTotalPaid+billRecMaster.getTotalPaid()+actualTotalDisc+billMaster.getTotalDisc());
				    
					OtherBillReceiptMasterDTO objectToUp = (OtherBillReceiptMasterDTO) session.get(OtherBillReceiptMasterDTO.class, superRecId);
					objectToUp.setTotalDisc(actualTotalDisc+billMaster.getTotalDisc());			
					objectToUp.setTotalRemain(actualTotRemain);				
					objectToUp.setTotalPaid(actualTotalPaid+billRecMaster.getTotalPaid());	
					
					distributeFlag=1;
					
				}else{			
					
					int depId=0;
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
			        			sIds11.add(Integer.parseInt(id));
			        		}
			        	}  
			        }   
					
					Criteria criteria = session.createCriteria(OtherBillingDto.class);			
					criteria.add(Restrictions.eq("patienttId", billRecMaster.getPatientId()));	
					criteria.add(Restrictions.eq("cancle", "N"));
					criteria.add(Restrictions.eq("deleted", "N"));
					criteria.add(Restrictions.eq("paidFlag", "N"));
					/*if(masterChecked.size()!=0){
						
						criteria.add(Restrictions.in("serviceId", masterChecked));
					}
					if(slaveChecked.size()!=0){
						
						criteria.add(Restrictions.not(Restrictions.in("billDetailsId", slaveChecked)));
					}*/
					if(sIds11.size()!=0){
						
						criteria.add(Restrictions.in("serviceId", sIds11));
					}
					
					List<OtherBillingDto> listBillDetails = (List<OtherBillingDto>) criteria.list();		
					
					for(OtherBillingDto billSlave:listBillDetails){
			
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
						OtherBillReceiptSlaveDTO slave=new OtherBillReceiptSlaveDTO();
						slave.setUnitId(billRecMaster.getUnitId());				
						slave.setTreatmentId(billRecMaster.getTreatmentId());
						slave.setPatientId(patientId);
						slave.setBillId(billId);						
						slave.setDepartmentId(departId);
						
						// for profees
						slave.setActualConcnPer(billSlave.getConcessionOnPerc());
						slave.setActualDiscPer(billRecMaster.getTotalDisc());				
						// for profees
						
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
							// for profees
						}
										
						slave.setQuantity(billSlave.getQuantity());
						//slave.setRemain(0);
						slave.setCreatedBy(billRecMaster.getCreatedBy());
						slave.setCreatedDateTime(new Date());
						
						// to get only date from dateTime
						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
						System.err.println("date=="+billSlave.getCreatedDateTime());
						Date assignDate = sdf.parse(sdf.format(billSlave.getCreatedDateTime()));
			
						slave.setServiceAssignDate(assignDate);
						slave.setSourceTypeId(billRecMaster.getSourceTypeId());					
						slave.setDoctorId(billSlave.getDoctorId());
						slave.setServiceId(billSlave.getServiceId());
						slave.setSubServiceId(billSlave.getSubServiceId());
						slave.setConcession(billSlave.getConcession());
						slave.setBillDetailsId(billSlave.getBillDetailsId());
						
						if(slave.getServiceId()==1){
							
							compName="Registration Charges";
							
						}else if(slave.getServiceId()==2){
							
							compName="Consultation charges";
									
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
					billMaster.setSourceTypeId(billRecMaster.getSourceTypeId());
					billMaster.setSponsorCatId(billRecMaster.getSponsorCatId());
					
					billMaster.setPayeeTypeId(billRecMaster.getPayeeTypeId());
					billMaster.setPayeeMainId(billRecMaster.getPayeeMainId());
					billMaster.setPayeeLeafId(billRecMaster.getPayeeLeafId());
					
					// for profees
					billMaster.setActualAmt(totAmt);
					billMaster.setActualTotConcn(totDisc);
					billMaster.setActualPayable(totAmt-totDisc);
					billMaster.setActualDiscPer(billRecMaster.getTotalDisc());
					
					double payable=0;
					double amt=0;
					if(billRecMaster.getTotalDisc()>0){
						
						amt=((totAmt-totDisc)*billRecMaster.getTotalDisc())/100;
						payable=totAmt-totDisc-amt;
						billMaster.setTotalDisc(amt);
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
					billMaster.setFirstDisc(amt);
					billMaster.setFirstRemain(payable-billRecMaster.getTotalPaid());
					
					// Save Master list
					session.merge(billMaster);	
									
				}
				
				// Get max master id
				Criteria criteriaMax = session.createCriteria(OtherBillReceiptMasterDTO.class)
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
						/*if(billRecMaster.getPayMode()==cmnAdvcPaymodeId){
							Criteria criteria1 = session.createCriteria(CommonadvDto.class);
							criteria1.add(Restrictions.eq("patient_ID", patientId));
							//criteria1.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
							criteria1.add(Restrictions.eq("paidflag", "N"));
					    	criteria1.add(Restrictions.eq("deleted", "N"));
					    	criteria1.addOrder(Order.asc("commonadv_id"));
					    	List<CommonadvDto> listcdav	 = criteria1.list();
					    	//Session session = session;
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
									query.setParameter("pid",billRecMaster.getPatientId());
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
						    			query.setParameter("pid",billRecMaster.getPatientId());
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
						
					}*/
					
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
				getSlaveList(maxReceiptId,billRecMaster.getAgainstId(),listBillReceiptSlave,session);
				
				// Distrubute paid amount of slave of remain > 0
				if(distributeFlag==1){
										
					setOpdRecMasterSlave(maxReceiptId,billRecMaster.getAgainstId(),"paid",session);
				}	
			/*}*/			
			
			session.getTransaction().commit(); // commit the transaction
			session.close();
			
		} catch (Exception e) {
			
			e.printStackTrace();
			session.getTransaction().rollback();
			return 0;
		}
		
		return maxReceiptId;		
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	************/
	public int getSlaveList(int maxId,int againstId,List<OtherBillReceiptSlaveDTO> lstSlave,Session session){
		try{
			List<Integer> al=new ArrayList<Integer>();
			int billId=0,patId=0;
			String docIds="";
			for(OtherBillReceiptSlaveDTO slave:lstSlave){
				
				slave.setBillReceiptMasterId(maxId);
				al.add(slave.getBillDetailsId());
				session.merge(slave);					
				
				billId=slave.getBillId();
				patId=slave.getPatientId();
				//docIds =slave.getDoctorId()+",";
				
			}	
			
			if(againstId==0){	
				
				//doctor id in opd receipt master
				Criteria criteria = session.createCriteria(OtherBillReceiptSlaveDTO.class);
				criteria.add(Restrictions.eq("patientId", patId));
				//criteria.add(Restrictions.eq("billId", billId));		
				criteria.add(Restrictions.eq("billReceiptMasterId", maxId));
				criteria.setProjection( Projections.distinct( Projections.property("doctorId")));			
				@SuppressWarnings("unchecked")
				List<Integer> listDocs = (List<Integer>) criteria.list();
				if(listDocs.size()>0){
					
					for(Integer id:listDocs){
						
						docIds=docIds+id+",";
					}
					
					String exactDoctIds=docIds.substring(0,docIds.length()-1);
					
					OtherBillReceiptMasterDTO objMaster = (OtherBillReceiptMasterDTO) session.get(OtherBillReceiptMasterDTO.class, maxId);
					objMaster.setDoctorIds(exactDoctIds);
					//BillDetailsDto dto=new BillDetailsDto();
				}				
				
				for(int id:al){
					
					OtherBillingDto objectToUpdate = (OtherBillingDto) session.get(OtherBillingDto.class, id);
					objectToUpdate.setPaidFlag("Y");				
				}
			}		
			
		}catch (Exception e) {
			
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return 0;
		}				
		return 1;
	}
	
	public int setOpdRecMasterSlave(int maxRecId,int againstId,String callFrom,Session session) {
	       
        int result=0;
       
        try {           
            double mastTotAmt=0, mastTotPaid=0, mastPaidPer=0, mastTotConsn=0,mastConsnPer=0, mastPayable=0, mastTotDisc=0, mastDiscPer=0, mastFinalPayable=0, mastTotRemain=0, mastTotRefund=0;
            double slaveTotAmt=0, slaveTotPaid=0, slaveTotConsn=0, slavePayable=0, slaveTotDisc=0, slaveDiscPer=0, slaveFinalPayable=0, slaveTotRefund=0;
            int masterRecId=0;
           
            if(againstId > 0){
               
                // Calling stored procedure for get super master of receipt
                Query query2 = session.createSQLQuery("CALL fetchSuperReceiptIdOther (:receiptId)").setParameter("receiptId", maxRecId);
                masterRecId = (Integer) query2.uniqueResult();
                       
            }else{
               
                masterRecId=maxRecId;
            }
            //Get master receipt totals
            String sql="select * from ehat_receipt_master_other where bill_receipt_id="+masterRecId;
            Query recQuery = session.createSQLQuery(sql);
            recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> listRec = recQuery.list();
            for(Map<String, Object> row : listRec){
               
                mastTotAmt=(Double)row.get("actual_amt");
                mastTotConsn=(Double)row.get("actual_tot_concn");
                mastTotDisc=(Double)row.get("total_discount");
                mastTotPaid=(Double)row.get("total_paid");               
                mastTotRemain=(Double)row.get("total_remain");
                mastTotRefund=(Double)row.get("refund_amt");               
            }
            mastConsnPer=(mastTotConsn*100)/mastTotAmt;
            mastPayable=mastTotAmt-mastTotConsn;
            mastDiscPer=(mastTotDisc*100)/mastPayable;
            mastFinalPayable=mastPayable-mastTotDisc;
            mastPaidPer=(mastTotPaid*100)/mastFinalPayable;
                       
            sql="update ehat_receipt_master_other set actual_con_per="+mastConsnPer+", actual_payable ="+mastPayable+",actual_disc_per="+mastDiscPer+","
                    + "payable="+mastFinalPayable+" where bill_receipt_id = "+masterRecId;   
                Query recMastQuery = session.createSQLQuery(sql);
                recMastQuery.executeUpdate();   
           
            //Get slave receipt totals
            sql="select * from ehat_receipt_slave_other where bill_receipt_master_id="+masterRecId;
            Query slaveQuery = session.createSQLQuery(sql);
            slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> listRecSlave = slaveQuery.list();
            for(Map<String, Object> row : listRecSlave){
                           	
            	int slaveId=(Integer)row.get("bill_rec_slave_id");
                slaveTotAmt=(Double)row.get("actual_amt");
                slaveTotConsn=(Double)row.get("actual_concn_amt");
               
                slavePayable=slaveTotAmt-slaveTotConsn;
                slaveTotDisc=(slavePayable*mastDiscPer)/100;
                slaveFinalPayable=slavePayable-slaveTotDisc;
                slaveTotPaid=(slaveFinalPayable*mastPaidPer)/100;
                           
                sql="update ehat_receipt_slave_other set actual_payable ="+slavePayable+",actual_disc_per="+mastDiscPer+",actual_disc_amt="+slaveTotDisc+","
                        + "actual_final_payable="+slaveFinalPayable+",actual_final_paid="+slaveTotPaid+" where bill_rec_slave_id = "+slaveId;   
                    Query recSlaveQuery2 = session.createSQLQuery(sql);
                    recSlaveQuery2.executeUpdate();   
            }
                       
            result=1;
           
        } catch (Exception e) {
            e.printStackTrace();
           
        }
        return result;
    }
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	public int saveMultiPayMode(int maxId,OtherBillReceiptMasterDTO obj,List<MultiBillReceiptMasterDTO> lst,Session session){
		
		int result=0;
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
		}		
		return result;
	}
	
	
	@Override
	public OtherBillReceiptMasterDTO fetchAllReceiptTotals(
			OtherBillReceiptMasterDTO obj, String callFrom) {
		
		OtherBillReceiptMasterDTO masterObj=new OtherBillReceiptMasterDTO();
		int patId=obj.getPatientId();
		
		try {			
			
			String sql="";			
			double totAmt=0,totConcn=0,totDisc=0,totPaid=0,totRemain=0,totRefund=0;
			
			sql="select sum(amount) as totAmt,sum(concession) as totConcn FROM ehat_bill_details_other where deleted='N' and patient_id="+patId+" and cancle='N' ";
								
			Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			billDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")			
			List<Map<String, Object>> listBillDetails = billDetailsQuery.list();
			for(Map<String, Object> row : listBillDetails){
				
				totAmt=(Double)row.get("totAmt");
				totConcn=(Double)row.get("totConcn");				
			}
			
			sql="select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid," +
						"ifnull(sum(total_remain),0) as totRemain,ifnull(sum(refund_amt),0) as totRefund FROM ehat_receipt_master_other where deleted='N' and patient_id="+patId+" ";
				
			
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
			
			masterObj.setActualAmt(totAmt);
			masterObj.setActualTotConcn(totConcn);
			masterObj.setTotalDisc(totDisc);
			masterObj.setTotalPaid(totPaid);
			masterObj.setTotalRemain(totRemain);
			masterObj.setRefundAmt(totRefund);
					
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return null;
		}
		
		return masterObj;
	}

	@Override
	public OtherBillReceiptMasterDTO getBillReceiptDetails(
			OtherBillReceiptMasterDTO billRecMaster, String callFrom) {

		try {
			OtherBillReceiptMasterDTO billReceiptMasterObj = new OtherBillReceiptMasterDTO();
			List<OtherBillReceiptMasterDTO> blist = new ArrayList<OtherBillReceiptMasterDTO>();

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OtherBillReceiptMasterDTO.class);
			criteria.add(Restrictions.eq("patientId",billRecMaster.getPatientId()));
			
			// Added by BILAL
			int userId = billRecMaster.getCreatedBy();
			if (userId != 1) {
				criteria.add(Restrictions.eq("createdBy",billRecMaster.getCreatedBy()));
			}
			if (callFrom.equals("allForChk")) {

				criteria.add(Restrictions.eq("deleted", "N"));

			} else {

				if (callFrom.equals("cash")) {

					criteria.add(Restrictions.eq("totalRemain", 0.0));
					criteria.add(Restrictions.eq("deleted", "N"));
					// criteria.add(Restrictions.eq("receiptOf",
					// billRecMaster.getReceiptOf()));

				} else if (callFrom.equals("refundable")) {

					criteria.add(Restrictions.eq("deleted", "N"));
					criteria.add(Restrictions.eq("againstId", 0));
					// criteria.add(Restrictions.eq("receiptOf",
					// billRecMaster.getReceiptOf()));
				}

				else if (callFrom.equals("credit")) {

					criteria.add(Restrictions.gt("totalRemain", 0.0));
					criteria.add(Restrictions.eq("deleted", "N"));
					// criteria.add(Restrictions.eq("receiptOf",
					// billRecMaster.getReceiptOf()));

				} else if (callFrom.equals("refund")) {

					criteria.add(Restrictions.eq("refundFlag", "Y"));
					criteria.add(Restrictions.eq("deleted", "N"));
					// criteria.add(Restrictions.eq("receiptOf",
					// billRecMaster.getReceiptOf()));

				} else if (callFrom.equals("deleted")) {

					criteria.add(Restrictions.eq("deleted", "Y"));
					criteria.add(Restrictions.not(Restrictions.eq("totalAmt",
							0.0)));
					// criteria.add(Restrictions.eq("receiptOf",
					// billRecMaster.getReceiptOf()));

				} else {
					criteria.add(Restrictions.eq("deleted", "N"));
					// criteria.add(Restrictions.eq("receiptOf",
					// billRecMaster.getReceiptOf()));
				}
			}

			@SuppressWarnings("unchecked")
			List<OtherBillReceiptMasterDTO> listBillMaster = (List<OtherBillReceiptMasterDTO>) criteria.list();

			for (OtherBillReceiptMasterDTO billMaster : listBillMaster) {

				Criteria criteriaSlave = sessionFactory.getCurrentSession()
						.createCriteria(OtherBillReceiptSlaveDTO.class);
				criteriaSlave.add(Restrictions.eq("patientId",
						billRecMaster.getPatientId()));
				/*criteriaSlave.add(Restrictions.eq("billId",
						billRecMaster.getBillId()));*/
				criteriaSlave.add(Restrictions.eq("billReceiptMasterId",
						billMaster.getBillReceiptId()));
				criteriaSlave.add(Restrictions.eq("deleted", "N"));

				@SuppressWarnings("unchecked")
				List<OtherBillReceiptSlaveDTO> listBillReceiptSlave = criteriaSlave.list();
				billMaster.setListBillReceiptSlave(listBillReceiptSlave);
				blist.add(billMaster);
			}
			billReceiptMasterObj.setListBillReceiptMaster(listBillMaster);

			return billReceiptMasterObj;

		} catch (Exception e) {

			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return null;
		}
	}

	@Override
	public OtherBillingDto getTotalPayable(OtherBillingDto billRecMaster,
			String callFrom) {	
		
		int unitId=billRecMaster.getUnitId();
		int depId=billRecMaster.getDepartmentId();
		try {
				                  
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
			
	        OtherBillingDto billObj=new OtherBillingDto();
			List<OtherBillingDto> blist = new ArrayList<OtherBillingDto>();
			            
	       if(servIds2!=null){
	        					
	        	sql2="select amount,concession,other_amount,other_concession,service_id from ehat_bill_details_other where patient_id="+billRecMaster.getPatienttId()+" and deleted='N' and paid_flag='N' and cancle='N' and service_id in("+servIds2+") ";
			
	        }else{
				
				sql2="select amount,concession,other_amount,other_concession,service_id from ehat_bill_details_other where patient_id="+billRecMaster.getPatienttId()+" and deleted='N' and paid_flag='N' and cancle='N' ";
			}
	        
	        SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
	        query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        @SuppressWarnings("unchecked")
	    	List<Map<String, Object>> listBillMaster = query3.list();
			
	        for(Map<String, Object> row : listBillMaster){
	    		
	        	OtherBillingDto billMaster=new OtherBillingDto();
	        	billMaster.setAmount((Double)row.get("amount"));
	        	billMaster.setConcession((Double)row.get("concession"));
	        	billMaster.setOtherAmount((Double)row.get("other_amount"));
	        	billMaster.setOtherConcession((Double)row.get("other_concession"));    
	        	billMaster.setServiceId((Integer)row.get("service_id"));    
	        	blist.add(billMaster);
	    	}        
	       
			billObj.setListBillDetailsOther(blist);
			return billObj;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return null;
		}				
	}

	@Override
	public Integer saveRefundBillDetails(String servIdsChecked,
			Integer refDocId, OtherBillReceiptMasterDTO billRecMaster) {	
		
		Integer result=0;
		int againstId=billRecMaster.getAgainstId();
		Session session = sessionFactory.openSession(); // create session object from the session factory
		session.beginTransaction(); // initialize the transaction object from session
		int curRecId=getCurrentRecId("ehat_refund_master_other",session);
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
		
			Criteria criteriaRec = session.createCriteria(OtherBillReceiptMasterDTO.class);			
			criteriaRec.add(Restrictions.eq("patientId", billRecMaster.getPatientId()));			
			criteriaRec.setProjection(Projections.rowCount());
			long count = (Long)criteriaRec.uniqueResult();
			OtherBillRefundMasterDTO billMaster = new OtherBillRefundMasterDTO();
			if(count>0){
								
				double totalPaid=0,recPaid=0,recRefund=0,totalPayable=0,recPayable=0;
				Criteria criteriaAllDetails = session.createCriteria(OtherBillReceiptMasterDTO.class);			
				criteriaAllDetails.add(Restrictions.eq("patientId", billRecMaster.getPatientId()));	
				List<OtherBillReceiptMasterDTO> listAllDetails = (List<OtherBillReceiptMasterDTO>) criteriaAllDetails.list();
				for(OtherBillReceiptMasterDTO obj:listAllDetails){
					
					billId=obj.getBillId();
					departId=obj.getDepartmentId();
					patientId=obj.getPatientId();
					int recId=obj.getBillReceiptId();
					
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
				
				Criteria criteriaRef = session.createCriteria(OtherBillRefundMasterDTO.class);			
				criteriaRef.add(Restrictions.eq("patientId", billRecMaster.getPatientId()));			
				criteriaRef.setProjection(Projections.rowCount());
				long countRef = (Long)criteriaRef.uniqueResult();
				
				if(countRef>0){
					
					Criteria criteriaSum = session.createCriteria(OtherBillRefundMasterDTO.class);			
					criteriaSum.add(Restrictions.eq("patientId", billRecMaster.getPatientId()));
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
						/*OtherBillReceiptMasterDTO objectToUpdate = (OtherBillReceiptMasterDTO) session.get(OtherBillReceiptMasterDTO.class, againstId);
						objectToUpdate.setRefundFlag("Y");
						objectToUpdate.setRefundAmt(recRefund+billRecMaster.getTotalPaid());
						objectToUpdate.setReduction(billRecMaster.getTotalAmt()-billRecMaster.getTotalPaid());
						objectToUpdate.setActualRefAmt(recRefund+billRecMaster.getTotalPaid());
						objectToUpdate.setActualRefPer(billRecMaster.getActualRefPer());*/
						
						String sql="update ehat_receipt_master_other set refund_flag='Y',refund_amt="+(recRefund+billRecMaster.getTotalPaid())+",reduction="+(billRecMaster.getTotalAmt()-billRecMaster.getTotalPaid())+",actual_ref_amt="+(recRefund+billRecMaster.getTotalPaid())+" where bill_receipt_id = "+againstId;   
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
						billMaster.setReceiptStatus("paid");
						billMaster.setDeleted("N");
						billMaster.setRefundFlag("Y");
						billMaster.setPayMode(billRecMaster.getPayMode());
						billMaster.setbNumber(billRecMaster.getbNumber());
						billMaster.setbName(billRecMaster.getbName());
						billMaster.setTotalAmt(billRecMaster.getTotalAmt());
						billMaster.setTotalDisc(billRecMaster.getTotalDisc());
						billMaster.setTotalQty(1);
						billMaster.setTotalPaid(billRecMaster.getTotalPaid());// payable
						billMaster.setTotalRemain(billRecMaster.getTotalAmt()-(billRecMaster.getTotalPaid()+billRecMaster.getTotalDisc()));
						billMaster.setAgainstId(billRecMaster.getAgainstId());		
												
						// Save Refund Master list
						session.merge(billMaster);	
						
						// Get max master id
						Criteria criteriaMax = session.createCriteria(OtherBillRefundMasterDTO.class)
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
						billMaster.setReceiptStatus("paid");
						billMaster.setDeleted("N");
						billMaster.setRefundFlag("Y");
						billMaster.setPayMode(billRecMaster.getPayMode());
						billMaster.setbNumber(billRecMaster.getbNumber());
						billMaster.setbName(billRecMaster.getbName());
						billMaster.setTotalAmt(billRecMaster.getTotalAmt());
						billMaster.setTotalDisc(billRecMaster.getTotalDisc());
						billMaster.setTotalQty(1);
						billMaster.setTotalPaid(billRecMaster.getTotalPaid());// payable
						billMaster.setTotalRemain(billRecMaster.getTotalAmt()-(billRecMaster.getTotalPaid()+billRecMaster.getTotalDisc()));
						billMaster.setAgainstId(billRecMaster.getAgainstId());							
						// Save Refund Master list
						session.merge(billMaster);
						
						// Get max master id
						Criteria criteriaMax = session.createCriteria(OtherBillRefundMasterDTO.class)
								.setProjection(Projections.max("billRefundId"));
						result = (Integer) criteriaMax.uniqueResult();
						if (result == null) {
	
							result = -3;
						}
						
					}else{
						
						result=-1;
					}
				}
					
				//ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
				//int cmnAdvcPaymodeId =Integer.parseInt(resourceBundle.getObject("cmnAdvcPaymodeId").toString());
				// Save Multiple pay mode list
				/*if(billRecMaster.getPayMode()==cmnAdvcPaymodeId){
					
					// update credit flag of receipt which is against id
					CommonadvDto objectToUpdate = (CommonadvDto) session.get(BillReceiptMasterDTO.class, billRecMaster.getAgainstId());
					objectToUpdate.setCommonadv_amnt(billRecMaster.getTotalPaid());
					
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
				}*/
				
				//setOpdRecMasterSlave(billMaster,"Refund",session);
					
				//distributePaidBySlave(maxReceiptId, listBillReceiptSlave, totAmt, billRecMaster.getTotalPaid(),session);
				
				
			}else{
				
				result=-2;
			}		
			
			//setOpdRefMasterSlave(againstId,"refund",session);
	
			session.getTransaction().commit(); // commit the transaction
			session.close();
			
		} catch (Exception e) {
			
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			session.getTransaction().rollback();
			return 0;
		}
		
		return result;		
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
                           
                sql="update ehat_receipt_slave set actual_ref_amt="+slaveTotRefund+",actual_ref_per="+mastRefPer+" where bill_rec_slave_id="+slaveId;   
                Query recSlaveQuery2 = session.createSQLQuery(sql);
                recSlaveQuery2.executeUpdate();   
            }            
            
            result=1;
           
        } catch (Exception e) {
            e.printStackTrace();
           
        }
        return result;
    }	

	@Override
	public OtherBillRefundMasterDTO getBillRefundDetails(
			OtherBillRefundMasterDTO billRecMaster, String callFrom) {	
		
		try {
			OtherBillRefundMasterDTO billReceiptMasterObj=new OtherBillRefundMasterDTO();
			List<OtherBillRefundMasterDTO> blist = new ArrayList<OtherBillRefundMasterDTO>();
		
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OtherBillRefundMasterDTO.class);			
			criteria.add(Restrictions.eq("patientId", billRecMaster.getPatientId()));
			//criteria.add(Restrictions.eq("billId", billRecMaster.getBillId()));		
			criteria.add(Restrictions.eq("deleted", "N"));	
			//criteria.add(Restrictions.eq("receiptOf", billRecMaster.getReceiptOf()));
			criteria.add(Restrictions.eq("createdBy", billRecMaster.getCreatedBy()));	
			
			/*if(callFrom.equals("cash") || callFrom.equals("refundable")){
				
				criteria.add(Restrictions.eq("receiptStatus", "paid"));
			}else if(callFrom.equals("credit")){
				
				criteria.add(Restrictions.eq("receiptStatus", "unpaid"));
				
			}else if(callFrom.equals("refund")){
				
				criteria.add(Restrictions.eq("refundFlag", "Y"));
			}*/
		
		
		@SuppressWarnings("unchecked")
		List<OtherBillRefundMasterDTO> listBillMaster = (List<OtherBillRefundMasterDTO>) criteria.list();		
		
		/*for(OtherBillRefundMasterDTO billMaster:listBillMaster){
								
			Criteria criteriaSlave = sessionFactory.getCurrentSession().createCriteria(OtherBillRefundSlaveDTO.class);			
			criteriaSlave.add(Restrictions.eq("patientId", billRecMaster.getPatientId()));
			//criteriaSlave.add(Restrictions.eq("billId", billRecMaster.getBillId()));		
			criteriaSlave.add(Restrictions.eq("billReceiptMasterId", billMaster.getBillRefundId()));
			criteriaSlave.add(Restrictions.eq("deleted", "N"));
			
			@SuppressWarnings("unchecked")
			List<OtherBillRefundSlaveDTO> listBillRefundSlave  = criteriaSlave.list();					
			billMaster.setListBillRefundSlave(listBillRefundSlave);
			blist.add(billMaster);
		}*/ 
		billReceiptMasterObj.setListBillRefundMaster(listBillMaster);
					
		return billReceiptMasterObj;
		
		} catch (Exception e) {
		
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return null;
		}				
	}
	
	@Override
	public int getAppointPatientId(Integer appId){
		
		String sql="select ifnull(patient_id,0) FROM ehat_other_patient where appoint_id = "+appId;
		Query patIdQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
		Integer patientId = ((Number)patIdQuery.uniqueResult()).intValue();
		
		return patientId;
	}
}
