package com.hms.inventory.service;

import java.util.List;

import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.dto.MrnMasterItemInfoDTO;

public interface GoodsReceiptService {
	
	List<MrnMasterDTO> getMrnData();
	
	List<MrnMasterDTO> getMrnDataById(int id);
	
	List<MrnMasterItemInfoDTO> getMrnDataForReport(Integer id);
}
