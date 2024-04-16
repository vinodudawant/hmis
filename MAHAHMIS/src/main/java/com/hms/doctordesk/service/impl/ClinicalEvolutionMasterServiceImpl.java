package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import com.hms.doctordesk.dao.ClinicalEvolutionMasterDao;
import com.hms.doctordesk.dto.ClinicalEvolutionMasterDto;
import com.hms.doctordesk.service.ClinicalEvolutionMasterService;


@Service
@Transactional
public class ClinicalEvolutionMasterServiceImpl implements ClinicalEvolutionMasterService {
	@Autowired
	ClinicalEvolutionMasterDao clinicalEvolutionMasterDao;
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveClinicalEvolutionMaster(ClinicalEvolutionMasterDto clinical, HttpServletRequest request) {
		return clinicalEvolutionMasterDao.saveClinicalEvolutionMaster(clinical,request);
	}

	@Override
	public List<ClinicalEvolutionMasterDto> getAllClinialEvolutionMaster(HttpServletRequest request) {
		return clinicalEvolutionMasterDao.getAllClinialEvolutionMaster(request);
	}

	@Override
	public ClinicalEvolutionMasterDto editClinicalEvolutionMaster(Integer clinicalId) {
		return clinicalEvolutionMasterDao.editClinicalEvolutionMaster(clinicalId);
	}
	
	@Override
	public boolean deleteClinicalEvolutionMaster(Integer clinicalId, HttpServletRequest request) {
	
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
			return clinicalEvolutionMasterDao.deleteClinicalEvolutionMaster(clinicalId, userId);
		}

	@Override
	public List<ClinicalEvolutionMasterDto> centerClinicalEvolutionAutoSuggestion(String clinicalName,String clinicalCode) {
		return clinicalEvolutionMasterDao.centerClinicalEvolutionAutoSuggestion(clinicalName,clinicalCode);
	}

}
