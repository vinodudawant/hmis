<%@page import="com.hms.pharmacy.service.IndentService"%>
<%@page import="com.hms.ipdbill.dto.MultiBillReceiptMasterDTO"%>
<%@page import="com.hms.ehat.dto.PharmacyDetailsOnBillingPrintDto"%>
<%@page import="com.hms.ipdbill.controller.BillController"%>
<%@page import="com.hms.ehat.service.FinanceService"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.model.ChannelingModel"%>
<%@page import="com.hms.dto.Chanelling_doctor"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.ipdbill.dto.IpdBillDiscount"%>
<%@page import="com.hms.ipdbill.dto.IpdBillReceiptMasterDTO"%>
<%@page import="com.hms.ehat.service.CommonadvService"%>
<%@page import="com.hms.ehat.dto.CommonadvDto"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientSubServiceDetailsIpdDto"%>
<%@page import="com.hms.ehat.dto.BillNobleServiceDto"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientServiceDetailIpdDto"%>
<%@page import="com.hms.ipdbill.service.IpdBillService"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.ehat.dto.DoctorDto"%>
<%@page import="com.hms.ehat.controller.MarkVisitController"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.hisab.model.HisabModel"%>
<%@page import="com.hms.ipdbill.dto.BillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.serviceImpl.BillServiceImpl"%>
<%@page import="com.hms.ipdbill.service.BillService"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%@ page import="com.hms.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.dto.RadiationMaster"%>
<%@ page import="com.hms.model.AdminModel"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@ page import="com.hms.ehat.dto.CurrencyTypeDto"%>
<%@page import="com.hms.dto.Hall"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
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
		CurrencyTypeService fetchOneCurrency=(ApplicationContextUtils.getApplicationContext()).getBean(CurrencyTypeService.class);
		List<CurrencyTypeDto> listServiceCurrencyDto=fetchOneCurrency.getOneCurrencyList();
		String currencyCode=listServiceCurrencyDto.get(0).getCurrencyCode();
		String currencyName=listServiceCurrencyDto.get(0).getCurrencyName();
		
		List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails.getHospDetails("0");
		HospitalDetails hospObj = arrHospitalDetails.get(0);

		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		
		Document document = new Document(PageSize.A4);
		document.setMargins(20, 20, 20, 50);

		PdfWriter.getInstance(document, outStream);		
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
		
		session = request.getSession();
		String user_name = (String) session.getAttribute("userName");
		
		String path = hospObj.getFilePath();
		String hospitalName = hospObj.getHospitalName();
		//hospitalName = hospitalName.toUpperCase();			
		String address = hospObj.getHospitalAddress();
		String city = hospObj.getHospitalCity();
		String contact = hospObj.getHospitalContact();
		String path1 = application.getRealPath(path);
		
		String hospitalZip = hospObj.getHospitalZip(); 			
		String PhoneNo   =  hospObj.getHospitalContact();
		String secPhoneNo   =  hospObj.getSecPNo();
		String webste     =   hospObj.getWebsite();
		String email      =   hospObj.getHospitalEmail();
		String cinNo	  =   hospObj.getTxtCinNo();
		String gstNo =  hospObj.getTxtGstNo();
		String serviceTaxNo	  =   hospObj.getTxtSerTaxNo();
		String panNo	  =   hospObj.getPanNo();
		String hPhoneNo   = PhoneNo+"/"+secPhoneNo;
		String nabh = hospObj.getNabhImagePath(); 
		String nabhLogo = application.getRealPath(nabh);
		
		Image img = null;
		PdfPCell cell = null;
		try {
			img = Image.getInstance(path1);
			img.scaleAbsolute(100, 60);
			cell = new PdfPCell();
			cell.addElement(new Chunk(img, 5, -5));
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
			cellNabh.addElement(new Chunk(imgNabh, 5, -5));
			cellNabh.setBorder(Rectangle.NO_BORDER);
		} catch (Exception e) {
			e.printStackTrace();
		}  
					
		//int billId=0;
		int patId=Integer.parseInt(request.getParameter("patId"));
		int treatmentId=Integer.parseInt(request.getParameter("treatId"));
		int billTypeId=Integer.parseInt(request.getParameter("billTypeId"));
		String receiptOf=request.getParameter("receiptOf");
		String sponId=request.getParameter("chargesSlaveId");
		String finalbillIs=request.getParameter("finalbillIs");		
		int recId=0;
		Double finalRefundable=Double.parseDouble(request.getParameter("finalRefundable"));
				
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
		String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");   
		String pharmacy_Serve_Id = (String)resourceBundleEhat.getString("pharmacy");    
		int pharmacyInvoiceId = Integer.parseInt(pharmacy_Invoice);
		int pharmacyServId = Integer.parseInt(pharmacy_Serve_Id);
		
		ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");									 	
	 	String shraddha = resourceBundleEha.getObject("shraddha").toString();
	 	
	 	//for centerpatientId
	    String patientId= resourceBundleEha.getObject("patientIdLabel").toString();	
	 	
	 	ResourceBundle resourceBundleEha1 = ResourceBundle.getBundle("hospitalaccess");									 	
	 	String hospitalname = resourceBundleEha1.getObject("hospitalname").toString();
				
		//calling service leyer method to get patient records
		RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
		List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
		ltRegMasterDto = us.fetchPatientsRecordByTreatmentId(treatmentId);
		
		Integer billId =ltRegMasterDto.get(0).getBillId();
		Integer PatientID=ltRegMasterDto.get(0).getPatientId();
		Integer departmentId=ltRegMasterDto.get(0).getDepartmentId();
		String pname  =ltRegMasterDto.get(0).getPatientName();
		String MRNo   =ltRegMasterDto.get(0).getMrnno();
		String age	  =ltRegMasterDto.get(0).getAge();
		String gender =ltRegMasterDto.get(0).getGender();
		String AgeSexWt=age+" /"+gender;
		String treatmentCount =ltRegMasterDto.get(0).getTrcount();
		String ContactNo =ltRegMasterDto.get(0).getMobile();
		int Departmentid =ltRegMasterDto.get(0).getDepartmentId();
		String TokenNo   =ltRegMasterDto.get(0).getTokenno();
		Date appDate   =ltRegMasterDto.get(0).getCreatedDateTime();
		String opdipdno =ltRegMasterDto.get(0).getOpdipdno();
		String weight  	=ltRegMasterDto.get(0).getWeight();
		String height  	=ltRegMasterDto.get(0).getHeight();
		String wetHeg   =weight+" /"+height;
		String Age = ltRegMasterDto.get(0).getAge();
		String Gender = ltRegMasterDto.get(0).getGender();
		String allInfo = Age+"/"+Gender+"/"+weight;
		String MrNo = ltRegMasterDto.get(0).getMrnno();
		String contactNo = ltRegMasterDto.get(0).getMobile();
		String docId=ltRegMasterDto.get(0).getDoctorId();
		String docName="";		
		int refDocId =ltRegMasterDto.get(0).getRefDocId();

		int count=0;
			
		int stateId = ltRegMasterDto.get(0).getStateId();
		int townId   =ltRegMasterDto.get(0).getTownId();
		int districtId =ltRegMasterDto.get(0).getDistrictId();
		int talukaId   =ltRegMasterDto.get(0).getTalukaId();
		int sponsorSlave=ltRegMasterDto.get(0).getChargesMasterSlaveId();
		 
		String BillCategoryName ="";
		String state  ="";
		String district  ="";
		String cityObj  ="";
		String taluka  ="";
		String disDate ="";
		String disTime ="";
		 
	    String perPatientAdd ="";
		String patientAdd ="";
		String relativeName ="";
		int relationId=0;
		String relation="";
		relationId= ltRegMasterDto.get(0).getRelationId();
		patientAdd = ltRegMasterDto.get(0).getAddress();
		perPatientAdd = ltRegMasterDto.get(0).getPerAddress();
		relativeName = ltRegMasterDto.get(0).getRelativeName();
		int perstateId = ltRegMasterDto.get(0).getPerstateId();
		int pertownId   =ltRegMasterDto.get(0).getPertownId();
		int perdistrictId =ltRegMasterDto.get(0).getPerdistrictId();
		int pertalukaId   =ltRegMasterDto.get(0).getPertalukaId();
		 
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
		 
		String perstate  ="";
		String perdistrict  ="";
		String percityObj  ="";
		String pertaluka  ="";
		 
		LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
		AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
		List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
		
		String spLeafName="";
		String refDocName  ="";

		if(sponsorSlave > 0){
			
			fetchsposor   = obj.fetchSuperCatofchargesSlave(sponsorSlave);
			if(fetchsposor.size() > 0 ){
				
				BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
			}else{
				
				BillCategoryName = " Sponsor";
			}
			spLeafName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id");
			 
		}else{
			BillCategoryName = "Self";
		}		
		
		if(stateId > 0 ){
			state   = fetchlist.getStringValOfObject("state","state_name",stateId,"idstate");
		}else{
			state   = "";
		}
		if(districtId > 0){
			district = fetchlist.getStringValOfObject("district","dis_name",districtId,"iddistrict"); 
		}else{
			district   = "";
		}
		
		if(townId > 0){
			cityObj = fetchlist.getStringValOfObject("city","city_name",townId,"idcity");
		}else{
			cityObj   = "";
		}
		
		if(talukaId > 0){
			taluka  = fetchlist.getStringValOfObject("taluka","taluka_name",talukaId,"idtaluka"); 
		}else{
			taluka   = "";
		}	
		
		if(perstateId > 0 ){
		 	perstate   = fetchlist.getStringValOfObject("state","state_name",perstateId,"idstate");
		}else{
			//perstate   = "Maharashtra";
		}
		
		if(perdistrictId > 0){
			perdistrict = fetchlist.getStringValOfObject("district","dis_name",perdistrictId,"iddistrict"); 
		}else{
			//perdistrict   = "Pune";
		}
		
		if(pertownId > 0){
			percityObj = fetchlist.getStringValOfObject("city","city_name",pertownId,"idcity");
		}else{
			percityObj   = "";
		}
		
		if(pertalukaId > 0){
			pertaluka  = fetchlist.getStringValOfObject("taluka","taluka_name",pertalukaId,"idtaluka"); 
		}else{
			pertaluka   = "";
		}	
		
		if(refDocId > 0 ){
			refDocName   = fetchlist.getStringValOfObject("doctor","doc_name",refDocId,"Doctor_ID");
		}else{
			refDocName   = "";
		}
		
		HisabModel hm=new HisabModel();
		List<BillReceiptMasterDTO> lstPojo = new ArrayList<BillReceiptMasterDTO>();
		String callFrom="ipdSummary";
		lstPojo=hm.getOpdRecDetails(billId, treatmentId, patId, recId, callFrom);
		NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");		
		DecimalFormat df2 = new DecimalFormat("0.00");
		
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
			
		AdminModel adminModel = new AdminModel();
		int printId = 2;
		int numOfPrint = adminModel.generalAccessNumOfPrint(printId);// to get number of prints

		// Table 1 : For hospital adress details start		
		PdfPTable HeaderTable1 = new PdfPTable(3);
		int[] headerwidth1 = { 30, 80, 20 };
		HeaderTable1.setWidths(headerwidth1);
		HeaderTable1.setWidthPercentage(95f);
		HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
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
		HeaderTable1.flushContent();

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
		p.add(new Chunk(" "+city+" Pin- "+hospitalZip, tabletext));
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
		
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		
		document.add(HeaderTable1);
		HeaderTable1.flushContent();
		
		HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		document.add(HeaderTable1);
		HeaderTable1.flushContent();			
		// Table 1 : For hospital adress details end
				
		IpdBillService fetchServlist=(ApplicationContextUtils.getApplicationContext()).getBean(IpdBillService.class);	
		CommonadvService cs = (ApplicationContextUtils.getApplicationContext()).getBean(CommonadvService.class);
		
		List<EhatViewPatientServiceDetailIpdDto> listServiceIpdDto=fetchServlist.getIpdPatientServiceListFromView(treatmentId,"openTreatment",request);
		List<EhatViewPatientSubServiceDetailsIpdDto> listSubServiceIpdDto = new ArrayList<EhatViewPatientSubServiceDetailsIpdDto>();
				
		// For consulting doctors start
		listSubServiceIpdDto = fetchServlist.getPatientServiceBill(treatmentId,2);
		
		String drIds=ltRegMasterDto.get(0).getDoctorId();
		String drId="";
		String docNames="";
		
		if(!drIds.equals("") && drIds!=null){
			
			if(drIds.contains(",")){
				
				String[] dId=drIds.split(",");
				if(dId.length > 0){
					
					for(int n=0; n < dId.length; n++){
						
						docNames=docNames + fetchlist.getStringValOfObject("doctor","doc_name",Integer.parseInt(dId[n]),"Doctor_ID")+", ";
					}		
				}				
				docNames=docNames.substring(0, docNames.length()-2);
				
			}else{
				
				drId=drIds;
				docNames=docNames + fetchlist.getStringValOfObject("doctor","doc_name",Integer.parseInt(drId),"Doctor_ID");
			}			
		}		
		// For consulting doctors end
		
		// For ref doc start
		ChannelingModel objChannelingModel = new ChannelingModel();		
		List<Chanelling_doctor> arrChanelling_doctor = new ArrayList<Chanelling_doctor>();
		arrChanelling_doctor=objChannelingModel.getRefDoctors();
		String refDrName="";
		int refDrId=ltRegMasterDto.get(0).getRefDocId();
		for(Chanelling_doctor objRef : arrChanelling_doctor){
			
			if(refDrId==objRef.getChannDocId()){
				
				refDrName=objRef.getDocName();
			}
		}	
		// For ref doc end
		
		List<IpdBillDiscount> lstIpdBill=fetchServlist.fetchIpdbillTreatDiscount(treatmentId);
		double totDisc=0;
		if(lstIpdBill.size() >0){
			
			for(int i=0;i<lstIpdBill.size();i++){
				
				if(lstIpdBill.get(i).getApprovedStat().equals("Y")){
					
					totDisc=totDisc+lstIpdBill.get(i).getApprovedAmt();
				}						
			}
		}
					
		List<CommonadvDto> lstCommonadv=cs.getCommonadv(treatmentId,"opdBill",request);
		
		int userId= (Integer)session.getAttribute("userId1");
		
		IpdBillReceiptMasterDTO ipdObj=new IpdBillReceiptMasterDTO();
		ipdObj.setBillId(billId);
		ipdObj.setTreatmentId(treatmentId);
		ipdObj.setReceiptOf("general");
		ipdObj.setCreatedBy(userId);
		IpdBillReceiptMasterDTO obj2=fetchServlist.getBillReceiptDetailsIpd(ipdObj,"all");
		
		double cmAdvc=0;
		double totPaid=0;
		if(lstCommonadv != null && lstCommonadv.size()>0){
			
			cmAdvc = lstCommonadv.get(0).getRemaining_amnt();
		}else{
			
			cmAdvc=0;
		} 
		
		if(obj2.getListBillReceiptMaster().size()>0){
			
			for(int i=0;i< obj2.getListBillReceiptMaster().size();i++){
				
				totPaid=totPaid+obj2.getListBillReceiptMaster().get(i).getTotalPaid();
			}			
			
		}else{
			
			totPaid=0;
		}
					
		BillNobleService fetchSubServlist=(ApplicationContextUtils.getApplicationContext()).getBean(BillNobleService.class);			
		List<EhatViewPatientBedDetailsIpdDto> listBedIpdDto2=fetchServlist.getPatientBedBill(treatmentId,3);
		
		// Table 2 : For receipt head start		
		PdfPTable HeaderTable2 = new PdfPTable(5);
		int[] headerwidth2 = { 15, 24, 50, 9, 20 };
		HeaderTable2.setWidths(headerwidth2);
		HeaderTable2.setWidthPercentage(95f);
		HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
		HeaderTable2.addCell(new Phrase("", subheader));
		PdfPCell subcell = new PdfPCell(new Phrase("",subheader));
		subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
		subcell.setBorder(Rectangle.BOTTOM);
		HeaderTable2.addCell(subcell);
		if(finalbillIs.equals("finalBill"))
		{
			if(hospitalname.equalsIgnoreCase("vatsalya"))
			{
			
			HeaderTable2.addCell(new Phrase("FINAL INVOICE ", header));
			}
			else
			{
				HeaderTable2.addCell(new Phrase("GENERAL DETAILED INVOICE(FINAL BILL) ", header));
			}
			
		}
		
		else {
			
			if(hospitalname.equalsIgnoreCase("vatsalya"))
			{
			
			HeaderTable2.addCell(new Phrase("INTERIM BILL", header));
			}
			else
			{
			HeaderTable2.addCell(new Phrase("       GENERAL DETAILED INVOICE ", header));
			}
		}
		
		
		HeaderTable2.addCell(new Phrase("", subheader));
		HeaderTable2.addCell(new Phrase("", subheader));
		document.add(HeaderTable2);
		HeaderTable2.flushContent();		
		// Table 2 : For receipt head end
		
		RegistrationController regCon=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
        RegTreBillDto rtd = new RegTreBillDto();            
        List<RegTreBillDto> ltPatientRecord = null;
        String PType = "";
        Date admDateTime=new Date();
        if(regCon != null){
           
        	rtd=regCon.fetchPatientsRecordByTreatmentId(treatmentId);
            rtd=rtd.getListRegTreBillDto().get(0);
            rtd.getPatientName();
            
            admDateTime = rtd.getCreatedDateTime();
            
            int a=rtd.getSourceTypeId();
            if(a>0){
                PType="Sponsor";
            }else{
                PType="Self";                 
            }   
        }			
       
     	//For Get Hall Name
		RegService regSer=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
		List<Hall> hallName = new ArrayList<Hall>();
		hallName = regSer.fetchPatientsBedRecords(treatmentId);
        
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm a");
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
			
			/* if(finalbillIs.equals("finalBill")){ */
				
				DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");   
	        	Date date1 = dateFormat.parse(rtd.getDischargeDate());        	
	        	Date dsDate = new Date(date1.getTime());
	        	disDate=sdf.format(dsDate);
	        	
	        	DateFormat timeFormat = new SimpleDateFormat("HH:mm");   
	        	Date time1 = timeFormat.parse(rtd.getDischargeTime()); 
	        	disTime=sdf2.format(time1);
			/* }else{ 
				
				disDate="-";
				disTime="-";
			} */		 			
		}
		
        // Table3 : For patient header info start       
        PdfPTable HeaderTable3 = new PdfPTable(4);
		int[] headerwidth3 = { 30, 50, 30, 50 };
		HeaderTable3.setWidths(headerwidth3);
		HeaderTable3.setWidthPercentage(95f);
		HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		int finalBillId = 0;
		if(finalbillIs.equals("finalBill") || finalbillIs.equals("null")){
			
			finalBillId = rtd.getInvoiceCount();
		}else{
			
			finalBillId = billId;
		}
		
		if(finalbillIs.equals("finalBill")){
			
			/* HeaderTable3.addCell(new Phrase("Patient Id",subheader));
			HeaderTable3.addCell(new Phrase(" : "+PatientID,tabletext)); 
			 */
			HeaderTable3.addCell(new Phrase(" "+patientId,subheader));
			HeaderTable3.addCell(new Phrase(" : "+rtd.getCenterPatientId(),tabletext));
			 
			HeaderTable3.addCell(new Phrase("Bill No. ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+finalBillId,tabletext)); 
			
			
			HeaderTable3.addCell(new Phrase("Patient Name ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+pname,	tabletext));
			HeaderTable3.addCell(new Phrase("Bill Date ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+strDate,tabletext));
			
			
			HeaderTable3.addCell(new Phrase("Contact No",subheader));
			HeaderTable3.addCell(new Phrase(" : "+contactNo,tabletext));	            
			HeaderTable3.addCell(new Phrase("Bill Time ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+rtime,tabletext));
			
			
			
			HeaderTable3.addCell(new Phrase("Res. Address ",	subheader));		
			HeaderTable3.addCell(new Phrase(" : "+patientAdd+" "+ addressPatient, tabletext));
			
			if(per_patient_address != null && perPatientAdd !=null && !perPatientAdd.equalsIgnoreCase("") || !per_patient_address.equalsIgnoreCase("") && !per_patient_address.equalsIgnoreCase(null) && !per_patient_address.equals("undefined"))
			{
				HeaderTable3.addCell(new Phrase("Per. Address ",	subheader));		
				HeaderTable3.addCell(new Phrase(" : "+perPatientAdd+" "+ per_patient_address, tabletext));
			}else{
				HeaderTable3.addCell(new Phrase("Per. Address ",	subheader));		
				HeaderTable3.addCell(new Phrase(" : ", tabletext));
			}
		
			if(relativeName != null && relativeName !="" && relativeName!="undefined")
			{
				HeaderTable3.addCell(new Phrase("Relative Name ", subheader));
				HeaderTable3.addCell(new Phrase(" : "+relation+"-"+relativeName, tabletext));
			} else{
				HeaderTable3.addCell(new Phrase("Relative Name ", subheader));
				HeaderTable3.addCell(new Phrase(" : ", tabletext));
			}
			 
			HeaderTable3.addCell(new Phrase("Consultant ",	subheader));		
			HeaderTable3.addCell(new Phrase(" : "+docNames, tabletext));
			
			HeaderTable3.addCell(new Phrase("Admission Date & Time ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+admDate+" "+admTime, tabletext));
			
			HeaderTable3.addCell(new Phrase("IPD No ",subheader));
			HeaderTable3.addCell(new Phrase(" : " +opdipdno , tabletext));	
			
			HeaderTable3.addCell(new Phrase("Age/Gender/Wt ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+allInfo,tabletext));
			
			HeaderTable3.addCell(new Phrase("Ward ",subheader));
			HeaderTable3.addCell(new Phrase(": "+hallName.get(0).getHname(),tabletext));
			
			
			
			if(spLeafName==null || spLeafName=="" || spLeafName.equalsIgnoreCase("")){
			}else{
				HeaderTable3.addCell(new Phrase("Sponsor",	subheader));		
				HeaderTable3.addCell(new Phrase(" : "+spLeafName, tabletext));
			}
			
			HeaderTable3.addCell(new Phrase(" ",subheader));
			HeaderTable3.addCell(new Phrase(" ",tabletext));
						
			if(disDate== null || disDate==""|| disDate=="-"){
			
				HeaderTable3.addCell(new Phrase("Discharge Date & Time ",subheader));
				HeaderTable3.addCell(new Phrase(" : -",tabletext));
			}else{
				HeaderTable3.addCell(new Phrase("Discharge Date & Time ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+disDate+" "+disTime,tabletext));
			}		
			
			HeaderTable3.addCell(new Phrase("",subheader));
			HeaderTable3.addCell(new Phrase("" ,tabletext));
			
			HeaderTable3.addCell(new Phrase(" ",subheader));
			HeaderTable3.addCell(new Phrase(" ", tabletext));
			
			//Start Dept
	        AdminModel admodel1 = new AdminModel();
			Doctor doc2 = new Doctor();
			List<Doctor> listDoc2 = null;

			if(rtd.getDoctorId().contains(",")){
				String[] doctors = rtd.getDoctorId().split(",") ;
				String Doc_Nme = "";
				String Depart = "";
				for(String str :doctors )
				{
					String DocID = str;
					int docId1 =  Integer.parseInt(str);
					listDoc2 = admodel1.getDoctorsDepDetails(docId1);
					Doc_Nme = Doc_Nme + listDoc2.get(0).getDoc_name()+",";
					Depart = Depart + listDoc2.get(0).getDepartmentName()+",";					
				}
				HeaderTable3.addCell(new Phrase("", subheader));
				HeaderTable3.addCell(new Phrase("", tabletext));		
			}
			else{
				if(!rtd.getDoctorId().equalsIgnoreCase("")){
					int docId1 =  Integer.parseInt(rtd.getDoctorId());
					listDoc2 = admodel1.getDoctorsDepDetails(docId1);
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase(" ", tabletext));			
				}
			}
	        //End Dept
	        
		}else{
			/* HeaderTable3.addCell(new Phrase("Patient Id",subheader));
			HeaderTable3.addCell(new Phrase(" : "+PatientID,tabletext));  */
			
			HeaderTable3.addCell(new Phrase(" "+patientId,subheader));
			HeaderTable3.addCell(new Phrase(" : "+rtd.getCenterPatientId(),tabletext));
			HeaderTable3.addCell(new Phrase("Bill No. ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+finalBillId,tabletext)); 
			
			
			HeaderTable3.addCell(new Phrase("Patient Name ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+pname,	tabletext));
			HeaderTable3.addCell(new Phrase("Bill Date ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+strDate,tabletext));
			
			
			HeaderTable3.addCell(new Phrase("Contact No",subheader));
			HeaderTable3.addCell(new Phrase(" : "+contactNo,tabletext));	            
			HeaderTable3.addCell(new Phrase("Bill Time ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+rtime,tabletext));
			
			
			
			HeaderTable3.addCell(new Phrase("Res. Address ",	subheader));		
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
			HeaderTable3.addCell(new Phrase(" : "+docNames, tabletext));
			
			HeaderTable3.addCell(new Phrase("Admission Date & Time ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+admDate+" "+admTime, tabletext));
			
			HeaderTable3.addCell(new Phrase("IPD No ",subheader));
			HeaderTable3.addCell(new Phrase(" : " +opdipdno , tabletext));	
			
			HeaderTable3.addCell(new Phrase("Age/Gender/Wt ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+allInfo,tabletext));
			
			HeaderTable3.addCell(new Phrase("Ward ",subheader));
			HeaderTable3.addCell(new Phrase(": "+hallName.get(0).getHname(),tabletext));
			
			
			
			if(spLeafName==null || spLeafName=="" || spLeafName.equalsIgnoreCase("")){
			}else{
				HeaderTable3.addCell(new Phrase("Sponsor",	subheader));		
				HeaderTable3.addCell(new Phrase(" : "+spLeafName, tabletext));
			}
			
			HeaderTable3.addCell(new Phrase(" ",subheader));
			HeaderTable3.addCell(new Phrase(" ",tabletext));
						
			if(disDate== null || disDate==""|| disDate=="-"){			
				HeaderTable3.addCell(new Phrase("Discharge Date & Time ",subheader));
				HeaderTable3.addCell(new Phrase(" : -",tabletext));
			}else{
				HeaderTable3.addCell(new Phrase("Discharge Date & Time ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+disDate+" "+disTime,tabletext));
			}
			
			HeaderTable3.addCell(new Phrase("",subheader));
			HeaderTable3.addCell(new Phrase("" ,tabletext));
			
			HeaderTable3.addCell(new Phrase(" ",subheader));
			HeaderTable3.addCell(new Phrase(" ", tabletext));
			
			HeaderTable3.addCell(new Phrase("",subheader));
			HeaderTable3.addCell(new Phrase("", tabletext));
			//Start Dept
	        AdminModel admodel1 = new AdminModel();
			Doctor doc2 = new Doctor();
			List<Doctor> listDoc2 = null;

			if(rtd.getDoctorId().contains(",")){
				String[] doctors = rtd.getDoctorId().split(",") ;
				String Doc_Nme = "";
				String Depart = "";
				for(String str :doctors){
					String DocID = str;
					int docId1 =  Integer.parseInt(str);
					listDoc2 = admodel1.getDoctorsDepDetails(docId1);
					 Doc_Nme = Doc_Nme + listDoc2.get(0).getDoc_name()+",";
					 Depart = Depart + listDoc2.get(0).getDepartmentName()+",";
				}
				HeaderTable3.addCell(new Phrase("", subheader));
				HeaderTable3.addCell(new Phrase("", tabletext));
			}
			else{
				if(!rtd.getDoctorId().equalsIgnoreCase("")){
					int docId1 =  Integer.parseInt(rtd.getDoctorId());
					listDoc2 = admodel1.getDoctorsDepDetails(docId1);
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase(" ", tabletext));				
				}
			}
	        //End Dept	        
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
				
		PdfPTable HeaderTable5 = new PdfPTable(7);
		int[] headerwidth5 = { 10, 60, 15, 20, 15, 20, 25 };
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
				
		HeaderTable5.addCell(new Phrase("#", subheader));		
		HeaderTable5.addCell(new Phrase("Perticular", subheader));	
		HeaderTable5.addCell(new Phrase("Date", subheader));	
		HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
		HeaderTable5.addCell(new Phrase("Rate ("+currencyCode+")", subheader));		
		HeaderTable5.addCell(new Phrase("Qty", subheader));		
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
		Date servDate;
			
		for (int i = 0; i < listServiceIpdDto.size(); i++) {
			
			double totAmt=0;
			int serId=listServiceIpdDto.get(i).getServiceId();
			String sevName=listServiceIpdDto.get(i).getServiceName();
			
			servDate = listServiceIpdDto.get(i).getCreatedDate();
				
			if(serId==1){
				
				if(PType.equals("Sponsor")){
					
					totAmt=listServiceIpdDto.get(i).getOtherAmount();
				}else{
					
					totAmt=listServiceIpdDto.get(i).getAmount();
				}
				
				if(totAmt != 0 ){
					HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);	
					HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);					
					HeaderTable5.addCell(new Phrase(""+(++countItem),subheader));
					HeaderTable5.addCell(new Phrase(""+sevName.toUpperCase(),subheader));
					HeaderTable5.addCell(new Phrase(""+servDate,tabletext));
					HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
					HeaderTable5.addCell(new Phrase(""+df2.format(totAmt),tabletext));
					HeaderTable5.addCell(new Phrase("1.00",tabletext));
					HeaderTable5.addCell(new Phrase(""+df2.format(totAmt),tabletext));
					HeaderTable5.addCell(new Phrase(""+df2.format(totAmt),subheader));
					
					document.add(HeaderTable5);
					HeaderTable5.flushContent();
				}		
			}		
		}			
				
		for (int i = 0; i < listServiceIpdDto.size(); i++) {
			
			double totAmt=0;
			int serId=listServiceIpdDto.get(i).getServiceId();
					
			 if(serId==3){
				
				String sevName=listServiceIpdDto.get(i).getServiceName();	
				 
				List<EhatViewPatientBedDetailsIpdDto> listBedIpdDto=fetchServlist.getPatientBedBill(treatmentId,serId);
				double HtotAmt=0;
				double HNurtotAmt=0;
				for (int k = 0; k < listBedIpdDto.size(); k++) {
					
					if(listBedIpdDto.get(k).getCancle().equals("N") && listBedIpdDto.get(k).getPaidByCashFlag().equals("N")){
						
						double Hamt  = 0;
						if(listBedIpdDto.get(k).getSubServiceId()!=0){
							
							if(PType.equals("Sponsor")){
								
								Hamt= listBedIpdDto.get(k).getOtherAmount();
							}else{
							
								Hamt= listBedIpdDto.get(k).getAmount();
							}
							
							HtotAmt=HtotAmt+Hamt;
						}						
					}									
				}
				
				for (int k = 0; k < listBedIpdDto.size(); k++) {
					
					if(listBedIpdDto.get(k).getCancle().equals("N") && listBedIpdDto.get(k).getPaidByCashFlag().equals("N")){
												
						double Hamt  = 0;
						if(listBedIpdDto.get(k).getSubServiceId()==0){
							
							if(PType.equals("Sponsor")){
								
								Hamt= listBedIpdDto.get(k).getOtherAmount();
							}else{
							
								Hamt= listBedIpdDto.get(k).getAmount();
							}
							
							HNurtotAmt=HNurtotAmt+Hamt;
						}	
					}							
				}
				
				if(HtotAmt != 0){
					HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);	
					HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);					
					HeaderTable5.addCell(new Phrase(""+(++countItem),subheader));
					HeaderTable5.addCell(new Phrase(""+sevName.toUpperCase(),subheader));
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.addCell(new Phrase("",subheader));					
					
					document.add(HeaderTable5);
					HeaderTable5.flushContent();
				}				
											
				for (int k = 0; k < listBedIpdDto.size(); k++) {
													
					if(listBedIpdDto.get(k).getCancle().equals("N") && listBedIpdDto.get(k).getPaidByCashFlag().equals("N")){
					
						if(listBedIpdDto.get(k).getSubServiceId()!=0){
							
							String subServName = listBedIpdDto.get(k).gethName();
							String nurse="";
							servDate = listBedIpdDto.get(k).getBedDate();
							if((k%2)!=0){
								if(shraddha.equalsIgnoreCase("on")){
									subServName="Medication Charges : "+listBedIpdDto.get(k-1).gethName();
								}else{
									subServName="Nursing Charges : "+listBedIpdDto.get(k-1).gethName();
								}								
							}
							
							double rate = 0;
							double qty  = 0;
							double amt  = 0;
							
							if(PType.equals("Sponsor")){
								
								rate= listBedIpdDto.get(k).getOtherRate();
								qty= listBedIpdDto.get(k).getQuantity();
								amt= listBedIpdDto.get(k).getOtherAmount();
							}else{
								
								rate= listBedIpdDto.get(k).getRate();
								qty= listBedIpdDto.get(k).getQuantity();
								amt= listBedIpdDto.get(k).getAmount();
							}
							
							totAmt=totAmt+amt;
							
							if(amt != 0){
								
								HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);					
								HeaderTable5.addCell(new Phrase("",tabletext));
								HeaderTable5.addCell(new Phrase(""+subServName.toUpperCase(),tabletext));
								HeaderTable5.addCell(new Phrase(""+servDate,tabletext));
								HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
								HeaderTable5.addCell(new Phrase(""+df2.format(rate),tabletext));
								HeaderTable5.addCell(new Phrase(""+df2.format(Math.round(qty)),tabletext));
								HeaderTable5.addCell(new Phrase(""+df2.format(qty*rate),tabletext));
								HeaderTable5.addCell(new Phrase("",tabletext));		
								
								document.add(HeaderTable5);
								HeaderTable5.flushContent();
							}													
						}					
					}				
				} 
				
				if(HtotAmt != 0){
					
					HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);	
					HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);					
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.addCell(new Phrase(""+df2.format(HtotAmt),subheader));		
					
					document.add(HeaderTable5);
					HeaderTable5.flushContent();
				}				
				
				if(HNurtotAmt != 0){
					
					String servName = "";
					if(shraddha.equalsIgnoreCase("on")){
						servName = "MEDICATION CHARGES";
					}else{
						servName = "NURSING CHARGES";
					}
					
					HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);	
					HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);					
					HeaderTable5.addCell(new Phrase(""+(++countItem),subheader));
					HeaderTable5.addCell(new Phrase(""+servName,subheader));
					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.addCell(new Phrase("",subheader));
					
					document.add(HeaderTable5);
					HeaderTable5.flushContent();
				}				
				
				for (int k = 0; k < listBedIpdDto.size(); k++) {
										
					if(listBedIpdDto.get(k).getCancle().equals("N") && listBedIpdDto.get(k).getPaidByCashFlag().equals("N")){
										
						if(listBedIpdDto.get(k).getSubServiceId()==0){
							
							String subServName = listBedIpdDto.get(k).gethName();
							String nurse="";
							servDate = listBedIpdDto.get(k).getBedDate();
							if((k%2)!=0){
								if(shraddha.equalsIgnoreCase("on")){
									subServName="Medication Charges : "+listBedIpdDto.get(k-1).gethName();
								}else{
									subServName="Nursing Charges : "+listBedIpdDto.get(k-1).gethName();
								}								
							}							
							double rate = 0;
							double qty  = 0;
							double amt  = 0;
							
							if(PType.equals("Sponsor")){
								
								rate= listBedIpdDto.get(k).getOtherRate();
								qty= listBedIpdDto.get(k).getQuantity();
								amt= listBedIpdDto.get(k).getOtherAmount();
							}else{
								
								rate= listBedIpdDto.get(k).getRate();
								qty= listBedIpdDto.get(k).getQuantity();
								amt= listBedIpdDto.get(k).getAmount();
							}
							
							totAmt=totAmt+amt;
								
							if(amt != 0){
								
								HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);					
								HeaderTable5.addCell(new Phrase("",tabletext));
								HeaderTable5.addCell(new Phrase(""+subServName.toUpperCase(),tabletext));
								HeaderTable5.addCell(new Phrase(""+servDate,tabletext));
								HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
								HeaderTable5.addCell(new Phrase(""+df2.format(rate),tabletext));
								HeaderTable5.addCell(new Phrase(""+df2.format(Math.round(qty)),tabletext));
								HeaderTable5.addCell(new Phrase(""+df2.format(qty*rate),tabletext));
								HeaderTable5.addCell(new Phrase("",tabletext));
								
								document.add(HeaderTable5);
								HeaderTable5.flushContent();
							}							
						}					
					}				
				} 	
				
				if(HNurtotAmt != 0){
					
					HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);	
					HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);					
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.addCell(new Phrase(""+df2.format(HNurtotAmt),subheader));	
					
					document.add(HeaderTable5);
					HeaderTable5.flushContent();
				}
			}			
			
			finalTot=finalTot + totAmt;
		}
			
		for (int i = 0; i < listServiceIpdDto.size(); i++) {
			
			double totAmt=0,pharmaAmt=0;
			int serId=listServiceIpdDto.get(i).getServiceId();
			String sevName=listServiceIpdDto.get(i).getServiceName();
			
			if(serId !=3 && serId !=1 && serId != pharmacyInvoiceId && serId != pharmacyServId){
									
				List<EhatViewPatientSubServiceDetailsIpdDto> listBillDetail = fetchServlist.getPatientServiceBill(treatmentId,serId);
					
				double HtotAmt=0;
				double tempAmt =0; 
				for (int k = 0; k < listBillDetail.size(); k++) {
												
					if(listBillDetail.get(k).getCancle().equals("N") && listBillDetail.get(k).getPaidByCashFlag().equals("N")){
						
						double Hamt  = 0;
						double cnamt  = 0;
						
						double rate = 0;
						double qty  = 0;
						if(serId==2){
							
							if(PType.equals("Sponsor")){
								
								rate= listBillDetail.get(k).getOtherRate();
								qty= listBillDetail.get(k).getQuantity();						
							}else{
								
								rate= listBillDetail.get(k).getRate();
								qty= listBillDetail.get(k).getQuantity();						
							}
							
							consultAmt=consultAmt+(qty*rate);			
							
						}else{
							
							if(PType.equals("Sponsor")){
								
								Hamt= listBillDetail.get(k).getOtherAmount();
							}else{
							
								Hamt= listBillDetail.get(k).getAmount();
							}
						}
								
						HtotAmt=HtotAmt+Hamt;
						consultAmt=consultAmt+cnamt;					
					}						
				}				
					
				if(serId==2){
					tempAmt = consultAmt;
				}else{
					tempAmt = HtotAmt;
				}
				
				if(tempAmt !=0){
					
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
								
					document.add(HeaderTable5);
					HeaderTable5.flushContent();
				}
				
				for (int k = 0; k < listBillDetail.size(); k++) {
													
					if(listBillDetail.get(k).getCancle().equals("N") && listBillDetail.get(k).getPaidByCashFlag().equals("N")){
					
						String subServName="";
						double rate = 0;
						double qty  = 0;
						double amt  = 0;
						servDate = listBillDetail.get(k).getServiceDate();
						
						String cghsId = "("+listBillDetail.get(k).getCghsCode()+")";
						if(cghsId.equalsIgnoreCase("") || cghsId.equalsIgnoreCase("-") || cghsId=="()" || cghsId.equalsIgnoreCase("(-)") || cghsId.equalsIgnoreCase("(null)")){
							cghsId="";
						}					
						if(cghsId.equals("null") || cghsId==null || cghsId.equals("-")){
							
							cghsId="";
						}
						
						if(PType.equals("Sponsor")){
							
							rate= listBillDetail.get(k).getOtherRate();
							qty= listBillDetail.get(k).getQuantity();
							amt= listBillDetail.get(k).getOtherAmount();
						}else{
							
							rate= listBillDetail.get(k).getRate();
							qty= listBillDetail.get(k).getQuantity();
							amt= listBillDetail.get(k).getAmount();
						}
						
						totAmt=totAmt+(qty*rate);
						
						if(serId==2){
															
							subServName="Consultation Charges  ("+listBillDetail.get(k).getDocName()+")";	
							subServName = subServName + cghsId;
							
						}if(serId==4){
							
							String docServName="";								
							if(listBillDetail.get(k).getDocId()!=null && listBillDetail.get(k).getDocId() >0){
								
								Integer docServId=listBillDetail.get(k).getDocId();													
								docServName = fetchlist.getStringValOfObject("doctor","doc_name",docServId,"Doctor_ID");									
							} 							
							if(listBillDetail.get(k).getSubServiceId()==2302){
								
								subServName = listBillDetail.get(k).getOtProcedure();	
								//subServName = subServName + cghsId;
								subServName = subServName;
								subServName=subServName +"      "+docServName;
								
							}else{
								
								subServName = listBillDetail.get(k).getCategoryName();
								//subServName = subServName + cghsId;
								subServName = subServName;
								subServName=subServName +"      "+docServName;
							}				
							
						}if(serId==5){
							
							subServName= listBillDetail.get(k).getDocName();	
							//subServName = subServName + cghsId;
							subServName = subServName;
						
						}else if (serId==14) {
							
							subServName = listBillDetail.get(k).getInventoryName();
							//subServName = subServName + cghsId;
							subServName = subServName;
						}
						else if (serId==16) {			

							subServName = listBillDetail.get(k).getPharmaName();
							//subServName = subServName + cghsId;	
							subServName = subServName;
							
						}else if (serId==15) {
							
							subServName = listBillDetail.get(k).getCategoryName();
							//subServName = subServName + cghsId;
							subServName = subServName;
							adminAmt=adminAmt+(qty*rate);
						}
						else {
							String otProcedure="";	
							otProcedure = listBillDetail.get(k).getOtProcedure();
							subServName = listBillDetail.get(k).getCategoryName();		
							
							if(otProcedure!=null){
								//subServName = subServName + cghsId +"("+otProcedure+")";
								subServName = subServName +"("+otProcedure+")";	
							}else{
								//subServName = subServName + cghsId;
								subServName = subServName;
							}
							String docServName="";
												
							if(listBillDetail.get(k).getDocId()!=null && listBillDetail.get(k).getDocId() >0){
								
								Integer docServId=listBillDetail.get(k).getDocId();													
								docServName = fetchlist.getStringValOfObject("doctor","doc_name",docServId,"Doctor_ID");									
							}							
							subServName = subServName + "        " +docServName;
						}				
						
						if(qty*rate != 0){
							
							HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);					
							HeaderTable5.addCell(new Phrase("",tabletext));
							HeaderTable5.addCell(new Phrase(""+subServName.toUpperCase(),tabletext));
							HeaderTable5.addCell(new Phrase(""+servDate,tabletext));
							HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTable5.addCell(new Phrase(""+df2.format(rate),tabletext));
							HeaderTable5.addCell(new Phrase(""+df2.format(Math.round(qty)),tabletext));
							HeaderTable5.addCell(new Phrase(""+df2.format(qty*rate),tabletext));
							HeaderTable5.addCell(new Phrase("",tabletext));
							
							document.add(HeaderTable5);
							HeaderTable5.flushContent();
						}					
					}					
				}	
				
				if(tempAmt !=0){
					
					HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);	
					HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);					
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.addCell(new Phrase(""+df2.format(tempAmt),subheader));	
							
					document.add(HeaderTable5);
					HeaderTable5.flushContent();
				}				
			}			
			finalTot=finalTot + totAmt;
		}		
		
		HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		
		document.add(HeaderTable5);
		HeaderTable5.flushContent();
		
		PdfPTable HeaderTable57 = new PdfPTable(3);
		int[] headerwidth57 = { 60, 30, 20 };
		HeaderTable57.setWidths(headerwidth57);
		HeaderTable57.setWidthPercentage(95f);
		HeaderTable57.setSpacingAfter(50f);
		
		// For get totals 
		BillService billService = (ApplicationContextUtils.getApplicationContext()).getBean(BillService.class);
		BillReceiptMasterDTO billObj=new BillReceiptMasterDTO();
		billObj.setUnitId(1);
		billObj.setCreatedBy(userId);
		billObj.setTreatmentId(treatmentId);
		billObj.setSponsorCatId(sponsorSlave);		
		BillReceiptMasterDTO resultObj=billService.fetchAllReceiptTotals(billObj,"ipd");
		
		finalTot = resultObj.getActualAmt();
		double conTot= resultObj.getActualTotConcn();
		double netAmt = finalTot - (totDisc + conTot);
		totPaid = resultObj.getTotalPaid();
		double totRefund = resultObj.getRefundAmt();	
		double setTotalSonsorAmt = resultObj.getTotalSonsorAmt();
				
		HeaderTable57.getDefaultCell().setBorder(Rectangle.BOX);		
		
		Double pharmaPaid=0.0;
		IndentService indentServ=(ApplicationContextUtils.getApplicationContext()).getBean(IndentService.class);
		if(shraddha.equalsIgnoreCase("on")){
			 		
			pharmaPaid=0.0;
		}else{
			
			pharmaPaid=indentServ.getReceiveAmountByTreatmentId(treatmentId);
		}
		
		if(pharmaPaid == 0){			
			pharmaPaid=0.0;
		}	
		
		FinanceService finServ=(ApplicationContextUtils.getApplicationContext()).getBean(FinanceService.class);	
		Double pharmaReturn=0.0;
		if(shraddha.equalsIgnoreCase("on")){
			 pharmaReturn=0.0;
		}else{			
			 pharmaReturn=finServ.getPharmaReturn(treatmentId);
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
		
		document.add(HeaderTable57);
		HeaderTable57.flushContent();		
			
		// Table4 : For page footer start
		PdfPTable HeaderTable4 = new PdfPTable(4);
		int[] headerwidth4 = { 50, 40, 40, 40 };
		HeaderTable4.setWidths(headerwidth4);
		HeaderTable4.setWidthPercentage(95f);
		HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", tabletext));
		HeaderTable4.addCell(new Phrase("", tabletext));
		HeaderTable4.addCell(new Phrase("", tabletext));

		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", tabletext));

		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", tabletext));

		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", tabletext));
				
		HeaderTable4.addCell(new Phrase("                Prepared By", subheader));
		HeaderTable4.addCell(new Phrase("Checked By", subheader));			
		HeaderTable4.addCell(new Phrase("For Hospital", subheader));
		HeaderTable4.addCell(new Phrase("Payee", subheader));

		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", subheader));
		
		document.add(HeaderTable4);
		HeaderTable4.flushContent();
		
		HeaderTable4.addCell(new Phrase("                "+ user_name, tabletext));
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", subheader));

		document.add(HeaderTable4);
		HeaderTable4.flushContent();

		HeaderTable4.addCell(new Phrase("", tabletext));
		HeaderTable4.addCell(new Phrase("", tabletext));
		HeaderTable4.addCell(new Phrase("", tabletext));
		HeaderTable4.addCell(new Phrase("", tabletext));

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