<%@page import="com.hms.pharmacy.pojo.CounterSaleMaster"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%@ page import="com.hms.dto.HospitalDetails"%>
<%-- <%@ page import="com.hms.admin.util.FetchHospitalDetailsForPharmacy"%> --%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.pharmacy.controller.CounterSaleController"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.lowagie.text.PageSize"%>
<%@page import="com.hms.dto.Prescription"%>
<%@page import="com.hms.utility.EnglishNumberToWords"%>
<%-- <%@page import="org.omg.CORBA._PolicyStub"%> --%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.List"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%-- <%@ page import="com.hms.model.BillModel"%> --%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"
	import="com.lowagie.text.Chunk,com.lowagie.text.Document,com.lowagie.text.Element,com.lowagie.text.Font
	,com.lowagie.text.HeaderFooter,com.lowagie.text.Image,com.lowagie.text.Paragraph,com.lowagie.text.Phrase,com.lowagie.text.Rectangle
	,com.lowagie.text.pdf.PdfPCell,com.lowagie.text.pdf.PdfPTable,com.lowagie.text.pdf.PdfWriter,com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>

<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>OPD Receipt</title>
</head>
<body>
	<%
	double netTotal=0.0;
	double recdTotal=0.0;
	//added by Rohini
	double patsaleduenetTotal=0.0;
	double patsaleduenetTotalamtbalance =0.0;
	double indentTotalamt = 0.0;
	double indentTotalnetamt = 0.0;
	double indentduetotalamt = 0.0;
	double indentdueamtbal = 0.0;
	double creditamouttotal = 0.0;
	
		try {
			response.setContentType("application/pdf");

			/* List<HospitalDetails> arrHospitalDetails = FetchHospitalDetailsForPharmacy
					.getHospDetailsForPharmacy("0");
			HospitalDetails hospObj = arrHospitalDetails.get(0); */
		/* 	List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails
			.getHospDetails("0"); */
			//HospitalDetails hospObj = arrHospitalDetails.get(0);
			ServletOutputStream outStream = response.getOutputStream();
			
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			document.setMargins(20, 20, 40, 30);

			PdfWriter.getInstance(document, outStream);

			//font
			Font header = new Font(Font.HELVETICA, 10, Font.BOLD);
			Font subheader = new Font(Font.HELVETICA, 8, Font.BOLD);
			Font footer = new Font(Font.HELVETICA, 8, Font.BOLD);
			header.setColor(10, 4, 2);

			Font tableheader = new Font(Font.HELVETICA, 10, Font.BOLD);
			Font tabletext = new Font(Font.HELVETICA, 8, Font.NORMAL);
			Font small = new Font(Font.HELVETICA, 8, Font.NORMAL);
			Font tabletext1 = new Font(Font.HELVETICA,12,Font.NORMAL);

			HeaderFooter footerNew = new HeaderFooter(new Phrase("",
					tabletext), true);
			footerNew.setAlignment(Element.ALIGN_RIGHT);
			footerNew.setBorderWidthBottom(0);
			document.setFooter(footerNew);

			document.open();

			/* String path = hospObj.getFilePath();
			String hospitalName = hospObj.getHospitalName();
			hospitalName = hospitalName.toUpperCase();
			String address = hospObj.getHospitalAddress();
			String city = hospObj.getHospitalCity();
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
			String GStNo = hospObj.getTxtGstNo(); */
			Image img = null;
			PdfPCell cell = null;
			try {
				//img = Image.getInstance(path1);

				// width, height
				img.scaleAbsolute(150, 65);
				cell = new PdfPCell();
				cell.addElement(new Chunk(img, 5, -5));
				cell.setBorder(Rectangle.NO_BORDER);
			} catch (Exception e) {
				e.printStackTrace();
			}

			document.newPage();

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
		/* 	PdfPCell hospitalNameCell1 = new PdfPCell(new Phrase("\n     "+
					hospitalName + "\n" + address + "\n" +city + ", " +hospitalZip 
					+ "\n" + "Phone No: "+hPhoneNo + "\n"+webste + ", " +email
					+ "\n"+ "CIN NO:"+cinNo + "\n"+ "Service Tax NO:"+serviceTaxNo
					+ ",  Pan NO:"+panNo,subheader)); */
		//	hospitalNameCell1.setHorizontalAlignment(Element.ALIGN_CENTER);
		//	hospitalNameCell1.setBorder(Rectangle.NO_BORDER);
		//	HeaderTable1.addCell(hospitalNameCell1);
			
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

			
			PdfPTable HeaderTable2 = new PdfPTable(6);
			int[] headerwidth2 = { 50, 10, 50, 30, 10, 50 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
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

	<c:set var="formDate" value="${form}" />
	<c:set var="toDate" value="${to}" />
	<c:set var="netAmt" value="${netAmount}" />
	
	<c:set var="treatId" value="${patientId}" />
	<c:set var="patName" value="${patientName}" />
	<c:set var="patientAddress" value="${patientData[0].address}" />  
        
    <c:set var="patientMobile" value="${patientData[0].mobile}" />  
        

	<%
	
		String netAmt = ""
			+ (String) pageContext.getAttribute("netAmt")
					.toString();
	
		String saleDate5 = "";
			String splitSaleDate5[];
			String saleDate6 = "";

			if (pageContext.getAttribute("formDate") == null) {
				saleDate5 = "";
				saleDate6 = "";
			} else {
				saleDate5 = saleDate5
						+ (String) pageContext.getAttribute("formDate")
								.toString();
				splitSaleDate5 = saleDate5.split(" ");
				saleDate6 = splitSaleDate5[0];
			}
			
			String treatId = ""
					+ (String) pageContext.getAttribute("treatId")
							.toString();
			
			String patName = ""
					+ (String) pageContext.getAttribute("patName")
							.toString();
			
			String patientAddress= "";
			if (pageContext.getAttribute("patientAddress") == null) {
				patientAddress = "";
			} else {

				patientAddress = patientAddress
						+ (String) pageContext.getAttribute(
								"patientAddress").toString();
			}  

			String patientMobile= "";
			if (pageContext.getAttribute("patientMobile") == null) {
				patientMobile = "";
			} else {

				patientMobile = patientMobile
						+ (String) pageContext.getAttribute(
								"patientMobile").toString();
			}  
			
			String patientSponsarName= "";
			if (pageContext.getAttribute("patientSponsarName") == null) {
				patientSponsarName = "";
			} else {

				patientSponsarName = patientSponsarName
						+ (String) pageContext.getAttribute(
								"patientSponsarName").toString();
			}  

			String patientConsName= "";
			if (pageContext.getAttribute("patientConsName") == null) {
				patientConsName = "";
			} else {

				patientConsName = patientConsName
						+ (String) pageContext.getAttribute(
								"patientConsName").toString();
			}  
			String saleDate8 = "";
			String splitSaleDate8[];
			String saleDate9 = "";

			if (pageContext.getAttribute("toDate") == null) {
				saleDate8 = "";
				saleDate9 = "";
			} else {
				saleDate8 = saleDate8
						+ (String) pageContext.getAttribute("toDate")
								.toString();
				splitSaleDate8 = saleDate8.split(" ");
				saleDate9 = splitSaleDate8[0];
			}
			
			

			PdfPTable HeaderTable3 = new PdfPTable(6);
			int[] headerwidth3 = { 60, 30, 3, 3, 3, 10 };
			HeaderTable3.setWidths(headerwidth3);
			HeaderTable3.setWidthPercentage(95f);
			HeaderTable3.getDefaultCell().setBorder(Rectangle.TOP);

			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));

			HeaderTable2.addCell(new Phrase("From : " + saleDate6,
					subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("   Patient Ledger Report",
					tabletext1));
			HeaderTable2.addCell(new Phrase("", tabletext1));
			HeaderTable2.addCell(new Phrase("", subheader));

			/* BaseColor myColor = WebColors.getRGBColor("#00a0d6"); */
			PdfPCell text = new PdfPCell(new Phrase("To  :  " + saleDate9,
					subheader));
			text.setHorizontalAlignment(Element.ALIGN_CENTER);
			/* 	text.setBackgroundColor(myColor); */
			text.setBorder(Rectangle.NO_BORDER);
			HeaderTable2.addCell(text);

			document.add(HeaderTable2);
			HeaderTable2.flushContent();

			HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(new Phrase("", subheader));

			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));

			document.add(HeaderTable2);
			HeaderTable2.flushContent();

			//code for suraj for title
			
			PdfPTable HeaderTableTitle = new PdfPTable(6);
			int[] headerwidthTitle = { 30, 10, 10, 10, 20, 20 };
			HeaderTableTitle.setWidths(headerwidthTitle);
			HeaderTableTitle.setWidthPercentage(95f);
			HeaderTableTitle.getDefaultCell()
					.setBorder(Rectangle.NO_BORDER);

			HeaderTableTitle.addCell(new Phrase("", subheader));
			HeaderTableTitle.addCell(new Phrase("", subheader));
			HeaderTableTitle.addCell(new Phrase("", subheader));
			HeaderTableTitle.addCell(new Phrase("", subheader));
			HeaderTableTitle.addCell(new Phrase("", subheader));
			HeaderTableTitle.addCell(new Phrase("", subheader));
			
			HeaderTableTitle.addCell(new Phrase("", subheader));
			HeaderTableTitle.addCell(new Phrase("", subheader));
			HeaderTableTitle.addCell(new Phrase("", subheader));
			HeaderTableTitle.addCell(new Phrase("", subheader));
			HeaderTableTitle.addCell(new Phrase("", subheader));
			HeaderTableTitle.addCell(new Phrase("", subheader));
			
			/* HeaderTableTitle.addCell(new Phrase("Patient Name:", subheader));
			HeaderTableTitle.addCell(new Phrase(patName, tabletext));
			
			
			
			PdfPCell cell001 = new PdfPCell(new Phrase("Patient Id:",
					subheader));
			cell001.setHorizontalAlignment(Element.ALIGN_CENTER);
			cell001.setBorder(Rectangle.NO_BORDER);
			HeaderTableTitle.addCell(cell001);
			HeaderTableTitle.addCell(new Phrase(treatId, tabletext)); // deptName.toUpperCase()
			
			HeaderTableTitle.addCell(new Phrase("Sponsar Name:", subheader));
			HeaderTableTitle.addCell(new Phrase(patientSponsarName, tabletext));

			HeaderTableTitle.addCell(new Phrase("Mobile:", subheader));
			HeaderTableTitle.addCell(new Phrase(patientMobile, tabletext));
			
			HeaderTableTitle.addCell(new Phrase("Address:", subheader));
			HeaderTableTitle.addCell(new Phrase(patientAddress, tabletext));
			
			 PdfPCell cell11 = new PdfPCell(new Phrase("", subheader));
			cell11.setHorizontalAlignment(Element.ALIGN_CENTER);
			cell11.setBorder(Rectangle.NO_BORDER);
			HeaderTableTitle.addCell(cell11);
			HeaderTableTitle.addCell(new Phrase("", tabletext)); 
			 */
			 
				
				PdfPTable HeaderTable4 = new PdfPTable(4);
				int[] headerwidth4 = { 25, 35, 20, 15 };
				HeaderTable4.setWidths(headerwidth4);
				HeaderTable4.setWidthPercentage(95f);
				HeaderTable4.getDefaultCell()
						.setBorder(Rectangle.NO_BORDER);

				HeaderTable4.setSpacingAfter(3f);

				HeaderTable4.addCell(new Phrase("Patient Id ", subheader));
				HeaderTable4
						.addCell(new Phrase(": " + treatId, tabletext));
				/* PdfPCell cell0 = new PdfPCell(new Phrase("Bill No ",
						subheader));
				cell0.setBorder(Rectangle.NO_BORDER);
				HeaderTable4.addCell(cell0);
				HeaderTable4
						.addCell(new Phrase(": " + billId, tabletext)); */

				PdfPCell cell00 = new PdfPCell(new Phrase("Patient Name ",
						subheader));
				cell00.setBorder(Rectangle.NO_BORDER);
				HeaderTable4.addCell(cell00);

				HeaderTable4.addCell(new Phrase(": "
						+ patName.toUpperCase(), subheader));

			
				PdfPCell cell002 = new PdfPCell(new Phrase("Address ",
						subheader));
				cell002.setBorder(Rectangle.NO_BORDER);
				HeaderTable4.addCell(cell002);

				HeaderTable4.addCell(new Phrase(": " + patientAddress,
						tabletext));

				

				PdfPCell cell0022 = new PdfPCell(new Phrase("Mobile ",
						subheader));
				cell0022.setBorder(Rectangle.NO_BORDER);
				HeaderTable4.addCell(cell0022);

				HeaderTable4.addCell(new Phrase(": " + patientMobile,
						tabletext));

				

			 
				PdfPCell cell012 = new PdfPCell(new Phrase("Sponsor Name",
						subheader));
				cell012.setHorizontalAlignment(Element.ALIGN_LEFT);
				cell012.setBorder(Rectangle.NO_BORDER);

				if (!patientSponsarName.equals("")) {
					HeaderTable4.addCell(cell012);
					HeaderTable4.addCell(new Phrase(": "
							+ patientSponsarName, tabletext));
				} else {
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
				}

				HeaderTable4.addCell(new Phrase("  ",
						subheader));
				HeaderTable4.addCell(new Phrase(" ", tabletext));  

			

				document.add(HeaderTable4);
				HeaderTable4.flushContent();
			
			HeaderTableTitle.addCell(new Phrase("Patient Sale", tabletext1));
			HeaderTableTitle.addCell(new Phrase("", subheader));
			HeaderTableTitle.addCell(new Phrase("", subheader));
			HeaderTableTitle.addCell(new Phrase("", subheader));
			HeaderTableTitle.addCell(new Phrase("", subheader));
			HeaderTableTitle.addCell(new Phrase("", subheader));
			
			

			document.add(HeaderTableTitle);
			HeaderTableTitle.flushContent();
			
			PdfPTable HeaderTable49 = new PdfPTable(6);
			int[] headerwidth49 = { 14, 10, 5, 15, 10, 10 };
			HeaderTable49.setWidths(headerwidth49);
			HeaderTable49.setWidthPercentage(95f);
			HeaderTable49.getDefaultCell()
					.setBorder(Rectangle.NO_BORDER);
			
			HeaderTable49
					.addCell(new Phrase("", subheader));
			HeaderTable49.addCell(new Phrase("", subheader));
			HeaderTable49.addCell(new Phrase("", subheader));
			HeaderTable49.addCell(new Phrase("", subheader));
			HeaderTable49
					.addCell(new Phrase("", subheader));
			HeaderTable49.addCell(new Phrase("", subheader));

			HeaderTable49.addCell(new Phrase("", subheader));
			HeaderTable49.addCell(new Phrase("", tabletext));
			PdfPCell cell0 = new PdfPCell(new Phrase("", subheader));
			cell0.setHorizontalAlignment(Element.ALIGN_CENTER);
			cell0.setBorder(Rectangle.NO_BORDER);
			HeaderTable49.addCell(cell0);

			HeaderTable49.addCell(new Phrase("", tabletext));

			PdfPCell cell1 = new PdfPCell(new Phrase("", subheader));
			cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
			cell1.setBorder(Rectangle.NO_BORDER);
			HeaderTable49.addCell(cell1);

			HeaderTable49.addCell(new Phrase("", tabletext));

			document.add(HeaderTable49);
			HeaderTable49.flushContent();
			
			
			PdfPTable HeaderTable6 = new PdfPTable(8);
			int[] headerwidth6 = { 10, 10, 12, 10, 10, 10,20,14 };
			HeaderTable6.setWidths(headerwidth6);
			HeaderTable6.setWidthPercentage(95f);
			HeaderTable6.getDefaultCell().setBorder(
					Rectangle.BOTTOM);

			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
			
			HeaderTable6.addCell(new Phrase("#", subheader));
			HeaderTable6.addCell(new Phrase("Bill No",
					subheader));
			HeaderTable6.addCell(new Phrase("Date", subheader));
			/* HeaderTable6.addCell(new Phrase("", subheader)); */

			PdfPCell mrpCell = new PdfPCell(new Phrase(
					"Bill Mode", subheader));
			mrpCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			mrpCell.setBorder(Rectangle.BOTTOM);
			HeaderTable6.addCell(mrpCell);

			PdfPCell batchNumberCell = new PdfPCell(new Phrase(
					"Net Amt", subheader));
			batchNumberCell
					.setHorizontalAlignment(Element.ALIGN_CENTER);
			batchNumberCell.setBorder(Rectangle.BOTTOM);
			HeaderTable6.addCell(batchNumberCell);

			PdfPCell cells = new PdfPCell(new Phrase("Amt Receive",
					subheader));
			cells.setHorizontalAlignment(Element.ALIGN_CENTER);
			cells.setBorder(Rectangle.BOTTOM);
			HeaderTable6.addCell(cells);
			
			PdfPCell cells1 = new PdfPCell(new Phrase("Patient Name",
					subheader));
			cells1.setHorizontalAlignment(Element.ALIGN_CENTER);
			cells1.setBorder(Rectangle.BOTTOM);
			HeaderTable6.addCell(cells1);
			
			PdfPCell cells80 = new PdfPCell(new Phrase("Pt. Cat",
					subheader));
			cells80.setHorizontalAlignment(Element.ALIGN_CENTER);
			cells80.setBorder(Rectangle.BOTTOM);
			HeaderTable6.addCell(cells80);

			document.add(HeaderTable6);
			HeaderTable6.flushContent();

			HeaderTable6.getDefaultCell().setBorder(
					Rectangle.NO_BORDER);

			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
	%>
	//Patient Sale
	<c:forEach items="${patientData}" var="row" varStatus="count">

		<c:set var="credtiNoteId" value="${row.credtiNoteInvoiceNo}" />
		<c:set var="date" value="${row.date}" />
		<c:set var="billMode" value="${row.billMode}" />
		<c:set var="amount" value="${row.amount}" />
		<c:set var="amountReceive" value="${row.amountReceive}" />
		<c:set var="patientType" value="${row.patientType}" />
		<c:set var="patientName" value="${row.patientName}" />
		<c:set var="category_name" value="${row.category_name}" />
        <c:set var="counter" value="${(count.index)+1}" />
        <c:set var="netTotal" value="${netTotal}+${row.amountReceive}"></c:set>
		<%

	      String categoryName = ""
			      + (String) pageContext.getAttribute("category_name")
					.toString();
		
		      String counter = ""
				      + (String) pageContext.getAttribute("counter")
						.toString();
		
					String creditNoteId = ""
							+ (String) pageContext.getAttribute("credtiNoteId")
									.toString();

		         String date = ""
				      + (String) pageContext.getAttribute("date")
						.toString();
		         
		  
		     	String saleDate = "";
				String splitSaleDate[];
				String saleDate1 = "";

					splitSaleDate = date.split("-");
					saleDate1 = splitSaleDate[2]+"-"+splitSaleDate[1]+"-"+splitSaleDate[0];
				
				
				
		         
					String billMode = ""
							+ (String) pageContext.getAttribute("billMode")
									.toString();
					
					
					String amount = "";
					if (pageContext.getAttribute("amount") == null) {
						amount = "";
					} else {

						amount = amount
								+ (String) pageContext.getAttribute(
										"amount").toString();
					}
					
					netTotal=netTotal+ Double.parseDouble(amount);

					String amountReceive = "";
					if (pageContext.getAttribute("amountReceive") == null) {
						amountReceive = "";
					} else {

						amountReceive = amountReceive
								+ (String) pageContext.getAttribute("amountReceive")
										.toString();
					}

					recdTotal+=Double.parseDouble(amountReceive);
					System.out.println(netTotal+"========kkkkkkk======"+recdTotal);
					String patientType = "";
					if (pageContext.getAttribute("patientType") == null) {
						patientType = "";
					} else {

						patientType = patientType
								+ (String) pageContext.getAttribute(
										"patientType").toString();
					}
					
					String patientName = "";
					if (pageContext.getAttribute("patientName") == null) {
						patientName = "";
					} else {

						patientName = patientName
								+ (String) pageContext.getAttribute(
										"patientName").toString();
					}
					
					String type = "";
					if (pageContext.getAttribute("type") == null) {
						type = "";
					} else {

						type = type
								+ (String) pageContext.getAttribute(
										"type").toString();
					}
					
		
							HeaderFooter header1 = new HeaderFooter(new Phrase("",
									tabletext), true);
							header1.setAlignment(Element.ALIGN_RIGHT);
							header1.setBorderWidthBottom(0);
							document.setHeader(header1);

							HeaderTable6.addCell(new Phrase(counter, tabletext));
							HeaderTable6
									.addCell(new Phrase(creditNoteId, tabletext));
							HeaderTable6.addCell(new Phrase(saleDate1, tabletext));
							/* HeaderTable6.addCell(new Phrase(receiptNo, tabletext)); */

							PdfPCell cell22 = new PdfPCell(new Phrase(billMode,
									tabletext));
							cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell22.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell22);

							PdfPCell cell2 = new PdfPCell(new Phrase(amount,
									tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell2);

							PdfPCell vatcell11 = new PdfPCell(new Phrase(amountReceive,
									tabletext));
							vatcell11.setHorizontalAlignment(Element.ALIGN_CENTER);
							vatcell11.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(vatcell11);
							
							PdfPCell vatcell111 = new PdfPCell(new Phrase(patientName,
									tabletext));
							vatcell111.setHorizontalAlignment(Element.ALIGN_CENTER);
							vatcell111.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(vatcell111);
							
							PdfPCell vatcell80 = new PdfPCell(new Phrase(categoryName,
									tabletext));
							vatcell80.setHorizontalAlignment(Element.ALIGN_CENTER);
							vatcell80.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(vatcell80);

							document.add(HeaderTable6);
							HeaderTable6.flushContent();

							/* HeaderTable6.getDefaultCell().setBorder(
									Rectangle.BOTTOM); */
							
			%>
		</c:forEach>
			<%
			
			 PdfPCell cellsOfTotal = new PdfPCell(new Phrase("",
					tabletext));
			cellsOfTotal.setHorizontalAlignment(Element.ALIGN_CENTER);
			cellsOfTotal.setBorder(Rectangle.BOTTOM);
			HeaderTable6.addCell(cellsOfTotal);
			
			PdfPCell cellsOfTotal1 = new PdfPCell(new Phrase("",
					tabletext));
			cellsOfTotal1.setHorizontalAlignment(Element.ALIGN_CENTER);
			cellsOfTotal1.setBorder(Rectangle.BOTTOM);
			HeaderTable6.addCell(cellsOfTotal1);
			
			PdfPCell cellsOfTotal2 = new PdfPCell(new Phrase("",
					tabletext));
			cellsOfTotal2.setHorizontalAlignment(Element.ALIGN_CENTER);
			cellsOfTotal2.setBorder(Rectangle.BOTTOM);
			HeaderTable6.addCell(cellsOfTotal2);
			
			PdfPCell cellsOfTotal3 = new PdfPCell(new Phrase("Total :",
					tabletext));
			cellsOfTotal3.setHorizontalAlignment(Element.ALIGN_CENTER);
			cellsOfTotal3.setBorder(Rectangle.BOTTOM);
			HeaderTable6.addCell(cellsOfTotal3);
			
			PdfPCell cellsOfTotal4 = new PdfPCell(new Phrase(""+(Math.round(netTotal * 100.0) / 100.0),
					tabletext));
			cellsOfTotal4.setHorizontalAlignment(Element.ALIGN_CENTER);
			cellsOfTotal4.setBorder(Rectangle.BOTTOM);
			HeaderTable6.addCell(cellsOfTotal4);
			
			PdfPCell cellsOfTotal5 = new PdfPCell(new Phrase(""+(Math.round(recdTotal * 100.0) / 100.0),
					tabletext));
			cellsOfTotal5.setHorizontalAlignment(Element.ALIGN_CENTER);
			cellsOfTotal5.setBorder(Rectangle.BOTTOM);
			HeaderTable6.addCell(cellsOfTotal5);
			
			PdfPCell cellsOfTotal6 = new PdfPCell(new Phrase("",
					subheader));
			cellsOfTotal6.setHorizontalAlignment(Element.ALIGN_CENTER);
			cellsOfTotal6.setBorder(Rectangle.BOTTOM);
			HeaderTable6.addCell(cellsOfTotal6);
			
			document.add(HeaderTable6);
			HeaderTable6.flushContent();
			
			PdfPCell cellsOfTotal7 = new PdfPCell(new Phrase("",
					tabletext));
			cellsOfTotal7.setHorizontalAlignment(Element.ALIGN_CENTER);
			cellsOfTotal7.setBorder(Rectangle.BOTTOM);
			HeaderTable6.addCell(cellsOfTotal7);
		
		
			PdfPTable HeaderTable8 = new PdfPTable(6);
			int[] headerwidth8 = { 12, 20, 7, 15,10,10};
			HeaderTable8.setWidths(headerwidth8);
			HeaderTable8.setWidthPercentage(95f);
			HeaderTable8.getDefaultCell().setBorder(Rectangle.BOTTOM);
			
		HeaderTable8.getDefaultCell().setBorder(Rectangle.BOTTOM);
		HeaderTable8.addCell(new Phrase("", tabletext));
		HeaderTable8.addCell(new Phrase("", tabletext));
		HeaderTable8.addCell(new Phrase("", tabletext));
		HeaderTable8.addCell(new Phrase("", tabletext));
		HeaderTable8.addCell(new Phrase("", tabletext));
		HeaderTable8.addCell(new Phrase("", tabletext));

	
					document.add(HeaderTable8);
					HeaderTable8.flushContent();

					HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable1.addCell(new Phrase("            ", header));
					HeaderTable1.addCell(new Phrase("            ", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();


					PdfPTable HeaderTable12 = new PdfPTable(5);
					int[] headerwidth12 = { 20, 60, 20, 20, 20 };
					HeaderTable12.setWidths(headerwidth12);
					HeaderTable12.setWidthPercentage(95f);
					HeaderTable12.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
			

					document.add(HeaderTable12);
					HeaderTable12.flushContent();
					
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
					
					HeaderTable6.getDefaultCell().setBorder(
							Rectangle.TOP);
			
					document.add(HeaderTable6);
					HeaderTable6.flushContent(); 
		%>
	
	<%
				
														
			/* 	HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader)); */
				
				
		%>
	//Patient Sale Due Collection
	 <c:forEach items="${patientSettleBill}" var="row" varStatus="count"> 

		<%
		
		HeaderTableTitle.addCell(new Phrase("Patient Sale Due Collection",tabletext1));
		//HeaderTableTitle.addCell(new Phrase("Due Collection",tabletext1));
		 HeaderTableTitle.addCell(new Phrase("", subheader));
		HeaderTableTitle.addCell(new Phrase("", subheader));
		HeaderTableTitle.addCell(new Phrase("", subheader));
		HeaderTableTitle.addCell(new Phrase("", subheader)); 
		 HeaderTableTitle.addCell(new Phrase("", subheader));

		document.add(HeaderTableTitle);
		HeaderTableTitle.flushContent();
		
					PdfPTable HeaderTable41 = new PdfPTable(6);
					int[] headerwidth41 = { 14, 10, 5, 15, 10, 10 };
					HeaderTable41.setWidths(headerwidth41);
					HeaderTable41.setWidthPercentage(95f);
					HeaderTable41.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					
					/* HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader)); */
					
					HeaderTable41
							.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41
							.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));

					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", tabletext));
					PdfPCell cell01 = new PdfPCell(new Phrase("", subheader));
					cell01.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell01.setBorder(Rectangle.NO_BORDER);
					HeaderTable41.addCell(cell01);

					HeaderTable41.addCell(new Phrase("", tabletext));

					PdfPCell cell12 = new PdfPCell(new Phrase("", subheader));
					cell12.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell12.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell12);

					HeaderTable41.addCell(new Phrase("", tabletext));

					document.add(HeaderTable41);
					HeaderTable41.flushContent();
					
					
					PdfPTable HeaderTable61 = new PdfPTable(6);
					int[] headerwidth61 = { 12, 7, 15, 15, 10, 10 };
					HeaderTable61.setWidths(headerwidth61);
					HeaderTable61.setWidthPercentage(95f);
					HeaderTable61.getDefaultCell().setBorder(
							Rectangle.BOTTOM);

					HeaderTable61.addCell(new Phrase("", tabletext));
					HeaderTable61.addCell(new Phrase("", tabletext));
					HeaderTable61.addCell(new Phrase("", tabletext));
					HeaderTable61.addCell(new Phrase("", tabletext));
					HeaderTable61.addCell(new Phrase("", tabletext));
					HeaderTable61.addCell(new Phrase("", tabletext));

					HeaderTable61.addCell(new Phrase("#", subheader));
					HeaderTable61.addCell(new Phrase("Bill Id",
							subheader));
					
					HeaderTable61.addCell(new Phrase("Date",
							subheader));
				
					HeaderTable61.addCell(new Phrase("Amount balance", subheader)); 
					/* HeaderTable6.addCell(new Phrase("", subheader)); */

					 PdfPCell mrpCell1 = new PdfPCell(new Phrase(
							"Amount Receive", subheader));
					mrpCell1.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell1.setBorder(Rectangle.BOTTOM);
					HeaderTable61.addCell(mrpCell1);

					PdfPCell batchNumberCell1 = new PdfPCell(new Phrase(
							"Discount", subheader));
					batchNumberCell1
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					batchNumberCell1.setBorder(Rectangle.BOTTOM);
					HeaderTable61.addCell(batchNumberCell1);

					

					document.add(HeaderTable61);
					HeaderTable61.flushContent();

					HeaderTable61.getDefaultCell().setBorder(
							Rectangle.NO_BORDER);

					HeaderTable61.addCell(new Phrase("", tabletext));
					HeaderTable61.addCell(new Phrase("", tabletext));
					HeaderTable61.addCell(new Phrase("", tabletext));
					HeaderTable61.addCell(new Phrase("", tabletext));
					HeaderTable61.addCell(new Phrase("", tabletext));
					HeaderTable61.addCell(new Phrase("", tabletext)); 
		%>
		
		 <c:forEach items="${row.purchaseSlaves}" var="slaves"
			varStatus="count">
     
			<c:set var="productName" value="${slaves.productMaster.productName }" />
			<c:set var="batchCode" value="${slaves.batchCode }" />
			<c:set var="qty" value="${slaves.purSlaveQty }" />
			<c:set var="rate" value="${slaves.purSlaveBillRate }" />
			<c:set var="amount" value="${slaves.purSlaveAmt }" />
			<c:set var="counter" value="${(count.index)+1}" /> 
		
			<%
				 String counter = ""
									+ (String) pageContext.getAttribute("counter")
											.toString();

							//for credit note slaves

							String productName = "";
							if (pageContext.getAttribute("productName") == null) {
								productName = "";
							} else {

								productName = productName
										+ (String) pageContext.getAttribute(
												"productName").toString();
							}

							String qty = "";
							if (pageContext.getAttribute("qty") == null) {
								qty = "";
							} else {

								qty = qty
										+ (String) pageContext.getAttribute("qty")
												.toString();
							}

							String batchCode = "";
							if (pageContext.getAttribute("batchCode") == null) {
								batchCode = "";
							} else {

								batchCode = batchCode
										+ (String) pageContext.getAttribute(
												"batchCode").toString();
							}

							patsaleduenetTotalamtbalance=patsaleduenetTotalamtbalance+ Double.parseDouble(batchCode);
							
							String rate = "";
							if (pageContext.getAttribute("rate") == null) {
								rate = "";
							} else {

								rate = rate
										+ (String) pageContext.getAttribute("rate")
												.toString();
							}

							String amount = "";
							if (pageContext.getAttribute("amount") == null) {
								amount = "";
							} else {

								amount = amount
										+ (String) pageContext.getAttribute(
												"amount").toString();
							}
							
							patsaleduenetTotal=patsaleduenetTotal+ Double.parseDouble(amount);
							
							HeaderFooter header1 = new HeaderFooter(new Phrase("",
									tabletext), true);
							header1.setAlignment(Element.ALIGN_RIGHT);
							header1.setBorderWidthBottom(0);
							document.setHeader(header1);

							HeaderTable61.addCell(new Phrase(counter, tabletext));
							HeaderTable61
									.addCell(new Phrase(qty, tabletext));
							HeaderTable61
							.addCell(new Phrase(productName, tabletext));
						
							HeaderTable61.addCell(new Phrase(batchCode, tabletext));
							// HeaderTable6.addCell(new Phrase(receiptNo, tabletext)); 
							
							PdfPCell cell22 = new PdfPCell(new Phrase(amount,
									tabletext));
							cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell22.setBorder(Rectangle.NO_BORDER);
							HeaderTable61.addCell(cell22);

							PdfPCell cell2 = new PdfPCell(new Phrase(rate,
									tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable61.addCell(cell2);

							

							document.add(HeaderTable61);
							HeaderTable61.flushContent(); 

							/* HeaderTable6.getDefaultCell().setBorder(
									Rectangle.BOTTOM); */
							
			%>
			
		 </c:forEach>
		 //////////////////////
		<%
					 PdfPTable HeaderTable8patsaledue = new PdfPTable(6);
					 int[] headerwidth9 = { 12, 20, 7, 15, 10, 10 };
					 HeaderTable8.setWidths(headerwidth8);
					 HeaderTable8.setWidthPercentage(95f);
					// HeaderTable8.getDefaultCell().setBorder(Rectangle.BOTTOM);

					 //HeaderTable8.getDefaultCell().setBorder(Rectangle.BOTTOM);
					 HeaderTable8.addCell(new Phrase("", tabletext));
					 HeaderTable8.addCell(new Phrase("", tabletext));
					 HeaderTable8.addCell(new Phrase("", tabletext));
					 HeaderTable8.addCell(new Phrase("", tabletext));
					 HeaderTable8.addCell(new Phrase("", tabletext));
					 HeaderTable8.addCell(new Phrase("", tabletext));

					 document.add(HeaderTable8);
					 HeaderTable8.flushContent();
					 
					 PdfPCell cellsOfTotalpatsaledue1 = new PdfPCell(new Phrase("", tabletext));
					 cellsOfTotalpatsaledue1.setHorizontalAlignment(Element.ALIGN_CENTER);
					 cellsOfTotalpatsaledue1.setBorder(Rectangle.BOTTOM);
					 HeaderTable61.addCell(cellsOfTotalpatsaledue1);
					 
					 PdfPCell cellsOfTotalpatsaledue2 = new PdfPCell(new Phrase("", tabletext));
					 cellsOfTotalpatsaledue2.setHorizontalAlignment(Element.ALIGN_CENTER);
					 cellsOfTotalpatsaledue2.setBorder(Rectangle.BOTTOM);
					 HeaderTable61.addCell(cellsOfTotalpatsaledue2);

					 PdfPCell cellsOfTotal3patsaledue = new PdfPCell(new Phrase("Total :", tabletext));
					 cellsOfTotal3patsaledue.setHorizontalAlignment(Element.ALIGN_LEFT);
					 cellsOfTotal3patsaledue.setBorder(Rectangle.BOTTOM);
					 HeaderTable61.addCell(cellsOfTotal3patsaledue);

					// PdfPCell cellsOfTotal4patsaledue = new PdfPCell(new Phrase("" + (Math.round(patsaleduenetTotalamtbalance * 100.0) / 100.0), tabletext));
					 PdfPCell cellsOfTotal4patsaledue = new PdfPCell(new Phrase("" + patsaleduenetTotalamtbalance , tabletext));
					 cellsOfTotal4patsaledue.setHorizontalAlignment(Element.ALIGN_LEFT);
					 cellsOfTotal4patsaledue.setBorder(Rectangle.BOTTOM);
					 HeaderTable61.addCell(cellsOfTotal4patsaledue);

					 //PdfPCell cellsOfTotal5patsaledue = new PdfPCell(new Phrase("" + (Math.round(patsaleduenetTotal * 100.0) / 100.0), tabletext));
					PdfPCell cellsOfTotal5patsaledue = new PdfPCell(new Phrase("" + (patsaleduenetTotal), tabletext));
					cellsOfTotal5patsaledue.setHorizontalAlignment(Element.ALIGN_CENTER);
					 cellsOfTotal5patsaledue.setBorder(Rectangle.BOTTOM);
					 HeaderTable61.addCell(cellsOfTotal5patsaledue);

					 PdfPCell cellsOfTotal6patsaledue = new PdfPCell(new Phrase("", subheader));
					 cellsOfTotal6patsaledue.setHorizontalAlignment(Element.ALIGN_CENTER);
					 cellsOfTotal6patsaledue.setBorder(Rectangle.BOTTOM);
					 HeaderTable61.addCell(cellsOfTotal6patsaledue);

					 PdfPCell cellsOfTotal6patsaledue1 = new PdfPCell(new Phrase("", subheader));
					 cellsOfTotal6patsaledue1.setHorizontalAlignment(Element.ALIGN_CENTER);
					 cellsOfTotal6patsaledue1.setBorder(Rectangle.BOTTOM);
					 HeaderTable61.addCell(cellsOfTotal6patsaledue1);

					 PdfPCell cellsOfTotal6patsaledue11 = new PdfPCell(new Phrase("", subheader));
					 cellsOfTotal6patsaledue11.setHorizontalAlignment(Element.ALIGN_CENTER);
					 cellsOfTotal6patsaledue11.setBorder(Rectangle.BOTTOM);
					 HeaderTable61.addCell(cellsOfTotal6patsaledue11);

					 document.add(HeaderTable61);
					 HeaderTable61.flushContent();

					 %>
	////////////////
		 </c:forEach> 
			<%
			
		 	/* PdfPTable HeaderTable81 = new PdfPTable(6);
			int[] headerwidth81 = { 12, 20, 7, 15,10,10};
			HeaderTable81.setWidths(headerwidth81);
			HeaderTable81.setWidthPercentage(95f);
			HeaderTable81.getDefaultCell().setBorder(Rectangle.BOTTOM);
			
		HeaderTable81.getDefaultCell().setBorder(Rectangle.BOTTOM);
		HeaderTable81.addCell(new Phrase("", tabletext));
		HeaderTable81.addCell(new Phrase("", tabletext));
		HeaderTable81.addCell(new Phrase("", tabletext));
		HeaderTable81.addCell(new Phrase("", tabletext));
		HeaderTable81.addCell(new Phrase("", tabletext));
		HeaderTable81.addCell(new Phrase("", tabletext));

					document.add(HeaderTable81);
					HeaderTable81.flushContent(); */

					HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable1.addCell(new Phrase("            ", header));
					HeaderTable1.addCell(new Phrase("            ", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();

					PdfPTable HeaderTable121 = new PdfPTable(5);
					int[] headerwidth121 = { 20, 60, 20, 20, 20 };
					HeaderTable121.setWidths(headerwidth12);
					HeaderTable121.setWidthPercentage(95f);
					HeaderTable121.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
			
					document.add(HeaderTable12);
					HeaderTable12.flushContent();
					
					PdfPTable HeaderTable42 = new PdfPTable(6);
					int[] headerwidth42 = { 14, 10, 5, 15, 10, 10 };
					HeaderTable42.setWidths(headerwidth42);
					HeaderTable42.setWidthPercentage(95f);
					HeaderTable42.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
																		
								HeaderTableTitle.addCell(new Phrase("", subheader));
								HeaderTableTitle.addCell(new Phrase("", subheader));
								HeaderTableTitle.addCell(new Phrase("", subheader));
								HeaderTableTitle.addCell(new Phrase("", subheader));
								HeaderTableTitle.addCell(new Phrase("", subheader));
								HeaderTableTitle.addCell(new Phrase("", subheader));
								
								HeaderTableTitle.addCell(new Phrase("", subheader));
								HeaderTableTitle.addCell(new Phrase("", subheader));
								HeaderTableTitle.addCell(new Phrase("", subheader));
								HeaderTableTitle.addCell(new Phrase("", subheader));
								HeaderTableTitle.addCell(new Phrase("", subheader));
								HeaderTableTitle.addCell(new Phrase("", subheader));
								
								HeaderTableTitle.addCell(new Phrase("Indent Sale",tabletext1));
								HeaderTableTitle.addCell(new Phrase("", subheader));
								HeaderTableTitle.addCell(new Phrase("", subheader));
								HeaderTableTitle.addCell(new Phrase("", subheader));
								HeaderTableTitle.addCell(new Phrase("", subheader));
								HeaderTableTitle.addCell(new Phrase("", subheader));

								document.add(HeaderTableTitle);
								HeaderTableTitle.flushContent();
					
					
					/* HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader)); */
					
					HeaderTable42
							.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42
							.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));

					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", tabletext));
					PdfPCell cell02 = new PdfPCell(new Phrase("", subheader));
					cell02.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell02.setBorder(Rectangle.NO_BORDER);
					HeaderTable42.addCell(cell02);

					HeaderTable42.addCell(new Phrase("", tabletext));

					PdfPCell cell12 = new PdfPCell(new Phrase("", subheader));
					cell12.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell12.setBorder(Rectangle.NO_BORDER);
					HeaderTable42.addCell(cell12);
					HeaderTable42.addCell(new Phrase("", tabletext));
					document.add(HeaderTable42);
					HeaderTable42.flushContent();
					
					PdfPTable HeaderTable62 = new PdfPTable(6);
					int[] headerwidth62 = { 12, 20, 7, 15, 10, 10 };
					HeaderTable62.setWidths(headerwidth62);
					HeaderTable62.setWidthPercentage(95f);
					HeaderTable62.getDefaultCell().setBorder(
							Rectangle.BOTTOM);

					HeaderTable62.addCell(new Phrase("", tabletext));
					HeaderTable62.addCell(new Phrase("", tabletext));
					HeaderTable62.addCell(new Phrase("", tabletext));
					HeaderTable62.addCell(new Phrase("", tabletext));
					HeaderTable62.addCell(new Phrase("", tabletext));
					HeaderTable62.addCell(new Phrase("", tabletext));

					HeaderTable62.addCell(new Phrase("#", subheader));
					HeaderTable62.addCell(new Phrase("Bill No",
							subheader));
					HeaderTable62.addCell(new Phrase("Date", subheader)); 
					/* HeaderTable6.addCell(new Phrase("", subheader)); */

				 	PdfPCell mrpCell2 = new PdfPCell(new Phrase(
							"Bill Mode", subheader));
					mrpCell2.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell2.setBorder(Rectangle.BOTTOM);
					HeaderTable62.addCell(mrpCell2);

					PdfPCell batchNumberCell2 = new PdfPCell(new Phrase(
							"Net Amt", subheader));
					batchNumberCell2
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					batchNumberCell2.setBorder(Rectangle.BOTTOM);
					HeaderTable62.addCell(batchNumberCell2);

					PdfPCell cells2 = new PdfPCell(new Phrase("Amt Receive",
							subheader));
					cells2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cells2.setBorder(Rectangle.BOTTOM);
					HeaderTable62.addCell(cells2);

					document.add(HeaderTable62);
					HeaderTable62.flushContent();

					HeaderTable62.getDefaultCell().setBorder(
							Rectangle.NO_BORDER);

					HeaderTable62.addCell(new Phrase("", tabletext));
					HeaderTable62.addCell(new Phrase("", tabletext));
					HeaderTable62.addCell(new Phrase("", tabletext));
					HeaderTable62.addCell(new Phrase("", tabletext));
					HeaderTable62.addCell(new Phrase("", tabletext));
					HeaderTable62.addCell(new Phrase("", tabletext)); 
					
		%>
		
		
	
//Indent Sale
 <c:forEach items="${indentData}" var="row" varStatus="count">

		<c:set var="credtiNoteId" value="${row.indentSaleInvoiceNo}" />
		<c:set var="date" value="${row.date}" />
		<c:set var="billMode" value="${row.billMode}" />
		<c:set var="amount" value="${row.amount}" />
		<c:set var="amountReceive" value="${row.amountReceive}" />
		<c:set var="counter" value="${(count.index)+1}" />
		

		<%
		       String counter = ""
				      + (String) pageContext.getAttribute("counter")
						.toString();
		
					String creditNoteId = ""
							+ (String) pageContext.getAttribute("credtiNoteId")
									.toString();
		
		            String date = ""
				            + (String) pageContext.getAttribute("date")
						             .toString();
		
		            String saleDate = "";
					String splitSaleDate[];
					String saleDate1 = "";

						splitSaleDate = date.split("/");
						saleDate1 = splitSaleDate[2]+"/"+splitSaleDate[1]+"/"+splitSaleDate[0];
					

					String billMode = "";
					if (pageContext.getAttribute("billMode") == null) {
						billMode= "";
					} else {

						billMode = billMode
								+ (String) pageContext.getAttribute(
										"billMode").toString();
					}

					String amount = "";
					if (pageContext.getAttribute("amount") == null) {
						amount = "";
					} else {
						amount = amount
								+ (String) pageContext.getAttribute("amount")
										.toString();
					}

					indentTotalnetamt=indentTotalnetamt+ Double.parseDouble(amount);
					
					String amountReceive = "";
					if (pageContext.getAttribute("amountReceive") == null) {
						amountReceive = "";
					} else {
						amountReceive = amountReceive
								+ (String) pageContext.getAttribute(
										"amountReceive").toString();
					} 
				
					indentTotalamt=indentTotalamt+ Double.parseDouble(amountReceive);
					
		%>
			<%
							 HeaderFooter header1 = new HeaderFooter(new Phrase("",
									tabletext), true);
							header1.setAlignment(Element.ALIGN_RIGHT);
							header1.setBorderWidthBottom(0);
							document.setHeader(header1);

							HeaderTable62.addCell(new Phrase(counter, tabletext));
							HeaderTable62
									.addCell(new Phrase(creditNoteId, tabletext));
							HeaderTable62.addCell(new Phrase(date, tabletext));
							 //HeaderTable6.addCell(new Phrase(receiptNo, tabletext)); 

							PdfPCell cell22 = new PdfPCell(new Phrase(billMode,
									tabletext));
							cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell22.setBorder(Rectangle.NO_BORDER);
							HeaderTable62.addCell(cell22);

							PdfPCell cell2 = new PdfPCell(new Phrase(amount,
									tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable62.addCell(cell2);

							PdfPCell vatcell11 = new PdfPCell(new Phrase(amountReceive,
									tabletext));
							vatcell11.setHorizontalAlignment(Element.ALIGN_CENTER);
							vatcell11.setBorder(Rectangle.NO_BORDER);
							HeaderTable62.addCell(vatcell11);

							document.add(HeaderTable62);
							HeaderTable62.flushContent(); 
							
							

							/* HeaderTable6.getDefaultCell().setBorder(
									Rectangle.BOTTOM); */
							
			%>
		</c:forEach> 
		<%
		PdfPTable HeaderTable82 = new PdfPTable(6);
 		int[] headerwidth82 = { 12, 20, 7, 15, 10, 10 };
 		HeaderTable82.setWidths(headerwidth82);
 		HeaderTable82.setWidthPercentage(95f);
 		HeaderTable82.getDefaultCell().setBorder(Rectangle.BOTTOM);

 		HeaderTable82.getDefaultCell().setBorder(Rectangle.BOTTOM);
 		HeaderTable82.addCell(new Phrase("", tabletext));
 		HeaderTable82.addCell(new Phrase("", tabletext));
 		HeaderTable82.addCell(new Phrase("", tabletext));
 		HeaderTable82.addCell(new Phrase("", tabletext));
 		HeaderTable82.addCell(new Phrase("", tabletext));
 		HeaderTable82.addCell(new Phrase("", tabletext));

 		document.add(HeaderTable82);
 		HeaderTable82.flushContent();

		
		
		PdfPCell indentvatcell = new PdfPCell(new Phrase(" ",
				tabletext));
		indentvatcell.setHorizontalAlignment(Element.ALIGN_CENTER);
		indentvatcell.setBorder(Rectangle.NO_BORDER);
		HeaderTable62.addCell(indentvatcell);
		
		PdfPCell indentvatcell1 = new PdfPCell(new Phrase(" ",
				tabletext));
		indentvatcell1.setHorizontalAlignment(Element.ALIGN_CENTER);
		indentvatcell1.setBorder(Rectangle.NO_BORDER);
		HeaderTable62.addCell(indentvatcell1);
		
		PdfPCell indentvatcell2 = new PdfPCell(new Phrase(" ",
				tabletext));
		indentvatcell2.setHorizontalAlignment(Element.ALIGN_CENTER);
		indentvatcell2.setBorder(Rectangle.NO_BORDER);
		HeaderTable62.addCell(indentvatcell2);
		
		PdfPCell indentvatcell3 = new PdfPCell(new Phrase("Total :",
				tabletext));
		indentvatcell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		indentvatcell3.setBorder(Rectangle.NO_BORDER);
		HeaderTable62.addCell(indentvatcell3);
		
		PdfPCell indentvatcell4 = new PdfPCell(new Phrase(" "+indentTotalnetamt,
				tabletext));
		indentvatcell4.setHorizontalAlignment(Element.ALIGN_CENTER);
		indentvatcell4.setBorder(Rectangle.NO_BORDER);
		HeaderTable62.addCell(indentvatcell4);
		
		PdfPCell indentvatcell5 = new PdfPCell(new Phrase(" "+ indentTotalamt,
				tabletext));
		indentvatcell5.setHorizontalAlignment(Element.ALIGN_CENTER);
		indentvatcell5.setBorder(Rectangle.NO_BORDER);
		HeaderTable62.addCell(indentvatcell5);
		
		

		document.add(HeaderTable62);
		HeaderTable62.flushContent(); 
		
 		/* PdfPTable HeaderTable13 = new PdfPTable(5);
 		int[] headerwidth13 = { 20, 60, 20, 20, 20 };
 		HeaderTable13.setWidths(headerwidth12);
 		HeaderTable13.setWidthPercentage(95f);
 		HeaderTable13.getDefaultCell().setBorder(Rectangle.NO_BORDER);

 		document.add(HeaderTable13);
 		HeaderTable13.flushContent(); */
 		
 		
		
		HeaderTable82.getDefaultCell().setBorder(Rectangle.BOTTOM);
 		HeaderTable82.addCell(new Phrase("", tabletext));
 		HeaderTable82.addCell(new Phrase("", tabletext));
 		HeaderTable82.addCell(new Phrase("", tabletext));
 		HeaderTable82.addCell(new Phrase("", tabletext));
 		HeaderTable82.addCell(new Phrase("", tabletext));
 		HeaderTable82.addCell(new Phrase("", tabletext));

 		document.add(HeaderTable82);
 		HeaderTable82.flushContent();
 		%>
		
		<%
		
				HeaderTable62.addCell(new Phrase("", tabletext));
				HeaderTable62.addCell(new Phrase("", tabletext));
				HeaderTable62.addCell(new Phrase("", tabletext));
				HeaderTable62.addCell(new Phrase("", tabletext));
				HeaderTable62.addCell(new Phrase("", tabletext));
				HeaderTable62.addCell(new Phrase("", tabletext));
				HeaderTable62.addCell(new Phrase("", tabletext));
				HeaderTable62.addCell(new Phrase("", tabletext));
				HeaderTable62.addCell(new Phrase("", tabletext));
				
				
				HeaderTable62.getDefaultCell().setBorder(
						Rectangle.TOP);
		
				document.add(HeaderTable62);
				HeaderTable62.flushContent();
		%>
	
	<%
														
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				
			
		%>
	//Indent Sale Due Collection

	 <c:forEach items="${indentSettleBill}" var="row" varStatus="count"> 

		 <%
		
		HeaderTableTitle.addCell(new Phrase("Indent Sale Due Collection",tabletext1));
		//HeaderTableTitle.addCell(new Phrase("Due Collection", tabletext1));
		HeaderTableTitle.addCell(new Phrase("", subheader));
		HeaderTableTitle.addCell(new Phrase("", subheader));
		HeaderTableTitle.addCell(new Phrase("", subheader));
		HeaderTableTitle.addCell(new Phrase("", subheader));
		HeaderTableTitle.addCell(new Phrase("", subheader));

		document.add(HeaderTableTitle);
		HeaderTableTitle.flushContent();
		
					PdfPTable HeaderTable43 = new PdfPTable(6);
					int[] headerwidth43 = { 14, 10, 5, 15, 10, 10 };
					HeaderTable43.setWidths(headerwidth43);
					HeaderTable43.setWidthPercentage(95f);
					HeaderTable43.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					/* HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader));
					
					HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader));
					
					HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader)); */
					
					HeaderTable43
							.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43
							.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", subheader));

					HeaderTable43.addCell(new Phrase("", subheader));
					HeaderTable43.addCell(new Phrase("", tabletext));
					PdfPCell cell03 = new PdfPCell(new Phrase("", subheader));
					cell03.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell03.setBorder(Rectangle.NO_BORDER);
					HeaderTable43.addCell(cell03);

					HeaderTable43.addCell(new Phrase("", tabletext));

					PdfPCell cell13 = new PdfPCell(new Phrase("", subheader));
					cell13.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell13.setBorder(Rectangle.NO_BORDER);
					HeaderTable43.addCell(cell13);

					HeaderTable43.addCell(new Phrase("", tabletext));

					document.add(HeaderTable43);
					HeaderTable43.flushContent();
					
					
					PdfPTable HeaderTable63 = new PdfPTable(6);
					int[] headerwidth63 = { 12, 7, 15, 15, 10, 10 };
					HeaderTable63.setWidths(headerwidth63);
					HeaderTable63.setWidthPercentage(95f);
					HeaderTable63.getDefaultCell().setBorder(
							Rectangle.BOTTOM);

					HeaderTable63.addCell(new Phrase("", tabletext));
					HeaderTable63.addCell(new Phrase("", tabletext));
					HeaderTable63.addCell(new Phrase("", tabletext));
					HeaderTable63.addCell(new Phrase("", tabletext));
					HeaderTable63.addCell(new Phrase("", tabletext));
					HeaderTable63.addCell(new Phrase("", tabletext));

					HeaderTable63.addCell(new Phrase("#", subheader));
					HeaderTable63.addCell(new Phrase("Bill Id",
							subheader));
					HeaderTable63.addCell(new Phrase("Date",
							subheader));

					/* PdfPCell cells3 = new PdfPCell(new Phrase("Date",
							subheader));
					cells3.setHorizontalAlignment(Element.ALIGN_CENTER);
					cells3.setBorder(Rectangle.BOTTOM);
					HeaderTable63.addCell(cells3); */

					HeaderTable63.addCell(new Phrase("Amount Balance", subheader));
					/* HeaderTable6.addCell(new Phrase("", subheader)); */

					PdfPCell mrpCell3 = new PdfPCell(new Phrase(
							"Amount Receive", subheader));
					mrpCell3.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell3.setBorder(Rectangle.BOTTOM);
					HeaderTable63.addCell(mrpCell3);

					PdfPCell batchNumberCell3 = new PdfPCell(new Phrase(
							"Discount", subheader));
					batchNumberCell3
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					batchNumberCell3.setBorder(Rectangle.BOTTOM);
					HeaderTable63.addCell(batchNumberCell3);

					document.add(HeaderTable63);
					HeaderTable63.flushContent();

					HeaderTable63.getDefaultCell().setBorder(
							Rectangle.NO_BORDER);

					HeaderTable63.addCell(new Phrase("", tabletext));
					HeaderTable63.addCell(new Phrase("", tabletext));
					HeaderTable63.addCell(new Phrase("", tabletext));
					HeaderTable63.addCell(new Phrase("", tabletext));
					HeaderTable63.addCell(new Phrase("", tabletext));
					HeaderTable63.addCell(new Phrase("", tabletext));
		%> 
		
		 <c:forEach items="${row.debitNoteSlave}" var="slaves"
			varStatus="count">

			<c:set var="productName" value="${slaves.productMaster.productName }" />
			<c:set var="batchCode" value="${slaves.debitNoteSlaveBatchCode }" />
			<c:set var="qty" value="${slaves.debitNoteSlaveQty }" />
			<c:set var="rate" value="${slaves.debitNoteSlaveRate }" />
			<c:set var="amount" value="${slaves.debitNoteSlaveAmt }" />
			<c:set var="counter" value="${(count.index)+1}" /> --%>
			
			<%
				 String counter = ""
									+ (String) pageContext.getAttribute("counter")
											.toString();

							//for credit note slaves

							String productName = "";
							if (pageContext.getAttribute("productName") == null) {
								productName = "-";
							} else {

								productName = productName
										+ (String) pageContext.getAttribute(
												"productName").toString();
							}

							String qty = "";
							if (pageContext.getAttribute("qty") == null) {
								qty = "-";
							} else {

								qty = qty
										+ (String) pageContext.getAttribute("qty")
												.toString();
							}

							String batchCode = "";
							if (pageContext.getAttribute("batchCode") == null) {
								batchCode = "-";
							} else {

								batchCode = batchCode
										+ (String) pageContext.getAttribute(
												"batchCode").toString();
							}
							 
							indentdueamtbal  = indentdueamtbal + Double.parseDouble(batchCode);

							String rate = "";
							if (pageContext.getAttribute("rate") == null) {
								rate = "0";
							} else {

								rate = rate
										+ (String) pageContext.getAttribute("rate")
												.toString();
							}

							String amount = "";
							if (pageContext.getAttribute("amount") == null) {
								amount = "-";
							} else {

								amount = amount
										+ (String) pageContext.getAttribute(
												"amount").toString();
							}

							indentduetotalamt = indentduetotalamt + Double.parseDouble(amount);
							HeaderFooter header1 = new HeaderFooter(new Phrase("",
									tabletext), true);
							header1.setAlignment(Element.ALIGN_RIGHT);
							header1.setBorderWidthBottom(0);
							document.setHeader(header1);
					
							HeaderTable63.addCell(new Phrase(counter, tabletext));
							HeaderTable63.addCell(new Phrase(qty, tabletext));
							HeaderTable63.addCell(new Phrase(productName, tabletext));
							/* PdfPCell vatcell11 = new PdfPCell(new Phrase(productName,
									tabletext));
							vatcell11.setHorizontalAlignment(Element.ALIGN_CENTER);
							vatcell11.setBorder(Rectangle.NO_BORDER);
							HeaderTable63.addCell(vatcell11); */
							HeaderTable63.addCell(new Phrase(batchCode+"", tabletext));
							 //HeaderTable6.addCell(new Phrase(receiptNo, tabletext)); *

							PdfPCell cell22 = new PdfPCell(new Phrase(amount,
									tabletext));
							cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell22.setBorder(Rectangle.NO_BORDER);
							HeaderTable63.addCell(cell22);

							PdfPCell cell2 = new PdfPCell(new Phrase(rate,
									tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable63.addCell(cell2);

							document.add(HeaderTable63);
							HeaderTable63.flushContent(); 
					
							/* HeaderTable6.getDefaultCell().setBorder(
									Rectangle.BOTTOM); */
							
			%>
		 </c:forEach> 
			<%
			
 				PdfPTable HeaderTable83 = new PdfPTable(6);
 			int[] headerwidth83 = { 12, 20, 7, 15, 10, 10 };
 			HeaderTable83.setWidths(headerwidth8);
 			HeaderTable83.setWidthPercentage(95f);
 			HeaderTable83.getDefaultCell().setBorder(Rectangle.BOTTOM);

 			HeaderTable83.getDefaultCell().setBorder(Rectangle.BOTTOM);
 			HeaderTable83.addCell(new Phrase("", tabletext));
 			HeaderTable83.addCell(new Phrase("", tabletext));
 			HeaderTable83.addCell(new Phrase("", tabletext));
 			HeaderTable83.addCell(new Phrase("", tabletext));
 			HeaderTable83.addCell(new Phrase("", tabletext));
 			HeaderTable83.addCell(new Phrase("", tabletext));

 			document.add(HeaderTable83);
 			HeaderTable83.flushContent();

 			PdfPCell cell131 = new PdfPCell(new Phrase("", subheader));
 			cell131.setHorizontalAlignment(Element.ALIGN_CENTER);
 			cell131.setBorder(Rectangle.NO_BORDER);
 			HeaderTable63.addCell(cell131);
 			
 			/* PdfPCell cell137 = new PdfPCell(new Phrase("", subheader));
 			cell137.setHorizontalAlignment(Element.ALIGN_CENTER);
 			cell137.setBorder(Rectangle.NO_BORDER);
 			HeaderTable63.addCell(cell137); */
 			
 			PdfPCell cell135 = new PdfPCell(new Phrase("", tabletext));
 			cell135.setHorizontalAlignment(Element.ALIGN_CENTER);
 			cell135.setBorder(Rectangle.NO_BORDER);
 			HeaderTable63.addCell(cell135);

 			PdfPCell cell132 = new PdfPCell(new Phrase("Total :", tabletext));
 			cell132.setHorizontalAlignment(Element.ALIGN_LEFT);
 			cell132.setBorder(Rectangle.NO_BORDER);
 			HeaderTable63.addCell(cell132);

 			PdfPCell cell133 = new PdfPCell(new Phrase("" + indentdueamtbal, tabletext));
 			cell133.setHorizontalAlignment(Element.ALIGN_LEFT);
 			cell133.setBorder(Rectangle.NO_BORDER);
 			HeaderTable63.addCell(cell133);

 			PdfPCell cell134 = new PdfPCell(new Phrase("" + indentduetotalamt, tabletext));
 			cell134.setHorizontalAlignment(Element.ALIGN_CENTER);
 			cell134.setBorder(Rectangle.NO_BORDER);
 			HeaderTable63.addCell(cell134);

 			

 			PdfPCell cell136 = new PdfPCell(new Phrase("", subheader));
 			cell136.setHorizontalAlignment(Element.ALIGN_CENTER);
 			cell136.setBorder(Rectangle.NO_BORDER);
 			HeaderTable63.addCell(cell136);

 			document.add(HeaderTable63);
 			HeaderTable63.flushContent();

 			HeaderTable83.getDefaultCell().setBorder(Rectangle.BOTTOM);
 			HeaderTable83.addCell(new Phrase("", tabletext));
 			HeaderTable83.addCell(new Phrase("", tabletext));
 			HeaderTable83.addCell(new Phrase("", tabletext));
 			HeaderTable83.addCell(new Phrase("", tabletext));
 			HeaderTable83.addCell(new Phrase("", tabletext));
 			HeaderTable83.addCell(new Phrase("", tabletext));

 			document.add(HeaderTable83);
 			HeaderTable83.flushContent();

 			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
 			HeaderTable1.addCell(new Phrase("            ", header));
 			HeaderTable1.addCell(new Phrase("            ", header));
 			document.add(HeaderTable1);
 			HeaderTable1.flushContent();

 			PdfPTable HeaderTable122 = new PdfPTable(5);
 			int[] headerwidth122 = { 20, 60, 20, 20, 20 };
 			HeaderTable122.setWidths(headerwidth12);
 			HeaderTable122.setWidthPercentage(95f);
 			HeaderTable122.getDefaultCell().setBorder(Rectangle.NO_BORDER);

 			document.add(HeaderTable122);
 			HeaderTable122.flushContent();
 			%>
		
	</c:forEach> 
	
	<%
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				
				
				HeaderTableTitle.addCell(new Phrase("Credit Note",tabletext1));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));

				document.add(HeaderTableTitle);
				HeaderTableTitle.flushContent();

				PdfPTable HeaderTable44 = new PdfPTable(6);
				int[] headerwidth44 = { 14, 10, 5, 15, 10, 10 };
				HeaderTable44.setWidths(headerwidth44);
				HeaderTable44.setWidthPercentage(95f);
				HeaderTable44.getDefaultCell()
						.setBorder(Rectangle.NO_BORDER);

				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				
				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				
				/* HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				
				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", subheader)); */

				HeaderTable44.addCell(new Phrase("", subheader));
				HeaderTable44.addCell(new Phrase("", tabletext));
				PdfPCell cell04 = new PdfPCell(new Phrase("", subheader));
				cell04.setHorizontalAlignment(Element.ALIGN_CENTER);
				cell04.setBorder(Rectangle.NO_BORDER);
				HeaderTable44.addCell(cell04);

				HeaderTable44.addCell(new Phrase("", tabletext));

				PdfPCell cell14 = new PdfPCell(new Phrase("", subheader));
				cell14.setHorizontalAlignment(Element.ALIGN_CENTER);
				cell14.setBorder(Rectangle.NO_BORDER);
				HeaderTable44.addCell(cell14);

				HeaderTable44.addCell(new Phrase("", tabletext));

				document.add(HeaderTable44);
				HeaderTable44.flushContent();
				
				
				PdfPTable HeaderTable64 = new PdfPTable(6);
				int[] headerwidth64 = { 12, 20, 7, 15, 10, 10 };
				HeaderTable64.setWidths(headerwidth64);
				HeaderTable64.setWidthPercentage(95f);
				HeaderTable64.getDefaultCell().setBorder(
						Rectangle.BOTTOM);

				HeaderTable64.addCell(new Phrase("", tabletext));
				HeaderTable64.addCell(new Phrase("", tabletext));
				HeaderTable64.addCell(new Phrase("", tabletext));
				HeaderTable64.addCell(new Phrase("", tabletext));
				HeaderTable64.addCell(new Phrase("", tabletext));
				HeaderTable64.addCell(new Phrase("", tabletext));

				HeaderTable64.addCell(new Phrase("#", subheader));
				HeaderTable64.addCell(new Phrase("Credit No",
						subheader));
				HeaderTable64.addCell(new Phrase("Date", subheader));
				/* HeaderTable6.addCell(new Phrase("", subheader)); */

				PdfPCell mrpCell4 = new PdfPCell(new Phrase(
						"Bill Mode", subheader));
				mrpCell4.setHorizontalAlignment(Element.ALIGN_CENTER);
				mrpCell4.setBorder(Rectangle.BOTTOM);
				HeaderTable64.addCell(mrpCell4);

				PdfPCell batchNumberCell4 = new PdfPCell(new Phrase(
						"Net Amt", subheader));
				batchNumberCell4
						.setHorizontalAlignment(Element.ALIGN_CENTER);
				batchNumberCell4.setBorder(Rectangle.BOTTOM);
				HeaderTable64.addCell(batchNumberCell);

				PdfPCell cells4 = new PdfPCell(new Phrase("Patient Type",
						subheader));
				cells4.setHorizontalAlignment(Element.ALIGN_CENTER);
				cells4.setBorder(Rectangle.BOTTOM);
				HeaderTable64.addCell(cells4);

				document.add(HeaderTable64);
				HeaderTable64.flushContent();

				HeaderTable64.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);

				HeaderTable64.addCell(new Phrase("", tabletext));
				HeaderTable64.addCell(new Phrase("", tabletext));
				HeaderTable64.addCell(new Phrase("", tabletext));
				HeaderTable64.addCell(new Phrase("", tabletext));
				HeaderTable64.addCell(new Phrase("", tabletext));
				HeaderTable64.addCell(new Phrase("", tabletext));
		%>
 //Credit Note
<c:forEach items="${creditNote}" var="row" varStatus="count">

		<c:set var="credtiNoteId" value="${row.indentSaleId}" />
		<c:set var="date" value="${row.date}" />
		<c:set var="billMode" value="${row.billMode}" />
		<c:set var="amount" value="${row.amount}" />
		<c:set var="patientType" value="${row.patientType}" />
		<c:set var="counter" value="${(count.index)+1}" />
		<%
		
		String counter = ""
				+ (String) pageContext.getAttribute("counter")
						.toString();
		
					String creditNoteId = ""
							+ (String) pageContext.getAttribute("credtiNoteId")
									.toString();

		         String date = ""
				           + (String) pageContext.getAttribute("date")
						           .toString();
		         
		         String saleDate = "";
					String splitSaleDate[];
					String saleDate1 = "";

						splitSaleDate = date.split("-");
						saleDate1 = splitSaleDate[2]+"-"+splitSaleDate[1]+"-"+splitSaleDate[0];
		         
					String billMode = "";
					if (pageContext.getAttribute("billMode") == null) {
						billMode= "";
					} else {

						billMode = billMode
								+ (String) pageContext.getAttribute(
										"billMode").toString();
					}

					
					String amount = "";
					if (pageContext.getAttribute("amount") == null) {
						amount = "";
					} else {
						amount = amount
								+ (String) pageContext.getAttribute("amount")
										.toString();
					}
					
					creditamouttotal = creditamouttotal + Double.parseDouble(amount);
					
					String patientType = "";
					if (pageContext.getAttribute("patientType") == null) {
						patientType = "";
					} else {
						patientType = patientType
								+ (String) pageContext.getAttribute("patientType")
										.toString();
					}
					
		%>
		
			<%
							HeaderFooter header1 = new HeaderFooter(new Phrase("",
									tabletext), true);
							header1.setAlignment(Element.ALIGN_RIGHT);
							header1.setBorderWidthBottom(0);
							document.setHeader(header1);

							HeaderTable64.addCell(new Phrase(counter, tabletext));
							HeaderTable64
									.addCell(new Phrase(creditNoteId, tabletext));
							HeaderTable64.addCell(new Phrase(saleDate1, tabletext));
							/* HeaderTable6.addCell(new Phrase(receiptNo, tabletext)); */

							PdfPCell cell22 = new PdfPCell(new Phrase(billMode,
									tabletext));
							cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell22.setBorder(Rectangle.NO_BORDER);
							HeaderTable64.addCell(cell22);

							PdfPCell cell2 = new PdfPCell(new Phrase(amount,
									tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable64.addCell(cell2);

							PdfPCell vatcell11 = new PdfPCell(new Phrase(patientType,
									tabletext));
							vatcell11.setHorizontalAlignment(Element.ALIGN_CENTER);
							vatcell11.setBorder(Rectangle.NO_BORDER);
							HeaderTable64.addCell(vatcell11);

							document.add(HeaderTable64);
							HeaderTable64.flushContent();

							/* HeaderTable6.getDefaultCell().setBorder(
									Rectangle.BOTTOM); */
							
			%>
	</c:forEach>
		<%
		
		HeaderTable64.getDefaultCell().setBorder(
				Rectangle.BOTTOM);
		HeaderTable64.addCell(new Phrase("", tabletext));
		HeaderTable64.addCell(new Phrase("", tabletext));
		HeaderTable64.addCell(new Phrase("", tabletext));
		HeaderTable64.addCell(new Phrase("", tabletext));
		HeaderTable64.addCell(new Phrase("", tabletext));
		HeaderTable64.addCell(new Phrase("", tabletext));
		
		document.add(HeaderTable64);
		HeaderTable64.flushContent();
			
		/* PdfPCell cell2 = new PdfPCell(new Phrase(" ",
				tabletext));
		cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell2.setBorder(Rectangle.BOTTOM); */
		HeaderTable64.addCell(new Phrase("", tabletext));
		HeaderTable64.addCell(new Phrase("", tabletext));
		HeaderTable64.addCell(new Phrase("", tabletext));
		
		PdfPCell vatcell11 = new PdfPCell(new Phrase("Total  :",
				tabletext));
		vatcell11.setHorizontalAlignment(Element.ALIGN_CENTER);
		vatcell11.setBorder(Rectangle.BOTTOM);
		HeaderTable64.addCell(vatcell11);
		
		PdfPCell vatcell12 = new PdfPCell(new Phrase(""+creditamouttotal, tabletext));
		vatcell12.setHorizontalAlignment(Element.ALIGN_CENTER);
		vatcell12.setBorder(Rectangle.BOTTOM);
		HeaderTable64.addCell(vatcell12);

		document.add(HeaderTable64);
		HeaderTable64.flushContent();
		
			PdfPTable HeaderTable84 = new PdfPTable(6);
			int[] headerwidth84 = { 12, 20, 7, 15,10,10};
			HeaderTable84.setWidths(headerwidth8);
			HeaderTable84.setWidthPercentage(95f);
			HeaderTable84.getDefaultCell().setBorder(Rectangle.BOTTOM);
			
		HeaderTable84.getDefaultCell().setBorder(Rectangle.BOTTOM);
		HeaderTable84.addCell(new Phrase("", tabletext));
		HeaderTable84.addCell(new Phrase("", tabletext));
		HeaderTable84.addCell(new Phrase("", tabletext));
		HeaderTable84.addCell(new Phrase("", tabletext));
		HeaderTable84.addCell(new Phrase("", tabletext));
		HeaderTable84.addCell(new Phrase("", tabletext));
		HeaderTable84.addCell(new Phrase("", tabletext));
		HeaderTable84.addCell(new Phrase("", tabletext));
		HeaderTable84.addCell(new Phrase("", tabletext));
		HeaderTable84.addCell(new Phrase("", tabletext));

					document.add(HeaderTable8);
					HeaderTable84.flushContent();

					HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable1.addCell(new Phrase("            ", header));
					HeaderTable1.addCell(new Phrase("            ", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();
					PdfPTable HeaderTable124 = new PdfPTable(5);
					int[] headerwidth124 = { 20, 60, 20, 20, 20 };
					HeaderTable124.setWidths(headerwidth12);
					HeaderTable124.setWidthPercentage(95f);
					HeaderTable124.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					document.add(HeaderTable12);
					HeaderTable12.flushContent();
		%>
		<%
				HeaderTable64.addCell(new Phrase("", tabletext));
				HeaderTable64.addCell(new Phrase("", tabletext));
				HeaderTable64.addCell(new Phrase("", tabletext));
				HeaderTable64.addCell(new Phrase("", tabletext));
				HeaderTable64.addCell(new Phrase("", tabletext));
				HeaderTable64.addCell(new Phrase("", tabletext));
				
				HeaderTable64.getDefaultCell().setBorder(
						Rectangle.TOP);
		
				document.add(HeaderTable64);
				HeaderTable64.flushContent();
		%>

	<%
														
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				
				HeaderTableTitle.addCell(new Phrase("",subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));
				HeaderTableTitle.addCell(new Phrase("", subheader));

				document.add(HeaderTableTitle);
				HeaderTableTitle.flushContent();
		%>

	<%
	PdfPTable HeaderTable5 = new PdfPTable(3);
	int[] headerwidth5 = { 30, 60, 20 };
	HeaderTable5.setWidths(headerwidth5);
	HeaderTable5.setWidthPercentage(95f);
	HeaderTable5.getDefaultCell()
			.setBorder(Rectangle.NO_BORDER);
	
	HeaderTable5.addCell(new Phrase("", tabletext));
	HeaderTable5.addCell(new Phrase("", tabletext));
	HeaderTable5.addCell(new Phrase("", tabletext));

	HeaderTable5.addCell(new Phrase("", tabletext));
	HeaderTable5.addCell(new Phrase("", tabletext));
	HeaderTable5.addCell(new Phrase("", tabletext));
	
	HeaderTable5.addCell(new Phrase("", tabletext));
	HeaderTable5.addCell(new Phrase("", tabletext));
	HeaderTable5.addCell(new Phrase("", tabletext));
	
	HeaderTable5.addCell(new Phrase("", tabletext));
	HeaderTable5.addCell(new Phrase("", tabletext));
	HeaderTable5.addCell(new Phrase("", tabletext));
	
	HeaderTable5.addCell(new Phrase("", tabletext));
	HeaderTable5.addCell(new Phrase("", tabletext));
	HeaderTable5.addCell(new Phrase("", tabletext));
	
	HeaderTable5.addCell(new Phrase("", tabletext));
	HeaderTable5.addCell(new Phrase("", tabletext));
	HeaderTable5.addCell(new Phrase("", tabletext));

	int[] headerwidth = { 40, 60, 20 };
	HeaderTable5.setWidths(headerwidth);
	HeaderTable5.getDefaultCell().setBorder(Rectangle.BOX);
	HeaderTable5.addCell(new Phrase("          Opening Balance    "
			+ netAmt, subheader));
	HeaderTable5.getDefaultCell()
			.setBorder(Rectangle.NO_BORDER);
	HeaderTable5
			.addCell(new Phrase(
					"                       Payee Signature",
					tabletext));
	HeaderTable5.addCell(new Phrase("Authorized Signatory",
			tabletext));

	document.add(HeaderTable5);
	HeaderTable5.flushContent();
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
