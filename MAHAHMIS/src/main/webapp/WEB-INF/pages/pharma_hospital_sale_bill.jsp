<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.pharmacy.pojo.CounterSaleMaster"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.pharmacy.controller.CounterSaleController"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Counter Bill</title>
</head>
<body>
	<%
		try {
			response.setContentType("application/pdf");

			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);

			ServletOutputStream outStream = response.getOutputStream();
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			document.setMargins(20, 20, 20, 0);

			PdfWriter.getInstance(document, outStream);
			document.open();
			//font

			Font header = new Font(Font.FontFamily.TIMES_ROMAN, 11, Font.BOLD);
			Font subheader = new Font(Font.FontFamily.TIMES_ROMAN, 10,
					Font.BOLD);
			Font footer = new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.BOLD);
			header.setColor(10, 4, 2);

			Font tableheader = new Font(Font.FontFamily.TIMES_ROMAN, 12,
					Font.BOLD);
			Font tabletext = new Font(Font.FontFamily.TIMES_ROMAN, 9,
					Font.NORMAL);
			Font small = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.NORMAL);


			String path = hospObj.getFilePath();
			String hospitalName = hospObj.getHospitalName();
			hospitalName = hospitalName.toUpperCase();
			String address = hospObj.getHospitalAddress();
			String city = hospObj.getHospitalCity();
			String country = hospObj.getHospitalCountry();
			String contact = hospObj.getHospitalContact();
			String path1 = application.getRealPath(path);

			Image img = null;
			PdfPCell cell = null;
			try {

				img = Image.getInstance(path1);
				img.scaleAbsolute(150, 60);
				cell = new PdfPCell();
				cell.addElement(new Chunk(img, 5, -5));
				cell.setBorder(Rectangle.NO_BORDER);
			} catch (Exception e) {
				e.printStackTrace();
			}

			/* document.newPage(); */

			PdfPTable HeaderTable1 = new PdfPTable(1);
			int[] headerwidth1 = {100};
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable2 = new PdfPTable(5);
			int[] headerwidth2 = { 15,66,30,2,2};
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

						
			
			PdfPCell hospitalNameCell = new PdfPCell(new Phrase(
					hospitalName + "\n"+ country +"\n" +address+"\n TEL No:-"+contact, header));
			hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(hospitalNameCell);
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));	
			
			
			PdfPCell startCell2 = new PdfPCell(new Phrase("Tax Invoice",
					header));
			 startCell2.setHorizontalAlignment(Element.ALIGN_CENTER); 
			startCell2.setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(startCell2);

			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();

			PdfPTable patientDemoDetailName2 = new PdfPTable(4);
			int[] patientDemoDetailNameWidth2 = { 16, 36, 16, 36 };
			patientDemoDetailName2.setWidths(patientDemoDetailNameWidth2);
			patientDemoDetailName2.setWidthPercentage(95f);
			patientDemoDetailName2.getDefaultCell().setBorder(
					Rectangle.NO_BORDER);

			patientDemoDetailName2.addCell(new Phrase("", subheader));
			patientDemoDetailName2.addCell(new Phrase("", subheader));
			patientDemoDetailName2.addCell(new Phrase("", subheader));
			patientDemoDetailName2.addCell(new Phrase("", subheader));

			patientDemoDetailName2.addCell(new Phrase("", subheader));
			patientDemoDetailName2.addCell(new Phrase("", subheader));
			patientDemoDetailName2.addCell(new Phrase("", subheader));
			patientDemoDetailName2.addCell(new Phrase("", subheader));

			document.add(patientDemoDetailName2);
			patientDemoDetailName2.flushContent();
	%>


<c:set var="patientAddress" value="${hospitalSalePatientAddress}" /> 
	
	<c:set var="patientId" value="${hospitalSalePatientId}" />
	
	<c:set var="patientMobileNumber" value="${hospitalSalePatientNumber}" /> 
	
	<c:set var="patientSponserName" value="${hospitalSaleSponserName}" /> 
	
	<c:set var="patientDoctorName" value="${hospitalSaleDoctorName}" /> 
	
		<c:set var="patientFullName" value="${hospitalSalePatientName}" /> 

	<c:forEach items="${hospitalSaleData}" var="row" varStatus="count">

        <c:set var="billId" value="${row.hospitalBillId }" />

		<c:set var="billNumber" value="${row.hospitalBillDocNo }" />

		<c:set var="saleDate" value="${row.hospitalBillWard }" />

		<c:set var="patientName" value="${row.patientName }" />

		<c:set var="patientMobile" value="${row.patientMobile }" />

		<c:set var="doctor" value="${row.doctorName }" />

		<c:set var="less" value="${row.hospitalBillLess}" />

		<c:set var="grossAmt" value="${row.hospitalBillGrossAmt}" />

		<c:set var="surcharge" value="${row.hospitalBillSurcharges}" />
		<%
			String billNumber = "";
					if (pageContext.getAttribute("billNumber") == null) {
						billNumber = "";
					} else {
						billNumber = billNumber
								+ (String) pageContext.getAttribute(
										"billNumber").toString();
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

					String patientName = "";
					if (pageContext.getAttribute("patientName") == null) {
						patientName = "";
					} else {
						patientName = patientName
								+ (String) pageContext.getAttribute(
										"patientName").toString();
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
						;
					}

					String billId = "";
					if (pageContext.getAttribute("billId") == null) {
						billId = "";
					} else {

						billId = billId
								+ (String) pageContext.getAttribute(
										"billId").toString();
					}
					
					
					String less = "";
					if (pageContext.getAttribute("less") == null) {
						less = "";
					} else {
						less = less
								+ (String) pageContext.getAttribute("less")
										.toString();
					}

					String grossAmt = "";
					if (pageContext.getAttribute("grossAmt") == null) {
						grossAmt = "";
					} else {
						grossAmt = grossAmt
								+ (String) pageContext.getAttribute("grossAmt")
										.toString();
					}

					String surcharge = "";
					if (pageContext.getAttribute("surcharge") == null) {
						surcharge = "";
					} else {
						surcharge = surcharge
								+ (String) pageContext
										.getAttribute("surcharge").toString();
					}

					
					String patientAddress= "";
					if (pageContext.getAttribute("patientAddress") == null) {
						patientAddress = "";
					} else {

						patientAddress = patientAddress
								+ (String) pageContext.getAttribute(
										"patientAddress").toString();
					} 
					
					String patientMobileNumber= "";
					if (pageContext.getAttribute("patientMobileNumber") == null) {
						patientMobileNumber = "";
					} else {

						patientMobileNumber = patientMobileNumber
								+ (String) pageContext.getAttribute(
										"patientMobileNumber").toString();
					} 
					
					String patientSponserName= "";
					if (pageContext.getAttribute("patientSponserName") == null) {
						patientSponserName = "";
					} else {

						patientSponserName = patientSponserName
								+ (String) pageContext.getAttribute(
										"patientSponserName").toString();
					} 
					
					
					String patientDoctorName= "";
					if (pageContext.getAttribute("patientDoctorName") == null) {
						patientDoctorName = "";
					} else {

						patientDoctorName = patientDoctorName
								+ (String) pageContext.getAttribute(
										"patientDoctorName").toString();
					} 
					
					
					String patientFullName= "";
					if (pageContext.getAttribute("patientFullName") == null) {
						patientFullName = "";
					} else {

						patientFullName = patientFullName
								+ (String) pageContext.getAttribute(
										"patientFullName").toString();
					} 
					
					
					
					String patientId= "";
					if (pageContext.getAttribute("patientId") == null) {
						patientId = "";
					} else {

						patientId= patientId
								+ (String) pageContext.getAttribute(
										"patientId").toString();
					} 
					
					
					PdfPTable HeaderTable3 = new PdfPTable(6);
					int[] headerwidth3 = { 18, 30, 20, 20, 20, 20 };
					HeaderTable3.setWidths(headerwidth3);
					HeaderTable3.setWidthPercentage(95f);
					HeaderTable3.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					
					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
				/* 	HeaderTable2
							.addCell(new Phrase("Invoice No :-          HS"+billId, subheader)); */
					HeaderTable2
					.addCell(new Phrase("", subheader));
				/* 	PdfPCell subcell1 = new PdfPCell(new Phrase("                  Vou No:- "+billNumber,
							subheader)); */
					PdfPCell subcell1 = new PdfPCell(new Phrase("",
									subheader)); 
					subcell1.setHorizontalAlignment(Element.ALIGN_RIGHT);
					subcell1.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(subcell1);
					
					
					
					HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
					/* HeaderTable2
							.addCell((new Phrase("                      Date: "+saleDate, subheader))); */
						
							
						
				/* 	HeaderTable2
					.addCell(new Phrase("Vou No:- "+billNumber, subheader)); */
				 	HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell subcell = new PdfPCell(new Phrase("",subheader));		
					subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
					subcell.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(subcell);
					
				    	HeaderTable2.addCell(new Phrase("", subheader));
							HeaderTable2.addCell(new Phrase("", subheader));
							HeaderTable2.addCell(new Phrase("", subheader));	
					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					PdfPTable HeaderTable4 = new PdfPTable(4);
					int[] headerwidth4 = { 30, 80,30, 20 };
					HeaderTable4.setWidths(headerwidth4);
					HeaderTable4.setWidthPercentage(95f);
					HeaderTable4.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
									
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					

					HeaderTable4
							.addCell(new Phrase("Patient id:", subheader));
					HeaderTable4.addCell(new Phrase(patientId, tabletext));
					
					 	PdfPCell cell00 = new PdfPCell(new Phrase("Invoice No :",subheader));
						cell00.setHorizontalAlignment(Element.ALIGN_CENTER);
						cell00.setBorder(Rectangle.NO_BORDER);
						HeaderTable4.addCell(cell00);
						HeaderTable4.addCell(new Phrase("HS"+billId, tabletext));
						document.add(HeaderTable4);
						HeaderTable4.flushContent();
					
					
									
					
		 		
					HeaderTable4
					.addCell(new Phrase("Patient Name:", subheader));
			HeaderTable4.addCell(new Phrase(patientFullName, tabletext));
			HeaderTable4
			.addCell(new Phrase("         Date:", subheader));
			HeaderTable4.addCell(new Phrase(saleDate, tabletext));
			document.add(HeaderTable4);
			HeaderTable4.flushContent(); 
						
					HeaderTable4
					.addCell(new Phrase("Address:", subheader));
			HeaderTable4.addCell(new Phrase(patientAddress, tabletext));
		
		/* 	PdfPCell cell001 = new PdfPCell(new Phrase("  Sponsor Name:",
					subheader));
			cell001.setHorizontalAlignment(Element.ALIGN_CENTER);
			cell001.setBorder(Rectangle.NO_BORDER);
			HeaderTable4.addCell(cell001); */
			
			HeaderTable4
			.addCell(new Phrase("        Sponsor Name:", subheader));
			HeaderTable4.addCell(new Phrase(patientSponserName, tabletext));
			document.add(HeaderTable4);
			HeaderTable4.flushContent();
			
			
			HeaderTable4
			.addCell(new Phrase("Consultant Name:", subheader));
	HeaderTable4.addCell(new Phrase(doctor, tabletext));
		PdfPCell cell0011 = new PdfPCell(new Phrase("",
			subheader));
	cell0011.setHorizontalAlignment(Element.ALIGN_CENTER);
	cell0011.setBorder(Rectangle.NO_BORDER);
	HeaderTable4.addCell(cell0011);
	HeaderTable4.addCell(new Phrase("", tabletext));
	document.add(HeaderTable4);
	HeaderTable4.flushContent();
					
			HeaderTable4
			.addCell(new Phrase("", subheader));
	HeaderTable4.addCell(new Phrase("", tabletext));
	PdfPCell cell011 = new PdfPCell(new Phrase("",
			subheader));
	cell011.setHorizontalAlignment(Element.ALIGN_CENTER);
	cell011.setBorder(Rectangle.NO_BORDER);
	HeaderTable4.addCell(cell011);

	HeaderTable4.addCell(new Phrase("", tabletext)); 

	PdfPCell cell0012 = new PdfPCell(new Phrase("",
			subheader));
	cell0012.setHorizontalAlignment(Element.ALIGN_CENTER);
	cell0012.setBorder(Rectangle.NO_BORDER);
	HeaderTable4.addCell(cell0012);

	
	HeaderTable4.addCell(new Phrase("", tabletext));

	PdfPCell cell112 = new PdfPCell(new Phrase("", subheader));
	cell112.setHorizontalAlignment(Element.ALIGN_CENTER);
	cell112.setBorder(Rectangle.NO_BORDER);
	HeaderTable4.addCell(cell112);
	
	HeaderTable4.addCell(new Phrase("", tabletext));

	document.add(HeaderTable4);
	HeaderTable4.flushContent();
			
			
			
					PdfPTable patientDemoDetailName3 = new PdfPTable(4);
					int[] patientDemoDetailNameWidth3 = { 16, 36, 16, 36 };
					patientDemoDetailName3
							.setWidths(patientDemoDetailNameWidth2);
					patientDemoDetailName3.setWidthPercentage(95f);
					patientDemoDetailName3.getDefaultCell().setBorder(
							Rectangle.NO_BORDER);

					patientDemoDetailName3.addCell(new Phrase("", subheader));
					patientDemoDetailName3.addCell(new Phrase("", subheader));
					patientDemoDetailName3.addCell(new Phrase("", subheader));
					patientDemoDetailName3.addCell(new Phrase("", subheader));

					patientDemoDetailName3.addCell(new Phrase("", subheader));
					patientDemoDetailName3.addCell(new Phrase("", subheader));
					patientDemoDetailName3.addCell(new Phrase("", subheader));
					patientDemoDetailName3.addCell(new Phrase("", subheader));

					document.add(patientDemoDetailName3);
					patientDemoDetailName3.flushContent();

					/* PdfPTable afterVentilation = new PdfPTable(7); */
		%>

		<%
			/* afterVentilation.addCell(new Phrase("Sr", subheader));
																											afterVentilation.addCell(new Phrase("Qty", subheader));
																											afterVentilation.addCell(new Phrase("MRP", subheader));
																											afterVentilation
																													.addCell(new Phrase("Batch Num", subheader));
																											afterVentilation.addCell(new Phrase("Expiry", subheader));
																											afterVentilation.addCell(new Phrase("Rate", subheader));
																											afterVentilation.addCell(new Phrase("Amt", subheader)); */

					PdfPTable HeaderTable6 = new PdfPTable(9);
					int[] headerwidth6 = { 10, 30,20, 15, 10, 15,15, 20, 20 };
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

					HeaderTable6.addCell(new Phrase("#", subheader));
					HeaderTable6.addCell(new Phrase("Product Name", subheader));
					
					PdfPCell batchNumberCell = new PdfPCell(new Phrase(
							"Batch Number", subheader));
					batchNumberCell
							.setHorizontalAlignment(Element.ALIGN_LEFT);
					batchNumberCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(batchNumberCell);

				
					PdfPCell cells = new PdfPCell(new Phrase("Expiry",
							subheader));
					cells.setHorizontalAlignment(Element.ALIGN_LEFT);
					cells.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells);
					
					
					PdfPCell vatcells = new PdfPCell(new Phrase("Vat%",
							subheader));
					vatcells.setHorizontalAlignment(Element.ALIGN_LEFT);
					vatcells.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(vatcells);

					
					HeaderTable6.addCell(new Phrase("Qty", subheader));
					/* HeaderTable6.addCell(new Phrase("", subheader)); */

					PdfPCell mrpCell = new PdfPCell(new Phrase("MRP (INR)",
							subheader));
					mrpCell.setHorizontalAlignment(Element.ALIGN_LEFT);
					mrpCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(mrpCell);

				
				
					PdfPCell cells1 = new PdfPCell(new Phrase("Rate (INR)",
							subheader));
					cells1.setHorizontalAlignment(Element.ALIGN_LEFT);
					cells1.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells1);

					/* HeaderTable6.addCell(new Phrase(" ",
							subheader)); */

					PdfPCell cells2 = new PdfPCell(new Phrase("Total Amt",
							subheader));
					cells2.setHorizontalAlignment(Element.ALIGN_LEFT);
					cells2.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells2);

					/* HeaderTable6.addCell(new Phrase("",
							subheader)); */

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
		%>
		<c:set var="total" value="${row.hospitalBillNetAmt }" />

		<c:forEach items="${row.hospitalSaleBillSlaves}" var="vendor"
			varStatus="count">

			<c:set var="qty" value="${vendor.hospitalSlaveQty }" />

			<c:set var="mrp" value="${vendor.hospitalSlaveMrp }" />

			<c:set var="rate" value="${vendor.hospitalSlaveRate }" />

			<c:set var="amt" value="${vendor.hospitalSlaveAmt }" />

			<c:set var="batchCode" value="${vendor.hospitalSlaveBatchCode }" />

			<c:set var="expiry" value="${vendor.hospitalSlaveBatchExpiry }" />

			<c:set var="counter" value="${(count.index)+1}" />

			<c:set var="productName" value="${vendor.productMaster.productName}" />
			
				<c:set var="vat" value="${vendor.hospitalSlaveVat}" />

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
														
							String vat= "";
							if (pageContext.getAttribute("vat") == null) {
								vat = "";
							} else {
								vat = vat
										+ (String) pageContext.getAttribute("vat")
												.toString();
							}

							/* String mrp = ""
									+ (String) pageContext.getAttribute("mrp")
											.toString(); */
							String rate = "";
							if (pageContext.getAttribute("rate") == null) {
								rate = "";
							} else {
								rate = rate
										+ (String) pageContext.getAttribute("rate")
												.toString();
							}

							/* String rate = ""
									+ (String) pageContext.getAttribute("rate")
											.toString(); */
							String amt = "";
							if (pageContext.getAttribute("amt") == null) {
								amt = "";
							} else {
								amt = amt
										+ (String) pageContext.getAttribute("amt")
												.toString();
							}

							/* String amt = ""
									+ (String) pageContext.getAttribute("amt")
											.toString(); */

							String total = "";
							if (pageContext.getAttribute("total") == null) {
								total = "";
							} else {
								total = total
										+ (String) pageContext
												.getAttribute("total").toString();
							}

							/* String total = ""
									+ (String) pageContext.getAttribute("total")
											.toString(); */

							String batchCode = "";
							if (pageContext.getAttribute("batchCode") == null) {
								batchCode = "";
							} else {
								batchCode = batchCode
										+ (String) pageContext.getAttribute(
												"batchCode").toString();
							}

							/* String batchCode = ""
									+ (String) pageContext
											.getAttribute("batchCode").toString(); */

							String expiry = "";
							if (pageContext.getAttribute("expiry") == null) {
								expiry = "";
							} else {
								expiry = expiry
										+ (String) pageContext.getAttribute(
												"expiry").toString();
							}

							/* String expiry = ""
									+ (String) pageContext.getAttribute("expiry")
											.toString(); */

							String productName = "";
							if (pageContext.getAttribute("productName") == null) {
								productName = "";
							} else {
								productName = productName
										+ (String) pageContext.getAttribute(
												"productName").toString();
							}

							/* String productName = ""
									+ (String) pageContext.getAttribute(
											"productName").toString(); */

							/* afterVentilation
									.addCell(new Phrase(counter, subheader));
							afterVentilation.addCell(new Phrase(qty, subheader));
							afterVentilation.addCell(new Phrase(mrp, subheader));
							afterVentilation.addCell(new Phrase(batchCode,
									subheader));
							afterVentilation.addCell(new Phrase(expiry, subheader));
							afterVentilation.addCell(new Phrase(rate, subheader));
							afterVentilation.addCell(new Phrase(amt, subheader)); */

							HeaderTable6.addCell(new Phrase(counter, tabletext));
							HeaderTable6
									.addCell(new Phrase(productName, tabletext));
							
							PdfPCell batchCodeCells = new PdfPCell(new Phrase(
									batchCode, tabletext));
							batchCodeCells
									.setHorizontalAlignment(Element.ALIGN_LEFT);
							batchCodeCells.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(batchCodeCells);

							PdfPCell cell3 = new PdfPCell(new Phrase(expiry,
									tabletext));
							cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
							cell3.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell3);
							
							PdfPCell vatcell3 = new PdfPCell(new Phrase(vat,
									tabletext));
							vatcell3.setHorizontalAlignment(Element.ALIGN_LEFT);
							vatcell3.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(vatcell3);
							
							HeaderTable6.addCell(new Phrase(qty, tabletext));

							PdfPCell cell2 = new PdfPCell(
									new Phrase(mrp, tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell2);

							/* HeaderTable6.addCell(new Phrase(, tabletext)); */
							
							
							

							PdfPCell cell4 = new PdfPCell(new Phrase(rate,
									tabletext));
							cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
							cell4.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell4);

							PdfPCell cell5 = new PdfPCell(
									new Phrase(amt, tabletext));
							cell5.setHorizontalAlignment(Element.ALIGN_LEFT);
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
					
					String total = ""
							+ (String) pageContext.getAttribute("total")
									.toString();
					
                  double conDouble=Double.parseDouble(total);
					
					long word=(long)conDouble;
					
					document.add(HeaderTable6);
					HeaderTable6.flushContent();

					/* 	document.add(afterVentilation);
						afterVentilation.flushContent(); */

					HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable1.addCell(new Phrase("", header));
					HeaderTable1.addCell(new Phrase("", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();

					// for total
					/* PdfPTable afterVentilation1 = new PdfPTable(7);
					afterVentilation1.addCell(new Phrase("", subheader));
					afterVentilation1.addCell(new Phrase("", subheader));
					afterVentilation1.addCell(new Phrase("", subheader));
					afterVentilation1.addCell(new Phrase("", subheader));
					afterVentilation1.addCell(new Phrase("", subheader));
					afterVentilation1.addCell(new Phrase("Total", subheader));
					afterVentilation1.addCell(new Phrase(total, subheader));

					document.add(afterVentilation1);
					afterVentilation1.flushContent(); */

					PdfPTable HeaderTable7 = new PdfPTable(5);
					int[] headerwidth7 = { 20, 60, 20, 20, 20 };
					HeaderTable7.setWidths(headerwidth7);
					HeaderTable7.setWidthPercentage(95f);
					HeaderTable7.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

				                   
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("" , tabletext));
					HeaderTable7.addCell(new Phrase("" , subheader));
					HeaderTable7.addCell(new Phrase("gross amount:", subheader));
					
					HeaderTable7.addCell(new Phrase(grossAmt , subheader));
					
					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("" , tabletext));
					HeaderTable7.addCell(new Phrase("" , subheader));
					HeaderTable7.addCell(new Phrase("Less:", subheader));
				
					HeaderTable7.addCell(new Phrase(less , subheader));
					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("" , tabletext));
					HeaderTable7.addCell(new Phrase("" , subheader));
					HeaderTable7.addCell(new Phrase("Surcharge:", subheader));
					
					HeaderTable7.addCell(new Phrase(surcharge , subheader));
					
																
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("Net Amount:", subheader));
					
					HeaderTable7.addCell(new Phrase(total, subheader));

					/* HeaderTable7.addCell(new Phrase("Balance", subheader));
					HeaderTable7.addCell(new Phrase("",tabletext));
					HeaderTable7.addCell(new Phrase("Discount", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("In Words", subheader)); */

					/* int finalTotal = (Integer.parseInt(total)); */

					document.add(HeaderTable7);
					HeaderTable7.flushContent();

					

					document.add(patientDemoDetailName2);
					patientDemoDetailName2.flushContent();

					/* HeaderTable2.addCell(new Phrase("q", subheader));
					HeaderTable2.addCell(new Phrase("q", subheader));
					HeaderTable2.addCell(new Phrase("q", subheader));
					HeaderTable2.addCell(new Phrase("q", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					
					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
					
					HeaderTable2.addCell(new Phrase("Receipt No : ", subheader));
					PdfPCell subcell = new PdfPCell(new Phrase("",
					subheader));
					
					subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
					subcell.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(subcell);
					//HeaderTable2.addCell(new Phrase(""+ReceiptNo,subheader));
					HeaderTable2.addCell(new Phrase("Payment Receipt", subheader));
					HeaderTable2.addCell(new Phrase("Date:", subheader));
					HeaderTable2.addCell(new Phrase("" , subheader));
					
					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));

					HeaderTable3.addCell(new Phrase("Consultant Name:", subheader));
					HeaderTable3.addCell(new Phrase("" , tabletext));
					PdfPCell cell0 = new PdfPCell(new Phrase("Department:",
					subheader));
					cell0.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell0.setBorder(Rectangle.NO_BORDER);
					HeaderTable3.addCell(cell0);
					//HeaderTable3.addCell(new Phrase("Department",subheader));
					HeaderTable3.addCell(new Phrase(""
					+ (deptName.equals("") ? "" : deptName.toUpperCase()),
					tabletext)); // deptName.toUpperCase()

					String opdOrDiagnosisString = "";

					if (("" != opdNo) && (null != opdNo)) {
					if (opdNo.contains("/")) {
					if ((opdNo.split("/")[0]).equalsIgnoreCase("DIAG")) {
						opdOrDiagnosisString = "Diagnosis No.:";
					} else {
						opdOrDiagnosisString = "Opd No.:";
					}
					}
					}

					System.out.println("opdOrDiagnosisString>>: "
					+ opdOrDiagnosisString);

					PdfPCell cell1 = new PdfPCell(new Phrase(opdOrDiagnosisString,
					subheader));
					cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell1.setBorder(Rectangle.NO_BORDER);
					HeaderTable3.addCell(cell1);
					//HeaderTable3.addCell(new Phrase("OPD No",subheader));
					HeaderTable3.addCell(new Phrase("" + opdNo, tabletext));

					System.out.println("opdNo>>>>>:" + opdNo);

					document.add(HeaderTable3);
					HeaderTable3.flushContent();

					HeaderTable3.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));

					document.add(HeaderTable3);
					HeaderTable3.flushContent();

					HeaderTable4.addCell(new Phrase("", tabletext));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", tabletext));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));

					HeaderTable4.addCell(new Phrase("Received with Thanks From",
					tabletext));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));

					HeaderTable4.addCell(new Phrase("", tabletext));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", tabletext));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));

					document.add(HeaderTable4);
					HeaderTable4.flushContent();

					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));

					HeaderTable5.addCell(new Phrase("#", subheader));
					HeaderTable5.addCell(new Phrase("Particulars", subheader));
					HeaderTable5.addCell(new Phrase("Rate (INR)", subheader));
					HeaderTable5.addCell(new Phrase("Qty.", subheader));
					HeaderTable5.addCell(new Phrase("Amount (INR)", subheader));
					HeaderTable5.addCell(new Phrase("Concession (INR)", subheader));
					HeaderTable5.addCell(new Phrase("Net Amount (INR)", subheader));

					document.add(HeaderTable5);
					HeaderTable5.flushContent();

					HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));

					double amt = 0.00;
					double disc = 0.00;
					double tot = 0.00;
					
					document.add(HeaderTable5);
					HeaderTable5.flushContent();

					HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));

					document.add(HeaderTable5);
					HeaderTable5.flushContent();

					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));

					HeaderTable6.addCell(new Phrase("Paid", subheader));
					HeaderTable6.addCell(new Phrase("" , tabletext));
					HeaderTable6.addCell(new Phrase("Total", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("" + tot, subheader));

					HeaderTable6.addCell(new Phrase("Balance", subheader));
					HeaderTable6.addCell(new Phrase("",
					tabletext));
					HeaderTable6.addCell(new Phrase("Discount", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("" , subheader));
					HeaderTable6.addCell(new Phrase("In Words", subheader));
					long finalam = (long) 10000;
					HeaderTable6.addCell(new Phrase(""
					+ (EnglishNumberToWords.convert(finalam).toUpperCase())
					+ " Rs. ONLY", tabletext));
					HeaderTable6.addCell(new Phrase("Payable", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));

					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));

					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));

					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));

					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));

					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));

					document.add(HeaderTable6);
					HeaderTable6.flushContent();

					int[] headerwidth = { 20, 60, 20 };
					HeaderTable4.setWidths(headerwidth);
					HeaderTable4.getDefaultCell().setBorder(Rectangle.BOX);
					HeaderTable4.addCell(new Phrase("               INR ", subheader));
					HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(new Phrase(
					"                       Payee Signature", tabletext));
					HeaderTable4.addCell(new Phrase("Autorized Signatory",
					tabletext));

					document.add(HeaderTable4);
					HeaderTable4.flushContent();
					 */
		%>
		<%
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

		int[] headerwidth13 = { 10, 16, 40 };
		HeaderTable12.setWidths(headerwidth13);
		HeaderTable12.addCell(new Phrase("", tabletext));
		HeaderTable12.addCell(new Phrase(
				"Received with thanks from:", subheader));
		HeaderTable12.addCell(new Phrase("", tabletext));

		HeaderTable12.addCell(new Phrase("", tabletext));
		HeaderTable12.addCell(new Phrase("Amount in rupees:",
				subheader));
		
		
		HeaderTable12.addCell(new Phrase(EnglishNumberToWords.convert(word).toUpperCase()+" Rupees only", tabletext));
		
		document.add(HeaderTable12);
		HeaderTable12.flushContent();

		PdfPTable HeaderTable5 = new PdfPTable(2);
		int[] headerwidth5 = { 15, 90};
		HeaderTable5.setWidths(headerwidth5);
		HeaderTable5.setWidthPercentage(95f);
		HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

		int[] headerwidth = {10, 90};
		HeaderTable5.setWidths(headerwidth);
		HeaderTable5.getDefaultCell().setBorder(
				Rectangle.NO_BORDER);
		HeaderTable5.addCell(new Phrase("",
				tabletext));
		HeaderTable5.addCell(new Phrase(
				"DRUG LICENSE NO.- 20D MH-SAT-125909, 20 MH- SAT-125904,20F MH- SAT-128590,21 MH- SAT-125905 ",
				tabletext));
		/* HeaderTable5.addCell(new Phrase("",
				tabletext)); */

										
		
		document.add(HeaderTable5);
		HeaderTable5.flushContent();
		
		
		
         int[] headerwidth23 = {10,90};
		
		HeaderTable5.setWidths(headerwidth23);
		HeaderTable5.addCell(new Phrase("",
				tabletext));
		HeaderTable5.addCell(new Phrase(
				"                                    NDPS- 2  - SAT-01/2015-2016,20C MH- SAT-125908,20B MH-SAT-125906,",
				tabletext));
		/* HeaderTable5.addCell(new Phrase("",
				tabletext));  */
		
		document.add(HeaderTable5);
		HeaderTable5.flushContent();
		
		
		 int[] headerwidth26 = {10,90};
			
			HeaderTable5.setWidths(headerwidth26);
			HeaderTable5.addCell(new Phrase("",
					tabletext));
			HeaderTable5.addCell(new Phrase(
					"                                    21B MH-SAT-125907",
					tabletext));
			/* HeaderTable5.addCell(new Phrase("",
					tabletext));  */
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
		
		
          int[] headerwidth25 = {10, 90};
			
			HeaderTable5.setWidths(headerwidth25);
			HeaderTable5.addCell(new Phrase("",
					tabletext));
			HeaderTable5.addCell(new Phrase(
					" FOOD LICENSE NO.- 21515195003695  ",
					tabletext));
		/* 	HeaderTable5.addCell(new Phrase("                                               ",
					tabletext));  */
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
		
			 int[] headerwidth24 = {10, 90 };
			
			HeaderTable5.setWidths(headerwidth24);
			HeaderTable5.getDefaultCell().setBorder(
					Rectangle.BOTTOM);
			HeaderTable5.addCell(new Phrase("",
					tabletext));
			HeaderTable5.addCell(new Phrase(
					" VAT TIN -                    27641126251 V/C                                                                                                             E&OE",
					tabletext));
			/* HeaderTable5.addCell(new Phrase("                                               ",
					tabletext));  */
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent(); 

		
		PdfPTable HeaderTable10 = new PdfPTable(3);
		int[] headerwidth10 = { 10, 50, 30 };
		HeaderTable10.setWidths(headerwidth10);
		HeaderTable10.setWidthPercentage(95f);
		HeaderTable10.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable10.getDefaultCell().setBorder(
				Rectangle.NO_BORDER);

		int[] headerwidth11 = { 17, 90, 10 };
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
		HeaderTable10
				.addCell(new Phrase(
						"                                                                                                                            Authorized By",
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
		
		
		document.add(HeaderTable5);
		HeaderTable5.flushContent();
		

		document.add(HeaderTable10);
		HeaderTable10.flushContent();
		
		
		PdfPTable HeaderTable51 = new PdfPTable(2);
		int[] headerwidth61 = { 15, 90};
		HeaderTable51.setWidths(headerwidth61);
		HeaderTable51.setWidthPercentage(95f);
		HeaderTable51.getDefaultCell().setBorder(Rectangle.BOTTOM);

		int[] headerwidth14 = {10, 90};
		HeaderTable51.setWidths(headerwidth14);
		HeaderTable51.getDefaultCell().setBorder(
				Rectangle.NO_BORDER);
		HeaderTable51.addCell(new Phrase("",
				tabletext));
		HeaderTable51.addCell(new Phrase(
				"I/we hereby certify that my/our registration certificate under the Maharashtra Value Added Tax Act 2002 is in force",
				tabletext));
	
										
		
		document.add(HeaderTable51);
		HeaderTable51.flushContent();
		
		
		
         int[] headerwidth28 = {10,90};
		
         HeaderTable51.setWidths(headerwidth28);
         HeaderTable51.addCell(new Phrase("",
				tabletext));
         HeaderTable51.addCell(new Phrase(
				"on the date on which the sale of goods specified in this Tax Invoice is made but me/us and that the transaction of the",
				tabletext));
		
		document.add(HeaderTable51);
		HeaderTable51.flushContent();
		
		
		 int[] headerwidth29 = {10,90};
			
		 HeaderTable51.setWidths(headerwidth29);
		 HeaderTable51.addCell(new Phrase("",
					tabletext));
		 HeaderTable51.addCell(new Phrase(
					"sales covered by this Tax Invoice has been effected by me/us and shall be accounted for in the turnover of sales while",
					tabletext));
			
			
			document.add(HeaderTable51);
			HeaderTable51.flushContent();
		
		
          int[] headerwidth27 = {10, 90};
			
          HeaderTable51.setWidths(headerwidth27);
          HeaderTable51.addCell(new Phrase("",
					tabletext));
          HeaderTable51.addCell(new Phrase(
					"filling of return and the due tax, if any payable on the sale has been paid or shall be paid.",
					tabletext));
		
			document.add(HeaderTable51);
			HeaderTable51.flushContent();
		
			
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
