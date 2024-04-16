<%@page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="org.jfree.ui.Align"%>
<%@page import="com.lowagie.text.PageSize"%>
<%@page import="com.hms.dto.HospitalAccDetails"%>
<%@page import="com.hms.dto.BillComponent"%>
<%@page import="com.hms.ipdbill.dto.BulkSettlementMasterDTO"%>
<%@page import="com.hms.ipdbill.service.BillService"%>
<%@page import="com.hms.dto.Patient"%>
<%@page import="com.hms.utility.EnglishNumberToWords"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.ArrayList"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@ page import="java.util.List"%>
<%-- <%@ page import="com.hms.dto.HospitalDetails"%> --%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.model.PatientModel"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"
	import="com.lowagie.text.Chunk,com.lowagie.text.Document,com.lowagie.text.Element,com.lowagie.text.Font
	,com.lowagie.text.HeaderFooter,com.lowagie.text.Image,com.lowagie.text.Paragraph,com.lowagie.text.Phrase,com.lowagie.text.Rectangle
	,com.lowagie.text.pdf.PdfPCell,com.lowagie.text.pdf.PdfPTable,com.lowagie.text.pdf.PdfWriter,com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>

<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Bulk Settlement Report</title>
</head>
<body>
	<%
		try {
			
		response.setContentType("application/pdf");

		HttpSession session2 = request.getSession();
		int hospitalUnitId= (Integer) session2.getAttribute("uId");
		HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
		//List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
	    List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
		HospitalDetails hospObj = arrHospitalDetails.get(0);

		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
		document.setMargins(20, 20, 20, 10);

		//PdfWriter.getInstance(document, outStream);
		PdfWriter writer = PdfWriter.getInstance(document, outStream);
		document.open();
		
		HeaderFooter footerNew = new HeaderFooter(new Phrase(""), true);
		footerNew.setAlignment(Element.ALIGN_CENTER);
		footerNew.setBorderWidthBottom(0);
		document.setFooter(footerNew);

		//font

		Font header = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font subheader = new Font(Font.HELVETICA, 8, Font.BOLD);
		Font footer = new Font(Font.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font tabletext = new Font(Font.HELVETICA, 8, Font.NORMAL);
		Font small = new Font(Font.HELVETICA, 8, Font.NORMAL);

		// parameter value
		session = request.getSession();
		String user_name = (String) session.getAttribute("userName");
		int BulkReceiptNO = 1;//Integer.parseInt(request.getParameter("ReceiptNo"));
		
		String fromDate = request.getParameter("fromDate");
		String toDate = request.getParameter("toDate");
		//int BulkReceiptNO = 1;
		//int PatientId = Integer.parseInt(request.getParameter("PatientID"));
		//String BulkType = request.getParameter("BulkType");
		
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss a");
		String todays_date = formatter.format(currentDate.getTime());

		document.newPage();

		int ProductId = 0;
		int count = 1;

		String path = hospObj.getFilePath();
		String hospitalName = hospObj.getHospitalName();
		hospitalName = hospitalName.toUpperCase();
		String address = hospObj.getHospitalAddress();
		String city = hospObj.getHospitalCity();
		String contact = hospObj.getHospitalContact();
		String path1 = application.getRealPath(path);
		
		String nabh = hospObj.getNabhImagePath(); 
		String nabhLogo = application.getRealPath(nabh);
		
		Image img = null;
		PdfPCell cell = null;

		try {
			img = Image.getInstance(path1);
			img.scaleAbsolute(100, 60);
			cell = new PdfPCell();
			cell.addElement(new Chunk(img, 5, -40));
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

		System.err.println("Test 1");
		//if (((hospObj.getImageAndAddressPlace()).trim())
			//	.equalsIgnoreCase("LR")) {
			// start: left-right
			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 40, 100, 30 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
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

			try {

				cell = new PdfPCell();
				cell.addElement(new Chunk(img, 5, -25));
				cell.setBorder(Rectangle.NO_BORDER);

				if (img == null) {
					// 1
					HeaderTable1.addCell(new Phrase("", header));
				} else {
					// 1
					HeaderTable1.addCell(cell);
				}

			} catch (Exception e) {
				// 1
				HeaderTable1.addCell(new Phrase("", header));
				e.printStackTrace();
			}

			try {
				
				PdfPCell hospitalNameCell1 = new PdfPCell(new Phrase(
						"" + hospitalName + "\n" + address+ "   TEL No:-"
								+ contact,
						header));
				hospitalNameCell1.setHorizontalAlignment(Element.ALIGN_CENTER);
				hospitalNameCell1.setBorder(Rectangle.NO_BORDER);
				HeaderTable1.addCell(hospitalNameCell1);

			} catch (Exception e) {
				// 2
				HeaderTable1.addCell(new Phrase("", header));
				e.printStackTrace();
			}

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

			// end: left-right

		//if (((hospObj.getImageAndAddressPlace()).trim()).equalsIgnoreCase("TB")) {

			// start: top-botom

			PdfPTable HeaderTableTB = new PdfPTable(1);
			int[] headerwidthTB = { 90 };
			HeaderTableTB.setWidths(headerwidthTB);
			HeaderTableTB.setWidthPercentage(95f);
			HeaderTableTB.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTableTB.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			HeaderTableTB.addCell(new Phrase("", header));
			HeaderTableTB.addCell(new Phrase("", header));
			HeaderTableTB.addCell(new Phrase("", header));
			HeaderTableTB.addCell(new Phrase("", header));

			document.add(HeaderTableTB);
			HeaderTableTB.flushContent();

		/* 	try {

				cell = new PdfPCell();
				cell.addElement(new Chunk(img, 180, -20));
				cell.setBorder(Rectangle.NO_BORDER);

				if (img == null) {
					HeaderTableTB.addCell(new Phrase("", header));
				} else {
					HeaderTableTB.addCell(cell);
				}

			} catch (Exception e) {
				HeaderTableTB.addCell(new Phrase("", header));
				e.printStackTrace();
			} 

			HeaderTableTB.addCell(new Phrase("", header));
			HeaderTableTB.addCell(new Phrase("", header));
			HeaderTableTB.addCell(new Phrase("", header));

			HeaderTableTB.addCell(new Phrase("", header));
			HeaderTableTB.addCell(new Phrase("", header));
			HeaderTableTB.addCell(new Phrase("", header));

			document.add(HeaderTableTB);
			HeaderTableTB.flushContent();

			/* try {

				PdfPCell hospitalNameCell = new PdfPCell(new Phrase(
						hospitalName + "\n" + address + "\n TEL No:-"
								+ contact, subheader));
				hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hospitalNameCell.setBorder(Rectangle.NO_BORDER);

				HeaderTableTB.addCell(hospitalNameCell);

				document.add(HeaderTableTB);
				HeaderTableTB.flushContent();

			} catch (Exception e) {
				e.printStackTrace();
			} */

			HeaderTableTB.addCell(new Phrase("", header));
			HeaderTableTB.addCell(new Phrase("", header));

			document.add(HeaderTableTB);
			HeaderTableTB.flushContent();

			HeaderTableTB.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTableTB.addCell(new Phrase("", header));

			document.add(HeaderTableTB);
			HeaderTableTB.flushContent();

			// end: top-botom

		
		System.err.println("Test 2");
		String bill_header = "";

		bill_header = "COMPANY SETTLEMENT REPORT";
		
		if (BulkReceiptNO != 0) {
			
			BulkSettlementMasterDTO objBillComponent= new BulkSettlementMasterDTO();	

			BillService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(BillService.class);	
			//objBillComponent = fetchlist.fetchbulsetlmentskdetails(BulkReceiptNO);
			objBillComponent = fetchlist.getBulkReport(fromDate,toDate);
						
			System.err.println("Test 3");
			PatientModel objPatientModel = new PatientModel();
			
			PdfPTable HeaderTable2 = new PdfPTable(5);
			int[] headerwidth2 = { 20, 20, 100, 15, 35 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);

			HeaderTable2.addCell(new Phrase("From Date : ", subheader));
			HeaderTable2.addCell(new Phrase("" + fromDate, subheader));

			PdfPCell HeaderTable2cell0 = new PdfPCell(new Phrase(""	+ (bill_header), header));
			HeaderTable2cell0.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable2cell0.setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(HeaderTable2cell0);

			HeaderTable2.addCell(new Phrase("To Date : ", subheader));
			HeaderTable2.addCell(new Phrase(""+toDate, subheader));
			document.add(HeaderTable2);
			HeaderTable2.flushContent();
		
			/* PdfPTable Table1 = new PdfPTable(6);
			int[] width1 = { 25, 35, 28, 35, 25, 35 };
			Table1.setWidths(width1);
			Table1.setWidthPercentage(95f);
			Table1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			Table1.addCell(new Phrase("", header));
			Table1.addCell(new Phrase("", header));
			Table1.addCell(new Phrase("", header));
			Table1.addCell(new Phrase("", header));
			Table1.addCell(new Phrase("", header));
			Table1.addCell(new Phrase("", header));

			Table1.addCell(new Phrase("Bank Name :", subheader));
			Table1.addCell(new Phrase("" + objBillComponent.getListBulkSettlementMst().get(0).getbName(), tabletext));
			Table1.addCell(new Phrase("IFSC Code :", subheader));
			Table1.addCell(new Phrase("" + objBillComponent.getListBulkSettlementMst().get(0).getbNumber(),tabletext));
			Table1.addCell(new Phrase("Settlement Date :", subheader));
			if(objBillComponent.getListBulkSettlementMst().get(0).getCreatedDateTime()==null){
				Table1.addCell(new Phrase("" + "-", tabletext));
	
			}else{
				Table1.addCell(new Phrase("" + objBillComponent.getListBulkSettlementMst().get(0).getCreatedDateTime(), tabletext));
	
			}
			
			Table1.addCell(new Phrase("", header));
			Table1.addCell(new Phrase("", header));
			Table1.addCell(new Phrase("", header));
			Table1.addCell(new Phrase("", header));
			Table1.addCell(new Phrase("", header));
			Table1.addCell(new Phrase("", header));
			
				Table1.addCell(new Phrase("Cheque No :", subheader));
				Table1.addCell(new Phrase(""+objBillComponent.getListBulkSettlementMst().get(0).getChequeNo(), tabletext));
				Table1.addCell(new Phrase("Cheque Amount :", subheader));
				Table1.addCell(new Phrase(""+ objBillComponent.getListBulkSettlementMst().get(0).getTotalPaid(), tabletext));

				Table1.addCell(new Phrase("TDS :", subheader));
				Table1.addCell(new Phrase("" + objBillComponent.getListBulkSettlementMst().get(0).getTotalTds(),tabletext));
				
				Table1.addCell(new Phrase("Concession :", subheader));
				Table1.addCell(new Phrase("" + objBillComponent.getListBulkSettlementMst().get(0).getTotalConsn(),tabletext));
					
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));

				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));

				Table1.addCell(new Phrase("", subheader));
				Table1.addCell(new Phrase("", tabletext));
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));

				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));

				document.add(Table1);
				Table1.flushContent();

				Table1.getDefaultCell().setBorder(Rectangle.BOTTOM);
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));
				Table1.addCell(new Phrase("", header));

				document.add(Table1);
				Table1.flushContent(); */
				System.err.println("Test 5");

				// Code for Patient Account Details
				PdfPTable HeaderTable4 = new PdfPTable(3);
				int[] headerwidth4 = { 50, 50, 50 };
				HeaderTable4.setWidths(headerwidth4);
				HeaderTable4.setWidthPercentage(95f);
				HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				PdfPTable Table2 = new PdfPTable(4);
				int[] width2 = { 50, 50, 50, 50 };
				Table2.setWidths(width2);
				Table2.setWidthPercentage(95f);
				Table2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				PdfPTable HeaderTable3 = new PdfPTable(5);
				int[] headerwidth3 = { 20, 20, 40, 20, 20 };
				HeaderTable3.setWidths(headerwidth3);
				HeaderTable3.setWidthPercentage(95f);
				NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");

				int sponsor_id = 0;
				
				if (objBillComponent.getListBulkSettlementSlave().size() != 0) {
					
						HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", header));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						document.add(HeaderTable3);
						HeaderTable3.flushContent();

						HeaderTable3.getDefaultCell().setBorder(Rectangle.BOTTOM);
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("      PAYMENT SUMMARY",header));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						document.add(HeaderTable3);
						HeaderTable3.flushContent();

						HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						document.add(HeaderTable3);
						HeaderTable3.flushContent();

						PdfPTable HeaderTable7 = new PdfPTable(12);
						int[] headerwidth7 = { 5, 40, 40, 25, 18, 20, 27, 20, 16, 27, 18, 25};
						HeaderTable7.setWidths(headerwidth7);
						HeaderTable7.setWidthPercentage(95f);
						HeaderTable7.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
						HeaderTable7.getDefaultCell().setBorder(Rectangle.BOTTOM);

						HeaderTable7.addCell(new Phrase("#", subheader));
						HeaderTable7.addCell(new Phrase("Patient Name/PID",subheader));
						HeaderTable7.addCell(new Phrase("Policy Name.",subheader));
						HeaderTable7.addCell(new Phrase("Bill Date",subheader));
						HeaderTable7.addCell(new Phrase("Bill No.",subheader));
						HeaderTable7.addCell(new Phrase("Total", subheader));
						HeaderTable7.addCell(new Phrase("Patient Paid",subheader));
						HeaderTable7.addCell(new Phrase("Balance ",subheader));
						HeaderTable7.addCell(new Phrase("Concn",subheader));
						HeaderTable7.addCell(new Phrase("Arrival Amt",subheader));						
						HeaderTable7.addCell(new Phrase("TDS", subheader));
						HeaderTable7.addCell(new Phrase("Difference",subheader));

						document.add(HeaderTable7);
						HeaderTable7.flushContent();

						double PaideByPatient = 0.0;
						double TotalPaideByPatient = 0.0;
						Double totalpidpatient= 0.0;
						Double totalamt  = 0.0;
						Double totalblamt= 0.0;
						Double totalaramt= 0.0;
						Double totaldiff = 0.0;
						Double totaltds  = 0.0;
                           int pid=0;
						int paymentCount = 0;
						for (int i = 0; i < objBillComponent. getListBulkSettlementSlave().size(); i++) {
						
							paymentCount++;
							double diifrnceamt=  (objBillComponent. getListBulkSettlementSlave().get(i).getAmount() )-(objBillComponent. getListBulkSettlementSlave().get(i).getPaidAmt() );
						    Date billdate= objBillComponent.getListBulkSettlementSlave().get(i).getBillDate();
						    totalpidpatient = totalpidpatient + objBillComponent. getListBulkSettlementSlave().get(i).getTotalpaidrecipt();
						    totalblamt      = totalblamt + objBillComponent. getListBulkSettlementSlave().get(i).getAmount() ;
						    totalamt        = totalamt   + objBillComponent. getListBulkSettlementSlave().get(i).getBillTotal();
						    totalaramt      = totalaramt + objBillComponent. getListBulkSettlementSlave().get(i).getPaidAmt();
						    totaltds        = totaltds   +  objBillComponent. getListBulkSettlementSlave().get(i).getTdsAmt();
						    pid             = objBillComponent.getListBulkSettlementSlave().get(i).getPatientId();
							double concn    = objBillComponent.getListBulkSettlementSlave().get(i).getConcession();
							double tds      = objBillComponent.getListBulkSettlementSlave().get(i).getTdsAmt();
							
							diifrnceamt = diifrnceamt -(concn+tds);
							
							totaldiff       = totaldiff  + diifrnceamt;
							
							HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							HeaderTable7.addCell(new Phrase(""+ (paymentCount), tabletext));
							HeaderTable7.addCell(new Phrase(""+ objBillComponent.getListBulkSettlementSlave().get(i).getPatientname()
															  + " / "+ objBillComponent.getListBulkSettlementSlave().get(i).getPatientId(),tabletext));
							HeaderTable7.addCell(new Phrase(""+ objBillComponent.getListBulkSettlementSlave().get(i).getCompanyname(),tabletext));
							if(billdate==null){
								
								HeaderTable7.addCell(new Phrase(""+ "-" , tabletext));
							}else{
								
								HeaderTable7.addCell(new Phrase(""+ billdate , tabletext));
							}
													
							HeaderTable7.addCell(new Phrase(""+ objBillComponent.getListBulkSettlementSlave().get(i).getBillno(), tabletext));
							HeaderTable7.addCell(new Phrase(""+ (numberFormatTwoDecimal.format(objBillComponent.getListBulkSettlementSlave().get(i).getBillTotal())),tabletext));
							HeaderTable7.addCell(new Phrase(""+ (numberFormatTwoDecimal.format(objBillComponent.getListBulkSettlementSlave().get(i).getTotalpaidrecipt())),tabletext));
							HeaderTable7.addCell(new Phrase(""+ (numberFormatTwoDecimal.format(objBillComponent.getListBulkSettlementSlave().get(i).getAmount())),tabletext));
							HeaderTable7.addCell(new Phrase(""+ concn,tabletext));
							HeaderTable7.addCell(new Phrase(""+ (numberFormatTwoDecimal.format(objBillComponent.getListBulkSettlementSlave().get(i).getPaidAmt())),tabletext));
							HeaderTable7.addCell(new Phrase(""+ (numberFormatTwoDecimal.format(tds)), tabletext));
							HeaderTable7.addCell(new Phrase(""+ (numberFormatTwoDecimal.format(diifrnceamt)),tabletext));
							
							document.add(HeaderTable7);
							HeaderTable7.flushContent();

						/* 	PaideByPatient = Float.parseFloat(objsponsor
									.getPaidBypat());
							TotalPaideByPatient = TotalPaideByPatient
									+ PaideByPatient; */
							TotalPaideByPatient=0.0;
						}

						HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));						
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						
						/* HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext));
						HeaderTable7.addCell(new Phrase("", tabletext)); */
						document.add(HeaderTable7);
						HeaderTable7.flushContent();

						double TotAmt = 0.0;
						double TotRemainAmt = 0.0;
						double TotDeductionAmt = 0.0;
						double TotArrivalAmt = 0.0;
						double TotalTDS = 0.0;
						double BalanceAmt = 0.0;

						PdfPTable totalTable = new PdfPTable(6);
						int[] totalTablewidth = { 60, 60, 60,  60, 60,
								60 };
						totalTable.setWidths(totalTablewidth);
						totalTable.setWidthPercentage(95f);

						if (pid != 0) {


							PdfPCell totalcell3 = new PdfPCell(
									new Phrase("Total Amount - "
											+ numberFormatTwoDecimal
													.format(totalamt),
											subheader));
							totalcell3
									.setHorizontalAlignment(Element.ALIGN_CENTER);
							totalTable.addCell(totalcell3);

							PdfPCell totalcell22 = new PdfPCell(
									new Phrase(
											"Paid By Patient - "
													+ numberFormatTwoDecimal
															.format(totalpidpatient),
											subheader));
							totalcell22
									.setHorizontalAlignment(Element.ALIGN_CENTER);
							totalTable.addCell(totalcell22);

							PdfPCell totalcell4 = new PdfPCell(
									new Phrase(
											"Total Balance Amt - "
													+ numberFormatTwoDecimal
															.format(totalblamt),
											subheader));
							totalcell4
									.setHorizontalAlignment(Element.ALIGN_CENTER);
							totalTable.addCell(totalcell4);

						/* 	PdfPCell totalcell5 = new PdfPCell(
									new Phrase(
											""
													+ "",
											subheader));
							totalcell5
									.setHorizontalAlignment(Element.ALIGN_CENTER);
							totalTable.addCell(totalcell5); */

							PdfPCell totalcell6 = new PdfPCell(
									new Phrase(
											"Total Arrived Amt - "
													+ numberFormatTwoDecimal
															.format(totalaramt),
											subheader));
							totalcell6
									.setHorizontalAlignment(Element.ALIGN_CENTER);
							totalTable.addCell(totalcell6);

							PdfPCell totalcell8 = new PdfPCell(
									new Phrase(
											"Total Difference - "
													+ numberFormatTwoDecimal
															.format(totaldiff),
											subheader));
							totalcell8
									.setHorizontalAlignment(Element.ALIGN_CENTER);
							totalTable.addCell(totalcell8);

							PdfPCell totalcell7 = new PdfPCell(
									new Phrase("Total TDS - "
											+ numberFormatTwoDecimal
													.format(totaltds),
											subheader));
							totalcell7
									.setHorizontalAlignment(Element.ALIGN_CENTER);
							totalTable.addCell(totalcell7);

							document.add(totalTable);
							totalTable.flushContent();

							totalTable.getDefaultCell().setBorder(
									Rectangle.NO_BORDER);
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));

							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));

							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));

							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));

							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.addCell(new Phrase("", subheader));
							totalTable.getDefaultCell().setBorder(
									Rectangle.BOTTOM);
							document.add(totalTable);
							totalTable.flushContent();

						} 

						totalTable.getDefaultCell().setBorder(
								Rectangle.NO_BORDER);
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));

						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));

						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));

						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));

						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));
						totalTable.addCell(new Phrase("", subheader));

						document.add(totalTable);
						totalTable.flushContent();

						float totalDeductionCollection = 0;
						int paymentCount1 = 0;

						/* if (!objsponsor.getPrevDeduct().equals(".00")
								&& !objsponsor.getPrevDeduct()
										.equals("0.0")) {} */

						HeaderTable3.getDefaultCell().setBorder(
								Rectangle.NO_BORDER);
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", subheader));
						document.add(HeaderTable3);
						HeaderTable3.flushContent();
			
				}

				/* PdfPTable checkedByTable = new PdfPTable(4);
				int[] checkedBywidth = { 200, 200, 200, 200 };
				checkedByTable.setWidths(checkedBywidth);
				checkedByTable.setWidthPercentage(95f);
				checkedByTable.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);
				checkedByTable.getDefaultCell().setHorizontalAlignment(
						Element.ALIGN_CENTER);

				checkedByTable.addCell(new Phrase("", header));
				checkedByTable.addCell(new Phrase("", header));
				checkedByTable.addCell(new Phrase("", header));
				checkedByTable.addCell(new Phrase("", header));
				document.add(checkedByTable);
				checkedByTable.flushContent();

				//checkedByTable.getDefaultCell().setBorder(Rectangle.BOTTOM);
				checkedByTable.addCell(new Phrase("", header));
				checkedByTable.addCell(new Phrase("", header));
				checkedByTable.addCell(new Phrase("", header));
				checkedByTable.addCell(new Phrase("", header));
				document.add(checkedByTable);
				checkedByTable.flushContent();

				checkedByTable.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);
				for (int g = 0; g < 20; g++) {
					checkedByTable.addCell(new Phrase("", header));
					checkedByTable.addCell(new Phrase("", header));
					checkedByTable.addCell(new Phrase("", header));
					checkedByTable.addCell(new Phrase("", header));
				}

				checkedByTable
						.addCell(new Phrase("Prepared By", subheader));
				checkedByTable.addCell(new Phrase("Checked By", subheader));
				checkedByTable
						.addCell(new Phrase("For Hospital", subheader));
				checkedByTable.addCell(new Phrase("Payee", subheader));

				document.add(checkedByTable);
				checkedByTable.flushContent();

				checkedByTable
						.addCell(new Phrase("" + user_name, tabletext));
				checkedByTable.addCell(new Phrase("", tabletext));
				checkedByTable.addCell(new Phrase("", subheader));
				checkedByTable.addCell(new Phrase("", tabletext));

				//checkedByTable.addCell(new Phrase("" + (objPat.getTitle())+ " " + (objPat.getfName()) + " " + (objPat.getmName()) " " + (objPat.getlName()), tabletext)); 

				document.add(checkedByTable);
				checkedByTable.flushContent(); */ 
				document.close();
				outStream.close();
				outStream.flush();
				return;
			}
		} catch (Exception e) {
			System.err.println(e.getMessage());
			e.printStackTrace();
		}
	%>
</body>
</html>