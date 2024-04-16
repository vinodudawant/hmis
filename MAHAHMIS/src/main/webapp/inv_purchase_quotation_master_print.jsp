<%@page import="java.util.HashMap"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.lowagie.text.pdf.PdfCell"%>
<%@page import="com.itextpdf.text.html.WebColors"%>
<%@page import="com.hms.pharmacy.pojo.CounterSaleMaster"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.awt.Color"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@ page import="com.hms.ehat.dto.CurrencyTypeDto"%>
<%@ page import="com.hms.inventory.dto.PurchaseQuotationMasterDto"%>
<%@ page
	import="com.hms.inventory.service.PurchaseQutationMasterService"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>

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
			
			String vendorId = request.getParameter("pQId");
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
						
						// Table 1 : For hospital adress details end
			/* HeaderTable1.addCell(new Phrase("", subheader)); */
			
			/*  PdfPCell PurchaseQuotation = new PdfPCell(new Phrase( hospitalName + "\n\n"+ address+ "\n" +  city +"   TEL No:-"+contact, subheader1));
				PurchaseQuotation.setHorizontalAlignment(Element.ALIGN_CENTER);
			//	 PurchaseQuotation.setSpaceCharRatio(90f);
			
			
			
			PurchaseQuotation.setBorder(Rectangle.NO_BORDER);
		
			HeaderTable1.addCell(PurchaseQuotation);
			 */
		
			/***** table for header @Date 15sept2016 Author :Vinod Udawant ******/
											
		/********************************************/
		
		PdfPTable HeaderTable45 = new PdfPTable(3);
			int[] headerwidth45 = {45,45,30};
			HeaderTable45.setWidths(headerwidth45);
			HeaderTable45.setWidthPercentage(95f);
			HeaderTable45.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable45.addCell(new Phrase("  "));
			HeaderTable45.addCell(new Phrase("PURCHASE QUOTATION" ,header));
			HeaderTable45.addCell(new Phrase("", subheader));
			
			document.add(HeaderTable45);
			HeaderTable45.flushContent();
		
		
		
		/*******************************************/	
		

			/* ******************************************Date and order no *******************************************************************/

			java.util.Calendar currentDate = java.util.Calendar
					.getInstance();
			SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
			String todays_date = formatter.format(currentDate.getTime());
			
			PdfPTable HeaderTable46 = new PdfPTable(2);
			int[] headerwidth46 = {45,45};
			HeaderTable46.setWidths(headerwidth46);
			HeaderTable46.setWidthPercentage(95f);
			//HeaderTable46.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable46.addCell(new Phrase("Supplier  Order" , subheader));
			HeaderTable46.addCell(new Phrase("From", subheader));
			
			document.add(HeaderTable46);
			HeaderTable46.flushContent();
			
			Integer pId=Integer.parseInt(vendorId);
			System.err.println("pId..........."+pId);
			PurchaseQutationMasterService puservice=(ApplicationContextUtils.getApplicationContext()).getBean(PurchaseQutationMasterService.class);
			PurchaseQuotationMasterDto lstpurchaseobj=puservice.editPurchaseQuotationMaster(pId);
			System.err.println("lstpurchaseobj..........."+lstpurchaseobj);

			

			//featch list for vender Details 

			
			
			/* **** **  item Party Master GeneralDetails Date:18 feb 2016 ** *******/
				
			
			
			
			// address and order number 
			PdfPTable HeaderTable01 = new PdfPTable(2);
		int[] headerwidth012 = {45,45}; 
		HeaderTable01.setWidths(headerwidth012);
		HeaderTable01.setWidthPercentage(95f);
		HeaderTable01.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	      PdfPCell cell1 = new PdfPCell();
	      cell1.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	      PdfPTable nestedTable1 = new PdfPTable(2);
	      int[] hW = {40,80}; 
	      nestedTable1.setWidths(hW);
	      nestedTable1.setWidthPercentage(95f);
	      nestedTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	      nestedTable1.addCell(new Paragraph("PQ NO",subheader ));
	  //    nestedTable1.addCell(new Paragraph(":"));
	      nestedTable1.addCell(new Paragraph(":"+ vendorId,tabletext));

	      cell1.addElement(nestedTable1);
	      PdfPCell cell2 = new PdfPCell();
	      cell2.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	      PdfPTable nestedTable2 = new PdfPTable(2);
	      int[] hW1 = {44,80}; 
	      nestedTable2.setWidths(hW1);
	      nestedTable2.setWidthPercentage(95f);
	      nestedTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	      nestedTable2.addCell(new Paragraph("Name",subheader));
	 //     nestedTable2.addCell(new Paragraph(":"));
	      nestedTable2.addCell(new Paragraph(": "+ hospitalName,tabletext));
	      cell2.addElement(nestedTable2);
	      HeaderTable01.addCell(cell1);
	      HeaderTable01.addCell(cell2);
	  	document.add(HeaderTable01);
	  	HeaderTable01.flushContent();
	  	
	  	
		///end/
		//PO DATE
			PdfPTable HeaderTable012 = new PdfPTable(2);
		int[] headerwidth013 = {45,45}; 
		HeaderTable012.setWidths(headerwidth013);
		HeaderTable012.setWidthPercentage(95f);
		HeaderTable012.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	      PdfPCell cell3 = new PdfPCell();
	      cell3.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	      PdfPTable nestedTable3 = new PdfPTable(2);
	      int[] hW3 = {40,80}; 
	      nestedTable3.setWidths(hW3);
	      nestedTable3.setWidthPercentage(95f);
	      nestedTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	      nestedTable3.addCell(new Paragraph("PQ DATE",subheader));
	  //    nestedTable1.addCell(new Paragraph(":"));
	      nestedTable3.addCell(new Paragraph(":"+ lstpurchaseobj.getQuotationDate(),tabletext));

	      cell3.addElement(nestedTable3);
	      PdfPCell cell4 = new PdfPCell();
	      cell4.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	      PdfPTable nestedTable4 = new PdfPTable(2);
	      int[] hW4 = {44,80}; 
	      nestedTable4.setWidths(hW4);
	      nestedTable4.setWidthPercentage(95f);
	      nestedTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	      nestedTable4.addCell(new Paragraph("ADDRESS",subheader));
	 //     nestedTable2.addCell(new Paragraph(":"));
	      nestedTable4.addCell(new Paragraph(": "+lstpurchaseobj.getSupplierAddress(),tabletext));
	      cell4.addElement(nestedTable4);
	      HeaderTable012.addCell(cell3);
	      HeaderTable012.addCell(cell4);
	  	document.add(HeaderTable012);
	  	HeaderTable012.flushContent();
	  	
	  	
		///end/
		
		//SUPPLIER NAME
		PdfPTable HeaderTable013 = new PdfPTable(2);
		int[] headerwidth014 = {45,45}; 
		HeaderTable013.setWidths(headerwidth014);
		HeaderTable013.setWidthPercentage(95f);
		HeaderTable013.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	      PdfPCell cell5 = new PdfPCell();
	      cell5.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	      PdfPTable nestedTable5 = new PdfPTable(2);
	      int[] hW5 = {40,80}; 
	      nestedTable5.setWidths(hW5);
	      nestedTable5.setWidthPercentage(95f);
	      nestedTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	      nestedTable5.addCell(new Paragraph("SUPPLIERNAME",subheader));
	  //    nestedTable1.addCell(new Paragraph(":"));
	      nestedTable5.addCell(new Paragraph(":"+ lstpurchaseobj.getSupplierName(),tabletext));

	      cell5.addElement(nestedTable5);
	      PdfPCell cell6 = new PdfPCell();
	      cell6.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	      PdfPTable nestedTable6 = new PdfPTable(2);
	      int[] hW6 = {44,80}; 
	      nestedTable6.setWidths(hW6);
	      nestedTable6.setWidthPercentage(95f);
	      nestedTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	      nestedTable6.addCell(new Paragraph("GST NO",subheader));
	 //     nestedTable2.addCell(new Paragraph(":"));
	      nestedTable6.addCell(new Paragraph(": "+gstno,tabletext));
	      cell6.addElement(nestedTable6);
	      HeaderTable013.addCell(cell5);
	      HeaderTable013.addCell(cell6);
	  	document.add(HeaderTable013);
	  	HeaderTable013.flushContent();
	  	
	  	
		///end/
		
		
			//SUPPLIER NAME
		PdfPTable HeaderTable016 = new PdfPTable(2);
		int[] headerwidth018 = {45,45}; 
		HeaderTable016.setWidths(headerwidth018);
		HeaderTable016.setWidthPercentage(95f);
		HeaderTable016.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	      PdfPCell cell11 = new PdfPCell();
	      cell11.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	      PdfPTable nestedTable11 = new PdfPTable(2);
	      int[] hW11 = {40,80}; 
	      nestedTable11.setWidths(hW11);
	      nestedTable11.setWidthPercentage(95f);
	      nestedTable11.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	      nestedTable11.addCell(new Paragraph("ADDRESS",subheader));
	  //    nestedTable1.addCell(new Paragraph(":"));
	      nestedTable11.addCell(new Paragraph(":"+lstpurchaseobj.getSupplierAddress()+",  "+lstpurchaseobj.getPartymasterdto().getPartyMasterAddressInfoDto().get(0).getArea(),tabletext));

	      cell11.addElement(nestedTable11);
	      PdfPCell cell12 = new PdfPCell();
	      cell12.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	      PdfPTable nestedTable12 = new PdfPTable(2);
	      int[] hW12 = {44,80}; 
	      nestedTable12.setWidths(hW12);
	      nestedTable12.setWidthPercentage(95f);
	      nestedTable12.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	      nestedTable12.addCell(new Paragraph("PLACE OF DELIVERY",subheader));
	 //     nestedTable2.addCell(new Paragraph(":"));
	      nestedTable12.addCell(new Paragraph(": "+"MAHARASHTRA - 27	",tabletext));
	      cell12.addElement(nestedTable12);
	      HeaderTable016.addCell(cell11);
	      HeaderTable016.addCell(cell12);
	  	  document.add(HeaderTable016);
	  	  HeaderTable016.flushContent();
	  	
	  	
		///end/
		
		
		
		
		
			//SUPPLIER NAME
		PdfPTable HeaderTable014 = new PdfPTable(2);
		int[] headerwidth015 = {45,45}; 
		HeaderTable014.setWidths(headerwidth015);
		HeaderTable014.setWidthPercentage(95f);
		HeaderTable014.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	      PdfPCell cell7 = new PdfPCell();
	      cell7.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	      PdfPTable nestedTable7 = new PdfPTable(2);
	      int[] hW7 = {40,80}; 
	      nestedTable7.setWidths(hW7);
	      nestedTable7.setWidthPercentage(95f);
	      nestedTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	      nestedTable7.addCell(new Paragraph("FROM DEPT",subheader));
	  //    nestedTable1.addCell(new Paragraph(":"));
	      nestedTable7.addCell(new Paragraph(":"+ "CENTRAL STORE",tabletext));

	      cell7.addElement(nestedTable7);
	      PdfPCell cell8 = new PdfPCell();
	      cell8.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
	      PdfPTable nestedTable8 = new PdfPTable(2);
	      int[] hW8 = {44,80}; 
	      nestedTable8.setWidths(hW8);
	      nestedTable8.setWidthPercentage(95f);
	      nestedTable8.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	      nestedTable8.addCell(new Paragraph("FOR DEPT",subheader));
	 //     nestedTable2.addCell(new Paragraph(":"));
	      nestedTable8.addCell(new Paragraph(": ",tabletext));
	      cell8.addElement(nestedTable8);
	      HeaderTable014.addCell(cell7);
	      HeaderTable014.addCell(cell8);
	  	document.add(HeaderTable014);
	  	HeaderTable014.flushContent();
	  	
	  	
		///end/
		
				//SUPPLIER NAME
		PdfPTable HeaderTable015 = new PdfPTable(2);
		int[] headerwidth016 = {45,45}; 
		HeaderTable015.setWidths(headerwidth016);
		HeaderTable015.setWidthPercentage(95f);
		HeaderTable015.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	      PdfPCell cell9 = new PdfPCell();
	     cell9.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM);
	      PdfPTable nestedTable9 = new PdfPTable(2);
	      int[] hW9 = {40,80}; 
	      nestedTable9.setWidths(hW7);
	      nestedTable9.setWidthPercentage(95f);
	      nestedTable9.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	      nestedTable9.addCell(new Paragraph("",subheader));
	  //    nestedTable1.addCell(new Paragraph(""));
	      nestedTable9.addCell(new Paragraph(""+ "",tabletext));

	      cell9.addElement(nestedTable9);
	      PdfPCell cell10 = new PdfPCell();
	     cell10.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM);
	      PdfPTable nestedTable10 = new PdfPTable(2);
	      int[] hW10 = {44,80}; 
	      nestedTable10.setWidths(hW10);
	      nestedTable10.setWidthPercentage(95f);
	      nestedTable10.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	      nestedTable10.addCell(new Paragraph("",subheader));
	 //     nestedTable2.addCell(new Paragraph(":"));
	      nestedTable10.addCell(new Paragraph(" ",tabletext));
	      cell10.addElement(nestedTable10);
	      HeaderTable015.addCell(cell9);
	      HeaderTable015.addCell(cell10);
	  	document.add(HeaderTable015);
	  	HeaderTable015.flushContent();
	  	
	  	
		///end/
		
		
		PdfPTable HeaderTable31 = new PdfPTable(1);
		int[] headerwidth31 = {80}; 
		HeaderTable31.setWidths(headerwidth31);
		HeaderTable31.setWidthPercentage(95f);
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
		HeaderTable41.setWidthPercentage(95f);
	//	HeaderTable41.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	
    	PdfPCell cell123 = new PdfPCell(new Paragraph("Dear sir,",subheader));
    	cell123.setBorder(Rectangle.LEFT );
	   PdfPCell cell81 = new PdfPCell(new Paragraph(" Dept.P.O.No :"+"1134",subheader));
	   cell81.setBorder(Rectangle.RIGHT );
	   HeaderTable41.addCell(cell123);
	   HeaderTable41.addCell(cell81);
	//	HeaderTable41.addCell(new Paragraph("Dept.P.O.No :1134"  ,subheader));
	  	document.add(HeaderTable41);
	  	HeaderTable41.flushContent();
	  	
	  	
		///end/	
		
		
	 //END/	
		
	 //discriptioin
	 
		PdfPTable HeaderTable21 = new PdfPTable(1);
		int[] headerwidth = {80}; 
		HeaderTable21.setWidths(headerwidth);
		HeaderTable21.setWidthPercentage(95f);
		HeaderTable21.getDefaultCell().setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM);
		HeaderTable21.addCell(new Paragraph("With Reference To Your quotation No and Subsiquent discussions/Correspondance With Us,  The Undesigned is pleased to place the work order for purcahse of the items as per the scheduele given below",tabletext));
		document.add(HeaderTable21);
		HeaderTable21.flushContent();
	 //end/
	 //item discrption
		 PdfPTable HeaderTableMain = new PdfPTable(14);
			int[] headerwidth6 = { 15, 25, 10, 15, 10, 10, 10, 15, 10,
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
			
			PdfPCell itemba = new PdfPCell(new Paragraph("Dis(%).",subheader));
			itemba.setHorizontalAlignment(Element.ALIGN_CENTER);
			itemba.setRowspan(2);
			HeaderTableMain.addCell(itemba);
			
			PdfPCell itemExpirayDate = new PdfPCell(new Paragraph("Dis(Rs)",subheader));
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
				DecimalFormat df = new DecimalFormat("#.##");
				DecimalFormat df2 = new DecimalFormat("0.00");
				
				
				
				
				
				
				
				
			
		for(int i=0;i<=lstpurchaseobj.getLstpurchaseitemInfoDto().size()-1;i++)
			{
			String hsnCode=lstpurchaseobj.getLstpurchaseitemInfoDto().get(i).getHsnNameValue();
			
			if(hsnCode.equalsIgnoreCase(null) ||hsnCode.equalsIgnoreCase("null")){
				hsnCode="-";
			}
				HeaderTableMain.addCell(new Phrase(""+hsnCode, tabletext));

				HeaderTableMain.addCell(new Phrase(""+lstpurchaseobj.getLstpurchaseitemInfoDto().get(i).getItemName(),	tabletext));

				PdfPCell cell13 = new PdfPCell(new Phrase(	""+lstpurchaseobj.getLstpurchaseitemInfoDto().get(i).getItemDiscountPer(), tabletext));
				cell13.setHorizontalAlignment(Element.ALIGN_RIGHT);
				HeaderTableMain.addCell(cell13);
				
				PdfPCell cell131 = new PdfPCell(new Phrase(	""+lstpurchaseobj.getLstpurchaseitemInfoDto().get(i).getItemDiscountRs(), tabletext));
				cell131.setHorizontalAlignment(Element.ALIGN_RIGHT);
				HeaderTableMain.addCell(cell131);
				
				PdfPCell cell132 = new PdfPCell(new Phrase(	""+lstpurchaseobj.getLstpurchaseitemInfoDto().get(i).getItemUnitName(), tabletext));
				cell132.setHorizontalAlignment(Element.ALIGN_RIGHT);
				HeaderTableMain.addCell(cell132);

				PdfPCell batchCodeCells = new PdfPCell(new Phrase(""+lstpurchaseobj.getLstpurchaseitemInfoDto().get(i).getItemQuantity(), tabletext));
				batchCodeCells.setHorizontalAlignment(Element.ALIGN_CENTER);
				HeaderTableMain.addCell(batchCodeCells);


				PdfPCell cell222 = new PdfPCell(new Phrase("" +lstpurchaseobj.getLstpurchaseitemInfoDto().get(i).getItemUnitPrice() ,tabletext));
				cell222.setHorizontalAlignment(Element.ALIGN_RIGHT);
				HeaderTableMain.addCell(cell222);

				

				PdfPCell prcell = new PdfPCell(new Phrase("" +lstpurchaseobj.getLstpurchaseitemInfoDto().get(i).getItemDiscountAmt() ,tabletext));
				prcell.setHorizontalAlignment(Element.ALIGN_RIGHT);
				HeaderTableMain.addCell(prcell);

				PdfPCell cell42 = new PdfPCell(	new Phrase("" + lstpurchaseobj.getLstpurchaseitemInfoDto().get(i).getItemBaseAmt(),	tabletext));
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
				
				PdfPCell gst3 = new PdfPCell(new Phrase(""+lstpurchaseobj.getLstpurchaseitemInfoDto().get(i).getItemGst(),	tabletext));
				gst3.setHorizontalAlignment(Element.ALIGN_RIGHT);
				HeaderTableMain.addCell(gst3);

				PdfPCell gst31 = new PdfPCell(new Phrase(""+lstpurchaseobj.getLstpurchaseitemInfoDto().get(i).getItemGstAmt(),	tabletext));
				gst31.setHorizontalAlignment(Element.ALIGN_RIGHT);
				HeaderTableMain.addCell(gst31);
				
				PdfPCell gst212 = new PdfPCell(new Phrase("0",	tabletext));
				gst212.setHorizontalAlignment(Element.ALIGN_RIGHT);
				HeaderTableMain.addCell(gst212);
				
				PdfPCell gst2 = new PdfPCell(new Phrase(""+lstpurchaseobj.getLstpurchaseitemInfoDto().get(i).getItemIgst(),tabletext));
				gst2.setHorizontalAlignment(Element.ALIGN_RIGHT);
				HeaderTableMain.addCell(gst2);

				PdfPCell gst21 = new PdfPCell(new Phrase(""+lstpurchaseobj.getLstpurchaseitemInfoDto().get(i).getItemBaseIgstGstAmt(),	tabletext));
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
	float[] headerwidthA1= {15, 25, 10, 15, 10, 10, 10, 15, 10,
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

	PdfPCell cellA8 = new PdfPCell(new Phrase("   "+  lstpurchaseobj.getTotalgstAmount(),subheader));
	cellA8.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM );
	cellA8.setHorizontalAlignment(Element.ALIGN_RIGHT);

	PdfPCell cellA88 = new PdfPCell(new Phrase("   ",subheader));
	cellA88.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM );
	cellA88.setHorizontalAlignment(Element.ALIGN_RIGHT);

	//PdfPCell cellA9 = new PdfPCell(new Phrase("   "+ lstpurchaseobj.getIgstTotalAmount() ,subheader));

	PdfPCell cellA10 = new PdfPCell(new Phrase("   "+ lstpurchaseobj.getTotalIgstAmount(),subheader));

	cellA10.setBorder(Rectangle.LEFT | Rectangle.RIGHT |Rectangle.BOTTOM |Rectangle.TOP );
	cellA10.setHorizontalAlignment(Element.ALIGN_RIGHT);

	PdfPCell cellA9 = new PdfPCell();
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
//			document.add(new Phrase("\n"));
		
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
	PdfPCell cellB111  = new PdfPCell(new Phrase("     "+lstpurchaseobj.getLess() ,subheader));

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
	PdfPCell cellB111a  = new PdfPCell(new Phrase("     "+lstpurchaseobj.getAddAmount() ,subheader));

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
		 
		    
		    PdfPCell cellC1  = new PdfPCell(new Phrase("  "+ lstpurchaseobj.getTotalTax(),subheader));
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
		  
		    	    PdfPCell cellD1  = new PdfPCell(new Phrase("            "+ lstpurchaseobj.getGrossTotalAmount(),subheader));

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
			HeaderTable18.addCell(new Phrase(""+"condition", tabletext));

			HeaderTable18.addCell(new Phrase("", tabletext));
			
			
			
			//document.add(HeaderTable18);
			//HeaderTable18.flushContent();  
			
			
			
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