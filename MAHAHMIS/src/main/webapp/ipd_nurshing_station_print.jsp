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
	
		HttpSession session2 = request.getSession();
		int hospitalUnitId= (Integer) session2.getAttribute("uId");
		HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
	//	List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
		List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
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
		
	    int patId=Integer.parseInt(request.getParameter("patId"));
		Integer treatmentId=Integer.parseInt(request.getParameter("treatId"));
		int recId=Integer.parseInt(request.getParameter("recId"));
		String  languageOF=request.getParameter("instructionLanguage");
		String  CallFromOPD=request.getParameter("CallFrom");
		int unitId=Integer.parseInt(request.getParameter("unitId"));
		//String chemoDate=request.getParameter("chemoDate");
		
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
      

		
		String  printTitle= "IPD Nurshing Print "; //request.getParameter("printTitle");
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
		
		request.setAttribute("treatmentId", request.getParameter("treatId"));
		
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
						
						
					
					BillService hm = (ApplicationContextUtils.getApplicationContext()).getBean(BillService.class);				
					List<BillReceiptMasterDTO> lstPojo = new ArrayList<BillReceiptMasterDTO>();
					String pendFlag = request.getParameter("pendFlag");
					String callFrom = "receipt";
					if (pendFlag.equals("Y")) {

						callFrom = "prevReceipt";
					} else {

						callFrom = "receipt";
					}

					Integer patBillId = ltRegMasterDto.get(0).getBillId();
					String billId = String.valueOf(ltRegMasterDto.get(0)
							.getBillId());
					String PatientID = String.valueOf(ltRegMasterDto.get(0)
							.getPatientId());

					lstPojo = hm.getOpdRecDetails(patBillId, treatmentId, patId,
							recId, callFrom);
					
					String discRemark = "";
					int recCount = 0;
					int againstId = 0;
					String receiptNo = "";
					String againstNo = "";
					
					if(lstPojo.size() !=0)
					{
						 discRemark = lstPojo.get(0).getDiscRemark();
						 recCount = lstPojo.get(0).getReceiptCount();
						 againstId = lstPojo.get(0).getAgainstId();
						 receiptNo = String.valueOf(recCount);
						 againstNo = String.valueOf(againstId); 
					}
					
					
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
					List<MultiBillReceiptMasterDTO> listMultiPay = new ArrayList<MultiBillReceiptMasterDTO>();
					listMultiPay = hm.getMultiRecDetails(patBillId, treatmentId,patId, recId, departmentId);

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

				// strat History Data


				String dateString="";
				TreatmentNurshingController uss1=(ApplicationContextUtils.getApplicationContext()).getBean(TreatmentNurshingController.class);
				TreatmentNurshingService nchart=(ApplicationContextUtils.getApplicationContext()).getBean(TreatmentNurshingService.class);
				List<TreatmentNurshingDTO> lstNurshingChart=  nchart.getNurchingChartDetails(treatmentId, unitId,fromDate);
				
				ChartInfoDTO inputObj=  uss1.getListOfInputOutputDetails(treatmentId, unitId, 4,fromDate);
				
				ChartInfoDTO OutputObj=  uss1.getListOfInputOutputDetails(treatmentId, unitId, 5,fromDate);

				ChartReportDTO  vitalDto=uss1.getIpdVitalList(treatmentId, unitId, fromDate);
				
				ChartReportDTO   intobj=uss1.getPostIntensvisit(treatmentId, unitId, fromDate, 2);
				
				ChartReportDTO    postobj=uss1.getPostIntensvisit(treatmentId, unitId, fromDate, 1);
				
				 if(CallforPrint.equalsIgnoreCase("nurshing")){

					 
					 	PdfPTable HeaderTableName = new PdfPTable(1);
						int[] headerwidthName = {10};
						HeaderTableName.setWidths(headerwidthName);
						HeaderTableName.setWidthPercentage(95f);
						HeaderTableName.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						// start nurshing chart
						 HeaderTableName.addCell(new Phrase("Nurshing chart: ", subheader));
						 document.add(HeaderTableName);
						 HeaderTableName.flushContent();
				// start nurshing chart
							PdfPTable HeaderTableCh = new PdfPTable(5);
							int[] headerwidthCh = {5,5,5,5,5 };
							HeaderTableCh.setWidths(headerwidthCh);
							HeaderTableCh.setWidthPercentage(95f);
							HeaderTableCh.getDefaultCell().setBorder(Rectangle.BOX);
							
								HeaderTableCh.addCell(new Phrase("#", subheader));
								HeaderTableCh.addCell(new Phrase("Time", subheader));
								HeaderTableCh.addCell(new Phrase("Heading Note", subheader));
								HeaderTableCh.addCell(new Phrase("Note", subheader));
								HeaderTableCh.addCell(new Phrase("Sign", subheader));
								
				           int index=1;
				        	 if(lstNurshingChart.size() > 0){
				        		 for(int i=0;i < lstNurshingChart.size();i++){
					        		 HeaderTableCh.addCell(new Phrase(""+index, tabletext));
					        		 HeaderTableCh.addCell(new Phrase(""+lstNurshingChart.get(i).getCheckUpdTime(), tabletext));
					        		 HeaderTableCh.addCell(new Phrase(""+lstNurshingChart.get(i).getHeadingName(), tabletext));
					        		 HeaderTableCh.addCell(new Phrase(""+lstNurshingChart.get(i).getNote(), tabletext));
					        		 HeaderTableCh.addCell(new Phrase(""+lstNurshingChart.get(i).getDoctorName(), tabletext));
					        		 index++;
					        	
				        		 }
				        	 }
				        	 document.add(HeaderTableCh);
				        	 HeaderTableCh.flushContent();
				
				        		HeaderTableSpace.addCell(new Phrase("", tabletext));
				      			document.add(HeaderTableSpace);
				      			HeaderTableSpace.flushContent();
				
				      			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

				      			
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			
				    			/* HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext)); */

				    			document.add(HeaderTable5);
				    			HeaderTable5.flushContent();
				 }
	//End Nurshin Chart

	// start input

				 if(CallforPrint.equalsIgnoreCase("input")){

						// start nurshing chart
									PdfPTable HeaderTableIn = new PdfPTable(6);
									int[] headerwidthIn = { 14,14,14,14,14,14};
									HeaderTableIn.setWidths(headerwidthIn);
									HeaderTableIn.setWidthPercentage(95f);
									HeaderTableIn.getDefaultCell().setBorder(Rectangle.NO_BORDER);
									
										HeaderTableIn.addCell(new Phrase("#", subheader));
										HeaderTableIn.addCell(new Phrase("Time", subheader));
										HeaderTableIn.addCell(new Phrase("Chart Name", subheader));
										HeaderTableIn.addCell(new Phrase("Key", subheader));
										HeaderTableIn.addCell(new Phrase("value", subheader));
										HeaderTableIn.addCell(new Phrase("Unit", subheader));
										
										HeaderTableIn.getDefaultCell().setBorder(Rectangle.BOTTOM);
										/* HeaderTableIn.addCell(new Phrase("", subheader));
										HeaderTableIn.addCell(new Phrase("", subheader));
										HeaderTableIn.addCell(new Phrase("", subheader));
										HeaderTableIn.addCell(new Phrase("", subheader));
										HeaderTableIn.addCell(new Phrase("", subheader));
										HeaderTableIn.addCell(new Phrase("", subheader)); */
										document.add(HeaderTableIn);
										HeaderTableIn.flushContent();
										
						           int countIn=1;
						           int tot = 0;
						        	 if(inputObj.getLstChartInfo().size() > 0){
						        		 for(int i=0;i < inputObj.getLstChartInfo().size();i++){
						        			 
						        			 	PdfPTable Table1o = new PdfPTable(6);
												int[] width1o = { 14,14,14,14,14,14};
												Table1o.setWidths(width1o);
												Table1o.setWidthPercentage(95f);
												Table1o.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						        			 
												Table1o.addCell(new Phrase(""+countIn, tabletext));
												Table1o.addCell(new Phrase(""+inputObj.getLstChartInfo().get(i).getTime(), tabletext));
												Table1o.addCell(new Phrase(""+inputObj.getLstChartInfo().get(i).getcName(), tabletext));
												Table1o.addCell(new Phrase(""+inputObj.getLstChartInfo().get(i).getConstant(), tabletext));
												Table1o.addCell(new Phrase(""+inputObj.getLstChartInfo().get(i).getValue(), tabletext));
												Table1o.addCell(new Phrase(""+inputObj.getLstChartInfo().get(i).getUnit(), tabletext));
							        		 
												tot = tot+Integer.parseInt(inputObj.getLstChartInfo().get(i).getValue());
												countIn++;
							        		 document.add(Table1o);
								        	 Table1o.flushContent();
							        	
						        		 }
						        	 }
						        	
						
						        	 
						        		HeaderTableSpace.addCell(new Phrase("", tabletext));
						      			document.add(HeaderTableSpace);
						      			HeaderTableSpace.flushContent();
						
						      			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

						      			
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
						    			HeaderTable5.addCell(new Phrase("Total :", subheader));
						    			HeaderTable5.addCell(new Phrase(""+tot, subheader));
						    			HeaderTable5.addCell(new Phrase("", tabletext));

						    			document.add(HeaderTable5);
						    			HeaderTable5.flushContent();
						 }
			//End input


				// start output

				 if(CallforPrint.equalsIgnoreCase("output")){

					 
					 	PdfPTable HeaderTableName = new PdfPTable(1);
						int[] headerwidthName = {10};
						HeaderTableName.setWidths(headerwidthName);
						HeaderTableName.setWidthPercentage(95f);
						HeaderTableName.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						
									PdfPTable HeaderTableOut = new PdfPTable(6);
									//int[] headerwidthout = {5,5,5,5,5,5};
									int[] headerwidthout = { 14,14,14,14,14,14};
									HeaderTableOut.setWidths(headerwidthout);
									HeaderTableOut.setWidthPercentage(95f);
									HeaderTableOut.getDefaultCell().setBorder(Rectangle.NO_BORDER);
									
									
									
									HeaderTableName.addCell(new Phrase("Output: ", subheader));
									document.add(HeaderTableName);
									HeaderTableName.flushContent();
									
									HeaderTableOut.addCell(new Phrase("#", subheader));
									HeaderTableOut.addCell(new Phrase("Time", subheader));
									HeaderTableOut.addCell(new Phrase("Chart Name", subheader));
									HeaderTableOut.addCell(new Phrase("Key", subheader));
									HeaderTableOut.addCell(new Phrase("Value", subheader));
									HeaderTableOut.addCell(new Phrase("Unit", subheader));
									
									HeaderTableOut.getDefaultCell().setBorder(Rectangle.BOTTOM);
									HeaderTableOut.addCell(new Phrase("", subheader));
									HeaderTableOut.addCell(new Phrase("", subheader));
									HeaderTableOut.addCell(new Phrase("", subheader));
									HeaderTableOut.addCell(new Phrase("", subheader));
									HeaderTableOut.addCell(new Phrase("", subheader));
									HeaderTableOut.addCell(new Phrase("", subheader));
									document.add(HeaderTableOut);
									HeaderTableOut.flushContent();
									
									document.add(HeaderTableOut);
									HeaderTableOut.flushContent();
										
						           int countOut=1;
						           int tot=0;
						           int urineTotal=0;
						           int stoolTotal=0;
						        	 if(OutputObj.getLstChartInfo().size() > 0){
						        		 for(int i=0;i <OutputObj.getLstChartInfo().size();i++){
						        			 
						        			 PdfPTable Table1o = new PdfPTable(6);
												int[] width1o = { 14,14,14,14,14,14};
												Table1o.setWidths(width1o);
												Table1o.setWidthPercentage(95f);
												Table1o.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						        			 
												Table1o.addCell(new Phrase(""+countOut, tabletext));
												Table1o.addCell(new Phrase(""+OutputObj.getLstChartInfo().get(i).getTime(), tabletext));
												Table1o.addCell(new Phrase(""+OutputObj.getLstChartInfo().get(i).getcName(), tabletext));
												Table1o.addCell(new Phrase(""+OutputObj.getLstChartInfo().get(i).getConstant(), tabletext));
												Table1o.addCell(new Phrase(""+OutputObj.getLstChartInfo().get(i).getValue(), tabletext));
												Table1o.addCell(new Phrase(""+OutputObj.getLstChartInfo().get(i).getUnit(), tabletext));
							        		 
												tot = tot+Integer.parseInt(OutputObj.getLstChartInfo().get(i).getValue());
												if(OutputObj.getLstChartInfo().get(i).getcName().equalsIgnoreCase("Urine")){
													urineTotal=urineTotal+Integer.parseInt(OutputObj.getLstChartInfo().get(i).getValue());
												}
												
												if(OutputObj.getLstChartInfo().get(i).getcName().equalsIgnoreCase("Stools")){
													stoolTotal=stoolTotal+Integer.parseInt(OutputObj.getLstChartInfo().get(i).getValue());
												}
						        			 
							        		/*  HeaderTableOut.addCell(new Phrase(""+countOut, tabletext));
							        		 HeaderTableOut.addCell(new Phrase(""+OutputObj.getLstChartInfo().get(i).getTime(), tabletext));
							        		 HeaderTableOut.addCell(new Phrase(""+OutputObj.getLstChartInfo().get(i).getcName(), tabletext));
							        		 HeaderTableOut.addCell(new Phrase(""+OutputObj.getLstChartInfo().get(i).getConstant(), tabletext));
							        		 HeaderTableOut.addCell(new Phrase(""+OutputObj.getLstChartInfo().get(i).getValue(), tabletext));
							        		 HeaderTableOut.addCell(new Phrase(""+OutputObj.getLstChartInfo().get(i).getUnit(), tabletext));
							        		  */
							        		 countOut++;
							        		  
							        		 document.add(Table1o);
								        	 Table1o.flushContent();
							        	
						        		 }
						        	 }
						        	 document.add(HeaderTableOut);
						        	 HeaderTableOut.flushContent();
						
						        		HeaderTableSpace.addCell(new Phrase("", tabletext));
						      			document.add(HeaderTableSpace);
						      			HeaderTableSpace.flushContent();
						
						      			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

						      			
						    			HeaderTable5.addCell(new Phrase("", tabletext));
						    			HeaderTable5.addCell(new Phrase("", tabletext));
						    			HeaderTable5.addCell(new Phrase("", tabletext));
						    			HeaderTable5.addCell(new Phrase("", tabletext));
						    			HeaderTable5.addCell(new Phrase("", tabletext));
						    			HeaderTable5.addCell(new Phrase("", tabletext));
						    			HeaderTable5.addCell(new Phrase("", tabletext));
						    			
						    			HeaderTable5.addCell(new Phrase("", tabletext));
						    			HeaderTable5.addCell(new Phrase("Total :", tabletext));
						    			HeaderTable5.addCell(new Phrase("Urine ="+urineTotal, tabletext));
						    			HeaderTable5.addCell(new Phrase("", tabletext));
						    			HeaderTable5.addCell(new Phrase("", tabletext));
						    			HeaderTable5.addCell(new Phrase("Stools = "+stoolTotal, tabletext));
						    			//HeaderTable5.addCell(new Phrase("Total :", subheader));
						    			//HeaderTable5.addCell(new Phrase(""+tot, subheader));
						    			HeaderTable5.addCell(new Phrase("", tabletext));

						    			document.add(HeaderTable5);
						    			HeaderTable5.flushContent();
						 }
			//End output

	// start intensvisit
				 if(CallforPrint.equalsIgnoreCase("intensvisit")){
						
					 	PdfPTable HeaderTableName = new PdfPTable(1);
						int[] headerwidthName = {10};
						HeaderTableName.setWidths(headerwidthName);
						HeaderTableName.setWidthPercentage(95f);
						HeaderTableName.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						
					 	HeaderTableName.addCell(new Phrase("Intensvisit: ", subheader));
						document.add(HeaderTableName);
						HeaderTableName.flushContent();
					 
						PdfPTable HeaderTableInsiv = new PdfPTable(3);
						int[] headerwidthsiv = {5,5,5};
						HeaderTableInsiv.setWidths(headerwidthsiv);
						HeaderTableInsiv.setWidthPercentage(95f);
						HeaderTableInsiv.getDefaultCell().setBorder(Rectangle.BOX);
						
						
							HeaderTableInsiv.addCell(new Phrase("#", subheader));
							HeaderTableInsiv.addCell(new Phrase("Intensivist", subheader));
							HeaderTableInsiv.addCell(new Phrase("Sign", subheader));
							
							
			           int countIntsiv=1;
			        	 if(intobj.getLstChartReport().size() > 0){
			        		 for(int i=0;i <intobj.getLstChartReport().size();i++){
				        		 HeaderTableInsiv.addCell(new Phrase(""+countIntsiv, tabletext));
				        		 HeaderTableInsiv.addCell(new Phrase(""+intobj.getLstChartReport().get(i).getTime(), tabletext));
				        		 HeaderTableInsiv.addCell(new Phrase(""+postobj.getLstChartReport().get(i).getUserName(), tabletext));
				        		 countIntsiv++;
				        	
			        		 }
			        	 }
			        	 document.add(HeaderTableInsiv);
			        	 HeaderTableInsiv.flushContent();
			
			        		HeaderTableSpace.addCell(new Phrase("", tabletext));
			      			document.add(HeaderTableSpace);
			      			HeaderTableSpace.flushContent();
			
			      			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

			      			
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			
			    			/* HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext)); */

			    			document.add(HeaderTable5);
			    			HeaderTable5.flushContent();
			 }
	// End intensvisit

				// start post operation
				 if(CallforPrint.equalsIgnoreCase("post")){
						
					 PdfPTable HeaderTableName = new PdfPTable(1);
						int[] headerwidthName = {10};
						HeaderTableName.setWidths(headerwidthName);
						HeaderTableName.setWidthPercentage(95f);
						HeaderTableName.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						
					 	HeaderTableName.addCell(new Phrase("Post Operation: ", subheader));
						document.add(HeaderTableName);
						HeaderTableName.flushContent();
					 
						PdfPTable HeaderTableInout = new PdfPTable(3);
						int[] headerwidthout = {5,5,5};
						HeaderTableInout.setWidths(headerwidthout);
						HeaderTableInout.setWidthPercentage(95f);
						HeaderTableInout.getDefaultCell().setBorder(Rectangle.BOX);
						
							HeaderTableInout.addCell(new Phrase("#", subheader));
							HeaderTableInout.addCell(new Phrase("Post Operation hours", subheader));
							HeaderTableInout.addCell(new Phrase("Sign", subheader));
							
							
			           int countIntpost=1;
			        	 if(postobj.getLstChartReport().size() > 0){
			        		 for(int i=0;i < postobj.getLstChartReport().size();i++){
				        		 HeaderTableInout.addCell(new Phrase(""+countIntpost, tabletext));
				        		 HeaderTableInout.addCell(new Phrase(""+postobj.getLstChartReport().get(i).getTime(), tabletext));
				        		 HeaderTableInout.addCell(new Phrase(""+postobj.getLstChartReport().get(i).getUserName(), tabletext));
				        		 countIntpost++;
				        	
			        		 }
			        	 }
			        	 document.add(HeaderTableInout);
			        	 HeaderTableInout.flushContent();
			
			        		HeaderTableSpace.addCell(new Phrase("", tabletext));
			      			document.add(HeaderTableSpace);
			      			HeaderTableSpace.flushContent();
			
			      			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

			      			
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			
			    			/* HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext)); */

			    			document.add(HeaderTable5);
			    			HeaderTable5.flushContent();
			 }
	// End post operation

	//satrt vitals 
				 if(CallforPrint.equalsIgnoreCase("vitals")){
						
					 	PdfPTable HeaderTableName = new PdfPTable(1);
						int[] headerwidthName = {10};
						HeaderTableName.setWidths(headerwidthName);
						HeaderTableName.setWidthPercentage(95f);
						HeaderTableName.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						
					 	HeaderTableName.addCell(new Phrase("Vitals: ", subheader));
						document.add(HeaderTableName);
						HeaderTableName.flushContent();
					 
						PdfPTable HeaderTableIVital = new PdfPTable(26);
						int[] headerwidthvital = {5,10,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5};
						HeaderTableIVital.setWidths(headerwidthvital);
						HeaderTableIVital.setWidthPercentage(95f);
						HeaderTableIVital.getDefaultCell().setBorder(Rectangle.BOX);
						
							HeaderTableIVital.addCell(new Phrase("#", subheader));
							HeaderTableIVital.addCell(new Phrase("Name", subheader));
							HeaderTableIVital.addCell(new Phrase("8am", subheader));
							HeaderTableIVital.addCell(new Phrase("9am", subheader));
							HeaderTableIVital.addCell(new Phrase("10am", subheader));
							HeaderTableIVital.addCell(new Phrase("11am", subheader));
							HeaderTableIVital.addCell(new Phrase("12am", subheader));
							HeaderTableIVital.addCell(new Phrase("1pm", subheader));
							HeaderTableIVital.addCell(new Phrase("2pm", subheader));
							HeaderTableIVital.addCell(new Phrase("3pm", subheader));
							HeaderTableIVital.addCell(new Phrase("4pm", subheader));
							HeaderTableIVital.addCell(new Phrase("5pm", subheader));
							HeaderTableIVital.addCell(new Phrase("6pm", subheader));
							HeaderTableIVital.addCell(new Phrase("7pm", subheader));
							HeaderTableIVital.addCell(new Phrase("8pm", subheader));
							HeaderTableIVital.addCell(new Phrase("9pm", subheader));
							HeaderTableIVital.addCell(new Phrase("10pm", subheader));
							HeaderTableIVital.addCell(new Phrase("11pm", subheader));
							HeaderTableIVital.addCell(new Phrase("12pm", subheader));
							HeaderTableIVital.addCell(new Phrase("1am", subheader));
							HeaderTableIVital.addCell(new Phrase("2am", subheader));
							HeaderTableIVital.addCell(new Phrase("3am", subheader));
							HeaderTableIVital.addCell(new Phrase("4am", subheader));
							HeaderTableIVital.addCell(new Phrase("5am", subheader));
							HeaderTableIVital.addCell(new Phrase("6am", subheader));
							HeaderTableIVital.addCell(new Phrase("7am", subheader));
							
							
			           int countvital=1;
			        	 if(vitalDto.getLstChartReport().size() > 0){
			        		 for(int i=0;i < vitalDto.getLstChartReport().size();i++){
				        		 HeaderTableIVital.addCell(new Phrase(""+countvital, tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getCname(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm8(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm9(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm10(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm11(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm12(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm1(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm2(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm3(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm4(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm5(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm6(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm7(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm8(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm9(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm10(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm11(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm12(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm1(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm2(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm3(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm4(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm5(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm6(), tabletext));
				        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm7(), tabletext));
				        		 countvital++;
				        	
			        		 }
			        	 }
			        	 document.add(HeaderTableIVital);
			        	 HeaderTableIVital.flushContent();
			
			        		HeaderTableSpace.addCell(new Phrase("", tabletext));
			      			document.add(HeaderTableSpace);
			      			HeaderTableSpace.flushContent();
			
			      			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

			      			
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			
			    			/* HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext));
			    			HeaderTable5.addCell(new Phrase("", tabletext)); */

			    			document.add(HeaderTable5);
			    			HeaderTable5.flushContent();
			 }
	 // End vitals
	    
	                   // start Chemo Data
	                    TreatmentNurshingService chemoService=(ApplicationContextUtils.getApplicationContext()).getBean(TreatmentNurshingService.class);
	                    List<OPDChemoTheropyDTO> listChemo= chemoService.getListOfChemoDetails(treatmentId, unitId) ;   
	                    if(CallforPrint.equalsIgnoreCase("chemo")) {
	                    if(listChemo.size() > 0){
	                    	PdfPTable HeaderTableChemo = new PdfPTable(6);
	    					int[] headerwidthChemo = {5,10,10,10,10,10};
	    					HeaderTableChemo.setWidths(headerwidthChemo);
	    					HeaderTableChemo.setWidthPercentage(95f);
	    					HeaderTableChemo.getDefaultCell().setBorder(Rectangle.BOX);
	    					
	    					HeaderTableChemo.addCell(new Phrase("#", subheader));
	    					HeaderTableChemo.addCell(new Phrase("Chemo Protocol", subheader));
	    					HeaderTableChemo.addCell(new Phrase("Start Time", subheader));
	    					HeaderTableChemo.addCell(new Phrase("Stop Time", subheader));
	    					HeaderTableChemo.addCell(new Phrase("Sign", subheader));
	    					HeaderTableChemo.addCell(new Phrase("Remark", subheader));
	    					int chemoIndex=1;
	    					for(int i=0; i < listChemo.size();i++){
	    						HeaderTableChemo.addCell(new Phrase(""+chemoIndex, tabletext));
	        					HeaderTableChemo.addCell(new Phrase(""+listChemo.get(i).getChemotherapyProtocol(), tabletext));
	        					HeaderTableChemo.addCell(new Phrase(""+listChemo.get(i).getStartTime(), tabletext));
	        					HeaderTableChemo.addCell(new Phrase(""+listChemo.get(i).getEndTime(), tabletext));
	        					HeaderTableChemo.addCell(new Phrase(""+listChemo.get(i).getSign(), tabletext));
	        					HeaderTableChemo.addCell(new Phrase(""+listChemo.get(i).getRemark(), tabletext));
	    					}
	    					document.add(HeaderTableChemo);
	    					HeaderTableChemo.flushContent();	
	    						
	                    }
	                    
	                	HeaderTableSpace.addCell(new Phrase("", tabletext));
		      			document.add(HeaderTableSpace);
		      			HeaderTableSpace.flushContent();
		
		      			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

		      			
		    			HeaderTable5.addCell(new Phrase("", tabletext));
		    			HeaderTable5.addCell(new Phrase("", tabletext));
		    			HeaderTable5.addCell(new Phrase("", tabletext));
		    			HeaderTable5.addCell(new Phrase("", tabletext));
		    			HeaderTable5.addCell(new Phrase("", tabletext));
		    			HeaderTable5.addCell(new Phrase("", tabletext));
		    			HeaderTable5.addCell(new Phrase("", tabletext));
		    			
		    			/* HeaderTable5.addCell(new Phrase("", tabletext));
		    			HeaderTable5.addCell(new Phrase("", tabletext));
		    			HeaderTable5.addCell(new Phrase("", tabletext));
		    			HeaderTable5.addCell(new Phrase("", tabletext));
		    			HeaderTable5.addCell(new Phrase("", tabletext));
		    			HeaderTable5.addCell(new Phrase("", tabletext));
		    			HeaderTable5.addCell(new Phrase("", tabletext)); */

		    			document.add(HeaderTable5);
		    			HeaderTable5.flushContent();
	                    
	                    }
	 //end Chemo Data
	 
	 
	 	//start care plane data
	 	NurshingCarePlanDTO carePlanDTO=chemoService.getNurshingCarePlan(treatmentId, unitId);
		
	 	if(CallforPrint.equalsIgnoreCase("careplane")) {
	        if(carePlanDTO!=null){        	
	        	
	        	
				PdfPTable HeaderTable5c = new PdfPTable(2);
				int[] headerwidth5c = {30,70};
				HeaderTable5c.setWidths(headerwidth5c);
				HeaderTable5c.setWidthPercentage(95f);
				
				HeaderTable5c.addCell(new Phrase("Care Plan: ", tableheader));
				HeaderTable5c.addCell(new Phrase(""+carePlanDTO.getCarePlan(), tabletext));
			
				document.add(HeaderTable5c);
				HeaderTable5c.flushContent();
	        }
	     }
	 	
	 	//end care plane data
	 	
	 	//start pain Scale data
	 	
	 	List<NurshingPainScaleDTO> painScaleDTOList =chemoService.getAllNurshingPainScale(treatmentId, unitId);
	 	
	 	if(CallforPrint.equalsIgnoreCase("painScale")){
			
			PdfPTable DRRHeaderTable = new PdfPTable(1);
			int[] DRRHeaderWidth = { 50 };
			DRRHeaderTable.setWidths(DRRHeaderWidth);
			DRRHeaderTable.setWidthPercentage(95f);
			DRRHeaderTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable DRRHeaderTable1 = new PdfPTable(6);
			int[] DRRHeaderWidth1 =  { 20, 22, 20, 30, 30,30};
			DRRHeaderTable1.setWidths(DRRHeaderWidth1);
			DRRHeaderTable1.setWidthPercentage(95f);
			DRRHeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
			
				
				 document.add(DRRHeaderTable1);
				 DRRHeaderTable1.flushContent();
				
				if (painScaleDTOList!=null) {
					
					DRRHeaderTable.addCell(new Phrase("Pain Scale :-",subheader));
					
					document.add(DRRHeaderTable);
					DRRHeaderTable.flushContent();
					
					 DRRHeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
					 DRRHeaderTable1.addCell(new Phrase("",tabletext));
					 DRRHeaderTable1.addCell(new Phrase("",tabletext));
					 DRRHeaderTable1.addCell(new Phrase("",tabletext));
					 DRRHeaderTable1.addCell(new Phrase("",tabletext));
					 DRRHeaderTable1.addCell(new Phrase("",tabletext));
					 DRRHeaderTable1.addCell(new Phrase("",tabletext));
					 
		
					
					DRRHeaderTable1.addCell(new Phrase("#", subheader));
					DRRHeaderTable1.addCell(new Phrase("Date",subheader));
					DRRHeaderTable1.addCell(new Phrase("Acute",subheader));
					DRRHeaderTable1.addCell(new Phrase("Chronic", subheader));
					DRRHeaderTable1.addCell(new Phrase("Location", subheader));
					DRRHeaderTable1.addCell(new Phrase("Pain Scale", subheader));

					
					 DRRHeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					 DRRHeaderTable1.addCell(new Phrase("",tabletext));
					 DRRHeaderTable1.addCell(new Phrase("",tabletext));
					 DRRHeaderTable1.addCell(new Phrase("",tabletext));
					 DRRHeaderTable1.addCell(new Phrase("",tabletext));
					 DRRHeaderTable1.addCell(new Phrase("",tabletext));
					 DRRHeaderTable1.addCell(new Phrase("",tabletext));
				
					document.add(DRRHeaderTable1);
					DRRHeaderTable1.flushContent();
					
				for(int i=0;i<painScaleDTOList.size();i++) {
					 DRRHeaderTable1.getDefaultCell().setBorder(
								Rectangle.NO_BORDER);
					 
					/*  DRRHeaderTable1.addCell(new Phrase("" + (i+ 1),tabletext));
					 DRRHeaderTable1.addCell(new Phrase(""+ dctr.getListDRT().get(i).getDate(),tabletext));
					 DRRHeaderTable1.addCell(new Phrase(""+ dctr.getListDRT().get(i).getAcute(),tabletext));
					 DRRHeaderTable1.addCell(new Phrase(""+ dctr.getListDRT().get(i).getChronic(),tabletext));
					 DRRHeaderTable1.addCell(new Phrase(""+ dctr.getListDRT().get(i).getLoc(),tabletext));
					 DRRHeaderTable1.addCell(new Phrase(""+ dctr.getListDRT().get(i).getPainScore(),tabletext)); */
					 
					 DRRHeaderTable1.addCell(new Phrase("" + (1),tabletext));
					 DRRHeaderTable1.addCell(new Phrase(""+ painScaleDTOList.get(i).getPainScaleDate(),tabletext));
					 DRRHeaderTable1.addCell(new Phrase(""+ painScaleDTOList.get(i).getAcute(),tabletext));
					 DRRHeaderTable1.addCell(new Phrase(""+ painScaleDTOList.get(i).getChronic(),tabletext));
					 DRRHeaderTable1.addCell(new Phrase(""+ painScaleDTOList.get(i).getLocation(),tabletext));
					 DRRHeaderTable1.addCell(new Phrase(""+ painScaleDTOList.get(i).getPainScale(),tabletext));
				
					 
					 DRRHeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
					 DRRHeaderTable1.addCell(new Phrase("",tabletext));
					 DRRHeaderTable1.addCell(new Phrase("",tabletext));
					 DRRHeaderTable1.addCell(new Phrase("",tabletext));
					 DRRHeaderTable1.addCell(new Phrase("",tabletext));
					 DRRHeaderTable1.addCell(new Phrase("",tabletext));
					 DRRHeaderTable1.addCell(new Phrase("",tabletext));
					 
						document.add(DRRHeaderTable1);
						DRRHeaderTable1.flushContent(); 

					}
				 } 
			

				//document.close();
				//outStream.flush();
				//outStream.close();
				
		
	 	}
	 
	  // Start all Data 
	      if(CallforPrint.equalsIgnoreCase("all")){
	    	  
	    	 
	    	  //start care plane in all print
	    	  if(carePlanDTO !=null){        	
	          	
	          	
	  			PdfPTable HeaderTable5c = new PdfPTable(2);
	  			int[] headerwidth5c = {30,70};
	  			HeaderTable5c.setWidths(headerwidth5c);
	  			HeaderTable5c.setWidthPercentage(95f);
	  			
	  			HeaderTable5c.addCell(new Phrase("Care Plan: ", tableheader));
	  			HeaderTable5c.addCell(new Phrase(""+carePlanDTO.getCarePlan(), tabletext));
	  		
	  			document.add(HeaderTable5c);
	  			HeaderTable5c.flushContent();
	          }
	    	  
	    	//end care plane in all print
	    	  
	    	  
	    // start all pain scale	  
	    if (painScaleDTOList != null) {
	  		
	  		PdfPTable DRRHeaderTable = new PdfPTable(1);
	  		int[] DRRHeaderWidth = { 50 };
	  		DRRHeaderTable.setWidths(DRRHeaderWidth);
	  		DRRHeaderTable.setWidthPercentage(95f);
	  		DRRHeaderTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  		PdfPTable DRRHeaderTable1 = new PdfPTable(6);
	  		int[] DRRHeaderWidth1 =  { 20, 22, 20, 30, 30,30};
	  		DRRHeaderTable1.setWidths(DRRHeaderWidth1);
	  		DRRHeaderTable1.setWidthPercentage(95f);
	  		DRRHeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	  			 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  			 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  			 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  			 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  			 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  			 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  		
	  			
	  			 document.add(DRRHeaderTable1);
	  			 DRRHeaderTable1.flushContent();
	  			
	  			
	  				
	  				DRRHeaderTable.addCell(new Phrase("Pain Scale :-",subheader));
	  				
	  				document.add(DRRHeaderTable);
	  				DRRHeaderTable.flushContent();
	  				
	  				 DRRHeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
	  				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  				 
	  	
	  				
	  				DRRHeaderTable1.addCell(new Phrase("#", subheader));
	  				DRRHeaderTable1.addCell(new Phrase("Date",subheader));
	  				DRRHeaderTable1.addCell(new Phrase("Acute",subheader));
	  				DRRHeaderTable1.addCell(new Phrase("Chronic", subheader));
	  				DRRHeaderTable1.addCell(new Phrase("Location", subheader));
	  				DRRHeaderTable1.addCell(new Phrase("Pain Scale", subheader));

	  				
	  				 DRRHeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  			
	  				document.add(DRRHeaderTable1);
	  				DRRHeaderTable1.flushContent();
	  				
	  				for(int i=0;i<painScaleDTOList.size();i++) {
	  				 DRRHeaderTable1.getDefaultCell().setBorder(
	  							Rectangle.NO_BORDER);
	  				 
	  				/*  DRRHeaderTable1.addCell(new Phrase("" + (i+ 1),tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase(""+ dctr.getListDRT().get(i).getDate(),tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase(""+ dctr.getListDRT().get(i).getAcute(),tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase(""+ dctr.getListDRT().get(i).getChronic(),tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase(""+ dctr.getListDRT().get(i).getLoc(),tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase(""+ dctr.getListDRT().get(i).getPainScore(),tabletext)); */
	  				 
	  				 DRRHeaderTable1.addCell(new Phrase("" + (1),tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase(""+ painScaleDTOList.get(i).getPainScaleDate(),tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase(""+ painScaleDTOList.get(i).getAcute(),tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase(""+ painScaleDTOList.get(i).getChronic(),tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase(""+ painScaleDTOList.get(i).getLocation(),tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase(""+ painScaleDTOList.get(i).getPainScale(),tabletext));
	  			
	  				 
	  				 DRRHeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
	  				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  				 DRRHeaderTable1.addCell(new Phrase("",tabletext));
	  				 
	  					document.add(DRRHeaderTable1);
	  					DRRHeaderTable1.flushContent(); 

	  				}
	  			 } 
	  		
		//end all painscale
	    	  
	    	  	PdfPTable HeaderTableName = new PdfPTable(1);
				int[] headerwidthName = {10};
				HeaderTableName.setWidths(headerwidthName);
				HeaderTableName.setWidthPercentage(95f);
				HeaderTableName.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				// start nurshing chart
				 HeaderTableName.addCell(new Phrase("Nurshing chart: ", subheader));
				 document.add(HeaderTableName);
				 HeaderTableName.flushContent();
				 
				 HeaderTableSpace.addCell(new Phrase("", tabletext));
	     		 HeaderTableSpace.addCell(new Phrase("", tabletext));
	   			document.add(HeaderTableSpace);
	   			HeaderTableSpace.flushContent();

	   			
				
							PdfPTable HeaderTableCh = new PdfPTable(5);
							int[] headerwidthCh = {5,5,5,5,5 };
							HeaderTableCh.setWidths(headerwidthCh);
							HeaderTableCh.setWidthPercentage(95f);
							HeaderTableCh.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							
								HeaderTableCh.addCell(new Phrase("#", subheader));
								HeaderTableCh.addCell(new Phrase("Time", subheader));
								HeaderTableCh.addCell(new Phrase("Heading Note", subheader));
								HeaderTableCh.addCell(new Phrase("Note", subheader));
								HeaderTableCh.addCell(new Phrase("Sign", subheader));
								
				           int index=1;
				        	 if(lstNurshingChart.size() > 0){
				        		 for(int i=0;i < lstNurshingChart.size();i++){
					        		 HeaderTableCh.addCell(new Phrase(""+index, tabletext));
					        		 HeaderTableCh.addCell(new Phrase(""+lstNurshingChart.get(i).getCheckUpdTime(), tabletext));
					        		 HeaderTableCh.addCell(new Phrase(""+lstNurshingChart.get(i).getHeadingName(), tabletext));
					        		 HeaderTableCh.addCell(new Phrase(""+lstNurshingChart.get(i).getNote(), tabletext));
					        		 HeaderTableCh.addCell(new Phrase(""+lstNurshingChart.get(i).getDoctorName(), tabletext));
					        		 index++;
					        	
				        		 }
				        	 }
				        	 document.add(HeaderTableCh);
				        	 HeaderTableCh.flushContent();
				
				        		HeaderTableSpace.addCell(new Phrase("", tabletext));
				        		HeaderTableSpace.addCell(new Phrase("", tabletext));
				      			document.add(HeaderTableSpace);
				      			HeaderTableSpace.flushContent();
				
				      			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

				      			
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			
				    			/* HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext));
				    			HeaderTable5.addCell(new Phrase("", tabletext)); */

				    			document.add(HeaderTable5);
				    			HeaderTable5.flushContent();
				    			
				    			


								// start nurshing chart
								HeaderTableName.addCell(new Phrase("Input: ", subheader));
								 document.add(HeaderTableName);
				 				HeaderTableName.flushContent();
				 
									 HeaderTableSpace.addCell(new Phrase("", tabletext));
	     							HeaderTableSpace.addCell(new Phrase("", tabletext));
	   									document.add(HeaderTableSpace);
	   								HeaderTableSpace.flushContent();
	   								
											PdfPTable HeaderTableIn = new PdfPTable(6);
											int[] headerwidthIn = {5,5,5,5,5,5};
											HeaderTableIn.setWidths(headerwidthIn);
											HeaderTableIn.setWidthPercentage(95f);
											HeaderTableIn.getDefaultCell().setBorder(Rectangle.NO_BORDER);
											
											HeaderTableIn.getDefaultCell().setBorder(Rectangle.BOTTOM);
											HeaderTableIn.addCell(new Phrase("", subheader));
											HeaderTableIn.addCell(new Phrase("", subheader));
											HeaderTableIn.addCell(new Phrase("", subheader));
											HeaderTableIn.addCell(new Phrase("", subheader));
											HeaderTableIn.addCell(new Phrase("", subheader));
											HeaderTableIn.addCell(new Phrase("", subheader));
											
												HeaderTableIn.addCell(new Phrase("#", subheader));
												HeaderTableIn.addCell(new Phrase("Time", subheader));
												HeaderTableIn.addCell(new Phrase("Chart Name", subheader));
												HeaderTableIn.addCell(new Phrase("Key", subheader));
												HeaderTableIn.addCell(new Phrase("value", subheader));
												HeaderTableIn.addCell(new Phrase("Unit", subheader));
												//document.add(HeaderTableIn);
												//HeaderTableIn.flushContent();
												
												HeaderTableIn.getDefaultCell().setBorder(Rectangle.BOTTOM);
												HeaderTableIn.addCell(new Phrase("", subheader));
												HeaderTableIn.addCell(new Phrase("", subheader));
												HeaderTableIn.addCell(new Phrase("", subheader));
												HeaderTableIn.addCell(new Phrase("", subheader));
												HeaderTableIn.addCell(new Phrase("", subheader));
												HeaderTableIn.addCell(new Phrase("", subheader));
												document.add(HeaderTableIn);
												HeaderTableIn.flushContent();
												
								           int countIn=1;
								           int tot=0;
								        	 if(inputObj.getLstChartInfo().size() > 0){
								        		 for(int i=0;i < inputObj.getLstChartInfo().size();i++){
									        		
								        			 PdfPTable Table1o = new PdfPTable(6);
														int[] width1o = { 14,14,14,14,14,14};
														Table1o.setWidths(width1o);
														Table1o.setWidthPercentage(95f);
														Table1o.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								        			 
														Table1o.addCell(new Phrase(""+countIn, tabletext));
														Table1o.addCell(new Phrase(""+inputObj.getLstChartInfo().get(i).getTime(), tabletext));
														Table1o.addCell(new Phrase(""+inputObj.getLstChartInfo().get(i).getcName(), tabletext));
														Table1o.addCell(new Phrase(""+inputObj.getLstChartInfo().get(i).getConstant(), tabletext));
														Table1o.addCell(new Phrase(""+inputObj.getLstChartInfo().get(i).getValue(), tabletext));
														Table1o.addCell(new Phrase(""+inputObj.getLstChartInfo().get(i).getUnit(), tabletext));
									        		 
														tot = tot+Integer.parseInt(inputObj.getLstChartInfo().get(i).getValue());
								        			 
								        			 
								        			countIn++;
								        			document.add(Table1o);
								        			Table1o.flushContent();
									        	
								        		 }
								        	 }
								        	 document.add(HeaderTableIn);
								        	 HeaderTableIn.flushContent();
								
								        		HeaderTableSpace.addCell(new Phrase("", tabletext));
								      			document.add(HeaderTableSpace);
								      			HeaderTableSpace.flushContent();
								
								      			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

								      			
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
								    			HeaderTable5.addCell(new Phrase("Total :", subheader));
								    			HeaderTable5.addCell(new Phrase(""+tot, subheader));
								    			HeaderTable5.addCell(new Phrase("", tabletext));

								    			document.add(HeaderTable5);
								    			HeaderTable5.flushContent();
								    			
								    			
								    			
								    			

								    			HeaderTableName.addCell(new Phrase("Output: ", subheader));
												 document.add(HeaderTableName);
								 				HeaderTableName.flushContent();
								 
													 HeaderTableSpace.addCell(new Phrase("", tabletext));
					     							HeaderTableSpace.addCell(new Phrase("", tabletext));
					   									document.add(HeaderTableSpace);
					   								HeaderTableSpace.flushContent();
												
												PdfPTable HeaderTableOut = new PdfPTable(6);
												int[] headerwidthout = {5,5,5,5,5,5};
												HeaderTableOut.setWidths(headerwidthout);
												HeaderTableOut.setWidthPercentage(95f);
												HeaderTableOut.getDefaultCell().setBorder(Rectangle.NO_BORDER);
												
												HeaderTableOut.getDefaultCell().setBorder(Rectangle.BOTTOM);
												HeaderTableOut.addCell(new Phrase("", subheader));
												HeaderTableOut.addCell(new Phrase("", subheader));
												HeaderTableOut.addCell(new Phrase("", subheader));
												HeaderTableOut.addCell(new Phrase("", subheader));
												HeaderTableOut.addCell(new Phrase("", subheader));
												HeaderTableOut.addCell(new Phrase("", subheader));
												document.add(HeaderTableOut);
												HeaderTableOut.flushContent();
												
												HeaderTableOut.addCell(new Phrase("#", subheader));
												HeaderTableOut.addCell(new Phrase("Time", subheader));
												HeaderTableOut.addCell(new Phrase("Chart Name", subheader));
												HeaderTableOut.addCell(new Phrase("Key", subheader));
												HeaderTableOut.addCell(new Phrase("value", subheader));
												HeaderTableOut.addCell(new Phrase("Unit", subheader));
												
												HeaderTableOut.getDefaultCell().setBorder(Rectangle.BOTTOM);
												/* HeaderTableOut.addCell(new Phrase("", subheader));
												HeaderTableOut.addCell(new Phrase("", subheader));
												HeaderTableOut.addCell(new Phrase("", subheader));
												HeaderTableOut.addCell(new Phrase("", subheader));
												HeaderTableOut.addCell(new Phrase("", subheader));
												HeaderTableOut.addCell(new Phrase("", subheader)); */
												document.add(HeaderTableOut);
												HeaderTableOut.flushContent();
													
									           int countOut=1;
									           int tot2=0;
									        	 if(OutputObj.getLstChartInfo().size() > 0){
									        		 for(int i=0;i <OutputObj.getLstChartInfo().size();i++){
										        		
									        			 PdfPTable Table1o = new PdfPTable(6);
															int[] width1o = { 14,14,14,14,14,14};
															Table1o.setWidths(width1o);
															Table1o.setWidthPercentage(95f);
															Table1o.getDefaultCell().setBorder(Rectangle.NO_BORDER);
									        			 
															Table1o.addCell(new Phrase(""+countOut, tabletext));
															Table1o.addCell(new Phrase(""+OutputObj.getLstChartInfo().get(i).getTime(), tabletext));
															Table1o.addCell(new Phrase(""+OutputObj.getLstChartInfo().get(i).getcName(), tabletext));
															Table1o.addCell(new Phrase(""+OutputObj.getLstChartInfo().get(i).getConstant(), tabletext));
															Table1o.addCell(new Phrase(""+OutputObj.getLstChartInfo().get(i).getValue(), tabletext));
															Table1o.addCell(new Phrase(""+OutputObj.getLstChartInfo().get(i).getUnit(), tabletext));
										        		 
															tot2 = tot2+Integer.parseInt(OutputObj.getLstChartInfo().get(i).getValue());
									        			 
									        			 
									        			 countOut++;
									        			 document.add(Table1o);
									        			 Table1o.flushContent();
										        	
									        		 }
									        	 }
									        	
									        	 	document.add(HeaderTableOut);
									        	 	HeaderTableOut.flushContent();
									        	 	
									        		HeaderTableSpace.addCell(new Phrase("", tabletext));
									      			document.add(HeaderTableSpace);
									      			HeaderTableSpace.flushContent();
									
									      			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

									      			
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
									    			HeaderTable5.addCell(new Phrase("Total :", subheader));
									    			HeaderTable5.addCell(new Phrase(""+tot2, subheader));
									    			HeaderTable5.addCell(new Phrase("", tabletext));

									    			document.add(HeaderTable5);
									    			HeaderTable5.flushContent();
									 
								 
									    			HeaderTableName.addCell(new Phrase("Intensivist: ", subheader));
													 document.add(HeaderTableName);
									 				HeaderTableName.flushContent();
									 
														 HeaderTableSpace.addCell(new Phrase("", tabletext));
						     							HeaderTableSpace.addCell(new Phrase("", tabletext));
						   									document.add(HeaderTableSpace);
						   								HeaderTableSpace.flushContent();
													
													PdfPTable HeaderTableInsiv = new PdfPTable(3);
													int[] headerwidthsiv = {5,5,5};
													HeaderTableInsiv.setWidths(headerwidthsiv);
													HeaderTableInsiv.setWidthPercentage(95f);
													HeaderTableInsiv.getDefaultCell().setBorder(Rectangle.BOX);
													
														HeaderTableInsiv.addCell(new Phrase("#", subheader));
														HeaderTableInsiv.addCell(new Phrase("Intensivist", subheader));
														HeaderTableInsiv.addCell(new Phrase("Sign", subheader));
														
														
										           int countIntsiv=1;
										        	 if(intobj.getLstChartReport().size() > 0){
										        		 for(int i=0;i <intobj.getLstChartReport().size();i++){
											        		 HeaderTableInsiv.addCell(new Phrase(""+countIntsiv, tabletext));
											        		 HeaderTableInsiv.addCell(new Phrase(""+intobj.getLstChartReport().get(i).getTime(), tabletext));
											        		 HeaderTableInsiv.addCell(new Phrase(""+intobj.getLstChartReport().get(i).getUserName(), tabletext));
											        		 countIntsiv++;
											        	
										        		 }
										        	 }
										        	 document.add(HeaderTableInsiv);
										        	 HeaderTableInsiv.flushContent();
										
										        		HeaderTableSpace.addCell(new Phrase("", tabletext));
										      			document.add(HeaderTableSpace);
										      			HeaderTableSpace.flushContent();
										
										      			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

										      			
										    			HeaderTable5.addCell(new Phrase("", tabletext));
										    			HeaderTable5.addCell(new Phrase("", tabletext));
										    			HeaderTable5.addCell(new Phrase("", tabletext));
										    			HeaderTable5.addCell(new Phrase("", tabletext));
										    			HeaderTable5.addCell(new Phrase("", tabletext));
										    			HeaderTable5.addCell(new Phrase("", tabletext));
										    			HeaderTable5.addCell(new Phrase("", tabletext));
										    			
										    			/* HeaderTable5.addCell(new Phrase("", tabletext));
										    			HeaderTable5.addCell(new Phrase("", tabletext));
										    			HeaderTable5.addCell(new Phrase("", tabletext));
										    			HeaderTable5.addCell(new Phrase("", tabletext));
										    			HeaderTable5.addCell(new Phrase("", tabletext));
										    			HeaderTable5.addCell(new Phrase("", tabletext));
										    			HeaderTable5.addCell(new Phrase("", tabletext)); */

										    			document.add(HeaderTable5);
										    			HeaderTable5.flushContent();
										    			
										    			
										    			

										    			HeaderTableName.addCell(new Phrase("Post Operation: ", subheader));
														 document.add(HeaderTableName);
										 				HeaderTableName.flushContent();
										 
															 HeaderTableSpace.addCell(new Phrase("", tabletext));
							     							HeaderTableSpace.addCell(new Phrase("", tabletext));
							   									document.add(HeaderTableSpace);
							   								HeaderTableSpace.flushContent();

														
														PdfPTable HeaderTableInout = new PdfPTable(3);
														int[] headerwidthpout = {5,5,5};
														HeaderTableInout.setWidths(headerwidthpout);
														HeaderTableInout.setWidthPercentage(95f);
														HeaderTableInout.getDefaultCell().setBorder(Rectangle.BOX);
														
															HeaderTableInout.addCell(new Phrase("#", subheader));
															HeaderTableInout.addCell(new Phrase("Post Operation hours", subheader));
															HeaderTableInout.addCell(new Phrase("Sign", subheader));
															
															
											           int countIntpost=1;
											        	 if(postobj.getLstChartReport().size() > 0){
											        		 for(int i=0;i < postobj.getLstChartReport().size();i++){
												        		 HeaderTableInout.addCell(new Phrase(""+countIntpost, tabletext));
												        		 HeaderTableInout.addCell(new Phrase(""+postobj.getLstChartReport().get(i).getTime(), tabletext));
												        		 HeaderTableInout.addCell(new Phrase(""+postobj.getLstChartReport().get(i).getUserName(), tabletext));
												        		 countIntpost++;
												        	
											        		 }
											        	 }
											        	 document.add(HeaderTableInout);
											        	 HeaderTableInout.flushContent();
											
											        		HeaderTableSpace.addCell(new Phrase("", tabletext));
											      			document.add(HeaderTableSpace);
											      			HeaderTableSpace.flushContent();
											
											      			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

											      			
											    			HeaderTable5.addCell(new Phrase("", tabletext));
											    			HeaderTable5.addCell(new Phrase("", tabletext));
											    			HeaderTable5.addCell(new Phrase("", tabletext));
											    			HeaderTable5.addCell(new Phrase("", tabletext));
											    			HeaderTable5.addCell(new Phrase("", tabletext));
											    			HeaderTable5.addCell(new Phrase("", tabletext));
											    			HeaderTable5.addCell(new Phrase("", tabletext));
											    			
											    			/* HeaderTable5.addCell(new Phrase("", tabletext));
											    			HeaderTable5.addCell(new Phrase("", tabletext));
											    			HeaderTable5.addCell(new Phrase("", tabletext));
											    			HeaderTable5.addCell(new Phrase("", tabletext));
											    			HeaderTable5.addCell(new Phrase("", tabletext));
											    			HeaderTable5.addCell(new Phrase("", tabletext));
											    			HeaderTable5.addCell(new Phrase("", tabletext)); */

											    			document.add(HeaderTable5);
											    			HeaderTable5.flushContent();
											    			
											    			
											    			
											    			HeaderTableName.addCell(new Phrase("Vitals: ", subheader));
															 document.add(HeaderTableName);
											 				HeaderTableName.flushContent();
											 
																 HeaderTableSpace.addCell(new Phrase("", tabletext));
								     							HeaderTableSpace.addCell(new Phrase("", tabletext));
								   									document.add(HeaderTableSpace);
								   								HeaderTableSpace.flushContent();
											    			

															
															PdfPTable HeaderTableIVital = new PdfPTable(26);
															int[] headerwidthvital = {5,10,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5};
															HeaderTableIVital.setWidths(headerwidthvital);
															HeaderTableIVital.setWidthPercentage(95f);
															HeaderTableIVital.getDefaultCell().setBorder(Rectangle.BOX);
															
																HeaderTableIVital.addCell(new Phrase("#", subheader));
																HeaderTableIVital.addCell(new Phrase("Name", subheader));
																HeaderTableIVital.addCell(new Phrase("8am", subheader));
																HeaderTableIVital.addCell(new Phrase("9am", subheader));
																HeaderTableIVital.addCell(new Phrase("10am", subheader));
																HeaderTableIVital.addCell(new Phrase("11am", subheader));
																HeaderTableIVital.addCell(new Phrase("12am", subheader));
																HeaderTableIVital.addCell(new Phrase("1pm", subheader));
																HeaderTableIVital.addCell(new Phrase("2pm", subheader));
																HeaderTableIVital.addCell(new Phrase("3pm", subheader));
																HeaderTableIVital.addCell(new Phrase("4pm", subheader));
																HeaderTableIVital.addCell(new Phrase("5pm", subheader));
																HeaderTableIVital.addCell(new Phrase("6pm", subheader));
																HeaderTableIVital.addCell(new Phrase("7pm", subheader));
																HeaderTableIVital.addCell(new Phrase("8pm", subheader));
																HeaderTableIVital.addCell(new Phrase("9pm", subheader));
																HeaderTableIVital.addCell(new Phrase("10pm", subheader));
																HeaderTableIVital.addCell(new Phrase("11pm", subheader));
																HeaderTableIVital.addCell(new Phrase("12pm", subheader));
																HeaderTableIVital.addCell(new Phrase("1am", subheader));
																HeaderTableIVital.addCell(new Phrase("2am", subheader));
																HeaderTableIVital.addCell(new Phrase("3am", subheader));
																HeaderTableIVital.addCell(new Phrase("4am", subheader));
																HeaderTableIVital.addCell(new Phrase("5am", subheader));
																HeaderTableIVital.addCell(new Phrase("6am", subheader));
																HeaderTableIVital.addCell(new Phrase("7am", subheader));
																
																
												           int countvital=1;
												        	 if(vitalDto.getLstChartReport().size() > 0){
												        		 for(int i=0;i < vitalDto.getLstChartReport().size();i++){
													        		 HeaderTableIVital.addCell(new Phrase(""+countvital, tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getCname(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm8(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm9(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm10(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm11(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm12(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm1(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm2(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm3(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm4(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm5(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm6(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm7(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm8(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm9(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm10(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm11(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getPm12(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm1(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm2(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm3(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm4(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm5(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm6(), tabletext));
													        		 HeaderTableIVital.addCell(new Phrase(""+vitalDto.getLstChartReport().get(i).getAm7(), tabletext));
													        		 countvital++;
													        	
												        		 }
												        	 }
												        	 
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
												        	 
												        	 
												        	 document.add(HeaderTableIVital);
												        	 HeaderTableIVital.flushContent();
												        	 
												        	 HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			
												    			/* HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext)); */

												    			document.add(HeaderTable5);
												    			HeaderTable5.flushContent();
												
												        		HeaderTableSpace.addCell(new Phrase("", tabletext));
												      			document.add(HeaderTableSpace);
												      			HeaderTableSpace.flushContent();
												      			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

												      			
												    			/* HeaderTable5.addCell(new Phrase("", tabletext));
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
												    			HeaderTable5.addCell(new Phrase("", tabletext)); */

												    			document.add(HeaderTable5);
												    			HeaderTable5.flushContent();
												 
												    			
												    		    // start Chemo Data
											                   // TreatmentNurshingService chemoService=(ApplicationContextUtils.getApplicationContext()).getBean(TreatmentNurshingService.class);
											                  //  List<OPDChemoTheropyDTO> listChemo= chemoService.getListOfChemoDetails(treatmentId, unitId) ;   
											                   HeaderTableName.addCell(new Phrase("ChemoTheropy: ", subheader));
															 document.add(HeaderTableName);
											 				HeaderTableName.flushContent();
											 
																 HeaderTableSpace.addCell(new Phrase("", tabletext));
								     							HeaderTableSpace.addCell(new Phrase("", tabletext));
								   									document.add(HeaderTableSpace);
								   								HeaderTableSpace.flushContent();
											                    if(listChemo.size() > 0){
											                    	PdfPTable HeaderTableChemo = new PdfPTable(6);
											    					int[] headerwidthChemo = {5,10,10,10,10,10};
											    					HeaderTableChemo.setWidths(headerwidthChemo);
											    					HeaderTableChemo.setWidthPercentage(95f);
											    					HeaderTableChemo.getDefaultCell().setBorder(Rectangle.BOX);
											    					
											    					HeaderTableChemo.addCell(new Phrase("#", subheader));
											    					HeaderTableChemo.addCell(new Phrase("Chemo Protocol", subheader));
											    					HeaderTableChemo.addCell(new Phrase("Start Time", subheader));
											    					HeaderTableChemo.addCell(new Phrase("Stop Time", subheader));
											    					HeaderTableChemo.addCell(new Phrase("Sign", subheader));
											    					HeaderTableChemo.addCell(new Phrase("Remark", subheader));
											    					int chemoIndex=1;
											    					for(int i=0; i < listChemo.size();i++){
											    						HeaderTableChemo.addCell(new Phrase(""+chemoIndex, tabletext));
											        					HeaderTableChemo.addCell(new Phrase(""+listChemo.get(i).getChemotherapyProtocol(), tabletext));
											        					HeaderTableChemo.addCell(new Phrase(""+listChemo.get(i).getStartTime(), tabletext));
											        					HeaderTableChemo.addCell(new Phrase(""+listChemo.get(i).getEndTime(), tabletext));
											        					HeaderTableChemo.addCell(new Phrase(""+listChemo.get(i).getSign(), tabletext));
											        					HeaderTableChemo.addCell(new Phrase(""+listChemo.get(i).getRemark(), tabletext));
											    					}
											    					document.add(HeaderTableChemo);
											    					HeaderTableChemo.flushContent();	
											    						
											                    }
											                    
											                	HeaderTableSpace.addCell(new Phrase("", tabletext));
												      			document.add(HeaderTableSpace);
												      			HeaderTableSpace.flushContent();
												      			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

												      			
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			
												    			/* HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext));
												    			HeaderTable5.addCell(new Phrase("", tabletext)); */

												    			document.add(HeaderTable5);
												    			HeaderTable5.flushContent();
											                    
											                  
											 //end Chemo Data
											 
										 
				    			
				    			
				 
	      }
	  //End All Data





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

				//if (labId == 1 || sponsorSlave > 0) {}else {}

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