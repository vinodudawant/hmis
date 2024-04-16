package com.hms.organdonation.service.impl;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.organdonation.dao.PreservationMethodMasterDao;
import com.hms.organdonation.dto.PreservationMethodMasterDto;
import com.hms.organdonation.service.PreservationMethodMasterService;

@Service
@Transactional
public class PreservationMethodMasterServiceImpl implements PreservationMethodMasterService {

	
	@Autowired
	PreservationMethodMasterDao preservationMethodMasterdao;
	

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int savePreservationMethodMaster(PreservationMethodMasterDto obj, HttpServletRequest request) {

		return preservationMethodMasterdao.savePreservationMethodMaster(obj, request);
	}

	@Override
	public List<PreservationMethodMasterDto> getAllPreservationMethodMaster(HttpServletRequest request) {

		return preservationMethodMasterdao.getAllPreservationMethodMaster(request);
	}

	@Override
	public PreservationMethodMasterDto editPreservationMethodMaster(Integer preservationMethodMasterId) {

		return preservationMethodMasterdao.editPreservationMethodMaster(preservationMethodMasterId);
	}

	

	@Override
	public boolean deletePreservationMethodMaster(Integer preservationMethodMasterId, HttpServletRequest request) {

		return preservationMethodMasterdao.deletePreservationMethodMaster(preservationMethodMasterId, request);
	}

	@Override
	public List<PreservationMethodMasterDto> preservationMethodMasterAutoSuggestion(
			String preservationMethodName) {

		return preservationMethodMasterdao.preservationMethodMasterAutoSuggestion(preservationMethodName);
	}
	

}