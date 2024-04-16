<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
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

			PdfPTable HeaderTable2 = new PdfPTable(6);
			int[] headerwidth2 = { 4, 10, 3, 5, 3, 5 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			if (img == null) {
				HeaderTable1.addCell(new Phrase("", header));
			} else {
				HeaderTable1.addCell(cell);
			}
			HeaderTable1.addCell(new Phrase(hospitalName + "\n"+ country +"\n" +address+"\n TEL No:-"+contact, header));

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
	
	<c:set var="patientName" value="${indentSalePatientData}" /> 
<%-- 	<%
		String patientName=(String) session.getAttribute("patientName");
	 %> --%>
	<%-- <c:forEach items="${indentData}" var="row" varStatus="count"> --%>

		<c:set var="amountReceive" value="${amountReceive }" />

		<c:set var="narration" value="${narration }" />

		<c:set var="discount" value="${discount }" />
		
		<c:set var="paid" value="${amountPaid }" />

		<c:set var="date" value="${date}" />
		
		<c:set var="billNo" value="${billNo}" />
		
		<c:set var="time" value="${time}" />
		
		

		<%-- <c:set var="grossAmt" value="${row.indentSaleGrossAmt}" />

		<c:set var="surcharge" value="${row.indentSaleAdd}" /> --%>
		
       <%--  <c:set var="patientName" value="${row.patientName }" /> --%>



		<%-- <c:set var="patientName" value="${row.patientName }" />
		
		<c:set var="patientMobile" value="${row.patientMobile }" />

		<c:set var="doctor" value="${row.doctorName }" /> --%>
		<%
					String amountReceive = "";
					if (pageContext.getAttribute("amountReceive") == null) {
						amountReceive = "";
					} else {

						amountReceive = amountReceive
								+ (String) pageContext.getAttribute(
										"amountReceive").toString();
					}

					
					
					String patientName= "";
					if (pageContext.getAttribute("patientName") == null) {
						patientName = "";
					} else {

						patientName = patientName
								+ (String) pageContext.getAttribute(
										"patientName").toString();
					} 
					
					
					String narration = "";
					if (pageContext.getAttribute("narration") == null) {
						narration = "";
					} else {
						narration = narration
								+ (String) pageContext.getAttribute(
										"narration").toString();
					}

					String discount = "";
					if (pageContext.getAttribute("discount") == null) {
						discount = "";
					} else {
						discount = discount
								+ (String) pageContext.getAttribute("discount")
										.toString();
					}
					
					String date = "";
					if (pageContext.getAttribute("date") == null) {
						date = "";
					} else {
						date = date
								+ (String) pageContext.getAttribute("date")
										.toString();
					}
					
					String paid = "";
					if (pageContext.getAttribute("paid") == null) {
						paid = "";
					} else {
						paid = paid
								+ (String) pageContext.getAttribute("paid")
										.toString();
					}
					
					String billNo = "";
					if (pageContext.getAttribute("billNo") == null) {
						billNo = "";
					} else {
						billNo = billNo
								+ (String) pageContext.getAttribute("billNo")
										.toString();
					}
					
					String time = "";
					if (pageContext.getAttribute("time") == null) {
						time = "";
					} else {
						time = time
								+ (String) pageContext.getAttribute("time")
										.toString();
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
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					
					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable2
							.addCell(new Phrase("Ipd Bill No :-", subheader));
					PdfPCell subcell = new PdfPCell(new Phrase(billNo,
							subheader));
					subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
					subcell.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(subcell);
					//HeaderTable2.addCell(new Phrase(""+ReceiptNo,subheader));
					HeaderTable2.addCell(new Phrase("Date:", subheader));
					HeaderTable2.addCell(new Phrase(date, subheader));
					HeaderTable2.addCell(new Phrase("Time :-", subheader));
					
					HeaderTable2.addCell(new Phrase(time, subheader));
					
					
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
					/* HeaderTable4
					.addCell(new Phrase("Patient Name:", subheader));
			          HeaderTable4.addCell(new Phrase(patientName, tabletext)); */
					HeaderTable4
							.addCell(new Phrase("Patient Name:", subheader));
					HeaderTable4.addCell(new Phrase(patientName, tabletext));
					
					HeaderTable4
					.addCell(new Phrase("", subheader));
			      HeaderTable4.addCell(new Phrase("", tabletext));
					PdfPCell cell0 = new PdfPCell(new Phrase("", subheader));
					cell0.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell0.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell0);
					//HeaderTable3.addCell(new Phrase("Department",subheader));
					HeaderTable4.addCell(new Phrase("", tabletext)); // deptName.toUpperCase()

					PdfPCell cell00 = new PdfPCell(new Phrase("", subheader));
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
			/* afterVentilation.addCell(new Phrase("Sr", subheader));
					afterVentilation.addCell(new Phrase("Qty", subheader));
					afterVentilation.addCell(new Phrase("MRP", subheader));
					afterVentilation
							.addCell(new Phrase("Batch Num", subheader));
					afterVentilation.addCell(new Phrase("Expiry", subheader));
					afterVentilation.addCell(new Phrase("Rate", subheader));
					afterVentilation.addCell(new Phrase("Amt", subheader)); */

					PdfPTable HeaderTable6 = new PdfPTable(8);
					int[] headerwidth6 = { 15, 30, 7, 15, 10, 15, 20, 20 };
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
		%>
		<%-- <c:set var="total" value="${row.indentSaleNetAmt }" /> --%>

		<%-- <c:forEach items="${row.indentSaleSlaves}" var="vendor"
			varStatus="count"> --%>

		<%-- 	<c:set var="qty" value="${vendor.indentSaleSlaveQty }" />

			<c:set var="mrp" value="${vendor.indentSaleSlaveMrp }" />

			<c:set var="rate" value="${vendor.indentSaleSlaveRate }" />

			<c:set var="amt" value="${vendor.indentSaleSlaveAmt }" />

			<c:set var="batchCode" value="${vendor.indentSaleSlaveBatchCode }" />

			<c:set var="expiry" value="${vendor.indentSaleSlaveBatchExpiry }" />

			<c:set var="counter" value="${(count.index)+1}" />

			<c:set var="productName" value="${vendor.productMaster.productName}" /> --%>

			<%
				

							/* afterVentilation
									.addCell(new Phrase(counter, subheader));
							afterVentilation.addCell(new Phrase(qty, subheader));
							afterVentilation.addCell(new Phrase(mrp, subheader));
							afterVentilation.addCell(new Phrase(batchCode,
									subheader));
							afterVentilation.addCell(new Phrase(expiry, subheader));
							afterVentilation.addCell(new Phrase(rate, subheader));
							afterVentilation.addCell(new Phrase(amt, subheader)); */

							HeaderTable6.addCell(new Phrase("", tabletext));
							HeaderTable6
									.addCell(new Phrase("", tabletext));
							HeaderTable6.addCell(new Phrase("", tabletext));

							PdfPCell cell2 = new PdfPCell(
									new Phrase("", tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell2);

							/* HeaderTable6.addCell(new Phrase(, tabletext)); */
							PdfPCell batchCodeCells = new PdfPCell(new Phrase(
									"", tabletext));
							batchCodeCells
									.setHorizontalAlignment(Element.ALIGN_CENTER);
							batchCodeCells.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(batchCodeCells);

							PdfPCell cell3 = new PdfPCell(new Phrase("",
									tabletext));
							cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell3.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell3);

							PdfPCell cell4 = new PdfPCell(new Phrase("",
									tabletext));
							cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell4.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell4);

							PdfPCell cell5 = new PdfPCell(
									new Phrase("", tabletext));
							cell5.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell5.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell5);

							document.add(HeaderTable6);
							HeaderTable6.flushContent();
			%>
	<%-- 	</c:forEach> --%>

		<%
			HeaderTable6.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(new Phrase("Narration :", subheader));
					HeaderTable6.addCell(new Phrase(narration, subheader));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					/* String total = ""
							+ (String) pageContext.getAttribute("total")
									.toString(); */
					document.add(HeaderTable6);
					HeaderTable6.flushContent();

					/* 	document.add(afterVentilation);
						afterVentilation.flushContent(); */

					HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
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
					int[] headerwidth7 = { 20, 60, 30, 20, 20 };
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
					HeaderTable7.addCell(new Phrase("Amount Receive From Patient", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase(amountReceive, subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("Amount Paid To Patient", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase(paid, subheader));


					/* HeaderTable7.addCell(new Phrase("Balance", subheader));
					HeaderTable7.addCell(new Phrase("",tabletext));
					HeaderTable7.addCell(new Phrase("Discount", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("In Words", subheader)); */

					/* int finalTotal = (Integer.parseInt(total)); */

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
			Double amount=Double.parseDouble(amountReceive);
			if(amount==0) 
			{
				amount=Double.parseDouble(paid);
			}
				
		
			PdfPTable HeaderTable5 = new PdfPTable(3);
					int[] headerwidth5 = { 30, 60, 20 };
					HeaderTable5.setWidths(headerwidth5);
					HeaderTable5.setWidthPercentage(95f);
					HeaderTable5.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					int[] headerwidth = { 20, 60, 20 };
					HeaderTable5.setWidths(headerwidth);
					HeaderTable5.getDefaultCell().setBorder(Rectangle.BOX);
					HeaderTable5.addCell(new Phrase("INR       "+amount, subheader));
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
</body>
</html>