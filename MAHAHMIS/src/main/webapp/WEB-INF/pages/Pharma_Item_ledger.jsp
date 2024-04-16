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
<%@page import="com.lowagie.text.PageSize"%>
<%@page import="com.hms.dto.Prescription"%>
<%@page import="com.hms.utility.EnglishNumberToWords"%>
<%@page import="org.omg.CORBA._PolicyStub"%>
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
		try {
			response.setContentType("application/pdf");

			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);

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
			Font tabletext1 = new Font(Font.HELVETICA,12,
					Font.NORMAL);
			
			
			HeaderFooter footerNew = new HeaderFooter(new Phrase("", tabletext), true);
			footerNew.setAlignment(Element.ALIGN_RIGHT);
			footerNew.setBorderWidthBottom(0);
					document.setFooter(footerNew);
			
			document.open();

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

			PdfPTable HeaderTable2 = new PdfPTable(6);
			int[] headerwidth2 = { 50, 10, 50, 30,10,50 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						
			
			PdfPCell hospitalNameCell = new PdfPCell(new Phrase(
					hospitalName + "\n"+ country +"\n" +address+"\n TEL No:-"+contact, header));
			hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(hospitalNameCell);
			HeaderTable1.addCell(new Phrase("", header));
			
			PdfPCell startCell2 = new PdfPCell(new Phrase("Tax Invoice",
					header));
			 startCell2.setHorizontalAlignment(Element.ALIGN_CENTER); 
			startCell2.setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(startCell2);

			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();

			PdfPTable patientDemoDetailName2 = new PdfPTable(4);
			int[] patientDemoDetailNameWidth2 = { 20, 36, 16, 36 };
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
		
		<%
		
		ResourceBundle bundle = ResourceBundle
		.getBundle("EhatEnterpriseConfigurationFile");
		
		String goodsReceiptNote = bundle.getObject("pharma_purchase_entry_name")
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
		
	 	String saleDate8 = "";
		String splitSaleDate8[];
		String saleDate9 = "";

		if (pageContext.getAttribute("toDate") == null) {
			saleDate8 = "";
			saleDate9= "";
		} else {
			saleDate8 = saleDate8
					+ (String) pageContext.getAttribute("toDate")
							.toString();
			splitSaleDate8 = saleDate8.split(" ");
			saleDate9 = splitSaleDate8[0];
		} 
		
				
					PdfPTable HeaderTable3 = new PdfPTable(6);
					int[] headerwidth3 = { 60, 30,3,3,3,10};
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
									
				     HeaderTable2.addCell(new Phrase("From  :  "+saleDate6, subheader)); 
				     HeaderTable2.addCell(new Phrase("", subheader));  
				     HeaderTable2.addCell(new Phrase("      Item Ledger Report", tabletext1));  
				 	 HeaderTable2.addCell(new Phrase("", tabletext1)); 
				 	 HeaderTable2.addCell(new Phrase("", subheader));
				 	
					/* BaseColor myColor = WebColors.getRGBColor("#00a0d6"); */
					PdfPCell text = new PdfPCell(new Phrase("To  :  "+saleDate9,
					subheader));
					text.setHorizontalAlignment(Element.ALIGN_CENTER);
				/* 	text.setBackgroundColor(myColor); */
					text.setBorder(Rectangle.NO_BORDER);
					HeaderTable2.addCell(text); 
												
																	
					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable2
							.addCell(new Phrase("", subheader));
					
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					
					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					PdfPTable HeaderTable4 = new PdfPTable(6);
					int[] headerwidth4 = { 24, 30, 20, 24, 20, 20 };
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
					
					
					HeaderTable4.addCell(new Phrase(goodsReceiptNote.toString(), tabletext1));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));

					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", tabletext));
					PdfPCell cell0 = new PdfPCell(new Phrase("",
							subheader));
					cell0.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell0.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell0);
					
					HeaderTable4.addCell(new Phrase("", tabletext)); 
				
					PdfPCell cell1 = new PdfPCell(new Phrase("", subheader));
					cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell1.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell1);
				
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

				
		%>
//Purchase Entry
		<%
			

					PdfPTable HeaderTable6 = new PdfPTable(10);
					int[] headerwidth6 = { 12, 20,7,7,10,12,15,15,15,15};
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
					
					HeaderTable6.addCell(new Phrase("#", subheader));
					HeaderTable6.addCell(new Phrase("Product Name", subheader));
					HeaderTable6.addCell(new Phrase("Qty", subheader));
					HeaderTable6.addCell(new Phrase("Unit", subheader));
					 HeaderTable6.addCell(new Phrase("Pur Qty", subheader)); 

					PdfPCell mrpCell = new PdfPCell(new Phrase("Bill No",
							subheader));
					mrpCell.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(mrpCell);

			 	PdfPCell vatCell = new PdfPCell(new Phrase("Date",
							subheader));
					vatCell.setHorizontalAlignment(Element.ALIGN_CENTER);
					vatCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(vatCell); 
					
					PdfPCell batchNumberCell = new PdfPCell(new Phrase(
							"Vendor Name", subheader));
					batchNumberCell
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					batchNumberCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(batchNumberCell);
					
					PdfPCell cells = new PdfPCell(new Phrase("Current Stock",
							subheader));
					cells.setHorizontalAlignment(Element.ALIGN_CENTER);
					cells.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells);
				
					PdfPCell cells1 = new PdfPCell(new Phrase("Batch Code",
							subheader));
					cells1.setHorizontalAlignment(Element.ALIGN_CENTER);
					cells1.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells1);

				

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
				
		%>
		
		<c:forEach items="${purchaseData}" var="row" varStatus="count">

		  <c:set var="batchCode" value="${row.batchCode}" />
		  
		  <c:set var="unit" value="${row.unit}" />
		  
		  <c:set var="purQty" value="${row.purQty}" />
		
	     <c:set var="stock" value="${row.stock}" />
		
		<c:set var="vendorName" value="${row.vendorName}" />

		<c:set var="productName" value="${row.productName}" />
		
		<c:set var="qty" value="${row.qty}" />
		
		<c:set var="date" value="${row.date}" />

		<c:set var="receiptNo" value="${row.receiptNo}" />
		
		<c:set var="counter" value="${(count.index)+1}" />
			<%
			
			String counter = ""
					+ (String) pageContext.getAttribute("counter")
							.toString();

			
			 String batchCode = "";
			if (pageContext.getAttribute("batchCode") == null) {
				batchCode = "";
			} else {

				batchCode = batchCode
						+ (String) pageContext.getAttribute(
								"batchCode").toString();
			}
			
			 String purQty = "";
				if (pageContext.getAttribute("purQty") == null) {
					purQty = "";
				} else {

					purQty = purQty
							+ (String) pageContext.getAttribute(
									"purQty").toString();
				}
			
			 String unit = "";
				if (pageContext.getAttribute("unit") == null) {
					unit = "";
				} else {

					unit = unit
							+ (String) pageContext.getAttribute(
									"unit").toString();
				}
			
			
			String stock = "";
			if (pageContext.getAttribute("stock") == null) {
				stock = "";
			} else {

				stock = stock
						+ (String) pageContext.getAttribute(
								"stock").toString();
			}
			
				
			String vendorName = "";
			if (pageContext.getAttribute("vendorName") == null) {
				vendorName = "";
			} else {

				vendorName = vendorName
						+ (String) pageContext.getAttribute(
								"vendorName").toString();
			}
			
			
			String productName = "";
			if (pageContext.getAttribute("productName") == null) {
				productName = "";
			} else {

				productName = productName
						+ (String) pageContext.getAttribute(
								"productName").toString();
			}

			String saleDate1 = "";
			String splitSaleDate[];
			String saleDate = "";

			if (pageContext.getAttribute("date") == null) {
				saleDate1 = "";
				saleDate = "";
			} else {
				saleDate1 = saleDate1
						+ (String) pageContext.getAttribute("date")
								.toString();
				splitSaleDate = saleDate1.split(" ");
				saleDate = splitSaleDate[0];
			}

			
			String qty = "";
			if (pageContext.getAttribute("qty") == null) {
				qty = "";
			} else {
				qty = qty
						+ (String) pageContext.getAttribute(
								"qty").toString();
			}
		
			String receiptNo = "";
			if (pageContext.getAttribute("receiptNo") == null) {
				receiptNo = "";
			} else {
				receiptNo = receiptNo
						+ (String) pageContext.getAttribute(
								"receiptNo").toString();
			}
			
			
		/* 	HeaderFooter header1 = new HeaderFooter(new Phrase((""), tabletext), false);     
			
		     document.setHeader(header1);   */
		
		     HeaderFooter header1 = new HeaderFooter(new Phrase("", tabletext), true);
		     header1.setAlignment(Element.ALIGN_RIGHT);
		     header1.setBorderWidthBottom(0);
						document.setHeader(header1);
						
			           HeaderTable6.addCell(new Phrase(counter, tabletext));
							HeaderTable6.addCell(new Phrase(productName, tabletext));
							HeaderTable6
									.addCell(new Phrase(qty, tabletext));
							 HeaderTable6.addCell(new Phrase(unit, tabletext)); 
							 HeaderTable6.addCell(new Phrase(purQty, tabletext)); 

							PdfPCell cell22 = new PdfPCell(
									new Phrase(receiptNo, tabletext));
							cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell22.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell22);
							
							PdfPCell cell2 = new PdfPCell(
									new Phrase(saleDate, tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell2);

						 	PdfPCell vatcell11 = new PdfPCell(
									new Phrase(vendorName, tabletext));
							vatcell11.setHorizontalAlignment(Element.ALIGN_CENTER);
							vatcell11.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(vatcell11); 
							
							PdfPCell batchCodeCells = new PdfPCell(new Phrase(
									stock, tabletext));
							batchCodeCells
									.setHorizontalAlignment(Element.ALIGN_CENTER);
							batchCodeCells.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(batchCodeCells);

							PdfPCell cell3 = new PdfPCell(new Phrase(batchCode,
									tabletext));
							cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell3.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell3);
														

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
	
					document.add(HeaderTable6);
					HeaderTable6.flushContent();

		

					HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable1.addCell(new Phrase("            ", header));
					HeaderTable1.addCell(new Phrase("            ", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();


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

					/* 	patientDemoDetailName2.addCell(new Phrase("", subheader));
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

					patientDemoDetailName2.addCell(new Phrase("Opening Stock",tabletext1));
					patientDemoDetailName2.addCell(new Phrase("", tabletext1));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));

					document.add(patientDemoDetailName2);
					patientDemoDetailName2.flushContent();
		%>
		
		<%
			PdfPTable HeaderTable5 = new PdfPTable(3);
					int[] headerwidth5 = { 30, 60, 20 };
					HeaderTable5.setWidths(headerwidth5);
					HeaderTable5.setWidthPercentage(95f);
					HeaderTable5.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
		%>
		//opening stock
		<%
					PdfPTable HeaderTable88 = new PdfPTable(7);
					int[] headerwidth88 = { 12, 20,7,7,15,10,10};
					HeaderTable88.setWidths(headerwidth88);
					HeaderTable88.setWidthPercentage(95f);
					HeaderTable88.getDefaultCell().setBorder(Rectangle.BOTTOM);

					HeaderTable88.addCell(new Phrase("", tabletext));
					HeaderTable88.addCell(new Phrase("", tabletext));
					HeaderTable88.addCell(new Phrase("", tabletext));
					HeaderTable88.addCell(new Phrase("", tabletext));
					HeaderTable88.addCell(new Phrase("", tabletext));
					HeaderTable88.addCell(new Phrase("", tabletext));
					HeaderTable88.addCell(new Phrase("", tabletext));
					
					HeaderTable88.addCell(new Phrase("#", subheader));
					HeaderTable88.addCell(new Phrase("Product Name", subheader));
					HeaderTable88.addCell(new Phrase("Qty", subheader));
					
					
					
					PdfPCell batchNumberCell19 = new PdfPCell(new Phrase(
							"Unit", subheader));
					batchNumberCell19
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					batchNumberCell19.setBorder(Rectangle.BOTTOM);
					HeaderTable88.addCell(batchNumberCell19);
					/* HeaderTable6.addCell(new Phrase("", subheader)); */
                   
                	PdfPCell batchNumberCell199 = new PdfPCell(new Phrase(
							"Pur Qty", subheader));
					batchNumberCell199
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					batchNumberCell199.setBorder(Rectangle.BOTTOM);
					HeaderTable88.addCell(batchNumberCell199);
					
					
					PdfPCell mrpCell19 = new PdfPCell(new Phrase("Bill No",
							subheader));
					mrpCell19.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell19.setBorder(Rectangle.BOTTOM);
					HeaderTable88.addCell(mrpCell19);

			 	PdfPCell vatCell19 = new PdfPCell(new Phrase("Date",
							subheader));
					vatCell19.setHorizontalAlignment(Element.ALIGN_CENTER);
					vatCell19.setBorder(Rectangle.BOTTOM);
					HeaderTable88.addCell(vatCell19); 
					

					document.add(HeaderTable88);
					HeaderTable88.flushContent();

					HeaderTable88.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
					HeaderTable88.addCell(new Phrase("", tabletext));
					HeaderTable88.addCell(new Phrase("", tabletext));
					HeaderTable88.addCell(new Phrase("", tabletext));
					HeaderTable88.addCell(new Phrase("", tabletext));
					HeaderTable88.addCell(new Phrase("", tabletext));
					HeaderTable88.addCell(new Phrase("", tabletext));
					HeaderTable88.addCell(new Phrase("", tabletext));
				
		%>

<c:forEach items="${openingStock}" var="row" varStatus="count">

	<%-- <c:set var="patientNameCounter" value="${row.patientNameForCounter}" /> --%>

		<c:set var="productNameOpeningStock" value="${row.openingStockproductName}" />
		
		<c:set var="unit" value="${row.openingStockUnit}" />
		
		<c:set var="purQty" value="${row.openingPurQty}" />
		
		<c:set var="qtyOpeningStock" value="${row.openingStockqty}" />
		
		<c:set var="dateOpeningStock" value="${row.openingStockdate}" />

		<c:set var="receiptNoOpeningStock" value="${row.openingStockreceiptNo}" />
		
		<c:set var="counter" value="${(count.index)+1}" />
		
		
			<%
			
			String counter = ""
					+ (String) pageContext.getAttribute("counter")
							.toString();
			
		/* 	String patientNameCounter = "";
			if (pageContext.getAttribute("patientNameCounter") == null) {
				patientNameCounter = "";
			} else {

				patientNameCounter = patientNameCounter
						+ (String) pageContext.getAttribute(
								"patientNameCounter").toString();
			}
			 */
			
			String productNameOpeningStock = "";
			if (pageContext.getAttribute("productNameOpeningStock") == null) {
				productNameOpeningStock = "";
			} else {

				productNameOpeningStock = productNameOpeningStock
						+ (String) pageContext.getAttribute(
								"productNameOpeningStock").toString();
			}
			
			String unit = "";
			if (pageContext.getAttribute("unit") == null) {
				unit = "";
			} else {
				unit = unit
						+ (String) pageContext.getAttribute(
								"unit").toString();
			}
			
			String purQty = "";
			if (pageContext.getAttribute("purQty") == null) {
				purQty = "";
			} else {
				purQty = purQty
						+ (String) pageContext.getAttribute(
								"purQty").toString();
			}

			String saleDate1 = "";
			String splitSaleDate[];
			String saleDate = "";

			if (pageContext.getAttribute("dateOpeningStock") == null) {
				saleDate1 = "";
				saleDate = "";
			} else {
				saleDate1 = saleDate1
						+ (String) pageContext.getAttribute("dateOpeningStock")
								.toString();
				splitSaleDate = saleDate1.split(" ");
				saleDate = splitSaleDate[0];
			}

			
			String qtyOpeningStock = "";
			if (pageContext.getAttribute("qtyOpeningStock") == null) {
				qtyOpeningStock = "";
			} else {
				qtyOpeningStock = qtyOpeningStock
						+ (String) pageContext.getAttribute(
								"qtyOpeningStock").toString();
			}
		
			String receiptNoOpeningStock = "";
			if (pageContext.getAttribute("receiptNoOpeningStock") == null) {
				receiptNoOpeningStock = "";
			} else {
				receiptNoOpeningStock = receiptNoOpeningStock
						+ (String) pageContext.getAttribute(
								"receiptNoOpeningStock").toString();
			}

			HeaderTable88.addCell(new Phrase(counter, tabletext));
			HeaderTable88.addCell(new Phrase(productNameOpeningStock, tabletext));
			HeaderTable88.addCell(new Phrase(qtyOpeningStock, tabletext));
		/* 	HeaderTable8.addCell(new Phrase(receiptNoCounter, tabletext)); */

			PdfPCell vatcell11 = new PdfPCell(new Phrase(unit, tabletext));
			vatcell11.setHorizontalAlignment(Element.ALIGN_CENTER);
			vatcell11.setBorder(Rectangle.NO_BORDER);
			HeaderTable88.addCell(vatcell11); 
			
			PdfPCell vatcell12 = new PdfPCell(new Phrase(purQty, tabletext));
			vatcell12.setHorizontalAlignment(Element.ALIGN_CENTER);
			vatcell12.setBorder(Rectangle.NO_BORDER);
			HeaderTable88.addCell(vatcell12); 
		
			PdfPCell cell22 = new PdfPCell(
					new Phrase(receiptNoOpeningStock, tabletext));
			cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
			cell22.setBorder(Rectangle.NO_BORDER);
			HeaderTable88.addCell(cell22);
			
							PdfPCell cell2 = new PdfPCell(
									new Phrase(saleDate, tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable88.addCell(cell2);
						 
							document.add(HeaderTable88);
							HeaderTable88.flushContent();
			%>
		</c:forEach>
		
		<%
		HeaderTable88.getDefaultCell().setBorder(Rectangle.BOTTOM);
		HeaderTable88.addCell(new Phrase("", tabletext));
		HeaderTable88.addCell(new Phrase("", tabletext));
		HeaderTable88.addCell(new Phrase("", tabletext));
		HeaderTable88.addCell(new Phrase("", tabletext));
		HeaderTable88.addCell(new Phrase("", tabletext));
		HeaderTable88.addCell(new Phrase("", tabletext));
		HeaderTable88.addCell(new Phrase("", tabletext));
		
					document.add(HeaderTable88);
					HeaderTable88.flushContent();

					HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable1.addCell(new Phrase("            ", header));
					HeaderTable1.addCell(new Phrase("            ", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();

					PdfPTable HeaderTable124 = new PdfPTable(5);
					int[] headerwidth124 = { 20, 60, 20, 20, 20 };
					HeaderTable124.setWidths(headerwidth124);
					HeaderTable124.setWidthPercentage(95f);
					HeaderTable124.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable124.addCell(new Phrase("", subheader));
					HeaderTable124.addCell(new Phrase("", tabletext));
					HeaderTable124.addCell(new Phrase("", subheader));
					HeaderTable124.addCell(new Phrase("", subheader));
					HeaderTable124.addCell(new Phrase("", subheader));

					document.add(HeaderTable124);
					HeaderTable124.flushContent();

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

					patientDemoDetailName2.addCell(new Phrase("Counter Sale", tabletext1));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));

					document.add(patientDemoDetailName2);
					patientDemoDetailName2.flushContent();
		%>
		
		
		//Counter Sale
<%
			
					PdfPTable HeaderTable8 = new PdfPTable(6);
					int[] headerwidth8 = { 12, 20, 7, 15,10,10};
					HeaderTable8.setWidths(headerwidth8);
					HeaderTable8.setWidthPercentage(95f);
					HeaderTable8.getDefaultCell().setBorder(Rectangle.BOTTOM);

					HeaderTable8.addCell(new Phrase("", tabletext));
					HeaderTable8.addCell(new Phrase("", tabletext));
					HeaderTable8.addCell(new Phrase("", tabletext));
					HeaderTable8.addCell(new Phrase("", tabletext));
					HeaderTable8.addCell(new Phrase("", tabletext));
					HeaderTable8.addCell(new Phrase("", tabletext));
					
					HeaderTable8.addCell(new Phrase("#", subheader));
					HeaderTable8.addCell(new Phrase("Product Name", subheader));
					HeaderTable8.addCell(new Phrase("Qty", subheader));
					/* HeaderTable6.addCell(new Phrase("", subheader)); */

					PdfPCell mrpCell1 = new PdfPCell(new Phrase("Bill No",
							subheader));
					mrpCell1.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell1.setBorder(Rectangle.BOTTOM);
					HeaderTable8.addCell(mrpCell1);

			 	PdfPCell vatCell1 = new PdfPCell(new Phrase("Date",
							subheader));
					vatCell1.setHorizontalAlignment(Element.ALIGN_CENTER);
					vatCell1.setBorder(Rectangle.BOTTOM);
					HeaderTable8.addCell(vatCell1); 
					
					PdfPCell batchNumberCell1 = new PdfPCell(new Phrase(
							"Patient Name", subheader));
					batchNumberCell1
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					batchNumberCell1.setBorder(Rectangle.BOTTOM);
					HeaderTable8.addCell(batchNumberCell1);
					
								

					document.add(HeaderTable8);
					HeaderTable8.flushContent();

					HeaderTable8.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable8.addCell(new Phrase("", tabletext));
					HeaderTable8.addCell(new Phrase("", tabletext));
					HeaderTable8.addCell(new Phrase("", tabletext));
					HeaderTable8.addCell(new Phrase("", tabletext));
					HeaderTable8.addCell(new Phrase("", tabletext));
					HeaderTable8.addCell(new Phrase("", tabletext));
				
				
		%>

<c:forEach items="${counterSales}" var="row" varStatus="count">

	<c:set var="patientNameCounter" value="${row.patientNameForCounter}" />

		<c:set var="productNameCounter" value="${row.productNameForCounter}" />
		
		<c:set var="qtyCounter" value="${row.qtyForCounter}" />
		
		<c:set var="dateCounter" value="${row.dateForCounter}" />

		<c:set var="receiptNoCounter" value="${row.receiptNoForCounter}" />
		
		<c:set var="counter" value="${(count.index)+1}" />
			<%
			
			String counter = ""
					+ (String) pageContext.getAttribute("counter")
							.toString();
		
				
			
			String patientNameCounter = "";
			if (pageContext.getAttribute("patientNameCounter") == null) {
				patientNameCounter = "";
			} else {

				patientNameCounter = patientNameCounter
						+ (String) pageContext.getAttribute(
								"patientNameCounter").toString();
			}
			
			
			String productNameCounter = "";
			if (pageContext.getAttribute("productNameCounter") == null) {
				productNameCounter = "";
			} else {

				productNameCounter = productNameCounter
						+ (String) pageContext.getAttribute(
								"productNameCounter").toString();
			}

			String saleDate1 = "";
			String splitSaleDate[];
			String saleDate = "";

			if (pageContext.getAttribute("dateCounter") == null) {
				saleDate1 = "";
				saleDate = "";
			} else {
				saleDate1 = saleDate1
						+ (String) pageContext.getAttribute("dateCounter")
								.toString();
				splitSaleDate = saleDate1.split(" ");
				saleDate = splitSaleDate[0];
			}

			
			String qtyCounter = "";
			if (pageContext.getAttribute("qtyCounter") == null) {
				qtyCounter = "";
			} else {
				qtyCounter = qtyCounter
						+ (String) pageContext.getAttribute(
								"qtyCounter").toString();
			}
		
			String receiptNoCounter = "";
			if (pageContext.getAttribute("receiptNoCounter") == null) {
				receiptNoCounter = "";
			} else {
				receiptNoCounter = receiptNoCounter
						+ (String) pageContext.getAttribute(
								"receiptNoCounter").toString();
			}

			HeaderTable8.addCell(new Phrase(counter, tabletext));
			HeaderTable8.addCell(new Phrase(productNameCounter, tabletext));
			HeaderTable8.addCell(new Phrase(qtyCounter, tabletext));
		/* 	HeaderTable8.addCell(new Phrase(receiptNoCounter, tabletext)); */

			
			PdfPCell cell22 = new PdfPCell(
					new Phrase(receiptNoCounter, tabletext));
			cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
			cell22.setBorder(Rectangle.NO_BORDER);
			HeaderTable8.addCell(cell22);
			
							PdfPCell cell2 = new PdfPCell(
									new Phrase(saleDate, tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable8.addCell(cell2);

						 	PdfPCell vatcell11 = new PdfPCell(
									new Phrase(patientNameCounter, tabletext));
							vatcell11.setHorizontalAlignment(Element.ALIGN_CENTER);
							vatcell11.setBorder(Rectangle.NO_BORDER);
							HeaderTable8.addCell(vatcell11); 
									
							
							
							document.add(HeaderTable8);
							HeaderTable8.flushContent();
							
							
						
							
							
			%>
		</c:forEach>
		
		<%
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

				
					HeaderTable12.addCell(new Phrase("", subheader));
					HeaderTable12.addCell(new Phrase("", tabletext));
					HeaderTable12.addCell(new Phrase("", subheader));
					HeaderTable12.addCell(new Phrase("", subheader));
					HeaderTable12.addCell(new Phrase("", subheader));

					document.add(HeaderTable12);
					HeaderTable12.flushContent();

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

					patientDemoDetailName2.addCell(new Phrase("Patient Sale", tabletext1));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));

					document.add(patientDemoDetailName2);
					patientDemoDetailName2.flushContent();
									
		%>
		//patient sale
<%
			  
					PdfPTable HeaderTable9 = new PdfPTable(6);
					int[] headerwidth9 = { 12, 20, 7, 15,10,10};
					HeaderTable9.setWidths(headerwidth9);
					HeaderTable9.setWidthPercentage(95f);
					HeaderTable9.getDefaultCell().setBorder(Rectangle.BOTTOM);

					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					
					HeaderTable9.addCell(new Phrase("#", subheader));
					HeaderTable9.addCell(new Phrase("Product Name", subheader));
					HeaderTable9.addCell(new Phrase("Qty", subheader));
					/* HeaderTable6.addCell(new Phrase("", subheader)); */

					PdfPCell mrpCell11 = new PdfPCell(new Phrase("Bill No",
							subheader));
					mrpCell11.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell11.setBorder(Rectangle.BOTTOM);
					HeaderTable9.addCell(mrpCell11);

			 	PdfPCell vatCell12 = new PdfPCell(new Phrase("Date",
							subheader));
			 	vatCell12.setHorizontalAlignment(Element.ALIGN_CENTER);
			 	vatCell12.setBorder(Rectangle.BOTTOM);
			 	HeaderTable9.addCell(vatCell12); 
					
					PdfPCell batchNumberCell12 = new PdfPCell(new Phrase(
							"Patient Name", subheader));
					batchNumberCell12
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					batchNumberCell12.setBorder(Rectangle.BOTTOM);
					HeaderTable9.addCell(batchNumberCell12);
								

					document.add(HeaderTable9);
					HeaderTable9.flushContent();

					HeaderTable9.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
				
				
		%>

<c:forEach items="${patientSales}" var="row" varStatus="count">

	<c:set var="patientNamePatient" value="${row.patientNameForPatient}" />

		<c:set var="productNamePatient" value="${row.productNameForPatient}" />
		
		<c:set var="qtyPatient" value="${row.qtyForPatient}" />
		
		<c:set var="datePatient" value="${row.dateForPatient}" />

		<c:set var="receiptNoPatient" value="${row.receiptNoForPatient}" />
		
		<c:set var="counter" value="${(count.index)+1}" />
			<%
			
			String counter = ""
					+ (String) pageContext.getAttribute("counter")
							.toString();
		
				
			
			String patientNamePatient = "";
			if (pageContext.getAttribute("patientNamePatient") == null) {
				patientNamePatient = "";
			} else {

				patientNamePatient = patientNamePatient
						+ (String) pageContext.getAttribute(
								"patientNamePatient").toString();
			}
			
			
			String productNamePatient = "";
			if (pageContext.getAttribute("productNamePatient") == null) {
				productNamePatient = "";
			} else {

				productNamePatient = productNamePatient
						+ (String) pageContext.getAttribute(
								"productNamePatient").toString();
			}

			String saleDate1 = "";
			String splitSaleDate[];
			String saleDate = "";

			if (pageContext.getAttribute("datePatient") == null) {
				saleDate1 = "";
				saleDate = "";
			} else {
				saleDate1 = saleDate1
						+ (String) pageContext.getAttribute("datePatient")
								.toString();
				splitSaleDate = saleDate1.split(" ");
				saleDate = splitSaleDate[0];
			}

			
			String qtyPatient = "";
			if (pageContext.getAttribute("qtyPatient") == null) {
				qtyPatient = "";
			} else {
				qtyPatient = qtyPatient
						+ (String) pageContext.getAttribute(
								"qtyPatient").toString();
			}
		
			String receiptNoPatient = "";
			if (pageContext.getAttribute("receiptNoPatient") == null) {
				receiptNoPatient = "";
			} else {
				receiptNoPatient = receiptNoPatient
						+ (String) pageContext.getAttribute(
								"receiptNoPatient").toString();
			}

			HeaderTable9.addCell(new Phrase(counter, tabletext));
			HeaderTable9.addCell(new Phrase(productNamePatient, tabletext));
			HeaderTable9.addCell(new Phrase(qtyPatient, tabletext));
		/* 	HeaderTable9.addCell(new Phrase(receiptNoPatient, tabletext)); */
		
		
		
		PdfPCell cell22 = new PdfPCell(
					new Phrase(receiptNoPatient, tabletext));
			cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
			cell22.setBorder(Rectangle.NO_BORDER);
			HeaderTable9.addCell(cell22);

							PdfPCell cell2 = new PdfPCell(
									new Phrase(saleDate, tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable9.addCell(cell2);

						 	PdfPCell vatcell11 = new PdfPCell(
									new Phrase(patientNamePatient, tabletext));
							vatcell11.setHorizontalAlignment(Element.ALIGN_CENTER);
							vatcell11.setBorder(Rectangle.NO_BORDER);
							HeaderTable9.addCell(vatcell11); 
								
												
								
							document.add(HeaderTable9);
							HeaderTable9.flushContent();
			%>
		</c:forEach>
	<%
	HeaderTable9.getDefaultCell().setBorder(Rectangle.BOTTOM);
	HeaderTable9.addCell(new Phrase("", tabletext));
	HeaderTable9.addCell(new Phrase("", tabletext));
	HeaderTable9.addCell(new Phrase("", tabletext));
	HeaderTable9.addCell(new Phrase("", tabletext));
	HeaderTable9.addCell(new Phrase("", tabletext));
	HeaderTable9.addCell(new Phrase("", tabletext));

	
					document.add(HeaderTable9);
					HeaderTable9.flushContent();

		

					HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable1.addCell(new Phrase("            ", header));
					HeaderTable1.addCell(new Phrase("            ", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();


					PdfPTable HeaderTable122 = new PdfPTable(5);
					int[] headerwidth122 = { 20, 60, 20, 20, 20 };
					HeaderTable122.setWidths(headerwidth122);
					HeaderTable122.setWidthPercentage(95f);
					HeaderTable122.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

				
					HeaderTable122.addCell(new Phrase("", subheader));
					HeaderTable122.addCell(new Phrase("", tabletext));
					HeaderTable122.addCell(new Phrase("", subheader));
					HeaderTable122.addCell(new Phrase("", subheader));
					HeaderTable122.addCell(new Phrase("", subheader));

					document.add(HeaderTable122);
					HeaderTable122.flushContent();

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

					patientDemoDetailName2.addCell(new Phrase("Indent Sale", tabletext1));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));

					document.add(patientDemoDetailName2);
					patientDemoDetailName2.flushContent();
									
		%>
//Indent Sale
<%
			  
					PdfPTable HeaderTable10 = new PdfPTable(6);
					int[] headerwidth10 = { 12, 20, 7, 15,10,10};
					HeaderTable10.setWidths(headerwidth10);
					HeaderTable10.setWidthPercentage(95f);
					HeaderTable10.getDefaultCell().setBorder(Rectangle.BOTTOM);

					HeaderTable10.addCell(new Phrase("", tabletext));
					HeaderTable10.addCell(new Phrase("", tabletext));
					HeaderTable10.addCell(new Phrase("", tabletext));
					HeaderTable10.addCell(new Phrase("", tabletext));
					HeaderTable10.addCell(new Phrase("", tabletext));
					HeaderTable10.addCell(new Phrase("", tabletext));
					
					HeaderTable10.addCell(new Phrase("#", subheader));
					HeaderTable10.addCell(new Phrase("Product Name", subheader));
					HeaderTable10.addCell(new Phrase("Qty", subheader));
					/* HeaderTable6.addCell(new Phrase("", subheader)); */

					PdfPCell mrpCell12 = new PdfPCell(new Phrase("Bill No",
							subheader));
					mrpCell12.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell12.setBorder(Rectangle.BOTTOM);
					HeaderTable10.addCell(mrpCell12);

			 	PdfPCell vatCell123 = new PdfPCell(new Phrase("Date",
							subheader));
			 	vatCell123.setHorizontalAlignment(Element.ALIGN_CENTER);
			 	vatCell123.setBorder(Rectangle.BOTTOM);
			 	HeaderTable10.addCell(vatCell123); 
					
					PdfPCell batchNumberCell123 = new PdfPCell(new Phrase(
							"Patient Name", subheader));
					batchNumberCell123
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					batchNumberCell123.setBorder(Rectangle.BOTTOM);
					HeaderTable10.addCell(batchNumberCell123);
								

					document.add(HeaderTable10);
					HeaderTable10.flushContent();

					HeaderTable10.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable10.addCell(new Phrase("", tabletext));
					HeaderTable10.addCell(new Phrase("", tabletext));
					HeaderTable10.addCell(new Phrase("", tabletext));
					HeaderTable10.addCell(new Phrase("", tabletext));
					HeaderTable10.addCell(new Phrase("", tabletext));
					HeaderTable10.addCell(new Phrase("", tabletext));
				
				
		%>

<c:forEach items="${indentSales}" var="row" varStatus="count">

	<c:set var="patientNameIndent" value="${row.patientNameForIndent}" />

		<c:set var="productNameIndent" value="${row.productNameForIndent}" />
		
		<c:set var="qtyIndent" value="${row.qtyForIndent}" />
		
		<c:set var="dateIndent" value="${row.dateForIndent}" />

		<c:set var="receiptNoIndent" value="${row.receiptNoForIndent}" />
		
		<c:set var="counter" value="${(count.index)+1}" />
			<%
			
			String counter = ""
					+ (String) pageContext.getAttribute("counter")
							.toString();
		
				
			
			String patientNameIndent = "";
			if (pageContext.getAttribute("patientNameIndent") == null) {
				patientNameIndent = "";
			} else {

				patientNameIndent = patientNameIndent
						+ (String) pageContext.getAttribute(
								"patientNameIndent").toString();
			}
			
			
			String productNameIndent = "";
			if (pageContext.getAttribute("productNameIndent") == null) {
				productNameIndent = "";
			} else {

				productNameIndent = productNameIndent
						+ (String) pageContext.getAttribute(
								"productNameIndent").toString();
			}

			String saleDate1 = "";
			String splitSaleDate[];
			String saleDate = "";

			if (pageContext.getAttribute("dateIndent") == null) {
				saleDate1 = "";
				saleDate = "";
			} else {
				saleDate1 = saleDate1
						+ (String) pageContext.getAttribute("dateIndent")
								.toString();
				splitSaleDate = saleDate1.split(" ");
				saleDate = splitSaleDate[0];
			}

			
			String qtyIndent = "";
			if (pageContext.getAttribute("qtyIndent") == null) {
				qtyIndent = "";
			} else {
				qtyIndent = qtyIndent
						+ (String) pageContext.getAttribute(
								"qtyIndent").toString();
			}
		
			String receiptNoIndent = "";
			if (pageContext.getAttribute("receiptNoIndent") == null) {
				receiptNoIndent = "";
			} else {
				receiptNoIndent = receiptNoIndent
						+ (String) pageContext.getAttribute(
								"receiptNoIndent").toString();
			}

			HeaderTable10.addCell(new Phrase(counter, tabletext));
			HeaderTable10.addCell(new Phrase(productNameIndent, tabletext));
			HeaderTable10.addCell(new Phrase(qtyIndent, tabletext));
			/* HeaderTable10.addCell(new Phrase(receiptNoIndent, tabletext));
 */
			
			PdfPCell cell22 = new PdfPCell(
					new Phrase(receiptNoIndent, tabletext));
			cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
			cell22.setBorder(Rectangle.NO_BORDER);
			HeaderTable10.addCell(cell22);
			
							PdfPCell cell2 = new PdfPCell(
									new Phrase(saleDate, tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable10.addCell(cell2);

						 	PdfPCell vatcell11 = new PdfPCell(
									new Phrase(patientNameIndent, tabletext));
							vatcell11.setHorizontalAlignment(Element.ALIGN_CENTER);
							vatcell11.setBorder(Rectangle.NO_BORDER);
							HeaderTable10.addCell(vatcell11); 
								
												
								
							document.add(HeaderTable10);
							HeaderTable10.flushContent();
			%>
		</c:forEach>
	<%
	HeaderTable10.getDefaultCell().setBorder(Rectangle.BOTTOM);
	HeaderTable10.addCell(new Phrase("", tabletext));
	HeaderTable10.addCell(new Phrase("", tabletext));
	HeaderTable10.addCell(new Phrase("", tabletext));
	HeaderTable10.addCell(new Phrase("", tabletext));
	HeaderTable10.addCell(new Phrase("", tabletext));
	HeaderTable10.addCell(new Phrase("", tabletext));

	
					document.add(HeaderTable10);
					HeaderTable10.flushContent();

		

					HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable1.addCell(new Phrase("            ", header));
					HeaderTable1.addCell(new Phrase("            ", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();


					PdfPTable HeaderTable14 = new PdfPTable(5);
					int[] headerwidth14 = { 20, 60, 20, 20, 20 };
					HeaderTable14.setWidths(headerwidth14);
					HeaderTable14.setWidthPercentage(95f);
					HeaderTable14.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

				
					HeaderTable14.addCell(new Phrase("", subheader));
					HeaderTable14.addCell(new Phrase("", tabletext));
					HeaderTable14.addCell(new Phrase("", subheader));
					HeaderTable14.addCell(new Phrase("", subheader));
					HeaderTable14.addCell(new Phrase("", subheader));

					document.add(HeaderTable14);
					HeaderTable14.flushContent();

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

					patientDemoDetailName2.addCell(new Phrase("Credit Note", tabletext1));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));

					document.add(patientDemoDetailName2);
					patientDemoDetailName2.flushContent();
									
		%>


//Credit Note
<%
			  
					PdfPTable HeaderTable16 = new PdfPTable(6);
					int[] headerwidth16 = { 12, 20, 7, 15,10,10};
					HeaderTable16.setWidths(headerwidth16);
					HeaderTable16.setWidthPercentage(95f);
					HeaderTable16.getDefaultCell().setBorder(Rectangle.BOTTOM);

					HeaderTable16.addCell(new Phrase("", tabletext));
					HeaderTable16.addCell(new Phrase("", tabletext));
					HeaderTable16.addCell(new Phrase("", tabletext));
					HeaderTable16.addCell(new Phrase("", tabletext));
					HeaderTable16.addCell(new Phrase("", tabletext));
					HeaderTable16.addCell(new Phrase("", tabletext));
					
					HeaderTable16.addCell(new Phrase("#", subheader));
					HeaderTable16.addCell(new Phrase("Product Name", subheader));
					HeaderTable16.addCell(new Phrase("Qty", subheader));
					/* HeaderTable6.addCell(new Phrase("", subheader)); */

					PdfPCell mrpCell122 = new PdfPCell(new Phrase("Bill No",
							subheader));
					mrpCell122.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell122.setBorder(Rectangle.BOTTOM);
					HeaderTable16.addCell(mrpCell122);

			 	PdfPCell vatCell1234 = new PdfPCell(new Phrase("Date",
							subheader));
			 	vatCell1234.setHorizontalAlignment(Element.ALIGN_CENTER);
			 	vatCell1234.setBorder(Rectangle.BOTTOM);
			 	HeaderTable16.addCell(vatCell1234); 
					
					PdfPCell batchNumberCell1234 = new PdfPCell(new Phrase(
							"Patient Name", subheader));
					batchNumberCell1234
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					batchNumberCell1234.setBorder(Rectangle.BOTTOM);
					HeaderTable16.addCell(batchNumberCell1234);
								

					document.add(HeaderTable16);
					HeaderTable16.flushContent();

					HeaderTable16.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable16.addCell(new Phrase("", tabletext));
					HeaderTable16.addCell(new Phrase("", tabletext));
					HeaderTable16.addCell(new Phrase("", tabletext));
					HeaderTable16.addCell(new Phrase("", tabletext));
					HeaderTable16.addCell(new Phrase("", tabletext));
					HeaderTable16.addCell(new Phrase("", tabletext));
				
				
		%>

<c:forEach items="${creditNotes}" var="row" varStatus="count">

	<c:set var="patientNameCreditNote" value="${row.patientNameForCredit}" />

		<c:set var="productNameCreditNote" value="${row.productNameForCredit}" />
		
		<c:set var="qtyCreditNote" value="${row.qtyForCredit}" />
		
		<c:set var="dateCreditNote" value="${row.dateForCredit}" />

		<c:set var="receiptNoCreditNote" value="${row.receiptNoForCredit}" />
		
		<c:set var="counter" value="${(count.index)+1}" />
			<%
			
			String counter = ""
					+ (String) pageContext.getAttribute("counter")
							.toString();
		
				
			
			String patientNameCreditNote = "";
			if (pageContext.getAttribute("patientNameCreditNote") == null) {
				patientNameCreditNote = "";
			} else {

				patientNameCreditNote = patientNameCreditNote
						+ (String) pageContext.getAttribute(
								"patientNameCreditNote").toString();
			}
			
			
			String productNameCreditNote = "";
			if (pageContext.getAttribute("productNameCreditNote") == null) {
				productNameCreditNote = "";
			} else {

				productNameCreditNote = productNameCreditNote
						+ (String) pageContext.getAttribute(
								"productNameCreditNote").toString();
			}

			String saleDate1 = "";
			String splitSaleDate[];
			String saleDate = "";

			if (pageContext.getAttribute("dateCreditNote") == null) {
				saleDate1 = "";
				saleDate = "";
			} else {
				saleDate1 = saleDate1
						+ (String) pageContext.getAttribute("dateCreditNote")
								.toString();
				splitSaleDate = saleDate1.split(" ");
				saleDate = splitSaleDate[0];
			}

			
			String qtyCreditNote = "";
			if (pageContext.getAttribute("qtyCreditNote") == null) {
				qtyCreditNote = "";
			} else {
				qtyCreditNote = qtyCreditNote
						+ (String) pageContext.getAttribute(
								"qtyCreditNote").toString();
			}
		
			String receiptNoCreditNote = "";
			if (pageContext.getAttribute("receiptNoCreditNote") == null) {
				receiptNoCreditNote = "";
			} else {
				receiptNoCreditNote = receiptNoCreditNote
						+ (String) pageContext.getAttribute(
								"receiptNoCreditNote").toString();
			}

			HeaderTable16.addCell(new Phrase(counter, tabletext));
			HeaderTable16.addCell(new Phrase(productNameCreditNote, tabletext));
			HeaderTable16.addCell(new Phrase(qtyCreditNote, tabletext));
		/* 	HeaderTable16.addCell(new Phrase(receiptNoCreditNote, tabletext)); */
			
			PdfPCell cell22 = new PdfPCell(
					new Phrase(receiptNoCreditNote, tabletext));
			cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
			cell22.setBorder(Rectangle.NO_BORDER);
			HeaderTable16.addCell(cell22);

							PdfPCell cell2 = new PdfPCell(
									new Phrase(saleDate, tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable16.addCell(cell2);

						 	PdfPCell vatcell11 = new PdfPCell(
									new Phrase(patientNameCreditNote, tabletext));
							vatcell11.setHorizontalAlignment(Element.ALIGN_CENTER);
							vatcell11.setBorder(Rectangle.NO_BORDER);
							HeaderTable16.addCell(vatcell11); 
								
							document.add(HeaderTable16);
							HeaderTable16.flushContent();
			%>
		</c:forEach>
	<%
	HeaderTable10.getDefaultCell().setBorder(Rectangle.BOTTOM);
	HeaderTable10.addCell(new Phrase("", tabletext));
	HeaderTable10.addCell(new Phrase("", tabletext));
	HeaderTable10.addCell(new Phrase("", tabletext));
	HeaderTable10.addCell(new Phrase("", tabletext));
	HeaderTable10.addCell(new Phrase("", tabletext));
	HeaderTable10.addCell(new Phrase("", tabletext));

	
					document.add(HeaderTable10);
					HeaderTable10.flushContent();

		

					HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable1.addCell(new Phrase("            ", header));
					HeaderTable1.addCell(new Phrase("            ", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();


					PdfPTable HeaderTable15 = new PdfPTable(5);
					int[] headerwidth15 = { 20, 60, 20, 20, 20 };
					HeaderTable15.setWidths(headerwidth15);
					HeaderTable15.setWidthPercentage(95f);
					HeaderTable15.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

				
					HeaderTable15.addCell(new Phrase("", subheader));
					HeaderTable15.addCell(new Phrase("", tabletext));
					HeaderTable15.addCell(new Phrase("", subheader));
					HeaderTable15.addCell(new Phrase("", subheader));
					HeaderTable15.addCell(new Phrase("", subheader));

					document.add(HeaderTable15);
					HeaderTable15.flushContent();

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

					patientDemoDetailName2.addCell(new Phrase("Debit Note", tabletext1));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));

					document.add(patientDemoDetailName2);
					patientDemoDetailName2.flushContent();
									
		%>

//Debit Note
<%
			  
					PdfPTable HeaderTable17 = new PdfPTable(6);
					int[] headerwidth167 = { 12, 20, 7, 15,10,10};
					HeaderTable17.setWidths(headerwidth16);
					HeaderTable17.setWidthPercentage(95f);
					HeaderTable17.getDefaultCell().setBorder(Rectangle.BOTTOM);

					HeaderTable17.addCell(new Phrase("", tabletext));
					HeaderTable17.addCell(new Phrase("", tabletext));
					HeaderTable17.addCell(new Phrase("", tabletext));
					HeaderTable17.addCell(new Phrase("", tabletext));
					HeaderTable17.addCell(new Phrase("", tabletext));
					HeaderTable17.addCell(new Phrase("", tabletext));
					
					HeaderTable17.addCell(new Phrase("#", subheader));
					HeaderTable17.addCell(new Phrase("Product Name", subheader));
					HeaderTable17.addCell(new Phrase("Qty", subheader));
					/* HeaderTable6.addCell(new Phrase("", subheader)); */

					PdfPCell mrpCell6 = new PdfPCell(new Phrase("Bill No",
							subheader));
					mrpCell6.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell6.setBorder(Rectangle.BOTTOM);
					HeaderTable17.addCell(mrpCell6);

			 	PdfPCell vatCell6 = new PdfPCell(new Phrase("Date",
							subheader));
			 	vatCell6.setHorizontalAlignment(Element.ALIGN_CENTER);
			 	vatCell6.setBorder(Rectangle.BOTTOM);
			 	HeaderTable17.addCell(vatCell6); 
					
					PdfPCell batchNumberCell17 = new PdfPCell(new Phrase(
							"Vendor Name", subheader));
					batchNumberCell17
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					batchNumberCell17.setBorder(Rectangle.BOTTOM);
					HeaderTable17.addCell(batchNumberCell17);
								

					document.add(HeaderTable17);
					HeaderTable17.flushContent();

					HeaderTable17.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable17.addCell(new Phrase("", tabletext));
					HeaderTable17.addCell(new Phrase("", tabletext));
					HeaderTable17.addCell(new Phrase("", tabletext));
					HeaderTable17.addCell(new Phrase("", tabletext));
					HeaderTable17.addCell(new Phrase("", tabletext));
					HeaderTable17.addCell(new Phrase("", tabletext));
				
				
		%>

<c:forEach items="${debitNotes}" var="row" varStatus="count">

	<c:set var="patientNameDebitNote" value="${row.patientNameForDebit}" />

		<c:set var="productNameDebitNote" value="${row.productNameForDebit}" />
		
		<c:set var="qtyDebitNote" value="${row.qtyForDebit}" />
		
		<c:set var="dateDebitNote" value="${row.dateForDebit}" />

		<c:set var="receiptNoDebitNote" value="${row.receiptNoForDebit}" />
		
		<c:set var="counter" value="${(count.index)+1}" />
			<%
			
			String counter = ""
					+ (String) pageContext.getAttribute("counter")
							.toString();
		
				
			
			String patientNameDebitNote = "";
			if (pageContext.getAttribute("patientNameDebitNote") == null) {
				patientNameDebitNote = "";
			} else {

				patientNameDebitNote = patientNameDebitNote
						+ (String) pageContext.getAttribute(
								"patientNameDebitNote").toString();
			}
			
			
			String productNameDebitNote = "";
			if (pageContext.getAttribute("productNameDebitNote") == null) {
				productNameDebitNote = "";
			} else {

				productNameDebitNote = productNameDebitNote
						+ (String) pageContext.getAttribute(
								"productNameDebitNote").toString();
			}

			String saleDate1 = "";
			String splitSaleDate[];
			String saleDate = "";

			if (pageContext.getAttribute("dateDebitNote") == null) {
				saleDate1 = "";
				saleDate = "";
			} else {
				saleDate1 = saleDate1
						+ (String) pageContext.getAttribute("dateDebitNote")
								.toString();
				splitSaleDate = saleDate1.split(" ");
				saleDate = splitSaleDate[0];
			}

			
			String qtyDebitNote = "";
			if (pageContext.getAttribute("qtyDebitNote") == null) {
				qtyDebitNote = "";
			} else {
				qtyDebitNote = qtyDebitNote
						+ (String) pageContext.getAttribute(
								"qtyDebitNote").toString();
			}
		
			String receiptNoDebitNote = "";
			if (pageContext.getAttribute("receiptNoDebitNote") == null) {
				receiptNoDebitNote = "";
			} else {
				receiptNoDebitNote = receiptNoDebitNote
						+ (String) pageContext.getAttribute(
								"receiptNoDebitNote").toString();
			}

			HeaderTable17.addCell(new Phrase(counter, tabletext));
			HeaderTable17.addCell(new Phrase(productNameDebitNote, tabletext));
			HeaderTable17.addCell(new Phrase(qtyDebitNote, tabletext));
		/* 	HeaderTable17.addCell(new Phrase(receiptNoDebitNote, tabletext)); */

			
			PdfPCell cell22 = new PdfPCell(
					new Phrase(receiptNoDebitNote, tabletext));
			cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
			cell22.setBorder(Rectangle.NO_BORDER);
			HeaderTable17.addCell(cell22);

			
							PdfPCell cell2 = new PdfPCell(
									new Phrase(saleDate, tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable17.addCell(cell2);

						 	PdfPCell vatcell11 = new PdfPCell(
									new Phrase(patientNameDebitNote, tabletext));
							vatcell11.setHorizontalAlignment(Element.ALIGN_CENTER);
							vatcell11.setBorder(Rectangle.NO_BORDER);
							HeaderTable17.addCell(vatcell11); 
								
							document.add(HeaderTable17);
							HeaderTable17.flushContent();
			%>
		</c:forEach>
	<%
	HeaderTable10.getDefaultCell().setBorder(Rectangle.BOTTOM);
	HeaderTable10.addCell(new Phrase("", tabletext));
	HeaderTable10.addCell(new Phrase("", tabletext));
	HeaderTable10.addCell(new Phrase("", tabletext));
	HeaderTable10.addCell(new Phrase("", tabletext));
	HeaderTable10.addCell(new Phrase("", tabletext));
	HeaderTable10.addCell(new Phrase("", tabletext));

	
					document.add(HeaderTable10);
					HeaderTable10.flushContent();

		

					HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable1.addCell(new Phrase("            ", header));
					HeaderTable1.addCell(new Phrase("            ", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();


					PdfPTable HeaderTable101 = new PdfPTable(5);
					int[] headerwidth101 = { 20, 60, 20, 20, 20 };
					HeaderTable101.setWidths(headerwidth101);
					HeaderTable101.setWidthPercentage(95f);
					HeaderTable101.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

				
					HeaderTable101.addCell(new Phrase("", subheader));
					HeaderTable101.addCell(new Phrase("", tabletext));
					HeaderTable101.addCell(new Phrase("", subheader));
					HeaderTable101.addCell(new Phrase("", subheader));
					HeaderTable101.addCell(new Phrase("", subheader));

					document.add(HeaderTable101);
					HeaderTable101.flushContent();

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

					patientDemoDetailName2.addCell(new Phrase("Mrn Issue", tabletext1));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));

					document.add(patientDemoDetailName2);
					patientDemoDetailName2.flushContent();
									
		%>
		
		//Mrn Issue
<%
					PdfPTable HeaderTable174 = new PdfPTable(6);
					int[] headerwidth1674 = { 12, 20, 7, 15,10,10};
					HeaderTable174.setWidths(headerwidth1674);
					HeaderTable174.setWidthPercentage(95f);
					HeaderTable174.getDefaultCell().setBorder(Rectangle.BOTTOM);

					HeaderTable174.addCell(new Phrase("", tabletext));
					HeaderTable174.addCell(new Phrase("", tabletext));
					HeaderTable174.addCell(new Phrase("", tabletext));
					HeaderTable174.addCell(new Phrase("", tabletext));
					HeaderTable174.addCell(new Phrase("", tabletext));
					HeaderTable174.addCell(new Phrase("", tabletext));
					
					HeaderTable174.addCell(new Phrase("#", subheader));
					HeaderTable174.addCell(new Phrase("Product Name", subheader));
					HeaderTable174.addCell(new Phrase("Qty", subheader));
					/* HeaderTable6.addCell(new Phrase("", subheader)); */

					PdfPCell mrpCell66 = new PdfPCell(new Phrase("Bill No",
							subheader));
					mrpCell66.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell66.setBorder(Rectangle.BOTTOM);
					HeaderTable174.addCell(mrpCell66);

			 	PdfPCell vatCell66 = new PdfPCell(new Phrase("Date",
							subheader));
			 	vatCell66.setHorizontalAlignment(Element.ALIGN_CENTER);
			 	vatCell66.setBorder(Rectangle.BOTTOM);
			 	HeaderTable174.addCell(vatCell66); 
					
					PdfPCell batchNumberCell174 = new PdfPCell(new Phrase(
							"Store Name", subheader));
					batchNumberCell174
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					batchNumberCell174.setBorder(Rectangle.BOTTOM);
					HeaderTable174.addCell(batchNumberCell174);
								

					document.add(HeaderTable174);
					HeaderTable174.flushContent();

					HeaderTable174.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable174.addCell(new Phrase("", tabletext));
					HeaderTable174.addCell(new Phrase("", tabletext));
					HeaderTable174.addCell(new Phrase("", tabletext));
					HeaderTable174.addCell(new Phrase("", tabletext));
					HeaderTable174.addCell(new Phrase("", tabletext));
					HeaderTable174.addCell(new Phrase("", tabletext));
				
				
		%>

<c:forEach items="${mrnSlaves}" var="row" varStatus="count">

	<%-- <c:set var="patientNameDebitNote" value="${row.patientNameForDebit}" /> --%>

		<c:set var="productNameForMrn" value="${row.productNameForMrn}" />
		
		<c:set var="qtyForMrn" value="${row.qtyForMrn}" />
		
		<c:set var="dateForMrn" value="${row.dateForMrn}" />

		<c:set var="receiptNoForMrn" value="${row.receiptNoForMrn}" />
		
		 <c:set var="stockMrn" value="${row.stockMrn}" />
		
		<c:set var="counter" value="${(count.index)+1}" />
			<%
			
			String counter = ""
					+ (String) pageContext.getAttribute("counter")
							.toString();
		/* 	
			String patientNameDebitNote = "";
			if (pageContext.getAttribute("patientNameDebitNote") == null) {
				patientNameDebitNote = "";
			} else {

				patientNameDebitNote = patientNameDebitNote
						+ (String) pageContext.getAttribute(
								"patientNameDebitNote").toString();
			}
			 */
			
			String productNameForMrn = "";
			if (pageContext.getAttribute("productNameForMrn") == null) {
				productNameForMrn = "";
			} else {

				productNameForMrn = productNameForMrn
						+ (String) pageContext.getAttribute(
								"productNameForMrn").toString();
			}
			
			String stockMrn = "";
			if (pageContext.getAttribute("stockMrn") == null) 
			{
				stockMrn = "";
			} 
			else {
				stockMrn = stockMrn
						+ (String) pageContext.getAttribute(
								"stockMrn").toString();
			}

			String saleDate1 = "";
			String splitSaleDate[];
			String saleDate = "";

			if (pageContext.getAttribute("dateForMrn") == null) {
				saleDate1 = "";
				saleDate = "";
			} else {
				saleDate1 = saleDate1
						+ (String) pageContext.getAttribute("dateForMrn")
								.toString();
				splitSaleDate = saleDate1.split(" ");
				saleDate = splitSaleDate[0];
			}

			
			String qtyForMrn = "";
			if (pageContext.getAttribute("qtyForMrn") == null) {
				qtyForMrn = "";
			} else {
				qtyForMrn = qtyForMrn
						+ (String) pageContext.getAttribute(
								"qtyForMrn").toString();
			}
		
			String receiptNoForMrn = "";
			if (pageContext.getAttribute("receiptNoForMrn") == null) {
				receiptNoForMrn = "";
			} else {
				receiptNoForMrn = receiptNoForMrn
						+ (String) pageContext.getAttribute(
								"receiptNoForMrn").toString();
			}

			HeaderTable174.addCell(new Phrase(counter, tabletext));
			HeaderTable174.addCell(new Phrase(productNameForMrn, tabletext));
			HeaderTable174.addCell(new Phrase(qtyForMrn, tabletext));
		/* 	HeaderTable17.addCell(new Phrase(receiptNoDebitNote, tabletext)); */

			
			PdfPCell cell22 = new PdfPCell(
					new Phrase(receiptNoForMrn, tabletext));
			cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
			cell22.setBorder(Rectangle.NO_BORDER);
			HeaderTable174.addCell(cell22);

			
							PdfPCell cell2 = new PdfPCell(
									new Phrase(saleDate, tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable174.addCell(cell2);

						 	PdfPCell vatcell11 = new PdfPCell(
									new Phrase(stockMrn, tabletext));
							vatcell11.setHorizontalAlignment(Element.ALIGN_CENTER);
							vatcell11.setBorder(Rectangle.NO_BORDER);
							HeaderTable174.addCell(vatcell11); 
								
							document.add(HeaderTable174);
							HeaderTable174.flushContent();
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
