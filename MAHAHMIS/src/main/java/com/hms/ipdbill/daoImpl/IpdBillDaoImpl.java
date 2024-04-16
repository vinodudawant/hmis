package com.hms.ipdbill.daoImpl;

import java.math.BigInteger;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.StringJoiner;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.SimpleExpression;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dto.HospitalAccDetails;
import com.hms.ehat.controller.OTPercentageDTO;
import com.hms.ehat.controller.RegistrationController;
import com.hms.ehat.dao.impl.BillNobleDaoImpl;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.BillMasterDto;
import com.hms.ehat.dto.BillNobleServicePackageipdDto;
import com.hms.ehat.dto.BillQuotationDto;
import com.hms.ehat.dto.CghsIpdDto;
import com.hms.ehat.dto.ComAdvbifergationDto;
import com.hms.ehat.dto.CommonadvDto;
import com.hms.ehat.dto.ConfigurationViewServiceDto2;
import com.hms.ehat.dto.DistributionPojo;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.EhatOtherBillDetailForIpdDto;
import com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto;
import com.hms.ehat.dto.EhatViewPatientServiceDetailIpdDto;
import com.hms.ehat.dto.EhatViewPatientServiceDetailIpdDto2;
import com.hms.ehat.dto.EhatViewPatientSubServiceDetailsForIpdPackage;
import com.hms.ehat.dto.EhatViewPatientSubServiceDetailsIpdDto;
import com.hms.ehat.dto.EhatViewPatientSubServiceDetailsIpdDto2;
import com.hms.ehat.dto.FinanceReportAmtDto;
import com.hms.ehat.dto.GetPopUpDataForOTDto;
import com.hms.ehat.dto.LabRequestDTO;
import com.hms.ehat.dto.LabRequestSlaveDTO;
import com.hms.ehat.dto.MultipleSponsorDto;
import com.hms.ehat.dto.NewBillQuotation;
import com.hms.ehat.dto.PharmacyDetailsOnBillingPrintDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.dto.TokenDto;
import com.hms.ehat.dto.TreatMentBeds;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipdbill.dao.IpdBillDao;
import com.hms.ipdbill.dto.EmrChargesDto;
import com.hms.ipdbill.dto.IpdBillDTO;
import com.hms.ipdbill.dto.IpdBillDiscount;
import com.hms.ipdbill.dto.IpdBillPatientsBedsDTO;
import com.hms.ipdbill.dto.IpdBillPatientsDTO;
import com.hms.ipdbill.dto.IpdBillPatientsDTO2;
import com.hms.ipdbill.dto.IpdBillReceiptMasterDTO;
import com.hms.ipdbill.dto.IpdBillReceiptSlaveDTO;
import com.hms.ipdbill.dto.IpdBillRefundMasterDTO;
import com.hms.ipdbill.dto.IpdQueueDTO;
import com.hms.ipdbill.dto.MultiBillReceiptMasterDTO;
import com.hms.ot.dto.PtientOperation;
import com.hms.ot.dto.TreatmentOperations;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.dao.impl.IndentDaoImpl;
import com.hms.pharmacy.dao.impl.PatientSaleBillDaoImpl;
import com.hms.registration.dto.PatientRegChargesDto;
import com.hms.utility.ApplicationContextUtils;

@Repository("old ipdbilldao")
public class IpdBillDaoImpl implements IpdBillDao {

	@Autowired
	SessionFactory sessionFactory;
	
	//@Autowired
	//PatientSaleBillDaoImpl patientSaleBillDaoImpl;
	
	@Autowired
	IndentDaoImpl indentDaoImpl;
	
	@Autowired
	BillNobleDaoImpl billNobleDaoImpl;
	
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("ipdbill_operation_slave");
	//String autoLimitStr = (String) resourceBundleEhat.getString("1");
	
	@SuppressWarnings("unchecked")
	@Override
	public List<IpdQueueDTO> getIpdQueue(Integer unitId) {
		System.err.println("unitId...."+unitId);
		
		List<IpdQueueDTO> ltIpdQueue = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IpdQueueDTO.class);
			if(unitId > 0){
				criteria.add(Restrictions.eq("unitId", unitId));
			}
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("pId"));
			System.err.println("unitId....");
			ltIpdQueue = criteria.list();
	
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"+
                    e.getStackTrace()[0].getClassName()+" Method Name : "+
                    e.getStackTrace()[0].getMethodName()+" Line No :"+ e.getStackTrace()[0].getLineNumber());
			return ltIpdQueue;
		}
		return ltIpdQueue;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<IpdQueueDTO> getAutoSuggestionIpdQueue(String letter) {
		List<IpdQueueDTO> lstIpdQueue = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IpdQueueDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("pId"));			
			
			Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
			Criterion rest2= Restrictions.like("mobile", "%" + letter + "%");
			Criterion rest3= Restrictions.like("mrnno", "%" + letter + "%");
			Criterion rest4= Restrictions.like("pIdd", "%" + letter + "%");
			criteria.add(Restrictions.or(rest1, rest2,rest3,rest4));
			criteria.setMaxResults(10);
			lstIpdQueue = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"+
                    e.getStackTrace()[0].getClassName()+" Method Name : "+
                    e.getStackTrace()[0].getMethodName()+" Line No :"+ e.getStackTrace()[0].getLineNumber());
			return lstIpdQueue;
		}
		return lstIpdQueue;
	}	
	
	public int saveIpdBillDetails(IpdBillDTO objDto){
		
		objDto.setCreatedDateTime(new java.util.Date());	
		objDto.setPaidFlag("N");	
		try {
			
			sessionFactory.getCurrentSession().merge(objDto);
			
			int servId=objDto.getSubServiceId();
			SubServiceDto objService=(SubServiceDto) sessionFactory
					.getCurrentSession().get(SubServiceDto.class, servId);
			objService.setStatus(1);			
			
		} catch (Exception e) {
			
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"+
                    e.getStackTrace()[0].getClassName()+" Method Name : "+
                    e.getStackTrace()[0].getMethodName()+" Line No :"+ e.getStackTrace()[0].getLineNumber());
			return 0;
		}
		return 1;		
	}
		
	@SuppressWarnings("unchecked")
	@Override
	public List<IpdBillPatientsDTO> getIpdbillPatients(String general, Integer unitId,Integer userId1, String userType,int hallTypeId, int hallId,String filter) {
		List<IpdBillPatientsDTO> ltIpdbillPatients = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IpdBillPatientsDTO.class);
			
			
			if(userType.equalsIgnoreCase("doctor")){
				
				Session session = sessionFactory.getCurrentSession();
				
				 String hql = "select Doctor_ID from doctor where User_ID=:UserID";
					Query query = session.createSQLQuery(hql);
					query.setParameter("UserID", userId1);
					String docId = query.uniqueResult().toString();
					
					
					
					String all = "SELECT bill_id FROM ehat_ipdbill_patients WHERE"
							+ "(doctor_id = "
							+ docId
							+ " OR doctor_id LIKE '"
							+ docId
							+ ",%'"
							+ " OR doctor_id LIKE '%,"
							+ docId
							+ ",%' OR doctor_id LIKE '%,"
							+ docId
							+ "') and t_flag =:tFlag"
							+" and unit_id =:unitId and patient_id order by 'desc'";
							
					
					Query query2 = session.createSQLQuery(all);
					//query2.setParameter("deptId", deptId);
					query2.setParameter("tFlag", "Y");
					query2.setParameter("unitId", unitId);
					
	        		 query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        		 List<Map<String, Object>> data1 = query2.list();
						
						ArrayList<Integer> billIdArr = new ArrayList<Integer>();
						
						for (Map<String, Object> row1 : data1) {
							int bId = (Integer) row1.get("bill_id");
							billIdArr.add(bId);
						}
	        		 
	        		 
	        		 if(unitId > 0){//get list unit wise.
							criteria.add(Restrictions.eq("unitId", unitId));
						}
						//criteria.add(Restrictions.eq("departmentId", deptId));
						/*criteria.add(Restrictions.eq("tFlag", "Y"));
						criteria.add(Restrictions.in("billId", billIdArr));
						//System.err.println("in daoIMPL=="+deptId);
						criteria.addOrder(Order.desc("patientId"));
		
						criteria.setMaxResults(10);
						ltIpdbillPatients = criteria.list();*/
						
						
						criteria.add(Restrictions.eq("deleted", "N"));
						criteria.add(Restrictions.in("billId", billIdArr));

						if (general.equalsIgnoreCase("general")) {
							criteria.add(Restrictions.eq("invoiceFlag", "Y"));
						} else if (general.equalsIgnoreCase("ipd")) {

						} else {
							criteria.add(Restrictions.eq("invoiceFlag", "N"));
						}
						if(unitId > 0){//get unit wise patients
							criteria.add(Restrictions.eq("unitId", unitId));
						}
						
						if(hallTypeId>0){
							if (filter.equalsIgnoreCase("wardwise")){
							    
								criteria.add(Restrictions.eq("idhallType", hallTypeId));
						    	//criteria.addOrder(Order.asc("bedId"));
						    }else{
						    	criteria.add(Restrictions.eq("idhallType", hallTypeId));
						    	criteria.add(Restrictions.eq("hallID", hallId));
						    	criteria.addOrder(Order.asc("bedName"));
						    }
						}
						
						criteria.addOrder(Order.desc("pId"));
						ltIpdbillPatients = criteria.list();
			}else{
					
					criteria.add(Restrictions.eq("deleted", "N"));
		
					if (general.equalsIgnoreCase("general")) {
						criteria.add(Restrictions.eq("invoiceFlag", "Y"));
					} else if (general.equalsIgnoreCase("ipd")) {
		
					} else {
						criteria.add(Restrictions.eq("invoiceFlag", "N"));
					}
					if(unitId > 0){//get unit wise patients
						criteria.add(Restrictions.eq("unitId", unitId));
					}
					if(hallTypeId>0){
						
						if (filter.equalsIgnoreCase("wardwise")){
						    
							criteria.add(Restrictions.eq("idhallType", hallTypeId));
					    	//criteria.addOrder(Order.asc("bedId"));
					    }else{
					    	criteria.add(Restrictions.eq("idhallType", hallTypeId));
					    	criteria.add(Restrictions.eq("hallID", hallId));
					    	criteria.addOrder(Order.asc("bedName"));
					    }
					}			
					
					criteria.addOrder(Order.desc("pId"));
					ltIpdbillPatients = criteria.list();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"+
                    e.getStackTrace()[0].getClassName()+" Method Name : "+
                    e.getStackTrace()[0].getMethodName()+" Line No :"+ e.getStackTrace()[0].getLineNumber());
			return ltIpdbillPatients;
		}
		return ltIpdbillPatients;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<IpdBillDTO> getBillDetails(Integer treatId) {
		
		List<IpdBillDTO> ltIpdbilldetails = new ArrayList<IpdBillDTO>() ;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IpdBillDTO.class);
			criteria.add(Restrictions.eq("treatmentId", treatId));
			criteria.add(Restrictions.eq("deleted", "N"));			
			ltIpdbilldetails = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"+
                    e.getStackTrace()[0].getClassName()+" Method Name : "+
                    e.getStackTrace()[0].getMethodName()+" Line No :"+ e.getStackTrace()[0].getLineNumber());
			return ltIpdbilldetails;
		}
		return ltIpdbilldetails;
	}
	
	@Override
	public Object getsubServiceDetails(@SuppressWarnings("rawtypes") Class className,Integer srvId){
					 
		return sessionFactory.getCurrentSession().get(className, srvId);		
	}
	
	@Override
	public List<EhatViewPatientServiceDetailIpdDto> getIpdPatientServiceListFromView(Integer treatmentId,String treatcloseForIpd) {
		
		List<EhatViewPatientServiceDetailIpdDto> listServiceIpdDto =new ArrayList<EhatViewPatientServiceDetailIpdDto>();
		try {
			String otProc=null;
			if(treatcloseForIpd.equals("treatcloseForIpd"))
			{
				 String sql = "SELECT *,date(created_date_time) as created_date FROM ehat_view_patient_service_detail_ipd_for_prev_bill_ipdsponsor where treatment_id = '"+treatmentId+"'";
		         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         @SuppressWarnings("unchecked")
				List<Map<String, Object>> data = query.list();
		       
		         for(Map<String, Object> row : data){
		        	 
		        	 EhatViewPatientServiceDetailIpdDto objDTO= new EhatViewPatientServiceDetailIpdDto();
		        	 objDTO.setServiceId((Integer)row.get("service_id"));
		        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	 objDTO.setIscombination((String)row.get("iscombination"));
		        	 
		        	 objDTO.setCreatedDate((Date)row.get("created_date"));	
		        	
		        	 objDTO.setServiceName((String)row.get("service_name"));
		        	 objDTO.setAmount((Double)row.get("amount"));
		        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
		        	 objDTO.setPaidFlag((String)row.get("paid_flag"));
		        	 objDTO.setPaidByCashFlag((String)row.get("paid_by_cash_flag"));
		        	
		        	 listServiceIpdDto.add(objDTO);
		        	 objDTO=null;
		         }
			}else{
				 String sql = "SELECT *,date(created_date_time) as created_date FROM ehat_view_patient_service_detail_ipd where treatment_id = '"+treatmentId+"'";
		         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         @SuppressWarnings("unchecked")
				List<Map<String, Object>> data = query.list();
		       
		         for(Map<String, Object> row : data){
		        	 
		        	 EhatViewPatientServiceDetailIpdDto objDTO= new EhatViewPatientServiceDetailIpdDto();
		        	 objDTO.setServiceId((Integer)row.get("service_id"));
		        	 int aaa=(Integer)row.get("service_id");
		        	// System.err.println("kkkkkk"+aaa);
		        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	 objDTO.setIscombination((String)row.get("iscombination"));		        	 
		        	 objDTO.setCreatedDate((Date)row.get("created_date"));	        	
		        	 objDTO.setServiceName((String)row.get("service_name"));
		        	 objDTO.setAmount((Double)row.get("amount"));
		        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
		        	 objDTO.setPaidFlag((String)row.get("paid_flag"));
		        	 objDTO.setPaidByCashFlag((String)row.get("paid_by_cash_flag"));
		        	 
		        	 otProc = (String) row.get("ot_procedure").toString();
		        	 
		        	 if(!(otProc.equals(null) || otProc.equals("0") || otProc.equals("-")))
		        	 {
		        	 if(aaa==4)
		        	 {
						
						if (otProc.equals(null) || otProc.equals("0")) {

						} else {

							String sql1 = "SELECT GROUP_CONCAT(o.OName SEPARATOR ' , ') AS OName "
										+ "FROM (ehat_view_patient_service_detail_ipd b join operation o)"
										+ "where b.treatment_id='"+treatmentId+"' and b.service_id='4' and o.Operation_id in("+otProc+")";

							SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
							query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> data1 = query1.list();
							//System.err.println("ot len-----------------------"+data1.size());
							for (Map<String, Object> row1 : data1) {
									
								objDTO.setOtProcedure((String) row1.get("OName"));
								//listServiceIpdDto.add(objDTO);
							}
						}
					}
		        	 
		        	 
		        	}
		        	listServiceIpdDto.add(objDTO);
		        	objDTO=null;
		         }
			}		

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return listServiceIpdDto;
		}
		return listServiceIpdDto;
	}

	//This method is use to giving Patients Estimate.
	@Override
	public List<EhatViewPatientServiceDetailIpdDto> getPatientBillAmountIpdForEstimation(
			Integer treatmentId, String startDate, String endDate,String callFrom) {
		//System.err.println("startDate==>"+startDate);
		List<EhatViewPatientServiceDetailIpdDto> listServiceIpdDto =new ArrayList<EhatViewPatientServiceDetailIpdDto>();
		try {
		
			if(callFrom.equals("prev"))
			{
				
				// String sql = "SELECT * FROM ehat_view_patient_service_detail_ipd where treatment_id = '"+treatmentId+"'";
				 String sql = "SELECT *,sum(amount) as amt,count(service_id) as count FROM ehat_view_patient_service_detail_ipd_for_prev_bill_estimate WHERE date(created_date_time) between '"+startDate+"'  and '"+endDate+"' and treatment_id='"+treatmentId+"'" +
				 		"group by service_id";
		         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         @SuppressWarnings("unchecked")
				List<Map<String, Object>> data = query.list();
		       
		         for(Map<String, Object> row : data){
		        	 
		        	 EhatViewPatientServiceDetailIpdDto objDTO= new EhatViewPatientServiceDetailIpdDto();
		        	 objDTO.setServiceId((Integer)row.get("service_id"));
		        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	
		        	 objDTO.setServiceName((String)row.get("service_name"));
		        	 objDTO.setAmount((Double)row.get("amt"));
		        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO.setServiceCount((BigInteger)row.get("count"));
		        	 objDTO.setPaidFlag((String)row.get("paid_flag"));
		        	
		        	 listServiceIpdDto.add(objDTO);
		        	 objDTO=null;
		         }
				
								
			}else{
				// String sql = "SELECT * FROM ehat_view_patient_service_detail_ipd where treatment_id = '"+treatmentId+"'";
				 String sql = "SELECT *,sum(amount) as amt,count(service_id) as count FROM ehat_view_patient_service_detail_ipd_for_estimate WHERE date(created_date_time) between '"+startDate+"'  and '"+endDate+"' and treatment_id='"+treatmentId+"'" +
				 		"group by service_id";
		         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         @SuppressWarnings("unchecked")
				List<Map<String, Object>> data = query.list();
		       
		         for(Map<String, Object> row : data){
		        	 
		        	 EhatViewPatientServiceDetailIpdDto objDTO= new EhatViewPatientServiceDetailIpdDto();
		        	 objDTO.setServiceId((Integer)row.get("service_id"));
		        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	
		        	 objDTO.setServiceName((String)row.get("service_name"));
		        	 objDTO.setAmount((Double)row.get("amt"));
		        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO.setServiceCount((BigInteger)row.get("count"));
		        	 objDTO.setPaidFlag((String)row.get("paid_flag"));
		        	
		        	 listServiceIpdDto.add(objDTO);
		        	 objDTO=null;
		         }

			
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return listServiceIpdDto;
		}
		return listServiceIpdDto;
			
	}
	
	
	//This method is use to giving particular access.
	@Override
	public List<EhatViewPatientServiceDetailIpdDto> getIpdPatientServiceListFromView(
			Integer treatmentId,String treatcloseForIpd ,Integer userId) {
		List<EhatViewPatientServiceDetailIpdDto> listServiceIpdDto =new ArrayList<EhatViewPatientServiceDetailIpdDto>();
		try {
			
			String servIds=null;
			String sql1="select service_id from users where User_ID="+userId+"";
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> data1 = query1.list();
			
			for(Map<String, Object> row : data1){
				
				servIds=(String)row.get("service_id");
			}
				
			
			
			ArrayList<Integer> servIds11=new ArrayList<Integer>();
			
			String[] servIds1 = null;
			// get checked service masters
			if(servIds.length()>0){
				
				servIds1=servIds.split(",");
				
				for(String id:servIds1){
					servIds11.add(Integer.parseInt(id));
					
				}
			}		
		/*	Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(EhatViewPatientServiceDetailIpdDto.class);
			criteria.add(Restrictions.eq("treatmentId", 31));
			//criteria.addOrder(Order.desc("idConfiguration"));
			
			listServiceIpdDto = criteria.list();*/
			
			
			
			if(!servIds.equals(null)){
				if(treatcloseForIpd.equals("treatcloseForIpd"))
				{
					for(int i=0;i<servIds1.length;i++){
						 String sql = "SELECT *,date(created_date_time) as created_date FROM ehat_view_patient_service_detail_ipd_for_prev_bill_ipdsponsor where treatment_id = '"+treatmentId+"' and service_id="+Integer.parseInt(servIds1[i])+"";
						 
				         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				         @SuppressWarnings("unchecked")
						List<Map<String, Object>> data = query.list();
				       
				         for(Map<String, Object> row : data){
				        	 
				        	 EhatViewPatientServiceDetailIpdDto objDTO= new EhatViewPatientServiceDetailIpdDto();
				        	 objDTO.setServiceId((Integer)row.get("service_id"));
				        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
				        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
				        	 objDTO.setIscombination((String)row.get("iscombination"));
				        	 objDTO.setCreatedDate((Date)row.get("created_date"));	
				        	 objDTO.setServiceName((String)row.get("service_name"));
				        	 objDTO.setAmount((Double)row.get("amount"));
				        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
				        	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
				        	 objDTO.setPaidFlag((String)row.get("paid_flag"));
				        	 objDTO.setPaidByCashFlag((String)row.get("paid_by_cash_flag"));
				        	
				        	 listServiceIpdDto.add(objDTO);
				        	 objDTO=null;
				         }
							}
					
					
				}else{
					for(int i=0;i<servIds1.length;i++){
						 String sql = "SELECT *,date(created_date_time) as created_date FROM ehat_view_patient_service_detail_ipd where treatment_id = '"+treatmentId+"' and service_id="+Integer.parseInt(servIds1[i])+"";
						 
				         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				         @SuppressWarnings("unchecked")
						List<Map<String, Object>> data = query.list();
				       
				         for(Map<String, Object> row : data){
				        	 
				        	 EhatViewPatientServiceDetailIpdDto objDTO= new EhatViewPatientServiceDetailIpdDto();
				        	 objDTO.setServiceId((Integer)row.get("service_id"));
				        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
				        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
				        	 objDTO.setIscombination((String)row.get("iscombination"));
				        	 objDTO.setCreatedDate((Date)row.get("created_date"));	
				        	 objDTO.setServiceName((String)row.get("service_name"));
				        	 objDTO.setAmount((Double)row.get("amount"));
				        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
				        	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
				        	 objDTO.setPaidFlag((String)row.get("paid_flag"));
				        	 objDTO.setPaidByCashFlag((String)row.get("paid_by_cash_flag"));
				        	
				        	 listServiceIpdDto.add(objDTO);
				        	 objDTO=null;					
				         }
							}
				}
			
				}
			}catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return listServiceIpdDto;
		}
		return listServiceIpdDto;
	}

	
	
	@Override
	public List<EhatViewPatientServiceDetailIpdDto2> getPatientPreviousBillAmountForGenIpd(
			Integer treatmentId) {
		List<EhatViewPatientServiceDetailIpdDto2> listServiceIpdDto =new ArrayList<EhatViewPatientServiceDetailIpdDto2>();
		try {
		/*	Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(EhatViewPatientServiceDetailIpdDto.class);
			criteria.add(Restrictions.eq("treatmentId", 31));
			//criteria.addOrder(Order.desc("idConfiguration"));
			
			listServiceIpdDto = criteria.list();*/
			
			 String sql = "SELECT * FROM ehat_view_patient_service_detail_ipd2 where treatment_id = '"+treatmentId+"'";
	         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
	         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         @SuppressWarnings("unchecked")
			List<Map<String, Object>> data = query.list();
	       
	         for(Map<String, Object> row : data){
	        	 
	        	 EhatViewPatientServiceDetailIpdDto2 objDTO= new EhatViewPatientServiceDetailIpdDto2();
	        	 objDTO.setServiceId((Integer)row.get("service_id"));
	        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
	        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
	        	
	        	 objDTO.setServiceName((String)row.get("service_name"));
	        	 objDTO.setAmount((Double)row.get("amount"));
	        	 //objDTO.setOtherAmount((Double)row.get("other_Amount"));
	        	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
	        	 objDTO.setPaidFlag((String)row.get("paid_flag"));
	        	
	        	 listServiceIpdDto.add(objDTO);
	        	 objDTO=null;
	         }

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return listServiceIpdDto;
		}
		return listServiceIpdDto;
	}

	//This method is use to giving Previous bill particular access.
	@Override
	public List<EhatViewPatientServiceDetailIpdDto2> getPatientPreviousBillAmountForGenIpd(
			Integer treatmentId, Integer userId) {
		List<EhatViewPatientServiceDetailIpdDto2> listServiceIpdDto =new ArrayList<EhatViewPatientServiceDetailIpdDto2>();
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
			
			String[] servIds1 = null;
			// get checked service masters
			if(servIds.length()>0){
				
				servIds1=servIds.split(",");
				
				for(String id:servIds1){
					servIds11.add(Integer.parseInt(id));
					
				}
			}		
			
			if(!servIds.equals(null)){
				//for(int i=0;i<servIds1.length;i++){
		String sql = "SELECT * FROM ehat_view_patient_service_detail_ipd2 where treatment_id = '"+treatmentId+"'and service_id in("+servIds+") ";
        SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        @SuppressWarnings("unchecked")
		List<Map<String, Object>> data = query.list();
      
        for(Map<String, Object> row : data){
       	 
       	 EhatViewPatientServiceDetailIpdDto2 objDTO= new EhatViewPatientServiceDetailIpdDto2();
       	 objDTO.setServiceId((Integer)row.get("service_id"));
       	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
       	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
       	
       	 objDTO.setServiceName((String)row.get("service_name"));
       	 objDTO.setAmount((Double)row.get("amount"));
       	 objDTO.setOtherAmount((Double)row.get("other_amount"));
       	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
       	 objDTO.setPaidFlag((String)row.get("paid_flag"));
       	
       	 listServiceIpdDto.add(objDTO);
       	 objDTO=null;
        }
				//}
			}
	} catch (Exception e) {
		e.printStackTrace();
		System.err.println("ehatException:- Class Name :"
				+ e.getStackTrace()[0].getClassName() + " Method Name : "
				+ e.getStackTrace()[0].getMethodName() + " Line No :"
				+ e.getStackTrace()[0].getLineNumber());
		return listServiceIpdDto;
	}
	return listServiceIpdDto;
}
	
	@Override
	public List<EhatViewPatientBedDetailsIpdDto> getPatientBedBill(
			Integer treatmentId, Integer serviceId) {
		List<EhatViewPatientBedDetailsIpdDto> listBedIpdDto = new ArrayList<EhatViewPatientBedDetailsIpdDto>();
		try {
			
			String sql1 = "SELECT *,date(created_date) as bed_date FROM ehat_view_patient_bed_details_ipd where treatment_id = '"+treatmentId+"' and service_id='"+serviceId+"' and deleted='N' ";
			
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
	        	 
	        	 objDTO1.setBedDate((Date)row.get("bed_date"));
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
	        	 objDTO1.sethName((String) row.get("hName"));
	        	 objDTO1.setSponsorName((String) row.get("sponsor_name"));
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
	public List<EhatViewPatientSubServiceDetailsIpdDto> getPatientServiceBill(
			Integer treatmentId, Integer serviceId) {
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
		String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");    
		int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
		
		List<EhatViewPatientSubServiceDetailsIpdDto> listSubServiceIpdDto = new ArrayList<EhatViewPatientSubServiceDetailsIpdDto>();
		try {
			
			 /*if( serviceId==2 )
				{ 
		
	         String sql="select d.doc_name,b.co_pay,b.other_co_pay,b.other_pay,b.pay,b.quantity,b.other_concession,b.doctor_id,b.concession_per,b.concession,b.rate,b.other_rate,b.bill_details_id,b.service_id,b.cancle,b.created_date_time,b.paid_flag from"+
			         " doctor d ,ehat_bill_details_ipd b where d.Doctor_ID = b.doctor_id"+
			         " and b.service_id ='"+serviceId+"' and b.treatment_id='"+treatmentId+"'and b.deleted='N'";
			
	         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
	         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         List<Map<String, Object>> data = query.list();
	         ArrayList<String> tokenlist = new ArrayList<String>();
 	         for(Map<String, Object> row : data){
 	        	EhatViewPatientSubServiceDetailsIpdDto objDTO= new EhatViewPatientSubServiceDetailsIpdDto();
	        	 objDTO.setServiceId((Integer)row.get("service_id"));
	        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
	        	 objDTO.setDocId((Integer)row.get("doctor_id")); 
	        	 objDTO.setDocName((String)row.get("doc_name"));
	        	 objDTO.setConcessionPer((Double)row.get("concession_per"));
	        	 objDTO.setConcession((Double)row.get("concession"));
	        	 objDTO.setOtherConcession((Double)row.get("other_concession"));
	        	 objDTO.setPay((Double)row.get("pay"));
	        	 objDTO.setOtherPay((Double)row.get("other_pay"));
	        	 objDTO.setCoPay((Double)row.get("co_pay"));
	        	 objDTO.setOtherCoPay((Double)row.get("other_co_pay"));
	        	 objDTO.setQuantity((Double)row.get("quantity"));
	        	 //Added By sagar...@Author-Sagar
	        	 String s1=(String)row.get("doc_name");
	        	 String[] array = s1.split(" ");
  	        	 String tk= getTokenNumber(array[0].substring(0,2),treatmentId,(Integer)row.get("doctor_id"));
        	 	 tokenlist.add(tk);
        	 	 //End Here...@Author-Sagar
        	 	 
 	        	 objDTO.setCancle ((String)row.get("cancle"));
	        	 objDTO.setRate((Double)row.get("rate"));
	        	 objDTO.setOtherRate((Double)row.get("other_rate"));
	        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
	        	 objDTO.setCreatedDate((Date)row.get("created_date_time"));
	        	 objDTO.setPaidFlag((String)row.get("paid_flag"));
	        	 listSubServiceIpdDto.add(objDTO);
	        	 objDTO=null;
	         }
	         for (String string : tokenlist) {
				System.err.println("finaltoken no-"+string);
			}
	        	String final1= Joiner.on(",").join(tokenlist);
	        	//System.err.println("single string--"+final1);
	        	Session session = sessionFactory.getCurrentSession();
	        	String hql = "UPDATE TreatmentDto set tokenno =:tkn WHERE treatmentId =:tid";
				Query query1 = session.createQuery(hql);
				query1.setParameter("tkn",final1);  
				query1.setParameter("tid", treatmentId);
 				query1.executeUpdate();
				
				}
			
			 else*/ if(serviceId==14)
			{
				
					//String sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"'";
						String sql1 = "SELECT *,date(created_date_time) as created_date FROM ehat_bill_details_ipd where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"' and deleted = 'N' ";
					
					
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
			        	 
			        	 objDTO1.setServiceDate((Date)row.get("created_date"));
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
			        	 objDTO1.setPaidByCashFlag((String) row.get("paid_by_cash_flag"));
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
			       			
			        	/*if(objDTO1.getSubServiceId()<=6)
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
			        	}*/
			        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
			        	 listSubServiceIpdDto.add(objDTO1);
			        	 objDTO1=null;
			         
				}
			          						
			}
			else if(serviceId==16)
			{
				
					//String sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"'";
						String sql1 = "SELECT *,date(created_date_time) as created_date FROM ehat_bill_details_ipd where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"' and deleted = 'N' ";
					
					
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
			        	 
			        	 objDTO1.setServiceDate((Date)row.get("created_date"));
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
			        	 objDTO1.setPaidByCashFlag((String) row.get("paid_by_cash_flag"));
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
			          						
			}
			else if(serviceId==-5)
			{				
				String sql1 = "SELECT *,date(created_date_time) as created_date FROM ehat_bill_details_ipd where treatment_id = "+treatmentId+" and service_id="+serviceId;
				
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		        @SuppressWarnings("unchecked")
		        List<Map<String, Object>> data1 = query1.list();
		         			         
		        for(Map<String, Object> row : data1){
		        	 
		        	 EhatViewPatientSubServiceDetailsIpdDto objDTO1= new EhatViewPatientSubServiceDetailsIpdDto();
		        	 
		        	 objDTO1.setServiceDate((Date)row.get("created_date"));
		        	 
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
		        	 objDTO1.setPaidByCashFlag((String) row.get("paid_by_cash_flag"));
		        	 
		        	 listSubServiceIpdDto.add(objDTO1);
		        	 objDTO1=null;
		         }
			}
			
			else
			{
			
			String otProc=null;
			String sql1 = "SELECT *,date(created_date) as service_date FROM ehat_view_patient_sub_service_details_ipd where treatment_id = '"+treatmentId+"' and service_id='"+serviceId+"'";
			
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
	         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         @SuppressWarnings("unchecked")
	         List<Map<String, Object>> data1 = query1.list();
	         			         
	         for(Map<String, Object> row : data1){
	        	 
	        	 EhatViewPatientSubServiceDetailsIpdDto objDTO1= new EhatViewPatientSubServiceDetailsIpdDto();
	        	 
	        	 objDTO1.setServiceDate((Date)row.get("service_date"));
	        	 
	        	 objDTO1.setServiceId((Integer)row.get("service_id"));
	        	 int aaa=(Integer)row.get("service_id");
	        	//System.err.println("kkkkkk"+aaa);
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
	        	 
	        	 objDTO1.setSpecialityId((Integer)row.get("speciality_id"));
	        	 objDTO1.setInOutHouse((Integer)row.get("inOutHouse"));
	        	 objDTO1.setBarCode((String)row.get("barCode"));
	        	 objDTO1.setSampleTypeId((Integer)row.get("sampleTypeId"));
	        	 objDTO1.setSampleCount((Integer)row.get("sampleCount"));
	        	 objDTO1.setCollectionDate((String)row.get("collectionDate"));
	        	 objDTO1.setCollectionTime((String)row.get("collectionTime"));
	        	 objDTO1.setTemplateWise((String)row.get("templateWise"));
	        	
	        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
	        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
	        
	        	 objDTO1.setCreatedDate((Date)row.get("created_date"));
	        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
	        	 objDTO1.setDrdeskflag((String) row.get("drdesk_flag"));
	        	 objDTO1.setSponsorName((String) row.get("sponsor_name"));
	        	 int bbb=(Integer)row.get("sub_service_id");
	        	 //Pooja
	        	 if(aaa == pharmacyInvoice &&  bbb == 9){
	        		 objDTO1.setCategoryName((String)row.get("drdesk_flag"));	
	        	 }else
	        	 {
	        		 objDTO1.setCategoryName((String)row.get("category_name"));	
	        	 }
	        	 objDTO1.setPaidByCashFlag((String) row.get("paid_by_cash_flag"));
	        	 
	        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
	        	 objDTO1.setOtProcedureId((String) row.get("ot_procedure"));
	        	 objDTO1.setSndtolabflag((String) row.get("sndtolabflag"));
	 			objDTO1.setSndtorisflag((String) row.get("sndtorisflag"));
	        	 otProc = (String) row.get("ot_procedure").toString();
	        	 objDTO1.setEmrPer((Double)row.get("emrPer"));
	        	 /* if(aaa==14)
	        	 {		
						String sql3 = "SELECT inv_consumption_info_slave_item_name AS IName FROM inv_consumption_item_info_slave where inv_consumption_master_id = "+bbb+";";
									

						SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
						query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> data3 = query3.list();
						//System.err.println("ot len-----------------------"+data1.size());
						for (Map<String, Object> row3 : data3) {
								
							objDTO1.setInventoryName((String) row3.get("IName"));
							//listServiceIpdDto.add(objDTO);
						}
					
				}*/
	        	 
	        	 
	        	 if(!(otProc.equals(null) || otProc.equals("0") || otProc.equals("-")))
	        	 {
	        	 if(aaa==4)
	        	 {
					//otProc = (String) row.get("ot_procedure").toString();
					if (otProc.equals(null) || otProc.equals("0")) {

					} else {
						
						
						/*String sql2 = "SELECT GROUP_CONCAT(o.OName SEPARATOR ' , ') AS OName "
										+ "FROM (ehat_view_patient_service_detail_ipd b join operation o)"
										+ "where b.treatment_id='"+treatmentId+"' and b.service_id='4' and o.status='Y' and o.Operation_id in("+otProc+")";
				
							SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
							query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> data2 = query2.list();
							//System.err.println("ot lennnnnnn-----------------------"+data2.size());
							for (Map<String, Object> row2 : data2) {
									
								objDTO1.setOtProcedure((String) row2.get("OName"));
								//listServiceIpdDto.add(objDTO);
							}*/

						String sql2="";
						
						String newString="";
						String[] split = otProc.split(",");
						for (int i = 0; i < split.length; i++) {
							
							sql2="select OName FROM (ehat_view_patient_service_detail_ipd b join operation o) "
								+ "where b.treatment_id='"+treatmentId+"' and b.service_id='4' and o.status='Y' and o.Operation_id= "+split[i];
							
							newString = newString + (String) sessionFactory.getCurrentSession().createSQLQuery(sql2)
									.uniqueResult() +",";
							//newString = StringUtils.join(otNames, ",");
							
							
						}
						objDTO1.setOtProcedure(newString.substring(0,newString.length()-1));
						
						
						
					}
					
					
				}  	  	 
	        	 }	
	        	 
	        	 if(aaa == 4){
	        		 
	        		 objDTO1.setOtCount(((Number)row.get("count_ot")).intValue()) ;
					 objDTO1.setOtDoctors((String)row.get("dctor_id_ot"));
					 String docIds = (String)row.get("dctor_id_ot");
					 String docNames = "";
					 String[] ary = docIds.split(",");
					 for (int i = 0; i < ary.length; i++) {
							
						 int docId = Integer.parseInt(ary[i]);
						 
						 String sql="SELECT doc_name FROM doctor where Doctor_ID="+docId+"";
						 docNames = docNames + (String) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult() +",";											 
					 }
					 
					 objDTO1.setOtDoctorNames(docNames.substring(0,docNames.length()-1));
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
	
	
	/************
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
	@SuppressWarnings("unchecked")
	public int saveBillDetailsIpd(String servIdsChecked,Integer refDocId,IpdBillReceiptMasterDTO billRecMaster,String multiPayDetails){	
		
		Integer maxReceiptId=0;
		Session session = sessionFactory.openSession(); // create session object from the session factory
		session.beginTransaction(); // initialize the transaction object from session
		ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		int curRecId=getCurrentRecId("ehat_receipt_master_ipd",session);
		int cmdchk=0;
		Double totComAdvcNew =0.0;
		
		int cmnAdvcPaymodeId =Integer.parseInt(resourceBundle.getObject("cmnAdvcPaymodeId").toString());
		int creditPaymodeId =Integer.parseInt(resourceBundle.getObject("creditPaymodeId").toString());
		
		try {
			
			if(billRecMaster.getPayMode()==cmnAdvcPaymodeId){
				Criteria criteria = session.createCriteria(CommonadvDto.class);
				criteria.add(Restrictions.eq("patient_ID", billRecMaster.getPatientId()));
		    	criteria.add(Restrictions.eq("deleted", "N"));
		    	SimpleExpression dept1 = Restrictions.eq("departmentId", 11); // for all 
				SimpleExpression dept2 = Restrictions.eq("departmentId", 2);
				
				criteria.add(Restrictions.or(dept1, dept2));
				
		   // 	criteria.setProjection(Projections.sum("commonadv_amnt"));
		    	criteria.setProjection(Projections.sum("remaining_amnt"));
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
			}			
			
			//chk coomanadv is applible or not		
			if(cmdchk != -2){
				MultiBillReceiptMasterDTO billDto = (MultiBillReceiptMasterDTO) ConfigUIJSONUtility
	                    .getObjectFromJSON(multiPayDetails, MultiBillReceiptMasterDTO.class);
						
				// set receipt master 
				IpdBillReceiptMasterDTO billMaster = new IpdBillReceiptMasterDTO();
				billMaster.setReceiptCount(curRecId);
				billMaster.setUnitId(billRecMaster.getUnitId());
				billMaster.setTreatmentId(billRecMaster.getTreatmentId());
				billMaster.setPatientId(billRecMaster.getPatientId());
				billMaster.setBillId(billRecMaster.getBillId());				
				billMaster.setDepartmentId(2);
				billMaster.setDoctorIds(billRecMaster.getDoctorIds());
				billMaster.setReceiptOf(billRecMaster.getReceiptOf());
				billMaster.setTotalRemain(0);	
				billMaster.setTotalAmt(billRecMaster.getTotalPaid());				
				billMaster.setTotalQty(1);
				if(billRecMaster.getPayMode() == creditPaymodeId){
					
					billMaster.setTotalPaid(0);	
				}else{
					
					billMaster.setTotalPaid(billRecMaster.getTotalPaid());	
				}
							
				billMaster.setCreatedBy(billRecMaster.getCreatedBy());
				billMaster.setCreatedDateTime(new Date());			
				billMaster.setDeleted("N");
				billMaster.setPayMode(billRecMaster.getPayMode());
				billMaster.setbNumber(billRecMaster.getbNumber());
				billMaster.setBatchNumber(billRecMaster.getBatchNumber());
				billMaster.setbName(billRecMaster.getbName());
				billMaster.setSourceTypeId(billRecMaster.getSourceTypeId());
				billMaster.setSponsorCatId(billRecMaster.getSponsorCatId());
				billMaster.setRemark(billRecMaster.getRemark());
				billMaster.setAccountStatusIpd("N");
								
				// for profees
				billMaster.setActualAmt(billRecMaster.getTotalPaid());
				billMaster.setActualTotConcn(0);
				billMaster.setActualPayable(billRecMaster.getTotalPaid());
				billMaster.setActualDiscPer(0);										
				billMaster.setPayable(billRecMaster.getTotalPaid());
				billMaster.setReceiptStatus("paid");
				
				if(billRecMaster.getPayMode()==creditPaymodeId){
					
					billMaster.setTotalRemain(billRecMaster.getTotalPaid());
				}else{
					
					billMaster.setTotalRemain(0);
				}				
				
				// for profees	
				
				billMaster.setBillSettledFlag(billRecMaster.getBillSettledFlag());			
				billMaster.setPaidByCashFlag(billRecMaster.getPaidByCashFlag());		
				billMaster.setPaidByCashServices(billRecMaster.getPaidByCashServices());
				
				// Save Master list
				session.merge(billMaster);
				
				/*if(billRecMaster.getPaidByCashFlag().equals("Y")){
					
					// Update flag in bill details ipd
					String sql ="update ehat_bill_details_ipd set paid_by_cash_flag='Y' where bill_details_id in("+billRecMaster.getPaidByCashServices()+")";
					Query cashQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					cashQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					cashQuery.executeUpdate();
				}*/
				
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
								String hqlForMultiSponsr = "UPDATE BillDetailsIpdDto set paidByCashFlag =:paidByCashFlag WHERE billDetailsId =:billDetailsId";
								Query queryForMultiSponsr = sessionFactory.getCurrentSession().createQuery(hqlForMultiSponsr);
								//queryForMultiSponsr.setDate("updatedDateTime",new Date(new java.util.Date().getTime()));
								queryForMultiSponsr.setParameter("paidByCashFlag","Y");  
								queryForMultiSponsr.setParameter("billDetailsId",Integer.parseInt(id));  						
								queryForMultiSponsr.executeUpdate();	
							}
						}else{
							
							alPaid.add(Integer.parseInt(billRecMaster.getPaidByCashServices()));
							// Update amount in multiSponsor start
							String hqlForMultiSponsr = "UPDATE BillDetailsIpdDto set paidByCashFlag =:paidByCashFlag WHERE billDetailsId =:billDetailsId";
							Query queryForMultiSponsr = sessionFactory.getCurrentSession().createQuery(hqlForMultiSponsr);
							//queryForMultiSponsr.setDate("updatedDateTime",new Date(new java.util.Date().getTime()));
							queryForMultiSponsr.setParameter("paidByCashFlag","Y");  
							queryForMultiSponsr.setParameter("billDetailsId",Integer.parseInt(billRecMaster.getPaidByCashServices()));  						
							queryForMultiSponsr.executeUpdate();	
						}							
					}									
				}				
				
				// Get max master id
				Criteria criteriaMax = session.createCriteria(IpdBillReceiptMasterDTO.class).setProjection(Projections.max("billReceiptId"));
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
										
					Criteria criteria1 = session.createCriteria(CommonadvDto.class);
					criteria1.add(Restrictions.eq("patient_ID", billRecMaster.getPatientId()));
					//criteria1.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
					criteria1.add(Restrictions.eq("paidflag","N"));
					SimpleExpression dept1 = Restrictions.eq("departmentId", 11); // for all 
					SimpleExpression dept2 = Restrictions.eq("departmentId", 2);
					
					criteria1.add(Restrictions.or(dept1, dept2));
			    	criteria1.add(Restrictions.eq("deleted", "N"));
			    	criteria1.addOrder(Order.asc("commonadv_id"));
			    	List<CommonadvDto> listcdav	 = criteria1.list();
			    	//Session session = session;
			//		String hql = "UPDATE CommonadvDto set  deduct_amnt  =:deamt ,remaining_amnt  =:reamt ,paidflag =:paidflag WHERE treatmentId =:trid and  commonadv_id =:cadid ";
			//new
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
								//query.setParameter("trid",billRecMaster.getTreatmentId());
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
								//	query.setParameter("trid",billRecMaster.getTreatmentId());  
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
				
				}
				
				if(billRecMaster.getPaidByCashFlag().equals("N")){
					// Update amount in bill master start
					setBillMasterTotals(billRecMaster.getTreatmentId(),	billRecMaster.getTotalPaid(), "paid",session);
					// Update amount in bill master end
				}
				
				if(billRecMaster.getPaidByCashFlag().equals("N")){
					
					billRecMaster.setReceiptOf("paid");
					setMultiSponsorTotalsForIpd(billRecMaster,session);
				}	
				
				/*Criteria criteriaMax = session.createCriteria(IpdBillReceiptMasterDTO.class).setProjection(Projections.max("billReceiptId"));
				maxReceiptId = (Integer) criteriaMax.uniqueResult();*/
				
			}		

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
		
		return maxReceiptId;		
	}
	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 1-Nov-2017
	* @codeFor	: Distribute service paid
	 ************/
	public int distributePaidBySlave(IpdBillRefundMasterDTO billMaster,Session session){
		
		int result=0;
		double prevRefAmt=0;
		
		String sql="select ifnull(sum(total_bill),0) from ehat_bill_master where deleted='N' and bill_id="+billMaster.getBillId()+" and treatment_id="+billMaster.getTreatmentId()+" ";
		Query recQuery = session.createSQLQuery(sql);		
		double totAmt = (Double) recQuery.uniqueResult();
		
		sql="select ifnull(sum(total_refund),0) from ehat_bill_master where deleted='N' and bill_id="+billMaster.getBillId()+" and treatment_id="+billMaster.getTreatmentId()+" ";
		Query refQuery = session.createSQLQuery(sql);		
		double totRef = (Double) refQuery.uniqueResult();
		
		double totRefPer=(totRef*100)/totAmt;
		
		String sqlRef="select * from ehat_bill_details_ipd where deleted = 'N' and cancle='N' and treatment_id="+billMaster.getTreatmentId()+" and bill_id="+billMaster.getBillId()+" ";
		Query billDetailsQuery = session.createSQLQuery(sqlRef);
		billDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		@SuppressWarnings("unchecked")			
		List<Map<String, Object>> listBillDetails = billDetailsQuery.list();
		for(Map<String, Object> row : listBillDetails){
			
			int billDetailsId=(Integer)row.get("bill_details_id");
			double amt=0;
			
			if(billMaster.getSponsorCatId()>0){
				
				amt=(Double)row.get("other_amount");
			}else{
				
				amt=(Double)row.get("amount");
			}
			
			//prevRefAmt=(Double)row.get("refund");
			
			double refAmt=(amt*totRefPer)/100;
					
			String hql = "UPDATE BillDetailsIpdDto set refund =:refund, refundPer =:refundPer WHERE billDetailsId =:billDetailsId";
				Query query = session.createQuery(hql);
				query.setParameter("refund", refAmt);				
				query.setParameter("refundPer", totRefPer);
				query.setParameter("billDetailsId", billDetailsId);
				result = query.executeUpdate();						
		}	
		
		return result;
	}
	
	public int saveMultiPayMode(int maxId,IpdBillReceiptMasterDTO obj,List<MultiBillReceiptMasterDTO> lst,Session session){
		
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
		return result;
	}
	
	
	public int saveMultiPayModeRefund(int maxId,IpdBillRefundMasterDTO obj,List<MultiBillReceiptMasterDTO> lst,Session session){
		
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
	
	/************
	* @author	: Vinod Udawant
	* @date		: 12-July-2017
	* @codeFor	: Save Refund bill details
	 ************/
	@SuppressWarnings("unchecked")
	public int saveRefundBillDetailsIpd(String servIdsChecked,Integer refDocId,IpdBillRefundMasterDTO billRecMaster,String multiPayDetails, String listMultiRefundSave){	
			
		Integer maxReceiptId=0;
		Session session = sessionFactory.openSession(); // create session object from the session factory
		session.beginTransaction(); // initialize the transaction object from session
		int curRecId=getCurrentRecId("ehat_refund_master_ipd",session);
		try {
			IpdBillRefundMasterDTO billDto1 = (IpdBillRefundMasterDTO) ConfigUIJSONUtility
                    .getObjectFromJSON(listMultiRefundSave, IpdBillRefundMasterDTO.class);
			
			
			if(billDto1.getListBillRefundMaster().size() > 0){
				
				MultiBillReceiptMasterDTO billDto = (MultiBillReceiptMasterDTO) ConfigUIJSONUtility
	                    .getObjectFromJSON(multiPayDetails, MultiBillReceiptMasterDTO.class);
				
				for(int i=0;i<billDto1.getListBillRefundMaster().size();i++){
					billRecMaster.setTotalAmt(billDto1.getListBillRefundMaster().get(i).getTotalAmt());
					billRecMaster.setExtraRefFlag(billDto1.getListBillRefundMaster().get(i).getExtraRefFlag());
					billRecMaster.setTotalPaid(billDto1.getListBillRefundMaster().get(i).getTotalPaid());
					double rem=billDto1.getListBillRefundMaster().get(i).getTotalAmt() - billDto1.getListBillRefundMaster().get(i).getTotalPaid();
					billRecMaster.setTotalRemain(rem);
					billRecMaster.setRefundCount(curRecId);			
					billRecMaster.setDepartmentId(2);
					billRecMaster.setCreatedBy(billRecMaster.getCreatedBy());
					billRecMaster.setCreatedDateTime(new Date());
					billRecMaster.setRemark(billRecMaster.getRemark());
					// Save Master list
					session.merge(billRecMaster);
				
					ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
					int multiPaymodeId =Integer.parseInt(resourceBundle.getObject("multiPaymodeId").toString());
					
					// Save Multiple pay mode list
					if(billRecMaster.getPayMode()==multiPaymodeId){
						
						saveMultiPayModeRefund(maxReceiptId,billRecMaster,billDto.getListMultiBillReceiptMaster(),session);
					}	
								
					// Update amount in bill master start			
					setBillMasterTotals(billRecMaster.getTreatmentId(),	billRecMaster.getTotalPaid(), "refund",session);						
					// Update amount in bill master end
					
					Criteria criteriaMax = session.createCriteria(IpdBillRefundMasterDTO.class).setProjection(Projections.max("billRefundId"));
					maxReceiptId = (Integer) criteriaMax.uniqueResult();
					if (maxReceiptId == null) {
			
						maxReceiptId = 0;
					}else{
						
						//distributePaidBySlave(billRecMaster,session);
					}

					
				
				}				
				
			
		}else{
			
			
			MultiBillReceiptMasterDTO billDto = (MultiBillReceiptMasterDTO) ConfigUIJSONUtility
                    .getObjectFromJSON(multiPayDetails, MultiBillReceiptMasterDTO.class);
			
			billRecMaster.setRefundCount(curRecId);			
			billRecMaster.setDepartmentId(2);
			double remain=billRecMaster.getTotalAmt()-billRecMaster.getTotalPaid();
			billRecMaster.setTotalRemain(remain);
			billRecMaster.setCreatedBy(billRecMaster.getCreatedBy());
			billRecMaster.setCreatedDateTime(new Date());
			
			// Save Master list
			session.merge(billRecMaster);
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			int multiPaymodeId =Integer.parseInt(resourceBundle.getObject("multiPaymodeId").toString());
			
			// Save Multiple pay mode list
			if(billRecMaster.getPayMode()==multiPaymodeId){
				
				saveMultiPayModeRefund(maxReceiptId,billRecMaster,billDto.getListMultiBillReceiptMaster(),session);
			}	
						
			// Update amount in bill master start			
			setBillMasterTotals(billRecMaster.getTreatmentId(),	billRecMaster.getTotalPaid(), "refund",session);						
			// Update amount in bill master end
			
			Criteria criteriaMax = session.createCriteria(IpdBillRefundMasterDTO.class).setProjection(Projections.max("billRefundId"));
			maxReceiptId = (Integer) criteriaMax.uniqueResult();
			if (maxReceiptId == null) {
	
				maxReceiptId = 0;
			}else{
				
				//distributePaidBySlave(billRecMaster,session);
			}

			
		}
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
		
		return maxReceiptId;
			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	public int getSlaveList(int maxId,List<IpdBillReceiptSlaveDTO> lstSlave){
		try{
			List<Integer> al=new ArrayList<Integer>();
			int billId=0,treatId=0;
			String docIds="";
			
			for(IpdBillReceiptSlaveDTO slave:lstSlave){
				
				slave.setBillReceiptMasterId(maxId);
				al.add(slave.getBillDetailsId());
				sessionFactory.getCurrentSession().merge(slave);	
				
				billId=slave.getBillId();
				treatId=slave.getTreatmentId();
			}	
			//doctor id in ipd receipt master
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IpdBillReceiptSlaveDTO.class);
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
			
			IpdBillReceiptMasterDTO objMaster = (IpdBillReceiptMasterDTO) sessionFactory.getCurrentSession().get(IpdBillReceiptMasterDTO.class, maxId);
			objMaster.setDoctorIds(exactDoctIds);
			//BillDetailsDto dto=new BillDetailsDto();
			
			for(int id:al){
				
				BillDetailsIpdDto objectToUpdate = (BillDetailsIpdDto) sessionFactory.getCurrentSession().get(BillDetailsIpdDto.class, id);
				objectToUpdate.setPaidFlag("Y");				
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
	
	/*//Irfan Khan @date: 20-June-2017 @reason : To calculate and insert profees
		public int professionalFeesIpd(int maxId, List<IpdBillReceiptSlaveDTO> lstSlave,int refDocId) {

			ProfessionalFeesDto professionalFeesDto = new ProfessionalFeesDto();

			try {

				for (IpdBillReceiptSlaveDTO slave : lstSlave) {
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
							refPfCut = (refper * pfAmount) / 100;

							pfAmount = pfAmount - refPfCut;
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
		}*/
		
		/************
		* @author	: Vinod Udawant
		* @date		: 21-June-2017
		* @codeFor	: Get bill receipt details
		 ************/
		public IpdBillReceiptMasterDTO getBillReceiptDetailsIpd(IpdBillReceiptMasterDTO billRecMaster,String callFrom){	
						
			try {
				IpdBillReceiptMasterDTO billReceiptMasterObj=new IpdBillReceiptMasterDTO();
				//List<IpdBillReceiptMasterDTO> blist = new ArrayList<IpdBillReceiptMasterDTO>();
				
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IpdBillReceiptMasterDTO.class);			
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
					//criteria.add(Restrictions.eq("createdBy", billRecMaster.getCreatedBy()));	
					/*criteria.add(Restrictions.eq("billId", billRecMaster.getBillId()));*/		
					if(billRecMaster.getSponsorCatId() > 0){
						
						criteria.add(Restrictions.eq("sponsorCatId", billRecMaster.getSponsorCatId()));
					}
					System.err.println(billRecMaster.getReceiptOf());
					
					if(callFrom.equals("allForChk")){
						
						criteria.add(Restrictions.eq("deleted", "N"));
						criteria.add(Restrictions.eq("paidByCashFlag", "N"));
						
					}else{
						
						if(callFrom.equals("cash")){
							
							criteria.add(Restrictions.eq("receiptStatus", "paid"));
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
							
							criteria.add(Restrictions.eq("receiptStatus", "unpaid"));
							criteria.add(Restrictions.eq("deleted", "N"));
							criteria.add(Restrictions.eq("paidByCashFlag", "N"));
							//criteria.add(Restrictions.eq("receiptOf", billRecMaster.getReceiptOf()));
							
						}else if(callFrom.equals("deleted")){
							
							criteria.add(Restrictions.eq("deleted", "Y"));
							criteria.add(Restrictions.not(Restrictions.eq("totalAmt", 0.0)));
							criteria.add(Restrictions.eq("paidByCashFlag", "N"));
							//criteria.add(Restrictions.eq("receiptOf", billRecMaster.getReceiptOf()));
							
						}else if(callFrom.equals("paidInCash")){
							
							criteria.add(Restrictions.eq("paidByCashFlag", "Y"));
							criteria.add(Restrictions.eq("deleted", "N"));
							//criteria.add(Restrictions.not(Restrictions.eq("totalAmt", 0.0)));
							//criteria.add(Restrictions.eq("receiptOf", billRecMaster.getReceiptOf()));
							
						}else{
							criteria.add(Restrictions.eq("deleted", "N"));
							criteria.add(Restrictions.eq("paidByCashFlag", "N"));
							//criteria.add(Restrictions.eq("receiptOf", billRecMaster.getReceiptOf()));
						}
					}
				}	
							
				
				@SuppressWarnings("unchecked")
				List<IpdBillReceiptMasterDTO> listBillMaster = (List<IpdBillReceiptMasterDTO>) criteria.list();		
				
				/*for(IpdBillReceiptMasterDTO billMaster:listBillMaster){
										
					Criteria criteriaSlave = sessionFactory.getCurrentSession().createCriteria(IpdBillReceiptSlaveDTO.class);			
					criteriaSlave.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
					criteriaSlave.add(Restrictions.eq("billId", billRecMaster.getBillId()));		
					criteriaSlave.add(Restrictions.eq("billReceiptMasterId", billMaster.getBillReceiptId()));
					criteriaSlave.add(Restrictions.eq("deleted", "N"));	
					
					@SuppressWarnings("unchecked")
					List<IpdBillReceiptSlaveDTO> listBillReceiptSlave  = criteriaSlave.list();					
					billMaster.setListBillReceiptSlave(listBillReceiptSlave);
					blist.add(billMaster);
					System.err.println("Date :-----------"+billMaster.getCreatedDateTime()); 	
				} */
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
		
		/************
		* @author	: Vinod Udawant
		* @date		: 14-July-2017
		* @codeFor	: Get bill receipt details
		 ************/
		public IpdBillRefundMasterDTO getBillRefundDetailsIpd(IpdBillRefundMasterDTO billRecMaster,String callFrom){	
						
			try {
				IpdBillRefundMasterDTO billReceiptMasterObj=new IpdBillRefundMasterDTO();
				//List<IpdBillRefundMasterDTO> blist = new ArrayList<IpdBillRefundMasterDTO>();
				
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IpdBillRefundMasterDTO.class);			
				criteria.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
				criteria.add(Restrictions.eq("billId", billRecMaster.getBillId()));		
				criteria.add(Restrictions.eq("deleted", "N"));	
				//criteria.add(Restrictions.eq("receiptOf", billRecMaster.getReceiptOf()));
				//criteria.add(Restrictions.eq("createdBy", billRecMaster.getCreatedBy()));	
				
				/*if(callFrom.equals("cash") || callFrom.equals("refundable")){
					
					criteria.add(Restrictions.eq("receiptStatus", "paid"));
				}else if(callFrom.equals("credit")){
					
					criteria.add(Restrictions.eq("receiptStatus", "unpaid"));
					
				}else if(callFrom.equals("refund")){
					
					criteria.add(Restrictions.eq("refundFlag", "Y"));
				}*/
				
				
				@SuppressWarnings("unchecked")
				List<IpdBillRefundMasterDTO> listBillMaster = (List<IpdBillRefundMasterDTO>) criteria.list();		
				
				/*for(IpdBillRefundMasterDTO billMaster:listBillMaster){
										
					Criteria criteriaSlave = sessionFactory.getCurrentSession().createCriteria(IpdBillReceiptSlaveDTO.class);			
					criteriaSlave.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
					criteriaSlave.add(Restrictions.eq("billId", billRecMaster.getBillId()));		
					criteriaSlave.add(Restrictions.eq("billReceiptMasterId", billMaster.getBillRefundId()));
					criteriaSlave.add(Restrictions.eq("deleted", "N"));
					
					@SuppressWarnings("unchecked")
					List<IpdBillRefundSlaveDTO> listBillReceiptSlave  = criteriaSlave.list();					
					billMaster.setListBillRefundSlave(listBillReceiptSlave);
					blist.add(billMaster);
				} */
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
		
		/************
		* @author	: Sagar kadam
		* @date		: 01/july-2017
		* @codeFor	: autosuggesstion 
		 ************/		
		@SuppressWarnings("unchecked")
		@Override
		public List<IpdBillPatientsDTO> autosuggesstionviewIpdbillPatients(String letter,String finalBill,HttpServletRequest request){
			List<IpdBillPatientsDTO> ltIpdbillPatients = null;
			try {
				
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				Integer unitId = (Integer) session.getAttribute("uId");
				
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(IpdBillPatientsDTO.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("unitId", +unitId));
				
				if(finalBill.equalsIgnoreCase("finalBill")){
					
					criteria.add(Restrictions.eq("invoiceFlag", "Y"));
				}else if(finalBill.equalsIgnoreCase("all")){
					
				}else{
					criteria.add(Restrictions.eq("invoiceFlag", "N"));
				}
				
				Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
				Criterion rest3= Restrictions.like("pIdd", "%" + letter + "%");
				Criterion rest2= Restrictions.like("mrnno", "%" + letter + "%");
				Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
				Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
				criteria.add(Restrictions.or(rest1, rest2,rest3,rest4,rest5));
				/*criteria.add(Restrictions
						.sqlRestriction("patient_name LIKE '%" + letter + "%' OR patient_id LIKE '%" + letter + "%'OR mrnno LIKE '%" + letter + "%'"));
				*/

				criteria.addOrder(Order.desc("pId"));
				ltIpdbillPatients = criteria.list();
		
			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
				return ltIpdbillPatients;
			}
			return ltIpdbillPatients;
		}

		
		
		@Override
		public List<EhatViewPatientSubServiceDetailsIpdDto2> getPatientServiceBillSponsorForIpd(
				Integer treatmentId, Integer serviceId, Integer chargesSlaveId) {
			List<EhatViewPatientSubServiceDetailsIpdDto2> listSubServiceIpdDto = new ArrayList<EhatViewPatientSubServiceDetailsIpdDto2>();
			try {
				
				//System.err.println("tretId=---===>"+treatmentId+"sercIDDD===>>>>"+serviceId+"chargesSlave_id=>"+chargesSlaveId);
				/* if( serviceId==2 )
					{ 
			
		         String sql="select d.doc_name,b.doctor_id,b.rate,b.bill_details_id,b.service_id,b.cancle,b.created_date_time,b.paid_flag from"+
				         " doctor d ,ehat_bill_details b where d.Doctor_ID = b.doctor_id"+
				         " and b.service_id ='"+serviceId+"' and b.treatment_id='"+treatmentId+"'and b.deleted='N'";
				
		         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         List<Map<String, Object>> data = query.list();
		         
		        
		         for(Map<String, Object> row : data){
		        	 
		        	 BillNobleServiceDto2 objDTO= new BillNobleServiceDto2();
		        	 objDTO.setServiceId((Integer)row.get("service_id"));
		        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO.setDocId((Integer)row.get("doctor_id")); 
		        	 objDTO.setDocName((String)row.get("doc_name"));
		        	 objDTO.setCancle ((String)row.get("cancle"));
		        	 objDTO.setCharges((Double)row.get("rate"));
		        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));
		        	 objDTO.setPaidFlag((String)row.get("paid_flag"));
		        	 listSubServiceIpdDto.add(objDTO);
		        	 objDTO=null;
		         }
		         
		        	 
					}
				 else{*/
				
				

		         
		         String sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd2 where treatment_id = "+treatmentId+" " +
		         		"and service_id="+serviceId+" and chargesSlave_id in("+chargesSlaveId+", 0)";
				/*String sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd2 where treatment_id = "+treatmentId+" " +
		         		"and service_id=8 and chargesSlave_id in(8, 0)";*/
					

					SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			         @SuppressWarnings("unchecked")
					List<Map<String, Object>> data1 = query1.list();
	         		         
			         
			         for(Map<String, Object> row : data1){
			        	 
			        	 EhatViewPatientSubServiceDetailsIpdDto2 objDTO1= new EhatViewPatientSubServiceDetailsIpdDto2();
			        	 
			        	 objDTO1.setServiceId((Integer)row.get("service_id"));
			        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
			        	 objDTO1.setCategoryName((String)row.get("category_name"));
			        	 objDTO1.setDocName((String)row.get("doc_name"));
			        	 
			        	 int drId = ((Number)row.get("Doctor_ID")).intValue();
			        	 
			        	 objDTO1.setDocId(drId);
			        	 
			        	 //objDTO1.setDocId((Integer)row.get("Doctor_ID"));
			        	 //objDTO1.setDocId(Integer)row.get("Doctor_ID"));
			        	 
			        	 objDTO1.setRate((Double)row.get("rate"));
			        	 objDTO1.setChargesSponsor((Double)row.get("charges_sponsor"));
			        	 objDTO1.setChargesSlaveId((BigInteger)row.get("chargesSlave_id"));
			        	 objDTO1.setAmount((Double)row.get("amount"));
			        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
			        	 objDTO1.setQuantity((Double)row.get("quantity"));
			        	 objDTO1.setConcession((Double)row.get("concession"));
			        	 objDTO1.setPay((Double)row.get("pay"));
			        	 objDTO1.setCoPay((Double)row.get("co_pay"));
			        	 objDTO1.setCancle((String)row.get("cancle"));
			        	 objDTO1.setIsModify((String)row.get("isModify"));
			        
			        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
			        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
			        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
			        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	  
			        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
			        	 
			        	 objDTO1.setCreatedDate((Date)row.get("created_date"));
			        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
			        	 objDTO1.setPaidFlag((String)row.get("paid_flag"));

			        	 listSubServiceIpdDto.add(objDTO1);
			        	 //System.err.println("Sponsorrrr++==>"+objDTO1.getCategoryName());
			        	 objDTO1=null;
			        	 
			         }
				//}
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

		/*-------- For Bill Estimate-----------------*/
		
		@Override
		public List<EhatViewPatientServiceDetailIpdDto> getPatientBillAmountIpdForEstimation(
				Integer treatmentId, String startDate, String endDate,
				Integer userId,String callFrom) {
			List<EhatViewPatientServiceDetailIpdDto> listServiceIpdDto =new ArrayList<EhatViewPatientServiceDetailIpdDto>();
			try {
			String servIds=null;
			String sql1="select service_id from users where User_ID="+userId+"";
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> data1 = query1.list();
			
			for(Map<String, Object> row : data1){
				
				servIds=(String)row.get("service_id");
			}
				
			
			
			ArrayList<Integer> servIds11=new ArrayList<Integer>();
			
			String[] servIds1 = null;
			// get checked service masters
			if(servIds.length()>0){
				
				servIds1=servIds.split(",");
				
				for(String id:servIds1){
					servIds11.add(Integer.parseInt(id));
					
				}
			}	
			
			
			
			if(!servIds.equals(null)){
				if(callFrom.equals("prev"))
				{
					for(int i=0;i<servIds1.length;i++){			
			
					// String sql = "SELECT * FROM ehat_view_patient_service_detail_ipd where treatment_id = '"+treatmentId+"'";
					 String sql = "SELECT *,sum(amount) as amt,count(service_id) as count FROM ehat_view_patient_service_detail_ipd_for_prev_bill_estimate WHERE date(created_date_time) between '"+startDate+"'  and '"+endDate+"' and treatment_id='"+treatmentId+"' and service_id="+Integer.parseInt(servIds1[i])+" group by service_id";
			         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			         @SuppressWarnings("unchecked")
					List<Map<String, Object>> data = query.list();
			       
			         for(Map<String, Object> row : data){
			        	 
			        	 EhatViewPatientServiceDetailIpdDto objDTO= new EhatViewPatientServiceDetailIpdDto();
			        	 objDTO.setServiceId((Integer)row.get("service_id"));
			        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
			        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
			        	
			        	 objDTO.setServiceName((String)row.get("service_name"));
			        	 objDTO.setAmount((Double)row.get("amt"));
			        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
			        	 objDTO.setServiceCount((BigInteger)row.get("count"));
			        	 objDTO.setPaidFlag((String)row.get("paid_flag"));
			        	
			        	 listServiceIpdDto.add(objDTO);
			        	 objDTO=null;
			         }
					}
					
							
				}else{
					for(int i=0;i<servIds1.length;i++){						
					
			
					// String sql = "SELECT * FROM ehat_view_patient_service_detail_ipd where treatment_id = '"+treatmentId+"'";
					 String sql = "SELECT *,sum(amount) as amt,count(service_id) as count FROM ehat_view_patient_service_detail_ipd_for_estimate WHERE date(created_date_time) between '"+startDate+"'  and '"+endDate+"' and treatment_id='"+treatmentId+"' and service_id="+Integer.parseInt(servIds1[i])+" group by service_id";
			         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			         @SuppressWarnings("unchecked")
					List<Map<String, Object>> data = query.list();
			       
			         for(Map<String, Object> row : data){
			        	 
			        	 EhatViewPatientServiceDetailIpdDto objDTO= new EhatViewPatientServiceDetailIpdDto();
			        	 objDTO.setServiceId((Integer)row.get("service_id"));
			        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
			        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
			        	
			        	 objDTO.setServiceName((String)row.get("service_name"));
			        	 objDTO.setAmount((Double)row.get("amt"));
			        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
			        	 objDTO.setServiceCount((BigInteger)row.get("count"));
			        	 objDTO.setPaidFlag((String)row.get("paid_flag"));
			        	
			        	 listServiceIpdDto.add(objDTO);
			        	 objDTO=null;
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
				return listServiceIpdDto;
			}
			return listServiceIpdDto;
				
		}

		@Override
		public List<EhatViewPatientBedDetailsIpdDto> getBedDetailsForEstimate(
				Integer treatmentId, Integer serviceId, String startDate,
				String endDate) {
			List<EhatViewPatientBedDetailsIpdDto> listBedIpdDto = new ArrayList<EhatViewPatientBedDetailsIpdDto>();
			try {
					
				String sql1 = "SELECT * FROM ehat_view_patient_bed_details_ipd WHERE date(created_date) between '"+startDate+"'  and '"+endDate+"' and treatment_id = '"+treatmentId+"' and service_id='"+serviceId+"'";
				
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
		public List<EhatViewPatientSubServiceDetailsIpdDto> getIpdPatientServiceBill2ForEstimate(
				Integer treatmentId, Integer serviceId, String startDate,
				String endDate) {
			List<EhatViewPatientSubServiceDetailsIpdDto> listSubServiceIpdDto = new ArrayList<EhatViewPatientSubServiceDetailsIpdDto>();
			try {
			
				if(serviceId==14)
				{
					
 							String sql1 = "SELECT * FROM ehat_bill_details_ipd WHERE date(created_date_time) between '"+startDate+"'  and '"+endDate+"' and service_id="+serviceId+" and treatment_id = "+treatmentId+" and deleted = 'N'";
						
						
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
					        	 
					        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
					        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
					        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
					        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
					        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
					        
					        	 objDTO1.setCreatedDate((Date)row.get("created_date_time"));
					        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
					        	 int bb=(Integer)row.get("sub_service_id");
					        	 
					        	 if(aa==14)
					        	 {		
										String sql3 = "SELECT inv_consumption_info_slave_item_name AS IName FROM inv_consumption_item_info_slave where inv_consumption_item_info_slave_item_code = "+bb+";";
													

										SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
										query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
										List<Map<String, Object>> data3 = query3.list();
										//System.err.println("ot len-----------------------"+data1.size());
										for (Map<String, Object> row3 : data3) {
												
											objDTO1.setInventoryName((String) row3.get("IName"));
											//listServiceIpdDto.add(objDTO);
										}
									
								}
					       			
					        	/*if(objDTO1.getSubServiceId()<=6)
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
					        	}*/
					        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
					        	 listSubServiceIpdDto.add(objDTO1);
					        	 objDTO1=null;
					         
						}
					          						
					}
				else if(serviceId==16)
				{
					
 							String sql1 = "SELECT * FROM ehat_bill_details_ipd WHERE date(created_date_time) between '"+startDate+"'  and '"+endDate+"' and service_id="+serviceId+" and treatment_id = "+treatmentId+" and deleted = 'N'";
						
						
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
					        	 objDTO1.setPay((Double)row.get("pay"));
					        	 objDTO1.setCoPay((Double)row.get("co_pay"));
					        	 objDTO1.setCancle((String)row.get("cancle"));
					        	 objDTO1.setIsModify((String)row.get("isModify"));
					        	 
					        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
					        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
					        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
					        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
					        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
					        
					        	 objDTO1.setCreatedDate((Date)row.get("created_date_time"));
					        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
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
					          						
					}
				
				else
				{
				String otProc=null;
				String sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd WHERE date(created_date) between '"+startDate+"'  and '"+endDate+"' and treatment_id = '"+treatmentId+"' and service_id='"+serviceId+"'";
				
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         @SuppressWarnings("unchecked")
		         List<Map<String, Object>> data1 = query1.list();
		         			         
		         for(Map<String, Object> row : data1){
		        	 
		        	 EhatViewPatientSubServiceDetailsIpdDto objDTO1= new EhatViewPatientSubServiceDetailsIpdDto();
		        	 
		        	 objDTO1.setServiceId((Integer)row.get("service_id"));
		        	 int aaa=(Integer)row.get("service_id");
		        	 //System.err.println("Sev id :---------------------------"+aaa);
		        	 
		        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO1.setCategoryName((String)row.get("category_name"));
		        	 objDTO1.setDocName((String)row.get("doc_name"));
		        	 
		        	 int drId = ((Number)row.get("Doctor_ID")).intValue();
		        	 
		        	 objDTO1.setDocId(drId);
		        	 
		        	 //objDTO1.setDocId((Integer)row.get("Doctor_ID"));
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
		        	 
		        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
		        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
		        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
		        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
		        
		        	 objDTO1.setCreatedDate((Date)row.get("created_date"));
		        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
		        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
		        	 listSubServiceIpdDto.add(objDTO1);
		        	 objDTO1.setOtProcedureId((String) row.get("ot_procedure"));
		        	 
		        	 otProc = (String) row.get("ot_procedure").toString();
		        	 
		        	 /* if(aaa==14)
		        	 {		
							String sql3 = "SELECT inv_consumption_info_slave_item_name AS IName FROM inv_consumption_item_info_slave where inv_consumption_master_id = "+bbb+";";
										

							SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
							query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> data3 = query3.list();
							//System.err.println("ot len-----------------------"+data1.size());
							for (Map<String, Object> row3 : data3) {
									
								objDTO1.setInventoryName((String) row3.get("IName"));
								//listServiceIpdDto.add(objDTO);
							}
						
					}*/
		        	 
		        	 
		        	 if(!(otProc.equals(null) || otProc.equals("0") || otProc.equals("-")))
		        	 {
		        	 if(aaa==4)
		        	 {
						//otProc = (String) row.get("ot_procedure").toString();
						if (otProc.equals(null) || otProc.equals("0")) {

						} else {

							String sql2 = "SELECT GROUP_CONCAT(o.OName SEPARATOR ' , ') AS OName "
										+ "FROM (ehat_view_patient_service_detail_ipd b join operation o)"
										+ "where b.treatment_id='"+treatmentId+"' and b.service_id='4' and o.status='Y' and o.Operation_id in("+otProc+")";

							SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
							query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> data2 = query2.list();
							//System.err.println("ot lennnnnnn-----------------------"+data2.size());
							for (Map<String, Object> row2 : data2) {
									
								objDTO1.setOtProcedure((String) row2.get("OName"));
								//listServiceIpdDto.add(objDTO);
							}
						}
					}  	  	 
		        	 }		
		        	// listSubServiceIpdDto.add(objDTO1);
		        	// objDTO1=null;
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
		public List<EhatViewPatientSubServiceDetailsForIpdPackage> getPackagedataforIpd(
				Integer pSId, Integer pSubSId, Integer chargesSlaveId,
				Integer sponsorId, Integer treatmentId, Integer patientId,Integer billDetailsId) {
			
			List<EhatViewPatientSubServiceDetailsForIpdPackage> ltPatientRecord = new ArrayList<EhatViewPatientSubServiceDetailsForIpdPackage>();
			try {
				  
				Session session = sessionFactory.getCurrentSession();
			
				 //Date d=new Date(new java.util.Date().getTime());
				
				 String hql = "from EhatViewPatientSubServiceDetailsForIpdPackage  WHERE" +
				 		" bill_details_id =:billDetailsId and treatment_id =:treatmentId and service_id=:pSId and sub_service_id=:pSubSId ";
				 //" and charges_id=:sponsorId and chargesSlave_id=:chargesSlaveId" 
					Query query = session.createQuery(hql);
					query.setParameter("billDetailsId",billDetailsId);
					query.setParameter("treatmentId",treatmentId); 
					query.setParameter("pSId",pSId); 
					query.setParameter("pSubSId",pSubSId); 
					//query.setParameter("sponsorId",sponsorId); 
					//query.setParameter("chargesSlaveId",chargesSlaveId); 
										
					ltPatientRecord=query.list();
			 
									
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


		/**@author   :Kishor
		 * @date     :9-Aug-2017
		 * @code     :for Ipd package billing save and update  **/
		@Override
		public int savePackageIpd(
				EhatOtherBillDetailForIpdDto ehatOtherBillDetailForIpdDto,
				HttpServletRequest request, String queryType) {
			Integer otherBillDetailsId = ehatOtherBillDetailForIpdDto.getOtherbildetailidipd();
			/*Integer billDetailsId = ehatOtherBillDetailForOpdDto.getBillDetailsId();
			Integer chargesId = ehatOtherBillDetailForOpdDto.getChargesId();
			Integer chargesSlaveId = ehatOtherBillDetailForOpdDto.getChargesSlaveId();*/
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
			int records=0;
			try {
				if (otherBillDetailsId > 0) {
					
					EhatOtherBillDetailForIpdDto obj = (EhatOtherBillDetailForIpdDto) sessionFactory
										.getCurrentSession().get(EhatOtherBillDetailForIpdDto.class,
												otherBillDetailsId);
					obj.setAmount(ehatOtherBillDetailForIpdDto.getAmount());
					obj.setBillDetailsId(ehatOtherBillDetailForIpdDto.getBillDetailsId());
					obj.setBillId(ehatOtherBillDetailForIpdDto.getBillId());
					obj.setQuantity(ehatOtherBillDetailForIpdDto.getQuantity());
					obj.setRate(ehatOtherBillDetailForIpdDto.getRate());
					obj.setChildSubServiceId(ehatOtherBillDetailForIpdDto.getChildSubServiceId());
					obj.setDoctorId(ehatOtherBillDetailForIpdDto.getDoctorId());
	 				obj.setServiceId(ehatOtherBillDetailForIpdDto.getServiceId());
	 				obj.setSubServiceId(ehatOtherBillDetailForIpdDto.getSubServiceId());
	 				
	 				obj.setOtherAmount(ehatOtherBillDetailForIpdDto.getOtherAmount());
	 				obj.setOtherRate(ehatOtherBillDetailForIpdDto.getOtherRate());
	 				obj.setOtherPay(ehatOtherBillDetailForIpdDto.getOtherPay());
	 				obj.setOtherCoPay(ehatOtherBillDetailForIpdDto.getOtherCoPay());
	 				obj.setOtherConcession(ehatOtherBillDetailForIpdDto.getOtherConcession());
	 				
	 				obj.setUpdatedBy(userId);
	 				obj.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
	 				records=2; 
				} else {
					
					/*BillDetailsDto obj = (BillDetailsDto) sessionFactory
							.getCurrentSession().get(BillDetailsDto.class,
									billDetailsId);
					double amount    =obj.getAmount();
					double copay     =obj.getCoPay();
					double pay       =obj.getPay();
					double concession=obj.getConcession();
					
					double amountPak = ehatOtherBillDetailForOpdDto.getAmount();*/
					
					ehatOtherBillDetailForIpdDto.setCreatedBy(userId);	
					ehatOtherBillDetailForIpdDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
					ehatOtherBillDetailForIpdDto.setDeleted("N");
					ehatOtherBillDetailForIpdDto.setCancle("N");
					
					sessionFactory.getCurrentSession().merge(ehatOtherBillDetailForIpdDto);
					records=1;
				}
				 
				 
				
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

		@Override
		public boolean deleteOnClickForPackageIpd(Integer billDetailsId,
				Integer otherbildetailidipd, Integer userId) {
			try {

				//UnitMasterDto unitMaster = new UnitMasterDto();

				EhatOtherBillDetailForIpdDto ehatOtherBillDetailForIpdDto = (EhatOtherBillDetailForIpdDto) sessionFactory
						.getCurrentSession().get(EhatOtherBillDetailForIpdDto.class, otherbildetailidipd);
				ehatOtherBillDetailForIpdDto.setDeleted("Y");

				ehatOtherBillDetailForIpdDto.setDeletedDateTime(new Date(new java.util.Date().getTime()));
				ehatOtherBillDetailForIpdDto.setDeletedBy(userId);

				//sessionFactory.getCurrentSession().merge(unitMaster);

			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
				return false;
			}
			return true;
		}
		
		/************
		* @author	: Vinod Udawant
		* @date		: 14-July-2017
		* @codeFor	: Get bill admin charges
		 ************/
		public int getAdminChargesIpd(BillDetailsIpdDto billRecMaster,String callFrom){	
						
			try {
				
				ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
				int servId = Integer.parseInt(resourceBundleEhat.getObject("adminServId").toString());
				int subServId = Integer.parseInt(resourceBundleEhat.getObject("adminSubServId").toString());
				
				double totAmt=0,adminChrg=0;
				int result=0;
				int spId=0;
				String adminChargesFlag="servicewise";
				double adminPerc = 0;
				
				String sqlTflag="select t_flag from ehat_treatment where treatment_id="+billRecMaster.getTreatmentId();
				Query tflagQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlTflag);		
				String tFlag = (String) tflagQuery.uniqueResult();
				
				if(tFlag.equals("Y")){
					
					String sqlFlag = "select ifnull(admin_charges_flag,'servicewise') from hospitalaccinfo where idhospitalAccInfo=1";
					Query flagQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlFlag);		
					adminChargesFlag = (String) flagQuery.uniqueResult();
					
					if(adminChargesFlag.equals("fixed")){
						
						/*String sqlAdminChrg = "select ifnull(administrativeCharge,0) from hospitalaccinfo where idhospitalAccInfo=1";
						Query adminQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlAdminChrg);		
						adminPerc = (Float) adminQuery.uniqueResult();	*/
						
						String sqlBill="select ifnull(first_admin_chrg,0) from ehat_bill_details_ipd where deleted='N' and treatment_id="+billRecMaster.getTreatmentId()+" and service_id="+servId+" and sub_service_id="+subServId;
						Query billQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlBill);		
						adminPerc = (Double) billQuery.uniqueResult();	
						 
					}else{						
						
						String sqlBill="select ifnull(first_admin_chrg,0) from ehat_bill_details_ipd where deleted='N' and treatment_id="+billRecMaster.getTreatmentId()+" and service_id="+servId+" and sub_service_id="+subServId;
						Query billQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlBill);		
						adminChrg = (Double) billQuery.uniqueResult();	
						
						String sqlAdmin="select adm_chrg_srv from hospitalaccinfo where idhospitalAccInfo=1 ";
						Query adminQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlAdmin);		
						String adminSrv = (String) adminQuery.uniqueResult();
						String[] parts=null;
						if(adminSrv.length()>0){
							
							parts = adminSrv.split(",");					
						}			
						
						String sqlSubAdmin="select adm_chrg_subser from hospitalaccinfo where idhospitalAccInfo=1 ";
						Query adminSubQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlSubAdmin);		
						String adminSubSrv = (String) adminSubQuery.uniqueResult();
						// Get charges of subservice start
						
						String servIds="1,3,15";
						String sqlBed="";
						String sql="";
						
						if(callFrom.equals("IpdSponsor")){
							
							for(int i = 0; i < parts.length; i++) {
							    if(parts[i].equals("1") || parts[i].equals("3")) {
							    	
							    	sqlBed="select ifnull(sum(other_amount),0)-ifnull(sum(other_concession), 0) as totAmt from ehat_view_patient_bed_details_ipd where treatment_id="+billRecMaster.getTreatmentId()+" and service_id <> "+servId+" and service_id="+parts[i]+" ";
							    	SQLQuery queryBed = sessionFactory.getCurrentSession().createSQLQuery(sqlBed);
							        totAmt = totAmt+(Double) queryBed.uniqueResult();	
							    }
							}
							
							if(adminSubSrv.length() > 0){
								
								sql="select ifnull(sum(other_amount),0)-ifnull(sum(other_concession), 0) as totAmt from ehat_view_patient_sub_service_details_ipd where treatment_id="+billRecMaster.getTreatmentId()+" and service_id not in("+servIds+") and (service_id in("+adminSrv+") OR sub_service_id in("+adminSubSrv+")) ";
							}else{
								
								sql="select ifnull(sum(other_amount),0)-ifnull(sum(other_concession), 0) as totAmt from ehat_view_patient_sub_service_details_ipd where treatment_id="+billRecMaster.getTreatmentId()+" and service_id not in("+servIds+") and service_id in("+adminSrv+") ";
							}					
										        
						}else{
							
							for(int i = 0; i < parts.length; i++) {
							    if(parts[i].equals("1") || parts[i].equals("3")) {
							    
							    	sqlBed="select ifnull(sum(amount),0)-ifnull(sum(concession), 0) as totAmt from ehat_view_patient_bed_details_ipd where treatment_id="+billRecMaster.getTreatmentId()+" and service_id <> "+servId+" and service_id="+parts[i]+" ";
							    	SQLQuery queryBed = sessionFactory.getCurrentSession().createSQLQuery(sqlBed);
							        totAmt = totAmt+(Double) queryBed.uniqueResult();	
							    }					    
							}	
							
							if(adminSubSrv.length() > 0){
								
								sql="select ifnull(sum(amount),0)-ifnull(sum(concession), 0) as totAmt from ehat_view_patient_sub_service_details_ipd where treatment_id="+billRecMaster.getTreatmentId()+" and service_id not in("+servIds+") and (service_id in("+adminSrv+") OR sub_service_id in("+adminSubSrv+")) ";
							}else{
								
								sql="select ifnull(sum(amount),0)-ifnull(sum(concession), 0) as totAmt from ehat_view_patient_sub_service_details_ipd where treatment_id="+billRecMaster.getTreatmentId()+" and service_id not in("+servIds+") and service_id in("+adminSrv+") ";
							}					
						}				
									
						//double adminPerc=(adminChrg*totAmt)/100; // calculate admin charges on total bill
						
						SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				        totAmt =totAmt+ (Double) query.uniqueResult();				
						adminPerc=(adminChrg*totAmt)/100; // calculate admin charges on total bill
					}
					
					String hql="";
					
					Session session = sessionFactory.getCurrentSession();
					if(callFrom.equals("IpdSponsor")){
						
						hql = "UPDATE BillDetailsIpdDto set otherAmount =:amount,otherRate =:rate,otherPay =:pay,quantity =:quantity WHERE treatmentId =:treatmentId and serviceId =:serviceId and subServiceId =:subServiceId and deleted='N' ";
					}else{
						
						hql = "UPDATE BillDetailsIpdDto set amount =:amount,rate =:rate,coPay =:pay,quantity =:quantity WHERE treatmentId =:treatmentId and serviceId =:serviceId and subServiceId =:subServiceId and deleted='N' ";
					}
					
					Query queryAdmin = session.createQuery(hql);
					queryAdmin.setParameter("amount",adminPerc);  
					queryAdmin.setParameter("rate",adminPerc);  
					queryAdmin.setParameter("pay",adminPerc);  
					queryAdmin.setParameter("quantity",1.0);  
					queryAdmin.setParameter("treatmentId",billRecMaster.getTreatmentId());  
					queryAdmin.setParameter("serviceId",servId); 
					queryAdmin.setParameter("subServiceId",subServId); 
					queryAdmin.executeUpdate();		
					
					// set bill master totals
					setBillMasterTotals(billRecMaster.getTreatmentId(), adminPerc, "adminChrg",sessionFactory.getCurrentSession());
					// set bill master totals
					
					result=1;					
				}	
				
				return result;
				
			} catch (Exception e) {
				
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
				return 0;
			}				
		}


		/***@author   :Bilal
		 * @date      :21-Aug-2017
		 * @code      :for fetching list of ipd packages whose combination is Y ***/
		@SuppressWarnings("unchecked")
		@Override
		public List<BillNobleServicePackageipdDto> getlistOfPackageipd(
				Integer treatmentId) {
			
			List<BillNobleServicePackageipdDto> listBillNobleServiceDto = new ArrayList<BillNobleServicePackageipdDto>();
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(BillNobleServicePackageipdDto.class);
				criteria.add(Restrictions.eq("treatmentId", treatmentId));
				criteria.add(Restrictions.eq("iscombination", "Y"));
				criteria.add(Restrictions.eq("cancle", "N"));
				criteria.add(Restrictions.eq("paidFlag", "N"));
				criteria.add(Restrictions.eq("deleted", "N"));
								
				ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
				String packageIDStr = (String)resourceBundleEhat.getString("packageID");    
				int packageID = Integer.parseInt(packageIDStr);
				
				criteria.add(Restrictions.eq("serviceId",packageID));
				
				listBillNobleServiceDto = criteria.list();
				

			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
				return listBillNobleServiceDto;
			}
			return listBillNobleServiceDto;
		}

		/***@author   :Bilal
		 * @date      :21-Aug-2017
		 * @code      :for converting services to packages ***/
		@Override
		public int convertServiceToPackage(BillDetailsIpdDto billdetails,
				HttpServletRequest request, Integer treatmentId,
				String servIdsChecked, Integer billDetailsId,
				Integer subServiceId, Integer serviceId) {
			try {

				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				Integer unitId = (Integer) session.getAttribute("uId");
				
				// get checked service masters
				String[] servIds;
				if (servIdsChecked.length() > 0) {
					servIds = servIdsChecked.split(",");
					for (String id : servIds) {
						
						//setting deleted flag and cancle flag Y of services whose bill details 
						BillDetailsIpdDto obj = (BillDetailsIpdDto) sessionFactory
								.getCurrentSession().get(BillDetailsIpdDto.class,
										Integer.parseInt(id));
						obj.setDeleted("Y");
						obj.setCancle("Y");
						obj.setDeletedBy(userId);
						obj.setDeletedDateTime(new Date(new java.util.Date().getTime()));
						
						double amount =obj.getAmount();
						double concs  =obj.getConcession();
						double rate   =obj.getRate();
						double quant  =obj.getQuantity();
						String iscom  =obj.getIscombination();
						double famount =amount - concs;
						
					
						
						//saving data in other bill details table
						EhatOtherBillDetailForIpdDto objOther=new EhatOtherBillDetailForIpdDto();
						
						objOther.setAmount(famount);
						objOther.setRate(obj.getRate());
						objOther.setPay(obj.getPay());
						objOther.setQuantity(obj.getQuantity());
						objOther.setConcession(concs);
						
						objOther.setOtherAmount(obj.getOtherAmount());
						objOther.setOtherCoPay(obj.getOtherCoPay());
						objOther.setOtherPay(obj.getOtherPay());
						objOther.setOtherRate(obj.getOtherRate());
						objOther.setOtherConcession(obj.getOtherConcession());
						
						objOther.setBillDetailsId(billDetailsId);
						objOther.setBillId(obj.getBillId());
						objOther.setTreatmentId(obj.getTreatmentId());
						
					   
					    objOther.setChildSubServiceId(obj.getSubServiceId());
					    objOther.setChildServiceId(obj.getServiceId());
					    objOther.setQuantity(obj.getQuantity());
					    
					    objOther.setSubServiceId(subServiceId);
					    objOther.setServiceId(serviceId);
					    objOther.setCreatedDateTime(new Date(new java.util.Date()
						.getTime()));
					    objOther.setCreatedBy(userId);
					    objOther.setDepartmentId(obj.getDepartmentId());
					    objOther.setDoctorId(obj.getDoctorId());
					    objOther.setPatienttId(obj.getPatienttId());
					    objOther.setChargesId(obj.getSponsorId());
					    objOther.setChargesSlaveId(obj.getChargesSlaveId());
					    objOther.setCancle("N");
					    objOther.setDeleted("N");
					    objOther.setIscombination(iscom);
					    objOther.setExtraFlag("Y");
					    
					    //added by vishant for convert to package suregery service
					    objOther.setOtprocedure(obj.getOtprocedure());
					    objOther.setOt_flag(obj.getOt_flag());
					    objOther.setCountot(obj.getCountot());
					    
						sessionFactory.getCurrentSession().merge(objOther);
						
					}
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
		
		/**@author   :Bilal
		 * @date     :21-Aug-2017
		 * @code     :for including remaining amount to package **/
		@Override
		public int includeInPackAmount(BillDetailsIpdDto billdetails,
				HttpServletRequest request, Integer pSubserviceId,
				Integer pservId, Integer billDetailsId, double packamount,
				double totalAmtPackage,double totalAmtRem) {
			int records=0;
			try {

				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				Integer unitId = (Integer) session.getAttribute("uId");
				
				//setting total amount of package 
				BillDetailsIpdDto obj = (BillDetailsIpdDto) sessionFactory
								.getCurrentSession().get(BillDetailsIpdDto.class,
										billDetailsId);
						
						double rate       =obj.getRate();
						double quantity   =obj.getQuantity();
						double concession =obj.getConcession();
						String paidFlag   =obj.getPaidFlag();
						
						double otheramt  =obj.getOtherAmount();
						double otherCon  =obj.getOtherConcession();
						double otherPay  =obj.getOtherPay();
						double otherRate =obj.getOtherRate();
						
						if (packamount > otheramt) {
							otherRate = otherRate + totalAmtRem;
							otheramt  =otherRate * quantity;
							
							otherPay = otheramt - otherCon;
						}
						double amount=0;
						double copay =0;
						//double pay   =0;
						if (paidFlag.equals("Y")) {
							records=2;
						}else{
							rate = rate + totalAmtRem;
							amount =rate*quantity;
							copay =amount -concession;
							
							obj.setRate(rate);
							obj.setAmount(amount);
							obj.setCoPay(copay);
							
							obj.setOtherRate(otherRate);
							obj.setOtherAmount(otheramt);
							obj.setOtherPay(otherPay);
							records=1;
						}
						
						//obj.setCoPay(copay);
				  
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

		/**@author  :Bilal
		 * @date     :221-Aug-2017
		 * @code     :for convert service from pack to billing***/
		@Override
		public int convertToBillingipd(BillDetailsIpdDto billdetails,
				HttpServletRequest request, Integer treatmentId,
			String otherBillDetailsIdOpd) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			// get checked service masters
			String[] servIds;
			if (otherBillDetailsIdOpd.length() > 0) {
				servIds = otherBillDetailsIdOpd.split(",");
				for (String id : servIds) {

					// setting deleted flag and cancle flag Y of services whose
					// other bill details
					EhatOtherBillDetailForIpdDto obj = (EhatOtherBillDetailForIpdDto) sessionFactory
							.getCurrentSession().get(
									EhatOtherBillDetailForIpdDto.class,
									Integer.parseInt(id));
					obj.setDeleted("Y");
					obj.setCancle("Y");
					obj.setDeletedBy(userId);
					obj.setDeletedDateTime(new Date(new java.util.Date()
							.getTime()));

					// saving data in other bill details table
					BillDetailsIpdDto obje = new BillDetailsIpdDto();
					double rate = obj.getRate();
					double cons = obj.getConcession();
					double quan = obj.getQuantity();
					double amount = rate * quan;
					double copy = amount - cons;
					double otherp = amount - cons;
					double othercp = 0.0;
					double consper=((cons * 100 ) / amount);
					
					if(Double.isNaN(consper)) {
						consper=0.0;
		            }
					String iscom  =obj.getIscombination();
					
					obje.setAmount(amount);
					obje.setRate(rate);
					obje.setCoPay(copy);
					obje.setPay(obj.getPay());
					obje.setQuantity(quan);
					obje.setConcession(cons);
					obje.setConcessionPer(consper);
					
					obje.setOtherAmount(obj.getOtherAmount());
					obje.setOtherRate(obj.getOtherRate());
					obje.setOtherCoPay(obj.getOtherCoPay());
					obje.setOtherConcession(cons);
					obje.setOtherPay(obj.getOtherPay());
					

					obje.setBillId(obj.getBillId());
					obje.setTreatmentId(obj.getTreatmentId());

					obje.setSubServiceId(obj.getChildSubServiceId());
					obje.setServiceId(obj.getChildServiceId());

					obje.setDepartmentId(obj.getDepartmentId());
					obje.setDoctorId(obj.getDoctorId());
					obje.setPatienttId(obj.getPatienttId());

					obje.setCreatedDateTime(new Date(new java.util.Date()
							.getTime()));
					obje.setCreatedBy(userId);

					obje.setSponsorId(obj.getChargesId());
					obje.setChargesSlaveId(obj.getChargesSlaveId());
					obje.setCancle("N");
					obje.setDeleted("N");
					obje.setIscombination(iscom);
					obje.setPaidFlag("N");
					
					//added by vishant for convert package to billing suregery service
					obje.setOt_flag(obj.getOt_flag());
					obje.setOtprocedure(obj.getOtprocedure());
					obje.setCountot(obj.getCountot());
					// obje.setUrgentflag("N");
					
					/*Integer subId=obj.getChildSubServiceId();
					SubServiceDto subobje = (SubServiceDto) sessionFactory
							.getCurrentSession().get(SubServiceDto.class,
									subId);
					obje.setServiceId(subobje.getServiceId());*/

					sessionFactory.getCurrentSession().merge(obje);

				}
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
		
		/************
		* @author	: Vinod Udawant
		* @date		: 26-July-2017
		* @codeFor	: Get total payable
		 ************/
		public BillDetailsIpdDto getTotalPayableIpd(BillDetailsIpdDto billRecMaster,String callFrom){	
				
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
	            
	            ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
				int adminServId =Integer.parseInt(resourceBundle.getObject("adminServId").toString());
				int adminSubServId =Integer.parseInt(resourceBundle.getObject("adminSubServId").toString());
				ArrayList<Integer> alServId=new ArrayList<Integer>();
				ArrayList<Integer> alSubServId=new ArrayList<Integer>();
				alServId.add(adminServId);
				alSubServId.add(adminSubServId);
				
				BillDetailsIpdDto billObj=new BillDetailsIpdDto();
				List<BillDetailsIpdDto> blist = new ArrayList<BillDetailsIpdDto>();
				
				/*Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class);			
				criteria.add(Restrictions.eq("treatmentId", billRecMaster.getTreatmentId()));
				criteria.add(Restrictions.eq("billId", billRecMaster.getBillId()));		
				criteria.add(Restrictions.eq("deleted", "N"));		
				criteria.add(Restrictions.eq("paidFlag", "N"));	
				ArrayList<Integer> consId=new ArrayList<Integer>();
				consId.add(2);
				//boolean flag=masterConfigAccess(unitId,depId,2);
				if(flag==false){
	            	System.err.println("In Consulting");
					criteria.add(Restrictions.not(Restrictions.in("serviceId", consId)));
	            }
				if(billRecMaster.getServiceId()==adminServId && billRecMaster.getSubServiceId()==adminSubServId){
					
					criteria.add(Restrictions.not(Restrictions.in("serviceId", alServId)));
					criteria.add(Restrictions.not(Restrictions.in("subServiceId", alSubServId)));					
				}
				
				criteria.add(Restrictions.eq("cancle", "N"));	
				
				if(billRecMaster.getServiceId()>0){
					
					criteria.add(Restrictions.eq("serviceId", billRecMaster.getServiceId()));
				}
				
				@SuppressWarnings("unchecked")
				List<BillDetailsIpdDto> listBillMaster = (List<BillDetailsIpdDto>) criteria.list();		
				
				for(BillDetailsIpdDto billMaster:listBillMaster){
					
					blist.add(billMaster);
				}*/ 
				
				/*if(billRecMaster.getServiceId()>0){
	            	
	            	sql2="select amount,concession,other_amount,other_concession from ehat_bill_details_ipd where treatment_id="+billRecMaster.getTreatmentId()+" and deleted='N' and paid_flag='N' and cancle='N' and service_id="+billRecMaster.getServiceId()+" and service_id not in(3,15)";
	            	
	            }else if(servIds2!=null){
	            					
	            	sql2="select amount,concession,other_amount,other_concession from ehat_bill_details_ipd where treatment_id="+billRecMaster.getTreatmentId()+" and deleted='N' and paid_flag='N' and cancle='N' and service_id in("+servIds2+") and service_id not in(3,15)";
				
	            }else{
					
					sql2="select amount,concession,other_amount,other_concession from ehat_bill_details_ipd where treatment_id="+billRecMaster.getTreatmentId()+" and deleted='N' and paid_flag='N' and cancle='N' and service_id not in(3,15)";
				}*/
				
				if(billRecMaster.getServiceId()>0){
	            	
	            	sql2="select amount,concession,other_amount,other_concession from ehat_bill_details_ipd where treatment_id="+billRecMaster.getTreatmentId()+" and deleted='N' and paid_flag='N' and cancle='N' and service_id="+billRecMaster.getServiceId()+" ";
	            	
	            }else if(servIds2!=null){
	            					
	            	sql2="select amount,concession,other_amount,other_concession from ehat_bill_details_ipd where treatment_id="+billRecMaster.getTreatmentId()+" and deleted='N' and paid_flag='N' and cancle='N' and service_id in("+servIds2+") ";
				
	            }else{
					
					sql2="select amount,concession,other_amount,other_concession from ehat_bill_details_ipd where treatment_id="+billRecMaster.getTreatmentId()+" and deleted='N' and paid_flag='N' and cancle='N' ";
				}
	            
	            SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
	            query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	            @SuppressWarnings("unchecked")
	        	List<Map<String, Object>> listBillMaster = query3.list();
				
	            for(Map<String, Object> row : listBillMaster){
	        		
	            	BillDetailsIpdDto billMaster=new BillDetailsIpdDto();
	            	billMaster.setAmount((Double)row.get("amount"));
	            	billMaster.setConcession((Double)row.get("concession"));
	            	billMaster.setOtherAmount((Double)row.get("other_amount"));
	            	billMaster.setOtherConcession((Double)row.get("other_concession"));            	
	            	blist.add(billMaster);
	        	} 			
				
				billObj.setListBillDetailsIpd(blist);		
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
		public List<GetPopUpDataForOTDto> getPopUpDataForOT(
				Integer pSId, Integer pSubSId, Integer chargesSlaveId,
				Integer sponsorId, Integer treatmentId, Integer patientId,
				Integer billDetailsId) 
				{
			List<GetPopUpDataForOTDto> listSubServiceIpdDto = new ArrayList<GetPopUpDataForOTDto>();
			try {
				double totalRate=0.0;
				double totalAmount=0.0;
				double otherTotalRate=0.0;
				double otherTotalAmount=0.0;
				/*Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(EhatViewPatientSubServiceDetailsIpdDto.class);
				criteria.add(Restrictions.eq("treatmentId", treatmentId));
				criteria.add(Restrictions.eq("serviceId", serviceId));
				//criteria.addOrder(Order.desc("idConfiguration"));
				
				listSubServiceIpdDto = criteria.list();*/
				
					
							String sql1 = "SELECT * FROM ehat_other_bill_detail_for_ipd where service_id="+pSId+" and treatment_id = "+treatmentId+"" +
									" and sub_service_id="+pSubSId+" and deleted='N' and ot_flag='Y' and bill_details_id="+billDetailsId+"" +
									" and charges_id="+sponsorId+" and chargesSlave_id="+chargesSlaveId+"";
						
						
						SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				         
				        @SuppressWarnings("unchecked")
						List<Map<String, Object>> data1 = query1.list();
				         				         				         
				         for(Map<String, Object> row : data1){
				        	 
				        	 GetPopUpDataForOTDto objDTO1= new GetPopUpDataForOTDto();
				        	 
				        	 objDTO1.setOtFlag((String)row.get("ot_flag"));
						        
						        if(objDTO1.getOtFlag().equals("Y"))
						        {						        	
						        	 objDTO1.setServiceId((Integer)row.get("service_id"));
						        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
						        	 objDTO1.setOtherBillDetailsId((Integer)row.get("other_bill_details_id_for_ipd"));
						        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));

						        	 //objDTO1.setIsCategory((String)row.get("isCategory"));
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
						        	 
						        	 totalRate = totalRate + (Double)row.get("rate"); 
						        	 totalAmount= totalAmount + (Double)row.get("amount");
						        	 otherTotalRate = otherTotalRate + (Double)row.get("other_rate");
						        	 otherTotalAmount= otherTotalAmount + (Double)row.get("other_amount");
						        	 
						        	 objDTO1.setAmount((Double)row.get("amount"));
						        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
						        	 objDTO1.setQuantity((Double)row.get("quantity"));
						        	 objDTO1.setConcession((Double)row.get("concession"));
						        	 objDTO1.setPay((Double)row.get("pay"));
						        	 objDTO1.setCoPay((Double)row.get("co_pay"));
						        	 objDTO1.setCancle((String)row.get("cancle"));
						        	 objDTO1.setIsModify((String)row.get("isModify"));
						        	 objDTO1.setIscombination((String)row.get("iscombination"));
						        	 
						        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
						        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
						        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
						        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
						        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));

						        	objDTO1.setCreatedDateTime((Date)row.get("created_date_time"));
						        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
						        	 objDTO1.setChildSubServiceId((Integer)row.get("child_sub_service_id"));
						        	 objDTO1.setOtherFlag((String)row.get("otherflag"));
						       			
						        	if(objDTO1.getOtherFlag().equals("I"))
						        	{
						        		/* String name = (String) resourceBundleEhat.getString(objDTO1.getSubServiceId().toString());
							        	 objDTO1.setOtName(name);*/
						        		String sql13= "SELECT item_name FROM inv_item_master_new where id=:childSubServiceId";
								        Query query13= sessionFactory.getCurrentSession().createSQLQuery(sql13)
								        	 .setParameter("childSubServiceId", objDTO1.getChildSubServiceId());
								        String childSubServiceId = (String) query13.uniqueResult();
								        objDTO1.setCategoryName(childSubServiceId);
						        	}
						        	else if(objDTO1.getOtherFlag().equals("P"))
						        	{
						        		/*String sql1 = "SELECT product_name FROM pharma_product_master where product_delete_flag='N' " +
						        				"and product_id='"+ (Integer)row.get("child_sub_service_id")+"'";*/
						        		
						        		String sql12= "SELECT product_name FROM pharma_product_master where product_id=:childSubServiceId";
								        Query query12= sessionFactory.getCurrentSession().createSQLQuery(sql12)
								        	 .setParameter("childSubServiceId", objDTO1.getChildSubServiceId());
								        String childSubServiceId = (String) query12.uniqueResult();
								        objDTO1.setCategoryName(childSubServiceId);
								        
								       /* String sql123= "SELECT isCategory FROM ehat_subservice where id=:subServiceId";
								        Query query123= sessionFactory.getCurrentSession().createSQLQuery(sql123)
								        	 .setParameter("subServiceId", objDTO1.getSubServiceId());
								        String subServiceId1 = (String) query123.uniqueResult();
								        
								        objDTO1.setIsCategory(subServiceId1);*/
								        
								       // System.err.println("hiii"+objDTO1.getCategoryName());
								        //System.err.println("hiii"+objDTO1.getIsCategory());
						        	}
						        	else if(objDTO1.getOtherFlag().equals("L"))
						        	{
						        		/*String sql1 = "SELECT product_name FROM pharma_product_master where product_delete_flag='N' " +
						        				"and product_id='"+ (Integer)row.get("child_sub_service_id")+"'";*/
						        		
						        		String sql12= "SELECT product_name FROM pharma_product_master where product_id=:childSubServiceId and product_cathlapFlag=:productCathlapFlag";
								        Query query12= sessionFactory.getCurrentSession().createSQLQuery(sql12)
								        	 .setParameter("childSubServiceId", objDTO1.getChildSubServiceId());
								        	 query12.setParameter("productCathlapFlag",1);
								        
								        String childSubServiceId = (String) query12.uniqueResult();
								        objDTO1.setCategoryName(childSubServiceId);
								        
								       /* String sql123= "SELECT isCategory FROM ehat_subservice where id=:subServiceId";
								        Query query123= sessionFactory.getCurrentSession().createSQLQuery(sql123)
								        	 .setParameter("subServiceId", objDTO1.getSubServiceId());
								        String subServiceId1 = (String) query123.uniqueResult();
								        
								        objDTO1.setIsCategory(subServiceId1);*/
								        
								       // System.err.println("hiii"+objDTO1.getCategoryName());
								        //System.err.println("hiii"+objDTO1.getIsCategory());
						        	}
						        	else
						        	{
						        		String sql12= "SELECT category_name FROM ehat_subservice where id=:childSubServiceId";
								        Query query12= sessionFactory.getCurrentSession().createSQLQuery(sql12)
								        	 .setParameter("childSubServiceId", objDTO1.getChildSubServiceId());
								        String childSubServiceId = (String) query12.uniqueResult();
								        objDTO1.setCategoryName(childSubServiceId);
								        
						        	}
						        	
						        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
						        }						        	
				        	
				        	 listSubServiceIpdDto.add(objDTO1);
				        	 objDTO1=null;				         
					}			      						
				         String sql11 = "UPDATE ehat_bill_details_ipd SET rate = '"+totalRate+"' , amount = '"+totalAmount+"' , co_pay = '"+totalAmount+"' , other_rate = '"+otherTotalRate+"' , other_amount = '"+otherTotalAmount+"' , other_pay = '"+otherTotalAmount+"' WHERE bill_details_id = '"+billDetailsId+"' ";
							
							SQLQuery query11 = sessionFactory.getCurrentSession().createSQLQuery(sql11);
					         query11.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
					         query11.executeUpdate();

			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
				return null;
			}
			return listSubServiceIpdDto;
		}
		
		// irfan khan 17-aug-2017 to check access of the service
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
		
		/*public Session openSession() throws HibernateException {
	        return sessionFactory.openSession();
	    }*/

	    public void closeSession(Session session) {
	        try {
	            if (session != null) {
	                Transaction t = session.getTransaction();
	                if (t != null)
	                    t.commit();
	                session.close();
	            }
	        } catch (HibernateException e) {
	            // ignore
	        }
	    }

		@Override
		public int saveIpdCghs(String cghsDetailsRemain, String queryType,
				Integer userId, int unitId, String cghsDetails,int treatmentId, int departmentId) {
			
			try {
				
				
				String sql1 = "DELETE FROM ehat_ipd_cghs_details WHERE treatment_id = '"+treatmentId+"' and department_id = '"+departmentId+"'";
				
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
		         query1.executeUpdate();   	
		       //sessionFactory.getCurrentSession().merge(cghsid);
			
		         
			
			CghsIpdDto cghsIpdDto1 = (CghsIpdDto) ConfigUIJSONUtility
					.getObjectFromJSON(cghsDetails,
							CghsIpdDto.class);

			for (int i = 0; i < cghsIpdDto1.getListCghs()
					.size(); i++) {
				
				CghsIpdDto obj1 = new CghsIpdDto();
				
				obj1.setPatientId(cghsIpdDto1.getListCghs().get(i).getPatientId());
				obj1.setTreatmentId(cghsIpdDto1.getListCghs().get(i).getTreatmentId());
				obj1.setDepartmentId(cghsIpdDto1.getListCghs().get(i).getDepartmentId());
				obj1.setBillId(cghsIpdDto1.getListCghs().get(i).getBillId());
				obj1.setUnitId(cghsIpdDto1.getListCghs().get(i).getUnitId());
				obj1.setServiceName(cghsIpdDto1.getListCghs().get(i).getServiceName());	
				obj1.setPackService(cghsIpdDto1.getListCghs().get(i).getPackService());	
				obj1.setRate(cghsIpdDto1.getListCghs().get(i).getRate());
				obj1.setQuantity(cghsIpdDto1.getListCghs().get(i).getQuantity());
				obj1.setConcession(cghsIpdDto1.getListCghs().get(i).getConcession());				
				obj1.setAmount(cghsIpdDto1.getListCghs().get(i).getAmount());
				obj1.setPay(cghsIpdDto1.getListCghs().get(i).getPay());
				obj1.setCoPay(cghsIpdDto1.getListCghs().get(i).getCoPay());
				obj1.setCghsFlag(cghsIpdDto1.getListCghs().get(i).getCghsFlag());
				obj1.setCreatedBy(unitId);
				// to get only date from dateTime
				SimpleDateFormat sdf = new SimpleDateFormat();
				Date assignDate = sdf.parse(sdf.format(new Date()));
				obj1.setCreatedDateTime(assignDate);
							
				sessionFactory.getCurrentSession().merge(obj1);
				obj1=null;
			}
					
			
			CghsIpdDto cghsIpdDto = (CghsIpdDto) ConfigUIJSONUtility
					.getObjectFromJSON(cghsDetailsRemain,
							CghsIpdDto.class);

			for (int i = 0; i < cghsIpdDto.getListCghsRemain()
					.size(); i++) {
				
				CghsIpdDto obj = new CghsIpdDto();
				
				obj.setPatientId(cghsIpdDto.getListCghsRemain().get(i).getPatientId());
				obj.setTreatmentId(cghsIpdDto.getListCghsRemain().get(i).getTreatmentId());
				obj.setDepartmentId(cghsIpdDto.getListCghsRemain().get(i).getDepartmentId());
				obj.setBillId(cghsIpdDto.getListCghsRemain().get(i).getBillId());
				obj.setUnitId(cghsIpdDto.getListCghsRemain().get(i).getUnitId());
				obj.setServiceName(cghsIpdDto.getListCghsRemain().get(i).getServiceName());
				
				
				obj.setPackService(cghsIpdDto.getListCghsRemain().get(i).getPackService());	
				obj.setRate(cghsIpdDto.getListCghsRemain().get(i).getRate());
				obj.setQuantity(cghsIpdDto.getListCghsRemain().get(i).getQuantity());
				
				
				obj.setAmount(cghsIpdDto.getListCghsRemain().get(i).getAmount());
				obj.setPay(cghsIpdDto.getListCghsRemain().get(i).getPay());
				obj.setCghsFlag(cghsIpdDto.getListCghsRemain().get(i).getCghsFlag());
				obj.setCreatedBy(unitId);
				// to get only date from dateTime
				SimpleDateFormat sdf = new SimpleDateFormat();
				Date assignDate = sdf.parse(sdf.format(new Date()));
				obj.setCreatedDateTime(assignDate);
				
				sessionFactory.getCurrentSession().merge(obj);
				obj=null;
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

	
		
		@Override
		public List<CghsIpdDto> getIpdServiceDetailsForCghs(int treatmentId,
				int deptId) {
			List<CghsIpdDto> listCghsIpdDtoDto = new ArrayList<CghsIpdDto>();
			try {
			
				
				String sql1 = "SELECT * FROM ehat_ipd_cghs_details WHERE treatment_id = '"+treatmentId+"' and department_id='"+deptId+"' and deleted ='N'";
				
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         @SuppressWarnings("unchecked")
		         List<Map<String, Object>> data1 = query1.list();
		         			         
		         for(Map<String, Object> row : data1){
		        	 
		        	 CghsIpdDto objDTO1= new CghsIpdDto();
		        	 
		        		        	 
		        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));    	
		        	 objDTO1.setDepartmentId((Integer)row.get("department_id"));
		        	 objDTO1.setBillId((Integer)row.get("bill_id"));
		        	 objDTO1.setUnitId((Integer)row.get("unit_id"));
		        	 objDTO1.setCghsId((Integer)row.get("cghs_id"));	
		        	 objDTO1.setServiceName((String)row.get("service_name"));
		        	 objDTO1.setPackService((String)row.get("pack_code"));
		        	 objDTO1.setCreatedDateTime((Date)row.get("created_date_time"));
		        	 objDTO1.setCghsFlag((String)row.get("cghs_flag"));
		        	 objDTO1.setRate((Double)row.get("rate"));
		        	 objDTO1.setAmount((Double)row.get("amount"));		        	 
		        	 objDTO1.setQuantity((Double)row.get("quantity"));
		        	 objDTO1.setConcession((Double)row.get("concession"));		        	 
		        	 objDTO1.setPay((Double)row.get("pay"));
		        	 objDTO1.setCoPay((Double)row.get("co_pay"));        	 
		        	 		        	 
		        	 listCghsIpdDtoDto.add(objDTO1);	     	
		        	 
		         }
				
			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
				return listCghsIpdDtoDto;
			}
			return listCghsIpdDtoDto;
		}

		@Override
		public boolean deleteOnClickForCghsIpd(Integer cghsid, Integer depid,
				Integer userId) {
				try {		
				
				String sql1 = "UPDATE ehat_ipd_cghs_details SET deleted = 'Y' WHERE cghs_id = '"+cghsid+"'";
				
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
		         query1.executeUpdate();   	
		       //sessionFactory.getCurrentSession().merge(cghsid);
			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
				return false;
			}
			return true;
		
		}	    
    /************
	* @author	: Vinod Udawant
	* @date		: 16-Oct-2017
	* @codeFor	: Save ipdbill discount
	 ************/
	public int saveEditIPDDiscount(IpdBillDiscount ipdBillDiscount){
    	
	  try {
		  ipdBillDiscount.setCreatedDateTime(new Date());
		  ipdBillDiscount.setDiscFlag("H");
		  sessionFactory.getCurrentSession().merge(ipdBillDiscount);		
		  
		  //setBillMasterTotals(ipdBillDiscount.getTreatmentId(), ipdBillDiscount.getTotalDisc(), "disc",sessionFactory.getCurrentSession());
		  
		  //distributeDiscPaidBySlave(ipdBillDiscount);
		  
		  //setMultiSponsorTotalsForIpd(ipdBillDiscount.getTreatmentId());
		  
		  return 1;
		  
        } catch (Exception e) {
        	System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
                 	 
        	e.printStackTrace();
        	return 0;
        }
    }
	
	/************
	* @author	: Vinod Udawant
	* @date		: 1-Nov-2017
	* @codeFor	: Distribute service paid
	 ************/
	public int distributeDiscPaidBySlave(IpdBillDiscount billMaster){
		
		int result=0;
		
		String sqlRef="select * from ehat_bill_details_ipd where deleted = 'N' and cancle='N' and treatment_id="+billMaster.getTreatmentId()+" and bill_id="+billMaster.getBillId()+" ";
		Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
		billDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		@SuppressWarnings("unchecked")			
		List<Map<String, Object>> listBillDetails = billDetailsQuery.list();
		for(Map<String, Object> row : listBillDetails){
			
			int billDetailsId=(Integer)row.get("bill_details_id");
			double amt=0;
			
			if(billMaster.getSponsorCatId()>0){
				
				amt=(Double)row.get("other_amount");
			}else{
				
				amt=(Double)row.get("amount");
			}
			
			double discAmt=(amt*billMaster.getTotalDiscInPer())/100;
					
			String hql = "UPDATE BillDetailsIpdDto set discount =:discount, discountPer =:discountPer WHERE billDetailsId =:billDetailsId";
				Query query = sessionFactory.getCurrentSession().createQuery(hql);
				query.setParameter("discount", discAmt);				
				query.setParameter("discountPer", billMaster.getTotalDiscInPer());
				query.setParameter("billDetailsId", billDetailsId);
				result = query.executeUpdate();						
		}	
		
		return result;
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-Oct-2017
	* @codeFor	: Save ipdbill discount
	 ************/
	public List<IpdBillDiscount> fetchIpdbilDiscount(HttpServletRequest req) {

		List<IpdBillDiscount> lstIpdBill = new ArrayList<IpdBillDiscount>();

		HttpSession session = req.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		try {

			String sql1 = "SELECT r.bill_discount_id,r.patient_id,r.treatment_id,r.total_amt,r.total_discount,r.approved_status,r.disc_remark,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,r.approved_amt,p.center_patient_id,r.disc_flag, ifnull(r.created_by, 1) created_by from" +
					" ehat_ipdbill_discount r join ehat_patient p ON (r.patient_id = p.patient_id) where r.deleted='N' order by r.bill_discount_id desc";

			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			@SuppressWarnings("unchecked")
			List<Map<String, Object>> data1 = query1.list();

			for (Map<String, Object> row : data1) {

				IpdBillDiscount objIpdbill = new IpdBillDiscount();
				objIpdbill.setBillDiscountId((Integer) row.get("bill_discount_id"));
				objIpdbill.setPatientId((Integer) row.get("patient_id"));
				objIpdbill.setTreatmentId((Integer) row.get("treatment_id"));
				objIpdbill.setDiscNarrtn((String) row.get("patient_name")); // for patient name
				objIpdbill.setTotalAmt((Double) row.get("total_amt"));
				objIpdbill.setTotalDisc((Double) row.get("total_discount"));
				objIpdbill.setApprovedStat((String) row.get("approved_status"));
				objIpdbill.setApprovedAmt((Double) row.get("approved_amt"));
				objIpdbill.setApprovedRemark((String) row.get("approved_remark"));
				objIpdbill.setDiscRemark((String) row.get("disc_remark"));
				objIpdbill.setDiscFlag((String) row.get("disc_flag"));
				objIpdbill.setCenterPatientId((String) row.get("center_patient_id"));
				
				Integer created_by = ((Number) row.get("created_by")).intValue();
				
				String userName = getUserNameForDisc(created_by);
				
				objIpdbill.setUserName(userName);
				
				lstIpdBill.add(objIpdbill);
				
				objIpdbill = null;
			}

		} catch (Exception e) {

			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
		}

		return lstIpdBill;
	}
	
	
	//Added By Badrinath
	//for hospital and surgeon discount by using username
	public String getUserNameForDisc(Integer userId) {
		// TODO Auto-generated method stub
		
		String result = "";
		try {

			String sql = " SELECT concat(f_name,' ',m_name,' ',l_name) User_Name FROM users where deleted='N' and User_ID ="+userId;
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = (String) sqlcount.uniqueResult();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-Oct-2017
	* @codeFor	: Save ipdbill discount
	 ************/
	public List<IpdBillDiscount> fetchIpdbilDiscount(int treatId) {

		List<IpdBillDiscount> lstIpdBill = new ArrayList<IpdBillDiscount>();

		try {

			String sql1 = "SELECT r.bill_discount_id,r.patient_id,r.treatment_id,r.total_amt,r.total_discount,r.approved_status,r.disc_remark,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,r.approved_amt,r.disc_flag from" +
					" ehat_ipdbill_discount r join ehat_patient p ON (r.patient_id = p.patient_id) where r.deleted='N' ";

			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			@SuppressWarnings("unchecked")
			List<Map<String, Object>> data1 = query1.list();

			for (Map<String, Object> row : data1) {

				IpdBillDiscount objIpdbill = new IpdBillDiscount();
				objIpdbill.setBillDiscountId((Integer) row.get("bill_discount_id"));
				objIpdbill.setPatientId((Integer) row.get("patient_id"));
				objIpdbill.setTreatmentId((Integer) row.get("treatment_id"));
				objIpdbill.setDiscNarrtn((String) row.get("patient_name")); // for patient name
				objIpdbill.setTotalAmt((Double) row.get("total_amt"));
				objIpdbill.setTotalDisc((Double) row.get("total_discount"));
				objIpdbill.setApprovedStat((String) row.get("approved_status"));
				objIpdbill.setApprovedAmt((Double) row.get("approved_amt"));
				objIpdbill.setApprovedRemark((String) row.get("disc_remark"));
				objIpdbill.setDiscFlag((String) row.get("disc_flag"));
				lstIpdBill.add(objIpdbill);
				objIpdbill = null;
			}

		} catch (Exception e) {

			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
		}

		return lstIpdBill;
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-Oct-2017
	* @codeFor	: Save approved ipdbill discount
	 ************/
	public int saveApprovedDiscount(IpdBillDiscount objIpdbill){
    	
	  try {
		  
		  	/*IpdBillDiscount objectToUpdate = (IpdBillDiscount) sessionFactory.getCurrentSession().get(IpdBillDiscount.class, objIpdbill.getBillDiscountId());
			objectToUpdate.setApprovedAmt(objIpdbill.getApprovedAmt());	
			objectToUpdate.setApprovedRemark(objIpdbill.getApprovedRemark());	
			objectToUpdate.setApprovedBy(objIpdbill.getApprovedBy());	
			objectToUpdate.setApprovedDateTime(new Date());	*/		
		  
		  	String sql="select ifnull(treatment_id,0) from ehat_ipdbill_discount where deleted='N' and bill_discount_id="+objIpdbill.getBillDiscountId()+" ";
			Query treatQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
			int treatId = ((Number)treatQuery.uniqueResult()).intValue();
			
			sql="select ifnull(sponsor_cat_id,0) from ehat_ipdbill_discount where deleted='N' and bill_discount_id="+objIpdbill.getBillDiscountId()+" ";
			Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
			int spId = ((Number)spQuery.uniqueResult()).intValue();			
			
			String hql = "UPDATE IpdBillDiscount set approvedAmt = :approvedAmt, approvedStat = :approvedStat, approvedRemark = :approvedRemark, approvedBy = :approvedBy, approvedDateTime = :approvedDateTime WHERE billDiscountId = :disc_id";
			Query query = sessionFactory.getCurrentSession().createQuery(hql);
			query.setParameter("approvedAmt", objIpdbill.getApprovedAmt());
			query.setParameter("approvedStat", "Y");
			query.setParameter("approvedRemark", objIpdbill.getApprovedRemark());
			query.setParameter("approvedBy", objIpdbill.getApprovedBy());
			query.setParameter("approvedDateTime", new Date());
			query.setParameter("disc_id", objIpdbill.getBillDiscountId());
			int result = query.executeUpdate();	
			
			setBillMasterTotals(treatId, objIpdbill.getApprovedAmt(), "", sessionFactory.getCurrentSession());
			
			//added by vishant
			IpdBillDiscount object = (IpdBillDiscount) sessionFactory.getCurrentSession().get(IpdBillDiscount.class, objIpdbill.getBillDiscountId());
			setIPDBillDiscount(object,spId,sessionFactory.getCurrentSession(),treatId);
			
			IpdBillReceiptMasterDTO obj=new IpdBillReceiptMasterDTO();
			obj.setTreatmentId(treatId);
			obj.setSponsorCatId(spId);
			obj.setTotalDisc(objIpdbill.getApprovedAmt());
			obj.setReceiptOf("discount");
			setMultiSponsorTotalsForIpd(obj,sessionFactory.getCurrentSession());
			
			return result;
           
        } catch (Exception e) {
                 	 
        	e.printStackTrace();
        	System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
        	return 0;
        }
    }	
	
	/************
	* @author	: Vishant Pawar
	 * @param spId 
	 * @param session 
	 * @param treatId 
	* @date		: 08-April-2024
	* @codeFor	: to set hospital and ref doctor discount
	 ************/
	private void setIPDBillDiscount(IpdBillDiscount objIpdbill, int spId, Session session, int treatId) {
		
		double mastTotAmt = 0, mastTotConcn = 0, mastConcnPer = 0, mastTotDisc = 0, mastDiscPer = 0,
				mastTotPaid = 0, mastPaidPer = 0;
		double slaveTotAmt = 0, slaveTotConcn = 0, slavePayable = 0, slaveTotDisc = 0, slaveTotPaid = 0,
				slavePaidPer = 0;
		
		String discountFrom =objIpdbill.getDiscountFrom();
		
		FinanceReportAmtDto fobj = getTotalAmtsForDistribute(treatId, 2, spId);
		mastTotAmt = fobj.getTotalAMt();
		mastTotDisc = objIpdbill.getApprovedAmt();//fobj.getTotalDiscountAMt();
		mastTotConcn = fobj.getTotalConAMt();
		mastTotPaid = fobj.getTotalPaidAMt();
		// mastTotRemain=(Double)row.get("total_remain");
		
		
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
		if(Double.isNaN(mastConcnPer)) {
			mastConcnPer=0.0;
        }
		if(Double.isNaN(mastDiscPer)) {
			mastDiscPer=0.0;
        }
		
		double hospitalDiscount=0;
		double refDoctorDiscount=0;
		//Get pkg slave receipt totals
		String sql = "select * from ehat_bill_details_ipd where deleted='N' and treatment_id=" + treatId
				+ " and cancle='N' ";
		Query slaveQuery = session.createSQLQuery(sql);
		slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> listRecSlave = slaveQuery.list();
		for (Map<String, Object> row : listRecSlave) {

			int sponsorId = (Integer) row.get("charges_slave_id");
			int detailsId = (Integer) row.get("bill_details_id");
//			double otherAmount=0.00;
			double amount=0.00;
			
			double servNetamount=0;
			double servConamount=0;
			
			if(discountFrom.equalsIgnoreCase("Hospital")) {
				
				hospitalDiscount= (Double) row.get("hospital_disc");
				
			}else if(discountFrom.equalsIgnoreCase("RefDoctor")) {
				refDoctorDiscount= (Double) row.get("ref_doctor_disc");
			}
			
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
			
			
			
			
			
		if(discountFrom.equalsIgnoreCase("Hospital")) {
			
			slaveTotDisc=slaveTotDisc+ hospitalDiscount;
			
			sql = "update ehat_bill_details_ipd set discount_from='" + discountFrom + "',hospital_disc=" + slaveTotDisc
				
					+ " where bill_details_id = " + detailsId;
			
			Query recSlaveQuery2 = session.createSQLQuery(sql);
			recSlaveQuery2.executeUpdate();
		}else if(discountFrom.equalsIgnoreCase("RefDoctor")) {
			
			slaveTotDisc=slaveTotDisc+ refDoctorDiscount;
			sql = "update ehat_bill_details_ipd set discount_from='" + discountFrom + "',ref_doctor_disc=" + slaveTotDisc
					+ " where bill_details_id = " + detailsId;
			
			Query recSlaveQuery2 = session.createSQLQuery(sql);
			recSlaveQuery2.executeUpdate();
		}
			


		

		int servId = (Integer) row.get("service_id");
		sql = "select ifnull(iscombination,'N') from ehat_service_master where deleted = 'N' and service_id = "
				+ servId;
		Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		String isCombine = (String) billDetailsQuery.uniqueResult();

		if (isCombine.equals("Y")) {

			slavePaidPer = (slaveTotPaid * 100) / slaveTotAmt;
			setIpdPkgMasterHospitalRefDiscount(servId, detailsId, session, discountFrom, slavePaidPer, sponsorId,slaveTotDisc,slavePayable);
		}
			
		}
		
		// TODO Auto-generated method stub
		
	}
	
	public int setIpdPkgMasterHospitalRefDiscount(int servId, int billDetailsId, Session session, String discountFrom,
			double mastPaidPer, int spId,double totalServiceDiscount, double slavePayable2) {

		double mastConsnPer = 0, mastDiscPer = 0, mastRefPer = 0,mastTotDisc=0,mastTotAmt=0;
		double slaveTotAmt = 0, slaveTotConsn = 0, slavePayable = 0, slaveTotPaid = 0, slaveTotDisc = 0,
				slaveTotRef = 0;

		// Get slave receipt totals
		String sql = "select * from ehat_bill_details_ipd where service_id=" + servId + " and bill_details_id="
				+ billDetailsId;
		Query mastQuery = session.createSQLQuery(sql);
		mastQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> listRecMast = mastQuery.list();
		for (Map<String, Object> row : listRecMast) {

			int sponsorId = (Integer) row.get("charges_slave_id");
			int detailsId = (Integer) row.get("bill_details_id");
//			double otherAmount=0.00;
			
			if (sponsorId > 0) {

				slaveTotAmt = (Double) row.get("other_amount");
				slaveTotConsn = (Double) row.get("other_concession");

			} else {

				slaveTotAmt = (Double) row.get("amount");
				slaveTotConsn = (Double) row.get("concession");
			}
			
			if(discountFrom.equalsIgnoreCase("Hospital")) {
				mastTotDisc=(Double) row.get("hospital_disc");
			}else if(discountFrom.equalsIgnoreCase("RefDoctor")) {
				mastTotDisc = (Double) row.get("ref_doctor_disc");
			}
			
		}
		
		
		
		mastDiscPer = (mastTotDisc * 100) / slaveTotAmt;
		double hospitalDiscount=0;
		double RefDiscount=0;
		// Get pkg slave receipt totals
		sql = "select * from ehat_other_bill_detail_for_ipd where deleted='N' and bill_details_id=" + billDetailsId;
		Query slaveQuery = session.createSQLQuery(sql);
		slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> listRecSlave = slaveQuery.list();
		for (Map<String, Object> row : listRecSlave) {

			// int sponsorId=(Integer)row.get("chargesSlave_id");
			int pkgSlaveId = (Integer) row.get("other_bill_details_id_for_ipd");

			if (spId > 0) {

				slaveTotAmt = (Double) row.get("other_amount");
				slaveTotConsn = (Double) row.get("other_concession");

			} else {

				slaveTotAmt = (Double) row.get("amount");
				slaveTotConsn = (Double) row.get("concession");
			}
			
			if(discountFrom.equalsIgnoreCase("Hospital")) {
				hospitalDiscount=(Double) row.get("hospital_disc");
			}else if(discountFrom.equalsIgnoreCase("RefDoctor")) {
				RefDiscount = (Double) row.get("ref_doctor_disc");
			}

			
			  slaveTotConsn=(slaveTotAmt*mastConsnPer)/100; 
			  slavePayable=slaveTotAmt -slaveTotConsn; 
			  slaveTotDisc=(slavePayable*mastDiscPer)/100;
			 
			//double totalAmount = slaveTotAmt;
			
			mastDiscPer = (totalServiceDiscount * 100) / slavePayable2;
			
			slaveTotPaid = (slavePayable * mastPaidPer) / 100;
			slaveTotDisc=(slavePayable*mastDiscPer)/100;


			if(discountFrom.equalsIgnoreCase("Hospital")) {
				slaveTotDisc= slaveTotDisc+hospitalDiscount;
				sql = "update ehat_other_bill_detail_for_ipd set "
						+ " hospital_disc=" + slaveTotDisc + ",discount_from='" + discountFrom 
						+ "' where other_bill_details_id_for_ipd = " + pkgSlaveId;
			}else if(discountFrom.equalsIgnoreCase("RefDoctor")) {
				slaveTotDisc= slaveTotDisc+RefDiscount;
				sql = "update ehat_other_bill_detail_for_ipd set "
						+ " ref_doctor_disc=" + slaveTotDisc + ",discount_from='" + discountFrom 
						+ "' where other_bill_details_id_for_ipd = " + pkgSlaveId;
			}
					

			

			Query recSlaveQuery2 = session.createSQLQuery(sql);
			recSlaveQuery2.executeUpdate();
		}
		return 1;
	}

	/************
	* @author	: Vinod Udawant
	* @date		: 26-Oct-2017
	* @codeFor	: Generate Invoice
	 ************/
	@Override
	public int genarateInvoice(int treatId,int billTypeId,int userId){
    	
	  try {
		 
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String dischargeTimeForInvoiceFlage = resourceBundle.getObject("dischargeTimeForInvoiceFlage").toString();
		  
		  String billType="";
		  int result=0;
		  if(billTypeId==1){
			  
			  billType="general";
		  }else if(billTypeId==2){
			  
			  billType="credit";
		  }
		  
		  if(dischargeTimeForInvoiceFlage.equalsIgnoreCase("on")){
			  String sql1 = "select count(discharge_date) as discharge_date from discharge_summery where treatment_id="+treatId+" ";
			  SQLQuery query11 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			  int disDate = ((Number) query11.uniqueResult()).intValue();
			  
			  if(disDate <= 0){
				  result=3;
			  }else{
				  String sql = "select invoice_flag from ehat_bill_master where treatment_id="+treatId+" ";
				  SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				  String invFlag = (String) query1.uniqueResult();
				  
				  if(invFlag.equals("N")){
					  
					  sql = "select max(invoice_count) from ehat_bill_master where department_id=2";
					  SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
					  int invCount = (Integer) query2.uniqueResult();	
					  invCount=invCount+1;
					  
					  String hql = "update ehat_bill_master set invoice_flag='Y', invoice_count="+invCount+", bill_type="+billTypeId+", bill_type_name='"+billType+"', "
					  			 + " inv_created_by="+userId+", inv_created_date_time=now() where treatment_id="+treatId;
					  Query query = sessionFactory.getCurrentSession().createSQLQuery(hql);
					  query.executeUpdate();	
					  result=1;
					  
					  	/*String hql = "UPDATE BillMasterDto set invoiceFlag = :invoiceFlag, invoiceCount = :invoiceCount, " +
					  		"billType = :billType, billTypeName = :billTypeName, invCreatedBy = :updatedBy, invoiceCreatedDateTime = :updatedDateTime " +
					  		"WHERE treatmentId = :treatmentId";
						Query query = sessionFactory.getCurrentSession().createQuery(hql);
						query.setParameter("invoiceFlag", "Y");
						query.setParameter("invoiceCount", invCount);
						query.setParameter("billType", billTypeId);
						query.setParameter("billTypeName", billType);
						query.setParameter("updatedBy", userId);
						query.setParameter("updatedDateTime", new Date());
						query.setParameter("treatmentId", treatId);
						query.executeUpdate();	
						result=1;*/
				  }else{
					  
					  result=2;
				  } 
			  }
		  }else{

			  String sql = "select invoice_flag from ehat_bill_master where treatment_id="+treatId+" ";
			  SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
			  String invFlag = (String) query1.uniqueResult();
			  
			  if(invFlag.equals("N")){
				  
				  sql = "select max(invoice_count) from ehat_bill_master where department_id=2";
				  SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				  int invCount = (Integer) query2.uniqueResult();	
				  invCount=invCount+1;
				  
				  TreatmentDto treatObj = (TreatmentDto)sessionFactory.getCurrentSession().get(TreatmentDto.class, treatId);
				  BillMasterDto billObj = treatObj.getListBill().get(0);
				  Hibernate.initialize(billObj);
				  billObj.setInvoiceFlag("Y");
				  billObj.setInvoiceCount(invCount);
				  billObj.setInvCreatedBy(userId);
				  billObj.setInvoiceCreatedDateTime(new Date());
				  
				  /*String hql = "UPDATE BillMasterDto set invoiceFlag = :invoiceFlag, invoiceCount = :invoiceCount, " +
				  		"billType = :billType, billTypeName = :billTypeName, invCreatedBy = :updatedBy, invoiceCreatedDateTime = :updatedDateTime " +
				  		"WHERE treatmentId = :treatmentId";
					Query query = sessionFactory.getCurrentSession().createQuery(hql);
					query.setParameter("invoiceFlag", "Y");
					query.setParameter("invoiceCount", invCount);
					query.setParameter("billType", billTypeId);
					query.setParameter("billTypeName", billType);
					query.setParameter("updatedBy", userId);
					query.setParameter("updatedDateTime", new Date());
					query.setParameter("treatmentId", treatId);
					query.executeUpdate();*/
					result=1;
			  }else{
				  
				  result=2;
			  } 
		  
		  }	  
		  
		 
		  return result;
           
        } catch (Exception e) {
                 	 
        	e.printStackTrace();
        	System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
        	return 0;
        }
	  }
	
	//To generate token number...@Author-Sagar
	 	public String getTokenNumber(String d,int trid,int drid){
	 		
	 		//System.err.println("d---"+d);
			String s1=String.valueOf(drid);
			Criteria criteriatoken = sessionFactory.getCurrentSession().createCriteria(TokenDto.class);
			 //criteriatoken.setProjection(Projections.property("token"));
			criteriatoken.setProjection(Projections.max("token")); 
			criteriatoken.add(Restrictions.eq("doctorIdList",s1));
			 criteriatoken.add(Restrictions.eq("treatmentId",trid));
			 criteriatoken
				.add(Restrictions
						.sqlRestriction("DATE(created_date_time)=CURDATE()"));
			// System.err.println("s1---->"+s1);
			// System.err.println("trid--->"+trid);
			 Integer unid = (Integer) criteriatoken.uniqueResult();
	 		d=unid+" "+d;
	 		
			return d;
	 	}

	 	/************
		* @author	: Sagar kadam
		* @date		: 01/july-2017
		* @codeFor	: autosuggesstion 
		 ************/		
		@SuppressWarnings("unchecked")
		@Override
		public List<IpdBillPatientsDTO> autosuggesstionviewIpdbillPatients(String letter,String finalBill,String usertype,HttpServletRequest request){
			List<IpdBillPatientsDTO> ltIpdbillPatients = null;
			try {
				

				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				Integer unitId = (Integer) session.getAttribute("uId");
				
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(IpdBillPatientsDTO.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("unitId", +unitId));
				if(finalBill.equalsIgnoreCase("finalBill")){
					
					criteria.add(Restrictions.eq("invoiceFlag", "Y"));
				}else{
					criteria.add(Restrictions.eq("invoiceFlag", "N"));
				}if(usertype.equalsIgnoreCase("Y")){
					
					criteria.add(Restrictions.like("inCount", "%" + letter + "%"));	
					
				}else{
				
				Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
				Criterion rest2= Restrictions.like("pIdd", "%" + letter + "%");
				Criterion rest3= Restrictions.like("mrnno", "%" + letter + "%");
				Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
				Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
				criteria.add(Restrictions.or(rest1, rest2,rest3,rest4,rest5));
				/*criteria.add(Restrictions
						.sqlRestriction("patient_name LIKE '%" + letter + "%' OR pIdd LIKE '%" + letter + "%'"));
				*/
				}
				criteria.addOrder(Order.desc("pId"));
				ltIpdbillPatients = criteria.list();
		
			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
				return ltIpdbillPatients;
			}
			return ltIpdbillPatients;
		}


		
		
		@Override
		public List<EhatViewPatientSubServiceDetailsIpdDto> getIpdPatientServiceBillForComparison(
				Integer treatmentId) {
			
			List<EhatViewPatientSubServiceDetailsIpdDto> listSubServiceIpdDto = new ArrayList<EhatViewPatientSubServiceDetailsIpdDto>();
			try {
				
					String sql10 = "SELECT service_id FROM ehat_bill_details_ipd where treatment_id = '"+treatmentId+"' and deleted = 'N' group by service_id ";
				
				
				SQLQuery query10 = sessionFactory.getCurrentSession().createSQLQuery(sql10);
		        query10.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         
		        @SuppressWarnings("unchecked")
				List<Map<String, Object>> data10 = query10.list();
		         
		         
		         
		         for(Map<String, Object> row1 : data10){
		        	 
		        	 EhatViewPatientSubServiceDetailsIpdDto objDTO10= new EhatViewPatientSubServiceDetailsIpdDto();
		        	 
		        	// objDTO10.setServiceId((Integer)row1.get("service_id"));
		        	 int serviceId=(Integer)row1.get("service_id");
		        	
		        	 /*listSubServiceIpdDto.add(objDTO10);
		        	 objDTO10=null;*/
		         
			         
				
				 /*if( serviceId==2 )
					{ 
			
		         String sql="select d.doc_name,b.co_pay,b.other_co_pay,b.other_pay,b.pay,b.quantity,b.other_concession,b.doctor_id,b.concession_per,b.concession,b.rate,b.other_rate,b.bill_details_id,b.service_id,b.cancle,b.created_date_time,b.paid_flag from"+
				         " doctor d ,ehat_bill_details_ipd b where d.Doctor_ID = b.doctor_id"+
				         " and b.service_id ='"+serviceId+"' and b.treatment_id='"+treatmentId+"'and b.deleted='N'";
				
		         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         List<Map<String, Object>> data = query.list();
		         ArrayList<String> tokenlist = new ArrayList<String>();
	 	         for(Map<String, Object> row : data){
	 	        	EhatViewPatientSubServiceDetailsIpdDto objDTO= new EhatViewPatientSubServiceDetailsIpdDto();
		        	 objDTO.setServiceId((Integer)row.get("service_id"));
		        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO.setDocId((Integer)row.get("doctor_id")); 
		        	 objDTO.setDocName((String)row.get("doc_name"));
		        	 objDTO.setConcessionPer((Double)row.get("concession_per"));
		        	 objDTO.setConcession((Double)row.get("concession"));
		        	 objDTO.setOtherConcession((Double)row.get("other_concession"));
		        	 objDTO.setPay((Double)row.get("pay"));
		        	 objDTO.setOtherPay((Double)row.get("other_pay"));
		        	 objDTO.setCoPay((Double)row.get("co_pay"));
		        	 objDTO.setOtherCoPay((Double)row.get("other_co_pay"));
		        	 objDTO.setQuantity((Double)row.get("quantity"));
		        	 //Added By sagar...@Author-Sagar
		        	 String s1=(String)row.get("doc_name");
		        	 String[] array = s1.split(" ");
	  	        	 String tk= getTokenNumber(array[1].substring(0,2),treatmentId,(Integer)row.get("doctor_id"));
	        	 	 tokenlist.add(tk);
	        	 	 //End Here...@Author-Sagar
	        	 	 
	 	        	 objDTO.setCancle ((String)row.get("cancle"));
		        	 objDTO.setRate((Double)row.get("rate"));
		        	 objDTO.setOtherRate((Double)row.get("other_rate"));
		        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	 objDTO.setCreatedDate((Date)row.get("created_date_time"));
		        	 objDTO.setPaidFlag((String)row.get("paid_flag"));
		        	 listSubServiceIpdDto.add(objDTO);
		        	 objDTO=null;
		         }
		         for (String string : tokenlist) {
					System.err.println("finaltoken no-"+string);
				}
		        	String final1= Joiner.on(",").join(tokenlist);
		        	//System.err.println("single string--"+final1);
		        	Session session = sessionFactory.getCurrentSession();
		        	String hql = "UPDATE TreatmentDto set tokenno =:tkn WHERE treatmentId =:tid";
					Query query1 = session.createQuery(hql);
					query1.setParameter("tkn",final1);  
					query1.setParameter("tid", treatmentId);
	 				query1.executeUpdate();
					
					}
				
				 else*/ if(serviceId==14)
				{
					
						//String sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"'";
							String sql1 = "SELECT *,sum(quantity) as qty,sum(amount) as amt FROM ehat_bill_details_ipd where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"' and deleted = 'N' group by sub_service_id";
						
						
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
				        	 
				        	 objDTO1.setAmount((Double)row.get("amt"));
				        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
				        	 objDTO1.setQuantity((Double)row.get("quantity"));
				        	 objDTO1.setConcession((Double)row.get("concession"));
				        	 objDTO1.setConcessionPer((Double)row.get("concession_per"));
				        	 objDTO1.setPay((Double)row.get("pay"));
				        	 objDTO1.setCoPay((Double)row.get("co_pay"));
				        	 objDTO1.setCancle((String)row.get("cancle"));
				        	 objDTO1.setIsModify((String)row.get("isModify"));
				        	 
				        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
				        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
				        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
				        	
				        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
				        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
				        
				        	 objDTO1.setCreatedDate((Date)row.get("created_date_time"));
				        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
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
				       			
				        	
				        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
				        	 listSubServiceIpdDto.add(objDTO1);
				        	 objDTO1=null;
				         
					}
				          						
				}
				else if(serviceId==16)
				{
					
						//String sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"'";
							String sql1 = "SELECT *,sum(quantity) as qty,sum(amount) as amt FROM ehat_bill_details_ipd where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"' and deleted = 'N' group by sub_service_id";
						
						
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
				        	 
				        	 objDTO1.setAmount((Double)row.get("amt"));
				        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
				        	 objDTO1.setQuantity((Double)row.get("qty"));
				        	 objDTO1.setConcession((Double)row.get("concession"));
				        	 objDTO1.setPay((Double)row.get("pay"));
				        	 objDTO1.setCoPay((Double)row.get("co_pay"));
				        	 objDTO1.setCancle((String)row.get("cancle"));
				        	 objDTO1.setIsModify((String)row.get("isModify"));
				        	 
				        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
				        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
				        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
				        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
				        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
				        
				        	 objDTO1.setCreatedDate((Date)row.get("created_date_time"));
				        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
				        	 int bb=(Integer)row.get("sub_service_id");
				        	 
				        	 if(aa==16){		
									
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
				}
				
				else if(serviceId != 2 && serviceId != 1 && serviceId != 3)
				{
				
				String otProc=null;
				String sql1 = "SELECT *,sum(quantity) as qty,sum(amount) as amt FROM ehat_view_patient_sub_service_details_ipd where treatment_id = '"+treatmentId+"' and service_id='"+serviceId+"' group by sub_service_id";
				
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         @SuppressWarnings("unchecked")
		         List<Map<String, Object>> data1 = query1.list();
		         			         
		         for(Map<String, Object> row : data1){
		        	 
		        	 EhatViewPatientSubServiceDetailsIpdDto objDTO1= new EhatViewPatientSubServiceDetailsIpdDto();
		        	 
		        	 objDTO1.setServiceId((Integer)row.get("service_id"));
		        	 int aaa=(Integer)row.get("service_id");
		        	//System.err.println("kkkkkk"+aaa);
		        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO1.setCategoryName((String)row.get("category_name"));
		        	 objDTO1.setDocName((String)row.get("doc_name"));
		        	 
		        	 int drId = ((Number)row.get("Doctor_ID")).intValue();
		        	 
		        	 objDTO1.setDocId(drId);
		        	 
		        	 //objDTO1.setDocId((Integer)row.get("Doctor_ID"));
		        	 //objDTO1.setDocId((Integer)row.get("Doctor_ID"));
		        	 //objDTO1.setBedHall((String)row.get("BedHall"));
		        	 objDTO1.setRate((Double)row.get("rate"));
		        	 objDTO1.setAmount((Double)row.get("amt"));
		        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	 objDTO1.setQuantity((Double)row.get("qty"));
		        	 objDTO1.setConcession((Double)row.get("concession"));
		        	 objDTO1.setConcessionPer((Double)row.get("concession_per"));
		        	 objDTO1.setPay((Double)row.get("pay"));
		        	 objDTO1.setCoPay((Double)row.get("co_pay"));
		        	 objDTO1.setCancle((String)row.get("cancle"));
		        	 objDTO1.setIsModify((String)row.get("isModify"));
		        	 objDTO1.setIscombination((String)row.get("iscombination"));
		        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
		        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
		        	
		        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
		        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
		        
		        	 objDTO1.setCreatedDate((Date)row.get("created_date"));
		        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
		        	 int bbb=(Integer)row.get("sub_service_id");
		        	 
		        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
		        	 objDTO1.setOtProcedureId((String) row.get("ot_procedure"));
		        	 
		        	 otProc = (String) row.get("ot_procedure").toString();
		        	 
		        	 /* if(aaa==14)
		        	 {		
							String sql3 = "SELECT inv_consumption_info_slave_item_name AS IName FROM inv_consumption_item_info_slave where inv_consumption_master_id = "+bbb+";";
										

							SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
							query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> data3 = query3.list();
							//System.err.println("ot len-----------------------"+data1.size());
							for (Map<String, Object> row3 : data3) {
									
								objDTO1.setInventoryName((String) row3.get("IName"));
								//listServiceIpdDto.add(objDTO);
							}
						
					}*/
		        	 
		        	 
		        	 if(!(otProc.equals(null) || otProc.equals("0") || otProc.equals("-")))
		        	 {
		        	 if(aaa==4)
		        	 {
						//otProc = (String) row.get("ot_procedure").toString();
						if (otProc.equals(null) || otProc.equals("0")) {

						} else {

							String sql2 = "SELECT GROUP_CONCAT(o.OName SEPARATOR ' , ') AS OName "
										+ "FROM (ehat_view_patient_service_detail_ipd b join operation o)"
										+ "where b.treatment_id='"+treatmentId+"' and b.service_id='4' and o.status='Y' and o.Operation_id in("+otProc+")";

							SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
							query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> data2 = query2.list();
							//System.err.println("ot lennnnnnn-----------------------"+data2.size());
							for (Map<String, Object> row2 : data2) {
									
								objDTO1.setOtProcedure((String) row2.get("OName"));
								//listServiceIpdDto.add(objDTO);
							}
						}
					}  	  	 
		        	 }		        	   	  	 
		         
		   
		        	 listSubServiceIpdDto.add(objDTO1);
		        	 objDTO1=null;
		         }
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
		public List<ConfigurationViewServiceDto2> getIpdComparisonPatients(int treatmentId,
				String servId, String subServId, String chargesSponId,
				String chargesSlaveId,String HallId, String HallSlaveId,
				String isComServId, String isComServlastId) {
			
			List<ConfigurationViewServiceDto2> lstchargesConfig = new ArrayList<ConfigurationViewServiceDto2>();
			try {

						getPatientBedBill(treatmentId, 3);
						
						//String sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"'";
					    String sql1 = "SELECT * FROM ehat_configuration_services_view where service_id in("+subServId+") and charges_id="+chargesSponId+" and id_charges_slave="+chargesSlaveId+" and hall_id="+HallId+" and hallSlave_id="+HallSlaveId+" and is_com_servId="+isComServId+" and is_com_servlastId="+isComServlastId+" order by service_id ASC";
						
						
						SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				         
				        @SuppressWarnings("unchecked")
						List<Map<String, Object>> data1 = query1.list();
				         
				         
				       
				         for(Map<String, Object> row : data1){
				        	 
				        	 ConfigurationViewServiceDto2 objDTO1= new ConfigurationViewServiceDto2();
				        	 
				        	 objDTO1.setServiceId((Integer)row.get("service_id"));
				        	 objDTO1.setCategoryName((String)row.get("category_name"));
				        	 objDTO1.setCharges((Double)row.get("charges"));
				        	 //int aa=(Integer)row.get("service_id");
				        	
				        	 /*objDTO1.setSubServiceId((Integer)row.get("subservice_id"));
				        	 objDTO1.setSubServiceName((String)row.get("subservice_id"));
				        	 
				        	 objDTO1.setServiceName((String)row.get("service_name"));
				        	 
				        	 objDTO1.setChargesDefault((Double)row.get("chargesDefault"));
				        	 */
				        	 
				        /*	 if(aa==14)
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
								
							}*/
				       			
				        	 
				        	 
				        	 lstchargesConfig.add(objDTO1);
				        	 objDTO1=null;
				        	 
					}
				

			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
				return lstchargesConfig;
			}
			return lstchargesConfig;
			
		}

		
		@Override
		public int saveQuotations(String billquotations, String queryType,
				Integer userId, int unitId, int treatmentId, int departmentId) {
			
			try {
				 int cntt=0;
				int estiCount=0;
				
				String sql1 = "SELECT ifnull(max(count),0) FROM ehat_billquotation";				
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);		        
		        int cnt=((Number)query1.uniqueResult()).intValue();	      
	        	  cntt = cnt +1;
	        	  
	        	  
	        	  String sql11 = "SELECT count(treatment_id) FROM ehat_billquotation where treatment_id="+treatmentId+" ";					
					SQLQuery query11 = sessionFactory.getCurrentSession().createSQLQuery(sql11);
			        
			        int estimateCount=((Number)query11.uniqueResult()).intValue();
	        	  System.err.println("-=-=estimateCount-=-"+estimateCount);
		         //query1.executeUpdate();  
	        	  if(estimateCount == 0){
	        		  String sql2 = "SELECT ifnull(max(estimate_no),0) FROM ehat_billquotation";				
	  				SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);		        
	  		        int estimateC=((Number)query2.uniqueResult()).intValue();	      
	  		        estiCount = estimateC +1;
	        	  }else{

	  				String sql3 = "SELECT ifnull(max(estimate_no),0) FROM ehat_billquotation where treatment_id="+treatmentId+" ";				
	  				SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);		        
	  		        int cntttt=((Number)query3.uniqueResult()).intValue();	      
	  	        	  
	        		  
	        		  estiCount=cntttt;
	        	  }
			
			
		         BillQuotationDto billQuotationDto = (BillQuotationDto) ConfigUIJSONUtility
					.getObjectFromJSON(billquotations,
							BillQuotationDto.class);

			for (int i = 0; i < billQuotationDto.getListBillquotations()
					.size(); i++) {
				
				BillQuotationDto obj1 = new BillQuotationDto();
				
				obj1.setPatientId(billQuotationDto.getListBillquotations().get(i).getPatientId());
				obj1.setTreatmentId(billQuotationDto.getListBillquotations().get(i).getTreatmentId());
				obj1.setDepartmentId(billQuotationDto.getListBillquotations().get(i).getDepartmentId());
				obj1.setBillId(billQuotationDto.getListBillquotations().get(i).getBillId());
				obj1.setUnitId(billQuotationDto.getListBillquotations().get(i).getUnitId());
				obj1.setCount(cntt);
				
				obj1.setServiceId(billQuotationDto.getListBillquotations().get(i).getServiceId());
				obj1.setSubServiceId(billQuotationDto.getListBillquotations().get(i).getSubServiceId());				
				obj1.setServiceName(billQuotationDto.getListBillquotations().get(i).getServiceName());
				obj1.setRate(billQuotationDto.getListBillquotations().get(i).getRate());
				obj1.setQuantity(billQuotationDto.getListBillquotations().get(i).getQuantity());				
				obj1.setAmount(billQuotationDto.getListBillquotations().get(i).getAmount());
				obj1.setQuotationName(billQuotationDto.getListBillquotations().get(i).getQuotationName());
				obj1.setSubServiceName(billQuotationDto.getListBillquotations().get(i).getSubServiceName());
				obj1.setEstimateNo(estiCount);
			
				obj1.setCreatedBy(unitId);
				// to get only date from dateTime
				SimpleDateFormat sdf = new SimpleDateFormat();
				Date assignDate = sdf.parse(sdf.format(new Date()));
				obj1.setCreatedDateTime(assignDate);
							
				sessionFactory.getCurrentSession().merge(obj1);
				obj1=null;
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

		@Override
		public List<BillQuotationDto> getBillQuotationsDetails(int treatmentId,
				int deptId) {
			List<BillQuotationDto> listBillquotations = new ArrayList<BillQuotationDto>();
			try {
			
				
				//String sql1 = "SELECT *,sum(quantity) as qty_count FROM ehat_billquotation WHERE treatment_id = '"+treatmentId+"' and department_id='"+deptId+"' and deleted ='N' group by sub_service_id";
				String sql1 = "SELECT *,sum(quantity) as qty_count FROM ehat_billquotation WHERE patient_id = '"+treatmentId+"' and deleted ='N' group by sub_service_id";
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         @SuppressWarnings("unchecked")
		         List<Map<String, Object>> data1 = query1.list();
		         			         
		         for(Map<String, Object> row : data1){
		        	 
		        	 BillQuotationDto objDTO1= new BillQuotationDto();
		        	
		        		        	 
		        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));    	
		        	 objDTO1.setDepartmentId((Integer)row.get("department_id"));
		        	 objDTO1.setBillId((Integer)row.get("bill_id"));
		        	 objDTO1.setCount((Integer)row.get("count"));
		        	 objDTO1.setUnitId((Integer)row.get("unit_id"));
		        	 objDTO1.setServiceId((Integer)row.get("service_id"));
		        	 objDTO1.setSubServiceId((Integer)row.get("sub_service_id"));
		        	 
		        	 objDTO1.setQuotationId((Integer)row.get("quotation_id"));	
		        	 objDTO1.setServiceName((String)row.get("service_name"));
		        	 objDTO1.setSubServiceName((String)row.get("sub_service_name"));
		        	 objDTO1.setQuotationName((String)row.get("quotation_name"));
		        	 objDTO1.setRate((Double)row.get("rate"));
		        	 objDTO1.setAmount((Double)row.get("amount"));	
		        	 /*objDTO1.setAmount((Double)row.get("amt"));*/	
		        	 objDTO1.setQuantity((Double)row.get("quantity"));
		        	 objDTO1.setQtyCount((Double)row.get("qty_count"));
		        	 objDTO1.setCreatedDateTime((Date)row.get("created_date_time"));
		        	
		        	 listBillquotations.add(objDTO1);	     	
		        	 
		         }
				
			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
				return listBillquotations;
			}
			return listBillquotations;
		}
		
		
		@Override
		public List<BillQuotationDto> getBillQuotationsNameList(int treatmentId,
				int deptId) {
			List<BillQuotationDto> listBillquotations = new ArrayList<BillQuotationDto>();
			try {
			
				
				String sql1 = "SELECT * FROM ehat_billquotation WHERE treatment_id = '"+treatmentId+"' and department_id='"+deptId+"' and deleted ='N' group by count";
				
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         @SuppressWarnings("unchecked")
		         List<Map<String, Object>> data1 = query1.list();
		         			         
		         for(Map<String, Object> row : data1){
		        	 
		        	 BillQuotationDto objDTO1= new BillQuotationDto();
		        	 
		        		        	 
		        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));    	
		        	 objDTO1.setDepartmentId((Integer)row.get("department_id"));
		        	 objDTO1.setBillId((Integer)row.get("bill_id"));
		        	 objDTO1.setCount((Integer)row.get("count"));
		        	 objDTO1.setUnitId((Integer)row.get("unit_id"));
		        	 objDTO1.setServiceId((Integer)row.get("service_id"));
		        	 objDTO1.setSubServiceId((Integer)row.get("sub_service_id"));
		        	 
		        	 objDTO1.setQuotationId((Integer)row.get("quotation_id"));	
		        	 objDTO1.setServiceName((String)row.get("service_name"));
		        	 objDTO1.setQuotationName((String)row.get("quotation_name"));
		        	 objDTO1.setRate((Double)row.get("rate"));
		        	 objDTO1.setAmount((Double)row.get("amount"));		        	 
		        	 objDTO1.setQuantity((Double)row.get("quantity"));
		        	 objDTO1.setCreatedDateTime((Date)row.get("created_date_time"));
		        	
		        	 listBillquotations.add(objDTO1);	     	
		        	 
		         }
				
			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
				return listBillquotations;
			}
			return listBillquotations;
		}
		
		
		@Override
		public List<BillQuotationDto> getBillQuotationsDetailsRunT(int treatmentId,
				int count) {
			List<BillQuotationDto> listBillquotations = new ArrayList<BillQuotationDto>();
			try {
			
				
				String sql1 = "SELECT * FROM ehat_billquotation WHERE treatment_id = '"+treatmentId+"' and count ='"+count+"' and deleted ='N'";
				
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         @SuppressWarnings("unchecked")
		         List<Map<String, Object>> data1 = query1.list();
		         			         
		         for(Map<String, Object> row : data1){
		        	 
		        	 BillQuotationDto objDTO1= new BillQuotationDto();
		        	 
		        		        	 
		        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));    	
		        	 objDTO1.setDepartmentId((Integer)row.get("department_id"));
		        	 objDTO1.setBillId((Integer)row.get("bill_id"));
		        	 objDTO1.setCount((Integer)row.get("count"));
		        	 objDTO1.setUnitId((Integer)row.get("unit_id"));
		        	 objDTO1.setServiceId((Integer)row.get("service_id"));
		        	 objDTO1.setSubServiceId((Integer)row.get("sub_service_id"));
		        	 
		        	 objDTO1.setQuotationId((Integer)row.get("quotation_id"));	
		        	 objDTO1.setServiceName((String)row.get("service_name"));
		        	 objDTO1.setSubServiceName((String)row.get("sub_service_name"));
		        	 objDTO1.setQuotationName((String)row.get("quotation_name"));
		        	 objDTO1.setRate((Double)row.get("rate"));
		        	 objDTO1.setAmount((Double)row.get("amount"));		        	 
		        	 objDTO1.setQuantity((Double)row.get("quantity"));
		        	 objDTO1.setCreatedDateTime((Date)row.get("created_date_time"));
		        	
		        	 listBillquotations.add(objDTO1);	     	
		        	 
		         }
				
			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
				return listBillquotations;
			}
			return listBillquotations;
		}
		
		
		public int setBillMasterTotals(int treatmentId,	double amount, String callFrom,Session session) {
			
			int result=0;
			try {
				
				// Update amount in bill master start
				double totalAmt=0;				
				double totPaid=0;
				double totRemain=0;
				double totRefund=0;
				double totDisc=0;
				double totConcn=0;
				
				String spId="select ifnull(charges_master_slave_id,0) as spId FROM ehat_bill_master where deleted='N' and treatment_id="+treatmentId;
				Query spQuery = session.createSQLQuery(spId);		
				Integer sonsrId = ((Number) spQuery.uniqueResult()).intValue();
				
				//String sqlBill="select ifnull(total_bill,0) from ehat_bill_master where deleted='N' and treatment_id="+treatmentId+" ";
				/*if(obj.getSponsorCatId()>0){
					
					sql="select sum(other_amount) as totAmt,sum(other_concession) as totConcn FROM ehat_bill_details_ipd where deleted='N' and treatment_id="+obj.getTreatmentId()+" and cancle='N' ";
				}else{
					
					sql="select sum(amount) as totAmt,sum(concession) as totConcn FROM ehat_bill_details_ipd where deleted='N' and treatment_id="+obj.getTreatmentId()+" and cancle='N' ";
				}*/
				
				if(sonsrId > 0){
					
					String sqlBill="select ifnull(sum(other_amount),0) as totAmt FROM ehat_bill_details_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" and cancle='N' ";
					Query billQuery = session.createSQLQuery(sqlBill);		
					totalAmt = (Double) billQuery.uniqueResult();
					
					sqlBill="select ifnull(sum(other_concession),0) as totCon FROM ehat_bill_details_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" and cancle='N' ";
					Query conQuery = session.createSQLQuery(sqlBill);		
					totConcn = (Double) conQuery.uniqueResult();
				}else{
					
					String sqlBill="select ifnull(sum(amount),0) as totAmt FROM ehat_bill_details_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" and cancle='N' ";
					Query billQuery = session.createSQLQuery(sqlBill);		
					totalAmt = (Double) billQuery.uniqueResult();
					
					sqlBill="select ifnull(sum(concession),0) as totCon FROM ehat_bill_details_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" and cancle='N' ";
					Query conQuery = session.createSQLQuery(sqlBill);		
					totConcn = (Double) conQuery.uniqueResult();
				}			
				
				String sql="select ifnull(sum(total_paid),0) from ehat_receipt_master_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" ";
				Query recQuery = session.createSQLQuery(sql);		
				totPaid = (Double) recQuery.uniqueResult();
				
				String sql2="select ifnull(sum(total_paid),0) from ehat_refund_master_ipd where deleted='N' and treatment_id="+treatmentId+" ";
				Query refQuery = session.createSQLQuery(sql2);		
				totRefund = (Double) refQuery.uniqueResult(); 
				
				String sql3="select ifnull(sum(approved_amt),0) from ehat_ipdbill_discount where deleted='N' and treatment_id="+treatmentId+" ";
				Query discQuery = session.createSQLQuery(sql3);		
				totDisc = (Double) discQuery.uniqueResult(); 
				
				String sql4="select ifnull(invoice_flag,'N') from ehat_bill_master where deleted='N' and treatment_id="+treatmentId+" ";
				Query invQuery = session.createSQLQuery(sql4);		
				String invFlag = (String) invQuery.uniqueResult(); 			
			
				/*if(callFrom.equals("paid")){
					
					totPaid=totPaid+amount;
				}else if(callFrom.equals("refund")){
					
					totRefund=totRefund+amount;
				}else if(callFrom.equals("totBill")){
					
					totalAmt=totalAmt+amount;
				}*/
				
				double totDedcn = (totPaid + totDisc + totConcn);
				String calF = "";
				double refundable=0,calRefund=0,refunfForReflcn=0;
				if(totDedcn > totalAmt){
					
					refundable = (totDedcn-totalAmt);
					calRefund = refundable - (totDisc + totConcn);
					
					if(totRefund > calRefund){
						
						calF = "refund";
						refunfForReflcn = totRefund - calRefund;
						
					}else{
						
						calF = "-";
					}	
					
					totRemain = totalAmt - totDedcn;
					
				}else if(totalAmt > totDedcn){
					
					totRemain = totalAmt - totDedcn;
				}else{
					
					totRemain = 0;
				}			
				
				/*if(totRemain<0){
					
					totRefund=(totPaid + totDisc + totConcn)-totalAmt;
				}*/
				
				String sql44 = "select bill_id from ehat_bill_master where treatment_id="+treatmentId+" limit 1";
				Query billIdQuery = session.createSQLQuery(sql44);		
				int billId = ((Number) billIdQuery.uniqueResult()).intValue(); 
				
				//Session session = session;
				String hql = "UPDATE BillMasterDto set updatedDateTime =:updatedDateTime, totalBill =:totalBill,totalPaid =:totalPaid,total_remain =:remaining,totalRefund =:totalRefund,discount =:discount,total_concn =:totalConcn WHERE billId =:billId";
				Query query = session.createQuery(hql);
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
									
				setIpdBillDetails(treatmentId,refunfForReflcn,calF,session);
				
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

		/*
		 * public int setIpdBillDetails(int treatmentId,double refunfForReflcn, String
		 * callFrom,Session session) {
		 * 
		 * double mastTotAmt=0, mastTotConcn=0, mastConcnPer=0, mastTotDisc=0,
		 * mastDiscPer=0, mastTotPaid=0, mastPaidPer=0, mastTotRefund=0,mastRefPer=0;
		 * double slaveTotAmt=0, slaveTotConcn=0, slavePayable=0, slaveTotDisc=0,
		 * slaveTotPaid=0, slaveTotRef=0,slavePaidPer=0;
		 * 
		 * //Get bill master totals String
		 * sql="select * from ehat_bill_master where treatment_id ="+treatmentId; Query
		 * mastQuery = session.createSQLQuery(sql);
		 * mastQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		 * 
		 * @SuppressWarnings("unchecked") List<Map<String, Object>> listRecMast =
		 * mastQuery.list(); for(Map<String, Object> row : listRecMast){
		 * 
		 * mastTotAmt=(Double)row.get("total_bill");
		 * mastTotDisc=(Double)row.get("discount");
		 * mastTotConcn=(Double)row.get("total_concn");
		 * mastTotPaid=(Double)row.get("total_paid");
		 * //mastTotRemain=(Double)row.get("total_remain");
		 * mastTotRefund=(Double)row.get("total_refund"); }
		 * 
		 * mastConcnPer=(mastTotConcn*100)/mastTotAmt;
		 * mastDiscPer=(mastTotDisc*100)/mastTotAmt;
		 * mastPaidPer=(mastTotPaid*100)/mastTotAmt;
		 * mastRefPer=((refunfForReflcn)*100)/mastTotPaid;
		 * 
		 * //Get pkg slave receipt totals
		 * sql="select * from ehat_bill_details_ipd where deleted='N' and treatment_id="
		 * +treatmentId+" and cancle='N' "; Query slaveQuery =
		 * session.createSQLQuery(sql);
		 * slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		 * 
		 * @SuppressWarnings("unchecked") List<Map<String, Object>> listRecSlave =
		 * slaveQuery.list(); for(Map<String, Object> row : listRecSlave){
		 * 
		 * int sponsorId=(Integer)row.get("charges_slave_id"); int
		 * detailsId=(Integer)row.get("bill_details_id");
		 * 
		 * if(sponsorId > 0){
		 * 
		 * slaveTotAmt=(Double)row.get("other_amount");
		 * 
		 * }else{
		 * 
		 * slaveTotAmt=(Double)row.get("amount"); }
		 * 
		 * slaveTotConcn=(slaveTotAmt*mastConcnPer)/100;
		 * slavePayable=slaveTotAmt-slaveTotConcn;
		 * slaveTotDisc=(slavePayable*mastDiscPer)/100;
		 * slaveTotPaid=(slaveTotAmt*mastPaidPer)/100;
		 * slaveTotRef=(slaveTotPaid*mastRefPer)/100;
		 * 
		 * if(callFrom.equals("refund")){
		 * 
		 * sql="update ehat_bill_details_ipd set discount_per="+mastDiscPer+",discount="
		 * +slaveTotDisc+",refund_per="+mastRefPer+",refund="+slaveTotRef+" "
		 * +" where bill_details_id = "+detailsId; }else{
		 * 
		 * sql="update ehat_bill_details_ipd set discount_per="+mastDiscPer+",discount="
		 * +slaveTotDisc+" " +" where bill_details_id = "+detailsId; }
		 * 
		 * Query recSlaveQuery2 = session.createSQLQuery(sql);
		 * recSlaveQuery2.executeUpdate();
		 * 
		 * int servId=(Integer)row.get("service_id");
		 * sql="select ifnull(iscombination,'N') from ehat_service_master where deleted = 'N' and service_id = "
		 * +servId; Query billDetailsQuery =
		 * sessionFactory.getCurrentSession().createSQLQuery(sql); String isCombine =
		 * (String) billDetailsQuery.uniqueResult();
		 * 
		 * if(isCombine.equals("Y")){
		 * 
		 * slavePaidPer=(slaveTotPaid*100)/slaveTotAmt;
		 * setOpdPkgMasterSlave(servId,detailsId,session,callFrom,slavePaidPer,sponsorId
		 * ); } } return 1; }
		 */	
		
		
		//added by vishant to distribute service wise amount in bill details ipd table
		public int setIpdBillDetails(int treatmentId, double refunfForReflcn, String callFrom, Session session) {
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
			
			FinanceReportAmtDto fobj = getTotalAmtsForDistribute(treatmentId, deptId, chragesSlaveId);
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
			if(Double.isNaN(mastConcnPer)) {
				mastConcnPer=0.0;
            }
			if(Double.isNaN(mastDiscPer)) {
				mastDiscPer=0.0;
            }
			
			if(totalNetAmount  > 0)
		    	mastPaidPer = (mastTotPaid * 100) / totalNetAmount;
			
			if(mastTotPaid > 0)
			mastRefPer = ((refunfForReflcn) * 100) / mastTotPaid;
			
			
			if(Double.isNaN(mastPaidPer)) {
            	mastPaidPer=0.0;
            }
			if(Double.isNaN(mastRefPer)) {
				mastRefPer=0.0;
            }
			

			//Get pkg slave receipt totals
			sql = "select * from ehat_bill_details_ipd where deleted='N' and treatment_id=" + treatmentId
					+ " and cancle='N' ";
			Query slaveQuery = session.createSQLQuery(sql);
			slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listRecSlave = slaveQuery.list();
			for (Map<String, Object> row : listRecSlave) {

				int sponsorId = (Integer) row.get("charges_slave_id");
				int detailsId = (Integer) row.get("bill_details_id");
//				double otherAmount=0.00;
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
//				slaveTotPaid = (slaveTotAmt / totalNetAmt);
//				double finalDistributePaid= slaveTotPaid*mastTotPaid;
				slaveTotRef = (slaveTotPaid * mastRefPer) / 100;

//				if (callFrom.equals("refund")) {
//
//					sql = "update ehat_bill_details_ipd set discount_per=" + mastDiscPer + ",discount=" + slaveTotDisc
//							+ ",refund_per=" + mastRefPer + ",refund=" + slaveTotRef + " ,paid_amt=" + slaveTotPaid
//							+ " ,paid_per=" + mastPaidPer + " " + " where bill_details_id = " + detailsId;
//				} else {

					sql = "update ehat_bill_details_ipd set discount_per=" + mastDiscPer + ",discount=" + slaveTotDisc
							+ " ,paid_amt=" + slaveTotPaid + " ,paid_per=" + mastPaidPer + " "
							+ " where bill_details_id = " + detailsId;
//				}

				Query recSlaveQuery2 = session.createSQLQuery(sql);
				recSlaveQuery2.executeUpdate();

				int servId = (Integer) row.get("service_id");
				sql = "select ifnull(iscombination,'N') from ehat_service_master where deleted = 'N' and service_id = "
						+ servId;
				Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				String isCombine = (String) billDetailsQuery.uniqueResult();

				if (isCombine.equals("Y")) {

					slavePaidPer = (slaveTotPaid * 100) / slaveTotAmt;
					setIpdPkgMasterSlave(servId, detailsId, session, "r", slavePaidPer, sponsorId,slaveTotDisc,slavePayable);
				}
			}
			return 1;
		}
		
		
		
		//added by vishant
		public int setIpdPkgMasterSlave(int servId, int billDetailsId, Session session, String callFrom,
				double mastPaidPer, int spId,double totalServiceDiscount, double slavePayable2) {

			double mastConsnPer = 0, mastDiscPer = 0, mastRefPer = 0;
			double slaveTotAmt = 0, slaveTotConsn = 0, slavePayable = 0, slaveTotPaid = 0, slaveTotDisc = 0,
					slaveTotRef = 0;

			// Get slave receipt totals
			String sql = "select * from ehat_bill_details_ipd where service_id=" + servId + " and bill_details_id="
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
			sql = "select * from ehat_other_bill_detail_for_ipd where deleted='N' and bill_details_id=" + billDetailsId;
			Query slaveQuery = session.createSQLQuery(sql);
			slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listRecSlave = slaveQuery.list();
			for (Map<String, Object> row : listRecSlave) {

				// int sponsorId=(Integer)row.get("chargesSlave_id");
				int pkgSlaveId = (Integer) row.get("other_bill_details_id_for_ipd");

				if (spId > 0) {

					slaveTotAmt = (Double) row.get("other_amount");
					slaveTotConsn = (Double) row.get("other_concession");

				} else {

					slaveTotAmt = (Double) row.get("amount");
					slaveTotConsn = (Double) row.get("concession");
				}

				
				  slaveTotConsn=(slaveTotAmt*mastConsnPer)/100; 
				  slavePayable=slaveTotAmt -slaveTotConsn; 
				  slaveTotDisc=(slavePayable*mastDiscPer)/100;
				 
				//double totalAmount = slaveTotAmt;
				
				mastDiscPer = (totalServiceDiscount * 100) / slavePayable2;
				
				slaveTotPaid = (slavePayable * mastPaidPer) / 100;
				slaveTotDisc=(slavePayable*mastDiscPer)/100;

				if (spId > 0) {

//					if (callFrom.equals("refund")) {
//
//						sql = "update ehat_other_bill_detail_for_ipd set " + "sponsor_paid_per=" + mastPaidPer
//								+ ",sponsor_paid=" + slaveTotPaid
//								// +",discount_per="+mastDiscPer+",discount="+slaveTotDisc+",refund_per="+mastRefPer+",refund="+slaveTotRef+"
//								// "
////			            				 + " ,paid_other_amt=" + slaveTotPaid + " ,paid_other_per=" + mastPaidPer + " "
//								+ " where other_bill_details_id_for_ipd = " + pkgSlaveId;
//					} else {

						sql = "update ehat_other_bill_detail_for_ipd set concession_per=" + mastConsnPer
								+ ",other_concession=" + slaveTotConsn + ",discount_per=" + mastDiscPer + ",discount="
								+ slaveTotDisc + ",refund_per=" + mastRefPer + ",refund=" + slaveTotRef + " "
								+ " ,paid_other_amt=" + slaveTotPaid + " ,paid_other_per=" + mastPaidPer + " "
								+ " where other_bill_details_id_for_ipd = " + pkgSlaveId;
//					}

				} else {

//					if (callFrom.equals("refund")) {
//
//						sql = "update ehat_other_bill_detail_for_ipd set " + "sponsor_paid_per=" + mastPaidPer
//								+ ",sponsor_paid=" + slaveTotPaid
//								// +",discount_per="+mastDiscPer+",discount="+slaveTotDisc+",refund_per="+mastRefPer+",refund="+slaveTotRef+"
//								// "
////			            				 + " ,paid_other_amt=" + slaveTotPaid + " ,paid_other_per=" + mastPaidPer + " "
//								+ " where other_bill_details_id_for_ipd = " + pkgSlaveId;
//					} else {

						sql = "update ehat_other_bill_detail_for_ipd set concession_per=" + mastConsnPer
								+ ",concession=" + slaveTotConsn + ",discount_per=" + mastDiscPer + ",discount="
								+ slaveTotDisc + ",refund_per=" + mastRefPer + ",refund=" + slaveTotRef + " "
								+ " ,paid_other_amt=" + slaveTotPaid + " ,paid_other_per=" + mastPaidPer + " "
								+ " where other_bill_details_id_for_ipd = " + pkgSlaveId;
//					}

				}

				Query recSlaveQuery2 = session.createSQLQuery(sql);
				recSlaveQuery2.executeUpdate();
			}
			return 1;
		}
		
		
		public int setOpdPkgMasterSlave(int servId,int billDetailsId,Session session,String callFrom,double mastPaidPer,int spId) {
			
			double mastConsnPer=0, mastDiscPer=0, mastRefPer=0;
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
	        		
	        	}else{
	        		
	        		slaveTotAmt=(Double)row.get("amount");
	        	}
	        	            
	        	slaveTotConsn=(slaveTotAmt*mastConsnPer)/100;
	        	slavePayable=slaveTotAmt - slaveTotConsn;
	            slaveTotDisc=(slavePayable*mastDiscPer)/100;
	            
	            slaveTotPaid=(slaveTotAmt*mastPaidPer)/100;
	            slaveTotRef=(slaveTotPaid*mastRefPer)/100;	
	            
	            if(spId > 0){
	            	
	            	 if(callFrom.equals("refund")){
	            		 
	            		 sql="update ehat_other_bill_detail_for_ipd set concession_per="+mastConsnPer+",other_concession="+slaveTotConsn+",discount_per="+mastDiscPer+",discount="+slaveTotDisc+",refund_per="+mastRefPer+",refund="+slaveTotRef+" "
//	            				 + " ,paid_other_amt=" + slaveTotPaid + " ,paid_other_per=" + mastPaidPer + " "
	            				 +" where other_bill_details_id_for_ipd = "+pkgSlaveId;   
	            	 }else{
	            		 
	            		 sql="update ehat_other_bill_detail_for_ipd set concession_per="+mastConsnPer+",other_concession="+slaveTotConsn+",discount_per="+mastDiscPer+",discount="+slaveTotDisc+",refund_per="+mastRefPer+",refund="+slaveTotRef+" "
	            				 + " ,paid_other_amt=" + slaveTotPaid + " ,paid_other_per=" + mastPaidPer + " "
	            				 +" where other_bill_details_id_for_ipd = "+pkgSlaveId;   
	            	 }            	
	            	
	            }else{
	            	
	            	if(callFrom.equals("refund")){
	            		
	            		sql="update ehat_other_bill_detail_for_ipd set concession_per="+mastConsnPer+",concession="+slaveTotConsn+",discount_per="+mastDiscPer+",discount="+slaveTotDisc+",refund_per="+mastRefPer+",refund="+slaveTotRef+" "
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
		
		/*
		 * public int setOpdPkgMasterSlave(int servId,int billDetailsId,Session
		 * session,String callFrom,double mastPaidPer,int spId) {
		 * 
		 * double mastConsnPer=0, mastDiscPer=0, mastRefPer=0; double slaveTotAmt=0,
		 * slaveTotConsn=0, slavePayable=0, slaveTotPaid=0, slaveTotDisc=0,
		 * slaveTotRef=0;
		 * 
		 * //Get slave receipt totals String
		 * sql="select * from ehat_bill_details_ipd where service_id="
		 * +servId+" and bill_details_id="+billDetailsId; Query mastQuery =
		 * session.createSQLQuery(sql);
		 * mastQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		 * 
		 * @SuppressWarnings("unchecked") List<Map<String, Object>> listRecMast =
		 * mastQuery.list(); for(Map<String, Object> row : listRecMast){
		 * 
		 * mastConsnPer=(Double)row.get("concession_per");
		 * mastDiscPer=(Double)row.get("discount_per");
		 * mastRefPer=(Double)row.get("refund_per"); }
		 * 
		 * //Get pkg slave receipt totals
		 * sql="select * from ehat_other_bill_detail_for_ipd where deleted='N' and bill_details_id="
		 * +billDetailsId; Query slaveQuery = session.createSQLQuery(sql);
		 * slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		 * 
		 * @SuppressWarnings("unchecked") List<Map<String, Object>> listRecSlave =
		 * slaveQuery.list(); for(Map<String, Object> row : listRecSlave){
		 * 
		 * //int sponsorId=(Integer)row.get("chargesSlave_id"); int
		 * pkgSlaveId=(Integer)row.get("other_bill_details_id_for_ipd");
		 * 
		 * if(spId > 0){
		 * 
		 * slaveTotAmt=(Double)row.get("other_amount");
		 * 
		 * }else{
		 * 
		 * slaveTotAmt=(Double)row.get("amount"); }
		 * 
		 * slaveTotConsn=(slaveTotAmt*mastConsnPer)/100; slavePayable=slaveTotAmt -
		 * slaveTotConsn; slaveTotDisc=(slavePayable*mastDiscPer)/100;
		 * 
		 * slaveTotPaid=(slaveTotAmt*mastPaidPer)/100;
		 * slaveTotRef=(slaveTotPaid*mastRefPer)/100;
		 * 
		 * if(spId > 0){
		 * 
		 * if(callFrom.equals("refund")){
		 * 
		 * sql="update ehat_other_bill_detail_for_ipd set concession_per="+mastConsnPer+
		 * ",other_concession="+slaveTotConsn+",discount_per="+mastDiscPer+",discount="+
		 * slaveTotDisc+",refund_per="+mastRefPer+",refund="+slaveTotRef+" "
		 * +" where other_bill_details_id_for_ipd = "+pkgSlaveId; }else{
		 * 
		 * sql="update ehat_other_bill_detail_for_ipd set concession_per="+mastConsnPer+
		 * ",other_concession="+slaveTotConsn+",discount_per="+mastDiscPer+",discount="+
		 * slaveTotDisc+",refund_per="+mastRefPer+",refund="+slaveTotRef+" "
		 * +" where other_bill_details_id_for_ipd = "+pkgSlaveId; }
		 * 
		 * }else{
		 * 
		 * if(callFrom.equals("refund")){
		 * 
		 * sql="update ehat_other_bill_detail_for_ipd set concession_per="+mastConsnPer+
		 * ",concession="+slaveTotConsn+",discount_per="+mastDiscPer+",discount="+
		 * slaveTotDisc+",refund_per="+mastRefPer+",refund="+slaveTotRef+" "
		 * +" where other_bill_details_id_for_ipd = "+pkgSlaveId; }else{
		 * 
		 * sql="update ehat_other_bill_detail_for_ipd set concession_per="+mastConsnPer+
		 * ",concession="+slaveTotConsn+",discount_per="+mastDiscPer+",discount="+
		 * slaveTotDisc+",refund_per="+mastRefPer+",refund="+slaveTotRef+" "
		 * +" where other_bill_details_id_for_ipd = "+pkgSlaveId; }
		 * 
		 * }
		 * 
		 * Query recSlaveQuery2 = session.createSQLQuery(sql);
		 * recSlaveQuery2.executeUpdate(); } return 1; }
		 */
		
		@Override
		public List<IpdBillDiscount> fetchIpdbillTreatDiscount(int treatId) {

			List<IpdBillDiscount> lstIpdBill = new ArrayList<IpdBillDiscount>();

			try {

				String sql1 = "SELECT r.bill_discount_id,r.patient_id,r.treatment_id,r.total_amt,r.total_discount,r.approved_status,r.disc_remark,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,r.approved_amt from" +
						" ehat_ipdbill_discount r join ehat_patient p ON (r.patient_id = p.patient_id) where r.deleted='N' and r.treatment_id="+treatId;

				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

				@SuppressWarnings("unchecked")
				List<Map<String, Object>> data1 = query1.list();

				for (Map<String, Object> row : data1) {

					IpdBillDiscount objIpdbill = new IpdBillDiscount();
					objIpdbill.setBillDiscountId((Integer) row.get("bill_discount_id"));
					objIpdbill.setPatientId((Integer) row.get("patient_id"));
					objIpdbill.setTreatmentId((Integer) row.get("treatment_id"));
					objIpdbill.setDiscNarrtn((String) row.get("patient_name")); // for patient name
					objIpdbill.setTotalAmt((Double) row.get("total_amt"));
					objIpdbill.setTotalDisc((Double) row.get("total_discount"));
					objIpdbill.setApprovedStat((String) row.get("approved_status"));
					objIpdbill.setApprovedAmt((Double) row.get("approved_amt"));
					objIpdbill.setApprovedRemark((String) row.get("disc_remark"));
					objIpdbill.setCenterPatientId((String) row.get("center_patient_id"));
					lstIpdBill.add(objIpdbill);
					objIpdbill = null;
				}

			} catch (Exception e) {

				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
			}

			return lstIpdBill;
		}
		
		
		@Override
		public IpdBillReceiptMasterDTO fetchPrevPendingIpd(IpdBillReceiptMasterDTO obj,String callFrom) {
			
			IpdBillReceiptMasterDTO masterObj=new IpdBillReceiptMasterDTO();
			List<IpdBillReceiptMasterDTO> lstBillMaster=new ArrayList<IpdBillReceiptMasterDTO>();
			try {			
				
				RegistrationController regCon=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
	            RegTreBillDto rtd = new RegTreBillDto();     
	            int patId=0;
	            int sprId=0;
	            int billId=0;
	            int treatId=0;
	            if(regCon != null){
	               
	            	rtd=regCon.fetchPatientsRecordByTreatmentId(obj.getTreatmentId());
	                rtd=rtd.getListRegTreBillDto().get(0);
	                rtd.getPatientName();
	                patId=rtd.getPatientId();
	                sprId=rtd.getSourceTypeId();
	                billId=rtd.getInvoiceCount();
	                treatId=rtd.getTreatmentId();     
	                obj.setSponsorCatId(rtd.getSourceTypeId()); 
	            }            
	            
	            String sqlRef="select ifnull(count(treatment_id),0) from ehat_treatment where deleted='N' and patient_id="+patId+" and treatment_id <>"+treatId;
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
				int count = ((Number)refQuery.uniqueResult()).intValue();
				String trOpdIds="";   
				String trIpdIds="";   
				double totPending=0;
				double totRemain=0;
				double totalCon=0;
				
				if(count > 0){
					
					//sqlRef="select GROUP_CONCAT(treatment_id SEPARATOR ',') from ehat_treatment where deleted='N' and patient_id="+patId;
					sqlRef="select treatment_id,department_id from ehat_treatment where deleted='N' and t_flag='N' and patient_id="+patId+" and treatment_id <>"+treatId;
					//trIds = ((Number) refQuery.uniqueResult()).intValue();
					Query billQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
					billQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")			
					List<Map<String, Object>> listBill = billQuery.list();
					for(Map<String, Object> row : listBill){
						
						int depId= (Integer)row.get("department_id");
						if(depId==2){
							
							trIpdIds=trIpdIds+(Integer)row.get("treatment_id")+",";		
						}else{
							
							trOpdIds=trOpdIds+(Integer)row.get("treatment_id")+",";	
						}
									
					}
					if(trOpdIds.length()>0){
						
						trOpdIds=trOpdIds.substring(0, (trOpdIds.length()-1));
					}
					
					if(trIpdIds.length()>0){
						
						trIpdIds=trIpdIds.substring(0, (trIpdIds.length()-1));
					}
					//trIpdIds=trIpdIds.substring(0, (trIpdIds.length()-1));
					
					if(trOpdIds.length()>0){			
					
						if(callFrom.equals("onload")){
							
							sqlRef="select ifnull(sum(total_remain), 0) from ehat_receipt_master where deleted = 'N' and patient_id = "+patId+" and treatment_id in ("+trOpdIds+") and total_remain > 0 and against_id=0 and source_type_id=0";
							Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);					
							totPending = (Double) billDetailsQuery.uniqueResult();
							
							//masterObj.setTotalRemain(totPending);
						}else{			
						
							sqlRef="select * from ehat_receipt_master where deleted = 'N' and patient_id = "+patId+" and treatment_id in ("+trOpdIds+") and total_remain > 0 and against_id=0 and source_type_id=0";
							Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
							billDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							@SuppressWarnings("unchecked")			
							List<Map<String, Object>> listBillDetails = billDetailsQuery.list();
							for(Map<String, Object> row : listBillDetails){
								
								IpdBillReceiptMasterDTO objData=new IpdBillReceiptMasterDTO();
								objData.setTreatmentId((Integer)row.get("treatment_id"));		
								objData.setBillReceiptId((Integer)row.get("bill_receipt_id"));		
								objData.setActualAmt((Double)row.get("actual_amt"));		
								objData.setTotalPaid((Double)row.get("total_paid"));
								objData.setTotalDisc((Double)row.get("total_discount"));
								objData.setTotalRemain((Double)row.get("total_remain"));
								objData.setCreatedDateTime((java.util.Date)row.get("created_date_time"));
								lstBillMaster.add(objData);
								objData=null;
							}							
							masterObj.setListBillReceiptMaster(lstBillMaster);
						}					
					}
					if(trIpdIds.length()>0){
												
						if(callFrom.equals("onload") || callFrom.equals("onclick")){
												
							// Update amount in bill master start
							double totalAmt=0;
							double totPaid=0;
							//double totRemain=0;
							double totRefund=0;
							double totDisc=0;
							
							String sqlBill="";
														
							sqlBill="select ifnull(bill_id,0) as billId FROM ehat_bill_master where deleted='N' and charges_master_slave_id=0 and treatment_id in ("+trIpdIds+")";
							Query billIdQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlBill);	
							billId=((Number) billIdQuery.uniqueResult()).intValue();
							
							sqlBill="select ifnull(treatment_id,0) as trId FROM ehat_bill_master where deleted='N' and charges_master_slave_id=0 and treatment_id in ("+trIpdIds+")";
							Query treatIdQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlBill);	
							int trId=((Number) treatIdQuery.uniqueResult()).intValue();
														
							sqlBill="select ifnull(sum(amount),0) as totAmt FROM ehat_bill_details_ipd where deleted='N' and charges_slave_id=0 and treatment_id in ("+trIpdIds+") and cancle='N' ";
							Query billQueryIpd = sessionFactory.getCurrentSession().createSQLQuery(sqlBill);		
							totalAmt = (Double) billQueryIpd.uniqueResult();
							
							sqlBill="select ifnull(sum(concession),0) as totAmt FROM ehat_bill_details_ipd where deleted='N' and charges_slave_id=0 and treatment_id in ("+trIpdIds+") and cancle='N' ";
							Query conQueryIpd = sessionFactory.getCurrentSession().createSQLQuery(sqlBill);		
							totalCon = (Double) conQueryIpd.uniqueResult();
							
							String sql="select ifnull(sum(total_paid),0) from ehat_receipt_master_ipd where deleted='N' and source_type_id=0 and treatment_id in ("+trIpdIds+") ";
							Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
							totPaid = (Double) recQuery.uniqueResult();
							
							String sql2="select ifnull(sum(total_paid),0) from ehat_refund_master_ipd where deleted='N' and source_type_id=0 and treatment_id in ("+trIpdIds+") ";
							Query refQueryIpd = sessionFactory.getCurrentSession().createSQLQuery(sql2);		
							totRefund = (Double) refQueryIpd.uniqueResult(); 
							
							String discSql="select ifnull(sum(approved_amt),0) from ehat_ipdbill_discount where deleted='N' and source_type_id=0 and treatment_id in ("+trIpdIds+") ";
							Query discQueryIpd = sessionFactory.getCurrentSession().createSQLQuery(discSql);		
							totDisc = (Double) discQueryIpd.uniqueResult(); 
							
							totRemain=totalAmt - (totPaid + totDisc + totalCon);
							
							IpdBillReceiptMasterDTO objData=new IpdBillReceiptMasterDTO();
							objData.setTreatmentId(trId);		
							objData.setBillId(billId);		
							objData.setBillReceiptId(billId);
							objData.setDepartmentId(2);
							objData.setActualAmt(totalAmt);		
							objData.setTotalPaid(totPaid);
							objData.setTotalDisc(totDisc);
							objData.setTotalRemain(totRemain);
							objData.setCreatedDateTime(new Date());
							lstBillMaster.add(objData);
							objData=null;
							//masterObj.setTotalRemain(totRemain);
							masterObj.setListBillReceiptMaster(lstBillMaster);
						}
					}	
					
					totPending=totPending + totRemain;
					masterObj.setTotalRemain(totPending);
				}				
				
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
		public IpdBillReceiptMasterDTO fetchSurgonList(
				IpdBillReceiptMasterDTO obj, String callFrom) {
			
			IpdBillReceiptMasterDTO objBill=new IpdBillReceiptMasterDTO();
			List<IpdBillReceiptMasterDTO> lstBill=new ArrayList<IpdBillReceiptMasterDTO>();
			
			String sqlBill="select ifnull(count(childsubservice_id),0) as subserviceId FROM ehat_otpercentageconfiguration where confugration_flag='N' and percentage=100";
			Query surgonQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlBill);	
			int subServCount = ((Number) surgonQuery.uniqueResult()).intValue();
			
			if(subServCount>0){
				
				sqlBill="select ifnull(childsubservice_id,0) as subserviceId FROM ehat_otpercentageconfiguration where confugration_flag='N' and percentage=100 limit 1";
				Query billIdQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlBill);	
				int subServId = ((Number) billIdQuery.uniqueResult()).intValue();
				
				sqlBill="select ifnull(charges_master_slave_id,0) as sponsorId FROM ehat_bill_master where treatment_id="+obj.getTreatmentId();
				Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlBill);	
				int sponsrId = ((Number) spQuery.uniqueResult()).intValue();
				
				//String sqlRef="select * from ehat_bill_details_ipd where sub_service_id= "+subServId+" and treatment_id = "+obj.getTreatmentId()+" and deleted = 'N' and cancle = 'N' and ot_flag = 'Y' and drdesk_flag = 'C' ";
				String sqlRef="select * from ehat_bill_details_ipd where sub_service_id= "+subServId+" and treatment_id = "+obj.getTreatmentId()+" and deleted = 'N' and cancle = 'N' and ot_flag = 'Y' ";
				Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
				billDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")			
				List<Map<String, Object>> listBillDetails = billDetailsQuery.list();
				for(Map<String, Object> row : listBillDetails){
					
					IpdBillReceiptMasterDTO objData=new IpdBillReceiptMasterDTO();
					objData.setTreatmentId(obj.getTreatmentId());
					
					int docId=(Integer)row.get("doctor_id");
					if(sponsrId > 0){
						
						objData.setTotalAmt((Double)row.get("other_amount"));
					}else{
						
						objData.setTotalAmt((Double)row.get("amount"));
					}
					
					objData.setDoctorIds(String.valueOf(docId));	
					
					String sql="select ifnull((doc_name),'') from doctor where status='Y' and Doctor_ID = "+docId+" ";
					Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
					String docName = (String) recQuery.uniqueResult();
					
					objData.setbName(docName);
					lstBill.add(objData);					
					objData=null;
				}				
				
			}else{
				
				
			}			
			objBill.setListBillReceiptMaster(lstBill);
			return objBill;			
		}

		@Override
		public int saveDoctorDiscount(IpdBillDiscount ipdBillDiscount) {
			
			try {
			  ipdBillDiscount.setCreatedDateTime(new Date());
			  ipdBillDiscount.setDiscFlag("S");
			  sessionFactory.getCurrentSession().merge(ipdBillDiscount);		
			  
			  //setBillMasterTotals(ipdBillDiscount.getTreatmentId(), ipdBillDiscount.getTotalDisc(), "disc",sessionFactory.getCurrentSession());
			  
			  //distributeDiscPaidBySlave(ipdBillDiscount);
			  //setMultiSponsorTotalsForIpd(ipdBillDiscount.getTreatmentId());
			  
			  return 1;
			  
	        } catch (Exception e) {
	                 	 
	        	e.printStackTrace();
	        	System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
	        	return 0;
	        }
		}

		/*@Override
		public int saveQuotationsNew(String serviceDetails, String queryType,
				Integer userId, int unitId,String callfrom) {
			// TODO Auto-generated method stub NewBillQuotation
			try {
				
				
					NewBillQuotation newBillQuotation = (NewBillQuotation) ConfigUIJSONUtility
							.getObjectFromJSON(serviceDetails, NewBillQuotation.class);
					System.err.println(newBillQuotation.getServiceName());
					
					NewBillQuotation li = newBillQuotation.getListBillDetailsQuotation().get(0);
					int cnt=0;
					cnt=li.getQuotationCount();
					int ssi=li.getSubServiceId();
					int subSid=0;
					int quoId=0;
					int qtyy=0;
					
					String sql1 = "SELECT sub_service_id,quotation_id,quantity FROM ehat_NewBillQuotation where sub_service_id='"+ssi+"' and quotation_count='"+cnt+"'";			
					SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);	        
					query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					System.err.println("list size"+query1.list().size());
			        List<Map<String, Object>> data1 = query1.list();
			        
					for(Map<String, Object> row : data1){
						
						subSid=(Integer)row.get("sub_service_id");
						quoId=(Integer)row.get("quotation_id");	
						qtyy=(Integer)row.get("quantity");	
						
					}
			        		  System.err.println("ssi=="+ssi); 
			        		  System.err.println("subSid=="+subSid); 
			        if(ssi == subSid){
			        	double rate=li.getRate();
			        	int qty=li.getQuantity();
			        		qty=qtyy+qty;
			        	double amt=rate * qty;
			        	
			        	 String sql2 = "UPDATE ehat_NewBillQuotation SET rate = '"+rate+"',quantity = '"+qty+"',amount = '"+amt+"' WHERE quotation_id = '"+quoId+"'";
							
							SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
					         query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
					         query2.executeUpdate();
			        	
			        }else{					
					
					
					li.setDeleted("N");
					li.setCreatedDateTime(new java.util.Date());
					li.setCreatedBy(userId);
					li.setUnitId(unitId);
					
					sessionFactory.getCurrentSession().merge(li);
			        }
					return 1;
			 } catch (Exception e) {
             	 
		        	e.printStackTrace();
		        	System.err.println("ehatException:- Class Name :"
							+ e.getStackTrace()[0].getClassName() + " Method Name : "
							+ e.getStackTrace()[0].getMethodName() + " Line No :"
							+ e.getStackTrace()[0].getLineNumber());
		        	return 0;
		     }
		}*/
// save service for comparison and new quotion given from OPD
		@Override
		public int saveQuotationsNew(String serviceDetails, String queryType,
				Integer userId, int unitId,String callfrom,Double adminChargesPer) {
			// TODO Auto-generated method stub NewBillQuotation
			try {
				
				
					/*NewBillQuotation newBillQuotation = (NewBillQuotation) ConfigUIJSONUtility
							.getObjectFromJSON(serviceDetails, NewBillQuotation.class);*/
					 BillQuotationDto billQuotation = (BillQuotationDto) ConfigUIJSONUtility
							 .getObjectFromJSON(serviceDetails, BillQuotationDto.class);
				
					//System.err.println(billQuotation.getServiceName());
					
					//NewBillQuotation li = newBillQuotation.getListBillDetailsQuotation().get(0);
					BillQuotationDto li = billQuotation.getListBillDetailsQuotation().get(0);
					int pId=li.getPatientId();
					int cnt=0;
				//	cnt=li.getQuotationCount();
					cnt=li.getCount();
					int ssi=li.getSubServiceId();
					int subSid=0;
					int quoId=0;
					int qtyy=0;
					
					
					int estiCount=0;
			         
			        
		        	  String sql11 = "SELECT count(patient_id) FROM ehat_billquotation where patient_id="+pId+" ";					
						SQLQuery query11 = sessionFactory.getCurrentSession().createSQLQuery(sql11);
				        
				        int estimateCount=((Number)query11.uniqueResult()).intValue();
		        	  System.err.println("-=-=estimateCount-=-"+estimateCount);
		        	 
			         //query1.executeUpdate();  
		        	  if(estimateCount == 0){
		        		  String sql4 = "SELECT ifnull(max(estimate_no),0) FROM ehat_billquotation";				
		  				SQLQuery query4 = sessionFactory.getCurrentSession().createSQLQuery(sql4);		        
		  		        int estimateC=((Number)query4.uniqueResult()).intValue();	      
		  		        estiCount = estimateC +1;
		  		      System.err.println("-=-=Iffffff-=-"+estiCount);
		        	  }else{

		  				String sql3 = "SELECT ifnull(max(estimate_no),0) FROM ehat_billquotation where patient_id="+pId+" ";				
		  				SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);		        
		  		        int cntttt=((Number)query3.uniqueResult()).intValue();	      
		  	        	  
		        		  estiCount=cntttt;
		        		  System.err.println("-=-=Elllseee-=-"+estiCount);
		        	  }		         
		        	 
		        	 
					
					
					
					//String sql1 = "SELECT sub_service_id,quotation_id,quantity FROM ehat_NewBillQuotation where sub_service_id='"+ssi+"' and quotation_count='"+cnt+"'";			
					String sql1 = "SELECT sub_service_id,quotation_id,quantity FROM ehat_billquotation where sub_service_id='"+ssi+"' and patient_id='"+pId+"'";
					
					SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);	        
					query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					System.err.println("list size"+query1.list().size());
			        List<Map<String, Object>> data1 = query1.list();
			        
					for(Map<String, Object> row : data1){
						
						subSid=(Integer)row.get("sub_service_id");
						quoId=(Integer)row.get("quotation_id");	
						qtyy=((Number)row.get("quantity")).intValue();	
						
					}
			        		  System.err.println("ssi=="+ssi); 
			        		  System.err.println("subSid=="+subSid); 
			        if(ssi == subSid){
			        	double rate=li.getRate();
			        	//int qty=li.getQuantity();
			        	int qty=(int) li.getQuantity();
			        	qty=qtyy+qty;
			        	double amt=rate * qty;
			        	
			        	 /*String sql2 = "UPDATE ehat_NewBillQuotation SET rate = '"+rate+"',quantity = '"+qty+"',amount = '"+amt+"' WHERE quotation_id = '"+quoId+"'";*/
			        	 String sql2 = "UPDATE ehat_billquotation SET rate = '"+rate+"',quantity = '"+qty+"',amount = '"+amt+"' WHERE quotation_id = '"+quoId+"'";
			        	 
							SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
					         query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
					         query2.executeUpdate();
			        	
			        }else{					
					
					
					li.setDeleted("N");
					li.setCreatedDateTime(new java.util.Date());
					li.setCreatedBy(userId);
					li.setUnitId(unitId);
					li.setEstimateNo(estiCount);
					
					/* String sql21 = "UPDATE ehat_billquotation SET estimate_no = "+estiCount+" WHERE patient_id="+pId+" ";
						
						SQLQuery query21 = sessionFactory.getCurrentSession().createSQLQuery(sql21);
				         query21.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
				         query21.executeUpdate();*/
					
					sessionFactory.getCurrentSession().merge(li);
			        }
			        updateAdminChargesForQuotation(pId,adminChargesPer);
					return 1;
			 } catch (Exception e) {
             	 
		        	e.printStackTrace();
		        	System.err.println("ehatException:- Class Name :"
							+ e.getStackTrace()[0].getClassName() + " Method Name : "
							+ e.getStackTrace()[0].getMethodName() + " Line No :"
							+ e.getStackTrace()[0].getLineNumber());
		        	return 0;
		     }
		}
		
		
		
		
		
		public void updateAdminChargesForQuotation(Integer pId,Double adminChargesPer) {
			try {
				int admSid=15;
				//double admPer=10;
				int subSid=0;
				int quoId=0;
				int qtyy=0;
				double totAmt=0;
				int qty=1;
				
				String sql11 = "SELECT count(service_id) FROM ehat_billquotation where patient_id="+pId+" and service_id="+admSid+" ";					
				SQLQuery query11 = sessionFactory.getCurrentSession().createSQLQuery(sql11);
		        
		        int servIdCnt=((Number)query11.uniqueResult()).intValue();
        	  System.err.println("-=-=servIdCnt-=-"+servIdCnt);
				
				if(servIdCnt > 0){
					
					
					String sql1 = "SELECT ifnull(sum(amount),0) as totAmt FROM ehat_billquotation where patient_id="+pId+" and service_id !="+admSid+" and deleted='N' ";
					Query billQueryIpd = sessionFactory.getCurrentSession().createSQLQuery(sql1);	
					System.err.println("be4parse=="+billQueryIpd.uniqueResult());
					totAmt = (Double) billQueryIpd.uniqueResult();
					
	        	  System.err.println("-=-=amt-=-"+totAmt);
	        	  
	        	  Double per=(double) ((totAmt/100)* adminChargesPer);
	        	  System.err.println("-=-=per  vper-=-"+per);
	        	  
	        	  String sql2 = "UPDATE ehat_billquotation SET rate = '"+per+"',quantity = '"+qty+"',amount = '"+per+"' WHERE patient_id="+pId+" and service_id = '"+admSid+"'";
		        	 
					SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
			         query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
			         query2.executeUpdate();
	        	  
				}
				
			} catch (Exception e) {
             	 
		        	e.printStackTrace();
		        	System.err.println("ehatException:- Class Name :"
							+ e.getStackTrace()[0].getClassName() + " Method Name : "
							+ e.getStackTrace()[0].getMethodName() + " Line No :"
							+ e.getStackTrace()[0].getLineNumber());
		        	
		     }
		}
		
		
		
		/*@Override
		public List<NewBillQuotation> getServiceDetails(Integer count,String callfrom,
				HttpServletRequest request) {
			List<NewBillQuotation> ltPatientRecord = new ArrayList<NewBillQuotation>();
			
			try {
				
					if(callfrom.equalsIgnoreCase("quotaionList")){
						
						 String sql = "SELECT quotation_count,quotation_name FROM ehat_NewBillQuotation where quotation_count > 0 group by quotation_count";
				         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				         List<Map<String, Object>> data = query.list();
				       
				         for(Map<String, Object> row : data){
				        	 
				        	 NewBillQuotation objDTO= new NewBillQuotation();				    
				        			        	
				        	 objDTO.setQuotationName((String)row.get("quotation_name"));				        		        	 
				        	 objDTO.setQuotationCount((Integer)row.get("quotation_count"));
				        	
				        	 ltPatientRecord.add(objDTO);
				        	 objDTO=null;
				         }
					}else{
						
				 String sql = "SELECT *,count(service_id) as qty,sum(amount) as amt FROM ehat_NewBillQuotation where quotation_count = '"+count+"' group by service_id";
		         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         List<Map<String, Object>> data = query.list();
		       
		         for(Map<String, Object> row : data){
		        	 
		        	 NewBillQuotation objDTO= new NewBillQuotation();
		        	 objDTO.setServiceId((Integer)row.get("service_id"));
		        	 objDTO.setSubServiceId((Integer)row.get("sub_service_id"));
		        	 objDTO.setQuotationId((Integer)row.get("quotation_id"));		        	
		        	 objDTO.setServiceName((String)row.get("service_name"));
		        	 objDTO.setAmount((Double)row.get("amt"));  
		        	 objDTO.setQty((BigInteger)row.get("qty"));		        	 
		        	 objDTO.setQuotationCount((Integer)row.get("quotation_count"));
		        	
		        	 ltPatientRecord.add(objDTO);
		        	 objDTO=null;
		         }
				}
		         
			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
				//return ltPatientRecord;
			}
			return ltPatientRecord;
		}*/
		
		//change this method for new changes of bill quotaions
		@Override
		public List<NewBillQuotation> getServiceDetails(Integer count,String callfrom,Integer patientId,
				HttpServletRequest request) {
			List<NewBillQuotation> ltPatientRecord = new ArrayList<NewBillQuotation>();
			
			try {
				
					if(callfrom.equalsIgnoreCase("quotaionList")){
						
						 String sql = "SELECT count,quotation_name FROM ehat_billquotation where count > 0 and patient_id = '"+patientId+"' group by count";
				         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				         List<Map<String, Object>> data = query.list();
				       
				         for(Map<String, Object> row : data){
				        	 
				        	 NewBillQuotation objDTO= new NewBillQuotation();				    
				        			        	
				        	 objDTO.setQuotationName((String)row.get("quotation_name"));				        		        	 
				        	 objDTO.setQuotationCount((Integer)row.get("count"));
				        	
				        	 ltPatientRecord.add(objDTO);
				        	 objDTO=null;
				         }
					}else{
						 String sql = "";
						if(count > 0){
							  sql = "SELECT *,count(service_id) as qty,sum(amount) as amt,rate as rete FROM ehat_billquotation where patient_id = '"+patientId+"' and count = '"+count+"' group by service_id";
						}else{
							  sql = "SELECT *,count(service_id) as qty,sum(amount) as amt,rate as rete FROM ehat_billquotation where patient_id = '"+patientId+"' group by service_id";
						}
				
		         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         List<Map<String, Object>> data = query.list();
		       
		         for(Map<String, Object> row : data){
		        	 
		        	 NewBillQuotation objDTO= new NewBillQuotation();
		        	 objDTO.setPatientId((Integer)row.get("patient_id"));
		        	 objDTO.setServiceId((Integer)row.get("service_id"));
		        	 objDTO.setSubServiceId((Integer)row.get("sub_service_id"));
		        	 objDTO.setQuotationId((Integer)row.get("quotation_id"));		        	
		        	 objDTO.setServiceName((String)row.get("service_name"));
		        	 objDTO.setRate((Double)row.get("rate")); 
		        	 objDTO.setAmount((Double)row.get("amt"));  
		        	 objDTO.setQty((BigInteger)row.get("qty"));		        	 
		        	 objDTO.setQuotationCount((Integer)row.get("count"));
		        	
		        	 ltPatientRecord.add(objDTO);
		        	 objDTO=null;
		         }
				}
		         
			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
				//return ltPatientRecord;
			}
			return ltPatientRecord;
		}

		@Override
		public List<NewBillQuotation> getSubServiceDetails(Integer count,
				Integer serviceId,Integer patientId, HttpServletRequest request) {
			List<NewBillQuotation> ltPatientRecord = new ArrayList<NewBillQuotation>();
			try {
				String sql="";
				if(count > 0){
					  sql = "SELECT * FROM ehat_billquotation where patient_id = '"+patientId+"' and count = '"+count+"' and service_id = '"+serviceId+"'";
				}else{
					  sql = "SELECT * FROM ehat_billquotation where patient_id = '"+patientId+"' and service_id = '"+serviceId+"'";
				}
				 //String sql = "SELECT * FROM ehat_billquotation where patient_id = '"+count+"' and service_id = '"+serviceId+"'";
		         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         List<Map<String, Object>> data = query.list();
		         
		         
	        	 
		         for(Map<String, Object> row : data){
		        	 
		        	 NewBillQuotation objDTO= new NewBillQuotation();
		        	 objDTO.setPatientId((Integer)row.get("patient_id"));
		        	 objDTO.setServiceId((Integer)row.get("service_id"));
		        	 objDTO.setSubServiceId((Integer)row.get("sub_service_id"));
		        	 objDTO.setQuotationId((Integer)row.get("quotation_id"));		        	
		        	 objDTO.setServiceName((String)row.get("service_name"));
		        	 objDTO.setSubServiceName((String)row.get("sub_service_name"));
		        	 objDTO.setRate((Double)row.get("rate"));
		        	 objDTO.setAmount((Double)row.get("amount"));  
		        	 objDTO.setQuantity(((Double)row.get("quantity")).intValue());		        	 
		        	 objDTO.setQuotationCount((Integer)row.get("count"));
		        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));
		        	 
		        	
		        	 ltPatientRecord.add(objDTO);
		        	 objDTO=null;
		         }
		         
		         
			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
				//return ltPatientRecord;
			}
			return ltPatientRecord;
		}

		/*@Override
		public int saveAndDeleteQuotaion(String quotationName,
				String quotationId, Integer userId, int unitId,String callfrom) {
			try{
				int a=0;
			if(callfrom.equalsIgnoreCase("save")){
			int cntt=0;
			
			String sql1 = "SELECT ifnull(max(quotation_count),0) FROM ehat_NewBillQuotation";			
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);	        
	        int cnt=((Number)query1.uniqueResult()).intValue();	      
        	  cntt = cnt +1;
        	  
        	  String sql2 = "UPDATE ehat_NewBillQuotation SET quotation_count = '"+cntt+"',quotation_name = '"+quotationName+"' WHERE quotation_count = 0";
				
				SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
		         query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
		         query2.executeUpdate();
		         a= 1;
			}else if(callfrom.equalsIgnoreCase("clear")){
				
				String sql1 = "DELETE FROM ehat_NewBillQuotation WHERE quotation_count = 0 and quotation_name = '-'";
				
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
		         query1.executeUpdate();
		         a= 2;
			}
			return a;
		}catch(Exception e){
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return 0;
		}
	}*/		
	// new changes for quotaion count update and save
		@Override
		public int saveAndDeleteQuotaion(String quotationName,
				String quotationId, Integer userId, int unitId,String callfrom,Integer patientId) {
			try{
				int a=0;
			if(callfrom.equalsIgnoreCase("save")){
			int cntt=0;
			
			String sql1 = "SELECT ifnull(max(count),0) FROM ehat_billquotation";			
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);	        
	        int cnt=((Number)query1.uniqueResult()).intValue();	      
        	  cntt = cnt +1;
        	  
        	  String sql2 = "UPDATE ehat_billquotation SET count = '"+cntt+"',quotation_name = '"+quotationName+"' WHERE count = 0";
				
				SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
		         query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
		         query2.executeUpdate();
		         
		         a= 1;
			}else if(callfrom.equalsIgnoreCase("clear")){
				
				String sql1 = "DELETE FROM ehat_billquotation WHERE count = 0 and quotation_name = '-'";
				
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
		         query1.executeUpdate();
		         a= 2;
			}
			return a;
		}catch(Exception e){
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return 0;
		}
	}

// added by kishor for distribute spon amount
		@Override
		public int distributePpnAmount(DistributionPojo obj,
				Integer userId, int unitId) {		
			
			try{
				//DecimalFormat df = new DecimalFormat("0.00");
			int treatId=obj.getTreatmentId();
			int pId=obj.getPatientId();
			Double totalAmt=obj.getTotalAmt();
			Double distRate=obj.getDistRate();
			Double actualRate=0.0;
			//Double actualPay=0.0;
			Double NewPay=0.0;
			Double NewCon=0.0;
			Integer chargesSlaveId=obj.getChargesSlaveId();
			
			
			String sql1= "select sum(other_amount) from ehat_bill_details_ipd where treatment_id="+treatId+" and patient_id="+pId+" and cancle ='N' and deleted = 'N'";
	        Query query= sessionFactory.getCurrentSession().createSQLQuery(sql1);	        
	        Double distRateFromDb = ((Number)query.uniqueResult()).doubleValue();
			
			System.err.println("=-=-=-=-=-"+distRateFromDb);
			
			
			Double perTotal=((distRate * 100)/distRateFromDb);
			
			
			String sql="select * from ehat_bill_details_ipd where treatment_id="+treatId+" and patient_id="+pId+" and cancle ='N' and deleted = 'N'";
            Query slaveQuery =  sessionFactory.getCurrentSession().createSQLQuery(sql);
            slaveQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> listRecSlave = slaveQuery.list();
            for(Map<String, Object> row : listRecSlave){
                           	
            	
            	actualRate=(Double)row.get("other_rate");
            	Double toSetPrevRate=(Double)row.get("other_rate");
            	//NewPay=(Double)row.get("other_pay");                
                            
            	//Double otherPay=(Double)row.get("other_pay"); 
            	Double otherConcession=(Double)row.get("other_concession"); 
            	Integer billDetailsId=(Integer)row.get("bill_details_id");  
            	Double qty=(Double)row.get("quantity");
               
                NewPay=(actualRate*perTotal)/100;
                //df.format(NewPay);
                NewCon=(otherConcession*perTotal)/100;
                Double finalAmt=(NewPay*qty);
                Double finalPay=((NewPay*qty)-NewCon);
                           
                sql="update ehat_bill_details_ipd set prev_amt ="+toSetPrevRate+",other_rate ="+NewPay+",other_concession ="+NewCon+",other_amount="+finalAmt+", other_pay ="+finalPay+" where bill_details_id = "+billDetailsId;   
                    Query recSlaveQuery2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
                    recSlaveQuery2.executeUpdate();   
                    
                    
            }
			
            return 1;
			
					
		}catch(Exception e){
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return 0;
		}
	}
		
		
		@Override
		public IpdBillPatientsDTO2 getIpdbillPatientsFilter(String general,Integer wardType,Integer hallTypeSelectId,
				String ward,Integer unitId, Integer userId1, String userType) {
			List<IpdBillPatientsDTO2> ltIpdbillPatients = null;
			List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
			IpdBillPatientsDTO2 obj=new IpdBillPatientsDTO2();
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(IpdBillPatientsDTO2.class);
				System.out.println(ward);
				if(ward.equals("wardwise"))    // ward type
				{
					//criteria.add(Restrictions.eq("hallID", hallTypeSelectId));
					criteria.add(Restrictions.eq("idhallType", wardType));
					criteria.add(Restrictions.eq("deleted", "N"));
					if (general.equalsIgnoreCase("general")) {
						criteria.add(Restrictions.eq("invoiceFlag", "Y"));
					} else if (general.equalsIgnoreCase("ipd")) {

					} else {
						criteria.add(Restrictions.eq("invoiceFlag", "N"));
					}
					if (unitId > 0) {// get unit wise patients
						criteria.add(Restrictions.eq("unitId", unitId));
					}
					
					criteria.addOrder(Order.desc("invoiceCount"));
					ltIpdbillPatients = criteria.list();
					Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
			  		ltDoctorDto=criteria2.list();
					
			  		//obj.setListRegTreBillDto(ltPatientRecord);
			  		obj.setLstIpdbillPatients(ltIpdbillPatients);
					obj.setLstDoctorDto(ltDoctorDto);
					
					
				}
				else			// hall wise
				{
					criteria.add(Restrictions.eq("hallID", hallTypeSelectId));
					criteria.add(Restrictions.eq("idhallType", wardType));
					criteria.add(Restrictions.eq("deleted", "N"));
					if (general.equalsIgnoreCase("general")) {
						criteria.add(Restrictions.eq("invoiceFlag", "Y"));
					} else if (general.equalsIgnoreCase("ipd")) {

					} else {
						criteria.add(Restrictions.eq("invoiceFlag", "N"));
					}
					if (unitId > 0) {// get unit wise patients
						criteria.add(Restrictions.eq("unitId", unitId));
					}
					criteria.addOrder(Order.desc("pId"));
					ltIpdbillPatients = criteria.list();
					Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
			  		ltDoctorDto=criteria2.list();
					
			  		//obj.setListRegTreBillDto(ltPatientRecord);
			  		
			  		obj.setLstIpdbillPatients(ltIpdbillPatients);
					obj.setLstDoctorDto(ltDoctorDto);
					
				}
			

			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException -: Class Name :"+
	                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
	                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
				return obj;
			}
			return obj;
		}

		@Override
		public boolean chkTimeEmrgyOrNot() {
			//private DateFormat sdf = new SimpleDateFormat("HH");
			boolean emergencyFlag = false;
			try{
			DateFormat sdf = new SimpleDateFormat("HH"); 
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			SimpleDateFormat formatter1 = new SimpleDateFormat("HH:mm:ss");
			String todays_time = formatter1.format(currentDate.getTime());
			
			DateFormat sdf2 = new SimpleDateFormat("mm"); 
			
			
			int fromTime = 0;
			int toTime = 0;
			

			String sql = "select emergencyAdmissionFromTime,emergencyAdmissionToTime from hospitalaccinfo";
			
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
										
			List<Map<String, Object>> details = query.list();
			
			//List<Map<String, Object>> details = getJdbcTemplate().queryForList(sql);

			//current time from system
			// sdf is an object of simple date format which takes only hours from the time("HH")

			
			int min = Integer.parseInt(sdf2.format(Time.valueOf(todays_time)).toLowerCase());
		
			int inTime = Integer.parseInt(sdf.format(Time.valueOf(todays_time)).toLowerCase());
			//int inTime2=inTime+min;
										
				for (Map<String, Object> row: details) {
								
						//assigning (fromTime & toTime)Time values from table into sdf("HH") hours
						fromTime = Integer.parseInt(sdf.format((Time)row.get("emergencyAdmissionFromTime")).toLowerCase());
						toTime = Integer.parseInt(sdf.format((Time)row.get("emergencyAdmissionToTime")).toLowerCase());
									
				}

			//business logic for registration charges.
				if ((fromTime > toTime) && (inTime >= fromTime || inTime <= toTime)) {
					if(inTime == toTime && min>0 )
					{
						emergencyFlag = false;
						return emergencyFlag;
					}
					emergencyFlag = true;
				} else if (fromTime < toTime && (inTime >= fromTime && inTime <= toTime)) {
					if(inTime == toTime && min>0 )
					{
						emergencyFlag = false;
						return emergencyFlag;
					}
					emergencyFlag = true;
				} else{
					emergencyFlag = false;
			}
			return emergencyFlag;
			}
			catch(Exception e){

				e.printStackTrace();
				System.err.println("ehatException -: Class Name :"+
	                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
	                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
				return emergencyFlag;
			}

		}

		@Override
		public IpdBillPatientsBedsDTO getIpdbillPatientsBeds(String general,
				Integer unitId, Integer userId1, String userType) {
			
			IpdBillPatientsBedsDTO obj=new IpdBillPatientsBedsDTO();
			//List<RegTreBillDto> ltPatientRecord = null;
			List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
			List<IpdBillPatientsBedsDTO> ltIpdbillPatients = null;
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(IpdBillPatientsBedsDTO.class);
							
							///criteria.add(Restrictions.eq("halltypeId",1));
							//criteria.add(Restrictions.eq("hallID",1));
							
				 			criteria.add(Restrictions.in("unitId", new Integer[]{0,unitId}));
							criteria.addOrder(Order.asc("bedId"));
							ltIpdbillPatients = criteria.list();
							
							// for doctor names
							Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
					  		ltDoctorDto=criteria2.list();
					  		//obj.setListRegTreBillDto(ltPatientRecord);
					  		obj.setLstIpdbillPatientsBeds(ltIpdbillPatients);
							obj.setLstDoctorDto(ltDoctorDto);				
			
			} catch (Exception e) {
				e.printStackTrace();
				return obj;
			}
			return obj;
		}

		@Override
		public IpdBillPatientsBedsDTO getIpdbillPatientsBedsByFilter(
				int hallTypeId, int hallId,String filter) {
			
			IpdBillPatientsBedsDTO obj=new IpdBillPatientsBedsDTO();
			//List<RegTreBillDto> ltPatientRecord = null;
			List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
			List<IpdBillPatientsBedsDTO> ltIpdbillPatients = null;
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(IpdBillPatientsBedsDTO.class);
							
				       if (filter.equalsIgnoreCase("halltypewise"))
				       {
				    	   criteria.add(Restrictions.eq("halltypeId", hallTypeId));
				    	   criteria.addOrder(Order.asc("bedId"));
				       }
				       else{
				    	   criteria.add(Restrictions.eq("halltypeId", hallTypeId));
				    	   criteria.add(Restrictions.eq("hallID", hallId));
				    	   criteria.addOrder(Order.asc("bedName"));
				       }
							ltIpdbillPatients = criteria.list();
							
							// for doctor names
							Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
					  		ltDoctorDto=criteria2.list();
					  		obj.setLstIpdbillPatientsBeds(ltIpdbillPatients);
							obj.setLstDoctorDto(ltDoctorDto);				
			
			} catch (Exception e) {
				e.printStackTrace();
				return obj;
			}
			return obj;
		}

		@SuppressWarnings("unchecked")
		@Override
		public IpdBillPatientsBedsDTO autosuggesstionviewIpdbillPatientsBlockWise(
				String letter, String finalBill, String usertype,Integer unitId) {
			//List<IpdBillPatientsDTO> ltIpdbillPatients = null;
			List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
			IpdBillPatientsBedsDTO obj=new IpdBillPatientsBedsDTO();
			List<IpdBillPatientsBedsDTO> lstIpdbillPatientsBeds = null;
			
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(IpdBillPatientsBedsDTO.class);
		
				
				Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
				Criterion rest2= Restrictions.like("pIdd", "%" + letter + "%");
				Criterion rest3= Restrictions.like("mrnno", "%" + letter + "%");
				Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
				Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
				criteria.add(Restrictions.eq("bedState", 3));
				criteria.add(Restrictions.eq("unitId", unitId));
				criteria.add(Restrictions.or(rest1,rest3,rest4,rest5));
			
				criteria.addOrder(Order.desc("pIdd"));
				lstIpdbillPatientsBeds = criteria.list();
				
				Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
		  		ltDoctorDto=criteria2.list();
				
		  		//obj.setListRegTreBillDto(ltPatientRecord);
		  		
		  		obj.setLstIpdbillPatientsBeds(lstIpdbillPatientsBeds);
				obj.setLstDoctorDto(ltDoctorDto);
				
		
			} catch (Exception e) {
				e.printStackTrace();
				return obj;
			}
			return obj;
		}

		
		@Override
		public IpdBillPatientsDTO2 getIpdbillPatients2(String general,
				Integer unitId, Integer userId1, String userType) {
			
			IpdBillPatientsDTO2 obj=new IpdBillPatientsDTO2();
			//List<RegTreBillDto> ltPatientRecord = null;
			List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
			List<IpdBillPatientsDTO2> ltIpdbillPatients = null;
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(IpdBillPatientsDTO2.class);
				
				
				if(userType.equalsIgnoreCase("doctor")){
					
					Session session = sessionFactory.getCurrentSession();
					
					 String hql = "select Doctor_ID from doctor where User_ID=:UserID";
						Query query = session.createSQLQuery(hql);
						query.setParameter("UserID", userId1);
						String docId = query.uniqueResult().toString();
						
						
						
						String all = "SELECT bill_id FROM ehat_ipdbill_patients2 WHERE"
								+ "(doctor_id = "
								+ docId
								+ " OR doctor_id LIKE '"
								+ docId
								+ ",%'"
								+ " OR doctor_id LIKE '%,"
								+ docId
								+ ",%' OR doctor_id LIKE '%,"
								+ docId
								+ "') and t_flag =:tFlag"
								+" and unit_id =:unitId and patient_id order by 'desc'";
								
						
						Query query2 = session.createSQLQuery(all);
						//query2.setParameter("deptId", deptId);
						query2.setParameter("tFlag", "Y");
						query2.setParameter("unitId", unitId);
						
		        		 query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		        		 List<Map<String, Object>> data1 = query2.list();
							
							ArrayList<Integer> billIdArr = new ArrayList<Integer>();
							
							for (Map<String, Object> row1 : data1) {
								int bId = (Integer) row1.get("bill_id");
								billIdArr.add(bId);
							}
		        		 
		        		 
		        		 if(unitId > 0){//get list unit wise.
								criteria.add(Restrictions.eq("unitId", unitId));
							}
							//criteria.add(Restrictions.eq("departmentId", deptId));
							/*criteria.add(Restrictions.eq("tFlag", "Y"));
							criteria.add(Restrictions.in("billId", billIdArr));
							//System.err.println("in daoIMPL=="+deptId);
							criteria.addOrder(Order.desc("patientId"));
			
							criteria.setMaxResults(10);
							ltIpdbillPatients = criteria.list();*/
							
							
							criteria.add(Restrictions.eq("deleted", "N"));
							criteria.add(Restrictions.in("billId", billIdArr));

							if (general.equalsIgnoreCase("general")) {
								criteria.add(Restrictions.eq("invoiceFlag", "Y"));
							} else if (general.equalsIgnoreCase("ipd")) {

							} else {
								criteria.add(Restrictions.eq("invoiceFlag", "N"));
							}
							if(unitId > 0){//get unit wise patients
								criteria.add(Restrictions.eq("unitId", unitId));
							}
							criteria.addOrder(Order.desc("pId"));
							ltIpdbillPatients = criteria.list();
							// for doctor names
							Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
					  		ltDoctorDto=criteria2.list();
							
					  		//obj.setListRegTreBillDto(ltPatientRecord);
					  		obj.setLstIpdbillPatients(ltIpdbillPatients);
							obj.setLstDoctorDto(ltDoctorDto);					
			}
		else{
				
				criteria.add(Restrictions.eq("deleted", "N"));

				if (general.equalsIgnoreCase("general")) {
					criteria.add(Restrictions.eq("invoiceFlag", "Y"));
				} else if (general.equalsIgnoreCase("ipd")) {

				} else {
					criteria.add(Restrictions.eq("invoiceFlag", "N"));
				}
				if(unitId > 0){//get unit wise patients
					criteria.add(Restrictions.eq("unitId", unitId));
				}
				criteria.addOrder(Order.desc("pId"));
				ltIpdbillPatients = criteria.list();
				
				Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
		  		
				ltDoctorDto=criteria2.list();
		  		
				obj.setLstIpdbillPatients(ltIpdbillPatients);
				obj.setLstDoctorDto(ltDoctorDto);
		}
			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"+
	                    e.getStackTrace()[0].getClassName()+" Method Name : "+
	                    e.getStackTrace()[0].getMethodName()+" Line No :"+ e.getStackTrace()[0].getLineNumber());
				return obj;
			}
			return obj;
		}
		
		
		
		/************
		* @author	: Mohd tarique Aaalam
		* @date		: 23/march-2018
		* @codeFor	: autosuggesstion 
		 ************/		
		@SuppressWarnings("unchecked")
		@Override
		public IpdBillPatientsDTO2 autosuggesstionviewIpdbillPatients2(String letter,String finalBill,String usertype,Integer unitId){
			//List<IpdBillPatientsDTO> ltIpdbillPatients = null;
			List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
			IpdBillPatientsDTO2 obj=new IpdBillPatientsDTO2();
			List<IpdBillPatientsDTO2> ltIpdbillPatients = null;
			
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(IpdBillPatientsDTO2.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("unitId", unitId));
				if(finalBill.equalsIgnoreCase("finalBill")){
					
					criteria.add(Restrictions.eq("invoiceFlag", "Y"));
				}else{
					criteria.add(Restrictions.eq("invoiceFlag", "N"));
				}if(usertype.equalsIgnoreCase("Y")){
					
					criteria.add(Restrictions.like("inCount", "%" + letter + "%"));	
					
				}else{
				
				Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
				Criterion rest2= Restrictions.like("pIdd", "%" + letter + "%");
				Criterion rest3= Restrictions.like("mrnno", "%" + letter + "%");
				Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
				Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
				criteria.add(Restrictions.or(rest1, rest2,rest3,rest4,rest5));
				/*criteria.add(Restrictions
						.sqlRestriction("patient_name LIKE '%" + letter + "%' OR pIdd LIKE '%" + letter + "%'"));
				*/
				}
				criteria.addOrder(Order.desc("pId"));
				ltIpdbillPatients = criteria.list();
				
				Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
		  		ltDoctorDto=criteria2.list();
				
		  		//obj.setListRegTreBillDto(ltPatientRecord);
		  		
		  		obj.setLstIpdbillPatients(ltIpdbillPatients);
				obj.setLstDoctorDto(ltDoctorDto);
				
		
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
		
		
		
		
		
		
		/************
		* @author	: Mohd tarique Aaalam
		* @date		: 23/march-2018
		* @codeFor	: autosuggesstion 
		 ************/		
		@SuppressWarnings("unchecked")
		@Override
		public IpdBillPatientsDTO2 autosuggesstionviewIpdbillPatients2(String letter,String finalBill,Integer unitId){
			
			
			List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
			IpdBillPatientsDTO2 obj=new IpdBillPatientsDTO2();
			List<IpdBillPatientsDTO2> ltIpdbillPatients = null;
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(IpdBillPatientsDTO2.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("unitId", unitId));
				if(finalBill.equalsIgnoreCase("finalBill")){
					
					criteria.add(Restrictions.eq("invoiceFlag", "Y"));
				}else if(finalBill.equalsIgnoreCase("all")){
					
				}else{
					criteria.add(Restrictions.eq("invoiceFlag", "N"));
				}
				
				Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
				Criterion rest3= Restrictions.like("pIdd", "%" + letter + "%");
				Criterion rest2= Restrictions.like("mrnno", "%" + letter + "%");
				Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
				Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
				criteria.add(Restrictions.or(rest1, rest2,rest3,rest4,rest5));
				/*criteria.add(Restrictions
						.sqlRestriction("patient_name LIKE '%" + letter + "%' OR patient_id LIKE '%" + letter + "%'OR mrnno LIKE '%" + letter + "%'"));
				*/

				criteria.addOrder(Order.desc("pId"));
				ltIpdbillPatients = criteria.list();
				
				
				Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
		  		ltDoctorDto=criteria2.list();
				
		  		//obj.setListRegTreBillDto(ltPatientRecord);
		  		
		  		obj.setLstIpdbillPatients(ltIpdbillPatients);
				obj.setLstDoctorDto(ltDoctorDto);
		
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


		@Override
		public int cancelAdmission(TreatmentDto treatmentDto,
				HttpServletRequest request) {
			
			// current login user id
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			try {
					 String sql = "update ehat_treatment set t_flag= 'N' , adm_cancel_flag='Y', admsn_can_date_time=now(), admsn_canceled_by="+userId+", cancel_narration='"+treatmentDto.getCancelNarration()+"' where treatment_id= "+treatmentDto.getTreatmentId();
						
						SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				      //   query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
				         query.executeUpdate();
				} catch (Exception e) {
					e.printStackTrace();
					return 0;
				}
				return 1;
				}

		@SuppressWarnings("unchecked")
		@Override
		public int packageIpdSendToLab(EhatOtherBillDetailForIpdDto othrBillIpdObj,HttpServletRequest request) {

			List<LabRequestDTO> listsmplColFlg=new ArrayList<LabRequestDTO>();
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
			String sid = (String)resourceBundleEhat.getString("labHeadingID");
			int serviceId = Integer.parseInt(sid);
			try{
			
					Query q1 = sessionFactory.getCurrentSession().createSQLQuery(
							"SELECT count(*) FROM ehat_lab_request_slave where  deleted_flag='N' and bill_details_id='"+othrBillIpdObj.getBillDetailsId()+"' " +
							" and dept_id='"+othrBillIpdObj.getDepartmentId()+"' and is_package_flag='Y' and deleted_flag='N'");
					Integer count = ((Number) q1.uniqueResult()).intValue();
				
					if(count>0)
					{
						
						Query que = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT count(*) FROM ehat_lab_request_slave where  deleted_flag='N' and bill_details_id='"+othrBillIpdObj.getBillDetailsId()+"' " +
								" and dept_id='"+othrBillIpdObj.getDepartmentId()+"' and is_package_flag='Y' and deleted_flag='N' and sub_service_id = '"+othrBillIpdObj.getChildSubServiceId()+"'");
						Integer dupCount = ((Number) que.uniqueResult()).intValue();
						//count check For duplicate test are exist in DB.	
						if(dupCount==0){
						
							Query q = sessionFactory.getCurrentSession().createSQLQuery(
									"SELECT Distinct(lab_request_id) FROM ehat_lab_request_slave where  deleted_flag='N' and bill_details_id='"+othrBillIpdObj.getBillDetailsId()+"' " +
									" and dept_id='"+othrBillIpdObj.getDepartmentId()+"' and is_package_flag='Y' and deleted_flag='N'");
							Integer labReqId = ((Number) q.uniqueResult()).intValue();
						
							Criteria criteriasmplFlg= sessionFactory.getCurrentSession().createCriteria(LabRequestDTO.class);
							criteriasmplFlg.add(Restrictions.eq("labRequestId", labReqId));
							criteriasmplFlg.setProjection(Projections.projectionList().add(Projections.property("smplColletFlag"), "smplColletFlag"));
							criteriasmplFlg.setResultTransformer(Transformers.aliasToBean(LabRequestDTO.class));
							listsmplColFlg = criteriasmplFlg.list();
									
							for(LabRequestDTO labObj:listsmplColFlg){
								if(labObj.getSmplColletFlag()=='N'){
									
									if(othrBillIpdObj.getChildServiceId()==serviceId){
									String code= (String) sessionFactory
											.getCurrentSession().createSQLQuery("SELECT ifnull(code_name,'-') FROM ehat_subservice where id="+othrBillIpdObj.getChildSubServiceId()+"").uniqueResult();
								
									if(code==null){
										code="-";
									}
									LabRequestSlaveDTO labReqtSlv = new LabRequestSlaveDTO();
									
									labReqtSlv.setLabRequestId(labReqId);
									labReqtSlv.setBillDetailsID(othrBillIpdObj.getBillDetailsId());
									labReqtSlv.setServiceId(othrBillIpdObj.getServiceId());
									labReqtSlv.setSubServiceId(othrBillIpdObj.getChildSubServiceId());
									labReqtSlv.setLabTestCode(code);
									labReqtSlv.setRefDocId(othrBillIpdObj.getDoctorId());
									labReqtSlv.setPackageId(othrBillIpdObj.getSubServiceId());
									labReqtSlv.setIsPackageFlag("Y");
									labReqtSlv.setDeptId(othrBillIpdObj.getDepartmentId());
									//Insert value in lab slave
									int labReqslvid = (Integer) sessionFactory.getCurrentSession().save(labReqtSlv);
									labReqtSlv.setLabReqSlvId(labReqslvid);
									
									}
								}else{
									//if sample are collected.
									return 0;
								}
							}
						}else{
							//For duplicate test.
							return 2;
						}
					}
			}catch (Exception e) {
				e.printStackTrace();
				return -1;
			}
			return 1;
		}

		@SuppressWarnings("unchecked")
		@Override
		public String getColorCode(int treatmentId) {
			
		Query q1 = sessionFactory.getCurrentSession().createSQLQuery("SELECT bill_type_name FROM ehat_bill_master where treatment_id="+treatmentId+" ");
		String str = (String) q1.uniqueResult();
		System.err.print(str);
		return str;
		
		}

		
		@Override
		public boolean getEmerChrTimeSunday() {
			//private DateFormat sdf = new SimpleDateFormat("HH");
			boolean emergencyFlag = false;
			try{
				 Date now = new Date();
			     Calendar calendar = Calendar.getInstance();
			     calendar.setTime(now);
			     int day=calendar.get(Calendar.DAY_OF_WEEK);
			    // System.err.println(calendar.get(Calendar.DAY_OF_WEEK)); 
			     System.err.println("aaaaaaaakkkmmmmaaallllll"+day); 
			     if(day==1)
			     {
			    	 emergencyFlag=true;
			     }
			return emergencyFlag;
			}
			catch(Exception e){

				e.printStackTrace();
				System.err.println("ehatException -: Class Name :"+
	                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
	                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
				return emergencyFlag;
			}

		}

		@Override
		public List<PharmacyDetailsOnBillingPrintDto> getPharmacyDetailsONBillingPrint(
				int treatmentId, int patientId) {
			
			List<PharmacyDetailsOnBillingPrintDto> listPharmacyDetailsOnBillingPrintDto =new ArrayList<PharmacyDetailsOnBillingPrintDto>();
			try {
			
				
					// String sql = "SELECT * FROM ehat_view_patient_service_detail_ipd where treatment_id = '"+treatmentId+"'";
					String sql="";
					if(patientId > 0){
						
						sql = "SELECT pharma_indent_sale_master.indent_sale_id,pharma_indent_sale_master.indent_sale_received_date,pharma_indent_sale_master.indent_sale_gross_amt " +
						 		"FROM pharma_indent_master INNER JOIN pharma_indent_sale_master " +
						 		"ON pharma_indent_master.indent_id = pharma_indent_sale_master.indent_sale_indent_no where bill_Category_id="+patientId+" and indent_treatement_id = "+treatmentId+" ";
						
					}else{
						
						sql = "SELECT pharma_indent_sale_master.indent_sale_id,pharma_indent_sale_master.indent_sale_received_date,pharma_indent_sale_master.indent_sale_gross_amt " +
						 		"FROM pharma_indent_master INNER JOIN pharma_indent_sale_master " +
						 		"ON pharma_indent_master.indent_id = pharma_indent_sale_master.indent_sale_indent_no where indent_treatement_id = "+treatmentId+" ";
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
			         if(patientId > 0){
			        	 
			        	 sql1 = "SELECT patient_sales_bill_id,patient_bill_date,patient_sales_bill_net_amt FROM pharma_patient_sales_bill_master where patient_bill_sponser_id="+patientId+" and patient_sale_treatmentId = "+treatmentId+" ";
			         }else{
			        	 
			        	 sql1 = "SELECT patient_sales_bill_id,patient_bill_date,patient_sales_bill_net_amt FROM pharma_patient_sales_bill_master where patient_sale_treatmentId = "+treatmentId+" ";
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
		public Double getSponcerDisc(int chargesSlaveId) {
			try {
				return Double.valueOf(""+sessionFactory.getCurrentSession().createSQLQuery("select discount from ehat_charges_master_slave where id="+chargesSlaveId).uniqueResult());
			} catch (NumberFormatException e) {
				return 0.0;
			} catch (HibernateException e) {
				return 0.0;
			}
		}

		//added by kishor for get sponsor sanction amount
		@Override
		public List<MultipleSponsorDto> getSponsorSanctionAmount(
				Integer sponsorId, Integer chargesSlaveId, Integer treatmentId,
				Integer patientId,String callfrom,HttpServletRequest request) {
			List<MultipleSponsorDto> listMultipleSponsor = null;
			try {if(callfrom.equalsIgnoreCase("ipd")){
				setRemainSanctionAmount(sponsorId,chargesSlaveId,treatmentId,patientId);
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(MultipleSponsorDto.class);
				
				criteria.add(Restrictions.eq("sponsorId", sponsorId));
				criteria.add(Restrictions.eq("chargesSlaveId", chargesSlaveId));
				//criteria.add(Restrictions.eq("treatmentId", treatmentId));
				criteria.add(Restrictions.eq("patientId", patientId));
				criteria.add(Restrictions.eq("treatmentId", treatmentId));
				criteria.add(Restrictions.eq("deleted", "N"));				
				listMultipleSponsor = criteria.list();
			}else if(callfrom.equalsIgnoreCase("opd")){

				setRemainSanctionAmountForOpd(sponsorId,chargesSlaveId,treatmentId,patientId);
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(MultipleSponsorDto.class);
				
				criteria.add(Restrictions.eq("sponsorId", sponsorId));
				criteria.add(Restrictions.eq("chargesSlaveId", chargesSlaveId));
				//criteria.add(Restrictions.eq("treatmentId", treatmentId));
				criteria.add(Restrictions.eq("patientId", patientId));
				criteria.add(Restrictions.eq("treatmentId", treatmentId));
				criteria.add(Restrictions.eq("deleted", "N"));				
				listMultipleSponsor = criteria.list();
			
			}
		
			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"+
	                    e.getStackTrace()[0].getClassName()+" Method Name : "+
	                    e.getStackTrace()[0].getMethodName()+" Line No :"+ e.getStackTrace()[0].getLineNumber());
				return listMultipleSponsor;
			}
			return listMultipleSponsor;
		}
		
		
		//added by kishor for calculate and set sponsor remain amount for Ipd
		@Override
		public void setRemainSanctionAmount(Integer sponsorId, Integer chargesSlaveId, Integer treatmentId,
				Integer patientId) {			
			try {
				
				ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
				String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");    
				int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
				
				double otherPay=0.0;
				String sql11 = "SELECT ifnull(sum(other_amount-other_concession),0) as other_pay FROM ehat_bill_details_ipd where patient_id="+patientId+" and sponsor_id="+sponsorId+" and charges_slave_id ="+chargesSlaveId+" and deleted='N' and cancle='N' and paid_by_cash_flag='N' and service_id !="+pharmacyInvoice+" and service_id !=-5";					
				SQLQuery query11 = sessionFactory.getCurrentSession().createSQLQuery(sql11);		        
				otherPay=((Number)query11.uniqueResult()).intValue();        	 
				
				String sql12 = "SELECT ifnull(sum(sanction_amt),0) as sanction_amt FROM ehat_multiple_sponsor where patient_id="+patientId+" and treatment_id="+treatmentId+" and sponsor_id="+sponsorId+" and charges_slave_id ="+chargesSlaveId+" and deleted='N' ";					
				SQLQuery query12 = sessionFactory.getCurrentSession().createSQLQuery(sql12);		        
				double sanctionAmt=((Number)query12.uniqueResult()).intValue();    
				
				//double pharmaSaleAmount=patientSaleBillDaoImpl.getPendingAmountByTreatmentId(treatmentId,chargesSlaveId);
				//double pharmaIndentAmount=indentDaoImpl.getPendingAmountByTreatmentId(treatmentId,chargesSlaveId);
				
				double pharmaSaleAmount = 0.0;
				
			SQLQuery query1 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT IF(COUNT(amount_balance) > 0,MIN(amount_balance),(SELECT SUM(p.patient_sales_bill_net_amt - p.patient_sales_bill_amount_received) FROM pharma_patient_sales_bill_master p WHERE p.patient_sale_treatmentId = "+treatmentId+" AND p.patient_bill_sponser_id = "+chargesSlaveId+")) AS rem FROM pharma_patient_amount_history WHERE Treatment_id = "+treatmentId+" ORDER BY idpharma_patient_amount_history_id DESC LIMIT 1");
							/*"select ifnull(sum(d.amount_balance),0) as amount_balance from pharma_patient_amount_details d inner join pharma_patient_sales_bill_master m ON d.treatment_id = m.patient_sale_treatmentId where m.patient_bill_patient_id = "
									+ patientId
									+ " and m.patient_bill_sponser_id = "
									+ chargesSlaveId + " ");*/
				Object rows = (Object) query1.uniqueResult();
				if (rows != null)
					pharmaSaleAmount = Double.parseDouble(rows.toString());
				
				double pharmaIndentAmount = 0.0;
				
				SQLQuery query121 = sessionFactory.getCurrentSession().createSQLQuery(/*"select sum(s.indent_sale_net_amt - s.indent_sale_amt_receive) - ifnull(sum(c.credit_note_slave_amt), 0) - (select ifnull(sum(amount_receive), 0) from pharma_indent_amount_details where treatment_id = m.indent_treatement_id) from pharma_indent_sale_master s inner join pharma_indent_master m ON m.indent_id = s.indent_sale_indent_no left join pharma_credit_note_slave c ON c.credit_note_slave_indent_id = s.indent_sale_id where m.indent_patient_id = "+patientId+" and s.bill_Category_id = "+chargesSlaveId+""*/
						"SELECT ifnull( SUM(s.indent_sale_net_amt - s.indent_sale_amt_receive),0) - IFNULL(SUM(c.credit_note_slave_amt), 0) - (SELECT  IFNULL(SUM(amount_receive), 0) FROM pharma_indent_amount_details WHERE treatment_id = "+treatmentId+") FROM pharma_indent_sale_master s INNER JOIN pharma_indent_master m ON m.indent_id = s.indent_sale_indent_no LEFT JOIN pharma_credit_note_slave c ON c.credit_note_slave_indent_id = s.indent_sale_id WHERE m.indent_treatement_id = "+treatmentId+" and s.bill_Category_id="+chargesSlaveId+" ");
				Object rows1 = (Object) query121.uniqueResult();
				if (rows1 != null)
					pharmaIndentAmount = Double.parseDouble(rows1.toString());
				
				
				
				double pharmaAmt=0.0;
				String sql111 = "SELECT ifnull(sum(other_amount-other_concession),0) as other_pay FROM ehat_bill_details_ipd where patient_id="+patientId+" and sponsor_id="+sponsorId+" and charges_slave_id ="+chargesSlaveId+" and deleted='N' and service_id ="+pharmacyInvoice+" ";					
				SQLQuery query111 = sessionFactory.getCurrentSession().createSQLQuery(sql111);		        
				pharmaAmt=((Number)query111.uniqueResult()).intValue();
				double PharmaTot=(pharmaAmt + pharmaSaleAmount + pharmaIndentAmount);
				
				double perc= getSponcerDisc(chargesSlaveId);
				
				double perAmt=((PharmaTot * perc) / 100);
				double PharmaFinalTot=(PharmaTot - perAmt);				
				
				double tot=(otherPay + PharmaFinalTot);
				double remSanctionAmt= (sanctionAmt - tot);
	        	  String sql2 = "UPDATE ehat_multiple_sponsor SET rem_sanction_amt = '"+remSanctionAmt+"' WHERE patient_id="+patientId+" and treatment_id="+treatmentId+" and sponsor_id="+sponsorId+" and charges_slave_id ="+chargesSlaveId+" and deleted='N'";		        	 
					SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
			         query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
			         query2.executeUpdate();	
			         
			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"+
	                    e.getStackTrace()[0].getClassName()+" Method Name : "+
	                    e.getStackTrace()[0].getMethodName()+" Line No :"+ e.getStackTrace()[0].getLineNumber());				
			}			
		}
		
		//added by kishor for calculate and set sponsor remain amount for Opd
		@Override
		public void setRemainSanctionAmountForOpd(Integer sponsorId, Integer chargesSlaveId, Integer treatmentId,
				Integer patientId) {			
			try {
				
				ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
				String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");    
				int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
				
				double otherPay=0.0;
				String sql11 = "SELECT ifnull(sum(other_amount-other_concession),0) as other_pay FROM ehat_bill_details where patient_id="+patientId+" and sponsor_id="+sponsorId+" and charges_slave_id ="+chargesSlaveId+" and deleted='N' and cancle='N' and paid_by_cash_flag='N' and service_id !="+pharmacyInvoice+" and service_id !=-5 ";					
				SQLQuery query11 = sessionFactory.getCurrentSession().createSQLQuery(sql11);		        
				otherPay=((Number)query11.uniqueResult()).intValue();   
				
				String sql12 = "SELECT ifnull(sum(sanction_amt),0) as sanction_amt FROM ehat_multiple_sponsor where patient_id="+patientId+" and treatment_id="+treatmentId+" and sponsor_id="+sponsorId+" and charges_slave_id ="+chargesSlaveId+" and deleted='N' ";					
				SQLQuery query12 = sessionFactory.getCurrentSession().createSQLQuery(sql12);		        
				double sanctionAmt=((Number)query12.uniqueResult()).intValue();       
				
				//double pharmaSaleAmount=patientSaleBillDaoImpl.getPendingAmountByTreatmentId(treatmentId,sponsorId);
				
				double pharmaSaleAmount = 0.0;
				
				SQLQuery query1 = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"select ifnull(sum(d.amount_balance),0) as amount_balance from pharma_patient_amount_details d inner join pharma_patient_sales_bill_master m ON d.treatment_id = m.patient_sale_treatmentId where m.patient_bill_patient_id = "
										+ patientId
										+ " and m.patient_bill_sponser_id = "
										+ chargesSlaveId + " ");
					Object rows = (Object) query1.uniqueResult();
					if (rows != null)
						pharmaSaleAmount = Double.parseDouble(rows.toString());
				
				double pharmaAmt=0.0;
				String sql111 = "SELECT ifnull(sum(other_amount-other_concession),0) as other_pay FROM ehat_bill_details where patient_id="+patientId+" and sponsor_id="+sponsorId+" and charges_slave_id ="+chargesSlaveId+" and deleted='N' and service_id ="+pharmacyInvoice+" ";					
				SQLQuery query111 = sessionFactory.getCurrentSession().createSQLQuery(sql111);		        
				pharmaAmt=((Number)query111.uniqueResult()).intValue();
				double PharmaTot=(pharmaAmt + pharmaSaleAmount);
				
				double perc= getSponcerDisc(chargesSlaveId);
				
				double perAmt=((PharmaTot * perc) / 100);
				double PharmaFinalTot=(PharmaTot - perAmt);
				
				double tot=(otherPay + PharmaFinalTot);
				double remSanctionAmt= (sanctionAmt - tot);
	        	  
	        	  String sql2 = "UPDATE ehat_multiple_sponsor SET rem_sanction_amt = '"+remSanctionAmt+"' WHERE patient_id="+patientId+" and treatment_id="+treatmentId+" and sponsor_id="+sponsorId+" and charges_slave_id ="+chargesSlaveId+" and deleted='N'";		        	 
					SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
			         query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
			         query2.executeUpdate();	
			         
			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"+
	                    e.getStackTrace()[0].getClassName()+" Method Name : "+
	                    e.getStackTrace()[0].getMethodName()+" Line No :"+ e.getStackTrace()[0].getLineNumber());				
			}			
		}
		
		
		
		// Added by vinod start
		@Override				
		public List<EhatViewPatientServiceDetailIpdDto> getIpdPatientServiceListFromViewRpt(
				Integer treatmentId, String treatcloseForIpd,Integer chargesSlaveId) {
					
			List<EhatViewPatientServiceDetailIpdDto> listServiceIpdDto =new ArrayList<EhatViewPatientServiceDetailIpdDto>();
			try {
				String otProc=null;
				if(treatcloseForIpd.equals("treatcloseForIpd"))
				{
					 String sql = "SELECT * FROM ehat_view_patient_service_detail_ipd_for_prev_bill_ipdsponsor where charges_slave_id="+chargesSlaveId+" and treatment_id = '"+treatmentId+"'";
			         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			         @SuppressWarnings("unchecked")
					List<Map<String, Object>> data = query.list();
			       
			         for(Map<String, Object> row : data){
			        	 
			        	 EhatViewPatientServiceDetailIpdDto objDTO= new EhatViewPatientServiceDetailIpdDto();
			        	 objDTO.setServiceId((Integer)row.get("service_id"));
			        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
			        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
			        	 objDTO.setIscombination((String)row.get("iscombination"));
			        	
			        	 objDTO.setServiceName((String)row.get("service_name"));
			        	 objDTO.setAmount((Double)row.get("amount"));
			        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
			        	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
			        	 objDTO.setPaidFlag((String)row.get("paid_flag"));
			        	
			        	 listServiceIpdDto.add(objDTO);
			        	 objDTO=null;
			         }
				}else{
					 String sql = "SELECT * FROM ehat_view_patient_service_detail_ipd where charges_slave_id="+chargesSlaveId+" and treatment_id = '"+treatmentId+"'";
			         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			         @SuppressWarnings("unchecked")
					List<Map<String, Object>> data = query.list();
			       
			         for(Map<String, Object> row : data){
			        	 
			        	 EhatViewPatientServiceDetailIpdDto objDTO= new EhatViewPatientServiceDetailIpdDto();
			        	 objDTO.setServiceId((Integer)row.get("service_id"));
			        	 int aaa=(Integer)row.get("service_id");
			        	// System.err.println("kkkkkk"+aaa);
			        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
			        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
			        	 objDTO.setIscombination((String)row.get("iscombination"));
			        	
			        	 objDTO.setServiceName((String)row.get("service_name"));
			        	 objDTO.setAmount((Double)row.get("amount"));
			        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
			        	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
			        	 objDTO.setPaidFlag((String)row.get("paid_flag"));
			        	 
			        	 otProc = (String) row.get("ot_procedure").toString();
			        	 
			        	 if(!(otProc.equals(null) || otProc.equals("0") || otProc.equals("-")))
			        	 {
				        	 if(aaa==4)
				        	 {
								
								if (otProc.equals(null) || otProc.equals("0")) {
	
								} else {
	
									String sql1 = "SELECT GROUP_CONCAT(o.OName SEPARATOR ' , ') AS OName "
												+ "FROM (ehat_view_patient_service_detail_ipd b join operation o)"
												+ "where b.treatment_id='"+treatmentId+"' and b.service_id='4' and o.Operation_id in("+otProc+")";
	
									SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
									query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
									List<Map<String, Object>> data1 = query1.list();
									//System.err.println("ot len-----------------------"+data1.size());
									for (Map<String, Object> row1 : data1) {
											
										objDTO.setOtProcedure((String) row1.get("OName"));
										//listServiceIpdDto.add(objDTO);
									}
								}
							}		        	 
			        	}
			        	listServiceIpdDto.add(objDTO);
			        	objDTO=null;
			         }
				}		

			} catch (Exception e) {
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
				return listServiceIpdDto;
			}
			return listServiceIpdDto;
		}

		@Override
		
		public List<EhatViewPatientBedDetailsIpdDto> getPatientBedBill(
				Integer treatmentId, Integer serviceId, Integer chargesSlaveId) {
			List<EhatViewPatientBedDetailsIpdDto> listBedIpdDto = new ArrayList<EhatViewPatientBedDetailsIpdDto>();
			try {
				
				String sql1 = "SELECT * FROM ehat_view_patient_bed_details_ipd where charges_slave_id="+chargesSlaveId+" and treatment_id = '"+treatmentId+"' and service_id='"+serviceId+"' and deleted='N'";
				
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
		
		public List<EhatViewPatientSubServiceDetailsIpdDto> getPatientServiceBill(
				Integer treatmentId, Integer serviceId, Integer chargesSlaveId) {
			
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
			String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");    
			int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
			
			List<EhatViewPatientSubServiceDetailsIpdDto> listSubServiceIpdDto = new ArrayList<EhatViewPatientSubServiceDetailsIpdDto>();
			try {
				
				if(serviceId==14){
					
						//String sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"'";
							String sql1 = "SELECT * FROM ehat_bill_details_ipd where charges_slave_id="+chargesSlaveId+" and service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"' and deleted = 'N' ";
						
						
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
				       			
				        	/*if(objDTO1.getSubServiceId()<=6)
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
				        	}*/
				        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
				        	 listSubServiceIpdDto.add(objDTO1);
				        	 objDTO1=null;
				         
					}
				          						
				}
				else if(serviceId==16)
				{
					
						//String sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"'";
							String sql1 = "SELECT * FROM ehat_bill_details_ipd where charges_slave_id="+chargesSlaveId+" and service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"' and deleted = 'N' ";
						
						
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
				          						
				}
				else if(serviceId==-5)
				{				
					String sql1 = "SELECT * FROM ehat_bill_details_ipd where charges_slave_id="+chargesSlaveId+" and treatment_id = "+treatmentId+" and service_id="+serviceId;
					
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
				}
				
				else
				{
				
				String otProc=null;
				String sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where charges_slave_id="+chargesSlaveId+" and treatment_id = '"+treatmentId+"' and service_id='"+serviceId+"'";
				
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         @SuppressWarnings("unchecked")
		         List<Map<String, Object>> data1 = query1.list();
		         			         
		         for(Map<String, Object> row : data1){
		        	 
		        	 EhatViewPatientSubServiceDetailsIpdDto objDTO1= new EhatViewPatientSubServiceDetailsIpdDto();
		        	 
		        	 objDTO1.setServiceId((Integer)row.get("service_id"));
		        	 int aaa=(Integer)row.get("service_id");
		        	//System.err.println("kkkkkk"+aaa);
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
		        	 }else
		        	 {
		        		 objDTO1.setCategoryName((String)row.get("category_name"));	
		        	 }
		        	 
		        	 
		        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
		        	 objDTO1.setOtProcedureId((String) row.get("ot_procedure"));
		        	 objDTO1.setSndtolabflag((String) row.get("sndtolabflag"));
		 			objDTO1.setSndtorisflag((String) row.get("sndtorisflag"));
		        	 otProc = (String) row.get("ot_procedure").toString();
		        	 objDTO1.setEmrPer((Double)row.get("emrPer"));
		        	 objDTO1.setPaidByCashFlag((String)row.get("paid_by_cash_flag"));
		        	 
		        	 /* if(aaa==14)
		        	 {		
							String sql3 = "SELECT inv_consumption_info_slave_item_name AS IName FROM inv_consumption_item_info_slave where inv_consumption_master_id = "+bbb+";";
										
	
							SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
							query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> data3 = query3.list();
							//System.err.println("ot len-----------------------"+data1.size());
							for (Map<String, Object> row3 : data3) {
									
								objDTO1.setInventoryName((String) row3.get("IName"));
								//listServiceIpdDto.add(objDTO);
							}
						
					}*/
		        	 
		        	 
		        	 if(!(otProc.equals(null) || otProc.equals("0") || otProc.equals("-")))
		        	 {
		        	 if(aaa==4)
		        	 {
						//otProc = (String) row.get("ot_procedure").toString();
						if (otProc.equals(null) || otProc.equals("0")) {
	
						} else {
	
							String sql2 = "SELECT GROUP_CONCAT(o.OName SEPARATOR ' , ') AS OName "
										+ "FROM (ehat_view_patient_service_detail_ipd b join operation o)"
										+ "where b.treatment_id='"+treatmentId+"' and b.service_id='4' and o.status='Y' and o.Operation_id in("+otProc+")";
	
							SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
							query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> data2 = query2.list();
							//System.err.println("ot lennnnnnn-----------------------"+data2.size());
							for (Map<String, Object> row2 : data2) {
									
								objDTO1.setOtProcedure((String) row2.get("OName"));
								//listServiceIpdDto.add(objDTO);
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
	// Added by vinod end
		
		@Override
		public int setSponsorRateToSelfPatient(String labservicelist,String servicelist,
				Integer treatmentId, Integer patientId,Integer sponsorId,Integer sponsorSlaveId,String callFrom,Integer userId) {
			
			try {		
				if(callFrom.equalsIgnoreCase("IPD")){ 
					
					int HallId=2;
					int HallSlaveId=0;				
					int bedServiceId=3;
					double HallCharges=0;
					double nursingCharges=0;				
					
				
					//String sql10 = "SELECT ifnull(c.selfId,0) as hallId from ehat_bill_details_ipd e, beds b, ehat_charges_master_slave c where e.service_id=3 and e.treatment_id = "+treatmentId+" and e.sub_service_id = b.Bed_ID and b.Hall_ID = c.id and e.on_bed_flag = 'Y' and e.sub_service_id > 0 and e.deleted='N' and e.cancle='N' ";
					String sql10 = "SELECT ifnull(c.id,0) as hallId from ehat_bill_details_ipd e, beds b, ehat_charges_master_slave c where e.service_id=3 and e.treatment_id = "+treatmentId+" and e.sub_service_id = b.Bed_ID and b.Hall_ID = c.id and e.on_bed_flag = 'Y' and e.sub_service_id > 0 and e.deleted='N' and e.cancle='N' ";
					SQLQuery query10 = sessionFactory.getCurrentSession().createSQLQuery(sql10);
					HallSlaveId = ((Number)query10.uniqueResult()).intValue();
					
					/* query10.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			        @SuppressWarnings("unchecked")
					List<Map<String, Object>> data10 = query10.list();   
			        for(Map<String, Object> row10 : data10){
			        	
			        	BigInteger	HallSlaveIddd=((BigInteger)row10.get("ehat_hallid"));
			        	int HallSlaveIdInt=HallSlaveIddd.intValue();
			        	if(HallSlaveIdInt > 0){
			        		HallSlaveId=HallSlaveIdInt;
			        	}
			        }*/
					         
			        ArrayList<Integer> SubservId=new ArrayList<Integer>();	
			        ArrayList<Integer> labservicelistArray=new ArrayList<Integer>();
			       
					String[] mstIds;		        
			        if(labservicelist.length()>0){
						
						mstIds=labservicelist.split(",");
						for(String id:mstIds){
							
							labservicelistArray.add(Integer.parseInt(id));					
						}
					}		       
				 	
			        if(labservicelist=="" || labservicelist.contentEquals("")){
				 		   	
				 	}else {
				 		String sql1="";
				 		    String sqlCount="SELECT count(*) FROM ehat_configuration_services_view where service_id in("+labservicelist+") and charges_id="+sponsorId+" and id_charges_slave="+sponsorSlaveId+" and hall_id="+HallId+" and hallSlave_id="+HallSlaveId+" order by service_id ASC ";
				 		   SQLQuery queryCount = sessionFactory.getCurrentSession().createSQLQuery(sqlCount);
				 		  int countHall=((Number) queryCount.uniqueResult()).intValue();
				 		     if(countHall > 0) {
				 		    	   sql1 = "SELECT * FROM ehat_configuration_services_view where service_id in("+labservicelist+") and charges_id="+sponsorId+" and id_charges_slave="+sponsorSlaveId+" and hall_id="+HallId+" and hallSlave_id="+HallSlaveId+" order by service_id ASC ";
				 		     }else {
				 		         String sqlSelfId="select selfId from ehat_charges_master_slave where  id="+HallSlaveId+" ";
				 		         SQLQuery querySelfId = sessionFactory.getCurrentSession().createSQLQuery(sqlSelfId);
				 		        HallSlaveId= ((Number) querySelfId.uniqueResult()).intValue();
				 		         sql1 = "SELECT * FROM ehat_configuration_services_view where service_id in("+labservicelist+") and charges_id="+sponsorId+" and id_charges_slave="+sponsorSlaveId+" and hall_id="+HallId+" and hallSlave_id="+HallSlaveId+" order by service_id ASC ";
				 		     }
				 		    
				 		  
				 		  
						SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
						query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						@SuppressWarnings("unchecked")
						List<Map<String, Object>> data1 = query1.list();   
						for(Map<String, Object> row : data1){
							
							int ssId=((Integer)row.get("service_id"));
							SubservId.add(ssId);
							String catName=((String)row.get("category_name"));
							Double SponRate=((Double)row.get("charges")); 	
							HallCharges=((Double)row.get("hall_charges")); 	
							nursingCharges=((Double)row.get("medical_team_charges")); 	
							        	 
							String sql2 = "SELECT * FROM ehat_bill_details_ipd where sub_service_id ="+ssId+" and treatment_id = "+treatmentId+" and patient_id = "+patientId+" and deleted = 'N'";
							SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
							query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							@SuppressWarnings("unchecked")
							List<Map<String, Object>> data2 = query2.list();   
							for(Map<String, Object> row2 : data2){
							
								int billDetailsId = ((Integer)row2.get("bill_details_id"));
								Double qty=((Double)row2.get("quantity"));
								Double conPer=((Double)row2.get("concession_per")); 
									        	 
								Double amt= (double) (Math.round( SponRate * qty));
								Double concAmt=(double) (Math.round((amt/100)*conPer));
								Double otherPay=(double) (Math.round( amt - concAmt));
								Double otherCoPay=0.0;
									        	
								String sql3 = "update ehat_bill_details_ipd set sponsor_id="+sponsorId+",charges_slave_id="+sponsorSlaveId+",other_amount = "+amt+",other_co_pay="+otherCoPay+",other_concession="+concAmt+",other_pay="+otherPay+",other_rate="+SponRate+" "
															+ "where bill_details_id="+billDetailsId+" ";
								SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
								query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
								query3.executeUpdate();
									
							}
						}
	
						String[] servIds1 = null;
						// get checked service masters
						if(servicelist.length()>0){
										
							servIds1=servicelist.split(",");
										
							for(String id:servIds1){
								
								int servId=Integer.parseInt(id);
								if(servId==3){
									
									String sql11 = "SELECT ifnull(c.id,0) as hallId from ehat_bill_details_ipd e, beds b, ehat_charges_master_slave c where e.service_id=3 and e.treatment_id = "+treatmentId+" and e.sub_service_id = b.Bed_ID and b.Hall_ID = c.id and e.on_bed_flag = 'Y' and e.sub_service_id > 0 and e.deleted='N' and e.cancle='N' ";
									SQLQuery query11 = sessionFactory.getCurrentSession().createSQLQuery(sql11);
									HallSlaveId = ((Number)query11.uniqueResult()).intValue();
									 //check it is configure or not
									String sqlCountBed="SELECT count(*) FROM ehat_configuration_services_view where  charges_id="+sponsorId+" and id_charges_slave="+sponsorSlaveId+" and hall_id="+HallId+" and hallSlave_id="+HallSlaveId+" order by service_id ASC ";
							 		   SQLQuery queryCountBed = sessionFactory.getCurrentSession().createSQLQuery(sqlCountBed);
							 		  int countBed=((Number) queryCountBed.uniqueResult()).intValue();
							 		  
							 		 if(countBed == 0) {
						 		         String sqlSelfId="select selfId from ehat_charges_master_slave where  id="+HallSlaveId+" ";
						 		         SQLQuery querySelfId = sessionFactory.getCurrentSession().createSQLQuery(sqlSelfId);
						 		        HallSlaveId= ((Number) querySelfId.uniqueResult()).intValue();
						 		        
						 		        sqlCountBed="SELECT count(*) FROM ehat_configuration_services_view where  charges_id="+sponsorId+" and id_charges_slave="+sponsorSlaveId+" and hall_id="+HallId+" and hallSlave_id="+HallSlaveId+" order by service_id ASC ";
							 		    queryCountBed = sessionFactory.getCurrentSession().createSQLQuery(sqlCountBed);
							 		   countBed=((Number) queryCountBed.uniqueResult()).intValue();
						 		        
						 		     }
						 		    
							 		  
							 		  if(countBed > 0) {
							 			  
							 			    // get isolation flag
							 			    String iSql=" select isolation from treatment_beds where Treatment_ID="+treatmentId+" and status='Y'  limit 1";
							 			   SQLQuery queryIso = sessionFactory.getCurrentSession().createSQLQuery(iSql);
									 		  String isolation=(String) queryIso.uniqueResult();
									     
									 		  
									 		  String sql = " select  ifnull(hall_charges,0) as hall_charges,ifnull(medical_team_charges,0) as medical_team_charges,ifnull(iso_hall_charges,0) as iso_hall_charges,ifnull(iso_medical_team_charges,0) as iso_medical_team_charges from ehat_configuration_services where deleted = 'N' " 
									         + " AND chargesSlave_id = "+sponsorSlaveId+"	AND hallSlave_id = "+HallSlaveId+" AND is_com_servlastId = 0 limit 1 ";
							 		 
									       SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
											query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
											@SuppressWarnings("unchecked")
											List<Map<String, Object>> data2 = query2.list();   
											for(Map<String, Object> row2 : data2){
											
												HallCharges = ((Double)row2.get("hall_charges"));
												nursingCharges = ((Double)row2.get("medical_team_charges"));
												if(isolation.equalsIgnoreCase("1")) {
												   HallCharges = ((Double)row2.get("iso_hall_charges"));
												   nursingCharges = ((Double)row2.get("iso_medical_team_charges"));
												}
											}
									       
							 		  }
									   // end charges
									   
										// get bill details id of current bed
							 		 String sqlBillDetails = "SELECT GROUP_CONCAT(DISTINCT bill_details_id SEPARATOR ',')  from ehat_bill_details_ipd e where  e.treatment_id = "+treatmentId+"  and e.on_bed_flag = 'Y'  and e.deleted='N' and e.cancle='N' ";
										SQLQuery queryBillDetails = sessionFactory.getCurrentSession().createSQLQuery(sqlBillDetails);
										String billDetailsId = (String)queryBillDetails.uniqueResult();
							 		  // end bill details
									
									ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
									String hospitalName = bundle.getObject("hospitalname").toString();
									//check for bed shift charges
									if (hospitalName.equalsIgnoreCase("Siddhivinayak")) {
										checkChargesBillingForBed2(treatmentId, sponsorId, sponsorSlaveId, HallCharges,
												nursingCharges,billDetailsId);
									} else {

										String sql3 = "update ehat_bill_details_ipd set sponsor_id=" + sponsorId
												+ ",charges_slave_id=" + sponsorSlaveId + ",other_amount = "
												+ HallCharges + ",other_co_pay=" + HallCharges + ",other_pay="
												+ HallCharges + ",other_rate=" + HallCharges + " "
												+ "where treatment_id = " + treatmentId + " and service_id="
												+ bedServiceId + " and sub_service_id > 0 and bill_details_id in("
												+ billDetailsId + ")   ";
										SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
										query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
										query3.executeUpdate();

										String sql4 = "update ehat_bill_details_ipd set sponsor_id=" + sponsorId
												+ ",charges_slave_id=" + sponsorSlaveId + ",other_amount = "
												+ nursingCharges + ",other_co_pay=" + nursingCharges + ",other_pay="
												+ nursingCharges + ",other_rate=" + nursingCharges + " "
												+ "where treatment_id = " + treatmentId + " and service_id="
												+ bedServiceId + " and sub_service_id = 0  and bill_details_id in("
												+ billDetailsId + ")  ";
										SQLQuery query4 = sessionFactory.getCurrentSession().createSQLQuery(sql4);
										query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
										query4.executeUpdate();
									}
							        
								}else if(servId==2) {// added for consulting charges
									String sql11 = "SELECT ifnull(c.id,0) as hallId from ehat_bill_details_ipd e, beds b, ehat_charges_master_slave c where e.service_id=3 and e.treatment_id = "+treatmentId+" and e.sub_service_id = b.Bed_ID and b.Hall_ID = c.id and e.on_bed_flag = 'Y' and e.sub_service_id > 0 and e.deleted='N' and e.cancle='N' ";
									SQLQuery query11 = sessionFactory.getCurrentSession().createSQLQuery(sql11);
									HallSlaveId = ((Number)query11.uniqueResult()).intValue();
									
									 //check it is configure or not
									
						 		         String sqlSelfId="select selfId from ehat_charges_master_slave where  id="+HallSlaveId+" ";
						 		         SQLQuery querySelfId = sessionFactory.getCurrentSession().createSQLQuery(sqlSelfId);
						 		        HallSlaveId= ((Number) querySelfId.uniqueResult()).intValue();
						 		        
						 		        
									      String sqlDoctor="select  *  from ehat_bill_details_ipd where treatment_id="+treatmentId+" and service_id=2 and deleted='N'  ";
									      SQLQuery queryDoctor = sessionFactory.getCurrentSession().createSQLQuery(sqlDoctor);
									      queryDoctor.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
										    @SuppressWarnings("unchecked")
										    List<Map<String, Object>> dataDoctor = queryDoctor.list();   
												    for(Map<String, Object> row : dataDoctor){
												    	int ssId = ((Number)row.get("sub_service_id")).intValue();
												    	SubservId.add(ssId);
												    	int doctor_id = ((Number)row.get("doctor_id")).intValue();
												    	int billDetailsId = ((Number)row.get("bill_details_id")).intValue();
											        	
												    	
												    	String sqlConsultanctcount= "select count(*) from ehat_consultation_charges_master where dr_id="+doctor_id+" and sponserslave_id="+sponsorSlaveId+" and hallslave_id="+HallSlaveId+" and deleted = 'N' limit 1";
												    	 SQLQuery queryConsultantcount = sessionFactory.getCurrentSession().createSQLQuery(sqlConsultanctcount);
												    	 int consultantCOunt=((Number) queryConsultantcount.uniqueResult()).intValue();
												    	 if(consultantCOunt == 0)
												    		 continue;
												    	 
												    	
												    	String sqlConsultanct= "select ifnull(consult_amnt,0) as consult_amnt from ehat_consultation_charges_master where dr_id="+doctor_id+" and sponserslave_id="+sponsorSlaveId+" and hallslave_id="+HallSlaveId+" and deleted = 'N' limit 1";
												    	 SQLQuery queryConsultant = sessionFactory.getCurrentSession().createSQLQuery(sqlConsultanct);
												    	 Double counsultantAmt=(Double) queryConsultant.uniqueResult();
													    	 if(counsultantAmt > 0) {
													    		  Double qty=((Double)row.get("quantity"));
													    		  Double amt= (double) (Math.round( counsultantAmt * qty));
														        	Double rate=((Double)row.get("rate"));
														        	
														        	Double conPer=((Double)row.get("concession_per")); 
														        	
														        	
														        	Double concAmt=(double) (Math.round((amt/100)*conPer));
														        	Double otherPay=(double) (Math.round( amt - concAmt));
														        	Double otherCoPay=0.0;
														        	
														        	//String sql3 = "update ehat_bill_details_ipd set sponsor_id="+sponsorId+",charges_slave_id="+sponsorSlaveId+" "
														         String sql3 = "update ehat_bill_details_ipd set sponsor_id="+sponsorId+",charges_slave_id="+sponsorSlaveId+",other_amount = "+amt+",other_co_pay="+otherCoPay+",other_concession="+concAmt+",other_pay="+otherPay+",other_rate="+amt+" "
																				+ "where bill_details_id="+billDetailsId+" ";
																	SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
																	query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
																	query3.executeUpdate();
													    		 
													    	 }
												    }
									
								}else if(servId==5) { // added for set doctor round sponsor rate 
									String sql11 = "SELECT ifnull(c.id,0) as hallId from ehat_bill_details_ipd e, beds b, ehat_charges_master_slave c where e.service_id=3 and e.treatment_id = "+treatmentId+" and e.sub_service_id = b.Bed_ID and b.Hall_ID = c.id and e.on_bed_flag = 'Y' and e.sub_service_id > 0 and e.deleted='N' and e.cancle='N' ";
									SQLQuery query11 = sessionFactory.getCurrentSession().createSQLQuery(sql11);
									HallSlaveId = ((Number)query11.uniqueResult()).intValue();
									
									 String sqlSelfId="select selfId from ehat_charges_master_slave where  id="+HallSlaveId+" ";
					 		         SQLQuery querySelfId = sessionFactory.getCurrentSession().createSQLQuery(sqlSelfId);
					 		        HallSlaveId= ((Number) querySelfId.uniqueResult()).intValue();
									  
								      String sqlDoctor="select  *  from ehat_bill_details_ipd where treatment_id="+treatmentId+" and service_id=5 and deleted='N'  ";
								      SQLQuery queryDoctor = sessionFactory.getCurrentSession().createSQLQuery(sqlDoctor);
								      queryDoctor.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
									    @SuppressWarnings("unchecked")
									    List<Map<String, Object>> dataDoctor = queryDoctor.list();   
											    for(Map<String, Object> row : dataDoctor){
											    	int ssId = ((Number)row.get("sub_service_id")).intValue();
											    	SubservId.add(ssId);
											    	int doctor_id = ((Number)row.get("doctor_id")).intValue();
											    	int billDetailsId = ((Number)row.get("bill_details_id")).intValue();
											    	
											    	String sqldrCount= "select count(*) from ehat_doctorround_master where dr_id="+doctor_id+" and sponserslave_id="+sponsorSlaveId+" and hallslave_id="+HallSlaveId+" and deleted = 'N' limit 1";
											    	 SQLQuery querydrCount = sessionFactory.getCurrentSession().createSQLQuery(sqldrCount);
											    	 int dCount=((Number) querydrCount.uniqueResult()).intValue();
										        	if(dCount == 0)
										        		continue;
											    	 
											    	String sqlConsultanct= "select ifnull(dr_amnt,0) as dr_amnt from ehat_doctorround_master where dr_id="+doctor_id+" and sponserslave_id="+sponsorSlaveId+" and hallslave_id="+HallSlaveId+" and deleted = 'N' limit 1";
											    	 SQLQuery queryConsultant = sessionFactory.getCurrentSession().createSQLQuery(sqlConsultanct);
											    	
											    	 
											    	 Double counsultantAmt=(Double) queryConsultant.uniqueResult();
												    	 if(counsultantAmt > 0) {
												    		  Double qty=((Double)row.get("quantity"));
												    		  Double amt= (double) (Math.round( counsultantAmt * qty));
													        	Double rate=((Double)row.get("rate"));
													        	
													        	Double conPer=((Double)row.get("concession_per")); 
													        	
													        	
													        	Double concAmt=(double) (Math.round((amt/100)*conPer));
													        	Double otherPay=(double) (Math.round( amt - concAmt));
													        	Double otherCoPay=0.0;
													        	
													        	//String sql3 = "update ehat_bill_details_ipd set sponsor_id="+sponsorId+",charges_slave_id="+sponsorSlaveId+" "
													         String sql3 = "update ehat_bill_details_ipd set sponsor_id="+sponsorId+",charges_slave_id="+sponsorSlaveId+",other_amount = "+amt+",other_co_pay="+otherCoPay+",other_concession="+concAmt+",other_pay="+otherPay+",other_rate="+amt+" "
																			+ "where bill_details_id="+billDetailsId+" ";
																SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
																query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
																query3.executeUpdate();
												    		 
												    	 }
											    }
								
							
								}else if(servId == 13) {
									String sqlPackage="";
									
									String sqlIsComb = "select ifnull(group_concat(id),'0') from ehat_subservice ess join ehat_service_master esm where ess.service_id = esm.service_id and ess.id in("+labservicelist+") and esm.iscombination = 'Y' and ess.deleted='N' ";
						 			Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlIsComb);
						 			String isCombServIds = (String)refQuery.uniqueResult();
						 			
						 			String sql11 = "SELECT ifnull(c.id,0) as hallId from ehat_bill_details_ipd e, beds b, ehat_charges_master_slave c where e.service_id=3 and e.treatment_id = "+treatmentId+" and e.sub_service_id = b.Bed_ID and b.Hall_ID = c.id and e.on_bed_flag = 'Y' and e.sub_service_id > 0 and e.deleted='N' and e.cancle='N' ";
									SQLQuery query11 = sessionFactory.getCurrentSession().createSQLQuery(sql11);
									HallSlaveId = ((Number)query11.uniqueResult()).intValue();
									
						 			 String sqlPCount = "select count(*)  from ehat_configuration_services where is_com_servlastId in("+isCombServIds+") and chargesSlave_id="+sponsorSlaveId+" and hall_id ="+HallId+" and hallSlave_id="+HallSlaveId+" ";
						 			   SQLQuery qpCount=sessionFactory.getCurrentSession().createSQLQuery(sqlPCount);  
						 			 int pcount =((Number) qpCount.uniqueResult()).intValue();
						 			 if(pcount > 0) {
						 				sqlPackage = "select ifnull(is_com_servlastId,0) as service_id, ifnull(distribute,0) as charges  from ehat_configuration_services where is_com_servlastId in("+isCombServIds+") and chargesSlave_id="+sponsorSlaveId+" and hall_id ="+HallId+" and hallSlave_id="+HallSlaveId+" order by is_com_servlastId ASC ";
						 			 }else  {
						 				 
						 				 String sqlSelfId="select selfId from ehat_charges_master_slave where  id="+HallSlaveId+" ";
						 		         SQLQuery querySelfId = sessionFactory.getCurrentSession().createSQLQuery(sqlSelfId);
						 		        HallSlaveId= ((Number) querySelfId.uniqueResult()).intValue();
						 		        
						 		        sqlPCount = "select count(*)  from ehat_configuration_services where is_com_servlastId in("+isCombServIds+") and chargesSlave_id="+sponsorSlaveId+" and hall_id ="+HallId+" and hallSlave_id="+HallSlaveId+" ";
						 		        pcount =((Number) qpCount.uniqueResult()).intValue();
						 			  
						 		          if(pcount > 0) {
							 				sqlPackage = "select ifnull(is_com_servlastId,0) as service_id, ifnull(distribute,0) as charges  from ehat_configuration_services where is_com_servlastId in("+isCombServIds+") and chargesSlave_id="+sponsorSlaveId+" and hall_id ="+HallId+" and hallSlave_id="+HallSlaveId+" order by is_com_servlastId ASC ";
							 			 }else {
							 				sqlPackage = "SELECT ifnull(is_com_servlastId,0) as service_id, ifnull(distribute,0) as charges FROM ehat_configuration_services where is_com_servlastId in("+isCombServIds+") and chargesSlave_id="+sponsorSlaveId+" and hallSlave_id = 0 order by is_com_servlastId ASC"; 
							 			 }
						 		      
						 			 }
						 			 
						 			 
					 				 
					 				SQLQuery queryPackage = sessionFactory.getCurrentSession().createSQLQuery(sqlPackage);
					 				queryPackage.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
								    @SuppressWarnings("unchecked")
								    List<Map<String, Object>> dataPack = queryPackage.list();   
								    for(Map<String, Object> row : dataPack){
								    
								    	int ssId = ((Number)row.get("service_id")).intValue();
							        	Double SponRate=((Double)row.get("charges"));
							        	if(SponRate > 0) {
							        		SubservId.add(ssId);
							        		String sql2 = "SELECT * FROM ehat_bill_details_ipd where sub_service_id ="+ssId+" and treatment_id = "+treatmentId+" and patient_id = "+patientId+" and deleted = 'N'";
								        	SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
								        	query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
								        	@SuppressWarnings("unchecked")
								        	List<Map<String, Object>> data2 = query2.list();   
								        	for(Map<String, Object> row2 : data2){
										 	
								        		int billDetailsId=((Integer)row2.get("bill_details_id"));
									        	Double qty=((Double)row2.get("quantity"));
									        	Double conPer=((Double)row2.get("concession_per")); 
									        	Double amt= (double) (Math.round( SponRate * qty));
									        	Double concAmt=(double) (Math.round((amt/100)*conPer));
									        	Double otherPay=(double) (Math.round( amt - concAmt));
									        	Double otherCoPay=0.0;
										  	
											    String sql3 = "update ehat_bill_details_ipd set sponsor_id="+sponsorId+",charges_slave_id="+sponsorSlaveId+", other_amount = "+amt+",other_co_pay="+otherCoPay+",other_concession="+concAmt+",other_pay="+otherPay+",other_rate="+SponRate+" "
															+ "where bill_details_id="+billDetailsId+" ";
											    SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
										        query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
										        query3.executeUpdate();
								        	}
							        	}
								    }
					 			
								}
								
								// Added Rohini Ambhore for set Ot sponsor rate 12-02-2024
								else if(servId== 4) {
									
									String sql11 = "SELECT ifnull(c.id,0) as hallId from ehat_bill_details_ipd e, beds b, ehat_charges_master_slave c where e.service_id=3 and e.treatment_id = "+treatmentId+" and e.sub_service_id = b.Bed_ID and b.Hall_ID = c.id and e.on_bed_flag = 'Y' and e.sub_service_id > 0 and e.deleted='N' and e.cancle='N' ";
									SQLQuery query11 = sessionFactory.getCurrentSession().createSQLQuery(sql11);
									HallSlaveId = ((Number)query11.uniqueResult()).intValue();
									
									 String sqlSelfId="select selfId from ehat_charges_master_slave where  id="+HallSlaveId+" ";
					 		         SQLQuery querySelfId = sessionFactory.getCurrentSession().createSQLQuery(sqlSelfId);
					 		        HallSlaveId= ((Number) querySelfId.uniqueResult()).intValue();
									  

									ResourceBundle resourceEhat = ResourceBundle.getBundle("OT_Service");
						            String MainSurgan = resourceEhat.getObject("MainSurgan").toString();
						            String AsistanSurgan = resourceEhat.getObject("AsistanSurgan").toString();
						           String OTTheator = resourceEhat.getObject("OTTheator").toString();
						            String AnethesiaNormal = resourceEhat.getObject("AnethesiaNormal").toString();
						            String AnethesiaStandBy = resourceEhat.getObject("AnethesiaStandBy").toString();
						            String AnethesiaASAIV = resourceEhat.getObject("AnethesiaASAIV").toString();
						            List<Integer> lstIds=new ArrayList<>();
						            
						          /*  String sqllstIds="select group_concat(distinct sub_service_id) from ehat_bill_details_ipd where treatment_id="+treatmentId+" and service_id=4 and deleted='N'  ";
								    SQLQuery queryIds = sessionFactory.getCurrentSession().createSQLQuery(sqllstIds);
								    queryIds.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
									@SuppressWarnings("unchecked")
									List<Integer> lstIds1 =  queryIds.list();  */
						           
						            
								    String sqlDoctor="select  *  from ehat_bill_details_ipd where treatment_id="+treatmentId+" and service_id=4 and deleted='N'  ";
								    SQLQuery queryDoctor = sessionFactory.getCurrentSession().createSQLQuery(sqlDoctor);
								    queryDoctor.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
									@SuppressWarnings("unchecked")
									List<Map<String, Object>> dataDoctor = queryDoctor.list();   
									  for(Map<String, Object> row : dataDoctor){
											 int ssId = ((Number)row.get("sub_service_id")).intValue();
											    	SubservId.add(ssId);
											    	int doctor_id = ((Number)row.get("doctor_id")).intValue();
											    	int billDetailsId = ((Number)row.get("bill_details_id")).intValue();
											    	Integer pid = ((Number)row.get("patient_id")).intValue();
											    	
											    	String ssid1 =Integer.toString(ssId);
											    	
											    	double perAmt=0.0;
											    	int topId =0;
										           
										         //  String sqlTopId="select Id from treatment_operations where  patient_id="+pid+" and treatment_id="+treatmentId+" ";
									 		       //  SQLQuery querytopId = sessionFactory.getCurrentSession().createSQLQuery(sqlTopId);
									 		        //topId= ((Number) querytopId.uniqueResult()).intValue();
									 		      
											    	topId = ((Number)row.get("count_ot")).intValue();
											    	
										            if(MainSurgan.equalsIgnoreCase(ssid1)){	
							        					
							        					 perAmt=fetchOperationCount( treatmentId, Integer.parseInt(MainSurgan), topId, pid);
							        					 lstIds.add(Integer.parseInt(MainSurgan));	
							        				}
												    if(AsistanSurgan.equalsIgnoreCase(ssid1)){	
							        					
							        					 perAmt=fetchOperationCount( treatmentId, Integer.parseInt(AsistanSurgan), topId, pid);
							        					 lstIds.add(Integer.parseInt(AsistanSurgan));	
							        				}
							        			    if(AnethesiaNormal.equalsIgnoreCase(ssid1)){	
												        perAmt=fetchOperationCount( treatmentId, Integer.parseInt(AnethesiaNormal), topId,pid);	
												        lstIds.add(Integer.parseInt(AnethesiaNormal));
							        				}
												    
							        			 String sql3 = "update ehat_bill_details_ipd set sponsor_id="+sponsorId+",charges_slave_id="+sponsorSlaveId+",other_amount = "+perAmt+",other_co_pay="+perAmt+",other_pay="+perAmt+",other_rate="+perAmt+" "
															+ "where bill_details_id="+billDetailsId+" ";
												SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
												query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
												query3.executeUpdate();
												   	
											    }
									//added for those services not configured with team
						            	List<OTPercentageDTO> listOtPer = fetchOTPercentage();
						            	 List<Integer> lstAllOtPer=new ArrayList<>();// add all surgen charges services 
						            	  for(OTPercentageDTO pobj: listOtPer) {
						            		  lstAllOtPer.add(pobj.getChildSubServiceId());
						            	  }
											    for(Map<String, Object> row : dataDoctor){
											    	int ssId = ((Number)row.get("sub_service_id")).intValue();
											    	SubservId.add(ssId);
											    	int billDetailsId = ((Number)row.get("bill_details_id")).intValue();
											    	Integer pid = ((Number)row.get("patient_id")).intValue();
											    	
											    	String ssid1 =Integer.toString(ssId);
											    	
											    	Integer ssId12 = ((Number)row.get("sub_service_id")).intValue();
											    	double perAmt=0.0;
											    	int topId =0;
										           
										          // String sqlTopId="select Id from treatment_operations where  patient_id="+pid+" and treatment_id="+treatmentId+" ";
									 		      // SQLQuery querytopId = sessionFactory.getCurrentSession().createSQLQuery(sqlTopId);
									 		      // topId= ((Number) querytopId.uniqueResult()).intValue();
											    	topId = ((Number)row.get("count_ot")).intValue();
											    	
									            			if(lstIds.contains(ssId12)) {
									            		    	continue;
									            		    }else {
									            		    	 perAmt=0.0;  
									             				 perAmt=fetchOperationCount( treatmentId, ssId, topId, pid);
									             				
									             				  String sql31 = "update ehat_bill_details_ipd set sponsor_id="+sponsorId+",charges_slave_id="+sponsorSlaveId+",other_amount = "+perAmt+",other_co_pay="+perAmt+",other_pay="+perAmt+",other_rate="+perAmt+" "
																			+ "where bill_details_id="+billDetailsId+" ";
																SQLQuery query31 = sessionFactory.getCurrentSession().createSQLQuery(sql31);
																query31.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
																query31.executeUpdate();
									             			
									            		    }	
											    }
								}
							}
						}
				 	}
				 		 		
				 	labservicelistArray.removeAll(SubservId);
				 	if(labservicelistArray.size() > 0){
				 			
				 		String sql2 = "SELECT * FROM ehat_bill_details_ipd where sub_service_id in(:labservicelistArray) and treatment_id = "+treatmentId+" and patient_id = "+patientId+" and deleted = 'N'";
						SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
						query2.setParameterList("labservicelistArray",labservicelistArray);
				        query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				        @SuppressWarnings("unchecked")
						List<Map<String, Object>> data2 = query2.list();   
				        for(Map<String, Object> row2 : data2){
				        	
				        	int billDetailsId=((Integer)row2.get("bill_details_id"));
				        	Double rate=((Double)row2.get("rate"));
				        	Double qty=((Double)row2.get("quantity"));
				        	Double conPer=((Double)row2.get("concession_per")); 
				        	
				        	Double amt= (double) (Math.round( rate * qty));
				        	Double concAmt=(double) (Math.round((amt/100)*conPer));
				        	Double otherPay=(double) (Math.round( amt - concAmt));
				        	Double otherCoPay=0.0;
				        	
				        	int service_id=((Integer)row2.get("service_id"));
				        	if(service_id ==3)
				        		continue;
				        	//String sql3 = "update ehat_bill_details_ipd set sponsor_id="+sponsorId+",charges_slave_id="+sponsorSlaveId+" "
				         String sql3 = "update ehat_bill_details_ipd set sponsor_id="+sponsorId+",charges_slave_id="+sponsorSlaveId+",other_amount = "+amt+",other_co_pay="+otherCoPay+",other_concession="+concAmt+",other_pay="+otherPay+",other_rate="+rate+" "
										+ "where bill_details_id="+billDetailsId+" ";
							SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
							query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
							query3.executeUpdate();
				        }
				 	}
				 	
				 	
                  // updated Rohini on 30-01-2024 for registration charges of ipd
			 		
			 		String sqlCount = "SELECT count(*) FROM ehat_bill_details_ipd where service_id =1 and treatment_id = "+treatmentId+" and patient_id = "+patientId+" and deleted = 'N'";
		        	SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sqlCount);       	
		        	int count = ((Number)query2.uniqueResult()).intValue();
		        	
		        	if(count > 0) {
		        		
		        		String sqlBillDetailsId = "SELECT bill_details_id FROM ehat_bill_details_ipd where service_id =1 and treatment_id = "+treatmentId+" and patient_id = "+patientId+" and deleted = 'N'";
			        	SQLQuery querybilld = sessionFactory.getCurrentSession().createSQLQuery(sqlBillDetailsId);       	
			        	int billDetailsId = ((Number)querybilld.uniqueResult()).intValue();
		        	
			        	String sqlbedId = "SELECT sub_service_id FROM ehat_bill_details_ipd where service_id =3 and sub_service_id != 0  and on_bed_flag ='Y' and treatment_id = "+treatmentId+" and patient_id = "+patientId+" and deleted = 'N'";
			        	SQLQuery querybedId = sessionFactory.getCurrentSession().createSQLQuery(sqlbedId);       	
			        	int bedId = ((Number)querybedId.uniqueResult()).intValue();
			        	
			        	String sqlhal = "select ifnull(Hall_ID,0) as hallId from beds where Bed_ID="+bedId+" and deleted='N' ";
						Query query = sessionFactory.getCurrentSession().createSQLQuery(sqlhal);
						int hallId1 = ((Number)query.uniqueResult()).intValue();
						
						sqlhal = "select ifnull(selfId,0) as hallTypeId from ehat_charges_master_slave where id="+hallId1+" and deleted='N' ";
						Query que = sessionFactory.getCurrentSession().createSQLQuery(sqlhal);
						int hallTypeId1 = ((Number)que.uniqueResult()).intValue();
						
						
						
			        	String	sqlReg = "";
			        	
			        		    sqlReg = "call sp_reg_get_registration_charges_sponser_ipd(:unit_id,:department_id,:service_id,:patient_id,:treatment_id,:charges_slave_id,:query_type,:hallTypeId)";
			        	
		    			Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlReg);
		    			
		    			spQuery.setParameter("unit_id", 1); // regDto.getUnitId());
		    			spQuery.setParameter("department_id", 2);
		    			spQuery.setParameter("service_id", 1);
		    			spQuery.setParameter("patient_id", patientId);
		    			spQuery.setParameter("treatment_id", treatmentId);
		    			spQuery.setParameter("charges_slave_id", sponsorSlaveId);
		    			spQuery.setParameter("query_type","insert");
		    			spQuery.setParameter("hallTypeId", hallTypeId1);
		    			spQuery.setResultTransformer(new AliasToBeanResultTransformer(PatientRegChargesDto.class));
		    			@SuppressWarnings("unchecked")
		    			List<PatientRegChargesDto> ltRegChargesDto = spQuery.list();
		    			for(PatientRegChargesDto obj : ltRegChargesDto) {
		    				
		    				String sql3 = "update ehat_bill_details_ipd set sponsor_id="+sponsorId+",charges_slave_id="+sponsorSlaveId+", other_amount = "+obj.getN_other_amount()+",other_co_pay="+obj.getN_amount()+", other_pay="+obj.getN_other_amount()+",other_rate="+obj.getN_other_amount()+" "
									+ "where bill_details_id="+billDetailsId+" ";
		    				
					    SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
				        query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
				        query3.executeUpdate();
		    				
		    			}
		        	}
							        
				}else{
			 		
			 		if(labservicelist=="" || labservicelist.contentEquals("")){
			 		   	
			 		}
			 		else {
			 			
			 			String sqlIsComb = "select ifnull(group_concat(id),'0') from ehat_subservice ess join ehat_service_master esm where ess.service_id = esm.service_id and ess.id in("+labservicelist+") and esm.iscombination = 'Y' and ess.deleted='N' ";
			 			Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlIsComb);
			 			String isCombServIds = (String)refQuery.uniqueResult();
			 			  
			 			String sql1 = "";
			 			if(!isCombServIds.equals("0")) {
			 				 
			 				sql1 = "SELECT ifnull(is_com_servlastId,0) as service_id, ifnull(distribute,0) as charges FROM ehat_configuration_services where is_com_servlastId in("+isCombServIds+") and chargesSlave_id="+sponsorSlaveId+" and hallSlave_id = 0 order by is_com_servlastId ASC";
			 				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
						    query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						    @SuppressWarnings("unchecked")
						    List<Map<String, Object>> data1 = query1.list();   
						    for(Map<String, Object> row : data1){
						    
						    	int ssId = ((Number)row.get("service_id")).intValue();
					        	Double SponRate=((Double)row.get("charges"));
					        	if(SponRate > 0) {
					        		
					        		String sql2 = "SELECT * FROM ehat_bill_details where sub_service_id ="+ssId+" and treatment_id = "+treatmentId+" and patient_id = "+patientId+" and deleted = 'N'";
						        	SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
						        	query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						        	@SuppressWarnings("unchecked")
						        	List<Map<String, Object>> data2 = query2.list();   
						        	for(Map<String, Object> row2 : data2){
								 	
						        		int billDetailsId=((Integer)row2.get("bill_details_id"));
							        	Double qty=((Double)row2.get("quantity"));
							        	Double conPer=((Double)row2.get("concession_in_Perc")); 
							        	Double amt= (double) (Math.round( SponRate * qty));
							        	Double concAmt=(double) (Math.round((amt/100)*conPer));
							        	Double otherPay=(double) (Math.round( amt - concAmt));
							        	Double otherCoPay=0.0;
								  	
									    String sql3 = "update ehat_bill_details set sponsor_id="+sponsorId+",charges_slave_id="+sponsorSlaveId+", other_amount = "+amt+",other_co_pay="+otherCoPay+",other_concession="+concAmt+",other_pay="+otherPay+",other_rate="+SponRate+" "
													+ "where bill_details_id="+billDetailsId+" ";
									    SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
								        query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
								        query3.executeUpdate();
						        	}
					        	}
						    }
			 			}else {
			 				 
			 				sql1 = "SELECT ifnull(service_id,0) as service_id, ifnull(charges,0) as charges FROM ehat_configuration_services where service_id in("+labservicelist+") and service_id not in("+isCombServIds+") and chargesSlave_id="+sponsorSlaveId+" and hallSlave_id = 0 and is_com_servlastId = 0 order by service_id ASC";
			 				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
						    query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						    @SuppressWarnings("unchecked")
						    List<Map<String, Object>> data1 = query1.list();   
						    for(Map<String, Object> row : data1){
						    
						    	int ssId = ((Number)row.get("service_id")).intValue();
					        	Double SponRate=((Double)row.get("charges")); 
					        	
					        	if(SponRate > 0) {
					        		
					        		String sql2 = "SELECT * FROM ehat_bill_details where sub_service_id ="+ssId+" and treatment_id = "+treatmentId+" and patient_id = "+patientId+" and deleted = 'N'";
						        	SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
						        	query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						        	@SuppressWarnings("unchecked")
						        	List<Map<String, Object>> data2 = query2.list();   
						        	for(Map<String, Object> row2 : data2){
								 	
						        		int billDetailsId=((Integer)row2.get("bill_details_id"));
							        	Double qty=((Double)row2.get("quantity"));
							        	Double conPer=((Double)row2.get("concession_in_Perc")); 
							        	Double amt= (double) (Math.round( SponRate * qty));
							        	Double concAmt=(double) (Math.round((amt/100)*conPer));
							        	Double otherPay=(double) (Math.round( amt - concAmt));
							        	Double otherCoPay=0.0;
								  	
									    String sql3 = "update ehat_bill_details set sponsor_id="+sponsorId+",charges_slave_id="+sponsorSlaveId+", other_amount = "+amt+",other_co_pay="+otherCoPay+",other_concession="+concAmt+",other_pay="+otherPay+",other_rate="+SponRate+" "
													+ "where bill_details_id="+billDetailsId+" ";
									    SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
								        query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
								        query3.executeUpdate();
						        	}
					        	}
						    }
			 			}
			 		}
			 		
			 		
			 		// updated Rohini on 30-01-2024 for registration charges 
			 		
			 		String sqlCount = "SELECT count(*) FROM ehat_bill_details where service_id =1 and treatment_id = "+treatmentId+" and patient_id = "+patientId+" and deleted = 'N'";
		        	SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sqlCount);       	
		        	int count = ((Number)query2.uniqueResult()).intValue();
		        	
		        	if(count > 0) {
		        		
		        		String sqlBillDetailsId = "SELECT bill_details_id FROM ehat_bill_details where service_id =1 and treatment_id = "+treatmentId+" and patient_id = "+patientId+" and deleted = 'N'";
			        	SQLQuery querybilld = sessionFactory.getCurrentSession().createSQLQuery(sqlBillDetailsId);       	
			        	int billDetailsId = ((Number)querybilld.uniqueResult()).intValue();
		        	
			        	String	sqlReg = "";
			        	
			        	if(callFrom.equalsIgnoreCase("DIAG")) {
			        		    sqlReg = "call sp_reg_get_registration_charges_Sponser_diagnostic(:unit_id,:department_id,:service_id,:patient_id,:treatment_id,:charges_slave_id,:query_type)";
			        	}else {
		        	          	sqlReg = "call sp_reg_get_registration_charges_Sponser_opd(:unit_id,:department_id,:service_id,:patient_id,:treatment_id,:charges_slave_id,:query_type)";
			        	}
		        		
		    			Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlReg);
		    			
		    			spQuery.setParameter("unit_id", 1); // regDto.getUnitId());
		    			spQuery.setParameter("department_id", 1);
		    			spQuery.setParameter("service_id", 1);
		    			spQuery.setParameter("patient_id", patientId);
		    			spQuery.setParameter("treatment_id", treatmentId);
		    			spQuery.setParameter("charges_slave_id", sponsorSlaveId);
		    			spQuery.setParameter("query_type","insert");			
		    			spQuery.setResultTransformer(new AliasToBeanResultTransformer(PatientRegChargesDto.class));
		    			@SuppressWarnings("unchecked")
		    			List<PatientRegChargesDto> ltRegChargesDto = spQuery.list();
		    			for(PatientRegChargesDto obj : ltRegChargesDto) {
		    				
		    				String sql3 = "update ehat_bill_details set sponsor_id="+sponsorId+",charges_slave_id="+sponsorSlaveId+", other_amount = "+obj.getN_other_amount()+",other_co_pay="+obj.getN_amount()+", other_pay="+obj.getN_other_amount()+",other_rate="+obj.getN_other_amount()+" "
									+ "where bill_details_id="+billDetailsId+" ";
					    SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
				        query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
				        query3.executeUpdate();
		    				
		    			}
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
		
	

	public int setMultiSponsorTotalsForIpd(IpdBillReceiptMasterDTO billRecMaster,Session session) {
		
		int result=0;
		try {
			
			int treatmentId = billRecMaster.getTreatmentId();
			
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
			String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");   
			String pharmacy_Serve_Id = (String)resourceBundleEhat.getString("pharmacy");    
			int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
			int pharmacyServId = Integer.parseInt(pharmacy_Serve_Id);
						
			String sql="select count(treatment_id) FROM ehat_multiple_sponsor where deleted='N' and treatment_id="+treatmentId;
			Query countQuery = session.createSQLQuery(sql);			
			int count = ((Number)countQuery.uniqueResult()).intValue();
			
			if(count > 0){
				
				sql="select * FROM ehat_multiple_sponsor where deleted='N' and treatment_id="+treatmentId;
				Query spDetailsQuery = session.createSQLQuery(sql);
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
					
					sql="select ifnull(sum(other_amount),0) as totAmt FROM ehat_bill_details_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" and cancle='N' and service_id !="+pharmacyInvoice+" and charges_slave_id="+chargesSlaveId;
					Query billQuery = session.createSQLQuery(sql);		
					totalAmt = (Double) billQuery.uniqueResult();
					
					sql="select ifnull(sum(other_concession),0) as totCon FROM ehat_bill_details_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" and cancle='N' and service_id !="+pharmacyInvoice+" and charges_slave_id="+chargesSlaveId;
					Query conQuery = session.createSQLQuery(sql);		
					totConcn = (Double) conQuery.uniqueResult();

					sql="select ifnull(sum(total_paid),0) from ehat_receipt_master_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" and sponsor_cat_id="+chargesSlaveId;
					Query recQuery = session.createSQLQuery(sql);		
					totPaid = (Double) recQuery.uniqueResult();
					
					sql="select ifnull(sum(total_paid),0) from ehat_refund_master_ipd where deleted='N' and treatment_id="+treatmentId+" and sponsor_cat_id="+chargesSlaveId;
					Query refQuery = session.createSQLQuery(sql);		
					totRefund = (Double) refQuery.uniqueResult(); 
					
					sql="select ifnull(sum(approved_amt),0) from ehat_ipdbill_discount where deleted='N' and treatment_id="+treatmentId+" and sponsor_cat_id="+chargesSlaveId;
					Query discQuery = session.createSQLQuery(sql);		
					totDisc = (Double) discQuery.uniqueResult();	
						
					double netAmount = (totalAmt + totRefund) - (totDisc + totConcn);
					
					totRemain = netAmount - (totPaid);	 
					
					String sql2="SELECT ifnull((sum(paid_amt)+sum(concession)+sum(tds_amt)),0) sponsorAmount FROM ehat_bulk_settlement_slave where treatment_id="+treatmentId;
					Query bulkQuery = session.createSQLQuery(sql2);			
					totPaidForSponsor = ((Number)bulkQuery.uniqueResult()).doubleValue();
					
					totRemainForSponsor = totRemain-totPaidForSponsor;

					// Update amount in multiSponsor start
					//String hqlForMultiSponsr = "UPDATE MultipleSponsorDto set totalBill =:totalBill,totalPaid =:totalPaid,total_remain =:remaining,totalRefund =:totalRefund,discount =:discount,total_concn =:totalConcn WHERE mulSponsorId =:mulSponsorId";
					String hqlForMultiSponsr = "UPDATE MultipleSponsorDto set totalBill =:totalBill,total_remain =:remaining,totalRefund =:totalRefund,discount =:discount WHERE mulSponsorId =:mulSponsorId";
					Query queryForMultiSponsr = session.createQuery(hqlForMultiSponsr);
					//queryForMultiSponsr.setDate("updatedDateTime",new Date(new java.util.Date().getTime()));
					//queryForMultiSponsr.setParameter("totalBill",totalAmt);  
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

	@Override
	public BillDetailsIpdDto setServiceForCash(BillDetailsIpdDto obj,
			String callFrom, String servIdsChecked) {
		
		String sql="select ifnull(sum(amount),0) as totAmt FROM ehat_bill_details_ipd where deleted='N' and treatment_id="+obj.getTreatmentId()+" and bill_details_id in("+servIdsChecked+")";
		Query billQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
		Double totalAmt = (Double) billQuery.uniqueResult();
		BillDetailsIpdDto objResult=new BillDetailsIpdDto();
		objResult.setAmount(totalAmt);
		return objResult;
	}

	@Override
	public List<EhatViewPatientSubServiceDetailsIpdDto> getPatientServiceBillForNarco(
			Integer treatmentId, Integer serviceId, Integer chargesSlaveId) {
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
		String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");    
		int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
		
		List<EhatViewPatientSubServiceDetailsIpdDto> listSubServiceIpdDto = new ArrayList<EhatViewPatientSubServiceDetailsIpdDto>();
		try {
			
			if(serviceId==14){
				
					//String sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"'";
						String sql1 = "SELECT * FROM ehat_bill_details_ipd where charges_slave_id="+chargesSlaveId+" and service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"' and deleted = 'N' ";
					
					
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
			       			
			        	/*if(objDTO1.getSubServiceId()<=6)
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
			        	}*/
			        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
			        	 listSubServiceIpdDto.add(objDTO1);
			        	 objDTO1=null;
			         
				}
			          						
			}
			else if(serviceId==16)
			{
				
					//String sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"'";
						String sql1 = "SELECT * FROM ehat_bill_details_ipd where charges_slave_id="+chargesSlaveId+" and service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"' and deleted = 'N' ";
					
					
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
			          						
			}
			else if(serviceId==-5)
			{				
				String sql1 = "SELECT * FROM ehat_bill_details_ipd where charges_slave_id="+chargesSlaveId+" and treatment_id = "+treatmentId+" and service_id="+serviceId;
				
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
			}
			
			else
			{
			
			String otProc=null;
			String sql1 = "SELECT * FROM ehat_view_patient_sub_service_details_ipd where charges_slave_id="+chargesSlaveId+" and treatment_id = '"+treatmentId+"' and service_id='"+serviceId+"'";
			
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
	         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         @SuppressWarnings("unchecked")
	         List<Map<String, Object>> data1 = query1.list();
	         			         
	         for(Map<String, Object> row : data1){
	        	 
	        	 EhatViewPatientSubServiceDetailsIpdDto objDTO1= new EhatViewPatientSubServiceDetailsIpdDto();
	        	 
	        	 objDTO1.setServiceId((Integer)row.get("service_id"));
	        	 int aaa=(Integer)row.get("service_id");
	        	//System.err.println("kkkkkk"+aaa);
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
	        	 }else
	        	 {
	        		 objDTO1.setCategoryName((String)row.get("category_name"));	
	        	 }
	        	 
	        	 
	        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
	        	 objDTO1.setOtProcedureId((String) row.get("ot_procedure"));
	        	 objDTO1.setSndtolabflag((String) row.get("sndtolabflag"));
	 			objDTO1.setSndtorisflag((String) row.get("sndtorisflag"));
	        	 otProc = (String) row.get("ot_procedure").toString();
	        	 objDTO1.setEmrPer((Double)row.get("emrPer"));
	        	 objDTO1.setPaidByCashFlag((String)row.get("paid_by_cash_flag"));
	        	 
	        	 /* if(aaa==14)
	        	 {		
						String sql3 = "SELECT inv_consumption_info_slave_item_name AS IName FROM inv_consumption_item_info_slave where inv_consumption_master_id = "+bbb+";";
									

						SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
						query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> data3 = query3.list();
						//System.err.println("ot len-----------------------"+data1.size());
						for (Map<String, Object> row3 : data3) {
								
							objDTO1.setInventoryName((String) row3.get("IName"));
							//listServiceIpdDto.add(objDTO);
						}
					
				}*/
	        	 
	        	 
	        	 if(!(otProc.equals(null) || otProc.equals("0") || otProc.equals("-")))
	        	 {
	        	 if(aaa==4)
	        	 {
					//otProc = (String) row.get("ot_procedure").toString();
					if (otProc.equals(null) || otProc.equals("0")) {

					} else {

						String sql2 = "SELECT GROUP_CONCAT(o.OName SEPARATOR ' , ') AS OName "
									+ "FROM (ehat_view_patient_service_detail_ipd b join operation o)"
									+ "where b.treatment_id='"+treatmentId+"' and b.service_id='4' and o.status='Y' and o.Operation_id in("+otProc+")";

						SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
						query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> data2 = query2.list();
						//System.err.println("ot lennnnnnn-----------------------"+data2.size());
						for (Map<String, Object> row2 : data2) {
								
							objDTO1.setOtProcedure((String) row2.get("OName"));
							//listServiceIpdDto.add(objDTO);
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
	public List<IpdQueueDTO> autoSuggestationIpdQueue(String searchText) {
		List<IpdQueueDTO> list= new ArrayList<IpdQueueDTO>();
		try {
		Criteria c=	sessionFactory.getCurrentSession().createCriteria(IpdQueueDTO.class);
		c.add(Restrictions.ilike("patientName", searchText,MatchMode.ANYWHERE));
		list=	c.list();
		}catch(Exception e) {
		e.printStackTrace();	
		}
		return list;
	}

	@Override
	public IpdQueueDTO getIpdQueuePatientByTreatmentId(Integer treatId) {
		IpdQueueDTO obj= new IpdQueueDTO();
		try {
		Criteria c=	sessionFactory.getCurrentSession().createCriteria(IpdQueueDTO.class);
		c.add(Restrictions.eq("treatId", treatId));
		obj=	(IpdQueueDTO) c.uniqueResult();;
		}catch(Exception e) {
		e.printStackTrace();	
		}
		return obj;
	}
	
	@Override
	public Integer updateIpdBillDetails(Integer treatId) {
		
		int res=0;
		try {
			
			String sql="update ehat_bill_details_ipd set deleted='N' where deleted='Y' and deleted_by=0 and deleted_date_time is null and treatment_id="+treatId;
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			res = countQuery.executeUpdate();
			return res;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}	
	
	@Override
	public Integer deleteRefundReceipt(Integer treatId, Integer recId,String remarkDeletedRefund, HttpServletRequest request) {
		
		int res=0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
			String sql="update ehat_refund_master_ipd set deleted='Y',remarkDeletedRefund = '" + remarkDeletedRefund +"' , deleted_date_time=now(),deleted_by="+userId+" where bill_refund_id="+recId;
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			res = countQuery.executeUpdate();
			
			setBillMasterTotalsIpd(treatId,sessionFactory.getCurrentSession());
			setMultiSponsorTotalsForIpd(treatId);
			
			return res;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}	
	
	public int setBillMasterTotalsIpd(int treatmentId,Session session) {
		
		int result=0;
		try {
			
			// Update amount in bill master start
			double totalAmt=0;				
			double totPaid=0;
			double totRemain=0;
			double totRefund=0;
			double totDisc=0;
			double totConcn=0;		
			
			String spId="select ifnull(charges_master_slave_id,0) as spId FROM ehat_bill_master where deleted='N' and treatment_id="+treatmentId;
			Query spQuery = session.createSQLQuery(spId);		
			Integer sonsrId = ((Number) spQuery.uniqueResult()).intValue();
			
			//String sqlBill="select ifnull(total_bill,0) from ehat_bill_master where deleted='N' and treatment_id="+treatmentId+" ";
			/*if(obj.getSponsorCatId()>0){
				
				sql="select sum(other_amount) as totAmt,sum(other_concession) as totConcn FROM ehat_bill_details_ipd where deleted='N' and treatment_id="+obj.getTreatmentId()+" and cancle='N' ";
			}else{
				
				sql="select sum(amount) as totAmt,sum(concession) as totConcn FROM ehat_bill_details_ipd where deleted='N' and treatment_id="+obj.getTreatmentId()+" and cancle='N' ";
			}*/
			
			if(sonsrId > 0){
				
				String sqlBill="select ifnull(sum(other_amount),0) as totAmt FROM ehat_bill_details_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" and cancle='N' ";
				Query billQuery = session.createSQLQuery(sqlBill);		
				totalAmt = (Double) billQuery.uniqueResult();
				
				sqlBill="select ifnull(sum(other_concession),0) as totCon FROM ehat_bill_details_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" and cancle='N' ";
				Query conQuery = session.createSQLQuery(sqlBill);		
				totConcn = (Double) conQuery.uniqueResult();
			}else{
				
				String sqlBill="select ifnull(sum(amount),0) as totAmt FROM ehat_bill_details_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" and cancle='N' ";
				Query billQuery = session.createSQLQuery(sqlBill);		
				totalAmt = (Double) billQuery.uniqueResult();
				
				sqlBill="select ifnull(sum(concession),0) as totCon FROM ehat_bill_details_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" and cancle='N' ";
				Query conQuery = session.createSQLQuery(sqlBill);		
				totConcn = (Double) conQuery.uniqueResult();
			}			
			
			String sql="select ifnull(sum(total_paid),0) from ehat_receipt_master_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" ";
			Query recQuery = session.createSQLQuery(sql);		
			totPaid = (Double) recQuery.uniqueResult();
			
			String sql2="select ifnull(sum(total_paid),0) from ehat_refund_master_ipd where deleted='N' and treatment_id="+treatmentId+" ";
			Query refQuery = session.createSQLQuery(sql2);		
			totRefund = (Double) refQuery.uniqueResult(); 
			
			String sql3="select ifnull(sum(approved_amt),0) from ehat_ipdbill_discount where deleted='N' and treatment_id="+treatmentId+" ";
			Query discQuery = session.createSQLQuery(sql3);		
			totDisc = (Double) discQuery.uniqueResult(); 
			
			String sql4="select ifnull(invoice_flag,'N') from ehat_bill_master where deleted='N' and treatment_id="+treatmentId+" ";
			Query invQuery = session.createSQLQuery(sql4);		
			String invFlag = (String) invQuery.uniqueResult(); 			
		
			/*if(callFrom.equals("paid")){
				
				totPaid=totPaid+amount;
			}else if(callFrom.equals("refund")){
				
				totRefund=totRefund+amount;
			}else if(callFrom.equals("totBill")){
				
				totalAmt=totalAmt+amount;
			}*/
			
			double totDedcn = (totPaid + totDisc + totConcn);
			String calF = "";
			double refundable=0,calRefund=0,refunfForReflcn=0;
			if(totDedcn > totalAmt){
				
				refundable = (totDedcn-totalAmt);
				calRefund = refundable - (totDisc + totConcn);
				
				if(totRefund > calRefund){
					
					calF = "refund";
					refunfForReflcn = totRefund - calRefund;
					
				}else{
					
					calF = "-";
				}	
				
				totRemain = totalAmt - totDedcn;
				
			}else if(totalAmt > totDedcn){
				
				totRemain = totalAmt - totDedcn;
			}else{
				
				totRemain = 0;
			}			
			
			/*if(totRemain<0){
				
				totRefund=(totPaid + totDisc + totConcn)-totalAmt;
			}*/
			
			//Session session = session;
			String hql = "UPDATE BillMasterDto set updatedDateTime =:updatedDateTime, totalBill =:totalBill,totalPaid =:totalPaid,total_remain =:remaining,totalRefund =:totalRefund,discount =:discount,total_concn =:totalConcn WHERE treatmentId =:treatmentId";
			Query query = session.createQuery(hql);
			query.setDate("updatedDateTime",new Date(new java.util.Date().getTime()));
			query.setParameter("totalBill",totalAmt);  
			query.setParameter("totalPaid",totPaid);  
			query.setParameter("remaining",totRemain);  
			query.setParameter("totalRefund",totRefund);  
			query.setParameter("discount",totDisc);  
			query.setParameter("totalConcn",totConcn);  
			query.setParameter("treatmentId",treatmentId);  
			query.executeUpdate();
			// Update amount in bill master end
								
			//setIpdBillDetails(treatmentId,refunfForReflcn,calF,session);
			
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
	
	public int setMultiSponsorTotalsForIpd(int treatmentId) {
		
		int result=0;
		try {
			
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
			String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");   
			int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
						
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
					
					sql="select ifnull(sum(other_amount),0) as totAmt FROM ehat_bill_details_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" and cancle='N' and service_id !="+pharmacyInvoice+" and charges_slave_id="+chargesSlaveId;
					Query billQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
					totalAmt = (Double) billQuery.uniqueResult();
					
					sql="select ifnull(sum(other_concession),0) as totCon FROM ehat_bill_details_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" and cancle='N' and service_id !="+pharmacyInvoice+" and charges_slave_id="+chargesSlaveId;
					Query conQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
					totConcn = (Double) conQuery.uniqueResult();

					sql="select ifnull(sum(total_paid),0) from ehat_receipt_master_ipd where deleted='N' and paid_by_cash_flag='N' and treatment_id="+treatmentId+" and sponsor_cat_id="+chargesSlaveId;
					Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
					totPaid = (Double) recQuery.uniqueResult();
					
					sql="select ifnull(sum(total_paid),0) from ehat_refund_master_ipd where deleted='N' and treatment_id="+treatmentId+" and sponsor_cat_id="+chargesSlaveId;
					Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
					totRefund = (Double) refQuery.uniqueResult(); 
					
					sql="select ifnull(sum(approved_amt),0) from ehat_ipdbill_discount where deleted='N' and treatment_id="+treatmentId+" and sponsor_cat_id="+chargesSlaveId;
					Query discQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
					totDisc = (Double) discQuery.uniqueResult();	
					
					double netAmount = (totalAmt + totRefund) - (totDisc + totConcn);
									
					totRemain = netAmount - (totPaid);	
					
					String sql2="SELECT ifnull((sum(paid_amt)+sum(concession)+sum(tds_amt)),0) sponsorAmount FROM ehat_bulk_settlement_slave where treatment_id="+treatmentId;
					Query bulkQuery = sessionFactory.getCurrentSession().createSQLQuery(sql2);			
					totPaidForSponsor = ((Number)bulkQuery.uniqueResult()).doubleValue();
					
					totRemainForSponsor = totRemain-totPaidForSponsor;

					// Update amount in multiSponsor start
					//String hqlForMultiSponsr = "UPDATE MultipleSponsorDto set totalBill =:totalBill,totalPaid =:totalPaid,total_remain =:remaining,totalRefund =:totalRefund,discount =:discount,total_concn =:totalConcn WHERE mulSponsorId =:mulSponsorId";
					String hqlForMultiSponsr = "UPDATE MultipleSponsorDto set totalBill =:totalBill,total_remain =:remaining,totalRefund =:totalRefund,discount =:discount WHERE mulSponsorId =:mulSponsorId";
					Query queryForMultiSponsr = sessionFactory.getCurrentSession().createQuery(hqlForMultiSponsr);
					//queryForMultiSponsr.setDate("updatedDateTime",new Date(new java.util.Date().getTime()));
					//queryForMultiSponsr.setParameter("totalBill",totalAmt);  
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
	
	
	
	public double fetchOperationCount(Integer treatmentId, Integer categoryId,Integer topId,Integer patientId) { 
		int res = 0;
		int finalCount=0;
		int percentage=0;
		double finalAmount=0;
		double amount=0;
	try {
	       String sql ="Select  count(*) from treatment_operations where treatment_id="+treatmentId + " and unit_id="+1+" ";
	        Query q  =sessionFactory.getCurrentSession().createSQLQuery(sql);
	         res=((Number) q.uniqueResult()).intValue();
	         
	         TreatmentDto treatmentDto = (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class,treatmentId);
	         
	         
	         Criteria createCriteria = sessionFactory.getCurrentSession().createCriteria(TreatmentOperations.class);
	         createCriteria.add(Restrictions.eq("treatmentDto", treatmentDto));
	         createCriteria.add(Restrictions.eq("unitId", 1));
	         List<TreatmentOperations> list = createCriteria.list();
	         
	         
	         List<PtientOperation> patientOperationlist = new ArrayList<PtientOperation>();
	         for (TreatmentOperations treatmentOperations : list) {
	        	 
	        if(treatmentOperations.getId()==topId) { 
	        	 Criteria createCriteria2 = sessionFactory.getCurrentSession().createCriteria(PtientOperation.class);
	        	 createCriteria2.add(Restrictions.eq("treatmentOperationsManage", topId));
	        	 List<PtientOperation> pOperationlist = createCriteria2.list();
	        	 int countStep=1;
					for (int i = 0; i < pOperationlist.size(); i++) {
						
						
						
						String hallwisechargeOTAll = hallwisechargeOTAll(treatmentId, pOperationlist.get(i).getOperation_ID(), "hall",patientId);
					if(!hallwisechargeOTAll.equalsIgnoreCase("")) {
						amount = Double.parseDouble(hallwisechargeOTAll);
					}
					
					int percentageDetails = getPercentageDetails(categoryId, 1);
					
					
					
					if(percentageDetails!=0) {
						amount = amount*percentageDetails/100;
					}else {
						// added for if Ot services charges not configured set default charges
						String sql1 = "Select charges from ehat_subservice where id=" + categoryId;
						Query q1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
						double res1 = ((Double) q1.uniqueResult()).intValue();
						amount=res1;
					}
					
					
					
						Integer count = ((Number) sessionFactory.getCurrentSession().createSQLQuery("SELECT COUNT(*) "
								+ "FROM ehat_operationmaster where  step =" + countStep + " and unit=1 and status='N' ")
								.uniqueResult()).intValue();
					if(count!=0) {
						SQLQuery q7 = sessionFactory.getCurrentSession()
								.createSQLQuery("SELECT percentage FROM ehat_operationmaster where  step =" + countStep
										+ " and unit=" + 1 + " and status='N' ");
						percentage = ((Number) q7.uniqueResult()).intValue();
						
						finalAmount = finalAmount + amount*percentage/100;
					}
					else {
						finalAmount = finalAmount + amount;
					}
						countStep++;
					}
		    	
			}
	         }    
	       
	         // added for emergency charges
				SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
				Calendar calendar = Calendar.getInstance();
				String currentTime = dateFormat.format(calendar.getTime());
				System.out.println("currentTime==="+currentTime);
				
				String sqlEmergency = "SELECT if(operationTmForEmergeancyFrom > operationTmForEmergeancyTo,'Y','N') as count FROM hospitalaccinfo";
				String status = sessionFactory.getCurrentSession().createSQLQuery(sqlEmergency).uniqueResult().toString();
				
				if (status.equals("Y")) {
					// used sql query becz of where condition difficult to manage using hibernate
					// criteria
					sqlEmergency = "select count(*) from hospitalaccinfo where (CAST( '" + currentTime
							+ "' as time) >= operationTmForEmergeancyFrom or CAST( '" + currentTime
							+ "' as time) < operationTmForEmergeancyTo) ";

				} else {
					sqlEmergency = "select count(*) from hospitalaccinfo where CAST( '" + currentTime
							+ "' as time) BETWEEN CAST(operationTmForEmergeancyFrom as time) AND CAST(operationTmForEmergeancyTo as time)";
				}
				HospitalAccDetails listHospitalAccount = null;
				Integer emergencyTimeFlag = ((Number) sessionFactory.getCurrentSession().createSQLQuery(sqlEmergency).uniqueResult()).intValue();
				if (emergencyTimeFlag != 0) {
					listHospitalAccount = (HospitalAccDetails) sessionFactory.getCurrentSession().get(HospitalAccDetails.class, 1);
					float perAmt=listHospitalAccount.getOperationEmergencyCharges();
					finalAmount=finalAmount+(finalAmount/100)*perAmt;
				}
				// end for emergency charges

	         
		}catch (Exception e) {
			e.printStackTrace();
		}
		return finalAmount;
}
	
	public int getPercentageDetails(int subserviceId, int unitId) {
		 int res=0;
		try {
			       String sql ="Select  percentage as percentage from ehat_otpercentageconfiguration where confugration_flag='N' and childsubservice_id="+subserviceId+" ";
			        SQLQuery q  =sessionFactory.getCurrentSession().createSQLQuery(sql);
			         res=(int) q.uniqueResult();
			       
		   }catch (Exception e) {
			e.printStackTrace();
		}
		return res;
	}
	
	@SuppressWarnings("unchecked")
	public String hallwisechargeOTAll(Integer trId,
			Integer scheduledProcedure, String callfrom,Integer patientId) {

		int count=0;
		String opcharge="";
		int charges_slave_id=0;
       try {
           // SQLQuery q=sessionFactory.getCurrentSession().createSQLQuery("SELECT  h.Htype from treatment_beds tb,beds bd, hall h where  h.Hall_ID = bd.Hall_ID   and  bd.Bed_ID=tb.Bed_ID  and   tb.Treatment_ID=? ");  
	     if(callfrom.equals("hall")){
	    	  	
	    	 	List<BillDetailsIpdDto> list = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class).
	    	 	add(Restrictions.eq("treatmentId",trId)).list();
	    	 	charges_slave_id = list.get(0).getChargesSlaveId();
	    	 	
				
	    	 	if(charges_slave_id !=0)
				{		 
	    	 		int wardId = ((Number) sessionFactory.getCurrentSession().createSQLQuery(
	    	 			    "SELECT IFNULL((SELECT selfid FROM ehat_charges_master_slave WHERE ehat_charges_master_slave.id = beds.Hall_ID LIMIT 1), 0) AS ward_id " +
	    	 			    "FROM ehat_patient p " +
	    	 			    "JOIN ehat_treatment t ON p.patient_id = t.patient_id " +
	    	 			    "JOIN ehat_bill_master x ON t.treatment_id = x.treatment_id " +
	    	 			    "JOIN ehat_bill_details_ipd ON t.treatment_id = ehat_bill_details_ipd.treatment_id " +
	    	 			    "JOIN beds ON ehat_bill_details_ipd.sub_service_id = beds.Bed_ID AND ehat_bill_details_ipd.deleted = 'N' " +
	    	 			    "JOIN ehat_service_master ON ehat_bill_details_ipd.service_id = ehat_service_master.service_id " +
	    	 			    "LEFT JOIN ehat_charges_master_slave cm ON x.charges_master_slave_id = cm.id " +
	    	 			    "WHERE t.t_flag = 'Y' " +
	    	 			    "AND p.deleted = 'N' " +
	    	 			    "AND t.department_id = 2 " +
	    	 			    "AND ehat_bill_details_ipd.deleted = 'N' " +
	    	 			    "AND ehat_bill_details_ipd.on_bed_flag = 'Y' " +
	    	 			    "AND t.treatment_id ="+ trId +
	    	 			    " GROUP BY t.treatment_id, x.charges_master_slave_id, beds.Hall_ID;").uniqueResult()).intValue();

	    	 		
	    	 		
					int cnt = ((Number) sessionFactory.getCurrentSession().createSQLQuery(
							"select count(*) from operationchargehallwise where sponser_id=" + charges_slave_id+" and halltypeid=" +wardId)
							.uniqueResult()).intValue();

					if (cnt == 0) {
						charges_slave_id = ((Number) sessionFactory.getCurrentSession()
								.createSQLQuery(
										"select selfId from ehat_charges_master_slave where id=" + charges_slave_id)
								.uniqueResult()).intValue();
					}
				}
				
				
				 
	    	 	
				/*
				 * int count2 = ((Number) sessionFactory.getCurrentSession().
				 * createSQLQuery("select count(*) from ehat_multiple_sponsor where patient_id="
				 * +patientId).uniqueResult()).intValue(); if(count2!=0) { charges_slave_id =
				 * ((Number) sessionFactory.getCurrentSession().
				 * createSQLQuery("select charges_slave_id from ehat_multiple_sponsor where patient_id="
				 * +patientId).uniqueResult()).intValue(); }
				 */
	    	 	
	    		String opid =  "";
	    		String pId =  "";
	    		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
	    		String hospitalName = bundle.getObject("hospitalname").toString();
				if (hospitalName.equalsIgnoreCase("Siddhivinayak")) {
					
					
		            //SQLQuery q=sessionFactory.getCurrentSession().createSQLQuery("SELECT  h.Htype from ehat_bill_details_ipd tb,beds bd, hall h where  h.Hall_ID = bd.Hall_ID   and  bd.Bed_ID=tb.sub_service_id  and   tb.treatment_id="+ trId +" and tb.on_bed_flag='Y' and tb.service_id="+ 3 +" ");
		    		SQLQuery q=sessionFactory.getCurrentSession().createSQLQuery("SELECT h.selfId FROM ehat_bill_details_ipd tb, beds bd, ehat_charges_master_slave h WHERE h.id = bd.Hall_ID AND bd.Bed_ID = tb.sub_service_id "
		    				 + " AND tb.treatment_id = "+trId+" AND tb.service_id = 3 AND tb.sub_service_id > 0 ");
		    		List<Integer> Hall_ID =  q.list();
		    		StringJoiner sb = new StringJoiner(",");
					if (Hall_ID.size() > 0) {
						for (Integer objArr : Hall_ID) {
				        	sb.add(String.valueOf(objArr));
				        }
					}
		    		//Object[] Hall_ID=result.get(0);
		            if(scheduledProcedure>0){
		            	SQLQuery q1 = null;
		            	
		            	String sql="SELECT opgrade,opstate FROM  operation where Operation_id="+ scheduledProcedure +" and status='Y' ";
		    			SQLQuery query=sessionFactory.getCurrentSession().createSQLQuery(sql);
		    			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		    		    List<Map<String, Object>> data = query.list();
		    		    for(Map<String, Object> row : data){
		    		    	pId = (String)row.get("opgrade");
		    		    	opid = (String)row.get("opstate");
		    		    }	
		    		    String query1 = "SELECT surgeoncharge FROM operationchargehallwise WHERE halltypeid IN("+ sb.toString() 
								+") AND operationCatId ="+pId 
								+" AND operation_id ="+ opid +" AND sponser_id ="+ charges_slave_id;
		            	Query q2= sessionFactory.getCurrentSession().createSQLQuery(query1);
		    		  

						List<Float>  list2= q2.list();
						Float surgeoncharge = list2.stream().max(Comparator.naturalOrder()).get();
				        
					      //Float surgeoncharge=(Float) q1.uniqueResult(); 
					      if(surgeoncharge ==null){
					    	  surgeoncharge = (float) 0.0;
					      }
					      opcharge =Float.toString( surgeoncharge);
		            }
				
					

				}else {	
	            //SQLQuery q=sessionFactory.getCurrentSession().createSQLQuery("SELECT  h.Htype from ehat_bill_details_ipd tb,beds bd, hall h where  h.Hall_ID = bd.Hall_ID   and  bd.Bed_ID=tb.sub_service_id  and   tb.treatment_id="+ trId +" and tb.on_bed_flag='Y' and tb.service_id="+ 3 +" ");
	    		SQLQuery q=sessionFactory.getCurrentSession().createSQLQuery("SELECT h.selfId FROM ehat_bill_details_ipd tb, beds bd, ehat_charges_master_slave h WHERE h.id = bd.Hall_ID AND bd.Bed_ID = tb.sub_service_id "
	    				 + " AND tb.treatment_id = "+trId+" AND tb.on_bed_flag = 'Y' AND tb.service_id = 3 AND tb.sub_service_id > 0 ");
	            int Hall_ID= (Integer) q.uniqueResult(); 
	            if(scheduledProcedure>0){
	            	SQLQuery q1 = null;
	            	
	            	String sql="SELECT opgrade,opstate FROM  operation where Operation_id="+ scheduledProcedure +" and status='Y' ";
	    			SQLQuery query=sessionFactory.getCurrentSession().createSQLQuery(sql);
	    			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	    		    List<Map<String, Object>> data = query.list();
	    		    for(Map<String, Object> row : data){
	    		    	pId = (String)row.get("opgrade");
	    		    	opid = (String)row.get("opstate");
	    		    }	

	            	q1=sessionFactory.getCurrentSession().createSQLQuery("SELECT surgeoncharge from operationchargehallwise  where  halltypeid=? and   operationCatId=? and operation_id=?  and sponser_id=?");  
			        q1.setParameter(0,Hall_ID); 
			        q1.setParameter(1,Integer.parseInt(pId) );
			        q1.setParameter(2,Integer.parseInt(opid));	
			        q1.setParameter(3,charges_slave_id);	
			        
				      Float surgeoncharge=(Float) q1.uniqueResult(); 
				      if(surgeoncharge ==null){
				    	  surgeoncharge = (float) 0.0;
				      }
				      opcharge =Float.toString( surgeoncharge);
	            }
			}
	     }
           
		
			
		
		 
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return opcharge;
	}
	
	
	public List<OTPercentageDTO> fetchOTPercentage() {
		// TODO Auto-generated method stub
		int count=0;
		Query query = sessionFactory.getCurrentSession().createQuery("from OTPercentageDTO p where p.confugrationflag = :confugrationflag").setString("confugrationflag", "N"); 
		List<OTPercentageDTO> list = query.list();
		for(OTPercentageDTO list1 : list){
			String Subservicesname = (String) sessionFactory.getCurrentSession().createQuery("select e.categoryName from SubServiceDto e where e.subId = :id").setInteger("id",list1.getChildSubServiceId()).uniqueResult();
			list.get(count).setSubservicesname(Subservicesname);
		count++;
		}
		return list;

	}
		
	@SuppressWarnings("unchecked")
	private void checkChargesBillingForBed2(Integer treatmentId, Integer sponsorId, Integer sponsorSlaveId,
			double HallCharges, double nursingCharges,String billDetailsId2) {

		List<BillDetailsIpdDto> currentObj = new ArrayList<BillDetailsIpdDto>();
		List<BillDetailsIpdDto> listDB = new ArrayList<BillDetailsIpdDto>();

			try {
				
				
				List<BillDetailsIpdDto> listDB2 = sessionFactory.getCurrentSession()
						.createCriteria(BillDetailsIpdDto.class)
						.add(Restrictions.eq("treatmentId", treatmentId))
						.add(Restrictions.eq("serviceId", 3)).add(Restrictions.eq("deleted", "N"))
						.add(Restrictions.eq("onBedFlag", 'Y')).list();
				 
				if (listDB2.size() > 0) {

					currentObj.addAll(listDB2);
					// code for if shift bed multiple time at one day and previous charge is zero
					double quantity2 = listDB2.get(0).getQuantity();
					if (quantity2 == 0) {
//					and (amount!=0 or other_amount!=0)
						String sql = "select ifnull(max(bill_details_id),0) from ehat_bill_details_ipd where treatment_id="
								+treatmentId + " and service_id=3 "
								+ " and on_bed_flag='N' and deleted='N' and amount!=0 and sub_service_id!=0 and CAST(created_date_time as date)=CURDATE()  order by(amount) desc";

						SQLQuery createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						Integer billDetailsId = ((Number) createSQLQuery.uniqueResult()).intValue();
						if (billDetailsId == 0) {

							String sql2 = "select ifnull(max(bill_details_id),0) from ehat_bill_details_ipd where treatment_id="
									+ treatmentId + " and service_id=3 "
									+ " and on_bed_flag='N' and deleted='N' and amount!=0 and sub_service_id!=0 order by(amount) desc";

							createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(sql2);
							billDetailsId = ((Number) createSQLQuery.uniqueResult()).intValue();

						}
						Integer nursingBillDetailsId = billDetailsId + 1;
						Integer arr[] = new Integer[2];
						arr[0] = billDetailsId;
						arr[1] = nursingBillDetailsId;
						listDB = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class)
								.add(Restrictions.in("billDetailsId", arr)).list();
					} else {

						listDB.addAll(listDB2);

					}
						double rate = listDB.get(0).getOtherRate();
						double quantity = listDB.get(0).getQuantity();
						Double amount = listDB.get(0).getOtherAmount();

						Double newWardRate = HallCharges;//lstBillDetailsIpd.get(0).getOtherRate();
						if (rate <= newWardRate) {

							if (quantity != 0) {
								listDB.get(0).setQuantity(quantity - 1);
								listDB.get(0).setOtherAmount(amount - rate);
								listDB.get(0).setOtherCoPay(amount - rate);
								listDB.get(0).setCoPay(amount - rate);
								listDB.get(0).setOtherPay(amount - rate);

								// nursing charges check
								if (listDB.get(1).getSubServiceId() == 0) {

									double nursingRate = listDB.get(1).getOtherRate();
									double nursingQuantity = listDB.get(1).getQuantity();
									Double nursingAmount = listDB.get(1).getOtherAmount();

									listDB.get(1).setQuantity(nursingQuantity - 1);
									listDB.get(1).setOtherAmount(nursingAmount - nursingRate);
									listDB.get(1).setOtherCoPay(nursingAmount - nursingRate);
									listDB.get(1).setCoPay(nursingAmount - nursingRate);
									listDB.get(1).setOtherPay(amount - rate);

								}
							}
							
							listDB.forEach(dto->{
								
								sessionFactory.getCurrentSession().merge(dto);
								
							});
							//sessionFactory.getCurrentSession().merge(listDB);
							
							if(currentObj.size()>0) {
								
								currentObj.get(0).setSponsorId(sponsorId);
								currentObj.get(0).setChargesSlaveId(sponsorSlaveId);
								currentObj.get(0).setOtherAmount(HallCharges);
								currentObj.get(0).setOtherCoPay(HallCharges);
								currentObj.get(0).setOtherPay(HallCharges);
								currentObj.get(0).setOtherRate(HallCharges);
								currentObj.get(0).setQuantity(1);
								
								currentObj.get(1).setSponsorId(sponsorId);
								currentObj.get(1).setChargesSlaveId(sponsorSlaveId);
								currentObj.get(1).setOtherAmount(nursingCharges);
								currentObj.get(1).setOtherCoPay(nursingCharges);
								currentObj.get(1).setOtherPay(nursingCharges);
								currentObj.get(1).setOtherRate(nursingCharges);
								currentObj.get(1).setQuantity(1);
								
								sessionFactory.getCurrentSession().merge(currentObj);
							}
							
							/*
							 * String sql3 = "update ehat_bill_details_ipd set sponsor_id=" + sponsorId +
							 * ",charges_slave_id=" + sponsorSlaveId + ",other_amount = " + HallCharges +
							 * ",other_co_pay=" + HallCharges + ",other_pay=" + HallCharges + ",other_rate="
							 * + HallCharges + ", quantity=1 " + "where treatment_id = " + treatmentId +
							 * " and service_id=" + 3 + " and sub_service_id > 0 and bill_details_id in(" +
							 * billDetailsId2 + ")   "; SQLQuery query3 =
							 * sessionFactory.getCurrentSession().createSQLQuery(sql3);
							 * query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							 * query3.executeUpdate();
							 * 
							 * String sql4 = "update ehat_bill_details_ipd set sponsor_id=" + sponsorId +
							 * ",charges_slave_id=" + sponsorSlaveId + ",other_amount = " + nursingCharges +
							 * ",other_co_pay=" + nursingCharges + ",other_pay=" + nursingCharges +
							 * ",other_rate=" + nursingCharges + " " + "where treatment_id = " + treatmentId
							 * + " and service_id=" + 3 + " and sub_service_id = 0  and bill_details_id in("
							 * + billDetailsId2 + ")  "; SQLQuery query4 =
							 * sessionFactory.getCurrentSession().createSQLQuery(sql4);
							 * query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							 * query4.executeUpdate();
							 */

						}
				}

			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}

//		}

	}

	@Override
	@Transactional
	public Integer setIpdBillDetailsDistribute(Integer treatId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		
		Session session = sessionFactory.openSession();
	try {	
		
		session.beginTransaction();
		
		int setIpdBillDetails = setIpdBillDetails(treatId,0,"r",session);
				
		session.getTransaction().commit(); // commit the transaction
		
		return setIpdBillDetails;

		
		}catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
	return 0;
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
	public EmrChargesDto getEmerChrTimeDR(EmrChargesDto emrChargesDto){
		
		boolean emergencyFlag = false;
		double emrChargePer = 0;
			
		try{
			DateFormat sdf = new SimpleDateFormat("HH"); 
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			SimpleDateFormat formatter1 = new SimpleDateFormat("HH:mm:ss");
			DateFormat sdf2 = new SimpleDateFormat("mm"); 
			String todays_time = formatter1.format(currentDate.getTime());			
						
			int fromTime = 0;
			int toTime = 0;			
			
			int min = Integer.parseInt(sdf2.format(Time.valueOf(todays_time)).toLowerCase());			
			int inTime = Integer.parseInt(sdf.format(Time.valueOf(todays_time)).toLowerCase());
	
			String sql = "select doctorRoundFrom, doctorRoundTo, ifnull(doctorRoundChargesAfterRoundTime,0) as doctorRoundChargesAfterRoundTime from hospitalaccinfo";			
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);										
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> details = query.list();					
			for (Map<String, Object> row: details) {
							
				//assigning (fromTime & toTime)Time values from table into sdf("HH") hours
				fromTime = Integer.parseInt(sdf.format((Time)row.get("doctorRoundFrom")).toLowerCase());
				toTime = Integer.parseInt(sdf.format((Time)row.get("doctorRoundTo")).toLowerCase());
				emrChargePer = (Float) row.get("doctorRoundChargesAfterRoundTime");
			}
	
			if ((fromTime > toTime) && (inTime >= fromTime || inTime <= toTime)) {
				if(inTime == toTime && min > 0)
					emergencyFlag = false;
				else
					emergencyFlag = true;
			} else if (fromTime < toTime && (inTime >= fromTime && inTime <= toTime)) {
				if(inTime == toTime && min > 0)
					emergencyFlag = false;
				else
					emergencyFlag = true;
			} else{
				emergencyFlag = false;
			}
			emrChargesDto.setIsEmrTime(emergencyFlag);
			emrChargesDto.setEmrPer(emrChargePer);
			return emrChargesDto;
			
		}catch(Exception e){

			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
			return emrChargesDto;
		}
	}
	
}