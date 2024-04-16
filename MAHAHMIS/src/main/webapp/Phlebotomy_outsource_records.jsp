<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.pathology.controller.PathologySearchController"%>
<%@page import="com.hms.pathology.controller.PhlebotomyController"%>
<%@page import="java.util.Date"%>
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
<%-- <%@page import="com.hms.ehat.service.DiagnosticsService"%> --%>
<%@page import="com.hms.dto.Assessment"%>
<%@page import="com.hms.model.AdminModel"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.admin.util.FetchHospitalDetails"%>
<%-- <%@page import="com.hms.dto.HospitalDetails"%> --%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
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
<title>Outsource Records</title>
</head>
<body>
	<%
		try {
		/* -------------------------------------- Declaration ---------------------------------------------   */
		response.setContentType("application/pdf");
		/* List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails.getHospDetails("0",request);
		FetchHospitalDetails.getHospDetails(corporateId)
		HospitalDetails hospObj = arrHospitalDetails.get(0); */
		HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
		List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
		HospitalDetails hospObj = arrHospitalDetails.get(0);

		ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String lntUnit = (String) resource.getObject("lntUnit").toString();

		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		
		Document document = new Document(PageSize.A4);
		document.setMargins(20, 20, 20, 20);
		
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
		
		String callFrom = request.getParameter("callFrom");
			
		PdfPTable hospitalHeader = new PdfPTable(3);
		int[] hospitalHeaderWidth = { 30, 70, 35 };
		hospitalHeader.setWidths(hospitalHeaderWidth);
		hospitalHeader.setWidthPercentage(95f);
		hospitalHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
		hospitalHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		/* -------------------------------------- End Declaration -------------------------------------------   */

		/* --------------------------------------All Services -------------------------------------------   */
		PathologySearchController pathologySearchController = (ApplicationContextUtils.getApplicationContext()).getBean(PathologySearchController.class);
		
		List<PathologySampleWiseMaster> list = pathologySearchController.getOutsourceRecords(callFrom, request);
		System.out.println("callFrom : "+callFrom);
		System.out.println("list : "+list);
		/* --------------------------------------End All Services -------------------------------------------   */
			     
		PdfWriter pdfWriter = PdfWriter.getInstance(document, outStream);

			
		// adding footer information//
		Font smallNew = new Font(Font.HELVETICA, 10, Font.BOLD);
		smallNew.setSize(8);
		String hospitaladdress1 = "Mumbai R.O.:20,Topaz Tower CHS,Near Nair Hospital Casuality Gate,Opp,Yusuf Manzil,Dr.A.Nair Road,Agripada,Mumbai Central,Mumbai-400 011."+ "\n" + "PHONE : 022-2302 3003, Mob: 98921 45371" + "\n"+ "MUMBAI * DELHI * CHANDIGARH * HALDIA" + "\n" + "Page Of ";
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
		String path2 = application.getRealPath(path);
		
		String nabh = hospObj.getNabhImagePath();
		String nabhLogo = application.getRealPath(nabh);
		String pathToWeb1 = FilePath.getBasePath();
		String path1 = "";
		if (lntUnit.equalsIgnoreCase("1")) {	
		   path1 = pathToWeb1 + "U1_L&T_community_HMI_screen_ahmednagar.jpg";
		} else if (lntUnit.equalsIgnoreCase("2")) {
		   path1 = pathToWeb1 + "U2_L&T_community_HMI_screen_andheri.jpg";
		} else if (lntUnit.equalsIgnoreCase("3")) {
		   path1 = pathToWeb1 + "U3_L&T_community_HMI_screen_chennai.jpg";
		} else if (lntUnit.equalsIgnoreCase("4")) {
		   path1 = pathToWeb1 + "U4_L&T_community_HMI_screen_coimbatore.jpg";
		} else if (lntUnit.equalsIgnoreCase("5")) {
		   path1 = pathToWeb1 + "U5_L&T_community_HMI_screen_lonavala.jpg";
		} else if (lntUnit.equalsIgnoreCase("6")) {
		   path1 = pathToWeb1 + "U6_L&T_community_HMI_screen_surat.jpg";
		} else if (lntUnit.equalsIgnoreCase("7")) {
		   path1 = pathToWeb1 + "U7_L&T_community_HMI_screen_Thane.jpg";
		} else if (lntUnit.equalsIgnoreCase("8")) {
		   path1 = pathToWeb1 + "U8_L&T_community_HMI_screen_vadodara.jpg";
		}

		img = Image.getInstance(path2);

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
		
		Phrase p = new Phrase();
		p.add(new Chunk("" + hospitalName, header));
		p.add(new Chunk("\n\n" + "\t\t" + address, tabletext));
		p.add(new Chunk("" + city + " Pin- " + hospitalZip + "\n", tabletext));
		p.add(new Chunk("Phone No. " + hPhoneNo, tabletext));
		p.add(new Chunk("\n" + webste + "\n" + "email: " + email, tabletext));
		
		PdfPCell hospitalNameCell = new PdfPCell(p);
		hospitalNameCell.setHorizontalAlignment(Element.ALIGN_LEFT);
		hospitalNameCell.setBorder(Rectangle.NO_BORDER);
		
		if (img == null) {
			hospitalHeader.addCell(new Phrase("", header));
		} else {
			hospitalHeader.addCell(cell);
		}
		hospitalHeader.addCell("");
		hospitalHeader.addCell(hospitalNameCell);
	
		
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		
		document.add(hospitalHeader);
		hospitalHeader.flushContent();

		java.util.Calendar currentDate = Calendar.getInstance();
		SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss a");
		String curr_date = dateformatter.format(currentDate.getTime());
		NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");
		
		if(callFrom.equals("outsource")){
			PdfPTable Headertable = new PdfPTable(13);
			int[] HeaderWidth = { 10,15,10,15,15,15,10,20,30,15,15,15,10};
			Headertable.setWidths(HeaderWidth);
			Headertable.setWidthPercentage(100f);
			
			Headertable.addCell(new Phrase("#", subheader));
			Headertable.addCell(new Phrase("Reg Date", subheader));
			Headertable.addCell(new Phrase("Patient Id", subheader));
			Headertable.addCell(new Phrase("Patient Name", subheader));
			Headertable.addCell(new Phrase("Center Name", subheader));
			Headertable.addCell(new Phrase("Refer Doctor", subheader));
			Headertable.addCell(new Phrase("Barcode", subheader));

			Headertable.addCell(new Phrase("Collection Date Time", subheader));
			Headertable.addCell(new Phrase("Profile/Testname", subheader));
			Headertable.addCell(new Phrase("Sample Status", subheader));
			Headertable.addCell(new Phrase("Sample Type", subheader));
			Headertable.addCell(new Phrase("Sample Container", subheader));
			Headertable.addCell(new Phrase("Sample Quantity", subheader));
			
			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));

			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));
			
			for (int pro = 0; pro < list.size(); pro++) {
				
				String testStatus="";
			    
			    if(list.get(pro).getTeststatus() == 1){
			    	testStatus="Collection Pending";
				} if(list.get(pro).getTeststatus() == 2){
					testStatus="Accessing Pending";
				} if(list.get(pro).getTeststatus() == 3){
					testStatus="Accepted Done";
				} if(list.get(pro).getTeststatus() == 4){
					testStatus="Sample Rejected";
				}if(list.get(pro).getTeststatus() == 5){
					testStatus="Sample In Authorization";
				}if(list.get(pro).getTeststatus() == 6){
					testStatus="Sample Reported";
				}
				
				String regDate = list.get(pro).getDatetime();
				Integer patientId = list.get(pro).getPatientId();
				String patientName =list.get(pro).getPatientname();
				String centerName = list.get(pro).getCenterName();
				String referDoctor = list.get(pro).getDocname();
				String barcode = list.get(pro).getBarCode();
				
				Date collectionDateTime = list.get(pro).getCollecteddatetime();
				String profiletestname = list.get(pro).getProfileName();
				//SampleStatus
				String sampleType = list.get(pro).getSamplename();
				String sampleContainer =list.get(pro).getContainername();
				String sampleQty = "-";
							
				Headertable.addCell(new Phrase("" +(+pro+1) , tabletext));	    		
				Headertable.addCell(new Phrase("" + regDate, tabletext));   	
				Headertable.addCell(new Phrase("" + patientId, tabletext));
				Headertable.addCell(new Phrase("" + patientName, tabletext));	
				Headertable.addCell(new Phrase("" + centerName, tabletext));			
				Headertable.addCell(new Phrase("" + referDoctor, tabletext));
				Headertable.addCell(new Phrase("" + barcode, tabletext));
				
				Headertable.addCell(new Phrase("" + collectionDateTime, tabletext));
				Headertable.addCell(new Phrase("" + profiletestname, tabletext));
				Headertable.addCell(new Phrase("" + testStatus, tabletext));
				Headertable.addCell(new Phrase("" + sampleType, tabletext));
				Headertable.addCell(new Phrase("" + sampleContainer, tabletext));
				Headertable.addCell(new Phrase("" + sampleQty, tabletext));
				document.add(Headertable);
				Headertable.flushContent();
			}			
		}else if(callFrom.equals("forcedOutSource")){
			PdfPTable Headertable = new PdfPTable(11);
			int[] HeaderWidth = { 5,15,10,20,10,25,30,15,15,15,15};
			Headertable.setWidths(HeaderWidth);
			Headertable.setWidthPercentage(100f);
			
			Headertable.addCell(new Phrase("#", subheader));
			Headertable.addCell(new Phrase("Reg. Date", subheader));
			Headertable.addCell(new Phrase("Patient Id", subheader));
			Headertable.addCell(new Phrase("Patient Name", subheader));
			Headertable.addCell(new Phrase("Barcode", subheader));
			Headertable.addCell(new Phrase("Collection Date Time", subheader));
			
			Headertable.addCell(new Phrase("Profile/Testname", subheader));
			Headertable.addCell(new Phrase("Sample Type", subheader));
			Headertable.addCell(new Phrase("Sample Container", subheader));
			//Headertable.addCell(new Phrase("Sample Quantity", subheader));
			Headertable.addCell(new Phrase("Outsource Type", subheader));
			Headertable.addCell(new Phrase("Outsource Lab", subheader));
			
			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));

			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));
			//Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));
			Headertable.addCell(new Phrase("", subheader));
			
			for (int pro = 0; pro < list.size(); pro++) {
				String regDate = list.get(pro).getDatetime();
				Integer patientId = list.get(pro).getPatientId();
				String patientName =list.get(pro).getPatientname();
				String barcode = list.get(pro).getBarCode();
				Date collectionDateTime = list.get(pro).getCollecteddatetime();

				String profiletestname = list.get(pro).getProfileName();
				String sampleType = list.get(pro).getSamplename();
				String sampleContainer =list.get(pro).getContainername();
				String sampleQty = "-";
				
				String outsourceType = "-";
				if(list.get(pro).getInOutHouse() == 2){
					outsourceType = "Forced Outsource";
				}else if(list.get(pro).getInOutHouse() == 3){
					outsourceType = "Outsource";
				}
				String labName = list.get(pro).getOutlabName();
				
				Headertable.addCell(new Phrase("" +(+pro+1) , tabletext));	    		
				Headertable.addCell(new Phrase("" + regDate, tabletext));
				Headertable.addCell(new Phrase("" + patientId, tabletext));   	
				Headertable.addCell(new Phrase("" + patientName, tabletext));
				Headertable.addCell(new Phrase("" + barcode, tabletext));			
				Headertable.addCell(new Phrase("" + collectionDateTime, tabletext));
				
				Headertable.addCell(new Phrase("" + profiletestname, tabletext));
				Headertable.addCell(new Phrase("" + sampleType, tabletext));
				Headertable.addCell(new Phrase("" + sampleContainer, tabletext));
				//Headertable.addCell(new Phrase("" + sampleQty, tabletext));
				Headertable.addCell(new Phrase("" + outsourceType, tabletext));
				Headertable.addCell(new Phrase("" + labName, tabletext));
				document.add(Headertable);
				Headertable.flushContent();
			}
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