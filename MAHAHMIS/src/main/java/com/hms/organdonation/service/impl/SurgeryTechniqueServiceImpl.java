package com.hms.organdonation.service.impl;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.organdonation.dao.SurgeryTechniqueDao;
import com.hms.organdonation.dto.SurgeryTechniqueDto;
import com.hms.organdonation.service.SurgeryTechniqueService;

@Service
@Transactional
public class SurgeryTechniqueServiceImpl implements SurgeryTechniqueService{

	@Autowired
	SurgeryTechniqueDao surgerytechniquedao;
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int saveSurgeryTechnique(SurgeryTechniqueDto obj, HttpServletRequest request) {

		return surgerytechniquedao.saveSurgeryTechnique(obj,request);
	}

	@Override
	public List<SurgeryTechniqueDto> getAllSurgeryTechnique(HttpServletRequest request) {

		return surgerytechniquedao.getAllSurgeryTechnique(request);
	}

	@Override
	public SurgeryTechniqueDto editSurgeryTechnique(Integer stId) {

		return surgerytechniquedao.editSurgeryTechnique(stId);
	}

	@Override
	public boolean deleteSurgeryTechnique(Integer stId, HttpServletRequest request) {

		return surgerytechniquedao.deleteSurgeryTechnique(stId, request);
	}

	@Override
	public List<SurgeryTechniqueDto> surgeryTechniqueAutoSuggestion(String stName) {

		return surgerytechniquedao.surgeryTechniqueAutoSuggestion(stName);
	}

	

}
