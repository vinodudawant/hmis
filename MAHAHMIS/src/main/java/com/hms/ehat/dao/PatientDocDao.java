package com.hms.ehat.dao;

import java.util.List;
import java.util.Set;

import com.hms.dto.DocMasterDto;
import com.hms.ehat.dto.FileUpdationDto;
import com.hms.ehat.dto.FolderDocDto;
import com.hms.ehat.dto.PatientDocMasterDto;
import com.hms.ehat.dto.PatientDocSlaveDto;

public interface PatientDocDao {
	int savePatientDoc(PatientDocMasterDto objmaster);
	public List<PatientDocSlaveDto> viewPatientDocDetails(Integer patientDocId,String callFrom);
	public Set<Integer> getAllPatientTreatmentByPatientId(Integer patientId);
	public List<PatientDocMasterDto> getPatientDetailByShelf(Integer shelfID);
	public boolean deletePatientfDocDetailByDocID(PatientDocMasterDto obj);
	int saveFileUpdationDto(FileUpdationDto obj);
	List<DocMasterDto> getAllTreatMentByPatientId(Integer deptId,Integer patID,String Callform);
	public List<Integer> getCountDetailOfDMSAndMRD(String fromDate,
			String toDate);





}
