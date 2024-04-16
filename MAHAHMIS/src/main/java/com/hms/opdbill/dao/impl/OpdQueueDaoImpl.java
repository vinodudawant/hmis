package com.hms.opdbill.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.bloodbank.dto.BloodRequest;
import com.hms.ehat.dto.RegistrationViewDto2;
import com.hms.opdbill.dao.OpdQueueDao;
import com.hms.opdbill.dto.OpdQueueDto;

@Repository
public class OpdQueueDaoImpl implements OpdQueueDao {

	static Logger log=Logger.getLogger(OpdQueueDaoImpl.class.getName());
	static {
		System.out.println("OpdQueueDaoImpl is Loaded...!");
	}
	
	@Autowired
	SessionFactory sessionFactory;
	@SuppressWarnings("unchecked")
	//@Override
	public OpdQueueDto getAllOpdQueuePatient11(OpdQueueDto objDto) {
		
		
		log.info("In OpdQueueDaoImpl getAllOpdQueuePatient()");
		Session s = sessionFactory.getCurrentSession();
		//int startIndex = objDto.getStartIndex();
		int PatientId = objDto.getPatientId();
		String patientName = objDto.getPatientName();
		String mobile = objDto.getMobile();
		String adharcardNo = objDto.getAdharcardNo();
		int specialityId = objDto.getSpecialityId();
		int unitId = objDto.getUnitId();
		int doctorId = Integer.parseInt(objDto.getDoctorId());
		try {
	//	 if(adharcardNo.equalsIgnoreCase("-")) {
				Query prefixSp = s.createSQLQuery("call sp_reg_get_opd_queue(:patientId,:patientName,:mobile,:adharcardNo,:specialityId,:doctorId,:unitId)");
				//prefixSp.setParameter("startIndex", startIndex);
				if(PatientId > 0)
					prefixSp.setParameter("patientId", PatientId);
				else
					prefixSp.setParameter("patientId", null);
				if(!patientName.equalsIgnoreCase("-"))
					prefixSp.setParameter("patientName", patientName);
				else
					prefixSp.setParameter("patientName", null);
				if(!mobile.equalsIgnoreCase("-"))
					prefixSp.setParameter("mobile", mobile);
				else
					prefixSp.setParameter("mobile", null);
				if(!adharcardNo.equalsIgnoreCase("-"))
					prefixSp.setParameter("adharcardNo", adharcardNo);
				else
					prefixSp.setParameter("adharcardNo", null);
				if(specialityId > 0)
					prefixSp.setParameter("specialityId", specialityId);
				else
					prefixSp.setParameter("specialityId", null);
				if(doctorId > 0)
					prefixSp.setParameter("doctorId", doctorId);
				else
					prefixSp.setParameter("doctorId", null);
				if(unitId > 0)
					prefixSp.setParameter("unitId", unitId);
				else
					prefixSp.setParameter("unitId", null);
				
				prefixSp.setFirstResult(objDto.getStartIndex());
				prefixSp.setResultTransformer(new AliasToBeanResultTransformer(OpdQueueDto.class));
				@SuppressWarnings("unchecked")
				List<OpdQueueDto> lstOpdQueueDto = prefixSp.list();		
				objDto.setListOpdQueManagmentViewDto(lstOpdQueueDto);
				log.debug("Response--------> "+objDto);
				return objDto;
				
		//  }
		
			/*
			 * //Added By Annapurna for Aadharcard search Issue
			 *  else { Query prefixSp =
			 * s.createSQLQuery("call sp_reg_get_opd_queue_aadharcard(:adharcardNo)");
			 * if(!adharcardNo.equalsIgnoreCase("-")) prefixSp.setParameter("adharcardNo",
			 * adharcardNo); else prefixSp.setParameter("adharcardNo", null);
			 * 
			 * prefixSp.setFirstResult(objDto.getStartIndex());
			 * prefixSp.setResultTransformer(new
			 * AliasToBeanResultTransformer(OpdQueueDto.class));
			 * 
			 * @SuppressWarnings("unchecked") List<OpdQueueDto> lstOpdQueueDto =
			 * prefixSp.list(); objDto.setListOpdQueManagmentViewDto(lstOpdQueueDto);
			 * log.debug("Response--------> "+objDto); return objDto;
			 * 
			 * }
			 */
		
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}
	
	//@Override
	public OpdQueueDto getAllDiagQueuePatient11(OpdQueueDto objDto) {

		log.info("In OpdQueueDaoImpl getAllDiagQueuePatient()");
		Session s = sessionFactory.getCurrentSession();
		//int startIndex = objDto.getStartIndex();
		int PatientId = objDto.getPatientId();
		String patientName = objDto.getPatientName();
		String mobile = objDto.getMobile();
		String adharcardNo = objDto.getAdharcardNo();
		int unitId = objDto.getUnitId();
		try {
			
			Query prefixSp = s.createSQLQuery("call sp_reg_get_diag_queue(:patientId,:patientName,:mobile,:adharcardNo,:unitId)");
			//prefixSp.setParameter("startIndex", startIndex);
			if(PatientId > 0)
				prefixSp.setParameter("patientId", PatientId);
			else
				prefixSp.setParameter("patientId", null);
			if(!patientName.equalsIgnoreCase("-"))
				prefixSp.setParameter("patientName", patientName);
			else
				prefixSp.setParameter("patientName", null);
			if(!mobile.equalsIgnoreCase("-"))
				prefixSp.setParameter("mobile", mobile);
			else
				prefixSp.setParameter("mobile", null);
			if(!adharcardNo.equalsIgnoreCase("-"))
				prefixSp.setParameter("adharcardNo", adharcardNo);
			else
				prefixSp.setParameter("adharcardNo", null);
			if(unitId > 0)
				prefixSp.setParameter("unitId", unitId);
			else
				prefixSp.setParameter("unitId", null);
			
			prefixSp.setFirstResult(objDto.getStartIndex());
			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(OpdQueueDto.class));
			@SuppressWarnings("unchecked")
			List<OpdQueueDto> lstOpdQueueDto = prefixSp.list();		
			objDto.setListOpdQueManagmentViewDto(lstOpdQueueDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}	
	}
	
	@Override
	public OpdQueueDto getAllIvfQueuePatient(OpdQueueDto objDto) {

		log.info("In OpdQueueDaoImpl getAllIvfQueuePatient()");
		Session s = sessionFactory.getCurrentSession();
		//int startIndex = objDto.getStartIndex();
		int PatientId = objDto.getPatientId();
		String patientName = objDto.getPatientName();
		String mobile = objDto.getMobile();
		String adharcardNo = objDto.getAdharcardNo();
		int unitId = objDto.getUnitId();
		try {
			
			Query prefixSp = s.createSQLQuery("call sp_reg_get_ivf_queue(:patientId,:patientName,:mobile,:adharcardNo,:unitId)");
			//prefixSp.setParameter("startIndex", startIndex);
			if(PatientId > 0)
				prefixSp.setParameter("patientId", PatientId);
			else
				prefixSp.setParameter("patientId", null);
			if(!patientName.equalsIgnoreCase("-"))
				prefixSp.setParameter("patientName", patientName);
			else
				prefixSp.setParameter("patientName", null);
			if(!mobile.equalsIgnoreCase("-"))
				prefixSp.setParameter("mobile", mobile);
			else
				prefixSp.setParameter("mobile", null);
			if(!adharcardNo.equalsIgnoreCase("-"))
				prefixSp.setParameter("adharcardNo", adharcardNo);
			else
				prefixSp.setParameter("adharcardNo", null);
			if(unitId > 0)
				prefixSp.setParameter("unitId", unitId);
			else
				prefixSp.setParameter("unitId", null);
			
			prefixSp.setFirstResult(objDto.getStartIndex());
			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(OpdQueueDto.class));
			@SuppressWarnings("unchecked")
			List<OpdQueueDto> lstOpdQueueDto = prefixSp.list();		
			objDto.setListOpdQueManagmentViewDto(lstOpdQueueDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}	
	}
	
	/***********
	 * @author : Vishant Pawar
	 * @date : 26-August-2022
	 * @reason : To get Dept lst by count diagnostic 
	 **********/
	public List<RegistrationViewDto2> getAllPatientRecordsForPrevDiagnostic(String letter,String usertype,int deptId, Integer unitId) {

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
	 * @author : Vishant Pawar
	 * @date : 26-August-2022
	 * @reason : To get Dept lst by count diagnostic 
	 **********/
	public List<RegistrationViewDto2> getPreviousTreatmentPatient(String letter,String usertype,int deptId, Integer unitId, Integer startIndex) {

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
					+" join ehat_bill_master b ON ((b.patient_id = t.patient_id))) where ((p.deleted = 'N') "
					+" and (t.deleted = 'N') and (t.department_id = 3) and (t.t_flag = 'N') and p.unit_id = "+unitId+") ";
			if(usertype.equals("all")){
				
				sql = sql + " group by t.patient_id order by p.patient_id desc limit "+startIndex+", "+maxresult;				
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
	
	/*
	 * updated by Badrinath For opd Queue Pagination 11/10/2023
	 */
	@Override
	public OpdQueueDto getAllOpdQueuePatient(OpdQueueDto objDto,Integer startIndex) {
		
		System.out.println("obj**** "+objDto);
		
		log.info("In OpdQueueDaoImpl getAllOpdQueuePatient()");
		Session s = sessionFactory.getCurrentSession();
		//int startIndex = objDto.getStartIndex();
		int PatientId = objDto.getPatientId();
		String patientName = objDto.getPatientName();
		String mobile = objDto.getMobile();
		String adharcardNo = objDto.getAdharcardNo();
		int specialityId = objDto.getSpecialityId();
		int unitId = objDto.getUnitId();
		int doctorId = Integer.parseInt(objDto.getDoctorId());
		try {
	//	 if(adharcardNo.equalsIgnoreCase("-")) {
	/*
	 * if(startIndex == 0 || startIndex == null) { // startIndex =1; }
	 */
				
				int maxresult = 10;
				Query prefixSp = s.createSQLQuery("call sp_reg_get_opd_queue_pagination(:patientId,:patientName,:mobile,:adharcardNo,:specialityId,:doctorId,:unitId,:startIndex,:maxresult)");
				//prefixSp.setParameter("startIndex", startIndex);
				prefixSp.setParameter("startIndex", startIndex);
				prefixSp.setParameter("maxresult", maxresult);
				if(PatientId > 0)
					prefixSp.setParameter("patientId", PatientId);
				else
					prefixSp.setParameter("patientId", null);
				if(!patientName.equalsIgnoreCase("-"))
					prefixSp.setParameter("patientName", patientName);
				else
					prefixSp.setParameter("patientName", null);
				if(!mobile.equalsIgnoreCase("-"))
					prefixSp.setParameter("mobile", mobile);
				else
					prefixSp.setParameter("mobile", null);
				if(!adharcardNo.equalsIgnoreCase("-"))
					prefixSp.setParameter("adharcardNo", adharcardNo);
				else
					prefixSp.setParameter("adharcardNo", null);
				if(specialityId > 0)
					prefixSp.setParameter("specialityId", specialityId);
				else
					prefixSp.setParameter("specialityId", null);
				if(doctorId > 0)
					prefixSp.setParameter("doctorId", doctorId);
				else
					prefixSp.setParameter("doctorId", null);
				if(unitId > 0)
					prefixSp.setParameter("unitId", unitId);
				else
					prefixSp.setParameter("unitId", null);
				
				prefixSp.setResultTransformer(new AliasToBeanResultTransformer(OpdQueueDto.class));
				@SuppressWarnings("unchecked")
				List<OpdQueueDto> lstOpdQueueDto = prefixSp.list();		
				objDto.setListOpdQueManagmentViewDto(lstOpdQueueDto);
				log.debug("Response--------> "+objDto);
				
				
				return objDto;
		
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}
	/*
	 * by Badrinath For opd Queue Pagination count 11/10/2023
	 */
	@Override
	public Integer getAllOpdQueuePatientCount() {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = "SELECT " + 
					"    COUNT(*)	" + 
					"FROM    " + 
					"    ehat_bill_master b    " + 
					"        JOIN    " + 
					"    ehat_patient p ON (b.patient_id = p.patient_id)    " + 
					"        JOIN    " + 
					"    ehat_treatment t ON (b.treatment_id = t.treatment_id)    " + 
					"        JOIN    " + 
					"    token_number tn ON (tn.treatment_id = t.treatment_id)    " + 
					"WHERE    " + 
					"    t.t_flag = 'Y' AND t.deleted = 'N'    " + 
					"        AND b.deleted = 'N'    " + 
					"        AND t.department_id = 1    " + 
					"        AND tn.queue_status != 'cancel'    " + 
					"        AND t.created_date_time >= (CURDATE() - INTERVAL 1 DAY)    " + 
					"ORDER BY b.patient_id DESC";
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	/*
	 * updated by Badrinath For Diagnostic Queue Pagination 12/10/2023
	 */
	
	@Override
	public OpdQueueDto getAllDiagQueuePatient(OpdQueueDto objDto,Integer startIndex) {

		log.info("In OpdQueueDaoImpl getAllDiagQueuePatient()");
		Session s = sessionFactory.getCurrentSession();
		//int startIndex = objDto.getStartIndex();
		int PatientId = objDto.getPatientId();
		String patientName = objDto.getPatientName();
		String mobile = objDto.getMobile();
		String adharcardNo = objDto.getAdharcardNo();
		int unitId = objDto.getUnitId();
		try {
			int maxresult = 10;
			Query prefixSp = s.createSQLQuery("call sp_reg_get_diag_queue_pagination(:patientId,:patientName,:mobile,:adharcardNo,:unitId,:startIndex,:maxresult)");
			//prefixSp.setParameter("startIndex", startIndex);
			prefixSp.setParameter("startIndex", startIndex);
			prefixSp.setParameter("maxresult", maxresult);
			if(PatientId > 0)
				prefixSp.setParameter("patientId", PatientId);
			else
				prefixSp.setParameter("patientId", null);
			if(!patientName.equalsIgnoreCase("-"))
				prefixSp.setParameter("patientName", patientName);
			else
				prefixSp.setParameter("patientName", null);
			if(!mobile.equalsIgnoreCase("-"))
				prefixSp.setParameter("mobile", mobile);
			else
				prefixSp.setParameter("mobile", null);
			if(!adharcardNo.equalsIgnoreCase("-"))
				prefixSp.setParameter("adharcardNo", adharcardNo);
			else
				prefixSp.setParameter("adharcardNo", null);
			if(unitId > 0)
				prefixSp.setParameter("unitId", unitId);
			else
				prefixSp.setParameter("unitId", null);
			
			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(OpdQueueDto.class));
			@SuppressWarnings("unchecked")
			List<OpdQueueDto> lstOpdQueueDto = prefixSp.list();		
			objDto.setListOpdQueManagmentViewDto(lstOpdQueueDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}	
	}
	
	//Added By Badrinath For all diagnostic patient Count
	//16/10/23
	
	@Override
	public Integer getAllDiagQueuePatientCount() {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = "SELECT  "+ 
					"    COUNT(*)" + 
					"FROM" + 
					"    (`ehat_bill_master` `b`" + 
					"    JOIN `ehat_patient` `p` ON (`b`.`patient_id` = `p`.`patient_id`)" + 
					"    JOIN `ehat_treatment` `t` ON (`b`.`treatment_id` = `t`.`treatment_id`))" + 
					"WHERE" + 
					"    `t`.`t_flag` = 'Y'" + 
					"        AND `t`.`department_id` = 3 " + 
					"ORDER BY `b`.`patient_id` DESC";
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	    //Added By Badrinath For previous diagnostic patient Count
		//17/10/23
	
	@Override
	public Integer getPrevDiagnosticCount() {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = " SELECT " + 
					"   count(distinct t.patient_id)" + 
					"FROM" + 
					"    ((ehat_patient p" + 
					"    JOIN ehat_treatment t ON ((p.patient_id = t.patient_id)))" + 
					"    JOIN ehat_bill_master b ON ((b.patient_id = t.patient_id)))" + 
					"WHERE" + 
					"    ((p.deleted = 'N') AND (t.deleted = 'N')" + 
					"        AND (t.department_id = 3)" + 
					"        AND (t.t_flag = 'N')" + 
					"        AND p.unit_id = 1)" + 
					" ORDER BY p.patient_id  "
					;
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
}
