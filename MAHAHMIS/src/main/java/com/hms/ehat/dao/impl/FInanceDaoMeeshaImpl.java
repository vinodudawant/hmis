package com.hms.ehat.dao.impl;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.FinanceDaoMeesha;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.BillHistoryDTO;
import com.hms.ehat.dto.BillMasterAllTreat;
import com.hms.ehat.dto.BillRegReportMeeshaDTO;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.CommonadvDto;
import com.hms.ehat.dto.EhatBillReports;
import com.hms.ehat.dto.EhatOtherBillDetailForIpdDto;
import com.hms.ehat.dto.EhatOtherBillDetailForOpdDto;
import com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto;
import com.hms.ehat.dto.EhatViewPatientServiceDetailIpdDto;
import com.hms.ehat.dto.EhatViewPatientSubServiceDetailsIpdDto;
import com.hms.ehat.dto.FinanceBankMaster;
import com.hms.ehat.dto.GroupReceiptSlaveDetails;
import com.hms.ehat.dto.GroupwiseProfeesDto;
import com.hms.ehat.dto.IpdBreakupReportDTO;
import com.hms.ehat.dto.MaintainanceNoificationDTO;
import com.hms.ehat.dto.NotificationDTO;
import com.hms.ehat.dto.OpdDiagnoRecReportMeeshaDTO;
import com.hms.ehat.dto.OpdDiagnoReportBilllWiseDTO;
import com.hms.ehat.dto.OpdDiagnoReportMeeshaDTO;
import com.hms.ehat.dto.PharmacyDetailsOnBillingPrintDto;
import com.hms.ehat.dto.ProfeesDoctorsPaymentDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.ServiceMasterDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.dto.TreatmentServiceDetails;
import com.hms.ehat.service.AutosuggestionService;
import com.hms.ehat.service.LabService;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.BillReceiptSlaveDTO;
import com.hms.ipdbill.dto.BillRefundMasterDTO;
import com.hms.ipdbill.dto.IpdBillPatientsDTO;
import com.hms.utility.ApplicationContextUtils;

@Repository
public class FInanceDaoMeeshaImpl  implements FinanceDaoMeesha {

	@Autowired
	SessionFactory sessionFactory;
		
	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Get bill receipt details
	 ************/
	@SuppressWarnings("unchecked")
	public BillReceiptMasterDTO getReceiptFinance(BillReceiptMasterDTO obj, String callFrom,String fromDate,String toDate){	
					
		try {  
			
			BillReceiptMasterDTO billObj=new BillReceiptMasterDTO();
			List<BillReceiptMasterDTO> blist = new ArrayList<BillReceiptMasterDTO>();
			List<BillRefundMasterDTO> refList = new ArrayList<BillRefundMasterDTO>();
			
			int unitId = obj.getUnitId();
			int deptId = obj.getDepartmentId();
			int userId = 0;//obj.getCreatedBy(); 
			
			String sql2="";
			String sql3="";
								
			/*sql2="SELECT distinct r.patient_id,r.department_id,r.pay_mode,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_receipt_master_ipd r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
					"date(r.created_date_time) >= '"+fromDate+"' and date(r.cpublicreated_date_time) <= '"+toDate+"' and r.created_by = "+userId+" and r.department_id= "+deptId+" group by r.patient_id";*/
			
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
	
	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Get bill receipt details
	 ************/
	public BillRefundMasterDTO getRefundFinance(BillRefundMasterDTO obj, String callFrom,String fromDate,String toDate){	
		
		try {  
		
			BillRefundMasterDTO billObj=new BillRefundMasterDTO();
			List<BillRefundMasterDTO> blist = new ArrayList<BillRefundMasterDTO>();
			
			String sql2="";
			if(obj.getDepartmentId()==2){
				
				sql2="SELECT distinct r.patient_id,r.department_id,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_refund_master_ipd r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
						"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+obj.getCreatedBy()+" and r.department_id= "+obj.getDepartmentId()+" and r.unit_id="+obj.getUnitId()+" group by r.patient_id ";
			
			}else{
				
				sql2="SELECT distinct r.patient_id,r.department_id,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name FROM ehat_refund_master r join ehat_patient p ON (r.patient_id = p.patient_id) where " +
						"date(r.created_date_time) >= '"+fromDate+"' and date(r.created_date_time) <= '"+toDate+"' and r.created_by = "+obj.getCreatedBy()+" and r.department_id= "+obj.getDepartmentId()+" and r.unit_id="+obj.getUnitId()+" group by r.patient_id ";
			
			}
			
			SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
			query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listBillMaster = query3.list();
			
			for(Map<String, Object> row : listBillMaster){
			
				int pid=(Integer)row.get("patient_id");
				int depId=(Integer)row.get("department_id");
				
				BillRefundMasterDTO billMaster=new BillRefundMasterDTO();
				billMaster.setbName((String)row.get("patient_name"));            
				billMaster.setPatientId((Integer)row.get("patient_id"));            	
				
				
				if(obj.getPayMode()==0){
					
					for(int i=1;i<=5;i++){
						
						// Calling stored procedure
						Query query = sessionFactory.getCurrentSession().createSQLQuery("CALL getTotRefAmt (:uid,:paymode,:pid,:tblname,:fDate,:tDate)");
						query.setParameter("uid", obj.getCreatedBy());
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
					}   
				}else{					
					
					// Calling stored procedure
					Query query = sessionFactory.getCurrentSession().createSQLQuery("CALL getTotRefAmt (:uid,:paymode,:pid,:tblname,:fDate,:tDate)");
					query.setParameter("uid", obj.getCreatedBy());
					query.setParameter("paymode", obj.getPayMode());
					query.setParameter("pid", pid);
					if(depId==2){
						
						query.setParameter("tblname", "ehat_refund_master_ipd");
					}else{
						
						query.setParameter("tblname", "ehat_refund_master");
					}
											
					query.setParameter("fDate", fromDate);
					query.setParameter("tDate", toDate);
					double result = (Double) query.uniqueResult();
					    			
					billMaster.setTotalAmt(result);
					
					/*if(obj.getPayMode()==1)
						billMaster.setTotalAmt(result);  // for cash
					if(obj.getPayMode()==2)
						billMaster.setTotalPaid(result); // for card
					if(obj.getPayMode()==3)
						billMaster.setTotalRemain(result); // for cheque
					if(obj.getPayMode()==4)
						billMaster.setTotalDisc(result); // for common advance	*/				
				}			       	
				
				blist.add(billMaster);
			}        
			
			billObj.setListBillRefundMaster(blist);
			return billObj;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return null;
		}				
	}

	@Override
	public Integer saveFinaceBankDetails(String callFrom, FinanceBankMaster obj) {
		
		obj.setCreatedDateTime(new java.util.Date());
		sessionFactory.getCurrentSession().merge(obj);
		return 1;
	}

	@Override
	public FinanceBankMaster fetchFinanceBankDetails() {
		
		try { 
			FinanceBankMaster bankMaster=new FinanceBankMaster();
            List<FinanceBankMaster>	lstFinanceBankMaster=new ArrayList<FinanceBankMaster>();
    		
			Query query = sessionFactory.getCurrentSession().createSQLQuery("select id,bankId,accNo from FinanceBankMaster where deleted =:deleted");			
			query.setParameter("deleted", "N");
			lstFinanceBankMaster = query.list();
			
			bankMaster.setLstFinanceBankMaster(lstFinanceBankMaster);
			return bankMaster;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return null;
		}		
	}

	@Override
	public List<RegTreBillDto> fetchPatientsRecords(int unitId,int userId,String fDate,String tDate,Integer deptId) {
		
		List<RegTreBillDto> ltPatientRecord = null;
		try {
			/*RegistrationDto registrationDto = (RegistrationDto )sessionFactory.getCurrentSession()
                    .get(RegistrationDto.class, patientId);*/
			String sql="";
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.setTime(sdf.parse(tDate));
			c.add(Calendar.DATE, 1);  // number of days to add
			tDate = sdf.format(c.getTime());  // dt is now the new date
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RegTreBillDto.class);
			//criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.addOrder(Order.desc("unitId"));
			//criteria.add(Restrictions.eq("treatmentId", treatmentId));
			
			if(deptId==1 || deptId==2 || deptId==3)
			{
				criteria.add(Restrictions.eq("departmentId", deptId));
			}
			criteria.add(Restrictions.ge("createdDateTime", sdf.parse(fDate))); 
			criteria.add(Restrictions.le("createdDateTime", sdf.parse(tDate)));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.addOrder(Order.desc("treatmentId"));
			//criteria.setMaxResults(10);
			ltPatientRecord = criteria.list();
			for(RegTreBillDto obj:ltPatientRecord){
				
				if(obj.getChargesMasterSlaveId()>0){
					
					String sql1="select category_name as sponsor_name from ehat_charges_master_slave where id="+obj.getChargesMasterSlaveId();
					Query refQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
					obj.setImageName((String) refQuery1.uniqueResult());					
				}	
				
					if(deptId !=1){
					
					String sql1="select Hname as Hname from ehat_view_patient_bed_details_ipd where treatment_id="+obj.getTreatmentId()+" order by treatment_id desc limit 1";
					Query refQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
					obj.setBedName((String) refQuery1.uniqueResult());	
					String a=(String) refQuery1.uniqueResult();
					System.err.println("=--=--=--=-=-=--=-=-=-="+a);
				}
				
				
				if(obj.getDoctorId().length() > 0){
					
					String ar[]=obj.getDoctorId().split(",");
					String docName="";
					for(int i=0;i<ar.length;i++){
						
						sql="select doc_name as doctor_name from doctor where Doctor_ID="+ar[i];
						Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						docName=docName+(String) refQuery.uniqueResult()+",";
						//obj.setImageName((String) refQuery.uniqueResult());		
					}
					docName = docName.substring(0, docName.length()-1);
					obj.setAddress(docName);
					obj.setDocName(docName);
				}
				
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}

	@Override
	public List<RegTreBillDto> fetchIpdPatientsRecords(int unitId, int userId,
			String fDate, String tDate) {
		List<RegTreBillDto> ltPatientRecord = null;
		try {
			/*RegistrationDto registrationDto = (RegistrationDto )sessionFactory.getCurrentSession()
                    .get(RegistrationDto.class, patientId);*/
			String sql="";
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.setTime(sdf.parse(tDate));
			c.add(Calendar.DATE, 1);  // number of days to add
			tDate = sdf.format(c.getTime());  // dt is now the new date
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RegTreBillDto.class);
			//criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.addOrder(Order.desc("unitId"));
			//criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.add(Restrictions.ge("createdDateTime", sdf.parse(fDate))); 
			criteria.add(Restrictions.le("createdDateTime", sdf.parse(tDate)));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(Restrictions.eq("departmentId", 2));
			criteria.addOrder(Order.desc("treatmentId"));
			//criteria.setMaxResults(10);
			ltPatientRecord = criteria.list();
			for(RegTreBillDto obj:ltPatientRecord){
				
				if(obj.getChargesMasterSlaveId()>0){
					
					sql="select category_name as sponsor_name from ehat_charges_master_slave where id="+obj.getChargesMasterSlaveId();
					Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					obj.setImageName((String) refQuery.uniqueResult());		
				}	
				if(obj.getDoctorId().length() > 0){
					
					String ar[]=obj.getDoctorId().split(",");
					String docName="";
					for(int i=0;i<ar.length;i++){
						
						sql="select doc_name as doctor_name from doctor where Doctor_ID="+ar[i];
						Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						docName=docName+(String) refQuery.uniqueResult()+",";
						//obj.setImageName((String) refQuery.uniqueResult());		
					}
					docName = docName.substring(0, docName.length()-1);
					obj.setAddress(docName);					
				}
				
				sql="select total_bill,total_paid,total_remain from ehat_bill_master where treatment_id="+obj.getTreatmentId();
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
				refQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listBillDetails = refQuery.list();
				for(Map<String, Object> row : listBillDetails){
					
					obj.setTotBill((Double)row.get("total_bill"));
					obj.setTotPaid((Double)row.get("total_paid"));
					obj.setTotBal((Double)row.get("total_remain"));
				}
				
				/*sql="select hallName from ehat_view_ipd_bed_details_for_tid where treatId="+obj.getTreatmentId();
				Query bedQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				obj.setBedName((String) bedQuery.uniqueResult());	*/
				
				sql="select BedHall from ehat_view_patient_bed_details_ipd where treatment_id="+obj.getTreatmentId()+" and service_id = 3 limit 1";
				Query bedQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				obj.setBedName((String) bedQuery.uniqueResult());
				
				
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}

	@Override
	public NotificationDTO fetchNotifications() {
	
		NotificationDTO objNote=new NotificationDTO(); 
		List<NotificationDTO> lstNote=new ArrayList<NotificationDTO>();		
		
		// Final ipd bill notification
		lstNote.add(fetchFinalIpdBills());
		
		// expriry items
		  lstNote.add(fetchMaintainaceExpireItems());
        
		objNote.setLstNotify(lstNote);
        return objNote;
	}

	@Override
	public NotificationDTO fetchFinalIpdBills() {
		
		try {
			java.util.Calendar currentDate1 = java.util.Calendar.getInstance();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			String todays_date = formatter.format(currentDate1.getTime());	
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IpdBillPatientsDTO.class);			
			criteria.add(Restrictions.eq("invoiceFlag", "Y"));
			criteria.add(Restrictions.eq("deleted", "N"));			
			criteria.add(Restrictions.eq("invoiceDate", todays_date));
			
			@SuppressWarnings("unchecked")
			List<IpdBillPatientsDTO> listIpdPatients = (List<IpdBillPatientsDTO>) criteria.list();		
			
			NotificationDTO objNote=new NotificationDTO();
			objNote.setLogoClass("fa fa-thumbs-up  fa-fw");
			objNote.setMsgCount(listIpdPatients.size());
			objNote.setMsgText("Ipd Final Bills");
			objNote.setMsgUrl("final_ipd_bill.jsp");
			objNote.setNoteDate(new java.util.Date());
			objNote.setLstDetails(listIpdPatients);
			
			return objNote;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<OpdDiagnoReportMeeshaDTO> fetchOpdDiagnoPatients(int unitId,
			int userId, String fDate, String tDate) {
		
		List<OpdDiagnoReportMeeshaDTO> ltPatientRecord = new ArrayList<OpdDiagnoReportMeeshaDTO>();
		
		try {
			
			String sql = "select * from ehat_opd_receipt_slave_view_meesha where deleted='N' and date(bill_date_time) >= '"+fDate+"' and date(bill_date_time) <= '"+tDate+"'";
			Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listRec = recQuery.list();
			for(Map<String, Object> row : listRec){
				
				OpdDiagnoReportMeeshaDTO objMaster=new OpdDiagnoReportMeeshaDTO();				
				//objMaster.setBillNo(((BigInteger)row.get("rec_id")).intValue());
				objMaster.setBillId((Integer)row.get("bill_id"));
				objMaster.setBillDate((Date)row.get("bill_date_time"));	
				objMaster.setPatientName((String)row.get("patient_name"));
				objMaster.setMobile((String)row.get("mobile_no"));
				objMaster.setRefDr((String)row.get("ref_docName"));
				objMaster.setSourceName("walkin");
				objMaster.setBillAmt((Double)row.get("bill_amt"));
				objMaster.setPaidAmt((Double)row.get("paid_amt"));
				objMaster.setDiscount((Double)row.get("disc_amt"));
				objMaster.setConcession((Double)row.get("concession"));
				objMaster.setPrice((Double)row.get("rate"));
				objMaster.setQty((Double)row.get("quantity"));				
				objMaster.setAmount((Double)row.get("amount"));			
				objMaster.setRemainAmt(objMaster.getBillAmt()-(objMaster.getPaidAmt()+objMaster.getConcession()+objMaster.getDiscount()));				
				objMaster.setSourceGroup((String)row.get("service_name"));
				objMaster.setCategoryName((String)row.get("par_category_name"));
				objMaster.setServiceName((String)row.get("comp_name"));					
				objMaster.setTreatDr((String)row.get("doc_name"));
				objMaster.setUser((String)row.get("user_name"));								
				//objMaster.setAutheriseBy((String)row.get("rec_id"));
				objMaster.setSponsorName((String)row.get("sponsor_name"));	
				objMaster.setUnitName((String)row.get("unit_name"));	
				ltPatientRecord.add(objMaster);
				objMaster=null;
			}		

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}

	@Override
	public List<OpdDiagnoRecReportMeeshaDTO> fetchOpdDiagnoRec(int unitId,
			int userId, String fDate, String tDate,int payMode,String callFrom) {
		
		List<OpdDiagnoRecReportMeeshaDTO> ltPatientRecord = new ArrayList<OpdDiagnoRecReportMeeshaDTO>();
		try {
			String sql="";
			if(callFrom.equals("general")){
				
				sql=" SELECT IFNULL(CONCAT(p.prefix, ' ', p.f_name, ' ', p.m_name, ' ', p.l_name), '-') AS patient_name, r.bill_id AS bill_id, r.receipt_count AS rec_id, b.created_date_time AS bill_date_time, r.created_date_time AS created_date_time, r.deleted_date_time AS deleted_date_time, r.deleted AS deleted, IFNULL(CONCAT(un.title, ' ', un.f_name, ' ', un.m_name, ' ', un.l_name), '-') AS deleted_user_name, r.delete_remark AS delete_remark, r.treatment_id AS treatment_id, r.against_id AS against_id, r.pay_mode AS pay_mode, pay.pay_name AS pay_name, r.bank_number AS card_number, IFNULL(bnk.bank_name, '-') AS bank_name, r.first_paid AS rec_amount, IFNULL(t.referred_by, '-') AS referred_by, IFNULL(unt.unit_name, '-') AS unit_name, IFNULL(CONCAT(u.title, ' ', u.f_name, ' ', u.m_name, ' ', u.l_name), '-') AS user_name FROM ehat_receipt_master r LEFT JOIN ehat_patient p ON r.patient_id = p.patient_id LEFT JOIN ehat_bill_master b ON r.treatment_id = b.treatment_id LEFT JOIN ehat_treatment t ON r.treatment_id = t.treatment_id LEFT JOIN users u ON u.User_ID = r.created_by LEFT JOIN users un ON un.User_ID = r.deleted_by LEFT JOIN payment_master pay ON pay.pay_id = r.pay_mode LEFT JOIN pharma_bank_master bnk ON bnk.bank_id = r.bank_name LEFT JOIN ehat_unit_master unt ON unt.unit_id = r.unit_id WHERE r.deleted='N' AND date(r.created_date_time) >= '"+fDate+"' AND date(r.created_date_time) <= '"+tDate+"'";				
				if(payMode > 0){
					//sql = "select * from ehat_opd_receipt_master_view where deleted='N' and pay_mode = "+payMode+" and date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"'";
					sql=sql+" AND r.pay_mode = "+payMode+"";
				}
				
			}else{
				
				//sql=" SELECT IFNULL(CONCAT(p.prefix, ' ', p.f_name, ' ', p.m_name, ' ', p.l_name), '-') AS patient_name, r.bill_id AS bill_id, r.receipt_count AS rec_id, b.created_date_time AS bill_date_time, r.created_date_time AS created_date_time, r.deleted_date_time AS deleted_date_time, r.deleted AS deleted, IFNULL(CONCAT(un.title, ' ', un.f_name, ' ', un.m_name, ' ', un.l_name), '-') AS deleted_user_name, r.delete_remark AS delete_remark, r.treatment_id AS treatment_id, r.against_id AS against_id, r.pay_mode AS pay_mode, pay.pay_name AS pay_name, r.bank_number AS card_number, IFNULL(bnk.bank_name, '-') AS bank_name, r.first_paid AS rec_amount, IFNULL(t.referred_by, '-') AS referred_by, IFNULL(unt.unit_name, '-') AS unit_name, IFNULL(CONCAT(u.title, ' ', u.f_name, ' ', u.m_name, ' ', u.l_name), '-') AS user_name FROM ehat_receipt_master r LEFT JOIN ehat_patient p ON r.patient_id = p.patient_id LEFT JOIN ehat_bill_master b ON r.treatment_id = b.treatment_id LEFT JOIN ehat_treatment t ON r.treatment_id = t.treatment_id LEFT JOIN users u ON u.User_ID = r.created_by LEFT JOIN users un ON un.User_ID = r.deleted_by LEFT JOIN payment_master pay ON pay.pay_id = r.pay_mode LEFT JOIN pharma_bank_master bnk ON bnk.bank_id = r.bank_name LEFT JOIN ehat_unit_master unt ON unt.unit_id = r.unit_id WHERE r.deleted='Y' AND date(r.created_date_time) >= '"+fDate+"' AND date(r.created_date_time) <= '"+tDate+"'";				
				sql=" SELECT IFNULL(CONCAT(p.prefix, ' ', p.f_name, ' ', p.m_name, ' ', p.l_name), '-') AS patient_name, r.bill_id AS bill_id, r.receipt_count AS rec_id, b.created_date_time AS bill_date_time, r.created_date_time AS created_date_time, r.deleted_date_time AS deleted_date_time, r.deleted AS deleted, IFNULL(CONCAT(un.title, ' ', un.f_name, ' ', un.m_name, ' ', un.l_name), '-') AS deleted_user_name, r.delete_remark AS delete_remark, r.treatment_id AS treatment_id, r.against_id AS against_id, r.pay_mode AS pay_mode, pay.pay_name AS pay_name, r.bank_number AS card_number, IFNULL(bnk.bank_name, '-') AS bank_name, r.first_paid AS rec_amount, IFNULL(t.referred_by, '-') AS referred_by, IFNULL(unt.unit_name, '-') AS unit_name, IFNULL(CONCAT(u.title, ' ', u.f_name, ' ', u.m_name, ' ', u.l_name), '-') AS user_name FROM ehat_receipt_master r LEFT JOIN ehat_patient p ON r.patient_id = p.patient_id LEFT JOIN ehat_bill_master b ON r.treatment_id = b.treatment_id LEFT JOIN ehat_treatment t ON r.treatment_id = t.treatment_id LEFT JOIN users u ON u.User_ID = r.created_by LEFT JOIN users un ON un.User_ID = r.deleted_by LEFT JOIN payment_master pay ON pay.pay_id = r.pay_mode LEFT JOIN pharma_bank_master bnk ON bnk.bank_id = r.bank_name LEFT JOIN ehat_unit_master unt ON unt.unit_id = r.unit_id WHERE r.deleted='Y' AND date(r.deleted_date_time) >= '"+fDate+"' AND date(r.deleted_date_time) <= '"+tDate+"'";
				if(payMode > 0){
					//sql = "select * from ehat_opd_receipt_master_view where deleted='Y' and pay_mode = "+payMode+" and date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"'";
					sql=sql+" AND r.pay_mode = "+payMode+"";
				}				
			}
			System.out.println(sql);		
			Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listRec = recQuery.list();
			System.out.println("size   "+recQuery.list().size());
			
			for(Map<String, Object> row : listRec){
				
				OpdDiagnoRecReportMeeshaDTO objMaster=new OpdDiagnoRecReportMeeshaDTO();				
				objMaster.setRecNo((Integer)row.get("rec_id"));
				objMaster.setRecDate((Date)row.get("created_date_time"));				
				objMaster.setRecAmt((Double)row.get("rec_amount"));
				objMaster.setCardChqNo((String)row.get("card_number"));		
				if((Integer)row.get("pay_mode") == -1){
					objMaster.setPayMode("Multiple");	
				}else{
					objMaster.setPayMode((String)row.get("pay_name"));	
				}	
				
				objMaster.setBank((String)row.get("bank_name"));	
				objMaster.setBillId((Integer)row.get("bill_id"));
				objMaster.setBillDate((Date)row.get("bill_date_time"));	
				objMaster.setPatientName((String)row.get("patient_name"));
				objMaster.setSource((String)row.get("referred_by"));
				objMaster.setUser((String)row.get("user_name"));	
				objMaster.setDeletedDate((Date)row.get("deleted_date_time"));	
				objMaster.setDeletedBy((String)row.get("deleted_user_name"));	
				objMaster.setDeletedRemark((String)row.get("delete_remark"));
				/*objMaster.setUnitName((String)row.get("unit_name"));
				*/
				ltPatientRecord.add(objMaster);
				objMaster=null;
			}			

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}

	@Override
	public List<BillRegReportMeeshaDTO> getBillRegisterReport(int unitId,
			int userId, String fDate, String tDate,int source,int sponsorId,int sponsorF,int sponsorL) {
		
		List<BillRegReportMeeshaDTO> ltPatientRecord = new ArrayList<BillRegReportMeeshaDTO>();		
		try {			
			
			//String sql = "select * from ehat_opd_bill_view where deleted='N' and date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"'";
			String sql="SELECT p.patient_id AS patient_id,r.bill_id AS bill_id,r.treatment_id AS treatment_id,r.created_date_time AS created_date_time,r.deleted AS deleted,CONCAT(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.mobile AS mobile_no,GROUP_CONCAT(IFNULL(d.doc_name, 'NONE')SEPARATOR ',') AS doc_name,GROUP_CONCAT(IFNULL(s.category_name, 'REGISTRATION')SEPARATOR ',') AS service_name,IFNULL(cm.category_name, '-') AS sponsor_name,IF((r.charges_slave_id > 0),IFNULL(SUM(r.other_amount), 0),IFNULL(SUM(r.amount), 0)) AS bill_amt,IFNULL(t.referred_by, '-') AS source_by,IFNULL(cd.docName, '-') AS ref_docName,IFNULL(unt.unit_name, '-') AS unit_name,CONCAT(u.title,' ',u.f_name,' ',u.m_name,' ',u.l_name) AS user_name "
					+ "FROM ehat_bill_details r LEFT JOIN ehat_patient p ON r.patient_id = p.patient_id "
					+ "LEFT JOIN ehat_treatment t ON r.treatment_id = t.treatment_id "
					+ "LEFT JOIN users u ON u.User_ID = r.created_by LEFT JOIN doctor d ON d.Doctor_ID = r.doctor_id "
					+ "LEFT JOIN ehat_subservice s ON s.id = r.sub_service_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = t.ref_doc_id "
					+ "LEFT JOIN ehat_charges_master_slave cm ON cm.id = r.charges_slave_id "
					+ "LEFT JOIN ehat_unit_master unt ON unt.unit_id = r.unit_id "
					+ "WHERE r.cancle = 'N' AND r.deleted = 'N' AND date(r.created_date_time) >= '"+fDate+"' AND date(r.created_date_time) <= '"+tDate+"'"
					+ "GROUP BY r.treatment_id";
			Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listRec = recQuery.list();
			for(Map<String, Object> row : listRec){
				
				BillRegReportMeeshaDTO objMaster=new BillRegReportMeeshaDTO();				
				Double toatAmt = (Double)row.get("bill_amt");
				double totPaid = 0;
				double totDisc = 0;					
				
				objMaster.setRecNo((Integer)row.get("bill_id"));				
				objMaster.setRecDate((Date)row.get("created_date_time"));
				objMaster.setPatientName((String)row.get("patient_name"));
				objMaster.setMobile((String)row.get("mobile_no"));
				objMaster.setDrName((String)row.get("doc_name"));
	            objMaster.setServiceName((String)row.get("service_name"));				
				objMaster.setTotAmt(toatAmt);				
				
				sql="select  ifnull(sum(total_paid),0) as total_paid, ifnull(sum(total_discount),0) as total_discount from ehat_receipt_master where treatment_id = "+(Integer)row.get("treatment_id")+" and against_id = 0 and deleted='N' ";
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
	            query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	            @SuppressWarnings("unchecked")
	        	List<Map<String, Object>> listBillMaster = query.list();							
	            for(Map<String, Object> r : listBillMaster){
	            	
	            	totPaid = (Double)r.get("total_paid");
	            	totDisc = (Double)r.get("total_discount");	            	           	
	            }
				
	            objMaster.setDiscAmt(totDisc);
				objMaster.setPaidAmt(totPaid);
				objMaster.setRemainAmt(toatAmt - (totPaid + totDisc));
				objMaster.setPayInstall(totPaid);
				objMaster.setGstAmt(0);
				objMaster.setSource((String)row.get("source_by"));
				objMaster.setRefDr((String)row.get("ref_docName"));
				objMaster.setSponsorName((String)row.get("sponsor_name"));		
				objMaster.setUnitName((String)row.get("unit_name"));		
				
				ltPatientRecord.add(objMaster);
				objMaster=null;
			}			

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
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

	@Override
	public List<BillRegReportMeeshaDTO> getOutstandingReport(int unitId, int userId,
			String fDate, String tDate) {
		
		List<BillRegReportMeeshaDTO> ltPatientRecord = new ArrayList<BillRegReportMeeshaDTO>();
		String sqlD = "";
		try {		
			
			String sql="select * from ehat_opd_outstanding_view_meesha where deleted = 'N' and total_remain > 0 and date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"'";
			
			Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listRec = recQuery.list();
			for(Map<String, Object> row : listRec){
				
				BillRegReportMeeshaDTO objMaster=new BillRegReportMeeshaDTO();				
				
				objMaster.setBillNo((Integer)row.get("bill_id"));				
				objMaster.setBillDate((Date)row.get("created_date_time"));
				objMaster.setPatientName((String)row.get("patient_name"));
				objMaster.setMobile((String)row.get("mobile_no"));
				objMaster.setSource((String)row.get("referred_by"));				
				objMaster.setUserName((String)row.get("user_name"));	
				objMaster.setTotAmt((Double)row.get("total_bill"));							
				objMaster.setRemainAmt((Double)row.get("total_remain"));				
				objMaster.setGstAmt(0);
				
				sqlD = "select ifnull(group_concat(r.disc_remark separator ','),'-') AS disc_remark,ifnull(group_concat(d.doc_name separator ','),'-') AS doc_name "
					   +"from ((ehat_receipt_master r) left join doctor d ON ((d.Doctor_ID = r.disc_givenby))) where r.deleted='N' and r.treatment_id = "+(Integer)row.get("treatment_id");
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlD);				
				refQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listBillDetails = refQuery.list();
				for(Map<String, Object> r : listBillDetails){
					objMaster.setAuthority((String)r.get("doc_name"));
					objMaster.setRemark((String)r.get("disc_remark"));	
				}
				
				objMaster.setSponsorName((String)row.get("sponsor_name"));	
				objMaster.setUnitName((String)row.get("unit_name"));	
				
				ltPatientRecord.add(objMaster);
				objMaster=null;
			}			
			
		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}

	@Override
	public List<RegTreBillDto> getIpdBillStatus(int unitId, int userId,
			String fDate, String tDate) {
		List<RegTreBillDto> ltPatientRecord = null;
		try {
			/*RegistrationDto registrationDto = (RegistrationDto )sessionFactory.getCurrentSession()
                    .get(RegistrationDto.class, patientId);*/
			String sql="";
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.setTime(sdf.parse(tDate));
			c.add(Calendar.DATE, 1);  // number of days to add
			tDate = sdf.format(c.getTime());  // dt is now the new date
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RegTreBillDto.class);
			//criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.addOrder(Order.desc("unitId"));
			//criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.add(Restrictions.ge("createdDateTime", sdf.parse(fDate))); 
			criteria.add(Restrictions.le("createdDateTime", sdf.parse(tDate)));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(Restrictions.eq("departmentId", 2));
			criteria.addOrder(Order.desc("treatmentId"));
			//criteria.setMaxResults(10);
			ltPatientRecord = criteria.list();
			for(RegTreBillDto obj:ltPatientRecord){
				
				if(obj.getChargesMasterSlaveId()>0){
					
					sql="select category_name as sponsor_name from ehat_charges_master_slave where id="+obj.getChargesMasterSlaveId();
					Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					obj.setImageName((String) refQuery.uniqueResult());		
				}	
				if(obj.getDoctorId().length() > 0){
					
					String ar[]=obj.getDoctorId().split(",");
					String docName="";
					for(int i=0;i<ar.length;i++){
						
						sql="select doc_name as doctor_name from doctor where Doctor_ID="+ar[i];
						Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						docName=docName+(String) refQuery.uniqueResult()+",";
						//obj.setImageName((String) refQuery.uniqueResult());		
					}
					docName = docName.substring(0, docName.length()-1);
					obj.setAddress(docName);					
				}
				
				sql="select total_bill,total_paid,total_remain,discount from ehat_bill_master where treatment_id="+obj.getTreatmentId();
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
				refQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listBillDetails = refQuery.list();
				for(Map<String, Object> row : listBillDetails){
					
					obj.setTotBill((Double)row.get("total_bill"));
					obj.setTotPaid((Double)row.get("total_paid"));
					obj.setTotBal((Double)row.get("total_remain"));
					obj.setTotDisc((Double)row.get("discount"));
				}
				
				/*sql="select hallName from ehat_view_ipd_bed_details_for_tid where treatId="+obj.getTreatmentId();
				Query bedQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				obj.setBedName((String) bedQuery.uniqueResult());*/
				
				sql="select BedHall from ehat_view_patient_bed_details_ipd where treatment_id="+obj.getTreatmentId()+" and service_id = 3 limit 1";
				Query bedQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				obj.setBedName((String) bedQuery.uniqueResult());
				
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}
	
	@Override
	public List<RegTreBillDto> getIpdWaitingBill(int unitId, int userId,String fDate, String tDate) {
		List<RegTreBillDto> ltPatientRecord = new ArrayList<RegTreBillDto>();
		List<String> ltDtDetails = new ArrayList<String>();
		try {
			
			String sql="";
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.setTime(sdf.parse(tDate));
			c.add(Calendar.DATE, 1);  // number of days to add
			tDate = sdf.format(c.getTime());  // dt is now the new date
			
			sql="SELECT distinct(date(created_date_time)) as dnctDates FROM patient_records_details where invoice_flag='Y' and date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"'";
			Query dtQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
			dtQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")			
			List<Map<String, Object>> listDtDetails = dtQuery.list();
			for(Map<String, Object> row : listDtDetails){
				
				Date dt=(Date)row.get("dnctDates");				
				Date date = new Date(dt.getTime());  
                DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");  
                String strDate = dateFormat.format(date);  				
				ltDtDetails.add(strDate);
			}
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RegTreBillDto.class);
			//criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.addOrder(Order.desc("unitId"));
			//criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.add(Restrictions.ge("createdDateTime", sdf.parse(fDate))); 
			criteria.add(Restrictions.le("createdDateTime", sdf.parse(tDate)));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(Restrictions.eq("departmentId", 2));
			criteria.add(Restrictions.eq("invoiceFlag", "Y"));
			criteria.addOrder(Order.asc("createdDateTime"));		
			//criteria.setMaxResults(10);
			ltPatientRecord = criteria.list();
			for(RegTreBillDto obj:ltPatientRecord){
				
				if(obj.getChargesMasterSlaveId()>0){
					
					sql="select category_name as sponsor_name from ehat_charges_master_slave where id="+obj.getChargesMasterSlaveId();
					Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					obj.setImageName((String) refQuery.uniqueResult());		
				}	
				
				sql="select total_bill,total_paid,total_remain from ehat_bill_master where treatment_id="+obj.getTreatmentId();
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
				refQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listBillDetails = refQuery.list();
				for(Map<String, Object> row : listBillDetails){
					
					obj.setTotBill((Double)row.get("total_bill"));
					obj.setTotPaid((Double)row.get("total_paid"));
					obj.setTotBal((Double)row.get("total_remain"));
				}	
				
				String recCount="select ifnull(count(bill_receipt_id),0) from ehat_receipt_master_ipd where deleted='N' and treatment_id="+obj.getTreatmentId();
				Query recCountQuery = sessionFactory.getCurrentSession().createSQLQuery(recCount);
				int count = ((Number)recCountQuery.uniqueResult()).intValue();
	        	
				if(count>0){
					
					sql="select created_date_time from ehat_receipt_master_ipd where treatment_id="+obj.getTreatmentId()+" and bill_receipt_id = (select MIN(bill_receipt_id) from ehat_receipt_master_ipd where treatment_id = "+obj.getTreatmentId()+")";
					Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					obj.setRecCreatedDateTime((Date) recQuery.uniqueResult());
					
					obj.setToken(count);
				}else{
					
					obj.setToken(0);
					obj.setRecCreatedDateTime(new Date());
				}
				
				obj.setListDistDates(ltDtDetails);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}
	
	@Override
	public List<EhatBillReports> getHeadwiseReport(int unitId, int userId,String fDate, String tDate,int servId) {
		
		List<EhatBillReports> ltPatientRecord = new ArrayList<EhatBillReports>();
		List<Integer> ltServ = new ArrayList<Integer>();
		List<String> ltServNames = new ArrayList<String>();
		try {
			
			String sql="";
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.setTime(sdf.parse(tDate));
			c.add(Calendar.DATE, 1);  // number of days to add
			tDate = sdf.format(c.getTime());  // dt is now the new date
			
			
			if(servId > 0){
				
				ltServ.add(servId);
				sql="select service_name from ehat_service_master where service_id="+servId;
				Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				ltServNames.add((String) spQuery.uniqueResult());
			}else{
				
				sql="select distinct(service_id) from ehat_bill_details_ipd where date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"' order by service_id";
				Query servQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
				servQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listServDetails = servQuery.list();
				for(Map<String, Object> row : listServDetails){
					
					ltServ.add((Integer)row.get("service_id"));
					
					sql="select service_name from ehat_service_master where service_id="+(Integer)row.get("service_id");
					Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					ltServNames.add((String) spQuery.uniqueResult());
				}
			}
			
			
			sql="select * from ehat_bill_details_ipd where date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"' order by service_id";
			Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
			refQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")			
			List<Map<String, Object>> listBillDetails = refQuery.list();
			for(Map<String, Object> row : listBillDetails){
						
				EhatBillReports obj=new EhatBillReports();
				
				obj.setServId((Integer)row.get("service_id"));
				
				sql="select trcount from ehat_treatment where treatment_id="+(Integer)row.get("treatment_id");
				Query ipdnoQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				obj.setIpdno((String) ipdnoQuery.uniqueResult());
				
				sql="select concat(prefix,' ',f_name,' ',m_name,' ',l_name) as patient_name from ehat_patient where patient_id="+(Integer)row.get("patient_id");
				Query patQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				obj.setPatientName((String) patQuery.uniqueResult());
				
				int spId=(Integer)row.get("charges_slave_id");
				if(spId>0){
					
					sql="select category_name as sponsor_name from ehat_charges_master_slave where id="+spId;
					Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					obj.setPatientType((String) spQuery.uniqueResult());	
					
					obj.setCharges((Double)row.get("other_amount"));
				}else{
					
					obj.setPatientType("Hospital");
					obj.setCharges((Double)row.get("amount"));
				}
							
	            int drId=(Integer)row.get("doctor_id");
	            if(drId>0){
	            		
	            		sql="select ifnull(doc_name,'-') from doctor where Doctor_ID="+drId;
	            		Query treatDr = sessionFactory.getCurrentSession().createSQLQuery(sql);
	            		obj.setDoctorName((String) treatDr.uniqueResult());	            		
	            }else{
	            	
	            	obj.setDoctorName("-");	
	            }
	            
	            obj.setLstServIds(ltServ);
	            obj.setLstServNames(ltServNames);            
	            ltPatientRecord.add(obj);
	            obj=null;
			}		
			
		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}

	@Override
	public List<BillRegReportMeeshaDTO> getPatientTypeWiseIpdBill(int unitId,
			int userId, String fDate, String tDate,int source,int sponsorId,int sponsorF,int sponsorL) {
		
		List<BillRegReportMeeshaDTO> ltPatientRecord = new ArrayList<BillRegReportMeeshaDTO>();
		List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
	
		try {
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.setTime(sdf.parse(tDate));
			c.add(Calendar.DATE, 1);  // number of days to add
			tDate = sdf.format(c.getTime());  // dt is now the new date
			
			String spId="";	
			String exactSpIds="";
			ArrayList<Integer> al=new ArrayList<Integer>();
			if (sponsorL > 0) {
				List<ChargesMasterSlave> list=getSponsorList2( sponsorF,sponsorL);
				for (int i = 0; i < list.size(); i++) {
					
					al.add(list.get(i).getSlaveId());	
					spId=spId+list.get(i).getSlaveId()+",";
				}
			}
			if(al.size()>0){
				
				exactSpIds=spId.substring(0,spId.length()-1);
			}
			
			String sql="";
			
			/*sql="select distinct(patient_id) from ehat_bill_details_ipd where date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"' ";
			Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			//int  (String) spQuery.uniqueResult()); */
			
			if(source==-1){
				
				sql="select distinct(patient_id) from ehat_bill_details_ipd where date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"' ";
			}else if(source==0){
				
				sql="select distinct(patient_id) from ehat_bill_details_ipd where date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"' and sponsor_cat_id=0  ";				
			
			}else if(source==1){
							
				if(al.size()>0){
					
					sql="select distinct(patient_id) from ehat_bill_details_ipd where date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"' and sponsor_cat_id in("+exactSpIds+") ";				
					
				}else if(sponsorL > 0 && al.size() == 0){
					
					sql="select distinct(patient_id) from ehat_bill_details_ipd where date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"' and sponsor_cat_id=0 and source_type_id=1 ";				
				}
			}
			Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
			refQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")			
			List<Map<String, Object>> listBillDetails = refQuery.list();
			for(Map<String, Object> row : listBillDetails){
						
				BillRegReportMeeshaDTO obj=new BillRegReportMeeshaDTO();
				
				sql="select sum(amount) as totAmt,sum(other_amount) as otherTotAmt,sum(concession) as totConcn,sum(other_concession) as otherTotConcn,charges_slave_id,bill_id,created_date_time FROM ehat_bill_details_ipd where deleted='N' and patient_id="+(Integer)row.get("patient_id")+" and cancle='N' ";
				Query amtQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
				amtQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listAmtDetails = amtQuery.list();
				for(Map<String, Object> row2 : listAmtDetails){
							
					int spsnId=(Integer)row2.get("charges_slave_id");
					
					if(spsnId > 0){
						
						obj.setTotAmt((Double)row2.get("otherTotAmt"));
						obj.setDiscAmt((Double)row2.get("otherTotConcn"));
						
						AutosuggestionService objSp=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
						fetchsposor = objSp.fetchSuperCatofchargesSlave(spsnId);						
						obj.setSource(fetchsposor.get(0).getCategoryName());
						
						LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
						String spLeafName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",spsnId,"id");
						obj.setSponsorLeaf(spLeafName);
						
					}else{
						
						obj.setTotAmt((Double)row2.get("totAmt"));
						obj.setDiscAmt((Double)row2.get("totConcn"));
						obj.setSource("Hospital");
						obj.setSponsorLeaf("Self Paying");
					}	
					
					//obj.setBillNo((Integer)row2.get("bill_id"));
					obj.setBillDate((Date)row2.get("created_date_time"));
				}
				
				sql="select count(bill_receipt_id) as recId FROM ehat_receipt_master_ipd where deleted='N' and patient_id="+(Integer)row.get("patient_id");
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				int count = ((Number)countQuery.uniqueResult()).intValue();
					
				if(count>0){
					
					sql="select sum(total_paid) as totAmt FROM ehat_receipt_master_ipd where deleted='N' and patient_id="+(Integer)row.get("patient_id");
					Query paidQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					obj.setPaidAmt((Double) paidQuery.uniqueResult());	
				}else{
					
					obj.setPaidAmt(0);	
				}			
				
				obj.setRemainAmt(obj.getTotAmt()-obj.getPaidAmt());
				
				sql="select concat(prefix,' ',f_name,' ',m_name,' ',l_name) as patient_name from ehat_patient where patient_id="+(Integer)row.get("patient_id");
				Query patQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				obj.setPatientName((String) patQuery.uniqueResult());
				
				/*sql="select invoice_count as billId FROM ehat_bill_master where deleted='N' and invoice_flag='Y' and patient_id="+(Integer)row.get("patient_id");
				Query billQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				int billId = ((Number)billQuery.uniqueResult()).intValue();				
				obj.setBillNo(billId);*/
							
				ltPatientRecord.add(obj);			
				obj=null;
			}			

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}
	
	
	@Override
	public List<BillRegReportMeeshaDTO> getIpdBillDiscountRegister(int unitId,
			int userId, String fDate, String tDate) {
		
		List<BillRegReportMeeshaDTO> ltPatientRecord = new ArrayList<BillRegReportMeeshaDTO>();
	
		try {
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.setTime(sdf.parse(tDate));
			c.add(Calendar.DATE, 1);  // number of days to add
			tDate = sdf.format(c.getTime());  // dt is now the new date
			
			String sql="select distinct(patient_id) from ehat_ipdbill_discount where date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"' ";
			Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
			refQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")			
			List<Map<String, Object>> listBillDetails = refQuery.list();
			for(Map<String, Object> row : listBillDetails){
						
				BillRegReportMeeshaDTO obj=new BillRegReportMeeshaDTO();
				double totDisc=0;
				
				sql="select sum(amount) as totAmt,sum(other_amount) as otherTotAmt,sum(concession) as totConcn,sum(other_concession) as otherTotConcn,charges_slave_id,bill_id,created_date_time FROM ehat_bill_details_ipd where deleted='N' and patient_id="+(Integer)row.get("patient_id")+" and cancle='N' ";
				Query amtQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
				amtQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listAmtDetails = amtQuery.list();
				for(Map<String, Object> row2 : listAmtDetails){
										
					if((Integer)row2.get("charges_slave_id")>0){
						
						obj.setTotAmt((Double)row2.get("otherTotAmt"));						
						totDisc=(Double)row2.get("otherTotConcn");
						
						sql="select category_name as sponsor_name from ehat_charges_master_slave where id="+(Integer)row2.get("charges_slave_id");
						Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						obj.setSource((String) spQuery.uniqueResult());
						
					}else{
						
						obj.setTotAmt((Double)row2.get("totAmt"));						
						obj.setSource("Self Paying");
						totDisc=(Double)row2.get("totConcn");
					}	
					
					obj.setBillNo((Integer)row2.get("bill_id"));
					//obj.setBillDate((Date)row2.get("created_date_time"));
				}
				
				sql="select invoice_count FROM ehat_bill_master where deleted='N' and patient_id="+(Integer)row.get("patient_id")+" limit 1";
				Query billQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				obj.setBillNo((Integer) billQuery.uniqueResult());
				
				/*sql="select count(bill_discount_id) as recId FROM ehat_ipdbill_discount where deleted='N' and patient_id="+(Integer)row.get("patient_id");
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				int count = ((Number)countQuery.uniqueResult()).intValue();
					
				if(count>0){*/
					
					sql="select sum(approved_amt) as totAmt FROM ehat_ipdbill_discount where deleted='N' and patient_id="+(Integer)row.get("patient_id");
					Query paidQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					totDisc=totDisc+(Double) paidQuery.uniqueResult();	
					
					sql="select max(disc_Auth) FROM ehat_ipdbill_discount where deleted='N' and patient_id="+(Integer)row.get("patient_id");
					Query narQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					int conGivenId = (Integer) narQuery.uniqueResult();
					
					sql="select ifnull(doc_name,'-') FROM doctor where Doctor_ID="+conGivenId;
					Query conGivenQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					obj.setConGivenBy((String) conGivenQuery.uniqueResult());
					
					sql="select ifnull(max(disc_narrarion),0)FROM ehat_ipdbill_discount where deleted='N' and patient_id="+(Integer)row.get("patient_id");
					Query discNarQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					int narId = Integer.parseInt((String) discNarQuery.uniqueResult());
					
					sql="select narr_name FROM narration_master where narr_id="+narId;
					Query conCatQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					obj.setConCategory((String) conCatQuery.uniqueResult());					
					
					sql="select max(disc_remark) FROM ehat_ipdbill_discount where deleted='N' and patient_id="+(Integer)row.get("patient_id");
					Query remarkQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					obj.setRemark((String) remarkQuery.uniqueResult());
					
					sql="select max(created_by) FROM ehat_ipdbill_discount where deleted='N' and patient_id="+(Integer)row.get("patient_id");
					Query userQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					int uId = (Integer)userQuery.uniqueResult();
					
					sql="select doc_name FROM doctor where Doctor_ID="+uId;
					Query userNameQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					obj.setUserName((String) userNameQuery.uniqueResult());
				/*}else{
					
					obj.setConGivenBy("-");
					obj.setConCategory("-");
					obj.setRemark("-");
					obj.setUserName("-");
				}*/
					
				
				obj.setDiscAmt(totDisc);
				
				sql="select concat(prefix,' ',f_name,' ',m_name,' ',l_name) as patient_name from ehat_patient where patient_id="+(Integer)row.get("patient_id");
				Query patQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				obj.setPatientName((String) patQuery.uniqueResult());
							
				ltPatientRecord.add(obj);			
				obj=null;
			}			

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}

	@Override
	public List<BillRegReportMeeshaDTO> getBillEstimateReport(int unitId, int userId,
			String fDate, String tDate) {
		
		List<BillRegReportMeeshaDTO> ltPatientRecord = new ArrayList<BillRegReportMeeshaDTO>();
	
		try {
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.setTime(sdf.parse(tDate));
			c.add(Calendar.DATE, 1);  // number of days to add
			tDate = sdf.format(c.getTime());  // dt is now the new date
			
			String sql="select distinct(patient_id) from ehat_bill_details_ipd where date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"' ";
			Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
			refQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")			
			List<Map<String, Object>> listBillDetails = refQuery.list();
			for(Map<String, Object> row : listBillDetails){
						
				BillRegReportMeeshaDTO obj=new BillRegReportMeeshaDTO();
				
				sql="select sum(amount) as totAmt,sum(other_amount) as otherTotAmt,sum(concession) as totConcn,sum(other_concession) as otherTotConcn,charges_slave_id,bill_id,created_date_time FROM ehat_bill_details_ipd where deleted='N' and patient_id="+(Integer)row.get("patient_id")+" and cancle='N' ";
				Query amtQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
				amtQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listAmtDetails = amtQuery.list();
				for(Map<String, Object> row2 : listAmtDetails){
										
					if((Integer)row2.get("charges_slave_id")>0){
						
						obj.setTotAmt((Double)row2.get("otherTotAmt"));
						obj.setDiscAmt((Double)row2.get("otherTotConcn"));
						
						sql="select category_name as sponsor_name from ehat_charges_master_slave where id="+(Integer)row2.get("charges_slave_id");
						Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						obj.setSource((String) spQuery.uniqueResult());
						
					}else{
						
						obj.setTotAmt((Double)row2.get("totAmt"));
						obj.setDiscAmt((Double)row2.get("totConcn"));
						obj.setSource("Self Paying");
					}	
					
					obj.setBillNo((Integer)row2.get("bill_id"));
					obj.setBillDate((Date)row2.get("created_date_time"));
				}
				
				sql="select count(bill_receipt_id) as recId FROM ehat_receipt_master_ipd where deleted='N' and patient_id="+(Integer)row.get("patient_id");
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				int count = ((Number)countQuery.uniqueResult()).intValue();
					
				if(count>0){
					
					sql="select sum(total_paid) as totAmt FROM ehat_receipt_master_ipd where deleted='N' and patient_id="+(Integer)row.get("patient_id");
					Query paidQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					obj.setPaidAmt((Double) paidQuery.uniqueResult());	
				}else{
					
					obj.setPaidAmt(0);	
				}			
				
				obj.setRemainAmt(obj.getTotAmt()-obj.getPaidAmt());
				
				sql="select concat(prefix,' ',f_name,' ',m_name,' ',l_name) as patient_name from ehat_patient where patient_id="+(Integer)row.get("patient_id");
				Query patQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				obj.setPatientName((String) patQuery.uniqueResult());
							
				ltPatientRecord.add(obj);			
				obj=null;
			}			

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}

	@Override
	public List<GroupwiseProfeesDto> getGroupwiseProfees(int unitId, int userId,
			String fDate, String tDate,int groupId) {
		
		List<GroupwiseProfeesDto> lstReport=new ArrayList<GroupwiseProfeesDto>();
		double totalSumAmount=0,totalSumConcession=0,totalSumHopsAmount=0,totalSumNet=0;
		
		try {
			String sql="select * from profees_dynamic_group_slave where deleted='N' and d_master_id="+groupId;
			Query amtQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
			amtQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")			
			List<Map<String, Object>> listAmtDetails = amtQuery.list();
			for(Map<String, Object> row : listAmtDetails){
						
				GroupwiseProfeesDto obj=new GroupwiseProfeesDto();
				
				obj.setDoctorName((String)row.get("doctor_name"));
				int doctorId=(Integer)row.get("doctor_id");
				
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date fromDate = sdf.parse(fDate);				
				java.util.Date toDate = sdf.parse(tDate);
				ProfeesDoctorsPaymentDto objProfees=profeesSingleDocSummary(doctorId,new java.sql.Date(fromDate.getTime()),new java.sql.Date(toDate.getTime()));
				
				//BillReceiptSlaveDTO obj1=objProfees.getListBillReceiptSlave().get(0);				
				BillReceiptSlaveDTO obj2=objProfees.getListBillReceiptSlave().get(0);
				BillReceiptSlaveDTO obj3=objProfees.getListBillReceiptSlaveCredit().get(0);
				BillReceiptSlaveDTO obj4=objProfees.getListBillOpdMediclaimCredit().get(0);
				
				BillReceiptSlaveDTO obj8=objProfees.getListBillReceiptSlaveDiago().get(0);
				BillReceiptSlaveDTO obj9=objProfees.getListBillReceiptSlaveDiagoCredit().get(0);
				BillReceiptSlaveDTO obj10=objProfees.getListBillDiagoMediclaimCredit().get(0);

				BillDetailsIpdDto obj5=objProfees.getListBillDetailsIpd().get(0);
				BillDetailsIpdDto obj6=objProfees.getListBillDetailsIpdCredit().get(0);
				BillDetailsIpdDto obj7=objProfees.getListBillIpdMediclaimCredit().get(0);				

				EhatOtherBillDetailForOpdDto obj11=objProfees.getListOBDForOpdCash().get(0);
				EhatOtherBillDetailForOpdDto obj12=objProfees.getListOBDForOpdCredit().get(0);
				EhatOtherBillDetailForOpdDto obj13=objProfees.getListOBDForOpdMediclaimCredit().get(0);
				
				EhatOtherBillDetailForOpdDto obj14=objProfees.getListOBDForDiagoCash().get(0);
				EhatOtherBillDetailForOpdDto obj15=objProfees.getListOBDForDiagoCredit().get(0);
				EhatOtherBillDetailForOpdDto obj16=objProfees.getListOBDForDiagoMediclaimCredit().get(0);

				EhatOtherBillDetailForIpdDto obj17=objProfees.getListOBDForIpdCash().get(0);
				EhatOtherBillDetailForIpdDto obj18=objProfees.getListOBDForIpdCredit().get(0);
				EhatOtherBillDetailForIpdDto obj19=objProfees.getListOBDForIpdMediclaimCredit().get(0);
				
				totalSumAmount=totalSumAmount+obj2.getSumAmount()+obj3.getSumAmount()+obj4.getSumAmount()+obj5.getSumAmount()+obj6.getSumAmount()+obj7.getSumAmount();
				totalSumAmount=totalSumAmount+obj8.getSumAmount()+obj9.getSumAmount()+obj10.getSumAmount()+obj11.getSumAmount()+obj12.getSumAmount()+obj13.getSumAmount()+obj14.getSumAmount();
				totalSumAmount=totalSumAmount+obj15.getSumAmount()+obj16.getSumAmount()+obj17.getSumAmount()+obj18.getSumAmount()+obj19.getSumAmount()+obj6.getSumAmount()+obj7.getSumAmount();
				
				totalSumConcession=totalSumConcession+obj2.getSumConcession()+obj3.getSumConcession()+obj4.getSumConcession()+obj5.getSumConcession()+obj6.getSumConcession()+obj7.getSumConcession();
				totalSumConcession=totalSumConcession+obj8.getSumConcession()+obj9.getSumConcession()+obj10.getSumConcession()+obj11.getSumConcession()+obj12.getSumConcession()+obj13.getSumConcession()+obj14.getSumConcession();
				totalSumConcession=totalSumConcession+obj15.getSumConcession()+obj16.getSumConcession()+obj17.getSumConcession()+obj18.getSumConcession()+obj19.getSumConcession()+obj6.getSumConcession()+obj7.getSumConcession();
				
				totalSumHopsAmount=totalSumHopsAmount+obj2.getSumHospAmount()+obj3.getSumHospAmount()+obj4.getSumHospAmount()+obj5.getSumHospAmount()+obj6.getSumHospAmount()+obj7.getSumHospAmount();
				totalSumHopsAmount=totalSumHopsAmount+obj8.getSumHospAmount()+obj9.getSumHospAmount()+obj10.getSumHospAmount()+obj11.getSumHospAmount()+obj12.getSumHospAmount()+obj13.getSumHospAmount()+obj14.getSumHospAmount();
				totalSumHopsAmount=totalSumHopsAmount+obj15.getSumHospAmount()+obj16.getSumHospAmount()+obj17.getSumHospAmount()+obj18.getSumHospAmount()+obj19.getSumHospAmount()+obj6.getSumHospAmount()+obj7.getSumHospAmount();
				
				totalSumNet=totalSumNet+obj2.getSumNet()+obj3.getSumNet()+obj4.getSumNet()+obj5.getSumNet()+obj6.getSumNet()+obj7.getSumNet();
				totalSumNet=totalSumNet+obj8.getSumNet()+obj9.getSumNet()+obj10.getSumNet()+obj11.getSumNet()+obj12.getSumNet()+obj13.getSumNet()+obj14.getSumNet();
				totalSumNet=totalSumNet+obj15.getSumNet()+obj16.getSumNet()+obj17.getSumNet()+obj18.getSumNet()+obj19.getSumNet()+obj6.getSumNet()+obj7.getSumNet();
				
				for(GroupReceiptSlaveDetails obj20:objProfees.getListGroupReceiptSlave()){
					
					totalSumAmount=totalSumAmount+obj20.getSumAmount();
					totalSumConcession=totalSumConcession+obj20.getSumConcession();
					totalSumHopsAmount=totalSumHopsAmount+obj20.getSumHospAmount();
					totalSumNet=totalSumNet+obj20.getSumNet();
				}
				
				for(GroupReceiptSlaveDetails obj21:objProfees.getListGroupReceiptSlaveCredit()){
					
					totalSumAmount=totalSumAmount+obj21.getSumAmount();
					totalSumConcession=totalSumConcession+obj21.getSumConcession();
					totalSumHopsAmount=totalSumHopsAmount+obj21.getSumHospAmount();
					totalSumNet=totalSumNet+obj21.getSumNet();
				}
				
				obj.setGroassAmt(totalSumAmount);
				obj.setConcn(totalSumConcession);
				obj.setHpDedcn(totalSumHopsAmount);
				obj.setNetAmt(totalSumNet);
				
				double indvPer=(Double)row.get("personal_percent");
				double distPer=(Double)row.get("distribute_percent");
				
				double drIndvPerAmt=(totalSumNet*indvPer)/100;
				double drDistPerAmt=(totalSumNet*distPer)/100;
				
				obj.setIndPerDr((Double)row.get("personal_percent"));
				obj.setDistPerDr((Double)row.get("distribute_percent"));
				obj.setFromDistPerDr((Double)row.get("from_dist_amt_percent"));
								
				obj.setIndPerDrAmt(drIndvPerAmt);
				obj.setDistPerDrAmt(drDistPerAmt);				
				
				lstReport.add(obj);			
			}
		
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		
		return lstReport;
	}
	
	
	public ProfeesDoctorsPaymentDto profeesSingleDocSummary(int doctorId,
			java.sql.Date fromDate, java.sql.Date toDate) {
		
		//Object of pojo
		ProfeesDoctorsPaymentDto mainObj = new ProfeesDoctorsPaymentDto();
		
		//Lists for OPD 
		List<BillReceiptSlaveDTO> listBillReceiptSlave = new ArrayList<BillReceiptSlaveDTO>();
		List<BillReceiptSlaveDTO> listBillReceiptSlaveCredit = new ArrayList<BillReceiptSlaveDTO>();
		
		//Lists for DIAGO
		List<BillReceiptSlaveDTO> listBillReceiptSlaveDiago = new ArrayList<BillReceiptSlaveDTO>();
		List<BillReceiptSlaveDTO> listBillReceiptSlaveDiagoCredit = new ArrayList<BillReceiptSlaveDTO>();
		
		//Lists for OPD & DIAGO package(other bill details)
		List<EhatOtherBillDetailForOpdDto> listOBDForOpdCash = new ArrayList<EhatOtherBillDetailForOpdDto>();
		List<EhatOtherBillDetailForOpdDto> listOBDForOpdCredit = new ArrayList<EhatOtherBillDetailForOpdDto>();
		
		List<EhatOtherBillDetailForOpdDto> listOBDForDiagoCash = new ArrayList<EhatOtherBillDetailForOpdDto>();
		List<EhatOtherBillDetailForOpdDto> listOBDForDiagoCredit = new ArrayList<EhatOtherBillDetailForOpdDto>();
		
		//Lists for OPD & DIAGO Mediclaim Credit
		List<BillReceiptSlaveDTO> listBillOpdMediclaimCredit = new ArrayList<BillReceiptSlaveDTO>();
		List<BillReceiptSlaveDTO> listBillDiagoMediclaimCredit = new ArrayList<BillReceiptSlaveDTO>();
		
		
		//Lists for OPD & DIAGO Mediclaim Package Cash
		List<EhatOtherBillDetailForOpdDto> listOBDForOpdMediclaimCash = new ArrayList<EhatOtherBillDetailForOpdDto>();
		List<EhatOtherBillDetailForOpdDto> listOBDForDiagoMediclaimCash = new ArrayList<EhatOtherBillDetailForOpdDto>();
		//Lists for OPD & DIAGO Mediclaim Package Credit
		List<EhatOtherBillDetailForOpdDto> listOBDForOpdMediclaimCredit = new ArrayList<EhatOtherBillDetailForOpdDto>();
		List<EhatOtherBillDetailForOpdDto> listOBDForDiagoMediclaimCredit = new ArrayList<EhatOtherBillDetailForOpdDto>();
		
		//Lists for IPD
		List<BillDetailsIpdDto> listBillDetailsIpd = new ArrayList<BillDetailsIpdDto>();
		List<BillDetailsIpdDto> listBillDetailsIpdCredit = new ArrayList<BillDetailsIpdDto>();
		
		//Lists for IPD package(other bill details)
		List<EhatOtherBillDetailForIpdDto> listOBDForIpdCash = new ArrayList<EhatOtherBillDetailForIpdDto>();
		List<EhatOtherBillDetailForIpdDto> listOBDForIpdCredit = new ArrayList<EhatOtherBillDetailForIpdDto>();
		
		//Lists for IPD Mediclaim Cash
		List<BillDetailsIpdDto> listBillIpdMediclaimCash = new ArrayList<BillDetailsIpdDto>();
		//Lists for IPD Mediclaim Credit
		List<BillDetailsIpdDto> listBillIpdMediclaimCredit = new ArrayList<BillDetailsIpdDto>();
		
		//Lists for IPD Mediclaim Package Cash
		List<EhatOtherBillDetailForIpdDto> listOBDForIpdMediclaimCash = new ArrayList<EhatOtherBillDetailForIpdDto>();
		//Lists for IPD Mediclaim Package Credit
		List<EhatOtherBillDetailForIpdDto> listOBDForIpdMediclaimCredit = new ArrayList<EhatOtherBillDetailForIpdDto>();
		
		//List for Group
		List<GroupReceiptSlaveDetails> listGroupReceiptSlave = new ArrayList<GroupReceiptSlaveDetails>();
		List<GroupReceiptSlaveDetails> listGroupReceiptSlaveCredit = new ArrayList<GroupReceiptSlaveDetails>();
		
		//List for Group Mediclaim Cash
		List<GroupReceiptSlaveDetails> listGroupMediclaimCash = new ArrayList<GroupReceiptSlaveDetails>();
		//List for Group Mediclaim Credit
		List<GroupReceiptSlaveDetails> listGroupMediclaimCredit = new ArrayList<GroupReceiptSlaveDetails>();

		// ----------OPD Cash---------starts
		String slaveQuery1 = "SELECT ifnull(sum(actual_amt),0) as sumAmount,ifnull(sum(actual_concn_amt),0) as sumConcession,"
				+ "ifnull(sum(actual_disc_amt),0) as actualDiscAmt,ifnull(sum(actual_ref_amt),0) as refundAmt,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_receipt_slave "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and advance_flag='N' and department_id = 1 and service_assign_date between :fromDate and :toDate"; //and source_type_id=0";

		Query qExe1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery1)
				.setResultTransformer(
						Transformers.aliasToBean(BillReceiptSlaveDTO.class));

		qExe1.setParameter("doctorId", doctorId);
		qExe1.setParameter("fromDate", fromDate);
		qExe1.setParameter("toDate", toDate);

		listBillReceiptSlave = qExe1.list();
		mainObj.setListBillReceiptSlave(listBillReceiptSlave);
		// ----------OPD Cash---------Ends
		
		// ---------OPD Credit---------starts
		String slaveQueryCredit1 = "SELECT ifnull(sum(actual_amt),0) as sumAmount,ifnull(sum(actual_concn_amt),0) as sumConcession,"
				+ "ifnull(sum(actual_disc_amt),0) as actualDiscAmt,ifnull(sum(actual_ref_amt),0) as refundAmt,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_receipt_slave "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and advance_flag='Y' and department_id = 1 and service_assign_date between :fromDate and :toDate and source_type_id=0";

		Query qExeCredit1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryCredit1)
				.setResultTransformer(
						Transformers.aliasToBean(BillReceiptSlaveDTO.class));

		qExeCredit1.setParameter("doctorId", doctorId);
		qExeCredit1.setParameter("fromDate", fromDate);
		qExeCredit1.setParameter("toDate", toDate);

		listBillReceiptSlaveCredit = qExeCredit1.list();
		mainObj.setListBillReceiptSlaveCredit(listBillReceiptSlaveCredit);
		// ----------OPD Credit---------Ends
		
		// ---------OPD Mediclaim Credit---------starts
		String slaveQueryMediclaimCredit1 = "SELECT ifnull(sum(actual_amt),0) as sumAmount,ifnull(sum(actual_concn_amt),0) as sumConcession,"
				+ "ifnull(sum(actual_disc_amt),0) as actualDiscAmt,ifnull(sum(actual_ref_amt),0) as refundAmt,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_receipt_slave "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and advance_flag='Y' and department_id = 1 and service_assign_date between :fromDate and :toDate and source_type_id > 0";

		Query qExeMediclaimCredit1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCredit1)
				.setResultTransformer(
						Transformers.aliasToBean(BillReceiptSlaveDTO.class));

		qExeMediclaimCredit1.setParameter("doctorId", doctorId);
		qExeMediclaimCredit1.setParameter("fromDate", fromDate);
		qExeMediclaimCredit1.setParameter("toDate", toDate);

		listBillOpdMediclaimCredit = qExeMediclaimCredit1.list();
		mainObj.setListBillOpdMediclaimCredit(listBillOpdMediclaimCredit);
		// ----------OPD Credit---------Ends
		

		// ----------IPD Cash---------starts
		String slaveQuery2 = "SELECT ifnull(sum(amount),0) as sumAmount,ifnull(sum(concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_bill_details_ipd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 2 and advance_flag='N' and date(created_date_time) between :fromDate and :toDate and source_type_id=0";

		Query qExe2 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery2)
				.setResultTransformer(
						Transformers.aliasToBean(BillDetailsIpdDto.class));

		qExe2.setParameter("doctorId", doctorId);
		qExe2.setParameter("fromDate", fromDate);
		qExe2.setParameter("toDate", toDate);

		listBillDetailsIpd = qExe2.list();
		mainObj.setListBillDetailsIpd(listBillDetailsIpd);
		// ----------IPD Cash---------Ends
		
		// ----------IPD Credit---------starts
		String slaveQueryCredit2 = "SELECT ifnull(sum(amount),0) as sumAmount,ifnull(sum(concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_bill_details_ipd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 2 and advance_flag='Y' and date(created_date_time) between :fromDate and :toDate and source_type_id=0";

		Query qExeCredit2 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryCredit2)
				.setResultTransformer(
						Transformers.aliasToBean(BillDetailsIpdDto.class));

		qExeCredit2.setParameter("doctorId", doctorId);
		qExeCredit2.setParameter("fromDate", fromDate);
		qExeCredit2.setParameter("toDate", toDate);

		listBillDetailsIpdCredit = qExeCredit2.list();
		mainObj.setListBillDetailsIpdCredit(listBillDetailsIpdCredit);
		// ----------IPD Credit---------Ends
		
		// ----------IPD Mediclaim Cash---------starts
		String slaveQueryMediclaimCash2 = "SELECT ifnull(sum(other_amount),0) as sumAmount,ifnull(sum(other_concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_bill_details_ipd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 2 and advance_flag='N' and date(created_date_time) between :fromDate and :toDate and source_type_id > 0";

		Query qExeMediclaimCash2 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCash2)
				.setResultTransformer(
						Transformers.aliasToBean(BillDetailsIpdDto.class));

		qExeMediclaimCash2.setParameter("doctorId", doctorId);
		qExeMediclaimCash2.setParameter("fromDate", fromDate);
		qExeMediclaimCash2.setParameter("toDate", toDate);

		listBillIpdMediclaimCash = qExeMediclaimCash2.list();
		mainObj.setListBillIpdMediclaimCash(listBillIpdMediclaimCash);
		// ----------IPD Mediclaim Cash---------Ends
		
		// ----------IPD Mediclaim Credit---------starts
		String slaveQueryMediclaimCredit2 = "SELECT ifnull(sum(other_amount),0) as sumAmount,ifnull(sum(other_concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_bill_details_ipd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 2 and advance_flag='Y' and date(created_date_time) between :fromDate and :toDate and source_type_id > 0";

		Query qExeMediclaimCredit2 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCredit2)
				.setResultTransformer(
						Transformers.aliasToBean(BillDetailsIpdDto.class));

		qExeMediclaimCredit2.setParameter("doctorId", doctorId);
		qExeMediclaimCredit2.setParameter("fromDate", fromDate);
		qExeMediclaimCredit2.setParameter("toDate", toDate);

		listBillIpdMediclaimCredit= qExeMediclaimCredit2.list();
		mainObj.setListBillIpdMediclaimCredit(listBillIpdMediclaimCredit);
		// ----------IPD Mediclaim Credit---------Ends
		

		// ----------Diagno Cash---------starts
		String slaveQuery3 = "SELECT ifnull(sum(actual_amt),0) as sumAmount,ifnull(sum(actual_concn_amt),0) as sumConcession,"
				+ "ifnull(sum(actual_disc_amt),0) as actualDiscAmt,ifnull(sum(actual_ref_amt),0) as refundAmt,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_receipt_slave "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and advance_flag='N' and department_id = 3 and service_assign_date between :fromDate and :toDate ";//and source_type_id = 0";

		Query qExe3 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery3)
				.setResultTransformer(
						Transformers.aliasToBean(BillReceiptSlaveDTO.class));

		qExe3.setParameter("doctorId", doctorId);
		qExe3.setParameter("fromDate", fromDate);
		qExe3.setParameter("toDate", toDate);

		listBillReceiptSlaveDiago = qExe3.list();
		mainObj.setListBillReceiptSlaveDiago(listBillReceiptSlaveDiago);
		// ----------Diagno Cash---------Ends
		
		// ----------Diagno Credit---------starts
		String slaveQueryCredit3 = "SELECT ifnull(sum(actual_amt),0) as sumAmount,ifnull(sum(actual_concn_amt),0) as sumConcession,"
				+ "ifnull(sum(actual_disc_amt),0) as actualDiscAmt,ifnull(sum(actual_ref_amt),0) as refundAmt,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_receipt_slave "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and advance_flag='Y' and department_id = 3 and service_assign_date between :fromDate and :toDate and source_type_id = 0";

		Query qExeCredit3 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryCredit3)
				.setResultTransformer(
						Transformers.aliasToBean(BillReceiptSlaveDTO.class));

		qExeCredit3.setParameter("doctorId", doctorId);
		qExeCredit3.setParameter("fromDate", fromDate);
		qExeCredit3.setParameter("toDate", toDate);

		listBillReceiptSlaveDiagoCredit = qExeCredit3.list();
		mainObj.setListBillReceiptSlaveDiagoCredit(listBillReceiptSlaveDiagoCredit);
		// ----------Diagno Credit---------Ends
		
		// ----------Diagno Mediclaim Credit---------starts
		String slaveQueryMediclaimCredit3 = "SELECT ifnull(sum(actual_amt),0) as sumAmount,ifnull(sum(actual_concn_amt),0) as sumConcession,"
				+ "ifnull(sum(actual_disc_amt),0) as actualDiscAmt,ifnull(sum(actual_ref_amt),0) as refundAmt,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_receipt_slave "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and advance_flag='Y' and department_id = 3 and service_assign_date between :fromDate and :toDate and source_type_id > 0";

		Query qExeMediclaimCredit3 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCredit3)
				.setResultTransformer(
						Transformers.aliasToBean(BillReceiptSlaveDTO.class));

		qExeMediclaimCredit3.setParameter("doctorId", doctorId);
		qExeMediclaimCredit3.setParameter("fromDate", fromDate);
		qExeMediclaimCredit3.setParameter("toDate", toDate);

		listBillDiagoMediclaimCredit = qExeMediclaimCredit3.list();
		mainObj.setListBillDiagoMediclaimCredit(listBillDiagoMediclaimCredit);
		// ----------Diagno Mediclaim Credit---------Ends
		
		
		// ----------Group Cash---------starts
		String slaveQuery4 = "SELECT ifnull(truncate(sum(amount), 2), 0) as sumAmount,ifnull(sum(concession), 0) as sumConcession,"
				+ "ifnull(sum(discount), 0) as discount,ifnull(sum(refundAmt), 0) as refundAmt,"
				+ "ifnull(sum(hospAmount), 0) as sumHospAmount,ifnull(sum(totalDrAmount), 0) as sumNet,groupMasterId,groupName "
				+ "FROM  profees_group_receipt_slave where doctorId = :doctorId and pfVoucherFlag = 'Y' and advance_flag='N' and "
				+ " serviceAssignDate between :fromDate and :toDate group by groupMasterId";

		Query qExe4 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery4)
				.setResultTransformer(
						Transformers.aliasToBean(GroupReceiptSlaveDetails.class));

		qExe4.setParameter("doctorId", doctorId);
		qExe4.setParameter("fromDate", fromDate);
		qExe4.setParameter("toDate", toDate);

		listGroupReceiptSlave = qExe4.list();
		mainObj.setListGroupReceiptSlave(listGroupReceiptSlave);
		// ----------Group Cash---------Ends
		
		// ----------Group Credit---------starts
		String slaveQueryCredit4 = "SELECT ifnull(sum(amount), 0) as sumAmount,ifnull(sum(concession), 0) as sumConcession,"
				+ "ifnull(sum(discount), 0) as discount,ifnull(sum(refundAmt), 0) as refundAmt,"
				+ "ifnull(sum(hospAmount), 0) as sumHospAmount,ifnull(sum(totalDrAmount), 0) as sumNet,groupMasterId,groupName "
				+ "FROM  profees_group_receipt_slave where doctorId = :doctorId and pfVoucherFlag = 'Y' and advance_flag='Y' and "
				+ " sourceTypeId = 0 and serviceAssignDate between :fromDate and :toDate group by groupMasterId";

		Query qExeCredit4 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryCredit4)
				.setResultTransformer(
						Transformers
								.aliasToBean(GroupReceiptSlaveDetails.class));

		qExeCredit4.setParameter("doctorId", doctorId);
		qExeCredit4.setParameter("fromDate", fromDate);
		qExeCredit4.setParameter("toDate", toDate);

		listGroupReceiptSlaveCredit = qExeCredit4.list();
		mainObj.setListGroupReceiptSlaveCredit(listGroupReceiptSlaveCredit);
		// ----------Group Credit---------Ends
		
		// ----------Group Mediclaim Credit---------starts
		String slaveQueryMediclaimCredit4 = "SELECT ifnull(sum(amount), 0) as sumAmount,ifnull(sum(concession), 0) as sumConcession,"
				+ "ifnull(sum(discount), 0) as discount,ifnull(sum(refundAmt), 0) as refundAmt,"
				+ "ifnull(sum(hospAmount), 0) as sumHospAmount,ifnull(sum(totalDrAmount), 0) as sumNet,groupMasterId,groupName "
				+ "FROM  profees_group_receipt_slave where doctorId = :doctorId and pfVoucherFlag = 'Y' and advance_flag='Y' and "
				+ " sourceTypeId > 0 and serviceAssignDate between :fromDate and :toDate group by groupMasterId";

		Query qExeMediclaimCredit4 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCredit4)
				.setResultTransformer(
						Transformers
								.aliasToBean(GroupReceiptSlaveDetails.class));

		qExeMediclaimCredit4.setParameter("doctorId", doctorId);
		qExeMediclaimCredit4.setParameter("fromDate", fromDate);
		qExeMediclaimCredit4.setParameter("toDate", toDate);

		listGroupMediclaimCredit = qExeMediclaimCredit4.list();
		mainObj.setListGroupMediclaimCredit(listGroupMediclaimCredit);
		// ----------Group Mediclaim Credit---------Ends
		
		
		// ----------Package OPD Cash---------starts
		String slaveQuery5 = "SELECT ifnull(sum(amount),0) as sumAmount,ifnull(sum(concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_opd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 1 and advance_flag='N' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id = 0";

		Query qExe5 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery5)
				.setResultTransformer(
						Transformers.aliasToBean(EhatOtherBillDetailForOpdDto.class));

		qExe5.setParameter("doctorId", doctorId);
		qExe5.setParameter("fromDate", fromDate);
		qExe5.setParameter("toDate", toDate);

		listOBDForOpdCash = qExe5.list();
		mainObj.setListOBDForOpdCash(listOBDForOpdCash);
		// ----------Package OPD Cash---------Ends

		// ----------Package OPD Credit---------starts
		String slaveQueryCredit5 = "SELECT ifnull(sum(amount),0) as sumAmount,ifnull(sum(concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_opd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 1 and advance_flag='Y' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id = 0";

		Query qExeCredit5 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryCredit5)
				.setResultTransformer(
						Transformers.aliasToBean(EhatOtherBillDetailForOpdDto.class));

		qExeCredit5.setParameter("doctorId", doctorId);
		qExeCredit5.setParameter("fromDate", fromDate);
		qExeCredit5.setParameter("toDate", toDate);

		listOBDForOpdCredit = qExeCredit5.list();
		mainObj.setListOBDForOpdCredit(listOBDForOpdCredit);
		// ----------Package OPD Credit---------Ends
		
		// ----------Package OPD Mediclaim Cash---------starts
		String slaveQueryMediclaimCash5 = "SELECT ifnull(sum(other_amount),0) as sumAmount,ifnull(sum(other_concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_opd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 1 and advance_flag='N' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id > 0";

		Query qExeMediclaimCash5 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCash5)
				.setResultTransformer(
						Transformers
								.aliasToBean(EhatOtherBillDetailForOpdDto.class));

		qExeMediclaimCash5.setParameter("doctorId", doctorId);
		qExeMediclaimCash5.setParameter("fromDate", fromDate);
		qExeMediclaimCash5.setParameter("toDate", toDate);

		listOBDForOpdMediclaimCash = qExeMediclaimCash5.list();
		mainObj.setListOBDForOpdMediclaimCash(listOBDForOpdMediclaimCash);
		// ----------Package OPD Mediclaim Cash---------Ends
		
		// ----------Package OPD Mediclaim Credit---------starts
		String slaveQueryMediclaimCredit5 = "SELECT ifnull(sum(other_amount),0) as sumAmount,ifnull(sum(other_concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_opd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 1 and advance_flag='Y' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id > 0";

		Query qExeMediclaimCredit5 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCredit5)
				.setResultTransformer(
						Transformers
								.aliasToBean(EhatOtherBillDetailForOpdDto.class));

		qExeMediclaimCredit5.setParameter("doctorId", doctorId);
		qExeMediclaimCredit5.setParameter("fromDate", fromDate);
		qExeMediclaimCredit5.setParameter("toDate", toDate);

		listOBDForOpdMediclaimCredit = qExeMediclaimCredit5.list();
		mainObj.setListOBDForOpdMediclaimCredit(listOBDForOpdMediclaimCredit);
		// ----------Package OPD Mediclaim Credit---------Ends
		
		// ----------Package Diago Cash---------starts
		String slaveQuery6 = "SELECT ifnull(sum(amount),0) as sumAmount,ifnull(sum(concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_opd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 3 and advance_flag='N' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id = 0";

		Query qExe6 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery6)
				.setResultTransformer(
						Transformers
								.aliasToBean(EhatOtherBillDetailForOpdDto.class));

		qExe6.setParameter("doctorId", doctorId);
		qExe6.setParameter("fromDate", fromDate);
		qExe6.setParameter("toDate", toDate);

		listOBDForDiagoCash = qExe6.list();
		mainObj.setListOBDForDiagoCash(listOBDForDiagoCash);
		// ----------Package Diago Cash---------Ends

		// ----------Package Diago Credit---------starts
		String slaveQueryCredit6 = "SELECT ifnull(sum(amount),0) as sumAmount,ifnull(sum(concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_opd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 3 and advance_flag='Y' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id = 0";

		Query qExeCredit6 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryCredit6)
				.setResultTransformer(
						Transformers
								.aliasToBean(EhatOtherBillDetailForOpdDto.class));

		qExeCredit6.setParameter("doctorId", doctorId);
		qExeCredit6.setParameter("fromDate", fromDate);
		qExeCredit6.setParameter("toDate", toDate);

		listOBDForDiagoCredit = qExeCredit6.list();
		mainObj.setListOBDForDiagoCredit(listOBDForDiagoCredit);
		// ----------Package Diago Credit---------Ends
		
		// ----------Package Diago Mediclaim Cash---------starts
		String slaveQueryMediclaimCash6 = "SELECT ifnull(sum(other_amount),0) as sumAmount,ifnull(sum(other_concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_opd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 3 and advance_flag='N' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id > 0 ";

		Query qExeMediclaimCash6 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCash6)
				.setResultTransformer(
						Transformers
								.aliasToBean(EhatOtherBillDetailForOpdDto.class));

		qExeMediclaimCash6.setParameter("doctorId", doctorId);
		qExeMediclaimCash6.setParameter("fromDate", fromDate);
		qExeMediclaimCash6.setParameter("toDate", toDate);

		listOBDForDiagoMediclaimCash = qExeMediclaimCash6.list();
		mainObj.setListOBDForDiagoMediclaimCash(listOBDForDiagoMediclaimCash);
		// ----------Package Diago Mediclaim Cash---------Ends
		
		// ----------Package Diago Mediclaim Credit---------starts
		String slaveQueryMediclaimCredit6 = "SELECT ifnull(sum(other_amount),0) as sumAmount,ifnull(sum(other_concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_opd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 3 and advance_flag='Y' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id > 0 ";

		Query qExeMediclaimCredit6 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCredit6)
				.setResultTransformer(
						Transformers
								.aliasToBean(EhatOtherBillDetailForOpdDto.class));

		qExeMediclaimCredit6.setParameter("doctorId", doctorId);
		qExeMediclaimCredit6.setParameter("fromDate", fromDate);
		qExeMediclaimCredit6.setParameter("toDate", toDate);

		listOBDForDiagoMediclaimCredit = qExeMediclaimCredit6.list();
		mainObj.setListOBDForDiagoMediclaimCredit(listOBDForDiagoMediclaimCredit);
		// ----------Package Diago Mediclaim Credit---------Ends
		
		// ----------Package IPD Cash---------starts
		String slaveQuery7 = "SELECT ifnull(sum(amount),0) as sumAmount,ifnull(sum(concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_ipd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 2 and advance_flag='N' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id = 0 ";

		Query qExe7 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery7)
				.setResultTransformer(
						Transformers.aliasToBean(EhatOtherBillDetailForIpdDto.class));

		qExe7.setParameter("doctorId", doctorId);
		qExe7.setParameter("fromDate", fromDate);
		qExe7.setParameter("toDate", toDate);

		listOBDForIpdCash = qExe7.list();
		mainObj.setListOBDForIpdCash(listOBDForIpdCash);
		// ----------Package IPD Cash---------Ends

		// ----------Package IPD Credit---------starts
		String slaveQueryCredit7 = "SELECT ifnull(sum(amount),0) as sumAmount,ifnull(sum(concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_ipd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 2 and advance_flag='Y' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id = 0 ";

		Query qExeCredit7 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryCredit7)
				.setResultTransformer(
						Transformers.aliasToBean(EhatOtherBillDetailForIpdDto.class));

		qExeCredit7.setParameter("doctorId", doctorId);
		qExeCredit7.setParameter("fromDate", fromDate);
		qExeCredit7.setParameter("toDate", toDate);

		listOBDForIpdCredit = qExeCredit7.list();
		mainObj.setListOBDForIpdCredit(listOBDForIpdCredit);
		// ----------Package IPD Credit---------Ends
		
		// ----------Package IPD Mediclaim Cash---------starts
		String slaveQueryMediclaimCash7 = "SELECT ifnull(sum(other_amount),0) as sumAmount,ifnull(sum(other_concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_ipd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 2 and advance_flag='N' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id > 0 ";

		Query qExeMediclaimCash7 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCash7)
				.setResultTransformer(
						Transformers
								.aliasToBean(EhatOtherBillDetailForIpdDto.class));

		qExeMediclaimCash7.setParameter("doctorId", doctorId);
		qExeMediclaimCash7.setParameter("fromDate", fromDate);
		qExeMediclaimCash7.setParameter("toDate", toDate);

		listOBDForIpdMediclaimCash = qExeMediclaimCash7.list();
		mainObj.setListOBDForIpdMediclaimCash(listOBDForIpdMediclaimCash);
		// ----------Package IPD Mediclaim Cash---------Ends
		
		// ----------Package IPD Mediclaim Credit---------starts
		String slaveQueryMediclaimCredit7 = "SELECT ifnull(sum(other_amount),0) as sumAmount,ifnull(sum(other_concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_ipd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 2 and advance_flag='Y' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id > 0 ";

		Query qExeMediclaimCredit7 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCredit7)
				.setResultTransformer(
						Transformers
								.aliasToBean(EhatOtherBillDetailForIpdDto.class));

		qExeMediclaimCredit7.setParameter("doctorId", doctorId);
		qExeMediclaimCredit7.setParameter("fromDate", fromDate);
		qExeMediclaimCredit7.setParameter("toDate", toDate);

		listOBDForIpdMediclaimCredit = qExeMediclaimCredit7.list();
		mainObj.setListOBDForIpdMediclaimCredit(listOBDForIpdMediclaimCredit);
		// ----------Package IPD Mediclaim Credit---------Ends
		
		// To get doctors fixed income
		Query qq = sessionFactory
				.getCurrentSession()
				.createSQLQuery("Select ifnull(fixed_income,0) from doctor where Doctor_ID=:doctorId");

		qq.setParameter("doctorId", doctorId);

		@SuppressWarnings("unchecked")
		double fixedIncome = (Double) qq.uniqueResult();
		//Set doctors fixed income direct in pojo object
		mainObj.setFixedIncome(fixedIncome);

		return mainObj;
	}
	
	public List<ChargesMasterSlave> fetchSuperCatofchargesSlave(
			Integer chargesMasterDto) {
		List<ChargesMasterSlave> ltSubCharges = new ArrayList<ChargesMasterSlave>();
		
		//Calling stored procedure
		Query query = sessionFactory.getCurrentSession().createSQLQuery(
				"CALL  fetchSuperCatogoires (:chargesMasterDto)")
				.setParameter("chargesMasterDto", chargesMasterDto);
				String result =(String) query.uniqueResult();
				String[] ary = result.split(",");
				
				//converting string object into Integer
				List<Integer> ae =  new ArrayList<Integer>();
				for (int i = 0; i < ary.length; i++) {
					ae.add(Integer.parseInt(ary[i]));
				}
	
				//First checking the Length should be greater then zero
				if (ary.length>0) {
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(ChargesMasterSlave.class);
					//criteria.addOrder(Order.desc("subId"));
					criteria.add(Restrictions.in("slaveId", ae));
					ltSubCharges = criteria.list();
					System.err.println("Size of list"+ltSubCharges.size());
				}
				
				
	return ltSubCharges;
	}
	
	@Override
	public List<BillRegReportMeeshaDTO> getPerformanceReport(int unitId, int userId,
			String fDate, String tDate) {
		
		List<BillRegReportMeeshaDTO> ltPatientRecord = new ArrayList<BillRegReportMeeshaDTO>();
	
		try {
			
			double totAmt=0,totPaid=0,totDisc=0,totConcn=0,totBal=0;			
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.setTime(sdf.parse(tDate));
			c.add(Calendar.DATE, 1);  // number of days to add
			tDate = sdf.format(c.getTime());  // dt is now the new date
			
			String sql="select * from patient_records_details where department_id=1 and date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"' ";
			Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
			refQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")			
			List<Map<String, Object>> listBillDetails = refQuery.list();
			for(Map<String, Object> row : listBillDetails){
						
				BillRegReportMeeshaDTO obj=new BillRegReportMeeshaDTO();
				
				int patId=(Integer)row.get("patient_id");				
				String opdIpdNo=(String)row.get("opdipdno");
				obj.setDepId(1);
				
				obj.setRegNo(opdIpdNo);
				
				sql="select concat(prefix,' ',f_name,' ',m_name,' ',l_name) as patient_name from ehat_patient where patient_id="+patId;
				Query patQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				obj.setPatientName((String) patQuery.uniqueResult());
					
				sql="select count(bill_receipt_id) as recId FROM ehat_receipt_master where deleted='N' and patient_id="+patId;
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				int count = ((Number)countQuery.uniqueResult()).intValue();
				
				if(count > 0){
					
					sql="select sum(total_amt) as totAmt,sum(total_discount) as totDisc,sum(actual_tot_concn) as totConcn,sum(total_paid) as totPaid FROM ehat_receipt_master where deleted='N' and patient_id="+patId;
					Query opdQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
					opdQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")			
					List<Map<String, Object>> listAmtDetails = opdQuery.list();
					for(Map<String, Object> row2 : listAmtDetails){
											
						totAmt=(Double)row2.get("totAmt");
						totDisc=(Double)row2.get("totDisc");
						totConcn=(Double)row2.get("totConcn");
						totPaid=(Double)row2.get("totPaid");					
					}					
				}
				
				totBal=totAmt-(totDisc+totConcn+totPaid);		
				
				if(totBal < 0){
					
					totBal=0;
				}
								
				obj.setTotAmt(totAmt);
				obj.setPaidAmt(totPaid);
				obj.setRemainAmt(totBal);			
							
				ltPatientRecord.add(obj);			
				obj=null;
			}	
			
			sql="select * from patient_records_details where department_id=2 and date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"' ";
			Query ipdQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
			ipdQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")			
			List<Map<String, Object>> listBillDetailsIpd = ipdQuery.list();
			for(Map<String, Object> row : listBillDetailsIpd){
				
				BillRegReportMeeshaDTO obj=new BillRegReportMeeshaDTO();
				
				int patId=(Integer)row.get("patient_id");
				int sponId=(Integer)row.get("charges_master_slave_id");
				String opdIpdNo=(String)row.get("opdipdno");
				obj.setDepId(2);
				
				obj.setRegNo(opdIpdNo);
				
				sql="select concat(prefix,' ',f_name,' ',m_name,' ',l_name) as patient_name from ehat_patient where patient_id="+patId;
				Query patQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				obj.setPatientName((String) patQuery.uniqueResult());
				
				if(sponId > 0){
					
					sql="select sum(other_amount) as totAmt,sum(other_concession) as totConcn FROM ehat_bill_details_ipd where deleted='N' and cancle='N' and patient_id="+patId;
				}else{
					
					sql="select sum(amount) as totAmt,sum(concession) as totConcn FROM ehat_bill_details_ipd where deleted='N' and cancle='N' and patient_id="+patId;
				}			
				Query amtQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
				amtQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listAmtDetails = amtQuery.list();
				for(Map<String, Object> row2 : listAmtDetails){
										
					totAmt=(Double)row2.get("totAmt");
					totConcn=(Double)row2.get("totConcn");				
				}	
				
				sql="select count(bill_receipt_id) as recId FROM ehat_receipt_master_ipd where deleted='N' and patient_id="+patId;
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				int count = ((Number)countQuery.uniqueResult()).intValue();
					
				if(count>0){
					
					sql="select sum(total_paid) as totAmt FROM ehat_receipt_master_ipd where deleted='N' and patient_id="+patId;
					Query paidQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					totPaid = (Double) paidQuery.uniqueResult();	
				}else{
					
					totPaid=0;	
				}					
				
				totBal=totAmt-(totDisc+totConcn+totPaid);	
				
				if(totBal < 0){
					
					totBal=0;
				}
				
				obj.setTotAmt(totAmt);
				obj.setPaidAmt(totPaid);
				obj.setRemainAmt(totBal);	
				
				ltPatientRecord.add(obj);			
				obj=null;
			}		

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}

	@Override
	public double getPharmaReturn(Integer treatId) {
		Query hallType = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"SELECT sum(credit_note_payable) FROM pharma_credit_note_master where credit_note_treatmentId="
								+ treatId);

		Double a = (Double) hallType.uniqueResult();
		if (a == null) {
			a = 0.0;
		}
		return a;
	}

	@Override
	public List<IpdBreakupReportDTO> getIpdBreakupReport(int unitId,
            int userId, String fDate, String tDate) {
        List<IpdBreakupReportDTO> ltPatientRecord = new ArrayList<IpdBreakupReportDTO>();
        List<ServiceMasterDto> ltServMaster = new ArrayList<ServiceMasterDto>();
        double servAmt=0;
        try{
            String sql="select * from ehat_service_master where deleted='N' ";
            Query servQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
            servQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> listServDetails = servQuery.list();
            for(Map<String, Object> row2 : listServDetails){
                ServiceMasterDto servObj=new ServiceMasterDto();
                servObj.setServiceId((Integer)row2.get("service_id"));
                servObj.setServiceName((String)row2.get("service_name"));
                ltServMaster.add(servObj);
                servObj=null;
            }
            double totAmt=0,totConcn=0;
            sql="select * from patient_records_details where department_id=2 and invoice_flag='Y' and date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"' ";
            Query ipdQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
            ipdQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> listBillDetailsIpd = ipdQuery.list();
            for(Map<String, Object> row : listBillDetailsIpd){
                IpdBreakupReportDTO obj=new IpdBreakupReportDTO();
                String companyName="";
                int patId=(Integer)row.get("patient_id");
                //int billId=(Integer)row.get("invoice_count");
                int sponId=(Integer)row.get("charges_master_slave_id");
                String opdIpdNo=(String)row.get("opdipdno");
                obj.setRegNo(opdIpdNo);
                if(sponId > 0){
                    sql="select category_name as sponsor_name from ehat_charges_master_slave where id="+sponId;
                    Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
                    companyName=(String) spQuery.uniqueResult();
                }else{
                    companyName="Self";
                }
                obj.setCompany(companyName);
                sql="select concat(prefix,' ',f_name,' ',m_name,' ',l_name) as patient_name from ehat_patient where patient_id="+patId;
                Query patQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
                obj.setPatientName((String) patQuery.uniqueResult());
                if(sponId > 0){
                    sql="select ifnull(sum(other_amount),0) as totAmt,ifnull(sum(other_concession),0) as totConcn FROM ehat_bill_details_ipd where deleted='N' and cancle='N' and patient_id="+patId;
                }else{
                    sql="select ifnull(sum(amount),0) as totAmt,ifnull(sum(concession),0) as totConcn FROM ehat_bill_details_ipd where deleted='N' and cancle='N' and patient_id="+patId;
                }
                Query amtQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
                amtQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> listAmtDetails = amtQuery.list();
                for(Map<String, Object> row2 : listAmtDetails){
                    totAmt=(Double)row2.get("totAmt");
                    totConcn=(Double)row2.get("totConcn");
                }
                obj.setTotBill(totAmt);
                List<ServiceMasterDto> lt = new ArrayList<ServiceMasterDto>();
                for(int i=0;i<ltServMaster.size();i++){
                /*for(ServiceMasterDto objServ : ltServMaster){*/
                    ServiceMasterDto objServ=new ServiceMasterDto();
                    int servId=ltServMaster.get(i).getServiceId();
                    objServ.setServiceName(ltServMaster.get(i).getServiceName());
                    if(sponId > 0){
                        sql="select ifnull(sum(other_amount),0) as amt FROM ehat_bill_details_ipd where deleted='N' and cancle='N' and service_id="+servId+" and patient_id="+patId;
                    }else{
                        sql="select ifnull(sum(amount),0) as amt FROM ehat_bill_details_ipd where deleted='N' and cancle='N' and service_id="+servId+" and patient_id="+patId;
                    }
                    Query servAmtQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
                    servAmt=(Double) servAmtQuery.uniqueResult();
                    objServ.setServiceCharges(servAmt);
                    lt.add(objServ);
                    objServ=null;
                }
                obj.setLstServMaster(lt);
                ltPatientRecord.add(obj);
                obj=null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ltPatientRecord;
        }
        return ltPatientRecord;
    }

	@Override
	public List<OpdDiagnoReportBilllWiseDTO> fetchOpdDiagnoPatientsbillwise(
			int unitId, int userId, String fDate, String tDate) {
		
		List<OpdDiagnoReportBilllWiseDTO> ltPatientRecord = new ArrayList<OpdDiagnoReportBilllWiseDTO>();
		List<RegTreBillDto> lstRecSlave = new ArrayList<RegTreBillDto>();
		
		try {
			Double totalpaid=0.0;
			Double totalamount=0.0;
			Double totalcon=0.0;
			Double totaldis=0.0;
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.setTime(sdf.parse(tDate));
			c.add(Calendar.DATE, 1);  // number of days to add
			tDate = sdf.format(c.getTime());  // dt is now the new date
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RegTreBillDto.class);
			criteria.add(Restrictions.ge("createdDateTime", sdf.parse(fDate))); 
			criteria.add(Restrictions.le("createdDateTime", sdf.parse(tDate)));
			criteria.add(Restrictions.eq("unitId", unitId));
		//	criteria.add(Restrictions.eq("deleted", "N"));
			
			Criterion rest1= Restrictions.eq("departmentId", 1);
			Criterion rest2= Restrictions.eq("departmentId", 3);
			criteria.add(Restrictions.or(rest1,rest2));
			//criteria.add(Restrictions.eq("againstId", 0));
			criteria.addOrder(Order.desc("billId"));	
			List<Integer> list3 = new ArrayList<Integer>();
			lstRecSlave = criteria.list();
			String sql="";
		
			for(RegTreBillDto obj:lstRecSlave){
				if(!list3.contains(obj.getBillId())){

					
					OpdDiagnoReportBilllWiseDTO objMaster=new OpdDiagnoReportBilllWiseDTO();
				//	objMaster.setBillNo(obj.getBillReceiptId());
					objMaster.setBillId(obj.getBillId());
					objMaster.setBillDate(obj.getCreatedDateTime());				
					
					sql="select concat(prefix,' ',f_name,' ',m_name,' ',l_name) as patient_name from ehat_patient where patient_id="+obj.getPatientId();
					Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					objMaster.setPatientName((String) refQuery.uniqueResult());
					
					sql="select ifnull(docName,'-') from chanelling_doctor where channDocId=(select ref_doc_id from ehat_treatment where treatment_id="+obj.getTreatmentId()+")";
					Query refDr = sessionFactory.getCurrentSession().createSQLQuery(sql);				
					objMaster.setRefDr((String) refDr.uniqueResult());
					
				  
									
					sql="select ifnull(referred_by,'-') from ehat_treatment where treatment_id="+obj.getTreatmentId()+" ";
					Query source = sessionFactory.getCurrentSession().createSQLQuery(sql);
					objMaster.setSourceName((String) source.uniqueResult());
					
					  SQLQuery q2=sessionFactory.getCurrentSession().createSQLQuery("SELECT  charges_master_slave_id from  ehat_bill_master  Where treatment_id="+ obj.getTreatmentId() +" and deleted='N'");  
			          Integer charges_master_slave_id= (Integer) q2.uniqueResult();
			          
			          if(charges_master_slave_id > 0){

			        	  sql="select ifnull( sum(other_amount),0.0 ) as amount,ifnull( sum(other_concession),0.0) as concession FROM  ehat_bill_details where deleted='N' and treatment_id="+ obj.getTreatmentId() +"  ";
							Query amtQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
							amtQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							@SuppressWarnings("unchecked")			
							List<Map<String, Object>> listAmtDetails = amtQuery.list();
							for(Map<String, Object> row2 : listAmtDetails){
								totalamount= (Double)row2.get("amount");
								totalcon = (Double)row2.get("concession");
								objMaster.setBillAmt((Double)row2.get("amount"));
							}
			        	  
			          
			          }else{
			        	  sql="select ifnull( sum(amount),0.0)  as amount, ifnull(sum(concession),0.0) as concession FROM  ehat_bill_details where deleted='N' and treatment_id="+ obj.getTreatmentId() +"  ";
							Query amtQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
							amtQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							@SuppressWarnings("unchecked")			
							List<Map<String, Object>> listAmtDetails = amtQuery.list();
							for(Map<String, Object> row2 : listAmtDetails){
								totalamount= (Double)row2.get("amount");
								totalcon = (Double)row2.get("concession");
								objMaster.setBillAmt((Double)row2.get("amount"));
							}
			        	  
			          }
					
					sql="select ifnull( sum(first_paid),0.0) as totalpaid, ifnull( sum(first_disc),0.0) as total_discount FROM ehat_receipt_master where deleted='N' and treatment_id="+ obj.getTreatmentId() +"  ";
					Query amtQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
					amtQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")			
					List<Map<String, Object>> listAmtDetails = amtQuery.list();
					for(Map<String, Object> row2 : listAmtDetails){
						totalpaid= (Double)row2.get("totalpaid");
						totaldis = (Double)row2.get("total_discount");
						if(totalpaid ==null){
							totalpaid=0.0;
						}
						if(totaldis ==null){
							totaldis=0.0;
						}
						
						
					}
					
					String servNames="";
					String subservices="";
					Double totalreamin= totalamount-(totalpaid + totalcon + totaldis);
					if(totalreamin < 0){
						totalreamin =0.0;
					}
					objMaster.setPaidAmt(totalpaid);
					objMaster.setDiscount(totaldis+totalcon);
					
					objMaster.setRemainAmt(totalreamin);

					sql="select service_id,sub_service_id from ehat_bill_details where deleted='N' and treatment_id="+ obj.getTreatmentId() +"   ";
					Query sourceGroup = sessionFactory.getCurrentSession().createSQLQuery(sql);
					sourceGroup.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")			
					List<Map<String, Object>> listserDetails = sourceGroup.list();
					for(Map<String, Object> row2 : listserDetails){
					sql="select ifnull(service_name,'-') from ehat_service_master where service_id="+row2.get("service_id")+" ";
					Query sername = sessionFactory.getCurrentSession().createSQLQuery(sql);
					int id=(Integer)row2.get("sub_service_id");
					Query subsrname=null;
					if(id > 0){
						String sql1="select ifnull(category_name,'-') from  ehat_subservice where id="+ id +"  ";
					   subsrname = sessionFactory.getCurrentSession().createSQLQuery(sql1);
					   subservices=subservices+(String) subsrname.uniqueResult()+",";
					}
					

					servNames=servNames+(String) sername.uniqueResult()+",";
					
					
					}
					servNames=servNames.substring(0,servNames.length()-1);
					subservices=subservices.substring(0,subservices.length()-1);
					objMaster.setSourceGroup(servNames);
					objMaster.setServiceName(subservices);
					
					/*sql="select ifnull(service_name,'-') from ehat_service_master where service_id="+obj.getServiceId()+" ";
					Query sourceGroup = sessionFactory.getCurrentSession().createSQLQuery(sql);
					objMaster.setSourceGroup((String) sourceGroup.uniqueResult());*/
					
				/*	objMaster.setServiceName(obj.getCompName());				
					objMaster.setQty(obj.getQuantity());
					objMaster.setPrice(obj.getRate());
					objMaster.setAmount(obj.getAmount());*/
					/*sql="select ref_doc_id from ehat_treatment where treatment_id="+obj.getTreatmentId()+" and  ref_doc_id  > 0";
					Query refrDr = sessionFactory.getCurrentSession().createSQLQuery(sql);
					   Integer ref_doc_id= (Integer) refrDr.uniqueResult();
					
					
			    	sql="select ifnull(doc_name,'-') from doctor where Doctor_ID="+ref_doc_id+" ";*/
					sql="select ifnull(docName,'-') from chanelling_doctor where channDocId=(select ref_doc_id from ehat_treatment where treatment_id="+obj.getTreatmentId()+")";
					Query tDr = sessionFactory.getCurrentSession().createSQLQuery(sql);
					objMaster.setRefDr((String) tDr.uniqueResult());
			
					String drname="";
					sql="select doctor_id FROM   ehat_bill_details where deleted='N' and treatment_id="+ obj.getTreatmentId() +" and doctor_id > 0  ";
					Query amtQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql);				
					amtQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")			
					List<Map<String, Object>> drDetails = amtQuery1.list();
					for(Map<String, Object> row2 : drDetails){
						sql="select ifnull(doc_name,'-') from doctor where Doctor_ID="+row2.get("doctor_id")+" ";
						Query treatDr = sessionFactory.getCurrentSession().createSQLQuery(sql);
						 drname= drname +"," + (String) treatDr.uniqueResult();
						
					}
					
					String drnameautho="-";
				/*	for(Map<String, Object> row2 : drDetails){
						sql="select ifnull(doc_name,'-') as doc_name from doctor where Doctor_ID="+row2.get("doctor_id")+" and motivatorAuthorisation='Authorised'";
						Query treatDr = sessionFactory.getCurrentSession().createSQLQuery(sql);
						treatDr.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						@SuppressWarnings("unchecked")			
						List<Map<String, Object>> drDetailsllis = treatDr.list();
						for(Map<String, Object> row3 : drDetailsllis){
							String autho=(String) row3.get("doc_name");
							
							drnameautho= drnameautho +"," + autho;
						}
						
						
					}*/
					if(drname=="" ||drname==null){
						drname="-";
					}else{
						drname=	drname.substring(1);
					}
					if(drnameautho=="" || drnameautho==null){
						drnameautho="-";
					}else{
						
							drnameautho=drnameautho.substring(1);
						
						
					}
					if(drnameautho=="" || drnameautho==null){
						drnameautho="-";
					}
					objMaster.setAutheriseBy(drnameautho);
					objMaster.setTreatDr(drname);
					//objMaster.setAutheriseBy("");
					
					ltPatientRecord.add(objMaster);
					objMaster=null;	
					list3.add(obj.getBillId());
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}
	
	
	@SuppressWarnings("hiding")
	@Override
	public NotificationDTO fetchMaintainaceExpireItems() {
	
		List<MaintainanceNoificationDTO>  ltDTO = new ArrayList<MaintainanceNoificationDTO>();
		String sql="SELECT machine_maintainance_id,machine_maintainance_item_id,item_name,maintnc_machin_srno,maintnc_machin_purchs_date,maintainance_date FROM maintainance_machine where (DATEDIFF(maintainance_date, now()))<=8 and maintainance_machine_delete_flag !=1";
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> listItems = query.list();
		//List<Map<String, Object>> ltMaitcItems = (List<Map<String, Object>>) getJdbcTemplate().queryForList(sql);
		try {
			 for(Map<String, Object> row : listItems)
			{
				MaintainanceNoificationDTO machineDTO = new MaintainanceNoificationDTO();
				machineDTO.setMachine_maintainance_id((Integer)(row.get("machine_maintainance_id")));
				machineDTO.setMachine_maintainance_item_id((Integer)(row.get("machine_maintainance_item_id")));
				machineDTO.setItem_name((String)(row.get("item_name")));
				machineDTO.setMaintainance_date((java.sql.Date)(row.get("maintainance_date")));
				ltDTO.add(machineDTO);
			}
			
			NotificationDTO objNote=new NotificationDTO();
			objNote.setLogoClass("fa fa-calendar");
			objNote.setMsgCount(ltDTO.size());
			objNote.setMsgText("Expiring Items");
			objNote.setMsgUrl("maintenace_machine.jsp");
			objNote.setNoteDate(new java.util.Date());
			objNote.setLstDetails(ltDTO);
			return objNote;
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	@Override
	public List<BillHistoryDTO> getBillHistory(int unitId, int userId,
			String fDate, String tDate,int patientId,int sponsorId) {
		
		List<BillHistoryDTO> ltPatientRecord = new ArrayList<BillHistoryDTO>();
	
		try {
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.setTime(sdf.parse(tDate));
			c.add(Calendar.DATE, 1);  // number of days to add
			tDate = sdf.format(c.getTime());  // dt is now the new date
			
			String sql="";
			
			if(patientId > 0){
				
				sql="select concat(prefix,' ',f_name,' ',m_name,' ',l_name) as patient_name,patient_id,created_date_time from ehat_patient where patient_id="+patientId;
				
			}else{
				
				sql="select concat(prefix,' ',f_name,' ',m_name,' ',l_name) as patient_name,patient_id,created_date_time from ehat_patient where date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"' order by patient_id desc ";
			}
			
			Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
			refQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")			
			List<Map<String, Object>> listBillDetails = refQuery.list();
			for(Map<String, Object> row : listBillDetails){
					
				int patId = (Integer)row.get("patient_id");				
				List<TreatmentDto> ltPatientTrIds = new ArrayList<TreatmentDto>();
				ltPatientTrIds = getAllTreatments(unitId,userId,patId,sponsorId);
				
				if(ltPatientTrIds.size() >  0){
				
					BillHistoryDTO obj=new BillHistoryDTO();				
					obj.setPatId(patId);			
					obj.setPatientName((String)row.get("patient_name"));	
					obj.setRegDate((Date)row.get("created_date_time"));	
					obj.setTreatCount(ltPatientTrIds.size());
					ltPatientRecord.add(obj);
					obj=null;
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}

	@Override
	public List<TreatmentDto> getAllTreatments(int unitId,int userId,int patId,int sponsorIdd) {
		
		List<TreatmentDto> ltPatientTrIds = new ArrayList<TreatmentDto>();
		
		try {		
			
			String sql="select count(treatment_ids) from ehat_bill_master_treats where deleted='N' and patient_id="+patId;
			Query trCount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			Integer trIdCount = ((Number)trCount.uniqueResult()).intValue();
			
			String treatIds="0";
			String spnrIds="0";
			ArrayList<Integer> lstTrId=new ArrayList<Integer>();
			ArrayList<Integer> lstSpId=new ArrayList<Integer>();
			if(trIdCount > 0){
			
				sql="select ifnull(treatment_ids,'0') as treatment_ids from ehat_bill_master_treats where deleted='N' and patient_id="+patId;
				Query trId = sessionFactory.getCurrentSession().createSQLQuery(sql);
				trId.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listTreatDetails = trId.list();
				for(Map<String, Object> row : listTreatDetails){
					
					String treatIdSplit = (String)row.get("treatment_ids");
					
					if(treatIdSplit.contains(",")){
						
						String ar[] = treatIdSplit.split(",");
						for(String ss : ar){
							
							String[] sptreatId=ss.split("_");								
							int treatId = Integer.parseInt(sptreatId[0]);
							int spId = Integer.parseInt(sptreatId[1]);	
							treatIds = treatIds + "," +treatId;
							spnrIds = spnrIds + "," + spId;
							
							lstTrId.add(treatId);
							lstSpId.add(spId);
						}
						
					}else{
						
						String[] sptreatId=treatIdSplit.split("_");								
						int treatId = Integer.parseInt(sptreatId[0]);
						int spId = Integer.parseInt(sptreatId[1]);	
						treatIds = treatIds + "," +treatId;		
						spnrIds = spnrIds + "," + spId;
						
						lstTrId.add(treatId);
						lstSpId.add(spId);
					}						
				}
			}
			
			sql="select treatment_id,department_id from ehat_treatment where t_flag='N' and deleted='N' and patient_id="+patId+" order by treatment_id desc ";
			Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
			refQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")			
			List<Map<String, Object>> listTreatDetails = refQuery.list();
			for(Map<String, Object> row : listTreatDetails){
						
				int depId = (Integer)row.get("department_id");
				int trId = (Integer)row.get("treatment_id");
				
				String sqlCount="select count(mul_sponsor_id) from ehat_multiple_sponsor where deleted='N' and treatment_id="+trId;
				Query spCount = sessionFactory.getCurrentSession().createSQLQuery(sqlCount);
				Integer spIdCount = ((Number)spCount.uniqueResult()).intValue();
				
				if(spIdCount > 0){
					
					if(sponsorIdd > 0){
						sql="select mul_sponsor_id,charges_slave_id from ehat_multiple_sponsor where deleted='N' and charges_slave_id="+sponsorIdd+" and treatment_id = "+trId+" order by treatment_id desc ";
					}else{
						sql="select mul_sponsor_id,charges_slave_id from ehat_multiple_sponsor where deleted='N' and treatment_id = "+trId+" order by treatment_id desc ";
					}
					
					
					Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
					spQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")			
					List<Map<String, Object>> listSpTreatDetails = spQuery.list();
					for(Map<String, Object> rs : listSpTreatDetails){
						
						int sponsorId = (Integer)rs.get("charges_slave_id");
						
						if(!(lstTrId.contains(trId) && lstSpId.contains(sponsorId))){
							
							sql="select category_name as sponsor_name from ehat_charges_master_slave where id="+sponsorId;
		                    Query cmpQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		                    String companyName=(String) cmpQuery.uniqueResult();
							
							if(depId == 2){
								
								String sql2="select count(bill_details_id) from ehat_bill_details_ipd where deleted='N' and charges_slave_id="+sponsorId+" and treatment_id="+trId;
								Query bedCount = sessionFactory.getCurrentSession().createSQLQuery(sql2);
								Integer bedIdCount = ((Number)bedCount.uniqueResult()).intValue();
								
								if(bedIdCount > 0){
									
									TreatmentDto obj=new TreatmentDto();				
									obj.setTreatmentId(trId);	
									obj.setDepartmentId(depId);	
									obj.setCount(sponsorId);	
									obj.setPatientName(companyName);
									ltPatientTrIds.add(obj);
									obj=null;
									
									/*sql="select count(paid_by_cash_flag) from ehat_bill_details_ipd where paid_by_cash_flag='Y' and deleted='N' and cancle='N' and charges_slave_id="+sponsorId+" and treatment_id="+trId;
									Query cashCount = sessionFactory.getCurrentSession().createSQLQuery(sql);
									Integer cashFlagCount = ((Number)cashCount.uniqueResult()).intValue();
									
									if(cashFlagCount > 0){
										
										TreatmentDto trObj=new TreatmentDto();				
										trObj.setTreatmentId(trId);	
										trObj.setDepartmentId(depId);	
										trObj.setCount(-10);	
										trObj.setPatientName("-");
										ltPatientTrIds.add(trObj);
										trObj=null;
									}*/
								}
							}else{
								
								TreatmentDto obj=new TreatmentDto();				
								obj.setTreatmentId(trId);	
								obj.setDepartmentId(depId);
								obj.setCount(sponsorId);	
								obj.setPatientName(companyName);
								ltPatientTrIds.add(obj);
								obj=null;
								
								/*sql="select count(paid_by_cash_flag) from ehat_bill_details where paid_by_cash_flag='Y' and deleted='N' and cancle='N' and charges_slave_id="+sponsorId+" and treatment_id="+trId;
								Query cashCount = sessionFactory.getCurrentSession().createSQLQuery(sql);
								Integer cashFlagCount = ((Number)cashCount.uniqueResult()).intValue();
								
								if(cashFlagCount > 0){
									
									TreatmentDto trObj=new TreatmentDto();				
									trObj.setTreatmentId(trId);	
									trObj.setDepartmentId(depId);	
									trObj.setCount(-10);	
									trObj.setPatientName("-");
									ltPatientTrIds.add(trObj);
									trObj=null;
								}*/
							}							
						}						
												
					}	
					
				}else{
						
					/*sql="select treatment_id,department_id from ehat_treatment where deleted='N' and patient_id="+patId+" and treatment_id not in("+treatIds+") order by treatment_id desc ";
					Query genQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
					genQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")			
					List<Map<String, Object>> listGenTreatDetails = genQuery.list();
					for(Map<String, Object> rowGen : listGenTreatDetails){
								
						int ttrId = (Integer)rowGen.get("treatment_id");
						int ddepId = (Integer)rowGen.get("department_id");*/
					if(!(lstTrId.contains(trId)) && sponsorIdd ==0){
					
						if(depId == 2){
							
							String sql2="select count(bill_details_id) from ehat_bill_details_ipd where deleted='N' and treatment_id="+trId;
							Query bedCount = sessionFactory.getCurrentSession().createSQLQuery(sql2);
							Integer bedIdCount = ((Number)bedCount.uniqueResult()).intValue();
							
							if(bedIdCount > 0){
								
								TreatmentDto obj=new TreatmentDto();				
								obj.setTreatmentId(trId);	
								obj.setDepartmentId(depId);	
								obj.setCount(0);	
								obj.setPatientName("Self");
								ltPatientTrIds.add(obj);
								obj=null;
								
								/*sql="select count(paid_by_cash_flag) from ehat_bill_details_ipd where paid_by_cash_flag='Y' and deleted='N' and cancle='N' and treatment_id="+trId;
								Query cashCount = sessionFactory.getCurrentSession().createSQLQuery(sql);
								Integer cashFlagCount = ((Number)cashCount.uniqueResult()).intValue();
								
								if(cashFlagCount > 0){
									
									TreatmentDto trObj=new TreatmentDto();				
									trObj.setTreatmentId(trId);	
									trObj.setDepartmentId(depId);	
									trObj.setCount(-10);	
									trObj.setPatientName("-");
									ltPatientTrIds.add(trObj);
									trObj=null;
								}*/
							}
						}else{
							
							TreatmentDto obj=new TreatmentDto();				
							obj.setTreatmentId(trId);	
							obj.setDepartmentId(depId);	
							obj.setCount(0);	
							obj.setPatientName("Self");
							ltPatientTrIds.add(obj);
							obj=null;
							
							/*sql="select count(paid_by_cash_flag) from ehat_bill_details where paid_by_cash_flag='Y' and deleted='N' and cancle='N' and treatment_id="+trId;
							Query cashCount = sessionFactory.getCurrentSession().createSQLQuery(sql);
							Integer cashFlagCount = ((Number)cashCount.uniqueResult()).intValue();
							
							if(cashFlagCount > 0){
								
								TreatmentDto trObj=new TreatmentDto();				
								trObj.setTreatmentId(trId);	
								trObj.setDepartmentId(depId);	
								trObj.setCount(-10);	
								trObj.setPatientName("-");
								ltPatientTrIds.add(trObj);
								trObj=null;
							}*/
						}			
					}									
											
				}				
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientTrIds;
		}
		return ltPatientTrIds;
	}
	
	@Override
	public List<TreatmentServiceDetails> getServDetails(int treatId,int chargesSlaveId) {
		
		List<TreatmentServiceDetails> ltPatientTrIds = new ArrayList<TreatmentServiceDetails>();
			
		try {			
			
			if(chargesSlaveId > 0){
				
				String sql="select distinct(service_id) from ehat_bill_details where deleted='N' and paid_by_cash_flag='N' and charges_slave_id="+chargesSlaveId+" and cancle='N' and treatment_id="+treatId+" ";
				Query srvIdQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
				srvIdQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listServIds = srvIdQuery.list();
				for(Map<String, Object> row : listServIds){
						
					double totAmt=0;
					Integer servId = (Integer)row.get("service_id");
					TreatmentServiceDetails servMaster=new TreatmentServiceDetails();
					List<TreatmentServiceDetails> ltServsDetails = new ArrayList<TreatmentServiceDetails>();
					
					if(servId == -5){
						
						servMaster.setServName("-");
					}else{
						
						sql="select ifnull(service_name,'-') from ehat_service_master where service_id="+servId;
						Query servName = sessionFactory.getCurrentSession().createSQLQuery(sql);
						servMaster.setServName((String) servName.uniqueResult());
						
					}
									
					sql="select * from ehat_bill_details where deleted='N' and paid_by_cash_flag='N' and cancle='N' and charges_slave_id="+chargesSlaveId+" and treatment_id="+treatId+" and service_id="+servId;
					Query srvQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
					srvQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")			
					List<Map<String, Object>> listServDetails = srvQuery.list();
					for(Map<String, Object> row2 : listServDetails){
											
						TreatmentServiceDetails objSlave=new TreatmentServiceDetails();
						
						Integer subServId = (Integer)row2.get("sub_service_id");
						
						if(subServId==0){
							
							objSlave.setSubServName("Registration Charges");
						}
						else{					
							
							sql="select ifnull(category_name,'-') from ehat_subservice where id="+subServId;
							Query subServName = sessionFactory.getCurrentSession().createSQLQuery(sql);
							objSlave.setSubServName((String) subServName.uniqueResult());									
						}
											
						Double rate = 0.0;
						Double qty = 0.0;
						Double con = 0.0;
											
						rate = (Double)row2.get("other_rate");
						qty = (Double)row2.get("quantity");
						con = (Double)row2.get("other_concession");
						
						objSlave.setRate(rate);
						objSlave.setQty(qty);
						double amt = (rate * qty) - con;
						objSlave.setAmt(amt);					
						totAmt= totAmt + amt;	
						
						//objSlave.setServId(servId);
						objSlave.setDrDeshFlag((String)row2.get("drdesk_flag"));
						objSlave.setConPer((Double)row2.get("concession_in_Perc"));
						objSlave.setCancelFlag((String)row2.get("cancle"));
						objSlave.setCreatedDateTime((Date)row2.get("created_date_time"));
						
						ltServsDetails.add(objSlave);
						objSlave = null;
					}
					
					servMaster.setServId(servId);
					servMaster.setTotAmt(totAmt);				
					servMaster.setListTreatment(ltServsDetails);				
					ltPatientTrIds.add(servMaster);
					servMaster=null;
				}
				
				
			}else{
				
				String sql="select distinct(service_id) from ehat_bill_details where deleted='N' and paid_by_cash_flag='N' and cancle='N' and treatment_id="+treatId+" ";
				Query srvIdQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
				srvIdQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listServIds = srvIdQuery.list();
				for(Map<String, Object> row : listServIds){
						
					double totAmt=0;
					Integer servId = (Integer)row.get("service_id");
					TreatmentServiceDetails servMaster=new TreatmentServiceDetails();
					List<TreatmentServiceDetails> ltServsDetails = new ArrayList<TreatmentServiceDetails>();
					
					if(servId == -5){
						
						servMaster.setServName("-");
					}else{
						
						sql="select ifnull(service_name,'-') from ehat_service_master where service_id="+servId;
						Query servName = sessionFactory.getCurrentSession().createSQLQuery(sql);
						servMaster.setServName((String) servName.uniqueResult());
						
					}
									
					sql="select * from ehat_bill_details where deleted='N' and paid_by_cash_flag='N' and cancle='N' and treatment_id="+treatId+" and service_id="+servId;
					Query srvQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
					srvQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")			
					List<Map<String, Object>> listServDetails = srvQuery.list();
					for(Map<String, Object> row2 : listServDetails){
											
						TreatmentServiceDetails objSlave=new TreatmentServiceDetails();
						
						Integer subServId = (Integer)row2.get("sub_service_id");
						
						if(subServId==0){
							
							objSlave.setSubServName("Registration Charges");
						}
						else{					
							
							sql="select ifnull(category_name,'-') from ehat_subservice where id="+subServId;
							Query subServName = sessionFactory.getCurrentSession().createSQLQuery(sql);
							objSlave.setSubServName((String) subServName.uniqueResult());									
						}
											
						Double rate = 0.0;
						Double qty = 0.0;
						Double con = 0.0;
												
						rate = (Double)row2.get("rate");	
						qty = (Double)row2.get("quantity");
						con = (Double)row2.get("concession");
					
						objSlave.setRate(rate);
						objSlave.setQty(qty);
						double amt = (rate * qty) - con;
						objSlave.setAmt(amt);					
						totAmt= totAmt + amt;	
						
						//objSlave.setServId(servId);
						objSlave.setDrDeshFlag((String)row2.get("drdesk_flag"));
						objSlave.setConPer((Double)row2.get("concession_in_Perc"));
						objSlave.setCancelFlag((String)row2.get("cancle"));
						objSlave.setCreatedDateTime((Date)row2.get("created_date_time"));
						
						ltServsDetails.add(objSlave);
						objSlave = null;
					}
					
					servMaster.setServId(servId);
					servMaster.setTotAmt(totAmt);				
					servMaster.setListTreatment(ltServsDetails);				
					ltPatientTrIds.add(servMaster);
					servMaster=null;
				}
				
				
				
			}
			
			

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientTrIds;
		}
		return ltPatientTrIds;
	}

	@Override
	public Integer generateBillIdTreats(BillMasterAllTreat obj) {
		
		try {	
			
			List<TreatmentDto> ltPatientTrIds = new ArrayList<TreatmentDto>();
			ltPatientTrIds = getAllTreatments(obj.getUnitId(), obj.getCreatedBy(),obj.getPatientId(),0);
			
			if(ltPatientTrIds.size() > 0){
				
				sessionFactory.getCurrentSession().merge(obj);
				return 1; 
			}else{
				
				return -1;
			}			
		}
		catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	@Override
	public List<BillHistoryDTO> getGeneratedBillHistory(int unitId, int userId,
			String fDate, String tDate,int patientId,int sponsorId) {
		
		List<BillHistoryDTO> ltPatientRecord = new ArrayList<BillHistoryDTO>();
	
		try {
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.setTime(sdf.parse(tDate));
			c.add(Calendar.DATE, 1);  // number of days to add
			tDate = sdf.format(c.getTime());  // dt is now the new date
			
			String sql="";
			
			if(patientId > 0){
				
				sql="select concat(prefix,' ',f_name,' ',m_name,' ',l_name) as patient_name,patient_id,created_date_time from ehat_patient where patient_id="+patientId;
			}else{
				
				sql="select concat(prefix,' ',f_name,' ',m_name,' ',l_name) as patient_name,patient_id,created_date_time from ehat_patient where date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"' order by patient_id desc ";
			}
			
			Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
			refQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")			
			List<Map<String, Object>> listBillDetails = refQuery.list();
			for(Map<String, Object> row : listBillDetails){
					
				int patId = (Integer)row.get("patient_id");				
				List<TreatmentDto> ltPatientTrIds = new ArrayList<TreatmentDto>();
				ltPatientTrIds = getBuildTreatments(unitId,userId,patId,sponsorId);
				
				if(ltPatientTrIds.size() >  0){
				
					BillHistoryDTO obj=new BillHistoryDTO();				
					obj.setPatId(patId);			
					obj.setPatientName((String)row.get("patient_name"));	
					obj.setRegDate((Date)row.get("created_date_time"));	
					obj.setTreatCount(ltPatientTrIds.size());
					ltPatientRecord.add(obj);
					obj=null;
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}
	
	@Override
	public List<TreatmentDto> getBuildTreatments(int unitId,int userId,int patId,int sponsorIdd) {
		
		List<TreatmentDto> ltPatientTrIds = new ArrayList<TreatmentDto>();
		
		try {		
			
			String sql="select count(treatment_ids) from ehat_bill_master_treats where deleted='N' and patient_id="+patId;
			Query trCount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			Integer trIdCount = ((Number)trCount.uniqueResult()).intValue();
			
			String treatIds="0";
			String spnrIds="0";
			ArrayList<Integer> lstTrId=new ArrayList<Integer>();
			ArrayList<Integer> lstSpId=new ArrayList<Integer>();
			if(trIdCount > 0){
			
				sql="select ifnull(treatment_ids,'0') as treatment_ids from ehat_bill_master_treats where deleted='N' and patient_id="+patId;
				Query trIds = sessionFactory.getCurrentSession().createSQLQuery(sql);
				trIds.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listTreatIdDetails = trIds.list();
				for(Map<String, Object> row : listTreatIdDetails){
						
					String treatIdSplit = (String)row.get("treatment_ids");
					
					if(treatIdSplit.contains(",")){
						
						String ar[] = treatIdSplit.split(",");
						for(String ss : ar){
							
							String[] sptreatId=ss.split("_");								
							int treatId = Integer.parseInt(sptreatId[0]);		
							int spId = Integer.parseInt(sptreatId[1]);	
							treatIds = treatIds + "," +treatId;
							spnrIds = spnrIds + "," + spId;
							
							lstTrId.add(treatId);
							lstSpId.add(spId);
						}
						
					}else{
						
						String[] sptreatId=treatIdSplit.split("_");								
						int treatId = Integer.parseInt(sptreatId[0]);		
						int spId = Integer.parseInt(sptreatId[1]);	
						treatIds = treatIds + "," +treatId;
						spnrIds = spnrIds + "," + spId;	
						
						lstTrId.add(treatId);
						lstSpId.add(spId);
					}						
				}
				
				sql="select treatment_id,department_id from ehat_treatment where deleted='N' and patient_id="+patId+" order by treatment_id desc ";
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
				refQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listTreatDetails = refQuery.list();
				for(Map<String, Object> row : listTreatDetails){
							
					int depId = (Integer)row.get("department_id");
					int trId = (Integer)row.get("treatment_id");
					
					String sqlCount="select count(mul_sponsor_id) from ehat_multiple_sponsor where deleted='N' and treatment_id="+trId;
					Query spCount = sessionFactory.getCurrentSession().createSQLQuery(sqlCount);
					Integer spIdCount = ((Number)spCount.uniqueResult()).intValue();
					
					if(spIdCount > 0){
						
						if(sponsorIdd > 0 ){
							sql="select mul_sponsor_id,charges_slave_id from ehat_multiple_sponsor where deleted='N' and charges_slave_id = "+sponsorIdd+" and treatment_id = "+trId+" order by treatment_id desc ";
						}else{
							sql="select mul_sponsor_id,charges_slave_id from ehat_multiple_sponsor where deleted='N' and treatment_id = "+trId+" order by treatment_id desc ";
						}
						
						
						Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
						spQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						@SuppressWarnings("unchecked")			
						List<Map<String, Object>> listSpTreatDetails = spQuery.list();
						for(Map<String, Object> rs : listSpTreatDetails){
							
							int sponsorId = (Integer)rs.get("charges_slave_id");
							
							if(lstTrId.contains(trId) && lstSpId.contains(sponsorId)){
								
								sql="select category_name as sponsor_name from ehat_charges_master_slave where id="+sponsorId;
			                    Query cmpQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			                    String companyName=(String) cmpQuery.uniqueResult();
			                    			                    
			                    if(depId == 2){
									
									String sql2="select count(bill_details_id) from ehat_bill_details_ipd where deleted='N' and charges_slave_id="+sponsorId+" and treatment_id="+trId;
									Query bedCount = sessionFactory.getCurrentSession().createSQLQuery(sql2);
									Integer bedIdCount = ((Number)bedCount.uniqueResult()).intValue();
									
									if(bedIdCount > 0){
										
										TreatmentDto obj=new TreatmentDto();				
										obj.setTreatmentId(trId);	
										obj.setDepartmentId(depId);	
										obj.setCount(sponsorId);	
										obj.setPatientName(companyName);
										ltPatientTrIds.add(obj);
										obj=null;
										
										sql="select count(paid_by_cash_flag) from ehat_bill_details_ipd where paid_by_cash_flag='Y' and deleted='N' and cancle='N' and charges_slave_id="+sponsorId+" and treatment_id="+trId;
										Query cashCount = sessionFactory.getCurrentSession().createSQLQuery(sql);
										Integer cashFlagCount = ((Number)cashCount.uniqueResult()).intValue();
										
										if(cashFlagCount > 0){
											
											TreatmentDto trObj=new TreatmentDto();				
											trObj.setTreatmentId(trId);	
											trObj.setDepartmentId(depId);	
											trObj.setCount(-10);	
											trObj.setPatientName("Cash");
											ltPatientTrIds.add(trObj);
											trObj=null;
										}										
									}
								}else{
									
									TreatmentDto obj=new TreatmentDto();				
									obj.setTreatmentId(trId);	
									obj.setDepartmentId(depId);
									obj.setCount(sponsorId);	
									obj.setPatientName(companyName);
									ltPatientTrIds.add(obj);
									obj=null;
									
									sql="select count(paid_by_cash_flag) from ehat_bill_details where paid_by_cash_flag='Y' and deleted='N' and cancle='N' and charges_slave_id="+sponsorId+" and treatment_id="+trId;
									Query cashCount = sessionFactory.getCurrentSession().createSQLQuery(sql);
									Integer cashFlagCount = ((Number)cashCount.uniqueResult()).intValue();
									
									if(cashFlagCount > 0){
										
										TreatmentDto trObj=new TreatmentDto();				
										trObj.setTreatmentId(trId);	
										trObj.setDepartmentId(depId);	
										trObj.setCount(-10);	
										trObj.setPatientName("Cash");
										ltPatientTrIds.add(trObj);
										trObj=null;
									}
								}			                    	
							}							
								
						}
						
					}else{
												
						if((lstTrId.contains(trId)) && sponsorIdd == 0){
							
							if(depId == 2){
								
								String sql2="select count(bill_details_id) from ehat_bill_details_ipd where deleted='N' and treatment_id="+trId;
								Query bedCount = sessionFactory.getCurrentSession().createSQLQuery(sql2);
								Integer bedIdCount = ((Number)bedCount.uniqueResult()).intValue();
								
								if(bedIdCount > 0){
									
									TreatmentDto obj=new TreatmentDto();				
									obj.setTreatmentId(trId);	
									obj.setDepartmentId(depId);	
									obj.setCount(0);	
									obj.setPatientName("Self");
									ltPatientTrIds.add(obj);
									obj=null;
									
									sql="select count(paid_by_cash_flag) from ehat_bill_details_ipd where paid_by_cash_flag='Y' and deleted='N' and cancle='N' and treatment_id="+trId;
									Query cashCount = sessionFactory.getCurrentSession().createSQLQuery(sql);
									Integer cashFlagCount = ((Number)cashCount.uniqueResult()).intValue();
									
									if(cashFlagCount > 0){
										
										TreatmentDto trObj=new TreatmentDto();				
										trObj.setTreatmentId(trId);	
										trObj.setDepartmentId(depId);	
										trObj.setCount(-10);	
										trObj.setPatientName("Cash");
										ltPatientTrIds.add(trObj);
										trObj=null;
									}
								}
							}else{
								
								TreatmentDto obj=new TreatmentDto();				
								obj.setTreatmentId(trId);	
								obj.setDepartmentId(depId);	
								obj.setCount(0);	
								obj.setPatientName("Self");
								ltPatientTrIds.add(obj);
								obj=null;
								
								sql="select count(paid_by_cash_flag) from ehat_bill_details where paid_by_cash_flag='Y' and deleted='N' and cancle='N' and treatment_id="+trId;
								Query cashCount = sessionFactory.getCurrentSession().createSQLQuery(sql);
								Integer cashFlagCount = ((Number)cashCount.uniqueResult()).intValue();
								
								if(cashFlagCount > 0){
									
									TreatmentDto trObj=new TreatmentDto();				
									trObj.setTreatmentId(trId);	
									trObj.setDepartmentId(depId);	
									trObj.setCount(-10);	
									trObj.setPatientName("Cash");
									ltPatientTrIds.add(trObj);
									trObj=null;
								}
							}			
						}
						
					}					
				}
			}				

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientTrIds;
		}
		return ltPatientTrIds;
	}

	//irfan khan 11-sep-2018 fetch servicewise report
	@Override
	public List<BillDetailsDto> fetchServiceWiseReport(java.sql.Date fromDate,
			java.sql.Date toDate, int deptId, int serviceId, int subServiceId,int sponsorId) {
		
		List<BillDetailsDto> listRecords = null;
		String all = "";
		
		if(sponsorId > 0){
			if(deptId == 2){
				all = "SELECT opd.patient_id as patienttId, et.opdipdno as opdIpdNo,concat(ep.prefix,' ',ep.f_name,' ',ep.l_name) as patientName,"
						+"esm.service_name as serviceName,ess.category_name as subServiceName,doc.doc_name as doctorName,"
						+"opd.other_rate as rate,opd.quantity as quantity,opd.other_amount as amount,opd.other_concession as concession	FROM "
					    +" ehat_bill_details_ipd opd,ehat_treatment et,ehat_patient ep,ehat_service_master esm,ehat_subservice ess,"
						+" doctor doc where opd.patient_id = ep.patient_id and opd.treatment_id = et.treatment_id and"
						+" esm.service_id = opd.service_id and ess.id = opd.sub_service_id and opd.doctor_id = doc.Doctor_ID and opd.deleted='N' and "
						+" opd.sponsor_id > 0 and opd.department_id ="+deptId+" and date(opd.created_date_time) between '"+fromDate+"' and '"+toDate+"' ";
				
				if(serviceId > 0){
					all = all + " and opd.service_id ="+serviceId+" " ;
				}
				if(subServiceId > 0){
					all = all + " and opd.sub_service_id ="+subServiceId+" " ;
				}
			}else{
				all = "SELECT opd.patient_id as patienttId, et.opdipdno as opdIpdNo,concat(ep.prefix,' ',ep.f_name,' ',ep.l_name) as patientName,"
						+"esm.service_name as serviceName,ess.category_name as subServiceName,doc.doc_name as doctorName,"
						+"opd.other_rate as rate,opd.quantity as quantity,opd.other_amount as amount,opd.other_concession as concession	FROM "
					    +" ehat_bill_details opd,ehat_treatment et,ehat_patient ep,ehat_service_master esm,ehat_subservice ess,"
						+" doctor doc where opd.patient_id = ep.patient_id and opd.treatment_id = et.treatment_id and"
						+" esm.service_id = opd.service_id and ess.id = opd.sub_service_id and opd.doctor_id = doc.Doctor_ID and opd.deleted='N' and "
						+" opd.sponsor_id > 0 and opd.department_id ="+deptId+" and date(opd.created_date_time) between '"+fromDate+"' and '"+toDate+"' ";
				
				if(serviceId > 0){
					all = all + " and opd.service_id ="+serviceId+" " ;
				}
				if(subServiceId > 0){
					all = all + " and opd.sub_service_id ="+subServiceId+" " ;
				}
			}
			
		}else{
			if(deptId == 2){
				all = "SELECT opd.patient_id as patienttId, et.opdipdno as opdIpdNo,concat(ep.prefix,' ',ep.f_name,' ',ep.l_name) as patientName,"
						+"esm.service_name as serviceName,ess.category_name as subServiceName,doc.doc_name as doctorName,"
						+"opd.rate as rate,opd.quantity as quantity,opd.amount as amount,opd.concession as concession	FROM "
					    +" ehat_bill_details_ipd opd,ehat_treatment et,ehat_patient ep,ehat_service_master esm,ehat_subservice ess,"
						+" doctor doc where opd.patient_id = ep.patient_id and opd.treatment_id = et.treatment_id and"
						+" esm.service_id = opd.service_id and ess.id = opd.sub_service_id and opd.doctor_id = doc.Doctor_ID and opd.deleted='N' and "
						+" opd.sponsor_id =0 and opd.department_id ="+deptId+" and date(opd.created_date_time) between '"+fromDate+"' and '"+toDate+"' ";
				
				if(serviceId > 0){
					all = all + " and opd.service_id ="+serviceId+" " ;
				}
				if(subServiceId > 0){
					all = all + " and opd.sub_service_id ="+subServiceId+" " ;
				}
			}else{
				all = "SELECT opd.patient_id as patienttId, et.opdipdno as opdIpdNo,concat(ep.prefix,' ',ep.f_name,' ',ep.l_name) as patientName,"
						+"esm.service_name as serviceName,ess.category_name as subServiceName,doc.doc_name as doctorName,"
						+"opd.rate as rate,opd.quantity as quantity,opd.amount as amount,opd.concession as concession	FROM "
					    +" ehat_bill_details opd,ehat_treatment et,ehat_patient ep,ehat_service_master esm,ehat_subservice ess,"
						+" doctor doc where opd.patient_id = ep.patient_id and opd.treatment_id = et.treatment_id and"
						+" esm.service_id = opd.service_id and ess.id = opd.sub_service_id and opd.doctor_id = doc.Doctor_ID and opd.deleted='N' and "
						+" opd.sponsor_id =0 and opd.department_id ="+deptId+" and date(opd.created_date_time) between '"+fromDate+"' and '"+toDate+"' ";
				
				if(serviceId > 0){
					all = all + " and opd.service_id ="+serviceId+" " ;
				}
				if(subServiceId > 0){
					all = all + " and opd.sub_service_id ="+subServiceId+" " ;
				}
			}
			
		}
		
		Query q = sessionFactory
				.getCurrentSession()
				.createSQLQuery(all);
		q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		
		listRecords = q.list();
		
		return listRecords;
	}

	//irfan khan 14-sep-2018 fetch subServices
	@Override
	public List<SubServiceDto> fetchSubServices(int serviceId) {
		
		List<SubServiceDto> listRecords = null;
		String all = "";
		
		if(serviceId > 0){
			all = "SELECT id as subId,category_name as categoryName FROM ehat_subservice where deleted='N' and service_id="+serviceId;
		}else{
			all = "SELECT id as subId,category_name as categoryName FROM ehat_subservice where deleted='N'";
		}

		Query q = sessionFactory
				.getCurrentSession()
				.createSQLQuery(all);
		q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		
		listRecords = q.list();
		return listRecords;
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
						totalDisc = totalDisc + Double.valueOf(rows[1].toString());
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
	        		
	        		sqlRemark = "select ifnull(ref_remark,'') as ref_remark,ifnull(receipt_count,0) as receipt_count,ifnull(created_by,0) as created_by from ehat_refund_master_ipd where deleted='N' and created_by="+userId+" and date(created_date_time) >= '"+fromDate+"' and date(created_date_time) <= '"+toDate+"' and patient_id="+pid;
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
	

	@Override
	public List<EhatViewPatientServiceDetailIpdDto> getIpdPatientServiceListFromView(
			BillReceiptMasterDTO obj) {
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
		String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");    
		String pharmacy_chrges = (String)resourceBundleEhat.getString("pharmacy");    
		int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
		int pharmacy = Integer.parseInt(pharmacy_chrges);
		
		int treatmentId = obj.getTreatmentId();
		int patientId = obj.getPatientId();
		int chargesSlaveId = obj.getSponsorCatId();
		//int userId = obj.getCreatedBy();
		List<EhatViewPatientServiceDetailIpdDto> listServiceIpdDto =new ArrayList<EhatViewPatientServiceDetailIpdDto>();
		List<EhatViewPatientServiceDetailIpdDto> lstServiceIpdDto =new ArrayList<EhatViewPatientServiceDetailIpdDto>();
		List<TreatmentDto> lstTreatDto = obj.getListTreatDto();
			
		try {
			
			String otProc=null;
			String treatIds="0";
			
			for(TreatmentDto dto:lstTreatDto){
				
				treatIds = treatIds + "," + dto.getTreatmentId();
			}
			chargesSlaveId = lstTreatDto.get(0).getCount();
			String sqlOpd = "";
			/*if(chargesSlaveId > 0){
				
				sqlOpd = "SELECT * FROM patient_service_detail_print_opd where charges_slave_id="+chargesSlaveId+" and service_id != "+pharmacy+" and service_id != "+pharmacyInvoice+" and patient_id = "+patientId;
			}else{
				
				sqlOpd = "SELECT *,ifnull(sum(amount),0) as gen_amount,ifnull(sum(other_amount),0) as gen_other_amount FROM patient_service_detail_print_opd where charges_slave_id="+chargesSlaveId+" and treatment_id in("+treatIds+") and service_id != "+pharmacy+" and service_id != "+pharmacyInvoice+" and patient_id = "+patientId+" group by service_id ";
			}*/

			if(chargesSlaveId == -10){
				
				sqlOpd = "SELECT *,ifnull(sum(amount),0) as gen_amount,ifnull(sum(other_amount),0) as gen_other_amount FROM patient_service_detail_print_with_paid_opd where treatment_id in("+treatIds+") and service_id != "+pharmacy+" and service_id != "+pharmacyInvoice+" and patient_id = "+patientId+" group by service_id ";
			}else{
				
				sqlOpd = "SELECT *,ifnull(sum(amount),0) as gen_amount,ifnull(sum(other_amount),0) as gen_other_amount FROM patient_service_detail_print_without_paid_opd where charges_slave_id="+chargesSlaveId+" and treatment_id in("+treatIds+") and service_id != "+pharmacy+" and service_id != "+pharmacyInvoice+" and patient_id = "+patientId+" group by service_id ";
			}			
			
	        SQLQuery queryOpd = sessionFactory.getCurrentSession().createSQLQuery(sqlOpd);
	        queryOpd.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        @SuppressWarnings("unchecked")
			List<Map<String, Object>> dataOpd = queryOpd.list();
				          
	        for(Map<String, Object> row : dataOpd){
	        	 
	        	 EhatViewPatientServiceDetailIpdDto objDTO= new EhatViewPatientServiceDetailIpdDto();
	        	 objDTO.setServiceId((Integer)row.get("service_id"));
	        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
	        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));		        	
	        	 objDTO.setServiceName((String)row.get("service_name"));
	        	 /*if(chargesSlaveId > 0){
	        		 objDTO.setAmount((Double)row.get("amount"));
		        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
	        	 }else{
	        		 objDTO.setAmount((Double)row.get("gen_amount"));
		        	 objDTO.setOtherAmount((Double)row.get("gen_other_amount"));
	        	 }*/
	        	 objDTO.setAmount((Double)row.get("gen_amount"));
	        	 objDTO.setOtherAmount((Double)row.get("gen_other_amount"));
	        	 
	        	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
	        	 objDTO.setIscombination((String)row.get("iscombination"));
	        	
	        	 listServiceIpdDto.add(objDTO);
	        	 objDTO=null;
	        }		        
	       
	        String sql = "";
			/*if(chargesSlaveId > 0){
				
				sql = "SELECT * FROM patient_service_detail_print_ipd where charges_slave_id="+chargesSlaveId+" and service_id != "+pharmacy+" and service_id != "+pharmacyInvoice+" and patient_id = "+patientId;
			}else{
				
				sql = "SELECT *,ifnull(sum(amount),0) as gen_amount,ifnull(sum(other_amount),0) as gen_other_amount FROM patient_service_detail_print_ipd where treatment_id in("+treatIds+") and service_id != "+pharmacy+" and service_id != "+pharmacyInvoice+" and patient_id = "+patientId+" group by service_id ";
			}*/
	        
	        //sql = "SELECT *,ifnull(sum(amount),0) as gen_amount,ifnull(sum(other_amount),0) as gen_other_amount FROM patient_service_detail_print_ipd where charges_slave_id="+chargesSlaveId+" and treatment_id in("+treatIds+") and service_id != "+pharmacy+" and service_id != "+pharmacyInvoice+" and patient_id = "+patientId+" group by service_id ";
	        
	        if(chargesSlaveId == -10){
				
				sql = "SELECT *,ifnull(sum(amount),0) as gen_amount,ifnull(sum(other_amount),0) as gen_other_amount FROM patient_service_detail_print_with_paid_ipd where treatment_id in("+treatIds+") and service_id != "+pharmacy+" and service_id != "+pharmacyInvoice+" and patient_id = "+patientId+" group by service_id ";
			}else{
				
				sql = "SELECT *,ifnull(sum(amount),0) as gen_amount,ifnull(sum(other_amount),0) as gen_other_amount FROM patient_service_detail_print_without_paid_ipd where charges_slave_id="+chargesSlaveId+" and treatment_id in("+treatIds+") and service_id != "+pharmacy+" and service_id != "+pharmacyInvoice+" and patient_id = "+patientId+" group by service_id ";
			}
	        
	        SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
	        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        @SuppressWarnings("unchecked")
			List<Map<String, Object>> data = query.list();
	        
	        for(Map<String, Object> row : data){
	        	 
	        	 EhatViewPatientServiceDetailIpdDto objDTO= new EhatViewPatientServiceDetailIpdDto();
	        	 objDTO.setServiceId((Integer)row.get("service_id"));
	        	 int aaa=(Integer)row.get("service_id");
	        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
	        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
	        	 objDTO.setIscombination((String)row.get("iscombination"));		        	
	        	 objDTO.setServiceName((String)row.get("service_name"));
	        	 /*if(chargesSlaveId > 0){
	        		 objDTO.setAmount((Double)row.get("amount"));
		        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
	        	 }else{
	        		 objDTO.setAmount((Double)row.get("gen_amount"));
		        	 objDTO.setOtherAmount((Double)row.get("gen_other_amount"));
	        	 }*/	        	 
	        	 objDTO.setAmount((Double)row.get("gen_amount"));
	        	 objDTO.setOtherAmount((Double)row.get("gen_other_amount"));
	        	 
	        	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
	        	 objDTO.setPaidFlag((String)row.get("paid_flag"));		        	 
	        	 otProc = (String) row.get("ot_procedure").toString();
	        	 
	        	 if(!(otProc.equals(null) || otProc.equals("0") || otProc.equals("-"))){
		        	 
	        		 if(aaa==4){
						
						if (otProc.equals(null) || otProc.equals("0")) {

						} else {

							String sql1 = "SELECT GROUP_CONCAT(o.OName SEPARATOR ' , ') AS OName "
										+ "FROM (ehat_view_patient_service_detail_ipd_meesha b join operation o)"
										+ "where b.treatment_id='"+treatmentId+"' and b.service_id='4' and o.Operation_id in("+otProc+")";

							SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
							query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> data1 = query1.list();								
							for (Map<String, Object> row1 : data1) {
									
								objDTO.setOtProcedure((String) row1.get("OName"));									
							}
						}
					}	        	 
	        	}
	        	 
	        	listServiceIpdDto.add(objDTO);	        	
	        	objDTO=null;
	        }	
	        
	        ArrayList<Integer> al = new ArrayList<Integer>();
        	for(EhatViewPatientServiceDetailIpdDto objLst : listServiceIpdDto){
        		    		
        		int srvId = objLst.getServiceId();
        		if(!al.contains(srvId)){
        			
        			al.add(srvId);
        		}
        	}
        	
        	for(Integer servId : al){
        		
        		double amount=0;
    			double otherAmount=0;
    			String srvName="";
    			
    			EhatViewPatientServiceDetailIpdDto objAdd = new EhatViewPatientServiceDetailIpdDto();
    					
        		for(EhatViewPatientServiceDetailIpdDto objLt : listServiceIpdDto){
	        			
        			if(objLt.getServiceId() == servId){
        				
        				srvName = objLt.getServiceName();
        				amount = amount + objLt.getAmount();
        				otherAmount = otherAmount + objLt.getOtherAmount();	        				 				
        			}
        		}
        		
        		objAdd.setServiceId(servId);
				objAdd.setServiceName(srvName);
				objAdd.setAmount(amount);
				objAdd.setOtherAmount(otherAmount);
	        		
    			lstServiceIpdDto.add(objAdd);
    			objAdd = null;        
			}		

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return listServiceIpdDto;
		}
		return lstServiceIpdDto;
	}

	@Override
	public List<EhatViewPatientSubServiceDetailsIpdDto> getPatientServiceBill(
			BillReceiptMasterDTO obj) {
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
		String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");    
		String pharmacy_chrges = (String)resourceBundleEhat.getString("pharmacy");    
		int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
		int pharmacy = Integer.parseInt(pharmacy_chrges);
		
		List<EhatViewPatientSubServiceDetailsIpdDto> listSubServiceIpdDto = new ArrayList<EhatViewPatientSubServiceDetailsIpdDto>();
		List<TreatmentDto> lstTreatDto = obj.getListTreatDto();
		
		try {
			String treatIds="0";
			for(TreatmentDto dto:lstTreatDto){
				
				treatIds = treatIds + "," + dto.getTreatmentId();
			}
			
			int treatmentId = obj.getTreatmentId();
			int patientId = obj.getPatientId();
			int chargesSlaveId = obj.getSponsorCatId();
			int userId = obj.getCreatedBy();
			int serviceId = obj.getAgainstId();
			
			/*if(serviceId==14){
				
					//String sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"'";
					String sql1 = "SELECT * FROM ehat_bill_details_ipd where charges_slave_id="+chargesSlaveId+" and service_id='"+serviceId+"' and patient_id = "+patientId+" and paid_by_cash_flag='N' and deleted = 'N' ";
										
					SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			         
			        @SuppressWarnings("unchecked")
					List<Map<String, Object>> data1 = query1.list();
			         			         
			        for(Map<String, Object> row : data1){
			        	 
			        	 EhatViewPatientSubServiceDetailsIpdDto objDTO1= new EhatViewPatientSubServiceDetailsIpdDto();
			        	 
			        	 objDTO1.setServiceId((Integer)row.get("service_id"));
			        	 int aa=(Integer)row.get("service_id");
			        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
			        	 objDTO1.setIsCategory((String)row.get("isCategory"));
			        	 //objDTO1.setCategoryName((String)row.get("category_name"));
			        	 
			        	// objDTO1.setDocName((String)row.get("doc_name"));
			        	
			        	 objDTO1.setDocId((Integer)row.get("doctor_id"));
			        	 
			        	String sql= "SELECT doc_name FROM doctor where Doctor_ID=:docId";
			        Query query= sessionFactory.getCurrentSession().createSQLQuery(sql)
			        	 .setParameter("docId", objDTO1.getDocId());
			        String docName = (String) query.uniqueResult();
			        
			        objDTO1.setDocName(docName);
			        	 //objDTO1.setDocId((Integer)row.get("Doctor_ID"));
			        	 //objDTO1.setBedHall((String)row.get("BedHall"));
			        	 objDTO1.setRate((Double)row.get("rate"));
			        	 
			        	 objDTO1.setAmount((Double)row.get("amount"));
			        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
			        	 objDTO1.setQuantity((Double)row.get("quantity"));
			        	 objDTO1.setConcession((Double)row.get("concession"));
			        	 objDTO1.setConcessionPer((Double)row.get("concession_per"));
			        	 objDTO1.setPay((Double)row.get("pay"));
			        	 objDTO1.setCoPay((Double)row.get("co_pay"));
			        	 objDTO1.setCancle((String)row.get("cancle"));
			        	 objDTO1.setIsModify((String)row.get("isModify"));
			        	 objDTO1.setCghsCode((String)row.get("cgscode"));
			        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
			        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
			        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
			        	
			        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
			        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
			        
			        	 objDTO1.setCreatedDate((Date)row.get("created_date_time"));
			        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
			        	 objDTO1.setDrdeskflag((String) row.get("drdesk_flag"));
			        	 int bb=(Integer)row.get("sub_service_id");
			        	 
			        	 if(aa==14)
			        	 {		
								String sql3 = "SELECT inv_consumption_info_slave_item_name AS IName FROM inv_consumption_item_info_slave where inv_consumption_item_info_slave_item_code = "+bb+" ";
											

								SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
								query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
								List<Map<String, Object>> data3 = query3.list();
								//System.err.println("ot len-----------------------"+data1.size());
								for (Map<String, Object> row3 : data3) {
										
									objDTO1.setInventoryName((String) row3.get("IName"));
									//listServiceIpdDto.add(objDTO);
								}
							
						}
			       			
			        	if(objDTO1.getSubServiceId()<=6)
			        	{
			        		 String name = (String) resourceBundleEhat.getString(objDTO1.getSubServiceId().toString());
				        	 objDTO1.setOtName(name);
			        	}
			        	else{
			        		String sql12= "SELECT category_name FROM ehat_subservice where id=:subServiceId";
					        Query query12= sessionFactory.getCurrentSession().createSQLQuery(sql12)
					        	 .setParameter("subServiceId", objDTO1.getSubServiceId());
					        String subServiceId = (String) query12.uniqueResult();
					        objDTO1.setCategoryName(subServiceId);
					        
					        String sql123= "SELECT isCategory FROM ehat_subservice where id=:subServiceId";
					        Query query123= sessionFactory.getCurrentSession().createSQLQuery(sql123)
					        	 .setParameter("subServiceId", objDTO1.getSubServiceId());
					        String subServiceId1 = (String) query123.uniqueResult();
					        
					        objDTO1.setIsCategory(subServiceId1);
					        
					       // System.err.println("hiii"+objDTO1.getCategoryName());
					        //System.err.println("hiii"+objDTO1.getIsCategory());
			        	}
			        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
			        	 listSubServiceIpdDto.add(objDTO1);
			        	 objDTO1=null;
			         
				}
			          						
			}else*/if(serviceId==16){
				
					//String sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"'";
					String sql1 = "SELECT * FROM ehat_bill_details_ipd where charges_slave_id="+chargesSlaveId+" and service_id='"+serviceId+"'and patient_id = "+patientId+" and paid_by_cash_flag='N' and deleted = 'N' ";
										
					SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			         
			        @SuppressWarnings("unchecked")
					List<Map<String, Object>> data1 = query1.list();			                 
			         
			        for(Map<String, Object> row : data1){
			        	 
			        	 EhatViewPatientSubServiceDetailsIpdDto objDTO1= new EhatViewPatientSubServiceDetailsIpdDto();
			        	 
			        	 objDTO1.setServiceId((Integer)row.get("service_id"));
			        	 int aa=(Integer)row.get("service_id");
			        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
			        	 objDTO1.setIsCategory((String)row.get("isCategory"));
			        	 //objDTO1.setCategoryName((String)row.get("category_name"));
			        	 
			        	 // objDTO1.setDocName((String)row.get("doc_name"));
			        	
			        	 objDTO1.setDocId((Integer)row.get("doctor_id"));
			        	 
			        	 String sql= "SELECT doc_name FROM doctor where Doctor_ID=:docId";
			        	 Query query= sessionFactory.getCurrentSession().createSQLQuery(sql).setParameter("docId", objDTO1.getDocId());
			        	 String docName = (String) query.uniqueResult();
			        
			             objDTO1.setDocName(docName);
			        	 //objDTO1.setDocId((Integer)row.get("Doctor_ID"));
			        	 //objDTO1.setBedHall((String)row.get("BedHall"));
			        	 objDTO1.setRate((Double)row.get("rate"));
			        	 
			        	 objDTO1.setAmount((Double)row.get("amount"));
			        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
			        	 objDTO1.setQuantity((Double)row.get("quantity"));
			        	 objDTO1.setConcession((Double)row.get("concession"));
			        	 objDTO1.setPay((Double)row.get("pay"));
			        	 objDTO1.setCoPay((Double)row.get("co_pay"));
			        	 objDTO1.setCancle((String)row.get("cancle"));
			        	 objDTO1.setIsModify((String)row.get("isModify"));
			        	 objDTO1.setCghsCode((String)row.get("cgscode"));
			        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
			        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
			        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
			        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
			        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
			        	 objDTO1.setConcessionPer((Double)row.get("concession_per"));
			        	 objDTO1.setCreatedDate((Date)row.get("created_date_time"));
			        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
			        	 objDTO1.setDrdeskflag((String) row.get("drdesk_flag"));
			        	 int bb=(Integer)row.get("sub_service_id");
			        	 
			        	 if(aa==16)
			        	 {		
								String sql3 = "SELECT product_name as productName FROM pharma_product_master where product_id = "+bb+" ";
											

								SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
								query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
								List<Map<String, Object>> data3 = query3.list();
								//System.err.println("ot len-----------------------"+data1.size());
								for (Map<String, Object> row3 : data3) {
										
									objDTO1.setPharmaName((String) row3.get("productName"));
									//listServiceIpdDto.add(objDTO);
								}									
						}
			       		
			        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
			        	 listSubServiceIpdDto.add(objDTO1);
			        	 objDTO1=null;
			         
				}
			          						
			}else if(serviceId==-5){	
				
				String sqlOpd = "";
				/*if(chargesSlaveId > 0){
					 sqlOpd = "SELECT * FROM ehat_bill_details where charges_slave_id="+chargesSlaveId+" and patient_id = "+patientId+" and service_id="+serviceId;
				}else{
					 sqlOpd = "SELECT * FROM ehat_bill_details where treatment_id in("+treatIds+") and charges_slave_id="+chargesSlaveId+" and patient_id = "+patientId+" and service_id="+serviceId;
				}*/
				
				sqlOpd = "SELECT * FROM ehat_bill_details where treatment_id in("+treatIds+") and paid_by_cash_flag='N' and patient_id = "+patientId+" and service_id="+serviceId;
				
				SQLQuery queryOpd = sessionFactory.getCurrentSession().createSQLQuery(sqlOpd);
				queryOpd.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		        @SuppressWarnings("unchecked")
		        List<Map<String, Object>> dataOpd = queryOpd.list();
		         			         
		        for(Map<String, Object> row : dataOpd){
		        	 
		        	 EhatViewPatientSubServiceDetailsIpdDto objDTO1= new EhatViewPatientSubServiceDetailsIpdDto();
		        	 
		        	 objDTO1.setServiceId((Integer)row.get("service_id"));
		        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO1.setCancle((String)row.get("cancle"));
		        	 objDTO1.setRate((Double)row.get("rate"));
		        	 objDTO1.setAmount((Double)row.get("amount"));
		        	 objDTO1.setQuantity((Double)row.get("quantity"));
		        	 objDTO1.setConcession((Double)row.get("concession"));
		        	 objDTO1.setConcessionPer((Double)row.get("concession_in_Perc"));
		        	 objDTO1.setPay((Double)row.get("pay"));
		        	 objDTO1.setCoPay((Double)row.get("co_pay"));
		        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
		        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));		        	
		        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
		        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));		        
		        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
		        	 
		        	 listSubServiceIpdDto.add(objDTO1);
		        	 objDTO1=null;
		         }
		        
		        String sql1 = "";
				/*if(chargesSlaveId > 0){
					
					sql1 = "SELECT * FROM ehat_bill_details_ipd where paid_by_cash_flag='N' and charges_slave_id="+chargesSlaveId+" and patient_id = "+patientId+" and service_id="+serviceId;	
				}else{
					
					sql1 = "SELECT * FROM ehat_bill_details_ipd where treatment_id in("+treatIds+") and paid_by_cash_flag='N' and charges_slave_id="+chargesSlaveId+" and patient_id = "+patientId+" and service_id="+serviceId;
				}*/
				
		        sql1 = "SELECT * FROM ehat_bill_details_ipd where treatment_id in("+treatIds+") and paid_by_cash_flag='N' and patient_id = "+patientId+" and service_id="+serviceId;
				
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		        @SuppressWarnings("unchecked")
		        List<Map<String, Object>> data1 = query1.list();
		         			         
		        for(Map<String, Object> row : data1){
		        	 
		        	 EhatViewPatientSubServiceDetailsIpdDto objDTO1= new EhatViewPatientSubServiceDetailsIpdDto();
		        	 
		        	 objDTO1.setServiceId((Integer)row.get("service_id"));
		        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO1.setCancle((String)row.get("cancle"));
		        	 objDTO1.setRate((Double)row.get("rate"));
		        	 objDTO1.setAmount((Double)row.get("amount"));
		        	 objDTO1.setQuantity((Double)row.get("quantity"));
		        	 objDTO1.setConcession((Double)row.get("concession"));
		        	 objDTO1.setConcessionPer((Double)row.get("concession_per"));
		        	 objDTO1.setPay((Double)row.get("pay"));
		        	 objDTO1.setCoPay((Double)row.get("co_pay"));
		        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
		        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));		        	
		        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
		        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));		        
		        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
		        	 
		        	 listSubServiceIpdDto.add(objDTO1);
		        	 objDTO1=null;
		         }
		        
			}else{
				
				String sqlIpd = "";
				/*
					if(chargesSlaveId > 0){
						 sqlIpd = "SELECT * FROM patient_sub_service_details where service_id != "+pharmacy+" and service_id != "+pharmacyInvoice+" and paid_by_cash_flag='N' and charges_slave_id="+chargesSlaveId+" and patient_id = "+patientId+" and service_id="+serviceId;
				}else{
					 sqlIpd = "SELECT * FROM patient_sub_service_details where treatment_id in("+treatIds+") and service_id != "+pharmacy+" and service_id != "+pharmacyInvoice+" and paid_by_cash_flag='N' and charges_slave_id="+chargesSlaveId+" and patient_id = "+patientId+" and service_id="+serviceId;
				}*/
				
				if(chargesSlaveId == -10){
					
					sqlIpd = "SELECT * FROM patient_sub_service_details where treatment_id in("+treatIds+") and service_id != "+pharmacy+" and service_id != "+pharmacyInvoice+" and paid_by_cash_flag='Y' and patient_id = "+patientId+" and service_id="+serviceId;
				}else{
					
					sqlIpd = "SELECT * FROM patient_sub_service_details where treatment_id in("+treatIds+") and service_id != "+pharmacy+" and service_id != "+pharmacyInvoice+" and paid_by_cash_flag='N' and charges_slave_id="+chargesSlaveId+" and patient_id = "+patientId+" and service_id="+serviceId;
				}		
				
				SQLQuery queryOpd = sessionFactory.getCurrentSession().createSQLQuery(sqlIpd);
				queryOpd.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		        @SuppressWarnings("unchecked")
		        List<Map<String, Object>> dataOpd = queryOpd.list();
		         			         
			    for(Map<String, Object> row : dataOpd){ 
			        	
			        EhatViewPatientSubServiceDetailsIpdDto objDTO1= new EhatViewPatientSubServiceDetailsIpdDto();
		        	 
		        	 objDTO1.setServiceId((Integer)row.get("service_id"));
		        	 int aaa=(Integer)row.get("service_id");
		        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO1.setCategoryName((String)row.get("category_name"));
		        	 objDTO1.setDocName((String)row.get("doc_name"));
		        	 
		        	 int drId = ((Number)row.get("Doctor_ID")).intValue();
		        	 
		        	 objDTO1.setDocId(drId);		        	
		        	 objDTO1.setRate((Double)row.get("rate"));
		        	 objDTO1.setAmount((Double)row.get("amount"));
		        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	 objDTO1.setQuantity((Double)row.get("quantity"));
		        	 objDTO1.setConcession((Double)row.get("concession"));
		        	 objDTO1.setConcessionPer((Double)row.get("concession_in_Perc"));
		        	 objDTO1.setPay((Double)row.get("pay"));
		        	 objDTO1.setCoPay((Double)row.get("co_pay"));
		        	 objDTO1.setCancle((String)row.get("cancle"));
		        	 objDTO1.setIsModify((String)row.get("isModify"));
		        	 objDTO1.setCghsCode((String)row.get("cgscode"));
		        	 objDTO1.setIscombination((String)row.get("iscombination"));
		        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
		        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));		        	
		        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
		        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));		        
		        	 objDTO1.setCreatedDate((Date)row.get("created_date"));
		        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
		        	 objDTO1.setDrdeskflag((String) row.get("drdesk_flag"));
		        	 int bbb=(Integer)row.get("sub_service_id");
		        	 
		        	 if(aaa == pharmacyInvoice &&  bbb == 9){
		        		 
		        		 objDTO1.setCategoryName((String)row.get("drdesk_flag"));	
		        	 }else{
		        		 
		        		 objDTO1.setCategoryName((String)row.get("category_name"));	
		        	 }	        	 
		        	 
		        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));		        	 
		        	 objDTO1.setSndtolabflag((String) row.get("sndtolabflag"));
		 			 objDTO1.setSndtorisflag((String) row.get("sndtorisflag"));		        	
		        	 objDTO1.setEmrPer((Double)row.get("emrPer"));
		        	 objDTO1.setPaidByCashFlag((String)row.get("paid_by_cash_flag"));
		        	 
		        	 listSubServiceIpdDto.add(objDTO1);
		        	 objDTO1=null;
		        }
				
				String otProc=null;
				String sql1 = "";
				
				/*if(chargesSlaveId > 0){
					 sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where service_id != "+pharmacy+" and service_id != "+pharmacyInvoice+" and paid_by_cash_flag='N' and charges_slave_id="+chargesSlaveId+" and patient_id = "+patientId+" and service_id='"+serviceId+"'";
				}else{
					 sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where treatment_id in("+treatIds+") and service_id != "+pharmacy+" and service_id != "+pharmacyInvoice+" and paid_by_cash_flag='N' and charges_slave_id="+chargesSlaveId+" and patient_id = "+patientId+" and service_id='"+serviceId+"'";	
				}*/
				if(chargesSlaveId == -10){
					
					sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where treatment_id in("+treatIds+") and service_id != "+pharmacy+" and service_id != "+pharmacyInvoice+" and paid_by_cash_flag='Y' and patient_id = "+patientId+" and service_id='"+serviceId+"'";
				}else{
					
					sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where treatment_id in("+treatIds+") and service_id != "+pharmacy+" and service_id != "+pharmacyInvoice+" and paid_by_cash_flag='N' and charges_slave_id="+chargesSlaveId+" and patient_id = "+patientId+" and service_id='"+serviceId+"'";
				}				
								
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         @SuppressWarnings("unchecked")
		         List<Map<String, Object>> data1 = query1.list();
		         			         
		         for(Map<String, Object> row : data1){
		        	 
		        	 EhatViewPatientSubServiceDetailsIpdDto objDTO1= new EhatViewPatientSubServiceDetailsIpdDto();
		        	 
		        	 objDTO1.setServiceId((Integer)row.get("service_id"));
		        	 int aaa=(Integer)row.get("service_id");
		        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO1.setCategoryName((String)row.get("category_name"));
		        	 objDTO1.setDocName((String)row.get("doc_name"));
		        	 
		        	 int drId = ((Number)row.get("Doctor_ID")).intValue();
		        	 
		        	 objDTO1.setDocId(drId);
		        	/* objDTO1.setDocId((Integer)row.get("Doctor_ID"));*/
		        	 //objDTO1.setBedHall((String)row.get("BedHall"));
		        	 objDTO1.setRate((Double)row.get("rate"));
		        	 objDTO1.setAmount((Double)row.get("amount"));
		        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	 objDTO1.setQuantity((Double)row.get("quantity"));
		        	 objDTO1.setConcession((Double)row.get("concession"));
		        	 objDTO1.setConcessionPer((Double)row.get("concession_per"));
		        	 objDTO1.setPay((Double)row.get("pay"));
		        	 objDTO1.setCoPay((Double)row.get("co_pay"));
		        	 objDTO1.setCancle((String)row.get("cancle"));
		        	 objDTO1.setIsModify((String)row.get("isModify"));
		        	 objDTO1.setCghsCode((String)row.get("cgscode"));
		        	 objDTO1.setIscombination((String)row.get("iscombination"));
		        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
		        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
		        	
		        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
		        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
		        
		        	 objDTO1.setCreatedDate((Date)row.get("created_date"));
		        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
		        	 objDTO1.setDrdeskflag((String) row.get("drdesk_flag"));
		        	 int bbb=(Integer)row.get("sub_service_id");
		        	 //Pooja
		        	 if(aaa == pharmacyInvoice &&  bbb == 9){
		        		 
		        		 objDTO1.setCategoryName((String)row.get("drdesk_flag"));	
		        	 }else{
		        		 
		        		 objDTO1.setCategoryName((String)row.get("category_name"));	
		        	 }		        	 
		        	 
		        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
		        	 objDTO1.setOtProcedureId((String) row.get("ot_procedure"));
		        	 objDTO1.setSndtolabflag((String) row.get("sndtolabflag"));
		 			 objDTO1.setSndtorisflag((String) row.get("sndtorisflag"));
		        	 otProc = (String) row.get("ot_procedure").toString();
		        	 objDTO1.setEmrPer((Double)row.get("emrPer"));
		        	 objDTO1.setPaidByCashFlag((String)row.get("paid_by_cash_flag"));
		        	 
		        	 if(!(otProc.equals(null) || otProc.equals("0") || otProc.equals("-"))){
			        	 
		        		 if(aaa==4){
							
		        			 if (otProc.equals(null) || otProc.equals("0")) {
		
							}else{
		
								String sql2 = "SELECT GROUP_CONCAT(o.OName SEPARATOR ' , ') AS OName "
											+ "FROM (ehat_view_patient_service_detail_ipd_meesha b join operation o)"
											+ "where b.treatment_id='"+treatmentId+"' and b.service_id='4' and o.status='Y' and o.Operation_id in("+otProc+")";
		
								SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
								query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
								List<Map<String, Object>> data2 = query2.list();
								for (Map<String, Object> row2 : data2) {
										
									objDTO1.setOtProcedure((String) row2.get("OName"));									
								}
							}
						}  			        	 
			        }
		        	listSubServiceIpdDto.add(objDTO1);
		        	objDTO1=null;
		         }
			}
			
			

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return listSubServiceIpdDto;
		}
		return listSubServiceIpdDto;
	}

	@Override
	public List<EhatViewPatientBedDetailsIpdDto> getPatientBedBill(
			BillReceiptMasterDTO obj) {
		List<EhatViewPatientBedDetailsIpdDto> listBedIpdDto = new ArrayList<EhatViewPatientBedDetailsIpdDto>();
		try {
			
			int chargesSlaveId = obj.getSponsorCatId();
			int patientId = obj.getPatientId();
			int treatmentId = obj.getTreatmentId();
			int serviceId = obj.getAgainstId();
			List<TreatmentDto> lstTreatDto = obj.getListTreatDto();
			String treatIds="0";
			for(TreatmentDto dto:lstTreatDto){
				
				treatIds = treatIds + "," + dto.getTreatmentId();
			}
			
			String sql1="";
			if(chargesSlaveId == -10){
				
				sql1 = "SELECT * FROM ehat_view_patient_bed_details_ipd where paid_by_cash_flag='Y' and treatment_id in("+treatIds+") and service_id='"+serviceId+"' and deleted='N'";
			}else{
				
				sql1 = "SELECT * FROM ehat_view_patient_bed_details_ipd where charges_slave_id="+chargesSlaveId+" and paid_by_cash_flag='N' and treatment_id in("+treatIds+") and service_id='"+serviceId+"' and deleted='N'";
			}			
			
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
	         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         @SuppressWarnings("unchecked")
			List<Map<String, Object>> data1 = query1.list();
	         
	         for(Map<String, Object> row : data1){
	        	 
	        	 EhatViewPatientBedDetailsIpdDto objDTO1= new EhatViewPatientBedDetailsIpdDto();
	        	 
	        	 objDTO1.setServiceId((Integer)row.get("service_id"));
	        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
	        	 objDTO1.setCategoryName((String)row.get("category_name"));
	        	 objDTO1.setIsCategory((String)row.get("isCategory"));
	        	 
	        	// objDTO1.setDocName((String)row.get("doc_name"));
	        	 //objDTO1.setDocId((Integer)row.get("Doctor_ID"));
	        	 //objDTO1.setDocId(Integer)row.get("Doctor_ID"));
	        	 objDTO1.setBedHall((String)row.get("BedHall"));
	        	 objDTO1.setRate((Double)row.get("rate"));
	        	 objDTO1.setAmount((Double)row.get("amount"));
	        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
	        	 objDTO1.setQuantity((Double)row.get("quantity"));
	        	 objDTO1.setConcession((Double)row.get("concession"));
	        	 objDTO1.setConcessionPer((Double)row.get("concession_per"));
	        	 objDTO1.setPay((Double)row.get("pay"));
	        	 objDTO1.setCoPay((Double)row.get("co_pay"));
	        	 objDTO1.setCancle((String)row.get("cancle"));
	        	// objDTO1.setIsModify((String)row.get("isModify"));
	        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
	        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
	        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
	        	
	        	 objDTO1.setOtherPay((Double)row.get("other_pay"));
	        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
	        
	        	 objDTO1.setCreatedDate((Date)row.get("created_date"));
	        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
	        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
	        	 
	        	 objDTO1.setEhatHallId((BigInteger) row.get("ehat_hallid"));
	        	 objDTO1.setHallID((BigInteger) row.get("Hall_ID"));
	        	 objDTO1.setIdHallType((BigInteger) row.get("idhall_type"));
	        	 objDTO1.setEhatHalltypeId((BigInteger) row.get("ehat_halltype_id"));
	        	 objDTO1.setBedId((BigInteger) row.get("bed_id"));
	        	 objDTO1.sethName((String) row.get("hall_type_name"));
	        	 objDTO1.setPaidByCashFlag((String) row.get("paid_by_cash_flag"));
	        	 listBedIpdDto.add(objDTO1);
	        	 objDTO1=null;
	         
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return listBedIpdDto;
		}
		return listBedIpdDto;
	}

	@Override
	public List<PharmacyDetailsOnBillingPrintDto> getPharmacyDetailsONBillingPrint(
			BillReceiptMasterDTO obj) {
		
		int patientId = obj.getPatientId();
		int spId = obj.getSponsorCatId();
		List<PharmacyDetailsOnBillingPrintDto> listPharmacyDetailsOnBillingPrintDto =new ArrayList<PharmacyDetailsOnBillingPrintDto>();
		try {
		
			List<TreatmentDto> lstTreatDto = obj.getListTreatDto();
			String treatIds="0";
			for(TreatmentDto dto:lstTreatDto){
				
				treatIds = treatIds + "," + dto.getTreatmentId();
			}
			// String sql = "SELECT * FROM ehat_view_patient_service_detail_ipd_meesha where treatment_id = '"+treatmentId+"'";
			String sql="";
			if(spId > 0){
				
				sql = "SELECT pharma_indent_sale_master.indent_sale_id,pharma_indent_sale_master.indent_sale_received_date,pharma_indent_sale_master.indent_sale_gross_amt " +
				 		"FROM pharma_indent_master INNER JOIN pharma_indent_sale_master " +
				 		"ON pharma_indent_master.indent_id = pharma_indent_sale_master.indent_sale_indent_no where bill_Category_id="+spId+" and pharma_indent_master.indent_treatement_id in("+treatIds+") and pharma_indent_master.indent_patient_id="+patientId;
				
			}else{
				
				sql = "SELECT pharma_indent_sale_master.indent_sale_id,pharma_indent_sale_master.indent_sale_received_date,pharma_indent_sale_master.indent_sale_gross_amt " +
				 		"FROM pharma_indent_master INNER JOIN pharma_indent_sale_master " +
				 		"ON pharma_indent_master.indent_id = pharma_indent_sale_master.indent_sale_indent_no where bill_Category_id="+spId+" and pharma_indent_master.indent_treatement_id in("+treatIds+") and pharma_indent_master.indent_patient_id="+patientId;
			}					
			
	        SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
	        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        @SuppressWarnings("unchecked")
			List<Map<String, Object>> data = query.list();
	       
	         for(Map<String, Object> row : data){
	        	 
	        	 PharmacyDetailsOnBillingPrintDto objDTO= new PharmacyDetailsOnBillingPrintDto();
	        	 objDTO.setInvoiceNo((Integer)row.get("indent_sale_id"));
	        	 objDTO.setDate((Date)row.get("indent_sale_received_date"));
	        	 objDTO.setAmount((Double)row.get("indent_sale_gross_amt"));
	        	 objDTO.setSaleName("IS");
	        	
	        	
	        	 listPharmacyDetailsOnBillingPrintDto.add(objDTO);
	        	 objDTO=null;
	         }
	         String sql1="";
	         if(spId > 0){
	        	 
	        	 sql1 = "SELECT patient_sales_bill_id,patient_bill_date,patient_sales_bill_net_amt FROM pharma_patient_sales_bill_master where patient_sale_treatmentId in("+treatIds+") and patient_bill_patient_id="+patientId+" and patient_bill_sponser_id="+spId;
	         }else{
	        	 
	        	 sql1 = "SELECT patient_sales_bill_id,patient_bill_date,patient_sales_bill_net_amt FROM pharma_patient_sales_bill_master where patient_sale_treatmentId in("+treatIds+") and patient_bill_patient_id="+patientId+" and patient_bill_sponser_id="+spId;
	         }
			 
	         SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
	         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         @SuppressWarnings("unchecked")
			List<Map<String, Object>> data1 = query1.list();
	       
	         for(Map<String, Object> row : data1){
	        	 
	        	 PharmacyDetailsOnBillingPrintDto objDTO= new PharmacyDetailsOnBillingPrintDto();
	        	 objDTO.setInvoiceNo((Integer)row.get("patient_sales_bill_id"));
	        	 objDTO.setDate((Date)row.get("patient_bill_date"));
	        	 objDTO.setAmount((Double)row.get("patient_sales_bill_net_amt"));
	        	 objDTO.setSaleName("PS");
	        	
	        	
	        	 listPharmacyDetailsOnBillingPrintDto.add(objDTO);
	        	 objDTO=null;
	         }

	         return listPharmacyDetailsOnBillingPrintDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return listPharmacyDetailsOnBillingPrintDto;
		}
		
			
	}

	@Override
	public List<CommonadvDto> getCommonadv(BillReceiptMasterDTO obj) {
		
		int patId= obj.getPatientId();
		List<CommonadvDto> listCadv = new ArrayList<CommonadvDto>();	
		List<TreatmentDto> lstTreatDto = obj.getListTreatDto();
		String treatIds="0";
		for(TreatmentDto dto:lstTreatDto){
			
			treatIds = treatIds + "," + dto.getTreatmentId();
		}
		try {		
				
			String sql="select ifnull(sum(remaining_common_amnt),0) FROM ehat_common_advance_master where treatment_id in("+treatIds+") and deleted='N' and patient_id="+patId;
			Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			double totalAdvance =(Double) spQuery.uniqueResult();
			
			CommonadvDto objCA = new CommonadvDto();
			objCA.setRemaining_amnt(totalAdvance);
			listCadv.add(objCA);					
			
		} catch (Exception e) {
			e.printStackTrace();
			return listCadv;
		}
		return listCadv;

	}

	@Override
	public double getPharmaReturn(BillReceiptMasterDTO obj) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public BillReceiptMasterDTO fetchAllReceiptTotals(BillReceiptMasterDTO obj) {
		
		BillReceiptMasterDTO masterObj=new BillReceiptMasterDTO();
		
		try {			
			
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
			String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");   
			String pharmacy_Serve_Id = (String)resourceBundleEhat.getString("pharmacy");    
			int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
			int pharmacyServId = Integer.parseInt(pharmacy_Serve_Id);
				
			String sql="";
			double ipdRefund=0;
			double totAmt=0,totConcn=0,totDisc=0,totPaid=0,totRemain=0,totRefund=0;
			int patId = obj.getPatientId();
			int spId = obj.getSponsorCatId();
			
			List<TreatmentDto> lstTreatDto = obj.getListTreatDto();
			String treatIds="0";
			for(TreatmentDto dto:lstTreatDto){
				
				treatIds = treatIds + "," + dto.getTreatmentId();
			}
			
			//============ For Opd ============================
			
			if(spId == -10){
				
				sql="select ifnull(sum(amount),0) as totAmt,ifnull(sum(concession),0) as totConcn FROM ehat_bill_details where treatment_id in("+treatIds+") and deleted='N' and patient_id="+patId+" and cancle='N' and paid_by_cash_flag='Y' and service_id != "+pharmacyInvoice+" ";
			}else if(spId > 0){
				
				sql="select ifnull(sum(other_amount),0) as totAmt,ifnull(sum(other_concession),0) as totConcn FROM ehat_bill_details where treatment_id in("+treatIds+") and deleted='N' and patient_id="+patId+" and charges_slave_id="+spId+" and cancle='N' and paid_by_cash_flag='N' and service_id != "+pharmacyInvoice+" and service_id != -5 ";
			}else{
				
				sql="select ifnull(sum(amount),0) as totAmt,ifnull(sum(concession),0) as totConcn FROM ehat_bill_details where treatment_id in("+treatIds+") and deleted='N' and patient_id="+patId+" and charges_slave_id="+spId+" and cancle='N' and paid_by_cash_flag='N' and service_id != "+pharmacyInvoice+" and service_id != -5 ";
			}			
			
			Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			billDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")			
			List<Map<String, Object>> listBillDetails = billDetailsQuery.list();
			for(Map<String, Object> row : listBillDetails){
				
				totAmt=(Double)row.get("totAmt");
				totConcn=(Double)row.get("totConcn");					
			}
			
			if(spId == -10){
				
				sql="select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid," +
						"ifnull(sum(total_remain),0) as totRemain,ifnull(sum(refund_amt),0) as totRefund FROM ehat_receipt_master where treatment_id in("+treatIds+") and deleted='N' and paid_by_cash_flag='Y' and patient_id="+patId+" and against_id=0 ";
			
			}else{
				
				sql="select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid," +
						"ifnull(sum(total_remain),0) as totRemain,ifnull(sum(refund_amt),0) as totRefund FROM ehat_receipt_master where treatment_id in("+treatIds+") and deleted='N' and paid_by_cash_flag='N' and patient_id="+patId+" and sponsor_cat_id="+spId+" and against_id=0 ";
			
			}
			
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
			
			/*sql="select ifnull(sum(paid_amt),0) FROM ehat_bulk_settlement_slave where treatment_id in("+treatIds+") and deleted='N' and patient_id="+patId;
			Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			double totalSpnsrpaid =(Double) spQuery.uniqueResult();
			
			sql="select ifnull(sum(concession),0) FROM ehat_bulk_settlement_slave where treatment_id in("+treatIds+") and deleted='N' and patient_id="+patId;
			Query conQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			double totalSpnsrCon =(Double) conQuery.uniqueResult();
			
			sql="select ifnull(sum(tds_amt),0) FROM ehat_bulk_settlement_slave where treatment_id in("+treatIds+") and deleted='N' and patient_id="+patId;
			Query tdsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			double totalSpnsrTds =(Double) tdsQuery.uniqueResult();
					
			totalSpnsrpaid = totalSpnsrpaid + totalSpnsrCon + totalSpnsrTds;*/
			
			
			
			//================= For Ipd =============================
			if(spId == -10){
				
				sql="select ifnull(sum(amount),0) as totAmt,ifnull(sum(concession),0) as totConcn FROM ehat_bill_details_ipd where treatment_id in("+treatIds+") and deleted='N' and patient_id="+patId+" and cancle='N' and paid_by_cash_flag='Y' and service_id != "+pharmacyInvoice+" ";
			}else if(spId > 0){
				
				sql="select ifnull(sum(other_amount),0) as totAmt,ifnull(sum(other_concession),0) as totConcn FROM ehat_bill_details_ipd where treatment_id in("+treatIds+") and deleted='N' and patient_id="+patId+" and charges_slave_id="+spId+" and cancle='N' and paid_by_cash_flag='N' and service_id != "+pharmacyInvoice+" and service_id != -5 ";
			}else{
				
				sql="select ifnull(sum(amount),0) as totAmt,ifnull(sum(concession),0) as totConcn FROM ehat_bill_details_ipd where treatment_id in("+treatIds+") and deleted='N' and patient_id="+patId+" and charges_slave_id="+spId+" and cancle='N' and paid_by_cash_flag='N' and service_id != "+pharmacyInvoice+" and service_id != -5 ";
			}	
			
			Query billDetailsIpdQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			billDetailsIpdQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")			
			List<Map<String, Object>> listBillDetailsIpd = billDetailsIpdQuery.list();
			for(Map<String, Object> row : listBillDetailsIpd){
				
				totAmt = totAmt + (Double)row.get("totAmt");
				totConcn = totConcn + (Double)row.get("totConcn");					
			}			
			
			if(spId == -10){
				
				sql="select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid," +
						"ifnull(sum(total_remain),0) as totRemain FROM ehat_receipt_master_ipd where treatment_id in("+treatIds+") and deleted='N' and paid_by_cash_flag='Y' and patient_id="+patId+" and against_id=0 ";
				
			}else{
				
				sql="select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid," +
						"ifnull(sum(total_remain),0) as totRemain FROM ehat_receipt_master_ipd where treatment_id in("+treatIds+") and deleted='N' and paid_by_cash_flag='N' and patient_id="+patId+" and sponsor_cat_id="+spId+" and against_id=0 ";
				
			}
			
			String sqlRef="select ifnull(sum(total_paid),0) from ehat_refund_master_ipd where treatment_id in("+treatIds+") and deleted='N' and sponsor_cat_id="+spId+" and patient_id="+patId+" ";
			Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
			ipdRefund =(Double) refQuery.uniqueResult();
				
			Query recQueryIpd = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recQueryIpd.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listRecIpd = recQueryIpd.list();
			for(Map<String, Object> row : listRecIpd){
				
				totPaid = totPaid + (Double)row.get("totPaid");			
				totRemain = totRemain + (Double)row.get("totRemain");					
				totRefund = totRefund + ipdRefund;					
			}
					
			sql="select ifnull(sum(approved_amt),0) FROM ehat_ipdbill_discount where treatment_id in("+treatIds+") and sponsor_cat_id="+spId+" and deleted='N' and patient_id="+patId;
			Query discQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			totDisc = totDisc + (Double) discQuery.uniqueResult();
					
			sql="select ifnull(sum(paid_amt),0) FROM ehat_bulk_settlement_slave where treatment_id in("+treatIds+") and sponsor_cat_id="+spId+" and deleted='N' and patient_id="+patId;
			Query spQueryIpd = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			double totalSpnsrpaidIpd = (Double) spQueryIpd.uniqueResult();
			
			sql="select ifnull(sum(concession),0) FROM ehat_bulk_settlement_slave where treatment_id in("+treatIds+") and sponsor_cat_id="+spId+" and deleted='N' and patient_id="+patId;
			Query conQueryIpd = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			double totalSpnsrConIpd = (Double) conQueryIpd.uniqueResult();
			
			sql="select ifnull(sum(tds_amt),0) FROM ehat_bulk_settlement_slave where treatment_id in("+treatIds+") and sponsor_cat_id="+spId+" and deleted='N' and patient_id="+patId;
			Query tdsQueryIpd = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			double totalSpnsrTdsIpd = (Double) tdsQueryIpd.uniqueResult();
						
			totalSpnsrpaidIpd = totalSpnsrpaidIpd + totalSpnsrConIpd + totalSpnsrTdsIpd;
			
			//totalSpnsrpaid = totalSpnsrpaid + totalSpnsrpaidIpd;
			
			masterObj.setActualAmt(totAmt);
			masterObj.setActualTotConcn(totConcn);
			masterObj.setTotalDisc(totDisc);
			masterObj.setTotalPaid(totPaid);
			masterObj.setTotalRemain(totRemain);
			masterObj.setRefundAmt(totRefund);
			masterObj.setTotalSonsorAmt(totalSpnsrpaidIpd);		
					
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		return masterObj;
	}
	
	@Override
	public List<EhatViewPatientSubServiceDetailsIpdDto> getPatientServiceBillPharmacyInvoice(
			BillReceiptMasterDTO obj) {
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
		String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");    
		String pharmacy_chrges = (String)resourceBundleEhat.getString("pharmacy");    
		int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
		int pharmacy = Integer.parseInt(pharmacy_chrges);
		
		List<EhatViewPatientSubServiceDetailsIpdDto> listSubServiceIpdDto = new ArrayList<EhatViewPatientSubServiceDetailsIpdDto>();
		try {
			
			int treatmentId = obj.getTreatmentId();
			int patientId = obj.getPatientId();
			int chargesSlaveId = obj.getSponsorCatId();
			int userId = obj.getCreatedBy();
			int serviceId = obj.getAgainstId();
			
			List<TreatmentDto> lstTreatDto = obj.getListTreatDto();
			String treatIds="0";
			for(TreatmentDto dto:lstTreatDto){
				
				treatIds = treatIds + "," + dto.getTreatmentId();
			}
			
			if(serviceId==pharmacyInvoice){
			
				String sqlOpd = "SELECT * FROM patient_sub_service_details where treatment_id in("+treatIds+") and paid_by_cash_flag='N' and charges_slave_id="+chargesSlaveId+" and patient_id = "+patientId+" and service_id="+serviceId;
				
				SQLQuery queryOpd = sessionFactory.getCurrentSession().createSQLQuery(sqlOpd);
				queryOpd.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		        @SuppressWarnings("unchecked")
		        List<Map<String, Object>> dataOpd = queryOpd.list();
		         			         
			    for(Map<String, Object> row : dataOpd){ 
			        	
			        EhatViewPatientSubServiceDetailsIpdDto objDTO1= new EhatViewPatientSubServiceDetailsIpdDto();
		        	 
		        	objDTO1.setServiceId((Integer)row.get("service_id"));
		        	 int aaa=(Integer)row.get("service_id");
		        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO1.setCategoryName((String)row.get("category_name"));
		        	 objDTO1.setDocName((String)row.get("doc_name"));
		        	 
		        	 //int drId = ((Number)row.get("Doctor_ID")).intValue();
		        	 
		        	 //objDTO1.setDocId(drId);		        	
		        	 objDTO1.setRate((Double)row.get("rate"));
		        	 objDTO1.setAmount((Double)row.get("amount"));
		        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	 objDTO1.setQuantity((Double)row.get("quantity"));
		        	 objDTO1.setConcession((Double)row.get("concession"));
		        	 objDTO1.setConcessionPer((Double)row.get("concession_in_Perc"));
		        	 objDTO1.setPay((Double)row.get("pay"));
		        	 objDTO1.setCoPay((Double)row.get("co_pay"));
		        	 objDTO1.setCancle((String)row.get("cancle"));
		        	 objDTO1.setIsModify((String)row.get("isModify"));
		        	 objDTO1.setCghsCode((String)row.get("cgscode"));
		        	 objDTO1.setIscombination((String)row.get("iscombination"));
		        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
		        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));		        	
		        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
		        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));		        
		        	 objDTO1.setCreatedDate((Date)row.get("created_date"));
		        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
		        	 objDTO1.setDrdeskflag((String) row.get("drdesk_flag"));
		        	 int bbb=(Integer)row.get("sub_service_id");
		        	 
		        	 if(aaa == pharmacyInvoice &&  bbb == 9){
		        		 
		        		 objDTO1.setCategoryName((String)row.get("drdesk_flag"));	
		        	 }else{
		        		 
		        		 objDTO1.setCategoryName((String)row.get("category_name"));	
		        	 }	        	 
		        	 
		        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));		        	 
		        	 objDTO1.setSndtolabflag((String) row.get("sndtolabflag"));
		 			 objDTO1.setSndtorisflag((String) row.get("sndtorisflag"));		        	
		        	 objDTO1.setEmrPer((Double)row.get("emrPer"));
		        	 objDTO1.setPaidByCashFlag((String)row.get("paid_by_cash_flag"));
		        	 
		        	 listSubServiceIpdDto.add(objDTO1);
		        	 objDTO1=null;
		        }
				
				String otProc=null;
				String sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where treatment_id in("+treatIds+") and paid_by_cash_flag='N' and charges_slave_id="+chargesSlaveId+" and patient_id = "+patientId+" and service_id="+serviceId;
				
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         @SuppressWarnings("unchecked")
		         List<Map<String, Object>> data1 = query1.list();
		         			         
		         for(Map<String, Object> row : data1){
		        	 
		        	 EhatViewPatientSubServiceDetailsIpdDto objDTO1= new EhatViewPatientSubServiceDetailsIpdDto();
		        	 
		        	 objDTO1.setServiceId((Integer)row.get("service_id"));
		        	 int aaa=(Integer)row.get("service_id");
		        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO1.setCategoryName((String)row.get("category_name"));
		        	 objDTO1.setDocName((String)row.get("doc_name"));
		        	 
		        	 //int drId = ((Number)row.get("Doctor_ID")).intValue();
		        	 
		        	 //objDTO1.setDocId(drId);
		        	/* objDTO1.setDocId((Integer)row.get("Doctor_ID"));*/
		        	 //objDTO1.setBedHall((String)row.get("BedHall"));
		        	 objDTO1.setRate((Double)row.get("rate"));
		        	 objDTO1.setAmount((Double)row.get("amount"));
		        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	 objDTO1.setQuantity((Double)row.get("quantity"));
		        	 objDTO1.setConcession((Double)row.get("concession"));
		        	 objDTO1.setConcessionPer((Double)row.get("concession_per"));
		        	 objDTO1.setPay((Double)row.get("pay"));
		        	 objDTO1.setCoPay((Double)row.get("co_pay"));
		        	 objDTO1.setCancle((String)row.get("cancle"));
		        	 objDTO1.setIsModify((String)row.get("isModify"));
		        	 objDTO1.setCghsCode((String)row.get("cgscode"));
		        	 objDTO1.setIscombination((String)row.get("iscombination"));
		        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
		        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
		        	
		        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
		        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
		        
		        	 objDTO1.setCreatedDate((Date)row.get("created_date"));
		        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
		        	 objDTO1.setDrdeskflag((String) row.get("drdesk_flag"));
		        	 int bbb=(Integer)row.get("sub_service_id");
		        	 //Pooja
		        	 if(aaa == pharmacyInvoice &&  bbb == 9){
		        		 
		        		 objDTO1.setCategoryName((String)row.get("drdesk_flag"));	
		        	 }else{
		        		 
		        		 objDTO1.setCategoryName((String)row.get("category_name"));	
		        	 }		        	 
		        	 
		        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
		        	 objDTO1.setOtProcedureId((String) row.get("ot_procedure"));
		        	 objDTO1.setSndtolabflag((String) row.get("sndtolabflag"));
		 			 objDTO1.setSndtorisflag((String) row.get("sndtorisflag"));
		        	 otProc = (String) row.get("ot_procedure").toString();
		        	 objDTO1.setEmrPer((Double)row.get("emrPer"));
		        	 objDTO1.setPaidByCashFlag((String)row.get("paid_by_cash_flag"));
		        	 
		        	 if(!(otProc.equals(null) || otProc.equals("0") || otProc.equals("-"))){
			        	 
		        		 if(aaa==4){
							
		        			 if (otProc.equals(null) || otProc.equals("0")) {
		
							}else{
		
								String sql2 = "SELECT GROUP_CONCAT(o.OName SEPARATOR ' , ') AS OName "
											+ "FROM (ehat_view_patient_service_detail_ipd_meesha b join operation o)"
											+ "where b.treatment_id='"+treatmentId+"' and b.service_id='4' and o.status='Y' and o.Operation_id in("+otProc+")";
		
								SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
								query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
								List<Map<String, Object>> data2 = query2.list();
								for (Map<String, Object> row2 : data2) {
										
									objDTO1.setOtProcedure((String) row2.get("OName"));									
								}
							}
						}  			        	 
			        }
		        	listSubServiceIpdDto.add(objDTO1);
		        	objDTO1=null;
		         }
			}			

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return listSubServiceIpdDto;
		}
		return listSubServiceIpdDto;
	}	

	@Override
	public BillMasterAllTreat getBilledBillNo(BillReceiptMasterDTO obj) {
		
		BillMasterAllTreat objBill = new BillMasterAllTreat();
		try {
			
			int patId = obj.getPatientId();
			List<TreatmentDto> lstTreatDto = obj.getListTreatDto();
			String patTreatIds="0";
						
			String sql="select count(bill_master_id) FROM ehat_bill_master_treats where patient_id="+patId+" and deleted='N' ";
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			int count = ((Number)countQuery.uniqueResult()).intValue();
			
			if(count > 0){
				
				sql = "select ifnull(treatment_ids,'0') as treatment_ids,bill_master_id from ehat_bill_master_treats where patient_id="+patId+" and deleted='N' ";
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> data = query.list();
				for (Map<String, Object> row : data) {
					
					patTreatIds = (String) row.get("treatment_ids");
					int billNo = (Integer) row.get("bill_master_id");
					
					List<String> mstIds = new ArrayList<String>();
					
					if(patTreatIds.contains(",")){
						
						String ar[] = patTreatIds.split(",");
						for(String ss : ar){
							
							mstIds.add(ss);
						}
						
					}else{
						
						mstIds.add(patTreatIds);			
					}	
					
					if(mstIds.size() > 0){
						
						for(String s:mstIds){
							
							String[] sptreatId=new String[2];	
							sptreatId=s.split("_");
							int treatId = Integer.parseInt(sptreatId[0]);
							int spsrId = Integer.parseInt(sptreatId[1]);
							
							for(TreatmentDto pojo:lstTreatDto){
								
								if(pojo.getTreatmentId() == treatId && pojo.getCount() == spsrId){
									
									objBill.setBillMasterId(billNo);
								}
							}						
						}
					}
				}				
			}			
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());			
		}
		
		return objBill;
	}
	
	@Override
	public List<OpdDiagnoReportMeeshaDTO> getOpdDeletedServiceBills(int unitId,
			int userId, String fDate, String tDate) {
		
		List<OpdDiagnoReportMeeshaDTO> ltPatientRecord = new ArrayList<OpdDiagnoReportMeeshaDTO>();
		
		try {
			
			//String sql = "select * from ehat_opd_bill_deleted_view where deleted='N' and date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"'";
			String sql="SELECT p.patient_id AS patient_id,r.bill_id AS bill_id,r.treatment_id AS treatment_id,r.created_date_time AS created_date_time,r.deleted AS deleted,CONCAT(p.prefix,' ',p.f_name,' ', p.m_name,' ',p.l_name) AS patient_name,IFNULL(d.doc_name, 'NONE') AS doc_name,IFNULL(s.category_name, 'REGISTRATION') AS service_name,IFNULL(cm.category_name, '-') AS sponsor_name,IF((r.charges_slave_id > 0),IFNULL(r.other_amount, 0),IFNULL(r.amount, 0)) AS bill_amt,IFNULL(r.rate, 0) AS rate,IFNULL(r.other_rate, 0) AS other_rate,IFNULL(r.quantity, 1) AS quantity,IFNULL(t.referred_by, '-') AS source_by,IFNULL(cd.docName, '-') AS ref_docName,IFNULL(unt.unit_name, '-') AS unit_name,r.canceled_date_time AS canceled_date_time,IFNULL(CONCAT(un.title,' ',un.f_name,' ',un.m_name,' ',un.l_name),'-') AS canceled_user_name,CONCAT(u.title,' ',u.f_name,' ',u.m_name,' ',u.l_name) AS user_name , `r`.`remarkcanceltest` AS `refRemark` "
					+ "FROM ehat_bill_details r LEFT JOIN ehat_patient p ON r.patient_id = p.patient_id "
					+ "LEFT JOIN ehat_treatment t ON r.treatment_id = t.treatment_id LEFT JOIN users u ON u.User_ID = r.created_by "
					+ "LEFT JOIN users un ON un.User_ID = r.canceled_by LEFT JOIN doctor d ON d.Doctor_ID = r.doctor_id "
					+ "LEFT JOIN ehat_subservice s ON s.id = r.sub_service_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = t.ref_doc_id "
					+ "LEFT JOIN ehat_charges_master_slave cm ON cm.id = r.charges_slave_id LEFT JOIN ehat_unit_master unt ON unt.unit_id = r.unit_id "
					+ "WHERE r.cancle = 'Y' AND r.deleted='N' AND date(r.created_date_time) >= '"+fDate+"' AND date(r.created_date_time) <= '"+tDate+"'";
			Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listRec = recQuery.list();
			for(Map<String, Object> row : listRec){
				
				OpdDiagnoReportMeeshaDTO objMaster=new OpdDiagnoReportMeeshaDTO();				
				objMaster.setBillId((Integer)row.get("bill_id"));
				objMaster.setBillDate((Date)row.get("created_date_time"));	
				objMaster.setPatientName((String)row.get("patient_name"));
				objMaster.setRefDr((String)row.get("ref_docName"));
				objMaster.setSourceName((String)row.get("source_by"));
				objMaster.setBillAmt((Double)row.get("bill_amt"));				
				objMaster.setPrice((Double)row.get("rate"));
				objMaster.setQty((Double)row.get("quantity"));				
				objMaster.setAmount((Double)row.get("bill_amt"));			
				objMaster.setServiceName((String)row.get("service_name"));					
				objMaster.setTreatDr((String)row.get("doc_name"));
				objMaster.setUser((String)row.get("user_name"));								
				objMaster.setSponsorName((String)row.get("sponsor_name"));	
				objMaster.setUnitName((String)row.get("unit_name"));
				objMaster.setDeletedBy((String)row.get("canceled_user_name"));
				objMaster.setDeletedDate((Date)row.get("canceled_date_time"));
				objMaster.setRefRemark((String)row.get("refRemark"));
				ltPatientRecord.add(objMaster);
				objMaster=null;
			}		

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}
	
	@Override
	public List<OpdDiagnoReportMeeshaDTO> getOpdRefundReport(int unitId,
			int userId, String fDate, String tDate) {
		
		List<OpdDiagnoReportMeeshaDTO> ltPatientRecord = new ArrayList<OpdDiagnoReportMeeshaDTO>();
		
		try {
			
			String sql = "select * from ehat_opd_refund_view_meesha where deleted='N' and date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"'";
			Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listRec = recQuery.list();
			for(Map<String, Object> row : listRec){
				
				OpdDiagnoReportMeeshaDTO objMaster=new OpdDiagnoReportMeeshaDTO();				
				objMaster.setBillId((Integer)row.get("bill_id"));
				objMaster.setBillNo((Integer)row.get("rec_id"));
				objMaster.setAgainstId((Integer)row.get("against_id"));
				objMaster.setBillDate((Date)row.get("created_date_time"));	
				objMaster.setPatientName((String)row.get("patient_name"));
				objMaster.setRefDr((String)row.get("referred_by"));
				objMaster.setBillAmt((Double)row.get("rec_amount"));				
				objMaster.setPaidAmt((Double)row.get("ref_amount"));	
				objMaster.setRemainAmt((Double)row.get("remain_ref_amount"));		
				objMaster.setRefGivenBy((String)row.get("ref_given_by"));	
				objMaster.setRefRemark((String)row.get("ref_remark"));	
				objMaster.setUser((String)row.get("user_name"));								
				objMaster.setUnitName((String)row.get("unit_name"));
				ltPatientRecord.add(objMaster);
				objMaster=null;
			}		

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}
	
	@Override
	public List<OpdDiagnoReportMeeshaDTO> getOpdDiscountReport(int unitId,
			int userId, String fDate, String tDate) {
		
		List<OpdDiagnoReportMeeshaDTO> ltPatientRecord = new ArrayList<OpdDiagnoReportMeeshaDTO>();
		
		try {
			
			String sql = "select * from ehat_opd_discount_view_meesha where deleted='N' and date(created_date_time) >= '"+fDate+"' and date(created_date_time) <= '"+tDate+"'";
			Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listRec = recQuery.list();
			for(Map<String, Object> row : listRec){
				
				OpdDiagnoReportMeeshaDTO objMaster=new OpdDiagnoReportMeeshaDTO();				
				objMaster.setBillId((Integer)row.get("bill_id"));
				objMaster.setBillNo((Integer)row.get("rec_id"));
				objMaster.setBillDate((Date)row.get("created_date_time"));	
				objMaster.setPatientName((String)row.get("patient_name"));
				objMaster.setRefDr((String)row.get("referred_by"));
				objMaster.setBillAmt((Double)row.get("rec_amount"));		
				objMaster.setDiscount((Double)row.get("disc_amount"));		
				objMaster.setPaidAmt((Double)row.get("paid_amount"));
				objMaster.setRemainAmt((Double)row.get("remain_amount"));		
				objMaster.setRefGivenBy((String)row.get("disc_given_by"));	
				objMaster.setRefRemark((String)row.get("disc_remark"));	
				objMaster.setUser((String)row.get("user_name"));								
				objMaster.setUnitName((String)row.get("unit_name"));
				ltPatientRecord.add(objMaster);
				objMaster=null;
			}		

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}
	
	@Override
	public List<OpdDiagnoReportMeeshaDTO> getPackageReport(int unitId,
			int userId, String fDate, String tDate) {
		
		List<OpdDiagnoReportMeeshaDTO> ltPatientRecord = new ArrayList<OpdDiagnoReportMeeshaDTO>();
		
		try {
			
			String sql = "select * from ehat_package_report_view_meesha where deleted='N' and date(bill_date_time) >= '"+fDate+"' and date(bill_date_time) <= '"+tDate+"'";
			Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listRec = recQuery.list();
			for(Map<String, Object> row : listRec){
				
				OpdDiagnoReportMeeshaDTO objMaster=new OpdDiagnoReportMeeshaDTO();				
				//objMaster.setBillNo(((BigInteger)row.get("rec_id")).intValue());
				objMaster.setBillId((Integer)row.get("bill_id"));
				objMaster.setBillDate((Date)row.get("bill_date_time"));	
				objMaster.setPatientName((String)row.get("patient_name"));
				objMaster.setMobile((String)row.get("mobile_no"));
				objMaster.setRefDr((String)row.get("ref_docName"));
				objMaster.setSourceName("walkin");
				objMaster.setBillAmt((Double)row.get("bill_amt"));
				objMaster.setPaidAmt((Double)row.get("paid_amt"));
				objMaster.setDiscount((Double)row.get("disc_amt"));
				objMaster.setConcession((Double)row.get("concession"));
				objMaster.setPrice((Double)row.get("rate"));
				objMaster.setQty((Double)row.get("quantity"));				
				objMaster.setAmount((Double)row.get("amount"));			
				objMaster.setRemainAmt(objMaster.getBillAmt()-(objMaster.getPaidAmt()+objMaster.getConcession()+objMaster.getDiscount()));				
				objMaster.setSourceGroup((String)row.get("service_name"));
				objMaster.setCategoryName((String)row.get("par_category_name"));
				objMaster.setServiceName((String)row.get("comp_name"));					
				objMaster.setTreatDr((String)row.get("doc_name"));
				objMaster.setUser((String)row.get("user_name"));								
				//objMaster.setAutheriseBy((String)row.get("rec_id"));
				objMaster.setSponsorName((String)row.get("sponsor_name"));	
				objMaster.setUnitName((String)row.get("unit_name"));	
				objMaster.setPkgName((String)row.get("package_name"));	
				objMaster.setPkgAmount((Double)row.get("package_amount"));
				
				ltPatientRecord.add(objMaster);
				objMaster=null;
			}		

		} catch (Exception e) {
			e.printStackTrace();
			return ltPatientRecord;
		}
		return ltPatientRecord;
	}
}
