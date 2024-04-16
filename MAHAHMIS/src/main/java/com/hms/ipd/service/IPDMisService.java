package com.hms.ipd.service;

import java.util.List;

import com.hms.ipd.dto.IPDMisReportDTO;
import com.hms.ipd.dto.OPDMisReportDTO;

public interface IPDMisService {

	public List<IPDMisReportDTO> fetchIPDMisReport(String fromDate, String toDate, Integer searchBy);

	public List<OPDMisReportDTO> fetchOPDMisReport(String fromDate, String toDate, String searchBy,
			Integer specialityId, Integer doctorId);
}
