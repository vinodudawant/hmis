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
import com.hms.inventory.dto.GoodReceiptNoteDto;
import com.hms.inventory.dto.PurchaseInvoiceDto;
import com.hms.inventory.service.InventoryServiceM;
import com.hms.inventory.service.PurchaseInvoiceService;



@Controller
@RequestMapping(value = "/invPurchaseInvoice")
public class PurchaseInvoiceController {

	static Logger log=Logger.getLogger(PurchaseInvoiceController.class.getName());
	@Autowired
	private PurchaseInvoiceService purchaseInvoiceService;
	
	@Autowired
	private PurchaseInvoiceDto purchaseInvoiceDto;
	
	@Autowired
	private InventoryServiceM inventoryServiceM;
	
	@Autowired
	private GoodReceiptNoteDto goodReceiptNoteDto;

	/**
	 * @since 19-11-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for save Purchase invoice details
	 */
	@RequestMapping(value = "/savePurchaseInvoice", method = RequestMethod.POST)
	@ResponseBody
	public int savePurchaseInvoice(PurchaseInvoiceDto purchaseInvoiceDto,
			@RequestParam("purchaseInvoiceItemDtoList") String lstpurchaseInvoiceItemDto,
			@RequestParam("batchStockDtoList") String batchStockDtoList,
			/*@RequestParam("batchMasterDtoList") String batchMasterDtoList,*/
			@RequestParam("partyMasterContactInfoDtoList") String purInvContactInfoDtoList,
			@RequestParam("partyMasterAddressInfoDtoList") String purInvAddressInfoDtoList,
			@RequestParam("partyMasterId") Integer partyMasterId,HttpServletRequest request) {
		System.err.println("lstpurchaseInvoiceItemDto..."+lstpurchaseInvoiceItemDto);
		System.err.println("batchStockDtoList..."+batchStockDtoList);
		System.err.println("purInvContactInfoDtoList..."+purInvContactInfoDtoList);
		System.err.println("purInvAddressInfoDtoList..."+purInvAddressInfoDtoList);
		int status =0;
		log.info("in class PurchaseInvoiceController this is method savePurchaseInvoice....");
			status = purchaseInvoiceService.savePurchaseInvoice(purchaseInvoiceDto, lstpurchaseInvoiceItemDto, batchStockDtoList,/* batchMasterDtoList,*/ purInvContactInfoDtoList, purInvAddressInfoDtoList, partyMasterId, request);
		log.debug("this is status...."+status);
		return status;
	}

	/**
	 * @since 19-11-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for get all purchase invoice details
	 */
	@RequestMapping(value = "/getAllPurchaseInvoice", method = RequestMethod.GET)
	@ResponseBody
	public PurchaseInvoiceDto getAllPurchaseInvoice(HttpServletRequest request) {
		
		
		log.info("in class PurchaseInvoiceController this is method getAllGoodReceiptNote....");
		List<PurchaseInvoiceDto> purchaseInvoiceDtoList = new ArrayList<PurchaseInvoiceDto>();
		purchaseInvoiceDtoList = purchaseInvoiceService.getAllPurchaseInvoice(request);
		purchaseInvoiceDto.setLstPurchaseInvoiceDto(purchaseInvoiceDtoList);
		log.debug("this is list purchaseInvoiceService...."+purchaseInvoiceDtoList);
		return purchaseInvoiceDto;
	}

	/**
	 * @since 19-11-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for Purchase invoice edit
	 */
	@RequestMapping(value = "/editPurchaseInvoice", method = RequestMethod.GET)
	@ResponseBody
	public PurchaseInvoiceDto editPurchaseInvoice(
			@RequestParam("id") Integer purchaseInvoiceId, HttpServletRequest request) {
		log.info("in class PurchaseInvoiceController this is method editPurchaseInvoice....");
		 return purchaseInvoiceService.editPurchaseInvoice(purchaseInvoiceId);
	}

	/**
	 * @since 19-11-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for delete Purchase invoice
	 */
	@RequestMapping(value = "/deletePurchaseInvoice", method = RequestMethod.POST)
	@ResponseBody
	public Boolean deletePurchaseInvoice(
			@RequestParam("id") Integer purchaseInvoiceId,
			HttpServletRequest request) {
		log.info("in class PurchaseInvoiceController this is method deletePurchaseInvoice....");
		boolean status = purchaseInvoiceService.deletePurchaseInvoice(purchaseInvoiceId,
				request);
		if (status == true) {
			log.debug("this is response status Records Deleted Sucessfully...."+status);
		} else {
			log.debug("this is response status Something went wrong..."+status);
		}
		return status;
	}

	/**
	 * @since 19-11-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for auto suggest while Good Receipt Note
	 */
	@RequestMapping(value = "/purchaseInvoiceAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public PurchaseInvoiceDto purchaseInvoiceAutoSuggestion(
			@RequestParam("purInvSupplierName") String purchaseInvoice) {
		log.info("in class PurchaseInvoiceController this is method purchaseInvoiceAutoSuggestion....");
		return purchaseInvoiceService.purchaseInvoiceAutoSuggestion(purchaseInvoice);
	}
	
	
	/**
	 * @since 19-11-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for getGoodPreceiptNoteById Good Receipt Note
	 */
	@RequestMapping(value = "/getPurchaseInvoiceById", method = RequestMethod.GET)
	@ResponseBody
	public PurchaseInvoiceDto getPurchaseInvoiceById(
			@RequestParam("id") Integer purchaseInvoiceId) {
		log.info("in class PurchaseInvoiceController this is method getPurchaseInvoiceById....");
		return purchaseInvoiceService.getPurchaseInvoiceById(purchaseInvoiceId);
	}
	
	
	@RequestMapping(value = "/getPurchaseInvoiceSeriesNextId", method = RequestMethod.POST)
	@ResponseBody
	public Integer getPurchaseInvoiceSeriesNextId(@RequestParam("tableName") String tableName,HttpServletRequest request) {
		log.info("getPurchaseInvoiceSeriesNextId ....");
		int response = purchaseInvoiceService.getNextIdNew(tableName,request);
		log.debug("response getPurchaseInvoiceSeriesNextId......."+response);

		return response;
	}
	
	@RequestMapping(value = "/getPendingGoodsReceiptNote", method = RequestMethod.GET)
	public @ResponseBody
	GoodReceiptNoteDto getPendingGoodsReceiptNote(HttpServletRequest request) {
		List<GoodReceiptNoteDto> goodReceiptNoteDtos = new ArrayList<GoodReceiptNoteDto>();
		log.info("getPendingGoodsReceiptNote ....");
		goodReceiptNoteDtos = purchaseInvoiceService.getPendingGoodsReceiptNote(request);
		log.debug("response getPendingGoodsReceiptNote......."+goodReceiptNoteDtos);

		goodReceiptNoteDto.setLstGoodReceiptNoteDto(goodReceiptNoteDtos);
		return goodReceiptNoteDto;
	}
	
	@RequestMapping(value = "/getBatchDetails", method = RequestMethod.GET)
	public @ResponseBody
	List<BatchStockDto> getBatchDetails(
			@RequestParam("itemMasterId") Integer itemId) {
		List<BatchStockDto> batchStockDtos = new ArrayList<BatchStockDto>();
		log.info("getBatchDetails ....");
		batchStockDtos = purchaseInvoiceService.getBatchDetails(itemId);
		log.debug("response getBatchDetails......."+batchStockDtos);

		return batchStockDtos;
	}
}
