<%@page import="com.hms.ehat.dto.SASScoreDTO"%>
<%@page import="com.hms.ehat.dto.DVTScoreDTO"%>
<%@page import="com.hms.ehat.dto.MFRAScoreDTO"%>
<%@page import="com.hms.ehat.dto.VIPScoreDTO"%>
<%@page import="com.hms.ehat.dto.GlasgowComaScoreDTO"%>
<%@page import="com.hms.ehat.dto.UlcerRiskScoreDTO"%>
<%@page import="com.hms.ehat.dto.HygieneChecklistDTO"%>
<%@page import="com.hms.ehat.dto.NursingCarePlanDTO"%>
<%@page import="com.hms.ehat.dto.InvasionSiteCareDTO"%>
<%@page import="com.hms.ehat.dto.PersonalHygieneChartDTO"%>
<%@page import="com.hms.ehat.controller.NursingStationController"%>
<%@page import="com.hms.ipd.nurshing.dto.NurshingPainScaleDTO"%>
<%@page import="com.hms.ipd.nurshing.dto.NurshingCarePlanDTO"%>
<%@page import="com.hms.ipd.nurshing.dto.ChartReportDTO"%>
<%@page import="com.hms.ipd.nurshing.dto.ChartInfoDTO"%>
<%@page import="com.hms.ipd.nurshing.dto.TreatmentNurshingDTO"%>
<%@page import="com.hms.ipd.nurshing.service.TreatmentNurshingService"%>
<%@page import="com.hms.ipd.nurshing.controller.TreatmentNurshingController"%>
<%@page import="java.util.Calendar"%>
<%@page import="com.hms.TempEventHandlerIPDPDF"%>
<%@page import="com.hms.opdbill.dto.PatientHeaderInfoDto"%>
<%@page import="com.hms.ipd.service.BedMgtService"%>
<%@page import="com.hms.patient.util.OSValidator"%>
<%@page import="com.hms.administrator.service.ChannelHospitalMgmtService"%>
<%@page import="com.hms.administrator.dto.HospitalDetailsDTO"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.ehat.dto.PaymentModDto"%>
<%@page import="com.hms.ehat.service.PaymentModService"%>
<%@page import="com.hms.administrator.dto.Chanelling_doctor"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.ehat.dto.ServiceMasterDto"%>
<%@page import="com.hms.ehat.service.ServService"%>
<%@page import="com.hms.ehat.dto.BillNobleDto"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>

<%@page import="com.hms.ehat.dto.EhatBillPrefix"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.dto.DoctorDto"%>
<%@page import="com.hms.ehat.controller.MarkVisitController"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.lowagie.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.lowagie.text.html.simpleparser.StyleSheet"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.ipdbill.dto.BillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.dto.MultiBillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.serviceImpl.BillServiceImpl"%>
<%@page import="com.hms.ipdbill.service.BillService"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@ page import="com.hms.ehat.dto.CurrencyTypeDto"%>
<%@ page import="com.hms.doctordesk.controller.OPDHistoryController"%>
<%@ page import="com.hms.doctordesk.service.OPDHistoryService"%>
<%@ page import="com.hms.doctordesk.dto.OPDDietMasterDTO"%>
<%@ page import="com.hms.doctordesk.controller.OPDSxAdviceController"%>
<%@ page import="com.hms.doctordesk.service.OPDSxAdviceService"%>
<%@ page import="com.hms.doctordesk.dto.OPDChemoTheropyDTO"%>
<%@ page import="com.hms.doctordesk.dto.OPDSxAdvicedDTO"%>
<%@ page import="com.hms.doctordesk.controller.OPDHistoryController"%>
<%@ page import="com.hms.doctordesk.service.OPDHistoryService"%>
<%@ page import="com.hms.doctordesk.dto.OPDHistoryMasterDTO"%>
<%@ page import="com.hms.doctordesk.dto.OPDHistorySlaveDTO"%>
<%@ page import="com.hms.doctordesk.controller.DiagonosisController"%>
<%@ page import="com.hms.doctordesk.service.DiagonosisService"%>
<%@ page import="com.hms.doctordesk.dto.DiagonosisMasterDto"%>
<%@ page import="com.hms.doctordesk.controller.OpdServicesAdvisedController"%>
<%@ page import="com.hms.doctordesk.service.OpdServicesAdvisedService"%>
<%@ page import="com.hms.ehat.dto.CpoeServdetails"%>
<%@ page import="com.hms.doctordesk.dto.OPDRadioTheorapyMaster"%>
<%@ page import="com.hms.doctordesk.service.PrescriptionService"%>
<%@ page import="com.hms.doctordesk.dto.OPDPrescriptionDtoSP"%>
<%@ page import="com.hms.doctordesk.controller.OPDClinicalEvaluationController"%>
<%@ page import="com.hms.doctordesk.dto.OPDClinicalEvaluationDto"%>
<%@ page import="com.hms.doctordesk.service.OPDClinicalEvaluationService"%>
<%@ page import="com.hms.doctordesk.dto.OPDAllergyAlertsDto"%>
<%@ page import="com.hms.doctordesk.service.OPDClinicalStagingService"%>
<%@ page import="com.hms.doctordesk.dto.OPDClinicalStagingDTO"%>
<%@ page import="com.hms.doctordesk.dto.OPDReportInstructionDTO"%>
<%@ page import="com.hms.doctordesk.service.InstructionService"%>
<%@ page import="com.hms.doctordesk.dto.TreatmentInstruction"%>
<%@page import="com.lowagie.text.pdf.PdfGState"%>
<%@page import="com.lowagie.text.pdf.GrayColor"%>
<%@page import="com.lowagie.text.pdf.Barcode128"%>
<%@page import="com.lowagie.text.pdf.ColumnText"%>
<%@page import="com.lowagie.text.pdf.PdfContentByte"%>
<%@page import="com.lowagie.text.PageSize"%>
<%@page import="com.lowagie.text.HeaderFooter"%>

<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
	import="com.lowagie.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.lowagie.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<!DOCTYPE html>
<html>
<head>
<meta  http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>IPD Print</title>
</head>
<body>
	<%
		try {
		/* -------------------------------------- Declaration ---------------------------------------------   */
		response.setContentType("application/pdf");
		HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
		List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
		HospitalDetails hospObj = arrHospitalDetails.get(0);
		

		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		
		Document document = new Document(PageSize.A4);
		document.setMargins(20, 20, 20, 145);
		
		Font header = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font headerTitle = new Font(Font.HELVETICA, 9, Font.BOLD);
		Font headerUnderline = new Font(Font.HELVETICA, 11, Font.BOLD | Font.UNDERLINE);
		Font subheader = new Font(Font.HELVETICA, 8, Font.BOLD);
		Font footer = new Font(Font.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);
		Font tableheader22 = new Font(Font.HELVETICA, 21, Font.BOLD);
		Font tableheader11 = new Font(Font.HELVETICA, 13, Font.BOLD);
		Font tableheader111 = new Font(Font.HELVETICA, 13, Font.BOLD);
		Font tableheader12 = new Font(Font.COURIER, 13, Font.BOLD);
		Font tableheader13 = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font tableheader14 = new Font(Font.HELVETICA, 10,Font.BOLD | Font.UNDERLINE);
		Font tableheader = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font tabletext = new Font(Font.HELVETICA, 8, Font.NORMAL);
		Font tabletext7 = new Font(Font.HELVETICA, 8, Font.NORMAL);
		Font tableheader15 = new Font(Font.HELVETICA, 10, Font.NORMAL);		
		Font small = new Font(Font.HELVETICA, 8, Font.NORMAL);
		Font subheaderUNDERLINE = new Font(Font.HELVETICA, 9, Font.BOLD | Font.UNDERLINE);
		
		ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");

		/* =============================================================================== */
		/* Newly added font for the grater than and less than sign expression */
		/* =============================================================================== */
		String fontFilePath = "itext-font/Cardo-Regular.ttf";
		String fontFileRealPath = application.getRealPath(fontFilePath);
		//BaseFont bf_cjk = BaseFont.createFont("R://Airport_disha/EhatEnterprise/WebContent/itext-font/Cardo-Regular.ttf",BaseFont.IDENTITY_H,BaseFont.EMBEDDED);
		BaseFont bf_cjk = BaseFont.createFont(fontFileRealPath, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
		Font bf_cjk_font = new Font(bf_cjk, 10, Font.BOLD);
		/* =============================================================================== */
		/* =============================================================================== */
				String fontName="";
				if (OSValidator.isWindows()) {
					fontName = application.getRealPath("\\fonts\\Shivaji05.ttf");//System.getProperty("jboss.server.data.dir") + "\\patImages\\";
				} else if (OSValidator.isMac()) {
					System.out.println("This is Mac");
				} else if (OSValidator.isUnix()) {
					fontName = application.getRealPath("/fonts/Shivaji05.ttf");//System.getProperty("jboss.server.data.dir") + "/patImages/";
				} else if (OSValidator.isSolaris()) {
					System.out.println("This is Solaris");
				} else {
					System.out.println("Your OS is not support!!");
				}
				//String fontName= "E://S2 Data//MAHAHMIS DATA//MAHAHMIS_WORKSPACE_16-06-2022//mahait//MAHAHIMS01//src//main//webapp//fonts//Shivaji05.ttf";  
				System.out.println("fontName======"+fontName);
				com.lowagie.text.FontFactory.register(fontName);
		
		String billPrint = (String) resource.getObject("billPrint").toString();
		String subobjWithComplaintAndFinding ="off";
		ResourceBundle resourceBundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalname = (String) resourceBundle.getObject("hospitalname").toString();
		//for centerpatientId
	    String patientId= resource.getObject("patientIdLabel").toString();
		
	    int patId=Integer.parseInt(request.getParameter("pid"));
		Integer treatmentId=Integer.parseInt(request.getParameter("tid"));
		//int recId=Integer.parseInt(request.getParameter("recId"));
		String  languageOF=request.getParameter("instructionLanguage");
		String  CallFromOPD=request.getParameter("CallFrom");
		int unitId=1;//Integer.parseInt(request.getParameter("unitId"));
		//String chemoDate=request.getParameter("chemoDate");
		String treat = request.getParameter("tid"); 
		//calling service leyer method to get patient records
		RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
		List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
		ltRegMasterDto =us.fetchPatientsRecordByTreatmentId(treatmentId);
						
		Integer departmentId=ltRegMasterDto.get(0).getDepartmentId();
		String pname  =ltRegMasterDto.get(0).getPatientName();
		String MRNo   =ltRegMasterDto.get(0).getMrnno();
		String age	  =ltRegMasterDto.get(0).getAge();
		String gender =ltRegMasterDto.get(0).getGender();
		
		Image img = null;
		PdfPCell cell = null;
		Image imgFQRcode=null;
		
		
		String  fromDate=request.getParameter("fromDate");
		String  CallforPrint=request.getParameter("CallforPrint");
      

		
		String  printTitle= "IPD Nurshing Station "; //request.getParameter("printTitle");
		String  patientName=request.getParameter("patientName");
		//String idTreatment = request.getParameter("treatmentId");
		//String callFrom = request.getParameter("callFrom");
      	String headerFlag="Yes";
      
		
		HttpSession session1 = request.getSession();
		Integer userId = (Integer) session1.getAttribute("userId");
		//Integer unitId = (Integer) session1.getAttribute("uId");
		request.setAttribute("headerFlag", headerFlag);
		request.setAttribute("covide", "No");
		request.setAttribute("pageIteration", 0);
		request.setAttribute("footerAddress", "");		
		request.setAttribute("printTitle", printTitle);
		
		String printType="IPDNurshingPrint";
		request.setAttribute("printType", printType);
		//String user_name = (String) session1.getAttribute("userName");
		//Integer unitId = (Integer) session1.getAttribute("uId");
		
		request.setAttribute("treatmentId", request.getParameter("tid"));
		
		SimpleDateFormat formDate = new SimpleDateFormat("dd-MM-yyyy");
	    String strDate = formDate.format(new Date());
		//response.setHeader("Content-Disposition", "inline; filename="+pmobile+"_"+ppName+"_"+profileName+"_"+strDate+".pdf");	
		//response.setHeader("Content-Disposition", "inline; filename="+patientName+"_"+strDate+".pdf");

		PdfPTable hospitalHeader = new PdfPTable(3);
		int[] hospitalHeaderWidth = { 30, 70, 35 };
		hospitalHeader.setWidths(hospitalHeaderWidth);
		hospitalHeader.setWidthPercentage(95f);
		hospitalHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
		hospitalHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		PdfPTable headerTable = new PdfPTable(2);
		int[] headerTableWidth = { 50, 50 };
		headerTable.setWidths(headerTableWidth);
		headerTable.setWidthPercentage(95f);
		headerTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		/* -------------------------------------- End Declaration -------------------------------------------   */
		//start address 
		
				String newAge="";
				String newAge1="";
				
				/* if((age.split("Yrs")[0]).equalsIgnoreCase("0")){        
					if((age.split("M")[0]).equalsIgnoreCase("0Yrs, 0")){  
						newAge=(age.split("/")[2]);                   }
					else{                   
						newAge=(age.split("/")[1])+"/"+(age.split("/")[2]);  
			   					}          }else{
				   					newAge=age;             
				   } */
				
				String ptage="";
				if((age.split("/")[0]).equalsIgnoreCase("0Y")){ 
					if((age.split("/")[1]).equalsIgnoreCase("0M")){
						ptage=(age.split("/")[2]);                  
						}else{
							if((age.split("/")[2]).equalsIgnoreCase("0D")){
								ptage=(age.split("/")[1]); 
							}else{
								ptage=(age.split("/")[1])+"/"+(age.split("/")[2]); 
							}
						}                                 
					}else{
						
						if((age.split("/")[1]).equalsIgnoreCase("0M")){
							if((age.split("/")[2]).equalsIgnoreCase("0D")){
								ptage=age.split("/")[0];
							}else{
								ptage=age.split("/")[0]+"/"+age.split("/")[2];
							}
						}else{
							if((age.split("/")[2]).equalsIgnoreCase("0D")){
								ptage=age.split("/")[0]+"/"+age.split("/")[1];
							}else{
								ptage=age;
							}
						}
						      
					}
				
					//String AgeSexWt = age + " /" + gender;
					String AgeSexWt = ptage + " /" + gender;

					String treatmentCount = ltRegMasterDto.get(0).getTrcount();
					String ContactNo = ltRegMasterDto.get(0).getMobile();
					int Departmentid = ltRegMasterDto.get(0).getDepartmentId();
					String TokenNo = ltRegMasterDto.get(0).getTokenno();
					Date appDate = ltRegMasterDto.get(0).getCreatedDateTime();
					String opdipdno = ltRegMasterDto.get(0).getOpdipdno();
					String weight = ltRegMasterDto.get(0).getWeight();
					String height = ltRegMasterDto.get(0).getHeight();
					String wetHeg = weight + " /" + height;
					String docId = ltRegMasterDto.get(0).getDoctorId();
					String docName = "";
					int count = 0;
					String refDoc  	=ltRegMasterDto.get(0).getDocName();
					
					String[] opdno = {};
					if(opdipdno.contains("/")){
						opdno=opdipdno.split("/");
					}
					
					// patient address
					String patientAdd = "";
					String perPatientAdd = "";
					String relativeName ="";
					int relationId=0;
					String relation="";
								
					 int stateId = ltRegMasterDto.get(0).getStateId();
					 int townId   =ltRegMasterDto.get(0).getTownId();
					 int districtId =ltRegMasterDto.get(0).getDistrictId();
					 int talukaId   =ltRegMasterDto.get(0).getTalukaId();
					 
					 
					 String BillCategoryName ="";
					 String state  ="";
					 String district  ="";
					 String cityObj  ="";
					 String taluka  ="";
					 
					//For Permanent Address on 08-May-2018.
					 int perstateId = ltRegMasterDto.get(0).getPerstateId();
					 int pertownId   =ltRegMasterDto.get(0).getPertownId();
					 int perdistrictId =ltRegMasterDto.get(0).getPerdistrictId();
					 int pertalukaId   =ltRegMasterDto.get(0).getPertalukaId();
					 
					 String perstate  ="";
					 String perdistrict  ="";
					 String percityObj  ="";
					 String pertaluka  ="";
					 
		 			patientAdd=ltRegMasterDto.get(0).getAddress();
					 
					 if(ltRegMasterDto.get(0).getPerAddress()!=null){
						 perPatientAdd=ltRegMasterDto.get(0).getPerAddress();
					 }
					
					 relativeName=ltRegMasterDto.get(0).getRelativeName();
					 
					 relationId= ltRegMasterDto.get(0).getRelationId();
					 
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
					 
					LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
					AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
					List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
					
					/* if(doctorId > 0){
						Consultant   = fetchlist.getStringValOfObject("doctor","doc_name",doctorId,"Doctor_ID");
					} */			
					
					if(stateId > 0 ){
						state   = fetchlist.getStringValOfObject("state","state_name",stateId,"idstate");
					}else{
						state   = " ";
					}
					if(districtId > 0){
						district = fetchlist.getStringValOfObject("district","dis_name",districtId,"iddistrict"); 
					}else{
						district   = " ";
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
						
						
					
					
					
					String discRemark = "";
					int recCount = 0;
					int againstId = 0;
					String receiptNo = "";
					String againstNo = "";
					
					
					
					
					int len = ltRegMasterDto.get(0).getListEhatBillPrefix().size();

					for (int n = 0; n < len; n++) {

						EhatBillPrefix lst = ltRegMasterDto.get(0)
								.getListEhatBillPrefix().get(n);
						// For Patient Id
						String patntId = String.valueOf(ltRegMasterDto.get(0)
								.getPatientId());
						if (lst.getDepId() == 4) {

							String prefix = lst.getBillPrefix();
							String middle = lst.getBillMiddle();
							String sufix = lst.getBillSuffix();
							String patIdPrefix = prefix + patId + sufix;
						}
						// For Patient Id

						// For bill Id
						String billGenId = String.valueOf(ltRegMasterDto.get(0)
								.getInvoiceCount());
						if ((lst.getBillRecBoth() == 1 || lst.getBillRecBoth() == 3)) {

							String prefix = lst.getBillPrefix();
							String middle = lst.getBillMiddle();
							String sufix = lst.getBillSuffix();
							String billIdPrefix = prefix + billGenId + sufix;
						}
						// For bill Id

						// For Rec Id
						receiptNo = String.valueOf(recCount);
						if ((lst.getBillRecBoth() == 2 || lst.getBillRecBoth() == 3)) {

							String prefix = lst.getBillPrefix();
							String middle = lst.getBillMiddle();
							String sufix = lst.getBillSuffix();
							receiptNo = prefix + receiptNo + sufix;
							againstNo = prefix + againstId + sufix;
						}
						// For Rec Id

					}

					//irfan khan 11-jan-2018 multi pay mode list
					

					DecimalFormat df2 = new DecimalFormat("0.00");

					// patient address
					String addressPatient = "";
					String per_patient_address = "";
					
					/* if(a1 != "")
					{
						addressPatient = a1;
					}
					if(a2 != "" && a1 != ""){
						addressPatient += (", "+a2);
					}
					if(a1 == "" && a2!= ""){
						addressPatient = a2;
					} */
					if (cityObj != "0" && !cityObj.equals("undefined")
							&& !cityObj.equals("")) {
						addressPatient += cityObj;
					}

					if (taluka != "0" && !taluka.equals("undefined")
							&& !taluka.equals("")) {
						addressPatient += (taluka + ", ");
					}
					if (district != "0" && !district.equals("undefined")
							&& !district.equals("")) {
						addressPatient += (district + ", ");
					}
					if (state != "0" && !state.equals("undefined")
							&& !state.equals("")) {
						addressPatient += (state + " ");
					}
					// end : patient address
					
					// Strat : permanant patient address
					if(percityObj != "0" && !percityObj.equals("undefined") && !percityObj.equals("")){
						per_patient_address += percityObj;
					}
					
					if (pertaluka != "0" && !pertaluka.equals("undefined") && !pertaluka.equals("")) 
					{
						per_patient_address +=  (", "+pertaluka);
					}						
					if (perdistrict != "0" && !perdistrict.equals("undefined") && !perdistrict.equals("")) 
					{
						per_patient_address += (", " + perdistrict);
					}
					if (perstate != "0" && !perstate.equals("undefined") && !perstate.equals("")) 
					{
						per_patient_address += (", " + perstate);
					}
					// end : permanant patient address
									
								
					addressPatient=addressPatient.substring(0,addressPatient.length()-1);
					
					patientAdd =patientAdd+ ","+addressPatient;

					perPatientAdd =perPatientAdd +" "+per_patient_address;
					
					request.setAttribute("patientAdd", patientAdd);
					request.setAttribute("perPatientAdd", perPatientAdd);
					
				//end address	
				
		/* --------------------------------------All Services -------------------------------------------   */
		
		PdfWriter pdfWriter = PdfWriter.getInstance(document, outStream);			
		TempEventHandlerIPDPDF  event = new TempEventHandlerIPDPDF();
		pdfWriter.setPageEvent(event);

		String reportFooterAddress = "";//hospObj.getReportFooterAddress();
		if(reportFooterAddress.equalsIgnoreCase(null) || reportFooterAddress.equalsIgnoreCase("") || reportFooterAddress == null)
		{
			reportFooterAddress="";			
		}
		
		document.open();		
		
			int emrId = 0;
			/* String strForPat = patientObject[0].substring(0,
					patientObject[0].length()); */
			
					//String docId=ltRegMasterDto.get(0).getDoctorId();
					//ResourceBundle resource= ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
					//String billPrint = (String) resource.getObject("billPrint").toString();
					String billPrintsHeader = (String) resource.getObject("billPrintsHeader").toString();	
					String concessionFlow = (String) resource.getObject("concessionFlow").toString();	

		java.util.Calendar currentDate = Calendar.getInstance();
		SimpleDateFormat dateformatter = new SimpleDateFormat("yyyy-MM-dd hh:mm aa");
		//SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss a");
		String curr_date = dateformatter.format(currentDate.getTime());
		NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");
		
		

		PdfPTable Headertable3 = new PdfPTable(3);
		int[] HeaderWidth3 = { 0,100,0 };
		Headertable3.setWidths(HeaderWidth3);
		Headertable3.setWidthPercentage(95f);
		Headertable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);			

		PdfPTable Headertable1 = new PdfPTable(3);

			
			boolean pageflag=true;
			boolean codefbsppbss=true;

			String proname="";
			Integer proId=0;
			String pkgname = "";
			String barcodefbsppbs="";
			String fbsppbscollecteddate="";
			String fbsppbspostdate="";
			PdfContentByte canvas = pdfWriter.getDirectContentUnder();
			Barcode128 code129 = new Barcode128();
			
			for (int pro = 0; pro < 1; pro++) {

				
				request.setAttribute("pageIteration", pro);
				int[] HeaderWidth1 = { 0, 100,0 };
				Headertable1.setWidths(HeaderWidth1);
				Headertable1.setWidthPercentage(95f);
				Headertable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);   
				
				/* if(list.size() > 1){
			//document.newPage();
				}else{} */
				
				 if(pro > 0){
				 document.newPage();
				} 		

				// Table 1 : For hospital adress details start

				PdfPTable HeaderTable1 = new PdfPTable(3);
				int[] headerwidth1 = { 30, 80, 30 };
				HeaderTable1.setWidths(headerwidth1);
				HeaderTable1.setWidthPercentage(95f);
				HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
				HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				

				

				Font regular = new Font(Font.TIMES_ROMAN, 10, Font.NORMAL);
				Font bold = new Font(Font.TIMES_ROMAN, 14, Font.BOLD);
				Phrase p = new Phrase();
				
				System.err.println("CallFromOPD..."+CallFromOPD);
			

				

				// Table 1 : For hospital adress details end

				// Table 2 : For receipt head start

				PdfPTable HeaderTable2 = new PdfPTable(5);
				int[] headerwidth2 = { 15, 24, 40, 9, 20 };
				HeaderTable2.setWidths(headerwidth2);
				HeaderTable2.setWidthPercentage(95f);

				if (billPrintsHeader.contains("off")) {

					HeaderTable2.setSpacingBefore(70f);
				}

				HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				/* HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable2.addCell(new Phrase("", subheader));
				PdfPCell subcell = new PdfPCell(new Phrase("", subheader));
				subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
				subcell.setBorder(Rectangle.BOTTOM);
				HeaderTable2.addCell(subcell);
				HeaderTable2.addCell(new Phrase("    IPD print ", header));
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				document.add(HeaderTable2);
				HeaderTable2.flushContent(); */

				// Table 2 : For receipt head end

				
	 
	 
				//new table no 5 start
				BedMgtService uss = (ApplicationContextUtils.getApplicationContext()).getBean(BedMgtService.class);
				PatientHeaderInfoDto rtd = new PatientHeaderInfoDto();			
				List<RegTreBillDto> ltPatientRecord = null;
				rtd=uss.getIpdPatientHeaderInfo(treatmentId, unitId);
				rtd=rtd.getListRegTreBillDto().get(0);
				
			
				
				DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
				Date date = new Date();
				String curDate=dateFormat.format(date);
	 
	 
	 
				// Table3 : For patient header info start

				PdfPTable HeaderTable3 = new PdfPTable(4);
				int[] headerwidth3 = { 30, 50, 30, 50 };
				HeaderTable3.setWidths(headerwidth3);
				HeaderTable3.setWidthPercentage(95f);
				HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				//AdminModel admodel1 = new AdminModel();
				Doctor doc2 = new Doctor();
				List<Doctor> listDoc2 = null;
				
			
				
				
				

				PdfPTable HeaderTable51 = new PdfPTable(4);
				int[] headerwidth51 = { 15,40,15,30};
				HeaderTable51.setWidths(headerwidth51);
				HeaderTable51.setWidthPercentage(95f);		
				
				HeaderTable51.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
				HeaderTable51.addCell(new Phrase("", subheader));
				HeaderTable51.addCell(new Phrase("", subheader));
				HeaderTable51.addCell(new Phrase("", subheader));
				HeaderTable51.addCell(new Phrase("", subheader));
			
				
				PdfPTable HeaderTableSpace = new PdfPTable(1);
				int[] headerwidthSpace = {40 };
				HeaderTableSpace.setWidths(headerwidthSpace);
				HeaderTableSpace.setWidthPercentage(95f);
				HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTableSpace.setSpacingAfter(5.0f);

				
				
				HeaderTableSpace.addCell(new Phrase("", tabletext));
	  			document.add(HeaderTableSpace);
	  			HeaderTableSpace.flushContent();
			
				
				
				PdfPTable HeaderTable5 = new PdfPTable(7);
				int[] headerwidth5 = { 27, 40, 30, 10, 15, 40, 20 };
				HeaderTable5.setWidths(headerwidth5);
				HeaderTable5.setWidthPercentage(95f);
				HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

				PdfPTable HeaderTableTitle = new PdfPTable(3);
				int[] headerwidthTitle = {30,40,30};
				HeaderTableTitle.setWidths(headerwidthTitle);
				HeaderTableTitle.setWidthPercentage(95f);		
				HeaderTableTitle.getDefaultCell().setBorder(Rectangle.BOTTOM);
				
				PdfPTable HeaderTableSpacing = new PdfPTable(1);
				int[] headerwidthSpacing = {100};
				HeaderTableSpacing.setWidths(headerwidthSpacing);
				HeaderTableSpacing.setWidthPercentage(95f);		
				HeaderTableSpacing.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				NursingStationController objControl=(ApplicationContextUtils.getApplicationContext()).getBean(NursingStationController.class);
				
				
				PersonalHygieneChartDTO objPHCDTO = new PersonalHygieneChartDTO();		
				List<PersonalHygieneChartDTO> listPHC = null;
				objPHCDTO= objControl.fetchPersonalHygieneChart((treat),"allDates");
				listPHC=objPHCDTO.getListPHC();
				
				if(listPHC.size() > 0){
					
					PdfPTable HeaderTablePHC = new PdfPTable(6);
					int[] headerwidthPHC = {3,2,37,15,15,15};
					HeaderTablePHC.setWidths(headerwidthPHC);
					HeaderTablePHC.setWidthPercentage(95f);		
					HeaderTablePHC.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					PdfPTable HeaderTablePHC1 = new PdfPTable(3);
					int[] headerwidthDVT1 = {2,10,40};
					HeaderTablePHC1.setWidths(headerwidthDVT1);
					HeaderTablePHC1.setWidthPercentage(95f);		
					HeaderTablePHC1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					HeaderTableTitle.addCell(new Phrase("", subheader));
					HeaderTableTitle.addCell(new Phrase("Patient Personal Hygiene Chart ", subheader));
					HeaderTableTitle.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableTitle);
					HeaderTableTitle.flushContent();
					
					HeaderTablePHC.addCell(new Phrase("#", subheader));
					HeaderTablePHC.addCell(new Phrase("", subheader));
					HeaderTablePHC.addCell(new Phrase("Procedure Name", subheader));
					HeaderTablePHC.addCell(new Phrase("Shift", subheader));
					HeaderTablePHC.addCell(new Phrase("Time ", subheader));
					HeaderTablePHC.addCell(new Phrase("Date", subheader));
					
					for(int i=0;i<listPHC.size();i++){
						
						 String[] arrCP = listPHC.get(i).getProcedure().split(",");
						 String[] arrTime = listPHC.get(i).getTimes().split(",");
						 String[] arrShift = listPHC.get(i).getShifts().split(",");
						 
						 for(int j=0;j<arrCP.length;j++){
							 String pro11=arrCP[j];
							 String time=arrTime[j];
							 String shft=arrShift[j];
							 
							 if(j==0)
							 	HeaderTablePHC.addCell(new Phrase((i+1)+".", subheader));
							 else
								HeaderTablePHC.addCell(new Phrase("", subheader));
							
							 	HeaderTablePHC.addCell(new Phrase("#", subheader));
								HeaderTablePHC.addCell(new Phrase(""+pro11, tabletext));
								HeaderTablePHC.addCell(new Phrase(""+shft, tabletext));
								HeaderTablePHC.addCell(new Phrase(""+time, tabletext));
								HeaderTablePHC.addCell(new Phrase(""+listPHC.get(i).getDate(), tabletext));
									
							}
						 String mornIns= listPHC.get(i).getMorningInstructions();
						 String evenIns= listPHC.get(i).getEveningInstructions();
						 String ngtIns= listPHC.get(i).getNightInstructions();
						 
						 if(!mornIns.equalsIgnoreCase("")&&!mornIns.equalsIgnoreCase("-")||
							!evenIns.equalsIgnoreCase("")&&!evenIns.equalsIgnoreCase("-")||
							!ngtIns.equalsIgnoreCase("") && !ngtIns.equalsIgnoreCase("-"))
						 {
							 HeaderTablePHC1.addCell(new Phrase("", tabletext));
							 HeaderTablePHC1.addCell(new Phrase("Instructions :-", subheader));
							 HeaderTablePHC1.addCell(new Phrase("", subheader));
							 
							 
							 if(!mornIns.equalsIgnoreCase("")&&!mornIns.equalsIgnoreCase("-")){
								 
								 HeaderTablePHC1.addCell(new Phrase("", tabletext));
								 HeaderTablePHC1.addCell(new Phrase("Morning Instructions - ", subheader));
								 HeaderTablePHC1.addCell(new Phrase(""+mornIns, tabletext));
							 }
							 if(!evenIns.equalsIgnoreCase("")&&!evenIns.equalsIgnoreCase("-")){
		
								 HeaderTablePHC1.addCell(new Phrase("", tabletext));
								 HeaderTablePHC1.addCell(new Phrase("Evening Instructions - ", subheader));
								 HeaderTablePHC1.addCell(new Phrase(""+evenIns, tabletext));
							 }
		 					 if(!ngtIns.equalsIgnoreCase("") && !ngtIns.equalsIgnoreCase("-")){
		 						 
		 						HeaderTablePHC1.addCell(new Phrase("", tabletext));
		 						HeaderTablePHC1.addCell(new Phrase("Night Instructions - ", subheader));
		 						HeaderTablePHC1.addCell(new Phrase(""+ngtIns, tabletext));
							 }
							 
		 						HeaderTablePHC1.addCell(new Phrase("", tabletext));
								HeaderTablePHC1.addCell(new Phrase("", tabletext));
								HeaderTablePHC1.addCell(new Phrase("", tabletext));
						 }
						 
					}
					
					HeaderTablePHC.addCell(new Phrase("", subheader));
					HeaderTablePHC.addCell(new Phrase("", subheader));
					HeaderTablePHC.addCell(new Phrase("", subheader));
					HeaderTablePHC.addCell(new Phrase("", subheader));
					HeaderTablePHC.addCell(new Phrase("", subheader));
					HeaderTablePHC.addCell(new Phrase("", subheader));
					HeaderTablePHC.addCell(new Phrase("", subheader));
					HeaderTablePHC.addCell(new Phrase("", subheader));
					
					document.add(HeaderTablePHC);
					HeaderTablePHC.flushContent(); 
					
					document.add(HeaderTablePHC1);
				 	HeaderTablePHC1.flushContent(); 
					
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableSpacing);
					HeaderTableSpacing.flushContent();
				}
				
				
				
				InvasionSiteCareDTO objISCDTO = new InvasionSiteCareDTO();		
				List<InvasionSiteCareDTO> listISC = null;
				objISCDTO= objControl.fetchInvasionSiteCareInformation((treat) , "allDates");
				listISC=objISCDTO.getListISC();
				
				if(listISC.size() > 0 ){
					
					PdfPTable HeaderTableISC = new PdfPTable(8);
					int[] headerwidthISC = {3,19,13,7,18,18,7,10};
					HeaderTableISC.setWidths(headerwidthISC);
					HeaderTableISC.setWidthPercentage(95f);		
					HeaderTableISC.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					HeaderTableTitle.addCell(new Phrase("", subheader));
					HeaderTableTitle.addCell(new Phrase("Invasive Site Care", subheader));
					HeaderTableTitle.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableTitle);
					HeaderTableTitle.flushContent();
					
					HeaderTableISC.addCell(new Phrase("#", subheader));
					HeaderTableISC.addCell(new Phrase("Line/Tube", subheader));
					HeaderTableISC.addCell(new Phrase("Site", subheader));
					HeaderTableISC.addCell(new Phrase("Days", subheader));
					HeaderTableISC.addCell(new Phrase("Condition", subheader));
					HeaderTableISC.addCell(new Phrase("Action", subheader));
					HeaderTableISC.addCell(new Phrase("Change", subheader));
					HeaderTableISC.addCell(new Phrase("Date", subheader));
					
					for(int i=0;i<listISC.size();i++){
						
						HeaderTableISC.addCell(new Phrase((i+1)+"", subheader));
						HeaderTableISC.addCell(new Phrase(""+listISC.get(i).getLineTube(), tabletext));
						HeaderTableISC.addCell(new Phrase(""+listISC.get(i).getSite(), tabletext));
						HeaderTableISC.addCell(new Phrase(""+listISC.get(i).getDateDays(), tabletext));
						HeaderTableISC.addCell(new Phrase(""+listISC.get(i).getConditions(), tabletext));
						HeaderTableISC.addCell(new Phrase(""+listISC.get(i).getActions(), tabletext));
						HeaderTableISC.addCell(new Phrase(""+listISC.get(i).getChangeMedicine(), tabletext));
						HeaderTableISC.addCell(new Phrase(""+listISC.get(i).getDate(), tabletext));
						
					}
					HeaderTableISC.addCell(new Phrase("", subheader));
					HeaderTableISC.addCell(new Phrase("", subheader));
					HeaderTableISC.addCell(new Phrase("", subheader));
					HeaderTableISC.addCell(new Phrase("", subheader));
					HeaderTableISC.addCell(new Phrase("", subheader));
					HeaderTableISC.addCell(new Phrase("", subheader));
					HeaderTableISC.addCell(new Phrase("", subheader));
					HeaderTableISC.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableISC);
					HeaderTableISC.flushContent(); 
					
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableSpacing);
					HeaderTableSpacing.flushContent();
					
				}
				
				NursingCarePlanDTO objNCPDTO = new NursingCarePlanDTO();		
				List<NursingCarePlanDTO> listNCP = null;
				objNCPDTO= objControl.fetchNursingCarePlanInformation((treat) , "allDates");
				listNCP=objNCPDTO.getListNCP();
				
				if(listNCP.size() > 0){
					
					PdfPTable HeaderTableNCP = new PdfPTable(8);
					int[] headerwidthNCP = {3,14,14,14,14,14,14,14};
					HeaderTableNCP.setWidths(headerwidthNCP);
					HeaderTableNCP.setWidthPercentage(95f);		
					HeaderTableNCP.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						
					HeaderTableTitle.addCell(new Phrase("", subheader));
					HeaderTableTitle.addCell(new Phrase("Nursing Care Plan", subheader));
					HeaderTableTitle.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableTitle);
					HeaderTableTitle.flushContent();
					
					HeaderTableNCP.addCell(new Phrase("#", subheader));
					HeaderTableNCP.addCell(new Phrase("Assessment", subheader));
					HeaderTableNCP.addCell(new Phrase("Diagnosis", subheader));
					HeaderTableNCP.addCell(new Phrase("Planning", subheader));
					HeaderTableNCP.addCell(new Phrase("Implementation", subheader));
					HeaderTableNCP.addCell(new Phrase("Evaluation", subheader));
					HeaderTableNCP.addCell(new Phrase("Tests", subheader));
					HeaderTableNCP.addCell(new Phrase("Date", subheader));
					
					for(int i=0;i<listNCP.size();i++){
						
						String tests ="";
						tests =listNCP.get(i).getTestValues();
						tests = tests.replaceAll("test1" , " I/V Cannula");
						tests = tests.replaceAll("test2" , " Foleys Catheter");
						tests = tests.replaceAll("test3" , " Ryles Tube");
						tests = tests.replaceAll("test4" , " Drain");
						tests = tests.replaceAll("test5" , " ICD");
						tests = tests.replaceAll("test6" , " Colostomy");
						tests = tests.replaceAll("test7" , " Ileostomy");
						
						HeaderTableNCP.addCell(new Phrase((i+1)+"", subheader));
						HeaderTableNCP.addCell(new Phrase(""+listNCP.get(i).getAssessment(), tabletext));
						HeaderTableNCP.addCell(new Phrase(""+listNCP.get(i).getNursingDiagnosis(), tabletext));
						HeaderTableNCP.addCell(new Phrase(""+listNCP.get(i).getPlanning(), tabletext));
						HeaderTableNCP.addCell(new Phrase(""+listNCP.get(i).getImplementation(), tabletext));
						HeaderTableNCP.addCell(new Phrase(""+listNCP.get(i).getEvaluation(), tabletext));
						HeaderTableNCP.addCell(new Phrase(""+tests, tabletext));
						HeaderTableNCP.addCell(new Phrase(""+listNCP.get(i).getDate(), tabletext));
						
					}
					HeaderTableNCP.addCell(new Phrase("", subheader));
					HeaderTableNCP.addCell(new Phrase("", subheader));
					HeaderTableNCP.addCell(new Phrase("", subheader));
					HeaderTableNCP.addCell(new Phrase("", subheader));
					HeaderTableNCP.addCell(new Phrase("", subheader));
					HeaderTableNCP.addCell(new Phrase("", subheader));
					HeaderTableNCP.addCell(new Phrase("", subheader));
					HeaderTableNCP.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableNCP);
					HeaderTableNCP.flushContent(); 
					
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableSpacing);
					HeaderTableSpacing.flushContent();
					
				}
				
				HygieneChecklistDTO objHHCDTO = new HygieneChecklistDTO();		
				List<HygieneChecklistDTO> listHHC = null;
				objHHCDTO= objControl.fetchHandHygieneChecklistInformation((treat) , "allDates");
				listHHC=objHHCDTO.getListHHC();
				
				if(listHHC.size() > 0){
					
					PdfPTable HeaderTableHHC = new PdfPTable(8);
					int[] headerwidthHCC = {3,15,10,20,20,10,10,10};
					HeaderTableHHC.setWidths(headerwidthHCC);
					HeaderTableHHC.setWidthPercentage(95f);		
					HeaderTableHHC.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					HeaderTableTitle.addCell(new Phrase("", subheader));
					HeaderTableTitle.addCell(new Phrase("Hand Hygiene CheckList", subheader));
					HeaderTableTitle.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableTitle);
					HeaderTableTitle.flushContent();
					
					HeaderTableHHC.addCell(new Phrase("#", subheader));
					HeaderTableHHC.addCell(new Phrase("Procedure Name", subheader));
					HeaderTableHHC.addCell(new Phrase("Done By", subheader));
					HeaderTableHHC.addCell(new Phrase("Protocol Before", subheader));
					HeaderTableHHC.addCell(new Phrase("Protocol After", subheader));
					HeaderTableHHC.addCell(new Phrase("Name & Sign", subheader));
					HeaderTableHHC.addCell(new Phrase("ICN Sign", subheader));
					HeaderTableHHC.addCell(new Phrase("Date", subheader));
					
					for(int i=0;i<listHHC.size();i++){
						
						HeaderTableHHC.addCell(new Phrase((i+1)+"", subheader));
						HeaderTableHHC.addCell(new Phrase(""+listHHC.get(i).getProcedure(), tabletext));
						HeaderTableHHC.addCell(new Phrase(""+listHHC.get(i).getDoneBy(), tabletext));
						HeaderTableHHC.addCell(new Phrase(""+listHHC.get(i).getProtocolBefore(), tabletext));
						HeaderTableHHC.addCell(new Phrase(""+listHHC.get(i).getProtocolAfter(), tabletext));
						HeaderTableHHC.addCell(new Phrase(""+listHHC.get(i).getSignature(), tabletext));
						HeaderTableHHC.addCell(new Phrase(""+listHHC.get(i).getIcnSign(), tabletext));
						HeaderTableHHC.addCell(new Phrase(""+listHHC.get(i).getDate(), tabletext));
						
					}
					
					HeaderTableHHC.addCell(new Phrase("", subheader));
					HeaderTableHHC.addCell(new Phrase("", subheader));
					HeaderTableHHC.addCell(new Phrase("", subheader));
					HeaderTableHHC.addCell(new Phrase("", subheader));
					HeaderTableHHC.addCell(new Phrase("", subheader));
					HeaderTableHHC.addCell(new Phrase("", subheader));
					HeaderTableHHC.addCell(new Phrase("", subheader));
					HeaderTableHHC.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableHHC);
					HeaderTableHHC.flushContent(); 
					
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableSpacing);
					HeaderTableSpacing.flushContent();
				}
				
				
				UlcerRiskScoreDTO objURSDTO = new UlcerRiskScoreDTO();		
				List<UlcerRiskScoreDTO> listURS = null;
				objURSDTO= objControl.fetchUlcerRiskScore("0", "allDates",(treat) );
				listURS=objURSDTO.getListURS();
				
				if(listURS.size() > 0){
					
					PdfPTable HeaderTableURS = new PdfPTable(8);
					int[] headerwidthURS = {5,15,15,15,15,15,15,15};
					HeaderTableURS.setWidths(headerwidthURS);
					HeaderTableURS.setWidthPercentage(95f);		
					HeaderTableURS.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					PdfPTable HeaderTableURS1 = new PdfPTable(5);
					int[] headerwidthURS1 = {5,10,15,15,35};
					HeaderTableURS1.setWidths(headerwidthURS1);
					HeaderTableURS1.setWidthPercentage(95f);		
					HeaderTableURS1.getDefaultCell().setBorder(Rectangle.BOTTOM);
					
					HeaderTableTitle.addCell(new Phrase("", subheader));
					HeaderTableTitle.addCell(new Phrase("Braden Scale For Predicting Pressure Ulcer Risk", subheader));
					HeaderTableTitle.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableTitle);
					HeaderTableTitle.flushContent();
					
					HeaderTableURS.addCell(new Phrase("#", subheader));
					HeaderTableURS.addCell(new Phrase("Sensory Perception Score", subheader));
					HeaderTableURS.addCell(new Phrase("Mobility Score", subheader));
					HeaderTableURS.addCell(new Phrase("Activity Score", subheader));
					HeaderTableURS.addCell(new Phrase("Moisture Score", subheader));
					HeaderTableURS.addCell(new Phrase("Friction / Shear Score", subheader));
					HeaderTableURS.addCell(new Phrase("Nutrution Score", subheader));
					HeaderTableURS.addCell(new Phrase("Date", subheader));
					
					for(int i=0;i<listURS.size();i++){
						
						HeaderTableURS.addCell(new Phrase((i+1)+"", subheader));
						
						//For Sensory Perception
						if(listURS.get(i).getSensoryPerception()==1){
							HeaderTableURS.addCell(new Phrase("Completely Limited", tabletext));
						}else if(listURS.get(i).getSensoryPerception()==2){
							HeaderTableURS.addCell(new Phrase("Very Limited", tabletext));
						}else if(listURS.get(i).getSensoryPerception()==3){
							HeaderTableURS.addCell(new Phrase("Slightly Limited", tabletext));
						}else if(listURS.get(i).getSensoryPerception()==4){
							HeaderTableURS.addCell(new Phrase("No Impairment", tabletext));
						}
						
						//For Mobility
						if(listURS.get(i).getMobility()==1){
							HeaderTableURS.addCell(new Phrase("Completely Immobile", tabletext));
						}else if(listURS.get(i).getMobility()==2){
							HeaderTableURS.addCell(new Phrase("Very Limited", tabletext));
						}else if(listURS.get(i).getMobility()==3){
							HeaderTableURS.addCell(new Phrase("Slightly Limited", tabletext));
						}else if(listURS.get(i).getMobility()==4){
							HeaderTableURS.addCell(new Phrase("No Impairment", tabletext));
						}
						
						//For Activity
						if(listURS.get(i).getActivity()==1){
							HeaderTableURS.addCell(new Phrase("Bed Rest", tabletext));
						}else if(listURS.get(i).getActivity()==2){
							HeaderTableURS.addCell(new Phrase("chair", tabletext));
						}else if(listURS.get(i).getActivity()==3){
							HeaderTableURS.addCell(new Phrase("Walks Ocationally", tabletext));
						}else if(listURS.get(i).getActivity()==4){
							HeaderTableURS.addCell(new Phrase("Walks Frequently", tabletext));
						}
						
						//For Moisture
						if(listURS.get(i).getMoisture()==1){
							HeaderTableURS.addCell(new Phrase("Always Moist", tabletext));
						}else if(listURS.get(i).getMoisture()==2){
							HeaderTableURS.addCell(new Phrase("Very Moist", tabletext));
						}else if(listURS.get(i).getMoisture()==3){
							HeaderTableURS.addCell(new Phrase("Ocationally Moist", tabletext));
						}else if(listURS.get(i).getMoisture()==4){
							HeaderTableURS.addCell(new Phrase("Rarely Moist", tabletext));
						}
						
						//For Friction/Shear
						if(listURS.get(i).getFriction()==1){
							HeaderTableURS.addCell(new Phrase("Problem", tabletext));
						}else if(listURS.get(i).getFriction()==2){
							HeaderTableURS.addCell(new Phrase("Potential Problem", tabletext));
						}else if(listURS.get(i).getFriction()==3){
							HeaderTableURS.addCell(new Phrase("No Apparent Problem", tabletext));
						}
						
						//For Nutrution
						if(listURS.get(i).getNutrition()==1){
							HeaderTableURS.addCell(new Phrase("Very Poor", tabletext));
						}else if(listURS.get(i).getNutrition()==2){
							HeaderTableURS.addCell(new Phrase("Probably Inadequate", tabletext));
						}else if(listURS.get(i).getNutrition()==3){
							HeaderTableURS.addCell(new Phrase("Adequate", tabletext));
						}else if(listURS.get(i).getNutrition()==4){
							HeaderTableURS.addCell(new Phrase("Excellent", tabletext));
						}
						
						HeaderTableURS.addCell(new Phrase(""+listURS.get(i).getDate(), tabletext));
						
						HeaderTableURS.addCell(new Phrase("", subheader));
						HeaderTableURS.addCell(new Phrase("", tabletext));
						HeaderTableURS.addCell(new Phrase("", tabletext));
						HeaderTableURS.addCell(new Phrase("", tabletext));
						HeaderTableURS.addCell(new Phrase("", tabletext));
						HeaderTableURS.addCell(new Phrase("", tabletext));
						HeaderTableURS.addCell(new Phrase("", tabletext));
						HeaderTableURS.addCell(new Phrase("", tabletext));
						
						document.add(HeaderTableURS);
						HeaderTableURS.flushContent();
						
						HeaderTableURS1.addCell(new Phrase("", subheader));
						HeaderTableURS1.addCell(new Phrase("Risk Level ", subheader));
						HeaderTableURS1.addCell(new Phrase(""+listURS.get(i).getRiskLevel(), tabletext));
						HeaderTableURS1.addCell(new Phrase("Action Plan :", subheader));
						HeaderTableURS1.addCell(new Phrase(""+listURS.get(i).getActionPlan(), tabletext));
						
						HeaderTableURS1.addCell(new Phrase("", subheader));
						HeaderTableURS1.addCell(new Phrase("", subheader));
						HeaderTableURS1.addCell(new Phrase("", tabletext));
						HeaderTableURS1.addCell(new Phrase("", subheader));
						HeaderTableURS1.addCell(new Phrase("", tabletext));
						
						document.add(HeaderTableURS1);
						HeaderTableURS1.flushContent();
						
					}
					
					HeaderTableURS.addCell(new Phrase("", subheader));
					HeaderTableURS.addCell(new Phrase("", subheader));
					HeaderTableURS.addCell(new Phrase("", subheader));
					HeaderTableURS.addCell(new Phrase("", subheader));
					HeaderTableURS.addCell(new Phrase("", subheader));
					HeaderTableURS.addCell(new Phrase("", subheader));
					HeaderTableURS.addCell(new Phrase("", subheader));
					HeaderTableURS.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableURS);
					HeaderTableURS.flushContent(); 
					
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableSpacing);
					HeaderTableSpacing.flushContent();
					
				}
		
				
				GlasgowComaScoreDTO objGCSDTO = new GlasgowComaScoreDTO();		
				List<GlasgowComaScoreDTO> listGCS = null;
				objGCSDTO= objControl.fetchGlasgowComaScore("0", "allDates",(treat) );
				listGCS=objGCSDTO.getListGCS();
				
				if(listGCS.size() > 0){
					
					PdfPTable HeaderTableGCS = new PdfPTable(6);
					int[] headerwidthGCS = {5,15,15,15,15,15};
					HeaderTableGCS.setWidths(headerwidthGCS);
					HeaderTableGCS.setWidthPercentage(95f);		
					HeaderTableGCS.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					PdfPTable HeaderTableGCS1 = new PdfPTable(5);
					int[] headerwidthURS1 = {5,15,10,15,35};
					HeaderTableGCS1.setWidths(headerwidthURS1);
					HeaderTableGCS1.setWidthPercentage(95f);		
					HeaderTableGCS1.getDefaultCell().setBorder(Rectangle.BOTTOM);
					
					HeaderTableTitle.addCell(new Phrase("", subheader));
					HeaderTableTitle.addCell(new Phrase("Glasgow Coma Scale", subheader));
					HeaderTableTitle.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableTitle);
					HeaderTableTitle.flushContent();
					
					HeaderTableGCS.addCell(new Phrase("#", subheader));
					HeaderTableGCS.addCell(new Phrase("Response Type", subheader));
					HeaderTableGCS.addCell(new Phrase("Response ", subheader));
					HeaderTableGCS.addCell(new Phrase("Score", subheader));
					HeaderTableGCS.addCell(new Phrase("Time", subheader));
					HeaderTableGCS.addCell(new Phrase("Date", subheader));
					
					for(int i=0;i<listGCS.size();i++){
						
						 String EOR = "";
						 String BMR = "";
						 String BVR = "";
						 
						 if(listGCS.get(i).getEorScore().equalsIgnoreCase("4"))
							 EOR = "Spontaneously";
						 else if(listGCS.get(i).getEorScore().equalsIgnoreCase("3"))
							 EOR = "To Speech/Verbal Command";
						 else if(listGCS.get(i).getEorScore().equalsIgnoreCase("2"))
							 EOR = "To Pain";
						 else if(listGCS.get(i).getEorScore().equalsIgnoreCase("1"))
							 EOR = "No Reponse";
						 
						 if(listGCS.get(i).getBvrScore().equalsIgnoreCase("5"))
							 BVR = "Oriented and Talks";
						 else if(listGCS.get(i).getBvrScore().equalsIgnoreCase("4"))
							 BVR = "Disoriented and Talks";
						 else if(listGCS.get(i).getBvrScore().equalsIgnoreCase("3"))
							 BVR = "Inappropriate Words";
						 else if(listGCS.get(i).getBvrScore().equalsIgnoreCase("2"))
							 BVR = "Incomprehensible Sounds";
						 else if(listGCS.get(i).getBvrScore().equalsIgnoreCase("1"))
							 BVR = "No Reponse";
						 
						 if(listGCS.get(i).getBmrScore().equalsIgnoreCase("6"))
							 BMR = "Obey Verbal Commands";
						 else if(listGCS.get(i).getBmrScore().equalsIgnoreCase("5"))
							 BMR = "Localizes Pain";
						 else if(listGCS.get(i).getBmrScore().equalsIgnoreCase("4"))
							 BMR = "Withdraws to Pain";
						 else if(listGCS.get(i).getBmrScore().equalsIgnoreCase("3"))
							 BMR = "Decorticate";
						 else if(listGCS.get(i).getBmrScore().equalsIgnoreCase("2"))
							 BMR = "Decerebrate";
						 else if(listGCS.get(i).getBmrScore().equalsIgnoreCase("1"))
							 BMR = "No Reponse";
						 
						 
						HeaderTableGCS.addCell(new Phrase((i+1)+".", subheader));
						HeaderTableGCS.addCell(new Phrase("Eye Opening Response", subheader));
						HeaderTableGCS.addCell(new Phrase(""+EOR, tabletext));
						HeaderTableGCS.addCell(new Phrase(""+listGCS.get(i).getEorScore(), tabletext));
						HeaderTableGCS.addCell(new Phrase(""+listGCS.get(i).getEorTime(), tabletext));
						HeaderTableGCS.addCell(new Phrase(""+listGCS.get(i).getDate(), tabletext));
						
						HeaderTableGCS.addCell(new Phrase("",subheader ));
						HeaderTableGCS.addCell(new Phrase("Best Verbal Response", subheader));
						HeaderTableGCS.addCell(new Phrase(""+BVR, tabletext));
						HeaderTableGCS.addCell(new Phrase(""+listGCS.get(i).getBvrScore(), tabletext));
						HeaderTableGCS.addCell(new Phrase(""+listGCS.get(i).getBvrTime(), tabletext));
						HeaderTableGCS.addCell(new Phrase(""+listGCS.get(i).getDate(), tabletext));
						
						HeaderTableGCS.addCell(new Phrase("",subheader ));
						HeaderTableGCS.addCell(new Phrase("Best Motor Response", subheader));
						HeaderTableGCS.addCell(new Phrase(""+BMR, tabletext));
						HeaderTableGCS.addCell(new Phrase(""+listGCS.get(i).getBmrScore(), tabletext));
						HeaderTableGCS.addCell(new Phrase(""+listGCS.get(i).getBmrTime(), tabletext));
						HeaderTableGCS.addCell(new Phrase(""+listGCS.get(i).getDate(), tabletext));
						
						HeaderTableGCS.addCell(new Phrase("",subheader ));
						HeaderTableGCS.addCell(new Phrase("", subheader));
						HeaderTableGCS.addCell(new Phrase("", tabletext));
						HeaderTableGCS.addCell(new Phrase("", tabletext));
						HeaderTableGCS.addCell(new Phrase("", tabletext));
						HeaderTableGCS.addCell(new Phrase("", tabletext));
						
						document.add(HeaderTableGCS);
						HeaderTableGCS.flushContent();
						
						String action="";
						
						if(listGCS.get(i).getActionUndertaken().equalsIgnoreCase("A"))
							action=" - Inform Duty Dr. / Intensivist / Consultant / BSL / TPR / BP Monitoring / Consider Endotracheal Intubation ";
						else if(listGCS.get(i).getActionUndertaken().equalsIgnoreCase("B"))
							action=" - Consider Orpoharyngeal Airway / Nasopharyngeal Airway ";
						else if(listGCS.get(i).getActionUndertaken().equalsIgnoreCase("C"))	
							action=" - Observation";
							
						HeaderTableGCS1.addCell(new Phrase("", subheader));
						HeaderTableGCS1.addCell(new Phrase("Total Score", subheader));
						HeaderTableGCS1.addCell(new Phrase(""+listGCS.get(i).getTotalScore(), tabletext));
						HeaderTableGCS1.addCell(new Phrase("Action Plan :", subheader));
						HeaderTableGCS1.addCell(new Phrase("("+listGCS.get(i).getActionUndertaken()+")"+action, tabletext));
						
						HeaderTableGCS1.addCell(new Phrase("", subheader));
						HeaderTableGCS1.addCell(new Phrase("", subheader));
						HeaderTableGCS1.addCell(new Phrase("", tabletext));
						HeaderTableGCS1.addCell(new Phrase("", subheader));
						HeaderTableGCS1.addCell(new Phrase("", tabletext));
						
						document.add(HeaderTableGCS1);
						HeaderTableGCS1.flushContent();
						
					}
					
					HeaderTableGCS.addCell(new Phrase("", subheader));
					HeaderTableGCS.addCell(new Phrase("", subheader));
					HeaderTableGCS.addCell(new Phrase("", subheader));
					HeaderTableGCS.addCell(new Phrase("", subheader));
					HeaderTableGCS.addCell(new Phrase("", subheader));
					HeaderTableGCS.addCell(new Phrase("", subheader));
					HeaderTableGCS.addCell(new Phrase("", subheader));
					HeaderTableGCS.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableGCS);
					HeaderTableGCS.flushContent(); 
					
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableSpacing);
					HeaderTableSpacing.flushContent();
				}
				
				
				VIPScoreDTO objVIPDTO = new VIPScoreDTO();		
				List<VIPScoreDTO> listVIP = null;
				objVIPDTO= objControl.fetchVIPScoreAndActionTaken("allDates",(treat));
				listVIP=objVIPDTO.getListVIP();
				
				if(listVIP.size() > 0){
					
					PdfPTable HeaderTableVIP = new PdfPTable(6);
					int[] headerwidthVIP = {5,25,5,15,25,10};
					HeaderTableVIP.setWidths(headerwidthVIP);
					HeaderTableVIP.setWidthPercentage(95f);		
					HeaderTableVIP.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					HeaderTableTitle.addCell(new Phrase("", subheader));
					HeaderTableTitle.addCell(new Phrase("VIP Score And Action Taken", subheader));
					HeaderTableTitle.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableTitle);
					HeaderTableTitle.flushContent();
					
					HeaderTableVIP.addCell(new Phrase("#", subheader));
					HeaderTableVIP.addCell(new Phrase("Assessment", subheader));
					HeaderTableVIP.addCell(new Phrase("Score ", subheader));
					HeaderTableVIP.addCell(new Phrase("Shift", subheader));
					HeaderTableVIP.addCell(new Phrase("Action Plan", subheader));
					HeaderTableVIP.addCell(new Phrase("Date", subheader));
					
					for(int i=0;i<listVIP.size();i++){
						
						 String Asses = "";
						 
						 if(listVIP.get(i).getVipScore()==0)
							 Asses = "IV Site appears Healthy";
						 else if(listVIP.get(i).getVipScore()==1)
							 Asses = "Slight Pain or Redness near IV Site";
						 else if(listVIP.get(i).getVipScore()==2)
							 Asses = "Pain, Redness, Swelling";
						 else if(listVIP.get(i).getVipScore()==3)
							 Asses = "Pain along path of Cannula, Redness & Swelling";
						 else if(listVIP.get(i).getVipScore()==4)
							 Asses = "Pain along path of Cannula, Redness, Swelling & Palpable Venous Cord";
						 else if(listVIP.get(i).getVipScore()==5)
							 Asses = "Pain along path of Cannula, Redness, Swelling, Palpable Venous Cord & Fever";
						 
						 
						HeaderTableVIP.addCell(new Phrase((i+1)+".", subheader));
						HeaderTableVIP.addCell(new Phrase(""+Asses, tabletext));
						HeaderTableVIP.addCell(new Phrase(""+listVIP.get(i).getVipScore(), tabletext));
						HeaderTableVIP.addCell(new Phrase(""+listVIP.get(i).getDuration(), tabletext));
						HeaderTableVIP.addCell(new Phrase(""+listVIP.get(i).getActionPlan(), tabletext));
						HeaderTableVIP.addCell(new Phrase(""+listVIP.get(i).getDate(), tabletext));
						
					}
					
					HeaderTableVIP.addCell(new Phrase("", subheader));
					HeaderTableVIP.addCell(new Phrase("", subheader));
					HeaderTableVIP.addCell(new Phrase("", subheader));
					HeaderTableVIP.addCell(new Phrase("", subheader));
					HeaderTableVIP.addCell(new Phrase("", subheader));
					HeaderTableVIP.addCell(new Phrase("", subheader));
					HeaderTableVIP.addCell(new Phrase("", subheader));
					HeaderTableVIP.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableVIP);
					HeaderTableVIP.flushContent(); 
					
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableSpacing);
					HeaderTableSpacing.flushContent();
				}
				 
				DVTScoreDTO objDVTDTO = new DVTScoreDTO();		
				List<DVTScoreDTO> listDVT = null;
				objDVTDTO= objControl.fetchDVTScore("allDates",(treat));
				listDVT=objDVTDTO.getListDVT();
				
				if(listDVT.size() > 0){
					
					PdfPTable HeaderTableDVT = new PdfPTable(5);
					int[] headerwidthDVT = {3,2,37,15,15};
					HeaderTableDVT.setWidths(headerwidthDVT);
					HeaderTableDVT.setWidthPercentage(95f);		
					HeaderTableDVT.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					PdfPTable HeaderTableDVT1 = new PdfPTable(5);
					int[] headerwidthDVT1 = {3,15,10,15,37};
					HeaderTableDVT1.setWidths(headerwidthDVT1);
					HeaderTableDVT1.setWidthPercentage(95f);		
					HeaderTableDVT1.getDefaultCell().setBorder(Rectangle.BOTTOM);
					
					HeaderTableTitle.addCell(new Phrase("", subheader));
					HeaderTableTitle.addCell(new Phrase("Deep Vein Thrombosis Risk Score", subheader));
					HeaderTableTitle.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableTitle);
					HeaderTableTitle.flushContent();
					
					HeaderTableDVT.addCell(new Phrase("#", subheader));
					HeaderTableDVT.addCell(new Phrase("", subheader));
					HeaderTableDVT.addCell(new Phrase("Clinical Feature", subheader));
					HeaderTableDVT.addCell(new Phrase("Time ", subheader));
					HeaderTableDVT.addCell(new Phrase("Date", subheader));
					
					for(int i=0;i<listDVT.size();i++){
						
						 String[] arrCP = listDVT.get(i).getClinicalFeatures().split(",");
						 String[] arrTime = listDVT.get(i).getTimes().split(",");
						 
						 for(int j=0;j<arrCP.length;j++){
							 String clinical="";
							 String time=arrTime[j];
							 
							 if(arrCP[j].equalsIgnoreCase("clinicalFeature1"))
								 clinical="Active Cancer\n(Treatment on-going,within 6months,or palliative)";
							 else if(arrCP[j].equalsIgnoreCase("clinicalFeature2"))
								 clinical="Paralysis,paresis,or recent plaster immobilization of the extremities";	 
							 else if(arrCP[j].equalsIgnoreCase("clinicalFeature3"))
								 clinical="Recently bedridden for 3days or more or major surgery within 12weeks reqiuring general or regional anaesthesia";
							 else if(arrCP[j].equalsIgnoreCase("clinicalFeature4"))
								 clinical="localized tenderness along the distribution of the deep venous system";
							 else if(arrCP[j].equalsIgnoreCase("clinicalFeature5"))
								 clinical="Entire leg swollen";
							 else if(arrCP[j].equalsIgnoreCase("clinicalFeature6"))
								 clinical="Calf swelling atleast 3cm larger than asymptomatic side.\n(measured 10cm below the tibial tuberosity)";
							 else if(arrCP[j].equalsIgnoreCase("clinicalFeature7"))
								 clinical="Pitting oedema confined to the symptomatic leg";
							 else if(arrCP[j].equalsIgnoreCase("clinicalFeature8"))
								 clinical="Collateral superficial veins(non varicose)";
							 else if(arrCP[j].equalsIgnoreCase("clinicalFeature9"))
								 clinical="Previously documented DVT";
							 else if(arrCP[j].equalsIgnoreCase("clinicalFeature10"))
								 clinical="An alternative diagnosis is atleast as likely as DVT\n(Baker's cyst,cellulitis,muscle damage,superficial venous thrombosis,post phlebitic syndrome,inguinal lymphadenopathy,external venous compression)";
								 
							 
							 if(j==0)
							 	HeaderTableDVT.addCell(new Phrase((i+1)+".", subheader));
							 else
								HeaderTableDVT.addCell(new Phrase("", subheader));
							
							 	HeaderTableDVT.addCell(new Phrase("#", subheader));
								HeaderTableDVT.addCell(new Phrase(""+clinical, tabletext));
								HeaderTableDVT.addCell(new Phrase(""+time, tabletext));
								HeaderTableDVT.addCell(new Phrase(""+listDVT.get(i).getDate(), tabletext));
									
							}
						 
						 HeaderTableDVT1.addCell(new Phrase("", tabletext));
						 HeaderTableDVT1.addCell(new Phrase("Score", tabletext));
						 HeaderTableDVT1.addCell(new Phrase(""+listDVT.get(i).getTotalScore(), tabletext));
						 HeaderTableDVT1.addCell(new Phrase("Action Plan", tabletext));
						 HeaderTableDVT1.addCell(new Phrase(""+listDVT.get(i).getActionPlan(), tabletext));
					}
					
					HeaderTableDVT.addCell(new Phrase("", subheader));
					HeaderTableDVT.addCell(new Phrase("", subheader));
					HeaderTableDVT.addCell(new Phrase("", subheader));
					HeaderTableDVT.addCell(new Phrase("", subheader));
					HeaderTableDVT.addCell(new Phrase("", subheader));
					HeaderTableDVT.addCell(new Phrase("", subheader));
					HeaderTableDVT.addCell(new Phrase("", subheader));
					HeaderTableDVT.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableDVT);
					HeaderTableDVT.flushContent(); 
					
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableSpacing);
					HeaderTableSpacing.flushContent();
				}
				
						 
				MFRAScoreDTO objMFRADTO = new MFRAScoreDTO();		
				List<MFRAScoreDTO> listMFRA = null;
				objMFRADTO = objControl.fetchMFRAScoreInformation("allDates",(treat));
				listMFRA = objMFRADTO.getListMFRA();	
				
				if(listMFRA.size() > 0){
					
					PdfPTable HeaderTableMFRA = new PdfPTable(7);
					int[] headerwidthDVT = {3,2,20,10,10,15,15};
					HeaderTableMFRA.setWidths(headerwidthDVT);
					HeaderTableMFRA.setWidthPercentage(95f);		
					HeaderTableMFRA.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					PdfPTable HeaderTableMFRA1 = new PdfPTable(7);
					int[] headerwidthDVT1 = {3,10,10,15,15,10,37};
					HeaderTableMFRA1.setWidths(headerwidthDVT1);
					HeaderTableMFRA1.setWidthPercentage(95f);		
					HeaderTableMFRA1.getDefaultCell().setBorder(Rectangle.BOTTOM);
					
					HeaderTableTitle.addCell(new Phrase("", subheader));
					HeaderTableTitle.addCell(new Phrase("Morse Fallen Risk Assessment", subheader));
					HeaderTableTitle.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableTitle);
					HeaderTableTitle.flushContent();
					
					HeaderTableMFRA.addCell(new Phrase("#", subheader));
					HeaderTableMFRA.addCell(new Phrase("", subheader));
					HeaderTableMFRA.addCell(new Phrase("Risk Factor", subheader));
					HeaderTableMFRA.addCell(new Phrase("Scale ", subheader));
					HeaderTableMFRA.addCell(new Phrase("Score ", subheader));
					HeaderTableMFRA.addCell(new Phrase("Time ", subheader));
					HeaderTableMFRA.addCell(new Phrase("Date", subheader));
					
					for(int i=0;i<listMFRA.size();i++){
						
						 String[] arrFac = listMFRA.get(i).getFactors().split(" ,");
						 String[] arrTime = listMFRA.get(i).getTimes().split(",");
						 String[] arrScore = listMFRA.get(i).getScores().split(",");
						 
						 for(int j=0;j<arrFac.length;j++){
							 String factor="";
							 String time=arrTime[j];
							 String score=arrScore[j];
							 String  scale="";
							 
							 if(arrFac[j].equalsIgnoreCase("factor1")){
								 factor="History of fall ";
								 if(score.equalsIgnoreCase("25"))
									 scale="Yes";
								else if(score.equalsIgnoreCase("0"))
									scale="No"; 
							 }
							 else if(arrFac[j].equalsIgnoreCase("factor2")){
								 factor="Secondary Diagnosis ";	 
		 							if(score.equalsIgnoreCase("15"))
		 								scale="Yes";
									 else if(score.equalsIgnoreCase("0"))
										 scale="Yes";
							 }
							 else if(arrFac[j].equalsIgnoreCase("factor3")){
								 factor="Ambulatory AID";
		 						if(score.equalsIgnoreCase("30"))
		 							 scale="Fruiniture";
								 else if(score.equalsIgnoreCase("15"))
									 scale="Crutches / Can / Walker";
								 else if(score.equalsIgnoreCase("0"))
									 scale="None / BedRest / WheelChair / Nurse";
							 }
							 else if(arrFac[j].equalsIgnoreCase("factor4")){
								 factor="IV / Heparin Lock";
								 if(score.equalsIgnoreCase("20"))
		 							 scale="Yes";
								 else if(score.equalsIgnoreCase("0"))
									 scale="No";
								 }
							 else if(arrFac[j].equalsIgnoreCase("factor5")){
								 factor="Gait / Transferring";
								 if(score.equalsIgnoreCase("20"))
		 							 scale="Impaired";
								 else if(score.equalsIgnoreCase("10"))
									 scale="Weak";
								 else if(score.equalsIgnoreCase("0"))
									 scale="Normal / BedRest / Immobile";
							 }
							 else if(arrFac[j].equalsIgnoreCase("factor6")){
								 factor="Mental Status";
								 if(score.equalsIgnoreCase("15"))
		 							 scale="Forgets Limitations";
								 else if(score.equalsIgnoreCase("0"))
									 scale="Oriented to own Ability";	 
							 }
								 
							 
							 if(j==0)
							 	HeaderTableMFRA.addCell(new Phrase((i+1)+".", subheader));
							 else
								HeaderTableMFRA.addCell(new Phrase("", subheader));
							
							 	HeaderTableMFRA.addCell(new Phrase("#", subheader));
								HeaderTableMFRA.addCell(new Phrase(""+factor, tabletext));
								HeaderTableMFRA.addCell(new Phrase(""+scale, tabletext));
								HeaderTableMFRA.addCell(new Phrase(""+score, tabletext));
								HeaderTableMFRA.addCell(new Phrase(""+time, tabletext));
								HeaderTableMFRA.addCell(new Phrase(""+listMFRA.get(i).getDate(), tabletext));
								
								document.add(HeaderTableMFRA);
								HeaderTableMFRA.flushContent(); 
									
							}
						    String act =listMFRA.get(i).getActionPlan();
						    act = act.replaceAll("<b>", "");
						    act = act.replaceAll("</b>", "");
						    act = act.replaceAll("<br>", "");
						 
						 HeaderTableMFRA1.addCell(new Phrase("", tabletext));
						 HeaderTableMFRA1.addCell(new Phrase("Score", subheader));
						 HeaderTableMFRA1.addCell(new Phrase(""+listMFRA.get(i).getTotalScore(), tabletext));
						 HeaderTableMFRA1.addCell(new Phrase("Risk Level", subheader));
						 HeaderTableMFRA1.addCell(new Phrase(""+listMFRA.get(i).getRiskLevel()+" Risk", tabletext));
						 HeaderTableMFRA1.addCell(new Phrase("Action Plan", subheader));
						 HeaderTableMFRA1.addCell(new Phrase(""+act, tabletext));
						 
						document.add(HeaderTableMFRA1);
						HeaderTableMFRA1.flushContent(); 
					}
					
					HeaderTableMFRA.addCell(new Phrase("", subheader));
					HeaderTableMFRA.addCell(new Phrase("", subheader));
					HeaderTableMFRA.addCell(new Phrase("", subheader));
					HeaderTableMFRA.addCell(new Phrase("", subheader));
					HeaderTableMFRA.addCell(new Phrase("", subheader));
					HeaderTableMFRA.addCell(new Phrase("", subheader));
					HeaderTableMFRA.addCell(new Phrase("", subheader));
					HeaderTableMFRA.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableMFRA);
					HeaderTableMFRA.flushContent(); 
					
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableSpacing);
					HeaderTableSpacing.flushContent();
				}
				
				SASScoreDTO objSASDTO = new SASScoreDTO();		
				List<SASScoreDTO> listSAS = null;
				objSASDTO = objControl.fetchSASScoreAction("allDates",(treat));
				listSAS = objSASDTO.getListSAS();
				
				if(listSAS.size() > 0){
					
					PdfPTable HeaderTableSAS = new PdfPTable(5);
					int[] headerwidthSAS = {2,2,36,10,10};
					HeaderTableSAS.setWidths(headerwidthSAS);
					HeaderTableSAS.setWidthPercentage(95f);		
					HeaderTableSAS.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					HeaderTableTitle.addCell(new Phrase("", subheader));
					HeaderTableTitle.addCell(new Phrase("SAS Score", subheader));
					HeaderTableTitle.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableTitle);
					HeaderTableTitle.flushContent();
					
					HeaderTableSAS.addCell(new Phrase("#", subheader));
					HeaderTableSAS.addCell(new Phrase("", subheader));
					HeaderTableSAS.addCell(new Phrase("Action ", subheader));
					HeaderTableSAS.addCell(new Phrase("Time ", subheader));
					HeaderTableSAS.addCell(new Phrase("Date", subheader));
					
					for(int i=0;i<listSAS.size();i++){
						
					 	HeaderTableSAS.addCell(new Phrase((i+1)+".", subheader));
					 	HeaderTableSAS.addCell(new Phrase("#", subheader));
						HeaderTableSAS.addCell(new Phrase(""+listSAS.get(i).getActionPlan(), tabletext));
						HeaderTableSAS.addCell(new Phrase(""+listSAS.get(i).getTime(), tabletext));
						HeaderTableSAS.addCell(new Phrase(""+listSAS.get(i).getDate(), tabletext));
									
					}
					
					HeaderTableSAS.addCell(new Phrase("", subheader));
					HeaderTableSAS.addCell(new Phrase("", subheader));
					HeaderTableSAS.addCell(new Phrase("", subheader));
					HeaderTableSAS.addCell(new Phrase("", subheader));
					HeaderTableSAS.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableSAS);
					HeaderTableSAS.flushContent(); 
					
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					HeaderTableSpacing.addCell(new Phrase("", subheader));
					
					document.add(HeaderTableSpacing);
					HeaderTableSpacing.flushContent();

				document.add(HeaderTable1);
				HeaderTable1.flushContent();
				
				
			}
		}
			document.close();
			outStream.close();
			outStream.flush();
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
				+ e.getStackTrace()[0].getClassName() + " Method Name : "
				+ e.getStackTrace()[0].getMethodName() + " Line No :"
				+ e.getStackTrace()[0].getLineNumber());
		}
	%>
</body>
</html>