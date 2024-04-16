<%@page import="java.util.HashMap"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.lowagie.text.pdf.PdfCell"%>
<%@page import="com.itextpdf.text.html.WebColors"%>
<%@page import="com.hms.pharmacy.pojo.CounterSaleMaster"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.awt.Color"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@ page import="com.hms.ehat.dto.CurrencyTypeDto"%>
<%@ page import="com.hms.inventory.service.PurchaseOrderServiceM"%>
<%@ page import="com.hms.inventory.dto.PurchaseOrderItemSlaveDto"%>
<%@ page import="com.hms.inventory.dto.PurchaseOrderDto"%>
<%@page import="com.hms.inventory.dto.PartyMasterAddressInfoDto"%>
<%@page import="com.hms.inventory.dto.PartyMasterContactInfoDto"%>
<%@page import="com.hms.inventory.dto.PartyMasterGeneralInfoDto"%>
<%@page import="com.hms.inventory.dto.TermsAndConditionInfoDto"%>

<%@ page import="com.hms.pharmacy.controller.CounterSaleController"%>
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
		try {
		response.setContentType("application/pdf");
		CurrencyTypeService fetchOneCurrency=(ApplicationContextUtils.getApplicationContext()).getBean(CurrencyTypeService.class);
		List<CurrencyTypeDto> listServiceCurrencyDto=fetchOneCurrency.getOneCurrencyList();
		String currencyCode=listServiceCurrencyDto.get(0).getCurrencyCode();
		String currencyName=listServiceCurrencyDto.get(0).getCurrencyName();
		HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
		List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
		HospitalDetails hospObj = arrHospitalDetails.get(0);
		
		String venderContacNo="";
		String purOrderDate=request.getParameter("purOrderDate");

			/* 	String hospitalName = hospObj.getHospitalName();
		hospitalName = hospitalName.toUpperCase();
		String address = hospObj.getHospitalAddress();
		String city = hospObj.getHospitalCity();
		String contact = hospObj.getHospitalContact(); */

		ServletOutputStream outStream = response.getOutputStream();
		Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
		document.setMargins(20, 20, 20, 0);

		PdfWriter.getInstance(document, outStream);
		document.open();
		//font

		Font header = new Font(Font.FontFamily.HELVETICA, 13, Font.NORMAL);
		Font subheader = new Font(Font.FontFamily.HELVETICA, 8,
		Font.BOLD);
		Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader = new Font(Font.FontFamily.HELVETICA, 10,
		Font.BOLD);
		Font tabletext = new Font(Font.FontFamily.HELVETICA, 8,
		Font.NORMAL);
		Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
		
		
		
		String txtPurchaseOrderSupplierCode = request.getParameter("txtVendorCode");
		
		String vendorId = request.getParameter("purchaseOrderId");
		String OrderDocSeries =request.getParameter("txtPurchaseQuotationDocSeries");
		String txtPurchaseQuotationDeliveryDate = request.getParameter("txtPurchaseQuotationDeliveryDate");
		System.out.print(OrderDocSeries);
		 

			/* ***************************************************geting Image form database ******************************************/
		String path = hospObj.getFilePath();
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
		String gstno	  =   hospObj.getTxtGstNo();
		String nabhLogo = application.getRealPath(nabh);
		//String path1 = application.getRealPath(path);
		
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
			

		document.add(new Phrase("\n"));
		PdfPTable HeaderTable1 = new PdfPTable(2);
		int[] headerwidth1 = { 40, 40 };
		HeaderTable1.setWidths(headerwidth1);
		HeaderTable1.setWidthPercentage(95f);
		HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
		//HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		if (img == null) {
			HeaderTable1.addCell(new Phrase("", header));
		} else {
			HeaderTable1.addCell(cell);
		}

		// Table 1 : For hospital adress details start
		
			PdfPTable PurchaseQuotation = new PdfPTable(3);
			int[] headerwidth191 = { 30, 70, 30 };
			PurchaseQuotation.setWidths(headerwidth191);
			PurchaseQuotation.setWidthPercentage(95f);
			PurchaseQuotation.setHorizontalAlignment(Element.ALIGN_CENTER);
			PurchaseQuotation.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			PurchaseQuotation.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			PurchaseQuotation.addCell(new Phrase("", header));
			PurchaseQuotation.addCell(new Phrase("", header));
			PurchaseQuotation.addCell(new Phrase("", header));
			PurchaseQuotation.addCell(new Phrase("", header));
			PurchaseQuotation.addCell(new Phrase("", header));
			PurchaseQuotation.addCell(new Phrase("", header));
			PurchaseQuotation.addCell(new Phrase("", header));
			PurchaseQuotation.addCell(new Phrase("", header));
			PurchaseQuotation.addCell(new Phrase("", header));
			document.add(PurchaseQuotation);
			PurchaseQuotation.flushContent();

			if (img == null) {
		
		PurchaseQuotation.addCell(new Phrase("", header));
			} else {
		
		PurchaseQuotation.addCell(cell);
			}		 
		
			Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
			Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD);
			Phrase p = new Phrase();
			p.add(new Chunk(" "+hospitalName, bold));			
			p.add(new Chunk(" \n\n"+address, tabletext));			
			p.add(new Chunk(" \n"+city+" Pin- "+hospitalZip, tabletext));
			p.add(new Chunk(" \nPhone No. "+hPhoneNo, tabletext));	
			p.add(new Chunk(" \n "+webste+" email: "+email, tabletext));	
			p.add(new Chunk(" \nCIN: "+cinNo, tabletext));	
			p.add(new Chunk(" \nCIN: "+serviceTaxNo+", PAN No: "+panNo, tabletext));	
			
			PdfPCell hospitalNameCell = new PdfPCell(p);				
			hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
			PurchaseQuotation.addCell(hospitalNameCell);
			
			if (img == null) {
		
		PurchaseQuotation.addCell(new Phrase("", header));
			} else {
		if(cellNabh==null){
			PurchaseQuotation.addCell(new Phrase("", header));
		}else{
			PurchaseQuotation.addCell(cellNabh);
		}
		
			}
			
			PurchaseQuotation.addCell(new Phrase("", header));
			PurchaseQuotation.addCell(new Phrase("", header));
			PurchaseQuotation.addCell(new Phrase("", header));
			PurchaseQuotation.addCell(new Phrase("", header));
			PurchaseQuotation.addCell(new Phrase("", header));
			PurchaseQuotation.addCell(new Phrase("", header));
			
			document.add(PurchaseQuotation);
			PurchaseQuotation.flushContent();
			
			PurchaseQuotation.getDefaultCell().setBorder(Rectangle.BOTTOM);
			PurchaseQuotation.addCell(new Phrase("", header));
			PurchaseQuotation.addCell(new Phrase("", header));
			PurchaseQuotation.addCell(new Phrase("", header));
			document.add(PurchaseQuotation);
			PurchaseQuotation.flushContent();
			
			// this is header for Goods Receipt Note 
			
			PdfPTable HeaderTable45 = new PdfPTable(3);
		int[] headerwidth45 = {45,30,30};
		HeaderTable45.setWidths(headerwidth45);
		HeaderTable45.setWidthPercentage(96f);
		HeaderTable45.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable45.addCell(new Phrase("  "));
		HeaderTable45.addCell(new Phrase("Purchase Order" ,header));
		HeaderTable45.addCell(new Phrase("", subheader));
		
		document.add(HeaderTable45);
		HeaderTable45.flushContent();
			
			
			
			/*******************************************/	
			

		/* ******************************************Date and order no *******************************************************************/

		java.util.Calendar currentDate = java.util.Calendar
				.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		SimpleDateFormat formatter1 = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		String todays_date = formatter.format(currentDate.getTime());
		   Date date = new Date();  
		    
		PdfPTable HeaderTable46 = new PdfPTable(2);
		int[] headerwidth46 = {45,45};
		HeaderTable46.setWidths(headerwidth46);
		HeaderTable46.setWidthPercentage(96f);
		//HeaderTable46.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable46.addCell(new Phrase("Supplier  Order" , subheader));
		HeaderTable46.addCell(new Phrase("From", subheader));
		
		document.add(HeaderTable46);
		HeaderTable46.flushContent();;
		
		Integer pId=Integer.parseInt(vendorId);
		PurchaseOrderServiceM puservice=(ApplicationContextUtils.getApplicationContext()).getBean(PurchaseOrderServiceM.class);
		PurchaseOrderDto lstpurchaseobj=puservice.editPurchaseOrder(pId);
		

		//featch list for vender Details 

		
		
		/* **** **  item Party Master GeneralDetails Date:18 feb 2016 ** *******/
		
			// this is for grn no row 
			
			PdfPTable HeaderTable01 = new PdfPTable(3);
			int[] headerwidth012 = {23,22,45}; 
			HeaderTable01.setWidths(headerwidth012);
			HeaderTable01.setWidthPercentage(96f);
			HeaderTable01.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		      PdfPCell cell1 = new PdfPCell();
		      cell1.setBorder(Rectangle.LEFT );
		      PdfPTable nestedTable1 = new PdfPTable(2);
		      int[] hW = {20,10}; 
		      nestedTable1.setWidths(hW);
		      nestedTable1.setWidthPercentage(96f);
		      nestedTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable1.addCell(new Paragraph("  PO NO",subheader ));
		      nestedTable1.addCell(new Paragraph(": "+ vendorId,tabletext));
		      cell1.addElement(nestedTable1);
		      
		      
		      PdfPCell cell35 = new PdfPCell();
		      cell35.setBorder(Rectangle.NO_BORDER);
		      PdfPTable nestedTable25 = new PdfPTable(2);
		      int[] hW25 = {25,40}; 
		      nestedTable25.setWidths(hW25);
		      nestedTable25.setWidthPercentage(96f);
		      nestedTable25.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		     
		      nestedTable25.addCell(new Paragraph("",subheader));
		      nestedTable25.addCell(new Paragraph("",tabletext));
		      
		     // cell35.addElement(nestedTable25);
		      
		      PdfPCell cell2 = new PdfPCell();
		      cell2.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
		      PdfPTable nestedTable2 = new PdfPTable(2);
		      int[] hW1 = {44,80}; 
		      nestedTable2.setWidths(hW1);
		      nestedTable2.setWidthPercentage(96f);
		      nestedTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable2.addCell(new Paragraph("Name",subheader));
		      nestedTable2.addCell(new Paragraph(": "+ hospitalName,tabletext));
		      cell2.addElement(nestedTable2);
		      HeaderTable01.addCell(cell1);
		      HeaderTable01.addCell(cell35);
		      HeaderTable01.addCell(cell2);
		  	  document.add(HeaderTable01);
		  	  HeaderTable01.flushContent();
		  	
			///end of grn no row 
			
			
			// this is for grn  date row 
			PdfPTable HeaderTable012 = new PdfPTable(3);
			int[] headerwidth013 = {23,22,45}; 
			HeaderTable012.setWidths(headerwidth013);
			HeaderTable012.setWidthPercentage(96f);
			HeaderTable012.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		      PdfPCell cell3 = new PdfPCell();
		      cell3.setBorder(Rectangle.LEFT );
		      PdfPTable nestedTable3 = new PdfPTable(2);
		      int[] hW3 = {20,15}; 
		      nestedTable3.setWidths(hW3);
		      nestedTable3.setWidthPercentage(96f);
		      nestedTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable3.addCell(new Paragraph("  PO DATE",subheader));
		      nestedTable3.addCell(new Paragraph(": "+ lstpurchaseobj.getOrderDate(),tabletext));
		      cell3.addElement(nestedTable3);
		      
		      PdfPCell cell36 = new PdfPCell();
		      cell36.setBorder(Rectangle.NO_BORDER);
		      PdfPTable nestedTable26 = new PdfPTable(2);
		      int[] hW26 = {25,40}; 
		      nestedTable26.setWidths(hW26);
		      nestedTable26.setWidthPercentage(96f);
		      nestedTable26.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable26.addCell(new Paragraph("",subheader));
		      nestedTable26.addCell(new Paragraph(" ",tabletext));
		     // cell36.addElement(nestedTable26);
		      
		      PdfPCell cell4 = new PdfPCell();
		      cell4.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
		      PdfPTable nestedTable4 = new PdfPTable(2);
		      int[] hW4 = {44,80}; 
		      nestedTable4.setWidths(hW4);
		      nestedTable4.setWidthPercentage(96f);
		      nestedTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable4.addCell(new Paragraph("ADDRESS",subheader));
		      nestedTable4.addCell(new Paragraph(": "+address,tabletext));
		      cell4.addElement(nestedTable4);
		      HeaderTable012.addCell(cell3);
		      HeaderTable012.addCell(cell36);
		      HeaderTable012.addCell(cell4);
		  	  document.add(HeaderTable012);
		  	  HeaderTable012.flushContent();
			
		  	  ///end of grn date row 
			
			
			//this is for Vendor Bill NO row 
			PdfPTable HeaderTable151 = new PdfPTable(3);
			int[] headerwidth151 = {23,22,45}; 
			HeaderTable151.setWidths(headerwidth151);
			HeaderTable151.setWidthPercentage(96f);
			HeaderTable151.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		      PdfPCell cell311 = new PdfPCell();
		      cell311.setBorder(Rectangle.LEFT );
		      PdfPTable nestedTable311 = new PdfPTable(2);
		      int[] hW311 = {20,10}; 
		      nestedTable311.setWidths(hW311);
		      nestedTable311.setWidthPercentage(96f);
		      nestedTable311.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable311.addCell(new Paragraph("  Vendor Bill NO",subheader));
		      nestedTable311.addCell(new Paragraph(": "+"",tabletext));
		    //  cell311.addElement(nestedTable311);
		      
		      
		      PdfPCell cell312 = new PdfPCell();
		      cell312.setBorder(Rectangle.NO_BORDER);
		      PdfPTable nestedTable312 = new PdfPTable(2);
		      int[] hW261 = {25,40}; 
		      nestedTable312.setWidths(hW261);
		      nestedTable312.setWidthPercentage(96f);
		      nestedTable312.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable312.addCell(new Paragraph("Paymode",subheader));
		      nestedTable312.addCell(new Paragraph(": "+ "Credit",tabletext));
		    //  cell312.addElement(nestedTable312);
		      
		      PdfPCell cell411 = new PdfPCell();
		      cell411.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
		      PdfPTable nestedTable411 = new PdfPTable(2);
		      int[] hW41 = {44,80}; 
		      nestedTable411.setWidths(hW41);
		      nestedTable411.setWidthPercentage(96f);
		      nestedTable411.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable411.addCell(new Paragraph("GST NO",subheader));
		 	  nestedTable411.addCell(new Paragraph(": "+gstno,tabletext));
		      cell411.addElement(nestedTable411);
		      HeaderTable151.addCell(cell311);
		      HeaderTable151.addCell(cell312);
		      HeaderTable151.addCell(cell411);
		  	  document.add(HeaderTable151);
		  	  HeaderTable151.flushContent();
		
			// end of Vendor Bill NO row  	
		  	
			// this is for Vendor Bill Date row 
		  
			PdfPTable HeaderTable152 = new PdfPTable(3);
			int[] headerwidth152 = {23,22,45}; 
			HeaderTable152.setWidths(headerwidth152);
			HeaderTable152.setWidthPercentage(96f);
			HeaderTable152.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		      PdfPCell cell511 = new PdfPCell();
		      cell511.setBorder(Rectangle.LEFT );
		      PdfPTable nestedTable511 = new PdfPTable(2);
		      int[] hW511 = {40,30}; 
		      nestedTable511.setWidths(hW511);
		      nestedTable511.setWidthPercentage(96f);
		      nestedTable511.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable511.addCell(new Paragraph("  Vendor Bill Date",subheader));
		      nestedTable511.addCell(new Paragraph(": beddddd"+ tabletext));

		   //   cell511.addElement(nestedTable511);
		      
		      PdfPCell cell512 = new PdfPCell();
		      cell512.setBorder(Rectangle.NO_BORDER);
		      PdfPTable nestedTable512 = new PdfPTable(2);
		      int[] hW561 = {30,40}; 
		      nestedTable512.setWidths(hW561);
		      nestedTable512.setWidthPercentage(96f);
		      nestedTable512.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable512.addCell(new Paragraph("Credit Days ",subheader));
		      nestedTable512.addCell(new Paragraph(": "+ "-",tabletext));
		     // cell512.addElement(nestedTable512);
		      
		      PdfPCell cell611 = new PdfPCell();
		      cell611.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
		      PdfPTable nestedTable611 = new PdfPTable(2);
		      int[] hW61 = {44,80}; 
		      nestedTable611.setWidths(hW61);
		      nestedTable611.setWidthPercentage(96f);
		      nestedTable611.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable611.addCell(new Paragraph("PLACE OF DELIVERY",subheader));
		      nestedTable611.addCell(new Paragraph(": "+"MAHARASHTRA - 27	",tabletext));
		      cell611.addElement(nestedTable611);
		      HeaderTable152.addCell(cell511);
		      HeaderTable152.addCell(cell512);
		      HeaderTable152.addCell(cell611);
		  	  document.add(HeaderTable152);
		  	  HeaderTable152.flushContent();
		  	
			///end of Vendor Bill Date row 
			
			// this is for Delivery challan Number row 
			PdfPTable HeaderTable182 = new PdfPTable(3);
			int[] headerwidth182 = {23,22,45}; 
			HeaderTable182.setWidths(headerwidth182);
			HeaderTable182.setWidthPercentage(96f);
			HeaderTable182.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		      PdfPCell cell911 = new PdfPCell();
		      cell911.setBorder(Rectangle.LEFT );
		      PdfPTable nestedTable911 = new PdfPTable(2);
		      int[] hW911 = {20,10}; 
		      nestedTable911.setWidths(hW911);
		      nestedTable911.setWidthPercentage(96f);
		      nestedTable911.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable911.addCell(new Paragraph("  ",subheader));
		      nestedTable911.addCell(new Paragraph(": ",tabletext));

		    //  cell911.addElement(nestedTable911);
		      
		      PdfPCell cell212 = new PdfPCell();
		      cell212.setBorder(Rectangle.NO_BORDER);
		      PdfPTable nestedTable412 = new PdfPTable(2);
		      int[] hW861 = {25,40}; 
		      nestedTable412.setWidths(hW861);
		      nestedTable412.setWidthPercentage(96f);
		      nestedTable412.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable412.addCell(new Paragraph("",subheader));
		      nestedTable412.addCell(new Paragraph("",tabletext));
		      cell212.addElement(nestedTable412);
		      
		      PdfPCell cell811 = new PdfPCell();
		      cell811.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
		      PdfPTable nestedTable811 = new PdfPTable(2);
		      int[] hW612 = {44,80}; 
		      nestedTable811.setWidths(hW612);
		      nestedTable811.setWidthPercentage(96f);
		      nestedTable811.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable811.addCell(new Paragraph("",subheader));
		      nestedTable811.addCell(new Paragraph(" "+"",tabletext));
		      cell811.addElement(nestedTable811);
		      HeaderTable182.addCell(cell911);
		      HeaderTable182.addCell(cell212);
		      HeaderTable182.addCell(cell811);
		  	  document.add(HeaderTable182);
		  	  HeaderTable182.flushContent();
		  	  
		  	///end of  Delivery challan Number row 
		  	 
		  	//this is vender name row
			PdfPTable HeaderTable013 = new PdfPTable(2);
			int[] headerwidth014 = {45,45}; 
			HeaderTable013.setWidths(headerwidth014);
			HeaderTable013.setWidthPercentage(96f);
			HeaderTable013.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		      PdfPCell cell5 = new PdfPCell();
		      cell5.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
		      PdfPTable nestedTable5 = new PdfPTable(2);
		      int[] hW5 = {38,82}; 
		      nestedTable5.setWidths(hW5);
		      nestedTable5.setWidthPercentage(96f);
		      nestedTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable5.addCell(new Paragraph("SUPPLIERNAME",subheader));
		      nestedTable5.addCell(new Paragraph(": "+ lstpurchaseobj.getSupplierName(),tabletext));

		      cell5.addElement(nestedTable5);
		      PdfPCell cell6 = new PdfPCell();
		      cell6.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
		      PdfPTable nestedTable6 = new PdfPTable(2);
		      int[] hW6 = {44,80}; 
		      nestedTable6.setWidths(hW6);
		      nestedTable6.setWidthPercentage(96f);
		      nestedTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable6.addCell(new Paragraph("",subheader));
		      nestedTable6.addCell(new Paragraph("",tabletext));
		      cell6.addElement(nestedTable6);
		      HeaderTable013.addCell(cell5);
		      HeaderTable013.addCell(cell6);
		  	  document.add(HeaderTable013);
		  	  HeaderTable013.flushContent();
		  	
			///end of vender name row
		  	  
			
			// this is for vender address row 
			
			PdfPTable HeaderTable016 = new PdfPTable(2);
			int[] headerwidth018 = {45,45}; 
			HeaderTable016.setWidths(headerwidth018);
			HeaderTable016.setWidthPercentage(96f);
			HeaderTable016.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		      PdfPCell cell11 = new PdfPCell();
		      cell11.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
		      PdfPTable nestedTable11 = new PdfPTable(2);
		      int[] hW11 = {38,82}; 
		      nestedTable11.setWidths(hW11);
		      nestedTable11.setWidthPercentage(96f);
		      nestedTable11.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable11.addCell(new Paragraph("ADDRESS",subheader));
		      
		      String supplierStreet ="";
			  String supplierArea ="";
			  String supplierCity ="";
		      String supplierPin ="";
			  String supplierState ="";
		 
			  	if(lstpurchaseobj.getPartyMasterDtos().getPartyMasterAddressInfoDto()!=null){
		 	 for(PartyMasterAddressInfoDto partyMasterAddressInfoDto :lstpurchaseobj.getPartyMasterDtos().getPartyMasterAddressInfoDto()){
			 	supplierStreet =  partyMasterAddressInfoDto.getStreet();
				supplierArea =  partyMasterAddressInfoDto.getArea();
				supplierCity =  partyMasterAddressInfoDto.getCity();
				supplierPin =  partyMasterAddressInfoDto.getPin();
		     }
			  	}
		    //  nestedTable11.addCell(new Paragraph(": "+supplierStreet+",  "+supplierArea+",  "+supplierCity+" - "+supplierPin+",  "+lstpurchaseobj.getGrnSupplierState()+", "+ lstpurchaseobj.getGrnSupplierMobile()+", Vendor ID:"+lstpurchaseobj.getId(),tabletext));
		      
		    		     nestedTable11.addCell(new Paragraph(": "+lstpurchaseobj.getSupplierState()+","+lstpurchaseobj.getSupplierAddress() ,tabletext));

		      cell11.addElement(nestedTable11);
		      PdfPCell cell12 = new PdfPCell();
		      cell12.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
		      PdfPTable nestedTable12 = new PdfPTable(2);
		      int[] hW12 = {44,80}; 
		      nestedTable12.setWidths(hW12);
		      nestedTable12.setWidthPercentage(96f);
		      nestedTable12.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable12.addCell(new Paragraph("",subheader));
		      nestedTable12.addCell(new Paragraph("",tabletext));
		      cell12.addElement(nestedTable12);
		      HeaderTable016.addCell(cell11);
		      HeaderTable016.addCell(cell12);
		  	  document.add(HeaderTable016);
		  	  HeaderTable016.flushContent();
		  	  
			// end of vender address row 
			
			// this is for gst no row 
			
			int[] hW7 = {38,82}; 
			PdfPTable HeaderTable015 = new PdfPTable(2);
			int[] headerwidth016 = {45,45}; 
			HeaderTable015.setWidths(headerwidth016);
			HeaderTable015.setWidthPercentage(96f);
			HeaderTable015.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		      PdfPCell cell9 = new PdfPCell();
		      cell9.setBorder(Rectangle.LEFT | Rectangle.RIGHT );
		      PdfPTable nestedTable9 = new PdfPTable(2);
		      int[] hW9 = {38,82}; 
		      nestedTable9.setWidths(hW7);
		      nestedTable9.setWidthPercentage(96f);
		      nestedTable9.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable9.addCell(new Paragraph("GST NO",subheader));
		      
		     String pgstno=lstpurchaseobj.getPartGstNo();
		      if(pgstno==null){
			      nestedTable9.addCell(new Paragraph(":"+0 ,tabletext));

		      }else{
		      nestedTable9.addCell(new Paragraph(":"+lstpurchaseobj.getPartGstNo() ,tabletext));
		      }
		      cell9.addElement(nestedTable9);
		      PdfPCell cell10 = new PdfPCell();
		      cell10.setBorder(Rectangle.LEFT | Rectangle.RIGHT );
		      PdfPTable nestedTable10 = new PdfPTable(2);
		      int[] hW10 = {44,80}; 
		      nestedTable10.setWidths(hW10);
		      nestedTable10.setWidthPercentage(96f);
		      nestedTable10.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable10.addCell(new Paragraph("",subheader));
		      nestedTable10.addCell(new Paragraph(" ",tabletext));
		      cell10.addElement(nestedTable10);
		      HeaderTable015.addCell(cell9);
		      HeaderTable015.addCell(cell10);
		  	  document.add(HeaderTable015);
		  	  HeaderTable015.flushContent();
		  	
		  	// end of gst no row 
			
		  	// this is for from dept
		  	
		  	PdfPTable HeaderTable014 = new PdfPTable(2);
			int[] headerwidth015 = {45,45}; 
			HeaderTable014.setWidths(headerwidth015);
			HeaderTable014.setWidthPercentage(96f);
			HeaderTable014.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		      PdfPCell cell7 = new PdfPCell();
		      cell7.setBorder(Rectangle.LEFT | Rectangle.RIGHT );
		      PdfPTable nestedTable7 = new PdfPTable(2);
		     
		      nestedTable7.setWidths(hW7);
		      nestedTable7.setWidthPercentage(96f);
		      nestedTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable7.addCell(new Paragraph("",subheader));
		      nestedTable7.addCell(new Paragraph(" " ,tabletext));

		      cell7.addElement(nestedTable7);
		      PdfPCell cell8 = new PdfPCell();
		      cell8.setBorder(Rectangle.LEFT | Rectangle.RIGHT );
		      PdfPTable nestedTable8 = new PdfPTable(2);
		      int[] hW8 = {44,80}; 
		      nestedTable8.setWidths(hW8);
		      nestedTable8.setWidthPercentage(96f);
		      nestedTable8.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		      nestedTable8.addCell(new Paragraph("  ",subheader));
		      nestedTable8.addCell(new Paragraph(": ",tabletext));
		      cell8.addElement(nestedTable8);
		      HeaderTable014.addCell(cell7);
		      HeaderTable014.addCell(cell8);
		      document.add(HeaderTable014);
		  	  HeaderTable014.flushContent();
		  	
		  	// end of from dept row
		  	
		  	// this is empty row
		  	
				//SUPPLIER NAME
		PdfPTable HeaderTable0151 = new PdfPTable(2);
		int[] headerwidth0161 = {45,45}; 
		HeaderTable0151.setWidths(headerwidth016);
		HeaderTable0151.setWidthPercentage(96f);
		HeaderTable0151.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	      PdfPCell cell91 = new PdfPCell();
	     cell91.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM);
	      PdfPTable nestedTable91 = new PdfPTable(2);
	      int[] hW91 = {40,80}; 
	      nestedTable91.setWidths(hW7);
	      nestedTable91.setWidthPercentage(96f);
	      nestedTable91.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	      nestedTable91.addCell(new Paragraph("",subheader));
	  //    nestedTable1.addCell(new Paragraph(""));
	      nestedTable91.addCell(new Paragraph(""+ "",tabletext));

	      cell91.addElement(nestedTable91);
	      PdfPCell cell101 = new PdfPCell();
	     cell101.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM);
	      PdfPTable nestedTable101 = new PdfPTable(2);
	      int[] hW101 = {44,80}; 
	      nestedTable101.setWidths(hW101);
	      nestedTable101.setWidthPercentage(96f);
	      nestedTable101.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	      nestedTable101.addCell(new Paragraph("",subheader));
	 //     nestedTable2.addCell(new Paragraph(":"));
	      nestedTable101.addCell(new Paragraph(" ",tabletext));
	      cell101.addElement(nestedTable101);
	      HeaderTable0151.addCell(cell91);
	      HeaderTable0151.addCell(cell101);
	  	document.add(HeaderTable0151);
	  	HeaderTable0151.flushContent();
	  	
	  	
		///end/
		
		
		PdfPTable HeaderTable31 = new PdfPTable(1);
		int[] headerwidth31 = {80}; 
		HeaderTable31.setWidths(headerwidth31);
		HeaderTable31.setWidthPercentage(96f);
		HeaderTable31.getDefaultCell().setBorder(Rectangle.LEFT | Rectangle.RIGHT );
		HeaderTable31.addCell(new Paragraph("\n"));

	  	document.add(HeaderTable31);
	  	HeaderTable31.flushContent();
		/* PdfPTable HeaderTable51 = new PdfPTable(1);
		int[] headerwidth51 = {80}; 
		HeaderTable51.setWidths(headerwidth51);
		HeaderTable51.setWidthPercentage(95f);
		HeaderTable51.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  	document.add(HeaderTable51);
	  	HeaderTable51.flushContent();
	  	PdfPTable HeaderTable61 = new PdfPTable(1);
		int[] headerwidth61 = {80}; 
		HeaderTable61.setWidths(headerwidth61);
		HeaderTable61.setWidthPercentage(95f);
		HeaderTable61.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable61.addCell("asfg");
	  	document.add(HeaderTable61);
	  	HeaderTable51.flushContent(); */
	 //NOTE//////////
		
	 		//SUPPLIER NAME
		PdfPTable HeaderTable41 = new PdfPTable(2);
		int[] headerwidth41 = {75,30}; 
		HeaderTable41.setWidths(headerwidth41);
		HeaderTable41.setWidthPercentage(96f);
	//	HeaderTable41.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	
    	PdfPCell cell123 = new PdfPCell(new Paragraph("Dear sir,",subheader));
    	cell123.setBorder(Rectangle.LEFT );
	   PdfPCell cell81 = new PdfPCell(new Paragraph(" Dept.P.O.No :"+"1134",subheader));
	   cell81.setBorder(Rectangle.RIGHT );
	   HeaderTable41.addCell(cell123);
	   HeaderTable41.addCell(cell81);
	  //	document.add(HeaderTable41);
	  	//HeaderTable41.flushContent();
	  	
	  	
		///end/	
		
		
	 //END/	
		
	 //discriptioin
	 
		PdfPTable HeaderTable21 = new PdfPTable(1);
		int[] headerwidth = {80}; 
		HeaderTable21.setWidths(headerwidth);
		HeaderTable21.setWidthPercentage(96f);
		HeaderTable21.getDefaultCell().setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM);
		HeaderTable21.addCell(new Paragraph("With Reference To Your quotation No and Subsiquent discussions/Correspondance With Us,  The Undesigned is pleased to place the work order for purcahse of the items as per the scheduele given below",tabletext));
	//	document.add(HeaderTable21);
		//HeaderTable21.flushContent();
	 //end/
	 //item discrption
 PdfPTable HeaderTableMain = new PdfPTable(14);
		int[] headerwidth6 = { 15, 25, 10, 10, 10, 10, 10, 15, 10,
				  10, 10,10,10,10};
		HeaderTableMain.setWidths(headerwidth6);
		HeaderTableMain.setWidthPercentage(96f);

		PdfPCell HSN = new PdfPCell(new Paragraph("HSN Code",subheader));
		HSN.setHorizontalAlignment(Element.ALIGN_CENTER);
		HSN.setRowspan(2);
		HeaderTableMain.addCell(HSN);

		PdfPCell item = new PdfPCell(new Paragraph("Item Names",subheader));
		item.setHorizontalAlignment(Element.ALIGN_CENTER);
		item.setRowspan(2);
		HeaderTableMain.addCell(item);
		
		PdfPCell itemba = new PdfPCell(new Paragraph("Disc(%)",subheader));
		itemba.setHorizontalAlignment(Element.ALIGN_CENTER);
		itemba.setRowspan(2);
		HeaderTableMain.addCell(itemba);
		
		PdfPCell itemExpirayDate = new PdfPCell(new Paragraph("Disc(Rs)",subheader));
		itemExpirayDate.setHorizontalAlignment(Element.ALIGN_CENTER);
		itemExpirayDate.setRowspan(2);
		HeaderTableMain.addCell(itemExpirayDate);

		PdfPCell unit = new PdfPCell(new Paragraph("UOM",subheader));
		unit.setHorizontalAlignment(Element.ALIGN_CENTER);
		unit.setRowspan(2);
		HeaderTableMain.addCell(unit);

		PdfPCell batchNumberCell = new PdfPCell(new Paragraph("QTY",subheader));
		batchNumberCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		batchNumberCell.setRowspan(2);
		HeaderTableMain.addCell(batchNumberCell);

		PdfPCell cells = new PdfPCell(new Paragraph("Unit Price",subheader));
		cells.setHorizontalAlignment(Element.ALIGN_CENTER);
		cells.setRowspan(2);
		HeaderTableMain.addCell(cells);

		PdfPCell qtyCell = new PdfPCell(new Paragraph("DISC Amt",subheader));
		qtyCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		qtyCell.setRowspan(2);
		HeaderTableMain.addCell(qtyCell);

		PdfPCell free = new PdfPCell(new Paragraph("Base Amount",subheader));
		free.setHorizontalAlignment(Element.ALIGN_CENTER);
		free.setRowspan(2);
		HeaderTableMain.addCell(free);

		/* PdfPCell purRatecell = new PdfPCell(new Paragraph("AMOUNT",subheader));
		purRatecell.setHorizontalAlignment(Element.ALIGN_CENTER);
		purRatecell.setRowspan(2);
		HeaderTableMain.addCell(purRatecell); */

		/* PdfPCell cellsCGST = new PdfPCell(new Phrase("CGST",
				subheader));
		cellsCGST.setHorizontalAlignment(Element.ALIGN_CENTER);
		cellsCGST.setColspan(2);
		HeaderTableMain.addCell(cellsCGST); */

		PdfPCell cellsSGST = new PdfPCell(new Phrase("GST",
				subheader));
		cellsSGST.setHorizontalAlignment(Element.ALIGN_CENTER);
		cellsSGST.setColspan(2);
		HeaderTableMain.addCell(cellsSGST);

		PdfPCell cellsIGST = new PdfPCell(new Phrase("IGST",
				subheader));
		cellsIGST.setHorizontalAlignment(Element.ALIGN_CENTER);
		cellsIGST.setColspan(2);
		HeaderTableMain.addCell(cellsIGST);

		 PdfPCell cellsCESS = new PdfPCell(new Phrase("Total Amt",
				subheader));
		cellsCESS.setHorizontalAlignment(Element.ALIGN_CENTER);
		cellsCESS.setRowspan(2);
		HeaderTableMain.addCell(cellsCESS); 

		PdfPCell cgstRate = new PdfPCell(new Phrase("Rate%",
				subheader));
		cgstRate.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTableMain.addCell(cgstRate);

		PdfPCell cgstRs = new PdfPCell(new Phrase(""+currencyName+".", subheader));
		cgstRs.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTableMain.addCell(cgstRs);

		/* PdfPCell sgstRate = new PdfPCell(new Phrase("Rate%",
				subheader));
		sgstRate.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTableMain.addCell(sgstRate);

		PdfPCell sgstRs = new PdfPCell(new Phrase(""+currencyName+".", subheader));
		sgstRs.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTableMain.addCell(sgstRs); */

		PdfPCell igstRate = new PdfPCell(new Phrase("Rate%",
				subheader));
		igstRate.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTableMain.addCell(igstRate);

		PdfPCell igstRs = new PdfPCell(new Phrase(""+currencyName+".", subheader));
		igstRs.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTableMain.addCell(igstRs);

		/* PdfPCell cessRate = new PdfPCell(new Phrase("Rate%",
				subheader));
		cessRate.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTableMain.addCell(cessRate);

		PdfPCell cessRs = new PdfPCell(new Phrase(""+currencyName+".", subheader));
		cessRs.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTableMain.addCell(cessRs); */
		

			/*********************************************** inventory purchase order item master Details ******************/
			
			
		
			
		
		String taxapp=request.getParameter("taxapp");

			
		 	
	     	//System.err.print("extrachages===="+ extrachages);
			int count=1;
			Double sumsubtotal= 0.0;
			Double totalgst =   0.0;
			Double	totaligst = 0.0;
			Double totalAmt= 0.0;
			DecimalFormat df = new DecimalFormat("#.##");
			DecimalFormat df2 = new DecimalFormat("0.00");
			
			
			
			
			
			
			
			
		
	for(int i=0;i<=lstpurchaseobj.getPurchaseOrderItemSlaveDto().size()-1;i++)
		{
		String hsnCode=lstpurchaseobj.getPurchaseOrderItemSlaveDto().get(i).getHsnNameValue();
		
		if(hsnCode.equalsIgnoreCase(null) ||hsnCode.equalsIgnoreCase("null")){
			hsnCode="-";
		}
			HeaderTableMain.addCell(new Phrase(""+hsnCode, tabletext));

			HeaderTableMain.addCell(new Phrase(""+lstpurchaseobj.getPurchaseOrderItemSlaveDto().get(i).getItemName(),	tabletext));

			PdfPCell cell13 = new PdfPCell(new Phrase(	""+lstpurchaseobj.getPurchaseOrderItemSlaveDto().get(i).getItemTradeDiscount(), tabletext));
			cell13.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTableMain.addCell(cell13);
			
			PdfPCell cell131 = new PdfPCell(new Phrase(	""+lstpurchaseobj.getPurchaseOrderItemSlaveDto().get(i).getItemTradeDiscountRupees(), tabletext));
			cell131.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTableMain.addCell(cell131);
			
			PdfPCell cell132 = new PdfPCell(new Phrase(	""+lstpurchaseobj.getPurchaseOrderItemSlaveDto().get(i).getUomUnitLatestFactorName(), tabletext));
			cell132.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTableMain.addCell(cell132);

			PdfPCell batchCodeCells = new PdfPCell(new Phrase(""+lstpurchaseobj.getPurchaseOrderItemSlaveDto().get(i).getItemQuantity(), tabletext));
			batchCodeCells.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTableMain.addCell(batchCodeCells);


			PdfPCell cell222 = new PdfPCell(new Phrase("" +lstpurchaseobj.getPurchaseOrderItemSlaveDto().get(i).getItemUnitPrice() ,tabletext));
			cell222.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTableMain.addCell(cell222);

			

			PdfPCell prcell = new PdfPCell(new Phrase("" +lstpurchaseobj.getPurchaseOrderItemSlaveDto().get(i).getItemTradeDiscountAmount() ,tabletext));
			prcell.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTableMain.addCell(prcell);

			PdfPCell cell42 = new PdfPCell(	new Phrase("" + lstpurchaseobj.getPurchaseOrderItemSlaveDto().get(i).getItemTradeBaseAmount(),	tabletext));
			cell42.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTableMain.addCell(cell42);

		/* 	PdfPCell cell56 = new PdfPCell(new Phrase(""+lstpurchaseobj.getLstGoodReceiptNoteItemDto().get(i).getItemBaseAmt(), tabletext));
			cell56.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTableMain.addCell(cell56); */

		

			/* PdfPCell gst1 = new PdfPCell(new Phrase(df2.format(0),	tabletext));
			gst1.setHorizontalAlignment(Element.ALIGN_RIGHT);	HeaderTableMain.addCell(gst1);

			PdfPCell gst11 = new PdfPCell(new Phrase(df2.format(0),	tabletext));
			gst11.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTableMain.addCell(gst11); */
			
			PdfPCell gst3 = new PdfPCell(new Phrase(""+lstpurchaseobj.getPurchaseOrderItemSlaveDto().get(i).getGst(),	tabletext));
			gst3.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTableMain.addCell(gst3);

			PdfPCell gst31 = new PdfPCell(new Phrase(""+lstpurchaseobj.getPurchaseOrderItemSlaveDto().get(i).getGstAmountValue(),	tabletext));
			gst31.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTableMain.addCell(gst31);
			
			PdfPCell gst212 = new PdfPCell(new Phrase(""+lstpurchaseobj.getPurchaseOrderItemSlaveDto().get(i).getIgst(),	tabletext));
			gst212.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTableMain.addCell(gst212);
			
			PdfPCell gst2 = new PdfPCell(new Phrase(""+lstpurchaseobj.getPurchaseOrderItemSlaveDto().get(i).getIgstAmountValue(),tabletext));
			gst2.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTableMain.addCell(gst2);

			totalAmt = totalAmt +lstpurchaseobj.getPurchaseOrderItemSlaveDto().get(i).getTotalAmount();
			
			
			PdfPCell gst21 = new PdfPCell(new Phrase(""+lstpurchaseobj.getPurchaseOrderItemSlaveDto().get(i).getTotalAmount(),	tabletext));
			gst21.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTableMain.addCell(gst21);
			
			
		/* 	PdfPCell gst211 = new PdfPCell(new Phrase(""+"mmmmmmmm",	tabletext));
			gst211.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTableMain.addCell(gst211);
 */
			

			/* PdfPCell gst4 = new PdfPCell(new Phrase("" +0.0,tabletext));
			gst4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTableMain.addCell(gst4);

			PdfPCell gst41 = new PdfPCell(new Phrase(""+ 0.0,tabletext));
			gst41.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTableMain.addCell(gst41); */
			
			document.add(HeaderTableMain);
			
			HeaderTableMain.flushContent();
		 //end
		  	count++;
}
	
//end
//row2
PdfPTable HeaderTableA1 = new PdfPTable(14);
float[] headerwidthA1= {15, 25, 10, 15, 10, 10, 10, 10, 10,
		10,10,10,10,10}; 
HeaderTableA1.setWidths(headerwidthA1);
HeaderTableA1.setWidthPercentage(96f);
PdfPCell cellA1 = new PdfPCell();
cellA1.setBorder(Rectangle.LEFT |Rectangle.BOTTOM );

PdfPCell cellA2 = new PdfPCell();
cellA2.setBorder( Rectangle.BOTTOM );

PdfPCell cellA3 = new PdfPCell();
cellA3.setBorder( Rectangle.BOTTOM );

PdfPCell cellA21 = new PdfPCell();
cellA21.setBorder( Rectangle.BOTTOM );

PdfPCell cellA31 = new PdfPCell();
cellA31.setBorder( Rectangle.BOTTOM );

PdfPCell cellA4 = new PdfPCell();
cellA4.setBorder( Rectangle.BOTTOM );

PdfPCell cellA5 = new PdfPCell();
cellA5.setBorder( Rectangle.BOTTOM );

PdfPCell cellA51 = new PdfPCell();
cellA51.setBorder( Rectangle.BOTTOM );

PdfPCell cellA6 = new PdfPCell(new Phrase(""+  lstpurchaseobj.getGrossAmount(),subheader));
cellA6.setHorizontalAlignment(Element.ALIGN_RIGHT);
cellA6.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM );

PdfPCell cellA7 = new PdfPCell();
cellA7.setBorder( Rectangle.BOTTOM  );

PdfPCell cellA8 = new PdfPCell(new Phrase("   "+lstpurchaseobj.getTotalgstAmount(),subheader));
cellA8.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM );
cellA8.setHorizontalAlignment(Element.ALIGN_RIGHT);

PdfPCell cellA88 = new PdfPCell(new Phrase("   ",subheader));
cellA88.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM );
cellA88.setHorizontalAlignment(Element.ALIGN_RIGHT);

//PdfPCell cellA9 = new PdfPCell(new Phrase("   "+ lstpurchaseobj.getIgstTotalAmount() ,subheader));

PdfPCell cellA10 = new PdfPCell(new Phrase("   "+lstpurchaseobj.getTotalIgstAmount(),subheader));

cellA10.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM |Rectangle.TOP );
cellA10.setHorizontalAlignment(Element.ALIGN_RIGHT);

PdfPCell cellA9 = new PdfPCell(new Phrase(" "+totalAmt,subheader));
cellA9.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM |Rectangle.TOP );
cellA9.setHorizontalAlignment(Element.ALIGN_RIGHT);



HeaderTableA1.addCell(cellA1);
HeaderTableA1.addCell(cellA2);
HeaderTableA1.addCell(cellA3);
HeaderTableA1.addCell(cellA21);
HeaderTableA1.addCell(cellA31);
HeaderTableA1.addCell(cellA4);
HeaderTableA1.addCell(cellA5);
HeaderTableA1.addCell(cellA51);
HeaderTableA1.addCell(cellA6);
HeaderTableA1.addCell(cellA7);
HeaderTableA1.addCell(cellA8);
HeaderTableA1.addCell(cellA88);
HeaderTableA1.addCell(cellA10);
HeaderTableA1.addCell(cellA9);
	document.add(HeaderTableA1);
	HeaderTableA1.flushContent();
	

//end
//row3



PdfPTable HeaderTableB = new PdfPTable(12);
int[] headerwidthB= {10,18,4,4,13,5,8,10,12,17,12,1}; 
HeaderTableB.setWidths(headerwidthB);
HeaderTableB.setWidthPercentage(96f);
PdfPCell cellB = new PdfPCell();
cellB.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB2 = new PdfPCell();
cellB2.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB3 = new PdfPCell();
cellB3.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB4 = new PdfPCell();
cellB4.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB5 = new PdfPCell();
cellB5.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB6 = new PdfPCell();
cellB6.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB7 = new PdfPCell();
cellB7.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB8 = new PdfPCell();
cellB8.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB9 = new PdfPCell();
cellB9.setBorder(Rectangle.RIGHT );



PdfPCell cellB0 = new PdfPCell(new Phrase("Gross AMOUNT ",subheader));
cellB0.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM |Rectangle.TOP );


/* PdfPCell cellB1  = new PdfPCell(new Phrase("     "+lstpurchaseobj.getIgstTotalAmount() ,subheader));
 */
PdfPCell cellB1  = new PdfPCell(new Phrase("     "+lstpurchaseobj.getGrossAmount() ,subheader));//lstpurchaseobj.getGrossTaxes()

cellB1.setBorder( Rectangle.LEFT |Rectangle.BOTTOM |Rectangle.TOP );
cellB1.setHorizontalAlignment(Element.ALIGN_RIGHT);
PdfPCell cellB12  = new PdfPCell(new Phrase("",subheader));

cellB12.setBorder( Rectangle.RIGHT |Rectangle.BOTTOM |Rectangle.TOP );

HeaderTableB.addCell(cellB);
HeaderTableB.addCell(cellB2);
HeaderTableB.addCell(cellB3);
HeaderTableB.addCell(cellB4);
HeaderTableB.addCell(cellB5);
HeaderTableB.addCell(cellB6);
HeaderTableB.addCell(cellB7);
HeaderTableB.addCell(cellB8);
HeaderTableB.addCell(cellB9);
HeaderTableB.addCell(cellB0);
HeaderTableB.addCell(cellB1);
HeaderTableB.addCell(cellB12);
	document.add(HeaderTableB);
	HeaderTableB.flushContent();
//		document.add(new Phrase("\n"));
	
/*  ---------------------------------------------------------------------------*/

PdfPTable HeaderTableB1 = new PdfPTable(12);
int[] headerwidthB1= {10,18,4,4,13,5,8,10,12,17,12,1}; 
HeaderTableB1.setWidths(headerwidthB);
HeaderTableB1.setWidthPercentage(96f);
PdfPCell cellB11 = new PdfPCell();
cellB11.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB21 = new PdfPCell();
cellB21.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB31 = new PdfPCell();
cellB31.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB41 = new PdfPCell();
cellB41.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB51 = new PdfPCell();
cellB51.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB61 = new PdfPCell();
cellB61.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB71 = new PdfPCell();
cellB71.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB81 = new PdfPCell();
cellB81.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB91 = new PdfPCell();
cellB91.setBorder(Rectangle.RIGHT );



PdfPCell cellB01 = new PdfPCell(new Phrase("Less ",subheader));
cellB01.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM |Rectangle.TOP );


/* PdfPCell cellB1  = new PdfPCell(new Phrase("     "+lstpurchaseobj.getIgstTotalAmount() ,subheader));
 */
PdfPCell cellB111  = new PdfPCell(new Phrase("     "+lstpurchaseobj.getGrossLessAmount() ,subheader));

 cellB111.setBorder( Rectangle.LEFT |Rectangle.BOTTOM |Rectangle.TOP );
 cellB111.setHorizontalAlignment(Element.ALIGN_RIGHT);
PdfPCell cellB121  = new PdfPCell(new Phrase("",subheader));

cellB121.setBorder( Rectangle.RIGHT |Rectangle.BOTTOM |Rectangle.TOP );

HeaderTableB1.addCell(cellB11);
HeaderTableB1.addCell(cellB21);
HeaderTableB1.addCell(cellB31);
HeaderTableB1.addCell(cellB41);
HeaderTableB1.addCell(cellB51);
HeaderTableB1.addCell(cellB61);
HeaderTableB1.addCell(cellB71);
HeaderTableB1.addCell(cellB81);
HeaderTableB1.addCell(cellB91);
HeaderTableB1.addCell(cellB01);
HeaderTableB1.addCell(cellB111);
HeaderTableB1.addCell(cellB121);
	document.add(HeaderTableB1);
	HeaderTableB1.flushContent();
/*-----------------------------------------------------------------  */


/*-------------------------------------------------------Add Start ---------------------------------------  */


PdfPTable HeaderTableB1a = new PdfPTable(12);
int[] headerwidthB1a= {10,18,4,4,13,5,8,10,12,17,12,1}; 
HeaderTableB1a.setWidths(headerwidthB);
HeaderTableB1a.setWidthPercentage(96f);
PdfPCell cellB11a = new PdfPCell();
cellB11a.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB21a = new PdfPCell();
cellB21a.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB31a = new PdfPCell();
cellB31a.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB41a = new PdfPCell();
cellB41a.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB51a = new PdfPCell();
cellB51a.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB61a = new PdfPCell();
cellB61a.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB71a = new PdfPCell();
cellB71a.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB81a = new PdfPCell();
cellB81a.setBorder(Rectangle.NO_BORDER );

PdfPCell cellB91a = new PdfPCell();
cellB91a.setBorder(Rectangle.RIGHT );



PdfPCell cellB01a = new PdfPCell(new Phrase("Add ",subheader));
cellB01a.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM |Rectangle.TOP );


/* PdfPCell cellB1  = new PdfPCell(new Phrase("     "+lstpurchaseobj.getIgstTotalAmount() ,subheader));
 */
PdfPCell cellB111a  = new PdfPCell(new Phrase("     "+lstpurchaseobj.getGrossAddAmount() ,subheader));

 cellB111a.setBorder( Rectangle.LEFT |Rectangle.BOTTOM |Rectangle.TOP );
 cellB111a.setHorizontalAlignment(Element.ALIGN_RIGHT);
PdfPCell cellB121a  = new PdfPCell(new Phrase("",subheader));

cellB121a.setBorder( Rectangle.RIGHT |Rectangle.BOTTOM |Rectangle.TOP );

HeaderTableB1a.addCell(cellB11a);
HeaderTableB1a.addCell(cellB21a);
HeaderTableB1a.addCell(cellB31a);
HeaderTableB1a.addCell(cellB41a);
HeaderTableB1a.addCell(cellB51a);
HeaderTableB1a.addCell(cellB61a);
HeaderTableB1a.addCell(cellB71a);
HeaderTableB1a.addCell(cellB81a);
HeaderTableB1a.addCell(cellB91a);
HeaderTableB1a.addCell(cellB01a);
HeaderTableB1a.addCell(cellB111a);
HeaderTableB1a.addCell(cellB121a);
	document.add(HeaderTableB1a);
	HeaderTableB1a.flushContent();
/*-------------------------------------------------------Add End---------------------------------------  */

    
	  PdfPTable HeaderTableC = new PdfPTable(12);
		int[] headerwidthC= {10,18,4,4,13,5,8,10,12,17,12,1}; 
		HeaderTableC.setWidths(headerwidthC);
		HeaderTableC.setWidthPercentage(96f);
    	PdfPCell cellC = new PdfPCell();
    	cellC.setBorder(Rectangle.NO_BORDER );
	   
        PdfPCell cellC2 = new PdfPCell();
        cellC2.setBorder(Rectangle.NO_BORDER );
	   
	    PdfPCell cellC3 = new PdfPCell();
	    cellC3.setBorder(Rectangle.NO_BORDER );
	  
	    PdfPCell cellC4 = new PdfPCell();
	    cellC4.setBorder(Rectangle.NO_BORDER );
	    
	    PdfPCell cellC5 = new PdfPCell();
	    cellC5.setBorder(Rectangle.NO_BORDER );
	    
	    PdfPCell cellC6 = new PdfPCell();
	    cellC6.setBorder(Rectangle.NO_BORDER );
	  
	    PdfPCell cellC7 = new PdfPCell();
	    cellC7.setBorder(Rectangle.NO_BORDER );
	    
	    PdfPCell cellC8 = new PdfPCell();
	    cellC8.setBorder(Rectangle.NO_BORDER );
	    
	    PdfPCell cellC9 = new PdfPCell();
	    cellC9.setBorder(Rectangle.RIGHT );
	   
	    PdfPCell cellC0 = new PdfPCell(new Phrase("Taxes",subheader));
	    cellC0.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM |Rectangle.TOP );
	 
	    
	    PdfPCell cellC1  = new PdfPCell(new Phrase("  "+ lstpurchaseobj.getGrossTaxes(),subheader));
	    cellC1.setBorder( Rectangle.LEFT |Rectangle.BOTTOM |Rectangle.TOP );
	    cellC1.setHorizontalAlignment(Element.ALIGN_RIGHT);
	    PdfPCell cellC12  = new PdfPCell(new Phrase("",subheader));
	    cellC12.setBorder( Rectangle.RIGHT |Rectangle.BOTTOM |Rectangle.TOP );
	    
	    HeaderTableC.addCell(cellC);
	    HeaderTableC.addCell(cellC2);
	    HeaderTableC.addCell(cellC3);
	    HeaderTableC.addCell(cellC4);
	    HeaderTableC.addCell(cellC5);
	    HeaderTableC.addCell(cellC6);
	    HeaderTableC.addCell(cellC7);
	    HeaderTableC.addCell(cellC8);
	    HeaderTableC.addCell(cellC9);
	    HeaderTableC.addCell(cellC0);
	    HeaderTableC.addCell(cellC1);
	    HeaderTableC.addCell(cellC12);
	  	document.add(HeaderTableC);
	  	HeaderTableC.flushContent();
	 
 //end
  //r0w5
 
    
	  PdfPTable HeaderTableD = new PdfPTable(12);
		int[] headerwidthD= {10,18,4,4,13,5,8,10,12,17,12,1}; 
		HeaderTableD.setWidths(headerwidthD);
		HeaderTableD.setWidthPercentage(96f);
    	PdfPCell cellD = new PdfPCell();
    	cellD.setBorder(Rectangle.NO_BORDER );
	   
        PdfPCell cellD2 = new PdfPCell();
        cellD2.setBorder(Rectangle.NO_BORDER );
	   
	    PdfPCell cellD3 = new PdfPCell();
	    cellD3.setBorder(Rectangle.NO_BORDER );
	  
	    PdfPCell cellD4 = new PdfPCell();
	    cellD4.setBorder(Rectangle.NO_BORDER );
	    
	    PdfPCell cellD5 = new PdfPCell();
	    cellD5.setBorder(Rectangle.NO_BORDER );
	    
	    PdfPCell cellD6 = new PdfPCell();
	    cellD6.setBorder(Rectangle.NO_BORDER );
	  
	    PdfPCell cellD7 = new PdfPCell();
	    cellD7.setBorder(Rectangle.NO_BORDER );
	    
	    PdfPCell cellD8 = new PdfPCell();
	    cellD8.setBorder(Rectangle.NO_BORDER );
	    
	    PdfPCell cellD9 = new PdfPCell();
	    cellD9.setBorder(Rectangle.RIGHT );
	   
	    PdfPCell cellD0 = new PdfPCell(new Phrase("Net Amount",subheader));
	    cellD0.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM |Rectangle.TOP );
	 
	
	    //PdfPCell cellD1  = new PdfPCell(new Phrase("            "+ lstpurchaseobj.getGrossTotalAmount(),subheader));
	  
	    	    PdfPCell cellD1  = new PdfPCell(new Phrase("            "+ lstpurchaseobj.getGrossNetAmount(),subheader));

	    cellD1.setBorder( Rectangle.LEFT |Rectangle.BOTTOM |Rectangle.TOP );
	    cellD1.setHorizontalAlignment(Element.ALIGN_RIGHT);

	    PdfPCell cellD12  = new PdfPCell(new Phrase("",subheader));
	    cellD12.setBorder( Rectangle.RIGHT |Rectangle.BOTTOM |Rectangle.TOP );
	    
	    HeaderTableD.addCell(cellD);
	    HeaderTableD.addCell(cellD2);
	    HeaderTableD.addCell(cellD3);
	    HeaderTableD.addCell(cellD4);
	    HeaderTableD.addCell(cellD5);
	    HeaderTableD.addCell(cellD6);
	    HeaderTableD.addCell(cellD7);
	    HeaderTableD.addCell(cellD8);
	    HeaderTableD.addCell(cellD9);
	    HeaderTableD.addCell(cellD0);
	    HeaderTableD.addCell(cellD1);
	    HeaderTableD.addCell(cellD12);
	  	document.add(HeaderTableD);
	  	HeaderTableD.flushContent();
	 
 //en
         document.add(new Phrase("\n"));
		 document.add(new Phrase("\n"));
			
		
		

%>

<%
	
		double bal = Math.round(sumsubtotal);
				
		 PdfPTable HeaderTable18 = new PdfPTable(2);
		int[] headerwidth18 = {  70,10 };
		HeaderTable18.setWidths(headerwidth18);
		HeaderTable18.setWidthPercentage(96f);
		HeaderTable18.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		
		HeaderTable18.addCell(new Phrase("Terms & Conditions:", subheader));
		HeaderTable18.addCell(new Phrase("", subheader));
		//vendorId="138";
		
		
		
		
		//HeaderTable18.addCell(new Phrase(lstpurchaseobj.getTermandCondition(), tabletext));
		int countt=1;
		for(int i=0;i<=lstpurchaseobj.getPartyMasterDtos().getTermsAndConditionInfoDto().size()-1;i++){
			if((lstpurchaseobj.getPartyMasterDtos().getTermsAndConditionInfoDto()!=null && lstpurchaseobj.getPartyMasterDtos().getTermsAndConditionInfoDto().get(i).getHeadingName() !=null)){
				HeaderTable18.addCell(new Phrase(countt+")"+lstpurchaseobj.getPartyMasterDtos().getTermsAndConditionInfoDto().get(i).getHeadingName()+"--"+lstpurchaseobj.getPartyMasterDtos().getTermsAndConditionInfoDto().get(i).getTermconditionName()+"\n", tabletext));
				HeaderTable18.addCell(new Phrase("", tabletext));
				countt++;
			}
		}
		

		//HeaderTable18.addCell(new Phrase("", tabletext));
		
		
		
		document.add(HeaderTable18);
		HeaderTable18.flushContent();  
		
		
		
		PdfPTable HeaderTable20 = new PdfPTable(2);

		int[] headerwidth22 = { 80, 20 };
		HeaderTable20.setWidths(headerwidth22);
		HeaderTable20.setWidthPercentage(96f);
		HeaderTable20.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable20.setSpacingBefore(50.0f);


		HeaderTable20.addCell(new Phrase("Prepared By ", tabletext));
		HeaderTable20.addCell(new Phrase("Purchasing Authority " , tabletext));

		
		document.add(HeaderTable20);
		HeaderTable20.flushContent();
		
		/***** ENd table for Copies @Date 15sept2016 Author :Vinod Udawant ******/
		
	 
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