package com.hms.doctordesk.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.VitalInfoDao;

import com.hms.doctordesk.dto.VitalInfoDto;
import com.hms.dto.PatientBmiDTO;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
@Transactional
public class VitalInfoDaoImpl implements VitalInfoDao {

	@Autowired
	SessionFactory sessionFactory;

	
	/***********
	* @author	: Arpit Gupta
	* @codeFor	: Function save vital name and values 
	************/
	
	@Override
	public String saveVitalsInfo(String vitalInfoData, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");

	
		VitalInfoDto vitalInfoList = (VitalInfoDto) ConfigUIJSONUtility.getObjectFromJSON(vitalInfoData,
				VitalInfoDto.class);

		if (vitalInfoList.getListOfVitals().size() > 0) {
			for (int i = 0; i < vitalInfoList.getListOfVitals().size(); i++) {
				VitalInfoDto vt = new VitalInfoDto();
				vt.setCreatedBy(userId);
				vt.setUnitId(unitId);
				vt.setUserId(userId);
				vt = vitalInfoList.getListOfVitals().get(i);
				sessionFactory.getCurrentSession().merge(vt);
			}
		}
		
		
		return "vitals info saved successfully";

	}

	/***********
	* @author	: Arpit Gupta
	* @codeFor	: Function to save measurements
	************/
	
	@Override
	public String saveMeasureMents(PatientBmiDTO patientBmiDTO, HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		patientBmiDTO.setUnitId(unitId);
		patientBmiDTO.setUserId(userId);
       
		if (patientBmiDTO.getPatient_bmi_id() == 0) {
			patientBmiDTO.setCreatedBy(userId);
			sessionFactory.getCurrentSession().merge(patientBmiDTO);
			return "Measurements Saved SuccessFully";
		} else {
			patientBmiDTO.setUpdatedBy(userId);
			sessionFactory.getCurrentSession().merge(patientBmiDTO);
			
			// updating bmi and bsa in treatment table
			
			String hql = "update TreatmentDto set weight =:weight,height=:height,BMI=:bmi,BSA=:bsa,HCIM=:hcim where treatmentId=:treatmentId";
			Query query = sessionFactory.getCurrentSession().createQuery(hql);
			query.setParameter("weight", patientBmiDTO.getPatient_weight());
			query.setParameter("height", patientBmiDTO.getPatient_height());
			query.setParameter("treatmentId", patientBmiDTO.getPatient_treat_id());
			query.setParameter("bmi", patientBmiDTO.getPatient_bmi());
			query.setParameter("bsa", patientBmiDTO.getPatient_bsa());
			query.setParameter("hcim", patientBmiDTO.getPatient_headcim());
			query.executeUpdate();
			
			
			return "Measurements Updated SuccessFully";
		}
	}

	/***********
	* @author	: Arpit Gupta
	* @codeFor	: Function to get vital and values by treatment id
	************/
	
	@Override
	public List<VitalInfoDto> getVitalList(int patOrTreatId,String callfrom) {
		String sql="";
		List<VitalInfoDto> listinfo = new ArrayList<VitalInfoDto>();
		if(callfrom.equalsIgnoreCase("hometab")){
			sql ="select vt.vitalname,vtinfo.vital_id,vtinfo.vital_info_id,vtinfo.value,vtinfo.vital_date"
				     +" from dd_vital vt left join  dd_vital_info_details" + 
				     " vtinfo on vt.vital_id=vtinfo.vital_id where vtinfo.deleted='N' and vtinfo.patient_id="+patOrTreatId;
		}
		else{
			sql ="select vt.vitalname,vtinfo.vital_id,vtinfo.vital_info_id,vtinfo.value,vtinfo.vital_date"
				     +" from dd_vital vt left join  dd_vital_info_details" + 
				     " vtinfo on vt.vital_id=vtinfo.vital_id where vtinfo.deleted='N' and vtinfo.treatment_id="+patOrTreatId;
		}
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> vitalInfoDetails = query.list();
		for (Map<String, Object> row : vitalInfoDetails) {
			VitalInfoDto obj = new VitalInfoDto();
			obj.setId((Integer)row.get("vital_info_id"));
			obj.setVitalId((Integer)row.get("vital_id"));
			obj.setVitalName((String)row.get("vitalname"));
			obj.setValue((String)row.get("value"));
			obj.setCurrentDate((String)row.get("vital_date"));
			listinfo.add(obj);
		}
		return listinfo;

	}

	/***********
	* @author	: Arpit Gupta
	* @codeFor	: Function to get vitals by id
	************/
	
	@Override
	public List<VitalInfoDto> getVitalListById(int id) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(VitalInfoDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
        criteria.add(Restrictions.eq("treatmentId", id));
        List<VitalInfoDto> list = criteria.list();
		return list;
	}
	
	/***********
	* @author	: Arpit Gupta
	* @codeFor	: Function to delete vitalInfo details
	************/

	@Override
	public String deleteVitalsValues(int id,HttpServletRequest request) {
		
		
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		String hql ="update VitalInfoDto v set v.deleted='Y',v.deletedDate=:date where v.treatmentId in ("+id+")";
		Query query2 =sessionFactory.getCurrentSession().createQuery(hql);
		query2.setParameter("date",new Date());
		int flag =query2.executeUpdate();
		System.out.println("flag"+flag);
		
		return "Vitals Deleted SuccessFully";
	}
	
	/***********
	* @author	: Arpit Gupta
	* @codeFor	: Function to get measuements by id
	************/

	@Override
	public List<PatientBmiDTO> getMeasureMents(int patOrTreatId,String callfrom) {
		// TODO Auto-generated method stub
		List<PatientBmiDTO> list=new ArrayList<PatientBmiDTO>();
		try {
		Criteria criteria  = sessionFactory.getCurrentSession().createCriteria(PatientBmiDTO.class);
		criteria.add(Restrictions.eq("status", "Y"));
		if(callfrom.equalsIgnoreCase("hometab")){
			criteria.add(Restrictions.eq("patient_id",patOrTreatId));
		}
		else{
			criteria.add(Restrictions.eq("patient_treat_id",patOrTreatId));
		}
		list = criteria.list();
		}catch (Exception e) {
			// TODO: handle exception
		}
		return list;
	}

	@Override
	public List<PatientBmiDTO> getMeasureMentsListById(int id) {
		// TODO Auto-generated method stub
		Criteria criteria  = sessionFactory.getCurrentSession().createCriteria(PatientBmiDTO.class);
		criteria.add(Restrictions.eq("status", "Y"));
		criteria.add(Restrictions.eq("patient_bmi_id", id));
		return criteria.list();
	}

	@Override
	public String deleteMeasureMentsValues(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		PatientBmiDTO object = (PatientBmiDTO) sessionFactory.getCurrentSession().get(PatientBmiDTO.class,id);
		object.setStatus("N");
		object.setDeletedDate(new Date());
		object.setDeleted_by(userId);
		sessionFactory.getCurrentSession().merge(object);
		return "Measurements Deleted SuccessFully";
	}

	

}