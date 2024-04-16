<%@page import="com.hms.doctordesk.dto.OPDPrescriptionFolloUpDto"%>
<%@page import="com.hms.TempEventHandlerIPDDischargePDF"%>
<%@page import="com.hms.patient.util.OSValidator"%>
<%@page import="com.hms.ipd.nurshing.dto.TreatmentDischargeDto"%>
<%@page import="java.util.Arrays"%>
<%@page import="java.util.Calendar"%>
<%@page import="com.hms.TempEventHandlerIPDPDF"%>
<%@page import="com.hms.TempEventHandlerPalvePDF"%>
<%@page import="com.hms.ipd.service.IPD_AutoSummaryService"%>
<%@page import="com.hms.doctordesk.dto.OPDPrescriptionDtoSP"%>
<%@page import="com.hms.doctordesk.service.PrescriptionService"%>
<%@page import="com.hms.ipd.dto.DoctorRoundSlaveDTO"%>
<%@page import="com.hms.ipd.dto.DoctorRoundDTO"%>
<%@page import="com.hms.ipd.service.IPDHistoryService"%>
<%@page import="com.hms.ipd.controller.IPD_AutoSummaryController"%>
<%@page import="com.hms.ipd.nurshing.dto.TreatmentDischargeDto"%>
<%@page import="com.hms.ipd.nurshing.service.TreatmentDischargeService"%>
<%@page
	import="com.hms.ipd.nurshing.controller.TreatmentDischargeController"%>
<%@page import="com.hms.ipd.service.IPDDischargeSumService"%>
<%@page import="com.hms.doctordesk.dto.OPDHistoryMasterDTO"%>
<%@page import="com.hms.doctordesk.service.OPDHistoryService"%>
<%@page import="com.hms.doctordesk.controller.OPDHistoryController"%>
<%@page import="com.hms.ehat.dto.TreatmentDto"%>
<%@page import="com.hms.ehat.dto.RegistrationDto"%>
<%@page import="com.hms.doctordesk.dto.OPDAllergyAlertsDto"%>
<%@page import="com.hms.doctordesk.dto.OPDClinicalEvaluationDto"%>
<%@page import="com.hms.doctordesk.service.OPDClinicalEvaluationService"%>
<%@page import="com.hms.doctordesk.dto.DiagonosisMasterDto"%>
<%@page import="com.hms.doctordesk.service.DiagonosisService"%>
<%@page import="com.hms.doctordesk.controller.DiagonosisController"%>
<%@page
	import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.ehat.dto.EhatOTOperationNotes"%>
<%@page import="com.hms.ot.service.OperationThService"%>
<%@page import="com.hms.ehat.service.DoctorDeskService"%>
<%@page import="com.hms.dto.LabUnitType"%>
<%@page import="javax.sound.midi.SysexMessage"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.ehat.dto.PlanTreatDTO"%>
<%@page import="com.hms.ehat.controller.NursingStationController"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>
<%@page import="com.hms.ipdbill.service.IpdBillService"%>
<%@page import="com.hms.pharmacy.upload.FilePath"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.dto.Treatment"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.dto.Treatment"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.hms.ehat.controller.PatientChemoController"%>
<%@page import="com.hms.pharmacy.controller.IndentController"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.dto.PatientCareAdvicesDto"%>
<%@page import="com.hms.dto.PatientChemoDto"%>
<%@page import="org.jsoup.Jsoup"%>
<%@ page import="com.hms.dto.LabProfile"%>
<%@ page import="com.hms.dto.Order_comp_druges"%>

<%@page import="com.hms.operation.util.OTOperationNotes"%>
<%@page import="com.lowagie.text.html.simpleparser.StyleSheet"%>
<%@page import="com.lowagie.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.hms.model.TreatmentModel"%>
<%@page import="com.hms.dto.Assessment"%>
<%@ page import="com.hms.admin.util.QuestionMaster"%>
<%@ page import="com.hms.dto.DischargeSummery"%>
<%@page import="com.hms.model.IPDTreatmentModel"%>
<%@page import="com.hms.dto.IPDHistoryMaster"%>
<%@page import="com.hms.dto.Order_master"%>
<%@page import="com.hms.ehat.controller.DoctordeskController"%>
<%@page import="com.hms.ehat.controller.CpoeIPDdetails"%>
<%@page import="com.hms.dto.CustomizeTemplate"%>
<%@ page import="com.hms.dto.LabTest"%>
<%@page import="com.hms.dto.AllergyAlertsDTO"%>
<%@page import="com.hms.hisab.model.HisabModel"%>
<%@page import="com.hms.ipdbill.dto.BillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.serviceImpl.BillServiceImpl"%>
<%@page import="com.hms.ipdbill.service.BillService"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.dto.RadiationMaster"%>
<%@ page import="com.hms.model.AdminModel"%>
<%@page import="com.hms.ehat.controller.RisController"%>
<%@page import="com.hms.dto.RadiologyTemplateReportDTO"%>
<%@page import="com.hms.dto.DoctorRoundReport"%>
<%@page import="com.hms.pharmacy.pojo.IndentSaleSlave"%>
<%@page import="com.hms.dto.PrescriptionInstruction"%>
<%@page import="com.lowagie.text.pdf.PdfGState"%>
<%@page import="com.lowagie.text.pdf.GrayColor"%>
<%@page import="com.lowagie.text.pdf.Barcode128"%>
<%@page import="com.lowagie.text.pdf.ColumnText"%>
<%@page import="com.lowagie.text.pdf.PdfContentByte"%>
<%@page import="com.lowagie.text.PageSize"%>
<%@page import="com.lowagie.text.HeaderFooter"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>

<%@page import="com.lowagie.text.pdf.BaseFont"%>

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
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Auto DischargeSummaryPrint</title>List
<Assessment> arrAssessments = new ArrayList<Assessment>();

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
		
		Font subheader2 = new Font(Font.HELVETICA, 8, Font.BOLD);
		Font tabletext2 = new Font(Font.HELVETICA, 8, Font.NORMAL);
		Font header2 = new Font(Font.HELVETICA, 16, Font.BOLD);
		
		
		Font header1 = new Font(Font.HELVETICA, 10, Font.BOLD);
		
		
		Font subheader1 = new Font(Font.HELVETICA, 8,
		Font.BOLD | Font.UNDERLINE);
		
		header.setColor(10, 4, 2);
		
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
		
		Image img = null;
		PdfPCell cell = null;
		Image imgFQRcode=null;
		
		
		String treatment_Id = request.getParameter("treatID");
		String patient_Id = request.getParameter("patID");
		String type = request.getParameter("type");
		String instructionLang = request.getParameter("langInstruction");
		String dischargedate=request.getParameter("dischargedate");
		String dischargeType=request.getParameter("discharge_Type");
		
	
       
		//added header footer
		int treatmentId = Integer.parseInt(request.getParameter("treatID"));
		String  languageOF=request.getParameter("language");
		String  CallFromOPD=request.getParameter("callfrom");
		String  printTitle= "DISCHARGE SUMMARY "; //request.getParameter("printTitle");
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
		
		
		
		String user_name = (String) session1.getAttribute("userName");
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
		//added by vishant fetch header and footer
		
		PdfWriter pdfWriter = PdfWriter.getInstance(document, outStream);			
		TempEventHandlerIPDDischargePDF event = new TempEventHandlerIPDDischargePDF();
		pdfWriter.setPageEvent(event);

		String reportFooterAddress = "";//hospObj.getReportFooterAddress();
		if(reportFooterAddress.equalsIgnoreCase(null) || reportFooterAddress.equalsIgnoreCase("") || reportFooterAddress == null)
		{
			reportFooterAddress="";			
		}
		
		document.open();		
		


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
				
				String language = request.getParameter("language");
				int patID=Integer.parseInt(request.getParameter("patID"));
				String patient_ID=request.getParameter("patID");
				
				String tomIdS = request.getParameter("tomId");
				
				String callfrom = request.getParameter("callfrom");
				String adNoteType = "false";
				String historyType = "false";
				String invesType = "false";
				String treatmentType = "false";
				String otNotesType = "false";
				String dischargeConditionType = "false";
				String treatAtDischrgeType ="false";
				String paediatricType ="false";
				String drRound ="false";	
				if(callfrom.equals("Services")){

			 adNoteType = request.getParameter("adNote");
			 historyType = request.getParameter("history");
			 invesType = request.getParameter("investigation");
			 treatmentType = request.getParameter("treatment");
			 otNotesType = request.getParameter("otNotes");
			 dischargeConditionType = request.getParameter("dischargeCond");
			 treatAtDischrgeType = request.getParameter("treatDischarge");
			 paediatricType = request.getParameter("paediatric");
			 drRound = request.getParameter("drRound");	
				}
				
			if(callfrom.equals("HF")){
			
				paediatricType = request.getParameter("paediatric");
			}	
				
			//int emrId = 0;
			
			int Iddoc=0;
			
			NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");
			//numberFormatTwoDecimal.format(Math.round(5.5));
			//System.err.println(lstPojo.size());
			
			//document.newPage();
			
			
			
			PdfPTable HeaderTable4 = new PdfPTable(3);
			int[] headerwidth4 = { 30, 60, 20 };
			HeaderTable4.setWidths(headerwidth4);
			HeaderTable4.setWidthPercentage(95f);
			HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			// Table 1 : For hospital adress details start
		
		PdfPTable HeaderTable1 = new PdfPTable(3);
		int[] headerwidth1 = { 30, 80, 30 };
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
		
		
		if(!type.equalsIgnoreCase("DischargeSummaryWithoutHF")){/* 	
			if (img == null) {
				
				HeaderTable1.addCell(new Phrase("", header));
			} else {
				
				HeaderTable1.addCell(cell);
			}		 
			
			Font regular = new Font(Font.TIMES_ROMAN, 10, Font.NORMAL);
			Font bold = new Font(Font.TIMES_ROMAN, 12, Font.BOLD);
			Phrase p = new Phrase();
			p.add(new Chunk(" "+hospitalName, bold));			
			p.add(new Chunk(" \n\n"+address, tabletext));			
			p.add(new Chunk(" "+city+" Pin- "+hospitalZip+"\n", tabletext));
			p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
			if(!webste.equalsIgnoreCase("")){
				p.add(new Chunk(" \n "+webste, tabletext));
				}
				p.add(new Chunk(" \n "+"email: "+email, tabletext));		
			if (cinNo.equalsIgnoreCase("-")) {
				
			}else{
				p.add(new Chunk(" \nCIN: " + cinNo, tabletext));
			}
			if (serviceTaxNo.equalsIgnoreCase("-")) {
				
			}else{
				p.add(new Chunk(" \nService Tax: " + serviceTaxNo, tabletext));
			}
			if (panNo.equalsIgnoreCase("-")) {
				
			}else{
				p.add(new Chunk( ", PAN No: " + panNo, tabletext));
			}
			
			PdfPCell hospitalNameCell = new PdfPCell(p);				
			hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
			HeaderTable1.addCell(hospitalNameCell);
			
			if(billPrint.contains("on")){
				
				if (img == null) {
			
			HeaderTable1.addCell(new Phrase("", header));
				} else {
			
				//	HeaderTable1.addCell(cellNabh);
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

			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
		 */
		 
		}
			
			// Table 1 : For hospital adress details end
			
	
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
			
		PdfPTable twoPT22 = new PdfPTable(2);
			int[] widthInst22 = { 25, 75 };
			twoPT22.setWidths(widthInst22);
			twoPT22.setWidthPercentage(95f);
			twoPT22.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			
			PdfPTable HeaderTable31 = new PdfPTable(1);
			int[] headerwidth31 = { 120 };
			HeaderTable31.setWidths(headerwidth31);
			HeaderTable31.setWidthPercentage(95f);
			HeaderTable31.getDefaultCell().setBorder(Rectangle.BOTTOM);
		

			
				String spLeafName  ="";
		
			
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
			
			int sponsorSlave=ltRegMasterDto.get(0).getChargesMasterSlaveId();
			 
			LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
			AutosuggestionService obj2=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
			List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();

			 String BillCategoryName ="";
			
			
			if(sponsorSlave > 0 && sponsorSlave != 56){
		fetchsposor   = obj2.fetchSuperCatofchargesSlave(sponsorSlave);
		if(fetchsposor.size() >0){
			BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
			}
		spLeafName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id");
		//BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id"); 
			}else{
		BillCategoryName = "Self";
			}
			String weight  	=ltRegMasterDto.get(0).getWeight();
			String height  	=ltRegMasterDto.get(0).getHeight();
			
			
		
			Doctor doc2 = new Doctor();
			
			 if(rtd.getDoctorId().contains(",")){
		
		
		String[] doctors = rtd.getDoctorId().split(",") ;
		String Doc_Nme = "";
		String Depart = "";
		
		for(String str :doctors )
		{
			String DocID = str;
			int docId23 =  Integer.parseInt(str);
		
		

		 Doc_Nme = "";//Doc_Nme + listDoc2.get(0).getDoc_name()+",";
		 Depart = "";//Depart + listDoc2.get(0).getDepartmentName()+",";
		 //System.err.println("sdlfjsdfj-------"+Doc_Nme);
			//}
			
			 
		 }
	
		
			}
			else{
		if(rtd.getDoctorId() != ""){
		int docId1 =  Integer.parseInt(rtd.getDoctorId());
			
		
		}
		} 
			
			
			
			
			//new table no 5 start
				PdfPTable HeaderTable5 = new PdfPTable(2);
				int[] headerwidth5 = { 13,46};
				HeaderTable5.setWidths(headerwidth5);
				HeaderTable5.setWidthPercentage(95f);		
				
				HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
				
				
				document.add(HeaderTable5);
				HeaderTable5.flushContent();
				//End table no5 start
				
				//N table no 7 start
				// Fetch CHIEF COMPLAINTS
			//Start history Print ,Admission Print 
			//Date @ 3 Oct 2017
			PdfPTable HeaderTable5a = new PdfPTable(4);
			int[] headerwidth5a = {30,45,30,45 };
			HeaderTable5a.setWidths(headerwidth5a);
			HeaderTable5a.setWidthPercentage(95f);
			HeaderTable5a.getDefaultCell().setBorder(
			Rectangle.NO_BORDER);
			String treatIdString=request.getParameter("treatID");
			
			 PdfPTable HeaderTableSpace = new PdfPTable(1);
				int[] headerwidthSpace = {40 };
				HeaderTableSpace.setWidths(headerwidthSpace);
				HeaderTableSpace.setWidthPercentage(95f);
				HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTableSpace.setSpacingAfter(5.0f);
				
				PdfPTable HeaderTableH = new PdfPTable(4);
				int[] headerwidthChemo = {20,20,20,20 };
				HeaderTableH.setWidths(headerwidthChemo);
				HeaderTableH.setWidthPercentage(95f);
				HeaderTableH.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				// start Diagnosis INFO
			DiagonosisController daignocontrooler=(ApplicationContextUtils.getApplicationContext()).getBean(DiagonosisController.class);
			DiagonosisService diagnoservice=(ApplicationContextUtils.getApplicationContext()).getBean(DiagonosisService.class);
			List<DiagonosisMasterDto> lstdignoObj=  diagnoservice.getListOfDiagoList(treatmentId);
			 
			PdfPTable HeaderTableDiagno = new PdfPTable(7);
			int[] headerwidthDigno = {5,10,10,5,5,5,5 };
			HeaderTableDiagno.setWidths(headerwidthDigno);
			HeaderTableDiagno.setWidthPercentage(95f);
			HeaderTableDiagno.getDefaultCell().setBorder(Rectangle.BOX);
			if(lstdignoObj.size() > 0){
				
				 HeaderTableH.addCell(new Phrase(" DIAGNOSIS INFO:", subheader));
				 HeaderTableH.addCell(new Phrase("", tabletext));
				 HeaderTableH.addCell(new Phrase(" ", subheader));
				 HeaderTableH.addCell(new Phrase("", tabletext));
				 
				 document.add(HeaderTableH);
				 HeaderTableH.flushContent();
				 
				 HeaderTableSpace.addCell(new Phrase("", tabletext));
					document.add(HeaderTableSpace);
					HeaderTableSpace.flushContent();
					
					int Provisional=0;
					for(int i=0; i< lstdignoObj.size();i++){
								if(lstdignoObj.get(i).getDiagnoType().equalsIgnoreCase("Provisional")){
									Provisional++;
								}
									
					}
					
					if(Provisional != 0){
					 HeaderTableH.addCell(new Phrase(" PROVISIONAL DIAGNOSIS :", subheader));
					 HeaderTableH.addCell(new Phrase("", tabletext));
					 HeaderTableH.addCell(new Phrase(" ", subheader));
					 HeaderTableH.addCell(new Phrase("", tabletext));
					 
					 document.add(HeaderTableH);
					 HeaderTableH.flushContent();
					 
					 HeaderTableSpace.addCell(new Phrase("", tabletext));
						document.add(HeaderTableSpace);
						HeaderTableSpace.flushContent();
					
					HeaderTableDiagno.addCell(new Phrase(" Sr.No", subheader));
					HeaderTableDiagno.addCell(new Phrase("Diagnosis", subheader));
					HeaderTableDiagno.addCell(new Phrase(" Diagnosis Description", subheader));
					HeaderTableDiagno.addCell(new Phrase("ICD 0/10 Code", subheader));
					HeaderTableDiagno.addCell(new Phrase(" Date", subheader));
					HeaderTableDiagno.addCell(new Phrase("Diagnosis Type", subheader));
					HeaderTableDiagno.addCell(new Phrase("Comment", subheader));
					
					int pcount=1;
					for(int i=0; i< lstdignoObj.size();i++){
								if(lstdignoObj.get(i).getDiagnoType().equalsIgnoreCase("Provisional")){
								HeaderTableDiagno.addCell(new Phrase(""+pcount, tabletext));
								HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDiagoName(), tabletext));
								HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDiagndesc(), tabletext));
								HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getIcd10_code(), tabletext));
								HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDate(), tabletext));
								HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDiagnoType(), tabletext));
								HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getComment(), tabletext));
								pcount++;
								}
								
						
					}
					
					
					document.add(HeaderTableDiagno);
					HeaderTableDiagno.flushContent();
					
					}		
					
					 HeaderTableSpace.addCell(new Phrase("", tabletext));
						document.add(HeaderTableSpace);
						HeaderTableSpace.flushContent();
						
						int confirmDiagnosis=0;
						for(int i=0; i< lstdignoObj.size();i++){
									if(lstdignoObj.get(i).getDiagnoType().equalsIgnoreCase("Confirmed")){
										confirmDiagnosis++;
									}
										
						}
					if(confirmDiagnosis!=0){
						 HeaderTableH.addCell(new Phrase(" FINAL DIAGNOSIS :", subheader));
						 HeaderTableH.addCell(new Phrase("", tabletext));
						 HeaderTableH.addCell(new Phrase(" ", subheader));
						 HeaderTableH.addCell(new Phrase("", tabletext));
						 
						 document.add(HeaderTableH);
						 HeaderTableH.flushContent();
						 
						 HeaderTableSpace.addCell(new Phrase("", tabletext));
							document.add(HeaderTableSpace);
							HeaderTableSpace.flushContent();
							
							
							HeaderTableDiagno.addCell(new Phrase(" Sr.No", subheader));
							HeaderTableDiagno.addCell(new Phrase("Diagnosis", subheader));
							HeaderTableDiagno.addCell(new Phrase(" Diagnosis Description", subheader));
							HeaderTableDiagno.addCell(new Phrase("ICD 0/10 Code", subheader));
							HeaderTableDiagno.addCell(new Phrase(" Date", subheader));
							HeaderTableDiagno.addCell(new Phrase("Diagnosis Type", subheader));
							HeaderTableDiagno.addCell(new Phrase("Comment", subheader));
							
							int ccount=1;
							for(int i=0; i< lstdignoObj.size();i++){
										if(lstdignoObj.get(i).getDiagnoType().equalsIgnoreCase("Confirmed")){
										HeaderTableDiagno.addCell(new Phrase(""+ccount, tabletext));
										HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDiagoName(), tabletext));
										HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDiagndesc(), tabletext));
										HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getIcd10_code(), tabletext));
										HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDate(), tabletext));
										HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDiagnoType(), tabletext));
										HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getComment(), tabletext));
										ccount++;
										}
								
							}
							
							
							document.add(HeaderTableDiagno);
							HeaderTableDiagno.flushContent();
						}
							
							 HeaderTableSpace.addCell(new Phrase("", tabletext));
								document.add(HeaderTableSpace);
								HeaderTableSpace.flushContent();
								
								//HeaderTableSpace.addCell(new Phrase("", tabletext));
								//document.add(HeaderTableSpace);
								//HeaderTableSpace.flushContent();
								
								 HeaderTable5.addCell(new Phrase("", tabletext));
						  			HeaderTable5.addCell(new Phrase("", tabletext));
						  			
						   			
							   		 document.add(HeaderTable5);
						   			HeaderTable5.flushContent();
						   			
						   			//HeaderTableSpace.addCell(new Phrase("", tabletext));
						  		//	document.add(HeaderTableSpace);
						  		//	HeaderTableSpace.flushContent();
						  			
						  			
			}

				
				// end  Daignosis INFO
		
		 // start Admission Note
		 	IPD_AutoSummaryController iauto=(ApplicationContextUtils.getApplicationContext()).getBean(IPD_AutoSummaryController.class);
		    IPD_AutoSummaryController objTreatmentModel = new IPD_AutoSummaryController();
			TreatmentDto tobj2 = iauto
			.fetchPatientAdmissionNote(treatment_Id,patient_Id);
			List<TreatmentDto> admissionNotes = tobj2.getListTreatment();
			String tratServ = admissionNotes.get(0).getNotes().trim();
			
			System.out.println("tratServ ===="+tratServ);
			
			
			if (!tratServ.equalsIgnoreCase("<p>-</p>") && !tratServ.equalsIgnoreCase(" ") && tratServ != "" && tratServ != null && !admissionNotes.get(0).getNotes().equalsIgnoreCase("-")) {
				//HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
				/* HeaderTable5.addCell(new Phrase("", subheader));
				HeaderTable5.addCell(new Phrase("", subheader));
				document.add(HeaderTable5);
				HeaderTable5.flushContent(); */

				HTMLWorker htmlWorker2 = new HTMLWorker(document);
				Paragraph paragraph2 = new Paragraph();
				StyleSheet styleSheet2 = new StyleSheet();
				styleSheet2.loadTagStyle("body", "size", "9pt");
				styleSheet2.loadTagStyle("p", "size", "8pt");
				java.util.List<Element> ie3 = HTMLWorker.parseToList(new StringReader("              " + tratServ),
				styleSheet2);
				PdfPTable Table13 = new PdfPTable(2);
				int[] width3 = { 25, 75 };
				Table13.setWidths(width3);
				Table13.setWidthPercentage(95f);
				Table13.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				Table13.addCell(new Phrase("", header));
				Table13.addCell(new Phrase("", header));

				System.out.println("-----------------"+tratServ);
				/* 		tratServ = tratServ.replaceAll("\\<.*?>;-","");
				tratServ = tratServ.replaceAll("<p>","");
				tratServ = tratServ.replaceAll("</p>",""); */

				document.add(Table13);
				Table13.flushContent();

				try {
			Table13.addCell(new Phrase("ADMISSION NOTE:", subheader));

			for (Element element : ie3) {
				//paragraph.add(element);
				if (element instanceof PdfPTable) {
					PdfPTable htmlTable = new PdfPTable(1);
					int[] htmlTableWidth = { 50 };
					htmlTable.setWidths(htmlTableWidth);
					htmlTable.setWidthPercentage(50f);
					htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					htmlTable = (PdfPTable) element;
					/* Table13.addCell(new Phrase("  ",
					       subheader)); */
					Table13.addCell(htmlTable);

					document.add(Table13);
					Table13.flushContent();
				} else {
					/*    tratServ = tratServ.replaceAll("\\<.*?>;-","");
					tratServ = tratServ.replaceAll("<p>","");
					tratServ = tratServ.replaceAll("</p>",""); 
					tratServ = tratServ.replaceAll("</p>",""); 
					*/

					paragraph2.add(element);
					cell = new PdfPCell(paragraph2);
					cell.setBorder(Rectangle.NO_BORDER);
					/* 		                       Table13.addCell(new Phrase(" ",
					       subheader)); */
					Table13.addCell(cell);

					document.add(Table13);
					Table13.flushContent();
					paragraph2.clear();
				}
			}

			//Table13.addCell(new Phrase(tratServ, tabletext));

			document.add(Table13);
			Table13.flushContent();
				} catch (Exception e) {
			document.add(Table13);
			Table13.flushContent();
			e.printStackTrace();
				}
				Table13.addCell(new Phrase("", subheader));
				Table13.addCell(new Phrase("", subheader));

				document.add(Table13);
				Table13.flushContent();
				HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable5.addCell(new Phrase("", subheader));
				HeaderTable5.addCell(new Phrase("", subheader));

				document.add(HeaderTable5);
				HeaderTable5.flushContent();
			}
		 
		 // end Admission Note
		 
		 // start History Data
		 
		 PdfPTable HeaderTableTitle = new PdfPTable(1);
			 	int[] headerwidthTitle = {100 };
			 	HeaderTableTitle.setWidths(headerwidthTitle);
			 	HeaderTableTitle.setWidthPercentage(95f);
			 	HeaderTableTitle.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		 
			OPDHistoryController uss1=(ApplicationContextUtils.getApplicationContext()).getBean(OPDHistoryController.class);
			OPDHistoryService uss2=(ApplicationContextUtils.getApplicationContext()).getBean(OPDHistoryService.class);
			 OPDHistoryMasterDTO historyobj=  uss2.getOPDHistory(treatmentId);

					
						
						PdfPTable HeaderTableCh = new PdfPTable(3);
						int[] headerwidthCh = {5,5,5 };
						HeaderTableCh.setWidths(headerwidthCh);
						HeaderTableCh.setWidthPercentage(95f);
						HeaderTableCh.getDefaultCell().setBorder(Rectangle.BOX);
						
					
						
			         if(historyobj !=null){
			         	
			         	 
			         
			         	 
			 	    
			  			
			 	 			if(historyobj.getGetListOfHistorySlaveDTO().size() > 0){
			 	 				HeaderTableSpace.addCell(new Phrase("", tabletext));
					   			document.add(HeaderTableSpace);
					   			HeaderTableSpace.flushContent();
					   			
					   			HeaderTableTitle.addCell(new Phrase("CHIEF COMPLAINTS AND DURATION:", headerTitle));
			         	
			         	 		document.add(HeaderTableTitle);
			         	 		HeaderTableTitle.flushContent();
			   			
			 	 			}
			   			
			   			
			         	
			    	 		
			      			
			      			if(historyobj.getGetListOfHistorySlaveDTO().size() > 0){
			      				HeaderTableSpace.addCell(new Phrase("", tabletext));
					   			document.add(HeaderTableSpace);
					   			HeaderTableSpace.flushContent();
			      				
			      				HeaderTableCh.addCell(new Phrase("#", subheader));
			 	     				HeaderTableCh.addCell(new Phrase("Chief Complaint", subheader));
			 	     				HeaderTableCh.addCell(new Phrase("Duration", subheader));
			 	     		    	 int index=1;
			 	     		    	 for( int i=0;i< historyobj.getGetListOfHistorySlaveDTO().size();i++){
			 	     		    		HeaderTableCh.addCell(new Phrase(""+index, tabletext));
			 	     		    		HeaderTableCh.addCell(new Phrase(""+historyobj.getGetListOfHistorySlaveDTO().get(i).getChiefComplaints(), tabletext));
			 	     		    		HeaderTableCh.addCell(new Phrase(""+historyobj.getGetListOfHistorySlaveDTO().get(i).getDuration() + " "+historyobj.getGetListOfHistorySlaveDTO().get(i).getDurationType(), tabletext));
			 	     		    		index++;
			 	     		    	 }
			 	     		    	 
			 	     		    	 
			      			}
			      			
			      			    			
			      			
			      			document.add(HeaderTableCh);
			  		    	HeaderTableCh.flushContent();
			  		    	
			       			if(historyobj.getGetListOfHistorySlaveDTO().size() > 0) {
			       				
			       				HeaderTableSpace.addCell(new Phrase("", tabletext));
			           			document.add(HeaderTableSpace);
			           			HeaderTableSpace.flushContent();
			       				
			     		   			//HeaderTable5.addCell(new Phrase("", tabletext));
			     		   			// HeaderTable5.addCell(new Phrase("", tabletext));
			     			   		// document.add(HeaderTable5);
			     		   			//HeaderTable5.flushContent();
			       			}
			  		    	System.out.println("chief===="+historyobj.getChiefComplaints());
			  		    	
			  		    	int cnCount=0;
			  		    	
			  		    	if(historyobj.getChiefComplaints() !=null &&  !historyobj.getChiefComplaints().trim(). equalsIgnoreCase("") ){
			  		    	// HeaderTableH.addCell(new Phrase("Chief Complaints: ", subheader));
			  		    	 HeaderTableH.addCell(new Phrase("History Of Present Illness: ", subheader));
			             	 HeaderTableH.addCell(new Phrase(""+historyobj.getChiefComplaints(), tabletext));
			             	 cnCount++;
			  		    	}
			  		    	
			  		    	if( historyobj.getNegativeHistory() !=null &&  !historyobj.getNegativeHistory().trim().equalsIgnoreCase("")){
			  		    		HeaderTableH.addCell(new Phrase("Negative History:", subheader));
			 	            	 HeaderTableH.addCell(new Phrase(""+historyobj.getNegativeHistory(), tabletext));
			 	            	 cnCount++;
			 		    	}
			             	 
			             	    if(cnCount==1){
			             	    	 HeaderTableH.addCell(new Phrase(" ", subheader));
			         	        	 HeaderTableH.addCell(new Phrase("", tabletext));
			         	        	
			             	    }        	 
			             	  
			             	    if(cnCount > 0){
			             	    	HeaderTableSpace.addCell(new Phrase("", tabletext));
				           			document.add(HeaderTableSpace);
				           			HeaderTableSpace.flushContent();
			             	    	document.add(HeaderTableH);
			             	  			HeaderTableH.flushContent();
			             	    }
			  		    	
			  		    	

			  		    
			       			
			       			if(cnCount > 0){
			       				HeaderTableSpace.addCell(new Phrase("", tabletext));
			           			document.add(HeaderTableSpace);
			           			HeaderTableSpace.flushContent();
			       				
			  		    	
			  	   			HeaderTable5.addCell(new Phrase("", tabletext));
			  	   			 HeaderTable5.addCell(new Phrase("", tabletext));
			  		   		 document.add(HeaderTable5);
			  	   			HeaderTable5.flushContent();
			       			}
			  	   			
			  	   		
			   			
			   			
			   			int pphCount=0;
			   			
			   			if(historyobj.getDmFlag().equalsIgnoreCase("Y") || historyobj.getHtnFlag().equalsIgnoreCase("Y") || historyobj.getIhdFlag().equalsIgnoreCase("Y") || historyobj.getOtherFlag().equalsIgnoreCase("Y")){
			   				HeaderTableSpace.addCell(new Phrase("", tabletext));
		           			document.add(HeaderTableSpace);
		           			HeaderTableSpace.flushContent();
			   				pphCount++;
			   				
			   	        	HeaderTableTitle.addCell(new Phrase("PAST/PERSONAL/FAMILY HISTORY:", headerTitle));
				         	
		         	 		document.add(HeaderTableTitle);
		         	 		HeaderTableTitle.flushContent();
			   	        	 
			   	        	 
			   				HeaderTableCh.addCell(new Phrase("#", subheader));
			  				HeaderTableCh.addCell(new Phrase("Yes/No", subheader));
			  				HeaderTableCh.addCell(new Phrase("Duration", subheader)); 
			  				
			  				if(historyobj.getDmFlag().equalsIgnoreCase("Y")){ 
			  				HeaderTableCh.addCell(new Phrase("DM ", tabletext));
			  				HeaderTableCh.addCell(new Phrase(""+historyobj.getDmFlag(), tabletext));
			  				HeaderTableCh.addCell(new Phrase(""+historyobj.getDmDuration(), tabletext)); 
			  				
			  				}
			  				
			  				if(historyobj.getHtnFlag().equalsIgnoreCase("Y")){
			  				HeaderTableCh.addCell(new Phrase("HT  ", tabletext));
			  				HeaderTableCh.addCell(new Phrase(""+historyobj.getHtnFlag(), tabletext));
			  				HeaderTableCh.addCell(new Phrase(""+historyobj.getHtnDuration(), tabletext)); 
			  				}
			  				
			  				if(historyobj.getIhdFlag().equalsIgnoreCase("Y")){
			  				HeaderTableCh.addCell(new Phrase("IHD  ", tabletext));
			  				HeaderTableCh.addCell(new Phrase(""+historyobj.getIhdFlag(), tabletext));
			  				HeaderTableCh.addCell(new Phrase(""+historyobj.getIhdDuration(), tabletext)); 
			  				}
			  				
			  				if(historyobj.getBacopdFlag().equalsIgnoreCase("Y")){
			  	 				HeaderTableCh.addCell(new Phrase("BA/COPD  ", tabletext));
			  	 				HeaderTableCh.addCell(new Phrase(""+historyobj.getBacopdFlag(), tabletext));
			  	 				HeaderTableCh.addCell(new Phrase(""+historyobj.getBacopdDuration(), tabletext)); 
			  	 				}
			  				
			  				
			  				if(historyobj.getOtherFlag().equalsIgnoreCase("Y")){
			  				HeaderTableCh.addCell(new Phrase("OTHER  ", tabletext));
			  				HeaderTableCh.addCell(new Phrase(""+historyobj.getOtherFlag(), tabletext));
			  				HeaderTableCh.addCell(new Phrase(""+historyobj.getOtherDuration(), tabletext)); 
			  				}
			  				
			  				
			  				
			  			}
			  			
			   			if(pphCount > 0){
			   				 document.add(HeaderTableH);
			   	  			HeaderTableH.flushContent();
			   	  			
			   	  			
			   	  			HeaderTableSpace.addCell(new Phrase("", tabletext));
			   	  			document.add(HeaderTableSpace);
			   	  			HeaderTableSpace.flushContent();
			   			}
			   			
			  			 document.add(HeaderTableCh);
			  			HeaderTableCh.flushContent();
			  			
			  			
			  			
			   			
			   			if(pphCount > 0){
			   				HeaderTableSpace.addCell(new Phrase("", tabletext));
			   	  			document.add(HeaderTableSpace);
			   	  			HeaderTableSpace.flushContent();
			 		    	
			 		    	
			 		   			HeaderTable5.addCell(new Phrase("", tabletext));
			 		   			 HeaderTable5.addCell(new Phrase("", tabletext));
			 			   		 document.add(HeaderTable5);
			 		   			HeaderTable5.flushContent();
			   			} 
			 		   		
			   			int mhCount=0;
			 		   			
			 		   			if(!(historyobj.getMedications().trim().equalsIgnoreCase("")) ){
			 		   				HeaderTableH.addCell(new Phrase("Medications", subheader));
			 		            	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getMedications(), tabletext));
			 		            	 mhCount++;
			 		   			} if(!(historyobj.getPastSurgicalHistory().trim().equalsIgnoreCase(""))){
			 		   				
			 		          	  HeaderTableH.addCell(new Phrase("Past Surgical History", subheader));
			 		          	  HeaderTableH.addCell(new Phrase(":  "+historyobj.getPastSurgicalHistory(), tabletext));
			 		          	 mhCount++;
			 		   			}
			   		       if( mhCount==1){
			   		    	 HeaderTableH.addCell(new Phrase(" ", subheader));
			 	        	 HeaderTableH.addCell(new Phrase("", tabletext));
			 	        	 
			   		       }
			   		       
			   		       if( mhCount > 0){
			   		    	HeaderTableSpace.addCell(new Phrase("", tabletext));
			   	  			document.add(HeaderTableSpace);
			   	  			HeaderTableSpace.flushContent();
			   		    	   document.add(HeaderTableH);
			 	    			HeaderTableH.flushContent();
			   		       }
			 			

			 		
			 		    	if(mhCount > 0) {
			 		    		HeaderTableSpace.addCell(new Phrase("", tabletext));
			 					document.add(HeaderTableSpace);
			 					HeaderTableSpace.flushContent();
			 		    		
			 		    	 
			 	   			HeaderTable5.addCell(new Phrase("", tabletext));
			 	   			 HeaderTable5.addCell(new Phrase("", tabletext));
			 		   		 document.add(HeaderTable5);
			 	   			HeaderTable5.flushContent();
			 	   			
			 	   			HeaderTableSpace.addCell(new Phrase("", tabletext));
			 				document.add(HeaderTableSpace);
			 				HeaderTableSpace.flushContent();
			 	   			
			 		    	}
			 		    	
			 		    	
			 	   			
			 				int ghCount=0;
			 	   		 
			         	 if(!(historyobj.getObsHistory().trim().equalsIgnoreCase(""))  ){
			         		 HeaderTableH.addCell(new Phrase("GYNAE/OBS History", subheader));
			             	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getObsHistory(), tabletext));
			             	 ghCount++;
			             	 
			         	 } if(!(historyobj.getAnyAllergy().trim().equalsIgnoreCase(""))){
			         	      HeaderTableH.addCell(new Phrase("Any allergies or adverse drug  reactions? ", subheader));
			             	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getAnyAllergy(), tabletext));
			             	 ghCount++;
			         	 }
			         	 
			         	 if(ghCount==1){
			         		 HeaderTableH.addCell(new Phrase(" ", subheader));
			 	        	 HeaderTableH.addCell(new Phrase("", tabletext));
			 	        	 
			         	 }
			         	 
			 	   			if(ghCount > 0){
			 	   				document.add(HeaderTableH);
			 	    			HeaderTableH.flushContent();
			 	   			}
			         	
			    			
			    			
			 		    	
			   			if(ghCount > 0 ){
			   				HeaderTableSpace.addCell(new Phrase("", tabletext));
			   	  			document.add(HeaderTableSpace);
			   	  			HeaderTableSpace.flushContent();
			   				
			 	   			HeaderTable5.addCell(new Phrase("", tabletext));
			 	   			 HeaderTable5.addCell(new Phrase("", tabletext));
			 		   		 document.add(HeaderTable5);
			 	   			HeaderTable5.flushContent();
			 	   			
			 	   			HeaderTableSpace.addCell(new Phrase("", tabletext));
			 	  			document.add(HeaderTableSpace);
			 	  			HeaderTableSpace.flushContent();
			   			}
			 	   			
			         	 
			 	  			int fhCount=0;
			 	  			
			 	  			if(!(historyobj.getFamilyHistory().trim().equalsIgnoreCase(""))) {
			 	  				 HeaderTableH.addCell(new Phrase("Family History", subheader));
			 	  	        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getFamilyHistory(), tabletext));
			 	  	        	fhCount++;
			 	  	        	 
			 	  			} if(!(historyobj.getPersonalHistory().trim().equalsIgnoreCase(""))){
			 	  	        	 HeaderTableH.addCell(new Phrase("Personal History ", subheader));
			 	  	        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getPersonalHistory(), tabletext));
			 	  	       	fhCount++;
			 	  			}
			 	  			
			 	  			if(fhCount==1){
			 	  				 HeaderTableH.addCell(new Phrase(" ", subheader));
			 		        	 HeaderTableH.addCell(new Phrase("", tabletext));
			 		        	
			 	  			}
			 	  			
			 	  			if(fhCount > 0){
			 	  				 document.add(HeaderTableH);
			 			   			HeaderTableH.flushContent();
			 	  			}
			   			
			   			
			 		    	if(fhCount > 0){
			 		    	
			 		    		HeaderTableSpace.addCell(new Phrase("", tabletext));
			 		  			document.add(HeaderTableSpace);
			 		  			HeaderTableSpace.flushContent();
			 		    
			 	   			HeaderTable5.addCell(new Phrase("", tabletext));
			 	   			 HeaderTable5.addCell(new Phrase("", tabletext));
			 		   		 document.add(HeaderTable5);
			 	   			HeaderTable5.flushContent();
			 	   			
			 	   			
			 		    	}
			 	  			
			 	  			if(!historyobj.getHabbits().equalsIgnoreCase("")){
			 	  				HeaderTableH.addCell(new Phrase("Habbits ", subheader));
			 	  	        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getHabbits(), tabletext));
			 	  	        	HeaderTableH.addCell(new Phrase(" ", subheader));
			 	  	        	HeaderTableH.addCell(new Phrase(" ", subheader));
			 	  	         document.add(HeaderTableH);
		 			   			HeaderTableH.flushContent();
		 			   			
		 			   		HeaderTableSpace.addCell(new Phrase("", tabletext));
		 		  			document.add(HeaderTableSpace);
		 		  			HeaderTableSpace.flushContent();
		 		    
		 	   			HeaderTable5.addCell(new Phrase("", tabletext));
		 	   			 HeaderTable5.addCell(new Phrase("", tabletext));
		 		   		 document.add(HeaderTable5);
		 	   			HeaderTable5.flushContent();
			 	  			}
			 	  			
			 	        	 
			                   int oCount=0;
			                   if(!(historyobj.getTemperature().trim().equalsIgnoreCase("")) || !(historyobj.getBp().trim().equalsIgnoreCase("")) || !(historyobj.getPulse().trim().equalsIgnoreCase("")) ){
			                	  
			                	   HeaderTableSpace.addCell(new Phrase("", tabletext));
					 	  			document.add(HeaderTableSpace);
					 	  			HeaderTableSpace.flushContent();
					 	  			
			                	  
			      	        	 
			      	        	HeaderTableTitle.addCell(new Phrase("ON EXAMINATION:", headerTitle));
			         	 		document.add(HeaderTableTitle);
			         	 		HeaderTableTitle.flushContent();
			                   }
			 	        	 
			 	        	 if(!(historyobj.getTemperature().trim().equalsIgnoreCase(""))) {
			 	        		 HeaderTableH.addCell(new Phrase("Temperature", subheader));
			 		        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getTemperature(), tabletext));
			 		        	 oCount++;
			 		        	
			 	        	 }
			 	        	 
			 	        	 if(!(historyobj.getBp().trim().equalsIgnoreCase(""))){
			 	        		 HeaderTableH.addCell(new Phrase("BP", subheader));
			 		        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getBp(), tabletext));
			 		        	 oCount++;
			 	        	 }
			 	        	 
			 	        	 if(!(historyobj.getPulse().trim().equalsIgnoreCase("")) ){
			 	        		 HeaderTableH.addCell(new Phrase("Pulse", subheader));
			 		        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getPulse(), tabletext));
			 	        		 oCount++;
			 	        	 }
			 	        	
			 	        	
			 	        	 if(oCount ==1 || oCount == 3){
			 	        		 HeaderTableH.addCell(new Phrase(" ", subheader));
			 		        	 HeaderTableH.addCell(new Phrase("", tabletext));
			 		        	 
			 	        	}
			 	        	 if(oCount > 0){
			 	        		 document.add(HeaderTableH);
			 			  			HeaderTableH.flushContent();
			 			  			HeaderTableSpace.addCell(new Phrase("", tabletext));
			 			  			document.add(HeaderTableSpace);
			 			  			HeaderTableSpace.flushContent();
			 	        	 }
			 	        	// HeaderTableH.addCell(new Phrase(" ", subheader));
			 	        	// HeaderTableH.addCell(new Phrase("", tabletext));
			 	        	
			 	        	 
			 	        
			 	  			
			 	  			
			 	  			
			 	  			
			 	        	 
			 	        	 int gCount=0;
			 	        	 
			 	        	  if(!(historyobj.getPallor().trim().equalsIgnoreCase("")) || !(historyobj.getClubbing().trim().equalsIgnoreCase("")) || !(historyobj.getLymphAdenopathy().trim().equalsIgnoreCase("")) || !(historyobj.getIcterus().trim().equalsIgnoreCase("")) || !(historyobj.getOedema().trim().equalsIgnoreCase("")) ){
			 	        		
			 	 	        	 
			 	 	        	HeaderTableTitle.addCell(new Phrase("GENERAL EXAM:", headerTitle));
			         	 		document.add(HeaderTableTitle);
			         	 		HeaderTableTitle.flushContent();
			 	 	        	 
			 	 	        	 
			 	        	  }
			 	        	 
			 	        	 if(!(historyobj.getPallor().trim().equalsIgnoreCase(""))){
			 	        		 HeaderTableH.addCell(new Phrase("Pallor", subheader));
			 		        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getPallor(), tabletext));
			 		        	 gCount++;
			 	        	 }
			 	        	 
			 	        	 if(!(historyobj.getClubbing().trim().equalsIgnoreCase(""))){
			 	        		 HeaderTableH.addCell(new Phrase("Clubbing", subheader));
			 		        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getClubbing(), tabletext));
			 		        	 gCount++;
			 	        	 }
			 	        	
			 	        	if(!(historyobj.getLymphAdenopathy().trim().equalsIgnoreCase(""))){
			 	        		 HeaderTableH.addCell(new Phrase("Lymph Adenopathy", subheader));
			 		        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getLymphAdenopathy(), tabletext));
			 		        	 gCount++;
			 	        	}
			 	        	
			 	        	if(!(historyobj.getIcterus().trim().equalsIgnoreCase(""))){
			 	        		 HeaderTableH.addCell(new Phrase("Icterus", subheader));
			 		        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getIcterus(), tabletext));
			 		        	 gCount++;
			 	        	}
			 	        	 
			 	        	if(!(historyobj.getOedema().trim().equalsIgnoreCase(""))){
			 	        		 HeaderTableH.addCell(new Phrase("Oedema", subheader));
			 		        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getOedema(), tabletext));
			 		        	 gCount++;
			 	        	}
			 	        	
			 	        	
			 	        	if(gCount ==1 || gCount == 3 || gCount == 5){
			 	        		 HeaderTableH.addCell(new Phrase(" ", subheader));
			 		        	 HeaderTableH.addCell(new Phrase("", tabletext));
			 		        	 
			 	        	}
			 	        	
			 	        	if(gCount > 0){
			 	        		document.add(HeaderTableH);
			 		  			HeaderTableH.flushContent();
			 		  			
			 		  			HeaderTableSpace.addCell(new Phrase("", tabletext));
			 		  			document.add(HeaderTableSpace);
			 		  			HeaderTableSpace.flushContent();
			 	        	}
			 	        	 //HeaderTableH.addCell(new Phrase(" ", subheader));
			 	        	// HeaderTableH.addCell(new Phrase("", tabletext));
			 	        	         	  			
			 	  			
			 	  			
			 			    	
			 			    	
			 			    	
			 		  			
			 		  			int sCount=0;
			 		  			if(!(historyobj.getRs().trim().equalsIgnoreCase("")) || !(historyobj.getCvs().trim().equalsIgnoreCase("")) || !(historyobj.getCns().trim().equalsIgnoreCase("")) || !(historyobj.getPa().trim().equalsIgnoreCase(""))){
			 		  				
			 			        	 
			 			        	HeaderTableTitle.addCell(new Phrase("SYSTEMATIC EXAMINATION:", headerTitle));
				         	 		document.add(HeaderTableTitle);
				         	 		HeaderTableTitle.flushContent();
			 		  			}
			 		  			
			 		        	 
			 		        	 if(!(historyobj.getRs().trim().equalsIgnoreCase(""))){
			 		        		 HeaderTableH.addCell(new Phrase("R/S", subheader));
			 			        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getRs(), tabletext));
			 			        	 sCount++;
			 		        	 }
			 		        
			 		        	 if(!(historyobj.getCvs().trim().equalsIgnoreCase(""))){
			 		        		 HeaderTableH.addCell(new Phrase("CVS", subheader));
			 			        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getCvs(), tabletext));
			 			        	 sCount++;
			 		        	 }
			 		        	
			 		        	 if(!(historyobj.getCns().trim().equalsIgnoreCase(""))){
			 		        		 HeaderTableH.addCell(new Phrase("CNS", subheader));
			 			        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getCns(), tabletext));
			 			        	 sCount++;
			 		        	 }
			 		        	
			 		        	 if(!(historyobj.getPa().trim().equalsIgnoreCase(""))){
			 		        		 HeaderTableH.addCell(new Phrase("PA", subheader));
			 			        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getPa(), tabletext));
			 			        	 sCount++;
			 		        	 }
			 		        	
			 		        	 if(sCount==1 || sCount == 3){
			 		        		 HeaderTableH.addCell(new Phrase("", tabletext));
			 		        		 HeaderTableH.addCell(new Phrase("", tabletext));
			 		        		
			 		        	 }
			 		        		  
			 		        	 if(sCount > 0){
			 		        		 document.add(HeaderTableH);
			 				  		  	HeaderTableH.flushContent(); 
			 				  		  HeaderTableSpace.addCell(new Phrase("", tabletext));
			 				  			document.add(HeaderTableSpace);
			 				  			HeaderTableSpace.flushContent();
			 		        	 }
			 		        	 
			 		        	  
			 					    	
			 			  			if(oCount > 0  || gCount > 0 || sCount > 0){
			 					    	
			 					    
			 				   			HeaderTable5.addCell(new Phrase("", tabletext));
			 				   			 HeaderTable5.addCell(new Phrase("", tabletext));
			 					   		 document.add(HeaderTable5);
			 				   			HeaderTable5.flushContent();
			 				   			
			 				   			HeaderTableSpace.addCell(new Phrase("", tabletext));
			 				  			document.add(HeaderTableSpace);
			 				  			HeaderTableSpace.flushContent();
			 			  			}
			 				  			
			 				 		int lcount=0;
			 		        	 
			 				  		if(!(historyobj.getLocalExamination().trim().equalsIgnoreCase(""))){
			 				  			 HeaderTableH.addCell(new Phrase("Local Examinations:", subheader));
			 				        	 HeaderTableH.addCell(new Phrase(""+historyobj.getLocalExamination(), tabletext));
			 				        	 lcount++;
			 				  		}	
			 				  		
			 				  		if(!(historyobj.getInvestigationReport().trim().equalsIgnoreCase(""))){
			 				  			HeaderTableH.addCell(new Phrase("Investigation Reports:", subheader));
			 				        	 HeaderTableH.addCell(new Phrase(""+historyobj.getInvestigationReport(), tabletext));
			 				        	 lcount++;
			 				  		}
			 		        	
			 		        	 if(!(historyobj.getProvisionalDiagno().trim().equalsIgnoreCase(""))){
			 		        		 HeaderTableH.addCell(new Phrase("Provisional Diagnosis:", subheader));
			 			        	 HeaderTableH.addCell(new Phrase(""+historyobj.getProvisionalDiagno(), tabletext));
			 			        	 lcount++;
			 		        	 }
			 		        	 
			 		        	 if(!(historyobj.getTreatPlan().trim().equalsIgnoreCase(""))){
			 		        		 HeaderTableH.addCell(new Phrase("Treatment Plan:", subheader));
			 			        	 HeaderTableH.addCell(new Phrase(""+historyobj.getTreatPlan(), tabletext));
			 			        	 lcount++;
			 		        	 }
			 		        	 
			 		        	if(lcount ==1 || lcount==3){
			 		        		 HeaderTableH.addCell(new Phrase("", tabletext));
			 		        		 HeaderTableH.addCell(new Phrase("", tabletext));
			 		        	}
			 		        	 
			 		        	 document.add(HeaderTableH);
			 		  			HeaderTableH.flushContent();
			  			
			 		  			
			 		  			HeaderTableSpace.addCell(new Phrase("", tabletext));
			 		  			document.add(HeaderTableSpace);
			 		  			HeaderTableSpace.flushContent();
			 				    	
			 		  			if(lcount > 0){
			 				    	
			 				    
			 			   			HeaderTable5.addCell(new Phrase("", tabletext));
			 			   			 HeaderTable5.addCell(new Phrase("", tabletext));
			 				   		 document.add(HeaderTable5);
			 			   			HeaderTable5.flushContent();
			 			   			
			 			   			
			 			   			HeaderTableSpace.addCell(new Phrase("", tabletext));
			 			  			document.add(HeaderTableSpace);
			 			  			HeaderTableSpace.flushContent();
			 		  			}
			 			  			// HeaderTableSpace1.addCell(new Phrase("", tabletext));
			 			 			//document.add(HeaderTableSpace1);
			 			 		//	HeaderTableSpace1.flushContent();
			      			
			      				
			      			}
		 
		 // End History Data
		 
		   // start Allergy
			         PdfPTable HeaderTableallergy = new PdfPTable(2);
			     	int[] headerwidthAllergy = {5,10 };
			     	HeaderTableallergy.setWidths(headerwidthAllergy);
			     	HeaderTableallergy.setWidthPercentage(95f);
			     	HeaderTableallergy.getDefaultCell().setBorder(Rectangle.BOX);
			     	
			     	OPDClinicalEvaluationService clinicalService=(ApplicationContextUtils.getApplicationContext()).getBean(OPDClinicalEvaluationService.class);
			    	OPDClinicalEvaluationDto clinicalObj=clinicalService.fetchClinicalEvalTempDataByTreatmentId(treatId, request);
			     	List<OPDAllergyAlertsDto> lstallergyObj=clinicalService.fetchAllAllergyAlerts(treatId, request);
			     	
			     	if(lstallergyObj.size() > 0){
			     		   
			     		HeaderTableH.addCell(new Phrase(" ALERTS & ALLERGIES:", subheader));
			     	  	 HeaderTableH.addCell(new Phrase("", tabletext));
			     	  	 HeaderTableH.addCell(new Phrase(" ", subheader));
			     	  	 HeaderTableH.addCell(new Phrase("", tabletext));
			     	  	 
			     	  	 document.add(HeaderTableH);
			     	  	 HeaderTableH.flushContent();
			     	  	 
			     	    HeaderTableSpace.addCell(new Phrase("", tabletext));
			     		document.add(HeaderTableSpace);
			     		HeaderTableSpace.flushContent();
			     		
			     		HeaderTableallergy.addCell(new Phrase("Sr.No", subheader));
			     		HeaderTableallergy.addCell(new Phrase("Allergy Name ", subheader));
			     		int acount=1;
			     		for(int i=0;i< lstallergyObj.size() ;i++){
			     			HeaderTableallergy.addCell(new Phrase(""+acount, tabletext));
			     			HeaderTableallergy.addCell(new Phrase(""+lstallergyObj.get(i).getAllergyName(), tabletext));
			     			acount++;
			     		}
			     		
			     		document.add(HeaderTableallergy);
			     		HeaderTableallergy.flushContent();
			     		
			     		
			     		HeaderTableSpace.addCell(new Phrase("", tabletext));
			     		document.add(HeaderTableSpace);
			     		HeaderTableSpace.flushContent();
			     		
			     		HeaderTableSpace.addCell(new Phrase("", tabletext));
			     		document.add(HeaderTableSpace);
			     		HeaderTableSpace.flushContent();
			     	 
			     	 	HeaderTable5.addCell(new Phrase("", tabletext));
			     		HeaderTable5.addCell(new Phrase("", tabletext));
			     		 document.add(HeaderTable5);
			     		HeaderTable5.flushContent();
			     		
			     		HeaderTableSpace.addCell(new Phrase("", tabletext));
			     		document.add(HeaderTableSpace);
			     		HeaderTableSpace.flushContent();
			     		
			     		 HeaderTableSpace.addCell(new Phrase("", tabletext));
			     			document.add(HeaderTableSpace);
			     			HeaderTableSpace.flushContent();
			       
			     		
			     	}
		   
		   // end Allergy
		
	
		//Start Treatment Plan
		PdfPTable twoPT = new PdfPTable(2);
						int[] widthInst = { 25, 75 };
						twoPT.setWidths(widthInst);
						twoPT.setWidthPercentage(95f);
						twoPT.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						
						PdfPTable HeaderTable7 = new PdfPTable(6);
						int[] headerwidth7 = { 10, 30, 44, 24, 16, 20 };
						HeaderTable7.setWidths(headerwidth7);
						HeaderTable7.setWidthPercentage(95f);
						HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						
		List<OPDPrescriptionDtoSP> listPrescription = new ArrayList<OPDPrescriptionDtoSP>();
				//int unitId=1;
				PrescriptionService dischargeService =(ApplicationContextUtils.getApplicationContext()).getBean(PrescriptionService.class);
				listPrescription = dischargeService.getAllPrescriptionsByTreatmentId(treatId, unitId);
				if (listPrescription.size() > 0) {
					twoPT.addCell(new Phrase("TREATMENT PLAN: ", subheader));
					twoPT.addCell(new Phrase("", subheader));
					document.add(twoPT);
					twoPT.flushContent();
					
					HeaderTableSpace.addCell(new Phrase("", tabletext));
	     			document.add(HeaderTableSpace);
	     			HeaderTableSpace.flushContent();
				}
				if (listPrescription.size() > 0) {

					String osName = System.getProperty("os.name");
					if (osName.equalsIgnoreCase("Linux")) {
				//FontFactory.register("/usr/share/fonts/ARIALUNI/Shiv05.ttf");
					} else {
				//FontFactory.register("C:/Windows/Fonts/Shiv05.ttf");
					}
			if (listPrescription.size() > 0) {

				HeaderTable7.addCell(new Phrase("#", subheader));
				HeaderTable7.addCell(new Phrase("Prep. Drug", subheader));
				HeaderTable7.addCell(new Phrase("Advice", subheader));
				HeaderTable7.addCell(new Phrase("Frequency", subheader));
				HeaderTable7.addCell(new Phrase("Duration", subheader));
				HeaderTable7.addCell(new Phrase("Qty.", subheader));

				document.add(HeaderTable7);
				HeaderTable7.flushContent();
				
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				
				HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				
				
				document.add(HeaderTable7);
				HeaderTable7.flushContent();
					}
					String Hindi="";
					String Marathi="";	
					String all="";	
					String insrtn="";
				 	//List<PrescriptionInstruction> inlist = new ArrayList<PrescriptionInstruction>();
					//TreatmentModel tModel = new TreatmentModel();
					//inlist = tModel.fectchAllPrescriptionInstruction("IPD");
					for(int i=0;i<listPrescription.size();i++){
				
					
					String dayPrescription=listPrescription.get(i).getDayPrescription();
					String day[] = dayPrescription.split(",");
					// by Vishnu this is changed because 1.6 day float can not convert to integer 8-04-2021
					Float Morning = Float.parseFloat(day[0]);
					Float Afternoon = Float.parseFloat(day[1]);
					Float Evening = Float.parseFloat(day[2]);
					Float Night = Float.parseFloat(day[3]);
				
					HeaderTable7.addCell(new Phrase(""+(i+1), tabletext));
					HeaderTable7.addCell(new Phrase(""+listPrescription.get(i).getPrepName()+" "
					+listPrescription.get(i).getMedicineName(), tabletext));
				
					Font font = com.lowagie.text.FontFactory.getFont("Shivaji05", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
					String instructions = listPrescription.get(i).getInstructionName();
					String instArray[] = instructions.split("/");
					
					String englishInstr=instArray[0];
					String hindiInstr=instArray[1];
					String marathiInstr=instArray[2];
					System.err.println("language........."+language+"------"+Arrays.asList(instArray));
					if(language.equalsIgnoreCase("ENGLISH")){
						
						HeaderTable7.addCell(new Phrase(""+englishInstr, tabletext));
						
					}else if(language.equalsIgnoreCase("MARATHI")){
						System.err.println("marathiInstr........."+marathiInstr);
						HeaderTable7.addCell(new Phrase(""+marathiInstr,font));
						
					}
					
					//HeaderTable7.addCell(new Phrase(""+instructionName[0], tabletext));
					HeaderTable7.addCell(new Phrase(""+listPrescription.get(i).getFrequency(), tabletext));
					//HeaderTable7.addCell(new Phrase(""+listPrescription.get(i).getInstructionName(), tabletext));
					//HeaderTable7.addCell(new Phrase(""+Morning+" - "+Afternoon+" - "+Evening+" - "+Night, tabletext));
					HeaderTable7.addCell(new Phrase(""+listPrescription.get(i).getDays()+" Days", tabletext));
					HeaderTable7.addCell(new Phrase(""+listPrescription.get(i).getQty(), tabletext));
					
					}
				                                                 
					HeaderTable7.getDefaultCell()
					.setBorder(Rectangle.NO_BORDER);

					

					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));

					
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));

					
					document.add(HeaderTable7);
					HeaderTable7.flushContent();
					
					HeaderTable5.addCell(new Phrase("", tabletext));
		     		HeaderTable5.addCell(new Phrase("", tabletext));
		     		 document.add(HeaderTable5);
		     		HeaderTable5.flushContent();
					
				}
				
		// End Treatment Plan
		
		// Investigation start
		DoctorDeskService serviceIpd=(ApplicationContextUtils.getApplicationContext()).getBean(DoctorDeskService.class);
		List<CpoeIPDdetails> lstService=serviceIpd.getlistservciesipdcopenew(treatId, "default", request);

		PdfPTable HeaderTableInv = new PdfPTable(4);
		int[] headerwidthInv = {5,5,5,5 };
		HeaderTableInv.setWidths(headerwidthInv);
		HeaderTableInv.setWidthPercentage(95f);
		HeaderTableInv.getDefaultCell().setBorder(Rectangle.BOX);
		
		     if(lstService.size() > 0){
		    	 HeaderTableSpace.addCell(new Phrase("", tabletext));
	      	 		HeaderTableSpace.addCell(new Phrase("", tabletext));
		   			document.add(HeaderTableSpace);
		   			HeaderTableSpace.flushContent();
		   			
		    	 HeaderTableTitle.addCell(new Phrase("INVESTIGATION:", headerTitle));
      	 		document.add(HeaderTableTitle);
      	 		HeaderTableTitle.flushContent();
      	 		
      	 		HeaderTableSpace.addCell(new Phrase("", tabletext));
      	 		HeaderTableSpace.addCell(new Phrase("", tabletext));
	   			document.add(HeaderTableSpace);
	   			HeaderTableSpace.flushContent();
	   			
	   			HeaderTableInv.addCell(new Phrase("Sr.No", tabletext));
   				HeaderTableInv.addCell(new Phrase("Particularis", tabletext));
   				HeaderTableInv.addCell(new Phrase("Date", tabletext));
   				HeaderTableInv.addCell(new Phrase("Test", tabletext));
	   			
	   			
	   			int intCount=1;
	   			
	   			for(int i=0;i < lstService.size();i++ ){
	   				HeaderTableInv.addCell(new Phrase(""+intCount, tabletext));
	   				HeaderTableInv.addCell(new Phrase(""+lstService.get(i).getCategoryName(), tabletext));
	   				HeaderTableInv.addCell(new Phrase(""+lstService.get(i).getInserted_date_time(), tabletext));
	   				HeaderTableInv.addCell(new Phrase(""+lstService.get(i).getServicename(), tabletext));
	   				
  		    		intCount++;
	   			}
	   			
	   			document.add(HeaderTableInv);
	   			HeaderTableInv.flushContent();
		     }
		
		// Investigation End
		
		// Treatment At Discharge
		TreatmentDischargeController uss2DischargeController=(ApplicationContextUtils.getApplicationContext()).getBean(TreatmentDischargeController.class);
			TreatmentDischargeService uss2DischargeService=(ApplicationContextUtils.getApplicationContext()).getBean(TreatmentDischargeService.class);
			List<TreatmentDischargeDto> listtreatmentDischarge=uss2DischargeService.getAllPrescriptionsByTreatmentId(treatId, unitId);
			PdfPTable twoPT2 = new PdfPTable(2);
			int[] widthInst2 = { 25, 75 };
			twoPT2.setWidths(widthInst2);
			twoPT2.setWidthPercentage(95f);
			twoPT2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			

			
			
			
			if (listtreatmentDischarge.size() != 0) {
				twoPT2.addCell(new Phrase("TREATMENT AT DISCHARGE : ", subheader));
				twoPT2.addCell(new Phrase("", subheader));
				document.add(twoPT2);
				twoPT2.flushContent();

				HeaderTable7.addCell(new Phrase("#", subheader));
				HeaderTable7.addCell(new Phrase("Prep. Drug", subheader));
				HeaderTable7.addCell(new Phrase("Advice", subheader));
				HeaderTable7.addCell(new Phrase("Frequency", subheader));
				HeaderTable7.addCell(new Phrase("Duration", subheader));
				HeaderTable7.addCell(new Phrase("Qty.", subheader));

				document.add(HeaderTable7);
				HeaderTable7.flushContent();
				
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				
				HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				

				document.add(HeaderTable7);
				HeaderTable7.flushContent();

				
		for(int i=0;i<listtreatmentDischarge.size();i++){
					
					 				
					String dayPrescription=listtreatmentDischarge.get(i).getDayPrescription();
					String day[] = dayPrescription.split(",");  
					// by Vishnu this is changed because 1.6 day float can not convert to integer 8-04-2021
					Float Morning = Float.parseFloat(day[0]);
					Float Afternoon = Float.parseFloat(day[1]);
					Float Evening = Float.parseFloat(day[2]);
					Float Night = Float.parseFloat(day[3]);
					 				
					Font font = com.lowagie.text.FontFactory.getFont("Shivaji05", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
					String instructionName2= listtreatmentDischarge.get(i).getInstructionName();
					System.out.println("---------"+instructionName2);
					String [] instArray = instructionName2.split("/");
					
					String englishInstr=instArray[0];
					String hindiInstr=instArray[1];
					String marathiInstr=instArray[2];
					System.err.println("language........."+language+"------"+Arrays.asList(instArray));
					

					//String instruction[]=listtreatmentDischarge.get(i).getInstructionNameForUI().split("/");
					HeaderTable7.addCell(new Phrase(""+(i+1), tabletext));
					HeaderTable7.addCell(new Phrase(""+listtreatmentDischarge.get(i).getMedicineName(), tabletext));
					if(language.equalsIgnoreCase("ENGLISH")){
						
						HeaderTable7.addCell(new Phrase(""+englishInstr, tabletext));
						
					}else if(language.equalsIgnoreCase("MARATHI")){
						System.err.println("marathiInstr........."+marathiInstr);
						HeaderTable7.addCell(new Phrase(""+marathiInstr,font));
						
					}
					//HeaderTable7.addCell(new Phrase(""+instruction[0], tabletext));
					HeaderTable7.addCell(new Phrase(""+listtreatmentDischarge.get(i).getFrequency(), tabletext));
					//HeaderTable7.addCell(new Phrase(""+Morning+" - "+Afternoon+" - "+Evening+" - "+Night, tabletext));
					HeaderTable7.addCell(new Phrase(""+listtreatmentDischarge.get(i).getDays()+" Days", tabletext));
					HeaderTable7.addCell(new Phrase(""+listtreatmentDischarge.get(i).getQty(), tabletext));
					}

				

					 			HeaderTable7.getDefaultCell()
								.setBorder(Rectangle.NO_BORDER);

					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));

					 			
				
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));

				document.add(HeaderTable7);
				HeaderTable7.flushContent();

				HeaderTable5.addCell(new Phrase("", tabletext));
	     		HeaderTable5.addCell(new Phrase("", tabletext));
	     		 document.add(HeaderTable5);
	     		HeaderTable5.flushContent();
					}
			
			// ENd  Treatment At Discharge
		
		   // start advice on Discharge
		   IPD_AutoSummaryService objIPDTreatmentModel= (ApplicationContextUtils.getApplicationContext()).getBean(IPD_AutoSummaryService.class);
						List<DischargeSummery> dsList = objIPDTreatmentModel.fetchAutoDischargeSummery(treatId);
						
				if(dsList.size() > 0 ){
					 HeaderTableSpace.addCell(new Phrase("", tabletext));
		     			document.add(HeaderTableSpace);
		     			HeaderTableSpace.flushContent();
		     			System.out.println("advice===="+dsList.get(0).getAdvisedOnDischarge());
		     	if( !dsList.get(0).getAdvisedOnDischarge().equalsIgnoreCase("")){		
					twoPT.addCell(new Phrase("Advice On  Discharge :", subheader));
					twoPT.addCell(new Phrase("" + dsList.get(0).getAdvisedOnDischarge(), tabletext));
					
					document.add(twoPT);
					twoPT.flushContent();
					
					 HeaderTableSpace.addCell(new Phrase("", tabletext));
		     			document.add(HeaderTableSpace);
		     			HeaderTableSpace.flushContent();
		     			
					HeaderTable5.addCell(new Phrase("", tabletext));
		     		HeaderTable5.addCell(new Phrase("", tabletext));
		     		 document.add(HeaderTable5);
		     		HeaderTable5.flushContent();
		     	  } 
				}		
						
		   // end advice on Discharge
		
		   // start Follow Up
		     OPDPrescriptionFolloUpDto fobj= dischargeService.getfollowUpForOPDPatient(unitId, treatmentId);
		   if(fobj != null  ){
			   document.add(HeaderTableSpace);
    			HeaderTableSpace.flushContent();
    			
			twoPT.addCell(new Phrase("Follow Up  :", subheader));
			twoPT.addCell(new Phrase("" + fobj.getDate(), tabletext));
			
			document.add(twoPT);
			twoPT.flushContent();
			
			HeaderTable5.addCell(new Phrase("", tabletext));
     		HeaderTable5.addCell(new Phrase("", tabletext));
     		 document.add(HeaderTable5);
     		HeaderTable5.flushContent();
		   }
		   // End Follow Up
		
		
			      				
			document.close();
			outStream.close();
			outStream.flush();
		}} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
				+ e.getStackTrace()[0].getClassName() + " Method Name : "
				+ e.getStackTrace()[0].getMethodName() + " Line No :"
				+ e.getStackTrace()[0].getLineNumber());
		}
	%>
</body>
</html>