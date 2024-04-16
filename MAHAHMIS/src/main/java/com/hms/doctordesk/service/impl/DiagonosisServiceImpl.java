package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dto.ICD10_L;
import com.hms.doctordesk.dao.DiagonosisDao;
import com.hms.doctordesk.dto.DiagonosisMasterDto;
import com.hms.doctordesk.service.DiagonosisService;

@Service
@Transactional
public class DiagonosisServiceImpl implements DiagonosisService {

	@Autowired
	DiagonosisDao diagonosisDao;

	@Override
	public List<ICD10_L> diagonosisAutoSuggestion(String searchText, String callFrom, int diagoType,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return diagonosisDao.diagonosisAutoSuggestion(searchText, callFrom, diagoType,request);
	}

	@Override
	public List<ICD10_L> getDiagonosisById(int id) {
		// TODO Auto-generated method stub
		return diagonosisDao.getDiagonosisById(id);
	}

	@Override
	public String saveDiagonosisData(DiagonosisMasterDto diagonosisMasterDto,Integer patientId,Integer treatmentId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return diagonosisDao.saveDiagonosisData(diagonosisMasterDto,patientId,treatmentId, request);
	}

	@Override
	public List<DiagonosisMasterDto> getListOfDiagoList(int treatmentId) {
		// TODO Auto-generated method stub
		return diagonosisDao.getListOfDiagoList(treatmentId);
	}

	@Override
	public List<DiagonosisMasterDto> getListOfDiagoListById(int id) {
		// TODO Auto-generated method stub
		return diagonosisDao.getListOfDiagoListById(id);
	}

	

	@Override
	public String deleteDiagonosis(String id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return diagonosisDao.deleteDiagonosis(id, request);
	}

	@Override
	public String updateDignosisStatus(String id, Integer userId, String callFrom, HttpServletRequest request) {
		
		return diagonosisDao.updateDignosisStatus(id, userId, callFrom, request);
	}

}
