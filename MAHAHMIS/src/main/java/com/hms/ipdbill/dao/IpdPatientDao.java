package com.hms.ipdbill.dao;

import java.util.List;

import com.hms.ipdbill.dto.IpdPatientsDto;

public interface IpdPatientDao {

	List<IpdPatientsDto> autoSuggestationIpdPatients(Integer unit_id, String callFrom, String findText,int wardType,Integer startIndex,int wardName,String activeBlock);

	List<IpdPatientsDto> autoSuggestationPhyDischarge(Integer unit_id, String callFrom, String findText,
			Integer wardType, Integer wardName,Integer startIndex);
	
	public List<IpdPatientsDto> getAllRecordForCosentForm(Integer unit_id, String callFrom,
			String findText,int deptId);
	
	Integer getTotalBedCount(Integer wardType,Integer wardName);

	Integer getAllActivePatCount();

	Integer getAllPhyDiscPatientCount();

}
