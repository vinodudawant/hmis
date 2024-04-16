<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="java.util.ResourceBundle"%>
<%-- <%@page import="com.hms.admin.util.FetchHospitalDetails"%> --%>
<%@page import="org.json.JSONObject"%>
<%@page import="org.json.JSONArray"%>
<%@page import="com.itextpdf.text.html.WebColors"%>
<%@page import="com.hms.pharmacy.pojo.CounterSaleMaster"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.awt.Color"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.HashMap"%>
<%@page import="com.hms.administrator.dto.HospitalDetailsDTO"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.pharmacy.controller.CounterSaleController"%>
<%@ page import="com.hms.pharmacy.dao.EhatEnterpriseUtil"%>
<%@ page import="com.hms.utility.ApplicationContextUtils"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@ page import="com.hms.ehat.dto.CurrencyTypeDto"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

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
    <%
    double discTotal=0.0;
    double gstVal=0.0;
    DecimalFormat df22 = new DecimalFormat("0.00");
    	//For on off flow Added By Bilal
    	ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String ShradhhaFlag = (String) resourceBundleEha.getObject("ShradhhaFlag").toString();	
      			ResourceBundle resourceBundleEhat = ResourceBundle
				.getBundle("Ehat");
		 String print = (String) resourceBundleEhat
				.getString("pharmacyPrint");

		ResourceBundle resourceBundlepharmacy = ResourceBundle
				.getBundle("pharmacy");
		/*	String drugLicenseNo = (String) resourceBundlepharmacy
				.getString("drugLicenseNo");
		
		String drugLicenseNo1 = (String) resourceBundlepharmacy
				.getString("drugLicenseNo1");
		
		String GStNo1 = (String) resourceBundlepharmacy
				.getString("GStNo");
		
		String foodlicenseNo = (String) resourceBundlepharmacy
				.getString("foodlicenseNo");

		String patientTransType = "";
		if (pageContext.getAttribute("patientTransType") == null) {
			patientTransType = "";
		} else {

			patientTransType = patientTransType
					+ (String) pageContext.getAttribute("patientTransType")
							.toString();
		}
 */
		try {
			response.setContentType("application/pdf");
			CurrencyTypeService fetchOneCurrency=(ApplicationContextUtils.getApplicationContext()).getBean(CurrencyTypeService.class);
        	List<CurrencyTypeDto> listServiceCurrencyDto=fetchOneCurrency.getOneCurrencyList();
        	String currencyCode=listServiceCurrencyDto.get(0).getCurrencyCode();
        	String currencyName=listServiceCurrencyDto.get(0).getCurrencyName();
        	
        	HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			int hospitalUnitId = (Integer) session.getAttribute("uId");
			//List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);
			
			// start				
				String MedicalName =  hospObj.getMedicalName();//resourceBundleEhat.getString("hospitalName");
				String MedicalAddress = hospObj.getMedicalAddress();//resourceBundleEhat.getString("address");
				String MedicalZipcode = hospObj.getMedicalZipCode();
				String MedicalDrugLicenseNo = hospObj.getDruglicense(); //(String) resourceBundleEhat.getString("drugLicenseNo");
				String MedicalDrugLicenseNo1 = hospObj.getDrugLicense1(); //(String) resourceBundleEhat.getString("drugLicenseNo1");
				String MedicalPhoneNo =  hospObj.getMedicalContact();//resourceBundleEhat.getString("PhoneNo");
				String MedicalEmail =hospObj.getMedicalEmail(); // resourceBundleEhat.getString("email");
				String GSTIN = hospObj.getMedicalGstNo();//resourceBundleEhat.getString("GSTIN");
				
				
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
			
			response.setHeader("Content-Disposition", "inline; filename = Credit Note");

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
			String MedicalAddress1 = resourceBundleEhat.getString("address");

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
				address = "J.L.N.C.H. Building,Idgah Hills, Bhopal Ph.: 2666374, 2665720";
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
				p.add(new Chunk(" " + hospitalName, bold));

				if (tmpFlag == 0) {
				 p.add(new Chunk(" \n\n" + address + "," + city
							+ " Pin- " + hospitalZip, tabletext));
					p.add(new Chunk(" \nPhone No. " + hPhoneNo, tabletext)); 
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
					if(ShradhhaFlag.equalsIgnoreCase("ON"))
					{
					img.scaleAbsolute(100, 50);
					cell = new PdfPCell();
					cell.addElement(new Chunk(img, 35, -25));
					}else
					{
						img.scaleAbsolute(80, 60);
						cell = new PdfPCell();
						cell.addElement(new Chunk(img, 5, -5));
					}
					cell.setBorder(Rectangle.NO_BORDER);
				} catch (Exception e) {
					e.printStackTrace();
				}

				Image imgNabh = null;
				PdfPCell cellNabh = null;
				try {
					imgNabh = Image.getInstance(nabhLogo);
					if(ShradhhaFlag.equalsIgnoreCase("ON"))
				{
					imgNabh.scaleAbsolute(100, 50);
					cellNabh = new PdfPCell();
					cellNabh.addElement(new Chunk(imgNabh, 35, -25));
				}else
				{
					imgNabh.scaleAbsolute(80, 60);
					cellNabh = new PdfPCell();
					cellNabh.addElement(new Chunk(imgNabh, 5, -5));
				}
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
					 p.add(new Chunk(" \n" + city + " Pin- " + hospitalZip,
							tabletext));
					p.add(new Chunk(" \nPhone No. " + hPhoneNo, tabletext));
					p.add(new Chunk(" \n " + webste + " email: " + email,
							tabletext));
					p.add(new Chunk(" \nCIN: " + cinNo, tabletext));
					p.add(new Chunk(" \nService Tax: " + serviceTaxNo
							+ ", PAN No: " + panNo, tabletext)); 
				}

				PdfPCell hospitalNameCell = new PdfPCell(p);
				hospitalNameCell
						.setHorizontalAlignment(Element.ALIGN_CENTER);
				hospitalNameCell.setBorder(Rectangle.NO_BORDER);
				HeaderTable1.addCell(hospitalNameCell);

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
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				document.add(HeaderTable1);
				HeaderTable1.flushContent();
			}

    		PdfPTable HeaderTable2 = new PdfPTable(5);
    		int[] headerwidth2 = { 18, 20, 40, 25, 10 };
    		HeaderTable2.setWidths(headerwidth2);
    		HeaderTable2.setWidthPercentage(95f);
    		HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

    		String billName = "";
    		//String drugLicenseNo = "";
    		//String foodLicenseNo = "";
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
    			if (object.get("moduleName").equals("creditNote")) {
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

    <c:forEach items="${creditNoteData}" var="row" varStatus="count">

      <c:set var="billId" value="${row.creditNoteId }" />

        <c:set var="billNumber" value="${row.creditNoteDocNo }" />

        <c:set var="saleDate" value="${row.patientAddress }" />

        <c:set var="patientName" value="${row.patientName }" />

        <c:set var="patientMobile" value="${row.patientPhone}" />

        <c:set var="less" value="${row.creditNoteLess}" />

        <c:set var="grossAmt" value="${row.creditNoteGrossAmt}" />

        <c:set var="surcharge" value="${row.creditNoteAdd}" />

        <c:set var="patientAddress" value="${row.creditNoteDiscount}" />

         <c:set var="vat5" value="${row.creditTaxVat5}" />

         <c:set var="vat55" value="${row.creditTaxVat55}" />

          <c:set var="vat6" value="${row.creditTaxVat6}" />

           <c:set var="vat135" value="${row.creditTaxVat135}" />

        <c:set var="vat12" value="${row.creditTaxVat12}" />

        <c:set var="vat0" value="${row.creditTaxVat0}" />

        <c:set var="word" value="${row.creditNoteNetAmt}" />

        <c:set var="amtPayble" value="${row.creditNotePayable}" />

        <c:set var="prevBalance" value="${row.creditNotePrevBal}" />
        
         <c:set var="creditNoteSaleId" value="${row.creditNotePatientSaleId}" />

        <c:set var="count" value="${row.creditNoteCounterSaleId}" />

        <%-- <c:set var="doctor" value="${row.doctorName }" /> --%>
        
         <c:set var="CreditNoteType" value="${row.creditNoteTransactionType}" />
        <%
        String creditNoteType = "";
        if (pageContext.getAttribute("CreditNoteType") != null) {
        	creditNoteType = pageContext.getAttribute("CreditNoteType")+"";
        }
        
        String creditNoteSaleId = "";
        if (pageContext.getAttribute("creditNoteSaleId") != null) {
        	creditNoteSaleId = pageContext.getAttribute("creditNoteSaleId")+"";
        }
        
        String count = "";
        if (pageContext.getAttribute("count") != null) {
        	count = pageContext.getAttribute("count")+"";
        }
        
            String billNumber = "";
                    if (pageContext.getAttribute("billNumber") == null) {
                        billNumber = "";
                    } else {

                        billNumber = billNumber
                                + (String) pageContext.getAttribute(
                                        "billNumber").toString();
                    }

                    String saleDate1 = "";
                    String splitSaleDate[];
                    String saleDate = "";

                    if (pageContext.getAttribute("saleDate").toString() == null) {
                        saleDate1 = "";
                        saleDate = "";
                    } else {
                        saleDate1 = saleDate1
                                + (String) pageContext.getAttribute("saleDate")
                                        .toString();
                        splitSaleDate = saleDate1.split(" ");
                        saleDate = splitSaleDate[0];
                    }



                    String billId = "";
                    if (pageContext.getAttribute("billId") == null) {
                        billId = "";
                    } else {

                        billId = billId
                                + (String) pageContext.getAttribute(
                                        "billId").toString();
                    }
                    String patientName = "";
                    if (pageContext.getAttribute("patientName") == null) {
                        patientName = "";
                    } else {
                        patientName = patientName
                                + (String) pageContext.getAttribute(
                                        "patientName").toString();
                    }
                String patientMobile = "";
                    if (pageContext.getAttribute("patientMobile") == null) {
                        patientMobile = "";
                    } else {
                        patientMobile = patientMobile
                                + (String) pageContext.getAttribute(
                                        "patientMobile").toString();
                    }

                    String less = "";
                    if (pageContext.getAttribute("less") == null) {
                        less = "";
                    } else {
                        less = less
                                + (String) pageContext.getAttribute("less")
                                        .toString();
                    }


                    String surcharge = "";
                    if (pageContext.getAttribute("surcharge") == null) {
                        surcharge = "";
                    } else {
                        surcharge = surcharge
                                + (String) pageContext
                                        .getAttribute("surcharge").toString();
                    }


                    String patientAddress = "";
                    if (pageContext.getAttribute("patientAddress") == null) {
                        patientAddress = "";
                    } else {
                        patientAddress = patientAddress
                                + (String) pageContext.getAttribute(
                                        "patientAddress").toString();
                    }



                    String prevBalance = "";
                    if (pageContext.getAttribute("prevBalance") == null) {
                        prevBalance = "";
                    } else {
                        prevBalance = prevBalance
                                + (String) pageContext.getAttribute(
                                        "prevBalance").toString();
                    }

                    String amtPayble = "";
                    if (pageContext.getAttribute("amtPayble") == null) {
                        amtPayble = "";
                    } else {
                        amtPayble = amtPayble
                                + (String) pageContext.getAttribute(
                                        "amtPayble").toString();
                    }

                    /* String doctor = "";
                    if(pageContext.getAttribute("doctor")
                            .toString()==null)
                    {
                        doctor = "";
                    }
                    else
                    {
                        doctor = doctor+(String) pageContext.getAttribute("doctor")
                                .toString();;
                    } */

                    PdfPTable HeaderTable3 = new PdfPTable(6);
                    int[] headerwidth3 = { 20, 45, 5, 5, 10, 10 };
                    HeaderTable3.setWidths(headerwidth3);
                    HeaderTable3.setWidthPercentage(95f);
                    HeaderTable3.getDefaultCell()
                            .setBorder(Rectangle.NO_BORDER);

                  

                    HeaderTable2.addCell(new Phrase("", subheader));
                    HeaderTable2.addCell(new Phrase("", subheader));


                    BaseColor myColor = WebColors.getRGBColor("#00a0d6");
                    PdfPCell text = new PdfPCell(new Phrase(""+billName,
                    subheader));
                    text.setHorizontalAlignment(Element.ALIGN_CENTER);
                    //text.setBackgroundColor(myColor);
                    text.setBorder(Rectangle.NO_BORDER);
                    HeaderTable2.addCell(text);
                    /* HeaderTable2.addCell(new Phrase("", subheader)); */
                    HeaderTable2.addCell(new Phrase("", subheader));
                    HeaderTable2.addCell(new Phrase("", subheader));

                    document.add(HeaderTable2);
                    HeaderTable2.flushContent();

                    HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
                    HeaderTable2.addCell(new Phrase(" ", subheader));
                    HeaderTable2.addCell(new Phrase("", subheader));
                    
                    PdfPCell subcell1 ;
                    if(Integer.parseInt(count)==1){
                    	subcell1= new PdfPCell(new Phrase("SALE RETURN CASH ",
                                subheader));
                    }else if(Integer.parseInt(count)==2){
                    	 subcell1 = new PdfPCell(new Phrase("SALE RETURN OPD CASH  ",
                                subheader));
                    }else{
                    	 subcell1 = new PdfPCell(new Phrase("SALE RETURN CREDIT  ",
                                subheader));
                    }
                    
                    
                    
                    
                    subcell1.setHorizontalAlignment(Element.ALIGN_LEFT);
                    subcell1.setBorder(Rectangle.BOTTOM);
                    HeaderTable2.addCell(subcell1);

                    HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);

                    HeaderTable2
                            .addCell(new Phrase("", subheader));
                    PdfPCell subcell = new PdfPCell(new Phrase("",
                            subheader));
                    subcell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    subcell.setBorder(Rectangle.BOTTOM);
                    HeaderTable2.addCell(subcell);
                   
                    
                    HeaderTable2.addCell(new Phrase());
                    HeaderTable2.addCell(new Phrase("", subheader));
                    document.add(HeaderTable2);
                    HeaderTable2.flushContent();

                    PdfPTable HeaderTable4 = new PdfPTable(4);
                    int[] headerwidth4 = { 25, 35,25,20};
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

                    HeaderTable4
                            .addCell(new Phrase("Patient Name ", subheader));
                    HeaderTable4.addCell(new Phrase(": "+patientName, tabletext));


                    PdfPCell cell0 = new PdfPCell(new Phrase("Credit Note No ",
                            subheader));
                    cell0.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    cell0.setBorder(Rectangle.NO_BORDER);
                    HeaderTable4.addCell(cell0);

                    HeaderTable4.addCell(new Phrase(": "+billId, tabletext));
                    document.add(HeaderTable4);
                    HeaderTable4.flushContent();

                   
                    HeaderTable4
                    .addCell(new Phrase("Address ", subheader));
            HeaderTable4.addCell(new Phrase(": "+patientAddress, tabletext));


            PdfPCell cell01 = new PdfPCell(new Phrase("Date ",
                    subheader));
            cell01.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cell01.setBorder(Rectangle.NO_BORDER);
            HeaderTable4.addCell(cell01);

            HeaderTable4.addCell(new Phrase(": "+saleDate, tabletext));
            document.add(HeaderTable4);
            HeaderTable4.flushContent();
    
          


            
            HeaderTable4.addCell(new Phrase("", subheader));
            HeaderTable4.addCell(new Phrase("", subheader));
            if(Integer.parseInt(count)==1){
            	 PdfPCell cell011 = new PdfPCell(new Phrase("Patient Sale Id ",
                         subheader));
                 cell011.setHorizontalAlignment(Element.ALIGN_RIGHT);
                 cell011.setBorder(Rectangle.NO_BORDER);
                 HeaderTable4.addCell(cell011);
                /* HeaderTable4
                .addCell(new Phrase("Patient Sale Id :", subheader)); */
                }
            else if(Integer.parseInt(count)==2){
            	 PdfPCell cell011 = new PdfPCell(new Phrase("Counter Sale Id ",
                         subheader));
                 cell011.setHorizontalAlignment(Element.ALIGN_RIGHT);
                 cell011.setBorder(Rectangle.NO_BORDER);
                 HeaderTable4.addCell(cell011);
                  /*   HeaderTable4
                    .addCell(new Phrase("Counter Sale Id :", subheader)); */
                    }
            else  {
            	 PdfPCell cell011 = new PdfPCell(new Phrase("Indent Sale Id ",
                         subheader));
                 cell011.setHorizontalAlignment(Element.ALIGN_RIGHT);
                 cell011.setBorder(Rectangle.NO_BORDER);
                 HeaderTable4.addCell(cell011);
                  /*   HeaderTable4
                    .addCell(new Phrase("Indent Id :", subheader)); */
                    }
            HeaderTable4.addCell(new Phrase(": "+creditNoteSaleId, tabletext));
         //   HeaderTable4.addCell(new Phrase("", subheader));

            
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
          
                    PdfPTable HeaderTable6 = new PdfPTable(10);
                    int[] headerwidth6 ={3,10,8,7,6,6,6,6,8,8};
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

                    HeaderTable6.addCell(new Phrase("#", subheader));
                    HeaderTable6.addCell(new Phrase("Product Name", subheader));


                    PdfPCell batchNumberCell = new PdfPCell(new Phrase(
                            "Batch Number", subheader));
                    batchNumberCell
                            .setHorizontalAlignment(Element.ALIGN_LEFT);
                    batchNumberCell.setBorder(Rectangle.BOTTOM);
                    HeaderTable6.addCell(batchNumberCell);

                    PdfPCell cells = new PdfPCell(new Phrase("Expiry",
                            subheader));
                    cells.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    cells.setBorder(Rectangle.BOTTOM);
                    HeaderTable6.addCell(cells);


                    PdfPCell vatcells = new PdfPCell(new Phrase("GST%",
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

                /*     PdfPCell mrpCell = new PdfPCell(new Phrase("MRP (INR)",
                            subheader));
                    mrpCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    mrpCell.setBorder(Rectangle.BOTTOM);
                    HeaderTable6.addCell(mrpCell); */

                    PdfPCell vcellsm = new PdfPCell(new Phrase("GST Amt",
                            subheader));
                    vcellsm.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    vcellsm.setBorder(Rectangle.BOTTOM);
                    HeaderTable6.addCell(vcellsm);


                    PdfPCell cells1 = new PdfPCell(new Phrase("MRP ("+currencyCode+")",
                            subheader));
                    cells1.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    cells1.setBorder(Rectangle.BOTTOM);
                    HeaderTable6.addCell(cells1);

                    PdfPCell discCells = new PdfPCell(new Phrase("Discount ("+currencyCode+")",
                            subheader));
                    discCells.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    discCells.setBorder(Rectangle.BOTTOM);
                    HeaderTable6.addCell(discCells);

                    /* HeaderTable6.addCell(new Phrase(" ",
                            subheader)); */

                    PdfPCell cells2 = new PdfPCell(new Phrase("Total Amt",
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
                    HeaderTable6.addCell(new Phrase("", tabletext));
                    HeaderTable6.addCell(new Phrase("", tabletext));
        %>
        <c:set var="total" value="${row.creditNoteNetAmt }" />

        <c:forEach items="${row.creditNoteSlaves}" var="vendor"
            varStatus="count">

            <c:set var="qty" value="${vendor.creditSlaveQty }" />

            <c:set var="mrp" value="${vendor.creditNoteSlaveMrp }" />

            <c:set var="rate" value="${vendor.creditNoteSlaveRate }" />

            <c:set var="amt" value="${vendor.creditNoteSlaveAmt }" />

            <c:set var="batchCode" value="${vendor.creditNoteSlaveBatchCode }" />

            <c:set var="expiry" value="${vendor.creditNoteSlaveBatchExpiry }" />

            <c:set var="counter" value="${(count.index)+1}" />

            <c:set var="productName" value="${vendor.productMaster.productName}" />

            <c:set var="vat" value="${vendor.creditSlaveVat}" />

            <c:set var="vatAmt" value="${vendor.creditSlaveVatAmt}" />

            <c:set var="discAmt" value="${vendor.creditNoteSlaveDiscAmt}" />

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

                            /* String amt = ""
                                    + (String) pageContext.getAttribute("amt")
                                            .toString(); */

                            String total = "";
                            if (pageContext.getAttribute("total") == null) {
                                total = "";
                            } else {
                                total = total
                                        + (String) pageContext
                                                .getAttribute("total").toString();
                            }

                            /* String total = ""
                                    + (String) pageContext.getAttribute("total")
                                            .toString(); */

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

                            String productName = "";
                            if (pageContext.getAttribute("productName") == null) {
                                productName = "";
                            } else {
                                productName = productName
                                        + (String) pageContext.getAttribute(
                                                "productName").toString();
                            }


                            String vat = "";
                            if(pageContext.getAttribute("vat").toString()==null)
                                {
                                vat = "";
                               }
                                else
                                  {
                                vat = vat+(String) pageContext.getAttribute("vat")
                                    .toString();
                                  }



                            String vatAmt = "";
                            if (pageContext.getAttribute("vatAmt") == null) {
                                vatAmt = "";
                            } else {
                                vatAmt = vatAmt
                                        + (String) pageContext.getAttribute("vatAmt")
                                                .toString();
                            }

                            Double discAmt = 0.00;
                            if (pageContext.getAttribute("discAmt") == null) {
                                discAmt = 0.00;
                            } else {
                                discAmt = Double.parseDouble(pageContext.getAttribute("discAmt").toString());
                                discAmt=Double.parseDouble(rate) * Double.parseDouble(qty) * discAmt/100;
                                discTotal+=discAmt;
                            }
                            /* String productName = "" discAmt
                                    + (String) pageContext.getAttribute(
                                            "productName").toString(); */

                            /* afterVentilation
                                    .addCell(new Phrase(counter, subheader));
                            afterVentilation.addCell(new Phrase(qty, subheader));
                            afterVentilation.addCell(new Phrase(mrp, subheader));
                            afterVentilation.addCell(new Phrase(batchCode,
                                    subheader));
                            afterVentilation.addCell(new Phrase(expiry, subheader));
                            afterVentilation.addCell(new Phrase(rate, subheader));
                            afterVentilation.addCell(new Phrase(amt, subheader)); */

                            HeaderTable6.addCell(new Phrase(counter, tabletext));
                            HeaderTable6
                                    .addCell(new Phrase(productName, tabletext));

                            /* HeaderTable6.addCell(new Phrase(, tabletext)); */
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

                            PdfPCell pvat = new PdfPCell(new Phrase(df22.format(Double.parseDouble(vat)),
                                    tabletext));
                            pvat.setHorizontalAlignment(Element.ALIGN_RIGHT);
                            pvat.setBorder(Rectangle.NO_BORDER);
                            HeaderTable6.addCell(pvat);

                            //HeaderTable6.addCell(new Phrase(qty, tabletext));

                            PdfPCell qtycell = new PdfPCell(new Phrase(qty,
                                    tabletext));
                            qtycell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                            qtycell.setBorder(Rectangle.NO_BORDER);
                            HeaderTable6.addCell(qtycell);

                        /*     PdfPCell cell2 = new PdfPCell(
                                    new Phrase(mrp, tabletext));
                            cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
                            cell2.setBorder(Rectangle.NO_BORDER);
                            HeaderTable6.addCell(cell2); */
                            
                            gstVal+=Double.parseDouble(vatAmt);

                            PdfPCell cell9 = new PdfPCell(new Phrase(df22.format(Double.parseDouble(vatAmt)),
                                    tabletext));
                            cell9.setHorizontalAlignment(Element.ALIGN_RIGHT);
                            cell9.setBorder(Rectangle.NO_BORDER);
                            HeaderTable6.addCell(cell9);


                            PdfPCell cell4 = new PdfPCell(new Phrase(df22.format(Double.parseDouble(rate)),
                                    tabletext));
                            cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
                            cell4.setBorder(Rectangle.NO_BORDER);
                            HeaderTable6.addCell(cell4);

                            PdfPCell cell41 = new PdfPCell(new Phrase(df22.format(discAmt),
                                    tabletext));
                            cell41.setHorizontalAlignment(Element.ALIGN_RIGHT);
                            cell41.setBorder(Rectangle.NO_BORDER);
                            HeaderTable6.addCell(cell41);

                            PdfPCell cell5 = new PdfPCell(
                                    new Phrase(df22.format(Double.parseDouble(amt)), tabletext));
                            cell5.setHorizontalAlignment(Element.ALIGN_RIGHT);
                            cell5.setBorder(Rectangle.NO_BORDER);
                            HeaderTable6.addCell(cell5);



                            document.add(HeaderTable6);
                            HeaderTable6.flushContent();

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


                    String vat5 = "";
                    if (pageContext.getAttribute("vat5") == null) {
                        vat5 = "";
                    } else {
                        vat5 = vat5
                                + (String) pageContext
                                        .getAttribute("vat5").toString();

                        Float vat51 =Float.parseFloat(vat5);
                        DecimalFormat df = new DecimalFormat("###.##");
                        vat5 = df.format(vat51);
                    }

                    String vat55 = "";
                    if (pageContext.getAttribute("vat55") == null) {
                        vat55 = "";
                    } else {
                        vat55 = vat55
                                + (String) pageContext
                                        .getAttribute("vat55").toString();

                        Float vat515 =Float.parseFloat(vat55);
                        DecimalFormat df = new DecimalFormat("###.##");
                        vat55 = df.format(vat515);
                    }

                    String vat6 = "";
                    if (pageContext.getAttribute("vat6") == null) {
                        vat6 = "";
                    } else {
                        vat6 = vat6
                                + (String) pageContext
                                        .getAttribute("vat6").toString();

                        Float vat06 =Float.parseFloat(vat6);
                        DecimalFormat df = new DecimalFormat("###.##");
                        vat6 = df.format(vat06);
                    }

                    String vat135 = "";
                    if (pageContext.getAttribute("vat135") == null) {
                        vat135 = "";
                    } else {
                        vat135 = vat135
                                + (String) pageContext
                                        .getAttribute("vat135").toString();

                        Float vat0135 =Float.parseFloat(vat135);
                        DecimalFormat df = new DecimalFormat("###.##");
                        vat135 = df.format(vat0135);
                    }

                    String vat12 = "";
                    if (pageContext.getAttribute("vat12") == null) {
                        vat12 = "";
                    } else {
                        vat12 = vat12
                                + (String) pageContext
                                        .getAttribute("vat12").toString();

                        Float vat121 =Float.parseFloat(vat12);
                        DecimalFormat df = new DecimalFormat("###.##");
                        vat12 = df.format(vat121);
                    }


                    String vat0 = "";
                    if (pageContext.getAttribute("vat0") == null) {
                        vat0 = "";
                    } else {
                        vat0 = vat0
                                + (String) pageContext
                                        .getAttribute("vat0").toString();

                        Float vat01 =Float.parseFloat(vat0);
                        DecimalFormat df = new DecimalFormat("###.##");
                        vat0 = df.format(vat01);
                    }


                    String total = ""
                            + (String) pageContext.getAttribute("total")
                                    .toString();

                    String totalVatAmt = "";
                    Float vatZero =Float.parseFloat(vat0);
                    Float vatFive=Float.parseFloat(vat5);
                    Float vatFiveFive=Float.parseFloat(vat55);
                    Float vatTwe=Float.parseFloat(vat12);
                    Float vatSix=Float.parseFloat(vat6);
                    Float vatThr=Float.parseFloat(vat135);


                    Float result3=vatZero+vatFive+vatTwe+vatFiveFive+vatSix+vatThr;
                    DecimalFormat df = new DecimalFormat("###.##");
                    totalVatAmt = df.format(result3);


                    String totalVat = totalVatAmt;

                    document.add(HeaderTable6);
                    HeaderTable6.flushContent();


                    String total1 = "";
                    if (pageContext.getAttribute("grossAmt") == null) {
                        total1 = "";
                    } else {
                        total1 = total1
                                + (String) pageContext.getAttribute("grossAmt")
                                        .toString();

                        Float total2 = Float.parseFloat(total1);
                        Float vatValue = Float.parseFloat(totalVat);
                        Float result2= total2-vatValue;

                        DecimalFormat df1 = new DecimalFormat("###.##");
                            total1 = df1.format(result2);
                    }



                    String word1 = ""
                            + (String) pageContext.getAttribute("word")
                                    .toString();

                    double conDouble=Double.parseDouble(word1);

                    long word=Math.round(conDouble);

                   /*  HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
                    HeaderTable1.addCell(new Phrase("            ", header));
                    HeaderTable1.addCell(new Phrase("            ", header));
                    document.add(HeaderTable1);
                    HeaderTable1.flushContent(); */


                    PdfPTable HeaderTable7 = new PdfPTable(5);
                    int[] headerwidth7 = {25,10,35,20,16};
                    HeaderTable7.setWidths(headerwidth7);
                    HeaderTable7.setWidthPercentage(95f);
                    HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);



                    if(Double.parseDouble(vat5)!=0.0){
                    HeaderTable7.addCell(new Phrase("", subheader));
                    PdfPCell netpdf23 = new PdfPCell(new Phrase("",subheader));
                    netpdf23.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    netpdf23.setBorder(Rectangle.NO_BORDER);
                    HeaderTable7.addCell(netpdf23);
                    //HeaderTable7.addCell(new Phrase(df22.format(Double.parseDouble(vat5)), subheader));
                    }else if(Double.parseDouble(vat55)!=0.0 || Double.parseDouble(vat12)!=0.0){
                    HeaderTable7.addCell(new Phrase("", subheader));
                    PdfPCell netpdf23 = new PdfPCell(new Phrase("",subheader));
                    netpdf23.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    netpdf23.setBorder(Rectangle.NO_BORDER);
                    HeaderTable7.addCell(netpdf23);
                    //HeaderTable7.addCell(new Phrase(df22.format(Double.parseDouble(vat55)), subheader));
                    }else{
                        HeaderTable7.addCell(new Phrase("", subheader));
                        PdfPCell netpdf23 = new PdfPCell(new Phrase("",subheader));
                        netpdf23.setHorizontalAlignment(Element.ALIGN_RIGHT);
                        netpdf23.setBorder(Rectangle.NO_BORDER);
                        HeaderTable7.addCell(netpdf23);
                        //HeaderTable7.addCell(new Phrase(df22.format(Double.parseDouble(vat6)), subheader));
                    }

                    HeaderTable7.addCell(new Phrase("", subheader));


                    PdfPCell grossAmtpdf = new PdfPCell(new Phrase("Gross Amount =",
                            subheader));
                    grossAmtpdf.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    grossAmtpdf.setBorder(Rectangle.NO_BORDER);
                    HeaderTable7.addCell(grossAmtpdf);

                    PdfPCell grossAmtpdf1 = new PdfPCell(new Phrase(df22.format(Double.parseDouble(total1)),
                            subheader));
                    grossAmtpdf1.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    grossAmtpdf1.setBorder(Rectangle.NO_BORDER);
                    HeaderTable7.addCell(grossAmtpdf1);



                    if(Double.parseDouble(vat12)!=0.0 || Double.parseDouble(vat55)!=0.0 || Double.parseDouble(vat5)!=0.0){
                        HeaderTable7.addCell(new Phrase("", subheader));
                        PdfPCell netpdf22 = new PdfPCell(new Phrase("",subheader));
                        netpdf22.setHorizontalAlignment(Element.ALIGN_RIGHT);
                        netpdf22.setBorder(Rectangle.NO_BORDER);
                        HeaderTable7.addCell(netpdf22);
                        //HeaderTable7.addCell(new Phrase(df22.format(Double.parseDouble(vat12)), subheader));
                    }else{
                        HeaderTable7.addCell(new Phrase("", subheader));
                        PdfPCell netpdf22 = new PdfPCell(new Phrase("",subheader));
                        netpdf22.setHorizontalAlignment(Element.ALIGN_RIGHT);
                        netpdf22.setBorder(Rectangle.NO_BORDER);
                        HeaderTable7.addCell(netpdf22);
                    //    HeaderTable7.addCell(new Phrase(df22.format(Double.parseDouble(vat135)), subheader));
                    }

                    HeaderTable7.addCell(new Phrase("", subheader));
                    PdfPCell lesspdf = new PdfPCell(new Phrase("Total GST =",
                            subheader));
                    lesspdf.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    lesspdf.setBorder(Rectangle.NO_BORDER);
                    HeaderTable7.addCell(lesspdf);

                    PdfPCell lesspdf1 = new PdfPCell(new Phrase(df22.format(gstVal),
                            subheader));
                    lesspdf1.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    lesspdf1.setBorder(Rectangle.NO_BORDER);
                    HeaderTable7.addCell(lesspdf1);

               

                    HeaderTable7.addCell(new Phrase("", subheader));

                    PdfPCell netpdf21 = new PdfPCell(new Phrase("",subheader));
                    netpdf21.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    netpdf21.setBorder(Rectangle.NO_BORDER);
                    HeaderTable7.addCell(netpdf21);
                    //HeaderTable7.addCell(new Phrase(df22.format(Double.parseDouble(vat0)), subheader));
                    HeaderTable7.addCell(new Phrase("", subheader));
                    PdfPCell surchargepdf;
                    if(print.contains("on")){
                    	  surchargepdf = new PdfPCell(new Phrase("Less =",
                                 subheader));
                    }else{
                    	  surchargepdf = new PdfPCell(new Phrase("Discount =",
                                 subheader));
                    }
                   
                    surchargepdf.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    surchargepdf.setBorder(Rectangle.NO_BORDER);
                    HeaderTable7.addCell(surchargepdf);

                    PdfPCell surchargepdf1 = new PdfPCell(new Phrase(df22.format(discTotal),
                            subheader));
                    surchargepdf1.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    surchargepdf1.setBorder(Rectangle.NO_BORDER);
                    HeaderTable7.addCell(surchargepdf1);

                    if(print.contains("on")){
                    	
		                   
		                    /* HeaderTable7.addCell(new Phrase("Prev Balance  =", subheader));
		
		                    PdfPCell netpdf20 = new PdfPCell(new Phrase(df22.format(Double.parseDouble(prevBalance)),subheader));
		                    netpdf20.setHorizontalAlignment(Element.ALIGN_RIGHT);
		                    netpdf20.setBorder(Rectangle.NO_BORDER);
		                    HeaderTable7.addCell(netpdf20); */
		                    
		                    HeaderTable7.addCell(new Phrase("", subheader));
		                    HeaderTable7.addCell(new Phrase("", subheader));
		                    
		                    HeaderTable7.addCell(new Phrase("", subheader));
		
		
		                    PdfPCell cells33 = new PdfPCell(new Phrase("Surcharge =",
		                            subheader));
		                    cells33.setHorizontalAlignment(Element.ALIGN_RIGHT);
		                    cells33.setBorder(Rectangle.NO_BORDER);
		                    HeaderTable7.addCell(cells33);
		
		                    PdfPCell cells34 = new PdfPCell(new Phrase(df22.format(Double.parseDouble(surcharge)),
		                            subheader));
		                    cells34.setHorizontalAlignment(Element.ALIGN_RIGHT);
		                    cells34.setBorder(Rectangle.NO_BORDER);
		                    HeaderTable7.addCell(cells34);
		
		                    /* HeaderTable7.addCell(new Phrase("Amt Payable   =", subheader));
		
		                    PdfPCell netpdf19 = new PdfPCell(new Phrase(df22.format(Math.round(Double.parseDouble(amtPayble))),subheader));
		                    netpdf19.setHorizontalAlignment(Element.ALIGN_RIGHT);
		                    netpdf19.setBorder(Rectangle.NO_BORDER);
		                    HeaderTable7.addCell(netpdf19); */
		                    HeaderTable7.addCell(new Phrase("", subheader));
		                    HeaderTable7.addCell(new Phrase("", subheader));
		                    HeaderTable7.addCell(new Phrase("", subheader));
                    }else{
                    	HeaderTable7.addCell(new Phrase("", subheader));
                		
	                    PdfPCell netpdf19 = new PdfPCell(new Phrase("",subheader));
	                    netpdf19.setHorizontalAlignment(Element.ALIGN_RIGHT);
	                    netpdf19.setBorder(Rectangle.NO_BORDER);
	                    HeaderTable7.addCell(netpdf19);
	                    HeaderTable7.addCell(new Phrase("", subheader));
                    }
                    

                    PdfPCell netpdf = new PdfPCell(new Phrase("Net Amount =",
                            subheader));
                    netpdf.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    netpdf.setBorder(Rectangle.NO_BORDER);
                    HeaderTable7.addCell(netpdf);

                    PdfPCell netpdf1 = new PdfPCell(new Phrase(df22.format(Math.round(Double.parseDouble(total))),
                            subheader));
                    netpdf1.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    netpdf1.setBorder(Rectangle.NO_BORDER);
                    HeaderTable7.addCell(netpdf1);
                    
                    
                    double creditNetAmt = Double.parseDouble(total);
                    double prevAmt1 = Double.parseDouble(prevBalance);
                    double amtPayble1 = Double.parseDouble(amtPayble); 
                    
                    System.err.println("1-----------------"+creditNetAmt);
                    System.err.println("2-----------------"+prevAmt1);
                    System.err.println("3-----------------"+amtPayble1);
                    
                    //HeaderTable7.addCell(new Phrase("Current Balance  =", subheader));
            		
                    /* PdfPCell netpdf25 = new PdfPCell(new Phrase(df22.format((prevAmt1 + amtPayble1) - (creditNetAmt)),subheader));
                    netpdf25.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    netpdf25.setBorder(Rectangle.NO_BORDER);
                    HeaderTable7.addCell(netpdf25); */
                    
                    HeaderTable7.addCell(new Phrase("", subheader));
                    HeaderTable7.addCell(new Phrase("", subheader));
                    HeaderTable7.addCell(new Phrase("", subheader));


                    PdfPCell cells33 = new PdfPCell(new Phrase("",
                            subheader));
                    cells33.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    cells33.setBorder(Rectangle.NO_BORDER);
                    HeaderTable7.addCell(cells33);

                    PdfPCell cells34 = new PdfPCell(new Phrase("",
                            subheader));
                    cells34.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    cells34.setBorder(Rectangle.NO_BORDER);
                    HeaderTable7.addCell(cells34);

                    document.add(HeaderTable7);
                    HeaderTable7.flushContent();

                   
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
                    HeaderTable5.addCell(new Phrase("Authorized Signatory",
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
 --%>
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
          HeaderTable12.getDefaultCell().setBorder(
                  Rectangle.BOTTOM);

          int[] headerwidth13 = { 25, 30, 10 };
          HeaderTable12.setWidths(headerwidth13);
      	  if (print.contains("on")) {
 				HeaderTable12.addCell(new Phrase(
 						"Received with thanks from:", subheader));
 				HeaderTable12
 						.addCell(new Phrase(patientName, tabletext));
 				HeaderTable12.addCell(new Phrase("", tabletext));
 			}

 			HeaderTable12.addCell(new Phrase("Amount in "+currencyName+":",
 					subheader));
 			HeaderTable12.addCell(new Phrase(EnglishNumberToWords
 					.convert(word).toUpperCase() + " "+currencyName+" only",
 					tabletext));
 			HeaderTable12.addCell(new Phrase("", tabletext));

 			document.add(HeaderTable12);
 			HeaderTable12.flushContent();

 			PdfPTable HeaderTable5 = new PdfPTable(2);
 			int[] headerwidth5 = { 30, 70 };
 			HeaderTable5.setWidths(headerwidth5);
 			HeaderTable5.setWidthPercentage(95f);
 			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

 			int[] headerwidth = { 35, 50 };
 			HeaderTable5.setWidths(headerwidth);
 			HeaderTable5.getDefaultCell()
 					.setBorder(Rectangle.NO_BORDER);

 			HeaderTable5.addCell(new Phrase("DRUG LICENSE NO-  ",
 					tabletext));
 			HeaderTable5.addCell(new Phrase("" + drugLicenseNo,
 					tabletext));
 			document.add(HeaderTable5);
 			HeaderTable5.flushContent();

 			int[] headerwidth25 = { 35, 50 };
 			HeaderTable5.setWidths(headerwidth25);

 			HeaderTable5.addCell(new Phrase("FOOD LICENSE NO-  ",
 					tabletext));
 			HeaderTable5.addCell(new Phrase("" + MedicalDrugLicenseNo,
 					tabletext));
 			document.add(HeaderTable5);
 			HeaderTable5.flushContent();

 			int[] headerwidth24 = { 35, 50 };
 			HeaderTable5.setWidths(headerwidth24);
 			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

 			HeaderTable5.addCell(new Phrase(
 					"GST NO-                     ", tabletext));
 		//	HeaderTable5.addCell(new Phrase("" + GStNo, tabletext));

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
 				HeaderTable10.addCell(new Phrase("Amount in rupees:",
 	 					subheader));
 				HeaderTable10.addCell(new Phrase(EnglishNumberToWords
 	 					.convert(word).toUpperCase() + " Rupees only",
 	 					tabletext));
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

 			int[] headerwidth11 = { 17, 70, 30 };
 			HeaderTable10.setWidths(headerwidth11);
 			HeaderTable10.setHorizontalAlignment(Element.ALIGN_CENTER);

 			HeaderTable10.addCell(new Phrase("", subheader));
 			HeaderTable10
 					.addCell(new Phrase(
 							"Please get your medicines checked by doctor before use.",
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

 			document.add(HeaderTable10);
 			HeaderTable10.flushContent();

 			HeaderTable10.addCell(new Phrase("", subheader));
 			HeaderTable10.addCell(new Phrase("", subheader));
 			PdfPCell cell110 = new PdfPCell(new Phrase(
 					"Sign of Pharmacist", subheader));
 			cell110.setHorizontalAlignment(Element.ALIGN_CENTER);
 			cell110.setBorder(Rectangle.NO_BORDER);
 			HeaderTable10.addCell(cell110);

 			HeaderTable10.addCell(new Phrase("", subheader));
 			HeaderTable10.addCell(new Phrase("", subheader));
 			PdfPCell cell11 = new PdfPCell(new Phrase("" + user_name,
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

 				int[] headerwidth14 = { 10, 90 };
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

 				int[] headerwidth28 = { 10, 90 };

 				HeaderTable51.setWidths(headerwidth28);
 				HeaderTable51.addCell(new Phrase("", tabletext));
 				HeaderTable51
 						.addCell(new Phrase(
 								"on the date on which the sale of goods specified in this Tax Invoice is made but me/us and that the transaction of the",
 								tabletext));

 				document.add(HeaderTable51);
 				HeaderTable51.flushContent();

 				int[] headerwidth29 = { 10, 90 };

 				HeaderTable51.setWidths(headerwidth29);
 				HeaderTable51.addCell(new Phrase("", tabletext));
 				HeaderTable51
 						.addCell(new Phrase(
 								"sales covered by this Tax Invoice has been effected by me/us and shall be accounted for in the turnover of sales while",
 								tabletext));

 				document.add(HeaderTable51);
 				HeaderTable51.flushContent();

 				int[] headerwidth27 = { 10, 90 };

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