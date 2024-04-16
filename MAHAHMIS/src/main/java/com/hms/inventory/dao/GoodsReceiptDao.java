package com.hms.inventory.dao;

import java.util.List;

import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.dto.MrnMasterItemInfoDTO;

public interface GoodsReceiptDao {
	
	List<MrnMasterDTO> getMrnData();
	
	List<MrnMasterDTO> getMrnDataById(int id);
	
	List<MrnMasterItemInfoDTO> getMrnDataForReport(int id);
}
