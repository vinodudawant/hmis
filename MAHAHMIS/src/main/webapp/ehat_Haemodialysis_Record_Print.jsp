<%@page import="com.hms.ehat.dto.PostDialysisTableDTO"%>
<%@page import="java.util.Calendar"%>
<%@page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@page import="com.hms.dto.HospitalDetails"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.hms.ehat.dto.HaeRecordModialtsisDTO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext,org.springframework.context.ApplicationContext,org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="java.util.ArrayList"%>
<%@ page import="java.util.Date"%>
<%@page import="javax.sound.midi.SysexMessage"%>
<%@page import="com.itextpdf.text.pdf.draw.DottedLineSeparator"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@page import="org.jsoup.Jsoup"%>
<%@page import="com.hms.ehat.service.DialysisService"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>HaeRecordModialysis</title>
</head>
<body>
<%
/* *******************************************************************************
* @author Dnyanesh Kadam
* 
* @Haemodialysis record print
******************************************************************************  */
try{
	response.setContentType("application/pdf");
	List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails.getHospDetails("0");
	HospitalDetails hospObj = arrHospitalDetails.get(0);
	
	
	ServletOutputStream outStream = response.getOutputStream();
	response.reset();
	Document document = new Document(PageSize.A4);
	document.setMargins(40, 10, 10,40);
	PdfWriter.getInstance(document, outStream);
	document.open();
	
	String path = hospObj.getFilePath();
	String hospitalName = hospObj.getHospitalName();
	hospitalName = hospitalName.toUpperCase();
	String address = hospObj.getHospitalAddress();
	String city = hospObj.getHospitalCity();
	String PhoneNo   =  hospObj.getHospitalContact();
	String secPhoneNo   =  hospObj.getSecPNo();
	String webste     =   hospObj.getWebsite();
	String email      =   hospObj.getHospitalEmail();
	String hPhoneNo   = PhoneNo+"/"+secPhoneNo;
	String path1 = application.getRealPath(path);
	
	java.util.Calendar currentDate = Calendar.getInstance();
	SimpleDateFormat dateformatter = new SimpleDateFormat(
			"dd/MM/yyyy");
	String curr_date = dateformatter.format(currentDate.getTime());
	
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
	/* String TreatID = request.getParameter("tretmentId");
	Integer pTreat = new Integer(TreatID);
	
	RegistrationController rc1 = (ApplicationContextUtils
			.getApplicationContext())
			.getBean(RegistrationController.class);
	RegTreBillDto rtd1 = new RegTreBillDto();
	List<RegTreBillDto> ltPatientRecord = null;
	rtd1 = rc1.fetchPatientsRecordByTreatmentId(pTreat);
	rtd1 = rtd1.getListRegTreBillDto().get(0); */
	
	
	
	
	
	/* -------------------- Define Fonts ---------------------------  */	
	Font header = new Font(Font.FontFamily.HELVETICA, 10,Font.BOLD);
	Font subheader = new Font(Font.FontFamily.HELVETICA, 8,Font.BOLD);
	Font tableheader = new Font(Font.FontFamily.HELVETICA, 9,Font.BOLD);
	Font tabletext = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
	
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
	PdfPCell hospitalNameCell1 = new PdfPCell(new Phrase(
			"\n    " + hospitalName + "\n" + address +"\n Phone No: "+PhoneNo +"\n web site: "+webste+"\n email: "+email  ,tabletext));
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
	HeaderTable1.addCell(new Phrase("", header));
	HeaderTable1.addCell(new Phrase("", header));
	HeaderTable1.addCell(new Phrase("", header));
	HeaderTable1.addCell(new Phrase("", header));
	HeaderTable1.addCell(new Phrase("", header));
	HeaderTable1.addCell(new Phrase("", header));
	
	
	document.add(HeaderTable1);
	HeaderTable1.flushContent();

	
	PdfPTable headerTable = new PdfPTable(2);
	int[] headerTableWidth = {50,50};
	headerTable.setWidths(headerTableWidth);
	headerTable.setWidthPercentage(95f);
	headerTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	
	PdfPTable contentTable = new PdfPTable(6);
	int[] contentTableWidth = {20,10,10,10,20,10};
	contentTable.setWidths(contentTableWidth);
	contentTable.setWidthPercentage(95f);
	contentTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);	
	
	
	PdfPTable onDialysisTableHead = new PdfPTable(11);
	int[] onDialysisWidth = {2,9,9,9,9,9,9,9,9,9,9};
	onDialysisTableHead.setWidths(onDialysisWidth);
	onDialysisTableHead.setWidthPercentage(95f);
	onDialysisTableHead.getDefaultCell().setBorder(Rectangle.BOX);	
	
	PdfPTable onDialysisTableContent = new PdfPTable(11);
	int[] onDialysisContentWidth = {2,9,9,9,9,9,9,9,9,9,9};
	onDialysisTableContent.setWidths(onDialysisContentWidth);
	onDialysisTableContent.setWidthPercentage(95f);
	onDialysisTableContent.getDefaultCell().setBorder(Rectangle.BOX);	
	
	PdfPTable headerTable5 = new PdfPTable(4);
	int[] headerwidth5 = { 15,40,15,30};
	headerTable5.setWidths(headerwidth5);
	headerTable5.setWidthPercentage(95f);		
	headerTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	
	PdfPTable HeaderTable2 = new PdfPTable(4);
	int[] headerwidth2 = { 40,40, 5,10};
	HeaderTable2.setWidths(headerwidth2);
	HeaderTable2.setWidthPercentage(95f);
	HeaderTable2.setHorizontalAlignment(Element.ALIGN_CENTER);
	HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);

	HeaderTable2.addCell(new Phrase("", header));
	HeaderTable2.addCell(new Phrase("HAEMODIALYSIS RECORD ", header));
	HeaderTable2.addCell(new Phrase("Date:", subheader));
	HeaderTable2.addCell(new Phrase(curr_date, subheader));
	document.add(HeaderTable2);
	HeaderTable2.flushContent();
	
	
	
	
	headerTable5.addCell(new Phrase("", subheader));
	headerTable5.addCell(new Phrase("", subheader));
	headerTable5.addCell(new Phrase("", subheader));
	headerTable5.addCell(new Phrase("", subheader));
	headerTable5.addCell(new Phrase("", subheader));
	headerTable5.addCell(new Phrase("", subheader));
	headerTable5.addCell(new Phrase("", subheader));
	headerTable5.addCell(new Phrase("", subheader));
	
	headerTable5.addCell(new Phrase("Patient Name:", subheader));
	headerTable5.addCell(new Phrase("", tabletext));			
	headerTable5.addCell(new Phrase("Doctor Name: ", subheader));
	headerTable5.addCell(new Phrase("", tabletext));
	
	headerTable5.addCell(new Phrase("IPD No.:", subheader));
	headerTable5.addCell(new Phrase("", tabletext));			
	headerTable5.addCell(new Phrase("Ward:", subheader));
	headerTable5.addCell(new Phrase("", tabletext));
	
	headerTable5.addCell(new Phrase("Admission Date:", subheader));
	headerTable5.addCell(new Phrase("", tabletext));			
	headerTable5.addCell(new Phrase("P.A.No.:", subheader));
	headerTable5.addCell(new Phrase("", tabletext));
	
	headerTable5.addCell(new Phrase("Discharge Date:", subheader));
	headerTable5.addCell(new Phrase("", tabletext));			
	headerTable5.addCell(new Phrase("Bill No.:", subheader));
	headerTable5.addCell(new Phrase("", tabletext));
	
	headerTable5.addCell(new Phrase("Sponser:", subheader));
	headerTable5.addCell(new Phrase("", tabletext));			
	headerTable5.addCell(new Phrase("", subheader));
	headerTable5.addCell(new Phrase("", tabletext));
	
	
	
	headerTable5.addCell(new Phrase("", subheader));
	headerTable5.addCell(new Phrase("", subheader));
	headerTable5.addCell(new Phrase("", subheader));
	headerTable5.addCell(new Phrase("", subheader));
	
	headerTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
	headerTable5.addCell(new Phrase("", subheader));
	headerTable5.addCell(new Phrase("", subheader));
	headerTable5.addCell(new Phrase("", subheader));
	headerTable5.addCell(new Phrase("", subheader));
	
	document.add(headerTable5);
	headerTable5.flushContent();
			
		contentTable.addCell(new Phrase("Reg.No: ", tableheader));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("Tel.No:", tableheader));
		contentTable.addCell(new Phrase("", tabletext));
		
		
		document.add(contentTable);
		contentTable.flushContent();	
		
		contentTable.addCell(new Phrase("Name: ", tableheader));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("Age: ", tableheader));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("Sex:", tableheader));
		contentTable.addCell(new Phrase("", tabletext));
		
		document.add(contentTable);
		contentTable.flushContent();	
				
		contentTable.addCell(new Phrase("Address: ", tableheader));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("Dr.Name: ", tableheader));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("Blood Group:", tableheader));
		contentTable.addCell(new Phrase("", tabletext));
		document.add(contentTable);
		contentTable.flushContent();	
		
		contentTable.addCell(new Phrase("HBV: ", tableheader));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("HCV:", tableheader));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("HIV: ", tableheader));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("HBV Vaccination: ", tableheader));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		contentTable.addCell(new Phrase("", tabletext));
		

	
		document.add(contentTable);
		contentTable.flushContent();	
		
		headerTable5.getDefaultCell().setBorder(Rectangle.BOX);
		headerTable5.addCell(new Phrase("DOSE", subheader));
		headerTable5.addCell(new Phrase("1st", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		
		
		document.add(headerTable5);
		headerTable5.flushContent();
		
		headerTable5.getDefaultCell().setBorder(Rectangle.BOX);
		headerTable5.addCell(new Phrase("Date", subheader));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		
		headerTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		
		headerTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		
		headerTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		
		headerTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		
		headerTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		
		headerTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		
		headerTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		
		headerTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		
		headerTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		headerTable5.addCell(new Phrase("", tabletext));
		
		
		document.add(headerTable5);
		headerTable5.flushContent();
	
					
		PdfPTable virologyHead12 = new PdfPTable(5);
		int[] virologyWidth12 = { 8, 5,18,18,9 };
		virologyHead12.setWidths(virologyWidth12);
		virologyHead12.setWidthPercentage(95f);
		
		virologyHead12.getDefaultCell().setBorder(Rectangle.BOX);
		virologyHead12.addCell(new Phrase("", tableheader));
		virologyHead12.addCell(new Phrase("", tableheader));
		virologyHead12.addCell(new Phrase("Weight", tableheader));
		virologyHead12.addCell(new Phrase("Blood Pressure", tableheader));
		virologyHead12.addCell(new Phrase("", tableheader));
		document.add(virologyHead12);
		virologyHead12.flushContent();
		
		
		
		PdfPTable virologyHead1 = new PdfPTable(7);
		int[] virologyWidth1 = { 8, 5, 9, 9, 9,9,9 };
		virologyHead1.setWidths(virologyWidth1);
		virologyHead1.setWidthPercentage(95f);
		
		
		
		virologyHead1.getDefaultCell().setBorder(Rectangle.BOX);
		virologyHead1.addCell(new Phrase("Date Of H.D", tableheader));
		virologyHead1.addCell(new Phrase("Time ", tableheader));
		virologyHead1.addCell(new Phrase("Pre H.D", tableheader));
		virologyHead1.addCell(new Phrase("Post H.D", tableheader));
		virologyHead1.addCell(new Phrase("Pre H.D", tableheader));
		virologyHead1.addCell(new Phrase("Post H.D", tableheader));
		virologyHead1.addCell(new Phrase("Sign", tableheader));
		document.add(virologyHead1);
		virologyHead1.flushContent();
		
		
		
		
		
		
		
		
					
	document.close();
	outStream.flush();
	outStream.close();
}catch (Exception e) {
	e.printStackTrace();
}


%>
</body>
</html>