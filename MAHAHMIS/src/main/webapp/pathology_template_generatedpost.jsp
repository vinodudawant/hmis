<%@page import="com.hms.TempEventHandlerLISPDF"%>
<%@page import="com.hms.pathology.serviceImpl.phelbotomyserviceimpl"%>
<%@page import="com.sun.mail.smtp.SMTPTransport"%>
<%@page import="javax.sound.midi.SysexMessage"%>
<%@page import="com.hms.api.controller.WhatsAppApi"%>
<%@page import="java.awt.Color"%>
<%@page import="com.lowagie.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.lowagie.text.html.simpleparser.StyleSheet"%>
<%@page import="com.hms.pathology.controller.PhlebotomyController"%>
<%@page import="com.hms.pathology.controller.PathologySearchController"%>
<%@page import="com.hms.TempEventHandlerLISEmailPDF"%>
<%@page import="java.util.ArrayList"%>
<%@page import="javax.mail.Transport"%>
<%@page import="javax.mail.internet.MimeMultipart"%>
<%@page import="javax.mail.Multipart"%>
<%@page import="javax.mail.internet.MimeBodyPart"%>
<%@page import="java.util.Date"%>
<%@page import="javax.mail.internet.InternetAddress"%>
<%@page import="javax.mail.internet.MimeMessage"%>
<%@page import="javax.mail.Message"%>
<%@page import="javax.mail.Session"%>
<%@page import="javax.mail.PasswordAuthentication"%>
<%@page import="javax.mail.Authenticator"%>
<%@page import="java.util.Properties"%>
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
<%@page import="com.hms.ehat.service.DiagnosticsService"%>
<%@page import="com.hms.dto.Assessment"%>
<%@page import="com.hms.model.AdminModel"%>
<%@page import="com.hms.dto.Doctor"%>

<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@page import="com.hms.dto.HospitalDetails"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.model.TreatmentModel"%>
<%@page import="com.hms.pharmacy.upload.FilePath"%>
 <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="com.lowagie.text.Chunk,com.lowagie.text.Document,com.lowagie.text.Element,com.lowagie.text.Font
 
,com.lowagie.text.HeaderFooter,com.lowagie.text.Image,com.lowagie.text.Paragraph,com.lowagie.text.Phrase,com.lowagie.text.Rectangle
 
,com.lowagie.text.pdf.PdfPCell,com.lowagie.text.pdf.PdfPTable,com.lowagie.text.pdf.PdfWriter,com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport,
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants, com.hms.pharmacy.upload.FilePath"%> 
     
   <%--   <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="com.lowagie.text.Chunk,com.lowagie.text.Font,com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%> --%>
     
     
<%@ page trimDirectiveWhitespaces="true"%>
<%@page import="java.util.Calendar"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Routine Value</title>
</head>
<body>
	<%
		try {
		/* -------------------------------------- Declaration ---------------------------------------------   */
		response.setContentType("application/pdf");
		
		List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails.getHospDetails("0",request);
		HospitalDetails hospObj = arrHospitalDetails.get(0);

		ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String lntUnit = (String) resource.getObject("lntUnit").toString();
		
		String CovidReportProfileId = (String) resource.getObject("CovidReportProfileId").toString();			
		String SARSCOV2ANTIGEN = (String) resource.getObject("SARSCOV2ANTIGEN").toString();			
		String COVID19RNAAMPLIFICATION = (String) resource.getObject("COVID19RNAAMPLIFICATION").toString();
		String REALTIMEHEPATITISCVIRUSHCV = resource.getObject("REALTIMEHEPATITISCVIRUSHCV").toString();
		String REALTIMETRUENAT = resource.getObject("REALTIMETRUENAT").toString();
		String ReportUrlSmsLink = (String) resource.getObject("ReportUrlSmsLink").toString();
		String labName = (String) resource.getObject("labName").toString();
		
		ResourceBundle resource1 = ResourceBundle.getBundle("SMSFormat");
		String labNameee = (String) resource1.getObject("labName").toString();
		
		
		Integer covidReportId=Integer.parseInt(CovidReportProfileId);		
		Integer SARSCOV2ANTIGENID=Integer.parseInt(SARSCOV2ANTIGEN);			
		Integer COVID19RNAAMPLIID = Integer.parseInt(COVID19RNAAMPLIFICATION);
		Integer REALTIMEHEPATITISCVIRUSHCVID = Integer.parseInt(REALTIMEHEPATITISCVIRUSHCV);
		Integer REALTIMETRUENATID = Integer.parseInt(REALTIMETRUENAT);
		
		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		
			
		
		Font header = new Font(Font.HELVETICA, 11, Font.BOLD);
		Font headerUnderline = new Font(Font.HELVETICA, 11, Font.BOLD | Font.UNDERLINE);
		Font subheader = new Font(Font.HELVETICA, 9, Font.BOLD);
		Font footer = new Font(Font.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);
		Font tableheader22 = new Font(Font.HELVETICA, 21, Font.BOLD);
		Font tableheader11 = new Font(Font.HELVETICA, 13, Font.BOLD);
		Font tableheader111 = new Font(Font.HELVETICA, 13, Font.BOLD);
		Font tableheader12 = new Font(Font.COURIER, 13, Font.BOLD);
		Font tableheader13 = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font tableheader14 = new Font(Font.HELVETICA, 10,Font.BOLD | Font.UNDERLINE);
		Font tableheader = new Font(Font.HELVETICA, 13, Font.BOLD);
		Font tabletext = new Font(Font.HELVETICA, 9, Font.NORMAL);
		Font tabletext7 = new Font(Font.HELVETICA, 8, Font.NORMAL);
		Font tableheader15 = new Font(Font.HELVETICA, 10, Font.NORMAL);		
		Font small = new Font(Font.HELVETICA, 9, Font.NORMAL);
		Font subheaderUNDERLINE = new Font(Font.HELVETICA, 9, Font.BOLD | Font.UNDERLINE);
		Image img = null;
		PdfPCell cell = null;
		Image imgFQRcode=null;
		HttpSession session1 = request.getSession();
		String user_name = (String) session1.getAttribute("userName");
		Integer userId = (Integer) session1.getAttribute("userId");
		Integer unitId = (Integer) session1.getAttribute("uId");
		//int treatmentId=Integer.parseInt(request.getParameter("treatmentId"));
		String idTreatment=request.getParameter("treatmentId");
		
		String masterIdd=request.getParameter("masterIdd");
		String patientType=request.getParameter("gender");
		
		String emailTo=request.getParameter("emailTo");
		String patientName=request.getParameter("patientName");
		String patientId=request.getParameter("patientId");
		System.err.println("patientName...."+patientName);
		response.setHeader("Content-Disposition", "inline; filename="+patientName+".pdf");	
		//response.addHeader("Content-Disposition", "attachment; filename=" + patientName);
		request.setAttribute("headerFlag", "Yes");
		request.setAttribute("covide", "Yes");
		request.setAttribute("footerAddress", "Lifenity International Clinical Laboratory L.L.C Elite Business Centre, Level 01, 104-05, Al Barsha, P.O. Box 502180, Dubai, UAE T: +971 045479027, +971 045479033 | E: dubaicustomercare@lifenity.ae | www.lifenity.ae");
		request.setAttribute("pageIteration", 0);
		Integer trId = 0;
		Integer masterId = 0;
		Integer sampleId = 0;
		
		String[] trIds = idTreatment.split(",");			
		String[] sampleIds = masterIdd.split("-");
		String[] genders = patientType.split(",");
		String[] emailTo1 = emailTo.split(",");
		String[] patientName1 = patientName.split(",");
		String[] patientIds = patientId.split(",");
		
		for(int counter = 0; counter < sampleIds.length; counter++){
		
			request.setAttribute("masterIdd", sampleIds[counter]);
			request.setAttribute("treatmentId", trIds[counter]);
			request.setAttribute("gender", genders[counter]);
			
			PhlebotomyController pathologyPhlebotomyController = (ApplicationContextUtils.getApplicationContext()).getBean(PhlebotomyController.class);
			//pathologyPhlebotomyController.bulkPostingOfRecords(sampleIds[counter], request, response);
			
		String pName = patientName1[counter].replaceAll("\\s", "");
		String pNamee = patientName1[counter].replaceAll("  ", " ");
		final String DEST = FilePath.getLabReportPath() + File.separator + sampleIds[counter] + File.separator + pName + File.separator +pName+".pdf";
		//final String DESTForSmsLink="http://43.241.69.22:8080/LabResultPdf/" + File.separator + masterIdd + File.separator + pName + File.separator +pName+".pdf";
		final String DESTForSmsLink=ReportUrlSmsLink + File.separator + sampleIds[counter] + File.separator + pName + File.separator +pName+".pdf";
		//final String DESTForSmsLink="https://www.disha.lifenitywellness.com/LabResultPdf/" + File.separator + masterIdd + File.separator + pName + File.separator +pName+".pdf";
		File file = new File(DEST);
			
			/* final String DEST = FilePath.getLabReportPath() + File.separator + sampleIds[counter] + File.separator + patientName1[counter] + File.separator +patientName1[counter]+".pdf";    
		     	File file = new File(DEST);*/
		     	
		     	file.getParentFile().mkdirs();
		      	Document document = new Document(PageSize.A4);
		    	document.setMargins(20, 20, 20, 20);
		    	
		        FileOutputStream fos = new FileOutputStream(DEST);
		        PdfWriter writer = PdfWriter.getInstance(document,fos);
		        TempEventHandlerLISEmailPDF event = new TempEventHandlerLISEmailPDF();
		    	writer.setPageEvent(event);
		     	
		     	
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
		TreatmentModel treatmentModel = new TreatmentModel();
		List<RegTreBillDto> ltPatientRecord = null;
		RegTreBillDto rtd = new RegTreBillDto();
		RegistrationController uss = (ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
		rtd = uss.fetchPatientsRecordByTreatmentId(Integer.parseInt(trIds[counter]));
		rtd = rtd.getListRegTreBillDto().get(0);
		String mobileNo = rtd.getMobile();
		List<Assessment> listAssessment = treatmentModel.fetchAssessment(idTreatment);
		
		Phlebotomyservice phlebotomyservice = (ApplicationContextUtils.getApplicationContext()).getBean(Phlebotomyservice.class);
		List<PathologySampleWiseMaster> list = phlebotomyservice.getRoutinevalueResutlusingPrint(sampleIds[counter], Integer.parseInt(idTreatment), genders[counter], unitId, request);
	
		//String barcodenumber=list.get(0).getBarCode();			
		//String collecteddate=list.get(0).getCollecteddate();			
		String postdate=list.get(0).getPostdate();

		if(postdate!=null ){
			postdate = list.get(0).getPostdate();
			//System.out.println("ifDDDDDDDDD");
		}else{
			postdate = "-";
			//System.out.println("FFFFFFFFFFF");
		}

		Integer authoId=list.get(0).getAuthorizedBy();	
		Integer postId=list.get(0).getPostBy();	
		if(authoId == null){
			authoId = 0;
		}
		if(postId == null){
			postId = 0;
		}
		//System.out.println(collecteddate+postdate);
		/* --------------------------------------End All Services -------------------------------------------   */
			     
		PdfWriter pdfWriter = PdfWriter.getInstance(document, outStream);

			
		String reportFooterAddress = hospObj.getReportFooterAddress();
		if(reportFooterAddress.equalsIgnoreCase(null) || reportFooterAddress.equalsIgnoreCase(""))
			{
			reportFooterAddress="Page 1 of ";			
			}
		// adding footer information//
			Font smallNew = new Font(Font.HELVETICA, 10, Font.BOLD);
			smallNew.setSize(8);
					//String hospitaladdress1 = "Processed at: 12th FLOOR-D WING , TRADE WORLD, KAMALA MILLS, LOWER PAREL, MUMBAI- 400013";
			       // String hospitaladdress1 = " Processed at: Lifenity Wellness Int Ltd., CSMIA, Terminal 2, Level P-9, East Zone, Andheri, Mumbai-400099                                                 Page 1 of ";
					HeaderFooter footerNew = new HeaderFooter(new Phrase(reportFooterAddress, smallNew), true);
					//footerNew.setPageNumber(1);
					footerNew.setAlignment(Element.ALIGN_RIGHT);
					footerNew.setBorderWidthBottom(0);
					document.setFooter(footerNew);
					// ending footer information//			
		
		document.open();		
		String path = hospObj.getFilePath();
		String hospitalName = hospObj.getHospitalName();
		hospitalName = hospitalName.toUpperCase();
		String address = hospObj.getHospitalAddress();
		String city = hospObj.getHospitalCity();
		String state = hospObj.getHospitalState();
		String contact = hospObj.getHospitalContact();
		String path2 = application.getRealPath(path);
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

		String nabh = hospObj.getNabhImagePath();
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

		PdfPTable Headertable1 = new PdfPTable(1);
		int[] HeaderWidth1 = { 100 };
		Headertable1.setWidths(HeaderWidth1);
		Headertable1.setWidthPercentage(95f);
		Headertable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			

		PdfPTable Headertable3 = new PdfPTable(3);
		int[] HeaderWidth3 = { 0,100,0 };
		Headertable3.setWidths(HeaderWidth3);
		Headertable3.setWidthPercentage(95f);
		Headertable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);	
		
		

			
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
		  
			PdfPTable HeaderTable11 = new PdfPTable(1);
	         int[] headerwidth11 = {100};
	         HeaderTable11.setWidths(headerwidth11);
	         HeaderTable11.setWidthPercentage(95f);
	         HeaderTable11.getDefaultCell().setBorder(Rectangle.BOTTOM);
		   
	         
	         
	        	
				PdfPTable HeaderTable121 = new PdfPTable(4);
		         int[] headerwidth121 = {10,20,10,20};
		         HeaderTable121.setWidths(headerwidth121);
		         HeaderTable121.setWidthPercentage(95f);
		         HeaderTable121.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			   
		   
		         HeaderTable121.addCell(new Phrase("Profile Name:-", subheader));
		         HeaderTable121.addCell(new Phrase( list.get(0).getPathologySampleWiseSlave().get(0).getProfileName(),tabletext));
		         HeaderTable121.addCell(new Phrase("Template Name:-", subheader));
		         HeaderTable121.addCell(new Phrase(list.get(0).getPathologySampleWiseSlave().get(0).getTemplateName(), subheader));
		         
		         
		     	document.add(HeaderTable121);
		     	HeaderTable121.flushContent();
		     	
		     	HeaderTable11.addCell(new Phrase("", header));
		     	document.add(HeaderTable11);
	        	HeaderTable11.flushContent();

		         
		// REPORT CONTENT BELOW
           PdfPTable HeaderTable32 = new PdfPTable(1);
           int[] headerwidth32 = {100};
           HeaderTable32.setWidths(headerwidth32);
           HeaderTable32.setWidthPercentage(95f);
           HeaderTable32.getDefaultCell().setBorder(Rectangle.NO_BORDER);
           
           StyleSheet styleSheet = new StyleSheet();
           styleSheet.loadTagStyle("body", "size", "10px");
           styleSheet.loadTagStyle("p", "size", " 10px");
           HTMLWorker htmlWorker = new HTMLWorker(document);
           htmlWorker.setMargins(50, 100, 100, 150);
           Paragraph paragraph = new Paragraph();
           
           PdfPTable HeaderTable31 = new PdfPTable(1);
           int[] headerwidth30 = {100};
           HeaderTable31.setWidths(headerwidth30);
           HeaderTable31.setWidthPercentage(95f);
           HeaderTable31.getDefaultCell().setBorder(Rectangle.NO_BORDER);
           htmlWorker.setMargins(50, 100, 100, 150);
           
           String ristempData = "";
           
           	ristempData = list.get(0).getPathologySampleWiseSlave().get(0).getTemplateData();
           	
          
           java.util.List<Element> ie1 = HTMLWorker.parseToList(new StringReader(ristempData), styleSheet);
          if(ristempData.equalsIgnoreCase("") || ristempData.equalsIgnoreCase("NULL")){
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
       	   java.util.List<Element> ie3 = HTMLWorker.parseToList(new StringReader(ristempData), styleSheet);
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

		   
          Headertable3.addCell(new Phrase("", subheader));
          Headertable3.addCell(new Phrase("", header));
          Headertable3.addCell(new Phrase("", subheader));
		   
          Headertable3.addCell(new Phrase("", subheader));
          Headertable3.addCell(new Phrase("", header));
          Headertable3.addCell(new Phrase("", subheader));
          
          
          Headertable3.addCell(new Phrase("", subheader));
          Headertable3.addCell(new Phrase("", header));
          Headertable3.addCell(new Phrase("", subheader));
		   
          Headertable3.addCell(new Phrase("", subheader));
          Headertable3.addCell(new Phrase("", header));
          Headertable3.addCell(new Phrase("", subheader));
          
          Headertable3.addCell(new Phrase("", subheader));
          Headertable3.addCell(new Phrase("", header));
          Headertable3.addCell(new Phrase("", subheader));
          
          Headertable3.addCell(new Phrase("", subheader));
          Headertable3.addCell(new Phrase("", header));
          Headertable3.addCell(new Phrase("", subheader));
          
          Headertable3.addCell(new Phrase("", subheader));
          Headertable3.addCell(new Phrase("", header));
          Headertable3.addCell(new Phrase("", subheader));
		   
      	document.add(Headertable3);
      	Headertable3.flushContent();
      	
      	 
		   
         HeaderTable11.addCell(new Phrase("", header));
         
       	document.add(HeaderTable11);
       	HeaderTable11.flushContent();
       	
        
        Headertable3.addCell(new Phrase("", subheader));
        Headertable3.addCell(new Phrase("", header));
        Headertable3.addCell(new Phrase("", subheader));
        
        Headertable3.addCell(new Phrase("", subheader));
        Headertable3.addCell(new Phrase("", header));
        Headertable3.addCell(new Phrase("", subheader));
        
        Headertable3.addCell(new Phrase("", subheader));
        Headertable3.addCell(new Phrase("", header));
        Headertable3.addCell(new Phrase("", subheader));
		   
    	document.add(Headertable3);
    	Headertable3.flushContent();
    	
    	
		
		PdfPTable HeaderTableN1 = new PdfPTable(5);
		int[] headerwidth12 = { 20, 15, 30, 20, 15 };
		HeaderTableN1.setWidths(headerwidth12);
		HeaderTableN1.setWidthPercentage(95f);
		
		
		
		HeaderTableN1.getDefaultCell().setBorder(Rectangle.NO_BORDER);			
		
		HeaderTableN1.addCell(new Phrase("", subheader));
		HeaderTableN1.addCell(new Phrase("", header));
		HeaderTableN1.addCell(new Phrase("", subheader));
		HeaderTableN1.addCell(new Phrase("", header));
		HeaderTableN1.addCell(new Phrase("",subheader));
		
		HeaderTableN1.addCell(new Phrase("", subheader));
		HeaderTableN1.addCell(new Phrase("", header));
		HeaderTableN1.addCell(new Phrase("", subheader));
		HeaderTableN1.addCell(new Phrase("", header));
		HeaderTableN1.addCell(new Phrase("",subheader));
		//System.out.println(hospObj.getIcmrRegNo()+"microReason"+hospObj.getNablCertificate());
		if (hospObj.getIcmrRegNo() == null || hospObj.getIcmrRegNo().equalsIgnoreCase("null") || hospObj.getIcmrRegNo().equalsIgnoreCase("")|| hospObj.getIcmrRegNo().equalsIgnoreCase("-")) {				    	
			HeaderTableN1.addCell(new Phrase("", subheader));
			HeaderTableN1.addCell(new Phrase("", subheader));
		}else
		{
			HeaderTableN1.addCell(new Phrase("ICMR REGISTRATION:", subheader));
			HeaderTableN1.addCell(new Phrase(""+ hospObj.getIcmrRegNo(), subheader));
		}	
		
		HeaderTableN1.addCell(new Phrase("", subheader));
		
		if (hospObj.getNablCertificate() == null || hospObj.getNablCertificate().equalsIgnoreCase("null") || hospObj.getNablCertificate().equalsIgnoreCase("")|| hospObj.getNablCertificate().equalsIgnoreCase("-")) {				    	
			HeaderTableN1.addCell(new Phrase("", subheader));
			HeaderTableN1.addCell(new Phrase("",subheader));
		}else
		{
			HeaderTableN1.addCell(new Phrase("NABL CERTIFICATE:", subheader));
			HeaderTableN1.addCell(new Phrase(""+ hospObj.getNablCertificate(),subheader));
		}	
		
		
		HeaderTableN1.getDefaultCell().setBorder(Rectangle.BOTTOM);
		
		HeaderTableN1.addCell(new Phrase("", subheader));
		HeaderTableN1.addCell(new Phrase("", header));
		HeaderTableN1.addCell(new Phrase("", subheader));
		HeaderTableN1.addCell(new Phrase("", header));
		HeaderTableN1.addCell(new Phrase("",subheader));
	   	
	
	   	document.add(HeaderTableN1);
	   	HeaderTableN1.flushContent();
	   	
				    
			   		
			if(labNameee.equalsIgnoreCase("Lifenity Wellness") || labName == "Lifenity Wellness"){
				//signature
				 PdfPTable Headertable2 = new PdfPTable(3);
				 int[] HeaderWidth2 = { 60, 60, 34 };
				 Headertable2.setWidths(HeaderWidth2);
				 Headertable2.setWidthPercentage(95f);
				 Headertable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				 
				    String path22 = "";				
				    String pathToWeb1 = FilePath.getBasePath();
					path22 = pathToWeb1 + "Stampimage.jpg";
					
					System.out.println(path22+"path22path22");
					
					Image img124 = null;
					PdfPCell cell13 = null;
					img124 = Image.getInstance(path22);
					img124.scaleAbsolute(80, 80);
					img124.scaleAbsoluteHeight(70);
					
					
					cell13 = new PdfPCell();
					cell13.addElement(new Chunk(img124, 1, -45));
					cell13.setBorder(Rectangle.NO_BORDER);

					
					String path23 = "";				
					String pathToWeb2 = FilePath.getBasePath();
					path23 = pathToWeb2 + "Dr-Disha.jpg";
						
					Image img125 = null;
					PdfPCell cell14 = null;
					img125 = Image.getInstance(path23);
					img125.scaleAbsolute(100, 30);
						
						
					cell14 = new PdfPCell();
					cell14.addElement(new Chunk(img125, 1, -45));
					cell14.setBorder(Rectangle.NO_BORDER);

					
					String path25 = "";				
					String pathToWeb3 = FilePath.getBasePath();
					path25 = pathToWeb3 + "MM Sign.jpg";
					
				    Image img126 = null;
				    PdfPCell cell15 = null;
				    img126 = Image.getInstance(path25);
				    img126.scaleAbsolute(100, 30);
					

					cell15 = new PdfPCell();
				    cell15.addElement(new Chunk(img126, 1, -45));
				    cell15.setBorder(Rectangle.NO_BORDER);


				     if(covidReportId==list.get(0).getProfileId())
				    {
				    	System.out.println(covidReportId+"eeeeeeeeeeee"+list.get(0).getProfileId());
				    	Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
					
				    } else if(SARSCOV2ANTIGENID==list.get(0).getProfileId())
				    {
			
				    	Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						
				    	
				    } else if(COVID19RNAAMPLIID==list.get(0).getProfileId() || REALTIMEHEPATITISCVIRUSHCVID==list.get(0).getProfileId())
				    {
				    	
				    	System.out.println(COVID19RNAAMPLIID+"eeeeeeeeeeee"+list.get(0).getProfileId());
				    	Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
						
						Headertable2.addCell(new Phrase(" ", tabletext));
						Headertable2.addCell(new Phrase("  ", footer));
						Headertable2.addCell(new Phrase("  ", footer));	
												
				    }
				
					           
				if (img126 == null) {
					
					Headertable2.addCell(new Phrase("", header));
				} else {
					
					Headertable2.addCell(cell15);
				}
				
					            
				Headertable2.addCell(new Phrase("  ", footer));
				
				
				if (img125 == null) {
					
					Headertable2.addCell(new Phrase("", header));
				} else {
					
					Headertable2.addCell(cell14);
				}
					
				Headertable2.addCell(new Phrase(" ", tabletext));
				Headertable2.addCell(new Phrase("  ", footer));
				Headertable2.addCell(new Phrase("  ", footer));	
				
				Headertable2.addCell(new Phrase(" ", tabletext));
				Headertable2.addCell(new Phrase("  ", footer));
				Headertable2.addCell(new Phrase("  ", footer));	
				
				Headertable2.addCell(new Phrase(" ", tabletext));
				Headertable2.addCell(new Phrase("  ", footer));
				Headertable2.addCell(new Phrase("  ", footer));	
				
				Headertable2.addCell(new Phrase(" ", tabletext));
				if (img124 == null) {
					
					Headertable2.addCell(new Phrase("", header));
				
				} else {
					
					Headertable2.addCell(cell13);
				}
				Headertable2.addCell(new Phrase("  ", footer));	
				
				//Headertable2.addCell(new Phrase(" Dr.ArunKumar Upadhyay", footer));  
				Headertable2.addCell(new Phrase(" Dr. Manjeet S Mehta ", footer));
				Headertable2.addCell(new Phrase("  ", footer));	
				Headertable2.addCell(new Phrase(" Dr.Disha Sharma", footer));
				
				//Headertable2.addCell(new Phrase(" PhD", tabletext));  
				Headertable2.addCell(new Phrase(" PhD", tabletext));
				Headertable2.addCell(new Phrase(" ", tabletext));
				Headertable2.addCell(new Phrase(" MD", tabletext));
				
				//Headertable2.addCell(new Phrase(" Sr.Scientific Officer", footer));  
				Headertable2.addCell(new Phrase(" Consultant Molecular Biologist", footer));
				Headertable2.addCell(new Phrase("  ", footer));	
				Headertable2.addCell(new Phrase(" Consultant Microbiologist", footer));
				
				document.add(Headertable2);	
				Headertable2.flushContent();
				
			}  else{
				
				String signOneDocName = "Mr. Vasil Nachan @MSc.(Microbiology)@Scientific Officer";
				String signOneImageName = "Vasil_Nachan.jpg";
				String signTwoDocName = "Dr. Manjeet Mehta @PhD(Molecular Biology)@Consultant Molecular Biologist";
				String signTwoImageName = "Manjeet_Mehta.jpg";
				String signThreeDocName = "Dr.Amrita Neelakantan @MD(Pathology)@Consultant Pathologist";
				String signThreeImageName = "Amrita.jpg";
				
				String path11 = "";
				String path22 = "";
				String path33 = "";
				
				Image imageOneSign = null;
				PdfPCell cellOneSign = null;
				
				Image imageTwoSign = null;
				PdfPCell cellTwoSign = null;
				
				Image imageThreeSign = null;
				PdfPCell cellThreeSign = null;
				
				PdfPTable Headertable2 = new PdfPTable(5);
				int[] HeaderWidth2 = { 20,20,20,20,20 };
				Headertable2.setWidths(HeaderWidth2);
			    Headertable2.setWidthPercentage(95f);
				Headertable2.setTotalWidth(527);
				Headertable2.setLockedWidth(true);
				Headertable2.getDefaultCell().setFixedHeight(50);
				Headertable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);	
				

			     if(covidReportId.equals(list.get(0).getProfileId()) || covidReportId==list.get(0).getProfileId())
			    {
			    	System.out.println(covidReportId+"eeeeeeeeeeee"+list.get(0).getProfileId());
			    	Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));
					Headertable2.addCell(new Phrase("  ", footer));	
					Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));
					
					/* Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));
					Headertable2.addCell(new Phrase("  ", footer));	
					Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));
					
					Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));
					Headertable2.addCell(new Phrase("  ", footer));	
					Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer)); */
					
				
			    } else if(SARSCOV2ANTIGENID.equals(list.get(0).getProfileId()) || SARSCOV2ANTIGENID==list.get(0).getProfileId())
			    {

			    	Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));
					Headertable2.addCell(new Phrase("  ", footer));	
					Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));
					
					Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));
					Headertable2.addCell(new Phrase("  ", footer));	
					Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));	
					
					
			    	
			    } else if(COVID19RNAAMPLIID.equals(list.get(0).getProfileId())||  COVID19RNAAMPLIID==list.get(0).getProfileId())
			    {
			    	
			    	System.out.println(COVID19RNAAMPLIID+"COVID19RNAAMPLIID"+list.get(0).getProfileId());
			    	Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));
					Headertable2.addCell(new Phrase("  ", footer));	
					Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));
					
					Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));
					Headertable2.addCell(new Phrase("  ", footer));	
					Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));
					
					Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));
					Headertable2.addCell(new Phrase("  ", footer));	
					Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));
					
					Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));
					Headertable2.addCell(new Phrase("  ", footer));	
					Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));
					
											
			    }else if(REALTIMEHEPATITISCVIRUSHCVID.equals(list.get(0).getProfileId())|| REALTIMEHEPATITISCVIRUSHCVID==list.get(0).getProfileId())
			    {
			    	
			    	System.out.println(COVID19RNAAMPLIID+"REALTIMEHEPATITISCVIRUSHCVID"+list.get(0).getProfileId());
			    	/* Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));
					Headertable2.addCell(new Phrase("  ", footer));	
					Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer)); */
					
											
			    }else if(REALTIMETRUENATID.equals(list.get(0).getProfileId())|| REALTIMETRUENATID==list.get(0).getProfileId())
			    {
			    	
			    	System.out.println(COVID19RNAAMPLIID+"REALTIMETRUENATID"+list.get(0).getProfileId());
			    	/* Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer));
					Headertable2.addCell(new Phrase("  ", footer));	
					Headertable2.addCell(new Phrase(" ", tabletext));
					Headertable2.addCell(new Phrase("  ", footer)); */
					
											
			    }
			     
				
				 String pathToWeb1 = FilePath.getBasePath();
				 path11 = pathToWeb1 + signOneImageName ; //"Dr.Amita Neelakantan.jpg";
				 imageOneSign = Image.getInstance(path11);
				 imageOneSign.scaleAbsolute(90, 50);
				 cellOneSign = new PdfPCell();
				 cellOneSign.addElement(new Chunk(imageOneSign, 5, -5));
				 cellOneSign.setBorder(Rectangle.NO_BORDER);		 

				 String pathToWeb2 = FilePath.getBasePath();
				 path22 = pathToWeb2 + signTwoImageName ; //"Dr.Amita Neelakantan.jpg";			
				 imageTwoSign = Image.getInstance(path22);
				 imageTwoSign.scaleAbsolute(90, 50);
				 cellTwoSign = new PdfPCell();
				 cellTwoSign.addElement(new Chunk(imageTwoSign, 5, -5));
				 cellTwoSign.setBorder(Rectangle.NO_BORDER);
				 
				 String pathToWeb3 = FilePath.getBasePath();
				 path33 = pathToWeb3 + signThreeImageName ; //"Dr.Amita Neelakantan.jpg";			
				 imageThreeSign = Image.getInstance(path33);
				 imageThreeSign.scaleAbsolute(90, 50);
				 cellThreeSign = new PdfPCell();
				 cellThreeSign.addElement(new Chunk(imageThreeSign, 5, -5));
				 cellThreeSign.setBorder(Rectangle.NO_BORDER);
				 cellThreeSign.setHorizontalAlignment(Element.ALIGN_CENTER);
		 
			
				 Headertable2.addCell(cellOneSign);
				 Headertable2.addCell(new Phrase(" ", tabletext7));
				 Headertable2.addCell(cellTwoSign);
				 Headertable2.addCell(new Phrase(" ", tabletext7));		 
				 Headertable2.addCell(cellThreeSign);				
				
				PdfPCell cells30 = new PdfPCell(new Phrase(signOneDocName.replaceAll("@", "\n"), tabletext7));
				cells30.setHorizontalAlignment(Element.ALIGN_CENTER);
				cells30.setBorder(Rectangle.NO_BORDER);
				Headertable2.addCell(cells30);
				
				 Headertable2.addCell(new Phrase(" ", tabletext7));
				
				PdfPCell cells31 = new PdfPCell(new Phrase(signTwoDocName.replaceAll("@", "\n"), tabletext7));
				cells31.setHorizontalAlignment(Element.ALIGN_CENTER);
				cells31.setBorder(Rectangle.NO_BORDER);
				Headertable2.addCell(cells31);
				
				 Headertable2.addCell(new Phrase(" ", tabletext7));
				
				PdfPCell cells33 = new PdfPCell(new Phrase(signThreeDocName.replaceAll("@", "\n"), tabletext7));
				cells33.setHorizontalAlignment(Element.ALIGN_CENTER);
				cells33.setBorder(Rectangle.NO_BORDER);
				Headertable2.addCell(cells33);
				document.add(Headertable2);	
				Headertable2.flushContent();
			}
		
		
		
		
		
		
		document.close();
		outStream.close();
		outStream.flush();
		
				 }//For loop end.
		
		} catch (Exception e) {
			e.printStackTrace();
		}
	%>
</body>
</html>