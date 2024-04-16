<%@page import="com.itextpdf.text.pdf.BaseFont"%>
 <%@page import="com.itextpdf.text.Element"%>
<%@page import="com.lowagie.text.pdf.Barcode128"%>
<%@page import="com.lowagie.text.pdf.PdfContentByte"%>
 <%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.pharmacy.pojo.CounterSaleMaster"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.pharmacy.controller.CounterSaleController"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.lowagie.text.PageSize"%>
<%@page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.List"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"
	import="com.lowagie.text.Chunk,com.lowagie.text.Document,com.lowagie.text.Font
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
<title>OPD Receipt</title>
</head>
<body>
	<%
		try {
			
			//*****@Author -Sagar Kadam*****//
			
		response.setContentType("application/pdf");
 		ServletOutputStream outStream = response.getOutputStream();
		Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
		//document.setMargins(40, 20, 40, 30);

		PdfWriter writer = PdfWriter.getInstance(document, outStream);
		Font subheader = new Font(Font.HELVETICA, 2, Font.BOLD);
		//font
	 	Font header = new Font(Font.HELVETICA, 2, Font.BOLD);
 		Font footer = new Font(Font.HELVETICA, 1, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader = new Font(Font.HELVETICA, 7, Font.BOLD);
		Font tabletext = new Font(Font.HELVETICA, 9, Font.NORMAL);
		Font small = new Font(Font.HELVETICA, 4, Font.NORMAL);

		HeaderFooter footerNew = new HeaderFooter(new Phrase("",
		tabletext), true);
		footerNew.setAlignment(Element.ALIGN_RIGHT);
		footerNew.setBorderWidthBottom(0);
		document.setFooter(footerNew);
 		document.open();

		PdfContentByte contentByte;
		contentByte = writer.getDirectContent();

 		 String count ="50";//request.getParameter("count");
		 String brTitle = request.getParameter("masterId");
		 //String ptName ="tk";// request.getParameter("ptName");
		// String OpdIpdNo ="120p";// request.getParameter("OpdIpdNo");
		 //String age ="12"; request.getParameter("age");

		int i = 0;
		//create table cell for barcode
 			PdfPTable HeaderTable10 = new PdfPTable(10);
		int[] headerwidth10 = { 40,10,40,10,40,10,40,10,40,10 };
		HeaderTable10.setWidths(headerwidth10);
  		HeaderTable10.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable10.getDefaultCell().setBorder(Rectangle.NO_BORDER);
 		HeaderTable10.setWidthPercentage(100);
		//create table cell for patient details
 		PdfPTable HeaderTable11 = new PdfPTable(10);
		int[] headerwidth11 = { 40,10,40,10,40,10,40,10,40,10 };
		HeaderTable11.setWidths(headerwidth10);
		HeaderTable11.setWidthPercentage(10f);
 		HeaderTable11.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable11.getDefaultCell().setBorder(Rectangle.NO_BORDER);
 		HeaderTable11.setWidthPercentage(100);
 		  
		//To cusmize barcode properties
  		Barcode128 code128 = new Barcode128();
   		code128.setSize(7f);
  		code128.setBarHeight(15);
   		code128.setCode("        ");
 		
		while (i < Integer.parseInt(count)) {
 			if(i%2!=0){
				HeaderTable10.addCell(new Phrase(" ", subheader));
				HeaderTable11.addCell(new Phrase(" ", subheader));
 			}else{
				HeaderTable11.addCell(new Phrase("" + (brTitle), tabletext)); 
  				HeaderTable10.addCell(code128.createImageWithBarcode(contentByte, null, null));
 			}
  			i++;
 			document.add(HeaderTable11);
			document.add(HeaderTable10);
 			
	  		HeaderTable10.flushContent();
	  		HeaderTable11.flushContent();
 			
 		}
  
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

