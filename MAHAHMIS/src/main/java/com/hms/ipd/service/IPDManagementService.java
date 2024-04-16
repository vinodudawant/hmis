package com.hms.ipd.service;

import java.util.List;

import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ipd.dto.DischargeSummaryListDTO;
import com.hms.ipd.dto.OTTypeDTO;
import com.hms.ipd.dto.OperatianSummaryListDTO;

public interface IPDManagementService {

	List<ChargesMasterSlave> getAvailableBed(String action, String hallId);

	List<DischargeSummaryListDTO> dischargeSummaryList(String action);

	List<OperatianSummaryListDTO> operatianSummaryList(String action);

	List<OTTypeDTO> fetchOTName(String action);
	List<ChargesMasterSlave> getBedStacticsData(String action, Integer unitId);
	

}
