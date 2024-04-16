<%@page import="com.lowagie.text.pdf.PdfCell"%>
<%-- <%@page import="com.hms.admin.util.FetchHospitalDetails"%> --%>
<%@page import="java.util.Calendar"%>
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
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@ page import="com.hms.ehat.dto.CurrencyTypeDto"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="java.util.ResourceBundle"%>

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
<title>Purchase Order </title>
</head>
<body>




	    <c:forEach items="${poData}" var="row" varStatus="count">

		<c:set var="billId" value="${row.poProductCount }" />

		<c:set var="billNumber" value="${row.podocId }" />

		<c:set var="saleDate" value="${row.poRemark }" />

		<c:set var="patientName" value="${row.vendorMaster.vendorName }" />

		<c:set var="patientMobile"
			value="${row.vendoradd.vendorMobileNumber }" />

		<c:set var="totalVat" value="${row.poTotalVat}" />

		<c:set var="totalAmtount" value="${row.poNetTotal}" />
		
		<c:set var="vendorAddress" value="${row.vendoradd.vendorAddress }" />
		
		<c:set var="city" value="${row.vendoradd.city }" />
		<c:set var="district" value="${row.vendoradd.district }" />
		<c:set var="state" value="${row.vendoradd.state }" />
		<c:set var="pincode" value="${row.vendoradd.pincode }" />
		
		<c:set var="gstNo" value="${row.vendoradd.gstNo }" />
		
		<%
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

													ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
													String print = (String) resourceBundleEhat.getString("pharmacyPrint");
													String MedicalName = hospObj.getMedicalName();//resourceBundleEhat.getString("hospitalName");
													String MedicalAddress = hospObj.getMedicalAddress();//resourceBundleEhat.getString("address");
													String MedicalZipcode = hospObj.getMedicalZipCode();
													String MedicalDrugLicenseNo = hospObj.getDruglicense(); //(String) resourceBundleEhat.getString("drugLicenseNo");
													String MedicalDrugLicenseNo1 = hospObj.getDrugLicense1(); //(String) resourceBundleEhat.getString("drugLicenseNo1");
													String MedicalPhoneNo = hospObj.getMedicalContact();//resourceBundleEhat.getString("PhoneNo");
													String MedicalEmail = hospObj.getMedicalEmail(); // resourceBundleEhat.getString("email");
													String GSTIN = hospObj.getMedicalGstNo();

													ServletOutputStream outStream = response.getOutputStream();
													response.reset();
													DecimalFormat df = new DecimalFormat("0.00");
													Document document = new Document(PageSize._11X17);
													document.setMargins(30, 30, 30, 0);

													/*  Rectangle two = new Rectangle(700,400);
														
														Document document = new Document();
														document.setPageSize(two);
														document.setMargins(15, 15, 15, 0); */

													response.setHeader("Content-Disposition",
															"inline; filename = Purchase Order");

													PdfWriter.getInstance(document, outStream);
													document.open();
													//font

													session = request.getSession();
													String user_name = (String) session.getAttribute("userName");

													java.util.Calendar currentDate = Calendar.getInstance();
													SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy");
													String curr_date = dateformatter.format(currentDate.getTime());

													Font header = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
													Font subheader = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
													Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
													header.setColor(10, 4, 2);

													Font tableheader = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
													Font tabletext = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
													Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
													Font subheader1 = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);

													Font txt = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
													//String path = hospObj.getFilePath();
													String hospitalName = hospObj.getHospitalName();
													hospitalName = hospitalName.toUpperCase();
													String address = hospObj.getHospitalAddress();
													String city = hospObj.getHospitalCity();
													String country = hospObj.getHospitalCountry();
													String contact = hospObj.getHospitalContact();
													//		String path1 = application.getRealPath(path);

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

													String billNumber = "";
													if (pageContext.getAttribute("billNumber").toString() == null) {
														billNumber = "";
													} else {

														billNumber = billNumber
																+ (String) pageContext.getAttribute("billNumber").toString();
													}

													String billId = "";
													if (pageContext.getAttribute("billId") == null) {
														billId = "";
													} else {

														billId = billId
																+ (String) pageContext.getAttribute("billId").toString();
													}

													String totalAmt = "";
													if (pageContext.getAttribute("totalAmtount") == null) {
														totalAmt = "";
													} else {

														totalAmt = totalAmt
																+ (String) pageContext.getAttribute("totalAmtount").toString();
													}

													String saleDate1 = "";
													String splitSaleDate[];
													String saleDate = "";

													if (pageContext.getAttribute("saleDate").toString() == null) {
														saleDate1 = "";
														saleDate = "";
													} else {
														saleDate1 = saleDate1
																+ (String) pageContext.getAttribute("saleDate").toString();
														splitSaleDate = saleDate1.split(" ");
														saleDate = splitSaleDate[0];
													}

													String patientName = "";
													if (pageContext.getAttribute("patientName").toString() == null) {
														patientName = "";
													} else {
														patientName = patientName
																+ (String) pageContext.getAttribute("patientName").toString();
													}

													String patientMobile = "";
													if (pageContext.getAttribute("patientMobile") == null) {
														patientMobile = "";
													} else {
														patientMobile = patientMobile
																+ (String) pageContext.getAttribute("patientMobile").toString();
													}

													String vendorAddress = "";
													if (pageContext.getAttribute("vendorAddress") == null) {
														vendorAddress = "";
													} else {
														vendorAddress = vendorAddress
																+ (String) pageContext.getAttribute("vendorAddress").toString();
													}

													String vendorcity = "";
													if (pageContext.getAttribute("city") == null) {
														vendorcity = "";
													} else {
														vendorcity = vendorcity
																+ (String) pageContext.getAttribute("city").toString();
													}

													String vendordistrict = "";
													if (pageContext.getAttribute("district") == null) {
														vendordistrict = "";
													} else {
														vendordistrict = vendordistrict
																+ (String) pageContext.getAttribute("district").toString();
													}

													String vendorstate = "";
													if (pageContext.getAttribute("state") == null) {
														vendorstate = "";
													} else {
														vendorstate = vendorstate
																+ (String) pageContext.getAttribute("state").toString();
													}

													String vendorpincode = "";
													if (pageContext.getAttribute("pincode") == null) {
														vendorpincode = "";
													} else {
														vendorpincode = vendorpincode
																+ (String) pageContext.getAttribute("pincode").toString();
													}

													String vendorgstNo = "";
													if (pageContext.getAttribute("gstNo") == null) {
														vendorgstNo = "";
													} else {
														vendorgstNo = vendorgstNo
																+ (String) pageContext.getAttribute("gstNo").toString();
													}

													//Added Heading By Bilal  
													PdfPTable HeaderTable001 = new PdfPTable(2);
													int[] headerwidth001 = { 35, 50 };
													HeaderTable001.setWidths(headerwidth001);
													HeaderTable001.setWidthPercentage(95f);
													HeaderTable001.setHorizontalAlignment(Element.ALIGN_CENTER);
													HeaderTable001.getDefaultCell().setBorder(Rectangle.NO_BORDER);

													HeaderTable001.addCell(new Phrase("", subheader));

													HeaderTable001.addCell(new Phrase("PURCHASE ORDER", header));

													HeaderTable001.addCell(new Phrase("", subheader));
													HeaderTable001.addCell(new Phrase("", subheader));

													document.add(HeaderTable001);
													HeaderTable001.flushContent();

													//Added the box For PO BY Bilal
													PdfPTable HeaderTable01 = new PdfPTable(4);
													int[] headerwidth01 = { 15, 35, 15, 35 };
													HeaderTable01.setWidths(headerwidth01);

													HeaderTable01.setWidthPercentage(95f);

													HeaderTable01.getDefaultCell().setBorder(Rectangle.NO_BORDER);
													HeaderTable01.getDefaultCell().setBorder(

															Rectangle.NO_BORDER);
													PdfPCell cell01;
													cell01 = new PdfPCell(new Phrase("Supplier Details", txt));
													cell01.setRowspan(7);
													cell01.setColspan(2);

													HeaderTable01.addCell(cell01);

													cell01 = new PdfPCell(new Phrase("From", txt));
													cell01.setRowspan(7);
													cell01.setColspan(2);

													HeaderTable01.addCell(cell01);

													HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
													HeaderTable01.addCell(new Phrase("PO NO ", subheader));
													HeaderTable01.getDefaultCell().setBorder(Rectangle.NO_BORDER);
													HeaderTable01.addCell(new Phrase(":  " + billId, tabletext));

													HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
													HeaderTable01.addCell(new Phrase("NAME ", subheader));
													HeaderTable01.getDefaultCell().setBorder(Rectangle.RIGHT);
													HeaderTable01.addCell(new Phrase(":  " + MedicalName, tabletext));//hospitalName

													HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
													HeaderTable01.addCell(new Phrase("PO DATE", subheader));
													HeaderTable01.getDefaultCell().setBorder(Rectangle.NO_BORDER);
													HeaderTable01.addCell(new Phrase(":  " + saleDate, tabletext));

													HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
													HeaderTable01.addCell(new Phrase("ADDRESS ", subheader));
													HeaderTable01.getDefaultCell().setBorder(Rectangle.RIGHT);
													HeaderTable01.addCell(new Phrase(":  " + MedicalAddress, tabletext));// address + "\n  "+ city + "," + hospitalZip

													HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
													HeaderTable01.addCell(new Phrase("SUPPLIER NAME", subheader));
													HeaderTable01.getDefaultCell().setBorder(Rectangle.NO_BORDER);
													HeaderTable01.addCell(new Phrase(":  " + patientName, tabletext));

													HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
													HeaderTable01.addCell(new Phrase("GST NO", subheader));
													HeaderTable01.getDefaultCell().setBorder(Rectangle.RIGHT);
													HeaderTable01.addCell(new Phrase(":  " + GSTIN, tabletext));//GStNo

													HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
													HeaderTable01.addCell(new Phrase("ADDRESS", subheader));
													HeaderTable01.getDefaultCell().setBorder(Rectangle.NO_BORDER);
													HeaderTable01.addCell(new Phrase(
															":  " + vendorAddress + "\n" + vendorcity + ",  " + vendordistrict
																	+ ", " + vendorstate + ", " + vendorpincode,
															tabletext));

													HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
													HeaderTable01.addCell(new Phrase("PLACE OF DELIVERY", subheader));
													HeaderTable01.getDefaultCell().setBorder(Rectangle.RIGHT);
													HeaderTable01.addCell(new Phrase(":  ", tabletext));

													HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
													HeaderTable01.addCell(new Phrase("GST NO", subheader));
													HeaderTable01.getDefaultCell().setBorder(Rectangle.NO_BORDER);
													HeaderTable01.addCell(new Phrase(":  " + vendorgstNo, tabletext));

													HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
													HeaderTable01.addCell(new Phrase("", subheader));
													HeaderTable01.getDefaultCell().setBorder(Rectangle.RIGHT);
													HeaderTable01.addCell(new Phrase("", tabletext));

													HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
													HeaderTable01.addCell(new Phrase("FROM DEPT", subheader));
													HeaderTable01.getDefaultCell().setBorder(Rectangle.NO_BORDER);//
													HeaderTable01.addCell(new Phrase(":  ", tabletext));//vendorMobile

													HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
													HeaderTable01.addCell(new Phrase("FROM DEPT", subheader));
													HeaderTable01.getDefaultCell().setBorder(Rectangle.RIGHT);
													HeaderTable01.addCell(new Phrase(":  ", tabletext));

													HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
													HeaderTable01.addCell(new Phrase("Ref. Quot/Letter No ", subheader));
													HeaderTable01.getDefaultCell().setBorder(Rectangle.NO_BORDER);
													HeaderTable01.addCell(new Phrase(":  ", tabletext));

													HeaderTable01.getDefaultCell().setBorder(Rectangle.LEFT);
													HeaderTable01.addCell(new Phrase("", subheader));
													HeaderTable01.getDefaultCell().setBorder(Rectangle.RIGHT);
													HeaderTable01.addCell(new Phrase("", tabletext));

													HeaderTable01.getDefaultCell().setBorder(Rectangle.BOTTOM);

													document.add(HeaderTable01);
													HeaderTable01.flushContent();
													//close second Table 
													PdfPTable patientDemoDetailName2 = new PdfPTable(4);
													int[] patientDemoDetailNameWidth2 = { 16, 36, 16, 36 };
													patientDemoDetailName2.setWidths(patientDemoDetailNameWidth2);
													patientDemoDetailName2.setWidthPercentage(95f);
													patientDemoDetailName2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

													document.add(patientDemoDetailName2);
													patientDemoDetailName2.flushContent();

													document.add(patientDemoDetailName2);
													patientDemoDetailName2.flushContent();

													PdfPTable HeaderTable41 = new PdfPTable(2);
													int[] headerwidth41 = { 75, 30 };
													HeaderTable41.setWidths(headerwidth41);
													HeaderTable41.setWidthPercentage(95f);

													PdfPCell cell001 = new PdfPCell(new Paragraph("", subheader));
													cell001.setBorder(Rectangle.LEFT | Rectangle.TOP);
													PdfPCell cell081 = new PdfPCell(
															new Paragraph(" Dept.P.O.No :" + "   1134", subheader));
													cell081.setBorder(Rectangle.RIGHT | Rectangle.TOP);
													HeaderTable41.addCell(cell001);
													HeaderTable41.addCell(cell081);

													PdfPCell cell123 = new PdfPCell(new Paragraph("Dear sir,", tabletext));
													cell123.setBorder(Rectangle.LEFT);
													PdfPCell cell81 = new PdfPCell(new Paragraph("", subheader));
													cell81.setBorder(Rectangle.RIGHT);
													HeaderTable41.addCell(cell123);
													HeaderTable41.addCell(cell81);
													document.add(HeaderTable41);
													HeaderTable41.flushContent();

													PdfPTable HeaderTable21 = new PdfPTable(1);
													int[] headerwidth = { 80 };
													HeaderTable21.setWidths(headerwidth);
													HeaderTable21.setWidthPercentage(95f);
													HeaderTable21.getDefaultCell()
															.setBorder(Rectangle.LEFT | Rectangle.RIGHT | Rectangle.NO_BORDER);
													HeaderTable21.addCell(new Paragraph(
															"With Reference To Your quotation No and Subsiquent discussions/Correspondance With Us,  The Undesigned is pleased to place the work order for purcahse of the items as per the scheduele given below",
															tabletext));
													HeaderTable21.addCell(new Paragraph(" ", tabletext));
													document.add(HeaderTable21);
													HeaderTable21.flushContent();
				%>

		<%
					
					
					document.add(patientDemoDetailName2);
					patientDemoDetailName2.flushContent();
					
					
					   PdfPTable HeaderTableMain = new PdfPTable(16);
						int[] headerwidth6 = { 15, 25, 10,  10, 10, 15, 15,
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
						
						
					PdfPTable HeaderTable666 = new PdfPTable(9);
					int[] headerwidth666 = {15,1,1,1,1,1,1,1,1 };
					
										
		%>

		<c:set var="total" value="${row.poTotalAmt}" />



		<c:forEach items="${row.ltPOslave}" var="vendor" varStatus="count">

			<c:set var="qty" value="${vendor.poSlaveQty }" />

			<c:set var="mrp" value="${vendor.poSlaveMrp }" />

			<c:set var="rate" value="${vendor.poSlaveRate }" />

			<c:set var="amt" value="${vendor.poSlaveAmt }" />

			<c:set var="counter" value="${(count.index)+1}" />

			<c:set var="productName" value="${vendor.productMaster.productName}" />

			<c:set var="hsn" value="${vendor.hsn}" />

			<c:set var="poSlaveVat" value="${vendor.poSlaveVat}" />

			<c:set var="poIgst" value="${vendor.poIgst}" />

			<c:set var="poCess" value="${vendor.poCess}" />
			
			<c:set var="productUnit" value="${vendor.productMaster.productUnit}" />
			
			<c:set var="poSlaveScheme" value="${vendor.poSlaveScheme}" />

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
							
							String productUnit = "0";
							if (pageContext.getAttribute("productUnit") != null) {
								productUnit=pageContext.getAttribute("productUnit").toString();
							}
							
							String mrp = "";
							if (pageContext.getAttribute("mrp") == null) {
								mrp = "";
							} else {
								mrp = mrp
									+ (String) pageContext.getAttribute("mrp")
											.toString();

							}
								String rate = "";
								if (pageContext.getAttribute("rate") == null) {
									rate = "";
								} else {
									rate = rate
									+ (String) pageContext.getAttribute("rate")
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
							String total = ""
									+ (String) pageContext.getAttribute("total")
											.toString();

							String totalVat = ""
									+ (String) pageContext.getAttribute("totalVat")
											.toString();
							
								
						
							
							
							String productName = ""
									+ (String) pageContext.getAttribute("productName")
											.toString();
							
							  String hsnCode = ""
									+ (String) pageContext.getAttribute("hsn")
									.toString(); 
							  

							  String poSlaveVat = ""
									+ (String) pageContext.getAttribute("poSlaveVat")
									.toString(); 
							 
							  
							  String poIgst = "";
							  if (pageContext.getAttribute("poIgst") == null) {
								  poIgst = "0.0";
								}else{
									poIgst=poIgst + (String) pageContext.getAttribute("poIgst")
										.toString(); 
								}
							  String poCess = ""
										+ (String) pageContext.getAttribute("poCess")
										.toString(); 
							
							  String poSlaveSchem="";
							
							  if (pageContext.getAttribute("poSlaveScheme") == null) {
								  poSlaveSchem = "0.0";
								}else{
									poSlaveSchem=poSlaveSchem + (String) pageContext.getAttribute("poSlaveScheme")
										.toString(); 
								}
			
							DecimalFormat df2 = new DecimalFormat("0.00");
							DecimalFormat df3 = new DecimalFormat("0.0");
							DecimalFormat df4 = new DecimalFormat("0");
							
							HeaderTableMain.addCell(new Phrase(hsnCode, tabletext));

							HeaderTableMain.addCell(new Phrase(productName,
									tabletext));

							PdfPCell cell13 = new PdfPCell(new Phrase(
									productUnit, tabletext));
							cell13.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(cell13);

						

							PdfPCell cell222 = new PdfPCell(new Phrase(qty,
									tabletext));
							cell222.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(cell222);

							PdfPCell cell14 = new PdfPCell(new Phrase(
									poSlaveSchem, tabletext));
							cell14.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(cell14);

							//Purchase Rate
							Double rate2 = Double.parseDouble(rate);
							PdfPCell prcell = new PdfPCell(new Phrase(
									""+rate2,
									tabletext));
							prcell.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(prcell);
							
							//MRP
							PdfPCell cell4 = new PdfPCell(
									new Phrase(
											""+mrp,
											tabletext));
							cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(cell4);

							//amount
							Double amt2 = Double.parseDouble(amt);
							PdfPCell cell5 = new PdfPCell(new Phrase(
									""+amt2, tabletext));
							cell5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(cell5);
							
							//GST
							Double gst = Double.parseDouble(poSlaveVat)/2;

							PdfPCell gst1 = new PdfPCell(new Phrase(
									""+gst,
									tabletext));
							gst1.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(gst1);

							PdfPCell gst11 = new PdfPCell(new Phrase(
									(df.format((amt2*gst)/100))+"",
									tabletext));
							gst11.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(gst11);

							PdfPCell gst2 = new PdfPCell(new Phrase(
									""+gst,
									tabletext));
							gst2.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(gst2);

							PdfPCell gst21 = new PdfPCell(new Phrase(
									(df.format((amt2*gst)/100))+"",
									tabletext));
							gst21.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(gst21);

							//IGST
							Double igst = Double.parseDouble(poIgst);
							PdfPCell gst3 = new PdfPCell(new Phrase(
									""+igst,
									tabletext));
							gst3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(gst3);

							PdfPCell gst31 = new PdfPCell(new Phrase(
									(df.format((amt2*igst)/100))+"",
									tabletext));
							gst31.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(gst31);

							//cess
							Double cess = Double.parseDouble(poCess);
							PdfPCell gst4 = new PdfPCell(new Phrase(
									""+cess,
									tabletext));
							gst4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(gst4);

							PdfPCell gst41 = new PdfPCell(new Phrase(
									(df.format((amt2*cess)/100))+"",
									tabletext));
							gst41.setHorizontalAlignment(Element.ALIGN_RIGHT);
							HeaderTableMain.addCell(gst41);

							
			%>
		</c:forEach>

		<%
		
					Double total =  (Double) pageContext.getAttribute("total");
					Double totalVat =  (Double) pageContext.getAttribute("totalVat");
					 

					
					PdfPCell t = new PdfPCell(new Phrase("", subheader));
					t.setHorizontalAlignment(Element.ALIGN_CENTER);
					t.setColspan(10);
					t.setBorder(Rectangle.NO_BORDER);
					HeaderTableMain.addCell(t);

					PdfPCell g = new PdfPCell(
							new Phrase("TOTAL GST AMOUNT", subheader));
					g.setHorizontalAlignment(Element.ALIGN_CENTER);
					g.setColspan(4);
					HeaderTableMain.addCell(g);

					PdfPCell grossCell = new PdfPCell(
							new Phrase(
									""+(df.format(totalVat)),
									tabletext));
					grossCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					grossCell.setColspan(4);
					HeaderTableMain.addCell(grossCell);

					HeaderTableMain.addCell(t);

					PdfPCell d = new PdfPCell(new Phrase("SUB TOTAL", subheader));
					d.setHorizontalAlignment(Element.ALIGN_CENTER);
					d.setColspan(4);
					HeaderTableMain.addCell(d);

					PdfPCell lessCell = new PdfPCell(new Phrase(
							""+(df.format(Math.round(total))), tabletext));
					lessCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					lessCell.setColspan(4);
					HeaderTableMain.addCell(lessCell);

					HeaderTableMain.addCell(t);

					double grandTotal=Double.parseDouble(df.format(Math.round(total))) + Double.parseDouble(df.format(totalVat));
					
					PdfPCell ga = new PdfPCell(new Phrase("GRAND TOTAL", subheader));
					ga.setHorizontalAlignment(Element.ALIGN_CENTER);
					ga.setColspan(4);
					HeaderTableMain.addCell(ga);

					PdfPCell purvatCell = new PdfPCell(new Phrase(
							""+grandTotal, tabletext));
					purvatCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					purvatCell.setColspan(4);
					HeaderTableMain.addCell(purvatCell);

					

					HeaderTableMain.setSpacingAfter(20f);
					
					document.add(HeaderTableMain);
					HeaderTableMain.flushContent();
					

					/* patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));

					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));

					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));

					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader)); */
					
					
					

					

					document.add(patientDemoDetailName2);
					patientDemoDetailName2.flushContent();

		%>
		<%
					PdfPTable HeaderTable5 = new PdfPTable(4);
					int[] headerwidth5 = { 30, 20, 40,20 };
					
					
					HeaderTable5.setWidths(headerwidth5);
					HeaderTable5.setWidthPercentage(95f);
					

					HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							HeaderTable5.addCell(new Phrase("Terms           :", subheader));
							HeaderTable5.addCell(new Phrase("", subheader));
							HeaderTable5.addCell(new Phrase("", subheader));
							HeaderTable5.addCell(new Phrase("", subheader));
							
							HeaderTable5.addCell(new Phrase("                DELIVERY :", tabletext));
							HeaderTable5.addCell(new Phrase("", subheader));
							HeaderTable5.addCell(new Phrase("", subheader));
							HeaderTable5.addCell(new Phrase("", subheader));
							
							HeaderTable5.addCell(new Phrase("                PAYMENT :", tabletext));
							HeaderTable5.addCell(new Phrase("", subheader));
							HeaderTable5.addCell(new Phrase("", subheader));
							HeaderTable5.addCell(new Phrase("", subheader));
							
							/* HeaderTable5.addCell(new Phrase("", subheader));
							HeaderTable5.addCell(new Phrase("", subheader));
							HeaderTable5.addCell(new Phrase("", subheader));
							HeaderTable5.addCell(new Phrase("", subheader));
							
							HeaderTable5.addCell(new Phrase("", subheader));
							HeaderTable5.addCell(new Phrase("", subheader));
							HeaderTable5.addCell(new Phrase("", subheader));
							HeaderTable5.addCell(new Phrase("", subheader));
							 */
							
							
							
							
							
							
					HeaderTable5.addCell(new Phrase("", subheader));
					HeaderTable5.addCell(new Phrase("", subheader));
					
					PdfPCell sampleCell21 = new PdfPCell(new Phrase("Authorized By", subheader));
					sampleCell21.setHorizontalAlignment(Element.ALIGN_CENTER);
					sampleCell21.setBorder(Rectangle.NO_BORDER); 
					HeaderTable5.addCell(sampleCell21);
					
					PdfPCell sampleCell22 = new PdfPCell(new Phrase("Sign Of Pharmacist", subheader));
					sampleCell22.setHorizontalAlignment(Element.ALIGN_CENTER);
					sampleCell22.setBorder(Rectangle.NO_BORDER); 
					HeaderTable5.addCell(sampleCell22);
					
					HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(new Phrase("", subheader));
					HeaderTable5.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
					
					HeaderTable5.addCell(new Phrase("",tabletext));
					
					PdfPCell sampleCell = new PdfPCell(new Phrase("", tabletext));
					sampleCell.setHorizontalAlignment(Element.ALIGN_CENTER);
					sampleCell.setBorder(Rectangle.NO_BORDER); 
					HeaderTable5.addCell(sampleCell);
					
					PdfPCell sampleCell1 = new PdfPCell(new Phrase("", tabletext));
					sampleCell1.setHorizontalAlignment(Element.ALIGN_CENTER);
					sampleCell1.setBorder(Rectangle.NO_BORDER); 
					HeaderTable5.addCell(sampleCell1);
					
					document.add(HeaderTable5);
					HeaderTable5.flushContent();
		%>

	
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
	</c:forEach>
</body>
</html>