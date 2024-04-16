package com.hms.inventory.controller;

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
import com.hms.inventory.dto.SubInventoryMasterDto;
import com.hms.inventory.service.StockAuditService;

@Controller
@RequestMapping(value = "/stock")
public class StockAuditController {

	static Logger log=Logger.getLogger(StockAuditController.class.getName());
	
	@Autowired
	StockAuditService stockAuditService;
	
	@Autowired
	BatchStockDto batchStock;
	
	@Autowired
	private GoodsIssueMrnItemSlaveDto goodsIssueMrnItemSlaveDto;

	/*
	 * /*#Date:- 24-12-2019 #Author:- Arpit #CodeFor:- fetch list of stock
	 */
	@RequestMapping(value = "/getStockData", method = RequestMethod.GET)
	@ResponseBody
	public BatchStockDto getAllStocks(HttpServletRequest request) {
		Integer count =	stockAuditService.getPageCountAllStockAudit(request);
		List<BatchStockDto> response = stockAuditService.getStockAuditData(request);
		batchStock.setNoOfPages(count);
		batchStock.setLstBatchStockDto(response);
		log.debug("this is getAllStocks...."+response);
		return batchStock;
	}

	/*
	 * /*#Date:- 24-12-2019 #Author:- Arpit #CodeFor:- autosuggestion for stock
	 * Inventory Data
	 */
	@RequestMapping(value = "/getItemsBySuggestion", method = RequestMethod.GET)
	@ResponseBody
	public BatchStockDto stockItemAutoSuggestion(
			@RequestParam("itemName") String itemName,
			@RequestParam("callFrom") String callFrom,HttpServletRequest request) {
		BatchStockDto batchStockDto = new BatchStockDto();
		batchStockDto = stockAuditService.stockAuditAutoSuggestion(itemName,
				callFrom,request);
		log.debug("this is stockItemAutoSuggestion...."+batchStockDto);
		return batchStockDto;
	}

	/*
	 * /*#Date:- 24-12-2019 #Author:- Arpit #CodeFor:- fetch inventory data by
	 * id
	 */
	@RequestMapping(value = "/getAllItemById", method = RequestMethod.GET)
	@ResponseBody
	public BatchStockDto getallItemById(@RequestParam("item_id") Integer item_id,HttpServletRequest request) {
		List<BatchStockDto> response = stockAuditService
				.itemSearchResultById(item_id,request);
		batchStock.setLstBatchStockDto(response);
		log.debug("this is getallItemById...."+response);
		return batchStock;

	}

	/*
	 * /*#Date:- 26-12-2019 #Author:- Arpit #CodeFor:- autosuggestion for stock
	 * sub Inventory Data
	 */
	@RequestMapping(value = "/getSubInvBySuggestion", method = RequestMethod.GET)
	@ResponseBody
	public SubInventoryMasterDto subInventoryAutoSuggestion(
			@RequestParam("subInvName") String subInvName,
			@RequestParam("callFrom") String callFrom,HttpServletRequest request) {
		SubInventoryMasterDto subInventoryMasterDto = new SubInventoryMasterDto();
		subInventoryMasterDto = stockAuditService.subinventorySearchResult(
				subInvName, callFrom,request);
		log.debug("this is subInventoryAutoSuggestion...."+subInventoryMasterDto);
		return subInventoryMasterDto;
	}

	/*
	 * /*#Date:- 26-12-2019 #Author:- Arpit #CodeFor:- fetch all subInventory
	 * data
	 */
	@RequestMapping(value = "/getSubInvData", method = RequestMethod.GET)
	@ResponseBody
	public SubInventoryMasterDto getSubInvData(HttpServletRequest request) {
		SubInventoryMasterDto subInventoryMasterDto = stockAuditService
				.getSubInventoryData(request);
		log.debug("this is getSubInvData...."+subInventoryMasterDto);
		return subInventoryMasterDto;
	}

	/*
	 * /*#Date:- 26-12-2019 #Author:- Arpit #CodeFor:- fetch all subInventory
	 * data By Id
	 */
	/*@RequestMapping(value = "/getSubInvDataById", method = RequestMethod.GET)
	@ResponseBody
	public BatchStockDto getSubInvItemById(
			@RequestParam("subInvId") Integer subInvId,HttpServletRequest request) {
		Integer count = stockAuditService.getPageCountAllStockAuditItem(subInvId,request);
		List<BatchStockDto> response = stockAuditService
				.getSubInDataById(subInvId,request);
		batchStock.setLstBatchStockDto(response);
		batchStock.setNoOfPages(count);
		log.debug("this is getSubInvItemById...."+response);
		return batchStock;
	}*/
	
	@RequestMapping(value = "/getSubInvDataById", method = RequestMethod.GET)
	@ResponseBody
	public GoodsIssueMrnItemSlaveDto getSubInvItemById(
			@RequestParam("subInvId") Integer subInvId,HttpServletRequest request) {
		Integer count = stockAuditService.getPageCountAllStockAuditItem(subInvId,request);
		List<GoodsIssueMrnItemSlaveDto> list = stockAuditService.getSubInDataById(subInvId,request);
		goodsIssueMrnItemSlaveDto.setGoodsIssueMrnItemSlaveDtos(list);
		goodsIssueMrnItemSlaveDto.setNoOfPages(count);
		log.debug("this is getSubInvItemById...."+list);
		return goodsIssueMrnItemSlaveDto;
	}
	
	@RequestMapping(value = "/getStockAuditPagination", method = RequestMethod.POST)
	public @ResponseBody BatchStockDto getStockAuditPagination(@RequestParam("startIndex") Integer startIndex,HttpServletRequest request) {
		List<BatchStockDto> response =  stockAuditService.getStockAuditPagination(startIndex,request);
		batchStock.setLstBatchStockDto(response);
		log.debug("this is getStockAuditPagination...."+response);
		return batchStock;
	}
	
	@RequestMapping(value = "/getStockAuditItemPagination", method = RequestMethod.POST)
	public @ResponseBody BatchStockDto getStockAuditItemPagination(@RequestParam("startIndex") Integer startIndex, @RequestParam("id") Integer id,HttpServletRequest request) {
		List<BatchStockDto> response =  stockAuditService.getStockAuditItemPagination(startIndex, id,request);
		batchStock.setLstBatchStockDto(response);
		log.debug("this is getStockAuditItemPagination...."+response);
		return batchStock;
	}
	
}
