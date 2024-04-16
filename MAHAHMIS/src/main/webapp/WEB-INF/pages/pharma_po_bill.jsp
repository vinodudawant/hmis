<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="java.util.Calendar"%>
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
<title>Purchase Order </title>
</head>
<body>
	<%
		try {
			response.setContentType("application/pdf"); 

			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);

			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			DecimalFormat df = new DecimalFormat("0.00");
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			document.setMargins(20, 20, 20, 0);

			PdfWriter.getInstance(document, outStream);
			document.open();
			//font

			session = request.getSession();
			String user_name = (String) session.getAttribute("userName");
			
			java.util.Calendar currentDate = Calendar.getInstance();
			SimpleDateFormat dateformatter = new SimpleDateFormat(
					"dd/MM/yyyy");
			String curr_date = dateformatter.format(currentDate.getTime());
			
			Font header = new Font(Font.FontFamily.UNDEFINED, 10, Font.BOLD);
			Font subheader = new Font(Font.FontFamily.UNDEFINED, 8,
					Font.BOLD);

			Font footer = new Font(Font.FontFamily.UNDEFINED, 8, Font.BOLD);
			header.setColor(10, 4, 2);

			Font tableheader = new Font(Font.FontFamily.UNDEFINED, 10,
					Font.BOLD);
			Font tabletext = new Font(Font.FontFamily.UNDEFINED, 8,
					Font.NORMAL);
			Font small = new Font(Font.FontFamily.UNDEFINED, 8, Font.NORMAL);

	
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
				img.scaleAbsolute(100, 60);
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

	<c:forEach items="${poData}" var="row" varStatus="count">

       <c:set var="billId" value="${row.poProductCount }" />

		<c:set var="billNumber" value="${row.podocId }" />

		<c:set var="saleDate" value="${row.poRemark }" />

		<c:set var="patientName" value="${row.vendorMaster.vendorName }" />
		
		<c:set var="patientMobile" value="${row.vendorMaster.vendorMobileNumber }" />
		
		 <c:set var="totalVat" value="${row.poTotalVat}" />
		 
		  <c:set var="totalAmtount" value="${row.poNetTotal}" />

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
					
					
					String totalAmt = "";
					if (pageContext.getAttribute("totalAmtount") == null) {
						totalAmt = "";
					} else {

						totalAmt = totalAmt
								+ (String) pageContext.getAttribute(
										"totalAmtount").toString();
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
						saleDate1=saleDate1	+ (String) pageContext.getAttribute("saleDate")
								.toString();
						splitSaleDate=saleDate1.split(" ");
						saleDate=splitSaleDate[0];
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
				
					PdfPTable HeaderTable3 = new PdfPTable(6);
					int[] headerwidth3 = { 18, 20, 20, 30, 20, 40 };
					HeaderTable3.setWidths(headerwidth3);
					HeaderTable3.setWidthPercentage(95f);
					HeaderTable3.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					
					
					BaseColor myColor = WebColors.getRGBColor("#00a0d6");
					
					PdfPCell text = new PdfPCell(new Phrase("Purchase Order(DayWise)",
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
					HeaderTable3.addCell(new Phrase("", subheader));
					
					/* document.add(HeaderTable2);
					HeaderTable2.flushContent(); */

					PdfPCell cellVendor = new PdfPCell(new Phrase("Vendor :",
							subheader));
					cellVendor.setHorizontalAlignment(Element.ALIGN_CENTER);
					cellVendor.setBorder(Rectangle.NO_BORDER);
					HeaderTable3.addCell(cellVendor);
					
					HeaderTable3.addCell(new Phrase(patientName, tabletext));
					/* HeaderTable3.addCell(new Phrase("", subheader)); */
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("Date :"+saleDate, subheader));
					
					
					
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("PO No :"+billId, subheader));
					
					
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", subheader));
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
					int[] headerwidth4 = { 18, 29, 13, 28, 10,30 };
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
					
					
										
					/* HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader)); */
					
					
					
					
									
					
				 	PdfPCell cell0 = new PdfPCell(new Phrase("Ship To :",
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

				
					HeaderTable4.addCell(new Phrase("", subheader));
				
					PdfPCell cellMobile = new PdfPCell(new Phrase("Phone No :",
							subheader));
					cellMobile.setHorizontalAlignment(Element.ALIGN_CENTER);
					cellMobile.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cellMobile);
					
					HeaderTable4.addCell(new Phrase(patientMobile, tabletext)); 
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
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

		%>

		<%
					
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
					HeaderTable8.addCell(new Phrase("" +saleDate, tabletext));
					
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
					
					PdfPTable HeaderTable6 = new PdfPTable(11);
					int[] headerwidth6 = {4,20,10,9,9,9,10,9,9,8,8 };
					HeaderTable6.setWidthPercentage(124);
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
					HeaderTable6.addCell(new Phrase("", tabletext));

					HeaderTable6.addCell(new Phrase("#", subheader));
					
					HeaderTable6.addCell(new Phrase("Product Name", subheader));
					HeaderTable6.addCell(new Phrase("HSN", subheader));
					HeaderTable6.addCell(new Phrase("Qty", subheader));
					HeaderTable6.addCell(new Phrase("MRP", subheader));
					HeaderTable6.addCell(new Phrase("Rate", subheader));
					HeaderTable6.addCell(new Phrase("Amt", subheader));
					
					
					HeaderTable6.addCell(new Phrase("SGST", subheader));
					HeaderTable6.addCell(new Phrase("CGST", subheader));
					HeaderTable6.addCell(new Phrase("IGST", subheader));
					HeaderTable6.addCell(new Phrase("CESS", subheader));
            		document.add(HeaderTable6);
					HeaderTable6.flushContent();

					HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
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
					
					
					
					PdfPTable HeaderTable666 = new PdfPTable(9);
					int[] headerwidth666 = {15,1,1,1,1,1,1,1,1 };
					
					HeaderTable666.setWidths(headerwidth666);
					HeaderTable666.setTotalWidth(200);
					HeaderTable666.setWidthPercentage(95f);
					
					
					HeaderTable666.addCell(new Phrase("", subheader));
					HeaderTable666.addCell(new Phrase("%", subheader));
					HeaderTable666.addCell(new Phrase("Amt", subheader));
					HeaderTable666.addCell(new Phrase("%", subheader));
					HeaderTable666.addCell(new Phrase("Amt", subheader));
				
					HeaderTable666.addCell(new Phrase("%", subheader));
					HeaderTable666.addCell(new Phrase("Amt", subheader));
					HeaderTable666.addCell(new Phrase("%", subheader));
					HeaderTable666.addCell(new Phrase("Amt", subheader));
				
					 	
					document.add(HeaderTable666);
					HeaderTable666.flushContent();
				
										
		%>
		
		<c:set var="total" value="${row.poTotalAmt}" />
      
        
         
		<c:forEach items="${row.ltPOslave}" var="vendor"
			varStatus="count">

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
							
								
							//int[] headerwidth6 = {4,20,10,9,9,9,13,9,9,9,9 };
							PdfPTable HeaderTable66 = new PdfPTable(15);
							int[] headerwidth66 = {4,20,10,8,8,8,12,4,5,4,5,4,5,4,5 };
							HeaderTable66.setWidths(headerwidth66);
							HeaderTable66.setWidthPercentage(95f);
							HeaderTable66.getDefaultCell().setBorder(Rectangle.BOTTOM);
							
							
							String productName = ""
									+ (String) pageContext.getAttribute("productName")
											.toString();
							
							  String hsnCode = ""
									+ (String) pageContext.getAttribute("hsn")
									.toString(); 
							  

							  String poSlaveVat = ""
									+ (String) pageContext.getAttribute("poSlaveVat")
									.toString(); 
							 
							  
							  String poIgst = ""
										+ (String) pageContext.getAttribute("poIgst")
										.toString(); 
								  
							  String poCess = ""
										+ (String) pageContext.getAttribute("poCess")
										.toString(); 
								  
							  
							
							HeaderTable66.addCell(new Phrase(counter, tabletext));
						//	HeaderTable66.addCell(new Phrase(productName, tabletext));
							
							PdfPCell cell11 = new PdfPCell(new Phrase(productName, tabletext));
							cell11.setHorizontalAlignment(Element.ALIGN_LEFT); 
							cell11.setBorder(Rectangle.BOTTOM);
							HeaderTable66.addCell(cell11);
						
							HeaderTable66.addCell(new Phrase(hsnCode, tabletext));
							HeaderTable66.addCell(new Phrase(qty, tabletext));
							
						    HeaderTable66.addCell(new Phrase(mrp, tabletext));
							Double rate2 = Double.parseDouble(rate);
							HeaderTable66.addCell(new Phrase(df.format(rate2), tabletext));
							
						
							Double amt2 = Double.parseDouble(amt);
							PdfPCell cell5 = new PdfPCell(new Phrase(df.format(amt2), tabletext));
							cell5.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell5.setBorder(Rectangle.BOTTOM);
							HeaderTable66.addCell(cell5);
							
							
							Double gst = Double.parseDouble(poSlaveVat)/2	;//   gst = sgst &cgst
						 	HeaderTable66.addCell(new Phrase(gst+"", tabletext));
							HeaderTable66.addCell(new Phrase((df.format((amt2*gst)/100))+"", tabletext));
							HeaderTable66.addCell(new Phrase(gst+"", tabletext));
							HeaderTable66.addCell(new Phrase((df.format((amt2*gst)/100))+"", tabletext));
							
							HeaderTable66.addCell(new Phrase(poIgst, tabletext));
							Double igst = Double.parseDouble(poIgst);
							HeaderTable66.addCell(new Phrase((df.format((amt2*igst)/100))+"", tabletext));
						
							
							HeaderTable66.addCell(new Phrase(poCess, tabletext));
							Double cess = Double.parseDouble(poCess);
							HeaderTable66.addCell(new Phrase((df.format((amt2*cess)/100))+"", tabletext));
						
						
							document.add(HeaderTable66);
							HeaderTable66.flushContent();

							
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
					Double total =  (Double) pageContext.getAttribute("total");
					Double totalVat =  (Double) pageContext.getAttribute("totalVat");
					 

					HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable1.addCell(new Phrase("            ", header));
					HeaderTable1.addCell(new Phrase("            ", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();

					
					PdfPTable HeaderTable7 = new PdfPTable(6);
					int[] headerwidth7 = { 6 ,30, 10, 25, 12, 10};
					HeaderTable7.setWidths(headerwidth7);
					HeaderTable7.setWidthPercentage(95f);
					HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					
					
					PdfPCell mrpCell015 = new PdfPCell(new Phrase("", subheader));
					mrpCell015.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell015.setBorder(Rectangle.TOP); 
					HeaderTable7.addCell(mrpCell015);
					
					PdfPCell mrpCell014 = new PdfPCell(new Phrase("", subheader));
					mrpCell014.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell014.setBorder(Rectangle.TOP); 
					HeaderTable7.addCell(mrpCell014);
					
					
					PdfPCell mrpCell013 = new PdfPCell(new Phrase("", subheader));
					mrpCell013.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell013.setBorder(Rectangle.TOP); 
					HeaderTable7.addCell(mrpCell013);
					
					
					PdfPCell mrpCell011 = new PdfPCell(new Phrase("", subheader));
					mrpCell011.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell011.setBorder(Rectangle.TOP); 
					HeaderTable7.addCell(mrpCell011);
					
					
					PdfPCell mrpCell0 = new PdfPCell(new Phrase("Total GST (Rs):-", subheader));
					mrpCell0.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell0.setBorder(Rectangle.TOP); 
					HeaderTable7.addCell(mrpCell0);
					
					/* HeaderTable7.addCell(new Phrase("" , subheader)); */
					
					PdfPCell mrpCell01 = new PdfPCell(new Phrase(""+(df.format(totalVat)), subheader));
					mrpCell01.setHorizontalAlignment(Element.ALIGN_RIGHT);
					mrpCell01.setBorder(Rectangle.TOP); 
					HeaderTable7.addCell(mrpCell01);
					
					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase(" Total Amt (Rs):-", subheader));
					
					PdfPCell mrpCell02 = new PdfPCell(new Phrase(""+(df.format(Math.round(total))), subheader));
					mrpCell02.setHorizontalAlignment(Element.ALIGN_RIGHT);
					mrpCell02.setBorder(Rectangle.NO_BORDER); 
					HeaderTable7.addCell(mrpCell02);
			
					
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

					/* HeaderTable9.addCell(new Phrase("1", subheader));
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
					HeaderTable9.addCell(new Phrase("", subheader)); */

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

		%>
		<%
					PdfPTable HeaderTable5 = new PdfPTable(4);
					int[] headerwidth5 = { 30, 20, 40,20 };
					
					
					HeaderTable5.setWidths(headerwidth5);
					HeaderTable5.setWidthPercentage(95f);
					/* double addition=Double.parseDouble(pageContext.getAttribute("total").toString())
							+ Double.parseDouble(pageContext.getAttribute("totalVat").toString()); */

					HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
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