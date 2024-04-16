<%@page import="com.lowagie.text.pdf.Barcode128"%>
<%@page import="com.lowagie.text.pdf.PdfContentByte"%>
<%@page import="java.util.ResourceBundle"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@page import="com.lowagie.text.PageSize"%>
<%@page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.List"%>
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
<!DOCTYPE">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

<%
	try {
	response.setContentType("application/pdf");

	ServletOutputStream outStream = response.getOutputStream();
	Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
	document.setMargins(20, 20, 40, 30);
	PdfWriter writer = PdfWriter.getInstance(document, outStream);
	
	ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	String lntUnit = (String) resourceBundle.getObject("lntUnit").toString();
	String lntCenter = "";
	if(lntUnit.equalsIgnoreCase("1"))
	{
		lntCenter = "Ahmednagar";
	}
	else if(lntUnit.equalsIgnoreCase("2"))
	{
		lntCenter = "Andheri";
	}
	else if(lntUnit.equalsIgnoreCase("3"))
	{
		lntCenter = "Chennai";
	}
	else if(lntUnit.equalsIgnoreCase("4"))
	{
		lntCenter = "Coimbatore";
	}
	else if(lntUnit.equalsIgnoreCase("5"))
	{
		lntCenter = "Lonavala";
	}
	else if(lntUnit.equalsIgnoreCase("6"))
	{
		lntCenter = "Surat";
	}
	else if(lntUnit.equalsIgnoreCase("7"))
	{
		lntCenter = "Thane";
	}
	else if(lntUnit.equalsIgnoreCase("8"))
	{
		lntCenter = "Vadodara";
	}
	else
	{
		lntCenter = "-";
	}
	//font
	Font header = new Font(Font.HELVETICA, 10, Font.BOLD);
	Font subheader = new Font(Font.HELVETICA, 8, Font.BOLD);
	Font footer = new Font(Font.HELVETICA, 8, Font.BOLD);
	header.setColor(10, 4, 2);

	Font tableheader = new Font(Font.HELVETICA, 13, Font.BOLD);
	Font tabletext = new Font(Font.HELVETICA, 8, Font.NORMAL);
	Font small = new Font(Font.HELVETICA, 8, Font.NORMAL);
	document.open();
	
	/*
	@author rohit sandbhor
	@since 27-08-2020
	@comment PdfContentByte is an object containing the user positioned text and graphic contents of a page. 
	It knows how to apply the proper font encoding.
	*/
	PdfContentByte contentByte;
	contentByte = writer.getDirectContent();

	PdfPTable HeaderTable10 = new PdfPTable(1);
	int[] headerwidth10 = { 30 };
	HeaderTable10.setWidths(headerwidth10);
	HeaderTable10.setWidthPercentage(100f);
	HeaderTable10.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	int[] headerwidth11 = { 5 };

	/*** 
	@author rohit sandbhor
	@since 27-08-2020
	@comment added these fields to get reflected on barcode page
	****/ 
	String maintId = request.getParameter("assetMaintenanceId");
	String srNo = request.getParameter("serailNo");
	String purchaseDate = request.getParameter("purchaseDate");
	String assestName = request.getParameter("assetName");
	String assetId = request.getParameter("assetId");
	String orgFarNo = request.getParameter("orgFarNo");
	System.out.println("Hello"+orgFarNo);
	if(orgFarNo.equalsIgnoreCase(null)|| orgFarNo.equalsIgnoreCase("null")){
		orgFarNo = "-";
	}
	if(srNo.equalsIgnoreCase(null)|| srNo.equalsIgnoreCase("null") || srNo.equalsIgnoreCase("") ){
		srNo = "-";
	}
	 
	
	Barcode128 code128 = new Barcode128();
	code128.setBaseline(-1);
	code128.setGenerateChecksum(true);
	code128.setCodeType(Barcode128.CODE128);
	code128.setSize(2);
	code128.setCode(maintId);
 
	 
		HeaderTable10.addCell(code128.createImageWithBarcode(
		contentByte, null, null));
		HeaderTable10.addCell(new Phrase("", subheader));
		HeaderTable10.addCell(new Phrase("", subheader));
		
		HeaderTable10.addCell(new Phrase("Center : "+lntCenter, tableheader));	//jitendra
		HeaderTable10.addCell(new Phrase("Asset Id : "+assetId+", Asset Name : "+assestName, tableheader));	//Vishnu
		HeaderTable10.addCell(new Phrase("Sr No : "+srNo,tableheader));
		HeaderTable10.addCell(new Phrase("Purchase Date : "+purchaseDate, tableheader));	//jitendra
		HeaderTable10.addCell(new Phrase("Org FAR No. : "+orgFarNo, tableheader));	//Vishnu
		//HeaderTable10.addCell(new Phrase("", subheader));
		
		
		 
	document.add(HeaderTable10);
	HeaderTable10.flushContent();
	
	document.close();
	
	outStream.close();
	outStream.flush();
	out.clear();
	return;

		} catch (Exception e) {
	System.err.println(e.getMessage());
	e.printStackTrace();
		}
%>
</body>
</html>