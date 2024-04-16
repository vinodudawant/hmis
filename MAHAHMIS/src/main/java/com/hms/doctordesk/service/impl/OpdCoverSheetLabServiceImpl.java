package com.hms.doctordesk.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.OpdCoverSheetLabDao;
import com.hms.doctordesk.dto.OPDIPDLabTestResultDTO;
import com.hms.doctordesk.service.OpdCoverSheetLabService;
import com.hms.dto.RisImageUploadDTO;
import com.hms.pathology.dto.PathologyTemplateRotineValueDTO;

@Service
@Transactional
public class OpdCoverSheetLabServiceImpl implements OpdCoverSheetLabService {

	@Autowired
	OpdCoverSheetLabDao OpdCoverSheetLabDao;
	
	@Override
	public List<RisImageUploadDTO> fetchInvestigationXrayImage(Integer treatmentId,Integer testId,Integer billdetailsid) {
		
		return OpdCoverSheetLabDao.fetchInvestigationXrayImage(treatmentId,testId,billdetailsid);
	}

	@Override
	public OPDIPDLabTestResultDTO getOPDIPDLabtestResult(int treatmentId, int billDetailsId, String age, String ageIn, String sexType) {
		
		return OpdCoverSheetLabDao.getOPDIPDLabtestResult(treatmentId, billDetailsId, age, ageIn,sexType);
	}

	@Override
	public PathologyTemplateRotineValueDTO getTemplateWistTestResult(int treatmentId, int billDetailsId) {
		// TODO Auto-generated method stub
		return OpdCoverSheetLabDao.getTemplateWistTestResult(treatmentId, billDetailsId);
	}

}
