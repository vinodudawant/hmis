<%@page import="java.util.ResourceBundle"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%-- <%@page import="com.hms.admin.util.FetchHospitalDetails"%> --%>
<%@page import="com.itextpdf.text.html.WebColors"%>
<%@page import="com.hms.pharmacy.pojo.CounterSaleMaster"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.awt.Color"%>
<%-- <%@ page import="com.hms.dto.BillComponentSample"%>
<%@ page import="com.hms.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetailsForPharmacy"%> --%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.pharmacy.controller.CounterSaleController"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@ page import="com.hms.ehat.dto.CurrencyTypeDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.hms.administrator.dto.HospitalDetailsDTO"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext,
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
	<%DecimalFormat df2 = new DecimalFormat("0.00");

	try {
		response.setContentType("application/pdf");
					CurrencyTypeService fetchOneCurrency=(ApplicationContextUtils.getApplicationContext()).getBean(CurrencyTypeService.class);
			List<CurrencyTypeDto> listServiceCurrencyDto=fetchOneCurrency.getOneCurrencyList();
			String currencyCode=listServiceCurrencyDto.get(0).getCurrencyCode();
			String currencyName=listServiceCurrencyDto.get(0).getCurrencyName();

			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);
			
			// start
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
				String print =  (String) resourceBundleEhat.getString("pharmacyPrint");
				String MedicalName =  hospObj.getMedicalName();//resourceBundleEhat.getString("MedicalName");
				String MedicalAddress = hospObj.getMedicalAddress();//resourceBundleEhat.getString("address");
				String MedicalZipcode = hospObj.getMedicalZipCode();
				String MedicalDrugLicenseNo = hospObj.getDruglicense(); //(String) resourceBundleEhat.getString("drugLicenseNo");
				String MedicalDrugLicenseNo1 = hospObj.getDrugLicense1(); //(String) resourceBundleEhat.getString("drugLicenseNo1");
				String MedicalPhoneNo =  hospObj.getMedicalContact();//resourceBundleEhat.getString("PhoneNo");
				String MedicalEmail =hospObj.getMedicalEmail(); // resourceBundleEhat.getString("email");
				String GSTIN = hospObj.getMedicalGstNo();//resourceBundleEhat.getString("GSTIN");
				
				
				ResourceBundle resourceBundlepharmacy = ResourceBundle
				.getBundle("pharmacy");
				String drugLicenseNo = hospObj.getDruglicense(); //(String) resourceBundlepharmacy.getString("drugLicenseNo");
				
				String drugLicenseNo1 =hospObj.getDrugLicense1();  //(String) resourceBundlepharmacy.getString("drugLicenseNo1");
				
				String GStNo1 = hospObj.getMedicalGstNo(); // (String) resourceBundlepharmacy.getString("GStNo");

			
				String patientTransType = "";
				if (pageContext.getAttribute("patientTransType") == null) {
					patientTransType = "";
				} else {

			patientTransType = patientTransType + (String) pageContext.getAttribute("patientTransType")
							.toString();
				}

				// End

		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		
		response.setHeader("Content-Disposition", "inline; filename = Opening Stock");
		
		Document document;

		//On off flow for counter sale print 
		if (print.contains("off")) {

			document = new Document(PageSize.A5);
		} else {
			document = new Document(PageSize.A4);

		}
		document.setMargins(10, 10, 7, 0);

		PdfWriter.getInstance(document, outStream);
		session = request.getSession();
		String user_name = (String) session.getAttribute("userName");

		DecimalFormat df22 = new DecimalFormat("0.00");

		/* -------------------- Define Fonts ---------------------------  */
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
		/* -------------------- Define Fonts ---------------------------  */

		document.open();

		String path = hospObj.getFilePath();
		String address = "";
		String city = "";
		String country = "";
		String contact = "";
	//	String MedicalName = (String) resourceBundleEhat.getString("MedicalName");

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

		if (MedicalName.equals("")) {
			MedicalName = hospObj.getMedicalName();
			address = hospObj.getMedicalAddress();
			city = hospObj.getMedicalCity();
			country = hospObj.getMedicalCountry();
			contact = hospObj.getMedicalContact();
		} else {
			address =hospObj.getMedicalAddress();
			tmpFlag = 1;
		//	GStNo=GStNo1;
		}

		MedicalName = MedicalName.toUpperCase();

		try {
			nabh = hospObj.getNabhImagePath();
			nabhLogo = application.getRealPath(nabh);
		} catch (Exception e) {
			e.printStackTrace();
		}

		/* document.newPage(); */

		// Table 1 : For hospital adress details start
		//Added By BILAL For Hospital information for off flow 
		if (print.contains("off")) {
			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 20, 80, 0 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable1.getDefaultCell()
					.setBorder(Rectangle.NO_BORDER);

			Image img = null;
			PdfPCell cell = null;
			try {

				img = Image.getInstance(path1);
				img.scaleAbsolute(50, 45);
				cell = new PdfPCell();
				cell.addElement(new Chunk(img, 5, -5));
				cell.setBorder(Rectangle.NO_BORDER);
			} catch (Exception e) {
				e.printStackTrace();
			}

			if (img == null) {

				HeaderTable1.addCell(new Phrase("", header));
			} else {

				HeaderTable1.addCell(cell);
			}

			Font regular = new Font(FontFamily.TIMES_ROMAN, 10,
					Font.NORMAL);
			Font bold = new Font(FontFamily.TIMES_ROMAN, 12, Font.BOLD);
			Phrase p = new Phrase();
			p.add(new Chunk(" " + MedicalName, bold));

			if (tmpFlag == 0) {
				p.add(new Chunk(" \n\n" + address + "," + city
						+ " Pin- " + MedicalZipcode, tabletext));
				p.add(new Chunk(" \nPhone No. " + MedicalPhoneNo, tabletext));
				//	p.add(new Chunk(" \nGST NO: " + GStNo, tabletext));
			} else {
				p.add(new Chunk(" \n\n" + address, tabletext));
				p.add(new Chunk("", tabletext));
			}
			PdfPCell MedicalNameCell = new PdfPCell(p);
			MedicalNameCell
					.setHorizontalAlignment(Element.ALIGN_CENTER);
			MedicalNameCell.setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(MedicalNameCell);

			HeaderTable1.addCell(new Phrase("", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();

			HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();

		} else {
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

			img = Image.getInstance(path1);
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
				imgNabh = Image.getInstance(nabhLogo);
				imgNabh.scaleAbsolute(80, 60);
				cellNabh = new PdfPCell();
				cellNabh.addElement(new Chunk(imgNabh, 5, -5));
				cellNabh.setBorder(Rectangle.NO_BORDER);
			} catch (Exception e) {
				e.printStackTrace();
			}

			if (img == null || tmpFlag == 1) {

				HeaderTable1.addCell(new Phrase("GSTIN- "+GSTIN, subheader));
			} else {

				HeaderTable1.addCell(cell);
			}
			Font regular = new Font(FontFamily.TIMES_ROMAN, 10,
					Font.NORMAL);
			Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD);
			Phrase p = new Phrase();
			p.add(new Chunk(" " + MedicalName, bold));
			p.add(new Chunk(" \n\n" + address, tabletext));

			if (tmpFlag == 0) {
				p.add(new Chunk(" \n" + city + " Pin- " + hospitalZip,
						tabletext));
				p.add(new Chunk(" \nPhone No. " + hPhoneNo, tabletext));
				p.add(new Chunk(" \n " + webste + " email: " + email,
						tabletext));
				p.add(new Chunk(" \nCIN: " + cinNo, tabletext));
				p.add(new Chunk(" \nService Tax: " + serviceTaxNo
						+ ", PAN No: " + panNo, tabletext));
			}

			PdfPCell MedicalNameCell = new PdfPCell(p);
			MedicalNameCell
					.setHorizontalAlignment(Element.ALIGN_CENTER);
			MedicalNameCell.setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(MedicalNameCell);

			if (imgNabh == null || tmpFlag == 1) {

				//HeaderTable1.addCell(new Phrase("DL. "+drugLicenseNo+"\nDL. "+drugLicenseNo1, subheader));
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

			HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
		}

			PdfPTable HeaderTable2 = new PdfPTable(6);
			int[] headerwidth2 = { 20,22,33,15,8,20 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);

			
			PdfPTable patientDemoDetailName2 = new PdfPTable(4);
			int[] patientDemoDetailNameWidth2 = { 16, 36, 16, 36 };
			patientDemoDetailName2.setWidths(patientDemoDetailNameWidth2);
			patientDemoDetailName2.setWidthPercentage(95f);
			patientDemoDetailName2.getDefaultCell().setBorder(
					Rectangle.NO_BORDER);

		

			document.add(patientDemoDetailName2);
			patientDemoDetailName2.flushContent();

	%>

	

	



 <%
					
					document.add(HeaderTable2);
					HeaderTable2.flushContent();
					
					document.add(HeaderTable2);
					HeaderTable2.flushContent();
					
				    HeaderTable2.addCell(new Phrase("", subheader)); 
				    HeaderTable2.addCell(new Phrase("", subheader)); 
				    
				   
					BaseColor myColor = WebColors.getRGBColor("#00a0d6");
					PdfPCell text = new PdfPCell(new Phrase("Opening Stock",
					header));
					text.setHorizontalAlignment(Element.ALIGN_CENTER);
					//text.setBackgroundColor(myColor);
					text.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(text); 
					HeaderTable2.addCell(new Phrase("", subheader));  
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
						
						
						
					document.add(HeaderTable2);
					HeaderTable2.flushContent();

				

		

					

					
					
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
   <c:set var="pName" value="${productFullName}" /> 

		<c:forEach items="${openingStockData}" var="vendor" varStatus="count">

			<c:set var="qty" value="${vendor.quantity }" />
			
              <c:set var="saleDate" value="${vendor.naration}" />
              
			<c:set var="mrp" value="${vendor.mrp }" />

			<c:set var="rate" value="${vendor.purRate }" />

			<c:set var="amt" value="${vendor.amt }" />

			<c:set var="batchCode" value="${vendor.batchCode }" />

			<c:set var="expiry" value="${vendor.batchExpiry}" />

			<c:set var="counter" value="${(count.index)+1}" />
		<%
		
		String saleDate = "";
		if (pageContext.getAttribute("saleDate") == null) {
			saleDate = "";
		} else {
			saleDate = saleDate
					+ (String) pageContext.getAttribute("saleDate")
							.toString();
		}
		
		  
			
															HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
															HeaderTable2.addCell(new Phrase("", subheader));
															HeaderTable2.addCell(new Phrase("", subheader));
															HeaderTable2.addCell(new Phrase("", subheader));
															HeaderTable2.addCell(new Phrase("", subheader));
															HeaderTable2.addCell(new Phrase("", subheader));
															HeaderTable2.addCell(new Phrase("", subheader));
															
															HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
															HeaderTable2.addCell(new Phrase("", subheader));
															HeaderTable2.addCell(new Phrase("", subheader));
															HeaderTable2.addCell(new Phrase("", subheader));
															HeaderTable2.addCell(new Phrase("", subheader));
															HeaderTable2.addCell(new Phrase("", subheader));
															HeaderTable2.addCell(new Phrase("", subheader));
															document.add(HeaderTable2);
															HeaderTable2.flushContent();

															HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
															HeaderTable2
																	.addCell(new Phrase(" ", subheader));
															PdfPCell subcell = new PdfPCell(new Phrase("",
																	subheader));
															subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
															subcell.setBorder(Rectangle.NO_BORDER);
															HeaderTable2.addCell(subcell);
															//HeaderTable2.addCell(new Phrase(""+ReceiptNo,subheader));
															HeaderTable2.addCell(new Phrase("", subheader));
															HeaderTable2.addCell(new Phrase("", subheader));
															HeaderTable2.addCell(new Phrase("Date:", subheader));
															HeaderTable2.addCell(new Phrase(saleDate, subheader));
															
															document.add(HeaderTable2);
															HeaderTable2.flushContent();
															
											
					PdfPTable HeaderTable6 = new PdfPTable(8);
					int[] headerwidth6 = { 6, 30, 7, 15, 20, 15, 20, 20 };
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

					HeaderTable6.addCell(new Phrase("#", subheader));
					HeaderTable6.addCell(new Phrase("Product Name", subheader));
					HeaderTable6.addCell(new Phrase("Qty", subheader));
					/* HeaderTable6.addCell(new Phrase("", subheader)); */

					PdfPCell mrpCell = new PdfPCell(new Phrase("MRP ("+currencyCode+")",
							subheader));
					mrpCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					mrpCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(mrpCell);

					PdfPCell batchNumberCell = new PdfPCell(new Phrase(
							"Batch Number", subheader));
					batchNumberCell
							.setHorizontalAlignment(Element.ALIGN_RIGHT);
					batchNumberCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(batchNumberCell);

					/* HeaderTable6.addCell(new Phrase(".", subheader)); */
					/* 	HeaderTable6.addCell(new Phrase("EXpiry", subheader)); */

					PdfPCell cells = new PdfPCell(new Phrase("Expiry",
							subheader));
					cells.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells);

					PdfPCell cells1 = new PdfPCell(new Phrase("Rate ("+currencyCode+")",
							subheader));
					cells1.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells1.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells1);

					/* HeaderTable6.addCell(new Phrase(" ",
							subheader)); */

					PdfPCell cells2 = new PdfPCell(new Phrase("Amount ("+currencyCode+")",
							subheader));
					cells2.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells2.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells2);

					/* HeaderTable6.addCell(new Phrase("",
							subheader)); */

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
		<%-- <c:set var="total" value="${row.purNetAmt }" /> --%>

              

	<%-- 	 <c:set var="productName" value="${vendor.productMaster.productName}" />  --%>

       

			<%
			
		
			
		
				String counter = ""
									+ (String) pageContext.getAttribute("counter")
											.toString();

							String qty = "";
							if (pageContext.getAttribute("qty") == null) {
								qty = "";
							} else {
								qty = qty
										+ (String) pageContext.getAttribute("qty")
												.toString();
							}

							/* String qty = ""
									+ (String) pageContext.getAttribute("qty")
											.toString(); */

							String mrp = "";
							if (pageContext.getAttribute("mrp") == null) {
								mrp = "";
							} else {
								mrp = mrp
										+ (String) pageContext.getAttribute("mrp")
												.toString();
							}

							/* String mrp = ""
									+ (String) pageContext.getAttribute("mrp")
											.toString(); */

							String rate = "";
							if (pageContext.getAttribute("rate") == null) {
								rate = "";
							} else {
								rate = rate
										+ (String) pageContext.getAttribute("rate")
												.toString();
							}

							/* String rate = ""
									+ (String) pageContext.getAttribute("rate")
											.toString(); */

							String amt = "";
							if (pageContext.getAttribute("amt") == null) {
								amt = "";
							} else {
								amt = amt
										+ (String) pageContext.getAttribute("amt")
												.toString();
							}

							

							String batchCode = "";
							if (pageContext.getAttribute("batchCode") == null) {
								batchCode = "";
							} else {
								batchCode = batchCode
										+ (String) pageContext.getAttribute(
												"batchCode").toString();
							}

							/* String batchCode = ""
									+ (String) pageContext
											.getAttribute("batchCode").toString(); */

							String expiry = "";
							if (pageContext.getAttribute("expiry") == null) {
								expiry = "";
							} else {
								expiry = expiry
										+ (String) pageContext.getAttribute(
												"expiry").toString();
							}

							/* String expiry = ""
									+ (String) pageContext.getAttribute("expiry")
											.toString(); */

							 String pName = "";
							if (pageContext.getAttribute("pName") == null) {
								pName = "";
							} else {
								pName = pName
										+ (String) pageContext.getAttribute(
												"pName").toString();
							}
							
							
							
							HeaderTable6.getDefaultCell().setBorder(Rectangle.BOTTOM);  
							HeaderTable6.addCell(new Phrase(counter, tabletext));
							HeaderTable6
									.addCell(new Phrase(pName, tabletext));
							HeaderTable6.addCell(new Phrase(qty, tabletext));
							
							
							PdfPCell cell2 = new PdfPCell(
									new Phrase( df2.format(Double.parseDouble(mrp)) , tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell2.setBorder(Rectangle.BOTTOM);
							HeaderTable6.addCell(cell2);

							/* HeaderTable6.addCell(new Phrase(, tabletext)); */
							PdfPCell batchCodeCells = new PdfPCell(new Phrase(
									batchCode, tabletext));
							batchCodeCells
									.setHorizontalAlignment(Element.ALIGN_RIGHT);
							batchCodeCells.setBorder(Rectangle.BOTTOM);
							HeaderTable6.addCell(batchCodeCells);

							PdfPCell cell3 = new PdfPCell(new Phrase(expiry,
									tabletext));
							cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell3.setBorder(Rectangle.BOTTOM);
							HeaderTable6.addCell(cell3);

							PdfPCell cell4 = new PdfPCell(new Phrase(df2.format(Double.parseDouble( rate)),
									tabletext));
							cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell4.setBorder(Rectangle.BOTTOM);
							HeaderTable6.addCell(cell4);

							PdfPCell cell5 = new PdfPCell(
									new Phrase(df2.format(Double.parseDouble( amt)), tabletext));
							cell5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell5.setBorder(Rectangle.BOTTOM);
							HeaderTable6.addCell(cell5);

							document.add(HeaderTable6);
							HeaderTable6.flushContent();
			%>
		<%-- </c:forEach> --%>

		<%
		
			

					// for total
					 PdfPTable afterVentilation1 = new PdfPTable(7);
					 afterVentilation1.getDefaultCell().setBorder(
								Rectangle.NO_BORDER);
					afterVentilation1.addCell(new Phrase("", subheader));
					afterVentilation1.addCell(new Phrase("", subheader));
					afterVentilation1.addCell(new Phrase("", subheader));
					afterVentilation1.addCell(new Phrase("", subheader));
					afterVentilation1.addCell(new Phrase("", subheader));
					afterVentilation1.addCell(new Phrase("Total", subheader));
					afterVentilation1.addCell(new Phrase(df2.format(Double.parseDouble( amt)), subheader));

					document.add(afterVentilation1);
					afterVentilation1.flushContent(); 

				
					


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
					/* HeaderTable5.addCell(new Phrase("               INR "
							+ total, subheader)); */
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
