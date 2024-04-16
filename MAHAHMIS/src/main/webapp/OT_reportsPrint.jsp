<%@page import="javax.swing.border.Border"%>
<%@page import="jxl.format.Alignment"%>

<%@page import="java.util.HashMap"%>
<%@page import="java.util.ArrayList"%>
<%@ page import="com.hms.utility.ApplicationContextUtils"%>

<%@page import="com.lowagie.text.pdf.PdfCell"%>
<%@page import="com.itextpdf.text.html.WebColors"%>

<%@ page import="java.util.Date"%>
<%@ page import="java.awt.Color"%>
<%@ page import="com.hms.ehat.service.impl.InventoryServiceImpl"%>
<%@ page import="com.hms.ehat.service.impl.OtSerivceImpl"%>
<%@page import="com.itextpdf.text.pdf.draw.DottedLineSeparator"%>
<%@ page import="com.hms.ehat.service.InventoryService"%>
<%@ page import="com.hms.ehat.service.OtService"%>
<%@ page import="com.hms.dto.Inv_expensebiillDTO"%>
<%@ page import="com.hms.ehat.dto.OTReportDto"%>
<%@ page import="com.hms.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>

<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Counter Bill</title>
</head>
<body>
	<%
		try {
			response.setContentType("application/pdf");

			List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails
					.getHospDetails("0");
			HospitalDetails hospObj = arrHospitalDetails.get(0);
			
			String hospitalName = hospObj.getHospitalName();
			hospitalName = hospitalName.toUpperCase();
			String address = hospObj.getHospitalAddress();
			String city = hospObj.getHospitalCity();
			String contact = hospObj.getHospitalContact();

			ServletOutputStream outStream = response.getOutputStream();
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			document.setMargins(20, 20, 20, 0);

			PdfWriter.getInstance(document, outStream);
			document.open();
			//font

			Font header = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL);
			Font subheader = new Font(Font.FontFamily.HELVETICA, 8,
					Font.BOLD);
			Font subheader1 = new Font(Font.FontFamily.HELVETICA, 10,
					Font.BOLD);
			Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
			header.setColor(10, 4, 2);

			Font tableheader = new Font(Font.FontFamily.HELVETICA, 10,
					Font.BOLD);
			Font tabletext = new Font(Font.FontFamily.HELVETICA, 9,
					Font.NORMAL);
			Font tabletext1 = new Font(Font.FontFamily.HELVETICA, 4,
					Font.NORMAL);
			Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
			
			
			
			String name= request.getParameter("name");
			
			String piId = request.getParameter("pid");
			String fdate =request.getParameter("fdate");
			String tdate = request.getParameter("tdate");
			String callform = request.getParameter("callform");
			 

/* ***************************************************geting Image form database ******************************************/

			String path = hospObj.getFilePath();
			String path1 = application.getRealPath(path);
			
			
			Image img = null;
			PdfPCell cell = null;
			try {

				img = Image.getInstance(path1);
				img.scaleAbsolute(80, 60);
				cell = new PdfPCell();
				cell.addElement(new Chunk(img, 5, -5));
				cell.setBorder(Rectangle.NO_BORDER);
			} catch (Exception e) {
				e.printStackTrace();
			}

			document.add(new Phrase("\n"));
			PdfPTable HeaderTable1 = new PdfPTable(2);
			int[] headerwidth1 = { 20, 90 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			/* HeaderTable1.setSpacingAfter(50f); */
		//	HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			//HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			if (img == null) {
				HeaderTable1.addCell(new Phrase("", header));
			} else {
				HeaderTable1.addCell(cell);
			}

			/* HeaderTable1.addCell(new Phrase("", subheader)); */
			
			 PdfPCell PurchaseQuotation = new PdfPCell(new Phrase( hospitalName + "\n\n"+ address+ "\n" +  city +"   TEL No:-"+contact, subheader1));
				PurchaseQuotation.setHorizontalAlignment(Element.ALIGN_CENTER);
			//	 PurchaseQuotation.setSpaceCharRatio(90f);
			
			
			
			PurchaseQuotation.setBorder(Rectangle.NO_BORDER);
		
			HeaderTable1.addCell(PurchaseQuotation);
			
			

			document.add(HeaderTable1);
			HeaderTable1.flushContent();

			/* ******************************************Date and order no *******************************************************************/

			java.util.Calendar currentDate = java.util.Calendar
					.getInstance();
			SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
			String todays_date = formatter.format(currentDate.getTime());
			
			
											
		/********************************************/
		
		PdfPTable HeaderTable45 = new PdfPTable(3);
			int[] headerwidth45 = {45,30,30};
			HeaderTable45.setWidths(headerwidth45);
			HeaderTable45.setWidthPercentage(95f);
			HeaderTable45.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable45.addCell(new Phrase("  "));
			HeaderTable45.addCell(new Phrase("IPD Sugery Report " ,subheader1));
			HeaderTable45.addCell(new Phrase("", subheader));
			
			document.add(HeaderTable45);
			HeaderTable45.flushContent();
			
			PdfPTable HeaderTable46 = new PdfPTable(1);
			int[] headerwidth46 = { 20};
			HeaderTable46.setWidths(headerwidth46);
			HeaderTable46.setWidthPercentage(95f);
			HeaderTable46.setHorizontalAlignment(Element.ALIGN_CENTER);
			PdfPCell headerRightCell1 = new PdfPCell();
			headerRightCell1.setBorder(Rectangle.TOP);
	 		HeaderTable46.addCell(headerRightCell1);		
			document.add(HeaderTable46);
			HeaderTable46.flushContent();
			
			PdfPTable HeaderTable48 = new PdfPTable(4);
			int[] headerwidth48 = { 10,70,20,20};
			HeaderTable48.setWidths(headerwidth48);
			HeaderTable48.setWidthPercentage(95f);
			HeaderTable48.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable48.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable48.addCell(new Phrase("Sr.NO." ,subheader));
			HeaderTable48.addCell(new Phrase("Head Name" ,subheader));
			PdfPCell cells138 = new PdfPCell(new Phrase("%" , subheader));
			cells138.setHorizontalAlignment(Element.ALIGN_CENTER);
			cells138.setBorder(Rectangle.NO_BORDER);
			HeaderTable48.addCell(cells138);
			
			PdfPCell cells137 = new PdfPCell(new Phrase("Amount" , subheader));
			cells137.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cells137.setBorder(Rectangle.NO_BORDER);
			HeaderTable48.addCell(cells137);
			document.add(HeaderTable48);
			HeaderTable48.flushContent();
			
			
			
			PdfPTable HeaderTable201 = new PdfPTable(1);
			int[] headerwidth311 = { 45};
			HeaderTable201.setWidths(headerwidth311);
			HeaderTable201.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable201.setWidthPercentage(95f);
			HeaderTable201.addCell(new Phrase("", subheader));
			
			document.add(HeaderTable201);
			HeaderTable201.flushContent();
			PdfPTable HeaderTable3 = new PdfPTable(6);
			int[] headerwidth3 = { 18, 30, 20, 20, 20, 20 };
			HeaderTable3.setWidths(headerwidth3);
			HeaderTable3.setWidthPercentage(95f);
			HeaderTable3.getDefaultCell()
					.setBorder(Rectangle.NO_BORDER);
			OtService os = (ApplicationContextUtils.getApplicationContext()).getBean(OtService.class);
			OTReportDto fetchreports = new  OTReportDto();
			Integer id =0;
			if(piId.equals(null) || piId.equals("") ){
				id	= 0;
			}else{
				id	=Integer.parseInt(piId);
			}
			if(fdate==null ||tdate==null  ){
				fdate="";
				tdate="";
			}
			if(callform==null  ){
				callform="onload";
			
			}
			if(name==null  ){
				name="";
			
			}
			fetchreports = os.fetchOTReportdetails(id,name,fdate,tdate,callform);

			String billno="";
			String SupplierName="";
			String challanno="";
			String date= "";
			Double gstamttotal=0.0;
			Double subtotal=0.0;
			Double discount=0.0;
			Double grandtotal=0.0;
			List<Integer> myServiceId = new ArrayList<Integer>();
			int index= 1;
			int j=0;
			int first=0;
			int chk=0;
			int length=fetchreports.getOTRepordetails().size()-1;
			System.err.print("length===" + length);
			Double totalamnt=0.0;
			Double grandtotal1=0.0;
			   DecimalFormat twoDForm = new DecimalFormat("#.##");
			   DecimalFormat myFormatter = new DecimalFormat("#,###");
			for(int i=0;i< fetchreports.getOTRepordetails().size();i++){
				if(!myServiceId.contains(i)){

					i = chk;
					
					if(fetchreports.getOTRepordetails().get(i).getCount_ot() == fetchreports.getOTRepordetails().get(j).getCount_ot()){
						while (fetchreports.getOTRepordetails().get(i).getCount_ot() == fetchreports.getOTRepordetails().get(j).getCount_ot()){
							totalamnt = totalamnt + fetchreports.getOTRepordetails().get(j).getAmount();
							if(first ==0 ){
								PdfPTable HeaderTable6 = new PdfPTable(2);
								int[] headerwidth6 = {8,45};
								HeaderTable6.setWidths(headerwidth6);
								HeaderTable6.setWidthPercentage(95f);
								HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					
							

								HeaderTable6.addCell(new Phrase("Patient Name", subheader));
								HeaderTable6.addCell(new Phrase(""+ fetchreports.getOTRepordetails().get(j).getF_name() +"  "  + fetchreports.getOTRepordetails().get(j).getM_name() + "  " + fetchreports.getOTRepordetails().get(j).getL_name() , subheader));
								
								String Sunstring= fetchreports.getOTRepordetails().get(j).getOpname().substring(1);
								
								document.add(HeaderTable6);
								HeaderTable6.flushContent();
								PdfPTable HeaderTable7 = new PdfPTable(4);
							
								HeaderTable7.setWidths(headerwidth48);
								HeaderTable7.setWidthPercentage(95f);
								HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								HeaderTable7.addCell(new Phrase("" + index, tabletext));
                                HeaderTable7.addCell(new Phrase("" + Sunstring, subheader));
								PdfPCell cells139 = new PdfPCell(new Phrase("" + fetchreports.getOTRepordetails().get(j).getCreated_date_time(), subheader));
								cells139.setHorizontalAlignment(Element.ALIGN_CENTER);
								cells139.setBorder(Rectangle.NO_BORDER);
								HeaderTable7.addCell(cells139);
								
								PdfPCell cells140 = new PdfPCell(new Phrase("-"  , subheader));
								cells140.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells140.setBorder(Rectangle.NO_BORDER);
								HeaderTable7.addCell(cells140);
								
								
								
								document.add(HeaderTable7);
								HeaderTable7.flushContent();
							
								first=1;
							}
							
							PdfPTable HeaderTable8 = new PdfPTable(4);
							
							HeaderTable8.setWidths(headerwidth48);
							HeaderTable8.setWidthPercentage(95f);
							HeaderTable8.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							//(DottedLineSeparator.ALIGN_BASELINE);
							HeaderTable8.addCell(new Phrase("" , tabletext));
							HeaderTable8.addCell(new Phrase("" + fetchreports.getOTRepordetails().get(j).getCategoryName(), tabletext));
							PdfPCell cells139 = new PdfPCell(new Phrase("-" , tabletext));
							cells139.setHorizontalAlignment(Element.ALIGN_CENTER);
							cells139.setBorder(Rectangle.NO_BORDER);
							HeaderTable8.addCell(cells139);
							//HeaderTable8.getDefaultCell().setBorder(Rectangle.SECTION);

							PdfPCell cells140 = new PdfPCell(new Phrase("" + fetchreports.getOTRepordetails().get(j).getAmount() , tabletext));
							cells140.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells140.setBorder(Rectangle.NO_BORDER);
							HeaderTable8.addCell(cells140);
							
							
							
							document.add(HeaderTable8);
							HeaderTable8.flushContent();
							myServiceId.add(j);
							
							if(length == j){
							
								break;
							}
							j++;
						//	alert("index :" + index +"=" + i  + "");
						}
						PdfPTable HeaderTable88 = new PdfPTable(1);
						Paragraph paragraph = new Paragraph();
						int[] headerwidth6 = {90};
						DottedLineSeparator lineSeparator = new DottedLineSeparator();
						lineSeparator.setLineColor(BaseColor.GRAY);
						lineSeparator.setGap(3);
						paragraph.add(lineSeparator);
						paragraph.setFont(subheader);
						HeaderTable88.setWidths(headerwidth6);
						HeaderTable88.setWidthPercentage(95f);
						HeaderTable88.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						HeaderTable88.addCell(paragraph);
						//HeaderTable8.addCell(new Phrase("" + fetchreports.getOTRepordetails().get(j).getCategoryName(), tabletext));
                        document.add(HeaderTable88);
                        HeaderTable88.flushContent(); 
                        
                        PdfPTable HeaderTable8 = new PdfPTable(4);
                    //    HeaderTable8.setSpacingAfter(1f);
                    int[] headerwidth62 = { 40,30,7,20};
						HeaderTable8.setWidths(headerwidth62);
						HeaderTable8.setWidthPercentage(95f);
						HeaderTable8.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						//(DottedLineSeparator.ALIGN_BASELINE);
						HeaderTable8.addCell(new Phrase("" , tabletext));
						HeaderTable8.addCell(new Phrase("Sugery wise Amount :" , subheader));
						
						PdfPCell cells139 = new PdfPCell(new Phrase("" , tabletext));
						cells139.setHorizontalAlignment(Element.ALIGN_CENTER);
						cells139.setBorder(Rectangle.NO_BORDER);
						HeaderTable8.addCell(cells139);
						//HeaderTable8.getDefaultCell().setBorder(Rectangle.SECTION);

						PdfPCell cells140 = new PdfPCell(new Phrase("" +myFormatter.format(totalamnt) , subheader));
						cells140.setHorizontalAlignment(Element.ALIGN_RIGHT);
						cells140.setBorder(Rectangle.NO_BORDER);
						HeaderTable8.addCell(cells140);
	                    document.add(HeaderTable8);
						HeaderTable8.flushContent();
						 PdfPTable HeaderTable83 = new PdfPTable(1);
						 Paragraph paragraph1 = new Paragraph();
							int[] headerwidth61 = {10};
							HeaderTable83.setWidths(headerwidth61);
							HeaderTable83.setWidthPercentage(95f);
							HeaderTable83.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							DottedLineSeparator lineSeparator1 = new DottedLineSeparator();
							lineSeparator1.setLineColor(BaseColor.GRAY);
							lineSeparator1.setGap(3);
							paragraph1.add(lineSeparator1);
							paragraph1.setFont(subheader);
						
							
							HeaderTable83.addCell(paragraph1);
						document.add(HeaderTable83);
						HeaderTable83.flushContent(); 
						
						
						
						
						 PdfPTable HeaderTable01 = new PdfPTable(4);
		                    //    HeaderTable8.setSpacingAfter(1f);
								HeaderTable01.setWidths(headerwidth62);
								HeaderTable01.setWidthPercentage(95f);
								HeaderTable01.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								//(DottedLineSeparator.ALIGN_BASELINE);
								HeaderTable01.addCell(new Phrase("" , tabletext));
								HeaderTable01.addCell(new Phrase("Patwise Total :" , subheader));
					
								HeaderTable01.addCell(cells139);
								//HeaderTable8.getDefaultCell().setBorder(Rectangle.SECTION);
								HeaderTable01.addCell(cells140);
			                    document.add(HeaderTable01);
								HeaderTable8.flushContent();
								 PdfPTable HeaderTable835 = new PdfPTable(1);
								 HeaderTable835.setWidths(headerwidth61);
									HeaderTable835.setWidthPercentage(95f);
									HeaderTable835.getDefaultCell().setBorder(Rectangle.NO_BORDER);

							
	
								 HeaderTable835.addCell(paragraph1);
									
								document.add(HeaderTable835);
								HeaderTable835.flushContent();
                       grandtotal = grandtotal + totalamnt;
						chk=j;
						index++;
					}else{
						chk=j;
						
					}
					
				
				}else{
					
				}
				j=0;
				
				first=0;
				
			}

		
		

			
		
		

			
			
			/* BASCI iNFORMATION OF PURCHASE ORDER  ITEM MASTER */
			
			 document.add(new Phrase("\n"));

			
	%>

	<%
	
			
		 
	%>


	<%
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