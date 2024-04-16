<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
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

			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 40, 70, 10 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable2 = new PdfPTable(5);
			int[] headerwidth2 = { 15, 25, 40, 10, 10 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			if (img == null) {
				HeaderTable1.addCell(new Phrase("", header));
			} else {
				HeaderTable1.addCell(cell);
			}
			/* HeaderTable1.addCell(new Phrase(
					"\n\n                                           "
							+ hospitalName + "\n      " + address, header)); */

							
							
							
							PdfPCell hospitalNameCell = new PdfPCell(new Phrase(
									hospitalName + "\n"+ country +"\n" +address+"\n TEL No:-"+contact, header));
							hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
							hospitalNameCell.setBorder(Rectangle.NO_BORDER);
							HeaderTable1.addCell(hospitalNameCell);
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

	<c:forEach items="${partyWisePoData}" var="row" varStatus="count">
		<c:set var="billId" value="${row.poId }" />
	
		<c:set var="billNumber" value="${row.podocId }" />

		<c:set var="saleDate" value="${row.poYear }" />

		<c:set var="patientName" value="${row.vendorMaster.vendorName }" />
		
		<c:set var="patientMobile" value="${row.vendorMaster.vendorMobileNumber }" />

		<%-- <c:set var="doctor" value="${row.doctorName }" /> --%>
		<%
		
					String billId = "";
					if (pageContext.getAttribute("billId") == null) {
						billId = "";
					} else {
			
						billId = billId
								+ (String) pageContext.getAttribute(
										"billId").toString();
					}			
		
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
					
				 String saleDate1 = "";
					String splitSaleDate[];
					String 	saleDate="";
					
					if(pageContext.getAttribute("saleDate")
							.toString()==null)
					{
					 saleDate1=""; 
						saleDate="";
					}
					else
					{
					/* 	saleDate1=saleDate1	+ (String) pageContext.getAttribute("saleDate")
								.toString();
						splitSaleDate=saleDate1.split(" ");
						saleDate=splitSaleDate[1]; */
						saleDate =  saleDate + (String) pageContext.getAttribute("saleDate")
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
					int[] headerwidth3 = { 18, 30, 20, 20, 40, 20 };
					HeaderTable3.setWidths(headerwidth3);
					HeaderTable3.setWidthPercentage(95f);
					HeaderTable3.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					
					BaseColor myColor = WebColors.getRGBColor("#00a0d6");
					
					PdfPCell text = new PdfPCell(new Phrase("Purchase Order",
					subheader));
					text.setHorizontalAlignment(Element.ALIGN_CENTER);
					text.setBackgroundColor(myColor);
					text.setBorder(Rectangle.NO_BORDER);
					HeaderTable3.addCell(text); 
					 
					 
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					
					/* document.add(HeaderTable2);
					HeaderTable2.flushContent(); */

					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("Date :-"+saleDate, subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("Receipt No:- "+billId, subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					
					
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("Vou No:- "+billNumber, subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					
					document.add(HeaderTable3);
					HeaderTable3.flushContent();
					
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

					PdfPTable HeaderTable4 = new PdfPTable(6);
					int[] headerwidth4 = { 18, 30, 20, 20, 11,20 };
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
					
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					
					PdfPCell cellVendor = new PdfPCell(new Phrase("Vendor:",
							subheader));
					cellVendor.setHorizontalAlignment(Element.ALIGN_CENTER);
					cellVendor.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cellVendor);
					HeaderTable4.addCell(new Phrase(patientName, tabletext));
					
					PdfPCell cell0 = new PdfPCell(new Phrase("Ship To:",
							subheader));
					cell0.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell0.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell0);
					//HeaderTable3.addCell(new Phrase("Department",subheader));
					HeaderTable4.addCell(new Phrase(hospitalName, tabletext)); // deptName.toUpperCase()
					
					
					PdfPCell cell00 = new PdfPCell(new Phrase("",
							subheader));
					cell00.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell00.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell00);

					/* HeaderTable4.addCell(new Phrase("", subheader)); */
					/* HeaderTable4.addCell(new Phrase("", tabletext));
					PdfPCell cell1 = new PdfPCell(new Phrase("", subheader));
					cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell1.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell1); */
					
					//HeaderTable3.addCell(new Phrase("OPD No",subheader));
				
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
				/* 	PdfPCell cell01 = new PdfPCell(new Phrase("Phone Number:",
							subheader));
					cell0.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell0.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell01); */
					//HeaderTable3.addCell(new Phrase("Department",subheader));
					HeaderTable4.addCell(new Phrase("", tabletext)); 
					HeaderTable4.addCell(new Phrase("Phone No:", subheader));
					HeaderTable4.addCell(new Phrase(patientMobile, tabletext));
					HeaderTable4.addCell(new Phrase("", subheader));
					
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
					
					
					PdfPTable HeaderTable8 = new PdfPTable(3);
					int[] headerwidth8 = {30, 40, 30 };
					HeaderTable8.setWidths(headerwidth8);
					HeaderTable8.setWidthPercentage(95f);

					HeaderTable8.addCell(new Phrase("Shipping Method", subheader));
					HeaderTable8.addCell(new Phrase("Shipping Terms", subheader));
					PdfPCell mrpCell1 = new PdfPCell(new Phrase("Delivery Date", subheader));
					mrpCell1.setHorizontalAlignment(Element.ALIGN_CENTER);
					/* mrpCell1.setBorder(Rectangle.BOTTOM); */ 
					HeaderTable8.addCell(mrpCell1);
					
					HeaderTable8.addCell(new Phrase("Self", tabletext));
					HeaderTable8.addCell(new Phrase("Responsibility of vendor", tabletext));
					HeaderTable8.addCell(new Phrase("", tabletext));
					
					document.add(HeaderTable8);
					HeaderTable8.flushContent();
					
					
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
					
					/* PdfPTable HeaderTable9 = new PdfPTable(3);
					int[] headerwidth9 = {30, 40, 30 };
					HeaderTable9.setWidths(headerwidth9);
					HeaderTable9.setWidthPercentage(95f);
					

					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", tabletext));

					
					
					document.add(HeaderTable9);
					HeaderTable9.flushContent(); */
					
					
					PdfPTable HeaderTable6 = new PdfPTable(6);
					int[] headerwidth6 = {6 ,30, 7, 15,  20, 20 };
					HeaderTable6.setWidths(headerwidth6);
					HeaderTable6.setWidthPercentage(95f);
					HeaderTable6.getDefaultCell().setBorder(Rectangle.BOTTOM);

					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));

					HeaderTable6.addCell(new Phrase("#", subheader));
					HeaderTable6.addCell(new Phrase("Product Name", subheader));
					HeaderTable6.addCell(new Phrase("Qty", subheader));
					/* HeaderTable6.addCell(new Phrase("", subheader)); */
					
					PdfPCell mrpCell = new PdfPCell(new Phrase("MRP (INR)", subheader));
					mrpCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					mrpCell.setBorder(Rectangle.BOTTOM); 
					HeaderTable6.addCell(mrpCell);
					
					/* PdfPCell batchNumberCell = new PdfPCell(new Phrase("Batch Number", subheader));
					batchNumberCell.setHorizontalAlignment(Element.ALIGN_CENTER);
					batchNumberCell.setBorder(Rectangle.BOTTOM); 
					HeaderTable6.addCell(batchNumberCell); */
					
					/* HeaderTable6.addCell(new Phrase(".", subheader)); */
				/* 	HeaderTable6.addCell(new Phrase("EXpiry", subheader)); */
					
					/* PdfPCell cells = new PdfPCell(new Phrase("Expiry", subheader));
					cells.setHorizontalAlignment(Element.ALIGN_CENTER);
					cells.setBorder(Rectangle.BOTTOM); 
					HeaderTable6.addCell(cells); */
					
					PdfPCell cells1 = new PdfPCell(new Phrase("Rate (INR)", subheader));
					cells1.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells1.setBorder(Rectangle.BOTTOM); 
					HeaderTable6.addCell(cells1);
					
					/* HeaderTable6.addCell(new Phrase(" ",
							subheader)); */
							
					PdfPCell cells2 = new PdfPCell(new Phrase("Amount (INR)", subheader));
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
					/* HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext)); */
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
		%>
		<c:set var="total" value="${row.poTotalAmt }" />

		<c:forEach items="${row.ltPOslave}" var="vendor"
			varStatus="count">

			<c:set var="qty" value="${vendor.poSlaveQty }" />

			<c:set var="mrp" value="${vendor.poSlaveMrp }" />

			<c:set var="rate" value="${vendor.poSlaveRate }" />

			<c:set var="amt" value="${vendor.poSlaveAmt }" />

			<%-- <c:set var="batchCode" value="${vendor.creditNoteSlaveBatchCode }" />

			<c:set var="expiry" value="${vendor.creditNoteSlaveBatchExpiry }" /> --%>

			<c:set var="counter" value="${(count.index)+1}" />
			
			<c:set var="productName" value="${vendor.productMaster.productName}" />

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

							String total = ""
									+ (String) pageContext.getAttribute("total")
											.toString();

							/* String batchCode = ""
									+ (String) pageContext
											.getAttribute("batchCode").toString();

							String expiry = ""
									+ (String) pageContext.getAttribute("expiry")
											.toString(); */
							
							String productName = ""
									+ (String) pageContext.getAttribute("productName")
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

							PdfPCell cell2 = new PdfPCell(new Phrase(mrp, tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_RIGHT); 
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell2);

							/* HeaderTable6.addCell(new Phrase(, tabletext)); */
							/* PdfPCell batchCodeCells = new PdfPCell(new Phrase("", tabletext));
							batchCodeCells.setHorizontalAlignment(Element.ALIGN_CENTER);
							batchCodeCells.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(batchCodeCells); */
							
							
							/* PdfPCell cell3 = new PdfPCell(new Phrase("", tabletext));
							cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell3.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell3); */

							PdfPCell cell4 = new PdfPCell(new Phrase(rate, tabletext));
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
					String total = ""
							+ (String) pageContext.getAttribute("total")
									.toString();
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
					
					PdfPTable HeaderTable7 = new PdfPTable(6);
					int[] headerwidth7 = { 6 ,30, 7, 15,  20, 20};
					HeaderTable7.setWidths(headerwidth7);
					HeaderTable7.setWidthPercentage(95f);
					HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("" , tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					
					PdfPCell mrpCell0 = new PdfPCell(new Phrase("Total", subheader));
					mrpCell0.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell0.setBorder(Rectangle.BOTTOM); 
					HeaderTable7.addCell(mrpCell0);
					
					/* HeaderTable7.addCell(new Phrase("" , subheader)); */
					
					PdfPCell mrpCell01 = new PdfPCell(new Phrase(total, subheader));
					mrpCell01.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell01.setBorder(Rectangle.BOTTOM); 
					HeaderTable7.addCell(mrpCell01);
					
					/* HeaderTable7.addCell(new Phrase(total , subheader)); */

					/* HeaderTable7.addCell(new Phrase("Balance", subheader));
					HeaderTable7.addCell(new Phrase("",tabletext));
					HeaderTable7.addCell(new Phrase("Discount", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("In Words", subheader)); */
					
					/* int finalTotal = (Integer.parseInt(total)); */
					
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

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
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
					
					
					PdfPTable HeaderTable9 = new PdfPTable(6);
					int[] headerwidth9 = { 6 ,30, 7, 15,  20, 20};
					HeaderTable9.setWidths(headerwidth9);
					HeaderTable9.setWidthPercentage(95f);
					HeaderTable9.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));

					HeaderTable9.addCell(new Phrase("1", subheader));
					HeaderTable9.addCell(new Phrase("Please send two copies of your invoice", subheader));
					HeaderTable9.addCell(new Phrase("" , tabletext));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));
					
					HeaderTable9.addCell(new Phrase("2", subheader));
					HeaderTable9.addCell(new Phrase("Enter this order in accordance with the prises,terms,delivery method and specification listed above, ", subheader));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));

					HeaderTable9.addCell(new Phrase("3", subheader));
					HeaderTable9.addCell(new Phrase("Please notify us immediately if you are unable to ship as specified", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));

					HeaderTable9.addCell(new Phrase("4", subheader));
					HeaderTable9.addCell(new Phrase("Send All Correspondence to", subheader));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));

					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));

					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", tabletext));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));
					HeaderTable9.addCell(new Phrase("", subheader));

					document.add(HeaderTable9);
					HeaderTable9.flushContent();
					

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
					PdfPTable HeaderTable5 = new PdfPTable(4);
					int[] headerwidth5 = { 30, 20, 40,20 };
					HeaderTable5.setWidths(headerwidth5);
					HeaderTable5.setWidthPercentage(95f);
					

					HeaderTable5.getDefaultCell().setBorder(Rectangle.BOX);
					HeaderTable5.addCell(new Phrase("               INR "
							+ total, subheader));
					HeaderTable5.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
					
					HeaderTable5.addCell(new Phrase("",tabletext));
					
					PdfPCell sampleCell = new PdfPCell(new Phrase("Authorized By", subheader));
					sampleCell.setHorizontalAlignment(Element.ALIGN_CENTER);
					sampleCell.setBorder(Rectangle.TOP); 
					HeaderTable5.addCell(sampleCell);
					
					PdfPCell sampleCell1 = new PdfPCell(new Phrase("Date", subheader));
					sampleCell1.setHorizontalAlignment(Element.ALIGN_CENTER);
					sampleCell1.setBorder(Rectangle.TOP); 
					HeaderTable5.addCell(sampleCell1);
					
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
