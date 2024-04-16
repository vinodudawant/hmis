package com.hms.ipd.dao;

import java.util.List;

import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ipd.dto.DischargeSummaryListDTO;
import com.hms.ipd.dto.OTTypeDTO;
import com.hms.ipd.dto.OperatianSummaryListDTO;

public interface IPDManagementDAO {

	List<ChargesMasterSlave> getAvailableBed(int unitID);

	List<DischargeSummaryListDTO> dischargeSummaryList();

	List<OperatianSummaryListDTO> operatianSummaryList();

	List<OTTypeDTO> fetchOTName();
	List<ChargesMasterSlave>  getBedStacticsData( Integer unitId);
	

}
