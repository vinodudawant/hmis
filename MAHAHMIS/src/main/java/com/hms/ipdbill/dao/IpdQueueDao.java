package com.hms.ipdbill.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ipdbill.dto.AutosuggestionIpdQueueDto;
import com.hms.ipdbill.dto.IpdBillPatientsDTO;
import com.hms.ipdbill.dto.IpdQueueDTO;

public interface IpdQueueDao {

	
	List<AutosuggestionIpdQueueDto> autoSuggestationIpdQueue(Integer unit_id, String callFrom, String findText);
	
	List<IpdQueueDTO> getIpdQueue(Integer unitId,Integer startIndex,String callFrom);
	
	IpdQueueDTO getIpdQueuePatientByTreatmentId(Integer treatId);
	
	List<IpdBillPatientsDTO> autosuggesstionviewIpdbillPatients(String letter,
			String finalBill, String usertype,HttpServletRequest request);
	
	List<IpdBillPatientsDTO> autosuggesstionviewIpdbillPatients(String letter,String finalBill,HttpServletRequest request);

	Integer getIpdPatientCount();
}
