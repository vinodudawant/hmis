package com.hms.pharmacy.controller;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.CreditNoteMaster;

import com.hms.pharmacy.pojo.PatientMaster;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.CreditNoteService;
import com.hms.pharmacy.service.ProductService;


@Controller
@RequestMapping(value = "/creditNote")
public class CreditNoteController 
{
	@Autowired
	CreditNoteService creditNoteService;
	
	@Autowired
	ProductService productService;
	
	@Autowired
	CommonService commonService;
	
	
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getCreditNoteView(HttpServletRequest request,HttpServletResponse response) 
	{
		ModelAndView modelAndView = new ModelAndView();
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			List<CreditNoteMaster> ltcreditNoteMasters = creditNoteService.getCreditNoteList();
			modelAndView.addObject("ltcreditNoteMasters", ltcreditNoteMasters);
			modelAndView.setViewName("Pharma_Credit_Note_List");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}
	
	
	
	@RequestMapping(value = "/view-frm", method = RequestMethod.GET)
	public ModelAndView getCreditNoteViewList(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			modelAndView.addObject("creditNote", new CreditNoteMaster());
			modelAndView.setViewName("Pharma_Credit_Notes");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		
		ResourceBundle bundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String stockDetails= bundle.getObject("creditNoteFetchStock").toString();
		
		HttpSession httpSession=request.getSession();
		httpSession.setAttribute("fetchStockOptionForCreditNote", stockDetails);
		
		return modelAndView;
	}
	

	
	@RequestMapping(value = "/saveCreditNote", method = RequestMethod.POST)
	public @ResponseBody Map<String, String> saveOrUpdateCreditNote(HttpServletRequest request) throws ParseException 
	{
		HttpSession session = request.getSession(true);
		Integer userId=(Integer)session.getAttribute("userId1");
		//Unit ID From session 
		Integer unitId =(Integer) session.getAttribute("uId");
		
		java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
		java.util.Calendar cal = java.util.Calendar.getInstance();
		String time=dateFormat1.format(cal.getTime());
		
		Map<String, String> result=new HashMap<String, String>();
		
		String storeId=(String) session.getAttribute("pharmacyStoreId");
				
		String list[]= request.getParameterValues("creditNoteSlaves");
		
		CreditNoteMaster creditNoteMaster=new CreditNoteMaster();
		
		String str = list[0].substring(0, list[0].length());
		
		creditNoteMaster = (CreditNoteMaster) ConfigUIJSONUtility.getObjectFromJSON(str,
			CreditNoteMaster.class);
		
		int type=Integer.parseInt(request.getParameter("returnType"));
		if(type==1)
			creditNoteMaster.setCreditNoteType("indentSale");
		
		else if(type==2)
			creditNoteMaster.setCreditNoteType("patientSale");
		
		else
			creditNoteMaster.setCreditNoteType("counterSale");
		
			
		creditNoteMaster.setPatientName(request.getParameter("patientName"));
		creditNoteMaster.setPatientAddress(request.getParameter("patientAddress"));
	    creditNoteMaster.setPatientPhone((request.getParameter("patientPhone")));
		creditNoteMaster.setCreditNoteTransactionType(request.getParameter("transationType"));
	
		
		if(request.getParameter("txtNarration")!=null && request.getParameter("txtNarration")!="")
		{
			creditNoteMaster.setCreditNoteNarration(request.getParameter("txtNarration"));
		}
			
		if(request.getParameter("discPer")!=null && request.getParameter("discPer")!="")
		{
			creditNoteMaster.setCreditNoteDiscPercent((request.getParameter("discPer")));
		}
	
		
		if(request.getParameter("disc")!=null && request.getParameter("disc")!="")
		{
			creditNoteMaster.setCreditNoteDiscount(request.getParameter("disc"));	
		}
	
		
		if(request.getParameter("surCharge")!=null && request.getParameter("surCharge")!="")
		{
			creditNoteMaster.setCreditNoteSurcharge(request.getParameter("surCharge"));
		}
		
		
		if(request.getParameter("adjBillNo")!=null && request.getParameter("adjBillNo")!="")
		{
			creditNoteMaster.setCreditNoteBillNo(request.getParameter("txtSurcharge"));
		}
		
		
	/*	if(request.getParameter("adjBillDate")!=null && request.getParameter("adjBillDate")!="")
		{
			creditNoteMaster.setCreditNoteBillDate(Double.parseDouble(request.getParameter("adjBillDate")));
		}
		else
		{
			creditNoteMaster.setCreditNoteBillDate(0.0);
		}*/
	
		//new tax field add by suraj
		if(request.getParameter("enterBy")!=null && request.getParameter("enterBy")!="")
		{
			creditNoteMaster.setCreditNoteEntryBy((request.getParameter("enterBy")));
		}
		
		
		if(request.getParameter("less")!=null && request.getParameter("less")!="")
		{
			creditNoteMaster.setCreditNoteLess((request.getParameter("less")));
		}
		
		
		if(request.getParameter("add")!=null && request.getParameter("add")!="")
		{
			creditNoteMaster.setCreditNoteAdd((request.getParameter("add")));
		}
	
		
		if(request.getParameter("gross")!=null && request.getParameter("gross")!="")
		{
			creditNoteMaster.setCreditNoteGrossAmt(Double.parseDouble(request.getParameter("gross")));
		}
		
		
		if(request.getParameter("netAmt")!=null && request.getParameter("netAmt")!="")
		{
			creditNoteMaster.setCreditNoteNetAmt(Double.parseDouble(request.getParameter("netAmt")));
		}
		
		if(request.getParameter("hiddenTreatmentId")!=null || request.getParameter("hiddenTreatmentId")!="")
		{
			
			creditNoteMaster.setCreditNoteTreatmentId(Integer.parseInt(request.getParameter("hiddenTreatmentId")));
		}
	if(request.getParameter("patientSaleId")!=null && request.getParameter("patientSaleId")!="")
		{
			creditNoteMaster.setCreditNotePatientSaleId(Integer.parseInt(request.getParameter("patientSaleId")));
		}
		
		if(request.getParameter("counterSaleId")!=null && request.getParameter("counterSaleId")!="")
		{
			creditNoteMaster.setCreditNoteCounterSaleId(Integer.parseInt(request.getParameter("counterSaleId")));
		}
		if(request.getParameter("indentSaleId")!=null && request.getParameter("indentSaleId")!="")
		{
			creditNoteMaster.setCreditNotIndentSaleId(Integer.parseInt(request.getParameter("indentSaleId")));
		}	
		
		if(request.getParameter("taxVat5")!=null && request.getParameter("taxVat5")!="")
		{
			creditNoteMaster.setCreditTaxVat5(Double.parseDouble(request.getParameter("taxVat5")));
		}
		
		if(request.getParameter("taxVat55")!=null && request.getParameter("taxVat55")!="")
		{
			creditNoteMaster.setCreditTaxVat55(Double.parseDouble(request.getParameter("taxVat55")));
		}
		
		if(request.getParameter("taxVat12")!=null && request.getParameter("taxVat12")!="")
		{
			creditNoteMaster.setCreditTaxVat12(Double.parseDouble(request.getParameter("taxVat12")));
		}
		
		if(request.getParameter("taxVat0")!=null && request.getParameter("taxVat0")!="")
		{
			creditNoteMaster.setCreditTaxVat0(Double.parseDouble(request.getParameter("taxVat0")));
		}
       
		if(request.getParameter("patientId")!=null && request.getParameter("patientId")!="")
		{
			creditNoteMaster.setCreditPatientId(Integer.parseInt(request.getParameter("patientId")));
		}
		
		creditNoteMaster.setCreditNotePayable(Double.parseDouble(request.getParameter("amtPayable")));
		creditNoteMaster.setCreditNotePrevBal(Double.parseDouble(request.getParameter("prevBalance")));
		creditNoteMaster.setCreditNoteCurrentBal(Double.parseDouble(request.getParameter("amtBalance")));
		creditNoteMaster.setCreditNoteDocNo(request.getParameter("DocNo"));
		
		creditNoteMaster.setCreditNoteDeleteFlag(0);
		creditNoteMaster.setCreditNoteTime(time);
		
		if(unitId!=null)
		{
			creditNoteMaster.setUnitId(unitId);
		}
		
		if(userId!=null)
			creditNoteMaster.setCreditNoteUserId(Integer.parseInt(userId.toString()));
		
		if(storeId!=null)
		{
			creditNoteMaster.setCreditNoteStoreId(Integer.parseInt(storeId.toString()));
		}
		
		else
		{
			 result.put("error", "Session Not valid");
		}
		
		if(request.getParameter("adjBillDate")!=null && request.getParameter("adjBillDate")!="")
		{
		String txtDate= request.getParameter("adjBillDate");
		String fromArray[]=txtDate.split("/");
		StringBuffer fromReult=new StringBuffer();
		fromReult=fromReult.append(fromArray[2]+"-"+fromArray[1]+"-"+fromArray[0]);
		SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
		Date date=dateFormat.parse(fromReult.toString());
		creditNoteMaster.setCreditNoteUpdateDate(date);
		creditNoteMaster.setCreditNoteBillDate(date);
		}
		
		String txtDate1= request.getParameter("vouDate");
		String fromArray1[]=txtDate1.split("/");
		StringBuffer fromReult1=new StringBuffer();
		fromReult1=fromReult1.append(fromArray1[2]+"-"+fromArray1[1]+"-"+fromArray1[0]);
		
		SimpleDateFormat dateFormat11=new SimpleDateFormat("yyyy-MM-dd");
		Date date1=dateFormat11.parse(fromReult1.toString());
		
		creditNoteMaster.setCreditNotDate(date1);	
		
		result=creditNoteService.saveOrUpdateCreditNote(creditNoteMaster,storeId);
		
		if(creditNoteMaster.getCreditNoteId()!=null)
			result.put("id", creditNoteMaster.getCreditNoteId().toString());
		return result;
	}
	
	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printPo(@RequestParam("creditNoteId") Integer creditNoteId) {
		ModelAndView modelAndView = new ModelAndView();
		CreditNoteMaster creditNoteMaster1=new CreditNoteMaster();
		try
		{
			creditNoteMaster1=getCreditNotebyCreditIdForPrint(creditNoteId);
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		
		List<CreditNoteMaster> creditNoteMasters=new ArrayList<CreditNoteMaster>();
		creditNoteMasters.add(creditNoteMaster1);
		
		modelAndView.addObject("creditNoteData", creditNoteMasters);
		modelAndView.setViewName("pharma_credit_note_bill");
		
		/*modelAndView.setViewName("redirect:view");*/
		return modelAndView;
	}
	
	@RequestMapping(value = "/getCreditNotebyPatientId", method = RequestMethod.GET)
	public @ResponseBody
	List<CreditNoteMaster> getCreditNotebyPatientId(@RequestParam("patientId") Integer patientId) {
		List<CreditNoteMaster> creditNoteMasters = new ArrayList<CreditNoteMaster>();
		creditNoteMasters = creditNoteService.getCreditNotebyPatientId(patientId);
		return creditNoteMasters;
	}
	
	////get Product details
	@RequestMapping(value = "/getProductDetails", method = RequestMethod.GET)
	public @ResponseBody
	String getProductDetails(@RequestParam("ProductId") Integer productId) {
		return creditNoteService.getProductDetails(productId);
	}
	
	@RequestMapping(value = "/getCreditNotebyCreditId", method = RequestMethod.GET)
	public @ResponseBody
	CreditNoteMaster getCreditNotebyCreditId(@RequestParam("creditNoteId") Integer creditNoteId) {
		CreditNoteMaster creditNoteMasters = new CreditNoteMaster();
		creditNoteMasters = creditNoteService.getCreditNotebyCreditId(creditNoteId);
		return creditNoteMasters;
	}
	
	@RequestMapping(value = "/getCreditNotebyCreditIdForPrint", method = RequestMethod.GET)
	public @ResponseBody
	CreditNoteMaster getCreditNotebyCreditIdForPrint(@RequestParam("creditNoteId") Integer creditNoteId) {
		CreditNoteMaster creditNoteMasters = new CreditNoteMaster();
		creditNoteMasters = creditNoteService.getCreditNotebyCreditIdForPrint(creditNoteId);
		return creditNoteMasters;
	}
	
	
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteCreditNote(@RequestParam("creditNoteId") Integer creditNoteId) {
		Boolean flag = false;
		if (creditNoteService.deleteCreditNote(creditNoteId)) {
			flag = true;
		}
		return flag;
	}
	
	////get autosuggetion only those product whos bill num is same
	@RequestMapping(value = "/autoSuggestionProductByBillNum", method = RequestMethod.GET)
	public @ResponseBody
	List<PatientSaleBillMaster> autoSuggestionProduct(
			@RequestParam("letter") String letter, @RequestParam("billNumber") String billNum) {

		List<PatientSaleBillMaster> productMasters = creditNoteService
				.getAutoSuggestionProduct(letter,billNum);
		return productMasters;
	}
	/*//get autosuggetion only those product whos bill num is same
	@RequestMapping(value = "/getPatientSaleBill", method = RequestMethod.GET)
	public @ResponseBody
	String getPatientSaleDetails(@RequestParam("BillNum") String  BillNum) {
		return creditNoteService.getPatientSaleDetails(BillNum);
	}*/
	
	@RequestMapping(value = "/autoSuggestionProductByBatch", method = RequestMethod.GET)
	public @ResponseBody
	List<String> autoSuggestionProductByBatch(
			@RequestParam("productId") Integer productId,HttpServletRequest request) {
		
		HttpSession session=request.getSession();
		String storeId=(String) session.getAttribute("pharmacyStoreId");

		List<String> results = creditNoteService.autoSuggestionProductByBatch(productId,storeId);
		return results;
	}
	
	@RequestMapping(value = "/autoSuggestionPatient", method = RequestMethod.GET)
	public @ResponseBody List<CreditNoteMaster> autoSuggestionPatient(@RequestParam("letter")String letter) {
		 
		List<CreditNoteMaster> patientMasters = creditNoteService.autoSuggestionPatient(letter);
		return patientMasters;
	}
	
	//suraj code for get pending amount by treatmentID
	@RequestMapping(value = "/getPendingAmounttByTreatId", method = RequestMethod.GET)
	public @ResponseBody
	Double getPendingAmounttByTreatId(
			@RequestParam("treatmentId") Integer treatmentId) {

		Double amount = creditNoteService
				.getPendingAmounttByTreatId(treatmentId);
		return amount;
	}
	
	//suraj code for get Total amount payble by treatmentID
		@RequestMapping(value = "/getTotalPaybleByTreatId", method = RequestMethod.GET)
		public @ResponseBody
		Double getTotalPaybleByTreatId(
				@RequestParam("treatmentId") Integer treatmentId) {

			Double amount = creditNoteService
					.getTotalPaybleByTreatId(treatmentId);
			return amount;
		}
		
		@RequestMapping(value = "/getCreditNoteDetailsBySaleId", method = RequestMethod.GET)
		public @ResponseBody
		String getHospitalPaymentDetails(@RequestParam("saleId") Integer saleId,@RequestParam("saleType") String saleType) {
			JSONArray batchData=new JSONArray();
			batchData = creditNoteService.getCreditNoteDetailsBySaleId(saleId,saleType);
			return JSONValue.toJSONString(batchData);
		}
		
		@RequestMapping(value = "/CreditNoteDetailsByPatientId", method = RequestMethod.GET)
		public @ResponseBody
		List<CreditNoteMaster> searchCreditNoteByPatientId(
				@RequestParam("patientCreditNoteId") Integer patientId) {
			List<CreditNoteMaster> ltpatientSaleBillMaster = new ArrayList<CreditNoteMaster>();
			ltpatientSaleBillMaster = creditNoteService.searchCreditNoteByPatientId(patientId);
			return ltpatientSaleBillMaster;
		}
		
		
		
}

