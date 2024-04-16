package com.hms.api.controller;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.codehaus.jackson.map.ObjectMapper;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.hms.dto.Assessment;
import com.hms.dto.IPDHistoryMaster;
import com.hms.ehat.dto.BillComponentDto;
import com.hms.ehat.dto.BillingInfoDto;
import com.hms.ehat.dto.InsurerInfoDto;
import com.hms.ehat.dto.LabSampleMasterDto;
import com.hms.ehat.dto.LabTestMethodDTO;
import com.hms.ehat.dto.SponsorPatientInfoDto;
import com.hms.ehat.dto.Tests;
import com.hms.pathology.dto.LabTestNormalValuesDTO;
import com.hms.pathology.dto.PathologySampleWiseMaster;

@Repository
public class APIDaoImpl {

	@Autowired
	SessionFactory sessionFactory;
	
	
	

	/**
	 * @author Sanjay Kumar Shah
	 * @date  12-08-2017
	 * @param jsonObject
	 */
	@Transactional
	public Boolean saveMachineValues1(JSONArray jsonArray1) {
		JSONArray jsonArray = new JSONArray();
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		 String sql = "";
		 Boolean flag = false;
		try {
			for(int j=0;j<jsonArray1.size();j++){
				JSONObject jsonObject = (JSONObject) jsonArray1.get(0);
				
				Long testId = (long) 0 ;
				String result = "0";
				Long analyzerId = (Long) jsonObject.get("AnalyzerId");
				String sampleId = (String) jsonObject.get("SampleId");
				String resultDate = (String) jsonObject.get("ResultDate");
				JSONArray resultArray = (JSONArray) jsonObject.get("Results");

				try{
				     sql = "UPDATE labtestresultmaster SET analyzer_id = " + analyzerId + ", result_datetime = '" + resultDate + "', api_datetime = '" + todaysDate + "' WHERE idlabtestresultmaster = " + sampleId;
				     SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				     int rowsUpdated = sqlQuery.executeUpdate();
						flag = true ;
				   }catch(Exception e){
					    flag = false ;
				    	e.printStackTrace();
				   }
				
				for(int i = 0 ;i < resultArray.size() ; i++){
					 JSONObject object=(JSONObject) resultArray.get(i);
						 testId= (Long)object.get("TestId");
						 result= (String)object.get("Result");
					 try{
						 sql = "UPDATE labtestsresult SET testResult= '" + result + "' WHERE idTest = " + testId +" and idlabTestResultMaster = " +sampleId ;
						 SQLQuery sqlQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
						 int labtestsresultUpdated = sqlQuery1.executeUpdate();
						 flag = true ;
						}catch(Exception e){
							 flag = false ;
							 e.printStackTrace();
						 }
				 }	
			}
			 		
		} catch (Exception e) {
			flag = false ;
			
			e.printStackTrace();
		}
		return flag;
	}

	/**
	 * @author Laxman Nikam
	 * @date  14-June-2018
	 * @param jsonObject
	 */
	@Transactional
	public Boolean saveMachineValues(JSONArray jsonArray1) {
		 Calendar calendar = Calendar.getInstance();
		 SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		 String todaysDate = formatter.format(calendar.getTime());
		 String sql = "";
		 Boolean flag = false;
		 int updateStatus = 0;
		try {
			
			for(int j=0;j<jsonArray1.size();j++){
				JSONObject jsonObject = (JSONObject) jsonArray1.get(j);
				
				Long testId = (long) 0 ;
				String result = "0";
				String sampleId = (String) jsonObject.get("SampleId");
				JSONArray resultArray = (JSONArray) jsonObject.get("Results");

				for(int i = 0 ;i < resultArray.size() ; i++){
					 	JSONObject object=(JSONObject) resultArray.get(i);
						 testId= (Long)object.get("TestId");
						 result= (String)object.get("Result");
					 try{
						 
						 sql = "UPDATE ehat_lab_result SET test_result= '" + result + "'," +
						 		"updated_datetime='"+todaysDate+"'," +
						 		"is_machine_res_flag='Y' WHERE test_id = " + testId +" and lab_request_id = " +sampleId ;
						 SQLQuery sqlQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
						 updateStatus = sqlQuery1.executeUpdate();
						
					 }catch(Exception e){
							 flag = false ;
							 e.printStackTrace();
						 }
				 }	
				
				if(updateStatus>0){
					 flag = true ;
				 }else{
					 throw new Exception();
				 }
			}
			 		
		} catch (Exception e) {
			flag = false ;
			
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		}
		return flag;
	}
	
	
	
	@SuppressWarnings("unchecked")
	@Transactional
	public List<SponsorPatientInfoDto> getSponsorPatientInfo(Integer patientId, Integer treatmentId) {
		 
		 List<SponsorPatientInfoDto> ltPatientRecord = new ArrayList<SponsorPatientInfoDto>();
		 List<SponsorPatientInfoDto> mainLtPatRecord = new ArrayList<SponsorPatientInfoDto>();
		 List<Assessment> ltAssessment = new ArrayList<Assessment>();
		 List<IPDHistoryMaster> ltIPDHistoryMaster = new ArrayList<IPDHistoryMaster>();
		 SponsorPatientInfoDto sObj=new SponsorPatientInfoDto();
		 
			try {			    
				//fetch sponsor patient info.
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SponsorPatientInfoDto.class);
				criteria.add(Restrictions.eq("patientId", patientId));
				criteria.add(Restrictions.eq("treatmentId", treatmentId));
				ltPatientRecord = criteria.list();			

				if(ltPatientRecord.size()>0){
					
					//fetch patient diagnosis info.
					String sql = "select pds.* from patient_daignosis_master pdm left join patient_daignosis_slave pds ON pds.patient_daignosis_masterId = pdm.id where pdm.TreatmentId = '"+treatmentId+"'";
					SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")
					List<Map<String, Object>> listRes = sqlQuery.list();
					for(Map<String, Object> row : listRes){

						Assessment obj=new Assessment();
						obj.setDiagnosis((String)row.get("diagnosis"));
						obj.setIcd10_code((String)row.get("icd10_Code"));
						obj.setDate((String)row.get("date"));
						
						int diagnoById =  Integer.parseInt((String)row.get("diagnosed_By"));
						
						if(diagnoById > 0){
							
							sql="select concat(title,' ',f_name,' ',m_name,' ',l_name) AS user_name FROM users where status='Y' and User_ID="+diagnoById;
							SQLQuery diagnoByQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
							obj.setDiagnosed_by((String) diagnoByQuery.uniqueResult());
						}else{
							
							obj.setDiagnosed_by("-");
						}	
						
						obj.setComment((String)row.get("comment"));
						obj.setDiagno_description((String)row.get("diagno_Description"));
						obj.setDiagno_type((String)row.get("diagnosis_Type"));
						
						ltAssessment.add(obj);
					}
					
					//fetch patient history info.
					String sql1 = "select	chief_complaints as disease, chief_duration as duration_of_ailment, days_month_year_duration as duration_in from ipd_add_history_componanat ipdhc where Treatment_Id='"+treatmentId+"'";
					SQLQuery sqlQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
					sqlQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")
					List<Map<String, Object>> listRes1 = sqlQuery1.list();
					for(Map<String, Object> row : listRes1){

						IPDHistoryMaster obj=new IPDHistoryMaster();
						obj.setclinicalFinding((String)row.get("disease"));
						obj.setChief_duration((String)row.get("duration_of_ailment"));
						obj.setdays_month_year((String)row.get("duration_in"));
						ltIPDHistoryMaster.add(obj);
					}
				//Add sponsor records.
				sObj.setListSponsorPatientInfo(ltPatientRecord);
				//Add provisional Dignosis records.
				sObj.setListDignosis(ltAssessment);
				//Add Past History.
				sObj.setListPatientHistory(ltIPDHistoryMaster);
				}
				mainLtPatRecord.add(sObj);
				
		} catch (Exception e) {
			
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		}
		return mainLtPatRecord;
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 06 Jan 2019
	* @codeFor	: Get bill details 
	************/
	@SuppressWarnings("unchecked")
	@Transactional
	public List<BillingInfoDto> getBillingInfo(Integer patientId,
			Integer treatmentId) {

		List<BillingInfoDto> ltBillRecordMain = new ArrayList<BillingInfoDto>();
		List<BillingInfoDto> ltBillRecord = new ArrayList<BillingInfoDto>();
		List<BillComponentDto> ltBillDetails = new ArrayList<BillComponentDto>();
		BillingInfoDto objMasterDto = new BillingInfoDto();
		String sql="";
		
		try {

			// fetch patient billing info.
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillingInfoDto.class);
			criteria.add(Restrictions.eq("patientId", patientId));
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			ltBillRecord = criteria.list();
			
			if(ltBillRecord.size()>0){
				
				for(BillingInfoDto obj : ltBillRecord){
					
					//=============== For Sponsor Paid start ================//
					sql="select ifnull(sum(paid_amt),0) FROM ehat_bulk_settlement_slave where deleted='N' and treatment_id="+obj.getTreatmentId();
					SQLQuery spQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					double totalSpnsrpaid =(Double) spQuery.uniqueResult();
					
					sql="select ifnull(sum(concession),0) FROM ehat_bulk_settlement_slave where deleted='N' and treatment_id="+obj.getTreatmentId();
					SQLQuery conQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					double totalSpnsrCon =(Double) conQuery.uniqueResult();
					
					sql="select ifnull(sum(tds_amt),0) FROM ehat_bulk_settlement_slave where deleted='N' and treatment_id="+obj.getTreatmentId();
					SQLQuery tdsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					double totalSpnsrTds =(Double) tdsQuery.uniqueResult();
							
					totalSpnsrpaid = totalSpnsrpaid + totalSpnsrCon + totalSpnsrTds;
					obj.setTotalSponsorPaid(totalSpnsrpaid);				
					//=============== For Sponsor Paid end ================//	
					
					sql="select ifnull(hospitalName,'-') FROM hospital where idhospital=1";
					SQLQuery hpQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					obj.setAutheriseSign((String) hpQuery.uniqueResult());
					
					sql="select ifnull(charges_master_slave_id,0) FROM ehat_bill_master where treatment_id="+obj.getTreatmentId();
					SQLQuery spIdQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					int chrgSlaveId = ((BigInteger) spIdQuery.uniqueResult()).intValue();
					
					sql="select ifnull(category_name,'-') as sponsor_name from ehat_charges_master_slave where id="+chrgSlaveId;
					SQLQuery spnsrQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					obj.setSponsorName((String) spnsrQuery.uniqueResult());	
				}
				objMasterDto.setListBillingInfo(ltBillRecord);
				
				//=============== For bill component start ================//
				sql="select ifnull(department_id,0) FROM ehat_treatment where treatment_id="+treatmentId;
				SQLQuery deptQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				int deptId =((BigInteger) deptQuery.uniqueResult()).intValue();
				
				if(deptId == 2){
					
					sql="select e.created_date_time AS created_date_time,ifnull(d.doc_name, '-') AS doc_name,ifnull(sm.service_name, '-') AS service_name,"
							+"ifnull(s.category_name, '-') AS test_name,ifnull(e.other_rate, 0) AS rate,ifnull(e.quantity, 0) AS quantity,ifnull(e.other_amount, 0) AS amount,"
						    +"ifnull(e.other_concession, 0) AS concession,concat(u.title,' ',u.f_name,' ',u.m_name,' ',u.l_name) AS user_name from "
							+"(ehat_bill_details_ipd e left join doctor d ON (d.Doctor_ID = e.doctor_id) left join ehat_service_master sm ON (sm.service_id = e.service_id)"
						    +"left join ehat_subservice s ON (s.id = e.sub_service_id) left join users u ON (u.User_ID = e.created_by)) where e.cancle = 'N' and e.treatment_id = "+treatmentId;
				}else{
					
					sql="select e.created_date_time AS created_date_time,ifnull(d.doc_name, '-') AS doc_name,ifnull(sm.service_name, '-') AS service_name,"
					+"ifnull(s.category_name, '-') AS test_name,ifnull(e.other_rate, 0) AS rate,ifnull(e.quantity, 0) AS quantity,ifnull(e.other_amount, 0) AS amount,"
				    +"ifnull(e.other_concession, 0) AS concession,concat(u.title,' ',u.f_name,' ',u.m_name,' ',u.l_name) AS user_name from "
					+"(ehat_bill_details e left join doctor d ON (d.Doctor_ID = e.doctor_id) left join ehat_service_master sm ON (sm.service_id = e.service_id)"
				    +"left join ehat_subservice s ON (s.id = e.sub_service_id) left join users u ON (u.User_ID = e.created_by)) where e.cancle = 'N' and e.treatment_id = "+treatmentId;			   				
				}
				SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listBillDetailsRes = sqlQuery.list();
				for(Map<String, Object> row : listBillDetailsRes){

					BillComponentDto obj=new BillComponentDto();
					obj.setServiceName((String)row.get("service_name"));
					obj.setTestName((String)row.get("test_name"));
					obj.setDocName((String)row.get("doc_name"));
					//obj.setTestAssignDate((Date)row.get("created_date_time"));
					obj.setRate((Double)row.get("rate"));
					obj.setQuantity((Double)row.get("quantity"));
					obj.setAmount((Double)row.get("amount"));
					obj.setConcession((Double)row.get("concession"));
					ltBillDetails.add(obj);
				}
				//=============== For bill component end ================//		
				objMasterDto.setListBillingComponentInfo(ltBillDetails);
				ltBillRecordMain.add(objMasterDto);
			}

		} catch (Exception e) {
			
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		}
		return ltBillRecordMain;
	}
	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 13 feb 2019
	* @codeFor	: Get insurer details 
	************/
	@SuppressWarnings("unchecked")
	@Transactional
	public List<InsurerInfoDto> getInsurerInfo(String sponsorIds,String fromDate,String toDate) {

		List<InsurerInfoDto> ltBillRecord = new ArrayList<InsurerInfoDto>();
		List<InsurerInfoDto> ltBillRecordMain = new ArrayList<InsurerInfoDto>();
		InsurerInfoDto objView = new InsurerInfoDto();
		String sql="";
			
		try {
			sql="select * from ehat_insurer_api where policy_id in("+sponsorIds+") and date(adminssion_date) >= '"+fromDate+"' and date(adminssion_date) <= '"+toDate+"' ";
			Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listRec = recQuery.list();
			for(Map<String, Object> row : listRec){
				
				InsurerInfoDto objMaster=new InsurerInfoDto();				
				
				objMaster.setPolicyId((Integer)row.get("policy_id"));
				objMaster.setPatientId((Integer)row.get("patient_id"));
				objMaster.setTreatmentId((Integer)row.get("treatment_id"));
				objMaster.setPatientName((String)row.get("patient_name"));
				objMaster.setSponsorName((String)row.get("sponsor_name"));
				objMaster.setDischargeDate((String)row.get("discharge_date"));
				objMaster.setDischargeTime((String)row.get("discharge_time"));
				//objMaster.setHospitalId(1);		
				
				sql="select ifnull(hospitalName,'-') FROM hospital where idhospital=1";
				SQLQuery hpQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				objMaster.setHospitalName((String) hpQuery.uniqueResult());	
				
				sql="select ifnull(concat(hospitalCity,'-',hospitalZip),'-') as citypin FROM hospital where idhospital=1";
				SQLQuery hpPinQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				objMaster.setCityPin((String) hpPinQuery.uniqueResult());		
				
				ltBillRecord.add(objMaster);
			}	
			objView.setListInsurerInfo(ltBillRecord);
			ltBillRecordMain.add(objView);

		} catch (Exception e) {
			
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		}
		return ltBillRecordMain;
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 27 Aug 2019
	* @codeFor	: Get Departmentwise details 
	************/
	@Transactional
	public String getTestDetailsFromSampleId(JSONArray jsonArray) {
		System.out.println("inside call to getTestDetailsFromSampleId machine API::::");
		LabSampleMasterDto masterObj = new LabSampleMasterDto();
		List<Tests> lstTests = new ArrayList<Tests>();
		String testDetails = new String();
		String sql = "";		
		try {	
			JSONObject jsonObject = (JSONObject) jsonArray.get(0);
			JSONArray resultArray = (JSONArray) jsonObject.get("RequestOrder");
			
			for(int j=0;j<resultArray.size();j++){
				System.out.println("getTestDetailsFromSampleId resultArray.size()::::"+resultArray.size());			
				JSONObject jsonObjectSlave = (JSONObject) resultArray.get(j);
				
				String sId = (String) jsonObjectSlave.get("SampleID");
				//int sampleId = Integer.parseInt(sId);
			
				//sql = "select count(lab_request_id) from ehat_lab_request where lab_request_id ="+sampleId;
				sql = "select count(id) from pathology_sample_wise_master where bar_code ='"+sId+"' ";
				Query labCountQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);		
				int sampleCount = ((Number) labCountQuery.uniqueResult()).intValue();	
				
				if(sampleCount > 0){
					
					/*sql = " select concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,t.created_date_time AS adminssion_date,t.opdipdno AS visit_no "
							 +" from ehat_lab_request l left join ehat_patient p on(l.patient_id = p.patient_id) left join ehat_treatment t on (l.treatment_id = t.treatment_id) "
							 +"	where l.lab_request_id ="+sampleId;*/
					sql ="SELECT CONCAT(p.prefix,' ', p.f_name,' ', p.m_name,' ',p.l_name) AS patient_name,t.created_date_time AS adminssion_date,t.treatment_id AS visit_no FROM ehat_patient p JOIN ehat_treatment t ON (p.patient_id = t.patient_id) LEFT JOIN pathology_sample_wise_master ps ON (ps.treatment_id = t.treatment_id) WHERE ps.bar_code ='"+sId+"' ";
					Query mastQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					mastQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listMst = mastQuery.list();
					for(Map<String, Object> row : listMst){
							
						masterObj.setSampleID(sId);
						masterObj.setPatientName((String)row.get("patient_name"));		
						masterObj.setVisitNo((Integer)row.get("visit_no"));
						masterObj.setRegnDateTime(String.valueOf((Date)row.get("adminssion_date")));
					}					
					
					//sql = "select sub_service_id,lab_test_code from ehat_lab_request_slave WHERE lab_request_id =" +sampleId ;
					//sql = "select r.test_id as test_id,l.testName as test_name from ehat_lab_result r left join labtest l on(r.test_id=l.idTest) WHERE lab_request_id=" +sampleId ;
					sql="SELECT pss.test_id as test_id,lt.testName as testName FROM pathology_sample_wise_slave pss join pathology_lab_test lt on(pss.test_id = lt.idTest) WHERE pss.bar_code ='"+sId+"' ";
					Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec = recQuery.list();
					for(Map<String, Object> row : listRec){
							
						Tests obj = new Tests();
						//obj.setParameterID((Integer)row.get("sub_service_id"));
						//obj.setTestName((String)row.get("lab_test_code"));
						obj.setParameterID((Integer)row.get("test_id"));
						obj.setTestName((String)row.get("testName"));
						lstTests.add(obj);
					}	
					masterObj.setTests(lstTests);
					ObjectMapper mapper = new ObjectMapper();
					testDetails = mapper.writeValueAsString(masterObj);
					
				}else{
					
					testDetails = "Tests not found";
				}
			}
			 		
		} catch (Exception e) {
					
			e.printStackTrace();			
		}
		return testDetails;
	}
	
	/*************************************************************
	 * @author Ajay khandare
	 * @date  22 Feb 2021
	 * @param jsonObject
	 *************************************************************/
	@Transactional
	public Boolean saveMachineValuesnew(JSONArray jsonArray1) {
		 Calendar calendar = Calendar.getInstance();
		 SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		 String todaysDate = formatter.format(calendar.getTime());
		 String sql = "";
		 Boolean flag = false;
		 int updateStatus = 0;
		 int patientId=0;
		try {
			 // get patient age info
			 JSONObject jsonObject1 = (JSONObject) jsonArray1.get(0);
			 String treatId = (String) jsonObject1.get("SampleId");
			 SQLQuery patientage = sessionFactory.getCurrentSession().createSQLQuery(
						"select p.patient_id, p.age,p.age_months,p.age_days,p.gender from ehat_patient p,ehat_treatment t where p.Patient_ID=t.Patient_ID and t.Treatment_ID="
								+ Integer.parseInt(treatId));
			 String agetyp = "";
				int age = 0;
				int month = 0;
				int days = 0;
				String sex="";
			 patientage.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> patientagelist = patientage.list();
				for (Map<String, Object> row : patientagelist) {
					//patientId = (Integer) row.get("patient_id");
					age = (Integer) row.get("age");
					month = (Integer) row.get("age_months");
					days = (Integer) row.get("age_days");
					sex = (String) row.get("gender");
					patientId = (Integer) row.get("patient_id");
					//specialCase = (String) row.get("special_Case");
					//mobile= (String) row.get("mobile");
				}
			 
			 int ageP = 0;
				int monthP = 0;
				int daysP = 0;
				if(age > 0) {
					if (month > 0 || days > 0) {
						//ageP = age + 1;
						ageP = age;
					} else {
						ageP = age;
					}
				}

				if (ageP == 0) {
					if (month > 0) {
						//monthP = month + 1;
						monthP = month;
					} else {
						monthP = month;
					}
				}

				if (ageP == 0 && monthP == 0) {
					if (days > 0) {
						//daysP = days + 1;
						daysP = days;
					} else {
						daysP = days;
					}
				}
				int patientAge=0;
				int patientAgeType=0;
				
				if(ageP > 0){
					 patientAge=ageP;// year in age
					 patientAgeType=1;//year in age
					}else if(ageP ==0 && monthP > 0 ){
						 patientAge=monthP;// year in month
						 patientAgeType=2;
					}else if(ageP ==0 && monthP == 0 &&  daysP > 0 ){
						 patientAge=daysP;// year in Days
						 patientAgeType=3;
					}				
				
			 // end patient age info
			 			
			for(int j=0;j<jsonArray1.size();j++){
				
				JSONObject jsonObject = (JSONObject) jsonArray1.get(j);
				
				Long testId = (long) 0;
				
				int testIdd=0;
				String apiChkFlag = "N";
				String result = "0";
				String sampleId = (String) jsonObject.get("SampleId");
				JSONArray resultArray = (JSONArray) jsonObject.get("Results");
			
				List<Tests> lstTests = new ArrayList<Tests>();
				//sql="SELECT pss.api_check as api_check, pss.test_id as test_id,lt.testName as testName FROM pathology_sample_wise_slave pss join pathology_lab_test lt on(pss.test_id = lt.idTest) WHERE pss.bar_code ='"+sampleId+"' ";
				sql="SELECT pss.api_check as api_check, pss.test_id as test_id,lt.testName as testName FROM pathology_sample_wise_slave pss join pathology_lab_test lt on(pss.test_id = lt.idTest) WHERE pss.treatment_id ='"+sampleId+"' ";
				Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec = recQuery.list();
				for(Map<String, Object> row : listRec){
						
					Tests obj = new Tests();
					//obj.setParameterID((Integer)row.get("sub_service_id"));
					//obj.setTestName((String)row.get("lab_test_code"));
					obj.setParameterID((Integer)row.get("test_id"));
					obj.setTestName((String)row.get("testName"));
					obj.setApiCheck((String)row.get("api_check"));
					
					lstTests.add(obj);
					
				}
				for(int i = 0 ;i < resultArray.size() ; i++){
					 	JSONObject object=(JSONObject) resultArray.get(i);
						 testId= (Long)object.get("TestId");
						 testIdd=testId.intValue();
						 result= (String)object.get("Result");
						 
						 byte[] utf8Bytes = result.getBytes("UTF-8");
						 String finalResult = new String(utf8Bytes, "UTF-8");
						
					for (int k = 0; k < lstTests.size(); k++) {
						
						/*if(lstTests.get(k).getApiCheck().equals("N"))
						{
							System.out.println("This is N from DB");
						}*/
						
						// Code committed by ROHIT on 11 May 2022 for Ticket ID 545
						if (testIdd == lstTests.get(k).getParameterID() ) {
							if (testIdd == lstTests.get(k).getParameterID()) {
									
								 try{
									 
									  // added for get normal values
									// PathologySampleWiseMaster labNObj =getLabNormalValuesForPrint(sex, patientAgeType, patientAge, testIdd);
									 
									 PathologySampleWiseMaster labNObj= getLabNormalValuesForPrintInDays(sex, patientAgeType, patientId, testIdd);
									 
									 double lowValue = Double.parseDouble(labNObj.getLowvalue());
									                 
									 double   highValue=  Double.parseDouble(labNObj.getHighvalue());
									 
									 double resultFinal= Double.parseDouble(finalResult); 
									      
									 
									  String testFlag="N";
									    if(resultFinal < lowValue) {
									    	testFlag="L";
									    }else if(resultFinal >= lowValue && resultFinal <=highValue ) {
									    	testFlag="N";
									    }else if(resultFinal > highValue) {
									    	testFlag="H";
									    }
									 // end for normal values
									 
									// sql = "UPDATE pathology_sample_wise_slave SET test_result= '" + finalResult + "'," +"updated_date_time='"+todaysDate+"', api_check = 'Y' WHERE test_id = "+testIdd+" and bar_code ='"+sampleId+"'" ;
									 sql = "UPDATE pathology_sample_wise_slave SET test_result= '" + finalResult + "'," +"updated_date_time='"+todaysDate+"', api_check = 'Y',flag_mark='"+testFlag+"' WHERE test_id = "+testIdd+" and treatment_id ='"+sampleId+"'" ;
									 SQLQuery sqlQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
									 updateStatus = sqlQuery1.executeUpdate();
									
								 }catch(Exception e){
										 flag = false ;
										 e.printStackTrace();
									 }
	
							} else {
									
							}
						}
							
					 }	
				}
				
				if(updateStatus>0){
					 flag = true ;
				 }else{
					 throw new Exception();
				 }
			}
			 		
		} catch (Exception e) {
			flag = false ;
			
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		}
		return flag;
	}
	
	
	public PathologySampleWiseMaster getLabNormalValuesForPrint(String sex, int agetType, int ageP, int testId) {
		PathologySampleWiseMaster testObj = new PathologySampleWiseMaster();
		try {
		   String sql="select pnv.age_in as ageIn,pnv.sexType as sex,pnv.lab_fage as fromAge,pnv.lab_toage as toAge,pnv.lowerVal as lowerValue,pnv.upperVal as upperValue,pnv.expression as expression,pnv.interpretationwith_normal as interpretationWithNormal,\n" + 
		   		"pnv. biologicalReferenceWith_normal as biologicalReferenceWithNormal,pnv.testMethodwith_normal as testMethodIdWithNormal,pnv.default_value as defaultValue, pnv.idunitType as idUnitType  from pathology_labtestnormalvalue pnv where matser_id="+testId+" ";
		   
		   Query querySp = sessionFactory.getCurrentSession().createSQLQuery(sql);
						querySp.setResultTransformer(new AliasToBeanResultTransformer(LabTestNormalValuesDTO.class));
						@SuppressWarnings("unchecked")
						 List<LabTestNormalValuesDTO> lstTestComponent = querySp.list();	
		
                      
					
						int bothCount=0;
						for (LabTestNormalValuesDTO labNObj : lstTestComponent) {

							LabTestMethodDTO lnMobj = new LabTestMethodDTO();
						//	LabUnitTypeDTO lnuObj = labNObj.getLabUnit();
						String unitName="";
						
						String sqlUnitName ="select unitName from pathology_labunittype where id ="+ labNObj.getIdUnitType();
						
					//	System.out.println("....sqlUnitName.............."+sqlUnitName);
						Query q = sessionFactory.getCurrentSession().createSQLQuery(sqlUnitName);
						
						unitName = (String) q.uniqueResult();
						 
							
							if (labNObj.getTestMethodIdWithNormal() > 0) {
								lnMobj = (LabTestMethodDTO) sessionFactory.getCurrentSession()
										.get(LabTestMethodDTO.class, labNObj.getTestMethodIdWithNormal());
							}

							// for male Data
							if (sex.equalsIgnoreCase("Male")) {
								// Fetch Year Wise Data
								if (agetType == 1) {
									
									if (labNObj.getSex().equalsIgnoreCase("1")
											&& labNObj.getAgeIn().equalsIgnoreCase("1")) {
										double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										double ageTOLab = (labNObj.getToAge()).doubleValue();

										if (ageB >= ageFLab && ageB <= ageTOLab) {
											bothCount++;
											
											testObj.setMethodename(lnMobj.getMethodName());
											testObj.setDefaultvalue(labNObj.getDefaultValue());
											testObj.setLowvalue(labNObj.getLowerValue());
											testObj.setHighvalue(labNObj.getUpperValue());
											testObj.setExpression(labNObj.getExpression());
											testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
											testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										//	testObj.setUnitname(lnuObj.getUnitName());

											testObj.setUnitname(unitName);

										}

									}
									// Fetch Data Month Wise
								} else if (agetType ==2) {

									if (labNObj.getSex().equalsIgnoreCase("1")
											&& labNObj.getAgeIn().equalsIgnoreCase("2")) {
										double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										double ageTOLab = (labNObj.getToAge()).doubleValue();

										if (ageB >= ageFLab && ageB <= ageTOLab) {
											bothCount++;
											testObj.setMethodename(lnMobj.getMethodName());
										testObj.setDefaultvalue(labNObj.getDefaultValue());
										testObj.setLowvalue(labNObj.getLowerValue());
										testObj.setHighvalue(labNObj.getUpperValue());
										testObj.setExpression(labNObj.getExpression());
										testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
										testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										testObj.setUnitname(unitName);
										}
										
										
									}
									// fetch Data Day wise
								} else if ( agetType == 3) {

									if (labNObj.getSex().equalsIgnoreCase("1")
											&& labNObj.getAgeIn().equalsIgnoreCase("3")) {
										double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										double ageTOLab = (labNObj.getToAge()).doubleValue();

										if (ageB >= ageFLab && ageB <= ageTOLab) {
											bothCount++;
											testObj.setMethodename(lnMobj.getMethodName());
										testObj.setDefaultvalue(labNObj.getDefaultValue());
										testObj.setLowvalue(labNObj.getLowerValue());
										testObj.setHighvalue(labNObj.getUpperValue());
										testObj.setExpression(labNObj.getExpression());
										testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
										testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										testObj.setUnitname(unitName);
										}
										//testObj.setUnitname(lnuObj.getUnitName());
										
									}
									// fetch Data Day wise
								}

								// For Female Data
							} else if (sex.equalsIgnoreCase("Female")) {
								// Fetch Year Wise Data
								if (agetType == 1) {
									
									if (labNObj.getSex().equalsIgnoreCase("2")
											&& labNObj.getAgeIn().equalsIgnoreCase("1")) {
										double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										double ageTOLab = (labNObj.getToAge()).doubleValue();

										if (ageB >= ageFLab && ageB <= ageTOLab) {
											bothCount++;
											
											testObj.setMethodename(lnMobj.getMethodName());
											testObj.setDefaultvalue(labNObj.getDefaultValue());
											testObj.setLowvalue(labNObj.getLowerValue());
											testObj.setHighvalue(labNObj.getUpperValue());
											testObj.setExpression(labNObj.getExpression());
											testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
											testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
											//testObj.setUnitname(lnuObj.getUnitName());

											testObj.setUnitname(unitName);

										}

									}
									// Fetch Data Month Wise
								} else if (agetType ==2) {

									if (labNObj.getSex().equalsIgnoreCase("2")
											&& labNObj.getAgeIn().equalsIgnoreCase("2")) {
										double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										double ageTOLab = (labNObj.getToAge()).doubleValue();

										if (ageB >= ageFLab && ageB <= ageTOLab) {
											bothCount++;
											testObj.setMethodename(lnMobj.getMethodName());
										testObj.setDefaultvalue(labNObj.getDefaultValue());
										testObj.setLowvalue(labNObj.getLowerValue());
										testObj.setHighvalue(labNObj.getUpperValue());
										testObj.setExpression(labNObj.getExpression());
										testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
										testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										testObj.setUnitname(unitName);
										}
										//testObj.setUnitname(lnuObj.getUnitName());
										
										
									}
									// fetch Data Day wise
								} else if ( agetType == 3) {

									if (labNObj.getSex().equalsIgnoreCase("2")
											&& labNObj.getAgeIn().equalsIgnoreCase("3")) {
										double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										double ageTOLab = (labNObj.getToAge()).doubleValue();

										if (ageB >= ageFLab && ageB <= ageTOLab) {
											bothCount++;
											testObj.setMethodename(lnMobj.getMethodName());
										testObj.setDefaultvalue(labNObj.getDefaultValue());
										testObj.setLowvalue(labNObj.getLowerValue());
										testObj.setHighvalue(labNObj.getUpperValue());
										testObj.setExpression(labNObj.getExpression());
										testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
										testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										//testObj.setUnitname(lnuObj.getUnitName());
										testObj.setUnitname(unitName);
										}
										
									}
									// fetch Data Day wise
								}

								// For Female Data
							}
							
							
							// for Checking In Both Start 
							    if(bothCount == 0) {
									// Fetch Year Wise Data
									if (agetType == 1) {
										
										if (labNObj.getSex().equalsIgnoreCase("4")
												&& labNObj.getAgeIn().equalsIgnoreCase("1")) {
											double ageB = BigDecimal.valueOf(ageP).doubleValue();
											double ageFLab = (labNObj.getFromAge()).doubleValue();
											double ageTOLab = (labNObj.getToAge()).doubleValue();

											if (ageB >= ageFLab && ageB <= ageTOLab) {
												bothCount++;
												
												testObj.setMethodename(lnMobj.getMethodName());
												testObj.setDefaultvalue(labNObj.getDefaultValue());
												testObj.setLowvalue(labNObj.getLowerValue());
												testObj.setHighvalue(labNObj.getUpperValue());
												testObj.setExpression(labNObj.getExpression());
												testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
												testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
												
												//testObj.setUnitname(lnuObj.getUnitName());
												testObj.setUnitname(unitName);

											}

										}
										// Fetch Data Month Wise
									} else if (agetType ==2) {

										if (labNObj.getSex().equalsIgnoreCase("4")
												&& labNObj.getAgeIn().equalsIgnoreCase("2")) {
											double ageB = BigDecimal.valueOf(ageP).doubleValue();
											double ageFLab = (labNObj.getFromAge()).doubleValue();
											double ageTOLab = (labNObj.getToAge()).doubleValue();

											if (ageB >= ageFLab && ageB <= ageTOLab) {
												bothCount++;
												testObj.setMethodename(lnMobj.getMethodName());
											testObj.setDefaultvalue(labNObj.getDefaultValue());
											testObj.setLowvalue(labNObj.getLowerValue());
											testObj.setHighvalue(labNObj.getUpperValue());
											testObj.setExpression(labNObj.getExpression());
											testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
											testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
//											testObj.setUnitname(lnuObj.getUnitName());
											testObj.setUnitname(unitName);
											}
										
										}
										// fetch Data Day wise
									} else if ( agetType == 3) {

										if (labNObj.getSex().equalsIgnoreCase("4")
												&& labNObj.getAgeIn().equalsIgnoreCase("3")) {
											double ageB = BigDecimal.valueOf(ageP).doubleValue();
											double ageFLab = (labNObj.getFromAge()).doubleValue();
											double ageTOLab = (labNObj.getToAge()).doubleValue();

											if (ageB >= ageFLab && ageB <= ageTOLab) {
												bothCount++;
												testObj.setMethodename(lnMobj.getMethodName());
											testObj.setDefaultvalue(labNObj.getDefaultValue());
											testObj.setLowvalue(labNObj.getLowerValue());
											testObj.setHighvalue(labNObj.getUpperValue());
											testObj.setExpression(labNObj.getExpression());
											testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
											testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
											//testObj.setUnitname(lnuObj.getUnitName());
											testObj.setUnitname(unitName);
											}
											
										}
										// fetch Data Day wise
									}

									// For Female Data
								}
							// ENd For Both
							
							

						
						}
						
		}catch (Exception e) {
			e.printStackTrace();
		}
				
						return testObj;
					
	}

	public PathologySampleWiseMaster getLabNormalValuesForPrintInDays(String sex, int agetType, int patientId, int testId) {
		PathologySampleWiseMaster testObj = new PathologySampleWiseMaster();
		try {
		   String sql="select pnv.age_in as ageIn,pnv.sexType as sex,pnv.lab_fage as fromAge,pnv.lab_toage as toAge,pnv.lowerVal as lowerValue,pnv.upperVal as upperValue,pnv.expression as expression,pnv.interpretationwith_normal as interpretationWithNormal,\n" + 
		   		"pnv. biologicalReferenceWith_normal as biologicalReferenceWithNormal,pnv.testMethodwith_normal as testMethodIdWithNormal,pnv.default_value as defaultValue, pnv.idunitType as idUnitType  from pathology_labtestnormalvalue pnv where matser_id="+testId+" ";
		   
		   Query querySp = sessionFactory.getCurrentSession().createSQLQuery(sql);
						querySp.setResultTransformer(new AliasToBeanResultTransformer(LabTestNormalValuesDTO.class));
						@SuppressWarnings("unchecked")
						 List<LabTestNormalValuesDTO> lstTestComponent = querySp.list();	
		                 
						// get dob
						String sqlDob=" select dob from ehat_patient where patient_id="+patientId+" ";
						String dob=(String) sessionFactory.getCurrentSession().createSQLQuery(sqlDob).uniqueResult();
						int ageB=calculateDays(dob);
						 
					
						int bothCount=0;
						for (LabTestNormalValuesDTO labNObj : lstTestComponent) {

							LabTestMethodDTO lnMobj = new LabTestMethodDTO();
						//	LabUnitTypeDTO lnuObj = labNObj.getLabUnit();
						String unitName="";
						
						String sqlUnitName ="select unitName from pathology_labunittype where id ="+ labNObj.getIdUnitType();
						
					//	System.out.println("....sqlUnitName.............."+sqlUnitName);
						Query q = sessionFactory.getCurrentSession().createSQLQuery(sqlUnitName);
						
						unitName = (String) q.uniqueResult();
						 
							
							if (labNObj.getTestMethodIdWithNormal() > 0) {
								lnMobj = (LabTestMethodDTO) sessionFactory.getCurrentSession()
										.get(LabTestMethodDTO.class, labNObj.getTestMethodIdWithNormal());
							}

							// for male Data
							if (sex.equalsIgnoreCase("Male")) {
								// Fetch Year Wise Data
								
									
									if (labNObj.getSex().equalsIgnoreCase("1")
											&& labNObj.getAgeIn().equalsIgnoreCase("1")) {
										//double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										ageFLab=ageFLab*365;
										double ageTOLab = (labNObj.getToAge()).doubleValue();
										ageTOLab=ageTOLab*365;

										if (ageB >= ageFLab && ageB <= ageTOLab) {
											bothCount++;
											
											testObj.setMethodename(lnMobj.getMethodName());
											testObj.setDefaultvalue(labNObj.getDefaultValue());
											testObj.setLowvalue(labNObj.getLowerValue());
											testObj.setHighvalue(labNObj.getUpperValue());
											testObj.setExpression(labNObj.getExpression());
											testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
											testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										//	testObj.setUnitname(lnuObj.getUnitName());

											testObj.setUnitname(unitName);

										}

									}
									// Fetch Data Month Wise
									else if (labNObj.getSex().equalsIgnoreCase("1")
												&& labNObj.getAgeIn().equalsIgnoreCase("2")) {

								
									//	double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										ageFLab=ageFLab*30;
										double ageTOLab = (labNObj.getToAge()).doubleValue();
										ageTOLab=ageTOLab*30;
										
										if (ageB >= ageFLab && ageB <= ageTOLab) {
											bothCount++;
											testObj.setMethodename(lnMobj.getMethodName());
										testObj.setDefaultvalue(labNObj.getDefaultValue());
										testObj.setLowvalue(labNObj.getLowerValue());
										testObj.setHighvalue(labNObj.getUpperValue());
										testObj.setExpression(labNObj.getExpression());
										testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
										testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										testObj.setUnitname(unitName);
										}
										
										
									
									// fetch Data Day wise
								} else if (labNObj.getSex().equalsIgnoreCase("1")
										&& labNObj.getAgeIn().equalsIgnoreCase("3")) {

										//double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										double ageTOLab = (labNObj.getToAge()).doubleValue();

										if (ageB >= ageFLab && ageB <= ageTOLab) {
											bothCount++;
											testObj.setMethodename(lnMobj.getMethodName());
										testObj.setDefaultvalue(labNObj.getDefaultValue());
										testObj.setLowvalue(labNObj.getLowerValue());
										testObj.setHighvalue(labNObj.getUpperValue());
										testObj.setExpression(labNObj.getExpression());
										testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
										testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										testObj.setUnitname(unitName);
										}
										//testObj.setUnitname(lnuObj.getUnitName());
										
									
									// fetch Data Day wise
								}

								// For Female Data
							} else if (sex.equalsIgnoreCase("Female")) {
								// Fetch Year Wise Data
								
								
								if (labNObj.getSex().equalsIgnoreCase("2")
										&& labNObj.getAgeIn().equalsIgnoreCase("1")) {
									//double ageB = BigDecimal.valueOf(ageP).doubleValue();
									double ageFLab = (labNObj.getFromAge()).doubleValue();
									ageFLab=ageFLab*365;
									double ageTOLab = (labNObj.getToAge()).doubleValue();
									ageTOLab=ageTOLab*365;

									if (ageB >= ageFLab && ageB <= ageTOLab) {
										bothCount++;
										
										testObj.setMethodename(lnMobj.getMethodName());
										testObj.setDefaultvalue(labNObj.getDefaultValue());
										testObj.setLowvalue(labNObj.getLowerValue());
										testObj.setHighvalue(labNObj.getUpperValue());
										testObj.setExpression(labNObj.getExpression());
										testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
										testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
									//	testObj.setUnitname(lnuObj.getUnitName());

										testObj.setUnitname(unitName);

									}

								}
								// Fetch Data Month Wise
								else if (labNObj.getSex().equalsIgnoreCase("2")
											&& labNObj.getAgeIn().equalsIgnoreCase("2")) {

							
								//	double ageB = BigDecimal.valueOf(ageP).doubleValue();
									double ageFLab = (labNObj.getFromAge()).doubleValue();
									ageFLab=ageFLab*30;
									double ageTOLab = (labNObj.getToAge()).doubleValue();
									ageTOLab=ageTOLab*30;
									
									if (ageB >= ageFLab && ageB <= ageTOLab) {
										bothCount++;
										testObj.setMethodename(lnMobj.getMethodName());
									testObj.setDefaultvalue(labNObj.getDefaultValue());
									testObj.setLowvalue(labNObj.getLowerValue());
									testObj.setHighvalue(labNObj.getUpperValue());
									testObj.setExpression(labNObj.getExpression());
									testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
									testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
									testObj.setUnitname(unitName);
									}
									
									
								
								// fetch Data Day wise
							} else if (labNObj.getSex().equalsIgnoreCase("2")
									&& labNObj.getAgeIn().equalsIgnoreCase("3")) {

									//double ageB = BigDecimal.valueOf(ageP).doubleValue();
									double ageFLab = (labNObj.getFromAge()).doubleValue();
									double ageTOLab = (labNObj.getToAge()).doubleValue();

									if (ageB >= ageFLab && ageB <= ageTOLab) {
										bothCount++;
										testObj.setMethodename(lnMobj.getMethodName());
									testObj.setDefaultvalue(labNObj.getDefaultValue());
									testObj.setLowvalue(labNObj.getLowerValue());
									testObj.setHighvalue(labNObj.getUpperValue());
									testObj.setExpression(labNObj.getExpression());
									testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
									testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
									testObj.setUnitname(unitName);
									}
									//testObj.setUnitname(lnuObj.getUnitName());
									
								
								// fetch Data Day wise
							}

							// For Female Data
						}
							
							
							// for Checking In Both Start 
							    if(bothCount == 0) {
								// Fetch Year Wise Data
								
									
									if (labNObj.getSex().equalsIgnoreCase("4")
											&& labNObj.getAgeIn().equalsIgnoreCase("1")) {
										//double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										ageFLab=ageFLab*365;
										double ageTOLab = (labNObj.getToAge()).doubleValue();
										ageTOLab=ageTOLab*365;

										if (ageB >= ageFLab && ageB <= ageTOLab) {
										
											testObj.setMethodename(lnMobj.getMethodName());
											testObj.setDefaultvalue(labNObj.getDefaultValue());
											testObj.setLowvalue(labNObj.getLowerValue());
											testObj.setHighvalue(labNObj.getUpperValue());
											testObj.setExpression(labNObj.getExpression());
											testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
											testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										//	testObj.setUnitname(lnuObj.getUnitName());

											testObj.setUnitname(unitName);

										}

									}
									// Fetch Data Month Wise
									else if (labNObj.getSex().equalsIgnoreCase("4")
												&& labNObj.getAgeIn().equalsIgnoreCase("2")) {

								
									//	double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										ageFLab=ageFLab*30;
										double ageTOLab = (labNObj.getToAge()).doubleValue();
										ageTOLab=ageTOLab*30;
										
										if (ageB >= ageFLab && ageB <= ageTOLab) {
										
											testObj.setMethodename(lnMobj.getMethodName());
										testObj.setDefaultvalue(labNObj.getDefaultValue());
										testObj.setLowvalue(labNObj.getLowerValue());
										testObj.setHighvalue(labNObj.getUpperValue());
										testObj.setExpression(labNObj.getExpression());
										testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
										testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										testObj.setUnitname(unitName);
										}
										
										
									
									// fetch Data Day wise
								} else if (labNObj.getSex().equalsIgnoreCase("4")
										&& labNObj.getAgeIn().equalsIgnoreCase("3")) {

										//double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										double ageTOLab = (labNObj.getToAge()).doubleValue();

										if (ageB >= ageFLab && ageB <= ageTOLab) {
											
											testObj.setMethodename(lnMobj.getMethodName());
										testObj.setDefaultvalue(labNObj.getDefaultValue());
										testObj.setLowvalue(labNObj.getLowerValue());
										testObj.setHighvalue(labNObj.getUpperValue());
										testObj.setExpression(labNObj.getExpression());
										testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
										testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										testObj.setUnitname(unitName);
										}
										//testObj.setUnitname(lnuObj.getUnitName());
										
									
									// fetch Data Day wise
								}

								// For Female Data
							}
							// ENd For Both
							
							

						
						}
						// for general test
						       String sqlType= " select ifnull(valueType,'') as valueType from pathology_lab_test where idTest="+testId+"  ";
					    String testType=(String) sessionFactory.getCurrentSession().createSQLQuery(sqlType).uniqueResult();
					       if(testType.equalsIgnoreCase("general")) {
					    	 //  String biological_reference_chkSql= " select ifnull(biological_reference_chk,'N') as biological_reference_chk from pathology_lab_test where idTest="+testId+"  ";
					    	  // String biological_reference_chk=(String) sessionfactory.getCurrentSession().createSQLQuery(biological_reference_chkSql).uniqueResult();
					    	  
					    	   String biologicalreferencewith_generalSql= " select ifnull(biologicalreferencewith_general,'') as biologicalreferencewith_general from pathology_lab_test where idTest="+testId+"  ";
					    	   String biologicalreferencewith_general=(String) sessionFactory.getCurrentSession().createSQLQuery(biologicalreferencewith_generalSql).uniqueResult();
					      
					    	   testObj.setBiologicalReferenceWithGeneral(biologicalreferencewith_general);
					       }
						         
						       // end general test
						
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		   System.out.println("testObj========"+testObj);
						
						return testObj;
					
	}

	public int calculateDays(String dobP) {
		  int ageInDays=0;
		  try {
		  int year=0;
		  int month=0;
		  int days=0;
		  if(dobP.contains("-")) {
			  String pAge[]=dobP.split("-");
			  days = Integer.parseInt(pAge[0]);
			  month = Integer.parseInt(pAge[1]);
			  year = Integer.parseInt(pAge[2]);
		  }else if(dobP.contains("/")) {
			  String pAge[]=dobP.split("/");
			  days = Integer.parseInt(pAge[0]);
			  month = Integer.parseInt(pAge[1]);
			  year = Integer.parseInt(pAge[2]);
		  }
		  
		  LocalDate dob = LocalDate.of(year, month, days);  
		//obtains the current date from the system clock  
		LocalDate curDate = LocalDate.now();  
		//calculates the difference betwween two dates  
		Period period = Period.between(dob, curDate);  
		
		
		  ageInDays=period.getYears()*365+period.getMonths()*30+period.getDays();
		  }catch (Exception e) {
			e.printStackTrace();
		}
		  return ageInDays;
	  
	  }
	
}