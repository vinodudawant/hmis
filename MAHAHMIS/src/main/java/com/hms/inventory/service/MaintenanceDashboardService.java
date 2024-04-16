package com.hms.inventory.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.ItemAssetMaintenanceMasterDto;

public interface MaintenanceDashboardService {
	
	public List<ItemAssetMaintenanceMasterDto> getWarrantyActionAlert(HttpServletRequest request);
	public List<ItemAssetMaintenanceMasterDto> getExpiredWarranty(HttpServletRequest request);
}
