<%@page import="java.util.ResourceBundle"%>
<%@page import="com.itextpdf.text.pdf.BaseFont"%>
<%@page import="com.itextpdf.text.Element"%>
<%@page import="com.itextpdf.text.pdf.Barcode128"%>
<%@page import="com.itextpdf.text.pdf.PdfContentByte"%>
<%@page import="java.util.ResourceBundle"%>
<%@ page import="java.util.Date"%>
<%@page import="com.itextpdf.text.PageSize"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.List"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="com.itextpdf.text.Chunk,com.itextpdf.text.Document,com.itextpdf.text.Font
	,com.itextpdf.text.Image,com.itextpdf.text.Paragraph,com.itextpdf.text.Phrase,com.itextpdf.text.Rectangle
	,com.itextpdf.text.pdf.PdfPCell,com.itextpdf.text.pdf.PdfPTable,com.itextpdf.text.pdf.PdfWriter,com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
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
		Font subheader = new Font(Font.FontFamily.HELVETICA, 2, Font.BOLD);
		//font
	 	Font header = new Font(Font.FontFamily.HELVETICA, 2, Font.BOLD);
 		Font footer = new Font(Font.FontFamily.HELVETICA, 1, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader = new Font(Font.FontFamily.HELVETICA, 7, Font.BOLD);
		Font tabletext = new Font(Font.FontFamily.HELVETICA, 9, Font.NORMAL);
		Font small = new Font(Font.FontFamily.HELVETICA, 4, Font.NORMAL);
		
		
		/* HeaderFooter footerNew = new HeaderFooter(new Phrase("",
		tabletext), true);
		footerNew.setAlignment(Element.ALIGN_RIGHT);
		footerNew.setBorderWidthBottom(0);
		document.setFooter(footerNew); */
 		document.open();
 		document.newPage();
		PdfContentByte contentByte;
		contentByte = writer.getDirectContent();

 		 int count =Integer.parseInt(request.getParameter("count"));
		 String masterId = request.getParameter("masterId");
		 System.out.print("masterIdmasterIdmasterId"+masterId);
		 String ptName = request.getParameter("ptName");
		 String OpdIpdNo = request.getParameter("OpdIpdNo");
		 String age = request.getParameter("age");
		 String type = request.getParameter("type");
		 if(type == null){
			 type = "-";
		 }else{
			 type = request.getParameter("type");
		 }
		 
		 String brTitle=ptName+"\n"+OpdIpdNo+"\n"+age+"\n"+"              ";
		 
		 ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			
			//for centerpatientId
		    String patientId= resourceBundle.getObject("patientIdLabel").toString();
		 
		int cnt=count;
		int i = 0;
		int j=0;
		int k=0;
		int n=count;
		int count2=count;
		count=count*10;
		n=n%10;
		n=10-n;
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
		HeaderTable11.setWidths(headerwidth11);
		HeaderTable11.setWidthPercentage(10f);
 		HeaderTable11.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable11.getDefaultCell().setBorder(Rectangle.NO_BORDER);
 		HeaderTable11.setWidthPercentage(100);
 		
 		//create table cell for line spacing
 		PdfPTable HeaderTable12 = new PdfPTable(10);
		int[] headerwidth12 = { 40,10,40,10,40,10,40,10,40,10 };
		HeaderTable12.setWidths(headerwidth12);
		HeaderTable12.setWidthPercentage(10f);
		HeaderTable12.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable12.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable12.setWidthPercentage(100);
 		  
		//To cusmize barcode properties
  		/* Barcode128 code128 = new Barcode128();
   		code128.setSize(7f);
  		code128.setBarHeight(15);
   		code128.setCode("        "); */
   		
   		Barcode128 code128 = new Barcode128();
   		
   		code128.setSize(7f);
  		code128.setBarHeight(15);
   		//Jitendra 15 March 2019
		code128.setBaseline(-1);
		code128.setGenerateChecksum(true);
		code128.setCodeType(Barcode128.CODE128);
		System.out.println("Barcode128.CODE128 "+Barcode128.CODE128);

		code128.setCode(masterId);
 		
   		//If on print Horizontal barcode,else vertical.
   		if(type.equalsIgnoreCase("hori")){
   			while (i < count) {
   	 			if(i%2!=0){
   					HeaderTable10.addCell(new Phrase(" ", subheader));
   					HeaderTable11.addCell(new Phrase(" ", subheader));
   	 			}else{
   	 				if(j<count2)
   	 				{
   	 					HeaderTable11.addCell(new Phrase("" + (brTitle), tabletext)); 
   	 	  				HeaderTable10.addCell(code128.createImageWithBarcode(contentByte, null, null));
   	 	  				count2--;
   	 				}else
   	 				{	if(k<n)
   	 					{
   	 						HeaderTable11.addCell(new Phrase("", tabletext)); 
   	 	  					HeaderTable10.addCell(new Phrase("", tabletext));
   	 	  					k++;
   	 					}else
   	 					{
   	 						break;
   	 					}
   	 					
   	 				}
   	 			}
   	  			i++;
   	 			document.add(HeaderTable11);
   				document.add(HeaderTable10);
   	 			
   		  		HeaderTable10.flushContent();
   		  		HeaderTable11.flushContent();
   	 			
   	 		}
   		}else{
   			while (i < cnt) {
   		 		
   				HeaderTable11.addCell(new Phrase("", tabletext)); 
   				HeaderTable10.addCell(new Phrase("", tabletext));
   				HeaderTable12.addCell(new Phrase("\n\n", subheader));
   				
   				HeaderTable11.addCell(new Phrase("", tabletext)); 
   				HeaderTable10.addCell(new Phrase("", tabletext));
   				HeaderTable12.addCell(new Phrase("\n\n", subheader));
   				
   				HeaderTable11.addCell(new Phrase("", tabletext)); 
   				HeaderTable10.addCell(new Phrase("", tabletext));
   				HeaderTable12.addCell(new Phrase("\n\n", subheader));
   				
   				HeaderTable11.addCell(new Phrase("", tabletext)); 
   				HeaderTable10.addCell(new Phrase("", tabletext));
   				HeaderTable12.addCell(new Phrase("\n\n", subheader));
   				
 				if(j<count2)
 				{
 					HeaderTable11.addCell(new Phrase("" + (brTitle), tabletext)); 
 	  				HeaderTable10.addCell(code128.createImageWithBarcode(contentByte, null, null));
 	  				HeaderTable12.addCell(new Phrase("\n\n", subheader));
 	  				count2--;
 				}
  			i++;
  			
			
  			HeaderTable11.addCell(new Phrase("", tabletext)); 
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable12.addCell(new Phrase("\n\n", subheader));
			
			HeaderTable11.addCell(new Phrase("", tabletext)); 
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable12.addCell(new Phrase("\n\n", subheader));
			
			HeaderTable11.addCell(new Phrase("", tabletext)); 
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable12.addCell(new Phrase("\n\n", subheader));
			
			HeaderTable11.addCell(new Phrase("", tabletext)); 
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable12.addCell(new Phrase("\n\n", subheader));
			
			HeaderTable11.addCell(new Phrase("", tabletext)); 
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable12.addCell(new Phrase("\n\n", subheader));
			
 			document.add(HeaderTable11);
			document.add(HeaderTable10);
			document.add(HeaderTable12);
 			
	  		HeaderTable10.flushContent();
	  		HeaderTable11.flushContent();
	  		HeaderTable12.flushContent();
 			
 		}
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

