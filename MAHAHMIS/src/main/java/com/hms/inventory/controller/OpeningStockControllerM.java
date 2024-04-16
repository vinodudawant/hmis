package com.hms.inventory.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.inventory.dto.OpeningStockDto;
import com.hms.inventory.service.OpeningStockServiceM;


@Controller
@RequestMapping(value="/inventoryOpeningStock")
public class OpeningStockControllerM {

	static Logger log=Logger.getLogger(OpeningStockControllerM.class.getName());
	
	@Autowired
	private OpeningStockServiceM openingStockServiceM;
	@Autowired
	private OpeningStockDto openingStockDto;
	
	/**
	 * 
	 * @param openingStockItemSlaveDetails
	 * @param batchStockSlaveDetails
	 * @param openingStockDto
	 * @return
	 */
	@RequestMapping(value="/saveOpeningStock")
	@ResponseBody
	public int  saveOpeningStock(@RequestParam("openingStockItemSlaveDetails") String openingStockItemSlaveDetails,
			@RequestParam("batchStockSlaveDetails") String batchStockSlaveDetails,
			@RequestParam("itemAssetMaintenanceOpeningInfoDtoDetails") String itemAssetMaintenanceOpeningInfoDtoDetails,
			@RequestParam("itemAssetMaintenanceInfoMasterDtoDetails") String itemAssetMaintenanceInfoMasterDtoDetails,
			OpeningStockDto openingStockDto,HttpServletRequest request){
			int response= openingStockServiceM.saveOpeningStock(openingStockDto,openingStockItemSlaveDetails,batchStockSlaveDetails,itemAssetMaintenanceOpeningInfoDtoDetails,itemAssetMaintenanceInfoMasterDtoDetails,request);
			
			log.debug("reponse saveOpeningStock....."+response);
			return response;
	}
	
	/**
	 * @author Rohit Sandbhor
	 * @since 26-11-2019
	 * @comment This method is created to get all opening stock records
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getAllOpeningStockRecordsDetails", method = RequestMethod.GET)
	public @ResponseBody
	OpeningStockDto getAllOpeningStockRecordsDetails(HttpServletRequest request) {
		Integer count = openingStockServiceM.getPageCountAllOpeningStock(request);
		List<OpeningStockDto> openingStockDtos = new ArrayList<OpeningStockDto>();
		openingStockDtos = openingStockServiceM.getAllOpeningStockRecords(request);
		openingStockDto.setOpeningStockDtos(openingStockDtos);
		openingStockDto.setNoOfPages(count);
		log.debug("reponse getAllOpeningStockRecordsDetails....."+openingStockDtos);
		return openingStockDto;
	}
	
	/**
	 * @since 21-04-2020
	 * @comment This function is created for to getOpeningStockPagination
	 * @author Rohit Sandbhor
	 * @param startIndex
	 * @return
	 */
	@RequestMapping(value = "/getOpeningStockPagination", method = RequestMethod.POST)
	public @ResponseBody OpeningStockDto getOpeningStockPagination(@RequestParam("startIndex") Integer startIndex,HttpServletRequest request) {
		log.debug("reponse getOpeningStockPagination.....");
		return openingStockServiceM.getOpeningStockPagination(startIndex,request);
	}
}
