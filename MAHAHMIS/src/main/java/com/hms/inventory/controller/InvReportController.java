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

import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.GoodsIssueMrnItemSlaveDto;
import com.hms.inventory.dto.InvReportDto;
import com.hms.inventory.dto.SubInventoryMasterDto;
import com.hms.inventory.service.InvReportService;

@Controller
@RequestMapping(value = "/invReports")
public class InvReportController {

	static Logger log=Logger.getLogger(InvReportController.class.getName());
	
	@Autowired
	private InvReportService invReportService;
	
	@Autowired
	BatchStockDto batchStock;
	
	@Autowired
	private GoodsIssueMrnItemSlaveDto goodsIssueMrnItemSlaveDto;

	/**
	 * @since 19-11-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for get all Item Stock Below Minimum Level Report details
	 */
	@RequestMapping(value = "/getAllItemStockBelowMinimunLevelReport", method = RequestMethod.GET)
	@ResponseBody
	public List<InvReportDto>  getAllItemStockBelowMinimunLevelReport(HttpServletRequest request) {
		List <InvReportDto> lst = new  ArrayList<InvReportDto>();
		log.info("in class InvReportController this is method getAllItemStockBelowMinimunLevelReport....");
		lst = invReportService.getAllItemStockBelowMinimunLevelReport(request);
		return lst;
	}
	
		
	
	/**
	 * @since 07-02-2020
	 * @author Dayanand Khandekar
	 * @codeFor below method is created for get all Item Expiry Report details
	 */
	@RequestMapping(value = "/getallitemexpiraydatereport", method = RequestMethod.GET)
	@ResponseBody
	public List<InvReportDto>  getAllItemExpirayDateReport(@RequestParam("fromuserDate") String fromuserDate,@RequestParam("touserDate") String touserDate,HttpServletRequest request) {
		List <InvReportDto> lst = new  ArrayList<InvReportDto>();
		System.err.println("date..."+fromuserDate);
		String newUserDate1[]=fromuserDate.split("-");
		String newUserDate=newUserDate1[0]+"-"+newUserDate1[1];
		System.err.println(newUserDate);
		log.info("getallitemexpiraydatereport....");
		lst = invReportService.getAllItemExpirayDateReport(fromuserDate,touserDate, request);
		return lst;
	}
	
	/**
	 * @since 19-11-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for get all Item Stock Below Minimum Level Report details
	 */
	@RequestMapping(value = "/getAllItemOpeningStockReport", method = RequestMethod.GET)
	@ResponseBody
	public List<InvReportDto>  getAllItemOpeningStockReport(HttpServletRequest request) {
		List <InvReportDto> lst = new  ArrayList<InvReportDto>();
		log.info("in class InvReportController this is method getAllItemOpeningStockReport....");
		lst = invReportService.getAllItemOpeningStockReport(request);
		return lst;
	}
	
	
	/**
	 * @since 07-02-2020
	 * @author Dayanand Khandekar
	 * @codeFor below method is created for get all Item Expiry Report details
	 */
	@RequestMapping(value = "/getItemDetailsByCategoryWise", method = RequestMethod.GET)
	@ResponseBody
	public List<InvReportDto>  getItemDetailsByCategoryWise(@RequestParam("categoryType") Integer categoryType,@RequestParam("categoryId") Integer categoryId,HttpServletRequest request) {
		List <InvReportDto> lst = new  ArrayList<InvReportDto>();
		log.info("getItemDetailsByCategoryWise....");
		lst = invReportService.getItemDetailsByCategoryWise(request, categoryType, categoryId);
		return lst;
	}
	
	
	/**
	 * @since 27-08-2020
	 * @author Vishnu Thorat
	 * @codeFor below method is created for get all Good Receipt Note Report Reports details
	 */
	@RequestMapping(value = "/getGoodReceiptNoteReports", method = RequestMethod.GET)
	@ResponseBody
	public List<InvReportDto>  getGoodReceiptNoteReports(HttpServletRequest request) {
		List <InvReportDto> lst = new  ArrayList<InvReportDto>();
		log.info("getGoodReceiptNoteReports....");
		lst = invReportService.getGoodReceiptNoteReports(request);
		return lst;
	}
	
	/**
	 * @since 28-08-2020
	 * @author Vishnu Thorat
	 * @codeFor below method is created for get all MRN Issue Report details
	 */
	@RequestMapping(value = "/getMrnIssueReports", method = RequestMethod.GET)
	@ResponseBody
	public List<InvReportDto>  getMrnIssueReports(HttpServletRequest request) {
		List <InvReportDto> lst = new  ArrayList<InvReportDto>();
		log.info("getMrnIssueReports....");
		lst = invReportService.getMrnIssueReports(request);
		return lst;
	}
	
	/**
	 * @since 02-09-2020
	 * @author Rohit Sandbhor
	 * @codeFor below method is created for get all Stock Return Report details
	 */
	@RequestMapping(value = "/getStockReturnReports", method = RequestMethod.GET)
	@ResponseBody
	public List<InvReportDto>  getStockReturnReports(HttpServletRequest request) {
		List <InvReportDto> lst = new  ArrayList<InvReportDto>();
		log.info("getStockReturnReports....");
		lst = invReportService.getStockReturnReports(request);
		return lst;
	}
	
	@RequestMapping(value = "/getInventoryStockReport", method = RequestMethod.GET)
	@ResponseBody
	public BatchStockDto getInventoryStockReport(HttpServletRequest request) {
		List<BatchStockDto> response = invReportService.getInventoryStockReport(request);
		batchStock.setLstBatchStockDto(response);
		log.debug("this is getInventoryStockReport...."+response);
		return batchStock;
	}
	
	@RequestMapping(value = "/getInventoryStockAutoSuggestion", method = RequestMethod.GET)
	@ResponseBody
	public BatchStockDto stockItemAutoSuggestion(
			@RequestParam("itemName") String itemName,
			@RequestParam("callFrom") String callFrom,HttpServletRequest request) {
		BatchStockDto batchStockDto = new BatchStockDto();
		batchStockDto = invReportService.getInventoryStockAutoSuggestion(itemName,
				callFrom,request);
		log.debug("this is getInventoryStockAutoSuggestion...."+batchStockDto);
		return batchStockDto;
	}
	
	@RequestMapping(value = "/getAllItemById", method = RequestMethod.GET)
	@ResponseBody
	public BatchStockDto getAllItemById(@RequestParam("item_id") Integer item_id,HttpServletRequest request) {
		List<BatchStockDto> response = invReportService
				.searchItemById(item_id,request);
		batchStock.setLstBatchStockDto(response);
		log.debug("this is getallItemById...."+response);
		return batchStock;

	}
	
	@RequestMapping(value = "/getSubInvBySuggestion", method = RequestMethod.GET)
	@ResponseBody
	public SubInventoryMasterDto subInventoryAutoSuggestion(
			@RequestParam("subInvName") String subInvName,
			@RequestParam("callFrom") String callFrom,HttpServletRequest request) {
		SubInventoryMasterDto subInventoryMasterDto = new SubInventoryMasterDto();
		subInventoryMasterDto = invReportService.subInventorySearchResult(
				subInvName, callFrom,request);
		log.debug("this is subInventoryAutoSuggestion...."+subInventoryMasterDto);
		return subInventoryMasterDto;
	}
	
	@RequestMapping(value = "/getSubInvStockById", method = RequestMethod.GET)
	@ResponseBody
	public BatchStockDto getSubInvStockById(
			@RequestParam("subInvId") Integer subInvId,HttpServletRequest request) {
		List<BatchStockDto> response = invReportService
				.getSubInDataById(subInvId,request);
		batchStock.setLstBatchStockDto(response);
		log.debug("this is getSubInvItemById...."+response);
		return batchStock;
	}
	
	@RequestMapping(value = "/getAllSubInvStock", method = RequestMethod.GET)
	@ResponseBody
	public GoodsIssueMrnItemSlaveDto getAllSubInvStock(HttpServletRequest request) {
		List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos = invReportService.getAllSubInvStock(request);
		goodsIssueMrnItemSlaveDto.setGoodsIssueMrnItemSlaveDtos(goodsIssueMrnItemSlaveDtos);
		log.debug("this is getAllSubInvStock...."+goodsIssueMrnItemSlaveDtos);
		return goodsIssueMrnItemSlaveDto;
	}
}
