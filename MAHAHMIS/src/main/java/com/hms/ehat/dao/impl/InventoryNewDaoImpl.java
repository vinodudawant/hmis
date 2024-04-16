package com.hms.ehat.dao.impl;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.InventoryNewDao;
import com.hms.ehat.dto.BillNobleDto;
import com.hms.ehat.dto.BillNobleServicePackageDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.DischargeAllPatientsDto;
import com.hms.ehat.dto.EhatIpdBillFinalEstimateDto;
import com.hms.ehat.dto.InventoryNewDto;
import com.hms.ehat.dto.PatientSubServiceDetailsForOpdPackage;
import com.hms.ehat.dto.SponsorSummaryDetailsDto;
import com.hms.ehat.dto.WardWiseDetaisDto;

@Repository
public class InventoryNewDaoImpl implements InventoryNewDao{

	@Autowired
	SessionFactory sessionFactory;

	
	/********
	 * @author    :Kishor Lokhande
	 * @date      :14-December-2017
	 * @code      :This method is use to fetch Dispatch all Inventory details by pending wise,Given wise,
	 *             all records,Date wise,search wise,Party name wise. 
	 ********/
	@SuppressWarnings("unchecked")
	@Override
	public List<InventoryNewDto> getDispachlist(Integer unitId, Integer userId1,String callfrom,
			String callPartyName,String startDate,String endDate,String letter) {
		
		List<InventoryNewDto> ltDispatchRecord = new ArrayList<InventoryNewDto>();

		try {

			Session session = sessionFactory.getCurrentSession();
			int partyIdd=Integer.parseInt(callPartyName);
			 
			if(callfrom.equalsIgnoreCase("allId")){//if callfrom all then show all records
				
				if(partyIdd  > 0){//if callPartyName select then show all records against partyName
					if (startDate.equalsIgnoreCase("0") && endDate.equalsIgnoreCase("0")) {//get all records without from date to date
						
						String hql = "select * from inv_purchase_invoice_master where inv_purchase_invoice_master_Supplier_Id =:partyIdd and inv_purchase_invoice_master_Supplier_Name LIKE :letter";
						Query query = session.createSQLQuery(hql);
						query.setParameter("partyIdd", partyIdd);
						query.setParameter("letter", "%"+letter+"%");
						query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						ltDispatchRecord = query.list();

					} else {

						String hql = "select * from inv_purchase_invoice_master where inv_purchase_invoice_master_Supplier_Id =:partyIdd and inv_purchase_invoice_master_create_date >=:startDate and inv_purchase_invoice_master_create_date <=:endDate and inv_purchase_invoice_master_Supplier_Name LIKE :letter";
						Query query = session.createSQLQuery(hql);
						query.setParameter("partyIdd", partyIdd);						
						query.setParameter("startDate", startDate);
						query.setParameter("endDate", endDate);
						query.setParameter("letter", "%"+letter+"%");
						query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						ltDispatchRecord = query.list();
					}
										
						
					}else{
						
						if (startDate.equalsIgnoreCase("0") && endDate.equalsIgnoreCase("0")) {
							
							String hql = "select * from inv_purchase_invoice_master where inv_purchase_invoice_master_Supplier_Name LIKE :letter";
							Query query = session.createSQLQuery(hql);							
							query.setParameter("letter", "%"+letter+"%");
							query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							ltDispatchRecord = query.list();
							
						}else{
						
						String hql = "select * from inv_purchase_invoice_master where inv_purchase_invoice_master_create_date >=:startDate and inv_purchase_invoice_master_create_date <=:endDate and inv_purchase_invoice_master_Supplier_Name LIKE :letter";
						Query query = session.createSQLQuery(hql);				
						query.setParameter("startDate", startDate);
						query.setParameter("endDate", endDate);
						query.setParameter("letter", "%"+letter+"%");
						query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						ltDispatchRecord = query.list();
					}
				}
			} 
			
			else if(callfrom.equalsIgnoreCase("pendingId")){//if callfrom pending then show only pending records
				
				if(partyIdd  > 0){//if callPartyName select then show all records against partyName
					
					if (startDate.equalsIgnoreCase("0") && endDate.equalsIgnoreCase("0")) {//get pending records without from date to date
					
					 String hql = "select * from inv_purchase_invoice_master where dispatch_flag =:dispatch_flag and inv_purchase_invoice_master_Supplier_Id =:partyIdd and inv_purchase_invoice_master_Supplier_Name LIKE :letter";
						Query query = session.createSQLQuery(hql);
						query.setParameter("dispatch_flag", "N");
						query.setParameter("partyIdd", partyIdd);
						query.setParameter("letter", "%"+letter+"%");
						query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);					
						ltDispatchRecord=query.list();
					}else{
						String hql = "select * from inv_purchase_invoice_master where dispatch_flag =:dispatch_flag and inv_purchase_invoice_master_Supplier_Id =:partyIdd and inv_purchase_invoice_master_create_date >=:startDate and inv_purchase_invoice_master_create_date <=:endDate and inv_purchase_invoice_master_Supplier_Name LIKE :letter";
						Query query = session.createSQLQuery(hql);
						query.setParameter("dispatch_flag", "N");
						query.setParameter("partyIdd", partyIdd);
						query.setParameter("startDate", startDate);
						query.setParameter("endDate", endDate);
						query.setParameter("letter", "%"+letter+"%");
						query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);					
						ltDispatchRecord=query.list();
					}
						
					}else{
						if (startDate.equalsIgnoreCase("0") && endDate.equalsIgnoreCase("0")) {
							String hql = "select * from inv_purchase_invoice_master where dispatch_flag =:dispatch_flag and inv_purchase_invoice_master_Supplier_Name LIKE :letter";
							Query query = session.createSQLQuery(hql);
							query.setParameter("dispatch_flag", "N");
							query.setParameter("letter", "%"+letter+"%");
							query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);				
							ltDispatchRecord=query.list();
						}else{
							
							String hql = "select * from inv_purchase_invoice_master where dispatch_flag =:dispatch_flag and inv_purchase_invoice_master_create_date >=:startDate and inv_purchase_invoice_master_create_date <=:endDate and inv_purchase_invoice_master_Supplier_Name LIKE :letter";
							Query query = session.createSQLQuery(hql);
							query.setParameter("dispatch_flag", "N");
							query.setParameter("startDate", startDate);
							query.setParameter("endDate", endDate);
							query.setParameter("letter", "%"+letter+"%");
							query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);					
							ltDispatchRecord=query.list();
						}
					}
				} 
			
			else if(callfrom.equalsIgnoreCase("givenId")){//if callfrom given then show only given records
				
				if(partyIdd  > 0){//if callPartyName select then show all records against partyName
					
					if (startDate.equalsIgnoreCase("0") && endDate.equalsIgnoreCase("0")) {//get given records without from date to date
						String hql = "select * from inv_purchase_invoice_master where dispatch_flag =:dispatch_flag and inv_purchase_invoice_master_Supplier_Id =:partyIdd and inv_purchase_invoice_master_Supplier_Name LIKE :letter";
						Query query = session.createSQLQuery(hql);
						query.setParameter("dispatch_flag", "Y");
						query.setParameter("partyIdd", partyIdd);
						query.setParameter("letter", "%"+letter+"%");
						query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);					
						ltDispatchRecord=query.list();
					}else{
						String hql = "select * from inv_purchase_invoice_master where dispatch_flag =:dispatch_flag and inv_purchase_invoice_master_Supplier_Id =:partyIdd and inv_purchase_invoice_master_create_date >=:startDate and inv_purchase_invoice_master_create_date <=:endDate and inv_purchase_invoice_master_Supplier_Name LIKE :letter";
						Query query = session.createSQLQuery(hql);
						query.setParameter("dispatch_flag", "Y");
						query.setParameter("partyIdd", partyIdd);
						query.setParameter("startDate", startDate);
						query.setParameter("endDate", endDate);
						query.setParameter("letter", "%"+letter+"%");
						query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);					
						ltDispatchRecord=query.list();
					}
					 
						
					}else{
						
						if (startDate.equalsIgnoreCase("0") && endDate.equalsIgnoreCase("0")) {
							 String hql = "select * from inv_purchase_invoice_master where dispatch_flag =:dispatch_flag and inv_purchase_invoice_master_Supplier_Name LIKE :letter";
								Query query = session.createSQLQuery(hql);
								query.setParameter("dispatch_flag", "Y");
								query.setParameter("letter", "%"+letter+"%");
								query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);				
								ltDispatchRecord=query.list();
								
						}else{
							String hql = "select * from inv_purchase_invoice_master where dispatch_flag =:dispatch_flag and inv_purchase_invoice_master_create_date >=:startDate and inv_purchase_invoice_master_create_date <=:endDate and inv_purchase_invoice_master_Supplier_Name LIKE :letter";
							Query query = session.createSQLQuery(hql);
							query.setParameter("dispatch_flag", "Y");
							query.setParameter("startDate", startDate);
							query.setParameter("endDate", endDate);
							query.setParameter("letter", "%"+letter+"%");
							query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);					
							ltDispatchRecord=query.list();
						}
				
					}
				}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltDispatchRecord;
	}

	
	/********
	 * @author    :Kishor Lokhande
	 * @date      :14-December-2017
	 * @code      :This method is use to Save Dispatch Inventory Generate flag
	 ********/
	@Override
	public int saveDispachlist(String docId, Integer unitId, Integer userId1) {
				
		try {
			String[] ary = docId.split(",");
			Date date=new Date(new java.util.Date().getTime());
		for (int i = 0; i < ary.length; i++) {
						
			Query query = sessionFactory.getCurrentSession().createSQLQuery(
				    "update inv_purchase_invoice_master set dispatch_flag =:dispatch_flag,unit_id =:unitId,generated_by =:userId1,updated_date_time =:date where inv_purchase_invoice_master_doc_no =:docId");
				query.setParameter("dispatch_flag", "Y");
				query.setParameter("docId", ary[i]);
				query.setParameter("unitId", unitId);
				query.setParameter("userId1", userId1);
				query.setParameter("date", date);
				int result = query.executeUpdate();
		}
		 
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	/********
	 * @author    :Kishor Lokhande
	 * @date      :14-December-2017
	 * @code      :This method is use to fetch Dispatch Inventory all recorders between two dates
	 ********/
	@Override
	public List<InventoryNewDto> getPartyDetailsfromDate(String startDate,
			String endDate, Integer unitId, Integer userId1) {
		List<InventoryNewDto> ltDispatchRecord = new ArrayList<InventoryNewDto>();

		try {		

			Session session = sessionFactory.getCurrentSession();
						
			 String hql = "select * from inv_purchase_invoice_master where inv_purchase_invoice_master_create_date >=:startDate and inv_purchase_invoice_master_create_date <=:endDate";
				Query query = session.createSQLQuery(hql);
				query.setParameter("startDate", startDate);
				query.setParameter("endDate", endDate);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			
				ltDispatchRecord=query.list();					
			
			
		} catch (Exception e) {
			e.printStackTrace();
					}
		
		return ltDispatchRecord;
	}

	/********
	 * @author    :Kishor Lokhande
	 * @date      :15-December-2017
	 * @code      :This method is use to fetch inventory Distinct party Name
	 ********/
	@Override
	public List<InventoryNewDto> getPartyNameForSelectList(Integer unitId,
			Integer userId1) {
		
		List<InventoryNewDto> ltDispatchRecord = new ArrayList<InventoryNewDto>();

		try {
			Session session = sessionFactory.getCurrentSession();
			
			 String hql = "select distinct(inv_purchase_invoice_master_Supplier_Id),inv_purchase_invoice_master_Supplier_Name from inv_purchase_invoice_master";
				Query query = session.createSQLQuery(hql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			
				ltDispatchRecord=query.list();	
						
		} catch (Exception e) {
			e.printStackTrace();			
		}
		return ltDispatchRecord;
	}


	@Override
	public List<WardWiseDetaisDto> getWardWisePatientsDetails(Integer unitId,
			Integer userId1, Integer hallId, Integer hallSlaveId,
			Integer docId, String startDate, String endDate, String letter) {
		
		List<WardWiseDetaisDto> ltHallWiseRecord = new ArrayList<WardWiseDetaisDto>();

		try {
			Session session = sessionFactory.getCurrentSession();
					if (startDate.equalsIgnoreCase("0") && endDate.equalsIgnoreCase("0")) {//get all records without from date to date
					
						
						String sql = "select * from ehat_wardwise_patients_report_view where patient_name LIKE :letter";
				         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
							query.setParameter("letter", "%"+letter+"%");
				         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				         List<Map<String, Object>> data = query.list();
				       
				         for(Map<String, Object> row : data){
				        	 WardWiseDetaisDto objDTO= new WardWiseDetaisDto();
					        	
				        	 objDTO.setPatientId((Integer)row.get("patient_id"));
				        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
				        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));				        	
				        	 objDTO.setBillId((Integer)row.get("bill_id"));
				        	 objDTO.setPatientName((String)row.get("patient_name"));
				        	 objDTO.setMobile((String)row.get("mobile"));
				        	 objDTO.setCategory_name((String)row.get("category_name"));
				        	 objDTO.setDoctorId((String)row.get("doctor_id"));
				        	 objDTO.setCaseType((Integer)row.get("case_type"));
				        	 objDTO.setSourceTypeId((Integer)row.get("source_type_id"));
				        	 objDTO.setBedHall((String)row.get("BedHall"));
				        	 objDTO.setAddmitDays((Integer)row.get("addmit_days"));
				        	 objDTO.setChargesMasterSlaveId((Integer)row.get("charges_master_slave_id"));
				        	 objDTO.setEhatHallTypeId((BigInteger)row.get("ehat_halltype_id"));
				        	 objDTO.setHallTypeName((String)row.get("hall_type_name"));
				        	 objDTO.setHallName((String)row.get("hname"));
				        	 
				        	 
				        	 
				        	 String dcId=(String)row.get("doctor_id");
				        	 
					        	//code to fetch docName						             	         
					                Query qGrName = sessionFactory
					                        .getCurrentSession()
					                        .createSQLQuery(
					                                "SELECT ifnull(GROUP_CONCAT(doc_name SEPARATOR ','),'-') as docName FROM doctor WHERE Doctor_ID IN ('"+dcId+"')");

					                String docNameStrrr = (String) qGrName.uniqueResult();
					                objDTO.setDocNameStr(docNameStrrr);
					             ltHallWiseRecord.add(objDTO);
					        	 //objDTO=null;
				         }
						
						

					} else {
						
						if(hallId > 0){
							
							if(docId > 0){
								
						
								
								
								//String sql = "select * from ehat_wardwise_patients_report_view where ehat_halltype_id =:hallId and date(created_date_time) between :startDate and :endDate and doctor_id =:docId OR doctor_id LIKE :docId OR doctor_id LIKE :docId1 OR doctor_id LIKE :docId2 OR doctor_id LIKE :docId3 and patient_name LIKE :letter";
								String sql = "select * from ehat_wardwise_patients_report_view where ehat_halltype_id =:hallId and date(created_date_time) between :startDate and :endDate and doctor_id =:docId";

								SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
						         query.setParameter("hallId", hallId); 
									//query.setParameter("docId", docId);						
									query.setParameter("startDate", startDate);
									query.setParameter("endDate", endDate);
									//query.setParameter("letter", "%"+letter+"%");
									
									query.setParameter("docId", docId);
									//query.setParameter("docId1", docId+",%");
									//query.setParameter("docId2", "%,"+docId+",%");
									//query.setParameter("docId3", "%,"+docId);
						         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						         List<Map<String, Object>> data = query.list();
						       
						         for(Map<String, Object> row : data){
						        	 WardWiseDetaisDto objDTO= new WardWiseDetaisDto();
							        	
						        	 objDTO.setPatientId((Integer)row.get("patient_id"));
						        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
						        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));				        	
						        	 objDTO.setBillId((Integer)row.get("bill_id"));
						        	 objDTO.setPatientName((String)row.get("patient_name"));
						        	 objDTO.setMobile((String)row.get("mobile"));
						        	 objDTO.setCategory_name((String)row.get("category_name"));
						        	 objDTO.setDoctorId((String)row.get("doctor_id"));
						        	 objDTO.setCaseType((Integer)row.get("case_type"));
						        	 objDTO.setSourceTypeId((Integer)row.get("source_type_id"));
						        	 objDTO.setBedHall((String)row.get("BedHall"));
						        	 objDTO.setAddmitDays((Integer)row.get("addmit_days"));	
						        	 objDTO.setChargesMasterSlaveId((Integer)row.get("charges_master_slave_id"));
						        	 objDTO.setEhatHallTypeId((BigInteger)row.get("ehat_halltype_id"));
						        	 objDTO.setHallTypeName((String)row.get("hall_type_name"));
						        	 objDTO.setHallName((String)row.get("hname"));
						        	 
						        	 String dcId=(String)row.get("doctor_id");
						        	 
							        	//code to fetch docName						             	         
							                Query qGrName = sessionFactory
							                        .getCurrentSession()
							                        .createSQLQuery(
							                                "SELECT ifnull(GROUP_CONCAT(doc_name SEPARATOR ','),'-') as docName FROM doctor WHERE Doctor_ID IN ('"+dcId+"')");

							                String docNameStrrr = (String) qGrName.uniqueResult();
							                objDTO.setDocNameStr(docNameStrrr);
							             ltHallWiseRecord.add(objDTO);
							        	 //objDTO=null;
						         }
								
								
								
								
								
							}else{
								
								String sql = "select * from ehat_wardwise_patients_report_view where ehat_halltype_id =:hallId and date(created_date_time) between :startDate and :endDate and patient_name LIKE :letter";
						         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
						         query.setParameter("hallId", hallId); 
						        // query.setParameter("hallId", hallId); 
									//query.setParameter("hallSlaveId", hallSlaveId);						
									query.setParameter("startDate", startDate);
									query.setParameter("endDate", endDate);
									query.setParameter("letter", "%"+letter+"%");
						         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						         List<Map<String, Object>> data = query.list();
						       
						         for(Map<String, Object> row : data){
						        	 WardWiseDetaisDto objDTO= new WardWiseDetaisDto();
							        	
						        	 objDTO.setPatientId((Integer)row.get("patient_id"));
						        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
						        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));				        	
						        	 objDTO.setBillId((Integer)row.get("bill_id"));
						        	 objDTO.setPatientName((String)row.get("patient_name"));
						        	 objDTO.setMobile((String)row.get("mobile"));
						        	 objDTO.setCategory_name((String)row.get("category_name"));
						        	 objDTO.setDoctorId((String)row.get("doctor_id"));
						        	 objDTO.setCaseType((Integer)row.get("case_type"));
						        	 objDTO.setSourceTypeId((Integer)row.get("source_type_id"));
						        	 objDTO.setBedHall((String)row.get("BedHall"));
						        	 objDTO.setAddmitDays((Integer)row.get("addmit_days"));
						        	 objDTO.setChargesMasterSlaveId((Integer)row.get("charges_master_slave_id"));
						        	 objDTO.setEhatHallTypeId((BigInteger)row.get("ehat_halltype_id"));
						        	 objDTO.setHallTypeName((String)row.get("hall_type_name"));
						        	 objDTO.setHallName((String)row.get("hname"));
						        	 
						        	 String dcId=(String)row.get("doctor_id");
						        	 
							        	//code to fetch docName						             	         
							                Query qGrName = sessionFactory
							                        .getCurrentSession()
							                        .createSQLQuery(
							                                "SELECT ifnull(GROUP_CONCAT(doc_name SEPARATOR ','),'-') as docName FROM doctor WHERE Doctor_ID IN ('"+dcId+"')");

							                String docNameStrrr = (String) qGrName.uniqueResult();
							                objDTO.setDocNameStr(docNameStrrr);
							             ltHallWiseRecord.add(objDTO);
							        	 //objDTO=null;
						         }
								
								
							}
							
							
						}else{
							
								if(docId > 0){
								
								String sql = "select * from ehat_wardwise_patients_report_view where date(created_date_time) between :startDate and :endDate and doctor_id =:docId OR doctor_id LIKE :docId OR doctor_id LIKE :docId1 OR doctor_id LIKE :docId2 OR doctor_id LIKE :docId3 and patient_name LIKE :letter";
						         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
						        // query.setParameter("hallId", hallId); 
						         //query.setParameter("hallId", hallId); 
						       //query.setParameter("hallId", hallId); 
									//query.setParameter("docId", docId);						
									query.setParameter("startDate", startDate);
									query.setParameter("endDate", endDate);
									query.setParameter("letter", "%"+letter+"%");
									
									query.setParameter("docId", docId);
									query.setParameter("docId1", docId+",%");
									query.setParameter("docId2", "%,"+docId+",%");
									query.setParameter("docId3", "%,"+docId);
						         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						         List<Map<String, Object>> data = query.list();
						       
						         for(Map<String, Object> row : data){
						        	 WardWiseDetaisDto objDTO= new WardWiseDetaisDto();
							        	
						        	 objDTO.setPatientId((Integer)row.get("patient_id"));
						        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
						        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));				        	
						        	 objDTO.setBillId((Integer)row.get("bill_id"));
						        	 objDTO.setPatientName((String)row.get("patient_name"));
						        	 objDTO.setMobile((String)row.get("mobile"));
						        	 objDTO.setCategory_name((String)row.get("category_name"));
						        	 objDTO.setDoctorId((String)row.get("doctor_id"));
						        	 objDTO.setCaseType((Integer)row.get("case_type"));
						        	 objDTO.setSourceTypeId((Integer)row.get("source_type_id"));
						        	 objDTO.setBedHall((String)row.get("BedHall"));
						        	 objDTO.setAddmitDays((Integer)row.get("addmit_days"));
						        	 objDTO.setChargesMasterSlaveId((Integer)row.get("charges_master_slave_id"));
						        	 objDTO.setEhatHallTypeId((BigInteger)row.get("ehat_halltype_id"));
						        	 objDTO.setHallTypeName((String)row.get("hall_type_name"));
						        	 objDTO.setHallName((String)row.get("hname"));
						        	 
						        	 String dcId=(String)row.get("doctor_id");
						        	 
							        	//code to fetch docName						             	         
							                Query qGrName = sessionFactory
							                        .getCurrentSession()
							                        .createSQLQuery(
							                                "SELECT ifnull(GROUP_CONCAT(doc_name SEPARATOR ','),'-') as docName FROM doctor WHERE Doctor_ID IN ('"+dcId+"')");

							                String docNameStrrr = (String) qGrName.uniqueResult();
							                objDTO.setDocNameStr(docNameStrrr);
							             ltHallWiseRecord.add(objDTO);
							        	 //objDTO=null;
						         }
								
								
							}else{
							
								String sql = "select * from ehat_wardwise_patients_report_view where date(created_date_time) between :startDate and :endDate and patient_name LIKE :letter";
						         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
						         //query.setParameter("hallId", hallId); 
						      //   query.setParameter("hallId", hallId); 
						         query.setParameter("startDate", startDate);
									query.setParameter("endDate", endDate);
									query.setParameter("letter", "%"+letter+"%");
						         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						         List<Map<String, Object>> data = query.list();
						       
						         for(Map<String, Object> row : data){
						        	 WardWiseDetaisDto objDTO= new WardWiseDetaisDto();
							        	
						        	 objDTO.setPatientId((Integer)row.get("patient_id"));
						        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
						        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));				        	
						        	 objDTO.setBillId((Integer)row.get("bill_id"));
						        	 objDTO.setPatientName((String)row.get("patient_name"));
						        	 objDTO.setMobile((String)row.get("mobile"));
						        	 objDTO.setCategory_name((String)row.get("category_name"));
						        	 objDTO.setDoctorId((String)row.get("doctor_id"));
						        	 objDTO.setCaseType((Integer)row.get("case_type"));
						        	 objDTO.setSourceTypeId((Integer)row.get("source_type_id"));
						        	 objDTO.setBedHall((String)row.get("BedHall"));
						        	 objDTO.setAddmitDays((Integer)row.get("addmit_days"));			    
						        	 String dcId=(String)row.get("doctor_id");
						        	 objDTO.setChargesMasterSlaveId((Integer)row.get("charges_master_slave_id"));
						        	 objDTO.setEhatHallTypeId((BigInteger)row.get("ehat_halltype_id"));
						        	 objDTO.setHallTypeName((String)row.get("hall_type_name"));
						        	 objDTO.setHallName((String)row.get("hname"));
						        	 
						        	//code to fetch docName						             	         
						                Query qGrName = sessionFactory
						                        .getCurrentSession()
						                        .createSQLQuery(
						                                "SELECT ifnull(GROUP_CONCAT(doc_name SEPARATOR ','),'-') as docName FROM doctor WHERE Doctor_ID IN ('"+dcId+"')");

						                String docNameStrrr = (String) qGrName.uniqueResult();
						                objDTO.setDocNameStr(docNameStrrr);
						             ltHallWiseRecord.add(objDTO);
						        	 //objDTO=null;
						         }
							}
							
						}

					}
				
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltHallWiseRecord;
	}

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
	public List<DischargeAllPatientsDto> getDischargePatientsDetails(
			Integer unitId, Integer userId1, Integer chargesId,
			Integer chargesSlaveId, String typeOf, String startDate,
			String endDate, String letter) {
		
		List<DischargeAllPatientsDto> ltDischargeRecord = new ArrayList<DischargeAllPatientsDto>();

		try {
			Session session = sessionFactory.getCurrentSession();
			
			
			StringBuilder masterId3 = new StringBuilder();
			String alString="";
			ArrayList<Integer> al=new ArrayList<Integer>();
			if (chargesId > 0) {
				List<ChargesMasterSlave> list=getSponsorList2(chargesId,chargesSlaveId);
				for (int i = 0; i < list.size(); i++) {
					
					al.add(list.get(i).getSlaveId());	
					masterId3.append(list.get(i).getSlaveId());
		 			masterId3.append(",");
				}
			}	
			if (masterId3 != null && masterId3.length() > 0) {
				alString = masterId3.substring(0, masterId3.length() - 1);
	 		}	
			//System.err.println("allllis===-=-"+al.size());
			//System.err.println("alString===-=-"+alString);
			
			
			
			if(typeOf.equalsIgnoreCase("allId")){
				
				if (startDate.equalsIgnoreCase("0") && endDate.equalsIgnoreCase("0")) {//get all records without from date to date
					
					String sql = "select * from ehat_all_discharge_report_view where patient_name LIKE :letter";
			         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			    	query.setParameter("letter", "%"+letter+"%");
			         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			         List<Map<String, Object>> data = query.list();
			       
			         for(Map<String, Object> row : data){
			        	 DischargeAllPatientsDto objDTO= new DischargeAllPatientsDto();
				        	
			        	 objDTO.setPatientId((Integer)row.get("patient_id"));
			        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
			        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));
			        	 objDTO.setDischargeDate((String)row.get("discharge_date"));
			        	 objDTO.setDischargeTime((String)row.get("discharge_time"));
			        	 objDTO.setBillId((Integer)row.get("bill_id"));
			        	 objDTO.setPatientName((String)row.get("patient_name"));
			        	 objDTO.setMobile((String)row.get("mobile"));
			        	 objDTO.setCategory_name((String)row.get("category_name"));
			        	 objDTO.setDoctorId((String)row.get("doctor_id"));
			        	 objDTO.setCaseType((Integer)row.get("case_type"));
			        	 objDTO.setBedHall((String)row.get("BedHall"));
			        	 objDTO.setDischargeType((String)row.get("discharge_type"));
			        	 objDTO.setAddmitDays((Integer)row.get("addmit_days"));
			        	 objDTO.setChargesMasterSlaveId((Integer)row.get("charges_master_slave_id"));
			        	 objDTO.setRefDocId((BigInteger)row.get("ref_doc_id"));
			        	 objDTO.setRefDocName((String)row.get("ref_doc_name"));
			        	 objDTO.setHallTypeName((String)row.get("hall_type_name"));
			        	 
			    
			        	 
			        	 String dcId=(String)row.get("doctor_id");
			        	 
				        	//code to fetch docName						             	         
				                Query qGrName = sessionFactory
				                        .getCurrentSession()
				                        .createSQLQuery(
				                                "SELECT ifnull(GROUP_CONCAT(doc_name SEPARATOR ','),'-') as docName FROM doctor WHERE Doctor_ID IN ('"+dcId+"')");

				                String docNameStrrr = (String) qGrName.uniqueResult();
				                objDTO.setDocNameStr(docNameStrrr);
				                ltDischargeRecord.add(objDTO);
				                objDTO=null;
			         }
					
					

				} else {
					
					if(al.size()>0){
						
						String sql = "select * from ehat_all_discharge_report_view where date(discharge_date) between :startDate and :endDate and charges_master_slave_id in('"+alString+"') and patient_name LIKE :letter";
				         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				         query.setParameter("startDate", startDate);
							query.setParameter("endDate", endDate);
							query.setParameter("letter", "%"+letter+"%");
				         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				         List<Map<String, Object>> data = query.list();
				       
				         for(Map<String, Object> row : data){
				        	 DischargeAllPatientsDto objDTO= new DischargeAllPatientsDto();
					        	
				        	 objDTO.setPatientId((Integer)row.get("patient_id"));
				        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
				        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));
				        	 objDTO.setDischargeDate((String)row.get("discharge_date"));
				        	 objDTO.setDischargeTime((String)row.get("discharge_time"));
				        	 objDTO.setBillId((Integer)row.get("bill_id"));
				        	 objDTO.setPatientName((String)row.get("patient_name"));
				        	 objDTO.setMobile((String)row.get("mobile"));
				        	 objDTO.setCategory_name((String)row.get("category_name"));
				        	 objDTO.setDoctorId((String)row.get("doctor_id"));
				        	 objDTO.setCaseType((Integer)row.get("case_type"));
				        	 objDTO.setBedHall((String)row.get("BedHall"));
				        	 objDTO.setDischargeType((String)row.get("discharge_type"));
				        	 objDTO.setAddmitDays((Integer)row.get("addmit_days"));
				        	 objDTO.setChargesMasterSlaveId((Integer)row.get("charges_master_slave_id"));
				        	 objDTO.setRefDocId((BigInteger)row.get("ref_doc_id"));
				        	 objDTO.setRefDocName((String)row.get("ref_doc_name"));
				        	 objDTO.setHallTypeName((String)row.get("hall_type_name"));
				        	 
				        	 String dcId=(String)row.get("doctor_id");
				        	 
					        	//code to fetch docName						             	         
					                Query qGrName = sessionFactory
					                        .getCurrentSession()
					                        .createSQLQuery(
					                                "SELECT ifnull(GROUP_CONCAT(doc_name SEPARATOR ','),'-') as docName FROM doctor WHERE Doctor_ID IN ('"+dcId+"')");

					                String docNameStrrr = (String) qGrName.uniqueResult();
					                objDTO.setDocNameStr(docNameStrrr);
					                ltDischargeRecord.add(objDTO);
					                objDTO=null;
				         }
						
						
					}else{
					
						
						String sql = "select * from ehat_all_discharge_report_view where date(discharge_date) between :startDate and :endDate and patient_name LIKE :letter";
				         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				         query.setParameter("startDate", startDate);
							query.setParameter("endDate", endDate);
							query.setParameter("letter", "%"+letter+"%");
				         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				         List<Map<String, Object>> data = query.list();
				       
				         for(Map<String, Object> row : data){
				        	 DischargeAllPatientsDto objDTO= new DischargeAllPatientsDto();
					        	
				        	 objDTO.setPatientId((Integer)row.get("patient_id"));
				        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
				        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));
				        	 objDTO.setDischargeDate((String)row.get("discharge_date"));
				        	 objDTO.setDischargeTime((String)row.get("discharge_time"));
				        	 objDTO.setBillId((Integer)row.get("bill_id"));
				        	 objDTO.setPatientName((String)row.get("patient_name"));
				        	 objDTO.setMobile((String)row.get("mobile"));
				        	 objDTO.setCategory_name((String)row.get("category_name"));
				        	 objDTO.setDoctorId((String)row.get("doctor_id"));
				        	 objDTO.setCaseType((Integer)row.get("case_type"));
				        	 objDTO.setBedHall((String)row.get("BedHall"));
				        	 objDTO.setDischargeType((String)row.get("discharge_type"));
				        	 objDTO.setAddmitDays((Integer)row.get("addmit_days"));
				        	 objDTO.setChargesMasterSlaveId((Integer)row.get("charges_master_slave_id"));
				        	 objDTO.setRefDocId((BigInteger)row.get("ref_doc_id"));
				        	 objDTO.setRefDocName((String)row.get("ref_doc_name"));
				        	 objDTO.setHallTypeName((String)row.get("hall_type_name"));
				        	 
				        	 String dcId=(String)row.get("doctor_id");
				        	 
					        	//code to fetch docName						             	         
					                Query qGrName = sessionFactory
					                        .getCurrentSession()
					                        .createSQLQuery(
					                                "SELECT ifnull(GROUP_CONCAT(doc_name SEPARATOR ','),'-') as docName FROM doctor WHERE Doctor_ID IN ('"+dcId+"')");

					                String docNameStrrr = (String) qGrName.uniqueResult();
					                objDTO.setDocNameStr(docNameStrrr);
					                ltDischargeRecord.add(objDTO);
					                objDTO=null;
				         }
						
					}
					
					
				}
				
			}else if (typeOf.equalsIgnoreCase("mediclaimId")) {
				
				if (startDate.equalsIgnoreCase("0") && endDate.equalsIgnoreCase("0")) {//get all records without from date to date
					
					
					String sql = "select * from ehat_all_discharge_report_view where patient_name LIKE :letter";
			         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			         query.setParameter("letter", "%"+letter+"%");
			         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			         List<Map<String, Object>> data = query.list();
			       
			         for(Map<String, Object> row : data){
			        	 DischargeAllPatientsDto objDTO= new DischargeAllPatientsDto();
				        	
			        	 objDTO.setPatientId((Integer)row.get("patient_id"));
			        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
			        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));
			        	 objDTO.setDischargeDate((String)row.get("discharge_date"));
			        	 objDTO.setDischargeTime((String)row.get("discharge_time"));
			        	 objDTO.setBillId((Integer)row.get("bill_id"));
			        	 objDTO.setPatientName((String)row.get("patient_name"));
			        	 objDTO.setMobile((String)row.get("mobile"));
			        	 objDTO.setCategory_name((String)row.get("category_name"));
			        	 objDTO.setDoctorId((String)row.get("doctor_id"));
			        	 objDTO.setCaseType((Integer)row.get("case_type"));
			        	 objDTO.setBedHall((String)row.get("BedHall"));
			        	 objDTO.setDischargeType((String)row.get("discharge_type"));
			        	 objDTO.setAddmitDays((Integer)row.get("addmit_days"));
			        	 objDTO.setChargesMasterSlaveId((Integer)row.get("charges_master_slave_id"));
			        	 objDTO.setRefDocId((BigInteger)row.get("ref_doc_id"));
			        	 objDTO.setRefDocName((String)row.get("ref_doc_name"));
			        	 objDTO.setHallTypeName((String)row.get("hall_type_name"));
			        	 
			        	 String dcId=(String)row.get("doctor_id");
			        	 
				        	//code to fetch docName						             	         
				                Query qGrName = sessionFactory
				                        .getCurrentSession()
				                        .createSQLQuery(
				                                "SELECT ifnull(GROUP_CONCAT(doc_name SEPARATOR ','),'-') as docName FROM doctor WHERE Doctor_ID IN ('"+dcId+"')");

				                String docNameStrrr = (String) qGrName.uniqueResult();
				                objDTO.setDocNameStr(docNameStrrr);
				                ltDischargeRecord.add(objDTO);
				                objDTO=null;
			         }
					
					
					

				} else {
					if(al.size()>0){
					
						String sql = "select * from ehat_all_discharge_report_view where date(discharge_date) between :startDate and :endDate and source_type_id =:source_type_id and charges_master_slave_id in('"+alString+"') and patient_name LIKE :letter";
				         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				         query.setParameter("source_type_id", 1);
							query.setParameter("startDate", startDate);
							query.setParameter("endDate", endDate);
							query.setParameter("letter", "%"+letter+"%");
				         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				         List<Map<String, Object>> data = query.list();
				       
				         for(Map<String, Object> row : data){
				        	 DischargeAllPatientsDto objDTO= new DischargeAllPatientsDto();
					        	
				        	 objDTO.setPatientId((Integer)row.get("patient_id"));
				        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
				        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));
				        	 objDTO.setDischargeDate((String)row.get("discharge_date"));
				        	 objDTO.setDischargeTime((String)row.get("discharge_time"));
				        	 objDTO.setBillId((Integer)row.get("bill_id"));
				        	 objDTO.setPatientName((String)row.get("patient_name"));
				        	 objDTO.setMobile((String)row.get("mobile"));
				        	 objDTO.setCategory_name((String)row.get("category_name"));
				        	 objDTO.setDoctorId((String)row.get("doctor_id"));
				        	 objDTO.setCaseType((Integer)row.get("case_type"));
				        	 objDTO.setBedHall((String)row.get("BedHall"));
				        	 objDTO.setDischargeType((String)row.get("discharge_type"));
				        	 objDTO.setAddmitDays((Integer)row.get("addmit_days"));
				        	 objDTO.setChargesMasterSlaveId((Integer)row.get("charges_master_slave_id"));
				        	 objDTO.setRefDocId((BigInteger)row.get("ref_doc_id"));
				        	 objDTO.setRefDocName((String)row.get("ref_doc_name"));
				        	 objDTO.setHallTypeName((String)row.get("hall_type_name"));
				        	 
				        	 String dcId=(String)row.get("doctor_id");
				        	 
					        	//code to fetch docName						             	         
					                Query qGrName = sessionFactory
					                        .getCurrentSession()
					                        .createSQLQuery(
					                                "SELECT ifnull(GROUP_CONCAT(doc_name SEPARATOR ','),'-') as docName FROM doctor WHERE Doctor_ID IN ('"+dcId+"')");

					                String docNameStrrr = (String) qGrName.uniqueResult();
					                objDTO.setDocNameStr(docNameStrrr);
					                ltDischargeRecord.add(objDTO);
					                objDTO=null;
				         }
						
						
					}else{
						
						String sql = "select * from ehat_all_discharge_report_view where date(discharge_date) between :startDate and :endDate and source_type_id =:source_type_id and patient_name LIKE :letter";
				         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				         query.setParameter("source_type_id", 1);
							query.setParameter("startDate", startDate);
							query.setParameter("endDate", endDate);
							query.setParameter("letter", "%"+letter+"%");
				         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				         List<Map<String, Object>> data = query.list();
				       
				         for(Map<String, Object> row : data){
				        	 DischargeAllPatientsDto objDTO= new DischargeAllPatientsDto();
					        	
				        	 objDTO.setPatientId((Integer)row.get("patient_id"));
				        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
				        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));
				        	 objDTO.setDischargeDate((String)row.get("discharge_date"));
				        	 objDTO.setDischargeTime((String)row.get("discharge_time"));
				        	 objDTO.setBillId((Integer)row.get("bill_id"));
				        	 objDTO.setPatientName((String)row.get("patient_name"));
				        	 objDTO.setMobile((String)row.get("mobile"));
				        	 objDTO.setCategory_name((String)row.get("category_name"));
				        	 objDTO.setDoctorId((String)row.get("doctor_id"));
				        	 objDTO.setCaseType((Integer)row.get("case_type"));
				        	 objDTO.setBedHall((String)row.get("BedHall"));
				        	 objDTO.setDischargeType((String)row.get("discharge_type"));
				        	 objDTO.setAddmitDays((Integer)row.get("addmit_days"));
				        	 objDTO.setChargesMasterSlaveId((Integer)row.get("charges_master_slave_id"));
				        	 objDTO.setRefDocId((BigInteger)row.get("ref_doc_id"));
				        	 objDTO.setRefDocName((String)row.get("ref_doc_name"));
				        	 objDTO.setHallTypeName((String)row.get("hall_type_name"));
				        	 
				        	 String dcId=(String)row.get("doctor_id");
				        	 
					        	//code to fetch docName						             	         
					                Query qGrName = sessionFactory
					                        .getCurrentSession()
					                        .createSQLQuery(
					                                "SELECT ifnull(GROUP_CONCAT(doc_name SEPARATOR ','),'-') as docName FROM doctor WHERE Doctor_ID IN ('"+dcId+"')");

					                String docNameStrrr = (String) qGrName.uniqueResult();
					                objDTO.setDocNameStr(docNameStrrr);
					                ltDischargeRecord.add(objDTO);
					                objDTO=null;
				         }
						
							
					}
				}
				
			} else if(typeOf.equalsIgnoreCase("selfId")) {
				
				if (startDate.equalsIgnoreCase("0") && endDate.equalsIgnoreCase("0")) {//get all records without from date to date
					
					
					String sql = "select * from ehat_all_discharge_report_view where patient_name LIKE :letter";
			         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			         query.setParameter("letter", "%"+letter+"%");
			         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			         List<Map<String, Object>> data = query.list();
			       
			         for(Map<String, Object> row : data){
			        	 DischargeAllPatientsDto objDTO= new DischargeAllPatientsDto();
				        	
			        	 objDTO.setPatientId((Integer)row.get("patient_id"));
			        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
			        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));
			        	 objDTO.setDischargeDate((String)row.get("discharge_date"));
			        	 objDTO.setDischargeTime((String)row.get("discharge_time"));
			        	 objDTO.setBillId((Integer)row.get("bill_id"));
			        	 objDTO.setPatientName((String)row.get("patient_name"));
			        	 objDTO.setMobile((String)row.get("mobile"));
			        	 objDTO.setCategory_name((String)row.get("category_name"));
			        	 objDTO.setDoctorId((String)row.get("doctor_id"));
			        	 objDTO.setCaseType((Integer)row.get("case_type"));
			        	 objDTO.setBedHall((String)row.get("BedHall"));
			        	 objDTO.setDischargeType((String)row.get("discharge_type"));
			        	 objDTO.setAddmitDays((Integer)row.get("addmit_days"));
			        	 objDTO.setChargesMasterSlaveId((Integer)row.get("charges_master_slave_id"));
			        	 objDTO.setRefDocId((BigInteger)row.get("ref_doc_id"));
			        	 objDTO.setRefDocName((String)row.get("ref_doc_name"));
			        	 objDTO.setHallTypeName((String)row.get("hall_type_name"));
			        	 
			        	 String dcId=(String)row.get("doctor_id");
			        	 
				        	//code to fetch docName						             	         
				                Query qGrName = sessionFactory
				                        .getCurrentSession()
				                        .createSQLQuery(
				                                "SELECT ifnull(GROUP_CONCAT(doc_name SEPARATOR ','),'-') as docName FROM doctor WHERE Doctor_ID IN ('"+dcId+"')");

				                String docNameStrrr = (String) qGrName.uniqueResult();
				                objDTO.setDocNameStr(docNameStrrr);
				                ltDischargeRecord.add(objDTO);
				                objDTO=null;
			         }
				} else {
					
					/*if(al.size()>0){
						String hql = "select * from ehat_all_discharge_report_view where date(created_date_time) between :startDate and :endDate and source_type_id =:source_type_id and charges_master_slave_id in('"+alString+"') and patient_name LIKE :letter";
						Query query = session.createSQLQuery(hql);
						//SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(hql);
						//query.setParameter("hallId", hallId); source_type_id =:hallId
						//query.setParameter("hallSlaveId", hallSlaveId);
						query.setParameter("source_type_id", 0);
						query.setParameter("startDate", startDate);
						query.setParameter("endDate", endDate);
						query.setParameter("letter", "%"+letter+"%");
						query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						ltDischargeRecord = query.list();
					}else {*/
						/*String hql = "select * from ehat_all_discharge_report_view where date(created_date_time) between :startDate and :endDate and source_type_id =:source_type_id and patient_name LIKE :letter";
						Query query = session.createSQLQuery(hql);
						//SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(hql);
						//query.setParameter("hallId", hallId); source_type_id =:hallId
						//query.setParameter("hallSlaveId", hallSlaveId);
						query.setParameter("source_type_id", 0);
						query.setParameter("startDate", startDate);
						query.setParameter("endDate", endDate);
						query.setParameter("letter", "%"+letter+"%");
						query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						ltDischargeRecord = query.list();*/
					//}
						
						
						String sql = "select * from ehat_all_discharge_report_view where date(discharge_date) between :startDate and :endDate and source_type_id =:source_type_id and patient_name LIKE :letter";
				         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				         query.setParameter("source_type_id", 0);
							query.setParameter("startDate", startDate);
							query.setParameter("endDate", endDate);
							query.setParameter("letter", "%"+letter+"%");
				         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				         List<Map<String, Object>> data = query.list();
				       
				         for(Map<String, Object> row : data){
				        	 DischargeAllPatientsDto objDTO= new DischargeAllPatientsDto();
					        	
				        	 objDTO.setPatientId((Integer)row.get("patient_id"));
				        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
				        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));
				        	 objDTO.setDischargeDate((String)row.get("discharge_date"));
				        	 objDTO.setDischargeTime((String)row.get("discharge_time"));
				        	 objDTO.setBillId((Integer)row.get("bill_id"));
				        	 objDTO.setPatientName((String)row.get("patient_name"));
				        	 objDTO.setMobile((String)row.get("mobile"));
				        	 objDTO.setCategory_name((String)row.get("category_name"));
				        	 objDTO.setDoctorId((String)row.get("doctor_id"));
				        	 objDTO.setCaseType((Integer)row.get("case_type"));
				        	 objDTO.setBedHall((String)row.get("BedHall"));
				        	 objDTO.setDischargeType((String)row.get("discharge_type"));
				        	 objDTO.setAddmitDays((Integer)row.get("addmit_days"));
				        	 objDTO.setChargesMasterSlaveId((Integer)row.get("charges_master_slave_id"));
				        	 objDTO.setRefDocId((BigInteger)row.get("ref_doc_id"));
				        	 objDTO.setRefDocName((String)row.get("ref_doc_name"));
				        	 objDTO.setHallTypeName((String)row.get("hall_type_name"));
				        	 
				        	 String dcId=(String)row.get("doctor_id");
				        	 
					        	//code to fetch docName						             	         
					                Query qGrName = sessionFactory
					                        .getCurrentSession()
					                        .createSQLQuery(
					                                "SELECT ifnull(GROUP_CONCAT(doc_name SEPARATOR ','),'-') as docName FROM doctor WHERE Doctor_ID IN ('"+dcId+"')");

					                String docNameStrrr = (String) qGrName.uniqueResult();
					                objDTO.setDocNameStr(docNameStrrr);
					                ltDischargeRecord.add(objDTO);
					                objDTO=null;				         }
					
				}

			}
					
				
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltDischargeRecord;
	}


	@Override
	public List<EhatIpdBillFinalEstimateDto> getIpdbillingEstimateReport(
			String typeOf, String startDate, String endDate, String letter) {
		
		List<EhatIpdBillFinalEstimateDto> ltEstimateRecord = new ArrayList<EhatIpdBillFinalEstimateDto>();

		try {
			Session session = sessionFactory.getCurrentSession();
				
				if (startDate.equalsIgnoreCase("0") && endDate.equalsIgnoreCase("0")) {//get all records without from date to date
				
					
					 String sql = "select * from ehat_ipd_bill_final_estimate where patient_name LIKE :letter";
			         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
						query.setParameter("letter", "%"+letter+"%");
			         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			         List<Map<String, Object>> data = query.list();
			       
			         for(Map<String, Object> row : data){
			        	 
			        	 EhatIpdBillFinalEstimateDto objDTO= new EhatIpdBillFinalEstimateDto();
			        	 objDTO.setBillId((Integer)row.get("bill_id"));
			        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
			        	 objDTO.setEstimateNo((BigInteger)row.get("estimate_no"));
			        	 objDTO.setPatientId((Integer)row.get("patient_id"));				        	
			        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
			        	 objDTO.setPatientName((String)row.get("patient_name"));
			        	 objDTO.setCreatedDateTime((java.sql.Date)row.get("createdDateTime"));				        	
			        	 objDTO.setDischargeDate((String)row.get("discharge_date"));
			        	 objDTO.setDischargeTime((String)row.get("discharge_time"));
			        	 objDTO.setQuotationAmount((Double)row.get("quotation_amount"));
			        	 objDTO.setBillAmount((Double)row.get("amount"));
			        	 objDTO.setDiffInPer((Double)row.get("diff_in_per"));				        	
			        	 ltEstimateRecord.add(objDTO);
			        	 objDTO=null;
			         }
					

				} else {

						 String sql = "select * from ehat_ipd_bill_final_estimate where date(created_date_time) between :startDate and :endDate and patient_name LIKE :letter";
				         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				         query.setParameter("startDate", startDate);
							query.setParameter("endDate", endDate);
							query.setParameter("letter", "%"+letter+"%");
				         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				         List<Map<String, Object>> data = query.list();
				       
				         for(Map<String, Object> row : data){
				        	 
				        	 EhatIpdBillFinalEstimateDto objDTO= new EhatIpdBillFinalEstimateDto();
				        	 objDTO.setBillId((Integer)row.get("bill_id"));
				        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
				        	 objDTO.setEstimateNo((BigInteger)row.get("estimate_no"));
				        	 objDTO.setPatientId((Integer)row.get("patient_id"));				        	
				        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
				        	 objDTO.setPatientName((String)row.get("patient_name"));
				        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));				        	
				        	 objDTO.setDischargeDate((String)row.get("discharge_date"));
				        	 objDTO.setDischargeTime((String)row.get("discharge_time"));
				        	 objDTO.setQuotationAmount((Double)row.get("quotation_amount"));
				        	 objDTO.setBillAmount((Double)row.get("amount"));
				        	 objDTO.setDiffInPer((Double)row.get("diff_in_per"));				        	
				        	 ltEstimateRecord.add(objDTO);
				        	 objDTO=null;
				         }
						
						
					}
					
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltEstimateRecord;
	}


	@Override
	public List<SponsorSummaryDetailsDto> getSponsorSummaryDetails(
			Integer unitId, Integer userId1, Integer chargesId,
			Integer chargesSlaveId, String typeOf, String startDate,
			String endDate, String letter) {
		
		List<SponsorSummaryDetailsDto> ltSponsorSummaryDetailsDto = new ArrayList<SponsorSummaryDetailsDto>();

		try {
			Session session = sessionFactory.getCurrentSession();
			
			
			StringBuilder masterId3 = new StringBuilder();
			String alString="";
			ArrayList<Integer> al=new ArrayList<Integer>();
			if (chargesId > 0) {
				List<ChargesMasterSlave> list=getSponsorList2(chargesId,chargesSlaveId);
				for (int i = 0; i < list.size(); i++) {
					
					al.add(list.get(i).getSlaveId());	
					masterId3.append(list.get(i).getSlaveId());
		 			masterId3.append(",");
				}
			}	
			if (masterId3 != null && masterId3.length() > 0) {
				alString = masterId3.substring(0, masterId3.length() - 1);
	 		}	
			//System.err.println("allllis===-=-"+al.size());
			//System.err.println("alString===-=-"+alString);
			
			
			
			 if (typeOf.equalsIgnoreCase("allId")) {//get all records without from date to date
					
					
					String sql = "select * from ehat_sponsor_summary_view where patient_name LIKE :letter";
			         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			         query.setParameter("letter", "%"+letter+"%");
			         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			         List<Map<String, Object>> data = query.list();
			       
			         for(Map<String, Object> row : data){
			        	 SponsorSummaryDetailsDto objDTO= new SponsorSummaryDetailsDto();
				        	
			        	 objDTO.setPatientId((Integer)row.get("patient_id"));
			        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
			        	 objDTO.setDepartmentId((Integer)row.get("department_id"));
			        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
			        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));
			        	 //objDTO.setDischargeDate((String)row.get("discharge_date"));
			        	 //objDTO.setDischargeTime((String)row.get("discharge_time"));
			        	 objDTO.setBillId((Integer)row.get("bill_id"));
			        	 objDTO.setPatientName((String)row.get("patient_name"));
			        	 objDTO.setMobile((String)row.get("mobile"));
			        	 objDTO.setCategory_name((String)row.get("category_name"));
			        	 objDTO.setDoctorId((String)row.get("doctor_id"));
			        	 objDTO.setNeisNO("-");
			        	 int deptId=(Integer)row.get("department_id");
			        	 int tId=(Integer)row.get("treatment_id");
			        	 int pId=(Integer)row.get("patient_id");
			        	
			        	 if(deptId == 2){
			        		 
			        		 objDTO.setAmount((Double)row.get("ipd_amount"));	
			        		 
			        		 Query qGrName11 = sessionFactory.getCurrentSession()
				                        .createSQLQuery("SELECT ifnull(sum(ipd_tot_amount),0) as ipd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id="+deptId+" ");

				                Double totAmt = (Double) qGrName11.uniqueResult();
				                
				                Query qGrName111 = sessionFactory.getCurrentSession()
				                        .createSQLQuery("SELECT ifnull(sum(opd_tot_amount),0) as opd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id=1 ");

				                Double totAmt1 = (Double) qGrName111.uniqueResult();
				                Double calAmt=totAmt+totAmt1;
				                objDTO.setTotAmount(calAmt);
			        		 
			        		 Query qGrName1 = sessionFactory.getCurrentSession()
				                        .createSQLQuery("SELECT discharge_date as discharge_date FROM discharge_summery WHERE Treatment_ID = "+tId+" ");

				                String discharge_date = (String) qGrName1.uniqueResult();
				                objDTO.setDischargeDate(discharge_date);
				                //ltSponsorSummaryDetailsDto.add(objDTO);
				                //objDTO=null;
				                
				                
			        	 }else if(deptId == 1){
			        		 
			        		 
			        		 objDTO.setAmount((Double)row.get("opd_amount"));	
			        		 
			        		 Query qGrName11 = sessionFactory.getCurrentSession()
				                        .createSQLQuery("SELECT ifnull(sum(opd_tot_amount),0) as opd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id="+deptId+" ");

				                Double totAmt = (Double) qGrName11.uniqueResult();
				                
				                
				                Query qGrName111 = sessionFactory.getCurrentSession()
				                        .createSQLQuery("SELECT ifnull(sum(ipd_tot_amount),0) as ipd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id=2 ");

				                Double totAmt1 = (Double) qGrName111.uniqueResult();
				                Double calAmt=totAmt+totAmt1;
				                objDTO.setTotAmount(calAmt);
			        		 
			        		 
			        		 String discharge_date = "-";
				                objDTO.setDischargeDate(discharge_date);
				                //ltSponsorSummaryDetailsDto.add(objDTO);
				               // objDTO=null;
			        	 }
			        	 
			        	 
			        	 Integer digno_id=((Number)row.get("digno_id")).intValue();
			        	 if(deptId == 3){
			        		 
			        		 
			        		 
				        	//code to fetch DignoName						             	         
				                Query qGrName2 = sessionFactory
				                        .getCurrentSession()
				                        .createSQLQuery(
				                                "SELECT ifnull(GROUP_CONCAT(diagnosis SEPARATOR ','),'-') as dignosis FROM patient_daignosis_slave WHERE patient_daignosis_masterId ="+digno_id+" and diagnosis_Type='Confirmed' ");

				                String digName = (String) qGrName2.uniqueResult();
				                System.err.println("result--------------"+digName);
				                if(digName.equalsIgnoreCase(null)){
				                	digName="-";
				                }
				               
				                objDTO.setAmount((Double)row.get("opd_amount"));	
				        		 
				        		 Query qGrName11 = sessionFactory.getCurrentSession()
					                        .createSQLQuery("SELECT ifnull(sum(opd_tot_amount),0) as opd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id="+deptId+" ");

					                Double totAmt = (Double) qGrName11.uniqueResult();
					                
					                
					                Query qGrName111 = sessionFactory.getCurrentSession()
					                        .createSQLQuery("SELECT ifnull(sum(ipd_tot_amount),0) as ipd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id=2 ");

					                Double totAmt1 = (Double) qGrName111.uniqueResult();
					                Double calAmt=totAmt+totAmt1;
					                objDTO.setTotAmount(calAmt);
					                String discharge_date = "-";
					                objDTO.setDischargeDate(discharge_date);
					                
				                objDTO.setDignoName(digName);
				                
				                objDTO.setDignoName(digName);
			        	 }else{
			        		  String digName = "-";
				                
				                objDTO.setDignoName(digName);
				              
			        	 }
			        	 ltSponsorSummaryDetailsDto.add(objDTO);
			        	 
			        	 
			        	/* String dcId=(String)row.get("doctor_id");
			        	 
				        	//code to fetch docName						             	         
				                Query qGrName = sessionFactory
				                        .getCurrentSession()
				                        .createSQLQuery(
				                                "SELECT ifnull(GROUP_CONCAT(doc_name SEPARATOR ','),'-') as docName FROM doctor WHERE Doctor_ID IN ('"+dcId+"')");

				                String docNameStrrr = (String) qGrName.uniqueResult();
				                objDTO.setDocNameStr(docNameStrrr);
				                ltSponsorSummaryDetailsDto.add(objDTO);
				                objDTO=null;*/
			         }
					

				}else{
				
				if (startDate.equalsIgnoreCase("0") && endDate.equalsIgnoreCase("0")) {//get all records without from date to date
					
					
					String sql = "select * from ehat_sponsor_summary_view where patient_name LIKE :letter";
			         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			         query.setParameter("letter", "%"+letter+"%");
			         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			         List<Map<String, Object>> data = query.list();
			       
			         for(Map<String, Object> row : data){
			        	 SponsorSummaryDetailsDto objDTO= new SponsorSummaryDetailsDto();
				        	
			        	 objDTO.setPatientId((Integer)row.get("patient_id"));
			        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
			        	 objDTO.setDepartmentId((Integer)row.get("department_id"));
			        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
			        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));
			        	 //objDTO.setDischargeDate((String)row.get("discharge_date"));
			        	 //objDTO.setDischargeTime((String)row.get("discharge_time"));
			        	 objDTO.setBillId((Integer)row.get("bill_id"));
			        	 objDTO.setPatientName((String)row.get("patient_name"));
			        	 objDTO.setMobile((String)row.get("mobile"));
			        	 objDTO.setCategory_name((String)row.get("category_name"));
			        	 objDTO.setDoctorId((String)row.get("doctor_id"));
			        	 objDTO.setNeisNO("-");
			        	 int deptId=(Integer)row.get("department_id");
			        	 int tId=(Integer)row.get("treatment_id");
			        	 int pId=(Integer)row.get("patient_id");
			        	
			        	 if(deptId == 2){
			        		 
			        		 objDTO.setAmount((Double)row.get("ipd_amount"));	
			        		 
			        		 Query qGrName11 = sessionFactory.getCurrentSession()
				                        .createSQLQuery("SELECT ifnull(sum(ipd_tot_amount),0) as ipd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id="+deptId+" ");

				                Double totAmt = (Double) qGrName11.uniqueResult();
				                
				                Query qGrName111 = sessionFactory.getCurrentSession()
				                        .createSQLQuery("SELECT ifnull(sum(opd_tot_amount),0) as opd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id=1 ");

				                Double totAmt1 = (Double) qGrName111.uniqueResult();
				                Double calAmt=totAmt+totAmt1;
				                objDTO.setTotAmount(calAmt);
			        		 
			        		 Query qGrName1 = sessionFactory.getCurrentSession()
				                        .createSQLQuery("SELECT discharge_date as discharge_date FROM discharge_summery WHERE Treatment_ID = "+tId+" ");

				                String discharge_date = (String) qGrName1.uniqueResult();
				                objDTO.setDischargeDate(discharge_date);
				                //ltSponsorSummaryDetailsDto.add(objDTO);
				                //objDTO=null;
				                
				                
			        	 }else if(deptId == 1){
			        		 
			        		 
			        		 objDTO.setAmount((Double)row.get("opd_amount"));	
			        		 
			        		 Query qGrName11 = sessionFactory.getCurrentSession()
				                        .createSQLQuery("SELECT ifnull(sum(opd_tot_amount),0) as opd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id="+deptId+" ");

				                Double totAmt = (Double) qGrName11.uniqueResult();
				                
				                
				                Query qGrName111 = sessionFactory.getCurrentSession()
				                        .createSQLQuery("SELECT ifnull(sum(ipd_tot_amount),0) as ipd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id=2 ");

				                Double totAmt1 = (Double) qGrName111.uniqueResult();
				                Double calAmt=totAmt+totAmt1;
				                objDTO.setTotAmount(calAmt);
			        		 
			        		 
			        		 String discharge_date = "-";
				                objDTO.setDischargeDate(discharge_date);
				                //ltSponsorSummaryDetailsDto.add(objDTO);
				               // objDTO=null;
			        	 }
			        	 
			        	 
			        	 Integer digno_id=((Number)row.get("digno_id")).intValue();
			        	 if(deptId == 3){
			        		 
			        		 
			        		 
				        	//code to fetch DignoName						             	         
				                Query qGrName2 = sessionFactory
				                        .getCurrentSession()
				                        .createSQLQuery(
				                                "SELECT ifnull(GROUP_CONCAT(diagnosis SEPARATOR ','),'-') as dignosis FROM patient_daignosis_slave WHERE patient_daignosis_masterId ="+digno_id+" and diagnosis_Type='Confirmed' ");

				                String digName = (String) qGrName2.uniqueResult();
				                System.err.println("result--------------"+digName);
				                if(digName.equalsIgnoreCase(null)){
				                	digName="-";
				                }
				               
				                objDTO.setAmount((Double)row.get("opd_amount"));	
				        		 
				        		 Query qGrName11 = sessionFactory.getCurrentSession()
					                        .createSQLQuery("SELECT ifnull(sum(opd_tot_amount),0) as opd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id="+deptId+" ");

					                Double totAmt = (Double) qGrName11.uniqueResult();
					                
					                
					                Query qGrName111 = sessionFactory.getCurrentSession()
					                        .createSQLQuery("SELECT ifnull(sum(ipd_tot_amount),0) as ipd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id=2 ");

					                Double totAmt1 = (Double) qGrName111.uniqueResult();
					                Double calAmt=totAmt+totAmt1;
					                objDTO.setTotAmount(calAmt);
					                String discharge_date = "-";
					                objDTO.setDischargeDate(discharge_date);
					                
				                objDTO.setDignoName(digName);
			        	 }else{
			        		  String digName = "-";
				                
				                objDTO.setDignoName(digName);
				              
			        	 }
			        	 ltSponsorSummaryDetailsDto.add(objDTO);
			        	 
			        	 
			        	/* String dcId=(String)row.get("doctor_id");
			        	 
				        	//code to fetch docName						             	         
				                Query qGrName = sessionFactory
				                        .getCurrentSession()
				                        .createSQLQuery(
				                                "SELECT ifnull(GROUP_CONCAT(doc_name SEPARATOR ','),'-') as docName FROM doctor WHERE Doctor_ID IN ('"+dcId+"')");

				                String docNameStrrr = (String) qGrName.uniqueResult();
				                objDTO.setDocNameStr(docNameStrrr);
				                ltSponsorSummaryDetailsDto.add(objDTO);
				                objDTO=null;*/
			         }
					

				} else {
					//if(al.size()>0){
						if(chargesSlaveId > 0){
						//String sql = "select * from ehat_sponsor_summary_view where date(created_date_time) between :startDate and :endDate and source_type_id =:source_type_id and charges_master_slave_id in('"+alString+"') and patient_name LIKE :letter";
							String sql = "select * from ehat_sponsor_summary_view where date(created_date_time) between :startDate and :endDate and source_type_id =:source_type_id and charges_master_slave_id = "+chargesSlaveId+" and patient_name LIKE :letter";	
				         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				         query.setParameter("source_type_id", 1);
							query.setParameter("startDate", startDate);
							query.setParameter("endDate", endDate);
							query.setParameter("letter", "%"+letter+"%");
				         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				         List<Map<String, Object>> data = query.list();
				       
				         for(Map<String, Object> row : data){
				        	 SponsorSummaryDetailsDto objDTO= new SponsorSummaryDetailsDto();
					        	
				        	 objDTO.setPatientId((Integer)row.get("patient_id"));
				        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
				        	 objDTO.setDepartmentId((Integer)row.get("department_id"));
				        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
				        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));
				        	 //objDTO.setDischargeDate((String)row.get("discharge_date"));
				        	 //objDTO.setDischargeTime((String)row.get("discharge_time"));
				        	 objDTO.setBillId((Integer)row.get("bill_id"));
				        	 objDTO.setPatientName((String)row.get("patient_name"));
				        	 objDTO.setMobile((String)row.get("mobile"));
				        	 objDTO.setCategory_name((String)row.get("category_name"));
				        	 objDTO.setDoctorId((String)row.get("doctor_id"));
				        	 objDTO.setNeisNO("-");
				        	 int deptId=(Integer)row.get("department_id");
				        	 int tId=(Integer)row.get("treatment_id");
				        	 int pId=(Integer)row.get("patient_id");
				        	
				        	 if(deptId == 2){
				        		 
				        		 objDTO.setAmount((Double)row.get("ipd_amount"));	
				        		 
				        		 Query qGrName11 = sessionFactory.getCurrentSession()
					                        .createSQLQuery("SELECT ifnull(sum(ipd_tot_amount),0) as ipd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id="+deptId+" ");

					                Double totAmt = (Double) qGrName11.uniqueResult();
					                
					                Query qGrName111 = sessionFactory.getCurrentSession()
					                        .createSQLQuery("SELECT ifnull(sum(opd_tot_amount),0) as opd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id=1 ");

					                Double totAmt1 = (Double) qGrName111.uniqueResult();
					                Double calAmt=totAmt+totAmt1;
					                objDTO.setTotAmount(calAmt);
				        		 
				        		 Query qGrName1 = sessionFactory.getCurrentSession()
					                        .createSQLQuery("SELECT discharge_date as discharge_date FROM discharge_summery WHERE Treatment_ID = "+tId+" ");

					                String discharge_date = (String) qGrName1.uniqueResult();
					                objDTO.setDischargeDate(discharge_date);
					               // ltSponsorSummaryDetailsDto.add(objDTO);
					                //objDTO=null;
					                
					                
				        	 }else if(deptId == 1){
				        		 
				        		 
				        		 objDTO.setAmount((Double)row.get("opd_amount"));	
				        		 
				        		 Query qGrName11 = sessionFactory.getCurrentSession()
					                        .createSQLQuery("SELECT ifnull(sum(opd_tot_amount),0) as opd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id="+deptId+" ");

					                Double totAmt = (Double) qGrName11.uniqueResult();
					                
					                
					                Query qGrName111 = sessionFactory.getCurrentSession()
					                        .createSQLQuery("SELECT ifnull(sum(ipd_tot_amount),0) as ipd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id=2 ");

					                Double totAmt1 = (Double) qGrName111.uniqueResult();
					                Double calAmt=totAmt+totAmt1;
					                objDTO.setTotAmount(calAmt);
				        		 
				        		 
				        		 String discharge_date = "-";
					                objDTO.setDischargeDate(discharge_date);
					               // ltSponsorSummaryDetailsDto.add(objDTO);
					                //objDTO=null;
				        	 }
				        	 
				        	 
				        	 Integer digno_id=((Number)row.get("digno_id")).intValue();
				        	 if(deptId == 3){
				        		 
				        		 
				        		 
					        	//code to fetch DignoName						             	         
					                Query qGrName2 = sessionFactory
					                        .getCurrentSession()
					                        .createSQLQuery(
					                                "SELECT ifnull(GROUP_CONCAT(diagnosis SEPARATOR ','),'-') as dignosis FROM patient_daignosis_slave WHERE patient_daignosis_masterId ="+digno_id+" and diagnosis_Type='Confirmed' ");

					                String digName = (String) qGrName2.uniqueResult();
					                System.err.println("result--------------"+digName);
					                if(digName.equalsIgnoreCase(null)){
					                	digName="-";
					                }
					                
					                objDTO.setAmount((Double)row.get("opd_amount"));	
					        		 
					        		 Query qGrName11 = sessionFactory.getCurrentSession()
						                        .createSQLQuery("SELECT ifnull(sum(opd_tot_amount),0) as opd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id="+deptId+" ");

						                Double totAmt = (Double) qGrName11.uniqueResult();
						                
						                
						                Query qGrName111 = sessionFactory.getCurrentSession()
						                        .createSQLQuery("SELECT ifnull(sum(ipd_tot_amount),0) as ipd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id=2 ");

						                Double totAmt1 = (Double) qGrName111.uniqueResult();
						                Double calAmt=totAmt+totAmt1;
						                objDTO.setTotAmount(calAmt);
						                String discharge_date = "-";
						                objDTO.setDischargeDate(discharge_date);
					               
					                objDTO.setDignoName(digName);
				        	 }else{
				        		  String digName = "-";
					                
					                objDTO.setDignoName(digName);
					              
				        	 }
				        	 ltSponsorSummaryDetailsDto.add(objDTO);
					                
					                
				        	
				        	 
				        	 /*String dcId=(String)row.get("doctor_id");
				        	 
					        	//code to fetch docName						             	         
					                Query qGrName = sessionFactory
					                        .getCurrentSession()
					                        .createSQLQuery(
					                                "SELECT ifnull(GROUP_CONCAT(doc_name SEPARATOR ','),'-') as docName FROM doctor WHERE Doctor_ID IN ('"+dcId+"')");

					                String docNameStrrr = (String) qGrName.uniqueResult();
					                objDTO.setDocNameStr(docNameStrrr);
					                ltSponsorSummaryDetailsDto.add(objDTO);
					                objDTO=null;*/
				         }
						
						
					}else{
						
						String sql = "select * from ehat_sponsor_summary_view where date(created_date_time) between :startDate and :endDate and source_type_id =:source_type_id and patient_name LIKE :letter";
				         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				         query.setParameter("source_type_id", 1);
							query.setParameter("startDate", startDate);
							query.setParameter("endDate", endDate);
							query.setParameter("letter", "%"+letter+"%");
				         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				         List<Map<String, Object>> data = query.list();
				       
				         for(Map<String, Object> row : data){
				        	 SponsorSummaryDetailsDto objDTO= new SponsorSummaryDetailsDto();
					        	
				        	 objDTO.setPatientId((Integer)row.get("patient_id"));
				        	 objDTO.setTreatmentId((Integer)row.get("treatment_id"));
				        	 objDTO.setDepartmentId((Integer)row.get("department_id"));
				        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
				        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));
				        	 //objDTO.setDischargeDate((String)row.get("discharge_date"));
				        	 //objDTO.setDischargeTime((String)row.get("discharge_time"));
				        	 objDTO.setBillId((Integer)row.get("bill_id"));
				        	 objDTO.setPatientName((String)row.get("patient_name"));
				        	 objDTO.setMobile((String)row.get("mobile"));
				        	 objDTO.setCategory_name((String)row.get("category_name"));
				        	 objDTO.setDoctorId((String)row.get("doctor_id"));
				        	 objDTO.setNeisNO("-");
				        	 int deptId=(Integer)row.get("department_id");
				        	 int tId=(Integer)row.get("treatment_id");
				        	 int pId=(Integer)row.get("patient_id");
				        	
				        	 if(deptId == 2){
				        		 
				        		 objDTO.setAmount((Double)row.get("ipd_amount"));	
				        		 
				        		 Query qGrName11 = sessionFactory.getCurrentSession()
					                        .createSQLQuery("SELECT ifnull(sum(ipd_tot_amount),0) as ipd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id="+deptId+" ");

					                Double totAmt = (Double) qGrName11.uniqueResult();
					                
					                Query qGrName111 = sessionFactory.getCurrentSession()
					                        .createSQLQuery("SELECT ifnull(sum(opd_tot_amount),0) as opd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id=1 ");

					                Double totAmt1 = (Double) qGrName111.uniqueResult();
					                Double calAmt=totAmt+totAmt1;
					                objDTO.setTotAmount(calAmt);
				        		 
				        		 Query qGrName1 = sessionFactory.getCurrentSession()
					                        .createSQLQuery("SELECT discharge_date as discharge_date FROM discharge_summery WHERE Treatment_ID = "+tId+" ");

					                String discharge_date = (String) qGrName1.uniqueResult();
					                objDTO.setDischargeDate(discharge_date);
					                //ltSponsorSummaryDetailsDto.add(objDTO);
					                //objDTO=null;
					                
					                
				        	 }else if(deptId == 1){
				        		 
				        		 
				        		 objDTO.setAmount((Double)row.get("opd_amount"));	
				        		 
				        		 Query qGrName11 = sessionFactory.getCurrentSession()
					                        .createSQLQuery("SELECT ifnull(sum(opd_tot_amount),0) as opd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id="+deptId+" ");

					                Double totAmt = (Double) qGrName11.uniqueResult();
					                
					                
					                Query qGrName111 = sessionFactory.getCurrentSession()
					                        .createSQLQuery("SELECT ifnull(sum(ipd_tot_amount),0) as ipd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id=2 ");

					                Double totAmt1 = (Double) qGrName111.uniqueResult();
					                Double calAmt=totAmt+totAmt1;
					                objDTO.setTotAmount(calAmt);
				        		 
				        		 
				        		 String discharge_date = "-";
					                objDTO.setDischargeDate(discharge_date);
					                //ltSponsorSummaryDetailsDto.add(objDTO);
					               // objDTO=null;
				        	 }
				        	 
				        	 
				        	 Integer digno_id=((Number)row.get("digno_id")).intValue();
				        	 if(deptId == 3){
				        		 
				        		 
				        		 
					        	//code to fetch DignoName						             	         
					                Query qGrName2 = sessionFactory
					                        .getCurrentSession()
					                        .createSQLQuery(
					                                "SELECT ifnull(GROUP_CONCAT(diagnosis SEPARATOR ','),'-') as dignosis FROM patient_daignosis_slave WHERE patient_daignosis_masterId ="+digno_id+" and diagnosis_Type='Confirmed' ");

					                String digName = (String) qGrName2.uniqueResult();
					                System.err.println("result--------------"+digName);
					                if(digName.equalsIgnoreCase(null)){
					                	digName="-";
					                }
					               
					                objDTO.setAmount((Double)row.get("opd_amount"));	
					        		 
					        		 Query qGrName11 = sessionFactory.getCurrentSession()
						                        .createSQLQuery("SELECT ifnull(sum(opd_tot_amount),0) as opd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id="+deptId+" ");

						                Double totAmt = (Double) qGrName11.uniqueResult();
						                
						                
						                Query qGrName111 = sessionFactory.getCurrentSession()
						                        .createSQLQuery("SELECT ifnull(sum(ipd_tot_amount),0) as ipd_tot_amount FROM ehat_sponsor_summary_view WHERE patient_id = "+pId+" and department_id=2 ");

						                Double totAmt1 = (Double) qGrName111.uniqueResult();
						                Double calAmt=totAmt+totAmt1;
						                objDTO.setTotAmount(calAmt);
						                String discharge_date = "-";
						                objDTO.setDischargeDate(discharge_date);
						                
					                objDTO.setDignoName(digName);
				        	 }else{
				        		  String digName = "-";
					                
					                objDTO.setDignoName(digName);
					              
				        	 }
				        	 ltSponsorSummaryDetailsDto.add(objDTO);
				        	/* String dcId=(String)row.get("doctor_id");
				        	 
					        	//code to fetch docName						             	         
					                Query qGrName = sessionFactory
					                        .getCurrentSession()
					                        .createSQLQuery(
					                                "SELECT ifnull(GROUP_CONCAT(doc_name SEPARATOR ','),'-') as docName FROM doctor WHERE Doctor_ID IN ('"+dcId+"')");

					                String docNameStrrr = (String) qGrName.uniqueResult();
					                objDTO.setDocNameStr(docNameStrrr);
					                ltSponsorSummaryDetailsDto.add(objDTO);
					                objDTO=null;*/
				         }
						
							
					}
				}
				}
			//}
					
				
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltSponsorSummaryDetailsDto;
	}


}
