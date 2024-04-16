package com.hms.inventory.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.dto.ProcessPurchaseOrderDTO;

public interface PurchaseRequestService {
	public int savePurchaseRequestMaster(MrnMasterDTO mrnobj,String itemInfoDtoDetails,HttpServletRequest request);

	public List<MrnMasterDTO> getAllPurchaseRequestMaster(HttpServletRequest request,Integer unitId,String call);

	public boolean rejectPurchaseRequestMaster(Integer mrnId,String mrnrejectremark, HttpServletRequest request);

	public MrnMasterDTO reviewPurchaseRequestMaster(Integer mrnId);
	
	public int saveProcessPurchaseOrderMaster(ProcessPurchaseOrderDTO pobj,String itemInfoDtoDetails,HttpServletRequest request);


}
