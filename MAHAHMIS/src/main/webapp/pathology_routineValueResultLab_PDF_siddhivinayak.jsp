<%@page import="com.hms.TempEventHandlerLISSiddhivinayakPDF"%>
<%@page import="com.hms.pathology.service.PathoTestResultService"%>
<%@page import="java.util.stream.Collectors"%>
<%@page import="com.hms.pathology.dto.LabTestNormalValuesDTO"%>
<%@page import="com.hms.pathology.dto.PathologySampleWiseSlave"%>
<%@page import="com.hms.pathology.dto.LabTestSampleDTO"%>
<%@page import="com.hms.pathology.dto.LabUnitTypeDTO"%>
<%@page import="com.hms.ehat.dto.LabTestMethodDTO"%>
<%@page import="com.hms.pathology.dto.LabTestDTO"%>
<%@page import="java.util.Collections"%>
<%@page import="java.util.Comparator"%>
<%@page import="com.hms.ehat.dto.LabProfileTestCompDTO"%>
<%@page import="java.util.Locale"%>
<%@page import="org.jfree.chart.labels.StandardCategoryItemLabelGenerator"%>
<%@page import="org.jfree.chart.plot.CategoryPlot"%>
<%@page import="org.jfree.chart.axis.CategoryAxis"%>
<%@page import="org.jfree.chart.axis.CategoryLabelPositions"%>
<%@page import="org.jfree.chart.renderer.category.LineAndShapeRenderer"%>
<%@page import="org.jfree.chart.renderer.category.CategoryItemRenderer"%>
<%@page import="org.jfree.chart.title.TextTitle"%>
<%@page import="java.util.Date"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="java.awt.Color"%>
<%@page import="javax.sound.midi.SysexMessage"%>
<%@page import="com.hms.TempEventHandlerLISPDF"%>
<%@page import="com.hms.utility.PageEventHandlerBean"%>
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
<%@page import="com.lowagie.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.lowagie.text.html.simpleparser.StyleSheet"%>
<%@page import="com.lowagie.text.PageSize"%>
<%@page import="com.lowagie.text.HeaderFooter"%>
<%@page import="com.hms.pathology.dto.PathologySampleWiseMaster"%>
<%@page import="com.hms.pathology.service.Phlebotomyservice"%>
<%@page import="com.hms.dto.LabUnitType"%>
<%@page import="com.hms.dto.Assessment"%>
<%@page import="com.hms.model.AdminModel"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.pharmacy.upload.FilePath"%>
<%@page import="com.hms.ehat.service.LabProfileService"%>
<%@page import="com.hms.ehat.dto.LabProfileDTO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="com.lowagie.text.Chunk,com.lowagie.text.Document,com.lowagie.text.Element,com.lowagie.text.Font 
,com.lowagie.text.HeaderFooter,com.lowagie.text.Image,com.lowagie.text.Paragraph,com.lowagie.text.Phrase,com.lowagie.text.Rectangle
,com.lowagie.text.pdf.PdfPCell,com.lowagie.text.pdf.PdfPTable,com.lowagie.text.pdf.PdfWriter,com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport,
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants, com.hms.pharmacy.upload.FilePath"%>
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
		HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
		List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
		HospitalDetails hospObj = arrHospitalDetails.get(0);

		ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String lntUnit = (String) resource.getObject("lntUnit").toString();
		String sprofileId = (String) resource.getObject("semenprofileId").toString();
		int profileIdd=Integer.parseInt(sprofileId);  
		String sbunCreatRatioTestId = (String) resource.getObject("bunCreatRatioTestId").toString();
		int bunCreatRatioTestId=Integer.parseInt(sbunCreatRatioTestId); 
		String sagRatioTestId = (String) resource.getObject("agRatioTestId").toString();
		int agRatioTestId=Integer.parseInt(sagRatioTestId); 
		String sldlhdlTestRatioTestId = (String) resource.getObject("ldlhdlTestRatioTestId").toString();
		int ldlhdlTestRatioTestId=Integer.parseInt(sldlhdlTestRatioTestId); 
		String CovidReportProfileId = (String) resource.getObject("CovidReportProfileId").toString();

		Integer covidReportId=Integer.parseInt(CovidReportProfileId);
		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		
		Document document = new Document(PageSize.A4);
		//document.setMargins(20, 20, 20, 145);
		document.setMargins(20, 20, 20, 100);
		
		Font header = new Font(Font.HELVETICA, 11, Font.BOLD);
		Font headerUnderline = new Font(Font.HELVETICA, 11, Font.BOLD | Font.UNDERLINE);
		Font subheader = new Font(Font.HELVETICA, 9, Font.BOLD);
		Font footer = new Font(Font.HELVETICA, 9, Font.BOLD);
		header.setColor(10, 4, 2);
		Font tableheader22 = new Font(Font.HELVETICA, 21, Font.BOLD);
		Font tableheader11 = new Font(Font.HELVETICA, 13, Font.BOLD);
		Font tableheader111 = new Font(Font.HELVETICA, 13, Font.BOLD);
		Font tableheader12 = new Font(Font.COURIER, 13, Font.BOLD);
		Font tableheader13 = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font tableheader14 = new Font(Font.HELVETICA, 10,Font.BOLD | Font.UNDERLINE);
		Font tableheader = new Font(Font.HELVETICA, 13, Font.BOLD);
		Font tabletext = new Font(Font.HELVETICA, 9, Font.NORMAL);
		Font tabletext7 = new Font(Font.HELVETICA, 7, Font.NORMAL);
		Font tableheader15 = new Font(Font.HELVETICA, 10, Font.NORMAL);		
		Font small = new Font(Font.HELVETICA, 9, Font.NORMAL);
		//Font subheaderUNDERLINE = new Font(Font.HELVETICA, 9, Font.BOLD | Font.UNDERLINE);
		Font subheaderUNDERLINE = new Font(Font.HELVETICA, 9, Font.BOLD);
		
		Image img = null;
		PdfPCell cell = null;
		Image imgFQRcode=null;
		
		int treatmentId = Integer.parseInt(request.getParameter("treatmentId"));
		String idTreatment = request.getParameter("treatmentId");
		String callFrom = request.getParameter("callFrom");

		HttpSession session1 = request.getSession();
		String user_name = (String) session1.getAttribute("userName");
		Integer userId = (Integer) session1.getAttribute("userId");
		Integer unitId = (Integer) session1.getAttribute("uId");
		//System.out.println(unitId+"unitIdunitId");
		String masterIdd = request.getParameter("masterIdd");
		String patientType = request.getParameter("gender");
		String patientName = request.getParameter("patientName");
		String labName = (String) resource.getObject("labName").toString();
		request.setAttribute("headerFlag", "Yes");
		request.setAttribute("covide", "No");
		request.setAttribute("pageIteration", 0);
		//request.setAttribute("footerAddress", "Processed at: Lifenity Wellness Int Ltd., CSMIA, Terminal 2, Level P-9, East Zone, Andheri, Mumbai-400099");
		request.setAttribute("footerAddress", "");
				
		String ppName=patientName.replaceAll(",", ".");
		
		Phlebotomyservice phlebotomyservice = (ApplicationContextUtils.getApplicationContext()).getBean(Phlebotomyservice.class);
		List<PathologySampleWiseMaster> list = phlebotomyservice.getRoutinevalueResutlusingNewPrint(masterIdd, treatmentId, patientType, unitId, request);
		//RegService regservice = (ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
		//List<RegTreBillDto> robj=regservice.fetchPatientsRecordByTreatmentId(treatmentId);
	PathoTestResultService  pathoService = (ApplicationContextUtils.getApplicationContext()).getBean(PathoTestResultService.class);
		String pmobile="0";
		//if(robj.size() > 0){
		//	pmobile=robj.get(0).getMobile();
		//}
		int ageInYear=0;
		int ageInMonth=0;
		int ageDays=0;
		
		int patientAge=0;
		int patientAgeType=0;
		
		
		String profileName="";
		
		 if(list.size() > 0){
			profileName=list.get(list.size()-1).getProfileNamesPdf();
			pmobile=list.get(0).getMobile();
			ageInYear=list.get(0).getAgeInyear();
			ageInMonth=list.get(0).getAgeInMonth();
			ageDays=list.get(0).getAgeInDays();
		} 
		
		 if(ageInYear > 0){
			 patientAge=ageInYear;// year in age
			 patientAgeType=1;//year in age
			}else if(ageInYear ==0 && ageInMonth > 0 ){
				 patientAge=ageInMonth;// year in month
				 patientAgeType=2;
			}else if(ageInYear ==0 && ageInMonth == 0 &&  ageDays > 0 ){
				 patientAge=ageDays;// year in Days
				 patientAgeType=3;
			}
	int	 patientId=list.get(0).getPatientId();
		/* for(int pro = 0; pro < list.size(); pro++) {
			 System.out.println("profileName==="+list.get(pro).getProfileName());
		       
			profileName =profileName+"_"+ list.get(pro).getProfileName();
			
		} */
		
		SimpleDateFormat formDate = new SimpleDateFormat("dd-MM-yyyy");
	       String strDate = formDate.format(new Date());
	       System.out.println("strDate==="+strDate);
	       
	      // response.setHeader("Content-Disposition", "inline; filename="+ppName+".pdf");
		response.setHeader("Content-Disposition", "inline; filename="+pmobile+"_"+ppName+"_"+profileName+"_"+strDate+".pdf");
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
		//rtd = uss.fetchPatientsRecordByTreatmentId(treatmentId);
		//rtd = rtd.getListRegTreBillDto().get(0);
		//List<Assessment> listAssessment = treatmentModel.fetchAssessment(idTreatment);
		
		
		String barcodenumber=list.get(0).getBarCode();			
		String collecteddate=list.get(0).getCollecteddate();			
		if(collecteddate!=null ){
			collecteddate = list.get(0).getCollecteddate();				
		}else{
			collecteddate = "-";			
		}		
		String postdate=list.get(0).getPostdate();	
		if(postdate!=null ){
			postdate = list.get(0).getPostdate();			
		}else{
			postdate = "-";
		}
		
		Integer authoId=list.get(0).getAuthorizedBy();	
		Integer postId=list.get(0).getPostBy();	
		
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
		TempEventHandlerLISSiddhivinayakPDF event = new TempEventHandlerLISSiddhivinayakPDF();
		pdfWriter.setPageEvent(event);

		String reportFooterAddress = "";//hospObj.getReportFooterAddress();
		if(reportFooterAddress.equalsIgnoreCase(null) || reportFooterAddress.equalsIgnoreCase("") || reportFooterAddress == null)
			{
			reportFooterAddress="";			
			}
		//System.out.println(collecteddate+postdate);
		// adding footer information//
		/* Font smallNew = new Font(Font.HELVETICA, 10, Font.BOLD);
		smallNew.setSize(8);
		String hospitaladdress1="Lifenity International Clinical Laboratory L.L.C Elite Business Centre, Level 01, 104-05, Al Barsha, P.O. Box 502180, Dubai, UAE T: +971 045479027, +971 045479033 | E: dubaicustomercare@lifenity.ae | www.lifenity.ae";
		HeaderFooter footerNew = new HeaderFooter(new Phrase(hospitaladdress1, smallNew), true);
		footerNew.setPageNumber(1);
		footerNew.setAlignment(Element.ALIGN_CENTER);
		footerNew.setBorderWidthBottom(0);
		document.setFooter(footerNew); */
		// ending footer information//	
		
		
		
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
			System.err.println("size..."+list.size());
			for (int pro = 0; pro < list.size(); pro++) {	
				request.setAttribute("pageIteration", pro);
			int[] HeaderWidth1 = { 0, 100,0 };
			Headertable1.setWidths(HeaderWidth1);
			Headertable1.setWidthPercentage(95f);
			Headertable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);   
			proname = list.get(pro).getProfileName();
			String Profile = proname;
			System.err.println("Profile..."+Profile);
			int profileId=list.get(pro).getProfileId();
			String testHeadFlag1=list.get(pro).getTestHeaderFlag();
			 
			/* if(list.size() > 1){
		//document.newPage();
			}else{} */
			
			 if(pro > 0){
			 document.newPage();
			} 
			
			
			PathologySampleWiseMaster obj1=list.get(pro);
			String template=obj1.getTemplateWise();
			
			boolean istemplate=template.startsWith("H");
			
			if(istemplate == true){
			 PdfPTable HeaderTable11 = new PdfPTable(1);
		        int[] headerwidth11 = {100};
		        HeaderTable11.setWidths(headerwidth11);
		        HeaderTable11.setWidthPercentage(95f);
		        HeaderTable11.getDefaultCell().setBorder(Rectangle.BOTTOM);
					
				PdfPTable HeaderTable121 = new PdfPTable(4);
		        int[] headerwidth121 = {10,25,10,20};
		        HeaderTable121.setWidths(headerwidth121);
		        HeaderTable121.setWidthPercentage(95f);
		        HeaderTable121.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			   
		        HeaderTable121.addCell(new Phrase("Profile Name:-", subheader));
		        HeaderTable121.addCell(new Phrase( list.get(pro).getPathologySampleWiseSlave().get(0).getProfileName(),subheader));
		      //  HeaderTable121.addCell(new Phrase("Template Name:-", subheader));
		        //HeaderTable121.addCell(new Phrase(list.get(0).getPathologySampleWiseSlave().get(0).getTemplateName(), subheader));
		          HeaderTable121.addCell(new Phrase("", subheader));
		          HeaderTable121.addCell(new Phrase("", subheader));
		        
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
		        
		        	ristempData = list.get(pro).getPathologySampleWiseSlave().get(0).getTemplateData();
		        	
		       
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
		    	
		     	
	  	    	
	  	  	// ====================================================================================
				// code added by Dayanand for the Interpretation
				// ====================================================================================
				 HeaderTable121.addCell(new Phrase("", subheader));
	  	       HeaderTable121.addCell(new Phrase("", subheader));
	  	     HeaderTable121.addCell(new Phrase("", subheader));
		       HeaderTable121.addCell(new Phrase("", subheader));
		       document.add(HeaderTable121);
		  	    	HeaderTable121.flushContent();
				PdfPTable Headertable11 = new PdfPTable(1);
				int[] HeaderWidth11 = { 100 };
				Headertable11.setWidths(HeaderWidth11);
				Headertable11.setWidthPercentage(95f);
				Headertable11.getDefaultCell().setBorder(Rectangle.NO_BORDER);			
				
				            	
	            PdfPTable HeaderTable321 = new PdfPTable(1);
	            int[] headerwidth321 = {100};
	            HeaderTable321.setWidths(headerwidth321);
	            HeaderTable321.setWidthPercentage(95f);
	            HeaderTable321.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	            
	            StyleSheet styleSheet1 = new StyleSheet();
	            styleSheet1.loadTagStyle("body", "size", "10px");
	            styleSheet1.loadTagStyle("p", "size", " 10px");
	            HTMLWorker htmlWorker1 = new HTMLWorker(document);
	            htmlWorker1.setMargins(50, 100, 100, 150);
	            Paragraph paragraph1 = new Paragraph();
	            
	            PdfPTable HeaderTable311 = new PdfPTable(1);
	            int[] headerwidth301 = {100};
	            HeaderTable311.setWidths(headerwidth301);
	            HeaderTable311.setWidthPercentage(95f);
	            HeaderTable311.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	            htmlWorker.setMargins(50, 100, 100, 150);
	            
			 	if (list.get(pro).getInterpretationCheck().equals("Y")) {
		            
					String interpretationData = list.get(pro).getInterpretation();
					//java.util.List<Element> parseHtmlToList= HTMLWorker.parseToList(new StringReader(interpretationData), styleSheet);

			 		Phrase p = new Phrase("Interpretation - ", tableheader15);
					PdfPCell celll = new PdfPCell(p);
					celll.setHorizontalAlignment(Element.ALIGN_LEFT);
					celll.setBorder(Rectangle.NO_BORDER);
					HeaderTable311.addCell(celll);
					 document.add(HeaderTable311);
                     HeaderTable311.flushContent();
					
	               /*  for(Element e:parseHtmlToList){
	                    if (e instanceof PdfPTable){
	                        PdfPTable htmlTable = new PdfPTable(1);
	                        int[] htmlTableWidth = {50};
	                        htmlTable.setWidths(htmlTableWidth);
	                        htmlTable.setWidths(htmlTableWidth);
	                        htmlTable.setWidthPercentage(50f);
	                        htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	                        htmlTable = (PdfPTable)e;
	                        HeaderTable31.addCell(htmlTable);
	                        document.add(HeaderTable311);
	                        HeaderTable311.flushContent();
	                    }else{
	                    	paragraph1.add(e);
	                        cell = new PdfPCell(paragraph1);
	                        cell.setBorder(Rectangle.NO_BORDER);
	                        HeaderTable311.addCell(cell);
	                        document.add(HeaderTable311);
	                        HeaderTable311.flushContent();
	                        paragraph1.clear();
	                    }
	                } */
	               
	               
			        java.util.List<Element> ie11 = HTMLWorker.parseToList(new StringReader(interpretationData), styleSheet);
				       if(interpretationData.equalsIgnoreCase("") || interpretationData.equalsIgnoreCase("NULL")){
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
				    	   java.util.List<Element> ie3 = HTMLWorker.parseToList(new StringReader(interpretationData), styleSheet);
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
		      // end interpretation
			 	  PdfPTable HeaderTableEquip = new PdfPTable(2);
			        int[] headerwidthEquip = {15,120};
			        HeaderTableEquip.setWidths(headerwidthEquip);
			        HeaderTableEquip.setWidthPercentage(95f);
			        HeaderTableEquip.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				       HeaderTableEquip.addCell(new Phrase("", tabletext));
				       HeaderTableEquip.addCell(new Phrase("", subheader));
				       HeaderTableEquip.addCell(new Phrase("", subheader));
				       HeaderTableEquip.addCell(new Phrase("", subheader));
			       
			        HeaderTableEquip.addCell(new Phrase("Equipment:-", subheader));
			       System.out.println("machineId===="+list.get(pro).getMachineId());
			       HeaderTableEquip.addCell(new Phrase("   "+list.get(pro).getMachineName(), tabletext));
			     
		  	    	if(list.get(pro).getMachineId() > 0){
		  	    		 document.add(HeaderTableEquip);
		  	    		HeaderTableEquip.flushContent();
		  	    	}
		  	    
				//report data end		
			
			
			
			
			 PdfPTable HeaderTableTechN = new PdfPTable(1);
				int[] headerwidth51 = {100};
				HeaderTableTechN.setWidths(headerwidth51);
				HeaderTableTechN.setWidthPercentage(95f);
			    HeaderTableTechN.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			   //	HeaderTableTechN.addCell(new Phrase("",subheader));
			   	HeaderTableTechN.addCell(new Phrase("",subheader));
			
				PdfPCell cells26 = new PdfPCell(new Phrase("--End Of Report--", subheader));
				cells26.setHorizontalAlignment(Element.ALIGN_CENTER);
				cells26.setBorder(Rectangle.NO_BORDER);
				HeaderTableTechN.addCell(cells26);
			   	//HeaderTableTechN.addCell(new Phrase("--End Of Report--", subheader));			 
				if(profileIdd != profileId){
					  document.add(HeaderTableTechN);
					   	HeaderTableTechN.flushContent();
				  }
				  	
			}else{
				//testdatt
			
				if(list.size() > 0){

 				   
					   Headertable1.addCell(new Phrase("", tabletext));	
					   PdfPCell cells26 = new PdfPCell(new Phrase(Profile, headerUnderline));
					   cells26.setHorizontalAlignment(Element.ALIGN_CENTER);
					   cells26.setBorder(Rectangle.NO_BORDER);
					   Headertable1.addCell(cells26);
					   Headertable1.addCell(new Phrase("", tabletext));
					   
					   			
					 }	
				
				
				LabProfileService labservice = (ApplicationContextUtils.getApplicationContext()).getBean(LabProfileService.class);
			    // LabProfileDTO	 labProfileObj = labservice.getProfileById( list.get(pro).getProfileId());
			     //List<LabProfileTestCompDTO> labProfileTestCompDTO = labProfileObj.getLabProfileTestCompDTO();
			 	String testHeadFlag=list.get(pro).getTestHeaderFlag();
			 	String testTreadAnalysisFlag=list.get(pro).getTreadanalysisFlag();
			 	 Phlebotomyservice  phleboService = (ApplicationContextUtils.getApplicationContext()).getBean(Phlebotomyservice.class);
			List<PathologySampleWiseMaster> 	labProfileTestCompDTO=phleboService.getTestComponentListByProfileId(list.get(pro).getProfileId());
			 	
			 	
			 /* 	Comparator<LabProfileTestCompDTO> cCom=new Comparator<LabProfileTestCompDTO>() {

					@Override
					public int compare(LabProfileTestCompDTO o1, LabProfileTestCompDTO o2) {
						
						return o1.getSequence()-o2.getSequence();
					}
				}; */
				
				 //   Collections.sort(labProfileTestCompDTO, cCom);
				    
				   /*  for (LabProfileTestCompDTO labCompObj : labProfileTestCompDTO) {
			             LabTestDTO labTestObj = labCompObj.getLabTestDTO();
			             if(labTestObj !=null){
			             if(labTestObj.getNormalValueType().equalsIgnoreCase("individual")){
			            	 testHeadFlag="I";
			            	 break;
			             }
			             }
			             
				    } */
				    
				  /*   for (LabProfileTestCompDTO labCompObj : labProfileTestCompDTO) {
			             LabTestDTO labTestObj = labCompObj.getLabTestDTO();
			             if(labTestObj !=null){
			             if(labTestObj.getTrendanalysisId().equalsIgnoreCase("Y")){
			            	 testTreadAnalysisFlag="Y";
			            	 break;
			             }
			             }
			             
				    }
				   */
				
						     //System.out.println(collecteddate+postdate);
						     // start coloumn 
						     // added by dayanand for hide coloumn for general test
						     int countColoumn=0;
						    		 if(list.get(pro).getTestHeaderFlag().equalsIgnoreCase("I"))
						    			 countColoumn=1;
						 /*  if(list.get(pro).getTestli().size() > 0){
							   for(int i=0; i < list.get(pro).getTestli().size();i++){
								   String testType=list.get(pro).getTestli().get(i).getTestType();
								   System.out.println("testType===="+testType);
								   if(list.get(pro).getTestli().get(i).getTestId() > 0){
									   if(testType.equalsIgnoreCase("individual")){
										   countColoumn=1;
										   break;
									   }
								   }
								  
							   }
						  }    */
						 // end coloumn    
						document.add(Headertable1);
						Headertable1.flushContent();
						
						   //if(testTreadAnalysisFlag.equalsIgnoreCase("Y"))
							//   lengthTrend=1;
						/* for (int i = 0; i < list.get(pro).getTestli().size(); i++) {
							if(list.get(pro).getTestli().get(i).getTestId() > 0){
							if(list.get(pro).getTestli().get(i).getTrendanalysisFlag().equalsIgnoreCase("Y")){
								lengthTrend++;
							
							}
							}
						} */
						int lengthTrend=0;
						 if(list.get(pro).getTreadanalysisFlag().equalsIgnoreCase("Y"))
							 lengthTrend=list.get(pro).getTreadAnalysisFlagCount();
						if(lengthTrend > 0){
							PdfPTable HeaderTableSpace = new PdfPTable(1);
				       		int[] headerwidthSpace = {40 };
				       		HeaderTableSpace.setWidths(headerwidthSpace);
				       		HeaderTableSpace.setWidthPercentage(95f);
				       		HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				       		HeaderTableSpace.setSpacingAfter(8.0f);
				       		
				       		HeaderTableSpace.addCell(new Phrase("", tabletext));
				  			document.add(HeaderTableSpace);
				  			HeaderTableSpace.flushContent();
						}
						
						PdfPTable HeadertableGeneral = new PdfPTable(2);
						int[] HeaderWidthGeneral = { 50, 70 };
						HeadertableGeneral.setWidths(HeaderWidthGeneral);
						HeadertableGeneral.setWidthPercentage(95f);
						HeadertableGeneral.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						HeadertableGeneral.addCell(new Phrase("", tabletext));
						HeadertableGeneral.addCell(new Phrase("", tabletext));
						PdfPCell cellsGTest = new PdfPCell(new Phrase("Test Name", tableheader14));
						cellsGTest.setHorizontalAlignment(Element.ALIGN_LEFT);
						cellsGTest.setBorder(Rectangle.NO_BORDER);
						HeadertableGeneral.addCell(cellsGTest);
						
						PdfPCell cellsGTestResult = new PdfPCell(new Phrase("Test Result", tableheader14));
						cellsGTestResult.setHorizontalAlignment(Element.ALIGN_LEFT);
						cellsGTestResult.setBorder(Rectangle.NO_BORDER);
						HeadertableGeneral.addCell(cellsGTestResult);
						 HeadertableGeneral.addCell(new Phrase("", tabletext));
				    	 HeadertableGeneral.addCell(new Phrase("", tabletext));
						
						PdfPTable HeadertableNote = new PdfPTable(2);
						int[] HeaderWidthNote = { 5, 30 };
						HeadertableNote.setWidths(HeaderWidthNote);
						HeadertableNote.setWidthPercentage(95f);
						HeadertableNote.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						
						PdfPTable HeadertableNoteM = new PdfPTable(3);
						int[] HeaderWidthNoteM = { 2,10,10 };
						HeadertableNoteM.setWidths(HeaderWidthNoteM);
						HeadertableNoteM.setWidthPercentage(95f);
						HeadertableNoteM.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						
						PdfPTable Headertable = new PdfPTable(5);
						//int[] HeaderWidth = { 0, 38, 50, 30, 25 };
						int[] HeaderWidth = { 0, 60, 25, 30, 20 };
						Headertable.setWidths(HeaderWidth);
						Headertable.setWidthPercentage(95f);
						Headertable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						
						Headertable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));

						/* Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("Test Done", tableheader13));
						Headertable.addCell(new Phrase("Test Result", tableheader13));
						Headertable.addCell(new Phrase("Units", tableheader13));
						Headertable.addCell(new Phrase("Biological Reference Interval", tableheader13)); */
						
						Headertable.addCell(new Phrase("", tabletext));
						//PdfPCell cells24 = new PdfPCell(new Phrase("Investigation", tableheader14));
						PdfPCell cells24 = new PdfPCell(new Phrase("Test Name", tableheader14));
						cells24.setHorizontalAlignment(Element.ALIGN_LEFT);
						cells24.setBorder(Rectangle.NO_BORDER);
						Headertable.addCell(cells24);
						
						PdfPCell cells27 = new PdfPCell(new Phrase("Test Result", tableheader14));
						cells27.setHorizontalAlignment(Element.ALIGN_LEFT);
						cells27.setBorder(Rectangle.NO_BORDER);
						Headertable.addCell(cells27);
						
						//PdfPCell cells29 = new PdfPCell(new Phrase("Biological Reference Interval", tableheader14));
						PdfPCell cells29 = new PdfPCell(new Phrase("Normal Values", tableheader14));
						cells29.setHorizontalAlignment(Element.ALIGN_LEFT);
						cells29.setBorder(Rectangle.NO_BORDER);
					

						
						PdfPCell cells28 = new PdfPCell(new Phrase("Unit", tableheader14));
						cells28.setHorizontalAlignment(Element.ALIGN_LEFT);
						cells28.setBorder(Rectangle.NO_BORDER);
						
						if(countColoumn > 0){
							Headertable.addCell(cells29);
							Headertable.addCell(cells28);
						}else{
							Headertable.addCell("");
							Headertable.addCell("");
						}
						
						
												
						Headertable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						
						Headertable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						
						List testidcheck = new ArrayList();
						// start code for trend graph
						
						System.out.println("size===="+labProfileTestCompDTO.size());				
						int chartCount = 1;
						// start code for trend graph
						if(list.get(pro).getTreadanalysisFlag().equalsIgnoreCase("Y")){
							PdfPTable trendTable1 = new PdfPTable(2);
					    	int[] tendWidth1 = { 20,20};
					    	trendTable1.setWidths(tendWidth1);
					    	trendTable1.setWidthPercentage(95f);
					    	trendTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						 for (PathologySampleWiseMaster labCompObj : labProfileTestCompDTO) {
							
								if( labCompObj.getTestIdd().intValue() > 0){
									
									if(labCompObj.getTreadanalysisFlag().equalsIgnoreCase("Y")){
										PathologySampleWiseMaster ptobj	=phleboService.getTrendAnaylsisDetailsForPrint(list.get(pro).getPatientId(), treatmentId, labCompObj.getTestIdd().intValue() );
										String unitTread=labCompObj.getUnitname();
										DefaultCategoryDataset mychartData=new DefaultCategoryDataset();
										
										for(int p=0; p < ptobj.getTreandAnalysisGraphList().size(); p++ ){
											 
									 		
									 				String trandResult=(String)ptobj.getTreandAnalysisGraphList().get(p);
									 			String trandDate=(String)ptobj.getTreandAnalysissGraphDateList().get(p);
									 			String sresult=trandResult.replaceAll("[^a-zA-Z0-9,.]", "");
									 			System.out.println("trandResult====="+sresult);
									 			SimpleDateFormat month_date = new SimpleDateFormat("dd-MMM-yy", Locale.ENGLISH);
									 		    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

									 		    Date date = sdf.parse(trandDate);

									 		    String month_name = month_date.format(date);
										   		//mychartData.setValue(Float.parseFloat(trandResult),"Result Value",trandDate);
									 			mychartData.setValue(Float.parseFloat(sresult),"",month_name);
										   		
									 		}
									 		
										JFreeChart my2DChart=ChartFactory.createLineChart(labCompObj.getTestName(), "Visit Date","value ("+unitTread+")",mychartData,PlotOrientation.VERTICAL,false,false,true);

								        int widthTrend = 470;
								    	//int heightTrend = 320;
								    	int heightTrend = 280;
								    	
								    	PdfContentByte Add_Chart_Content = pdfWriter.getDirectContent();
								    	PdfTemplate template_Chart_Holder = Add_Chart_Content.createTemplate(widthTrend, heightTrend);
								    	Graphics2D Graphics_Chart = template_Chart_Holder.createGraphics(widthTrend, heightTrend);
								    	//Rectangle2D Chart_Region = new Rectangle2D.Double(0,0,400,300);
								    	Rectangle2D Chart_Region = new Rectangle2D.Double(0,0,480,250);
								    	Graphics_Chart.setBackground(Color.WHITE);
								    	
								    	java.awt.Font font4 = new java.awt.Font("FreeMono", java.awt.Font.BOLD, 14);
								    	TextTitle title = my2DChart.getTitle();
								    	title.setFont(font4);
								    	
								    	CategoryPlot plot = my2DChart.getCategoryPlot();
								    	CategoryAxis axis = plot.getDomainAxis();
								    	java.awt.Font font5 = new java.awt.Font("FreeMono", java.awt.Font.BOLD, 11);
								    	plot.getDomainAxis().setLabelFont(font5);
								    	axis.setTickLabelFont(font5);						    	
								    	//axis.setCategoryLabelPositions(CategoryLabelPositions.UP_45);
								    	plot.setRangeGridlinePaint(Color.black);
								    	LineAndShapeRenderer render = (LineAndShapeRenderer) plot.getRenderer();
								    	render.setShapesVisible(true);
								    	render.setSeriesPaint(0, Color.blue);
								    	plot.getRangeAxis().setUpperMargin(0.2);
								    	DecimalFormat decimalformat1 = new DecimalFormat("##.##");
								    	render.setItemLabelGenerator(new StandardCategoryItemLabelGenerator("{2}", decimalformat1));
								    	render.setItemLabelsVisible(true);
								    	render.setSeriesVisible(true);
							    	//render.setStroke( JFreeChartEngine.getLineStyleStroke( chartDefinition.getLineStyle(), chartDefinition.getLineWidth() ) )
							    	//render.setBaseToolTipGenerator( new StandardCategoryToolTipGenerator() );	
							    	my2DChart.getPlot().setBackgroundPaint(Color.WHITE);
							    	my2DChart.draw(Graphics_Chart, Chart_Region);
							    	Graphics_Chart.dispose();
							    	// Add_Chart_Content.addTemplate(template_Chart_Holder,30,0);
							    	System.out.println("lengthTrend==="+lengthTrend +"chartCount ==="+chartCount);
							    	if(chartCount% 2 !=0  ){
								    	PdfPCell cellTrend = null;
								    	
								    	Image imgTrendChart = Image.getInstance(template_Chart_Holder);
								    	imgTrendChart.scaleAbsolute(230, 140);
								    	cellTrend = new PdfPCell();
								    	cellTrend.addElement(new Chunk(imgTrendChart, 5, -5));
								    	cellTrend.setBorder(Rectangle.NO_BORDER);
								    	  if(lengthTrend ==chartCount ){
										    		trendTable1.addCell(cellTrend);
										    		trendTable1.addCell(new Phrase("", tabletext));
								    	  }else {
								    		  if(cellTrend != null)
										    		trendTable1.addCell(cellTrend);
										    	else
										    		trendTable1.addCell(new Phrase("", tabletext)); 
								    	  }
								    	
								    	chartCount++;
								    	continue;
							    	}else{
							    		PdfPCell cellTrend = null;
								    	
								    	Image imgTrendChart = Image.getInstance(template_Chart_Holder);
								    	imgTrendChart.scaleAbsolute(230, 140);
								    	cellTrend = new PdfPCell();
								    	cellTrend.addElement(new Chunk(imgTrendChart, 5, -5));
								    	cellTrend.setBorder(Rectangle.NO_BORDER);
								    	if(cellTrend != null)
								    		trendTable1.addCell(cellTrend);
								    	else
								    		trendTable1.addCell(new Phrase("", tabletext));
								    	chartCount++;
								    	
							    	}
										 
									
									}
									
								}
									
								
								
						    	
						 }
						 document.add(trendTable1);
					    	trendTable1.flushContent();
						}		
						// end code for trend  graph	
						
						 PdfPTable HeaderTableSpace = new PdfPTable(1);
		            int[] headerwidthSpace = {40 };
		                HeaderTableSpace.setWidths(headerwidthSpace);
		                      HeaderTableSpace.setWidthPercentage(95f);
		                     HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		                    HeaderTableSpace.setSpacingAfter(0.0f);
		                    
						  for (PathologySampleWiseMaster labCompObj : labProfileTestCompDTO) {
				          //   LabTestDTO labTestObj = labCompObj.getLabTestDTO();
				            
				              
				             if( labCompObj.getTestIdd().intValue() == 0){
				            	  String headName = labCompObj.getHeadingname();
							         Headertable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							         Headertable.addCell(new Phrase("", tableheader13));
							 		 Headertable.addCell(new Phrase(""+headName, tableheader13));
							 		// Headertable.addCell(new Phrase("", tabletext));
							 		 Headertable.addCell(new Phrase("", tabletext));
							 		 Headertable.addCell(new Phrase("", tabletext));
							 		 Headertable.addCell(new Phrase("", tabletext));
							 		
									if(testHeadFlag.equalsIgnoreCase("G")){
										HeadertableGeneral.addCell(new Phrase(""+headName, tableheader13));
										HeadertableGeneral.addCell(new Phrase("", tabletext));
										document.add(HeadertableGeneral);
										HeadertableGeneral.flushContent();
									}else{
										Headertable3.addCell(new Phrase("", tabletext));
										Headertable3.addCell(new Phrase("", tabletext));
										Headertable3.addCell(new Phrase("", tabletext));
										document.add(Headertable);
										Headertable.flushContent();
										document.add(Headertable3);
										Headertable3.flushContent();
									}
						         
				             } else{
				            	 
				            	/*  LabTestMethodDTO labMethodObj = labTestObj.getLabTestMethod();
									LabUnitTypeDTO labUnitObj = labTestObj.getLabUnit();
									LabTestSampleDTO labSampleObj = labTestObj.getLabTestSample();
									
									List<LabTestNormalValuesDTO> labNormalvalueTest = labTestObj.getLabTestNormalValues()
											.stream().filter(x -> x.getMachineFlag().equalsIgnoreCase("Y")
													&& x.getDeleted().equalsIgnoreCase("N"))
											.collect(Collectors.toList()); */
				            	 
				            	
								
				            	 
				            	
								//	PathologySampleWiseMaster labNObj =phleboService.getLabNormalValuesForPrint(patientType, patientAgeType, patientAge,labCompObj.getTestIdd().intValue());
											PathologySampleWiseMaster labNObj =phleboService.getLabNormalValuesForPrintInDays(patientType, patientAgeType, patientId,labCompObj.getTestIdd().intValue());
											//PathologySampleWiseSlave pslaveObj= phleboService.getPathologySamplewiseSlaveDetailsForPrint(labCompObj.getTestIdd().intValue(), profileId, treatmentId);
									PathologySampleWiseSlave pslaveObj= pathoService.getPathologySamplewiseSlaveDetailsForPrint(labCompObj.getTestIdd().intValue(), profileId, treatmentId,list.get(pro).getSampleWiseMasterId());

									
									
									if(labCompObj.getTestType().equalsIgnoreCase("individual")){
										String LowValues=labNObj.getLowvalue();
										
										if(LowValues == null || LowValues == "null")
											continue;
									}
									
									
									if(pslaveObj == null){
										continue;
									}
									
									String LowValues = "";
									String HighValues = "";
									String Units="";
									String unitNameGenaral="";
									String NormalValues ="";
									
									if(labCompObj.getTestType().equalsIgnoreCase("individual")){
				            		 LowValues = labNObj.getLowvalue();
									 HighValues = labNObj.getHighvalue();
									 
									 Units= labNObj.getUnitname();
									 if(Units!=null){
									     
											 Units = labNObj.getUnitname();
										}else{
									Units = "-";
										}

										 unitNameGenaral=labNObj.getUnitname();
										 
										 if(HighValues!=null){
												
												NormalValues = LowValues + "  -  " + HighValues;
											}else{
										NormalValues = LowValues;
											}
											
										
									}
									String methodname = labNObj.getMethodename();
									String microraganism =labNObj.getExpression()+" "+labNObj.getDefaultvalue();	
									String testinterpretation=labNObj.getTestInterpretation();
									String biologicalReferenceWithGeneral=labNObj.getBiologicalReferenceWithGeneral();
									String biologicalReferenceWithNormal=labNObj.getBiologicalReferenceWithNormal();
									//String microflag=labTestObj.getMicroorganism();
									String microflag=labCompObj.getMicroorganism();
									//String sampletype=labSampleObj.getSampleName();
									String sampletype=labCompObj.getSamplename();
									String flagmarkResult=pslaveObj.getFlagMark();
									String microReason=pslaveObj.getExpression();
									//String quantitative=labTestObj.getQuantitative();
									String quantitative=labCompObj.getQuantitative();
									//String valueType=labTestObj.getNormalValueType();
									String valueType=labCompObj.getTestType();
									
									//String TestName = labTestObj.getTestName();
									String TestName = labCompObj.getTestName();
									String TestResult =pslaveObj.getTestResult();
									String testcomments=pslaveObj.getTestReason();		
									//String Units = labUnitObj.getUnitName();
									//String Units = labCompObj.getUnitname();
									
									
									//String biologicalReferenceChk=labTestObj.getBiologicalReferenceChk();		
									String biologicalReferenceChk=labCompObj.getBiologicalReferenceChk();
									//String sampleTypeChk=labTestObj.getSampleTypeChk();
									String sampleTypeChk=labCompObj.getSampleTypeChk();
									//String testMethodChk=labTestObj.getTestMethodChk();
									String testMethodChk=labCompObj.getTestMethodChk();
									
									
				            	 
									
									
									
									
									
									
									if (flagmarkResult == null || flagmarkResult.equalsIgnoreCase("null")|| flagmarkResult.equalsIgnoreCase("") || flagmarkResult.equalsIgnoreCase("-")) {
										flagmarkResult="";
									}	
									
									if (TestResult == null || TestResult.equalsIgnoreCase("null")|| TestResult.equalsIgnoreCase("") || TestResult.equalsIgnoreCase("-")) {
										TestResult="";
									}
								
									
									if (testcomments == null || testcomments.equalsIgnoreCase("null")|| testcomments.equalsIgnoreCase("") || testcomments.equalsIgnoreCase("-")) {
										testcomments="";
									}
									
									
									System.out.println("unitNameGenaral====="+unitNameGenaral);
									if (unitNameGenaral == null || unitNameGenaral.equalsIgnoreCase("null")|| unitNameGenaral.equalsIgnoreCase("") || unitNameGenaral.equalsIgnoreCase("-")) {
										 unitNameGenaral="";
									}
	                                
									
									
									
									System.out.println("biologicalReferenceWithGeneral====="+biologicalReferenceWithGeneral);
									if (biologicalReferenceWithGeneral == null || biologicalReferenceWithGeneral.equalsIgnoreCase("null")|| biologicalReferenceWithGeneral.equalsIgnoreCase("") || biologicalReferenceWithGeneral.equalsIgnoreCase("-")) {
										biologicalReferenceWithGeneral="";
									}
									System.out.println("NormalValues====="+NormalValues);
									if (NormalValues == null || NormalValues.equalsIgnoreCase("null")|| NormalValues.equalsIgnoreCase("") || NormalValues.equalsIgnoreCase("-")) {
										NormalValues="";
									}
									
									
									
									//String testNote=labTestObj.getTestNote();
									String testNote=labCompObj.getTestNote();
									if (testNote == null || testNote.equalsIgnoreCase("null")|| testNote.equalsIgnoreCase("") || testNote.equalsIgnoreCase("-")) {
										testNote="";
									}
									System.out.println("testNote====="+testNote);
									
									if(!(TestResult.equalsIgnoreCase("0") || TestResult.equalsIgnoreCase("0.0") || TestResult.equalsIgnoreCase("0.00"))){
										
															
									Headertable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
									Headertable.addCell(new Phrase("", tabletext));
				
									if (TestName != null) {
										    if(testHeadFlag.equalsIgnoreCase("G")){
										    	
										    	 HeadertableGeneral.addCell(new Phrase("", tabletext));
										    	 HeadertableGeneral.addCell(new Phrase("", tabletext));
										    	HeadertableGeneral.addCell(new Phrase("" + TestName, subheader));
										    }else{
										    	
										    	 // Headertable.addCell(new Phrase(""+TestName, subheader)); 
										    	  Phrase p = new Phrase();
													p.add(new Chunk("" + TestName, subheader));
													
													if(labCompObj.getTestIdd().intValue() > 0 ){
														if(sampleTypeChk.equalsIgnoreCase("Y")){
															p.add(new Chunk("\n\n Sample Type :" + sampletype, tabletext7));
														}
												       }
													
													if(testMethodChk.equalsIgnoreCase("Y")){
														if (methodname == null || methodname.equalsIgnoreCase("null") || methodname.equalsIgnoreCase("")|| methodname.equalsIgnoreCase("-")) {				    	
															
															}else{
																p.add(new Chunk("\n\n Method : " + methodname, tabletext7));
															}
													}
													
													if(labCompObj.getTestIdd().intValue() > 0 ){
														
														
														if (testNote == null || testNote.equalsIgnoreCase("null") || testNote.equalsIgnoreCase("")|| testNote.equalsIgnoreCase("-")) {				    	
														
														}else{
															p.add(new Chunk("\n\n  Note : " + testNote, tabletext7));
														}
													}
													
													if(labCompObj.getTestIdd().intValue() > 0 ){
														
														
														if (testcomments == null || testcomments.equalsIgnoreCase("null") || testcomments.equalsIgnoreCase("")|| testcomments.equalsIgnoreCase("-")) {				    	
														
														}else{
															p.add(new Chunk("\n\n Comments : " + testcomments, tabletext7));
														}
													}
													
													
													PdfPCell testNameCell = new PdfPCell(p);
													testNameCell.setBorder(Rectangle.NO_BORDER);
													Headertable.addCell(testNameCell); 
										    }
										
									
									} else {
										  if(testHeadFlag.equalsIgnoreCase("G")){
											  HeadertableGeneral.addCell(new Phrase("-", tabletext));
										  }else{
											  
											  Headertable.addCell(new Phrase("-", tabletext)); 
										  }
										
										
									}
									
									
									
									if (TestResult == null || TestResult.equalsIgnoreCase("null")|| TestResult.equalsIgnoreCase("") || TestResult.equalsIgnoreCase("-")) {
										   
										//Headertable.addCell(new Phrase("-", tabletext));
										PdfPCell cells26 = new PdfPCell(new Phrase("-", tabletext));
										cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
										cells26.setBorder(Rectangle.NO_BORDER);
										Headertable.addCell(cells26);
										HeadertableGeneral.addCell(cells26);
									}else if(HighValues==null || HighValues.equalsIgnoreCase("") || LowValues==null || LowValues.equalsIgnoreCase("") ){
										
										//Headertable.addCell(new Phrase("" + TestResult, tabletext));
										if(flagmarkResult.equalsIgnoreCase("L")){
											PdfPCell cells26 = new PdfPCell(new Phrase(""+TestResult+"  " +"L", subheaderUNDERLINE));
											cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
											cells26.setBorder(Rectangle.NO_BORDER);
											Headertable.addCell(cells26);
											HeadertableGeneral.addCell(cells26);
										}else if(flagmarkResult.equalsIgnoreCase("H")){
											PdfPCell cells26 = new PdfPCell(new Phrase(""+TestResult+"  " +"H", subheaderUNDERLINE));
											cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
											cells26.setBorder(Rectangle.NO_BORDER);
											Headertable.addCell(cells26);
											HeadertableGeneral.addCell(cells26);
										}else if(flagmarkResult.equalsIgnoreCase("Abnormal")){
											  PdfPCell cells26 = new PdfPCell(new Phrase(TestResult, subheaderUNDERLINE)); // Here * removed by vinod
												cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
												cells26.setBorder(Rectangle.NO_BORDER);
												Headertable.addCell(cells26);
												HeadertableGeneral.addCell(cells26);
										  }
										else{
											PdfPCell cells26 = new PdfPCell(new Phrase(""+TestResult, tabletext));
											cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
											cells26.setBorder(Rectangle.NO_BORDER);
											Headertable.addCell(cells26);
											HeadertableGeneral.addCell(cells26);
										}
										
										
									}else {
										
										String string = TestResult;
										//
										        boolean numeric = true;
				
										    try {
										            Double num = Double.parseDouble(string);
										          } catch (NumberFormatException e) {
										            numeric = false;
										        }
				
										     if(numeric){
										        	if (Double.parseDouble(TestResult) < Double.parseDouble(LowValues)|| Double.parseDouble(TestResult) > Double.parseDouble(HighValues)) {
										  
															  if(flagmarkResult.equalsIgnoreCase("L")){
																  PdfPCell cells26 = new PdfPCell(new Phrase(TestResult+" " +"L", subheaderUNDERLINE)); // Here * removed by vinod
																	cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
																	cells26.setBorder(Rectangle.NO_BORDER);
																	Headertable.addCell(cells26);
																	HeadertableGeneral.addCell(cells26);
															  }else if(flagmarkResult.equalsIgnoreCase("H")){
																  PdfPCell cells26 = new PdfPCell(new Phrase(TestResult+" " +"H", subheaderUNDERLINE)); // Here * removed by vinod
																	cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
																	cells26.setBorder(Rectangle.NO_BORDER);
																	Headertable.addCell(cells26);
																	HeadertableGeneral.addCell(cells26);
															  }else if(flagmarkResult.equalsIgnoreCase("Abnormal")){
																  PdfPCell cells26 = new PdfPCell(new Phrase(TestResult, subheaderUNDERLINE)); // Here * removed by vinod
																	cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
																	cells26.setBorder(Rectangle.NO_BORDER);
																	Headertable.addCell(cells26);
																	HeadertableGeneral.addCell(cells26);
															  }
															  else {
																  PdfPCell cells26 = new PdfPCell(new Phrase(TestResult, tableheader13)); // Here * removed by vinod
																	cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
																	cells26.setBorder(Rectangle.NO_BORDER);
																	Headertable.addCell(cells26);
																	HeadertableGeneral.addCell(cells26);
															  }
															
									}else{
									        	    if(flagmarkResult.equalsIgnoreCase("L")){
									        	    	PdfPCell cells26 = new PdfPCell(new Phrase(TestResult+" "+  "L", subheaderUNDERLINE));
														cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
														cells26.setBorder(Rectangle.NO_BORDER);
														Headertable.addCell(cells26);
														HeadertableGeneral.addCell(cells26);
									        	    }else if(flagmarkResult.equalsIgnoreCase("H")){
									        	    	PdfPCell cells26 = new PdfPCell(new Phrase(TestResult+"  "+  "H", subheaderUNDERLINE));
														cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
														cells26.setBorder(Rectangle.NO_BORDER);
														Headertable.addCell(cells26);
														HeadertableGeneral.addCell(cells26);
									        	    }else if(flagmarkResult.equalsIgnoreCase("Abnormal")){
														  PdfPCell cells26 = new PdfPCell(new Phrase(TestResult, subheaderUNDERLINE)); // Here * removed by vinod
															cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
															cells26.setBorder(Rectangle.NO_BORDER);
															Headertable.addCell(cells26);
															HeadertableGeneral.addCell(cells26);
													  }
									        	    else {
									        	    	PdfPCell cells26 = new PdfPCell(new Phrase(TestResult, tabletext));
														cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
														cells26.setBorder(Rectangle.NO_BORDER);
														Headertable.addCell(cells26);
														HeadertableGeneral.addCell(cells26);
									        	    }
												
									        }
										        }else{
											            if(flagmarkResult.equalsIgnoreCase("L")){
										        	    	PdfPCell cells26 = new PdfPCell(new Phrase(TestResult+" "+"L", subheaderUNDERLINE));
															cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
															cells26.setBorder(Rectangle.NO_BORDER);
															Headertable.addCell(cells26);
															HeadertableGeneral.addCell(cells26);
										        	    }else if(flagmarkResult.equalsIgnoreCase("H")){
										        	    	PdfPCell cells26 = new PdfPCell(new Phrase(TestResult+" "+"H", subheaderUNDERLINE));
															cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
															cells26.setBorder(Rectangle.NO_BORDER);
															Headertable.addCell(cells26);
															HeadertableGeneral.addCell(cells26);
										        	    }else if(flagmarkResult.equalsIgnoreCase("Abnormal")){
															  PdfPCell cells26 = new PdfPCell(new Phrase(TestResult, subheaderUNDERLINE)); // Here * removed by vinod
																cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
																cells26.setBorder(Rectangle.NO_BORDER);
																Headertable.addCell(cells26);
																HeadertableGeneral.addCell(cells26);
														  }
										        	    else {
										        	    	PdfPCell cells26 = new PdfPCell(new Phrase(TestResult, tabletext));
															cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
															cells26.setBorder(Rectangle.NO_BORDER);
															Headertable.addCell(cells26);
															HeadertableGeneral.addCell(cells26);
										        	    }
										        }
										
									}
								
									if(  labCompObj.getTestIdd().intValue() > 0 ){
									if(quantitative.equalsIgnoreCase("Y"))
											{
												if(biologicalReferenceChk.equalsIgnoreCase("Y")){
													
													if (biologicalReferenceWithNormal == null || biologicalReferenceWithNormal.equalsIgnoreCase("null")|| biologicalReferenceWithNormal.equalsIgnoreCase("") ||  biologicalReferenceWithNormal.equalsIgnoreCase("null-") ||  biologicalReferenceWithNormal.equalsIgnoreCase("-null")) {
														   
														//Headertable.addCell(new Phrase("-", tabletext));
														 PdfPCell cells26 = new PdfPCell(new Phrase(" ", tabletext));
														   cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
														   cells26.setBorder(Rectangle.NO_BORDER);
														   Headertable.addCell(cells26);
															} else {
														   
														//Headertable.addCell(new Phrase("" + microraganism, tabletext));
														 PdfPCell cells26 = new PdfPCell(new Phrase(biologicalReferenceWithNormal, tabletext));
														   cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
														   cells26.setBorder(Rectangle.NO_BORDER);
														   Headertable.addCell(cells26);
															}
													
													
												}else{
												if (microraganism == null || microraganism.equalsIgnoreCase("null")|| microraganism.equalsIgnoreCase("") ||  microraganism.equalsIgnoreCase("null-") ||  microraganism.equalsIgnoreCase("-null")) {
											   
											//Headertable.addCell(new Phrase("-", tabletext));
											 PdfPCell cells26 = new PdfPCell(new Phrase(" ", tabletext));
											   cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
											   cells26.setBorder(Rectangle.NO_BORDER);
											   Headertable.addCell(cells26);
												} else {
											
											 PdfPCell cells26 = new PdfPCell(new Phrase(microraganism, tabletext));
											   cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
											   cells26.setBorder(Rectangle.NO_BORDER);
											   Headertable.addCell(cells26);
												}
											}
											
									}else
											{
												if(biologicalReferenceChk.equalsIgnoreCase("Y")){
													
													if(valueType.equalsIgnoreCase("individual"))
													{
														if (biologicalReferenceWithNormal == null || biologicalReferenceWithNormal.equalsIgnoreCase("null")|| biologicalReferenceWithNormal.equalsIgnoreCase("") ||  biologicalReferenceWithNormal.equalsIgnoreCase("null-") ||  biologicalReferenceWithNormal.equalsIgnoreCase("-null")) {
															   
															//Headertable.addCell(new Phrase("-", tabletext));
															 PdfPCell cells26 = new PdfPCell(new Phrase(" ", tabletext));
															   cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
															   cells26.setBorder(Rectangle.NO_BORDER);
															   Headertable.addCell(cells26);
																} else {
															   
															//Headertable.addCell(new Phrase("" + microraganism, tabletext));
															 PdfPCell cells26 = new PdfPCell(new Phrase(biologicalReferenceWithNormal, tabletext));
															   cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
															   cells26.setBorder(Rectangle.NO_BORDER);
															   Headertable.addCell(cells26);
																}
													}else{
														if (biologicalReferenceWithGeneral == null || biologicalReferenceWithGeneral.equalsIgnoreCase("null")|| biologicalReferenceWithGeneral.equalsIgnoreCase("") ||  biologicalReferenceWithGeneral.equalsIgnoreCase("null-") ||  biologicalReferenceWithGeneral.equalsIgnoreCase("-null")) {
															   
															//Headertable.addCell(new Phrase("-", tabletext));
															 PdfPCell cells26 = new PdfPCell(new Phrase("", tabletext));
															   cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
															   cells26.setBorder(Rectangle.NO_BORDER);
															   Headertable.addCell(cells26);
																} else {
															   
															//Headertable.addCell(new Phrase("" + microraganism, tabletext));
															 PdfPCell cells26 = new PdfPCell(new Phrase(biologicalReferenceWithGeneral, tabletext));
															   cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
															   cells26.setBorder(Rectangle.NO_BORDER);
															   Headertable.addCell(cells26);
																}
													}
													
													
													
													
												}else{
												if (NormalValues == null || NormalValues.equalsIgnoreCase("null")|| NormalValues.equalsIgnoreCase("") ) {
											   
											//Headertable.addCell(new Phrase("-", tabletext));
											 PdfPCell cells26 = new PdfPCell(new Phrase(" ", tabletext));
											   cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
											   cells26.setBorder(Rectangle.NO_BORDER);
											   Headertable.addCell(cells26);
												} else {
											   
											//Headertable.addCell(new Phrase("" + NormalValues, tabletext));
											 PdfPCell cells26 = new PdfPCell(new Phrase(NormalValues, tabletext));
											   cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
											   cells26.setBorder(Rectangle.NO_BORDER);
											   Headertable.addCell(cells26);
												}
												}	
											}
									}else{
										 PdfPCell cells26 = new PdfPCell(new Phrase("", tabletext));
										   cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
										   cells26.setBorder(Rectangle.NO_BORDER);
										   Headertable.addCell(cells26);
									}
									
									System.out.println("valueType====="+valueType);
										if( labCompObj.getTestIdd().intValue() > 0){
											if(valueType.equalsIgnoreCase("individual"))
													{
														if (Units == null || Units.equalsIgnoreCase("null")|| Units.equalsIgnoreCase("") ) {
													   
													//Headertable.addCell(new Phrase("-", tabletext));
													 PdfPCell cells26 = new PdfPCell(new Phrase("", tabletext));
													   cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
													   cells26.setBorder(Rectangle.NO_BORDER);
													   Headertable.addCell(cells26);
														} else {
													   
													//Headertable.addCell(new Phrase("" + Units, tabletext));
													 PdfPCell cells26 = new PdfPCell(new Phrase(Units, tabletext));
													   cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
													   cells26.setBorder(Rectangle.NO_BORDER);
													   Headertable.addCell(cells26);
														}
													}else
													{
														if (unitNameGenaral == null || unitNameGenaral.equalsIgnoreCase("null")|| unitNameGenaral.equalsIgnoreCase("")) {
													   
													//Headertable.addCell(new Phrase("-", tabletext));
													 PdfPCell cells26 = new PdfPCell(new Phrase("", tabletext));
													   cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
													   cells26.setBorder(Rectangle.NO_BORDER);
													   Headertable.addCell(cells26);
														} else {
													   
													//Headertable.addCell(new Phrase("" + unitNameGenaral, tabletext));
													PdfPCell cells26 = new PdfPCell(new Phrase(unitNameGenaral, tabletext));
													   cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
													   cells26.setBorder(Rectangle.NO_BORDER);
													   Headertable.addCell(cells26);
														}
													}
											
											}else{
												 PdfPCell cells26 = new PdfPCell(new Phrase("", tabletext));
												   cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
												   cells26.setBorder(Rectangle.NO_BORDER);
												   Headertable.addCell(cells26);
											}
										
										
													if(labCompObj.getTestIdd().intValue() > 0 ){
															if(sampleTypeChk.equalsIgnoreCase("Y")){
																HeadertableNoteM.addCell(new Phrase("Sample Type", tabletext7));	
																HeadertableNoteM.addCell(new Phrase(":  " +sampletype, tabletext7));	
																HeadertableNoteM.addCell(new Phrase("", tabletext));
															}
													}else{
														//Headertable.addCell(new Phrase("", tabletext));
														//Headertable.addCell(new Phrase("", tabletext));
														//Headertable.addCell(new Phrase("", tabletext));	
														//Headertable.addCell(new Phrase("", tabletext));
														//Headertable.addCell(new Phrase("", tabletext));	
													}
										
													if(labCompObj.getTestIdd().intValue() > 0 ){
															if(testMethodChk.equalsIgnoreCase("Y")){
																Headertable.addCell(new Phrase("", tabletext));
																if (methodname == null || methodname.equalsIgnoreCase("null") || methodname.equalsIgnoreCase("")|| methodname.equalsIgnoreCase("-")) {				    	
																Headertable.addCell(new Phrase(" ", tabletext));
																} else {				   
																	/*
																	Headertable.addCell(new Phrase("", tabletext));
																	Headertable.addCell(new Phrase("", tabletext));
																	Headertable.addCell(new Phrase("", tabletext));	
																	Headertable.addCell(new Phrase("", tabletext));
																	Headertable.addCell(new Phrase("", tabletext));	
																	
																	Headertable.addCell(new Phrase("", tabletext));
																	Headertable.addCell(new Phrase("", tabletext));
																	Headertable.addCell(new Phrase("", tabletext));	
																	Headertable.addCell(new Phrase("", tabletext));
																	Headertable.addCell(new Phrase("", tabletext));	
																	
																	HeadertableGeneral.addCell(new Phrase("", tabletext));
														    		HeadertableGeneral.addCell(new Phrase("", tabletext));
														    		
														    		HeadertableGeneral.addCell(new Phrase("", tabletext));
														    		HeadertableGeneral.addCell(new Phrase("", tabletext));
														    		
														    		HeadertableGeneral.addCell(new Phrase("", tabletext));
														    		HeadertableGeneral.addCell(new Phrase("", tabletext));
														    		
														    		*/
														    		
														    		
																	//Headertable.addCell(new Phrase("Method " +": "+methodname, tabletext7));
																	Headertable.addCell(new Phrase("", tabletext));	
																	HeadertableNoteM.addCell(new Phrase("Method", tabletext7));	
																	HeadertableNoteM.addCell(new Phrase(":  " +methodname, tabletext7));	
																	HeadertableNoteM.addCell(new Phrase("", tabletext));	
																}	
																Headertable.addCell(new Phrase("", tabletext));
																Headertable.addCell(new Phrase("", tabletext));
																Headertable.addCell(new Phrase("", tabletext));
															}
													}else{
														Headertable.addCell(new Phrase("", tabletext));
														Headertable.addCell(new Phrase("", tabletext));
														Headertable.addCell(new Phrase("", tabletext));	
														Headertable.addCell(new Phrase("", tabletext));
														Headertable.addCell(new Phrase("", tabletext));	
													}
													
													// added for test comment
													if(labCompObj.getTestIdd().intValue() > 0 ){
														
													
															if (testcomments == null || testcomments.equalsIgnoreCase("null") || testcomments.equalsIgnoreCase("")|| testcomments.equalsIgnoreCase("-")) {				    	
															
															} else {				   
																
																/* HeadertableNote.addCell(new Phrase("", tabletext));
																HeadertableNote.addCell(new Phrase("", tabletext));
																HeadertableNote.addCell(new Phrase("Comment:"   , subheader));
																HeadertableNote.addCell(new Phrase(""+testcomments, tabletext)); */
																
																HeadertableNoteM.addCell(new Phrase("", tabletext));
																HeadertableNoteM.addCell(new Phrase("", tabletext));
																HeadertableNoteM.addCell(new Phrase("", tabletext));
																HeadertableNoteM.addCell(new Phrase("Comment"   , tabletext7));
																HeadertableNoteM.addCell(new Phrase(":  "+testcomments, tabletext7));
																HeadertableNoteM.addCell(new Phrase("", tabletext));
															}	
															
														
												}else{
													Headertable.addCell(new Phrase("", tabletext));
													Headertable.addCell(new Phrase("", tabletext));
													Headertable.addCell(new Phrase("", tabletext));	
													Headertable.addCell(new Phrase("", tabletext));
													Headertable.addCell(new Phrase("", tabletext));	
												}
												// end for test comments
													
													// added for test note
													if(labCompObj.getTestIdd().intValue() > 0 ){
														
													
															if (testNote == null || testNote.equalsIgnoreCase("null") || testNote.equalsIgnoreCase("")|| testNote.equalsIgnoreCase("-")) {				    	
															
															} else {				   
																
																/* HeadertableNote.addCell(new Phrase("", tabletext));
																HeadertableNote.addCell(new Phrase("", tabletext));
																HeadertableNote.addCell(new Phrase("Note:"   , subheader));
																HeadertableNote.addCell(new Phrase(""+testNote, tabletext)); */
																
																HeadertableNoteM.addCell(new Phrase("", tabletext));
																HeadertableNoteM.addCell(new Phrase("", tabletext));
																HeadertableNoteM.addCell(new Phrase("", tabletext));
																HeadertableNoteM.addCell(new Phrase("Note" , tabletext7));
																HeadertableNoteM.addCell(new Phrase(":  "+testNote, tabletext7));
																HeadertableNoteM.addCell(new Phrase("", tabletext));
															}	
															
														
												}else{
													Headertable.addCell(new Phrase("", tabletext));
													Headertable.addCell(new Phrase("", tabletext));
													Headertable.addCell(new Phrase("", tabletext));	
													Headertable.addCell(new Phrase("", tabletext));
													Headertable.addCell(new Phrase("", tabletext));	
												}
												// end for test note	
										
										
										
									}
									
									//Headertable3.addCell(new Phrase("", tabletext));
									//Headertable3.addCell(new Phrase("", tabletext));
									//Headertable3.addCell(new Phrase("", tabletext));
									
									
									if(testHeadFlag.equalsIgnoreCase("G")){
										document.add(HeadertableGeneral);
										HeadertableGeneral.flushContent();
									}else{
										
										
										
										document.add(Headertable);
										Headertable.flushContent();
										
									}
									
									/* document.add(HeadertableNote);
									HeadertableNote.flushContent(); */
									
									//document.add(HeadertableNoteM);
									//HeadertableNoteM.flushContent();
									

									HeaderTableSpace.addCell(new Phrase("", tabletext));
									document.add(HeaderTableSpace);
									HeaderTableSpace.flushContent();
									
									//document.add(Headertable3);
									//Headertable3.flushContent();
			
								
									}
									
									
									
									
				            	 
				            	 
				             }
				             // End Test Details
				             
						
				    
						
						  if(testHeadFlag.equalsIgnoreCase("G")){
								document.add(HeadertableGeneral);
								HeadertableGeneral.flushContent();
							}else{
								document.add(Headertable);
								Headertable.flushContent();
							}
							//document.add(Headertable3);
							//Headertable3.flushContent();
						
							// start Interpretation
							
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
		       
	            
	            StyleSheet styleSheet1 = new StyleSheet();
	            styleSheet1.loadTagStyle("body", "size", "10px");
	            styleSheet1.loadTagStyle("p", "size", " 10px");
	            HTMLWorker htmlWorker1 = new HTMLWorker(document);
	            htmlWorker1.setMargins(50, 100, 100, 150);
	            Paragraph paragraph1 = new Paragraph();
	            
	            PdfPTable HeaderTable311 = new PdfPTable(1);
	            int[] headerwidth301 = {100};
	            HeaderTable311.setWidths(headerwidth301);
	            HeaderTable311.setWidthPercentage(95f);
	            HeaderTable311.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	            htmlWorker.setMargins(50, 100, 100, 150);
	            
	            
	            
			 	if (list.get(pro).getInterpretationCheck().equals("Y")) {
		            
					String interpretationData = list.get(pro).getInterpretation();
					//java.util.List<Element> parseHtmlToList= HTMLWorker.parseToList(new StringReader(interpretationData), styleSheet);

			 		Phrase p = new Phrase("Interpretation : ", subheader);
					PdfPCell celll = new PdfPCell(p);
					celll.setHorizontalAlignment(Element.ALIGN_LEFT);
					celll.setBorder(Rectangle.NO_BORDER);
					HeaderTable311.addCell(celll);
					 document.add(HeaderTable311);
                     HeaderTable311.flushContent();
					
	               /*  for(Element e:parseHtmlToList){
	                    if (e instanceof PdfPTable){
	                        PdfPTable htmlTable = new PdfPTable(1);
	                        int[] htmlTableWidth = {50};
	                        htmlTable.setWidths(htmlTableWidth);
	                        htmlTable.setWidths(htmlTableWidth);
	                        htmlTable.setWidthPercentage(50f);
	                        htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	                        htmlTable = (PdfPTable)e;
	                        HeaderTable31.addCell(htmlTable);
	                        document.add(HeaderTable311);
	                        HeaderTable311.flushContent();
	                    }else{
	                    	paragraph1.add(e);
	                        cell = new PdfPCell(paragraph1);
	                        cell.setBorder(Rectangle.NO_BORDER);
	                        HeaderTable311.addCell(cell);
	                        document.add(HeaderTable311);
	                        HeaderTable311.flushContent();
	                        paragraph1.clear();
	                    }
	                } */
	               
	               
			        java.util.List<Element> ie1 = HTMLWorker.parseToList(new StringReader(interpretationData), styleSheet);
				       if(interpretationData.equalsIgnoreCase("") || interpretationData.equalsIgnoreCase("NULL")){
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
				    	   java.util.List<Element> ie3 = HTMLWorker.parseToList(new StringReader(interpretationData), styleSheet);
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

				       } 
	               
	               
				}

				
					//End Interpretation
						
//start comments
				
			if (list.get(pro).getCommentCheck().equals("Y")) {
	            
				String interpretationData = list.get(pro).getProfileMasterComment();
				//java.util.List<Element> parseHtmlToList= HTMLWorker.parseToList(new StringReader(interpretationData), styleSheet);

		 		Phrase p = new Phrase("Comments : ", subheader);
				PdfPCell celll = new PdfPCell(p);
				celll.setHorizontalAlignment(Element.ALIGN_LEFT);
				celll.setBorder(Rectangle.NO_BORDER);
				HeaderTable311.addCell(celll);
				 document.add(HeaderTable311);
                 HeaderTable311.flushContent();
				
               /*  for(Element e:parseHtmlToList){
                    if (e instanceof PdfPTable){
                        PdfPTable htmlTable = new PdfPTable(1);
                        int[] htmlTableWidth = {50};
                        htmlTable.setWidths(htmlTableWidth);
                        htmlTable.setWidths(htmlTableWidth);
                        htmlTable.setWidthPercentage(50f);
                        htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
                        htmlTable = (PdfPTable)e;
                        HeaderTable31.addCell(htmlTable);
                        document.add(HeaderTable311);
                        HeaderTable311.flushContent();
                    }else{
                    	paragraph1.add(e);
                        cell = new PdfPCell(paragraph1);
                        cell.setBorder(Rectangle.NO_BORDER);
                        HeaderTable311.addCell(cell);
                        document.add(HeaderTable311);
                        HeaderTable311.flushContent();
                        paragraph1.clear();
                    }
                } */
               
               
		        java.util.List<Element> ie1 = HTMLWorker.parseToList(new StringReader(interpretationData), styleSheet);
			       if(interpretationData.equalsIgnoreCase("") || interpretationData.equalsIgnoreCase("NULL")){
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
			    	   java.util.List<Element> ie3 = HTMLWorker.parseToList(new StringReader(interpretationData), styleSheet);
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

			       } 
               
               
			}

			// end comments
				  
			// start Equipment
			PdfPTable HeaderTableEquip = new PdfPTable(2);
		      //  int[] headerwidthEquip = {15,120};
		        int[] headerwidthEquip = {5, 30};
		        HeaderTableEquip.setWidths(headerwidthEquip);
		        HeaderTableEquip.setWidthPercentage(95f);
		        HeaderTableEquip.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			      
			       HeaderTableEquip.addCell(new Phrase("", subheader));
			       HeaderTableEquip.addCell(new Phrase("", subheader));
			       
			      
			       
			       HeaderTableEquip.addCell(new Phrase("Equipment:", subheader));
		       System.out.println("machineId===="+list.get(pro).getMachineId());
		       HeaderTableEquip.addCell(new Phrase(""+list.get(pro).getMachineName(), tabletext));
		       if(list.get(pro).getMachineId() != null){
	  	    	if(list.get(pro).getMachineId() > 0){
	  	    		 document.add(HeaderTableEquip);
	  	    		HeaderTableEquip.flushContent();
	  	    	}
		       }
			
		    // End Equipment
						
					PdfPTable HeaderTableTechN1 = new PdfPTable(1);
				int[] headerwidth511 = {100};
				HeaderTableTechN1.setWidths(headerwidth511);
				HeaderTableTechN1.setWidthPercentage(95f);
			    HeaderTableTechN1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			   //	HeaderTableTechN.addCell(new Phrase("",subheader));
			   	HeaderTableTechN1.addCell(new Phrase("",subheader));
			
				PdfPCell cells26 = new PdfPCell(new Phrase("--End Of Report--", subheader));
				cells26.setHorizontalAlignment(Element.ALIGN_CENTER);
				cells26.setBorder(Rectangle.NO_BORDER);
				HeaderTableTechN1.addCell(cells26);
			   	//HeaderTableTechN.addCell(new Phrase("--End Of Report--", subheader));			 
			
			  	document.add(HeaderTableTechN1);
			   	HeaderTableTechN1.flushContent();	
						
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