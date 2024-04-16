package com.hms.ipdbill.service;

import java.util.List;

import com.hms.ipdbill.dto.IpdPreviousBillDTO;

public interface IpdPreviousBillService {
	
	public List<IpdPreviousBillDTO> autoSuggestationPreviousBillPatients(Integer unit_id, String callFrom,
			String findText, Integer startIndex);

	public Integer getPrevBillPatCount();

}
