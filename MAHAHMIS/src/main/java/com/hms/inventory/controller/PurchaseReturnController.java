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

import com.hms.inventory.dto.GoodReceiptNoteDto;
import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PurchaseReturnMasterDto;
import com.hms.inventory.service.PurchaseReturnService;

@Controller
@RequestMapping(value = "/purchasereturn")
public class PurchaseReturnController {
	static Logger log=Logger.getLogger(PurchaseReturnController.class.getName());
	@Autowired
	private PurchaseReturnService  purchaseservice;
	
	@RequestMapping(value = "/savePurchaseReturnMaster", method = RequestMethod.POST)
	@ResponseBody
	public int savePurchaseReturnMaster(	PurchaseReturnMasterDto purchaseObj,@RequestParam("itemInfoDtoDetails") String itemInfoDtoDetails,
			@RequestParam("partyMasterContactInfoDtoDetails") String partyMasterContactInfoDtoDetails,
			@RequestParam("parytyMasterAddressInfoDtoDetails") String parytyMasterAddressInfoDtoDetails,			
			HttpServletRequest request,@RequestParam("partyMasterId") Integer partyMasterId){
		log.info("savePurchaseReturnMaster......");
		int reponse = purchaseservice.savePurchaseReturnMaster(purchaseObj, itemInfoDtoDetails, partyMasterContactInfoDtoDetails, 
				parytyMasterAddressInfoDtoDetails, request, partyMasterId);
      log.debug(" savePurchaseReturnMaster reponse....."+reponse);
		
		return reponse;
	}
	
	@RequestMapping(value = "/getAllPurchaseReturnMaster", method = RequestMethod.GET)
	@ResponseBody
	public PurchaseReturnMasterDto getAllPurchaseReturnMaster(HttpServletRequest request,@RequestParam("unitId") Integer unitId,@RequestParam("call") String call) {
		List<PurchaseReturnMasterDto> lstpurchasereturn = new ArrayList<PurchaseReturnMasterDto>();
		log.info("getAllPurchaseQuotationMaster.....");
		lstpurchasereturn =purchaseservice.getAllPurchaseReturnMaster(request, unitId, call);
		
		log.debug(" getAllPurchaseReturnMaster reponse....."+lstpurchasereturn);		
		PurchaseReturnMasterDto pobj = new PurchaseReturnMasterDto();
		pobj.setLstpurchasereturnmasterDto(lstpurchasereturn);
		return pobj;
	}
	@RequestMapping(value = "/editPurchaseReturnMaster", method = RequestMethod.GET)
	@ResponseBody
	public PurchaseReturnMasterDto editPurchaseReturnMaster(@RequestParam("pRId") Integer pRId,@RequestParam("unitId") Integer unitId) {
		PurchaseReturnMasterDto pobj = new PurchaseReturnMasterDto();
		log.info("editPurchaseReturnMaster.....");
		pobj = purchaseservice.editPurchaseReturnMaster(pRId);
		log.debug(" editPurchaseReturnMaster reponse....."+pobj);

		return pobj;
	}
	
	@RequestMapping(value = "/updatePurchaseReturnContactMaster", method = RequestMethod.POST)
	@ResponseBody
	public int updatePuContactQuotationMaster(PartyMasterContactInfoDto cobj,HttpServletRequest request){
			
		log.info("updatePuContactQuotationMaster.....");
		int reponse = purchaseservice.updatePurchaseReturnContactMaster(cobj, request);
		log.debug(" updatePurchaseReturnContactMaster reponse....."+reponse);
		
		return reponse;
	}
	
	@RequestMapping(value = "/getAllPReturnContactInfo", method = RequestMethod.GET)
	@ResponseBody
	public PartyMasterContactInfoDto getAllPQuationContactInfo(HttpServletRequest request,@RequestParam("unitId") Integer unitId,@RequestParam("purchaseQtMasterId") Integer purchaseQtMasterId) {
		List<PartyMasterContactInfoDto> lstpurchaseContactInfoDto = new ArrayList<PartyMasterContactInfoDto>();
		log.info("getAllPQuationContactInfo.....");
		lstpurchaseContactInfoDto =purchaseservice.getAllPReturnContactInfo(request, unitId, purchaseQtMasterId);
		log.debug("getAllPReturnContactInfo reponse....."+lstpurchaseContactInfoDto);
		PartyMasterContactInfoDto pobj = new PartyMasterContactInfoDto();
		pobj.setPartyMasterContactInfoDto(lstpurchaseContactInfoDto);
		return pobj;
	}
	
	@RequestMapping(value = "/updatePurchaseAddressInfo", method = RequestMethod.POST)
	@ResponseBody
	public int updatePurchaseAddressInfo(PartyMasterAddressInfoDto aobj,HttpServletRequest request){
		log.info("updatePurchaseAddressInfo.....");
		int reponse = purchaseservice.updatePurchaseAddressInfo(aobj, request); 
		log.debug("reponse....."+reponse);

		return reponse;
	}
	
	@RequestMapping(value = "/getAllPReturnAddressInfo", method = RequestMethod.GET)
	@ResponseBody
	public PartyMasterAddressInfoDto getAllPQuationAddressInfo(HttpServletRequest request,@RequestParam("unitId") Integer unitId,@RequestParam("purchaseQtMasterId") Integer purchaseQtMasterId) {
		List<PartyMasterAddressInfoDto> lstpurcaseAddressInfoDto = new ArrayList<PartyMasterAddressInfoDto>();
		log.info("getAllPQuationAddressInfo.....");
		lstpurcaseAddressInfoDto =purchaseservice.getAllPReturnAddressInfo(request, unitId, purchaseQtMasterId);
		log.debug("reponse....."+lstpurcaseAddressInfoDto);

		PartyMasterAddressInfoDto pobj = new PartyMasterAddressInfoDto();
		pobj.setPartyMasterAddressInfoDto(lstpurcaseAddressInfoDto);
		return pobj;
	}
	

	
	@RequestMapping(value = "/deletePurchaseReturnSlaveInfo", method = RequestMethod.POST)
	@ResponseBody
	public String deletePurchaseReturnSlaveInfo(	@RequestParam("id") Integer purchaseSlaveId,@RequestParam("pQId")Integer pQId,@RequestParam("callFrom")String callFrom,HttpServletRequest request) {
		log.info("deletePurchaseQuotationSlaveInfo.....");
		boolean status = purchaseservice.deletePurchaseReturnSlaveInfo(purchaseSlaveId, pQId, callFrom, request);
		log.debug("reponse....."+status);

		String message = "";
		if (status == true) {
			message = "Records Deleted Sucessfully";
		} else {
			message = "Something went wrong...";
		}
		return message;
	}
	
	
	@RequestMapping(value = "/getPurchaseReturnMaster", method = RequestMethod.POST)
	@ResponseBody
	public PurchaseReturnMasterDto getPurchaseReturnMaster(@RequestParam("vendorName") String vendorName) {
		List<PurchaseReturnMasterDto> lstpurchaseobj = new ArrayList<PurchaseReturnMasterDto>();
		log.info("getPurchaseReturnMaster.....");
		lstpurchaseobj =purchaseservice.getPurchaseReturnMaster(vendorName);
		log.debug("getPurchaseReturnMaster reponse....."+lstpurchaseobj);

		PurchaseReturnMasterDto pobj = new PurchaseReturnMasterDto();
		pobj.setLstpurchasereturnmasterDto(lstpurchaseobj);
		return pobj;
	}

	
	@RequestMapping(value = "/getPurchaseReturnMasterDetailsById", method = RequestMethod.GET)
	@ResponseBody
	public PurchaseReturnMasterDto getPurchaseReturnMasterDetailsById(@RequestParam("pRId") Integer pRId,@RequestParam("unitId") Integer unitId) {
		PurchaseReturnMasterDto pobj = new PurchaseReturnMasterDto();
		log.info("getPurchaseReturnMasterDetailsById.....");
		pobj = purchaseservice.getPurchaseReturnMasterDetailsById(pRId, unitId);
		log.debug("getPurchaseReturnMasterDetailsById reponse....."+pobj);

		return pobj;
	}
	
//	@RequestMapping(value = "/deletePurchaseQuotationMaster", method = RequestMethod.POST)
//	@ResponseBody
//	public String deletePurchaseQuotationMaster(	@RequestParam("pQId") Integer pQId,HttpServletRequest request) {
//		log.info("deletePurchaseQuotationMaster.....");
//		boolean status = purchaseservice.deletePurchaseQuotationMaster(pQId, request);
//		log.debug("reponse....."+status);
//
//		String message = "";
//		if (status == true) {
//			message = "Records Deleted Sucessfully";
//		} else {
//			message = "Something went wrong...";
//		}
//		return message;
//	}
	
//	@RequestMapping(value = "/inventoryPartyMasterAutoSuggestion", method = RequestMethod.POST)
//	@ResponseBody
//	public PartyMasterDto inventoryPartyMasterAutoSuggestion(@RequestParam("partyName") String partyName) {
//		List<PartyMasterDto> lstparty = new ArrayList<PartyMasterDto>();
//		log.info("inventoryPartyMasterAutoSuggestion.....");
//		lstparty =purchaseservice.inventoryPartyMasterAutoSuggestion(partyName) ;
//		log.debug("reponse....."+lstparty);
//
//		PartyMasterDto pobj = new PartyMasterDto();
//		pobj.setPartyMasterDto(lstparty);
//		return pobj;
//	}
	
	
	/**
	 * @since 09-10-2023
	 * @author Vishant Pawar
	 * @codeFor below method is created for Goods Receipt Note 
	 */
	@RequestMapping(value = "/editGoodReceiptNote", method = RequestMethod.GET)
	@ResponseBody
	public GoodReceiptNoteDto editGoodReceiptNote(
			@RequestParam("id") Integer goodReceiptNoteId,@RequestParam("call") String call,HttpServletRequest request) {
		log.info("in class InvGoodReceiptNoteController this is method editGoodReceiptNote....");
		 return purchaseservice.editGoodReceiptNote2(goodReceiptNoteId,call,request);
	}


	

}
