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
<%@page import="com.hms.TempEventHandlerLISPDF"%>
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

<%@page import="com.lowagie.text.pdf.BaseFont"%>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="com.lowagie.text.Chunk,com.lowagie.text.Document,com.lowagie.text.Element,com.lowagie.text.Font 
,com.lowagie.text.HeaderFooter,com.lowagie.text.Image,com.lowagie.text.Paragraph,com.lowagie.text.Phrase,com.lowagie.text.Rectangle
,com.lowagie.text.pdf.PdfPCell,com.lowagie.text.pdf.PdfPTable,com.lowagie.text.pdf.PdfWriter,com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext,
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
		String mobileAuth = request.getParameter("mobileAuth");
		request.setAttribute("headerFlag", "Yes");
		request.setAttribute("covide", "No");
		request.setAttribute("pageIteration", 0);
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

	       // String strDate = formDate.format(System.currentTimeMillis()); // option 1
	       String strDate = formDate.format(new Date());
	       System.out.println("strDate==="+strDate);
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
		if(postId > 0)
			request.setAttribute("postId", postId); // added by vinod
		else
			request.setAttribute("postId", authoId); // added by vinod
		//System.out.println(collecteddate+postdate);
		/* --------------------------------------End All Services -------------------------------------------   */
			     
		PdfWriter pdfWriter = PdfWriter.getInstance(document, outStream);			
		TempEventHandlerLISPDF event = new TempEventHandlerLISPDF();
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
			for (int pro = 0; pro < list.size(); pro++) {	
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
			
			proname = list.get(pro).getProfileName();
			pkgname = list.get(pro).getPkgName();
			proId=list.get(pro).getProfileId();
			String Profile = proname;
			
			     if(list.size() > 1){
			     				    
			       if(list.get(0).getPageno()=="Y" && codefbsppbss==true){
			    	  
		    	    codefbsppbss=false;
		     		/* Headertable1.addCell(new Phrase("", tabletext));	
		    		Headertable1.addCell(new Phrase(""+Profile, header));
		    		Headertable1.addCell(new Phrase("", tabletext)); */
		    		   Headertable1.addCell(new Phrase("", tabletext));	
			   PdfPCell cells26 = new PdfPCell(new Phrase(Profile, headerUnderline));
			   cells26.setHorizontalAlignment(Element.ALIGN_CENTER);
			   cells26.setBorder(Rectangle.NO_BORDER);
			   Headertable1.addCell(cells26);
			   Headertable1.addCell(new Phrase("", tabletext));
		     		//Headertable1.addCell(code129.createImageWithBarcode(canvas, null, null));
		   }else if(list.get(0).getPageno()=="Y" && codefbsppbss==false){
			  
		    	    fbsppbscollecteddate=list.get(0).getFbsppbsaccepteddate();
		    	    barcodefbsppbs=list.get(0).getBarcodefbsppbs();
		    	    
		    	    code129.setBaseline(4);
		    		code129.setGenerateChecksum(true);
		    		code129.setSize(2);
		    		code129.setBarHeight(4);
		    		code129.setCodeType(Barcode128.CODE128);
		    		code129.setSize(4);
		    		code129.setCode(barcodefbsppbs);
		    	    Headertable1.addCell(new Phrase("Sample Accepted On:"+fbsppbscollecteddate, header));	
		     		//Headertable1.addCell(new Phrase(""+Profile, header));
		     		 PdfPCell cells26 = new PdfPCell(new Phrase(Profile, headerUnderline));
			   cells26.setHorizontalAlignment(Element.ALIGN_CENTER);
			   cells26.setBorder(Rectangle.NO_BORDER);
			   Headertable1.addCell(cells26);
		     		Headertable1.addCell(code129.createImageWithBarcode(canvas, null, null));
		     		
		     		/* Headertable1.addCell(new Phrase("Report On:"+fbsppbspostdate, header));	
		     		Headertable1.addCell(new Phrase("", tabletext));	
		     		Headertable1.addCell(new Phrase("", tabletext));	 */
		       }else{	/* Headertable1.addCell(new Phrase("", tabletext));	
			                Headertable1.addCell(new Phrase("iii"+Profile, header));
			    	        Headertable1.addCell(new Phrase("", tabletext)); */
		    	   Headertable1.addCell(new Phrase("", tabletext));	
		   PdfPCell cells26 = new PdfPCell(new Phrase(Profile, headerUnderline));
		   cells26.setHorizontalAlignment(Element.ALIGN_CENTER);
		   cells26.setBorder(Rectangle.NO_BORDER);
		   Headertable1.addCell(cells26);
		   Headertable1.addCell(new Phrase("", tabletext));
		     	}
			   }
			     else
		    {
		   Headertable1.addCell(new Phrase("", tabletext));	
		   PdfPCell cells26 = new PdfPCell(new Phrase(Profile, headerUnderline));
		   cells26.setHorizontalAlignment(Element.ALIGN_CENTER);
		   cells26.setBorder(Rectangle.NO_BORDER);
		   Headertable1.addCell(cells26);
		   Headertable1.addCell(new Phrase("", tabletext));
		   
		   			
		 }	
			 		
			 		
			
			     //System.out.println(collecteddate+postdate);
			document.add(Headertable1);
			Headertable1.flushContent();
			
			
		PdfPTable Headertable = new PdfPTable(5);
		int[] HeaderWidth = { 0, 40, 40, 40, 30};
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

		
		
		Headertable.addCell(new Phrase("", tabletext));
		PdfPCell cells24 = new PdfPCell(new Phrase("Investigation", tableheader14));
		cells24.setHorizontalAlignment(Element.ALIGN_LEFT);
		cells24.setBorder(Rectangle.NO_BORDER);
		Headertable.addCell(cells24);
		
		PdfPCell cells27 = new PdfPCell(new Phrase("Result", tableheader14));
		cells27.setHorizontalAlignment(Element.ALIGN_LEFT);
		cells27.setBorder(Rectangle.NO_BORDER);
		Headertable.addCell(cells27);
		
		PdfPCell cells29 = new PdfPCell(new Phrase("Normal Range", tableheader14));
		cells29.setHorizontalAlignment(Element.ALIGN_LEFT);
		cells29.setBorder(Rectangle.NO_BORDER);
		Headertable.addCell(cells29);
		
		PdfPCell cells28 = new PdfPCell(new Phrase("Units", tableheader14));
		cells28.setHorizontalAlignment(Element.ALIGN_LEFT);
		cells28.setBorder(Rectangle.NO_BORDER);
		Headertable.addCell(cells28);
		
		
		
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
		//System.out.println(collecteddate+postdate);
			
			List testidcheck = new ArrayList();
			
			// start code for trend graph
			int lengthTrend=0;
					
			for (int i = 0; i < list.get(pro).getTestli().size(); i++) {
				 if(list.get(pro).getTestli().get(i).getTestId() > 0){
					 if(list.get(pro).getTestli().get(i).getTrendanalysisFlag().equalsIgnoreCase("Y")){
							lengthTrend++;
						}
				 }
				
			}

	    	PdfPTable trendTable1 = new PdfPTable(2);
	    	int[] tendWidth1 = { 20,20};
	    	trendTable1.setWidths(tendWidth1);
	    	trendTable1.setWidthPercentage(95f);
	    	trendTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			int chartCount = 1;
			
			for (int i = 0; i < list.get(pro).getTestli().size(); i++) {
				 if(list.get(pro).getTestli().get(i).getTestId() > 0){
	       	 	if(list.get(pro).getTestli().get(i).getTrendanalysisFlag().equalsIgnoreCase("Y")){						         
				      
					DefaultCategoryDataset mychartData=new DefaultCategoryDataset();
					
			 		for(int p=0; p < list.get(pro).getTestli().get(i).getTreandAnalysisList().size(); p++ ){				 
				 
			 			String trandResult=(String)list.get(pro).getTestli().get(i).getTreandAnalysisList().get(p);
			 			String trandDate=(String)list.get(pro).getTestli().get(i).getTreandAnalysisDateList().get(p);
				 
				   		mychartData.setValue(Float.parseFloat(trandResult),"Result Value",trandDate);
				   		
			 		}
			 		JFreeChart my2DChart=ChartFactory.createLineChart(list.get(pro).getTestli().get(i).getTestName(), "DATE","RESULT",mychartData,PlotOrientation.VERTICAL,false,false,false);

			        int widthTrend = 370;
			    	int heightTrend = 320;
			    	
			    	PdfContentByte Add_Chart_Content = pdfWriter.getDirectContent();
			    	PdfTemplate template_Chart_Holder = Add_Chart_Content.createTemplate(widthTrend, heightTrend);
			    	Graphics2D Graphics_Chart = template_Chart_Holder.createGraphics(widthTrend, heightTrend);
			    	Rectangle2D Chart_Region = new Rectangle2D.Double(0,0,400,300);
			    	Graphics_Chart.setBackground(Color.WHITE);
			    	
			    	java.awt.Font font4 = new java.awt.Font("FreeMono", java.awt.Font.BOLD, 14);
			    	TextTitle title = my2DChart.getTitle();
			    	title.setFont(font4);
			    	
			    	CategoryPlot plot = my2DChart.getCategoryPlot();
			    	CategoryAxis axis = plot.getDomainAxis();
			    	java.awt.Font font5 = new java.awt.Font("FreeMono", java.awt.Font.PLAIN, 10);
			    	plot.getDomainAxis().setLabelFont(font5);
			    	axis.setTickLabelFont(font5);
			    	axis.setCategoryLabelPositions(CategoryLabelPositions.UP_45);
			    	plot.setRangeGridlinePaint(Color.black);
			    	LineAndShapeRenderer render = (LineAndShapeRenderer) plot.getRenderer();
			    	render.setShapesVisible(true);
			    	render.setSeriesPaint(0, Color.blue);
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
				    	imgTrendChart.scaleAbsolute(230, 170);
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
				    	imgTrendChart.scaleAbsolute(230, 170);
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
			
	    	// end code for trend  graph
	    	
			
			for (int i = 0; i < list.get(pro).getTestli().size(); i++) {
		         boolean isTestIdAbsent = true;	
		         
		         if((Integer)list.get(pro).getTestli().get(i).getTestId() == 0){
			         
			         String headName = list.get(pro).getTestli().get(i).getHeadingname();
			         Headertable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			         Headertable.addCell(new Phrase("", tableheader13));
			 		 Headertable.addCell(new Phrase(""+headName, tableheader13));
			 		 Headertable.addCell(new Phrase("", tabletext));
			 		 Headertable.addCell(new Phrase("", tabletext));
			 		 Headertable.addCell(new Phrase("", tabletext));
			 		 
			 		Headertable3.addCell(new Phrase("", tabletext));
					Headertable3.addCell(new Phrase("", tabletext));
					Headertable3.addCell(new Phrase("", tabletext));
					
					//System.out.println(collecteddate+postdate);
					
					document.add(Headertable);
					Headertable.flushContent();
					document.add(Headertable3);
					Headertable3.flushContent();
		         
		         }else{
			
			if(testidcheck.size() == 0){
				isTestIdAbsent = true;
			}
			
			for(int ts1 = 0; ts1 < testidcheck.size(); ts1++) {
			     if(testidcheck.get(ts1) == (Integer)list.get(pro).getTestli().get(i).getTestId()){
				      isTestIdAbsent = false;			
				      break;
		    	}
			}
			if(isTestIdAbsent)
				testidcheck.add(list.get(pro).getTestli().get(i).getTestId());			

			if(isTestIdAbsent){
		//System.out.println(list.get(pro).getTestli().get(i).getTrendanalysisFlag()+"fgggggggggggggggh");
			 
		
			String TestName = list.get(pro).getTestli().get(i).getTestName();
			System.out.println("name===="+TestName);
			String TestResult = list.get(pro).getTestli().get(i).getTestresult();
			String LowValues = list.get(pro).getTestli().get(i).getLowvalue();
			String HighValues = list.get(pro).getTestli().get(i).getHighvalue();
			//String dateresult = list.get(pro).getTestli().get(i).getTrendanalysisDate();
			String flag_mark=list.get(pro).getTestli().get(i).getFlagmark();
			
			String NormalValues ="";
			
			if(HighValues!=null){
		NormalValues = LowValues + "-" + HighValues;
			}else{
		NormalValues = LowValues;
			}
			String methodname = list.get(pro).getTestli().get(i).getMethodename();
			String Units = list.get(pro).getTestli().get(i).getUnitname();
			
			if(Units!=null){
		Units = list.get(pro).getTestli().get(i).getUnitname();
			}else{
		Units = "-";
			}
			
			// get the Biological Reference Interval value from this statement
			String expression = list.get(pro).getTestli().get(i).getExpression();
			
			/* String microraganism = list.get(pro).getTestli().get(i).getExpression()+list.get(pro).getTestli().get(i).getDefaultvalue();
			System.out.println(microraganism);*/
			
			// System.out.println(expression);
			
			String testcomments=list.get(pro).getTestli().get(i).getTestComments();	
			String testinterpretation=list.get(pro).getTestli().get(i).getTestInterpretation();
			String microflag=list.get(pro).getTestli().get(i).getMicroorganism();
			String sampletype=list.get(pro).getTestli().get(i).getSamplename();
			String flagmarkResult=list.get(pro).getTestli().get(i).getFlagmark();
			
			String microReason=list.get(pro).getTestli().get(i).getMicroreason();
			
			String quantitative=list.get(pro).getTestli().get(i).getQuantitative();
			
			String valueType=list.get(pro).getTestli().get(i).getTestType();
			String unitNameGenaral=list.get(pro).getTestli().get(i).getUnitNameGenaral();
			
			String biologicalReferenceChk=list.get(pro).getTestli().get(i).getBiologicalReferenceChk();			
			String sampleTypeChk=list.get(pro).getTestli().get(i).getSampleTypeChk();
			String testMethodChk=list.get(pro).getTestli().get(i).getTestMethodChk();
			
			String biologicalReferenceWithGeneral=list.get(pro).getTestli().get(i).getBiologicalReferenceWithGeneral();
			String biologicalReferenceWithNormal=list.get(pro).getTestli().get(i).getBiologicalReferenceWithNormal();
			
			
		
			// ===================== code for trend analysis start=====================//
		if(list.get(pro).getTestli().get(i).getTestId() > 0){
       	 	if(list.get(pro).getTestli().get(i).getTrendanalysisFlag().equalsIgnoreCase("Y")){						         
			      
				DefaultCategoryDataset mychartData=new DefaultCategoryDataset();
				
		 		for(int p=0; p < list.get(pro).getTestli().get(i).getTreandAnalysisList().size(); p++ ){				 
			 
		 			String trandResult=(String)list.get(pro).getTestli().get(i).getTreandAnalysisList().get(p);
		 			String trandDate=(String)list.get(pro).getTestli().get(i).getTreandAnalysisDateList().get(p);
			 
			   		mychartData.setValue(Float.parseFloat(trandResult),"Result Value",trandDate);
			   		
		 		}
		 		JFreeChart my2DChart=ChartFactory.createLineChart(list.get(pro).getTestli().get(i).getTestName(), "DATE","RESULT",mychartData,PlotOrientation.VERTICAL,false,false,false);

		        int widthTrend = 370;
		    	int heightTrend = 320;
		    	
		    	PdfContentByte Add_Chart_Content = pdfWriter.getDirectContent();
		    	PdfTemplate template_Chart_Holder = Add_Chart_Content.createTemplate(widthTrend, heightTrend);
		    	Graphics2D Graphics_Chart = template_Chart_Holder.createGraphics(widthTrend, heightTrend);
		    	Rectangle2D Chart_Region = new Rectangle2D.Double(0,0,400,300);
		    	Graphics_Chart.setBackground(Color.WHITE);
		    	
		    	java.awt.Font font4 = new java.awt.Font("FreeMono", java.awt.Font.BOLD, 14);
		    	TextTitle title = my2DChart.getTitle();
		    	title.setFont(font4);
		    	
		    	CategoryPlot plot = my2DChart.getCategoryPlot();
		    	CategoryAxis axis = plot.getDomainAxis();
		    	java.awt.Font font5 = new java.awt.Font("FreeMono", java.awt.Font.PLAIN, 10);
		    	plot.getDomainAxis().setLabelFont(font5);
		    	axis.setTickLabelFont(font5);
		    	axis.setCategoryLabelPositions(CategoryLabelPositions.UP_45);
		    	plot.setRangeGridlinePaint(Color.black);
		    	LineAndShapeRenderer render = (LineAndShapeRenderer) plot.getRenderer();
		    	render.setShapesVisible(true);
		    	render.setSeriesPaint(0, Color.blue);
		    	//render.setStroke( JFreeChartEngine.getLineStyleStroke( chartDefinition.getLineStyle(), chartDefinition.getLineWidth() ) )
		    	//render.setBaseToolTipGenerator( new StandardCategoryToolTipGenerator() );	
		    	my2DChart.getPlot().setBackgroundPaint(Color.WHITE);
		    	my2DChart.draw(Graphics_Chart, Chart_Region);
		    	Graphics_Chart.dispose();
		    	// Add_Chart_Content.addTemplate(template_Chart_Holder,30,0);
		    	
		    	PdfPCell cellTrend = null;
		    	
		    	Image imgTrendChart = Image.getInstance(template_Chart_Holder);
		    	imgTrendChart.scaleAbsolute(230, 170);
		    	cellTrend = new PdfPCell();
		    	cellTrend.addElement(new Chunk(imgTrendChart, 5, -5));
		    	cellTrend.setBorder(Rectangle.NO_BORDER);
		    	
		    	PdfPTable trendTable = new PdfPTable(1);
		    	int[] tendWidth = { 100 };
		    	trendTable.setWidths(tendWidth);
		    	trendTable.setWidthPercentage(95f);
		    	trendTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		    	
		    	trendTable.addCell(new Phrase("", tableheader));
		    	trendTable.addCell(new Phrase("", tableheader));
		    	trendTable.addCell(cellTrend);
		    	
		    	//trendTable.addCell(new Phrase("",tableheader));
		    //	document.add(trendTable);
		    	//trendTable.flushContent();
			}
		}
       	// ===================== code for trend analysis end=====================//
	         
			
		Headertable.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		Headertable.addCell(new Phrase("", tabletext));

		if (TestName != null) {
			    
			Headertable.addCell(new Phrase("" + TestName, tabletext));
		
		} else {
		       	
			Headertable.addCell(new Phrase("-", tabletext));
			
		}
		 
		if (TestResult == null || TestResult.equalsIgnoreCase("null")|| TestResult.equalsIgnoreCase("") || TestResult.equalsIgnoreCase("-")) {
			   
			//Headertable.addCell(new Phrase("-", tabletext));
			PdfPCell cells26 = new PdfPCell(new Phrase("-", tabletext));
			cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
			cells26.setBorder(Rectangle.NO_BORDER);
			Headertable.addCell(cells26);
		}else if(HighValues==null || HighValues.equalsIgnoreCase("") || LowValues==null || LowValues.equalsIgnoreCase("") ){
			
			//Headertable.addCell(new Phrase("" + TestResult, tabletext));
			PdfPCell cells26 = new PdfPCell(new Phrase(""+TestResult, tabletext));
			cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
			cells26.setBorder(Rectangle.NO_BORDER);
			Headertable.addCell(cells26);
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
			  
			        		 if(flag_mark.equalsIgnoreCase("L")){
			                	 PdfPCell cells26 = new PdfPCell(new Phrase(TestResult+"L", subheaderUNDERLINE)); // Here * removed by vinod
			         			cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
			         			cells26.setBorder(Rectangle.NO_BORDER);
			         			Headertable.addCell(cells26);
			                  }else if(flag_mark.equalsIgnoreCase("H")){
			                	  PdfPCell cells26 = new PdfPCell(new Phrase(TestResult+"H", subheaderUNDERLINE)); // Here * removed by vinod
			          			cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
			          			cells26.setBorder(Rectangle.NO_BORDER);
			          			Headertable.addCell(cells26);
			                  }else{
			                	  PdfPCell cells26 = new PdfPCell(new Phrase(TestResult, tableheader13)); // Here * removed by vinod
			          			cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
			          			cells26.setBorder(Rectangle.NO_BORDER);
			          			Headertable.addCell(cells26);
			                  }
		}else{
		        	//Headertable.addCell(new Phrase("" + TestResult, tabletext));
					 if(flag_mark.equalsIgnoreCase("L")){
		            	 PdfPCell cells26 = new PdfPCell(new Phrase(TestResult+"L", subheaderUNDERLINE)); // Here * removed by vinod
		     			cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
		     			cells26.setBorder(Rectangle.NO_BORDER);
		     			Headertable.addCell(cells26);
		              }else if(flag_mark.equalsIgnoreCase("H")){
		            	  PdfPCell cells26 = new PdfPCell(new Phrase(TestResult+"H", subheaderUNDERLINE)); // Here * removed by vinod
		      			cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
		      			cells26.setBorder(Rectangle.NO_BORDER);
		      			Headertable.addCell(cells26);
		              }else{
		            	  PdfPCell cells26 = new PdfPCell(new Phrase(TestResult, tableheader13)); // Here * removed by vinod
		      			cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
		      			cells26.setBorder(Rectangle.NO_BORDER);
		      			Headertable.addCell(cells26);
		              }
		        }
			        }else{
				        	 if(flag_mark.equalsIgnoreCase("L")){
			                	 PdfPCell cells26 = new PdfPCell(new Phrase(TestResult+"L", subheaderUNDERLINE)); // Here * removed by vinod
			         			cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
			         			cells26.setBorder(Rectangle.NO_BORDER);
			         			Headertable.addCell(cells26);
			                  }else if(flag_mark.equalsIgnoreCase("H")){
			                	  PdfPCell cells26 = new PdfPCell(new Phrase(TestResult+"H", subheaderUNDERLINE)); // Here * removed by vinod
			          			cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
			          			cells26.setBorder(Rectangle.NO_BORDER);
			          			Headertable.addCell(cells26);
			                  }else{
			                	  PdfPCell cells26 = new PdfPCell(new Phrase(TestResult, tableheader13)); // Here * removed by vinod
			          			cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
			          			cells26.setBorder(Rectangle.NO_BORDER);
			          			Headertable.addCell(cells26);
			                  }
			        }
			           				
			
		}
		
		
		if(quantitative.equalsIgnoreCase("Y"))
		{
			if(biologicalReferenceChk.equalsIgnoreCase("Y")){
				
				if (biologicalReferenceWithNormal == null || biologicalReferenceWithNormal.equalsIgnoreCase("null")|| biologicalReferenceWithNormal.equalsIgnoreCase("") ||  biologicalReferenceWithNormal.equalsIgnoreCase("null-") ||  biologicalReferenceWithNormal.equalsIgnoreCase("-null")) {
					   
					//Headertable.addCell(new Phrase("-", tabletext));
					 PdfPCell cells26 = new PdfPCell(new Phrase("-", tabletext));
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
			
			// The condition for expression "Less Than Equal To" 
			if(expression.equals("<="))
			{
				String microraganism = "\u2264 "+list.get(pro).getTestli().get(i).getDefaultvalue();
				
				if (microraganism == null || microraganism.equalsIgnoreCase("null")|| microraganism.equalsIgnoreCase("") ||  microraganism.equalsIgnoreCase("null-") ||  microraganism.equalsIgnoreCase("-null")) {
		   
				//Headertable.addCell(new Phrase("-", tabletext));
			
				   PdfPCell cells26 = new PdfPCell(new Phrase("-", bf_cjk_font));
				   cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
				   cells26.setBorder(Rectangle.NO_BORDER);
				   Headertable.addCell(cells26); 
				   
				} else {			
		   
				//Headertable.addCell(new Phrase("" + microraganism, tabletext));	    		
				
				   PdfPCell cells26 = new PdfPCell(new Phrase(microraganism, bf_cjk_font));
				   cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
				   cells26.setBorder(Rectangle.NO_BORDER);
				   Headertable.addCell(cells26);
			 	 
				}
			}
			
			// The condition for expression "Greater Than Equal To" 
			if(expression.equals(">="))
			{
				String microraganism = "\u2265 "+list.get(pro).getTestli().get(i).getDefaultvalue();
				
				if (microraganism == null || microraganism.equalsIgnoreCase("null")|| microraganism.equalsIgnoreCase("") ||  microraganism.equalsIgnoreCase("null-") ||  microraganism.equalsIgnoreCase("-null")) {
					   
					//Headertable.addCell(new Phrase("-", tabletext));
					PdfPCell cells26 = new PdfPCell(new Phrase("-", bf_cjk_font));
					cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
					cells26.setBorder(Rectangle.NO_BORDER);
					Headertable.addCell(cells26);
					
				} else {					

					PdfPCell cells26 = new PdfPCell(new Phrase(microraganism, bf_cjk_font));
					cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
					cells26.setBorder(Rectangle.NO_BORDER);
					Headertable.addCell(cells26); 
			 	  
				}
			}
			
			// The condition for expression "Greater Than" 
			if(expression.equals(">"))
			{
				String microraganism = "> "+list.get(pro).getTestli().get(i).getDefaultvalue();
				
				if (microraganism == null || microraganism.equalsIgnoreCase("null")|| microraganism.equalsIgnoreCase("") ||  microraganism.equalsIgnoreCase("null-") ||  microraganism.equalsIgnoreCase("-null")) {
					   
					//Headertable.addCell(new Phrase("-", tabletext));
					PdfPCell cells26 = new PdfPCell(new Phrase("-", bf_cjk_font));
					cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
					cells26.setBorder(Rectangle.NO_BORDER);
					Headertable.addCell(cells26);
				} else {
					   
					//Headertable.addCell(new Phrase("" + microraganism, tabletext));
					PdfPCell cells26 = new PdfPCell(new Phrase(microraganism, bf_cjk_font));
					cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
					cells26.setBorder(Rectangle.NO_BORDER);
					Headertable.addCell(cells26);
				}
			}
			
			// The condition for expression "Less Than" 
			if(expression.equals("<"))
			{
				String microraganism = "< "+list.get(pro).getTestli().get(i).getDefaultvalue();
				
				if (microraganism == null || microraganism.equalsIgnoreCase("null")|| microraganism.equalsIgnoreCase("") ||  microraganism.equalsIgnoreCase("null-") ||  microraganism.equalsIgnoreCase("-null")) {
					   
					//Headertable.addCell(new Phrase("-", tabletext));
					PdfPCell cells26 = new PdfPCell(new Phrase("-", bf_cjk_font));
					cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
					cells26.setBorder(Rectangle.NO_BORDER);
					Headertable.addCell(cells26);
				} else {
					   
					//Headertable.addCell(new Phrase("" + microraganism, tabletext));
					PdfPCell cells26 = new PdfPCell(new Phrase(microraganism, bf_cjk_font));
					cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
					cells26.setBorder(Rectangle.NO_BORDER);
					Headertable.addCell(cells26);
				}
			}
		}
			}else
		{
			if(biologicalReferenceChk.equalsIgnoreCase("Y")){
				
				if(valueType.equalsIgnoreCase("individual"))
				{
					if (biologicalReferenceWithNormal == null || biologicalReferenceWithNormal.equalsIgnoreCase("null")|| biologicalReferenceWithNormal.equalsIgnoreCase("") ||  biologicalReferenceWithNormal.equalsIgnoreCase("null-") ||  biologicalReferenceWithNormal.equalsIgnoreCase("-null")) {
						   
						//Headertable.addCell(new Phrase("-", tabletext));
						 PdfPCell cells26 = new PdfPCell(new Phrase("-", tabletext));
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
						 PdfPCell cells26 = new PdfPCell(new Phrase("-", tabletext));
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
			if (NormalValues == null || NormalValues.equalsIgnoreCase("null")|| NormalValues.equalsIgnoreCase("")) {
		   
		//Headertable.addCell(new Phrase("-", tabletext));
		 PdfPCell cells26 = new PdfPCell(new Phrase("-", tabletext));
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

		
		if(valueType.equalsIgnoreCase("individual"))
		{
			if (Units == null || Units.equalsIgnoreCase("null")|| Units.equalsIgnoreCase("")) {
		   
		//Headertable.addCell(new Phrase("-", tabletext));
		 PdfPCell cells26 = new PdfPCell(new Phrase("-", tabletext));
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
		 PdfPCell cells26 = new PdfPCell(new Phrase("-", tabletext));
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
		
		
				
		
		
			if(sampleTypeChk.equalsIgnoreCase("Y")){
				
				if (sampletype == null || sampletype.equalsIgnoreCase("null") || sampletype.equalsIgnoreCase("")|| sampletype.equalsIgnoreCase("-")) {				    	
				
				} else {	
					Headertable.addCell(new Phrase(" ", tabletext7));
				Headertable.addCell(new Phrase("Sample Type " +":"+sampletype, tabletext7));
				Headertable.addCell(new Phrase("", tabletext));
				Headertable.addCell(new Phrase("", tabletext));
				Headertable.addCell(new Phrase("", tabletext));	
				}	
				
			}
			
			if(testMethodChk.equalsIgnoreCase("Y")){
				
				if (methodname == null || methodname.equalsIgnoreCase("null") || methodname.equalsIgnoreCase("")|| methodname.equalsIgnoreCase("-")) {				    	
				
				} else {	
					Headertable.addCell(new Phrase("", tabletext));
				Headertable.addCell(new Phrase("Method " +": "+methodname, tabletext7));
				Headertable.addCell(new Phrase("", tabletext));
				Headertable.addCell(new Phrase("", tabletext));
				Headertable.addCell(new Phrase("", tabletext));
				}	
				
			}
			
			/* ================================================================================= */
			/* This is newly added code by ROHIT AMBAWADE for Test Comment */
			/* ================================================================================= */
			
			if (testcomments == null || testcomments.equalsIgnoreCase("null") || testcomments.equalsIgnoreCase("")|| testcomments.equalsIgnoreCase("-")) {				    	
				
			} else {	
				Headertable.addCell(new Phrase(" ", tabletext));
				Headertable.addCell(new Phrase("Test Comment " +": "+testcomments, tabletext7));
				Headertable.addCell(new Phrase("", tabletext));
				Headertable.addCell(new Phrase("", tabletext));
				Headertable.addCell(new Phrase("", tabletext));
			}	
			
			/* ================================================================================= */
			/* ================================================================================= */
			
			
			
			Headertable3.addCell(new Phrase("", tabletext));
			Headertable3.addCell(new Phrase("", tabletext));
			Headertable3.addCell(new Phrase("", tabletext));
			
			}

		 }
	 }
			
			Headertable.addCell(new Phrase("", tabletext));
			Headertable.addCell(new Phrase("", tabletext));
			Headertable.addCell(new Phrase("", tabletext));
			Headertable.addCell(new Phrase("", tabletext));
			Headertable.addCell(new Phrase("", tabletext));
			if(list.get(pro).getMachineId() > 0){
			Headertable.addCell(new Phrase("", tabletext));
			Headertable.addCell(new Phrase("Equipment", subheader));
			Headertable.addCell(new Phrase(""+list.get(pro).getMachineName(), tabletext));
			Headertable.addCell(new Phrase("", tabletext));
			Headertable.addCell(new Phrase("", tabletext));
			}
				document.add(Headertable);
				Headertable.flushContent();
		
			
			document.add(Headertable3);
			Headertable3.flushContent();
			

			// ====================================================================================
			// code added by ROHIT on 12 Oct 2022 for the Interpretation, Comments and Disclaimer
			// ====================================================================================
			PdfPTable Headertable11 = new PdfPTable(1);
			int[] HeaderWidth11 = { 100 };
			Headertable11.setWidths(HeaderWidth11);
			Headertable11.setWidthPercentage(95f);
			Headertable11.getDefaultCell().setBorder(Rectangle.NO_BORDER);			
			 
			
			/* ================================================================================ */
			/* ================================================================================ */
			            	
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
            
		 	if (list.get(pro).getInterpretationCheck().equals("Y")) {
	            
				String interpretationData = list.get(pro).getInterpretation();
				java.util.List<Element> parseHtmlToList= HTMLWorker.parseToList(new StringReader(interpretationData), styleSheet);

		 		Phrase p = new Phrase("Interpretation - ", tableheader15);
				PdfPCell celll = new PdfPCell(p);
				celll.setHorizontalAlignment(Element.ALIGN_LEFT);
				celll.setBorder(Rectangle.NO_BORDER);
				HeaderTable31.addCell(celll);
				
                for(Element e:parseHtmlToList){
                    if (e instanceof PdfPTable){
                        PdfPTable htmlTable = new PdfPTable(1);
                        int[] htmlTableWidth = {50};
                        htmlTable.setWidths(htmlTableWidth);
                        htmlTable.setWidths(htmlTableWidth);
                        htmlTable.setWidthPercentage(50f);
                        htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
                        htmlTable = (PdfPTable)e;
                        HeaderTable31.addCell(htmlTable);
                        document.add(HeaderTable31);
                        HeaderTable31.flushContent();
                    }else{
                    	paragraph.add(e);
                        cell = new PdfPCell(paragraph);
                        cell.setBorder(Rectangle.NO_BORDER);
                        HeaderTable31.addCell(cell);
                        document.add(HeaderTable31);
                        HeaderTable31.flushContent();
                        paragraph.clear();
                    }
                }
			}
			
			Headertable11.addCell(new Phrase("", tabletext));
			Headertable11.addCell(new Phrase("", tabletext));
			
			 if (list.get(pro).getCommentCheck().equals("Y")) {

					String commentData = list.get(pro).getProfileMasterComment();
					java.util.List<Element> parseHtmlToList= HTMLWorker.parseToList(new StringReader(commentData), styleSheet);

			 		Phrase p = new Phrase("Comments - ", tableheader15);
					PdfPCell celll = new PdfPCell(p);
					celll.setHorizontalAlignment(Element.ALIGN_LEFT);
					celll.setBorder(Rectangle.NO_BORDER);
					HeaderTable31.addCell(celll);
					
	                for(Element e:parseHtmlToList){
	                    if (e instanceof PdfPTable){
	                        PdfPTable htmlTable = new PdfPTable(1);
	                        int[] htmlTableWidth = {50};
	                        htmlTable.setWidths(htmlTableWidth);
	                        htmlTable.setWidths(htmlTableWidth);
	                        htmlTable.setWidthPercentage(50f);
	                        htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	                        htmlTable = (PdfPTable)e;
	                        HeaderTable31.addCell(htmlTable);
	                        document.add(HeaderTable31);
	                        HeaderTable31.flushContent();
	                    }else{
	                    	paragraph.add(e);
	                        cell = new PdfPCell(paragraph);
	                        cell.setBorder(Rectangle.NO_BORDER);
	                        HeaderTable31.addCell(cell);
	                        document.add(HeaderTable31);
	                        HeaderTable31.flushContent();
	                        paragraph.clear();
	                    }
	                }
			 }
			
			Headertable11.addCell(new Phrase("", tabletext));
			Headertable11.addCell(new Phrase("", tabletext));
			
			 if (list.get(pro).getDisclaimerCheck().equals("Y")) {

				String disclaimerData = list.get(pro).getDisclaimer();
				java.util.List<Element> parseHtmlToList= HTMLWorker.parseToList(new StringReader(disclaimerData), styleSheet);

		 		Phrase p = new Phrase("Disclaimer - ", tableheader15);
				PdfPCell celll = new PdfPCell(p);
				celll.setHorizontalAlignment(Element.ALIGN_LEFT);
				celll.setBorder(Rectangle.NO_BORDER);
				HeaderTable31.addCell(celll);
				
                for(Element e:parseHtmlToList){
                    if (e instanceof PdfPTable){
                        PdfPTable htmlTable = new PdfPTable(1);
                        int[] htmlTableWidth = {50};
                        htmlTable.setWidths(htmlTableWidth);
                        htmlTable.setWidths(htmlTableWidth);
                        htmlTable.setWidthPercentage(50f);
                        htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
                        htmlTable = (PdfPTable)e;
                        HeaderTable31.addCell(htmlTable);
                        document.add(HeaderTable31);
                        HeaderTable31.flushContent();
                    }else{
                    	paragraph.add(e);
                        cell = new PdfPCell(paragraph);
                        cell.setBorder(Rectangle.NO_BORDER);
                        HeaderTable31.addCell(cell);
                        document.add(HeaderTable31);
                        HeaderTable31.flushContent();
                        paragraph.clear();
                    }
                }
			 }
			
			document.add(Headertable11);
			Headertable11.flushContent();
			
			
			
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
		     PdfPTable HeaderTableTechN = new PdfPTable(5);
		    int[] headerwidth51 = { 30, 0, 15, 0, 25 };
		    HeaderTableTechN.setWidths(headerwidth51);
		    HeaderTableTechN.setWidthPercentage(95f);
	        HeaderTableTechN.getDefaultCell().setBorder(Rectangle.BOTTOM);

	        HeaderTableTechN.addCell(new Phrase("", subheader));
	        HeaderTableTechN.addCell(new Phrase("", header));
	        HeaderTableTechN.addCell(new Phrase("", subheader));
	        HeaderTableTechN.addCell(new Phrase("", header));
	        HeaderTableTechN.addCell(new Phrase("",subheader));
	        HeaderTableTechN.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		    HeaderTableTechN.addCell(new Phrase("", subheader));
	        HeaderTableTechN.addCell(new Phrase("", header));
	        HeaderTableTechN.addCell(new Phrase("", subheader));
	        HeaderTableTechN.addCell(new Phrase("", header));
	   	    HeaderTableTechN.addCell(new Phrase("",subheader));
	   	
	    	String postTime="";
	     	String postDate="";
	    	String postdate1 = list.get(0).getPostdate();
		if (postdate1 != null) {
	        postdate1 = list.get(0).getPostdate();
	        String[] wordspostddate=postdate1.split(" ");				
	
	        postDate=wordspostddate[0];
	        postTime=wordspostddate[1];
		
	        String[] postDateddmmyy=postDate.split("-");				
	 	
	        StringBuffer fd2 = new StringBuffer();
	        fd2.append(postDateddmmyy[2]+"-"+postDateddmmyy[1]+"-"+postDateddmmyy[0]);			
		
	        String postDateddmmyy1=fd2.toString();				
	        postdate=postDateddmmyy1+" "+ postTime;
		} else {
	        postdate1 = "-";
		}
		    String Name="Name:"+patientName;
		    String Reportdate="Report date:"+postDate;
		    String Reportime="Report time:"+postTime;
		    String LabName="Lab Name:"+hospitalName+","+address+","+state+","+city+","+hospitalZip+"";
		    String PatientID="Patient ID:"+barcodenumber;
		    
		    String pNameSplit="";
		    if(Name.contains(",")){
		    	 String[] NameSplit=Name.split(",");	    	
		    	 pNameSplit=NameSplit[1];
		    }else{
		    	 pNameSplit=patientName;
		    }
		    
		    System.out.println(Name +"--"+pNameSplit);
		    
		    String pNameee = pNameSplit.replaceAll("\\s", "");
		    
		    System.out.println(pNameee );
		    
		    String ReportUrlSmsLinkk = (String) resource.getObject("ReportUrlSmsLink").toString();	    
		    final String labReportPath = ReportUrlSmsLinkk+"/LabResultPdf/" + File.separator +
		    		masterIdd + File.separator + pNameee + File.separator +pNameee+".pdf";
			String filePath = labReportPath.replace("\\", "/");
		    
		   
	       //Step -6: Construct one final calendar string with new line separator		   
	       // String finala= Name+"\r\n"+Reportdate+"\r\n"+Reportime+"\r\n"+ LabName+"\r\n"+PatientID;
	        String finala= filePath;		          			    
		    //Step -7: Invoke BarcodeQRCode class to create QR Code for the calendar
	        BarcodeQRCode my_code = new BarcodeQRCode(finala, 1, 1, null);
	         //Step-8: Read output QR Code calendar object into an image		           		            
	        //  com.itextpdf.text.Image qr_image = my_code.getImage();        
		    java.awt.Image awtImage = my_code.createAwtImage(Color.BLACK, Color.WHITE);			    			                
		    img = com.lowagie.text.Image.getInstance(awtImage, null);
		    img.scaleAbsolute(60,60);
		    img.scaleAbsoluteHeight(60);
		    PdfPCell QrCodecell = null;
	                     QrCodecell = new PdfPCell();
	                     QrCodecell.addElement(new Chunk(img, 1, -45));
	                     QrCodecell.setBorder(Rectangle.NO_BORDER);
	                     
	                     
	         
	     	String lName=labName;
	     	String labMale=rtd.getGender();		     			   
	     	if(labMale.equals("Male"))
	     	{
	     		labMale="1";
	     	}else if(labMale.equals("Female"))
	     	{
	     		labMale="2";
	     	}else if(labMale.equals("Other"))
	        {
	     		labMale="3";
	     	}			    			    
	     	String labFristName=rtd.getF_name().toUpperCase();
	     	String labFName="";
	        String fNo=String.format("%02d", labFristName.length());
	     	if(labFristName.length()>03){
	     		labFName=labFristName.substring(0,2)+""+fNo+""+labFristName.substring(labFristName.length()-1,labFristName.length());
	     	}else{
	           	labFName=String.format("%-5s", labFristName).replace(' ', '#');		           
	     	}		     			    			 			    
	     	String labLastName=rtd.getL_name().toUpperCase();
	     	String lNo=String.format("%02d", labLastName.length());
	     	String labLName="";
	     	if(labLastName.length()>03){
	     	    labLName=labLastName.substring(0,2)+""+lNo+""+labLastName.substring(labLastName.length()-1,labLastName.length());
	     	}else{
	        	labLName=String.format("%-5s", labLastName).replace(' ', '#');		           
	        }		     			    
	     	String colletiondate=rtd.getCollectionDate();
	     	String[] splitDateCReg=rtd.getCollectionDate().split("/");								
	     	String dd=splitDateCReg[0];
	     	String mm=splitDateCReg[1];
	     	String yy=splitDateCReg[2];						
	     	StringBuffer fd = new StringBuffer();
	     	fd.append(mm+yy+dd);								
	     	String regCollectDate=fd.toString();		     				
	     	
	     	String labpAge="";
	    	String[] lAge=rtd.getAge().split("Y");		    	
	    	String labPatientAge=lAge[0];
	    	if(labPatientAge.length()>2)
	    	{
	    		labpAge=labPatientAge;
	    	}else
	    	{
	    		labpAge=0+""+(labPatientAge);	
	    	}		    		
	    	
	    	String ddp = "00";
	     	String mmp = "00";
	     	String yyp = "0000";
	    	if(!(postdate.equalsIgnoreCase("-"))){
	    		String[] postDateddmmyy = postDate.split("-");
		    	ddp = postDateddmmyy[0];
		     	mmp = postDateddmmyy[1];
		     	yyp = postDateddmmyy[2];
	    	}	
	     	
	     	String labQRCode=lName+labMale+labFName+regCollectDate+labpAge+labLName+mmp+yyp+ddp;		     				
	     	//System.out.println(labReportingDate+"labReportingDate");
	                     
	        BarcodeQRCode my_code1 = new BarcodeQRCode(labQRCode, 1, 1, null);
	 		       //Step-8: Read output QR Code calendar object into an image		           		            
	 		       //com.itextpdf.text.Image qr_image1 = my_code1.getImage();        
	 	    java.awt.Image awtImage1 = my_code1.createAwtImage(Color.BLACK, Color.WHITE);			    
	 			               
	 	    imgFQRcode = com.lowagie.text.Image.getInstance(awtImage1, null);
	 	    imgFQRcode.scaleAbsolute(60,60);
	 	    imgFQRcode.scaleAbsoluteHeight(60);
	 		PdfPCell QrCodecell1 = null;
	 		         QrCodecell1 = new PdfPCell();
	 		        // QrCodecell1.addElement(new Chunk(imgFQRcode, 1, -45));		 		         
	 		         QrCodecell1.setBorder(Rectangle.NO_BORDER);
	    	
	 	    String fActive = "";				
		    String fActive1 = FilePath.getBasePath();
		    fActive = fActive1 + "fActiveImg.jpg";
		
			Image fActiveImg = null;
			PdfPCell fActiveImgCell = null;
			fActiveImg = Image.getInstance(fActive);
			fActiveImg.scaleAbsolute(60,60);
			fActiveImg.scaleAbsoluteHeight(60);
		
		
			fActiveImgCell = new PdfPCell();
			fActiveImgCell.addElement(new Chunk(fActiveImg, 1, -45));
			fActiveImgCell.setBorder(Rectangle.NO_BORDER);
	 	    
	 	    
	    HeaderTableTechN.addCell(new Phrase("Please scan this QR Code for Validation", subheaderUNDERLINE));
	   	HeaderTableTechN.addCell(new Phrase("", header));
	   	HeaderTableTechN.addCell(new Phrase("", subheader));
	   	HeaderTableTechN.addCell(new Phrase("", header));
	   	HeaderTableTechN.addCell(new Phrase("Scan this QR Code with FACTIVE\u2122 App ",subheaderUNDERLINE));
	  
	  	HeaderTableTechN.addCell(new Phrase("", header));
	   	HeaderTableTechN.addCell(new Phrase("", header));
	   	HeaderTableTechN.addCell(new Phrase("", subheader));
	   	HeaderTableTechN.addCell(new Phrase("", header));
	   	HeaderTableTechN.addCell(new Phrase("",subheader));
		//document.add(HeaderTableTechN);
		//HeaderTableTechN.flushContent();
		
	   	PdfPTable HeaderfActive = new PdfPTable(5);
	    int[] headerfActive = {8, 42, 0, 10, 18};
	    HeaderfActive.setWidths(headerfActive);
	    HeaderfActive.setWidthPercentage(95f);
	    HeaderfActive.getDefaultCell().setBorder(Rectangle.NO_BORDER);
       
	    HeaderfActive.addCell(new Phrase("", header));
	    HeaderfActive.addCell(QrCodecell);
	    HeaderfActive.addCell(new Phrase("", subheader));				   	
	   	if (fActiveImgCell == null) {				
	   		HeaderfActive.addCell(new Phrase("", header));
		} else {				
			//HeaderfActive.addCell(fActiveImgCell);
			HeaderfActive.addCell(new Phrase("", header));
		}						   	
	  // 	HeaderfActive.addCell(QrCodecell1);		
	   	//document.add(HeaderfActive);
	  	//HeaderfActive.flushContent();
	   	
	   	PdfPTable HeaderTableInLebal = new PdfPTable(5);
	    int[] headerwidthLebal = { 30, 0, 15, 0, 25 };
	    HeaderTableInLebal.setWidths(headerwidthLebal);
	    HeaderTableInLebal.setWidthPercentage(95f);
	    HeaderTableInLebal.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("",subheader));
  	
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("",subheader));
	    
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("",subheader));
	    
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("",subheader));
	    
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("",subheader));
	    
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("",subheader));
	    
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("",subheader));
	    
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("",subheader));
	    
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("",subheader));
	    
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("",subheader));
	    
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	    HeaderTableInLebal.addCell(new Phrase("",subheader));
	    
	    HeaderTableInLebal.addCell(new Phrase("", subheader));
	    HeaderTableInLebal.addCell(new Phrase("", header));
	   	HeaderTableInLebal.addCell(new Phrase("", subheader));
	   	HeaderTableInLebal.addCell(new Phrase("", header));
	   	HeaderTableInLebal.addCell(new Phrase("Facility & Report Verified By FACTIVE"+"\u2122",tabletext));
       
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