package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.OPDIPDLabTestResultDTO;
import com.hms.dto.RisImageUploadDTO;
import com.hms.ehat.dto.CpoeServdetails;
import com.hms.pathology.dto.PathologyTemplateRotineValueDTO;

public interface OpdCoverSheetLabService {

	List<RisImageUploadDTO> fetchInvestigationXrayImage(Integer treatmentId, Integer testId, Integer billdetailsid);
	
	OPDIPDLabTestResultDTO getOPDIPDLabtestResult(int treatmentId,int billDetailsId,String age,String ageIn,String sexType);
	
	PathologyTemplateRotineValueDTO  getTemplateWistTestResult(int treatmentId,int billDetailsId);
	
}
