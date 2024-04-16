package com.hms.ehat.service.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.LabFormulaDao;
import com.hms.ehat.dto.LabFormulaDTO;
import com.hms.ehat.dto.LabFormulaHeadings;
import com.hms.ehat.service.LabFormulaService;

@Service
@Transactional
public class LabFormulaServiceImpl implements LabFormulaService{

	@Autowired
	LabFormulaDao labFormulaDao;

	@Override
	public String saveLabFormula(LabFormulaDTO labFormulaDTO, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		
		labFormulaDTO.setUnitId(unitId);
		labFormulaDTO.setCreatedBy(userId);
		
		return labFormulaDao.saveLabFormula(labFormulaDTO);
	}

	@Override
	public LabFormulaDTO getLabFormulaById(int labFormulaId) {
		return labFormulaDao.getLabFormulaById(labFormulaId);
	}

	@Override
	public boolean deleteLabFormula(int labFormulaId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		
		return labFormulaDao.deleteLabFormula(labFormulaId, userId);
	}

	@Override
	public LabFormulaHeadings getLabFormulaHeadings(String type, HttpServletRequest request) {
		return labFormulaDao.getLabFormulaHeadings(type, request);
	}

	@Override
	public LabFormulaHeadings featchLabFormulaPro(String isCategory, String idHed, String type,
			HttpServletRequest request) {
		return labFormulaDao.featchLabFormulaPro(isCategory,idHed,type,request);
	}

	@Override
	public LabFormulaDTO featchLabFormulas(String searchText, String searchType) {
		return labFormulaDao.featchLabFormulas(searchText, searchType);
	}

	@Override
	public LabFormulaDTO labFormulaAutoSugg(String searchText) {
		return labFormulaDao.labFormulaAutoSugg(searchText);
	}
}