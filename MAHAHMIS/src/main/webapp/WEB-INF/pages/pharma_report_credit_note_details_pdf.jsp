<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
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
			Font tabletext1 = new Font(Font.HELVETICA, 12, Font.NORMAL);

			HeaderFooter footerNew = new HeaderFooter(new Phrase("",
					tabletext), true);
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
			int[] headerwidth1 = { 100 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable2 = new PdfPTable(6);
			int[] headerwidth2 = { 50, 10, 50, 30, 10, 50 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPCell hospitalNameCell = new PdfPCell(new Phrase(
					hospitalName + "\n" + country + "\n" + address
							+ "\n TEL No:-" + contact, header));
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
	
	<c:set var="treatId" value="${treatmentId}" />
	<c:set var="patName" value="${patientName}" />

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

			HeaderTable2.addCell(new Phrase("From  :  " + saleDate6,
					subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("      Credit Note Report",
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
			int[] headerwidthTitle = { 18, 28, 14, 24, 20, 20 };
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
			
			HeaderTableTitle.addCell(new Phrase("Patient Name:", subheader));
			HeaderTableTitle.addCell(new Phrase(patName, tabletext));
			PdfPCell cell001 = new PdfPCell(new Phrase("Treatment Id:",
					subheader));
			cell001.setHorizontalAlignment(Element.ALIGN_CENTER);
			cell001.setBorder(Rectangle.NO_BORDER);
			HeaderTableTitle.addCell(cell001);
			HeaderTableTitle.addCell(new Phrase(treatId, tabletext)); // deptName.toUpperCase()

			PdfPCell cell11 = new PdfPCell(new Phrase("", subheader));
			cell11.setHorizontalAlignment(Element.ALIGN_CENTER);
			cell11.setBorder(Rectangle.NO_BORDER);
			HeaderTableTitle.addCell(cell11);
			HeaderTableTitle.addCell(new Phrase("", tabletext));

			document.add(HeaderTableTitle);
			HeaderTableTitle.flushContent();
	%>
	//Purchase Entry


	<c:forEach items="${creditData}" var="row" varStatus="count">

		<c:set var="credtiNoteId" value="${row.credtiNoteId}" />

		<c:set var="amount" value="${row.amount}" />
		
		<c:set var="date" value="${row.date}" />

		<%
					String creditNoteId = ""
							+ (String) pageContext.getAttribute("credtiNoteId")
									.toString();

					String creditNoteAmount = ""
							+ (String) pageContext.getAttribute("amount")
									.toString();
					
					String date = ""
							+ (String) pageContext.getAttribute("date")
									.toString();

					PdfPTable HeaderTable4 = new PdfPTable(6);
					int[] headerwidth4 = { 14, 10, 5, 15, 10, 10 };
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
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					
					HeaderTable4
							.addCell(new Phrase("Credit Note Id :", subheader));
					HeaderTable4.addCell(new Phrase(creditNoteId, subheader));
					HeaderTable4.addCell(new Phrase("amount :", subheader));
					HeaderTable4.addCell(new Phrase(creditNoteAmount, subheader));
					HeaderTable4
							.addCell(new Phrase("Date(YYYY-MM-DD):", subheader));
					HeaderTable4.addCell(new Phrase(date, subheader));
					
					

					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", tabletext));
					PdfPCell cell0 = new PdfPCell(new Phrase("", subheader));
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
					
					
					PdfPTable HeaderTable6 = new PdfPTable(6);
					int[] headerwidth6 = { 12, 20, 7, 15, 10, 10 };
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

					HeaderTable6.addCell(new Phrase("#", subheader));
					HeaderTable6.addCell(new Phrase("Product Name",
							subheader));
					HeaderTable6.addCell(new Phrase("Qty", subheader));
					/* HeaderTable6.addCell(new Phrase("", subheader)); */

					PdfPCell mrpCell = new PdfPCell(new Phrase(
							"Batch Code", subheader));
					mrpCell.setHorizontalAlignment(Element.ALIGN_CENTER);
					mrpCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(mrpCell);

					PdfPCell batchNumberCell = new PdfPCell(new Phrase(
							"Rate", subheader));
					batchNumberCell
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					batchNumberCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(batchNumberCell);

					PdfPCell cells = new PdfPCell(new Phrase("Amount",
							subheader));
					cells.setHorizontalAlignment(Element.ALIGN_CENTER);
					cells.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells);

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
		%>
		
		<c:forEach items="${row.creditNoteSlaves}" var="slaves"
			varStatus="count">

			<c:set var="productName" value="${slaves.productMaster.productName }" />
			<c:set var="batchCode" value="${slaves.creditNoteSlaveBatchCode }" />
			<c:set var="qty" value="${slaves.creditSlaveQty }" />
			<c:set var="rate" value="${slaves.creditNoteSlaveRatePerUnit }" />
			<c:set var="amount" value="${slaves.creditNoteSlaveAmt }" />
			<c:set var="counter" value="${(count.index)+1}" />
			<%
							
			%>



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

							HeaderFooter header1 = new HeaderFooter(new Phrase("",
									tabletext), true);
							header1.setAlignment(Element.ALIGN_RIGHT);
							header1.setBorderWidthBottom(0);
							document.setHeader(header1);

							HeaderTable6.addCell(new Phrase(counter, tabletext));
							HeaderTable6
									.addCell(new Phrase(productName, tabletext));
							HeaderTable6.addCell(new Phrase(qty, tabletext));
							/* HeaderTable6.addCell(new Phrase(receiptNo, tabletext)); */

							PdfPCell cell22 = new PdfPCell(new Phrase(batchCode,
									tabletext));
							cell22.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell22.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell22);

							PdfPCell cell2 = new PdfPCell(new Phrase(rate,
									tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell2);

							PdfPCell vatcell11 = new PdfPCell(new Phrase(amount,
									tabletext));
							vatcell11.setHorizontalAlignment(Element.ALIGN_CENTER);
							vatcell11.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(vatcell11);

							document.add(HeaderTable6);
							HeaderTable6.flushContent();

							/* HeaderTable6.getDefaultCell().setBorder(
									Rectangle.BOTTOM); */
							
			%>
		</c:forEach>
		<%
		
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
				
				
				/* PdfPTable HeaderTable55 = new PdfPTable(6);
				int[] headerwidth55 = { 14, 10, 5, 15, 10, 10 };
				HeaderTable55.setWidths(headerwidth55);
				HeaderTable55.setWidthPercentage(95f);
				HeaderTable55.getDefaultCell()
						.setBorder(Rectangle.NO_BORDER);

				HeaderTable55.addCell(new Phrase("", subheader));
				HeaderTable55.addCell(new Phrase("", subheader));
				HeaderTable55.addCell(new Phrase("", subheader));
				HeaderTable55.addCell(new Phrase("", subheader));
				HeaderTable55.addCell(new Phrase("", subheader));
				HeaderTable55.addCell(new Phrase("", subheader));

				HeaderTable55
						.addCell(new Phrase("Net Amount:", subheader));
				HeaderTable55.addCell(new Phrase(netAmt, subheader));
				HeaderTable55.addCell(new Phrase("amount :", subheader));
				HeaderTable55.addCell(new Phrase(creditNoteAmount, subheader));
				HeaderTable55
						.addCell(new Phrase("Date(YYYY-MM-DD):", subheader));
				HeaderTable55.addCell(new Phrase(date, subheader));
				
				

				HeaderTable55.addCell(new Phrase("", subheader));
				HeaderTable55.addCell(new Phrase("", tabletext));
				PdfPCell cell01 = new PdfPCell(new Phrase("", subheader));
				cell01.setHorizontalAlignment(Element.ALIGN_CENTER);
				cell01.setBorder(Rectangle.NO_BORDER);
				HeaderTable55.addCell(cell01);

				HeaderTable55.addCell(new Phrase("", tabletext));

				PdfPCell cell11 = new PdfPCell(new Phrase("", subheader));
				cell11.setHorizontalAlignment(Element.ALIGN_CENTER);
				cell11.setBorder(Rectangle.NO_BORDER);
				HeaderTable55.addCell(cell11);

				HeaderTable55.addCell(new Phrase("", tabletext));

				document.add(HeaderTable55);
				HeaderTable55.flushContent(); */
				
				
				
				
				
		%>

	</c:forEach>
	

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
	HeaderTable5.addCell(new Phrase("          Total Amount    "
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
