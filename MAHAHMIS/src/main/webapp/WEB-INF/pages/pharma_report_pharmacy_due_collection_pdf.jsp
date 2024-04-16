<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="java.util.ResourceBundle"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"
	import="com.itextpdf.text.*, java.io.*, javax.imageio.ImageIO, java.awt.image.BufferedImage, javax.swing.ImageIcon, com.itextpdf.text.pdf.*, 
	java.util.List,java.util.Map, java.sql.*, java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, 
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, org.springframework.jdbc.core.JdbcTemplate,
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, 
     com.hms.constants.HMSConstants"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>OPD Receipt</title>

</head>
<body>

		<c:set var="fromDMY" value="${fromDMY}" />
		<c:set var="toDMY" value="${toDMY}" />

	<%
		Connection connection = null;
		Statement stmtOpdPayment = null;
		Statement stmtOpdRefund = null;
		Statement stmtOpdDues = null;
		Statement stmtDiagnoPayment = null;
		Statement stmtDiagnoRefund = null;
		Statement stmtDiagnoDues = null;
		Statement stmtIpdPay = null;
		Statement stmtIPDRefund = null;
		Statement stmtIPDDues = null;
		Statement stmtComAdvPay = null;
		Statement stmtComAdvRefund = null;
		Statement stmtPharmaIndentDues = null;
		Statement stmtPharmaPatientDues = null;
		Statement stmtPharmaIndentSaleDues = null;
		Statement stmtPharmaPatientSaleDues = null;

		// pharmacy: stmt
		Statement stmtcounter = null;
		Statement stmtindent = null;
		Statement stmthospital = null;
		Statement stmtpatient = null;
		Statement stmtCreditPharmacy = null;

		ResultSet rsOpdPayment = null;
		ResultSet rsOpdRefund = null;
		ResultSet rsOpdDues = null;
		ResultSet rsDiagnoPayment = null;
		ResultSet rsDiagnoRefund = null;
		ResultSet rsDiagnoDues = null;
		ResultSet rsIpdPay = null;
		ResultSet rsIPDRefund = null;
		ResultSet rsIpdDues = null;
		ResultSet rsComAdvPay = null;
		ResultSet rsComAdvRefund = null;
		ResultSet rsPharmaIndentDues = null;
		ResultSet rsPharmaPatientDues = null;
		ResultSet rsPharmaIndentSaleDues = null;
		ResultSet rsPharmaPatientSaleDues = null;

		// pharmacy: rs
		ResultSet rscounter = null;
		ResultSet rsindent = null;
		ResultSet rshospital = null;
		ResultSet rspatient = null;
		ResultSet rsCreditPharmacy = null;

		String sql = null;

		
		try {

			response.setContentType("application/pdf");

			/* List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails
					.getHospDetails("0");
			HospitalDetails hospObj = arrHospitalDetails.get(0); */
			
			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);

			ServletOutputStream outStream = response.getOutputStream();
			Document document = new Document(PageSize.A4);
			document.setMargins(10, 10, 25, 30);

			PdfWriter pdfWriter = PdfWriter
					.getInstance(document, outStream);

			
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

			// 03/02/2016
			String fromDMY = (request.getParameter("fromDMY")).trim();

			// 03/02/2016
			String toDMY = (request.getParameter("toDMY")).trim();

			String fromYMD = "";
			String toYMD = "";

			System.out.println(fromDMY + ":" + toDMY);

			if (fromDMY.contains("/")) {
				fromYMD = (fromDMY.split("/")[2]) + "-"
						+ (fromDMY.split("/")[1]) + "-"
						+ (fromDMY.split("/")[0]);
			}

			if (toDMY.contains("/")) {
				toYMD = (toDMY.split("/")[2]) + "-" + (toDMY.split("/")[1])
						+ "-" + (toDMY.split("/")[0]);
			}

			System.out.println(fromYMD + ":" + toYMD);
			
			
			double totalOpdCollection = 0.0f;
			double totalOpdRefund = 0.0f;

			int count = 1;
			String path = hospObj.getFilePath();
			String hospitalName = hospObj.getHospitalName();
			hospitalName = hospitalName.toUpperCase();
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
			String GStNo = hospObj.getTxtGstNo();
			Image img = null;
			PdfPCell cell = null;
			try {
				img = Image.getInstance(path1);

				// width, height
				img.scaleAbsolute(150, 65);
				cell = new PdfPCell();
				cell.addElement(new Chunk(img, 5, -40));
				cell.setBorder(Rectangle.NO_BORDER);
			} catch (Exception e) {
				e.printStackTrace();
			}

			document.newPage();

			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 40, 70, 10 };
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
			PdfPCell hospitalNameCell1 = new PdfPCell(new Phrase("\n     "+
					hospitalName + "\n" + address + "\n" +city + ", " +hospitalZip 
					+ "\n" + "Phone No: "+hPhoneNo + "\n"+webste + ", " +email
					+ "\n"+ "CIN NO:"+cinNo + "\n"+ "Service Tax NO:"+serviceTaxNo
					+ ",  Pan NO:"+panNo,subheader));
			hospitalNameCell1.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell1.setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(hospitalNameCell1);
			
			HeaderTable1.addCell(new Phrase("", header));

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

			HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();

			PdfPTable HeaderTable2 = new PdfPTable(5);
			int[] headerwidth2 = { 15, 15, 100, 15, 15 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

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
			HeaderTable2.addCell(new Phrase("From: ", subheader));
			HeaderTable2.addCell(new Phrase("" + fromDMY, subheader));
			PdfPCell headercell = new PdfPCell(new Phrase(
					"TOTAL DUES COLLECTION REPORT", header));
			headercell.setHorizontalAlignment(Element.ALIGN_CENTER);
			headercell.setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(headercell);
			HeaderTable2.addCell(new Phrase("To: ", subheader));
			HeaderTable2.addCell(new Phrase("" + toDMY, subheader));

			document.add(HeaderTable2);
			HeaderTable2.flushContent();

			/* connection = DriverManager.getConnection(HMSConstants.URL,
					HMSConstants.DATABASEUSER,
					HMSConstants.DATABASEPASSWORD); */
					
					ResourceBundle resource = ResourceBundle.getBundle("hibernate");
					String url = (String)resource.getObject("jdbc.url").toString();
					String username = (String)resource.getObject("jdbc.username").toString();
					String password = (String)resource.getObject("jdbc.password").toString();
					
					connection = DriverManager.getConnection(url,
							username,
							password);		
								
			float totalOpdDuesCollection = 0;
			float totalindentdues = 0;
			float totalindentBalance=0;
			sql = " SELECT piah.idpharma_indent_amount_history_id,p.Patient_ID,CONCAT(CONCAT(CONCAT(p.prefix, '', p.f_name), ' ', p.m_name), ' ', p.l_name) pName,piah.amount_receive,piah.amount_balance,piah.final_date,t.t_flag,piah.discount   "
					+ " FROM ehat_patient p, ehat_treatment t, pharma_indent_amount_history piah"
					+ " WHERE p.Patient_ID = t.Patient_ID AND t.Treatment_ID = piah.treatment_id"
					+ " AND (DATE_FORMAT(str_to_date(piah.final_date, '%d-%m-%Y'), '%Y-%m-%d')"
					+ " BETWEEN DATE_FORMAT(str_to_date('"
					+ (fromDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')"
					+ " AND DATE_FORMAT(str_to_date('"
					+ (toDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')) ORDER BY piah.idpharma_indent_amount_history_id ASC";

			stmtPharmaIndentDues = connection.createStatement();
			rsPharmaIndentDues = stmtPharmaIndentDues.executeQuery(sql);

			while (rsPharmaIndentDues.next()) 
			{
				totalindentdues += (rsPharmaIndentDues.getFloat("amount_receive"));
				totalindentBalance += (rsPharmaIndentDues.getFloat("amount_balance"));
			}
			
			System.err.println("totalindentdues: " + totalindentdues);
	
			// pharmacy:start:patient dues
			float totalpatientdues = 0;
			float totalpatientbalance=0;
			sql = "SELECT piah.idpharma_patient_amount_history_id,p.Patient_ID,CONCAT(CONCAT(CONCAT(p.prefix, '', p.f_name), ' ', p.m_name), ' ', p.l_name) pName, piah.amount_receive,piah.amount_balance,piah.final_date,t.t_flag,piah.discount  "
					+ " FROM ehat_patient p, ehat_treatment t, pharma_patient_amount_history piah"
					+ " WHERE p.Patient_ID = t.Patient_ID AND t.Treatment_ID = piah.treatment_id"
					+ " AND (DATE_FORMAT(str_to_date(piah.final_date, '%d-%m-%Y'), '%Y-%m-%d')"
					+ " BETWEEN DATE_FORMAT(str_to_date('"
					+ (fromDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')" 
					+ " AND DATE_FORMAT(str_to_date('"
					+ (toDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')) ORDER BY piah.idpharma_patient_amount_history_id ASC";

			stmtPharmaPatientDues = connection.createStatement();
			rsPharmaPatientDues = stmtPharmaPatientDues.executeQuery(sql);

			while (rsPharmaPatientDues.next()) {
				totalpatientdues += (rsPharmaPatientDues.getFloat("amount_receive"));
				totalpatientbalance += (rsPharmaPatientDues.getFloat("amount_balance"));
			}
			System.err.println("totalpatientdues: " + totalpatientdues);
								
			DecimalFormat df1 = new DecimalFormat("#.00");
			PdfPTable summaryHeaderTable = new PdfPTable(7);
			int[] summaryheaderwidth = { 10, 35,25, 20, 20, 15,30 };
			summaryHeaderTable.setWidths(summaryheaderwidth);
			summaryHeaderTable.setWidthPercentage(95f);
			summaryHeaderTable.setHorizontalAlignment(Element.ALIGN_CENTER);
			summaryHeaderTable.getDefaultCell().setBorder(
					Rectangle.NO_BORDER);

			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));

			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));

			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));

			document.add(summaryHeaderTable);
			summaryHeaderTable.flushContent();

			summaryHeaderTable.getDefaultCell().setBorder(Rectangle.BOTTOM);
			summaryHeaderTable.addCell(new Phrase("#", subheader));
			summaryHeaderTable.addCell(new Phrase("Particular", subheader));

			PdfPCell Collection = new PdfPCell(new Phrase("Amount Receive", subheader));
			Collection.setHorizontalAlignment(Element.ALIGN_RIGHT);
			Collection.setBorder(Rectangle.BOTTOM);
			summaryHeaderTable.addCell(Collection);
			
			PdfPCell Collection1 = new PdfPCell(new Phrase("", subheader));
			Collection1.setHorizontalAlignment(Element.ALIGN_RIGHT);
			Collection1.setBorder(Rectangle.BOTTOM);
			summaryHeaderTable.addCell(Collection1);
			
			
			PdfPCell Dues = new PdfPCell(new Phrase("Amount Balance", subheader));
			Dues.setHorizontalAlignment(Element.ALIGN_RIGHT);
			Dues.setBorder(Rectangle.BOTTOM);
			summaryHeaderTable.addCell(Dues);

			PdfPCell Refunded = new PdfPCell(new Phrase("", subheader));
			Refunded.setHorizontalAlignment(Element.ALIGN_RIGHT);
			Refunded.setBorder(Rectangle.BOTTOM);
			summaryHeaderTable.addCell(Refunded);

			PdfPCell fc = new PdfPCell(new Phrase("",subheader));
			fc.setHorizontalAlignment(Element.ALIGN_RIGHT);
			fc.setBorder(Rectangle.BOTTOM);
			summaryHeaderTable.addCell(fc);

			document.add(summaryHeaderTable);
			summaryHeaderTable.flushContent();
			summaryHeaderTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			 summaryHeaderTable.addCell(new Phrase("1.", tabletext));
			summaryHeaderTable.addCell(new Phrase("Indent Collection",tabletext));
			
			String strtotalOpdDuesCollection1 = "0.00";
			if(totalindentdues == 0.0 || totalindentdues == 0){
				strtotalOpdDuesCollection1 = "0.00";
			}else{
				strtotalOpdDuesCollection1 = df1.format(totalindentdues);
			}
			PdfPCell opdc = new PdfPCell(new Phrase((strtotalOpdDuesCollection1 + ""), tabletext));
			opdc.setHorizontalAlignment(Element.ALIGN_RIGHT);
			opdc.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(opdc);
			
			PdfPCell opdc1 = new PdfPCell(new Phrase((""), tabletext));
			opdc1.setHorizontalAlignment(Element.ALIGN_RIGHT);
			opdc1.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(opdc1);
			
			String strtotalOpdDuesCollection = "0.00";
			if(totalindentBalance == 0.0 || totalindentBalance == 0){
				strtotalOpdDuesCollection = "0.00";
			}else{
				strtotalOpdDuesCollection = df1.format(totalindentBalance);
			}
			PdfPCell opddue = new PdfPCell(new Phrase((strtotalOpdDuesCollection + ""), tabletext));
			opddue.setHorizontalAlignment(Element.ALIGN_RIGHT);
			opddue.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(opddue);
			
			String strtotalOpdRefund = "0.00";
			if(totalindentdues == 0.0 || totalindentdues == 0){
				strtotalOpdRefund = "0.00";
			}else{
				strtotalOpdRefund = df1.format(totalindentdues);
			}
			PdfPCell opdr = new PdfPCell(new Phrase((""),tabletext));
			opdr.setHorizontalAlignment(Element.ALIGN_RIGHT);
			opdr.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(opdr);
			

			/* double opddiff = totalindentReceive+totalindentdues;  */
			
		 /* 	String stropddiff = "0.00";
			if(opddiff == 0.0 || opddiff == 0){
				stropddiff = "0.00";
			}else{
				stropddiff = df1.format(opddiff);
			}  */
			PdfPCell finaloc = new PdfPCell(new Phrase((""),
							tabletext));
			finaloc.setHorizontalAlignment(Element.ALIGN_RIGHT);
			finaloc.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(finaloc); 
		
			summaryHeaderTable.addCell(new Phrase("2.", tabletext));
			summaryHeaderTable.addCell(new Phrase("Patient Collection",
					tabletext));

			String strtotalDiagnoCollection = "0.00";
			if(totalpatientdues == 0.0 || totalpatientdues == 0){
				strtotalDiagnoCollection = "0.00";
			}else{
				strtotalDiagnoCollection = df1.format(totalpatientdues);
			}
			PdfPCell dc = new PdfPCell(new Phrase((strtotalDiagnoCollection + ""), tabletext));
			dc.setHorizontalAlignment(Element.ALIGN_RIGHT);
			dc.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(dc);
			
			PdfPCell dc1 = new PdfPCell(new Phrase((""), tabletext));
			dc1.setHorizontalAlignment(Element.ALIGN_RIGHT);
			dc1.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(dc1);
			
			String strtotalDiagnoDuesCollection = "0.00";
			if(totalpatientbalance == 0.0 || totalpatientbalance == 0){
				strtotalDiagnoDuesCollection = "0.00";
			}else{
				strtotalDiagnoDuesCollection = df1.format(totalpatientbalance);
			}
			
			PdfPCell dcdue = new PdfPCell(new Phrase((strtotalDiagnoDuesCollection + ""), tabletext));
			dcdue.setHorizontalAlignment(Element.ALIGN_RIGHT);
			dcdue.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(dcdue);

			/* String strtotalDiagnoRefund = "0.00";
			if(totalpatientdues == 0.0 || totalpatientdues == 0){
				strtotalDiagnoRefund = "0.00";
			}else{
				strtotalDiagnoRefund = df1.format(totalpatientdues);
			} */
			PdfPCell dr = new PdfPCell(new Phrase((""), tabletext));
			dr.setHorizontalAlignment(Element.ALIGN_RIGHT);
			dr.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(dr);
			/* 
			double diagdiff = (totalPatientReceive+totalpatientdues); */
		/* 	
			String strdiagdiff = "0.00";
			if(diagdiff == 0.0 || diagdiff == 0){
				strdiagdiff = "0.00";
			}else{
				strdiagdiff = df1.format(diagdiff);
			} */
			PdfPCell finaldc = new PdfPCell(new Phrase((""),tabletext));
			finaldc.setHorizontalAlignment(Element.ALIGN_RIGHT);
			finaldc.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(finaldc);
			
			document.add(summaryHeaderTable);
			summaryHeaderTable.flushContent();
			
			double pharmadiff = 0.00;
			summaryHeaderTable.getDefaultCell().setBorder(Rectangle.BOTTOM);
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));
			document.add(summaryHeaderTable);
			summaryHeaderTable.flushContent();

			summaryHeaderTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(new Phrase("", subheader));
			summaryHeaderTable.addCell(new Phrase("", subheader));

			// final pay total (ipd, opd, diagnosis, pharmacy,common advance)
			double finalAllCFloat =(totalindentdues + totalpatientdues);

			PdfPCell finalAllC = new PdfPCell(new Phrase(
					("" + df1.format(finalAllCFloat)), subheader));
			finalAllC.setHorizontalAlignment(Element.ALIGN_RIGHT);
			finalAllC.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(finalAllC);
			
			double finalAllCFloat1 = 0.00;
			PdfPCell finalAllC1 = new PdfPCell(new Phrase("", subheader));
			finalAllC1.setHorizontalAlignment(Element.ALIGN_RIGHT);
			finalAllC1.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(finalAllC1);
			
			
			// final dues total (ipd, opd, diagnosis, pharmacy,common advance)
			float finalAllDuesFloat = (totalindentBalance + totalpatientbalance );

			PdfPCell finalAllCDues = new PdfPCell(new Phrase(
					("" + df1.format(finalAllDuesFloat)), subheader));
			finalAllCDues.setHorizontalAlignment(Element.ALIGN_RIGHT);
			finalAllCDues.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(finalAllCDues);
			

			// final refund total (ipd, opd, diagnosis, pharmacy, common advance)
			double finalAllRFloat = 0.00;

			PdfPCell finalAllR = new PdfPCell(new Phrase((""), subheader));
			finalAllR.setHorizontalAlignment(Element.ALIGN_RIGHT);
			finalAllR.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(finalAllR);
			
			/*
				PdfPCell finalAllR = new PdfPCell(new Phrase(
					("" + decimalFormat.format(finalAllRFloat) ), subheader));
			*/

			// finally collected amount
			double finalAllTFloat =0.00 ;
			
			System.out.println("final collection------------->"+finalAllRFloat);

			PdfPCell finalAllT = new PdfPCell(new Phrase(
					(""), subheader));
			finalAllT.setHorizontalAlignment(Element.ALIGN_RIGHT);
			finalAllT.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(finalAllT);

			document.add(summaryHeaderTable);
			summaryHeaderTable.flushContent();
			
			 DecimalFormat df = new DecimalFormat("#.00");
			
			PdfPTable paymentHeader = new PdfPTable(10);
			int[] paymentHeaderWidth = { 6, 14, 20, 38,15,17,13,18,15,15};
			paymentHeader.setWidths(paymentHeaderWidth);
			paymentHeader.setWidthPercentage(95f);
			paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			// UI: start opd
			paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
			int headerCount = 0;
		
			paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			document.add(paymentHeader);
			paymentHeader.flushContent();
			headerCount = 0;
			
			paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			
			document.add(paymentHeader);
			paymentHeader.flushContent();

			headerCount = 0;
	
			DecimalFormat df2 = new DecimalFormat("#.000");
			
			// pharmacy:start:indent
			paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			document.add(paymentHeader);
			paymentHeader.flushContent();

			headerCount = 0;

			
			// pharmacy:start:indent dues
			paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			document.add(paymentHeader);
			paymentHeader.flushContent();

			headerCount = 0;
			rsPharmaIndentDues.beforeFirst();
			while (rsPharmaIndentDues.next()) {

				headerCount = (headerCount + 1);

				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL PHARMACY INDENT DUES COLLECTION", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("Rec. No", subheader));
					paymentHeader
							.addCell(new Phrase("PID", subheader));
					paymentHeader.addCell(new Phrase("Patient Name", subheader));
					paymentHeader
							.addCell(new Phrase("Date", subheader));
					paymentHeader.addCell(new Phrase("Status", subheader));
					paymentHeader
							.addCell(new Phrase("Amount Receive", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Amount Balance", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_LEFT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
					paymentHeader.addCell(new Phrase("Discount",
							subheader));
					
					paymentHeader.addCell(new Phrase("Mode",
							subheader));
					

					document.add(paymentHeader);
					paymentHeader.flushContent();

					paymentHeader.getDefaultCell().setBorder(
							Rectangle.BOTTOM);
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("", subheader));

					document.add(paymentHeader);
					paymentHeader.flushContent();

				}

				 paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);

				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaIndentDues.getInt("idpharma_indent_amount_history_id"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaIndentDues.getString("Patient_ID"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaIndentDues.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaIndentDues.getString("final_date"), tabletext));
				paymentHeader.addCell(new Phrase(""+rsPharmaIndentDues.getString("t_flag"),tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaIndentDues.getString("amount_receive"), tabletext));
			
				double amt = rsPharmaIndentDues.getFloat("amount_receive");
				String finalamt = "0.000";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.000";
				}else{
					finalamt = df2.format(amt);
				}
				
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaIndentDues.getString("amount_balance"), tabletext));
				
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaIndentDues.getString("discount"), tabletext));
				
				paymentHeader.addCell(new Phrase("Cash", tabletext));
				
				document.add(paymentHeader);
				paymentHeader.flushContent();
 
			}
			paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			document.add(paymentHeader);
			paymentHeader.flushContent();
				
			paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			document.add(paymentHeader);
			paymentHeader.flushContent();


			headerCount = 0;
		
			paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			document.add(paymentHeader);
			paymentHeader.flushContent();
			headerCount = 0;
			paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			document.add(paymentHeader);
			paymentHeader.flushContent();

			// new page
			// document.newPage();

			headerCount = 0;
			rsPharmaPatientDues.beforeFirst();
			while (rsPharmaPatientDues.next()) {

				headerCount = (headerCount + 1);

				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL PHARMACY PATIENT DUES COLLECTION", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("Rec No", subheader));
					paymentHeader
							.addCell(new Phrase("PID", subheader));
					paymentHeader.addCell(new Phrase("Patient Name", subheader));
					paymentHeader
							.addCell(new Phrase("Date", subheader));
					paymentHeader.addCell(new Phrase("Status", subheader));
					paymentHeader
							.addCell(new Phrase("Amount Receive", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Amount Balance", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_LEFT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
					paymentHeader.addCell(new Phrase("Discount",
							subheader));
					
					paymentHeader.addCell(new Phrase("Mode",
							subheader));

					document.add(paymentHeader);
					paymentHeader.flushContent();

					paymentHeader.getDefaultCell().setBorder(
							Rectangle.BOTTOM);
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("", subheader));

					document.add(paymentHeader);
					paymentHeader.flushContent();

				}

				paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);

				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaPatientDues.getInt("idpharma_patient_amount_history_id"), tabletext));
				paymentHeader
						.addCell(new Phrase(""
								+ rsPharmaPatientDues.getString("Patient_ID"),
								tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaPatientDues.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaPatientDues.getString("final_date"), tabletext));
				paymentHeader.addCell(new Phrase(""+ rsPharmaPatientDues.getString("t_flag"),tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaPatientDues.getInt("amount_receive"), tabletext));
				
				double amt = rsPharmaPatientDues.getFloat("amount_balance");
				String finalamt = "0.000";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.000";
				}else{
					finalamt = df2.format(amt);
				}
				
				PdfPCell rspharma = new PdfPCell(new Phrase(("" + rsPharmaPatientDues.getFloat("amount_balance")), tabletext));
				rspharma.setHorizontalAlignment(Element.ALIGN_LEFT);
				rspharma.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rspharma); 
				
				paymentHeader.addCell(new Phrase(""+ rsPharmaPatientDues.getString("discount"),tabletext));
				
				paymentHeader.addCell(new Phrase("Cash",tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent();

			}
				
			paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			document.add(paymentHeader);
			paymentHeader.flushContent();

		
			paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			document.add(paymentHeader);
			paymentHeader.flushContent();

			paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			document.add(paymentHeader);
			paymentHeader.flushContent();
		
			paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));
			paymentHeader.addCell(new Phrase("", subheader));

			document.add(paymentHeader);
			paymentHeader.flushContent();

			headerCount = 0;
		
			document.close();

			outStream.flush();
			outStream.close();

		} catch (Exception e) {
			System.err.println(e.getMessage());
			e.printStackTrace();
		} finally {

			try {
				if (rsOpdPayment != null)
					rsOpdPayment.close();
			} catch (SQLException se1) {
			}

			try {
				if (rsOpdRefund != null)
					rsOpdRefund.close();
			} catch (SQLException se1) {
			}

			try {
				if (rsDiagnoPayment != null)
					rsDiagnoPayment.close();
			} catch (SQLException se1) {
			}

			try {
				if (rsDiagnoRefund != null)
					rsDiagnoRefund.close();
			} catch (SQLException se1) {
			}

			try {
				if (rsIpdPay != null)
					rsIpdPay.close();
			} catch (SQLException se1) {
			}

			try {
				if (rsIPDRefund != null)
					rsIPDRefund.close();
			} catch (SQLException se1) {
			}

			try {
				if (rscounter != null)
					rscounter.close();
			} catch (SQLException se1) {
			}

			try {
				if (rsindent != null)
					rsindent.close();
			} catch (SQLException se1) {
			}

			try {
				if (rshospital != null)
					rshospital.close();
			} catch (SQLException se1) {
			}

			try {
				if (rspatient != null)
					rspatient.close();
			} catch (SQLException se1) {
			}

			try {
				if (rsCreditPharmacy != null)
					rsCreditPharmacy.close();
			} catch (SQLException se1) {
			}

			// end result set

			try {
				if (stmtOpdPayment != null)
					stmtOpdPayment.close();
			} catch (SQLException se2) {
			}

			try {
				if (stmtOpdRefund != null)
					stmtOpdRefund.close();
			} catch (SQLException se2) {
			}

			try {
				if (stmtDiagnoPayment != null)
					stmtDiagnoPayment.close();
			} catch (SQLException se2) {
			}

			try {
				if (stmtDiagnoRefund != null)
					stmtDiagnoRefund.close();
			} catch (SQLException se2) {
			}

			try {
				if (stmtIpdPay != null)
					stmtIpdPay.close();
			} catch (SQLException se2) {
			}

			try {
				if (stmtIPDRefund != null)
					stmtIPDRefund.close();
			} catch (SQLException se2) {
			}

			try {
				if (stmtcounter != null)
					stmtcounter.close();
			} catch (SQLException se1) {
			}

			try {
				if (stmtindent != null)
					stmtindent.close();
			} catch (SQLException se1) {
			}

			try {
				if (stmthospital != null)
					stmthospital.close();
			} catch (SQLException se1) {
			}

			try {
				if (stmtpatient != null)
					stmtpatient.close();
			} catch (SQLException se1) {
			}

			try {
				if (stmtCreditPharmacy != null)
					stmtCreditPharmacy.close();
			} catch (SQLException se1) {
			}

			try {
				if (connection != null)
					connection.close();
			} catch (SQLException se) {
				se.printStackTrace();
			}

		}
	%>


</body>
</html>