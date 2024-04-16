<%@page import="com.hms.doctordesk.dto.OPDRadioTheropyCheckBox"%>
<%@page import="com.hms.doctordesk.dto.OPDPrescriptionFolloUpDto"%>
<%@page import="com.hms.doctordesk.dto.OPDCareAdviceDTO"%>
<%@page import="com.hms.patient.util.OSValidator"%>
<%@page import="org.jfree.chart.renderer.category.LineAndShapeRenderer"%>
<%@page import="org.jfree.chart.renderer.category.CategoryItemRenderer"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="java.util.Date"%>
<%@page import="org.jfree.chart.axis.CategoryLabelPositions"%>
<%@page import="org.jfree.chart.axis.CategoryAxis"%>
<%@page import="org.jfree.chart.title.TextTitle"%>
<%@page import="org.jfree.ui.RectangleEdge"%>
<%@page import="org.jfree.chart.plot.CategoryPlot"%>
<%@page import="org.jfree.chart.ChartUtilities"%>
<%@page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="java.awt.Color"%>
<%@page import="javax.sound.midi.SysexMessage"%>
<%@page import="com.hms.TempEventHandlerPalvePDF"%>
<%@page import="com.hms.utility.PageEventHandlerBean"%>
<%@page import="com.lowagie.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.lowagie.text.html.simpleparser.StyleSheet"%>
<%@page import="jxl.format.BoldStyle"%>
<%@page import="org.jfree.chart.plot.PlotOrientation"%>
<%@page import="org.jfree.data.category.DefaultCategoryDataset"%>
<%@page import="org.apache.tools.ant.types.CommandlineJava.SysProperties"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.lowagie.text.pdf.PdfTemplate"%>
<%@page import="java.awt.geom.Rectangle2D"%>
<%@page import="java.awt.Graphics2D"%>
<%@page import="org.jfree.chart.ChartFactory"%>
<%@page import="org.jfree.chart.JFreeChart"%>
<%@page import="org.jfree.data.general.DefaultPieDataset"%>
<%@page import="com.lowagie.text.pdf.PdfGState"%>
<%@page import="com.lowagie.text.pdf.GrayColor"%>
<%@page import="com.lowagie.text.pdf.Barcode128"%>
<%@page import="com.lowagie.text.pdf.ColumnText"%>
<%@page import="com.lowagie.text.pdf.PdfContentByte"%>
<%@page import="com.lowagie.text.PageSize"%>
<%@page import="com.lowagie.text.HeaderFooter"%>
<%@page import="com.hms.pathology.dto.PathologySampleWiseMaster"%>
<%@page import="com.hms.pathology.service.Phlebotomyservice"%>
<%@page import="com.hms.dto.LabUnitType"%>
<%@page import="com.hms.dto.Assessment"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.pharmacy.upload.FilePath"%>
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

<%@page import="com.lowagie.text.pdf.BaseFont"%>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="com.lowagie.text.Chunk,com.lowagie.text.Document,com.lowagie.text.Element,com.lowagie.text.Font 
,com.lowagie.text.HeaderFooter,com.lowagie.text.Image,com.lowagie.text.Paragraph,com.lowagie.text.Phrase,com.lowagie.text.Rectangle
,com.lowagie.text.pdf.PdfPCell,com.lowagie.text.pdf.PdfPTable,com.lowagie.text.pdf.PdfWriter,com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport,
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants, com.hms.pharmacy.upload.FilePath,java.nio.file.Paths"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@page import="java.util.Calendar"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>OPD Main Print</title>
</head>
<body>
	<%
		try {
		/* -------------------------------------- Declaration ---------------------------------------------   */
		response.setContentType("application/pdf");
		
		HttpSession session1 = request.getSession();
		int hospitalUnitId= (Integer) session1.getAttribute("uId");
		HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
		//List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
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
		
		
		String pathFont=System.getProperty("user.dir");
		String pathProject = Paths.get("").toAbsolutePath().toString();
			//String fontName= application.getRealPath("\\fonts\\Shivaji05.ttf");
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
		
		int treatmentId = Integer.parseInt(request.getParameter("treatmentId"));
		String  languageOF=request.getParameter("instructionLanguage");
		String  CallFromOPD=request.getParameter("CallFrom");
		String  printTitle=request.getParameter("printTitle");
		String  patientName=request.getParameter("patientName");
		//String idTreatment = request.getParameter("treatmentId");
		//String callFrom = request.getParameter("callFrom");
       String headerFlag="Yes";
       if(CallFromOPD.equalsIgnoreCase("withoutheader")){
    	   headerFlag="No";
       }
		
		HttpSession session2 = request.getSession();
		String user_name = (String) session1.getAttribute("userName");
		Integer userId = (Integer) session1.getAttribute("userId");
		Integer unitId = (Integer) session1.getAttribute("uId");
		request.setAttribute("headerFlag", "Yes");
		request.setAttribute("covide", "No");
		request.setAttribute("pageIteration", 0);
		request.setAttribute("footerAddress", "");		
		request.setAttribute("printTitle", printTitle);
		
		SimpleDateFormat formDate = new SimpleDateFormat("dd-MM-yyyy");
	    String strDate = formDate.format(new Date());
		//response.setHeader("Content-Disposition", "inline; filename="+pmobile+"_"+ppName+"_"+profileName+"_"+strDate+".pdf");	
		response.setHeader("Content-Disposition", "inline; filename="+patientName+"_"+strDate+".pdf");

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
		TempEventHandlerPalvePDF event = new TempEventHandlerPalvePDF();
		pdfWriter.setPageEvent(event);

		String reportFooterAddress = "";//hospObj.getReportFooterAddress();
		if(reportFooterAddress.equalsIgnoreCase(null) || reportFooterAddress.equalsIgnoreCase("") || reportFooterAddress == null)
		{
			reportFooterAddress="";			
		}
		
		document.open();		
		

		java.util.Calendar currentDate = Calendar.getInstance();
		//SimpleDateFormat dateformatter = new SimpleDateFormat("yyyy-MM-dd hh:mm aa");
		SimpleDateFormat dateformatter = new SimpleDateFormat("dd-MM-yyyy hh:mm aa");
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
			   
			// strat History Data


         PdfPTable HeaderTable5 = new PdfPTable(7);
			int[] headerwidth5 = { 27, 40, 30, 10, 15, 40, 20 };
			HeaderTable5.setWidths(headerwidth5);
			HeaderTable5.setWidthPercentage(95f);
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

			 OPDHistoryController uss1=(ApplicationContextUtils.getApplicationContext()).getBean(OPDHistoryController.class);
			 OPDHistoryService uss2=(ApplicationContextUtils.getApplicationContext()).getBean(OPDHistoryService.class);
			  OPDHistoryMasterDTO historyobj=  uss2.getOPDHistory(treatmentId);

			  PdfPTable HeaderTableSpace = new PdfPTable(1);
			 	int[] headerwidthSpace = {40 };
			 	HeaderTableSpace.setWidths(headerwidthSpace);
			 	HeaderTableSpace.setWidthPercentage(95f);
			 	HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			 	HeaderTableSpace.setSpacingAfter(5.0f);
			 	
			 	PdfPTable HeaderTableSpace1 = new PdfPTable(1);
			 	int[] headerwidthSpace1 = {40 };
			 	HeaderTableSpace1.setWidths(headerwidthSpace1);
			 	HeaderTableSpace1.setWidthPercentage(95f);
			 	HeaderTableSpace1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			 	HeaderTableSpace1.setSpacingAfter(50.0f);
			 	
			 	PdfPTable HeaderBottomLine = new PdfPTable(1);
			 	int[] headerBottomHeaderWidth = { 100};
			 	HeaderBottomLine.setWidths(headerBottomHeaderWidth);
			 	HeaderBottomLine.setWidthPercentage(95f);
			 	
			 	PdfPTable HeaderTableTitle = new PdfPTable(1);
			 	int[] headerwidthTitle = {100 };
			 	HeaderTableTitle.setWidths(headerwidthTitle);
			 	HeaderTableTitle.setWidthPercentage(95f);
			 	HeaderTableTitle.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			 	HeaderTableTitle.setSpacingAfter(5.0f);

			 	
			 	

			 	PdfPTable HeaderTableH = new PdfPTable(4);
			 			int[] headerwidthChemo = {20,20,20,20 };
			 			HeaderTableH.setWidths(headerwidthChemo);
			 			HeaderTableH.setWidthPercentage(95f);
			 			HeaderTableH.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			 			
			 			PdfPTable HeaderTableCh = new PdfPTable(3);
			 			int[] headerwidthCh = {3,20,5 };
			 			HeaderTableCh.setWidths(headerwidthCh);
			 			HeaderTableCh.setWidthPercentage(95f);
			 			HeaderTableCh.getDefaultCell().setBorder(Rectangle.BOX);
			 			
			 			
			          
			 //End History Data
			 		
			
			        //start dignosis info
			          DiagonosisController daignocontrooler=(ApplicationContextUtils.getApplicationContext()).getBean(DiagonosisController.class);
			          DiagonosisService diagnoservice=(ApplicationContextUtils.getApplicationContext()).getBean(DiagonosisService.class);
			          List<DiagonosisMasterDto> lstdignoObj=  diagnoservice.getListOfDiagoList(treatmentId);
			           
			          PdfPTable HeaderTableDiagno = new PdfPTable(7);
			          int[] headerwidthDigno = {3,15,20,5,5,5,5 };
			          HeaderTableDiagno.setWidths(headerwidthDigno);
			          HeaderTableDiagno.setWidthPercentage(95f);
			          HeaderTableDiagno.getDefaultCell().setBorder(Rectangle.BOX);
			          if(lstdignoObj.size() > 0){
			          	 
			          	HeaderTableTitle.addCell(new Phrase("DIAGNOSIS INFO:", headerTitle));
	         	 		document.add(HeaderTableTitle);
	         	 		HeaderTableTitle.flushContent();
			          	 
			          	 HeaderTableSpace.addCell(new Phrase("", tabletext));
			          		document.add(HeaderTableSpace);
			          		HeaderTableSpace.flushContent();
			          		int pdiagnoCount=0;
			          		int cdiagnoCount=0;
			          		for(int i=0; i< lstdignoObj.size();i++){
			          			if(lstdignoObj.get(i).getDiagnoType().equalsIgnoreCase("Provisional")){
			          				pdiagnoCount++;
			          			}
			          		}
			          		
			          		for(int i=0; i< lstdignoObj.size();i++){
			          			if(lstdignoObj.get(i).getDiagnoType().equalsIgnoreCase("Confirmed")){
			          				cdiagnoCount++;
			          			}
			          		}
			          		
			          		if(pdiagnoCount > 0){
			          		 HeaderTableH.addCell(new Phrase(" Provisional Diagnosis :", subheader));
			          		 HeaderTableH.addCell(new Phrase("", tabletext));
			          		 HeaderTableH.addCell(new Phrase(" ", subheader));
			          		 HeaderTableH.addCell(new Phrase("", tabletext));
			          		 		 
			          		 document.add(HeaderTableH);
			          		 HeaderTableH.flushContent();
			          		 }
			          		if(pdiagnoCount > 0){
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
			          		
			          		 HeaderTableSpace.addCell(new Phrase("", tabletext));
			          			document.add(HeaderTableSpace);
			          			HeaderTableSpace.flushContent();
			          		}
			          		
			          			if(cdiagnoCount > 0){
			          			 HeaderTableH.addCell(new Phrase(" Confirmed Diagnosis :", subheader));
			          			 HeaderTableH.addCell(new Phrase("", tabletext));
			          			 HeaderTableH.addCell(new Phrase(" ", subheader));
			          			 HeaderTableH.addCell(new Phrase("", tabletext));
			          			 
			          			 document.add(HeaderTableH);
			          			 HeaderTableH.flushContent();
			          			}
			          			 HeaderTableSpace.addCell(new Phrase("", tabletext));
			          				document.add(HeaderTableSpace);
			          				HeaderTableSpace.flushContent();
			          				
			          				if(cdiagnoCount > 0){
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
			          				
			          				HeaderTableSpace.addCell(new Phrase("", tabletext));
			          				HeaderTableSpace.addCell(new Phrase("", tabletext));
	          			  			document.add(HeaderTableSpace);
	          			  			HeaderTableSpace.flushContent();
			          				}
			          				
			          					
			          				
			          					
			          					 HeaderTable5.addCell(new Phrase("", tabletext));
			          			  			HeaderTable5.addCell(new Phrase("", tabletext));
			          			  			 HeaderTable5.addCell(new Phrase("", tabletext));
			          			  			HeaderTable5.addCell(new Phrase("", tabletext));
			          			  			 HeaderTable5.addCell(new Phrase("", tabletext));
			          			   			HeaderTable5.addCell(new Phrase("", tabletext));
			          			   			 HeaderTable5.addCell(new Phrase("", tabletext));
			          				   		 document.add(HeaderTable5);
			          			   			HeaderTable5.flushContent();
			          			   			
			          			   			HeaderTableSpace.addCell(new Phrase("", tabletext));
			          			  			document.add(HeaderTableSpace);
			          			  			HeaderTableSpace.flushContent();
			          			  			
			          			  		
			          			  			
			          			  			
			          }

			          //End Dignosis Info

			        //start service Advice Info
			      	HttpServletRequest hrequest=null;
			      OpdServicesAdvisedController serviceController=(ApplicationContextUtils.getApplicationContext()).getBean(OpdServicesAdvisedController.class);
			      OpdServicesAdvisedService serviceAdvice=(ApplicationContextUtils.getApplicationContext()).getBean(OpdServicesAdvisedService.class);
			      List<CpoeServdetails> lstserviceObj=  serviceAdvice.getListBill(treatmentId, "default", 0, hrequest);

			      PdfPTable HeaderTableServiceAdvice = new PdfPTable(6);
			      int[] headerwidthServiceAdvice = {3,15,5,15,5,10 };
			      HeaderTableServiceAdvice.setWidths(headerwidthServiceAdvice);
			      HeaderTableServiceAdvice.setWidthPercentage(95f);
			      HeaderTableServiceAdvice.getDefaultCell().setBorder(Rectangle.BOX);

			      if(lstserviceObj.size() > 0){
				    	 
				          	HeaderTableTitle.addCell(new Phrase("SERVICE ADVICE INFO:", headerTitle));
		         	 		document.add(HeaderTableTitle);
		         	 		HeaderTableTitle.flushContent();
				      	 
				        	 HeaderTableSpace.addCell(new Phrase("", tabletext));
				      		document.add(HeaderTableSpace);
				      		HeaderTableSpace.flushContent();
			      		
			      		HeaderTableServiceAdvice.addCell(new Phrase("Sr.No", subheader));
			      		HeaderTableServiceAdvice.addCell(new Phrase("Particulars ", subheader));
			      		HeaderTableServiceAdvice.addCell(new Phrase("Date", subheader));
			      		HeaderTableServiceAdvice.addCell(new Phrase("Consultant Name", subheader));
			      		HeaderTableServiceAdvice.addCell(new Phrase("Type", subheader));
			      		HeaderTableServiceAdvice.addCell(new Phrase("Clinical Notes", subheader));
			      		
			      		int scount=1;
			      		for(int i=0;i < lstserviceObj.size();i++){
			      			
			      		/* Date d=lstserviceObj.get(i).getCreated_date_time();
			      		String date=d.toLocaleString(); */
			      		
			      			HeaderTableServiceAdvice.addCell(new Phrase(""+scount, tabletext));
			      			HeaderTableServiceAdvice.addCell(new Phrase(""+lstserviceObj.get(i).getCategoryName(), tabletext));
			      			HeaderTableServiceAdvice.addCell(new Phrase(""+lstserviceObj.get(i).getCreated_date_time(), tabletext));
			      			HeaderTableServiceAdvice.addCell(new Phrase(""+lstserviceObj.get(i).getDocName(), tabletext));
			      			HeaderTableServiceAdvice.addCell(new Phrase(""+lstserviceObj.get(i).getServicename(), tabletext));
			      			HeaderTableServiceAdvice.addCell(new Phrase(""+lstserviceObj.get(i).getClinical_notes(), tabletext));
			      			scount++;
			      		}
			      		
			      		
			      		 document.add(HeaderTableServiceAdvice);
			      		 HeaderTableServiceAdvice.flushContent();
			      		 
			      		 HeaderTableSpace.addCell(new Phrase("", tabletext));
			      			document.add(HeaderTableSpace);
			      			HeaderTableSpace.flushContent();
			      			
			      			
			      		 
			      		 HeaderTable5.addCell(new Phrase("", tabletext));
			      			HeaderTable5.addCell(new Phrase("", tabletext));
			      			 HeaderTable5.addCell(new Phrase("", tabletext));
			      			HeaderTable5.addCell(new Phrase("", tabletext));
			      			 HeaderTable5.addCell(new Phrase("", tabletext));
			      			HeaderTable5.addCell(new Phrase("", tabletext));
			      			 HeaderTable5.addCell(new Phrase("", tabletext));
			      	   		 document.add(HeaderTable5);
			      			HeaderTable5.flushContent();
			      			
			      			HeaderTableSpace.addCell(new Phrase("", tabletext));
			      			document.add(HeaderTableSpace);
			      			HeaderTableSpace.flushContent();
			      			
			      			
			      			
			      			
			      }
			      //end service Advice Info

			      //start prescription 

			      PrescriptionService pservice  =(ApplicationContextUtils.getApplicationContext()).getBean(PrescriptionService.class);
			      List<OPDPrescriptionDtoSP> listPrescriptionsSP = new ArrayList<>();	
			      listPrescriptionsSP =  pservice.getAllPrescriptionsByTreatmentId(treatmentId, unitId);  // data by stored procedure

			     // HeaderTableSpace.addCell(new Phrase("", tabletext));
			      //document.add(HeaderTableSpace);
			      //HeaderTableSpace.flushContent();

			     // HeaderTableSpace.addCell(new Phrase("", tabletext));
			      //document.add(HeaderTableSpace);
			      //HeaderTableSpace.flushContent();

			     // HeaderTableSpace.addCell(new Phrase("", tabletext));
			      //document.add(HeaderTableSpace);
			      //HeaderTableSpace.flushContent();


			      	PdfPTable HeaderTableH1 = new PdfPTable(4);
			      			int[] headerwidthChemo1 = {20,20,20,20 };
			      			HeaderTableH1.setWidths(headerwidthChemo1);
			      			HeaderTableH1.setWidthPercentage(95f);
			      			HeaderTableH1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			      			
			      			PdfPTable HeaderTableCh1 = new PdfPTable(7);
			      			int[] headerwidthCh1 = {3,20,3,20,7,5,5 };
			      			HeaderTableCh1.setWidths(headerwidthCh1);
			      			HeaderTableCh1.setWidthPercentage(95f);
			      			HeaderTableCh1.getDefaultCell().setBorder(Rectangle.BOX);
			      			
			      			if(listPrescriptionsSP.size() > 0){
			      			 
			      			HeaderTableTitle.addCell(new Phrase("PRESCRIPTION INFO:", headerTitle));
		         	 		document.add(HeaderTableTitle);
		         	 		HeaderTableTitle.flushContent();
			      			 
			      			 
			      			 HeaderTableH.addCell(new Phrase("RX:", subheader));
			      			 HeaderTableH.addCell(new Phrase("", tabletext));
			      			 HeaderTableH.addCell(new Phrase(" ", subheader));
			      			 HeaderTableH.addCell(new Phrase("", tabletext));
			      			 
			      			 document.add(HeaderTableH);
			      			 HeaderTableH.flushContent();
			      			 
			      			
			      			
			      			
			      		
			      			HeaderTableCh1.addCell(new Phrase("#", subheader));
			      			HeaderTableCh1.addCell(new Phrase("Prep. Drug", subheader));
			      			HeaderTableCh1.addCell(new Phrase("Dose", subheader));
			      			HeaderTableCh1.addCell(new Phrase("Advice", subheader));
			      			HeaderTableCh1.addCell(new Phrase("Frequency", subheader));
			      			HeaderTableCh1.addCell(new Phrase("Duration", subheader));
			      			HeaderTableCh1.addCell(new Phrase("Qty.", subheader));
			      			
			      			
			      			int countp=1;
			      			Font font = com.lowagie.text.FontFactory.getFont("Shivaji05", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
			      			for(int i=0;i<listPrescriptionsSP.size();i++ ){
			      				HeaderTableCh1.addCell(new Phrase(""+countp, tabletext));
			      			
			      				Phrase p1 = new Phrase();
			      				p1.add(new Chunk(" "+listPrescriptionsSP.get(i).getPrepName() + ". "+listPrescriptionsSP.get(i).getMedicineName()+" "+"("+listPrescriptionsSP.get(i).getUnitName(), tabletext));			
			      				p1.add(new Chunk("\n ("+listPrescriptionsSP.get(i).getDrugName()+")", tabletext));	
			      				PdfPCell drugCell = new PdfPCell(p1);	
			      				drugCell.setBorder(Rectangle.NO_BORDER);
			      				
			      				if(listPrescriptionsSP.get(i).getNutracalProductFlag() == 0){
			      					HeaderTableCh1.addCell(p1);
			      				}else{
			      				
			      				HeaderTableCh1.addCell(new Phrase(""+listPrescriptionsSP.get(i).getPrepName() + ". "+listPrescriptionsSP.get(i).getMedicineName()+" "+"("+listPrescriptionsSP.get(i).getUnitName()+")", tabletext));
			      				}
			      				Integer dose=listPrescriptionsSP.get(i).getDose();
			      				if(dose == null){
			      					HeaderTableCh1.addCell(new Phrase("-", tabletext));
			      				}else{
			      					HeaderTableCh1.addCell(new Phrase(""+listPrescriptionsSP.get(i).getDose(), tabletext));
			      				}
			      				
			      				
			      				String instructions=listPrescriptionsSP.get(i).getInstructionName();
			      				String instArray[]=instructions.split("/");
			      				System.err.println("instructions........."+instructions);
			      				
			      				String englishInstr=instArray[0];
			      				String hindiInstr=instArray[1];
			      				String marathiInstr=instArray[2];
			      				
			      				System.err.println("languageOF........."+languageOF);
			      				if(languageOF.equalsIgnoreCase("ENGLISH")){
			      					
			      					HeaderTableCh1.addCell(new Phrase(""+englishInstr, tabletext));
			      					
			      				}else if(languageOF.equalsIgnoreCase("MARATHI")){
			      					
			      					//HeaderTableCh1.addCell(new Phrase(""+marathiInstr,FontFactory.getFont("Shivaji05")));
			      					HeaderTableCh1.addCell(new Phrase(""+marathiInstr, font));
			      				}else if(languageOF.equalsIgnoreCase("HINDI")){
			      					
			      					//Font ff = FontFactory.getFont("Shivaji05", 10);
			      					
			      				  	HeaderTableCh1.addCell(new Phrase(""+hindiInstr, font));
			      					
			      				}
			      				
			      				String pdays=listPrescriptionsSP.get(i).getDayPrescription();
			      				String preDays[]=pdays.split(",");
			      				String mo=preDays[0];
			      				String an=preDays[1];
			      				String ev=preDays[2];
			      				String nt=preDays[3];
			      				
			      				HeaderTableCh1.addCell(new Phrase(""+mo+"-"+an+"-"+ev+"-"+nt, tabletext));
			      				HeaderTableCh1.addCell(new Phrase(""+listPrescriptionsSP.get(i).getDays() + " Days", tabletext));
			      				HeaderTableCh1.addCell(new Phrase(""+listPrescriptionsSP.get(i).getQty(), tabletext));
			      				
			      				
			      				//HeaderTableCh1.addCell(new Phrase("", tabletext));
			      				//HeaderTableCh1.addCell(new Phrase(""+"(" +listPrescriptionsSP.get(i).getDrugName()+")", tabletext));
			      				//HeaderTableCh1.addCell(new Phrase("", tabletext));
			      				//HeaderTableCh1.addCell(new Phrase("", tabletext));
			      				//HeaderTableCh1.addCell(new Phrase("", tabletext));
			      				//HeaderTableCh1.addCell(new Phrase("", tabletext));
			      				//HeaderTableCh1.addCell(new Phrase("", tabletext));
			      				
			      				
			      			countp++;
			      			
			      				
			      			}
			      			
			      			
			      			document.add(HeaderTableCh1);
			      			HeaderTableCh1.flushContent();
			      			
			      			HeaderTableSpace.addCell(new Phrase("", tabletext));
			      			 document.add(HeaderTableSpace);
			      			 HeaderTableSpace.flushContent();
			      			 
			      			
			      			 
			      			 HeaderTable5.addCell(new Phrase("", tabletext));
			      				HeaderTable5.addCell(new Phrase("", tabletext));
			      				HeaderTable5.addCell(new Phrase("", tabletext));
			      				HeaderTable5.addCell(new Phrase("", tabletext));
			      				HeaderTable5.addCell(new Phrase("", tabletext));
			      				HeaderTable5.addCell(new Phrase("", tabletext));
			      				HeaderTable5.addCell(new Phrase("", tabletext));

			      				document.add(HeaderTable5);
			      				HeaderTable5.flushContent();
			      				
			      				HeaderTableSpace.addCell(new Phrase("", tabletext));
			      				 document.add(HeaderTableSpace);
			      				 HeaderTableSpace.flushContent();
			      			
			      			}
			      			
			          	 
			      //end prescription

			      			
			      //start Surgery Advice Info

			      OPDSxAdviceController sxController=(ApplicationContextUtils.getApplicationContext()).getBean(OPDSxAdviceController.class);
			      OPDSxAdviceService sxservice=(ApplicationContextUtils.getApplicationContext()).getBean(OPDSxAdviceService.class);
			      List<OPDSxAdvicedDTO> lstsxadviceObj=  sxservice.getOPDSxAdviceListByTreatmentId(treatmentId, unitId);

			      PdfPTable HeaderTablesxAdvice = new PdfPTable(3);
			      int[] headerwidthsxAdvice = {2,15,5 };
			      HeaderTablesxAdvice.setWidths(headerwidthsxAdvice);
			      HeaderTablesxAdvice.setWidthPercentage(95f);
			      HeaderTablesxAdvice.getDefaultCell().setBorder(Rectangle.BOX);

			          if(lstsxadviceObj.size() > 0){
			          	
			         	HeaderTableTitle.addCell(new Phrase("SURGERY ADVICE INFO:", headerTitle));
	         	 		document.add(HeaderTableTitle);
	         	 		HeaderTableTitle.flushContent();
			         	 
			           HeaderTableSpace.addCell(new Phrase("", tabletext));
			         	document.add(HeaderTableSpace);
			        	HeaderTableSpace.flushContent();
			          	
			          	
			          	HeaderTablesxAdvice.addCell(new Phrase("Sr.No", subheader));
			          	HeaderTablesxAdvice.addCell(new Phrase("Name ", subheader));
			          	HeaderTablesxAdvice.addCell(new Phrase("Date", subheader));
			        
			          int sxCount=1;
			          for(int i=0;i< lstsxadviceObj.size() ;i++){
			          	HeaderTablesxAdvice.addCell(new Phrase(""+sxCount, tabletext));
			          	HeaderTablesxAdvice.addCell(new Phrase(""+lstsxadviceObj.get(i).getProcedureName(), tabletext));
			          	HeaderTablesxAdvice.addCell(new Phrase(""+lstsxadviceObj.get(i).getAdviceDate(), tabletext));
			          	sxCount++;
			          }

			          document.add(HeaderTablesxAdvice);
			          HeaderTablesxAdvice.flushContent();
			      	
			          
			          HeaderTableSpace.addCell(new Phrase("", tabletext));
			      	document.add(HeaderTableSpace);
			      	HeaderTableSpace.flushContent();
			      	
			      	HeaderTableSpace.addCell(new Phrase("", tabletext));
			      	document.add(HeaderTableSpace);
			      	HeaderTableSpace.flushContent();
			       
			       HeaderTable5.addCell(new Phrase("", tabletext));
			      	HeaderTable5.addCell(new Phrase("", tabletext));
			      	 HeaderTable5.addCell(new Phrase("", tabletext));
			      	HeaderTable5.addCell(new Phrase("", tabletext));
			      	 HeaderTable5.addCell(new Phrase("", tabletext));
			      	HeaderTable5.addCell(new Phrase("", tabletext));
			      	 HeaderTable5.addCell(new Phrase("", tabletext));
			      		 document.add(HeaderTable5);
			      	HeaderTable5.flushContent();
			      	
			      	HeaderTableSpace.addCell(new Phrase("", tabletext));
			      	document.add(HeaderTableSpace);
			      	HeaderTableSpace.flushContent();
			      	
			      	// HeaderTableSpace.addCell(new Phrase("", tabletext));
			      		//document.add(HeaderTableSpace);
			      		//HeaderTableSpace.flushContent();
			          }

			      //end Surgery Advice Info

			      //start Rediotherapy Advice

			      List<OPDRadioTheorapyMaster> lstradioObj=  sxservice.getOPDRadioTheropyListByTreatmentId(treatmentId, unitId);
			      PdfPTable HeaderTablesxRadio = new PdfPTable(5);
			      int[] headerwidthsxRadio = {4,10,10,10,10 };
			      HeaderTablesxRadio.setWidths(headerwidthsxRadio);
			      HeaderTablesxRadio.setWidthPercentage(95f);
			      HeaderTablesxRadio.getDefaultCell().setBorder(Rectangle.BOX);
			        
			      if(lstradioObj.size() > 0){
			      	
			        		HeaderTableTitle.addCell(new Phrase("REDIOTHEAAPY ADVICE INFO:", headerTitle));
		         	 		document.add(HeaderTableTitle);
		         	 		HeaderTableTitle.flushContent();
			        	 
			          HeaderTableSpace.addCell(new Phrase("", tabletext));
			      	document.add(HeaderTableSpace);
			      	HeaderTableSpace.flushContent();
			      	
			      	
			      	HeaderTablesxRadio.addCell(new Phrase("Sr.No", subheader));
			      	HeaderTablesxRadio.addCell(new Phrase("Serum Creatine ", subheader));
			      	HeaderTablesxRadio.addCell(new Phrase("Radiation Technique", subheader));
			      	HeaderTablesxRadio.addCell(new Phrase("Simulation Date & Time", subheader));
			      	HeaderTablesxRadio.addCell(new Phrase("Treatment Date & Time", subheader));
			      	
			      	int radioCount=1;
			      	for(int i=0;i<lstradioObj.size() ;i++){
			      		HeaderTablesxRadio.addCell(new Phrase(""+radioCount, tabletext));
			      		HeaderTablesxRadio.addCell(new Phrase(""+lstradioObj.get(i).getSerumCreatinine(), tabletext));
			      		HeaderTablesxRadio.addCell(new Phrase(""+lstradioObj.get(i).getRadiationTechniqueName(), tabletext));
			      		HeaderTablesxRadio.addCell(new Phrase(""+lstradioObj.get(i).getAdvicedSimulationDate() +"  "+lstradioObj.get(i).getAdvicedSimulationTime(), tabletext));
			      		HeaderTablesxRadio.addCell(new Phrase(""+lstradioObj.get(i).getAdvicedTreatmentDate() +"  "+lstradioObj.get(i).getAdvicedTreatmentTime(), tabletext));
			      	}
			      	
			      	document.add(HeaderTablesxRadio);
			      	HeaderTablesxRadio.flushContent();
			      	
			      	 HeaderTableSpace.addCell(new Phrase("", tabletext));
			      		document.add(HeaderTableSpace);
			      		HeaderTableSpace.flushContent();
			      		
			      		HeaderTableSpace.addCell(new Phrase("", tabletext));
			      		document.add(HeaderTableSpace);
			      		HeaderTableSpace.flushContent();
			      	 
			      	 HeaderTable5.addCell(new Phrase("", tabletext));
			      		HeaderTable5.addCell(new Phrase("", tabletext));
			      		 HeaderTable5.addCell(new Phrase("", tabletext));
			      		HeaderTable5.addCell(new Phrase("", tabletext));
			      		 HeaderTable5.addCell(new Phrase("", tabletext));
			      		HeaderTable5.addCell(new Phrase("", tabletext));
			      		 HeaderTable5.addCell(new Phrase("", tabletext));
			      			 document.add(HeaderTable5);
			      		HeaderTable5.flushContent();
			      		
			      		HeaderTableSpace.addCell(new Phrase("", tabletext));
			      		document.add(HeaderTableSpace);
			      		HeaderTableSpace.flushContent();
			      		
			      		// HeaderTableSpace.addCell(new Phrase("", tabletext));
			      			//document.add(HeaderTableSpace);
			      			//HeaderTableSpace.flushContent();
			      }

			      //end Rediotherapy Advice

			      //start Chemotherapy

			       OPDChemoTheropyDTO chemoobj = new OPDChemoTheropyDTO();
			       chemoobj=sxservice.getOPDChemoByTreatmentIdForPrint(treatmentId);
			       
			       
			       PdfPTable HeaderTableChem = new PdfPTable(4);
			      			int[] headerwidthChemotherapy = {13,20,10,20 };
			      			HeaderTableChem.setWidths(headerwidthChemotherapy);
			      			HeaderTableChem.setWidthPercentage(95f);
			      			HeaderTableChem.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			      			
			      			System.err.println("chemoobj..."+chemoobj);
			      			
			      		if(chemoobj !=null){
					      		
					      		//HeaderTableSpace.addCell(new Phrase("", tabletext));
					      		//document.add(HeaderTableSpace);
					      		//HeaderTableSpace.flushContent();
			      			
			      			//HeaderTableChem.addCell(new Phrase("Chemotherapy Info :", subheader));
			      			//HeaderTableChem.addCell(new Phrase("", tabletext));
			      			//HeaderTableChem.addCell(new Phrase("", tabletext));
			      			//HeaderTableChem.addCell(new Phrase("", tabletext));
			      			
			      			HeaderTableTitle.addCell(new Phrase("CHEMOTHERAPY  INFO:", headerTitle));
		         	 		document.add(HeaderTableTitle);
		         	 		HeaderTableTitle.flushContent();
			      			
			      			HeaderTableChem.addCell(new Phrase("Chemotherapy Protocol", subheader));
			      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getChemotherapyProtocol(), tabletext));
			      			
			      			
			      			HeaderTableChem.addCell(new Phrase("Indication", subheader));
			      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getLocation(), tabletext));
			      			
			      			
			      			HeaderTableChem.addCell(new Phrase("Weight(Kg)", subheader));
			      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getWeight(), tabletext));
			      			
			      			
			      			HeaderTableChem.addCell(new Phrase("Height(Mt)", subheader));
			      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getHeight(), tabletext));
			      			
			      			
			      			HeaderTableChem.addCell(new Phrase("BSA", subheader));
			      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getBsa(), tabletext));
			      			
			      			
			      			HeaderTableChem.addCell(new Phrase("Blood Orders", subheader));
			      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getBloodOrder(), tabletext));
			      			
			      			HeaderTableChem.addCell(new Phrase("Allergies", subheader));
			      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getAllergies(), tabletext));
			      			
			      			HeaderTableChem.addCell(new Phrase("History", subheader));
			      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getHistory(), tabletext));
			      			
			      			HeaderTableChem.addCell(new Phrase("Frequency", subheader));
			      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getFrequency(), tabletext));
			      			
			      			HeaderTableChem.addCell(new Phrase("Number of Cycles", subheader));
			      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getNumberofCycles(), tabletext));
			      			
			      			HeaderTableChem.addCell(new Phrase("Dose", subheader));
			      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getDose(), tabletext));
			      			
			      			
			      			HeaderTableChem.addCell(new Phrase("Investigations", subheader));
			      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getInvestigations(), tabletext));
			      			
			      			HeaderTableChem.addCell(new Phrase("Chemo Drug Orders", subheader));
			      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getChemoOrders(), tabletext));
			      			
			      			HeaderTableChem.addCell(new Phrase("Post-Medications", subheader));
			      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getPostMedications(), tabletext));
			      			
			      			HeaderTableChem.addCell(new Phrase("Post Chemo Advise", subheader));
			      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getPostChemoAdvice(), tabletext));
			      			
			      			 HeaderTableChem.addCell(new Phrase("", tabletext));
			      	         HeaderTableChem.addCell(new Phrase("", tabletext));
			      			
			      			
			      			document.add(HeaderTableChem);
			      			HeaderTableChem.flushContent();
			      			
			      			HeaderTableSpace.addCell(new Phrase("", tabletext));
				      		document.add(HeaderTableSpace);
				      		HeaderTableSpace.flushContent();
			      			
			      			HeaderTableChem.getDefaultCell().setBorder(Rectangle.BOTTOM);
			                  HeaderTableChem.addCell(new Phrase("", tabletext));
			                  HeaderTableChem.addCell(new Phrase("", tabletext));
			                  HeaderTableChem.addCell(new Phrase("", tabletext));
			                  HeaderTableChem.addCell(new Phrase("", tabletext));
			      			
			      			
			      			document.add(HeaderTableChem);
			      			HeaderTableChem.flushContent();
			      			 
					      		
					      		HeaderTableSpace.addCell(new Phrase("", tabletext));
					      		document.add(HeaderTableSpace);
					      		HeaderTableSpace.flushContent();
			      			
			      			}


			      //end Chemotherapy

			      //start Care advises

			         PdfPTable HeaderTableCareAdvice = new PdfPTable(4);
			         int [] HeaderWidthCareAdvice = {10,20,10,20};
			         HeaderTableCareAdvice.setWidths(HeaderWidthCareAdvice);
			         HeaderTableCareAdvice.setWidthPercentage(95f);
			         HeaderTableCareAdvice.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			               
			         OPDCareAdviceDTO careadv = sxservice.editOPDCareAdvice(treatmentId);
			               
			               if(careadv != null){
			            	   
			              	  	 
			              	  	HeaderTableTitle.addCell(new Phrase("CARE ADVICE INFO:", headerTitle));
			         	 		document.add(HeaderTableTitle);
			         	 		HeaderTableTitle.flushContent();
				      			
			              	  	 
			              	  
			              	  	HeaderTableCareAdvice.addCell(new Phrase("Palliative Care Advice", subheader));
			              	  	HeaderTableCareAdvice.addCell(new Phrase(":"+careadv.getPalliativeCareAdvice(), tabletext));
			              	  
			              	  	HeaderTableCareAdvice.addCell(new Phrase("Supportive Care", subheader));
			              	  	HeaderTableCareAdvice.addCell(new Phrase(":"+careadv.getSupportiveCare(), tabletext));
			              	  	
			              		HeaderTableCareAdvice.addCell(new Phrase("Preventive Care:", subheader));
			              	  	HeaderTableCareAdvice.addCell(new Phrase(":"+careadv.getPreventiveCare(), tabletext));
			              	  	
			              		HeaderTableCareAdvice.addCell(new Phrase("Rehabilitative Care", subheader));
			              		HeaderTableCareAdvice.addCell(new Phrase(":"+careadv.getRehabilitativeCare(), tabletext));
			              		
			              		HeaderTableCareAdvice.addCell(new Phrase("Other Services", subheader));
			              		HeaderTableCareAdvice.addCell(new Phrase(":"+careadv.getOtherServices(), tabletext));
			              		
			              		HeaderTableCareAdvice.addCell(new Phrase("", subheader));
			              		HeaderTableCareAdvice.addCell(new Phrase("", tabletext));
			              	  
			              		document.add(HeaderTableCareAdvice);
			              		HeaderTableCareAdvice.flushContent();
			              		
			              		HeaderTableSpace.addCell(new Phrase("", tabletext));
					      		document.add(HeaderTableSpace);
					      		HeaderTableSpace.flushContent();
			              		
			              		HeaderTableCareAdvice.getDefaultCell().setBorder(Rectangle.BOTTOM);
			              		HeaderTableCareAdvice.addCell(new Phrase("", tabletext));
			              		HeaderTableCareAdvice.addCell(new Phrase("", tabletext));
			              		HeaderTableCareAdvice.addCell(new Phrase("", tabletext));
			              		HeaderTableCareAdvice.addCell(new Phrase("", tabletext));
			          			
			          			
			          			document.add(HeaderTableCareAdvice);
			          			HeaderTableCareAdvice.flushContent();
			          			
			          			
						      		
						      		
						      		HeaderTableSpace.addCell(new Phrase("", tabletext));
						      		document.add(HeaderTableSpace);
						      		HeaderTableSpace.flushContent();
			           	
			           	
			               }
			      //end Care advises
			      
			               //start Plan Of Treatment  added Rohini

				              // List<OPDRadioTheropyCheckBox>  planoftreat =sxservice.getRadioTheropyCheckBoxList("POT");
				       List<OPDRadioTheropyCheckBox>  planoftreat =sxservice.getCheckListOPDPlanOfTreatmentListByTreatmentId(treatmentId, unitId);
	              //   List<OPDPlanOfTreatmentDTO>  planoftreat =sxservice.getOPDPlanOfTreatmentListByTreatmentId(treatmentId, unitId);
	  
				               PdfPTable HeaderTableplant = new PdfPTable(3);
				             	int[] headerwidthplant = {10,50,20 };
				             	HeaderTableplant.setWidths(headerwidthplant);
				             	HeaderTableplant.setWidthPercentage(95f);
				             	HeaderTableplant.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				             	System.out.println("...planoftreat.size()..."+planoftreat.size());
				                 if(planoftreat.size() >0){
				                 	
					              	  	HeaderTableTitle.addCell(new Phrase("PLAN OF TREATMENT:", headerTitle));
					         	 		document.add(HeaderTableTitle);
					         	 		HeaderTableTitle.flushContent();
				                  	 
				                  	int acount=1;
				                  
				                  	for(int i=0;i< planoftreat.size() ;i++){
				                  		HeaderTableplant.addCell(new Phrase(""+acount , tabletext));
				                 		HeaderTableplant.addCell(new Phrase(" "+planoftreat.get(i).getName(), tabletext));
				                 		HeaderTableplant.addCell(new Phrase(" ", tabletext));
				             			acount++;
				             		}
				             		
				             		document.add(HeaderTableplant);
				             		HeaderTableplant.flushContent();
				             		
				             		
							      		
							      		HeaderTableSpace.addCell(new Phrase("", tabletext));
							      		document.add(HeaderTableSpace);
							      		HeaderTableSpace.flushContent();
							      		
							      		 HeaderTable5.addCell(new Phrase("", tabletext));
								      		HeaderTable5.addCell(new Phrase("", tabletext));
								      		 HeaderTable5.addCell(new Phrase("", tabletext));
								      		HeaderTable5.addCell(new Phrase("", tabletext));
								      		 HeaderTable5.addCell(new Phrase("", tabletext));
								      		HeaderTable5.addCell(new Phrase("", tabletext));
								      		 HeaderTable5.addCell(new Phrase("", tabletext));
								      			 document.add(HeaderTable5);
								      		HeaderTable5.flushContent();
								      		
								      		HeaderTableSpace.addCell(new Phrase("", tabletext));
								      		document.add(HeaderTableSpace);
								      		HeaderTableSpace.flushContent();
				                 }

				       //end Plan Of Treatment

			      //start subjective and objective

			      OPDClinicalEvaluationService clinicalService=(ApplicationContextUtils.getApplicationContext()).getBean(OPDClinicalEvaluationService.class);
			      OPDClinicalEvaluationDto clinicalObj=clinicalService.fetchClinicalEvalTempDataByTreatmentId(treatmentId, request);
			      if(clinicalObj !=null){
			      		
			      	
			        	 
			        	 HeaderTableTitle.addCell(new Phrase("CLINICAL EVALUATION:", headerTitle));
		         	 		document.add(HeaderTableTitle);
		         	 		HeaderTableTitle.flushContent();
			        	 
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
			           
			           PdfPTable HeaderTable31 = new PdfPTable(1);
			      		int[] headerwidth31 = { 120 };
			      		HeaderTable31.setWidths(headerwidth31);
			      		HeaderTable31.setWidthPercentage(95f);
			      		HeaderTable31.getDefaultCell().setBorder(Rectangle.BOTTOM);
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
			      		 HeaderTable5.addCell(new Phrase("", tabletext));
			      		HeaderTable5.addCell(new Phrase("", tabletext));
			      		 HeaderTable5.addCell(new Phrase("", tabletext));
			      		HeaderTable5.addCell(new Phrase("", tabletext));
			      		 HeaderTable5.addCell(new Phrase("", tabletext));
			      			 document.add(HeaderTable5);
			      		HeaderTable5.flushContent();
			      		
			      		HeaderTableSpace.addCell(new Phrase("", tabletext));
			      		document.add(HeaderTableSpace);
			      		HeaderTableSpace.flushContent();
			      		
			      		 //HeaderTableSpace.addCell(new Phrase("", tabletext));
			      		//	document.add(HeaderTableSpace);
			      		//	HeaderTableSpace.flushContent();
			           
			      }
			      //end subjective and objective

			      //start allergy info

			      	
			      	PdfPTable HeaderTableallergy = new PdfPTable(2);
			      	int[] headerwidthAllergy = {2,20 };
			      	HeaderTableallergy.setWidths(headerwidthAllergy);
			      	HeaderTableallergy.setWidthPercentage(95f);
			      	HeaderTableallergy.getDefaultCell().setBorder(Rectangle.BOX);
			      	
			      	List<OPDAllergyAlertsDto> lstallergyObj=clinicalService.fetchAllAllergyAlerts(treatmentId, request);
			      	
			      	if(lstallergyObj.size() > 0){
			      		   
			      		
			      	  	 
			      	   HeaderTableTitle.addCell(new Phrase("ALERTS & ALLERGIES:", headerTitle));
	         	 		document.add(HeaderTableTitle);
	         	 		HeaderTableTitle.flushContent();
			      	  	 
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
			      		
			      		//HeaderTableSpace.addCell(new Phrase("", tabletext));
			      		//document.add(HeaderTableSpace);
			      		//HeaderTableSpace.flushContent();
			      	 
			      	 HeaderTable5.addCell(new Phrase("", tabletext));
			      		HeaderTable5.addCell(new Phrase("", tabletext));
			      		 HeaderTable5.addCell(new Phrase("", tabletext));
			      		HeaderTable5.addCell(new Phrase("", tabletext));
			      		 HeaderTable5.addCell(new Phrase("", tabletext));
			      		HeaderTable5.addCell(new Phrase("", tabletext));
			      		 HeaderTable5.addCell(new Phrase("", tabletext));
			      			 document.add(HeaderTable5);
			      		HeaderTable5.flushContent();
			      		
			      		HeaderTableSpace.addCell(new Phrase("", tabletext));
			      		document.add(HeaderTableSpace);
			      		HeaderTableSpace.flushContent();
			      		
			      		// HeaderTableSpace.addCell(new Phrase("", tabletext));
			      		//	document.add(HeaderTableSpace);
			      		//	HeaderTableSpace.flushContent();
			           
			      		
			      	}
			      	
			      //end allergy info


			      //start clinical staging
			      OPDClinicalStagingService clinicalStagingService=(ApplicationContextUtils.getApplicationContext()).getBean(OPDClinicalStagingService.class);
			      PdfPTable HeaderTableclinicalStaging = new PdfPTable(7);
			      	int[] headerwidthclinicalStaging = {2,10,5,5,5,5,5 };
			      	HeaderTableclinicalStaging.setWidths(headerwidthclinicalStaging);
			      	HeaderTableclinicalStaging.setWidthPercentage(95f);
			      	HeaderTableclinicalStaging.getDefaultCell().setBorder(Rectangle.BOX);
			      	
			      	List<OPDClinicalStagingDTO> lstclinicalStagingObj=clinicalStagingService.getOPDClinicalStagingList(treatmentId, unitId);
			      	if(lstclinicalStagingObj.size() > 0){
			      		
			      	  	 
			      	   HeaderTableTitle.addCell(new Phrase("CLINICAL STAGING:", headerTitle));
	         	 		document.add(HeaderTableTitle);
	         	 		HeaderTableTitle.flushContent();
			      	  	 
			      	    HeaderTableSpace.addCell(new Phrase("", tabletext));
			      		document.add(HeaderTableSpace);
			      		HeaderTableSpace.flushContent();
			      		
			      		
			      		HeaderTableclinicalStaging.addCell(new Phrase("Sr.No ", subheader));
			      		HeaderTableclinicalStaging.addCell(new Phrase("Body Part  ", subheader));
			      		HeaderTableclinicalStaging.addCell(new Phrase("TNM Stage", subheader));
			      		HeaderTableclinicalStaging.addCell(new Phrase("Description ", subheader));
			      		HeaderTableclinicalStaging.addCell(new Phrase("Date ", subheader));
			      		HeaderTableclinicalStaging.addCell(new Phrase("Comment ", subheader));
			      		HeaderTableclinicalStaging.addCell(new Phrase("Investigator ", subheader));
			      		int icount=1;
			      		for(int i=0;i<lstclinicalStagingObj.size() ;i++){
			      			HeaderTableclinicalStaging.addCell(new Phrase(" "+icount, tabletext));
			      			HeaderTableclinicalStaging.addCell(new Phrase(" "+lstclinicalStagingObj.get(i).getBodyPartName(), tabletext));
			      			HeaderTableclinicalStaging.addCell(new Phrase(" "+lstclinicalStagingObj.get(i).getTnmStage(), tabletext));
			      			HeaderTableclinicalStaging.addCell(new Phrase(" "+lstclinicalStagingObj.get(i).getDescription(), tabletext));
			      			HeaderTableclinicalStaging.addCell(new Phrase(" "+lstclinicalStagingObj.get(i).getClinicalDate(), tabletext));
			      			HeaderTableclinicalStaging.addCell(new Phrase(" "+lstclinicalStagingObj.get(i).getComment(), tabletext));
			      			HeaderTableclinicalStaging.addCell(new Phrase(" "+lstclinicalStagingObj.get(i).getInvestigatorName(), tabletext));
			      			icount++;
			      		}
			      	  	
			      		document.add(HeaderTableclinicalStaging);
			      		HeaderTableclinicalStaging.flushContent();
			      		
			      		HeaderTableSpace.addCell(new Phrase("", tabletext));
			      		document.add(HeaderTableSpace);
			      		HeaderTableSpace.flushContent();
			      		
			      		HeaderTableSpace.addCell(new Phrase("", tabletext));
			      		document.add(HeaderTableSpace);
			      		HeaderTableSpace.flushContent();
			      	 
			      	 HeaderTable5.addCell(new Phrase("", tabletext));
			      		HeaderTable5.addCell(new Phrase("", tabletext));
			      		 HeaderTable5.addCell(new Phrase("", tabletext));
			      		HeaderTable5.addCell(new Phrase("", tabletext));
			      		 HeaderTable5.addCell(new Phrase("", tabletext));
			      		HeaderTable5.addCell(new Phrase("", tabletext));
			      		 HeaderTable5.addCell(new Phrase("", tabletext));
			      			 document.add(HeaderTable5);
			      		HeaderTable5.flushContent();
			      		
			      		HeaderTableSpace.addCell(new Phrase("", tabletext));
			      		document.add(HeaderTableSpace);
			      		HeaderTableSpace.flushContent();
			      		
			      		// HeaderTableSpace.addCell(new Phrase("", tabletext));
			      			//document.add(HeaderTableSpace);
			      		//	HeaderTableSpace.flushContent();
			      		
			      	}
			      //end clinical staging
			      			// Table5 : For service details head start

			      		/*
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
			      			
			      			
			      			//document.add(HeaderTable5);
			      			//HeaderTable5.flushContent();
			      			*/

			      			// Table5 : For service details head end

			      			// START : Individual Instruction
                              InstructionService instructionService=(ApplicationContextUtils.getApplicationContext()).getBean(InstructionService.class);
                              List<OPDReportInstructionDTO> reportInstructionDTOList = instructionService.fetchIndividualTreatmentInstruction(treatmentId);
                              if (reportInstructionDTOList.size() != 0) {

                                  PdfPTable HeaderTable7 = new PdfPTable(3);
                                  int[] headerwidth7 = { 2, 20, 40 };
                                  HeaderTable7.setWidths(headerwidth7);
                                  HeaderTable7.setWidthPercentage(95f);

                                  HeaderTable7.getDefaultCell()
                                          .setBorder(Rectangle.NO_BORDER);
                                  HeaderTable7.addCell(new Phrase("", header));
                                  HeaderTable7.addCell(new Phrase("", header));
                                  HeaderTable7.addCell(new Phrase("", header));
                                  document.add(HeaderTable7);
                                  HeaderTable7.flushContent();
                                
                                     
                                     HeaderTableTitle.addCell(new Phrase("PRIMARY INSTRUCTIONS:", headerTitle));
             	         	 		document.add(HeaderTableTitle);
             	         	 		HeaderTableTitle.flushContent();

                                  PdfPTable Table3 = new PdfPTable(5);
                                  int[] width3 = { 10, 40, 10, 10, 40 };
                                  Table3.setWidths(width3);
                                  Table3.setWidthPercentage(95f);
                                  Table3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
                                  Table3.addCell(new Phrase("", header));
                                  Table3.addCell(new Phrase("", header));
                                  Table3.addCell(new Phrase("", header));
                                  Table3.addCell(new Phrase("", header));
                                  Table3.addCell(new Phrase("", header));
                                  document.add(Table3);
                                  Table3.flushContent();
                                  
                                  PdfPTable TablePInstrcution = new PdfPTable(2);
                                  int[] widthPInstrcution = { 10, 40};
                                  TablePInstrcution.setWidths(widthPInstrcution);
                                  TablePInstrcution.setWidthPercentage(95f);
                                  TablePInstrcution.getDefaultCell().setBorder(Rectangle.NO_BORDER);
                                  int pcount=1;
                                  int instructCount= reportInstructionDTOList.size();

                              try {
                                      for (int i = 0; i < reportInstructionDTOList.size(); i++) {

                                         /*  Table3.addCell(new Phrase("" + (i + 1) + ".",
                                                  tabletext));

                                          Table3.addCell(new Phrase(""
                                                  + (reportInstructionDTOList.get(i)
                                                          .getReportInstruction()), tabletext));

                                          Table3.addCell(new Phrase("", tabletext));

                                          if (reportInstructionDTOList.get(i + 1)
                                                  .getReportInstruction() != null
                                                  || reportInstructionDTOList.get(i + 1)
                                                          .getReportInstruction() != "") {

                                              Table3.addCell(new Phrase("" + (i + 2) + ".",tabletext));

                                              Table3.addCell(new Phrase(""+ (reportInstructionDTOList.get(i + 1).getReportInstruction()),
                                                      tabletext));
                                              

                                          }

                                          document.add(Table3);
                                          Table3.flushContent(); */
                                          
                                    	  if(pcount % 2 !=0 ){
                                     	     if(pcount == instructCount ){
                                     	    	 TablePInstrcution.addCell(new Phrase("" + (i + 1) + "." +(reportInstructionDTOList.get(i) .getReportInstruction()), tabletext));
                                     	    	 TablePInstrcution.addCell(new Phrase("", tabletext));
                                     	     }else{
                                     	    	 TablePInstrcution.addCell(new Phrase("" + (i + 1) + "." +(reportInstructionDTOList.get(i) .getReportInstruction()), tabletext));
                                     	     }
                                     	     pcount++;
      								    	continue;
                                        }else{
                                     	   TablePInstrcution.addCell(new Phrase("" + (i + 1) + "." +(reportInstructionDTOList.get(i) .getReportInstruction()), tabletext));
                               	    	// TablePInstrcution.addCell(new Phrase("", tabletext));
                               	    	pcount++;
                                        }

                                       

                                      }
                                      document.add(TablePInstrcution);
                                      TablePInstrcution.flushContent();
                                      } catch (Exception e) {
                                      document.add(Table3);
                                      Table3.flushContent();
                                      e.printStackTrace();
                                  }

                                 
                              }
                          
                              // END : Individual Instruction 			      		
			      			/*
			      			// START : General Instruction
			      				List<String> generalInstructionList = instructionService.fetchPCTreatmentInstruction(treatmentId);
			      				System.out.println("generalInstructionList----"+generalInstructionList);
			      				if (generalInstructionList.size() != 0){
			      				PdfPTable HeaderTable7 = new PdfPTable(3);
			      				int[] headerwidth7 = { 2, 20, 40 };
			      				HeaderTable7.setWidths(headerwidth7);
			      				HeaderTable7.setWidthPercentage(95f);

			      				HeaderTable7.getDefaultCell()
			      						.setBorder(Rectangle.NO_BORDER);
			      				HeaderTable7.addCell(new Phrase("", header));
			      				HeaderTable7.addCell(new Phrase("", header));
			      				HeaderTable7.addCell(new Phrase("", header));
			      				document.add(HeaderTable7);
			      				HeaderTable7.flushContent();

			      				HeaderTable7.getDefaultCell().setBorder(Rectangle.BOTTOM);
			      				HeaderTable7.addCell(new Phrase("", header));
			      				HeaderTable7.addCell(new Phrase("General Instructions",
			      						subheader));
			      				HeaderTable7.addCell(new Phrase("", header));
			      				document.add(HeaderTable7);
			      				HeaderTable7.flushContent();

			      				PdfPTable Table3 = new PdfPTable(5);
			      				int[] width3 = { 10, 40, 10, 10, 40 };
			      				Table3.setWidths(width3);
			      				Table3.setWidthPercentage(95f);
			      				Table3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			      				Table3.addCell(new Phrase("", header));
			      				Table3.addCell(new Phrase("", header));
			      				Table3.addCell(new Phrase("", header));
			      				Table3.addCell(new Phrase("", header));
			      				Table3.addCell(new Phrase("", header));
			      				document.add(Table3);
			      				Table3.flushContent();
			      				
			      				try {
			      				for (int i = 0; i < generalInstructionList.size(); i = i + 2) {

			      						Table3.addCell(new Phrase("" + (i + 1) + ".",
			      								tabletext));
			      						 Table3.addCell(new Phrase(
			      								""
			      										+ (generalInstructionList.get(i)),
			      								tabletext));
			      						Table3.addCell(new Phrase("", tabletext));
			      						 if (generalInstructionList.get(i + 1) != null
			      								|| generalInstructionList.get(i + 1) != "") {
			      							Table3.addCell(new Phrase("" + (i + 2) + ".",
			      									tabletext));
			      							Table3.addCell(new Phrase(
			      									""
			      											+ (generalInstructionList
			      													.get(i + 1)
			      													),
			      									tabletext)); 
			      						} 
			      						document.add(Table3);
			      						Table3.flushContent();
			      					}
			      				
			      				} catch (Exception e) {
			      					e.printStackTrace();
			      				}
			      				HeaderTable5.addCell(new Phrase("", tabletext));
			      				HeaderTable5.addCell(new Phrase("", tabletext));
			      				 HeaderTable5.addCell(new Phrase("", tabletext));
			      				HeaderTable5.addCell(new Phrase("", tabletext));
			      				 HeaderTable5.addCell(new Phrase("", tabletext));
			      				HeaderTable5.addCell(new Phrase("", tabletext));
			      				 HeaderTable5.addCell(new Phrase("", tabletext));
			      					 document.add(HeaderTable5);
			      				HeaderTable5.flushContent();
			      				}
			      				// END: General Instruction
			      				*/
			      				
			      		// START : General Instruction  /// added new by ROhini
							//List<String> generalInstructionList = instructionService.fetchPCTreatmentInstruction(treatmentId);
			      				List<String> generalInstructionList = instructionService.fetchPCTreatmentInstructionForPrint(treatmentId);
							System.out.println("generalInstructionList----"+generalInstructionList);
							if (generalInstructionList.size() != 0){
							PdfPTable HeaderTable7 = new PdfPTable(3);
							int[] headerwidth7 = { 2, 20, 40 };
							HeaderTable7.setWidths(headerwidth7);
							HeaderTable7.setWidthPercentage(95f);

							HeaderTable7.getDefaultCell()
									.setBorder(Rectangle.NO_BORDER);
							HeaderTable7.addCell(new Phrase("", header));
							HeaderTable7.addCell(new Phrase("", header));
							HeaderTable7.addCell(new Phrase("", header));
							document.add(HeaderTable7);
							HeaderTable7.flushContent();

							//HeaderTable7.getDefaultCell().setBorder(Rectangle.BOTTOM);
							
							
							  HeaderTableTitle.addCell(new Phrase("GENERAL INSTRUCTIONS :", headerTitle));
       	         	 		document.add(HeaderTableTitle);
       	         	 		HeaderTableTitle.flushContent();

							PdfPTable Table3 = new PdfPTable(5);
							int[] width3 = { 10, 40, 10, 10, 40 };
							Table3.setWidths(width3);
							Table3.setWidthPercentage(95f);
							Table3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							Table3.addCell(new Phrase("", header));
							Table3.addCell(new Phrase("", header));
							Table3.addCell(new Phrase("", header));
							Table3.addCell(new Phrase("", header));
							Table3.addCell(new Phrase("", header));
							document.add(Table3);
							Table3.flushContent();
							
								
							String isnrtuction ="";
							
							for (int i = 0; i < generalInstructionList.size(); i++) {
								System.out.println("666666----"+generalInstructionList.get(i));
								
								if(isnrtuction.equals("")){
									isnrtuction = isnrtuction +  generalInstructionList.get(i);
								}else{
								isnrtuction = isnrtuction +" , "+  generalInstructionList.get(i);
								}
								
									//Table3.addCell(new Phrase("" + (i + 1) + ".",tabletext));
									/*  Table3.addCell(new Phrase(
											""+ (generalInstructionList.get(i)),tabletext)); */
								// Table3.addCell(new Phrase(	""+ (generalInstructionList.get(i)),tabletext));
								//Table3.addCell(new Phrase("", tabletext));
									/*  if (generalInstructionList.get(i) != null
											|| generalInstructionList.get(i) != "") {
										Table3.addCell(new Phrase("" + (i) + ".",
												tabletext));
										Table3.addCell(new Phrase(
												""
														+ (generalInstructionList
																.get(i )
																),
												tabletext));  */
												
									/*  if (generalInstructionList.get(i) != null	|| generalInstructionList.get(i) != "") {
												Table3.addCell(new Phrase("" ,	tabletext));
												Table3.addCell(new Phrase("",tabletext)); 
									 }  */
											
									//document.add(Table3);
									//Table3.flushContent();
								}
							Table3.addCell(new Phrase("" ,	tabletext));
							Table3.addCell(new Phrase(""+  isnrtuction,tabletext)); 
							Table3.addCell(new Phrase("" ,	tabletext));
							Table3.addCell(new Phrase("",tabletext)); 
							Table3.addCell(new Phrase("" ,	tabletext));
				document.add(Table3);
				Table3.flushContent();
							
							HeaderTable5.addCell(new Phrase("", tabletext));
							HeaderTable5.addCell(new Phrase("", tabletext));
							 HeaderTable5.addCell(new Phrase("", tabletext));
							HeaderTable5.addCell(new Phrase("", tabletext));
							 HeaderTable5.addCell(new Phrase("", tabletext));
							HeaderTable5.addCell(new Phrase("", tabletext));
							 HeaderTable5.addCell(new Phrase("", tabletext));
								 document.add(HeaderTable5);
							HeaderTable5.flushContent();
							}
							// END: General Instruction
			      		
						// start OPD Diet
						OPDHistoryController dietController=(ApplicationContextUtils.getApplicationContext()).getBean(OPDHistoryController.class);
			           OPDHistoryService dietService=(ApplicationContextUtils.getApplicationContext()).getBean(OPDHistoryService.class);
			           OPDDietMasterDTO dm = new OPDDietMasterDTO();
					
			           List<OPDDietMasterDTO> lstmaster1 = uss2.getOPDDietListByTreatmentId(treatmentId);
						PdfPTable HeaderTable31 = new PdfPTable(1);
						int[] headerwidth31 = { 120 };
						HeaderTable31.setWidths(headerwidth31);
						HeaderTable31.setWidthPercentage(95f);
						HeaderTable31.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						if(lstmaster1.size() > 0){
					
							
                                 
                                 HeaderTableTitle.addCell(new Phrase("DIET INFORMATION:", headerTitle));
          	         	 		document.add(HeaderTableTitle);
          	         	 		HeaderTableTitle.flushContent();
                                 
                                
							
							for(int i=0;i<lstmaster1.size();i++){	
							if(lstmaster1.size()!=0){
								
								dm = lstmaster1.get(i);
								
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
					            
					           java.util.List<Element> ie1 = HTMLWorker.parseToList(new StringReader(dm.getTemplateData()), styleSheet);
					           if(dm.getTemplateData().equals("") || dm.getTemplateData().equals("NULL")){
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
					        	   java.util.List<Element> ie3 = HTMLWorker.parseToList(new StringReader(dm.getTemplateData()), styleSheet);
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
							}
							}

						
						HeaderTableSpace.addCell(new Phrase("", tabletext));
			      		document.add(HeaderTableSpace);
			      		HeaderTableSpace.flushContent();
			      	 
			      	 HeaderTable5.addCell(new Phrase("", tabletext));
			      		HeaderTable5.addCell(new Phrase("", tabletext));
			      		 HeaderTable5.addCell(new Phrase("", tabletext));
			      		HeaderTable5.addCell(new Phrase("", tabletext));
			      		 HeaderTable5.addCell(new Phrase("", tabletext));
			      		HeaderTable5.addCell(new Phrase("", tabletext));
			      		 HeaderTable5.addCell(new Phrase("", tabletext));
			      			 document.add(HeaderTable5);
			      		HeaderTable5.flushContent();
			      		
			      		//HeaderTableSpace.addCell(new Phrase("", tabletext));
			      		//document.add(HeaderTableSpace);
			      		//HeaderTableSpace.flushContent();
			      		
						
						}
						
			           // end Opd Diet

			      				
			      				
			      			//Added By Badrinath For Follow Up Date
			      			
			      			PrescriptionService objp  =(ApplicationContextUtils.getApplicationContext()).getBean(PrescriptionService.class);
			      			OPDPrescriptionFolloUpDto OpdPrescription = new OPDPrescriptionFolloUpDto();	
			      			OpdPrescription =  objp.getfollowUpForOPDPatient( unitId ,treatmentId);  // data by stored procedure
			      		

			      			System.err.print("Start follow up");

			      			
			      			if (OpdPrescription != null) {

			      				HeaderTableH.addCell(new Phrase("NEXT FOLLOW UP ON:", headerTitle));
			      				HeaderTableH.addCell(new Phrase(""+OpdPrescription.getDate(), tabletext));
			      				HeaderTableH.addCell(new Phrase("", header));
			      				HeaderTableH.addCell(new Phrase("", header));

			      				document.add(HeaderTableH);
			      				HeaderTableH.flushContent();
			      				
			      				

			      				HeaderTable5.addCell(new Phrase("", tabletext));
			      				HeaderTable5.addCell(new Phrase("", tabletext));
			      				 HeaderTable5.addCell(new Phrase("", tabletext));
			      				HeaderTable5.addCell(new Phrase("", tabletext));
			      				 HeaderTable5.addCell(new Phrase("", tabletext));
			      				HeaderTable5.addCell(new Phrase("", tabletext));
			      				 HeaderTable5.addCell(new Phrase("", tabletext));
			      					 document.add(HeaderTable5);
			      				HeaderTable5.flushContent();

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