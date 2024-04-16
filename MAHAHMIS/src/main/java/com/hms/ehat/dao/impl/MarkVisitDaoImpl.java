package com.hms.ehat.dao.impl;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.google.gson.Gson;
import com.hms.ehat.dao.MarkVisitDao;
import com.hms.ehat.dto.AppointmentDto;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.MarkVisitDto;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.RegistrationViewDto;

@Repository
public class MarkVisitDaoImpl implements MarkVisitDao {

	@Autowired
	SessionFactory sessionFactory;
	
	
	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To get Dept lst by count 
	 **********/

	public List<RegistrationViewDto> getMarkVisitList() {

		List<RegistrationViewDto> ltRegistrationViewDto = new ArrayList<RegistrationViewDto>();

		try {
			ResourceBundle resourceBundleEhat = ResourceBundle
					.getBundle("Ehat");
			String meeshaFlow = (String) resourceBundleEhat.getString("meesha");
			String sql = "";
			if (meeshaFlow.equalsIgnoreCase("on")) {

				sql = "SELECT * FROM ehat_view_registration group by patient_id order by patient_id desc limit 100";
			} else {

				sql = "SELECT * FROM ehat_view_registration group by patient_id order by patient_id desc limit 10";
			}

			Query labTestResQuery = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);

			labTestResQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listLabTest = labTestResQuery.list();
             for (Map<String, Object> row : listLabTest) {

				RegistrationViewDto obj = new RegistrationViewDto();

				obj.setPtId((Integer) row.get("patient_id"));
				obj.setCenterPatientId((String) row.get("center_patient_id"));
				obj.setBlockUserId3((Integer) row.get("block_user_id_3"));
				obj.setBlockUserId2((Integer) row.get("block_user_id_2"));
				obj.setBlockUserId1((Integer) row.get("block_user_id_1"));
				obj.setBlockUserName3((String) row.get("block_user_name_3"));
				obj.setBlockUserName2((String) row.get("block_user_name_2"));
				obj.setBlockUserName1((String) row.get("block_user_name_1"));
				obj.setBlockNarration3((String) row.get("block_narration_3"));
				obj.setBlockNarration2((String) row.get("block_narration_2"));
				obj.setBlockNarration1((String) row.get("block_narration_1"));
				obj.setBlockFlag((String) row.get("block_flag"));
				obj.setDepartment_id((Integer) row.get("department_id"));
				obj.setUnitId((Integer) row.get("unit_id"));
				obj.setMobile((String) row.get("mobile"));
				obj.setAdharcardNo((String) row.get("adharcardNo"));
				obj.setPatientName((String) row.get("patient_name"));
				obj.setPtId((Integer) row.get("patient_id"));
				obj.setpIdd(String.valueOf((Integer) row.get("patient_id")));
				obj.settFlag((String) row.get("t_flag"));
				obj.setTtId((Integer) row.get("treatment_id"));
				obj.setSponsorchargesSlaveId((Integer) row
						.get("charges_master_slave_id"));
				obj.setCreatedDateTime((Date) row.get("created_date_time"));

				ltRegistrationViewDto.add(obj);

			}

		} catch (Exception e) {

			e.printStackTrace();

			return ltRegistrationViewDto;

		}

		return ltRegistrationViewDto;

	}
	
	
	/* @author : Ajay s. Khandare @date :02-08-2019*/
	@Override
	public List<RegistrationViewDto> getMarkVisitListpagination(
			Integer startIndex, HttpServletRequest request) {
		List<RegistrationViewDto> ltRegistrationViewDto = new ArrayList<RegistrationViewDto>();
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
		String meeshaFlow = (String)resourceBundleEhat.getString("meesha");    
		SQLQuery query = null;
	
		try {
			if(meeshaFlow.equalsIgnoreCase("on")){
			        query = sessionFactory.getCurrentSession().createSQLQuery("SELECT * FROM ehat_view_registration group by patient_id order by patient_id desc ");
			}
			else{
			         query = sessionFactory.getCurrentSession().createSQLQuery("SELECT * FROM ehat_view_registration group by patient_id order by patient_id desc ");
			}
		
			
			query.setFirstResult(startIndex);
			query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
          	@SuppressWarnings("unchecked")
			List<Map<String, Object>> listLabTest = query.list();
             for (Map<String, Object> row : listLabTest) {
				RegistrationViewDto obj = new RegistrationViewDto();
				
				obj.setPtId((Integer)row.get("patient_id"));
				obj.setBlockUserId3((Integer) row.get("block_user_id_3"));
				obj.setBlockUserId2((Integer) row.get("block_user_id_2"));
				obj.setBlockUserId1((Integer) row.get("block_user_id_1"));
				obj.setBlockUserName3((String) row.get("block_user_name_3"));
				obj.setBlockUserName2((String) row.get("block_user_name_2"));
				obj.setBlockUserName1((String) row.get("block_user_name_1"));
				obj.setBlockNarration3((String) row.get("block_narration_3"));
				obj.setBlockNarration2((String) row.get("block_narration_2"));
				obj.setBlockNarration1((String) row.get("block_narration_1"));
				obj.setBlockFlag((String) row.get("block_flag"));
				obj.setDepartment_id((Integer) row.get("department_id"));
				obj.setUnitId((Integer) row.get("unit_id"));
				obj.setMobile((String) row.get("mobile"));
				obj.setAdharcardNo((String) row.get("adharcardNo"));
				obj.setPatientName((String) row.get("patient_name"));
				obj.setPtId((Integer) row.get("patient_id"));
				obj.setpIdd(String.valueOf((Integer) row.get("patient_id")));
				obj.settFlag((String) row.get("t_flag"));
				obj.setTtId((Integer) row.get("treatment_id"));
				obj.setSponsorchargesSlaveId((Integer) row.get("charges_master_slave_id"));
				obj.setCreatedDateTime((Date) row.get("created_date_time"));
				ltRegistrationViewDto.add(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ltRegistrationViewDto;
		}
		return ltRegistrationViewDto;
	}
	
	
	
	/* @author : Ajay s. Khandare @date :02-08-2019*/
	@Override
	public String getCountClientMaster(HttpServletRequest request) {
		SQLQuery query=null;
		
		try {
			query = sessionFactory
					.getCurrentSession()
					.createSQLQuery("SELECT  count(distinct r.patient_id)FROM  ehat_view_registration r ");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		BigInteger count = (BigInteger) query.uniqueResult();
		return count.toString();
	}	


	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To get Dept lst by count
	 **********/
	public List<MarkVisitDto> getPatientDetails(int ptId) {
		MarkVisitDto ob = new MarkVisitDto();
		List<MarkVisitDto> ltMarkVisitDto = new ArrayList<MarkVisitDto>();
		try {
			/*// String s1=getUserNameByUserid(userId);
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(MarkVisitDto.class);
			// ob.setUserNmae(s1);
			criteria.add(Restrictions.eq("ptId", ptId));
			ltMarkVisitDto = criteria.list();
			// ltMarkVisitDto.add(ob);
			// ltMarkVisitDto.addAll(s1);
			//System.out.println("List "+ltMarkVisitDto);*/			
			
			String sql = "select p.patient_id AS patient_id, "
					+" p.center_patient_id AS center_patient_id, "
					+" p.f_name AS f_name, "
			        +" p.m_name AS m_name, "
			        +" p.l_name AS l_name, "
			        +" p.gender AS gender, "
			        +" p.mobile AS mobile, "
			        +" p.created_date_time AS created_date_time, "
			        +" p.country_id AS country_id, "
			        +" p.town_id AS town_id, "
			        +" p.dob AS dob, "
			        //+" p.age AS age, "
                    +" timestampdiff(year,STR_TO_DATE(p.dob, '%d/%m/%Y'),now()) AS `age`,"
			       
			        +" p.taluka_id AS taluka_id, "
			        +" p.district_id AS district_id, "
			        +" p.state_id AS state_id, "
			        +" p.area_code AS area_code, "
			        +" p.deleted AS deleted, "
			        +" p.prefix AS prefix, "
				    // +" p.age_days AS age_days, "
	                +" timestampdiff(month,STR_TO_DATE(p.dob, '%d/%m/%Y'),now())% 12 AS 'age_months', " 
	                    
				    // +" p.age_months AS age_months, "
				    // + "floor(timestampdiff(day,STR_TO_DATE(p.dob, '%d/%m/%Y'),now())%30.4375) AS age_days,"
	                +" FLOOR(TIMESTAMPDIFF(DAY, STR_TO_DATE(p.dob, '%d/%m/%Y'), NOW()) % 30.4375 + CASE WHEN DAY(NOW()) >= DAY(STR_TO_DATE(p.dob, '%d/%m/%Y')) AND DAY(STR_TO_DATE(p.dob, '%d/%m/%Y')) <= LAST_DAY(NOW()) THEN 0 ELSE (0) END) AS age_days,"
	                +" GetAgeYMD(p.dob) AS p_age, "
			       
	                +" p.transSMS AS transSMS, "
			        +" p.transEmail AS transEmail, "
			        +" p.pramoEmail AS pramoEmail, "
			        +" p.pramoSMS AS pramoSMS, "
			        +" p.external AS external, "
			        +" p.emergency AS emergency, "
			        +" p.mrnno AS mrnno, "
			        +" p.adharcardNo AS adharcardNo, "
			        +" p.updated_date_time AS updated_date_time, "
			        +" p.updated_by AS updated_by, "
			        +" p.created_by AS created_by, "
			        +" p.address AS address, "
			        +" p.image_name AS image_name, "
			        +" p.aadhar_image_name AS aadhar_image_name, "
			        +" p.passport AS passport, "
			        +" p.visa AS visa, "
			        +" t.treatment_id AS treatment_id, "
			        +" t.doctor_id AS doctor_id, "
			        +" t.department_id AS department_id, "
			        +" t.token AS token, "
			        +" t.deleted AS tdeleted, "
			        +" t.t_flag AS t_flag, "
			        +" t.unit_id AS unit_id, "
			        +" t.height AS height, "
			        +" t.ref_doc_id AS ref_doc_id, "
			        +" t.empid AS empid, "
			        +" t.weight AS weight, "
			        +" t.tpaid AS tpaid, "
			        +" t.case_type AS case_type, "
			        +" t.reqGenFormId AS reqGenFormId, "
			        +" t.referred_source AS referred_source, "
			        +" t.referred_source_docId AS referred_source_docId, "
			        +" t.referred_source_slave AS referred_source_slave, "
			        +" t.referred_by AS referred_by, "
			        +" b.patient_cat_id AS patient_cat_id, "
			        +" b.sponsor_cat_id AS sponsor_cat_id, "
			        +" b.source_type_id AS source_type_id, "
			        +" b.bill_id AS bill_id, "
			        +" b.count AS count, "
			        +" b.charges_master_slave_id AS charges_master_slave_id, "
			        +" b.invoice_count AS invoice_count, "
			        +" b.invoice_flag AS invoice_flag, "
			        +" p.relation_id AS relation_id, "
			        +" p.relative_name AS relative_name, "
			        +" p.per_address AS per_address, "
			        +" p.per_country_id AS per_country_id, "
			        +" p.per_town_id AS per_town_id, "
			        +" p.per_taluka_id AS per_taluka_id, "
			        +" p.per_district_id AS per_district_id, "
			        +" p.per_state_id AS per_state_id, "
			        +" p.per_area_code AS per_area_code, "
			        +" p.annual_income_id AS annual_income_id, "
			        +" p.blood_group_id AS blood_group_id, "
			        +" p.education AS education, "
			        +" p.email_id AS email_id, "
			        +" p.identification_number AS identification_number, "
			        +" p.identity_proof_id AS identity_proof_id, "
			        +" p.language_id AS language_id, "
			        +" p.marital_status_id AS marital_status_id, "
			        +" p.nationality_id AS nationality_id, "
			        +" p.occupation AS occupation, "
			        +" p.religion_id AS religion_id, "
			        +" p.old_patient_id AS old_patient_id, "
			        +" p.block_narration_1 AS block_narration_1, "
			        +" p.block_narration_2 AS block_narration_2, "
			        +" p.block_narration_3 AS block_narration_3, "
			        +" p.block_user_id_1 AS block_user_id_1, "
			        +" p.block_user_id_2 AS block_user_id_2, "
			        +" p.block_user_id_3 AS block_user_id_3, "
			        +" t.ref_date AS ref_date, "
			        +" t.sanction_amt AS sanction_amt, "
			        +" t.saction_ord_no AS saction_ord_no, "
			        +" t.neis_no AS neis_no, "
			        +" t.visit_no AS visit_no, "
			        +" t.ipd_or_opd AS ipd_or_opd, "
			        +" t.treat_permited AS treat_permited, "
			        +" t.dise_to_be_treat AS dise_to_be_treat, "
			        +" t.valid_upto_date AS valid_upto_date, "
			        +" t.admission_date_time AS admission_date_time, "
			        +" t.reason_of_visit AS reason_of_visit "
					+" from ((ehat_patient p join ehat_treatment t ON ((t.patient_id = p.patient_id) and p.patient_id = "+ptId+")) "
			        +" join ehat_bill_master b ON (((b.treatment_id = t.treatment_id) and t.treatment_id in (select subquery_regview.treatment_id from subquery_regview)))) "
					+" where ((p.deleted = 'N') and (t.deleted = 'N')) order by p.patient_id desc ";
			
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
		    for(Map<String, Object> row : masterRow){
		    			    	
		    	MarkVisitDto obj = new MarkVisitDto();
		    	obj.setPtId((Integer)row.get("patient_id"));
		    	obj.setCenterPatientId((String)row.get("center_patient_id"));
		    	obj.setfName((String)row.get("f_name"));
		    	obj.setmName((String)row.get("m_name"));
		    	obj.setlName((String)row.get("l_name"));
		    	obj.setGender((String)row.get("gender")); 
		    	obj.setMobile((String)row.get("mobile")); 
		    	obj.setCreatedDateTime((Date)row.get("created_date_time"));		    	
		    	obj.setCountryId((Integer)row.get("country_id"));
		    	obj.setTwnId((Integer)row.get("town_id"));
		    	obj.setDob((String)row.get("dob")); 
		    	//obj.setAge((Integer)row.get("age"));
		    	obj.setTalukaId((Integer)row.get("taluka_id"));
		    	obj.setDistrictId((Integer)row.get("district_id"));
		    	obj.setStateId((Integer)row.get("state_id"));
		    	obj.setAreaCode((Integer)row.get("area_code"));	    	
		    	obj.setDeleted((String)row.get("deleted"));	    		    	
		    	obj.setPrefix((String)row.get("prefix"));	
				/*
				 * obj.setAgeDays((Integer)row.get("age_days"));
				 * obj.setAgeMonths((Integer)row.get("age_months"));
				 */
		    	
		    	String calAge = (String) row.get("p_age");
		    	if(!calAge.equals(null))
		    	{
		    	String[] split = calAge.split("[^0-9]");
		    	String age_year = split[0];
		    	String age_months = split[1];
		    	String age_days = split[2];
		    	obj.setAgeDays(Integer.parseInt(age_days));
		    	obj.setAgeMonths(Integer.parseInt(age_months));
		    	obj.setAge(Integer.parseInt(age_year));
		    	}
		    	
		    	
		    	obj.setTransSMS((String)row.get("transSMS"));
		    	obj.setTransEmail((String)row.get("transEmail"));
		    	obj.setPramoSMS((String)row.get("pramoSMS"));
		    	obj.setPramoEmail((String)row.get("pramoEmail"));
		    	obj.setExternal((String)row.get("external"));
		    	obj.setEmergency((String)row.get("emergency"));
		    	obj.setMrnno((String)row.get("mrnno"));			    	
		    	obj.setAdharcardNo((String)row.get("adharcardNo"));
		    	obj.setUpdatedDateTime((Date)row.get("updated_date_time"));
		    	obj.setCreatedBy((Integer)row.get("created_by"));
		    	obj.setUpdatedBy((Integer)row.get("updated_by"));
		    	obj.setAddress((String)row.get("address"));
		    	obj.setImageName((String)row.get("image_name"));
		    	obj.setAadharImageName((String)row.get("aadhar_image_name"));
		    	obj.setPassport((String)row.get("passport"));
		    	obj.setVisa((String)row.get("visa"));
		    	obj.setTtId((Integer)row.get("treatment_id"));
		    	obj.setDrId((String)row.get("doctor_id"));		    	
		    	obj.setDeptId((Integer)row.get("department_id"));		    	
		    	obj.setToken((Integer)row.get("token"));
		    	obj.settFlag((String)row.get("t_flag"));
		    	obj.setUnitId(String.valueOf((Integer)row.get("unit_id")));		    	
		    	obj.setHeight((Double)row.get("height"));		    	
		    	obj.setRefdocid((Integer)row.get("ref_doc_id"));
		    	obj.setEmpid((String)row.get("empid"));
		    	obj.setWeight((Double)row.get("weight"));
		    	obj.setTpaid((String)row.get("tpaid"));
		    	obj.setCaseType((Integer)row.get("case_type"));
		    	obj.setReqGenFormId((Integer)row.get("reqGenFormId"));		    	
		    	obj.setReferredSource((Integer)row.get("referred_source"));
		    	obj.setReferredSourceDocId((Integer)row.get("referred_source_docId"));
		    	obj.setReferredSourceSlave((String)row.get("referred_source_slave"));
		    	obj.setReferredBy((String)row.get("referred_by"));
		    	obj.setPatientCatId((Integer)row.get("patient_cat_id"));
		    	obj.setSponsorCatId((Integer)row.get("sponsor_cat_id"));
		    	obj.setSourceTypeId((Integer)row.get("source_type_id"));
		    	obj.setBillId((Integer)row.get("bill_id"));
		    	obj.setCount((Integer)row.get("count"));		    	
		    	obj.setSponsorchargesSlaveId((Integer)row.get("charges_master_slave_id"));
		    	obj.setInvoiceCount((Integer)row.get("invoice_count"));
		    	obj.setInvoiceFlag((String)row.get("invoice_flag"));
		    	obj.setRelationId((Integer)row.get("relation_id"));
		    	obj.setRelativeName((String)row.get("relative_name"));
		    	obj.setPerAddress((String)row.get("per_address"));
		    	obj.setPercountryId((Integer)row.get("per_country_id"));
		    	obj.setPertownId((Integer)row.get("per_town_id"));
		    	obj.setPertalukaId((Integer)row.get("per_taluka_id"));
		    	obj.setPerdistrictId((Integer)row.get("per_district_id"));
		    	obj.setPerstateId((Integer)row.get("per_state_id"));
		    	obj.setPerareaCode((Integer)row.get("per_area_code"));			    	
		    	obj.setAnnualIncomeId((Integer)row.get("annual_income_id"));
		    	obj.setBloodGroupId((Integer)row.get("blood_group_id"));
		    	obj.setEducation((String)row.get("education"));
		    	obj.setEmailId((String)row.get("email_id"));
		    	obj.setIdentificationNumber((String)row.get("identification_number"));
		    	obj.setIdentityProofId((Integer)row.get("identity_proof_id"));
		    	obj.setLanguageId((Integer)row.get("language_id"));
		    	obj.setMaritalStatusId((Integer)row.get("marital_status_id"));
		    	obj.setNationalityId((Integer)row.get("nationality_id"));
		    	obj.setOccupation((String)row.get("occupation"));
		    	obj.setReligionId((Integer)row.get("religion_id"));
		    	obj.setOldPatientId((String)row.get("old_patient_id"));
		    	obj.setBlockNarration1((String)row.get("block_narration_1"));
		    	obj.setBlockNarration2((String)row.get("block_narration_2"));
		    	obj.setBlockNarration3((String)row.get("block_narration_3"));
		    	obj.setBlockUserId1((Integer)row.get("block_user_id_1"));
		    	obj.setBlockUserId2((Integer)row.get("block_user_id_2"));
		    	obj.setBlockUserId3((Integer)row.get("block_user_id_3"));			    	
		    	obj.setRefDate((Date)row.get("ref_date"));
		    	obj.setSanctionAmt((Double)row.get("sanction_amt"));
		    	obj.setSactionOrdNo((String)row.get("saction_ord_no"));		    	
		    	obj.setNeisNo((String)row.get("neis_no"));
		    	obj.setVisitNo((String)row.get("visit_no"));
		    	obj.setIpdOrOpd((String)row.get("ipd_or_opd"));
		    	obj.setTreatPermited((String)row.get("treat_permited"));
		    	obj.setDiseToBeTreat((String)row.get("dise_to_be_treat"));
		    	obj.setValidUpToDate((Date)row.get("valid_upto_date"));
		    	obj.setAdmissionDateTime((String)row.get("admission_date_time"));
//		    	obj.setReason_of_visit((String)row.get("reason_of_visit"));
		    	obj.setReason_of_visit((Integer)row.get("reason_of_visit"));
		    	ltMarkVisitDto.add(obj);		    	
	    	}
		    
		} catch (Exception e) {
			e.printStackTrace();
			return ltMarkVisitDto;
		}
		return ltMarkVisitDto;
	}

	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To get Dept lst by count
	 **********/
	public List<AppointmentDto> getappointmentList(int appoId) {

		List<AppointmentDto> ltAppointmentDto = new ArrayList<AppointmentDto>();

		try {

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(AppointmentDto.class);

			criteria.add(Restrictions.eq("apptId", appoId));

			ltAppointmentDto = criteria.list();
			int pid = ltAppointmentDto.get(0).getPatientId();

			Session session = sessionFactory.getCurrentSession();

			String sql1 = "Select count(t_flag) from ehat_treatment where patient_id = '"
					+ pid + "' and t_flag = 'Y'";
			SQLQuery query1 = sessionFactory.getCurrentSession()
					.createSQLQuery(sql1);
			int Result = ((Number) query1.uniqueResult()).intValue();

			ltAppointmentDto.get(0).settCount(Result);

			String sql = "select * FROM ehat_other_patient where deleted='N' and appoint_id="
					+ appoId;
			Query spDetailsQuery = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listSpDetails = spDetailsQuery.list();
			for (Map<String, Object> row : listSpDetails) {

				ltAppointmentDto.get(0).setmName((String) row.get("m_name"));
				ltAppointmentDto.get(0).setDob((String) row.get("dob"));
				ltAppointmentDto.get(0).setAge((Integer) row.get("age"));
				ltAppointmentDto.get(0).setAgeDays(
						(Integer) row.get("age_days"));
				ltAppointmentDto.get(0).setAgeMonths(
						(Integer) row.get("age_months"));
				ltAppointmentDto.get(0).setAddress((String) row.get("address"));
				ltAppointmentDto.get(0).setTalukaId(
						(Integer) row.get("taluka_id"));
				ltAppointmentDto.get(0).setTownId((Integer) row.get("town_id"));
				ltAppointmentDto.get(0).setDistrictId(
						(Integer) row.get("district_id"));
				ltAppointmentDto.get(0).setStateId(
						(Integer) row.get("state_id"));
				ltAppointmentDto.get(0).setCountryId(
						(Integer) row.get("country_id"));
				ltAppointmentDto.get(0).setAreaCode(
						(Integer) row.get("area_code"));

				ltAppointmentDto.get(0).setPerAddress(
						(String) row.get("per_address"));
				ltAppointmentDto.get(0).setPertalukaId(
						(Integer) row.get("per_taluka_id"));
				ltAppointmentDto.get(0).setPertownId(
						(Integer) row.get("per_town_id"));
				ltAppointmentDto.get(0).setPerdistrictId(
						(Integer) row.get("per_district_id"));
				ltAppointmentDto.get(0).setPerstateId(
						(Integer) row.get("per_state_id"));
				ltAppointmentDto.get(0).setPercountryId(
						(Integer) row.get("per_country_id"));
				ltAppointmentDto.get(0).setPerareaCode(
						(Integer) row.get("per_area_code"));
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltAppointmentDto;
			
		}
		return ltAppointmentDto;
	}

	/***********
	 * @author : Sagar Kadam
	 * @date : 26-May-2017
	 * @reason : To get Doctor Name
	 **********/
	public List<DoctorDto> getDoctorName(int drId) {

		List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();

		try {

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DoctorDto.class);

			criteria.add(Restrictions.eq("Doctor_ID", drId));

			ltDoctorDto = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltDoctorDto;
		}
		return ltDoctorDto;
	}

	/***********
	 * @author : Vinod Udawant
	 * @date   : 21-Aug-2019
	 * @reason : To Auosuggestion for mark visit
	 **********/
	@Override
	public RegistrationViewDto autoSuggestionMarkVisit(int patientId) {
		
		RegistrationViewDto mv = new RegistrationViewDto();
		List<RegistrationViewDto> ltRegistrationViewDto = new ArrayList<RegistrationViewDto>();
		try {
						
			String sql = "select p.center_patient_id,p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.mobile AS mobile, "
				        +" p.adharcardNo AS adharcardNo,p.created_date_time AS created_date_time,p.deleted AS deleted,p.block_flag AS block_flag,p.block_narration_1 AS block_narration_1, "
				        +" p.block_narration_2 AS block_narration_2,p.block_narration_3 AS block_narration_3,p.block_user_id_1 AS block_user_id_1,p.block_user_id_2 AS block_user_id_2, "
				        +" p.block_user_id_3 AS block_user_id_3,p.block_user_name_1 AS block_user_name_1,p.block_user_name_2 AS block_user_name_2,p.block_user_name_3 AS block_user_name_3, "
				        +" t.treatment_id AS treatment_id,t.deleted AS tdeleted,t.t_flag AS t_flag,t.department_id AS department_id,t.unit_id AS unit_id,b.charges_master_slave_id AS charges_master_slave_id "
				        +" from ((ehat_patient p join ehat_treatment t ON ((p.patient_id = t.patient_id))) join ehat_bill_master b ON (((b.patient_id = t.patient_id) and t.treatment_id in (select "
				        +" subquery_regview.treatment_id from subquery_regview)))) where ((p.deleted = 'N') and p.patient_id = "+patientId+" and (t.deleted = 'N')) group by t.patient_id order by p.patient_id desc ";
				
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
		    for(Map<String, Object> row : masterRow){
	    		
		    	RegistrationViewDto obj = new RegistrationViewDto();
		    	obj.setPtId((Integer)row.get("patient_id"));
		    	obj.setpIdd(String.valueOf((Integer)row.get("patient_id")));
		    	obj.setCenterPatientId((String)row.get("center_patient_id"));	
		    	obj.setPatientName((String)row.get("patient_name"));		    	
		    	obj.setMobile((String)row.get("mobile")); 
		    	obj.setAdharcardNo((String)row.get("adharcardNo"));		    	
		    	obj.setCreatedDateTime((Date)row.get("created_date_time"));
		    	obj.setBlockFlag((String)row.get("block_flag"));
		    	obj.setBlockNarration1((String)row.get("block_narration_1"));
		    	obj.setBlockNarration2((String)row.get("block_narration_2"));
		    	obj.setBlockNarration3((String)row.get("block_narration_3"));
		    	obj.setBlockUserId1((Integer)row.get("block_user_id_1"));
		    	obj.setBlockUserId2((Integer)row.get("block_user_id_2"));
		    	obj.setBlockUserId3((Integer)row.get("block_user_id_3"));
		    	obj.setBlockUserName1((String)row.get("block_user_name_1"));
		    	obj.setBlockUserName1((String)row.get("block_user_name_2"));
		    	obj.setBlockUserName1((String)row.get("block_user_name_3"));
		    	obj.setTtId((Integer)row.get("treatment_id"));
		    	obj.settFlag((String)row.get("t_flag"));
		    	obj.setDepartment_id((Integer)row.get("department_id"));
		    	obj.setUnitId((Integer)row.get("unit_id"));
		    	obj.setSponsorchargesSlaveId((Integer)row.get("charges_master_slave_id"));
		    	
		    	ltRegistrationViewDto.add(obj);		    	
	    	}
			
			mv.setLstRegviewDto(ltRegistrationViewDto);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return mv;
	}

	/***********
	 * @author	: Vinod Udawant
	 * @date	: 21-Aug-2019
	 * @reason	: To Auosuggestion for mark visit
	 **********/
	@Override
	public RegistrationViewDto autoSuggestionMarkVisit1(String findingName,int patSearchType,String callFrom) {
		
		RegistrationViewDto mv = new RegistrationViewDto();
		List<RegistrationViewDto> patList = new ArrayList<RegistrationViewDto> ();
		try {
			String sql = "";
			
			if(callFrom.equals("reg")){
			
				sql = getSqlQueryMarkvisit(findingName,patSearchType);
				
			}else if(callFrom.equals("prevOpd")){
				
				sql = getSqlQueryPrevOpd(findingName,patSearchType);
				
			}else if(callFrom.equals("prevIpd")){
				
				sql = getSqlQueryPrevIpd(findingName,patSearchType);
				
			}
			else if(callFrom.equals("prevDiagnostic")) {
				sql = getSqlQueryPrevDiagnostic(findingName,patSearchType);
			}
			else if(callFrom.equals("opd")){
				
				sql = getSqlQueryOpd(findingName,patSearchType);
				
			}else if(callFrom.equals("ipd")){
				
				sql = getSqlQueryIpd(findingName,patSearchType);
				
			}else if(callFrom.equals("diag")){
				
				sql = getSqlQueryDiag(findingName,patSearchType);
				
			}else if(callFrom.equals("ivf")){
				
				sql = getSqlQueryIvf(findingName,patSearchType);
				
			}else if(callFrom.equals("prevIvf")){
				
				sql = getSqlQueryPreviousIvf(findingName,patSearchType);
			}			
			
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
		    for(Map<String, Object> row : masterRow){
	    		
		    	RegistrationViewDto obj = new RegistrationViewDto();
		    	obj.setPatientName((String)row.get("patient_name"));
		    	obj.setPtId((Integer)row.get("patient_id"));
		    	obj.setCenterPatientId((String)row.get("center_patient_id"));
		    	obj.setMobile((String)row.get("mobile"));
		    	patList.add(obj);		    	
	    	}
		    mv.setLstRegviewDto(patList);
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return mv;
	}

	@Override
	public MarkVisitDto getIPDPatientDetails(String letter) {
		MarkVisitDto mv = new MarkVisitDto();
		List<MarkVisitDto> ltMarkVisitDto = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(MarkVisitDto.class);
			// criteria.add(Restrictions.eq("deptId","2"));

			criteria.add(Restrictions.eq("deptId", 2));

			criteria.addOrder(Order.desc("ptId"));

			Criterion rest1 = Restrictions.like("fName", "%" + letter + "%");
			Criterion rest2 = Restrictions.like("mName", "%" + letter + "%");
			Criterion rest3 = Restrictions.like("lName", "%" + letter + "%");

			criteria.add(Restrictions.or(rest1, rest2, rest3));

			criteria.setMaxResults(10);
			ltMarkVisitDto = criteria.list();

			mv.setLstMarkVisit(ltMarkVisitDto);
			System.out.println(mv.toString());
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return mv;
	}

	public MarkVisitDto commonFuntionForSearch(String pattern) {
		MarkVisitDto mv = new MarkVisitDto();
		List<MarkVisitDto> ltMarkVisitDto = null;

		try {

			Session session = sessionFactory.getCurrentSession();

			Date d = new Date(new java.util.Date().getTime());

			String hql = "select * from  ehat_patient p,ehat_treatment t,treatment_operations top where p.patient_id=t.patient_id and t.treatment_id = top.Treatment_ID and top.opStatus ='Y' and top.scheduleFlag = 'OT' and top.date :=date";
			Query query = session.createQuery(hql);

			query.setParameter("date", d);

			ltMarkVisitDto = query.list();

			mv.setLstMarkVisit(ltMarkVisitDto);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return mv;
	}

	@Override
	public List<RegistrationViewDto> getMarkVisitListDateWise(
			java.sql.Date inputFromDate, java.sql.Date inputToDate) {

		List<RegistrationViewDto> ltRegistrationViewDto = new ArrayList<RegistrationViewDto>();

		try {

			Session session = sessionFactory.getCurrentSession();
			String hql = ("from RegistrationViewDto WHERE DATE_FORMAT(createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate group by ptId order by ptId desc ");
			Query query = session.createQuery(hql);
			query.setDate("stDate", inputFromDate);
			query.setDate("edDate", inputToDate);
			// query.setMaxResults(10);
			// query.uniqueResult();

			ltRegistrationViewDto = query.list();

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return ltRegistrationViewDto;
		}
		return ltRegistrationViewDto;
	}

	public List<RegistrationDto> getListBlockPat() {

		List<RegistrationDto> ltRegistrationViewDto = new ArrayList<RegistrationDto>();

		try {
			String sql = "SELECT * FROM ehat_patient where block_flag = 'T' order by patient_id desc limit 10";

			Query labTestResQuery = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);

			labTestResQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listLabTest = labTestResQuery.list();

			for (Map<String, Object> row : listLabTest) {

				RegistrationDto obj = new RegistrationDto();

				obj.setPatientId((Integer) row.get("patient_id"));
				obj.setBlockUserId3((Integer) row.get("block_user_id_3"));
				obj.setBlockUserId2((Integer) row.get("block_user_id_2"));
				obj.setBlockUserId1((Integer) row.get("block_user_id_1"));
				obj.setBlockUserName3((String) row.get("block_user_name_3"));
				obj.setBlockUserName2((String) row.get("block_user_name_2"));
				obj.setBlockUserName1((String) row.get("block_user_name_1"));
				obj.setBlockNarration3((String) row.get("block_narration_3"));
				obj.setBlockNarration2((String) row.get("block_narration_2"));
				obj.setBlockNarration1((String) row.get("block_narration_1"));
				obj.setBlockFlag((String) row.get("block_flag"));
				obj.setPrefix((String) row.get("prefix"));
				obj.setfName((String) row.get("f_name"));
				obj.setmName((String) row.get("m_name"));
				obj.setlName((String) row.get("l_name"));
				obj.setMobile((String) row.get("mobile"));
				obj.setAdharcardNo((String) row.get("adharcardNo"));
				// obj.setPatientName((String) row.get("prefix")+" "+(String)
				// row.get("f_name")+" "+(String) row.get("m_name")+" "+(String)
				// row.get("l_name"));
				obj.setCreatedDateTime((Date) row.get("created_date_time"));
				obj.setBlockedDateTime((Date) row.get("blocked_date_time"));

				ltRegistrationViewDto.add(obj);

			}

		} catch (Exception e) {

			e.printStackTrace();

			return ltRegistrationViewDto;

		}

		return ltRegistrationViewDto;

	}

	// irfan khan 6-oct-2018 search and set block patients
	@Override
	public RegistrationDto setAutoCompleteBlockPatsList(String letter,
			String usertype) {
		RegistrationDto mv = new RegistrationDto();
		List<RegistrationDto> ltRegistrationViewDto = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(RegistrationDto.class);
			// criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("patientId"));
			criteria.add(Restrictions.eq("blockFlag", "T"));
			if (usertype.equals("Y")) {

				criteria.add(Restrictions.eq("patientId",
						Integer.parseInt(letter)));
			} else {
				Criterion rest1 = Restrictions
						.like("fName", "%" + letter + "%");
				Criterion rest2 = Restrictions
						.like("mName", "%" + letter + "%");
				Criterion rest3 = Restrictions
						.like("lName", "%" + letter + "%");
				Criterion rest4 = Restrictions.like("adharcardNo", "%" + letter
						+ "%");
				Criterion rest5 = Restrictions.like("mobile", "%" + letter
						+ "%");
				/*
				 * Criterion rest2= Restrictions.like("mName", "%" + letter +
				 * "%"); Criterion rest3= Restrictions.like("lName", "%" +
				 * letter + "%"); Criterion rest4= Restrictions.like("", "%" +
				 * letter + "%");
				 */

				criteria.add(Restrictions.or(rest1, rest2, rest3, rest4, rest5));
			}
			criteria.setMaxResults(10);
			ltRegistrationViewDto = criteria.list();

			mv.setListReg(ltRegistrationViewDto);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return mv;
	}

	
	@Override
	public List<RegistrationDto> fetchBlockPatientByDateRange(
			java.sql.Date inputFromDate, java.sql.Date inputToDate) {

		List<RegistrationDto> ltRegistrationViewDto = new ArrayList<RegistrationDto>();

		try {
			
			Session session = sessionFactory.getCurrentSession();
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			String fdate=  df.format(inputFromDate);
			String tdate=  df.format(inputToDate);
		
			String sql="select * from ehat_patient WHERE DATE_FORMAT(created_date_time, '%Y-%m-%d') BETWEEN '"+ fdate+"' AND '"+tdate+"'  AND  block_flag='T'  group by patient_id order by patient_id desc";
			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			@SuppressWarnings("unchecked")
			List<Map<String, Object>> list1 = query.list();

			for (Map<String, Object> row : list1) {

				RegistrationDto obj = new RegistrationDto();

				obj.setPatientId((Integer) row.get("patient_id"));
				obj.setBlockUserId3((Integer) row.get("block_user_id_3"));
				obj.setBlockUserId2((Integer) row.get("block_user_id_2"));
				obj.setBlockUserId1((Integer) row.get("block_user_id_1"));
				obj.setBlockUserName3((String) row.get("block_user_name_3"));
				obj.setBlockUserName2((String) row.get("block_user_name_2"));
				obj.setBlockUserName1((String) row.get("block_user_name_1"));
				obj.setBlockNarration3((String) row.get("block_narration_3"));
				obj.setBlockNarration2((String) row.get("block_narration_2"));
				obj.setBlockNarration1((String) row.get("block_narration_1"));
				obj.setBlockFlag((String) row.get("block_flag"));
				obj.setPrefix((String) row.get("prefix"));
				obj.setfName((String) row.get("f_name"));
				obj.setmName((String) row.get("m_name"));
				obj.setlName((String) row.get("l_name"));
				obj.setMobile((String) row.get("mobile"));
				obj.setAdharcardNo((String) row.get("adharcardNo"));
				obj.setCreatedDateTime((Date) row.get("created_date_time"));
				obj.setBlockedDateTime((Date) row.get("blocked_date_time"));

				ltRegistrationViewDto.add(obj);

			/*String hql = ("from RegistrationDto WHERE DATE_FORMAT(createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate  AND  blockFlag:"T"  group by patientId order by patientId desc ");
			Query query = session.createQuery(hql);
			query.setDate("stDate", inputFromDate);
			query.setDate("edDate", inputToDate);
			query.setString("blockFlag", "+rd.getBlockFlag()+" );
                        ltRegistrationViewDto = query.list();
			*/
			// query.setMaxResults(10);		
			
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return ltRegistrationViewDto;
		}
		return ltRegistrationViewDto;
	}

	String getSqlQueryMarkvisit(String findingName,int patSearchType){
		
		String sql = "";
		if(patSearchType == 1){
			
			sql="SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile FROM ehat_patient p where p.patient_id like '"+findingName+"%' and p.deleted='N' limit 20";
		
		}else if(patSearchType == 2){
			
			sql="SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile FROM ehat_patient p where "
				+" (p.f_name like '"+findingName+"%' "
				+" OR p.l_name like '"+findingName+"%' "
				+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
				+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
				+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
				+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') "
				+" and p.deleted = 'N' limit 20";						
		
		}else if(patSearchType == 3){
			
			sql="SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile FROM ehat_patient p where p.mobile like '"+findingName+"%' and p.deleted='N' limit 20";
		}
		
		return sql;
	}
	
	String getSqlQueryPrevOpd(String findingName,int patSearchType){
		
		String sql = "";
		if(patSearchType == 1){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
				 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
				 +" where t.department_id=1 and p.patient_id like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
			
		}else if(patSearchType == 2){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					+" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+" where t.department_id=1 and (p.f_name like '"+findingName+"%' "
					+" OR p.l_name like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
					+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') and p.deleted = 'N' group by t.patient_id limit 20";								
		
		}else if(patSearchType == 3){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					 +" where  t.department_id=1 and p.mobile like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
				
		}
		
		return sql;
	}

	String getSqlQueryPrevIpd(String findingName,int patSearchType){
		
		String sql = "";
		if(patSearchType == 1){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
				 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
				 +" where t.t_flag = 'N' and t.department_id=2 and p.patient_id like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
			
		}else if(patSearchType == 2){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					+" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+" where t.t_flag = 'N' and t.department_id=2 and (p.f_name like '"+findingName+"%' "
					+" OR p.l_name like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
					+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') and p.deleted = 'N' group by t.patient_id limit 20";								
		
		}else if(patSearchType == 3){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					 +" where t.t_flag = 'N' and t.department_id=2 and p.mobile like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
				
		}
		
		return sql;
	}
	
String getSqlQueryPrevDiagnostic(String findingName,int patSearchType){
		
		String sql = "";
		if(patSearchType == 1){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
				 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
				 +" where t.t_flag = 'N' and t.department_id=3 and p.patient_id like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
			
		}else if(patSearchType == 2){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					+" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+" where t.t_flag = 'N' and t.department_id=3 and (p.f_name like '"+findingName+"%' "
					+" OR p.l_name like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
					+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') and p.deleted = 'N' group by t.patient_id limit 20";								
		
		}else if(patSearchType == 3){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					 +" where t.t_flag = 'N' and t.department_id=2 and p.mobile like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
				
		}
		
		return sql;
	}
	
	String getSqlQueryOpd(String findingName,int patSearchType){
		
		String sql = "";
		if(patSearchType == 1){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
				 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
				 +" where t.department_id=1 and p.patient_id like '"+findingName+"%' and p.deleted = 'N'  and t_flag ='Y' group by t.patient_id limit 20";
			
		}else if(patSearchType == 2){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					+" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+" where t.department_id=1 and (p.f_name like '"+findingName+"%' "
					+" OR p.l_name like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
					+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') and p.deleted = 'N'  and t_flag ='Y' group by t.patient_id limit 20";								
		
		}else if(patSearchType == 3){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					 +" where t.department_id=1 and p.mobile like '"+findingName+"%' and p.deleted = 'N'  and t_flag ='Y' group by t.patient_id limit 20";
				
		}
		
		return sql;
	}

	String getSqlQueryIpd(String findingName,int patSearchType){
		
		String sql = "";
		if(patSearchType == 1){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
				 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
				 +" where t.department_id=2 and p.patient_id like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
			
		}else if(patSearchType == 2){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					+" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+" where t.department_id=2 and (p.f_name like '"+findingName+"%' "
					+" OR p.l_name like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
					+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') and p.deleted = 'N' group by t.patient_id limit 20";								
		
		}else if(patSearchType == 3){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					 +" where t.department_id=2 and p.mobile like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
				
		}
		
		return sql;
	}
	
	String getSqlQueryDiag(String findingName,int patSearchType){
		
		String sql = "";
		if(patSearchType == 1){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
				 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
				 +" where t.department_id=1 and p.patient_id like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
			
		}else if(patSearchType == 2){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					+" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+" where t.department_id=3 and (p.f_name like '"+findingName+"%' "
					+" OR p.l_name like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
					+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') and p.deleted = 'N' and t.t_flag='Y' group by t.patient_id limit 20";								
		
		}else if(patSearchType == 3){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					 +" where t.department_id=1 and p.mobile like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
				
		}
		
		return sql;
	}
	
	String getSqlQueryIvf(String findingName,int patSearchType){
		
		String sql = "";
		if(patSearchType == 1){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
				 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
				 +" where t.department_id=1 and p.patient_id like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
			
		}else if(patSearchType == 2){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					+" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+" JOIN ehat_ivf_treatment i ON (i.treatment_id = t.treatment_id) "
					+" where (p.f_name like '"+findingName+"%' "
					+" OR p.l_name like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
					+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') and p.deleted = 'N' and t.ivf_treat_flag='Y' group by t.patient_id limit 20";								
		
		}else if(patSearchType == 3){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					 +" where t.department_id=1 and p.mobile like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
				
		}
		
		return sql;
	}
	
	String getSqlQueryPreviousIvf(String findingName,int patSearchType){
		
		String sql = "";
		if(patSearchType == 1){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
				 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
				 +" where t.department_id=1 and p.patient_id like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
			
		}else if(patSearchType == 2){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					+" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+" JOIN ehat_ivf_treatment i ON (i.treatment_id = t.treatment_id) "
					+" where (p.f_name like '"+findingName+"%' "
					+" OR p.l_name like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
					+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') and p.deleted = 'N' and t.ivf_treat_flag='N' group by t.patient_id limit 20";								
		
		}else if(patSearchType == 3){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					 +" where t.department_id=1 and p.mobile like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
				
		}
		
		return sql;
	}

	/*@Override
	public int DeletedByFunction(Integer patientId,Integer departmentid,
			HttpServletRequest request) {
		
		String query=null;
		String query1=null;
		String sql11=null;
		Query updateSql=null;
		int response=0;
		int isAvailable=0;
		

		try{
			if(departmentid==1){
				query = "select count(*) from ehat_bill_details eb where patient_id ="+ patientId;
				isAvailable = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(query).uniqueResult()).intValue();
			}else{
				query1 = "select count(*) from ehat_bill_details_ipd eb where patient_id ="+ patientId;
				isAvailable = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(query1).uniqueResult()).intValue(); 
			}
		
			if(isAvailable == 0 && isAvailable == 1){

				sql11="update ehat_patient set deleted='Y' where patient_id='"+patientId+"'";  
				updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql11);
				response = updateSql.executeUpdate();
				
				sql11="update ehat_treatment set deleted='Y' where patient_id='"+patientId+"'"; 
				updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql11);
				response = updateSql.executeUpdate();
				
				sql11="update ehat_bill_master set deleted='Y' where patient_id='"+patientId+"'"; 
				updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql11);
				response = updateSql.executeUpdate();
				
				
			}else
			{	
				
				System.out.println(isAvailable+"EEEEEEEEEEEEE");
			}
			
			
			
		}catch(Exception e){
			System.out.println("database error...could not Update : "+ e.getMessage());
			e.printStackTrace();
			
		}
		return isAvailable;
	}*/
}
