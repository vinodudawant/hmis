<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.canteen.service.CanteenService"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.canteen.dto.CanteenDietView"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.sun.org.apache.xpath.internal.operations.Mod"%>
<%@ page import = "java.util.ResourceBundle" %>
<%-- <%@page import="com.hms.model.BillModel"%> --%>
<%@page import="com.hms.dto.MLCDetail"%>
<%@ page import="com.hms.dto.Doctor"%>
<%@ page import="com.hms.model.ChannelingModel"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.util.List"%>
<%@ page import="com.hms.dto.MLCDetail" %>
<%@ page import="com.hms.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"
	import="com.itextpdf.text.*, java.io.*, javax.imageio.ImageIO, java.awt.image.BufferedImage, javax.swing.ImageIcon, com.itextpdf.text.pdf.*, java.util.Map,
    java.sql.*, java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition,com.hms.pharmacy.upload.FilePath"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Patient wise Diet List</title>
</head>
<body>
	<%
		try {
			response.setContentType("application/pdf");

			/* List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails
					.getHospDetails("0");
			HospitalDetails hospObj = arrHospitalDetails.get(0); */
			
			ServletOutputStream outStream = response.getOutputStream();
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			document.setMargins(20, 20, 20, 0);

			PdfWriter.getInstance(document, outStream);
			document.open();
			//font
			session = request.getSession();
			String user_name = (String) session.getAttribute("userName");
			
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

			String fromDate = request.getParameter("fromDate");
			String toDate = request.getParameter("toDate");
			String templateId = request.getParameter("templateId");
			java.util.Calendar currentDate = Calendar.getInstance();
			SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy HH:mm a");
			String curr_date = dateformatter.format(currentDate.getTime());

			/* String path = hospObj.getFilePath();
			String hospitalName = hospObj.getHospitalName();
			hospitalName = hospitalName.toUpperCase();
			String address = hospObj.getHospitalAddress();
			String city = hospObj.getHospitalCity();
			String contact = hospObj.getHospitalContact();
			String path1 = application.getRealPath(path);
			String hospitalZip = hospObj.getHospitalZip(); 
			
			String PhoneNo   =  hospObj.getHospitalContact();
			String secPhoneNo   =  hospObj.getSecPNo();
			String webste     =   hospObj.getWebsite();
			String email      =   hospObj.getHospitalEmail();
			String cinNo	  =   hospObj.getTxtCinNo();
			String serviceTaxNo	  =   hospObj.getTxtSerTaxNo();
			String panNo	  =   hospObj.getPanNo();
			String hPhoneNo   = PhoneNo+"/"+secPhoneNo;
			String nabh = hospObj.getNabhImagePath(); 
			String nabhLogo = application.getRealPath(nabh); */
			
			Image img = null;
			PdfPCell cell = null;
			try {
				//img = Image.getInstance(path1);
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
				//imgNabh = Image.getInstance(nabhLogo);
				imgNabh.scaleAbsolute(80, 60);
				cellNabh = new PdfPCell();
				cellNabh.addElement(new Chunk(imgNabh, 5, -5));
				cellNabh.setBorder(Rectangle.NO_BORDER);
			} catch (Exception e) {
				e.printStackTrace();
			} 
			
			
			document.newPage();
			
			
			java.util.Calendar currentDate1 = java.util.Calendar
					.getInstance();
			SimpleDateFormat formatter = new SimpleDateFormat(
					"yyyy-MM-dd hh:mm:ss a");
			String todays_date = formatter.format(currentDate1.getTime());
			// Table 1 : For hospital adress details start
			
			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 30, 80, 30 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			if (img == null) {
					
					HeaderTable1.addCell(new Phrase("", header));
				} else {
					
					HeaderTable1.addCell(cell);
				}		 
				
				Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
				Font bold = new Font(FontFamily.TIMES_ROMAN, 12, Font.BOLD);
				Phrase p = new Phrase();
				/* p.add(new Chunk(" "+hospitalName, bold));			
				p.add(new Chunk(" \n\n"+address, tabletext));			
				p.add(new Chunk(" "+city+" Pin- "+hospitalZip+"\n", tabletext));
				p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));
				if(!webste.equalsIgnoreCase("")){
				p.add(new Chunk(" \n "+webste, tabletext));
				}
				p.add(new Chunk(" \n "+"email: "+email, tabletext));	
				if (cinNo.equalsIgnoreCase("-")) {
					
				}else{
					p.add(new Chunk(" \nCIN: " + cinNo, tabletext));
				}
				if (serviceTaxNo.equalsIgnoreCase("-")) {
					
				}else{
					p.add(new Chunk(" \nService Tax: " + serviceTaxNo, tabletext));
				}
				if (panNo.equalsIgnoreCase("-")) {
					
				}else{
					p.add(new Chunk( ", PAN No: " + panNo, tabletext));
				} */
				
				PdfPCell hospitalNameCell = new PdfPCell(p);				
				hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
				HeaderTable1.addCell(hospitalNameCell);
				
					if (img == null) {
						
						HeaderTable1.addCell(new Phrase("", header));
					} else {
						
					//	HeaderTable1.addCell(cellNabh);
					}
			
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();

			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			PdfPTable HeaderTable8 = new PdfPTable(3);
			int[] headerwidth8 = { 30, 60 ,30};
			HeaderTable8.setWidths(headerwidth8);
			HeaderTable8.setWidthPercentage(95f);
			HeaderTable8.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable8.addCell(new Phrase("  ", header));
			HeaderTable8.addCell(new Phrase("  Patient Wise Diet List", header));
			HeaderTable8.addCell(new Phrase("Date: " +todays_date,subheader));
			
				
			document.add(HeaderTable8);
			HeaderTable8.flushContent();		
			

			Integer templateId1 = Integer.parseInt(templateId);
			//calling patient wise diet list method to get patient records
			CanteenService us=(ApplicationContextUtils.getApplicationContext()).getBean(CanteenService.class);
			List<CanteenDietView> ltDietListDto = new ArrayList<CanteenDietView>();
			ltDietListDto =us.searchByDateWiseDietList(fromDate,toDate,templateId1);
			

				PdfPTable HeaderTable3 = new PdfPTable(5);
				int[] headerwidth3 = { 20, 30, 20, 30, 20 };
				HeaderTable3.setWidths(headerwidth3);
				HeaderTable3.setWidthPercentage(95f);
				HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				HeaderTable3.addCell(new Phrase("", header));
				HeaderTable3.addCell(new Phrase("", header));
				HeaderTable3.addCell(new Phrase("", header));
				HeaderTable3.addCell(new Phrase("", header));
				HeaderTable3.addCell(new Phrase("", header));
				HeaderTable3.addCell(new Phrase("", header));

				document.add(HeaderTable3);
				HeaderTable3.flushContent();
				
				PdfPTable twoPT2 = new PdfPTable(2);
				int[] widthInst2 = { 25, 75 };
				twoPT2.setWidths(widthInst2);
				twoPT2.setWidthPercentage(95f);
				twoPT2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				PdfPTable HeaderTable6 = new PdfPTable(8);
			    int[] headerwidth77={40,75,45,30,35,60,30,30};
			    HeaderTable6.setWidths(headerwidth77);
			    HeaderTable6.setWidthPercentage(95f);
			    HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			    
			    
			    HeaderTable6.addCell(new Phrase("#", subheader));
			    HeaderTable6.addCell(new Phrase("Patient Name", subheader));
			    HeaderTable6.addCell(new Phrase("Patient Id", subheader));
			    HeaderTable6.addCell(new Phrase("Bed No", subheader));
			    HeaderTable6.addCell(new Phrase("Ward Name", subheader));
			    HeaderTable6.addCell(new Phrase("Temp Name", subheader));
			    HeaderTable6.addCell(new Phrase("FromDate", subheader));
			    HeaderTable6.addCell(new Phrase("ToDate.", subheader));

				document.add(HeaderTable6);
				HeaderTable6.flushContent();
				
				twoPT2.getDefaultCell().setBorder(Rectangle.BOTTOM);
				twoPT2.addCell(new Phrase("", tableheader));
				twoPT2.addCell(new Phrase("", subheader));
				document.add(twoPT2);
				twoPT2.flushContent();
				
				HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				HeaderTable6.addCell(new Phrase("", header));
				HeaderTable6.addCell(new Phrase("", header));
				HeaderTable6.addCell(new Phrase("", header));
				HeaderTable6.addCell(new Phrase("", header));
				HeaderTable6.addCell(new Phrase("", header));
				HeaderTable6.addCell(new Phrase("", header));
				HeaderTable6.addCell(new Phrase("", header));
				HeaderTable6.addCell(new Phrase("", header));
				
				document.add(HeaderTable6);
				HeaderTable6.flushContent();
				
				 System.out.println(ltDietListDto.size()+"--------------DDDDDDDDDDDDDDD");
				
				for(int i=0;i<ltDietListDto.size();i++){
       HeaderTable6.addCell(new Phrase(""+(i+1), tabletext));
		HeaderTable6.addCell(new Phrase(""+ltDietListDto.get(i).getPatientName(), tabletext));
		HeaderTable6.addCell(new Phrase(""+ltDietListDto.get(i).getPatientId(), tabletext));
		HeaderTable6.addCell(new Phrase(""+ltDietListDto.get(i).getBedName(), tabletext));
		HeaderTable6.addCell(new Phrase(""+ltDietListDto.get(i).getHName(), tabletext));
		HeaderTable6.addCell(new Phrase(""+ltDietListDto.get(i).getTempName(), tabletext));
		HeaderTable6.addCell(new Phrase(""+ltDietListDto.get(i).getFrom_date(), tabletext));
		HeaderTable6.addCell(new Phrase(""+ltDietListDto.get(i).getTo_date(), tabletext));

	HeaderTable6.getDefaultCell()
			.setBorder(Rectangle.NO_BORDER);

	HeaderTable6.addCell(new Phrase("", header));
	HeaderTable6.addCell(new Phrase("", header));
	HeaderTable6.addCell(new Phrase("", header));
	HeaderTable6.addCell(new Phrase("", header));
	HeaderTable6.addCell(new Phrase("", header));
	HeaderTable6.addCell(new Phrase("", header));
	HeaderTable6.addCell(new Phrase("", header));
	HeaderTable6.addCell(new Phrase("", header));

	HeaderTable6.addCell(new Phrase("", header));
	HeaderTable6.addCell(new Phrase("", header));
	HeaderTable6.addCell(new Phrase("", header));
	HeaderTable6.addCell(new Phrase("", header));
	HeaderTable6.addCell(new Phrase("", header));
	HeaderTable6.addCell(new Phrase("", header));
	HeaderTable6.addCell(new Phrase("", header));
	HeaderTable6.addCell(new Phrase("", header));
	
	document.add(HeaderTable6);
	HeaderTable6.flushContent();

	}	
				twoPT2.getDefaultCell().setBorder(Rectangle.BOTTOM);
				twoPT2.addCell(new Phrase("", tableheader));
				twoPT2.addCell(new Phrase("", subheader));
				document.add(twoPT2);
				twoPT2.flushContent();
				
				
				
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