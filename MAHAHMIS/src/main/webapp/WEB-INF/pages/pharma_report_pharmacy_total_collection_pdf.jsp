<%@page import="org.hibernate.SessionFactory"%>
<%@page import="org.springframework.beans.factory.annotation.Autowired"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
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
			/* List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails.getHospDetails("0");
			HospitalDetails hospObj = arrHospitalDetails.get(0); */
			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);

			ServletOutputStream outStream = response.getOutputStream();
			Document document = new Document(PageSize.A4);
			document.setMargins(10, 10, 25, 30);

			PdfWriter pdfWriter = PdfWriter
					.getInstance(document, outStream);

			/* ColumnText columnText = new ColumnText(new PdfContentByte(
			pdfWriter));
			int goInt = columnText.go(true);

			System.out.println("goInt: " + goInt);

			System.err.println("=====================================");
			System.out
			.println("getAlignment :" + columnText.getAlignment());
			System.out.println("getRunDirection :"
			+ columnText.getRunDirection());
			System.out.println("getYLine :" + columnText.getYLine());
			System.err.println("====================================="); */

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
					"TOTAL COLLECTION REPORT", header));
			headercell.setHorizontalAlignment(Element.ALIGN_CENTER);
			headercell.setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(headercell);
			HeaderTable2.addCell(new Phrase("To: ", subheader));
			HeaderTable2.addCell(new Phrase("" + toDMY, subheader));

			document.add(HeaderTable2);
			HeaderTable2.flushContent();

			// end header section

			// start body section

			// Class.forName(HMSConstants.DRIVERNAME);

			ResourceBundle resource = ResourceBundle.getBundle("hibernate");
			String url = (String)resource.getObject("jdbc.url").toString();
			String username = (String)resource.getObject("jdbc.username").toString();
			String password = (String)resource.getObject("jdbc.password").toString();
			
			connection = DriverManager.getConnection(url,
					username,
					password);
			
			

			
			 // start: OPD
			// opd: payment
		/* 	sql = "SELECT p.Patient_ID, t.treatmentCount, CONCAT(CONCAT(CONCAT(p.title, '', p.fName), ' ', p.mName), ' ', p.lName) pName, t.TstartDate, p.age, p.month"
					+ ", p.days, p.sex, orm.idopd_receipt_master, orm.recDate, orm.paid_amount, payMode, card_no, bankName, orc.compItemType"
					+ " FROM patient p, treatment t, bill_master_opd bm, opd_receipt_master orm, mode_of_payment mop, opd_receipt_componant orc"
					+ " WHERE p.Patient_ID = t.Patient_ID AND bm.Treatment_ID = t.Treatment_ID AND orm.bill_id = bm.bill_id AND bm.status='Y'"
					+ " AND orm.status='Y' AND orm.idopd_receipt_master = mop.idopd_receipt_master AND orm.idopd_receipt_master = orc.receipt_id AND orc.compItemType != 'credit'"
					+ " AND (DATE_FORMAT(str_to_date(orm.recDate, '%Y-%m-%d'), '%Y-%m-%d')"
					+ " BETWEEN DATE_FORMAT(str_to_date('"
					+ (fromDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')"
					+ " AND DATE_FORMAT(str_to_date('"
					+ (toDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d'))"
					+ " group by orc.receipt_id"
					+ " ORDER BY orm.idopd_receipt_master ASC";

			stmtOpdPayment = connection.createStatement();
			rsOpdPayment = stmtOpdPayment.executeQuery(sql); */

						
			float totalOpdDuesCollection = 0;
		/* 	// opd: Dues
			sql = "SELECT p.Patient_ID, t.treatmentCount, CONCAT(CONCAT(CONCAT(p.title, '', p.fName), ' ', p.mName), ' ', p.lName) pName, t.TstartDate, p.age, p.month"
					+ ", p.days, p.sex, orm.idopd_receipt_master, orm.recDate, orm.paid_amount, payMode, card_no, bankName, orc.compItemType"
					+ " FROM patient p, treatment t, bill_master_opd bm, opd_receipt_master orm, mode_of_payment mop, opd_receipt_componant orc"
					+ " WHERE p.Patient_ID = t.Patient_ID AND bm.Treatment_ID = t.Treatment_ID AND orm.bill_id = bm.bill_id AND bm.status='Y'"
					+ " AND orm.status='Y' AND orm.idopd_receipt_master = mop.idopd_receipt_master AND orm.idopd_receipt_master = orc.receipt_id AND orc.compItemType = 'credit'"
					+ " AND (DATE_FORMAT(str_to_date(orm.recDate, '%Y-%m-%d'), '%Y-%m-%d')"
					+ " BETWEEN DATE_FORMAT(str_to_date('"
					+ (fromDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')"
					+ " AND DATE_FORMAT(str_to_date('"
					+ (toDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d'))"
					+ " group by orc.receipt_id"
					+ " ORDER BY orm.idopd_receipt_master ASC";

			stmtOpdDues = connection.createStatement();
			rsOpdDues = stmtOpdDues.executeQuery(sql);

			while (rsOpdDues.next()) {
				if(!((rsOpdDues.getString("payMode")).equals("CAdvance"))){
					totalOpdDuesCollection += (rsOpdDues.getInt("paid_amount"));
				}
			}
			System.err.println("totalOpdDuesCollection: " + totalOpdDuesCollection); */
			
			// opd: refund
			/* sql = "SELECT p.Patient_ID, t.treatmentCount, CONCAT(CONCAT(CONCAT(p.title, '', p.fName), ' ', p.mName), ' ', p.lName) pName, t.TstartDate, p.age"
					+ ", p.sex, rr.amount, rr.idRefundReceiptDetails, rr.payment_mode, rr.rec_date"
					+ " FROM patient p, treatment t, opd_refund_receipt rr"
					+ " WHERE t.Patient_ID = p.Patient_ID AND t.Treatment_ID = rr.treatID AND rr.status='Y'"
					+ " AND (DATE_FORMAT(str_to_date(rr.rec_date, '%d/%m/%Y'), '%Y-%m-%d')"
					+ " BETWEEN DATE_FORMAT(str_to_date('"
					+ (fromDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')"
					+ " AND DATE_FORMAT(str_to_date('"
					+ (toDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d'))";

			stmtOpdRefund = connection.createStatement();
			rsOpdRefund = stmtOpdRefund.executeQuery(sql);

			while (rsOpdRefund.next()) {
				totalOpdRefund += (rsOpdRefund.getFloat("amount"));
			}
			System.err.println("totalOpdRefund: " + totalOpdRefund); */
			// end: OPD

			// start: Diagnosis
			// diagnosis:payment
		/* 	float totalDiagnoCollection = 0;
			sql = "SELECT p.Patient_ID, t.treatmentCount, CONCAT(CONCAT(CONCAT(p.title, '', p.fName), ' ', p.mName), ' ', p.lName) pName, t.TstartDate, p.age, p.month"
					+ ", p.days, p.sex, orm.idopd_receipt_master, orm.recDate, orm.paid_amount, payMode, card_no, bankName, drc.compItemType"
					+ " FROM patient p, treatment t, bill_master_diagnosis bm, diagnosis_receipt_master orm, mode_of_payment mop, diagnosis_receipt_componant drc"
					+ " WHERE t.Patient_ID = p.Patient_ID AND bm.Treatment_ID = t.Treatment_ID AND orm.bill_id = bm.bill_id AND bm.status='Y'"
					+ " AND orm.status='Y' AND orm.idopd_receipt_master = mop.iddiagnosys_receipt_master  AND orm.idopd_receipt_master = drc.receipt_id AND drc.compItemType != 'credit'"
					+ " AND (DATE_FORMAT(str_to_date(orm.recDate, '%Y-%m-%d'), '%Y-%m-%d')"
					+ " BETWEEN DATE_FORMAT(str_to_date('"
					+ (fromDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')"
					+ " AND DATE_FORMAT(str_to_date('"
					+ (toDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d'))"
					+ " group by drc.receipt_id"
					+ " ORDER BY orm.idopd_receipt_master ASC";
			
			stmtDiagnoPayment = connection.createStatement();
			rsDiagnoPayment = stmtDiagnoPayment.executeQuery(sql);

			while (rsDiagnoPayment.next()) {
				if(!((rsDiagnoPayment.getString("payMode")).equals("CAdvance"))){
				totalDiagnoCollection += (rsDiagnoPayment
						.getFloat("paid_amount"));
				}
			}
			System.out.println("totalDiagnoCollection: "+ totalDiagnoCollection);
			 */
			// diagnosis:payment
			/* float totalDiagnoDuesCollection = 0;
			sql = "SELECT p.Patient_ID, t.treatmentCount, CONCAT(CONCAT(CONCAT(p.title, '', p.fName), ' ', p.mName), ' ', p.lName) pName, t.TstartDate, p.age, p.month"
					+ ", p.days, p.sex, orm.idopd_receipt_master, orm.recDate, orm.paid_amount, payMode, card_no, bankName, drc.compItemType"
					+ " FROM patient p, treatment t, bill_master_diagnosis bm, diagnosis_receipt_master orm, mode_of_payment mop, diagnosis_receipt_componant drc"
					+ " WHERE t.Patient_ID = p.Patient_ID AND bm.Treatment_ID = t.Treatment_ID AND orm.bill_id = bm.bill_id AND bm.status='Y'"
					+ " AND orm.status='Y' AND orm.idopd_receipt_master = mop.iddiagnosys_receipt_master  AND orm.idopd_receipt_master = drc.receipt_id AND drc.compItemType = 'credit'"
					+ " AND (DATE_FORMAT(str_to_date(orm.recDate, '%Y-%m-%d'), '%Y-%m-%d')"
					+ " BETWEEN DATE_FORMAT(str_to_date('"
					+ (fromDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')"
					+ " AND DATE_FORMAT(str_to_date('"
					+ (toDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d'))"
					+ " group by drc.receipt_id"
					+ " ORDER BY orm.idopd_receipt_master ASC";
			
			stmtDiagnoDues = connection.createStatement();
			rsDiagnoDues = stmtDiagnoDues.executeQuery(sql);

			while (rsDiagnoDues.next()) {
				if(!((rsDiagnoDues.getString("payMode")).equals("CAdvance"))){
					totalDiagnoDuesCollection += (rsDiagnoDues
						.getFloat("paid_amount"));
				}
			}
			System.out.println("totalDiagnoDuesCollection: "+ totalDiagnoDuesCollection); */


			// Diagnosis: refund
			/* float totalDiagnoRefund = 0;
			sql = "SELECT p.Patient_ID, t.treatmentCount, CONCAT(CONCAT(CONCAT(p.title, '', p.fName), ' ', p.mName), ' ', p.lName) pName, t.TstartDate, p.age"
					+ ", p.sex, rr.amount, rr.iddiagnosis_refund_receipt, rr.payment_mode, rr.rec_date"
					+ " FROM patient p, treatment t, diagnosis_refund_receipt rr"
					+ " WHERE t.Patient_ID = p.Patient_ID AND t.Treatment_ID = rr.treatID AND rr.status='Y'"
					+ " AND (DATE_FORMAT(str_to_date(rr.rec_date, '%d/%m/%Y'), '%Y-%m-%d')"
					+ " BETWEEN DATE_FORMAT(str_to_date('"
					+ (fromDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')"
					+ " AND DATE_FORMAT(str_to_date('"
					+ (toDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d'))";

			stmtDiagnoRefund = connection.createStatement();
			rsDiagnoRefund = stmtDiagnoRefund.executeQuery(sql);

			while (rsDiagnoRefund.next()) {
				totalDiagnoRefund += (rsDiagnoRefund.getFloat("amount"));
			}
			System.out.println("totalDiagnoRefund: " + totalDiagnoRefund); */
			// end: Diagnosis

			// start: IPD
			// ipd: payment
		/* 	float totalIPDCollection = 0;
			sql = "SELECT p.Patient_ID, t.treatmentCount, CONCAT(CONCAT(CONCAT(p.title, '', p.fName), ' ', p.mName), ' ', p.lName) pName, t.TstartDate, p.age, p.month, p.days, p.sex"
					+ ", ba.bill_advance_amt_id, ba.date, ba.amount, mop.payMode"
					+ ", if((mop.card_no) = 'undefined', '-', mop.card_no) as card_no, mop.bankName"
					+ ", if((mop.cheque_no) is NULL, '-', mop.cheque_no) as cheque_no"
					+ " FROM patient p, treatment t, bill_master bm, bill_advance_amt ba, ipdmode_of_payment mop"
					+ " WHERE ba.bill_advance_amt_id = mop.bill_advance_amt_id AND ba.status = 'Y' AND bm.bill_id = ba.bill_id "
					+ " AND bm.Treatment_ID = t.Treatment_ID AND p.Patient_ID = t.Patient_ID AND ba.bill_type = 'general' AND ba.heading = 'Payment'"
					+ " AND (DATE_FORMAT(str_to_date(ba.date, '%d/%m/%Y'), '%Y-%m-%d')"
					+ " BETWEEN DATE_FORMAT(str_to_date('"
					+ (fromDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')"
					+ " AND DATE_FORMAT(str_to_date('"
					+ (toDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')) ORDER BY ba.bill_advance_amt_id ASC";

			stmtIpdPay = connection.createStatement();
			rsIpdPay = stmtIpdPay.executeQuery(sql);

			while (rsIpdPay.next()) {
				if(!((rsIpdPay.getString("payMode")).equals("cAdvance"))){
				totalIPDCollection += (rsIpdPay.getFloat("amount"));
				}
			}
			System.out.println("totalIPDCollection: " + totalIPDCollection);
 */
			// ipd: dues
			/* float totalIPDDuesCollection = 0;
			sql = "SELECT p.Patient_ID, t.treatmentCount, CONCAT(CONCAT(CONCAT(p.title, '', p.fName), ' ', p.mName), ' ', p.lName) pName, t.TstartDate, p.age, p.month, p.days, p.sex"
					+ ", ba.bill_advance_amt_id, ba.date, ba.amount, mop.payMode"
					+ ", if((mop.card_no) = 'undefined', '-', mop.card_no) as card_no, mop.bankName"
					+ ", if((mop.cheque_no) is NULL, '-', mop.cheque_no) as cheque_no"
					+ " FROM patient p, treatment t, bill_master bm, bill_advance_amt ba, ipdmode_of_payment mop"
					+ " WHERE ba.bill_advance_amt_id = mop.bill_advance_amt_id AND ba.status = 'Y' AND bm.bill_id = ba.bill_id "
					+ " AND bm.Treatment_ID = t.Treatment_ID AND p.Patient_ID = t.Patient_ID AND ba.bill_type = 'credit' AND ba.heading = 'Payment'"
					+ " AND (DATE_FORMAT(str_to_date(ba.date, '%d/%m/%Y'), '%Y-%m-%d')"
					+ " BETWEEN DATE_FORMAT(str_to_date('"
					+ (fromDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')"
					+ " AND DATE_FORMAT(str_to_date('"
					+ (toDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')) ORDER BY ba.bill_advance_amt_id ASC";

			stmtIPDDues = connection.createStatement();
			rsIpdDues = stmtIPDDues.executeQuery(sql);

			while (rsIpdDues.next()) {
				if(!((rsIpdDues.getString("payMode")).equals("cAdvance"))){
				totalIPDDuesCollection += (rsIpdDues.getFloat("amount"));
				}
			}
			System.out.println("totalIPDDuesCollection: " + totalIPDDuesCollection); */
						
			// ipd: refund
		/* 	float totalIPDRefundCollection = 0;
			sql = "SELECT p.Patient_ID, t.treatmentCount, CONCAT(CONCAT(CONCAT(p.title, '', p.fName), ' ', p.mName), ' ', p.lName) pName, t.TstartDate, p.age, p.month, p.days, p.sex"
					+ ", ba.bill_advance_amt_id, ba.date, ba.amount, mop.payMode"
					+ ", if((mop.card_no) = 'undefined', '-', mop.card_no) as card_no, mop.bankName"
					+ ", if((mop.cheque_no) is NULL, '-', mop.cheque_no) as cheque_no"
					+ " FROM patient p, treatment t, bill_master bm, bill_advance_amt ba, ipdmode_of_payment mop"
					+ " WHERE ba.bill_advance_amt_id = mop.bill_advance_amt_id AND ba.status = 'Y' AND bm.bill_id = ba.bill_id "
					+ " AND bm.Treatment_ID = t.Treatment_ID AND p.Patient_ID = t.Patient_ID AND ba.heading = 'Refund'"
					+ " AND (DATE_FORMAT(str_to_date(ba.date, '%d/%m/%Y'), '%Y-%m-%d')"
					+ " BETWEEN DATE_FORMAT(str_to_date('"
					+ (fromDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')"
					+ " AND DATE_FORMAT(str_to_date('"
					+ (toDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')) ORDER BY ba.bill_advance_amt_id ASC";

			stmtIPDRefund = connection.createStatement();
			rsIPDRefund = stmtIPDRefund.executeQuery(sql);

			while (rsIPDRefund.next()) {
				//Retrieve by column name
				totalIPDRefundCollection += (rsIPDRefund.getFloat("amount"));
			}
			System.out.println("totalIPDRefundCollection: "
					+ totalIPDRefundCollection); */
			
			// end: IPD

			// pharmacy: start
			// pharmacy:start:counter
			float totalcounter = 0;
				sql = "SELECT c_master.counter_sale_id ID, c_master.counter_sale_net_amt amount, c_master.counter_sale_for_date recDate"
					+ ", (CASE"
					+ " WHEN counter_sale_patient_name is NULL THEN '---'"
					+ " WHEN TRIM(counter_sale_patient_name) = '' THEN '---'"
					+ " WHEN TRIM(counter_sale_patient_name) != '' THEN counter_sale_patient_name"
					+ " ELSE '----' END) pName"
					+ ", (CASE"
					+ " WHEN c_master.counter_sale_trans_type = '0' THEN 'Cash'"
					+ " WHEN c_master.counter_sale_trans_type = '1' THEN 'Cash & Credit'"
					+ " WHEN c_master.counter_sale_trans_type = '2' THEN 'Credit Card'"
					+ " ELSE 'Other' END) payMode"
					+ " FROM pharma_counter_sale_master c_master"
					+ " WHERE c_master.counter_sale_for_date BETWEEN '"
					+ (fromYMD)
					+ "' AND '"
					+ (toYMD)
					+ "' AND c_master.counter_sale_delete_flag='0'";

			stmtcounter = connection.createStatement();
			rscounter = stmtcounter.executeQuery(sql);

			while (rscounter.next()) {
				totalcounter += (rscounter.getFloat("amount"));
								
			}
			System.err.println("totalcounter: " + totalcounter);

			// pharmacy:end:counter

			// pharmacy:start:indent
			float totalindent = 0;
			float totalindentReceive=0;
			float totalindentBalance=0;
			sql = " SELECT ism.indent_sale_id ID,p.patient_id,CONCAT(CONCAT(CONCAT(p.prefix, '', p.f_name),' ',p.m_name),' ',p.l_name) pName, "
				  +" ism.indent_sale_received_date recDate,ism.indent_sale_amt_receive amount,ism.indent_sale_amt_balance balance,ism.indent_sale_net_amt net, "
				  +" (CASE WHEN ism.indent_bill_mode = '0' THEN 'Cash' WHEN ism.indent_bill_mode = '1' THEN 'Credit' ELSE 'Other' END) payMode"
					+ " FROM ehat_patient p, ehat_treatment t, pharma_indent_master im, pharma_indent_sale_master ism"
					+ " WHERE p.patient_id = t.Patient_ID AND t.treatment_id = im.indent_treatement_id"
					+ " AND ism.indent_sale_indent_no = im.indent_id"
					+ " AND ism.indent_sale_received_date BETWEEN '"
					+ (fromYMD)
					+ "' AND '"
					+ (toYMD)
					+ "' AND ism.indent_sale_delete_flag='0'";

			stmtindent = connection.createStatement();
			rsindent = stmtindent.executeQuery(sql);

			while (rsindent.next()) {
				totalindent += (rsindent.getFloat("net"));
				totalindentReceive+=(rsindent.getFloat("amount"));
				totalindentBalance+=(rsindent.getFloat("balance"));
				
			}
			System.err.println("totalindent: " + totalindent);
			// pharmacy:end:indent	
			
			// pharmacy:start:indent dues
			float totalindentdues = 0;
			sql = " SELECT piah.idpharma_indent_amount_history_id,p.patient_id,CONCAT(CONCAT(CONCAT(p.prefix, '', p.f_name),' ',"
				    +" p.m_name),' ',p.l_name) pName,piah.amount_receive,piah.amount_balance,piah.final_date "
					+ " FROM ehat_patient p, ehat_treatment t, pharma_indent_amount_history piah"
					+ " WHERE p.patient_id = t.patient_id AND t.treatment_id = piah.treatment_id"
					+ " AND (DATE_FORMAT(str_to_date(piah.final_date, '%d-%m-%Y'), '%Y-%m-%d')"
					+ " BETWEEN DATE_FORMAT(str_to_date('"
					+ (fromDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')"
					+ " AND DATE_FORMAT(str_to_date('"
					+ (toDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')) ORDER BY piah.idpharma_indent_amount_history_id ASC";

			stmtPharmaIndentDues = connection.createStatement();
			rsPharmaIndentDues = stmtPharmaIndentDues.executeQuery(sql);

			while (rsPharmaIndentDues.next()) {
				totalindentdues += (rsPharmaIndentDues.getFloat("amount_receive"));
			}
			System.err.println("totalindentdues: " + totalindentdues);
			// pharmacy:end:indent	dues
			
			// pharmacy:start:indent sale dues
			sql = "SELECT p.patient_id, t.trcount, CONCAT(CONCAT(CONCAT(p.prefix, '', p.f_name), ' ', p.m_name), ' ', p.l_name) pName"
					+ ", t.created_date_time, p.age, p.age_months, p.age_days, p.gender, pism.indent_sale_id, pism.indent_sale_received_date, pism.indent_sale_net_amt, pism.indent_sale_amt_receive"
					+ " FROM ehat_patient p, ehat_treatment t, pharma_indent_master pim, pharma_indent_sale_master pism"
					+ " WHERE p.patient_id = t.patient_id AND t.treatment_id = pim.indent_treatement_id"
					+ " AND pim.indent_id = pism.indent_sale_indent_no"
					+ " AND (DATE_FORMAT(str_to_date(pism.indent_sale_received_date, '%Y-%m-%d'), '%Y-%m-%d')"
					+ " BETWEEN DATE_FORMAT(str_to_date('"
					+ (fromDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')"
					+ " AND DATE_FORMAT(str_to_date('"
					+ (toDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')) ORDER BY pism.indent_sale_id ASC";

			stmtPharmaIndentSaleDues = connection.createStatement();
			rsPharmaIndentSaleDues = stmtPharmaIndentSaleDues.executeQuery(sql);
			int indentsalecount = 0;
			while (rsPharmaIndentSaleDues.next()) {
				//System.err.println("rsPharmaIndentSaleDues: " + rsPharmaIndentSaleDues.getFloat("indent_sale_amt_receive"));
				if(rsPharmaIndentSaleDues.getFloat("indent_sale_amt_receive") > rsPharmaIndentSaleDues.getFloat("indent_sale_net_amt")){
			/* 	totalindentdues += (rsPharmaIndentSaleDues.getFloat("indent_sale_amt_receive") - rsPharmaIndentSaleDues.getFloat("indent_sale_net_amt")); */
				indentsalecount++;
				}
			}
			System.err.println("totalindentdues after patient sale: " + totalindentdues);
			// pharmacy:end:indent sale dues
			

			// pharmacy:start:hospital
			float totalhospital = 0;
			sql = "SELECT  phbm.hospital_bill_id ID,p.patient_id, CONCAT(CONCAT(CONCAT(p.prefix, '', p.f_name), ' ', p.m_name), ' ', p.l_name) pName, "
				  +" phbm.hospital_bill_inward_no orderNo,phbm.hospital_bill_date recDate,phbm.hospital_bill_net_amt amount,'Cash' payMode"
					+ " FROM ehat_patient p, ehat_treatment t, order_master om, pharma_hospital_bill_master phbm"
					+ " WHERE p.patient_id = t.patient_id AND t.treatment_id = om.Treatment_ID"
					+ " AND om.idorder_master = phbm.hospital_bill_inward_no AND phbm.hospital_bill_delete_flag = '0'"
					+ " AND phbm.hospital_bill_date BETWEEN '"
					+ (fromYMD)
					+ "' AND '" + (toYMD) + "'";

			stmthospital = connection.createStatement();
			rshospital = stmthospital.executeQuery(sql);

			while (rshospital.next()) {
				totalhospital += (rshospital.getFloat("amount"));
			}
			System.err.println("totalhospital: " + totalhospital);
			// pharmacy:end:hospital

			// pharmacy:start:patient
			
			float totalpatient = 0;
			float totalPatientReceive=0;
			float totalPatientBalance=0;
			sql = "SELECT psbm.patient_sales_bill_id ID,p.patient_id,CONCAT(CONCAT(CONCAT(p.prefix, '', p.f_name),' ',p.m_name),"
				  +"' ',p.l_name) pName,psbm.patient_bill_date recDate,psbm.patient_sales_bill_amount_received amount,psbm.patient_sales_bill_amount_balance balance,"
				  +" psbm.patient_sales_bill_net_amt net, (CASE WHEN psbm.patient_bill_mode = '0' THEN 'Cash' WHEN psbm.patient_bill_mode = '1' THEN 'Credit' "
				  +" ELSE 'Other' END) payMode "
					+ " FROM ehat_patient p, ehat_treatment t, pharma_patient_sales_bill_master psbm"
					+ " WHERE p.patient_id = t.patient_id AND t.treatment_id = psbm.patient_sale_treatmentId"
					+ "  AND psbm.patient_sales_bill_delete_flag = '0'"
					+ " AND psbm.patient_bill_date BETWEEN '"
					+ (fromYMD)
					+ "' AND '" + (toYMD) + "'";

			stmtpatient = connection.createStatement();
			rspatient = stmtpatient.executeQuery(sql);

			while (rspatient.next()) {
				totalpatient += (rspatient.getFloat("net"));
				totalPatientReceive += (rspatient.getFloat("amount"));
				totalPatientBalance += (rspatient.getFloat("balance"));
			}
			System.err.println("totalpatient: " + totalpatient);
			// pharmacy:end:patient
			
			
			// pharmacy:start:patient dues
			float totalpatientdues = 0;
			sql = "SELECT piah.idpharma_patient_amount_history_id,p.patient_id,CONCAT(CONCAT(CONCAT(p.prefix, '', p.f_name),' ',p.m_name),"
					+"' ',p.l_name) pName, piah.amount_receive,piah.amount_balance,piah.final_date "
					+ " FROM ehat_patient p, ehat_treatment t, pharma_patient_amount_history piah"
					+ " WHERE p.patient_id = t.patient_id AND t.treatment_id = piah.treatment_id"
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
			}
			System.err.println("totalpatientdues: " + totalpatientdues);
			// pharmacy:end:patient	dues
			
			
			// pharmacy:start:patient sale dues
			String sql1 = "SELECT p.patient_id, t.trcount, CONCAT(CONCAT(CONCAT(p.prefix, '', p.f_name),' ',p.m_name), ' ', p.l_name) pName"
					+ ", t.created_date_time, p.age, p.age_months, p.age_days, p.gender, ppsbm.patient_sales_bill_id, ppsbm.patient_bill_date, ppsbm.patient_sales_bill_net_amt, ppsbm.patient_sales_bill_amount_received"
					+ " FROM ehat_patient p, ehat_treatment t, pharma_patient_sales_bill_master ppsbm"
					+ " WHERE p.patient_id = t.patient_id AND t.treatment_id = ppsbm.patient_sale_treatmentId"
					+ " AND (DATE_FORMAT(str_to_date(ppsbm.patient_bill_date, '%Y-%m-%d'), '%Y-%m-%d')"
					+ " BETWEEN DATE_FORMAT(str_to_date('"
					+ (fromDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')" 
					+ " AND DATE_FORMAT(str_to_date('"
					+ (toDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')) ORDER BY ppsbm.patient_sales_bill_id ASC";

			stmtPharmaPatientSaleDues = connection.createStatement();
			rsPharmaPatientSaleDues = stmtPharmaPatientSaleDues.executeQuery(sql1);
			int patientsalecount = 0;
			while (rsPharmaPatientSaleDues.next()) {
				//System.err.println("rsPharmaPatientSaleDues: " + rsPharmaPatientSaleDues.getFloat("patient_sales_bill_amount_received"));
				if(rsPharmaPatientSaleDues.getFloat("patient_sales_bill_amount_received") > rsPharmaPatientSaleDues.getFloat("patient_sales_bill_net_amt")){
					/* totalpatientdues += (rsPharmaPatientSaleDues.getFloat("patient_sales_bill_amount_received") - rsPharmaPatientSaleDues.getFloat("patient_sales_bill_net_amt")); */
					patientsalecount++;
				}
			}
			System.err.println("totalpatientdues: " + totalpatientdues);
			// pharmacy:end:patient	dues
			
			
			
			// pharmacy:start:credit_note(patient: refund)
			/* float totalRefundPatPharmacy = 0;
			float amountPayable = 0;
			sql = "SELECT credit_note_id ID,credit_note_patientId,credit_note_patient_name pName,credit_note_date recDate,credit_note_payable payable,credit_note_current_bal, "
				  +"  credit_note_net_amt amount,(CASE WHEN credit_note_transaction_type = '0' THEN 'Cash' WHEN credit_note_transaction_type = '1' THEN 'Credit' " 
				 +" ELSE 'Other' END) payMode FROM pharma_credit_note_master "
					+ " WHERE credit_note_delete_flag = '0' AND credit_note_date BETWEEN '"
					+ (fromYMD) + "' AND '" + (toYMD) + "'";

			stmtCreditPharmacy = connection.createStatement();
			rsCreditPharmacy = stmtCreditPharmacy.executeQuery(sql);

			while (rsCreditPharmacy.next()) {
				totalRefundPatPharmacy += (rsCreditPharmacy
						.getFloat("amount"));
				
				amountPayable += (rsCreditPharmacy
						.getFloat("payable"));
				
			} 
			System.err.println("RefundPat: " + totalRefundPatPharmacy);*/
			
			// pharmacy:end:credit_note(patient: refund)

			/* float totalComAdvCollection = 0;
			float totalComAdvRefund = 0;
			// start: common advance
			// common advance: advance
			sql = "SELECT p.Patient_ID, t.treatmentCount,t.TstartDate, CONCAT(CONCAT(CONCAT(p.title, '', p.fName), ' ', p.mName), ' ', p.lName) pName, p.age, p.month"
					+ ", p.days, p.sex, cas . * "
					+ " FROM patient p, treatment t, common_advance_master cam, common_advance_slave cas"
					+ " WHERE p.Patient_ID = t.Patient_ID AND t.Treatment_ID = cas.Treatment_Id AND cam.idcommon_advance_master = cas.idcommon_advance_master AND cas.status='Y'"
					+ " AND cas.transation_flag = 'Advance' AND (DATE_FORMAT(str_to_date(cas.date, '%d/%m/%Y'), '%Y-%m-%d')"
					+ " BETWEEN DATE_FORMAT(str_to_date('"
					+ (fromDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')"
					+ " AND DATE_FORMAT(str_to_date('"
					+ (toDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')) ORDER BY cas.idcommon_advance_slave ASC";

			stmtComAdvPay = connection.createStatement();
			rsComAdvPay = stmtComAdvPay.executeQuery(sql);

			while (rsComAdvPay.next()) {
				totalComAdvCollection += (rsComAdvPay.getInt("add_amount"));
			}
			System.err.println("totalComAdvCollection: " + totalComAdvCollection); */

			
			// common advance: refund
			/* sql = "SELECT p.Patient_ID, t.treatmentCount,t.TstartDate, CONCAT(CONCAT(CONCAT(p.title, '', p.fName), ' ', p.mName), ' ', p.lName) pName, p.age, p.month"
					+ ", p.days, p.sex, cas . * "
					+ " FROM patient p, treatment t, common_advance_master cam, common_advance_slave cas"
					+ " WHERE p.Patient_ID = t.Patient_ID AND t.Treatment_ID = cas.Treatment_Id AND cam.idcommon_advance_master = cas.idcommon_advance_master AND cas.status='Y'"
					+ " AND cas.transation_flag = 'Refund' AND (DATE_FORMAT(str_to_date(cas.date, '%d/%m/%Y'), '%Y-%m-%d')"
					+ " BETWEEN DATE_FORMAT(str_to_date('"
					+ (fromDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')"
					+ " AND DATE_FORMAT(str_to_date('"
					+ (toDMY)
					+ "', '%d/%m/%Y'), '%Y-%m-%d')) ORDER BY cas.idcommon_advance_slave ASC";

			stmtComAdvRefund = connection.createStatement();
			rsComAdvRefund = stmtComAdvRefund.executeQuery(sql);
			
			while (rsComAdvRefund.next()) {
				totalComAdvRefund += (rsComAdvRefund.getFloat("refunded_amount"));
			}
			System.err.println("totalComAdvRefund: " + totalComAdvRefund); */
			// end: common advance
			
			DecimalFormat df1 = new DecimalFormat("#.00");
			
			PdfPTable summaryHeaderTable = new PdfPTable(7);
			int[] summaryheaderwidth = { 10, 35, 15, 20, 20, 15,30 };
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
			
			
			PdfPCell Dues = new PdfPCell(new Phrase("Dues Collection", subheader));
			Dues.setHorizontalAlignment(Element.ALIGN_RIGHT);
			Dues.setBorder(Rectangle.BOTTOM);
			summaryHeaderTable.addCell(Dues);

			PdfPCell Refunded = new PdfPCell(new Phrase("Total Bill", subheader));
			Refunded.setHorizontalAlignment(Element.ALIGN_RIGHT);
			Refunded.setBorder(Rectangle.BOTTOM);
			summaryHeaderTable.addCell(Refunded);

			PdfPCell fc = new PdfPCell(new Phrase("Final Collection",subheader));
			fc.setHorizontalAlignment(Element.ALIGN_RIGHT);
			fc.setBorder(Rectangle.BOTTOM);
			summaryHeaderTable.addCell(fc);

			document.add(summaryHeaderTable);
			summaryHeaderTable.flushContent();

			summaryHeaderTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			 summaryHeaderTable.addCell(new Phrase("1.", tabletext));
			summaryHeaderTable.addCell(new Phrase("Indent Collection",tabletext));
			
			String strtotalOpdCollection = "0.00";
			if(totalindentReceive == 0.0 || totalindentReceive == 0){
				strtotalOpdCollection = "0.00";
			}else{
				strtotalOpdCollection = df1.format(totalindentReceive);
			}
			
			PdfPCell opdc = new PdfPCell(new Phrase((strtotalOpdCollection + ""), tabletext));
			opdc.setHorizontalAlignment(Element.ALIGN_RIGHT);
			opdc.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(opdc);
			
			PdfPCell opdc1 = new PdfPCell(new Phrase((""), tabletext));
			opdc1.setHorizontalAlignment(Element.ALIGN_RIGHT);
			opdc1.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(opdc1);
			
			String strtotalOpdDuesCollection = "0.00";
			if(totalindentdues == 0.0 || totalindentdues == 0){
				strtotalOpdDuesCollection = "0.00";
			}else{
				strtotalOpdDuesCollection = df1.format(totalindentdues);
			}
			PdfPCell opddue = new PdfPCell(new Phrase((strtotalOpdDuesCollection + ""), tabletext));
			opddue.setHorizontalAlignment(Element.ALIGN_RIGHT);
			opddue.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(opddue);
			
			String strtotalOpdRefund = "0.00";
			if(totalindent == 0.0 || totalindent == 0){
				strtotalOpdRefund = "0.00";
			}else{
				strtotalOpdRefund = df1.format(totalindent);
			}
			PdfPCell opdr = new PdfPCell(new Phrase((strtotalOpdRefund + ""),tabletext));
			opdr.setHorizontalAlignment(Element.ALIGN_RIGHT);
			opdr.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(opdr);

			double opddiff = (Double.parseDouble(df1.format(totalindentReceive))+Double.parseDouble(df1.format(totalindentdues))); 
			
		 	String stropddiff = "0.00";
			if(opddiff == 0.0 || opddiff == 0){
				stropddiff = "0.00";
			}else{
				stropddiff = df1.format(opddiff);
			} 
			PdfPCell finaloc = new PdfPCell(new Phrase((stropddiff+""),
							tabletext));
			finaloc.setHorizontalAlignment(Element.ALIGN_RIGHT);
			finaloc.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(finaloc); 

			summaryHeaderTable.addCell(new Phrase("2.", tabletext));
			summaryHeaderTable.addCell(new Phrase("Patient Collection",
					tabletext));

			String strtotalDiagnoCollection = "0.00";
			if(totalPatientReceive == 0.0 || totalPatientReceive == 0){
				strtotalDiagnoCollection = "0.00";
			}else{
				strtotalDiagnoCollection = df1.format(totalPatientReceive);
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
			if(totalpatientdues == 0.0 || totalpatientdues == 0){
				strtotalDiagnoDuesCollection = "0.00";
			}else{
				strtotalDiagnoDuesCollection = df1.format(totalpatientdues);
			}
			
			PdfPCell dcdue = new PdfPCell(new Phrase((strtotalDiagnoDuesCollection + ""), tabletext));
			dcdue.setHorizontalAlignment(Element.ALIGN_RIGHT);
			dcdue.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(dcdue);

			String strtotalDiagnoRefund = "0.00";
			if(totalpatient == 0.0 || totalpatient == 0){
				strtotalDiagnoRefund = "0.00";
			}else{
				strtotalDiagnoRefund = df1.format(totalpatient);
			}
			PdfPCell dr = new PdfPCell(new Phrase((strtotalDiagnoRefund + ""), tabletext));
			dr.setHorizontalAlignment(Element.ALIGN_RIGHT);
			dr.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(dr);
			
			double diagdiff = (Double.parseDouble(df1.format(totalPatientReceive))+Double.parseDouble(df1.format(totalpatientdues)));
			
			String strdiagdiff = "0.00";
			if(diagdiff == 0.0 || diagdiff == 0){
				strdiagdiff = "0.00";
			}else{
				strdiagdiff = df1.format(diagdiff);
			}
			PdfPCell finaldc = new PdfPCell(new Phrase((strdiagdiff + ""),tabletext));
			finaldc.setHorizontalAlignment(Element.ALIGN_RIGHT);
			finaldc.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(finaldc);
 
		 	summaryHeaderTable.addCell(new Phrase("3.", tabletext));
			summaryHeaderTable.addCell(new Phrase("Counter Collection",
					tabletext));

			String strtotalIPDCollection = "0.00";
			if(totalcounter == 0.0 || totalcounter == 0){
				strtotalIPDCollection = "0.00";
			}else{
				strtotalIPDCollection = df1.format(totalcounter);
			}
			PdfPCell ipdc = new PdfPCell(new Phrase((strtotalIPDCollection + ""), tabletext));
			ipdc.setHorizontalAlignment(Element.ALIGN_RIGHT);
			ipdc.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(ipdc);
			
			PdfPCell ipdc11 = new PdfPCell(new Phrase((""), tabletext));
			ipdc11.setHorizontalAlignment(Element.ALIGN_RIGHT);
			ipdc11.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(ipdc11);
	
			PdfPCell ipddue = new PdfPCell(new Phrase(("-"), tabletext));
			ipddue.setHorizontalAlignment(Element.ALIGN_RIGHT);
			ipddue.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(ipddue);

			String strtotalIPDRefundCollection = "0.00";
			if(totalcounter == 0.0 || totalcounter == 0){
				strtotalIPDRefundCollection = "0.00";
			}else{
				strtotalIPDRefundCollection = df1.format(totalcounter);
			} 
			PdfPCell ipdr = new PdfPCell(new Phrase((strtotalIPDRefundCollection + ""), tabletext));
			ipdr.setHorizontalAlignment(Element.ALIGN_RIGHT);
			ipdr.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(ipdr);

			double ipddiff = (totalcounter);
			
			String stripddiff = "0.00";
			if(ipddiff == 0.0 || ipddiff == 0){
				stripddiff = "0.00";
			}else{
				stripddiff = df1.format(ipddiff);
			}
			PdfPCell finalipdc = new PdfPCell(new Phrase((stripddiff + ""), tabletext));
			finalipdc.setHorizontalAlignment(Element.ALIGN_RIGHT);
			finalipdc.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(finalipdc);
			
			
			/* summaryHeaderTable.addCell(new Phrase("4.", tabletext));
			summaryHeaderTable.addCell(new Phrase("Credit Collection",
					tabletext));
			
			PdfPCell ipdc12 = new PdfPCell(new Phrase(("-"), tabletext));
			ipdc12.setHorizontalAlignment(Element.ALIGN_RIGHT);
			ipdc12.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(ipdc12);

			String strtotalIPDCollection1 = "0.00";
			if(amountPayable == 0.0 || amountPayable == 0){
				strtotalIPDCollection1 = "0.00";
			}else{
				strtotalIPDCollection1 = df1.format(amountPayable);
			}
			PdfPCell ipdc1 = new PdfPCell(new Phrase((strtotalIPDCollection1 + ""), tabletext));
			ipdc1.setHorizontalAlignment(Element.ALIGN_RIGHT);
			ipdc1.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(ipdc1);
			
	
			PdfPCell ipddue1 = new PdfPCell(new Phrase(("-"), tabletext));
			ipddue1.setHorizontalAlignment(Element.ALIGN_RIGHT);
			ipddue1.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(ipddue1);

			String strtotalIPDRefundCollection1 = "0.00";
			if(totalRefundPatPharmacy == 0.0 || totalRefundPatPharmacy == 0){
				strtotalIPDRefundCollection1 = "0.00";
			}else{
				strtotalIPDRefundCollection1 = df1.format(totalRefundPatPharmacy);
			} 
			PdfPCell ipdr1 = new PdfPCell(new Phrase((strtotalIPDRefundCollection1 + ""), tabletext));
			ipdr1.setHorizontalAlignment(Element.ALIGN_RIGHT);
			ipdr1.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(ipdr1);

			double ipddiff1 = (amountPayable);
			
			String stripddiff1 = "0.00";
			if(ipddiff1 == 0.0 || ipddiff1 == 0){
				stripddiff1 = "0.00";
			}else{
				stripddiff1 = df1.format(ipddiff1);
			}
			PdfPCell finalipdc1 = new PdfPCell(new Phrase((stripddiff1 + ""), tabletext));
			finalipdc1.setHorizontalAlignment(Element.ALIGN_RIGHT);
			finalipdc1.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(finalipdc1); */
 
			float totalPharmacyCollection = (totalcounter + totalindent +  totalpatient);
			 DecimalFormat df = new DecimalFormat("#.00");
		

			/* summaryHeaderTable.addCell(new Phrase("4.", tabletext));
			summaryHeaderTable.addCell(new Phrase("Pharmacy Collection",tabletext));
			
			DecimalFormat decimalFormat=new DecimalFormat("##.#");
			
			String strtotalPharmacyCollection = "0.00";
			if(totalPharmacyCollection == 0.0 || totalPharmacyCollection == 0){
				strtotalPharmacyCollection = "0.00";
			}else{
				strtotalPharmacyCollection = df1.format(totalPharmacyCollection);
			}
			PdfPCell pc = new PdfPCell(new Phrase("" + strtotalPharmacyCollection, tabletext));
			pc.setHorizontalAlignment(Element.ALIGN_RIGHT);
			pc.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(pc);
			
			String strpharmadue = "0.00";
			double phdueamt = totalindentdues + totalpatientdues;
			if(phdueamt == 0.0 || phdueamt == 0){
				strpharmadue = "0.00";
			}else{
				strpharmadue = df1.format(phdueamt);
			}
			PdfPCell pcdues = new PdfPCell(new Phrase(("" + strpharmadue), tabletext));
			pcdues.setHorizontalAlignment(Element.ALIGN_RIGHT);
			pcdues.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(pcdues);
			
			String strtotalRefundPatPharmacy = "0.00";
			if(totalRefundPatPharmacy == 0.0 || totalRefundPatPharmacy == 0){
				strtotalRefundPatPharmacy = "0.00";
			}else{
				strtotalRefundPatPharmacy = df1.format(totalRefundPatPharmacy);
			}
			PdfPCell pr = new PdfPCell(new Phrase(("" + strtotalRefundPatPharmacy), tabletext));
			pr.setHorizontalAlignment(Element.ALIGN_RIGHT);
			pr.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(pr);

			double pharmadiff = (totalPharmacyCollection + totalindentdues + totalpatientdues) - totalRefundPatPharmacy;
			
			String strpharmadiff = "0.00";
			if(pharmadiff == 0.0 || pharmadiff == 0){
				strpharmadiff = "0.00";
			}else{
				strpharmadiff = df1.format(pharmadiff);
			}
			PdfPCell finalpc = new PdfPCell(new Phrase(("" + strpharmadiff),
							tabletext));
			finalpc.setHorizontalAlignment(Element.ALIGN_RIGHT);
			finalpc.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(finalpc); */
			
			/* summaryHeaderTable.addCell(new Phrase("5.", tabletext));
			summaryHeaderTable.addCell(new Phrase("Common Advance Collection",
					tabletext));
			String strtotalComAdvCollection = "0.00";
			if(totalComAdvCollection == 0.0 || totalComAdvCollection == 0){
				strtotalComAdvCollection = "0.00";
			}else{
				strtotalComAdvCollection = df1.format(totalComAdvCollection);
			}
			PdfPCell capc = new PdfPCell(new Phrase(("" + strtotalComAdvCollection), tabletext));
			capc.setHorizontalAlignment(Element.ALIGN_RIGHT);
			capc.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(capc);
			
			PdfPCell capcdues = new PdfPCell(new Phrase(("---"), tabletext));
			capcdues.setHorizontalAlignment(Element.ALIGN_RIGHT);
			capcdues.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(capcdues);
			
			String strtotalComAdvRefund = "0.00";
			if(totalComAdvRefund == 0.0 || totalComAdvRefund == 0){
				strtotalComAdvRefund = "0.00";
			}else{
				strtotalComAdvRefund = df1.format(totalComAdvRefund);
			}
			PdfPCell capr = new PdfPCell(new Phrase(("" + strtotalComAdvRefund), tabletext));
			capr.setHorizontalAlignment(Element.ALIGN_RIGHT);
			capr.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(capr);

			double comdiff = totalComAdvCollection - totalComAdvRefund;
			
			String strcomdiff = "0.00";
			if(comdiff == 0.0 || comdiff == 0){
				strcomdiff = "0.00";
			}else{
				strcomdiff = df1.format(comdiff);
			}
			PdfPCell cafinalpc = new PdfPCell(new Phrase(("" + strcomdiff), tabletext));
			cafinalpc.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cafinalpc.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(cafinalpc);

			document.add(summaryHeaderTable);
			summaryHeaderTable.flushContent();
 */
 double pharmadiff = (totalPharmacyCollection + totalindentdues + totalpatientdues);
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
			double finalAllCFloat = (Double.parseDouble((df1.format(totalindentReceive)))
					  + (Double.parseDouble(df1.format(totalPatientReceive)))+(Double.parseDouble(df1.format(totalcounter))));

			PdfPCell finalAllC = new PdfPCell(new Phrase(
					("" + df1.format(finalAllCFloat)), subheader));
			finalAllC.setHorizontalAlignment(Element.ALIGN_RIGHT);
			finalAllC.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(finalAllC);
			
			/* double finalAllCFloat1 = (amountPayable); */
			PdfPCell finalAllC1 = new PdfPCell(new Phrase(
					(""), subheader));
			finalAllC1.setHorizontalAlignment(Element.ALIGN_RIGHT);
			finalAllC1.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(finalAllC1);
			
			
			// final dues total (ipd, opd, diagnosis, pharmacy,common advance)
			float finalAllDuesFloat = (totalindentdues + totalpatientdues );

			PdfPCell finalAllCDues = new PdfPCell(new Phrase(
					("" + df1.format(finalAllDuesFloat)), subheader));
			finalAllCDues.setHorizontalAlignment(Element.ALIGN_RIGHT);
			finalAllCDues.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(finalAllCDues);
			

			// final refund total (ipd, opd, diagnosis, pharmacy, common advance)
			double finalAllRFloat = (Double.parseDouble(df1.format(totalindent))
					+(Double.parseDouble(df1.format(totalpatient)))+(Double.parseDouble(df1.format(totalcounter))));

			PdfPCell finalAllR = new PdfPCell(new Phrase(
					("" + df1.format(finalAllRFloat)), subheader));
			finalAllR.setHorizontalAlignment(Element.ALIGN_RIGHT);
			finalAllR.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(finalAllR);
			
			/*
				PdfPCell finalAllR = new PdfPCell(new Phrase(
					("" + decimalFormat.format(finalAllRFloat) ), subheader));
			*/

			// finally collected amount
			double finalAllTFloat = (Double.parseDouble(df1.format(totalindentReceive))+Double.parseDouble(df1.format(totalindentdues))+Double.parseDouble(df1.format(totalPatientReceive))+Double.parseDouble(df1.format(totalpatientdues))+Double.parseDouble(df1.format(totalcounter)));
			
			System.out.println("final collection------------->"+finalAllRFloat);

			PdfPCell finalAllT = new PdfPCell(new Phrase(
					("" + df1.format(finalAllTFloat)), subheader));
			finalAllT.setHorizontalAlignment(Element.ALIGN_RIGHT);
			finalAllT.setBorder(Rectangle.NO_BORDER);
			summaryHeaderTable.addCell(finalAllT);

			
			document.add(summaryHeaderTable);
			summaryHeaderTable.flushContent();

			PdfPTable paymentHeader = new PdfPTable(9);
			int[] paymentHeaderWidth = { 6, 14, 20, 38, 13,17,13,18,15};
			paymentHeader.setWidths(paymentHeaderWidth);
			paymentHeader.setWidthPercentage(95f);
			paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			// UI: start opd
			paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
		
			int headerCount = 0;
			/* rsOpdPayment.beforeFirst();
			while (rsOpdPayment.next()) {

				headerCount = (headerCount + 1);

				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL OPD COLLECTION", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("PID", subheader));
					paymentHeader.addCell(new Phrase("Opd no.", subheader));
					paymentHeader.addCell(new Phrase("Name", subheader));
					paymentHeader
							.addCell(new Phrase("Adm. date", subheader));
					paymentHeader.addCell(new Phrase("Age/Gender", subheader));
					paymentHeader
							.addCell(new Phrase("Rec. No.", subheader));
					
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Paid Amt.", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_RIGHT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
					
					paymentHeader.addCell(new Phrase("Mode/Rec. Date",
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

					document.add(paymentHeader);
					paymentHeader.flushContent();

				}

				paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);

				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsOpdPayment.getInt("Patient_ID"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsOpdPayment.getString("treatmentCount"),
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsOpdPayment.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsOpdPayment.getString("TstartDate"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ (rsOpdPayment.getString("age") + " Yrs")
						+ ("/" + (((((rsOpdPayment.getString("sex")))
								.trim()).equalsIgnoreCase("Male")) ? "M"
								: "F")), tabletext));
				
				paymentHeader.addCell(new Phrase(""+ rsOpdPayment.getInt("idopd_receipt_master"),tabletext));
				double amt = rsOpdPayment.getFloat("paid_amount");
				String finalamt = "0.00";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.00";
				}else{
					finalamt = df1.format(amt);
				}
				PdfPCell rsOpd = new PdfPCell(new Phrase(("" +finalamt ), tabletext));
				rsOpd.setHorizontalAlignment(Element.ALIGN_RIGHT);
				rsOpd.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rsOpd); 
				
				paymentHeader.addCell(new Phrase(""+ (rsOpdPayment	.getString("payMode") + "/" + (rsOpdPayment
													.getString("recDate"))),
								tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent();

			} */
			// opd : dues
			/* paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
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
 */
			headerCount = 0;
 /* 	    rsOpdDues.beforeFirst();
			while (rsOpdDues.next()) {

				headerCount = (headerCount + 1);

				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL OPD DUES COLLECTION", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("PID", subheader));
					paymentHeader.addCell(new Phrase("Opd no.", subheader));
					paymentHeader.addCell(new Phrase("Name", subheader));
					paymentHeader
							.addCell(new Phrase("Adm. date", subheader));
					paymentHeader.addCell(new Phrase("Age/Gender", subheader));
					paymentHeader
							.addCell(new Phrase("Rec. No.", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Paid Amt.", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_RIGHT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
					paymentHeader.addCell(new Phrase("Mode/Rec. Date",
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

					document.add(paymentHeader);
					paymentHeader.flushContent();

				}

				paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);

				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsOpdDues.getInt("Patient_ID"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsOpdDues.getString("treatmentCount"),
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsOpdDues.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsOpdDues.getString("TstartDate"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ (rsOpdDues.getString("age") + " Yrs")
						+ ("/" + (((((rsOpdDues.getString("sex")))
								.trim()).equalsIgnoreCase("Male")) ? "M"
								: "F")), tabletext));
				paymentHeader.addCell(new Phrase(""+ rsOpdDues.getInt("idopd_receipt_master"),tabletext));
				
				//paymentHeader.addCell(new Phrase(""+ rsOpdDues.getFloat("paid_amount"), tabletext));
				double amt = rsOpdDues.getFloat("paid_amount");
				String finalamt = "0.00";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.00";
				}else{
					finalamt = df1.format(amt);
				}
				PdfPCell rsOpddue = new PdfPCell(new Phrase(("" + finalamt), tabletext));
				rsOpddue.setHorizontalAlignment(Element.ALIGN_RIGHT);
				rsOpddue.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rsOpddue); 
				
				paymentHeader.addCell(new Phrase(""+ (rsOpdDues
												.getString("payMode") + "/" + (rsOpdDues
													.getString("recDate"))),
								tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent();

			}
 */
			// refund: start: opd
			/* paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
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
			paymentHeader.flushContent(); */

			headerCount = 0;
			/*	rsOpdRefund.beforeFirst();
		 	while (rsOpdRefund.next()) {

				headerCount = (headerCount + 1);

				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL OPD REFUND", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("PID", subheader));
					paymentHeader.addCell(new Phrase("Opd no.", subheader));
					paymentHeader.addCell(new Phrase("Name", subheader));
					paymentHeader
							.addCell(new Phrase("Adm. date", subheader));
					paymentHeader.addCell(new Phrase("Age/Gender", subheader));
					paymentHeader
							.addCell(new Phrase("Rec. No.", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Paid Amt.", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_RIGHT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
					paymentHeader.addCell(new Phrase("Mode/Rec. Date",
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

					document.add(paymentHeader);
					paymentHeader.flushContent();

				}

				paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);

				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsOpdRefund.getInt("Patient_ID"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsOpdRefund.getString("treatmentCount"),
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsOpdRefund.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsOpdRefund.getString("TstartDate"), tabletext));
				paymentHeader
						.addCell(new Phrase(
								""
										+ (rsOpdRefund.getString("age") + " Yrs")
										+ ("/" + (((((rsOpdRefund
												.getString("sex"))).trim())
												.equalsIgnoreCase("Male")) ? "M"
												: "F")), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsOpdRefund.getInt("idRefundReceiptDetails"),
						tabletext));
			
				double amt = rsOpdRefund.getFloat("amount");
				String finalamt = "0.00";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.00";
				}else{
					finalamt = df1.format(amt);
				}
				PdfPCell rsOpdref = new PdfPCell(new Phrase(("" + finalamt), tabletext));
				rsOpdref.setHorizontalAlignment(Element.ALIGN_RIGHT);
				rsOpdref.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rsOpdref); 
				
				paymentHeader.addCell(new Phrase(
						""
								+ (rsOpdRefund.getString("payment_mode")
										+ "/" + (rsOpdRefund
											.getString("rec_date"))),
						tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent();

			}
 */			// refund: end: opd
			// UI: end opd

			// UI: start diagno
			// diag : collection
		/* 	paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
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
 */
			// new page
			// document.newPage();

			headerCount = 0;
			/* rsDiagnoPayment.beforeFirst();
			while (rsDiagnoPayment.next()) {

				headerCount = (headerCount + 1);

				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL DIAGNOSTICS COLLECTION", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("PID", subheader));
					paymentHeader.addCell(new Phrase("Diagnosis no.",
							subheader));
					paymentHeader.addCell(new Phrase("Name", subheader));
					paymentHeader
							.addCell(new Phrase("Adm. date", subheader));
					paymentHeader.addCell(new Phrase("Age/Gender", subheader));
					paymentHeader
							.addCell(new Phrase("Rec. No.", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Paid Amt.", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_RIGHT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
					paymentHeader.addCell(new Phrase("Mode/Rec. Date",
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

					document.add(paymentHeader);
					paymentHeader.flushContent();

				}

				paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);

				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsDiagnoPayment.getInt("Patient_ID"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsDiagnoPayment.getString("treatmentCount"),
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsDiagnoPayment.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsDiagnoPayment.getString("TstartDate"),
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ (rsDiagnoPayment.getString("age") + " Yrs")
						+ ("/" + (((((rsDiagnoPayment.getString("sex")))
								.trim()).equalsIgnoreCase("Male")) ? "M"
								: "F")), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsDiagnoPayment.getInt("idopd_receipt_master"),
						tabletext));
				
				paymentHeader.addCell(new Phrase(""
						+ rsDiagnoPayment.getFloat("paid_amount"),
						tabletext)); 
						
				double amt = rsDiagnoPayment.getFloat("paid_amount");
				String finalamt = "0.00";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.00";
				}else{
					finalamt = df1.format(amt);
				}
				
				PdfPCell rsDiag = new PdfPCell(new Phrase(("" + finalamt), tabletext));
				rsDiag.setHorizontalAlignment(Element.ALIGN_RIGHT);
				rsDiag.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rsDiag); 
				
				paymentHeader.addCell(new Phrase(
						""
								+ (rsDiagnoPayment.getString("payMode")
										+ "/" + (rsDiagnoPayment
											.getString("recDate"))),
						tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent();

			}
			 */
			// diag : Dues
		/* 	paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
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
			paymentHeader.flushContent(); */

			// new page
			// document.newPage();

			headerCount = 0;
			/* rsDiagnoDues.beforeFirst();
			while (rsDiagnoDues.next()) {

				headerCount = (headerCount + 1);

				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL DIAGNOSTICS DUES COLLECTION", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("PID", subheader));
					paymentHeader.addCell(new Phrase("Diagnosis no.",
							subheader));
					paymentHeader.addCell(new Phrase("Name", subheader));
					paymentHeader
							.addCell(new Phrase("Adm. date", subheader));
					paymentHeader.addCell(new Phrase("Age/Gender", subheader));
					paymentHeader
							.addCell(new Phrase("Rec. No.", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Paid Amt.", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_RIGHT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
					paymentHeader.addCell(new Phrase("Mode/Rec. Date",
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

					document.add(paymentHeader);
					paymentHeader.flushContent();

				}

				paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);

				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsDiagnoDues.getInt("Patient_ID"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsDiagnoDues.getString("treatmentCount"),
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsDiagnoDues.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsDiagnoDues.getString("TstartDate"),
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ (rsDiagnoDues.getString("age") + " Yrs")
						+ ("/" + (((((rsDiagnoDues.getString("sex")))
								.trim()).equalsIgnoreCase("Male")) ? "M"
								: "F")), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsDiagnoDues.getInt("idopd_receipt_master"),
						tabletext));
				
			
				double amt = rsDiagnoDues.getFloat("paid_amount");
				String finalamt = "0.00";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.00";
				}else{
					finalamt = df1.format(amt);
				}
				
				PdfPCell rsDiag = new PdfPCell(new Phrase(("" + finalamt), tabletext));
				rsDiag.setHorizontalAlignment(Element.ALIGN_RIGHT);
				rsDiag.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rsDiag); 
				
				paymentHeader.addCell(new Phrase(
						""
								+ (rsDiagnoDues.getString("payMode")
										+ "/" + (rsDiagnoDues
											.getString("recDate"))),
						tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent();

			} */

			// refund: start: diagno

			/* paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
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
			paymentHeader.flushContent(); */

			// new page
			// document.newPage();

			headerCount = 0;
			/* 	rsDiagnoRefund.beforeFirst();
			while (rsDiagnoRefund.next()) {

				headerCount = (headerCount + 1);

				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL DIAGNOSTICS REFUND", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("PID", subheader));
					paymentHeader.addCell(new Phrase("Diagnosis no.",
							subheader));
					paymentHeader.addCell(new Phrase("Name", subheader));
					paymentHeader
							.addCell(new Phrase("Adm. date", subheader));
					paymentHeader.addCell(new Phrase("Age/Gender", subheader));
					paymentHeader
							.addCell(new Phrase("Rec. No.", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Paid Amt.", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_RIGHT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
					paymentHeader.addCell(new Phrase("Mode/Rec. Date",
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

					document.add(paymentHeader);
					paymentHeader.flushContent();

				}

				paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);

				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsDiagnoRefund.getInt("Patient_ID"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsDiagnoRefund.getString("treatmentCount"),
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsDiagnoRefund.getString("pName"), tabletext));
				paymentHeader
						.addCell(new Phrase(""
								+ rsDiagnoRefund.getString("TstartDate"),
								tabletext));
				paymentHeader.addCell(new Phrase(""
						+ (rsDiagnoRefund.getString("age") + " Yrs")
						+ ("/" + (((((rsDiagnoRefund.getString("sex")))
								.trim()).equalsIgnoreCase("Male")) ? "M"
								: "F")), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsDiagnoRefund
								.getInt("iddiagnosis_refund_receipt"),
						tabletext));
				
				double amt = rsDiagnoRefund.getFloat("amount");
				String finalamt = "0.00";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.00";
				}else{
					finalamt = df1.format(amt);
				}
				
				PdfPCell rsDiag = new PdfPCell(new Phrase(("" + finalamt), tabletext));
				rsDiag.setHorizontalAlignment(Element.ALIGN_RIGHT);
				rsDiag.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rsDiag); 
				
				
				paymentHeader.addCell(new Phrase(
						""
								+ (rsDiagnoRefund.getString("payment_mode")
										+ "/" + (rsDiagnoRefund
											.getString("rec_date"))),
						tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent();

			} */
			// refund: end: diagno
			// UI: end diagno

			// UI: start ipd
/* 
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
 */
			// new page
			// document.newPage();

			headerCount = 0;
			/* 	rsIpdPay.beforeFirst();
			while (rsIpdPay.next()) {

				headerCount = (headerCount + 1);

				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL IPD COLLECTION", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("PID", subheader));
					paymentHeader.addCell(new Phrase("IPD no.", subheader));
					paymentHeader.addCell(new Phrase("Name", subheader));
					paymentHeader
							.addCell(new Phrase("Adm. date", subheader));
					paymentHeader.addCell(new Phrase("Age/Gender", subheader));
					paymentHeader
							.addCell(new Phrase("Rec. No.", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Paid Amt.", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_RIGHT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
					paymentHeader.addCell(new Phrase("Mode/Rec. Date",
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

					document.add(paymentHeader);
					paymentHeader.flushContent();

				}

				paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);

				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsIpdPay.getInt("Patient_ID"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsIpdPay.getString("treatmentCount"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsIpdPay.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsIpdPay.getString("TstartDate"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ (rsIpdPay.getString("age") + " Yrs")
						+ ("/" + (((((rsIpdPay.getString("sex"))).trim())
								.equalsIgnoreCase("Male")) ? "M" : "F")),
						tabletext));
				paymentHeader
						.addCell(new Phrase(""
								+ rsIpdPay.getInt("bill_advance_amt_id"),
								tabletext));
			
				
				double amt = rsIpdPay.getFloat("amount");
				String finalamt = "0.00";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.00";
				}else{
					finalamt = df1.format(amt);
				}
				
				PdfPCell rsDiag = new PdfPCell(new Phrase(("" + finalamt), tabletext));
				rsDiag.setHorizontalAlignment(Element.ALIGN_RIGHT);
				rsDiag.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rsDiag); 
				
				paymentHeader.addCell(new Phrase(""
						+ (rsIpdPay.getString("payMode") + "/" + (rsIpdPay
								.getString("date"))), tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent();

			} */
			// ipd : dues
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

			// new page
			// document.newPage();

			headerCount = 0;
			/*	rsIpdDues.beforeFirst();
			 while (rsIpdDues.next()) {

				headerCount = (headerCount + 1);

				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL IPD DUES COLLECTION", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("PID", subheader));
					paymentHeader.addCell(new Phrase("IPD no.", subheader));
					paymentHeader.addCell(new Phrase("Name", subheader));
					paymentHeader
							.addCell(new Phrase("Adm. date", subheader));
					paymentHeader.addCell(new Phrase("Age/Gender", subheader));
					paymentHeader
							.addCell(new Phrase("Rec. No.", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Paid Amt.", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_RIGHT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
					paymentHeader.addCell(new Phrase("Mode/Rec. Date",
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

					document.add(paymentHeader);
					paymentHeader.flushContent();

				}

				paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);

				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsIpdDues.getInt("Patient_ID"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsIpdDues.getString("treatmentCount"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsIpdDues.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsIpdDues.getString("TstartDate"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ (rsIpdDues.getString("age") + " Yrs")
						+ ("/" + (((((rsIpdDues.getString("sex"))).trim())
								.equalsIgnoreCase("Male")) ? "M" : "F")),
						tabletext));
				paymentHeader
						.addCell(new Phrase(""
								+ rsIpdDues.getInt("bill_advance_amt_id"),
								tabletext));
			
				double amt = rsIpdDues.getFloat("amount");
				String finalamt = "0.00";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.00";
				}else{
					finalamt = df1.format(amt);
				}
				
				PdfPCell rsDiag = new PdfPCell(new Phrase(("" + finalamt), tabletext));
				rsDiag.setHorizontalAlignment(Element.ALIGN_RIGHT);
				rsDiag.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rsDiag); 
				
				paymentHeader.addCell(new Phrase(""
						+ (rsIpdDues.getString("payMode") + "/" + (rsIpdDues
								.getString("date"))), tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent();

			} */

			// ipd: start: refund
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

			// new page
			// document.newPage();

			headerCount = 0;
		/*	rsIPDRefund.beforeFirst();
		 	while (rsIPDRefund.next()) {

				headerCount = (headerCount + 1);

				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL IPD REFUND", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("PID", subheader));
					paymentHeader.addCell(new Phrase("IPD no.", subheader));
					paymentHeader.addCell(new Phrase("Name", subheader));
					paymentHeader
							.addCell(new Phrase("Adm. date", subheader));
					paymentHeader.addCell(new Phrase("Age/Gender", subheader));
					paymentHeader
							.addCell(new Phrase("Rec. No.", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Paid Amt.", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_RIGHT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
					paymentHeader.addCell(new Phrase("Mode/Rec. Date",
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

					document.add(paymentHeader);
					paymentHeader.flushContent();

				}

				paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);

				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsIPDRefund.getInt("Patient_ID"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsIPDRefund.getString("treatmentCount"),
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsIPDRefund.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsIPDRefund.getString("TstartDate"), tabletext));
				paymentHeader
						.addCell(new Phrase(
								""
										+ (rsIPDRefund.getString("age") + " Yrs")
										+ ("/" + (((((rsIPDRefund
												.getString("sex"))).trim())
												.equalsIgnoreCase("Male")) ? "M"
												: "F")), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsIPDRefund.getInt("bill_advance_amt_id"),
						tabletext));
		
				double amt = rsIPDRefund.getFloat("amount");
				String finalamt = "0.00";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.00";
				}else{
					finalamt = df1.format(amt);
				}
				
				PdfPCell rsDiag = new PdfPCell(new Phrase(("" + finalamt), tabletext));
				rsDiag.setHorizontalAlignment(Element.ALIGN_RIGHT);
				rsDiag.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rsDiag); 
				
				paymentHeader
						.addCell(new Phrase(
								""
										+ (rsIPDRefund.getString("payMode")
												+ "/" + (rsIPDRefund
													.getString("date"))),
								tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent();

			}
 */
			// UI: end ipd

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

			document.add(paymentHeader);
			paymentHeader.flushContent();

			// new page
			// document.newPage();

			headerCount = 0;
			rsindent.beforeFirst();
			while (rsindent.next()) {

				headerCount = (headerCount + 1);

				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL PHARMACY INDENT COLLECTION", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("Invoice No", subheader));
					paymentHeader
							.addCell(new Phrase("PID", subheader));
					paymentHeader.addCell(new Phrase("Patient Name", subheader));
					paymentHeader
							.addCell(new Phrase("Date", subheader));
					paymentHeader.addCell(new Phrase("Amount Receive", subheader));
					paymentHeader
							.addCell(new Phrase("Amount Balance", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Total Amt", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_LEFT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
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

					document.add(paymentHeader);
					paymentHeader.flushContent();

				}

				paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);

				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase("IS"
						+ rsindent.getInt("ID"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsindent.getString("Patient_ID"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsindent.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsindent.getString("recDate"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsindent.getString("amount"), tabletext));
				paymentHeader.addCell(new Phrase(
						"" + rsindent.getFloat("balance"), tabletext));
				/* paymentHeader.addCell(new Phrase(""
						+ rsindent.getFloat("amount"), tabletext)); */
				
				double amt = rsindent.getFloat("net");
				String finalamt = "0.00";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.00";
				}else{
					finalamt = df2.format(amt);
				}
				
				PdfPCell rspharma = new PdfPCell(new Phrase(("" + rsindent.getFloat("net")), tabletext));
				rspharma.setHorizontalAlignment(Element.ALIGN_LEFT);
				rspharma.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rspharma); 
				
				paymentHeader.addCell(new Phrase(""
						+ (rsindent.getString("payMode")), tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent();

			}
			// pharmacy:end:indent

			
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

			document.add(paymentHeader);
			paymentHeader.flushContent();

			// new page
			// document.newPage();

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
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader
							.addCell(new Phrase("Amount Receive", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Amount Balance", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_LEFT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
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
				paymentHeader.addCell(new Phrase(""
						,
						tabletext));
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
				
				paymentHeader.addCell(new Phrase("Cash", tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent();
 
			}
			// pharmacy:end:indent dues
			
			// pharmacy:start:indent sale dues
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

			// new page
			// document.newPage();
			
			if(indentsalecount > 0){
			headerCount = 0;
			/* rsPharmaIndentSaleDues.beforeFirst();
			while (rsPharmaIndentSaleDues.next()) {

				headerCount = (headerCount + 1);
				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL PHARMACY INDENT SALE DUES COLLECTED IN INDENT COLLECTION", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("PID", subheader));
					paymentHeader
							.addCell(new Phrase("Adm. no.", subheader));
					paymentHeader.addCell(new Phrase("Name", subheader));
					paymentHeader
							.addCell(new Phrase("Adm. date", subheader));
					paymentHeader.addCell(new Phrase("Age/Gender", subheader));
					paymentHeader
							.addCell(new Phrase("Rec. No.", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Paid Amt.", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_RIGHT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
					paymentHeader.addCell(new Phrase("Mode/Rec. Date",
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

					document.add(paymentHeader);
					paymentHeader.flushContent();

				}
				if(rsPharmaIndentSaleDues.getFloat("indent_sale_amt_receive") > 
				rsPharmaIndentSaleDues.getFloat("indent_sale_net_amt")){
				paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);
				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaIndentSaleDues.getInt("Patient_ID"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaIndentSaleDues.getString("treatmentCount"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaIndentSaleDues.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaIndentSaleDues.getString("TstartDate"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ (rsPharmaIndentSaleDues.getString("age") + " Yrs")
						+ ("/" + (((((rsPharmaIndentSaleDues.getString("sex"))).trim())
								.equalsIgnoreCase("Male")) ? "M" : "F")),
						tabletext));
				paymentHeader.addCell(new Phrase(
						"" + rsPharmaIndentSaleDues.getInt("indent_sale_id"), tabletext));
				
				double amt = rsPharmaIndentSaleDues.getFloat("indent_sale_amt_receive") - rsPharmaIndentSaleDues.getFloat("indent_sale_net_amt");
				String finalamt = "0.000";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.000";
				}else{
					finalamt = df2.format(amt);
				}
				
				PdfPCell rspharma = new PdfPCell(new Phrase(("" + finalamt), tabletext));
				rspharma.setHorizontalAlignment(Element.ALIGN_RIGHT);
				rspharma.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rspharma); 
				
				
				paymentHeader.addCell(new Phrase("Cash" + "/" + (rsPharmaIndentSaleDues
								.getString("indent_sale_received_date")), tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent();
				
				}
			} */
		}
			// pharmacy:end:indent sale dues
			
			// pharmacy:start:hospital
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

			// new page
			// document.newPage();

			headerCount = 0;
			rshospital.beforeFirst();
			while (rshospital.next()) {

				headerCount = (headerCount + 1);

				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL PHARMACY HOSPITAL COLLECTION", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("Invoice No", subheader));
					paymentHeader
							.addCell(new Phrase("PID", subheader));
					paymentHeader.addCell(new Phrase("Patient Name", subheader));
					paymentHeader
							.addCell(new Phrase("Date", subheader));
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader
							.addCell(new Phrase("Order No.", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Total Amt", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_LEFT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
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

					document.add(paymentHeader);
					paymentHeader.flushContent();

				}

				 paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);

				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rshospital.getInt("ID"), tabletext));
				paymentHeader
						.addCell(new Phrase(""
								+ rshospital.getString("Patient_ID"),
								tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rshospital.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rshospital.getString("recDate"), tabletext));
				paymentHeader.addCell(new Phrase("", tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rshospital.getString("orderNo"),
						tabletext));
			
				double amt = rshospital.getFloat("amount");
				String finalamt = "0.000";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.000";
				}else{
					finalamt = df2.format(amt);
				}
				
				PdfPCell rspharma = new PdfPCell(new Phrase(("" + finalamt), tabletext));
				rspharma.setHorizontalAlignment(Element.ALIGN_LEFT);
				rspharma.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rspharma); 
				
				paymentHeader
						.addCell(new Phrase(
								""+ (rshospital.getString("payMode")),tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent(); 

			}
			// pharmacy:end:hospital

			// pharmacy:start:patient
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

			// new page
			// document.newPage();

			headerCount = 0;
			rspatient.beforeFirst();
			while (rspatient.next()) {

				headerCount = (headerCount + 1);

				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL PHARMACY PATIENT COLLECTION", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("Invoice No", subheader));
					paymentHeader
							.addCell(new Phrase("PID", subheader));
					paymentHeader.addCell(new Phrase("Patient Name", subheader));
					paymentHeader
							.addCell(new Phrase("Date", subheader));
					paymentHeader.addCell(new Phrase("Amount Receive", subheader));
					paymentHeader
							.addCell(new Phrase("Amount Balance", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Total Amt", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_LEFT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
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

					document.add(paymentHeader);
					paymentHeader.flushContent();

				}

				paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);

				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase("PS"
						+ rspatient.getInt("ID"), tabletext));
				paymentHeader
						.addCell(new Phrase(""
								+ rspatient.getString("Patient_ID"),
								tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rspatient.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rspatient.getString("recDate"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rspatient.getString("amount"),
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rspatient.getFloat("balance"), tabletext));
				/* paymentHeader.addCell(new Phrase(""
						+ rspatient.getFloat("amount"), tabletext)); */
				
				double amt = rspatient.getFloat("net");
				String finalamt = "0.000";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.000";
				}else{
					finalamt = df2.format(amt);
				}
				
				PdfPCell rspharma = new PdfPCell(new Phrase(("" + finalamt), tabletext));
				rspharma.setHorizontalAlignment(Element.ALIGN_LEFT);
				rspharma.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rspharma); 
				paymentHeader
						.addCell(new Phrase(""+ (rspatient.getString("payMode")),
								tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent();

			}
			// pharmacy:end:patient

			// pharmacy:start:patient dues
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
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader
							.addCell(new Phrase("Amount Receive", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Amount Balance", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_LEFT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
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
				paymentHeader.addCell(new Phrase("",tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaPatientDues.getFloat("amount_receive"), tabletext));
				
				double amt = rsPharmaPatientDues.getFloat("amount_balance");
				String finalamt = "0.000";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.000";
				}else{
					finalamt = df2.format(amt);
				}
				
				PdfPCell rspharma = new PdfPCell(new Phrase(("" +rsPharmaPatientDues.getFloat("amount_balance")), tabletext));
				rspharma.setHorizontalAlignment(Element.ALIGN_LEFT);
				rspharma.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rspharma); 
				
				paymentHeader.addCell(new Phrase("Cash",tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent();

			}
			// pharmacy:end:patient dues
			
			// pharmacy:start:patient sale dues
			
			System.out.print("ssss size is"+rsPharmaPatientSaleDues);
			/* while (rsPharmaPatientSaleDues.next()) {
				
				System.err.println("rsPharmaPatientSaleDues: " + rsPharmaPatientSaleDues.getFloat("patient_sales_bill_amount_received"));
				if(rsPharmaPatientSaleDues.getFloat("patient_sales_bill_amount_received") > rsPharmaPatientSaleDues.getFloat("patient_sales_bill_net_amt")){
					patientsalecount++;
				}
			} */
			
			if(patientsalecount > 0){
			headerCount = 0;
			/* rsPharmaPatientSaleDues.beforeFirst();
			while (rsPharmaPatientSaleDues.next()) {

				headerCount = (headerCount + 1);

				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL PHARMACY PATIENT SALE DUES COLLECTED IN PATIENT COLLECTION", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("PID", subheader));
					paymentHeader
							.addCell(new Phrase("Adm. no.", subheader));
					paymentHeader.addCell(new Phrase("Name", subheader));
					paymentHeader
							.addCell(new Phrase("Adm. date", subheader));
					paymentHeader.addCell(new Phrase("Age/Gender", subheader));
					paymentHeader
							.addCell(new Phrase("Rec. No.", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Paid Amt.", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_RIGHT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
					paymentHeader.addCell(new Phrase("Mode/Rec. Date",
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

					document.add(paymentHeader);
					paymentHeader.flushContent();

				}
				if(rsPharmaPatientSaleDues.getFloat("patient_sales_bill_amount_received") > 
					rsPharmaPatientSaleDues.getFloat("patient_sales_bill_net_amt")){
					
				paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);
				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaPatientSaleDues.getInt("Patient_ID"), tabletext));
				paymentHeader
						.addCell(new Phrase(""
								+ rsPharmaPatientSaleDues.getString("treatmentCount"),
								tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaPatientSaleDues.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaPatientSaleDues.getString("TstartDate"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ (rsPharmaPatientSaleDues.getString("age") + " Yrs")
						+ ("/" + (((((rsPharmaPatientSaleDues.getString("sex"))).trim())
								.equalsIgnoreCase("Male")) ? "M" : "F")),
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsPharmaPatientSaleDues.getInt("patient_sales_bill_id"), tabletext));
				
				double amt = rsPharmaPatientSaleDues.getFloat("patient_sales_bill_amount_received") - rsPharmaPatientSaleDues.getFloat("patient_sales_bill_net_amt");
				String finalamt = "0.000";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.000";
				}else{
					finalamt = df2.format(amt);
				}
				
				PdfPCell rspharma = new PdfPCell(new Phrase(("" + finalamt), tabletext));
				rspharma.setHorizontalAlignment(Element.ALIGN_RIGHT);
				rspharma.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rspharma);
				
				paymentHeader.addCell(new Phrase("Cash"+ "/" + (rsPharmaPatientSaleDues
													.getString("patient_bill_date")),tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent();
				}
			} */
		}
			// pharmacy:end:patient sale dues
			
			
			// pharmacy:start:counter
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

			// new page
			// document.newPage();

			headerCount = 0;
			rscounter.beforeFirst();
			while (rscounter.next()) {

				headerCount = (headerCount + 1);

				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL PHARMACY COUNTER COLLECTION", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("Invoice No", subheader));
					paymentHeader
							.addCell(new Phrase("PID", subheader));
					paymentHeader.addCell(new Phrase("Patient Name", subheader));
					paymentHeader.addCell(new Phrase("", subheader));
					paymentHeader.addCell(new Phrase("Date", subheader));
					
					paymentHeader.addCell(new Phrase("", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Total Amount", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_LEFT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
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

					document.add(paymentHeader);
					paymentHeader.flushContent();

				}

				paymentHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(new Phrase("" + headerCount,tabletext));
				paymentHeader.addCell(new Phrase("CS"+rscounter.getInt("ID"), tabletext));
				paymentHeader.addCell(new Phrase("--", tabletext));
				paymentHeader.addCell(new Phrase(""+ rscounter.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase("", tabletext));
				paymentHeader.addCell(new Phrase(""+rscounter.getString("recDate"), tabletext));
				paymentHeader.addCell(new Phrase("", tabletext));
				
				/* paymentHeader.addCell(new Phrase(""
						+ rscounter.getFloat("amount"), tabletext)); */
				
				double amt = rscounter.getFloat("amount");
				String finalamt = "0.000";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.000";
				}else{
					finalamt = df2.format(amt);
				}
				
				PdfPCell rspharma = new PdfPCell(new Phrase(("" + finalamt), tabletext));
				rspharma.setHorizontalAlignment(Element.ALIGN_LEFT);
				rspharma.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rspharma);
				paymentHeader.addCell(new Phrase(""+ (rscounter.getString("payMode")),tabletext));
				document.add(paymentHeader);
				paymentHeader.flushContent();

			}
			// pharmacy:end:counter

			// pharmacy:start:pharmacy refund patient:credit note
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

			// new page
			// document.newPage();

			headerCount = 0;
			/* rsCreditPharmacy.beforeFirst();
			while (rsCreditPharmacy.next()) {

				headerCount = (headerCount + 1);

				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL PHARMACY CREDIT NOTE", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("Credit No", subheader));
					paymentHeader
							.addCell(new Phrase("PID", subheader));
					paymentHeader.addCell(new Phrase("Patient Name", subheader));
					paymentHeader
							.addCell(new Phrase("Date", subheader));
					paymentHeader.addCell(new Phrase("Payable", subheader));
					paymentHeader
							.addCell(new Phrase("Balance", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Total Amt", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_RIGHT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
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

					document.add(paymentHeader);
					paymentHeader.flushContent();

				}

				paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);

				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase(""+ rsCreditPharmacy.getInt("ID"), tabletext));
				
				paymentHeader.addCell(new Phrase(""+ rsCreditPharmacy.getInt("credit_note_patientId"), tabletext));
				
				paymentHeader.addCell(new Phrase(""+ rsCreditPharmacy.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase(""+ rsCreditPharmacy.getString("recDate"), tabletext));
				
				paymentHeader.addCell(new Phrase(""+ rsCreditPharmacy.getString("payable"), tabletext));
				paymentHeader.addCell(new Phrase(""+ rsCreditPharmacy.getString("credit_note_current_bal"), tabletext));
				
				
				double amt = rsCreditPharmacy.getFloat("amount");
				String finalamt = "0.000";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.000";
				}else{
					finalamt = df2.format(amt);
				}
				
				PdfPCell rspharma = new PdfPCell(new Phrase(("" + finalamt), tabletext));
				rspharma.setHorizontalAlignment(Element.ALIGN_RIGHT);
				rspharma.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rspharma);
				
				paymentHeader.addCell(new Phrase(""
						+ (rsCreditPharmacy.getString("payMode")),
						tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent();

			} */
			// pharmacy:end:pharmacy refund patient:credit note
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
			//common advance : advance start
			headerCount = 0;
			/* 	rsComAdvPay.beforeFirst();
		while (rsComAdvPay.next()) {
				headerCount = (headerCount + 1);
				if (headerCount == 1) {

					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL COMMON ADVANCE COLLECTION", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("PID", subheader));
					paymentHeader.addCell(new Phrase("Treatment count", subheader));
					paymentHeader.addCell(new Phrase("Name", subheader));
					paymentHeader
							.addCell(new Phrase("Adm. date", subheader));
					paymentHeader.addCell(new Phrase("Age/Gender", subheader));
					paymentHeader
							.addCell(new Phrase("Rec. No.", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Paid Amt.", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_RIGHT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
					paymentHeader.addCell(new Phrase("Mode/Rec. Date",
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

					document.add(paymentHeader);
					paymentHeader.flushContent();
				}
				
				paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);
				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsComAdvPay.getInt("Patient_ID"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsComAdvPay.getString("treatmentCount"),
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsComAdvPay.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsComAdvPay.getString("TstartDate"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ (rsComAdvPay.getString("age") + " Yrs")
						+ ("/" + (((((rsComAdvPay.getString("sex")))
								.trim()).equalsIgnoreCase("Male")) ? "M"
								: "F")), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsComAdvPay.getInt("idcommon_advance_slave"),
						tabletext));
			
				
				double amt = rsComAdvPay.getFloat("add_amount");
				String finalamt = "0.00";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.00";
				}else{
					finalamt = df1.format(amt);
				}
				
				PdfPCell rspharma = new PdfPCell(new Phrase(("" + finalamt), tabletext));
				rspharma.setHorizontalAlignment(Element.ALIGN_RIGHT);
				rspharma.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rspharma);
				
				paymentHeader
						.addCell(new Phrase(
								""
										+ ("Cash" + "/" + (rsComAdvPay
													.getString("date"))),
								tabletext));
				
				document.add(paymentHeader);
				paymentHeader.flushContent();
			} */

			//common advance : refund start
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

			// new page
			// document.newPage();

			headerCount = 0;
			/* 	rsComAdvRefund.beforeFirst();
		while (rsComAdvRefund.next()) {
				headerCount = (headerCount + 1);

				if (headerCount == 1) {
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					PdfPCell headercellSub = new PdfPCell(new Phrase(
							"TOTAL COMMON ADVANCE REFUND", header));
					headercellSub
							.setHorizontalAlignment(Element.ALIGN_CENTER);
					headercellSub.setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(headercellSub);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();

					paymentHeader.addCell(new Phrase("#", subheader));
					paymentHeader.addCell(new Phrase("PID", subheader));
					paymentHeader.addCell(new Phrase("Treatment count", subheader));
					paymentHeader.addCell(new Phrase("Name", subheader));
					paymentHeader
							.addCell(new Phrase("Adm. date", subheader));
					paymentHeader.addCell(new Phrase("Age/Gender", subheader));
					paymentHeader
							.addCell(new Phrase("Rec. No.", subheader));
					PdfPCell rsOpdh = new PdfPCell(new Phrase("Paid Amt.", subheader));
					rsOpdh.setHorizontalAlignment(Element.ALIGN_RIGHT);
					rsOpdh.setBorder(Rectangle.NO_BORDER);
					paymentHeader.addCell(rsOpdh); 
					
					paymentHeader.addCell(new Phrase("Mode/Rec. Date",
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

					document.add(paymentHeader);
					paymentHeader.flushContent();
				}
				paymentHeader.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);

				paymentHeader.addCell(new Phrase("" + headerCount,
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsComAdvRefund.getInt("Patient_ID"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsComAdvRefund.getString("treatmentCount"),
						tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsComAdvRefund.getString("pName"), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsComAdvRefund.getString("TstartDate"), tabletext));
				paymentHeader
						.addCell(new Phrase(
								""
										+ (rsComAdvRefund.getString("age") + " Yrs")
										+ ("/" + (((((rsComAdvRefund
												.getString("sex"))).trim())
												.equalsIgnoreCase("Male")) ? "M"
												: "F")), tabletext));
				paymentHeader.addCell(new Phrase(""
						+ rsComAdvRefund.getInt("idcommon_advance_slave"),
						tabletext));
				
				
				double amt = rsComAdvRefund.getFloat("refunded_amount");
				String finalamt = "0.00";
				if(amt == 0.0 || amt == 0){
					finalamt = "0.00";
				}else{
					finalamt = df1.format(amt);
				}
				
				PdfPCell rspharma = new PdfPCell(new Phrase(("" + finalamt), tabletext));
				rspharma.setHorizontalAlignment(Element.ALIGN_RIGHT);
				rspharma.setBorder(Rectangle.NO_BORDER);
				paymentHeader.addCell(rspharma);
				
				paymentHeader.addCell(new Phrase(
						""
								+ ("Cash"
										+ "/" + (rsComAdvRefund
											.getString("date"))),
						tabletext));

				document.add(paymentHeader);
				paymentHeader.flushContent();
			} */
			//common advance : refund end
			// UI: end common advance

			// end body section

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

			// end stmt

			try {
				if (connection != null)
					connection.close();
			} catch (SQLException se) {
				se.printStackTrace();
			}//end finally try

		}
	%>


</body>
</html>