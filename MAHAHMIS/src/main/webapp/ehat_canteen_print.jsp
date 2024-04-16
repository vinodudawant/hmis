<%@page import="com.hms.canteen.dto.CanteenMaster"%>
<%@page import="com.hms.canteen.service.CanteenService"%>

<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.ehat.dto.EhatBillPrefix"%>


<%@page import="com.hms.utility.ApplicationContextUtils"%>

<%@page import="java.util.ArrayList"%>


<%@ page import="java.util.Date"%>
<%-- <%@ page import="com.hms.dto.BillComponentSample"%>
<%@ page import="com.hms.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%> --%>

<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%-- <%@ page import="com.hms.dto.RadiationMaster"%>
<%@ page import="com.hms.model.AdminModel"%> --%>

<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, 
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<!DOCTYPE html>
<html>
<head>
<meta  http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Opd Receipt PDf</title>
</head>
<body>
	<%
	
		try {

			response.setContentType("application/pdf");
			/* List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails.getHospDetails("0");
			HospitalDetails hospObj = arrHospitalDetails.get(0); */

			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			
			Document document = new Document(PageSize.POSTCARD);//SMALL_PAPERBACK//POSTCARD//PENGUIN_SMALL_PAPERBACK
			document.setMargins(20, 20, 20, 0);

			PdfWriter.getInstance(document, outStream);
			document.open();
		
			/* -------------------- Define Fonts ---------------------------  */			
			Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font subheader = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
			Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
			header.setColor(10, 4, 2);

			Font tableheader = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font tabletext = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
			Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
			/* -------------------- Define Fonts ---------------------------  */
			
			session = request.getSession();
			String user_name = (String) session.getAttribute("userName");
			
			/* String path = hospObj.getFilePath();
			String hospitalName = hospObj.getHospitalName();
			//hospitalName = hospitalName.toUpperCase();			
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
			//	img = Image.getInstance(path1);
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
			//	imgNabh = Image.getInstance(nabhLogo);
				imgNabh.scaleAbsolute(80, 60);
				cellNabh = new PdfPCell();
				cellNabh.addElement(new Chunk(imgNabh, 5, -5));
				cellNabh.setBorder(Rectangle.NO_BORDER);
			} catch (Exception e) {
				e.printStackTrace();
			} 
						
			//getting cateen data by id 
			int canteenId=Integer.parseInt(request.getParameter("canteenId"));
			CanteenService canteenService=(ApplicationContextUtils.getApplicationContext()).getBean(CanteenService.class);
			List<CanteenMaster> ltcanteen = new ArrayList<CanteenMaster>();
			ltcanteen=canteenService.getlistbyId(canteenId);
			
			
			
			
			
			
			
		  	document.newPage();			
			
			//AdminModel adminModel = new AdminModel();
			int printId = 2;
		//	int numOfPrint = adminModel.generalAccessNumOfPrint(printId);// to get number of prints
	
			// Table 1 : For hospital adress details start
			
			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 15, 70, 15 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			HeaderTable1.addCell(new Phrase("", header));
			
		
			Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
			Font bold = new Font(FontFamily.TIMES_ROMAN, 12, Font.BOLD);
			Phrase p = new Phrase();
			/* p.add(new Chunk(" "+hospitalName, bold));			
			p.add(new Chunk(" \n\n"+address, tabletext));			
			p.add(new Chunk(" \n"+city+" Pin- "+hospitalZip, tabletext));
			p.add(new Chunk(" \nPhone No. "+hPhoneNo, tabletext));	 */
			
			
			PdfPCell hospitalNameCell = new PdfPCell(p);				
			hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
			HeaderTable1.addCell(hospitalNameCell);
			HeaderTable1.addCell(new Phrase("", header));
			
			
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
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			// Table 1 : For hospital adress details end
			
			// Table 2 : For receipt head start
			
			PdfPTable HeaderTable2 = new PdfPTable(5);
			int[] headerwidth2 = { 15, 24, 40, 9, 20 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(new Phrase("", subheader));
			PdfPCell subcell = new PdfPCell(new Phrase("",subheader));
			subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
			subcell.setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(subcell);
			HeaderTable2.addCell(new Phrase("                   CANTEEN PRINT ", header));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			document.add(HeaderTable2);
			HeaderTable2.flushContent();
			
			// Table 2 : For receipt head end
			
			
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
            SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm a");
           	Date now = new Date(new java.util.Date().getTime());
           	String strDate = sdf.format(now);
			String rtime   = sdf2.format(now);
			
			
            // Table3 : For patient header info start
           
            PdfPTable HeaderTable3 = new PdfPTable(4);
			int[] headerwidth3 = { 30, 50, 30, 50 };
			HeaderTable3.setWidths(headerwidth3);
			HeaderTable3.setWidthPercentage(95f);
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
            
			
				int billNo =ltcanteen.get(0).getCount();
				int canteenNo=ltcanteen.get(0).getCanteenId();
				String customerName =ltcanteen.get(0).getPatientName();
				int tokenNo =ltcanteen.get(0).getTokenNo();		
				if(customerName == null || customerName == ""){
					customerName ="";
				}
				HeaderTable3.addCell(new Phrase("Bill No ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+billNo,tabletext));
				
				HeaderTable3.addCell(new Phrase("Dine In ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+canteenNo,tabletext));
	            
				HeaderTable3.addCell(new Phrase("Customer Name ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+customerName,tabletext));

				HeaderTable3.addCell(new Phrase(" Date ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+strDate  , tabletext));
				
				HeaderTable3.addCell(new Phrase("Token No ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+tokenNo,	tabletext));
			
				HeaderTable3.addCell(new Phrase(" Time ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+rtime  , tabletext));
				
				HeaderTable3.addCell(new Phrase("",subheader));
				HeaderTable3.addCell(new Phrase(" "  , tabletext));

				HeaderTable3.addCell(new Phrase("",	subheader));		
				HeaderTable3.addCell(new Phrase("", tabletext));
				
				
			document.add(HeaderTable3);
			HeaderTable3.flushContent();
			
			
			 
			PdfPTable HeaderTable5 = new PdfPTable(6);
			int[] headerwidth5 = { 10, 40, 35, 20, 5, 30 };
			HeaderTable5.setWidths(headerwidth5);
			HeaderTable5.setWidthPercentage(95f);
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
			 
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));	
			
			
				
				HeaderTable5.addCell(new Phrase("#", subheader));
				HeaderTable5.addCell(new Phrase("Item Name", subheader));
				HeaderTable5.addCell(new Phrase("Price", subheader));
				HeaderTable5.addCell(new Phrase("Qty", subheader));
				
				HeaderTable5.addCell(new Phrase("", subheader));		
				
				HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
				HeaderTable5.addCell(new Phrase("Amount",subheader));
			

			document.add(HeaderTable5);
			HeaderTable5.flushContent();

			HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));		
			
				
				for (int i = 0; i < ltcanteen.get(0).getLtCanteenSlave().size(); i++) {

					
									
					double rate=ltcanteen.get(0).getLtCanteenSlave().get(i).getRate();
					String SubName=ltcanteen.get(0).getLtCanteenSlave().get(i).getSubserviceName();
					int qty=ltcanteen.get(0).getLtCanteenSlave().get(i).getQuantity();
					double amtountslave=ltcanteen.get(0).getLtCanteenSlave().get(i).getAmountslave();
					
					HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
					HeaderTable5.addCell(new Phrase(""+(i+1), tabletext));
					HeaderTable5.addCell(new Phrase(""+ SubName,tabletext));				
					HeaderTable5.addCell(new Phrase(""+rate,tabletext));
					HeaderTable5.addCell(new Phrase(""+qty,tabletext));
					
					
					
								
					PdfPCell cell2 = new PdfPCell(new Phrase("",tabletext));
					cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
					cell2.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(cell2);

					
					
					PdfPCell cell5 = new PdfPCell(new Phrase(""+amtountslave, tabletext));
					cell5.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cell5.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(cell5);
				}
				
					
				Double finalam = (Double) ltcanteen.get(0).getTotalAMountgst();
				long finalams = (long) ltcanteen.get(0).getTotalAMountgst();
				Double totalAmt = (Double) ltcanteen.get(0).getTotalAMount();
				Double gstAmt = (Double) ltcanteen.get(0).getGstAmt();
				int gstper = (Integer) ltcanteen.get(0).getGstper();
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
			
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
			
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			
			
			HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));	
			
			
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("Sub Total  :", subheader));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			
			
			PdfPCell cell5 = new PdfPCell(new Phrase(""+totalAmt, tabletext));
			cell5.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell5.setBorder(Rectangle.NO_BORDER);			
			HeaderTable5.addCell(cell5);	
			
			
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
			HeaderTable5.addCell(new Phrase("GST %    :", subheader));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			
			
			PdfPCell cell07 = new PdfPCell(new Phrase(""+gstper, tabletext));
			cell07.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell07.setBorder(Rectangle.NO_BORDER);			
			HeaderTable5.addCell(cell07);	
				
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
				HeaderTable5.addCell(new Phrase("GST Amt :", subheader));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				
				
				PdfPCell cell7 = new PdfPCell(new Phrase(""+gstAmt, tabletext));
				cell7.setHorizontalAlignment(Element.ALIGN_RIGHT);
				cell7.setBorder(Rectangle.NO_BORDER);			
				HeaderTable5.addCell(cell7);	
				
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));				
				HeaderTable5.addCell(new Phrase("Grand Total :", subheader));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
					
							
			PdfPCell cell6 = new PdfPCell(new Phrase(""+finalam, tabletext));
			cell6.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell6.setBorder(Rectangle.NO_BORDER);			
			HeaderTable5.addCell(cell6);
					
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));	
			
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
			
			
			PdfPTable HeaderTable6 = new PdfPTable(2);
			int[] headerwidth6 = {30,70};
			HeaderTable6.setWidths(headerwidth6);
			HeaderTable6.setWidthPercentage(95f);			
			HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", tabletext));
			
			
			HeaderTable6.addCell(new Phrase("Amount In Words:", subheader));
			
			HeaderTable6.addCell(new Phrase(""	+ (EnglishNumberToWords.convert(finalams)), tabletext));
			
			
			document.add(HeaderTable6);
			HeaderTable6.flushContent();
			
			
						
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
									
			document.close();

			outStream.flush();
			outStream.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	%>
	
</body>
</html>