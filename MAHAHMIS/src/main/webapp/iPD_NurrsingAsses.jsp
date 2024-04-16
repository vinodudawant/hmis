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
	  			HeaderTable12.getDefaultCell().setBorder(Rectangle.BOTTOM);

	  			//Spacing
	  			HeaderTable12.addCell(new Phrase("", header1));
	  			HeaderTable12.addCell(new Phrase("", header1));
	  			HeaderTable12.addCell(new Phrase("", header1));
	  			HeaderTable12.addCell(new Phrase("", header1));
	  			HeaderTable12.addCell(new Phrase("", header1));
	  			document.add(HeaderTable12);
	  			HeaderTable12.flushContent();

	  			NursingStationController nursingStationObj = (ApplicationContextUtils.getApplicationContext())
	  					.getBean(NursingStationController.class);
	  			
	  			NursingTransactionControllerNEW transactionServiceNEW = (ApplicationContextUtils.getApplicationContext())
	  					.getBean(NursingTransactionControllerNEW.class);
	  			
	  			assessmentpediatricDTO assessmentDtoObj = new assessmentpediatricDTO();
	  			assessmentDtoObj = nursingStationObj.fetchInitalNursingAssessment(patientID, tratID);

	  			assessmentpediatric2DTO assessmentDt2oObj = new assessmentpediatric2DTO();
	  			assessmentDt2oObj = nursingStationObj.fetchInitalNursingAssessment2(patientID, tratID);

	  			assessmentpediatric3DTO assessmentDt3oObj = new assessmentpediatric3DTO();
	  			assessmentDt3oObj = nursingStationObj.fetchInitalNursing3Page(patientID, tratID);

	  			PrePostChecklistDTO preDtoObj = new PrePostChecklistDTO();
	  			preDtoObj = transactionServiceNEW.fetchprepostData(patientID,tratID);

	  			if (printType.equalsIgnoreCase("NurrsingAsses")) {
	  				//Starting of Nursing Assessment
	  				PdfPTable HeaderTable10a = new PdfPTable(3);
	  				int[] headerwidth10b = { 40, 80, 20 };
	  				HeaderTable10a.setWidths(headerwidth10b);
	  				HeaderTable10a.setWidthPercentage(95f);
	  				HeaderTable10a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  				//Spacing
	  				HeaderTable10a.addCell(new Phrase("", header2));
	  				HeaderTable10a.addCell(new Phrase("", header2));
	  				HeaderTable10a.addCell(new Phrase("", header2));

	  				HeaderTable10a.addCell(new Phrase("", header2));
	  				HeaderTable10a.addCell(new Phrase("Nursing Initial Assessment Form - Paediatric", header1));
	  				HeaderTable10a.addCell(new Phrase("", header2));
	  				HeaderTable10a.getDefaultCell().setBorder(Rectangle.BOTTOM);

	  				HeaderTable10a.addCell(new Phrase("", header2));
	  				HeaderTable10a.addCell(new Phrase("", header2));
	  				HeaderTable10a.addCell(new Phrase("", header2));

	  				document.add(HeaderTable10a);
	  				HeaderTable10a.flushContent();

	  				PdfPTable HeaderTable15a = new PdfPTable(3);
	  				int[] headerwidth15b = { 60, 80, 20 };
	  				HeaderTable15a.setWidths(headerwidth15b);
	  				HeaderTable15a.setWidthPercentage(95f);
	  				HeaderTable15a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  				PdfPTable HeaderTable14a = new PdfPTable(2);
	  				int[] headerwidth14b = { 30, 70 };
	  				HeaderTable14a.setWidths(headerwidth14b);
	  				HeaderTable14a.setWidthPercentage(95f);
	  				HeaderTable14a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  				if (assessmentDtoObj.getListpediatric().size() != 0) {
	  					PdfPTable HeaderTable11a = new PdfPTable(6);
	  					int[] headerwidth11b = { 20, 20, 20, 20, 20, 20 };
	  					HeaderTable11a.setWidths(headerwidth11b);
	  					HeaderTable11a.setWidthPercentage(95f);
	  					HeaderTable11a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					HeaderTable11a.addCell(new Phrase("", subheader2));
	  					HeaderTable11a.addCell(new Phrase("", tabletext2));
	  					HeaderTable11a.addCell(new Phrase("", subheader2));
	  					HeaderTable11a.addCell(new Phrase("", tabletext2));
	  					HeaderTable11a.addCell(new Phrase("", subheader2));
	  					HeaderTable11a.addCell(new Phrase("", tabletext2));

	  					if (!assessmentDtoObj.getListpediatric().get(0).getDateOfAdmission().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getDateOfAdmission()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getDateOfAdmission().equalsIgnoreCase("")) {
	  						HeaderTable11a.addCell(new Phrase("Date of Admission:", subheader));
	  						HeaderTable11a.addCell(new Phrase(
	  								assessmentDtoObj.getListpediatric().get(0).getDateOfAdmission(), tabletext2));

	  					} else {

	  						HeaderTable11a.addCell(new Phrase("Date of Admission:", subheader));
	  						HeaderTable11a.addCell(new Phrase("", tabletext2));

	  					}

	  					if (!assessmentDtoObj.getListpediatric().get(0).getRecievedTime().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getRecievedTime()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getRecievedTime().equalsIgnoreCase("")) {
	  						HeaderTable11a.addCell(new Phrase("Recieved Time: ", subheader));
	  						HeaderTable11a.addCell(
	  								new Phrase(assessmentDtoObj.getListpediatric().get(0).getRecievedTime(), tabletext2));

	  					} else {

	  						HeaderTable11a.addCell(new Phrase("Recieved Time: ", subheader));
	  						HeaderTable11a.addCell(new Phrase("", tabletext2));

	  					}

	  					if (!assessmentDtoObj.getListpediatric().get(0).getAssessementTime().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getAssessementTime()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getAssessementTime().equalsIgnoreCase("")) {
	  						HeaderTable11a.addCell(new Phrase("Assessement Time :", subheader));
	  						HeaderTable11a.addCell(new Phrase(
	  								assessmentDtoObj.getListpediatric().get(0).getAssessementTime(), tabletext2));

	  					} else {

	  						HeaderTable11a.addCell(new Phrase("Assessement Time :", subheader));
	  						HeaderTable11a.addCell(new Phrase("", tabletext2));

	  					}

	  					document.add(HeaderTable11a);
	  					HeaderTable11a.flushContent();

	  					PdfPTable HeaderTable12a = new PdfPTable(2);
	  					int[] headerwidth12b = { 20, 80 };
	  					HeaderTable12a.setWidths(headerwidth12b);
	  					HeaderTable12a.setWidthPercentage(95f);
	  					HeaderTable12a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					HeaderTable12a.addCell(new Phrase("", subheader2));
	  					HeaderTable12a.addCell(new Phrase("", tabletext2));

	  					HeaderTable12a.addCell(new Phrase("", subheader2));
	  					HeaderTable12a.addCell(new Phrase("", tabletext2));

	  					if (!assessmentDtoObj.getListpediatric().get(0).getChkboxGenralConsentSigned()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getChkboxGenralConsentSigned()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getChkboxGenralConsentSigned()
	  									.equalsIgnoreCase("")) {

	  						if (assessmentDtoObj.getListpediatric().get(0).getChkboxGenralConsentSigned()
	  								.equalsIgnoreCase("1")) {
	  							HeaderTable12a.addCell(new Phrase("General Consent Signed:", subheader));
	  							HeaderTable12a.addCell(new Phrase("Yes", tabletext2));

	  						}
	  					}

	  					if (!assessmentDtoObj.getListpediatric().get(0).getChkboxForIdBandTied().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getChkboxForIdBandTied()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getChkboxForIdBandTied()
	  									.equalsIgnoreCase("")) {

	  						if (assessmentDtoObj.getListpediatric().get(0).getChkboxForIdBandTied().equalsIgnoreCase("1")) {
	  							HeaderTable12a.addCell(new Phrase("Id Band Tied:", subheader));
	  							HeaderTable12a.addCell(new Phrase("Yes", tabletext2));

	  						}
	  					}
	  					HeaderTable12a.addCell(new Phrase("", tabletext2));
	  					HeaderTable12a.addCell(new Phrase("", tabletext2));

	  					if (!assessmentDtoObj.getListpediatric().get(0).getReasonOfAdmission().equalsIgnoreCase("null")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getReasonOfAdmission()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getReasonOfAdmission()
	  									.equalsIgnoreCase("")) {

	  						HeaderTable12a.addCell(new Phrase("Reason For Admission: ", subheader));

	  						if (assessmentDtoObj.getListpediatric().get(0).getReasonOfAdmission()
	  								.equalsIgnoreCase("emergency")) {
	  							HeaderTable12a.addCell(new Phrase("Emergency", tabletext2));

	  						} else if (assessmentDtoObj.getListpediatric().get(0).getReasonOfAdmission()
	  								.equalsIgnoreCase("obeservation")) {
	  							HeaderTable12a.addCell(new Phrase("Obeservation", tabletext2));

	  						} else if (assessmentDtoObj.getListpediatric().get(0).getReasonOfAdmission()
	  								.equalsIgnoreCase("firstTime")) {
	  							HeaderTable12a.addCell(new Phrase("First Time", tabletext2));

	  						} else if (assessmentDtoObj.getListpediatric().get(0).getReasonOfAdmission()
	  								.equalsIgnoreCase("continuationofTreatment")) {
	  							HeaderTable12a.addCell(new Phrase("Continuation Of Treatment", tabletext2));

	  						} else if (assessmentDtoObj.getListpediatric().get(0).getReasonOfAdmission()
	  								.equalsIgnoreCase("supportiveTherapy")) {
	  							HeaderTable12a.addCell(new Phrase("Supportive Therapy", tabletext2));

	  						} else if (assessmentDtoObj.getListpediatric().get(0).getReasonOfAdmission()
	  								.equalsIgnoreCase("admissionOther")) {
	  							HeaderTable12a.addCell(new Phrase("Other", tabletext2));

	  						}

	  					} else {
	  						HeaderTable12a.addCell(new Phrase("", tabletext2));
	  						HeaderTable12a.addCell(new Phrase("", tabletext2));
	  					}

	  					document.add(HeaderTable12a);
	  					HeaderTable12a.flushContent();

	  					PdfPTable HeaderTable13a = new PdfPTable(8);
	  					int[] headerwidth13b = { 20, 20, 20, 20, 20, 20, 20, 20 };
	  					HeaderTable13a.setWidths(headerwidth13b);
	  					HeaderTable13a.setWidthPercentage(95f);
	  					HeaderTable13a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					HeaderTable13a.addCell(new Phrase("", tabletext2));
	  					HeaderTable13a.addCell(new Phrase("", tabletext2));
	  					HeaderTable13a.addCell(new Phrase("", tabletext2));
	  					HeaderTable13a.addCell(new Phrase("", tabletext2));
	  					HeaderTable13a.addCell(new Phrase("", tabletext2));
	  					HeaderTable13a.addCell(new Phrase("", tabletext2));
	  					HeaderTable13a.addCell(new Phrase("", tabletext2));
	  					HeaderTable13a.addCell(new Phrase("", tabletext2));

	  					if (!assessmentDtoObj.getListpediatric().get(0).getTemprature1().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getTemprature1()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getTemprature1().equalsIgnoreCase("")) {
	  						HeaderTable13a.addCell(new Phrase("Temprature:", subheader));
	  						HeaderTable13a.addCell(
	  								new Phrase(assessmentDtoObj.getListpediatric().get(0).getTemprature1(), tabletext2));

	  					} else {

	  						HeaderTable13a.addCell(new Phrase("Temprature:", subheader));
	  						HeaderTable13a.addCell(new Phrase("", tabletext2));

	  					}

	  					if (!assessmentDtoObj.getListpediatric().get(0).getPulse().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getPulse().equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getPulse().equalsIgnoreCase("")) {
	  						HeaderTable13a.addCell(new Phrase("Pulse:", subheader));
	  						HeaderTable13a
	  								.addCell(new Phrase(assessmentDtoObj.getListpediatric().get(0).getPulse(), tabletext2));

	  					} else {

	  						HeaderTable13a.addCell(new Phrase("Pulse:", subheader));
	  						HeaderTable13a.addCell(new Phrase("", tabletext2));

	  					}

	  					if (!assessmentDtoObj.getListpediatric().get(0).getrR().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getrR().equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getrR().equalsIgnoreCase("")) {
	  						HeaderTable13a.addCell(new Phrase("RR:", subheader));
	  						HeaderTable13a
	  								.addCell(new Phrase(assessmentDtoObj.getListpediatric().get(0).getrR(), tabletext2));

	  					} else {

	  						HeaderTable13a.addCell(new Phrase("RR:", subheader));
	  						HeaderTable13a.addCell(new Phrase("", tabletext2));

	  					}

	  					if (!assessmentDtoObj.getListpediatric().get(0).getSpO2().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getSpO2().equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getSpO2().equalsIgnoreCase("")) {
	  						HeaderTable13a.addCell(new Phrase("SpO2:", subheader));
	  						HeaderTable13a
	  								.addCell(new Phrase(assessmentDtoObj.getListpediatric().get(0).getSpO2(), tabletext2));

	  					} else {

	  						HeaderTable13a.addCell(new Phrase("SpO2:", subheader));
	  						HeaderTable13a.addCell(new Phrase("", tabletext2));

	  					}

	  					if (!assessmentDtoObj.getListpediatric().get(0).getBloodp1().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getBloodp1().equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getBloodp1().equalsIgnoreCase("")) {
	  						HeaderTable13a.addCell(new Phrase("BP:", subheader));
	  						HeaderTable13a.addCell(
	  								new Phrase(assessmentDtoObj.getListpediatric().get(0).getBloodp1(), tabletext2));

	  					} else {

	  						HeaderTable13a.addCell(new Phrase("BP:", subheader));
	  						HeaderTable13a.addCell(new Phrase("", tabletext2));

	  					}

	  					if (!assessmentDtoObj.getListpediatric().get(0).getWeight1().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getWeight1().equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getWeight1().equalsIgnoreCase("")) {
	  						HeaderTable13a.addCell(new Phrase("Weight:", subheader));
	  						HeaderTable13a.addCell(
	  								new Phrase(assessmentDtoObj.getListpediatric().get(0).getWeight1(), tabletext2));

	  					} else {

	  						HeaderTable13a.addCell(new Phrase("Weight:", subheader));
	  						HeaderTable13a.addCell(new Phrase("", tabletext2));

	  					}

	  					if (!assessmentDtoObj.getListpediatric().get(0).getHeight1().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getHeight1().equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getHeight1().equalsIgnoreCase("")) {
	  						HeaderTable13a.addCell(new Phrase("Height:", subheader));
	  						HeaderTable13a.addCell(
	  								new Phrase(assessmentDtoObj.getListpediatric().get(0).getHeight1(), tabletext2));

	  					} else {

	  						HeaderTable13a.addCell(new Phrase("Height:", subheader));
	  						HeaderTable13a.addCell(new Phrase("", tabletext2));

	  					}

	  					HeaderTable13a.addCell(new Phrase("", tabletext2));
	  					HeaderTable13a.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable13a);
	  					HeaderTable13a.flushContent();

	  					if (!assessmentDtoObj.getListpediatric().get(0).getCircumference().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getCircumference()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getCircumference().equalsIgnoreCase("")) {
	  						HeaderTable14a.addCell(new Phrase("Head Circumference(< 5 years of age): ", subheader));
	  						HeaderTable14a.addCell(
	  								new Phrase(assessmentDtoObj.getListpediatric().get(0).getCircumference(), tabletext2));

	  					} else {

	  						HeaderTable14a.addCell(new Phrase("", subheader));
	  						HeaderTable14a.addCell(new Phrase("", tabletext2));

	  					}
	  					HeaderTable14a.addCell(new Phrase("", tabletext2));
	  					HeaderTable14a.addCell(new Phrase("", tabletext2));

	  					document.add(HeaderTable14a);
	  					HeaderTable14a.flushContent();

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
	  					int[] headerwidth16b = { 10, 30, 10, 30, 10 };
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
	  					HeaderTable16a.addCell(new Phrase("Physically Challenged", tabletext2));

	  					if (assessmentDtoObj.getListpediatric().get(0).getPhysicallyChallenged().equalsIgnoreCase("1")) {
	  						HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
	  					} else {
	  						HeaderTable16a.addCell(new Phrase("No", tabletext2));

	  					}

	  					HeaderTable16a.addCell(new Phrase("Low Height bed/Side Rails provision", tabletext2));

	  					if (assessmentDtoObj.getListpediatric().get(0).getLowHeightbed().equalsIgnoreCase("1")) {
	  						HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
	  					} else {
	  						HeaderTable16a.addCell(new Phrase("No", tabletext2));

	  					}

	  					HeaderTable16a.addCell(new Phrase("2", tabletext2));
	  					HeaderTable16a.addCell(new Phrase("Mentally Challenged/Mentally ill", tabletext2));

	  					if (assessmentDtoObj.getListpediatric().get(0).getMentallyChallenged().equalsIgnoreCase("1")) {
	  						HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
	  					} else {
	  						HeaderTable16a.addCell(new Phrase("No", tabletext2));

	  					}

	  					HeaderTable16a.addCell(new Phrase("Nearer to Nursing Station", tabletext2));

	  					if (assessmentDtoObj.getListpediatric().get(0).getNearertoNursingStation().equalsIgnoreCase("1")) {
	  						HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
	  					} else {
	  						HeaderTable16a.addCell(new Phrase("No", tabletext2));

	  					}

	  					HeaderTable16a.addCell(new Phrase("3", tabletext2));
	  					HeaderTable16a.addCell(new Phrase("Terminally ill", tabletext2));

	  					if (assessmentDtoObj.getListpediatric().get(0).getTerminallyill().equalsIgnoreCase("1")) {
	  						HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
	  					} else {
	  						HeaderTable16a.addCell(new Phrase("No", tabletext2));

	  					}

	  					HeaderTable16a.addCell(new Phrase("Continous Monitoring", tabletext2));

	  					if (assessmentDtoObj.getListpediatric().get(0).getContinousMonitoring().equalsIgnoreCase("1")) {
	  						HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
	  					} else {
	  						HeaderTable16a.addCell(new Phrase("No", tabletext2));

	  					}

	  					HeaderTable16a.addCell(new Phrase("4", tabletext2));
	  					HeaderTable16a.addCell(new Phrase("Epileptic Fits", tabletext2));

	  					if (assessmentDtoObj.getListpediatric().get(0).getEpilepticFits().equalsIgnoreCase("1")) {
	  						HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
	  					} else {
	  						HeaderTable16a.addCell(new Phrase("No", tabletext2));

	  					}

	  					HeaderTable16a.addCell(new Phrase("Full Time Attedndent", tabletext2));

	  					if (assessmentDtoObj.getListpediatric().get(0).getFullTimeAttedndent().equalsIgnoreCase("1")) {
	  						HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
	  					} else {
	  						HeaderTable16a.addCell(new Phrase("No", tabletext2));

	  					}

	  					HeaderTable16a.addCell(new Phrase("5", tabletext2));
	  					HeaderTable16a.addCell(new Phrase("Immuno-Compromised", tabletext2));

	  					if (assessmentDtoObj.getListpediatric().get(0).getImmunocompromised().equalsIgnoreCase("1")) {
	  						HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
	  					} else {
	  						HeaderTable16a.addCell(new Phrase("No", tabletext2));

	  					}

	  					HeaderTable16a.addCell(new Phrase("Infection Control Precaution", tabletext2));

	  					if (assessmentDtoObj.getListpediatric().get(0).getInfectionControlPrecaution()
	  							.equalsIgnoreCase("1")) {
	  						HeaderTable16a.addCell(new Phrase("Yes", tabletext2));
	  					} else {
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

	  					document.newPage();

	  					PdfPTable HeaderTable17a = new PdfPTable(3);
	  					int[] headerwidth17b = { 60, 10, 20 };
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

	  					HeaderTable17a.addCell(new Phrase("Pain Score", subheader));
	  					if (!assessmentDtoObj.getListpediatric().get(0).getPainScore().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getPainScore().equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getPainScore().equalsIgnoreCase("")) {
	  						HeaderTable17a.addCell(
	  								new Phrase(assessmentDtoObj.getListpediatric().get(0).getPainScore(), tabletext2));
	  					} else {
	  						HeaderTable17a.addCell(new Phrase("", tabletext2));
	  					}

	  					document.add(HeaderTable17a);
	  					HeaderTable17a.flushContent();

	  					HeaderTable14a.addCell(new Phrase("", tabletext2));
	  					HeaderTable14a.addCell(new Phrase("", tabletext2));
	  					HeaderTable14a.addCell(new Phrase("", tabletext2));
	  					HeaderTable14a.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable14a);
	  					HeaderTable14a.flushContent();

	  					PdfPTable HeaderTable18a = new PdfPTable(2);
	  					int[] headerwidth18b = { 20, 80 };
	  					HeaderTable18a.setWidths(headerwidth18b);
	  					HeaderTable18a.setWidthPercentage(95f);
	  					HeaderTable18a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					HeaderTable18a.addCell(new Phrase("", tabletext2));
	  					HeaderTable18a.addCell(new Phrase("", tabletext2));
	  					HeaderTable18a.addCell(new Phrase("", tabletext2));
	  					HeaderTable18a.addCell(new Phrase("", tabletext2));

	  					if (!assessmentDtoObj.getListpediatric().get(0).getLocationOfPain().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getLocationOfPain()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getLocationOfPain().equalsIgnoreCase("")) {

	  						HeaderTable18a.addCell(new Phrase("Location Of Pain", subheader));
	  						HeaderTable18a.addCell(
	  								new Phrase(assessmentDtoObj.getListpediatric().get(0).getLocationOfPain(), tabletext2));
	  					} else {
	  						HeaderTable18a.addCell(new Phrase("", tabletext2));
	  						HeaderTable18a.addCell(new Phrase("", tabletext2));
	  					}

	  					if (!assessmentDtoObj.getListpediatric().get(0).getLocationOfPain().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getLocationOfPain()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getLocationOfPain().equalsIgnoreCase("")) {

	  						HeaderTable18a.addCell(new Phrase("Preassure Score: ", subheader));

	  						if (assessmentDtoObj.getListpediatric().get(0).getPressureScorePresent()
	  								.equalsIgnoreCase("1")) {
	  							HeaderTable18a.addCell(new Phrase("Yes", tabletext2));
	  						} else {
	  							HeaderTable18a.addCell(new Phrase("No", tabletext2));
	  						}
	  					}

	  					document.add(HeaderTable18a);
	  					HeaderTable18a.flushContent();

	  					PdfPTable HeaderTable19a = new PdfPTable(5);
	  					int[] headerwidth19b = { 10, 20, 20, 20, 20 };
	  					HeaderTable19a.setWidths(headerwidth19b);
	  					HeaderTable19a.setWidthPercentage(95f);
	  					HeaderTable19a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					HeaderTable16a.addCell(new Phrase("", subheader));
	  					HeaderTable16a.addCell(new Phrase("", subheader));
	  					HeaderTable16a.addCell(new Phrase("", subheader));
	  					HeaderTable16a.addCell(new Phrase("", subheader));
	  					HeaderTable16a.addCell(new Phrase("", subheader));

	  					HeaderTable19a.addCell(new Phrase("Stage", subheader));
	  					HeaderTable19a.addCell(new Phrase("1", subheader));
	  					HeaderTable19a.addCell(new Phrase("2", subheader));
	  					HeaderTable19a.addCell(new Phrase("3", subheader));
	  					HeaderTable19a.addCell(new Phrase("4", subheader));

	  					document.add(HeaderTable16a);
	  					HeaderTable16a.flushContent();

	  					HeaderTable16a.addCell(new Phrase("", subheader));
	  					HeaderTable16a.addCell(new Phrase("", subheader));
	  					HeaderTable16a.addCell(new Phrase("", subheader));
	  					HeaderTable16a.addCell(new Phrase("", subheader));
	  					HeaderTable16a.addCell(new Phrase("", subheader));

	  					document.add(HeaderTable19a);
	  					HeaderTable19a.flushContent();

	  					document.add(HeaderTable16a);
	  					HeaderTable16a.flushContent();

	  					HeaderTable19a.addCell(new Phrase("Signs", tabletext2));
	  					HeaderTable19a.addCell(new Phrase("Red Coloration", tabletext2));
	  					HeaderTable19a.addCell(new Phrase("Skin Break Only", tabletext2));
	  					HeaderTable19a.addCell(new Phrase("Fat Exposed", tabletext2));
	  					HeaderTable19a.addCell(new Phrase("Muscle/Bone Exposed", tabletext2));

	  					HeaderTable19a.addCell(new Phrase("Location", tabletext2));
	  					if (!assessmentDtoObj.getListpediatric().get(0).getRedColorationLocation().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getRedColorationLocation()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getRedColorationLocation()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable19a.addCell(new Phrase(
	  								assessmentDtoObj.getListpediatric().get(0).getRedColorationLocation(), tabletext2));
	  					} else {
	  						HeaderTable19a.addCell(new Phrase("", tabletext2));
	  					}
	  					if (!assessmentDtoObj.getListpediatric().get(0).getSkinBreakOnlyLocation().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getSkinBreakOnlyLocation()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getSkinBreakOnlyLocation()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable19a.addCell(new Phrase(
	  								assessmentDtoObj.getListpediatric().get(0).getSkinBreakOnlyLocation(), tabletext2));
	  					} else {
	  						HeaderTable19a.addCell(new Phrase("", tabletext2));
	  					}
	  					if (!assessmentDtoObj.getListpediatric().get(0).getFatExposedLocation().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getFatExposedLocation()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getFatExposedLocation()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable19a.addCell(new Phrase(
	  								assessmentDtoObj.getListpediatric().get(0).getFatExposedLocation(), tabletext2));
	  					} else {
	  						HeaderTable19a.addCell(new Phrase("", tabletext2));
	  					}
	  					if (!assessmentDtoObj.getListpediatric().get(0).getMuscle_BoneExposedLocation()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getMuscle_BoneExposedLocation()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getMuscle_BoneExposedLocation()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable19a.addCell(
	  								new Phrase(assessmentDtoObj.getListpediatric().get(0).getMuscle_BoneExposedLocation(),
	  										tabletext2));
	  					} else {
	  						HeaderTable19a.addCell(new Phrase("", tabletext2));
	  					}

	  					HeaderTable19a.addCell(new Phrase("Stage", tabletext2));
	  					if (!assessmentDtoObj.getListpediatric().get(0).getRedColorationStage().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getRedColorationStage()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getRedColorationStage()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable19a.addCell(new Phrase(
	  								assessmentDtoObj.getListpediatric().get(0).getRedColorationStage(), tabletext2));
	  					} else {
	  						HeaderTable19a.addCell(new Phrase("", tabletext2));
	  					}
	  					if (!assessmentDtoObj.getListpediatric().get(0).getSkinBreakOnlyStage().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getSkinBreakOnlyStage()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getSkinBreakOnlyStage()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable19a.addCell(new Phrase(
	  								assessmentDtoObj.getListpediatric().get(0).getSkinBreakOnlyStage(), tabletext2));
	  					} else {
	  						HeaderTable19a.addCell(new Phrase("", tabletext2));
	  					}
	  					if (!assessmentDtoObj.getListpediatric().get(0).getFatExposedStage().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getFatExposedStage()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getFatExposedStage().equalsIgnoreCase("")) {
	  						HeaderTable19a.addCell(new Phrase(
	  								assessmentDtoObj.getListpediatric().get(0).getFatExposedStage(), tabletext2));
	  					} else {
	  						HeaderTable19a.addCell(new Phrase("", tabletext2));
	  					}
	  					if (!assessmentDtoObj.getListpediatric().get(0).getMuscle_BoneExposedStage()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getMuscle_BoneExposedStage()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getMuscle_BoneExposedStage()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable19a.addCell(new Phrase(
	  								assessmentDtoObj.getListpediatric().get(0).getMuscle_BoneExposedStage(), tabletext2));
	  					} else {
	  						HeaderTable19a.addCell(new Phrase("", tabletext2));
	  					}

	  					document.add(HeaderTable19a);
	  					HeaderTable19a.flushContent();

	  					PdfPTable HeaderTable20a = new PdfPTable(3);
	  					int[] headerwidth20b = { 30, 50, 50 };
	  					HeaderTable20a.setWidths(headerwidth20b);
	  					HeaderTable20a.setWidthPercentage(95f);
	  					HeaderTable20a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					HeaderTable16a.addCell(new Phrase("", subheader));
	  					HeaderTable16a.addCell(new Phrase("", subheader));
	  					HeaderTable16a.addCell(new Phrase("", subheader));
	  					HeaderTable16a.addCell(new Phrase("", subheader));
	  					HeaderTable16a.addCell(new Phrase("", subheader));

	  					document.add(HeaderTable16a);
	  					HeaderTable16a.flushContent();

	  					HeaderTable20a.addCell(new Phrase("", subheader));
	  					HeaderTable20a.addCell(new Phrase("", subheader));
	  					HeaderTable20a.addCell(new Phrase("", subheader));

	  					HeaderTable20a.addCell(new Phrase("Pressure Ulcer Management:", subheader));
	  					if (!assessmentDtoObj.getListpediatric().get(0).getPressureUlcerManagement()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getPressureUlcerManagement()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getPressureUlcerManagement()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable20a.addCell(new Phrase(
	  								assessmentDtoObj.getListpediatric().get(0).getPressureUlcerManagement(), tabletext2));
	  					} else {
	  						HeaderTable20a.addCell(new Phrase("", tabletext2));
	  					}
	  					HeaderTable20a.addCell(new Phrase("Mark Location of wound", tabletext2));

	  					document.add(HeaderTable20a);
	  					HeaderTable20a.flushContent();

	  					PdfPTable HeaderTable21a = new PdfPTable(2);
	  					int[] headerwidth21b = { 20, 80 };
	  					HeaderTable21a.setWidths(headerwidth21b);
	  					HeaderTable21a.setWidthPercentage(95f);
	  					HeaderTable21a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					HeaderTable21a.addCell(new Phrase("", tabletext2));
	  					HeaderTable21a.addCell(new Phrase("", tabletext2));

	  					if (!assessmentDtoObj.getListpediatric().get(0).getModeofMovement().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getModeofMovement()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getModeofMovement().equalsIgnoreCase("")) {
	  						HeaderTable21a.addCell(new Phrase("Mode of Movement:", subheader));

	  						if (assessmentDtoObj.getListpediatric().get(0).getModeofMovement()
	  								.equalsIgnoreCase("ambulatory")) {
	  							HeaderTable21a.addCell(new Phrase("Ambulatory", tabletext2));

	  						} else if (assessmentDtoObj.getListpediatric().get(0).getModeofMovement()
	  								.equalsIgnoreCase("wheelChair")) {
	  							HeaderTable21a.addCell(new Phrase("Wheel Chair", tabletext2));

	  						} else if (assessmentDtoObj.getListpediatric().get(0).getModeofMovement()
	  								.equalsIgnoreCase("strecher")) {
	  							HeaderTable21a.addCell(new Phrase("Strecher", tabletext2));
	  						}
	  					} else {
	  						if (!assessmentDtoObj.getListpediatric().get(0).getOthermovement().equalsIgnoreCase("NULL")
	  								&& !assessmentDtoObj.getListpediatric().get(0).getOthermovement()
	  										.equalsIgnoreCase("undefined")
	  								&& !assessmentDtoObj.getListpediatric().get(0).getOthermovement()
	  										.equalsIgnoreCase("")) {

	  							HeaderTable21a.addCell(new Phrase("Mode of Movement: -Other", tabletext2));
	  							HeaderTable21a.addCell(new Phrase(
	  									assessmentDtoObj.getListpediatric().get(0).getOthermovement(), tabletext2));
	  						}
	  					}

	  					if (!assessmentDtoObj.getListpediatric().get(0).getDependency().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getDependency().equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getDependency().equalsIgnoreCase("")) {
	  						HeaderTable21a.addCell(new Phrase("Dependency:", subheader));

	  						if (assessmentDtoObj.getListpediatric().get(0).getDependency()
	  								.equalsIgnoreCase("independency")) {
	  							HeaderTable21a.addCell(new Phrase("Independency", tabletext2));

	  						} else if (assessmentDtoObj.getListpediatric().get(0).getDependency()
	  								.equalsIgnoreCase("partiallyIndependent")) {
	  							HeaderTable21a.addCell(new Phrase("Partially Independent", tabletext2));
	  						} else if (assessmentDtoObj.getListpediatric().get(0).getDependency()
	  								.equalsIgnoreCase("completelyIndependent")) {
	  							HeaderTable21a.addCell(new Phrase("Completely Independent", tabletext2));
	  						}
	  					}

	  					if (!assessmentDtoObj.getListpediatric().get(0).getLevelofConsciousness().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getLevelofConsciousness()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getLevelofConsciousness()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable21a.addCell(new Phrase("Level of Consciousness:", subheader));

	  						if (assessmentDtoObj.getListpediatric().get(0).getLevelofConsciousness()
	  								.equalsIgnoreCase("conscious")) {
	  							HeaderTable21a.addCell(new Phrase("Conscious", tabletext2));

	  						} else if (assessmentDtoObj.getListpediatric().get(0).getLevelofConsciousness()
	  								.equalsIgnoreCase("semiconscious")) {
	  							HeaderTable21a.addCell(new Phrase("Semi-Conscious", tabletext2));
	  						} else if (assessmentDtoObj.getListpediatric().get(0).getLevelofConsciousness()
	  								.equalsIgnoreCase("unconscious")) {
	  							HeaderTable21a.addCell(new Phrase("Unconscious", tabletext2));
	  						} else if (assessmentDtoObj.getListpediatric().get(0).getLevelofConsciousness()
	  								.equalsIgnoreCase("oriented")) {
	  							HeaderTable21a.addCell(new Phrase("Oriented", tabletext2));
	  						} else if (assessmentDtoObj.getListpediatric().get(0).getLevelofConsciousness()
	  								.equalsIgnoreCase("disoriented")) {
	  							HeaderTable21a.addCell(new Phrase("Disoriented", tabletext2));
	  						}
	  					}

	  					HeaderTable21a.addCell(new Phrase("", tabletext2));
	  					HeaderTable21a.addCell(new Phrase("", tabletext2));

	  					document.add(HeaderTable21a);
	  					HeaderTable21a.flushContent();

	  					PdfPTable HeaderTable22a = new PdfPTable(2);
	  					int[] headerwidth22b = { 60, 40 };
	  					HeaderTable22a.setWidths(headerwidth22b);
	  					HeaderTable22a.setWidthPercentage(95f);
	  					HeaderTable22a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDtoObj.getListpediatric().get(0).getChiefComplain().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getChiefComplain()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getChiefComplain().equalsIgnoreCase("")) {
	  						HeaderTable22a.addCell(new Phrase(
	  								"Chief Complaints(as described by the patient) with duration:", subheader));
	  						HeaderTable22a.addCell(
	  								new Phrase(assessmentDtoObj.getListpediatric().get(0).getChiefComplain(), tabletext2));
	  					}

	  					if (!assessmentDtoObj.getListpediatric().get(0).getPresentMedication().equalsIgnoreCase("NULL")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getPresentMedication()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDtoObj.getListpediatric().get(0).getPresentMedication()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable22a.addCell(new Phrase("Present Medications:", subheader));
	  						HeaderTable22a.addCell(new Phrase(
	  								assessmentDtoObj.getListpediatric().get(0).getPresentMedication(), tabletext2));
	  					}
	  					document.add(HeaderTable22a);
	  					HeaderTable22a.flushContent();
	  				}

	  				if (assessmentDt2oObj.getListpediatric2().size() != 0) {

	  					PdfPTable HeaderTable23a = new PdfPTable(3);
	  					int[] headerwidth23b = { 40, 40, 40 };
	  					HeaderTable23a.setWidths(headerwidth23b);
	  					HeaderTable23a.setWidthPercentage(95f);
	  					HeaderTable23a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getFood().equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getFood().equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getFood().equalsIgnoreCase("")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getMedicines().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getMedicines()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getMedicines().equalsIgnoreCase("")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkAllergiesOther()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAllergiesOther()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAllergiesOther()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getTxtAllergiesSpecify()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAllergiesSpecify()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAllergiesSpecify()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkAllergiesNotKnown()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAllergiesNotKnown()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAllergiesNotKnown()
	  											.equalsIgnoreCase("")) {

	  						HeaderTable23a.addCell(new Phrase("Allergies:", subheader));

	  						if (!assessmentDt2oObj.getListpediatric2().get(0).getFood().equalsIgnoreCase("NULL")
	  								&& !assessmentDt2oObj.getListpediatric2().get(0).getFood().equalsIgnoreCase("undefined")
	  								&& !assessmentDt2oObj.getListpediatric2().get(0).getFood().equalsIgnoreCase("")) {
	  							if (assessmentDt2oObj.getListpediatric2().get(0).getFood().equalsIgnoreCase("1")) {
	  								HeaderTable23a.addCell(new Phrase("Food", tabletext2));
	  							}
	  						}
	  						if (!assessmentDt2oObj.getListpediatric2().get(0).getMedicines().equalsIgnoreCase("NULL")
	  								&& !assessmentDt2oObj.getListpediatric2().get(0).getMedicines()
	  										.equalsIgnoreCase("undefined")
	  								&& !assessmentDt2oObj.getListpediatric2().get(0).getMedicines().equalsIgnoreCase("")) {

	  							if (assessmentDt2oObj.getListpediatric2().get(0).getMedicines().equalsIgnoreCase("1")) {
	  								HeaderTable23a.addCell(new Phrase("Medicines", tabletext2));
	  							}

	  						}
	  						if (!assessmentDt2oObj.getListpediatric2().get(0).getChkAllergiesOther()
	  								.equalsIgnoreCase("NULL")
	  								&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAllergiesOther()
	  										.equalsIgnoreCase("undefined")
	  								&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAllergiesOther()
	  										.equalsIgnoreCase("")
	  								|| !assessmentDt2oObj.getListpediatric2().get(0).getTxtAllergiesSpecify()
	  										.equalsIgnoreCase("NULL")
	  										&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAllergiesSpecify()
	  												.equalsIgnoreCase("undefined")
	  										&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAllergiesSpecify()
	  												.equalsIgnoreCase("")) {

	  							if (assessmentDt2oObj.getListpediatric2().get(0).getChkAllergiesOther()
	  									.equalsIgnoreCase("1")) {
	  								HeaderTable23a.addCell(new Phrase("                         Others", tabletext2));
	  								if (!assessmentDt2oObj.getListpediatric2().get(0).getTxtAllergiesSpecify()
	  										.equalsIgnoreCase("NULL")
	  										&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAllergiesSpecify()
	  												.equalsIgnoreCase("undefined")
	  										&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAllergiesSpecify()
	  												.equalsIgnoreCase("")) {
	  									HeaderTable23a.addCell(new Phrase(
	  											assessmentDt2oObj.getListpediatric2().get(0).getTxtAllergiesSpecify(),
	  											tabletext2));
	  								}
	  							}
	  						}

	  						if (!assessmentDt2oObj.getListpediatric2().get(0).getChkAllergiesNotKnown()
	  								.equalsIgnoreCase("NULL")
	  								&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAllergiesNotKnown()
	  										.equalsIgnoreCase("undefined")
	  								&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAllergiesNotKnown()
	  										.equalsIgnoreCase("")) {
	  							if (assessmentDt2oObj.getListpediatric2().get(0).getChkAllergiesNotKnown()
	  									.equalsIgnoreCase("1")) {
	  								HeaderTable23a.addCell(new Phrase("Not Known", tabletext2));
	  							}
	  						}
	  						HeaderTable23a.addCell(new Phrase("", tabletext2));
	  					}
	  					document.add(HeaderTable23a);
	  					HeaderTable23a.flushContent();

	  					PdfPTable HeaderTable24a = new PdfPTable(4);
	  					int[] headerwidth24b = { 20, 10, 20, 70 };
	  					HeaderTable24a.setWidths(headerwidth24b);
	  					HeaderTable24a.setWidthPercentage(95f);
	  					HeaderTable24a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getChkBirthHistoryfullterm()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkBirthHistoryfullterm()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkBirthHistoryfullterm()
	  									.equalsIgnoreCase("")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkBirthHistoryfullterm()
	  									.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkBirthHistoryPreterm()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkBirthHistoryPreterm()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkBirthHistoryPreterm()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkBirthHistoryPreterm()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkBirthHistoryBirthCry()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkBirthHistoryBirthCry()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkBirthHistoryBirthCry()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkBirthHistoryBirthCry()
	  											.equalsIgnoreCase("0")) {

	  						HeaderTable24a.addCell(new Phrase("Birth History:", subheader));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkBirthHistoryfullterm()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable24a.addCell(new Phrase("Full Term", tabletext2));
	  						else
	  							HeaderTable24a.addCell(new Phrase("", tabletext2));

	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkBirthHistoryPreterm()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable24a.addCell(new Phrase("Pre Term", tabletext2));
	  						else
	  							HeaderTable24a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkBirthHistoryBirthCry()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable24a.addCell(new Phrase("Birth Cry", tabletext2));
	  						else
	  							HeaderTable24a.addCell(new Phrase("", tabletext2));
	  					}

	  					document.add(HeaderTable24a);
	  					HeaderTable24a.flushContent();

	  					PdfPTable HeaderTable25a = new PdfPTable(6);
	  					int[] headerwidth25b = { 10, 15, 20, 10, 10, 40 };
	  					HeaderTable25a.setWidths(headerwidth25b);
	  					HeaderTable25a.setWidthPercentage(95f);
	  					HeaderTable25a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getChkNormalDelivery().equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkNormalDelivery()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkNormalDelivery().equalsIgnoreCase("")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkNormalDelivery()
	  									.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryCeasarean()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryCeasarean()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryCeasarean()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryCeasarean()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryForceps()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryForceps()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryForceps()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryForceps()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryEpisiotomy()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryEpisiotomy()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryEpisiotomy()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryEpisiotomy()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryVaccum()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryVaccum()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryVaccum()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryVaccum()
	  											.equalsIgnoreCase("0")) {
	  						HeaderTable25a.addCell(new Phrase("Delivery:", subheader));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkNormalDelivery().equalsIgnoreCase("1"))
	  							HeaderTable25a.addCell(new Phrase("Normal Delivery", tabletext2));
	  						else
	  							HeaderTable25a.addCell(new Phrase("", tabletext2));

	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryCeasarean()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable25a.addCell(new Phrase("Ceasarean Section", tabletext2));
	  						else
	  							HeaderTable25a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryForceps().equalsIgnoreCase("1"))
	  							HeaderTable25a.addCell(new Phrase("Forceps", tabletext2));
	  						else
	  							HeaderTable25a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryEpisiotomy()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable25a.addCell(new Phrase("Episiotomy", tabletext2));
	  						else
	  							HeaderTable25a.addCell(new Phrase("", tabletext2));

	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkDeliveryVaccum().equalsIgnoreCase("1"))
	  							HeaderTable25a.addCell(new Phrase("Vaccum Pump Assisted", tabletext2));
	  						else
	  							HeaderTable25a.addCell(new Phrase("", tabletext2));

	  					}

	  					document.add(HeaderTable25a);
	  					HeaderTable25a.flushContent();

	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getChkImmunizationCompleted()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkImmunizationCompleted()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkImmunizationCompleted()
	  									.equalsIgnoreCase("")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkImmunizationCompleted()
	  									.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getTxtImmunizationDetailsIfNo()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtImmunizationDetailsIfNo()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtImmunizationDetailsIfNo()
	  											.equalsIgnoreCase("")) {

	  						HeaderTable24a.addCell(new Phrase("Immunization History:", subheader));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkImmunizationCompleted()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable24a.addCell(new Phrase("Completed", tabletext2));
	  						else
	  							HeaderTable24a.addCell(new Phrase("", tabletext2));
	  						if (!assessmentDt2oObj.getListpediatric2().get(0).getTxtImmunizationDetailsIfNo()
	  								.equalsIgnoreCase("NULL")
	  								&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtImmunizationDetailsIfNo()
	  										.equalsIgnoreCase("undefined")
	  								&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtImmunizationDetailsIfNo()
	  										.equalsIgnoreCase("")) {
	  							HeaderTable24a.addCell(new Phrase("	Details if No:", tabletext2));
	  							HeaderTable24a.addCell(new Phrase(
	  									assessmentDt2oObj.getListpediatric2().get(0).getTxtImmunizationDetailsIfNo(),
	  									tabletext2));
	  						} else {
	  							HeaderTable24a.addCell(new Phrase("", tabletext2));
	  							HeaderTable24a.addCell(new Phrase("", tabletext2));
	  						}
	  					}
	  					document.add(HeaderTable24a);
	  					HeaderTable24a.flushContent();

	  					PdfPTable HeaderTable26a = new PdfPTable(6);
	  					int[] headerwidth26b = { 20, 10, 10, 20, 20, 40 };
	  					HeaderTable26a.setWidths(headerwidth26b);
	  					HeaderTable26a.setWidthPercentage(95f);
	  					HeaderTable26a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getChkDevelopmentHistoryweight()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDevelopmentHistoryweight()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDevelopmentHistoryweight()
	  									.equalsIgnoreCase("")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDevelopmentHistoryweight()
	  									.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkDevelopmentHistoryHeight()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDevelopmentHistoryHeight()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDevelopmentHistoryHeight()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDevelopmentHistoryHeight()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0)
	  									.getChkDevelopmentHistoryChestCircumference().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0)
	  											.getChkDevelopmentHistoryChestCircumference().equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0)
	  											.getChkDevelopmentHistoryChestCircumference().equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0)
	  											.getChkDevelopmentHistoryChestCircumference().equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaDevelopmentHistoryDetailsifNo()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0)
	  											.getTxtAreaDevelopmentHistoryDetailsifNo().equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0)
	  											.getTxtAreaDevelopmentHistoryDetailsifNo().equalsIgnoreCase("")) {

	  						HeaderTable26a.addCell(new Phrase("Development History: (G&D as per page):", subheader));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkDevelopmentHistoryweight()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable26a.addCell(new Phrase("Weight", tabletext2));
	  						else
	  							HeaderTable26a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkDevelopmentHistoryHeight()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable26a.addCell(new Phrase("	Height", tabletext2));
	  						else
	  							HeaderTable26a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkDevelopmentHistoryChestCircumference()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable26a.addCell(new Phrase("Chest Circumference", tabletext2));
	  						else
	  							HeaderTable26a.addCell(new Phrase("", tabletext2));
	  						if (!assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaDevelopmentHistoryDetailsifNo()
	  								.equalsIgnoreCase("NULL")
	  								&& !assessmentDt2oObj.getListpediatric2().get(0)
	  										.getTxtAreaDevelopmentHistoryDetailsifNo().equalsIgnoreCase("undefined")
	  								&& !assessmentDt2oObj.getListpediatric2().get(0)
	  										.getTxtAreaDevelopmentHistoryDetailsifNo().equalsIgnoreCase("")) {
	  							HeaderTable26a.addCell(new Phrase("Details if No:", tabletext2));
	  							HeaderTable26a.addCell(new Phrase(assessmentDt2oObj.getListpediatric2().get(0)
	  									.getTxtAreaDevelopmentHistoryDetailsifNo(), tabletext2));
	  						} else {
	  							HeaderTable26a.addCell(new Phrase("", tabletext2));
	  							HeaderTable26a.addCell(new Phrase("", tabletext2));
	  						}

	  					}

	  					document.add(HeaderTable26a);
	  					HeaderTable26a.flushContent();

	  					PdfPTable HeaderTable27a = new PdfPTable(3);
	  					int[] headerwidth27b = { 110, 50, 20 };
	  					HeaderTable27a.setWidths(headerwidth27b);
	  					HeaderTable27a.setWidthPercentage(95f);
	  					HeaderTable27a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					HeaderTable15a.addCell(new Phrase("", subheader2));
	  					HeaderTable15a.addCell(new Phrase("", subheader2));
	  					HeaderTable15a.addCell(new Phrase("", header2));

	  					HeaderTable27a.getDefaultCell().setBorder(Rectangle.TOP);
	  					HeaderTable27a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  					HeaderTable27a.addCell(new Phrase("Physical Assessment", subheader2));
	  					HeaderTable27a.addCell(new Phrase("", subheader2));
	  					HeaderTable27a.addCell(new Phrase("", header2));

	  					HeaderTable27a.addCell(new Phrase(
	  							"place a check in areas of abnormality, if unable to assess indicate reason", tabletext2));
	  					HeaderTable27a.addCell(new Phrase("", subheader2));
	  					HeaderTable27a.addCell(new Phrase("", header2));

	  					document.add(HeaderTable27a);
	  					HeaderTable27a.flushContent();

	  					document.add(HeaderTable15a);
	  					HeaderTable15a.flushContent();

	  					PdfPTable HeaderTable28a = new PdfPTable(9);
	  					int[] headerwidth28b = { 15, 20, 10, 6, 10, 5, 5, 10, 10 };
	  					HeaderTable28a.setWidths(headerwidth28b);
	  					HeaderTable28a.setWidthPercentage(95f);
	  					HeaderTable28a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					PdfPTable HeaderTable29a = new PdfPTable(3);
	  					int[] headerwidth29b = { 15, 20, 50 };
	  					HeaderTable29a.setWidths(headerwidth29b);
	  					HeaderTable29a.setWidthPercentage(95f);
	  					HeaderTable29a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getChkNoAbnormalityDetectedForEye()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkNoAbnormalityDetectedForEye()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkNoAbnormalityDetectedForEye()
	  									.equalsIgnoreCase("")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkNoAbnormalityDetectedForEye()
	  									.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkImpairedEye()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkImpairedEye()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkImpairedEye()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkImpairedEye()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkEyeLenses().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkEyeLenses()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkEyeLenses()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkEyeLenses()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkEyeSpectacles()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkEyeSpectacles()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkEyeSpectacles()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkEyeSpectacles()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkBlind().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkBlind()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkBlind().equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkBlind().equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkDeaf().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDeaf()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDeaf().equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDeaf().equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkHearingAid().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkHearingAid()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkHearingAid()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkHearingAid()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkChemoPort().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkChemoPort()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkChemoPort()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkChemoPort()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkOrthopedicImpl()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkOrthopedicImpl()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkOrthopedicImpl()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkOrthopedicImpl()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getTxtImplants().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtImplants()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtImplants()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkOthereye().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkOthereye()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkOthereye()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkOthereye()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getTxtOthereye().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtOthereye()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtOthereye()
	  											.equalsIgnoreCase("")) {

	  						HeaderTable28a.addCell(new Phrase("Eye, ENT &Implant:", subheader));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkNoAbnormalityDetectedForEye()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable28a.addCell(new Phrase("No Abnormality Detected", tabletext2));
	  						else
	  							HeaderTable28a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkImpairedEye().equalsIgnoreCase("1"))
	  							HeaderTable28a.addCell(new Phrase("Impaired Vision", tabletext2));
	  						else
	  							HeaderTable28a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkEyeLenses().equalsIgnoreCase("1"))
	  							HeaderTable28a.addCell(new Phrase("Lenses", tabletext2));
	  						else
	  							HeaderTable28a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkEyeSpectacles().equalsIgnoreCase("1"))
	  							HeaderTable28a.addCell(new Phrase("Spectacles", tabletext2));
	  						else
	  							HeaderTable28a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkBlind().equalsIgnoreCase("1"))
	  							HeaderTable28a.addCell(new Phrase("Blind", tabletext2));
	  						else
	  							HeaderTable28a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkDeaf().equalsIgnoreCase("1"))
	  							HeaderTable28a.addCell(new Phrase("	Deaf", tabletext2));
	  						else
	  							HeaderTable28a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkHearingAid().equalsIgnoreCase("1"))
	  							HeaderTable28a.addCell(new Phrase("Hearing Aid", tabletext2));
	  						else
	  							HeaderTable28a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkChemoPort().equalsIgnoreCase("1"))
	  							HeaderTable28a.addCell(new Phrase("Chemo port", tabletext2));
	  						else
	  							HeaderTable28a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkOrthopedicImpl().equalsIgnoreCase("1")) {
	  							HeaderTable29a.addCell(new Phrase("", tabletext2));
	  							HeaderTable29a.addCell(new Phrase("Orthopedic Implants-Secify:", tabletext2));
	  							if (!assessmentDt2oObj.getListpediatric2().get(0).getTxtImplants().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtImplants()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtImplants()
	  											.equalsIgnoreCase("")) {
	  								HeaderTable29a.addCell(new Phrase(
	  										assessmentDt2oObj.getListpediatric2().get(0).getTxtImplants(), tabletext2));
	  							} else {
	  								HeaderTable29a.addCell(new Phrase("", tabletext2));
	  							}
	  						} else {
	  							HeaderTable29a.addCell(new Phrase("", tabletext2));
	  							HeaderTable29a.addCell(new Phrase("", tabletext2));
	  							HeaderTable29a.addCell(new Phrase("", tabletext2));
	  						}
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkOthereye().equalsIgnoreCase("1")) {
	  							HeaderTable29a.addCell(new Phrase("", tabletext2));
	  							HeaderTable29a.addCell(new Phrase("Other(Specify)-", tabletext2));
	  							if (!assessmentDt2oObj.getListpediatric2().get(0).getTxtOthereye().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtOthereye()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtOthereye()
	  											.equalsIgnoreCase("")) {
	  								HeaderTable29a.addCell(new Phrase(
	  										assessmentDt2oObj.getListpediatric2().get(0).getTxtOthereye(), tabletext2));
	  							} else {
	  								HeaderTable29a.addCell(new Phrase("", tabletext2));
	  							}
	  						} else {
	  							HeaderTable29a.addCell(new Phrase("", tabletext2));
	  							HeaderTable29a.addCell(new Phrase("", tabletext2));
	  							HeaderTable29a.addCell(new Phrase("", tabletext2));
	  						}

	  					}

	  					document.add(HeaderTable28a);
	  					HeaderTable28a.flushContent();

	  					document.add(HeaderTable29a);
	  					HeaderTable29a.flushContent();

	  					PdfPTable HeaderTable30a = new PdfPTable(6);
	  					int[] headerwidth30b = { 10, 20, 10, 10, 10, 10 };
	  					HeaderTable30a.setWidths(headerwidth30b);
	  					HeaderTable30a.setWidthPercentage(95f);
	  					HeaderTable30a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityRespiratory()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityRespiratory()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityRespiratory()
	  									.equalsIgnoreCase("")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityRespiratory()
	  									.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkDyspnea().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDyspnea()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDyspnea()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDyspnea()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkWheezes().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkWheezes()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkWheezes()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkWheezes()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkAsymmetric().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAsymmetric()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAsymmetric()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAsymmetric()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkCough().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkCough()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkCough().equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkCough().equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkSputum().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSputum()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSputum().equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSputum()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getTxtOtherRespiratory()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtOtherRespiratory()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtOtherRespiratory()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkOtherRespiratory()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkOtherRespiratory()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkOtherRespiratory()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkOtherRespiratory()
	  											.equalsIgnoreCase("0")) {

	  						HeaderTable30a.addCell(new Phrase("Respiratory:", subheader));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityRespiratory()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable30a.addCell(new Phrase("No Abnormality Detected", tabletext2));
	  						else
	  							HeaderTable30a.addCell(new Phrase("", tabletext2));

	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkDyspnea().equalsIgnoreCase("1"))
	  							HeaderTable30a.addCell(new Phrase("Dyspnea", tabletext2));
	  						else
	  							HeaderTable30a.addCell(new Phrase("", tabletext2));

	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkWheezes().equalsIgnoreCase("1"))
	  							HeaderTable30a.addCell(new Phrase("Wheezes", tabletext2));
	  						else
	  							HeaderTable30a.addCell(new Phrase("", tabletext2));

	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkAsymmetric().equalsIgnoreCase("1"))
	  							HeaderTable30a.addCell(new Phrase("Asymmetric", tabletext2));
	  						else
	  							HeaderTable30a.addCell(new Phrase("", tabletext2));

	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkCough().equalsIgnoreCase("1"))
	  							HeaderTable30a.addCell(new Phrase("Cough", tabletext2));
	  						else
	  							HeaderTable30a.addCell(new Phrase("", tabletext2));

	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkSputum().equalsIgnoreCase("1")) {
	  							HeaderTable29a.addCell(new Phrase("", tabletext2));
	  							HeaderTable29a.addCell(new Phrase("	Sputum(colour):", tabletext2));
	  							if (!assessmentDt2oObj.getListpediatric2().get(0).getTxtOtherRespiratory()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtOtherRespiratory()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtOtherRespiratory()
	  											.equalsIgnoreCase("")) {
	  								HeaderTable29a.addCell(new Phrase(
	  										assessmentDt2oObj.getListpediatric2().get(0).getTxtOtherRespiratory(),
	  										tabletext2));
	  							} else {
	  								HeaderTable29a.addCell(new Phrase("", tabletext2));
	  							}
	  						} else {
	  							HeaderTable29a.addCell(new Phrase("", tabletext2));
	  							HeaderTable29a.addCell(new Phrase("", tabletext2));
	  							HeaderTable29a.addCell(new Phrase("", tabletext2));
	  						}

	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkOtherRespiratory()
	  								.equalsIgnoreCase("1")) {
	  							HeaderTable29a.addCell(new Phrase("", tabletext2));
	  							HeaderTable29a.addCell(new Phrase("Others", tabletext2));
	  							HeaderTable29a.addCell(new Phrase("", tabletext2));
	  						} else {
	  							HeaderTable29a.addCell(new Phrase("", tabletext2));
	  							HeaderTable29a.addCell(new Phrase("", tabletext2));
	  							HeaderTable29a.addCell(new Phrase("", tabletext2));
	  							;
	  						}
	  					}

	  					document.add(HeaderTable30a);
	  					HeaderTable30a.flushContent();

	  					document.add(HeaderTable29a);
	  					HeaderTable29a.flushContent();

	  					PdfPTable HeaderTable31a = new PdfPTable(9);
	  					int[] headerwidth31b = { 15, 20, 10, 10, 6, 10, 5, 10, 10 };
	  					HeaderTable31a.setWidths(headerwidth31b);
	  					HeaderTable31a.setWidthPercentage(95f);
	  					HeaderTable31a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityCardioVascular()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityCardioVascular()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityCardioVascular()
	  									.equalsIgnoreCase("")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityCardioVascular()
	  									.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkTachycardia()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkTachycardia()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkTachycardia()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkTachycardia()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkBradycardia()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkBradycardia()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkBradycardia()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkBradycardia()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkEdema().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkEdema()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkEdema().equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkEdema().equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkFacial_Pedal()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkFacial_Pedal()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkFacial_Pedal()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkFacial_Pedal()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkSacral().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSacral()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSacral().equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSacral()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkGeneralized()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkGeneralized()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkGeneralized()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkGeneralized()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkCardioOther()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkCardioOther()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkCardioOther()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkCardioOther()
	  											.equalsIgnoreCase("0")) {

	  						HeaderTable31a.addCell(new Phrase("Cardio Vascular:", subheader));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityCardioVascular()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable31a.addCell(new Phrase("No Abnormality Detected", tabletext2));
	  						else
	  							HeaderTable31a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkTachycardia().equalsIgnoreCase("1"))
	  							HeaderTable31a.addCell(new Phrase("Tachycardia", tabletext2));
	  						else
	  							HeaderTable31a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkBradycardia().equalsIgnoreCase("1"))
	  							HeaderTable31a.addCell(new Phrase("Bradycardia", tabletext2));
	  						else
	  							HeaderTable31a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkEdema().equalsIgnoreCase("1"))
	  							HeaderTable31a.addCell(new Phrase("Edema", tabletext2));
	  						else
	  							HeaderTable31a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkFacial_Pedal().equalsIgnoreCase("1"))
	  							HeaderTable31a.addCell(new Phrase("Facial/Pedal", tabletext2));
	  						else
	  							HeaderTable31a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkSacral().equalsIgnoreCase("1"))
	  							HeaderTable31a.addCell(new Phrase("Sacral", tabletext2));
	  						else
	  							HeaderTable31a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkGeneralized().equalsIgnoreCase("1"))
	  							HeaderTable31a.addCell(new Phrase("Generalized", tabletext2));
	  						else
	  							HeaderTable31a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkCardioOther().equalsIgnoreCase("1"))
	  							HeaderTable31a.addCell(new Phrase("Other", tabletext2));
	  						else
	  							HeaderTable31a.addCell(new Phrase("", tabletext2));

	  					}

	  					document.add(HeaderTable31a);
	  					HeaderTable31a.flushContent();

	  					PdfPTable HeaderTable32a = new PdfPTable(9);
	  					int[] headerwidth32b = { 15, 20, 10, 6, 10, 10, 10, 10, 10 };
	  					HeaderTable32a.setWidths(headerwidth32b);
	  					HeaderTable32a.setWidthPercentage(95f);
	  					HeaderTable32a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityGastrointestinal()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityGastrointestinal()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityGastrointestinal()
	  									.equalsIgnoreCase("")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityGastrointestinal()
	  									.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkDistention().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDistention()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDistention()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDistention()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkRigidity().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkRigidity()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkRigidity()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkRigidity()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkDysphagia().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDysphagia()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDysphagia()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDysphagia()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkDiarrhoea().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDiarrhoea()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDiarrhoea()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDiarrhoea()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkLathargic().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkLathargic()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkLathargic()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkLathargic()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkLast().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkLast()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkLast().equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkLast().equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkGastrointestinalOther()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkGastrointestinalOther()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkGastrointestinalOther()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkGastrointestinalOther()
	  											.equalsIgnoreCase("0")) {

	  						HeaderTable32a.addCell(new Phrase("Gastrointestinal:", subheader));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityGastrointestinal()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable32a.addCell(new Phrase("No Abnormality Detected", tabletext2));
	  						else
	  							HeaderTable32a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkDistention().equalsIgnoreCase("1"))
	  							HeaderTable32a.addCell(new Phrase("Distention", tabletext2));
	  						else
	  							HeaderTable32a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkRigidity().equalsIgnoreCase("1"))
	  							HeaderTable32a.addCell(new Phrase("Rigidity", tabletext2));
	  						else
	  							HeaderTable32a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkDysphagia().equalsIgnoreCase("1"))
	  							HeaderTable32a.addCell(new Phrase("Dysphagia", tabletext2));
	  						else
	  							HeaderTable32a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkDiarrhoea().equalsIgnoreCase("1"))
	  							HeaderTable32a.addCell(new Phrase("Diarrhoea", tabletext2));
	  						else
	  							HeaderTable32a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkLathargic().equalsIgnoreCase("1"))
	  							HeaderTable32a.addCell(new Phrase("Constipation", tabletext2));
	  						else
	  							HeaderTable32a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkLast().equalsIgnoreCase("1"))
	  							HeaderTable32a.addCell(new Phrase("Last Bowel Movement", tabletext2));
	  						else
	  							HeaderTable32a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkGastrointestinalOther()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable32a.addCell(new Phrase("Other", tabletext2));
	  						else
	  							HeaderTable32a.addCell(new Phrase("", tabletext2));

	  					}

	  					document.add(HeaderTable32a);
	  					HeaderTable32a.flushContent();

	  					PdfPTable HeaderTable33a = new PdfPTable(8);
	  					int[] headerwidth33b = { 15, 20, 7, 10, 10, 10, 10, 7 };
	  					HeaderTable33a.setWidths(headerwidth33b);
	  					HeaderTable33a.setWidthPercentage(95f);
	  					HeaderTable33a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					PdfPTable HeaderTable35a = new PdfPTable(6);
	  					int[] headerwidth35b = { 10, 10, 10, 10, 10, 30 };
	  					HeaderTable35a.setWidths(headerwidth35b);
	  					HeaderTable35a.setWidthPercentage(95f);
	  					HeaderTable35a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityGenitourinary()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityGenitourinary()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityGenitourinary()
	  									.equalsIgnoreCase("")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityGenitourinary()
	  									.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkDysuria().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDysuria()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDysuria()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkDysuria()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkHematuria().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkHematuria()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkHematuria()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkHematuria()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkHesitancy().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkHesitancy()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkHesitancy()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkHesitancy()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkFrequent().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkFrequent()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkFrequent()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkFrequent()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkCatheter().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkCatheter()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkCatheter()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkCatheter()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkGenitourinaryOther()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkGenitourinaryOther()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkGenitourinaryOther()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkGenitourinaryOther()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkMenstrual().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkMenstrual()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkMenstrual()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkMenstrual()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkPregnancy().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkPregnancy()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkPregnancy()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkPregnancy()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkLMP().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkLMP()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkLMP().equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkLMP().equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkGenitourinaryFemaleOther()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkGenitourinaryFemaleOther()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkGenitourinaryFemaleOther()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkGenitourinaryFemaleOther()
	  											.equalsIgnoreCase("0")) {

	  						HeaderTable33a.addCell(new Phrase("Genitourinary:", subheader));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityGenitourinary()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable33a.addCell(new Phrase("No Abnormality Detected", tabletext2));
	  						else
	  							HeaderTable33a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkDysuria().equalsIgnoreCase("1"))
	  							HeaderTable33a.addCell(new Phrase("Dysuria", tabletext2));
	  						else
	  							HeaderTable33a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkHematuria().equalsIgnoreCase("1"))
	  							HeaderTable33a.addCell(new Phrase("Hematuria", tabletext2));
	  						else
	  							HeaderTable33a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkHesitancy().equalsIgnoreCase("1"))
	  							HeaderTable33a.addCell(new Phrase("Hesitancy", tabletext2));
	  						else
	  							HeaderTable33a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkFrequent().equalsIgnoreCase("1"))
	  							HeaderTable33a.addCell(new Phrase("Frequent", tabletext2));
	  						else
	  							HeaderTable33a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkCatheter().equalsIgnoreCase("1"))
	  							HeaderTable33a.addCell(new Phrase("On Catheter", tabletext2));
	  						else
	  							HeaderTable33a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkGenitourinaryOther()
	  								.equalsIgnoreCase("1")) {
	  							HeaderTable33a.addCell(new Phrase("Other", tabletext2));
	  						} else {
	  							HeaderTable33a.addCell(new Phrase("", tabletext2));
	  						}
	  						HeaderTable35a.addCell(new Phrase("", tabletext2));
	  						HeaderTable35a.addCell(new Phrase("For Female -", subheader));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkMenstrual().equalsIgnoreCase("1")) {
	  							HeaderTable35a.addCell(new Phrase("	Menstrual History", tabletext2));
	  						} else {
	  							HeaderTable35a.addCell(new Phrase("", tabletext2));
	  						}
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkPregnancy().equalsIgnoreCase("1")) {
	  							HeaderTable35a.addCell(new Phrase("Pregnancy", tabletext2));
	  						} else {
	  							HeaderTable35a.addCell(new Phrase("", tabletext2));
	  						}
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkLMP().equalsIgnoreCase("1")) {
	  							HeaderTable35a.addCell(new Phrase("	LMP", tabletext2));
	  						} else {
	  							HeaderTable35a.addCell(new Phrase("", tabletext2));
	  						}
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkGenitourinaryFemaleOther()
	  								.equalsIgnoreCase("1")) {
	  							HeaderTable35a.addCell(new Phrase("Other", tabletext2));
	  						} else {
	  							HeaderTable35a.addCell(new Phrase("", tabletext2));
	  						}
	  					}

	  					document.add(HeaderTable33a);
	  					HeaderTable33a.flushContent();

	  					document.add(HeaderTable35a);
	  					HeaderTable35a.flushContent();

	  					PdfPTable HeaderTable34a = new PdfPTable(10);
	  					int[] headerwidth34b = { 10, 20, 10, 10, 10, 8, 8, 10, 10, 5 };
	  					HeaderTable34a.setWidths(headerwidth34b);
	  					HeaderTable34a.setWidthPercentage(95f);
	  					HeaderTable34a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityNeurology()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityNeurology()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityNeurology()
	  									.equalsIgnoreCase("")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityNeurology()
	  									.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkComatose().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkComatose()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkComatose()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkComatose()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkSemi_Comatose()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSemi_Comatose()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSemi_Comatose()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSemi_Comatose()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkNeurologyParalysed()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkNeurologyParalysed()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkNeurologyParalysed()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkNeurologyParalysed()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkSedated().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSedated()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSedated()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSedated()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkLathargic().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkLathargic()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkLathargic()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkLathargic()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkConfused().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkConfused()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkConfused()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkConfused()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkUnsteady().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkUnsteady()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkUnsteady()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkUnsteady()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkNeurologyOther()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkNeurologyOther()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkNeurologyOther()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkNeurologyOther()
	  											.equalsIgnoreCase("0")) {

	  						HeaderTable34a.addCell(new Phrase("Neurology:", subheader));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalityNeurology()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable34a.addCell(new Phrase("No Abnormality Detected", tabletext2));
	  						else
	  							HeaderTable34a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkComatose().equalsIgnoreCase("1"))
	  							HeaderTable34a.addCell(new Phrase("Comatose", tabletext2));
	  						else
	  							HeaderTable34a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkSemi_Comatose().equalsIgnoreCase("1"))
	  							HeaderTable34a.addCell(new Phrase("Semi-Comatose", tabletext2));
	  						else
	  							HeaderTable34a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkNeurologyParalysed()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable34a.addCell(new Phrase("Paralysed", tabletext2));
	  						else
	  							HeaderTable34a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkSedated().equalsIgnoreCase("1"))
	  							HeaderTable34a.addCell(new Phrase("Sedated", tabletext2));
	  						else
	  							HeaderTable34a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkLathargic().equalsIgnoreCase("1"))
	  							HeaderTable34a.addCell(new Phrase("Lathargic", tabletext2));
	  						else
	  							HeaderTable34a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkConfused().equalsIgnoreCase("1"))
	  							HeaderTable34a.addCell(new Phrase("Confused", tabletext2));
	  						else
	  							HeaderTable34a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkUnsteady().equalsIgnoreCase("1"))
	  							HeaderTable34a.addCell(new Phrase("	Unsteady", tabletext2));
	  						else
	  							HeaderTable34a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkNeurologyOther().equalsIgnoreCase("1"))
	  							HeaderTable34a.addCell(new Phrase("Other", tabletext2));
	  						else
	  							HeaderTable34a.addCell(new Phrase("", tabletext2));

	  					}

	  					document.add(HeaderTable34a);
	  					HeaderTable34a.flushContent();

	  					PdfPTable HeaderTable36a = new PdfPTable(8);
	  					int[] headerwidth36b = { 15, 20, 10, 8, 8, 8, 8, 10 };
	  					HeaderTable36a.setWidths(headerwidth36b);
	  					HeaderTable36a.setWidthPercentage(95f);
	  					HeaderTable36a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					PdfPTable HeaderTable37a = new PdfPTable(3);
	  					int[] headerwidth37b = { 30, 10, 60 };
	  					HeaderTable37a.setWidths(headerwidth37b);
	  					HeaderTable37a.setWidthPercentage(95f);
	  					HeaderTable37a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalitySkin_Extremities()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalitySkin_Extremities()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalitySkin_Extremities()
	  									.equalsIgnoreCase("")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalitySkin_Extremities()
	  									.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkProsthesis().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkProsthesis()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkProsthesis()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkProsthesis()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkSwelling().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSwelling()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSwelling()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSwelling()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkClubbing().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkClubbing()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkClubbing()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkClubbing()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkCyanosis().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkCyanosis()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkCyanosis()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkCyanosis()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkReferralsOther()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkReferralsOther()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkReferralsOther()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkReferralsOther()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkPoor_Turgor()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkPoor_Turgor()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkPoor_Turgor()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkPoor_Turgor()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkSkin_ExtremitiesHot()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSkin_ExtremitiesHot()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSkin_ExtremitiesHot()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSkin_ExtremitiesHot()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkSkin_ExtremitiesCool()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSkin_ExtremitiesCool()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSkin_ExtremitiesCool()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSkin_ExtremitiesCool()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkSkin_ExtremitiesOther()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSkin_ExtremitiesOther()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSkin_ExtremitiesOther()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkSkin_ExtremitiesOther()
	  											.equalsIgnoreCase("0")) {

	  						HeaderTable36a.addCell(new Phrase("Skin & Extremities:", subheader));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkAbnormalitySkin_Extremities()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable36a.addCell(new Phrase("No Abnormality Detected", tabletext2));
	  						else
	  							HeaderTable36a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkProsthesis().equalsIgnoreCase("1"))
	  							HeaderTable36a.addCell(new Phrase("Prosthesis", tabletext2));
	  						else
	  							HeaderTable36a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkSwelling().equalsIgnoreCase("1"))
	  							HeaderTable36a.addCell(new Phrase("Swelling", tabletext2));
	  						else
	  							HeaderTable36a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkClubbing().equalsIgnoreCase("1"))
	  							HeaderTable36a.addCell(new Phrase("Clubbing", tabletext2));
	  						else
	  							HeaderTable36a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkCyanosis().equalsIgnoreCase("1"))
	  							HeaderTable36a.addCell(new Phrase("Cyanosis", tabletext2));
	  						else
	  							HeaderTable36a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkReferralsOther().equalsIgnoreCase("1"))
	  							HeaderTable36a.addCell(new Phrase("Deformity", tabletext2));
	  						else
	  							HeaderTable36a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkPoor_Turgor().equalsIgnoreCase("1")) {
	  							HeaderTable36a.addCell(new Phrase("Poor Turgor", tabletext2));
	  						} else {
	  							HeaderTable36a.addCell(new Phrase("", tabletext2));
	  						}
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkSkin_ExtremitiesHot()
	  								.equalsIgnoreCase("1")) {
	  							HeaderTable37a.addCell(new Phrase("                                Hot/Warm", tabletext2));
	  						} else {
	  							HeaderTable37a.addCell(new Phrase("", tabletext2));
	  						}
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkSkin_ExtremitiesCool()
	  								.equalsIgnoreCase("1")) {
	  							HeaderTable37a.addCell(new Phrase("	Cool", tabletext2));
	  						} else {
	  							HeaderTable37a.addCell(new Phrase("", tabletext2));
	  						}
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkSkin_ExtremitiesOther()
	  								.equalsIgnoreCase("1")) {
	  							HeaderTable37a.addCell(new Phrase("Other", tabletext2));
	  						} else {
	  							HeaderTable37a.addCell(new Phrase("", tabletext2));
	  						}

	  					}

	  					document.add(HeaderTable36a);
	  					HeaderTable36a.flushContent();

	  					document.add(HeaderTable37a);
	  					HeaderTable37a.flushContent();

	  					PdfPTable HeaderTable38a = new PdfPTable(7);
	  					int[] headerwidth38b = { 10, 10, 10, 10, 10, 10, 10 };
	  					HeaderTable38a.setWidths(headerwidth38b);
	  					HeaderTable38a.setWidthPercentage(95f);
	  					HeaderTable38a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getChkReferralDiet().equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkReferralDiet()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkReferralDiet().equalsIgnoreCase("")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getChkReferralDiet().equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkPhysiotherapy()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkPhysiotherapy()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkPhysiotherapy()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkPhysiotherapy()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkYoga().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkYoga()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkYoga().equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkYoga().equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkCounseler().equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkCounseler()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkCounseler()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkCounseler()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkReferralsPain_Management()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkReferralsPain_Management()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkReferralsOther()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkReferralsOther()
	  											.equalsIgnoreCase("0")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getChkReferralsOther()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkReferralsOther()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkReferralsOther()
	  											.equalsIgnoreCase("")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getChkReferralsOther()
	  											.equalsIgnoreCase("0")) {

	  						HeaderTable27a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  						HeaderTable27a.addCell(
	  								new Phrase("Referrals(other Than clinical specialties)requested by the Patient/Family:",
	  										subheader));
	  						HeaderTable27a.addCell(new Phrase("", subheader2));
	  						HeaderTable27a.addCell(new Phrase("", header2));

	  						HeaderTable38a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkReferralDiet().equalsIgnoreCase("1"))
	  							HeaderTable38a.addCell(new Phrase("Diet", tabletext2));
	  						else
	  							HeaderTable38a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkPhysiotherapy().equalsIgnoreCase("1"))
	  							HeaderTable38a.addCell(new Phrase("Physiotherapy", tabletext2));
	  						else
	  							HeaderTable38a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkYoga().equalsIgnoreCase("1"))
	  							HeaderTable38a.addCell(new Phrase("Yoga", tabletext2));
	  						else
	  							HeaderTable38a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkCounseler().equalsIgnoreCase("1"))
	  							HeaderTable38a.addCell(new Phrase("Counseler", tabletext2));
	  						else
	  							HeaderTable38a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkReferralsPain_Management()
	  								.equalsIgnoreCase("1"))
	  							HeaderTable38a.addCell(new Phrase("Pain Management", tabletext2));
	  						else
	  							HeaderTable38a.addCell(new Phrase("", tabletext2));
	  						if (assessmentDt2oObj.getListpediatric2().get(0).getChkReferralsOther().equalsIgnoreCase("1"))
	  							HeaderTable38a.addCell(new Phrase("Other", tabletext2));
	  						else
	  							HeaderTable38a.addCell(new Phrase("", tabletext2));

	  					}
	  					document.add(HeaderTable27a);
	  					HeaderTable27a.flushContent();

	  					document.add(HeaderTable38a);
	  					HeaderTable38a.flushContent();

	  					HeaderTable14a.addCell(new Phrase("", subheader2));
	  					HeaderTable14a.addCell(new Phrase("", subheader2));
	  					HeaderTable14a.addCell(new Phrase("", subheader2));
	  					HeaderTable14a.addCell(new Phrase("", subheader2));

	  					document.add(HeaderTable14a);
	  					HeaderTable14a.flushContent();

	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaAssessemntPlan()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaAssessemntPlan()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaAssessemntPlan()
	  									.equalsIgnoreCase("")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaNursing_DiagnosisPlan()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaNursing_DiagnosisPlan()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaNursing_DiagnosisPlan()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaPlanningNursing()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaPlanningNursing()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaPlanningNursing()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaInterventionNursing()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaInterventionNursing()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaInterventionNursing()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaEvaluationPlan()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaEvaluationPlan()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaEvaluationPlan()
	  											.equalsIgnoreCase("")) {
	  						HeaderTable27a.getDefaultCell().setBorder(Rectangle.TOP);
	  						HeaderTable27a.addCell(new Phrase("Nursing Care Plan", subheader2));
	  						HeaderTable27a.addCell(new Phrase("", subheader2));
	  						HeaderTable27a.addCell(new Phrase("", header2));
	  						HeaderTable27a.addCell(new Phrase("", subheader2));
	  						HeaderTable27a.addCell(new Phrase("", subheader2));
	  						HeaderTable27a.addCell(new Phrase("", header2));
	  					}
	  					document.add(HeaderTable27a);
	  					HeaderTable27a.flushContent();

	  					PdfPTable HeaderTable39a = new PdfPTable(2);
	  					int[] headerwidth39b = { 20, 80 };
	  					HeaderTable39a.setWidths(headerwidth39b);
	  					HeaderTable39a.setWidthPercentage(95f);
	  					HeaderTable39a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaAssessemntPlan()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaAssessemntPlan()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaAssessemntPlan()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable39a.addCell(new Phrase("Assessemnt:", subheader));
	  						HeaderTable39a.addCell(new Phrase(
	  								assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaAssessemntPlan(), tabletext2));
	  					} else {
	  						HeaderTable39a.addCell(new Phrase("", tabletext2));
	  						HeaderTable39a.addCell(new Phrase("", tabletext2));
	  					}

	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaNursing_DiagnosisPlan()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaNursing_DiagnosisPlan()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaNursing_DiagnosisPlan()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable39a.addCell(new Phrase("Nursing Diagnosis:", subheader));
	  						HeaderTable39a.addCell(new Phrase(
	  								assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaNursing_DiagnosisPlan(),
	  								tabletext2));
	  					} else {
	  						HeaderTable39a.addCell(new Phrase("", tabletext2));
	  						HeaderTable39a.addCell(new Phrase("", tabletext2));
	  					}
	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaPlanningNursing()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaPlanningNursing()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaPlanningNursing()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable39a.addCell(new Phrase("Planning:", subheader));
	  						HeaderTable39a.addCell(new Phrase(
	  								assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaPlanningNursing(), tabletext2));
	  					} else {
	  						HeaderTable39a.addCell(new Phrase("", tabletext2));
	  						HeaderTable39a.addCell(new Phrase("", tabletext2));
	  					}
	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaInterventionNursing()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaInterventionNursing()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaInterventionNursing()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable39a.addCell(new Phrase("Intervention:", subheader));
	  						HeaderTable39a.addCell(
	  								new Phrase(assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaInterventionNursing(),
	  										tabletext2));
	  					} else {
	  						HeaderTable39a.addCell(new Phrase("", tabletext2));
	  						HeaderTable39a.addCell(new Phrase("", tabletext2));
	  					}
	  					if (!assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaEvaluationPlan()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaEvaluationPlan()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaEvaluationPlan()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable39a.addCell(new Phrase("Evaluation:", subheader));
	  						HeaderTable39a.addCell(new Phrase(
	  								assessmentDt2oObj.getListpediatric2().get(0).getTxtAreaEvaluationPlan(), tabletext2));
	  					} else {
	  						HeaderTable39a.addCell(new Phrase("", tabletext2));
	  						HeaderTable39a.addCell(new Phrase("", tabletext2));
	  					}

	  					HeaderTable39a.addCell(new Phrase("", tabletext2));
	  					HeaderTable39a.addCell(new Phrase("", tabletext2));
	  					HeaderTable39a.addCell(new Phrase("", tabletext2));
	  					HeaderTable39a.addCell(new Phrase("", tabletext2));
	  					HeaderTable39a.addCell(new Phrase("", tabletext2));
	  					HeaderTable39a.addCell(new Phrase("", tabletext2));

	  					document.add(HeaderTable39a);
	  					HeaderTable39a.flushContent();

	  				}

	  				document.newPage();

	  				if (assessmentDt3oObj.getListpediatric3().size() != 0) {

	  					HeaderTable10a.addCell(new Phrase("", header2));
	  					HeaderTable10a.addCell(new Phrase("", header2));
	  					HeaderTable10a.addCell(new Phrase("", header2));

	  					HeaderTable10a.addCell(new Phrase("", header2));
	  					HeaderTable10a.addCell(new Phrase("Restraint Assessment Form", header1));
	  					HeaderTable10a.addCell(new Phrase("", header2));

	  					document.add(HeaderTable10a);
	  					HeaderTable10a.flushContent();

	  					PdfPTable HeaderTable40a = new PdfPTable(2);
	  					int[] headerwidth40b = { 65, 25 };
	  					HeaderTable40a.setWidths(headerwidth40b);
	  					HeaderTable40a.setWidthPercentage(95f);
	  					HeaderTable40a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getChkBehaviourRestraint()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getChkBehaviourRestraint()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getChkBehaviourRestraint()
	  									.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkIv().equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkIv()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkIv().equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkVoluntary().equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkVoluntary()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkVoluntary()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkUnfollowInstructions()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkUnfollowInstructions()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkUnfollowInstructions()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkInitiationOthers()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkInitiationOthers()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkInitiationOthers()
	  											.equalsIgnoreCase("")) {
	  						HeaderTable40a.addCell(new Phrase("A.) Assessment And Initiation:", subheader));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  					} else {
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  					}

	  					document.add(HeaderTable40a);
	  					HeaderTable40a.flushContent();

	  					PdfPTable HeaderTable41a = new PdfPTable(2);
	  					int[] headerwidth41b = { 30, 60 };
	  					HeaderTable41a.setWidths(headerwidth41b);
	  					HeaderTable41a.setWidthPercentage(95f);
	  					HeaderTable41a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkBehaviourRestraint().equalsIgnoreCase("1"))

	  						HeaderTable41a.addCell(new Phrase("Check behaviour that warrant use of restraint", tabletext2));
	  					else
	  						HeaderTable41a.addCell(new Phrase("", tabletext2));

	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkIv().equalsIgnoreCase("1"))

	  						HeaderTable41a.addCell(new Phrase(
	  								"Attempting to remove tubes,lines,or IV's or dressing/Surgical wounds", tabletext2));
	  					else
	  						HeaderTable41a.addCell(new Phrase("", tabletext2));

	  					document.add(HeaderTable41a);
	  					HeaderTable41a.flushContent();

	  					PdfPTable HeaderTable42a = new PdfPTable(3);
	  					int[] headerwidth42b = { 50, 30, 10 };
	  					HeaderTable42a.setWidths(headerwidth42b);
	  					HeaderTable42a.setWidthPercentage(95f);
	  					HeaderTable42a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkVoluntary().equalsIgnoreCase("1"))

	  						HeaderTable42a.addCell(new Phrase(
	  								"Voluntary or involuntary movement that may reinjure a treated condition", tabletext2));
	  					else
	  						HeaderTable42a.addCell(new Phrase("", tabletext2));

	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkUnfollowInstructions().equalsIgnoreCase("1"))

	  						HeaderTable42a.addCell(new Phrase("Unable to follow directions or instruction ", tabletext2));
	  					else
	  						HeaderTable42a.addCell(new Phrase("", tabletext2));

	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkInitiationOthers().equalsIgnoreCase("1"))

	  						HeaderTable42a.addCell(new Phrase("Others", tabletext2));
	  					else
	  						HeaderTable42a.addCell(new Phrase("", tabletext2));

	  					document.add(HeaderTable42a);
	  					HeaderTable42a.flushContent();

	  					PdfPTable HeaderTable43a = new PdfPTable(3);
	  					int[] headerwidth43b = { 80, 10, 10 };
	  					HeaderTable43a.setWidths(headerwidth43b);
	  					HeaderTable43a.setWidthPercentage(95f);
	  					HeaderTable43a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getChkVerbalIntervention()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getChkVerbalIntervention()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getChkVerbalIntervention()
	  									.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkCompanionship()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkCompanionship()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkCompanionship()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkFrequentMonitoring()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkFrequentMonitoring()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkFrequentMonitoring()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkcomfort().equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkcomfort()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkcomfort()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkReality().equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkReality()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkReality()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkEnviromental()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkEnviromental()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkEnviromental()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkRelaxation().equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkRelaxation()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkRelaxation()
	  											.equalsIgnoreCase("")) {
	  						HeaderTable43a.addCell(new Phrase("", header2));
	  						HeaderTable43a.addCell(new Phrase("", subheader2));
	  						HeaderTable43a.addCell(new Phrase("", header2));
	  						HeaderTable43a.getDefaultCell().setBorder(Rectangle.TOP);

	  						HeaderTable43a.addCell(new Phrase(
	  								"Less restrictive method tried or considered(check boxes that apply)", subheader));
	  						HeaderTable43a.addCell(new Phrase("Yes", subheader));
	  						HeaderTable43a.addCell(new Phrase("No", subheader));

	  						HeaderTable43a.addCell(new Phrase("", header2));
	  						HeaderTable43a.addCell(new Phrase("", subheader2));
	  						HeaderTable43a.addCell(new Phrase("", header2));
	  						HeaderTable43a.getDefaultCell().setBorder(Rectangle.BOTTOM);

	  					} else {
	  						HeaderTable43a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  						HeaderTable43a.addCell(new Phrase("", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("", tabletext2));
	  					}

	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkVerbalIntervention().equalsIgnoreCase("1")) {
	  						HeaderTable43a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  						HeaderTable43a.addCell(new Phrase(
	  								"Verbal intervention(E.g. talk calmly,give one direction at a time, reasserance)",
	  								tabletext2));
	  						HeaderTable43a.addCell(new Phrase("Yes", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("", tabletext2));
	  					} else {
	  						HeaderTable43a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  						HeaderTable43a.addCell(new Phrase(
	  								"Verbal intervention(E.g. talk calmly,give one direction at a time, reasserance)",
	  								tabletext2));
	  						HeaderTable43a.addCell(new Phrase("", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("No", tabletext2));
	  					}
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkCompanionship().equalsIgnoreCase("1")) {
	  						HeaderTable43a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  						HeaderTable43a
	  								.addCell(new Phrase("Companionship(E.g. family member, neighbour,friend)", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("Yes", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("", tabletext2));
	  					} else {
	  						HeaderTable43a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  						HeaderTable43a
	  								.addCell(new Phrase("Companionship(E.g. family member, neighbour,friend)", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("No", tabletext2));
	  					}
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkFrequentMonitoring().equalsIgnoreCase("1")) {
	  						HeaderTable43a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  						HeaderTable43a.addCell(new Phrase(
	  								"Frequent monitoring(E.g. place bed in direct view of nurse station)", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("Yes", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("", tabletext2));
	  					} else {
	  						HeaderTable43a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  						HeaderTable43a.addCell(new Phrase(
	  								"Frequent monitoring(E.g. place bed in direct view of nurse station)", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("No", tabletext2));
	  					}
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkcomfort().equalsIgnoreCase("1")) {
	  						HeaderTable43a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  						HeaderTable43a.addCell(new Phrase(
	  								"comfort measures(E.g. frequent toileting,pain control,positioning)", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("Yes", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("", tabletext2));
	  					} else {
	  						HeaderTable43a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  						HeaderTable43a.addCell(new Phrase(
	  								"comfort measures(E.g. frequent toileting,pain control,positioning)", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("No", tabletext2));
	  					}
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkReality().equalsIgnoreCase("1")) {
	  						HeaderTable43a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  						HeaderTable43a.addCell(
	  								new Phrase("Reality orientation(E.g. explanation, glasses, hearing aids)", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("Yes", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("", tabletext2));
	  					} else {
	  						HeaderTable43a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  						HeaderTable43a.addCell(new Phrase(
	  								"Reality orientation(E.g. explanation, glasses, hearing aids) ", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("No", tabletext2));
	  					}
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkEnviromental().equalsIgnoreCase("1")) {
	  						HeaderTable43a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  						HeaderTable43a.addCell(new Phrase(
	  								"Enviromental intervention(E.g. reduce stimuli,decrease noise,reduce light,cover lines or tubes)",
	  								tabletext2));
	  						HeaderTable43a.addCell(new Phrase("Yes", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("", tabletext2));
	  					} else {
	  						HeaderTable43a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  						HeaderTable43a.addCell(new Phrase(
	  								"Enviromental intervention(E.g. reduce stimuli,decrease noise,reduce light,cover lines or tubes)",
	  								tabletext2));
	  						HeaderTable43a.addCell(new Phrase("", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("No", tabletext2));
	  					}
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkRelaxation().equalsIgnoreCase("1")) {
	  						HeaderTable43a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  						HeaderTable43a.addCell(new Phrase(
	  								"Relaxation techniques(E.g. soft music, slow deep breathing, dim lights)", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("Yes", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("", tabletext2));
	  					} else {
	  						HeaderTable43a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  						HeaderTable43a.addCell(new Phrase(
	  								"Relaxation techniques(E.g. soft music, slow deep breathing, dim lights)", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("", tabletext2));
	  						HeaderTable43a.addCell(new Phrase("No", tabletext2));
	  					}

	  					HeaderTable43a.getDefaultCell().setBorder(Rectangle.BOTTOM);
	  					HeaderTable43a.addCell(new Phrase("", tabletext2));
	  					HeaderTable43a.addCell(new Phrase("", tabletext2));
	  					HeaderTable43a.addCell(new Phrase("", tabletext2));

	  					document.add(HeaderTable43a);
	  					HeaderTable43a.flushContent();

	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getTxtNameOfPersonContacted()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtNameOfPersonContacted()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtNameOfPersonContacted()
	  									.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getTxtRelationWithPatient()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtRelationWithPatient()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtRelationWithPatient()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getTimeEducation().equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getTimeEducation()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getTimeEducation()
	  											.equalsIgnoreCase("")) {
	  						HeaderTable40a.addCell(new Phrase("B.) Patient/Family Education:", subheader));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  						HeaderTable40a.addCell(new Phrase(
	  								"Family/informed of need for restraint and criteria for release", tabletext2));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));

	  					} else {
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  					}

	  					document.add(HeaderTable40a);
	  					HeaderTable40a.flushContent();

	  					PdfPTable HeaderTable44a = new PdfPTable(6);
	  					int[] headerwidth44b = { 20, 20, 20, 20, 10, 10 };
	  					HeaderTable44a.setWidths(headerwidth44b);
	  					HeaderTable44a.setWidthPercentage(95f);
	  					HeaderTable44a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getTxtNameOfPersonContacted()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtNameOfPersonContacted()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtNameOfPersonContacted()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable44a.addCell(new Phrase("Name of person contacted:", tabletext2));
	  						HeaderTable44a.addCell(
	  								new Phrase(assessmentDt3oObj.getListpediatric3().get(0).getTxtNameOfPersonContacted(),
	  										tabletext2));
	  					} else {
	  						HeaderTable44a.addCell(new Phrase("", tabletext2));
	  						HeaderTable44a.addCell(new Phrase("", tabletext2));

	  					}
	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getTxtRelationWithPatient()
	  							.equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtRelationWithPatient()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtRelationWithPatient()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable44a.addCell(new Phrase("Relation with patient:", tabletext2));
	  						HeaderTable44a.addCell(new Phrase(
	  								assessmentDt3oObj.getListpediatric3().get(0).getTxtRelationWithPatient(), tabletext2));
	  					} else {
	  						HeaderTable44a.addCell(new Phrase("", tabletext2));
	  						HeaderTable44a.addCell(new Phrase("", tabletext2));

	  					}
	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getTimeEducation().equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTimeEducation()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTimeEducation().equalsIgnoreCase("")) {
	  						HeaderTable44a.addCell(new Phrase("	Time:", tabletext2));
	  						HeaderTable44a.addCell(new Phrase(
	  								assessmentDt3oObj.getListpediatric3().get(0).getTimeEducation(), tabletext2));
	  					} else {
	  						HeaderTable44a.addCell(new Phrase("", tabletext2));
	  						HeaderTable44a.addCell(new Phrase("", tabletext2));

	  					}

	  					document.add(HeaderTable44a);
	  					HeaderTable44a.flushContent();

	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getChkSoftWrist().equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftWrist()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftWrist().equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftWristLeft()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftWristLeft()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftWristLeft()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftWristRight()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftWristRight()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftWristRight()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftWristBoth()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftWristBoth()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftWristBoth()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftAnkle().equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftAnkle()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftAnkle()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftAnkleLeft()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftAnkleLeft()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftAnkleLeft()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftAnkleRight()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftAnkleRight()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftAnkleRight()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftAnkleBoth()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftAnkleBoth()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkSoftAnkleBoth()
	  											.equalsIgnoreCase("")) {
	  						HeaderTable40a.addCell(new Phrase("C.) Type Of Restraints Used:", subheader));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  						HeaderTable40a.addCell(new Phrase("Physical:", subheader));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));

	  					} else {
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  					}

	  					document.add(HeaderTable40a);
	  					HeaderTable40a.flushContent();

	  					PdfPTable HeaderTable45a = new PdfPTable(4);
	  					int[] headerwidth45b = { 10, 10, 10, 70 };
	  					HeaderTable45a.setWidths(headerwidth45b);
	  					HeaderTable45a.setWidthPercentage(95f);
	  					HeaderTable45a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkSoftWrist().equalsIgnoreCase("1"))
	  						HeaderTable45a.addCell(new Phrase("Soft wrist", subheader));
	  					else
	  						HeaderTable45a.addCell(new Phrase("", tabletext2));
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkSoftWristLeft().equalsIgnoreCase("1"))
	  						HeaderTable45a.addCell(new Phrase("	Left", tabletext2));
	  					else
	  						HeaderTable45a.addCell(new Phrase("", tabletext2));
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkSoftWristRight().equalsIgnoreCase("1"))
	  						HeaderTable45a.addCell(new Phrase("	Right", tabletext2));
	  					else
	  						HeaderTable45a.addCell(new Phrase("", tabletext2));
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkSoftWristBoth().equalsIgnoreCase("1"))
	  						HeaderTable45a.addCell(new Phrase("	Both ", tabletext2));
	  					else
	  						HeaderTable45a.addCell(new Phrase("", tabletext2));
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkSoftAnkle().equalsIgnoreCase("1"))
	  						HeaderTable45a.addCell(new Phrase("Soft Ankle", subheader));
	  					else
	  						HeaderTable45a.addCell(new Phrase("", tabletext2));
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkSoftAnkleLeft().equalsIgnoreCase("1"))
	  						HeaderTable45a.addCell(new Phrase("	Left", tabletext2));
	  					else
	  						HeaderTable45a.addCell(new Phrase("", tabletext2));
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkSoftAnkleRight().equalsIgnoreCase("1"))
	  						HeaderTable45a.addCell(new Phrase("	Right", tabletext2));
	  					else
	  						HeaderTable45a.addCell(new Phrase("", tabletext2));
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkSoftAnkleBoth().equalsIgnoreCase("1"))
	  						HeaderTable45a.addCell(new Phrase("	Both ", tabletext2));
	  					else
	  						HeaderTable45a.addCell(new Phrase("", tabletext2));

	  					document.add(HeaderTable45a);
	  					HeaderTable45a.flushContent();

	  					PdfPTable HeaderTable46a = new PdfPTable(6);
	  					int[] headerwidth46b = { 10, 15, 5, 15, 5, 50 };
	  					HeaderTable46a.setWidths(headerwidth46b);
	  					HeaderTable46a.setWidthPercentage(95f);
	  					HeaderTable46a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getTxtChemical().equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtChemical()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtChemical().equalsIgnoreCase("")) {
	  						HeaderTable46a.addCell(new Phrase("Chemical", subheader));
	  						HeaderTable46a.addCell(
	  								new Phrase(assessmentDt3oObj.getListpediatric3().get(0).getTxtChemical(), tabletext2));
	  					} else {
	  						HeaderTable46a.addCell(new Phrase("", tabletext2));
	  						HeaderTable46a.addCell(new Phrase("", tabletext2));

	  					}
	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getTxtDrugs().equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtDrugs().equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtDrugs().equalsIgnoreCase("")) {
	  						HeaderTable46a.addCell(new Phrase("Drugs", subheader));
	  						HeaderTable46a.addCell(
	  								new Phrase(assessmentDt3oObj.getListpediatric3().get(0).getTxtDrugs(), tabletext2));
	  					} else {
	  						HeaderTable46a.addCell(new Phrase("", tabletext2));
	  						HeaderTable46a.addCell(new Phrase("", tabletext2));

	  					}
	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getTxtDose().equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtDose().equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtDose().equalsIgnoreCase("")) {
	  						HeaderTable46a.addCell(new Phrase("Dose", subheader));
	  						HeaderTable46a.addCell(
	  								new Phrase(assessmentDt3oObj.getListpediatric3().get(0).getTxtDose(), tabletext2));
	  					} else {
	  						HeaderTable46a.addCell(new Phrase("", tabletext2));
	  						HeaderTable46a.addCell(new Phrase("", tabletext2));
	  					}

	  					document.add(HeaderTable46a);
	  					HeaderTable46a.flushContent();

	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getTxtRestraintsName().equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtRestraintsName()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtRestraintsName().equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getTxtConsultant_Doctor()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtConsultant_Doctor()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtConsultant_Doctor()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getDatePickForDoc()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getDatePickForDoc()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getDatePickForDoc()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getDocTme().equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getDocTme()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getDocTme().equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getTxtPrimaryNurse()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtPrimaryNurse()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtPrimaryNurse()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getDatePickForNurse()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getDatePickForNurse()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getDatePickForNurse()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getNurseTme().equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getNurseTme()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getNurseTme()
	  											.equalsIgnoreCase("")) {
	  						HeaderTable40a.addCell(new Phrase("D.) Verbal Order For Restraints:", subheader));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  					} else {
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  					}

	  					document.add(HeaderTable40a);
	  					HeaderTable40a.flushContent();

	  					PdfPTable HeaderTable47a = new PdfPTable(2);
	  					int[] headerwidth47b = { 10, 90 };
	  					HeaderTable47a.setWidths(headerwidth47b);
	  					HeaderTable47a.setWidthPercentage(95f);
	  					HeaderTable47a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getTxtRestraintsName().equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtRestraintsName()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtRestraintsName()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable47a.addCell(new Phrase("Name:", subheader));
	  						HeaderTable47a.addCell(new Phrase(
	  								assessmentDt3oObj.getListpediatric3().get(0).getTxtRestraintsName(), tabletext2));
	  					} else {
	  						HeaderTable47a.addCell(new Phrase("", tabletext2));
	  						HeaderTable47a.addCell(new Phrase("", tabletext2));

	  					}

	  					document.add(HeaderTable47a);
	  					HeaderTable47a.flushContent();

	  					PdfPTable HeaderTable49a = new PdfPTable(6);
	  					int[] headerwidth49b = { 20, 15, 10, 15, 10, 55 };
	  					HeaderTable49a.setWidths(headerwidth49b);
	  					HeaderTable49a.setWidthPercentage(95f);
	  					HeaderTable49a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getTxtConsultant_Doctor().equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtConsultant_Doctor()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtConsultant_Doctor()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable49a.addCell(new Phrase("Consultant/Doctor:", subheader));
	  						HeaderTable49a.addCell(new Phrase(
	  								assessmentDt3oObj.getListpediatric3().get(0).getTxtConsultant_Doctor(), tabletext2));
	  					} else {
	  						HeaderTable49a.addCell(new Phrase("", tabletext2));
	  						HeaderTable49a.addCell(new Phrase("", tabletext2));

	  					}

	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getDatePickForDoc().equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getDatePickForDoc()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getDatePickForDoc().equalsIgnoreCase("")) {
	  						HeaderTable49a.addCell(new Phrase("Date:", subheader));
	  						HeaderTable49a.addCell(new Phrase(
	  								assessmentDt3oObj.getListpediatric3().get(0).getDatePickForDoc(), tabletext2));
	  					} else {
	  						HeaderTable49a.addCell(new Phrase("", tabletext2));
	  						HeaderTable49a.addCell(new Phrase("", tabletext2));

	  					}
	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getDocTme().equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getDocTme().equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getDocTme().equalsIgnoreCase("")) {
	  						HeaderTable49a.addCell(new Phrase("Time:", subheader));
	  						HeaderTable49a.addCell(
	  								new Phrase(assessmentDt3oObj.getListpediatric3().get(0).getDocTme(), tabletext2));
	  					} else {
	  						HeaderTable49a.addCell(new Phrase("", tabletext2));
	  						HeaderTable49a.addCell(new Phrase("", tabletext2));

	  					}

	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getTxtPrimaryNurse().equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtPrimaryNurse()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtPrimaryNurse()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable49a.addCell(new Phrase("Primary Nurse:", subheader));
	  						HeaderTable49a.addCell(new Phrase(
	  								assessmentDt3oObj.getListpediatric3().get(0).getTxtPrimaryNurse(), tabletext2));
	  					} else {
	  						HeaderTable49a.addCell(new Phrase("", tabletext2));
	  						HeaderTable49a.addCell(new Phrase("", tabletext2));

	  					}

	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getDatePickForNurse().equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getDatePickForNurse()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getDatePickForNurse()
	  									.equalsIgnoreCase("")) {
	  						HeaderTable49a.addCell(new Phrase("Date:", subheader));
	  						HeaderTable49a.addCell(new Phrase(
	  								assessmentDt3oObj.getListpediatric3().get(0).getDatePickForNurse(), tabletext2));
	  					} else {

	  						HeaderTable49a.addCell(new Phrase("", tabletext2));
	  						HeaderTable49a.addCell(new Phrase("", tabletext2));

	  					}
	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getNurseTme().equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getNurseTme().equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getNurseTme().equalsIgnoreCase("")) {
	  						HeaderTable49a.addCell(new Phrase("Time:", subheader));
	  						HeaderTable49a.addCell(
	  								new Phrase(assessmentDt3oObj.getListpediatric3().get(0).getNurseTme(), tabletext2));
	  					} else {
	  						HeaderTable49a.addCell(new Phrase("", tabletext2));
	  						HeaderTable49a.addCell(new Phrase("", tabletext2));

	  					}

	  					document.add(HeaderTable49a);
	  					HeaderTable49a.flushContent();

	  					PdfPTable HeaderTable53a = new PdfPTable(5);
	  					int[] headerwidth53b = { 8, 20, 20, 15, 25 };
	  					HeaderTable53a.setWidths(headerwidth53b);
	  					HeaderTable53a.setWidthPercentage(95f);
	  					HeaderTable53a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					PdfPTable HeaderTable54a = new PdfPTable(5);
	  					int[] headerwidth54b = { 8, 20, 20, 15, 25 };
	  					HeaderTable54a.setWidths(headerwidth53b);
	  					HeaderTable54a.setWidthPercentage(95f);
	  					HeaderTable54a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (assessmentDt3oObj.getVerbalList().size() != 0) {

	  						HeaderTable40a.addCell(new Phrase("", subheader));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  						HeaderTable40a.addCell(new Phrase("", subheader));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));

	  						HeaderTable40a.addCell(new Phrase(
	  								"Attending consultant notified telephonically, if verbal order not obtained from the Attending Consultant.",
	  								subheader));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));

	  						HeaderTable40a
	  								.addCell(new Phrase("(needed As Soon As Possible or within 12 Hours) ", subheader));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));

	  						HeaderTable53a.getDefaultCell().setBorder(Rectangle.TOP);
	  						HeaderTable53a.addCell(new Phrase("Time", subheader));
	  						HeaderTable53a.addCell(new Phrase("Name of Attending Consultant", subheader));
	  						HeaderTable53a.addCell(new Phrase("Notified by Primary Nurse Name", subheader));
	  						HeaderTable53a.addCell(new Phrase("Duty Doctor's Name", subheader));
	  						HeaderTable53a.addCell(new Phrase("Duration\n(not more than 24 hrs.)", subheader));
	  						HeaderTable53a.addCell(new Phrase("", tabletext2));
	  						HeaderTable53a.addCell(new Phrase("", tabletext2));
	  						HeaderTable53a.addCell(new Phrase("", tabletext2));
	  						HeaderTable53a.addCell(new Phrase("", tabletext2));
	  						HeaderTable53a.addCell(new Phrase("", tabletext2));

	  						for (int i = 0; i < assessmentDt3oObj.getVerbalList().size(); i++) {
	  							HeaderTable54a.addCell(new Phrase(
	  									assessmentDt3oObj.getVerbalList().get(i).getTimeForVerbal(), tabletext2));
	  							HeaderTable54a.addCell(new Phrase(
	  									assessmentDt3oObj.getVerbalList().get(i).getConsultingNameForVerbal(), tabletext2));
	  							HeaderTable54a.addCell(new Phrase(
	  									assessmentDt3oObj.getVerbalList().get(i).getPrimiaryNurseVerbal(), tabletext2));
	  							HeaderTable54a.addCell(
	  									new Phrase(assessmentDt3oObj.getVerbalList().get(i).getDoctorVerbal(), tabletext2));
	  							HeaderTable54a.addCell(new Phrase(
	  									assessmentDt3oObj.getVerbalList().get(i).getDurationVerbal(), tabletext2));

	  						}
	  						HeaderTable54a.getDefaultCell().setBorder(Rectangle.TOP);
	  						HeaderTable54a.addCell(new Phrase("", tabletext2));
	  						HeaderTable54a.addCell(new Phrase("", tabletext2));
	  						HeaderTable54a.addCell(new Phrase("", tabletext2));
	  						HeaderTable54a.addCell(new Phrase("", tabletext2));
	  						HeaderTable54a.addCell(new Phrase("", tabletext2));

	  					}

	  					document.add(HeaderTable40a);
	  					HeaderTable40a.flushContent();

	  					document.add(HeaderTable53a);
	  					HeaderTable53a.flushContent();

	  					document.add(HeaderTable54a);
	  					HeaderTable54a.flushContent();

	  					PdfPTable HeaderTable55a = new PdfPTable(5);
	  					int[] headerwidth55b = { 10, 8, 20, 35, 25 };
	  					HeaderTable55a.setWidths(headerwidth55b);
	  					HeaderTable55a.setWidthPercentage(95f);
	  					HeaderTable55a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					PdfPTable HeaderTable56a = new PdfPTable(5);
	  					int[] headerwidth56b = { 10, 8, 20, 35, 25 };
	  					HeaderTable56a.setWidths(headerwidth56b);
	  					HeaderTable56a.setWidthPercentage(95f);
	  					HeaderTable56a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (assessmentDt3oObj.getVerbalList().size() != 0) {
	  						HeaderTable40a.addCell(new Phrase("", subheader));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));

	  						HeaderTable55a.getDefaultCell().setBorder(Rectangle.TOP);
	  						HeaderTable55a.addCell(new Phrase("Shift", subheader));
	  						HeaderTable55a.addCell(new Phrase("Time", subheader));
	  						HeaderTable55a.addCell(new Phrase("Behaviour", subheader));
	  						HeaderTable55a.addCell(new Phrase("Intervention", subheader));
	  						HeaderTable55a.addCell(new Phrase("Remarks", subheader));

	  						for (int i = 0; i < assessmentDt3oObj.getInterventionList().size(); i++) {
	  							HeaderTable56a.addCell(new Phrase(
	  									assessmentDt3oObj.getInterventionList().get(i).getShiftInven(), tabletext2));
	  							HeaderTable56a.addCell(new Phrase(
	  									assessmentDt3oObj.getInterventionList().get(i).getTimeInven(), tabletext2));
	  							HeaderTable56a.addCell(new Phrase(
	  									assessmentDt3oObj.getInterventionList().get(i).getBehaviourInven(), tabletext2));
	  							HeaderTable56a.addCell(new Phrase(
	  									assessmentDt3oObj.getInterventionList().get(i).getIntervention(), tabletext2));
	  							HeaderTable56a.addCell(new Phrase(
	  									assessmentDt3oObj.getInterventionList().get(i).getRemarksInven(), tabletext2));

	  						}
	  						HeaderTable56a.getDefaultCell().setBorder(Rectangle.TOP);
	  						HeaderTable56a.addCell(new Phrase("", tabletext2));
	  						HeaderTable56a.addCell(new Phrase("", tabletext2));
	  						HeaderTable56a.addCell(new Phrase("", tabletext2));
	  						HeaderTable56a.addCell(new Phrase("", tabletext2));
	  						HeaderTable56a.addCell(new Phrase("", tabletext2));

	  					}

	  					document.add(HeaderTable40a);
	  					HeaderTable40a.flushContent();

	  					document.add(HeaderTable55a);
	  					HeaderTable55a.flushContent();

	  					document.add(HeaderTable56a);
	  					HeaderTable56a.flushContent();

	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getChkNone().equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getChkNone().equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getChkNone().equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkRedness().equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkRedness()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkRedness()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkSwelling().equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkSwelling()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkSwelling()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkInjur().equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkInjur()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkInjur().equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkCompliPresScr()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkCompliPresScr()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkCompliPresScr()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkComplicationBodyTemprature()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkComplicationBodyTemprature()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkComplicationBodyTemprature()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkComplicationOther()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkComplicationOther()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkComplicationOther()
	  											.equalsIgnoreCase("")) {
	  						HeaderTable40a.addCell(new Phrase("E.) Complication Due to Restraint:", subheader));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  					} else {
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  					}

	  					document.add(HeaderTable40a);
	  					HeaderTable40a.flushContent();

	  					PdfPTable HeaderTable50a = new PdfPTable(7);
	  					int[] headerwidth50b = { 5, 8, 8, 8, 15, 20, 35 };
	  					HeaderTable50a.setWidths(headerwidth50b);
	  					HeaderTable50a.setWidthPercentage(95f);
	  					HeaderTable50a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkNone().equalsIgnoreCase("1"))
	  						HeaderTable50a.addCell(new Phrase("None", tabletext2));
	  					else
	  						HeaderTable50a.addCell(new Phrase("", tabletext2));
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkRedness().equalsIgnoreCase("1"))
	  						HeaderTable50a.addCell(new Phrase("Redness", tabletext2));
	  					else
	  						HeaderTable50a.addCell(new Phrase("", tabletext2));
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkSwelling().equalsIgnoreCase("1"))
	  						HeaderTable50a.addCell(new Phrase("Swelling", tabletext2));
	  					else
	  						HeaderTable50a.addCell(new Phrase("", tabletext2));
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkInjur().equalsIgnoreCase("1"))
	  						HeaderTable50a.addCell(new Phrase("Injury", tabletext2));
	  					else
	  						HeaderTable50a.addCell(new Phrase("", tabletext2));
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkCompliPresScr().equalsIgnoreCase("1"))
	  						HeaderTable50a.addCell(new Phrase("Pressure Score", tabletext2));
	  					else
	  						HeaderTable50a.addCell(new Phrase("", tabletext2));
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkComplicationBodyTemprature()
	  							.equalsIgnoreCase("1"))
	  						HeaderTable50a.addCell(new Phrase("Increased body temprature", tabletext2));
	  					else
	  						HeaderTable50a.addCell(new Phrase("", tabletext2));
	  					if (assessmentDt3oObj.getListpediatric3().get(0).getChkComplicationOther().equalsIgnoreCase("1"))
	  						HeaderTable50a.addCell(new Phrase("Other", tabletext2));
	  					else
	  						HeaderTable50a.addCell(new Phrase("", tabletext2));

	  					document.add(HeaderTable50a);
	  					HeaderTable50a.flushContent();

	  					if (!assessmentDt3oObj.getListpediatric3().get(0).getDatePickFo().equalsIgnoreCase("NULL")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getDatePickFo()
	  									.equalsIgnoreCase("undefined")
	  							&& !assessmentDt3oObj.getListpediatric3().get(0).getDatePickFo().equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getTime010().equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getTime010()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getTime010().equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getTxtAreaRemaar().equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtAreaRemaar()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getTxtAreaRemaar()
	  											.equalsIgnoreCase("")
	  							|| !assessmentDt3oObj.getListpediatric3().get(0).getChkTreatmenModif()
	  									.equalsIgnoreCase("NULL")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkTreatmenModif()
	  											.equalsIgnoreCase("undefined")
	  									&& !assessmentDt3oObj.getListpediatric3().get(0).getChkTreatmenModif()
	  											.equalsIgnoreCase("")) {
	  						HeaderTable40a.addCell(new Phrase("F.) Discontinuation of Restraint:", subheader));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  					} else {
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  						HeaderTable40a.addCell(new Phrase("", tabletext2));
	  					}

	  					document.add(HeaderTable40a);
	  					HeaderTable40a.flushContent();

	  				}

	  			}

	  			if (printType.equalsIgnoreCase("prepostChecklist")) {

	  				if (preDtoObj.getNursinAssesmentList().size() != 0) {
	  					PdfPTable HeaderTable100a = new PdfPTable(5);
	  					int[] HeaderTable100b = { 20, 40, 50, 20, 10 };
	  					HeaderTable100a.setWidths(HeaderTable100b);
	  					HeaderTable100a.setWidthPercentage(95f);
	  					HeaderTable100a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					HeaderTable100a.addCell(new Phrase(
	  							"Pre Time : " + preDtoObj.getNursinAssesmentList().get(0).getPreTime(), tabletext2));
	  					HeaderTable100a.addCell(new Phrase(" ", tabletext2));
	  					HeaderTable100a.addCell(new Phrase("Pre Post CheckList", header1));
	  					HeaderTable100a.addCell(new Phrase(
	  							"Post Time : " + preDtoObj.getNursinAssesmentList().get(0).getPostTime(), tabletext2));
	  					HeaderTable100a.addCell(new Phrase(" ", tabletext2));
	  					HeaderTable100a.getDefaultCell().setBorder(Rectangle.BOTTOM);

	  					HeaderTable100a.addCell(new Phrase("", header2));
	  					HeaderTable100a.addCell(new Phrase("", header2));
	  					HeaderTable100a.addCell(new Phrase("", header2));
	  					HeaderTable100a.addCell(new Phrase("", header2));
	  					HeaderTable100a.addCell(new Phrase("", header2));
	  					document.add(HeaderTable100a);
	  					HeaderTable100a.flushContent();

	  					document.add(HeaderTable100a);
	  					HeaderTable100a.flushContent();

	  					PdfPTable HeaderTable60o = new PdfPTable(4);
	  					int[] HeaderTable661 = { 35, 50, 50, 20 };
	  					HeaderTable60o.setWidths(HeaderTable661);
	  					HeaderTable60o.setWidthPercentage(95f);
	  					HeaderTable60o.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!preDtoObj.getNursinAssesmentList().get(0).getAfterOT11().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT11().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable60o.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT11().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable60o.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable60o.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable60o.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable60o);
	  					HeaderTable60o.flushContent();

	  					PdfPTable HeaderTable623 = new PdfPTable(3);
	  					int[] HeaderTable6y = { 35, 100, 20 };
	  					HeaderTable623.setWidths(HeaderTable6y);
	  					HeaderTable623.setWidthPercentage(95f);
	  					HeaderTable623.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getPreOT12().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getPreOT12().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable623.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getPreOT12().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable623.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable623.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable623.addCell(new Phrase("", tabletext2));
	  					HeaderTable623.addCell(new Phrase("Pathology reports available in the Case File ", tabletext2));
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getAfterOT12().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT12().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable623.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT12().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable623.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable623.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable623.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable623);
	  					HeaderTable623.flushContent();

	  					PdfPTable HeaderTable6p0 = new PdfPTable(3);
	  					int[] HeaderTable6yq = { 35, 100, 20 };
	  					HeaderTable6p0.setWidths(HeaderTable6yq);
	  					HeaderTable6p0.setWidthPercentage(95f);
	  					HeaderTable6p0.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!preDtoObj.getNursinAssesmentList().get(0).getPreOT13().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getPreOT13().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable6p0.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getPreOT13().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable6p0.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable6p0.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable6p0.addCell(new Phrase("", tabletext2));
	  					HeaderTable6p0.addCell(new Phrase("Lab Results Pending - ", tabletext2));
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getAfterOT13().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT13().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable6p0.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT13().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable6p0.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable6p0.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable6p0.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable6p0);
	  					HeaderTable6p0.flushContent();

	  					PdfPTable HeaderTable6611 = new PdfPTable(3);
	  					int[] HeaderTable6w1 = { 35, 100, 20 };
	  					HeaderTable6611.setWidths(HeaderTable6w1);
	  					HeaderTable6611.setWidthPercentage(95f);
	  					HeaderTable6611.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  					String xray = "";
	  					String USG = "";
	  					String CT = "";
	  					String PET = "";
	  					String MRI = "";
	  					String Mammo = "";
	  					String ECG = "";
	  					String ECHO = "";
	  					if (preDtoObj.getNursinAssesmentList().get(0).getXray() != "") {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getXray().equalsIgnoreCase("1")) {
	  							xray = "yes";
	  						} else {
	  							xray = "No";
	  						}
	  					}
	  					if (preDtoObj.getNursinAssesmentList().get(0).getuSG() != "") {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getuSG().equalsIgnoreCase("1")) {
	  							USG = "Yes";
	  						} else {
	  							USG = "No";
	  						}
	  					}
	  					if (preDtoObj.getNursinAssesmentList().get(0).getCt() != "") {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getCt().equalsIgnoreCase("1")) {
	  							CT = "Yes";
	  						} else {
	  							CT = "No";
	  						}
	  					}
	  					if (preDtoObj.getNursinAssesmentList().get(0).getPet_ct() != "") {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getPet_ct().equalsIgnoreCase("1")) {
	  							PET = "Yes";
	  						} else {
	  							PET = "No";
	  						}
	  					}
	  					if (preDtoObj.getNursinAssesmentList().get(0).getMri() != "") {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getMri().equalsIgnoreCase("1")) {
	  							MRI = "Yes";
	  						} else {
	  							MRI = "No";
	  						}
	  					}
	  					if (preDtoObj.getNursinAssesmentList().get(0).getMammo() != "") {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getMammo().equalsIgnoreCase("1")) {
	  							Mammo = "Yes";
	  						} else {
	  							Mammo = "No";
	  						}
	  					}
	  					if (preDtoObj.getNursinAssesmentList().get(0).getEcg() != "") {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getEcg().equalsIgnoreCase("1")) {
	  							ECG = "Yes";
	  						} else {
	  							ECG = "";
	  						}
	  					}
	  					if (preDtoObj.getNursinAssesmentList().get(0).getEcho() != "") {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getEcho().equalsIgnoreCase("1")) {
	  							ECHO = "Yes";
	  						} else {
	  							ECHO = "No";
	  						}
	  					}
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getPreOT28().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getPreOT28().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable6611.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getPreOT28().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable6611.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable6611.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable6611.addCell(new Phrase("", tabletext2));
	  					HeaderTable6611.addCell(new Phrase("Diagnostic Reports & Films available in Case File.\nX-ray : "
	  							+ xray + " USG : " + USG + " CT : " + CT + " PET : " + PET + " MRI : " + MRI + " Mammo : "
	  							+ Mammo + " ECG : " + ECG + " ECHO : " + ECHO, tabletext2));
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getAfterOT28().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT28().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable6611.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT28().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable6611.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable6611.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable6611.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable6611);
	  					HeaderTable6611.flushContent();

	  					PdfPTable HeaderTable6l = new PdfPTable(3);
	  					HeaderTable6l.setWidths(HeaderTable6yq);
	  					HeaderTable6l.setWidthPercentage(95f);
	  					HeaderTable6l.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getPreOT14().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getPreOT14().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable6l.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getPreOT14().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable6l.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable6l.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable6l.addCell(new Phrase("", tabletext2));
	  					HeaderTable6l.addCell(new Phrase("Multipra Monitor ", tabletext2));
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getAfterOT14().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT14().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable6l.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT14().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable6l.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable6l.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable6l.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable6l);
	  					HeaderTable5.flushContent();

	  					PdfPTable HeaderTable6b = new PdfPTable(4);
	  					HeaderTable6b.setWidths(HeaderTable661);
	  					HeaderTable6b.setWidthPercentage(95f);
	  					HeaderTable6b.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getPreOT15().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getPreOT15().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable6b.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getPreOT15().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable6b.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable6b.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable6b.addCell(new Phrase("", tabletext2));
	  					HeaderTable6b
	  							.addCell(new Phrase(
	  									"No solids after : " + preDtoObj.getNursinAssesmentList().get(0).getNoSolidAfter()
	  											+ "\nNO clear liquids after : "
	  											+ preDtoObj.getNursinAssesmentList().get(0).getNoClearLiquidAfter(),
	  									tabletext2));
	  					HeaderTable6b.addCell(new Phrase(
	  							"NBM Till f/o or For : " + preDtoObj.getNursinAssesmentList().get(0).getnBM(), tabletext2));
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getAfterOT15().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT15().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable6b.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT15().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable6b.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable6b.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable6b.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable6b);
	  					HeaderTable5.flushContent();

	  					PdfPTable HeaderTable6o = new PdfPTable(3);
	  					HeaderTable6o.setWidths(HeaderTable6yq);
	  					HeaderTable6o.setWidthPercentage(95f);
	  					HeaderTable6o.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  					PdfPTable HeaderTable6z = new PdfPTable(4);
	  					int[] HeaderTable6z1 = { 35, 50, 50, 20 };
	  					HeaderTable6z.setWidths(HeaderTable6z1);
	  					HeaderTable6z.setWidthPercentage(95f);
	  					HeaderTable6z.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!preDtoObj.getNursinAssesmentList().get(0).getPreOT16().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getPreOT16().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable6o.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getPreOT16().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable6o.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable6o.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable6o.addCell(new Phrase("", tabletext2));
	  					HeaderTable6o.addCell(new Phrase("Pre-Operative Medicines Administered (see DMOR) ", tabletext2));
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getAfterOT16().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT16().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable6o.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT16().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable6o.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable6o.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable6z.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable6o);
	  					HeaderTable5.flushContent();

	  					PdfPTable HeaderTable65 = new PdfPTable(3);
	  					HeaderTable65.setWidths(HeaderTable6yq);
	  					HeaderTable65.setWidthPercentage(95f);
	  					HeaderTable65.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getPreOT17().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getPreOT17().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable65.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getPreOT17().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable65.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable65.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable65.addCell(new Phrase("", tabletext2));
	  					HeaderTable65.addCell(new Phrase("Medication Administration Record Updated ", tabletext2));
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getAfterOT17().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT17().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable65.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT17().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable65.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable65.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable65.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable65);
	  					HeaderTable65.flushContent();

	  					PdfPTable HeaderTable605 = new PdfPTable(3);
	  					HeaderTable65.setWidths(HeaderTable6yq);
	  					HeaderTable65.setWidthPercentage(95f);
	  					HeaderTable65.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getPreOT18().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getPreOT18().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable65.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getPreOT18().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable65.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable65.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable65.addCell(new Phrase("", tabletext2));

	  					HeaderTable65.addCell(new Phrase("iv Antibiotics given (Time : "
	  							+ preDtoObj.getNursinAssesmentList().get(0).getaB_Time() + ")", tabletext2));

	  					if (!preDtoObj.getNursinAssesmentList().get(0).getAfterOT18().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT18().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable65.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT18().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable65.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable65.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable65.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable65);
	  					HeaderTable65.flushContent();

	  					PdfPTable HeaderTable6r = new PdfPTable(3);
	  					HeaderTable6r.setWidths(HeaderTable6yq);
	  					HeaderTable6r.setWidthPercentage(95f);
	  					HeaderTable6r.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!preDtoObj.getNursinAssesmentList().get(0).getPreOT19().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getPreOT19().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable6r.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getPreOT19().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable6r.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable6r.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable6r.addCell(new Phrase("", tabletext2));
	  					HeaderTable6r.addCell(new Phrase("Skin Preparation done,surgery Site Marked  ", tabletext2));
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getAfterOT19().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT19().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable6r.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT19().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable6r.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable6r.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable6r.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable6r);
	  					HeaderTable6r.flushContent();

	  					PdfPTable HeaderTable6p = new PdfPTable(3);
	  					HeaderTable6p.setWidths(HeaderTable6yq);
	  					HeaderTable6p.setWidthPercentage(95f);
	  					HeaderTable6p.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getPreOT20().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getPreOT20().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable6p.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getPreOT20().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable6p.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable6p.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable6p.addCell(new Phrase("", tabletext2));
	  					HeaderTable6p.addCell(
	  							new Phrase("Enema Given at : " + preDtoObj.getNursinAssesmentList().get(0).getEnema_time(),
	  									tabletext2));
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getAfterOT20().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT20().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable6p.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT20().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable6p.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable6p.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable6p.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable6p);
	  					HeaderTable6p.flushContent();

	  					PdfPTable HeaderTable6i = new PdfPTable(3);
	  					HeaderTable6i.setWidths(HeaderTable6yq);
	  					HeaderTable6i.setWidthPercentage(95f);
	  					HeaderTable6i.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!preDtoObj.getNursinAssesmentList().get(0).getPreOT21().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getPreOT21().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable6i.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getPreOT21().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable6i.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable6i.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable6i.addCell(new Phrase("", tabletext2));
	  					HeaderTable6i.addCell(new Phrase("Blood Arranged: Component Type : "
	  							+ preDtoObj.getNursinAssesmentList().get(0).getComponentType() + " No of units : "
	  							+ preDtoObj.getNursinAssesmentList().get(0).getComponentUnit(), tabletext2));
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getAfterOT21().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT21().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable6i.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT21().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable6i.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable6i.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable6i.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable6i);
	  					HeaderTable6i.flushContent();

	  					PdfPTable HeaderTable62i = new PdfPTable(3);
	  					HeaderTable62i.setWidths(HeaderTable6yq);
	  					HeaderTable62i.setWidthPercentage(95f);
	  					HeaderTable62i.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getPreOT22().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getPreOT22().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable62i.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getPreOT22().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable62i.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable62i.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable62i.addCell(new Phrase("", tabletext2));

	  					HeaderTable62i.addCell(new Phrase("Blood Transfusion Consent signed ", tabletext2));
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getAfterOT22().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT22().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable62i.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT22().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable62i.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable62i.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable62i.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable62i);
	  					HeaderTable62i.flushContent();

	  					PdfPTable HeaderTable69i = new PdfPTable(3);
	  					HeaderTable69i.setWidths(HeaderTable6yq);
	  					HeaderTable69i.setWidthPercentage(95f);
	  					HeaderTable69i.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getPreOT23().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getPreOT23().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable69i.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getPreOT23().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable69i.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable69i.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable69i.addCell(new Phrase("", tabletext2));
	  					HeaderTable69i.addCell(new Phrase(
	  							"No of Unit Transfused : " + preDtoObj.getNursinAssesmentList().get(0).getTransfusedUnit(),
	  							tabletext2));
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getAfterOT23().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT23().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable69i.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT23().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable69i.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable69i.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable6z.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable69i);
	  					HeaderTable69i.flushContent();

	  					PdfPTable HeaderTable622 = new PdfPTable(3);
	  					HeaderTable622.setWidths(HeaderTable6yq);
	  					HeaderTable622.setWidthPercentage(95f);
	  					HeaderTable622.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!preDtoObj.getNursinAssesmentList().get(0).getPreOT24().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getPreOT24().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable622.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getPreOT24().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable622.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable622.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable622.addCell(new Phrase("", tabletext2));
	  					HeaderTable622.addCell(new Phrase(
	  							"Prosthesis - " + preDtoObj.getNursinAssesmentList().get(0).getProsthesis(), tabletext2));
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getAfterOT24().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT24().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable622.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT24().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable622.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable622.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable622.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable622);
	  					HeaderTable622.flushContent();

	  					PdfPTable HeaderTable63i = new PdfPTable(3);
	  					HeaderTable63i.setWidths(HeaderTable6yq);
	  					HeaderTable63i.setWidthPercentage(95f);
	  					HeaderTable63i.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					if (!preDtoObj.getNursinAssesmentList().get(0).getPreOT5().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getPreOT5().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable63i.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getPreOT5().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable63i.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable63i.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable63i.addCell(new Phrase("", tabletext2));
	  					HeaderTable63i.addCell(new Phrase(
	  							"Implants- " + preDtoObj.getNursinAssesmentList().get(0).getImplants(), tabletext2));
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getAfterOT25().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT25().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable63i.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT25().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable63i.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable63i.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable63i.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable63i);
	  					HeaderTable63i.flushContent();

	  					PdfPTable HeaderTable66121 = new PdfPTable(3);
	  					HeaderTable66121.setWidths(HeaderTable6yq);
	  					HeaderTable66121.setWidthPercentage(95f);
	  					HeaderTable66121.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  					String Dentures = "";
	  					String Bridges = "";
	  					String Spectacles = "";
	  					String hearingAid = "";
	  					String ContactLense = "";
	  					if (preDtoObj.getNursinAssesmentList().get(0).getDentures() != "") {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getDentures().equalsIgnoreCase("1")) {
	  							Dentures = "yes";
	  						} else {
	  							Dentures = "No";
	  						}
	  					}
	  					if (preDtoObj.getNursinAssesmentList().get(0).getBridge() != "") {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getBridge().equalsIgnoreCase("1")) {
	  							Bridges = "Yes";
	  						} else {
	  							Bridges = "No";
	  						}
	  					}
	  					if (preDtoObj.getNursinAssesmentList().get(0).getSpectacle() != "") {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getSpectacle().equalsIgnoreCase("1")) {
	  							Spectacles = "Yes";
	  						} else {
	  							Spectacles = "No";
	  						}
	  					}
	  					if (preDtoObj.getNursinAssesmentList().get(0).getContactLense() != "") {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getContactLense().equalsIgnoreCase("1")) {
	  							ContactLense = "Yes";
	  						} else {
	  							ContactLense = "No";
	  						}
	  					}
	  					if (preDtoObj.getNursinAssesmentList().get(0).getHearingAid() != "") {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getHearingAid().equalsIgnoreCase("1")) {
	  							hearingAid = "Yes";
	  						} else {
	  							hearingAid = "No";
	  						}
	  					}
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getPreOT26().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getPreOT26().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable66121.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getPreOT26().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable66121.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable66121.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable66121.addCell(new Phrase("", tabletext2));
	  					HeaderTable66121.addCell(new Phrase("Dentures: " + Dentures + " Bridges: " + Bridges
	  							+ " Spectacles: " + Spectacles + " Contact lenses: " + ContactLense
	  							+ " \nHearing Aid rempved: " + hearingAid + "- Handed over to family", tabletext2));
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getAfterOT26().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT26().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable66121.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT26().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable66121.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable66121.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable66121.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable66121);
	  					HeaderTable66121.flushContent();

	  					PdfPTable HeaderTable66122 = new PdfPTable(3);
	  					HeaderTable66122.setWidths(HeaderTable6yq);
	  					HeaderTable66122.setWidthPercentage(95f);
	  					HeaderTable66122.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  					String Jewlry = "";
	  					String Wig = "";
	  					String Hairpin = "";

	  					if (preDtoObj.getNursinAssesmentList().get(0).getJewelry() != "") {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getJewelry().equalsIgnoreCase("1")) {
	  							Jewlry = "yes";
	  						} else {
	  							Jewlry = "No";
	  						}
	  					}
	  					if (preDtoObj.getNursinAssesmentList().get(0).getHairpins() != "") {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getHairpins().equalsIgnoreCase("1")) {
	  							Hairpin = "Yes";
	  						} else {
	  							Hairpin = "No";
	  						}
	  					}
	  					if (preDtoObj.getNursinAssesmentList().get(0).getWig() != "") {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getWig().equalsIgnoreCase("1")) {
	  							Wig = "Yes";
	  						} else {
	  							Wig = "No";
	  						}
	  					}
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getPreOT27().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getPreOT27().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable66122.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getPreOT27().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable66122.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable66122.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable66122.addCell(new Phrase("", tabletext2));
	  					HeaderTable66122.addCell(new Phrase("Jewlry: " + Jewlry + " Hairpins: " + Hairpin + " Wig: " + Wig
	  							+ " etc. removed -Handed over to family ", tabletext2));
	  					if (!preDtoObj.getNursinAssesmentList().get(0).getAfterOT27().toString()
	  							.equalsIgnoreCase("undefined")) {
	  						if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT27().toString().equalsIgnoreCase("Y")) {
	  							HeaderTable66122.addCell(new Phrase("Yes", tabletext2));
	  						} else if (preDtoObj.getNursinAssesmentList().get(0).getAfterOT27().toString()
	  								.equalsIgnoreCase("N")) {
	  							HeaderTable66122.addCell(new Phrase("No", tabletext2));
	  						} else {
	  							HeaderTable66122.addCell(new Phrase("NA", tabletext2));
	  						}
	  					} else
	  						HeaderTable66122.addCell(new Phrase("", tabletext2));
	  					document.add(HeaderTable66122);
	  					HeaderTable66122.flushContent();

	  					PdfPTable HeaderTable6w2 = new PdfPTable(3);
	  					HeaderTable6w2.setWidths(HeaderTable6yq);
	  					HeaderTable6w2.setWidthPercentage(95f);
	  					HeaderTable6w2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  					HeaderTable6w2.addCell(new Phrase(" ", tabletext2));
	  					HeaderTable6w2.addCell(new Phrase("Name & Signature of Nurse ", tabletext2));
	  					HeaderTable6w2.addCell(new Phrase(" ", tabletext2));
	  					document.add(HeaderTable6w2);
	  					HeaderTable6w2.flushContent();

	  					PdfPTable HeaderTable61z = new PdfPTable(4);
	  					int[] HeaderTable611z = { 50, 20, 20, 50 };
	  					HeaderTable61z.setWidths(HeaderTable611z);
	  					HeaderTable61z.setWidthPercentage(95f);
	  					HeaderTable61z.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));
	  					HeaderTable61z.addCell(new Phrase("", subheader));

	  					HeaderTable61z.addCell(new Phrase(
	  							"Patinet old file/films of radiology recived by OT Staff(if yes,ick nd mention the no.) ",
	  							tabletext2));
	  					if (preDtoObj.getNursinAssesmentList().get(0).getPreYes().equalsIgnoreCase("1")) {
	  						HeaderTable61z.addCell(new Phrase("Yes ", tabletext2));
	  					} else
	  						HeaderTable61z.addCell(new Phrase("", tabletext2));
	  					if (preDtoObj.getNursinAssesmentList().get(0).getPostyes().equalsIgnoreCase("1")) {
	  						HeaderTable61z.addCell(new Phrase("Yes ", tabletext2));
	  					} else
	  						HeaderTable61z.addCell(new Phrase("", tabletext2));
	  					HeaderTable61z.addCell(new Phrase(
	  							"Patinet old file/films of radiology handed over to relative by OT Staff (if yes,ick nd mention the no.) ",
	  							tabletext2));
	  					document.add(HeaderTable61z);
	  					HeaderTable61z.flushContent();

	  				}

	  			}

	  			

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