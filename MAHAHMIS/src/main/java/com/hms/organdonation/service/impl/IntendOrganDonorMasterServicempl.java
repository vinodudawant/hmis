package com.hms.organdonation.service.impl;

import java.util.List;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.organdonation.dao.IntendOrganDonorMasterDao;
import com.hms.organdonation.dto.IntendOrganDonorMasterDto;
import com.hms.organdonation.service.IntendOrganDonorMasterService;

@Service
@Transactional
public class IntendOrganDonorMasterServicempl implements IntendOrganDonorMasterService {

	@Autowired
	private IntendOrganDonorMasterDao intendOrganDonorMasterDao;

	@Override
	public int saveIntendOrganDonorMaster(IntendOrganDonorMasterDto obj,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return intendOrganDonorMasterDao.saveIntendOrganDonorMaster(obj, request);
	}

	@Override
	public List<IntendOrganDonorMasterDto> getAllIntendOrganDonorMaster(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return intendOrganDonorMasterDao.getAllIntendOrganDonorMaster(request);
	}

	@Override
	public IntendOrganDonorMasterDto editIntendOrganDonorMaster(
			Integer intendOrganDonorId) {
		// TODO Auto-generated method stub
		return intendOrganDonorMasterDao.editIntendOrganDonorMaster(intendOrganDonorId);
	}

	@Override
	public boolean deleteIntendOrganDonorMaster(Integer intendOrganDonorId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return intendOrganDonorMasterDao.deleteIntendOrganDonorMaster(intendOrganDonorId, request);
	}

	@Override
	public List<IntendOrganDonorMasterDto> intendOrganDonorMasterAutoSuggestion(
			String intendOrganDonor) {
		// TODO Auto-generated method stub
		return intendOrganDonorMasterDao.intendOrganDonorMasterAutoSuggestion(intendOrganDonor);
	}
	
	
}
