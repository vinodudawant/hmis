<%@page import="com.itextpdf.text.TabStop.Alignment"%>
<%@page import="com.lowagie.text.pdf.Barcode128"%>
<%@page import="com.lowagie.text.pdf.PdfContentByte"%>
<%@page import="java.util.ResourceBundle"%>
<%@ page import="java.util.Date"%>
<%-- <%@ page import="com.hms.admin.util.FetchHospitalDetailsForPharmacy"%> --%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.pharmacy.controller.CounterSaleController"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.lowagie.text.PageSize"%>
<%-- <%@page import="com.hms.dto.Prescription"%> --%>
<%@page import="com.hms.utility.EnglishNumberToWords"%>
<%-- <%@page import="org.omg.CORBA._PolicyStub"%> --%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.List"%>
<%@ page import="com.hms.organdonation.service.OrganCollectionService"%>
<%@ page import="com.hms.organdonation.dto.OrganCollectionDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"
	import="com.lowagie.text.Chunk,com.lowagie.text.Document,com.lowagie.text.Element,com.lowagie.text.Font
	,com.lowagie.text.HeaderFooter,com.lowagie.text.Image,com.lowagie.text.Paragraph,com.lowagie.text.Phrase,com.lowagie.text.Rectangle
	,com.lowagie.text.pdf.PdfPCell,com.lowagie.text.pdf.PdfPTable,com.lowagie.text.pdf.PdfWriter,com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>

<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Organ Container</title>
</head>
<body>
	<%
		try {
		response.setContentType("application/pdf");

		ServletOutputStream outStream = response.getOutputStream();
		Document document = new Document(PageSize.A4);
		document.setMargins(20, 20, 50, 30);

		PdfWriter writer = PdfWriter.getInstance(document, outStream);

		//font
		Font header = new Font(Font.HELVETICA, 8, Font.BOLD);
		Font subheader = new Font(Font.HELVETICA, 30, Font.BOLD);
		Font footer = new Font(Font.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font tabletext = new Font(Font.HELVETICA, 8, Font.NORMAL);
		Font small = new Font(Font.HELVETICA, 8, Font.NORMAL);
		document.open();

		PdfContentByte contentByte;
		contentByte = writer.getDirectContent();

		PdfPTable HeaderTable10 = new PdfPTable(1);
		int[] headerwidth10 = { 100 };
		HeaderTable10.setWidths(headerwidth10);
		HeaderTable10.setWidthPercentage(70f);
		HeaderTable10.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable10.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		PdfPTable HeaderTable11 = new PdfPTable(1);
		int[] headerwidth11 = { 100 };
		HeaderTable11.setWidths(headerwidth11);
		HeaderTable11.setWidthPercentage(95f);
		HeaderTable11.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable11.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		PdfPTable HeaderTable12 = new PdfPTable(1);
		int[] headerwidth12 = { 100 };
		HeaderTable12.setWidths(headerwidth12);
		HeaderTable12.setWidthPercentage(95f);
		HeaderTable12.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable12.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		int count = Integer.parseInt(request.getParameter("quantity"));
		int masterId = Integer.parseInt(request.getParameter("organDetailsId"));
		String bagDetailsId = request.getParameter("organDetailsId");
		System.out.print("masterIdmasterIdmasterId" + masterId);
		String type = request.getParameter("callfrom");
		System.out.print("type" + type);
		if (type == null) {
			type = "-";
		} else {
			type = request.getParameter("callfrom");
		}

		OrganCollectionService fetchDetails = (ApplicationContextUtils.getApplicationContext())
		.getBean(OrganCollectionService.class);
		OrganCollectionDto listBagDetails = fetchDetails.getCollectedOrganById(masterId);
		String organName = listBagDetails.getOrganName() + ""
		+ listBagDetails.getOrganDonorTreatment().getOrganDonorTreatmentId();
		String barCode = listBagDetails.getOrganCollectionId() + "" + listBagDetails.getCollectionDateTime();

		Barcode128 code128 = new Barcode128();
		code128.setBaseline(-1);
		code128.setGenerateChecksum(true);
		code128.setSize(7f);
		code128.setBarHeight(10);
		code128.setCodeType(Barcode128.CODE128);

		//code128.setCode(masterId);
		int i = 0;
	 	while (i < count) {

			if (organName != null && !organName.isEmpty()) {

				HeaderTable11.addCell(new Phrase("Organ Name: " + organName, subheader));
			}else {
				HeaderTable11.addCell(new Phrase("", subheader));
			}

			if (barCode != null && !barCode.isEmpty()) {
				HeaderTable12.addCell(new Phrase("" + barCode, subheader));
			}else {
				HeaderTable12.addCell(new Phrase("", subheader));
			}

			HeaderTable10.addCell(code128.createImageWithBarcode(contentByte, null, null));

			i++;

			document.add(HeaderTable10);
			HeaderTable10.flushContent();

			document.add(HeaderTable11);
			HeaderTable11.flushContent();

			document.add(HeaderTable12);
			HeaderTable12.flushContent();

			//document.newPage();
		} 

		document.add(HeaderTable11);
		HeaderTable11.flushContent();

		document.add(HeaderTable10);
		HeaderTable10.flushContent();

		document.close();

		outStream.close();
		outStream.flush();
		return;

	} catch (Exception e) {
		e.printStackTrace();
	}
	%>
</body>
</html>

