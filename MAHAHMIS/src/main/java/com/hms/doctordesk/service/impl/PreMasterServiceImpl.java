package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.doctordesk.dao.PreMasterDao;
import com.hms.doctordesk.dto.PreMasterList;
import com.hms.doctordesk.dto.PrescrptionMasterDto;
import com.hms.doctordesk.dto.RouteMaster;
import com.hms.doctordesk.service.PreMasterService;

@Service
@Transactional
public class PreMasterServiceImpl implements PreMasterService{

	@Autowired
	PreMasterDao preMasterDao;
	
	@Override
	public List<PreMasterList> getAutoSuggestion(String searchText,
			String callfrom) {
		// TODO Auto-generated method stub
		return preMasterDao.getAutoSuggestion(searchText, callfrom);
	}

	@Override
	public List<PreMasterList> getStrengthAndUom(int id) {
		// TODO Auto-generated method stub
		return preMasterDao.getStrengthAndUom(id);
	}

	@Override
	public List<RouteMaster> getRouteName(int id) {
		// TODO Auto-generated method stub
		return preMasterDao.getRouteName(id);
	}

	@Override
	public List<PrescrptionMasterDto> getPrescriptionById(int id) {
		// TODO Auto-generated method stub
		return preMasterDao.getPrescriptionById(id);
	}

	@Override
	public List<PrescrptionMasterDto> getPresList(int patOrTreatId,String callfrom) {
		// TODO Auto-generated method stub
		return preMasterDao.getPresList(patOrTreatId,callfrom);
	}

	@Override
	public String deletePrecription(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return preMasterDao.deletePrecription(id, request);
	}

	@Override
	public String savePrescription(PrescrptionMasterDto prescrptionMasterDto,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return preMasterDao.savePrescription(prescrptionMasterDto, request);
	}

}
