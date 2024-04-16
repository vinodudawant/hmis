<%@page import="com.itextpdf.text.pdf.draw.VerticalPositionMark"%>
<%-- <%@page import="org.apache.jasper.tagplugins.jstl.core.ForEach"%> --%>
<%@page import="com.hms.dao.AdminDAO"%>
<%@page import="com.hms.dto.MLCDetail"%>
<%@page import="com.hms.dto.Treatment"%>
<%@page import="com.hms.dto.Patient"%>
<%@page import="com.hms.dto.Appointment"%>
<%@page import="com.hms.dto.TreatmentNurses"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.util.List"%>
<%@ page import="com.hms.model.TreatmentModel"%>
<%@ page import="com.hms.model.IPDTreatmentModel"%>
<%-- <%@ page import="com.hms.model.DoctorModel"%>
<%@ page import="com.hms.dao.DoctorDAO"%> --%>
<%@page import="java.util.ResourceBundle"%>

<%@page import="com.hms.utility.ApplicationContextUtils"%>

<%@ page import="com.hms.model.PatientModel"%>
<%@ page import="com.hms.dto.HospitalDetails"%>
<%-- <%@ page import="com.hms.admin.util.FetchHospitalDetails"%> --%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.dto.Chart"%>
<%@ page import="com.hms.model.AdminModel"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="com.hms.dto.ChartInfoDto"%>
<%@ page import="com.hms.dto.TreatmentNurses"%>
<%@ page import="com.hms.model.IPDTreatmentModel"%>
<%@ page import="com.hms.dto.ChartReport"%>
<%@ page import="com.hms.dto.NursingChart"%>
<%@page import="com.hms.canteen.dto.CanteenDietView"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.canteen.controller.CanteenController"%>
<%@page import="com.hms.canteen.service.CanteenService"%>
<%@page import="com.itextpdf.text.pdf.BaseFont"%>
<%@page import="com.itextpdf.text.Element"%>
<%@page import="com.itextpdf.text.pdf.Barcode128"%>
<%@page import="com.itextpdf.text.pdf.PdfContentByte"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@page import="org.krysalis.barcode4j.BarcodeUtil"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
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
			// Connection connection = null;
			 /*CallableStatement cs = null;
			ResultSet rs = null; */

			// Create Connection
			//Class.forName(HMSConstants.DRIVERNAME).newInstance();
			/* connection = DriverManager.getConnection(HMSConstants.URL,
					HMSConstants.DATABASEUSER,
					HMSConstants.DATABASEPASSWORD); */
			// End Creation of Connectionn
			response.setContentType("application/pdf");
			ServletOutputStream outStream = response.getOutputStream();
			response.reset();

			Rectangle two = new Rectangle(700, 400);
			Document document = new Document(PageSize.A4);
			document.setMargins(48,40,20,-10);
			//document.setMargins(40,40,40,-10);
			PdfWriter writer =PdfWriter.getInstance(document, outStream);
			document.open();
			PdfContentByte contentByte;
			contentByte = writer.getDirectContent();
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

			//Statement stmt = connection.createStatement();
			String query = null;

			java.util.Calendar currentDate = Calendar.getInstance();
			SimpleDateFormat dateformatter = new SimpleDateFormat(
					"dd/MM/yyyy");
			
		    String fromDate = request.getParameter("fromDate");
			String toDate = request.getParameter("toDate");
			String templateId = request.getParameter("templateId");
			
			Integer templateId1 = Integer.parseInt(templateId);
					
			/* String sql5 = "select * from hospital limit 1";
			ResultSet rs5 = stmt.executeQuery(sql5);
			rs5.next(); */

			//String path = rs5.getString("logoPath");
			//String hospitalName = rs5.getString("hospitalName");
			//String treatId = request.getParameter("treatId"); 
			SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
			String todays_date = formatter.format(currentDate.getTime());
			 /* CanteenController uss=(ApplicationContextUtils.getApplicationContext()).getBean(CanteenController.class);
			 CanteenDietView ltDietListDto = new CanteenDietView();
			 ltDietListDto=uss.searchByDateWiseDietList(fromDate,toDate,templateId1); */
				
				//System.err.println("-----11----------"+ltDietListDto);
				
				
				CanteenService us=(ApplicationContextUtils.getApplicationContext()).getBean(CanteenService.class);
				List<CanteenDietView> ltDietListDto = new ArrayList<CanteenDietView>();
				ltDietListDto =us.searchByDateWiseDietList(fromDate,toDate,templateId1); 
				
       	  PdfPTable HeaderTable1 = new PdfPTable(3);
          int[] headerwidth1 = { 34,35,30 };
          HeaderTable1.setWidths(headerwidth1);
          HeaderTable1.setWidthPercentage(99f);
          HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
          
          Barcode128 code128 = new Barcode128();
          
          code128.setSize(15f);
	  		code128.setBarHeight(10);
	   		//Jitendra 15 March 2019
			code128.setBaseline(-1);
			code128.setGenerateChecksum(true);
			code128.setCodeType(Barcode128.CODE128);
			System.out.println("Barcode128.CODE128 "+Barcode128.CODE128);
     		
     		
  		

       	  PdfPTable HeaderTable2 = new PdfPTable(1);
          int[] headerwidth3 = { 60};
          HeaderTable2.setWidths(headerwidth3);
          HeaderTable2.setWidthPercentage(95f);
          HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
          PdfPTable table = new PdfPTable(2);
			int[] headerwidth2 = { 20, 20};
			table.setWidths(headerwidth2);
			table.setWidthPercentage(103f);
			table.getDefaultCell().setFixedHeight(102);
			table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
			table.getDefaultCell().setBorderWidth(0f);
			table.getDefaultCell().setBorder(Rectangle.BOX);
			
			int DietList = 0;
			
			if ( ltDietListDto.size() % 2 == 0 ){
		        System.out.println("Entered number is even");
		        DietList = ltDietListDto.size();
			}else{
		        System.out.println("Entered number is odd");
		        DietList = (ltDietListDto.size()) + 1;
		  }
			
				 for(int j=0;j<DietList;j++)
				{ 
					 Paragraph paragraph1 = new Paragraph();
					 paragraph1.add(Chunk.NEWLINE);
					 paragraph1.add(Chunk.NEWLINE);
					
			 if ( ltDietListDto.size() % 2 == 0 ){		 
				 
				    paragraph1.add(new Paragraph("       UHID :"+ltDietListDto.get(j).getPatientId(),   new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD)));
					
				    paragraph1.add(Chunk.NEWLINE);
				    
					paragraph1.add(new Paragraph("       Name :"+ltDietListDto.get(j).getPatientName(),   new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD)));
					
					paragraph1.add(Chunk.NEWLINE);
					
					paragraph1.add(new Paragraph("       Bed No :"+ltDietListDto.get(j).getBedName(),   new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD)));
					
					paragraph1.add(Chunk.NEWLINE);
					
					paragraph1.add(new Paragraph("       Ward Name :"+ltDietListDto.get(j).getHName(),   new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD)));
					
					paragraph1.add(Chunk.NEWLINE);
					
					paragraph1.add(new Paragraph("       Template :"+ltDietListDto.get(j).getTempName(),  new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD)));
			
					paragraph1.add(Chunk.NEWLINE);
					
					paragraph1.add(new Chunk(code128.createImageWithBarcode(contentByte, null, null), 0, 0, true));
					
					//HeaderTable2.addCell(code128.createImageWithBarcode(contentByte, null, null));
				
				//	Font f=new Font(Font.FontFamily.TIMES_ROMAN, 50.0f,Font.UNDERLINE, BaseColor.RED);
				//	paragraph1.add(new Paragraph(code128.createImageWithBarcode(contentByte, null, null), new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD)));
			 }else{
				 
				 if(j == ltDietListDto.size()){
					 
					    paragraph1.add(new Paragraph("",   new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
						
					    paragraph1.add(Chunk.NEWLINE);
						
					    paragraph1.add(new Paragraph("",   new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
						
					    paragraph1.add(Chunk.NEWLINE);
					    
						paragraph1.add(new Paragraph("",   new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
						
						paragraph1.add(Chunk.NEWLINE);
						
						paragraph1.add(new Paragraph("",   new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
						
						paragraph1.add(Chunk.NEWLINE);
						
						paragraph1.add(new Paragraph("",  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
						
						paragraph1.add(Chunk.NEWLINE);
						
						
						
						//HeaderTable2.addCell(code128.createImageWithBarcode(contentByte, null, null));
						
						
						
				 }else{
					 
					paragraph1.add(new Paragraph("       UHID :"+ltDietListDto.get(j).getPatientId(),   new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD)));

					paragraph1.add(Chunk.NEWLINE);
					paragraph1.add(new Paragraph("       Name :"+ltDietListDto.get(j).getPatientName(),   new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD)));

					paragraph1.add(Chunk.NEWLINE);
					paragraph1.add(new Paragraph("       Bed No :"+ltDietListDto.get(j).getBedName(),   new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD)));

					paragraph1.add(Chunk.NEWLINE);
					paragraph1.add(new Paragraph("       Ward Name :"+ltDietListDto.get(j).getHName(),   new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD)));

					paragraph1.add(Chunk.NEWLINE);
					paragraph1.add(new Paragraph("       Template :"+ltDietListDto.get(j).getTempName(),  new Font(Font.FontFamily.TIMES_ROMAN, 9, Font.BOLD)));
				
					paragraph1.add(Chunk.NEWLINE);
					paragraph1.add(new Chunk(code128.createImageWithBarcode(contentByte, null, null), 0, 0, true));
					
				 }
			 }
			    
			/*  if ( ltDietListDto.size() % 2 != 0 ){	
				 
				 
				 
				 System.out.println("Entered number is 22222---------"+DietList);
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.BOLD)));
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.BOLD)));
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.BOLD)));
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 10, Font.BOLD)));
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
						paragraph1.add(new Paragraph(" ",  new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD)));
						
					}  */
					table.addCell(paragraph1);
				
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