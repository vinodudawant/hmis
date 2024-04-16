package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.TotalCollectionDao;
import com.hms.ehat.dto.IpdCollectionReportDetails;
import com.hms.ehat.dto.ServiceMasterDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.dto.TotalCollectionDetails;

@Repository
@Transactional
public class TotalCollectionDaoImpl implements TotalCollectionDao{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public List<ServiceMasterDto> getAllServices(HttpServletRequest req) {
		// TODO Auto-generated method stub
		
		List<ServiceMasterDto> servicelist = new ArrayList<>();
		
		HttpSession session=req.getSession();
		int userId=(int)session.getAttribute("userId1");
		Query query = sessionFactory.getCurrentSession().createSQLQuery("select service_id,service_name from ehat_service_master where created_by=1 and deleted ='N'");
	
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

		List<Map<String, Object>> list  = query.list();
		for (Map<String, Object> row : list) {
			ServiceMasterDto obj = new ServiceMasterDto();
			obj.setServiceId((Integer)row.get("service_id"));
			obj.setServiceName((String)row.get("service_name"));
			servicelist.add(obj);
		}
		
		return servicelist;
	}

	@Override
	public List<SubServiceDto> getMultipleSubservices(Integer serviceId) {
		
		
		List<SubServiceDto> subservicelist = new ArrayList<>();
	    String hql = "SELECT  subId,categoryName FROM SubServiceDto where deleted=:deleted and serviceId in("+serviceId+")";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("deleted", "N");
		List<Object[]> list = query.list();
		for(Object[]rows:list){
			SubServiceDto obj = new SubServiceDto();
			obj.setSubId((Integer)rows[0]);
			obj.setCategoryName((String)rows[1]);
			subservicelist.add(obj);
		}
		return subservicelist;
	}

	/*
	 * @Override public List<TotalCollectionDetails> getServiceWiseReport(String
	 * fromdatetime, String todatetime, String department, String sponsorId, String
	 * serviceId, String subServiceId, Integer patientType) {
	 * 
	 * List<TotalCollectionDetails> servicewiselist = new ArrayList<>();
	 * 
	 * String sql =
	 * "SELECT `ehat_bill_details`.`created_date_time` `bill_date`,`ehat_bill_details`.`patient_id`,et.opdipdno as opd_ipd_no,"
	 * +
	 * "`fn_get_patient_name`(`ehat_bill_details`.`patient_id`) patient_name,service_id,`fn_get_service_name`(`ehat_bill_details`.`service_id`) service_name,"
	 * +
	 * " sub_service_id,CASE WHEN(ehat_bill_details.service_id = 1) THEN (SELECT CONVERT( category_name USING UTF8) FROM ehat_subservice WHERE id = `ehat_bill_details`.`sub_service_id`)\r\n"
	 * +
	 * " WHEN (ehat_bill_details.service_id = 3) THEN FN_GET_HALL_NAME(FN_GET_HALL_ID_SUBSERVICE_WISE(`ehat_bill_details`.`sub_service_id`))\r\n"
	 * +
	 * " ELSE FN_GET_SUBSERVICE_NAME(`ehat_bill_details`.`sub_service_id`) END AS sub_service_name,`fn_get_doctor_name`(`ehat_bill_details`.`doctor_id`) doctor_name,"
	 * +
	 * " case when ehat_bill_details.charges_slave_id = 0 then IFNULL(`ehat_bill_details`.`rate`, 0) else IFNULL(`ehat_bill_details`.`other_rate`, 0)  end AS rate,`ehat_bill_details`.`quantity`,case when ehat_bill_details.charges_slave_id = 0 then IFNULL(`ehat_bill_details`.`amount`, 0) else IFNULL(`ehat_bill_details`.`other_amount`, 0)  end AS amount,case when ehat_bill_details.charges_slave_id = 0 then IFNULL(`ehat_bill_details`.`concession`, 0) else IFNULL(`ehat_bill_details`.`other_concession`, 0)  end AS concession,`ehat_bill_details`.`pay`,"
	 * +
	 * " `ehat_bill_details`.`department_id`, `fn_get_dept_name`(`ehat_bill_details`.`department_id`) department, `ehat_bill_details`.`sponsor_id`,`fn_get_sponsor`(`ehat_bill_details`.`charges_slave_id`) sponsor "
	 * +
	 * " ,(select gender from `ehat_patient` where `patient_id` = ehat_bill_details.patient_id) gender "
	 * +
	 * " ,(select  concat(age_days,'D','/',age_months,'M','/',age,'Y') as age from `ehat_patient` where `patient_id` = ehat_bill_details.patient_id) age "
	 * +
	 * " ,(SELECT  MAX(bill_receipt_master_id) FROM ehat_receipt_slave WHERE bill_details_id = ehat_bill_details.bill_details_id) bill_receipt_master_id, (SELECT FN_GET_RECEIPT_COUNT(bill_receipt_master_id)) ReceiptNo "
	 * +
	 * " ,(SELECT IFNULL(sum(total_refund), 0) FROM ehat_bill_master ebm WHERE ebm.bill_id = ehat_bill_details.bill_id and deleted = 'N') as refund_amount "
	 * +
	 * " ,(SELECT IFNULL(discount, 0) FROM ehat_bill_master ebm WHERE ebm.bill_id = ehat_bill_details.bill_id AND deleted = 'N') AS discount,`ehat_bill_details`.`narrationid_bill`,\r\n"
	 * + "    	(SELECT \r\n" + "		f_name\r\n" + "        FROM\r\n" +
	 * "            users userss\r\n" + "        WHERE\r\n" +
	 * "            userss.User_ID = ehat_bill_details.updated_by) AS updated_by" +
	 * " FROM ehat_bill_details, ehat_treatment et where (`ehat_bill_details`.`deleted`)='N' and ehat_bill_details.treatment_id = et.treatment_id and (`ehat_bill_details`.`cancle`)='N' and (`ehat_bill_details`.`created_date_time`) >= '"
	 * +fromdatetime+"' and (`ehat_bill_details`.`created_date_time`) <= '"
	 * +todatetime+"'";
	 * 
	 * System.out.println("SQL::::"+sql);
	 * 
	 * if(department.length()>0){ sql=sql +
	 * " and `ehat_bill_details`.`department_id` in(" +department+ ") ";
	 * 
	 * } if(!serviceId.equals("0")){ sql= sql+
	 * " and service_id in ("+serviceId+") "; }
	 * 
	 * if(!subServiceId.equals("0")){ sql = sql+
	 * " and sub_service_id in ("+subServiceId+") "; }
	 * 
	 * 
	 * if(patientType == 1){ sql = sql +
	 * " AND (`ehat_bill_details`.`charges_slave_id` in(0))";
	 * 
	 * } else if(patientType == 2){
	 * 
	 * if(sponsorId.equals("0")){ sql = sql +
	 * " AND (`ehat_bill_details`.`charges_slave_id`) > 0";
	 * 
	 * } else{ sql = sql +
	 * " AND `ehat_bill_details`.`charges_slave_id` in("+sponsorId+")";
	 * 
	 * }
	 * 
	 * } System.out.println("sponserid''''''''''''''''"+sponsorId);
	 * 
	 * sql = sql + " union all"+
	 * " SELECT `ehat_bill_details_ipd`.`created_date_time` `bill_date`,`ehat_bill_details_ipd`.`patient_id`,et.opdipdno as opd_ipd_no,"
	 * +
	 * " `fn_get_patient_name`(`ehat_bill_details_ipd`.`patient_id`) patient_name,service_id,`fn_get_service_name`(`ehat_bill_details_ipd`.`service_id`) service_name,"
	 * +
	 * " sub_service_id,CASE WHEN (ehat_bill_details_ipd.service_id = 1) THEN (SELECT CONVERT(category_name USING utf8) FROM ehat_subservice WHERE id = `ehat_bill_details_ipd`.`sub_service_id`)\r\n"
	 * +
	 * " WHEN (ehat_bill_details_ipd.service_id = 3)THEN FN_GET_HALL_NAME(FN_GET_HALL_ID_SUBSERVICE_WISE(`ehat_bill_details_ipd`.`sub_service_id`))\r\n"
	 * +
	 * " ELSE FN_GET_SUBSERVICE_NAME(`ehat_bill_details_ipd`.`sub_service_id`) END AS sub_service_name, `fn_get_doctor_name`(`ehat_bill_details_ipd`.`doctor_id`) doctor_name,"
	 * +
	 * " case when ehat_bill_details_ipd.charges_slave_id = 0 then IFNULL(`ehat_bill_details_ipd`.`rate`, 0) else IFNULL(`ehat_bill_details_ipd`.`other_rate`, 0)  end AS rate,`ehat_bill_details_ipd`.`quantity`,case when ehat_bill_details_ipd.charges_slave_id = 0 then IFNULL(`ehat_bill_details_ipd`.`amount`, 0) else IFNULL(`ehat_bill_details_ipd`.`other_amount`, 0)  end AS amount,case when ehat_bill_details_ipd.charges_slave_id = 0 then IFNULL(`ehat_bill_details_ipd`.`concession`, 0) else IFNULL(`ehat_bill_details_ipd`.`other_concession`, 0)  end AS concession,"
	 * +
	 * " `ehat_bill_details_ipd`.`pay`,   `ehat_bill_details_ipd`.`department_id`, `fn_get_dept_name`(`ehat_bill_details_ipd`.`department_id`) department,"
	 * +
	 * " `ehat_bill_details_ipd`.`sponsor_id`,`fn_get_sponsor`(`ehat_bill_details_ipd`.`charges_slave_id`) sponsor "
	 * +
	 * " ,(select gender from `ehat_patient` where `patient_id` = ehat_bill_details_ipd.patient_id) gender "
	 * +
	 * " ,(select  concat(age_days,'D','/',age_months,'M','/',age,'Y') as age from `ehat_patient` where `patient_id` = ehat_bill_details_ipd.patient_id) age "
	 * +
	 * " ,(SELECT  MAX(bill_receipt_master_id) FROM ehat_receipt_slave WHERE bill_details_id = ehat_bill_details_ipd.bill_details_id) bill_receipt_master_id, (SELECT FN_GET_RECEIPT_COUNT(bill_receipt_master_id)) ReceiptNo "
	 * +
	 * " ,(SELECT IFNULL(sum(total_refund), 0) FROM ehat_bill_master ebm WHERE ebm.bill_id = ehat_bill_details_ipd.bill_id and deleted = 'N') as refund_amount "
	 * +
	 * " ,(SELECT IFNULL(discount, 0) FROM ehat_bill_master ebm WHERE ebm.bill_id = ehat_bill_details_ipd.bill_id AND deleted = 'N') AS discount,`ehat_bill_details_ipd`.`narrationid_bill`,"
	 * + "    	(SELECT \r\n" + "		f_name\r\n" + "        FROM\r\n" +
	 * "            users userss\r\n" + "        WHERE\r\n" +
	 * "            userss.User_ID = ehat_bill_details_ipd.updated_by) AS updated_by "
	 * + " FROM `ehat_bill_details_ipd`,ehat_treatment et "+
	 * " where (`ehat_bill_details_ipd`.`cancle`)='N' and ehat_bill_details_ipd.treatment_id=et.treatment_id and (`ehat_bill_details_ipd`.`deleted`)='N' and (`ehat_bill_details_ipd`.`created_date_time`) >= '"
	 * +fromdatetime+"' and (`ehat_bill_details_ipd`.`created_date_time`) <= '"
	 * +todatetime+"'";
	 * 
	 * 
	 * if(department.length()>0){ sql = sql +
	 * " and `ehat_bill_details_ipd`.`department_id` in( "+ department +" )"; }
	 * if(!serviceId.equals("0")){ sql = sql + " and service_id in ("+ serviceId
	 * +") " ; } if(!subServiceId.equals("0")){ sql = sql +
	 * " and sub_service_id in ("+ subServiceId +") "; }
	 * 
	 * if(patientType == 1){ sql = sql +
	 * " AND (`ehat_bill_details_ipd`.`charges_slave_id` in(0))"; } else
	 * if(patientType == 2){
	 * 
	 * if(sponsorId.equals("0")){ sql = sql +
	 * " AND (`ehat_bill_details_ipd`.`charges_slave_id`) > 0 ";
	 * 
	 * } else{ sql = sql +
	 * " AND (`ehat_bill_details_ipd`.`charges_slave_id` in("+sponsorId+")) "; } }
	 * 
	 * 
	 * SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
	 * query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	 * 
	 * System.out.println("sql"+sql);
	 * 
	 * List<Map<String, Object>> list = query.list();
	 * 
	 * for (Map<String, Object> row : list) { TotalCollectionDetails obj = new
	 * TotalCollectionDetails(); obj.setBillDate((Date)row.get("bill_date"));
	 * obj.setPatientId((Integer)row.get("patient_id"));
	 * obj.setOpdIpdno((String)row.get("opd_ipd_no"));
	 * obj.setPatientName((String)row.get("patient_name"));
	 * obj.setServiceId((Integer)row.get("service_id"));
	 * obj.setServiceName((String)row.get("service_name"));
	 * obj.setSubServiceId((Integer)row.get("sub_service_id"));
	 * obj.setSubServiceName((String)row.get("sub_service_name"));
	 * obj.setDoctorName((String)row.get("doctor_name"));
	 * obj.setRate((Double)row.get("rate"));
	 * obj.setQuantity((Double)row.get("quantity"));
	 * obj.setAmount((Double)row.get("amount"));
	 * obj.setConcession((Double)row.get("concession"));
	 * obj.setPay((Double)row.get("pay"));
	 * obj.setDepartmentName((String)row.get("department"));
	 * obj.setSponsorName((String)row.get("sponsor"));
	 * obj.setAge((String)row.get("age")); obj.setGender((String)row.get("gender"));
	 * obj.setServiceDate((Date)row.get("bill_date"));
	 * obj.setReceiptNo((String)row.get("ReceiptNo"));
	 * obj.setRefundAmount((Double)row.get("refund_amount"));
	 * obj.setDiscount((Double)row.get("discount"));
	 * obj.setNarrationid_bill((String)row.get("narrationid_bill"));
	 * obj.setUpdated_by((String)row.get("updated_by"));
	 * 
	 * 
	 * servicewiselist.add(obj); }
	 * 
	 * return servicewiselist; }
	 */
	
	
	@Override
	public List<TotalCollectionDetails> getServiceWiseReport(String fromdatetime, String todatetime, String department,
			String sponsorId, String serviceId,int doctorid,String subServiceId, Integer patientType) {
		
		List<TotalCollectionDetails> servicewiselist = new ArrayList<>();
		
		String sql;
		if(doctorid>0)
		{
   sql =
					"SELECT `ehat_bill_details`.`created_date_time` `bill_date`,`ehat_bill_details`.`patient_id`,et.opdipdno as opd_ipd_no,"+	                 
				    "`fn_get_patient_name`(`ehat_bill_details`.`patient_id`) patient_name,ehat_bill_details.service_id,`fn_get_service_name`(`ehat_bill_details`.`service_id`) service_name,"+
		            " sub_service_id,CASE WHEN(ehat_bill_details.service_id = 1) THEN (SELECT CONVERT( category_name USING UTF8) FROM ehat_subservice WHERE id = `ehat_bill_details`.`sub_service_id`)\r\n" + 
		            " WHEN (ehat_bill_details.service_id = 3) THEN FN_GET_HALL_NAME(FN_GET_HALL_ID_SUBSERVICE_WISE(`ehat_bill_details`.`sub_service_id`))\r\n" + 
		            " ELSE FN_GET_SUBSERVICE_NAME(`ehat_bill_details`.`sub_service_id`) END AS sub_service_name,`fn_get_doctor_name`(`ehat_bill_details`.`doctor_id`) doctor_name,"+
		            " case when ehat_bill_details.charges_slave_id = 0 then IFNULL(`ehat_bill_details`.`rate`, 0) else IFNULL(`ehat_bill_details`.`other_rate`, 0)  end AS rate,`ehat_bill_details`.`quantity`,case when ehat_bill_details.charges_slave_id = 0 then IFNULL(`ehat_bill_details`.`amount`, 0) else IFNULL(`ehat_bill_details`.`other_amount`, 0)  end AS amount,case when ehat_bill_details.charges_slave_id = 0 then IFNULL(`ehat_bill_details`.`concession`, 0) else IFNULL(`ehat_bill_details`.`other_concession`, 0)  end AS concession,`ehat_bill_details`.`pay`,"+
		            " `ehat_bill_details`.`department_id`, `fn_get_dept_name`(`ehat_bill_details`.`department_id`) department, `ehat_bill_details`.`sponsor_id`,`fn_get_sponsor`(`ehat_bill_details`.`charges_slave_id`) sponsor "+
		            " ,(select gender from `ehat_patient` where `patient_id` = ehat_bill_details.patient_id) gender "+
		            " ,(select  concat(age_days,'D','/',age_months,'M','/',age,'Y') as age from `ehat_patient` where `patient_id` = ehat_bill_details.patient_id) age "+  
                    " ,(SELECT  MAX(bill_receipt_master_id) FROM ehat_receipt_slave WHERE bill_details_id = ehat_bill_details.bill_details_id) bill_receipt_master_id, (SELECT FN_GET_RECEIPT_COUNT(bill_receipt_master_id)) ReceiptNo " +
		            " ,(SELECT IFNULL(sum(total_refund), 0) FROM ehat_bill_master ebm WHERE ebm.bill_id = ehat_bill_details.bill_id and deleted = 'N') as refund_amount " +
                    " ,(SELECT IFNULL(discount, 0) FROM ehat_bill_master ebm WHERE ebm.bill_id = ehat_bill_details.bill_id AND deleted = 'N') AS discount,`ehat_bill_details`.`narrationid_bill`,\r\n" + 
                    "    	(SELECT \r\n" + 
                    "		f_name\r\n" + 
                    "        FROM\r\n" + 
                    "            users userss\r\n" + 
                    "        WHERE\r\n" + 
                    "            userss.User_ID = ehat_bill_details.updated_by) AS updated_by" +
		            " FROM ehat_bill_details join\r\n" + 
		            "    ehat_treatment et on ehat_bill_details.treatment_id=et.treatment_id\r\n" + 
		            "    join  ehat_subservice e on ehat_bill_details.sub_service_id=e.id where (`ehat_bill_details`.`deleted`)='N' 	AND (`ehat_bill_details`.`doctor_id`) = '"+doctorid+"'" + 
		            " and ehat_bill_details.treatment_id = et.treatment_id and (`ehat_bill_details`.`cancle`)='N' and (`ehat_bill_details`.`created_date_time`) >= '"+fromdatetime+"' and (`ehat_bill_details`.`created_date_time`) <= '"+todatetime+"'";
		
		System.out.println("SQL::::"+sql);
		
		if(department.length()>0){
		  		     sql=sql + " and `ehat_bill_details`.`department_id` in(" +department+ ") ";
  
		           }
		           if(!serviceId.equals("0")){
		        	   sql= sql+ " and ehat_bill_details.service_id in ("+serviceId+") ";
		           }
		          
		           if(!subServiceId.equals("0")){
		        	   sql = sql+  " and e.selfid  in ("+subServiceId+") ";
		        	 //  sql = sql+  " and ehat_bill_details.sub_service_id  in ("+subServiceId+") ";  //added By Rahul
		           }
		           

		           if(patientType == 1){
		 	          sql = sql + " AND (`ehat_bill_details`.`charges_slave_id` in(0))";

		 		}
		 		else if(patientType == 2){
		 			
		 			if(sponsorId.equals("0")){
				    sql = sql + " AND (`ehat_bill_details`.`charges_slave_id`) > 0";

		 			}
		 			else{
				      sql = sql + " AND `ehat_bill_details`.`charges_slave_id` in("+sponsorId+")";

		 			}
		 			
		 		}
		           System.out.println("sponserid''''''''''''''''"+sponsorId);
		           
		         sql = sql +
		        		 " union all"+
		        		 " SELECT `ehat_bill_details_ipd`.`created_date_time` `bill_date`,`ehat_bill_details_ipd`.`patient_id`,et.opdipdno as opd_ipd_no,"+		            
		        		 " `fn_get_patient_name`(`ehat_bill_details_ipd`.`patient_id`) patient_name,ehat_bill_details_ipd.service_id,`fn_get_service_name`(`ehat_bill_details_ipd`.`service_id`) service_name,"+
		        		 " sub_service_id,CASE WHEN (ehat_bill_details_ipd.service_id = 1) THEN (SELECT CONVERT(category_name USING utf8) FROM ehat_subservice WHERE id = `ehat_bill_details_ipd`.`sub_service_id`)\r\n" + 
		        		 " WHEN (ehat_bill_details_ipd.service_id = 3)THEN FN_GET_HALL_NAME(FN_GET_HALL_ID_SUBSERVICE_WISE(`ehat_bill_details_ipd`.`sub_service_id`))\r\n" + 
		        		 " ELSE FN_GET_SUBSERVICE_NAME(`ehat_bill_details_ipd`.`sub_service_id`) END AS sub_service_name, `fn_get_doctor_name`(`ehat_bill_details_ipd`.`doctor_id`) doctor_name,"+
		        		 " case when ehat_bill_details_ipd.charges_slave_id = 0 then IFNULL(`ehat_bill_details_ipd`.`rate`, 0) else IFNULL(`ehat_bill_details_ipd`.`other_rate`, 0)  end AS rate,`ehat_bill_details_ipd`.`quantity`,case when ehat_bill_details_ipd.charges_slave_id = 0 then IFNULL(`ehat_bill_details_ipd`.`amount`, 0) else IFNULL(`ehat_bill_details_ipd`.`other_amount`, 0)  end AS amount,case when ehat_bill_details_ipd.charges_slave_id = 0 then IFNULL(`ehat_bill_details_ipd`.`concession`, 0) else IFNULL(`ehat_bill_details_ipd`.`other_concession`, 0)  end AS concession,"+
		        		 " `ehat_bill_details_ipd`.`pay`,   `ehat_bill_details_ipd`.`department_id`, `fn_get_dept_name`(`ehat_bill_details_ipd`.`department_id`) department,"+      
		        		 " `ehat_bill_details_ipd`.`sponsor_id`,`fn_get_sponsor`(`ehat_bill_details_ipd`.`charges_slave_id`) sponsor " +		            
		        		 " ,(select gender from `ehat_patient` where `patient_id` = ehat_bill_details_ipd.patient_id) gender "+
		        		 " ,(select  concat(age_days,'D','/',age_months,'M','/',age,'Y') as age from `ehat_patient` where `patient_id` = ehat_bill_details_ipd.patient_id) age "+
		        		 " ,(SELECT  MAX(bill_receipt_master_id) FROM ehat_receipt_slave WHERE bill_details_id = ehat_bill_details_ipd.bill_details_id) bill_receipt_master_id, (SELECT FN_GET_RECEIPT_COUNT(bill_receipt_master_id)) ReceiptNo " +
		        		 " ,(SELECT IFNULL(sum(total_refund), 0) FROM ehat_bill_master ebm WHERE ebm.bill_id = ehat_bill_details_ipd.bill_id and deleted = 'N') as refund_amount " +
		        		 " ,(SELECT IFNULL(discount, 0) FROM ehat_bill_master ebm WHERE ebm.bill_id = ehat_bill_details_ipd.bill_id AND deleted = 'N') AS discount,`ehat_bill_details_ipd`.`narrationid_bill`," + 
		        		 "    	(SELECT \r\n" + 
		        		 "		f_name\r\n" + 
		        		 "        FROM\r\n" + 
		        		 "            users userss\r\n" + 
		        		 "        WHERE\r\n" + 
		        		 "            userss.User_ID = ehat_bill_details_ipd.updated_by) AS updated_by " +
		        		 " FROM    ehat_bill_details_ipd join\r\n" + 
		        		 "    ehat_treatment et on ehat_bill_details_ipd.treatment_id=et.treatment_id\r\n" + 
		        		 "   join  ehat_subservice e on ehat_bill_details_ipd.sub_service_id=e.id "+
		        		 " where (`ehat_bill_details_ipd`.`cancle`)='N' AND (`ehat_bill_details_ipd`.`doctor_id`) = '"+doctorid+"' and ehat_bill_details_ipd.treatment_id=et.treatment_id and (`ehat_bill_details_ipd`.`deleted`)='N' and (`ehat_bill_details_ipd`.`created_date_time`) >= '"+fromdatetime+"' and (`ehat_bill_details_ipd`.`created_date_time`) <= '"+todatetime+"'";
		           

		         if(department.length()>0){
		        	 sql = sql + " and `ehat_bill_details_ipd`.`department_id` in( "+ department +" )";
		         }
		         if(!serviceId.equals("0")){
		        	sql = sql + " and ehat_bill_details_ipd.service_id in ("+ serviceId +") " ;
		         }
		         if(!subServiceId.equals("0")){
		        	sql = sql +  " and  e.selfid  in ("+ subServiceId +") "; 
		        	// sql = sql+  " and ehat_bill_details_ipd.sub_service_id  in ("+subServiceId+") "; //added By Rahul
		         }
		          
		         if(patientType == 1){
		 	          sql = sql + " AND (`ehat_bill_details_ipd`.`charges_slave_id` in(0))";
		 		}
		 		else if(patientType == 2){
		 			
		 			if(sponsorId.equals("0")){
				    sql = sql + " AND (`ehat_bill_details_ipd`.`charges_slave_id`) > 0 ";

		 			}
		 			else{
					    sql = sql + " AND (`ehat_bill_details_ipd`.`charges_slave_id` in("+sponsorId+")) ";
		 			}
		 		}

		}   
		else {
			 sql =
					"SELECT `ehat_bill_details`.`created_date_time` `bill_date`,`ehat_bill_details`.`patient_id`,et.opdipdno as opd_ipd_no,"+	                 
				    "`fn_get_patient_name`(`ehat_bill_details`.`patient_id`) patient_name,ehat_bill_details.service_id,`fn_get_service_name`(`ehat_bill_details`.`service_id`) service_name,"+
		            " sub_service_id,CASE WHEN(ehat_bill_details.service_id = 1) THEN (SELECT CONVERT( category_name USING UTF8) FROM ehat_subservice WHERE id = `ehat_bill_details`.`sub_service_id`)\r\n" + 
		            " WHEN (ehat_bill_details.service_id = 3) THEN FN_GET_HALL_NAME(FN_GET_HALL_ID_SUBSERVICE_WISE(`ehat_bill_details`.`sub_service_id`))\r\n" + 
		            " ELSE FN_GET_SUBSERVICE_NAME(`ehat_bill_details`.`sub_service_id`) END AS sub_service_name,`fn_get_doctor_name`(`ehat_bill_details`.`doctor_id`) doctor_name,"+
		            " case when ehat_bill_details.charges_slave_id = 0 then IFNULL(`ehat_bill_details`.`rate`, 0) else IFNULL(`ehat_bill_details`.`other_rate`, 0)  end AS rate,`ehat_bill_details`.`quantity`,case when ehat_bill_details.charges_slave_id = 0 then IFNULL(`ehat_bill_details`.`amount`, 0) else IFNULL(`ehat_bill_details`.`other_amount`, 0)  end AS amount,case when ehat_bill_details.charges_slave_id = 0 then IFNULL(`ehat_bill_details`.`concession`, 0) else IFNULL(`ehat_bill_details`.`other_concession`, 0)  end AS concession,`ehat_bill_details`.`pay`,"+
		            " `ehat_bill_details`.`department_id`, `fn_get_dept_name`(`ehat_bill_details`.`department_id`) department, `ehat_bill_details`.`sponsor_id`,`fn_get_sponsor`(`ehat_bill_details`.`charges_slave_id`) sponsor "+
		            " ,(select gender from `ehat_patient` where `patient_id` = ehat_bill_details.patient_id) gender "+
		            " ,(select  concat(age_days,'D','/',age_months,'M','/',age,'Y') as age from `ehat_patient` where `patient_id` = ehat_bill_details.patient_id) age "+  
                    " ,(SELECT  MAX(bill_receipt_master_id) FROM ehat_receipt_slave WHERE bill_details_id = ehat_bill_details.bill_details_id) bill_receipt_master_id, (SELECT FN_GET_RECEIPT_COUNT(bill_receipt_master_id)) ReceiptNo " +
		            " ,(SELECT IFNULL(sum(total_refund), 0) FROM ehat_bill_master ebm WHERE ebm.bill_id = ehat_bill_details.bill_id and deleted = 'N') as refund_amount " +
                    " ,(SELECT IFNULL(discount, 0) FROM ehat_bill_master ebm WHERE ebm.bill_id = ehat_bill_details.bill_id AND deleted = 'N') AS discount,`ehat_bill_details`.`narrationid_bill`,\r\n" + 
                    "    	(SELECT \r\n" + 
                    "		f_name\r\n" + 
                    "        FROM\r\n" + 
                    "            users userss\r\n" + 
                    "        WHERE\r\n" + 
                    "            userss.User_ID = ehat_bill_details.updated_by) AS updated_by" +
		            " FROM ehat_bill_details join\r\n" + 
		            "    ehat_treatment et on ehat_bill_details.treatment_id=et.treatment_id\r\n" + 
		            "    join  ehat_subservice e on ehat_bill_details.sub_service_id=e.id where (`ehat_bill_details`.`deleted`)='N' and ehat_bill_details.treatment_id = et.treatment_id and (`ehat_bill_details`.`cancle`)='N' and (`ehat_bill_details`.`created_date_time`) >= '"+fromdatetime+"' and (`ehat_bill_details`.`created_date_time`) <= '"+todatetime+"'";
		
		System.out.println("SQL::::"+sql);
		
		if(department.length()>0){
		  		     sql=sql + " and `ehat_bill_details`.`department_id` in(" +department+ ") ";
  
		           }
		           if(!serviceId.equals("0")){
		        	   sql= sql+ " and ehat_bill_details.service_id in ("+serviceId+") ";
		           }
		          
		           if(!subServiceId.equals("0")){
		        	   //sql = sql+  " and e.selfid  in ("+subServiceId+") ";
		        	//   sql = sql+  " and ehat_bill_details.sub_service_id  in ("+subServiceId+") ";  //added by rahul
			   			
		        	    String isCategorySql = "select group_concat(distinct isCategory) from ehat_subservice where id in ("+subServiceId+")";
						SQLQuery isCategorySqlres = sessionFactory.getCurrentSession().createSQLQuery(isCategorySql);
						String isCategoryFlag = (String) isCategorySqlres.uniqueResult();
		        	   
		        	   if(isCategoryFlag.equalsIgnoreCase("Y,N") || isCategoryFlag.equalsIgnoreCase("N,Y"))
		        		   sql = sql+  " 	and e.selfid  in ("+subServiceId+") or ehat_bill_details.sub_service_id  in ("+subServiceId+")";
		        	   else if(isCategoryFlag.equalsIgnoreCase("Y"))
		        	      sql = sql+   " 	and e.selfid  in ("+subServiceId+") "; 
		        	   else if(isCategoryFlag.equalsIgnoreCase("N"))
		        		   sql = sql+  " 	and ehat_bill_details.sub_service_id  in ("+subServiceId+")";
		           }
		           

		           if(patientType == 1){
		 	          sql = sql + " AND (`ehat_bill_details`.`charges_slave_id` in(0))";

		 		}
		 		else if(patientType == 2){
		 			
		 			if(sponsorId.equals("0")){
				    sql = sql + " AND (`ehat_bill_details`.`charges_slave_id`) > 0";

		 			}
		 			else{
				      sql = sql + " AND `ehat_bill_details`.`charges_slave_id` in("+sponsorId+")";

		 			}
		 			
		 		}
		           System.out.println("sponserid''''''''''''''''"+sponsorId);
		           
		         sql = sql +
		        		 " union all"+
		        		 " SELECT `ehat_bill_details_ipd`.`created_date_time` `bill_date`,`ehat_bill_details_ipd`.`patient_id`,et.opdipdno as opd_ipd_no,"+		            
		        		 " `fn_get_patient_name`(`ehat_bill_details_ipd`.`patient_id`) patient_name,ehat_bill_details_ipd.service_id,`fn_get_service_name`(`ehat_bill_details_ipd`.`service_id`) service_name,"+
		        		 " sub_service_id,CASE WHEN (ehat_bill_details_ipd.service_id = 1) THEN (SELECT CONVERT(category_name USING utf8) FROM ehat_subservice WHERE id = `ehat_bill_details_ipd`.`sub_service_id`)\r\n" + 
		        		 " WHEN (ehat_bill_details_ipd.service_id = 3)THEN FN_GET_HALL_NAME(FN_GET_HALL_ID_SUBSERVICE_WISE(`ehat_bill_details_ipd`.`sub_service_id`))\r\n" + 
		        		 " ELSE FN_GET_SUBSERVICE_NAME(`ehat_bill_details_ipd`.`sub_service_id`) END AS sub_service_name, `fn_get_doctor_name`(`ehat_bill_details_ipd`.`doctor_id`) doctor_name,"+
		        		 " case when ehat_bill_details_ipd.charges_slave_id = 0 then IFNULL(`ehat_bill_details_ipd`.`rate`, 0) else IFNULL(`ehat_bill_details_ipd`.`other_rate`, 0)  end AS rate,`ehat_bill_details_ipd`.`quantity`,case when ehat_bill_details_ipd.charges_slave_id = 0 then IFNULL(`ehat_bill_details_ipd`.`amount`, 0) else IFNULL(`ehat_bill_details_ipd`.`other_amount`, 0)  end AS amount,case when ehat_bill_details_ipd.charges_slave_id = 0 then IFNULL(`ehat_bill_details_ipd`.`concession`, 0) else IFNULL(`ehat_bill_details_ipd`.`other_concession`, 0)  end AS concession,"+
		        		 " `ehat_bill_details_ipd`.`pay`,   `ehat_bill_details_ipd`.`department_id`, `fn_get_dept_name`(`ehat_bill_details_ipd`.`department_id`) department,"+      
		        		 " `ehat_bill_details_ipd`.`sponsor_id`,`fn_get_sponsor`(`ehat_bill_details_ipd`.`charges_slave_id`) sponsor " +		            
		        		 " ,(select gender from `ehat_patient` where `patient_id` = ehat_bill_details_ipd.patient_id) gender "+
		        		 " ,(select  concat(age_days,'D','/',age_months,'M','/',age,'Y') as age from `ehat_patient` where `patient_id` = ehat_bill_details_ipd.patient_id) age "+
		        		 " ,(SELECT  MAX(bill_receipt_master_id) FROM ehat_receipt_slave WHERE bill_details_id = ehat_bill_details_ipd.bill_details_id) bill_receipt_master_id, (SELECT FN_GET_RECEIPT_COUNT(bill_receipt_master_id)) ReceiptNo " +
		        		 " ,(SELECT IFNULL(sum(total_refund), 0) FROM ehat_bill_master ebm WHERE ebm.bill_id = ehat_bill_details_ipd.bill_id and deleted = 'N') as refund_amount " +
		        		 " ,(SELECT IFNULL(discount, 0) FROM ehat_bill_master ebm WHERE ebm.bill_id = ehat_bill_details_ipd.bill_id AND deleted = 'N') AS discount,`ehat_bill_details_ipd`.`narrationid_bill`," + 
		        		 "    	(SELECT \r\n" + 
		        		 "		f_name\r\n" + 
		        		 "        FROM\r\n" + 
		        		 "            users userss\r\n" + 
		        		 "        WHERE\r\n" + 
		        		 "            userss.User_ID = ehat_bill_details_ipd.updated_by) AS updated_by " +
		        		 " FROM    ehat_bill_details_ipd join\r\n" + 
		        		 "    ehat_treatment et on ehat_bill_details_ipd.treatment_id=et.treatment_id\r\n" + 
		        		 "   left join  ehat_subservice e on ehat_bill_details_ipd.sub_service_id=e.id "+
		        		 " where (`ehat_bill_details_ipd`.`cancle`)='N' and ehat_bill_details_ipd.treatment_id=et.treatment_id and (`ehat_bill_details_ipd`.`deleted`)='N' and (`ehat_bill_details_ipd`.`created_date_time`) >= '"+fromdatetime+"' and (`ehat_bill_details_ipd`.`created_date_time`) <= '"+todatetime+"'";
		           

		         if(department.length()>0){
		        	 sql = sql + " and `ehat_bill_details_ipd`.`department_id` in( "+ department +" )";
		         }
		         if(!serviceId.equals("0")){
		        	sql = sql + " and ehat_bill_details_ipd.service_id in ("+ serviceId +") " ;
		         }
		         if(!subServiceId.equals("0")){
		        	//sql = sql +  " and  e.selfid  in ("+ subServiceId +") "; 
		        	// sql = sql+  " and ehat_bill_details_ipd.sub_service_id  in ("+subServiceId+") ";  //added by rahul
		   			
	        	    String isCategorySql = "select group_concat(distinct isCategory) from ehat_subservice where id in ("+subServiceId+")";
					SQLQuery isCategorySqlres = sessionFactory.getCurrentSession().createSQLQuery(isCategorySql);
					String isCategoryFlag = (String) isCategorySqlres.uniqueResult();
	        	   
	        	   if(isCategoryFlag.equalsIgnoreCase("Y,N") || isCategoryFlag.equalsIgnoreCase("N,Y"))
	        		   sql = sql+  " 	and e.selfid  in ("+subServiceId+") or ehat_bill_details_ipd.sub_service_id  in ("+subServiceId+")";
	        	   else if(isCategoryFlag.equalsIgnoreCase("Y"))
	        	      sql = sql+   " 	and e.selfid  in ("+subServiceId+") "; 
	        	   else if(isCategoryFlag.equalsIgnoreCase("N"))
	        		   sql = sql+  " 	and ehat_bill_details_ipd.sub_service_id  in ("+subServiceId+")";
		         }
		          
		         if(patientType == 1){
		 	          sql = sql + " AND (`ehat_bill_details_ipd`.`charges_slave_id` in(0))";
		 		}
		 		else if(patientType == 2){
		 			
		 			if(sponsorId.equals("0")){
				    sql = sql + " AND (`ehat_bill_details_ipd`.`charges_slave_id`) > 0 ";

		 			}
		 			else{
					    sql = sql + " AND (`ehat_bill_details_ipd`.`charges_slave_id` in("+sponsorId+")) ";
		 			}
		 		}

		}
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		
		System.out.println("sql"+sql);
		
		List<Map<String, Object>> list = query.list();
		
		for (Map<String, Object> row : list) {
			TotalCollectionDetails obj = new TotalCollectionDetails();
			obj.setBillDate((Date)row.get("bill_date"));
			obj.setPatientId((Integer)row.get("patient_id"));
			obj.setOpdIpdno((String)row.get("opd_ipd_no"));
			obj.setPatientName((String)row.get("patient_name"));
			obj.setServiceId((Integer)row.get("service_id"));
			obj.setServiceName((String)row.get("service_name"));
			obj.setSubServiceId((Integer)row.get("sub_service_id"));
			obj.setSubServiceName((String)row.get("sub_service_name"));
			obj.setDoctorName((String)row.get("doctor_name"));
			obj.setRate((Double)row.get("rate"));
			obj.setQuantity((Double)row.get("quantity"));
			obj.setAmount((Double)row.get("amount"));
			obj.setConcession((Double)row.get("concession"));
			obj.setPay((Double)row.get("pay"));
			obj.setDepartmentName((String)row.get("department"));
			obj.setSponsorName((String)row.get("sponsor"));
			obj.setAge((String)row.get("age"));
			obj.setGender((String)row.get("gender"));
			obj.setServiceDate((Date)row.get("bill_date"));
			obj.setReceiptNo((String)row.get("ReceiptNo"));
			obj.setRefundAmount((Double)row.get("refund_amount"));
			obj.setDiscount((Double)row.get("discount"));
			obj.setNarrationid_bill((String)row.get("narrationid_bill"));
			obj.setUpdated_by((String)row.get("updated_by"));
			
			
			servicewiselist.add(obj);
		}
		
		return servicewiselist;
	}

	/************
	* @author	: Sandip Shinde
	* @date		: 17-MAY-2023
	* @codeFor	: IPD Receipt Collection Report
	*/
	
	@Override
	public List<IpdCollectionReportDetails> getIpdAllDetails(String fromdatetime, String todatetime, int payMode) {
		
		System.out.println("fromdatetime.......:"+fromdatetime+""+payMode);
		List<IpdCollectionReportDetails> ipdcollectionlist = new ArrayList<>();
		Query query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_ipd_bill_details(:fromdatetime,:todatetime,:payMode)");
		query.setParameter("fromdatetime", fromdatetime);
		query.setParameter("todatetime", todatetime);
		query.setParameter("payMode", payMode);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> list  = query.list();
		
				for (Map<String, Object> row : list) {
					IpdCollectionReportDetails obj = new IpdCollectionReportDetails();
					obj.setBillId((Integer)row.get("bill_No"));
					obj.setReceiptId((Integer)row.get("receipt_No"));
					obj.setReceiptBy((String)row.get("receiptBy"));
					obj.setDoa((Date)row.get("DOA"));
					obj.setPid((Integer)row.get("pid"));
					obj.setPatientName((String)row.get("patient_Name"));
					obj.setSponsorName((String)row.get("sponsorName"));
					obj.setUnitName((String)row.get("unitName"));
					obj.setConsultingDoctor((String)row.get("Consulting Doctor"));
					obj.setSpeciality((String)row.get("specialization_name"));
					obj.setAddress((String)row.get("address"));
					obj.setCity((String)row.get("city"));
					obj.setTaluka((String)row.get("taluka"));
					obj.setDistrict((String)row.get("district"));
					obj.setBankName((String)row.get("bankName"));
					obj.setReceiptDate((Date)row.get("ReceiptDateTime"));
					obj.setPaidAmt((Double)row.get("PaidAmt"));
					obj.setPaymode((String)row.get("Mode_Of_Pay"));
					obj.setCardNumber((String)row.get("CardNo"));
					obj.setRemark((String)row.get("remark"));
					obj.setDeleted((String)row.get("deleted"));
					obj.setReference((String)row.get("Reference"));
					obj.setRefDoc((String)row.get("reference_Doctor_Name"));
					obj.setDeletedBy((String)row.get("deleted_by"));
					obj.setDeletedDateTime((Date)row.get("deleted_date_time"));
					obj.setInvoiceCount((Integer)row.get("invoice_count"));		
					ipdcollectionlist.add(obj);
				
			}
			
			return ipdcollectionlist;
		}
		
}
	

