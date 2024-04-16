package com.hms.pharmacy.controller;
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

import org.json.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.dto.InventoryFetchPateintNameDTO;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.ehat.service.MarkVisitService;
import com.hms.ot.service.OperationThService;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.CreditNotePatient;
import com.hms.pharmacy.pojo.FinalIndent;
import com.hms.pharmacy.pojo.PatientSaleBill;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.PendingBill;
import com.hms.pharmacy.pojo.PrescriptionMaster;
import com.hms.pharmacy.pojo.settalBillIndent;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.PatientSaleBillService;

@Controller
@RequestMapping(value = "/patientSale")
public class PatientSaleBillController {

	@Autowired
	PatientSaleBillService patientSaleBillService;
	
	@Autowired
	OperationThService otService;
	
	@Autowired
	CommonService commonService;

	@Autowired
	MarkVisitService markvisitservice;
	
	@RequestMapping(value = "/view-frm", method = RequestMethod.GET)
	public ModelAndView getPatientSalesBillView(HttpServletRequest request,HttpServletResponse response) 
	{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("patientSalesBill", new PatientSaleBillMaster());
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);

		if(result)
		{
			modelAndView.setViewName("Pharma_Patient_Sales_Bill_Entry");
		}	
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		
		ResourceBundle bundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String stockDetails= bundle.getObject("patientSaleFetchStock").toString();
		
		HttpSession httpSession=request.getSession();
		httpSession.setAttribute("fetchStockOptionForPatientSale", stockDetails);
		
		
		return modelAndView;
	}

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getPatientSaleBillLIst()
	{
		ModelAndView modelAndView = new ModelAndView();

		List<PatientSaleBillMaster> ltPatientSaleMasters = patientSaleBillService
				.getPatientSales();
		modelAndView.addObject("ltPatientSaleMasters", ltPatientSaleMasters);

		modelAndView.setViewName("Pharma_Patient_Sales_Bill_Entry_List");
		return modelAndView;
	}

	@RequestMapping(value = "/view-bill", method = RequestMethod.GET)
	public ModelAndView editForm(
			@RequestParam("patientSalesBillId") Integer purId) {
		ModelAndView modelAndView = new ModelAndView();
		PatientSaleBillMaster patientSaleBillMaster = new PatientSaleBillMaster();

		patientSaleBillMaster = (PatientSaleBillMaster) patientSaleBillService
				.getPatientSaleBillIdForView(purId);
		modelAndView.addObject("patientSalesBill", patientSaleBillMaster);

		modelAndView.setViewName("Pharma_Patient_Sales_Bill_Entry_Edit");
		return modelAndView;
	}
	
	
	@RequestMapping(value = "/patientSaleBillList", method = RequestMethod.GET)
	public @ResponseBody
	List<PatientSaleBillMaster> getPatientSaleBill() {
		List<PatientSaleBillMaster> ltPurchaseMasters = new ArrayList<PatientSaleBillMaster>();
		ltPurchaseMasters = patientSaleBillService.getPatientSales();
		return ltPurchaseMasters;
	}

	/*@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdatePatientSaleBill(
			@ModelAttribute("PatientSaleBillMaster") PatientSaleBillMaster patientSaleBillMaster,BindingResult errors,HttpServletRequest request) {
		ModelAndView modelAndView = new ModelAndView();
		
		HttpSession session=request.getSession();
		
		
		String storeId=(String) session.getAttribute("pharmacyStoreId");
		if(storeId!=null)
		{
			patientSaleBillMaster.setIndentSaleStoreId(Integer.parseInt(storeId));
		}	
		
		if (patientSaleBillService
				.saveOrUpdatePatientSaleBill(patientSaleBillMaster,storeId)) {
			if (patientSaleBillMaster.getPatientSalesBillId() != null) {
				modelAndView.addObject("success",
						"Record saved successfully..!");
			} else {
				modelAndView.addObject("success",
						"Record updated successfully..!");
			}
		} else {
			modelAndView.addObject("error", "O! Something went wrong..!");
		}

		PatientSaleBillMaster billMaster = new PatientSaleBillMaster();
		if (patientSaleBillMaster.getPatientSalesBillId() != null) {
			try {
				billMaster = patientSaleBillService
						.getPatientSalesBillById(patientSaleBillMaster
								.getPatientSalesBillId());
			} catch (Exception e) {
				e.printStackTrace();
			}

			List<PatientSaleBillMaster> saleBillMasters = new ArrayList<PatientSaleBillMaster>();
			saleBillMasters.add(billMaster);


			PatientSale patientSale=new PatientSale();
			try
			{
									
				patientSale= patientSaleBillService.getSponserByPatientId(patientSaleBillMaster.getPatientSalesBillId());
						
			}
			catch(Exception exception)
			{
				exception.printStackTrace();
			}
			String sponserName=patientSale.getSponserName();
			
			modelAndView.addObject("patientSaleSponserName", sponserName);
			
			modelAndView.addObject("patientSaleData", saleBillMasters);
			modelAndView.setViewName("pharma_patient_sale_bill");
		}

		 modelAndView.setViewName("redirect:/pharmacy/patientSale/view"); 
		return modelAndView;
	}*/
	
	
	@RequestMapping(value = "/savePatientSale", method = RequestMethod.POST)
	public @ResponseBody Map<String, String> saveIndentSale(HttpServletRequest request) throws ParseException {
		
		HttpSession session = request.getSession(true);
		Integer userId=(Integer)session.getAttribute("userId1");
		//Unit ID From session 
		Integer unitId =(Integer) session.getAttribute("uId");
		
		java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
		java.util.Calendar cal = java.util.Calendar.getInstance();
		String time=dateFormat1.format(cal.getTime());
		
		Map<String, String> result=new HashMap<String, String>();
		
		String storeId=(String) session.getAttribute("pharmacyStoreId");
				
		String list[]= request.getParameterValues("ltPatientSaleBill");
		
		PatientSaleBillMaster patientSaleBillMaster=new PatientSaleBillMaster();
		
		String str = list[0].substring(0, list[0].length());
		str=str.replaceAll("null","1");
		patientSaleBillMaster = (PatientSaleBillMaster) ConfigUIJSONUtility
				.getObjectFromJSON(str,
						PatientSaleBillMaster.class);
		
		//Integer patId=Integer.parseInt(request.getParameter("patientId"));
		
		
		
		if(request.getParameter("txtCD")!=null && request.getParameter("txtCD")!="")
		{	
			/*Double txtCd= Double.parseDouble(request.getParameter("txtCD"));*/
			patientSaleBillMaster.setPatientSalesBillCD(request.getParameter("txtCD"));
		}
		else
		{
			patientSaleBillMaster.setPatientSalesBillCD("0.0");
		}
		
		if(request.getParameter("patientSaleInsertType").equals("edit"))
		{
	   if(request.getParameter("txtPatientSaleId")!=null && request.getParameter("txtPatientSaleId")!="")
		{	
			patientSaleBillMaster.setPatientSalesBillId(Integer.parseInt(request.getParameter("txtPatientSaleId")));
		}
		}
		
		if(request.getParameter("txtCDAmt")!=null && request.getParameter("txtCDAmt")!="")
		{	
			Double txtCdAmt= Double.parseDouble(request.getParameter("txtCDAmt"));
			patientSaleBillMaster.setPatientSalesBillCdAmt(txtCdAmt);
		}
		else
		{
			patientSaleBillMaster.setPatientSalesBillCdAmt(0.0);
		}
		
		/*if(request.getParameter("txtCN")!=null && request.getParameter("txtCN")!="")
		{	
			Double txtCn= Double.parseDouble(request.getParameter("txtCN"));
			patientSaleBillMaster.setPatientSalesBillCN(txtCn);
		}
		else
		{
			patientSaleBillMaster.setPatientSalesBillCN(0.0);
		}*/
		
		/*if(request.getParameter("txtCNAmt")!=null && request.getParameter("txtCNAmt")!="")
		{	
			Double txtCnAmt= Double.parseDouble(request.getParameter("txtCNAmt"));
			patientSaleBillMaster.setPatientSalesBillCnAmt(txtCnAmt);
		}
		else
		{
			patientSaleBillMaster.setPatientSalesBillCnAmt(0.0);
		}*/
		
		if(request.getParameter("txtAdd")!=null && request.getParameter("txtAdd")!="")
		{
			/*Double txtAdd= Double.parseDouble(request.getParameter("txtAdd"));*/
			patientSaleBillMaster.setPatientSalesBillAdd(request.getParameter("txtAdd"));
		}
		else
		{
			patientSaleBillMaster.setPatientSalesBillAdd("0.0");
		}
		
		if(request.getParameter("txtGrossAmt")!=null && request.getParameter("txtGrossAmt")!="")
		{
			patientSaleBillMaster.setPatientSalesBillGrossAmt(Double.parseDouble(request.getParameter("txtGrossAmt")));
		}
		else
		{
			patientSaleBillMaster.setPatientSalesBillGrossAmt(0.0);
		}
		
		if(request.getParameter("txtLess")!=null && request.getParameter("txtLess")!="")
		{
			patientSaleBillMaster.setPatientSalesBillLess(request.getParameter("txtLess"));
		}
		else
		{
			patientSaleBillMaster.setPatientSalesBillLess("0.0");
		}
		
		if(request.getParameter("txtNarration")!=null && request.getParameter("txtNarration")!="")
		{
			patientSaleBillMaster.setPatientSalesBillNarration(request.getParameter("txtNarration"));
		}
		/*patientSaleBillMaster.setIndentSaleNarration("");*/
		
		if(request.getParameter("txtNetAmt")!=null && request.getParameter("txtNetAmt")!="")
		{
			patientSaleBillMaster.setPatientSalesBillNetAmt(Double.parseDouble(request.getParameter("txtNetAmt")));
		}
		else
		{
			patientSaleBillMaster.setPatientSalesBillNetAmt(0.0);
		}
		
		if(request.getParameter("txtRound")!=null && request.getParameter("txtRound")!="")
		{
			patientSaleBillMaster.setPatientSalesBillRound(request.getParameter("txtRound"));	
		}
		else
		{
			patientSaleBillMaster.setPatientSalesBillRound("0.0");
		}
		
		if(request.getParameter("txtSpecialDisc")!=null && request.getParameter("txtSpecialDisc")!="")
		{
			patientSaleBillMaster.setPatientSalesBillSpecialDisc(request.getParameter("txtSpecialDisc"));
		}
		else
		{
			patientSaleBillMaster.setPatientSalesBillSpecialDisc("0.0");
		}
		
		if(request.getParameter("txtSurcharge")!=null && request.getParameter("txtSurcharge")!="")
		{
			patientSaleBillMaster.setPatientSalesBillSurcharge(request.getParameter("txtSurcharge"));
		}
		else
		{
			patientSaleBillMaster.setPatientSalesBillSurcharge("0.0");
		}
		
		if(request.getParameter("txtAmtRec")!=null && request.getParameter("txtAmtRec")!="")
		{
			patientSaleBillMaster.setPatientSalesBillAmountReceived(Double.parseDouble(request.getParameter("txtAmtRec")));
		}
		else
		{
			patientSaleBillMaster.setPatientSalesBillAmountReceived(0.0);
		}
		
		
		
		/*if(request.getParameter("indentSalePreviousBalance")!=null && request.getParameter("indentSalePreviousBalance")!="")
		{
			patientSaleBillMaster.setPatientSalesPreviousBalance(Double.parseDouble(request.getParameter("indentSalePreviousBalance")));
		}
		else
		{
			patientSaleBillMaster.setIndentSalePreviousBalance(0.0);
		}*/
		
		//new tax field add by suraj
		if(request.getParameter("txtTax5")!=null && request.getParameter("txtTax5")!="")
		{
			patientSaleBillMaster.setPatientTaxVat5(Double.parseDouble(request.getParameter("txtTax5")));
		}
		else
		{
			patientSaleBillMaster.setPatientTaxVat5(0.0);
		}
		
		
		if(request.getParameter("txtTax55")!=null && request.getParameter("txtTax55")!="")
		{
			patientSaleBillMaster.setPatientTaxVat55(Double.parseDouble(request.getParameter("txtTax55")));
		}
		else
		{
			patientSaleBillMaster.setPatientTaxVat55(0.0);
		}
		
		if(request.getParameter("txtTax12")!=null && request.getParameter("txtTax12")!="")
		{
			patientSaleBillMaster.setPatientTaxVat12(Double.parseDouble(request.getParameter("txtTax12")));
		}
		else
		{
			patientSaleBillMaster.setPatientTaxVat12(0.0);
		}
		
		if(request.getParameter("txtTax0")!=null && request.getParameter("txtTax0")!="")
		{
			patientSaleBillMaster.setPatientTaxVat0(Double.parseDouble(request.getParameter("txtTax0")));
		}
		
		if(request.getParameter("patientTotalVat")!=null && request.getParameter("patientTotalVat")!="")
		{
			patientSaleBillMaster.setPatientTotalVat(Double.parseDouble(request.getParameter("patientTotalVat")));
		}
		
		else
		{
			patientSaleBillMaster.setPatientTaxVat0(0.0);
		}
		
		if(request.getParameter("txtTax6")!=null && request.getParameter("txtTax6")!="")
		{
			patientSaleBillMaster.setPatientTaxVat6(Double.parseDouble(request.getParameter("txtTax6")));
		}
		else
		{
			patientSaleBillMaster.setPatientTaxVat6(0.0);
		}
		
		if(request.getParameter("txtTax135")!=null && request.getParameter("txtTax135")!="")
		{
			patientSaleBillMaster.setPatientTaxVat135(Double.parseDouble(request.getParameter("txtTax135")));
		}
		else
		{
			patientSaleBillMaster.setPatientTaxVat135(0.0);
		}
		
		if(request.getParameter("doctorId")!=null && request.getParameter("doctorId")!="")
		{
			patientSaleBillMaster.setDoctorId(Integer.parseInt(request.getParameter("doctorId")));
		}
		
		if(request.getParameter("sponserId")!=null && request.getParameter("sponserId")!="")
		{
			patientSaleBillMaster.setSponserId(Integer.parseInt(request.getParameter("sponserId")));
		}
		
		if(request.getParameter("referTo")!=null && request.getParameter("referTo")!="")
		{
			patientSaleBillMaster.setPatientType(request.getParameter("referTo"));
		}
		
		if(request.getParameter("doctorName")!=null && request.getParameter("doctorName")!="")
		{
			patientSaleBillMaster.setDoctorName(request.getParameter("doctorName"));
		}
		
		if(request.getParameter("patientId")!=null && request.getParameter("patientId")!="")
		{
			patientSaleBillMaster.setPatientId(Integer.parseInt(request.getParameter("patientId")));
		}
		
		if(request.getParameter("txtTratmentId")!=null && request.getParameter("txtTratmentId")!="")
		{
			patientSaleBillMaster.setPatientSaleTreatmentId(Integer.parseInt(request.getParameter("txtTratmentId")));
			patientSaleBillMaster.setWardName(commonService.getWardNameByTreatment(patientSaleBillMaster.getPatientSaleTreatmentId()));
		}
		
		
		if(request.getParameter("bankName")!=null && request.getParameter("bankName")!="")
		{
			patientSaleBillMaster.setPatientSaleBankName((request.getParameter("bankName")));
		}
		else
			patientSaleBillMaster.setPatientSaleBankName("");
		
		
		if(request.getParameter("chequeNum")!=null && request.getParameter("chequeNum")!="")
		{
			patientSaleBillMaster.setPatientSaleChequeNum(request.getParameter("chequeNum"));
		}
		else
			patientSaleBillMaster.setPatientSaleChequeNum("");
		
		if(request.getParameter("txtCardNo")!=null && request.getParameter("txtCardNo")!="")
		{
			patientSaleBillMaster.setPatientSaleCardNum(request.getParameter("txtCardNo"));
		}
		else
			patientSaleBillMaster.setPatientSaleCardNum("");
		
		/*if(request.getParameter("comment")!=null && request.getParameter("comment")!="")
		{
			patientSaleBillMaster.setPatientSaleComment(request.getParameter("comment"));
		}
		else
			patientSaleBillMaster.setPatientSaleComment("");*/
		
		
		/*if(request.getParameter("patientSalePreviousBalance")!=null && request.getParameter("patientSalePreviousBalance")!="")
		{
			patientSaleBillMaster.setPatientSalePreviousBalance(Double.parseDouble(request.getParameter("patientSalePreviousBalance")));
		}
		else
		{
			patientSaleBillMaster.setPatientSalePreviousBalance(0.0);
		}*/
		
		if(request.getParameter("txtCategoryId")!=null && request.getParameter("txtCategoryId")!="")
		{
			patientSaleBillMaster.setPatientSaleBillCatId(Integer.parseInt(request.getParameter("txtCategoryId")));
		}
		else
		{
			patientSaleBillMaster.setPatientSaleBillCatId(1);
		}
		
     /*  Double preAmtBal = patientSaleBillService.getPreBalance(request.getParameter("txtTratmentId"));
       Double netAmt = Double.parseDouble(request.getParameter("txtNetAmt"));
       Double amtRec = Double.parseDouble(request.getParameter("txtAmtRec"));
       
       Double amtBal=preAmtBal+netAmt-amtRec;
       DecimalFormat df = new DecimalFormat("###.###");
       Double result1=Double.parseDouble(df.format(amtBal));*/
       
       patientSaleBillMaster.setPatientSalesBillAmountBalance(Double.parseDouble(request.getParameter("txtAmtBal")));
       patientSaleBillMaster.setPatientSalePreviousBalance(Double.parseDouble(request.getParameter("patientSalePreviousBalance")));
	    /*System.out.println(amtBal);*/
		
		patientSaleBillMaster.setPatientBillMode(request.getParameter("paymentMode"));
		patientSaleBillMaster.setPatientSaleType(request.getParameter("saleType"));
		patientSaleBillMaster.setPatientSalesBillDeleteFlag(0);
		patientSaleBillMaster.setPatientSaleForTime(time);
		patientSaleBillMaster.setPatientSalesBillDocNo(request.getParameter("txtDocNo"));
		patientSaleBillMaster.setAccountStatusPatient("N");
		/*patientSaleBillMaster.setMrnAddedBy(userId.toString());
		patientSaleBillMaster.setMrnModBy(userId.toString());*/
		
		/*patientSaleBillMaster.setIndentSaleStoreId(Integer.parseInt(request.getParameter("storeId")));*/
		
		if(storeId!=null)
		{
			patientSaleBillMaster.setPatientSaleStoreId(Integer.parseInt(storeId));
		}
		
		//unitId from session 
		if(unitId!=null)
		{
			patientSaleBillMaster.setUnitId(unitId);
		}
		
		if(userId!=null)
		{
			patientSaleBillMaster.setPatientSaleUserId(userId);
		}
		else
		{
			 result.put("error", "Session Not valid");
		}
		
		String txtDate= request.getParameter("txtDate");
		String fromArray[]=txtDate.split("/");
		StringBuffer fromReult=new StringBuffer();
		fromReult=fromReult.append(fromArray[2]+"-"+fromArray[1]+"-"+fromArray[0]);
		
		SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
		Date date=dateFormat.parse(fromReult.toString());
		
		patientSaleBillMaster.setPatientSalesBillUpdateDate(date);
		patientSaleBillMaster.setPatientBillDate(date);
		
		if(request.getParameter("preImage")!=null && request.getParameter("preImage")!="")
		{	
			patientSaleBillMaster.setImg(fromReult.toString()+"_"+time.toString()+"_"+request.getParameter("preImage"));
		}
		else
		{
			patientSaleBillMaster.setImg("");
		}
		
		/*patientSaleBillMaster.setMrnIssueReceiveTime(request.getParameter("txtTime"));
		patientSaleBillMaster.setMrnIssueNarration(request.getParameter("txtNaration"));*/
		
		result=patientSaleBillService
				.saveOrUpdatePatientSaleBill(patientSaleBillMaster,storeId);
		
		if(patientSaleBillMaster.getPatientSalesBillId()!=null)
			result.put("id", patientSaleBillMaster.getPatientSalesBillId().toString());
		
		return result;
		
	}

	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printPo(
			@RequestParam("patientSaleId") Integer patientSaleId) {
		ModelAndView modelAndView = new ModelAndView();
		PatientSaleBillMaster billMaster = new PatientSaleBillMaster();

		try {
			billMaster = patientSaleBillService
					.getPatientSalesBillById(patientSaleId);
		} catch (Exception e) {
			e.printStackTrace();
		}

		/*PatientSale patientSale=new PatientSale();
		try
		{
			patientSale= patientSaleBillService.getSponserByPatientId(patientSaleId);
					
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		
		try
		{
			patientSale= patientSaleBillService.getPatientSaleTransType(patientSaleId);
					
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		
		String sponserName=patientSale.getSponserName();
		
		String patientType=patientSale.getPatientType();*/
		
		modelAndView.addObject("patientSaleSponserName", billMaster.getPatientSaleStatus());
		
		modelAndView.addObject("patientSaleTransationType", billMaster.getPatientSalesBillNarration());
		
		List<PatientSaleBillMaster> saleBillMasters = new ArrayList<PatientSaleBillMaster>();
		saleBillMasters.add(billMaster);

		modelAndView.addObject("patientSaleData", saleBillMasters);
		modelAndView.setViewName("pharma_patient_sale_bill");
		return modelAndView;

	}

	@RequestMapping(value = "/patientSalesBillById", method = RequestMethod.GET)
	public @ResponseBody
	PatientSaleBillMaster getPatientSalesBillById(
			@RequestParam("patientSaleBillId") Integer patientSaleId) {
		PatientSaleBillMaster ltpatientSaleBillMaster = new PatientSaleBillMaster();
		ltpatientSaleBillMaster = patientSaleBillService
				.getPatientSalesBillById(patientSaleId);
		return ltpatientSaleBillMaster;
	}

	@RequestMapping(value = "/getProductDetails", method = RequestMethod.GET)
	public @ResponseBody
	String getProductDetails(@RequestParam("ProductId") Integer productId) {
		return patientSaleBillService.getProductDetails(productId);
	}
	
	@RequestMapping(value = "/getDoctorDetailsByPatientId", method = RequestMethod.GET)
	public @ResponseBody
	String getDoctorDetailsDetails(@RequestParam("PatientId") Integer PatientId,@RequestParam("typeOfpatient") String typeOfpatient)
	{
		
		return patientSaleBillService.getDoctorDetailsByPatientId(PatientId,typeOfpatient);
	}
	
	@RequestMapping(value = "/getPatientDetailsByPatientId", method = RequestMethod.GET)
	public @ResponseBody
	String getPatientDetailsDetails(@RequestParam("PatientId") Integer PatientId,@RequestParam("typeOfpatient") String typeOfpatient)
	{
		
		return patientSaleBillService.getPatientDetailsDetails(PatientId,typeOfpatient);
	}
	
	
	@RequestMapping(value = "/getSponsorDetailsByPatientId", method = RequestMethod.GET)
	public @ResponseBody
	String getSponserDetailsDetails(@RequestParam("PatientId") Integer PatientId) {
		return patientSaleBillService.getSponserDetailsDetails(PatientId);
	}

	@RequestMapping(value = "/patientSalesBillDetails", method = RequestMethod.GET)
	public @ResponseBody
	List<PatientSaleBillMaster> getPatientBillId(
			@RequestParam("patientSaleBillId") Integer patientId) {
		List<PatientSaleBillMaster> ltpatientSaleBillMaster = new ArrayList<PatientSaleBillMaster>();
		ltpatientSaleBillMaster = patientSaleBillService
				.getPatientBillId(patientId);
		return ltpatientSaleBillMaster;
	}
	
	@RequestMapping(value = "/getPrescriptionByIpdPatientId", method = RequestMethod.GET)
	public @ResponseBody
	List<PrescriptionMaster> getPrescription(
			@RequestParam("PatientId") Integer PatientId) {
		List<PrescriptionMaster> ltpatientSaleBillMaster = new ArrayList<PrescriptionMaster>();
		ltpatientSaleBillMaster = patientSaleBillService
				.getPrescription(PatientId);
		return ltpatientSaleBillMaster;
	}
	
	@RequestMapping(value = "/getPrescriptionByOpdPatientId", method = RequestMethod.GET)
	public @ResponseBody
	List<PrescriptionMaster> getPrescriptionByopd(
			@RequestParam("PatientId") Integer PatientId) {
		List<PrescriptionMaster> ltpatientSaleBillMaster = new ArrayList<PrescriptionMaster>();
		ltpatientSaleBillMaster = patientSaleBillService
				.getPrescriptionOpd(PatientId);
		return ltpatientSaleBillMaster;
	}
	
	@RequestMapping(value = "/getPrescriptionByEntirePatientId", method = RequestMethod.GET)
	public @ResponseBody
	List<PrescriptionMaster> getPrescriptionByEntireDb(
			@RequestParam("PatientId") Integer PatientId) {
		List<PrescriptionMaster> ltpatientSaleBillMaster = new ArrayList<PrescriptionMaster>();
		ltpatientSaleBillMaster = patientSaleBillService
				.getPrescription(PatientId);
		ltpatientSaleBillMaster.addAll(patientSaleBillService
				.getPrescriptionOpd(PatientId));
		return ltpatientSaleBillMaster;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deletePatientSaleBill(
			@RequestParam("purId") Integer patientSalesBillId) {
		Boolean flag = false;
		if (patientSaleBillService.deletePatientSaleBill(patientSalesBillId)) {
			flag = true;
		}
		return flag;
	}

	/*
	 * @RequestMapping(value = "/autoSuggestionPurchaseNames", method =
	 * RequestMethod.GET) public @ResponseBody List<PurchaseMaster>
	 * getAutoSuggestionPatientNames(
	 * 
	 * @RequestParam("letter") String letter) { List<PurchaseMaster>
	 * ltPurchaseMasters = new ArrayList<PurchaseMaster>(); ltPurchaseMasters =
	 * patientSaleBillService .getAutoSuggestionpatientNames(letter); return
	 * ltPurchaseMasters; }
	 * 
	 * @InitBinder protected void initBinder(HttpServletRequest request,
	 * ServletRequestDataBinder binder) { try { SimpleDateFormat dateFormat =
	 * new SimpleDateFormat("dd/MM/yyyy"); CustomDateEditor editor = new
	 * CustomDateEditor(dateFormat, true);
	 * binder.registerCustomEditor(Date.class, editor); } catch (Exception e) {
	 * e.printStackTrace(); } }
	 */
	
	
	@RequestMapping(value = "/getCreditBills", method = RequestMethod.GET)
	public @ResponseBody
	List<PendingBill> getCreditBills(@RequestParam("patientId") Integer patientId) {
		
		List<PendingBill> pendingBills=patientSaleBillService.getCreditBills(patientId);
		return pendingBills;
		
	}
	
	@RequestMapping(value = "/getAllPatientBillSaleData", method = RequestMethod.GET)
	public @ResponseBody List<CreditNotePatient> getAllPatientSaleBillData(@RequestParam("patientId") Integer patientId) {

		List<CreditNotePatient> patientSaleBillMaster = new ArrayList<CreditNotePatient>();
		patientSaleBillMaster = patientSaleBillService.getAllPatientSaleBillData(patientId);
		return patientSaleBillMaster;
	}

	@RequestMapping(value = "/getPatientSaleSlaveByPatientId", method = RequestMethod.GET)
	public @ResponseBody
	PatientSaleBillMaster getPatientSlaveByPatientId(
			@RequestParam("patientId") Integer patientSaleId) {
		PatientSaleBillMaster patientSaleBillMaster=new PatientSaleBillMaster();
		patientSaleBillMaster = patientSaleBillService.getPatientSlaveByPatientId(patientSaleId);
		return patientSaleBillMaster;
	}
	
	
	/*@RequestMapping(value = "/getAllPatientReceiptDataByTreatmentId", method = RequestMethod.GET)
	public @ResponseBody List<CreditNotePatient> getAllIndentReceiptDataByTreatmentId(@RequestParam("patientId")Integer treatmentId) {

		List<CreditNotePatient> IndentSale = new ArrayList<CreditNotePatient>();
		IndentSale = patientSaleBillService.getAllPatientReceiptDataByTreatmentId(treatmentId);
		return IndentSale;
	}
	*/
	@RequestMapping(value = "/getPendingAmountByTreatmentId", method = RequestMethod.GET)
	public @ResponseBody String  getPendingAmountByTreatmentId(@RequestParam("treatmentId")Integer treatmentId,@RequestParam("spId")Integer spId) {
		 
		Double amount = patientSaleBillService.getPendingAmountByTreatmentId(treatmentId,spId);
		return amount.toString();
	}
	
	@RequestMapping(value = "/getSponserStatus", method = RequestMethod.GET)
	public @ResponseBody String  getSponserStatus(@RequestParam("treatmentId")Integer treatmentId) 
	{
		 
		JSONObject jsonObj = patientSaleBillService.getSponserStatus(treatmentId);
		return JSONValue.toJSONString(jsonObj);
	}
	
	@RequestMapping(value = "/getMRPType", method = RequestMethod.GET)
	public @ResponseBody String  getMRPType(@RequestParam("treatmentId")Integer treatmentId) 
	{
		 
		String flag= patientSaleBillService.getMRPType(treatmentId);
		return flag;
	}
	
	
	@RequestMapping(value = "/savePatientPendingAmount", method = RequestMethod.GET)
	public @ResponseBody boolean  savePatientPendingAmount(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
		Double amountReceive=0.0;		
		Double discount=0.0;
		Double balance=0.0;
		String narration="";
		String listStr="";		
		Integer treatmentId=Integer.parseInt(httpServletRequest.getParameter("treatmentId"));
		
		if(httpServletRequest.getParameter("listStr")!=null && httpServletRequest.getParameter("listStr")!="")
			listStr=httpServletRequest.getParameter("listStr");

		boolean result=patientSaleBillService.savePatientPendingAmount(treatmentId,amountReceive,discount,narration,balance,listStr);
		return result;
	}
	
	@RequestMapping(value = "/FinalView", method = RequestMethod.GET)
	public ModelAndView printFinalIndentView(@RequestParam("treatmentId") Integer treatmentId) {
		ModelAndView modelAndView = new ModelAndView();
		FinalIndent finalIndent = new FinalIndent();
		try
		{
			finalIndent = patientSaleBillService.getFinalBillDetailsForPatientSave(treatmentId);
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		
		PatientSaleBill indentSale=new PatientSaleBill();
		try
		{
			indentSale= patientSaleBillService.getPatientDataByTreatmentId(treatmentId);
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		String pname=indentSale.getPatientName();
	
		
		modelAndView.addObject("patientSalePatientData", pname);
		modelAndView.addObject("amountReceive", finalIndent.getAmountReceive());
		modelAndView.addObject("narration", finalIndent.getNarration());
		modelAndView.addObject("discount", finalIndent.getDiscount());
		modelAndView.addObject("date", finalIndent.getDate());
		modelAndView.addObject("billId", finalIndent.getHistoryId());
		modelAndView.addObject("indentData", finalIndent);
		modelAndView.setViewName("pharma_patient_sale_final_bill");
		return modelAndView;
	}
	
	@RequestMapping(value = "/printFinalView", method = RequestMethod.GET)
	public ModelAndView printFinalPatientView(@RequestParam("treatmentId") Integer treatmentId) {
		ModelAndView modelAndView = new ModelAndView();
		FinalIndent finalIndent = new FinalIndent();
		
		try
		{
			finalIndent = patientSaleBillService.getFinalBillDetails(treatmentId);
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		
		PatientSaleBill indentSale=new PatientSaleBill();
		try
		{
			indentSale= patientSaleBillService.getPatientDataByTreatmentId(Integer.parseInt(finalIndent.getTreatmentId()));
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		String pname=indentSale.getPatientName();
	
		
		modelAndView.addObject("patientSalePatientData", pname);
		modelAndView.addObject("amountReceive", finalIndent.getAmountReceive());
		modelAndView.addObject("narration", finalIndent.getNarration());
		modelAndView.addObject("discount", finalIndent.getDiscount());
		modelAndView.addObject("date", finalIndent.getDate());
		modelAndView.addObject("billId", finalIndent.getHistoryId());
		
		modelAndView.addObject("indentData", finalIndent);
		modelAndView.setViewName("pharma_patient_sale_final_bill");
		return modelAndView;
	}
	
	@RequestMapping(value = "/getAllPatientSaleSettalBillTreatmentId", method = RequestMethod.GET)
	public @ResponseBody List<settalBillIndent> getAllSettalBillByTreatmentId(@RequestParam("treatmentId")Integer treatmentId) 
	{

		List<settalBillIndent> IndentSale = new ArrayList<settalBillIndent>();
		IndentSale = patientSaleBillService.getAllSettalBillByTreatmentId(treatmentId);
		return IndentSale;
	}
	
	@RequestMapping(value = "/getAllPatientHistorySettalBillTreatmentId", method = RequestMethod.GET)
	public @ResponseBody List<settalBillIndent> getAllSettalBillHistoryByTreatmentId(@RequestParam("treatmentId")Integer patientId) 
	{

		List<settalBillIndent> IndentSale = new ArrayList<settalBillIndent>();
		IndentSale = patientSaleBillService.getAllSettalBillHistoryByTreatmentId(patientId);
		return IndentSale;
	}
	
	@RequestMapping(value = "/getPendingAmount", method = RequestMethod.GET)
	public @ResponseBody String  getPendingAmount(@RequestParam("treatmentId")Integer treatmentId) 
	{
		 
		Double amount = patientSaleBillService.getPendingAmount(treatmentId);
		return amount.toString();
	}
	
	@RequestMapping(value = "/getTreatmentByPatientId", method = RequestMethod.GET)
	public @ResponseBody
	String getTreatmentDetails(@RequestParam("PatientId") Integer PatientId,@RequestParam("typeOfpatient") String typeOfpatient)
	{
		
		return patientSaleBillService.getPatientTreatmentDetails(PatientId,typeOfpatient);
	}
	
	@RequestMapping(value = "/getAllPatientReceiptDataByPatientId", method = RequestMethod.GET)
	public @ResponseBody List<CreditNotePatient> getAllIndentReceiptDataByTreatmentId(@RequestParam("patientId")Integer treatmentId) {

		List<CreditNotePatient> IndentSale = new ArrayList<CreditNotePatient>();
		IndentSale = patientSaleBillService.getAllPatientReceiptDataByTreatmentId(treatmentId);
		return IndentSale;
	}
	
	@RequestMapping(value = "/getAllPatientDataByTreatmentId", method = RequestMethod.GET)
	public @ResponseBody List<PatientSaleBillMaster> getAllPatientDataByTreatmentId(@RequestParam("treatmentId")Integer treatmentId) {

		List<PatientSaleBillMaster> patientSale = new ArrayList<PatientSaleBillMaster>();
		patientSale = patientSaleBillService.getAllPatientDataByTreatmentId(treatmentId);
		return patientSale;
	}
	
	@RequestMapping(value = "/patientSalesBillDetailsByPatientId", method = RequestMethod.GET)
	public @ResponseBody
	List<PatientSaleBillMaster> searchPatientSaleByPatientId(
			@RequestParam("patientSaleId") Integer patientId) {
		List<PatientSaleBillMaster> ltpatientSaleBillMaster = new ArrayList<PatientSaleBillMaster>();
		ltpatientSaleBillMaster = patientSaleBillService
				.searchPatientSaleByPatientId(patientId);
		return ltpatientSaleBillMaster;
	}
	
	@RequestMapping(value = "/patientSalesBillDetailsByInvoiceId", method = RequestMethod.GET)
	public @ResponseBody
	List<PatientSaleBillMaster> searchPatientSaleByInvoiceId(
			@RequestParam("invoiceId") Integer invoiceId) {
		List<PatientSaleBillMaster> ltpatientSaleBillMaster = new ArrayList<PatientSaleBillMaster>();
		ltpatientSaleBillMaster = patientSaleBillService
				.searchPatientSaleByInvoiceId(invoiceId);
		return ltpatientSaleBillMaster;
	}
	
	
	@RequestMapping(value = "/autoSuggestionMarkVisit", method = RequestMethod.POST)
	 @ResponseBody
	public RegistrationViewDto autoSuggestionMarkVisit(@RequestParam("letter") String letter,@RequestParam("usertype") String usertype) {
		 
		RegistrationViewDto ltRegistrationViewDto = new  RegistrationViewDto();
		ltRegistrationViewDto = markvisitservice.autoSuggestionMarkVisit1(letter,2,"reg");	
		return ltRegistrationViewDto;
	}
	
	//Added By Akshata
	@RequestMapping(value = "/fetchPharmaPatientNameAutoSuggest", method = RequestMethod.GET)
	public @ResponseBody
	List<RegTreBillDto> fetchPharmaPatientNameAutoSuggest(HttpServletRequest request) {
		String patientName = request.getParameter("patientName");
		String typeOfpatient = request.getParameter("typeOfpatient");
		String isEdit = request.getParameter("isEdit");
		List<RegTreBillDto> list = new ArrayList<RegTreBillDto>();
		list = patientSaleBillService.fetchPharmaPatientNameAutoSuggest(patientName,typeOfpatient,isEdit);
		return list;
	}

	/**
	 * @author :HM00069
	 * @Date :18-07-2022
	 * @Code :This method is fetch doctor list
	 * @return
	 **/
	@RequestMapping(value = "/AutoSuggestionForDoctorName", method = RequestMethod.POST)
	@ResponseBody
	public DoctorDto getAllDoctorsList() {
		//log.info("In OpdServicesAdvisedController getAllDoctorsList()");
		DoctorDto doctorDto = new DoctorDto();
		String doctorType= "doctor";
		List<DoctorDto> list=patientSaleBillService.fetchDoctorList(doctorType);
		doctorDto.setLstDoctorDto(list);
		//log.debug("Reponse----> "+list);
		return doctorDto;
	}

	/************
	 *@author	: AKshata Desai
	 *@code		:Fetch Patient Name
	 ***********/
	
	@RequestMapping(value = "/fetchPateintNameAutosugg", method = RequestMethod.POST)
	@ResponseBody
	public RegTreBillDto fetchPateintNameAutosugg(@RequestParam(value = "patientName", required=false) String patientName,
			@RequestParam(value = "typeOfpatient", required=false) String typeOfpatient,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
		ltRegMasterDto = otService.fetchPateintNameAutosugg(typeOfpatient,patientName);		
		RegTreBillDto obj=new RegTreBillDto();
		obj.setListRegTreBillDto(ltRegMasterDto);
			
		return obj;
}
	
	/************
	 *@author	: Vishant Pawar
	 *@code		:Fetch Pending Amount Paient Sale
	 ***********/
	@RequestMapping(value = "/getPendingAmountByTreatmentIdPatientSale", method = RequestMethod.GET)
	public @ResponseBody String  getPendingAmountByTreatmentIdPatientSale(@RequestParam("treatmentId")Integer treatmentId,@RequestParam("spId")Integer spId) {
		 
		String amount = patientSaleBillService.getPendingAmountByTreatmentIdPatientSale(treatmentId,spId);
		return amount.toString();
	}
		
	@RequestMapping(value = "/fetchPatientSaleData", method = RequestMethod.GET)
	public @ResponseBody
	List<RegTreBillDto> fetchPharmaPatientNameAutoSuggestNew(HttpServletRequest request) {
		String patientName = request.getParameter("patientName");
		String typeOfpatient = request.getParameter("typeOfpatient");
		String isEdit = request.getParameter("isEdit");
		String callFrom = request.getParameter("callFrom");
		List<RegTreBillDto> list = new ArrayList<RegTreBillDto>();
		list = patientSaleBillService.fetchPharmaPatientNameAutoSuggestNew(patientName,typeOfpatient,isEdit,callFrom);
		return list;
	}
	
	
}
