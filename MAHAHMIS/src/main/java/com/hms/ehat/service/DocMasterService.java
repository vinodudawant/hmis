package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.DocMasterDto;
import com.hms.dto.DocUploadDto;
import com.hms.ehat.dto.DocChecklistDto;
import com.hms.ehat.dto.PatientDocMasterDto;
import com.hms.ehat.dto.PatientDocSlaveDto;

public interface DocMasterService{
	
	List<DocMasterDto> getAllTreatMentByPatientId(Integer deptId,Integer patID,String Callform); 
	List<DocUploadDto> getPatientDocDeatil(String  fromDate,String toDate, String callform,DocUploadDto docobj, String byname1, String patSearchType);  
	int savePatientDocument(DocUploadDto docobj);
	boolean deleteDocDetails(Integer docId, HttpServletRequest request);
	List<PatientDocSlaveDto> getPatientDetailsByTreatment(Integer treatmentId);
	List<PatientDocMasterDto> getAllPatientDocDeatil(String fromDate, String toDate, String byname1, String patSearchType);
	List<DocUploadDto> getAllTreatmentDetailsByPatientId(Integer patientId);
	boolean deletePatientDocByPatientDocId(Integer patientDocId,HttpServletRequest request);
	List<DocChecklistDto> getPatientDetailsByTreatment1(Integer treatmentId);
	DocChecklistDto getAllUploadDocDetailBytreatment(Integer treatmentId);
	List<DocMasterDto> fetchPatientsRecordByTreatmentIdForBarcode(
			Integer treatmentId);
	
}
