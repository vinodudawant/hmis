package com.hms.ehat.service;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.DocMasterDto;
import com.hms.dto.DocUploadDto;
import com.hms.ehat.dto.FileUpdationDto;
import com.hms.ehat.dto.PatientDocMasterDto;
import com.hms.ehat.dto.PatientDocSlaveDto;

public interface PatientDocService {
	
	public int savePatientDoc(PatientDocMasterDto objmaster,String docId,FileUpdationDto fileobj);

	public List<PatientDocSlaveDto> viewPatientDocDetails(Integer patientDocId,String callFrom);

	public Set<Integer> getAllPatientTreatmentByPatientId(
			Integer patientId);

	public List<PatientDocMasterDto> getPatientDetailByShelf(Integer shelfID);

	public boolean deletePatientfDocDetailByDocID(Integer docId,
			HttpServletRequest request);

	public List<DocMasterDto> getAllTreatMentByPatientId(Integer deptId,
			Integer patId, String callform);

	public List<Integer> getCountDetailOfDMSAndMRD(String fromDate,
			String toDate);
	public int getTreatMentCount(Integer treatmentId);

}
