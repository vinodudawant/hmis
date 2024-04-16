<%@page import="com.hms.ehat.dto.SponsorCustomWardNameDTO"%>
<%@page import="com.hms.pathology.service.SponsorCustomTestNameService"%>
<%@page import="com.hms.opdbill.dto.BillAmountDetailsDto"%>
<%@page import="com.hms.ipdbill.dto.MultiBillReceiptMasterDTO"%>
<%@page import="com.hms.utility.EnglishNumberToWords"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.users.service.UsersService"%>
<%@page import="com.hms.ipdbill.dto.IpdBillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.service.IpdBillService"%>
<%@page import="com.hms.opdbill.dto.PatientSubServiceDetailsDto"%>
<%@page import="com.hms.opdbill.dto.PatientServiceDetailsDto"%>
<%@page import="com.hms.ipd.service.IpdBillMgtService"%>
<%@page import="com.hms.ipdbill.dto.IpdBillDiscount"%>
<%@page import="com.ibm.icu.text.DateFormat"%>
<%@page import="com.ibm.icu.text.SimpleDateFormat"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.itextpdf.text.Phrase"%>
<%@page import="com.ibm.icu.text.NumberFormat"%>
<%@page import="com.ibm.icu.text.DecimalFormat"%>
<%@page import="com.hms.ipdbill.dto.BillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.service.BillService"%>
<%@page import="com.itextpdf.text.pdf.PdfPTable"%>
<%@page import="com.hms.opdbill.dto.PatientHeaderInfoDto"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.ipd.service.BedMgtService"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.itextpdf.text.Chunk"%>
<%@page import="com.itextpdf.text.pdf.PdfPCell"%>
<%@page import="com.itextpdf.text.Element"%>
<%@page import="com.itextpdf.text.Image"%>
<%@page import="com.itextpdf.text.Rectangle"%>
<%@page import="com.itextpdf.kernel.geom.PageSize"%>
<%@page import="com.itextpdf.text.pdf.PdfWriter"%>
<%@page import="com.itextpdf.text.Font"%>
<%@page import="com.itextpdf.text.Document"%>
<%@page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.ehat.dto.CurrencyTypeDto"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Date"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.service.CurrencyTypeService"%>
<%-- <%@ page trimDirectiveWhitespaces="true"%> --%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta  http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Final Ipd Print WIth Discount</title>
</head>
<body>
	<%
	try {

		response.setContentType("application/pdf");
		
		HospitalDetailAdminService hs         = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
		CurrencyTypeService fetchOneCurrency  = (ApplicationContextUtils.getApplicationContext()).getBean(CurrencyTypeService.class);
		BillService hm                        = (ApplicationContextUtils.getApplicationContext()).getBean(BillService.class);
		IpdBillMgtService billService         = (ApplicationContextUtils.getApplicationContext()).getBean(IpdBillMgtService.class);				
		IpdBillService ipdBillService         = (ApplicationContextUtils.getApplicationContext()).getBean(IpdBillService.class);
		BedMgtService us                      = (ApplicationContextUtils.getApplicationContext()).getBean(BedMgtService.class);
		SponsorCustomTestNameService sponsorCustom  = (ApplicationContextUtils.getApplicationContext()).getBean(SponsorCustomTestNameService.class);
		session          = request.getSession();
		int unitId       = (Integer)session.getAttribute("uId");
		int userId       = (Integer) session.getAttribute("userId1");
		String user_name = (String) session.getAttribute("userName");
		
		int patId          = Integer.parseInt(request.getParameter("patId"));
		int treatmentId    = Integer.parseInt(request.getParameter("treatId"));
		int billTypeId     = Integer.parseInt(request.getParameter("billTypeId"));
		String receiptOf   = request.getParameter("receiptOf");
		String sponId      = request.getParameter("chargesSlaveId");
		String finalbillIs = request.getParameter("finalbillIs");
		String treatcloseForIpd = request.getParameter("treatcloseForIpd");
		
		int recId=0;
				
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
		String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");   
		String pharmacy_Serve_Id = (String)resourceBundleEhat.getString("pharmacy");    
		int pharmacyInvoiceId = Integer.parseInt(pharmacy_Invoice);
		int pharmacyServId = Integer.parseInt(pharmacy_Serve_Id);
		
		ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");									 	
	 	String shraddha = resourceBundleEha.getObject("shraddha").toString();
		ResourceBundle resourceBundleEha1 = ResourceBundle.getBundle("hospitalaccess");									 	
	 	String hospitalname = resourceBundleEha1.getObject("hospitalname").toString();
	 	String concessionFlow = resourceBundleEha.getObject("concessionFlow").toString();
	 	
	 	//for centerpatientId
		String patientId= resourceBundleEha.getObject("patientIdLabel").toString();	
	
		// ============ Call for get currency details ==================//
		List<CurrencyTypeDto> listServiceCurrencyDto=fetchOneCurrency.getOneCurrencyList();
		String currencyCode=listServiceCurrencyDto.get(0).getCurrencyCode();
		String currencyName=listServiceCurrencyDto.get(0).getCurrencyName();
		
		// ============ Call for get hospital details =================//
	    HttpSession session2 = request.getSession();
		int hospitalUnitId= (Integer) session2.getAttribute("uId");
	    List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
		HospitalDetails hospObj = arrHospitalDetails.get(0);
		
		//============ Call for get patient Demographics =============//
		PatientHeaderInfoDto rtd = us.getIpdPatientHeaderInfo(treatmentId, unitId).getListRegTreBillDto().get(0);
		
		// ============ Call for get service details ================//
		PatientServiceDetailsDto objServive = new PatientServiceDetailsDto();
		objServive.setTreatmentId(treatmentId);
		if(treatcloseForIpd.equals("treatcloseForIpd")){
			objServive.settFlag("CT");
		}else{
			objServive.settFlag("AT");
		}
		
		List<PatientServiceDetailsDto> listServiceIpdDto = billService.getPatientServiceDetails(objServive).getListServiceIpdDto();
		
		// ============ Call for get ipd discount ==================//
		List<IpdBillDiscount> lstIpdBill = ipdBillService.fetchIpdbillTreatDiscount(treatmentId);
		double totDisc=0;
		if(lstIpdBill.size() >0){
			
			for(int i=0;i<lstIpdBill.size();i++){
				
				if(lstIpdBill.get(i).getApprovedStat().equals("Y")){
					
					totDisc=totDisc+lstIpdBill.get(i).getApprovedAmt();
				}						
			}
		}
		
		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		
		Document document = new Document();
		document.setMargins(20, 20, 20, 20);

		PdfWriter.getInstance(document,outStream);		
		document.open();
			
		/* -------------------- Define Fonts ---------------------------  */			
		Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font subheader = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font tabletext = new Font(Font.FontFamily.HELVETICA, 7, Font.NORMAL);
		Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
		/* -------------------- Define Fonts ---------------------------  */
		
		NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");		
		DecimalFormat df2 = new DecimalFormat("0.00");
		
		String path           = hospObj.getFilePath();
		String hospitalName   = hospObj.getHospitalName();
		hospitalName          = hospitalName.toUpperCase();			
		String address        = hospObj.getHospitalAddress();
		String city           = hospObj.getHospitalCity();
		String contact        = hospObj.getHospitalContact();
		String path1          = application.getRealPath(path);
		String hospitalZip    = hospObj.getHospitalZip(); 			
		String PhoneNo        = hospObj.getHospitalContact();
		String secPhoneNo     = hospObj.getSecPNo();
		String webste         = hospObj.getWebsite();
		String email          = hospObj.getHospitalEmail();
		String cinNo	      = hospObj.getTxtCinNo();
		String gstNo          = hospObj.getTxtGstNo();
		String serviceTaxNo	  = hospObj.getTxtSerTaxNo();
		String panNo	      = hospObj.getPanNo();
		String hPhoneNo       = PhoneNo+"/"+secPhoneNo;
		String nabh           = hospObj.getNabhImagePath(); 
		String nabhLogo       = application.getRealPath(nabh);
		
		Image img = null;
		PdfPCell cell = null;
		try {
			img = Image.getInstance(path1);
			img.scaleAbsolute(100, 60);
			cell = new PdfPCell();
			cell.addElement(new Chunk(img, 1, -32));
			cell.setBorder(Rectangle.NO_BORDER);
		} catch (Exception e) {
			
			e.printStackTrace();
		} 
		
		Image imgNabh = null;
		PdfPCell cellNabh = null;
		try {
			imgNabh = Image.getInstance(nabhLogo);
			imgNabh.scaleAbsolute(80, 60);
			cellNabh = new PdfPCell();
			cellNabh.addElement(new Chunk(imgNabh, 5, -8));
			cellNabh.setBorder(Rectangle.NO_BORDER);
		} catch (Exception e) {
			e.printStackTrace();
		}  
		
		int billId            = rtd.getBillId();
		Integer PatientID     = rtd.getPatientId();
		Integer departmentId  = rtd.getDepartmentId();
		String pname          = rtd.getPatientName();
		String MRNo           = rtd.getMrnno();
		String age	          = rtd.getAge();
		String gender         = rtd.getGender();
		String AgeSexWt       = age+" /"+gender;
		String treatmentCount = rtd.getTrcount();
		String ContactNo      = rtd.getMobile();
		int Departmentid      = rtd.getDepartmentId();
		String TokenNo        = rtd.getTokenno();
		Date appDate          = rtd.getCreatedDateTime();
		String opdipdno       = rtd.getOpdipdno();
		double weight  	      = rtd.getWeight();
		double height  	      = rtd.getHeight();
		String wetHeg         = weight+" /"+height;
		String Age            = rtd.getAge();
		String Gender         = rtd.getGender();
		String allInfo        = Age+"/"+Gender+"/"+weight;
		String MrNo           = rtd.getMrnno();
		String contactNo      = rtd.getMobile();
		String docId          = rtd.getDoctorId();
		String docName        = rtd.getConsultingDocName();	
		int refDocId          = rtd.getRefDocId();
		int stateId           = rtd.getStateId();
		int townId            = rtd.getTownId();
		int districtId        = rtd.getDistrictId();
		int talukaId          = rtd.getTalukaId();
		int sponsorSlave      = rtd.getChargesMasterSlaveId();
		String BillCategoryName = rtd.getCategoryName();
		String refDocName     = rtd.getRefDocName();
		String disDate        = rtd.getDischargeDate();
		String disTime        = rtd.getDischargeTime();
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        SimpleDateFormat sdf2 = new SimpleDateFormat("hh:mm a");
       	Date now = new Date(new java.util.Date().getTime());
       	String strDate = sdf.format(now);
		String rtime   = sdf2.format(now);
		
		Date adm = new Date(rtd.getCreatedDateTime().getTime());
       	String admDate = sdf.format(adm);
		String admTime   = sdf2.format(adm);
			
		if(rtd.getDischargeDate().equals("-")){
			
			disDate="-";
			disTime="-";
		}else{
			
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");   
	    	Date date1 = dateFormat.parse(rtd.getDischargeDate());        	
	    	Date dsDate = new Date(date1.getTime());
	    	disDate=sdf.format(dsDate);
	    	
	    	DateFormat timeFormat = new SimpleDateFormat("HH:mm");   
	    	Date time1 = timeFormat.parse(rtd.getDischargeTime()); 
	    	disTime=sdf2.format(time1);				 			
		}
		 
		String state  ="";
		String district  ="";
		String cityObj  ="";
		String taluka  ="";
		String patientAdd ="";
		String perstate  ="";
		String perdistrict  ="";
		String percityObj  ="";
		String pertaluka  ="";
		String perPatientAdd ="";
		int relationId=0;
		String relation="";
		String relativeName ="";
		
		relationId= rtd.getRelationId();
		patientAdd = rtd.getAddress();
		perPatientAdd = rtd.getPerAddress();
		relativeName = rtd.getRelativeName();
		int perstateId = rtd.getPerstateId();
		int pertownId   =rtd.getPertownId();
		int perdistrictId =rtd.getPerdistrictId();
		int pertalukaId   =rtd.getPertalukaId();
		 
		if(relationId==1){
			relation="S/O";
		}else if(relationId==2){
			relation="W/O";
		}else if(relationId==3){
			relation="D/O";
		}else if(relationId==4){
			relation="F/O";
		}else if(relationId==5){
			relation="Late S/O";
		}else if(relationId==6){
			relation="Late W/O";
		}else if(relationId==7){
			relation="Late D/O";
		}else if(relationId==8){
			relation="Owner";
		}
		
		// patient address
		String addressPatient = "";
		String per_patient_address = "";
		
		if(!cityObj.equals("0") && !cityObj.equals("undefined") && !cityObj.equals("")){
			addressPatient += cityObj;
		}		
		if (!taluka.equals("0") && !taluka.equals("undefined") && !taluka.equals("")){
			addressPatient +=  (taluka + ",");
		}						
		if (!district.equals("0") && !district.equals("undefined") && !district.equals("")){
			addressPatient += (district + ",");
		}
		if (!state.equals("0") && !state.equals("undefined") && !state.equals("")){
			addressPatient += (state + ",");
		}
		// end : patient address
		
		// Start : permanant patient address
		if(percityObj != "0" && !percityObj.equals("undefined") && !percityObj.equals("")){
			per_patient_address += percityObj;
		}		
		if (pertaluka != "0" && !pertaluka.equals("undefined") && !pertaluka.equals("")){
			per_patient_address +=  (" "+pertaluka);
		}						
		if (perdistrict != "0" && !perdistrict.equals("undefined") && !perdistrict.equals("")){
			per_patient_address += (" " + perdistrict);
		}
		if (perstate != "0" && !perstate.equals("undefined") && !perstate.equals("")){
			per_patient_address += ("," + perstate);
		}
		// end : permanant patient address
		
		int printId = 2;
		int numOfPrint = 1;//adminModel.generalAccessNumOfPrint(printId);// to get number of prints

		// Table 1 : For hospital adress details start		
		PdfPTable HeaderTable1 = new PdfPTable(3);
		int[] headerwidth1 = { 30, 80, 20 };
		HeaderTable1.setWidths(headerwidth1);
		HeaderTable1.setWidthPercentage(95f);
		HeaderTable1.setSpacingAfter(15f);
		HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		/* HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		document.add(HeaderTable1);
		HeaderTable1.flushContent(); */

		if (img == null) {
			
			HeaderTable1.addCell(new Phrase("", header));
		} else {
			
			HeaderTable1.addCell(cell);
		}		 
	
		Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
		Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD);
		Phrase p = new Phrase();
		p.add(new Chunk(" "+hospitalName, bold));			
		p.add(new Chunk(" \n\n"+address, tabletext));			
		p.add(new Chunk(" "+city+" Pin- "+hospitalZip +"\n", tabletext));
		p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
		if(!webste.equalsIgnoreCase("")){
			p.add(new Chunk(" \n "+webste, tabletext));
		}
		p.add(new Chunk(" \n "+"email: "+email, tabletext));		
		PdfPCell hospitalNameCell = new PdfPCell(p);				
		hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
		HeaderTable1.addCell(hospitalNameCell);
		
		ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String billPrint = (String) resourceBundle.getObject("billPrint").toString();
		
		if(billPrint.contains("on")){
			
			if (img == null) {
				
				HeaderTable1.addCell(new Phrase("", header));
			} else {
				
				HeaderTable1.addCell(cellNabh);
			}
		}else{
			
			HeaderTable1.addCell(new Phrase("", header));
		}
		
		/* HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header)); 
		
		document.add(HeaderTable1);
		HeaderTable1.flushContent();*/
		
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);		
		document.add(HeaderTable1);
		HeaderTable1.flushContent();			
		// Table 1 : For hospital adress details end
		
		// Table 2 : For receipt head start		
		PdfPTable HeaderTable2 = new PdfPTable(5);
		int[] headerwidth2 = { 15, 24, 50, 13, 30 };
		HeaderTable2.setWidths(headerwidth2);
		HeaderTable2.setWidthPercentage(95f);
		HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
		HeaderTable2.addCell(new Phrase("", subheader));
		HeaderTable2.addCell(new Phrase("", subheader));
		HeaderTable2.addCell(new Phrase("", subheader));
		HeaderTable2.addCell(new Phrase("", subheader));
		HeaderTable2.addCell(new Phrase("", subheader));		
		
		//HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
		HeaderTable2.addCell(new Phrase("Printed Date : ", subheader));
		PdfPCell subcell = new PdfPCell(new Phrase(""+strDate+" "+rtime,tabletext));
		subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
		subcell.setBorder(Rectangle.BOTTOM);
		HeaderTable2.addCell(subcell);
		
		if(finalbillIs.equals("finalBill"))
			HeaderTable2.addCell(new Phrase("         FINAL DETAILED INVOICE", header));
		else			
			HeaderTable2.addCell(new Phrase("       GENERAL DETAILED INVOICE ", header));
				
		HeaderTable2.addCell(new Phrase("Printed By : ", subheader));
		HeaderTable2.addCell(new Phrase(""+user_name, tabletext));
		document.add(HeaderTable2);
		HeaderTable2.flushContent();		
		// Table 2 : For receipt head end
		
        // Table3 : For patient header info start       
        PdfPTable HeaderTable3 = new PdfPTable(4);
		int[] headerwidth3 = { 30, 50, 30, 50 };
		HeaderTable3.setWidths(headerwidth3);
		HeaderTable3.setWidthPercentage(95f);
		HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable3.setSpacingAfter(5f);
		
		Number finalBillId = 0;
		/* if(finalbillIs.equals("finalBill") || finalbillIs.equals("null")){
			
			finalBillId = rtd.getInvoiceCount().intValue();
		}else{
			
			finalBillId = billId;
		} */
		
		String invoiceDate = " ";
		String invoiceTime = " ";
		if(rtd.getInvoiceFlag().equalsIgnoreCase("Y")){
			finalBillId = rtd.getInvoiceCount();
			Date invDate = new Date(rtd.getInvCreatedDateTime().getTime());
			invoiceDate = sdf.format(invDate);
			invoiceTime = sdf2.format(invDate);
		}
		
		if(finalbillIs.equals("finalBill")){
			
			HeaderTable3.addCell(new Phrase(" "+patientId,subheader));
			HeaderTable3.addCell(new Phrase(" : "+rtd.getCenterPatientId(),tabletext));
			
			HeaderTable3.addCell(new Phrase("Bill No. ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+finalBillId,tabletext)); 
			
			HeaderTable3.addCell(new Phrase("Patient Name ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+pname,tabletext));
					            
			HeaderTable3.addCell(new Phrase("Bill Date ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+invoiceDate,tabletext));
			
			HeaderTable3.addCell(new Phrase("Contact No",subheader));
			HeaderTable3.addCell(new Phrase(" : "+contactNo,tabletext));
			
			HeaderTable3.addCell(new Phrase("Bill Time ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+invoiceTime,tabletext));
			
			HeaderTable3.addCell(new Phrase("Res. Address ",	subheader));		
			HeaderTable3.addCell(new Phrase(" : "+patientAdd+" "+ addressPatient, tabletext));
			
			if(per_patient_address != null && perPatientAdd !=null && !perPatientAdd.equalsIgnoreCase("") || !per_patient_address.equalsIgnoreCase("") && !per_patient_address.equalsIgnoreCase(null) && !per_patient_address.equals("undefined")) {
				HeaderTable3.addCell(new Phrase("Per. Address ",	subheader));		
				HeaderTable3.addCell(new Phrase(" : "+perPatientAdd+" "+ per_patient_address, tabletext));
			}else{
				HeaderTable3.addCell(new Phrase("Per. Address ",	subheader));		
				HeaderTable3.addCell(new Phrase(" : ", tabletext));
			}
		
			if(relativeName != null && relativeName !="" && relativeName!="undefined"){
				HeaderTable3.addCell(new Phrase("Relative Name ", subheader));
				HeaderTable3.addCell(new Phrase(" : "+relation+"-"+relativeName, tabletext));
			} else{
				HeaderTable3.addCell(new Phrase("Relative Name ", subheader));
				HeaderTable3.addCell(new Phrase(" : ", tabletext));
			}
			 
			HeaderTable3.addCell(new Phrase("Consultant ",	subheader));		
			HeaderTable3.addCell(new Phrase(" : "+docName, tabletext));
			
			HeaderTable3.addCell(new Phrase("Admission Date & Time ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+admDate+" "+admTime, tabletext));
			
			HeaderTable3.addCell(new Phrase("Ref. Doc ",subheader));
			HeaderTable3.addCell(new Phrase(" : " +rtd.getRefDocName(), tabletext));
			
			HeaderTable3.addCell(new Phrase("IPD No ",subheader));
			HeaderTable3.addCell(new Phrase(" : " +opdipdno , tabletext));	
			
			HeaderTable3.addCell(new Phrase("Age/Gender/Wt ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+allInfo,tabletext));
			
			HeaderTable3.addCell(new Phrase("Ward ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+rtd.getHallName(),tabletext));
			
			HeaderTable3.addCell(new Phrase("Sponsor",	subheader));		
			HeaderTable3.addCell(new Phrase(" : "+rtd.getCategoryName(), tabletext));
						
			if(disDate== null || disDate==""|| disDate=="-"){
			
				HeaderTable3.addCell(new Phrase("Discharge Date & Time ",subheader));
				HeaderTable3.addCell(new Phrase(" : ",tabletext));
			}else{
				HeaderTable3.addCell(new Phrase("Discharge Date & Time ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+disDate+" "+disTime,tabletext));
			}		
			
			HeaderTable3.addCell(new Phrase("",subheader));
			HeaderTable3.addCell(new Phrase("" ,tabletext));
			
			
		}else{
			
			HeaderTable3.addCell(new Phrase(" "+patientId,subheader));
			HeaderTable3.addCell(new Phrase(" : "+rtd.getCenterPatientId(),tabletext));
			
			HeaderTable3.addCell(new Phrase("Bill No. ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+finalBillId,tabletext)); 
			
			HeaderTable3.addCell(new Phrase("Patient Name ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+pname,tabletext));
			
			HeaderTable3.addCell(new Phrase("Bill Date ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+invoiceDate,tabletext));
			
			HeaderTable3.addCell(new Phrase("Contact No",subheader));
			HeaderTable3.addCell(new Phrase(" : "+contactNo,tabletext));
					            
			HeaderTable3.addCell(new Phrase("Bill Time ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+invoiceTime,tabletext));
			
			HeaderTable3.addCell(new Phrase("Res. Address ",subheader));		
			HeaderTable3.addCell(new Phrase(" : "+patientAdd+" "+ addressPatient, tabletext));
			
			if(per_patient_address != null && perPatientAdd !=null && !perPatientAdd.equalsIgnoreCase("") || !per_patient_address.equalsIgnoreCase("") && !per_patient_address.equalsIgnoreCase(null) && !per_patient_address.equals("undefined")){
				HeaderTable3.addCell(new Phrase("Per. Address ",	subheader));		
				HeaderTable3.addCell(new Phrase(" : "+perPatientAdd+" "+ per_patient_address, tabletext));
			}else{
				HeaderTable3.addCell(new Phrase("Per. Address ",	subheader));		
				HeaderTable3.addCell(new Phrase(" : ", tabletext));
			}
		
			if(relativeName != null && relativeName !="" && relativeName!="undefined"){
				HeaderTable3.addCell(new Phrase("Relative Name ", subheader));
				HeaderTable3.addCell(new Phrase(" : "+relation+"-"+relativeName, tabletext));
			}else{
				HeaderTable3.addCell(new Phrase("Relative Name ", subheader));
				HeaderTable3.addCell(new Phrase(" : ", tabletext));
			}			 
			 
			HeaderTable3.addCell(new Phrase("Consultant ",	subheader));		
			HeaderTable3.addCell(new Phrase(" : "+docName, tabletext));
			
			HeaderTable3.addCell(new Phrase("Admission Date & Time ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+admDate+" "+admTime, tabletext));
			
			HeaderTable3.addCell(new Phrase("Ref. Doc ",subheader));
			HeaderTable3.addCell(new Phrase(" : " +rtd.getRefDocName(), tabletext));
			
			HeaderTable3.addCell(new Phrase("IPD No ",subheader));
			HeaderTable3.addCell(new Phrase(" : " +opdipdno , tabletext));	
			
			HeaderTable3.addCell(new Phrase("Age/Gender/Wt ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+allInfo,tabletext));
			
			HeaderTable3.addCell(new Phrase("Ward ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+rtd.getHallName(),tabletext));
			
			HeaderTable3.addCell(new Phrase("Sponsor",	subheader));		
			HeaderTable3.addCell(new Phrase(" : "+rtd.getCategoryName(), tabletext));
						
			if(disDate== null || disDate==""|| disDate=="-"){			
				HeaderTable3.addCell(new Phrase("Discharge Date & Time ",subheader));
				HeaderTable3.addCell(new Phrase(" : ",tabletext));
			}else{
				HeaderTable3.addCell(new Phrase("Discharge Date & Time ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+disDate+" "+disTime,tabletext));
			}
			
			HeaderTable3.addCell(new Phrase("",subheader));
			HeaderTable3.addCell(new Phrase("",tabletext));
			
		}    
		
		HeaderTable3.addCell(new Phrase(" ", subheader));
		HeaderTable3.addCell(new Phrase(" ", subheader)); 
		
		document.add(HeaderTable3);
		HeaderTable3.flushContent();		
		// Table3 : For patient header info end
		 
		// Table5 : For service details head start								
		PdfPTable HeaderTable29 = new PdfPTable(5);
		int[] headerwidth29 = { 50, 7, 13, 13, 20 };
		HeaderTable29.setWidths(headerwidth29);
		HeaderTable29.setWidthPercentage(95f);
				
		PdfPTable HeaderTable5 = new PdfPTable(8);
		int[] headerwidth5 = { 10, 60, 15, 20, 15, 15, 22, 25 };
		HeaderTable5.setWidths(headerwidth5);
		HeaderTable5.setWidthPercentage(95f);
		
		HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);	
		//HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
				
		HeaderTable5.addCell(new Phrase("#", subheader));		
		HeaderTable5.addCell(new Phrase("Particular", subheader));	
		HeaderTable5.addCell(new Phrase("Date", subheader));	
		HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
		HeaderTable5.addCell(new Phrase("Rate ("+currencyCode+")", subheader));		
		HeaderTable5.addCell(new Phrase("Qty", subheader));	
		if(concessionFlow.equals("on")){
			
			HeaderTable5.addCell(new Phrase("Concn", subheader));
		}else{
			
			HeaderTable5.addCell(new Phrase("", subheader));
		}
		HeaderTable5.addCell(new Phrase("Amount ("+currencyCode+")", subheader));		
		HeaderTable5.addCell(new Phrase("Total ("+currencyCode+")",subheader));
		HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
		
		document.add(HeaderTable5);
		HeaderTable5.flushContent();
	
		double totPayable=0.0;
		double totDic=0.0;
		double finalTot=0;
		double consultAmt=0;
		double adminAmt=0;
		int countItem=0;
		String servDate;
		String PType="";
		if(rtd.getChargesMasterSlaveId() > 0)
			PType = "Sponsor";
			
		for (int i = 0; i < listServiceIpdDto.size(); i++) {
			
			double totAmt=0;
			int serId = listServiceIpdDto.get(i).getServiceId();
			String sevName = listServiceIpdDto.get(i).getServiceName();
			
			// =========== Call for subservice details ==============//
			PatientSubServiceDetailsDto objSubServive = new PatientSubServiceDetailsDto();
			objSubServive.setTreatmentId(treatmentId);
			objSubServive.setServiceId(serId);
			objSubServive.setDrdeskflag("print");
			List<PatientSubServiceDetailsDto> listBillDetail = billService.getPatientSubServiceDetails(objSubServive).getListSubServiceIpdDto();
			if(billService.getPatientSubServiceDetails(objSubServive).getListBillNobleServiceDto().size()  > 0)
				listBillDetail.addAll(billService.getPatientSubServiceDetails(objSubServive).getListBillNobleServiceDto());
				if(billService.getPatientSubServiceDetails(objSubServive).getListSubServiceInventoryDto().size()  > 0)
				listBillDetail.addAll(billService.getPatientSubServiceDetails(objSubServive).getListSubServiceInventoryDto());
				
			double HtotAmt=0;
			double tempAmt=0; 
			
			/* if(PType.equals("Sponsor")){
				
				tempAmt = listServiceIpdDto.get(i).getOtherAmount();						
			}else{
				
				tempAmt = listServiceIpdDto.get(i).getAmount();						
			} */
			
			//if(tempAmt != 0){
				
				HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);	
				HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);					
				HeaderTable5.addCell(new Phrase(""+(++countItem),subheader));
				HeaderTable5.addCell(new Phrase(""+sevName.toUpperCase(),subheader));
				HeaderTable5.addCell(new Phrase("",tabletext));
				HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
				HeaderTable5.addCell(new Phrase("",tabletext));
				HeaderTable5.addCell(new Phrase("",tabletext));
				HeaderTable5.addCell(new Phrase("",tabletext));
				HeaderTable5.addCell(new Phrase("",subheader));
				HeaderTable5.addCell(new Phrase("",subheader));
							
				document.add(HeaderTable5);
				HeaderTable5.flushContent();
			//}
			
			String bedHallName = "";
			
			for (int k = 0; k < listBillDetail.size(); k++) {
												
				if(listBillDetail.get(k).getCancle().equals("N") && listBillDetail.get(k).getPaidByCashFlag().equals("N")){
				
					String subServName="";
					double rate = 0;
					double qty  = 0;
					double concn= 0;
					double amt  = 0;
					
					Date serviceDate = new Date(listBillDetail.get(k).getCreatedDate().getTime());
					servDate = sdf.format(serviceDate);
					
					String cghsId = "";
					/* String cghsId = ""+listBillDetail.get(k).getCghsCode()+"";
					if(cghsId.equalsIgnoreCase("") || cghsId.equalsIgnoreCase("-") || cghsId=="()" || cghsId.equalsIgnoreCase("(-)") || cghsId.equalsIgnoreCase("(null)")){
						cghsId="";
					}
					else{
						cghsId = "("+listBillDetail.get(k).getCghsCode()+")";
					}
					if(cghsId.equals("null") || cghsId==null || cghsId.equals("-")){
						
						cghsId="";
					} */
					
					if(PType.equals("Sponsor")){
						
						rate = listBillDetail.get(k).getOtherRate();
						qty = listBillDetail.get(k).getQuantity();
						concn = listBillDetail.get(k).getOtherConcession();
						amt = listBillDetail.get(k).getOtherAmount() - concn;
						
					}else{
						
						rate = listBillDetail.get(k).getRate();
						qty = listBillDetail.get(k).getQuantity();
						concn = listBillDetail.get(k).getConcession();
						amt = listBillDetail.get(k).getAmount() - concn;
					}
					
					totAmt=totAmt+(qty*rate);
					
					if(serId==2){
														
						//subServName="Consultation Charges  ("+listBillDetail.get(k).getDocName()+")";
						subServName = listBillDetail.get(k).getCategoryName() + " ("+listBillDetail.get(k).getDocName()+")";
						subServName = subServName + cghsId;
						
						String sname="";
						if(rtd.getChargesMasterSlaveId() > 0){
							sname=sponsorCustom.getSponsorCustomTestName(rtd.getChargesMasterSlaveId(), listBillDetail.get(k).getServiceId(), listBillDetail.get(k).getSubServiceId());
						}
						if(!sname.equalsIgnoreCase("")){
							subServName=sname;
						}
					
					
					}else if(serId==3){
						
						if(listBillDetail.get(k).getSubServiceId() == 0){
							
							subServName = "Nursing : "+bedHallName;
							subServName = subServName + cghsId;
						}else{
							
							subServName = listBillDetail.get(k).getBedHall();
							subServName = subServName + cghsId;
							bedHallName = subServName;
							
							
							String customName="";
							 if(rtd.getChargesMasterSlaveId() > 0){
								 List<SponsorCustomWardNameDTO> lobj=sponsorCustom.getWardDetailsBysponsorIdandChargeId(rtd.getChargesMasterSlaveId(), listBillDetail.get(k).getHallID().intValue());
							       if(lobj.size() > 0){
							    	   customName=lobj.get(0).getCustomWardName();
							       }
							       
							       if(!customName.equalsIgnoreCase("")){
							    	   subServName=customName;
							    	   bedHallName=customName;
							       }
							       
							 }
							 
						}
					}else if(serId==4){
						
						String docServName="";								
						if(listBillDetail.get(k).getDocId()!=null){
							
							//Integer docServId=listBillDetail.get(k).getDocId();													
							//docServName = fetchlist.getStringValOfObject("doctor","doc_name",docServId,"Doctor_ID");	
						} 							
						if(listBillDetail.get(k).getSubServiceId()==2302){
							
							//subServName = listBillDetail.get(k).getOtProcedure();	
							subServName = subServName + cghsId;
							subServName=subServName +"      "+docServName;								
						}else{
							
							subServName = listBillDetail.get(k).getCategoryName()+"("+listBillDetail.get(k).getOName()+")";
							//subServName = subServName + cghsId;
							subServName=subServName +"      "+docServName;
							
							String sname="";
							if(rtd.getChargesMasterSlaveId() > 0){
								sname=sponsorCustom.getSponsorCustomTestName(rtd.getChargesMasterSlaveId(), listBillDetail.get(k).getServiceId(), listBillDetail.get(k).getSubServiceId());
							}
							if(!sname.equalsIgnoreCase("")){
								subServName=sname;
							}
						}				
						
					}else if(serId==5){
						
						subServName= listBillDetail.get(k).getDocName();	
						//subServName = subServName + cghsId;
						//subServName = subServName;
					}else if (serId==14) {
						
						subServName = "";
						//subServName = listBillDetail.get(k).getInventoryName();
						//subServName = subServName + cghsId;
					}else if (serId==16) {			

						subServName = "";
						//subServName = listBillDetail.get(k).getPharmaName();
						//subServName = subServName + cghsId;
						//subServName = subServName; 
					}else if (serId==15) {
						
						subServName = listBillDetail.get(k).getCategoryName();
						//subServName = subServName + cghsId;
						//subServName = subServName;
						adminAmt=adminAmt+(qty*rate);
						String sname="";
						if(rtd.getChargesMasterSlaveId() > 0){
							sname=sponsorCustom.getSponsorCustomTestName(rtd.getChargesMasterSlaveId(), listBillDetail.get(k).getServiceId(), listBillDetail.get(k).getSubServiceId());
						}
						if(!sname.equalsIgnoreCase("")){
							subServName=sname;
						}
					}else {
						//String otProcedure="";	
						//otProcedure = listBillDetail.get(k).getOtProcedure();
						
						
						 
							  subServName = listBillDetail.get(k).getCategoryName();	
							  String sname="";
								if(rtd.getChargesMasterSlaveId() > 0){
									sname=sponsorCustom.getSponsorCustomTestName(rtd.getChargesMasterSlaveId(), listBillDetail.get(k).getServiceId(), listBillDetail.get(k).getSubServiceId());
								}
								if(!sname.equalsIgnoreCase("")){
									subServName=sname;
								}
						 
						/* if(otProcedure!=null){
							subServName = subServName + cghsId +"("+otProcedure+")";
							subServName = subServName  +"("+otProcedure+")";
						}else{
							subServName = subServName + cghsId;
							subServName = subServName;	
						} */
						/* String docServName="";
											
						if(listBillDetail.get(k).getDocId()!=null && listBillDetail.get(k).getDocId() >0){
							
							Integer docServId=listBillDetail.get(k).getDocId();													
							docServName = fetchlist.getStringValOfObject("doctor","doc_name",docServId,"Doctor_ID");									
						}
						subServName = subServName + "        " +docServName; */			
					}				
					
					//if(qty*rate != 0){
						
						HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);					
						HeaderTable5.addCell(new Phrase("",tabletext));
						HeaderTable5.addCell(new Phrase(""+subServName.toUpperCase(),tabletext));
						HeaderTable5.addCell(new Phrase(""+servDate,tabletext));
						HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
						HeaderTable5.addCell(new Phrase(""+df2.format(rate),tabletext));
						HeaderTable5.addCell(new Phrase(""+df2.format((qty)),tabletext));
						HeaderTable5.addCell(new Phrase(""+df2.format(concn),tabletext));
						HeaderTable5.addCell(new Phrase(""+df2.format(amt),tabletext));
						HeaderTable5.addCell(new Phrase("",tabletext));
						
						HeaderTable5.addCell(new Phrase("",tabletext));
						HeaderTable5.addCell(new Phrase("",tabletext));
						HeaderTable5.addCell(new Phrase("",tabletext));
						HeaderTable5.addCell(new Phrase("",tabletext));
						HeaderTable5.addCell(new Phrase("",tabletext));
						HeaderTable5.addCell(new Phrase("",tabletext));
						HeaderTable5.addCell(new Phrase("",tabletext));
						HeaderTable5.addCell(new Phrase("",tabletext));
						
						document.add(HeaderTable5);
						HeaderTable5.flushContent();
					//}		
						tempAmt = tempAmt + amt;
				}					
			}	
			
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);	
			HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);					
			HeaderTable5.addCell(new Phrase("",tabletext));
			HeaderTable5.addCell(new Phrase("",tabletext));
			HeaderTable5.addCell(new Phrase("",tabletext));
			HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable5.addCell(new Phrase("",tabletext));
			HeaderTable5.addCell(new Phrase("",tabletext));
			HeaderTable5.addCell(new Phrase("",tabletext));
			HeaderTable5.addCell(new Phrase("",tabletext));
			HeaderTable5.addCell(new Phrase(""+df2.format(tempAmt),subheader));	
					
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
		}			
				
		HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("",tabletext));
		
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("",tabletext));
		
		document.add(HeaderTable5);
		HeaderTable5.flushContent();
		
		PdfPTable HeaderTable57 = new PdfPTable(3);
		int[] headerwidth57 = { 35, 55, 20 };
		HeaderTable57.setWidths(headerwidth57);
		HeaderTable57.setWidthPercentage(95f);
		
		// ============ Call for ge final amount details =============//
		BillAmountDetailsDto objDto = new BillAmountDetailsDto();
		objDto.setUnitId(unitId);
		objDto.setDepId(2);
		objDto.setUserId(userId);
		objDto.setTreatmentId(treatmentId);
		objDto.setServiceId(-1);
		objDto.setChargesSlaveId(rtd.getChargesMasterSlaveId());
		int sponsorCatId = 0;
		if(rtd.getChargesMasterSlaveId() > 0){
			sponsorCatId = 1;
		}
		objDto.setSponsorCatId(sponsorCatId);
		objDto.setPharmacyInvoice(pharmacyInvoiceId);
		objDto.setPharmacyServId(pharmacyServId);
		objDto.setCallformComAdv("ipdBill");
		objDto.setCallformRcptTot("ipd");
		objDto.setCallformPrevPending("onload");
		BillAmountDetailsDto resultObj = billService.getAllAmountDetails(objDto).getLstAmountDetails().get(0);
		
		finalTot = resultObj.getTotAmt();
		double conTot= resultObj.getTotConcn();
		double netAmt = finalTot - (totDisc + conTot);
		double totPaid = resultObj.getTotPaid();
		double totRefund = resultObj.getTotRefund();	
		double setTotalSonsorAmt = resultObj.getTotalSpnsrpaid();
				
		HeaderTable57.getDefaultCell().setBorder(Rectangle.BOX);		
		
		Double pharmaPaid=0.0;
		//IndentService indentServ=(ApplicationContextUtils.getApplicationContext()).getBean(IndentService.class);
		if(shraddha.equalsIgnoreCase("on")){
			 		
			pharmaPaid=0.0;
		}else{
			
			pharmaPaid=0.0;//indentServ.getReceiveAmountByTreatmentId(treatmentId);
		}
		
		if(pharmaPaid == 0){			
			pharmaPaid=0.0;
		}	
		
		//FinanceService finServ=(ApplicationContextUtils.getApplicationContext()).getBean(FinanceService.class);	
		Double pharmaReturn=0.0;
		if(shraddha.equalsIgnoreCase("on")){
			 pharmaReturn=0.0;
		}else{			
			 pharmaReturn=0.0;//finServ.getPharmaReturn(treatmentId);
		}
		
		if(pharmaReturn == 0){
			
			pharmaReturn=0.0;
		}	
		
		Double pharmaAmt=pharmaPaid-pharmaReturn;
			
		if(finalTot != 0){
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
			HeaderTable57.addCell(new Phrase("Total Amount", subheader));
			HeaderTable57.addCell(new Phrase("", tabletext));
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable57.addCell(new Phrase(""+df2.format(finalTot), subheader));			
		}
		
		if(conTot > 0){
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
			HeaderTable57.addCell(new Phrase("Total Concession", subheader));
			HeaderTable57.addCell(new Phrase("", tabletext));
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable57.addCell(new Phrase(""+df2.format(conTot), subheader));
		}
		
		if(totDisc > 0){
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
			HeaderTable57.addCell(new Phrase("Discount", subheader));
			HeaderTable57.addCell(new Phrase("", tabletext));
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable57.addCell(new Phrase(""+df2.format(totDisc), subheader));
		}	
		
		if(netAmt >= 0){
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
			HeaderTable57.addCell(new Phrase("Amount Payable", subheader));
			HeaderTable57.addCell(new Phrase("", tabletext));
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable57.addCell(new Phrase(""+df2.format(netAmt), subheader));
		}	
		
		if(resultObj.getRemaining_common_amnt() != 0){
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
			HeaderTable57.addCell(new Phrase("Common Advance", subheader));
			HeaderTable57.addCell(new Phrase("", tabletext));
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable57.addCell(new Phrase(""+df2.format(resultObj.getRemaining_common_amnt()), subheader));
		}
			
		if(totPaid != 0){
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
			HeaderTable57.addCell(new Phrase("Amount Received", subheader));
			HeaderTable57.addCell(new Phrase("", tabletext));
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable57.addCell(new Phrase(""+df2.format(totPaid), subheader));
		}		

		if(setTotalSonsorAmt != 0){
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
			HeaderTable57.addCell(new Phrase("Paid By Sponsor", subheader));
			HeaderTable57.addCell(new Phrase("", tabletext));
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable57.addCell(new Phrase(""+df2.format(setTotalSonsorAmt), subheader));
		}
		
		if(pharmaPaid != 0){
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
			HeaderTable57.getDefaultCell().setColspan(1);
			HeaderTable57.addCell(new Phrase("Pharmacy Paid Amount", subheader));
			HeaderTable57.addCell(new Phrase("", tabletext));
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable57.addCell(new Phrase(""+df2.format(pharmaPaid), subheader));
		}
		
		if(pharmaReturn != 0){
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
			HeaderTable57.getDefaultCell().setColspan(1);
			HeaderTable57.addCell(new Phrase("Pharmacy Return Amount", subheader));
			HeaderTable57.addCell(new Phrase("", tabletext));
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable57.addCell(new Phrase(""+df2.format(pharmaReturn), subheader));
		}
		
		//added by kishor
		/* if(finalRefundable != 0){
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
			HeaderTable57.addCell(new Phrase("Refundable Amount", subheader));
			HeaderTable57.addCell(new Phrase("", tabletext));
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable57.addCell(new Phrase(""+df2.format(finalRefundable), subheader));
		} */
		
		if(totRefund != 0){
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
			HeaderTable57.addCell(new Phrase("Total Refund", subheader));
			HeaderTable57.addCell(new Phrase("", tabletext));
			HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable57.addCell(new Phrase(""+df2.format(totRefund), subheader));
		}	
				
		double TotalPayable=netAmt-(totPaid+pharmaAmt+setTotalSonsorAmt);
		if(TotalPayable< 0){
			TotalPayable=0;
		}
		
		HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
		HeaderTable57.addCell(new Phrase("Balance Amount  ", subheader));
		HeaderTable57.addCell(new Phrase("", tabletext));
		HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
		HeaderTable57.addCell(new Phrase(""+df2.format(TotalPayable), subheader));
			
		long finalam = (long) TotalPayable;
		
		String oustandingAmt="";
		
		if(TotalPayable > 0){
			
			oustandingAmt = EnglishNumberToWords.convert(finalam);
		}else{
			
			oustandingAmt = " Zero Only";
		}
		
		HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
		HeaderTable57.addCell(new Phrase("Balance Amount In Word ", subheader));
		HeaderTable57.addCell(new Phrase(" "+currencyName+"."+oustandingAmt, tabletext));
		HeaderTable57.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
		HeaderTable57.addCell(new Phrase("", subheader));
		
		document.add(HeaderTable57);
		HeaderTable57.flushContent();		
		// Table5 : For service details head end
		
		//Start table no 9 start
				PdfPTable HeaderTable9 = new PdfPTable(10);
				int[] headerwidth9 = { 8,10,20,20,10,10,10,15,10,10};
				HeaderTable9.setWidths(headerwidth9);
				HeaderTable9.setWidthPercentage(95f);
						
			//	HeaderTable9.setSpacingBefore(10f);
				HeaderTable9.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				//Start table no 10 start for advance details line
				PdfPTable HeaderTable10 = new PdfPTable(1);
				int[] headerwidth10 = {17}; // Same as HeaderTable9
				HeaderTable10.setWidths(headerwidth10);
				HeaderTable10.setWidthPercentage(95f);

				HeaderTable10.setSpacingBefore(10f);
				HeaderTable10.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				//========== call advanvce receipt details ===========//
				IpdBillReceiptMasterDTO ipdObj1 = new IpdBillReceiptMasterDTO();
				ipdObj1.setBillId(billId);
				ipdObj1.setTreatmentId(treatmentId);
				ipdObj1.setReceiptOf("all");
				ipdObj1.setCreatedBy(userId);
				IpdBillReceiptMasterDTO obj3 = ipdBillService.getBillReceiptDetailsIpd(ipdObj1,"all");
				double totPaid123=0.00;
				if(obj3.getListBillReceiptMaster().size()>0){
					
					HeaderTable10.getDefaultCell().setBorder(Rectangle.BOTTOM);
				    HeaderTable10.addCell(new Phrase("Advance Details", subheader));
				    
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));
					
					HeaderTable9.getDefaultCell().setBorder(Rectangle.NO_BORDER);		
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", subheader));	
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));
					
					HeaderTable9.addCell(new Phrase("Rec.No", subheader));
					HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
					HeaderTable9.addCell(new Phrase("Adv.Amt", subheader));
					HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
					HeaderTable9.addCell(new Phrase("Adv.Date", subheader));
					HeaderTable9.addCell(new Phrase("Remark", subheader));
					HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
					HeaderTable9.addCell(new Phrase("Cash Amt", subheader));
					HeaderTable9.addCell(new Phrase("Card.Amt", subheader));
					HeaderTable9.addCell(new Phrase("Chq.Amt", subheader));
					HeaderTable9.addCell(new Phrase("Common Adv Amt", subheader));
					HeaderTable9.addCell(new Phrase("UPI Amt", subheader)); 
					HeaderTable9.addCell(new Phrase("Batch No.", subheader));
					
					HeaderTable9.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					for(int i=0;i< obj3.getListBillReceiptMaster().size();i++){
						
						totPaid123=totPaid123+obj3.getListBillReceiptMaster().get(i).getTotalPaid();
						HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
						HeaderTable9.addCell(new Phrase(""+obj3.getListBillReceiptMaster().get(i).getReceiptCount(), tabletext));
						HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
						HeaderTable9.addCell(new Phrase(""+df2.format(obj3.getListBillReceiptMaster().get(i).getTotalPaid()), tabletext));
						HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
						HeaderTable9.addCell(new Phrase(""+obj3.getListBillReceiptMaster().get(i).getCreatedDateTime(), tabletext));			
						HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
						HeaderTable9.addCell(new Phrase("          "+obj3.getListBillReceiptMaster().get(i).getRemark(), tabletext));
						HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
						
						if(obj3.getListBillReceiptMaster().get(i).getPayMode() == -1){
							
							recId = obj3.getListBillReceiptMaster().get(i).getBillReceiptId();
							List<MultiBillReceiptMasterDTO> listMultiPay = new ArrayList<MultiBillReceiptMasterDTO>();
							listMultiPay = hm.getMultiRecDetails(billId, treatmentId, patId, recId, departmentId);
							double mulCashAmt=0,mulCardAmt=0,mulChqAmt=0,mulCdaAmt=0,mulUpiAmt=0;
														
							for(int k = 0; k < listMultiPay.size(); k++){
								
								if (listMultiPay.get(k).getPayMode() == 1) {
									
									mulCashAmt = listMultiPay.get(k).getTotalPaid();						
								}

								if (listMultiPay.get(k).getPayMode() == 2) {
									
									mulCardAmt = listMultiPay.get(k).getTotalPaid();
								}
								
								if (listMultiPay.get(k).getPayMode() == 3) {
									
									mulChqAmt = listMultiPay.get(k).getTotalPaid();
								}
								
								if (listMultiPay.get(k).getPayMode() == 4) {
									
									mulCdaAmt = listMultiPay.get(k).getTotalPaid();
								}	
								
								if (listMultiPay.get(k).getPayMode() == 5) {
									
									mulUpiAmt = listMultiPay.get(k).getTotalPaid();
								}	
							}	
							
							HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTable9.addCell(new Phrase(""+ df2.format(mulCashAmt), tabletext));
							
							HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTable9.addCell(new Phrase(""+ df2.format(mulCardAmt), tabletext));
							
							HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTable9.addCell(new Phrase(""+ df2.format(mulChqAmt), tabletext));
							
							HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTable9.addCell(new Phrase(""+ df2.format(mulCdaAmt), tabletext));
							
							HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTable9.addCell(new Phrase(""+ df2.format(mulUpiAmt), tabletext));
							
						}else{					
								
							if (obj3.getListBillReceiptMaster().get(i).getPayMode() == 1) {
								HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
								HeaderTable9.addCell(new Phrase(""+ df2.format(obj3.getListBillReceiptMaster().get(i).getTotalPaid()), tabletext));
							} else {
								HeaderTable9.addCell(new Phrase("0.00", tabletext));
							}

							if (obj3.getListBillReceiptMaster().get(i).getPayMode() == 2) {
								HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
								HeaderTable9.addCell(new Phrase(""+ df2.format(obj3.getListBillReceiptMaster().get(i).getTotalPaid()), tabletext));
							} else {
								HeaderTable9.addCell(new Phrase("0.00", tabletext));
							}
							
							if (obj3.getListBillReceiptMaster().get(i).getPayMode() == 3) {
								HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
								HeaderTable9.addCell(new Phrase(""+ df2.format(obj3.getListBillReceiptMaster().get(i).getTotalPaid()), tabletext));
							}else {
								HeaderTable9.addCell(new Phrase("0.00", tabletext));
							}
							
							if (obj3.getListBillReceiptMaster().get(i).getPayMode() == 4) {
								HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
								HeaderTable9.addCell(new Phrase(""+ df2.format(obj3.getListBillReceiptMaster().get(i).getTotalPaid()), tabletext));
							}else {
								HeaderTable9.addCell(new Phrase("0.00", tabletext));
							}
							
							if (obj3.getListBillReceiptMaster().get(i).getPayMode() == 5) {
								HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
								HeaderTable9.addCell(new Phrase(""+ df2.format(obj3.getListBillReceiptMaster().get(i).getTotalPaid()), tabletext));
							}else {
								HeaderTable9.addCell(new Phrase("0.00", tabletext));
							}
						}

						HeaderTable9.addCell(new Phrase(""+obj3.getListBillReceiptMaster().get(i).getBatchNumber(), tabletext));
						}				
					}
					document.add(HeaderTable10);
					HeaderTable10.flushContent();		
					HeaderTable9.setSpacingAfter(20f);
					document.add(HeaderTable9);
					HeaderTable9.flushContent();
					//end Table 9
			
			// Table4 : For page footer start
			PdfPTable HeaderTable4 = new PdfPTable(4);
			int[] headerwidth4 = { 50, 40, 40, 40 };
			HeaderTable4.setWidths(headerwidth4);
			HeaderTable4.setWidthPercentage(95f);
			HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable4.setSpacingBefore(20f);
			
			HeaderTable4.addCell(new Phrase("                Prepared By", subheader));
			HeaderTable4.addCell(new Phrase("Checked By", subheader));			
			HeaderTable4.addCell(new Phrase("For Hospital", subheader));
			HeaderTable4.addCell(new Phrase("Payee", subheader));

			/* HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			
			document.add(HeaderTable4);
			HeaderTable4.flushContent(); */
			
			HeaderTable4.addCell(new Phrase("                "+ rtd.getInvoiceCreatedBy(), tabletext));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));

			document.add(HeaderTable4);
			HeaderTable4.flushContent();
			// Table4 : For page footer end

			document.close();
			outStream.flush();
			outStream.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	%>
	
</body>
</html>