package com.hms.ehat.dao;

import java.util.List;

import com.hms.dto.DocMasterDto;
import com.hms.dto.DocUploadDto;
import com.hms.ehat.dto.DocChecklistDto;
import com.hms.ehat.dto.PatientDocMasterDto;
import com.hms.ehat.dto.PatientDocSlaveDto;

public interface DocMasterDao{
	
	List<DocMasterDto> getAllTreatMentByPatientId(Integer deptId,Integer patID,String Callform);
	List<DocUploadDto> getPatientDocDeatil(String  fromDate,String toDate,String callform,DocUploadDto docobj, String byname1, String patSearchType);   
	int	savePatientDocument(DocUploadDto docobj);
	boolean deleteDocDetails(DocUploadDto docobj);
	List<PatientDocSlaveDto> getPatientDetailsByTreatment(Integer treatmentId);
	List<PatientDocMasterDto> getAllPatientDocDeatil(String fromDate, String toDate, String byname1, String patSearchType);
	List<DocUploadDto> getAllTreatmentDetailsByPatientId(Integer patientId);
	boolean deletePatientDocByPatientDocId(PatientDocMasterDto obj);
	public List<DocChecklistDto> getPatientDetailsByTreatment1(Integer treatmentId);
	public DocChecklistDto getAllUploadDocDetailBytreatment(Integer treatmentId);
	List<DocMasterDto> fetchPatientsRecordByTreatmentIdForBarcode(
			Integer treatmentId);




}
