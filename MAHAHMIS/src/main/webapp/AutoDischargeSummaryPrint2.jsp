<%@page import="com.hms.patient.util.OSValidator"%>
<%@page import="java.util.Calendar"%>
<%@page import="com.hms.TempEventHandlerIPDPDF"%>
<%@page import="com.hms.ipd.service.IPD_AutoSummaryService"%>
<%@page import="com.hms.administrator.service.ChannelHospitalMgmtService"%>
<%@page import="com.hms.administrator.dto.HospitalDetailsDTO"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.ehat.dto.PaymentModDto"%>
<%@page import="com.hms.rostermanagement.controller.SchedulerContoller"%>
<%@page import="com.hms.ehat.service.PaymentModService"%>
<%@page import="com.hms.opdbill.dto.PatientHeaderInfoDto"%>
<%@page import="com.hms.opdbill.service.OpdBillService"%>
<%@page import="com.hms.administrator.dto.Chanelling_doctor"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.rostermanagement.dto.ScheduleAppointmentsDTO"%>
<%@page import="com.hms.administrator.dto.CustomizeTemplate"%>
<%@page import="com.hms.ipd.controller.IPD_DischargeController"%>
<%@page import="com.hms.ot.dto.TreatmentOperations"%>
<%@page import="com.hms.ehat.controller.CpoeIPDdetails"%>
<%@page import="com.hms.dto.DischargeSummery"%>
<%@page import="com.hms.ehat.controller.DoctordeskController"%>
<%@page import="com.hms.dto.Assessment"%>
<%@page import="com.hms.ipd.controller.IPD_AutoSummaryController"%>
<%@page import="com.hms.ot.controller.OperationThController"%>
<%@page import="com.hms.ehat.dto.TreatmentDto"%>
<%@page import="com.hms.users.service.UsersService"%>
<%@page import="com.hms.users.serviceimpl.UsersServiceImpl"%>
<%@page import="com.hms.dto.Hall"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto"%>
<%@page import="com.hms.ipdbill.service.IpdBillService"%>
<%@page import="com.hms.ipd.controller.IPD_AutoSummaryController"%>
<%@page import="com.hms.ehat.dto.ServiceMasterDto"%>
<%@page import="com.hms.ehat.service.ServService"%>
<%@page import="com.hms.ehat.dto.BillNobleDto"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.ehat.dto.EhatBillPrefix"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.dto.DoctorDto"%>
<%@page import="com.hms.ehat.controller.MarkVisitController"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>

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
<%@ page import="com.hms.doctordesk.controller.OPDHistoryController"%>
<%@ page import="com.hms.doctordesk.service.OPDHistoryService"%>
<%@ page import="com.hms.doctordesk.dto.OPDHistoryMasterDTO"%>
<%@ page import="com.hms.doctordesk.dto.OPDHistorySlaveDTO"%>
<%@ page import="com.hms.doctordesk.controller.DiagonosisController"%>
<%@ page import="com.hms.doctordesk.service.DiagonosisService"%>
<%@ page import="com.hms.doctordesk.dto.DiagonosisMasterDto"%>
<%@ page import="com.hms.doctordesk.service.PrescriptionService"%>
<%@ page import="com.hms.doctordesk.dto.OPDPrescriptionDtoSP"%>
<%@ page import="com.hms.ehat.dto.EhatOTOperationNotes"%>
<%@ page import="com.hms.ot.service.OperationThService"%>
<%@page import="org.jsoup.Jsoup"%>
<%@page import="com.lowagie.text.html.simpleparser.StyleSheet"%>
<%@page import="com.lowagie.text.html.simpleparser.HTMLWorker"%>

<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.lowagie.text.pdf.PdfGState"%>
<%@page import="com.lowagie.text.pdf.GrayColor"%>
<%@page import="com.lowagie.text.pdf.Barcode128"%>
<%@page import="com.lowagie.text.pdf.ColumnText"%>
<%@page import="com.lowagie.text.pdf.PdfContentByte"%>
<%@page import="com.lowagie.text.PageSize"%>
<%@page import="com.lowagie.text.HeaderFooter"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>

<%@ page import="java.util.Date"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="com.lowagie.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.lowagie.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Auto DischargeSummaryPrint.jsp</title>
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
				//System.out.println("fontName======"+fontName);
				com.lowagie.text.FontFactory.register(fontName);
		
		String billPrint = (String) resource.getObject("billPrint").toString();
		String subobjWithComplaintAndFinding ="off";
		ResourceBundle resourceBundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalname = (String) resourceBundle.getObject("hospitalname").toString();
		//for centerpatientId
	    String patientId= resource.getObject("patientIdLabel").toString();
		
		
		
		Image img = null;
		PdfPCell cell = null;
		Image imgFQRcode=null;
		
		
		
       	String treatment_Id = request.getParameter("treatID");
		String patient_Id = request.getParameter("patID");
		String type = request.getParameter("type");
		String instructionLang = request.getParameter("langInstruction");
		String dischargedate=request.getParameter("dischargedate");
		String dischargeType=request.getParameter("discharge_Type");

		int treatmentId = Integer.parseInt(request.getParameter("treatID"));
		String  languageOF=request.getParameter("langInstruction");
		String  CallFromOPD=request.getParameter("callfrom");
		String  printTitle= "Discharge Summary "; //request.getParameter("printTitle");
		String  patientName=request.getParameter("patientName");
		//String idTreatment = request.getParameter("treatmentId");
		//String callFrom = request.getParameter("callFrom");
      String headerFlag="Yes";
      if(type.equalsIgnoreCase("DischargeSummaryWithoutHF")){
   	   headerFlag="No";
      }
		
		HttpSession session1 = request.getSession();
		Integer userId = (Integer) session1.getAttribute("userId");
		//Integer unitId = (Integer) session1.getAttribute("uId");
		request.setAttribute("headerFlag", headerFlag);
		request.setAttribute("covide", "No");
		request.setAttribute("pageIteration", 0);
		request.setAttribute("footerAddress", "");		
		request.setAttribute("printTitle", printTitle);
		
		String printType="DischargeSummery";
		request.setAttribute("printType", printType);
		//String user_name = (String) session1.getAttribute("userName");
		Integer unitId = (Integer) session1.getAttribute("uId");
		
		request.setAttribute("treatmentId", request.getParameter("treatID"));
		
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
		
		 String pid = "" + patient_Id;
			int pId = Integer.parseInt(patient_Id);
			int treatId = Integer.parseInt(treatment_Id);
			int emrId = 0;
			/* String strForPat = patientObject[0].substring(0,
					patientObject[0].length()); */
			RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
			List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
			ltRegMasterDto =us.fetchPatientsRecordByTreatmentId(Integer.parseInt(treatment_Id));
					
			String docId=ltRegMasterDto.get(0).getDoctorId();
		

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
			
		   // start code 
		   
		  // Start: part-1
				IPD_AutoSummaryController iauto=(ApplicationContextUtils.getApplicationContext()).getBean(IPD_AutoSummaryController.class);
				IPD_AutoSummaryController objTreatmentModel = new IPD_AutoSummaryController();
				TreatmentDto tobj = iauto
						.fetchPatientAdmissionNote(treatment_Id,patient_Id);
				List<TreatmentDto> admissionNotes = tobj.getListTreatment();
				
				// Start: part-1
				//Start table for 
				//fetch patient record
				 RegistrationController uss=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
				RegTreBillDto rtd = new RegTreBillDto();			
				List<RegTreBillDto> ltPatientRecord = null;
				String PType = "";
				String addressPatient = "";
				String refDocName  ="";
				String patientAdd = "";
				String perPatientAdd = "";
				String relativeName ="";
				int relationId=0;
				String relation="";
				 
				String per_patient_address ="";
				if(uss != null)
				{
					rtd=uss.fetchPatientsRecordByTreatmentId(treatId);
					
					rtd=rtd.getListRegTreBillDto().get(0);
					rtd.getPatientName();
					
					patientAdd=rtd.getAddress();
					if(rtd.getPerAddress()!=null){
						perPatientAdd=rtd.getPerAddress();
					}
					relativeName=rtd.getRelativeName();
					
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
					
					 int stateId = rtd.getStateId();
					 int townId   =rtd.getTownId();
					 int districtId =rtd.getDistrictId();
					 int talukaId   =rtd.getTalukaId();
					 int refDocId =rtd.getRefDocId();
					
					 
					 String BillCategoryName ="";
					 String state  ="";
					 String district  ="";
					 String cityObj  ="";
					 String taluka  ="";
					 String testName  ="";
					 
					 
					//For Permanant Address on 08-May-2018.
					 int perstateId = rtd.getPerstateId();
					 int pertownId   =rtd.getPertownId();
					 int perdistrictId =rtd.getPerdistrictId();
					 int pertalukaId   =rtd.getPertalukaId();
					 
					 String perstate  ="";
					 String perdistrict  ="";
					 String percityObj  ="";
					 String pertaluka  ="";
					 
					LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
					AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
					List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
					
			 
					if(stateId > 0 ){
						state   = fetchlist.getStringValOfObject("state","state_name",stateId,"idstate");
					}else{
						state   = "Maharashtra";
					}
					if(districtId > 0){
						district = fetchlist.getStringValOfObject("district","dis_name",districtId,"iddistrict"); 
					}else{
						district   = "Pune";
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
					
					if(cityObj != "0" && !cityObj.equals("undefined") && !cityObj.equals("")){
						addressPatient += cityObj;
					}
					
					if (taluka != "0" && !taluka.equals("undefined") && !taluka.equals("")) 
					{
						addressPatient +=  (", "+taluka);
					}						
					if (district != "0" && !district.equals("undefined") && !district.equals("")) 
					{
						addressPatient += (",  " + district);
					}
					if (state != "0" && !state.equals("undefined") && !state.equals("")) 
					{
						addressPatient += (", " + state);
					}
					if(refDocId > 0 ){
						refDocName   = fetchlist.getStringValOfObject("doctor","doc_name",refDocId,"Doctor_ID");
					}else{
						refDocName   = "";
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
					
					// Strat : permanant patient address
					if(percityObj != "0" && !percityObj.equals("undefined") && !percityObj.equals("")){
						per_patient_address += percityObj;
					}
					
					if (pertaluka != "0" && !pertaluka.equals("undefined") && !pertaluka.equals("")) 
					{
						per_patient_address +=  (" "+pertaluka);
					}						
					if (perdistrict != "0" && !perdistrict.equals("undefined") && !perdistrict.equals("")) 
					{
						per_patient_address += (" " + perdistrict);
					}
					if (perstate != "0" && !perstate.equals("undefined") && !perstate.equals("")) 
					{
						per_patient_address += ("," + perstate);
					}
					// end : permanant patient address
						
					System.err.println("permanant addressPatient..."+per_patient_address);
					
					int a=rtd.getSourceTypeId();
					if(a>0){
						PType="Sponsor";
		 			}else{
		 				PType="Self";					
					}	
				} 
				
				//new table no 2 start
				PdfPTable HeaderTable2 = new PdfPTable(2);
				int[] headerwidth2 = { 7,46};
				HeaderTable2.setWidths(headerwidth2);
				HeaderTable2.setWidthPercentage(95f);		
				
				HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				
				document.add(HeaderTable2);
				HeaderTable2.flushContent();
				//End table no 2 start
				
				int sponsorSlave=ltRegMasterDto.get(0).getChargesMasterSlaveId();
				
				
				
				
				
				 
				LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
				AutosuggestionService obj2=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
				List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();

				 String BillCategoryName ="";
				
				 String spLeafName  ="";
				if(sponsorSlave > 0){
					fetchsposor   = obj2.fetchSuperCatofchargesSlave(sponsorSlave);
					if(fetchsposor.size() >0){
						BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
						}
					spLeafName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id");
					//BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id"); 
				}else{
					BillCategoryName = "Self";
				}
				
				String weight  	= "";
				String height  	= "";
				
				if(ltRegMasterDto.size() >0){
					 weight  	=ltRegMasterDto.get(0).getWeight();
					 height  	=ltRegMasterDto.get(0).getHeight();
				}
				
				
				//new table no 3 start
				PdfPTable HeaderTable3 = new PdfPTable(5);
				int[] headerwidth3 = { 30,43,20,30,9};
				HeaderTable3.setWidths(headerwidth3);
				HeaderTable3.setWidthPercentage(95f);		
				
				HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
		

				IpdBillService fetchServlist=(ApplicationContextUtils.getApplicationContext()).getBean(IpdBillService.class);	
				
				BillNobleService fetchSubServlist=(ApplicationContextUtils.getApplicationContext()).getBean(BillNobleService.class);	
				
				List<EhatViewPatientBedDetailsIpdDto> listBedIpdDto2=fetchServlist.getPatientBedBill(treatId,3);
			
				//For Get Hall Name
				RegService regSer=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
				List<Hall> hallName = new ArrayList<Hall>();
				hallName = regSer.fetchPatientsBedRecords(treatId);
				
				//String bedHall = listBedIpdDto2.get(0).getBedHall();
				//System.out.println("---------"+bedHall);
				//String hallNameArr[] = bedHall.split("(");
				
				String dateactula=rtd.getCreatedDateTime().toString();
				Date date233 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(dateactula);
		      	String newstr = new SimpleDateFormat("dd/MM/yyyy, H:mm:ss").format(date233);
				
				
					PdfPTable twoPT = new PdfPTable(2);
					int[] widthInst = { 30,70 };
					twoPT.setWidths(widthInst);
					twoPT.setWidthPercentage(95f);
					twoPT.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					
					
				
				document.add(HeaderTable3);
				HeaderTable3.flushContent();			
				//End table no 3 start
				

				// End: part-1
				PdfPTable HeaderTable31 = new PdfPTable(1);
				int[] headerwidth31 = { 120 };
				HeaderTable31.setWidths(headerwidth31);
				HeaderTable31.setWidthPercentage(95f);
				HeaderTable31.getDefaultCell().setBorder(Rectangle.BOTTOM);
				
				//HeaderTable31.addCell(new Phrase("", tabletext));
				document.add(HeaderTable31);
				HeaderTable31.flushContent();
				
				// // Start: Part-2
				PdfPTable subHeaderTable = new PdfPTable(1);
				int[] AdmissionNoteHeaderWidth = { 20 };
				subHeaderTable.setWidths(AdmissionNoteHeaderWidth);
				subHeaderTable.setWidthPercentage(95f);
				subHeaderTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				PdfPTable paraTable = new PdfPTable(2);
				int[] paraWidth = { 25,75 };
				paraTable.setWidths(paraWidth);
				paraTable.setWidthPercentage(95f);
				paraTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				String notes = admissionNotes.get(0).getNotes();
				if (notes == "" || notes == null
						|| notes == "undefined") {
					if (notes.length() != 0) {

						for (int i = 0; i < notes.length(); i++) {

							if (i == 0) {

								String s = "<p>";
								String s1 = "</p>";
								if (notes.contains(s)
										&& notes.contains(s1)) {
									notes = notes
											.replace("<p>", "");
									notes = notes
											.replace("</p>", "");
								}
								paraTable.addCell(new Phrase(""
										+ notes, tabletext));

							} else {
								String s = "<p>";
								String s1 = "</p>";
								if (notes.contains(s)
										&& notes.contains(s1)) {
									notes = notes
											.replace("<p>", "");
									notes = notes
											.replace("</p>", "");
								}
								paraTable.addCell(new Phrase("          "
										+ notes, tabletext));

							}

						}

					} else {
						paraTable.addCell(new Phrase("", tabletext));
					}

					document.add(paraTable);
					paraTable.flushContent();
				} else {
					PdfPTable HeaderTable32 = new PdfPTable(2);
					int[] headerwidth32 = { 20, 100 };
					HeaderTable32.setWidths(headerwidth32);
					HeaderTable32.setWidthPercentage(95f);
					HeaderTable32.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					
					PdfPTable twoPTT = new PdfPTable(2);
					int[] widthInstt = { 20, 80 };
					twoPTT.setWidths(widthInstt);
					twoPTT.setWidthPercentage(95f);
					twoPTT.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					HTMLWorker htmlWorker = new HTMLWorker(document);
					Paragraph paragraph = new Paragraph();
					paragraph.setFont(tabletext);
					StyleSheet styleSheet = new StyleSheet();
					styleSheet.loadTagStyle("body", "size", "9pt");
					styleSheet.loadTagStyle("p", "size", "8pt");

					twoPTT.addCell(new Phrase("", subheader));
					twoPTT.addCell(new Phrase("", tabletext));

					document.add(twoPTT);
					twoPTT.flushContent();
					
					
					
					
				java.util.List<Element> ie = HTMLWorker.parseToList(
						new StringReader(notes), styleSheet);


/* 				twoPTT.addCell(new Phrase("Admission Note:", subheader));
				twoPTT.addCell(new Phrase("", tabletext)); */
				document.add(twoPTT);
				twoPTT.flushContent();
				
				for (Element element : ie) {
					//paragraph.add(element);
					if (element instanceof PdfPTable) {
						PdfPTable htmlTable = new PdfPTable(1);
						int[] htmlTableWidth = { 50 };
						htmlTable.setWidths(htmlTableWidth);
						htmlTable.setWidthPercentage(50f);
						htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						htmlTable = (PdfPTable) element;
						paraTable.addCell(new Phrase("Admission Note:", subheader));
						paraTable.addCell(htmlTable);

						
						document.add(paraTable);
						paraTable.flushContent();
					} else {
						paragraph.add(element);
						cell = new PdfPCell(paragraph);
						cell.setBorder(Rectangle.NO_BORDER);
						paraTable.addCell(new Phrase("Admission Note:", subheader));
						paraTable.addCell(cell);

						document.add(paraTable);
						paraTable.flushContent();
						paragraph.clear();
					}
						}
				String subobjdata = paragraph.toString();
				subobjdata = subobjdata.substring(1, subobjdata.length() - 1);
				
				subobjdata = subobjdata.replace(",", "");
								
				HeaderTable32.addCell(new Phrase("" , subheader));
				HeaderTable32.addCell(new Phrase("" + subobjdata, tabletext));
				
				HeaderTable32.addCell(new Phrase("" , tabletext));
				HeaderTable32.addCell(new Phrase("" , tabletext));
				
				//HeaderTable32.addCell(new Phrase("Impressions", subheader));
				//HeaderTable32.addCell(new Phrase("" + ObjList.getImpressions(), tabletext));
				document.add(HeaderTable32);
				HeaderTable32.flushContent();
					
					/* subHeaderTable.addCell(new Phrase("Admission Note : ",subheader));
					document.add(subHeaderTable);
					subHeaderTable.flushContent();

					
					java.util.List<Element> ie = HTMLWorker.parseToList(
							new StringReader("              "
									+ notes), styleSheet);
				
					for (Element element : ie) {
						paragraph.add(element);
						paragraph.add(new Paragraph("",tabletext));
					}
					cell = new PdfPCell(paragraph);
					cell.setBorder(Rectangle.NO_BORDER);
					paraTable.addCell(cell); 

					document.add(paraTable);
					paraTable.flushContent();*/

				}
			//	HeaderTable31.addCell(new Phrase("", tabletext));
			
				HeaderTable31.addCell(new Phrase("", tabletext));
				document.add(HeaderTable31);
				HeaderTable31.flushContent();
				// Start: Part-3
				// START: assesment
				int tid = Integer.parseInt(treatment_Id);
				/* OperationThController treatmentModel=(ApplicationContextUtils.getApplicationContext()).getBean(OperationThController.class);
				Assessment listasses = treatmentModel.fetchAssessment(tid);
				List<Assessment> listasses1 = listasses.getAssessmentList(); */
				
				IPD_AutoSummaryService Asummary=(ApplicationContextUtils.getApplicationContext()).getBean(IPD_AutoSummaryService.class);
				List<DiagonosisMasterDto> listasses1 = Asummary.getListOfDiagoList(tid);
				//List<Assessment> listasses1 = listasses.getAssessmentList();

				if (listasses1.size() != 0) {
					
					PdfPTable HeaderTable5 = new PdfPTable(2);
					int[] headerwidth5 = { 20, 80 };
					HeaderTable5.setWidths(headerwidth5);
					HeaderTable5.setWidthPercentage(95f);
					HeaderTable5.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable5.addCell(new Phrase("", header));
					HeaderTable5.addCell(new Phrase("", header));

					document.add(HeaderTable5);
					HeaderTable5.flushContent();

					for (int i = 0; i < listasses1.size(); i++) {

						if (listasses1.get(i).getDiagnoType()
								.equalsIgnoreCase("Confirmed")) {

							HeaderTable5.addCell(new Phrase(
									"Confirmed Diagnosis :", subheader));
							HeaderTable5.addCell(new Phrase(""
									+ ((listasses1.get(i).getDiagoName()) +","+ (listasses1.get(i).getDiagndesc())
									+","+ (listasses1.get(i).getIcd10_code()) +","+ (listasses1.get(i).getDate())
									+","+ (listasses1.get(i).getDiagnoType()) +","+ (listasses1.get(i).getDignosisBy())
									+","+ (listasses1.get(i).getComment())),
									tabletext));
						}
						
						

						if (listasses1.get(i).getDiagnoType()
								.equalsIgnoreCase("Provisional")) {

							HeaderTable5.addCell(new Phrase(
									"Provisional Diagnosis :", subheader));
							HeaderTable5.addCell(new Phrase(""
									+ ((listasses1.get(i).getDiagoName()) +","+ (listasses1.get(i).getDiagndesc())
									+","+ (listasses1.get(i).getIcd10_code()) +","+ (listasses1.get(i).getDate())
									+","+ (listasses1.get(i).getDiagnoType()) +","+ (listasses1.get(i).getDignosisBy())
									+","+ (listasses1.get(i).getComment())),
									tabletext));
						}
					}

					
					document.add(HeaderTable5);
					HeaderTable5.flushContent();

					HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable5.addCell(new Phrase("", header));
					HeaderTable5.addCell(new Phrase("", header));
					document.add(HeaderTable5);
					HeaderTable5.flushContent();

				}
				// END: assesment
				
				// Start: Part-5
				IPD_AutoSummaryController objIPDTreatmentModel=(ApplicationContextUtils.getApplicationContext()).getBean(IPD_AutoSummaryController.class);
				DischargeSummery ds = objIPDTreatmentModel
						.fetchAutoDischargeSummery(treatment_Id);
				List<DischargeSummery> dsList = ds.getDsList();
				int count=0;
				if (dsList != null && dsList.size() != 0
						&& dsList.size() > 0) {
					for(int i = 0; i < dsList.size(); i++){
					if(dsList.get(i).getPre_symptoms() != null  && 
							!dsList.get(i).getPre_symptoms().equals("") &&
						   !dsList.get(i).getPre_symptoms().equals("undefined"))
					 {
						count++;
						twoPT.addCell(new Phrase("Presenting Symptoms :",subheader));
						twoPT.addCell(new Phrase("" + dsList.get(i).getPre_symptoms(),tabletext));
						
						document.add(twoPT);
						twoPT.flushContent(); 
					 }
					 
					}
					for(int i = 0; i < dsList.size(); i++){
						if(dsList.get(i).getClinical_finding() != null 
							&& !dsList.get(i).getClinical_finding().equals("") 
							&& !dsList.get(i).getClinical_finding().equals("undefined"))
					 {
							count++;	
						 twoPT.addCell(new Phrase("Clinical Findings :",subheader));
						 twoPT.addCell(new Phrase("" + dsList.get(i).getClinical_finding(),tabletext));
						 
						 document.add(twoPT);
						 twoPT.flushContent();
					 }
						 

					 } 
					 for(int i = 0; i < dsList.size(); i++){
						 if (dsList.get(i).getSpl_investigation() != null
									&& !dsList.get(i).getSpl_investigation().equals("undefined")
									&& !dsList.get(i).getSpl_investigation().equals(""))
						 {
							 count++;
							twoPT.addCell(new Phrase("Special Investigation :", subheader));
							twoPT.addCell(new Phrase("" + dsList.get(i).getSpl_investigation(), tabletext));
							
							 document.add(twoPT);
							 twoPT.flushContent();
						 }
						
					 }
					for(int i = 0; i < dsList.size(); i++){
					if (dsList.get(i).getRisk() != null
							&& !dsList.get(i).getRisk().equals("undefined")
							&& !dsList.get(i).getRisk().equals(""))
					{
						count++;
						twoPT.addCell(new Phrase("Risk Factors :",subheader));
						twoPT.addCell(new Phrase("" + dsList.get(i).getRisk(), tabletext));
					}
						document.add(twoPT);
						twoPT.flushContent();

					}
					for(int i = 0; i < dsList.size(); i++){
					if (dsList.get(i).getComplications() != null
							&& !dsList.get(i).getComplications().equals("undefined")
							&& !dsList.get(i).getComplications().equals(""))
					{
						count++;
						twoPT.addCell(new Phrase("Complications :", subheader));
						twoPT.addCell(new Phrase("" + dsList.get(0).getComplications(), tabletext));
						
						document.add(twoPT);
						twoPT.flushContent();
					}
						
					}
					for(int i = 0; i < dsList.size(); i++){
					if (dsList.get(i).getTreatmentGiven() != null
							&& !dsList.get(i).getTreatmentGiven().equals("undefined")
							&& !dsList.get(i).getTreatmentGiven().equals(""))
					{
						count++;
						twoPT.addCell(new Phrase("Treatment Given :", subheader));
						twoPT.addCell(new Phrase("" +dsList.get(i).getTreatmentGiven() , tabletext));
						
						document.add(twoPT);
						twoPT.flushContent();
						
						
					}
					
					
					
					}
					
					
				}
			if(count!=0){	
				HeaderTable31.addCell(new Phrase("", tabletext));
				document.add(HeaderTable31);
				HeaderTable31.flushContent();
			}
				

				// Start: Part-12 Investigation	
				DoctordeskController objPathologyModel=(ApplicationContextUtils.getApplicationContext()).getBean(DoctordeskController.class);
				CpoeIPDdetails TestDashboard = objPathologyModel
						.fetchipddetailsdrdesknew(tid,pid,request);
				List<CpoeIPDdetails> TestDashboardList = TestDashboard.getCpoeServdetails();
				
				if (TestDashboardList != null
						&& TestDashboardList.size() > 0
						&& TestDashboardList.size() != 0) {
					for (int z = 0; z < TestDashboardList.size(); z++) {
						twoPT.addCell(new Phrase("Test Details:",subheader));
						twoPT.addCell(new Phrase("" + (TestDashboardList.get(z).getCategoryName()
								+","+ TestDashboardList.get(z).getCreated_date_time()
								+","+ TestDashboardList.get(z).getClinical_notes()
								+","+ TestDashboardList.get(z).getServicename()
								),
								tabletext));
						
						document.add(twoPT);
						twoPT.flushContent();
					}
					
					HeaderTable31.addCell(new Phrase("", tabletext));
					document.add(HeaderTable31);
					HeaderTable31.flushContent();
				}
				
				// Start: Part-12 Operation Note 

				TreatmentOperations objtrop = new TreatmentOperations();
				objtrop.setTreatment_ID(Integer.parseInt(treatment_Id));
				objtrop.setPatientId(Integer.parseInt(patient_Id));
				
				IPD_DischargeController objOperationModel=(ApplicationContextUtils.getApplicationContext()).getBean(IPD_DischargeController.class);
				TreatmentOperations op = objOperationModel
						.fetchOperationsData(treatment_Id,patient_Id);
				List<TreatmentOperations> oplist = op.getListtreatmentoperation();
				if (oplist != null && oplist.size() != 0
						&& oplist.size() > 0) {
					if (oplist.get(0).getFinding() != ""
							&& oplist.get(0).getFinding() != null
							&& oplist.get(0).getFinding() != "undefined"
							&& !oplist.get(0).getFinding().equals("")) {
						twoPT.addCell(new Phrase("Operation Note :", subheader));
						twoPT.addCell(new Phrase("" + oplist.get(0).getFinding(), tabletext));
						
						document.add(twoPT);
						twoPT.flushContent();
					}
				}

				if (dsList.size() > 0) {
					// Start: Part-12 Condition At Discharge
					if (dsList.get(0).getConditionAtDischarge() != null
							&& !dsList.get(0).getConditionAtDischarge()
									.equals("undefined")
							&& !dsList.get(0).getConditionAtDischarge()
									.equals("")) {
						twoPT.addCell(new Phrase("Condition At Discharge :", subheader));
						twoPT.addCell(new Phrase("" + dsList.get(0).getConditionAtDischarge(), tabletext));
						
						document.add(twoPT);
						twoPT.flushContent();
					}
				}
				
				
				
				//cause of death start	
					if (dsList.get(0).getPrimaryCOD() != null || dsList.get(0).getSecondaryCOD() != null
							|| dsList.get(0).getSignificantCondition() != null) {
						if (dsList.get(0).getPrimaryCOD() != null && !dsList.get(0).getPrimaryCOD().equals("-")) {
							twoPT.addCell(new Phrase("Primary Cause of Death :", subheader));
							twoPT.addCell(new Phrase("" + dsList.get(0).getPrimaryCOD(), tabletext));
						}
						if (dsList.get(0).getSecondaryCOD() != null
								&& !dsList.get(0).getSecondaryCOD().equals("-")) {
							twoPT.addCell(new Phrase("Secondary Cause of Death :", subheader));

							twoPT.addCell(new Phrase("" + dsList.get(0).getSecondaryCOD(), tabletext));
						}
						if (dsList.get(0).getSignificantCondition() != null
								&& !dsList.get(0).getSignificantCondition().equals("-")) {
							twoPT.addCell(new Phrase("Other Significant Conditions of Death :", subheader));
							twoPT.addCell(new Phrase("" + dsList.get(0).getSignificantCondition(), tabletext));
						}
						document.add(twoPT);
						twoPT.flushContent();
					}
					
					//cause of death end
				//HeaderTable31.addCell(new Phrase("", tabletext));
				document.add(HeaderTable31);
				HeaderTable31.flushContent();
				
				// Start: Part-11 Previous Treatment 
				
				PdfPTable twoPT1 = new PdfPTable(3);
				int[] widthInst1 = {30,80,40 };
				twoPT1.setWidths(widthInst1);
				twoPT1.setWidthPercentage(95f);
				twoPT1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				java.util.Calendar current_Date = java.util.Calendar
						.getInstance();
				SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
				String currDate = format.format(current_Date.getTime());
				String treatID = request.getParameter("treatID");
				//IPDTreatmentModel objIPDTreatment = new IPDTreatmentModel();
			//	List<Order_master> orderMasterli = new ArrayList<Order_master>();
				/* orderMasterli = objIPDTreatment.featchOrderFormByDate(
						currDate, treatID, "previous"); */
				//   orderMasterli = objIPDTreatment.featchOrderFormByDate(
				//				currDate, treatID, "previousAuto");
				// Start: Part-12 Treatment at Discharge
			//	List<Order_comp_druges> order_comp_drugesli = new ArrayList<Order_comp_druges>();
				//int tid = Integer.parseInt(treatID);
			//	order_comp_drugesli = objIPDTreatment
			//			.fetchTreatmentAtDischrageOrder_comp_druges(tid);
			//	if (order_comp_drugesli.size() != 0) {
					
					/* String osName = System.getProperty("os.name");
					if (osName.equalsIgnoreCase("Linux")) {
						FontFactory.register("/usr/share/fonts/custom/SHIV05.TTF");
					} else {
						FontFactory.register("C:/Windows/Fonts/Shiv05.ttf");
					} */
					/* twoPT1.addCell(new Phrase("Treatment at Discharge : ", subheader));
					twoPT1.addCell(new Phrase("", subheader));
					twoPT1.addCell(new Phrase("", tabletext));
					document.add(twoPT1);
					twoPT1.flushContent(); */
				/* 	for (int m = 0; m < order_comp_drugesli.size(); m++) {
						twoPT1.addCell(new Phrase("", tabletext));

						String English = order_comp_drugesli.get(m).getInstruction().split("/")[0];
						String Marathi = order_comp_drugesli.get(m).getInstruction().split("/")[1];//jitendra
						twoPT1.addCell(new Phrase("" + (order_comp_drugesli.get(m).getDruges_doses()
								+","+ order_comp_drugesli.get(m).getPrepName()
								+","+ order_comp_drugesli.get(m).getDays()
								),tabletext));
						if(instructionLang.equalsIgnoreCase("ENGLISH")){
						twoPT1.addCell(new Phrase(""+ English,tabletext));
						}else if(instructionLang.equalsIgnoreCase("MARATHI")){
							twoPT1.addCell(new Phrase(""+Marathi,FontFactory.getFont("Shivaji05", 10)));
						}
					} */
					
					//document.add(twoPT1);
					//twoPT1.flushContent();
				//}

				document.add(new Paragraph("\n"));
				
				
				
		//		if (orderMasterli.size() != 0) {
					
					/* twoPT1.addCell(new Phrase("Previous Treatment  : ", subheader));
					twoPT1.addCell(new Phrase("", subheader));
					twoPT1.addCell(new Phrase("", subheader)); */
					
/* 					for (int k = 0; k < orderMasterli.size(); k++) {
						Order_master objOrder_comp_druges = orderMasterli
								.get(k);

						String osName = System.getProperty("os.name");
						if (osName.equalsIgnoreCase("Linux")) {
							FontFactory.register("/usr/share/fonts/custom/SHIV05.TTF");
						} else {
							FontFactory.register("C:/Windows/Fonts/Shiv05.ttf");
						}
						
						for (int m = 0; m < objOrder_comp_druges
								.getOrder_comp_drugesList().size(); m++) {
							
							String English = objOrder_comp_druges.getOrder_comp_drugesList().get(m).getInstruction();
							String Marathi = objOrder_comp_druges.getOrder_comp_drugesList().get(m).getMarathiInstruction();
							
						if (k == 0) {
							
							twoPT1.addCell(new Phrase("", subheader));
							twoPT1.addCell(new Phrase("" + ((objOrder_comp_druges.getOrder_comp_drugesList().get(m).getDruges_doses())
									+","+ objOrder_comp_druges.getOrder_comp_drugesList().get(m).getPrepName()		
									+","+ objOrder_comp_druges.getOrder_comp_drugesList().get(m).getDays() + " " + "day"
									), tabletext));
							
							
							if(instructionLang.equalsIgnoreCase("ENGLISH")){
							twoPT1.addCell(new Phrase("" + English, tabletext));
							}else if(instructionLang.equalsIgnoreCase("MARATHI")){
								twoPT1.addCell(new Phrase(""+ Marathi,FontFactory.getFont("Shivaji05", 10)));
							 }
							}else{
								
								twoPT1.addCell(new Phrase("", subheader));
								twoPT1.addCell(new Phrase(""+ ((objOrder_comp_druges.getOrder_comp_drugesList().get(m).getDruges_doses())
										+","+ objOrder_comp_druges.getOrder_comp_drugesList().get(m).getPrepName()		
										+","+ objOrder_comp_druges.getOrder_comp_drugesList().get(m).getDays() + " " + "day"
										), tabletext));
								if(instructionLang.equalsIgnoreCase("ENGLISH")){
								twoPT1.addCell(new Phrase("" + English, tabletext));
								}else if(instructionLang.equalsIgnoreCase("MARATHI")){
									  twoPT1.addCell(new Phrase(""+ Marathi,FontFactory.getFont("Shivaji05", 10)));
								  }
								}
						}
						
						
					} */
					
					/* twoPT1.addCell(new Phrase("", subheader));
					twoPT1.addCell(new Phrase("", tabletext));
					twoPT1.addCell(new Phrase("", tabletext)); */

					document.add(twoPT1);
					twoPT1.flushContent(); 
				
		//		}
				//HeaderTable31.addCell(new Phrase("", tabletext));
				document.add(HeaderTable31);
				HeaderTable31.flushContent();
				
				
				
				//Start Advised Treatment
				
			//		twoPT.addCell(new Phrase("Advised on Discharge :", subheader));
				//		twoPT.addCell(new Phrase("" + dsList.get(0).getAdvisedOnDischarge(), tabletext));
						
						  if(dsList.size() > 0 && (dsList.get(0).getAdvisedOnDischarge()) != null && (null != dsList.get(0).getAdvisedOnDischarge()) && (  dsList.get(0).getAdvisedOnDischarge() != "")){
                     		twoPT.getDefaultCell().setBorder(Rectangle.BOTTOM);
                           	twoPT.addCell(new Phrase("Advised On Discharge :", subheader));
    						twoPT.addCell(new Phrase("" + dsList.get(0).getAdvisedOnDischarge(), tabletext));
                          }else{
                           	twoPT.addCell(new Phrase("", tableheader));
    						twoPT.addCell(new Phrase("", tabletext));
                          }
					
						  twoPT.addCell(new Phrase("", tabletext));
						  //twoPT.addCell(new Phrase("", tabletext));
						  	
						twoPT.getDefaultCell().setBorder(Rectangle.BOTTOM);
							  
						/* 	List<CustomizeTemplate> customize = admodel1.fetchCKEditorDocterDesk1(request.getParameter("treatID"));
							
							for(CustomizeTemplate customize1 : customize)
							{
							  
						 //	twoPT.addCell(new Phrase("Clinical Evalution :  ", subheader));
						 	
						 	String str=customize1.getTemp_data().replaceAll("<p>", "");
						 	String finalStr=str.replaceAll("</p>", "");
						 	
							//twoPT.addCell(new Phrase(""+finalStr, tabletext));
							} */	
						
						document.add(twoPT);
						twoPT.flushContent();
						
						PdfPTable HeaderTable41 = new PdfPTable(1);
						int[] headerwidth41 = { 100 };
						HeaderTable41.setWidths(headerwidth41);
						HeaderTable41.setWidthPercentage(95f);
						HeaderTable41.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						
					// start next follow up on : added by ajay:04-09-2019//
					/* SchedulerContoller schedular=(ApplicationContextUtils.getApplicationContext()).getBean(SchedulerContoller.class);
						ScheduleAppointmentsDTO patAppointment = schedular.fetchFollowUpList(request);
						List<ScheduleAppointmentsDTO> patAppointmentList = patAppointment.getListAppointmet();
						
						if (patAppointmentList.size() != 0 ) {
							ScheduleAppointmentsDTO appointment = (ScheduleAppointmentsDTO) patAppointmentList.get(0);
							HeaderTable41.addCell(new Phrase("Next follow up on: "+appointment.getApptDate(),subheader));
						} else {
							HeaderTable41.addCell(new Phrase("", subheader));

						} */	
					// end next follow up on //
					
					
						HeaderTable41.addCell(new Phrase("", subheader));
						if(hospitalname.equalsIgnoreCase("rising") ){
							HeaderTable41.addCell(new Phrase("", subheader));
							//HeaderTable41.addCell(new Phrase("\n\n\n\n"+" In any emergency :If above warning symptoms or signs occurs or condition of patient deteriorates/worsen please contact casual ty department of rising medicare hospital Contact No:8390275551", tabletext));
						}else{
							HeaderTable41.addCell(new Phrase("", subheader));
						}
						
						 String marathi ="Aap%kalaIna pirisqatIt kRpyaa yaa naMbarvar saMpk- saaQaavaa ¹ 020¹67311200 ikMvaa 7350314444º";  

						if(hospitalname.equalsIgnoreCase("vatsalya") ){
							HeaderTable41.addCell(new Phrase("\n\n\n\n"+" IN CASE OF EMERGENCY,PLEASE CONTACT ON THIS NUMBER - 020-67311200 OR 7350314444", tabletext));
							HeaderTable41.addCell(new Phrase(""+marathi,FontFactory.getFont("Shivaji05", 10)));
						}else{
							HeaderTable41.addCell(new Phrase("", subheader));
						}
						
						
						document.add(HeaderTable41);
						HeaderTable41.flushContent();
						
				//End 		
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