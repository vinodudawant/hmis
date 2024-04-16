<%@page import="com.hms.TempEventHandlerLISPDF"%>
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
			Integer covidReportId=Integer.parseInt(CovidReportProfileId);
			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			
		
			
			Font header = new Font(Font.HELVETICA, 10, Font.BOLD);
			Font subheader = new Font(Font.HELVETICA, 8, Font.BOLD);
			Font footer = new Font(Font.HELVETICA, 8, Font.BOLD);
			header.setColor(10, 4, 2);
			Font tableheader22 = new Font(Font.HELVETICA, 20, Font.BOLD);
			Font tableheader11 = new Font(Font.HELVETICA, 12, Font.BOLD);
			Font tableheader111 = new Font(Font.HELVETICA, 12, Font.BOLD);
			Font tableheader12 = new Font(Font.COURIER, 12, Font.BOLD);
			Font tableheader13 = new Font(Font.HELVETICA, 9, Font.BOLD);
			Font tableheader = new Font(Font.HELVETICA, 12, Font.BOLD);
			Font tabletext = new Font(Font.HELVETICA, 8, Font.NORMAL);
			Font small = new Font(Font.HELVETICA, 8, Font.NORMAL);
			Image img = null;
			PdfPCell cell = null;
			
			HttpSession session1 = request.getSession();
			String user_name = (String) session1.getAttribute("userName");
			Integer userId = (Integer) session1.getAttribute("userId");
			Integer unitId = (Integer) session1.getAttribute("uId");
			int treatmentId=Integer.parseInt(request.getParameter("treatmentId"));
			String idTreatment=request.getParameter("treatmentId");
			
			String masterIdd=request.getParameter("masterIdd");
			String patientType=request.getParameter("gender");
			
			String emailTo=request.getParameter("emailTo");
			String emailCC=request.getParameter("emailCC");
			String massageId=request.getParameter("massageId");
			String patientName=request.getParameter("patientName");
			request.setAttribute("headerFlag", "Yes");
			request.setAttribute("pageIteration", 0);
			
			final String DEST = FilePath.getLabReportPath() + File.separator + masterIdd + File.separator + treatmentId + File.separator +"Lab-Report.pdf";    
			     	File file = new File(DEST);
			     	file.getParentFile().mkdirs();
			      	Document document = new Document(PageSize.A4);
			      	document.setMargins(20, 20, 40, 40);
			    		
			        FileOutputStream fos = new FileOutputStream(DEST);
			        PdfWriter writer = PdfWriter.getInstance(document,fos);
			    	TempEventHandlerLISPDF event = new TempEventHandlerLISPDF();
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
			rtd = uss.fetchPatientsRecordByTreatmentId(treatmentId);
			rtd = rtd.getListRegTreBillDto().get(0);
			List<Assessment> listAssessment = treatmentModel.fetchAssessment(idTreatment);

			Phlebotomyservice phlebotomyservice = (ApplicationContextUtils.getApplicationContext()).getBean(Phlebotomyservice.class);
			List<PathologySampleWiseMaster> list = phlebotomyservice.getRoutinevalueResutlusingPrint(masterIdd, treatmentId,patientType,unitId, request);
			String barcodenumber=list.get(0).getBarCode();			
			String collecteddate=list.get(0).getCollecteddate();			
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
			if(postId > 0)
				request.setAttribute("postId", postId); // added by vinod
			else
				request.setAttribute("postId", authoId); // added by vinod
			//System.out.println(collecteddate+postdate);
			/* --------------------------------------End All Services -------------------------------------------   */
		     
			PdfWriter pdfWriter = PdfWriter.getInstance(document, outStream);

		
			// adding footer information//
			Font smallNew = new Font(Font.HELVETICA, 10, Font.BOLD);
			smallNew.setSize(8);
			String hospitaladdress1 = "Processed at: 12th FLOOR-D WING , TRADE WORLD, KAMALA MILLS, LOWER PAREL, MUMBAI- 400013";
			HeaderFooter footerNew = new HeaderFooter(new Phrase(hospitaladdress1, smallNew), true);
			footerNew.setPageNumber(1);
			footerNew.setAlignment(Element.ALIGN_CENTER);
			footerNew.setBorderWidthBottom(0);
			document.setFooter(footerNew);
			// ending footer information//		
			
			document.open();		
			String path = hospObj.getFilePath();
			String hospitalName = hospObj.getHospitalName();
			hospitalName = hospitalName.toUpperCase();
			String address = hospObj.getHospitalAddress();
			String city = hospObj.getHospitalCity();
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
			if (lntUnit.equalsIgnoreCase("1")) {
		String pathToWeb1 = FilePath.getBasePath();
		path1 = pathToWeb1 + "U1_L&T_community_HMI_screen_ahmednagar.jpg";
			} else if (lntUnit.equalsIgnoreCase("2")) {
		String pathToWeb1 = FilePath.getBasePath();
		path1 = pathToWeb1 + "U2_L&T_community_HMI_screen_andheri.jpg";
			} else if (lntUnit.equalsIgnoreCase("3")) {
		String pathToWeb1 = FilePath.getBasePath();
		path1 = pathToWeb1 + "U3_L&T_community_HMI_screen_chennai.jpg";
			} else if (lntUnit.equalsIgnoreCase("4")) {
		String pathToWeb1 = FilePath.getBasePath();
		path1 = pathToWeb1 + "U4_L&T_community_HMI_screen_coimbatore.jpg";
			} else if (lntUnit.equalsIgnoreCase("5")) {
		String pathToWeb1 = FilePath.getBasePath();
		path1 = pathToWeb1 + "U5_L&T_community_HMI_screen_lonavala.jpg";
			} else if (lntUnit.equalsIgnoreCase("6")) {
		String pathToWeb1 = FilePath.getBasePath();
		path1 = pathToWeb1 + "U6_L&T_community_HMI_screen_surat.jpg";
			} else if (lntUnit.equalsIgnoreCase("7")) {
		String pathToWeb1 = FilePath.getBasePath();
		path1 = pathToWeb1 + "U7_L&T_community_HMI_screen_Thane.jpg";
			} else if (lntUnit.equalsIgnoreCase("8")) {
		String pathToWeb1 = FilePath.getBasePath();
		path1 = pathToWeb1 + "U8_L&T_community_HMI_screen_vadodara.jpg";
			}

			img = Image.getInstance(path1);

			if (lntUnit.equalsIgnoreCase("1")) {
		img.scaleAbsolute(230, 60);
			} else if (lntUnit.equalsIgnoreCase("2")) {
		img.scaleAbsolute(230, 60);
			} else if (lntUnit.equalsIgnoreCase("3")) {
		img.scaleAbsolute(310, 60);
			} else if (lntUnit.equalsIgnoreCase("4")) {
		img.scaleAbsolute(230, 60);
			} else if (lntUnit.equalsIgnoreCase("5")) {
		img.scaleAbsolute(230, 60);
			} else if (lntUnit.equalsIgnoreCase("6")) {
		img.scaleAbsolute(310, 60);
			} else if (lntUnit.equalsIgnoreCase("7")) {
		img.scaleAbsolute(310, 60);
			} else if (lntUnit.equalsIgnoreCase("8")) {
		img.scaleAbsolute(310, 60);
			}

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

			PdfPTable Headertable1 = new PdfPTable(3);
				

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
		for(int pro = 0; pro < list.size(); pro++) {
			request.setAttribute("pageIteration", pro);
						
			int[] HeaderWidth1 = { 40, 50,20 };
			Headertable1.setWidths(HeaderWidth1);
			Headertable1.setWidthPercentage(95f);
			Headertable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);   
		
		    if(list.size() > 1){}else{}
		proname = list.get(pro).getProfileName();
		pkgname = list.get(pro).getPkgName();
		proId=list.get(pro).getProfileId();
		String Profile = proname;
		

		if(list.size() > 1){
		     		
			     	if(list.get(0).getPageno()=="Y" && codefbsppbss==true)
			     	{
			     		codefbsppbss=false;
			     		Headertable1.addCell(new Phrase("", tabletext));	
			    		Headertable1.addCell(new Phrase(""+Profile, header));
			    		Headertable1.addCell(new Phrase("", tabletext));	
			     		//Headertable1.addCell(code129.createImageWithBarcode(canvas, null, null));
			     	}else if(list.get(0).getPageno()=="Y" && codefbsppbss==false)
			     	{
			     		Headertable1.addCell(new Phrase("Sample Accepted On:"+fbsppbscollecteddate, header));	
			     		Headertable1.addCell(new Phrase(""+Profile, header));
			     		Headertable1.addCell(code129.createImageWithBarcode(canvas, null, null));
			     		
			     		/* Headertable1.addCell(new Phrase("Report On:"+fbsppbspostdate, header));	
			     		Headertable1.addCell(new Phrase("", tabletext));	
			     		Headertable1.addCell(new Phrase("", tabletext));	 */
			     	}else 
			     	{
			     		 Headertable1.addCell(new Phrase("", tabletext));	
		                 Headertable1.addCell(new Phrase(""+Profile, header));
		    	        Headertable1.addCell(new Phrase("", tabletext));
			     	}
			    }else
			    {
			    	    Headertable1.addCell(new Phrase("", tabletext));	
			            Headertable1.addCell(new Phrase(""+Profile, header));
			    	    Headertable1.addCell(new Phrase("", tabletext));
			    }	
		 		
		 		
		

		document.add(Headertable1);
		Headertable1.flushContent();

		
			PdfPTable Headertable = new PdfPTable(5);
			int[] HeaderWidth = { 0, 40, 20, 15, 25 };
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
			
			Headertable.getDefaultCell().setBorder(Rectangle.TOP);
			Headertable.addCell(new Phrase("", tabletext));
			Headertable.addCell(new Phrase("", tabletext));
			Headertable.addCell(new Phrase("", tabletext));
			Headertable.addCell(new Phrase("", tabletext));
			Headertable.addCell(new Phrase("", tabletext));

			Headertable.getDefaultCell().setBorder(Rectangle.BOTTOM);
			Headertable.addCell(new Phrase("", tabletext));
			Headertable.addCell(new Phrase("Test Done", tableheader13));
			Headertable.addCell(new Phrase("Test Result", tableheader13));
			Headertable.addCell(new Phrase("Units", tableheader13));
			Headertable.addCell(new Phrase("Biological Reference Interval", tableheader13));
			
		
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
			//System.out.println(list.get(pro).getTestli().get(i).getTrendanalysisFlag()+"fgggggggggggggggh");
		 
			
		String TestName = list.get(pro).getTestli().get(i).getTestName();
		String TestResult = list.get(pro).getTestli().get(i).getTestresult();
		String LowValues = list.get(pro).getTestli().get(i).getLowvalue();
		String HighValues = list.get(pro).getTestli().get(i).getHighvalue();
		//String dateresult = list.get(pro).getTestli().get(i).getTrendanalysisDate();
		
		//String trendanalysisResult=list.get(pro).getTestli().get(i).getTrendanalysisResult();
			
		//Integer trendResult=Integer.parseInt(trendanalysisResult);
		//System.out.println(trendResult+"trendResult");
		//System.out.println(list.get(pro).getTestli().get(i).getMicroorganism()+"dateresult");
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
		
		
		
		//System.out.println(microReason+"microReason");
		//System.out.println(list.get(pro).getTestli().get(i).getMicroorganism()+"getMicroorganismgetMicroorganismgetMicroorganism"+microraganism+"microflag"+microflag+"TestResult"+TestResult+"microReason"+microReason);
			
		/* 
		
		//
		
		if(list.get(pro).getTestli().get(i).getTrendanalysisFlag().equalsIgnoreCase("Y"))
		{						         
		      
			
			 for(int p=0; i < list.get(pro).getTestli().get(i).getTreandAnalysisList().size(); p++ )
			 {				 
		 
		 String trandResult=(String)list.get(pro).getTestli().get(i).getTreandAnalysisList().get(p);
		 
		 
		   DefaultCategoryDataset mychartData=new DefaultCategoryDataset();
		   mychartData.setValue(34,"Marks","gj"); 
		           mychartData.setValue(34,"Marks","dfgdfj");
		           mychartData.setValue(47,"Marks","dfgdfggg");
		           mychartData.setValue(153,"Marks","gjweerr");
		            
		           JFreeChart my2DChart=ChartFactory.createLineChart("TREAND ANALYSIS ","DATE","RESULT(UNIT)",mychartData,PlotOrientation.VERTICAL,false,true,false);

		           int width=500; 
		           
		           int height=320; 

		           PdfContentByte Add_Chart_Content= pdfWriter.getDirectContent();
		           
		           PdfTemplate template_Chart_Holder=Add_Chart_Content.createTemplate(width,height);
		          
		           Graphics2D Graphics_Chart=template_Chart_Holder.createGraphics(width,height);
		           
		           Rectangle2D Chart_Region=new Rectangle2D.Double(0,0,500,250);
		          
		           my2DChart.draw(Graphics_Chart,Chart_Region);            
		           
		           Graphics_Chart.dispose();
		           
		           Add_Chart_Content.addTemplate(template_Chart_Holder,30,0); 
			 }
			 
			   
		
		} */
		
		
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
		
		Headertable.addCell(new Phrase("" + TestResult, tabletext));
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
		  
						//Headertable.addCell(new Phrase("" + TestResult + "*", tableheader13));
						Headertable.addCell(new Phrase("" + TestResult, tableheader13)); // Here * removed by vinod
					}else{
			        	Headertable.addCell(new Phrase("" + TestResult, tabletext));
			        }
		        }else{
		        	Headertable.addCell(new Phrase("" + TestResult, tabletext));
		        }
		           				
		/* 
		if (Double.parseDouble(TestResult) < Double.parseDouble(LowValues)|| Double.parseDouble(TestResult) > Double.parseDouble(HighValues)) {
			  
			Headertable.addCell(new Phrase("" + TestResult + "*", tableheader13));
		} else {
		     	
			Headertable.addCell(new Phrase("" + TestResult, tabletext));
			 	} */
			}
			
			if(valueType.equalsIgnoreCase("individual"))
			{
		if (Units == null || Units.equalsIgnoreCase("null")|| Units.equalsIgnoreCase("")) {
			   
			Headertable.addCell(new Phrase("-", tabletext));
		} else {
			   
			Headertable.addCell(new Phrase("" + Units, tabletext));
		}
			}else
			{
		if (unitNameGenaral == null || unitNameGenaral.equalsIgnoreCase("null")|| unitNameGenaral.equalsIgnoreCase("")) {
			   
			Headertable.addCell(new Phrase("-", tabletext));
		} else {
			   
			Headertable.addCell(new Phrase("" + unitNameGenaral, tabletext));
		}
			}	
			
			
			if(quantitative.equalsIgnoreCase("Y"))
			{
		if (microraganism == null || microraganism.equalsIgnoreCase("null")|| microraganism.equalsIgnoreCase("") ||  microraganism.equalsIgnoreCase("null-") ||  microraganism.equalsIgnoreCase("-null")) {
			   
			Headertable.addCell(new Phrase("-", tabletext));
		} else {
			   
			Headertable.addCell(new Phrase("" + microraganism, tabletext));
		}
			}else
			{
		if (NormalValues == null || NormalValues.equalsIgnoreCase("null")|| NormalValues.equalsIgnoreCase("")) {
			   
			Headertable.addCell(new Phrase("-", tabletext));
		} else {
			   
			Headertable.addCell(new Phrase("" + NormalValues, tabletext));
		}
			}	
			

			

			// adding second line method name
		 if(microflag.equalsIgnoreCase("Y"))
		{
			        Headertable.addCell(new Phrase("", tabletext));
			if (microReason == null || microReason.equalsIgnoreCase("null") || microReason.equalsIgnoreCase("")|| microReason.equalsIgnoreCase("-")) {				    	
			Headertable.addCell(new Phrase(" ", tabletext));
			} else {				   
			Headertable.addCell(new Phrase("Micro-Organism " +":"+microReason, tabletext));
			}	
			Headertable.addCell(new Phrase("", tabletext));
			Headertable.addCell(new Phrase("", tabletext));
			Headertable.addCell(new Phrase("", tabletext));		
			
		}
			
		Headertable.addCell(new Phrase("", tabletext));
		if (sampletype == null || sampletype.equalsIgnoreCase("null") || sampletype.equalsIgnoreCase("")|| sampletype.equalsIgnoreCase("-")) {				    	
		Headertable.addCell(new Phrase(" ", tabletext));
		} else {				   
		Headertable.addCell(new Phrase("Sample Type " +":"+sampletype, tabletext));
		}	
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));	
			
		Headertable.addCell(new Phrase("", tabletext));
		if (methodname == null || methodname.equalsIgnoreCase("null") || methodname.equalsIgnoreCase("")|| methodname.equalsIgnoreCase("-")) {				    	
		Headertable.addCell(new Phrase(" ", tabletext));
		} else {				   
		Headertable.addCell(new Phrase("Method Name " +":"+methodname, tabletext));
		}	
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		
		if(quantitative.equalsIgnoreCase("Y"))
		{
			Headertable.addCell(new Phrase("", tabletext));
			if (flagmarkResult == null || flagmarkResult.equalsIgnoreCase("null") || flagmarkResult.equalsIgnoreCase("")|| flagmarkResult.equalsIgnoreCase("-")) {				    	
			Headertable.addCell(new Phrase(" ", tabletext));
			} else {				   
			Headertable.addCell(new Phrase("Test Result  " +":"+flagmarkResult, tabletext));
			}	
			Headertable.addCell(new Phrase("", tabletext));
			Headertable.addCell(new Phrase("", tabletext));
			Headertable.addCell(new Phrase("", tabletext));		
			
		}
		
		

		Headertable3.addCell(new Phrase("", tabletext));
		if (testcomments == null || testcomments.equalsIgnoreCase("null") || testcomments.equalsIgnoreCase("")|| testcomments.equalsIgnoreCase("-")) {				    	
			Headertable3.addCell(new Phrase("", tabletext));
		}else
		{
			Headertable3.addCell(new Phrase("Comments : "+ ""+testcomments, tabletext));
		}			
		Headertable3.addCell(new Phrase("", tabletext));
			
		
		
		Headertable3.addCell(new Phrase("", tabletext));
		if (testinterpretation == null || testinterpretation.equalsIgnoreCase("null") || testinterpretation.equalsIgnoreCase("")|| testinterpretation.equalsIgnoreCase("-")) {				    	
			Headertable3.addCell(new Phrase("", tabletext));
		}else
		{
			Headertable3.addCell(new Phrase("Interpretation : "+" "+testinterpretation, tabletext));
		}
		Headertable3.addCell(new Phrase("", tabletext));
		
		//Headertable.addCell(new Phrase("", tabletext));
		
		}
		
		
		document.add(Headertable);
		Headertable.flushContent();
		document.add(Headertable3);
		Headertable3.flushContent();
		
		}

			}
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
		document.add(Headertable);
		Headertable.flushContent();
		document.add(Headertable3);
		Headertable3.flushContent();
		

		PdfPTable Headertable11 = new PdfPTable(3);
		int[] HeaderWidth11 = { 0, 15, 60 };
		Headertable11.setWidths(HeaderWidth11);
		Headertable11.setWidthPercentage(95f);
		Headertable11.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
		Headertable11.addCell(new Phrase("", tabletext));
		
		 if (list.get(pro).getComments().equalsIgnoreCase("-")) {
			 Headertable11.addCell(new Phrase(" ", tableheader13));	
		 	 Headertable11.addCell(new Phrase(" ", tabletext));
		
		 }else
		 {
			 Headertable11.addCell(new Phrase("Comments :-", tableheader13));
			 Headertable11.addCell(new Phrase(""+list.get(pro).getComments(), tabletext));
		 }
		Headertable11.addCell(new Phrase("", tabletext));
		
		
		if (list.get(pro).getInterpretation().equalsIgnoreCase("-")) {	            	
			 Headertable11.addCell(new Phrase(" ", tableheader13));	
			 Headertable11.addCell(new Phrase(" ", tabletext));
		
		} else {
			Headertable11.addCell(new Phrase("Interpretation :-", tableheader13));
		    Headertable11.addCell(new Phrase(""+list.get(pro).getInterpretation(), tabletext));
			
		}
		

		Headertable11.addCell(new Phrase("", tabletext));
		Headertable11.addCell(new Phrase("", tableheader13));
		Headertable11.addCell(new Phrase("", tabletext));		
		document.add(Headertable11);
		Headertable11.flushContent();
		
	
			
			}
	
			
			
		    PdfPTable HeaderTableTechN = new PdfPTable(5);
			int[] headerwidth51 = { 20, 10, 15, 15, 25 };
			HeaderTableTechN.setWidths(headerwidth51);
			HeaderTableTechN.setWidthPercentage(95f);
		    HeaderTableTechN.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		   	HeaderTableTechN.addCell(new Phrase("", subheader));
		   	HeaderTableTechN.addCell(new Phrase("", header));
		   	HeaderTableTechN.addCell(new Phrase("", subheader));
		   	HeaderTableTechN.addCell(new Phrase("", header));
		   	HeaderTableTechN.addCell(new Phrase("",subheader));
		   	
			HeaderTableTechN.addCell(new Phrase("", subheader));
		   	HeaderTableTechN.addCell(new Phrase("", header));
		   	HeaderTableTechN.addCell(new Phrase("", subheader));
		   	HeaderTableTechN.addCell(new Phrase("", header));
		   	HeaderTableTechN.addCell(new Phrase("",subheader));
		   	
		    HeaderTableTechN.addCell(new Phrase("", subheader));
		   	HeaderTableTechN.addCell(new Phrase("", header));
		   	HeaderTableTechN.addCell(new Phrase("--End Of Report--", subheader));
		   	HeaderTableTechN.addCell(new Phrase("", header));
		   	HeaderTableTechN.addCell(new Phrase("",subheader));
		
		   	document.add(HeaderTableTechN);
		   	HeaderTableTechN.flushContent();
		   	
			 //signature
			PdfPTable Headertable2 = new PdfPTable(3);
			int[] HeaderWidth2 = { 60, 60, 34 };
			Headertable2.setWidths(HeaderWidth2);
		    Headertable2.setWidthPercentage(95f);
			Headertable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				 
		    Headertable2.addCell(new Phrase("  ", footer));  
			Headertable2.addCell(new Phrase(" ", tabletext));
		    Headertable2.addCell(new Phrase("  ", footer));
					
				 String signature = "";
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
				
				
				
				//Added by KishoR for set location of this table to fixed bottom.
				Headertable2.setTotalWidth(document.right(document.rightMargin()) - document.left(document.leftMargin()));
				Headertable2.writeSelectedRows(0, -1, document.left(document.leftMargin()), Headertable2.getTotalHeight() + document.bottom(document.bottomMargin() + 10), pdfWriter.getDirectContent());		
				//document.add(Headertable2);		
				Headertable2.flushContent();
			 
			document.close();
			outStream.close();
			outStream.flush();
			String pName = patientName.replaceAll("  ", "");
			final String filePath = "https://disha.life/LabResultPdf/" + File.separator + masterIdd + File.separator + pName + File.separator + pName + ".pdf";
			//final String filePath = "https://www.disha.life/LabResultPdf//"+masterIdd+"/"+patientName+"/"+patientName+".pdf";
		/* 	String mailSubject = "Lifenity Wellness Report";
			String mailBody = "Dear "+patientName+","+"<br><br><br>"
			    		+ "Thank you for registering with us. Please find your Lab Test Report attached herewith."
		                + "<br><br>Conditions on reporting"
		                + "1.This is a computer generated report."
		                + "2.Partial reproduction of this report is not permitted."
		                + "<br><br>Regards,"
		                + "Lifenity Wellness"
		                + "<br><br><br>Disclaimer - This e-mail may contain confidential information which is the property of Lifenity Wellness. "
		                + "It is intended only for the use of the individual or entity to which it is addressed. If you are not the intended recipient, "
		                + "you are not authorized to read,retain,copy, print,distribute or use the contents of this e-mail. If you have received this "
		                + "communication in error please notify the sender and delete all copies of this message. Lifenity Wellness does not accept any "
		                + "liability for virus infected mails."; */
			/* PathologySearchController pathologySearchController = (ApplicationContextUtils.getApplicationContext()).getBean(PathologySearchController.class);
			pathologySearchController.sendEmailByLifenityDomain(emailTo, mailSubject, mailBody, filePath, patientName+".pdf", userId.toString()); */
			
			 ResourceBundle resourceBundle = ResourceBundle.getBundle("SMSFormat");
            String host = resourceBundle.getObject("host").toString();
            String port = resourceBundle.getObject("port").toString();
            final String mailFrom = resourceBundle.getObject("mailFrom").toString();
            final String password = resourceBundle.getObject("password").toString();
            String labNamee = resourceBundle.getObject("labName").toString();
            String regards = resourceBundle.getObject("regards").toString();
			
			
 			   /*  String host = "smtp.gmail.com";
		        String port = "587";//"465";
		        final String mailFrom = "reports.lifenity@gmail.com";
		        final String password ="cexraedexyrhahgl"; */
		       
		              // message info
		        String mailTo = emailTo;
		        String mailCC = emailCC;
		        String subject = labNamee+" Report";
		        String message="Dear <b>"+patientName+"</b>,"+"<br>"+"<br>"+
	                      
		        		  "Thank you for registering with us." +"<br>" + " Please find your  <b>Lab Test Report</b> attached herewith."+"<br>"+"<br>"+
	                     
                          " Conditions on reporting" +"<br>"+
	                      "1.This is a computer generated report." +"<br>"+
	                      "2.Partial reproduction of this report is not permitted." +"<br>"+
	                      "" +"<br>"+
	                      "<b>Regards</b>,"+"<br>"+
	                      "<b>"+regards+"</b>"+"<br>"+"<br>"+
	                      
	                      "<b>Disclaimer -</b>"+"<br>"+"<i>This e-mail may contain confidential information which is the property of "+labNamee+". It is intended only for the use of the individual or entity to which it is addressed. If you are not " +"<br>"+" the intended recipient, you are not authorized to read,retain,copy, print,distribute or use the contents of this e-mail. If you have received this communication in error please notify the " +"<br>"+" sender & delete all copies of this message. "+labNamee+" does not accept any liability for virus infected mails</i>.";		            		  
		              // sets SMTP server properties
		        Properties properties = new Properties();
		        properties.put("mail.smtp.host", host);
		        properties.put("mail.smtp.port", port);
		        properties.put("mail.smtp.auth", "true");
		        properties.put("mail.smtp.starttls.enable", "true");
		        properties.put("mail.user", mailFrom);
		        properties.put("mail.password", password);
		       
		              // creates a new session with an authenticator
		        Authenticator auth = new Authenticator() {
		                  public PasswordAuthentication getPasswordAuthentication() {
		                      return new PasswordAuthentication(mailFrom, password);
		                  }
		          };
		         Session mailSession = Session.getInstance(properties, auth);       
		              // creates a new e-mail message
		         Message msg = new MimeMessage(mailSession);       
		         msg.setFrom(new InternetAddress(mailFrom));
		        // InternetAddress[] toAddresses = { new InternetAddress(mailTo) };
		              //InternetAddress[] CCAddresses = { new InternetAddress(mailCC) };
		         msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(mailTo));
		         msg.setRecipients(Message.RecipientType.CC,InternetAddress.parse(mailCC));
		         //msg.setRecipients(Message.RecipientType.CC, CCAddresses );
		         msg.setSubject(subject);
		         msg.setSentDate(new Date());         
		              // creates message part
		         MimeBodyPart messageBodyPart = new MimeBodyPart();
		         messageBodyPart.setContent(message, "text/html");	       
		              // creates multi-part
		         Multipart multipart = new MimeMultipart();
		         multipart.addBodyPart(messageBodyPart);			
		         MimeBodyPart attachPart = new MimeBodyPart();
		          	 attachPart.attachFile(DEST);
		             multipart.addBodyPart(attachPart);			                   
		              // sets the multi-part as e-mail's content
		             msg.setContent(multipart);
		       
		              // sends the e-mail
		              Transport.send(msg);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	%>
</body>
</html>