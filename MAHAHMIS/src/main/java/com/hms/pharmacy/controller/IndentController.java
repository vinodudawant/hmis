package com.hms.pharmacy.controller;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.dao.EhatEnterpriseUtil;
import com.hms.pharmacy.pojo.CreditNoteIndent;
import com.hms.pharmacy.pojo.FinalIndent;
import com.hms.pharmacy.pojo.IndentMaster;
import com.hms.pharmacy.pojo.IndentMasterResult;
import com.hms.pharmacy.pojo.IndentSale;
import com.hms.pharmacy.pojo.IndentSaleMaster;
import com.hms.pharmacy.pojo.IndentSaleSlave;
import com.hms.pharmacy.pojo.PatientPharmaDetails;
import com.hms.pharmacy.pojo.settalBillIndent;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.IndentService;
import com.hms.utility.ApplicationContextUtils;

@Controller
@RequestMapping(value = "/indentSale")
public class IndentController {
	@Autowired
	IndentService  indentService;
	
	@Autowired
	CommonService commonService;

	@RequestMapping(value = "/saveIndent", method = RequestMethod.POST)
	public void saveOrUpdateIndent(
			HttpServletRequest request,HttpServletResponse response) throws ParseException {
		ModelAndView modelAndView = new ModelAndView();
		
		String mrnDate=request.getParameter("txtDocDate");
		Integer treatmentId=Integer.parseInt(request.getParameter("indentTreatmentId"));
		Integer pId=Integer.parseInt(request.getParameter("pId"));
		String receivedFrom=request.getParameter("receivedFrom");
		Integer storeId=Integer.parseInt(request.getParameter("storeId"));
		String storeName=request.getParameter("storeName");
		
		SimpleDateFormat dateFormat=new SimpleDateFormat("dd-MM-yyyy");
		Date date=dateFormat.parse(mrnDate);
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId =(Integer) session.getAttribute("uId");
		
		IndentMaster indentMaster=new IndentMaster();
		indentMaster.setIndentDate(date);
		indentMaster.setIndentTreatmentId(treatmentId);
		indentMaster.setIndentReceivedFrom(receivedFrom);
		indentMaster.setIndentStoreName(storeName);
		indentMaster.setIndentStoretId(storeId);		
		indentMaster.setIndentcreatedby(userId);
		indentMaster.setIndentPatientId(pId);
		
		IndentMaster newIndentMaster = new IndentMaster();
		
		String list[]= request.getParameterValues("ltIndentSlave");
		
		String str = list[0].substring(0, list[0].length());
		//System.err.println("str====>"+str);
		
		try
		{
			newIndentMaster = (IndentMaster) ConfigUIJSONUtility
				.getObjectFromJSON(str,
						IndentMaster.class);
			
			newIndentMaster.setIndentDate(date);
			newIndentMaster.setIndentTreatmentId(treatmentId);
			newIndentMaster.setIndentReceivedFrom(receivedFrom);
			newIndentMaster.setIndentStoreName(storeName);
			newIndentMaster.setIndentStoretId(storeId);
			newIndentMaster.setIndentcreatedby(userId);
			newIndentMaster.setIndentPatientId(pId);
			
			java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
			java.util.Calendar cal = java.util.Calendar.getInstance();
			String time=dateFormat1.format(cal.getTime());
			
			newIndentMaster.setIndentTime(time);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		indentService.saveIndent(newIndentMaster);
		
		/*List<InventoryMaterialRequestNoteItemInfoSlaveDTO> ltInfoSlaveDTOs= inventoryMaterialRequestNoteItemInfoSlaveDTO.getInventoryMaterialRequestNoteItemInfoSlaveDTO();
		
		indentMaster.setLtIndentSlave(ltInfoSlaveDTOs);*/
		
	}
	
	@RequestMapping(value = "/view-frm", method = RequestMethod.GET)
	public ModelAndView getPurchaseView(HttpServletRequest request,HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("indentSale", new IndentSaleMaster());
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);

		if(result)
		{
			modelAndView.setViewName("pharma_indent_sale");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		
		ResourceBundle bundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String stockDetails= bundle.getObject("indentSaleFetchStock").toString();
		
		HttpSession httpSession=request.getSession();
		httpSession.setAttribute("fetchStockOptionForIndentSale", stockDetails);
		
		return modelAndView;
	}
	
	@RequestMapping(value = "/getIndentDetailsByDate", method = RequestMethod.GET)
	public @ResponseBody String  getIndentDetailsByDate(@RequestParam("date")String date,HttpServletRequest request) {

		JSONArray strings = new JSONArray();
		
		HttpSession session=request.getSession();
		String storeId=(String) session.getAttribute("pharmacyStoreId");
		
		if(storeId!=null)
		{
			strings = indentService.getIndentDetailsByDate(date,Integer.parseInt(storeId.toString()));
		}
		else
		{	
			strings = indentService.getIndentDetailsByDate(date,0);
		}	
		
		return JSONValue.toJSONString(strings);
	}

	@RequestMapping(value = "/fetchIndentDetailsByPatientName", method = RequestMethod.GET)
	public @ResponseBody String  fetchIndentDetailsByPatientName(@RequestParam("findingName")String findingName,HttpServletRequest request) {

		JSONArray strings = new JSONArray();
		
		HttpSession session=request.getSession();
		String storeId=(String) session.getAttribute("pharmacyStoreId");
		
		if(storeId!=null)
		{
			strings = indentService.getIndentDetailsByPatient(findingName,Integer.parseInt(storeId.toString()));
		}
		else
		{	
			strings = indentService.getIndentDetailsByPatient(findingName,0);
		}	
		
		return JSONValue.toJSONString(strings);
	}

	@RequestMapping(value = "/fetchIndentDetailsByPatientName2", method = RequestMethod.GET)
	@ResponseBody
	public PatientPharmaDetails fetchIndentDetailsByPatientName2(
			
			@RequestParam("findingName") String findingName ,HttpServletRequest request
						) { 
		
		HttpSession session=request.getSession();
		String storeId=(String) session.getAttribute("pharmacyStoreId");
		Integer unitId = (Integer) session.getAttribute("uId");
		
		PatientPharmaDetails obj = new PatientPharmaDetails();

		List<PatientPharmaDetails> alllstService = new ArrayList<PatientPharmaDetails>();
		alllstService = indentService.fetchIndentDetailsByPatientName2(findingName,unitId,storeId);
		obj.setListPatientPharmaDetails(alllstService);

		return obj;
	}


	@RequestMapping(value = "/fetchIndentIds", method = RequestMethod.GET)
	@ResponseBody
	public PatientPharmaDetails fetchIndentIds(
			
			@RequestParam("indenttreatementid") int indenttreatementid ,HttpServletRequest request
						) { 
		
		HttpSession session=request.getSession();
		String storeId=(String) session.getAttribute("pharmacyStoreId");
		Integer unitId = (Integer) session.getAttribute("uId");
		
		PatientPharmaDetails obj = new PatientPharmaDetails();

		List<PatientPharmaDetails> alllstService = new ArrayList<PatientPharmaDetails>();
		alllstService = indentService.fetchIndentIds(indenttreatementid,unitId,storeId);
		obj.setListPatientPharmaDetails(alllstService);

		return obj;
	}
	@RequestMapping(value = "/getIndentDataById", method = RequestMethod.GET)
	public @ResponseBody IndentMaster getIndentDataById(@RequestParam("indentId")Integer indentId) {

		IndentMaster indentMaster = new IndentMaster();
		indentMaster = indentService.getIndentDataById(indentId);
		return indentMaster;
	}
	
	@RequestMapping(value = "/getPatientDataByTreatmentId", method = RequestMethod.GET)
	public @ResponseBody IndentSale getPatientDataByTreatmentId(@RequestParam("treatmentId")Integer treatmentId) {

		IndentSale IndentSale = new IndentSale();
		IndentSale = indentService.getPatientDataByTreatmentId(treatmentId);
		return IndentSale;
	}
	
	@RequestMapping(value = "/getSponserDataByTreatmentId", method = RequestMethod.GET)
	public @ResponseBody IndentSale getSponserDataByTreatmentId(@RequestParam("treatmentId")Integer treatmentId) {

		IndentSale IndentSale = new IndentSale();
		IndentSale = indentService.getSponserDataByTreatmentId(treatmentId);
		return IndentSale;
	}
	
	@RequestMapping(value = "/getProductNameByProductId", method = RequestMethod.GET)
	public @ResponseBody String getProductNameByProductId(@RequestParam("productId")Integer productId) {

		String productName = new String();
		productName = indentService.getProductNameByProductId(productId);
		return productName;
	}
	
	
	@RequestMapping(value = "/sampleTest", method = RequestMethod.POST)
	public void sampleTest(HttpServletRequest request,HttpServletResponse response) throws ParseException, ServletException, IOException {
		
		RequestDispatcher requestDispatcher=request.getRequestDispatcher("saveIndentSale");
		requestDispatcher.forward(request, response);
	}
	
	@RequestMapping(value = "/saveIndentSale", method = RequestMethod.POST)
	public @ResponseBody Map<String, String> saveIndentSale(HttpServletRequest request) throws ParseException 
	{
		
		HttpSession session = request.getSession(true);
		Integer userId=(Integer)session.getAttribute("userId1");
		//Unit ID From session 
		Integer unitId =(Integer) session.getAttribute("uId");
		String ipaddress=request.getRemoteAddr();
		
		String storeId=(String) session.getAttribute("pharmacyStoreId");
				
		String list[]= request.getParameterValues("indentSaleSlaves");
		
		IndentSaleMaster indentSaleMaster=new IndentSaleMaster();
		
		String str = list[0].substring(0, list[0].length());
		
		indentSaleMaster = (IndentSaleMaster) ConfigUIJSONUtility
				.getObjectFromJSON(str,
						IndentSaleMaster.class);
		
		java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
		java.util.Calendar cal = java.util.Calendar.getInstance();
		String time=dateFormat1.format(cal.getTime());
		
		indentSaleMaster.setTime(time);
		
		
		if(request.getParameter("txtCD")!=null && request.getParameter("txtCD")!="")
		{	
			Double txtCd= Double.parseDouble(request.getParameter("txtCD"));
			indentSaleMaster.setIndentSaleCD(txtCd);
		}
		else
		{
			indentSaleMaster.setIndentSaleCD(0.0);
		}
		
		if(request.getParameter("txtCDAmt")!=null && request.getParameter("txtCDAmt")!="")
		{	
			Double txtCdAmt= Double.parseDouble(request.getParameter("txtCDAmt"));
			indentSaleMaster.setIndentSaleCdAmt(txtCdAmt);
		}
		else
		{
			indentSaleMaster.setIndentSaleCdAmt(0.0);
		}
		
		
		
		if(request.getParameter("txtCN")!=null && request.getParameter("txtCN")!="")
		{	
			Double txtCn= Double.parseDouble(request.getParameter("txtCN"));
			indentSaleMaster.setIndentSaleCN(txtCn);
		}
		else
		{
			indentSaleMaster.setIndentSaleCN(0.0);
		}
		
		
		if(request.getParameter("txtCNAmt")!=null && request.getParameter("txtCNAmt")!="")
		{	
			Double txtCnAmt= Double.parseDouble(request.getParameter("txtCNAmt"));
			indentSaleMaster.setIndentSaleCnAmt(txtCnAmt);
		}
		else
		{
			indentSaleMaster.setIndentSaleCnAmt(0.0);
		}
		
		if(request.getParameter("txtAdd")!=null && request.getParameter("txtAdd")!="")
		{
			Double txtAdd= Double.parseDouble(request.getParameter("txtAdd"));
			indentSaleMaster.setIndentSaleAdd(txtAdd);
		}
		else
		{
			indentSaleMaster.setIndentSaleAdd(0.0);
		}
		
		if(request.getParameter("txtGrossAmt")!=null && request.getParameter("txtGrossAmt")!="")
		{
			indentSaleMaster.setIndentSaleGrossAmt(Double.parseDouble(request.getParameter("txtGrossAmt")));
		}
		else
		{
			indentSaleMaster.setIndentSaleGrossAmt(0.0);
		}
		
		if(request.getParameter("txtLess")!=null && request.getParameter("txtLess")!="")
		{
			indentSaleMaster.setIndentSaleLess(Double.parseDouble(request.getParameter("txtLess")));
		}
		else
		{
			indentSaleMaster.setIndentSaleLess(0.0);
		}
		
		if(request.getParameter("txtNarration")!=null && request.getParameter("txtNarration")!="")
		{
			indentSaleMaster.setIndentSaleNarration(request.getParameter("txtNarration"));
		}
		/*indentSaleMaster.setIndentSaleNarration("");*/
		
		if(request.getParameter("txtNetAmt")!=null && request.getParameter("txtNetAmt")!="")
		{
			indentSaleMaster.setIndentSaleNetAmt(Double.parseDouble(request.getParameter("txtNetAmt")));
		}
		else
		{
			indentSaleMaster.setIndentSaleNetAmt(0.0);
		}
		
		if(request.getParameter("txtRound")!=null && request.getParameter("txtRound")!="")
		{
			indentSaleMaster.setIndentSaleRound(Double.parseDouble(request.getParameter("txtRound")));	
		}
		else
		{
			indentSaleMaster.setIndentSaleRound(0.0);
		}
		
		if(request.getParameter("txtSpecialDisc")!=null && request.getParameter("txtSpecialDisc")!="")
		{
			indentSaleMaster.setIndentSaleSpecialDisc(Double.parseDouble(request.getParameter("txtSpecialDisc")));
		}
		else
		{
			indentSaleMaster.setIndentSaleSpecialDisc(0.0);
		}
		
		if(request.getParameter("txtSurcharge")!=null && request.getParameter("txtSurcharge")!="")
		{
			indentSaleMaster.setIndentSaleSurcharges(Double.parseDouble(request.getParameter("txtSurcharge")));
		}
		else
		{
			indentSaleMaster.setIndentSaleSurcharges(0.0);
		}
		
		if(request.getParameter("txtAmtRec")!=null && request.getParameter("txtAmtRec")!="")
		{
			indentSaleMaster.setIndentSaleAmountReceive(Double.parseDouble(request.getParameter("txtAmtRec")));
		}
		else
		{
			indentSaleMaster.setIndentSaleAmountReceive(0.0);
		}
		
		
		if(request.getParameter("bankName")!=null && request.getParameter("bankName")!="")
		{
			indentSaleMaster.setIndentSaleBankName((request.getParameter("bankName")));
		}
		else
			indentSaleMaster.setIndentSaleBankName("");
		
		
		if(request.getParameter("chequeNum")!=null && request.getParameter("chequeNum")!="")
		{
			indentSaleMaster.setIndentSaleChequeNum(request.getParameter("chequeNum"));
		}
		else
			indentSaleMaster.setIndentSaleChequeNum("");
		
		if(request.getParameter("txtCardNo")!=null && request.getParameter("txtCardNo")!="")
		{
			indentSaleMaster.setIndentSaleCardNum(request.getParameter("txtCardNo"));
		}
		else
			indentSaleMaster.setIndentSaleCardNum("");
		
		
		if(request.getParameter("comment")!=null && request.getParameter("comment")!="")
		{
			indentSaleMaster.setIndentSaleComment(request.getParameter("comment"));
		}
		else
			indentSaleMaster.setIndentSaleComment("");
		
		
		/*if(request.getParameter("txtAmtBal")!=null && request.getParameter("txtAmtBal")!="")
		{
			indentSaleMaster.setIndentSaleAmountBalance(Double.parseDouble(request.getParameter("txtAmtBal")));
		}
		else
		{
			indentSaleMaster.setIndentSaleAmountBalance(0.0);
		}
		
		if(request.getParameter("indentSalePreviousBalance")!=null && request.getParameter("indentSalePreviousBalance")!="")
		{
			indentSaleMaster.setIndentSalePreviousBalance(Double.parseDouble(request.getParameter("indentSalePreviousBalance")));
		}
		else
		{
			indentSaleMaster.setIndentSalePreviousBalance(0.0);
		}*/
		
		//new tax field add by suraj
		if(request.getParameter("txtTax5")!=null && request.getParameter("txtTax5")!="")
		{
			indentSaleMaster.setIndentTaxVat5(Double.parseDouble(request.getParameter("txtTax5")));
		}
		else
		{
			indentSaleMaster.setIndentTaxVat5(0.0);
		}
		
		if(request.getParameter("txtTax55")!=null && request.getParameter("txtTax55")!="")
		{
			indentSaleMaster.setIndentTaxVat55(Double.parseDouble(request.getParameter("txtTax55")));
		}
		else
		{
			indentSaleMaster.setIndentTaxVat55(0.0);
		}
		
		if(request.getParameter("txtTax12")!=null && request.getParameter("txtTax12")!="")
		{
			indentSaleMaster.setIndentTaxVat12(Double.parseDouble(request.getParameter("txtTax12")));
		}
		else
		{
			indentSaleMaster.setIndentTaxVat12(0.0);
		}
		
		if(request.getParameter("txtTax55")!=null && request.getParameter("txtTax55")!="")
		{
			indentSaleMaster.setIndentTaxVat55(Double.parseDouble(request.getParameter("txtTax55")));
		}
		else
		{
			indentSaleMaster.setIndentTaxVat55(0.0);
		}
		
		if(request.getParameter("txtTax6")!=null && request.getParameter("txtTax6")!="")
		{
			indentSaleMaster.setIndentTaxVat6(Double.parseDouble(request.getParameter("txtTax6")));
		}
		else
		{
			indentSaleMaster.setIndentTaxVat6(0.0);
		}
		
		if(request.getParameter("txtTax135")!=null && request.getParameter("txtTax135")!="")
		{
			indentSaleMaster.setIndentTaxVat135(Double.parseDouble(request.getParameter("txtTax135")));
		}
		else
		{
			indentSaleMaster.setIndentTaxVat135(0.0);
		}
		
		/*if(request.getParameter("txtTax0")!=null && request.getParameter("txtTax0")!="")
		{
			indentSaleMaster.setIndentTaxVat0(Double.parseDouble(request.getParameter("txtTax0")));
		}
		else
		{
			indentSaleMaster.setIndentTaxVat0(0.0);
		}*/
		
		indentSaleMaster.setIndentTaxVat0(Double.parseDouble(request.getParameter("txtTax0")));
		//unitId
		if(unitId!=null)
		{
			indentSaleMaster.setUnitId(unitId);
		}
		
		if(userId!=null)
		{
			indentSaleMaster.setIndentSaleUserId(userId);
		}
		
		if(request.getParameter("txtCategoryId")!=null && request.getParameter("txtCategoryId")!="")
		{	
			indentSaleMaster.setIndentBillCatId(Integer.parseInt(request.getParameter("txtCategoryId")));
		}
		else
		{
			indentSaleMaster.setIndentBillCatId(1);
		}
		
		
		   /*Double preAmtBal = indentService.getPreBalance(request.getParameter("txtIndentNo"));
		   Double netAmt = Double.parseDouble(request.getParameter("txtNetAmt"));
	       Double amtRec = Double.parseDouble(request.getParameter("txtAmtRec"));
	      
	       Double amtBal=preAmtBal+netAmt-amtRec;
	       DecimalFormat df = new DecimalFormat("###.###");
	       Double result1=Double.parseDouble(df.format(amtBal));*/
	       
	       indentSaleMaster.setIndentSaleAmountBalance(Double.parseDouble(request.getParameter("txtAmtBal")));
	       indentSaleMaster.setIndentSalePreviousBalance(Double.parseDouble(request.getParameter("indentSalePreviousBalance")));
		
		indentSaleMaster.setIndentBillMode(Integer.parseInt(request.getParameter("paymentMode")));
		indentSaleMaster.setIndentSaleType(request.getParameter("saleType"));
		indentSaleMaster.setIndentSaleDeleteFlag(0);
		indentSaleMaster.setIndentSaleDocNo(request.getParameter("txtDocNo"));
		/*indentSaleMaster.setMrnAddedBy(userId.toString());
		indentSaleMaster.setMrnModBy(userId.toString());*/
		
		/*indentSaleMaster.setIndentSaleStoreId(Integer.parseInt(request.getParameter("storeId")));*/
		
		if(storeId!=null)
		{
			indentSaleMaster.setIndentSaleStoreId(Integer.parseInt(storeId));
		}
		
		indentSaleMaster.setIpAddress(ipaddress);
		
		IndentMaster indentMaster=new IndentMaster();
		indentMaster.setIndentId(Integer.parseInt(request.getParameter("txtIndentNo")));
		indentSaleMaster.setIndentMaster(indentMaster); 
		
		String txtDate= request.getParameter("txtDate");
		String fromArray[]=txtDate.split("/");
		StringBuffer fromReult=new StringBuffer();
		fromReult=fromReult.append(fromArray[2]+"-"+fromArray[1]+"-"+fromArray[0]);
		
		SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
		Date date=dateFormat.parse(fromReult.toString());
		
		indentSaleMaster.setIndentSaleUpdateDate(date);
		indentSaleMaster.setIndentSaleReceivedDate(date);
		
		/*indentSaleMaster.setMrnIssueReceiveTime(request.getParameter("txtTime"));
		indentSaleMaster.setMrnIssueNarration(request.getParameter("txtNaration"));*/
		
		Map<String, String> result=indentService.saveIndentSale(indentSaleMaster,storeId);
		
		result.put("id", indentSaleMaster.getIndentSalelId().toString());
		
	
		return result;
		
	}
	
//suraj code
	/*
	 
	 */
	
	
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getHospitalSaleBillLIst() {
		ModelAndView modelAndView = new ModelAndView();

		List<IndentSaleMaster> indentSaleMasters = indentService
				.getIndentList();
		modelAndView.addObject("ltIndentSaleMasters", indentSaleMasters);

		modelAndView.setViewName("pharma_indent_sale_list");
		return modelAndView;
	}
	
	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printIndent(@RequestParam("indentSalelId") Integer indentSalelId) {
		ModelAndView modelAndView = new ModelAndView();
		IndentSaleMaster indentSaleMaster2 = new IndentSaleMaster();
		
		try
		{
			indentSaleMaster2 = indentService.getIndentSaleById(indentSalelId);
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		
		IndentSale indentSale=new IndentSale();
		IndentSale indentSale1=new IndentSale();
		IndentSale indentSale2=new IndentSale();
		String billCategory=null;
		try
		{
			indentSale= indentService.getPatientDataByIndentId(indentSaleMaster2.getIndentMaster().getIndentId());
			indentSale1= indentService.getSponserByIndentId(indentSaleMaster2.getIndentMaster().getIndentId());
			indentSale2= indentService.getConsultantByIndentId(indentSaleMaster2.getIndentMaster().getIndentId());
			
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		String pname=indentSale.getPatientName();
		String pid=indentSale.getPatientId();
		String paddress=indentSale.getPatientAddress();
		String mobileNumber=indentSale.getPatientMobileNumber();
		String sponserName=indentSale1.getSponserName();
		String consultantName=indentSale2.getConsultantName();
		
		
		EhatEnterpriseUtil enterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		billCategory=enterpriseUtil.getBillCategoryByIndentSaleId(indentSalelId);
		
		modelAndView.addObject("indentSalePatientData", pname);
		modelAndView.addObject("indentSalePatientId", pid);
		modelAndView.addObject("indentSalePatientAddress", paddress);
		modelAndView.addObject("indentSalePatientNumber", mobileNumber);
		modelAndView.addObject("indentSaleSponserName", sponserName);
		modelAndView.addObject("indentSaleDoctorName", consultantName);
		modelAndView.addObject("billCategory", billCategory);
		
		List<IndentSaleMaster> indentSaleMasters=new ArrayList<IndentSaleMaster>();
		indentSaleMasters.add(indentSaleMaster2);
		
		modelAndView.addObject("indentData", indentSaleMasters);
		modelAndView.setViewName("pharma_indent_sale_bill");
		return modelAndView;
	}
	
	@RequestMapping(value = "/getIndentSaleDataById", method = RequestMethod.GET)
	public @ResponseBody IndentSaleMaster getIndentSaleDataById(@RequestParam("indentSaleId")Integer indentSaleId) {

		IndentSaleMaster indentMaster = new IndentSaleMaster();
		indentMaster = indentService.getIndentSaleByClientIndentId(indentSaleId);
		return indentMaster;
	}
	
	@RequestMapping(value = "/getIndentSaleDataByPatientName", method = RequestMethod.GET)
	public @ResponseBody List<IndentSaleMaster> getIndentSaleDataByPatientId(@RequestParam("PatientId")Integer PatientId) {

		List<IndentSaleMaster> indentMaster = new ArrayList<IndentSaleMaster>();
		indentMaster = indentService.getIndentSaleByPatientId(PatientId);
		return indentMaster;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteIndentSale(@RequestParam("indentSaleId") Integer indentId) {
		/*Boolean flag = false;
		if (indentService.deleteIndent(indentId,"indentSale")) {
			flag = true;
		}
		return flag;*/
		Boolean flag = false;
		Integer userId = 0;
		String ipaddress = "aa";
		if (indentService.deleteIndent(indentId, "indentSale", userId, ipaddress)) {
			flag = true;
		}
		return flag;

	}
	
	
	@RequestMapping(value = "/getPendingIndentDetails", method = RequestMethod.GET)
	public @ResponseBody List<IndentMaster> getPendingIndentDetails() {
		List<IndentMaster> indentMasters = indentService.getPendingIndentDetails();
		return indentMasters;
	}
	
	@RequestMapping(value = "/getPendingIndentDetailsForMaster", method = RequestMethod.GET)
	public @ResponseBody List<IndentMasterResult> getPendingIndentDetailsForMaster() {
		List<IndentMasterResult> indentMasters = indentService.getPendingIndentDetailsForMaster();
		return indentMasters;
	}
	
	@RequestMapping(value = "/autoSuggestionIndentNumber", method = RequestMethod.GET)
	public @ResponseBody List<IndentSaleMaster> autoSuggestionInward(@RequestParam("letter")Integer letter) {
		 
		List<IndentSaleMaster> indentSaleMasters = indentService.getAutoSuggestionIndentNames(letter);
		return indentSaleMasters;
	}
	
	//Added By Akshata
	@RequestMapping(value = "/autoSuggestionPatientName", method = RequestMethod.GET)
	public @ResponseBody List<IndentSaleMaster> autoSuggestionPatientName(@RequestParam("letter")String letter) {
		 
		List<IndentSaleMaster> indentSaleMasters = indentService.autoSuggestionPatientName(letter);
		return indentSaleMasters;
	}
	
	@RequestMapping(value = "/saveHospitalPayDetails", method = RequestMethod.GET)
	public @ResponseBody String saveHospitalPayDetails(@RequestParam("amount")String amount,@RequestParam("treatmentId")Integer treatmentId,
			@RequestParam("BalanceType")String BalanceType) {
		 
		String msg="";
		if(indentService.saveHospitalPayDetails(amount,treatmentId,BalanceType))
		{
			msg="Ok";
		}
		else{
			msg="Error";
		}
		
		return msg;
	}
	/*****************************for IPD billing of pharmacy balance* @author husenbadshah @30 oct 2015*************************************************/
	@RequestMapping(value = "/saveHospitalTotalPayDetails", method = RequestMethod.GET)
	public @ResponseBody String saveHospitalTotalPayDetails(HttpServletRequest request,HttpServletResponse response) {
		 
		boolean flag=false;
		float pharmaBalance= 0.0f;
		float PharmacyTotalBill= 0.0f;
		float PharmacyTotalReceived= 0.0f;
		float PatientBalance= 0.0f;
		String narration="";
		String message="";
		int isRead=0;
		int treatmentId=0;;
		
		HttpSession session =request.getSession();
		Integer userId=(Integer) session.getAttribute("userId");
		
		if(request.getParameter("treatmentId")!="" || request.getParameter("treatmentId")!=null)
			treatmentId=Integer.parseInt(request.getParameter("treatmentId"));
		
		if(request.getParameter("pharmaBalance")!="0.0" || request.getParameter("pharmaBalance")!=null)
			pharmaBalance=Float.parseFloat(request.getParameter("pharmaBalance"));
		
		if(request.getParameter("PharmacyTotalBill")!="0.0" || request.getParameter("PharmacyTotalBill")!=null)
			PharmacyTotalBill=Float.parseFloat(request.getParameter("PharmacyTotalBill"));
		
		if(request.getParameter("PharmacyTotalReceived")!="0.0" || request.getParameter("PharmacyTotalReceived") !=null)
			PharmacyTotalReceived=Float.parseFloat(request.getParameter("PharmacyTotalReceived"));
		
		if(request.getParameter("PatientBalance")!="0.0" || request.getParameter("PatientBalance")!=null)
			PharmacyTotalReceived=Float.parseFloat(request.getParameter("PatientBalance"));
		
		
		if(request.getParameter("narration")!="" || request.getParameter("narration")!=null)
			narration=request.getParameter("narration");
		
		if(indentService.saveHospitalTotalPayDetails(treatmentId,pharmaBalance,PharmacyTotalBill,PharmacyTotalReceived,PatientBalance,narration,userId))
		{
			flag=true;
			message="Amount dispatched successfully..";
		}
		else{
			flag=false;
			message="Error in dispatching amount to pharmacy..";
		}
		
		return message;
		
	}
	
	@RequestMapping(value = "/getPendingAmount", method = RequestMethod.GET)
	public @ResponseBody String  getPendingAmount(@RequestParam("indentNo")Integer indentNo) {
		 
		Double amount = indentService.getPendingAmount(indentNo);
		return amount.toString();
	}
	
	@RequestMapping(value = "/getAllPatientData", method = RequestMethod.GET)
	public @ResponseBody List<IndentSale> getAllPatientData() {

		List<IndentSale> IndentSale = new ArrayList<IndentSale>();
		IndentSale = indentService.getAllPatientData();
		return IndentSale;
	}
	
	@RequestMapping(value = "/getAllIndentDataByTreatmentId", method = RequestMethod.GET)
	public @ResponseBody List<IndentSaleMaster> getAllIndentDataByTreatmentId(@RequestParam("treatmentId")Integer treatmentId) {

		List<IndentSaleMaster> IndentSale = new ArrayList<IndentSaleMaster>();
		IndentSale = indentService.getAllIndentDataByTreatmentId(treatmentId);
		return IndentSale;
	}
	
	@RequestMapping(value = "/getAllSettalBillTreatmentId", method = RequestMethod.GET)
	public @ResponseBody List<settalBillIndent> getAllSettalBillByTreatmentId(@RequestParam("treatmentId")Integer treatmentId) 
	{

		List<settalBillIndent> IndentSale = new ArrayList<settalBillIndent>();
		IndentSale = indentService.getAllSettalBillByTreatmentId(treatmentId);
		return IndentSale;
	}
	
	@RequestMapping(value = "/getAllPatientBillTreatmentId", method = RequestMethod.GET)
	public @ResponseBody List<settalBillIndent> getAllSettalBillPatientDataByTreatmentId(@RequestParam("patientId")Integer patientId) 
	{

		List<settalBillIndent> IndentSale = new ArrayList<settalBillIndent>();
		IndentSale = indentService.getAllSettalBillPatientDataByTreatmentId(patientId);
		return IndentSale;
	}
	
	@RequestMapping(value = "/getAllIndentProductDataByTreatmentId", method = RequestMethod.GET)
	public @ResponseBody List<CreditNoteIndent> getAllIndentProductDataByTreatmentId(@RequestParam("indentId")Integer indentId) {

		List<CreditNoteIndent> IndentSale = new ArrayList<CreditNoteIndent>();
		IndentSale = indentService.getAllIndentProductDataByTreatmentId(indentId);
		return IndentSale;
	}
	
	@RequestMapping(value = "/getAllIndentReceiptDataByTreatmentId", method = RequestMethod.GET)
	public @ResponseBody List<CreditNoteIndent> getAllIndentReceiptDataByTreatmentId(@RequestParam("treatmentId")Integer treatmentId) {

		List<CreditNoteIndent> IndentSale = new ArrayList<CreditNoteIndent>();
		IndentSale = indentService.getAllIndentReceiptDataByTreatmentId(treatmentId);
		return IndentSale;
	}
	
	
	@RequestMapping(value = "/getPendingAmountByTreatmentId", method = RequestMethod.GET)
	public @ResponseBody String  getPendingAmountByTreatmentId(@RequestParam("treatmentId")Integer treatmentId,@RequestParam("spId")Integer spId) {
		 
		String amount = indentService.getPendingAmountByTreatmentId(treatmentId,spId);
		return amount;
	}
	
	@RequestMapping(value = "/getReceiveAmountByTreatmentId", method = RequestMethod.GET)
	public @ResponseBody String  getReceiveAmountByTreatmentId(@RequestParam("treatmentId")Integer treatmentId) {
		 
		Double amount = indentService.getReceiveAmountByTreatmentId(treatmentId);
		return amount.toString();
	}
	
	@RequestMapping(value = "/saveIndentPendingAmount", method = RequestMethod.GET)
	public @ResponseBody boolean  saveIndentPendingAmount(HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) {
		 
		/*Double amount = indentService.getPendingAmountByTreatmentId(treatmentId);*/
		Double amountReceive=0.0;		
		Double discount=0.0;
		Double balance=0.0;
		String narration="";
		String listStr="";		
		Integer treatmentId=Integer.parseInt(httpServletRequest.getParameter("treatmentId"));
		
		if(httpServletRequest.getParameter("listStr")!=null && httpServletRequest.getParameter("listStr")!="")
			listStr=httpServletRequest.getParameter("listStr");
	
		
		boolean result=indentService.saveIndentPendingAmount(treatmentId,amountReceive,discount,narration,balance,listStr);
		return result;
	}
	
	@RequestMapping(value = "/saveIndentComment", method = RequestMethod.GET)
	public @ResponseBody boolean  saveIndentComment(HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) {
		 	
		Integer  indentId=0;
		Double balance=0.0;
		String narration="";
		
		HttpSession session = httpServletRequest.getSession(true);
		Integer userId=(Integer)session.getAttribute("userId1");
		
		String ipaddress=httpServletRequest.getRemoteAddr();
		
		if(httpServletRequest.getParameter("indentId")!=null && httpServletRequest.getParameter("indentId")!="")
			indentId=Integer.parseInt(httpServletRequest.getParameter("indentId"));
		
		if(httpServletRequest.getParameter("narration")!=null && httpServletRequest.getParameter("narration")!="")
			narration=httpServletRequest.getParameter("narration");
		
		
		boolean result=indentService.saveIndentComment(indentId,narration,userId,ipaddress);
		return result;
	}
	
	@RequestMapping(value = "/printFinalView", method = RequestMethod.GET)
	public ModelAndView printFinalIndent(@RequestParam("treatmentId") Integer treatmentId) {
		ModelAndView modelAndView = new ModelAndView();
		FinalIndent finalIndent = new FinalIndent();
		
		try
		{
			finalIndent = indentService.getFinalBillDetails(treatmentId);
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		
		IndentSale indentSale=new IndentSale();
		try
		{
			indentSale= indentService.getPatientDataByTreatmentId(Integer.parseInt(finalIndent.getTreatmentId()));
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		String pname=indentSale.getPatientName();
	/*	modelAndView.addObject("indentSalePatientData", pname);*/
		
		modelAndView.addObject("indentSalePatientData", pname);
		modelAndView.addObject("amountReceive", finalIndent.getAmountReceive());
		modelAndView.addObject("narration", finalIndent.getNarration());
		modelAndView.addObject("discount", finalIndent.getDiscount());
		modelAndView.addObject("date", finalIndent.getDate());
		modelAndView.addObject("billId", finalIndent.getHistoryId());
		
		System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"+finalIndent.getHistoryId());
		
		modelAndView.addObject("indentData", finalIndent);
		modelAndView.setViewName("pharma_indent_sale_final_bill");
		return modelAndView;
	}
	
	@RequestMapping(value = "/FinalView", method = RequestMethod.GET)
	public ModelAndView printFinalIndentView(@RequestParam("treatmentId") Integer treatmentId) {
		ModelAndView modelAndView = new ModelAndView();
		FinalIndent finalIndent = new FinalIndent();
		
		try
		{
			finalIndent = indentService.getFinalBillDetailsForSave(treatmentId);
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		
		IndentSale indentSale=new IndentSale();
		try
		{
			indentSale= indentService.getPatientDataByTreatmentId(treatmentId);
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		String pname=indentSale.getPatientName();
	/*	modelAndView.addObject("indentSalePatientData", pname);*/
		
		modelAndView.addObject("indentSalePatientData", pname);
		modelAndView.addObject("amountReceive", finalIndent.getAmountReceive());
		modelAndView.addObject("narration", finalIndent.getNarration());
		modelAndView.addObject("discount", finalIndent.getDiscount());
		modelAndView.addObject("date", finalIndent.getDate());
		modelAndView.addObject("billId", finalIndent.getHistoryId());
		
		modelAndView.addObject("indentData", finalIndent);
		modelAndView.setViewName("pharma_indent_sale_final_bill");
		return modelAndView;
		
	}
	
	@RequestMapping(value = "/getPreviousIndentData", method = RequestMethod.GET)
	public @ResponseBody String  getPreviousIndentData(@RequestParam("treatmentId")Integer treatmentId) {
		 
		JSONArray jsonArray = indentService.getPreviousIndentData(treatmentId);
		return JSONValue.toJSONString(jsonArray);
	}
	
	@RequestMapping(value = "/getCancelIndentData", method = RequestMethod.GET)
	public @ResponseBody String  getCancelIndentData(@RequestParam("treatmentId")Integer treatmentId) {
		 
		JSONArray jsonArray = indentService.getCancelIndentData(treatmentId);
		return JSONValue.toJSONString(jsonArray);
	}
	
	@RequestMapping(value = "/GetTotalDiscountOnBillByTreatmentId", method = RequestMethod.GET)
	public @ResponseBody String  getTotalDiscountOnBillByTreatmentId(@RequestParam("treatmentId")Integer treatmentId) {
		 
		Double amount = indentService.getTotalDiscountOnBillByTreatmentId(treatmentId);
		return amount.toString();
	}
	
	@RequestMapping(value = "/getTotalindetDataByTreatmentId", method = RequestMethod.GET)
	public @ResponseBody String  getTotalindetDataByTreatmentId(@RequestParam("treatmentId")Integer treatmentId) {
		 
		JSONArray jsonArray = indentService.getTotalindetDataByTreatmentId(treatmentId);
		return JSONValue.toJSONString(jsonArray);
	}
	
	@RequestMapping(value = "/getMultipleIndentSaleDataById", method = RequestMethod.GET)
	public @ResponseBody List<IndentSaleMaster>  getMultipleIndentSaleDataById(@RequestParam("indentId")Integer indentId) {
		 
		List<IndentSaleMaster> indentSaleMasters = indentService.getMultipleIndentSaleDataById(indentId);
		return indentSaleMasters;
	}
	
	@RequestMapping(value = "/deleteIndent", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteIndent(@RequestParam("indentId") Integer indentId,HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) {
		Boolean flag = false;
		HttpSession session = httpServletRequest.getSession(true);
		Integer userId=(Integer)session.getAttribute("userId1");
		
		String ipaddress=httpServletRequest.getRemoteAddr();
		if (indentService.deleteIndent(indentId, "indent", userId, ipaddress)) {
			flag = true;
		}
		
		return flag;
	}
			
	@RequestMapping(value = "/getHospitalPaymentDetailsTreatmentId", method = RequestMethod.GET)
	public @ResponseBody List<settalBillIndent> getHospitalPaymentDetailsTreatmentId(@RequestParam("treatmentId")Integer treatmentId) 
	{

		List<settalBillIndent> IndentSale = new ArrayList<settalBillIndent>();
		IndentSale = indentService.getHospitalPaymentDetailsTreatmentId(treatmentId);
		return IndentSale;
	}
	
	@RequestMapping(value = "/printHospitalPaymentReceipt", method = RequestMethod.GET)
	public ModelAndView printHospitalPaymentReceipt(@RequestParam("receiptId") Integer receiptId) {
		ModelAndView modelAndView = new ModelAndView();
		FinalIndent finalIndent = new FinalIndent();
		
		try
		{
			finalIndent = indentService.printHospitalPaymentReceipt(receiptId);
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		
		IndentSale indentSale=new IndentSale();
		try
		{
			indentSale= indentService.getPatientDataByTreatmentId(Integer.parseInt(finalIndent.getTreatmentId()));
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		String pname=indentSale.getPatientName();
	/*	modelAndView.addObject("indentSalePatientData", pname);*/
		
		modelAndView.addObject("indentSalePatientData", pname);
		modelAndView.addObject("amountReceive", finalIndent.getAmountReceive());
		modelAndView.addObject("narration", finalIndent.getNarration());
		modelAndView.addObject("amountPaid", finalIndent.getBalance());
		modelAndView.addObject("date", finalIndent.getDate());
		modelAndView.addObject("time", finalIndent.getTime());
		modelAndView.addObject("billNo", finalIndent.getHistoryId());
		
		modelAndView.addObject("indentData", finalIndent);
		modelAndView.setViewName("pharma_hospital_payment_receipt");
		return modelAndView;
	}
	
	@RequestMapping(value = "/chkIndentReceived", method = RequestMethod.GET)
	public @ResponseBody Integer chkIndentReceived(@RequestParam("indentNo")Integer indentNo) 
	{
		Integer flag = 0;
		if (indentService.chkIndentReceived(indentNo)==1) {
			flag = 1;
		}
		System.out.println("<<<<<<<<<<<<<<<<<<<<<<"+indentNo+"<<<<<<<<<<<<<<<<<<<<<"+flag);
		return flag;
	}
	
	@RequestMapping(value = "/getSponserStatus", method = RequestMethod.GET)
	public @ResponseBody String  getSponserStatus(@RequestParam("treatmentId")Integer treatmentId) 
	{
		 
		JSONObject jsonObj = indentService.getSponserStatus(treatmentId);
		return JSONValue.toJSONString(jsonObj);
	}
	
	@RequestMapping(value = "/getMRPType", method = RequestMethod.GET)
	public @ResponseBody String  getMRPType(@RequestParam("treatmentId")Integer treatmentId) 
	{
		 
		String flag= indentService.getMRPType(treatmentId);
		return flag;
	}
	
	@RequestMapping(value = "/getReturnAmt", method = RequestMethod.GET)
	public @ResponseBody String  getReturnAmt(@RequestParam("treatmentId")Integer treatmentId) {
		 
		Double amount = indentService.getReturnAmt(treatmentId);
		return amount.toString();
	}
	
	/**
	 * @author Pooja @date 17_Apr-2018 
	 *         fetch Indent of patient for DS Print 
	 * **/
	@RequestMapping(value = "/getIndentDetails", method = RequestMethod.GET)
	public @ResponseBody List<IndentSaleSlave>  getIndentSaleDataByTreatId(Integer treatmentId) {
		List<IndentSaleSlave> indentSaleMasters = indentService.getIndentSaleDataByTreatId(treatmentId);
		return indentSaleMasters;
	}
	
	/**
	 *
	 * @Code :This method for to edit prev indent 
	 * @return
	 * author : vishant pawar
	 **/
	@RequestMapping(value = "/editPreIndentByIndentId", method = RequestMethod.POST)
	public @ResponseBody
	String editPreIndentByIndentId(@RequestBody IndentMaster indentMaster) {
		//log.info("In Pharmacy getTotalStock()");
		return indentService.editPreIndentByIndentId(indentMaster);
	}
	//Added By Annapurna Code For Search Indent Patient
	@RequestMapping(value = "/searchIndentSalePatientDetails", method = RequestMethod.GET)
	
	public @ResponseBody
	List<IndentMaster> searchpatientDetails(@RequestParam("findtext") String findtext,HttpServletRequest request) {
		List<IndentMaster> list=new ArrayList<IndentMaster>();
		list = indentService.searchIndentSalePatientDetails(findtext);
		return  list;
	}
}