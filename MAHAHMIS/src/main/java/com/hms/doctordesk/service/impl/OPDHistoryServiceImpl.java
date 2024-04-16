package com.hms.doctordesk.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.OPDHistoryDao;
import com.hms.doctordesk.dto.OPDBmiMasterDTO;
import com.hms.doctordesk.dto.OPDDietMasterDTO;
import com.hms.doctordesk.dto.OPDHistoryMasterDTO;
import com.hms.doctordesk.dto.OPDHistorySlaveDTO;
import com.hms.doctordesk.dto.OpdPatientDetailsDto;
import com.hms.doctordesk.service.OPDHistoryService;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
public class OPDHistoryServiceImpl implements OPDHistoryService {

	@Autowired
	OPDHistoryDao opddao;
	
	@Autowired
	SessionFactory sf;
	
	@Transactional
	@Override
	public int saveOPDHistory(OPDHistoryMasterDTO obj,String historySlaveList,Integer patientId,Integer treatmentId) {
		

		OPDHistorySlaveDTO freshobj = (OPDHistorySlaveDTO) ConfigUIJSONUtility
				.getObjectFromJSON(historySlaveList, OPDHistorySlaveDTO.class);	
		List<OPDHistorySlaveDTO> lsthistoryslave = freshobj.getGetListOfHistorySlaveDTO();
		
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		obj.setPatientObj(pobj);
		obj.setTreatObj(tobj);
		
		obj.setGetListOfHistorySlaveDTO(lsthistoryslave);
		
		return opddao.saveOPDHistory(obj);
	}

	@Override
	@Transactional
	public OPDHistoryMasterDTO getOPDHistory(Integer treatmentId) {
		
		return opddao.getOPDHistory(treatmentId);
	}

	@Override
	@Transactional
	public OpdPatientDetailsDto getPatientInfoByTreatmentId(Integer treatmentId) {
		
		return opddao.getPatientInfoByTreatmentId(treatmentId);
	}

	@Override
	@Transactional
	public int deleteHistorySalve(String historySlaveId, Integer userId) {
		
		int msg=0;
		try{
			
			/*
			 * Query itemInfo = sf .getCurrentSession().
			 * createSQLQuery("update opd_history_slave set deleted='Y',deleted_by=" +
			 * userId +
			 * ",deleted_date_time=now() where history_slave_id in("+historySlaveId+")");
			 */
			
			Query itemInfo =sf .getCurrentSession().createQuery("UPDATE OPDHistorySlaveDTO set deleted='Y',deletedBy="+userId+",deletedDateTime=now() where historySalveId in("+historySlaveId+") ");
			   
			itemInfo.executeUpdate();
			msg=1;
		}catch(Exception e){
			e.printStackTrace();
		}
		return msg;
	}

	@Transactional
	@Override
	public int saveOPDiet(OPDDietMasterDTO obj, Integer patientId, Integer treatmentId) {
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		obj.setPatientObj(pobj);
		obj.setTreatObj(tobj);
		
		return opddao.saveOPDiet(obj);
	}

	@Transactional
	@Override
	public OPDDietMasterDTO editOPDDiet(Integer dietMasterId) {
		return opddao.editOPDDiet(dietMasterId);
	}

	@Transactional
	@Override
	public List<OPDDietMasterDTO> getOPDDietListByTreatmentId(Integer treatmentId) {
		// TODO Auto-generated method stub
		return opddao.getOPDDietListByTreatmentId(treatmentId);
	}

	@Override
	@Transactional
	public int deleteOPDDiet(String dietMasterIds, Integer userId) {
		
		return opddao.deleteOPDDiet(dietMasterIds, userId);
	}

	@Override
	@Transactional
	public List<OPDDietMasterDTO> getOPDDietListByDietIds(String dietIds) {
		
		return opddao.getOPDDietListByDietIds(dietIds);
	}

	@Override
	@Transactional
	public int saveOPDPatientBMI(OPDBmiMasterDTO obj, Integer patientId, Integer treatmentId) {
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		obj.setPatientObj(pobj);
		obj.setTreatObj(tobj);
		return opddao.saveOPDPatientBMI(obj);
	}

	@Override
	@Transactional
	public List<OPDBmiMasterDTO> getOPDBMIListByTreatmentId(Integer treatmentId) {
		
		return opddao.getOPDBMIListByTreatmentId(treatmentId);
	}

	@Override
	@Transactional
	public OPDBmiMasterDTO editOPDBMI(Integer opdBmiMasterId) {
		
		return opddao.editOPDBMI(opdBmiMasterId);
	}

	@Override
	@Transactional
	public int getPrefixIdByValue(String deptName, String value) {
		// TODO Auto-generated method stub
		return opddao.getPrefixIdByValue(deptName, value);
	}
//Added By Annapurna
	@Override
	@Transactional
	public String getMrnno(Integer treatment_id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		String result = "";
		try {
			String sql = "SELECT     " + 
					"    mrnno    " + 
					"FROM    " + 
					"    ehat_treatment et,    " + 
					"    ehat_patient ep    " + 
					"WHERE    " + 
					"    et.patient_id = ep.patient_id    " + 
					"        AND et.treatment_id = "+treatment_id;
			SQLQuery sqlresult = sf.getCurrentSession().createSQLQuery(sql);
			result = (String) sqlresult.uniqueResult();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}

	@Override
	@Transactional
	public OPDHistoryMasterDTO getPatientHistoryByTemplateId(Integer id,Integer treatmentId, HttpServletRequest request) {
		
		if(id!=0) {
			try {
				
				TreatmentDto tobj=(TreatmentDto) sf.openSession().get(TreatmentDto.class, treatmentId);
				//List<OPDHistorySlaveDTO> list =new ArrayList<OPDHistorySlaveDTO>();
				
				Criteria c=  sf.openSession().createCriteria(OPDHistoryMasterDTO.class);
				c.add(Restrictions.eq("treatObj", tobj));
				c.add(Restrictions.eq("templateId", id));
				OPDHistoryMasterDTO obj=(OPDHistoryMasterDTO) c.uniqueResult();
				
				if(obj !=null) {
					List<OPDHistorySlaveDTO> list = obj.getGetListOfHistorySlaveDTO();
					 List<OPDHistorySlaveDTO> newlist= list.stream().filter(x->x.getDeleted().equalsIgnoreCase("N")).collect(Collectors.toList());
					obj.setGetListOfHistorySlaveDTO(newlist);
				}
			
				return obj;
			
			
			}catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	@Override
	@Transactional
	public String getConsultantName(Integer treatmentId, Integer userId, Integer dpid) {
		// TODO Auto-generated method stub
		String doctorName="";
		try{
			 String sql="select user_Type from users where User_ID="+userId+"";
			 SQLQuery q    =sf.getCurrentSession().createSQLQuery(sql);
			 String sql2="";
			// int dpid=0;
			 String s1=(String) q.uniqueResult();
			 if(s1.equalsIgnoreCase("DOCTOR")) {
				//String sql2="select doctor_id from ehat_treatment where treatment_id="+treatmentId+" "; 
				 
				 if(dpid ==1 || dpid == 3) {
				  sql2="select GROUP_CONCAT(DISTINCT doctor_id SEPARATOR ',')  from ehat_bill_details where treatment_id="+treatmentId+" ";
				 }else if(dpid==2) {
					 sql2="select GROUP_CONCAT(DISTINCT doctor_id SEPARATOR ',')  from ehat_bill_details_ipd where treatment_id="+treatmentId+" ";
				 }
				 SQLQuery q2    =sf.getCurrentSession().createSQLQuery(sql2);
				 String s23=(String) q2.uniqueResult();
				 if(s23.contains(Integer.toString(userId))) {
					 String sql1="select doc_name from doctor where   User_ID="+userId+"";
					  q    =sf.getCurrentSession().createSQLQuery(sql1);
					  doctorName=(String) q.uniqueResult();
				 }
			 }
			 
		}
		catch (Exception e) {
			
			e.printStackTrace();// TODO: handle exception
		}
		return doctorName;
	}

}
