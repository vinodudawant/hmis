<%@page import="com.hms.dto.Users"%>
<%@page import="com.hms.users.service.UsersService"%>
<%@page import="com.hms.opdbill.service.OpdBillService"%>
<%@page import="com.hms.opdbill.controller.OpdBillController"%>
<%@page import="com.hms.opdbill.dto.PatientHeaderInfoDto"%>
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
		document.setMargins(20, 20, 20, 145);
		
		//PdfWriter.getInstance(document, outStream);	
		PdfWriter pdfWriter = PdfWriter.getInstance(document, outStream);
				
		document.open();	
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
		List<PathologySampleWiseMaster> list = phlebotomyservice.getRoutinevalueResutlusingNewPrint(masterIdd, treatmentId, patientType, unitId, request);
		;
		String pmobile="0";
		String profileName="";
		
		int ageInYear=0;
		int ageInMonth=0;
		int ageDays=0;
		
		int patientAge=0;
		int patientAgeType=0;
		
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
		
		System.out.println("size==="+list.size());
		for(int pro = 0; pro < list.size(); pro++) {
			 PathologySampleWiseMaster obj1=list.get(pro);
				String template=obj1.getTemplateWise();
				boolean istemplate=template.startsWith("H");
				if(istemplate){
					continue;
				}
			System.out.println("flag==="+list.get(pro).getTreadanalysisFlag().equalsIgnoreCase("Y"));
		if(list.get(pro).getTreadanalysisFlag().equalsIgnoreCase("Y")){
			profileName =profileName+"_"+ list.get(pro).getProfileName();
		    }
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
		//RegTreBillDto rtd = new RegTreBillDto();
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
			     
	
		String reportFooterAddress = "";//hospObj.getReportFooterAddress();
		if(reportFooterAddress.equalsIgnoreCase(null) || reportFooterAddress.equalsIgnoreCase("") || reportFooterAddress == null)
			{
			reportFooterAddress="";			
			}
		
		 
		
		
		//document.open();		
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
			//PdfContentByte canvas = pdfWriter.getDirectContentUnder();
			Barcode128 code129 = new Barcode128();
			
			for (int pro = 0; pro < list.size(); pro++) {
				System.out.println("ppp======"+list.get(pro).getProfileName());
				PathologySampleWiseMaster obj1=list.get(pro);
				String template=obj1.getTemplateWise();
				boolean istemplate=template.startsWith("H");
				if(istemplate){
					continue;
				}
				
				
				      int lengthTrend=0;
												
						if(list.get(pro).getTreadanalysisFlag().equalsIgnoreCase("Y"))
							 lengthTrend=list.get(pro).getTreadAnalysisFlagCount();
						
						
				   if(lengthTrend==0){
					   continue;
				   }
				
				request.setAttribute("pageIteration", pro);
			int[] HeaderWidth1 = { 0, 100,0 };
			Headertable1.setWidths(HeaderWidth1);
			Headertable1.setWidthPercentage(95f);
			Headertable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);   
			
			
				if(lengthTrend > 0){
				document.newPage();
				
				// Header info start
				ResourceBundle resource1 = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
				String lntUnit1 = (String) resource.getObject("lntUnit").toString();
				ResourceBundle resource11 = ResourceBundle.getBundle("Ehat");
				String meesha = (String) resource11.getObject("meesha").toString();
				String mIds[]=masterIdd.split(",");
				String mIdd=mIds[0];
				Integer mid = Integer.parseInt(mIdd);
				
				PatientHeaderInfoDto objPat = new PatientHeaderInfoDto();
				objPat.setTreatmentId(treatmentId);
				OpdBillController uss1 = (ApplicationContextUtils.getApplicationContext()).getBean(OpdBillController.class);
				PatientHeaderInfoDto rtd1 = uss1.getPatientInfoByTreatmentId(objPat).getListRegTreBillDto().get(0);
				OpdBillService opdService = (ApplicationContextUtils.getApplicationContext()).getBean(OpdBillService.class);
		    	String sampleCollectDateTime="";
		    	if(meesha.equalsIgnoreCase("on")) {
		    		 sampleCollectDateTime=opdService.getSampleCollectionDateandTime(mid);
		    		 sampleCollectDateTime=opdService.getSampleCollectionDateandTime(mid);
		    		 SimpleDateFormat sdfIn1 = new SimpleDateFormat("dd/MM/yyyy HH:mm");
						//SimpleDateFormat sdfOut = new SimpleDateFormat("dd-MM-yyyy HH:mm");
						SimpleDateFormat sdfOut1 = new SimpleDateFormat("dd-MM-yyyy hh:mm aa");
						Date date1 = sdfIn1.parse(sampleCollectDateTime);
						sampleCollectDateTime = sdfOut1.format(date1);
		    	}
				String age = rtd1.getAge();
				String[] ageArray = age.split("/");
				String finalAge = ageArray[0];
				if (ageArray[0].equalsIgnoreCase("0Y")) {
					finalAge = ageArray[1];
				}
				if (ageArray[0].equalsIgnoreCase("0Y") && ageArray[1].equalsIgnoreCase("0M")) {
					finalAge = ageArray[2];
				}

				String dob = rtd1.getDob();
				if ((dob.trim()).equalsIgnoreCase("")) {
					dob = "-";
				} else {
					dob = dob.replaceAll("/", "-");
					String[] dobChane1 = dob.split("-");
					dob = dobChane1[2] + "-" + dobChane1[1] + "-" + dobChane1[0];
				}

				SimpleDateFormat dateformatterr = new SimpleDateFormat("dd-MM-yyyy hh:mm aa");
				String regDate = dateformatterr.format(rtd1.getCreatedDateTime());

				String idProof = "";
				String id = rtd1.getProofId();
				if (id.equalsIgnoreCase("1")) {
					idProof = "Aadhar";
				} else if (id.equalsIgnoreCase("2")) {
					idProof = "Pan Card";
				} else if (id.equalsIgnoreCase("3")) {
					idProof = "Passport";
				} else if (id.equalsIgnoreCase("4")) {
					idProof = "Driving License";
				} else if (id.equalsIgnoreCase("5")) {
					idProof = "Other";
				}

				if (rtd1.getBusinessType() == 2) {
					int refferSource = rtd1.getReferSource();

					if (refferSource == 0)
						rtd1.setCustomerName("Self");
					else if (refferSource == 1)
						rtd1.setCustomerName("Self (Walk In)");
					else if (refferSource == 2)
						rtd1.setCustomerName("Self (Home Collection)");
					else if (refferSource == 4)
						rtd1.setCustomerName("Self (Corporate)");
				}

				String refDocName = "";
				if (rtd1.getRefDocPrefix().equalsIgnoreCase("-") || rtd1.getDocNameChan().equalsIgnoreCase("-"))
					refDocName = "-";
				else
					refDocName = rtd1.getRefDocPrefix() + " " + rtd1.getDocNameChan();

			String	referDoctorName=rtd1.getReferDoctorName();
				

				HospitalDetailAdminService hs1 = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
				List<HospitalDetails> arrHospitalDetails1 = hs.getListHospitalDetails().getListHospitalDetails();
				HospitalDetails hospObj1 = arrHospitalDetails.get(0);

				Phlebotomyservice phlebotomyservice1 = (ApplicationContextUtils.getApplicationContext())
						.getBean(Phlebotomyservice.class);
				//List<PathologySampleWiseMaster> list1 = phlebotomyservice.getRoutinevalueResutlusingNewPrint(masterIdd,	treatmentId, patientType, unitId, request);

				String barcodenumber1 = list.get(pro).getBarCode();

				String collecteddate1 = list.get(pro).getCollecteddate();
				String collectDateReg = rtd1.getCollectionDate();
				String serviceAssignedDateTime = "";

				if (collectDateReg != null || collectDateReg != "null") {
					String[] splitDateCReg = rtd1.getCollectionDate().split("/");

					String dd = splitDateCReg[0];
					String mm = splitDateCReg[1];
					String yy = splitDateCReg[2];
					StringBuffer fd = new StringBuffer();
					fd.append(dd + "-" + mm + "-" + yy);

					String regCollectDate = fd.toString();
					serviceAssignedDateTime = regCollectDate + ":" + rtd1.getCollectionTime();
				} else {
					serviceAssignedDateTime = phlebotomyservice.getOldestCollectionDateInString(masterIdd);
				}

				if (collecteddate1 != null) {
					collecteddate1 = list.get(pro).getCollecteddate();
				} else {
					collecteddate1 = "-";
				}
				String postdate1H = list.get(pro).getPostdate();

				String postdateH= "";
				if (postdate1H != null) {

					postdate1H = list.get(pro).getPostdate();
					String[] wordspostddate = postdate1H.split(" ");

					String postDate = wordspostddate[0];
					

					SimpleDateFormat sdfIn = new SimpleDateFormat("yyyy-MM-dd HH:mm");
					SimpleDateFormat sdfOut = new SimpleDateFormat("dd-MM-yyyy hh:mm aa");
					Date date = sdfIn.parse(postdate1H);

				
					postdateH = sdfOut.format(date);// postDateddmmyy1+" "+ postTime;
				} else {
					postdate1H = "-";
				}

				

				SimpleDateFormat sdfIn = new SimpleDateFormat("yyyy-MM-dd HH:mm");
				SimpleDateFormat sdfOut = new SimpleDateFormat("dd-MM-yyyy HH:mm");
				
					
				java.util.Calendar currentDateH = Calendar.getInstance();
				SimpleDateFormat dateformatterH = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss a");
				String curr_dateH = dateformatterH.format(currentDateH.getTime());
				NumberFormat numberFormatTwoDecimalH = new DecimalFormat("#0.00");

				String pathH = hospObj1.getFilePath();
				String hospitalNameH = hospObj1.getHospitalName();
				hospitalNameH = hospitalNameH.toUpperCase();
				String addressH = hospObj1.getHospitalAddress();
				String cityH = hospObj1.getHospitalCity();
				String contactH = hospObj1.getHospitalContact();
				String regnoH = hospObj.getHosRegNo();
				String hospitalZipH = hospObj.getHospitalZip();
				String PhoneNoH = hospObj.getHospitalContact();
				String secPhoneNoH = hospObj.getSecPNo();
				String websteH = hospObj.getWebsite();
				String emailH = hospObj.getHospitalEmail();
				String cinNoH = hospObj.getTxtCinNo();
				String serviceTaxNoH = hospObj.getTxtSerTaxNo();
				String panNoH = hospObj.getPanNo();
				String hPhoneNoH = PhoneNoH + "/" + secPhoneNoH;
				String nabhH = hospObj.getNabhImagePath();
				ServletContext context = request.getServletContext();
				String lisLogoPath = hospObj.getLisLogoPath();
				String path2H = context.getRealPath(lisLogoPath);
				
				Image img124 = null;
				PdfPCell cell13 = null;

				try {
					img124 = Image.getInstance(path2H);
					img124.scaleAbsolute(130, 70);

					cell13 = new PdfPCell();
					cell13.addElement(new Chunk(img124, 1, -15));
					cell13.setBorder(Rectangle.NO_BORDER);
				} catch (Exception e) {
					e.printStackTrace();
				}

				PdfPTable HeaderTable1 = new PdfPTable(3);
				int[] headerwidth1 = { 30, 100, 10 };
				HeaderTable1.setWidths(headerwidth1);
				HeaderTable1.setWidthPercentage(95f);
				HeaderTable1.setHorizontalAlignment(Element.ALIGN_LEFT);
				HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				if (img124 == null) {
					HeaderTable1.addCell(new Phrase("", header));
				} else {
					HeaderTable1.addCell(cell13);
				}

				Font bold = new Font(Font.TIMES_ROMAN, 12, Font.BOLD);
				Phrase pH = new Phrase();
				pH.add(new Chunk(" "+hospitalNameH, bold));			
				pH.add(new Chunk(" \n\n"+addressH, tabletext));			
				pH.add(new Chunk(" "+cityH+" Pin- "+hospitalZipH+"\n", tabletext));
				pH.add(new Chunk(" Phone No. "+hPhoneNoH, tabletext));	
		        if(!websteH.equalsIgnoreCase("")){
		        	pH.add(new Chunk(" \n "+websteH, tabletext));
				}
				pH.add(new Chunk(" \n "+"email: "+emailH, tabletext));

				PdfPCell hospitalNameCell = new PdfPCell(pH);
				hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hospitalNameCell.setBorder(Rectangle.NO_BORDER);
				//HeaderTable1.addCell(hospitalNameCell);
				
				PdfPTable HeaderTableSpace = new PdfPTable(1);
				int[] headerwidthSpace = {40 };
				HeaderTableSpace.setWidths(headerwidthSpace);
				HeaderTableSpace.setWidthPercentage(95f);
				HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTableSpace.setSpacingAfter(40.0f);
				
				HeaderTableSpace.addCell(new Phrase("", tabletext));
				HeaderTableSpace.addCell(new Phrase("", tabletext));
				HeaderTableSpace.addCell(new Phrase("", tabletext));
				HeaderTableSpace.addCell(new Phrase("", tabletext));
				HeaderTableSpace.addCell(new Phrase("", tabletext));
	  			document.add(HeaderTableSpace);
	  			HeaderTableSpace.flushContent();

				// HeaderTable1.addCell(hospitalNameCell);
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));

				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));

				HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				document.add(HeaderTable1);
				HeaderTable1.flushContent();
				
				// added code for QR
				  String pNameSplitH=rtd1.getPatientName();
				String pNameeeH = pNameSplitH.replaceAll("\\s", "");
			    String ReportUrlSmsLinkkH = (String) resource.getObject("ReportUrlSmsLink").toString();	    
			    final String labReportPathH = ReportUrlSmsLinkkH+"/labTestPDF/" + File.separator +
			    		masterIdd + File.separator + pNameeeH + File.separator +pNameeeH+".pdf";
				String filePathH = labReportPathH.replace("\\", "/");
				  String finalaH= filePathH;	
				   BarcodeQRCode my_codeH = new BarcodeQRCode(finalaH, 1, 1, null);
				   Image imgq = null;
				   
				   java.awt.Image awtImageH = my_codeH.createAwtImage(Color.BLACK, Color.WHITE);			    			                
				   imgq = com.lowagie.text.Image.getInstance(awtImageH, null);
				   imgq.scaleAbsolute(60,60);
				   imgq.scaleAbsoluteHeight(60);
				    PdfPCell QrCodecellH = null;
				    QrCodecellH = new PdfPCell();
				    QrCodecellH.addElement(new Chunk(imgq, 1, -45));
				    QrCodecellH.setBorder(Rectangle.NO_BORDER);
				    QrCodecellH.setRowspan(6);
				// end QR code
				
               PdfPTable patientDetailsHeaderTitle = new PdfPTable(1);
				int[] patientDetailsHeaderWidthTitle = { 20};
				patientDetailsHeaderTitle.setWidths(patientDetailsHeaderWidthTitle);
				patientDetailsHeaderTitle.setWidthPercentage(95f);
				patientDetailsHeaderTitle.getDefaultCell().setBorder(Rectangle.TOP);
				patientDetailsHeaderTitle.getDefaultCell().setHorizontalAlignment(Rectangle.ALIGN_CENTER);
				patientDetailsHeaderTitle.addCell(new Phrase("", tabletext));
				document.add(patientDetailsHeaderTitle);
				patientDetailsHeaderTitle.flushContent();
			
				  PdfPTable patientDetailsDate = new PdfPTable(6);
					int[] patientDetailsHeaderDate = { 10,10,10,10,15,23};
					patientDetailsDate.setWidths(patientDetailsHeaderDate);
					patientDetailsDate.setWidthPercentage(95f);
					patientDetailsDate.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					Date date = new Date();
			        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm aa");
			        String currentDate1= format.format(date);
			        System.out.println("currentDate===="+currentDate1);
					
					patientDetailsDate.addCell(new Phrase("", tabletext));
					patientDetailsDate.addCell(new Phrase("", tabletext));
					patientDetailsDate.addCell(new Phrase("", tabletext));
					patientDetailsDate.addCell(new Phrase("LAB  REPORT", subheader));
					patientDetailsDate.addCell(new Phrase(" ", subheader));
					patientDetailsDate.addCell(new Phrase("  Printed Date: " +currentDate1, tabletext));
					
				
					
					document.add(patientDetailsDate);
					patientDetailsDate.flushContent();
					
					
				
				
				
				PdfPTable patientDetailsHeader = new PdfPTable(6);
				int[] patientDetailsHeaderWidth = { 32, 37, 29, 37, 28,38};
				patientDetailsHeader.setWidths(patientDetailsHeaderWidth);
				patientDetailsHeader.setWidthPercentage(95f);
				
				

				patientDetailsHeader.getDefaultCell().setBorder(Rectangle.BOTTOM);
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));

				patientDetailsHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				patientDetailsHeader.addCell(new Phrase("", subheader));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", subheader));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				
				patientDetailsHeader.addCell(new Phrase("Patient Id" , subheader));
				patientDetailsHeader.addCell(new Phrase(": "+ rtd1.getPatientId(), tabletext));
				patientDetailsHeader.addCell(new Phrase("Patient Name ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd1.getPatientName().replaceAll("  ", " "), tabletext));
				patientDetailsHeader.addCell(new Phrase("TreatmentId", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd1.getTreatmentId(), tabletext));
				
				if(meesha.equalsIgnoreCase("on")) {
					patientDetailsHeader.addCell(new Phrase("Age/Gender ", subheader));
					patientDetailsHeader.addCell(new Phrase(": " + finalAge+"/"+rtd1.getGender(), tabletext));
				}else {
					patientDetailsHeader.addCell(new Phrase("Age/DOB/Gender   ", subheader));
					patientDetailsHeader.addCell(new Phrase(": " + finalAge + "/" + dob + "/" + rtd1.getGender(), tabletext));
				}
				patientDetailsHeader.addCell(new Phrase("Mobile No", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd1.getMobile(), tabletext));
				  patientDetailsHeader.addCell(new Phrase("Ref. By  ", subheader));
				  patientDetailsHeader.addCell(new Phrase(": "+referDoctorName, tabletext));
				  
				  patientDetailsHeader.addCell(new Phrase("Registered On", subheader));
					patientDetailsHeader.addCell(new Phrase(": " + regDate, tabletext));
				  if(meesha.equalsIgnoreCase("on")) {
						patientDetailsHeader.addCell(new Phrase("Collected On ", subheader));
						patientDetailsHeader.addCell(new Phrase(": " + sampleCollectDateTime, tabletext));
						
						}else {
							patientDetailsHeader.addCell(new Phrase("Collected On ", subheader));
							patientDetailsHeader.addCell(new Phrase(": " + serviceAssignedDateTime, tabletext));
							
						}
				  
				
				patientDetailsHeader.addCell(new Phrase("Reported On", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + postdateH, tabletext));

			
				patientDetailsHeader.addCell(new Phrase("Nationality  ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd1.getNationality(), tabletext));
				String patType = "self";
				if(rtd1.getChargesMasterSlaveId() > 0)
					patType = "Sponsor";
				
				// added by Rohit on 10-08-2021 to set customer type on PDF print header
				patientDetailsHeader.addCell(new Phrase("Patient Type  ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + patType, tabletext));
				patientDetailsHeader.addCell(new Phrase("Sponsor Name  ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd1.getCategoryName(), tabletext));
				
									Barcode128 code128 = new Barcode128();
							   		
							   		code128.setSize(7f);
							  		code128.setBarHeight(15);
							   		//Jitendra 15 March 2019
									code128.setBaseline(-1);
									code128.setGenerateChecksum(true);
									code128.setCodeType(Barcode128.CODE128);
									System.out.println("Barcode128.CODE128 "+Barcode128.CODE128);
					                    
									code128.setCode(Integer.toString(rtd1.getPatientId()));
									
									PdfContentByte contentByte;
									//contentByte = writer.getDirectContent();
								

				
				Barcode128 code129H = new Barcode128();

				
				  patientDetailsHeader.addCell(new Phrase(" ", subheader));
				  patientDetailsHeader.addCell(new Phrase(" ", tabletext));
				patientDetailsHeader.addCell(new Phrase("", subheader));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase(" ", subheader));
				patientDetailsHeader.addCell(new Phrase(" ", subheader));

				
				

			
				patientDetailsHeader.getDefaultCell().setBorder(Rectangle.TOP);
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase(" ", subheader));

				document.add(patientDetailsHeader);
				patientDetailsHeader.flushContent();
			
				// End Header info
				
				
			}
			
			
			
			proname = list.get(pro).getProfileName();
			pkgname = list.get(pro).getPkgName();
			proId=list.get(pro).getProfileId();
			String Profile = proname;
			
			     if(list.size() > 0){
			     				    
			      
		   Headertable1.addCell(new Phrase("", tabletext));	
		   PdfPCell cells26 = new PdfPCell(new Phrase(Profile, headerUnderline));
		   cells26.setHorizontalAlignment(Element.ALIGN_CENTER);
		   cells26.setBorder(Rectangle.NO_BORDER);
		   Headertable1.addCell(cells26);
		   Headertable1.addCell(new Phrase("", tabletext));
		   
		   			
		 }	
			 
			document.add(Headertable1);
			Headertable1.flushContent();
			
			
			PdfPTable HeadertableNote = new PdfPTable(2);
			int[] HeaderWidthNote = { 5, 30 };
			HeadertableNote.setWidths(HeaderWidthNote);
			HeadertableNote.setWidthPercentage(95f);
			HeadertableNote.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
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
		
		PdfPCell cells28 = new PdfPCell(new Phrase("Unit", tableheader14));
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
		
		String testTreadAnalysisFlag=list.get(pro).getTreadanalysisFlag();
			 	 Phlebotomyservice  phleboService = (ApplicationContextUtils.getApplicationContext()).getBean(Phlebotomyservice.class);
			List<PathologySampleWiseMaster> 	labProfileTestCompDTO=phleboService.getTestComponentListByProfileId(list.get(pro).getProfileId());
		    
			if(list.get(pro).getTreadanalysisFlag().equalsIgnoreCase("Y")){
				for (PathologySampleWiseMaster labCompObj : labProfileTestCompDTO) {
				
							
					if( labCompObj.getTestIdd().intValue() > 0){
						
						//if(labCompObj.getTreadanalysisFlag().equalsIgnoreCase("Y")){
							PathologySampleWiseMaster ptobj	=phleboService.getTrendAnaylsisDetailsForPrint(list.get(pro).getPatientId(), treatmentId, labCompObj.getTestIdd().intValue() );
							PathologySampleWiseMaster labNObj =phleboService.getLabNormalValuesForPrint(patientType, patientAgeType, patientAge,labCompObj.getTestIdd().intValue());
							
							String TestName = labCompObj.getTestName();
							//String Units = labCompObj.getUnitname();
							String Units = labNObj.getUnitname();
							
									if(Units!=null){
								//Units = labCompObj.getUnitname();
										Units = labNObj.getUnitname();
									}else{
								Units = "";
									}
									
									if(labCompObj.getTestType().equalsIgnoreCase("individual")){
										String LowValues=labNObj.getLowvalue();
										
										if(LowValues == null || LowValues == "null")
											continue;
									}
									
							
									String LowValues = labNObj.getLowvalue();
									String HighValues = labNObj.getHighvalue();
									
									
									String NormalValues ="";
									
									if(HighValues!=null){
								NormalValues = LowValues + "  -  " + HighValues;
									}else{
								NormalValues = LowValues;
									}
									
									if(NormalValues == null )
										NormalValues="-";
									
							// ===================== code for trend analysis start=====================//
							int chartCount = 0;
				       	 	//if(list.get(pro).getTestli().get(i).getTrendanalysisFlag().equalsIgnoreCase("Y")){						         
				       	 	PdfPTable HeaderTableSpace = new PdfPTable(1);
				       		int[] headerwidthSpace = {40 };
				       		HeaderTableSpace.setWidths(headerwidthSpace);
				       		HeaderTableSpace.setWidthPercentage(95f);
				       		HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				       		HeaderTableSpace.setSpacingAfter(15.0f);
				       		
				       		HeaderTableSpace.addCell(new Phrase("", tabletext));
				  			document.add(HeaderTableSpace);
				  			HeaderTableSpace.flushContent();
				       		
				       	 	PdfPTable HeaderTableCh = new PdfPTable(5);
							int[] headerwidthCh = {20,10,10,10,10 };
							HeaderTableCh.setWidths(headerwidthCh);
							HeaderTableCh.setWidthPercentage(95f);
							HeaderTableCh.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							 int index=1;
							
								HeaderTableCh.addCell(new Phrase("Test Name", subheader));
								//HeaderTableCh.addCell(new Phrase("Date", subheader));
								HeaderTableCh.addCell(new Phrase("Result", subheader));
								HeaderTableCh.addCell(new Phrase("Normal Range", subheader));
								HeaderTableCh.addCell(new Phrase("Unit", subheader));
								HeaderTableCh.addCell(new Phrase("", subheader));
								
								
							int recoundCount=0;
							 System.out.println("size===="+ptobj.getTrendAnalysisResultFiveSingleList().size());
						 		for(int p=0; p < ptobj.getTrendAnalysisResultFiveSingleList().size(); p++ ){				 
						 					 			
						 			String trandResult=(String)ptobj.getTrendAnalysisResultFiveSingleList().get(p);
						 			
						 			if(!(trandResult.equalsIgnoreCase("0") || trandResult.equalsIgnoreCase("0.0") || trandResult.equalsIgnoreCase("0.00"))){
						 				
						 			
						 			
						 			String trandDate=(String)ptobj.getTrendAnalysisFiveSingleDateList().get(p);
						 		    String[] parts = trandDate.split(" ");
						 		   System.out.println("Date: " + parts[0]);
						 		    String date=parts[0];
						 		   
						 			String flagMark=(String)ptobj.getTrendAnalysisFiveSingleFlagList().get(p);
							     if(recoundCount == 1 ){
							    	 break;
							     }else{
						 			//HeaderTableCh.addCell(new Phrase(""+ (recoundCount+1), tabletext));
						 			HeaderTableCh.addCell(new Phrase(""+TestName, tabletext));
									//HeaderTableCh.addCell(new Phrase(""+date, tabletext));
									if(flagMark.equalsIgnoreCase("L")){
										HeaderTableCh.addCell(new Phrase(""+trandResult+" " +"L", subheaderUNDERLINE));
									}else if(flagMark.equalsIgnoreCase("H")){
										HeaderTableCh.addCell(new Phrase(""+trandResult+" " +"H", subheaderUNDERLINE));
									}else if(flagMark.equalsIgnoreCase("Abnormal")){
										HeaderTableCh.addCell(new Phrase(trandResult, subheaderUNDERLINE));
									}else{
										HeaderTableCh.addCell(new Phrase(""+trandResult, tabletext));
									}
									
									HeaderTableCh.addCell(new Phrase(""+NormalValues, tabletext));
									HeaderTableCh.addCell(new Phrase(""+Units, tabletext));
									HeaderTableCh.addCell(new Phrase("", tabletext));
									index++;
									recoundCount++;
							     }
						 		}
						 		}
						 		
						 		
				     			document.add(HeaderTableCh);
				 		    	HeaderTableCh.flushContent();
						       
							//}
				       	// ===================== code for trend analysis end=====================//
						
						//}
						}
					}
				 
			}
			
		
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
            
            PdfPTable HeaderTable31 = new PdfPTable(2);
            int[] headerwidth30 = {5,30};
            HeaderTable31.setWidths(headerwidth30);
            HeaderTable31.setWidthPercentage(95f);
            HeaderTable31.getDefaultCell().setBorder(Rectangle.NO_BORDER);
            htmlWorker.setMargins(50, 100, 100, 150);
            
        	Phrase p1 = new Phrase("Interpretation: ", subheader);
			PdfPCell celll1 = new PdfPCell(p1);
			celll1.setHorizontalAlignment(Element.ALIGN_LEFT);
			celll1.setBorder(Rectangle.NO_BORDER);
			//HeaderTable31.addCell(celll1);
			HeadertableNote.addCell(celll1);
			
			Phrase p2 = new Phrase(" ", tableheader15);
			PdfPCell celll2 = new PdfPCell(p2);
			celll2.setHorizontalAlignment(Element.ALIGN_LEFT);
			celll2.setBorder(Rectangle.NO_BORDER);
            
		 	if (list.get(pro).getInterpretationCheck().equalsIgnoreCase("Y")) {
		 		HeaderTable31.addCell("");
		 		HeaderTable31.addCell("");
		 	
		 	
		 		 document.add(HeaderTable31);
		 		HeaderTable31.flushContent();
				String interpretationData = list.get(pro).getInterpretation();
				System.out.println("interpretationData====="+interpretationData);
				java.util.List<Element> parseHtmlToList= HTMLWorker.parseToList(new StringReader(interpretationData), styleSheet);
			
				
                for(Element e:parseHtmlToList){
                    if (e instanceof PdfPTable){
                        PdfPTable htmlTable = new PdfPTable(1);
                        int[] htmlTableWidth = {50};
                        htmlTable.setWidths(htmlTableWidth);
                        htmlTable.setWidths(htmlTableWidth);
                        htmlTable.setWidthPercentage(50f);
                        htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
                        htmlTable = (PdfPTable)e;
                        //HeaderTable31.addCell(htmlTable);
                      //  HeaderTable31.addCell("");
                      HeadertableNote.addCell(htmlTable);
                      //HeadertableNote.addCell("");
                       //document.add(HeaderTable31);
                       document.add(HeadertableNote);
                       // HeaderTable31.flushContent();
                       HeadertableNote.flushContent();
                    }else{
                    	paragraph.add(e);
                    	celll2 = new PdfPCell(paragraph);
                    	celll2.setBorder(Rectangle.NO_BORDER);
                        //HeaderTable31.addCell(celll2);
                        //HeaderTable31.addCell("");
                         HeadertableNote.addCell(celll2);
                        // HeadertableNote.addCell("");
                        document.add(HeadertableNote);
                       // HeaderTable31.flushContent();
                      HeadertableNote.flushContent();
                        paragraph.clear();
                    }
                }
			}
			
			
						//End Interpretation
			//start comments
				PdfPTable HeadertableComment = new PdfPTable(2);
						int[] HeaderWidthComment = { 5, 30 };
						HeadertableComment.setWidths(HeaderWidthComment);
						HeadertableComment.setWidthPercentage(95f);
						HeadertableComment.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			 
			Phrase pc1 = new Phrase("Comments: ", subheader);
			PdfPCell celllc1 = new PdfPCell(pc1);
			celllc1.setHorizontalAlignment(Element.ALIGN_LEFT);
			celllc1.setBorder(Rectangle.NO_BORDER);
			//HeaderTable31.addCell(celll1);
			HeadertableComment.addCell(celllc1);
			
			
			Phrase pc2 = new Phrase(" ", tableheader15);
			PdfPCell celllc2 = new PdfPCell(pc2);
			celllc2.setHorizontalAlignment(Element.ALIGN_LEFT);
			celllc2.setBorder(Rectangle.NO_BORDER);
			if (list.get(pro).getCommentCheck().equalsIgnoreCase("Y")) {
				HeaderTable31.addCell("");
		 		HeaderTable31.addCell("");
		 		
		 		
		 		 document.add(HeaderTable31);
		 		HeaderTable31.flushContent();
				String interpretationData = list.get(pro).getProfileMasterComment();
				System.out.println("interpretationData====="+interpretationData);
				java.util.List<Element> parseHtmlToList= HTMLWorker.parseToList(new StringReader(interpretationData), styleSheet);
                for(Element e:parseHtmlToList){
                    if (e instanceof PdfPTable){
                        PdfPTable htmlTable = new PdfPTable(1);
                        int[] htmlTableWidth = {50};
                        htmlTable.setWidths(htmlTableWidth);
                        htmlTable.setWidths(htmlTableWidth);
                        htmlTable.setWidthPercentage(50f);
                        htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
                        htmlTable = (PdfPTable)e;
                        //HeaderTable31.addCell(htmlTable);
                        //HeaderTable31.addCell("");
                      HeadertableComment.addCell(htmlTable);
                      //HeadertableNote.addCell("");
                     
                       //document.add(HeaderTable31);
                       document.add(HeadertableComment);
                       // HeaderTable31.flushContent();
                       HeadertableComment.flushContent();
                    }else{
                    	paragraph.add(e);
                    	celllc2 = new PdfPCell(paragraph);
                    	celllc2.setBorder(Rectangle.NO_BORDER);
                        //HeaderTable31.addCell(celll2);
                        //HeaderTable31.addCell("");
                          //HeadertableNote.addCell("");
                         HeadertableComment.addCell(celllc2);
                        // HeadertableNote.addCell("");
                        document.add(HeadertableComment);
                       // HeaderTable31.flushContent();
                      HeadertableComment.flushContent();
                        paragraph.clear();
                    }
                }
			
				
			}
			// end comments
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
		         
	  	    	if(list.get(pro).getMachineId() > 0){
	  	    		 document.add(HeaderTableEquip);
	  	    		HeaderTableEquip.flushContent();
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
			
			   	document.add(HeaderTableTechN);
			   	HeaderTableTechN.flushContent();
				// ====================================================================================
						
						
				// start footer page
				

		PageEventHandlerBean eventObj = new PageEventHandlerBean();
		//HttpServletRequest request = eventObj.getRequest();
		
		String covide = (String) request.getAttribute("covide");
		//Integer postId = (Integer) request.getAttribute("postId");
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		//String hospitalName = (String) resourceBundleEhat.getString("hospitalName");
		if (covide.equalsIgnoreCase("Yes")) {

		} else {

			

			//PatientModel patModel = new PatientModel();
			System.err.println("postId..." + postId);
			if (postId == null) {
				postId = 1;
			}
		
			UsersService uss1 = (ApplicationContextUtils.getApplicationContext()).getBean(UsersService.class);
			
			Users userDetails=uss1.getUsersByUserIdForLISPrint(postId);

			String signOneDocName = "";
			String signOneImageName = "";
			String signTwoDocName = "";
			String signTwoImageName = "";
			String signThreeDocName = "";
			String signThreeImageName = "";
			String signTechImageName = "";
			
			if(userDetails.getUsersList().size() > 0) {
				signOneDocName = userDetails.getUsersList().get(0). getSign_one_doctor();
				signOneImageName = userDetails.getUsersList().get(0).getSign_one();
				signTwoDocName = userDetails.getUsersList().get(0).getSign_one_doctor();
				signTwoImageName = "";
				signThreeDocName = userDetails.getUsersList().get(0).getSign_two_doctor();
				signThreeImageName = userDetails.getUsersList().get(0).getSign_two();
				signTechImageName = userDetails.getUsersList().get(0).getSign_one();
			}
			

		
			Font tabletextSign = new Font(Font.HELVETICA, 8, Font.BOLD);
			PdfPTable table = new PdfPTable(3);

			try {
				//String path1 = "";
				//String path2 = "";
				String path3 = "";

				Image imageOneSign = null;
				PdfPCell cellOneSign = null;

				Image imageTwoSign = null;
				PdfPCell cellTwoSign = null;

				Image imageThreeSign = null;
				PdfPCell cellThreeSign = null;
				
				// added for technician signature
				String path4 = "";
				Image imageTechSign = null;
				PdfPCell cellTechSign = null;
				
				// end technician

				PdfPTable Headertable2 = new PdfPTable(5);
				int[] HeaderWidth2 = { 20, 20, 20, 20, 20 };
				Headertable2.setWidths(HeaderWidth2);
				Headertable2.setWidthPercentage(95f);
				Headertable2.setTotalWidth(527);
				Headertable2.setLockedWidth(true);
				Headertable2.getDefaultCell().setFixedHeight(50);
				Headertable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				if (signOneImageName.equalsIgnoreCase(null) || signOneImageName.equalsIgnoreCase("")
						|| signTwoImageName.equalsIgnoreCase(null) || signTwoImageName.equalsIgnoreCase("")
						|| signThreeImageName.equalsIgnoreCase(null) || signThreeImageName.equalsIgnoreCase(""))

				{
					if (signOneImageName.equalsIgnoreCase(null) || signOneImageName.equalsIgnoreCase("")
							|| signThreeImageName.equalsIgnoreCase(null) || signThreeImageName.equalsIgnoreCase("")) {
						
						if (signTwoImageName.equalsIgnoreCase(null) || signTwoImageName.equalsIgnoreCase("") ||
							signOneImageName.equalsIgnoreCase(null) || signOneImageName.equalsIgnoreCase("")) {
							// Set 1st & 3nd sign on left & right bottom

							try {
								
								String pathToWeb3 = FilePath.getBasePath();
								path3 = pathToWeb3 + signThreeImageName; // "Dr.Amita Neelakantan.jpg";
								imageThreeSign = Image.getInstance(path3);
								imageThreeSign.scaleAbsolute(90, 50);
								cellThreeSign = new PdfPCell();
								cellThreeSign.addElement(new Chunk(imageThreeSign, 5, -5));
								cellThreeSign.setBorder(Rectangle.NO_BORDER);
								cellThreeSign.setHorizontalAlignment(Element.ALIGN_CENTER);

								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(cellThreeSign);

								PdfPCell cells30 = new PdfPCell(
										new Phrase(signOneDocName.replaceAll("@", "\n"), tabletextSign));
								cells30.setHorizontalAlignment(Element.ALIGN_CENTER);
								cells30.setBorder(Rectangle.NO_BORDER);
								
								Headertable2.addCell(cells30);
								
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));

								PdfPCell cells33 = new PdfPCell(
										new Phrase(signThreeDocName.replaceAll("@", "\n"), tabletextSign));
								cells33.setHorizontalAlignment(Element.ALIGN_CENTER);
								cells33.setBorder(Rectangle.NO_BORDER);
								
								Headertable2.addCell(cells33);
								
							} catch (Exception e) {
								e.printStackTrace();
							}

						} else {
							// Set Third sign on right bottom

							// Set 1st & 3nd sign on left & right bottom

							try {
								
								String pathToWeb3 = FilePath.getBasePath();
								path3 = pathToWeb3 + signThreeImageName; // "Dr.Amita Neelakantan.jpg";
								imageThreeSign = Image.getInstance(path3);
								imageThreeSign.scaleAbsolute(90, 50);
								cellThreeSign = new PdfPCell();
								cellThreeSign.addElement(new Chunk(imageThreeSign, 5, -5));
								cellThreeSign.setBorder(Rectangle.NO_BORDER);
								cellThreeSign.setHorizontalAlignment(Element.ALIGN_CENTER);

								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(cellThreeSign);

								PdfPCell cells30 = new PdfPCell(
										new Phrase(signOneDocName.replaceAll("@", "\n"), tabletextSign));
								cells30.setHorizontalAlignment(Element.ALIGN_CENTER);
								cells30.setBorder(Rectangle.NO_BORDER);
								
								Headertable2.addCell(cells30);
								
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));

								PdfPCell cells33 = new PdfPCell(
										new Phrase(signThreeDocName.replaceAll("@", "\n"), tabletextSign));
								cells33.setHorizontalAlignment(Element.ALIGN_CENTER);
								cells33.setBorder(Rectangle.NO_BORDER);
								
								Headertable2.addCell(cells33);
								
							} catch (Exception e) {
								e.printStackTrace();
							}

						
							
							
						}

					} else {
						
						// Set 1st & 3nd sign on left & right bottom

						try {
							
							String pathToWeb3 = FilePath.getBasePath();
							path3 = pathToWeb3 + signThreeImageName; // "Dr.Amita Neelakantan.jpg";
							imageThreeSign = Image.getInstance(path3);
							imageThreeSign.scaleAbsolute(90, 50);
							cellThreeSign = new PdfPCell();
							cellThreeSign.addElement(new Chunk(imageThreeSign, 5, -5));
							cellThreeSign.setBorder(Rectangle.NO_BORDER);
							cellThreeSign.setHorizontalAlignment(Element.ALIGN_CENTER);
							
							String pathToWeb4 = FilePath.getBasePath();
							path4 = pathToWeb4 + signTechImageName; // "Dr.Amita Neelakantan.jpg";
							imageTechSign = Image.getInstance(path4);
							imageTechSign.scaleAbsolute(90, 50);
							cellTechSign= new PdfPCell();
							cellTechSign.addElement(new Chunk(imageTechSign, 5, -5));
							cellTechSign.setBorder(Rectangle.NO_BORDER);
							cellTechSign.setHorizontalAlignment(Element.ALIGN_CENTER);

							Headertable2.addCell(cellTechSign);
							Headertable2.addCell(new Phrase(" ", tabletextSign));
							Headertable2.addCell(new Phrase(" ", tabletextSign));
							Headertable2.addCell(new Phrase(" ", tabletextSign));
							Headertable2.addCell(cellThreeSign);

							PdfPCell cells30 = new PdfPCell(
									new Phrase(signOneDocName.replaceAll("@", "\n"), tabletextSign));
							cells30.setHorizontalAlignment(Element.ALIGN_CENTER);
							cells30.setBorder(Rectangle.NO_BORDER);
							
							Headertable2.addCell(cells30);
							
							Headertable2.addCell(new Phrase(" ", tabletextSign));
							Headertable2.addCell(new Phrase(" ", tabletextSign));
							Headertable2.addCell(new Phrase(" ", tabletextSign));

							PdfPCell cells33 = new PdfPCell(
									new Phrase(signThreeDocName.replaceAll("@", "\n"), tabletextSign));
							cells33.setHorizontalAlignment(Element.ALIGN_CENTER);
							cells33.setBorder(Rectangle.NO_BORDER);
							
							Headertable2.addCell(cells33);
							
						} catch (Exception e) {
							e.printStackTrace();
						}

					}

				} else {
					// Set 1st, 2nd & 3nd sign on left,Center & right bottom

					try {

						String pathToWeb1 = FilePath.getBasePath();
						path1 = pathToWeb1 + signOneImageName; // "Dr.Amita Neelakantan.jpg";
						imageOneSign = Image.getInstance(path1);
						imageOneSign.scaleAbsolute(90, 50);
						cellOneSign = new PdfPCell();
						cellOneSign.addElement(new Chunk(imageOneSign, 5, -5));
						cellOneSign.setBorder(Rectangle.NO_BORDER);

						String pathToWeb2 = FilePath.getBasePath();
						path2 = pathToWeb2 + signTwoImageName; // "Dr.Amita Neelakantan.jpg";
						imageTwoSign = Image.getInstance(path2);
						imageTwoSign.scaleAbsolute(90, 50);
						cellTwoSign = new PdfPCell();
						cellTwoSign.addElement(new Chunk(imageTwoSign, 5, -5));
						cellTwoSign.setBorder(Rectangle.NO_BORDER);

						String pathToWeb3 = FilePath.getBasePath();
						path3 = pathToWeb3 + signThreeImageName; // "Dr.Amita Neelakantan.jpg";
						imageThreeSign = Image.getInstance(path3);
						imageThreeSign.scaleAbsolute(90, 50);
						cellThreeSign = new PdfPCell();
						cellThreeSign.addElement(new Chunk(imageThreeSign, 5, -5));
						cellThreeSign.setBorder(Rectangle.NO_BORDER);
						cellThreeSign.setHorizontalAlignment(Element.ALIGN_CENTER);

						Headertable2.addCell(cellOneSign);
						Headertable2.addCell(new Phrase(" ", tabletextSign));
						Headertable2.addCell(cellTwoSign);
						Headertable2.addCell(new Phrase(" ", tabletextSign));
						Headertable2.addCell(cellThreeSign);

						PdfPCell cells30 = new PdfPCell(
								new Phrase(signOneDocName.replaceAll("@", "\n"), tabletextSign));
						cells30.setHorizontalAlignment(Element.ALIGN_CENTER);
						cells30.setBorder(Rectangle.NO_BORDER);
						Headertable2.addCell(cells30);

						Headertable2.addCell(new Phrase(" ", tabletextSign));

						PdfPCell cells31 = new PdfPCell(
								new Phrase(signTwoDocName.replaceAll("@", "\n"), tabletextSign));
						cells31.setHorizontalAlignment(Element.ALIGN_CENTER);
						cells31.setBorder(Rectangle.NO_BORDER);
						Headertable2.addCell(cells31);

						Headertable2.addCell(new Phrase(" ", tabletextSign));

						PdfPCell cells33 = new PdfPCell(
								new Phrase(signThreeDocName.replaceAll("@", "\n"), tabletextSign));
						cells33.setHorizontalAlignment(Element.ALIGN_CENTER);
						cells33.setBorder(Rectangle.NO_BORDER);
						Headertable2.addCell(cells33);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}

				String headerFlag = (String) request.getAttribute("headerFlag");
				if (headerFlag.equalsIgnoreCase("No")) {
					// set page total number
                 
					
					String footerAddress = (String) request.getAttribute("footerAddress");
					table.setWidths(new int[] { 80, 18, 2 });
					table.setTotalWidth(527);
					table.setLockedWidth(true);
					table.getDefaultCell().setFixedHeight(20);
					table.getDefaultCell().setBorder(Rectangle.TOP);

				
					table.addCell(new Phrase(footerAddress, tabletext));

					table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
					table.addCell(new Phrase(String.format("\nPage %d of ", pdfWriter.getPageNumber()), tabletext));
					 PdfTemplate total = pdfWriter.getDirectContent().createTemplate(35, 28);
					PdfPCell cell1 = new PdfPCell(Image.getInstance(total));
				    cell1.setBorder(Rectangle.TOP);
					cell1.setBorderColor(Color.BLACK);
					table.addCell(cell1);

					// PdfContentByte canvas = pdfWriter.getDirectContent();
					// canvas.beginMarkedContentSequence(PdfName.BASEFONT);

					table.writeSelectedRows(0, -1, document.left(document.leftMargin()), 20,
							pdfWriter.getDirectContent());
					Headertable2.writeSelectedRows(0, -1, document.left(document.leftMargin()), 120,
							pdfWriter.getDirectContent());

				} else {

					// set page total number
					String footerAddress = (String) request.getAttribute("footerAddress");
					table.setWidths(new int[] { 80, 18, 2 });
					table.setTotalWidth(527);
					table.setLockedWidth(true);
					table.getDefaultCell().setFixedHeight(20);
					table.getDefaultCell().setBorder(Rectangle.TOP);

					// table.addCell(new Phrase(strHeader, tabletext));
					// below line removed by Rohit to get full footer address on 12-08-2021
					// strHeader=footerAddress.replaceAll("@", "\n");
					table.addCell(new Phrase(footerAddress, tabletext));

					table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
					table.addCell(new Phrase(String.format("\nPage %d of ", pdfWriter.getPageNumber()), tabletext));
					 PdfTemplate total = pdfWriter.getDirectContent().createTemplate(35, 28);
					PdfPCell cell1 = new PdfPCell(Image.getInstance(total));
					cell1.setBorder(Rectangle.TOP);
					cell1.setBorderColor(Color.BLACK);
					table.addCell(cell1);

					// PdfContentByte canvas = pdfWriter.getDirectContent();
					// canvas.beginMarkedContentSequence(PdfName.BASEFONT);

				//	table.writeSelectedRows(0, -1, document.left(document.leftMargin()), 20,
						//	pdfWriter.getDirectContent());// add line in bottom
					Headertable2.writeSelectedRows(0, -1, document.left(document.leftMargin()), 120,
							pdfWriter.getDirectContent());
					// table.writeSelectedRows(0, -1, 44, 50, pdfWriter.getDirectContent());

					// canvas.endMarkedContentSequence();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	
				// End Fotter page
			
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