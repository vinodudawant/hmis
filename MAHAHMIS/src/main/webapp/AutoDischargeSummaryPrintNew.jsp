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
		document.setMargins(20, 20, 90, 145);
		
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
		
		/* int treatmentId = Integer.parseInt(request.getParameter("treatmentId"));
		String  languageOF=request.getParameter("instructionLanguage");
		String  CallFromOPD=request.getParameter("CallFrom");
		String  printTitle=request.getParameter("printTitle");
		String  patientName=request.getParameter("patientName");
		//String idTreatment = request.getParameter("treatmentId");
		//String callFrom = request.getParameter("callFrom");
       String headerFlag="Yes";
       if(CallFromOPD.equalsIgnoreCase("withoutheader")){
    	   headerFlag="No";
       } */
       
		//added header footer
		int treatmentId = Integer.parseInt(request.getParameter("treatID"));
		String  languageOF=request.getParameter("language");
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
		TempEventHandlerIPDPDF event = new TempEventHandlerIPDPDF();
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
		 */}
			
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
		

			/* PdfPTable HeaderTable8 = new PdfPTable(5);
			int[] headerwidth8 = { 22, 20, 40, 5, 20 };
			HeaderTable8.setWidths(headerwidth8);
			HeaderTable8.setWidthPercentage(95f);
		//	HeaderTable8.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable8.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable8.addCell(new Phrase("  ", header));
			if(dischargeType.equals("Dead")){
		HeaderTable8.addCell(new Phrase("  DEATH SUMMARY", header));	
			}else{
			//HeaderTable8.addCell(new Phrase("  DISCHARGE SUMMARY", header));
			HeaderTable8.addCell(new Phrase("", subheader));
			HeaderTable8.addCell(new Phrase("Discharge Summary",
			subheader));
			HeaderTable8.addCell(new Phrase("Date:", subheader));
			HeaderTable8.addCell(new Phrase(todays_date, subheader));
			}		
			document.add(HeaderTable8);
			HeaderTable8.flushContent();		
			 String spLeafName  =""; */
			 
			 	/* PdfPTable HeaderTable21 = new PdfPTable(5);
				int[] headerwidth21 = { 22, 20, 40, 5, 20 };
				HeaderTable21.setWidths(headerwidth21);
				HeaderTable21.setWidthPercentage(95f);
				HeaderTable21.getDefaultCell().setBorder(Rectangle.BOTTOM);

				HeaderTable21.addCell(new Phrase("Discharge Case Paper No:",
						subheader));
				HeaderTable21.addCell(new Phrase("", subheader));
				HeaderTable21.addCell(new Phrase("Discharge Summary",
						subheader));
				HeaderTable21.addCell(new Phrase("Date:", subheader));
				HeaderTable21.addCell(new Phrase(todays_date, subheader));

				document.add(HeaderTable21);
				HeaderTable21.flushContent(); */
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
			//new table no 2 start
			/* PdfPTable HeaderTable2 = new PdfPTable(2);
			int[] headerwidth2 = { 7,46};
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);		
			
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			
			document.add(HeaderTable2);
			HeaderTable2.flushContent(); */
			//End table no 2 start	
			
			
			
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
			
			
			//new table no 3 start
			/* PdfPTable HeaderTable3 = new PdfPTable(5);
			int[] headerwidth3 = { 30,43,20,30,9};
			HeaderTable3.setWidths(headerwidth3);
			HeaderTable3.setWidthPercentage(95f);		
			
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			HeaderTable3.addCell(new Phrase(""+UHID, subheader));
			HeaderTable3.addCell(new Phrase(": "+rtd.getCenterPatientId(), tabletext));
			HeaderTable3.addCell(new Phrase("Age ", subheader));
			HeaderTable3.addCell(new Phrase(": "+ rtd.getAge(), tabletext));
			HeaderTable3.addCell(new Phrase(" ", tabletext));
			

			IpdBillService fetchServlist=(ApplicationContextUtils.getApplicationContext()).getBean(IpdBillService.class);	
			
			BillNobleService fetchSubServlist=(ApplicationContextUtils.getApplicationContext()).getBean(BillNobleService.class);	
			
			List<EhatViewPatientBedDetailsIpdDto> listBedIpdDto2=fetchServlist.getPatientBedBill(treatId,3);
		
			HeaderTable3.addCell(new Phrase("Patient Name    ", subheader));
			HeaderTable3.addCell(new Phrase(": "+ rtd.getPatientName(), tabletext));
			HeaderTable3.addCell(new Phrase("Ward ", subheader));
		//if(listBedIpdDto2.size()>0){	
			if(listBedIpdDto2.size()>0 && listBedIpdDto2.get(0).gethName()!=null){
		HeaderTable3.addCell(new Phrase(": "+listBedIpdDto2.get(0).gethName(), tabletext));
			}
			else
		HeaderTable3.addCell(new Phrase(": "+"", tabletext));
		//}
			
			HeaderTable3.addCell(new Phrase(" ", tabletext));
			
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable3.addCell(new Phrase("Gender", subheader));
			HeaderTable3.addCell(new Phrase(": "+ rtd.getGender(), tabletext));
			HeaderTable3.addCell(new Phrase("Date of Discharge", subheader));
			HeaderTable3.addCell(new Phrase(": "+dischargedate, tabletext));
			HeaderTable3.addCell(new Phrase("  ", tabletext));
			
			HeaderTable3.addCell(new Phrase("Height", subheader));
			HeaderTable3.addCell(new Phrase(": "+ height, tabletext));
			HeaderTable3.addCell(new Phrase("Weight", subheader));
			HeaderTable3.addCell(new Phrase(": "+ weight, tabletext));
			HeaderTable3.addCell(new Phrase("", tabletext));
		
			
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable3.addCell(new Phrase("Res. Address", subheader));
			HeaderTable3.addCell(new Phrase(":"+patientAdd+", "+ addressPatient, tabletext));
			HeaderTable3.addCell(new Phrase("Per. Address ", subheader));
			HeaderTable3.addCell(new Phrase(":"+perPatientAdd+" "+per_patient_address, tabletext));
			HeaderTable3.addCell(new Phrase(" ", tabletext));
			
			HeaderTable3.addCell(new Phrase("Relative Name ", subheader));
			HeaderTable3.addCell(new Phrase(": "+relation+" "+relativeName, tabletext));
			HeaderTable3.addCell(new Phrase("Type", subheader));
			HeaderTable3.addCell(new Phrase(": "+ PType, tabletext));
			HeaderTable3.addCell(new Phrase(" ", tabletext));
			
			HeaderTable3.addCell(new Phrase("Telephone No/Mobile No", subheader));
			HeaderTable3.addCell(new Phrase(": "+ rtd.getMobile(), tabletext));
			HeaderTable3.addCell(new Phrase("IPD NO", subheader));
			HeaderTable3.addCell(new Phrase(": "+ rtd.getOpdipdno(), tabletext));
			HeaderTable3.addCell(new Phrase(" ", tabletext));
			
			HeaderTable3.addCell(new Phrase("Discharge Type", subheader));
			HeaderTable3.addCell(new Phrase(": "+dischargeType, tabletext));
			HeaderTable3.addCell(new Phrase("Ref By", subheader));
			HeaderTable3.addCell(new Phrase(": "+refDocName, tabletext));
			//HeaderTable3.addCell(new Phrase(": "+rtd.getDocNameChan(), tabletext));
			HeaderTable3.addCell(new Phrase(" ", tabletext));
		
			HeaderTable3.addCell(new Phrase("Company Name ",subheader));
			HeaderTable3.addCell(new Phrase(": " + spLeafName, tabletext));
			HeaderTable3.addCell(new Phrase(" ", subheader));
			HeaderTable3.addCell(new Phrase(" ", tabletext));
			HeaderTable3.addCell(new Phrase(" ", tabletext)); */
		
			//AdminModel admodel1 = new AdminModel();
			Doctor doc2 = new Doctor();
			//List<Doctor> listDoc2 = null;
			//System.err.println("sdlfjsdfj-------"+rtd.getDoctorId());
			 if(rtd.getDoctorId().contains(",")){
		
		
		String[] doctors = rtd.getDoctorId().split(",") ;
		String Doc_Nme = "";
		String Depart = "";
		
		for(String str :doctors )
		{
			String DocID = str;
			int docId23 =  Integer.parseInt(str);
		
		
		//listDoc2 = admodel1.getDoctorsDepDetails(docId23);
		//System.err.println("Size-------"+listDoc2.size());
		 //if(listDoc2.size() !=0){
		 Doc_Nme = "";//Doc_Nme + listDoc2.get(0).getDoc_name()+",";
		 Depart = "";//Depart + listDoc2.get(0).getDepartmentName()+",";
		 //System.err.println("sdlfjsdfj-------"+Doc_Nme);
			//}
			
			 
		 }
		/* HeaderTable3.addCell(new Phrase("Consultant", subheader));
		HeaderTable3.addCell(new Phrase(": "+Doc_Nme, tabletext));			
		HeaderTable3.addCell(new Phrase("Department", subheader));
		HeaderTable3.addCell(new Phrase(": "+Depart, tabletext)); */
		
			}
			else{
		if(rtd.getDoctorId() != ""){
		int docId1 =  Integer.parseInt(rtd.getDoctorId());
			
		//listDoc2 = admodel1.getDoctorsDepDetails(docId1);
			
			//HeaderTable3.addCell(new Phrase("Consultant Doc.", subheader));
		
		//	HeaderTable3.addCell(new Phrase(": "+listDoc2.get(0).getDoc_name(), tabletext));			
			//HeaderTable3.addCell(new Phrase("Department", subheader));
		}
		} 
			
			//document.add(HeaderTable3);
			//HeaderTable3.flushContent();			
			//End table no 3 start
			
			
			//new table no 5 start
				PdfPTable HeaderTable5 = new PdfPTable(2);
				int[] headerwidth5 = { 13,46};
				HeaderTable5.setWidths(headerwidth5);
				HeaderTable5.setWidthPercentage(95f);		
				
				HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				
				HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
				//HeaderTable5.addCell(new Phrase("", subheader));
				//HeaderTable5.addCell(new Phrase("", subheader));
				
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
				
			//IPDTreatmentModel objIPDTreatmentModel1 = new IPDTreatmentModel();
			//List<IPDHistoryMaster> arrTN = new ArrayList<IPDHistoryMaster>();
			
				//	arrTN = objIPDTreatmentModel1.fetchIPDHistory(treatIdString);
				
			
				//IPDTreatmentModel IpdTmodel= new IPDTreatmentModel(); //(ApplicationContextUtils.getApplicationContext()).getBean(TreatmentModel.class);
				//IPDHistoryMaster IpdHM = new IPDHistoryMaster();			
				
				
				
				/* List<IPDHistoryMaster> IPDHistoryMasterli = new ArrayList<IPDHistoryMaster>();
				List<IPDHistoryMaster> IPDHistoryCompli = new ArrayList<IPDHistoryMaster>();
				IPDHistoryMasterli=IpdTmodel.fetchIPDHistory(treatIdString); */
				
				OPDHistoryController uss1=(ApplicationContextUtils.getApplicationContext()).getBean(OPDHistoryController.class);
				OPDHistoryService uss2=(ApplicationContextUtils.getApplicationContext()).getBean(OPDHistoryService.class);
				 OPDHistoryMasterDTO historyobj=  uss2.getOPDHistory(treatId);
				 List<OPDHistoryMasterDTO> IPDHistoryMasterli = new ArrayList<OPDHistoryMasterDTO>();
				 if(historyobj!=null ){
			 			IPDHistoryMasterli.add(0, historyobj);
				 }
				
				 System.out.println("-----vffs-------"+IPDHistoryMasterli.toString());
				 
				 
				 
				 
				PdfPTable twoPT = new PdfPTable(2);
				int[] widthInst = { 25, 75 };
				twoPT.setWidths(widthInst);
				twoPT.setWidthPercentage(95f);
				twoPT.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				//START admission Note
				//START admission Note
	
		IPD_AutoSummaryController iauto=(ApplicationContextUtils.getApplicationContext()).getBean(IPD_AutoSummaryController.class);
		IPD_AutoSummaryController objTreatmentModel = new IPD_AutoSummaryController();
			TreatmentDto tobj2 = iauto
			.fetchPatientAdmissionNote(treatment_Id,patient_Id);
			List<TreatmentDto> admissionNotes = tobj2.getListTreatment();
			String tratServ = admissionNotes.get(0).getNotes();
				
	if (adNoteType.equals("true") || type.equals("all") || type.equals("DischargeSummary") || type.equals("DS")
			|| type.equals("DischargeSummaryWithoutHF")) {
		
		
		if (tratServ != "" || tratServ != null) {
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
		Table13.addCell(new Phrase("Admission Note:", subheader));

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
		}//End admission Note
}		
				
				
				 //Start History Data
				  //  int ChiefComplaintsCount = objTN.getListIPdHistoryCompona().size(); 
				 
	if(type.equals("DS")||type.equals("all") ||historyType.equals("true") 
			|| type.equalsIgnoreCase("DischargeSummaryWithoutHF") || type.equalsIgnoreCase("DischargeSummary")){
	    	    	  if (IPDHistoryMasterli.size() != 0) {
	    	    		  
	    	    		  


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
		
		PdfPTable HeaderTableCh = new PdfPTable(3);
		int[] headerwidthCh = {5,5,5 };
		HeaderTableCh.setWidths(headerwidthCh);
		HeaderTableCh.setWidthPercentage(95f);
		HeaderTableCh.getDefaultCell().setBorder(Rectangle.BOX);
		
		
	         if(historyobj !=null){
	        	 HeaderTableH.addCell(new Phrase("Medical Officer:", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getMedicalOfficerName(), tabletext));
	        	 
	        	 HeaderTableH.addCell(new Phrase("MRN No:", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getMrnNo(), tabletext));
	        	 
	        	 document.add(HeaderTableH);
	        	 HeaderTableH.flushContent();
	        	 
	        	 HeaderTable5.addCell(new Phrase("", tabletext));
	  			HeaderTable5.addCell(new Phrase("", tabletext));
	  			 //HeaderTable5.addCell(new Phrase("", tabletext));
	  			/* HeaderTable5.addCell(new Phrase("", tabletext));
	  			 HeaderTable5.addCell(new Phrase("", tabletext));
	   			HeaderTable5.addCell(new Phrase("", tabletext));
	   			 HeaderTable5.addCell(new Phrase("", tabletext)); */
		   		 document.add(HeaderTable5);
	   			HeaderTable5.flushContent();
	        	 
	        	 
		    	 HeaderTableH.addCell(new Phrase("", tabletext));
		    	 HeaderTableH.addCell(new Phrase("", tabletext));
		    	 HeaderTableH.addCell(new Phrase("", tabletext));
		    	 HeaderTableH.addCell(new Phrase("", tabletext));
		    	 
		    	 HeaderTableH.addCell(new Phrase("", tabletext));
		    	 HeaderTableH.addCell(new Phrase("", tabletext));
		    	 HeaderTableH.addCell(new Phrase("", tabletext));
		    	 HeaderTableH.addCell(new Phrase("", tabletext));
		    	 
		    	 HeaderTableH.addCell(new Phrase("", tabletext));
		    	 HeaderTableH.addCell(new Phrase("", tabletext));
		    	 HeaderTableH.addCell(new Phrase("", tabletext));
		    	 HeaderTableH.addCell(new Phrase("", tabletext));
		    	 
		    	 HeaderTableH.addCell(new Phrase("", tabletext));
		    	 HeaderTableH.addCell(new Phrase("", tabletext));
		    	 HeaderTableH.addCell(new Phrase("", tabletext));
		    	 HeaderTableH.addCell(new Phrase("", tabletext));
		 			document.add(HeaderTableH);
		 			HeaderTableH.flushContent();
	 			
	 			
	 			 HeaderTableH.addCell(new Phrase("Chief Complaints and Duration:", subheader));
	        	 HeaderTableH.addCell(new Phrase("", tabletext));
	        	 HeaderTableH.addCell(new Phrase("", tabletext));
	        	 HeaderTableH.addCell(new Phrase("", tabletext));
	        	 
	        	 document.add(HeaderTableH);
	  			 HeaderTableH.flushContent();
	  			
	  			
	  			HeaderTableSpace.addCell(new Phrase("", tabletext));
	  			document.add(HeaderTableSpace);
	  			HeaderTableSpace.flushContent();
	        	
	   	 		
	     			
	     			if(IPDHistoryMasterli.size() > 0){
		     				HeaderTableCh.addCell(new Phrase("#", subheader));
		     				HeaderTableCh.addCell(new Phrase("Chief Complaint", subheader));
		     				HeaderTableCh.addCell(new Phrase("Duration", subheader));
		     		    	/*  int index=1;
		     		    	 for( int i=0;i< IPDHistoryMasterli.size();i++){
		     		    		HeaderTableCh.addCell(new Phrase(""+index, tabletext));
		     		    		HeaderTableCh.addCell(new Phrase(""+IPDHistoryMasterli.get(i).getChiefComplaints(), tabletext));
		     		    		HeaderTableCh.addCell(new Phrase("   "+IPDHistoryMasterli.get(i).getDmDuration() +"   "+IPDHistoryMasterli.get(i).getDmDuration(),tabletext2));
		     		    		index++;
		     		    	 } */
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
	 		    	

	 		    	HeaderTableSpace.addCell(new Phrase("", tabletext));
	      			document.add(HeaderTableSpace);
	      			HeaderTableSpace.flushContent();
	 		    	
	 		    	
	 		    	 HeaderTableH.addCell(new Phrase("Chief Complaints ", subheader));
	            	 HeaderTableH.addCell(new Phrase(""+historyobj.getChiefComplaints(), tabletext));
	            	 HeaderTableH.addCell(new Phrase("Negative History:", subheader));
	            	 HeaderTableH.addCell(new Phrase(""+historyobj.getNegativeHistory(), tabletext));
	            	
	            	 
	            	 document.add(HeaderTableH);
	      			HeaderTableH.flushContent();
	 		    	
	 		    	
	 		    	HeaderTableSpace.addCell(new Phrase("", tabletext));
	      			document.add(HeaderTableSpace);
	      			HeaderTableSpace.flushContent();
	 		    	
	 		    	
	 		    	 HeaderTable5.addCell(new Phrase("", tabletext));
	 	  			HeaderTable5.addCell(new Phrase("", tabletext));
	 	  			/* HeaderTable5.addCell(new Phrase("", tabletext));
	 	  			 HeaderTable5.addCell(new Phrase("", tabletext));
	 	  			 HeaderTable5.addCell(new Phrase("", tabletext));
	 	   			HeaderTable5.addCell(new Phrase("", tabletext));
	 	   			 HeaderTable5.addCell(new Phrase("", tabletext)); */
	 		   		 document.add(HeaderTable5);
	 	   			HeaderTable5.flushContent();
	 	   			
	 	   		 HeaderTableH.addCell(new Phrase("Past/ Personal  History:", subheader));
	        	 HeaderTableH.addCell(new Phrase("", tabletext));
	        	 HeaderTableH.addCell(new Phrase("", tabletext));
	        	 HeaderTableH.addCell(new Phrase("", tabletext));
	        	 
	        	
	        	
	        	 
	        	 document.add(HeaderTableH);
	  			HeaderTableH.flushContent();
	  			
	  			

	  			HeaderTableSpace.addCell(new Phrase("", tabletext));
	  			document.add(HeaderTableSpace);
	  			HeaderTableSpace.flushContent();
	  			
	  			
	  			
	  			if(historyobj.getDmFlag().equalsIgnoreCase("Y") || historyobj.getHtnFlag().equalsIgnoreCase("Y") || historyobj.getIhdFlag().equalsIgnoreCase("Y") || historyobj.getOtherFlag().equalsIgnoreCase("Y")){
	 				HeaderTableCh.addCell(new Phrase("#", subheader));
	 				HeaderTableCh.addCell(new Phrase("Yes/No", subheader));
	 				HeaderTableCh.addCell(new Phrase("Duration", subheader)); 
	 				
	 				if(historyobj.getDmFlag().equalsIgnoreCase("Y")){ 
	 				HeaderTableCh.addCell(new Phrase("DM ", subheader));
	 				HeaderTableCh.addCell(new Phrase(""+historyobj.getDmFlag(), tabletext));
	 				HeaderTableCh.addCell(new Phrase(""+historyobj.getDmDuration(), tabletext)); 
	 				}
	 				
	 				if(historyobj.getHtnFlag().equalsIgnoreCase("Y")){
	 				HeaderTableCh.addCell(new Phrase("HT  ", subheader));
	 				HeaderTableCh.addCell(new Phrase(""+historyobj.getHtnFlag(), tabletext));
	 				HeaderTableCh.addCell(new Phrase(""+historyobj.getHtnDuration(), tabletext)); 
	 				}
	 				
	 				if(historyobj.getIhdFlag().equalsIgnoreCase("Y")){
	 				HeaderTableCh.addCell(new Phrase("IHD  ", subheader));
	 				HeaderTableCh.addCell(new Phrase(""+historyobj.getIhdFlag(), tabletext));
	 				HeaderTableCh.addCell(new Phrase(""+historyobj.getIhdDuration(), tabletext)); 
	 				}
	 				
	 				if(historyobj.getBacopdFlag().equalsIgnoreCase("Y")){
	 	 				HeaderTableCh.addCell(new Phrase("BA/COPD  ", subheader));
	 	 				HeaderTableCh.addCell(new Phrase(""+historyobj.getBacopdFlag(), tabletext));
	 	 				HeaderTableCh.addCell(new Phrase(""+historyobj.getBacopdDuration(), tabletext)); 
	 	 				}
	 				
	 				
	 				if(historyobj.getOtherFlag().equalsIgnoreCase("Y")){
	 				HeaderTableCh.addCell(new Phrase("OTHER  ", subheader));
	 				HeaderTableCh.addCell(new Phrase(""+historyobj.getOtherFlag(), tabletext));
	 				HeaderTableCh.addCell(new Phrase(""+historyobj.getOtherDuration(), tabletext)); 
	 				}
	 				
	 				
	 				
	 			}
	 			
	 			 document.add(HeaderTableCh);
	 			HeaderTableCh.flushContent();
	 			
	 			
	 			HeaderTableSpace.addCell(new Phrase("", tabletext));
	  			document.add(HeaderTableSpace);
	  			HeaderTableSpace.flushContent();
	  			
	  			HeaderTableH.addCell(new Phrase("Medications:", subheader));
	       	 HeaderTableH.addCell(new Phrase(""+historyobj.getMedications(), tabletext));
	       	 HeaderTableH.addCell(new Phrase("Past Surgical History", tabletext));
	       	 HeaderTableH.addCell(new Phrase(""+historyobj.getPastSurgicalHistory(), tabletext));
	       	 
	       	 document.add(HeaderTableH);
		HeaderTableH.flushContent();
		

		HeaderTableSpace.addCell(new Phrase("", tabletext));
		document.add(HeaderTableSpace);
		HeaderTableSpace.flushContent();
	    	
	    			 HeaderTable5.addCell(new Phrase("", tabletext));
		  			 HeaderTable5.addCell(new Phrase("", tabletext));
		  			 /* HeaderTable5.addCell(new Phrase("", tabletext));
		  			 HeaderTable5.addCell(new Phrase("", tabletext));
		  			 HeaderTable5.addCell(new Phrase("", tabletext));
		   			 HeaderTable5.addCell(new Phrase("", tabletext));
		   			 HeaderTable5.addCell(new Phrase("", tabletext)); */
	   		 		document.add(HeaderTable5);
		   			HeaderTable5.flushContent();
		   			
		   		 
	        	 
	        	 HeaderTableH.addCell(new Phrase("GYNAE/OBS History:", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getObsHistory(), tabletext));
	        	 HeaderTableH.addCell(new Phrase("Any allergies or adverse drug  reactions?: ", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getAnyAllergy(), tabletext));
	        	 
	        	 HeaderTableH.addCell(new Phrase("Family History:", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getFamilyHistory(), tabletext));
	        	 HeaderTableH.addCell(new Phrase("Personal History: ", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getPersonalHistory(), tabletext));
	        	 
	        	 document.add(HeaderTableH);
	  			HeaderTableH.flushContent();
	  			
	  			
	  			HeaderTableSpace.addCell(new Phrase("", tabletext));
	  			document.add(HeaderTableSpace);
	  			HeaderTableSpace.flushContent();
	    	
	    	
	    	 		HeaderTable5.addCell(new Phrase("", tabletext));
		  			HeaderTable5.addCell(new Phrase("", tabletext));
		  			 /* HeaderTable5.addCell(new Phrase("", tabletext));
		  			HeaderTable5.addCell(new Phrase("", tabletext));
		  			 HeaderTable5.addCell(new Phrase("", tabletext));
		   			HeaderTable5.addCell(new Phrase("", tabletext));
		   			 HeaderTable5.addCell(new Phrase("", tabletext)); */
	   		 document.add(HeaderTable5);
		   			HeaderTable5.flushContent();
		   			
		   			HeaderTableSpace.addCell(new Phrase("", tabletext));
		  			document.add(HeaderTableSpace);
		  			HeaderTableSpace.flushContent();
		  			
		  			
		  			HeaderTableH.addCell(new Phrase("On Examination:", subheader));
		        	 HeaderTableH.addCell(new Phrase("", tabletext));
		        	 HeaderTableH.addCell(new Phrase(" ", tabletext));
		        	 HeaderTableH.addCell(new Phrase("", tabletext));
		        	 
		        	 
		        	 HeaderTableH.addCell(new Phrase("Temperature:", subheader));
		        	 HeaderTableH.addCell(new Phrase(""+historyobj.getTemperature(), tabletext));
		        	 HeaderTableH.addCell(new Phrase("Pulse: ", subheader));
		        	 HeaderTableH.addCell(new Phrase(""+historyobj.getPulse(), tabletext));
		        	 
		        	 HeaderTableH.addCell(new Phrase("BP:", subheader));
		        	 HeaderTableH.addCell(new Phrase(""+historyobj.getBp(), tabletext));
		        	 HeaderTableH.addCell(new Phrase(" ", subheader));
		        	 HeaderTableH.addCell(new Phrase("", tabletext));
		        	 
		        	 document.add(HeaderTableH);
		  			HeaderTableH.flushContent();
		  			
		  			HeaderTableSpace.addCell(new Phrase("", tabletext));
		  			document.add(HeaderTableSpace);
		  			HeaderTableSpace.flushContent();
		  			
		  			HeaderTableH.addCell(new Phrase("GENERAL EXAM:", subheader));
		        	 HeaderTableH.addCell(new Phrase("", tabletext));
		        	 HeaderTableH.addCell(new Phrase(" ", tabletext));
		        	 HeaderTableH.addCell(new Phrase("", tabletext));
		        	 
		        	 
		        	 HeaderTableH.addCell(new Phrase("Pallor:", subheader));
		        	 HeaderTableH.addCell(new Phrase(""+historyobj.getPallor(), tabletext));
		        	 HeaderTableH.addCell(new Phrase("Clubbing: ", subheader));
		        	 HeaderTableH.addCell(new Phrase(""+historyobj.getClubbing(), tabletext));
		        	 
		        	 HeaderTableH.addCell(new Phrase("Lymph Adenopathy:", subheader));
		        	 HeaderTableH.addCell(new Phrase(""+historyobj.getLymphAdenopathy(), tabletext));
		        	 HeaderTableH.addCell(new Phrase("Icterus: ", subheader));
		        	 HeaderTableH.addCell(new Phrase(""+historyobj.getIcterus(), tabletext));
		        	 
		        	 HeaderTableH.addCell(new Phrase("Oedema:", subheader));
		        	 HeaderTableH.addCell(new Phrase(""+historyobj.getOedema(), tabletext));
		        	 HeaderTableH.addCell(new Phrase(" ", subheader));
		        	 HeaderTableH.addCell(new Phrase("", tabletext));
		        	 
		        	 document.add(HeaderTableH);
		  			HeaderTableH.flushContent();
		  			
		  			
		  			HeaderTableSpace.addCell(new Phrase("", tabletext));
		  			document.add(HeaderTableSpace);
		  			HeaderTableSpace.flushContent();
		    	
		    	
		    	 HeaderTable5.addCell(new Phrase("", tabletext));
	  			HeaderTable5.addCell(new Phrase("", tabletext));
	  			 /* HeaderTable5.addCell(new Phrase("", tabletext));
	  			HeaderTable5.addCell(new Phrase("", tabletext));
	  			 HeaderTable5.addCell(new Phrase("", tabletext));
	   			HeaderTable5.addCell(new Phrase("", tabletext));
	   			 HeaderTable5.addCell(new Phrase("", tabletext)); */
		   		 document.add(HeaderTable5);
	   			HeaderTable5.flushContent();
	   			
	   			HeaderTableSpace.addCell(new Phrase("", tabletext));
	  			document.add(HeaderTableSpace);
	  			HeaderTableSpace.flushContent();
	  			
	  			
	  			 HeaderTableH.addCell(new Phrase("Systematic Examination:", subheader));
	        	 HeaderTableH.addCell(new Phrase("", tabletext));
	        	 HeaderTableH.addCell(new Phrase(" ", subheader));
	        	 HeaderTableH.addCell(new Phrase("", tabletext));
	        	 
	        	 HeaderTableH.addCell(new Phrase("R/S:", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getRs(), tabletext));
	        	 HeaderTableH.addCell(new Phrase("CVS ", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getCvs(), tabletext));
	        	 
	        	 HeaderTableH.addCell(new Phrase("CNS:", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getCns(), tabletext));
	        	 HeaderTableH.addCell(new Phrase("PA ", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getPa(), tabletext));
	        	 
	        	 HeaderTableH.addCell(new Phrase("Local Examinations:", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getLocalExamination(), tabletext));
	        	 HeaderTableH.addCell(new Phrase("Investigation Reports: ", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getInvestigationReport(), tabletext));
	        	 
	        	 HeaderTableH.addCell(new Phrase("Provisional Diagnosis:", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getProvisionalDiagno(), tabletext));
	        	 HeaderTableH.addCell(new Phrase("Treatment Plan: ", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getTreatPlan(), tabletext));
	        	 
	        	 document.add(HeaderTableH);
	  			HeaderTableH.flushContent();
	 			
	  			
	  			HeaderTableSpace.addCell(new Phrase("", tabletext));
	  			document.add(HeaderTableSpace);
	  			HeaderTableSpace.flushContent();
	    	
	    	
	    	 		HeaderTable5.addCell(new Phrase("", tabletext));
		  			HeaderTable5.addCell(new Phrase("", tabletext));
		  			 /* HeaderTable5.addCell(new Phrase("", tabletext));
		  			HeaderTable5.addCell(new Phrase("", tabletext));
		  			 HeaderTable5.addCell(new Phrase("", tabletext));
		   			HeaderTable5.addCell(new Phrase("", tabletext));
		   			 HeaderTable5.addCell(new Phrase("", tabletext)); */
	   		 		document.add(HeaderTable5);
		   			HeaderTable5.flushContent();
		   			
		   			HeaderTableSpace.addCell(new Phrase("", tabletext));
		  			document.add(HeaderTableSpace);
		  			HeaderTableSpace.flushContent();
		  			
	     			
	     			
	     				
	     			}
	        	 
	        	 
	         //End History Datas
	        	
	    	    	  }	
	    	    	   
	    	    	  PdfPTable twoPT3 = new PdfPTable(2);
	    				int[] widthInst3 = { 25, 75 };
	    				twoPT3.setWidths(widthInst3);
	    				twoPT3.setWidthPercentage(95f);
	    				twoPT3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	    					
	    				PatientChemoController pcc=(ApplicationContextUtils.getApplicationContext()).getBean(PatientChemoController.class);
	    				List<PatientChemoDto> pcd = new ArrayList<PatientChemoDto>();	
	    				
	    				String callFrom = "allChemo";
	    				String date1 = "";
	    				pcd=pcc.getPatChemoTherapyAll(treatId,callFrom,date1);
	    				
	    				
	    				if(!pcd.isEmpty()){
	    					twoPT3.addCell(new Phrase("Chemotherapy : ",subheader));
	    					twoPT3.addCell(new Phrase("",subheader));
	    					document.add(twoPT3);
	    					twoPT3.flushContent(); 
	    					for(int i=0;i<pcd.size();i++){
	    						twoPT3.addCell(new Phrase("",subheader));
	    						twoPT3.addCell(new Phrase("Chemotherapy Protocol : "+pcd.get(i).getChemoName()+"       	Chemo Date :"+pcd.get(i).getChemoDt(),subheader));
	    						twoPT3.addCell(new Phrase("",subheader));
	    						twoPT3.addCell(new Phrase(
	    								pcd.get(i).getChemoIndication()
	    								+","+pcd.get(i).getPatWeight()
	    								+","+pcd.get(i).getPatHeight()
	    								+","+pcd.get(i).getPatBsa()
	    								+","+pcd.get(i).getPatBlodOrd()
	    								+","+pcd.get(i).getPatAllergies()
	    								+","+pcd.get(i).getPatHistory()
	    								+","+pcd.get(i).getPatFreq()
	    								+","+pcd.get(i).getNoOfCycle()
	    								+","+pcd.get(i).getPatDose()
	    								+","+pcd.get(i).getPatInvest()
	    								+","+pcd.get(i).getChemoOrders()
	    								+","+pcd.get(i).getPostMed()
	    								+","+pcd.get(i).getChemoAdvice()
	    								+","+pcd.get(i).getNextBldDt()
	    								+","+pcd.get(i).getNxtChemoDt()
	    								+","+pcd.get(i).getNxtVisDt(),tabletext));
	    						twoPT3.addCell(new Phrase("",subheader));
	    						twoPT3.addCell(new Phrase("",subheader));
	    					}
	    					
	    					document.add(twoPT3);
	    					twoPT3.flushContent(); 
	    					
	    					 HeaderTable31.addCell(new Phrase("", tabletext));
	    					 document.add(HeaderTable31);
	    					 HeaderTable31.flushContent();
	    				}
	    				//End Chemo
	    				
	    				//Start Care Advices
	    				List<PatientCareAdvicesDto> pcad = new ArrayList<PatientCareAdvicesDto>();	
	    				
	    				pcad=pcc.getPatCareAdvices2(treatId);
	    				
	    				
	    			 	if(!pcad.isEmpty()){
	    				if (!pcad.get(0).getPallCare().equals("")) {

	    					twoPT22.addCell(new Phrase("Palliative Care Advice: ", subheader));
	    										
	    					twoPT22.addCell(new Phrase("" + ((pcad.get(0).getPallCare())
	    									), tabletext));
	    					
	    					
	    					twoPT22.addCell(new Phrase("", subheader));
	    					twoPT22.addCell(new Phrase("", tabletext));

	    					document.add(twoPT22);
	    					twoPT22.flushContent(); 
	    				 
	    				}
	    				
	    				if (!pcad.get(0).getSuppCare().equals("")) {

	    					twoPT22.addCell(new Phrase("Supportive Care Advice: ", subheader));
	    										
	    					twoPT22.addCell(new Phrase("" + ((pcad.get(0).getSuppCare())
	    									), tabletext));
	    					
	    					
	    					twoPT22.addCell(new Phrase("", subheader));
	    					twoPT22.addCell(new Phrase("", tabletext));

	    					document.add(twoPT22);
	    					twoPT22.flushContent(); 
	    			
	    				}
	    				
	    				if (!pcad.get(0).getPrevCare().equals("")) {

	    					twoPT22.addCell(new Phrase("Preventive Care Advice: ", subheader));
	    										
	    					twoPT22.addCell(new Phrase("" + ((pcad.get(0).getPrevCare())
	    									), tabletext));
	    					
	    					twoPT22.addCell(new Phrase("", subheader));
	    					twoPT22.addCell(new Phrase("", tabletext));

	    					document.add(twoPT22);
	    					twoPT22.flushContent(); 
	    					
	    				}
	    				if (!pcad.get(0).getRehabCare().equals("")) {

	    					twoPT22.addCell(new Phrase("Rehabilitative Care Advice: ", subheader));
	    										
	    					twoPT22.addCell(new Phrase("" 
	    					+ ((pcad.get(0).getRehabCare())), tabletext));
	    					twoPT22.addCell(new Phrase("", subheader));
	    					twoPT22.addCell(new Phrase("", tabletext));

	    					document.add(twoPT22);
	    					twoPT22.flushContent(); 
	    					
	    				}
	    				if (!pcad.get(0).getOtherServ().equals("")) {

	    					twoPT22.addCell(new Phrase("Other Care Advice: ", subheader));
	    										
	    					twoPT22.addCell(new Phrase("" + ((pcad.get(0).getOtherServ())
	    									), tabletext));
	    					
	    					
	    					twoPT22.addCell(new Phrase("", subheader));
	    					twoPT22.addCell(new Phrase("", tabletext));

	    					document.add(twoPT22);
	    					twoPT22.flushContent(); 
	    					
	    				} 
	    				 HeaderTable31.addCell(new Phrase("", tabletext));
	    				 document.add(HeaderTable31);
	    				 HeaderTable31.flushContent();
	    			} //End Care Advices
	    			
	    			
	    			 	//Start Lab

	    				PdfPTable twoPT221 = new PdfPTable(4);
	    				int[] widthInst221 = { 13, 15, 25 ,25};
	    				twoPT221.setWidths(widthInst221);
	    				twoPT221.setWidthPercentage(95f);
	    				twoPT221.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	    	      
	    				
	    		   DoctordeskController obj1=(ApplicationContextUtils.getApplicationContext()).getBean(DoctordeskController.class);
	                
	               LabProfile labObj=new LabProfile();
	                List proLi = new ArrayList();
	                String callFrom1 = "autodischargesum";
	                labObj= obj1.fetchLabTestResult(0, 0, 0, treatId,"", callFrom1, request);//fetchLabTestResult(0, 0, 0, treatId,"", callFrom1, request);
	                proLi=labObj.getProfileli();
	                ArrayList<LabProfile> labProfileIsEmpty = (ArrayList<LabProfile>) proLi.get(0);
	                int paksize = labProfileIsEmpty.size();
	                ArrayList<LabProfile> labProfile = (ArrayList<LabProfile>) proLi.get(0);

	            /*  DiagnosticsService diagnosticsService=(ApplicationContextUtils.getApplicationContext()).getBean(DiagnosticsService.class);
	    			
	   		     List<LabUnitType> list = diagnosticsService.getRoutinevalueResutlPreEmployeePatient(treatId,request); */
	   			 
	   		 	/* DoctorDeskService uss3  =(ApplicationContextUtils.getApplicationContext()).getBean(DoctorDeskService.class);
		      	List<CpoeIPDdetails> listPrescriptionsSP = new ArrayList<>();	
		      	listPrescriptionsSP =  uss3.getlistservciesipdcopenew(treatmentId,callform,request);  // data by stored procedure
		      	
		      	
	   		     
	             if (list.size() > 0) {
	                	
	                	twoPT221.addCell(new Phrase("Lab Reports :", subheader));
	     				
	                	twoPT221.addCell(new Phrase("Profile(Pakage Name)", subheader));
	     				
	                	twoPT221.addCell(new Phrase("Test Name", subheader));
	     				
	                	twoPT221.addCell(new Phrase("Test Result", subheader));
	     				
	     				 
	                	twoPT221.addCell(new Phrase("", subheader));
	                    
	                	twoPT221.addCell(new Phrase("", subheader));
	                     
	                	twoPT221.addCell(new Phrase("", subheader));
	                     
	                	twoPT221.addCell(new Phrase("", subheader));
	                     
	                	//int psize = labProfileIsEmpty.size();
	                	 String pkgname1="";
	                for (int pro = 0; pro < list.size(); pro++) {
	                		System.err.println(list.get(pro).getPkgName()+"DDDDDDDD");
	                		
	                	twoPT221.addCell(new Phrase("", subheader));
	                	pkgname1 = list.get(pro).getPkgName();
	                	 if(pkgname1 == null || pkgname1.equalsIgnoreCase("null")){     					
	                		pkgname1 = " ";
	    				}else{
	    					 pkgname1 = list.get(pro).getPkgName();
	    				}
	                	               	         				
	                	    twoPT221.addCell(new Phrase(list.get(pro).getProfilename()+"("+pkgname1+")", subheader));               		               		
	                	         				
	         				twoPT221.addCell(new Phrase("", subheader));
	         				twoPT221.addCell(new Phrase("", subheader));         				
	 	                      
	    	                for (int i = 0; i < list.get(pro).getTestli().size(); i++) {

	    	                            int ti = list.get(pro).getTestli().get(i).getTestId();

	    	                            if (ti != 0) {

	    	                                String tn = list.get(pro).getTestli().get(i).getTestname();   	                              
	    	                                String tr = list.get(pro).getTestli().get(i).getTestResult();
	    	                                
	    	                                tr = tr.replaceAll("&nbsp;", "");
	    	                            //  String tc = tst.get(ts).getTestCode();
	    	                                
	    	                                twoPT221.addCell(new Phrase("", subheader));
	    	                                twoPT221.addCell(new Phrase("", subheader));
	    	                 				twoPT221.addCell(new Phrase(tn, tabletext));
	    	                 				twoPT221.addCell(new Phrase(tr, tabletext));

	    	                            }else{
	    	                            	String testINproName = list.get(pro).getTestli().get(i).getTestname();
	    	                            	twoPT221.addCell(new Phrase("", subheader));
	    	                                twoPT221.addCell(new Phrase("", subheader));
	    	                 				twoPT221.addCell(new Phrase(testINproName, subheader));
	    	                 				twoPT221.addCell(new Phrase("", subheader));
	    	                            }
	    	                          
	    	            				document.add(twoPT221);
	    	            				twoPT221.flushContent(); 
	    	                        }
	    	                        HeaderTable31.addCell(new Phrase("", tabletext));
	                				document.add(HeaderTable31);
	                				HeaderTable31.flushContent();
	    	                  
	               	}
	                }else if(labProfileIsEmpty.size() > 0)
	                {
	                	twoPT221.addCell(new Phrase("Lab Reports :", subheader));
	     				twoPT221.addCell(new Phrase("Profile(Pakage Name)", subheader));
	     				twoPT221.addCell(new Phrase("Test Name", subheader));
	     				twoPT221.addCell(new Phrase("Test Result", subheader));
	     				
	     				 twoPT221.addCell(new Phrase("", subheader));
	                     twoPT221.addCell(new Phrase("", subheader));
	                     twoPT221.addCell(new Phrase("", subheader));
	                     twoPT221.addCell(new Phrase("", subheader));
	                     
	                	int psize = labProfileIsEmpty.size();
	                	
	                	for (int pro = 0; pro < psize; pro++) {
	                		
	                		twoPT221.addCell(new Phrase("", subheader));
	                		if(!labProfileIsEmpty.get(pro).getPkgName().equals("-")){
	         				twoPT221.addCell(new Phrase(labProfileIsEmpty.get(pro).getProfileName()+"("+labProfileIsEmpty.get(pro).getPkgName()+")", subheader));
	                		}else{
	                			twoPT221.addCell(new Phrase(labProfileIsEmpty.get(pro).getProfileName(), subheader));
	                		}
	         				
	         				twoPT221.addCell(new Phrase("", subheader));
	         				twoPT221.addCell(new Phrase("", subheader));
	         				/* if(!labProfileIsEmpty.get(pro).getProfileName().equals("-")){
	         				twoPT22.addCell(new Phrase(labProfileIsEmpty.get(pro).getProfileName(), subheader));
	         				}else{
	         					twoPT22.addCell(new Phrase("", subheader));
	         				} */
	         				
	                		/* System.err.println("Sign>>"+labProfileIsEmpty.get(pro).getPkgName());
	                		System.err.println("Name>>"+labProfileIsEmpty.get(pro).getProfileName()); 
	                		
	                		
	               		 ArrayList<Integer> testids = new ArrayList<Integer>();
	               		 ArrayList<Integer> testNullval = new ArrayList<Integer>();
	               		
	               		
	               		 String proname = labProfileIsEmpty.get(pro).getProfileName();
	               		 int pid  = labProfileIsEmpty.get(pro).getIdprofile();
	               		 
	               		 
	               		ArrayList<LabTest> tst = (ArrayList<LabTest>) labProfile
	    	                                .get(pro).getTestli();

	    	                        int tsize = tst.size();
	    	                        int tcn = 1;
	    	                        for (int ts = 0; ts < tsize; ts++) {

	    	                            int ti = tst.get(ts).getIdTest();

	    	                            if (ti != 0) {

	    	                                String tn = tst.get(ts).getTestName();
	    	                                String tc = tst.get(ts).getTestCode();
	    	                                String tr = tst.get(ts).getTestResult();
	    	                                tr = tr.replaceAll("&nbsp;", "");
	    	                               
	    	                                twoPT221.addCell(new Phrase("", subheader));
	    	                                twoPT221.addCell(new Phrase("", subheader));
	    	                 				twoPT221.addCell(new Phrase(tn, tabletext));
	    	                 				twoPT221.addCell(new Phrase(tr, tabletext));

	    	                            }else{
	    	                            	String testINproName = tst.get(ts)
	    	                                        .getTestName();
	    	                            	twoPT221.addCell(new Phrase("", subheader));
	    	                                twoPT221.addCell(new Phrase("", subheader));
	    	                 				twoPT221.addCell(new Phrase(testINproName, subheader));
	    	                 				twoPT221.addCell(new Phrase("", subheader));
	    	                            }
	    	                          
	    	            				document.add(twoPT221);
	    	            				twoPT221.flushContent(); 
	    	                        }
	    	                        HeaderTable31.addCell(new Phrase("", tabletext));
	                				document.add(HeaderTable31);
	                				HeaderTable31.flushContent();
	    	                  
	               	}
	                
	                	
	                }	 */
	                	
	    //End Lab
	    		
	              //Start RIS Report
	                
	                twoPT221.addCell(new Phrase("RIS Reports :", subheader));
	                twoPT221.addCell(new Phrase("", subheader));
	                twoPT221.addCell(new Phrase("", subheader));
	                 
	                twoPT221.addCell(new Phrase("", subheader));
	                twoPT221.addCell(new Phrase("", subheader));
	                twoPT221.addCell(new Phrase("", subheader));
	              
	            
	                       
	                  RisController risController=(ApplicationContextUtils.getApplicationContext()).getBean(RisController.class);
	                  RadiologyTemplateReportDTO rtd1 = new RadiologyTemplateReportDTO();  
	                  
	                  rtd1 = risController.getPatientAllRisTestReport(treatId);
	                  
	                 System.err.println("SIZZZZZZ"+rtd1.getListRadiologyTempReportDTO().size());
	                  
	                 PdfPTable HeaderTable32 = new PdfPTable(1);
	                  int[] headerwidth32 = {100};
	                  HeaderTable32.setWidths(headerwidth32);
	                  HeaderTable32.setWidthPercentage(95f);
	                  HeaderTable32.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	                  StyleSheet styleSheet = new StyleSheet();
	                  styleSheet.loadTagStyle("body", "size", "90px");
	                  styleSheet.loadTagStyle("p", "size", " 100px");
	                  HTMLWorker htmlWorker = new HTMLWorker(document);
	                  htmlWorker.setMargins(50, 100, 100, 150);
	                  Paragraph paragraph = new Paragraph();
	                  
	                  PdfPTable HeaderTable33 = new PdfPTable(2);
	                  int[] headerwidth30 = {25,75};
	                  HeaderTable33.setWidths(headerwidth30);
	                  HeaderTable33.setWidthPercentage(95f);
	                  HeaderTable33.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	                  htmlWorker.setMargins(50, 100, 100, 150);
	                  
	                  if(rtd1.getListRadiologyTempReportDTO().size()>0){
	                	     document.add(twoPT221);
	                         twoPT221.flushContent();
	                  for(int i=0;i<rtd1.getListRadiologyTempReportDTO().size();i++){
	                      String testName = "";
	                      testName = fetchlist.getStringValOfObject("ehat_subservice","category_name",rtd1.getListRadiologyTempReportDTO().get(i).getTestId(),"id");
	                      System.err.println("testName"+testName);
	                      twoPT221.addCell(new Phrase(""+testName, subheader));
	                      twoPT221.addCell(new Phrase(""+rtd1.getListRadiologyTempReportDTO().get(i).getCreatedDate(), subheader));
	                      twoPT221.addCell(new Phrase("", subheader));
	                         
	                      document.add(twoPT221);
	                      twoPT221.flushContent();
	                           
	                  java.util.List<Element> ie1 = HTMLWorker.parseToList(new StringReader(rtd1.getListRadiologyTempReportDTO().get(i).getTemplateData()), styleSheet);
	                     for (Element element : ie1) {
	                         if (element instanceof PdfPTable)
	                         {
	                             PdfPTable htmlTable = new PdfPTable(2);
	                             int[] htmlTableWidth = {25,75};
	                                               htmlTable.setWidths(htmlTableWidth);
	                             htmlTable.setWidths(htmlTableWidth);
	                             htmlTable.setWidthPercentage(50f);
	                             htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	                             htmlTable = (PdfPTable)element;
	                             HeaderTable33.addCell(htmlTable);
	                             HeaderTable33.addCell(new Phrase("", subheader));
	                             HeaderTable33.addCell(new Phrase("", subheader));
	                             document.add(HeaderTable33);
	                             HeaderTable33.flushContent();
	                         }else{
	                             paragraph.add(element);
	                             cell = new PdfPCell(paragraph);
	                             cell.setBorder(Rectangle.NO_BORDER);
	                             HeaderTable33.addCell(cell);
	                             HeaderTable33.addCell(new Phrase("", subheader));
	                             HeaderTable33.addCell(new Phrase("", subheader));
	                             document.add(HeaderTable33);
	                             HeaderTable33.flushContent();
	                             paragraph.clear();
	                            
	                         }
	                     }  
	                     }
	                 HeaderTable33.addCell(new Phrase("", subheader));
	                 HeaderTable33.addCell(new Phrase("", subheader));
	                 document.add(HeaderTable33);
	                 HeaderTable33.flushContent();
	                 }
	             //End RIS Report   
	    	    	  
				 }
				
				 


					
					///////////////////////////////////////////////////
					
					//fetch treatment detail // added by vishant
				List<OPDPrescriptionDtoSP> listPrescription = new ArrayList<OPDPrescriptionDtoSP>();
				//int unitId=1;
				PrescriptionService dischargeService =(ApplicationContextUtils.getApplicationContext()).getBean(PrescriptionService.class);
				listPrescription = dischargeService.getAllPrescriptionsByTreatmentId(treatId, unitId);
				//listPrescription=IpdTmodel.featchOrderFormByDate(currDate, treatIdString, "previous");
					 	
					
					DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
					
					Date date = new Date();
					String currDate=dateFormat.format(date);
					
					if( type.equals("DischargeSummary") ||type.equals("DS")||type.equals("all")|| type.equals("DischargeSummaryWithoutHF")){
						if(IPDHistoryMasterli.size() > 0)
						{ 
					//IPDHistoryMasterli=IpdTmodel.fetchIPDHistory(treatIdString);
					
						
						PdfPTable HeaderTable7 = new PdfPTable(1);
						int[] headerwidth7 = {100};
						HeaderTable7.setWidths(headerwidth7);
						HeaderTable7.setWidthPercentage(95f);		
						
						HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						HeaderTable7.addCell(new Phrase("", subheader));
						HeaderTable7.addCell(new Phrase("", subheader));
						
						/*****************New Instruction Table***********************/
						HeaderTable7.addCell(new Phrase("PHYSICAL EXAMINATION :   ", subheader));
						
						HeaderTable7.addCell(new Phrase("O/E :", tabletext));
						HeaderTable7.addCell(new Phrase("", subheader));
						HeaderTable7.addCell(new Phrase("VITALS -", tabletext));
						HeaderTable7.addCell(new Phrase("Temperature -"+IPDHistoryMasterli.get(0).getTemperature(), tabletext));
						HeaderTable7.addCell(new Phrase("Pulse -"+IPDHistoryMasterli.get(0).getPulse(), tabletext));
						HeaderTable7.addCell(new Phrase("", subheader));
						
						HeaderTable7.addCell(new Phrase("General Exam -", tabletext));
						HeaderTable7.addCell(new Phrase("Pallor -"+IPDHistoryMasterli.get(0).getPallor(), tabletext));
						HeaderTable7.addCell(new Phrase("Clubbing -"+IPDHistoryMasterli.get(0).getClubbing(), tabletext));
						HeaderTable7.addCell(new Phrase("Icterus -"+IPDHistoryMasterli.get(0).getIcterus(), tabletext));
						HeaderTable7.addCell(new Phrase("Oedema -"+IPDHistoryMasterli.get(0).getOedema(), tabletext));
						HeaderTable7.addCell(new Phrase("Lymph Adenopathy -"+IPDHistoryMasterli.get(0).getLymphAdenopathy(), tabletext));
						HeaderTable7.addCell(new Phrase("", subheader));
						
						
						
						HeaderTable7.addCell(new Phrase("S/E :", tabletext));			
						HeaderTable7.addCell(new Phrase("CVS -"+IPDHistoryMasterli.get(0).getCvs(), tabletext));
						HeaderTable7.addCell(new Phrase("CNS -"+IPDHistoryMasterli.get(0).getCns(), tabletext));
						HeaderTable7.addCell(new Phrase("R/S -"+IPDHistoryMasterli.get(0).getRs(), tabletext));
						HeaderTable7.addCell(new Phrase("P/A -"+IPDHistoryMasterli.get(0).getPa(), tabletext));
						
						AdminModel Treatmodel= new AdminModel();
						CustomizeTemplate cT= new CustomizeTemplate();
						//List<CustomizeTemplate> customizeTemplateList = new ArrayList<CustomizeTemplate>();
						//List<CustomizeTemplate> patientHistoryTemplateList = new ArrayList<CustomizeTemplate>();
						
						//patientHistoryTemplateList = Treatmodel.fetchCKEditorDocterDesk1(treatIdString);
						
						/*  if(Treatmodel != null && patientHistoryTemplateList.size() > 0)
						{
					
						patientHistoryTemplateList = Treatmodel.fetchCKEditorDocterDesk1(treatIdString);
						
						//String a=patientHistoryTemplateList.get(0).getTemp_data();
						String s = Jsoup.parse(patientHistoryTemplateList.get(0).getTemp_data()).text();
						
						HeaderTable7.addCell(new Phrase(" "+s, tabletext));		
						
						}   */
						 HeaderTable7.addCell(new Phrase(" ", subheader));
						 			 
						 HeaderTable7.addCell(new Phrase("SUMMARY OF HOSPITALI COURSE :   ", subheader));
						 HeaderTable7.addCell(new Phrase("MEDICATIONS -", tabletext));
						 
						
						 
						 for(int i=0;i<listPrescription.size();i++){
						//for(int j=0;j < listPrescription.get(i).getOrder_comp_drugesList().size();j++){
					
					 		//HeaderTable7.addCell(new Phrase(""+listPrescription.get(i).getDose(), tabletext));
					
						//}
							}
						 
						 
						 HeaderTable7.addCell(new Phrase(" ", subheader));
						 HeaderTable7.addCell(new Phrase("REVIEW  :   ", subheader));
						 
						
						document.add(HeaderTable7);
						HeaderTable7.flushContent();
						
						HeaderTable7.getDefaultCell().setBorder(Rectangle.BOTTOM);
						HeaderTable7.addCell(new Phrase("", subheader));
						document.add(HeaderTable7);
						HeaderTable7.flushContent();
						
						}
						
					}
					
					
					
					
					
					Treatment obj =new Treatment();
					obj.setTreatment_ID(treatId);
					obj.setPatient_ID(patID);
					//String tratServ=treatmentModel.fetchPatientAdmissionNote(obj);
					
					// Start: part-1
				/* IPD_AutoSummaryController iauto=(ApplicationContextUtils.getApplicationContext()).getBean(IPD_AutoSummaryController.class);
				IPD_AutoSummaryController objTreatmentModel = new IPD_AutoSummaryController();
				TreatmentDto tobj2 = iauto
				.fetchPatientAdmissionNote(treatment_Id,patient_Id);
				List<TreatmentDto> admissionNotes = tobj2.getListTreatment();
				String tratServ = admissionNotes.get(0).getNotes(); */
				System.out.println("--------------"+tratServ);	
					//new table no 6 start
					// Fetch Provisional & FINAL Diagnosis
					/*  TreatmentModel Tmodel= new TreatmentModel(); //(ApplicationContextUtils.getApplicationContext()).getBean(TreatmentModel.class);
					 Assessment ass = new Assessment();			
					
					List<Assessment> arrAssessments = new ArrayList<Assessment>();
					arrAssessments=Tmodel.fetchAssessment(treatIdString); */
					
					 //start dignosis info
					         DiagonosisController daignocontrooler=(ApplicationContextUtils.getApplicationContext()).getBean(DiagonosisController.class);
					         DiagonosisService diagnoservice=(ApplicationContextUtils.getApplicationContext()).getBean(DiagonosisService.class);
					         List<DiagonosisMasterDto> arrAssessments=  diagnoservice.getListOfDiagoList(Integer.parseInt(treatIdString));
					         		
					         if( type.equals("DischargeSummary") ||type.equals("DS")||type.equals("all") || type.equals("DischargeSummaryWithoutHF")){
					 			if(arrAssessments.size() > 0 )
								{  
							//arrAssessments=Tmodel.fetchAssessment(treatIdString);
							//ass=arrAssessments.get(0);
							
							//ass.getDiagno_description();
							
							
								PdfPTable HeaderTable6 = new PdfPTable(2);
								int[] headerwidth6 = {25,75};
								HeaderTable6.setWidths(headerwidth6);
								HeaderTable6.setWidthPercentage(95f);		
								
								HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								HeaderTable6.addCell(new Phrase("", subheader));
								HeaderTable6.addCell(new Phrase("", subheader));
								
								HeaderTable6.addCell(new Phrase("Provisional Diagnosis  :  ", subheader));
								HeaderTable6.addCell(new Phrase("", subheader));
								for ( int i = 0; i < arrAssessments.size(); i++) 
								{
							if(arrAssessments.get(i).getDiagnoType().equalsIgnoreCase("Provisional")){
								HeaderTable6.addCell(new Phrase("", subheader));
								HeaderTable6.addCell(new Phrase(arrAssessments.get(i).getDiagndesc()+", "+arrAssessments.get(i).getIcd10_code(), tabletext));
							}				
								}
								
								
								document.add(HeaderTable6);
								HeaderTable6.flushContent();
								HeaderTable6.addCell(new Phrase("", subheader));
								HeaderTable6.addCell(new Phrase("", subheader));
								
								HeaderTable5.addCell(new Phrase("", subheader));
								HeaderTable5.addCell(new Phrase("", subheader));
								document.add(HeaderTable5);
								HeaderTable5.flushContent();
								
								HeaderTable6.addCell(new Phrase("Final Diagnosis  :    ", subheader));
								HeaderTable6.addCell(new Phrase("", subheader));
								for ( int i = 0; i < arrAssessments.size(); i++) {
							if(arrAssessments.get(i).getDiagnoType().equalsIgnoreCase("Confirmed")){
								HeaderTable6.addCell(new Phrase("", subheader));
								HeaderTable6.addCell(new Phrase(arrAssessments.get(i).getDiagndesc()+", "+arrAssessments.get(i).getIcd10_code(), tabletext));
							}				
								}
								HeaderTable6.getDefaultCell().setBorder(Rectangle.BOTTOM);
								HeaderTable6.addCell(new Phrase("", subheader));
								HeaderTable6.addCell(new Phrase("", subheader));
								
								document.add(HeaderTable6);
								HeaderTable6.flushContent();
							 }
					      }
					       //End table no 6 start
							 //Start Investigation
							
							
							//DoctordeskController recpt=(ApplicationContextUtils.getApplicationContext()).getBean(DoctordeskController.class);
							/* CpoeIPDdetails icd = new CpoeIPDdetails();
							List<CpoeIPDdetails> listBillReceiptMaster = null;
							List<CpoeIPDdetails> listBillReceiptMaster1 = new ArrayList<CpoeIPDdetails>();
							icd=recpt.fetchipddetails(treatId,"default",request );
							listBillReceiptMaster=icd.getCpoeServdetails(); */
							
							// Start: Part-12 Investigation	
							DoctordeskController objPathologyModel=(ApplicationContextUtils.getApplicationContext()).getBean(DoctordeskController.class);
							CpoeIPDdetails TestDashboard = objPathologyModel
							.fetchipddetailsdrdesknew(treatId,pid,request);
							List<CpoeIPDdetails> listBillReceiptMaster = TestDashboard.getCpoeServdetails();
							//listBillReceiptMaster=icd.getCpoeServdetails();
						System.out.println("typeeeeee-----"+invesType);	
						
						if( type.equals("DischargeSummary") ||type.equals("DS")||type.equals("all") || type.equals("DischargeSummaryWithoutHF")||invesType.equals("true")){
							if (listBillReceiptMaster.size() != 0) {
								PdfPTable HeaderTable6 = new PdfPTable(6);
								int[] headerwidth6 = { 30, 30, 44, 24, 16, 20 };
								HeaderTable6.setWidths(headerwidth6);
								HeaderTable6.setWidthPercentage(95f);
								HeaderTable6.getDefaultCell().setBorder(Rectangle.BOTTOM);
								
								PdfPTable twoPT2 = new PdfPTable(2);
								int[] widthInst2 = { 25, 75 };
								twoPT2.setWidths(widthInst2);
								twoPT2.setWidthPercentage(95f);
								twoPT2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								
								twoPT2.addCell(new Phrase("Test Details : " ,subheader));
								twoPT2.addCell(new Phrase("" ,subheader));
								for (int i = 0; i < listBillReceiptMaster.size(); i++) {
									 
									twoPT2.addCell(new Phrase("" ,subheader));
									twoPT2.addCell(new Phrase(listBillReceiptMaster.get(i).getCategoryName()+","+listBillReceiptMaster.get(i).getCreated_date_time()+","+listBillReceiptMaster.get(i).getServicename(),tabletext));
									
									twoPT2.addCell(new Phrase("" ,subheader));
									twoPT2.addCell(new Phrase("" ,subheader));
									
									twoPT2.addCell(new Phrase("" ,subheader));
									twoPT2.addCell(new Phrase("" ,subheader));
									
									document.add(twoPT2);
									twoPT2.flushContent();
								 }
								
								 HeaderTable31.addCell(new Phrase("", tabletext));
								 document.add(HeaderTable31);
							     HeaderTable31.flushContent();
								}
							
						
						}//End Investigation
						
						//IPDTreatmentModel objIPDTreatmentModel = new IPDTreatmentModel();
						IPD_AutoSummaryService objIPDTreatmentModel= (ApplicationContextUtils.getApplicationContext()).getBean(IPD_AutoSummaryService.class);
						List<DischargeSummery> dsList = objIPDTreatmentModel.fetchAutoDischargeSummery(treatId);
						
						if( type.equals("DischargeSummary") ||type.equals("DS")||type.equals("all") || type.equals("DischargeSummaryWithoutHF")||type.equals("invest")){
							   if (dsList != null && dsList.size() != 0
										&& dsList.size() > 0) {
										 for(int i = 0; i < dsList.size(); i++){
									 if (dsList.get(i).getSpl_investigation() != null
										&& !dsList.get(i).getSpl_investigation().equals("undefined")
										&& !dsList.get(i).getSpl_investigation().equals(""))
									 {
										twoPT.addCell(new Phrase("Special Investigation :", subheader));
										twoPT.addCell(new Phrase("" + dsList.get(i).getSpl_investigation(), tabletext));
									 
										HeaderTable31.addCell(new Phrase("", tabletext));
									 }
									 document.add(twoPT);
									 twoPT.flushContent();
									 
									 
									 document.add(HeaderTable31);
									 HeaderTable31.flushContent();
										 }
										 }
									   //End Special Investigation
						}
						
						//Start Order Form
						PdfPTable HeaderTable7 = new PdfPTable(6);
						int[] headerwidth7 = { 10, 30, 44, 24, 16, 20 };
						HeaderTable7.setWidths(headerwidth7);
						HeaderTable7.setWidthPercentage(95f);
						HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);

						Font tabletextU = null;
						try {

							String osName = System.getProperty("os.name");

							if (osName.equalsIgnoreCase("Linux")) {
						tabletextU = new Font(BaseFont.createFont(
						"/usr/share/fonts/ARIALUNI/ARIALUNI.TTF",
						BaseFont.IDENTITY_H, BaseFont.EMBEDDED), 10,
						Font.NORMAL);
							} else {
						tabletextU = new Font(BaseFont.createFont(
						"c:/windows/fonts/ARIALUNI.TTF",
						BaseFont.IDENTITY_H, BaseFont.EMBEDDED), 10,
						Font.NORMAL);
							}

						} catch (Exception e2) {
							tabletextU = new Font(Font.HELVETICA, 10,
							Font.NORMAL);
						}
						System.out.println("***********************.........."+listPrescription.size());
		if( type.equals("DischargeSummary") ||type.equals("DS")||type.equals("all") 
				|| type.equals("DischargeSummaryWithoutHF")||treatmentType.equals("true")){
			if (listPrescription.size() > 0) {
				twoPT.addCell(new Phrase("Treatment : ", subheader));
				twoPT.addCell(new Phrase("", subheader));
				document.add(twoPT);
				twoPT.flushContent();
			

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

				
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));

				
				document.add(HeaderTable7);
				HeaderTable7.flushContent();
				
				
			}
		if (listPrescription.size() > 0) {
			HeaderTable5.addCell(new Phrase("", tabletext));
		}
			HeaderTable5.addCell(new Phrase("", tabletext));
				 document.add(HeaderTable5);
			HeaderTable5.flushContent();
		
	int riskCount=0;		
	for(int i1 = 0; i1 < dsList.size(); i1++){
			if (dsList.get(i1).getRisk() != null
			&& !dsList.get(i1).getRisk().equals("undefined")
			&& !dsList.get(i1).getRisk().equals(""))
			{
				riskCount++;
				twoPT.addCell(new Phrase("Risk Factors :",subheader));
				twoPT.addCell(new Phrase("" + dsList.get(i1).getRisk(), tabletext));
			}
			 twoPT.addCell(new Phrase("" ,subheader));
			 twoPT.addCell(new Phrase("" ,subheader));
			 
			 
		document.add(twoPT);
		twoPT.flushContent();

			}
			for(int j = 0; j < dsList.size(); j++){
				if (dsList.get(j).getComplications() != null
				&& !dsList.get(j).getComplications().equals("undefined")
				&& !dsList.get(j).getComplications().equals(""))
				{
					riskCount++;
					
					twoPT.addCell(new Phrase("Complications :", subheader));
					twoPT.addCell(new Phrase("" + dsList.get(0).getComplications(), tabletext));
				}
				 twoPT.addCell(new Phrase("" ,subheader));
				 twoPT.addCell(new Phrase("" ,subheader));
				 
			document.add(twoPT);
			twoPT.flushContent();
			}
			for(int k = 0; k < dsList.size(); k++){
				if (dsList.get(k).getTreatmentGiven() != null
				&& !dsList.get(k).getTreatmentGiven().equals("undefined")
				&& !dsList.get(k).getTreatmentGiven().equals(""))
				{
					riskCount++;
					twoPT.addCell(new Phrase("Treatment Given :", subheader));
					twoPT.addCell(new Phrase("" +dsList.get(k).getTreatmentGiven() , tabletext));	
				}
			
			document.add(twoPT);
			twoPT.flushContent();  
		

		

			}
			if(riskCount!=0){
			 HeaderTable31.addCell(new Phrase("", tabletext));
			}
			
			
			 document.add(HeaderTable31);
			 HeaderTable31.flushContent();
			 
			 
		}	
		//End Order Form
		
		 //HeaderTable31.addCell(new Phrase("", tabletext));
		 document.add(HeaderTable31);
		 HeaderTable31.flushContent();
		//}
		//Condition At Discharge
		   if( type.equals("DischargeSummary") ||type.equals("DS")||type.equals("all") || 
				   type.equals("DischargeSummaryWithoutHF")||dischargeConditionType.equals("true")){	
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
				
				 HeaderTable31.addCell(new Phrase("", tabletext));
				 document.add(HeaderTable31);
				 HeaderTable31.flushContent();
					}
					}}//End Condition At Discharge
		   
		   
		   /* 	//Treatment At DIscharge
			PdfPTable HeaderTable7 = new PdfPTable(6);
			int[] headerwidth7 = { 10, 30, 44, 24, 16, 20 };
			HeaderTable7.setWidths(headerwidth7);
			HeaderTable7.setWidthPercentage(95f);
			HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				 */
			PdfPTable twoPT2 = new PdfPTable(2);
			int[] widthInst2 = { 25, 75 };
			twoPT2.setWidths(widthInst2);
			twoPT2.setWidthPercentage(95f);
			twoPT2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			/* IPDTreatmentModel objIPDTreatment = new IPDTreatmentModel();
			List<Order_comp_druges> listtreatmentDischarge = new ArrayList<Order_comp_druges>();
			
			listtreatmentDischarge = objIPDTreatment
			
			.fetchTreatmentAtDischrageOrder_comp_druges(treatId); */
			
		//cause of death start	
			if (dsList.get(0).getPrimaryCOD() != null || dsList.get(0).getSecondaryCOD() != null
					|| dsList.get(0).getSignificantCondition() != null) {
				if (dsList.get(0).getPrimaryCOD() != null && !dsList.get(0).getPrimaryCOD().equals("-")) {
					twoPT.addCell(new Phrase("Primary Cause of Death :", subheader2));
					twoPT.addCell(new Phrase("" + dsList.get(0).getPrimaryCOD(), tabletext));
				}
				if (dsList.get(0).getSecondaryCOD() != null
						&& !dsList.get(0).getSecondaryCOD().equals("-")) {
					twoPT.addCell(new Phrase("Secondary Cause of Death :", subheader2));

					twoPT.addCell(new Phrase("" + dsList.get(0).getSecondaryCOD(), tabletext));
				}
				if (dsList.get(0).getSignificantCondition() != null
						&& !dsList.get(0).getSignificantCondition().equals("-")) {
					twoPT.addCell(new Phrase("Other Significant Conditions of Death :", subheader2));
					twoPT.addCell(new Phrase("" + dsList.get(0).getSignificantCondition(), tabletext));
				}
				document.add(twoPT);
				twoPT.flushContent();
			}
			
			//cause of death end
			//added by vishant
			TreatmentDischargeController uss2DischargeController=(ApplicationContextUtils.getApplicationContext()).getBean(TreatmentDischargeController.class);
			TreatmentDischargeService uss2DischargeService=(ApplicationContextUtils.getApplicationContext()).getBean(TreatmentDischargeService.class);
			List<TreatmentDischargeDto> listtreatmentDischarge=uss2DischargeService.getAllPrescriptionsByTreatmentId(treatId, unitId);
			
			
			if( type.equals("DischargeSummary") ||type.equals("DS")||type.equals("all") || 
					type.equals("DischargeSummaryWithoutHF")||treatAtDischrgeType.equals("true")){

				if (listtreatmentDischarge.size() != 0) {
					
					String osName = System.getProperty("os.name");
					if (osName.equalsIgnoreCase("Linux")) {
				//FontFactory.register("/usr/share/fonts/ARIALUNI/Shiv05.ttf");
					} else {
				//FontFactory.register("C:/Windows/Fonts/Shiv05.ttf");
					}
					twoPT2.addCell(new Phrase("Treatment at Discharge : ", subheader));
					twoPT2.addCell(new Phrase("", subheader));
					document.add(twoPT2);
					twoPT2.flushContent();
					
					/* for (int m = 0; m < listtreatmentDischarge.size(); m++) {
				twoPT2.addCell(new Phrase("", subheader));
				     						String English = listtreatmentDischarge.get(m).getInstruction().split("/")[0];
				twoPT2.addCell(new Phrase("" + (listtreatmentDischarge.get(m).getDruges_doses()
				+","+ listtreatmentDischarge.get(m).getPrepName()
				+","+ English
				+","+ listtreatmentDischarge.get(m).getDays()
				),tabletext));
				
					} */
		if (listtreatmentDischarge.size() != 0) {


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

				
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));

				document.add(HeaderTable7);
				HeaderTable7.flushContent();

				
					}
					
					 HeaderTable31.addCell(new Phrase("", tabletext));
					 document.add(HeaderTable31);
					 HeaderTable31.flushContent();
					
				}}
			
			//End Treatment At DIscharge
			
			//start subjective and objective
	
			
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
			
			PdfPTable HeaderTableCh = new PdfPTable(3);
			int[] headerwidthCh = {5,5,5 };
			HeaderTableCh.setWidths(headerwidthCh);
			HeaderTableCh.setWidthPercentage(95f);
			HeaderTableCh.getDefaultCell().setBorder(Rectangle.BOX);		

		
	OPDClinicalEvaluationService clinicalService=(ApplicationContextUtils.getApplicationContext()).getBean(OPDClinicalEvaluationService.class);
	OPDClinicalEvaluationDto clinicalObj=clinicalService.fetchClinicalEvalTempDataByTreatmentId(treatId, request);
	
	if(clinicalObj !=null){
		
		if(!type.equals("DS")){			

			 HeaderTableH.addCell(new Phrase(" Subjective & Objective:", subheader));
		  	 HeaderTableH.addCell(new Phrase("", tabletext));
		  	 HeaderTableH.addCell(new Phrase(" ", subheader));
		  	 HeaderTableH.addCell(new Phrase("", tabletext));
		  	 
		  	 document.add(HeaderTableH);
		  	 HeaderTableH.flushContent();
		  	 
		    HeaderTableSpace.addCell(new Phrase("", tabletext));
			document.add(HeaderTableSpace);
			HeaderTableSpace.flushContent();
			
			
			 PdfPTable HeaderTable32 = new PdfPTable(1);
		     int[] headerwidth32 = {100};
		     HeaderTable32.setWidths(headerwidth32);
		     HeaderTable32.setWidthPercentage(95f);
		     HeaderTable32.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		     StyleSheet styleSheet = new StyleSheet();
		     styleSheet.loadTagStyle("body", "size", "90px");
		     styleSheet.loadTagStyle("p", "size", " 100px");
		     HTMLWorker htmlWorker = new HTMLWorker(document);
		     htmlWorker.setMargins(50, 100, 100, 150);
		     Paragraph paragraph = new Paragraph();
		     
		     PdfPTable HeaderTable33 = new PdfPTable(1);
		     int[] headerwidth30 = {100};
		     HeaderTable33.setWidths(headerwidth30);
		     HeaderTable33.setWidthPercentage(95f);
		     HeaderTable33.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		     htmlWorker.setMargins(50, 100, 100, 150);
		     
		    /*  PdfPTable HeaderTable31 = new PdfPTable(1);
				int[] headerwidth31 = { 120 };
				HeaderTable31.setWidths(headerwidth31);
				HeaderTable31.setWidthPercentage(95f);
				HeaderTable31.getDefaultCell().setBorder(Rectangle.BOTTOM); */
		     String dm=clinicalObj.getClinicalEvaltemplateData();
		     java.util.List<Element> ie1 = HTMLWorker.parseToList(new StringReader(dm), styleSheet);
		     
		     if(dm.equals("") || dm.equals("NULL")){
		         for (Element element : ie1) {
		             if (element instanceof PdfPTable)
		             {
		                 PdfPTable htmlTable = new PdfPTable(1);
		                 int[] htmlTableWidth = {50};
		                                   htmlTable.setWidths(htmlTableWidth);
		                 htmlTable.setWidths(htmlTableWidth);
		                 htmlTable.setWidthPercentage(50f);
		                 htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		                 htmlTable = (PdfPTable)element;
		                 HeaderTable32.addCell(htmlTable);
		                 document.add(HeaderTable32);
		                 HeaderTable32.flushContent();
		             }else{
		                 paragraph.add(element);
		                 cell = new PdfPCell(paragraph);
		                 cell.setBorder(Rectangle.NO_BORDER);
		                 HeaderTable32.addCell(cell);
		                 document.add(HeaderTable32);
		                 HeaderTable32.flushContent();
		                 paragraph.clear();
		             }
		         }                              
		     }else{
		  	   java.util.List<Element> ie3 = HTMLWorker.parseToList(new StringReader(dm), styleSheet);
		         for (Element element : ie3) {
		             if (element instanceof PdfPTable)
		             {
		                 PdfPTable htmlTable = new PdfPTable(1);
		                 int[] htmlTableWidth = {50};
		                                   htmlTable.setWidths(htmlTableWidth);
		                 htmlTable.setWidths(htmlTableWidth);
		                 htmlTable.setWidthPercentage(50f);
		                 htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		                 htmlTable = (PdfPTable)element;
		                 HeaderTable31.addCell(htmlTable);
		                 document.add(HeaderTable31);
		                 HeaderTable31.flushContent();
		             }else{
		                 paragraph.add(element);
		                 cell = new PdfPCell(paragraph);
		                 cell.setBorder(Rectangle.NO_BORDER);
		                 HeaderTable31.addCell(cell);
		                 document.add(HeaderTable31);
		                 HeaderTable31.flushContent();
		                 paragraph.clear();
		             }
		         }

		     } 
		     
		     
		     HeaderTableSpace.addCell(new Phrase("", tabletext));
				document.add(HeaderTableSpace);
				HeaderTableSpace.flushContent();
				
				HeaderTableSpace.addCell(new Phrase("", tabletext));
				document.add(HeaderTableSpace);
				HeaderTableSpace.flushContent();
			 
			 	HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				/*  HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				 HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				 HeaderTable5.addCell(new Phrase("", tabletext)); */
					 document.add(HeaderTable5);
				HeaderTable5.flushContent();
				
				HeaderTableSpace.addCell(new Phrase("", tabletext));
				document.add(HeaderTableSpace);
				HeaderTableSpace.flushContent();
				
				 HeaderTableSpace.addCell(new Phrase("", tabletext));
					document.add(HeaderTableSpace);
					HeaderTableSpace.flushContent();
		     
			}
	}
	//end subjective and objective
	
	
	//start allergy info

	
	PdfPTable HeaderTableallergy = new PdfPTable(2);
	int[] headerwidthAllergy = {5,10 };
	HeaderTableallergy.setWidths(headerwidthAllergy);
	HeaderTableallergy.setWidthPercentage(95f);
	HeaderTableallergy.getDefaultCell().setBorder(Rectangle.BOX);
	
	List<OPDAllergyAlertsDto> lstallergyObj=clinicalService.fetchAllAllergyAlerts(treatId, request);
	
	if(lstallergyObj.size() > 0){
		   
		HeaderTableH.addCell(new Phrase(" Alerts & Allergies:", subheader));
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
		/*  HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		 HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		 HeaderTable5.addCell(new Phrase("", tabletext)); */
			 document.add(HeaderTable5);
		HeaderTable5.flushContent();
		
		HeaderTableSpace.addCell(new Phrase("", tabletext));
		document.add(HeaderTableSpace);
		HeaderTableSpace.flushContent();
		
		 HeaderTableSpace.addCell(new Phrase("", tabletext));
			document.add(HeaderTableSpace);
			HeaderTableSpace.flushContent();
  
		
	}
	
	//end allergy info

		//Start Chemo

		NursingStationController nscntrl = (ApplicationContextUtils.getApplicationContext())
				.getBean(NursingStationController.class);
		PlanTreatDTO planobj = new PlanTreatDTO();
		planobj = nscntrl.fetchPlanTreatData(patient_ID, treatment_Id);
		
		
		if (planobj.getPlanlist().size() != 0) {
			PdfPTable HeaderTable62a = new PdfPTable(3);
			int[] headerwidth62b = { 30, 30, 30 };
			HeaderTable62a.setWidths(headerwidth62b);
			HeaderTable62a.setWidthPercentage(95f);
			HeaderTable62a.getDefaultCell().setBorder(Rectangle.TOP);

			HeaderTable62a.addCell(new Phrase("PLAN OF TREATMENT", subheader));
			HeaderTable62a.addCell(new Phrase("", subheader));
			HeaderTable62a.addCell(new Phrase("", subheader));

			HeaderTable62a.addCell(new Phrase("", subheader));
			HeaderTable62a.addCell(new Phrase("", subheader));
			HeaderTable62a.addCell(new Phrase("", subheader));

			document.add(HeaderTable62a);
			HeaderTable62a.flushContent();

			PdfPTable HeaderTable61a = new PdfPTable(6);
			int[] headerwidth61b = { 30, 10, 30, 10, 30, 10 };
			HeaderTable61a.setWidths(headerwidth61b);
			HeaderTable61a.setWidthPercentage(95f);
			HeaderTable61a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			if (planobj.getPlanlist().get(0).getChka().equalsIgnoreCase("1")) {
				HeaderTable61a.addCell(new Phrase("SURGERY:", subheader));
				HeaderTable61a.addCell(new Phrase("Yes", tabletext));

			} /* else{
				HeaderTable61a.addCell(new Phrase("SURGERY:", subheader));
				HeaderTable61a.addCell(new Phrase("NO", tabletext));
				
				
				} */

			if (planobj.getPlanlist().get(0).getChkb().equalsIgnoreCase("1")) {
				HeaderTable61a.addCell(new Phrase("CHEMOTHERAPY:", subheader));
				HeaderTable61a.addCell(new Phrase("Yes", tabletext));

			} /* else{
				HeaderTable61a.addCell(new Phrase("CHEMOTHERAPY:", subheader));
				HeaderTable61a.addCell(new Phrase("NO", tabletext));
				
				
				} */

			if (planobj.getPlanlist().get(0).getChkc().equalsIgnoreCase("1")) {
				HeaderTable61a.addCell(new Phrase("RADIOTHERAPY:", subheader));
				HeaderTable61a.addCell(new Phrase("Yes", tabletext));

			} /* else{
				HeaderTable61a.addCell(new Phrase("RADIOTHERAPY:", subheader));
				HeaderTable61a.addCell(new Phrase("NO", tabletext));
				
				
				} */

			if (planobj.getPlanlist().get(0).getChkd().equalsIgnoreCase("1")) {
				HeaderTable61a.addCell(new Phrase("HORMONE THERAPY:", subheader));
				HeaderTable61a.addCell(new Phrase("Yes", tabletext));

			} /* else{
				HeaderTable61a.addCell(new Phrase("HORMONE THERAPY:", subheader));
				HeaderTable61a.addCell(new Phrase("NO", tabletext));
				
				
				} */

			if (planobj.getPlanlist().get(0).getChke().equalsIgnoreCase("1")) {
				HeaderTable61a.addCell(new Phrase("TARGETED THERAPY:", subheader));
				HeaderTable61a.addCell(new Phrase("Yes", tabletext));

			} /* else{
				HeaderTable61a.addCell(new Phrase("TARGETED THERAPY:", subheader));
				HeaderTable61a.addCell(new Phrase("NO", tabletext));
				
				
				} */

			if (planobj.getPlanlist().get(0).getChkf().equalsIgnoreCase("1")) {
				HeaderTable61a.addCell(new Phrase("CONCOMITANT RADIOTHERAPY + CHEMOTHERAPY:", subheader));
				HeaderTable61a.addCell(new Phrase("Yes", tabletext));

			} /* else{
				HeaderTable61a.addCell(new Phrase("CONCOMITANT RADIOTHERAPY + CHEMOTHERAPY:", subheader));
				HeaderTable61a.addCell(new Phrase("NO", tabletext));
				
				
				} */

			if (planobj.getPlanlist().get(0).getChkg().equalsIgnoreCase("1")) {
				HeaderTable61a.addCell(new Phrase("FOLLOW UP:", subheader));
				HeaderTable61a.addCell(new Phrase("Yes", tabletext));

			} /* else{
				HeaderTable61a.addCell(new Phrase("FOLLOW UP:", subheader));
				HeaderTable61a.addCell(new Phrase("NO", tabletext));
				
				
				} */

			if (planobj.getPlanlist().get(0).getChkh().equalsIgnoreCase("1")) {
				HeaderTable61a.addCell(new Phrase("PALLIATIVE CARE:", subheader));
				HeaderTable61a.addCell(new Phrase("Yes", tabletext));

			} /* else{
				HeaderTable61a.addCell(new Phrase("PALLIATIVE CARE:", subheader));
				HeaderTable61a.addCell(new Phrase("NO", tabletext));
				
				
				} */

			if (planobj.getPlanlist().get(0).getChki().equalsIgnoreCase("1")) {
				HeaderTable61a.addCell(new Phrase("SUPPORTIVE CARE:", subheader));
				HeaderTable61a.addCell(new Phrase("Yes", tabletext));

			} /* else{
				HeaderTable61a.addCell(new Phrase("SUPPORTIVE CARE:", subheader));
				HeaderTable61a.addCell(new Phrase("NO", tabletext));
				
				
				} */

			document.add(HeaderTable61a);
			HeaderTable61a.flushContent();

		}
		
		
		//Start Doctor Round

		//	String date = request.getParameter("date");

		//List<DoctorRoundReport> pdrrlist = objIPDTreatmentModel.getPreviousRoundList(treatment_Id,"");
		IPDHistoryService historyService = (ApplicationContextUtils.getApplicationContext()).getBean(IPDHistoryService.class);
		List<DoctorRoundDTO> pdrrlist = historyService.fetchDoctorRounds(treatId, 1);
		System.out.println("----------" + pdrrlist);
		
		if (pdrrlist.size() > 0) {
			List<DoctorRoundSlaveDTO> doctorRoundSlave = pdrrlist.get(0).getListDoctorRoundSlaveDTO();
			//	End Doctor Round
			if (type.equals("DischargeSummary") || type.equals("DS") || type.equals("all")
			|| type.equals("DischargeSummaryWithoutHF") || drRound.equals("true")) {
				
				PdfPTable DRRHeaderTable = new PdfPTable(1);
				int[] DRRHeaderWidth = { 50 };
				DRRHeaderTable.setWidths(DRRHeaderWidth);
				DRRHeaderTable.setWidthPercentage(95f);
				DRRHeaderTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				PdfPTable DRRHeaderTable1 = new PdfPTable(7);
				int[] DRRHeaderWidth1 = { 20, 22, 20, 30, 80, 40, 50 };
				DRRHeaderTable1.setWidths(DRRHeaderWidth1);
				DRRHeaderTable1.setWidthPercentage(95f);
				DRRHeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				DRRHeaderTable1.addCell(new Phrase("", tabletext));
				DRRHeaderTable1.addCell(new Phrase("", tabletext));
				DRRHeaderTable1.addCell(new Phrase("", tabletext));
				DRRHeaderTable1.addCell(new Phrase("", tabletext));
				DRRHeaderTable1.addCell(new Phrase("", tabletext));
				DRRHeaderTable1.addCell(new Phrase("", tabletext));
				DRRHeaderTable1.addCell(new Phrase("", tabletext));

				document.add(DRRHeaderTable);
				DRRHeaderTable.flushContent();
				
				
				if (pdrrlist.size() != 0) {
			
					DRRHeaderTable.addCell(new Phrase("Doctor Round Details :-", subheader));

					DRRHeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));

					document.add(DRRHeaderTable);
					DRRHeaderTable.flushContent();

					DRRHeaderTable1.addCell(new Phrase("#", subheader));
					DRRHeaderTable1.addCell(new Phrase("Date", subheader));
					DRRHeaderTable1.addCell(new Phrase("Time", subheader));
					DRRHeaderTable1.addCell(new Phrase("Template Name", subheader));
					DRRHeaderTable1.addCell(new Phrase("Clinical Notes", subheader));
					DRRHeaderTable1.addCell(new Phrase("Investigation Advice", subheader));
					DRRHeaderTable1.addCell(new Phrase("RoundBy", subheader));

					DRRHeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));

					document.add(DRRHeaderTable1);
					DRRHeaderTable1.flushContent();
					
					/* twoPT22.addCell(new Phrase("Doctor Round Report:", subheader));
					twoPT22.addCell(new Phrase("", tabletext)); */
				}
			int count=1;	
			for(int j =0 ;j < pdrrlist.size();j++){	
				
				
				for (int i = 0; i < pdrrlist.get(j).getListDoctorRoundSlaveDTO().size(); i++) {
					
					
					//fetch date
					DateFormat formatter2 = new SimpleDateFormat("dd/MM/yyyy");
					String todayAsString = formatter2.format(pdrrlist.get(j).getPreviousDate());
					
					DRRHeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					DRRHeaderTable1.addCell(new Phrase("" + (count), tabletext));
					DRRHeaderTable1.addCell(new Phrase("" + todayAsString, tabletext));
					DRRHeaderTable1.addCell(new Phrase("" + pdrrlist.get(j).getListDoctorRoundSlaveDTO().get(i).getTime(), tabletext));
					DRRHeaderTable1.addCell(new Phrase("" + pdrrlist.get(j).getListDoctorRoundSlaveDTO().get(i).getTemplateName(), tabletext));
					if (pdrrlist.get(j).getListDoctorRoundSlaveDTO().get(i).getClinicalNotes() != null) {
						DRRHeaderTable1.addCell(new Phrase("" + pdrrlist.get(j).getListDoctorRoundSlaveDTO().get(i).getClinicalNotes(), tabletext));
					} else {
						DRRHeaderTable1.addCell(new Phrase("-", tabletext));
					}
					DRRHeaderTable1.addCell(new Phrase("" + pdrrlist.get(j).getListDoctorRoundSlaveDTO().get(i).getInvestigationAdvice(), tabletext));
					DRRHeaderTable1.addCell(new Phrase("" + pdrrlist.get(j).getListDoctorRoundSlaveDTO().get(i).getDoctorName(), tabletext));

					DRRHeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));

					document.add(DRRHeaderTable1);
					DRRHeaderTable1.flushContent();

				
					
					/* 
					twoPT22.addCell(new Phrase("", tabletext));
					twoPT22.addCell(new Phrase("" + (i + 1) + ".    " + doctorRoundSlave.get(i).getTime() + ", "
							+ doctorRoundSlave.get(i).getClinicalNotes() + ", "
							+ doctorRoundSlave.get(i).getInvestigationAdvice() + ", " + doctorRoundSlave.get(i).getDoctorName(),
							tabletext));
			
					document.add(twoPT22);
					twoPT22.flushContent();
					
				 */
				count++;
				}
				/* if (pdrrlist.size() > 0) {
					HeaderTable31.addCell(new Phrase("", tabletext));
					document.add(HeaderTable31);
					HeaderTable31.flushContent();
				} */
				 
			}
		  }
		}
		
		//Start INdent

		IndentController ic = (ApplicationContextUtils.getApplicationContext()).getBean(IndentController.class);
		List<IndentSaleSlave> ism = new ArrayList<IndentSaleSlave>();

		ism = ic.getIndentSaleDataByTreatId(treatId);
		
		if (ism.size() > 0) {
			twoPT22.addCell(new Phrase("Indent:", subheader));
			twoPT22.addCell(new Phrase("", tabletext));
			for (int i = 0; i < ism.size(); i++) {
				twoPT22.addCell(new Phrase("", subheader));
				twoPT22.addCell(new Phrase(
				ism.get(i).getAmtReceiveFlag() + ", " + ism.get(i).getIndentSaleSlaveBatchCode() + ", "
						+ ism.get(i).getIndentSaleSlaveBatchExpiry() + ", " + ism.get(i).getIndentSaleSlaveQty(),
				tabletext));

				document.add(twoPT22);
				twoPT22.flushContent();
			}
			HeaderTable31.addCell(new Phrase("", tabletext));
			document.add(HeaderTable31);
			HeaderTable31.flushContent();
		}
		
		//End Indent
		//Start OT Note

		int tomId = Integer.parseInt(tomIdS);
		
		//added by vishant
		OperationThService uss4 = (ApplicationContextUtils.getApplicationContext()).getBean(OperationThService.class);
		//OperationModel objadmin = new OperationModel();
		List<EhatOTOperationNotes> listInfo = null;

		listInfo = new ArrayList<EhatOTOperationNotes>();
		//String tomIdS = request.getParameter("tomId");
		System.out.println("tommmmm-" + tomIdS);
		listInfo = uss4.fetchOTNotesData(tomId);
		//OperationModel objadmin = new OperationModel();
		//List<OTOperationNotes> listInfo = null;

		//listInfo = new ArrayList<OTOperationNotes>();
		//listInfo = objadmin.fetchOTNotesData(tomId);

		PdfPTable paraTable = new PdfPTable(2);
		int[] paraWidth = { 25, 75 };
		paraTable.setWidths(paraWidth);
		paraTable.setWidthPercentage(95f);
		paraTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		PdfPTable subHeaderTable = new PdfPTable(1);
		int[] AdmissionNoteHeaderWidth = { 50 };
		subHeaderTable.setWidths(AdmissionNoteHeaderWidth);
		subHeaderTable.setWidthPercentage(95f);
		subHeaderTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		if (otNotesType.equals("true") || type.equals("all") || type.equals("DischargeSummaryWithoutHF")) {
			if (listInfo.size() != 0) {
				EhatOTOperationNotes otoperationNotes = (EhatOTOperationNotes) listInfo.get(0);
				subHeaderTable.addCell(new Phrase("Operation Notes : ", subheader));
				document.add(subHeaderTable);
				subHeaderTable.flushContent();

				HTMLWorker htmlWorker = new HTMLWorker(document);
				Paragraph paragraph = new Paragraph();
				StyleSheet styleSheet = new StyleSheet();
				styleSheet.loadTagStyle("body", "size", "9pt");
				styleSheet.loadTagStyle("p", "size", "8pt");
				java.util.List<Element> ie = HTMLWorker
				.parseToList(new StringReader("              " + otoperationNotes.getChkEditerdata()), styleSheet);
				for (Element element : ie) {
			//paragraph.add(element);
			if (element instanceof PdfPTable) {
				PdfPTable htmlTable = new PdfPTable(1);
				int[] htmlTableWidth = { 50 };
				htmlTable.setWidths(htmlTableWidth);
				htmlTable.setWidthPercentage(50f);
				htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				htmlTable = (PdfPTable) element;
				paraTable.addCell(new Phrase(" ", subheader));
				paraTable.addCell(htmlTable);

				document.add(paraTable);
				paraTable.flushContent();
			} else {
				paragraph.add(element);
				cell = new PdfPCell(paragraph);
				cell.setBorder(Rectangle.NO_BORDER);
				paraTable.addCell(new Phrase(" ", subheader));
				paraTable.addCell(cell);

				document.add(paraTable);
				paraTable.flushContent();
				paragraph.clear();
			}
				}
				paraTable.addCell(new Phrase(" ", subheader));
				cell = new PdfPCell(paragraph);
				cell.setBorder(Rectangle.NO_BORDER);
				paraTable.addCell(cell);

				document.add(paraTable);
				paraTable.flushContent();

				HeaderTable31.addCell(new Phrase("", tabletext));
				document.add(HeaderTable31);
				HeaderTable31.flushContent();

			}
		}
		
		//End OT Notes

		/****************************for PEDIARIC DEPT************************************/
		PdfPTable HeaderTable6a = new PdfPTable(4);
		int[] headerwidth7a = { 40, 55, 45, 55 };
		HeaderTable6a.setWidths(headerwidth7a);
		HeaderTable6a.setWidthPercentage(95f);
		HeaderTable6a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		if (type.equals("DischargeSummary") || type.equals("DS") || type.equals("all")
				|| type.equals("DischargeSummaryWithoutHF") || paediatricType.equals("true")) {

			System.out.println("---------"+paediatricType);
		   if(paediatricType.equals("true")){
				if (dsList != null && dsList.size() != 0) {
					String dept = dsList.get(0).getPaed_dept();
					if (dept != null && !dept.equals("NORMAL") && dept != "" && dept != "undefined") {
				if (dsList.get(0).getPaed_dept().equals("PD")) {
					subHeaderTable.addCell(new Phrase("PAEDIATRIC DEPT(PD) :", header1));
					document.add(subHeaderTable);
					subHeaderTable.flushContent();

					PdfPTable patientDemoDetailNamePD = new PdfPTable(4);
					int[] patientDemoDetailNameWidthPD = { 17, 35, 17, 36 };
					patientDemoDetailNamePD.setWidths(patientDemoDetailNameWidthPD);
					patientDemoDetailNamePD.setWidthPercentage(95f);
					patientDemoDetailNamePD.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					// PdfPTable HeaderTable6a = new PdfPTable(4);
					/*int[] headerWidth6a = { 17, 35, 17, 36 };
					HeaderTable6a.setWidths(headerWidth6a);
					HeaderTable6a.setWidthPercentage(95f);
					HeaderTable6a.getDefaultCell().setBorder(
						Rectangle.NO_BORDER); */

					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));

					if (!dsList.get(0).getPaediatricDept().getPastHistory().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("Past/Family History:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getPastHistory(), tabletext));
					}
					if (!dsList.get(0).getPaediatricDept().getGeneralExamination().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("General Examination:", subheader));
						patientDemoDetailNamePD.addCell(
								new Phrase("" + dsList.get(0).getPaediatricDept().getGeneralExamination(), tabletext));
					}

					/* patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader)); */
					if (!dsList.get(0).getPaediatricDept().getCvs().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("CVS:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getCvs(), tabletext));
					}

					if (!dsList.get(0).getPaediatricDept().getRs().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("RS:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getRs(), tabletext));
					}

					/* patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader)); */

					if (!dsList.get(0).getPaediatricDept().getPa().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("PA:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getPa(), tabletext));
					}

					if (!dsList.get(0).getPaediatricDept().getCns().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("CNS:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getCns(), tabletext));
					}

					/* patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader)); */

					if (!dsList.get(0).getPaediatricDept().getPs().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("P/S:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getPs(), tabletext));
					}

					if (!dsList.get(0).getPaediatricDept().getPlateletCount().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("Platelet Count:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getPlateletCount(), tabletext));
					}

					/* patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader)); */

					if (!dsList.get(0).getPaediatricDept().getUrineR().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("Urine-R:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getUrineR(), tabletext));
					}

					if (!dsList.get(0).getPaediatricDept().getStoolR().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("Stool-R:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getStoolR(), tabletext));
					}

					/* patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader)); */

					if (!dsList.get(0).getPaediatricDept().getBsl().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("BSL (mg%):", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getBsl(), tabletext));
					}

					if (!dsList.get(0).getPaediatricDept().getCsf().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("CSF :", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getCsf(), tabletext));
					}

					/* patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader)); */

					if (!dsList.get(0).getPaediatricDept().getOtt().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("OTT :", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getOtt(), tabletext));
					}
					if (!dsList.get(0).getPaediatricDept().getSrcalcium().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("Sr Calcium (mg%):", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getSrcalcium(), tabletext));
					}

					/* patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader)); */
					if (dsList.get(0).getPaediatricDept().getCoombTest() != null) {
						patientDemoDetailNamePD.addCell(new Phrase("Coomb's Test: ", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getCoombTest(), tabletext));
					}

					if (!dsList.get(0).getPaediatricDept().getTt().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("T.T.: ", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getTt(), tabletext));

					}

					/* patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader)); */

					if (!dsList.get(0).getPaediatricDept().getPdsrna().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("Sr Na:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getPdsrna(), tabletext));
					}
					if (!dsList.get(0).getPaediatricDept().getPdsrk().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("Sr K: ", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getPdsrk(), tabletext));
					}

					/* patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader)); */

					if (!dsList.get(0).getPaediatricDept().getPdsrcl().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("Sr CL:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getPdsrcl(), tabletext));
					}

					if (!dsList.get(0).getPaediatricDept().getSrBillirubin().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("Sr Billirubin(mg%):", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getSrBillirubin(), tabletext));
					}

					/* patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader)); */

					if (!dsList.get(0).getPaediatricDept().getUnconj1().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("Unconj(mg%):", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getUnconj1(), tabletext));
					}

					if (!dsList.get(0).getPaediatricDept().getUnconj2().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("Unconj(mg%):", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getUnconj2(), tabletext));
					}

					/* patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader)); */

					if (!dsList.get(0).getPaediatricDept().getX_ray().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("X-RAY:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getX_ray(), tabletext));
					}

					if (dsList.get(0).getPaediatricDept().getUsg() != null) {
						patientDemoDetailNamePD.addCell(new Phrase("USG:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getUsg(), tabletext));
					}

					/* patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader)); */

					if (!dsList.get(0).getPaediatricDept().getCt_mri().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("CT/MRI:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getCt_mri(), tabletext));
					}

					if (!dsList.get(0).getPaediatricDept().getCourseOfRec().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("Course Of ILLNESS/REC:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getCourseOfRec(), tabletext));
					}

					/* patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader)); */

					if (!dsList.get(0).getPaediatricDept().getPdManagement().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("Management:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getPdManagement(), tabletext));
					}

					if (!dsList.get(0).getPaediatricDept().getPdFOther().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("Other:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getPdFOther(), tabletext));
					}
					/* patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader)); */

					if (!dsList.get(0).getPaediatricDept().getOtherVaccines().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("Other Vaccines:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getOtherVaccines(), tabletext));
					}
					if (!dsList.get(0).getPaediatricDept().getAnyOtherPoints().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("Any Other Points:", subheader));
						patientDemoDetailNamePD
								.addCell(new Phrase("" + dsList.get(0).getPaediatricDept().getAnyOtherPoints(), tabletext));
					}
					/* patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader)); */

					if (!dsList.get(0).getPaediatricDept().getFollowUpAdvise().equals("")) {
						patientDemoDetailNamePD.addCell(new Phrase("Follow Up Advise:", subheader));
						patientDemoDetailNamePD.addCell(
								new Phrase("" + dsList.get(0).getPaediatricDept().getFollowUpAdvise(), tabletext));

					}

					patientDemoDetailNamePD.addCell(new Phrase("", subheader));
					patientDemoDetailNamePD.addCell(new Phrase("", subheader));

					document.add(patientDemoDetailNamePD);
					patientDemoDetailNamePD.flushContent();

					//HeaderTable6a.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable6a.addCell(new Phrase("", subheader));
					HeaderTable6a.addCell(new Phrase("", subheader));
					HeaderTable6a.addCell(new Phrase("", subheader));
					HeaderTable6a.addCell(new Phrase("", subheader));

					if (!dsList.get(0).getPaediatricDept().getImmunisationStatus().equals("")) {
						if (!dsList.get(0).getPaediatricDept().getImmunisationStatus().equals(",N,N,N,N,N,N,N,N,N,N,N")) {

							HeaderTable6a.addCell(new Phrase("Immunization Status:", subheader1));
							HeaderTable6a.addCell(new Phrase("", subheader));
							HeaderTable6a.addCell(new Phrase("", subheader));
							HeaderTable6a.addCell(new Phrase("", subheader));

							/* patientDemoDetailNamePD.addCell(new Phrase(" ", subheader));
							patientDemoDetailNamePD.addCell(new Phrase("", tabletext)); */

							/*  */

							String[] arrRL = (dsList.get(0).getPaediatricDept().getImmunisationStatus()).split(",");

							if (!arrRL[1].equals("N")) {
								if (arrRL[1].equals("Y")) {
									arrRL[1] = "Yes";
								} else {

									arrRL[1] = "-";

								}

								HeaderTable6a.addCell(new Phrase("BCG:", subheader));
								HeaderTable6a.addCell(new Phrase(" " + arrRL[1], tabletext));
							}

							if (!arrRL[2].equals("N")) {
								if (arrRL[2].equals("Y")) {

									arrRL[2] = "Yes";

								} else {

									arrRL[2] = "-";

								}

								HeaderTable6a.addCell(new Phrase("DPT/OPV:", subheader));
								HeaderTable6a.addCell(new Phrase(" " + arrRL[2], tabletext));
							}

							if (!arrRL[3].equals("N")) {
								if (arrRL[3].equals("Y")) {
									arrRL[3] = "Yes";
								} else {

									arrRL[3] = "-";

								}

								HeaderTable6a.addCell(new Phrase("MEASLES:", subheader));
								HeaderTable6a.addCell(new Phrase(" " + arrRL[3], tabletext));

							}

							if (!arrRL[4].equals("N")) {

								if (arrRL[4].equals("Y")) {
									arrRL[4] = "Yes";

								} else {

									arrRL[4] = "-";

								}
								HeaderTable6a.addCell(new Phrase("MMR:", subheader));
								HeaderTable6a.addCell(new Phrase(" " + arrRL[4], tabletext));

							}

							if (!arrRL[5].equals("N")) {

								if (arrRL[5].equals("Y")) {
									arrRL[5] = "Yes";

								} else {

									arrRL[5] = "-";

								}

								HeaderTable6a.addCell(new Phrase("Booster:", subheader));
								HeaderTable6a.addCell(new Phrase(" " + arrRL[5], tabletext));

							}

							if (!arrRL[6].equals("N")) {

								if (arrRL[6].equals("Y")) {
									arrRL[6] = "Yes";

								} else {

									arrRL[6] = "-";

								}
								HeaderTable6a.addCell(new Phrase("DT.TT:", subheader));
								HeaderTable6a.addCell(new Phrase(" " + arrRL[6], tabletext));

							}

							if (!arrRL[7].equals("N")) {

								if (arrRL[7].equals("Y")) {
									arrRL[7] = "Yes";

								} else {

									arrRL[7] = "-";

								}

								HeaderTable6a.addCell(new Phrase("Hepatitis-B:", subheader));
								HeaderTable6a.addCell(new Phrase(" " + arrRL[7], tabletext));

							}

							if (!arrRL[8].equals("N")) {

								if (arrRL[8].equals("Y")) {
									arrRL[8] = "Yes";

								} else {

									arrRL[8] = "-";

								}

								HeaderTable6a.addCell(new Phrase("Hib:", subheader));
								HeaderTable6a.addCell(new Phrase(" " + arrRL[8], tabletext));

							}

							if (!arrRL[9].equals("N")) {

								if (arrRL[9].equals("Y")) {
									arrRL[9] = "Yes";

								} else {

									arrRL[9] = "-";

								}

								HeaderTable6a.addCell(new Phrase("Chicken Pox:", subheader));
								HeaderTable6a.addCell(new Phrase(" " + arrRL[9], tabletext));

							}

							if (!arrRL[10].equals("N")) {

								if (arrRL[10].equals("Y")) {
									arrRL[10] = "Yes";

								} else {

									arrRL[10] = "-";

								}

								HeaderTable6a.addCell(new Phrase("Typhoid:", subheader));
								HeaderTable6a.addCell(new Phrase(" " + arrRL[10], tabletext));

							}

							if (!arrRL[11].equals("N")) {

								if (arrRL[11].equals("Y")) {
									arrRL[11] = "Yes";

								} else {

									arrRL[11] = "-";

								}

								HeaderTable6a.addCell(new Phrase("Hepatitis-A:", subheader));
								HeaderTable6a.addCell(new Phrase(" " + arrRL[11], tabletext));
							}

							HeaderTable6a.addCell(new Phrase("", subheader));
							HeaderTable6a.addCell(new Phrase(" ", tabletext));
						}
					}
					document.add(HeaderTable6a);
					HeaderTable6a.flushContent();
				}
				/****************************for PEDIARIC DEPT(NICU)************************************/
				else if(dsList.get(0).getPaediatricDeptNicu()!=null) {
					subHeaderTable.addCell(new Phrase("PAEDIATRIC DEPT(NICU) :", header1));
					document.add(subHeaderTable);
					subHeaderTable.flushContent();

					PdfPTable patientDemoDetailNameNicuPD = new PdfPTable(4);
					int[] patientDemoDetailNameWidthNicuPD = { 26, 36, 26, 36 };
					patientDemoDetailNameNicuPD.setWidths(patientDemoDetailNameWidthNicuPD);
					patientDemoDetailNameNicuPD.setWidthPercentage(95f);
					patientDemoDetailNameNicuPD.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					patientDemoDetailNameNicuPD.addCell(new Phrase("", subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("", subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("", subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("", subheader));

					if (!dsList.get(0).getPaediatricDeptNicu().getBirthWeight().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Birth Weight:", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getBirthWeight(), tabletext));
					}
					if (!dsList.get(0).getPaediatricDeptNicu().getWeightOnAdmission().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Weight On Adm.:", subheader));
						patientDemoDetailNameNicuPD.addCell(
								new Phrase(dsList.get(0).getPaediatricDeptNicu().getWeightOnAdmission(), tabletext));
					}
					/* patientDemoDetailNameNicuPD.addCell(new Phrase("",	subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",	subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader)); */

					if (!dsList.get(0).getPaediatricDeptNicu().getWeightOnDischarge().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Weight On Disch.:", subheader));
						patientDemoDetailNameNicuPD.addCell(
								new Phrase(dsList.get(0).getPaediatricDeptNicu().getWeightOnDischarge(), tabletext));
					}

					String baby_Data = dsList.get(0).getPaediatricDeptNicu().getBabysData();

					if (!dsList.get(0).getPaediatricDeptNicu().getBabysData().equals("undefined")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Baby's Data:", subheader));
						patientDemoDetailNameNicuPD.addCell(
								new Phrase(dsList.get(0).getPaediatricDeptNicu().getBabysData().toUpperCase(), tabletext));
					}
					/* patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader)); */
					if (!dsList.get(0).getPaediatricDeptNicu().getDeliveryData().equals("undefined")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Delivery Data:", subheader));
						patientDemoDetailNameNicuPD.addCell(new Phrase(
								dsList.get(0).getPaediatricDeptNicu().getDeliveryData().toUpperCase(), tabletext));
					}
					if (!dsList.get(0).getPaediatricDeptNicu().getConditionAtBirth().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Condition at Birth:", subheader));
						patientDemoDetailNameNicuPD.addCell(
								new Phrase(dsList.get(0).getPaediatricDeptNicu().getConditionAtBirth(), tabletext));
					}
					if (!dsList.get(0).getPaediatricDeptNicu().getAncAge().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("ANC History-Age :", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getAncAge(), tabletext));
					}
					if (!dsList.get(0).getPaediatricDeptNicu().getMbg().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("MBG :", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getMbg(), tabletext));
					}
					/* patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader)); */

					if (!dsList.get(0).getPaediatricDeptNicu().getRh().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("RH :", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getRh(), tabletext));
					}
					if (!dsList.get(0).getPaediatricDeptNicu().getRegistration().equals("undefined")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Registration Status:", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getRegistration(), tabletext));
					}
					/* patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader)); */

					if (dsList.get(0).getPaediatricDeptNicu().getRegistration() == "undefined") {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Immunization Status:", subheader));
						if (!dsList.get(0).getPaediatricDeptNicu().getImmunized().equals("undefined")) {
							patientDemoDetailNameNicuPD
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getImmunized(), tabletext));
						} else {
							patientDemoDetailNameNicuPD.addCell(new Phrase("-", tabletext));
						}

					}
					if (!dsList.get(0).getPaediatricDeptNicu().getSerHIV().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Serology-HIV- :", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getSerHIV(), tabletext));
					}
					/* patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader)); */

					if (!dsList.get(0).getPaediatricDeptNicu().getHbsAG().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Hbs Ag :", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getHbsAG(), tabletext));
					}
					if (!dsList.get(0).getPaediatricDeptNicu().getVdrl().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("VDRL :", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getVdrl(), tabletext));
					}
					/* patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader)); */
					if (!dsList.get(0).getPaediatricDeptNicu().getDm().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Medical History-DM ", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getDm(), tabletext));
					}
					if (!dsList.get(0).getPaediatricDeptNicu().getHtn().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("HTN :", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getHtn(), tabletext));
					}

					/* patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader)); */
					if (!dsList.get(0).getPaediatricDeptNicu().getThyroid().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Thyroid Disorder:", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getThyroid(), tabletext));
					}
					if (!dsList.get(0).getPaediatricDeptNicu().getFever().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Fever with Rash:", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getFever(), tabletext));
					}
					/* patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader)); */
					if (!dsList.get(0).getPaediatricDeptNicu().getMedOther().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Med. History Other :", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getMedOther(), tabletext));
					}
					if (!dsList.get(0).getPaediatricDeptNicu().getObsProb().equals("undefined")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Obsteric Problem's: ", subheader));
						patientDemoDetailNameNicuPD.addCell(
								new Phrase(dsList.get(0).getPaediatricDeptNicu().getObsProb().toUpperCase(), tabletext));
					}
					/* patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader)); */
					if (!dsList.get(0).getPaediatricDeptNicu().getCourseInHos().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Course In Hospital:", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getCourseInHos(), tabletext));
					}
					if (!dsList.get(0).getPaediatricDeptNicu().getFluids().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("IV Fluids:", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getFluids(), tabletext));
					}
					/* patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader)); */
					if (!dsList.get(0).getPaediatricDeptNicu().getAntibio().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Antibiotics:", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getAntibio(), tabletext));
					}
					if (!dsList.get(0).getPaediatricDeptNicu().getSedation1().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Sedation Used-1.", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getSedation1(), tabletext));
					}

					/* patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("",
							subheader)); */
					if (!dsList.get(0).getPaediatricDeptNicu().getSedation2().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Sedation Used-2:", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getSedation2(), tabletext));
					}
					if (!dsList.get(0).getPaediatricDeptNicu().getDuration().equals("")) {
						patientDemoDetailNameNicuPD.addCell(new Phrase("Ventilation:Total Dur.", subheader));
						patientDemoDetailNameNicuPD
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getDuration(), tabletext));
					}

					patientDemoDetailNameNicuPD.addCell(new Phrase("", subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("", subheader));

					patientDemoDetailNameNicuPD.addCell(new Phrase("", subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("", subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("", subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("", subheader));

					patientDemoDetailNameNicuPD.addCell(new Phrase("", subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("", subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("", subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("", subheader));

					patientDemoDetailNameNicuPD.addCell(new Phrase("", subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("", subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("", subheader));
					patientDemoDetailNameNicuPD.addCell(new Phrase("", subheader));

					document.add(patientDemoDetailNameNicuPD);
					patientDemoDetailNameNicuPD.flushContent();

					if (!dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getMode1().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getPip1().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getPeep1().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getFio1().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getMode2().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getPip2().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getPeep2().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getFio2().equals("")) {

						PdfPTable patientDemoDetailNameNicu = new PdfPTable(4);
						int[] patientDemoDetailNameWidthNicu = { 16, 16, 16, 16 };
						patientDemoDetailNameNicu.setWidths(patientDemoDetailNameWidthNicu);
						patientDemoDetailNameNicu.setWidthPercentage(95f);
						patientDemoDetailNameNicu.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
						patientDemoDetailNameNicu.getDefaultCell().setBorder(Rectangle.BOX);

						patientDemoDetailNameNicu.addCell(new Phrase("Mode", subheader));
						patientDemoDetailNameNicu.addCell(new Phrase("Max PIP", subheader));
						patientDemoDetailNameNicu.addCell(new Phrase("Max PEEP", subheader));
						patientDemoDetailNameNicu.addCell(new Phrase("Max FiO2", subheader));

						if (!dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getMode1().equals("")) {
							patientDemoDetailNameNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getMode1(), tabletext));
						} else {

							patientDemoDetailNameNicu.addCell(new Phrase("-", tabletext));
						}

						if (!dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getPip1().equals("")) {
							patientDemoDetailNameNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getPip1(), tabletext));
						} else {

							patientDemoDetailNameNicu.addCell(new Phrase("-", tabletext));
						}

						if (!dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getPeep1().equals("")) {
							patientDemoDetailNameNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getPeep1(), tabletext));
						} else {

							patientDemoDetailNameNicu.addCell(new Phrase("-", tabletext));
						}

						if (!dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getFio1().equals("")) {
							patientDemoDetailNameNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getFio1(), tabletext));
						} else {

							patientDemoDetailNameNicu.addCell(new Phrase("-", tabletext));
						}

						//Second Row

						if (!dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getMode2().equals("")) {
							patientDemoDetailNameNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getMode2(), tabletext));
						} else {

							patientDemoDetailNameNicu.addCell(new Phrase("-", tabletext));
						}

						if (!dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getPip2().equals("")) {
							patientDemoDetailNameNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getPip2(), tabletext));
						} else {

							patientDemoDetailNameNicu.addCell(new Phrase("-", tabletext));
						}

						if (!dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getPeep2().equals("")) {
							patientDemoDetailNameNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getPeep2(), tabletext));
						} else {

							patientDemoDetailNameNicu.addCell(new Phrase("-", tabletext));
						}

						if (!dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getFio2().equals("")) {
							patientDemoDetailNameNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListVentilation().get(0).getFio2(), tabletext));
						} else {

							patientDemoDetailNameNicu.addCell(new Phrase("-", tabletext));
						}

						document.add(patientDemoDetailNameNicu);
						patientDemoDetailNameNicu.flushContent();

					}

					PdfPTable tablehead1 = new PdfPTable(1);
					int[] tablehead1WidthNicu = { 10 };
					tablehead1.setWidths(tablehead1WidthNicu);
					tablehead1.setWidthPercentage(95f);
					tablehead1.getDefaultCell().setBorder(Rectangle.TOP);

					tablehead1.addCell(new Phrase("", subheader));

					document.add(tablehead1);
					tablehead1.flushContent();

					if (!dsList.get(0).getPaediatricDeptNicu().getElectrolyte().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getSrk().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getSrcl().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getSrca().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getSrmg().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getOrganism().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getSensitive().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getBslmax().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getBslmin().equals("")) {

						PdfPTable patientDemoDetailElectrolyteNicu = new PdfPTable(4);
						int[] patientDemoDetailElectrolyteWidthNicu = { 26, 36, 26, 36 };
						patientDemoDetailElectrolyteNicu.setWidths(patientDemoDetailElectrolyteWidthNicu);
						patientDemoDetailElectrolyteNicu.setWidthPercentage(95f);
						patientDemoDetailElectrolyteNicu.getDefaultCell().setBorder(Rectangle.NO_BORDER);

						patientDemoDetailElectrolyteNicu.addCell(new Phrase("Electrolyte:", subheader1));
						patientDemoDetailElectrolyteNicu.addCell(new Phrase("", subheader));
						patientDemoDetailElectrolyteNicu.addCell(new Phrase("", subheader));
						patientDemoDetailElectrolyteNicu.addCell(new Phrase("", subheader));

						if (!dsList.get(0).getPaediatricDeptNicu().getElectrolyte().equals("")) {
							patientDemoDetailElectrolyteNicu.addCell(new Phrase("Sr Na -", subheader));
							patientDemoDetailElectrolyteNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getElectrolyte(), tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getSrk().equals("")) {
							patientDemoDetailElectrolyteNicu.addCell(new Phrase("Sr K -", subheader));
							patientDemoDetailElectrolyteNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getSrk(), tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getSrcl().equals("")) {
							patientDemoDetailElectrolyteNicu.addCell(new Phrase("Sr CL -", subheader));
							patientDemoDetailElectrolyteNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getSrcl(), tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getSrca().equals("")) {
							patientDemoDetailElectrolyteNicu.addCell(new Phrase("Sr Ca (mg%) -", subheader));
							patientDemoDetailElectrolyteNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getSrca(), tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getSrmg().equals("")) {
							patientDemoDetailElectrolyteNicu.addCell(new Phrase("Sr Mg-(mg%) -", subheader));
							patientDemoDetailElectrolyteNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getSrmg(), tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getOrganism().equals("")) {
							patientDemoDetailElectrolyteNicu.addCell(new Phrase("Blood Culture-Org. -", subheader));
							patientDemoDetailElectrolyteNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getOrganism(), tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getSensitive().equals("")) {
							patientDemoDetailElectrolyteNicu.addCell(new Phrase("Sensitive To -", subheader));
							patientDemoDetailElectrolyteNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getSensitive(), tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getBslmax().equals("")) {
							patientDemoDetailElectrolyteNicu.addCell(new Phrase("BSL- MAX -", subheader));
							patientDemoDetailElectrolyteNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getBslmax(), tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getBslmin().equals("")) {
							patientDemoDetailElectrolyteNicu.addCell(new Phrase("BSL- Min -", subheader));
							patientDemoDetailElectrolyteNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getBslmin(), tabletext));
						}

						patientDemoDetailElectrolyteNicu.addCell(new Phrase("", subheader));
						patientDemoDetailElectrolyteNicu.addCell(new Phrase("", subheader));

						patientDemoDetailElectrolyteNicu.addCell(new Phrase("", subheader));
						patientDemoDetailElectrolyteNicu.addCell(new Phrase("", subheader));
						patientDemoDetailElectrolyteNicu.addCell(new Phrase("", subheader));
						patientDemoDetailElectrolyteNicu.addCell(new Phrase("", subheader));

						document.add(patientDemoDetailElectrolyteNicu);
						patientDemoDetailElectrolyteNicu.flushContent();

						tablehead1.addCell(new Phrase("", subheader));

						document.add(tablehead1);
						tablehead1.flushContent();

					}

					if (!dsList.get(0).getPaediatricDeptNicu().getXray().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getUsg().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getCtmri().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getOtherex().equals("")) {

						PdfPTable patientDemoDetailImagingNicu = new PdfPTable(4);
						int[] patientDemoDetailImagingNicuWidth = { 26, 36, 26, 36 };
						patientDemoDetailImagingNicu.setWidths(patientDemoDetailImagingNicuWidth);
						patientDemoDetailImagingNicu.setWidthPercentage(95f);
						patientDemoDetailImagingNicu.getDefaultCell().setBorder(Rectangle.NO_BORDER);

						patientDemoDetailImagingNicu.addCell(new Phrase("Imaging : -", subheader1));
						patientDemoDetailImagingNicu.addCell(new Phrase("", subheader));
						patientDemoDetailImagingNicu.addCell(new Phrase("", subheader));
						patientDemoDetailImagingNicu.addCell(new Phrase("", subheader));

						if (!dsList.get(0).getPaediatricDeptNicu().getXray().equals("")) {
							patientDemoDetailImagingNicu.addCell(new Phrase("X - Ray -", subheader));
							patientDemoDetailImagingNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getXray(), tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getUsg().equals("")) {
							patientDemoDetailImagingNicu.addCell(new Phrase("USG -", subheader));
							patientDemoDetailImagingNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getUsg(), tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getCtmri().equals("")) {
							patientDemoDetailImagingNicu.addCell(new Phrase("CT/MRI -", subheader));
							patientDemoDetailImagingNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getCtmri(), tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getOtherex().equals("")) {
							patientDemoDetailImagingNicu.addCell(new Phrase("Others -", subheader));
							patientDemoDetailImagingNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getOtherex(), tabletext));
						}

						patientDemoDetailImagingNicu.addCell(new Phrase("", subheader));
						patientDemoDetailImagingNicu.addCell(new Phrase("", subheader));

						patientDemoDetailImagingNicu.addCell(new Phrase("", subheader));
						patientDemoDetailImagingNicu.addCell(new Phrase("", subheader));
						patientDemoDetailImagingNicu.addCell(new Phrase("", subheader));
						patientDemoDetailImagingNicu.addCell(new Phrase("", subheader));

						patientDemoDetailImagingNicu.addCell(new Phrase("", subheader));
						patientDemoDetailImagingNicu.addCell(new Phrase("", subheader));
						patientDemoDetailImagingNicu.addCell(new Phrase("", subheader));
						patientDemoDetailImagingNicu.addCell(new Phrase("", subheader));

						document.add(patientDemoDetailImagingNicu);
						patientDemoDetailImagingNicu.flushContent();

						tablehead1.addCell(new Phrase("", subheader));

						document.add(tablehead1);
						tablehead1.flushContent();
					}

					if (!dsList.get(0).getPaediatricDeptNicu().getPriConsult().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getPriConsultDate().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getPriConsultTime().equals("")) {

						PdfPTable patientDemoDetailFollowUpNicu = new PdfPTable(4);
						int[] patientDemoDetailFollowupWidth = { 26, 36, 26, 36 };
						patientDemoDetailFollowUpNicu.setWidths(patientDemoDetailFollowupWidth);
						patientDemoDetailFollowUpNicu.setWidthPercentage(95f);
						patientDemoDetailFollowUpNicu.getDefaultCell().setBorder(Rectangle.NO_BORDER);

						patientDemoDetailFollowUpNicu.addCell(new Phrase("Follow Up : -", subheader1));
						patientDemoDetailFollowUpNicu.addCell(new Phrase("", subheader));
						patientDemoDetailFollowUpNicu.addCell(new Phrase("", subheader));
						patientDemoDetailFollowUpNicu.addCell(new Phrase("", subheader));

						if (!dsList.get(0).getPaediatricDeptNicu().getPriConsult().equals("")) {
							patientDemoDetailFollowUpNicu.addCell(new Phrase("Pri. Consultant  -", subheader));
							patientDemoDetailFollowUpNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getPriConsult(), tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getPriConsultDate().equals("")) {
							patientDemoDetailFollowUpNicu.addCell(new Phrase("Date  -", subheader));
							patientDemoDetailFollowUpNicu.addCell(
									new Phrase(dsList.get(0).getPaediatricDeptNicu().getPriConsultDate(), tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getPriConsultTime().equals("")) {
							patientDemoDetailFollowUpNicu.addCell(new Phrase("Time  -", subheader));
							patientDemoDetailFollowUpNicu.addCell(
									new Phrase(dsList.get(0).getPaediatricDeptNicu().getPriConsultTime(), tabletext));
						}

						patientDemoDetailFollowUpNicu.addCell(new Phrase("", subheader));
						patientDemoDetailFollowUpNicu.addCell(new Phrase("", subheader));
						patientDemoDetailFollowUpNicu.addCell(new Phrase("", subheader));
						patientDemoDetailFollowUpNicu.addCell(new Phrase("", subheader));

						patientDemoDetailFollowUpNicu.addCell(new Phrase("", subheader));
						patientDemoDetailFollowUpNicu.addCell(new Phrase("", subheader));
						patientDemoDetailFollowUpNicu.addCell(new Phrase("", subheader));
						patientDemoDetailFollowUpNicu.addCell(new Phrase("", subheader));

						document.add(patientDemoDetailFollowUpNicu);
						patientDemoDetailFollowUpNicu.flushContent();

						tablehead1.addCell(new Phrase("", subheader));

						document.add(tablehead1);
						tablehead1.flushContent();
					}

					if (!dsList.get(0).getPaediatricDeptNicu().getHrOPD().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getHrOPDDate().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getHrOPDTime().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getFinalOther().equals("")) {

						PdfPTable patientDemoDetailOthersNicu = new PdfPTable(4);
						int[] patientDemoDetailOthersWidth = { 26, 36, 26, 36 };
						patientDemoDetailOthersNicu.setWidths(patientDemoDetailOthersWidth);
						patientDemoDetailOthersNicu.setWidthPercentage(95f);
						patientDemoDetailOthersNicu.getDefaultCell().setBorder(Rectangle.NO_BORDER);

						patientDemoDetailOthersNicu.addCell(new Phrase("Others : -", subheader1));
						patientDemoDetailOthersNicu.addCell(new Phrase("", subheader));
						patientDemoDetailOthersNicu.addCell(new Phrase("", subheader));
						patientDemoDetailOthersNicu.addCell(new Phrase("", subheader));

						if (!dsList.get(0).getPaediatricDeptNicu().getHrOPD().equals("")) {
							patientDemoDetailOthersNicu.addCell(new Phrase("High Risk OPD -", subheader));
							patientDemoDetailOthersNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getHrOPD(), tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getHrOPDDate().equals("")) {
							patientDemoDetailOthersNicu.addCell(new Phrase("Date  -", subheader));
							patientDemoDetailOthersNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getHrOPDDate(), tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getHrOPDTime().equals("")) {
							patientDemoDetailOthersNicu.addCell(new Phrase("Time  -", subheader));
							patientDemoDetailOthersNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getHrOPDTime(), tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getFinalOther().equals("")) {
							patientDemoDetailOthersNicu.addCell(new Phrase("Other  -", subheader));
							patientDemoDetailOthersNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getFinalOther(), tabletext));
						}

						patientDemoDetailOthersNicu.addCell(new Phrase("", subheader));
						patientDemoDetailOthersNicu.addCell(new Phrase("", subheader));
						patientDemoDetailOthersNicu.addCell(new Phrase("", subheader));
						patientDemoDetailOthersNicu.addCell(new Phrase("", subheader));

						patientDemoDetailOthersNicu.addCell(new Phrase("", subheader));
						patientDemoDetailOthersNicu.addCell(new Phrase("", subheader));
						patientDemoDetailOthersNicu.addCell(new Phrase("", subheader));
						patientDemoDetailOthersNicu.addCell(new Phrase("", subheader));

						document.add(patientDemoDetailOthersNicu);
						patientDemoDetailOthersNicu.flushContent();

						tablehead1.addCell(new Phrase("", subheader));

						document.add(tablehead1);
						tablehead1.flushContent();
					}

					PdfPTable patientDemoDetailtableNicu = new PdfPTable(5);
					int[] patientDemoDetailtableWidth = { 16, 16, 16, 16, 16 };
					patientDemoDetailtableNicu.setWidths(patientDemoDetailtableWidth);
					patientDemoDetailtableNicu.setWidthPercentage(95f);
					patientDemoDetailtableNicu.getDefaultCell().setBorder(Rectangle.BOX);

					patientDemoDetailtableNicu.addCell(new Phrase("Date", subheader));
					if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDate1().equals("")) {
						patientDemoDetailtableNicu
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDate1(), tabletext));
					} else {

						patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
					}
					if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDate2().equals("")) {
						patientDemoDetailtableNicu
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDate2(), tabletext));
					} else {

						patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
					}
					if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDate3().equals("")) {
						patientDemoDetailtableNicu
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDate3(), tabletext));
					} else {

						patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
					}
					if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDate4().equals("")) {
						patientDemoDetailtableNicu
								.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDate4(), tabletext));
					} else {

						patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
					}

					if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getBillirubin1().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getBillirubin2().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getBillirubin3().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getBillirubin4().equals("")) {

						patientDemoDetailtableNicu.addCell(new Phrase("Sr Billirubin", subheader));
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getBillirubin1().equals("")) {
							patientDemoDetailtableNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getBillirubin1(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getBillirubin2().equals("")) {
							patientDemoDetailtableNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getBillirubin2(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getBillirubin3().equals("")) {
							patientDemoDetailtableNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getBillirubin3(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getBillirubin4().equals("")) {
							patientDemoDetailtableNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getBillirubin4(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
					}

					if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getTotal1().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getTotal2().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getTotal3().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getTotal4().equals("")) {

						patientDemoDetailtableNicu.addCell(new Phrase("Total", subheader));
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getTotal1().equals("")) {
							patientDemoDetailtableNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getTotal1(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getTotal2().equals("")) {
							patientDemoDetailtableNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getTotal2(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getTotal3().equals("")) {
							patientDemoDetailtableNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getTotal3(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getTotal4().equals("")) {
							patientDemoDetailtableNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getTotal4(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
					}

					if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getIndirect1().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getIndirect2().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getIndirect3().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getIndirect4().equals("")) {

						patientDemoDetailtableNicu.addCell(new Phrase("Indirect", subheader));
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getIndirect1().equals("")) {
							patientDemoDetailtableNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getIndirect1(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getIndirect2().equals("")) {
							patientDemoDetailtableNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getIndirect2(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getIndirect3().equals("")) {
							patientDemoDetailtableNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getIndirect3(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getIndirect4().equals("")) {
							patientDemoDetailtableNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getIndirect4(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
					}

					if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDirect1().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDirect2().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDirect3().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDirect4().equals("")) {

						patientDemoDetailtableNicu.addCell(new Phrase("Direct", subheader));
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDirect1().equals("")) {
							patientDemoDetailtableNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDirect1(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDirect2().equals("")) {
							patientDemoDetailtableNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDirect2(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDirect3().equals("")) {
							patientDemoDetailtableNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDirect3(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDirect4().equals("")) {
							patientDemoDetailtableNicu
									.addCell(new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getDirect4(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
					}

					if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getPhototherapy1().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getPhototherapy2().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getPhototherapy3().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getPhototherapy4().equals("")) {

						patientDemoDetailtableNicu.addCell(new Phrase("Phototherapy", subheader));
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getPhototherapy1().equals("")) {
							patientDemoDetailtableNicu.addCell(
									new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getPhototherapy1(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getPhototherapy2().equals("")) {
							patientDemoDetailtableNicu.addCell(
									new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getPhototherapy2(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getPhototherapy3().equals("")) {
							patientDemoDetailtableNicu.addCell(
									new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getPhototherapy3(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
						if (!dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getPhototherapy4().equals("")) {
							patientDemoDetailtableNicu.addCell(
									new Phrase(dsList.get(0).getPaediatricDeptNicu().getListElectrolyte().get(0).getPhototherapy4(), tabletext));
						} else {

							patientDemoDetailtableNicu.addCell(new Phrase("-", tabletext));
						}
					}

					document.add(patientDemoDetailtableNicu);
					patientDemoDetailtableNicu.flushContent();

					PdfPTable patientDemoDetailtable = new PdfPTable(7);
					int[] patientDemoDetailWidth = { 55, 55, 45, 55, 20, 30, 50 };
					patientDemoDetailtable.setWidths(patientDemoDetailWidth);
					patientDemoDetailtable.setWidthPercentage(95f);
					patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));

					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));

					document.add(patientDemoDetailtable);
					patientDemoDetailtable.flushContent();

					if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getRedReflex1().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getRedReflex2().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHips1().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHips2().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getFemorals1().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getFemorals2().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getGenitals1().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getGenitals2().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHernia1().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHernia2().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHeadcir1().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHeadcir2().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getPcother1().equals("")
							|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getPcother2().equals("")) {

						patientDemoDetailtable.addCell(new Phrase("Predischarge Check :", subheader1));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));

						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));

						patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.BOX);
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("           Rt.", subheader));
						patientDemoDetailtable.addCell(new Phrase("           Lt.", subheader));

						patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));

						//1st Row

						if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getRedReflex1().equals("")
								|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getRedReflex2().equals("")) {

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.BOX);
							patientDemoDetailtable.addCell(new Phrase("  1. Red Reflex", subheader));
							if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getRedReflex1().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getRedReflex1(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}
							if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getRedReflex2().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getRedReflex2(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
						}

						//2nd Row

						if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHips1().equals("")
								|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHips2().equals("")) {

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.BOX);
							patientDemoDetailtable.addCell(new Phrase("  2. Hips", subheader));
							if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHips1().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHips1(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}
							if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHips2().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHips2(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
						}

						//3rd Row

						if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getFemorals1().equals("")
								|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getFemorals2().equals("")) {

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.BOX);
							patientDemoDetailtable.addCell(new Phrase("  3. Femorals", subheader));
							if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getFemorals1().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getFemorals1(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}
							if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getFemorals2().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getFemorals2(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
						}
						//4th Row

						if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getGenitals1().equals("")
								|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getGenitals2().equals("")) {

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.BOX);
							patientDemoDetailtable.addCell(new Phrase("  4. Genitals", subheader));
							if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getGenitals1().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getGenitals1(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}
							if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getGenitals2().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getGenitals2(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
						}

						//5th Row

						if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHernia1().equals("")
								|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHernia2().equals("")) {

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.BOX);
							patientDemoDetailtable.addCell(new Phrase("  5. Hernia", subheader));
							if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHernia1().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHernia1(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}
							if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHernia2().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHernia2(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
						}

						//6th Row

						if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHeadcir1().equals("")
								|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHeadcir2().equals("")) {

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.BOX);
							patientDemoDetailtable.addCell(new Phrase("  6. Head Circm.", subheader));
							if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHeadcir1().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHeadcir1(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}
							if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHeadcir2().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getHeadcir2(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
						}

						//7th Row

						if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getPcother1().equals("")
								|| !dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getPcother2().equals("")) {

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.BOX);
							patientDemoDetailtable.addCell(new Phrase("  7. Other", subheader));
							if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getPcother1().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getPcother1(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}
							if (!dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getPcother2().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListImaging().get(0).getPcother2(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));

						}

						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));

						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));

						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));
						patientDemoDetailtable.addCell(new Phrase("", subheader));

						document.add(patientDemoDetailtable);
						patientDemoDetailtable.flushContent();
					}
					patientDemoDetailtable.addCell(new Phrase("Advice On Discharge :", subheader1));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));

					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));

					patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.BOX);
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("           Date.", subheader));
					patientDemoDetailtable.addCell(new Phrase("           Time", subheader));
					patientDemoDetailtable.addCell(new Phrase("           Reporting Place", subheader));

					patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));
					patientDemoDetailtable.addCell(new Phrase("", subheader));

					//1st Row

					String ROPDateTime = dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getRopScreen1();
					String[] ROPDateTime1 = ROPDateTime.split("\\*");

					if (ROPDateTime1.length != 0) {

						String Date = ROPDateTime1[0];
						String Time = ROPDateTime1[1];

						if (!Date.equals("") || !Time.equals("")
								|| !dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getRopScreen2().equals("")) {

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.BOX);
							patientDemoDetailtable.addCell(new Phrase("  ROP Screening", subheader));
							if (!Date.equals("")) {
								patientDemoDetailtable.addCell(new Phrase("          " + Date, tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}
							if (!Time.equals("")) {
								patientDemoDetailtable.addCell(new Phrase("          " + Time, tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}
							if (!dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getRopScreen2().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getRopScreen2(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));

						}
					} else {

						if (!dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getRopScreen2().equals("")) {

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.BOX);
							patientDemoDetailtable.addCell(new Phrase("  ROP Screening", subheader));
							patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							patientDemoDetailtable.addCell(new Phrase("          -", tabletext));

							if (!dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getRopScreen2().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getRopScreen2(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));

						}
					}
					//2nd Row

					String HearingDateTime = dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getHearingScreen1();
					String[] HearingDateTime1 = HearingDateTime.split("\\*");

					if (HearingDateTime1.length != 0) {

						if (!HearingDateTime1[0].equals("") || !HearingDateTime1[1].equals("")
								|| !dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getHearingScreen2().equals("")) {

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.BOX);
							patientDemoDetailtable.addCell(new Phrase("  Hearing Screening", subheader));
							if (!HearingDateTime1[0].equals("")) {
								patientDemoDetailtable.addCell(new Phrase("          " + HearingDateTime1[0], tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}
							if (!HearingDateTime1[1].equals("")) {
								patientDemoDetailtable.addCell(new Phrase("          " + HearingDateTime1[1], tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}
							if (!dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getHearingScreen2().equals("")) {
								patientDemoDetailtable.addCell(
										new Phrase("          " + dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getHearingScreen2(),
												tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));

						}
					} else {

						if (!dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getHearingScreen2().equals("")) {

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.BOX);
							patientDemoDetailtable.addCell(new Phrase("  Hearing Screening", subheader));
							patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							patientDemoDetailtable.addCell(new Phrase("          -", tabletext));

							if (!dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getHearingScreen2().equals("")) {
								patientDemoDetailtable.addCell(
										new Phrase("          " + dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getHearingScreen2(),
												tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));

						}

					}

					//3rd Row

					String usgDateTime = dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getUsgBrain1();
					String[] usgDateTime1 = usgDateTime.split("\\*");

					if (usgDateTime1.length != 0) {

						if (!usgDateTime1[0].equals("") || !usgDateTime1[1].equals("")
								|| !dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getUsgBrain2().equals("")) {

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.BOX);
							patientDemoDetailtable.addCell(new Phrase("  USG Brain", subheader));
							if (!usgDateTime1[0].equals("")) {
								patientDemoDetailtable.addCell(new Phrase("          " + usgDateTime1[0], tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}
							if (!usgDateTime1[1].equals("")) {
								patientDemoDetailtable.addCell(new Phrase("          " + usgDateTime1[1], tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}
							if (!dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getUsgBrain2().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getUsgBrain2(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));

						}
					} else {

						if (!dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getUsgBrain2().equals("")) {

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.BOX);
							patientDemoDetailtable.addCell(new Phrase("  USG Brain", subheader));
							patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							patientDemoDetailtable.addCell(new Phrase("          -", tabletext));

							if (!dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getUsgBrain2().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getUsgBrain2(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));

						}
					}

					//4th Row

					String OtherDateTime = dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getAdother1();
					String[] OtherDateTime1 = OtherDateTime.split("\\*");

					if (OtherDateTime1.length != 0) {

						if (!OtherDateTime1[0].equals("") || !OtherDateTime1[1].equals("")
								|| !dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getAdother2().equals("")) {

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.BOX);
							patientDemoDetailtable.addCell(new Phrase("  Other", subheader));
							if (!OtherDateTime1[0].equals("")) {
								patientDemoDetailtable.addCell(new Phrase("          " + OtherDateTime1[0], tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}
							if (!OtherDateTime1[1].equals("")) {
								patientDemoDetailtable.addCell(new Phrase("          " + OtherDateTime1[1], tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}
							if (!dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getAdother2().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getAdother2(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));

						}
					} else {

						if (!dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getAdother2().equals("")) {

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.BOX);
							patientDemoDetailtable.addCell(new Phrase("  Other", subheader));
							patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							patientDemoDetailtable.addCell(new Phrase("          -", tabletext));

							if (!dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getAdother2().equals("")) {
								patientDemoDetailtable.addCell(new Phrase(
										"          " + dsList.get(0).getPaediatricDeptNicu().getListAdviceOnDesc().get(0).getAdother2(), tabletext));
							} else {

								patientDemoDetailtable.addCell(new Phrase("          -", tabletext));
							}

							patientDemoDetailtable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));
							patientDemoDetailtable.addCell(new Phrase("", subheader));

						}

					}
					document.add(patientDemoDetailtable);
					patientDemoDetailtable.flushContent();

				}
					}
				}
			}
		}
		
		/// 		}//End Paediatric and Non-Paediatric
		
		
		//AdminModel admodel = new AdminModel();
		Doctor doc1 = new Doctor();
		List<Doctor> listDoc = null;
		String signature = "";
		String Doc_Nme = "";
		if (docId != "" && docId != null && docId != "-") {

			if (docId.contains(",")) {

				String[] doctors = docId.split(",");

				for (String str : doctors) {
			String DocID = str;
			int id = Integer.parseInt(str);
			//listDoc  = admodel.getDoctorsDetails(id);
			Doc_Nme = "";//Doc_Nme + listDoc2.get(0).getDoc_name()+",";

				}

			} else {

				int id = Integer.parseInt(docId);
				//listDoc  = admodel.getDoctorsDetails(id);
				//signature = listDoc.get(0).getDocsign();
			}

		}
		
		
		if (!type.equals("DischargeSummaryWithoutHF")) {
			document.add(HeaderTable4);
			HeaderTable4.flushContent();
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			if (docId != "" && docId != null && docId != "-") {
				if (docId.contains(",")) {
			HeaderTable4.addCell(new Phrase("" + Doc_Nme, subheader));

				} else {
			//HeaderTable4.addCell(new Phrase("" + listDoc.get(0).getDoc_name(), subheader));

				}
			} else {
				HeaderTable4.addCell(new Phrase("-", subheader));
			}
			document.add(HeaderTable4);
			HeaderTable4.flushContent();

			HeaderTable4.addCell(new Phrase("", tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));

			document.add(HeaderTable4);
			HeaderTable4.flushContent();

			document.add(HeaderTable1);
			HeaderTable1.flushContent();
		}
			      				
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