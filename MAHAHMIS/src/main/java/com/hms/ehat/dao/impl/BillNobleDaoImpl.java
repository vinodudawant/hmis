package com.hms.ehat.dao.impl;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.google.common.base.Joiner;
import com.hms.administrator.service.HospitalDetailAdminService;
import com.hms.dto.BillNobleDtoForOpdSponsor;
import com.hms.ehat.controller.RegistrationController;
import com.hms.ehat.dao.BillNobleDao;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillNobleDto;
import com.hms.ehat.dto.BillNobleServiceDto;
import com.hms.ehat.dto.BillNobleServiceDto2;
import com.hms.ehat.dto.BillNobleServiceDtoForOpdSponsor;
import com.hms.ehat.dto.BillNobleServicePackageDto;
import com.hms.ehat.dto.EhatOtherBillDetailForOpdDto;
import com.hms.ehat.dto.PatientServiceDetail2;
import com.hms.ehat.dto.PatientSubServiceDetailsForOpdPackage;
import com.hms.ehat.dto.ProfessionalFeesDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegistrationViewDto2;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.dto.TokenDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipdbill.daoImpl.BillDaoImpl;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.IpdBillDiscount;
import com.hms.ipdbill.dto.IpdBillReceiptSlaveDTO;
import com.hms.pathology.dto.PathologySampleWiseMaster;
import com.hms.utility.ApplicationContextUtils;

@Repository
public class BillNobleDaoImpl implements BillNobleDao
{
	
	@Autowired
	SessionFactory sessionFactory;
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 3_June_2017 
	 * @Code Fetching patient data bye id.
	 ******************************************************************************/
	@Override
	public List<BillDetailsDto> getPatientsBillById(Integer treatmentId) 
	{
		List<BillDetailsDto> ltPatientRecord = null;
		try {
			/*RegistrationDto registrationDto = (RegistrationDto )sessionFactory.getCurrentSession()
                    .get(RegistrationDto.class, patientId);*/
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BillDetailsDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			//criteria.setMaxResults(10);
			ltPatientRecord = criteria.list();

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
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 3_June_2017 
	 * @Code Fetching patient data bye id.
	 ******************************************************************************/
	@Override
	public List<BillNobleDto> getPatientBillAmount(Integer treatmentId) 
	{
		List<BillNobleDto> ltPatientRecord = new ArrayList<BillNobleDto>();
		try {
			/*RegistrationDto registrationDto = (RegistrationDto )sessionFactory.getCurrentSession()
                    .get(RegistrationDto.class, patientId);*/
			
			/*Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BillNobleDto.class);
			//criteria.add(Restrictions.eq("deleted", "N"));
			
			//criteria.add(Restrictions.eq("treatmentId", treatmentId));
			//criteria.add(Restrictions.eq("deleted", "N"));
			
			ltPatientRecord = criteria.list();

			for(int i=0 ; i< ltPatientRecord.size() ; i++){
				System.err.println("serviceId"+i+"==>>"+ltPatientRecord.get(i).getServiceId());
				System.err.println("servicename"+i+"==>>"+ltPatientRecord.get(i).getServiceName());
				System.err.println("Rate"+i+"==>>"+ltPatientRecord.get(i).getRate());
			}*/
			
			
			
			// String sql = "SELECT * FROM patient_service_detail where treatment_id = '"+treatmentId+"'";
			
			String sql = "SELECT "
					    +" b.created_date_time AS created_date_time, "
					    +" b.bill_details_id AS bill_details_id, "
					    +" b.service_id AS service_id, "
					    +" t.treatment_id AS treatment_id, "
					    +" s.service_name AS service_name, "
					    +" IFNULL(s.iscombination, 'N') AS iscombination, "
					    +" SUM(b.amount) AS amount, "
					    +" SUM(b.other_amount) AS other_amount, "
					    +" COUNT(b.service_id) AS service_count "
					    +" FROM "
					    +" ((ehat_bill_details b "
					    +" JOIN ehat_treatment t ON (t.treatment_id = b.treatment_id "
					    +"     AND t.patient_id = b.patient_id "
					    +"     AND t.treatment_id = "+treatmentId+" "
					    +"     AND t.t_flag = 'Y' "
					    +"     AND b.deleted = 'N')) "
					    +" JOIN ehat_service_master s ON (b.service_id = s.service_id)) "
					    +" GROUP BY t.treatment_id , b.service_id";
	         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
	         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         List<Map<String, Object>> data = query.list();
	       
	         for(Map<String, Object> row : data){
	        	 
	        	 BillNobleDto objDTO= new BillNobleDto();
	        	 objDTO.setServiceId((Integer)row.get("service_id"));
	        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
	        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
	        	
	        	 objDTO.setServiceName((String)row.get("service_name"));
	        	 objDTO.setAmount((Double)row.get("amount"));
	        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
	        	 objDTO.setIsCombination((String)row.get("iscombination"));

	        	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
	        	
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
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 11_July_2017 
	 * @Code Fetching patient data bye id for given particular access to user.
	 ******************************************************************************/
	@Override
	public List<BillNobleDto> getPatientBillAmount(Integer treatmentId,	int userId) {
		
		List<BillNobleDto> ltPatientRecord = new ArrayList<BillNobleDto>();
		try {
			String servIds=null;
			String sql1="select service_id from users where User_ID="+userId+"";
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> data1 = query1.list();
			
			for(Map<String, Object> row : data1){
				
				servIds=(String)row.get("service_id");				
			}
			
			//ArrayList<Integer> servIds11=new ArrayList<Integer>();
			//int[] servIds11 = new int[10];
			
			//String[] servIds1 = null;
			
			// get checked service masters
			/*
			 * if(servIds.length()>0){
			 * 
			 * servIds1=servIds.split(",");
			 * 
			 * for(String id:servIds1){
			 * 
			 * servIds11.add(Integer.parseInt(id)); } }
			 */		
			
			
			/*
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillNobleDto.class);			
			criteria.add(Restrictions.eq("treatmentId", treatmentId));	
			//criteria.add(Restrictions.eq("cancle", "N"));
			//criteria.add(Restrictions.eq("deleted", "N"));
			if(servIds11.size()!=0){
				
				criteria.add(Restrictions.in("serviceId", servIds11));
				System.err.println("hii===>"+servIds11);
			}
			
			List<BillNobleDto> listBillNobleDto = (List<BillNobleDto>) criteria.list();		
			
			for(BillNobleDto objDTO1:listBillNobleDto){
	
				Integer serviceId	= objDTO1.getServiceId();
				treatmentId	= objDTO1.getTreatmentId();
				Integer billDetailsId	= objDTO1.getBillDetailsId();
				String serviceName	= objDTO1.getServiceName();
				double amount	= objDTO1.getAmount();
				BigInteger serviceCount	= objDTO1.getServiceCount();
				
				System.err.println("srv name :-------"+objDTO1.getServiceName());
				
				// set receipt slave 
				BillNobleDto slave=new BillNobleDto();
				slave.setServiceId(serviceId);
				slave.setTreatmentId(treatmentId);
				slave.setBillDetailsId(billDetailsId);
				slave.setServiceName(serviceName);
				slave.setAmount(amount);
				slave.setServiceCount(serviceCount);
				ltPatientRecord.add(slave);
				slave=null;
				
			}*/
			
			if(!servIds.equals(null)){
				//for(int i=0;i<servIds1.length;i++){
				 //String sql = "SELECT * FROM patient_service_detail where treatment_id = "+treatmentId+" and service_id="+Integer.parseInt(servIds1[i])+"";
				
				String sql = "SELECT "
					    +" b.created_date_time AS created_date_time, "
					    +" b.bill_details_id AS bill_details_id, "
					    +" b.service_id AS service_id, "
					    +" t.treatment_id AS treatment_id, "
					    +" s.service_name AS service_name, "
					    +" IFNULL(s.iscombination, 'N') AS iscombination, "
					    +" SUM(b.amount) AS amount, "
					    +" SUM(b.other_amount) AS other_amount, "
					    +" COUNT(b.service_id) AS service_count "
					    +" FROM "
					    +" ((ehat_bill_details b "
					    +" JOIN ehat_treatment t ON (t.treatment_id = b.treatment_id "
					    +"     AND t.patient_id = b.patient_id "
					    +"     AND t.treatment_id = "+treatmentId+" "
					    +"     AND b.service_id in ("+servIds+") "
					    +"     AND t.t_flag = 'Y' "
					    +"     AND b.deleted = 'N')) "
					    +" JOIN ehat_service_master s ON (b.service_id = s.service_id)) "
					    +" GROUP BY t.treatment_id , b.service_id";
				
				 SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         List<Map<String, Object>> data = query.list();
		       
		         for(Map<String, Object> row : data){
		        	 
		        	 BillNobleDto objDTO= new BillNobleDto();
		        	 objDTO.setServiceId((Integer)row.get("service_id"));
		        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	
		        	 objDTO.setServiceName((String)row.get("service_name"));
		        	 objDTO.setAmount((Double)row.get("amount"));
		        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
		        	 objDTO.setIsCombination((String)row.get("iscombination"));

		        	
		        	 ltPatientRecord.add(objDTO);
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
			//return ltPatientRecord;
		}
		return ltPatientRecord;
	}
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 4_July_2017 
	 * @Code Fetching patient previous bill data bye t_id.
	 ******************************************************************************/
	@Override
	public List<PatientServiceDetail2> fetchPatientPreviousBillAmount(
			Integer treatmentId) {
		List<PatientServiceDetail2> ltPatientRecord = new ArrayList<PatientServiceDetail2>();
		try {
			
			
			
			 String sql = "SELECT * FROM patient_service_detail2 where treatment_id = '"+treatmentId+"'";
	         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
	         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         List<Map<String, Object>> data = query.list();
	       
	         for(Map<String, Object> row : data){
	        	 
	        	 PatientServiceDetail2 objDTO= new PatientServiceDetail2();
	        	 objDTO.setServiceId((Integer)row.get("service_id"));
	        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
	        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
	        	
	        	 objDTO.setServiceName((String)row.get("service_name"));
	        	 objDTO.setAmount((Double)row.get("amount"));
	        	 objDTO.setOtherAmount((Double)row.get("other_amount"));
	        	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
	        	 objDTO.setIsCombination((String)row.get("iscombination"));

	        	
	        	 ltPatientRecord.add(objDTO);
	        	 objDTO=null;
	         }
	        /* for(int i=0 ; i< ltPatientRecord.size() ; i++){
					System.err.println("serviceId"+i+"==>>"+ltPatientRecord.get(i).getServiceId());
					System.err.println("servicename"+i+"==>>"+ltPatientRecord.get(i).getServiceName());
				
	         }
	         */
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
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 12_July_2017 
	 * @Code Fetching patient Previous Bill data bye id for given particular access to user.
	 ******************************************************************************/
	@Override
	public List<PatientServiceDetail2> fetchPatientPreviousBillAmount(
			Integer treatmentId, Integer userId) {
		List<PatientServiceDetail2> ltPatientRecord = new ArrayList<PatientServiceDetail2>();
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
				for(int i=0;i<servIds1.length;i++){
			String sql = "SELECT * FROM patient_service_detail2 where treatment_id = '"+treatmentId+"' and service_id="+Integer.parseInt(servIds1[i])+"";
        SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List<Map<String, Object>> data = query.list();
      
        for(Map<String, Object> row : data){
       	 
       	 PatientServiceDetail2 objDTO= new PatientServiceDetail2();
       	 objDTO.setServiceId((Integer)row.get("service_id"));
       	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
       	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
       	
       	 objDTO.setServiceName((String)row.get("service_name"));
       	 objDTO.setAmount((Double)row.get("amount"));
       	 objDTO.setOtherAmount((Double)row.get("other_amount"));
       	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
    	 objDTO.setIsCombination((String)row.get("iscombination"));

       	
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
		//return ltPatientRecord;
	}
	return ltPatientRecord;
	}
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 7_June_2017 
	 * @Code Fetching patient service doctors details.
	 ******************************************************************************/
	@SuppressWarnings("null")
	@Override
	public List<BillNobleServiceDto> getPatientServiceBill(Integer treatmentId,Integer serviceId) {
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
		String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");    
		int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
		List<BillNobleServiceDto> ltPatientRecord1 = new ArrayList<BillNobleServiceDto>();
		ArrayList<String> tokenlist = new ArrayList<String>();
		try {
			
			/*Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BillNobleServiceDto.class);
			//criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.addOrder(Order.desc("unitId"));
			criteria.add(Restrictions.eq("treatmentId", treatmentId));		
			criteria.add(Restrictions.eq("serviceId", serviceId));
			//criteria.setMaxResults(10);
			ltPatientRecord = criteria.list();*/
			
			//int sid=serviceId;
			
			
			/* if( serviceId== 2 )
				{ 
			//Modify By Laxman on 17-Jan-2018.
	         String sql="select d.doc_name,b.sub_service_id,b.co_pay,b.other_co_pay,b.other_pay,b.pay,b.quantity,b.other_concession,b.doctor_id,b.concession_in_Perc,b.concession,b.rate,b.other_rate,b.bill_details_id,b.service_id,b.cancle,b.created_date_time,b.paid_flag,d.docInitial from"+
			         " doctor d ,ehat_bill_details b where d.Doctor_ID = b.doctor_id"+
			         " and b.service_id ='"+serviceId+"' and b.treatment_id='"+treatmentId+"'and b.deleted='N'";
			
	         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
	         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         List<Map<String, Object>> data = query.list();
	         ArrayList<String> tokenlist = new ArrayList<String>();
 	         for(Map<String, Object> row : data){
 	        	 BillNobleServiceDto objDTO= new BillNobleServiceDto();
	        	 objDTO.setServiceId((Integer)row.get("service_id"));
	        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
	        	 objDTO.setDocId((Integer)row.get("doctor_id")); 
	        	 objDTO.setDocName((String)row.get("doc_name"));
	        	 objDTO.setConcessionOnPerc((Double)row.get("concession_in_Perc"));
	        	 objDTO.setConcession((Double)row.get("concession"));
	        	 objDTO.setOtherConcession((Double)row.get("other_concession"));
	        	 objDTO.setPay((Double)row.get("pay"));
	        	 objDTO.setOtherPay((Double)row.get("other_pay"));
	        	 objDTO.setCoPay((Double)row.get("co_pay"));
	        	 objDTO.setOtherCoPay((Double)row.get("other_co_pay"));
	        	 objDTO.setQuantity((Double)row.get("quantity"));
	        	 objDTO.setSubServiceId((Integer) row.get("sub_service_id"));
	        	 int bb=(Integer)row.get("sub_service_id");
	        	 int aa=(Integer)row.get("service_id");
	        	 if(bb >0)
	        	 {		
						String sql3 = "SELECT category_name as category_name FROM ehat_subservice where id = "+bb+" ";
									

						SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
						query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> data3 = query3.list();
						for (Map<String, Object> row3 : data3) {								
							objDTO.setCategoryName((String) row3.get("category_name"));
						}					
				}else{
					objDTO.setCategoryName("-");
				}
	        	 
	        	 //Added By sagar...@Author-Sagar
	        	//Modify By Laxman on 17-Jan-2018.
	        	 String s1=(String)row.get("docInitial");
	        	 //String[] array = s1.split(" ");
	        	 if(s1.equalsIgnoreCase("0") || s1.equalsIgnoreCase("") || s1.equalsIgnoreCase(null)){
	        		 s1="-";
	        	 }
  	        	 String tk= getTokenNumber(s1,treatmentId,(Integer)row.get("doctor_id"));
        	 	 tokenlist.add(tk);
        	 	 //End Here...@Author-Sagar
        	 	 
 	        	 objDTO.setCancle ((String)row.get("cancle"));
	        	 objDTO.setCharges((Double)row.get("rate"));
	        	 objDTO.setOtherRate((Double)row.get("other_rate"));
	        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
	        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));
	        	 objDTO.setPaidFlag((String)row.get("paid_flag"));
	        	 ltPatientRecord1.add(objDTO);
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
						String sql1 = "SELECT * FROM ehat_bill_details where service_id='"+serviceId+"'and treatment_id = '"+treatmentId+"' and deleted = 'N' ";
												
						SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				         
				        @SuppressWarnings("unchecked")
						List<Map<String, Object>> data1 = query1.list();
				         		         
				         
				         for(Map<String, Object> row : data1){
				        	 
				        	 BillNobleServiceDto objDTO1= new BillNobleServiceDto();
				        	 
				        	 objDTO1.setServiceId((Integer)row.get("service_id"));
				        	 int aa=(Integer)row.get("service_id");
				        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
				        	// objDTO1.setIsCategory((String)row.get("isCategory"));
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
				        	 objDTO1.setConcessionOnPerc((Double)row.get("concession_in_Perc"));
				        	 objDTO1.setPay((Double)row.get("pay"));
				        	 objDTO1.setCoPay((Double)row.get("co_pay"));
				        	 objDTO1.setCancle((String)row.get("cancle"));
				        	 objDTO1.setIsModify((String)row.get("isModify"));
				        	 //objDTO1.setCghsCode((String)row.get("cgscode"));
				        	 
				        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
				        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
				        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
				        	 objDTO1.setOtherPay((Double)row.get("other_pay"));	
				        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
				        
				        	 objDTO1.setCreatedDate((Date)row.get("created_date_time"));
				        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
				        	 objDTO1.setPaidByCashFlag((String) row.get("paid_by_cash_flag"));
				        	 int bb=(Integer)row.get("sub_service_id");
				        	 
				        	 if(aa==14)
				        	 {		
									String sql3 = "SELECT inv_consumption_info_slave_item_name AS IName FROM inv_consumption_item_info_slave where inv_consumption_item_info_slave_item_code = "+bb+";";
												

									SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
									query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
									List<Map<String, Object>> data3 = query3.list();
									//System.err.println("ot len-----------------------"+data1.size());
									for (Map<String, Object> row3 : data3) {
											
										objDTO1.setInvName((String) row3.get("IName"));
										//listServiceIpdDto.add(objDTO);
									}
								
							}
				       			
				        	
				        	 objDTO1.setPaidFlag((String) row.get("paid_flag"));
				        	 ltPatientRecord1.add(objDTO1);
				        	 objDTO1=null;
				         
					}
				          						
				}
			 
			 
			 else{
	         
	        // String sql1 = "SELECT * FROM patient_sub_service_details where treatment_id = '"+treatmentId+"' and service_id='"+serviceId+"'";
				
				 String sql1 = "SELECT "
						    +" ehat_bill_details.created_date_time AS created_date, "
						    +" ehat_bill_details.bill_details_id AS bill_details_id, "
						    +" ehat_bill_details.treatment_id AS treatment_id, "
						    +" ehat_bill_details.patient_id AS patient_id, "
						    +" ehat_bill_details.service_id AS service_id, "
						    +" ehat_bill_details.sub_service_id AS sub_service_id, "
						    +" ehat_subservice.category_name AS category_name, "
						    +" IFNULL(ehat_subservice.cgscode, '-') AS cgscode, "
						    +" ehat_bill_details.amount AS amount, "
						    +" IFNULL(doctor.Doctor_ID, 0) AS Doctor_ID, "
						    +" IFNULL(doctor.doc_name, '-') AS doc_name, "
						    +" ehat_bill_details.rate AS rate, "
						    +" ehat_bill_details.concession AS concession, "
						    +" ehat_bill_details.quantity AS quantity, "
						    +" ehat_bill_details.pay AS pay, "
						    +" ehat_bill_details.co_pay AS co_pay, "
						    +" ehat_bill_details.other_amount AS other_amount, "
						    +" ehat_bill_details.other_rate AS other_rate, "
						    +" ehat_bill_details.other_concession AS other_concession, "
						    +" ehat_bill_details.concession_in_Perc AS concession_in_Perc, "
						    +" ehat_bill_details.other_pay AS other_pay, "
						    +" ehat_bill_details.other_co_pay AS other_co_pay, "
						    +" ehat_bill_details.cancle AS cancle, "
						    +" ehat_bill_details.paid_flag AS paid_flag, "
						    +" IFNULL(ehat_subservice.iscombination, 'N') AS iscombination, "
						    +" ehat_subservice.isModify AS isModify, "
						    +" ehat_bill_details.sndtolabflag AS sndtolabflag, "
						    +" doctor.docInitial AS doc_initial, "
						    +" ehat_bill_details.emrPer AS emrPer, "
						    +" ehat_bill_details.sndtorisflag AS sndtorisflag, "
						    +" ehat_bill_details.drdesk_flag AS drdesk_flag, "
						    +" ehat_bill_details.charges_slave_id AS charges_slave_id, "
						    +" ehat_bill_details.paid_by_cash_flag AS paid_by_cash_flag ,`ehat_bill_details`.`collection_date` AS `collectionDate`,`ehat_bill_details`.`collection_time` AS `collectionTime`,IFNULL(`ehat_bill_details`.`template_wise`, 'N') AS `templateWise`, ifnull(`ehat_bill_details`.`histopath_lab`,'N') AS `histopathLab`  "
							+" FROM "
							+"     ((ehat_bill_details "
							+"     JOIN ehat_subservice ON (ehat_bill_details.sub_service_id = ehat_subservice.id "
							+"         AND ehat_bill_details.deleted = 'N' "
							+"         AND ehat_bill_details.treatment_id = "+treatmentId+" "
							+"         AND ehat_bill_details.service_id = "+serviceId+")) "
							+"     LEFT JOIN doctor ON (doctor.Doctor_ID = ehat_bill_details.doctor_id)) "
							+" ORDER BY ehat_bill_details.bill_details_id "; 
						 
						 
				 SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         List<Map<String, Object>> data1 = query1.list();         
		         for(Map<String, Object> row : data1){
		        	 
		        	 BillNobleServiceDto objDTO1= new BillNobleServiceDto();
		        	 
		        	 objDTO1.setServiceId((Integer)row.get("service_id"));
		        	 int aaa=(Integer)row.get("service_id");
		        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
		        	
		        	 objDTO1.setDocName((String)row.get("doc_name"));
		        	 //objDTO1.setDocId((Integer)row.get("Doctor_ID"));
		        	 int drrId = ((Number)row.get("Doctor_ID")).intValue();		        	 
		        	 objDTO1.setDocId(drrId);	
		        	 //objDTO1.setDocId(Integer)row.get("Doctor_ID"));
		        	 
		        	 objDTO1.setCharges((Double)row.get("rate"));
		        	 //objDTO1.setChargesSponsor((Double)row.get("charges_sponsor"));
		        	 objDTO1.setAmount((Double)row.get("amount"));
		        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	 objDTO1.setQuantity((Double)row.get("quantity"));
		        	 objDTO1.setConcession((Double)row.get("concession"));
		        	 objDTO1.setConcessionOnPerc((Double)row.get("concession_in_Perc"));
		        	 objDTO1.setPay((Double)row.get("pay"));
		        	 objDTO1.setCoPay((Double)row.get("co_pay"));
		        	 
		        	 objDTO1.setOtherAmount((Double)row.get("other_amount"));
		        	 objDTO1.setOtherConcession((Double)row.get("other_concession"));
		        	 objDTO1.setOtherPay((Double)row.get("other_pay"));
		        	 objDTO1.setOtherCoPay((Double)row.get("other_co_pay"));
		        	 objDTO1.setOtherRate((Double)row.get("other_rate"));
		        	 
		        	 objDTO1.setCancle((String)row.get("cancle"));
		        	 objDTO1.setIsModify((String)row.get("isModify"));
		        	 objDTO1.setCghsCode((String)row.get("cgscode"));
		        	 objDTO1.setCreatedDate((Date)row.get("created_date"));
		        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
		        	 int bbb=(Integer)row.get("sub_service_id");
		        	 objDTO1.setPaidFlag((String)row.get("paid_flag"));
		        	 objDTO1.setIsCombination((String)row.get("iscombination"));
		        	 objDTO1.setEmrPer((Double)row.get("emrPer"));
		        	 objDTO1.setSndtolabflag((String)row.get("sndtolabflag"));
		        	 objDTO1.setSndtorisflag((String)row.get("sndtorisflag"));
		        	 objDTO1.setChargesSlaveId((Integer)row.get("charges_slave_id"));
		        	 objDTO1.setPaidByCashFlag((String) row.get("paid_by_cash_flag"));
		        	 
		        	 objDTO1.setCollectionDate((String) row.get("collectionDate"));   // added By Rohini Ambhore
		        	 objDTO1.setCollectionTime((String) row.get("collectionTime"));
		        	 objDTO1.setTemplateWise((String) row.get("templateWise"));
		        	 objDTO1.setHistopathLab((String) row.get("templateWise"));

		        	if(aaa == 2){
		        		if(bbb > 0){
		        			 objDTO1.setCategoryName((String)row.get("category_name"));
		        		}else{
		        			 objDTO1.setCategoryName("-");
		        		}		        				        		
		        		 //Added By sagar...@Author-Sagar
			        	//Modify By Laxman on 17-Jan-2018.
			        	 //String[] array = s1.split(" ");
		        		String doc_initial="-";
		        		if((String)row.get("doc_initial")!=null){
		        			doc_initial =(String)row.get("doc_initial");
		        		}
			        	 if(doc_initial.equalsIgnoreCase("0") || doc_initial.equalsIgnoreCase("") || doc_initial.equalsIgnoreCase(null)){
			        		 doc_initial="-";
			        	 }
			        	 Integer drId=0;
			        	 drId=objDTO1.getDocId();
			        	 
			        	 if(drId!=0 && drId!=null){
		  	        	 String tk= getTokenNumber(doc_initial,treatmentId,objDTO1.getDocId());
		        	 	 tokenlist.add(tk);
		        	 	 
		        	 	String final1= Joiner.on(",").join(tokenlist);
			        	//System.err.println("single string--"+final1);
			        	Session session = sessionFactory.getCurrentSession();
			        	String hql = "UPDATE TreatmentDto set tokenno =:tkn WHERE treatmentId =:tid";
						Query qry = session.createQuery(hql);
						qry.setParameter("tkn",final1);  
						qry.setParameter("tid", treatmentId);
						qry.executeUpdate();
			        	 }
		        		
		        		
		        	}else{
		        		 objDTO1.setCategoryName((String)row.get("category_name"));
		        	}
		        	//added by pooja
	        		 if(aaa == pharmacyInvoice &&  bbb == 9){		        			 
		        		 objDTO1.setCategoryName((String)row.get("drdesk_flag"));	
		        		 System.err.println("-=-=-=-=-=-=-=-=-  "+objDTO1.getCategoryName());
		        	 }else
		        	 {
		        		 objDTO1.setCategoryName((String)row.get("category_name"));	
		        	 }
		        	 ltPatientRecord1.add(objDTO1);
		        	 objDTO1=null;
		         }
		         
		         
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			//return ltPatientRecord1;
		}
		return ltPatientRecord1;
	}
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 26_July_2017 
	 * @Code Fetching patient service doctors and all details for Opd sponsor .
	 ******************************************************************************/
	
	@Override
	public List<BillNobleServiceDtoForOpdSponsor> getPatientServiceBillForOpdSponsor(
			Integer treatmentId, Integer serviceId) {
		List<BillNobleServiceDtoForOpdSponsor> ltPatientRecord1 = new ArrayList<BillNobleServiceDtoForOpdSponsor>();
		try {
			
			/*Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BillNobleServiceDto.class);
			//criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.addOrder(Order.desc("unitId"));
			criteria.add(Restrictions.eq("treatmentId", treatmentId));		
			criteria.add(Restrictions.eq("serviceId", serviceId));
			//criteria.setMaxResults(10);
			ltPatientRecord = criteria.list();*/
			
			//int sid=serviceId;
			
			
			 if( serviceId==2 )
				{ 
		
	         String sql="select d.doc_name,b.doctor_id,b.rate,b.bill_details_id,b.service_id,b.cancle,b.created_date_time,b.paid_flag from"+
			         " doctor d ,ehat_other_bill_detail_for_opd b where d.Doctor_ID = b.doctor_id"+
			         " and b.service_id ='"+serviceId+"' and b.treatment_id='"+treatmentId+"'and b.deleted='N'";
			
	         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
	         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         List<Map<String, Object>> data = query.list();
	         
	        
	         for(Map<String, Object> row : data){
	        	 
	        	 BillNobleServiceDtoForOpdSponsor objDTO= new BillNobleServiceDtoForOpdSponsor();
	        	 objDTO.setServiceId((Integer)row.get("service_id"));
	        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
	        	 objDTO.setDocId((Integer)row.get("doctor_id")); 
	        	 objDTO.setDocName((String)row.get("doc_name"));
	        	 
	        	 
	        	 
	        	 objDTO.setCancle ((String)row.get("cancle"));
	        	 objDTO.setCharges((Double)row.get("rate"));
	        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
	        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));
	        	 objDTO.setPaidFlag((String)row.get("paid_flag"));
	        	 ltPatientRecord1.add(objDTO);
	        	 objDTO=null;
	         }
	         
	        	 
				}
			 else{
	         
	         String sql1 = "SELECT * FROM patient_sub_service_details_for_opd_sponsor where treatment_id = '"+treatmentId+"' and service_id='"+serviceId+"'";
				
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         List<Map<String, Object>> data1 = query1.list();
         		         
		         
		         for(Map<String, Object> row : data1){
		        	 
		        	 BillNobleServiceDtoForOpdSponsor objDTO1= new BillNobleServiceDtoForOpdSponsor();
		        	 
		        	 objDTO1.setServiceId((Integer)row.get("service_id"));
		        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO1.setCategoryName((String)row.get("category_name"));
		        	 objDTO1.setDocName((String)row.get("doc_name"));
		        	 objDTO1.setDocId((Integer)row.get("Doctor_ID"));
		        	 //objDTO1.setDocId(Integer)row.get("Doctor_ID"));
		        	 
		        	 objDTO1.setCharges((Double)row.get("rate"));
		        	 //objDTO1.setChargesSponsor((Double)row.get("charges_sponsor"));
		        	 objDTO1.setAmount((Double)row.get("amount"));
		        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	 objDTO1.setQuantity((Double)row.get("quantity"));
		        	 objDTO1.setConcession((Double)row.get("concession"));
		        	 objDTO1.setPay((Double)row.get("pay"));
		        	 objDTO1.setCoPay((Double)row.get("co_pay"));
		        	 objDTO1.setCancle((String)row.get("cancle"));
		        	 objDTO1.setIsModify((String)row.get("isModify"));
		        
		        	 objDTO1.setCreatedDate((Date)row.get("created_date"));
		        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
		        	 objDTO1.setPaidFlag((String)row.get("paid_flag"));
		        	 ltPatientRecord1.add(objDTO1);
		        	 objDTO1=null;
		         }
			}
			 
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			//return ltPatientRecord1;
		}
		return ltPatientRecord1;
	}
	
	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To Delete Record  from  db 
	 **********/
	
	@SuppressWarnings("unchecked")
	@Override
	public boolean closePatientTreatment(Integer treatmentId,Integer userId) {
		try {
			 
			Session session = sessionFactory.getCurrentSession();
			int Pateint_ID=0;
			String Doctor_id="0";
			int Treatment_ID=0;
			//MasterConfigDto configMaster = (MasterConfigDto) sessionFactory.getCurrentSession().get(MasterConfigDto.class, cnfId);
			//configMaster.setDeletedBy(userId);
			 Date d=new Date(new java.util.Date().getTime());
			//configMaster.setDeleted("Y");*/
			

			 String hql = "UPDATE TreatmentDto set tFlag =:flag,updatedDateTime=:date,updatedBy=:user,deleted=:delet WHERE treatmentId =:treatmentId";
				Query query = session.createQuery(hql);
				query.setParameter("flag","N");  
				query.setParameter("date", d);
				query.setParameter("user", userId);
				query.setParameter("delet", "N");

				query.setParameter("treatmentId",treatmentId);  
			int cnt = query.executeUpdate();
			
			if(cnt!=0){
				//Added by Laxman.
				String sql = "UPDATE TokenDto SET tFlag =:flag,queueStatus=:qStatus,checkupDoneDateTime=:date WHERE treatmentId=:treatmentId";
				Query query1 = session.createQuery(sql);
				query1.setParameter("flag","N");
				query1.setParameter("qStatus","out");  
				query1.setParameter("date", d);
				query1.setParameter("treatmentId",treatmentId);  
				int cnt1 = query1.executeUpdate();
				
				if(cnt1!=0){
				//Added by Laxman on 17-Jan-2018 for set Next QueueFlag(QueueManagment).
				String tnoQuery="SELECT Doctor_id FROM token_number where Treatment_ID = '"+treatmentId+"'";
				
				SQLQuery queryResult = sessionFactory.getCurrentSession().createSQLQuery(tnoQuery);
				queryResult.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> data1 = queryResult.list();
				for(Map<String, Object> row1 : data1){
					
		        	 if(row1.get("Doctor_id") !=null && !row1.get("Doctor_id").equals("")){
						 Doctor_id=(String)(row1.get("Doctor_id"));	
						}
		        	//For next flag.
		        	 String tnoQuery1 ="SELECT min(created_date_time),Patient_ID,Treatment_ID FROM token_number where Doctor_id="+Doctor_id+" and (queue_status ='next' or queue_status IS NULL) and t_flag IS NULL and created_date_time >=CURDATE()";
						
		        	 SQLQuery queryResult1 = sessionFactory.getCurrentSession().createSQLQuery(tnoQuery1);
		        	 queryResult1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		        	 List<Map<String, Object>> rows1 = queryResult1.list();
						if(rows1.size()!=0){
						 for(Map<String, Object> row : rows1){
								 if(row.get("Patient_ID")!=null && row.get("Treatment_ID") !=null){
								 Pateint_ID=(Integer)(row.get("Patient_ID"));
								 Treatment_ID=(Integer)(row.get("Treatment_ID"));	
								 }
						     }
						 if(Pateint_ID!=0 && Treatment_ID !=0){
							 String queryResult12 = "UPDATE TokenDto SET queueStatus=:queue_status WHERE patientId=:patient_id and doctorIdList=:doctor_id and treatmentId=:Treatment_ID";
						
							 Query query2 = session.createQuery(queryResult12);
								query2.setParameter("queue_status","next");
								query2.setParameter("patient_id",Pateint_ID); 
								query2.setParameter("doctor_id",Doctor_id); 
								query2.setParameter("Treatment_ID",Treatment_ID);
								query2.executeUpdate();
						 	}
						}
					}
				}
			}
			
			// Added by vinod
			//BillDaoImpl bd = (ApplicationContextUtils.getApplicationContext()).getBean(BillDaoImpl.class);
			setBillMasterTotalsForOpd(treatmentId);
			setMultiSponsorTotalsForOpd(treatmentId);
			 

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			//return false;
		}
		return true;
	}
	
	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To get Dept lst by count 
	 **********/
	public List<RegistrationViewDto2> getPreviousTreatmentPatient(String letter,String usertype,int deptId, Integer unitId,Integer startIndex) {

		List<RegistrationViewDto2> ltRegistrationViewDto = new ArrayList<RegistrationViewDto2>();
         
		try {
			/*Query q2 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select patient_id from ehat_treatment where t_flag = (:t_flag) group by patient_id")
					.setParameter("t_flag", "N");
			List<Integer> tlst = q2.list();

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(RegistrationViewDto2.class);
			if (usertype.equals("Y")) {
				criteria.add(Restrictions.eq("ptId", Integer.parseInt(letter)));

			} else {
				// criteria.add(Restrictions.eq("tFlag", "N"));
				if (tlst != null) {
					criteria.add(Restrictions.in("ptId", tlst));
				}
				Criterion rest1 = Restrictions.like("patientName", "%" + letter
						+ "%");
				Criterion rest2 = Restrictions.like("adharcardNo", "%" + letter
						+ "%");
				Criterion rest3 = Restrictions.like("mobile", "%" + letter
						+ "%");
				Criterion rest4 = Restrictions.like("pIdd", "%" + letter + "%");
				criteria.add(Restrictions.or(rest1, rest2, rest3, rest4));
			}
			if (unitId > 0) {// get unit wise pre patients.
				criteria.add(Restrictions.eq("unitId", unitId));
			}

			criteria.add(Restrictions.eq("department_id", deptId));
			// criteria.add((Criterion) Projections.groupProperty("ptId"));
			criteria.addOrder(Order.desc("ptId"));

			ltRegistrationViewDto = criteria.list();*/
			
			/*Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RegistrationViewDto2.class);
			if (usertype.equals("Y")) {
				criteria.add(Restrictions.eq("ptId", Integer.parseInt(letter)));

			} else {
				Criterion rest1 = Restrictions.like("patientName", "%" + letter
						+ "%");
				Criterion rest2 = Restrictions.like("adharcardNo", "%" + letter
						+ "%");
				Criterion rest3 = Restrictions.like("mobile", "%" + letter
						+ "%");
				
				Criterion rest4 = Restrictions.like("pIdd", "%" + letter + "%");
				criteria.add(Restrictions.or(rest1, rest2, rest3, rest4));				 
			}
			if(unitId==null){
				unitId=0;
			}
			if (unitId > 0) {// get unit wise pre patients.
				criteria.add(Restrictions.eq("unitId", unitId));
			}

			criteria.add(Restrictions.eq("department_id", deptId));
			criteria.add(Restrictions.eq("tFlag", "N"));
			criteria.addOrder(Order.desc("ptId"));
			criteria.setMaxResults(15);*/
			int maxresult = 10;
			//ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			//String LastDaysRecords = (String) resourceBundleEhat.getString("LastDaysRecords");
			
			String sql = " select p.patient_id AS patient_id,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name, "
					+" p.mobile AS mobile,p.adharcardNo AS adharcardNo,p.created_date_time AS created_date_time, "
					+" p.deleted AS deleted,t.treatment_id AS treatment_id,t.deleted AS tdeleted,p.center_patient_id AS center_patient_id, "
					+" t.t_flag AS t_flag,t.department_id AS department_id,t.unit_id AS unit_id, "
					+" b.charges_master_slave_id AS charges_master_slave_id,t.opdipdno AS opdipdno,p.mrnno AS mrnno "
					+" from ((ehat_patient p join ehat_treatment t ON ((p.patient_id = t.patient_id))) "
					+" join ehat_bill_master b ON ((b.patient_id = t.patient_id))) where ((p.deleted = 'N') AND (t.adm_cancel_flag!='Y')"
					+" and (t.deleted = 'N') and (t.department_id = 1) and (t.t_flag = 'N') and p.unit_id = "+unitId+") ";
			if(usertype.equals("all")){
				
				sql = sql + " group by t.patient_id order by p.patient_id desc limit "+startIndex+", "+maxresult;				
			}else if(usertype.equals("byPatientId")){
				
				sql = sql + "and (t.patient_id = "+Integer.parseInt(letter)+") group by t.patient_id order by p.patient_id desc ";
			
			}else if(usertype.equals("byMobile")){
				
				sql = sql + "and (p.mobile = "+letter+") group by t.patient_id order by p.patient_id desc ";
			}
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
		    for(Map<String, Object> row : masterRow){
	    		
		    	RegistrationViewDto2 obj = new RegistrationViewDto2();
		    	obj.setPtId((Integer)row.get("patient_id"));
		    	obj.setpIdd(String.valueOf((Integer)row.get("patient_id")));
		    	obj.setPatientName((String)row.get("patient_name"));		    	
		    	obj.setMobile((String)row.get("mobile")); 
		    	obj.setAdharcardNo((String)row.get("adharcardNo"));		    	
		    	obj.setCreatedDateTime((Date)row.get("created_date_time"));	
		    	obj.setTtId((Integer)row.get("treatment_id"));
		    	obj.settFlag((String)row.get("t_flag"));
		    	obj.setDepartment_id((Integer)row.get("department_id"));
		    	obj.setUnitId((Integer)row.get("unit_id"));
		    	obj.setSponsorchargesSlaveId((Integer)row.get("charges_master_slave_id"));
		    	obj.setOpdipdno((String)row.get("opdipdno"));
		    	obj.setMrnno((String)row.get("mrnno"));
		    	obj.setCenterPatientId((String)row.get("center_patient_id"));
		    	ltRegistrationViewDto.add(obj);		    	
	    	}

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			//return ltRegistrationViewDto;
		}
		return ltRegistrationViewDto;
	}
	
	
	
	
	public List<RegistrationViewDto2> getPreviousTreatmentPatientDateWiseSearch(
			Date inputFromDate, Date inputToDate,Integer deptId) {

		List<RegistrationViewDto2> ltRegistrationViewDto = new ArrayList<RegistrationViewDto2>();

		try {
			
			
			Session session = sessionFactory.getCurrentSession();
			String hql = ("from RegistrationViewDto2 WHERE DATE_FORMAT(createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate and department_id =:department_id and tFlag =:tFlag group by ptId order by ptId desc");
			Query query = session.createQuery(hql);
			query.setDate("stDate", inputFromDate);
			query.setDate("edDate", inputToDate);
			query.setParameter("department_id", deptId);
			query.setParameter("tFlag", "N");			
			 
			ltRegistrationViewDto=query.list();
  			  
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			//return ltRegistrationViewDto;
		}
		return ltRegistrationViewDto;
	}
	
	
	
	/***********
	 * @author : Kishor Lokhande
	 * @date : 06-Jan-2018
	 * @reason : This methods are used to search Discount approval.
	 **********/
	public List<IpdBillDiscount> autosuggesstionDiscApprovel(String letter,String usertype, Integer unitId, HttpServletRequest req) {

		List<IpdBillDiscount> lstIpdBill = new ArrayList<IpdBillDiscount>();

		HttpSession session = req.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		try {
			/*Query bet = sessionFactory.getCurrentSession().createQuery
					("FROM IpdBillDiscount WHERE unitId =:unitId AND pIds like :letter order by pIds desc");
			*/
			
			
			
			
			String sql1 = "SELECT r.bill_discount_id,r.patient_id,r.treatment_id,r.total_amt,r.total_discount,r.approved_status,r.disc_narrarion,r.disc_remark,concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,r.approved_amt,ifnull(r.created_by, 1) created_by from" +
					" ehat_ipdbill_discount r join ehat_patient p ON (r.patient_id = p.patient_id) where r.deleted='N' and r.unit_id =:unitId AND r.patient_id like :letter or p.f_name like :letter order by r.patient_id asc";

			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 
			query1.setParameter("unitId",unitId);
			query1.setParameter("letter","%" +letter+"%");
			
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
				objIpdbill.setApprovedRemark((String) row.get("disc_narrarion"));
				objIpdbill.setDiscRemark((String) row.get("disc_remark"));
				objIpdbill.setCenterPatientId((String) row.get("center_patient_id"));
				
				Integer created_by = ((Number) row.get("created_by")).intValue();
                String userName = getUserNameForDisc11(created_by);
				
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
			//return ltRegistrationViewDto;
		}
		return lstIpdBill;
	}
	
	
	//Added By Badrinath
		//for hospital and surgeon discount by using username
		public String getUserNameForDisc11(Integer userId) {
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
	
	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To get Dept lst by count 
	 **********/
	public List<RegistrationViewDto2> getPreviousTreatmentPatientIPD(String letter,String usertype,int deptId, Integer unitId) {

		List<RegistrationViewDto2> ltRegistrationViewDto = new ArrayList<RegistrationViewDto2>();
		//List<RegistrationViewDto2> ltRegistrationViewDto2 = new ArrayList<RegistrationViewDto2>();

		try {

			/*Query q2 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select patient_id from ehat_treatment where t_flag = (:t_flag) group by patient_id")
					.setParameter("t_flag", "N");
			List<Integer> tlst = q2.list();

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(RegistrationViewDto2.class);
			if (usertype.equals("Y")) {
				criteria.add(Restrictions.eq("ptId", Integer.parseInt(letter)));

			} else {
				if (tlst != null) {
					criteria.add(Restrictions.in("ptId", tlst));
				}
				Criterion rest1 = Restrictions.like("patientName", "%" + letter
						+ "%");
				Criterion rest2 = Restrictions.like("adharcardNo", "%" + letter
						+ "%");
				Criterion rest3 = Restrictions.like("mobile", "%" + letter
						+ "%");
				Criterion rest4 = Restrictions.like("pIdd", "%" + letter + "%");
				criteria.add(Restrictions.or(rest1, rest2, rest3, rest4));
			}
			if (unitId > 0) {// get unit wise pre patients.
				criteria.add(Restrictions.eq("unitId", unitId));
			}

			criteria.add(Restrictions.eq("department_id", deptId));
			criteria.addOrder(Order.desc("ptId"));

			ltRegistrationViewDto = criteria.list();*/
			
			/*Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(RegistrationViewDto2.class);
			if (usertype.equals("Y")) {
				criteria.add(Restrictions.eq("ptId", Integer.parseInt(letter)));

			} else {
				Criterion rest1 = Restrictions.like("patientName", "%" + letter
						+ "%");
				Criterion rest2 = Restrictions.like("adharcardNo", "%" + letter
						+ "%");
				Criterion rest3 = Restrictions.like("mobile", "%" + letter
						+ "%");
				Criterion rest4 = Restrictions.like("pIdd", "%" + letter + "%");
				
				Criterion rest5 = Restrictions.like("opdipdno", "%" + letter + "%");
				
				Criterion rest6 = Restrictions.like("mrnno", "%" + letter + "%");

				
				criteria.add(Restrictions.or(rest1, rest2, rest3, rest4, rest5,rest6));
			}
			if (unitId > 0) {// get unit wise pre patients.
				criteria.add(Restrictions.eq("unitId", unitId));
			}

			criteria.add(Restrictions.eq("department_id", deptId));
			criteria.add(Restrictions.eq("tFlag", "N"));
			criteria.addOrder(Order.desc("ptId"));
			criteria.setMaxResults(15); 
			
			ltRegistrationViewDto = criteria.list();*/
			
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String LastDaysRecords = (String) resourceBundleEhat.getString("LastDaysRecords");
						
			String sql = " select p.patient_id AS patient_id,p.center_patient_id AS center_patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name, "
					+" p.mobile AS mobile,p.adharcardNo AS adharcardNo,p.created_date_time AS created_date_time, "
					+" p.deleted AS deleted,t.treatment_id AS treatment_id,t.deleted AS tdeleted, "
					+" t.t_flag AS t_flag,t.department_id AS department_id,t.unit_id AS unit_id, "
					+" b.charges_master_slave_id AS charges_master_slave_id,t.opdipdno AS opdipdno,p.mrnno AS mrnno "
					+" from ((ehat_patient p join ehat_treatment t ON ((p.patient_id = t.patient_id))) "
					+" join ehat_bill_master b ON ((b.patient_id = t.patient_id))) where ((p.deleted = 'N') "
					+" and (t.deleted = 'N') and (t.department_id = 2) and (t.t_flag = 'N') and p.unit_id = "+unitId+" ";
			if(usertype.equals("all")){
				
				sql = sql + "and (t.created_date_time >= (curdate() - interval "+LastDaysRecords+" day))) group by t.patient_id order by p.patient_id desc ";				
			}else{
				
				sql = sql + "and (t.patient_id = "+Integer.parseInt(letter)+")) group by t.patient_id order by p.patient_id desc ";
			}
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
		    for(Map<String, Object> row : masterRow){
	    		
		    	RegistrationViewDto2 obj = new RegistrationViewDto2();
		    	obj.setPtId((Integer)row.get("patient_id"));
		    	obj.setpIdd(String.valueOf((Integer)row.get("patient_id")));
		    	obj.setPatientName((String)row.get("patient_name"));		    	
		    	obj.setMobile((String)row.get("mobile")); 
		    	obj.setAdharcardNo((String)row.get("adharcardNo"));		    	
		    	obj.setCreatedDateTime((Date)row.get("created_date_time"));	
		    	obj.setTtId((Integer)row.get("treatment_id"));
		    	obj.settFlag((String)row.get("t_flag"));
		    	obj.setDepartment_id((Integer)row.get("department_id"));
		    	obj.setUnitId((Integer)row.get("unit_id"));
		    	obj.setSponsorchargesSlaveId((Integer)row.get("charges_master_slave_id"));
		    	obj.setOpdipdno((String)row.get("opdipdno"));
		    	obj.setMrnno((String)row.get("mrnno"));	
		    	obj.setCenterPatientId((String)row.get("center_patient_id"));
		    	ltRegistrationViewDto.add(obj);		    	
	    	}			

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			//return ltRegistrationViewDto;
		}
		return ltRegistrationViewDto;
	}
	
	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To get Dept lst by count 
	 **********/
	public List<RegistrationViewDto2> getPreviousTreatmentPatientDiagnostic(String letter,String usertype,int deptId, Integer unitId) {

		List<RegistrationViewDto2> ltRegistrationViewDto = new ArrayList<RegistrationViewDto2>();
		//List<RegistrationViewDto2> ltRegistrationViewDto2 = new ArrayList<RegistrationViewDto2>();

		try {

			/*Query q2 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select patient_id from ehat_treatment where t_flag = (:t_flag) group by patient_id")
					.setParameter("t_flag", "N");
			List<Integer> tlst = q2.list();

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(RegistrationViewDto2.class);
			if (usertype.equals("Y")) {
				criteria.add(Restrictions.eq("ptId", Integer.parseInt(letter)));

			} else {
				if (tlst != null) {
					criteria.add(Restrictions.in("ptId", tlst));
				}
				Criterion rest1 = Restrictions.like("patientName", "%" + letter
						+ "%");
				Criterion rest2 = Restrictions.like("adharcardNo", "%" + letter
						+ "%");
				Criterion rest3 = Restrictions.like("mobile", "%" + letter
						+ "%");
				Criterion rest4 = Restrictions.like("pIdd", "%" + letter + "%");
				criteria.add(Restrictions.or(rest1, rest2, rest3, rest4));
			}
			if (unitId > 0) {// get unit wise pre patients.
				criteria.add(Restrictions.eq("unitId", unitId));
			}

			criteria.add(Restrictions.eq("department_id", deptId));
			criteria.addOrder(Order.desc("ptId"));

			ltRegistrationViewDto = criteria.list();*/
			
			/*Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(RegistrationViewDto2.class);
			if (usertype.equals("Y")) {
				criteria.add(Restrictions.eq("ptId", Integer.parseInt(letter)));

			} else {
				Criterion rest1 = Restrictions.like("patientName", "%" + letter
						+ "%");
				Criterion rest2 = Restrictions.like("adharcardNo", "%" + letter
						+ "%");
				Criterion rest3 = Restrictions.like("mobile", "%" + letter
						+ "%");
				Criterion rest4 = Restrictions.like("pIdd", "%" + letter + "%");
				
				Criterion rest5 = Restrictions.like("opdipdno", "%" + letter + "%");
				
				Criterion rest6 = Restrictions.like("mrnno", "%" + letter + "%");

				
				criteria.add(Restrictions.or(rest1, rest2, rest3, rest4, rest5,rest6));
			}
			if (unitId > 0) {// get unit wise pre patients.
				criteria.add(Restrictions.eq("unitId", unitId));
			}

			criteria.add(Restrictions.eq("department_id", deptId));
			criteria.add(Restrictions.eq("tFlag", "N"));
			criteria.addOrder(Order.desc("ptId"));
			criteria.setMaxResults(15); 
			
			ltRegistrationViewDto = criteria.list();*/
			
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String LastDaysRecords = (String) resourceBundleEhat.getString("LastDaysRecords");
						
			String sql = " select p.patient_id AS patient_id,p.center_patient_id AS center_patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name, "
					+" p.mobile AS mobile,p.adharcardNo AS adharcardNo,p.created_date_time AS created_date_time, "
					+" p.deleted AS deleted,t.treatment_id AS treatment_id,t.deleted AS tdeleted, "
					+" t.t_flag AS t_flag,t.department_id AS department_id,t.unit_id AS unit_id, "
					+" b.charges_master_slave_id AS charges_master_slave_id,t.opdipdno AS opdipdno,p.mrnno AS mrnno "
					+" from ((ehat_patient p join ehat_treatment t ON ((p.patient_id = t.patient_id))) "
					+" join ehat_bill_master b ON ((b.patient_id = t.patient_id))) where ((p.deleted = 'N') "
					+" and (t.deleted = 'N') and (t.department_id = 3) and (t.t_flag = 'N') and p.unit_id = "+unitId+" ";
			if(usertype.equals("all")){
				
				sql = sql + "and (t.created_date_time >= (curdate() - interval "+LastDaysRecords+" day))) group by t.patient_id order by p.patient_id desc ";				
			}else{
				
				sql = sql + "and (t.patient_id = "+Integer.parseInt(letter)+")) group by t.patient_id order by p.patient_id desc ";
			}
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
		    for(Map<String, Object> row : masterRow){
	    		
		    	RegistrationViewDto2 obj = new RegistrationViewDto2();
		    	obj.setPtId((Integer)row.get("patient_id"));
		    	obj.setpIdd(String.valueOf((Integer)row.get("patient_id")));
		    	obj.setPatientName((String)row.get("patient_name"));		    	
		    	obj.setMobile((String)row.get("mobile")); 
		    	obj.setAdharcardNo((String)row.get("adharcardNo"));		    	
		    	obj.setCreatedDateTime((Date)row.get("created_date_time"));	
		    	obj.setTtId((Integer)row.get("treatment_id"));
		    	obj.settFlag((String)row.get("t_flag"));
		    	obj.setDepartment_id((Integer)row.get("department_id"));
		    	obj.setUnitId((Integer)row.get("unit_id"));
		    	obj.setSponsorchargesSlaveId((Integer)row.get("charges_master_slave_id"));
		    	obj.setOpdipdno((String)row.get("opdipdno"));
		    	obj.setMrnno((String)row.get("mrnno"));	
		    	obj.setCenterPatientId((String)row.get("center_patient_id"));
		    	ltRegistrationViewDto.add(obj);		    	
	    	}			

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			//return ltRegistrationViewDto;
		}
		return ltRegistrationViewDto;
	}
	
	
	
	
	/*******************************************************************************
	 * @author Sagar Kadam
	 * @date 27_June_2017 
	 * @Code Fetching close treatment details of patient
	 ******************************************************************************/
	@Override
	public List<TreatmentDto> closeTreatmentDetailsOfPatient(Integer patientId) 
	{
		List<TreatmentDto> ltPatientRecord = new ArrayList<TreatmentDto>();
		try {
			  
			Session session = sessionFactory.getCurrentSession();
		
			 Date d=new Date(new java.util.Date().getTime());
			
			 String hql = "from TreatmentDto  WHERE patientId =:patientId and tFlag=:tflag" ;
				Query query = session.createQuery(hql);
				query.setParameter("patientId",patientId);  
				query.setParameter("tflag","N");  

				
				ltPatientRecord=query.list();
		 
				
				
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
	

	/*******************************************************************************
	 * @author Sagar Kadam
	 * @date 27_June_2017 
	 * @Code Fetching close treatment details of patient
	 ******************************************************************************/
	@Override
	public List<TreatmentDto> getPrevPatdetails(Integer patientId,Integer deptId) 
	{
		List<TreatmentDto> ltPatientRecord = new ArrayList<TreatmentDto>();
		try {
			  
			Session session = sessionFactory.getCurrentSession();
		
			 Date d=new Date(new java.util.Date().getTime());
			
			 	/*String hql = "from TreatmentDto  WHERE patientId =:patientId and departmentId =:deptId and tFlag=:tflag";
				Query query = session.createQuery(hql);
				query.setParameter("patientId",patientId);  
				query.setParameter("deptId",deptId); 
				query.setParameter("tflag","N");  
				ltPatientRecord=query.list();*/
				
		//	String sql = "select treatment_id,opdipdno,created_date_time from ehat_treatment WHERE patient_id = "+patientId+" and department_id = "+deptId+" and t_flag = 'N' ";
			 //Added By Badrinath For Invoice Count
			 String sql= "SELECT t.treatment_id, t.opdipdno, t.created_date_time, b.invoice_count FROM ehat_treatment t JOIN ehat_bill_master b ON t.treatment_id = b.treatment_id WHERE t.patient_id = "+patientId+" AND t.department_id = "+deptId+" AND t.t_flag = 'N'";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
		    for(Map<String, Object> row : masterRow){
	    		
		    	TreatmentDto obj = new TreatmentDto();
		    	obj.setPatientId(patientId);
		    	obj.setTreatmentId((Integer)row.get("treatment_id"));
		    	obj.setOpdipdno((String)row.get("opdipdno"));
		    	obj.setCreatedDateTime((Date)row.get("created_date_time"));
		    	obj.setInvoiceCount((Integer)row.get("invoice_count"));
		    	ltPatientRecord.add(obj);	
		    	obj = null;
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

	
	// @author : Sagar Kadam @date: 16-Jun-2017 @reason : For prev opd records 

			@Override
			public List<RegTreBillDto> getAllPatientRecordsForPrevOPD(Integer deptId,String letter, Integer unitId) {
 				List<RegTreBillDto> ltPatientRecord = null;
				try {
					if(deptId == 2){
 					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(RegTreBillDto.class);
 					if(unitId > 0){
 						criteria.add(Restrictions.eq("unitId", unitId));
 					}
						criteria.add(Restrictions.eq("departmentId", deptId));
						criteria.add(Restrictions.eq("tFlag", "N"));
 						//criteria.add(Restrictions.like("patientName", "%" + letter + "%"));
 						
 						Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
 						Criterion rest2= Restrictions.like("patientIdd", "%" + letter + "%");
 						Criterion rest3= Restrictions.like("invoiceCountt", "%" + letter + "%");
 						Criterion rest4= Restrictions.like("mrnno", "%" + letter + "%");
 						Criterion rest5= Restrictions.like("mobile", "%" + letter + "%");
 						criteria.add(Restrictions.or(rest1, rest2,rest3,rest4,rest5));
						ltPatientRecord = criteria.list();
					}else if(deptId == 3){

	 					Criteria criteria = sessionFactory.getCurrentSession()
								.createCriteria(RegTreBillDto.class);
	 					if(unitId > 0){
	 						criteria.add(Restrictions.eq("unitId", unitId));
	 					}
							criteria.add(Restrictions.eq("departmentId", deptId));
							criteria.add(Restrictions.eq("tFlag", "N"));
	 						//criteria.add(Restrictions.like("patientName", "%" + letter + "%"));
	 						
	 						Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
	 						Criterion rest2= Restrictions.like("patientIdd", "%" + letter + "%");
	 						Criterion rest3= Restrictions.like("invoiceCountt", "%" + letter + "%");
	 						Criterion rest4= Restrictions.like("mrnno", "%" + letter + "%");
	 						Criterion rest5= Restrictions.like("mobile", "%" + letter + "%");
	 						criteria.add(Restrictions.or(rest1, rest2,rest3,rest4,rest5));
	 						//criteria.add((Criterion) Projections.groupProperty("patientId"));
							ltPatientRecord = criteria.list();
						
					}
					else{
	 					Criteria criteria = sessionFactory.getCurrentSession()
								.createCriteria(RegTreBillDto.class);
	 					if(unitId > 0){
	 						criteria.add(Restrictions.eq("unitId", unitId));
	 					}
							criteria.add(Restrictions.eq("departmentId", deptId));
							criteria.add(Restrictions.eq("tFlag", "N"));
	 						//criteria.add(Restrictions.like("patientId", "%" + letter + "%"));
							Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
	 						Criterion rest2= Restrictions.like("patientIdd", "%" + letter + "%");
	 						Criterion rest3= Restrictions.like("mrnno", "%" + letter + "%");
	 						Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
	 						criteria.add(Restrictions.or(rest1,rest2,rest3,rest4));
							ltPatientRecord = criteria.list();
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
	
	
	
	

	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To Delete Record  from  db 
	 **********/
	@Override
    public synchronized boolean closePatientTreatmentForIPD(Integer treatmentId, Integer userId) {
        boolean result = false;
       
        try {
        	
        	/*String sqlRef="select ifnull(count(Treatment_ID),0) from discharge_summery where Treatment_ID="+tID;
			Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
			int count = ((Number)refQuery.uniqueResult()).intValue(); 
			
			String sqlPhycal="select ifnull(count(treatment_id),0) as treat_count from ehat_treatment where phydis_flag='Y' and treatment_id="+tID;
			Query sqlPhycalQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlPhycal);
			int countPhysical = ((Number)sqlPhycalQuery.uniqueResult()).intValue(); 
			
        	if(count > 0 && countPhysical==0){
        		     				
    			Query bet = sessionFactory.getCurrentSession().createQuery("Select billDetailsId From BillDetailsIpdDto WHERE  onBedFlag ='Y' and  treatmentId =:tid and serviceId=3 and subServiceId != 0");
    			bet.setParameter("tid", tID);
    			int bedBillId = (Integer) bet.uniqueResult();
    			
    			Query betNurse = sessionFactory.getCurrentSession().createQuery("Select billDetailsId From BillDetailsIpdDto WHERE  onBedFlag ='Y' and  treatmentId =:tid and serviceId=3 and subServiceId = 0");
    			betNurse.setParameter("tid", tID);
    			int nurseBillId = (Integer) betNurse.uniqueResult();
    			
    			Query bedIdQuery = sessionFactory.getCurrentSession().createQuery("Select subServiceId From BillDetailsIpdDto WHERE  onBedFlag ='Y' and  treatmentId =:tid and serviceId=3 and subServiceId != 0");
    			bedIdQuery.setParameter("tid", tID);
    			int bedId1 = (Integer) bedIdQuery.uniqueResult();   			
    						
    			String bedFlagQueuery = "update ehat_bill_details_ipd set on_bed_flag = 'N' where bill_details_id = "+bedBillId;
    			SQLQuery sqlQuery1 = sessionFactory.getCurrentSession().createSQLQuery(bedFlagQueuery);
    			sqlQuery1.executeUpdate();
    			
    			String nurseFlagQueuery = "update ehat_bill_details_ipd set on_bed_flag = 'N' where bill_details_id = "+nurseBillId;
    			SQLQuery sqlQuery2 = sessionFactory.getCurrentSession().createSQLQuery(nurseFlagQueuery);
    			sqlQuery2.executeUpdate();
    		
    			String treatBedQueuery = "update beds b,treatment_beds tb set tb.status = 'N',b.idbedstate = 2 where tb.Bed_ID=b.Bed_ID and tb.Treatment_ID = "+tID;
    			SQLQuery sqlQuery3 = sessionFactory.getCurrentSession().createSQLQuery(treatBedQueuery);
    			sqlQuery3.executeUpdate();
    			
    			java.util.Calendar currentDate = java.util.Calendar.getInstance();
    			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:MM:ss");
    			String todays_date_time = formatter.format(currentDate.getTime());
    			
    			String bedPhysicalFlagQueuery = "update treatment_beds tb set Out_Time= '"+todays_date_time+"',closed_By= "+userId+", tb.closed_date_time='"+todays_date_time+"' where tb.Bed_ID="+bedId1+" and tb.Treatment_ID = "+tID;
    			SQLQuery sqlQuery4 = sessionFactory.getCurrentSession().createSQLQuery(bedPhysicalFlagQueuery);
    			sqlQuery4.executeUpdate();	        		     		
        	}*/       
        	
        	Query prefixSp = sessionFactory.getCurrentSession().createSQLQuery("call sp_update_beds_details_for_close_treat(:treatmentId,:userId)");
			prefixSp.setParameter("treatmentId", treatmentId);
			prefixSp.setParameter("userId", userId);
			prefixSp.executeUpdate();  

            Query q1 = sessionFactory
                    .getCurrentSession()
                    .createSQLQuery(
                            "select Treatment_ID from discharge_summery where Treatment_ID = (:tId)")
                    .setParameter("tId", treatmentId);

            List<Integer> rows = q1.list();

            Query q2 = sessionFactory
                    .getCurrentSession()
                    .createSQLQuery(
                            "select treatmentId from ipd_patient_discharge_summary where treatmentId = (:tId)")
                    .setParameter("tId", treatmentId);

            List<Integer> rows1 = q2.list();

            // List<Integer> rows = billDetailsDocId.list();

            // latest list of doctors
            /*
             * if (!doctorIdList.equalsIgnoreCase("") &&
             * !doctorIdList.equalsIgnoreCase(null)) { String[] ary =
             * doctorIdList.split(","); for (int i = 0; i < ary.length; i++) {
             * int docId = Integer.parseInt(ary[i]);
             */
            if (rows.contains(treatmentId)) {

                // If the doctor is allready exist update deleted flag by N
                /*
                 * Query alfa2 = sessionFactory.getCurrentSession()
                 * .createSQLQuery
                 * ("update ehat_bill_details set deleted = 'N',updated_by = "
                 * +userId
                 * +",updated_date_time = now() where bill_id = "+billDetailsDto
                 * .getBillId() +" and service_id = 2 and doctor_id ="+docId);
                 *
                 * int result2 = alfa2.executeUpdate();
                 */
                Session session = sessionFactory.getCurrentSession();
                Date d = new Date(new java.util.Date().getTime());
                String hql = "UPDATE TreatmentDto set tFlag =:flag,updatedDateTime=:date,updatedBy=:user,deleted=:delet WHERE treatmentId =:treatmentId";
                Query query = session.createQuery(hql);
                query.setParameter("flag", "N");
                query.setParameter("date", d);
                query.setParameter("user", userId);
                query.setParameter("delet", "N");

                query.setParameter("treatmentId", treatmentId);
                query.executeUpdate();

                Session sessionBill = sessionFactory.getCurrentSession();
                
                hql = "update ehat_bill_master set invoice_flag='Y', updated_date_time=now(), updated_by="+userId+" where treatment_id="+treatmentId;
                Query queryBill = sessionBill.createSQLQuery(hql);
                queryBill.executeUpdate();
                /*hql = "UPDATE BillMasterDto set invoiceFlag =:flag,updatedDateTime=:date,updatedBy=:user WHERE treatmentId =:treatmentId";
                Query queryBill = sessionBill.createQuery(hql);
                queryBill.setParameter("flag", "Y");
                queryBill.setParameter("date", d);
                queryBill.setParameter("user", userId);
                queryBill.setParameter("treatmentId", treatmentId);
                queryBill.executeUpdate();*/
               //int clean = cleanBedsAfterDischarge(treatmentId,userId);//cleaning beds
                ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
                String profeesFlowOnBillPayButton = resourceBundle.getObject("profeesFlowOnBillPayButton").toString();
                
                if (profeesFlowOnBillPayButton.equalsIgnoreCase("on")) {
                    // to get max receipt master id for paid status
                    Query getMaxId = sessionFactory
                            .getCurrentSession()
                            .createSQLQuery(
                                    "SELECT max(bill_receipt_id) as bill_receipt_id FROM ehat_receipt_master_ipd where treatment_id="
                                            + treatmentId);

                    int maxId = (Integer) getMaxId.uniqueResult();

                    // get paid status
                    Query getBillStatus = sessionFactory.getCurrentSession()
                            .createSQLQuery(
                                    "select receipt_status from ehat_receipt_master_ipd where bill_receipt_id="
                                            + maxId);
                    String billStatus = (getBillStatus.list().get(0))
                            .toString();

                    // to get invoice flag Y/N
                    Query getInvoiceFlag = sessionFactory.getCurrentSession()
                            .createSQLQuery(
                                    "select invoice_flag from ehat_bill_master where treatment_id="
                                            + treatmentId);

                    String invFlag = (getInvoiceFlag.list().get(0)).toString();

                    // if full paid and invoice flag is generated
                    // Professional fees starts
                    if (billStatus.equalsIgnoreCase("paid")
                            && invFlag.equals("Y")) {

                        // get all service by treatment id
                        Criteria criteriaProFees = sessionFactory
                                .getCurrentSession().createCriteria(
                                        IpdBillReceiptSlaveDTO.class);
                        criteriaProFees.add(Restrictions.eq("deleted", "N"));
                        criteriaProFees.add(Restrictions.eq("treatmentId",
                                treatmentId));

                        List<IpdBillReceiptSlaveDTO> listBillReceiptSlave = new ArrayList<IpdBillReceiptSlaveDTO>();
                        listBillReceiptSlave = criteriaProFees.list();

                        // to get refer doctor id
                        Query que = sessionFactory.getCurrentSession()
                                .createSQLQuery(
                                        "select ref_doc_id from ehat_treatment where treatment_id="
                                                + treatmentId);

                        Integer refDocId = (Integer) que.uniqueResult();

                        // call profees for credit paid bill
                        professionalFeesIpd(listBillReceiptSlave, refDocId);
                    }
                }
                result = true;

            }

            if (rows1.contains(treatmentId)) {

                Session session = sessionFactory.getCurrentSession();
                Date d = new Date(new java.util.Date().getTime());
                String hql = "UPDATE TreatmentDto set tFlag =:flag,updatedDateTime=:date,updatedBy=:user,deleted=:delet WHERE treatmentId =:treatmentId";
                Query query = session.createQuery(hql);
                query.setParameter("flag", "N");
                query.setParameter("date", d);
                query.setParameter("user", userId);
                query.setParameter("delet", "N");
                query.setParameter("treatmentId", treatmentId);
                query.executeUpdate();

                Session sessionBill = sessionFactory.getCurrentSession();
                hql = "UPDATE BillDetailsIpdDto set invoiceFlag =:flag,updatedDateTime=:date,updatedBy=:user WHERE treatmentId =:treatmentId";
                Query queryBill = sessionBill.createQuery(hql);
                queryBill.setParameter("flag", "Y");
                queryBill.setParameter("date", d);
                queryBill.setParameter("user", userId);
                queryBill.setParameter("treatmentId", treatmentId);
                queryBill.executeUpdate();
               // int clean = cleanBedsAfterDischarge(treatmentId,userId);//cleaning beds
               
                ResourceBundle resourceBundle = ResourceBundle
                        .getBundle("EhatEnterpriseConfigurationFile");
                String profeesFlowOnBillPayButton = resourceBundle.getObject(
                        "profeesFlowOnBillPayButton").toString();
                System.err.println("profeesFlowOnBillPayButton==>>"
                        + profeesFlowOnBillPayButton);
                if (profeesFlowOnBillPayButton.equalsIgnoreCase("on")) {
                    // to get max receipt master id for paid status
                    Query getMaxId = sessionFactory
                            .getCurrentSession()
                            .createSQLQuery(
                                    "SELECT max(bill_receipt_id) as bill_receipt_id FROM ehat_receipt_master_ipd where treatment_id="
                                            + treatmentId);

                    int maxId = (Integer) getMaxId.uniqueResult();

                    // get paid status
                    Query getBillStatus = sessionFactory.getCurrentSession()
                            .createSQLQuery(
                                    "select receipt_status from ehat_receipt_master_ipd where bill_receipt_id="
                                            + maxId);
                    String billStatus = (getBillStatus.list().get(0))
                            .toString();

                    // to get invoice flag Y/N
                    Query getInvoiceFlag = sessionFactory.getCurrentSession()
                            .createSQLQuery(
                                    "select invoice_flag from ehat_bill_master where treatment_id="
                                            + treatmentId);

                    String invFlag = (getInvoiceFlag.list().get(0)).toString();

                    // if full paid and invoice flag is generated
                    // Professional fees starts
                    if (billStatus.equalsIgnoreCase("paid")
                            && invFlag.equals("Y")) {

                        // get all service by treatment id
                        Criteria criteriaProFees = sessionFactory
                                .getCurrentSession().createCriteria(
                                        IpdBillReceiptSlaveDTO.class);
                        criteriaProFees.add(Restrictions.eq("deleted", "N"));
                        criteriaProFees.add(Restrictions.eq("treatmentId",
                                treatmentId));

                        List<IpdBillReceiptSlaveDTO> listBillReceiptSlave = new ArrayList<IpdBillReceiptSlaveDTO>();
                        listBillReceiptSlave = criteriaProFees.list();

                        // to get refer doctor id
                        Query que = sessionFactory.getCurrentSession()
                                .createSQLQuery(
                                        "select ref_doc_id from ehat_treatment where treatment_id="
                                                + treatmentId);

                        Integer refDocId = (Integer) que.uniqueResult();

                        // call profees for credit paid bill
                        professionalFeesIpd(listBillReceiptSlave, refDocId);
                    }
                }       
                
    			result = true;

            }
            
            // Added by vinod
			setBillMasterTotalsIpd(treatmentId,sessionFactory.getCurrentSession());
			setMultiSponsorTotalsForIpd(treatmentId);
			
			// added for update free follow up count in  ehat_patient
			updateFreeFollowUpCount(treatmentId);
			// end for free follow up count
			

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("ehatException:- Class Name :"
                    + e.getStackTrace()[0].getClassName() + " Method Name : "
                    + e.getStackTrace()[0].getMethodName() + " Line No :"
                    + e.getStackTrace()[0].getLineNumber());
            return false;
        }
        return result;
    }			
   
	/**
	 * @code for sponsor wise charges
	 * @date 30-JUN-2017**/
	@Override
	public List<BillNobleServiceDto2> getPatientServiceBillSponsor(
			Integer treatmentId, Integer serviceId, Integer chargesSlaveId) {
		List<BillNobleServiceDto2> ltPatientRecord1 = new ArrayList<BillNobleServiceDto2>();
		try {
			
			
			 if( serviceId==2 )
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
	        	 ltPatientRecord1.add(objDTO);
	        	 objDTO=null;
	         }
	         
	        	 
				}
			 else{
	         
	        
			   String sql1 = "SELECT * FROM patient_sub_service_details2 where treatment_id = '"+treatmentId+"' " +
	                "and service_id='"+serviceId+"' and chargesSlave_id in('"+chargesSlaveId+"', 0) and deleted !='Y'";
				
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
		         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         List<Map<String, Object>> data1 = query1.list();
         		         
		         
		         for(Map<String, Object> row : data1){
		        	 
		        	 BillNobleServiceDto2 objDTO1= new BillNobleServiceDto2();
		        	 
		        	 objDTO1.setServiceId((Integer)row.get("service_id"));
		        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO1.setCategoryName((String)row.get("category_name"));
		        	 objDTO1.setDocName((String)row.get("doc_name"));
		        	 objDTO1.setDocId((Integer)row.get("Doctor_ID"));
		        	 //objDTO1.setDocId(Integer)row.get("Doctor_ID"));
		        	 
		        	 objDTO1.setCharges((Double)row.get("rate"));
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
		        
		        	 objDTO1.setCreatedDate((Date)row.get("created_date"));
		        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
		        	 objDTO1.setPaidFlag((String)row.get("paid_flag"));

		        	 ltPatientRecord1.add(objDTO1);
		        	 objDTO1=null;
		         }
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			//return ltPatientRecord1;
		}
		return ltPatientRecord1;
	}
	

	// Irfan Khan @date: 20-June-2017 @reason : To calculate and insert profees
	public int professionalFeesIpd(List<IpdBillReceiptSlaveDTO> lstSlave,
			Integer refDocId) {

		System.err.println("inside Profees!!!");
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
				professionalFeesDto.setAmount(slave.getAmount()
						- slave.getConcession());
				professionalFeesDto.setTreatmentId(slave.getTreatmentId());
				professionalFeesDto.setPatientId(slave.getPatientId());
				professionalFeesDto.setBillReceiptMasterId(slave
						.getBillReceiptMasterId());
				professionalFeesDto.setBillReceiptSlaveId(slave
						.getBillRecSlaveId());
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
				// int refDrId = 0;
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

					Query q1 = sessionFactory.getCurrentSession()
							.createSQLQuery(
									"SELECT refDocPer FROM hospitalaccinfo");

					@SuppressWarnings("unchecked")
					List<Double> list1 = q1.list();
					if (list1.size() > 0) {
						refper = list1.get(0);
					}

					if (slave.getServiceId() == 1) {// registration
						// System.err.println("in for service 1!!");
						hospitalPercent = 100 - refper;
						refPfCut = (refper * slave.getAmount()) / 100;

						hospitalPercentInAmount = slave.getAmount() - refPfCut;
					} else {
						// System.err.println("in for all service but not 1!!");
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
				professionalFeesDto
						.setHospPercentInAmount(hospitalPercentInAmount);

				// insert record in profees table
				sessionFactory.getCurrentSession().merge(professionalFeesDto);
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
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 25_July_2017 
	 * @Code Fetching patient data bye id for Opd Sponsor.
	 ******************************************************************************/
	@Override
	public List<BillNobleDtoForOpdSponsor> fetchPatientBillAmountForOpdSponsor(
			Integer treatmentId) {
		try {
			
			List<BillNobleDtoForOpdSponsor> ltPatientRecord = new ArrayList<BillNobleDtoForOpdSponsor>();
			
			 String sql = "SELECT * FROM patient_service_detail_For_Opd_Sponsor where treatment_id = '"+treatmentId+"'";
	         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
	         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         List<Map<String, Object>> data = query.list();
	       
	         for(Map<String, Object> row : data){
	        	 
	        	 BillNobleDtoForOpdSponsor objDTO= new BillNobleDtoForOpdSponsor();
	        	 objDTO.setServiceId((Integer)row.get("service_id"));
	        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
	        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
	        	
	        	 objDTO.setServiceName((String)row.get("service_name"));
	        	 objDTO.setAmount((Double)row.get("amount"));
	        	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
	        	
	        	 System.err.println("HIII"+objDTO.getServiceName());
	        	 ltPatientRecord.add(objDTO);
	        	 
	        	 objDTO=null;
	         }
	         
	         return ltPatientRecord;
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return null;
		}
		
	}
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 26_July_2017 
	 * @Code Fetching patient data bye id for given particular access for Opd sponsor to user.
	 ******************************************************************************/
	@Override
	public List<BillNobleDtoForOpdSponsor> fetchPatientBillAmountForOpdSponsor(
			Integer treatmentId, Integer userId) {
		List<BillNobleDtoForOpdSponsor> ltPatientRecord = new ArrayList<BillNobleDtoForOpdSponsor>();
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
				 String sql = "SELECT * FROM patient_service_detail_For_Opd_Sponsor where treatment_id = "+treatmentId+" and service_id="+Integer.parseInt(servIds1[i])+"";
				 SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		         List<Map<String, Object>> data = query.list();
		       
		         for(Map<String, Object> row : data){
		        	 
		        	 BillNobleDtoForOpdSponsor objDTO= new BillNobleDtoForOpdSponsor();
		        	 objDTO.setServiceId((Integer)row.get("service_id"));
		        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
		        	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
		        	
		        	 objDTO.setServiceName((String)row.get("service_name"));
		        	 objDTO.setAmount((Double)row.get("amount"));
		        	 objDTO.setServiceCount((BigInteger)row.get("service_count"));
		        	
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
			//return ltPatientRecord;
		}
		return ltPatientRecord;
	}
	@Override
	public List<PatientSubServiceDetailsForOpdPackage> getPackagedataforOpd(Integer pSId,
			Integer pSubSId, Integer chargesSlaveId, Integer sponsorId,Integer treatmentId, Integer patientId,Integer billDetailsId) {
		
		
		List<PatientSubServiceDetailsForOpdPackage> ltPatientRecord = new ArrayList<PatientSubServiceDetailsForOpdPackage>();
		try {
			  
			Session session = sessionFactory.getCurrentSession();
		
			 //Date d=new Date(new java.util.Date().getTime());
			
			 String hql = "from PatientSubServiceDetailsForOpdPackage  WHERE" +
			 		" bill_details_id =:billDetailsId and treatment_id =:treatmentId and service_id=:pSId and sub_service_id=:pSubSId ORDER BY childServiceId ";
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
			//return ltPatientRecord;
		}
		return ltPatientRecord;
	}
	
	
	
		/*List<PatientSubServiceDetailsForOpdPackage> ltPatientRecord1 = new ArrayList<PatientSubServiceDetailsForOpdPackage>();

		
		 String sql1 = "SELECT * FROM patient_sub_service_details_for_opdpackage where treatment_id='"+treatmentId+"' and service_id = '"+pSId+"' " +
		 		"and sub_service_id='"+pSubSId+"' and charges_id='"+sponsorId+"'and chargesSlave_id='"+chargesSlaveId+"'";
			
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
	         query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         List<Map<String, Object>> data1 = query1.list();
  		         
	         
	         for(Map<String, Object> row : data1){
	        	 
	        	 PatientSubServiceDetailsForOpdPackage objDTO1= new PatientSubServiceDetailsForOpdPackage();
	        	 
	       	        	 
	        	 objDTO1.setOtherBillDetailsId((Integer) row.get("other_bill_details_id_for_Opd"));
	        	 objDTO1.setCreatedDateTime((Date) row.get("created_date_time"));
	        	 objDTO1.setBillDetailsId((Integer) row.get("bill_details_id"));
	        	 objDTO1.setTreatmentId((Integer) row.get("treatment_id"));
	        	 objDTO1.setChargesSlaveId((Integer)row.get("chargesSlave_id"));
	        	 objDTO1.setChargesId((Integer) row.get("charges_id"));
	        	 
	        	 objDTO1.setChildSubServiceId((Integer)row.get("child_sub_service_id"));
	        	 
	        	 objDTO1.setServiceId((Integer)row.get("service_id"));
	        	 objDTO1.setTreatmentId((Integer)row.get("treatment_id"));
	        	 objDTO1.setCategoryName((String)row.get("category_name"));
	        	 objDTO1.setDocName((String)row.get("doc_name"));
	        	 objDTO1.setDocId((Integer)row.get("Doctor_ID"));
	        	 objDTO1.setRate((Double)row.get("rate"));
	        	 objDTO1.setAmount((Double)row.get("amount"));
	        	 objDTO1.setBillDetailsId((Integer)row.get("bill_details_id"));
	        	 objDTO1.setQuantity((Double)row.get("quantity"));
	        	 objDTO1.setConcession((Double)row.get("concession"));
	        	 objDTO1.setPay((Double)row.get("pay"));
	        	 objDTO1.setCoPay((Double)row.get("co_pay"));
	        	 objDTO1.setCancle((String)row.get("cancle"));
	        	 objDTO1.setIsModify((String)row.get("isModify"));
	        	 objDTO1.setSubServiceId((Integer) row.get("sub_service_id"));
	        	 objDTO1.setPaidFlag((String)row.get("paid_flag"));
	        	 objDTO1.setIscombination((String)row.get("iscombination"));
	        	
	        	 //sessionFactory.getCurrentSession().merge(objDTO1);
				 //Criteria criteriaRec = sessionFactory.getCurrentSession().createCriteria(PatientSubServiceDetailsForPackage.class);			

	        	 ltPatientRecord1.add(objDTO1);
	        	 objDTO1=null;	        	 
	         }
	         
	         
	         
	         return ltPatientRecord1;
	
	
	}*/
	@Override
	public boolean deleteOnClickForPackageOpd(Integer billDetailsId,
			Integer otherBillDetailsId, Integer userId) {
		try {

			//UnitMasterDto unitMaster = new UnitMasterDto();

			EhatOtherBillDetailForOpdDto ehatOtherBillDetailForOpdDto = (EhatOtherBillDetailForOpdDto) sessionFactory
					.getCurrentSession().get(EhatOtherBillDetailForOpdDto.class, otherBillDetailsId);
			ehatOtherBillDetailForOpdDto.setDeleted("Y");

			ehatOtherBillDetailForOpdDto.setDeletedDateTime(new Date(new java.util.Date().getTime()));
			ehatOtherBillDetailForOpdDto.setDeletedBy(userId);

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
		 if(unid==null){
			 unid=0; 
		 }
 		d=unid+" "+d;
 		
		return d;
 	}
	
 	/**@author   :Bilal
	 * @date     :17-Aug-2017
	 * @code     :for fetching list of package billing **/
	@SuppressWarnings("unchecked")
	@Override
	public List<BillNobleServicePackageDto> getlistOfPackageOpd(Integer treatmentId) {
		
		List<BillNobleServicePackageDto> listBillNobleServiceDto = new ArrayList<BillNobleServicePackageDto>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BillNobleServicePackageDto.class);
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.add(Restrictions.eq("isCombination", "Y"));
			criteria.add(Restrictions.eq("cancle", "N"));
			criteria.add(Restrictions.eq("paidFlag", "N"));
			criteria.add(Restrictions.eq("deleted", "N"));
		
			
			listBillNobleServiceDto = criteria.list();
			

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			//return listBillNobleServiceDto;
		}
		return listBillNobleServiceDto;
	}
	
	/**@author   :Bilal
	 * @date     :18-Aug-2017
	 * @code     :for converting services to package **/
	@Override
	public int convertServiceToPackage(BillDetailsDto billdetails,
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
					BillDetailsDto obj = (BillDetailsDto) sessionFactory
							.getCurrentSession().get(BillDetailsDto.class,
									Integer.parseInt(id));
					double amount =obj.getAmount();
					double concs  =obj.getConcession();
					double rate   =obj.getRate();
					double quant  =obj.getQuantity();
					String iscom  =obj.getIscombination();
					double famount =amount - concs;
					
					
					obj.setDeleted("Y");
					obj.setCancle("Y");
					obj.setDeletedBy(userId);
					obj.setDeletedDateTime(new Date(new java.util.Date().getTime()));
					
					//saving data in other bill details table
					EhatOtherBillDetailForOpdDto objOther=new EhatOtherBillDetailForOpdDto();
					
					objOther.setAmount(amount);
					objOther.setCoPay(famount);
					objOther.setPay(obj.getPay());
					objOther.setRate(obj.getRate());
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
				    
				  //setting deleted flag and cancle flag Y of services whose bill details 
					SubServiceDto subobj = (SubServiceDto) sessionFactory
							.getCurrentSession().get(SubServiceDto.class,
									obj.getSubServiceId());
				    objOther.setIscombination(subobj.getIscombination());
				    objOther.setExtraFlag("Y");
				    
					sessionFactory.getCurrentSession().merge(objOther);
					
					// add code for update pack details in pathology_sample_wise_master table
		      	Criteria c=sessionFactory.getCurrentSession().createCriteria(PathologySampleWiseMaster.class);
					c.add(Restrictions.eq("bilDetId", billDetailsId));
					c.add(Restrictions.eq("deleted", "N"));
					List<PathologySampleWiseMaster> listPMaster=c.list();
					if(listPMaster.size() > 0) {
						System.out.println("packageId==="+listPMaster.get(0).getPackageId());
						System.out.println("sample Count==="+listPMaster.get(0).getSampleCount());
						System.out.println("bilDetId==="+listPMaster.get(0).getBilDetId());
						String hql="UPDATE PathologySampleWiseMaster set packageId="+listPMaster.get(0).getPackageId()+",bilDetId="+listPMaster.get(0).getBilDetId()+",sampleCount="+listPMaster.get(0).getSampleCount()+" where bilDetId="+Integer.parseInt(id)+" and treatmentId="+listPMaster.get(0).getTreatmentId()+" ";
						Query q = sessionFactory.getCurrentSession().createQuery(hql);
						q.executeUpdate();
					}
					// end code 
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
	 * @date     :18-Aug-2017
	 * @code     :for including amount in billing **/
	@Override
	public int includeInPackAmount(BillDetailsDto billdetails,
			HttpServletRequest request, Integer pSubserviceId, Integer pservId,
			Integer billDetailsId, double packamount, double totalAmtPackage,double totalRem,String receiptOf) {
		int records =0;
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
					//setting total amount of package 
					BillDetailsDto obj = (BillDetailsDto) sessionFactory
							.getCurrentSession().get(BillDetailsDto.class,
									billDetailsId);
					String paidFlag   =obj.getPaidFlag();
					double rate       =obj.getRate();
					double quantity   =obj.getQuantity();
					double concession =obj.getConcession();
					
					double otherate     =obj.getOtherRate();
					double othercon     =obj.getOtherConcession();
					
					double amount      =obj.getAmount();
					double copay       =obj.getCoPay();
					double otheramount =obj.getOtherAmount();
					double otherpay    =obj.getOtherPay();
					//double pay   =0;
					if (paidFlag.equals("Y")) {
						records=2;
					} else {
						
						if (receiptOf.equals("sponsor")) {
							otherate = (otherate + totalRem);
							otheramount = otherate *quantity;
							otherpay = otheramount - othercon;
						} else {
							rate = rate + totalRem;
							amount =rate*quantity;
							copay =amount -concession;
						}
						
						
						obj.setRate(rate);
						obj.setAmount(amount);
						obj.setCoPay(copay);
						
						obj.setOtherRate(otherate);
						obj.setOtherAmount(otheramount);
						obj.setOtherPay(otherpay);
						obj.setOtherConcession(othercon);
						
						records=1;
					}
					
					//obj.setCoPay(copay);
			  
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			//return records;
		}
		return records;
	}
	
	/**@author   :Bilal
	 * @date     :18-Aug-2017
	 * @code     :for converting services to Billing **/
	@Override
	public int convertToBillingOPD(BillDetailsDto billdetails,
			HttpServletRequest request, Integer treatmentId,
			String otherBillDetailsIdOpd, int sponsorId, int chargesSlaveId) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			// get checked service masters
			String[] servIds;
			if (otherBillDetailsIdOpd.length() > 0) {
				servIds = otherBillDetailsIdOpd.split(",");
				for (String id : servIds) {
					
					//setting deleted flag and cancle flag Y of services whose other bill details 
					EhatOtherBillDetailForOpdDto obj = (EhatOtherBillDetailForOpdDto) sessionFactory
							.getCurrentSession().get(EhatOtherBillDetailForOpdDto.class,
									Integer.parseInt(id));
					
					obj.setDeleted("Y");
					obj.setCancle("Y");
					obj.setDeletedBy(userId);
					obj.setDeletedDateTime(new Date(new java.util.Date().getTime()));
					//saving data in other bill details table
					BillDetailsDto obje=new BillDetailsDto();
					double rate = obj.getRate();
					double cons = obj.getConcession();
					double quan = obj.getQuantity();
					
					double amount = rate*quan;
					double copy  = amount - cons;
					double otherp= 0.0;
					double othercp= 0.0;
					double pay =0;
					double consper=((cons * 100 ) / amount);
					
					obje.setAmount(amount);
					obje.setRate(rate);
					if (sponsorId > 0 && chargesSlaveId > 0) {
						copy  = amount - cons;
						otherp = amount - cons;
					}
					obje.setCoPay(copy);
					obje.setPay(pay);
					obje.setOtherPay(otherp);
					
					obje.setQuantity(quan);
					obje.setConcession(cons);
					
					obje.setOtherAmount(obj.getOtherAmount());
					obje.setOtherRate(obj.getOtherRate());
					obje.setOtherCoPay(obj.getOtherCoPay());
					obje.setConcession(cons);
					obje.setConcessionOnPerc(consper);
					
					obje.setOtherConcession(obj.getOtherConcession());
					
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
				    obje.setIscombination(obj.getIscombination());
				    obje.setPaidFlag("N");
				    obje.setUrgentflag("N");
				    obje.setUnitId(unitId);
					BillDetailsDto maxBillid = (BillDetailsDto) sessionFactory.getCurrentSession().merge(obje);
					System.out.println("maxBillid====="+maxBillid.getBillDetailsId());
					// update code for pathology_sample_wise_master
					Criteria cb = sessionFactory.getCurrentSession().createCriteria(PathologySampleWiseMaster.class);
					cb.add(Restrictions.eq("treatmentId", treatmentId));
					cb.add(Restrictions.eq("subServiceId", obj.getChildSubServiceId()));
					cb.add(Restrictions.eq("deleted", "N"));
					
				    List<PathologySampleWiseMaster>	listPMaster=cb.list();
				        for(PathologySampleWiseMaster pobj :listPMaster) {
				        	pobj.setPackageId(0);
				        	pobj.setBilDetId(maxBillid.getBillDetailsId());
				        	
				       String sql1 = "update pathology_sample_wise_slave set package_id =0  where  master_id =" +pobj.getSampleWiseMasterId();
				      SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				      q.executeUpdate();
				        
				        }
					
					// end code
					
					String iscombination=obj.getIscombination();
					int childserid  =obj.getChildServiceId();
					int childsubsid =obj.getChildSubServiceId();
					int chargesid   =obj.getChargesId();
					int chargesSlaveid =obj.getChargesSlaveId();
					int hallId  =0;
					int hallslaveid=0;
					if (iscombination.equals("Y")) {
						
						// max count of bill details id
						Criteria criteriaMax = sessionFactory.getCurrentSession()
								.createCriteria(BillDetailsDto.class);
						criteriaMax.setProjection(Projections.max("billDetailsId"));
						Integer maxBillId = (Integer) criteriaMax.uniqueResult();

						if(maxBillId == null){
							maxBillId = 0;
						}
						
						String query1="SELECT service_id , charges  FROM ehat_configuration_services where charges_id="
												+ chargesid
												+ " and chargesSlave_id="
												+ chargesSlaveid
												+ " and is_com_servId=" + childserid
												+ " and is_com_servlastId=" + childsubsid
												+ " and hall_id=" + hallId
												+ " and hallSlave_id=" + hallslaveid
												+ " and deleted='N'";
						
						 
						
						SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);    
		                query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		                
		           
		                List<Map<String, Object>> data = query.list();
						for (Map<String, Object> row : data) {

							EhatOtherBillDetailForOpdDto obj2 = new EhatOtherBillDetailForOpdDto();

							
							
							double ocopay = 0;
							double opay = 0;
							double concession = 0;
							double charges = (Double) row.get("charges");
							double amountofcon = 0;
							double quantity =1;
							obj2.setRate((Double) row.get("charges"));
							
							obj2.setChildSubServiceId((Integer) row.get("service_id"));
		                   
		                    
							obj2.setSubServiceId(obj.getChildSubServiceId());

							obj2.setServiceId(obj.getServiceId());
							obj2.setBillId(obj.getBillId());
							obj2.setBillDetailsId(maxBillId);
							
							obj2.setCreatedBy(userId);
							obj2.setCreatedDateTime(new Date(new java.util.Date()
									.getTime()));

							obj2.setCancle("N");
							obj2.setDeleted("N");

							obj2.setUnitId(unitId);
							obj2.setDepartmentId(obj.getDepartmentId());
							obj2.setDoctorId(obj.getDoctorId());

							obj2.setTreatmentId(obj.getTreatmentId());
							obj2.setPatienttId(obj.getPatienttId());

							obj2.setChargesId(sponsorId);
							obj2.setChargesSlaveId(chargesSlaveId);

							amountofcon = charges * quantity;
							ocopay = charges * quantity - concession;
							opay = amountofcon - ocopay;

							obj2.setAmount(amountofcon);
							obj2.setCoPay(ocopay);
							obj2.setPay(opay);
							obj2.setConcession(concession);

							obj2.setQuantity(quantity);
							obj2.setIscombination(iscombination);

							//setting service id in other bill details table
							Integer subId=(Integer) row.get("service_id");
							SubServiceDto objes = (SubServiceDto) sessionFactory
									.getCurrentSession().get(SubServiceDto.class,
											subId);
							obj2.setChildServiceId(objes.getServiceId());
							
							sessionFactory.getCurrentSession().merge(obj2);
								
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
			return 0;
		}
		return 1;
	}
	
	
	private int cleanBedsAfterDischarge(Integer treatmentId,int userId) {
		//select sub_service_id from ehat_bill_details_ipd where service_id=3 and sub_service_id !=0 and treatment_id=117;
		try {
			//service_id 3 means bed service service id
			String sql = "select sub_service_id from ehat_bill_details_ipd where service_id=3 and sub_service_id !=0 and treatment_id=:treatmentId";
			Query query =  sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setParameter("treatmentId",treatmentId);
			//query.executeUpdate();
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			List<Map<String, Object>> data = query.list();
		         
	         for(Map<String, Object> row : data){
	        	int bedID= (Integer)row.get("sub_service_id");
	        	//2 means cleaing stage of bed createSQLQuery/createQuery
	        	String update = "UPDATE beds set idbedstate =2 WHERE Bed_ID =:bedID";
				Query queryUpdate =  sessionFactory.getCurrentSession().createSQLQuery(update);
				queryUpdate.setParameter("bedID", bedID);
				queryUpdate.executeUpdate();
				
				String hql = "UPDATE ehat_bill_details_ipd set on_bed_flag =:flag,updated_date_time=:date,updated_by=:user WHERE treatment_id =:treatmentId and service_id=:sid " +
							"and sub_service_id=:subid";
				Query queryBill =  sessionFactory.getCurrentSession().createSQLQuery(hql);
				queryBill.setParameter("flag", "N");
				queryBill.setParameter("sid", 3);
				queryBill.setParameter("subid", bedID);
				queryBill.setParameter("date", Calendar.getInstance());
				queryBill.setParameter("user", userId);
				queryBill.setParameter("treatmentId", treatmentId);
				queryBill.executeUpdate();
				
				
				String hql3 = "UPDATE ehat_bill_details_ipd set on_bed_flag =:flag,updated_date_time=:date,updated_by=:user WHERE treatment_id =:treatmentId and service_id=:sid " +
						"and sub_service_id=:subid";
			Query queryBill3 =  sessionFactory.getCurrentSession().createSQLQuery(hql3);
			queryBill3.setParameter("flag", "N");
			queryBill3.setParameter("sid", 3);
			queryBill3.setParameter("subid", 0);
			queryBill3.setParameter("date", Calendar.getInstance());
			queryBill3.setParameter("user", userId);
			queryBill3.setParameter("treatmentId", treatmentId);
			queryBill3.executeUpdate();
				
			
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String todays_date_time = formatter.format(currentDate.getTime());
				
				String updateTreaBeds = "update treatment_beds set status='N',Out_Time =:OutTime, closed_By=:user,closed_date_time=:date where Bed_ID =:bedID and status='Y'";
				Query queryTreaBeds =  sessionFactory.getCurrentSession().createSQLQuery(updateTreaBeds);
				queryTreaBeds.setParameter("bedID", bedID);
				//queryTreaBeds.setParameter("OutTime", Calendar.getInstance().getTime());
				queryTreaBeds.setParameter("OutTime", todays_date_time);
				queryTreaBeds.setParameter("date", Calendar.getInstance());
				queryTreaBeds.setParameter("user", userId);
				queryTreaBeds.executeUpdate();
	         }
	        	 
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return -1;
		}
		
		
		return 0;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public int giveDiscountInBilling(HttpServletRequest request,
			Integer treatmentId, Integer billId, double disc, String discBy,
			int indentFlag, int patientFlag, int otFlag, String narration) {

		try {
			if (indentFlag == 1) {

				String sql = "select indent_id from pharma_indent_master where indent_treatement_id="
						+ treatmentId;

				String hql = "UPDATE pharma_indent_sale_master set billing_discount =?,disc_given_by=?,disc_given_date=?,disc_narration=?,disc_bill_id=?,bill_login_user_id=? WHERE indent_sale_indent_no in("+sql+")";
				Query queryBill = sessionFactory.getCurrentSession()
						.createSQLQuery(hql);
				queryBill.setParameter(0, disc);
				queryBill.setParameter(1, discBy);
				queryBill.setParameter(2, Calendar.getInstance());
				queryBill.setParameter(3, narration);
				queryBill.setParameter(4, billId);
				queryBill.setParameter(5,
						Integer.parseInt(""+ request.getSession().getAttribute("userId1")));
				queryBill.executeUpdate();
				
				Query query2=sessionFactory.getCurrentSession().createSQLQuery("select indent_sale_net_amt,indent_sale_amt_balance,indent_sale_id from pharma_indent_sale_master where indent_sale_indent_no in("+sql+")");
				List<Object[]> indentSaleMasters= query2.list();
				
				for (Object[] indentSaleMaster : indentSaleMasters) {

					double tmp2 = (Double.parseDouble(indentSaleMaster[1] + "") * disc)
							/ Double.parseDouble(indentSaleMaster[0] + "");

					String hql1 = "UPDATE pharma_indent_sale_slave set billing_discount =?,disc_given_by=?,disc_given_date=?,disc_narration=?,disc_bill_id=?,bill_login_user_id=?,billing_discount_amt=(indent_sale_slave_rem_amt*("
							+ disc
							/ 100
							+ ")),rem_amt_after_billing_disc=indent_sale_slave_rem_amt-billing_discount_amt WHERE indent_sale_slave_master_id =?";
					// ,indent_slave_Dis=indent_slave_Dis +
					// "+ tmp2+ ",indent_slave_Dis_Amt=indent_slave_Dis_Amt+(indent_sale_slave_rem_amt*("+disc/100+"))
					Query queryBill1 = sessionFactory.getCurrentSession()
							.createSQLQuery(hql1);
					queryBill1.setParameter(0, tmp2);
					queryBill1.setParameter(1, discBy);
					queryBill1.setParameter(2, Calendar.getInstance());
					queryBill1.setParameter(3, narration);
					queryBill1.setParameter(4, billId);
					queryBill1.setParameter(
							5,
							Integer.parseInt(""
									+ request.getSession().getAttribute(
											"userId1")));
					queryBill1.setParameter(6, indentSaleMaster[2]);
					queryBill1.executeUpdate();
				}
			}
			
			if (patientFlag == 1) {

				String hql = "UPDATE pharma_patient_sales_bill_master set billing_discount =?,disc_given_by=?,disc_given_date=?,disc_narration=?,disc_bill_id=?,bill_login_user_id=? WHERE patient_sale_treatmentId =?";//,patient_sales_bill_cd=(patient_sales_bill_cd +"+disc+")
				Query queryBill = sessionFactory.getCurrentSession()
						.createSQLQuery(hql);
				queryBill.setParameter(0, disc);
				queryBill.setParameter(1, discBy);
				queryBill.setParameter(2, Calendar.getInstance());
				queryBill.setParameter(3, narration);
				queryBill.setParameter(4, billId);
				queryBill.setParameter(5,
						Integer.parseInt(""+ request.getSession().getAttribute("userId1")));
				queryBill.setParameter(6, treatmentId);
				queryBill.executeUpdate();
				
				
				Query query2=sessionFactory.getCurrentSession().createSQLQuery("select patient_sales_bill_net_amt,patient_sales_bill_amount_balance,patient_sales_bill_id from pharma_patient_sales_bill_master where patient_sale_treatmentId="+treatmentId);
				List<Object[]> patientSaleMasters= query2.list();
				
				for (Object[] patientSaleMaster : patientSaleMasters) {

					double tmp2 = (Double.parseDouble(patientSaleMaster[1] + "") * disc)
							/ Double.parseDouble(patientSaleMaster[0] + "");

					String hql1 = "UPDATE pharma_patient_sales_bill_slave set billing_discount =?,disc_given_by=?,disc_given_date=?,disc_narration=?,disc_bill_id=?,bill_login_user_id=?,billing_discount_amt=(patient_sale_slave_rem_amt*("
							+ disc
							/ 100
							+ ")),rem_amt_after_billing_disc=patient_sale_slave_rec_amt-billing_discount_amt WHERE patient_slave_bill_master_id =?";

					Query queryBill1 = sessionFactory.getCurrentSession()
							.createSQLQuery(hql1);
					queryBill1.setParameter(0, tmp2);
					queryBill1.setParameter(1, discBy);
					queryBill1.setParameter(2, Calendar.getInstance());
					queryBill1.setParameter(3, narration);
					queryBill1.setParameter(4, billId);
					queryBill1.setParameter(
							5,
							Integer.parseInt(""
									+ request.getSession().getAttribute(
											"userId1")));
					queryBill1.setParameter(6, patientSaleMaster[2]);
					queryBill1.executeUpdate();
				}
			}
			
			if (otFlag == 1) {

				String hql = "UPDATE ehat_pharma_consumtion_master set billing_discount =?,disc_given_by=?,disc_given_date=?,disc_narration=?,disc_bill_id=?,bill_login_user_id=? WHERE patient_sale_treatmentId =?";
				Query queryBill = sessionFactory.getCurrentSession()
						.createSQLQuery(hql);
				queryBill.setParameter(0, disc);
				queryBill.setParameter(1, discBy);
				queryBill.setParameter(2, Calendar.getInstance());
				queryBill.setParameter(3, narration);
				queryBill.setParameter(4, billId);
				queryBill.setParameter(5,
						Integer.parseInt(""+ request.getSession().getAttribute("userId1")));
				queryBill.setParameter(6, treatmentId);
				queryBill.executeUpdate();
				
				Query query2=sessionFactory.getCurrentSession().createSQLQuery("select patient_sales_bill_net_amt,patient_sales_bill_amount_balance,patient_sales_bill_id from ehat_pharma_consumtion_master where patient_sale_treatmentId="+treatmentId);
				List<Object[]> otSaleMasters= query2.list();
				
				for (Object[] otSaleMaster : otSaleMasters) {

					double tmp2 = (Double.parseDouble(otSaleMaster[1] + "") * disc)
							/ Double.parseDouble(otSaleMaster[0] + "");

					String hql1 = "UPDATE ehat_pharma_consumtion_slave set billing_discount =?,disc_given_by=?,disc_given_date=?,disc_narration=?,disc_bill_id=?,bill_login_user_id=?,billing_discount_amt=(patient_sale_slave_rem_amt*("
							+ disc
							/ 100
							+ ")),rem_amt_after_billing_disc=patient_sale_slave_rem_amt-billing_discount_amt WHERE patient_slave_bill_master_id =?";

					Query queryBill1 = sessionFactory.getCurrentSession()
							.createSQLQuery(hql1);
					queryBill1.setParameter(0, tmp2);
					queryBill1.setParameter(1, discBy);
					queryBill1.setParameter(2, Calendar.getInstance());
					queryBill1.setParameter(3, narration);
					queryBill1.setParameter(4, billId);
					queryBill1.setParameter(
							5,
							Integer.parseInt(""
									+ request.getSession().getAttribute(
											"userId1")));
					queryBill1.setParameter(6, otSaleMaster[2]);
					queryBill1.executeUpdate();
				}
			}
			
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return 0;
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
			
			int billId = 0;
			int sonsrId = 0;			
			
			String sql22 = "select bill_id,charges_master_slave_id from ehat_bill_master where treatment_id="+treatmentId;
			Query labTestResQuery = sessionFactory.getCurrentSession().createSQLQuery(sql22);
			labTestResQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listLabTest = labTestResQuery.list();
			if(listLabTest.size()>0){
				for(Map<String, Object> row : listLabTest){
					
					billId = (Integer)row.get("bill_id");
					sonsrId = (Integer)row.get("charges_master_slave_id");
				}
			}
			
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
	
	
	public int setMultiSponsorTotalsForOpd(int treatmentId) {
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
		String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");   
		String pharmacy_Serve_Id = (String)resourceBundleEhat.getString("pharmacy");    
		int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
		int pharmacyServId = Integer.parseInt(pharmacy_Serve_Id);
		
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
	
	public int setMultiSponsorTotalsForIpd(int treatmentId) {
		
		int result=0;
		try {
			
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
			String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");   
			String pharmacy_Serve_Id = (String)resourceBundleEhat.getString("pharmacy");    
			int pharmacyInvoice = Integer.parseInt(pharmacy_Invoice);
			int pharmacyServId = Integer.parseInt(pharmacy_Serve_Id);
						
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
	@Override
	public List<TreatmentDto> getPrevPatdetailsOPD(Integer patientId,
			Integer deptId) {
		List<TreatmentDto> ltPatientRecord = new ArrayList<TreatmentDto>();
		try {
			  
			Session session = sessionFactory.getCurrentSession();
		
			 Date d=new Date(new java.util.Date().getTime());
			
			/* String hql = "from TreatmentDto  WHERE patientId =:patientId and departmentId =:deptId and tFlag=:tflag";
				Query query = session.createQuery(hql);
				query.setParameter("patientId",patientId);   
				query.setParameter("deptId",deptId); 
				query.setParameter("tflag","N");  */

				String sql="SELECT max(treatment_id) FROM ehat_treatment   where patient_id="+ patientId+" and department_id=1 and t_flag='N'";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				Integer count = ((Number)countQuery.uniqueResult()).intValue();
				TreatmentDto tdo =new TreatmentDto();
				tdo.setTreatmentId(count);
				ltPatientRecord.add(tdo);
		 
				
				
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
	
	public List<RegistrationViewDto2> setSearchedPatientPrevDiagnosticTempByMobile(String letter,String usertype,int deptId, Integer unitId) {

		List<RegistrationViewDto2> ltRegistrationViewDto = new ArrayList<RegistrationViewDto2>();
		
		try {

			
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String LastDaysRecords = (String) resourceBundleEhat.getString("LastDaysRecords");
						
			String sql = " select p.patient_id AS patient_id,p.center_patient_id AS center_patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name, "
					+" p.mobile AS mobile,p.adharcardNo AS adharcardNo,p.created_date_time AS created_date_time, "
					+" p.deleted AS deleted,t.treatment_id AS treatment_id,t.deleted AS tdeleted, "
					+" t.t_flag AS t_flag,t.department_id AS department_id,t.unit_id AS unit_id, "
					+" b.charges_master_slave_id AS charges_master_slave_id,t.opdipdno AS opdipdno,p.mrnno AS mrnno "
					+" from ((ehat_patient p join ehat_treatment t ON ((p.patient_id = t.patient_id))) "
					+" join ehat_bill_master b ON ((b.patient_id = t.patient_id))) where ((p.deleted = 'N') "
					+" and (t.deleted = 'N') and (t.department_id = 3) and (t.t_flag = 'N') and p.unit_id = "+unitId+" ";
			if(usertype.equals("all")){
				
				sql = sql + "and (t.created_date_time >= (curdate() - interval "+LastDaysRecords+" day))) group by t.patient_id order by p.patient_id desc ";				
			}else{
				
				sql = sql + "and (p.mobile = "+Integer.parseInt(letter)+")) group by t.patient_id order by p.patient_id desc ";
			}
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
		    for(Map<String, Object> row : masterRow){
	    		
		    	RegistrationViewDto2 obj = new RegistrationViewDto2();
		    	obj.setPtId((Integer)row.get("patient_id"));
		    	obj.setpIdd(String.valueOf((Integer)row.get("patient_id")));
		    	obj.setPatientName((String)row.get("patient_name"));		    	
		    	obj.setMobile((String)row.get("mobile")); 
		    	obj.setAdharcardNo((String)row.get("adharcardNo"));		    	
		    	obj.setCreatedDateTime((Date)row.get("created_date_time"));	
		    	obj.setTtId((Integer)row.get("treatment_id"));
		    	obj.settFlag((String)row.get("t_flag"));
		    	obj.setDepartment_id((Integer)row.get("department_id"));
		    	obj.setUnitId((Integer)row.get("unit_id"));
		    	obj.setSponsorchargesSlaveId((Integer)row.get("charges_master_slave_id"));
		    	obj.setOpdipdno((String)row.get("opdipdno"));
		    	obj.setMrnno((String)row.get("mrnno"));	
		    	obj.setCenterPatientId((String)row.get("center_patient_id"));
		    	ltRegistrationViewDto.add(obj);		    	
	    	}			

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			//return ltRegistrationViewDto;
		}
		return ltRegistrationViewDto;
	}
	
	//Added By Badrinath For previous opd patient Count
	//16/10/23

	@Override
	public Integer getprevOpdQueuePatientCount() {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = " SELECT " + 
					"    COUNT(*) " + 
					"FROM" + 
					"    ((ehat_patient p" + 
					"    JOIN ehat_treatment t ON ((p.patient_id = t.patient_id)))" + 
					"    JOIN ehat_bill_master b ON ((b.patient_id = t.patient_id)))" + 
					"WHERE" + 
					"    ((p.deleted = 'N') AND (t.deleted = 'N')" + 
					"        AND (t.department_id = 1)" + 
					"        AND (t.t_flag = 'N')" + 
					"        AND p.unit_id = 1" + 
					"        AND (t.created_date_time >= (CURDATE() - INTERVAL 30 DAY)))" + 
					"    --    GROUP BY t.patient_id" + 
					"ORDER BY p.patient_id" + 
					"";
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	public void updateFreeFollowUpCount(int treatmentId) {
		try {
		 String sql=" select ifnull(charges_master_slave_id,0) as charges_master_slave_id  from ehat_bill_master where treatment_id="+treatmentId+" ";
		  SQLQuery sQuery=sessionFactory.getCurrentSession().createSQLQuery(sql);
		  int sponsorId=((Number) sQuery.uniqueResult()).intValue();
		     if(sponsorId > 0) {
		     
		    	 sql=" select ifnull(followup_count,0) as followup_count from ehat_charges_master_slave where id="+sponsorId+" ";
		     sQuery=sessionFactory.getCurrentSession().createSQLQuery(sql);
		     int followUpCount=((Number) sQuery.uniqueResult()).intValue();
		     
		   sql=" select ifnull(patient_id,0) as patient_id  from ehat_bill_master where treatment_id="+treatmentId+" ";
		     sQuery=sessionFactory.getCurrentSession().createSQLQuery(sql);
		     int patientID=((Number) sQuery.uniqueResult()).intValue();
		     
		    //String  sqlUpdate=" update ehat_treatment set free_follow_up_count="+followUpCount+"  where treatment_id="+treatmentId+" and   ";
		    String sqlUpdate=" update   ehat_treatment   set free_follow_up_count="+followUpCount+" where patient_id="+patientID+" and charges_slave_id="+sponsorId+" and department_id='2' and treatment_id="+treatmentId+"  ";
		    SQLQuery updateQuery=sessionFactory.getCurrentSession().createSQLQuery(sqlUpdate);
		    updateQuery.executeUpdate();
		     
		     }
		   }      catch (Exception e) {
				e.printStackTrace();
			}
	}
}