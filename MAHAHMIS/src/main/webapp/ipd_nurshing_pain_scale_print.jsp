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
		
	    int patId=Integer.parseInt(request.getParameter("patId"));
		Integer treatmentId=Integer.parseInt(request.getParameter("treatId"));
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
		
		
		
		String  CallforPrint=request.getParameter("CallforPrint");
		
		String fromDate=request.getParameter("fromDate");
		String toDate=request.getParameter("toDate");
      
		//String fromDate=request.getParameter("fromDate");
		
		
		String  printTitle= "IPD History "; //request.getParameter("printTitle");
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
		
		request.setAttribute("treatmentId", request.getParameter("treatId"));
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
			
				
				
			
				
	  		// strat History Data



	  			TreatmentNurshingController uss1=(ApplicationContextUtils.getApplicationContext()).getBean(TreatmentNurshingController.class);
	  			TreatmentNurshingService uss2=(ApplicationContextUtils.getApplicationContext()).getBean(TreatmentNurshingService.class);
	  			NurshingPainScaleDTO nObj=  uss2.getNurshingPainScaleForPrint(treatmentId, unitId, fromDate, toDate);

	  			 	PdfPTable HeaderTableSpace = new PdfPTable(1);
	  				int[] headerwidthSpace = {40 };
	  				HeaderTableSpace.setWidths(headerwidthSpace);
	  				HeaderTableSpace.setWidthPercentage(95f);
	  				HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  				HeaderTableSpace.setSpacingAfter(5.0f);

	  				PdfPTable HeaderTableChem = new PdfPTable(6);
	  				int[] headerwidthChemo = {10,20,20,20,20,20 };
	  				HeaderTableChem.setWidths(headerwidthChemo);
	  				HeaderTableChem.setWidthPercentage(95f);
	  				HeaderTableChem.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  						
	  				HeaderTableChem.addCell(new Phrase("Sr.No", subheader));
	  				HeaderTableChem.addCell(new Phrase("Date", subheader));
	  				HeaderTableChem.addCell(new Phrase("PainScale", subheader));
	  				HeaderTableChem.addCell(new Phrase("Acute", subheader));
	  				HeaderTableChem.addCell(new Phrase("Chronic", subheader));
	  				HeaderTableChem.addCell(new Phrase("Location", subheader));
	  				
	  						
	  			         if(nObj !=null){
	  			        	 int index=1;
	  			        	 if(nObj.getLstNurshingPainScale().size() > 0  ){
	  			        	 for(int i=0; i < nObj.getLstNurshingPainScale().size() ;i++){
	  			        		 
	  			        		 HeaderTableChem.addCell(new Phrase(""+index, subheader));
	  			        		 HeaderTableChem.addCell(new Phrase(""+nObj.getLstNurshingPainScale().get(i).getPainScaleDate(), subheader));
	  			        		 HeaderTableChem.addCell(new Phrase(""+nObj.getLstNurshingPainScale().get(i).getPainScale(), subheader));
	  			        		 HeaderTableChem.addCell(new Phrase(""+nObj.getLstNurshingPainScale().get(i).getAcute(), subheader));
	  			        		 HeaderTableChem.addCell(new Phrase(""+nObj.getLstNurshingPainScale().get(i).getChronic(), subheader));
	  			        		 HeaderTableChem.addCell(new Phrase(""+nObj.getLstNurshingPainScale().get(i).getLocation(), subheader));
	  			        		 index++;
	  			        			 }
	  			         		}
	  			         }
	  			        	 
	  			        	 
	  						document.add(HeaderTableChem);
	  						HeaderTableChem.flushContent();
	  					    	
	  					    	
	  					    	HeaderTableSpace.addCell(new Phrase("", tabletext));
	  			  			document.add(HeaderTableSpace);
	  			  			HeaderTableSpace.flushContent();
	  			        	
	  			        	 
	  			         


	  			//End History Data

	  						// Table5 : For service details head start

	  						

	  					
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
	  						
	  						HeaderTable5.addCell(new Phrase("", tabletext));
	  						HeaderTable5.addCell(new Phrase("", tabletext));
	  						HeaderTable5.addCell(new Phrase("", tabletext));
	  						HeaderTable5.addCell(new Phrase("", tabletext));
	  						HeaderTable5.addCell(new Phrase("", tabletext));
	  						HeaderTable5.addCell(new Phrase("", tabletext));
	  						HeaderTable5.addCell(new Phrase("", tabletext));

	  						document.add(HeaderTable5);
	  						HeaderTable5.flushContent();

	  						// Table5 : For service details head end

	  						
	  						
	  						
	  						
	  						
	  					
	  						// Table6 : For receipt footer end

	  						// Table4 : For page footer start

	  						PdfPTable HeaderTable4 = new PdfPTable(3);
	  						int[] headerwidth4 = { 30, 60, 20 };
	  						HeaderTable4.setWidths(headerwidth4);
	  						HeaderTable4.setWidthPercentage(95f);
	  						HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  						HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  						HeaderTable4.addCell(new Phrase("", subheader));
	  						HeaderTable4.addCell(new Phrase("", tabletext));
	  						HeaderTable4.addCell(new Phrase("", tabletext));

	  						HeaderTable4.addCell(new Phrase("", subheader));
	  						HeaderTable4.addCell(new Phrase("", subheader));
	  						HeaderTable4.addCell(new Phrase("", subheader));

	  						HeaderTable4.addCell(new Phrase("", subheader));
	  						HeaderTable4.addCell(new Phrase("", subheader));
	  						HeaderTable4.addCell(new Phrase("", subheader));

	  						HeaderTable4.addCell(new Phrase("", subheader));
	  						HeaderTable4.addCell(new Phrase("", subheader));
	  						HeaderTable4.addCell(new Phrase("", subheader));
	  						Integer labId=0;
	

	  						// Table4 : For page footer end

	  						
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