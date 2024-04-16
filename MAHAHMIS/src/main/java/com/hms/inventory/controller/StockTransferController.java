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
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.dto.StockTransferMasterDTO;
import com.hms.inventory.service.StockTransferService;

@Controller
@RequestMapping(value = "/stocktransper")
public class StockTransferController {
	static Logger log=Logger.getLogger(StockTransferController.class.getName());
	@Autowired
	StockTransferService stocktransservice;
	
	@RequestMapping(value = "/savestockTransperMaster", method = RequestMethod.POST)
	@ResponseBody
	public int savestockTransperMaster(	StockTransferMasterDTO sobj,@RequestParam("itemInfoDtoDetails") String itemInfoDtoDetails,HttpServletRequest request)
	{
		
		log.info("savestockTransperMaster..");
		int reponse = stocktransservice.savestockTransperMaster(sobj, itemInfoDtoDetails, request);
		log.debug("reponse savestockTransperMaster ....."+reponse);
		
		return reponse;
	}
	
	

	@RequestMapping(value = "/editstockTransperMaster", method = RequestMethod.GET)
	@ResponseBody
	public StockTransferMasterDTO editstockTransperMaster(@RequestParam("stockId") Integer stockId,@RequestParam("unitId") Integer unitId) {
		StockTransferMasterDTO sobj = new StockTransferMasterDTO();
		log.info("editstockTransperMaster.....");
		sobj = stocktransservice.editstockTransperMaster(stockId, unitId);
		log.debug("reponse editstockTransperMaster....."+sobj);

		return sobj;
	}
	
	
	@RequestMapping(value = "/reviewPurchaseRequestMasterForSTO", method = RequestMethod.GET)
	@ResponseBody
	public MrnMasterDTO reviewPurchaseRequestMasterForSTO(@RequestParam("mrnId") Integer mrnId,@RequestParam("unitId") Integer unitId) {
		MrnMasterDTO mobj = new MrnMasterDTO();
		log.info("reviewPurchaseRequestMasterForSTO.....");
		mobj = stocktransservice.reviewPurchaseRequestMasterForSTO(mrnId, unitId);
		log.debug("reponse reviewPurchaseRequestMasterForSTO....."+mobj);

		return mobj;
	}

	
	@RequestMapping(value = "/getAllStockId", method = RequestMethod.GET)
	@ResponseBody
	public StockTransferMasterDTO getAllStockId(@RequestParam("subInvId") Integer subInvId,HttpServletRequest request) {
		List<StockTransferMasterDTO> lststockmaster = new ArrayList<StockTransferMasterDTO>();
		log.info("getAllStockId.....");
		lststockmaster =stocktransservice.getAllStockId(subInvId);
		
		log.debug("reponse getAllStockId ....."+lststockmaster);		
		StockTransferMasterDTO pobj = new StockTransferMasterDTO();
		pobj.setLststocktranspermaster(lststockmaster);
		return pobj;
	}
	
	@RequestMapping(value = "/reviewPurchaseRequestMasterForPO", method = RequestMethod.GET)
	@ResponseBody
	public MrnMasterDTO reviewPurchaseRequestMasterForPO(@RequestParam("mrnId") Integer mrnId,@RequestParam("unitId") Integer unitId) {
		MrnMasterDTO mobj = new MrnMasterDTO();
		log.info("reviewPurchaseRequestMasterForPO.....");
		mobj = stocktransservice.reviewPurchaseRequestMasterForPO(mrnId, unitId);
		log.debug("reponse reviewPurchaseRequestMasterForPO....."+mobj);

		return mobj;
	}
	
	@RequestMapping(value = "/getBatchIdInfoForSto", method = RequestMethod.GET)
	@ResponseBody
	public BatchStockDto getBatchIdInfoForSto(@RequestParam("batchId") Integer batchId) {
		BatchStockDto bobj = new BatchStockDto();
		log.info("getBatchIdInfoForSto.....");
		bobj = stocktransservice.getBatchIdInfoForSto(batchId);
		log.debug("reponse getBatchIdInfoForSto....."+bobj);

		return bobj;
	}
	@RequestMapping(value = "/acceptStockTransperItemMaster", method = RequestMethod.POST)
	@ResponseBody
	public int acceptStockTransperItemMaster(	@RequestParam("itemInfoId") Integer itemInfoId,@RequestParam("receiveQty") Integer receiveQty,@RequestParam("subInvId") Integer subInvId,@RequestParam("stockId") Integer stockId,HttpServletRequest request)
	{
		
		log.info("acceptStockTransperItemMaster..");
		int reponse = stocktransservice.acceptStockTransperItemMaster(itemInfoId, receiveQty, subInvId,stockId, request);
		log.debug("reponse acceptStockTransperItemMaster ....."+reponse);
		
		return reponse;
	}
	
	@RequestMapping(value = "/getAllStockMasterForView", method = RequestMethod.GET)
	@ResponseBody
	public StockTransferMasterDTO getAllStockMasterForView(@RequestParam("unitId") Integer unitId) {
		StockTransferMasterDTO obj = new StockTransferMasterDTO();
		List<StockTransferMasterDTO> lststock=new ArrayList<StockTransferMasterDTO>();
		log.info("getAllStockMasterForView.....");
		lststock = stocktransservice.getAllStockMasterForView(unitId);
		obj.setLststocktranspermaster(lststock);
		log.debug("reponse getAllStockMasterForView....."+obj);

		return obj;
	}
	@RequestMapping(value = "/viewstockTransperMaster", method = RequestMethod.GET)
	@ResponseBody
	public StockTransferMasterDTO viewstockTransperMaster(@RequestParam("stockId") Integer stockId,@RequestParam("unitId") Integer unitId) {
		StockTransferMasterDTO sobj = new StockTransferMasterDTO();
		log.info("viewstockTransperMaster.....");
		sobj = stocktransservice.viewstockTransperMaster(stockId, unitId);
		log.debug("reponse viewstockTransperMaster....."+sobj);

		return sobj;
	}
}
