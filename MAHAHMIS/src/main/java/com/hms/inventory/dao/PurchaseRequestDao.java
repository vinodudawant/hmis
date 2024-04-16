package com.hms.inventory.dao;

import java.util.List;

import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.dto.ProcessPurchaseOrderDTO;

public interface PurchaseRequestDao {
	public int savePurchaseRequestMaster(MrnMasterDTO mrnobj);

	public List<MrnMasterDTO> getAllPurchaseRequestMaster(Integer unitId,String call);
	
	public boolean rejectPurchaseRequestMaster(MrnMasterDTO mrnobj);
	
	public MrnMasterDTO reviewPurchaseRequestMaster(Integer mrnId);
	
	public int saveProcessPurchaseOrderMaster(ProcessPurchaseOrderDTO pobj);



}
