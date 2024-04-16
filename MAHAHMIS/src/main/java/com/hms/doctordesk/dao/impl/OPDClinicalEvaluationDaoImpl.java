package com.hms.doctordesk.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.doctordesk.controller.OPDClinicalEvaluationController;
import com.hms.doctordesk.dao.OPDClinicalEvaluationDao;
import com.hms.doctordesk.dao.OPDHistoryDao;
import com.hms.doctordesk.dto.ClinicalEvaluationBMIDto;
import com.hms.doctordesk.dto.Doctordeskopderdto;
import com.hms.doctordesk.dto.OPDAllergyAlertsDto;
import com.hms.doctordesk.dto.OPDClinicalEvaluationDto;
import com.hms.doctordesk.dto.OPDDietMasterDTO;
import com.hms.doctordesk.dto.OPDHistoryMasterDTO;
import com.hms.doctordesk.dto.OPDHistorySlaveDTO;
import com.hms.doctordesk.dto.OPDPrescriptionDto;
import com.hms.doctordesk.dto.PrescriptionInstructionDto;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;

import groovy.util.logging.Slf4j;

@Repository
@Slf4j
public class OPDClinicalEvaluationDaoImpl implements OPDClinicalEvaluationDao {

	@Autowired
	SessionFactory sessionFactory;
	
	private static final Logger logger = LoggerFactory.getLogger(OPDClinicalEvaluationDaoImpl.class);

	@Override
	public int saveBMIForClinicalEvaluation(ClinicalEvaluationBMIDto obj, Integer treatmentId, HttpServletRequest request) {
		
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		String todaysDate = formatter.format(currentDate.getTime());
		
		try {
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			if (obj.getId() == 0) {			// insert record
				
				
				
				if (todaysDate.equals(obj.getDateOfBMI())) {		//update TreatmentDto (ehat_treatment table) with following values against the treatment Id.
					
					String hql="update TreatmentDto set weight= :weight, height= :height, BMI= :BMI, BSA= :BSA, HCIM= :HCIM where treatmentId= :treatmentId";
					Query query = sessionFactory.getCurrentSession().createQuery(hql);
					query.setParameter("weight", obj.getWeight());
					query.setParameter("height",obj.getWeight());
					query.setParameter("BMI", obj.getBmi());
					query.setParameter("BSA", obj.getBsa());
					query.setParameter("HCIM", obj.getHeadCIM());
					query.setParameter("treatmentId", treatmentId);
					query.executeUpdate();
					
				}
				
				TreatmentDto treatDTO = (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class, treatmentId);
				
				obj.setTreatmentDto(treatDTO);
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				
				sessionFactory.getCurrentSession().merge(obj);
				
				return 1;
				
			} else {						// update record
				
				if (todaysDate.equals(obj.getDateOfBMI())) {		//update TreatmentDto (ehat_treatment table) with following values against the treatment Id.
					
					String hql="update TreatmentDto set weight= :weight, height= :height, BMI= :BMI, BSA= :BSA, HCIM= :HCIM where treatmentId= :treatmentId";
					Query query = sessionFactory.getCurrentSession().createQuery(hql);
					query.setParameter("weight", obj.getWeight());
					query.setParameter("height",obj.getWeight());
					query.setParameter("BMI", obj.getBmi());
					query.setParameter("BSA", obj.getBsa());
					query.setParameter("HCIM", obj.getHeadCIM());
					query.setParameter("treatmentId", treatmentId);
					query.executeUpdate();
					
				}
				TreatmentDto treatDTO = (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class, treatmentId);
				
				obj.setTreatmentDto(treatDTO);
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				
				sessionFactory.getCurrentSession().merge(obj);
				return 2;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int saveOPDAllergyAlerts(OPDAllergyAlertsDto obj, Integer patientId, Integer treatmentId, HttpServletRequest request) {

		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			if (obj.getAllergyAlertsId() == 0) {
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				
				RegistrationDto regDTO = (RegistrationDto) sessionFactory.getCurrentSession().get(RegistrationDto.class, patientId);
				TreatmentDto treatDTO = (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class, treatmentId);
				obj.setRegistrationDto(regDTO);
				obj.setTreatmentDto(treatDTO);
				
				sessionFactory.getCurrentSession().merge(obj);
				return 1;
				
				
			} else {
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				
				RegistrationDto regDTO = (RegistrationDto) sessionFactory.getCurrentSession().get(RegistrationDto.class, patientId);
				TreatmentDto treatDTO = (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class, treatmentId);
				obj.setRegistrationDto(regDTO);
				obj.setTreatmentDto(treatDTO);
				
				sessionFactory.getCurrentSession().merge(obj);
				return 2;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	
		
		
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<OPDAllergyAlertsDto> fetchAllAllergyAlerts(Integer treatmentId, HttpServletRequest request) {
		
		logger.info("-----IN OPDClinicalEvaluationDaoImpl fetchAllAllergyAlerts --> ");
		
		HttpSession session = request.getSession();
		int unitId = (int) session.getAttribute("uId");
		
		List<OPDAllergyAlertsDto> list = new ArrayList<OPDAllergyAlertsDto>();
		
		try {
			
			TreatmentDto treatmentDto = (TreatmentDto) sessionFactory.openSession().get(TreatmentDto.class, treatmentId);
			
			Criteria criteria = sessionFactory.openSession().createCriteria(OPDAllergyAlertsDto.class);
			criteria.add(Restrictions.eq("deleted","N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			criteria.add(Restrictions.eq("treatmentDto", treatmentDto));
			list = criteria.list();
			
		}catch (Exception e) {
			logger.error("fetchAllAllergyAlerts Exception--> ",e);
		}
		return list;
	}

	@SuppressWarnings("unchecked")
	@Override
	public OPDAllergyAlertsDto getAllergyAlertsById(Integer allergyAlertsId) {
		
		List<OPDAllergyAlertsDto> list = new ArrayList<OPDAllergyAlertsDto>();
		
			try {
					
					Criteria criteria = sessionFactory.openSession().createCriteria(OPDAllergyAlertsDto.class);
					criteria.add(Restrictions.eq("deleted","N"));
					criteria.add(Restrictions.eq("allergyAlertsId",allergyAlertsId));
					
					list = criteria.list();
					
				}catch (Exception e) {
					logger.error("getAllergyAlertsById Exception--> ",e);
				}
				return list.get(0);
	}

	@Override
	public boolean deleteOPDAllergyAlerts(Integer allergyAlertsId, HttpServletRequest request) {
		
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
			OPDAllergyAlertsDto obj = (OPDAllergyAlertsDto) sessionFactory.getCurrentSession().get(OPDAllergyAlertsDto.class, allergyAlertsId);
			
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<CustomizeTemplate> fetchCustomTemplatesBySpecializationId(String doctorSpecialization) {
		
		List<CustomizeTemplate> listCustomizeTemplate = new ArrayList<CustomizeTemplate>();
		
		try {
				
				Criteria criteria = sessionFactory.openSession().createCriteria(CustomizeTemplate.class);
				criteria.add(Restrictions.eq("deleted","N"));
				criteria.add(Restrictions.eq("doctorSpecialization", doctorSpecialization));
				
				listCustomizeTemplate = criteria.list();
				
			}catch (Exception e) {
				logger.error("fetchCustomTemplatesBySpecializationId Exception--> ",e);
			}
			return listCustomizeTemplate;
	}

	@SuppressWarnings("unchecked")
	@Override
	public CustomizeTemplate getCustomTemplateData(Integer idCustomizeTemplate) {
		
		List<CustomizeTemplate> list = new ArrayList<CustomizeTemplate>();
		
		try {
				
				Criteria criteria = sessionFactory.openSession().createCriteria(CustomizeTemplate.class);
				criteria.add(Restrictions.eq("deleted","N"));
				criteria.add(Restrictions.eq("idCustomizeTemplate", idCustomizeTemplate));
				
				list = criteria.list();
				
			}catch (Exception e) {
				logger.error("getCustomTemplateData Exception--> ",e);
			}
			return list.get(0);
	}

	@Override
	public int saveOPDClinicalEvaluation(OPDClinicalEvaluationDto obj, Integer treatmentId, HttpServletRequest request) {
		
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			if (obj.getClinicalEvalId() == 0) {
				obj.setCreatedBy(userId);
				//obj.setUnitId(unitId);
				
				TreatmentDto treatDTO = (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class, treatmentId);
				obj.setTreatmentDto(treatDTO);
				
				sessionFactory.getCurrentSession().merge(obj);
				return 1;
				
				
			} else {
				obj.setUpdatedBy(userId);
				//obj.setUnitId(unitId);
				
				TreatmentDto treatDTO = (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class, treatmentId);
				obj.setTreatmentDto(treatDTO);
				
				sessionFactory.getCurrentSession().merge(obj);
				return 2;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public OPDClinicalEvaluationDto fetchClinicalEvalTempDataByTreatmentId(Integer treatmentId, HttpServletRequest request) {
		
		logger.info("-----IN OPDClinicalEvaluationDaoImpl fetchClinicalEvalTempDataByTreatmentId --> ");
		
		HttpSession session = request.getSession();
		int unitId = (int) session.getAttribute("uId");
		
		List<OPDClinicalEvaluationDto> list = new ArrayList<OPDClinicalEvaluationDto>();
		
		try {
			
			TreatmentDto treatmentDto = (TreatmentDto) sessionFactory.openSession().get(TreatmentDto.class, treatmentId);
			
			Criteria criteria = sessionFactory.openSession().createCriteria(OPDClinicalEvaluationDto.class);
			criteria.add(Restrictions.eq("deleted","N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			criteria.add(Restrictions.eq("treatmentDto", treatmentDto));
			list = criteria.list();
			
		}catch (Exception e) {
			logger.error("fetchClinicalEvalTempDataByTreatmentId Exception--> ",e);
		}
		
		
//		return list.get(0);
		
		if(list != null && list.size() != 0){
			 return list.get(0);
		}else {
			return null;
		}
	}

}
