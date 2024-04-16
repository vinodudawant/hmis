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

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.JsonObject;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.IndentSaleMaster;
import com.hms.pharmacy.pojo.MrnIssueMaster;
import com.hms.pharmacy.pojo.MrnMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.pojo.WardConsumptionMaster;
import com.hms.pharmacy.service.PurchaseService;
import com.hms.pharmacy.service.WardConsumptionService;

@Controller
@RequestMapping(value = "/wardConsumption")
public class WardController {
	
	@Autowired
	WardConsumptionService wardConsumptionService;
	
	@Autowired
	PurchaseService purchaseService;
	
	@RequestMapping(value = "/getWards", method = RequestMethod.POST)
	public @ResponseBody String getPurchaseLIst(HttpServletRequest request,HttpServletResponse response) {
		JSONArray jsonArray=new JSONArray();
		jsonArray = wardConsumptionService.getWards();
		return JSONValue.toJSONString(jsonArray);
	}
	
	
	@RequestMapping(value = "/saveWardConsumption", method = RequestMethod.POST)
	public @ResponseBody Map<String, String> saveMrn(HttpServletRequest request) throws ParseException {
		HttpSession session = request.getSession(true);
		Integer userId=(Integer)session.getAttribute("userId1");
				
		String list[]= request.getParameterValues("wardConsumptionSlaves");
		
		WardConsumptionMaster consumptionMaster=new WardConsumptionMaster();
		
		String str = list[0].substring(0, list[0].length());
		
		consumptionMaster = (WardConsumptionMaster) ConfigUIJSONUtility
				.getObjectFromJSON(str,
						WardConsumptionMaster.class);
		
		
		if(request.getParameter("consType")!=null && request.getParameter("consType")!="")
		{	
			consumptionMaster.setWardSaleConsumpType(request.getParameter("consType"));
		}
		
		if(request.getParameter("storeId")!=null && request.getParameter("storeId")!="")
		{	
			Integer storeId= Integer.parseInt(request.getParameter("storeId"));
			consumptionMaster.setWardSaleStoreId(storeId);
		}
		else
		{
			consumptionMaster.setWardSaleStoreId(0);
		}
		
		if(request.getParameter("wardId")!=null && request.getParameter("wardId")!="")
		{	
			Integer wardId= Integer.parseInt(request.getParameter("wardId"));
			consumptionMaster.setWardSaleWardId(wardId);
		}
		else
		{
			consumptionMaster.setWardSaleWardId(0);
		}
		
		String txtDate= request.getParameter("txtDate");
		String fromArray[]=txtDate.split("/");
		StringBuffer fromReult=new StringBuffer();
		fromReult=fromReult.append(fromArray[2]+"-"+fromArray[1]+"-"+fromArray[0]);
		
		SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
		Date date=dateFormat.parse(fromReult.toString());
		consumptionMaster.setWardSaleDate(date);
		
		consumptionMaster.setWardSaleUserId(userId);
		consumptionMaster.setWardSaleTime(request.getParameter("time"));
		consumptionMaster.setWardSaleNarration(request.getParameter("txtNaration"));
		consumptionMaster.setWardSaleDispenceTo(request.getParameter("txtMRNDispensedto"));
		consumptionMaster.setTreatmentId(request.getParameter("txtTreatmentId"));
		
		Map<String, String> result=wardConsumptionService.saveWardConsumption(consumptionMaster);
		
		return result;
	}
	
	@RequestMapping(value = "/getBatchDetailsForConsumption", method = RequestMethod.GET)
	public @ResponseBody
	String autoSuggestionProductByBatch(
			@RequestParam("productId") Integer productId,@RequestParam("storeId") String receiveStoreId,HttpServletRequest request) throws JSONException {

		String storeId=receiveStoreId;
		Map<String,JSONArray> batchData=new HashMap<String, JSONArray>();
		/*if(validStore!=null)
		{
			if(session!=null)
			{
				
				
			}
		}
		else
		{
				batchData= purchaseSevice.getBatchDetails(productId,"");
				Map<String,String> batchData1=new HashMap<String, String>();
				batchData1.put("result", JSONValue.toJSONString(batchData));
				return JSONValue.toJSONString(batchData);
			
		}*/
		batchData= purchaseService.getBatchDetails(productId,storeId);
		
		Map<String,String> batchData1=new HashMap<String, String>();
		batchData1.put("result", JSONValue.toJSONString(batchData));
		return JSONValue.toJSONString(batchData);
	}
	
	@RequestMapping(value = "/getWardConsumptionDetails", method = RequestMethod.POST)
	public @ResponseBody String  getPreviousIndentData(@RequestParam("treatId")Integer treatmentId) {
		 
		JSONArray jsonArray = wardConsumptionService.getWardConsumptionDetails(treatmentId);
		return JSONValue.toJSONString(jsonArray);
	}
	
	@RequestMapping(value = "/getPrevWardConsumptionDetails", method = RequestMethod.POST)
	public @ResponseBody String  getPreviousWardIndentData(@RequestParam("treatId")Integer treatmentId) {
		 
		JSONArray jsonArray = wardConsumptionService.getPrevWardConsumptionDetails(treatmentId);
		return JSONValue.toJSONString(jsonArray);
	}
	
	@RequestMapping(value = "/getWardConsumptionDetailsById", method = RequestMethod.GET)
	public @ResponseBody List<WardConsumptionMaster>  getMultipleIndentSaleDataById(@RequestParam("wardConsumptionId")Integer wardConsumptionId) {
		 
		List<WardConsumptionMaster> consumptionMasters = wardConsumptionService.getWardConsumptionDetailsById(wardConsumptionId);
		return consumptionMasters;
	}
	
	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printMRN(
			@RequestParam("wardConsumptionId") Integer wardConsumptionId) {
		ModelAndView modelAndView = new ModelAndView();
		List<WardConsumptionMaster> wardConsumptionMaster = new ArrayList<WardConsumptionMaster>();

		try {
			wardConsumptionMaster = wardConsumptionService.getWardConsumptionDetailsById(wardConsumptionId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		JSONObject storeDetails=wardConsumptionService.getStoreName(wardConsumptionMaster.get(0).getWardSaleStoreId());
		
		JSONObject wardDetails=wardConsumptionService.getWardName(wardConsumptionMaster.get(0).getWardSaleWardId());

		modelAndView.addObject("mrnData", wardConsumptionMaster);
		try{
			modelAndView.addObject("storeName", storeDetails.get("storeName"));
			modelAndView.addObject("wardName", wardDetails.get("wardName"));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		
		modelAndView.setViewName("pharma_ward_consumption_bill");
		return modelAndView;

	}
	
				
}
