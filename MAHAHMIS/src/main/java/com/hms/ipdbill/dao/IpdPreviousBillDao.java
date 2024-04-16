package com.hms.ipdbill.dao;

import java.util.List;

import com.hms.ipdbill.dto.IpdPreviousBillDTO;

public interface IpdPreviousBillDao {

	
	List<IpdPreviousBillDTO> autoSuggestationPreviousBillPatients(Integer unit_id, String callFrom, String findText,Integer startIndex);
	
	Integer getPrevBillPatCount();
}
