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
<%@page import="com.hms.doctordesk.controller.DoctorDeskChartsController"%>
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
<%@ page import="com.hms.doctordesk.service.DoctorDeskChartsService"%>
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
<%@ page import="com.hms.doctordesk.dto.ImmunizationConfigurationMaster"%>
<%@ page import="com.hms.doctordesk.dto.ImmunizationPatientStatus"%>

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
      
		
		HttpSession session1 = request.getSession();
		String user_name = (String) session1.getAttribute("userName");
		Integer userId = (Integer) session1.getAttribute("userId");
		Integer unitId = (Integer) session1.getAttribute("uId");
		request.setAttribute("headerFlag", headerFlag);
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
			   
			// strat History Data


         PdfPTable HeaderTable5 = new PdfPTable(7);
			int[] headerwidth5 = { 27, 40, 30, 10, 15, 40, 20 };
			HeaderTable5.setWidths(headerwidth5);
			HeaderTable5.setWidthPercentage(95f);
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

			 
			DoctorDeskChartsService uss2=(ApplicationContextUtils.getApplicationContext()).getBean(DoctorDeskChartsService.class);
			List<ImmunizationConfigurationMaster> immunizatinList=  uss2.fetchImmunizationMaster();
			List<ImmunizationPatientStatus>  patientStatusList=uss2.fetchMmmunizationconPatient(treatmentId);

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

			 	
			 	

			 	 PdfPTable HeaderTableImmunization = new PdfPTable(7);
			      int[] headerwidthServiceAdvice = {3,15,10,10,15,10,10 };
			      HeaderTableImmunization.setWidths(headerwidthServiceAdvice);
			      HeaderTableImmunization.setWidthPercentage(95f);
			      HeaderTableImmunization.getDefaultCell().setBorder(Rectangle.BOTTOM);
			      
			      
			      HeaderTableImmunization.addCell(new Phrase("#", subheader));
			      HeaderTableImmunization.addCell(new Phrase("Vaccine Name  ", subheader));
			      HeaderTableImmunization.addCell(new Phrase("Given Dt. ", subheader));
			      HeaderTableImmunization.addCell(new Phrase("Due Dt.", subheader));
			      HeaderTableImmunization.addCell(new Phrase("Status", subheader));
			      HeaderTableImmunization.addCell(new Phrase("vaccine Details ", subheader));
			      HeaderTableImmunization.addCell(new Phrase(" Notes", subheader));
			 			
			 			if(CallFromOPD.equalsIgnoreCase("single")){
			 				int count=1;
			 				 if(patientStatusList.size() > 0){
			 					   for( ImmunizationPatientStatus statusObj:patientStatusList){
			 						      String vaccinationNotes="";
			 						     String vaccinationName="";
			 						      
			 						      for(ImmunizationConfigurationMaster imoObj : immunizatinList){
			 						    	  
			 						    	  if(statusObj.getImmunizationconfiguration_id() ==  imoObj.getImmunizationconfiguration_id()){
			 						    		 vaccinationNotes=imoObj.getNotes();
			 						    		vaccinationName =imoObj.getVaccine();
			 						    		 
			 						    	  }
			 						      }
			 						      
			 						     HeaderTableImmunization.addCell(new Phrase(""+count, subheader));
			 						      HeaderTableImmunization.addCell(new Phrase(""+vaccinationName, subheader));
			 						      HeaderTableImmunization.addCell(new Phrase(""+statusObj.getGivendate(), subheader));
			 						      HeaderTableImmunization.addCell(new Phrase(""+statusObj.getDuedate(), subheader));
			 						      HeaderTableImmunization.addCell(new Phrase(""+statusObj.getVaccinestatus(), subheader));
			 						      HeaderTableImmunization.addCell(new Phrase(" "+statusObj.getVaccinedetails(), subheader));
			 						      HeaderTableImmunization.addCell(new Phrase(" "+vaccinationNotes, subheader));   
			 						      
			 						      if(!statusObj.getGivendate().equalsIgnoreCase("") || !statusObj.getDuedate().equalsIgnoreCase("")  ){
			 						     document.add(HeaderTableImmunization);
			 						    HeaderTableImmunization.flushContent();
			 						   count++;
			 						      }
			 					   }
			 				 }
			 				
			 			}else if(CallFromOPD.equalsIgnoreCase("All")){
			 				
	 						    
			 				int count=1;
			 				   if(immunizatinList .size() > 0) {
			 					     for( ImmunizationConfigurationMaster imoObj  :immunizatinList) {
			 					    	  String givenDate="";
			 			 				 String dueDate="";
			 			 				String vaccineStatus="";
			 			 				String  vaccineDetails="";
			 					    	for( ImmunizationPatientStatus statusObj:patientStatusList){
			 					    		if(statusObj.getImmunizationconfiguration_id() ==  imoObj.getImmunizationconfiguration_id()){
			 					    			givenDate=statusObj.getGivendate();
			 					    			dueDate=statusObj.getDuedate();
			 					    			vaccineStatus=statusObj.getVaccinestatus();
			 					    			vaccineDetails=statusObj.getVaccinedetails();
			 					    		}
			 					    	}
			 					    	
			 					    	 HeaderTableImmunization.addCell(new Phrase(""+count, subheader));
			 						      HeaderTableImmunization.addCell(new Phrase(""+imoObj.getVaccine(), subheader));
			 						      HeaderTableImmunization.addCell(new Phrase(""+givenDate, subheader));
			 						      HeaderTableImmunization.addCell(new Phrase(""+dueDate, subheader));
			 						      HeaderTableImmunization.addCell(new Phrase(""+vaccineStatus, subheader));
			 						      HeaderTableImmunization.addCell(new Phrase(" "+vaccineDetails, subheader));
			 						      HeaderTableImmunization.addCell(new Phrase(" "+imoObj.getNotes(), subheader));   
			 						      
			 						     document.add(HeaderTableImmunization);
			 						    HeaderTableImmunization.flushContent();
			 						   count++;
			 					    	
			 					     }
			 				   }
			 				
			 			}
			          
			 //End History Data
			 		
			    
			     

			      			
                          
                           
			      				
			      	
							
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