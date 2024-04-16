<%@page import="com.hms.users.service.UsersService"%>
<%@page import="com.hms.dto.Users"%>
<%@page import="com.hms.opdbill.service.OpdBillService"%>
<%@page import="com.hms.opdbill.controller.OpdBillController"%>
<%@page import="com.hms.opdbill.dto.PatientHeaderInfoDto"%>
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
		document.setMargins(20, 20, 20, 72);
		
		Font header = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font headerUnderline = new Font(Font.HELVETICA, 11, Font.BOLD | Font.UNDERLINE);
		Font subheader = new Font(Font.HELVETICA, 8, Font.BOLD);
		Font subheaderProfile = new Font(Font.HELVETICA, 11, Font.BOLD);
		Font footer = new Font(Font.HELVETICA, 9, Font.BOLD);
		header.setColor(10, 4, 2);
		Font tableheader22 = new Font(Font.HELVETICA, 20, Font.BOLD);
		Font tableheader11 = new Font(Font.HELVETICA, 12, Font.BOLD);
		Font tableheader111 = new Font(Font.HELVETICA, 12, Font.BOLD);
		Font tableheader12 = new Font(Font.COURIER, 12, Font.BOLD);
		Font tableheader13 = new Font(Font.HELVETICA, 9, Font.BOLD);
		Font tableheader14 = new Font(Font.HELVETICA, 9,Font.BOLD | Font.UNDERLINE);
		Font tableheader = new Font(Font.HELVETICA, 12, Font.BOLD);
		Font tabletext = new Font(Font.HELVETICA, 8, Font.NORMAL);
		Font tabletext7 = new Font(Font.HELVETICA, 8, Font.NORMAL);
		Font tableheader15 = new Font(Font.HELVETICA, 10, Font.NORMAL);		
		Font small = new Font(Font.HELVETICA, 8, Font.NORMAL);
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
		String headrFlag = request.getParameter("headrFlag");
		String labName = (String) resource.getObject("labName").toString();
	     if(headrFlag.equalsIgnoreCase("Y")){
	    	 request.setAttribute("headerFlag", "Yes");
	     }else{
	    	 request.setAttribute("headerFlag", "No");
	     }
		
		request.setAttribute("covide", "No");
		request.setAttribute("pageIteration", 0);
		//request.setAttribute("footerAddress", "Processed at: Lifenity Wellness Int Ltd., CSMIA, Terminal 2, Level P-9, East Zone, Andheri, Mumbai-400099");
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
		/* if(list.size() > 0){
			profileName=list.get(0).getPathologySampleWiseSlave().get(0).getProfileName();
		} */
		
		
		for(int pro = 0; pro < list.size(); pro++) {
			 System.out.println("profileName==="+list.get(pro).getProfileName());
		       
			profileName =profileName+"_"+ list.get(pro).getProfileName();
			
		}
		
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
			     
		//PdfWriter pdfWriter = PdfWriter.getInstance(document, outStream);	
		PdfWriter pdfWriter = PdfWriter.getInstance(document, outStream);
		//TempEventHandlerLISPDF event = new TempEventHandlerLISPDF();
		//pdfWriter.setPageEvent(event);

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

		//String path1 = "";

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
			String age = rtd.getAge();
			String[] ageArray = age.split("/");
			String finalAge = ageArray[0];
			if (ageArray[0].equalsIgnoreCase("0Y")) {
				finalAge = ageArray[1];
			}
			if (ageArray[0].equalsIgnoreCase("0Y") && ageArray[1].equalsIgnoreCase("0M")) {
				finalAge = ageArray[2];
			}

			String dob = rtd.getDob();
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
			String id = rtd.getProofId();
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

			if (rtd.getBusinessType() == 2) {
				int refferSource = rtd.getReferSource();

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
			
			/*
			 * String customerName = ""; if(rtd.getCustomerName().equalsIgnoreCase("-")){
			 * customerName="Self"; }else{ customerName=rtd.getCustomerName(); }
			 */

			HospitalDetailAdminService hs1 = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails1 = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj1 = arrHospitalDetails.get(0);

			Phlebotomyservice phlebotomyservice1 = (ApplicationContextUtils.getApplicationContext())
					.getBean(Phlebotomyservice.class);
			List<PathologySampleWiseMaster> list1 = phlebotomyservice.getRoutinevalueResutlusingPrint(masterIdd,
					treatmentId, patientType, unitId, request);

			String barcodenumber1 = list1.get(0).getBarCode();

			String collecteddate1 = list1.get(0).getCollecteddate();
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
				collecteddate1 = list1.get(0).getCollecteddate();
			} else {
				collecteddate1 = "-";
			}
			String postdate1H = list1.get(0).getPostdate();

			String postdateH= "";
			if (postdate1H != null) {

				postdate1H = list1.get(0).getPostdate();
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
			String lisLogoPath = hospObj1.getLisLogoPath();
			String path2H = context.getRealPath(pathH);
			
			System.out.println("path2H===="+path2H);
			
			Image img124 = null;
			PdfPCell cell13 = null;

			try {
				img124 = Image.getInstance(path2H);
				img124.scaleAbsolute(100, 70);

				cell13 = new PdfPCell();
				cell13.addElement(new Chunk(img124, 1, -40));
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
				if(headrFlag.equalsIgnoreCase("Y")){
				HeaderTable1.addCell(cell13);
				}else{
					HeaderTable1.addCell("");
				}
			}

			Font bold = new Font(Font.TIMES_ROMAN, 8, Font.BOLD);
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
			if(headrFlag.equalsIgnoreCase("Y")){
				HeaderTable1.addCell(hospitalNameCell);
				
				
			}else{
				PdfPTable HeaderTableSpace = new PdfPTable(1);
				int[] headerwidthSpace = {40 };
				HeaderTableSpace.setWidths(headerwidthSpace);
				HeaderTableSpace.setWidthPercentage(95f);
				HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTableSpace.setSpacingAfter(62.0f);
				
				HeaderTableSpace.addCell(new Phrase("", tabletext));
				HeaderTableSpace.addCell(new Phrase("", tabletext));
				HeaderTableSpace.addCell(new Phrase("", tabletext));
				HeaderTableSpace.addCell(new Phrase("", tabletext));
				HeaderTableSpace.addCell(new Phrase("", tabletext));
	  			document.add(HeaderTableSpace);
	  			HeaderTableSpace.flushContent();	
			}
			
			
			PdfPTable HeaderTableSpace = new PdfPTable(1);
			int[] headerwidthSpace = {40 };
			HeaderTableSpace.setWidths(headerwidthSpace);
			HeaderTableSpace.setWidthPercentage(95f);
			HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTableSpace.setSpacingAfter(20.0f);
			
			HeaderTableSpace.addCell(new Phrase("", tabletext));
			HeaderTableSpace.addCell(new Phrase("", tabletext));
			HeaderTableSpace.addCell(new Phrase("", tabletext));
			HeaderTableSpace.addCell(new Phrase("", tabletext));
			HeaderTableSpace.addCell(new Phrase("", tabletext));
  		//	document.add(HeaderTableSpace);
  			//HeaderTableSpace.flushContent();

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
			    if(headrFlag.equalsIgnoreCase("Y")){
					PdfPTable HeaderTableSpace1 = new PdfPTable(1);
					int[] headerwidthSpace1 = {40 };
					HeaderTableSpace1.setWidths(headerwidthSpace1);
					HeaderTableSpace1.setWidthPercentage(95f);
					HeaderTableSpace1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTableSpace1.setSpacingAfter(0.01f);
					
					HeaderTableSpace1.addCell(new Phrase("", tabletext));
					HeaderTableSpace1.addCell(new Phrase("", tabletext));
					HeaderTableSpace1.addCell(new Phrase("", tabletext));
					HeaderTableSpace1.addCell(new Phrase("", tabletext));
					HeaderTableSpace1.addCell(new Phrase("", tabletext));
		  			document.add(HeaderTableSpace1);
		  			HeaderTableSpace1.flushContent();
				}
			
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
			//patientDetailsHeader.addCell(new Phrase("Sample UID No.  ", subheader));
			//patientDetailsHeader.addCell(new Phrase(": " + barcodenumber1.trim(), tabletext));

			
			
			// added by Rohit on 10-08-2021 to set customer type on PDF print header
			
            if ((rtd1.getIdentificationNo().trim()).equals("") || rtd1.getProofId().equals("0")) {
				
			//	patientDetailsHeader.addCell(new Phrase("", tabletext));
				//patientDetailsHeader.addCell(new Phrase("", tabletext));
			//	patientDetailsHeader.addCell(new Phrase("", tabletext));
			//	patientDetailsHeader.addCell(new Phrase("", tabletext));
			} else {
				
			//	patientDetailsHeader.addCell(new Phrase("Patient UID No.  ", subheader));
			//	patientDetailsHeader.addCell(new Phrase(": " + rtd1.getIdentificationNo() + " (" + idProof + ")", tabletext));
				//patientDetailsHeader.addCell(new Phrase("", tabletext));
			//	patientDetailsHeader.addCell(new Phrase("", tabletext));
			}
			
			// added by Rohit on 10-08-2021 to set customer type on PDF print header
			//patientDetailsHeader.addCell(new Phrase("Ref. Doctor Name  ", subheader));
			//patientDetailsHeader.addCell(new Phrase(": " + rtd.getRefDoctorName(), tabletext));

								Barcode128 code128 = new Barcode128();
						   		
						   		code128.setSize(7f);
						  		code128.setBarHeight(15);
						   		//Jitendra 15 March 2019
								code128.setBaseline(-1);
								code128.setGenerateChecksum(true);
								code128.setCodeType(Barcode128.CODE128);
								System.out.println("Barcode128.CODE128 "+Barcode128.CODE128);
				                    
								code128.setCode(Integer.toString(rtd.getPatientId()));
								
								PdfContentByte contentByte;
								//contentByte = writer.getDirectContent();
								
			
			//patientDetailsHeader.addCell(code128.createImageWithBarcode(contentByte, null, null));
			//patientDetailsHeader.addCell(new Phrase("", tabletext));
					
								
								
			
			

			
			Barcode128 code129H = new Barcode128();

			//PdfContentByte canvas = writer.getDirectContentUnder();

			
	       

			
			//patientDetailsHeader.addCell(code128.createImageWithBarcode(contentByte, null, null));
			//patientDetailsHeader.addCell(new Phrase(": " + rtd.getCategoryName(), tabletext));
			
			 
			 
			  patientDetailsHeader.addCell(new Phrase(" ", subheader));
			  patientDetailsHeader.addCell(new Phrase(" ", tabletext));
			patientDetailsHeader.addCell(new Phrase("", subheader));
			patientDetailsHeader.addCell(new Phrase("", tabletext));
			patientDetailsHeader.addCell(new Phrase(" ", subheader));
			patientDetailsHeader.addCell(new Phrase(" ", subheader));

			
			/*
			 * patientDetailsHeader.addCell(new Phrase(" ", subheader));
			 * patientDetailsHeader.addCell(new Phrase(" ", tabletext));
			 * patientDetailsHeader.addCell(new Phrase(" ", subheader));
			 * patientDetailsHeader.addCell(new Phrase(" ", tabletext));
			 */
			// patientDetailsHeader.addCell(code128.createImageWithBarcode(canvas, null,
			// null));

		
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
			String testHeadFlag=list.get(pro).getTestHeaderFlag();
			 System.out.println("testHeadFlag==="+testHeadFlag);
			/* if(list.size() > 1){
		//document.newPage();
			}else{} */
			
			 if(pro > 0){
			 //document.newPage();
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
		        HeaderTable121.addCell(new Phrase( list.get(pro).getPathologySampleWiseSlave().get(0).getProfileName(),subheaderProfile));
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
				//testdattPdfPTable HeaderTable5 = new PdfPTable(7);
			        PdfPTable HeaderTable5 = new PdfPTable(1);
			        int[] headerwidth5 = { 27 };
			      HeaderTable5.setWidths(headerwidth5);
			      HeaderTable5.setWidthPercentage(95f);
			      HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

				if(list.size() > 1){

 				    
				       if(list.get(0).getPageno()=="Y" && codefbsppbss==true){
				    	  
			    	    codefbsppbss=false;
			     		/* Headertable1.addCell(new Phrase("", tabletext));	
			    		Headertable1.addCell(new Phrase(""+Profile, header));
			    		Headertable1.addCell(new Phrase("", tabletext)); */
			    		   Headertable1.addCell(new Phrase("", tabletext));	
				   PdfPCell cells26 = new PdfPCell(new Phrase(Profile, subheaderProfile));
				   cells26.setHorizontalAlignment(Element.ALIGN_CENTER);
				   cells26.setBorder(Rectangle.NO_BORDER);
				   Headertable1.addCell(cells26);
				   Headertable1.addCell(new Phrase("", tabletext));
				  
				   HeaderTable5.addCell(new Phrase("", tabletext));
					document.add(HeaderTable5);
					HeaderTable5.flushContent();
			     		//Headertable1.addCell(code129.createImageWithBarcode(canvas, null, null));
			   }else if(list.get(0).getPageno()=="Y" && codefbsppbss==false){
				   PdfContentByte canvas = pdfWriter.getDirectContent();
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
			     		 PdfPCell cells26 = new PdfPCell(new Phrase(Profile, subheaderProfile));
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
			   PdfPCell cells26 = new PdfPCell(new Phrase(Profile, subheaderProfile));
			   cells26.setHorizontalAlignment(Element.ALIGN_CENTER);
			   cells26.setBorder(Rectangle.NO_BORDER);
			   Headertable1.addCell(cells26);
			   Headertable1.addCell(new Phrase("", tabletext));
			     	}
				   
				} else
			    {
					   Headertable1.addCell(new Phrase("", tabletext));	
					   PdfPCell cells26 = new PdfPCell(new Phrase(Profile, subheaderProfile));
					   cells26.setHorizontalAlignment(Element.ALIGN_CENTER);
					   cells26.setBorder(Rectangle.NO_BORDER);
					   Headertable1.addCell(cells26);
					   Headertable1.addCell(new Phrase("", tabletext));
					   
					   			
					 }	
						     //System.out.println(collecteddate+postdate);
						     // start coloumn 
						     // added by dayanand for hide coloumn for general test
						     int countColoumn=0;
						  if(list.get(pro).getTestli().size() > 0){
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
						  }   
						 // end coloumn    
						document.add(Headertable1);
						Headertable1.flushContent();
						
						 HeaderTable5.addCell(new Phrase("", tabletext));
							document.add(HeaderTable5);
							HeaderTable5.flushContent();
						
						
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
						
						PdfPTable Headertable = new PdfPTable(5);
						int[] HeaderWidth = { 0, 45, 50, 30, 25 };
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
				       	 	String unitTread=list.get(pro).getTestli().get(i).getUnitname();
								DefaultCategoryDataset mychartData=new DefaultCategoryDataset();
								
						 	/* 	for(int p=0; p < list.get(pro).getTestli().get(i).getTreandAnalysisList().size(); p++ ){ */	
						 			for(int p=0; p < list.get(pro).getTestli().get(i).getTreandAnalysisGraphList().size(); p++ ){
							 
						 		//	String trandResult=(String)list.get(pro).getTestli().get(i).getTreandAnalysisList().get(p);
						 			//String trandDate=(String)list.get(pro).getTestli().get(i).getTreandAnalysisDateList().get(p);
						 			
						 				String trandResult=(String)list.get(pro).getTestli().get(i).getTreandAnalysisGraphList().get(p);
						 			String trandDate=(String)list.get(pro).getTestli().get(i).getTreandAnalysissGraphDateList().get(p);
						 			String sresult=trandResult.replaceAll("[^a-zA-Z0-9,.]", "");
						 			System.out.println("trandResult====="+sresult);
						 			SimpleDateFormat month_date = new SimpleDateFormat("dd-MMM-yy", Locale.ENGLISH);
						 		    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

						 		    Date date1 = sdf.parse(trandDate);

						 		    String month_name = month_date.format(date1);
							   		//mychartData.setValue(Float.parseFloat(trandResult),"Result Value",trandDate);
						 			mychartData.setValue(Float.parseFloat(sresult),"",month_name);
							   		
						 		}
						 			JFreeChart my2DChart=ChartFactory.createLineChart(list.get(pro).getTestli().get(i).getTestName(), "Visit Date","value ("+unitTread+")",mychartData,PlotOrientation.VERTICAL,false,false,true);

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
					//	document.add(trendTable1);
				    	//trendTable1.flushContent();
						
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
					         
					         }
							         else{
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
							
								 
									System.out.println("test list====="+list.get(pro).getTestli().size());
								String TestName = list.get(pro).getTestli().get(i).getTestName();
								System.out.println("TestName====="+TestName);
								String TestResult = list.get(pro).getTestli().get(i).getTestresult();
								String LowValues = list.get(pro).getTestli().get(i).getLowvalue();
								String HighValues = list.get(pro).getTestli().get(i).getHighvalue();
								//String dateresult = list.get(pro).getTestli().get(i).getTrendanalysisDate();
								
								
								String NormalValues ="";
								
								if(HighValues!=null){
							//NormalValues = LowValues + "-" + HighValues;
									NormalValues = LowValues + "  -  " + HighValues;
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
								System.out.println("valueType11====="+valueType);
								String unitNameGenaral=list.get(pro).getTestli().get(i).getUnitNameGenaral();
								System.out.println("unitNameGenaral====="+unitNameGenaral);
								if (unitNameGenaral == null || unitNameGenaral.equalsIgnoreCase("null")|| unitNameGenaral.equalsIgnoreCase("") || unitNameGenaral.equalsIgnoreCase("-")) {
									 unitNameGenaral="";
								}
                                
								String biologicalReferenceChk=list.get(pro).getTestli().get(i).getBiologicalReferenceChk();			
								String sampleTypeChk=list.get(pro).getTestli().get(i).getSampleTypeChk();
								String testMethodChk=list.get(pro).getTestli().get(i).getTestMethodChk();
								
								String biologicalReferenceWithGeneral=list.get(pro).getTestli().get(i).getBiologicalReferenceWithGeneral();
								System.out.println("biologicalReferenceWithGeneral====="+biologicalReferenceWithGeneral);
								if (biologicalReferenceWithGeneral == null || biologicalReferenceWithGeneral.equalsIgnoreCase("null")|| biologicalReferenceWithGeneral.equalsIgnoreCase("") || biologicalReferenceWithGeneral.equalsIgnoreCase("-")) {
									biologicalReferenceWithGeneral="";
								}
								System.out.println("NormalValues====="+NormalValues);
								if (NormalValues == null || NormalValues.equalsIgnoreCase("null")|| NormalValues.equalsIgnoreCase("") || NormalValues.equalsIgnoreCase("-")) {
									NormalValues="";
								}
								
								String biologicalReferenceWithNormal=list.get(pro).getTestli().get(i).getBiologicalReferenceWithNormal();
								
								String testNote=list.get(pro).getTestli().get(i).getTestNote();
								if (testNote == null || testNote.equalsIgnoreCase("null")|| testNote.equalsIgnoreCase("") || testNote.equalsIgnoreCase("-")) {
									testNote="";
								}
								System.out.println("testNote====="+testNote);
								
								if(!(TestResult.equalsIgnoreCase("0") || TestResult.equalsIgnoreCase("0.0") || TestResult.equalsIgnoreCase("0.00"))){
								// ===================== code for trend analysis start=====================//
							if(list.get(pro).getTestli().get(i).getTestId() > 0){
					       	 	if(list.get(pro).getTestli().get(i).getTrendanalysisFlag().equalsIgnoreCase("Y")){						         
								      
									DefaultCategoryDataset mychartData=new DefaultCategoryDataset();
									
							 		for(int p=0; p < list.get(pro).getTestli().get(i).getTreandAnalysisList().size(); p++ ){				 
								 
							 			String trandResult=(String)list.get(pro).getTestli().get(i).getTreandAnalysisList().get(p);
							 			String trandDate=(String)list.get(pro).getTestli().get(i).getTreandAnalysisDateList().get(p);
							 			String sresult=trandResult.replaceAll("[^a-zA-Z0-9,.]", "");
							 			System.out.println("trandResult====="+sresult);
								   		//mychartData.setValue(Float.parseFloat(trandResult),"Result Value",trandDate);
							 			mychartData.setValue(Float.parseFloat(sresult),"Result Value",trandDate);
								   		
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
							    	
							    	
							    	//document.add(trendTable);
							    	//trendTable.flushContent();
								}
							}
					       	// ===================== code for trend analysis end=====================//
								
													
							Headertable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
							Headertable.addCell(new Phrase("", tabletext));
		
							if (TestName != null) {
							    if(testHeadFlag.equalsIgnoreCase("G")){
							    	 HeadertableGeneral.addCell(new Phrase("", tabletext));
							    	 HeadertableGeneral.addCell(new Phrase("", tabletext));
							    	HeadertableGeneral.addCell(new Phrase("" + TestName, tabletext));
							    }else{
							    	Headertable.addCell(new Phrase("" + TestName, tabletext));
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
									PdfPCell cells26 = new PdfPCell(new Phrase(""+TestResult+" " +"L", subheaderUNDERLINE));
									cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
									cells26.setBorder(Rectangle.NO_BORDER);
									Headertable.addCell(cells26);
									HeadertableGeneral.addCell(cells26);
								}else if(flagmarkResult.equalsIgnoreCase("H")){
									PdfPCell cells26 = new PdfPCell(new Phrase(""+TestResult+" " +"H", subheaderUNDERLINE));
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
							        	    	PdfPCell cells26 = new PdfPCell(new Phrase(TestResult+" "+  "H", subheaderUNDERLINE));
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
								        	    	PdfPCell cells26 = new PdfPCell(new Phrase(TestResult+" "+  "L", subheaderUNDERLINE));
													cells26.setHorizontalAlignment(Element.ALIGN_LEFT);
													cells26.setBorder(Rectangle.NO_BORDER);
													Headertable.addCell(cells26);
													HeadertableGeneral.addCell(cells26);
								        	    }else if(flagmarkResult.equalsIgnoreCase("H")){
								        	    	PdfPCell cells26 = new PdfPCell(new Phrase(TestResult+" "+  "H", subheaderUNDERLINE));
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
							
							System.out.println("quantitative====="+quantitative);
							if(list.get(pro).getTestli().get(i).getTestId() > 0 ){
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
										if (NormalValues == null || NormalValues.equalsIgnoreCase("null")|| NormalValues.equalsIgnoreCase("") || (Integer)list.get(pro).getTestli().get(i).getTestId()== bunCreatRatioTestId || (Integer)list.get(pro).getTestli().get(i).getTestId()==agRatioTestId || (Integer)list.get(pro).getTestli().get(i).getTestId()==ldlhdlTestRatioTestId) {
									   
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
								if(list.get(pro).getTestli().get(i).getTestId() > 0){
									if(valueType.equalsIgnoreCase("individual"))
											{
												if (Units == null || Units.equalsIgnoreCase("null")|| Units.equalsIgnoreCase("") || (Integer)list.get(pro).getTestli().get(i).getTestId()== bunCreatRatioTestId || (Integer)list.get(pro).getTestli().get(i).getTestId()==agRatioTestId || (Integer)list.get(pro).getTestli().get(i).getTestId()==ldlhdlTestRatioTestId) {
											   
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
								
									System.out.println("sampleTypeChk====="+sampleTypeChk);
											if(list.get(pro).getTestli().get(i).getTestId() > 0 ){
													if(sampleTypeChk.equalsIgnoreCase("Y")){
														Headertable.addCell(new Phrase("", tabletext));
														if (sampletype == null || sampletype.equalsIgnoreCase("null") || sampletype.equalsIgnoreCase("")|| sampletype.equalsIgnoreCase("-")) {				    	
														Headertable.addCell(new Phrase(" ", tabletext7));
														} else {				   
														Headertable.addCell(new Phrase("Sample Type " +":"+sampletype, tabletext7));
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
								
											if(list.get(pro).getTestli().get(i).getTestId() > 0 ){
												if(testMethodChk.equalsIgnoreCase("Y")){
													Headertable.addCell(new Phrase("", tabletext));
													if (methodname == null || methodname.equalsIgnoreCase("null") || methodname.equalsIgnoreCase("")|| methodname.equalsIgnoreCase("-")) {				    	
													Headertable.addCell(new Phrase(" ", tabletext));
													} else {				   
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
														//Headertable.addCell(new Phrase("Method " +": "+methodname, tabletext7));
														Headertable.addCell(new Phrase("", tabletext));	
														HeadertableNote.addCell(new Phrase("Method:", subheader));	
														HeadertableNote.addCell(new Phrase(""+methodname, tabletext));	
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
											if(list.get(pro).getTestli().get(i).getTestId() > 0 ){
												
											
													if (testcomments == null || testcomments.equalsIgnoreCase("null") || testcomments.equalsIgnoreCase("")|| testcomments.equalsIgnoreCase("-")) {				    	
													
													} else {				   
														
														HeadertableNote.addCell(new Phrase("", tabletext));
														HeadertableNote.addCell(new Phrase("", tabletext));
														HeadertableNote.addCell(new Phrase("Comment:"   , subheader));
														HeadertableNote.addCell(new Phrase(""+testcomments, tabletext));
													}	
													
												
										}else{
											Headertable.addCell(new Phrase("", tabletext));
											Headertable.addCell(new Phrase("", tabletext));
											Headertable.addCell(new Phrase("", tabletext));	
											Headertable.addCell(new Phrase("", tabletext));
											Headertable.addCell(new Phrase("", tabletext));	
										}
										// end test comments
											
											// added for test note
											if(list.get(pro).getTestli().get(i).getTestId() > 0 ){
												
												
												if (testNote == null || testNote.equalsIgnoreCase("null") || testNote.equalsIgnoreCase("")|| testNote.equalsIgnoreCase("-")) {				    	
												
												} else {				   
													System.out.println("testNote11====="+testNote);
													HeadertableNote.addCell(new Phrase("", tabletext));
													HeadertableNote.addCell(new Phrase("", tabletext));
													HeadertableNote.addCell(new Phrase("Note:"   , subheader));
													HeadertableNote.addCell(new Phrase(""+testNote, tabletext));
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
		
								Headertable3.addCell(new Phrase("", tabletext));
								Headertable3.addCell(new Phrase("", tabletext));
								Headertable3.addCell(new Phrase("", tabletext));
								
								}
								//System.out.println(collecteddate+postdate);
								
								if(testHeadFlag.equalsIgnoreCase("G")){
									document.add(HeadertableGeneral);
									HeadertableGeneral.flushContent();
								}else{
									document.add(Headertable);
									Headertable.flushContent();
								}
								document.add(HeadertableNote);
								HeadertableNote.flushContent();
								document.add(Headertable3);
								Headertable3.flushContent();
		
							
								}
			}

						//
						if(!list.get(pro).getTestli().get(list.get(pro).getTestli().size()-1).getTestMethodChk().equalsIgnoreCase("Y")){
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
							
							
				    	}
				    	
				    	if(!list.get(pro).getTestli().get(list.get(pro).getTestli().size()-1).getTestMethodChk().equalsIgnoreCase("Y") && testHeadFlag.equalsIgnoreCase("G")){
				    		HeadertableGeneral.addCell(new Phrase("", tabletext));
				    		HeadertableGeneral.addCell(new Phrase("", tabletext));
				    		
				    		HeadertableGeneral.addCell(new Phrase("", tabletext));
				    		HeadertableGeneral.addCell(new Phrase("", tabletext));
							
							
				    	}
						
						/* PdfPTable HeaderTableEquip = new PdfPTable(4);
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
						 
						 	
				  	    
						 
						
						if(testHeadFlag.equalsIgnoreCase("G")){
							document.add(HeadertableGeneral);
							HeadertableGeneral.flushContent();
						}else{
							document.add(Headertable);
							Headertable.flushContent();
						}
						document.add(Headertable3);
						Headertable3.flushContent();
						
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
            
		 	if (list.get(pro).getInterpretationCheck().equals("Y")) {
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
			if (list.get(pro).getCommentCheck().equals("Y")) {
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
  	    

						PdfPTable Headertable11 = new PdfPTable(1);
						int[] HeaderWidth11 = { 100 };
						Headertable11.setWidths(HeaderWidth11);
						Headertable11.setWidthPercentage(95f);
						Headertable11.getDefaultCell().setBorder(Rectangle.NO_BORDER);			
						 
						if (list.get(pro).getInterpretation().equalsIgnoreCase("-")) {	            	
					 		//Headertable11.addCell(new Phrase(" ", tableheader13));	
						
						} else {
							
							//Headertable11.addCell(new Phrase("Interpretation -"+list.get(pro).getInterpretation(), tabletext));	
							Phrase p = new Phrase("Interpretation - ", tableheader15);
							p.add(new Chunk("\n"+list.get(pro).getInterpretation(), tabletext));
							PdfPCell celll = new PdfPCell(p);
							celll.setHorizontalAlignment(Element.ALIGN_LEFT);
							celll.setBorder(Rectangle.NO_BORDER);
							Headertable11.addCell(celll);
						}
						
						Headertable11.addCell(new Phrase("", tabletext));
						Headertable11.addCell(new Phrase("", tabletext));
						
						if (list.get(pro).getProfileMasterComment().equalsIgnoreCase("-") || list.get(pro).getProfileMasterComment().equalsIgnoreCase(" ") ) {
						 	// Headertable11.addCell(new Phrase(" ", tabletext));
						
						 }else
						 {
					 		Phrase p = new Phrase("Comments - ", tableheader15);
							p.add(new Chunk("\n"+list.get(pro).getProfileMasterComment(), tabletext));
							PdfPCell celll = new PdfPCell(p);
							celll.setHorizontalAlignment(Element.ALIGN_LEFT);
							celll.setBorder(Rectangle.NO_BORDER);
							Headertable11.addCell(celll);
						 }
						
						//document.add(Headertable11);
						//Headertable11.flushContent();

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
						  
						
							
							HeaderTableSpace.addCell(new Phrase("", tabletext));
							HeaderTableSpace.addCell(new Phrase("", tabletext));
							
				  		//	document.add(HeaderTableSpace);
				  		//HeaderTableSpace.flushContent();	
				  			
				  			 HeaderTable5.addCell(new Phrase("", tabletext));
								document.add(HeaderTable5);
								HeaderTable5.flushContent();

							
			}
			
		}
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
			
			//	document.add(HeaderTableTechN1);
			 // 	HeaderTableTechN1.flushContent();
			
			
			// start footer page
				

		PageEventHandlerBean eventObj = new PageEventHandlerBean();
		//HttpServletRequest request = eventObj.getRequest();
		
		String covide = (String) request.getAttribute("covide");
		//Integer postId = (Integer) request.getAttribute("postId");
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		//String hospitalName = (String) resourceBundleEhat.getString("hospitalName");
		if (covide.equalsIgnoreCase("Yes")) {

		} else {

		
			System.err.println("postId..." + postId);
			if (postId == null) {
				postId = 1;
			}
		//	Users userDetails = patModel.getUserDetailsById(postId);
			UsersService uss11 = (ApplicationContextUtils.getApplicationContext()).getBean(UsersService.class);
			
			Users userDetails=uss11.getUsersByUserIdForLISPrint(postId);

			String signOneDocName = "";
			String signOneImageName = "";
			String signTwoDocName = "";
			String signTwoImageName = "";
			String signThreeDocName = "";
			String signThreeImageName = "";
			
			if(userDetails.getUsersList().size() > 0) {
				signOneDocName = userDetails.getUsersList().get(0). getSign_one_doctor();
				signOneImageName = userDetails.getUsersList().get(0).getSign_one();
				signTwoDocName = userDetails.getUsersList().get(0).getSign_one_doctor();
				signTwoImageName = userDetails.getUsersList().get(0).getSign_one();
				signThreeDocName = userDetails.getUsersList().get(0).getSign_two_doctor();
				signThreeImageName = userDetails.getUsersList().get(0).getSign_two();
			}
			


			Font tabletextSign = new Font(Font.HELVETICA, 8, Font.BOLD);
			PdfPTable table = new PdfPTable(3);

			try {
				String path1 = "";
				//String path2 = "";
				String path3 = "";

				Image imageOneSign = null;
				PdfPCell cellOneSign = null;

				Image imageTwoSign = null;
				PdfPCell cellTwoSign = null;

				Image imageThreeSign = null;
				PdfPCell cellThreeSign = null;

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
						//Headertable2.addCell(cellTwoSign);
						Headertable2.addCell(new Phrase(" ", tableheader));
						Headertable2.addCell(new Phrase(" ", tabletextSign));
						Headertable2.addCell(cellThreeSign);

						PdfPCell cells30 = new PdfPCell(
								new Phrase(signOneDocName.replaceAll("@", "\n"), tabletextSign));
						cells30.setHorizontalAlignment(Element.ALIGN_CENTER);
						cells30.setBorder(Rectangle.NO_BORDER);
						Headertable2.addCell(cells30);

						Headertable2.addCell(new Phrase(" ", tabletextSign));

						PdfPCell cells31 = new PdfPCell(
								new Phrase("".replaceAll("@", "\n"), tabletextSign));
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
                 /*
					table.setWidths(new int[] { 80, 18, 2 });
					table.setTotalWidth(527);
					table.setLockedWidth(true);
					table.getDefaultCell().setFixedHeight(20);
					//table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					table.getDefaultCell().setBorder(Rectangle.TOP);

					table.addCell(new Phrase(strHeader, tabletext));

					table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
					table.addCell(new Phrase(String.format("\nPage %d of ", pdfWriter.getPageNumber()), tabletext));

					PdfPCell cell = new PdfPCell(Image.getInstance(total));
					cell.setBorder(Rectangle.NO_BORDER);
					cell.setBorderColor(Color.BLACK);
					table.addCell(cell);

					table.setTotalWidth(document.right(document.rightMargin()) - document.left(document.leftMargin()));
					table.writeSelectedRows(0, -1, document.left(document.leftMargin()), 29,
							pdfWriter.getDirectContent());
					Headertable2.setTotalWidth(
							document.right(document.rightMargin()) - document.left(document.leftMargin()));
					Headertable2.writeSelectedRows(0, -1, document.left(document.leftMargin()), 168,
							pdfWriter.getDirectContent());
					*/
					
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
					 PdfTemplate total= pdfWriter.getDirectContent().createTemplate(35, 28);
					PdfPCell cell2 = new PdfPCell(Image.getInstance(total));
					cell2.setBorder(Rectangle.TOP);
					cell2.setBorderColor(Color.BLACK);
					table.addCell(cell2);

					// PdfContentByte canvas = pdfWriter.getDirectContent();
					// canvas.beginMarkedContentSequence(PdfName.BASEFONT);

					//table.writeSelectedRows(0, -1, document.left(document.leftMargin()), 20,
						//	pdfWriter.getDirectContent());
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
					 PdfTemplate total= pdfWriter.getDirectContent().createTemplate(35, 28);
					PdfPCell cell2 = new PdfPCell(Image.getInstance(total));
					cell2.setBorder(Rectangle.TOP);
					cell2.setBorderColor(Color.BLACK);
					table.addCell(cell2);

					// PdfContentByte canvas = pdfWriter.getDirectContent();
					// canvas.beginMarkedContentSequence(PdfName.BASEFONT);

					//table.writeSelectedRows(0, -1, document.left(document.leftMargin()), 20,
						//	pdfWriter.getDirectContent());
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
			//Headertable2.flushContent();
			
			//signutre End
			
			
		 
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