<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
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
		String date1 = "", date2 = "";

		date1 = request.getParameter("fromDMY");
		date2 = request.getParameter("toDMY");

		try {
			response.setContentType("application/pdf");

			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);

			ServletOutputStream outStream = response.getOutputStream();
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			document.setMargins(20, 20, 40, 30);

			PdfWriter.getInstance(document, outStream);
			session = request.getSession();
			String user_name = (String) session.getAttribute(" ");

			DecimalFormat df22 = new DecimalFormat("0.00");

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
			String hospitalName = hospObj.getHospitalName();
			hospitalName = hospitalName.toUpperCase();
			String address = hospObj.getHospitalAddress();
			String city = hospObj.getHospitalCity();
			String country = hospObj.getHospitalCountry();
			String contact = hospObj.getHospitalContact();
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

			String nabh = hospObj.getNabhImagePath();
			String nabhLogo = application.getRealPath(nabh);

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

			Image imgNabh = null;
			PdfPCell cellNabh = null;
			try {
				imgNabh = Image.getInstance(nabhLogo);
				imgNabh.scaleAbsolute(80, 60);
				cellNabh = new PdfPCell();
				cellNabh.addElement(new Chunk(imgNabh, 5, -5));
				cellNabh.setBorder(Rectangle.NO_BORDER);
			} catch (Exception e) {
				e.printStackTrace();
			}

			// Table 1 : For hospital adress details start
			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 30, 70, 30 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable1.setSpacingAfter(10f);

			if (img == null) {

				HeaderTable1.addCell(new Phrase("", header));
			} else {

				HeaderTable1.addCell(cell);
			}

			Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
			Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD);
			Phrase p = new Phrase();
			p.add(new Chunk(" " + hospitalName, bold));
			p.add(new Chunk(" \n\n" + address, tabletext));
			p.add(new Chunk(" \n" + city + " Pin- " + hospitalZip,
					tabletext));
			p.add(new Chunk(" \nPhone No. " + hPhoneNo, tabletext));
			p.add(new Chunk(" \n " + webste + " email: " + email, tabletext));
			p.add(new Chunk(" \nCIN: " + cinNo, tabletext));
			p.add(new Chunk(" \nCIN: " + serviceTaxNo + ", PAN No: "
					+ panNo, tabletext));

			PdfPCell hospitalNameCell = new PdfPCell(p);
			hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(hospitalNameCell);

			if (imgNabh == null) {

				HeaderTable1.addCell(new Phrase("", header));
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
			HeaderTable1.addCell(new Phrase(
					"Patientwise Sale Report between  " + date1 + " To "
							+ date2, header));
			HeaderTable1.addCell(new Phrase("", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();

			// Table 1 : For hospital adress details end

			PdfPTable patientDemoDetailName2 = new PdfPTable(4);
			int[] patientDemoDetailNameWidth2 = { 16, 36, 16, 36 };
			patientDemoDetailName2.setWidths(patientDemoDetailNameWidth2);
			patientDemoDetailName2.setWidthPercentage(95f);
			patientDemoDetailName2.getDefaultCell().setBorder(
					Rectangle.NO_BORDER);

			patientDemoDetailName2.setSpacingAfter(10f);

			document.add(patientDemoDetailName2);
			patientDemoDetailName2.flushContent();
	%>

	<c:forEach items="${patientSaleData}" var="row" varStatus="count">

		<c:set var="billId" value="${row.patientSalesBillId }" />

		<c:set var="saleDate" value="${row.patientSaleForTime }" />

		<c:set var="patientName" value="${row.patientBillMode }" />

		<c:set var="patientAddress" value="${row.patientSalesBillEntryBy}" />

		<c:set var="patientType" value="${row.patientType}" />

		<c:set var="net" value="${row.patientSalesBillNetAmt}" />

		<c:set var="ipdopdno" value="${row.patientSalesBillDocNo }" />

		<%
			String billNumber = "";
					if (pageContext.getAttribute("billId").toString() == null) {
						billNumber = "";
					} else {

						billNumber = billNumber
								+ (String) pageContext.getAttribute("billId")
										.toString();
					}

					String saleDate = "";

					if (pageContext.getAttribute("saleDate").toString() != null) {
						saleDate = pageContext.getAttribute("saleDate")
								.toString();
					}

					String patientName = "";
					if (pageContext.getAttribute("patientName").toString() == null) {
						patientName = "";
					} else {
						patientName = patientName
								+ (String) pageContext.getAttribute(
										"patientName").toString();
					}

					String amountReceive = "";
					if (pageContext.getAttribute("net") == null) {
						amountReceive = "";
					} else {
						amountReceive = amountReceive
								+ (String) pageContext.getAttribute("net")
										.toString();
					}

					String billId = "";
					if (pageContext.getAttribute("billId") == null) {
						billId = "";
					} else {

						billId = billId
								+ (String) pageContext.getAttribute("billId")
										.toString();
					}

					String patientType = "";
					if (pageContext.getAttribute("patientType") == null) {
						patientType = "";
					} else {

						patientType = patientType
								+ (String) pageContext.getAttribute(
										"patientType").toString();
					}

					String patientAddress = "";
					if (pageContext.getAttribute("patientAddress") == null) {
						patientAddress = "";
					} else {
						patientAddress = patientAddress
								+ (String) pageContext.getAttribute(
										"patientAddress").toString();
					}

					String ipdopdno = "";
					if (pageContext.getAttribute("ipdopdno").toString() == null) {
						ipdopdno = "";
					} else {
						ipdopdno = ipdopdno
								+ (String) pageContext.getAttribute("ipdopdno")
										.toString();
					}

					PdfPTable HeaderTable3 = new PdfPTable(6);
					int[] headerwidth3 = { 18, 30, 20, 20, 20, 20 };
					HeaderTable3.setWidths(headerwidth3);
					HeaderTable3.setWidthPercentage(95f);
					HeaderTable3.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					PdfPTable HeaderTable4 = new PdfPTable(4);
					int[] headerwidth4 = { 25, 80, 20, 40 };
					HeaderTable4.setWidths(headerwidth4);
					HeaderTable4.setWidthPercentage(95f);
					HeaderTable4.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable4.setSpacingAfter(10f);

					PdfPCell cell00 = new PdfPCell(new Phrase("Patient Name :",
							subheader));
					cell00.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell00);

					HeaderTable4.addCell(new Phrase(patientName.toUpperCase(),
							subheader));

					PdfPCell cell0 = new PdfPCell(new Phrase("IPD/OPD No :",
							subheader));
					cell0.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell0);
					HeaderTable4.addCell(new Phrase("" + ipdopdno, tabletext));

					PdfPCell cell002 = new PdfPCell(new Phrase("Address :",
							subheader));
					cell002.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell002);

					HeaderTable4.addCell(new Phrase(patientAddress, tabletext));

					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", tabletext));

					PdfPCell cell0022 = new PdfPCell(new Phrase("Department :",
							subheader));
					cell0022.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell0022);

					HeaderTable4
							.addCell(new Phrase("" + patientType, tabletext));

					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", tabletext));

					PdfPCell Bill = new PdfPCell(new Phrase("Bill  No :",
							subheader));
					Bill.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(Bill);
					HeaderTable4.addCell(new Phrase("" + billId, tabletext));

					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", tabletext));

					PdfPCell cell001 = new PdfPCell(new Phrase("Date :",
							subheader));
					cell001.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell001);
					HeaderTable4.addCell(new Phrase(saleDate + " " + "",
							tabletext));

					PdfPCell cell00122 = new PdfPCell(new Phrase("", subheader));
					cell00122.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell00122);
					HeaderTable4.addCell(new Phrase("", tabletext));

					document.add(HeaderTable4);
					HeaderTable4.flushContent();

					PdfPTable HeaderTable6 = new PdfPTable(7);
					int[] headerwidth6 = { 2, 10, 5, 5, 3, 6, 6 };
					HeaderTable6.setWidths(headerwidth6);
					HeaderTable6.setWidthPercentage(95f);
					HeaderTable6.getDefaultCell().setBorder(Rectangle.BOTTOM);

					HeaderTable6.addCell(new Phrase("", header));
					HeaderTable6.addCell(new Phrase("", header));
					HeaderTable6.addCell(new Phrase("", header));
					HeaderTable6.addCell(new Phrase("", header));
					HeaderTable6.addCell(new Phrase("", header));
					HeaderTable6.addCell(new Phrase("", header));
					HeaderTable6.addCell(new Phrase("", header));

					PdfPCell c = new PdfPCell(new Phrase("#", subheader));
					c.setHorizontalAlignment(Element.ALIGN_CENTER);
					c.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(c);

					PdfPCell prod = new PdfPCell(new Phrase("Item Name",
							subheader));
					prod.setHorizontalAlignment(Element.ALIGN_CENTER);
					prod.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(prod);

					PdfPCell batchNumberCell = new PdfPCell(new Phrase(
							"Batch No.", subheader));
					batchNumberCell
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					batchNumberCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(batchNumberCell);

					PdfPCell cells = new PdfPCell(new Phrase("Manufacturer",
							subheader));
					cells.setHorizontalAlignment(Element.ALIGN_CENTER);
					cells.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells);

					PdfPCell qtyCellHeader = new PdfPCell(new Phrase(
							"Quantity", subheader));
					qtyCellHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
					qtyCellHeader.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(qtyCellHeader);

					PdfPCell cells1 = new PdfPCell(
							new Phrase("Rate", subheader));
					cells1.setHorizontalAlignment(Element.ALIGN_CENTER);
					cells1.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells1);

					PdfPCell cells2 = new PdfPCell(new Phrase("Amount",
							subheader));
					cells2.setHorizontalAlignment(Element.ALIGN_CENTER);
					cells2.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells2);

					int cnt = 1;
					double mrpSum = 0.0, netSum = 0.0, qtySum = 0.0;
		%>

		<c:forEach items="${row.ltPatientSaleBill}" var="vendor"
			varStatus="count">

			<c:set var="qty" value="${vendor.patientSlaveQty }" />

			<c:set var="mrp" value="${vendor.patientSlaveMrp }" />

			<c:set var="batchCode" value="${vendor.patientSlaveBatchCode }" />

			<c:set var="expiry" value="${vendor.productMaster.cess }" />

			<c:set var="productName" value="${vendor.productMaster.productName}" />

			<%
				String qty = "";

							if (pageContext.getAttribute("qty").toString() == null) {
								qty = "";
							} else {
								qty = qty
										+ (String) pageContext.getAttribute("qty")
												.toString();

								qtySum += Double.parseDouble(qty);

							}

							String mrp = "";

							if (pageContext.getAttribute("mrp").toString() == null) {
								mrp = "";
							} else {
								mrp = mrp
										+ (String) pageContext.getAttribute("mrp")
												.toString();
								mrpSum += Double.parseDouble(mrp);
								netSum += (Double.parseDouble(mrp) * Double
										.parseDouble(qty));
							}

							String batchCode = "";
							if (pageContext.getAttribute("batchCode").toString() == null) {
								batchCode = "";
							} else {
								batchCode = batchCode
										+ (String) pageContext.getAttribute(
												"batchCode").toString();
							}

							String expiry = "";
							if (pageContext.getAttribute("expiry").toString() == null) {
								expiry = "";
							} else {
								expiry = expiry
										+ (String) pageContext.getAttribute(
												"expiry").toString();
							}

							String productName = "";
							if (pageContext.getAttribute("productName").toString() == null) {
								productName = "";
							} else {
								productName = ""
										+ (String) pageContext.getAttribute(
												"productName").toString();
							}

							PdfPCell cn = new PdfPCell(new Phrase((cnt++) + "",
									tabletext));
							cn.setHorizontalAlignment(Element.ALIGN_CENTER);
							cn.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cn);

							PdfPCell productNameCells1 = new PdfPCell(new Phrase(
									productName, tabletext));
							productNameCells1
									.setHorizontalAlignment(Element.ALIGN_CENTER);
							productNameCells1.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(productNameCells1);

							PdfPCell batchCodeCells = new PdfPCell(new Phrase(
									batchCode, tabletext));
							batchCodeCells
									.setHorizontalAlignment(Element.ALIGN_CENTER);
							batchCodeCells.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(batchCodeCells);

							PdfPCell cell3 = new PdfPCell(new Phrase(expiry,
									tabletext));
							cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell3.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell3);

							PdfPCell qtyCell = new PdfPCell(new Phrase(qty,
									tabletext));
							qtyCell.setHorizontalAlignment(Element.ALIGN_CENTER);
							qtyCell.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(qtyCell);

							PdfPCell pvat = new PdfPCell(new Phrase(mrp, tabletext));
							pvat.setHorizontalAlignment(Element.ALIGN_CENTER);
							pvat.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(pvat);

							PdfPCell pvat1 = new PdfPCell(
									new Phrase((Double.parseDouble(mrp) * Double
											.parseDouble(qty)) + "", tabletext));
							pvat1.setHorizontalAlignment(Element.ALIGN_CENTER);
							pvat1.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(pvat1);
			%>

		</c:forEach>
		<%
			HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));

					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));

					PdfPCell t = new PdfPCell(
							new Phrase("Sub Total", subheader));
					t.setHorizontalAlignment(Element.ALIGN_CENTER);
					t.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(t);

					PdfPCell t1 = new PdfPCell(new Phrase("" + qtySum,
							subheader));
					t1.setHorizontalAlignment(Element.ALIGN_CENTER);
					t1.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(t1);

					PdfPCell t2 = new PdfPCell(new Phrase("" + mrpSum,
							subheader));
					t2.setHorizontalAlignment(Element.ALIGN_CENTER);
					t2.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(t2);

					PdfPCell t3 = new PdfPCell(new Phrase("" + netSum,
							subheader));
					t3.setHorizontalAlignment(Element.ALIGN_CENTER);
					t3.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(t3);

					HeaderTable6.setSpacingAfter(20f);

					document.add(HeaderTable6);
					HeaderTable6.flushContent();
		%>
	</c:forEach>
	<%
			document.close();
			outStream.flush();
			outStream.close();

			return;

		} catch (Exception e) {
			System.err.println(e.getMessage());
			e.printStackTrace();
		}
	%>
</body>
</html>