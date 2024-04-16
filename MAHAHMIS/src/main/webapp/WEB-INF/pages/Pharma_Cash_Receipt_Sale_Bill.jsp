<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.pharmacy.pojo.CounterSaleMaster"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.pharmacy.controller.CounterSaleController"%>
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
			String hospitalName = hospObj.getHospitalName();
			hospitalName = hospitalName.toUpperCase();
			String address = hospObj.getHospitalAddress();
			String city = hospObj.getHospitalCity();
			String country = hospObj.getHospitalCountry();
			String contact = hospObj.getHospitalContact();
			String path1 = application.getRealPath(path);

			Image img = null;
			PdfPCell cell = null;
			try {

				img = Image.getInstance(path1);
				img.scaleAbsolute(150, 60);
				cell = new PdfPCell();
				cell.addElement(new Chunk(img, 5, -5));
				cell.setBorder(Rectangle.NO_BORDER);
			} catch (Exception e) {
				e.printStackTrace();
			}

			/* document.newPage(); */

			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 40, 70, 10 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

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
			/* HeaderTable1.addCell(new Phrase(
					"\n\n                                           "
							+ hospitalName + "\n      " + address, header)); */

							PdfPCell hospitalNameCell = new PdfPCell(new Phrase(
									hospitalName + "\n"+ country +"\n" +address+"\n TEL No:-"+contact, header));
							hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
							hospitalNameCell.setBorder(Rectangle.NO_BORDER);
							HeaderTable1.addCell(hospitalNameCell);
							HeaderTable1.addCell(new Phrase("", header));
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

	<c:forEach items="${cashReceiptDataSale}" var="row" varStatus="count">

       <c:set var="billId" value="${row.cashReceiptSaleId }" />

		<c:set var="billNumber" value="${row.cashReceiptSaleDocId }" />

		<c:set var="saleDate" value="${row.cashReceiptSaleDate }" />

		<c:set var="vendorName" value="${row.patientMaster.patName }" />
		
		<c:set var="vendorMobile" value="${row.patientMaster.patMobile }" />

			<c:set var="less" value="${row.cashReceiptSaleAmt}" />
		  
		  <c:set var="entrymadeby" value="${row.cashReceiptSaleMadeBy}" />
		
			<%
					String billNumber = "";
					if(pageContext.getAttribute("billNumber")
							.toString()==null)
					{
						billNumber = "";
					}
					else
					{	
					
					billNumber =  billNumber + (String) pageContext.getAttribute("billNumber")
									.toString();
					}
					
					String billId = "";
					if (pageContext.getAttribute("billId") == null) {
						billId = "";
					} else {

						billId = billId
								+ (String) pageContext.getAttribute(
										"billId").toString();
					}
					
					
					String saleDate1 = "";
					String splitSaleDate[];
					String 	saleDate="";
					
					if(pageContext.getAttribute("saleDate")
							.toString()==null)
					{
						saleDate1="";
						saleDate="";
					}
					else
					{
						saleDate1=saleDate1	+ (String) pageContext.getAttribute("saleDate")
								.toString();
						splitSaleDate=saleDate1.split(" ");
						saleDate=splitSaleDate[0];
					}
						
					String vendorName = "";
					if(pageContext.getAttribute("vendorName")
							.toString()==null)
					{
						vendorName = "";
					}
					else
					{
						vendorName =vendorName + (String) pageContext.getAttribute("vendorName")
								.toString();
					}

					String vendorMobile = "";
					if(pageContext
							.getAttribute("vendorMobile")==null)
					{
						vendorMobile = "";
					}
					else
					{
						vendorMobile=vendorMobile+(String) pageContext
							.getAttribute("vendorMobile").toString();
					}
					
					String less = "";
					if(pageContext.getAttribute("less")
							.toString()==null)
					{
						less = "";
					}
					else
					{
						less =less + (String) pageContext.getAttribute("less")
								.toString();
					}
					
					
					
					
					 String EntryMadeby = "";
					if(pageContext.getAttribute("entrymadeby")
							.toString()==null)
					{
						EntryMadeby = "";
					}
					else
					{
						EntryMadeby = EntryMadeby+(String) pageContext.getAttribute("entrymadeby")
								.toString();;
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
							.addCell(new Phrase("Receipt No : ", subheader));
					PdfPCell subcell1 = new PdfPCell(new Phrase(billId,
							subheader));
					subcell1.setHorizontalAlignment(Element.ALIGN_LEFT);
					subcell1.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(subcell1);
					
					
					HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable2
							.addCell(new Phrase("Vou No:- "+billNumber, subheader));
					PdfPCell subcell = new PdfPCell(new Phrase("",
							subheader));
					subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
					subcell.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(subcell);
					//HeaderTable2.addCell(new Phrase(""+ReceiptNo,subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("Date:", subheader));
					HeaderTable2.addCell(new Phrase(saleDate, subheader));
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
					HeaderTable4.addCell(new Phrase(vendorName, tabletext));
					PdfPCell cell0 = new PdfPCell(new Phrase("Phone Number:",
							subheader));
					cell0.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell0.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell0);
					//HeaderTable3.addCell(new Phrase("Department",subheader));
					HeaderTable4.addCell(new Phrase(vendorMobile, tabletext)); // deptName.toUpperCase()
					
					
				/* 	PdfPCell cell00 = new PdfPCell(new Phrase("Doctor:",
							subheader));
					cell00.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell00.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell00); */

					/* HeaderTable4.addCell(new Phrase("", subheader)); */
					/* HeaderTable4.addCell(new Phrase(doctor, tabletext)); */

					PdfPCell cell1 = new PdfPCell(new Phrase("", subheader));
					cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell1.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell1);
					//HeaderTable3.addCell(new Phrase("OPD No",subheader));
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

					/* PdfPTable afterVentilation = new PdfPTable(7); */
		%>

		<%
					/* afterVentilation.addCell(new Phrase("Sr", subheader));
					afterVentilation.addCell(new Phrase("Qty", subheader));
					afterVentilation.addCell(new Phrase("MRP", subheader));
					afterVentilation
							.addCell(new Phrase("Batch Num", subheader));
					afterVentilation.addCell(new Phrase("Expiry", subheader));
					afterVentilation.addCell(new Phrase("Rate", subheader));
					afterVentilation.addCell(new Phrase("Amt", subheader)); */
					
					
					PdfPTable HeaderTable6 = new PdfPTable(8);
					int[] headerwidth6 = {6 ,30, 7, 15, 10, 15, 20, 20 };
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

					
					document.add(HeaderTable6);
					HeaderTable6.flushContent();

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
		
					HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
				/* 	String total = ""
							+ (String) pageContext.getAttribute("total")
									.toString(); */
					document.add(HeaderTable6);
					HeaderTable6.flushContent();

				/* 	document.add(afterVentilation);
					afterVentilation.flushContent(); */

					HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable1.addCell(new Phrase("            ", header));
					HeaderTable1.addCell(new Phrase("            ", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();

					// for total
					/* PdfPTable afterVentilation1 = new PdfPTable(7);
					afterVentilation1.addCell(new Phrase("", subheader));
					afterVentilation1.addCell(new Phrase("", subheader));
					afterVentilation1.addCell(new Phrase("", subheader));
					afterVentilation1.addCell(new Phrase("", subheader));
					afterVentilation1.addCell(new Phrase("", subheader));
					afterVentilation1.addCell(new Phrase("Total", subheader));
					afterVentilation1.addCell(new Phrase(total, subheader));

					document.add(afterVentilation1);
					afterVentilation1.flushContent(); */
					
					PdfPTable HeaderTable7 = new PdfPTable(5);
					int[] headerwidth7 = { 20, 60, 20, 20, 20 };
					HeaderTable7.setWidths(headerwidth7);
					HeaderTable7.setWidthPercentage(95f);
					HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					/* HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					         				
														
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("" , tabletext)); */
					HeaderTable7.addCell(new Phrase("Amount", subheader));
				/* 	HeaderTable7.addCell(new Phrase("" , subheader)); */
					HeaderTable7.addCell(new Phrase(less , subheader));
					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("" , tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("Entry made By", subheader));
					/* HeaderTable7.addCell(new Phrase("" , subheader)); */
					HeaderTable7.addCell(new Phrase(EntryMadeby, subheader));
										
					/* HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("" , tabletext));
					HeaderTable7.addCell(new Phrase("Total", subheader));
					HeaderTable7.addCell(new Phrase("" , subheader));
					HeaderTable7.addCell(new Phrase(total , subheader)); */
					
					/* HeaderTable7.addCell(new Phrase("Balance", subheader));
					HeaderTable7.addCell(new Phrase("",tabletext));
					HeaderTable7.addCell(new Phrase("Discount", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("In Words", subheader)); */
					
					/* int finalTotal = (Integer.parseInt(total)); */
					
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
		<%-- <%
				PdfPTable HeaderTable5 = new PdfPTable(3);
					int[] headerwidth5 = { 30, 60, 20 };
					HeaderTable5.setWidths(headerwidth5);
					HeaderTable5.setWidthPercentage(95f);
					HeaderTable5.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					int[] headerwidth = { 20, 60, 20 };
					HeaderTable5.setWidths(headerwidth);
					HeaderTable5.getDefaultCell().setBorder(Rectangle.BOX);
					HeaderTable5.addCell(new Phrase("               INR "
							+ total, subheader));
					HeaderTable5.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
					HeaderTable5
							.addCell(new Phrase(
									"                       Payee Signature",
									tabletext));
					HeaderTable5.addCell(new Phrase("Autorized Signatory",
							tabletext));

					document.add(HeaderTable5);
					HeaderTable5.flushContent();
		%>
 --%>
	</c:forEach>
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
