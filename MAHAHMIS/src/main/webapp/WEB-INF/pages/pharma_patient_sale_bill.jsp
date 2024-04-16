<%@page import="java.util.ResourceBundle"%>
<%@page import="java.math.RoundingMode"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="org.json.JSONArray"%>

<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.pharmacy.dao.EhatEnterpriseUtil"%>
<%@ page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@ page import="com.hms.ehat.dto.CurrencyTypeDto"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title></title>
</head>
<body>




	<c:set var="patientTransType" value="${patientSaleTransationType}" />
	<%
 	DecimalFormat df = new DecimalFormat("0.00");
		//For on off flow 
	/*	ResourceBundle resourceBundleEhat = ResourceBundle
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

		String drugLicenseNo1 = (String) resourceBundlepharmacy
				.getString("drugLicenseNo1");
		

		String GStNo1 = (String) resourceBundlepharmacy.getString("GStNo"); */
		CurrencyTypeService fetchOneCurrency=(ApplicationContextUtils.getApplicationContext()).getBean(CurrencyTypeService.class);
		List<CurrencyTypeDto> listServiceCurrencyDto=fetchOneCurrency.getOneCurrencyList();
		String currencyCode=listServiceCurrencyDto.get(0).getCurrencyCode();
		String currencyName=listServiceCurrencyDto.get(0).getCurrencyName();

		String patientTransType = "";
		if (pageContext.getAttribute("patientTransType") == null) {
			patientTransType = "";
		} else {

			patientTransType = patientTransType
					+ (String) pageContext.getAttribute("patientTransType")
							.toString();
		}

		try {
			response.setContentType("application/pdf");

			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);


			ResourceBundle resourceBundleEhat = ResourceBundle
					.getBundle("Ehat");
			String print = (String) resourceBundleEhat
					.getString("pharmacyPrint");
			String MedicalName = hospObj.getMedicalName(); 
			String MedicalAddress = hospObj.getMedicalAddress();
			String MedicalZipcode = hospObj.getMedicalZipCode();
			String MedicalDrugLicenseNo = hospObj.getDruglicense();
			String MedicalDrugLicenseNo1 = hospObj.getDrugLicense1();
			String MedicalPhoneNo =hospObj.getMedicalContact();
			String MedicalEmail =hospObj.getMedicalEmail();
			String GSTIN = hospObj.getMedicalGstNo();

			ResourceBundle resourceBundlepharmacy = ResourceBundle
					.getBundle("pharmacy");
			String drugLicenseNo = hospObj.getDruglicense();

			String drugLicenseNo1 = hospObj.getDrugLicense1();
			

			String GStNo1 =hospObj.getMedicalGstNo();

			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			Document document;
			
			response.setHeader("Content-Disposition", "inline; filename = Patient Sale");

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
			Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
			/* -------------------- Define Fonts ---------------------------  */

			document.open();

			String path = hospObj.getFilePath();
			String address = "";
			String city = "";
			String country = "";
			String contact = "";
			//String hospitalName = "SHRADDHA MEDICAL STORES RUN BY SARGM HEALTHCARE PVT.LTD.";
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
				address = "SHOP NO.1,GROUND FLOOR, GAT NO.524/1/E, Kasarwadi Road,BARSHI TAL:BARSHI(SOLAPUR), Pin: 413411 ";
				tmpFlag = 1;
				GStNo = GStNo1;
			}
			address = "SHOP.NO.1 , UPR GR FLR ,PLOT.NO.136 TO 138 ZONE NO 8,GUT NO 71,ALPINE SUPERSPECIALITY HOSPITAL JAYNAGRI , BEED BY PASS, AURANGABAD-431001";
					 
			
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

					HeaderTable1.addCell(cell);
				}

				Font regular = new Font(FontFamily.TIMES_ROMAN, 10,
						Font.NORMAL);
				Font bold = new Font(FontFamily.TIMES_ROMAN, 12, Font.BOLD);
				Phrase p = new Phrase();
				p.add(new Chunk(" " + MedicalName, bold));

				if (tmpFlag == 0) {
					p.add(new Chunk(" \n\n" + address + "," + city
							+ " Pin- " + hospitalZip, tabletext));
					p.add(new Chunk(" \nPhone No. " + "7721835774", tabletext));
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

					HeaderTable1.addCell(new Phrase("GSTIN-" +GSTIN,
							subheader));
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
					/* p.add(new Chunk(" " + city + " Pin- " + hospitalZip,
							tabletext)); */
					p.add(new Chunk(" Phone No. " + MedicalPhoneNo, tabletext));
					p.add(new Chunk(" \n "  + " email: " + MedicalEmail,
							tabletext));
					if (cinNo.equalsIgnoreCase("-")) {
						
					}else{
						//p.add(new Chunk(" \nCIN: " + "", tabletext));
					}
					if (serviceTaxNo.equalsIgnoreCase("-")) {
						
					}else{
						// p.add(new Chunk(" \nService Tax: " + "", tabletext));
					}
					if (panNo.equalsIgnoreCase("-")) {
						
					}else{
						//p.add(new Chunk( ", PAN No: " + "", tabletext));
					}
				}

				PdfPCell hospitalNameCell = new PdfPCell(p);
				hospitalNameCell
						.setHorizontalAlignment(Element.ALIGN_CENTER);
				hospitalNameCell.setBorder(Rectangle.NO_BORDER);
				HeaderTable1.addCell(hospitalNameCell);

				if (imgNabh == null || tmpFlag == 1) {

					/* HeaderTable1.addCell(new Phrase("DL20.MH-50L-282894"
							+ "\nDL20.MH-50L-282895", subheader)); */
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

			// Table 1 : For hospital adress details end

			String billName = "";
			//String drugLicenseNo = "";
			String foodLicenseNo = "";
			String vatTinNo = "";
			String moduleName = "";
			/* Map<String, org.json.JSONArray> ehatEnterprisePrintMaster = new HashMap<String, org.json.JSONArray>();
			EhatEnterpriseUtil ehatEnterpriseUtil = (ApplicationContextUtils
					.getApplicationContext())
					.getBean(EhatEnterpriseUtil.class);
			ehatEnterprisePrintMaster = ehatEnterpriseUtil
					.getPharmaPrintMasters();
			JSONArray array = ehatEnterprisePrintMaster.get("result");

			for (int i = 0; i < array.length(); i++) {
				org.json.JSONObject object = (org.json.JSONObject) array
						.get(i);
				if (object.get("moduleName").equals("patientSale")) {
					try {
						billName = (String) object.get("billName");
						drugLicenseNo = (String) object
								.get("drugLicenseNo");
						foodLicenseNo = (String) object
								.get("foodLicenseNo");
						vatTinNo = (String) object.get("vatTinNo");
						moduleName = (String) object.get("moduleName");
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			} */
	%>

	<c:set var="patientSponserName" value="${patientSaleSponserName}" />

	<c:forEach items="${patientSaleData}" var="row" varStatus="count">

		<c:set var="billId" value="${row.patientSalesBillId }" />

		<c:set var="billNumber" value="${row.patientSalesBillDocNo }" />

		<c:set var="saleDate" value="${row.patientBillMode }" />

		<c:set var="patientName" value="${row.patientSalesBillPrescription }" />

		<c:set var="patientAddress" value="${row.patientSalesBillEntryBy}" />

		<c:set var="patientMobileNum" value="${row.patientSaleCategoryName}" />

		<c:set var="doctor" value="${row.doctorName}" />

		<c:set var="less" value="${row.patientSalesBillLess}" />

		<c:set var="grossAmt" value="${row.patientSalesBillGrossAmt}" />

		<c:set var="surcharge" value="${row.patientSalesBillSurcharge}" />

		<c:set var="TransationType" value="${row.patientSalesBillNarration}" />

		<c:set var="patientId" value="${row.patientId}" />

		<c:set var="amountReceive"
			value="${row.patientSalesBillAmountReceived}" />

		<c:set var="previousBalance" value="${row.patientSalePreviousBalance}" />

		<c:set var="bankName" value="${row.patientSaleBankName}" />

		<c:set var="chequeNo" value="${row.patientSaleChequeNum}" />

		<c:set var="patientType" value="${row.patientType}" />

		<%
			String billNumber = "";
					if (pageContext.getAttribute("billNumber").toString() == null) {
						billNumber = "";
					} else {

						billNumber = billNumber
								+ (String) pageContext.getAttribute(
										"billNumber").toString();
					}

					String saleDate1 = "";
					String splitSaleDate[];
					String saleDate = "";

					if (pageContext.getAttribute("saleDate").toString() == null) {
						saleDate1 = "";
						saleDate = "";
					} else {
						java.util.Date date = new java.util.Date();
						SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");

						saleDate = saleDate
								+ (String) pageContext.getAttribute("saleDate")
								+ " : " + sdf.format(date);

					}

					String patientName = "";
					if (pageContext.getAttribute("patientName").toString() == null) {
						patientName = "";
					} else {
						patientName = patientName
								+ (String) pageContext.getAttribute(
										"patientName").toString();
					}

					String amountReceive = "";
					if (pageContext.getAttribute("amountReceive") == null) {
						amountReceive = "";
					} else {
						amountReceive = amountReceive
								+ (String) pageContext.getAttribute(
										"amountReceive").toString();
					}

					String previousBalance = "";
					if (pageContext.getAttribute("previousBalance") == null) {
						previousBalance = "";
					} else {
						previousBalance = previousBalance
								+ (String) pageContext.getAttribute(
										"previousBalance").toString();
					}

					String bankName = "";
					if (pageContext.getAttribute("bankName") == null) {
						bankName = "";
					} else {
						bankName = bankName
								+ (String) pageContext.getAttribute("bankName")
										.toString();
					}

					String chequeNo = "";
					if (pageContext.getAttribute("chequeNo") == null) {
						chequeNo = "";
					} else {
						chequeNo = chequeNo
								+ (String) pageContext.getAttribute("chequeNo")
										.toString();
					}

					String billId = "";
					if (pageContext.getAttribute("billId") == null) {
						billId = "";
					} else {

						billId = billId
								+ (String) pageContext.getAttribute("billId")
										.toString();
					}

					String patientId = "";
					if (pageContext.getAttribute("patientId") == null) {
						patientId = "";
					} else {

						patientId = patientId
								+ (String) pageContext
										.getAttribute("patientId").toString();
					}

					String catName = "";

					if (pageContext.getAttribute("patientType") == null) {
						catName = "";
					} else {

						catName = catName
								+ (String) pageContext.getAttribute(
										"patientType").toString();
					}

					String patientAddress = "";
					if (pageContext.getAttribute("patientAddress") == null) {
						patientAddress = "";
					} else {
						patientAddress = patientAddress
								+ (String) pageContext.getAttribute(
										"patientAddress").toString();
					}

					String patientMobile = "";
					if (pageContext.getAttribute("patientMobileNum") == null) {
						patientMobile = "";
					} else {
						patientMobile = patientMobile
								+ (String) pageContext.getAttribute(
										"patientMobileNum").toString();
					}

					String doctor = "";
					if (pageContext.getAttribute("doctor").toString() == null) {
						doctor = "";
					} else {
						doctor = doctor
								+ (String) pageContext.getAttribute("doctor")
										.toString();
						;
					}

					String less = "";
					if (pageContext.getAttribute("less").toString() == null) {
						less = "";
					} else {
						less = less
								+ (String) pageContext.getAttribute("less")
										.toString();
					}

					String grossAmt = "";
					if (pageContext.getAttribute("grossAmt").toString() == null) {
						grossAmt = "";
					} else {
						grossAmt = grossAmt
								+ (String) pageContext.getAttribute("grossAmt")
										.toString();
					}

					String surcharge = "";
					if (pageContext.getAttribute("surcharge").toString() == null) {
						surcharge = "";
					} else {
						surcharge = surcharge
								+ (String) pageContext
										.getAttribute("surcharge").toString();
					}

					String TransationType = "";
					if (pageContext.getAttribute("TransationType").toString() == null) {
						TransationType = "";
					} else {
						TransationType = TransationType
								+ (String) pageContext.getAttribute(
										"TransationType").toString();
					}

					String patientSponserName = "";
					if (pageContext.getAttribute("patientSponserName") == null) {
						patientSponserName = "";
					} else {

						patientSponserName = patientSponserName
								+ (String) pageContext.getAttribute(
										"patientSponserName").toString();
					}

					PdfPTable HeaderTable2 = new PdfPTable(5);
					int[] headerwidth2 = { 15, 25, 40, 10, 10 };
					HeaderTable2.setWidths(headerwidth2);
					HeaderTable2.setWidthPercentage(95f);
					HeaderTable2.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
					HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(new Phrase(" ", subheader));
					PdfPCell subcell = new PdfPCell(new Phrase("", subheader));
					subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
					subcell.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(subcell);
					//HeaderTable2.addCell(new Phrase(",subheader));
					if (print.contains("off")) {
						HeaderTable2.addCell(new Phrase("OPD "
								+ TransationType.toUpperCase(), subheader));
					} else {
						HeaderTable2.addCell(new Phrase("PATIENT SALE ",
								subheader));
					}
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					PdfPTable HeaderTable4 = new PdfPTable(4);
					int[] headerwidth4 = { 25, 35, 20, 15 };
					HeaderTable4.setWidths(headerwidth4);
					HeaderTable4.setWidthPercentage(95f);
					HeaderTable4.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable4.setSpacingAfter(3f);

					HeaderTable4.addCell(new Phrase("Patient Id ", subheader));
					HeaderTable4
							.addCell(new Phrase(": " + patientId, tabletext));
					PdfPCell cell0 = new PdfPCell(new Phrase("Invoice No ",
							subheader));
					cell0.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell0);
					HeaderTable4
							.addCell(new Phrase(": PS" + billId, tabletext));

					PdfPCell cell00 = new PdfPCell(new Phrase("Patient Name ",
							subheader));
					cell00.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell00);

					HeaderTable4.addCell(new Phrase(": "
							+ patientName.toUpperCase(), subheader));

					PdfPCell cell001 = new PdfPCell(new Phrase("Date/Time ",
							subheader));
					cell001.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell001);
					HeaderTable4.addCell(new Phrase(": " + saleDate + " " + "",
							tabletext));

					PdfPCell cell002 = new PdfPCell(new Phrase("Address ",
							subheader));
					cell002.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell002);

					HeaderTable4.addCell(new Phrase(": " + patientAddress,
							tabletext));

					PdfPCell cell0012 = new PdfPCell(new Phrase("Type ",
							subheader));
					cell0012.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell0012);
					HeaderTable4.addCell(new Phrase(": "
							+ TransationType.toUpperCase(), subheader));

					PdfPCell cell0022 = new PdfPCell(new Phrase("Mobile ",
							subheader));
					cell0022.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell0022);

					HeaderTable4.addCell(new Phrase(": " + patientMobile,
							tabletext));

					PdfPCell cell00122 = new PdfPCell(new Phrase("", subheader));
					cell00122.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell00122);
					HeaderTable4.addCell(new Phrase("", tabletext));

					HeaderTable4.addCell(new Phrase("Consultant Name ",
							subheader));
					HeaderTable4.addCell(new Phrase(": " + doctor, tabletext));
					PdfPCell cell012 = new PdfPCell(new Phrase("Sponsor Name",
							subheader));
					cell012.setHorizontalAlignment(Element.ALIGN_LEFT);
					cell012.setBorder(Rectangle.NO_BORDER);

					if (!patientSponserName.equals("")) {
						HeaderTable4.addCell(cell012);
						HeaderTable4.addCell(new Phrase(": "
								+ patientSponserName, tabletext));
					} else {
						HeaderTable4.addCell(new Phrase("", subheader));
						HeaderTable4.addCell(new Phrase("", subheader));
					}

					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", tabletext));
					PdfPCell cell0127 = new PdfPCell(new Phrase("Bank Name ",
							subheader));
					cell0127.setHorizontalAlignment(Element.ALIGN_LEFT);
					cell0127.setBorder(Rectangle.NO_BORDER);

					if (!bankName.equals("")) {
						HeaderTable4.addCell(cell0127);
						HeaderTable4.addCell(new Phrase(": " + bankName,
								tabletext));
					} else {
						HeaderTable4.addCell(new Phrase("", subheader));
						HeaderTable4.addCell(new Phrase("", subheader));
					}

					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", tabletext));
					PdfPCell cell0124 = new PdfPCell(new Phrase("Cheque No ",
							subheader));
					cell0124.setHorizontalAlignment(Element.ALIGN_LEFT);
					cell0124.setBorder(Rectangle.NO_BORDER);
					if (!chequeNo.equals("")) {
						HeaderTable4.addCell(cell0124);
						HeaderTable4.addCell(new Phrase(": " + chequeNo,
								tabletext));
					} else {
						HeaderTable4.addCell(new Phrase("", subheader));
						HeaderTable4.addCell(new Phrase("", subheader));
					}
					document.add(HeaderTable4);
					HeaderTable4.flushContent();

					if (TransationType.equals("Credit"))
						HeaderTable4.addCell(new Phrase("Bill category  ",
								subheader));
					else
						HeaderTable4.addCell(new Phrase("", subheader));

					if (TransationType.equals("Credit"))
						HeaderTable4.addCell(new Phrase(": " + catName,
								subheader));
					else
						HeaderTable4.addCell(new Phrase("", subheader));

					document.add(HeaderTable4);
					HeaderTable4.flushContent();
		%>
		<c:set var="vat0" value="${row.patientTaxVat0}" />
		<%
			PdfPTable HeaderTable6 = new PdfPTable(12);
					int[] headerwidth6 = { 2, 10,8, 5, 4, 3, 6, 7, 5, 5, 6, 6 };
					HeaderTable6.setWidths(headerwidth6);
					HeaderTable6.setWidthPercentage(95f);
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
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));

					HeaderTable6.addCell(new Phrase("#", subheader));
					HeaderTable6.addCell(new Phrase("Product Name", subheader));
					HeaderTable6.addCell(new Phrase("Preparation", subheader));

					PdfPCell batchNumberCell = new PdfPCell(new Phrase(
							"Batch No", subheader));
					batchNumberCell.setHorizontalAlignment(Element.ALIGN_LEFT);
					batchNumberCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(batchNumberCell);

					PdfPCell cells = new PdfPCell(new Phrase("Expiry",
							subheader));
					cells.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells);

					PdfPCell qtyCellHeader = new PdfPCell(new Phrase("Qty",
							subheader));
					qtyCellHeader.setHorizontalAlignment(Element.ALIGN_RIGHT);
					qtyCellHeader.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(qtyCellHeader);

					PdfPCell vatcells = new PdfPCell(new Phrase("GST%",
							subheader));
					vatcells.setHorizontalAlignment(Element.ALIGN_RIGHT);
					vatcells.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(vatcells);

					PdfPCell cells1 = new PdfPCell(new Phrase("MRP ("+currencyCode+")",
							subheader));
					cells1.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells1.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells1);

					PdfPCell vcellsm = new PdfPCell(new Phrase("Gross Amt",
							subheader));
					vcellsm.setHorizontalAlignment(Element.ALIGN_RIGHT);
					vcellsm.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(vcellsm);

					PdfPCell discPerCell = new PdfPCell(new Phrase("GST Amt",

					subheader));
					discPerCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					discPerCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(discPerCell);
						PdfPCell discPerAmt = new PdfPCell(new Phrase(
								"Discount", subheader));
						discPerAmt.setHorizontalAlignment(Element.ALIGN_RIGHT);
						discPerAmt.setBorder(Rectangle.BOTTOM);
						HeaderTable6.addCell(discPerAmt);
				
					PdfPCell cells2 = new PdfPCell(new Phrase("Net Amt",
							subheader));
					cells2.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells2.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells2);

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
					HeaderTable6.addCell(new Phrase("", tabletext));

					double grossTot = 0.0, gstTot = 0.0, discTot = 0.0, netTot = 0.0;
		%>
		<c:set var="vat5" value="${row.patientTaxVat5}" />

		<c:set var="vat55" value="${row.patientTaxVat55}" />

		<c:set var="vat12" value="${row.patientTaxVat12}" />



		<c:set var="vat6" value="${row.patientTaxVat6}" />

		<c:set var="vat135" value="${row.patientTaxVat135}" />

		<c:set var="total" value="${row.patientSalesBillNetAmt }" />
		<c:set var="word" value="${row.patientSalesBillNetAmt }" />

		<c:forEach items="${row.ltPatientSaleBill}" var="vendor"
			varStatus="count">

			<c:set var="qty" value="${vendor.patientSlaveQty }" />

			<c:set var="mrp" value="${vendor.patientSlaveMrp }" />

			<c:set var="rate" value="${vendor.patientSlaveRate }" />

			<c:set var="amt" value="${vendor.patientSlaveAmt }" />

			<c:set var="batchCode" value="${vendor.patientSlaveBatchCode }" />

			<c:set var="expiry" value="${vendor.patientSaleBatchExpiry }" />

			<c:set var="vat" value="${vendor.patientSlaveVat}" />

			<c:set var="counter" value="${(count.index)+1}" />

			<c:set var="productName" value="${vendor.productMaster.productName}" />

			<c:set var="vatAmt" value="${vendor.patientSlaveVatAmt}" />

			<!-- suraj code to add disc on print -->

			<c:set var="discPer" value="${vendor.patientSlaveDisc}" />

			<c:set var="discAmt" value="${vendor.patientSaleSlaveDiscAmt}" />
			<c:set var="pre" value="${vendor.productMaster.productDesc}" />

			<%
				String vat014 = "";
							if (pageContext.getAttribute("vat0") == null) {
								vat014 = "";
							} else {
								vat014 = vat014
										+ (String) pageContext.getAttribute("vat0")
												.toString();

								Float vat0114 = Float.parseFloat(vat014);
								vat014 = df.format(vat0114);
							}
							
							String pre="";
							if (pageContext.getAttribute("pre") != null)
								pre=pageContext.getAttribute("pre").toString();

							String counter = "";
							if (pageContext.getAttribute("counter").toString() == null) {
								counter = "";
							} else {
								counter = counter
										+ (String) pageContext.getAttribute(
												"counter").toString();
							}
							String qty = "";

							if (pageContext.getAttribute("qty").toString() == null) {
								qty = "";
							} else {
								qty = qty
										+ (String) pageContext.getAttribute("qty")
												.toString();

							}

							String vat = "";

							if (pageContext.getAttribute("vat").toString() == null) {
								vat = "";
							} else {
								vat = vat
										+ (String) pageContext.getAttribute("vat")
												.toString();
							}

							String mrp = "";

							if (pageContext.getAttribute("mrp").toString() == null) {
								mrp = "";
							} else {
								mrp = mrp
										+ (String) pageContext.getAttribute("mrp")
												.toString();

							}

							String rate = "";
							if (pageContext.getAttribute("rate").toString() == null) {
								rate = "";
							} else {
								rate = rate
										+ (String) pageContext.getAttribute("rate")
												.toString();
							}

							String amt = "";
							if (pageContext.getAttribute("amt").toString() == null) {
								amt = "";
							} else {
								amt = amt
										+ (String) pageContext.getAttribute("amt")
												.toString();

							}

							String discAmt = "";

							if (pageContext.getAttribute("discAmt") == null) {
								discAmt = "";
							} else {
								discAmt = discAmt
										+ (String) pageContext.getAttribute(
												"discAmt").toString();

							}

							String total = "";
							if (pageContext.getAttribute("total").toString() == null) {
								total = "";
							} else {
								total = total
										+ (String) pageContext
												.getAttribute("total").toString();
							}

							String batchCode = "";
							if (pageContext.getAttribute("batchCode").toString() == null) {
								batchCode = "";
							} else {
								batchCode = batchCode
										+ (String) pageContext.getAttribute(
												"batchCode").toString();
							}

							String expiry = "";
							if (pageContext.getAttribute("expiry").toString() == null) {
								expiry = "";
							} else {
								expiry = expiry
										+ (String) pageContext.getAttribute(
												"expiry").toString();
							}

							String productName = "";
							if (pageContext.getAttribute("productName").toString() == null) {
								productName = "";
							} else {
								productName = ""
										+ (String) pageContext.getAttribute(
												"productName").toString();
							}

							String vatAmt = "";
							if (pageContext.getAttribute("vatAmt") == null) {
								vatAmt = "";
							} else {
								vatAmt = vatAmt
										+ (String) pageContext.getAttribute(
												"vatAmt").toString();
							}

							String discPer = "";
							if (pageContext.getAttribute("discPer") == null) {
								discPer = "";
							} else {
								discPer = discPer
										+ (String) pageContext.getAttribute(
												"discPer").toString();
							}

							PdfPCell counterCodeCells = new PdfPCell(new Phrase(
									counter, tabletext));
							counterCodeCells
									.setHorizontalAlignment(Element.ALIGN_LEFT);
							counterCodeCells.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(counterCodeCells);

							PdfPCell productNameCells1 = new PdfPCell(new Phrase(
									productName, tabletext));
							productNameCells1
									.setHorizontalAlignment(Element.ALIGN_LEFT);
							productNameCells1.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(productNameCells1);
							
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

							PdfPCell qtyCell = new PdfPCell(new Phrase(qty,
									tabletext));
							qtyCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
							qtyCell.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(qtyCell);

							PdfPCell pvat = new PdfPCell(new Phrase(""
									+ Math.round(Double.parseDouble(vat)),
									tabletext));
							pvat.setHorizontalAlignment(Element.ALIGN_RIGHT);
							pvat.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(pvat);

							PdfPCell cell4 = new PdfPCell(new Phrase(
									df.format(Double.parseDouble(rate)),
									tabletext));
							cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell4.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell4);

							double gross = Double.parseDouble(rate)
									* Double.parseDouble(qty);
							grossTot += gross;
							PdfPCell cell9 = new PdfPCell(new Phrase(
									df.format(gross), tabletext));
							cell9.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell9.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell9);

							gstTot += Double.parseDouble(vatAmt);
							PdfPCell discPerPDFCell = new PdfPCell(new Phrase(
									df.format(Double.parseDouble(vatAmt)),
									tabletext));
							discPerPDFCell
									.setHorizontalAlignment(Element.ALIGN_RIGHT);
							discPerPDFCell.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(discPerPDFCell);

							discTot += gross * Double.parseDouble(discPer) / 100;
							PdfPCell discAmtPDFCell = new PdfPCell(new Phrase(
									df.format(gross * Double.parseDouble(discPer)
											/ 100), tabletext));
							discAmtPDFCell
									.setHorizontalAlignment(Element.ALIGN_RIGHT);
							discAmtPDFCell.setBorder(Rectangle.NO_BORDER);
							//if (tmpFlag == 0) {
								HeaderTable6.addCell(discAmtPDFCell);
							/* } else {
								PdfPCell discAmtPDFCell1 = new PdfPCell(new Phrase("", tabletext));
								discAmtPDFCell1
										.setHorizontalAlignment(Element.ALIGN_RIGHT);
								discAmtPDFCell1.setBorder(Rectangle.NO_BORDER);
								HeaderTable6.addCell(discAmtPDFCell1);
							} */
							netTot += Double.parseDouble(amt);
							PdfPCell cell5 = new PdfPCell(
									new Phrase(
											df.format(Double.parseDouble(amt)),
											tabletext));
							cell5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell5.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell5);
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
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));

					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));

					PdfPCell t1 = new PdfPCell(new Phrase("Total", subheader));
					t1.setHorizontalAlignment(Element.ALIGN_RIGHT);
					t1.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(t1);

					PdfPCell t2 = new PdfPCell(new Phrase(""
							+ df.format(grossTot), subheader));
					t2.setHorizontalAlignment(Element.ALIGN_RIGHT);
					t2.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(t2);

					//BigDecimal gsttotal = new BigDecimal(gstTot).setScale(2, RoundingMode.HALF_EVEN);
					PdfPCell t3 = new PdfPCell(new Phrase(""
							+ df.format(gstTot), subheader));
					t3.setHorizontalAlignment(Element.ALIGN_RIGHT);
					t3.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(t3);

					//if(tmpFlag==0){
					PdfPCell t4 = new PdfPCell(new Phrase(""
							+ df.format(discTot), subheader));
					t4.setHorizontalAlignment(Element.ALIGN_RIGHT);
					t4.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(t4);
				/* 	}
					else{
						PdfPCell t4 = new PdfPCell(new Phrase("", subheader));
						t4.setHorizontalAlignment(Element.ALIGN_RIGHT);
						t4.setBorder(Rectangle.BOTTOM);
						HeaderTable6.addCell(t4);
					} */

					PdfPCell t5 = new PdfPCell(new Phrase(""
							+ df.format(netTot), subheader));
					t5.setHorizontalAlignment(Element.ALIGN_RIGHT);
					t5.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(t5);

					document.add(HeaderTable6);
					HeaderTable6.flushContent();

					PdfPTable HeaderTable7 = new PdfPTable(7);
					int[] headerwidth7 = { 17, 10, 12, 5, 12, 30, 12 };
					HeaderTable7.setWidths(headerwidth7);
					HeaderTable7.setWidthPercentage(95f);
					HeaderTable7.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
					if (print.contains("off")) {

						HeaderTable7.addCell(new Phrase("", subheader));
						PdfPCell cells3611 = new PdfPCell(new Phrase("",
								subheader));
						cells3611.setHorizontalAlignment(Element.ALIGN_RIGHT);
						cells3611.setBorder(Rectangle.NO_BORDER);
						HeaderTable7.addCell(cells3611);

						HeaderTable7.addCell(new Phrase("", subheader));
						HeaderTable7.addCell(new Phrase("", subheader));
						HeaderTable7.addCell(new Phrase("", subheader));

						PdfPCell grossAmtpdf = new PdfPCell(new Phrase("",

						subheader));
						grossAmtpdf.setHorizontalAlignment(Element.ALIGN_RIGHT);
						grossAmtpdf.setBorder(Rectangle.NO_BORDER);
						HeaderTable7.addCell(grossAmtpdf);
						PdfPCell grossAmtpdf1 = new PdfPCell(new Phrase("",
								subheader));
						grossAmtpdf1
								.setHorizontalAlignment(Element.ALIGN_RIGHT);
						grossAmtpdf1.setBorder(Rectangle.NO_BORDER);
						HeaderTable7.addCell(grossAmtpdf1);

						HeaderTable7.addCell(new Phrase("", subheader));
						PdfPCell cells361 = new PdfPCell(new Phrase("",
								subheader));

						cells361.setHorizontalAlignment(Element.ALIGN_RIGHT);
						cells361.setBorder(Rectangle.NO_BORDER);
						HeaderTable7.addCell(cells361);

					} else {

						if (Double.parseDouble(amountReceive) != 0.0) {
							HeaderTable7.addCell(new Phrase(
									"Amount Received  =  ", subheader));
							PdfPCell cells3611 = new PdfPCell(new Phrase(
									df.format(Double
											.parseDouble(amountReceive)),
									subheader));
							cells3611
									.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells3611.setBorder(Rectangle.NO_BORDER);
							HeaderTable7.addCell(cells3611);
						} else {
							HeaderTable7.addCell(new Phrase("", subheader));
							PdfPCell cells3611 = new PdfPCell(new Phrase("",
									subheader));
							cells3611
									.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells3611.setBorder(Rectangle.NO_BORDER);
							HeaderTable7.addCell(cells3611);
						}
						HeaderTable7.addCell(new Phrase("", subheader));
						HeaderTable7.addCell(new Phrase("", subheader));
						HeaderTable7.addCell(new Phrase("", subheader));

						/*  if (Double.parseDouble(surcharge) != 0.0) {
							PdfPCell grossAmtpdf = new PdfPCell(new Phrase(
									"Surcharge =  ",

									subheader));
							grossAmtpdf
									.setHorizontalAlignment(Element.ALIGN_RIGHT);
							grossAmtpdf.setBorder(Rectangle.NO_BORDER);
							HeaderTable7.addCell(grossAmtpdf);
							PdfPCell grossAmtpdf1 = new PdfPCell(new Phrase(
									df.format(Double.parseDouble(surcharge)),
									subheader));
							grossAmtpdf1
									.setHorizontalAlignment(Element.ALIGN_RIGHT);
							grossAmtpdf1.setBorder(Rectangle.NO_BORDER);
							HeaderTable7.addCell(grossAmtpdf1);
						} else { */
							PdfPCell grossAmtpdf = new PdfPCell(new Phrase("",

							subheader));
							grossAmtpdf
									.setHorizontalAlignment(Element.ALIGN_RIGHT);
							grossAmtpdf.setBorder(Rectangle.NO_BORDER);
							HeaderTable7.addCell(grossAmtpdf);
							PdfPCell grossAmtpdf1 = new PdfPCell(new Phrase("",
									subheader));
							grossAmtpdf1
									.setHorizontalAlignment(Element.ALIGN_RIGHT);
							grossAmtpdf1.setBorder(Rectangle.NO_BORDER);
							HeaderTable7.addCell(grossAmtpdf1);
					//	} 

						if (Double.parseDouble(previousBalance) != 0.0) {
							HeaderTable7.addCell(new Phrase(
									"Previous Balance  =  ", subheader));
							PdfPCell cells361 = new PdfPCell(new Phrase(
									df.format(Double
											.parseDouble(previousBalance)),
									subheader));
							cells361.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells361.setBorder(Rectangle.NO_BORDER);
							HeaderTable7.addCell(cells361);
						} else {
							HeaderTable7.addCell(new Phrase("", subheader));
							PdfPCell cells361 = new PdfPCell(new Phrase("",
									subheader));

							cells361.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells361.setBorder(Rectangle.NO_BORDER);
							HeaderTable7.addCell(cells361);

						}
					}
					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					PdfPCell cells313 = new PdfPCell(new Phrase("Product Discount  =",
							subheader));
					cells313.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells313.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells313);

					PdfPCell cells314 = new PdfPCell(new Phrase(""
							+ df.format(discTot), subheader));
					cells314.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells314.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells314);
					

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					DecimalFormat df1 = new DecimalFormat("###");
					df1.format(netTot);
					double totalgross = netTot - gstTot;

					PdfPCell surchargepdf = new PdfPCell(new Phrase(
							"Total Amt(w/o GST) =", subheader));
					surchargepdf.setHorizontalAlignment(Element.ALIGN_RIGHT);
					surchargepdf.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(surchargepdf);

					PdfPCell surchargepdf1 = new PdfPCell(new Phrase(""
							+ df.format(totalgross), subheader));
					surchargepdf1.setHorizontalAlignment(Element.ALIGN_RIGHT);
					surchargepdf1.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(surchargepdf1);
					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					if (Double.parseDouble(less) != 0.0) {
						PdfPCell lesspdf = new PdfPCell(new Phrase(
								"C.Discount  = ",

								subheader));
						lesspdf.setHorizontalAlignment(Element.ALIGN_RIGHT);
						lesspdf.setBorder(Rectangle.NO_BORDER);
						HeaderTable7.addCell(lesspdf);
						PdfPCell lesspdf1 = new PdfPCell(new Phrase(
								df.format(Double.parseDouble(less)),
								subheader));
						lesspdf1.setHorizontalAlignment(Element.ALIGN_RIGHT);
						lesspdf1.setBorder(Rectangle.NO_BORDER);
						HeaderTable7.addCell(lesspdf1);
					} else {
						PdfPCell lesspdf = new PdfPCell(new Phrase("",

						subheader));
						lesspdf.setHorizontalAlignment(Element.ALIGN_RIGHT);
						lesspdf.setBorder(Rectangle.NO_BORDER);
						HeaderTable7.addCell(lesspdf);
						PdfPCell lesspdf1 = new PdfPCell(new Phrase("",
								subheader));
						lesspdf1.setHorizontalAlignment(Element.ALIGN_RIGHT);
						lesspdf1.setBorder(Rectangle.NO_BORDER);
						HeaderTable7.addCell(lesspdf1);
					}

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					PdfPCell cells33 = new PdfPCell(new Phrase("CGST Amt   =",
							subheader));
					cells33.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells33.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells33);

					PdfPCell cells34 = new PdfPCell(new Phrase(""
							+ df.format(gstTot/2), subheader));
					cells34.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells34.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells34);
					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					PdfPCell cells331 = new PdfPCell(new Phrase("SGST Amt   =",
							subheader));
					cells331.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells331.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells331);

					PdfPCell cells341 = new PdfPCell(new Phrase(""
							+ df.format(gstTot/2), subheader));
					cells341.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells341.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells341);

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					PdfPCell surchargepdf01 = new PdfPCell(new Phrase("",
							subheader));
					surchargepdf01.setHorizontalAlignment(Element.ALIGN_RIGHT);
					surchargepdf01.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(surchargepdf01);

					PdfPCell surchargepdf11 = new PdfPCell(new Phrase("",
							subheader));
					surchargepdf11.setHorizontalAlignment(Element.ALIGN_RIGHT);
					surchargepdf11.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(surchargepdf11);

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					PdfPCell cells36 = new PdfPCell(new Phrase("Net Amount  =",
							subheader));
					cells36.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells36.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells36);

					long word = Math.round(netTot - Double.parseDouble(less));

					PdfPCell cells35 = new PdfPCell(new Phrase(
							df.format(netTot - Double.parseDouble(less)),
							subheader));
					cells35.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells35.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells35);

					document.add(HeaderTable7);
					HeaderTable7.flushContent();

					
						PdfPTable HeaderTable12 = new PdfPTable(1);
						int[] headerwidth12 = { 40 };
						HeaderTable12.setWidths(headerwidth12);
						HeaderTable12.setWidthPercentage(95f);
						HeaderTable12.getDefaultCell().setBorder(
								Rectangle.BOTTOM);
								
					HeaderTable12.addCell(new Phrase("", tabletext));
					HeaderTable12.addCell(new Phrase(
							"Amount in "+currencyName+" Ro/Off  :  "
									+ "("
									+ word
									+ ".00)   "
									+ EnglishNumberToWords.convert(word)
											.toUpperCase() + " "+currencyName+" ONLY. ",
							subheader));

						document.add(HeaderTable12);
						HeaderTable12.flushContent();
						
						if (tmpFlag == 0) {

						PdfPTable HeaderTable5 = new PdfPTable(2);
						int[] headerwidth5 = { 25, 75 };
						HeaderTable5.setWidths(headerwidth5);
						HeaderTable5.setWidthPercentage(95f);
						HeaderTable5.getDefaultCell().setBorder(
								Rectangle.NO_BORDER);
						HeaderTable5.addCell(new Phrase("", subheader));
						HeaderTable5.addCell(new Phrase("", subheader));

						if (drugLicenseNo != "") {
							HeaderTable5.addCell(new Phrase(
									"DRUG LICENSE NO -  ", tabletext));
							HeaderTable5.addCell(new Phrase("" + "20-528466 / 21-528467",
									tabletext));
						} else {
							HeaderTable5.addCell(new Phrase(
									"DRUG LICENSE NO -", tabletext));
							HeaderTable5.addCell(new Phrase("", tabletext));
						}

						if (foodLicenseNo != "") {
							HeaderTable5.addCell(new Phrase(
									"FOOD LICENSE NO -  ", tabletext));
							HeaderTable5.addCell(new Phrase("" + foodLicenseNo,
									tabletext));
						} else {
							HeaderTable5.addCell(new Phrase(
									"FOOD LICENSE NO -  ", tabletext));
							HeaderTable5.addCell(new Phrase("", tabletext));
						}

						if (GStNo != "") {
							HeaderTable5
									.addCell(new Phrase(
											"GST No -                     ",
											tabletext));
							HeaderTable5.addCell(new Phrase("" + GStNo,
									tabletext));
						} else {
							HeaderTable5
									.addCell(new Phrase(
											"GST No -                     ",
											tabletext));
							HeaderTable5.addCell(new Phrase("", tabletext));
						}

						document.add(HeaderTable5);
						HeaderTable5.flushContent();

						HeaderTable5.getDefaultCell().setBorder(
								Rectangle.BOTTOM);

						HeaderTable5.addCell(new Phrase("", subheader));
						HeaderTable5.addCell(new Phrase("", subheader));

						document.add(HeaderTable5);
						HeaderTable5.flushContent();
					}

					PdfPTable HeaderTable10 = new PdfPTable(3);
					int[] headerwidth10 = { 65, 10, 25 };
					HeaderTable10.setWidths(headerwidth10);
					HeaderTable10.setWidthPercentage(95f);
					HeaderTable10.setHorizontalAlignment(Element.ALIGN_CENTER);

					HeaderTable10.getDefaultCell().setBorder(
							Rectangle.NO_BORDER);

					HeaderTable10
							.addCell(new Phrase(
									"Note :- No return of Medicine without original Invoice",
									subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10
							.addCell(new Phrase(
									"        .",
									tabletext));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

				/* 	HeaderTable10.addCell(new Phrase(
							"Time :- 8:30AM to 5:00PM", tabletext)); */
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

					HeaderTable10.addCell(new Phrase("..",
							subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					PdfPCell cell110 = new PdfPCell(new Phrase(
							"Sign of Pharmacist", subheader));
					cell110.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell110.setBorder(Rectangle.NO_BORDER);
					HeaderTable10.addCell(cell110);

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					PdfPCell cell11 = new PdfPCell(new Phrase(user_name,
							tabletext));
					cell11.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell11.setBorder(Rectangle.NO_BORDER);
					HeaderTable10.addCell(cell11);

					document.add(HeaderTable10);
					HeaderTable10.flushContent();
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