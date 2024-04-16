package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.Labheadings;
import com.hms.ehat.dto.LabRequestDTO;
import com.hms.ehat.dto.LabResultMstViewDto;
import com.hms.ehat.dto.LabTestResultDto;

public interface LabService {

	int sendToLab(int patientId, int treatmentId, String subList, int deptId,
			HttpServletRequest request);

	String getStringValOfObject(String tableName, String columnName,int pkId,String pkColumn);
	//Added by Laxman on 01-Feb-2018.
	int saveLabTestResult(LabTestResultDto labResultDto, HttpServletRequest request);
	//Added by Laxman on 05-Feb-2018.
	int updateLabRequestMst(LabRequestDTO labReqDto, String btnType, HttpServletRequest request);
	
	LabRequestDTO fetchonloadTestResult(int labReqMstId, HttpServletRequest request);

	String checkSampleCol(int labReqMstId, HttpServletRequest request);

	String checkSamplAccpted(int labReqMstId, HttpServletRequest request);

	LabResultMstViewDto getLabTestPatientSearch(String strValue,
			String strBarcode, String txtFdate, String txtTdate,
			String type, HttpServletRequest request);

	int changeStatusOfLabRprt(String type, String labReqIdList, HttpServletRequest request);

	int savePatientTestTemplate(LabTestResultDto labTestResultDto,
			HttpServletRequest request);

	Labheadings getLabFormulaHeading(String type, HttpServletRequest request);

	Labheadings featchLabFormulaPro(String isCategory, String idHed,
			String type, HttpServletRequest request);

	int getAllOPDPatientsCount();

	int getTodaysOPDPatientsCount();
}
