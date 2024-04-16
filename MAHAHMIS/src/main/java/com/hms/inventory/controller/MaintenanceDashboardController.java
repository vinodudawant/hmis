package com.hms.inventory.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.inventory.dto.ItemAssetMaintenanceMasterDto;
import com.hms.inventory.service.MaintenanceDashboardService;

@Controller
@RequestMapping(value="/maintenanceDashboard")
public class MaintenanceDashboardController {
	

	static Logger log=Logger.getLogger(MaintenanceDashboardController.class.getName());
	
	@Autowired
	private MaintenanceDashboardService maintenanceDashboardService;
	
	@Autowired
	ItemAssetMaintenanceMasterDto assetMaintenanceMasterDto;
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created to get all item master records
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getWarrantyActionAlert", method = RequestMethod.GET)
	public @ResponseBody
	ItemAssetMaintenanceMasterDto getWarrantyActionAlert(HttpServletRequest request) {
		List<ItemAssetMaintenanceMasterDto> lstItemAssetMaintenanceMaster = new ArrayList<ItemAssetMaintenanceMasterDto>();
		log.info("getAllItemAssetMaintenance..");
		lstItemAssetMaintenanceMaster = maintenanceDashboardService.getWarrantyActionAlert(request);
		assetMaintenanceMasterDto.setLstItemAssetMaintenanceMasterDto(lstItemAssetMaintenanceMaster);
	    log.debug("reponse getAllItemMasterRecords....."+lstItemAssetMaintenanceMaster);
		return assetMaintenanceMasterDto;
	}
	
	@RequestMapping(value = "/getExpiredWarranty", method = RequestMethod.GET)
	public @ResponseBody
	ItemAssetMaintenanceMasterDto getExpiredWarranty(HttpServletRequest request) {
		List<ItemAssetMaintenanceMasterDto> lstItemAssetMaintenanceMaster = new ArrayList<ItemAssetMaintenanceMasterDto>();
		log.info("getAllItemAssetMaintenance..");
		lstItemAssetMaintenanceMaster = maintenanceDashboardService.getExpiredWarranty(request);
		assetMaintenanceMasterDto.setLstItemAssetMaintenanceMasterDto(lstItemAssetMaintenanceMaster);
	    log.debug("reponse getAllItemMasterRecords....."+lstItemAssetMaintenanceMaster);
		return assetMaintenanceMasterDto;
	}
	
}
