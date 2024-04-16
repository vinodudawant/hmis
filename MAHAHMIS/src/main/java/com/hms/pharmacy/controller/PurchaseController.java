package com.hms.pharmacy.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.pojo.PurchaseSlave;
import com.hms.pharmacy.pojo.ReportData;
import com.hms.pharmacy.pojo.ReportProductWiseBatchSale;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.PurchaseService;
import com.hms.pharmacy.service.VendorAddressService;

@Controller
@RequestMapping(value = "/purchase")
public class PurchaseController {
	@Autowired
	PurchaseService purchaseSevice;

	@Autowired
	CommonService commonService;
	
	@Autowired
	VendorAddressService addressService;
	
	static Logger log=Logger.getLogger(PurchaseController.class.getName());
	/**
	 *
	 * @Code :This method for to view GRN List
	 * @return
	 **/
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getPurchaseLIst(HttpServletRequest request,
			HttpServletResponse response) {
		log.info("In Pharmacy getPurchaseLIst()");
		ModelAndView modelAndView = new ModelAndView();

		String url = request.getRequestURI();
		boolean result = commonService.getUserAccess(request, url);
		HttpSession session=request.getSession();
		Integer unitId =(Integer) session.getAttribute("uId");
		if (result) {
			List<PurchaseMaster> ltPurchaseMasters = purchaseSevice
					.getLimitPurchases(unitId);
			modelAndView.addObject("ltPurchaseMasters", ltPurchaseMasters);
			modelAndView.setViewName("Pharma_Purchase_List");
		} else {
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}
	/**
	 *
	 * @Code :This method for to get purchase data
	 * @return
	 **/
	@RequestMapping(value = "/getPurchaseEntry", method = RequestMethod.GET)
	public @ResponseBody
	List<PurchaseMaster> getPurchaseData(HttpServletRequest request) {
		log.info("In Pharmacy getPurchaseData()");
		HttpSession session=request.getSession();
		Integer unitId =(Integer) session.getAttribute("uId");
		List<PurchaseMaster> ltPOMaster = new ArrayList<PurchaseMaster>();
		ltPOMaster = purchaseSevice.getPurchaseData(unitId);
		return ltPOMaster;
	}
	/**
	 *
	 * @Code :This method for to view GRN bill 
	 * @return
	 **/
	@RequestMapping(value = "/view-bill", method = RequestMethod.GET)
	public ModelAndView editForm(@RequestParam("purId") Integer purId) {
		log.info("In Pharmacy editForm()");
		ModelAndView modelAndView = new ModelAndView();
		PurchaseMaster purchaseMaster = new PurchaseMaster();

		purchaseMaster = (PurchaseMaster) purchaseSevice.getPurchaseById(purId);
		modelAndView.addObject("purchase", purchaseMaster);

		modelAndView.setViewName("Pharma_Purchase");
		return modelAndView;
	}
	/**
	 *
	 * @Code :This method for to view GRN UI 
	 * @return
	 **/
	@RequestMapping(value = "/view-frm", method = RequestMethod.GET)
	public ModelAndView getPurchaseView(HttpServletRequest request,
			HttpServletResponse response) {
		log.info("In Pharmacy getPurchaseView()");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("purchase", new PurchaseMaster());

		String url = request.getRequestURI();
		boolean result = commonService.getUserAccess(request, url);

		if (result) {
			modelAndView.setViewName("Pharma_Purchase");
		} else {
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}
	/**
	 *
	 * @Code :This method for to save GRN
	 * @return
	 **/
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public synchronized ModelAndView saveOrUpdatePurchase(
			@ModelAttribute("purchase") PurchaseMaster purchaseMaster,
			BindingResult errors,HttpServletRequest request) {
		log.info("In Pharmacy saveOrUpdatePurchase()");
		HttpSession session = request.getSession(true);
		Integer userId=(Integer)session.getAttribute("userId1");
		//Unit ID From session 
		Integer unitId =(Integer) session.getAttribute("uId");
		
		ModelAndView modelAndView = new ModelAndView();

		PurchaseMaster newPurchaseMaster = new PurchaseMaster();
		List<PurchaseSlave> purchaseSlaves = new ArrayList<PurchaseSlave>();

		for (PurchaseSlave purchaseSlave : purchaseMaster.getLtPurSlave()) {
			PurchaseSlave purchaseSlave2 = new PurchaseSlave();
			purchaseSlave2.setBatchMaster(purchaseSlave.getBatchMaster());
			try {
				
				
				
				
				if (!purchaseSlave.getDelChalanNumber().equals("")
						&& purchaseSlave.getDelChalanNumber() != null)
					purchaseMaster.setPurBillNo(purchaseSlave
							.getDelChalanNumber());
			} catch (Exception e) {

			}

			purchaseSlaves.add(purchaseSlave2);
		}
		newPurchaseMaster.setLtPurSlave(purchaseSlaves);
		
		//unitId
		if(unitId!=null)
		{
			purchaseMaster.setUnitId(unitId);
			purchaseMaster.setCreatedBy(userId);
		}
		purchaseSevice.saveOrUpdatePurchase(purchaseMaster,
				newPurchaseMaster,unitId);
		
		PurchaseMaster billMaster = new PurchaseMaster();
		if (purchaseMaster.getPurId() != null) {
			try {
				billMaster = purchaseSevice.getPurchaseDataById(purchaseMaster
						.getPurId(),unitId);
			} catch (Exception e) {
				e.printStackTrace();
			}

			List<PurchaseMaster> saleBillMasters = new ArrayList<PurchaseMaster>();
			saleBillMasters.add(billMaster);

			modelAndView.addObject("purchaseData", saleBillMasters);
			modelAndView.setViewName("Pharma_purchase_bill");
		}

		return modelAndView;
	}
	/**
	 *
	 * @Code :This method for GRN print
	 * @return
	 **/
	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printPo(@RequestParam("purchaseId") Integer purchaseId,HttpServletRequest request) {
		log.info("In Pharmacy printPo()");
		ModelAndView modelAndView = new ModelAndView();
		PurchaseMaster billMaster = new PurchaseMaster();
		HttpSession session = request.getSession(true);
		Integer userId=(Integer)session.getAttribute("userId1");
		//Unit ID From session 
		Integer unitId =(Integer) session.getAttribute("uId");
		try {
			billMaster = purchaseSevice.getPurchaseDataById(purchaseId,unitId);
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<PurchaseMaster> saleBillMasters = new ArrayList<PurchaseMaster>();
		saleBillMasters.add(billMaster);

		modelAndView.addObject("purchaseData", saleBillMasters);
		modelAndView.setViewName("Pharma_purchase_bill");
		return modelAndView;

	}
	/**
	 *
	 * @Code :This method for to delete GRN 
	 * @return
	 **/
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deletePurchase(@RequestParam("purId") Integer purId) {
		log.info("In Pharmacy deletePurchase()");
		Boolean flag = false;
		if (purchaseSevice.deletePurchase(purId)) {
			flag = true;
		}
		return flag;
	}
	/**
	 *
	 * @Code :This method for to duplicate GRN bill number 
	 * @return
	 **/
	@RequestMapping(value = "/dublicateBillNum", method = RequestMethod.POST)
	public @ResponseBody
	Boolean DublicateBillNum(@RequestParam("BillNum") String purBillNo,
			@RequestParam("vendorId") Integer vendorId) {
		log.info("In Pharmacy DublicateBillNum()");
		Boolean flag = false;
		if (purchaseSevice.DublicateBillNum(purBillNo, vendorId)) {
			flag = true;
		}
		return flag;
	}
	/**
	 *
	 * @Code :This method for to get lowest product purchase details
	 * @return
	 **/
	@RequestMapping(value = "/productLowestPurchaseDetail", method = RequestMethod.GET)
	public @ResponseBody
	String getLastVendorName(@RequestParam("ProductId") Integer productId) {
		log.info("In Pharmacy getLastVendorName()");
		return purchaseSevice.getLowestPurchaseDetail(productId);
	}
	/**
	 *
	 * @Code :This method for to stock details 
	 * @return
	 **/
	@RequestMapping(value = "/getTotalStockDetails", method = RequestMethod.GET)
	public @ResponseBody
	String getTotalStock(@RequestParam("productID") Integer productId) {
		log.info("In Pharmacy getTotalStock()");
		return purchaseSevice.getTotalStock(productId);
	}
	/**
	 *
	 * @Code :This method for to get GRN  purchase list
	 * @return
	 **/
	@RequestMapping(value = "/purchaseList", method = RequestMethod.GET)
	public @ResponseBody
	List<PurchaseMaster> getPurchaseList() {
		log.info("In Pharmacy getPurchaseList()");
		List<PurchaseMaster> ltPurchaseMasters = new ArrayList<PurchaseMaster>();
		ltPurchaseMasters = purchaseSevice.getPurchases();
		return ltPurchaseMasters;
	}
	/**
	 *
	 * @Code :This method for autosuggestion
	 * @return
	 **/
	@RequestMapping(value = "/autoSuggestionPurchaseNames", method = RequestMethod.GET)
	public @ResponseBody
	List<PurchaseMaster> getAutoSuggestionBankNames(
			@RequestParam("letter") String letter) {
		log.info("In Pharmacy getAutoSuggestionBankNames()");
		List<PurchaseMaster> ltPurchaseMasters = new ArrayList<PurchaseMaster>();
		ltPurchaseMasters = purchaseSevice
				.getAutoSuggestionPurchaseNames(letter);
		return ltPurchaseMasters;
	}
	/**
	 *
	 * @Code :This method for to get data by vendor id
	 * @return
	 **/
	@RequestMapping(value = "/getPurbyVendorId", method = RequestMethod.GET)
	public @ResponseBody
	List<PurchaseMaster> getPurbyVendorId(
			@RequestParam("vendorId") Integer vendorId) {
		log.info("In Pharmacy getPurbyVendorId()");
		List<PurchaseMaster> ltPurchaseMaster = new ArrayList<PurchaseMaster>();
		ltPurchaseMaster = purchaseSevice.getPurbyVendorId(vendorId);
		return ltPurchaseMaster;
	}
	/**
	 *
	 * @Code :This method for to get purchase list by venodr id
	 * @return
	 **/
	@RequestMapping(value = "/getPurchaseListbyVendorId", method = RequestMethod.GET)
	public @ResponseBody
	List<PurchaseMaster> getPurListbyVendorId(
			@RequestParam("vendorId") Integer vendorId,HttpServletRequest request) {
		log.info("In Pharmacy getPurListbyVendorId()");
		HttpSession session = request.getSession(true);
		//Unit ID From session 
		Integer unitId =(Integer) session.getAttribute("uId");
		List<PurchaseMaster> ltPurchaseMaster = new ArrayList<PurchaseMaster>();
		ltPurchaseMaster = purchaseSevice.getPurListbyVendorId(vendorId,unitId);
		return ltPurchaseMaster;
	}
	/**
	 *
	 * @Code :This method for to search by purchase entry no
	 * @return
	 **/
	@RequestMapping(value = "/searchByPurchaseEntryNo", method = RequestMethod.GET)
	public @ResponseBody
	List<PurchaseMaster> getPurListbyPurchaseEntryNo(
			@RequestParam("PurchaseEntryNo") Integer PurchaseEntryNo,HttpServletRequest request) {
		log.info("In Pharmacy getPurListbyPurchaseEntryNo()");
		HttpSession session = request.getSession(true);
		//Unit ID From session 
		Integer unitId =(Integer) session.getAttribute("uId");
		List<PurchaseMaster> ltPurchaseMaster = new ArrayList<PurchaseMaster>();
		ltPurchaseMaster = purchaseSevice
				.getPurListbyPurchaseEntryNo(PurchaseEntryNo,unitId);
		return ltPurchaseMaster;
	}
	/**
	 *
	 * @Code :This method for to get pending data by vendor id
	 * @return
	 **/
	@RequestMapping(value = "/getPendingPurbyVendorId", method = RequestMethod.GET)
	public @ResponseBody
	List<PurchaseMaster> getPendingPurbyVendorId(
			@RequestParam("vendorId") Integer vendorId) {
		log.info("In Pharmacy getPendingPurbyVendorId()");
		List<PurchaseMaster> ltPurchaseMaster = new ArrayList<PurchaseMaster>();
		ltPurchaseMaster = purchaseSevice.getPendingPurbyVendorId(vendorId);
		return ltPurchaseMaster;
	}
	/**
	 *
	 * @Code :This method to check availability
	 * @return
	 **/
	@RequestMapping(value = "/checkBatchAvailability", method = RequestMethod.GET)
	public @ResponseBody
	List<BatchMaster> getBatchByBatchCode(
			@RequestParam("number") String batchCode) {
		log.info("In Pharmacy getBatchByBatchCode()");
		List<BatchMaster> batchMasters = new ArrayList<BatchMaster>();
		batchMasters = purchaseSevice.getBatchByBatchCode(batchCode);
		return batchMasters;
	}
	/**
	 *
	 * @Code :This method to get batch details
	 * @return
	 **/
	@RequestMapping(value = "/getBatchDetails", method = RequestMethod.GET)
	public @ResponseBody
	String autoSuggestionProductByBatch(
			@RequestParam("productId") Integer productId,
			HttpServletRequest request) throws JSONException {
		log.info("In Pharmacy autoSuggestionProductByBatch()");
		String validStore = request.getParameter("validStore");
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		String storeId="";
		if(validStore==null)
			storeId = (String) session.getAttribute("pharmacyStoreId");
		else
			storeId=validStore;

		Map<String, JSONArray> batchData = new HashMap<String, JSONArray>();
		if (storeId != null) {
			if (session != null) {
				batchData = purchaseSevice.getBatchDetails(productId, storeId);
				/*Map<String, String> batchData1 = new HashMap<String, String>();
				batchData1.put("result", JSONValue.toJSONString(batchData));*/

			}
		} else {
			batchData = purchaseSevice.getBatchDetails(productId, "");
			/*Map<String, String> batchData1 = new HashMap<String, String>();
			batchData1.put("result", JSONValue.toJSONString(batchData));*/
		}
		return JSONValue.toJSONString(batchData);	
	}
	/**
	 *
	 * @Code :This method for product name barcode 
	 * @return
	 **/
	@RequestMapping(value = "/fetchProductNameByBarcode", method = RequestMethod.GET)
	public @ResponseBody
	String fetchProductNameByBarcode(@RequestParam("BatchId") Integer BatchId,
			HttpServletRequest request) throws JSONException {
		log.info("In Pharmacy fetchProductNameByBarcode()");
		HttpSession session = request.getSession();
		String storeId = (String) session.getAttribute("pharmacyStoreId");

		Map<String, JSONArray> batchData = new HashMap<String, JSONArray>();
		
			if (storeId != null) {
				batchData = purchaseSevice.getProductNameByBarcode(BatchId,
						storeId);
			}
		 else {
			batchData = purchaseSevice.getProductNameByBarcode(BatchId, "");

		}
		return JSONValue.toJSONString(batchData);
	}
	/**
	 *
	 * @Code :This method for barcode
	 * @return
	 **/
	@RequestMapping(value = "/fetchProductByBarcode", method = RequestMethod.GET)
	public @ResponseBody
	String fetchProductByBarcode(@RequestParam("BatchId") Integer BatchId,
			HttpServletRequest request) throws JSONException {
		log.info("In Pharmacy fetchProductByBarcode()");
		HttpSession session = request.getSession();
		String storeId = (String) session.getAttribute("pharmacyStoreId");

		Map<String, JSONArray> batchData = new HashMap<String, JSONArray>();
		
			if (session != null) {
				batchData = purchaseSevice.getProductByBarcode(BatchId,
						storeId);

				Map<String, String> batchData1 = new HashMap<String, String>();
				batchData1.put("result", JSONValue.toJSONString(batchData));

			}
		 else {
			batchData = purchaseSevice.getProductByBarcode(BatchId, "");
			Map<String, String> batchData1 = new HashMap<String, String>();
			batchData1.put("result", JSONValue.toJSONString(batchData));
			/* return JSONValue.toJSONString(batchData); */

		}
		return JSONValue.toJSONString(batchData);
	}
	/**
	 *
	 * @Code :This method  to get fifth counter batch details
	 * @return
	 **/
	/*
	 * @RequestMapping(value = "/getBatchDetailsInFIFO", method = RequestMethod.GET)
	 * public @ResponseBody String autoSuggestionProductByBatchInFIFO(
	 * 
	 * @RequestParam("productId") Integer productId, HttpServletRequest request)
	 * throws JSONException {
	 * log.info("In Pharmacy autoSuggestionProductByBatchInFIFO()"); String
	 * validStore = request.getParameter("validStore"); HttpSession session =
	 * request.getSession(); String storeId = (String)
	 * session.getAttribute("pharmacyStoreId");
	 * 
	 * Map<String, JSONArray> batchData = new HashMap<String, JSONArray>(); if
	 * (validStore != null) { if (session != null) { batchData =
	 * purchaseSevice.getBatchDetailsInFIFO(productId, storeId);
	 * 
	 * Map<String, String> batchData1 = new HashMap<String, String>();
	 * batchData1.put("result", JSONValue.toJSONString(batchData));
	 * 
	 * } } else { batchData = purchaseSevice.getBatchDetailsInFIFO(productId, "");
	 * Map<String, String> batchData1 = new HashMap<String, String>();
	 * batchData1.put("result", JSONValue.toJSONString(batchData));
	 * 
	 * } return JSONValue.toJSONString(batchData); }
	 */
	/**
	 *
	 * @Code :This method to get last purchase details
	 * @return
	 **/
	@RequestMapping(value = "/getLastPurchaseDetails", method = RequestMethod.GET)
	public @ResponseBody
	List<PurchaseMaster> getLastPurchaseDetails(
			@RequestParam("productId") Integer productId) {
		log.info("In Pharmacy getLastPurchaseDetails()");
		List<PurchaseMaster> purchaseMasters = purchaseSevice
				.getLastPurchaseDetails(productId);
		return purchaseMasters;
	}
	/**
	 *
	 * @Code :This method for to get total sale by date
	 * @return
	 **/
	@RequestMapping(value = "/getTotalSaleByDate", method = RequestMethod.GET)
	public @ResponseBody
	List<ReportData> getTotalSaleByDate(
			HttpServletRequest request, HttpServletResponse response)
			throws ParseException {
		log.info("In Pharmacy getTotalSaleByDate()");
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String date = dateFormat.format(new Date());

		List<ReportData> productWiseBatchSales = purchaseSevice
				.getTotalSaleCount(date.toString());
		return productWiseBatchSales;
	}
	/***************************************/
	/**
	 *
	 * @Code :This method to get hospital sale by date
	 * @return
	 **/
	@RequestMapping(value = "/getTotalHospitalSaleByDate", method = RequestMethod.GET)
	public @ResponseBody
	List<ReportProductWiseBatchSale> getTotalHospitalSaleByDate(
			HttpServletRequest request, HttpServletResponse response)
			throws ParseException {
		log.info("In Pharmacy getTotalHospitalSaleByDate()");
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String date = dateFormat.format(new Date());

		List<ReportProductWiseBatchSale> productWiseBatchSales = purchaseSevice
				.getTotalHospitalSaleCount(date.toString());
		return productWiseBatchSales;
	}
	
	/***************************************/


	@InitBinder
	protected void initBinder(HttpServletRequest request,
			ServletRequestDataBinder binder) {
		log.info("In Pharmacy initBinder()");
		try {
			SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			CustomDateEditor editor = new CustomDateEditor(dateFormat, true);
			binder.registerCustomEditor(Date.class, editor);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/**
	 *
	 * @Code :This method to get next auto increment
	 * @return
	 **/
	@RequestMapping(value = "/getNextAutoIncrement", method = RequestMethod.GET)
	public @ResponseBody
	Integer getNextAutoIncrement() {
		log.info("In Pharmacy getNextAutoIncrement()");
		Integer ltPOMaster = purchaseSevice.getNextAutoIncrement();
		return ltPOMaster;
	}
	/**
	 *
	 * @Code :This method to get purchase Entry slave data  by pur id
	 * @return
	 **/
	@RequestMapping(value = "/getPurchaseEntrySlaveByPurId", method = RequestMethod.GET)
	public @ResponseBody
	PurchaseMaster getPurchaseOrderByPurchaseId(
			@RequestParam("purId") Integer poId) {
		log.info("In Pharmacy getPurchaseOrderByPurchaseId()");
		PurchaseMaster purchaseMaster = new PurchaseMaster();
		purchaseMaster = purchaseSevice.getPurchaseEntryByPurchaseId(poId);
		return purchaseMaster;
	}
	/**
	 *
	 * @Code :This method to get purchase Entry slave data  by pur id for debit note 
	 * @return
	 **/
	@RequestMapping(value = "/getPurchaseEntrySlaveForDebitNoteByPurId", method = RequestMethod.GET)
	public @ResponseBody
	PurchaseMaster getPurchaseEntrySlaveForDebitNoteByPurId(
			@RequestParam("purId") Integer poId) {
		log.info("In Pharmacy getPurchaseEntrySlaveForDebitNoteByPurId()");
		PurchaseMaster purchaseMaster = new PurchaseMaster();
		purchaseMaster = purchaseSevice
				.getPurchaseEntrySlaveForDebitNoteByPurId(poId);
		return purchaseMaster;
	}
	
	/**
	 *
	 * @Code :This method to edit 
	 * @return
	 **/
	@RequestMapping(value = "/edit-bill", method = RequestMethod.GET)
	public ModelAndView editPurchaseForm(@RequestParam("purId") Integer purId) {
		log.info("In Pharmacy editPurchaseForm()");
		ModelAndView modelAndView = new ModelAndView();
		PurchaseMaster purchaseMaster = new PurchaseMaster();

		purchaseMaster = (PurchaseMaster) purchaseSevice.getPurchaseByIdForEdit(purId);
		modelAndView.addObject("purchase", purchaseMaster);
		modelAndView.addObject("vendorAddr", addressService.getAllAddressOfVendor(purchaseMaster.getVendorMaster().getVendorId()));

		modelAndView.setViewName("Pharma_Purchase");
		return modelAndView;
	}
	/*****
	 * @Code      :For Sending to finance from GRn
	 * ******/
	@RequestMapping(value = "/SendToGRNForFinance", method = RequestMethod.POST)
	@ResponseBody
	public String SendToGRNForFinance(
			HttpServletRequest request,		
			@RequestParam("grnId") String grnId
		) {
		log.info("In Pharmacy SendToGRNForFinance()");
		int response = purchaseSevice.SendToGRNForFinance(
				 request,grnId);
		
		return ((response == 1) ? "Sended  Successfully"		
						: "Network Error!!!");
	}
	
	/**
	 *
	 * @Code :This method to get batch details
	 * @return
	 **/
	@RequestMapping(value = "/getBatchDetailsWithoutExpiry", method = RequestMethod.GET)
	public @ResponseBody
	String autoSuggestionProductByBatchWithoutExpiry(
			@RequestParam("productId") Integer productId,
			HttpServletRequest request) throws JSONException {
		log.info("In Pharmacy autoSuggestionProductByBatch()");
		String validStore = request.getParameter("validStore");
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		String storeId="";
		if(validStore==null)
			storeId = (String) session.getAttribute("pharmacyStoreId");
		else
			storeId=validStore;

		Map<String, JSONArray> batchData = new HashMap<String, JSONArray>();
		if (storeId != null) {
			if (session != null) {
				batchData = purchaseSevice.getBatchDetailsWithoutExpiry(productId, storeId);
				/*Map<String, String> batchData1 = new HashMap<String, String>();
				batchData1.put("result", JSONValue.toJSONString(batchData));*/

			}
		} else {
			batchData = purchaseSevice.getBatchDetailsWithoutExpiry(productId, "");
			/*Map<String, String> batchData1 = new HashMap<String, String>();
			batchData1.put("result", JSONValue.toJSONString(batchData));*/
		}
		return JSONValue.toJSONString(batchData);	
	}
	
	/**
	 *
	 * @Code :This method for to stock without expiry product 
	 * @return
	 * author : vishant pawar
	 **/
	@RequestMapping(value = "/getTotalStockWithoutExpiry", method = RequestMethod.GET)
	public @ResponseBody
	String getTotalStockWithoutExpiry(@RequestParam("productID") Integer productId) {
		log.info("In Pharmacy getTotalStock()");
		return purchaseSevice.getTotalStockWithoutExpiry(productId);
	}

	@RequestMapping(value = "/getProductPrescriptionId", method = RequestMethod.GET)
	public @ResponseBody
	Integer getProductPrescriptionId(@RequestParam("productId") Integer productId) {
		log.info("In Pharmacy getProductPrescriptionId()");
		return purchaseSevice.getProductPrescriptionId(productId);
	}

}
