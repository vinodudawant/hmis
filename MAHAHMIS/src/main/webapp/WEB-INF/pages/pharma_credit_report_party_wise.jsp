<%@page import="com.itextpdf.text.Font.FontStyle"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="org.apache.jasper.tagplugins.jstl.core.ForEach"%>
<%@page import="org.apache.poi.util.IntegerField"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.itextpdf.text.html.WebColors"%>
<%@page import="com.hms.pharmacy.pojo.CounterSaleMaster"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.awt.Color"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
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
	
	String catName = "";
	double total = 0.0;
	double finalTotal = 0.0;
	int count = 0,i=0;
	try {
		response.setContentType("application/pdf");

		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
		document.setMargins(20, 20, 20, 0);
		session = request.getSession();

		DecimalFormat df2 = new DecimalFormat("0.00");
		DecimalFormat df3 = new DecimalFormat("0.0");
		DecimalFormat df4 = new DecimalFormat("0");
		
		
		PdfWriter.getInstance(document, outStream);
		document.open();
		//font

		Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font subheader = new Font(Font.FontFamily.HELVETICA, 8,	Font.BOLD);
		Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font tabletext = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
		
		Font tableText = new Font(Font.FontFamily.HELVETICA, 8,	Font.NORMAL);
		Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
				
			
					PdfPTable HeaderTable6 = new PdfPTable(9);
					int[] headerwidth6 = { 10, 11,10,10,10,10,10,30, 25};
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
					
					
					HeaderTable6.addCell(new Phrase("Invoice No", subheader));
					HeaderTable6.addCell(new Phrase("Date", subheader));
					
					PdfPCell qtyCell = new PdfPCell(new Phrase("Gross Amt",subheader));
					qtyCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					qtyCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(qtyCell);
						
					PdfPCell packing = new PdfPCell(new Phrase("C/R",subheader));
					packing.setHorizontalAlignment(Element.ALIGN_RIGHT);
					packing.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(packing);
					
					PdfPCell unit = new PdfPCell(new Phrase("Credit Amt",subheader));
					unit.setHorizontalAlignment(Element.ALIGN_RIGHT);
					unit.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(unit);
					
					PdfPCell free = new PdfPCell(new Phrase("LessPerc",subheader));
					free.setHorizontalAlignment(Element.ALIGN_RIGHT);
					free.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(free);

			 		PdfPCell batchNumberCell = new PdfPCell(new Phrase("Patient Id", subheader));
					batchNumberCell.setHorizontalAlignment(Element.ALIGN_CENTER);
					batchNumberCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(batchNumberCell);

					PdfPCell cells = new PdfPCell(new Phrase("Patient Name",subheader));
					cells.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells);
					
					PdfPCell purRatecell = new PdfPCell(new Phrase("Dr Name",subheader));
					purRatecell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					purRatecell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(purRatecell);

					

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
		<c:forEach items="${creditData}" var="row" varStatus="count">

		<c:set var="vouNo" value="${row.vouNo }" />
		
			<c:set var="patientName" value="${row.patientName }" />
		
		<c:set var="amount" value="${row.amount }" />

		<c:set var="totalLess" value="${row.totalLess }" />
		
		<c:set var="date" value="${row.date}" />

		<c:set var="transType" value="${row.transType }" />

		<c:set var="openingStock" value="${row.openingStock }" />

		<c:set var="patientId" value="${row.patientId}" />

		<c:set var="doctorName" value="${row.doctorName}" />
		
		<%
		
        String vouNo = "";
		if (pageContext.getAttribute("vouNo") == null) {
			vouNo = "";
		} else {

			vouNo = vouNo
					+ (String) pageContext.getAttribute(
							"vouNo").toString();
		}
		
		
		String patientName = "";
		if (pageContext.getAttribute("patientName") == null) {
			patientName = "";
		} else {

			patientName = patientName
					+ (String) pageContext.getAttribute(
							"patientName").toString();
		}
		
			
		double amount = 0.0;
		if (pageContext.getAttribute("amount") != null) {
			amount = Double.parseDouble(pageContext.getAttribute("amount")+"");
		} 
		
		String totalLess = "";
		if (pageContext.getAttribute("totalLess") == null) {
			totalLess = "";
		} else {

			totalLess = totalLess
					+ (String) pageContext.getAttribute(
							"totalLess").toString();
		}

		String date = "";
		String splitSaleDate[];
		String saleDate = "";

		if (pageContext.getAttribute("date") == null) {
			date = "";
		} else {
			date = date
					+ (String) pageContext.getAttribute("date")
							.toString();
			splitSaleDate = date.split(" ");
			saleDate = splitSaleDate[0];
		}

		
		String transType = "";
		if (pageContext.getAttribute("transType") == null) {
			transType = "";
		} else {
			transType = transType
					+ (String) pageContext.getAttribute(
							"transType").toString();
		}
		
		String openingStock = "";
		if (pageContext.getAttribute("openingStock") == null) {
			openingStock = "";
		} else {
			openingStock = openingStock
					+ (String) pageContext.getAttribute(
							"openingStock").toString();
		}
		
		if(i==0){
			catName=openingStock;
			i++;
			
			HeaderTable6.getDefaultCell()
			.setBorder(Rectangle.NO_BORDER);
	
	HeaderTable6.addCell(new Phrase(catName, tabletext));
	HeaderTable6.addCell(new Phrase("", tabletext));
	HeaderTable6.addCell(new Phrase("", tabletext));
	HeaderTable6.addCell(new Phrase("", tabletext));
	
	HeaderTable6.addCell(new Phrase("", tabletext));
	HeaderTable6.addCell(new Phrase("", tabletext));
	HeaderTable6.addCell(new Phrase("", tabletext));
	HeaderTable6.addCell(new Phrase("", tabletext));
	
	HeaderTable6.addCell(new Phrase("", tabletext));
		}

		String patientId = "";
		if (pageContext.getAttribute("patientId") == null) {
			patientId = "";
		} else {
			patientId = patientId
					+ (String) pageContext.getAttribute(
							"patientId").toString();
		}

		String doctorName = "";
		if (pageContext.getAttribute("doctorName") == null) {
			doctorName = "";
		} else {
			doctorName = doctorName
					+ (String) pageContext.getAttribute("doctorName")
							.toString();
			
			}
		
		HeaderTable6.getDefaultCell()
		.setBorder(Rectangle.NO_BORDER);
		
		if(!catName.equals(openingStock)){
			catName=openingStock;

HeaderTable6.addCell(new Phrase(catName, tabletext));
HeaderTable6.addCell(new Phrase("", tabletext));
HeaderTable6.addCell(new Phrase("", tabletext));
HeaderTable6.addCell(new Phrase("", tabletext));

HeaderTable6.addCell(new Phrase("", tabletext));
HeaderTable6.addCell(new Phrase("", tabletext));
HeaderTable6.addCell(new Phrase("", tabletext));
HeaderTable6.addCell(new Phrase("", tabletext));

HeaderTable6.addCell(new Phrase("", tabletext));
		}
		
		
							HeaderTable6.addCell(new Phrase(vouNo, tabletext));
							HeaderTable6.addCell(new Phrase(date, tabletext));
							
							PdfPCell cell222 = new PdfPCell(new Phrase(amount+"", tabletext));
							cell222.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell222.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell222);
							
							PdfPCell cell12 = new PdfPCell(new Phrase(transType, tabletext));
							cell12.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell12.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell12);
							
							PdfPCell cell13 = new PdfPCell(new Phrase(Math.round(amount)+"", tabletext));
							cell13.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell13.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell13);
							
							PdfPCell cell14 = new PdfPCell(new Phrase(totalLess, tabletext));
							cell14.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell14.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell14);

						 	
							PdfPCell batchCodeCells = new PdfPCell(new Phrase(patientId, tabletext));
							batchCodeCells.setHorizontalAlignment(Element.ALIGN_CENTER);
							batchCodeCells.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(batchCodeCells);

							PdfPCell cell3 = new PdfPCell(new Phrase(patientName,tabletext));
							cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell3.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell3);

							PdfPCell prcell = new PdfPCell(new Phrase(doctorName,tabletext));
							prcell.setHorizontalAlignment(Element.ALIGN_RIGHT);
							prcell.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(prcell);

							document.add(HeaderTable6);
							HeaderTable6.flushContent();
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