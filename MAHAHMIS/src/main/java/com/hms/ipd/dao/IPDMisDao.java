package com.hms.ipd.dao;

import java.util.List;

import com.hms.ipd.dto.IPDMisReportDTO;
import com.hms.ipd.dto.OPDMisReportDTO;

public interface IPDMisDao {

	public List<IPDMisReportDTO> fetchIPDMisReport(String fromDate, String toDate, Integer searchBy);
	
	public List<OPDMisReportDTO> fetchOPDMisReport(String fromDate, String toDate, String searchBy,
			Integer specialityId, Integer doctorId);
}
