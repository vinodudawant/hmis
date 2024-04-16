<%@page import="java.util.ResourceBundle"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%-- <%@page import="com.hms.admin.util.FetchHospitalDetails"%> --%>
<%@page import="com.itextpdf.text.html.WebColors"%>
<%@page import="com.hms.pharmacy.pojo.CounterSaleMaster"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.awt.Color"%>
<%@page import="com.hms.administrator.dto.HospitalDetailsDTO"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.pharmacy.controller.CounterSaleController"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@ page import="com.hms.ehat.dto.CurrencyTypeDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

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
<title>Counter Bill</title>
</head>
<body>
	<%
	DecimalFormat df22 = new DecimalFormat("0.00");
	ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	String ShradhhaFlag = (String) resourceBundleEha.getObject("ShradhhaFlag").toString();	
	ResourceBundle resourceBundleEhat = ResourceBundle
			.getBundle("Ehat");
	String print = (String) resourceBundleEhat
			.getString("pharmacyPrint");

	ResourceBundle resourceBundlepharmacy = ResourceBundle
			.getBundle("pharmacy");
	String drugLicenseNo = (String) resourceBundlepharmacy
			.getString("drugLicenseNo");
	
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

	try {
		response.setContentType("application/pdf");
		CurrencyTypeService fetchOneCurrency=(ApplicationContextUtils.getApplicationContext()).getBean(CurrencyTypeService.class);
		List<CurrencyTypeDto> listServiceCurrencyDto=fetchOneCurrency.getOneCurrencyList();
		String currencyCode=listServiceCurrencyDto.get(0).getCurrencyCode();
		String currencyName=listServiceCurrencyDto.get(0).getCurrencyName();

		HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
		List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
		HospitalDetails hospObj = arrHospitalDetails.get(0);

		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		Document document;
		
		response.setHeader("Content-Disposition", "inline; filename = Debit Note");

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
		String hospitalName = (String) resourceBundleEhat
				.getString("hospitalName");
		//String hospitalName = "SHRADDHA MEDICAL STORES RUN BY SARGM HEALTHCARE PVT.LTD.";

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
			//GStNo=GStNo1;
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

				img = Image.getInstance(path1);
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

				img = Image.getInstance(path1);
				if(ShradhhaFlag.equalsIgnoreCase("ON"))
			{
				img.scaleAbsolute(100, 50);
				cell = new PdfPCell();
				cell.addElement(new Chunk(img, 35, -25));
				}else
				{
					img.scaleAbsolute(80, 60);
					cell = new PdfPCell();
					cell.addElement(new Chunk(img, 5, -5));
				}
				cell.setBorder(Rectangle.NO_BORDER);
			} catch (Exception e) {
				e.printStackTrace();
			}

			Image imgNabh = null;
			PdfPCell cellNabh = null;
			try {
				imgNabh = Image.getInstance(nabhLogo);
				if(ShradhhaFlag.equalsIgnoreCase("ON"))
			{
				imgNabh.scaleAbsolute(100, 50);
				cellNabh = new PdfPCell();
				cellNabh.addElement(new Chunk(imgNabh, 35, -25));
				}else
				{
					imgNabh.scaleAbsolute(80, 60);
					cellNabh = new PdfPCell();
					cellNabh.addElement(new Chunk(imgNabh, 5, -5));
				}
				cellNabh.setBorder(Rectangle.NO_BORDER);
			} catch (Exception e) {
				e.printStackTrace();
			}

			if (img == null || tmpFlag == 1) {

				HeaderTable1.addCell(new Phrase("GST NO:"+GStNo));
			} else {

				HeaderTable1.addCell(cell);
			}
			Font regular = new Font(FontFamily.TIMES_ROMAN, 10,
					Font.NORMAL);
			Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD);
			Phrase p = new Phrase();
			p.add(new Chunk(" " + hospitalName, bold));
			p.add(new Chunk(" \n\n" + address, tabletext));

			if (tmpFlag == 0) {
				 p.add(new Chunk(" " + city + " Pin- " + hospitalZip,
						tabletext));
				p.add(new Chunk(" Phone No. " + hPhoneNo, tabletext));
				p.add(new Chunk(" \n " + webste + " email: " + email,
						tabletext)); 
				 if (cinNo.equalsIgnoreCase("-")) {
					
				}else{
					p.add(new Chunk(" \nCIN: " + cinNo, tabletext));
				} 
				 if (serviceTaxNo.equalsIgnoreCase("-")) {
					
				}else{
					p.add(new Chunk(" \nService Tax: " + serviceTaxNo, tabletext));
				} 
				 if (panNo.equalsIgnoreCase("-")) {
					
				}else{
					p.add(new Chunk( ", PAN No: " + panNo, tabletext));
				} 
			}

			PdfPCell hospitalNameCell = new PdfPCell(p);
			hospitalNameCell
					.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(hospitalNameCell);

			if (imgNabh == null || tmpFlag == 1) {

				/* HeaderTable1.addCell(new Phrase(new Phrase("DL20.MH-50L-282894"
							+ "\nDL20.MH-50L-282895", subheader))); */
				HeaderTable1.addCell(new Phrase("DL. "+drugLicenseNo+"\nDL. "+drugLicenseNo1, subheader));
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
			int[] headerwidth2 = {18, 20, 40, 20, 15};
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			PdfPTable patientDemoDetailName2 = new PdfPTable(4);
			int[] patientDemoDetailNameWidth2 = { 16, 36, 16, 36 };
			patientDemoDetailName2.setWidths(patientDemoDetailNameWidth2);
			patientDemoDetailName2.setWidthPercentage(95f);
			patientDemoDetailName2.getDefaultCell().setBorder(
					Rectangle.NO_BORDER);

			/*  patientDemoDetailName2.addCell(new Phrase("", subheader));
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

	<c:forEach items="${debitNoteData}" var="row" varStatus="count">

        <c:set var="billId" value="${row.debitNoteId }" />

		<c:set var="billNumber" value="${row.debitNoteDocNo }" />

		<c:set var="saleDate" value="${row.debitNotEnteredBy }" />

		<c:set var="patientName" value="${row.vendorName }" />
		
		<c:set var="patientMobile" value="${row.vendorMobileNumber }" />
		
		<c:set var="less" value="${row.debitNoteLess}" />
		
		<c:set var="grossAmt" value="${row.debitNoteGrossAmt}" />
		
		<c:set var="surcharge" value="${row.debitNoteSurcharges}" />
		
		<c:set var="purchaseEntry" value="${row.purchaseEntryId}" />

		<%-- <c:set var="doctor" value="${row.doctorName }" /> --%>
		<%
					String billNumber = "";
					if(pageContext.getAttribute("billNumber")
							.toString()==null)
					{
						billNumber = "";
					}
					else
					{	
					
					billNumber =  billNumber + (String) pageContext.getAttribute("billNumber")
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
					
					
					String saleDate1 = "";
					String splitSaleDate[];
					String 	saleDate="";
					
					if(pageContext.getAttribute("saleDate")
							.toString()==null)
					{
						
						saleDate="";
					}
					else
					{
						saleDate=saleDate	+ (String) pageContext.getAttribute("saleDate")
								.toString();
						
					}
						
					String patientName = "";
					if(pageContext.getAttribute("patientName")
							.toString()==null)
					{
						patientName = "";
					}
					else
					{
						patientName =patientName + (String) pageContext.getAttribute("patientName")
								.toString();
					}

					String patientMobile = "";
					if(pageContext
							.getAttribute("patientMobile")==null)
					{
						patientMobile = "";
					}
					else
					{
						patientMobile=patientMobile+(String) pageContext
							.getAttribute("patientMobile").toString();
					}
					
					String less = "";
					if(pageContext.getAttribute("less")
							.toString()!=null )
					{
						less =less + (String) pageContext.getAttribute("less")
						.toString();
						
					}
					else
					{
						less = "0.0";
					}
					
					
					String purchaseEntry = "";
					if(pageContext.getAttribute("purchaseEntry")
							.toString()==null)
					{
						purchaseEntry = "";
					}
					else
					{
						purchaseEntry =purchaseEntry + (String) pageContext.getAttribute("purchaseEntry")
								.toString();
					}
					
					
					String grossAmt = "";
					if(pageContext.getAttribute("grossAmt")
							.toString()==null)
					{
						grossAmt = "";
					}
					else
					{
						grossAmt =grossAmt + (String) pageContext.getAttribute("grossAmt")
								.toString();
						
						Float grossAmt1 = Float.parseFloat(grossAmt);
						grossAmt = df22.format(grossAmt1);
						
					}
					
					String surcharge = "";
					if(pageContext.getAttribute("surcharge")
							.toString()==null)
					{
						surcharge = "";
					}
					else
					{
						surcharge =surcharge + (String) pageContext.getAttribute("surcharge")
								.toString();
															
					}
					
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
					} */

					PdfPTable HeaderTable3 = new PdfPTable(6);
					int[] headerwidth3 = { 60, 30, 20, 20, 20, 20 };
					HeaderTable3.setWidths(headerwidth3);
					HeaderTable3.setWidthPercentage(95f);
					HeaderTable3.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

			        HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
								
					HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					BaseColor myColor = WebColors.getRGBColor("#00a0d6");
					PdfPCell text = new PdfPCell(new Phrase("DEBIT NOTE",
					subheader));
					text.setHorizontalAlignment(Element.ALIGN_CENTER);
					
					text.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(text); 
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
									
					HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable2.addCell(new Phrase("Purchase No : "+purchaseEntry, subheader));
				    HeaderTable2.addCell(new Phrase("", subheader)); 
				    HeaderTable2.addCell(new Phrase("", subheader));  
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
						
					document.add(HeaderTable2);
					HeaderTable2.flushContent();
 

					HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable2
							.addCell(new Phrase("Receipt No    : "+billId, subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("Vou No    : "+billNumber, subheader));  
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("  ", subheader));
					
					/* PdfPCell subcell1 = new PdfPCell(new Phrase("Vou No : "+billNumber,
							subheader));
					subcell1.setHorizontalAlignment(Element.ALIGN_LEFT);
					subcell1.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(subcell1);  */
					
					
					HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2
							.addCell(new Phrase("Date : "+saleDate, subheader));
					PdfPCell subcell = new PdfPCell(new Phrase("",
							subheader));
					subcell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					subcell.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(subcell);
					//HeaderTable2.addCell(new Phrase(""+ReceiptNo,subheader));
				
					
					HeaderTable2.addCell(new Phrase("", subheader));
					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					PdfPTable HeaderTable4 = new PdfPTable(6);
					int[] headerwidth4 = { 15, 40, 18, 15, 20, 20 };
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

					HeaderTable4
							.addCell(new Phrase("Vendor Name : ", subheader));
					HeaderTable4.addCell(new Phrase(patientName, tabletext));
					PdfPCell cell0 = new PdfPCell(new Phrase("Phone Number : ",
							subheader));
					cell0.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell0.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell0);
					//HeaderTable3.addCell(new Phrase("Department",subheader));
					HeaderTable4.addCell(new Phrase(patientMobile, tabletext)); // deptName.toUpperCase()
					
					
					PdfPCell cell00 = new PdfPCell(new Phrase("",
							subheader));
					cell00.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell00.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell00);

					/* HeaderTable4.addCell(new Phrase("", subheader)); */
					HeaderTable4.addCell(new Phrase("", tabletext));

					PdfPCell cell1 = new PdfPCell(new Phrase("", subheader));
					cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell1.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell1);
					//HeaderTable3.addCell(new Phrase("OPD No",subheader));
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
				
					
					
					PdfPTable HeaderTable6 = new PdfPTable(9);
					int[] headerwidth6 = {6 ,30, 7, 12, 15, 20, 15, 20, 20 };
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
					HeaderTable6.addCell(new Phrase("Qty", subheader));
					HeaderTable6.addCell(new Phrase("Scheme", subheader)); 
					
					PdfPCell mrpCell = new PdfPCell(new Phrase("MRP ("+currencyCode+")", subheader));
					mrpCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					mrpCell.setBorder(Rectangle.BOTTOM);  
					HeaderTable6.addCell(mrpCell);
					
					PdfPCell batchNumberCell = new PdfPCell(new Phrase("Batch Number", subheader));
					batchNumberCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
				 	batchNumberCell.setBorder(Rectangle.BOTTOM);  
					HeaderTable6.addCell(batchNumberCell);
					
					/* HeaderTable6.addCell(new Phrase(".", subheader)); */
				/* 	HeaderTable6.addCell(new Phrase("EXpiry", subheader)); */
					
					PdfPCell cells = new PdfPCell(new Phrase("Expiry", subheader));
					cells.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells.setBorder(Rectangle.BOTTOM); 
					HeaderTable6.addCell(cells);
					
					PdfPCell cells1 = new PdfPCell(new Phrase("Rate ("+currencyCode+")", subheader));
					cells1.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells1.setBorder(Rectangle.BOTTOM); 
					HeaderTable6.addCell(cells1);
					
					/* HeaderTable6.addCell(new Phrase(" ",
							subheader)); */
							
					PdfPCell cells2 = new PdfPCell(new Phrase("Amount ("+currencyCode+")", subheader));
					cells2.setHorizontalAlignment(Element.ALIGN_RIGHT);
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
		<c:set var="total" value="${row.debitNoteNetAmt }" />

		<c:forEach items="${row.debitNoteSlaves}" var="vendor"
			varStatus="count">

			<c:set var="qty" value="${vendor.debitNoteSlaveQty }" />

			<c:set var="mrp" value="${vendor.debitNoteSlaveMrp }" />

			<c:set var="rate" value="${vendor.debitNoteSlaveRate }" />

			<c:set var="amt" value="${vendor.debitNoteSlaveAmt }" />

			<c:set var="batchCode" value="${vendor.debitNoteSlaveBatchCode }" />

			<c:set var="expiry" value="${vendor.debitNoteSlaveBatchExpiry }" />

			<c:set var="counter" value="${(count.index)+1}" />
			
			<c:set var="productName" value="${vendor.productMaster.productName}" />
			
			<c:set var="Scheme" value="${vendor.debitSlaveScheme }" />

			<%
							String counter = ""
									+ (String) pageContext.getAttribute("counter")
											.toString();

							String qty = ""
									+ (String) pageContext.getAttribute("qty")
											.toString();

							String mrp = ""
									+ (String) pageContext.getAttribute("mrp")
											.toString();

							String rate = ""
									+ (String) pageContext.getAttribute("rate")
											.toString();

							String amt = ""
									+ (String) pageContext.getAttribute("amt")
											.toString();
							
							Float amt1 = Float.parseFloat(amt);
							amt = df22.format(amt1);
							
							String total = ""
									+ (String) pageContext.getAttribute("total")
											.toString();

							String batchCode = ""
									+ (String) pageContext
											.getAttribute("batchCode").toString();

							String expiry = ""
									+ (String) pageContext.getAttribute("expiry")
											.toString();
							
							String productName = ""
									+ (String) pageContext.getAttribute("productName")
											.toString();
							
							String Scheme = ""
									+ (String) pageContext.getAttribute("Scheme")
											.toString();

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
							HeaderTable6.addCell(new Phrase(productName, tabletext));
							HeaderTable6.addCell(new Phrase(qty, tabletext));
							
							//HeaderTable6.addCell(new Phrase(Scheme, tabletext));
							
							PdfPCell cell11 = new PdfPCell(new Phrase(Scheme, tabletext));
							cell11.setHorizontalAlignment(Element.ALIGN_CENTER); 
							cell11.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell11);

							PdfPCell cell2 = new PdfPCell(new Phrase(df22.format(Double.parseDouble(mrp)), tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_RIGHT); 
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell2);

							/* HeaderTable6.addCell(new Phrase(, tabletext)); */
							PdfPCell batchCodeCells = new PdfPCell(new Phrase(batchCode, tabletext));
							batchCodeCells.setHorizontalAlignment(Element.ALIGN_RIGHT);
							batchCodeCells.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(batchCodeCells);
							
							
							PdfPCell cell3 = new PdfPCell(new Phrase(expiry, tabletext));
							cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell3.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell3);

							PdfPCell cell4 = new PdfPCell(new Phrase(df22.format(Double.parseDouble(rate)), tabletext));
							cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell4.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell4);

							PdfPCell cell5 = new PdfPCell(new Phrase(amt, tabletext));
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
					
					String total = ""
							+ (String) pageContext.getAttribute("total")
									.toString();
					Float total1 = Float.parseFloat(total);
					total = df22.format(total1);
					
					
					document.add(HeaderTable6);
					HeaderTable6.flushContent();

				/* 	document.add(afterVentilation);
					afterVentilation.flushContent(); */

				/* 	HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable1.addCell(new Phrase("            ", header));
					HeaderTable1.addCell(new Phrase("            ", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();
 */
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
					
					PdfPTable HeaderTable7 = new PdfPTable(3);
					int[] headerwidth7 = { 105,20,15};
					HeaderTable7.setWidths(headerwidth7);
					HeaderTable7.setWidthPercentage(95f);
					HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					
					HeaderTable7.addCell(new Phrase("" , subheader));
					//HeaderTable7.addCell(new Phrase("Gross amount", subheader));
					PdfPCell grosscell1 = new PdfPCell(new Phrase("Gross amount =" , subheader));
					grosscell1.setHorizontalAlignment(Element.ALIGN_RIGHT);
					grosscell1.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(grosscell1);
					PdfPCell grosscell = new PdfPCell(new Phrase(df22.format(Double.parseDouble(grossAmt)) , subheader));
					grosscell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					grosscell.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(grosscell);
					//HeaderTable7.addCell(new Phrase(df22.format(Double.parseDouble(grossAmt)) , subheader));
					
					
					HeaderTable7.addCell(new Phrase("", subheader));
					//HeaderTable7.addCell(new Phrase("Less", subheader));
					PdfPCell lessCell1 = new PdfPCell(new Phrase("Less =", subheader));
					lessCell1.setHorizontalAlignment(Element.ALIGN_RIGHT);
					lessCell1.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(lessCell1);
					System.out.println("less>>"+less);
					PdfPCell lessCell = new PdfPCell(new Phrase(df22.format(Double.parseDouble(less)), subheader));
					lessCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					lessCell.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(lessCell);
					//HeaderTable7.addCell(new Phrase(
					
					
					/* //HeaderTable7.addCell(new Phrase("Surcharge", subheader));
					PdfPCell surchargeCell1 = new PdfPCell(new Phrase("Surcharge =", subheader));
					surchargeCell1.setHorizontalAlignment(Element.ALIGN_RIGHT);
					surchargeCell1.setBorder(Rectangle.NO_BORDER);
					
					PdfPCell surchargeCell = new PdfPCell(new Phrase(surcharge, subheader));
					surchargeCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					surchargeCell.setBorder(Rectangle.NO_BORDER);
					System.err.println("errrrrr------->>"+surcharge);
					if(!surcharge.equals(null) || !surcharge.equals("")){
						HeaderTable7.addCell(new Phrase("", subheader));
						HeaderTable7.addCell(surchargeCell1);
						HeaderTable7.addCell(surchargeCell);
					} */
					
					//HeaderTable7.addCell(new Phrase(surcharge, subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					//HeaderTable7.addCell(new Phrase("Total", subheader));
					PdfPCell totalCell1 = new PdfPCell(new Phrase("Total =", subheader));
					totalCell1.setHorizontalAlignment(Element.ALIGN_RIGHT);
					totalCell1.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(totalCell1);
					PdfPCell totalCell = new PdfPCell(new Phrase(df22.format(Double.parseDouble(total)) , subheader));
					totalCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					totalCell.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(totalCell);
					//HeaderTable7.addCell(new Phrase(df22.format(Double.parseDouble(total)) , subheader));

					/* HeaderTable7.addCell(new Phrase("Balance", subheader));
					HeaderTable7.addCell(new Phrase("",tabletext));
					HeaderTable7.addCell(new Phrase("Discount", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("In Words", subheader)); */
					
					/* int finalTotal = (Integer.parseInt(total)); */
					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

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
				PdfPTable HeaderTable5 = new PdfPTable(3);
					int[] headerwidth5 = { 20, 60, 30 };
					HeaderTable5.setWidths(headerwidth5);
					HeaderTable5.setWidthPercentage(95f);
					HeaderTable5.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					int[] headerwidth = { 20, 60, 30 };
					HeaderTable5.setWidths(headerwidth);
					HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(new Phrase("", subheader));
					HeaderTable5.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
					//HeaderTable5.addCell(new Phrase("Payee Signature",tabletext));
					PdfPCell cell111 = new PdfPCell(new Phrase("Payee Signature",
							subheader));
					cell111.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell111.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(cell111);
					
				//	HeaderTable5.addCell(new Phrase("Authorized Signatory",tabletext));
					PdfPCell cell110 = new PdfPCell(new Phrase("Authorized By",
							subheader));
					cell110.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell110.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(cell110);
					
					HeaderTable5.addCell(new Phrase("", subheader));
					HeaderTable5.addCell(new Phrase("", subheader));
					
					PdfPCell cell11 = new PdfPCell(new Phrase(user_name,tabletext));
					cell11.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell11.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(cell11);

					document.add(HeaderTable5);
					HeaderTable5.flushContent();
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