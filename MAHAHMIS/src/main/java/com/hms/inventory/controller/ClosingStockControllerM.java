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

import com.hms.inventory.dto.ClosingStockDto;
import com.hms.inventory.service.ClosingStockServiceM;

@Controller
@RequestMapping(value="/inventoryClosingStock")
public class ClosingStockControllerM {

	@Autowired
	private ClosingStockServiceM closingStockServiceM;
	
	@Autowired
	private ClosingStockDto closingStockDto;
	
	static Logger log=Logger.getLogger(ClosingStockControllerM.class.getName());
	
	/**
	 * 
	 * @param itemName
	 * @return
	 */
	@RequestMapping("/itemQuantityFromBatchStock")
	@ResponseBody
	public int itemQuantityFromBatchStock(@RequestParam("itemName") String itemName,HttpServletRequest request){
		int response = closingStockServiceM.itemQuantityFromBatchStock(itemName,request);
		log.debug("reponse itemQuantityFromBatchStock....."+response);
		return response;
		
	}
	
	
	/**
	 * 
	 * @param closingStockDto
	 * @return
	 */
	@RequestMapping(value="/saveClosingStock")
	@ResponseBody
	public int  saveOpeningStock(ClosingStockDto closingStockDto,@RequestParam("itemInfoDtoDetails") String itemInfoDtoDetails, HttpServletRequest request){
			int response= closingStockServiceM.saveClosingStock(closingStockDto, itemInfoDtoDetails,request);
			log.debug("reponse saveOpeningStock....."+response);
			return response;
	}
	
	/**
	 * 
	 * @param get All Closing Stock
	 * @return
	 */
	@RequestMapping(value="/getAllClosingStockRecordsDetails")
	@ResponseBody
	public ClosingStockDto  getAllClosingStockRecordsDetails(HttpServletRequest request,@RequestParam("unitId") Integer unitId){
		Integer count = closingStockServiceM.getPageCountAllClosingStock(request);
		List<ClosingStockDto> closingStockDtos=new ArrayList<ClosingStockDto>();
		closingStockDtos= closingStockServiceM.getAllClosingStockRecordsDetails(request, unitId);
		closingStockDto.setLstclosingstockmaster(closingStockDtos);
		closingStockDto.setNoOfPages(count);
		log.debug("reponse getAllClosingStockRecordsDetails....."+closingStockDtos);
		return closingStockDto;
	}
	
	/**
	 * @since 04-07-2020
	 * @comment This function is created for to getClosingStockPagination
	 * @author Rohit Sandbhor
	 * @param startIndex
	 * @return
	 */
	@RequestMapping(value = "/getClosingStockPagination", method = RequestMethod.POST)
	public @ResponseBody ClosingStockDto getClosingStockPagination(@RequestParam("startIndex") Integer startIndex,HttpServletRequest request) {
		log.debug("reponse getClosingStockPagination.....");
		return closingStockServiceM.getClosingStockPagination(startIndex,request);
	}
	
}
