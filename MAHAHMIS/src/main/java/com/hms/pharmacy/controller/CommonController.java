package com.hms.pharmacy.controller;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.pharmacy.dao.EhatEnterpriseUtil;
import com.hms.pharmacy.service.CommonService;
import com.hms.utility.ApplicationContextUtils;

@Controller
@RequestMapping(value = "/common")
public class CommonController {

	@Autowired
	CommonService commonService;

	@RequestMapping(value = "/getDocNo", method = RequestMethod.GET)
	public @ResponseBody
	String getDocumentNumber(@RequestParam("docId") Integer docId) {
		String documentNumber = null;

		documentNumber = commonService.getDocumentNumber(docId);

		return documentNumber;
	}
	
	@RequestMapping(value = "/getHospitalPaymentDetails", method = RequestMethod.GET)
	public @ResponseBody
	String getHospitalPaymentDetails() {
		JSONArray batchData=new JSONArray();
		batchData = commonService.getHospitalPaymentDetails();
		return JSONValue.toJSONString(batchData);
	}
	
	@RequestMapping(value = "/getHospitalState", method = RequestMethod.GET)
	public @ResponseBody
	String getHospitalState() {
		String state = commonService.getHospitalState();
		return state;
	}
	
	@RequestMapping(value = "/getHospitalPaymentDetailsById", method = RequestMethod.GET)
	public @ResponseBody
	String getHospitalPaymentDetailsById(@RequestParam("receiveId") Integer receiveId) {
		JSONObject batchData=new JSONObject();
		batchData = commonService.getHospitalPaymentDetailsById(receiveId);
		return JSONValue.toJSONString(batchData);
	}
	
	@RequestMapping(value = "/saleType", method = RequestMethod.POST)
	public synchronized void saleType(HttpServletRequest request,HttpServletResponse response) throws ParseException, ServletException, IOException {
		RequestDispatcher requestDispatcher=null;
		String saleType=request.getParameter("saleFrom");
		if(saleType.equals("indentSale"))
		{
			requestDispatcher=request.getRequestDispatcher("../indentSale/saveIndentSale");
			requestDispatcher.forward(request, response);
		}
		else if (saleType.equals("counterSale")) {
			requestDispatcher=request.getRequestDispatcher("../counterSale/save");
			requestDispatcher.forward(request, response);
		}
		else if (saleType.equals("patientSale")) {
			requestDispatcher=request.getRequestDispatcher("../patientSale/savePatientSale");
			requestDispatcher.forward(request, response);
		}
		else if (saleType.equals("hospitalSale")) {
			requestDispatcher=request.getRequestDispatcher("../hospitalSalesBill/save");
			requestDispatcher.forward(request, response);
		}
		else if (saleType.equals("creditNote")) {
			requestDispatcher=request.getRequestDispatcher("../creditNote/save");
			requestDispatcher.forward(request, response);
		}
		else if (saleType.equals("openingStock")) {
			requestDispatcher=request.getRequestDispatcher("../openingStockEntry/save");
			requestDispatcher.forward(request, response);
		}
		else if (saleType.equals("stockOutEntry")) {
			requestDispatcher=request.getRequestDispatcher("../stockOutEntry/save");
			requestDispatcher.forward(request, response);
		}
		
	}
	
	@RequestMapping(value = "/getSpecialDiscountDetails", method = RequestMethod.GET)
	public @ResponseBody
	Map<String, String> getHospitalPaymentDetails(@RequestParam("saleId") Integer saleId,@RequestParam("type") String type) {
		List<String> spcDisc = null;
		spcDisc = commonService.getDiscountSurchargeDetails(saleId,type);
		
		Map<String, String> results=new HashMap<String, String>();
		results.put("disc", spcDisc.get(0));
		results.put("surcharge", spcDisc.get(1));
		results.put("netAmt", spcDisc.get(2));
		return results;
	}
	
	
	@RequestMapping(value = "/getDiscountDetailsOfPurchase", method = RequestMethod.GET)
	public @ResponseBody
	Map<String, String> getHospitalPaymentDetailsOfPurchase(@RequestParam("saleId") Integer saleId) {
		
		List<String> spcDisc = null;
		spcDisc = commonService.getDiscountSurchargeDetailsOfPurchase(saleId);
		Map<String, String> results=new HashMap<String, String>();
		
		results.put("Disc", spcDisc.get(0));
	      results.put("add", spcDisc.get(1));
	      results.put("net", spcDisc.get(2));
		
		return results;
	}
	
	@RequestMapping(value = "/getTDSSlabMaster", method = RequestMethod.GET)
	public @ResponseBody
	String getTDSSlabMaster() {
		
		Map<String,JSONArray> batchData=new HashMap<String, JSONArray>();
		
		
		EhatEnterpriseUtil ehatEnterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		batchData= ehatEnterpriseUtil.getTDSSlabMaster();
		
		return JSONValue.toJSONString(batchData);
	}
	
	/*Consulting Room Master*/
	@RequestMapping(value = "/saveRoom", method = RequestMethod.POST)
 	public @ResponseBody String saveRoom(@RequestParam("roomName") String roomName,HttpServletRequest request) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();
		
		org.json.simple.JSONObject jsonObject = new org.json.simple.JSONObject();
		jsonObject.put("roomName", roomName);
		jsonObject.put("addedBy", userId);
		jsonObject.put("addedOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		EhatEnterpriseUtil ehatEnterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return ehatEnterpriseUtil.saveRoom(jsonObject);
	}
	
	@RequestMapping(value = "/updateRoom", method = RequestMethod.POST)
 	public @ResponseBody String updateRoom(HttpServletRequest request,@RequestParam("roomName") String roomName,@RequestParam("roomId") Integer roomId) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();
		
		org.json.simple.JSONObject jsonObject = new org.json.simple.JSONObject();
		jsonObject.put("roomId", roomId);
		jsonObject.put("roomName", roomName);
		jsonObject.put("modifyBy", userId);
		jsonObject.put("modifyOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		EhatEnterpriseUtil ehatEnterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return ehatEnterpriseUtil.updateRoom(jsonObject);
	}
	
	@RequestMapping(value = "/deleteRoom", method = RequestMethod.POST)
 	public @ResponseBody String deleteRoom(HttpServletRequest request,@RequestParam("roomId") Integer roomId) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();
		
		org.json.simple.JSONObject jsonObject = new org.json.simple.JSONObject();
		jsonObject.put("roomId", roomId);
		jsonObject.put("modifyBy", userId);
		jsonObject.put("modifyOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		EhatEnterpriseUtil ehatEnterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return ehatEnterpriseUtil.deleteRoom(jsonObject);
	}
	
	@RequestMapping(value = "/getRoomByRoomId", method = RequestMethod.POST)
 	public @ResponseBody org.json.simple.JSONObject getRoomByRoomId(@RequestParam("roomId") Integer roomId) {
		EhatEnterpriseUtil ehatEnterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return ehatEnterpriseUtil.getRoomByRoomId(roomId);
	}
	
	@RequestMapping(value = "/getAllRoom", method = RequestMethod.POST)
 	public @ResponseBody org.json.simple.JSONArray getAllRoom() {
		EhatEnterpriseUtil ehatEnterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return ehatEnterpriseUtil.getAllRoom();
	}
	
	@RequestMapping(value = "/displayLED", method = RequestMethod.POST)
 	public @ResponseBody org.json.simple.JSONObject displayLED() {
		EhatEnterpriseUtil ehatEnterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		//return ehatEnterpriseUtil.displayLED();
		return null;
	}
	
	@RequestMapping(value = "/getPharmaPrintMasters", method = RequestMethod.GET)
	public @ResponseBody
	String getPharmaPrintMasters() {
		
		Map<String,JSONArray> batchData=new HashMap<String, JSONArray>();
		
		
		EhatEnterpriseUtil ehatEnterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		batchData= ehatEnterpriseUtil.getPharmaPrintMasters();
		
		return JSONValue.toJSONString(batchData);
	}
	@RequestMapping(value = "/deletePharmaPrint", method = RequestMethod.POST)
 	public @ResponseBody String deletePharmaPrint(HttpServletRequest request,@RequestParam("printId") Integer printId) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();
		
		org.json.simple.JSONObject jsonObject = new org.json.simple.JSONObject();
		jsonObject.put("printId", printId);
		jsonObject.put("modifyBy", userId);
		jsonObject.put("modifyOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		EhatEnterpriseUtil ehatEnterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return ehatEnterpriseUtil.deletePharmaPrint(jsonObject);
	}
	
	
	@RequestMapping(value = "/savePharmaPrintMaster", method = RequestMethod.POST)
 	public @ResponseBody String savePharmaPrintMaster(HttpServletRequest request, HttpServletResponse response) {
		String msg = "";
		try
		{	
			JSONObject jsonObject=new JSONObject();
			
			jsonObject.put("printId", request.getParameter("txtPrintId").trim());
			jsonObject.put("billName", request.getParameter("txtBillName").trim());
			jsonObject.put("drugLicNo", request.getParameter("txtDrugLicNo").trim());
			jsonObject.put("foodLicNo", request.getParameter("txtFoodLicNo").trim());
			jsonObject.put("vatTinNo", request.getParameter("txtVatTinNo").trim());
			jsonObject.put("userModuleId", request.getParameter("selUserModule").trim());
			
			
			HttpSession httpSession=request.getSession();
			int userId=Integer.parseInt(httpSession.getAttribute("userId1").toString());
			
			jsonObject.put("CreatedBy", userId);
			jsonObject.put("UserIp", request.getRemoteHost());
			
			
			EhatEnterpriseUtil ehatEnterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
			msg = ehatEnterpriseUtil.savePharmaPrintMaster(jsonObject);
			
		}
		catch(Exception e)
		{
		System.out.println(e);	
		}
		return JSONValue.toJSONString(msg);
	}
	
	@RequestMapping(value = "/getCategorywiseDiscount", method = RequestMethod.GET)
	public @ResponseBody
	String getCategorywiseDiscount(@RequestParam("treatmentId") Integer treatmentId) 
	{
		Map<String,JSONArray> categoryDiscount=new HashMap<String, JSONArray>();
		EhatEnterpriseUtil ehatEnterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		categoryDiscount= ehatEnterpriseUtil.getCategorywiseDiscount(treatmentId);
		
		return JSONValue.toJSONString(categoryDiscount);
	}
	
	@RequestMapping(value = "/getCreditCategorywiseDiscount", method = RequestMethod.GET)
	public @ResponseBody
	String getCreditCategorywiseDiscount(@RequestParam("treatmentId") Integer treatmentId) 
	{
		Map<String,JSONArray> categoryDiscount=new HashMap<String, JSONArray>();
		EhatEnterpriseUtil ehatEnterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		categoryDiscount= ehatEnterpriseUtil.getCreditCategorywiseDiscount(treatmentId);
		
		return JSONValue.toJSONString(categoryDiscount);
	}
	
	
	/* Suraj code for hospital unit save  28 Mar 2017*/
	
	@RequestMapping(value = "/saveHospitalUnitMaster", method = RequestMethod.POST)
 	public @ResponseBody String saveHospitalUnitMaster(HttpServletRequest request, HttpServletResponse response) {
		String msg = "";
		try
		{	
			JSONObject jsonObject=new JSONObject();
			
			jsonObject.put("unitName", request.getParameter("txtUnitName").trim());
			jsonObject.put("Narration", request.getParameter("txtRemarks").trim());
			
			HttpSession httpSession=request.getSession();
			int userId=Integer.parseInt(httpSession.getAttribute("userId1").toString());
			
			jsonObject.put("createdBy", userId);
			jsonObject.put("userIp", request.getRemoteHost());
			
			
			EhatEnterpriseUtil ehatEnterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
			msg = ehatEnterpriseUtil.saveHospitalUnitMaster(jsonObject);
			
		}
		catch(Exception e)
		{
			System.out.println(e);	
		}
		return JSONValue.toJSONString(msg);
	}
	
	/* Suraj code for hospital unit fetch  28 Mar 2017*/
	@RequestMapping(value = "/getHospitalUnitMasters", method = RequestMethod.GET)
	public @ResponseBody
	String getHospitalUnitMasters() {
		
		Map<String,JSONArray> batchData=new HashMap<String, JSONArray>();
		
		
		EhatEnterpriseUtil ehatEnterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		batchData= ehatEnterpriseUtil.getHospitalUnitMasters();
		
		return JSONValue.toJSONString(batchData);
	}
	
	/* Parikshit code for fetch Category Master List  11 July 2017*/
	@RequestMapping(value = "/fetchCatMasterList", method = RequestMethod.GET)
	public @ResponseBody
	String fetchCatMasterList() {
		
		org.json.simple.JSONArray batchData = new org.json.simple.JSONArray();
		
		
		EhatEnterpriseUtil ehatEnterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		batchData= ehatEnterpriseUtil.fetchCatMasterList();
		
		return JSONValue.toJSONString(batchData);
	}
	
}
