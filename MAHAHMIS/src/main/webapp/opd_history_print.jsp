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
<title>OPD History Print</title>
</head>
<body>
	<%
		try {
		/* -------------------------------------- Declaration ---------------------------------------------   */
		response.setContentType("application/pdf");
		
		HttpSession session2 = request.getSession();
		int hospitalUnitId= (Integer) session2.getAttribute("uId");
		HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
		//List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
	    List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
		HospitalDetails hospObj = arrHospitalDetails.get(0);

		ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String lntUnit = (String) resource.getObject("lntUnit").toString();
		
		String CovidReportProfileId = (String) resource.getObject("CovidReportProfileId").toString();

		Integer covidReportId=Integer.parseInt(CovidReportProfileId);
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
			System.out.println("pathFont======"+pathFont);
			String pathProject = Paths.get("").toAbsolutePath().toString();
			System.out.println("pathProject======"+pathProject);
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
		
		HttpSession session1 = request.getSession();
		String user_name = (String) session1.getAttribute("userName");
		Integer userId = (Integer) session1.getAttribute("userId");
		Integer unitId = (Integer) session1.getAttribute("uId");
		//System.out.println(unitId+"unitIdunitId");
		//String masterIdd = request.getParameter("masterIdd");
		//String patientType = request.getParameter("gender");
		//String patientName = request.getParameter("patientName");
		//String labName = (String) resource.getObject("labName").toString();
	//	String mobileAuth = request.getParameter("mobileAuth");
		request.setAttribute("headerFlag", headerFlag);
		request.setAttribute("covide", "No");
		request.setAttribute("pageIteration", 0);
		request.setAttribute("footerAddress", "");
		
		request.setAttribute("printTitle", printTitle);
		//String ppName=patientName.replaceAll(",", ".");
		Phlebotomyservice phlebotomyservice = (ApplicationContextUtils.getApplicationContext()).getBean(Phlebotomyservice.class);
	//	List<PathologySampleWiseMaster> list = phlebotomyservice.getRoutinevalueResutlusingPrint(masterIdd, treatmentId, patientType, unitId, request);
		RegService regservice = (ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
		List<RegTreBillDto> robj=regservice.fetchPatientsRecordByTreatmentId(treatmentId);
		String pmobile="0";
		if(robj.size() > 0){
			pmobile=robj.get(0).getMobile();
		}
		
		/*
		String profileName="";
		for(int pro = 0; pro < list.size(); pro++) {
			profileName =profileName+"_"+ list.get(pro).getProfileName();
			
		}*/
		
		SimpleDateFormat formDate = new SimpleDateFormat("dd-MM-yyyy");

	       // String strDate = formDate.format(System.currentTimeMillis()); // option 1
	       String strDate = formDate.format(new Date());
	       System.out.println("strDate==="+strDate);
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
		//TreatmentModel treatmentModel = new TreatmentModel();
		List<RegTreBillDto> ltPatientRecord = null;
		RegTreBillDto rtd = new RegTreBillDto();
		RegistrationController uss = (ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
		rtd = uss.fetchPatientsRecordByTreatmentId(treatmentId);
		rtd = rtd.getListRegTreBillDto().get(0);
		//List<Assessment> listAssessment = treatmentModel.fetchAssessment(idTreatment);
		
		
		
		
		//Integer authoId=list.get(0).getAuthorizedBy();	
		//Integer postId=list.get(0).getPostBy();	
		Integer postId=1;
		Integer authoId=0;
		if(authoId == null){
			authoId = 0;
		}
		if(postId == null){
			postId = 0;
		}
		if(postId > 0)
			request.setAttribute("postId", postId); // added by vinod
		else
			request.setAttribute("postId", authoId); // added by vinod
		//System.out.println(collecteddate+postdate);
		/* --------------------------------------End All Services -------------------------------------------   */
			     
		PdfWriter pdfWriter = PdfWriter.getInstance(document, outStream);			
		TempEventHandlerPalvePDF event = new TempEventHandlerPalvePDF();
		pdfWriter.setPageEvent(event);

		String reportFooterAddress = "";//hospObj.getReportFooterAddress();
		if(reportFooterAddress.equalsIgnoreCase(null) || reportFooterAddress.equalsIgnoreCase("") || reportFooterAddress == null)
			{
			reportFooterAddress="";			
			}
		
		
		
		
		document.open();		
		String path = hospObj.getFilePath();
		String nabh = hospObj.getNabhImagePath();
		String hospitalName = hospObj.getHospitalName();
		hospitalName = hospitalName.toUpperCase();
		String address = hospObj.getHospitalAddress();
		String state = hospObj.getHospitalState();
		String city = hospObj.getHospitalCity();
		String contact = hospObj.getHospitalContact();
		String path2 = application.getRealPath(nabh);
		
		String regno = hospObj.getHosRegNo();
		String hospitalZip = hospObj.getHospitalZip();
		String PhoneNo = hospObj.getHospitalContact();
		String secPhoneNo = hospObj.getSecPNo();
		String webste = hospObj.getWebsite();
		String email = hospObj.getHospitalEmail();
		String cinNo = hospObj.getTxtCinNo();
		String serviceTaxNo = hospObj.getTxtSerTaxNo();
		String panNo = hospObj.getPanNo();
		String hPhoneNo = PhoneNo + "/" + secPhoneNo;

		String nabhLogo = application.getRealPath(nabh);

		String path1 = "";

		img = Image.getInstance(path2);

		cell = new PdfPCell();
		cell.addElement(new Chunk(img, 1, -45));
		cell.setBorder(Rectangle.NO_BORDER);

		Image imgNabh = null;
		PdfPCell cellNabh = null;

		imgNabh = Image.getInstance(nabhLogo);
		imgNabh.scaleAbsolute(80, 60);
		cellNabh = new PdfPCell();
		cellNabh.addElement(new Chunk(imgNabh, 5, -5));
		cellNabh.setBorder(Rectangle.NO_BORDER);

		java.util.Calendar currentDate = Calendar.getInstance();
		SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss a");
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
			 			
			 			
			          if(historyobj !=null){
				         	 HeaderTableH.addCell(new Phrase("Medical Officer:", subheader));
				         	 HeaderTableH.addCell(new Phrase(""+historyobj.getMedicalOfficerName(), tabletext));
				         	 
				         	 HeaderTableH.addCell(new Phrase("MRN No:", subheader));
				         	 HeaderTableH.addCell(new Phrase(""+historyobj.getMrnNo(), tabletext));
				         	 
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
				  		    	System.out.println("chief===="+historyobj.getChiefComplaints());
				  		    	
				  		    	int cnCount=0;
				  		    	
				  		    	if(historyobj.getChiefComplaints() !=null &&  !historyobj.getChiefComplaints().trim(). equalsIgnoreCase("") ){
				  		    	 HeaderTableH.addCell(new Phrase("Chief Complaints: ", subheader));
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
				  	  			 HeaderTable5.addCell(new Phrase("", tabletext));
				  	  			HeaderTable5.addCell(new Phrase("", tabletext));
				  	  			 HeaderTable5.addCell(new Phrase("", tabletext));
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
				 		  			 HeaderTable5.addCell(new Phrase("", tabletext));
				 		  			HeaderTable5.addCell(new Phrase("", tabletext));
				 		  			 HeaderTable5.addCell(new Phrase("", tabletext));
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
				 				  			
				 				 		int lcount=0;
				 		        	 
				 				  		if(!(historyobj.getLocalExamination().trim().equalsIgnoreCase(""))){
				 				  			 HeaderTableH.addCell(new Phrase("Local Examinations", subheader));
				 				        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getLocalExamination(), tabletext));
				 				        	 lcount++;
				 				  		}	
				 				  		
				 				  		if(!(historyobj.getInvestigationReport().trim().equalsIgnoreCase(""))){
				 				  			HeaderTableH.addCell(new Phrase("Investigation Reports", subheader));
				 				        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getInvestigationReport(), tabletext));
				 				        	 lcount++;
				 				  		}
				 		        	
				 		        	 if(!(historyobj.getProvisionalDiagno().trim().equalsIgnoreCase(""))){
				 		        		 HeaderTableH.addCell(new Phrase("Provisional Diagnosis", subheader));
				 			        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getProvisionalDiagno(), tabletext));
				 			        	 lcount++;
				 		        	 }
				 		        	 
				 		        	 if(!(historyobj.getTreatPlan().trim().equalsIgnoreCase(""))){
				 		        		 HeaderTableH.addCell(new Phrase("Treatment Plan", subheader));
				 			        	 HeaderTableH.addCell(new Phrase(":  "+historyobj.getTreatPlan(), tabletext));
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
				 			  			// HeaderTableSpace1.addCell(new Phrase("", tabletext));
				 			 			//document.add(HeaderTableSpace1);
				 			 		//	HeaderTableSpace1.flushContent();
				      			
				      				
				      			}
			 //End History Data
			 		
			
			       
			
			// End Code
	    	
			
			
			
		
			

			
			
          
			
			
			
		
			
			
			
			 PdfPTable HeaderTableTechN = new PdfPTable(1);
				int[] headerwidth51 = {100};
				HeaderTableTechN.setWidths(headerwidth51);
				HeaderTableTechN.setWidthPercentage(95f);
			    HeaderTableTechN.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			   	HeaderTableTechN.addCell(new Phrase("",subheader));
			   	HeaderTableTechN.addCell(new Phrase("",subheader));
			
				PdfPCell cells26 = new PdfPCell(new Phrase("--End Of Report--", subheader));
				cells26.setHorizontalAlignment(Element.ALIGN_CENTER);
				cells26.setBorder(Rectangle.NO_BORDER);
				HeaderTableTechN.addCell(cells26);
			   	//HeaderTableTechN.addCell(new Phrase("--End Of Report--", subheader));			 
			
			   	//document.add(HeaderTableTechN);
			   	//HeaderTableTechN.flushContent();
				// ====================================================================================
			
			}
		
			 // adding QR code //
		 
       
		//document.add(HeaderTableInLebal);
		//HeaderTableInLebal.flushContent();
		// Ending QR code //
			  
			
			 //signature
				PdfPTable Headertable2 = new PdfPTable(3);
				int[] HeaderWidth2 = { 20, 60, 20 };
				Headertable2.setWidths(HeaderWidth2);
			    Headertable2.setWidthPercentage(95f);
				Headertable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);		
			 
			    Headertable2.addCell(new Phrase("  ", footer));  
				Headertable2.addCell(new Phrase(" ", tabletext));
			    Headertable2.addCell(new Phrase("  ", footer));
		
			  String signature = "";
			 String actualpath = "";
			 int IdPathologist = 0;    		 
			 
			 //AdminModel admodel = new AdminModel();
			 Doctor doc1 = new Doctor();
			 List<Doctor> listDoc = null;
			 //listDoc = admodel.getDoctorsDetails(userId);
			 signature = "";//listDoc.get(0).getDocsign();

			  List<Doctor> listDoc2 = null;
			  String  veriBy="";
			  String verifiedsignature="";
			  String  verifiedqualification="";
			  String  verifieddesigination="";
			  if(authoId>0)
			  {
			     
			  }
			 
			 List<Doctor> listDoc1 = null;
		 	
		    String  authoqualification="";
		    String  authodesigination="";
		    String  authosignature="";	 
		    String authpath="";
		    String authoby="";
		    if(postId>0)
		    {    
		    }
		 		   
		 		  
		 		     
			 
			 Image verifyed = null;
			 PdfPCell cellverifiedsign = null;
			 String actual = FilePath.getUPLOADDOC();
			 actualpath = actual + verifiedsignature;
			 if (!verifiedsignature.equals("-")) {
			 try {
			//String pathsign = application.getRealPath(actualpath);
			verifyed = Image.getInstance(actualpath);
			verifyed.scaleAbsolute(80, 50);
			cellverifiedsign = new PdfPCell();
			cellverifiedsign.addElement(new Chunk(verifyed, 5, -5));
			cellverifiedsign.setBorder(Rectangle.NO_BORDER);
		} catch (Exception e) {
			e.printStackTrace();
		}
			}
			 
			 Image imgsignautho = null;
			 PdfPCell cellauthoSign = null;
			 String actual1 = FilePath.getUPLOADDOC();
			 authpath = actual1 + authosignature;
			 if (!authosignature.equals("-")) {
			 try {
			//String pathsign = application.getRealPath(actualpath);
			String pathToWeb1 = FilePath.getBasePath();
			path1 = pathToWeb1 + "Dr.Amita Neelakantan.jpg";
			
			//imgsignautho = Image.getInstance(authpath);
			imgsignautho = Image.getInstance(path1);
			imgsignautho.scaleAbsolute(80, 50);
			cellauthoSign = new PdfPCell();
			cellauthoSign.addElement(new Chunk(imgsignautho, 5, -5));
			cellauthoSign.setBorder(Rectangle.NO_BORDER);
		} catch (Exception e) {
			e.printStackTrace();
		}
			} 

			Image bg1 = Image.getInstance(path2);
			bg1.scaleAbsolute(10, 10);
			if (verifyed == null) {
		       Headertable2.addCell(new Phrase("", header));
			} else {
		       Headertable2.addCell(cellverifiedsign);
			}
			
			Headertable2.addCell(new Phrase("", tabletext));
			
			if (imgsignautho == null) {
			        	Headertable2.addCell(new Phrase("", tabletext));

			} else {
		        Headertable2.addCell(cellauthoSign);
			}
			
		    //Headertable2.addCell(new Phrase("  (Verified by) ", footer));  
		    Headertable2.addCell(new Phrase(" ", footer));  
			Headertable2.addCell(new Phrase(" ", tabletext));
			Headertable2.addCell(new Phrase("  (Authenticated By)", footer));
			
			 if(authoId>0)
		    {
		   Headertable2.addCell(new Phrase(" ", tabletext));
		          //Headertable2.addCell(new Phrase("  "+veriBy+" "+verifiedqualification,footer));  
		    }else
		    {
		       Headertable2.addCell(new Phrase("", tabletext));	         	   
		    }
			Headertable2.addCell(new Phrase(" ", tabletext));
			if(postId>0)
		   {
		Headertable2.addCell(new Phrase("Dr.Amita Neelakantan", tabletext));
		//Headertable2.addCell(new Phrase("  "+authoby+"   "+authoqualification+" ", footer));
		   }else
		   {
		       Headertable2.addCell(new Phrase("", tabletext));
		   }
			
			//Headertable2.addCell(new Phrase("  "+verifieddesigination, footer));  
			Headertable2.addCell(new Phrase("", tabletext));
			Headertable2.addCell(new Phrase(" ", tabletext));
			//Headertable2.addCell(new Phrase("  "+authodesigination, footer));
			Headertable2.addCell(new Phrase("MBBS, MD Pathology", tabletext));
			
			Headertable2.addCell(new Phrase("", tabletext));
			Headertable2.addCell(new Phrase(" ", tabletext));
			//Headertable2.addCell(new Phrase("  "+authodesigination, footer));
			Headertable2.addCell(new Phrase("MMC Reg. No:3054", tabletext));
			 
			
			String signOneDocName = "";//hospObj.getSignOneDocName();
			String signOneImageName = "";//hospObj.getSignOneImageName();
			String signTwoDocName = "";//hospObj.getSignTwoDocName();
			String signTwoImageName = "";//hospObj.getSignTwoImageName();
			
			if(signOneDocName.equalsIgnoreCase(null) || signOneDocName.equalsIgnoreCase("") || signOneImageName.equalsIgnoreCase(null) || signOneImageName.equalsIgnoreCase("")
			|| signTwoDocName.equalsIgnoreCase(null) || signTwoDocName.equalsIgnoreCase("") || signTwoImageName.equalsIgnoreCase(null) || signTwoImageName.equalsIgnoreCase(""))
		
			{
		if(signTwoDocName.equalsIgnoreCase(null) || signTwoDocName.equalsIgnoreCase("") || signTwoImageName.equalsIgnoreCase(null) || signTwoImageName.equalsIgnoreCase(""))
		{
		
		}else{ 			
			//Set second sign on bottom
			
			try{
				Image imageTwoSign = null;
				 PdfPCell cellTwoSign = null;
				 String pathToWeb1 = FilePath.getBasePath();
				 path1 = pathToWeb1 + signTwoImageName ; //"Dr.Amita Neelakantan.jpg";
				
				 imageTwoSign = Image.getInstance(path1);
				 imageTwoSign.scaleAbsolute(80, 50);
				 cellTwoSign = new PdfPCell();
				 cellTwoSign.addElement(new Chunk(imageTwoSign, 5, -5));
				 cellTwoSign.setBorder(Rectangle.NO_BORDER);
				
				 Headertable2.addCell(new Phrase(" ", tabletext));
				 Headertable2.addCell(new Phrase(" ", tabletext));		
				 Headertable2.addCell(cellTwoSign);
					
		
				Headertable2.addCell(new Phrase(" ", tabletext));
				Headertable2.addCell(new Phrase(" ", tabletext));
				PdfPCell cells32 = new PdfPCell(new Phrase("(Authenticated By)", tabletext));
				cells32.setHorizontalAlignment(Element.ALIGN_CENTER);
				cells32.setBorder(Rectangle.NO_BORDER);
				Headertable2.addCell(cells32);
				
				Headertable2.addCell(new Phrase(" ", tabletext));
				Headertable2.addCell(new Phrase(" ", tabletext));
				PdfPCell cells33 = new PdfPCell(new Phrase(signTwoDocName.replaceAll("@", "\n"), tabletext));
				cells33.setHorizontalAlignment(Element.ALIGN_CENTER);
				cells33.setBorder(Rectangle.NO_BORDER);
				Headertable2.addCell(cells33);
			}catch(Exception e){
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
			}
		
			
		 }
			}else{			
			//Set 1st & 2nd  sign on bottom
			Image imageOneSign = null;
			PdfPCell cellOneSign = null;
		 
			Image imageTwoSign = null;
			PdfPCell cellTwoSign = null;
			try{
		
				 String pathToWeb1 = FilePath.getBasePath();
				 path1 = pathToWeb1 + signOneImageName ; //"Dr.Amita Neelakantan.jpg";
				 imageOneSign = Image.getInstance(path1);
				 imageOneSign.scaleAbsolute(90, 50);
				 cellOneSign = new PdfPCell();
				 cellOneSign.addElement(new Chunk(imageOneSign, 5, -5));
				 cellOneSign.setBorder(Rectangle.NO_BORDER);
		 

				 String pathToWeb2 = FilePath.getBasePath();
				 path2 = pathToWeb2 + signTwoImageName ; //"Dr.Amita Neelakantan.jpg";			
				 imageTwoSign = Image.getInstance(path2);
				 imageTwoSign.scaleAbsolute(90, 50);
				 cellTwoSign = new PdfPCell();
				 cellTwoSign.addElement(new Chunk(imageTwoSign, 5, -5));
				 cellTwoSign.setBorder(Rectangle.NO_BORDER);
		 
			
				 Headertable2.addCell(cellOneSign);
				 Headertable2.addCell(new Phrase(" ", tabletext));
				 Headertable2.addCell(cellTwoSign);
				
				
				 PdfPCell cells31 = new PdfPCell(new Phrase("(Authenticated By)", tabletext));
				 cells31.setHorizontalAlignment(Element.ALIGN_CENTER);
				 cells31.setBorder(Rectangle.NO_BORDER);
				 Headertable2.addCell(cells31);
				 
				 Headertable2.addCell(new Phrase(" ", tabletext));
				
				PdfPCell cells32 = new PdfPCell(new Phrase("(Authenticated By)", tabletext));
				cells32.setHorizontalAlignment(Element.ALIGN_CENTER);
				cells32.setBorder(Rectangle.NO_BORDER);
				Headertable2.addCell(cells32);
				
				
				PdfPCell cells30 = new PdfPCell(new Phrase(signOneDocName.replaceAll("@", "\n"), tabletext));
				cells30.setHorizontalAlignment(Element.ALIGN_CENTER);
				cells30.setBorder(Rectangle.NO_BORDER);
				Headertable2.addCell(cells30);
				
				Headertable2.addCell(new Phrase(" ", tabletext));
				
				PdfPCell cells33 = new PdfPCell(new Phrase(signOneDocName.replaceAll("@", "\n"), tabletext));
				cells33.setHorizontalAlignment(Element.ALIGN_CENTER);
				cells33.setBorder(Rectangle.NO_BORDER);
				Headertable2.addCell(cells33);
			}catch(Exception e)
			{
				e.printStackTrace();
				System.err.println("ehatException:- Class Name :"
						+ e.getStackTrace()[0].getClassName() + " Method Name : "
						+ e.getStackTrace()[0].getMethodName() + " Line No :"
						+ e.getStackTrace()[0].getLineNumber());
			}
		
		}
			
		
			Headertable2.flushContent();
		 
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