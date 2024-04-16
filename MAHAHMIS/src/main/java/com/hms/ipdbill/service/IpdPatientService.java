package com.hms.ipdbill.service;

import java.util.List;

import com.hms.ipdbill.dto.IpdPatientsDto;

public interface IpdPatientService {

	public List<IpdPatientsDto> autoSuggestationIpdPatients(Integer unit_id, String callFrom,
			String findText,int wardType,Integer startIndex,int wardName,String activeBlock);

	public List<IpdPatientsDto> autoSuggestationPhyDischarge(Integer unit_id, String callFrom, String findText,
			Integer wardType, Integer wardName,Integer startIndex);
	
	public List<IpdPatientsDto> getAllRecordForCosentForm(Integer unit_id, String callFrom,
			String findText,int deptId);
	
	Integer getTotalBedCount(Integer wardType,Integer wardName);

	public Integer getAllActivePatCount();

	public Integer getAllPhyDiscPatientCount();
	
}
