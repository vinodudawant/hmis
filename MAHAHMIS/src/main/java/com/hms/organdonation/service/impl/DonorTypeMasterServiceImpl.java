package com.hms.organdonation.service.impl;

import java.util.List;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.organdonation.dao.DonorTypeMasterDao;
import com.hms.organdonation.dto.DonorTypeMasterDto;
import com.hms.organdonation.service.DonorTypeMasterService;

@Service
@Transactional
public class DonorTypeMasterServiceImpl implements DonorTypeMasterService {
	
	@Autowired
	DonorTypeMasterDao donorTypeMasterDao;

	@Override
	public int saveDonorTypeMaster(DonorTypeMasterDto obj,
			HttpServletRequest request) {
		
		return donorTypeMasterDao.saveDonorTypeMaster(obj, request);
	}

	@Override
	public List<DonorTypeMasterDto> getAllDonorTypeMaster(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorTypeMasterDao.getAllDonorTypeMaster(request);
	}

	@Override
	public DonorTypeMasterDto editDonorTypeMaster(Integer donorTypeId) {
		// TODO Auto-generated method stub
		return donorTypeMasterDao.editDonorTypeMaster(donorTypeId);
	}

	@Override
	public boolean deleteDonorTypeMaster(Integer donorTypeId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorTypeMasterDao.deleteDonorTypeMaster(donorTypeId, request);
	}

	@Override
	public List<DonorTypeMasterDto> donorTypeMasterAutoSuggestion(
			String donorType) {
		// TODO Auto-generated method stub
		return donorTypeMasterDao.donorTypeMasterAutoSuggestion(donorType);
	}

}
