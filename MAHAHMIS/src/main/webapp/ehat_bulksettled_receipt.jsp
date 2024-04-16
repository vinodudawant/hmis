<%@page import="com.lowagie.text.HeaderFooter"%>
<%@page import="com.hms.ipdbill.dto.BulkSettlementMasterDTO"%>
<%@page import="com.hms.opdbill.dto.PatientHeaderInfoDto"%>
<%@page import="com.hms.opdbill.service.OpdBillService"%>
<%@page import="com.hms.administrator.service.ChannelHospitalMgmtService"%>
<%@page import="com.hms.administrator.dto.HospitalDetailsDTO"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.ehat.dto.PaymentModDto"%>
<%@page import="com.hms.ehat.service.PaymentModService"%>
<%@page import="com.hms.administrator.dto.Chanelling_doctor"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.ehat.dto.ServiceMasterDto"%>
<%@page import="com.hms.ehat.service.ServService"%>
<%@page import="com.hms.ehat.dto.BillNobleDto"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.ehat.dto.EhatBillPrefix"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.dto.DoctorDto"%>
<%@page import="com.hms.ehat.controller.MarkVisitController"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.ipdbill.dto.BillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.dto.MultiBillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.serviceImpl.BillServiceImpl"%>
<%@page import="com.hms.ipdbill.service.BillService"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@ page import="com.hms.ehat.dto.CurrencyTypeDto"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext,
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

		HttpSession session2 = request.getSession();
		int hospitalUnitId= (Integer) session2.getAttribute("uId");
		HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
	//	List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
		List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
		HospitalDetails hospObj = arrHospitalDetails.get(0);

		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
		document.setMargins(20, 20, 20, 10);

		//PdfWriter.getInstance(document, outStream);
		PdfWriter writer = PdfWriter.getInstance(document, outStream);
		document.open();
		
		/* HeaderFooter footerNew = new HeaderFooter(new Phrase(""), true);
		footerNew.setAlignment(Element.ALIGN_CENTER);
		footerNew.setBorderWidthBottom(0);
		document.setFooter(footerNew);  */

		//font

		Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font subheader = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font tabletext = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
		Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);

		// parameter value
		session = request.getSession();
		String user_name = (String) session.getAttribute("userName");
		int BulkReceiptNO = Integer.parseInt(request.getParameter("ReceiptNo"));
		//int BulkReceiptNO = 1;
		//int PatientId = Integer.parseInt(request.getParameter("PatientID"));
		//String BulkType = request.getParameter("BulkType");
		
		ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String billPrint = (String) resourceBundle.getObject("billPrint").toString();
		String billPrintsHeader = (String) resourceBundle.getObject("billPrintsHeader").toString();
		
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss a");
		String todays_date = formatter.format(currentDate.getTime());

		document.newPage();

		int ProductId = 0;
		int count = 1;

		String path = hospObj.getFilePath();
		String hospitalName = hospObj.getHospitalName();
		//hospitalName = hospitalName.toUpperCase();			
		String address = hospObj.getHospitalAddress();
		String city = hospObj.getHospitalCity();
		String contact = hospObj.getHospitalContact();
		String path1 = application.getRealPath(path);
		String gstNo =  hospObj.getTxtGstNo();
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
			cellNabh.addElement(new Chunk(imgNabh, 5, -40));
			cellNabh.setBorder(Rectangle.NO_BORDER);
		} catch (Exception e) {
			e.printStackTrace();
		} 

		System.err.println("Test 1");
		// Table 1 : For hospital adress details start

		PdfPTable HeaderTable1 = new PdfPTable(3);
		int[] headerwidth1 = { 30, 80, 30 };
		HeaderTable1.setWidths(headerwidth1);
		HeaderTable1.setWidthPercentage(95f);
		HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

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
		document.add(HeaderTable1);
		HeaderTable1.flushContent();

		if (img == null) {

			HeaderTable1.addCell(new Phrase("", header));
		} else {

			HeaderTable1.addCell(cell);
		}

		Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
		Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD);
		Phrase p = new Phrase();
		p.add(new Chunk(" "+hospitalName, bold));			
		p.add(new Chunk(" \n\n"+address, tabletext));			
		p.add(new Chunk(" "+city+" Pin- "+hospitalZip+"\n", tabletext));
		p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
        
		if(!webste.equalsIgnoreCase("")){
			p.add(new Chunk(" \n "+webste, tabletext));
		}
		p.add(new Chunk(" \n "+"email: "+email, tabletext));			//p.add(new Chunk(" \nPAN No : "+panNo , tabletext));	
	/* 	p.add(new Chunk(" \nCIN: "+cinNo+", GST : "+gstNo , tabletext));	
		p.add(new Chunk(" \nSERVICE TAX NO : "+serviceTaxNo+", PAN No: "+panNo, tabletext));	 */
		
		PdfPCell hospitalNameCell = new PdfPCell(p);				
		hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		hospitalNameCell.setBorder(Rectangle.NO_BORDER);
		HeaderTable1.addCell(hospitalNameCell);

		if (billPrintsHeader.contains("on")) {

			if (billPrint.contains("on")) {

				if (img == null) {

					HeaderTable1.addCell(new Phrase("", header));
				} else {

					HeaderTable1.addCell(cellNabh);
				}
			} else {

				HeaderTable1.addCell(new Phrase("", header));
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
		String bill_header = "";

		bill_header = "BULK DETAILED INVOICE";
		
		if (BulkReceiptNO != 0) {
			
			BulkSettlementMasterDTO objBillComponent= new BulkSettlementMasterDTO();	

			BillService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(BillService.class);	
			objBillComponent = fetchlist.fetchbulsetlmentskdetails(BulkReceiptNO);
			
			// PatientModel objPatientModel = new PatientModel();
			
			//addded by vishant
			Integer createdUserId = objBillComponent.getListBulkSettlementMst().get(0).getCreatedBy();
			String createdUserName="";
			if(createdUserId!=0 ||createdUserId!=null){	
				RegService regService = (ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
				//Integer userId = ltpayModeDto.get(0).getCreatedBy();
				createdUserName = regService.getUserNameByUserid(createdUserId);
			}
			
			PdfPTable HeaderTable2 = new PdfPTable(5);
			int[] headerwidth2 = { 20, 20, 100, 10, 35 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);

			HeaderTable2.addCell(new Phrase("Receipt No : ", subheader));
			HeaderTable2.addCell(new Phrase("" + BulkReceiptNO, subheader));

			PdfPCell HeaderTable2cell0 = new PdfPCell(new Phrase(""	+ (bill_header), header));
			HeaderTable2cell0.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable2cell0.setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(HeaderTable2cell0);

			HeaderTable2.addCell(new Phrase("Date : ", subheader));
			HeaderTable2.addCell(new Phrase(""+todays_date, subheader));
			document.add(HeaderTable2);
			HeaderTable2.flushContent();
		
			PdfPTable Table1 = new PdfPTable(6);
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
				Table1.flushContent();
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
						HeaderTable3.addCell(new Phrase("PAYMENT SUMMARY",header));
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

				PdfPTable checkedByTable = new PdfPTable(4);
				int[] checkedBywidth = { 200, 200, 200, 200 };
				checkedByTable.setWidths(checkedBywidth);
				checkedByTable.setSpacingBefore(10f);
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
						.addCell(new Phrase("" + createdUserName, tabletext));
				checkedByTable.addCell(new Phrase("", tabletext));
				checkedByTable.addCell(new Phrase("", subheader));
				checkedByTable.addCell(new Phrase("", tabletext));

				/* checkedByTable.addCell(new Phrase("" + (objPat.getTitle())+ " " + (objPat.getfName()) + " " + (objPat.getmName()) " " + (objPat.getlName()), tabletext)); */

				document.add(checkedByTable);
				checkedByTable.flushContent();
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