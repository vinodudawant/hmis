<%@page import="java.util.Arrays"%>
<%@page import="com.itextpdf.text.pdf.draw.VerticalPositionMark"%>
<%@page import="java.util.ResourceBundle"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.util.List"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%-- <%@ page import="com.hms.admin.util.FetchHospitalDetails"%> --%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="java.util.ArrayList"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@page import="org.krysalis.barcode4j.BarcodeUtil"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>IPD Receipt</title>
</head>
<body>
	<%
		try {

			response.setContentType("application/pdf");
			ServletOutputStream outStream = response.getOutputStream();
			response.reset();

            ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			
			//for centerpatientId
		    String patientId= resourceBundle.getObject("patientIdLabel").toString();
			
			Rectangle two = new Rectangle(700, 400);
			Document document = new Document(PageSize.A4);
			document.setMargins(-2,2,-2,-5);
			PdfWriter writer =PdfWriter.getInstance(document, outStream);
			document.open();
			//font

			Font header = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD);
			Font subheader = new Font(Font.FontFamily.HELVETICA, 7,
					Font.BOLD);
			Font footer = new Font(Font.FontFamily.HELVETICA, 7, Font.BOLD);
			header.setColor(10, 4, 2);

			Font tableheader = new Font(Font.FontFamily.HELVETICA, 15,
					Font.BOLD);
			Font tabletext = new Font(Font.FontFamily.HELVETICA, 7,
					Font.NORMAL);
			Font small = new Font(Font.FontFamily.HELVETICA, 7, Font.NORMAL);

			Font header1 = new Font(Font.FontFamily.HELVETICA, 13,
					Font.BOLD);
			Font subheader1 = new Font(Font.FontFamily.HELVETICA, 9,
					Font.BOLD);
			Font footer1 = new Font(Font.FontFamily.HELVETICA, 7, Font.BOLD);
			header.setColor(10, 4, 2);

			Font tableheader1 = new Font(Font.FontFamily.HELVETICA, 13,
					Font.NORMAL);
			Font tabletext1 = new Font(Font.FontFamily.HELVETICA, 9,
					Font.NORMAL);

			Font header2 = new Font(Font.FontFamily.HELVETICA, 13,
					Font.BOLD);
			Font subheader2 = new Font(Font.FontFamily.HELVETICA, 11,
					Font.BOLD);
			Font footer2 = new Font(Font.FontFamily.HELVETICA, 7, Font.BOLD);
			header.setColor(10, 4, 2);

			Font tableheader2 = new Font(Font.FontFamily.HELVETICA, 9,
					Font.BOLD);
			Font tabletext2 = new Font(Font.FontFamily.HELVETICA, 11,
					Font.NORMAL);

			FontSelector selector = new FontSelector();
			selector.addFont(subheader);

			java.util.Calendar currentDate = Calendar.getInstance();
			SimpleDateFormat dateformatter = new SimpleDateFormat(
					"dd/MM/yyyy");
			
			String treatId = request.getParameter("treatId"); 
			SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
			String todays_date = formatter.format(currentDate.getTime());
			RegistrationController uss=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
			RegTreBillDto rtd = new RegTreBillDto();
			rtd=uss.fetchPatientsRecordByTreatmentId(Integer.parseInt(treatId));
			int ProductId = 0;
			int count = 1;
			String docName ="";

			rtd=rtd.getListRegTreBillDto().get(0);
			//DoctorModel objDoctorModel = new DoctorModel();
			//String patID = rtd.getPatientIdd();
			String patID = rtd.getCenterPatientId();
					
			
			/* String docid=rtd.getDoctorId();
			if(docid.equalsIgnoreCase("")){
				docid="0";
			}
					
			docName = objDoctorModel.GetDocName( Integer.parseInt(docid),rtd.getTreatmentId());
			if(docName == null){
				docName="-";
			} */
			//TreatmentModel objTreatmentModel = new TreatmentModel();
			//Treatment objTreatment = new Treatment();
/* 			Patient objPatient = objTreatmentModel.FetchPatientDetailsForPrintSticker(patientID); */	
            String pname = rtd.getPatientName();
            //System.out.println("pname"+pname);
            String pname1[]=pname.split(" ");
            //System.out.println("pnammmmmmmmmmmmmmmmmmm"+Arrays.toString(pname1));
            String nepname=pname1[0]+" "+pname1[1]+" "+pname1[3];
          //  System.out.println("nepname"+nepname);

			String type = request.getParameter("Type");
			String printType1 = request.getParameter("printType1");

			
       	  PdfPTable HeaderTable1 = new PdfPTable(3);
          int[] headerwidth1 = { 34,35,30 };
          HeaderTable1.setWidths(headerwidth1);
          HeaderTable1.setWidthPercentage(99f);
          HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
          

       	  PdfPTable HeaderTable2 = new PdfPTable(1);
          int[] headerwidth3 = { 60};
          HeaderTable2.setWidths(headerwidth3);
          HeaderTable2.setWidthPercentage(95f);
          HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
          PdfPTable table = new PdfPTable(4);
			int[] headerwidth2 = { 30, 30, 29,20};
			table.setWidths(headerwidth2);
			table.setWidthPercentage(95f);
			//table.getDefaultCell().setFixedHeight(102);
			table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
			table.getDefaultCell().setBorderWidth(0f);
			table.getDefaultCell().setBorder(Rectangle.BOX);
			
			  PdfPTable table1 = new PdfPTable(3);
				int[] headerwidth24 = { 20, 20, 15};
				table1.setWidths(headerwidth24);
				table1.setWidthPercentage(103f);
				table1.getDefaultCell().setFixedHeight(102);
				table1.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
				table1.getDefaultCell().setBorderWidth(0f);
				table1.getDefaultCell().setBorder(Rectangle.BOX);
				
		Date df =rtd.getCreatedDateTime();
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
		String strDate = dateFormat.format(df);
			if(type.equalsIgnoreCase("idPrintSticker")){
				//System.err.print("rtd.getPatientIdd()===="+rtd.getPatientId());
				
				HeaderTable2.addCell(new Phrase(""+rtd.getPatientName(), header));
				HeaderTable2.addCell(new Phrase(""+strDate, header));
				
				//HeaderTable1.addCell(new Phrase(objPatient.getRegDate()+" "+objPatient.gettStartTime(), header));
				
				//HeaderTable1.addCell(new Phrase("", header));
				//HeaderTable1.addCell(new Phrase("", header));
				//BarCode --26 April 2017
		 PdfContentByte cb = writer.getDirectContent();	
         Barcode128 barcode39 = new Barcode128();
         barcode39.setCode(patID);
         Image  code39Image = barcode39.createImageWithBarcode(cb, null, null);
	         code39Image.setAbsolutePosition(15,770);
	         code39Image.scalePercent(100);
		 document.add(code39Image);
		 
			document.add(HeaderTable2);
			table.addCell(HeaderTable2);
			HeaderTable2.flushContent();
			}else{
			
				for(int i=0 ; i<=48; i++)
				{
					 Paragraph paragraph1 = new Paragraph();
					 paragraph1.add(Chunk.NEWLINE);
					 paragraph1.add(Chunk.NEWLINE);
					 
					 
					paragraph1.add(new Paragraph("Name :"+nepname,   new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
					paragraph1.add(Chunk.NEWLINE);
					//paragraph1.add(new Paragraph("Patient Id - "+rtd.getPatientIdd(), new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
					paragraph1.add(new Paragraph("UHID :"+rtd.getPatientId(), new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
					paragraph1.add(Chunk.NEWLINE);
					paragraph1.add(new Paragraph("Consultant Doctor :"+rtd.getDoctorName(), new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
					paragraph1.add(Chunk.NEWLINE);
					paragraph1.add(new Paragraph("IPD/OPD No :"+rtd.getTrcount(),  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
					paragraph1.add(Chunk.NEWLINE);
					paragraph1.add(new Paragraph("Age :"+ rtd.getAge()+" ( "+rtd.getGender()+" )",  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
					paragraph1.add(Chunk.NEWLINE);
				//	paragraph1.add(new Paragraph(""+docName,  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
					
					paragraph1.add(new Paragraph("Adm Date :"+strDate,  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
					
				 if(i == 20 || i == 28 || i == 32 ){
						 
						/*  for(  ;i<=28;i++ )
						 
						 { */
						 paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.BOLD)));

						/* paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.BOLD)));
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.BOLD)));
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.BOLD)));
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD))); */
					 	/* paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD))); 
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD))); */
						
						 //}
					} 
					table.addCell(paragraph1);
				}	
		
			}
		
			document.add(table);
			document.close();
			outStream.close();
			outStream.flush();

		} catch (Exception e) {
			System.err.println(e.getMessage());
			e.printStackTrace();
		}
	%>
</body>
</html>
