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

import com.hms.inventory.dto.AssetComplaintMasterDto;
import com.hms.inventory.service.TicketManagementServiceM;

@Controller
@RequestMapping(value="/ticketManagementM")
public class TicketManagementControllerM {
	
	static Logger log=Logger.getLogger(TicketManagementControllerM.class.getName());
	
	@Autowired
	private TicketManagementServiceM ticketManagementServiceM;
	@Autowired
	private AssetComplaintMasterDto assetComplaintMasterDto;
	
	
	@RequestMapping(value = "/editAssetTicketManagement", method = RequestMethod.GET)
	@ResponseBody
	public AssetComplaintMasterDto editAssetTicketManagement(@RequestParam("id") Integer id) {
		assetComplaintMasterDto = ticketManagementServiceM.editAssetTicketManagement(id);
		return assetComplaintMasterDto;	
	}
	
	@RequestMapping(value="/saveAssetTicketManagement",method = RequestMethod.POST)
	@ResponseBody	
	public int  saveAssetTicketManagement(@RequestParam("assetTicketManagementSlaveDetails") String assetTicketManagementSlaveDetails,
								   AssetComplaintMasterDto assetComplaintMasterDto,HttpServletRequest request){
	    int response= ticketManagementServiceM.saveAssetTicketManagement(assetTicketManagementSlaveDetails,assetComplaintMasterDto,request);
		return response;
   }
	
	@RequestMapping(value = "/universalSearchAssetTicketManagement", method = RequestMethod.GET)
	public @ResponseBody AssetComplaintMasterDto universalSearchAssetTicketManagement(@RequestParam("productCategoryTicket") String productCategoryTicket, @RequestParam("assetNameTicket") String assetNameTicket,  
																		@RequestParam("fromDateTicket") String fromDateTicket, @RequestParam("toDateTicket") String toDateTicket, @RequestParam("department") Integer department, @RequestParam("hospitalDept") Integer hospitalDept,
																		@RequestParam("searchBy") String searchBy,@RequestParam("callFrom") String callFrom,HttpServletRequest request) {
		List<AssetComplaintMasterDto>  assetComplaintMasterDtos =new ArrayList<AssetComplaintMasterDto>();
		log.info("universalSearchAssetTicketManagement()...start");
		assetComplaintMasterDtos = ticketManagementServiceM.universalSearchAssetTicketManagement(productCategoryTicket, assetNameTicket, fromDateTicket, toDateTicket, department, hospitalDept, searchBy,callFrom, request);
		log.info("universalSearchAssetTicketManagement()...end");
		assetComplaintMasterDto.setLstAssetComplaintMasterDto(assetComplaintMasterDtos);
		return assetComplaintMasterDto;
	}
	
	@RequestMapping(value = "/getAllBreakdownRecords", method = RequestMethod.GET)
	@ResponseBody
	public AssetComplaintMasterDto  getAllBreakdownRecords(HttpServletRequest request) {
		List <AssetComplaintMasterDto> lst = new  ArrayList<AssetComplaintMasterDto>();
		log.info("in class TicketManagementControllerM this is method getAllBreakdownRecords....");
		lst = ticketManagementServiceM.getAllBreakdownRecords(request);
		assetComplaintMasterDto.setLstAssetComplaintMasterDto(lst);
		return assetComplaintMasterDto;
	}

}
