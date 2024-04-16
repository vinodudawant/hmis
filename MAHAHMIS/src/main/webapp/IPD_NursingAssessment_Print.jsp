<%@page import="com.hms.ehat.dto.nursingAsmentDataDTO"%>
<%@page import="com.hms.ehat.dto.nursingtwoDTo"%>
<%@page import="com.hms.ehat.dto.NursingCarePlanPage4DTO"%>
<%@page import="com.hms.ehat.dto.UlcerRiskScorePage4DTO"%>
<%@page import="com.hms.ehat.dto.MFRAScorePage4DTO"%>
<%@page import="com.hms.ehat.dto.GlasgowComaScorePage4DTO"%>
<%@page import="com.hms.ehat.dto.nursingthreeDTO"%>
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
      

		
		String  printTitle= "Initial Nursing Assessment "; //request.getParameter("printTitle");
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
		//String printType = request.getParameter("printType");
		request.setAttribute("printType", printType);
		//String user_name = (String) session1.getAttribute("userName");
		//Integer unitId = (Integer) session1.getAttribute("uId");
		
		request.setAttribute("treatmentId", request.getParameter("tid"));
		String patientID = request.getParameter("pid");
		String patientIdstr = patientID ;

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
			
				
				//start data
	  			 //End table no 5 start

				PdfPTable HeaderTableTitle = new PdfPTable(3);
				int[] headerwidthTitle = { 30, 40, 30 };
				HeaderTableTitle.setWidths(headerwidthTitle);
				HeaderTableTitle.setWidthPercentage(95f);
				HeaderTableTitle.getDefaultCell().setBorder(Rectangle.BOTTOM);

				PdfPTable HeaderTableSpacing = new PdfPTable(1);
				int[] headerwidthSpacing = { 100 };
				HeaderTableSpacing.setWidths(headerwidthSpacing);
				HeaderTableSpacing.setWidthPercentage(95f);
				HeaderTableSpacing.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				NursingStationController objControl = (ApplicationContextUtils.getApplicationContext())
						.getBean(NursingStationController.class);
				nursingAsmentDataDTO nursingAsmentDataObj = new nursingAsmentDataDTO();
				nursingAsmentDataObj = objControl.fetchNursingAs(patientIdstr, treat);

				nursingtwoDTo nursingtwoObj = new nursingtwoDTo();
				nursingtwoObj = objControl.NursingA2fetchData(patientIdstr, treat);

				/* Page 1 Start */

				if (nursingAsmentDataObj.getNursinglist().size() != 0) {

					PdfPTable HeaderTable1a = new PdfPTable(8);
					int[] HeaderTable1b = { 10, 5, 15, 5, 10, 5, 10, 40 };
					HeaderTable1a.setWidths(HeaderTable1b);
					HeaderTable1a.setWidthPercentage(95f);
					HeaderTable1a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					HeaderTable1a.addCell(new Phrase("ID Band on: ", subheader));
					HeaderTable1a.addCell(new Phrase(
							nursingAsmentDataObj.getNursinglist().get(0).getBandOn().contains("1") ? "Yes" : "No",
							tabletext));

					HeaderTable1a.addCell(new Phrase("Call Bell in reach: ", subheader));
					HeaderTable1a.addCell(new Phrase(
							nursingAsmentDataObj.getNursinglist().get(0).getBandOn().contains("1") ? "Yes" : "No",
							tabletext));

					HeaderTable1a.addCell(new Phrase("Height: ", subheader));
					if (!nursingAsmentDataObj.getNursinglist().get(0).getHt().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getHt().equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getHt().equalsIgnoreCase(""))

						HeaderTable1a.addCell(
								new Phrase(nursingAsmentDataObj.getNursinglist().get(0).getHt(), tabletext));
					else
						HeaderTable1a.addCell(new Phrase("-", subheader));

					HeaderTable1a.addCell(new Phrase("Weight: ", subheader));
					if (!nursingAsmentDataObj.getNursinglist().get(0).getWt().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getWt().equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getWt().equalsIgnoreCase(""))

						HeaderTable1a.addCell(
								new Phrase(nursingAsmentDataObj.getNursinglist().get(0).getWt(), tabletext));
					else
						HeaderTable1a.addCell(new Phrase("-", subheader));

					document.add(HeaderTable1a);
					HeaderTable1a.flushContent();

					String ModeData = "";

					if (!nursingAsmentDataObj.getNursinglist().get(0).getAmbulatory().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAmbulatory()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAmbulatory().equalsIgnoreCase("")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAmbulatory()
									.equalsIgnoreCase("0")) {

						ModeData += "Ambulatory.";

					}
					if (!nursingAsmentDataObj.getNursinglist().get(0).getStrecher().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getStrecher()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getStrecher().equalsIgnoreCase("")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getStrecher().equalsIgnoreCase("0")) {

						ModeData += "Strecher.";

					}
					if (!nursingAsmentDataObj.getNursinglist().get(0).getWheelchair().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getWheelchair()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getWheelchair().equalsIgnoreCase("")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getWheelchair()
									.equalsIgnoreCase("0")) {

						ModeData += "Wheel Chair.";

					}

					String Admitted = "";

					if (!nursingAsmentDataObj.getNursinglist().get(0).getAdmissionEmergency()
							.equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmissionEmergency()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmissionEmergency()
									.equalsIgnoreCase("")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmissionEmergency()
									.equalsIgnoreCase("0")) {

						Admitted += "Emergency.";

					}
					if (!nursingAsmentDataObj.getNursinglist().get(0).getAdmissionRegular().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmissionRegular()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmissionRegular()
									.equalsIgnoreCase("")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmissionRegular()
									.equalsIgnoreCase("0")) {

						Admitted += "Regular Admission.";

					}

					PdfPTable HeaderTable2a = new PdfPTable(4);
					int[] HeaderTable2b = { 5, 20, 10, 40 };
					HeaderTable2a.setWidths(HeaderTable2b);
					HeaderTable2a.setWidthPercentage(95f);
					HeaderTable2a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					HeaderTable2a.addCell(new Phrase("", tabletext));
					HeaderTable2a.addCell(new Phrase("", tabletext));
					HeaderTable2a.addCell(new Phrase("", tabletext));
					HeaderTable2a.addCell(new Phrase("", tabletext));

					HeaderTable2a.addCell(new Phrase("Mode: ", subheader));
					if (ModeData != "")
						HeaderTable2a.addCell(new Phrase(ModeData, tabletext));
					else
						HeaderTable2a.addCell(new Phrase("-", tabletext));

					HeaderTable2a.addCell(new Phrase("Admitted As: ", subheader));
					if (ModeData != "")
						HeaderTable2a.addCell(new Phrase(Admitted, tabletext));
					else
						HeaderTable2a.addCell(new Phrase("-", tabletext));

					document.add(HeaderTable2a);
					HeaderTable2a.flushContent();

					String information = "";

					if (!nursingAsmentDataObj.getNursinglist().get(0).getInfoPat().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getInfoPat()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getInfoPat().equalsIgnoreCase("")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getInfoPat().equalsIgnoreCase("0")) {

						information += "Patient.";

					}
					if (!nursingAsmentDataObj.getNursinglist().get(0).getInfoFam().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getInfoFam()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getInfoFam().equalsIgnoreCase("")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getInfoFam().equalsIgnoreCase("0")) {

						information += "Family.";

					}
					if (!nursingAsmentDataObj.getNursinglist().get(0).getInfoOld().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getInfoOld()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getInfoOld().equalsIgnoreCase("")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getInfoOld().equalsIgnoreCase("0")) {

						information += "Old Chart.";

					}
					if (!nursingAsmentDataObj.getNursinglist().get(0).getInfoOther().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getInfoOther()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getInfoOther().equalsIgnoreCase("")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getInfoOther().equalsIgnoreCase("0")) {

						information += "Other.";

					}
					if (!nursingAsmentDataObj.getNursinglist().get(0).getInfoConsent().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getInfoConsent()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getInfoConsent().equalsIgnoreCase("")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getInfoConsent()
									.equalsIgnoreCase("0")) {

						information += " Consent given to obtain information from family.";

					}

					PdfPTable HeaderTable3a = new PdfPTable(2);
					int[] HeaderTable3b = { 25, 60 };
					HeaderTable3a.setWidths(HeaderTable3b);
					HeaderTable3a.setWidthPercentage(95f);
					HeaderTable3a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					HeaderTable2a.addCell(new Phrase("", tabletext));
					HeaderTable2a.addCell(new Phrase("", tabletext));
					HeaderTable2a.addCell(new Phrase("", tabletext));
					HeaderTable2a.addCell(new Phrase("", tabletext));

					document.add(HeaderTable2a);
					HeaderTable2a.flushContent();

					HeaderTable3a.addCell(new Phrase("INFORMATION OBTAINED FROM: ", subheader));

					if (information != "")
						HeaderTable3a.addCell(new Phrase(information, tabletext));
					else
						HeaderTable3a.addCell(new Phrase("-", tabletext));

					if (!nursingAsmentDataObj.getNursinglist().get(0).getCall().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getCall().equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getCall().equalsIgnoreCase("")) {

						HeaderTable3a.addCell(new Phrase("WHOM TO CALL IN AN EMERGENCY: ", subheader));
						HeaderTable3a.addCell(
								new Phrase(nursingAsmentDataObj.getNursinglist().get(0).getCall(), tabletext));
					}
					document.add(HeaderTable3a);
					HeaderTable3a.flushContent();

					HeaderTable2a.addCell(new Phrase("", tabletext));
					HeaderTable2a.addCell(new Phrase("", tabletext));
					HeaderTable2a.addCell(new Phrase("", tabletext));
					HeaderTable2a.addCell(new Phrase("", tabletext));

					document.add(HeaderTable2a);
					HeaderTable2a.flushContent();

					PdfPTable HeaderTable13a = new PdfPTable(10);
					int[] headerwidth13b = { 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 };
					HeaderTable13a.setWidths(headerwidth13b);
					HeaderTable13a.setWidthPercentage(95f);
					HeaderTable13a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					if (!nursingAsmentDataObj.getNursinglist().get(0).getVitalT().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getVitalT()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getVitalT().equalsIgnoreCase("")) {
						HeaderTable13a.addCell(new Phrase("Temprature:", subheader));
						HeaderTable13a.addCell(
								new Phrase(nursingAsmentDataObj.getNursinglist().get(0).getVitalT(), tabletext));

					} else {

						HeaderTable13a.addCell(new Phrase("Temprature:", subheader));
						HeaderTable13a.addCell(new Phrase("-", tabletext));

					}

					if (!nursingAsmentDataObj.getNursinglist().get(0).getVitalP().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getVitalP()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getVitalP().equalsIgnoreCase("")) {
						HeaderTable13a.addCell(new Phrase("Pulse:", subheader));
						HeaderTable13a.addCell(
								new Phrase(nursingAsmentDataObj.getNursinglist().get(0).getVitalP(), tabletext));

					} else {

						HeaderTable13a.addCell(new Phrase("Pulse:", subheader));
						HeaderTable13a.addCell(new Phrase("-", tabletext));

					}

					if (!nursingAsmentDataObj.getNursinglist().get(0).getVitalR().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getVitalR()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getVitalR().equalsIgnoreCase("")) {
						HeaderTable13a.addCell(new Phrase("RR:", subheader));
						HeaderTable13a.addCell(
								new Phrase(nursingAsmentDataObj.getNursinglist().get(0).getVitalR(), tabletext));

					} else {

						HeaderTable13a.addCell(new Phrase("RR:", subheader));
						HeaderTable13a.addCell(new Phrase("-", tabletext));

					}

					if (!nursingAsmentDataObj.getNursinglist().get(0).getVitalBp1().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getVitalBp1()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getVitalBp1().equalsIgnoreCase("")
							|| !nursingAsmentDataObj.getNursinglist().get(0).getVitalBp2().equalsIgnoreCase("NULL")
									&& !nursingAsmentDataObj.getNursinglist().get(0).getVitalBp2()
											.equalsIgnoreCase("undefined")
									&& !nursingAsmentDataObj.getNursinglist().get(0).getVitalBp2()
											.equalsIgnoreCase("")) {
						HeaderTable13a.addCell(new Phrase("BP:", subheader));
						HeaderTable13a.addCell(new Phrase(nursingAsmentDataObj.getNursinglist().get(0).getVitalBp1()
								+ "/" + nursingAsmentDataObj.getNursinglist().get(0).getVitalBp2(), tabletext));

					} else {

						HeaderTable13a.addCell(new Phrase("BP:", subheader));
						HeaderTable13a.addCell(new Phrase("-", tabletext));

					}

					if (!nursingAsmentDataObj.getNursinglist().get(0).getVitalSp().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getVitalSp()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getVitalSp().equalsIgnoreCase("")) {

						HeaderTable13a.addCell(new Phrase("SpPO2:", subheader));
						HeaderTable13a.addCell(
								new Phrase(nursingAsmentDataObj.getNursinglist().get(0).getVitalSp(), tabletext));

					} else {

						HeaderTable13a.addCell(new Phrase("SpPO2:", subheader));
						HeaderTable13a.addCell(new Phrase("-", tabletext));

					}

					document.add(HeaderTable13a);
					HeaderTable13a.flushContent();

					if (!nursingAsmentDataObj.getNursinglist().get(0).getAdmittingDiagnosis()
							.equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmittingDiagnosis()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmittingDiagnosis()
									.equalsIgnoreCase("")) {

						HeaderTable3a.addCell(new Phrase("Admitting Diagnosis: ", subheader));
						HeaderTable3a.addCell(new Phrase(
								nursingAsmentDataObj.getNursinglist().get(0).getAdmittingDiagnosis(), tabletext));
					}

					if (!nursingAsmentDataObj.getNursinglist().get(0).getAdmittingComplaint()
							.equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmittingComplaint()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmittingComplaint()
									.equalsIgnoreCase("")) {

						HeaderTable3a.addCell(new Phrase("PATIENT'S CHIEF COMPLAINTS & DURATION: ", subheader));
						HeaderTable3a.addCell(new Phrase(
								nursingAsmentDataObj.getNursinglist().get(0).getAdmittingComplaint(), tabletext));
					}

					document.add(HeaderTable3a);
					HeaderTable3a.flushContent();

					PdfPTable HeaderTable14a = new PdfPTable(4);
					int[] headerwidth14b = { 10, 10, 10, 60 };
					HeaderTable14a.setWidths(headerwidth14b);
					HeaderTable14a.setWidthPercentage(95f);
					HeaderTable14a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					if (!nursingAsmentDataObj.getNursinglist().get(0).getAllergyDrug().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAllergyDrug()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAllergyDrug().equalsIgnoreCase("")
							|| !nursingAsmentDataObj.getNursinglist().get(0).getAllergyFood()
									.equalsIgnoreCase("NULL")
									&& !nursingAsmentDataObj.getNursinglist().get(0).getAllergyFood()
											.equalsIgnoreCase("undefined")
									&& !nursingAsmentDataObj.getNursinglist().get(0).getAllergyFood()
											.equalsIgnoreCase("")
							|| !nursingAsmentDataObj.getNursinglist().get(0).getAllergyOther()
									.equalsIgnoreCase("NULL")
									&& !nursingAsmentDataObj.getNursinglist().get(0).getAllergyOther()
											.equalsIgnoreCase("undefined")
									&& !nursingAsmentDataObj.getNursinglist().get(0).getAllergyOther()
											.equalsIgnoreCase(""))

						HeaderTable14a.addCell(new Phrase("Allergies: ", subheader));

					if (!nursingAsmentDataObj.getNursinglist().get(0).getAllergyDrug().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAllergyDrug()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAllergyDrug().equalsIgnoreCase(""))

						HeaderTable14a.addCell(new Phrase("Drugs", tabletext));
					else
						HeaderTable14a.addCell(new Phrase("", subheader));

					if (!nursingAsmentDataObj.getNursinglist().get(0).getAllergyFood().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAllergyFood()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAllergyFood().equalsIgnoreCase(""))

						HeaderTable14a.addCell(new Phrase("Food", tabletext));
					else
						HeaderTable14a.addCell(new Phrase("", subheader));

					if (!nursingAsmentDataObj.getNursinglist().get(0).getAllergyOther().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAllergyOther()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAllergyOther().equalsIgnoreCase(""))

						HeaderTable14a.addCell(new Phrase("Other", tabletext));
					else
						HeaderTable14a.addCell(new Phrase("", subheader));

					document.add(HeaderTable14a);
					HeaderTable14a.flushContent();

					String history = "";

					if (nursingAsmentDataObj.getNursinglist().get(0).getPatHD().equalsIgnoreCase("1")) {

						history += "Heart Disease,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getPatHyp().equalsIgnoreCase("1")) {

						history += "Hypertension,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getPatAst().equalsIgnoreCase("1")) {

						history += "Asthama,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getPatTB().equalsIgnoreCase("1")) {

						history += "TB,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getPatCan().equalsIgnoreCase("1")) {

						history += "Cancer,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getPatAI().equalsIgnoreCase("1")) {

						history += "Anesthsia Issues,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getPatDia().equalsIgnoreCase("1")) {

						history += "Diabities,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getPatKid().equalsIgnoreCase("1")) {

						history += "Kidney,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getPatStroke().equalsIgnoreCase("1")) {

						history += "Stroke,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getPatUL().equalsIgnoreCase("1")) {

						history += " Ulcer,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getPatEP().equalsIgnoreCase("1")) {

						history += " Emotional/Psych,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getPatLung().equalsIgnoreCase("1")) {

						history += " Lung,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getPatSeizures().equalsIgnoreCase("1")) {

						history += "Seizures,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getPatHepa().equalsIgnoreCase("1")) {

						history += " Hepatitis,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getPatTU().equalsIgnoreCase("1")) {

						history += "Tobacoo Use.";

					}

					if (history != "") {
						HeaderTable3a.addCell(
								new Phrase("HISTORY / PAST MEDICAL TREATMENT OF THE PATIENT : ", subheader));
						HeaderTable3a.addCell(new Phrase(history, tabletext));
					}
					document.add(HeaderTable3a);
					HeaderTable3a.flushContent();

					PdfPTable HeaderTable15a = new PdfPTable(2);
					int[] headerwidth15b = { 15, 70 };
					HeaderTable15a.setWidths(headerwidth15b);
					HeaderTable15a.setWidthPercentage(95f);
					HeaderTable15a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					if (!nursingAsmentDataObj.getNursinglist().get(0).getPatOther().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getPatOther()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getPatOther().equalsIgnoreCase("")) {
						HeaderTable15a.addCell(new Phrase("Other:", subheader));
						HeaderTable15a.addCell(
								new Phrase(nursingAsmentDataObj.getNursinglist().get(0).getPatOther(), tabletext));
					}

					if (!nursingAsmentDataObj.getNursinglist().get(0).getPatSurgery().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getPatSurgery()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getPatSurgery().equalsIgnoreCase("")) {
						HeaderTable15a.addCell(new Phrase("Surgery:", subheader));
						HeaderTable15a.addCell(new Phrase(
								nursingAsmentDataObj.getNursinglist().get(0).getPatSurgery(), tabletext));
					}

					String familyHistory = "";

					if (nursingAsmentDataObj.getNursinglist().get(0).getFamHD().equalsIgnoreCase("1")) {

						familyHistory += "Heart Disease,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getFamHyp().equalsIgnoreCase("1")) {

						familyHistory += "Hypertension,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getFamAst().equalsIgnoreCase("1")) {

						familyHistory += "Asthama,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getFamTB().equalsIgnoreCase("1")) {

						familyHistory += "TB,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getFamCan().equalsIgnoreCase("1")) {

						familyHistory += "Cancer,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getFamAI().equalsIgnoreCase("1")) {

						familyHistory += "Anesthsia Issues,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getFamDia().equalsIgnoreCase("1")) {

						familyHistory += "Diabities,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getFamKid().equalsIgnoreCase("1")) {

						familyHistory += "Kidney,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getFamStroke().equalsIgnoreCase("1")) {

						familyHistory += "Stroke,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getFamUL().equalsIgnoreCase("1")) {

						familyHistory += " Ulcer,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getFamEP().equalsIgnoreCase("1")) {

						familyHistory += " Emotional/Psych,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getFamLung().equalsIgnoreCase("1")) {

						familyHistory += " Lung,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getFamSeizures().equalsIgnoreCase("1")) {

						familyHistory += "Seizures,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getFamHepa().equalsIgnoreCase("1")) {

						familyHistory += " HeFamitis,";

					}
					if (nursingAsmentDataObj.getNursinglist().get(0).getFamTU().equalsIgnoreCase("1")) {

						familyHistory += "Tobacoo Use.";

					}

					if (familyHistory != "") {
						HeaderTable15a.addCell(new Phrase("FAMILY HISTORY: ", subheader));
						HeaderTable15a.addCell(new Phrase(familyHistory, tabletext));

					}

					if (!nursingAsmentDataObj.getNursinglist().get(0).getFamOther().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getFamOther()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getFamOther().equalsIgnoreCase("")) {
						HeaderTable15a.addCell(new Phrase("Other:", subheader));
						HeaderTable15a.addCell(
								new Phrase(nursingAsmentDataObj.getNursinglist().get(0).getFamOther(), tabletext));
					}

					if (!nursingAsmentDataObj.getNursinglist().get(0).getFamSurgery().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getFamSurgery()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getFamSurgery().equalsIgnoreCase("")) {
						HeaderTable15a.addCell(new Phrase("Surgery:", subheader));
						HeaderTable15a.addCell(new Phrase(
								nursingAsmentDataObj.getNursinglist().get(0).getFamSurgery(), tabletext));
					}

					if (nursingAsmentDataObj.getNursinglist().get(0).getMaritialStatus()
							.equalsIgnoreCase("married")) {
						HeaderTable15a.addCell(new Phrase("Marital Status: ", subheader));
						HeaderTable15a.addCell(new Phrase("Married", tabletext));
					} else if (nursingAsmentDataObj.getNursinglist().get(0).getMaritialStatus()
							.equalsIgnoreCase("widowed")) {
						HeaderTable15a.addCell(new Phrase("Marital Status: ", subheader));
						HeaderTable15a.addCell(new Phrase("Widowed", tabletext));
					} else if (nursingAsmentDataObj.getNursinglist().get(0).getMaritialStatus()
							.equalsIgnoreCase("single")) {
						HeaderTable15a.addCell(new Phrase("Marital Status: ", subheader));
						HeaderTable15a.addCell(new Phrase("Single", tabletext));
					}

					if (nursingAsmentDataObj.getNursinglist().get(0).getLivesWith().equalsIgnoreCase("family")) {
						HeaderTable15a.addCell(new Phrase("Family: ", subheader));
						HeaderTable15a.addCell(new Phrase("Lives With", tabletext));
					} else if (nursingAsmentDataObj.getNursinglist().get(0).getLivesWith()
							.equalsIgnoreCase("alone")) {
						HeaderTable15a.addCell(new Phrase("Family: ", subheader));
						HeaderTable15a.addCell(new Phrase("Lives Alone", tabletext));
					}

					if (nursingAsmentDataObj.getNursinglist().get(0).getOccupation().equalsIgnoreCase("full")) {
						HeaderTable15a.addCell(new Phrase("Occupation: ", subheader));
						HeaderTable15a.addCell(new Phrase("Full Time", tabletext));
					} else if (nursingAsmentDataObj.getNursinglist().get(0).getOccupation()
							.equalsIgnoreCase("part")) {
						HeaderTable15a.addCell(new Phrase("Occupation: ", subheader));
						HeaderTable15a.addCell(new Phrase("Part Time", tabletext));
					} else if (nursingAsmentDataObj.getNursinglist().get(0).getOccupation()
							.equalsIgnoreCase("retired")) {
						HeaderTable15a.addCell(new Phrase("Occupation: ", subheader));
						HeaderTable15a.addCell(new Phrase("Retired", tabletext));
					} else if (nursingAsmentDataObj.getNursinglist().get(0).getOccupation()
							.equalsIgnoreCase("other")) {
						HeaderTable15a.addCell(new Phrase("Occupation: ", subheader));
						HeaderTable15a.addCell(new Phrase("Other", tabletext));
					}

					if (nursingAsmentDataObj.getNursinglist().get(0).getActivity().equalsIgnoreCase("ambulatory")) {
						HeaderTable15a.addCell(new Phrase("Activity Level: ", subheader));
						HeaderTable15a.addCell(new Phrase("Ambulatory", tabletext));
					} else if (nursingAsmentDataObj.getNursinglist().get(0).getActivity()
							.equalsIgnoreCase("cane")) {
						HeaderTable15a.addCell(new Phrase("Activity Level: ", subheader));
						HeaderTable15a.addCell(new Phrase("Cane", tabletext));
					} else if (nursingAsmentDataObj.getNursinglist().get(0).getActivity()
							.equalsIgnoreCase("crutches")) {
						HeaderTable15a.addCell(new Phrase("Activity Level: ", subheader));
						HeaderTable15a.addCell(new Phrase("Crutches", tabletext));
					} else if (nursingAsmentDataObj.getNursinglist().get(0).getActivity()
							.equalsIgnoreCase("walker")) {
						HeaderTable15a.addCell(new Phrase("Activity Level: ", subheader));
						HeaderTable15a.addCell(new Phrase("Walker", tabletext));
					} else if (nursingAsmentDataObj.getNursinglist().get(0).getActivity()
							.equalsIgnoreCase("weelchair")) {
						HeaderTable15a.addCell(new Phrase("Activity Level: ", subheader));
						HeaderTable15a.addCell(new Phrase("Wheelchair", tabletext));
					} else if (nursingAsmentDataObj.getNursinglist().get(0).getActivity()
							.equalsIgnoreCase("bedrest")) {
						HeaderTable15a.addCell(new Phrase("Activity Level: ", subheader));
						HeaderTable15a.addCell(new Phrase("Bed Rest", tabletext));
					}

					if (nursingAsmentDataObj.getNursinglist().get(0).getEmoStatus()
							.equalsIgnoreCase("cooperative")) {
						HeaderTable15a.addCell(new Phrase("Emotional Status: ", subheader));
						HeaderTable15a.addCell(new Phrase("Cooperative", tabletext));
					} else if (nursingAsmentDataObj.getNursinglist().get(0).getEmoStatus()
							.equalsIgnoreCase("anxious")) {
						HeaderTable15a.addCell(new Phrase("Emotional Status: ", subheader));
						HeaderTable15a.addCell(new Phrase("Anxious", tabletext));
					} else if (nursingAsmentDataObj.getNursinglist().get(0).getEmoStatus()
							.equalsIgnoreCase("depressed")) {
						HeaderTable15a.addCell(new Phrase("Emotional Status: ", subheader));
						HeaderTable15a.addCell(new Phrase("Depressed", tabletext));
					}

					document.add(HeaderTable15a);
					HeaderTable15a.flushContent();

					PdfPTable HeaderTable62a = new PdfPTable(3);
					int[] HeaderTable62b = { 40, 80, 20 };
					HeaderTable62a.setWidths(HeaderTable62b);
					HeaderTable62a.setWidthPercentage(95f);
					HeaderTable62a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					HeaderTable62a.addCell(new Phrase("", subheader));
					HeaderTable62a.addCell(new Phrase("", subheader));
					HeaderTable62a.addCell(new Phrase("", subheader));
					HeaderTable62a.getDefaultCell().setBorder(Rectangle.TOP);

					HeaderTable62a.addCell(new Phrase("", subheader));
					HeaderTable62a.addCell(new Phrase("ACTIVITIES OF DAILY LIVING", subheader));
					HeaderTable62a.addCell(new Phrase("", subheader));

					HeaderTable62a.addCell(new Phrase("", subheader));
					HeaderTable62a.addCell(new Phrase("", subheader));
					HeaderTable62a.addCell(new Phrase("", subheader));

					document.add(HeaderTable62a);
					HeaderTable62a.flushContent();

					PdfPTable HeaderTable16a = new PdfPTable(3);
					int[] headerwidth16b = { 20, 20, 20 };
					HeaderTable16a.setWidths(headerwidth16b);
					HeaderTable16a.setWidthPercentage(95f);
					HeaderTable16a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					HeaderTable16a.addCell(new Phrase("", subheader));
					HeaderTable16a.addCell(new Phrase("Usual Level", subheader));
					HeaderTable16a.addCell(new Phrase("Level on admission", subheader));

					HeaderTable16a.addCell(new Phrase("Feeding", subheader));
					if (!nursingAsmentDataObj.getNursinglist().get(0).getUsualFeeding().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getUsualFeeding()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getUsualFeeding().equalsIgnoreCase(""))
						HeaderTable16a.addCell(new Phrase(
								nursingAsmentDataObj.getNursinglist().get(0).getUsualFeeding(), tabletext));
					else
						HeaderTable16a.addCell(new Phrase("-", tabletext));
					if (!nursingAsmentDataObj.getNursinglist().get(0).getAdmsFeeding().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmsFeeding()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmsFeeding().equalsIgnoreCase(""))
						HeaderTable16a.addCell(new Phrase(
								nursingAsmentDataObj.getNursinglist().get(0).getAdmsFeeding(), tabletext));
					else
						HeaderTable16a.addCell(new Phrase("-", tabletext));

					HeaderTable16a.addCell(new Phrase("Bathing", subheader));
					if (!nursingAsmentDataObj.getNursinglist().get(0).getUsualBathing().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getUsualBathing()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getUsualBathing().equalsIgnoreCase(""))
						HeaderTable16a.addCell(new Phrase(
								nursingAsmentDataObj.getNursinglist().get(0).getUsualBathing(), tabletext));
					else
						HeaderTable16a.addCell(new Phrase("-", tabletext));
					if (!nursingAsmentDataObj.getNursinglist().get(0).getAdmsBathing().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmsBathing()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmsBathing().equalsIgnoreCase(""))
						HeaderTable16a.addCell(new Phrase(
								nursingAsmentDataObj.getNursinglist().get(0).getAdmsBathing(), tabletext));
					else
						HeaderTable16a.addCell(new Phrase("-", tabletext));

					HeaderTable16a.addCell(new Phrase("Toileting", subheader));
					if (!nursingAsmentDataObj.getNursinglist().get(0).getUsualToileting().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getUsualToileting()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getUsualToileting()
									.equalsIgnoreCase(""))
						HeaderTable16a.addCell(new Phrase(
								nursingAsmentDataObj.getNursinglist().get(0).getUsualToileting(), tabletext));
					else
						HeaderTable16a.addCell(new Phrase("-", tabletext));
					if (!nursingAsmentDataObj.getNursinglist().get(0).getAdmsToileting().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmsToileting()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmsToileting()
									.equalsIgnoreCase(""))
						HeaderTable16a.addCell(new Phrase(
								nursingAsmentDataObj.getNursinglist().get(0).getAdmsToileting(), tabletext));
					else
						HeaderTable16a.addCell(new Phrase("-", tabletext));

					HeaderTable16a.addCell(new Phrase("General Mobility / Gait", subheader));
					if (!nursingAsmentDataObj.getNursinglist().get(0).getUsualGeneral().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getUsualGeneral()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getUsualGeneral().equalsIgnoreCase(""))
						HeaderTable16a.addCell(new Phrase(
								nursingAsmentDataObj.getNursinglist().get(0).getUsualGeneral(), tabletext));
					else
						HeaderTable16a.addCell(new Phrase("-", tabletext));
					if (!nursingAsmentDataObj.getNursinglist().get(0).getAdmsGeneral().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmsGeneral()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmsGeneral().equalsIgnoreCase(""))
						HeaderTable16a.addCell(new Phrase(
								nursingAsmentDataObj.getNursinglist().get(0).getAdmsGeneral(), tabletext));
					else
						HeaderTable16a.addCell(new Phrase("-", tabletext));

					HeaderTable16a.addCell(new Phrase("Dressing / Grooming", subheader));
					if (!nursingAsmentDataObj.getNursinglist().get(0).getUsualDressing().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getUsualDressing()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getUsualDressing()
									.equalsIgnoreCase(""))
						HeaderTable16a.addCell(new Phrase(
								nursingAsmentDataObj.getNursinglist().get(0).getUsualDressing(), tabletext));
					else
						HeaderTable16a.addCell(new Phrase("-", tabletext));
					if (!nursingAsmentDataObj.getNursinglist().get(0).getAdmsDressing().equalsIgnoreCase("NULL")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmsDressing()
									.equalsIgnoreCase("undefined")
							&& !nursingAsmentDataObj.getNursinglist().get(0).getAdmsDressing().equalsIgnoreCase(""))
						HeaderTable16a.addCell(new Phrase(
								nursingAsmentDataObj.getNursinglist().get(0).getAdmsDressing(), tabletext));
					else
						HeaderTable16a.addCell(new Phrase("-", tabletext));

					document.add(HeaderTable16a);
					HeaderTable16a.flushContent();

				}

				/* Page 1 Ends */
				/* Page 2 Start */

				if (nursingtwoObj.getNursingtwolist().size() != 0) {

					PdfPTable HeaderTable15a = new PdfPTable(3);
					int[] headerwidth15b = { 60, 80, 20 };
					HeaderTable15a.setWidths(headerwidth15b);
					HeaderTable15a.setWidthPercentage(95f);
					HeaderTable15a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					HeaderTable15a.addCell(new Phrase("", subheader));
					HeaderTable15a.addCell(new Phrase("", subheader));
					HeaderTable15a.addCell(new Phrase("", subheader));
					HeaderTable15a.getDefaultCell().setBorder(Rectangle.BOTTOM);

					HeaderTable15a.addCell(new Phrase("", subheader));
					HeaderTable15a.addCell(new Phrase("", subheader));
					HeaderTable15a.addCell(new Phrase("", subheader));

					HeaderTable15a.addCell(new Phrase("Vulnerability Assessement", subheader));
					HeaderTable15a.addCell(new Phrase("", subheader));
					HeaderTable15a.addCell(new Phrase("", subheader));
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

					HeaderTable15a.addCell(new Phrase("", subheader));
					HeaderTable15a.addCell(new Phrase("", subheader));
					HeaderTable15a.addCell(new Phrase("", subheader));

					document.add(HeaderTable16a);
					HeaderTable16a.flushContent();

					document.add(HeaderTable15a);
					HeaderTable15a.flushContent();

					HeaderTable16a.addCell(new Phrase("1", tabletext));
					HeaderTable16a.addCell(new Phrase("Age more than 65 years", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCat1Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat1Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat1Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCat1Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("Side rails provision", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCare1Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare1Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare1Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCare1Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("2", tabletext));
					HeaderTable16a.addCell(new Phrase("Physically Challenged", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCat2Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat2Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat2Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCat2Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("Low Height bed", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCare2Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare2Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare2Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCare2Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("3", tabletext));
					HeaderTable16a.addCell(new Phrase("Mentally Challenged/Mentally ill", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCat3Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat3Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat3Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCat3Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("Nearer to Nursing Station", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCare3Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare3Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare3Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCare3Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("4", tabletext));
					HeaderTable16a.addCell(new Phrase("Terminally ill", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCat4Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat4Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat4Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCat4Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("Continous Monitoring", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCare4Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare4Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare4Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCare4Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("5", tabletext));
					HeaderTable16a.addCell(new Phrase("Absence of Relative", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCat5Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat5Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat5Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCat5Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("Full Time Attedndent", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCare5Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare5Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare5Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCare5Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("6", tabletext));
					HeaderTable16a.addCell(new Phrase("Altered consciousness", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCat6Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat6Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat6Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCat6Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("Light and sound modification", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCare6Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare6Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare6Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCare6Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("7", tabletext));
					HeaderTable16a.addCell(new Phrase("Epileptic fit", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCat7Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat7Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat7Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCat7Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("Full time attendant", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCare7Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare7Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare7Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCare7Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("8", tabletext));
					HeaderTable16a.addCell(new Phrase("Medication related consciousness defect", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCat8Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat8Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat8Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCat8Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("Double checking of identification", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCare8Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare8Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare8Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCare8Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("9", tabletext));
					HeaderTable16a.addCell(new Phrase("Absence of raltive attendant", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCat9Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat9Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat9Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCat9Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("Either of 3 or 4", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCare9Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare9Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare9Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCare9Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("10", tabletext));
					HeaderTable16a.addCell(new Phrase("Immuno-compromised / low immunity", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCat10Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat10Val().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCat10Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCat10Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("Infection Control Precaution", tabletext));

					if (!nursingtwoObj.getNursingtwolist().get(0).getCare10Val().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare10Val()
									.equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getCare10Val().equalsIgnoreCase("")
							&& nursingtwoObj.getNursingtwolist().get(0).getCare10Val().equalsIgnoreCase("yes")) {
						HeaderTable16a.addCell(new Phrase("Yes", tabletext));
					} else {
						HeaderTable16a.addCell(new Phrase("No", tabletext));

					}

					HeaderTable16a.addCell(new Phrase("", tabletext));
					HeaderTable16a.addCell(new Phrase("", tabletext));
					HeaderTable16a.addCell(new Phrase("", tabletext));
					HeaderTable16a.addCell(new Phrase("", tabletext));
					HeaderTable16a.addCell(new Phrase("", tabletext));
					HeaderTable16a.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable16a.addCell(new Phrase("", tabletext));
					HeaderTable16a.addCell(new Phrase("", tabletext));
					HeaderTable16a.addCell(new Phrase("", tabletext));
					HeaderTable16a.addCell(new Phrase("", tabletext));
					HeaderTable16a.addCell(new Phrase("", tabletext));

					document.add(HeaderTable16a);
					HeaderTable16a.flushContent();

					PdfPTable HeaderTable17a = new PdfPTable(3);
					int[] headerwidth17b = { 20, 80, 40 };
					HeaderTable17a.setWidths(headerwidth17b);
					HeaderTable17a.setWidthPercentage(95f);
					HeaderTable17a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					if (!nursingtwoObj.getNursingtwolist().get(0).getHeadInjuries().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getHeadInjuries()
									.equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getHeadInjuries().equalsIgnoreCase("")) {
						HeaderTable17a.addCell(new Phrase("HEAD Injuries: ", subheader));
						HeaderTable17a.addCell(
								new Phrase(nursingtwoObj.getNursingtwolist().get(0).getHeadInjuries(), tabletext));
						HeaderTable17a.addCell(new Phrase("", subheader));

					}

					String mouthData = "";

					if (nursingtwoObj.getNursingtwolist().get(0).getMouthLesion().equalsIgnoreCase("1")) {

						mouthData += "Lesion,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getMouthDental().equalsIgnoreCase("1")) {

						mouthData += "Dental Hygiene,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getMouthBleeding().equalsIgnoreCase("1")) {

						mouthData += "Bleeding Gums,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getMouthTaking().equalsIgnoreCase("1")) {

						mouthData += "Taking Dental Hygiene Care,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getMouthSense().equalsIgnoreCase("1")) {

						mouthData += "Sense of Taste,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getMouthDentures().equalsIgnoreCase("1")) {

						mouthData += "Dentures.";

					}

					if (mouthData != "") {
						HeaderTable17a.addCell(new Phrase("MOUTH: ", subheader));
						HeaderTable17a.addCell(new Phrase(mouthData, tabletext));
						HeaderTable17a.addCell(new Phrase("", subheader));

					}

					if (!nursingtwoObj.getNursingtwolist().get(0).getMouthOther().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getMouthOther()
									.equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getMouthOther().equalsIgnoreCase("")) {
						HeaderTable17a.addCell(new Phrase("Others: ", tabletext));
						HeaderTable17a.addCell(
								new Phrase(nursingtwoObj.getNursingtwolist().get(0).getMouthOther(), tabletext));
						HeaderTable17a.addCell(new Phrase("", subheader));

					}

					String eyeData = "";

					if (nursingtwoObj.getNursingtwolist().get(0).getEyeBlurred().equalsIgnoreCase("1")) {

						eyeData += "Blurred Vision,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getEyeDouble().equalsIgnoreCase("1")) {

						eyeData += "Double Vision,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getEyeInflammation().equalsIgnoreCase("1")) {

						eyeData += "Inflammation,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getEyeColour().equalsIgnoreCase("1")) {

						eyeData += "Colour Blinds,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getEyeItching().equalsIgnoreCase("1")) {

						eyeData += "Itching,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getEyeRedness().equalsIgnoreCase("1")) {

						eyeData += "Redness,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getEyePain().equalsIgnoreCase("1")) {

						eyeData += "Pain,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getEyePupils().equalsIgnoreCase("1")) {

						eyeData += "Pupils Abnormal.";

					}

					if (eyeData != "") {
						HeaderTable17a.addCell(new Phrase("EYE: ", subheader));
						HeaderTable17a.addCell(new Phrase(eyeData, tabletext));
						HeaderTable17a.addCell(new Phrase("", subheader));

					}

					if (!nursingtwoObj.getNursingtwolist().get(0).getEyeOther().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getEyeOther().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getEyeOther().equalsIgnoreCase("")) {
						HeaderTable17a.addCell(new Phrase("Others: ", tabletext));
						HeaderTable17a.addCell(
								new Phrase(nursingtwoObj.getNursingtwolist().get(0).getEyeOther(), tabletext));
						HeaderTable17a.addCell(new Phrase("", subheader));

					}

					String earData = "";

					if (nursingtwoObj.getNursingtwolist().get(0).getEarDeaf().equalsIgnoreCase("1")) {

						earData += "Deaf,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getEarTinnitus().equalsIgnoreCase("1")) {

						earData += "Tinnitus,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getEarDizziness().equalsIgnoreCase("1")) {

						earData += "Dizziness,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getEarPain().equalsIgnoreCase("1")) {

						earData += "Pain,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getEarSense().equalsIgnoreCase("1")) {

						earData += "Sense of imbalance,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getEarDrainage().equalsIgnoreCase("1")) {

						earData += "Drainage.";

					}

					if (earData != "") {
						HeaderTable17a.addCell(new Phrase("EAR: ", subheader));
						HeaderTable17a.addCell(new Phrase(earData, tabletext));
						HeaderTable17a.addCell(new Phrase("", subheader));

					}

					if (!nursingtwoObj.getNursingtwolist().get(0).getEarColour().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getEarColour()
									.equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getEarColour().equalsIgnoreCase("")) {
						HeaderTable17a.addCell(new Phrase("Colour: ", tabletext));
						HeaderTable17a.addCell(
								new Phrase(nursingtwoObj.getNursingtwolist().get(0).getEarColour(), tabletext));
						HeaderTable17a.addCell(new Phrase("", subheader));

					}

					if (!nursingtwoObj.getNursingtwolist().get(0).getEarOther().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getEarOther().equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getEarOther().equalsIgnoreCase("")) {
						HeaderTable17a.addCell(new Phrase("Others: ", tabletext));
						HeaderTable17a.addCell(
								new Phrase(nursingtwoObj.getNursingtwolist().get(0).getEarOther(), tabletext));
						HeaderTable17a.addCell(new Phrase("", subheader));

					}

					String NoseData = "";

					if (nursingtwoObj.getNursingtwolist().get(0).getNoseBleed().equalsIgnoreCase("1")) {

						NoseData += "Nose Bleed,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getNoseCongestion().equalsIgnoreCase("1")) {

						NoseData += "Congestion,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getNosePain().equalsIgnoreCase("1")) {

						NoseData += "Pain,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getNoseSinus().equalsIgnoreCase("1")) {

						NoseData += "Sinus Problems,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getNoseDrainage().equalsIgnoreCase("1")) {

						NoseData += "Drainage.";

					}

					if (NoseData != "") {
						HeaderTable17a.addCell(new Phrase("Nose: ", subheader));
						HeaderTable17a.addCell(new Phrase(NoseData, tabletext));
						HeaderTable17a.addCell(new Phrase("", subheader));

					}

					if (!nursingtwoObj.getNursingtwolist().get(0).getNoseColour().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getNoseColour()
									.equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getNoseColour().equalsIgnoreCase("")) {
						HeaderTable17a.addCell(new Phrase("Colour: ", tabletext));
						HeaderTable17a.addCell(
								new Phrase(nursingtwoObj.getNursingtwolist().get(0).getNoseColour(), tabletext));
						HeaderTable17a.addCell(new Phrase("", subheader));

					}

					if (!nursingtwoObj.getNursingtwolist().get(0).getNoseOther().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getNoseOther()
									.equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getNoseOther().equalsIgnoreCase("")) {
						HeaderTable17a.addCell(new Phrase("Others: ", tabletext));
						HeaderTable17a.addCell(
								new Phrase(nursingtwoObj.getNursingtwolist().get(0).getNoseOther(), tabletext));
						HeaderTable17a.addCell(new Phrase("", subheader));

					}

					String throatData = "";

					if (nursingtwoObj.getNursingtwolist().get(0).getThroatSore().equalsIgnoreCase("1")) {

						throatData += "Sore throat,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getThroatHoarseness().equalsIgnoreCase("1")) {

						throatData += "Hoarseness,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getThroatLumps().equalsIgnoreCase("1")) {

						throatData += "Lumps,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getThroatSwollen().equalsIgnoreCase("1")) {

						throatData += "	Swollen Glands,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getThroatStiffness().equalsIgnoreCase("1")) {

						throatData += "Stiffness,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getThroatPain().equalsIgnoreCase("1")) {

						throatData += "Pain,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getThroatDysphagia().equalsIgnoreCase("1")) {

						throatData += "Dysphagia,";

					}

					if (throatData != "") {
						HeaderTable17a.addCell(new Phrase("Throat: ", subheader));
						HeaderTable17a.addCell(new Phrase(throatData, tabletext));
						HeaderTable17a.addCell(new Phrase("", subheader));

					}

					if (!nursingtwoObj.getNursingtwolist().get(0).getThroatOther().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getThroatOther()
									.equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getThroatOther().equalsIgnoreCase("")) {
						HeaderTable17a.addCell(new Phrase("Others: ", tabletext));
						HeaderTable17a.addCell(
								new Phrase(nursingtwoObj.getNursingtwolist().get(0).getThroatOther(), tabletext));
						HeaderTable17a.addCell(new Phrase("", subheader));

					}

					String bowelData = "";

					if (nursingtwoObj.getNursingtwolist().get(0).getBowelDiarrhoea().equalsIgnoreCase("1")) {

						bowelData += "Diarrhoea,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getBowelConstipation().equalsIgnoreCase("1")) {

						bowelData += "Constipation,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getBowelIncontinence().equalsIgnoreCase("1")) {

						bowelData += "Incontinence,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getBowelBlood().equalsIgnoreCase("1")) {

						bowelData += "Blood in stool,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getBowelNone().equalsIgnoreCase("1")) {

						bowelData += "None,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getBowelPain().equalsIgnoreCase("1")) {

						bowelData += "Pain,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getBowelHemorrhoids().equalsIgnoreCase("1")) {

						bowelData += "Hemorrhoids,";

					}
					if (nursingtwoObj.getNursingtwolist().get(0).getBowelLaxatives().equalsIgnoreCase("1")) {

						bowelData += "Laxatives,";

					}

					if (bowelData != "") {
						HeaderTable17a.addCell(new Phrase("Bowel: ", subheader));
						HeaderTable17a.addCell(new Phrase(bowelData, tabletext));
						HeaderTable17a.addCell(new Phrase("", subheader));

					}

					if (!nursingtwoObj.getNursingtwolist().get(0).getBowelInterFrequency().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getBowelInterFrequency()
									.equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getBowelInterFrequency()
									.equalsIgnoreCase("")) {
						HeaderTable17a.addCell(new Phrase("Frequency of stool: ", tabletext));
						HeaderTable17a.addCell(new Phrase(
								nursingtwoObj.getNursingtwolist().get(0).getBowelInterFrequency(), tabletext));
						HeaderTable17a.addCell(new Phrase("", subheader));

					}

					if (!nursingtwoObj.getNursingtwolist().get(0).getBowelInterType().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getBowelInterType()
									.equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getBowelInterType().equalsIgnoreCase("")) {
						HeaderTable17a.addCell(new Phrase("Type: ", tabletext));
						HeaderTable17a.addCell(new Phrase(
								nursingtwoObj.getNursingtwolist().get(0).getBowelInterType(), tabletext));
						HeaderTable17a.addCell(new Phrase("", subheader));

					}

					if (!nursingtwoObj.getNursingtwolist().get(0).getBowelFrequency().equalsIgnoreCase("NULL")
							&& !nursingtwoObj.getNursingtwolist().get(0).getBowelFrequency()
									.equalsIgnoreCase("undefined")
							&& !nursingtwoObj.getNursingtwolist().get(0).getBowelFrequency().equalsIgnoreCase("")) {
						HeaderTable17a.addCell(new Phrase("Frequency: ", tabletext));
						HeaderTable17a.addCell(new Phrase(
								nursingtwoObj.getNursingtwolist().get(0).getBowelFrequency(), tabletext));
						HeaderTable17a.addCell(new Phrase("", subheader));

					}

					document.add(HeaderTable17a);
					HeaderTable17a.flushContent();

				}
				/* Page 2 ends */

				/* Page 3 Start */

				nursingthreeDTO objN3DTO = new nursingthreeDTO();
				List<nursingthreeDTO> listN3 = null;
				objN3DTO = objControl.NursingA3fetchData((patientIdstr), treat);
				listN3 = objN3DTO.getNursingthreelist();

				if (listN3.size() > 0) {

					PdfPTable HeaderTable = new PdfPTable(5);
					int[] headerwidth = { 5, 25, 15, 20, 20 };
					HeaderTable.setWidths(headerwidth);
					HeaderTable.setWidthPercentage(95f);
					HeaderTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					PdfPTable HeaderTable11 = new PdfPTable(7);
					int[] headerwidth11 = { 4, 7, 10, 7, 10, 7, 10 };
					HeaderTable11.setWidths(headerwidth11);
					HeaderTable11.setWidthPercentage(95f);
					HeaderTable11.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					PdfPTable HeaderTable12 = new PdfPTable(3);
					int[] headerwidth12 = { 5, 10, 50 };
					HeaderTable12.setWidths(headerwidth12);
					HeaderTable12.setWidthPercentage(95f);
					HeaderTable12.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					for (int i = 0; i < listN3.size(); i++) {

						HeaderTableTitle.addCell(new Phrase("", subheader));
						HeaderTableTitle.addCell(new Phrase(" GASTROINTESTINAL ", subheader));
						HeaderTableTitle.addCell(new Phrase("", subheader));

						document.add(HeaderTableTitle);
						HeaderTableTitle.flushContent();

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Appetite Good ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getGasAppetite().contains("1") ? "Yes" : "No"), tabletext));
						HeaderTable.addCell(new Phrase("Nausea ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getGasNausea().contains("1") ? "Yes" : "No"), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Vomiting ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getGasVomiting().contains("1") ? "Yes" : "No"), tabletext));
						HeaderTable.addCell(new Phrase("Distension ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getGasDistension().contains("1") ? "Yes" : "No"), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Heart Burn ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getGasHeart().contains("1") ? "Yes" : "No"), tabletext));
						HeaderTable.addCell(new Phrase("Flatus ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getGasFlatus().contains("1") ? "Yes" : "No"), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Pain ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getGasPain().contains("1") ? "Yes" : "No"), tabletext));
						HeaderTable.addCell(new Phrase("Rectal Bleeding ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getGasRectal().contains("1") ? "Yes" : "No"), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Colostomy ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getGasColostomy().contains("1") ? "Yes" : "No"), tabletext));
						HeaderTable.addCell(new Phrase("Illeostomy ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getGasIlleostomy().contains("1") ? "Yes" : "No"), tabletext));

						document.add(HeaderTable);
						HeaderTable.flushContent();

						HeaderTableSpacing.addCell(new Phrase("", subheader));
						HeaderTableSpacing.addCell(new Phrase("", subheader));

						document.add(HeaderTableSpacing);
						HeaderTableSpacing.flushContent();

						HeaderTableTitle.addCell(new Phrase("", subheader));
						HeaderTableTitle.addCell(new Phrase(" GENITO-URINARY ", subheader));
						HeaderTableTitle.addCell(new Phrase("", subheader));

						document.add(HeaderTableTitle);
						HeaderTableTitle.flushContent();

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Pain ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getUrinePain().contains("1") ? "Yes" : "No"), tabletext));
						HeaderTable.addCell(new Phrase("Burning ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getUrineBurning().contains("1") ? "Yes" : "No"), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Itching ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getUrineItching().contains("1") ? "Yes" : "No"), tabletext));
						HeaderTable.addCell(new Phrase("Urgency ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getUrineUrgency().contains("1") ? "Yes" : "No"), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Incontinence ", subheader));
						HeaderTable.addCell(
								new Phrase("" + (listN3.get(i).getUrineIncontinence().contains("1") ? "Yes" : "No"),
										tabletext));
						HeaderTable.addCell(new Phrase("Nocturia ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getUrineNocturia().contains("1") ? "Yes" : "No"), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Urostomy ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getUrineUrostomy().contains("1") ? "Yes" : "No"), tabletext));
						HeaderTable.addCell(new Phrase("History of Calculi ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getUrineHistory().contains("1") ? "Yes" : "No"), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("History of UTI ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getUrineHistoryUTI().contains("1") ? "Yes" : "No"), tabletext));
						HeaderTable.addCell(new Phrase("Foley's Catheter ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getUrineFoley().contains("1") ? "Yes" : "No"), tabletext));

						document.add(HeaderTable);
						HeaderTable.flushContent();

						HeaderTableSpacing.addCell(new Phrase("", subheader));

						document.add(HeaderTableSpacing);
						HeaderTableSpacing.flushContent();

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Urine Colour ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getUrineColour()), tabletext));
						HeaderTable.addCell(new Phrase("Frequency ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getUrineFrequency()), tabletext));

						document.add(HeaderTable);
						HeaderTable.flushContent();

						HeaderTableSpacing.addCell(new Phrase("", subheader));
						HeaderTableSpacing.addCell(new Phrase("", subheader));
						HeaderTableSpacing.addCell(new Phrase("", subheader));

						document.add(HeaderTableSpacing);
						HeaderTableSpacing.flushContent();

						HeaderTableTitle.addCell(new Phrase("", subheader));
						HeaderTableTitle.addCell(new Phrase(" MUSCULOSKELETAL ", subheader));
						HeaderTableTitle.addCell(new Phrase("", subheader));

						document.add(HeaderTableTitle);
						HeaderTableTitle.flushContent();

						HeaderTable11.addCell(new Phrase("", subheader));
						HeaderTable11.addCell(new Phrase("Skin ", subheader));
						HeaderTable11.addCell(new Phrase("" + (listN3.get(i).getMusValSkin()), tabletext));
						HeaderTable11.addCell(new Phrase("Uses ", subheader));
						HeaderTable11.addCell(new Phrase("" + (listN3.get(i).getMusValUses()), tabletext));
						HeaderTable11.addCell(new Phrase("Colour ", subheader));
						HeaderTable11.addCell(new Phrase("" + (listN3.get(i).getMusColour()), tabletext));

						String d = listN3.get(i).getMusDeformity().contains("1") ? " Deformity " : "";
						String t = listN3.get(i).getMusTingling().contains("1") ? " Tingling " : "";
						String w = listN3.get(i).getMusWeakness().contains("1") ? " Weakness " : "";
						String Extremi = t + w + d;
						String pai = listN3.get(i).getMusPain().contains("1") ? " Pain " : "";
						String sti = listN3.get(i).getMusStiffness().contains("1") ? " Stiffness " : "";
						String joints = pai + sti;

						HeaderTable11.addCell(new Phrase("", subheader));
						HeaderTable11.addCell(new Phrase("Extremities ", subheader));
						HeaderTable11.addCell(new Phrase("" + (Extremi), tabletext));
						HeaderTable11.addCell(new Phrase("Joints ", subheader));
						HeaderTable11.addCell(new Phrase("" + (joints), tabletext));
						HeaderTable11.addCell(new Phrase("Other ", subheader));
						HeaderTable11.addCell(new Phrase("" + (listN3.get(i).getMusColour()), tabletext));

						document.add(HeaderTable11);
						HeaderTable11.flushContent();

						HeaderTableSpacing.addCell(new Phrase("", subheader));
						HeaderTableSpacing.addCell(new Phrase("", subheader));
						HeaderTableSpacing.addCell(new Phrase("", subheader));

						document.add(HeaderTableSpacing);
						HeaderTableSpacing.flushContent();

						HeaderTableTitle.addCell(new Phrase("", subheader));
						HeaderTableTitle.addCell(new Phrase(" REPRODUCTIVE ", subheader));
						HeaderTableTitle.addCell(new Phrase("", subheader));

						document.add(HeaderTableTitle);
						HeaderTableTitle.flushContent();

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Menopausai ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getReproMeno().contains("1") ? "Yes" : "No"), tabletext));
						HeaderTable.addCell(new Phrase("Duration ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getReproMenoDura()), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("LMP ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getReproLMP()), tabletext));
						HeaderTable.addCell(new Phrase("Dysmenorrhoea ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getReproDysme().contains("1") ? "Yes" : "No"), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Amenorrhoea ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getReproAmeno().contains("1") ? "Yes" : "No"), tabletext));
						HeaderTable.addCell(new Phrase("Duration ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getReproAmenoDura()), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Vaginal Discharge ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getReproVaginal().contains("1") ? "Yes" : "No"), tabletext));
						HeaderTable.addCell(new Phrase("Itching ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getReproItching().contains("1") ? "Yes" : "No"), tabletext));

						document.add(HeaderTable);
						HeaderTable.flushContent();

						HeaderTableSpacing.addCell(new Phrase("", subheader));
						HeaderTableSpacing.addCell(new Phrase("", subheader));
						HeaderTableSpacing.addCell(new Phrase("", subheader));

						document.add(HeaderTableSpacing);
						HeaderTableSpacing.flushContent();

						HeaderTableTitle.addCell(new Phrase("", subheader));
						HeaderTableTitle.addCell(new Phrase(" CVS ", subheader));
						HeaderTableTitle.addCell(new Phrase("", subheader));

						document.add(HeaderTableTitle);
						HeaderTableTitle.flushContent();

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Oedema ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getcVSOedema().contains("1") ? "Yes" : "No"), tabletext));
						HeaderTable.addCell(new Phrase("Location ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getcVSOedemaLoca()), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Chest Discomfort ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getcVSDiscomfort().contains("1") ? "Yes" : "No"), tabletext));
						HeaderTable.addCell(new Phrase("Other ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getcVSOther()), tabletext));

						document.add(HeaderTable);
						HeaderTable.flushContent();

						HeaderTableSpacing.addCell(new Phrase("", subheader));
						HeaderTableSpacing.addCell(new Phrase("", subheader));
						HeaderTableSpacing.addCell(new Phrase("", subheader));

						document.add(HeaderTableSpacing);
						HeaderTableSpacing.flushContent();

						HeaderTableTitle.addCell(new Phrase("", subheader));
						HeaderTableTitle.addCell(new Phrase(" BREAST ", subheader));
						HeaderTableTitle.addCell(new Phrase("", subheader));

						document.add(HeaderTableTitle);
						HeaderTableTitle.flushContent();

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Breast Feeding ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getBreastFeeding().contains("1") ? "Yes" : "No"), tabletext));
						HeaderTable.addCell(new Phrase("Lumps ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getBreastLumps().contains("1") ? "Yes" : "No"), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Others ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getBreastOther()), tabletext));
						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("", tabletext));

						document.add(HeaderTable);
						HeaderTable.flushContent();

						HeaderTableSpacing.addCell(new Phrase("", subheader));
						HeaderTableSpacing.addCell(new Phrase("", subheader));
						HeaderTableSpacing.addCell(new Phrase("", subheader));

						document.add(HeaderTableSpacing);
						HeaderTableSpacing.flushContent();

						HeaderTableTitle.addCell(new Phrase("", subheader));
						HeaderTableTitle.addCell(new Phrase(" NEUROLOGIOCAL ", subheader));
						HeaderTableTitle.addCell(new Phrase("", subheader));

						document.add(HeaderTableTitle);
						HeaderTableTitle.flushContent();

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Neurologicals ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getNeurologiocal()), tabletext));
						HeaderTable.addCell(new Phrase("Psychiatric Illness ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getNeuPsych()), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Oriented To ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getNeurologiocalPsy()), tabletext));
						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("", tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Pupils Size ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getNeuPupils()), tabletext));
						HeaderTable.addCell(new Phrase("Deviation ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getNeuDeviation()), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Reaction ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getNeurologiocalPupils()), tabletext));
						HeaderTable.addCell(new Phrase("Speech ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getNeuSpeech()), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("LOC ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getNeuAlert()), tabletext));
						HeaderTable.addCell(new Phrase("Other ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getNeuLOCOther()), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Grips ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getNeuGrips()), tabletext));
						HeaderTable.addCell(new Phrase("Foot Pushes ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getNeuFoot()), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Gag Reflex ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getNeuGag()), tabletext));
						HeaderTable.addCell(new Phrase("Other ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getNeuOther()), tabletext));

						document.add(HeaderTable);
						HeaderTable.flushContent();

						HeaderTableSpacing.addCell(new Phrase("", subheader));
						HeaderTableSpacing.addCell(new Phrase("", subheader));
						HeaderTableSpacing.addCell(new Phrase("", subheader));

						document.add(HeaderTableSpacing);
						HeaderTableSpacing.flushContent();

						HeaderTableTitle.addCell(new Phrase("", subheader));
						HeaderTableTitle.addCell(new Phrase(" PAIN ASSESSMENT ", subheader));
						HeaderTableTitle.addCell(new Phrase("", subheader));

						document.add(HeaderTableTitle);
						HeaderTableTitle.flushContent();

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Pain ", subheader));
						HeaderTable.addCell(new Phrase(
								"" + (listN3.get(i).getPainAssess().contains("1") ? "Yes" : "No"), tabletext));
						HeaderTable.addCell(new Phrase("Location ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getPainAssLocation()), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Duration ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getPainAssDuration()), tabletext));
						HeaderTable.addCell(new Phrase("Exacerbating Factors ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getExaFactor()), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Pain Assessment ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getPainAssessment()), tabletext));
						HeaderTable.addCell(new Phrase("Relivering Factors ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getPainRelivering()), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Affects daily routine ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getDailyRoutine()), tabletext));
						HeaderTable.addCell(new Phrase("Causes of pain ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getPainCauses()), tabletext));

						HeaderTable.addCell(new Phrase("", subheader));
						HeaderTable.addCell(new Phrase("Pain Scale ", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getPainScale()), tabletext));
						HeaderTable.addCell(new Phrase("Sleep", subheader));
						HeaderTable.addCell(new Phrase("" + (listN3.get(i).getSleep().contains("1") ? "Yes" : "No"),
								tabletext));

						document.add(HeaderTable);
						HeaderTable.flushContent();

						HeaderTable12.addCell(new Phrase("", subheader));
						HeaderTable12.addCell(new Phrase("Plan", subheader));
						HeaderTable12.addCell(new Phrase("" + (listN3.get(i).getPlans()), tabletext));

						document.add(HeaderTable12);
						HeaderTable12.flushContent();

						HeaderTableSpacing.addCell(new Phrase("", subheader));
						HeaderTableSpacing.addCell(new Phrase("", subheader));
						HeaderTableSpacing.addCell(new Phrase("", subheader));

						document.add(HeaderTableSpacing);
						HeaderTableSpacing.flushContent();

					}

					document.add(HeaderTable);
					HeaderTable.flushContent();

				}

				/* Page 3 End */

				/* Page 4 Start */

				GlasgowComaScorePage4DTO objGCSDTO = new GlasgowComaScorePage4DTO();
				List<GlasgowComaScorePage4DTO> listGCS = null;
				objGCSDTO = objControl.fetchGlasgowComaScorePage4("allDates", (treat));
				listGCS = objGCSDTO.getListGCS();

				if (listGCS.size() > 0) {

					PdfPTable HeaderTableGCS = new PdfPTable(6);
					int[] headerwidthGCS = { 5, 15, 15, 15, 15, 15 };
					HeaderTableGCS.setWidths(headerwidthGCS);
					HeaderTableGCS.setWidthPercentage(95f);
					HeaderTableGCS.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					PdfPTable HeaderTableGCS1 = new PdfPTable(5);
					int[] headerwidthURS1 = { 5, 15, 10, 15, 35 };
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

					for (int i = 0; i < listGCS.size(); i++) {

						String EOR = "";
						String BMR = "";
						String BVR = "";

						if (listGCS.get(i).getEorScore().equalsIgnoreCase("4"))
							EOR = "Spontaneously";
						else if (listGCS.get(i).getEorScore().equalsIgnoreCase("3"))
							EOR = "To Speech/Verbal Command";
						else if (listGCS.get(i).getEorScore().equalsIgnoreCase("2"))
							EOR = "To Pain";
						else if (listGCS.get(i).getEorScore().equalsIgnoreCase("1"))
							EOR = "No Reponse";

						if (listGCS.get(i).getBvrScore().equalsIgnoreCase("5"))
							BVR = "Oriented and Talks";
						else if (listGCS.get(i).getBvrScore().equalsIgnoreCase("4"))
							BVR = "Disoriented and Talks";
						else if (listGCS.get(i).getBvrScore().equalsIgnoreCase("3"))
							BVR = "Inappropriate Words";
						else if (listGCS.get(i).getBvrScore().equalsIgnoreCase("2"))
							BVR = "Incomprehensible Sounds";
						else if (listGCS.get(i).getBvrScore().equalsIgnoreCase("1"))
							BVR = "No Reponse";

						if (listGCS.get(i).getBmrScore().equalsIgnoreCase("6"))
							BMR = "Obey Verbal Commands";
						else if (listGCS.get(i).getBmrScore().equalsIgnoreCase("5"))
							BMR = "Localizes Pain";
						else if (listGCS.get(i).getBmrScore().equalsIgnoreCase("4"))
							BMR = "Withdraws to Pain";
						else if (listGCS.get(i).getBmrScore().equalsIgnoreCase("3"))
							BMR = "Decorticate";
						else if (listGCS.get(i).getBmrScore().equalsIgnoreCase("2"))
							BMR = "Decerebrate";
						else if (listGCS.get(i).getBmrScore().equalsIgnoreCase("1"))
							BMR = "No Reponse";

						HeaderTableGCS.addCell(new Phrase((i + 1) + ".", subheader));
						HeaderTableGCS.addCell(new Phrase("Eye Opening Response", subheader));
						HeaderTableGCS.addCell(new Phrase("" + EOR, tabletext));
						HeaderTableGCS.addCell(new Phrase("" + listGCS.get(i).getEorScore(), tabletext));
						HeaderTableGCS.addCell(new Phrase("" + listGCS.get(i).getEorTime(), tabletext));
						HeaderTableGCS.addCell(new Phrase("" + listGCS.get(i).getDate(), tabletext));

						HeaderTableGCS.addCell(new Phrase("", subheader));
						HeaderTableGCS.addCell(new Phrase("Best Verbal Response", subheader));
						HeaderTableGCS.addCell(new Phrase("" + BVR, tabletext));
						HeaderTableGCS.addCell(new Phrase("" + listGCS.get(i).getBvrScore(), tabletext));
						HeaderTableGCS.addCell(new Phrase("" + listGCS.get(i).getBvrTime(), tabletext));
						HeaderTableGCS.addCell(new Phrase("" + listGCS.get(i).getDate(), tabletext));

						HeaderTableGCS.addCell(new Phrase("", subheader));
						HeaderTableGCS.addCell(new Phrase("Best Motor Response", subheader));
						HeaderTableGCS.addCell(new Phrase("" + BMR, tabletext));
						HeaderTableGCS.addCell(new Phrase("" + listGCS.get(i).getBmrScore(), tabletext));
						HeaderTableGCS.addCell(new Phrase("" + listGCS.get(i).getBmrTime(), tabletext));
						HeaderTableGCS.addCell(new Phrase("" + listGCS.get(i).getDate(), tabletext));

						HeaderTableGCS.addCell(new Phrase("", subheader));
						HeaderTableGCS.addCell(new Phrase("", subheader));
						HeaderTableGCS.addCell(new Phrase("", tabletext));
						HeaderTableGCS.addCell(new Phrase("", tabletext));
						HeaderTableGCS.addCell(new Phrase("", tabletext));
						HeaderTableGCS.addCell(new Phrase("", tabletext));

						document.add(HeaderTableGCS);
						HeaderTableGCS.flushContent();

						String action = "";

						if (listGCS.get(i).getActionUndertaken().equalsIgnoreCase("A"))
							action = " - Inform Duty Dr. / Intensivist / Consultant / BSL / TPR / BP Monitoring / Consider Endotracheal Intubation ";
						else if (listGCS.get(i).getActionUndertaken().equalsIgnoreCase("B"))
							action = " - Consider Orpoharyngeal Airway / Nasopharyngeal Airway ";
						else if (listGCS.get(i).getActionUndertaken().equalsIgnoreCase("C"))
							action = " - Observation";

						HeaderTableGCS1.addCell(new Phrase("", subheader));
						HeaderTableGCS1.addCell(new Phrase("Total Score", subheader));
						HeaderTableGCS1.addCell(new Phrase("" + listGCS.get(i).getTotalScore(), tabletext));
						HeaderTableGCS1.addCell(new Phrase("Action Plan :", subheader));
						HeaderTableGCS1.addCell(
								new Phrase("(" + listGCS.get(i).getActionUndertaken() + ")" + action, tabletext));

						document.add(HeaderTableGCS1);
						HeaderTableGCS1.flushContent();

						HeaderTableSpacing.addCell(new Phrase("", subheader));

						document.add(HeaderTableSpacing);
						HeaderTableSpacing.flushContent();

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

				MFRAScorePage4DTO objMFRADTO = new MFRAScorePage4DTO();
				List<MFRAScorePage4DTO> listMFRA = null;
				objMFRADTO = objControl.fetchMFRAScorePage4("allDates", (treat));
				listMFRA = objMFRADTO.getListMFRA();

				if (listMFRA.size() > 0) {

					PdfPTable HeaderTableMFRA = new PdfPTable(7);
					int[] headerwidthDVT = { 3, 2, 20, 10, 10, 15, 15 };
					HeaderTableMFRA.setWidths(headerwidthDVT);
					HeaderTableMFRA.setWidthPercentage(95f);
					HeaderTableMFRA.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					PdfPTable HeaderTableMFRA1 = new PdfPTable(7);
					int[] headerwidthDVT1 = { 3, 10, 10, 15, 15, 10, 37 };
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

					for (int i = 0; i < listMFRA.size(); i++) {

						String[] arrFac = listMFRA.get(i).getFactors().split(" ,");
						String[] arrTime = listMFRA.get(i).getTimes().split(",");
						String[] arrScore = listMFRA.get(i).getScores().split(",");

						for (int j = 0; j < arrFac.length; j++) {
							String factor = "";
							String time = arrTime[j];
							String score = arrScore[j];
							String scale = "";

							if (arrFac[j].equalsIgnoreCase("factor1")) {
								factor = "History of fall ";
								if (score.equalsIgnoreCase("25"))
									scale = "Yes";
								else if (score.equalsIgnoreCase("0"))
									scale = "No";
							} else if (arrFac[j].equalsIgnoreCase("factor2")) {
								factor = "Secondary Diagnosis ";
								if (score.equalsIgnoreCase("15"))
									scale = "Yes";
								else if (score.equalsIgnoreCase("0"))
									scale = "Yes";
							} else if (arrFac[j].equalsIgnoreCase("factor3")) {
								factor = "Ambulatory AID";
								if (score.equalsIgnoreCase("30"))
									scale = "Fruiniture";
								else if (score.equalsIgnoreCase("15"))
									scale = "Crutches / Can / Walker";
								else if (score.equalsIgnoreCase("0"))
									scale = "None / BedRest / WheelChair / Nurse";
							} else if (arrFac[j].equalsIgnoreCase("factor4")) {
								factor = "IV / Heparin Lock";
								if (score.equalsIgnoreCase("20"))
									scale = "Yes";
								else if (score.equalsIgnoreCase("0"))
									scale = "No";
							} else if (arrFac[j].equalsIgnoreCase("factor5")) {
								factor = "Gait / Transferring";
								if (score.equalsIgnoreCase("20"))
									scale = "Impaired";
								else if (score.equalsIgnoreCase("10"))
									scale = "Weak";
								else if (score.equalsIgnoreCase("0"))
									scale = "Normal / BedRest / Immobile";
							} else if (arrFac[j].equalsIgnoreCase("factor6")) {
								factor = "Mental Status";
								if (score.equalsIgnoreCase("15"))
									scale = "Forgets Limitations";
								else if (score.equalsIgnoreCase("0"))
									scale = "Oriented to own Ability";
							}

							if (j == 0)
								HeaderTableMFRA.addCell(new Phrase((i + 1) + ".", subheader));
							else
								HeaderTableMFRA.addCell(new Phrase("", subheader));

							HeaderTableMFRA.addCell(new Phrase("#", subheader));
							HeaderTableMFRA.addCell(new Phrase("" + factor, tabletext));
							HeaderTableMFRA.addCell(new Phrase("" + scale, tabletext));
							HeaderTableMFRA.addCell(new Phrase("" + score, tabletext));
							HeaderTableMFRA.addCell(new Phrase("" + time, tabletext));
							HeaderTableMFRA.addCell(new Phrase("" + listMFRA.get(i).getDate(), tabletext));

							document.add(HeaderTableMFRA);
							HeaderTableMFRA.flushContent();

						}
						String act = listMFRA.get(i).getActionPlan();
						act = act.replaceAll("<b>", "");
						act = act.replaceAll("</b>", "");
						act = act.replaceAll("<br>", "");

						HeaderTableMFRA1.addCell(new Phrase("", tabletext));
						HeaderTableMFRA1.addCell(new Phrase("Score", subheader));
						HeaderTableMFRA1.addCell(new Phrase("" + listMFRA.get(i).getTotalScore(), tabletext));
						HeaderTableMFRA1.addCell(new Phrase("Risk Level", subheader));
						HeaderTableMFRA1
								.addCell(new Phrase("" + listMFRA.get(i).getRiskLevel() + " Risk", tabletext));
						HeaderTableMFRA1.addCell(new Phrase("Action Plan", subheader));
						HeaderTableMFRA1.addCell(new Phrase("" + act, tabletext));

						document.add(HeaderTableMFRA1);
						HeaderTableMFRA1.flushContent();

						HeaderTableSpacing.addCell(new Phrase("", subheader));

						document.add(HeaderTableSpacing);
						HeaderTableSpacing.flushContent();

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

				UlcerRiskScorePage4DTO objURSDTO = new UlcerRiskScorePage4DTO();
				List<UlcerRiskScorePage4DTO> listURS = null;
				objURSDTO = objControl.fetchUlcerRiskScorePage4("allDates", (treat));
				listURS = objURSDTO.getListURS();

				if (listURS.size() > 0) {

					PdfPTable HeaderTableURS = new PdfPTable(8);
					int[] headerwidthURS = { 5, 15, 15, 15, 15, 15, 15, 15 };
					HeaderTableURS.setWidths(headerwidthURS);
					HeaderTableURS.setWidthPercentage(95f);
					HeaderTableURS.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					PdfPTable HeaderTableURS1 = new PdfPTable(5);
					int[] headerwidthURS1 = { 5, 10, 15, 15, 35 };
					HeaderTableURS1.setWidths(headerwidthURS1);
					HeaderTableURS1.setWidthPercentage(95f);
					HeaderTableURS1.getDefaultCell().setBorder(Rectangle.BOTTOM);

					HeaderTableTitle.addCell(new Phrase("", subheader));
					HeaderTableTitle
							.addCell(new Phrase("Braden Scale For Predicting Pressure Ulcer Risk", subheader));
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

					for (int i = 0; i < listURS.size(); i++) {

						HeaderTableURS.addCell(new Phrase((i + 1) + "", subheader));
						HeaderTableURS.addCell(new Phrase("" + listURS.get(i).getSensoryPerception(), tabletext));
						HeaderTableURS.addCell(new Phrase("" + listURS.get(i).getMobility(), tabletext));
						HeaderTableURS.addCell(new Phrase("" + listURS.get(i).getActivity(), tabletext));
						HeaderTableURS.addCell(new Phrase("" + listURS.get(i).getMoisture(), tabletext));
						HeaderTableURS.addCell(new Phrase("" + listURS.get(i).getFriction(), tabletext));
						HeaderTableURS.addCell(new Phrase("" + listURS.get(i).getNutrition(), tabletext));
						HeaderTableURS.addCell(new Phrase("" + listURS.get(i).getDate(), tabletext));

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
						HeaderTableURS1.addCell(new Phrase("" + listURS.get(i).getRiskLevel(), tabletext));
						HeaderTableURS1.addCell(new Phrase("Action Plan :", subheader));
						HeaderTableURS1.addCell(new Phrase("" + listURS.get(i).getActionPlan(), tabletext));

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

				NursingCarePlanPage4DTO objNCPDTO = new NursingCarePlanPage4DTO();
				List<NursingCarePlanPage4DTO> listNCP = null;
				objNCPDTO = objControl.fetchNursingCarePlanPage4("allDates", (treat));
				listNCP = objNCPDTO.getListNCP();

				if (listNCP.size() > 0) {

					PdfPTable HeaderTableNCP = new PdfPTable(8);
					int[] headerwidthNCP = { 3, 14, 14, 14, 14, 14, 14, 14 };
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

					for (int i = 0; i < listNCP.size(); i++) {

						String tests = "";
						tests = listNCP.get(i).getTestValues();
						tests = tests.replaceAll("test1", " I/V Cannula");
						tests = tests.replaceAll("test2", " Foleys Catheter");
						tests = tests.replaceAll("test3", " Ryles Tube");
						tests = tests.replaceAll("test4", " Drain");
						tests = tests.replaceAll("test5", " ICD");
						tests = tests.replaceAll("test6", " Colostomy");
						tests = tests.replaceAll("test7", " Ileostomy");

						HeaderTableNCP.addCell(new Phrase((i + 1) + "", subheader));
						HeaderTableNCP.addCell(new Phrase("" + listNCP.get(i).getAssessment(), tabletext));
						HeaderTableNCP.addCell(new Phrase("" + listNCP.get(i).getNursingDiagnosis(), tabletext));
						HeaderTableNCP.addCell(new Phrase("" + listNCP.get(i).getPlanning(), tabletext));
						HeaderTableNCP.addCell(new Phrase("" + listNCP.get(i).getImplementation(), tabletext));
						HeaderTableNCP.addCell(new Phrase("" + listNCP.get(i).getEvaluation(), tabletext));
						HeaderTableNCP.addCell(new Phrase("" + tests, tabletext));
						HeaderTableNCP.addCell(new Phrase("" + listNCP.get(i).getDate(), tabletext));

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

				PdfPTable HeaderTable12u = new PdfPTable(3);
				int[] headerwidth12u = { 33, 33, 33 };
				HeaderTable12u.setWidths(headerwidth12u);
				HeaderTable12u.setWidthPercentage(95f);
				HeaderTable12u.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				

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