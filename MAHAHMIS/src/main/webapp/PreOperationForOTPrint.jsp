<%@page import="com.hms.opdbill.dto.PatientHeaderInfoDto"%>
<%@page import="com.hms.ipd.service.BedMgtService"%>
<%@page import="com.hms.ot.service.OperationThService"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.dto.DoctorRoundReport"%>
<%@page import="com.hms.dto.TestDashboard"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto1"%>
<%@page import="com.hms.model.PatientModel"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.dto.Hall"%>

<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.model.PathologyModel"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>
<%@page import="com.hms.ipdbill.service.IpdBillService"%>

<%@page import="com.hms.dto.Order_comp_druges"%>
<%@page import="com.hms.dto.Order_master"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.dto.TreatmentOperations"%>
<%@page import="com.hms.dto.Treatment"%>
<%@ page import="java.util.Calendar"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.dto.Assessment"%>
<%@page import="com.hms.operation.util.OTOperationNotes"%>
<%@page import="com.hms.model.TreatmentModel"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.itextpdf.text.Font"%>
<%@page import="com.hms.dto.DischargeSummery"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%@ page import="com.hms.dto.BillComponent"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.model.IPDTreatmentModel"%>
<%@ page import="com.hms.dto.Patient"%>
<%@ page import="com.hms.dto.PaediatricDeptNICU"%>
<%@ page import="com.hms.dto.PaediatricDept"%>
<%@page import="com.hms.model.AdminModel"%>
<%-- <%@ page import="com.hms.admin.util.ChemotherapyDTO"%> --%>
<%@page import="org.krysalis.barcode4j.BarcodeUtil"%>
<%@ page import="com.hms.dto.IPDHistoryMaster"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>PreOperation OT Print</title>
</head>
<body>
	<%
		try {
		response.setContentType("application/pdf");

		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
		document.setMargins(40, 40, 40, 0);

		//PdfWriter.getInstance(document, outStream);
		PdfWriter writer = PdfWriter.getInstance(document, outStream);
		document.open();

		//font
		Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font subheader = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		Font subheader1 = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD | Font.UNDERLINE);
		Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader = new Font(Font.FontFamily.HELVETICA, 9, Font.BOLD);
		Font tabletext = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
		Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);

		Font header1 = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font header2 = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD);
		Font subheader2 = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		Font tabletext2 = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
		Font subheader3 = new Font(Font.FontFamily.HELVETICA, 8,Font.BOLD |Font.UNDERLINE);
		
		// todays date code
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		
		session = request.getSession();
		int unitId = (Integer)session.getAttribute("uId");
		
		String treatment_Id = request.getParameter("trId");
		String id = request.getParameter("id");
		String pid = request.getParameter("pid");
		String otDate = request.getParameter("otDate");
		int TreatmentID = Integer.parseInt(treatment_Id);
		int patientID = Integer.parseInt(pid);
		SimpleDateFormat formatter1 = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss a");
		String todays_date = formatter1.format(currentDate.getTime());
			
		SimpleDateFormat formatter = new SimpleDateFormat("hh:mm:ss a");
		Calendar calendar = Calendar.getInstance();

		document.newPage();
		PdfPTable HeaderTable1 = new PdfPTable(3);
		int[] headerwidth1 = { 40, 100, 30 };
		HeaderTable1.setWidths(headerwidth1);
		HeaderTable1.setWidthPercentage(95f);
		HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		HttpSession session2 = request.getSession();
		int hospitalUnitId= (Integer) session2.getAttribute("uId");
		HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
		//List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
	    List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
		HospitalDetails hospObj = arrHospitalDetails.get(0);
		
		String path = hospObj.getFilePath();
		String hospitalName = hospObj.getHospitalName();
		hospitalName = hospitalName.toUpperCase();
		String address = hospObj.getHospitalAddress();
		String city = hospObj.getHospitalCity();
		String contact = hospObj.getHospitalContact();
		String regno = hospObj.getHosRegNo();
		String hospitalZip = hospObj.getHospitalZip();
		String PhoneNo = hospObj.getHospitalContact();
		String secPhoneNo = hospObj.getSecPNo();
		String webste = hospObj.getWebsite();
		String email = hospObj.getHospitalEmail();
		String cinNo = hospObj.getTxtCinNo();
		String serviceTaxNo = hospObj.getTxtSerTaxNo();
		String panNo = hospObj.getPanNo();
		String hPhoneNo = PhoneNo + "/" + secPhoneNo;
		String nabh = hospObj.getNabhImagePath();
		ServletContext context = request.getServletContext();
		String lisLogoPath = hospObj.getLisLogoPath();
		String path2 = context.getRealPath(lisLogoPath);
		String nabhLogo = context.getRealPath(nabh);
		String path1 = context.getRealPath(path);
		
		Image img = null;
		PdfPCell cell = null;
		
		img = Image.getInstance(nabhLogo);
		img.scaleAbsolute(80, 60);
		cell = new PdfPCell();
		cell.addElement(new Chunk(img, 1, -40));
		cell.setBorder(Rectangle.NO_BORDER);
		
		Image imgNabh = null;
		PdfPCell cellNabh = null;

		try {
			imgNabh = Image.getInstance(nabhLogo);
			imgNabh.scaleAbsolute(100, 60);
			cellNabh = new PdfPCell();
			cellNabh.addElement(new Chunk(imgNabh, 5, -5));
			cellNabh.setBorder(Rectangle.NO_BORDER);
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (img == null) {
			HeaderTable1.addCell(new Phrase("", header));
		} else {
			HeaderTable1.addCell(cell);
		}
		
		Font bold = new Font(Font.FontFamily.TIMES_ROMAN, 8, Font.BOLD);
		Phrase p = new Phrase();
		p.add(new Chunk("" + hospitalName, bold));
		p.add(new Chunk("\n\n" + "\t" + address, tabletext));
		p.add(new Chunk(" " + city + " Pin - " + hospitalZip + "\n", tabletext));
		p.add(new Chunk("Phone No. " + hPhoneNo, tabletext));
		p.add(new Chunk("\n" + webste + "\n" + "Email: " + email, tabletext));

		PdfPCell hospitalNameCell = new PdfPCell(p);
		hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		hospitalNameCell.setBorder(Rectangle.NO_BORDER);
		HeaderTable1.addCell(hospitalNameCell);
		//BarCode --26 April 2017
		PdfContentByte cb = writer.getDirectContent();
		Barcode128 barcode39 = new Barcode128();
        barcode39.setCode(pid);
        Image code39Image = barcode39.createImageWithBarcode(cb, null, null);
        code39Image.setAbsolutePosition(400,630);
        code39Image.scalePercent(125);
        HeaderTable1.addCell(code39Image);

		// spacing
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
		
		PdfPTable HeaderTable2 = new PdfPTable(4);
		int[] headerwidth2 = { 40, 40, 8, 23};
		HeaderTable2.setWidths(headerwidth2);
		HeaderTable2.setWidthPercentage(95f);
		HeaderTable2.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);

		HeaderTable2.addCell(new Phrase("", header1));
		HeaderTable2.addCell(new Phrase("Pre-Operation Print", header));
		HeaderTable2.addCell(new Phrase("Date :", subheader));
		HeaderTable2.addCell(new Phrase(todays_date, subheader));
		document.add(HeaderTable2);
		HeaderTable2.flushContent();
		
		//fetch patient record
		BedMgtService us = (ApplicationContextUtils.getApplicationContext()).getBean(BedMgtService.class);
		PatientHeaderInfoDto rtd = us.getIpdPatientHeaderInfo(Integer.parseInt(treatment_Id), unitId).getListRegTreBillDto().get(0);
			
		RegService rs = (ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
		List<RegTreBillDto> cmd = rs.fetchPatientsRecordByTreatmentId(Integer.parseInt(treatment_Id));
		
		RegTreBillDto list =  cmd.get(0);
		String ptypeq ="";
		if(list.getSourceTypeId()>0){
			
			ptypeq = "Sponsor";

		}else{
			ptypeq = "Self";
		}
		String PType = "";
		String addressPatient = "";
		String weight = "";
		String height = "";
		String state = "";
		String district = "";
		String cityObj = "";
		String taluka = "";
		String spLeafName = "";
		
		int stateId = rtd.getStateId();
		int townId = rtd.getTownId();
		int districtId = rtd.getDistrictId();
		int talukaId = rtd.getTalukaId();
		int refDocId = rtd.getRefDocId();
		int sponsorSlave = rtd.getChargesMasterSlaveId();
		String BillCategoryName = rtd.getCategoryName();
		String docName = rtd.getConsultingDocName();
		String refDocName = rtd.getRefDocName();
		
		LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);
		
		if(stateId > 0 ){
			state   = fetchlist.getStringValOfObject("state","state_name",stateId,"idstate");
		}else{
			state   = "Maharashtra";
		}
		if(districtId > 0){
			district = fetchlist.getStringValOfObject("district","dis_name",districtId,"iddistrict"); 
		}else{
			district   = "Pune";
		}
		if(townId > 0){
			cityObj = fetchlist.getStringValOfObject("city","city_name",townId,"idcity");
		}else{
			cityObj   = "";
		}
		
		if(talukaId > 0) {
			taluka  = fetchlist.getStringValOfObject("taluka","taluka_name",talukaId,"idtaluka"); 
		}else{
			taluka   = "";
		}				
		if(cityObj != "0" && !cityObj.equals("undefined") && !cityObj.equals("")) {
			addressPatient += cityObj;
		}
		
		if (taluka != "0" && !taluka.equals("undefined") && !taluka.equals("")) {
			addressPatient +=  (" "+taluka);
		}						
		if (district != "0" && !district.equals("undefined") && !district.equals("")) {
			addressPatient += (" " + district);
		}
		if (state != "0" && !state.equals("undefined") && !state.equals("")) {
			addressPatient += ("," + state);
		}
		
		// Start: part-1
		PdfPTable patientDemoDetailName = new PdfPTable(4);
		int[] patientDemoDetailNameWidth = { 15, 40, 15, 40 };
		patientDemoDetailName.setWidths(patientDemoDetailNameWidth);
		patientDemoDetailName.setWidthPercentage(95f);
		patientDemoDetailName.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		patientDemoDetailName.addCell(new Phrase("UHID / IPD No.", subheader));
		patientDemoDetailName.addCell(new Phrase(": "+rtd.getCenterPatientId()+ " / "+ (rtd.getTrcount()),tabletext));
		
		patientDemoDetailName.addCell(new Phrase("Patient Name",subheader));
		patientDemoDetailName.addCell(new Phrase(": "+rtd.getPatientName(), tabletext));
		
		patientDemoDetailName.addCell(new Phrase("Admission Date", subheader));
		patientDemoDetailName.addCell(new Phrase(": "+rtd.getCreatedDateTime(), tabletext));
		
		patientDemoDetailName.addCell(new Phrase("Age/Gender/Wt", subheader));
		patientDemoDetailName.addCell(new Phrase(": "+(rtd.getAge()) + "/"+ (rtd.getGender()) + "/"+ (weight+ " Kg"), tabletext));
		
		patientDemoDetailName.addCell(new Phrase("Consultant Doc", subheader));
		patientDemoDetailName.addCell(new Phrase(": "+docName, tabletext));
		
		patientDemoDetailName.addCell(new Phrase("Ref. By",subheader));
		patientDemoDetailName.addCell(new Phrase(": "+rtd.getRefDocName(), tabletext));
		
		patientDemoDetailName.addCell(new Phrase("Ward/Bed",subheader));
		patientDemoDetailName.addCell(new Phrase(": "+rtd.getHallName(), tabletext));
		
		patientDemoDetailName.addCell(new Phrase("Height",subheader));
		patientDemoDetailName.addCell(new Phrase(": "+height,tabletext));
		
		patientDemoDetailName.addCell(new Phrase("Discharge Date", subheader));
		patientDemoDetailName.addCell(new Phrase(": "+rtd.getDischargeDate(), tabletext));
		
		patientDemoDetailName.addCell(new Phrase("Discharge Type", subheader));
		patientDemoDetailName.addCell(new Phrase(": "+rtd.getDischargeType(), tabletext));
		
		patientDemoDetailName.addCell(new Phrase("Bill Category",subheader));
		patientDemoDetailName.addCell(new Phrase(": "+ptypeq,tabletext));
		
		patientDemoDetailName.addCell(new Phrase("Corporate",	subheader));
		patientDemoDetailName.addCell(new Phrase(": "+BillCategoryName, tabletext));
		
		patientDemoDetailName.getDefaultCell().setBorder(Rectangle.BOTTOM);
		patientDemoDetailName.addCell(new Phrase("", subheader));
		patientDemoDetailName.addCell(new Phrase("", subheader));
		patientDemoDetailName.addCell(new Phrase("", subheader));
		patientDemoDetailName.addCell(new Phrase("", subheader));
		
		patientDemoDetailName.setSpacingAfter(50f);
		
		document.add(patientDemoDetailName);
		patientDemoDetailName.flushContent();
		
		OperationThService opService = (ApplicationContextUtils.getApplicationContext()).getBean(OperationThService.class);
		List<Patient> arrPatient = new ArrayList<Patient>();
		arrPatient = opService.displayOperationPat(otDate, "updateScheduleOT", "byId", id);

		Patient objPatient1 = new Patient();
		objPatient1.setPatientList(arrPatient);
	 
		int ncount = 1;

		PdfPTable HeaderTable12u = new PdfPTable(3);
		int[] headerwidth12u = { 33, 33, 33 };
		HeaderTable12u.setWidths(headerwidth12u);
		HeaderTable12u.setWidthPercentage(95f);
		HeaderTable12u.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		HeaderTable12u.addCell(new Phrase(" Signature of Patient", subheader2));
		HeaderTable12u.addCell(new Phrase("", subheader2));
		HeaderTable12u.addCell(new Phrase("Signature of Consultant", subheader2));
		document.add(HeaderTable12u);
		HeaderTable12u.flushContent();

		HeaderTable12u.addCell(new Phrase(rtd.getPatientName(), tabletext));
		HeaderTable12u.addCell(new Phrase("", tabletext2));
		HeaderTable12u.addCell(new Phrase(""+docName, tabletext));

		document.add(HeaderTable12u);
		HeaderTable12u.flushContent();
	
		document.close();
		outStream.close();
		outStream.flush();
	
	} catch (Exception e) {
		System.err.println(e.getMessage());
		e.printStackTrace();
	}
	%>
</body>
</html>