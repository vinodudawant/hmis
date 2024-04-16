<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.pharmacy.pojo.CounterSaleMaster"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%-- <%@ page import="com.hms.dto.HospitalDetails"%> --%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.pharmacy.controller.CounterSaleController"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>

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

		/* List<HospitalDetails> arrHospitalDetails = FetchHospitalDetailsForPharmacy
				.getHospDetailsForPharmacy("0");
		HospitalDetails hospObj = arrHospitalDetails.get(0); */
		HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
		List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
		HospitalDetails hospObj = arrHospitalDetails.get(0);

		ServletOutputStream outStream = response.getOutputStream();
		Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
		document.setMargins(20, 20, 20, 0);

		PdfWriter.getInstance(document, outStream);
		document.open();
		//font

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

		/* String opdNo = request.getParameter("opdNo");

		String deptName = "sagar";

		int ProductId = 0;
		int count = 1;
		String sql5 = "select * from hospital limit 1";
		List<Map> listHospitalDetails = getJdbcTemplate().queryForList(sql5); */

		String path = hospObj.getFilePath();
		String hospitalName = hospObj.getHospitalName();
		hospitalName = hospitalName.toUpperCase();
		String address = hospObj.getHospitalAddress();
		String city = hospObj.getHospitalCity();
		String country = hospObj.getHospitalCountry();
		String contact = hospObj.getHospitalContact();
		String path1 = application.getRealPath(path);

		String hospitalZip = hospObj.getHospitalZip(); 			
		String PhoneNo   =  hospObj.getHospitalContact();
		String secPhoneNo   =  hospObj.getSecPNo();
		String webste     =   hospObj.getWebsite();
		String email      =   hospObj.getHospitalEmail();
		String cinNo	  =   hospObj.getTxtCinNo();
		String serviceTaxNo	  =   hospObj.getTxtSerTaxNo();
		String panNo	  =   hospObj.getPanNo();
		String hPhoneNo   = PhoneNo+"/"+secPhoneNo;
		String GStNo = hospObj.getTxtGstNo();
		
		Image img = null;
		PdfPCell cell = null;
		try {

			//img = Image.getInstance(path1);
			img.scaleAbsolute(150, 60);
			cell = new PdfPCell();
			cell.addElement(new Chunk(img, 5, -5));
			cell.setBorder(Rectangle.NO_BORDER);
		} catch (Exception e) {
			e.printStackTrace();
		}

		/* document.newPage(); */

			/* PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 40, 70, 10 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable2 = new PdfPTable(5);
			int[] headerwidth2 = { 15, 25, 40, 30, 10 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			if (img == null) {
				HeaderTable1.addCell(new Phrase("", header));
			} else {
				HeaderTable1.addCell(cell);
			}

			PdfPCell hospitalNameCell = new PdfPCell(new Phrase(
					hospitalName + "\n" + country + "\n" + address
							+ "\n TEL No:-" + contact, header));
			hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(hospitalNameCell);
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));

			HeaderTable1.addCell(new Phrase("", header));

			document.add(HeaderTable1);
			HeaderTable1.flushContent(); */
			PdfPTable HeaderTable2 = new PdfPTable(5);
			int[] headerwidth2 = { 15, 25, 40, 30, 10 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 40, 70, 10 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();

			if (img == null) {
				HeaderTable1.addCell(new Phrase("", header));
			} else {
				HeaderTable1.addCell(cell);
			}
			PdfPCell hospitalNameCell1 = new PdfPCell(new Phrase("\n     "+
					hospitalName + "\n" + address + "\n" +city + ", " +hospitalZip 
					+ "\n" + "Phone No: "+hPhoneNo + "\n"+webste + ", " +email
					+ "\n"+ "CIN NO:"+cinNo + "\n"+ "Service Tax NO:"+serviceTaxNo
					+ ",  Pan NO:"+panNo,subheader));
			hospitalNameCell1.setHorizontalAlignment(Element.ALIGN_LEFT);
			hospitalNameCell1.setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(hospitalNameCell1);
			
			HeaderTable1.addCell(new Phrase("", header));

			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
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

	<c:set var="bankName" value="${bankName}" /> 

	<c:forEach items="${chequePaidData}" var="row" varStatus="count">

            <c:set var="billId" value="${row.chequePaidId }" />

		<c:set var="billNumber" value="${row.chequePaidDocId }" />

		<c:set var="saleDate" value="${row.chequeTransType}" />

		<c:set var="vendorName" value="${row.vendorMaster.vendorName }" />

		<c:set var="vendorMobile" value="${row.vendorMaster.vendorMobileNumber }" />
		
		<c:set var="transationType" value="${row.vendorMaster.vendorCode }" />

		<c:set var="less" value="${row.chequePaidAmt}" />

		<c:set var="grossAmt" value="${row.chequePaidMadeBy}" />
		
		<c:set var="chequeNum" value="${row.chequePaidChequeNum}" />

		<c:set var="chequeDate" value="${row.chequePaidNarration}" />

		<%-- <c:set var="surcharge" value="${row.purAdd}" /> --%>


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

					String vendorName = "";
					if (pageContext.getAttribute("vendorName") == null) {
						vendorName = "";
					} else {
						vendorName = vendorName
								+ (String) pageContext.getAttribute(
										"vendorName").toString();
					}

					String bankName = "";
					if (pageContext.getAttribute("bankName") == null) {
						bankName = "";
					} else {
						bankName = bankName
								+ (String) pageContext.getAttribute(
										"bankName").toString();
					}
					
					String vendorMobile = "";
					if (pageContext.getAttribute("vendorMobile") == null) {
						vendorMobile = "";
					} else {
						vendorMobile = vendorMobile
								+ (String) pageContext.getAttribute(
										"vendorMobile").toString();
					}
					
					String transationType = "";
					if (pageContext.getAttribute("transationType") == null) {
						transationType = "";
					} else {
						transationType = transationType
								+ (String) pageContext.getAttribute(
										"transationType").toString();
					}


					String less = "";
					if (pageContext.getAttribute("less") == null) {
						less = "";
					} else {
						less = less
								+ (String) pageContext.getAttribute("less")
										.toString();
					}

					String billId = "";
					if (pageContext.getAttribute("billId") == null) {
						billId = "";
					} else {

						billId = billId
								+ (String) pageContext.getAttribute(
										"billId").toString();
					}
					
					
					String grossAmt = "";
					if (pageContext.getAttribute("grossAmt") == null) {
						grossAmt = "";
					} else {
						grossAmt = grossAmt
								+ (String) pageContext.getAttribute("grossAmt")
										.toString();
					}

					String chequeNum = "";
					if (pageContext.getAttribute("chequeNum") == null) {
						chequeNum = "";
					} else {
						chequeNum = grossAmt
								+ (String) pageContext.getAttribute("chequeNum")
										.toString();
					}
					
					String chequeDate = "";
					if (pageContext.getAttribute("chequeDate") == null) {
						chequeDate = "";
					} else {
						chequeDate = chequeDate
								+ (String) pageContext.getAttribute("chequeDate")
										.toString();
					}

				/* 	String chequeDate1 = "";
					String splitChequeDate[];
					String chequeDate = "";

					if (pageContext.getAttribute("chequeDate") == null) {
						chequeDate1 = "";
						chequeDate = "";
					} else {
						chequeDate1 = saleDate1
								+ (String) pageContext.getAttribute("chequeDate")
										.toString();
						splitChequeDate = chequeDate1.split(" ");
						chequeDate = splitChequeDate[0];
					} */
					
										
					/* String chequeDate = "";
					if (pageContext.getAttribute("chequeDate") == null) {
						chequeDate = "";
					} else {
						chequeDate = grossAmt
								+ (String) pageContext.getAttribute("chequeDate")
										.toString();
					} */
					
					/* String surcharge = "";
					if (pageContext.getAttribute("surcharge") == null) {
						surcharge = "";
					} else {
						surcharge = surcharge
								+ (String) pageContext
										.getAttribute("surcharge").toString();
					} */

					/* String doctor = "";
					if(pageContext.getAttribute("doctor")
							.toString()==null)
					{
						doctor = "";
					}
					else
					{
						doctor = doctor+(String) pageContext.getAttribute("doctor")
								.toString();;
					}
					 */
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
					HeaderTable2
							.addCell(new Phrase("Receipt No :- ", subheader));
					PdfPCell subcell1 = new PdfPCell(new Phrase(billId,
							subheader));
					subcell1.setHorizontalAlignment(Element.ALIGN_LEFT);
					subcell1.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(subcell1);
					
					
					HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable2
							.addCell(new Phrase("Vou No:- " +billNumber, subheader));
					PdfPCell subcell = new PdfPCell(new Phrase("Transation type:  "+transationType,
							subheader));
					subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
					subcell.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(subcell);
					//HeaderTable2.addCell(new Phrase(""+ReceiptNo,subheader));
					HeaderTable2.addCell(new Phrase("",subheader));
					HeaderTable2.addCell(new Phrase("Date:", subheader));
					HeaderTable2.addCell(new Phrase(saleDate, subheader));
					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					PdfPTable HeaderTable4 = new PdfPTable(6);
					int[] headerwidth4 = { 18, 30, 20, 20, 20, 20 };
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
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));

					HeaderTable4.addCell(new Phrase("Vendor Name:", subheader));
					HeaderTable4.addCell(new Phrase(vendorName, tabletext));
					PdfPCell cell0 = new PdfPCell(new Phrase("Phone Number:",
							subheader));
					cell0.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell0.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell0);
					//HeaderTable3.addCell(new Phrase("Department",subheader));
					HeaderTable4.addCell(new Phrase(vendorMobile, tabletext)); // deptName.toUpperCase()

					/* 	PdfPCell cell00 = new PdfPCell(new Phrase("Doctor:",
								subheader));
						cell00.setHorizontalAlignment(Element.ALIGN_CENTER);
						cell00.setBorder(Rectangle.NO_BORDER);
						HeaderTable4.addCell(cell00); */

					/* HeaderTable4.addCell(new Phrase("", subheader)); */
					/* HeaderTable4.addCell(new Phrase(doctor, tabletext)); */

					PdfPCell cell1 = new PdfPCell(new Phrase("Date:", subheader));
					cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell1.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell1);
					//HeaderTable3.addCell(new Phrase("OPD No",subheader));
					HeaderTable4.addCell(new Phrase(saleDate, tabletext));

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

					PdfPTable HeaderTable6 = new PdfPTable(8);
					int[] headerwidth6 = { 6, 30, 7, 15, 10, 15, 20, 20 };
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

					HeaderTable6.addCell(new Phrase("#", subheader));
					HeaderTable6.addCell(new Phrase("Vou No", subheader));
					HeaderTable6.addCell(new Phrase("   ", tabletext));
					HeaderTable6.addCell(new Phrase("Bill No", subheader));
					/* HeaderTable6.addCell(new Phrase("", subheader)); */

					PdfPCell mrpCell = new PdfPCell(new Phrase("Bill Date",
							subheader));
					HeaderTable6.addCell(new Phrase("   ", tabletext));
					mrpCell.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(mrpCell);

					PdfPCell batchNumberCell = new PdfPCell(new Phrase(
							"Bill Amount", subheader));
					HeaderTable6.addCell(new Phrase("   ", tabletext));
					batchNumberCell
							.setHorizontalAlignment(Element.ALIGN_RIGHT);
					batchNumberCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(batchNumberCell);

					/*  HeaderTable6.addCell(new Phrase("", subheader)); 
						HeaderTable6.addCell(new Phrase("", subheader));

					PdfPCell cells = new PdfPCell(new Phrase("",
							subheader));
					cells.setHorizontalAlignment(Element.ALIGN_CENTER);
					cells.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells); */

				/* 	PdfPCell cells1 = new PdfPCell(new Phrase("",
							subheader));
					cells1.setHorizontalAlignment(Element.ALIGN_CENTER);
					cells1.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells1);  */

					/* HeaderTable6.addCell(new Phrase(" ",
							subheader)); */

			/* 	PdfPCell cells2 = new PdfPCell(new Phrase("",
							subheader));
					cells2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cells2.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells2);  */

					/* HeaderTable6.addCell(new Phrase("",
							subheader)); */

					document.add(HeaderTable6);
					HeaderTable6.flushContent();

					HeaderTable6.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					/* HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext)); */
		%>
		<%-- <c:set var="total" value="${row.purNetAmt }" /> --%>

		<c:forEach items="${row.chequePaidSlaves}" var="vendor" varStatus="count">

          <c:set var="counter" value="${(count.index)+1}" />

			<c:set var="vouNo" value="${vendor.purchaseMaster.purDocId}" />

			<c:set var="billNo" value="${vendor.purchaseMaster.purBillNo}" />

			<c:set var="billDate" value="${vendor.purchaseMaster.purTransType}" />

			<c:set var="netAmt" value="${vendor.purchaseMaster.purNetAmt}" />

			<%-- <c:set var="batchCode" value="${vendor.batchMaster.batchCode }" />

			<c:set var="expiry" value="${vendor.batchMaster.batchExpDate }" />

			

			<c:set var="productName" value="${vendor.productMaster.productName}" /> --%>

			<%
				 String counter = ""
									+ (String) pageContext.getAttribute("counter")
											.toString();

							String vouNo = "";
							if (pageContext.getAttribute("vouNo") == null) {
								vouNo = "";
							} else {
								vouNo = vouNo
										+ (String) pageContext.getAttribute("vouNo")
												.toString();
							}

							/* String qty = ""
									+ (String) pageContext.getAttribute("qty")
											.toString(); */

							String billNo = "";
							if (pageContext.getAttribute("billNo") == null) {
								billNo = "";
							} else {
								billNo = billNo
										+ (String) pageContext.getAttribute("billNo")
												.toString();
							}

							/* String mrp = ""
									+ (String) pageContext.getAttribute("mrp")
											.toString(); */

											
											String billDate1 = "";
											String splitbillDate[];
											String billDate = "";

											if (pageContext.getAttribute("billDate") == null) {
												billDate1 = "";
												billDate = "";
											} else {
												billDate1 = billDate1
														+ (String) pageContext.getAttribute("billDate")
																.toString();
												splitbillDate = billDate1.split(" ");
												billDate = splitbillDate[0];
											}			
											
											
							 String netAmt = "";
							if (pageContext.getAttribute("netAmt") == null) {
								netAmt = "";
							} else {
								netAmt = netAmt
										+ (String) pageContext.getAttribute(
												"netAmt").toString();
							}

							HeaderTable6.addCell(new Phrase(counter, tabletext));
							/* HeaderTable6.getDefaultCell().setBorder(Rectangle.BOTTOM); */
							HeaderTable6
									.addCell(new Phrase(vouNo, tabletext));
							HeaderTable6.addCell(new Phrase("   ", tabletext));
							/* HeaderTable6.getDefaultCell().setBorder(Rectangle.BOTTOM); */
							HeaderTable6.addCell(new Phrase(billNo, tabletext));
							HeaderTable6.addCell(new Phrase("   ", tabletext));
							/* HeaderTable6.getDefaultCell().setBorder(Rectangle.BOTTOM); */
							
							PdfPCell cell2 = new PdfPCell(
									new Phrase(billDate, tabletext));
							
							cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell2);
							/* HeaderTable6.getDefaultCell().setBorder(Rectangle.BOTTOM); */
							/* HeaderTable6.addCell(new Phrase(, tabletext)); */
							HeaderTable6.addCell(new Phrase("   ", tabletext));
							PdfPCell batchCodeCells = new PdfPCell(new Phrase(
									netAmt, tabletext));
							batchCodeCells
									.setHorizontalAlignment(Element.ALIGN_RIGHT);
							 batchCodeCells.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(batchCodeCells);
							/* HeaderTable6.getDefaultCell().setBorder(Rectangle.BOTTOM); */
							
							/* PdfPCell cell3 = new PdfPCell(new Phrase("",
									subheader));
						
							cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell3.setBorder(Rectangle.BOTTOM);
							HeaderTable6.addCell(cell3); */

							/* PdfPCell cell4 = new PdfPCell(new Phrase("",
									subheader));
							cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell4.setBorder(Rectangle.BOTTOM);
							HeaderTable6.addCell(cell4); */

							/* PdfPCell cell5 = new PdfPCell(new Phrase("",
									subheader));
							cell5.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell5.setBorder(Rectangle.BOTTOM);
							HeaderTable6.addCell(cell5); */

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
					
					
				/* 	String total = ""
							+ (String) pageContext.getAttribute("total")
									.toString(); */
					document.add(HeaderTable6);
					HeaderTable6.flushContent();

					/* 	document.add(afterVentilation);
						afterVentilation.flushContent(); */

					HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable1.addCell(new Phrase("            ", header));
					HeaderTable1.addCell(new Phrase("            ", header));
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
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("Amount", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase(less, subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("Entry made By", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase(grossAmt, subheader));
					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("Cheque No", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase(chequeNum, subheader));
					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("Cheque Date", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase(chequeDate, subheader));
					
					
					/* HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("Surcharge", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase(surcharge, subheader)); */

				/* 	HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("Total", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase(total, subheader)); */

					/* HeaderTable7.addCell(new Phrase("Balance", subheader));
					HeaderTable7.addCell(new Phrase("",tabletext));
					HeaderTable7.addCell(new Phrase("Discount", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("In Words", subheader)); */

					/* int finalTotal = (Integer.parseInt(total)); */

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("Bank Name", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase(bankName, subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					document.add(HeaderTable7);
					HeaderTable7.flushContent();

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

					document.add(patientDemoDetailName2);
					patientDemoDetailName2.flushContent();
		%>
		<%
			/* PdfPTable HeaderTable5 = new PdfPTable(3);
					int[] headerwidth5 = { 30, 60, 20 };
					HeaderTable5.setWidths(headerwidth5);
					HeaderTable5.setWidthPercentage(95f);
					HeaderTable5.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					int[] headerwidth = { 20, 60, 20 };
					HeaderTable5.setWidths(headerwidth);
					HeaderTable5.getDefaultCell().setBorder(Rectangle.BOX);
					HeaderTable5.addCell(new Phrase("               INR "
							+ total, subheader));
					HeaderTable5.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
					HeaderTable5
							.addCell(new Phrase(
									"                       Payee Signature",
									tabletext));
					HeaderTable5.addCell(new Phrase("Autorized Signatory",
							tabletext));

					document.add(HeaderTable5);
					HeaderTable5.flushContent(); */
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
