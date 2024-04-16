<%@page import="com.itextpdf.text.html.WebColors"%>
<%@page import="com.hms.pharmacy.pojo.CounterSaleMaster"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.awt.Color"%>
<%@ page import="com.hms.dto.BillComponentSample"%>

<%-- <%@ page import="com.hms.admin.util.FetchHospitalDetailsForPharmacy"%> --%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.utility.ApplicationContextUtils"%>
<%@ page import="com.hms.pharmacy.controller.CounterSaleController"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>

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

			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);

			ServletOutputStream outStream = response.getOutputStream();
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			document.setMargins(20, 20, 20, 0);

			PdfWriter.getInstance(document, outStream);
			document.open();
			//font

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

			/* String opdNo = request.getParameter("opdNo");

			String deptName = "sagar";

			int ProductId = 0;
			int count = 1;
			String sql5 = "select * from hospital limit 1";
			List<Map> listHospitalDetails = getJdbcTemplate().queryForList(sql5); */

			String path = hospObj.getFilePath();
			String address = "";
			String city = "";
			String country = "";
			String contact = "";
			String hospitalName = hospObj.getHospitalName();
			//String hospitalName = "SHRADDHA MEDICAL STORES RUN BY SARGM HEALTHCARE PVT.LTD.";

			String path1 = application.getRealPath(path);

			//Added By Bilal For Full Address of Hospital
			 String hospitalZip = hospObj.getHospitalZip();
			String PhoneNo = hospObj.getHospitalContact();
			String secPhoneNo = hospObj.getSecPNo();
			String webste = hospObj.getWebsite();
			String email = hospObj.getHospitalEmail();
			String cinNo = hospObj.getTxtCinNo();
			String serviceTaxNo = hospObj.getTxtSerTaxNo();
			String panNo = hospObj.getPanNo();
			String hPhoneNo = PhoneNo + "/" + secPhoneNo;
			String GStNo = hospObj.getTxtGstNo(); 
			String nabh = "";
			String nabhLogo = "";

			int tmpFlag = 0;

			if (hospitalName.equals("")) {
				 hospitalName = hospObj.getHospitalName();
				address = hospObj.getHospitalAddress();
				city = hospObj.getHospitalCity();
				country = hospObj.getHospitalCountry();
				contact = hospObj.getHospitalContact(); 
			} else {
				address = "SHOP NO.1,GROUND FLOOR, GAT NO.524/1/E, Kasarwadi Road,BARSHI TAL:BARSHI(SOLAPUR), Pin: 413411 ";
				tmpFlag = 1;
				//GStNo=GStNo1;
			}

			hospitalName = hospitalName.toUpperCase();

			try {
				nabh = hospObj.getNabhImagePath();
				nabhLogo = application.getRealPath(nabh);
			} catch (Exception e) {
				e.printStackTrace();
			}

			/* document.newPage(); */

			
				PdfPTable HeaderTable1 = new PdfPTable(3);
				int[] headerwidth1 = { 30, 70, 30 };
				HeaderTable1.setWidths(headerwidth1);
				HeaderTable1.setWidthPercentage(95f);
				HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
				HeaderTable1.getDefaultCell()
						.setBorder(Rectangle.NO_BORDER);
				Image img = null;
				PdfPCell cell = null;
				try {

					//img = Image.getInstance(path1);
					img.scaleAbsolute(80, 60);
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

				if (img == null || tmpFlag == 1) {

					HeaderTable1.addCell(new Phrase(" "));
				} else {

					HeaderTable1.addCell(cell);
				}
				Font regular = new Font(FontFamily.TIMES_ROMAN, 10,
						Font.NORMAL);
				Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD);
				Phrase p = new Phrase();
				p.add(new Chunk(" " + hospitalName, bold));
				p.add(new Chunk(" \n\n" + address, tabletext));

				if (tmpFlag == 0) {
					 p.add(new Chunk(" " + city + " Pin- " + hospitalZip,
							tabletext));
					p.add(new Chunk(" Phone No. " + hPhoneNo, tabletext));
					p.add(new Chunk(" \n " + webste + " email: " + email,
							tabletext)); 
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
					} 
				}

				PdfPCell hospitalNameCell = new PdfPCell(p);
				hospitalNameCell
						.setHorizontalAlignment(Element.ALIGN_CENTER);
				hospitalNameCell.setBorder(Rectangle.NO_BORDER);
				HeaderTable1.addCell(hospitalNameCell);

				if (imgNabh == null || tmpFlag == 1) {

					/* HeaderTable1.addCell(new Phrase(new Phrase("DL20.MH-50L-282894"
								+ "\nDL20.MH-50L-282895", subheader))); */
					HeaderTable1.addCell(new Phrase(" ", subheader));
				} else {

					HeaderTable1.addCell(cellNabh);
				}

				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				document.add(HeaderTable1);
				HeaderTable1.flushContent();

			

			PdfPTable HeaderTable2 = new PdfPTable(5);
			int[] headerwidth2 = { 15, 25, 40, 10, 10 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			if (img == null) {
				HeaderTable1.addCell(new Phrase("", header));
			} else {
				HeaderTable1.addCell(cell);
			}
			//HeaderTable1.addCell(new Phrase(hospitalName +"\n TEL No:-"+contact, header));
			
			HeaderTable1.addCell(new Phrase("", header));

			HeaderTable1.addCell(new Phrase("", header));

			document.add(HeaderTable1);
			HeaderTable1.flushContent();

			PdfPTable patientDemoDetailName2 = new PdfPTable(4);
			int[] patientDemoDetailNameWidth2 = { 16, 36, 16, 36 };
			patientDemoDetailName2.setWidths(patientDemoDetailNameWidth2);
			patientDemoDetailName2.setWidthPercentage(95f);
			patientDemoDetailName2.getDefaultCell().setBorder(
					Rectangle.NO_BORDER);

			patientDemoDetailName2.addCell(new Phrase("", subheader));
			patientDemoDetailName2.addCell(new Phrase("", subheader));
			patientDemoDetailName2.addCell(new Phrase("", subheader));
			patientDemoDetailName2.addCell(new Phrase("", subheader));

			patientDemoDetailName2.addCell(new Phrase("", subheader));
			patientDemoDetailName2.addCell(new Phrase("", subheader));
			patientDemoDetailName2.addCell(new Phrase("", subheader));
			patientDemoDetailName2.addCell(new Phrase("", subheader));

			document.add(patientDemoDetailName2);
			patientDemoDetailName2.flushContent();
	%>
	
        <c:set var="patientName" value="${patientSalePatientData}" />  

		<c:set var="amountReceive" value="${amountReceive }" />

		<c:set var="narration" value="${narration }" />

		<c:set var="discount" value="${discount }" />

		<c:set var="date" value="${date}" />
		
		<c:set var="billId" value="${billId}" />
		

	
		<%
					String amountReceive = "";
					if (pageContext.getAttribute("amountReceive") == null) {
						amountReceive = "";
					} else {

						amountReceive = amountReceive
								+ (String) pageContext.getAttribute(
										"amountReceive").toString();
					}

					String billId = "";
					if (pageContext.getAttribute("billId") == null) {
						billId = "";
					} else {
						billId = billId
								+ (String) pageContext.getAttribute(
										"billId").toString();
					}

					
					String patientName= "";
					if (pageContext.getAttribute("patientName") == null) {
						patientName = "";
					} else {

						patientName = patientName
								+ (String) pageContext.getAttribute(
										"patientName").toString();
					}  
					
					
					

					String narration = "";
					if (pageContext.getAttribute("narration") == null) {
						narration = "";
					} else {
						narration = narration
								+ (String) pageContext.getAttribute(
										"narration").toString();
					}

					String discount = "";
					if (pageContext.getAttribute("discount") == null) {
						discount = "";
					} else {
						discount = discount
								+ (String) pageContext.getAttribute("discount")
										.toString();
					}
					
					String date = "";
					if (pageContext.getAttribute("date") == null) {
						date = "";
					} else {
						date = date
								+ (String) pageContext.getAttribute("date")
										.toString();
					}

					
					PdfPTable HeaderTable3 = new PdfPTable(6);
					int[] headerwidth3 = { 18, 30, 20, 20, 20, 20 };
					HeaderTable3.setWidths(headerwidth3);
					HeaderTable3.setWidthPercentage(95f);
					HeaderTable3.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable2
							.addCell(new Phrase("Final Patient Bill", subheader));
					PdfPCell subcell = new PdfPCell(new Phrase("",
							subheader));
					subcell.setHorizontalAlignment(Element.ALIGN_CENTER);
					subcell.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(subcell);
				
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("Date:", subheader));
					HeaderTable2.addCell(new Phrase(date, subheader));
					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					PdfPTable HeaderTable4 = new PdfPTable(6);
					int[] headerwidth4 = { 18, 30, 20, 20, 20, 20 };
					HeaderTable4.setWidths(headerwidth4);
					HeaderTable4.setWidthPercentage(95f);
					HeaderTable4.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));
				
					HeaderTable4
							.addCell(new Phrase("Patient Name:", subheader));
					HeaderTable4.addCell(new Phrase(patientName, tabletext));
					
					HeaderTable4
					.addCell(new Phrase("", subheader));
			      HeaderTable4.addCell(new Phrase("Bill Id : "+billId, subheader));
					PdfPCell cell0 = new PdfPCell(new Phrase("", subheader));
					cell0.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell0.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell0);
				
					HeaderTable4.addCell(new Phrase("", tabletext)); 

					PdfPCell cell00 = new PdfPCell(new Phrase("", subheader));
					cell00.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell00.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell00);

				
					HeaderTable4.addCell(new Phrase("", tabletext));

					PdfPCell cell1 = new PdfPCell(new Phrase("", subheader));
					cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell1.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell1);
				
					HeaderTable4.addCell(new Phrase("", tabletext));

					document.add(HeaderTable4);
					HeaderTable4.flushContent();

					PdfPTable patientDemoDetailName3 = new PdfPTable(4);
					int[] patientDemoDetailNameWidth3 = { 16, 36, 16, 36 };
					patientDemoDetailName3
							.setWidths(patientDemoDetailNameWidth2);
					patientDemoDetailName3.setWidthPercentage(95f);
					patientDemoDetailName3.getDefaultCell().setBorder(
							Rectangle.NO_BORDER);

					patientDemoDetailName3.addCell(new Phrase("", subheader));
					patientDemoDetailName3.addCell(new Phrase("", subheader));
					patientDemoDetailName3.addCell(new Phrase("", subheader));
					patientDemoDetailName3.addCell(new Phrase("", subheader));

					patientDemoDetailName3.addCell(new Phrase("", subheader));
					patientDemoDetailName3.addCell(new Phrase("", subheader));
					patientDemoDetailName3.addCell(new Phrase("", subheader));
					patientDemoDetailName3.addCell(new Phrase("", subheader));

					document.add(patientDemoDetailName3);
					patientDemoDetailName3.flushContent();

				
		%>

		<%
			

					PdfPTable HeaderTable6 = new PdfPTable(8);
					int[] headerwidth6 = { 15, 30, 7, 15, 10, 15, 20, 20 };
					HeaderTable6.setWidths(headerwidth6);
					HeaderTable6.setWidthPercentage(95f);
					HeaderTable6.getDefaultCell().setBorder(Rectangle.BOTTOM);

					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));


					HeaderTable6.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
		%>
		

			<%
				


							HeaderTable6.addCell(new Phrase("", tabletext));
							HeaderTable6
									.addCell(new Phrase("", tabletext));
							HeaderTable6.addCell(new Phrase("", tabletext));

							PdfPCell cell2 = new PdfPCell(
									new Phrase("", tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell2);

						
							PdfPCell batchCodeCells = new PdfPCell(new Phrase(
									"", tabletext));
							batchCodeCells
									.setHorizontalAlignment(Element.ALIGN_CENTER);
							batchCodeCells.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(batchCodeCells);

							PdfPCell cell3 = new PdfPCell(new Phrase("",
									tabletext));
							cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell3.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell3);

							PdfPCell cell4 = new PdfPCell(new Phrase("",
									tabletext));
							cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell4.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell4);

							PdfPCell cell5 = new PdfPCell(
									new Phrase("", tabletext));
							cell5.setHorizontalAlignment(Element.ALIGN_CENTER);
							cell5.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell5);

							document.add(HeaderTable6);
							HeaderTable6.flushContent();
			%>


		<%
			HeaderTable6.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(new Phrase("Narration :", subheader));
					HeaderTable6.addCell(new Phrase(narration, subheader));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
			
					document.add(HeaderTable6);
					HeaderTable6.flushContent();

		

					HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable1.addCell(new Phrase("            ", header));
					HeaderTable1.addCell(new Phrase("            ", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();

					PdfPTable HeaderTable7 = new PdfPTable(5);
					int[] headerwidth7 = { 20, 60, 20, 20, 20 };
					HeaderTable7.setWidths(headerwidth7);
					HeaderTable7.setWidthPercentage(95f);
					HeaderTable7.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("Amount Receive", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase(amountReceive, subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("Discount", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase(discount, subheader));



					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					document.add(HeaderTable7);
					HeaderTable7.flushContent();

					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));

					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));

					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));

					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));

					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));

					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));
					patientDemoDetailName2.addCell(new Phrase("", subheader));

					document.add(patientDemoDetailName2);
					patientDemoDetailName2.flushContent();

				
		%>
		<%
			PdfPTable HeaderTable5 = new PdfPTable(3);
					int[] headerwidth5 = { 30, 60, 20 };
					HeaderTable5.setWidths(headerwidth5);
					HeaderTable5.setWidthPercentage(95f);
					HeaderTable5.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					int[] headerwidth = { 20, 60, 20 };
					HeaderTable5.setWidths(headerwidth);
					HeaderTable5.getDefaultCell().setBorder(Rectangle.BOX);
					HeaderTable5.addCell(new Phrase("INR       "+amountReceive, subheader));
					HeaderTable5.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
					HeaderTable5
							.addCell(new Phrase(
									"                       Payee Signature",
									tabletext));
					HeaderTable5.addCell(new Phrase("Authorized Signatory",
							tabletext));

					document.add(HeaderTable5);
					HeaderTable5.flushContent();
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