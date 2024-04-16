<%@page import="org.json.JSONObject"%>
<%@page import="org.json.JSONArray"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.pharmacy.pojo.CounterSaleMaster"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%-- <%@ page import="com.hms.admin.util.FetchHospitalDetailsForPharmacy"%> --%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.pharmacy.controller.CounterSaleController"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.hms.dto.Prescription"%>
<%@page import="com.hms.utility.EnglishNumberToWords"%>
<%-- <%@page import="org.omg.CORBA._PolicyStub"%> --%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.List"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%-- <%@ page import="com.hms.model.BillModel"%> --%>
<%@ page import="com.hms.pharmacy.dao.EhatEnterpriseUtil"%>
<%@ page import="com.hms.utility.ApplicationContextUtils"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@ page import="com.hms.ehat.dto.CurrencyTypeDto"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
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
			response.setContentType("application/pdf");
			CurrencyTypeService fetchOneCurrency=(ApplicationContextUtils.getApplicationContext()).getBean(CurrencyTypeService.class);
			List<CurrencyTypeDto> listServiceCurrencyDto=fetchOneCurrency.getOneCurrencyList();
			String currencyCode=listServiceCurrencyDto.get(0).getCurrencyCode();
			String currencyName=listServiceCurrencyDto.get(0).getCurrencyName();

			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);

			// start
			DecimalFormat df99 = new DecimalFormat("0.00");
			Double totGst=0.0;
			//For on off flow 
			ResourceBundle resourceBundleEhat = ResourceBundle
				.getBundle("Ehat");
				String print =  (String) resourceBundleEhat.getString("pharmacyPrint");
			
				
				String MedicalName =  hospObj.getMedicalName();//resourceBundleEhat.getString("hospitalName");
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

				// End
				String patientTransType = "";
				if (pageContext.getAttribute("patientTransType") == null) {
			patientTransType = "";
				} else {

			patientTransType = patientTransType
					+ (String) pageContext.getAttribute("patientTransType")
							.toString();
				}

			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			Document document;
			
			response.setHeader("Content-Disposition", "inline; filename = Indent Sale");

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
			String hospitalName = (String) resourceBundleEhat
					.getString("hospitalName");

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
				address = "SHOP.NO.1 , UPR GR FLR ,PLOT.NO.136 TO 138 ZONE NO 8,GUT NO 71,ALPINE SUPERSPECIALITY HOSPITAL JAYNAGRI, BEED BY PASS, AURANGABAD-431001";
				tmpFlag = 1;
				GStNo=GStNo1;
			}
			 address = "SHOP.NO.1 , UPR GR FLR ,PLOT.NO.136 TO 138 ZONE NO 8,GUT NO 71,ALPINE SUPERSPECIALITY HOSPITAL JAYNAGRI, BEED BY PASS, AURANGABAD-431001";
			hospitalName = hospitalName.toUpperCase();

		/* 	try {
				nabh = hospObj.getNabhImagePath();
				nabhLogo = application.getRealPath(nabh);
			} catch (Exception e) {
				e.printStackTrace();
			}
 */
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
							+ " Pin- " + hospitalZip, tabletext));
					p.add(new Chunk(" \nPhone No. " +  "7721835774", tabletext));
					//	p.add(new Chunk(" \nGST NO: " + GStNo, tabletext));
				} else {
					p.add(new Chunk(" \n\n" + address, tabletext));
					p.add(new Chunk("", tabletext));
				} 
				PdfPCell hospitalNameCell = new PdfPCell(p);
				hospitalNameCell
						.setHorizontalAlignment(Element.ALIGN_CENTER);
				hospitalNameCell.setBorder(Rectangle.NO_BORDER);
				HeaderTable1.addCell(hospitalNameCell);

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
					cell.addElement(new Chunk(img,35, -45));
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
				p.add(new Chunk(" \n\n" + MedicalAddress, tabletext));

			 	if (tmpFlag == 0) {
					/* p.add(new Chunk(" \n" + city + " Pin- " + hospitalZip,
							tabletext)); */
					p.add(new Chunk(" \nPhone No. " + MedicalPhoneNo, tabletext));
					p.add(new Chunk(" \n "   + " email: " + MedicalEmail,
							tabletext));
					/* p.add(new Chunk(" \nCIN: " + cinNo, tabletext));
					p.add(new Chunk(" \nService Tax: " + serviceTaxNo
							+ ", PAN No: " + panNo, tabletext)); */
				} 

				PdfPCell hospitalNameCell = new PdfPCell(p);
				hospitalNameCell
						.setHorizontalAlignment(Element.ALIGN_CENTER);
				hospitalNameCell.setBorder(Rectangle.NO_BORDER);
				HeaderTable1.addCell(hospitalNameCell);

				if (imgNabh == null || tmpFlag == 1) {

					HeaderTable1.addCell(new Phrase("DL. "+MedicalDrugLicenseNo+"\nDL. "+MedicalDrugLicenseNo1, subheader));
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
							

			// Table 1 : For hospital adress details end
			//End ----------------

			PdfPTable HeaderTable2 = new PdfPTable(5);
			int[] headerwidth2 = { 15, 25, 40, 10, 10 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			String billName = "";
			//String drugLicenseNo = "";
			String foodLicenseNo = "";
			String vatTinNo = "";
			String moduleName = "";

			/* Map<String, org.json.JSONArray> ehatEnterprisePrintMaster = new HashMap<String, org.json.JSONArray>();
			EhatEnterpriseUtil ehatEnterpriseUtil = (ApplicationContextUtils
					.getApplicationContext())
					.getBean(EhatEnterpriseUtil.class);
			ehatEnterprisePrintMaster = ehatEnterpriseUtil
					.getPharmaPrintMasters();
			JSONArray array = ehatEnterprisePrintMaster.get("result");

			for (int i = 0; i < array.length(); i++) {
				org.json.JSONObject object = (org.json.JSONObject) array
						.get(i);
				if (object.get("moduleName").equals("indentSale")) {
					try {
						billName = (String) object.get("billName");
						drugLicenseNo = (String) object
								.get("drugLicenseNo");
						foodLicenseNo = (String) object
								.get("foodLicenseNo");
						vatTinNo = (String) object.get("vatTinNo");
						moduleName = (String) object.get("moduleName");
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			} */

			
			PdfPTable patientDemoDetailName2 = new PdfPTable(4);
			int[] patientDemoDetailNameWidth2 = { 16, 36, 16, 36 };
			patientDemoDetailName2.setWidths(patientDemoDetailNameWidth2);
			patientDemoDetailName2.setWidthPercentage(95f);
			patientDemoDetailName2.getDefaultCell().setBorder(
					Rectangle.NO_BORDER);

			

			document.add(patientDemoDetailName2);
			patientDemoDetailName2.flushContent();
	%>

	<c:set var="patientName" value="${indentSalePatientData}" />

	<c:set var="patientId" value="${indentSalePatientId}" />

	<c:set var="patientAddress" value="${indentSalePatientAddress}" />

	<c:set var="patientMobileNumber" value="${indentSalePatientNumber}" />

	<c:set var="patientSponserName" value="${indentSaleSponserName}" />

	<c:set var="patientDoctorName" value="${indentSaleDoctorName}" />

	<c:set var="billCategory" value="${billCategory}" />
	<%-- 	<%
		String =(String) session.getAttribute("");
	 %> --%>
	<c:forEach items="${indentData}" var="row" varStatus="count">

		<c:set var="vat5" value="${row.indentTaxVat5}" />

		<c:set var="vat55" value="${row.indentTaxVat55}" />

		<c:set var="vat12" value="${row.indentTaxVat12}" />

		<c:set var="vat0" value="${row.indentTaxVat0}" />

		<c:set var="indentSaleDocNo" value="${row.indentSalelId }" />

		<c:set var="saleDate" value="${row.indentSaleNarration }" />
		
		// Added By Annapurna
		<c:set var="cashDisc" value="${row.indentSaleCdAmt }" />

		<c:set var="indentNumber" value="${row.indentMaster.indentId }" />

		<c:set var="transationType" value="${row.indentMaster.indentStatus}" />

		<c:set var="less" value="${row.indentSaleLess}" />

		<c:set var="grossAmt" value="${row.indentSaleGrossAmt}" />

		<c:set var="amountReceive" value="${row.indentSaleAmountReceive}" />

		<c:set var="previousBalance" value="${row.indentSalePreviousBalance}" />

		<c:set var="surcharge" value="${row.indentSaleAdd}" />

		<c:set var="bankName" value="${row.indentSaleBankName}" />

		<c:set var="chequeNo" value="${row.indentSaleChequeNum}" />

		<c:set var="vat6" value="${row.indentTaxVat6}" />

		<c:set var="vat135" value="${row.indentTaxVat135}" />


		<%
			String billNumber = "";
					if (pageContext.getAttribute("indentSaleDocNo") == null) {
						billNumber = "";
					} else {

						billNumber = billNumber
								+ (String) pageContext.getAttribute(
										"indentSaleDocNo").toString();
					}

					String bankName = "";
					if (pageContext.getAttribute("bankName") == null) {
						bankName = "";
					} else {

						bankName = bankName
								+ (String) pageContext.getAttribute("bankName")
										.toString();
					}

					String chequeNo = "";
					if (pageContext.getAttribute("chequeNo") == null) {
						chequeNo = "";
					} else {

						chequeNo = chequeNo
								+ (String) pageContext.getAttribute("chequeNo")
										.toString();
					}

					String patientName = "";
					if (pageContext.getAttribute("patientName") == null) {
						patientName = "";
					} else {

						patientName = patientName
								+ (String) pageContext.getAttribute(
										"patientName").toString();
					}

					String transationType = "";
					if (pageContext.getAttribute("transationType") == null) {
						transationType = "";
					} else {

						transationType = transationType
								+ (String) pageContext.getAttribute(
										"transationType").toString();
					}

					String patientId = "";
					if (pageContext.getAttribute("patientId") == null) {
						patientId = "";
					} else {

						patientId = patientId
								+ (String) pageContext
										.getAttribute("patientId").toString();
					}

					String patientAddress = "";
					if (pageContext.getAttribute("patientAddress") == null) {
						patientAddress = "";
					} else {

						patientAddress = patientAddress
								+ (String) pageContext.getAttribute(
										"patientAddress").toString();
					}

					String patientMobileNumber = "";
					if (pageContext.getAttribute("patientMobileNumber") == null) {
						patientMobileNumber = "";
					} else {

						patientMobileNumber = patientMobileNumber
								+ (String) pageContext.getAttribute(
										"patientMobileNumber").toString();
					}

					String patientSponserName = "";
					if (pageContext.getAttribute("patientSponserName") == null) {
						patientSponserName = "";
					} else {

						patientSponserName = patientSponserName
								+ (String) pageContext.getAttribute(
										"patientSponserName").toString();
					}

					String patientDoctorName = "";
					if (pageContext.getAttribute("patientDoctorName") == null) {
						patientDoctorName = "";
					} else {

						patientDoctorName = patientDoctorName
								+ (String) pageContext.getAttribute(
										"patientDoctorName").toString();
					}

					String saleDate1 = "";
					String splitSaleDate[];
					String saleDate = "";

					if (pageContext.getAttribute("saleDate") == null) {
						saleDate1 = "";
						saleDate = "";
					} else {
						saleDate1 = saleDate1
								+ (String) pageContext.getAttribute("saleDate")
										.toString();
						splitSaleDate = saleDate1.split(" ");
						saleDate = splitSaleDate[0];
					}

					String indentNumber = "";
					if (pageContext.getAttribute("indentNumber") == null) {
						indentNumber = "";
					} else {
						indentNumber = indentNumber
								+ (String) pageContext.getAttribute(
										"indentNumber").toString();
					}

					String less = "";
					if (pageContext.getAttribute("less") == null) {
						less = "";
					} else {
						less = less
								+ (String) pageContext.getAttribute("less")
										.toString();
					}

					String grossAmt = "";
					if (pageContext.getAttribute("grossAmt") == null) {
						grossAmt = "";
					} else {
						grossAmt = grossAmt
								+ (String) pageContext.getAttribute("grossAmt")
										.toString();
					}

					String amountReceive = "";
					if (pageContext.getAttribute("amountReceive") == null) {
						amountReceive = "";
					} else {
						amountReceive = amountReceive
								+ (String) pageContext.getAttribute(
										"amountReceive").toString();
					}

					String previousBalance = "";
					if (pageContext.getAttribute("previousBalance") == null) {
						previousBalance = "";
					} else {
						previousBalance = previousBalance
								+ (String) pageContext.getAttribute(
										"previousBalance").toString();
					}

					String surcharge = "";
					if (pageContext.getAttribute("surcharge") == null) {
						surcharge = "";
					} else {
						surcharge = surcharge
								+ (String) pageContext
										.getAttribute("surcharge").toString();
					}

					String vat5 = "";
					if (pageContext.getAttribute("vat5") == null) {
						vat5 = "";
					} else {
						vat5 = vat5
								+ (String) pageContext.getAttribute("vat5")
										.toString();

						Float vat51 = Float.parseFloat(vat5);
						DecimalFormat df = new DecimalFormat("###.##");
						vat5 = df.format(vat51);
					}

					String vat6 = "";
					if (pageContext.getAttribute("vat6") == null) {
						vat6 = "";
					} else {
						vat6 = vat6
								+ (String) pageContext.getAttribute("vat6")
										.toString();

						Float vat61 = Float.parseFloat(vat6);
						DecimalFormat df = new DecimalFormat("###.##");
						vat6 = df.format(vat61);
					}

					String vat135 = "";
					if (pageContext.getAttribute("vat135") == null) {
						vat135 = "";
					} else {
						vat135 = vat135
								+ (String) pageContext.getAttribute("vat135")
										.toString();

						Float vat1351 = Float.parseFloat(vat135);
						DecimalFormat df = new DecimalFormat("###.##");
						vat135 = df.format(vat1351);
					}

					String vat55 = "";
					if (pageContext.getAttribute("vat55") == null) {
						vat55 = "";
					} else {
						vat55 = vat55
								+ (String) pageContext.getAttribute("vat55")
										.toString();

						Float vat515 = Float.parseFloat(vat55);
						DecimalFormat df = new DecimalFormat("###.##");
						vat55 = df.format(vat515);
					}

					String vat12 = "";
					if (pageContext.getAttribute("vat12") == null) {
						vat12 = "";
					} else {
						vat12 = vat12
								+ (String) pageContext.getAttribute("vat12")
										.toString();

						Float vat121 = Float.parseFloat(vat12);
						DecimalFormat df = new DecimalFormat("###.##");
						vat12 = df.format(vat121);
					}

					String vat0 = "";
					if (pageContext.getAttribute("vat0") == null) {
						vat0 = "";
					} else {
						vat0 = vat0
								+ (String) pageContext.getAttribute("vat0")
										.toString();

						Float vat01 = Float.parseFloat(vat0);
						DecimalFormat df = new DecimalFormat("###.##");
						vat0 = df.format(vat01);
					}

					String catName = "";

					if (pageContext.getAttribute("billCategory") == null) {
						catName = "";
					} else {

						catName = catName
								+ (String) pageContext.getAttribute(
										"billCategory").toString();
					}

					String totalVatAmt = "";
					/* Float vatZero = Float.parseFloat(vat0);
					Float vatFive = Float.parseFloat(vat5);
					Float vatFiveFive = Float.parseFloat(vat55);
					Float vatTwe = Float.parseFloat(vat12);
					Float vatSix = Float.parseFloat(vat6);
					Float vatThr = Float.parseFloat(vat135);

					Float result3 = vatZero + vatFive + vatTwe + vatFiveFive
							+ vatSix + vatThr; */
					//DecimalFormat df = new DecimalFormat("###.##");
					//totalVatAmt = df.format(result3); 

					PdfPTable HeaderTable3 = new PdfPTable(6);
					int[] headerwidth3 = { 18, 30, 20, 20, 20, 20 };
					HeaderTable3.setWidths(headerwidth3);
					HeaderTable3.setWidthPercentage(95f);
					HeaderTable3.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

		
					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell subcell = new PdfPCell(new Phrase("", subheader));
					subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
					subcell.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(subcell);
					//HeaderTable2.addCell(new Phrase(""+ReceiptNo,subheader));
					if (print.contains("off")) {
						HeaderTable2.addCell(new Phrase(
								"            "+transationType.toUpperCase()+"  Receipt (Indent)", subheader));
					}else{
						HeaderTable2.addCell(new Phrase(
								"            Indent Sale Receipt", subheader));
					}
					
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					PdfPTable HeaderTable4 = new PdfPTable(4);
					int[] headerwidth4 = { 25, 30, 20, 25 };
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

					PdfPCell cell0 = new PdfPCell(new Phrase("Patient Id",
							subheader));
					cell0.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell0);
					HeaderTable4.addCell(new Phrase(": "+patientId, tabletext));
					HeaderTable4.addCell(new Phrase("Invoice No ", subheader));
					HeaderTable4.addCell(new Phrase(": IS" + billNumber,
							tabletext));

					PdfPCell cell01 = new PdfPCell(new Phrase("Patient Name",
							subheader));
					cell01.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell01);
					HeaderTable4.addCell(new Phrase(": "+patientName, tabletext));
					HeaderTable4.addCell(new Phrase("Date", subheader));
					HeaderTable4.addCell(new Phrase(": "+saleDate, tabletext));

					PdfPCell cell00 = new PdfPCell(new Phrase("Address",
							subheader));
					cell00.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell00);
					HeaderTable4.addCell(new Phrase(": "+patientAddress, tabletext));
					PdfPCell cell02 = new PdfPCell(new Phrase("Type",
							subheader));
					cell02.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell02);
					HeaderTable4.addCell(new Phrase(": "+transationType, tabletext));

					HeaderTable4.addCell(new Phrase("Consultant Name",
							subheader));
					HeaderTable4.addCell(new Phrase(": "+patientDoctorName,
							tabletext));

					PdfPCell cell023 = new PdfPCell(new Phrase("Sponsor Name",
							subheader));
					cell023.setBorder(Rectangle.NO_BORDER);

					if (!patientSponserName.equals("")) {
						HeaderTable4.addCell(cell023);
						HeaderTable4
								.addCell(new Phrase(": "+ catName, tabletext));
					} else {
						HeaderTable4.addCell(new Phrase("", subheader));
						HeaderTable4.addCell(new Phrase("", subheader));
					}
					//patientSponserName
					PdfPCell cell02331 = new PdfPCell(new Phrase("", subheader));
					cell02331.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell02331);
					HeaderTable4.addCell(new Phrase("", tabletext));

					PdfPCell cell02341 = new PdfPCell(new Phrase("Bank Name",
							subheader));
					cell02341.setBorder(Rectangle.NO_BORDER);
					if (!bankName.equals("")) {
						HeaderTable4.addCell(cell02341);
						HeaderTable4.addCell(new Phrase(": "+bankName, tabletext));
					} else {
						HeaderTable4.addCell(new Phrase("", subheader));
						HeaderTable4.addCell(new Phrase("", subheader));
					}

					PdfPCell cell0233 = new PdfPCell(new Phrase("", subheader));
					cell0233.setBorder(Rectangle.NO_BORDER);
					HeaderTable4.addCell(cell0233);
					HeaderTable4.addCell(new Phrase("", tabletext));

					PdfPCell cell0234 = new PdfPCell(new Phrase("Cheque No",
							subheader));
					cell0234.setBorder(Rectangle.NO_BORDER);

					if (!chequeNo.equals("")) {
						HeaderTable4.addCell(cell0234);
						HeaderTable4.addCell(new Phrase(": "+chequeNo, tabletext));
					} else {
						HeaderTable4.addCell(new Phrase("", subheader));
						HeaderTable4.addCell(new Phrase("", subheader));
					}

					if (!patientSponserName.equals("")) {
						HeaderTable4.addCell(new Phrase("Bill category  ",
								subheader));
						HeaderTable4.addCell(new Phrase(": Sponsor ", tabletext)); //catName + patientSponserName
					} else {
						HeaderTable4.addCell(new Phrase("Bill category  ",
								subheader));
						HeaderTable4.addCell(new Phrase(": Self", tabletext));
					}

					HeaderTable4.addCell(new Phrase("", subheader));
					HeaderTable4.addCell(new Phrase("", subheader));

					document.add(HeaderTable4);
					HeaderTable4.flushContent();
		%>

		<%
			

					PdfPTable HeaderTable6 = new PdfPTable(12);
					int[] headerwidth6 = { 2, 10,8, 5, 5, 6, 6, 6, 6, 6, 6, 6 };
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
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));

					HeaderTable6.addCell(new Phrase("#", subheader));
					HeaderTable6.addCell(new Phrase("Product Name", subheader));
					HeaderTable6.addCell(new Phrase("Preparation", subheader));

					PdfPCell batchNumberCell = new PdfPCell(new Phrase(
							"Batch No", subheader));
					batchNumberCell.setHorizontalAlignment(Element.ALIGN_LEFT);
					batchNumberCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(batchNumberCell);

					PdfPCell cells = new PdfPCell(new Phrase("Expiry",
							subheader));
					cells.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells);

					PdfPCell vatcells = new PdfPCell(new Phrase("GST",
							subheader));
					vatcells.setHorizontalAlignment(Element.ALIGN_RIGHT);
					vatcells.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(vatcells);

					//HeaderTable6.addCell(new Phrase("Qty", subheader));
					PdfPCell qtycells = new PdfPCell(new Phrase("Qty",
							subheader));
					qtycells.setHorizontalAlignment(Element.ALIGN_RIGHT);
					qtycells.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(qtycells);
					/* HeaderTable6.addCell(new Phrase("", subheader)); */

					PdfPCell mrpCell = new PdfPCell(new Phrase("GST Amt",
							subheader));
					mrpCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					mrpCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(mrpCell);

					

					PdfPCell cells1 = new PdfPCell(new Phrase("MRP ("+currencyCode+")",
							subheader));
					cells1.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells1.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells1);


					PdfPCell discPerCell = new PdfPCell(new Phrase("Disc ",
							subheader));
					discPerCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
					discPerCell.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(discPerCell);

					PdfPCell discPerAmt = new PdfPCell(new Phrase(
							"Disc in("+currencyName+")", subheader));
					discPerAmt.setHorizontalAlignment(Element.ALIGN_RIGHT);
					discPerAmt.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(discPerAmt);

					PdfPCell cells2 = new PdfPCell(new Phrase("Total Amt",
							subheader));
					cells2.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells2.setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(cells2);

					document.add(HeaderTable6);
					HeaderTable6.flushContent();

					HeaderTable6.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					
					double totalDiscAmt = 0;
				
		%>
		<c:set var="total" value="${row.indentSaleNetAmt }" />

		<c:forEach items="${row.indentSaleSlaves}" var="vendor"
			varStatus="count">

			<c:set var="qty" value="${vendor.indentSaleSlaveQty }" />

			<c:set var="mrp" value="${vendor.indentSaleSlaveMrp }" />

			<c:set var="rate" value="${vendor.indentSaleSlaveRate }" />

			<c:set var="rateForPrint" value="${vendor.indentSlaveRatePerUnit}" />

			<c:set var="amt" value="${vendor.indentSaleSlaveAmt }" />

			<c:set var="batchCode" value="${vendor.indentSaleSlaveBatchCode }" />

			<c:set var="expiry" value="${vendor.indentSaleSlaveBatchExpiry }" />

			<c:set var="counter" value="${(count.index)+1}" />

			<c:set var="productName" value="${vendor.productMaster.productName}" />

			<c:set var="vat" value="${vendor.indentSlaveVat}" />

			<c:set var="vatAmt" value="${vendor.indentSlaveVatAmt}" />

			<!--  suraj code for display discount on print -->

			<c:set var="discPer" value="${vendor.indentSlaveDis}" />

			<c:set var="discAmt" value="${vendor.indentSlaveDisAmt}" />
			<c:set var="pre" value="${vendor.productMaster.productDesc}" />

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
							
							String pre="";
							if (pageContext.getAttribute("pre") != null)
								pre=pageContext.getAttribute("pre").toString();

							String mrp = "";
							if (pageContext.getAttribute("mrp") == null) {
								mrp = "";
							} else {
								mrp = mrp
										+ (String) pageContext.getAttribute("mrp")
												.toString();
							}

							String vat = "";
							if (pageContext.getAttribute("vat") == null) {
								vat = "";
							} else {
								vat = vat
										+ (String) pageContext.getAttribute("vat")
												.toString();
							}

							String rate = "";
							if (pageContext.getAttribute("rate") == null) {
								rate = "";
							} else {
								rate = rate
										+ (String) pageContext.getAttribute("rate")
												.toString();
							}

							String rateForPrint = "";
							if (pageContext.getAttribute("rateForPrint") == null) {
								rateForPrint = "";
							} else {
								rateForPrint = rateForPrint
										+ (String) pageContext.getAttribute(
												"rateForPrint").toString();
							}

							String amt = "";
							if (pageContext.getAttribute("amt") == null) {
								amt = "";
							} else {
								amt = amt
										+ (String) pageContext.getAttribute("amt")
												.toString();
							}

							String total = "";
							if (pageContext.getAttribute("total") == null) {
								total = "";
							} else {
								total = total
										+ (String) pageContext
												.getAttribute("total").toString();
							}

							String batchCode = "";
							if (pageContext.getAttribute("batchCode") == null) {
								batchCode = "";
							} else {
								batchCode = batchCode
										+ (String) pageContext.getAttribute(
												"batchCode").toString();
							}

							String expiry = "";
							if (pageContext.getAttribute("expiry") == null) {
								expiry = "";
							} else {
								expiry = expiry
										+ (String) pageContext.getAttribute(
												"expiry").toString();
							}

							String productName = "";
							if (pageContext.getAttribute("productName") == null) {
								productName = "";
							} else {
								productName = productName
										+ (String) pageContext.getAttribute(
												"productName").toString();
							}

							String vatAmt = "";
							if (pageContext.getAttribute("vatAmt") == null) {
								vatAmt = "";
							} else {
								vatAmt = vatAmt
										+ (String) pageContext.getAttribute(
												"vatAmt").toString();
							}

							String discPer = "";
							if (pageContext.getAttribute("discPer") == null) {
								discPer = "";
							} else {
								discPer = discPer
										+ (String) pageContext.getAttribute(
												"discPer").toString();
							}

							String discAmt = "";
							if (pageContext.getAttribute("discAmt") == null) {
								discAmt = "";
							} else {
								discAmt = discAmt
										+ (String) pageContext.getAttribute(
												"discAmt").toString();
							}
							
							totalDiscAmt = totalDiscAmt + Double.parseDouble(qty)*Double.parseDouble(rateForPrint)*Double.parseDouble(discPer)/100;

							//Calculating GST Amount
							Float gst = Float.parseFloat(vatAmt);
							Float result3 = 0f; 
							result3= result3 + gst;
							
							DecimalFormat df = new DecimalFormat("###.##");
							totalVatAmt = df.format(result3); 
							totGst+=Double.parseDouble(totalVatAmt);

							HeaderTable6.addCell(new Phrase(counter, tabletext));
							HeaderTable6
									.addCell(new Phrase(productName, tabletext));
							
							PdfPCell productpre = new PdfPCell(new Phrase(
									pre, tabletext));
							productpre
									.setHorizontalAlignment(Element.ALIGN_LEFT);
							productpre.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(productpre);

							PdfPCell batchCodeCells = new PdfPCell(new Phrase(
									batchCode, tabletext));
							batchCodeCells
									.setHorizontalAlignment(Element.ALIGN_LEFT);
							batchCodeCells.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(batchCodeCells);

							PdfPCell cell3 = new PdfPCell(new Phrase(expiry,
									tabletext));
							cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell3.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell3);

							PdfPCell vcell = new PdfPCell(
									new Phrase(
											df99.format(Double.parseDouble(vat)),
											tabletext));
							vcell.setHorizontalAlignment(Element.ALIGN_RIGHT);
							vcell.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(vcell);

							// HeaderTable6.addCell(new Phrase(qty, tabletext));
							PdfPCell qcell = new PdfPCell(
									new Phrase(qty, tabletext));
							qcell.setHorizontalAlignment(Element.ALIGN_RIGHT);
							qcell.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(qcell);

							PdfPCell cell2 = new PdfPCell(new Phrase(
									df99.format(Double.parseDouble(vatAmt)),
									tabletext));
							cell2.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell2.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell2);

							PdfPCell cell4 = new PdfPCell(new Phrase(
									df99.format(Double.parseDouble(rateForPrint)),
									tabletext));
							cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell4.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell4);

							/*  suraj code for display Disc Amt*/

							PdfPCell discPerValue = new PdfPCell(new Phrase(
									df99.format(Double.parseDouble(discPer)),
									tabletext));
							discPerValue
									.setHorizontalAlignment(Element.ALIGN_RIGHT);
							discPerValue.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(discPerValue);

							PdfPCell discPerAmtCell = new PdfPCell(new Phrase(
									df99.format(Double.parseDouble(qty)*Double.parseDouble(rateForPrint)*Double.parseDouble(discPer)/100),
									tabletext));
							discPerAmtCell
									.setHorizontalAlignment(Element.ALIGN_RIGHT);
							discPerAmtCell.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(discPerAmtCell);

							PdfPCell cell5 = new PdfPCell(
									new Phrase(
											df99.format(Double.parseDouble(amt)),
											tabletext));
							cell5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cell5.setBorder(Rectangle.NO_BORDER);
							HeaderTable6.addCell(cell5);

							document.add(HeaderTable6);
							HeaderTable6.flushContent();
			%>
		</c:forEach>

		<%
			HeaderTable6.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));
					HeaderTable6.addCell(new Phrase("", tabletext));

					String total = ""
							+ (String) pageContext.getAttribute("total")
									.toString();

					String totalAmount = "";
					Float vat1 = Float.parseFloat(total);
					DecimalFormat df2 = new DecimalFormat("###.##");
					totalAmount = df2.format(vat1);

					String totalVat = totalVatAmt;

					String total1 = "";
					if (pageContext.getAttribute("grossAmt") == null) {
						total1 = "";
					} else {
						total1 = total1
								+ (String) pageContext.getAttribute("grossAmt")
										.toString();

						Float total2 = Float.parseFloat(total1);
						Float vatValue = Float.parseFloat(totGst+"");
						Float result2 = total2 - vatValue;

						DecimalFormat df1 = new DecimalFormat("###.##");
						total1 = df1.format(result2);

					}

					double conDouble = Double.parseDouble(total);

					long word = (long) conDouble;

					document.add(HeaderTable6);
					HeaderTable6.flushContent();

					document.add(HeaderTable6);
					HeaderTable6.flushContent();

					
					PdfPTable HeaderTable7 = new PdfPTable(7);
					int[] headerwidth7 = { 40, 20, 12, 5, 12, 30, 12 };
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
					HeaderTable7.addCell(new Phrase("", subheader));

					
					HeaderTable7.addCell(new Phrase("", subheader));

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					PdfPCell cells31 = new PdfPCell(new Phrase(
							"Total Amt(w/o GST) =", subheader));
					cells31.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells31.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells31);

					PdfPCell cells32 = new PdfPCell(new Phrase(
							df99.format(Double.parseDouble(total1)), subheader));
					cells32.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells32.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells32);

					/* if (Double.parseDouble(vat12) != 0.0
							|| Double.parseDouble(vat55) != 0.0
							|| Double.parseDouble(vat5) != 0.0)
						HeaderTable7.addCell(new Phrase("", subheader));
					else */
					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					PdfPCell cells33 = new PdfPCell(new Phrase("CGST Amt =",
							subheader));
					cells33.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells33.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells33);

					PdfPCell cells34 = new PdfPCell(new Phrase(
							df99.format(totGst/2),
							subheader));
					cells34.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells34.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells34);
					
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					PdfPCell cells331 = new PdfPCell(new Phrase("SGST Amt =",
							subheader));
					cells331.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells331.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells331);

					PdfPCell cells341 = new PdfPCell(new Phrase(
							df99.format(totGst/2),
							subheader));
					cells341.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells341.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells341);

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					
					//  
                    String cashDisc="";
							if (pageContext.getAttribute("cashDisc") == null) {
								cashDisc = "0.0";
							} else {
								cashDisc = cashDisc
										+ (String) pageContext.getAttribute(
												"cashDisc").toString();
							}
				double	cashDisc1 = Double.valueOf(cashDisc);
			System.out.println("uhj"+cashDisc);
					PdfPCell cell99 = new PdfPCell(new Phrase("C.Discount =",
							subheader));
					cell99.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cell99.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cell99);
					PdfPCell cell991 = new PdfPCell(new Phrase(df99.format(cashDisc1),subheader));
					
					cell991.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cell991.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cell991);
					
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					
					//
					

					
					PdfPCell cells445 = new PdfPCell(new Phrase("Discount =",
							subheader));
					cells445.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells445.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells445);
					//PdfPCell cells344 = new PdfPCell(new Phrase(df99.format(Double.parseDouble(less)),subheader));
					PdfPCell cells344 = new PdfPCell(new Phrase(df99.format(totalDiscAmt),subheader));
					
					cells344.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells344.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells344);
					
					if (print.contains("on")) {
						

						/* HeaderTable7.addCell(new Phrase(
								"Amount Receive   =  "
										+ df99.format(Double
												.parseDouble(amountReceive)),
								subheader)); */
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", subheader));
						HeaderTable7.addCell(new Phrase("", subheader));
						HeaderTable7.addCell(new Phrase("", subheader));

						PdfPCell cells44 = new PdfPCell(new Phrase(
								"Surcharge =", subheader));
						cells44.setHorizontalAlignment(Element.ALIGN_RIGHT);
						cells44.setBorder(Rectangle.NO_BORDER);
						HeaderTable7.addCell(cells44);

						PdfPCell cells3412 = new PdfPCell(new Phrase(
								df99.format(Double.parseDouble(surcharge)),
								subheader));
						cells3412.setHorizontalAlignment(Element.ALIGN_RIGHT);
						cells3412.setBorder(Rectangle.NO_BORDER);
						HeaderTable7.addCell(cells3412);

						/* HeaderTable7.addCell(new Phrase("Previous Balance =  "
								+ df99.format(Double
										.parseDouble(previousBalance)),
								subheader)); */
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", subheader));
						HeaderTable7.addCell(new Phrase("", subheader));
						HeaderTable7.addCell(new Phrase("", subheader));
					}else{

						
						HeaderTable7.addCell(new Phrase(""
								,
								subheader));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", subheader));
						HeaderTable7.addCell(new Phrase("", subheader));
						HeaderTable7.addCell(new Phrase("", subheader));
					}
					PdfPCell cells45 = new PdfPCell(new Phrase("Net Amount =",
							subheader));
					cells45.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells45.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells45);

					PdfPCell cells37 = new PdfPCell(new Phrase(
							df99.format(Double.parseDouble(totalAmount)),
							subheader));
					cells37.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells37.setBorder(Rectangle.NO_BORDER);
					HeaderTable7.addCell(cells37);

					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", tabletext));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));

					document.add(HeaderTable7);
					HeaderTable7.flushContent();
		%>
		<%
		if(tmpFlag==0){
			PdfPTable HeaderTable14 = new PdfPTable(2);
					int[] headerwidth15 = { 60, 20 };
					HeaderTable14.setWidths(headerwidth15);
					HeaderTable14.setWidthPercentage(95f);
					HeaderTable14.getDefaultCell().setBorder(Rectangle.BOTTOM);

					int[] headerwidth16 = { 60, 20 };
					HeaderTable14.setWidths(headerwidth16);
					HeaderTable14.addCell(new Phrase("", tabletext));
					HeaderTable14.addCell(new Phrase("", tabletext));

					document.add(HeaderTable14);
					HeaderTable14.flushContent();

					PdfPTable HeaderTable12 = new PdfPTable(3);
					int[] headerwidth12 = { 10, 16, 40 };
					HeaderTable12.setWidths(headerwidth12);
					HeaderTable12.setWidthPercentage(95f);
					HeaderTable12.getDefaultCell().setBorder(Rectangle.BOTTOM);

					int[] headerwidth13 = { 30, 50, 20 };
					HeaderTable12.setWidths(headerwidth13);
					if(print.contains("on")){
						HeaderTable12.addCell(new Phrase(
								"Received with thanks from :", subheader));
						HeaderTable12.addCell(new Phrase(patientName, tabletext));
						HeaderTable12.addCell(new Phrase("", tabletext));
					}
					HeaderTable12.addCell(new Phrase("Amount in "+currencyName+" =",
							subheader));
					HeaderTable12.addCell(new Phrase(EnglishNumberToWords
							.convert(word).toUpperCase() + " "+currencyName+" only",
							tabletext));
					HeaderTable12.addCell(new Phrase("", tabletext));
					document.add(HeaderTable12);
					HeaderTable12.flushContent();

					PdfPTable HeaderTable5 = new PdfPTable(2);
					int[] headerwidth5 = { 15, 90 };
					HeaderTable5.setWidths(headerwidth5);
					HeaderTable5.setWidthPercentage(95f);
					HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

					int[] headerwidth = { 35, 65};
					HeaderTable5.setWidths(headerwidth);
					HeaderTable5.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(new Phrase("DRUG LICENSE NO-  ",
							tabletext));
					HeaderTable5.addCell(new Phrase("20-528466 / 21-528467", tabletext));
					document.add(HeaderTable5);
					HeaderTable5.flushContent();

					int[] headerwidth25 = { 35, 65};
					HeaderTable5.setWidths(headerwidth25);
					HeaderTable5.addCell(new Phrase("FOOD LICENSE NO-  ",
							tabletext));
					//HeaderTable5.addCell(new Phrase(foodLicenseNo, tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					document.add(HeaderTable5);
					HeaderTable5.flushContent();

					int[] headerwidth24 = { 35, 65};
					HeaderTable5.setWidths(headerwidth24);
					HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
					
						HeaderTable5.addCell(new Phrase(
								"GST NO-                     ", tabletext));
					//	HeaderTable5.addCell(new Phrase(GStNo, tabletext));
					HeaderTable5.addCell(new Phrase(" ", tabletext));
					
					document.add(HeaderTable5);
					HeaderTable5.flushContent();
		}

					PdfPTable HeaderTable10 = new PdfPTable(3);
					int[] headerwidth10 = { 10, 50, 30 };
					HeaderTable10.setWidths(headerwidth10);
					HeaderTable10.setWidthPercentage(95f);
					HeaderTable10.setHorizontalAlignment(Element.ALIGN_CENTER);
					
					if(tmpFlag==1){
					
					HeaderTable10.getDefaultCell().setBorder(Rectangle.TOP);
					HeaderTable10.setWidths(headerwidth10);
					HeaderTable10.addCell(new Phrase("Amount in "+currencyName+"=",
							subheader));
					HeaderTable10.addCell(new Phrase(EnglishNumberToWords
							.convert(word) + " "+currencyName+" only",
							subheader));
					HeaderTable10.addCell(new Phrase("", tabletext));
					document.add(HeaderTable10);
					HeaderTable10.flushContent();
					
					HeaderTable10.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable10.setWidths(headerwidth10);
					HeaderTable10.addCell(new Phrase("", tabletext));
					HeaderTable10.addCell(new Phrase("", tabletext));
					HeaderTable10.addCell(new Phrase("", tabletext));
					document.add(HeaderTable10);
					HeaderTable10.flushContent();
					
					}
					HeaderTable10.getDefaultCell().setBorder(
							Rectangle.NO_BORDER);

					int[] headerwidth11 = { 1, 30, 10 };
					HeaderTable10.setWidths(headerwidth11);
					HeaderTable10.setHorizontalAlignment(Element.ALIGN_LEFT);

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10
							.addCell(new Phrase("Please get your medicines checked by doctor before use.",
									subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					document.add(HeaderTable10);
					HeaderTable10.flushContent();

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					PdfPCell cell110 = new PdfPCell(new Phrase(
							"Sign of Pharmacis", subheader));
					cell110.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell110.setBorder(Rectangle.NO_BORDER);
					HeaderTable10.addCell(cell110);
					//HeaderTable10.addCell(new Phrase("Authorized By",subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					PdfPCell cell11 = new PdfPCell(new Phrase(user_name,
							tabletext));
					cell11.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell11.setBorder(Rectangle.NO_BORDER);
					HeaderTable10.addCell(cell11);

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));
					HeaderTable10.addCell(new Phrase("", subheader));

					document.add(HeaderTable10);
					HeaderTable10.flushContent();

					if (print.contains("on")) {
						PdfPTable HeaderTable51 = new PdfPTable(2);
						int[] headerwidth61 = { 15, 90 };
						HeaderTable51.setWidths(headerwidth61);
						HeaderTable51.setWidthPercentage(95f);
						HeaderTable51.getDefaultCell().setBorder(
								Rectangle.BOTTOM);

						int[] headerwidth14 = { 0, 80 };
						HeaderTable51.setWidths(headerwidth14);
						HeaderTable51.getDefaultCell().setBorder(
								Rectangle.NO_BORDER);
						HeaderTable51.addCell(new Phrase("", tabletext));
						HeaderTable51
								.addCell(new Phrase(
										"I/we hereby certify that my/our registration certificate under the Maharashtra Value Added Tax Act 2002 is in force",
										tabletext));

						document.add(HeaderTable51);
						HeaderTable51.flushContent();

						int[] headerwidth28 = { 0, 80 };

						HeaderTable51.setWidths(headerwidth28);
						HeaderTable51.addCell(new Phrase("", tabletext));
						HeaderTable51
								.addCell(new Phrase(
										"on the date on which the sale of goods specified in this Tax Invoice is made but me/us and that the transaction of the",
										tabletext));

						document.add(HeaderTable51);
						HeaderTable51.flushContent();

						int[] headerwidth29 = { 0, 80 };

						HeaderTable51.setWidths(headerwidth29);
						HeaderTable51.addCell(new Phrase("", tabletext));
						HeaderTable51
								.addCell(new Phrase(
										"sales covered by this Tax Invoice has been effected by me/us and shall be accounted for in the turnover of sales while",
										tabletext));

						document.add(HeaderTable51);
						HeaderTable51.flushContent();

						int[] headerwidth27 = { 0, 80 };

						HeaderTable51.setWidths(headerwidth27);
						HeaderTable51.addCell(new Phrase("", tabletext));
						HeaderTable51
								.addCell(new Phrase(
										"filling of return and the due tax, if any payable on the sale has been paid or shall be paid.",
										tabletext));

						document.add(HeaderTable51);
						HeaderTable51.flushContent();
					}
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