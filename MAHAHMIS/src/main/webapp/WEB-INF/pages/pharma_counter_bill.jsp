<%@page import="org.json.JSONObject"%>
<%@page import="org.json.JSONArray"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="javax.sound.midi.SysexMessage"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.pharmacy.pojo.CounterSaleMaster"%>
<%@ page import="java.util.Date"%>
<%-- <%@ page import="com.hms.dto.BillComponentSample"%>
<%@ page import="com.hms.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetailsForPharmacy"%> --%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.pharmacy.controller.CounterSaleController"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%-- <%@page import="com.hms.dto.Prescription"%> --%>
<%@page import="com.hms.utility.EnglishNumberToWords"%>
<%-- <%@page import="org.omg.CORBA._PolicyStub"%> --%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.List"%>
<%-- <%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.model.BillModel"%> --%>
<%@ page import="com.hms.pharmacy.dao.EhatEnterpriseUtil"%>
<%@ page import="com.hms.utility.ApplicationContextUtils"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@ page import="com.hms.ehat.dto.CurrencyTypeDto"%>
<%@page import="com.hms.administrator.dto.HospitalDetailsDTO"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, 
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%-- <title><c:out value="${title}"/></title> --%>
<tiles:getAsString name="title"/>
</head>
<body>




	
	<%DecimalFormat df2 = new DecimalFormat("0.00");
	Double totGst=0.0;
			//For on off flow 
/* 			ResourceBundle resourceBundleEhat = ResourceBundle
				.getBundle("Ehat");
		String print = (String) resourceBundleEhat
				.getString("pharmacyPrint");
		String MedicalName =  resourceBundleEhat.getString("hospitalName");
		String MedicalAddress = resourceBundleEhat.getString("address");
		String MedicalDrugLicenseNo = (String) resourceBundleEhat
				.getString("drugLicenseNo");
		String MedicalDrugLicenseNo1 = (String) resourceBundleEhat
				.getString("drugLicenseNo1");
		String MedicalPhoneNo = resourceBundleEhat.getString("PhoneNo");
		String MedicalEmail = resourceBundleEhat.getString("email");
		String GSTIN = resourceBundleEhat.getString("GSTIN");
		
		
		ResourceBundle resourceBundlepharmacy = ResourceBundle
				.getBundle("pharmacy");
		String drugLicenseNo = (String) resourceBundlepharmacy
				.getString("drugLicenseNo");
				
				String foodlicenseNo = (String) resourceBundlepharmacy
						.getString("foodlicenseNo");
		
		String drugLicenseNo1 = (String) resourceBundlepharmacy
				.getString("drugLicenseNo1");
		
		String GStNo1 = (String) resourceBundlepharmacy
				.getString("GStNo");

		String patientTransType = "";
		if (pageContext.getAttribute("patientTransType") == null) {
			patientTransType = "";
		} else {

			patientTransType = patientTransType
					+ (String) pageContext.getAttribute("patientTransType")
							.toString();
		}
 */
		try {
			response.setContentType("application/pdf");
			CurrencyTypeService fetchOneCurrency=(ApplicationContextUtils.getApplicationContext()).getBean(CurrencyTypeService.class);
			List<CurrencyTypeDto> listServiceCurrencyDto=fetchOneCurrency.getOneCurrencyList();
			String currencyCode=listServiceCurrencyDto.get(0).getCurrencyCode();
			String currencyName=listServiceCurrencyDto.get(0).getCurrencyName();
			
			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			int hospitalUnitId = (Integer) session.getAttribute("uId");
			//List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);
			
			// start
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
				String print =  (String) resourceBundleEhat.getString("pharmacyPrint");
				String MedicalName =  hospObj.getMedicalName();//resourceBundleEhat.getString("hospitalName");
				String MedicalAddress = hospObj.getMedicalAddress();//resourceBundleEhat.getString("address");
				String MedicalZipcode = hospObj.getMedicalZipCode();
				String MedicalDrugLicenseNo = hospObj.getDruglicense(); //(String) resourceBundleEhat.getString("drugLicenseNo");
				String MedicalDrugLicenseNo1 = hospObj.getDrugLicense1(); //(String) resourceBundleEhat.getString("drugLicenseNo1");
				String MedicalPhoneNo =  hospObj.getMedicalContact();//resourceBundleEhat.getString("PhoneNo");
				String MedicalEmail =hospObj.getMedicalEmail(); // resourceBundleEhat.getString("email");
				String GSTIN = hospObj.getMedicalGstNo();//resourceBundleEhat.getString("GSTIN");
				
				
				ResourceBundle resourceBundlepharmacy = ResourceBundle
				.getBundle("pharmacy");
				String drugLicenseNo = hospObj.getDruglicense(); //(String) resourceBundlepharmacy.getString("drugLicenseNo");
				
				String drugLicenseNo1 =hospObj.getDrugLicense1();  //(String) resourceBundlepharmacy.getString("drugLicenseNo1");
				
				String GStNo1 = hospObj.getMedicalGstNo(); // (String) resourceBundlepharmacy.getString("GStNo");
				String patientTransType = "";
				if (pageContext.getAttribute("patientTransType") == null) {
			patientTransType = "";
				} else {

			patientTransType = patientTransType
					+ (String) pageContext.getAttribute("patientTransType")
							.toString();
				}
				// End
			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			Document document;
			
			
			response.setHeader("Content-Disposition", "inline; filename = Counter Sale");

			//On off flow for counter sale print 
			if (print.contains("off")) {

				document = new Document(PageSize.A5);
			} else {
				document = new Document(PageSize.A4);

			}
			document.setMargins(10, 10, 7, 0);

			PdfWriter.getInstance(document, outStream);
			session = request.getSession();
			String user_name = (String) session.getAttribute("userName");

			DecimalFormat df22 = new DecimalFormat("0.00");

			/* -------------------- Define Fonts ---------------------------  */
			Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font subheader = new Font(Font.FontFamily.HELVETICA, 8,
					Font.BOLD);
			Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
			header.setColor(10, 4, 2);

			Font tableheader = new Font(Font.FontFamily.HELVETICA, 10,
					Font.BOLD);
			Font tabletext = new Font(Font.FontFamily.HELVETICA, 8,
					Font.NORMAL);
			
			Font tabletext1 = new Font(Font.FontFamily.HELVETICA, 8,
					Font.BOLD);
			
			Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
			/* -------------------- Define Fonts ---------------------------  */

			document.open();

			String path = hospObj.getFilePath();
			String address = "";
			String city = "";
			String country = "";
			String contact = "";
			String hospitalName = (String) resourceBundleEhat
					.getString("hospitalName");

			String path1 = application.getRealPath(path);

			//Added By Bilal For Full Address of Hospital
			 String hospitalZip = hospObj.getHospitalZip();
			String PhoneNo = hospObj.getHospitalContact();
			String secPhoneNo = hospObj.getSecPNo();
			String webste = hospObj.getWebsite();
			String email = hospObj.getHospitalEmail();
			String cinNo = hospObj.getTxtCinNo();
			String serviceTaxNo = hospObj.getTxtSerTaxNo();
			String panNo = hospObj.getPanNo();
			String hPhoneNo = PhoneNo + "/" + secPhoneNo;
			String GStNo = hospObj.getTxtGstNo(); 
			String nabh = "";
			String nabhLogo = "";

			int tmpFlag = 0;

			if (hospitalName.equals("")) {
				hospitalName = hospObj.getHospitalName();
				address = hospObj.getHospitalAddress();
				city = hospObj.getHospitalCity();
				country = hospObj.getHospitalCountry();
				contact = hospObj.getHospitalContact(); 
			} else {
				address = "SHOP.NO.1 , UPR GR FLR ,PLOT.NO.136 TO 138 ZONE NO 8,GUT NO 71,ALPINE SUPERSPECIALITY HOSPITAL JAYNAGRI, BEED BY PASS, AURANGABAD-431001";
				tmpFlag = 1;
			//	GStNo=GStNo1;
			}
			
			hospitalName = hospitalName.toUpperCase();

			try {
				nabh = hospObj.getNabhImagePath();
				nabhLogo = application.getRealPath(nabh);
			} catch (Exception e) {
				e.printStackTrace();
			}

			/* document.newPage(); */

			// Table 1 : For hospital adress details start
			//Added By BILAL For Hospital information for off flow 
			if (print.contains("off")) {
				PdfPTable HeaderTable1 = new PdfPTable(3);
				int[] headerwidth1 = { 20, 80, 0 };
				HeaderTable1.setWidths(headerwidth1);
				HeaderTable1.setWidthPercentage(95f);
				HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
				HeaderTable1.getDefaultCell()
						.setBorder(Rectangle.NO_BORDER);

				Image img = null;
				PdfPCell cell = null;
				try {

					//img = Image.getInstance(path1);
					img.scaleAbsolute(50, 45);
					cell = new PdfPCell();
					cell.addElement(new Chunk(img, 5, -5));
					cell.setBorder(Rectangle.NO_BORDER);
				} catch (Exception e) {
					e.printStackTrace();
				}

				if (img == null) {

					HeaderTable1.addCell(new Phrase("", header));
				} else {

					//HeaderTable1.addCell(cell);
					HeaderTable1.addCell(new Phrase("", header));
				}

				Font regular = new Font(FontFamily.TIMES_ROMAN, 10,
						Font.NORMAL);
				Font bold = new Font(FontFamily.TIMES_ROMAN, 12, Font.BOLD);
				Phrase p = new Phrase();
				p.add(new Chunk(" " + hospitalName, bold));

				if (tmpFlag == 0) {
					 p.add(new Chunk(" \n\n" + address + "," + city
							+ " Pin- " + hospitalZip, tabletext));
					p.add(new Chunk(" \nPhone No. " + hPhoneNo, tabletext)); 
					//	p.add(new Chunk(" \nGST NO: " + GStNo, tabletext));
				} else {
					p.add(new Chunk(" \n\n" + address, tabletext));
					p.add(new Chunk("", tabletext));
				}
				PdfPCell hospitalNameCell = new PdfPCell(p);
				hospitalNameCell
						.setHorizontalAlignment(Element.ALIGN_CENTER);
				hospitalNameCell.setBorder(Rectangle.NO_BORDER);
				HeaderTable1.addCell(hospitalNameCell);

				HeaderTable1.addCell(new Phrase("", header));
				document.add(HeaderTable1);
				HeaderTable1.flushContent();

				HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				document.add(HeaderTable1);
				HeaderTable1.flushContent();

			} else {
				PdfPTable HeaderTable1 = new PdfPTable(3);
				int[] headerwidth1 = { 30, 70, 30 };
				HeaderTable1.setWidths(headerwidth1);
				HeaderTable1.setWidthPercentage(95f);
				HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
				HeaderTable1.getDefaultCell()
						.setBorder(Rectangle.NO_BORDER);
				Image img = null;
				PdfPCell cell = null;
				try {

					//img = Image.getInstance(path1);
					img.scaleAbsolute(80, 60);
					cell = new PdfPCell();
					cell.addElement(new Chunk(img, 5, -5));
					cell.setBorder(Rectangle.NO_BORDER);
				} catch (Exception e) {
					e.printStackTrace();
				}

				Image imgNabh = null;
				PdfPCell cellNabh = null;
				try {
					//imgNabh = Image.getInstance(nabhLogo);
					imgNabh.scaleAbsolute(80, 60);
					cellNabh = new PdfPCell();
					cellNabh.addElement(new Chunk(imgNabh, 5, -5));
					cellNabh.setBorder(Rectangle.NO_BORDER);
				} catch (Exception e) {
					e.printStackTrace();
				}

				if (img == null || tmpFlag == 1) {

					HeaderTable1.addCell(new Phrase("GSTIN- "+GSTIN, subheader));
				} else {

					HeaderTable1.addCell(cell);
				}
				Font regular = new Font(FontFamily.TIMES_ROMAN, 10,
						Font.NORMAL);
				Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD);
				Phrase p = new Phrase();
				p.add(new Chunk(" " + MedicalName, bold));
				p.add(new Chunk(" \n\n" + MedicalAddress, tabletext));

				if (tmpFlag == 0) {
					 /* p.add(new Chunk(" \n" + city + " Pin- " + hospitalZip,
							tabletext)); */
					p.add(new Chunk(" \nPhone No. " + MedicalPhoneNo, tabletext));
					p.add(new Chunk(" \n "  + " email: " + MedicalAddress,
							tabletext));
					/* p.add(new Chunk(" \nCIN: " + cinNo, tabletext));
					p.add(new Chunk(" \nService Tax: " + serviceTaxNo
							+ ", PAN No: " + panNo, tabletext));  */
				}

				PdfPCell hospitalNameCell = new PdfPCell(p);
				hospitalNameCell
						.setHorizontalAlignment(Element.ALIGN_CENTER);
				hospitalNameCell.setBorder(Rectangle.NO_BORDER);
				HeaderTable1.addCell(hospitalNameCell);

				 if (imgNabh == null || tmpFlag == 1) {

					HeaderTable1.addCell(new Phrase("DL. "+MedicalDrugLicenseNo+"\nDL. "+MedicalDrugLicenseNo1, subheader));
				} else {

					HeaderTable1.addCell(cellNabh);
				} 

				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				document.add(HeaderTable1);
				HeaderTable1.flushContent();

				HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				document.add(HeaderTable1);
				HeaderTable1.flushContent();
			}
				

				PdfPTable HeaderTable2 = new PdfPTable(5);
				int[] headerwidth2 = { 15, 25, 40, 10, 10 };
				HeaderTable2.setWidths(headerwidth2);
				HeaderTable2.setWidthPercentage(95f);
				HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				// Table 1 : For hospital adress details end
		%>

	<c:forEach items="${counterData}" var="row" varStatus="count">

		<%
		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName1= bundle.getObject("hospitalname").toString();
		%>
		<c:set var="billNumber" value="${row.counterSaleId }" />

		<c:set var="saleDate" value="${row.counterSaleTransType }" />

		<c:set var="txtTime" value="${row.counterSaleForTime }" />

		<c:set var="patientName" value="${row.counterSalePatientName }" />
		<c:set var="patientMobile" value="${row.counterSaleMobile }" />
		<c:set var="patientAddress" value="${row.counterSaleAddress }" />

		<c:set var="doctor" value="${row.counterSaleDoctor }" />
		
			<c:set var="transationType" value="${row.counterSaleEnteredBy}" />
			
			<c:set var="bankName" value="${row.counterTaxBankName}" />
			
			<c:set var="chequeNo" value="${row.counterTaxChequeNo}" />
			
			<c:set var="unitNo" value="${row.unitCount}" />
		
		
		
		<%
									String unitNo = "";
											if (pageContext.getAttribute("unitNo") == null) {
												unitNo = "";
											} else {
												unitNo = unitNo
														+ (String) pageContext.getAttribute(
																"unitNo").toString();
											}
											System.out.println("unitNo");
											
											
											String billNumber = "";
											if (pageContext.getAttribute("billNumber") == null) {
												billNumber = "";
											} else {
												billNumber = billNumber
														+ (String) pageContext.getAttribute(
																"billNumber").toString();
											}
											System.out.println("billNumber");
											
											String patientAddress = "";
											if (pageContext.getAttribute("patientAddress") == null) {
												patientAddress = "";
											} else {
												patientAddress = patientAddress
														+ (String) pageContext.getAttribute(
																"patientAddress").toString();
											}
											
											String bankName = "";
											if (pageContext.getAttribute("bankName") == null) {
												bankName = "";
											} else {
												bankName = bankName
														+ (String) pageContext.getAttribute(
																"bankName").toString();
											}
											
											String chequeNo = "";
											if (pageContext.getAttribute("chequeNo") == null) {
												chequeNo = "";
											} else {
												chequeNo = chequeNo
														+ (String) pageContext.getAttribute(
																"chequeNo").toString();
											}
										

									

											String patientName = "";
											if (pageContext.getAttribute("patientName") == null) {
												patientName = "";
											} else {
												patientName = patientName
														+ (String) pageContext.getAttribute(
																"patientName").toString();
											}
											
											String saleDate = "";
											if (pageContext.getAttribute("saleDate") == null) {
												saleDate = "";
											} else {
												saleDate = saleDate
														+ (String) pageContext.getAttribute("saleDate")
																.toString();
											}


											String txtTime = "";
											if (pageContext.getAttribute("txtTime") == null) {
												txtTime = "";
											} else {
												txtTime = txtTime
														+ (String) pageContext.getAttribute("txtTime")
																.toString();
											}

											String patientMobile = "";
											if (pageContext.getAttribute("patientMobile") == null) {
												patientMobile = "";
											} else {
												patientMobile = patientMobile
														+ (String) pageContext.getAttribute(
																"patientMobile").toString();
											}

											String doctor = "";
											if (pageContext.getAttribute("doctor") == null) {
												doctor = "";
											} else {
												doctor = doctor
														+ (String) pageContext.getAttribute("doctor")
																.toString();
											}
											
											String transationType = "";
											if (pageContext.getAttribute("transationType") == null) {
												transationType = "";
											} else {
												transationType = transationType
														+ (String) pageContext.getAttribute(
																"transationType").toString();
											}

											PdfPTable HeaderTable3 = new PdfPTable(6);
											int[] headerwidth3 = { 18, 30, 20, 20, 20, 20 };
											HeaderTable3.setWidths(headerwidth3);
											HeaderTable3.setWidthPercentage(95f);
											HeaderTable3.getDefaultCell()
													.setBorder(Rectangle.NO_BORDER);

											
											document.add(HeaderTable2);
											HeaderTable2.flushContent();
										//	HeaderTable2.addCell(new Phrase("", subheader));
										//	HeaderTable2.addCell(new Phrase("", subheader));
										HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
											HeaderTable2
													.addCell(new Phrase(" ", subheader));
											PdfPCell subcell = new PdfPCell(new Phrase("",
													subheader));
											subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
											subcell.setBorder(Rectangle.BOTTOM);
											HeaderTable2.addCell(subcell);
											//HeaderTable2.addCell(new Phrase(",subheader));
											if (print.contains("off")) {
												if(transationType.equals("Credit")){
													HeaderTable2.addCell(new Phrase("IPD RECEIPT", subheader));
												}else{
													HeaderTable2.addCell(new Phrase("RECEIPT", subheader));
												}
												
											    
											}else{
												HeaderTable2.addCell(new Phrase("COUNTER SALE ", subheader));
											}
											HeaderTable2.addCell(new Phrase("", subheader));
											HeaderTable2.addCell(new Phrase("", subheader));
											document.add(HeaderTable2);
											HeaderTable2.flushContent();

											PdfPTable HeaderTable4 = new PdfPTable(4);
											int[] headerwidth4 = { 20, 35, 15, 15 };
											HeaderTable4.setWidths(headerwidth4);
											HeaderTable4.setWidthPercentage(95f);
											HeaderTable4.getDefaultCell()
													.setBorder(Rectangle.NO_BORDER);

											HeaderTable4.addCell(new Phrase("", subheader));
											HeaderTable4.addCell(new Phrase("", subheader));
											HeaderTable4.addCell(new Phrase("", subheader));
											HeaderTable4.addCell(new Phrase("", subheader));

											HeaderTable4
													.addCell(new Phrase("Patient Name ", subheader));
											HeaderTable4.addCell(new Phrase(": " + patientName,
													tabletext));
											PdfPCell cell0 = new PdfPCell(new Phrase("Invoice No ",
													subheader));

											cell0.setBorder(Rectangle.NO_BORDER);
											HeaderTable4.addCell(cell0);
											
											if (print.contains("off")) {
												if(transationType.equals("Credit") || transationType.contains("Credit")){
													HeaderTable4.addCell(new Phrase(": IPD" + unitNo,
															tabletext));
												}else{
													HeaderTable4.addCell(new Phrase(": CS" + unitNo,
															tabletext));
												}
											}else{
												HeaderTable4.addCell(new Phrase(": CS" + unitNo,
														tabletext));
											}

											

											PdfPCell cell00 = new PdfPCell(new Phrase("Address ",
													subheader));
											cell00.setBorder(Rectangle.NO_BORDER);
											HeaderTable4.addCell(cell00);

											HeaderTable4.addCell(new Phrase(": " + patientAddress,
													tabletext));

											PdfPCell cell001 = new PdfPCell(new Phrase("Date/Time ",
													subheader));

											cell001.setBorder(Rectangle.NO_BORDER);
											HeaderTable4.addCell(cell001);

											HeaderTable4.addCell(new Phrase(": " + 
													saleDate+" "+ txtTime, tabletext));

											HeaderTable4.addCell(new Phrase("Consultant Name ",
													subheader));
											HeaderTable4.addCell(new Phrase(": " + doctor, tabletext));
											PdfPCell cell011 = new PdfPCell(new Phrase("Type ",
													subheader));

											cell011.setBorder(Rectangle.NO_BORDER);
											HeaderTable4.addCell(cell011);

											HeaderTable4.addCell(new Phrase(": " + transationType,
													tabletext));

											document.add(HeaderTable4);
											HeaderTable4.flushContent();

											HeaderTable4.addCell(new Phrase("", subheader));
											HeaderTable4.addCell(new Phrase("", tabletext));
											PdfPCell cell0112 = new PdfPCell(new Phrase("Bank Name ",
													subheader));
											cell0112.setBorder(Rectangle.NO_BORDER);
											if (!bankName.equals("")) {
												HeaderTable4.addCell(cell0112);
												HeaderTable4.addCell(new Phrase(": "+bankName, tabletext));
											} else {
												HeaderTable4.addCell(new Phrase("", tabletext));
												HeaderTable4.addCell(new Phrase("", tabletext));
											}

											document.add(HeaderTable4);
											HeaderTable4.flushContent();

											HeaderTable4.addCell(new Phrase("", subheader));
											HeaderTable4.addCell(new Phrase("", tabletext));
											PdfPCell cell01123 = new PdfPCell(new Phrase("Cheque No :",
													subheader));
											cell01123.setBorder(Rectangle.NO_BORDER);
											if (!chequeNo.equals("")) {
												HeaderTable4.addCell(cell01123);
												HeaderTable4.addCell(new Phrase(chequeNo, tabletext));
											} else {
												HeaderTable4.addCell(new Phrase("", tabletext));
												HeaderTable4.addCell(new Phrase("", tabletext));
											}

											document.add(HeaderTable4);
											HeaderTable4.flushContent();

											PdfPTable patientDemoDetailName3 = new PdfPTable(4);
											int[] patientDemoDetailNameWidth3 = { 16, 36, 16, 36 };
											patientDemoDetailName3
													.setWidths(patientDemoDetailNameWidth3);
											patientDemoDetailName3.setWidthPercentage(95f);
											patientDemoDetailName3.getDefaultCell().setBorder(
													Rectangle.NO_BORDER);

											

											document.add(patientDemoDetailName3);
											patientDemoDetailName3.flushContent();
								%>

		<%
			
					PdfPTable HeaderTable6 = new PdfPTable(11);
					int[] headerwidth6 = {3,10,8,6,5,6,6,6,6,6,8};
					HeaderTable6.setWidths(headerwidth6);
					HeaderTable6.setWidthPercentage(95f);
					HeaderTable6.getDefaultCell().setBorder(Rectangle.BOTTOM);

					HeaderTable6.setSpacingAfter(5f);

					HeaderTable6.addCell(new Phrase("#", subheader));
					HeaderTable6.addCell(new Phrase("Product Name", subheader));
					HeaderTable6.addCell(new Phrase("Preparation", subheader));
					
					PdfPCell batchNumberCell = new PdfPCell(new Phrase(
							"Batch No", subheader));
					batchNumberCell
							.setHorizontalAlignment(Element.ALIGN_LEFT);
					batchNumberCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(batchNumberCell);


					PdfPCell cells = new PdfPCell(new Phrase("Expiry",
							subheader));
					cells.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells);
					
					PdfPCell vcells = new PdfPCell(new Phrase("GST%",
							subheader));
					vcells.setHorizontalAlignment(Element.ALIGN_RIGHT);
					vcells.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(vcells); 
					
					
					PdfPCell qtyCellHeader = new PdfPCell(new Phrase("Qty",
							subheader));
					qtyCellHeader.setHorizontalAlignment(Element.ALIGN_RIGHT);
					qtyCellHeader.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(qtyCellHeader);
					
					
					PdfPCell vcellsm = new PdfPCell(new Phrase("GST Amt",
							subheader));
					vcellsm.setHorizontalAlignment(Element.ALIGN_RIGHT);
					vcellsm.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(vcellsm); 
					
					PdfPCell cells1 = new PdfPCell(new Phrase("MRP ("+currencyCode+")",
							subheader));
					cells1.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells1.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells1);
					
					PdfPCell discount = new PdfPCell(new Phrase("Disc Amt",
							subheader));
					discount.setHorizontalAlignment(Element.ALIGN_RIGHT);
					discount.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(discount);				

				 	PdfPCell cells2 = new PdfPCell(new Phrase("Total Amt",
							subheader));
					cells2.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells2.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells2); 
				

					document.add(HeaderTable6);
					HeaderTable6.flushContent();

					HeaderTable6.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					
					
					double totDisc=0.0;
					Double amt2=0.0;
				
				
		%>
		<c:set var="total" value="${row.counterSaleGrossAmt }" />
		
		 <c:set var="vat6" value="${row.counterTaxVat6}" />
		  
		  <c:set var="vat135" value="${row.counterTaxVat135}" />
		
	    <c:set var="vat5" value="${row.counterTaxVat5}" />
	    
	     <c:set var="vat55" value="${row.counterTaxVat55}" />
	    
		<c:set var="vat12" value="${row.counterTaxVat12}" />
		
		<c:set var="vat0" value="${row.counterTaxVat0}" />
		
		 <c:set var="vat55" value="${row.counterTaxVat55}" />
		 
		<c:set var="totalVat" value="${row.counterTotalVat}" />
			
		<c:set var="word" value="${row.counterSaleNetAmt }" />
		
		<c:set var="coutersalecd" value="${row.coutersalecd }" />
		<c:set var="coutersalecdamt" value="${row.coutersalecdamt }" />
		<c:set var="counterTaxCardNo" value="${row.counterTaxCardNo }" />

		<c:forEach items="${row.ltCounterSlave}" var="vendor"
			varStatus="count">

			<c:set var="qty" value="${vendor.counterSlaveQty }" />

			<c:set var="mrp" value="${vendor.counterSlaveMrp }" />

			<c:set var="rate" value="${vendor.counterSlaveRate }" />
			
			<c:set var="rateForprint" value="${vendor.counterSlaveRateForPrint }" />

			<c:set var="amt" value="${vendor.counterSlaveAmt }" />

			<c:set var="batchCode" value="${vendor.counterSaleBatchCode }" />

			<c:set var="expiry" value="${vendor.counterSaleBatchExpiry }" />

			<c:set var="counter" value="${(count.index)+1}" />

			<c:set var="productName" value="${vendor.productMaster.productName}" />
			
	         <c:set var="vat" value="${vendor.counterSlaveVat}" /> 
	
	       <c:set var="vatAmt" value="${vendor.counterSlaveVatAmt}" /> 
	       
	       <c:set var="disc" value="${vendor.counterSlaveDisc}" /> 
	       <c:set var="pre" value="${vendor.productMaster.productDesc}" />
	       
	       <c:set var="unit" value="${vendor.counterslaveunit}" />

			<%
 				           String counter = ""
 									+ (String) pageContext.getAttribute("counter")
 											.toString();

 							String qty = "";
 							if (pageContext.getAttribute("qty") == null) {
 								qty = "";
 							} else {
 								qty = qty
 										+ (String) pageContext.getAttribute("qty")
 												.toString();
 							}

 							String mrp = "";
 							if (pageContext.getAttribute("mrp") == null) {
 								mrp = "";
 							} else {
 								mrp = mrp
 										+ (String) pageContext.getAttribute("mrp")
 												.toString();
 							}

 							String amt = "";
 							if (pageContext.getAttribute("amt") == null) {
 								amt = "";
 							} else {
 								amt = amt
 										+ (String) pageContext.getAttribute("amt")
 												.toString();
 							}

 							String vat = "";
 							if (pageContext.getAttribute("vat") == null) {
 								vat = "";
 							} else {
 								vat = vat
 										+ (String) pageContext.getAttribute("vat")
 												.toString();
 							}

 							String vatAmt = "";
 							if (pageContext.getAttribute("vatAmt") == null) {
 								vatAmt = "";
 							} else {
 								vatAmt = vatAmt
 										+ (String) pageContext.getAttribute(
 												"vatAmt").toString();
 							}
 							//touheed khan @ 12-Jan-2018 total gst amt is coming wrong so code is changed

 							double gst = 0.0;
 							gst = Double.parseDouble(vatAmt);
 							totGst = totGst + gst;
 							//end

 							String rate = "";
 							if (pageContext.getAttribute("rateForprint") == null) {
 								rate = "";
 							} else {
 								rate = rate
 										+ (String) pageContext.getAttribute(
 												"rateForprint").toString();
 							}

 							String totalVat = "";
 							if (pageContext.getAttribute("totalVat") == null) {
 								totalVat = "";
 							} else {
 								totalVat = totalVat
 										+ (String) pageContext.getAttribute(
 												"totalVat").toString();

 								Float totalVat1 = Float.parseFloat(totalVat);
 								DecimalFormat df = new DecimalFormat("###.##");
 								totalVat = df.format(totalVat1);
 							}

 							String vat5 = "";
 							if (pageContext.getAttribute("vat5") == null) {
 								vat5 = "";
 							} else {
 								vat5 = vat5
 										+ (String) pageContext.getAttribute("vat5")
 												.toString();

 								Float vat51 = Float.parseFloat(vat5);
 								DecimalFormat df = new DecimalFormat("###.##");
 								vat5 = df.format(vat51);
 							}
 							
 							double disc=0.0;
 							if (pageContext.getAttribute("disc") != null) {
 								disc =  Double.parseDouble(pageContext.getAttribute("disc").toString());

 							}

 							String vat6 = "";
 							if (pageContext.getAttribute("vat6") == null) {
 								vat6 = "";
 							} else {
 								vat6 = vat6
 										+ (String) pageContext.getAttribute("vat6")
 												.toString();

 								Float vat61 = Float.parseFloat(vat6);
 								DecimalFormat df = new DecimalFormat("###.##");
 								vat6 = df.format(vat61);
 							}

 							String vat55 = "";
 							if (pageContext.getAttribute("vat55") == null) {
 								vat5 = "";
 							} else {
 								vat55 = vat55
 										+ (String) pageContext
 												.getAttribute("vat55").toString();

 								Float vat515 = Float.parseFloat(vat55);
 								DecimalFormat df = new DecimalFormat("###.##");
 								vat55 = df.format(vat515);
 							}

 							String vat135 = "";
 							if (pageContext.getAttribute("vat135") == null) {
 								vat135 = "";
 							} else {
 								vat135 = vat135
 										+ (String) pageContext.getAttribute(
 												"vat135").toString();

 								Float vat0135 = Float.parseFloat(vat135);
 								DecimalFormat df = new DecimalFormat("###.##");
 								vat135 = df.format(vat0135);
 							}

 							String vat12 = "";
 							if (pageContext.getAttribute("vat12") == null) {
 								vat12 = "";
 							} else {
 								vat12 = vat12
 										+ (String) pageContext
 												.getAttribute("vat12").toString();

 								Float vat121 = Float.parseFloat(vat12);
 								DecimalFormat df = new DecimalFormat("###.##");
 								vat12 = df.format(vat121);
 							}

 							String vat0 = "";
 							if (pageContext.getAttribute("vat0") == null) {
 								vat0 = "";
 							} else {
 								vat0 = vat0
 										+ (String) pageContext.getAttribute("vat0")
 												.toString();

 								Float vat01 = Float.parseFloat(vat0);
 								DecimalFormat df = new DecimalFormat("###.##");
 								vat0 = df.format(vat01);
 							}

 							
 							String batchCode = "";
 							if (pageContext.getAttribute("batchCode") == null) {
 								batchCode = "";
 							} else {
 								batchCode = batchCode
 										+ (String) pageContext.getAttribute(
 												"batchCode").toString();
 							}

 							String pre="";
							if (pageContext.getAttribute("pre") != null)
								pre=pageContext.getAttribute("pre").toString();


 							String expiry = "";
 							if (pageContext.getAttribute("expiry") == null) {
 								expiry = "";
 							} else {
 								expiry = expiry
 										+ (String) pageContext.getAttribute(
 												"expiry").toString();
 							}

 							

 							String productName = "";
 							if (pageContext.getAttribute("productName") == null) {
 								productName = "";
 							} else {
 								productName = productName
 										+ (String) pageContext.getAttribute(
 												"productName").toString();
 							}

 							String unit = "";
 							if (pageContext.getAttribute("unit") == null) {
 								unit = "";
 							} else {
 								unit = unit
 										+ (String) pageContext.getAttribute("unit")
 												.toString();
 							}
 							
 							HeaderTable6.addCell(new Phrase(counter, tabletext));
 							HeaderTable6
 									.addCell(new Phrase(productName, tabletext));
 							
 							PdfPCell productpre = new PdfPCell(new Phrase(
									pre, tabletext));
							productpre
									.setHorizontalAlignment(Element.ALIGN_LEFT);
							productpre.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(productpre);


 							PdfPCell batchCodeCells = new PdfPCell(new Phrase(
 									batchCode, tabletext));
 							batchCodeCells
 									.setHorizontalAlignment(Element.ALIGN_LEFT);
 							batchCodeCells.setBorder(Rectangle.NO_BORDER);
 							HeaderTable6.addCell(batchCodeCells);

 							PdfPCell cell3 = new PdfPCell(new Phrase(expiry,
 									tabletext));
 							cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
 							cell3.setBorder(Rectangle.NO_BORDER);
 							HeaderTable6.addCell(cell3);

 							Double vatt1 = Double.parseDouble(vat);
 							PdfPCell Vatcell3 = new PdfPCell(new Phrase(
 									df2.format(vatt1), tabletext));
 							Vatcell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
 							Vatcell3.setBorder(Rectangle.NO_BORDER);
 							HeaderTable6.addCell(Vatcell3);

 							PdfPCell qtyCell = new PdfPCell(new Phrase(qty,
 									tabletext));
 							qtyCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
 							qtyCell.setBorder(Rectangle.NO_BORDER);
 							HeaderTable6.addCell(qtyCell);

 							Double vatAmt2 = Double.parseDouble(vatAmt);
 							PdfPCell cell9 = new PdfPCell(new Phrase(
 									df2.format(vatAmt2), tabletext));
 							cell9.setHorizontalAlignment(Element.ALIGN_RIGHT);
 							cell9.setBorder(Rectangle.NO_BORDER);
 							HeaderTable6.addCell(cell9);

 							Double rate2 = Double.parseDouble(rate);
 							PdfPCell cell4 = new PdfPCell(new Phrase(
 									df2.format(rate2), tabletext));
 							cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
 							cell4.setBorder(Rectangle.NO_BORDER);
 							HeaderTable6.addCell(cell4);
 							
 							double mrp1=Double.parseDouble(mrp); 
 							int unit1=Integer.parseInt(unit);
 							Double unit11=Double.valueOf(unit1);
 							int qty1=Integer.parseInt(qty);
 							Double qty11=Double.valueOf(qty1);
 							double mrp2= 0;
 							
 							mrp2=(mrp1/unit11)*qty11;
 							
 							double disc1 = 0;
 							disc1 = (mrp2*disc/100);
 							System.err.println("disc1============="+disc1);
 							
 							PdfPCell discAmt = new PdfPCell(new Phrase(
 									df2.format(disc1), tabletext));
 									//df2.format((rate2*disc/100)), tabletext));
 							discAmt.setHorizontalAlignment(Element.ALIGN_RIGHT);
 							discAmt.setBorder(Rectangle.NO_BORDER);
 							HeaderTable6.addCell(discAmt);
 							
 							totDisc+=(rate2*disc/100);

 							amt2+= Double.parseDouble(amt);
 							PdfPCell cell5 = new PdfPCell(new Phrase(
 									df2.format(Double.parseDouble(amt)), tabletext));
 							cell5.setHorizontalAlignment(Element.ALIGN_RIGHT);
 							cell5.setBorder(Rectangle.NO_BORDER);
 							HeaderTable6.addCell(cell5);

 							document.add(HeaderTable6);
 							HeaderTable6.flushContent();
 			%>
		</c:forEach>

		<%
			HeaderTable6.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
				
						String totalVat = ""
								+ (String) pageContext.getAttribute("vatAmt")
										.toString();
					 
					String total = "";
					if (pageContext.getAttribute("total") == null) {
						total = "";
					} else {
						total = total
								+ (String) pageContext
										.getAttribute("total").toString();
						
						Float total2 = Float.parseFloat(total);
						Float vatValue = Float.parseFloat(totalVat);
						Float result2= total2-vatValue;
																									
						DecimalFormat df = new DecimalFormat("###.##");
							total = df.format(result2);
					}
													
					String word1 = ""
							+ (String) pageContext.getAttribute("word")
									.toString();
					
					String vat5 = ""
							+ (String) pageContext.getAttribute("vat5")
									.toString();
					
					String vat6 = ""
							+ (String) pageContext.getAttribute("vat6")
									.toString();
					
					String vat135 = ""
							+ (String) pageContext.getAttribute("vat135")
									.toString();
					
					String vat55 = ""
							+ (String) pageContext.getAttribute("vat55")
									.toString();
					
					String vat12 = ""
							+ (String) pageContext.getAttribute("vat12")
									.toString();
					
					String vat0 = ""
							+ (String) pageContext.getAttribute("vat0")
									.toString();
															
					
					/* <c:set var="coutersalecd" value="${row.coutersalecd }" />
					<c:set var="coutersalecdamt" value="${row.coutersalecdamt }" />
					<c:set var="counterTaxCardNo" value="${row.counterTaxCardNo }" /> */
					
					String coutersalecd = "";
					if (pageContext.getAttribute("coutersalecd") == null) {
						coutersalecd = "";
					} else {
						coutersalecd = coutersalecd
								+ (String) pageContext
										.getAttribute("coutersalecd").toString();
					}
					String coutersalecdamt = "";
					if (pageContext.getAttribute("coutersalecdamt") == null) {
						coutersalecdamt = "";
					} else {
						coutersalecdamt = coutersalecdamt
								+ (String) pageContext
										.getAttribute("coutersalecdamt").toString();
					}
					
					String counterTaxCardNo = "";
					if (pageContext.getAttribute("counterTaxCardNo") == null) {
						counterTaxCardNo = "";
					} else {
						counterTaxCardNo = counterTaxCardNo
								+ (String) pageContext
										.getAttribute("counterTaxCardNo").toString();
					}
					double conDouble=Double.parseDouble(word1);
					
					double discountAmt=Double.parseDouble(coutersalecdamt);
					
					long word=Math.round(conDouble);
					
					document.add(HeaderTable6);
					HeaderTable6.flushContent();

					
					PdfPTable HeaderTable7 = new PdfPTable(7);
					int[] headerwidth7 = {30,30,12,5,12,30,12};
					HeaderTable7.setWidths(headerwidth7);
					HeaderTable7.setWidthPercentage(95f);
					HeaderTable7.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					if(Double.parseDouble(vat5)!=0.0 )
					HeaderTable7.addCell(new Phrase("", subheader));
					else  if(Double.parseDouble(vat55)!=0.0 || Double.parseDouble(vat12)!=0.0)
					 HeaderTable7.addCell(new Phrase("", subheader));
				    else 
					HeaderTable7.addCell(new Phrase("", subheader));
					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					
					//For gross amount 
					Double namt= Double.parseDouble(word1); 
					Double grossamt =Double.parseDouble(total);
					df2.format(namt);
					df2.format(totGst);
					
					
					Double gamt= namt -totGst;
					
					PdfPCell cells31 = new PdfPCell(new Phrase("Total Amt(w/o GST)=",
							subheader));
					cells31.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells31.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells31);
					
					//Double.parseDouble(total)
					/* PdfPCell cells32 = new PdfPCell(new Phrase(df2.format(gamt),
							subheader)); */
					PdfPCell cells32 = new PdfPCell(new Phrase(df2.format(amt2-totGst),
									subheader));
					cells32.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells32.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells32);
													
					if(Double.parseDouble(vat12)!=0.0 || Double.parseDouble(vat55)!=0.0 || Double.parseDouble(vat5)!=0.0)
						HeaderTable7.addCell(new Phrase("", subheader));
					else 
						HeaderTable7.addCell(new Phrase("", subheader));
					
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					
					
//Discount
					PdfPCell cells404= new PdfPCell(new Phrase("",
							subheader));
					cells404.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells404.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells404);
					
					PdfPCell cells0341 = new PdfPCell(new Phrase("",
							subheader));
					cells0341.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells0341.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells0341);
					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					
					
					PdfPCell cells33 = new PdfPCell(new Phrase("GST Amt =",
							subheader));
					cells33.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells33.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells33);
					
					//touheed kHan 12-Jan-2018
					PdfPCell cells34 = new PdfPCell(new Phrase(df2.format(totGst),subheader));
					//end
					cells34.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells34.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells34); 
					
				
					
					
					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
			
					
			
					
					PdfPCell cells44= new PdfPCell(new Phrase("Final Amt =",
							subheader));
					cells44.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells44.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells44);
					
					PdfPCell cells341 = new PdfPCell(new Phrase(Math.round(amt2)+"",subheader));
					cells341.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells341.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells341);

				

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

				
					document.add(HeaderTable7);
					HeaderTable7.flushContent();

					
					
		%>
		<%
		if(tmpFlag==0){
			PdfPTable HeaderTable14 = new PdfPTable(2);
					int[] headerwidth15 = { 60, 20 };
					HeaderTable14.setWidths(headerwidth15);
					HeaderTable14.setWidthPercentage(95f);
					HeaderTable14.getDefaultCell().setBorder(Rectangle.BOTTOM);

					int[] headerwidth16 = { 60, 20 };
					HeaderTable14.setWidths(headerwidth16);
					HeaderTable14.addCell(new Phrase("", tabletext));
					HeaderTable14.addCell(new Phrase("", tabletext));

					document.add(HeaderTable14);
					HeaderTable14.flushContent();

					PdfPTable HeaderTable12 = new PdfPTable(3);
					int[] headerwidth12 = { 10, 16, 40 };
					HeaderTable12.setWidths(headerwidth12);
					HeaderTable12.setWidthPercentage(95f);
					HeaderTable12.getDefaultCell().setBorder(
							Rectangle.BOTTOM);
					int[] headerwidth13 = { 20, 33, 0 };
					HeaderTable12.setWidths(headerwidth13);
					if(print.contains("on")){
						
						
						HeaderTable12.addCell(new Phrase("Received with thanks from :", subheader));
						HeaderTable12.addCell(new Phrase(patientName, tabletext));
						HeaderTable12.addCell(new Phrase("", tabletext));
						
					}
					
					HeaderTable12.addCell(new Phrase("Amount in "+currencyName+" :",subheader));
					HeaderTable12.addCell(new Phrase("("+word+") "+EnglishNumberToWords.convert(word).toUpperCase()+" "+currencyName+" only", tabletext));
					HeaderTable12.addCell(new Phrase("", tabletext));
					document.add(HeaderTable12);
					HeaderTable12.flushContent();

					
					PdfPTable HeaderTable5 = new PdfPTable(2);
					int[] headerwidth5 = { 15, 90};
					HeaderTable5.setWidths(headerwidth5);
					HeaderTable5.setWidthPercentage(95f);
					HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

					int[] headerwidth = {30, 70};
					HeaderTable5.setWidths(headerwidth);
					HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(new Phrase("DRUG LICENSE NO-  ",tabletext1));
					HeaderTable5.addCell(new Phrase(""+"20-528466 / 21-528467",tabletext));
					document.add(HeaderTable5);
					HeaderTable5.flushContent();
					
					 int[] headerwidth25 = {30, 70};
					 HeaderTable5.setWidths(headerwidth25);
					 HeaderTable5.addCell(new Phrase("FOOD LICENSE NO-  ",tabletext1));
					 HeaderTable5.addCell(new Phrase(""+"-",tabletext));
					 document.add(HeaderTable5);
					 HeaderTable5.flushContent();
					
					 int[] headerwidth24 = {30, 70};
					 HeaderTable5.setWidths(headerwidth24);
					 HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
					 
						HeaderTable5.addCell(new Phrase(
								"GST NO-                     " ,
								tabletext));
					
					//HeaderTable5.addCell(new Phrase(""+ GStNo, tabletext));
					document.add(HeaderTable5);
					HeaderTable5.flushContent();
		}
					PdfPTable HeaderTable10 = new PdfPTable(3);
					int[] headerwidth10 = { 10, 50, 30 };
					HeaderTable10.setWidths(headerwidth10);
					HeaderTable10.setWidthPercentage(95f);
					HeaderTable10.setHorizontalAlignment(Element.ALIGN_CENTER);
					
					if(tmpFlag==1){
						HeaderTable10.getDefaultCell().setBorder(Rectangle.TOP);
						HeaderTable10.setWidths(headerwidth10);
						HeaderTable10.addCell(new Phrase("", subheader));
						HeaderTable10.addCell(new Phrase("", subheader));
						HeaderTable10.addCell(new Phrase("", subheader));
						document.add(HeaderTable10);
						HeaderTable10.flushContent();
						HeaderTable10.getDefaultCell().setBorder(Rectangle.BOTTOM);
						HeaderTable10.setWidths(headerwidth10);
						HeaderTable10.addCell(new Phrase("Amount in "+currencyName+" :",subheader));
						HeaderTable10.addCell(new Phrase("("+currencyName+". "+word+") "+EnglishNumberToWords.convert(word).toUpperCase()+" "+currencyName+" only", tabletext));
						HeaderTable10.addCell(new Phrase("", tabletext));
						
						document.add(HeaderTable10);
						HeaderTable10.flushContent();
					}
					
					HeaderTable10.getDefaultCell().setBorder(
							Rectangle.NO_BORDER);

					int[] headerwidth11 = { 25, 55, 35 };
					HeaderTable10.setWidths(headerwidth11);
					HeaderTable10.setHorizontalAlignment(Element.ALIGN_CENTER);
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10
							.addCell(new Phrase(
									"Please get your medicines checked by doctor before use.",
									subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					document.add(HeaderTable10);
					HeaderTable10.flushContent();

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					PdfPCell cells3411 = new PdfPCell(new Phrase(
							"Sign of Pharmacist", subheader));
					cells3411.setHorizontalAlignment(Element.ALIGN_CENTER);
					cells3411.setBorder(Rectangle.NO_BORDER);
					HeaderTable10.addCell(cells3411);

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					PdfPCell cells231 = new PdfPCell(new Phrase(user_name,
							tabletext));
					cells231.setHorizontalAlignment(Element.ALIGN_CENTER);
					cells231.setBorder(Rectangle.NO_BORDER);
					HeaderTable10.addCell(cells231);

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					document.add(HeaderTable10);
					HeaderTable10.flushContent();

					/* if (print.contains("on")) {
						PdfPTable HeaderTable51 = new PdfPTable(2);
						int[] headerwidth61 = { 15, 90 };
						HeaderTable51.setWidths(headerwidth61);
						HeaderTable51.setWidthPercentage(95f);
						HeaderTable51.getDefaultCell().setBorder(
								Rectangle.BOTTOM);

						int[] headerwidth14 = { 10, 90 };
						HeaderTable51.setWidths(headerwidth14);
						HeaderTable51.getDefaultCell().setBorder(
								Rectangle.NO_BORDER);
						HeaderTable51.addCell(new Phrase("", tabletext));
						HeaderTable51
								.addCell(new Phrase(
										"I/we hereby certify that my/our registration certificate under the Maharashtra Value Added Tax Act 2002 is in force",
										tabletext));

						document.add(HeaderTable51);
						HeaderTable51.flushContent();

						int[] headerwidth28 = { 10, 90 };

						HeaderTable51.setWidths(headerwidth28);
						HeaderTable51.addCell(new Phrase("", tabletext));
						HeaderTable51
								.addCell(new Phrase(
										"on the date on which the sale of goods specified in this Tax Invoice is made but me/us and that the transaction of the",
										tabletext));

						document.add(HeaderTable51);
						HeaderTable51.flushContent();

						int[] headerwidth29 = { 10, 90 };

						HeaderTable51.setWidths(headerwidth29);
						HeaderTable51.addCell(new Phrase("", tabletext));
						HeaderTable51
								.addCell(new Phrase(
										"sales covered by this Tax Invoice has been effected by me/us and shall be accounted for in the turnover of sales while",
										tabletext));

						document.add(HeaderTable51);
						HeaderTable51.flushContent();

						int[] headerwidth27 = { 10, 90 };

						HeaderTable51.setWidths(headerwidth27);
						HeaderTable51.addCell(new Phrase("", tabletext));
						HeaderTable51
								.addCell(new Phrase(
										"filling of return and the due tax, if any payable on the sale has been paid or shall be paid.",
										tabletext));

						document.add(HeaderTable51);
						HeaderTable51.flushContent();
					} */
		%>

	</c:forEach>
	<%
		document.close();

			outStream.close();
			outStream.flush();
			return;

		} catch (Exception e) {
			System.err.println(e.getMessage());
			e.printStackTrace();
		}
	%>
</body>
</html>