<%@page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.TempEventHandlerLISEmailPDF"%>
<%@page import="java.awt.Toolkit"%>
<%@page import="java.awt.Color"%>
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
			String SARSCOV2ANTIGEN = (String) resource.getObject("SARSCOV2ANTIGEN").toString();			
			String COVID19RNAAMPLIFICATION = (String) resource.getObject("COVID19RNAAMPLIFICATION").toString();
			String REALTIMEHEPATITISCVIRUSHCV = (String) resource.getObject("REALTIMEHEPATITISCVIRUSHCV").toString();
			String REALTIMETRUENAT = (String) resource.getObject("REALTIMETRUENAT").toString();
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
			
			Document document = new Document(PageSize.A4);
			document.setMargins(20, 20, 20, 20);
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
			request.setAttribute("headerFlag", "Yes");
			request.setAttribute("covide", "Yes");
			String patientName = request.getParameter("patientName");
			request.setAttribute("pageIteration", 0);
			String ppName=patientName.replaceAll(",", ".");
			response.setHeader("Content-Disposition", "inline; filename="+ppName+".pdf");	
			
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
			
			Phlebotomyservice phlebotomyservice = (ApplicationContextUtils.getApplicationContext()).getBean(Phlebotomyservice.class);
			List<PathologySampleWiseMaster> list = phlebotomyservice.getRoutinevalueResutlusingPrint(masterIdd, treatmentId, patientType, unitId, request);
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
			//TempEventHandlerLISPDF event = new TempEventHandlerLISPDF();
			//TempEventHandlerLISEmailPDF event = new TempEventHandlerLISEmailPDF();
			
			//pdfWriter.setPageEvent(event);

		
			String reportFooterAddress = "";// hospObj.getReportFooterAddress();
			if(reportFooterAddress.equalsIgnoreCase(null) || reportFooterAddress.equalsIgnoreCase("") || reportFooterAddress == null)
				{
				reportFooterAddress="1 of ";			
				}
			
			// adding footer information//
			 Font smallNew = new Font(Font.HELVETICA, 10, Font.BOLD);
			smallNew.setSize(8);
			//String hospitaladdress1 = "Processed at: 12th FLOOR-D WING , TRADE WORLD, KAMALA MILLS, LOWER PAREL, MUMBAI- 400013";
			String hospitaladdress1=reportFooterAddress;
			HeaderFooter footerNew = new HeaderFooter(new Phrase(hospitaladdress1, smallNew), true);
			footerNew.setPageNumber(1);
			footerNew.setAlignment(Element.ALIGN_RIGHT);
			footerNew.setBorderWidthBottom(0);
			document.setFooter(footerNew);
			// ending footer information//	
			
			document.open();		
			String path = hospObj.getFilePath();
			String nabh = hospObj.getNabhImagePath();
			String hospitalName = hospObj.getHospitalName();
			hospitalName = hospitalName.toUpperCase();
			String address = hospObj.getHospitalAddress();
			String city = hospObj.getHospitalCity();
			String state = hospObj.getHospitalState();
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

		

			/* cell = new PdfPCell();
			cell.addElement(new Chunk(img, 1, -45));
			cell.setBorder(Rectangle.NO_BORDER);

			Image imgNabh = null;
			PdfPCell cellNabh = null;

			imgNabh = Image.getInstance(nabhLogo);
			imgNabh.scaleAbsolute(80, 60);
			cellNabh = new PdfPCell();
			cellNabh.addElement(new Chunk(imgNabh, 5, -5));
			cellNabh.setBorder(Rectangle.NO_BORDER); */

			java.util.Calendar currentDate = Calendar.getInstance();
			SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss a");
			String curr_date = dateformatter.format(currentDate.getTime());
			NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");

		
			
			PdfPTable Headertable3 = new PdfPTable(3);
			int[] HeaderWidth3 = { 0,100,0 };
			Headertable3.setWidths(HeaderWidth3);
			Headertable3.setWidthPercentage(95f);
			Headertable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);			

				PdfPTable Headertable1 = new PdfPTable(1);
				int[] HeaderWidth1 = { 100 };
				Headertable1.setWidths(HeaderWidth1);
				Headertable1.setWidthPercentage(95f);
				Headertable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
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
				
		 
		   /* if(SARSCOV2ANTIGENID.equals(list.get(pro).getProfileId()))				   
		   {
			   int[] HeaderWidth1 = { 30, 60,10 };
		Headertable1.setWidths(HeaderWidth1);
		Headertable1.setWidthPercentage(95f);
		Headertable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		   }else if(COVID19RNAAMPLIID.equals(list.get(pro).getProfileId())){
			   int[] HeaderWidth1 = { 22, 60,10 };
		Headertable1.setWidths(HeaderWidth1);
		Headertable1.setWidthPercentage(95f);
		Headertable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		   }else
			{
		int[] HeaderWidth1 = { 10, 65,10 };
		Headertable1.setWidths(HeaderWidth1);
		Headertable1.setWidthPercentage(95f);
		Headertable1.getDefaultCell().setBorder(Rectangle.NO_BORDER); 
			} */	
		     	 
			proname = list.get(pro).getProfileName();
			pkgname = list.get(pro).getPkgName();
			proId=list.get(pro).getProfileId();
			String Profile = proname;
			
		     //Headertable1.addCell(new Phrase(""+Profile, header1));
		     PdfPCell cells32 = new PdfPCell(new Phrase(Profile, headerUnderline));
			 cells32.setHorizontalAlignment(Element.ALIGN_CENTER);
			 cells32.setBorder(Rectangle.NO_BORDER);
			 Headertable1.addCell(cells32);
			 		
			document.add(Headertable1);
			Headertable1.flushContent();
			
			
		  
		PdfPTable Headertable = new PdfPTable(4);
		int[] HeaderWidth = { 0, 40, 15, 45 };
		Headertable.setWidths(HeaderWidth);
		Headertable.setWidthPercentage(95f);
		Headertable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		
		PdfPTable HeadertableT = new PdfPTable(1);
		int[] HeaderWidthT = { 100 };
		HeadertableT.setWidths(HeaderWidthT);
		HeadertableT.setWidthPercentage(95f);
		HeadertableT.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
			

		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		
		//Headertable.getDefaultCell().setBorder(Rectangle.TOP);
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		

		//Headertable.getDefaultCell().setBorder(Rectangle.BOTTOM);
		Headertable.addCell(new Phrase("", tabletext));
		
		PdfPCell cells24 = new PdfPCell(new Phrase("Investigation", tableheader14));
		cells24.setHorizontalAlignment(Element.ALIGN_LEFT);
		cells24.setBorder(Rectangle.NO_BORDER);
		Headertable.addCell(cells24);
		
		PdfPCell cells27 = new PdfPCell(new Phrase("Result", tableheader14));
		cells27.setHorizontalAlignment(Element.ALIGN_CENTER);
		cells27.setBorder(Rectangle.NO_BORDER);
		Headertable.addCell(cells27);
		
		Headertable.addCell(new Phrase("", tabletext));
		
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		
		
		List testidcheck = new ArrayList();
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
		
		for ( int ts1 = 0; ts1 < testidcheck.size(); ts1++) {
	
	     if(testidcheck.get(ts1) == (Integer)list.get(pro).getTestli().get(i).getTestId()){
		      isTestIdAbsent = false;			
		      break;
	    }
		}
		if(isTestIdAbsent)
	    testidcheck.add(list.get(pro).getTestli().get(i).getTestId());			

		if(isTestIdAbsent){
		
		String TestName = list.get(pro).getTestli().get(i).getTestName();
		String TestResult = list.get(pro).getTestli().get(i).getTestresult();
		String LowValues = list.get(pro).getTestli().get(i).getLowvalue();
		String HighValues = list.get(pro).getTestli().get(i).getHighvalue();
		//added by Rohit on 12-09-2021
		String flagRemark = list.get(pro).getTestli().get(i).getFlagmark();
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
		
		String microraganism =list.get(pro).getTestli().get(i).getExpression()+list.get(pro).getTestli().get(i).getDefaultvalue();		
		String testcomments=list.get(pro).getTestli().get(i).getTestComments();		
		String testinterpretation=list.get(pro).getTestli().get(i).getTestInterpretation();
		String microflag=list.get(pro).getTestli().get(i).getMicroorganism();
		String sampletype=list.get(pro).getTestli().get(i).getSamplename();
		String flagmarkResult=list.get(pro).getTestli().get(i).getFlagmark();
		
		String microReason=list.get(pro).getTestli().get(i).getMicroreason();
		
		String quantitative=list.get(pro).getTestli().get(i).getQuantitative();
		
		String valueType=list.get(pro).getTestli().get(i).getTestType();
		String unitNameGenaral=list.get(pro).getTestli().get(i).getUnitNameGenaral();
		
		
		
		Headertable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		Headertable.addCell(new Phrase("", tabletext));

		if (TestName != null) {
	    
	    Headertable.addCell(new Phrase("" + TestName, tableheader13));
		
		} else {
		       	
	    Headertable.addCell(new Phrase("-", tabletext));
		}
		 
		if (TestResult == null || TestResult.equalsIgnoreCase("null")|| TestResult.equalsIgnoreCase("") || TestResult.equalsIgnoreCase("-")) {
	   
	    Headertable.addCell(new Phrase("-", tabletext));
		}else if(HighValues==null || HighValues.equalsIgnoreCase("") || LowValues==null || LowValues.equalsIgnoreCase("") ){
	
			//below if-else condition added by Rohit on 12-09-2021
			if(flagRemark.equalsIgnoreCase("Positive")){
				PdfPCell cells26 = new PdfPCell(new Phrase(""+TestResult, tableheader13));
				cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
				cells26.setBorder(Rectangle.NO_BORDER);
				Headertable.addCell(cells26);
			}
			else{
			PdfPCell cells26 = new PdfPCell(new Phrase(""+TestResult, tabletext));
			cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
			cells26.setBorder(Rectangle.NO_BORDER);
			Headertable.addCell(cells26);
			}
		}else {
	
	    String string = TestResult;
	
	    boolean numeric = true;

	    try {
	            Double num = Double.parseDouble(string);
	          } catch (NumberFormatException e) {
	            numeric = false;
	        }

	     if(numeric)
	     {
	        if (Double.parseDouble(TestResult) < Double.parseDouble(LowValues)|| Double.parseDouble(TestResult) > Double.parseDouble(HighValues)) {
	             //Headertable.addCell(new Phrase("" + TestResult + "*", tableheader13));
	        	Headertable.addCell(new Phrase("" + TestResult, tableheader13)); // Here * removed by vinod
		  }else
		  {
		        Headertable.addCell(new Phrase("" + TestResult, tabletext));
		  }
	     }else
	     {
	        	Headertable.addCell(new Phrase("" + TestResult, tabletext));
	     }
		}
		
		
		
	 }
		Headertable.addCell(new Phrase("" , tabletext));
		
		}
		
	}	
		
		String sampletype1=list.get(pro).getTestli().get(0).getSamplename();
		String[] arrOfStr = sampletype1.split("-"); 
	    String Samplename=arrOfStr[0];
		if (list.get(pro).getTestli().get(0).getSamplename() == null || list.get(pro).getTestli().get(0).getSamplename().equalsIgnoreCase("null")|| list.get(pro).getTestli().get(0).getSamplename().equalsIgnoreCase("") || list.get(pro).getTestli().get(0).getSamplename().equalsIgnoreCase("-")) {

			HeadertableT.addCell(new Phrase("SPECIMEN :" , tabletext7));
			Headertable.addCell(new Phrase("" , tabletext));
			}else
			{
				HeadertableT.addCell(new Phrase("SPECIMEN : "+Samplename , tabletext7));
				Headertable.addCell(new Phrase("" , tabletext));
			}	
		//HeadertableT.addCell(new Phrase("" , tabletext));
		HeadertableT.addCell(new Phrase("METHOD : "+list.get(pro).getTestli().get(0).getMethodename() , tabletext7));
		Headertable.addCell(new Phrase("" , tabletext));
		
		//HeadertableT.addCell(new Phrase("" , tabletext));
		if(SARSCOV2ANTIGENID.equals(list.get(pro).getProfileId()) || COVID19RNAAMPLIID.equals(list.get(pro).getProfileId())){
			HeadertableT.addCell(new Phrase(" " , tabletext));
			HeadertableT.addCell(new Phrase(" " , tabletext));
		}else
		{
			if (list.get(pro).getKitSpecId() == null || list.get(pro).getKitSpecId().equalsIgnoreCase("null")|| list.get(pro).getKitSpecId().equalsIgnoreCase("") || list.get(pro).getKitSpecId().equalsIgnoreCase("-")) {

				HeadertableT.addCell(new Phrase("KIT SPECIFICATION :     -" , tabletext7));
				HeadertableT.addCell(new Phrase("-" , tabletext));
				}else
				{
				HeadertableT.addCell(new Phrase("KIT SPECIFICATION : "+list.get(pro).getKitSpecId() , tabletext7));
				HeadertableT.addCell(new Phrase(" " , tabletext));
					
				}	
		}	
		
		//HeadertableT.addCell(new Phrase("" , tabletext));
		if (list.get(pro).getInterpretation().equalsIgnoreCase("-")) {
			 HeadertableT.addCell(new Phrase("CLINICAL INTERPRETATION :     ", tabletext));	
			 HeadertableT.addCell(new Phrase(" ", tabletext));
		
		 }else
		 {
			 HeadertableT.addCell(new Phrase("CLINICAL INTERPRETATION :      \n"+list.get(pro).getInterpretation() , tabletext));
			 HeadertableT.addCell(new Phrase("", tabletext));
		 }
	
		//HeadertableT.addCell(new Phrase("" , tabletext));
		
		document.add(Headertable);
		Headertable.flushContent();

		document.add(HeadertableT);
		HeadertableT.flushContent();
	  
	
		
		}
		
		
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
		/* if (hospObj.getIcmrRegNo() == null || hospObj.getIcmrRegNo().equalsIgnoreCase("null") || hospObj.getIcmrRegNo().equalsIgnoreCase("")|| hospObj.getIcmrRegNo().equalsIgnoreCase("-")) {				    	
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
		} */	
		
		
		//HeaderTableN1.getDefaultCell().setBorder(Rectangle.BOTTOM);
		
		HeaderTableN1.addCell(new Phrase("", subheader));
		HeaderTableN1.addCell(new Phrase("", header));
		HeaderTableN1.addCell(new Phrase("", subheader));
		HeaderTableN1.addCell(new Phrase("", header));
		HeaderTableN1.addCell(new Phrase("",subheader));
	   	
	
	   	document.add(HeaderTableN1);
	   	HeaderTableN1.flushContent();
	  /*  	
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
	
	   	document.add(HeaderTableTechN);
	   	HeaderTableTechN.flushContent(); */
				
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
	    
	    String pName = pNameSplit.replaceAll("\\s", "");
	    String ReportUrlSmsLink = (String) resource.getObject("ReportUrlSmsLink").toString();	    
	    final String labReportPath = ReportUrlSmsLink+"/LabResultPdf/" + File.separator +
	    		masterIdd + File.separator + pName + File.separator +pName+".pdf";
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
    	//System.out.println(labpAge+"labpAge");
    	
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
 		         QrCodecell1.addElement(new Chunk(imgFQRcode, 1, -45));		 		         
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
   	HeaderTableTechN.addCell(new Phrase("--End Of Report--", subheader));
   	HeaderTableTechN.addCell(new Phrase("", header));
   	HeaderTableTechN.addCell(new Phrase("Scan this QR Code with FACTIVE\u2122 App ",subheaderUNDERLINE));
  
  	HeaderTableTechN.addCell(new Phrase("", header));
   	HeaderTableTechN.addCell(new Phrase("", header));
   	HeaderTableTechN.addCell(new Phrase("", subheader));
   	HeaderTableTechN.addCell(new Phrase("", header));
   	HeaderTableTechN.addCell(new Phrase("",subheader));
	document.add(HeaderTableTechN);
	HeaderTableTechN.flushContent();
	
   	PdfPTable HeaderfActive = new PdfPTable(5);
    int[] headerfActive = { 8, 42, 0, 10, 18 };
    HeaderfActive.setWidths(headerfActive);
    HeaderfActive.setWidthPercentage(95f);
    HeaderfActive.getDefaultCell().setBorder(Rectangle.NO_BORDER);
    
    HeaderfActive.addCell(new Phrase("", header));
    HeaderfActive.addCell(QrCodecell);
    HeaderfActive.addCell(new Phrase("", subheader));				   	
   	if (fActiveImgCell == null) {				
   		HeaderfActive.addCell(new Phrase("", header));
	} else {				
		HeaderfActive.addCell(fActiveImgCell);
	}						   	
   	HeaderfActive.addCell(QrCodecell1);		
   	document.add(HeaderfActive);
   	HeaderfActive.flushContent();
   	
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
    
	document.add(HeaderTableInLebal);
	HeaderTableInLebal.flushContent();
	// Ending QR code //

	//signature
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
			
			Image img124 = null;
			PdfPCell cell13 = null;
			img124 = Image.getInstance(path22);
			img124.scaleAbsolute(80, 80);
			img124.scaleAbsoluteHeight(70);
			
			
			cell13 = new PdfPCell();
			//-45
			cell13.addElement(new Chunk(img124, 1, -200));
			cell13.setBorder(Rectangle.NO_BORDER);

			
			String path23 = "";				
			String pathToWeb2 = FilePath.getBasePath();
			path23 = pathToWeb2 + "Dr-Disha.jpg";
				
			Image img125 = null;
			PdfPCell cell14 = null;
			img125 = Image.getInstance(path23);
			img125.scaleAbsolute(100, 30);
				
				
			cell14 = new PdfPCell();
			//-45
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
	     	//-45
		    cell15.addElement(new Chunk(img126, 1, -45));
		    cell15.setBorder(Rectangle.NO_BORDER);
		
	           
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
		Headertable2.addCell(new Phrase("", footer));	
		Headertable2.addCell(new Phrase(" Dr.Disha Sharma", footer));
		
		//Headertable2.addCell(new Phrase(" PhD", tabletext));  
		Headertable2.addCell(new Phrase(" PhD", tabletext));
		Headertable2.addCell(new Phrase("", tabletext));
		Headertable2.addCell(new Phrase(" MD", tabletext));
		
		//Headertable2.addCell(new Phrase(" Sr.Scientific Officer", footer));  
		Headertable2.addCell(new Phrase(" Consultant Molecular Biologist", footer));
		Headertable2.addCell(new Phrase("", footer));	
		Headertable2.addCell(new Phrase(" Consultant Microbiologist", footer));
		
		//Added by KishoR for set location of this table to fixed bottom.
		Headertable2.setTotalWidth(document.right(document.rightMargin()) - document.left(document.leftMargin()));
		Headertable2.writeSelectedRows(0, -1, document.left(document.leftMargin()), Headertable2.getTotalHeight() + document.bottom(document.bottomMargin() + 20), pdfWriter.getDirectContent());		
		//document.add(Headertable2);		
		Headertable2.flushContent();
	}else{
		//signature
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
		
		
		
		//Added by KishoR for set location of this table to fixed bottom.
		Headertable2.setTotalWidth(document.right(document.rightMargin()) - document.left(document.leftMargin()));
		Headertable2.writeSelectedRows(0, -1, document.left(document.leftMargin()), Headertable2.getTotalHeight() + document.bottom(document.bottomMargin() - 10), pdfWriter.getDirectContent());		
		//document.add(Headertable2);		
		Headertable2.flushContent();
	}
			 
			
			
		 
			

	

		document.close();
		outStream.close();
		outStream.flush();
	} catch (Exception e) {
		e.printStackTrace();
	}
%>
</body>
</html>