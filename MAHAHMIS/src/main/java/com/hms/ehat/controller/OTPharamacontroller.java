package com.hms.ehat.controller;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.pharmaConsumtionDTO;
import com.hms.ehat.service.OTPharamaService;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.service.PatientSaleBillService;


@Controller
@RequestMapping(value = "/otpharma")
public class OTPharamacontroller {
	
	@Autowired
	OTPharamaService patientSaleBillService;
	
	

	@RequestMapping(value = "/savePatientSaleOT", method = RequestMethod.POST)
	public @ResponseBody Map<String, String> saveIndentSale(HttpServletRequest request) throws ParseException {
		
		HttpSession session = request.getSession(true);
		Integer userId=(Integer)session.getAttribute("userId1");
		
		java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
		java.util.Calendar cal = java.util.Calendar.getInstance();
		String time=dateFormat1.format(cal.getTime());
		
		Map<String, String> result=new HashMap<String, String>();
		
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("OT_Service");
		String storeId = (String) resourceBundleEhat.getObject("OtpharmaSubStoreID");
		
	//	String storeId = String.valueOf(2); /* DEFAULT OT PHARMA STORE ID  (String) session.getAttribute("pharmacyStoreId"); */
				
		String list[]= request.getParameterValues("ltPatientSaleBill");
		
		pharmaConsumtionDTO patientSaleBillMaster=new pharmaConsumtionDTO();
		
		String str = list[0].substring(0, list[0].length());
		str=str.replaceAll("null","1");
		patientSaleBillMaster = (pharmaConsumtionDTO) ConfigUIJSONUtility
				.getObjectFromJSON(str,
						pharmaConsumtionDTO.class);//our dto
		
		Integer patId=Integer.parseInt(request.getParameter("patientId"));
		
		
		
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
		patientSaleBillMaster.setOtflag("O");
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
		}
		
		
		
		
		if(request.getParameter("txtCategoryId")!=null && request.getParameter("txtCategoryId")!="")
		{
			patientSaleBillMaster.setPatientSaleBillCatId(Integer.parseInt(request.getParameter("txtCategoryId")));
		}
		else
		{
			patientSaleBillMaster.setPatientSaleBillCatId(1);
		}
		
	      patientSaleBillMaster.setTreatmentoperationid(Integer.parseInt(request.getParameter("treatmentoperationid")));//treamentoperation id.
	      patientSaleBillMaster.setBillidipd(Integer.parseInt(request.getParameter("billid")));// billd id
          patientSaleBillMaster.setPatientSalesBillAmountBalance(Double.parseDouble(request.getParameter("txtAmtBal")));
          patientSaleBillMaster.setPatientSalePreviousBalance(Double.parseDouble(request.getParameter("patientSalePreviousBalance")));
	    /*System.out.println(amtBal);*/
		
		patientSaleBillMaster.setPatientBillMode(request.getParameter("paymentMode"));
		patientSaleBillMaster.setPatientSaleType(request.getParameter("saleType"));
		patientSaleBillMaster.setPatientSalesBillDeleteFlag(0);
		patientSaleBillMaster.setPatientSaleForTime(time);
		patientSaleBillMaster.setPatientSalesBillDocNo(request.getParameter("txtDocNo"));
		/*patientSaleBillMaster.setMrnAddedBy(userId.toString());
		patientSaleBillMaster.setMrnModBy(userId.toString());*/
		
		/*patientSaleBillMaster.setIndentSaleStoreId(Integer.parseInt(request.getParameter("storeId")));*/
		
		if(storeId!=null)
		{
			patientSaleBillMaster.setPatientSaleStoreId(Integer.parseInt(storeId));
		}
		
		if(userId!=null)
		{
			patientSaleBillMaster.setPatientSaleUserId(userId);
		}
		else
		{
			 result.put("error", "Session Not valid");
		}
		
		/*String txtDate= request.getParameter("txtDate");
		String fromArray[]=txtDate.split("/");
		StringBuffer fromReult=new StringBuffer();
		fromReult=fromReult.append(fromArray[2]+"-"+fromArray[1]+"-"+fromArray[0]);*/
		
		SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
    	Date date = new Date();
		try {
		String	todaydate = dateFormat.format(date);
			patientSaleBillMaster.setPatientSalesBillUpdateDate((Date)dateFormat.parse(todaydate));
			patientSaleBillMaster.setPatientBillDate((Date)dateFormat.parse(todaydate));
		} catch (java.text.ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	
		
		/*patientSaleBillMaster.setMrnIssueReceiveTime(request.getParameter("txtTime"));
		patientSaleBillMaster.setMrnIssueNarration(request.getParameter("txtNaration"));*/
		
		result=patientSaleBillService
				.saveOrUpdatePatientSaleBill(patientSaleBillMaster,storeId);
		
		if(patientSaleBillMaster.getPatientSalesBillId()!=null)
			result.put("id", patientSaleBillMaster.getPatientSalesBillId().toString());
		
		return result;
		
	}


}
