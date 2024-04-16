<%-- <%@page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@page import="org.apache.jasper.tagplugins.jstl.core.ForEach"%> --%>
<%@page import="org.apache.poi.util.IntegerField"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.itextpdf.text.html.WebColors"%>
<%@page import="com.hms.pharmacy.pojo.CounterSaleMaster"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.awt.Color"%>
<%-- <%@ page import="com.hms.dto.BillComponentSample"%>
<%@ page import="com.hms.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetailsForPharmacy"%> --%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.pharmacy.controller.CounterSaleController"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page import="com.hms.utility.ApplicationContextUtils"%>
<%@ page import="com.hms.pharmacy.dao.EhatEnterpriseUtil"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.List"%>
<%@page import="org.json.JSONObject"%>
<%@page import="org.json.JSONArray"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@ page import="com.hms.ehat.dto.CurrencyTypeDto"%>

<%@page import="com.hms.administrator.dto.HospitalDetailsDTO"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>

<%@page import="com.hms.pharmacy.upload.FilePath"%>
<%@page import="java.nio.file.Paths"%>

<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, 
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>GRN Bill</title>
</head>
<body>





	<c:forEach items="${purchaseData}" var="row" varStatus="count">

		<c:set var="billId" value="${row.purId }" />
		
		<c:set var="unitCount" value="${row.unitCount }" />

		<c:set var="billNewNumber" value="${row.purBillNo }" />

		<c:set var="billNumber" value="${row.purDocId }" />

		<c:set var="saleDate" value="${row.purTransType }" />

		<c:set var="type" value="${row.purchaseStatus}" />

		<c:set var="vendorName" value="${row.vendorMaster.vendorName }" />

		<c:set var="vendorMobile"
			value="${row.vendorMaster.vendorMobileNumber }" />

		<c:set var="vendorAddress" value="${row.vendorAddress.vendorAddress }" />

		<c:set var="gstNo" value="${row.vendorAddress.gstNo }" />

		<c:set var="less" value="${row.purLess}" />

		<c:set var="grossAmt" value="${row.purGrossAmt}" />

		<c:set var="surcharge" value="${row.purAdd}" />

		<c:set var="purchaseVat" value="${row.purVat}" />

		<c:set var="poNum" value="${row.poId}" />
		<%
			/* //For on off flow Added By Bilal
				 		ResourceBundle resourceBundleEhat = ResourceBundle
						.getBundle("Ehat");
				String print = (String) resourceBundleEhat
						.getString("pharmacyPrint");
				String MedicalName =  resourceBundleEhat.getString("hospitalName");
				String MedicalAddress = resourceBundleEhat.getString("address");
				String GSTIN = resourceBundleEhat.getString("GSTIN"); */
				
			String purHsn = "";
				String purVat = "";
				String purIgst = "";
				String purCess = "";
				String amt = "";
				Double gst = 0.0;
				Double Igst = 0.0;
				Double Cess = 0.0;
				Double amts = 0.0;
				Double gstGrandTotal = 0.0;
				try {
					response.setContentType("application/pdf");
					CurrencyTypeService fetchOneCurrency=(ApplicationContextUtils.getApplicationContext()).getBean(CurrencyTypeService.class);
					List<CurrencyTypeDto> listServiceCurrencyDto=fetchOneCurrency.getOneCurrencyList();
					String currencyCode=listServiceCurrencyDto.get(0).getCurrencyCode();
					String currencyName=listServiceCurrencyDto.get(0).getCurrencyName();

					/* List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails
							.getHospDetails("0");
					HospitalDetails hospObj = arrHospitalDetails.get(0); */
					
					HttpSession session2 = request.getSession();
					int hospitalUnitId = (Integer) session2.getAttribute("uId");
					HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
					//List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
					List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
					HospitalDetails hospObj = arrHospitalDetails.get(0);
					
					//For on off flow Added By Bilal
			 		ResourceBundle resourceBundleEhat = ResourceBundle
					.getBundle("Ehat");
			String print = (String) resourceBundleEhat
					.getString("pharmacyPrint");
			String MedicalName =  hospObj.getMedicalName(); //resourceBundleEhat.getString("hospitalName");
			String MedicalAddress = hospObj.getMedicalAddress();//resourceBundleEhat.getString("address");
			String MedicalZipcode = hospObj.getMedicalZipCode();
			String GSTIN = hospObj.getMedicalGstNo();//resourceBundleEhat.getString("GSTIN");

					ServletOutputStream outStream = response.getOutputStream();
					response.reset();
					 Document document = new Document(PageSize._11X17);
					document.setMargins(10, 10, 7, 0);
					/* Rectangle two = new Rectangle(700,400);
					
					Document document = new Document();
					document.setPageSize(two);
					document.setMargins(15, 15, 15, 0); */
					
					response.setHeader("Content-Disposition", "inline; filename = Good Receipt Note");

					session = request.getSession();
					String user_name = (String) session
							.getAttribute("userName");

					DecimalFormat df2 = new DecimalFormat("0.00");
					DecimalFormat df3 = new DecimalFormat("0.0");
					DecimalFormat df4 = new DecimalFormat("0");

					ResourceBundle bundle = ResourceBundle
							.getBundle("EhatEnterpriseConfigurationFile");

					String goodsReceiptNote = bundle.getObject(
							"pharma_purchase_entry_name").toString();

					PdfWriter.getInstance(document, outStream);
					document.open();
					//font

					Font header = new Font(Font.FontFamily.HELVETICA, 12,
							Font.BOLD);
					Font subheader = new Font(Font.FontFamily.HELVETICA, 8,
							Font.BOLD);
					Font footer = new Font(Font.FontFamily.HELVETICA, 8,
							Font.BOLD);
					header.setColor(10, 4, 2);

					Font tableheader = new Font(Font.FontFamily.HELVETICA, 10,
							Font.BOLD);
					Font tabletext = new Font(Font.FontFamily.HELVETICA, 8,
							Font.NORMAL);
					Font small = new Font(Font.FontFamily.HELVETICA, 8,
							Font.NORMAL);
					Font subheader1 = new Font(Font.FontFamily.HELVETICA, 10,
							Font.BOLD);

					Font txt = new Font(Font.FontFamily.HELVETICA, 10,
							Font.BOLD);

					//String path = hospObj.getFilePath();
					String medicalName = MedicalName;
					medicalName = medicalName.toUpperCase();
					String address = MedicalAddress;
					String city = ".";
					String contact = ".";
					//String path1 = application.getRealPath(path);

					String hospitalZip = ".";
					String PhoneNo = ".";
					String secPhoneNo = ".";
				/* 	String webste = hospObj.getWebsite();
					String email = hospObj.getHospitalEmail();
					String cinNo = hospObj.getTxtCinNo();
					String serviceTaxNo = hospObj.getTxtSerTaxNo(); */
					String panNo = ".";
					String hPhoneNo = ".";

					//String GStNo = hospObj.getTxtGstNo();

					String arrayValue = "";
					String billNumber = "";
					if (pageContext.getAttribute("billNumber") == null) {
						billNumber = "";
					} else {

						billNumber = billNumber
								+ (String) pageContext.getAttribute(
										"billNumber").toString();
					}

					String billNewNumber = "";
					if (pageContext.getAttribute("billNewNumber") == null) {
						billNewNumber = "";
					} else {

						billNewNumber = billNewNumber
								+ (String) pageContext.getAttribute(
										"billNewNumber").toString();
					}

					
					String unitCount = "";
					if (pageContext.getAttribute("unitCount") == null) {
						unitCount = "";
					} else {

						unitCount = unitCount
								+ (String) pageContext.getAttribute(
										"unitCount").toString();
					}

					
					String poNum = "";
					if (pageContext.getAttribute("poNum") == null) {
						billNewNumber = "";
					} else {

						poNum = poNum
								+ (String) pageContext.getAttribute("poNum")
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

					String saleDate1 = "";
					String splitSaleDate[];
					String saleDate = "";

					if (pageContext.getAttribute("saleDate") == null) {
						saleDate1 = "";
						saleDate = "";
					} else {
						saleDate1 = saleDate1
								+ (String) pageContext.getAttribute("saleDate")
										.toString();
						splitSaleDate = saleDate1.split(" ");
						saleDate = splitSaleDate[0];
					}

					String type = "";
					if (pageContext.getAttribute("type") == null) {
						type = "";
					} else {
						type = type
								+ (String) pageContext.getAttribute("type")
										.toString();
					}

					String vendorName = "";
					if (pageContext.getAttribute("vendorName") == null) {
						vendorName = "";
					} else {
						vendorName = vendorName
								+ (String) pageContext.getAttribute(
										"vendorName").toString();
					}

					String vendorMobile = "";
					if (pageContext.getAttribute("vendorMobile") == null) {
						vendorMobile = "";
					} else {
						vendorMobile = vendorMobile
								+ (String) pageContext.getAttribute(
										"vendorMobile").toString();
					}

					String vendorAddress = "";
					if (pageContext.getAttribute("vendorAddress") == null) {
						vendorAddress = "";
					} else {
						vendorAddress = vendorAddress
								+ (String) pageContext.getAttribute(
										"vendorAddress").toString();
					}

					String gstNo = "";
					if (pageContext.getAttribute("gstNo") == null) {
						gstNo = "";
					} else {
						gstNo = gstNo
								+ (String) pageContext.getAttribute("gstNo")
										.toString();
					}

					String less = "";
					if (pageContext.getAttribute("less") == null) {
						less = "";
					} else {
						less = less
								+ (String) pageContext.getAttribute("less")
										.toString();

						Float less1 = Float.parseFloat(less);
						DecimalFormat df = new DecimalFormat("###.##");
						less = df.format(less1);

					}

					String purchaseVat = "";
					if (pageContext.getAttribute("purchaseVat") == null) {
						purchaseVat = "";
					} else {
						purchaseVat = purchaseVat
								+ (String) pageContext.getAttribute(
										"purchaseVat").toString();

						Float purchaseVat1 = Float.parseFloat(purchaseVat);
						DecimalFormat df = new DecimalFormat("###.##");
						purchaseVat = df.format(purchaseVat1);

					}

					String grossAmt = "";
					if (pageContext.getAttribute("grossAmt") == null) {
						grossAmt = "";
					} else {
						grossAmt = grossAmt
								+ (String) pageContext.getAttribute("grossAmt")
										.toString();

						Float grossAmt1 = Float.parseFloat(grossAmt);
						DecimalFormat df = new DecimalFormat("###.##");
						grossAmt = df.format(grossAmt1);

					}

					String surcharge = "";
					if (pageContext.getAttribute("surcharge") == null) {
						surcharge = "";
					} else {
						surcharge = surcharge
								+ (String) pageContext
										.getAttribute("surcharge").toString();

						Float surcharge1 = Float.parseFloat(surcharge);
						DecimalFormat df = new DecimalFormat("###.##");

						surcharge = df.format(surcharge1);
					}

					if (Double.parseDouble(poNum) != 0) {

						EhatEnterpriseUtil ehatEnterpriseUtil = (ApplicationContextUtils
								.getApplicationContext())
								.getBean(EhatEnterpriseUtil.class);

						arrayValue = ehatEnterpriseUtil
								.getPoDateFromPoId(poNum);
					}
					Image img = null;
					PdfPCell cell = null;
					try {

					//	img = Image.getInstance(path1);
						img.scaleAbsolute(100, 60);
						cell = new PdfPCell();
						cell.addElement(new Chunk(img, 5, -5));
						cell.setBorder(Rectangle.NO_BORDER);
					} catch (Exception e) {
						e.printStackTrace();
					}

					//Added Heading By Bilal 
					PdfPTable HeaderTable001 = new PdfPTable(2);
					int[] headerwidth001 = { 35, 50 };
					HeaderTable001.setWidths(headerwidth001);
					HeaderTable001.setWidthPercentage(95f);
					HeaderTable001.setHorizontalAlignment(Element.ALIGN_CENTER);
					HeaderTable001.getDefaultCell().setBorder(
							Rectangle.NO_BORDER);

					HeaderTable001.addCell(new Phrase("", subheader));

					HeaderTable001.addCell(new Phrase("GOODS RECEIPT NOTE",
							header));

					HeaderTable001.addCell(new Phrase("", subheader));
					HeaderTable001.addCell(new Phrase("", subheader));

					document.add(HeaderTable001);
					HeaderTable001.flushContent();
					//Added Heading[Closed First Heading]

					//Added the box For GRN BY Bilal
					PdfPTable HeaderTable01 = new PdfPTable(6);
					int[] headerwidth01 = { 15, 15, 15, 15, 15, 25 };
					HeaderTable01.setWidths(headerwidth01);

					HeaderTable01.setWidthPercentage(95f);

					HeaderTable01.getDefaultCell().setBorder(Rectangle.BOTTOM);

					PdfPCell cell01;
					cell01 = new PdfPCell(new Phrase("Supplier Details", txt));
					cell01.setRowspan(9);
					cell01.setColspan(4);
					//cell01.setBorder(Rectangle.BOX); 
					HeaderTable01.addCell(cell01);
					 if (print.contains("off")) {
						cell01 = new PdfPCell(new Phrase("", txt));
					} else {
						cell01 = new PdfPCell(new Phrase("From", txt));
					} 
					cell01.setRowspan(9);
					cell01.setColspan(2);
					//cell01.setBorder(Rectangle.BOX);
					HeaderTable01.addCell(cell01);

					HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
					HeaderTable01.addCell(new Phrase("GRN No ", subheader));
					HeaderTable01.getDefaultCell().setBorder(
							Rectangle.NO_BORDER);
					HeaderTable01.addCell(new Phrase(": " + unitCount, tabletext));
					HeaderTable01.addCell(new Phrase("P.O No ", subheader));
					HeaderTable01.addCell(new Phrase(": " + poNum, tabletext));

					HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
					HeaderTable01.addCell(new Phrase("Name ", subheader));
					HeaderTable01.getDefaultCell().setBorder(Rectangle.RIGHT);
					/* HeaderTable01.addCell(new Phrase(": " + "JAWAHAR MEDICOS",tabletext)); *///hospitalName 
					HeaderTable01.addCell(new Phrase(": " + MedicalName,tabletext));
					
					HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
					HeaderTable01.addCell(new Phrase("GRN Date ", subheader));
					HeaderTable01.getDefaultCell().setBorder(
							Rectangle.NO_BORDER);
					HeaderTable01
							.addCell(new Phrase(": " + saleDate, tabletext));
					int a = Integer.parseInt(poNum);
					if (a > 0) {
						HeaderTable01
								.addCell(new Phrase("P.O Date ", subheader));
						HeaderTable01.addCell(new Phrase(": " + saleDate,
								tabletext));
					} else {
						HeaderTable01
								.addCell(new Phrase("P.O Date ", subheader));
						HeaderTable01.addCell(new Phrase(": ", tabletext));
					}
					HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
					HeaderTable01.addCell(new Phrase("Address ", subheader));
					HeaderTable01.getDefaultCell().setBorder(Rectangle.RIGHT);
					/* HeaderTable01.addCell(new Phrase(": "+".L.N.C.H. Building,Idgah Hills, Bhopal Ph.: 2666374, 2665720", tabletext)) */;//+ address + "\n" + city + ", " + hospitalZip
					//HeaderTable01.addCell(new Phrase(": "+ address + "\n" + city + ", " + hospitalZip +" \n. " + hPhoneNo, tabletext));
					HeaderTable01.addCell(new Phrase(": "+ MedicalAddress , tabletext));
					
					HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
					HeaderTable01.addCell(new Phrase("Vendor Bill No ",
							subheader));
					HeaderTable01.getDefaultCell().setBorder(
							Rectangle.NO_BORDER);
					HeaderTable01.addCell(new Phrase(": " + billNewNumber,
							tabletext));
					HeaderTable01.addCell(new Phrase("Paymode ", subheader));
					HeaderTable01.addCell(new Phrase(": " + type, tabletext));

					HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
					HeaderTable01.addCell(new Phrase("Gst No ", subheader));
					HeaderTable01.getDefaultCell().setBorder(Rectangle.RIGHT);
					HeaderTable01.addCell(new Phrase(": " +GSTIN, tabletext));//GStNo

					HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
					HeaderTable01.addCell(new Phrase("Vendor Bill Date ",
							subheader));
					HeaderTable01.getDefaultCell().setBorder(
							Rectangle.NO_BORDER);
					HeaderTable01
							.addCell(new Phrase(": " + saleDate, tabletext));
					if (print.contains("off")) {
						HeaderTable01
						.addCell(new Phrase("", subheader));
				        HeaderTable01.addCell(new Phrase("", tabletext));
					}else{
						HeaderTable01
						.addCell(new Phrase("Credit Days ", subheader));
				        HeaderTable01.addCell(new Phrase(": 0", tabletext));
					}
					
					HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
					HeaderTable01.addCell(new Phrase("Place Of Delivery ",
							subheader));
					HeaderTable01.getDefaultCell().setBorder(Rectangle.RIGHT);
					HeaderTable01.addCell(new Phrase(": ", tabletext));

					HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
					HeaderTable01.addCell(new Phrase("Supplier Name ",
							subheader));
					HeaderTable01.getDefaultCell().setBorder(
							Rectangle.NO_BORDER);
					HeaderTable01.addCell(new Phrase(": " + vendorName,
							tabletext));
					HeaderTable01.addCell(new Phrase("", subheader));
					HeaderTable01.addCell(new Phrase("", tabletext));
					HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
					HeaderTable01.addCell(new Phrase("", subheader));
					HeaderTable01.getDefaultCell().setBorder(Rectangle.RIGHT);
					HeaderTable01.addCell(new Phrase("", tabletext));

					HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
					HeaderTable01.addCell(new Phrase("Supplier Address ",
							subheader));
					HeaderTable01.getDefaultCell().setBorder(
							Rectangle.NO_BORDER);//
					HeaderTable01.addCell(new Phrase(": " + vendorAddress,
							tabletext));//vendorMobile
					HeaderTable01.addCell(new Phrase("", subheader));
					HeaderTable01.addCell(new Phrase("", tabletext));
					HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
					HeaderTable01.addCell(new Phrase("", subheader));
					HeaderTable01.getDefaultCell().setBorder(Rectangle.RIGHT);
					HeaderTable01.addCell(new Phrase("", tabletext));

					HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
					HeaderTable01.addCell(new Phrase("Supplier GST No ",
							subheader));
					HeaderTable01.getDefaultCell().setBorder(
							Rectangle.NO_BORDER);
					HeaderTable01.addCell(new Phrase(": " + gstNo, tabletext));
					HeaderTable01.addCell(new Phrase("", subheader));
					HeaderTable01.addCell(new Phrase("", tabletext));
					HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
					HeaderTable01.addCell(new Phrase("", subheader));
					HeaderTable01.getDefaultCell().setBorder(Rectangle.RIGHT);
					HeaderTable01.addCell(new Phrase("", tabletext));

					HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
					if (print.contains("off")) {
						HeaderTable01.addCell(new Phrase("", subheader));
						HeaderTable01.getDefaultCell().setBorder(
								Rectangle.NO_BORDER);
						HeaderTable01.addCell(new Phrase("", tabletext));
					}else{
						HeaderTable01.addCell(new Phrase("From Dept ", subheader));
						HeaderTable01.getDefaultCell().setBorder(
								Rectangle.NO_BORDER);
						HeaderTable01.addCell(new Phrase(": ", tabletext));
					}
					HeaderTable01.addCell(new Phrase("", subheader));
					HeaderTable01.addCell(new Phrase("", tabletext));
					HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
					
					if (print.contains("off")) {
						HeaderTable01.addCell(new Phrase("", subheader));
						HeaderTable01.getDefaultCell().setBorder(Rectangle.RIGHT);
						HeaderTable01.addCell(new Phrase("", tabletext));
					}else{
						HeaderTable01.addCell(new Phrase("For Dept", subheader));
						HeaderTable01.getDefaultCell().setBorder(Rectangle.RIGHT);
						HeaderTable01.addCell(new Phrase(": ", tabletext));
					}
					

					HeaderTable01.setSpacingAfter(1f);

					document.add(HeaderTable01);
					HeaderTable01.flushContent();
					//close second Table
		%>

		<%
			       PdfPTable HeaderTableMain = new PdfPTable(18);
					int[] headerwidth6 = { 15, 25, 10, 15, 10, 10, 10, 15, 15,
							15, 10, 10, 10, 10, 10, 10, 10, 10 };
					HeaderTableMain.setWidths(headerwidth6);
					HeaderTableMain.setWidthPercentage(95f);

					PdfPCell HSN = new PdfPCell(new Phrase("HSN", subheader));
					HSN.setHorizontalAlignment(Element.ALIGN_CENTER);
					HSN.setRowspan(2);
					HeaderTableMain.addCell(HSN);

					PdfPCell item = new PdfPCell(new Phrase("Item Name",
							subheader));
					item.setHorizontalAlignment(Element.ALIGN_CENTER);
					item.setRowspan(2);
					HeaderTableMain.addCell(item);

					PdfPCell unit = new PdfPCell(new Phrase("Unit", subheader));
					unit.setHorizontalAlignment(Element.ALIGN_CENTER);
					unit.setRowspan(2);
					HeaderTableMain.addCell(unit);

					PdfPCell batchNumberCell = new PdfPCell(new Phrase(
							"Batch Number", subheader));
					batchNumberCell
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					batchNumberCell.setRowspan(2);
					HeaderTableMain.addCell(batchNumberCell);

					PdfPCell cells = new PdfPCell(new Phrase("Expiry",
							subheader));
					cells.setHorizontalAlignment(Element.ALIGN_CENTER);
					cells.setRowspan(2);
					HeaderTableMain.addCell(cells);

					PdfPCell qtyCell = new PdfPCell(
							new Phrase("Qty", subheader));
					qtyCell.setHorizontalAlignment(Element.ALIGN_CENTER);
					qtyCell.setRowspan(2);
					HeaderTableMain.addCell(qtyCell);

					PdfPCell free = new PdfPCell(new Phrase("Free", subheader));
					free.setHorizontalAlignment(Element.ALIGN_CENTER);
					free.setRowspan(2);
					HeaderTableMain.addCell(free);

					PdfPCell purRatecell = new PdfPCell(new Phrase(
							"Purchase Rate", subheader));
					purRatecell.setHorizontalAlignment(Element.ALIGN_CENTER);
					purRatecell.setRowspan(2);
					HeaderTableMain.addCell(purRatecell);

					PdfPCell cells1 = new PdfPCell(new Phrase("MRP", subheader));
					cells1.setHorizontalAlignment(Element.ALIGN_CENTER);
					cells1.setRowspan(2);
					HeaderTableMain.addCell(cells1);

					PdfPCell cells2 = new PdfPCell(new Phrase("Amount",
							subheader));
					cells2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cells2.setRowspan(2);
					HeaderTableMain.addCell(cells2);

					PdfPCell cellsCGST = new PdfPCell(new Phrase("CGST",
							subheader));
					cellsCGST.setHorizontalAlignment(Element.ALIGN_CENTER);
					cellsCGST.setColspan(2);
					HeaderTableMain.addCell(cellsCGST);

					PdfPCell cellsSGST = new PdfPCell(new Phrase("SGST",
							subheader));
					cellsSGST.setHorizontalAlignment(Element.ALIGN_CENTER);
					cellsSGST.setColspan(2);
					HeaderTableMain.addCell(cellsSGST);

					PdfPCell cellsIGST = new PdfPCell(new Phrase("IGST",
							subheader));
					cellsIGST.setHorizontalAlignment(Element.ALIGN_CENTER);
					cellsIGST.setColspan(2);
					HeaderTableMain.addCell(cellsIGST);

					PdfPCell cellsCESS = new PdfPCell(new Phrase("CESS",
							subheader));
					cellsCESS.setHorizontalAlignment(Element.ALIGN_CENTER);
					cellsCESS.setColspan(2);
					HeaderTableMain.addCell(cellsCESS);

					PdfPCell cgstRate = new PdfPCell(new Phrase("Rate%",
							subheader));
					cgstRate.setHorizontalAlignment(Element.ALIGN_CENTER);
					HeaderTableMain.addCell(cgstRate);

					PdfPCell cgstRs = new PdfPCell(new Phrase(""+currencyName+".", subheader));
					cgstRs.setHorizontalAlignment(Element.ALIGN_CENTER);
					HeaderTableMain.addCell(cgstRs);

					PdfPCell sgstRate = new PdfPCell(new Phrase("Rate%",
							subheader));
					sgstRate.setHorizontalAlignment(Element.ALIGN_CENTER);
					HeaderTableMain.addCell(sgstRate);

					PdfPCell sgstRs = new PdfPCell(new Phrase(""+currencyName+".", subheader));
					sgstRs.setHorizontalAlignment(Element.ALIGN_CENTER);
					HeaderTableMain.addCell(sgstRs);

					PdfPCell igstRate = new PdfPCell(new Phrase("Rate%",
							subheader));
					igstRate.setHorizontalAlignment(Element.ALIGN_CENTER);
					HeaderTableMain.addCell(igstRate);

					PdfPCell igstRs = new PdfPCell(new Phrase(""+currencyName+".", subheader));
					igstRs.setHorizontalAlignment(Element.ALIGN_CENTER);
					HeaderTableMain.addCell(igstRs);

					PdfPCell cessRate = new PdfPCell(new Phrase("Rate%",
							subheader));
					cessRate.setHorizontalAlignment(Element.ALIGN_CENTER);
					HeaderTableMain.addCell(cessRate);

					PdfPCell cessRs = new PdfPCell(new Phrase(""+currencyName+".", subheader));
					cessRs.setHorizontalAlignment(Element.ALIGN_CENTER);
					HeaderTableMain.addCell(cessRs);
		%>
		<c:set var="total" value="${row.purNetAmt }" />

		<c:forEach items="${row.ltPurSlave}" var="vendor" varStatus="count">

			<c:set var="qty" value="${vendor.purSlaveQty }" />

			<c:set var="mrp" value="${vendor.purSlaveMrp }" />

			<c:set var="packing"
				value="${vendor.productMaster.packingMaster.packType }" />

			<c:set var="unit" value="${vendor.productMaster.productUnit }" />

			<c:set var="schema" value="${vendor.purSlaveScheme }" />

			<c:set var="rate" value="${vendor.purslaverate }" />

			<c:set var="amt" value="${vendor.purSlaveAmt }" />

			<c:set var="batchCode" value="${vendor.batchMaster.batchCode }" />

			<c:set var="expiry" value="${vendor.batchMaster.batchExpDate }" />

			<c:set var="counter" value="${(count.index)+1}" />

			<c:set var="productName" value="${vendor.productMaster.productName}" />

			<c:set var="slavevat" value="${vendor.purVat}" />

			<c:set var="slavepurchaseRate" value="${vendor.purSlaveBillRate}" />

			<c:set var="purHsn" value="${vendor.purHsn}" />

			<c:set var="purVat" value="${vendor.purVat}" />

			<c:set var="purIgst" value="${vendor.purIgst}" />

			<c:set var="purCess" value="${vendor.purCess}" />

			<c:set var="disc" value="${vendor.purDisc }" />
			
			<c:set var="purRate" value="${vendor.purSlavePurchaseRate }" />


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

							String slavevat = "";
							if (pageContext.getAttribute("slavevat") == null) {
								slavevat = "";
							} else {
								slavevat = slavevat
										+ (String) pageContext.getAttribute(
												"slavevat").toString();
							}
							
							double purRate = 0.0;
							if (pageContext.getAttribute("purRate") != null) {
								purRate=Double.parseDouble(pageContext.getAttribute("purRate").toString());
							}

							String slavepurchaseRate = "";
							if (pageContext.getAttribute("slavepurchaseRate") == null) {
								slavepurchaseRate = "";
							} else {
								slavepurchaseRate = slavepurchaseRate
										+ (String) pageContext.getAttribute(
												"slavepurchaseRate").toString();

								Float slavepurchaseRate1 = Float
										.parseFloat(slavepurchaseRate);
								DecimalFormat df = new DecimalFormat("###.##");
								slavepurchaseRate = df.format(slavepurchaseRate1);

							}

							String rate = "";
							if (pageContext.getAttribute("rate") == null) {
								rate = "";
							} else {
								rate = rate
										+ (String) pageContext.getAttribute("rate")
												.toString();
							}

							amt = "";
							if (pageContext.getAttribute("amt") == null) {
								amt = "";
							} else {
								amt = amt
										+ (String) pageContext.getAttribute("amt")
												.toString();
							}

							String total = "";
							if (pageContext.getAttribute("total") == null) {
								total = "";
							} else {
								total = total
										+ (String) pageContext
												.getAttribute("total").toString();
							}

							String batchCode = "";
							if (pageContext.getAttribute("batchCode") == null) {
								batchCode = "";
							} else {
								batchCode = batchCode
										+ (String) pageContext.getAttribute(
												"batchCode").toString();
							}

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

							String packingg = "";
							if (pageContext.getAttribute("packing") == null) {
								packingg = "";
							} else {
								packingg = packingg
										+ (String) pageContext.getAttribute(
												"packing").toString();
							}

							Double unitt = 0.0d;
							if (pageContext.getAttribute("unit") == null) {
								unitt = 0.0;
							} else {
								unitt = unitt
										+ (Double) pageContext.getAttribute("unit");
							}

							Double scheme = 0.0d;
							if (pageContext.getAttribute("schema") == null) {
								scheme = 0.0;
							} else {
								scheme = scheme
										+ (Double) pageContext
												.getAttribute("schema");
							}

							purHsn = ""
									+ (String) pageContext.getAttribute("purHsn")
											.toString();
							purVat = ""
									+ (String) pageContext.getAttribute("purVat")
											.toString();
							purIgst = ""
									+ (String) pageContext.getAttribute("purIgst")
											.toString();
							purCess = ""
									+ (String) pageContext.getAttribute("purCess")
											.toString();

							double disc = Double.parseDouble(pageContext
									.getAttribute("disc") + "");

							//add value to table

							HeaderTableMain.addCell(new Phrase(purHsn, tabletext));

							HeaderTableMain.addCell(new Phrase(productName,
									tabletext));

							PdfPCell cell13 = new PdfPCell(new Phrase(
									df3.format(unitt), tabletext));
							cell13.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(cell13);

							PdfPCell batchCodeCells = new PdfPCell(new Phrase(
									batchCode, tabletext));
							batchCodeCells
									.setHorizontalAlignment(Element.ALIGN_CENTER);
							HeaderTableMain.addCell(batchCodeCells);

							PdfPCell cell3 = new PdfPCell(new Phrase(expiry,
									tabletext));
							cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(cell3);

							PdfPCell cell222 = new PdfPCell(new Phrase(qty,
									tabletext));
							cell222.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(cell222);

							PdfPCell cell14 = new PdfPCell(new Phrase(
									df4.format(scheme), tabletext));
							cell14.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(cell14);

							PdfPCell prcell = new PdfPCell(new Phrase(
									df2.format(Double
											.parseDouble(slavepurchaseRate)),
									tabletext));
							prcell.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(prcell);

							PdfPCell cell4 = new PdfPCell(
									new Phrase(
											df2.format(Double.parseDouble(rate)),
											tabletext));
							cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(cell4);

							PdfPCell cell5 = new PdfPCell(new Phrase(
									df2.format(Double.parseDouble(amt)), tabletext));
							cell5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(cell5);

							amt = Double.parseDouble(amt)
									- (Double.parseDouble(amt) * disc / 100) + "";

							PdfPCell gst1 = new PdfPCell(new Phrase(
									df2.format(Double.parseDouble(purVat) / 2),
									tabletext));
							gst1.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(gst1);

							PdfPCell gst11 = new PdfPCell(new Phrase(
									df2.format(Double.parseDouble(purVat)
											* Double.parseDouble(amt) / 200),
									tabletext));
							gst11.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(gst11);

							PdfPCell gst2 = new PdfPCell(new Phrase(
									df2.format(Double.parseDouble(purVat) / 2),
									tabletext));
							gst2.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(gst2);

							PdfPCell gst21 = new PdfPCell(new Phrase(
									df2.format(Double.parseDouble(purVat)
											* Double.parseDouble(amt) / 200),
									tabletext));
							gst21.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(gst21);

							PdfPCell gst3 = new PdfPCell(new Phrase(
									df2.format(Double.parseDouble(purIgst)),
									tabletext));
							gst3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(gst3);

							PdfPCell gst31 = new PdfPCell(new Phrase(
									df2.format(Double.parseDouble(purIgst)
											* Double.parseDouble(amt) / 100),
									tabletext));
							gst31.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(gst31);

							PdfPCell gst4 = new PdfPCell(new Phrase(
									df2.format(Double.parseDouble(purCess)),
									tabletext));
							gst4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(gst4);

							PdfPCell gst41 = new PdfPCell(new Phrase(
									df2.format(Double.parseDouble(purCess)
											* Double.parseDouble(amt) / 100),
									tabletext));
							gst41.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(gst41);

							gstGrandTotal = gstGrandTotal
									+ ((Double.parseDouble(purVat)
											+ Double.parseDouble(purIgst) + Double
												.parseDouble(purCess))
											* Double.parseDouble(amt) / 100);
			%>
		</c:forEach>

		<%
			String total = ""
							+ (String) pageContext.getAttribute("total")
									.toString();

					String roundNet = "";
					roundNet = df2.format(Double.parseDouble(total));
					long word = (long) Double.parseDouble(roundNet);

					PdfPCell t = new PdfPCell(new Phrase("", subheader));
					t.setHorizontalAlignment(Element.ALIGN_CENTER);
					t.setColspan(10);
					t.setBorder(Rectangle.NO_BORDER);
					HeaderTableMain.addCell(t);

					PdfPCell g = new PdfPCell(
							new Phrase("Gross Amt", subheader));
					g.setHorizontalAlignment(Element.ALIGN_CENTER);
					g.setColspan(4);
					HeaderTableMain.addCell(g);

					PdfPCell grossCell = new PdfPCell(
							new Phrase(
									df2.format(Double.parseDouble(grossAmt)),
									subheader));
					grossCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					grossCell.setColspan(4);
					HeaderTableMain.addCell(grossCell);

					HeaderTableMain.addCell(t);

					PdfPCell d = new PdfPCell(new Phrase("Discount", subheader));
					d.setHorizontalAlignment(Element.ALIGN_CENTER);
					d.setColspan(4);
					HeaderTableMain.addCell(d);

					PdfPCell lessCell = new PdfPCell(new Phrase(
							df2.format(Double.parseDouble(less)), subheader));
					lessCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					lessCell.setColspan(4);
					HeaderTableMain.addCell(lessCell);

					HeaderTableMain.addCell(t);

					PdfPCell ga = new PdfPCell(new Phrase("GST Amt", subheader));
					ga.setHorizontalAlignment(Element.ALIGN_CENTER);
					ga.setColspan(4);
					HeaderTableMain.addCell(ga);

					PdfPCell purvatCell = new PdfPCell(new Phrase(
							df2.format(Double.parseDouble(total)-Double.parseDouble(grossAmt)+Double.parseDouble(less)), subheader));
					purvatCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					purvatCell.setColspan(4);
					HeaderTableMain.addCell(purvatCell);

					HeaderTableMain.addCell(t);
					PdfPCell tot = new PdfPCell(new Phrase("Total", subheader));
					tot.setHorizontalAlignment(Element.ALIGN_CENTER);
					tot.setColspan(4);
					HeaderTableMain.addCell(tot);

					PdfPCell totalCell = new PdfPCell(new Phrase(
							df2.format(Double.parseDouble(total)), subheader));
					totalCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					totalCell.setColspan(4);
					HeaderTableMain.addCell(totalCell);

					HeaderTableMain.setSpacingAfter(20f);

					document.add(HeaderTableMain);
					HeaderTableMain.flushContent();
		%>
		<%
		HeaderTableMain.flushContent();
			PdfPTable HeaderTable12 = new PdfPTable(3);
					int[] headerwidth12 = { 10, 16, 40 };
					HeaderTable12.setWidths(headerwidth12);
					HeaderTable12.setWidthPercentage(95f);
					HeaderTable12.getDefaultCell().setBorder(Rectangle.BOTTOM);

					int[] headerwidth13 = { 70, 10, 10 };
					HeaderTable12.setWidths(headerwidth13);

					HeaderTable12.addCell(new Phrase("", tabletext));
					HeaderTable12.addCell(new Phrase("", tabletext));
					HeaderTable12.addCell(new Phrase("", tabletext));
					document.add(HeaderTable12);
					HeaderTable12.flushContent();

					HeaderTable12.addCell(new Phrase(
							"Amount in "+currencyName+" Ro/Off  :  "
									+ " "
									+ word
									+ ".00   "
									+ EnglishNumberToWords.convert(word)
											.toUpperCase() + " "+currencyName+" ONLY. ",
							subheader));
					HeaderTable12.addCell(new Phrase("", tabletext));

					HeaderTable12.addCell(new Phrase("", tabletext));

					document.add(HeaderTable12);
					HeaderTable12.flushContent();

					PdfPTable HeaderTable5 = new PdfPTable(4);

					int[] headerwidth = { 20, 20, 50, 30 };
					HeaderTable5.setWidths(headerwidth);
					HeaderTable5.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.setSpacingBefore(80f);
					
					PdfPCell sampleCell21 = new PdfPCell(new Phrase(
							"Printed By:", subheader));
					sampleCell21.setHorizontalAlignment(Element.ALIGN_LEFT);
					sampleCell21.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(sampleCell21);
					
					PdfPCell p = new PdfPCell(new Phrase(
							"" + user_name, tabletext));
					p.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(p);
					
					PdfPCell sampleCell22 = new PdfPCell(new Phrase(
							"Sub Store Keeper", subheader));
					sampleCell22.setHorizontalAlignment(Element.ALIGN_CENTER);
					sampleCell22.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(sampleCell22);

					PdfPCell sampleCell23 = new PdfPCell(new Phrase(
							"Store Manager", subheader));
					sampleCell23.setHorizontalAlignment(Element.ALIGN_CENTER);
					sampleCell23.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(sampleCell23);

					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.addCell(new Phrase("",subheader));
					
					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.addCell(new Phrase("",subheader));
					
					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.addCell(new Phrase("",subheader));
					
					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.addCell(new Phrase("",subheader));
					HeaderTable5.addCell(new Phrase("",subheader));
					
					
					PdfPCell sampleCell211 = new PdfPCell(new Phrase(
							"Printed On:", subheader));
					sampleCell211.setHorizontalAlignment(Element.ALIGN_LEFT);
					sampleCell211.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(sampleCell211);
					
									  SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
				        SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm a");
				       	Date now = new Date(new java.util.Date().getTime());
				       	String strDate = sdf.format(now);
				       	
				       	Date dd = new Date();
				       	
					PdfPCell p1 = new PdfPCell(new Phrase(
							""+strDate, tabletext));
					p1.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(p1);
					
					PdfPCell sampleCell222 = new PdfPCell(new Phrase(
							""+dd.getHours()+":"+dd.getMinutes()+":"+dd.getSeconds(), tabletext));
					sampleCell222.setHorizontalAlignment(Element.ALIGN_CENTER);
					sampleCell222.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(sampleCell222);

					PdfPCell sampleCell223 = new PdfPCell(new Phrase(
							"Page 1 of 1", tabletext));
					sampleCell223.setHorizontalAlignment(Element.ALIGN_CENTER);
					sampleCell223.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(sampleCell223);

					document.add(HeaderTable5);
					HeaderTable5.flushContent();
					
					document.close();
					outStream.flush();
					outStream.close();
					
					return;

				} catch (Exception e) {
					System.err.println(e.getMessage());
					e.printStackTrace();
				}
		%>

	</c:forEach>

</body>
</html>