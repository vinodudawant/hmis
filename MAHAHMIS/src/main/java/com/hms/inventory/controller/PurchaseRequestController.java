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

import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.dto.ProcessPurchaseOrderDTO;
import com.hms.inventory.service.PurchaseRequestService;
@Controller
@RequestMapping(value = "/purchaserequest")
public class PurchaseRequestController {

	static Logger log=Logger.getLogger(PurchaseRequestController.class.getName());
	@Autowired
	private PurchaseRequestService  purchaseservice;
	
	@RequestMapping(value = "/savePurchaseRequestMaster", method = RequestMethod.POST)
	@ResponseBody
	public int savePurchaseRequestMaster(	MrnMasterDTO mrnobj,@RequestParam("itemInfoDtoDetails") String itemInfoDtoDetails,HttpServletRequest request)
			
	{
		log.info("savePurchaseRequestMaster..");
		int reponse = purchaseservice.savePurchaseRequestMaster(mrnobj, itemInfoDtoDetails,request);
      log.debug("reponse savePurchaseRequestMaster ....."+reponse);
		
		return reponse;
	}
	
	@RequestMapping(value = "/getAllPurchaseRequestMaster", method = RequestMethod.GET)
	@ResponseBody
	public MrnMasterDTO getAllPurchaseRequestMaster(HttpServletRequest request,@RequestParam("unitId") Integer unitId,@RequestParam("call") String call) {
		List<MrnMasterDTO> lstmrnmaster = new ArrayList<MrnMasterDTO>();
		log.info("getAllPurchaseQuotationMaster.....");
		lstmrnmaster =purchaseservice.getAllPurchaseRequestMaster(request, unitId, call);
		
		log.debug("reponse getAllPurchaseRequestMaster ....."+lstmrnmaster);		
		MrnMasterDTO pobj = new MrnMasterDTO();
		pobj.setLstmrnmaster(lstmrnmaster);
		return pobj;
	}
	
	@RequestMapping(value = "/rejectPurchaseRequestMaster", method = RequestMethod.POST)
	public @ResponseBody
	String rejectPurchaseRequestMaster(@RequestParam("mrnId") Integer mrnId,@RequestParam("mrnrejectremark") String mrnrejectremark,HttpServletRequest request) {
		log.info("rejectPurchaseRequestMaster.....");
		boolean response = purchaseservice.rejectPurchaseRequestMaster(mrnId, mrnrejectremark, request);
		log.debug("reponse rejectPurchaseRequestMaster ....."+response); 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "OOps Some Pbm Occurce";
		}
		return msg;
	}
	
	
	@RequestMapping(value = "/reviewPurchaseRequestMaster", method = RequestMethod.GET)
	@ResponseBody
	public MrnMasterDTO reviewPurchaseRequestMaster(@RequestParam("mrnId") Integer mrnId,@RequestParam("unitId") Integer unitId) {
		MrnMasterDTO pobj = new MrnMasterDTO();
		log.info("reviewPurchaseRequestMaster.....");
		pobj = purchaseservice.reviewPurchaseRequestMaster(mrnId);
		log.debug("reponse reviewPurchaseRequestMaster....."+pobj);

		return pobj;
	}
	
	
	@RequestMapping(value = "/saveProcessPurchaseOrderMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveProcessPurchaseOrderMaster(ProcessPurchaseOrderDTO pobj,@RequestParam("itemInfoDtoDetails") String itemInfoDtoDetails,HttpServletRequest request)
	{
		
		log.info("saveProcessPurchaseOrderMaster..");
		int reponse = purchaseservice.saveProcessPurchaseOrderMaster(pobj, itemInfoDtoDetails, request);
		log.debug("reponse saveProcessPurchaseOrderMaster ....."+reponse);
		
		return reponse;
	}
	
}
