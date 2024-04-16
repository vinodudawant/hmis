<%@page import="com.hms.ehat.dto.OneDayAssessmentDTO"%>
<%@page import="com.hms.ehat.dto.NursingReAssessment1DayDTO"%>
<%@page import="com.hms.ehat.dto.assessmentpediatric2DTO"%>
<%@page import="com.hms.ehat.dto.assessmentpediatricDTO"%>
<%@page import="com.hms.ehat.controller.NursingTransactionControllerNEW"%>
<%@page import="com.hms.ehat.dto.assessmentpediatric3DTO"%>
<%@page import="com.hms.ehat.dto.PrePostChecklistDTO"%>
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
		
		Font header1 = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font header = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font header2 = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font headerTitle = new Font(Font.HELVETICA, 9, Font.BOLD);
		Font headerUnderline = new Font(Font.HELVETICA, 11, Font.BOLD | Font.UNDERLINE);
		Font subheader = new Font(Font.HELVETICA, 8, Font.BOLD);
		Font footer = new Font(Font.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);
		Font tableheader2 = new Font(Font.HELVETICA, 10, Font.BOLD);
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
		
		/* -------------------- Define Fonts ---------------------------  */	
		
		header.setColor(10, 4, 2);

		
		Font subheader1 = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font footer1 = new Font(Font.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader1 = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font tabletext1 = new Font(Font.HELVETICA, 8, Font.NORMAL);

		//Font subheader = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font tabletext2 = new Font(Font.HELVETICA, 8, Font.NORMAL);
		
		Font subheader2 = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font footer2 = new Font(Font.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		
		/* -------------------- Define Fonts ---------------------------  */
		
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
		
		//String printType="IPDNurshingPrint";
		String printType = request.getParameter("printType");
		request.setAttribute("printType", printType);
		//String user_name = (String) session1.getAttribute("userName");
		//Integer unitId = (Integer) session1.getAttribute("uId");
		
		request.setAttribute("treatmentId", request.getParameter("tid"));
		String patientID = request.getParameter("pid");

		String tratID = request.getParameter("tid");
		
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
				
			
				
				PdfPTable HeaderTable5 = new PdfPTable(4);
				int[] headerwidth5 = { 15, 40, 15, 30 };
				HeaderTable5.setWidths(headerwidth5);
				HeaderTable5.setWidthPercentage(95f);

				HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				HeaderTable5.addCell(new Phrase("", subheader));
				HeaderTable5.addCell(new Phrase("", subheader));
				HeaderTable5.addCell(new Phrase("", subheader));
				HeaderTable5.addCell(new Phrase("", subheader));
				HeaderTable5.addCell(new Phrase("", subheader));
				HeaderTable5.addCell(new Phrase("", subheader));
				HeaderTable5.addCell(new Phrase("", subheader));
				HeaderTable5.addCell(new Phrase("", subheader));
				

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
			
				
				
	  			 /* ---------------for horizontal line------ */	
				   PdfPTable HeaderTable12 = new PdfPTable(5);
					int[] headerwidth12 = { 20, 20, 50, 20, 20 };
					HeaderTable12.setWidths(headerwidth12);
					HeaderTable12.setWidthPercentage(95f);
					HeaderTable12.getDefaultCell()
							.setBorder(Rectangle.BOTTOM);
					
					//Spacing
					HeaderTable12.addCell(new Phrase("", header1));
					HeaderTable12.addCell(new Phrase("", header1));
					HeaderTable12.addCell(new Phrase("", header1));
					HeaderTable12.addCell(new Phrase("", header1));
					HeaderTable12.addCell(new Phrase("", header1));
					document.add(HeaderTable12);
					HeaderTable12.flushContent();
					
				
					
					NursingStationController nursingStationObj=(ApplicationContextUtils.getApplicationContext()).getBean(NursingStationController.class);
					OneDayAssessmentDTO oneDtoObj = new OneDayAssessmentDTO();			
					oneDtoObj=nursingStationObj.fetchAssessmentOneDayInformation(patientID,tratID);
					
				int id=0;	
				if(oneDtoObj.getListOneDay().size()>0){	
					id =oneDtoObj.getListOneDay().get(0).getIdnursing_assessment_one_day();
				}
					NursingReAssessment1DayDTO reAssDtoObj = new NursingReAssessment1DayDTO();
					reAssDtoObj=nursingStationObj.fetchReAssessment(""+id);
					
					List<NursingReAssessment1DayDTO> reAssList = new ArrayList<NursingReAssessment1DayDTO>();
					System.err.println("id"+id);
					reAssList = reAssDtoObj.getReAssessmentList();
					
					if(printType.equalsIgnoreCase("oneDayAsses")){
						if(oneDtoObj.getListOneDay().size()!=0){
						
							
						PdfPTable HeaderTable62a = new PdfPTable(3);
						int[] HeaderTable62b = {40,80,20};
						HeaderTable62a.setWidths(HeaderTable62b);
						HeaderTable62a.setWidthPercentage(95f);
						HeaderTable62a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	
					    HeaderTable62a.addCell(new Phrase("", header2));
					    HeaderTable62a.addCell(new Phrase("One Day Initial Nursing Assessment & Reassessment", header1));
					    HeaderTable62a.addCell(new Phrase("" ,header2));
					    HeaderTable62a.getDefaultCell().setBorder(Rectangle.BOTTOM);
						
					    HeaderTable62a.addCell(new Phrase("", header2));
					    HeaderTable62a.addCell(new Phrase("", header2));
					    HeaderTable62a.addCell(new Phrase("", header2));
	
						document.add(HeaderTable62a);
						HeaderTable62a.flushContent();
					 
						PdfPTable HeaderTable63a = new PdfPTable(5);
						int[] HeaderTable63b = {10,15,60,10,10};
						HeaderTable63a.setWidths(HeaderTable63b);
						HeaderTable63a.setWidthPercentage(95f);
						HeaderTable63a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						
						HeaderTable63a.addCell(new Phrase("Date: ", subheader));
						HeaderTable63a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getDate1(), tabletext2));
						HeaderTable63a.addCell(new Phrase("", header2));
						HeaderTable63a.addCell(new Phrase("Time: ", subheader));
						HeaderTable63a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTime1(), tabletext2));
						
						document.add(HeaderTable63a);
						HeaderTable63a.flushContent();
						
						PdfPTable HeaderTable64a = new PdfPTable(4);
						int[] HeaderTable64b = {10,10,15,60};
						HeaderTable64a.setWidths(HeaderTable64b);
						HeaderTable64a.setWidthPercentage(95f);
						HeaderTable64a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						
						HeaderTable64a.addCell(new Phrase("", subheader));
						HeaderTable64a.addCell(new Phrase("", subheader));
						HeaderTable64a.addCell(new Phrase("", subheader));
						HeaderTable64a.addCell(new Phrase("", subheader));
						
						HeaderTable64a.addCell(new Phrase("ID Band On: ", subheader));
						if(!oneDtoObj.getListOneDay().get(0).getChkIdBandOneDay().equalsIgnoreCase("0")){
	
							HeaderTable64a.addCell(new Phrase("Yes", tabletext2));
						}else{
							HeaderTable64a.addCell(new Phrase("No", tabletext2));
						}
						HeaderTable64a.addCell(new Phrase("Call Bell in reach: ", subheader));
						if(!oneDtoObj.getListOneDay().get(0).getChkCallBell().equalsIgnoreCase("0")){
	
							HeaderTable64a.addCell(new Phrase("Yes", tabletext2));
						}else{
							HeaderTable64a.addCell(new Phrase("No", tabletext2));
						}
						
						if(!oneDtoObj.getListOneDay().get(0).getTxtHt().equalsIgnoreCase("NULL")
								&& !oneDtoObj.getListOneDay().get(0).getTxtHt().equalsIgnoreCase("undefined")
								&& !oneDtoObj.getListOneDay().get(0).getTxtHt().equalsIgnoreCase(""))
						{
						HeaderTable64a.addCell(new Phrase("Height: ", subheader));
						HeaderTable64a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTxtHt(), tabletext2));
						}else{
							
							HeaderTable64a.addCell(new Phrase("", subheader));
							HeaderTable64a.addCell(new Phrase("", tabletext2));
							
						}
						
						if(!oneDtoObj.getListOneDay().get(0).getTxtWt().equalsIgnoreCase("NULL")
								&& !oneDtoObj.getListOneDay().get(0).getTxtWt().equalsIgnoreCase("undefined")
								&& !oneDtoObj.getListOneDay().get(0).getTxtWt().equalsIgnoreCase(""))
						{
							HeaderTable64a.addCell(new Phrase("Weight: ", subheader));
							HeaderTable64a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTxtWt(), subheader));
						}else{
							
							HeaderTable64a.addCell(new Phrase("", subheader));
							HeaderTable64a.addCell(new Phrase("", tabletext2));
							
						}
						
						
						if(!oneDtoObj.getListOneDay().get(0).getModeOneDay().equalsIgnoreCase("0"))
						{
							
						HeaderTable64a.addCell(new Phrase("Mode: ", subheader));
						if(oneDtoObj.getListOneDay().get(0).getModeOneDay().equalsIgnoreCase("ambulatoryOneDay"))
						HeaderTable64a.addCell(new Phrase("Ambulatory", tabletext2));
						else if(oneDtoObj.getListOneDay().get(0).getModeOneDay().equalsIgnoreCase("wheelChairOneDay"))
							HeaderTable64a.addCell(new Phrase("Wheel Chair", tabletext2));
						else if(oneDtoObj.getListOneDay().get(0).getModeOneDay().equalsIgnoreCase("strecherOneDay"))
							HeaderTable64a.addCell(new Phrase("Strecher", tabletext2));
						}else{
							
							HeaderTable64a.addCell(new Phrase("Mode: ", subheader));
							HeaderTable64a.addCell(new Phrase("-", tabletext2));
							
						}
						
						if(!oneDtoObj.getListOneDay().get(0).getAdmittedOneDay().equalsIgnoreCase("0"))
						{
							
						HeaderTable64a.addCell(new Phrase("Admitted As: ", subheader));
						if(oneDtoObj.getListOneDay().get(0).getAdmittedOneDay().equalsIgnoreCase("EmergencyOneDay"))
						HeaderTable64a.addCell(new Phrase("Emergency", tabletext2));
						else if(oneDtoObj.getListOneDay().get(0).getAdmittedOneDay().equalsIgnoreCase("regularAdmissionOneDay"))
							HeaderTable64a.addCell(new Phrase("Regular Admission", tabletext2));
						}else{
							HeaderTable64a.addCell(new Phrase("Admitted As: ", subheader));
							HeaderTable64a.addCell(new Phrase("-", tabletext2));
							
						}
						
						document.add(HeaderTable64a);
						HeaderTable64a.flushContent();
	
						PdfPTable HeaderTable65a = new PdfPTable(4);
						int[] HeaderTable65b = {40,55,5,60};
						HeaderTable65a.setWidths(HeaderTable65b);
						HeaderTable65a.setWidthPercentage(95f);
						HeaderTable65a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						
						
						
						if(!oneDtoObj.getListOneDay().get(0).getInfromationOneDay().equalsIgnoreCase("0"))
						{
							HeaderTable65a.addCell(new Phrase("INFORMATION OBTAINED FROM: ", subheader));
							if(oneDtoObj.getListOneDay().get(0).getInfromationOneDay().equalsIgnoreCase("PatientOneDay"))
								HeaderTable65a.addCell(new Phrase("Patient", tabletext2));
								else if(oneDtoObj.getListOneDay().get(0).getInfromationOneDay().equalsIgnoreCase("FamilyOneDay"))
									HeaderTable65a.addCell(new Phrase("Family", tabletext2));
								else if(oneDtoObj.getListOneDay().get(0).getInfromationOneDay().equalsIgnoreCase("OldChartOneDay"))
									HeaderTable65a.addCell(new Phrase("Old Chart", tabletext2));
								else if(oneDtoObj.getListOneDay().get(0).getInfromationOneDay().equalsIgnoreCase("OtherOneDay"))
									HeaderTable65a.addCell(new Phrase("Other", tabletext2));
								else if(oneDtoObj.getListOneDay().get(0).getInfromationOneDay().equalsIgnoreCase("ConsentInfoOneDay"))
									HeaderTable65a.addCell(new Phrase("Consent given to obtain information from family", tabletext2));
							}else{
							
							HeaderTable65a.addCell(new Phrase("INFORMATION OBTAINED FROM: ", subheader));
							HeaderTable65a.addCell(new Phrase("Not Known", tabletext2));
							
						}
							HeaderTable65a.addCell(new Phrase("", subheader));
							HeaderTable65a.addCell(new Phrase("", tabletext2));
						
							if(!oneDtoObj.getListOneDay().get(0).getTxtAreaEmergencyCallOneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTxtAreaEmergencyCallOneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTxtAreaEmergencyCallOneDay().equalsIgnoreCase(""))
							{
								HeaderTable65a.addCell(new Phrase("WHOM TO CALL IN AN EMERGENCY: ", subheader));
								HeaderTable65a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTxtAreaEmergencyCallOneDay(), tabletext2));
								HeaderTable65a.addCell(new Phrase("", subheader));
								HeaderTable65a.addCell(new Phrase("", tabletext2));
		
							}
							
							document.add(HeaderTable65a);
							HeaderTable65a.flushContent();
	
							PdfPTable HeaderTable13a = new PdfPTable(8);
							int[] headerwidth13b = {20,20,20,20,20,20,20,40};
							HeaderTable13a.setWidths(headerwidth13b);
							HeaderTable13a.setWidthPercentage(95f);
							HeaderTable13a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							
					 
							if(!oneDtoObj.getListOneDay().get(0).getTempratureOneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTempratureOneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTempratureOneDay().equalsIgnoreCase("")
									){
								HeaderTable13a.addCell(new Phrase("Temprature:", subheader));
								HeaderTable13a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTempratureOneDay(), tabletext2));
	
							}else{
								
								HeaderTable13a.addCell(new Phrase("Temprature:", subheader));
								HeaderTable13a.addCell(new Phrase("-", tabletext2));
	
							}
							
							if(!oneDtoObj.getListOneDay().get(0).getPulseOneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPulseOneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPulseOneDay().equalsIgnoreCase("")
									){
								HeaderTable13a.addCell(new Phrase("Pulse:", subheader));
								HeaderTable13a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getPulseOneDay(), tabletext2));
	
							}else{
								
								HeaderTable13a.addCell(new Phrase("Pulse:", subheader));
								HeaderTable13a.addCell(new Phrase("-", tabletext2));
	
							}
							
							if(!oneDtoObj.getListOneDay().get(0).getrROneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getrROneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getrROneDay().equalsIgnoreCase("")
									){
								HeaderTable13a.addCell(new Phrase("RR:", subheader));
								HeaderTable13a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getrROneDay(), tabletext2));
	
							}else{
								
								HeaderTable13a.addCell(new Phrase("RR:", subheader));
								HeaderTable13a.addCell(new Phrase("-", tabletext2));
	
							}
							
							if(!oneDtoObj.getListOneDay().get(0).getSpO2OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getSpO2OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getSpO2OneDay().equalsIgnoreCase("")
									){
								HeaderTable13a.addCell(new Phrase("SpO2:", subheader));
								HeaderTable13a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getSpO2OneDay(), tabletext2));
	
							}else{
								
								HeaderTable13a.addCell(new Phrase("SpO2:", subheader));
								HeaderTable13a.addCell(new Phrase("-", tabletext2));
	
							}
							
							if(!oneDtoObj.getListOneDay().get(0).getBloodpOneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getBloodpOneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getBloodpOneDay().equalsIgnoreCase("")
									){
								HeaderTable13a.addCell(new Phrase("BP:", subheader));
								HeaderTable13a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getBloodpOneDay(), tabletext2));
	
							}else{
								
								HeaderTable13a.addCell(new Phrase("BP:", subheader));
								HeaderTable13a.addCell(new Phrase("-", tabletext2));
	
							}
							
							
							document.add(HeaderTable13a);
							HeaderTable13a.flushContent();
							
							if(!oneDtoObj.getListOneDay().get(0).getTxtAdmittingOneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTxtAdmittingOneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTxtAdmittingOneDay().equalsIgnoreCase(""))
							{
								HeaderTable65a.addCell(new Phrase("ADMITTING DIAGNOSIS: ", subheader));
								HeaderTable65a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTxtAdmittingOneDay(), tabletext2));
								HeaderTable65a.addCell(new Phrase("", subheader));
								HeaderTable65a.addCell(new Phrase("", tabletext2));
		
							}
							
	
							if(!oneDtoObj.getListOneDay().get(0).getTxtCheifComplainOneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTxtCheifComplainOneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTxtCheifComplainOneDay().equalsIgnoreCase(""))
							{
								HeaderTable65a.addCell(new Phrase("PATIENT'S COMPLAINTS/DURATION: ", subheader));
								HeaderTable65a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTxtCheifComplainOneDay(), tabletext2));
								HeaderTable65a.addCell(new Phrase("", subheader));
								HeaderTable65a.addCell(new Phrase("", tabletext2));
		
							}
							
							document.add(HeaderTable65a);
							HeaderTable65a.flushContent();
	
							if(!oneDtoObj.getListOneDay().get(0).getAllergiesOneDay().equalsIgnoreCase("0"))
							{
								
							HeaderTable64a.addCell(new Phrase("Allergies: ", subheader));
							if(oneDtoObj.getListOneDay().get(0).getAllergiesOneDay().equalsIgnoreCase("DrugsOneDay"))
							HeaderTable64a.addCell(new Phrase("Drugs", tabletext2));
							else if(oneDtoObj.getListOneDay().get(0).getAllergiesOneDay().equalsIgnoreCase("FoodOneDay"))
								HeaderTable64a.addCell(new Phrase("Food", tabletext2));
							else if(oneDtoObj.getListOneDay().get(0).getAllergiesOneDay().equalsIgnoreCase("OtherAllergiesOneDay"))
								HeaderTable64a.addCell(new Phrase("Others", tabletext2));
							}else{
								
								HeaderTable64a.addCell(new Phrase("Allergies: ", subheader));
								HeaderTable64a.addCell(new Phrase("-", tabletext2));
							}
							HeaderTable64a.addCell(new Phrase("", subheader));
							HeaderTable64a.addCell(new Phrase("", tabletext2));
						
							document.add(HeaderTable64a);
							HeaderTable64a.flushContent();
	
							PdfPTable HeaderTable15a = new PdfPTable(3);
							int[] headerwidth15b = {60,80,20 };
							HeaderTable15a.setWidths(headerwidth15b);
							HeaderTable15a.setWidthPercentage(95f);
							HeaderTable15a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							
							
							
							HeaderTable15a.addCell(new Phrase("", header2));
							HeaderTable15a.addCell(new Phrase("", subheader2));
							HeaderTable15a.addCell(new Phrase("", header2));
							HeaderTable15a.getDefaultCell().setBorder(Rectangle.BOTTOM);
							
							HeaderTable15a.addCell(new Phrase("", header2));
							HeaderTable15a.addCell(new Phrase("", subheader2));
							HeaderTable15a.addCell(new Phrase("", header2));
							
							HeaderTable15a.addCell(new Phrase("Vulnerability Assessement", subheader2));
							HeaderTable15a.addCell(new Phrase("", subheader2));
							HeaderTable15a.addCell(new Phrase("", header2));
							document.add(HeaderTable15a);
							HeaderTable15a.flushContent();
							
							PdfPTable HeaderTable16a = new PdfPTable(5);
							int[] headerwidth16b = {10,30,10,30,10};
							HeaderTable16a.setWidths(headerwidth16b);
							HeaderTable16a.setWidthPercentage(95f);
							HeaderTable16a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							
							HeaderTable16a.addCell(new Phrase("", subheader));
							HeaderTable16a.addCell(new Phrase("", subheader));
							HeaderTable16a.addCell(new Phrase("", subheader));
							HeaderTable16a.addCell(new Phrase("", subheader));
							HeaderTable16a.addCell(new Phrase("", subheader));
										
							
							HeaderTable16a.addCell(new Phrase("S.No.", subheader));
							HeaderTable16a.addCell(new Phrase("Category", subheader));
							HeaderTable16a.addCell(new Phrase("Yes/No", subheader));
							HeaderTable16a.addCell(new Phrase("Care to be Taken", subheader));
							HeaderTable16a.addCell(new Phrase("Yes/No", subheader));
							
							HeaderTable15a.addCell(new Phrase("", header2));
							HeaderTable15a.addCell(new Phrase("", subheader2));
							HeaderTable15a.addCell(new Phrase("", header2));
							
							document.add(HeaderTable16a);
							HeaderTable16a.flushContent();
							
							document.add(HeaderTable15a);
							HeaderTable15a.flushContent();
							
							HeaderTable16a.addCell(new Phrase("1", tabletext2));
							HeaderTable16a.addCell(new Phrase("Age more than 65 years", tabletext2));
								
							if(oneDtoObj.getListOneDay().get(0).getCateOneDay1().equalsIgnoreCase("1"))
							{
									HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
							}else{
									HeaderTable16a.addCell(new Phrase("No", tabletext2));
							
							}
							
							HeaderTable16a.addCell(new Phrase("Side rails provision", tabletext2));
							
							if(oneDtoObj.getListOneDay().get(0).getCareOneDay1().equalsIgnoreCase("1"))
							{
									HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
							}else{
									HeaderTable16a.addCell(new Phrase("No", tabletext2));
							
							}
							
							HeaderTable16a.addCell(new Phrase("2", tabletext2));
							HeaderTable16a.addCell(new Phrase("Physically Challenged", tabletext2));
								
							if(oneDtoObj.getListOneDay().get(0).getCateOneDay2().equalsIgnoreCase("1"))
							{
									HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
							}else{
									HeaderTable16a.addCell(new Phrase("No", tabletext2));
							
							}
							
							HeaderTable16a.addCell(new Phrase("Low Height bed/Side Rails provision", tabletext2));
							
							if(oneDtoObj.getListOneDay().get(0).getCareOneDay2().equalsIgnoreCase("1"))
							{
									HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
							}else{
									HeaderTable16a.addCell(new Phrase("No", tabletext2));
							
							}
							
							HeaderTable16a.addCell(new Phrase("3", tabletext2));
							HeaderTable16a.addCell(new Phrase("Mentally Challenged/Mentally ill", tabletext2));
								
							if(oneDtoObj.getListOneDay().get(0).getCateOneDay3().equalsIgnoreCase("1"))
							{
									HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
							}else{
									HeaderTable16a.addCell(new Phrase("No", tabletext2));
							
							}
							
							HeaderTable16a.addCell(new Phrase("Nearer to Nursing Station", tabletext2));
							
							if(oneDtoObj.getListOneDay().get(0).getCareOneDay3().equalsIgnoreCase("1"))
							{
									HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
							}else{
									HeaderTable16a.addCell(new Phrase("No", tabletext2));
							
							}
							
							HeaderTable16a.addCell(new Phrase("4", tabletext2));
							HeaderTable16a.addCell(new Phrase("Terminally ill", tabletext2));
								
							if(oneDtoObj.getListOneDay().get(0).getCateOneDay4().equalsIgnoreCase("1"))
							{
									HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
							}else{
									HeaderTable16a.addCell(new Phrase("No", tabletext2));
							
							}
							
							HeaderTable16a.addCell(new Phrase("Continous Monitoring", tabletext2));
							
							if(oneDtoObj.getListOneDay().get(0).getCareOneDay4().equalsIgnoreCase("1"))
							{
									HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
							}else{
									HeaderTable16a.addCell(new Phrase("No", tabletext2));
							
							}
							
							HeaderTable16a.addCell(new Phrase("5", tabletext2));
							HeaderTable16a.addCell(new Phrase("Absence of Relative", tabletext2));
								
							if(oneDtoObj.getListOneDay().get(0).getCateOneDay5().equalsIgnoreCase("1"))
							{
									HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
							}else{
									HeaderTable16a.addCell(new Phrase("No", tabletext2));
							
							}
							
							
							HeaderTable16a.addCell(new Phrase("Full Time Attedndent", tabletext2));
							
							if(oneDtoObj.getListOneDay().get(0).getCareOneDay5().equalsIgnoreCase("1"))
							{
									HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
							}else{
									HeaderTable16a.addCell(new Phrase("No", tabletext2));
							
							}
							
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.getDefaultCell().setBorder(Rectangle.BOTTOM);
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							
							
							document.add(HeaderTable16a);
							HeaderTable16a.flushContent();
							
							
							
							if(!oneDtoObj.getListOneDay().get(0).getVulnerabilityLevelOneDay().equalsIgnoreCase("0"))
							{
								HeaderTable65a.addCell(new Phrase("Vulnerability level: ", subheader));
								if(!oneDtoObj.getListOneDay().get(0).getVulnerabilityLevelOneDay().equalsIgnoreCase("HighOneDay")){
								HeaderTable65a.addCell(new Phrase("High", tabletext2));
								}else if(!oneDtoObj.getListOneDay().get(0).getVulnerabilityLevelOneDay().equalsIgnoreCase("LowOneDay")){
									HeaderTable65a.addCell(new Phrase("Low", tabletext2));
								}
								
								HeaderTable65a.addCell(new Phrase("", subheader));
								HeaderTable65a.addCell(new Phrase("", tabletext2));
		
							}
	
							document.add(HeaderTable65a);
							HeaderTable65a.flushContent();
	
							
							
							PdfPTable HeaderTable17a = new PdfPTable(3);
							int[] headerwidth17b = {60,10,20};
							HeaderTable17a.setWidths(headerwidth17b);
							HeaderTable17a.setWidthPercentage(95f);
							HeaderTable17a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	
							/* try {
								String path2 = application.getRealPath("images/Hospital/pain.jpg");
								img1 = Image.getInstance(path2);
								img1.scaleAbsolute(275, 170);
								cell1 = new PdfPCell();
								cell1.addElement(new Chunk(img1, 5, -5));
								cell1.setBorder(Rectangle.NO_BORDER);
							} catch (Exception e) {
								e.printStackTrace();
							}
	
							if (img1 == null) {
								HeaderTable17a.addCell(new Phrase("", header));
							} else {
								HeaderTable17a.addCell(cell1);
							} */
							
							HeaderTable17a.addCell(new Phrase("Pain Scale: ", subheader));
							if(!oneDtoObj.getListOneDay().get(0).getIdPainScaleOneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getIdPainScaleOneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getIdPainScaleOneDay().equalsIgnoreCase("")){
								HeaderTable17a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getIdPainScaleOneDay(), tabletext2));
							}else{
								HeaderTable17a.addCell(new Phrase("", tabletext2));
							}
							
							document.add(HeaderTable17a);
							HeaderTable17a.flushContent();
							
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							
							document.add(HeaderTable16a);
							HeaderTable16a.flushContent();
							
	
							HeaderTable15a.addCell(new Phrase("Assessment of IV", subheader2));
							HeaderTable15a.addCell(new Phrase("", subheader2));
							HeaderTable15a.addCell(new Phrase("", header2));
							document.add(HeaderTable15a);
							HeaderTable15a.flushContent();
							
							
							if(!oneDtoObj.getListOneDay().get(0).getDatePickForIvAssessmentOneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getDatePickForIvAssessmentOneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getDatePickForIvAssessmentOneDay().equalsIgnoreCase(""))
							{
							HeaderTable64a.addCell(new Phrase("Date: ", subheader));
							HeaderTable64a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getDatePickForIvAssessmentOneDay(), tabletext2));
							}else
							{
								HeaderTable64a.addCell(new Phrase("Date: ", subheader));
								HeaderTable64a.addCell(new Phrase("-", subheader));
								
							}
							
							if(!oneDtoObj.getListOneDay().get(0).getGuageOneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getGuageOneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getGuageOneDay().equalsIgnoreCase(""))
							{
							HeaderTable64a.addCell(new Phrase("Guage: ", subheader));
							HeaderTable64a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getGuageOneDay(), tabletext2));
							}else
							{
								HeaderTable64a.addCell(new Phrase("Guage: ", subheader));
								HeaderTable64a.addCell(new Phrase("-", subheader));
								
							}
							
							document.add(HeaderTable64a);
							HeaderTable64a.flushContent();
							
							
							if(!oneDtoObj.getListOneDay().get(0).getVenflonOneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getVenflonOneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getVenflonOneDay().equalsIgnoreCase(""))
							{
								HeaderTable65a.addCell(new Phrase("Part/Central Line/Venflon: ", subheader));
								HeaderTable65a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getVenflonOneDay(), tabletext2));
								HeaderTable65a.addCell(new Phrase("", subheader));
								HeaderTable65a.addCell(new Phrase("", tabletext2));
		
							}
							
							if(!oneDtoObj.getListOneDay().get(0).getChangeOnOneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getChangeOnOneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getChangeOnOneDay().equalsIgnoreCase(""))
							{
								HeaderTable65a.addCell(new Phrase("Change on: ", subheader));
								HeaderTable65a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getChangeOnOneDay(), tabletext2));
								HeaderTable65a.addCell(new Phrase("", subheader));
								HeaderTable65a.addCell(new Phrase("", tabletext2));
		
							}
							
							
							if(!oneDtoObj.getListOneDay().get(0).getSiteOneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getSiteOneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getSiteOneDay().equalsIgnoreCase(""))
							{
								HeaderTable65a.addCell(new Phrase("Site: ", subheader));
								HeaderTable65a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getSiteOneDay(), tabletext2));
								HeaderTable65a.addCell(new Phrase("", subheader));
								HeaderTable65a.addCell(new Phrase("", tabletext2));
		
							}
							
							document.add(HeaderTable65a);
							HeaderTable65a.flushContent();
							
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							
							document.add(HeaderTable16a);
							HeaderTable16a.flushContent();
							
							PdfPTable HeaderTable66a = new PdfPTable(6);
							int[] HeaderTable66b = {20,20,20,20,20,20};
							HeaderTable66a.setWidths(HeaderTable66b);
							HeaderTable66a.setWidthPercentage(95f);
							HeaderTable66a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							
							if(!oneDtoObj.getListOneDay().get(0).getTime01OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTime01OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTime01OneDay().equalsIgnoreCase(""))
							{
								HeaderTable66a.addCell(new Phrase("Time: ", subheader));
								HeaderTable66a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTime01OneDay(), tabletext2));
		
							}else{
								
								HeaderTable66a.addCell(new Phrase("Time: ", subheader));
								HeaderTable66a.addCell(new Phrase("-", subheader));
							}
							
							if(!oneDtoObj.getListOneDay().get(0).getTime02OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTime02OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTime02OneDay().equalsIgnoreCase(""))
							{
								HeaderTable66a.addCell(new Phrase("Time: ", subheader));
								HeaderTable66a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTime02OneDay(), tabletext2));
		
							}else{
								
								HeaderTable66a.addCell(new Phrase("Time: ", subheader));
								HeaderTable66a.addCell(new Phrase("-", subheader));
							}
							
							if(!oneDtoObj.getListOneDay().get(0).getTime03OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTime03OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTime03OneDay().equalsIgnoreCase(""))
							{
								HeaderTable66a.addCell(new Phrase("Time: ", subheader));
								HeaderTable66a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTime03OneDay(), tabletext2));
		
							}else{
								
								HeaderTable66a.addCell(new Phrase("Time: ", subheader));
								HeaderTable66a.addCell(new Phrase("-", subheader));
							}
							
							document.add(HeaderTable66a);
							HeaderTable66a.flushContent();
							
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							
							document.add(HeaderTable16a);
							HeaderTable16a.flushContent();
							
							
							PdfPTable HeaderTable67a = new PdfPTable(4);
							int[] HeaderTable67b = {20,20,20,20};
							HeaderTable67a.setWidths(HeaderTable67b);
							HeaderTable67a.setWidthPercentage(95f);
							HeaderTable67a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							
							if(!oneDtoObj.getListOneDay().get(0).getInfiltration01OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getInfiltration01OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getInfiltration01OneDay().equalsIgnoreCase("")||
									!oneDtoObj.getListOneDay().get(0).getInfiltration03OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getInfiltration03OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getInfiltration03OneDay().equalsIgnoreCase("")||
									!oneDtoObj.getListOneDay().get(0).getInfiltration05OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getInfiltration05OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getInfiltration05OneDay().equalsIgnoreCase("")||
									!oneDtoObj.getListOneDay().get(0).getSwelling01OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getSwelling01OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getSwelling01OneDay().equalsIgnoreCase("")||
									!oneDtoObj.getListOneDay().get(0).getSwelling03OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getSwelling03OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getSwelling03OneDay().equalsIgnoreCase("")||
									!oneDtoObj.getListOneDay().get(0).getSwelling05OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getSwelling05OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getSwelling05OneDay().equalsIgnoreCase("")||
									!oneDtoObj.getListOneDay().get(0).getRedness01OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getRedness01OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getRedness01OneDay().equalsIgnoreCase("")||
									!oneDtoObj.getListOneDay().get(0).getRedness03OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getRedness03OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getRedness03OneDay().equalsIgnoreCase("")||
									!oneDtoObj.getListOneDay().get(0).getRedness05OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getRedness05OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getRedness05OneDay().equalsIgnoreCase("")||
									!oneDtoObj.getListOneDay().get(0).getPain01OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPain01OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPain01OneDay().equalsIgnoreCase("")||
									!oneDtoObj.getListOneDay().get(0).getPain03OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPain03OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPain03OneDay().equalsIgnoreCase("")||
									!oneDtoObj.getListOneDay().get(0).getPain05OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPain05OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPain05OneDay().equalsIgnoreCase("")||
									!oneDtoObj.getListOneDay().get(0).getThrombophlebitis1OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getThrombophlebitis1OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getThrombophlebitis1OneDay().equalsIgnoreCase("")||
									!oneDtoObj.getListOneDay().get(0).getThrombophlebitis3OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getThrombophlebitis3OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getThrombophlebitis3OneDay().equalsIgnoreCase("")||
									!oneDtoObj.getListOneDay().get(0).getThrombophlebitis5OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getThrombophlebitis5OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getThrombophlebitis5OneDay().equalsIgnoreCase(""))
							{
							
							HeaderTable67a.addCell(new Phrase("Observation: ", subheader));
							HeaderTable67a.addCell(new Phrase("Status", subheader));
							HeaderTable67a.addCell(new Phrase("Status", subheader));
							HeaderTable67a.addCell(new Phrase("Status", subheader));
							
							HeaderTable67a.addCell(new Phrase("1.Infiltration: ", subheader));
							if(!oneDtoObj.getListOneDay().get(0).getInfiltration01OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getInfiltration01OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getInfiltration01OneDay().equalsIgnoreCase("")
									&& !oneDtoObj.getListOneDay().get(0).getInfiltration01OneDay().equalsIgnoreCase("0"))
							HeaderTable67a.addCell(new Phrase("Yes", tabletext2));
							else
							HeaderTable67a.addCell(new Phrase("No", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getInfiltration03OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getInfiltration03OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getInfiltration03OneDay().equalsIgnoreCase("")
									&& !oneDtoObj.getListOneDay().get(0).getInfiltration03OneDay().equalsIgnoreCase("0"))
							HeaderTable67a.addCell(new Phrase("Yes", tabletext2));
							else
							HeaderTable67a.addCell(new Phrase("No", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getInfiltration05OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getInfiltration05OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getInfiltration05OneDay().equalsIgnoreCase("")
									&& !oneDtoObj.getListOneDay().get(0).getInfiltration05OneDay().equalsIgnoreCase("0"))
							HeaderTable67a.addCell(new Phrase("Yes", tabletext2));
							else
							HeaderTable67a.addCell(new Phrase("No", tabletext2));
							
							
							HeaderTable67a.addCell(new Phrase("2.Swelling: ", subheader));
							if(!oneDtoObj.getListOneDay().get(0).getSwelling01OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getSwelling01OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getSwelling01OneDay().equalsIgnoreCase("")
									&& !oneDtoObj.getListOneDay().get(0).getSwelling01OneDay().equalsIgnoreCase("0"))
							HeaderTable67a.addCell(new Phrase("Yes", tabletext2));
							else
							HeaderTable67a.addCell(new Phrase("No", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getSwelling03OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getSwelling03OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getSwelling03OneDay().equalsIgnoreCase("")
									&& !oneDtoObj.getListOneDay().get(0).getSwelling03OneDay().equalsIgnoreCase("0"))
							HeaderTable67a.addCell(new Phrase("Yes", tabletext2));
							else
							HeaderTable67a.addCell(new Phrase("No", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getSwelling05OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getSwelling05OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getSwelling05OneDay().equalsIgnoreCase("")
									&& !oneDtoObj.getListOneDay().get(0).getSwelling05OneDay().equalsIgnoreCase("0"))
							HeaderTable67a.addCell(new Phrase("Yes", tabletext2));
							else
							HeaderTable67a.addCell(new Phrase("No", tabletext2));
							
	
							HeaderTable67a.addCell(new Phrase("3.Redness: ", subheader));
							if(!oneDtoObj.getListOneDay().get(0).getRedness01OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getRedness01OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getRedness01OneDay().equalsIgnoreCase("")
									&& !oneDtoObj.getListOneDay().get(0).getRedness01OneDay().equalsIgnoreCase("0"))
							HeaderTable67a.addCell(new Phrase("Yes", tabletext2));
							else
							HeaderTable67a.addCell(new Phrase("No", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getRedness03OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getRedness03OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getRedness03OneDay().equalsIgnoreCase("")
									&& !oneDtoObj.getListOneDay().get(0).getRedness03OneDay().equalsIgnoreCase("0"))
							HeaderTable67a.addCell(new Phrase("Yes", tabletext2));
							else
							HeaderTable67a.addCell(new Phrase("No", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getRedness05OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getRedness05OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getRedness05OneDay().equalsIgnoreCase("")
									&& !oneDtoObj.getListOneDay().get(0).getRedness05OneDay().equalsIgnoreCase("0"))
							HeaderTable67a.addCell(new Phrase("Yes", tabletext2));
							else
							HeaderTable67a.addCell(new Phrase("No", tabletext2));
							
							
	
							HeaderTable67a.addCell(new Phrase("4.Pain: ", subheader));
							if(!oneDtoObj.getListOneDay().get(0).getPain01OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPain01OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPain01OneDay().equalsIgnoreCase("")
									&& !oneDtoObj.getListOneDay().get(0).getPain01OneDay().equalsIgnoreCase("0"))
							HeaderTable67a.addCell(new Phrase("Yes", tabletext2));
							else
							HeaderTable67a.addCell(new Phrase("No", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getPain03OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPain03OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPain03OneDay().equalsIgnoreCase("")
									&& !oneDtoObj.getListOneDay().get(0).getPain03OneDay().equalsIgnoreCase("0"))
							HeaderTable67a.addCell(new Phrase("Yes", tabletext2));
							else
							HeaderTable67a.addCell(new Phrase("No", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getPain05OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPain05OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPain05OneDay().equalsIgnoreCase("")
									&& !oneDtoObj.getListOneDay().get(0).getPain05OneDay().equalsIgnoreCase("0"))
							HeaderTable67a.addCell(new Phrase("Yes", tabletext2));
							else
							HeaderTable67a.addCell(new Phrase("No", tabletext2));
							
							
	
							HeaderTable67a.addCell(new Phrase("4.Thrombophlebitis: ", subheader));
							if(!oneDtoObj.getListOneDay().get(0).getThrombophlebitis1OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getThrombophlebitis1OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getThrombophlebitis1OneDay().equalsIgnoreCase("")
									&& !oneDtoObj.getListOneDay().get(0).getThrombophlebitis1OneDay().equalsIgnoreCase("0"))
							HeaderTable67a.addCell(new Phrase("Yes", tabletext2));
							else
							HeaderTable67a.addCell(new Phrase("No", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getThrombophlebitis3OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getThrombophlebitis3OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getThrombophlebitis3OneDay().equalsIgnoreCase("")
									&& !oneDtoObj.getListOneDay().get(0).getThrombophlebitis3OneDay().equalsIgnoreCase("0"))
							HeaderTable67a.addCell(new Phrase("Yes", tabletext2));
							else
							HeaderTable67a.addCell(new Phrase("No", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getThrombophlebitis5OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getThrombophlebitis5OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getThrombophlebitis5OneDay().equalsIgnoreCase("")
									&& !oneDtoObj.getListOneDay().get(0).getThrombophlebitis5OneDay().equalsIgnoreCase("0"))
							HeaderTable67a.addCell(new Phrase("Yes", tabletext2));
							else{
							HeaderTable67a.addCell(new Phrase("No", tabletext2));
							}
							
							
							document.add(HeaderTable67a);
							HeaderTable67a.flushContent();
							
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							HeaderTable16a.addCell(new Phrase("", tabletext2));
							
							document.add(HeaderTable16a);
							HeaderTable16a.flushContent();
							
							
							}
							
							
							
							HeaderTable15a.addCell(new Phrase("NURSING RE ASSESSMENT OF VITAL SIGNS EVERY 3 HRS", subheader2));
							HeaderTable15a.addCell(new Phrase("", subheader2));
							HeaderTable15a.addCell(new Phrase("", header2));
							document.add(HeaderTable15a);
							HeaderTable15a.flushContent();
							
							
							PdfPTable HeaderTable68a = new PdfPTable(6);
							int[] HeaderTable68b = {20,20,20,20,20,20};
							HeaderTable68a.setWidths(HeaderTable68b);
							HeaderTable68a.setWidthPercentage(95f);
							HeaderTable68a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							
							boolean reAssFlag = true;
							System.err.println("reAssList Size "+reAssList.size());
							for(NursingReAssessment1DayDTO ObjList: reAssList){
								
								if(reAssFlag){
									
									HeaderTable68a.addCell(new Phrase("Time", subheader));
									HeaderTable68a.addCell(new Phrase("Temp (*F)", subheader));
									HeaderTable68a.addCell(new Phrase("Pulse (/min)", subheader));
									HeaderTable68a.addCell(new Phrase("R.R (/min)", subheader));
									HeaderTable68a.addCell(new Phrase("B.P.(mm/Hg)", subheader));
									HeaderTable68a.addCell(new Phrase("Pain (0-10)", subheader));
									reAssFlag = false;
								}
								System.err.println("Slave Id"+ObjList.getReAssessmentId());
								HeaderTable68a.addCell(new Phrase(ObjList.getReAssessmentTime(), subheader));
								HeaderTable68a.addCell(new Phrase(ObjList.getReAssessmentTemp(), subheader));
								HeaderTable68a.addCell(new Phrase(ObjList.getReAssessmentPulse(), subheader));
								HeaderTable68a.addCell(new Phrase(ObjList.getReAssessmentRR(), subheader));
								HeaderTable68a.addCell(new Phrase(ObjList.getReAssessmentBP(), subheader));
								HeaderTable68a.addCell(new Phrase(ObjList.getReAssessmentPain(), subheader));
								
							}	
							
							HeaderTable68a.addCell(new Phrase("", subheader));
							HeaderTable68a.addCell(new Phrase("", subheader));
							HeaderTable68a.addCell(new Phrase("", subheader));
							HeaderTable68a.addCell(new Phrase("", subheader));
							HeaderTable68a.addCell(new Phrase("", subheader));
							HeaderTable68a.addCell(new Phrase("", subheader));
							
							document.add(HeaderTable68a);
							HeaderTable68a.flushContent();
							
							/* HeaderTable68a.addCell(new Phrase("Time", subheader));
							HeaderTable68a.addCell(new Phrase("Temp (*F)", subheader));
							HeaderTable68a.addCell(new Phrase("Pulse (/min)", subheader));
							HeaderTable68a.addCell(new Phrase("R.R (/min)", subheader));
							HeaderTable68a.addCell(new Phrase("B.P.(mm/Hg)", subheader));
							HeaderTable68a.addCell(new Phrase("Pain (0-10)", subheader)); */
							
							/* if(!oneDtoObj.getListOneDay().get(0).getTime001OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTime001OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTime001OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTime001OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getTemp001OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTemp001OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTemp001OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTemp001OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
						
							if(!oneDtoObj.getListOneDay().get(0).getPulse001OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPulse001OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPulse001OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getPulse001OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
						
							
							if(!oneDtoObj.getListOneDay().get(0).getrR001OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getrR001OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getrR001OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getrR001OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
						
							
							if(!oneDtoObj.getListOneDay().get(0).getbP001OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getbP001OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getbP001OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getbP001OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
						
							
							if(!oneDtoObj.getListOneDay().get(0).getPain001OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPain001OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPain001OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getPain001OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
						
							
							
							if(!oneDtoObj.getListOneDay().get(0).getTime002OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTime002OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTime002OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTime002OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getTemp002OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTemp002OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTemp002OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTemp002OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
						
							if(!oneDtoObj.getListOneDay().get(0).getPulse002OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPulse002OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPulse002OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getPulse002OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
						
							
							if(!oneDtoObj.getListOneDay().get(0).getrR002OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getrR002OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getrR002OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getrR002OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
						
							
							if(!oneDtoObj.getListOneDay().get(0).getbP002OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getbP002OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getbP002OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getbP002OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
						
							
							if(!oneDtoObj.getListOneDay().get(0).getPain002OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPain002OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPain002OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getPain002OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2)); 
						
							
							if(!oneDtoObj.getListOneDay().get(0).getTime003OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTime003OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTime003OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTime003OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getTemp003OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTemp003OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTemp003OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTemp003OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
						
							if(!oneDtoObj.getListOneDay().get(0).getPulse003OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPulse003OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPulse003OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getPulse003OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
						
							
							if(!oneDtoObj.getListOneDay().get(0).getrR003OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getrR003OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getrR003OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getrR003OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
						
							
							if(!oneDtoObj.getListOneDay().get(0).getbP003OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getbP003OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getbP003OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getbP003OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
						
							
							if(!oneDtoObj.getListOneDay().get(0).getPain003OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPain003OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPain003OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getPain003OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
						
							
							
							if(!oneDtoObj.getListOneDay().get(0).getTime004OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTime004OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTime004OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTime004OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getTemp004OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTemp004OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTemp004OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTemp004OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
						
							if(!oneDtoObj.getListOneDay().get(0).getPulse004OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPulse004OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPulse004OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getPulse004OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
						
							
							if(!oneDtoObj.getListOneDay().get(0).getrR004OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getrR004OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getrR004OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getrR004OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
						
							
							if(!oneDtoObj.getListOneDay().get(0).getbP004OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getbP004OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getbP004OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getbP004OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2));
						
							
							if(!oneDtoObj.getListOneDay().get(0).getPain004OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPain004OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPain004OneDay().equalsIgnoreCase(""))
								HeaderTable68a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getPain004OneDay(), tabletext2));
							else
								HeaderTable68a.addCell(new Phrase("-", tabletext2)); */
						
							HeaderTable15a.addCell(new Phrase("INTAKE OUTPUT CHART", subheader2));
							HeaderTable15a.addCell(new Phrase("", subheader2));
							HeaderTable15a.addCell(new Phrase("", header2));
							document.add(HeaderTable15a);
							HeaderTable15a.flushContent();
							
							PdfPTable HeaderTable69a = new PdfPTable(4);
							int[] HeaderTable69b = {20,20,20,20};
							HeaderTable69a.setWidths(HeaderTable69b);
							HeaderTable69a.setWidthPercentage(95f);
							HeaderTable69a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							
							boolean intakeFlag = true;
							System.err.println("intake Size "+oneDtoObj.getoTList().size());
							for(int i=0; i< oneDtoObj.getoTList().size();i++){
								
								if(intakeFlag){
									
									HeaderTable69a.addCell(new Phrase("Time", subheader));
									HeaderTable69a.addCell(new Phrase("IV-FLUID", subheader));
									HeaderTable69a.addCell(new Phrase("AMOUNT (in/ml)", subheader));
									HeaderTable69a.addCell(new Phrase("URINE OUTPUT", subheader));
									intakeFlag=false;
								}
								
								HeaderTable69a.addCell(new Phrase(""+oneDtoObj.getoTList().get(i).getTime(), subheader));
								HeaderTable69a.addCell(new Phrase(""+oneDtoObj.getoTList().get(i).getIv(), subheader));
								HeaderTable69a.addCell(new Phrase(""+oneDtoObj.getoTList().get(i).getAmt(), subheader));
								HeaderTable69a.addCell(new Phrase(""+oneDtoObj.getoTList().get(i).getUrine(), subheader));
							} 
							
							HeaderTable69a.addCell(new Phrase("", subheader));
							HeaderTable69a.addCell(new Phrase("", subheader));
							HeaderTable69a.addCell(new Phrase("", subheader));
							HeaderTable69a.addCell(new Phrase("", subheader));
							
							document.add(HeaderTable69a);
							HeaderTable69a.flushContent();
							
							/* if(!oneDtoObj.getListOneDay().get(0).getTime0001OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTime0001OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTime0001OneDay().equalsIgnoreCase(""))
								HeaderTable69a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTime0001OneDay(), tabletext2));
							else
								HeaderTable69a.addCell(new Phrase("-", tabletext2));
							
	
							if(!oneDtoObj.getListOneDay().get(0).getiV0001OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getiV0001OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getiV0001OneDay().equalsIgnoreCase(""))
								HeaderTable69a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getiV0001OneDay(), tabletext2));
							else
								HeaderTable69a.addCell(new Phrase("-", tabletext2));
							
							
							if(!oneDtoObj.getListOneDay().get(0).getAmt0001OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getAmt0001OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getAmt0001OneDay().equalsIgnoreCase(""))
								HeaderTable69a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getAmt0001OneDay(), tabletext2));
							else
								HeaderTable69a.addCell(new Phrase("-", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getUrn0001OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getUrn0001OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getUrn0001OneDay().equalsIgnoreCase(""))
								HeaderTable69a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getUrn0001OneDay(), tabletext2));
							else
								HeaderTable69a.addCell(new Phrase("-", tabletext2));
								
							
							if(!oneDtoObj.getListOneDay().get(0).getTime0002OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTime0002OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTime0002OneDay().equalsIgnoreCase(""))
								HeaderTable69a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTime0002OneDay(), tabletext2));
							else
								HeaderTable69a.addCell(new Phrase("-", tabletext2));
							
	
							if(!oneDtoObj.getListOneDay().get(0).getiV0002OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getiV0002OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getiV0002OneDay().equalsIgnoreCase(""))
								HeaderTable69a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getiV0002OneDay(), tabletext2));
							else
								HeaderTable69a.addCell(new Phrase("-", tabletext2));
							
							
							if(!oneDtoObj.getListOneDay().get(0).getAmt0002OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getAmt0002OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getAmt0002OneDay().equalsIgnoreCase(""))
								HeaderTable69a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getAmt0002OneDay(), tabletext2));
							else
								HeaderTable69a.addCell(new Phrase("-", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getUrn0002OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getUrn0002OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getUrn0002OneDay().equalsIgnoreCase(""))
								HeaderTable69a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getUrn0002OneDay(), tabletext2));
							else
								HeaderTable69a.addCell(new Phrase("-", tabletext2));
								
							
							
							
							if(!oneDtoObj.getListOneDay().get(0).getTime0003OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTime0003OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTime0003OneDay().equalsIgnoreCase(""))
								HeaderTable69a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTime0003OneDay(), tabletext2));
							else
								HeaderTable69a.addCell(new Phrase("-", tabletext2));
							
	
							if(!oneDtoObj.getListOneDay().get(0).getiV0003OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getiV0003OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getiV0003OneDay().equalsIgnoreCase(""))
								HeaderTable69a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getiV0003OneDay(), tabletext2));
							else
								HeaderTable69a.addCell(new Phrase("-", tabletext2));
							
							
							if(!oneDtoObj.getListOneDay().get(0).getAmt0003OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getAmt0003OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getAmt0003OneDay().equalsIgnoreCase(""))
								HeaderTable69a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getAmt0003OneDay(), tabletext2));
							else
								HeaderTable69a.addCell(new Phrase("-", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getUrn0003OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getUrn0003OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getUrn0003OneDay().equalsIgnoreCase(""))
								HeaderTable69a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getUrn0003OneDay(), tabletext2));
							else
								HeaderTable69a.addCell(new Phrase("-", tabletext2));
								
							
							
							
							if(!oneDtoObj.getListOneDay().get(0).getTime0004OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getTime0004OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getTime0004OneDay().equalsIgnoreCase(""))
								HeaderTable69a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getTime0004OneDay(), tabletext2));
							else
								HeaderTable69a.addCell(new Phrase("-", tabletext2));
							
	
							if(!oneDtoObj.getListOneDay().get(0).getiV0004OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getiV0004OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getiV0004OneDay().equalsIgnoreCase(""))
								HeaderTable69a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getiV0004OneDay(), tabletext2));
							else
								HeaderTable69a.addCell(new Phrase("-", tabletext2));
							
							
							if(!oneDtoObj.getListOneDay().get(0).getAmt0004OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getAmt0004OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getAmt0004OneDay().equalsIgnoreCase(""))
								HeaderTable69a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getAmt0004OneDay(), tabletext2));
							else
								HeaderTable69a.addCell(new Phrase("-", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getUrn0004OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getUrn0004OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getUrn0004OneDay().equalsIgnoreCase(""))
								HeaderTable69a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getUrn0004OneDay(), tabletext2));
							else
								HeaderTable69a.addCell(new Phrase("-", tabletext2)); */
								
							document.add(HeaderTable69a);
							HeaderTable69a.flushContent();
	
							HeaderTable15a.addCell(new Phrase("Nursing Care Plan", subheader2));
							HeaderTable15a.addCell(new Phrase("", subheader2));
							HeaderTable15a.addCell(new Phrase("", header2));
							document.add(HeaderTable15a);
							HeaderTable15a.flushContent();
							
							PdfPTable HeaderTable70a = new PdfPTable(6);
							int[] HeaderTable70b = {20,20,20,20,20,20};
							HeaderTable70a.setWidths(HeaderTable70b);
							HeaderTable70a.setWidthPercentage(95f);
							HeaderTable70a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							
							HeaderTable70a.addCell(new Phrase("Shift", subheader));
							HeaderTable70a.addCell(new Phrase("Assessment", subheader));
							HeaderTable70a.addCell(new Phrase("Nursing Diagnosis", subheader));
							HeaderTable70a.addCell(new Phrase("Planning", subheader));
							HeaderTable70a.addCell(new Phrase("Intervention", subheader));
							HeaderTable70a.addCell(new Phrase("Evaluation", subheader));
							
							
							
							
							HeaderTable70a.addCell(new Phrase("Morning", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getAssessment01OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getAssessment01OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getAssessment01OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getAssessment01OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							
							if(!oneDtoObj.getListOneDay().get(0).getDiagnosis01OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getDiagnosis01OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getDiagnosis01OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getDiagnosis01OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							
							if(!oneDtoObj.getListOneDay().get(0).getPlanning01OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPlanning01OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPlanning01OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getPlanning01OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							if(!oneDtoObj.getListOneDay().get(0).getIntervention01OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getIntervention01OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getIntervention01OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getIntervention01OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							if(!oneDtoObj.getListOneDay().get(0).getEvaluation01OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getEvaluation01OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getEvaluation01OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getEvaluation01OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							
							
							HeaderTable70a.addCell(new Phrase("Evening", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getAssessment02OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getAssessment02OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getAssessment02OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getAssessment02OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							
							if(!oneDtoObj.getListOneDay().get(0).getDiagnosis02OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getDiagnosis02OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getDiagnosis02OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getDiagnosis02OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							
							if(!oneDtoObj.getListOneDay().get(0).getPlanning02OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPlanning02OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPlanning02OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getPlanning02OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							if(!oneDtoObj.getListOneDay().get(0).getIntervention02OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getIntervention02OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getIntervention02OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getIntervention02OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							if(!oneDtoObj.getListOneDay().get(0).getEvaluation02OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getEvaluation02OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getEvaluation02OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getEvaluation02OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							
							
							HeaderTable70a.addCell(new Phrase("Noon", tabletext2));
							
							if(!oneDtoObj.getListOneDay().get(0).getAssessment03OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getAssessment03OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getAssessment03OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getAssessment03OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							
							if(!oneDtoObj.getListOneDay().get(0).getDiagnosis03OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getDiagnosis03OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getDiagnosis03OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getDiagnosis03OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							
							if(!oneDtoObj.getListOneDay().get(0).getPlanning03OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPlanning03OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPlanning03OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getPlanning03OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							if(!oneDtoObj.getListOneDay().get(0).getIntervention03OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getIntervention03OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getIntervention03OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getIntervention03OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							if(!oneDtoObj.getListOneDay().get(0).getEvaluation03OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getEvaluation03OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getEvaluation03OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getEvaluation03OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							
							
							if(!oneDtoObj.getListOneDay().get(0).getShift004OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getShift004OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getShift004OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getShift004OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							
							if(!oneDtoObj.getListOneDay().get(0).getAssessment04OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getAssessment04OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getAssessment04OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getAssessment04OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							
							if(!oneDtoObj.getListOneDay().get(0).getDiagnosis04OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getDiagnosis04OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getDiagnosis04OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getDiagnosis04OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							
							if(!oneDtoObj.getListOneDay().get(0).getPlanning04OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getPlanning04OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getPlanning04OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getPlanning04OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							if(!oneDtoObj.getListOneDay().get(0).getIntervention04OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getIntervention04OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getIntervention04OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getIntervention04OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
								
							if(!oneDtoObj.getListOneDay().get(0).getEvaluation04OneDay().equalsIgnoreCase("NULL")
									&& !oneDtoObj.getListOneDay().get(0).getEvaluation04OneDay().equalsIgnoreCase("undefined")
									&& !oneDtoObj.getListOneDay().get(0).getEvaluation04OneDay().equalsIgnoreCase(""))
								HeaderTable70a.addCell(new Phrase(oneDtoObj.getListOneDay().get(0).getEvaluation04OneDay(), tabletext2));
							else
								HeaderTable70a.addCell(new Phrase("-", tabletext2));
							
	
							document.add(HeaderTable70a);
							HeaderTable70a.flushContent();
							
						}
						
				 }
						
				//Ending of Nursing Assessment
					
			    	PdfPTable HeaderTable12u = new PdfPTable(3);
					int[] headerwidth12u = { 33, 33, 33};
					HeaderTable12u.setWidths(headerwidth12u);
					HeaderTable12u.setWidthPercentage(95f);
					HeaderTable12u.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
					
					

				document.add(HeaderTable1);
				HeaderTable1.flushContent();
				
				
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