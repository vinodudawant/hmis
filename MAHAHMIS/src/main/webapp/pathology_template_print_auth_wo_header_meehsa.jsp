<%@page import="java.util.Date"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="java.awt.Color"%>
<%@page import="javax.sound.midi.SysexMessage"%>
<%@page import="com.hms.TempEventHandlerLISPDF"%>
<%-- <%@page import="com.hms.utility.PageEventHandlerBean"%> --%>
<%@page import="jxl.format.BoldStyle"%>
<%@page import="org.jfree.chart.plot.PlotOrientation"%>
<%@page import="org.jfree.data.category.DefaultCategoryDataset"%>
<%@page import="org.apache.tools.ant.types.CommandlineJava.SysProperties"%>
<%@page import="com.lowagie.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.lowagie.text.html.simpleparser.StyleSheet"%>
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
<%@page import="com.hms.model.AdminModel"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
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
		String CovidReportProfileId = (String) resource.getObject("CovidReportProfileId").toString();

		Integer covidReportId=Integer.parseInt(CovidReportProfileId);
		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		
		Document document = new Document(PageSize.A4);
		document.setMargins(20, 20, 20, 145);
		
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
		Font tabletext7 = new Font(Font.HELVETICA, 8, Font.NORMAL);
		Font tableheader15 = new Font(Font.HELVETICA, 10, Font.NORMAL);		
		Font small = new Font(Font.HELVETICA, 9, Font.NORMAL);
		Font subheaderUNDERLINE = new Font(Font.HELVETICA, 9, Font.BOLD | Font.UNDERLINE);
		
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
		request.setAttribute("headerFlag", "No");
		request.setAttribute("covide", "No");
		request.setAttribute("pageIteration", 0);
		//request.setAttribute("footerAddress", "Lifenity International Clinical Laboratory L.L.C Elite Business Centre, Level 01, 104-05, Al Barsha, P.O. Box 502180, Dubai,UAE: +971 045479027, +971 045479033 | E: dubaicustomercare@lifenity.ae | www.lifenity.ae");
		request.setAttribute("footerAddress", "");
		String ppName=patientName.replaceAll(",", ".");
		Phlebotomyservice phlebotomyservice = (ApplicationContextUtils.getApplicationContext()).getBean(Phlebotomyservice.class);
		List<PathologySampleWiseMaster> list = phlebotomyservice.getRoutinevalueResutlusingPrint(masterIdd, treatmentId, patientType, unitId, request);
		RegService regservice = (ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
		List<RegTreBillDto> robj=regservice.fetchPatientsRecordByTreatmentId(treatmentId);
		String pmobile="0";
		if(robj.size() > 0){
			pmobile=robj.get(0).getMobile();
		}
		String profileName="";
		for(int pro = 0; pro < list.size(); pro++) {
			profileName =profileName+"_"+ list.get(pro).getProfileName();
			
		}
		
		SimpleDateFormat formDate = new SimpleDateFormat("dd-MM-yyyy");
	       String strDate = formDate.format(new Date());
	       System.out.println("strDate==="+strDate);
	       
		response.setHeader("Content-Disposition", "inline; filename="+pmobile+"_"+ppName+"_"+profileName+"_"+strDate+".pdf");	
		//response.setHeader("Content-Disposition", "inline; filename="+ppName+".pdf");
		
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
		//System.out.println(collecteddate+postdate);
		/* --------------------------------------End All Services -------------------------------------------   */
			     
		PdfWriter pdfWriter = PdfWriter.getInstance(document, outStream);			
		TempEventHandlerLISPDF event = new TempEventHandlerLISPDF();
		pdfWriter.setPageEvent(event);

		String reportFooterAddress = "";// hospObj.getReportFooterAddress();
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
			for (int pro = 0; pro < list.size(); pro++) {	
				request.setAttribute("pageIteration", pro);
			int[] HeaderWidth1 = { 0, 100,0 };
			Headertable1.setWidths(HeaderWidth1);
			Headertable1.setWidthPercentage(95f);
			Headertable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);   
			int profileId=list.get(0).getPathologySampleWiseSlave().get(0).getProfileId();
			/* if(list.size() > 1){
		//document.newPage();
			}else{} */
			
			 if(pro > 0){
			 document.newPage();
			} 
			
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
	        HeaderTable121.addCell(new Phrase( list.get(0).getPathologySampleWiseSlave().get(0).getProfileName(),subheader));
	       // HeaderTable121.addCell(new Phrase("Template Name:-", subheader));
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
	    	
	     /*   PdfPTable HeaderTableEquip = new PdfPTable(4);
	        int[] headerwidthEquip = {10,20,10,20};
	        HeaderTableEquip.setWidths(headerwidthEquip);
	        HeaderTableEquip.setWidthPercentage(95f);
	        HeaderTableEquip.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	       
	        HeaderTableEquip.addCell(new Phrase("Equipment:-", subheader));
	       System.out.println("machineId===="+list.get(pro).getMachineId());
	       HeaderTableEquip.addCell(new Phrase(""+list.get(pro).getMachineName(), tabletext));
	       HeaderTableEquip.addCell(new Phrase("", subheader));
	       HeaderTableEquip.addCell(new Phrase("", subheader));
  	    	if(list.get(pro).getMachineId() > 0){
  	    		 document.add(HeaderTableEquip);
  	    		HeaderTableEquip.flushContent();
  	    	}
  	    	 */
  	    	 
	     /*  PdfPTable HeaderTableEquip = new PdfPTable(2);
	        int[] headerwidthEquip = {15,120};
	        HeaderTableEquip.setWidths(headerwidthEquip);
	        HeaderTableEquip.setWidthPercentage(95f);
	        HeaderTableEquip.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		       HeaderTableEquip.addCell(new Phrase("", tabletext));
		       HeaderTableEquip.addCell(new Phrase("", subheader));
		     //  HeaderTableEquip.addCell(new Phrase("", subheader));
		      // HeaderTableEquip.addCell(new Phrase("", subheader));
	       
	        HeaderTableEquip.addCell(new Phrase("Equipment:-", subheader));
	       System.out.println("machineId===="+list.get(pro).getMachineId());
	       HeaderTableEquip.addCell(new Phrase("   "+list.get(pro).getMachineName(), tabletext));
	     
 	    	if(list.get(pro).getMachineId() > 0){
 	    		 document.add(HeaderTableEquip);
 	    		HeaderTableEquip.flushContent();
 	    	}
  	    	*/
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
			     //  HeaderTableEquip.addCell(new Phrase("", subheader));
			      // HeaderTableEquip.addCell(new Phrase("", subheader));
		       
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

			   	HeaderTableTechN.addCell(new Phrase("",subheader));
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
			  	
			
		}
		

			  
			
			 //signature
				PdfPTable Headertable2 = new PdfPTable(3);
				int[] HeaderWidth2 = { 20, 60, 20 };
				Headertable2.setWidths(HeaderWidth2);
			    Headertable2.setWidthPercentage(95f);
				Headertable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);		
			 
			    Headertable2.addCell(new Phrase("  ", footer));  
				Headertable2.addCell(new Phrase(" ", tabletext));
			    Headertable2.addCell(new Phrase("  ", footer));
		
			/*  String signature = "";
			 String actualpath = "";
			 int IdPathologist = 0;    		 
			 
			 AdminModel admodel = new AdminModel();
			 Doctor doc1 = new Doctor();
			 List<Doctor> listDoc = null;
			 listDoc = admodel.getDoctorsDetails(userId);
			 signature = listDoc.get(0).getDocsign();

			  List<Doctor> listDoc2 = null;
			  String  veriBy="";
			  String verifiedsignature="";
			  String  verifiedqualification="";
			  String  verifieddesigination="";
			  if(authoId>0)
			  {
			     listDoc2 = admodel.getDoctorsDetails(authoId);
			  	 veriBy = listDoc2.get(0).getDoc_name();
			  	 verifiedsignature = listDoc2.get(0).getDocsign();
			  	 verifiedqualification = listDoc2.get(0).getQualification();  
			     verifieddesigination = listDoc2.get(0).getDesignation();
			  }
			 
			 List<Doctor> listDoc1 = null;
		 	
		    String  authoqualification="";
		    String  authodesigination="";
		    String  authosignature="";	 
		    String authpath="";
		    String authoby="";
		    if(postId>0)
		    {    listDoc1 = admodel.getDoctorsDetails(postId);
		 	      authoby = listDoc1.get(0).getDoc_name();
		 		  authoqualification = listDoc1.get(0).getQualification();  
		 		  authodesigination = listDoc1.get(0).getDesignation();
		 		  authosignature = listDoc1.get(0).getDocsign();
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
			 */
			
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
			
			//Added by KishoR for set location of this table to fixed bottom.
			//Headertable2.setTotalWidth(document.right(document.rightMargin()) - document.left(document.leftMargin()));
			//Headertable2.writeSelectedRows(0, -1, document.left(document.leftMargin()), Headertable2.getTotalHeight() + document.bottom(document.bottomMargin() + 10), pdfWriter.getDirectContent());		
			//document.add(Headertable2);
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