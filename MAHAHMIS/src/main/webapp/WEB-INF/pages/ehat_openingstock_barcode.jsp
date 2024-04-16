<%@page import="com.lowagie.text.pdf.Barcode128"%>
<%@page import="com.lowagie.text.pdf.PdfContentByte"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.pharmacy.pojo.CounterSaleMaster"%>
<%@ page import="java.util.Date"%>
<%-- <%@ page import="com.hms.dto.BillComponentSample"%>
<%@ page import="com.hms.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetailsForPharmacy"%> --%>
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
<%-- <%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.model.BillModel"%> --%>
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
<title>OPD Receipt</title>
</head>
<body>
	<%
		try {
		response.setContentType("application/pdf");

		ServletOutputStream outStream = response.getOutputStream();
		Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
		document.setMargins(20, 20, 40, 30);

		PdfWriter writer = PdfWriter.getInstance(document, outStream);

		//font
		Font header = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font subheader = new Font(Font.HELVETICA, 8, Font.BOLD);
		Font footer = new Font(Font.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader = new Font(Font.HELVETICA, 40, Font.BOLD);
		Font tabletext = new Font(Font.HELVETICA, 8, Font.NORMAL);
		Font small = new Font(Font.HELVETICA, 8, Font.NORMAL);

		HeaderFooter footerNew = new HeaderFooter(new Phrase("",
		tabletext), true);
		footerNew.setAlignment(Element.ALIGN_RIGHT);
		footerNew.setBorderWidthBottom(0);
		document.setFooter(footerNew);

		document.open();

		PdfContentByte contentByte;
		contentByte = writer.getDirectContent();

		PdfPTable HeaderTable10 = new PdfPTable(1);
		int[] headerwidth10 = { 30 };
		HeaderTable10.setWidths(headerwidth10);
		HeaderTable10.setWidthPercentage(100f);
		//HeaderTable10.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable10.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		int[] headerwidth11 = { 5 };

			String masterId = request.getParameter("masterId");
			String count = request.getParameter("count");
			String productName=request.getParameter("productName");
			
			String batchCode=request.getParameter("batchCode");
			

			

			Barcode128 code128 = new Barcode128();
			code128.setBaseline(-1);
			code128.setGenerateChecksum(true);
			code128.setCode(masterId);
			int i = 0;
			while (i < Integer.parseInt(count)) {
				HeaderTable10.addCell(code128.createImageWithBarcode(
						contentByte, null, null));
				
				
				HeaderTable10.addCell(new Phrase(("Product Name :" + productName), tableheader));
				HeaderTable10.addCell(new Phrase("Batch Code :"+batchCode, tableheader));
				
				HeaderTable10.addCell(new Phrase("", subheader));
				HeaderTable10.addCell(new Phrase("", subheader));
				HeaderTable10.addCell(new Phrase("", subheader));
				i++;
				
				if(masterId.length()==3)
				{
					
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					
					
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					
				}	
			}

			document.add(HeaderTable10);
			HeaderTable10.flushContent();

		
			

			HeaderTable10.addCell(new Phrase("", subheader));
			HeaderTable10.addCell(new Phrase("", subheader));
			HeaderTable10.addCell(new Phrase("", subheader));

			HeaderTable10.addCell(new Phrase("", subheader));
			HeaderTable10.addCell(new Phrase("", subheader));
			HeaderTable10.addCell(new Phrase("", subheader));

			HeaderTable10.addCell(new Phrase("", subheader));
			HeaderTable10.addCell(new Phrase("", subheader));
			HeaderTable10.addCell(new Phrase("", subheader));

			HeaderTable10.addCell(new Phrase("", subheader));
			HeaderTable10.addCell(new Phrase("", subheader));
			HeaderTable10.addCell(new Phrase("", subheader));

			HeaderTable10.addCell(new Phrase("", subheader));
			HeaderTable10.addCell(new Phrase("", subheader));
			HeaderTable10.addCell(new Phrase("", subheader));

			HeaderTable10.addCell(new Phrase("", subheader));
			HeaderTable10.addCell(new Phrase("", subheader));
			HeaderTable10.addCell(new Phrase("", subheader));

			HeaderTable10.addCell(new Phrase("", subheader));
			HeaderTable10.addCell(new Phrase("", subheader));
			HeaderTable10.addCell(new Phrase("", subheader));

			document.add(HeaderTable10);
			HeaderTable10.flushContent();
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

