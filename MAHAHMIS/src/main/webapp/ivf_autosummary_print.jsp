<%-- <%@page import="com.hms.administrator.dto.HospitalDetails"%> --%>
<%@page import="com.hms.ivf.dto.IvfHistorySlaveDto"%>
<%@page import="com.hms.ivf.dto.IvfHistoryTempMasterDto"%>
<%@page import="com.itextpdf.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.itextpdf.text.html.simpleparser.StyleSheet"%>
<%@page import="com.hms.ivf.dto.IVFRegPatientDTO"%>
<%@page import="com.hms.ivf.service.IVFDoctorDeskService"%>
<%@page import="com.hms.ivf.dto.IvfDoctorRoundDto"%>
<%@page import="com.hms.ivf.dto.IVFAutoSummaryDischargeDTO"%>
<%@page import="com.hms.ivf.dto.IVFDignosisDTO"%>
<%@page import="com.hms.operation.util.OTOperationNotes"%>
<%@page import="com.hms.ivf.dto.IVFOTNotesDTO"%>
<%@page import="com.hms.ivf.dto.IvfPrescriptionDto"%>
<%@page import="com.hms.ivf.controller.IVFDoctorDeskController"%>
<%@page import="com.hms.ivf.controller.IvfDoctorRoundController"%>
<%@page import="com.hms.ivf.service.IvfDoctorRoundService"%>
<%@page import="com.hms.ivf.dto.GynHistoryDto"%>
<%@page import="com.hms.ivf.controller.GynaecologicalController"%>
<%@page import="com.hms.ivf.dto.SurgicalHistoryDto"%>
<%@page import="com.hms.ivf.service.SurgicalHistoryService"%>
<%@page import="com.hms.ivf.dto.GynHistoryDto"%>
<%@page import="com.hms.ivf.dto.GynoExamDto"%>
<%@page import="com.hms.ivf.service.GynaecologicalexamService"%>
<%@page import="com.hms.ivf.controller.GynaecologicalController"%>
<%@page import="com.hms.ivf.controller.GynoExamController"%>
<%@page import="com.hms.ivf.controller.GynaecologicalController"%>
<%@page import="com.hms.dao.AdminDAO"%>
<%@page import="com.hms.ivf.dto.PreviousFertilityTreatment"%>
<%@page import="com.hms.ivf.controller.PreviousFertilityTreatmentController"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.dto.PatientSponsredDetails"%>
<%@page import="com.hms.dto.MLCDetail"%>
<%@page import="com.hms.dto.IpdPatientRelativeDetails"%>
<%@page import="com.hms.dto.Treatment"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.dto.Patient"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@ page import="java.util.Date"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.util.List"%>
<%@ page import="com.hms.model.PatientModel"%>
<%@ page import="com.hms.model.UserModel"%>
<%@ page import="com.hms.dto.HospitalDetails"%>
<%@ page import="com.hms.ipdbill.service.IpdBillService"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.dto.IPDHistoryMaster"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="com.hms.dto.ChartInfoDto"%>
<%@ page import="com.hms.model.AdminModel"%>
<%@ page import="com.hms.model.IPDTreatmentModel"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@ page import="com.hms.dto.ChartReport"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>


<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title> Ivf Auto Discharge Print</title>


<%
	try{
     
    			response.setContentType("application/pdf");
		List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails.getHospDetails("0");
		HospitalDetails hospObj = arrHospitalDetails.get(0);

		ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String billPrint = (String) resourceBundle.getObject("billPrint").toString();
		String billPrintsHeader = (String) resourceBundle.getObject("billPrintsHeader").toString();

		ServletOutputStream outStream = response.getOutputStream();
		response.reset();

		Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
		document.setMargins(20, 20, 20, 0);

		PdfWriter.getInstance(document, outStream);
		document.open();
		String patID = request.getParameter("patID");

		//font
		Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font subheader = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font tabletext = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
		Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);

		Font header1 = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		Font subheader1 = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font footer1 = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader1 = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font tabletext1 = new Font(Font.FontFamily.HELVETICA, 10, Font.NORMAL);

		Font header2 = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font subheader2 = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);

		Font subheader3 = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD | Font.UNDERLINE);
		Font footer2 = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader2 = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font tabletext2 = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);

		FontSelector selector = new FontSelector();
		selector.addFont(subheader);

		java.util.Calendar currentDate = Calendar.getInstance();
		SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy");
		String curr_date = dateformatter.format(currentDate.getTime());
		/* String curr_date = dateformatter.format(currentDate.getTime()); */
		out.println(curr_date);

		String user_name = (String) session.getAttribute("userName");

		String patientID = request.getParameter("patID");

		String tratID = request.getParameter("treatID");
		
		String toDate = request.getParameter("toDate");  
		String fromDate = request.getParameter("fromDate");
  
		int tid = Integer.parseInt(tratID);
		
		String ivftreatmentId = request.getParameter("ivftreatmentId");
		
		 int ivfTreatId = Integer.parseInt(ivftreatmentId);

		String date_pick = request.getParameter("date_pick");

		String[] patientObj = request.getParameterValues("myObj");

		String MedicalOffName = request.getParameter("MedicalOffName");

		String MRN_No = request.getParameter("MRN_No");

		String Tre_Start_Date = request.getParameter("Tre_Start_Date");
		String consultingDoctorr = request.getParameter("consultingDoctorr");
		String corporate = request.getParameter("corporate");
		String hallName = request.getParameter("hallName");

		IpdBillService fetchServlist = (ApplicationContextUtils.getApplicationContext())
		.getBean(IpdBillService.class);

		int ProductId = 0;
		int count = 1;

		//int billId=Integer.parseInt(request.getParameter("billId"));
		//int patID=Integer.parseInt(request.getParameter("patID"));
		int treatId = Integer.parseInt(request.getParameter("treatID"));
		String treatmentID = (request.getParameter("treatID"));
		
		int ivfivftreatmentID = Integer.parseInt(request.getParameter("ivftreatmentId"));
		String ivftreatmentID = request.getParameter("ivftreatmentId");
		Integer userid = (Integer) session.getAttribute("userId");
		if (userid == null) {
	userid = 0;
		}
		int emrId = 0;
		
		//fetch patient record
		RegistrationController uss = (ApplicationContextUtils.getApplicationContext())
		.getBean(RegistrationController.class);
		RegTreBillDto rtd = new RegTreBillDto();
		List<RegTreBillDto> ltPatientRecord = null;
		String PType = "";
		String addressPatient = "";

		Integer tidd = Integer.parseInt(treatmentID);
		rtd = uss.fetchPatientsRecordByTreatmentId(tidd);
		rtd = rtd.getListRegTreBillDto().get(0);
		String Doc_Nme = "";

		// Table 1 : For hospital adress details start

		PdfPTable HeaderTable1 = new PdfPTable(3);
		int[] headerwidth1 = { 30, 80, 20 };
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

		HttpSession session1 = request.getSession();

		String path = hospObj.getFilePath();
		String hospitalName = hospObj.getHospitalName();
		hospitalName = hospitalName.toUpperCase();
		String address = hospObj.getHospitalAddress();
		String city = hospObj.getHospitalCity();
		String contact = hospObj.getHospitalContact();
		String path1 = application.getRealPath(path);

		String hospitalZip = hospObj.getHospitalZip();
		String PhoneNo = hospObj.getHospitalContact();
		String secPhoneNo = hospObj.getSecPNo();
		String webste = hospObj.getWebsite();
		String email = hospObj.getHospitalEmail();
		out.println(email);
		String cinNo = hospObj.getTxtCinNo();
		String serviceTaxNo = hospObj.getTxtSerTaxNo();
		String panNo = hospObj.getPanNo();
		String hPhoneNo = PhoneNo + "/" + secPhoneNo;
		String hospRegNo = hospObj.getHosRegNo();

		String nabh = hospObj.getNabhImagePath();
		String nabhLogo = application.getRealPath(nabh);

		PdfPTable HeaderTable41 = new PdfPTable(3);
		int[] headerwidth41 = { 30, 60, 20 };
		HeaderTable41.setWidths(headerwidth41);
		HeaderTable41.setWidthPercentage(95f);
		HeaderTable41.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		// Table 1 : For hospital adress details start

		Image img = null;
		PdfPCell cell = null;
		try {
	img = Image.getInstance(path1);
	img.scaleAbsolute(100, 60);
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

		if (img == null) {

	HeaderTable1.addCell(new Phrase("", header));
		} else {

	HeaderTable1.addCell(cell);
		}

		Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
		Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD);
		Phrase p = new Phrase();
		p.add(new Chunk(" " + hospitalName, bold));
		p.add(new Chunk(" \n", bold));
		p.add(new Chunk(" \n" + address, tabletext));
		p.add(new Chunk(" " + city + " Pin- " + hospitalZip + "\n", tabletext));
		p.add(new Chunk(" Phone No. " + hPhoneNo, tabletext));
		if (!webste.equalsIgnoreCase("")) {
	p.add(new Chunk(" \n " + webste, tabletext));
		}
		p.add(new Chunk(" \n " + "email: " + email, tabletext));
		if (!hospRegNo.equalsIgnoreCase("")) {
	p.add(new Chunk("\n " + "Hospital RegNo: " + hospRegNo, tabletext));
		} else {
	p.add(new Chunk("\n " + "Hospital RegNo: -", tabletext));
		}

		//p.add(new Chunk(" \nPAN No : "+panNo , tabletext));
		//	p.add(new Chunk(" \nCIN: "+cinNo, tabletext));	
		//	p.add(new Chunk(" \nSERVICE TAX NO: "+serviceTaxNo+", PAN No: "+panNo, regular));	

		PdfPCell hospitalNameCell = new PdfPCell(p);
		hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		hospitalNameCell.setBorder(Rectangle.NO_BORDER);
		HeaderTable1.addCell(hospitalNameCell);

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

		HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		document.add(HeaderTable1);
		HeaderTable1.flushContent();

		// Table 1 : For hospital adress details end
		PdfPTable HeaderTable11 = new PdfPTable(5);
		int[] headerwidth11 = { 20, 20, 50, 20, 20 };
		HeaderTable11.setWidths(headerwidth11);
		HeaderTable11.setWidthPercentage(95f);
		HeaderTable11.getDefaultCell().setBorder(Rectangle.BOTTOM);

		HeaderTable11.addCell(new Phrase("", header1));
		HeaderTable11.addCell(new Phrase("", header1));
		HeaderTable11.addCell(new Phrase("", header1));
		HeaderTable11.addCell(new Phrase("", header1));
		HeaderTable11.addCell(new Phrase("", header1));
		document.add(HeaderTable11);
		HeaderTable11.flushContent();

		PdfPTable HeaderTable2 = new PdfPTable(4);
		int[] headerwidth2 = { 40, 40, 10, 10 };
		HeaderTable2.setWidths(headerwidth2);
		HeaderTable2.setWidthPercentage(95f);
		HeaderTable2.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);

		HeaderTable2.addCell(new Phrase("", header));
		
		HeaderTable2.addCell(new Phrase(" Ivf Auto Discharge Print  ", header));
		HeaderTable2.addCell(new Phrase("Date:", subheader));
		HeaderTable2.addCell(new Phrase(curr_date, subheader));
		document.add(HeaderTable2);
		HeaderTable2.flushContent();

		//Start table for 
		//fetch patient record	

		/* String strForPat = patientObj[0].substring(0,
		patientObj[0].length()); */
		
		IVFDoctorDeskService objivf = (ApplicationContextUtils.getApplicationContext())
		.getBean(IVFDoctorDeskService.class);
	IVFRegPatientDTO ivfDrobj=	objivf.getIvfPatientInfoByIVFTreatId(ivfTreatId);

		Patient objPat = new Patient();
		String patient_address = "";

		SimpleDateFormat dateformatter1 = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss a");
		String CreatedDtTm = dateformatter1.format(ivfDrobj.getCreatedDateTime());

		PdfPTable HeaderTable31 = new PdfPTable(5);
		int[] headerwidth31 = { 13, 39, 20, 26, 4 };
		HeaderTable31.setWidths(headerwidth31);
		HeaderTable31.setWidthPercentage(95f);

		HeaderTable31.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		HeaderTable31.addCell(new Phrase("Patient Name", subheader));
		HeaderTable31.addCell(new Phrase(": " + ivfDrobj.getPatientName(), tabletext));
		HeaderTable31.addCell(new Phrase("Date of Admission", subheader));
		HeaderTable31.addCell(new Phrase(": " + CreatedDtTm, tabletext));
		HeaderTable31.addCell(new Phrase(" ", tabletext));

		HeaderTable31.addCell(new Phrase("Age", subheader));
		HeaderTable31.addCell(new Phrase(": " + ivfDrobj.getAge(), tabletext));
		/* if(rtd.gettFlag().equals("N") && rtd.getAge3() != null){
	HeaderTable31.addCell(new Phrase(": "+ rtd.getAge3(), tabletext));
	}else{
		HeaderTable31.addCell(new Phrase(": "+ rtd.getAge(), tabletext));
	} */

		HeaderTable31.addCell(new Phrase("Gender", subheader));
		HeaderTable31.addCell(new Phrase(": " + ivfDrobj.getGender(), tabletext));
		HeaderTable31.addCell(new Phrase(" ", tabletext));

		HeaderTable31.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable31.addCell(new Phrase("Address", subheader));
		HeaderTable31.addCell(new Phrase(": " + ivfDrobj.getAddress(), tabletext));
	    HeaderTable31.addCell(new Phrase("Type", subheader));
		//HeaderTable31.addCell(new Phrase(": " + PType, tabletext));
		HeaderTable31.addCell(new Phrase(": " , tabletext));
		HeaderTable31.addCell(new Phrase(" ", tabletext)); 

		HeaderTable31.addCell(new Phrase("Tel/Mob.No", subheader));
		HeaderTable31.addCell(new Phrase(": " + ivfDrobj.getMobile(), tabletext));
		
		
		HeaderTable31.addCell(new Phrase("OPD/IPD NO", subheader));
		HeaderTable31.addCell(new Phrase(":", tabletext));
		HeaderTable31.addCell(new Phrase("", tabletext));
		
		HeaderTable31.addCell(new Phrase("Consultant Doc.", subheader));
		HeaderTable31.addCell(new Phrase(": " , tabletext)); 
	    HeaderTable31.addCell(new Phrase("Department", subheader));
		HeaderTable31.addCell(new Phrase(": " , tabletext));
		HeaderTable31.addCell(new Phrase(" " , tabletext));
		
		HeaderTable31.addCell(new Phrase("Patient ID", subheader));
		HeaderTable31.addCell(new Phrase(": " + ivfDrobj.getPatientIdd(), tabletext));

		HeaderTable31.addCell(new Phrase(" ", tabletext));
		HeaderTable31.addCell(new Phrase(" ", tabletext));
		HeaderTable31.addCell(new Phrase("", subheader));
		HeaderTable31.addCell(new Phrase("", tabletext));
		HeaderTable31.addCell(new Phrase("", subheader));
		HeaderTable31.addCell(new Phrase("", tabletext));
		HeaderTable31.addCell(new Phrase(" ", tabletext));

		document.add(HeaderTable31);
		HeaderTable31.flushContent();

		///............Start Surgical History table 		

		PdfPTable HeaderTable11a = new PdfPTable(5);
		int[] headerwidth11a = { 20, 20, 50, 20, 20 };
		HeaderTable11a.setWidths(headerwidth11a);
		HeaderTable11a.setWidthPercentage(95f);
		HeaderTable11a.getDefaultCell().setBorder(Rectangle.BOTTOM);

		HeaderTable11a.addCell(new Phrase("", header1));
		HeaderTable11a.addCell(new Phrase("", header1));
		HeaderTable11a.addCell(new Phrase("", header1));
		HeaderTable11a.addCell(new Phrase("", header1));
		HeaderTable11a.addCell(new Phrase("", header1));
		document.add(HeaderTable11a);
		HeaderTable11a.flushContent();   

		IvfDoctorRoundService obj = (ApplicationContextUtils.getApplicationContext())
		.getBean(IvfDoctorRoundService.class);
		
		IvfHistoryTempMasterDto objmaster= new IvfHistoryTempMasterDto();
		objmaster=obj.fetchIvfHistoryMaster(ivfivftreatmentID);
		    
		
		PdfPTable HeaderTable5 = new PdfPTable(4);
		int[] headerwidth5 = { 40, 40, 10, 10 };
		HeaderTable5.setWidths(headerwidth5);
		HeaderTable5.setWidthPercentage(95f);
		HeaderTable5.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

		HeaderTable5.addCell(new Phrase("", header1));
		HeaderTable5.addCell(new Phrase("History ", header));
		HeaderTable5.addCell(new Phrase("", header1));
		HeaderTable5.addCell(new Phrase("", header1));

		document.add(HeaderTable5);
		HeaderTable5.flushContent();

		PdfPTable HeaderTable5a = new PdfPTable(4);
		int[] headerwidth5a = { 45, 30, 30, 45 };
		HeaderTable5a.setWidths(headerwidth5a);
		HeaderTable5a.setWidthPercentage(95f);
		HeaderTable5a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		PdfPTable HeaderTable6a = new PdfPTable(4);
		int[] headerwidth6a = { 40, 55, 45, 55 };
		HeaderTable6a.setWidths(headerwidth6a);
		HeaderTable6a.setWidthPercentage(95f);
		HeaderTable6a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		PdfPTable HeaderTableh = new PdfPTable(4);
		int[] headerwidthh = { 70, 55, 45, 55 };
		HeaderTableh.setWidths(headerwidthh);
		HeaderTableh.setWidthPercentage(95f);
		HeaderTableh.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		PdfPTable HeaderTable6b = new PdfPTable(3);
		int[] headerwidth6b = { 5, 15, 15 };
		HeaderTable6b.setWidths(headerwidth6b);
		HeaderTable6b.setWidthPercentage(95f);
		HeaderTable6b.getDefaultCell().setBorder(Rectangle.BOX);

		            

		//if (!objmaster.equals("")) {
			if (objmaster != null) {
				
				HeaderTable5a.addCell(new Phrase("\nChief Complaints and Duration", header1));
				HeaderTable5a.addCell(new Phrase("", tabletext2));
				HeaderTable5a.addCell(new Phrase("", subheader2));
				HeaderTable5a.addCell(new Phrase("", tabletext2));

				HeaderTable5a.addCell(new Phrase("", tabletext2));
				HeaderTable5a.addCell(new Phrase("", subheader2));
				HeaderTable5a.addCell(new Phrase("", tabletext2));
				HeaderTable5a.addCell(new Phrase("", tabletext2)); 

				document.add(HeaderTable5a);
				HeaderTable5a.flushContent(); 
		if (!objmaster.getListIvfHistorySlaveDto().equals(""))
			
		{   
			
		HeaderTable6b.addCell(new Phrase("              #", subheader2));
		HeaderTable6b.addCell(new Phrase(" Chief Complaints", subheader2));
		HeaderTable6b.addCell(new Phrase(" Duration", subheader2));
		int countt = 1;
		for (IvfHistorySlaveDto objSlave : objmaster.getListIvfHistorySlaveDto()) {

			HeaderTable6b.addCell(new Phrase("                   " + countt, tabletext));
			HeaderTable6b.addCell(new Phrase("   " + objSlave.getChfdur(), tabletext));
			HeaderTable6b.addCell(new Phrase(
					"   " + objSlave.getDuration() + "  " + objSlave.getDays_month_year(), tabletext));

			document.add(HeaderTable6b);
			HeaderTable6b.flushContent();
			countt++;

		}
		}  
		document.add(HeaderTable6b);
		HeaderTable6b.flushContent();
		
		HeaderTable5a.addCell(new Phrase("", tabletext2)); 
		HeaderTable5a.addCell(new Phrase("", subheader2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", subheader2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		
		document.add(HeaderTable5a);
		HeaderTable5a.flushContent();

		PdfPTable HeaderTable11c = new PdfPTable(5);
		int[] headerwidth11c = { 20, 20, 50, 20, 20 };
		HeaderTable11c.setWidths(headerwidth11c);
		HeaderTable11c.setWidthPercentage(95f);
		HeaderTable11c.getDefaultCell().setBorder(Rectangle.BOTTOM);

		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		
		document.add(HeaderTable11c);
		HeaderTable11c.flushContent();
		
		if (!objmaster.getChiefComplaintsTemp().equals("") || !objmaster.getClinicalFindingNegHis().equals(""))
		{
		HeaderTable5a.addCell(new Phrase("\nPast Medical History", header1));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", subheader2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));

		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", subheader2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		
		
		if (!objmaster.getChiefComplaintsTemp().equals("")) {
			HeaderTable5a.addCell(new Phrase("History of Present Iilness", subheader));
			HeaderTable5a.addCell(new Phrase(":  " + objmaster.getChiefComplaintsTemp(), tabletext));
		}

		if (!objmaster.getClinicalFindingNegHis().equals("")) {
			HeaderTable5a.addCell(new Phrase("Negative History", subheader));
			HeaderTable5a.addCell(new Phrase(":  " + objmaster.getClinicalFindingNegHis(), tabletext));
		}
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		
		}
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		
		document.add(HeaderTable5a);
		HeaderTable5a.flushContent();
		
		PdfPTable HeaderTable66 = new PdfPTable(3);
		int[] headerwidth66 = { 20, 20, 20 };
		HeaderTable66.setWidths(headerwidth66);
		HeaderTable66.setWidthPercentage(95f);
		HeaderTable66.getDefaultCell().setBorder(Rectangle.BOX);    
		
		if (!objmaster.getDm().equals("") || !objmaster.getHtn().equals("")||
				!objmaster.getIhd().equals("") || !objmaster.getBacopd().equals("")	|| !objmaster.getOther().equals("")||
				!objmaster.getDmDuration().equals("") || !objmaster.getHtnDuration().equals("")||
				!objmaster.getIhdDuration().equals("") || !objmaster.getBacopdDuration().equals("")	|| !objmaster.getOtherDuration().equals(""))
		{
		
		HeaderTable66.addCell(new Phrase("             #", subheader2));
		HeaderTable66.addCell(new Phrase("        Yes/No", subheader2));
		HeaderTable66.addCell(new Phrase("    Duration(Hr.)", subheader2));

		HeaderTable66.addCell(new Phrase("      DM       ", subheader2));
		HeaderTable66.addCell(new Phrase("        " + objmaster.getDm(), subheader2));
		HeaderTable66.addCell(new Phrase("   " + objmaster.getDmDuration(), subheader2));

		HeaderTable66.addCell(new Phrase("      HTN       ", subheader2));
		HeaderTable66.addCell(new Phrase("        " + objmaster.getHtn(), subheader2));
		HeaderTable66.addCell(new Phrase("   " + objmaster.getHtnDuration(), subheader2));

		HeaderTable66.addCell(new Phrase("      IHD       ", subheader2));
		HeaderTable66.addCell(new Phrase("        " + objmaster.getIhd(), subheader2));
		HeaderTable66.addCell(new Phrase("   " + objmaster.getIhdDuration(), subheader2));

		HeaderTable66.addCell(new Phrase("      BA/COPD       ", subheader2));
		HeaderTable66.addCell(new Phrase("        " + objmaster.getBacopd(), subheader2));
		HeaderTable66.addCell(new Phrase("   " + objmaster.getBacopdDuration(), subheader2));

		HeaderTable66.addCell(new Phrase("      OTHER       ", subheader2));
		HeaderTable66.addCell(new Phrase("        " + objmaster.getOther(), subheader2));
		HeaderTable66.addCell(new Phrase("   " + objmaster.getOtherDuration(), subheader2));
		}
		
		document.add(HeaderTable66);
		HeaderTable66.flushContent();
		
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		HeaderTable5a.addCell(new Phrase("", tabletext2));
		
		document.add(HeaderTable5a);
		HeaderTable5a.flushContent();
		
		
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		
		document.add(HeaderTable11c);
		HeaderTable11c.flushContent();
		

		PdfPTable HeaderTable6 = new PdfPTable(4);
		int[] headerwidth6 = { 20, 20, 20, 20 };
		HeaderTable6.setWidths(headerwidth6);
		HeaderTable6.setWidthPercentage(95f);
		HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		HeaderTable6.addCell(new Phrase("", tabletext));
		HeaderTable6.addCell(new Phrase("", tabletext));
		HeaderTable6.addCell(new Phrase("", tabletext));
		HeaderTable6.addCell(new Phrase("", tabletext));    

		if (!objmaster.getPast_surgical_his().equals("") || !objmaster.getMedications().equals("")
				|| !objmaster.getGynac().equals("") || !objmaster.getDrugReactions().equals("")
				|| !objmaster.getFamilyHistory().equals("") || !objmaster.getPersonalHistory().equals("")
				|| !objmaster.getPastMedicalHistory().equals("") || !objmaster.getObsHistory().equals("")) {

			HeaderTableh.addCell(new Phrase("\nPAST/PERSONAL/FAMILY HISTORY ", header1));
			HeaderTableh.addCell(new Phrase("", tabletext));
			HeaderTableh.addCell(new Phrase("", tabletext));
			HeaderTableh.addCell(new Phrase("", tabletext));

			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));

			if (!objmaster.getPast_surgical_his().equals("")) {
				HeaderTable6.addCell(new Phrase("Past Surgical History", subheader));
				HeaderTable6.addCell(new Phrase(":  " + objmaster.getPast_surgical_his(), tabletext));
			}

			if (!objmaster.getMedications().equals("")) {
				HeaderTable6.addCell(new Phrase("Medications", subheader));
				HeaderTable6.addCell(new Phrase(":  " + objmaster.getMedications(), tabletext));
			}

			if (!objmaster.getGynac().equals("")) {
				HeaderTable6.addCell(new Phrase("GYNAC History ", subheader));
				HeaderTable6.addCell(new Phrase(":  " + objmaster.getGynac(), tabletext));
			}

			if (!objmaster.getDrugReactions().equals("")) {
				HeaderTable6.addCell(new Phrase("Any allergies or adversedrug reactions?:", subheader));
				HeaderTable6.addCell(new Phrase(":  " + objmaster.getDrugReactions(), tabletext));
			}

			if (!objmaster.getFamilyHistory().equals("")) {
				HeaderTable6.addCell(new Phrase("Family History", subheader));
				HeaderTable6.addCell(new Phrase(":  " + objmaster.getFamilyHistory(), tabletext));
			}

			if (!objmaster.getPersonalHistory().equals("")) {
				HeaderTable6.addCell(new Phrase("Personal History", subheader));
				HeaderTable6.addCell(new Phrase(":  " + objmaster.getPersonalHistory(), tabletext));
			}

			if (!objmaster.getPastMedicalHistory().equals("")) {
				HeaderTable6.addCell(new Phrase("Past Medical History ", subheader));
				HeaderTable6.addCell(new Phrase(":  " + objmaster.getPastMedicalHistory(), tabletext));
			}

			if (!objmaster.getObsHistory().equals("")) {
				HeaderTable6.addCell(new Phrase("OBS History", subheader));
				HeaderTable6.addCell(new Phrase(":  " + objmaster.getObsHistory(), tabletext));
			}
			
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext));
		}	

		document.add(HeaderTableh);
		HeaderTableh.flushContent();

		document.add(HeaderTable6);
		HeaderTable6.flushContent();	
		
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		
		document.add(HeaderTable11c);
		HeaderTable11c.flushContent();
		
		PdfPTable HeaderTable5b = new PdfPTable(4);
		int[] headerwidth5b = {30, 45, 30, 45};
		HeaderTable5b.setWidths(headerwidth5b);
		HeaderTable5b.setWidthPercentage(95f);
		HeaderTable5b.getDefaultCell().setBorder(Rectangle.NO_BORDER);      
		
		PdfPTable HeaderTable5c = new PdfPTable(4);
		int[] headerwidth5c = {30, 45, 30, 45};
		HeaderTable5c.setWidths(headerwidth5c);
		HeaderTable5c.setWidthPercentage(95f);
		HeaderTable5c.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		if (!objmaster.getTemp().equals("") || !objmaster.getPulse().equals("") || !objmaster.getBp().equals("") || !objmaster.getSpo2().equals("") ||
			!objmaster.getPallor().equals("") || !objmaster.getClubbing().equals("")|| !objmaster.getLymph().equals("")|| !objmaster.getLcterus().equals("")
				|| !objmaster.getOedema().equals(""))
		{
			HeaderTable5b.addCell(new Phrase("\nON EXAMINATION ", header1));
			HeaderTable5b.addCell(new Phrase("", tabletext2));
			HeaderTable5b.addCell(new Phrase("", subheader2));
			HeaderTable5b.addCell(new Phrase("", tabletext2));
		
		if (!objmaster.getTemp().equals("") || !objmaster.getPulse().equals("")|| !objmaster.getBp().equals("")|| !objmaster.getSpo2().equals(""))
		{	
			HeaderTable5b.addCell(new Phrase("\nVITALS :-", subheader3));
			HeaderTable5b.addCell(new Phrase("", tabletext2));
			HeaderTable5b.addCell(new Phrase("", subheader2));
			HeaderTable5b.addCell(new Phrase("", tabletext2));

			HeaderTable5b.addCell(new Phrase("", subheader2));
			HeaderTable5b.addCell(new Phrase("", tabletext2));
			HeaderTable5b.addCell(new Phrase("", subheader2));
			HeaderTable5b.addCell(new Phrase("", tabletext2));
			
		if (!objmaster.getTemp().equals("")) {
			HeaderTable5b.addCell(new Phrase("Temperature", subheader));
			HeaderTable5b.addCell(new Phrase(":  " + objmaster.getTemp(), tabletext));
		}
		
		if (!objmaster.getPulse().equals("")) {
			HeaderTable5b.addCell(new Phrase("Pulse", subheader));
			HeaderTable5b.addCell(new Phrase(":  " + objmaster.getPulse(), tabletext));
		}
		
		if (!objmaster.getBp().equals("")) {
			HeaderTable5b.addCell(new Phrase("BP", subheader));
			HeaderTable5b.addCell(new Phrase(":  " + objmaster.getBp(), tabletext));
		}
		
		if (!objmaster.getSpo2().equals("")) {
			HeaderTable5b.addCell(new Phrase("SPO2 ", subheader));
			HeaderTable5b.addCell(new Phrase(":  " + objmaster.getSpo2(), tabletext));
		}
		
		}
		if (!objmaster.getPallor().equals("") || !objmaster.getClubbing().equals("")|| !objmaster.getLymph().equals("")|| !objmaster.getLcterus().equals("")
				|| !objmaster.getOedema().equals(""))
		{	
			HeaderTable5c.addCell(new Phrase("\nGeneral Exam :-", subheader3));
			HeaderTable5c.addCell(new Phrase("", tabletext2));
			HeaderTable5c.addCell(new Phrase("", subheader2));
			HeaderTable5c.addCell(new Phrase("", tabletext2));

			HeaderTable5c.addCell(new Phrase("", tabletext2));
			HeaderTable5c.addCell(new Phrase("", subheader2));
			HeaderTable5c.addCell(new Phrase("", tabletext2));
			HeaderTable5c.addCell(new Phrase("", tabletext2));
			
		if (!objmaster.getPallor().equals("")) {
			HeaderTable5c.addCell(new Phrase("Pallor", subheader));
			HeaderTable5c.addCell(new Phrase(":  " + objmaster.getPallor(), tabletext));
		}
		
		if (!objmaster.getPallor().equals("")) {
			HeaderTable5c.addCell(new Phrase("Clubbing", subheader));
			HeaderTable5c.addCell(new Phrase(":  " + objmaster.getClubbing(), tabletext));
		}
		
		if (!objmaster.getPallor().equals("")) {
			HeaderTable5c.addCell(new Phrase("Lymph Adenopathy", subheader));
			HeaderTable5c.addCell(new Phrase(":  " + objmaster.getLymph(), tabletext));
		}
		
		if (!objmaster.getPallor().equals("")) {
			HeaderTable5c.addCell(new Phrase("Icterus", subheader));
			HeaderTable5c.addCell(new Phrase(":  " + objmaster.getLcterus(), tabletext));
		}
		
		if (!objmaster.getPallor().equals("")) {
			HeaderTable5c.addCell(new Phrase("Oedema", subheader));
			HeaderTable5c.addCell(new Phrase(":  " + objmaster.getOedema(), tabletext));
		}
		HeaderTable5c.addCell(new Phrase("", tabletext2));
		HeaderTable5c.addCell(new Phrase("", subheader2));
		HeaderTable5c.addCell(new Phrase("", tabletext2));
		HeaderTable5c.addCell(new Phrase("", tabletext2));
		}
		
		}
		HeaderTable5b.addCell(new Phrase("", tabletext2));
		HeaderTable5b.addCell(new Phrase("", subheader2));
		HeaderTable5b.addCell(new Phrase("", tabletext2));
		HeaderTable5b.addCell(new Phrase("", tabletext2));
				
		document.add(HeaderTable5b);
		HeaderTable5b.flushContent();

		document.add(HeaderTable5c);
		HeaderTable5c.flushContent();
		
		/* HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		
		document.add(HeaderTable11c);
		HeaderTable11c.flushContent(); */
		
		PdfPTable HeaderTable5ivf = new PdfPTable(4);
		int[] headerwidth5ivf = {30, 45, 30, 45};
		HeaderTable5ivf.setWidths(headerwidth5ivf);
		HeaderTable5ivf.setWidthPercentage(95f);
		HeaderTable5ivf.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		if (!objmaster.getCvs().equals("") || !objmaster.getRs().equals("") || !objmaster.getPa().equals("") || !objmaster.getCns().equals("")
		    || !objmaster.getPs().equals("") || !objmaster.getPv().equals("") || !objmaster.getLocal_Exma().equals("")
			|| !objmaster.getInvestigation().equals("") || !objmaster.getProvisional().equals("") || !objmaster.getConfirmDiagn().equals("")
			|| !objmaster.getTreatPlan().equals(""))
			{
			HeaderTable5ivf.addCell(new Phrase("\nSYSTEMIC EXAMINATIONS ", header1));
			HeaderTable5ivf.addCell(new Phrase("", tabletext2));
			HeaderTable5ivf.addCell(new Phrase("", subheader2));
			HeaderTable5ivf.addCell(new Phrase("", tabletext2));
			
			HeaderTable5ivf.addCell(new Phrase("", subheader2));
			HeaderTable5ivf.addCell(new Phrase("", tabletext2));
			HeaderTable5ivf.addCell(new Phrase("", subheader2));
			HeaderTable5ivf.addCell(new Phrase("", tabletext2));
			
			if (!objmaster.getCvs().equals("")) {
				HeaderTable5ivf.addCell(new Phrase("CVS", subheader));
				HeaderTable5ivf.addCell(new Phrase(":  " + objmaster.getCvs(), tabletext));
			}
			
			if (!objmaster.getRs().equals("")) {
				HeaderTable5ivf.addCell(new Phrase("R/S", subheader));
				HeaderTable5ivf.addCell(new Phrase(":  " + objmaster.getRs(), tabletext));
			}
			
			if (!objmaster.getPa().equals("")) {
				HeaderTable5ivf.addCell(new Phrase("PA", subheader));
				HeaderTable5ivf.addCell(new Phrase(":  " + objmaster.getPa(), tabletext));
			}
			
			if (!objmaster.getCns().equals("")) {
				HeaderTable5ivf.addCell(new Phrase("CNS", subheader));
				HeaderTable5ivf.addCell(new Phrase(":  " + objmaster.getCns(), tabletext));
			}
			
			if (!objmaster.getPs().equals("")) {
				HeaderTable5ivf.addCell(new Phrase("PS", subheader));
				HeaderTable5ivf.addCell(new Phrase(":  " + objmaster.getPs(), tabletext));
			}
			
			if (!objmaster.getPv().equals("")) {
				HeaderTable5ivf.addCell(new Phrase("PV", subheader));
				HeaderTable5ivf.addCell(new Phrase(":  " + objmaster.getPv(), tabletext));
			}
			
			if (!objmaster.getLocal_Exma().equals("")) {
				HeaderTable5ivf.addCell(new Phrase("Local Examinations", subheader));
				HeaderTable5ivf.addCell(new Phrase(":  " + objmaster.getLocal_Exma(), tabletext));
			}
			
			if (!objmaster.getInvestigation().equals("")) {
				HeaderTable5ivf.addCell(new Phrase("Investigation Reports", subheader));
				HeaderTable5ivf.addCell(new Phrase(":  " + objmaster.getInvestigation(), tabletext));
			}
			
			if (!objmaster.getProvisional().equals("")) {
				HeaderTable5ivf.addCell(new Phrase("Provisional Diagnosis", subheader));
				HeaderTable5ivf.addCell(new Phrase(":  " + objmaster.getProvisional(), tabletext));
			}
			
			if (!objmaster.getConfirmDiagn().equals("")) {
				HeaderTable5ivf.addCell(new Phrase("Confirm Diagnosis", subheader));
				HeaderTable5ivf.addCell(new Phrase(":  " + objmaster.getConfirmDiagn(), tabletext));
			}
			
			 if (!objmaster.getTreatPlan().equals("")) {
				HeaderTable5ivf.addCell(new Phrase("Treatment Plan", subheader));
				HeaderTable5ivf.addCell(new Phrase(":  " + objmaster.getTreatPlan(), tabletext));
			}
			
			}
		HeaderTable5ivf.addCell(new Phrase("", subheader2));
		HeaderTable5ivf.addCell(new Phrase("", tabletext2));
	
		HeaderTable5ivf.addCell(new Phrase("", subheader2));
		HeaderTable5ivf.addCell(new Phrase("", tabletext2));
		HeaderTable5ivf.addCell(new Phrase("", subheader2));
		HeaderTable5ivf.addCell(new Phrase("", tabletext2));

		document.add(HeaderTable5ivf);
		HeaderTable5ivf.flushContent();
		
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		
		document.add(HeaderTable11c);
		HeaderTable11c.flushContent();
		
		PdfPTable HeaderTable5d = new PdfPTable(4);
		int[] headerwidth5d = { 30, 45, 30, 45};
		HeaderTable5d.setWidths(headerwidth5d);
		HeaderTable5d.setWidthPercentage(95f);
		HeaderTable5d.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		if (!objmaster.getHb().equals("") || !objmaster.getTlc().equals("") || !objmaster.getDlc().equals("") || !objmaster.getUsg().equals("")
			|| !objmaster.getIvp().equals("") || !objmaster.getUrea().equals("") || !objmaster.getCrt().equals("")|| !objmaster.getNa().equals("")
			|| !objmaster.getHk().equals("") || !objmaster.getPsa().equals("") || !objmaster.getBlgroup().equals("")|| !objmaster.getUrrine().equals("")
			|| !objmaster.getHiv().equals("") || !objmaster.getHbs().equals("") || !objmaster.getXray().equals("")|| !objmaster.getPelvis().equals("")
			|| !objmaster.getCts().equals("") || !objmaster.getCa125().equals("") || !objmaster.getVdrl().equals("")|| !objmaster.getTsh().equals("")
			|| !objmaster.getRbs().equals("") || !objmaster.getPt().equals("") || !objmaster.getAptt().equals("")|| !objmaster.getPathology().equals("")
			|| !objmaster.getOthers().equals(""))
		{
			HeaderTable5d.addCell(new Phrase("\nInvestigations ", header1));
			HeaderTable5d.addCell(new Phrase("", tabletext2));
			HeaderTable5d.addCell(new Phrase("", subheader2));
			HeaderTable5d.addCell(new Phrase("", tabletext2));
			
			HeaderTable5d.addCell(new Phrase("", subheader2));
			HeaderTable5d.addCell(new Phrase("", tabletext2));
			HeaderTable5d.addCell(new Phrase("", subheader2));
			HeaderTable5d.addCell(new Phrase("", tabletext2));
			
			if (!objmaster.getHb().equals("")) {
				HeaderTable5d.addCell(new Phrase("Hb", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getHb(), tabletext));
			}
			
			if (!objmaster.getTlc().equals("")) {
				HeaderTable5d.addCell(new Phrase("TLC", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getTlc(), tabletext));
			}
			
			if (!objmaster.getDlc().equals("")) {
				HeaderTable5d.addCell(new Phrase("DLC", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getDlc(), tabletext));
			}
			
			if (!objmaster.getUsg().equals("")) {
				HeaderTable5d.addCell(new Phrase("USG", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getUsg(), tabletext));
			}
			
			if (!objmaster.getIvp().equals("")) {
				HeaderTable5d.addCell(new Phrase("IVP", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getIvp(), tabletext));
			}
			
			if (!objmaster.getUrea().equals("")) {
				HeaderTable5d.addCell(new Phrase("Urea", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getUrea(), tabletext));
			}
			
			if (!objmaster.getCrt().equals("")) {
				HeaderTable5d.addCell(new Phrase("Creatinine", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getCrt(), tabletext));
			}
			
			if (!objmaster.getNa().equals("")) {
				HeaderTable5d.addCell(new Phrase("Na", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getNa(), tabletext));
			}
			
			if (!objmaster.getHk().equals("")) {
				HeaderTable5d.addCell(new Phrase("K", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getHk(), tabletext));
			}
			
			if (!objmaster.getPsa().equals("")) {
				HeaderTable5d.addCell(new Phrase("PSA", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getPsa(), tabletext));
			}
			
			if (!objmaster.getBlgroup().equals("")) {
				HeaderTable5d.addCell(new Phrase("Blood Group", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getBlgroup(), tabletext));
			}
			
			if (!objmaster.getUrrine().equals("")) {
				HeaderTable5d.addCell(new Phrase("Urine", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getUrrine(), tabletext));
			}
			
			if (!objmaster.getHiv().equals("")) {
				HeaderTable5d.addCell(new Phrase("HIV", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getHiv(), tabletext));
			}
			
			if (!objmaster.getHbs().equals("")) {
				HeaderTable5d.addCell(new Phrase("HBsAg", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getHbs(), tabletext));
			}
			
			if (!objmaster.getXray().equals("")) {
				HeaderTable5d.addCell(new Phrase("Xray Chest", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getXray(), tabletext));
			}
			
			if (!objmaster.getPelvis().equals("")) {
				HeaderTable5d.addCell(new Phrase("Xray Pelvis", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getPelvis(), tabletext));
			}
			
			if (!objmaster.getCts().equals("")) {
				HeaderTable5d.addCell(new Phrase("CT Scan", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getCts(), tabletext));
			}
			
			if (!objmaster.getCa125().equals("")) {
				HeaderTable5d.addCell(new Phrase("CA 125", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getCa125(), tabletext));
			}
			
			if (!objmaster.getVdrl().equals("")) {
				HeaderTable5d.addCell(new Phrase("VDRL", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getVdrl(), tabletext));
			}
			
			if (!objmaster.getTsh().equals("")) {
				HeaderTable5d.addCell(new Phrase("TSH", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getTsh(), tabletext));
			}
			
			if (!objmaster.getRbs().equals("")) {
				HeaderTable5d.addCell(new Phrase("RBS", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getRbs(), tabletext));
			}
			
			if (!objmaster.getPt().equals("")) {
				HeaderTable5d.addCell(new Phrase("PT", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getPt(), tabletext));
			}
			
			if (!objmaster.getAptt().equals("")) {
				HeaderTable5d.addCell(new Phrase("APTT", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getAptt(), tabletext));
			}
			
			if (!objmaster.getPathology().equals("")) {
				HeaderTable5d.addCell(new Phrase("Histopathology", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getPathology(), tabletext));
			}
			if (!objmaster.getOthers().equals("")) {
				HeaderTable5d.addCell(new Phrase("Others", subheader));
				HeaderTable5d.addCell(new Phrase(":  " + objmaster.getOthers(), tabletext));
			}
			
			HeaderTable5d.addCell(new Phrase("", subheader2));
			HeaderTable5d.addCell(new Phrase("", tabletext2));
			HeaderTable5d.addCell(new Phrase("", subheader2));
			HeaderTable5d.addCell(new Phrase("", tabletext2));
			
			document.add(HeaderTable5d);
			HeaderTable5d.flushContent();
			
			}
		
		    PdfPTable HeaderTable12 = new PdfPTable(5);
			int[] headerwidth12 = { 20, 20, 50, 20, 20 };
			HeaderTable12.setWidths(headerwidth12);
			HeaderTable12.setWidthPercentage(95f);
			HeaderTable12.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));

			document.add(HeaderTable12);
			HeaderTable12.flushContent();
			
		   } else {
		
		}  
			
			/////////////////////////History End//////////////////
		
		  /////Start Gynocological History///////////////
		  
		  HeaderTable5.addCell(new Phrase("", header1));
		HeaderTable5.addCell(new Phrase("Gynacological History ", header));
		HeaderTable5.addCell(new Phrase("", header1));
		HeaderTable5.addCell(new Phrase("", header1));

		document.add(HeaderTable5);
		HeaderTable5.flushContent();
		  
		   PdfPTable HeaderTable12 = new PdfPTable(5);
				int[] headerwidth12 = { 20, 20, 50, 20, 20 };
				HeaderTable12.setWidths(headerwidth12);
				HeaderTable12.setWidthPercentage(95f);
				HeaderTable12.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				//Spacing
				HeaderTable12.addCell(new Phrase("", header1));
				HeaderTable12.addCell(new Phrase("", header1));
				HeaderTable12.addCell(new Phrase("", header1));
				HeaderTable12.addCell(new Phrase("", header1));
				HeaderTable12.addCell(new Phrase("", header1));
				document.add(HeaderTable12);
				HeaderTable12.flushContent();
			

		    GynaecologicalController gynCon = (ApplicationContextUtils.getApplicationContext())
					.getBean(GynaecologicalController.class);
			GynHistoryDto gynDto = new GynHistoryDto();
			
	           List<GynHistoryDto> listGyn = new ArrayList<GynHistoryDto>();
			String pid = request.getParameter("patID");
			//String tid11 = request.getParameter("treatID");
			String tid11 = request.getParameter("ivftreatmentId");
			
			gynDto = gynCon.fetchGynaecologicalHistoryData(pid, tid11);
			
			//gynDto=gynCon.getAllGynecologicalList();
			PdfPTable HeaderTable32 = new PdfPTable(4);
			int[] headerwidth32 = { 20, 20, 20, 20 };
			HeaderTable32.setWidths(headerwidth32);
			HeaderTable32.setWidthPercentage(95f);
			HeaderTable32.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	         
			if(gynDto.getListGyn().size() > 0){
			gynDto = gynDto.getListGyn().get(0); 
			

			PdfPTable HeaderTable32a = new PdfPTable(4);
			int[] headerwidth32a = { 20, 20, 20, 20 };
			HeaderTable32a.setWidths(headerwidth32a);
			HeaderTable32a.setWidthPercentage(95f);
			HeaderTable32a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable33 = new PdfPTable(4);
			int[] headerwidth33 = { 20, 20, 20, 20 };
			HeaderTable33.setWidths(headerwidth33);
			HeaderTable33.setWidthPercentage(95f);
			HeaderTable33.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable34 = new PdfPTable(4);
			int[] headerwidth34 = { 20, 20, 20, 20 };
			HeaderTable34.setWidths(headerwidth34);
			HeaderTable34.setWidthPercentage(95f);
			HeaderTable34.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable34a = new PdfPTable(4);
			int[] headerwidth34a = { 20, 20, 20, 20 };
			HeaderTable34a.setWidths(headerwidth34a);
			HeaderTable34a.setWidthPercentage(95f);
			HeaderTable34a.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable34b = new PdfPTable(4);
			int[] headerwidth34b = { 20, 20, 20, 20 };
			HeaderTable34b.setWidths(headerwidth34b);
			HeaderTable34b.setWidthPercentage(95f);
			HeaderTable34b.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable34d = new PdfPTable(4);
			int[] headerwidth34d = { 20, 20, 20, 20 };
			HeaderTable34d.setWidths(headerwidth34d);
			HeaderTable34d.setWidthPercentage(95f);
			HeaderTable34d.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable34e = new PdfPTable(4);
			int[] headerwidth34e = { 20, 20, 20, 20 };
			HeaderTable34e.setWidths(headerwidth34e);
			HeaderTable34e.setWidthPercentage(95f);
			HeaderTable34e.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable34f = new PdfPTable(4);
			int[] headerwidth34f = { 20, 20, 20, 20 };
			HeaderTable34f.setWidths(headerwidth34f);
			HeaderTable34f.setWidthPercentage(95f);
			HeaderTable34f.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable35 = new PdfPTable(4);
			int[] headerwidth35 = { 20, 20, 20, 20 };
			HeaderTable35.setWidths(headerwidth35);
			HeaderTable35.setWidthPercentage(95f);
			HeaderTable35.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			if (!gynDto.getMenarcheAge().equals("")) {
				HeaderTable35.addCell(new Phrase("Menarche Age ", subheader));
				HeaderTable35.addCell(new Phrase(":  " + gynDto.getMenarcheAge() + " Years", tabletext));

				HeaderTable35.addCell(new Phrase(" ", tabletext));
				HeaderTable35.addCell(new Phrase(" ", tabletext));
			}

			document.add(HeaderTable35);
			HeaderTable35.flushContent();

			if (!gynDto.getAmenorria().equals("") || !gynDto.getAmenorriaMonth().equals("")
					|| !gynDto.getAmenorriaDay().equals("") || !gynDto.getAmenorriaPS().equals("")) {

				HeaderTable32.addCell(new Phrase(" ", tabletext));
				HeaderTable32.addCell(new Phrase("", subheader));
				HeaderTable32.addCell(new Phrase(" ", tabletext));
				HeaderTable32.addCell(new Phrase("", subheader));

				HeaderTable32.addCell(new Phrase("Menstrual History ", header));
				HeaderTable32.addCell(new Phrase(" " + " ", tabletext));
				HeaderTable32.addCell(new Phrase(" ", tabletext));
				HeaderTable32.addCell(new Phrase(" ", tabletext));

				HeaderTable32.addCell(new Phrase(" ", tabletext));
				HeaderTable32.addCell(new Phrase("", subheader));
				HeaderTable32.addCell(new Phrase("", tabletext));
				HeaderTable32.addCell(new Phrase(" ", tabletext));

				if (!gynDto.getAmenorria().equals("")) {

					HeaderTable32.addCell(new Phrase("Amenorrhea", subheader));
					HeaderTable32.addCell(new Phrase(": " + gynDto.getAmenorria(), tabletext));
				}
				if (!gynDto.getAmenorriaMonth().equals("") || !gynDto.getAmenorriaDay().equals("")) {

					HeaderTable32.addCell(new Phrase("Since", subheader));
					HeaderTable32.addCell(new Phrase(": " + gynDto.getAmenorriaMonth() + " Months" + " "
							+ gynDto.getAmenorriaDay() + " Days", tabletext));

				}

				if (!gynDto.getAmenorriaPS().equals("")) {

					HeaderTable32.addCell(new Phrase("Amenorrhea Primari/Secondary", subheader));
					HeaderTable32.addCell(new Phrase(": " + gynDto.getAmenorriaPS(), tabletext));
				}

				HeaderTable32.addCell(new Phrase("", subheader));
				HeaderTable32.addCell(new Phrase(" ", tabletext));
			}
			HeaderTable32.addCell(new Phrase("", subheader));
			HeaderTable32.addCell(new Phrase(" ", tabletext));
			HeaderTable32.addCell(new Phrase("", subheader));
			HeaderTable32.addCell(new Phrase(" ", tabletext));

			document.add(HeaderTable32);
			HeaderTable32.flushContent();

			if (!gynDto.getLmd().equals("")) {

				HeaderTable34.addCell(new Phrase("Lmp", subheader));
				HeaderTable34.addCell(new Phrase(": " + gynDto.getLmd(), tabletext));
				HeaderTable34.addCell(new Phrase("", tabletext));
				HeaderTable34.addCell(new Phrase("", subheader));
			}
			document.add(HeaderTable34);
			HeaderTable34.flushContent();

			if (!gynDto.getDurationOfFlow().equals("")) {

				HeaderTable32a.addCell(new Phrase("Duration Of Flow", subheader));
				HeaderTable32a.addCell(new Phrase(": " + gynDto.getDurationOfFlow(), tabletext));
			}

			if (!gynDto.getIntensityOfFlow().equals("")) {

				HeaderTable32a.addCell(new Phrase("Intensity Of Flow", subheader));
				HeaderTable32a.addCell(new Phrase(": " + gynDto.getIntensityOfFlow(), tabletext));
			}

			document.add(HeaderTable32a);
			HeaderTable32a.flushContent();

			if (!gynDto.getCyclePeriodicity().equals("")) {

				HeaderTable34a.addCell(new Phrase("Cycle Periodicity", subheader));
				HeaderTable34a.addCell(new Phrase(": " + gynDto.getCyclePeriodicity() + " days", tabletext));
				HeaderTable34a.addCell(new Phrase("", subheader));
				HeaderTable34a.addCell(new Phrase(" ", tabletext));
			}

			document.add(HeaderTable34a);
			HeaderTable34a.flushContent();

			if (!gynDto.getMenstrualCycle().equals("")) {

				HeaderTable34b.addCell(new Phrase("Menstrual Cycle", subheader));
				HeaderTable34b.addCell(new Phrase(": " + gynDto.getMenstrualCycle(), tabletext));
			}

			if (!gynDto.getMenstrualIrregularityDays().equals("")
					|| !gynDto.getMenstrualIrregularity().equals("")) {

				HeaderTable34b.addCell(new Phrase("Duration Of Irregularity", subheader));
				HeaderTable34b.addCell(new Phrase(": " + gynDto.getMenstrualIrregularityDays() + " Days "
						+ gynDto.getMenstrualIrregularity() + " expected menstrual period", tabletext));

			}
			HeaderTable34b.addCell(new Phrase("", subheader));
			HeaderTable34b.addCell(new Phrase(" ", tabletext));
			HeaderTable34b.addCell(new Phrase("", subheader));
			HeaderTable34b.addCell(new Phrase(" ", tabletext));

			document.add(HeaderTable34b);
			HeaderTable34b.flushContent();

			PdfPTable HeaderTable34c = new PdfPTable(4);
			int[] headerwidth34c = { 20, 20, 20, 20 };
			HeaderTable34c.setWidths(headerwidth34c);
			HeaderTable34c.setWidthPercentage(95f);
			HeaderTable34c.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			if (!gynDto.getTreatementAny().equals("")) {

				HeaderTable34c.addCell(new Phrase("Treatement (If any)", subheader));
				HeaderTable34c.addCell(new Phrase(": " + gynDto.getTreatementAny(), tabletext));
				HeaderTable34c.addCell(new Phrase("", subheader));
				HeaderTable34c.addCell(new Phrase(" ", tabletext));
			}

			document.add(HeaderTable34c);
			HeaderTable34c.flushContent();

			if (!gynDto.getNoOfMarriage().equals("")) {

				HeaderTable34d.addCell(new Phrase("No. of Marriage", subheader));
				HeaderTable34d.addCell(new Phrase(": " + gynDto.getNoOfMarriage(), tabletext));
			}

			if (!gynDto.getConsagunity().equals("")) {

				HeaderTable34d.addCell(new Phrase("Consagunity", subheader));
				HeaderTable34d.addCell(new Phrase(": " + gynDto.getConsagunity(), tabletext));
			}

			HeaderTable34d.addCell(new Phrase("", subheader));
			HeaderTable34d.addCell(new Phrase(" ", tabletext));
			HeaderTable34d.addCell(new Phrase("", subheader));
			HeaderTable34d.addCell(new Phrase(" ", tabletext));

			document.add(HeaderTable34d);
			HeaderTable34d.flushContent();

			if (!gynDto.getMarriedSince().equals("")) {

				HeaderTable34e.addCell(new Phrase("Married Since", subheader));
				HeaderTable34e.addCell(new Phrase(": " + gynDto.getMarriedSince() + " years", tabletext));
			}

			if (!gynDto.getTryToConceive().equals("")) {

				HeaderTable34e.addCell(new Phrase("Trying to conceive Since", subheader));
				HeaderTable34e.addCell(new Phrase(": " + gynDto.getTryToConceive() + " years", tabletext));
			}

			if (!gynDto.getSexuallyActive().equals("")) {

				HeaderTable34e.addCell(new Phrase("Sexually Active Since", subheader));
				HeaderTable34e.addCell(new Phrase(": " + gynDto.getSexuallyActive() + " years", tabletext));
			}

			if (!gynDto.getPeriodicityOfInterCource().equals("")) {

				HeaderTable34e.addCell(new Phrase("Periodicity of Intercource", subheader));
				HeaderTable34e
						.addCell(new Phrase(": " + gynDto.getPeriodicityOfInterCource() + " Days", tabletext));
			}
			HeaderTable34e.addCell(new Phrase("", subheader));
			HeaderTable34e.addCell(new Phrase("", tabletext));

			document.add(HeaderTable34e);
			HeaderTable34e.flushContent();

			if (!gynDto.getPrePregGravid().equals("") || !gynDto.getPrePregParity().equals("")
					|| !gynDto.getPrePregAbortion().equals("") || !gynDto.getPrePregLive().equals("")) {

				HeaderTable34f.addCell(new Phrase(" ", tabletext));
				HeaderTable34f.addCell(new Phrase("", subheader));
				HeaderTable34f.addCell(new Phrase(" ", tabletext));
				HeaderTable34f.addCell(new Phrase("", subheader));

				HeaderTable34f.addCell(new Phrase("Previous Pregnancy ", header));
				HeaderTable34f.addCell(new Phrase(" ", tabletext));
				HeaderTable34f.addCell(new Phrase(" ", tabletext));
				HeaderTable34f.addCell(new Phrase(" ", tabletext));

				HeaderTable34f.addCell(new Phrase(" ", tabletext));
				HeaderTable34f.addCell(new Phrase("", subheader));
				HeaderTable34f.addCell(new Phrase(" ", tabletext));
				HeaderTable34f.addCell(new Phrase("", subheader));

				if (!gynDto.getPrePregGravid().equals("")) {

					HeaderTable34f.addCell(new Phrase("Gravid [G] ", subheader));
					HeaderTable34f.addCell(new Phrase(": " + gynDto.getPrePregGravid(), tabletext));
				}

				if (!gynDto.getPrePregParity().equals("")) {
					HeaderTable34f.addCell(new Phrase("Parity [P]", subheader));
					HeaderTable34f.addCell(new Phrase(": " + gynDto.getPrePregParity(), tabletext));
				}
				if (!gynDto.getPrePregAbortion().equals("")) {
					HeaderTable34f.addCell(new Phrase("Abortion [A]", subheader));
					HeaderTable34f.addCell(new Phrase(": " + gynDto.getPrePregAbortion(), tabletext));
				}

				if (!gynDto.getPrePregLive().equals("")) {
					HeaderTable34f.addCell(new Phrase("Live [L]", subheader));
					HeaderTable34f.addCell(new Phrase(": " + gynDto.getPrePregLive(), tabletext));
				}
				
				HeaderTable34f.addCell(new Phrase("", subheader));
				HeaderTable34f.addCell(new Phrase("", tabletext));
				
			}

			document.add(HeaderTable34f);
			HeaderTable34f.flushContent();

			if (!gynDto.getContraceptionPills().equals("") || !gynDto.getContraceptionCondom().equals("")
					|| !gynDto.getContraceptionIud().equals("") || !gynDto.getContraceptionDiaphragm().equals("")
					|| !gynDto.getContraceptionImplant().equals("")
					|| !gynDto.getContraceptionInjectable().equals("")) {

				HeaderTable33.addCell(new Phrase("Contraception History", header));
				HeaderTable33.addCell(new Phrase(" ", tabletext));
				HeaderTable33.addCell(new Phrase(" ", tabletext));
				HeaderTable33.addCell(new Phrase(" ", tabletext));

				HeaderTable33.addCell(new Phrase(" ", tabletext));
				HeaderTable33.addCell(new Phrase("", subheader));
				HeaderTable33.addCell(new Phrase(" ", tabletext));
				HeaderTable33.addCell(new Phrase("", subheader));

				if (!gynDto.getContraceptionPills().equals("")) {

					HeaderTable33.addCell(new Phrase("Pills", subheader));
					HeaderTable33.addCell(new Phrase(": " + gynDto.getContraceptionPills(), tabletext));
				}

				if (!gynDto.getContraceptionCondom().equals("")) {

					HeaderTable33.addCell(new Phrase("Condom", subheader));
					HeaderTable33.addCell(new Phrase(": " + gynDto.getContraceptionCondom(), tabletext));
				}

				if (!gynDto.getContraceptionIud().equals("")) {

					HeaderTable33.addCell(new Phrase("IUD", subheader));
					HeaderTable33.addCell(new Phrase(": " + gynDto.getContraceptionIud(), tabletext));
				}

				if (!gynDto.getContraceptionDiaphragm().equals("")) {

					HeaderTable33.addCell(new Phrase("Diaphragm", subheader));
					HeaderTable33.addCell(new Phrase(": " + gynDto.getContraceptionDiaphragm(), tabletext));
				}

				if (!gynDto.getContraceptionImplant().equals("")) {

					HeaderTable33.addCell(new Phrase("Contraceptive Implant", subheader));
					HeaderTable33.addCell(new Phrase(": " + gynDto.getContraceptionImplant(), tabletext));
				}

				if (!gynDto.getContraceptionInjectable().equals("")) {
					HeaderTable33.addCell(new Phrase("Contraceptive Injectable", subheader));
					HeaderTable33.addCell(new Phrase(": " + gynDto.getContraceptionInjectable(), tabletext));
				}

				HeaderTable33.addCell(new Phrase("", subheader));
				HeaderTable33.addCell(new Phrase(" ", tabletext));
				//HeaderTable33.addCell(new Phrase("", subheader));
				//HeaderTable33.addCell(new Phrase(" ", tabletext));
			}
			

			document.add(HeaderTable33);
			HeaderTable33.flushContent();
			
			/* ---------------for horizontal line------ */
			PdfPTable HeaderTable122 = new PdfPTable(5);
			int[] headerwidth122 = { 20, 20, 50, 20, 20 };
			HeaderTable12.setWidths(headerwidth12);
			HeaderTable12.setWidthPercentage(95f);
			HeaderTable12.getDefaultCell().setBorder(Rectangle.BOTTOM);

			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));

			document.add(HeaderTable12);
			HeaderTable12.flushContent();

	         }else{
	        	 
	         }
		  
		  
		  ///End Gynocological History//////////////
		  
		  //////Start Previous Fertility Treatment///////
		  
		  PdfPTable HeaderTable6 = new PdfPTable(4);
		int[] headerwidth7 = { 50, 45, 70, 20 };
		HeaderTable6.setWidths(headerwidth7);
		HeaderTable6.setWidthPercentage(95f);
		HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		PdfPTable HeaderTable32a = new PdfPTable(5);
		int[] headerwidth32a = { 20, 20, 50, 20, 20 };
		HeaderTable32a.setWidths(headerwidth12);
		HeaderTable32a.setWidthPercentage(95f);
		HeaderTable32a.getDefaultCell().setBorder(Rectangle.BOTTOM);
		  
		  
		PreviousFertilityTreatmentController pftCon = (ApplicationContextUtils.getApplicationContext())
				.getBean(PreviousFertilityTreatmentController.class);

		PreviousFertilityTreatment pgynDto = new PreviousFertilityTreatment();

		List<PreviousFertilityTreatment> plistGyn = null;

	

		pgynDto = pftCon.fetchGynaecologicalHistoryData11(pid, ivftreatmentId);
		
		if (pgynDto.getLtpft().size() > 0) {

			pgynDto = pgynDto.getLtpft().get(0);

			//Spacing

			PdfPTable pHeaderTable11 = new PdfPTable(5);
			int[] pheaderwidth11 = { 20, 20, 50, 20, 20 };
			pHeaderTable11.setWidths(pheaderwidth11);
			pHeaderTable11.setWidthPercentage(95f);
			pHeaderTable11.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			//Spacing

			pHeaderTable11.addCell(new Phrase("", header1));
			pHeaderTable11.addCell(new Phrase("", header1));
			pHeaderTable11.addCell(new Phrase("", header1));
			pHeaderTable11.addCell(new Phrase("", header1));
			pHeaderTable11.addCell(new Phrase("", header1));
			document.add(pHeaderTable11);
			pHeaderTable11.flushContent();

			PdfPTable HeaderTable21 = new PdfPTable(4);
			int[] headerwidth21 = { 40, 40, 10, 10 };
			HeaderTable21.setWidths(headerwidth21);
			HeaderTable21.setWidthPercentage(95f);
			HeaderTable21.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable21.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			HeaderTable21.addCell(new Phrase("", header));
			HeaderTable21.addCell(new Phrase("Previous Fertility Treatment  ", header));
			HeaderTable21.addCell(new Phrase("", header1));
			HeaderTable21.addCell(new Phrase("", header1));
			HeaderTable21.addCell(new Phrase("", header1));
			HeaderTable21.addCell(new Phrase("", header1));
			HeaderTable21.addCell(new Phrase("", header1));
			document.add(HeaderTable21);
			HeaderTable21.flushContent();

			PdfPTable pHeaderTable32 = new PdfPTable(5);
			int[] pheaderwidth32 = { 30, 39, 20, 26, 4 };
			pHeaderTable32.setWidths(headerwidth31);
			pHeaderTable32.setWidthPercentage(95f);

			pHeaderTable32.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
			HeaderTable32a.addCell(new Phrase("", header1));
			HeaderTable32a.addCell(new Phrase("", header1));
			HeaderTable32a.addCell(new Phrase("", header1));
			HeaderTable32a.addCell(new Phrase("", header1));
			HeaderTable32a.addCell(new Phrase("", header1));
			document.add(HeaderTable32a);
			HeaderTable32a.flushContent();

			

			if (!pgynDto.getPreviousfertilitytreatment().equals("")) {
				pHeaderTable32.addCell(new Phrase("Previous Fertility Treatment ", subheader));
				pHeaderTable32.addCell(new Phrase(": " + pgynDto.getPreviousfertilitytreatment(), tabletext));

			}

			if (!pgynDto.getArt().equals("")) {

				// pHeaderTable32.addCell(new Phrase(" ",tabletext));
				pHeaderTable32.addCell(new Phrase("ART", subheader));
				pHeaderTable32.addCell(new Phrase(": " + pgynDto.getArt(), tabletext));
				pHeaderTable32.addCell(new Phrase(" ", tabletext));

			}

			if (!pgynDto.getAnyothertreatmentalternatetreatment().equals("")) {
				// pHeaderTable32.addCell(new Phrase(" ",tabletext));
				pHeaderTable32.addCell(new Phrase("Any Other Treatment/Alternate Treatment  ", subheader));
				pHeaderTable32
						.addCell(new Phrase(": " + pgynDto.getAnyothertreatmentalternatetreatment(), tabletext));
				pHeaderTable32.addCell(new Phrase("", subheader));
				pHeaderTable32.addCell(new Phrase(" ", tabletext));
				pHeaderTable32.addCell(new Phrase(" ", tabletext));
			} else {
				pHeaderTable32.addCell(new Phrase("", subheader));
				pHeaderTable32.addCell(new Phrase(" ", tabletext));
				pHeaderTable32.addCell(new Phrase("", subheader));
				pHeaderTable32.addCell(new Phrase(" ", tabletext));
			}

			document.add(pHeaderTable32);
			pHeaderTable32.flushContent();

			
			

			//Spacing

			HeaderTable32a.addCell(new Phrase("", header1));
			HeaderTable32a.addCell(new Phrase("", header1));
			HeaderTable32a.addCell(new Phrase("", header1));
			HeaderTable32a.addCell(new Phrase("", header1));
			HeaderTable32a.addCell(new Phrase("", header1));
			document.add(HeaderTable32a);
			HeaderTable32a.flushContent();

			PdfPTable pHeaderTable5a = new PdfPTable(4);
			int[] pheaderwidth5a = { 30, 45, 30, 45 };
			pHeaderTable5a.setWidths(pheaderwidth5a);
			pHeaderTable5a.setWidthPercentage(95f);

			PdfPTable HeaderTable21a = new PdfPTable(3);
			int[] headerwidth21a = { 20, 10, 40 };
			HeaderTable21a.setWidths(headerwidth21a);
			HeaderTable21a.setWidthPercentage(95f);
			HeaderTable21a.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable21a.getDefaultCell().setBorder(Rectangle.BOTTOM);

			HeaderTable21a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable21a.addCell(new Phrase("\nPrevious Fertility Treatment Information", header1));

			HeaderTable21a.addCell(new Phrase("", tabletext2));
			HeaderTable21a.addCell(new Phrase("", subheader2));
			HeaderTable21a.getDefaultCell().setBorder(Rectangle.BOX);

			HeaderTable21a.addCell(new Phrase("             #", subheader2));
			HeaderTable21a.addCell(new Phrase(" Date ", subheader2));
			HeaderTable21a.addCell(new Phrase(" Remark ", subheader2));
			

			HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable6.addCell(new Phrase("", subheader2));
			HeaderTable6.addCell(new Phrase("", subheader2));
			HeaderTable6.addCell(new Phrase("", subheader2));
			HeaderTable6.addCell(new Phrase("", subheader2));

			if (!pgynDto.getTimeintercoursedate().equals("") || !pgynDto.getTimeintercourseremark().equals("")) {
				HeaderTable21a.getDefaultCell().setBorder(Rectangle.BOX);
				HeaderTable21a.addCell(new Phrase("Time InterCourse(TI)", subheader2));
				HeaderTable21a.addCell(new Phrase("" + pgynDto.getTimeintercoursedate(), tabletext2));
				HeaderTable21a.addCell(new Phrase("" + pgynDto.getTimeintercourseremark(), tabletext2));
				HeaderTable21a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				//	HeaderTable21a.addCell(new Phrase("", subheader2));
				//	HeaderTable21a.addCell(new Phrase("", subheader2));
				//	HeaderTable6.addCell(new Phrase("", subheader2));
				//HeaderTable6.addCell(new Phrase("", subheader2));
			}

			if (!pgynDto.getOvalutioninductiondate().equals("")
					|| !pgynDto.getOvalutioninductionremark().equals("")) {
				HeaderTable21a.getDefaultCell().setBorder(Rectangle.BOX);
				HeaderTable21a.addCell(new Phrase("Ovalution Induction(OT)", subheader2));
				HeaderTable21a.addCell(new Phrase("" + pgynDto.getOvalutioninductiondate(), tabletext2));
				HeaderTable21a.addCell(new Phrase("" + pgynDto.getOvalutioninductionremark(), tabletext2));
				HeaderTable21a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
			}
			if (!pgynDto.getIntrauterineinseminatindate().equals("")
					|| !pgynDto.getIntrauterineinseminatinremark().equals("")) {
				HeaderTable21a.getDefaultCell().setBorder(Rectangle.BOX);
				HeaderTable21a.addCell(new Phrase("Intrauterine Inseminatin(IUI)", subheader2));
				HeaderTable21a.addCell(new Phrase("" + pgynDto.getIntrauterineinseminatindate(), tabletext2));
				HeaderTable21a.addCell(new Phrase("" + pgynDto.getIntrauterineinseminatinremark(), tabletext2));
				HeaderTable21a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
			}

			if (!pgynDto.getIvficsiselfdate().equals("") || !pgynDto.getIvficsiselfremark().equals("")) {
				HeaderTable21a.getDefaultCell().setBorder(Rectangle.BOX);
				HeaderTable21a.addCell(new Phrase("IVF/ICSI Self", subheader2));
				HeaderTable21a.addCell(new Phrase("" + pgynDto.getIvficsiselfdate(), tabletext2));
				HeaderTable21a.addCell(new Phrase("" + pgynDto.getIvficsiselfremark(), tabletext2));
				HeaderTable21a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
			}

			if (!pgynDto.getDonoreggsdate().equals("") || !pgynDto.getDonoreggsremark().equals("")) {
				HeaderTable21a.getDefaultCell().setBorder(Rectangle.BOX);
				HeaderTable21a.addCell(new Phrase("Donor Eggs", subheader2));
				HeaderTable21a.addCell(new Phrase("" + pgynDto.getDonoreggsdate(), tabletext2));
				HeaderTable21a.addCell(new Phrase("" + pgynDto.getDonoreggsremark(), tabletext2));
				HeaderTable21a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				

			}

			if (!pgynDto.getDonoreggsdate().equals("") || !pgynDto.getDonoreggsremark().equals("")) {
				HeaderTable21a.getDefaultCell().setBorder(Rectangle.BOX);
				HeaderTable21a.addCell(new Phrase("Donor Semen", subheader2));
				HeaderTable21a.addCell(new Phrase("" + pgynDto.getDonorsemendate(), tabletext2));
				HeaderTable21a.addCell(new Phrase("" + pgynDto.getDonorsemenremark(), tabletext2));
				HeaderTable21a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			}

			if (!pgynDto.getEdcycledate().equals("") || !pgynDto.getEdcycleremark().equals("")) {

				HeaderTable21a.getDefaultCell().setBorder(Rectangle.BOX);
				HeaderTable21a.addCell(new Phrase("ED Cycle", subheader2));
				HeaderTable21a.addCell(new Phrase("" + pgynDto.getEdcycledate(), tabletext2));
				HeaderTable21a.addCell(new Phrase("" + pgynDto.getEdcycleremark(), tabletext2));
				HeaderTable21a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				//  HeaderTable21a.addCell(new Phrase("", subheader2));
				// HeaderTable21a.addCell(new Phrase("", subheader2));
				//  HeaderTable21a.addCell(new Phrase("", subheader2));
				//  HeaderTable21a.addCell(new Phrase("", subheader2));

			}
			document.add(HeaderTable21a);
			HeaderTable21a.flushContent();

			document.add(pHeaderTable5a);
			pHeaderTable5a.flushContent();

			document.add(HeaderTable6);
			HeaderTable6.flushContent();
			
			/* ---------------for horizontal line------ */
			PdfPTable HeaderTable122 = new PdfPTable(5);
			int[] headerwidth122 = { 20, 20, 50, 20, 20 };
			HeaderTable12.setWidths(headerwidth12);
			HeaderTable12.setWidthPercentage(95f);
			HeaderTable12.getDefaultCell().setBorder(Rectangle.BOTTOM);

			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));

			document.add(HeaderTable12);
			HeaderTable12.flushContent();
			
		} else {

		}

		  
		  ///// End Pevious Fertility Treatment////////
		
		  
		  ///// Start Surgical History///////
		  
		  	PdfPTable spaceHeaderTable11a = new PdfPTable(1);
			int[] spaceheaderwidth11a = { 20 };
			spaceHeaderTable11a.setWidths(spaceheaderwidth11a);
			spaceHeaderTable11a.setWidthPercentage(95f);
			spaceHeaderTable11a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		  
		  
			   HeaderTable5.addCell(new Phrase("", header1));
			HeaderTable5.addCell(new Phrase("Surgical History ", header));
			HeaderTable5.addCell(new Phrase("", header1));
			HeaderTable5.addCell(new Phrase("", header1));
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
			
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			document.add(spaceHeaderTable11a);
			spaceHeaderTable11a.flushContent();
			
			
			PdfPTable sHeaderTable11a = new PdfPTable(5);
			int[] sheaderwidth11a = { 20, 20, 50, 20, 20 };
			sHeaderTable11a.setWidths(sheaderwidth11a);
			sHeaderTable11a.setWidthPercentage(95f);
			sHeaderTable11a.getDefaultCell().setBorder(Rectangle.BOTTOM);

			
			
			//Spacing

			sHeaderTable11a.addCell(new Phrase("", header1));
			sHeaderTable11a.addCell(new Phrase("", header1));
			sHeaderTable11a.addCell(new Phrase("", header1));
			sHeaderTable11a.addCell(new Phrase("", header1));
			sHeaderTable11a.addCell(new Phrase("", header1));
			
			
			document.add(sHeaderTable11a);
			sHeaderTable11a.flushContent();

			PdfPTable sHeaderTable6 = new PdfPTable(4);
			int[] sheaderwidth7 = { 50, 45, 70, 20 };
			sHeaderTable6.setWidths(sheaderwidth7);
			sHeaderTable6.setWidthPercentage(95f);
			sHeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			sHeaderTable6.addCell(new Phrase("", subheader2));
			sHeaderTable6.addCell(new Phrase("", tabletext2));
			sHeaderTable6.addCell(new Phrase("", subheader2));
			sHeaderTable6.addCell(new Phrase("", tabletext2));
			sHeaderTable6.addCell(new Phrase("", tabletext2));
			sHeaderTable6.addCell(new Phrase("", subheader2));
			sHeaderTable6.addCell(new Phrase("", tabletext2));

			PdfPTable HeaderTable5ivf = new PdfPTable(4);
			int[] headerwidth5ivf = { 10, 20, 10, 30 };
			HeaderTable5ivf.setWidths(headerwidth5ivf);
			HeaderTable5ivf.setWidthPercentage(95f);
			HeaderTable5ivf.getDefaultCell().setBorder(Rectangle.BOX);
			
			SurgicalHistoryService sobj=(ApplicationContextUtils.getApplicationContext()).getBean(SurgicalHistoryService.class);
			//List<SurgicalHistoryDto> obj1 = sobj.getListForSurgicalHistory(patID);
			List<SurgicalHistoryDto> obj1 = sobj.getListForSurgicalHistory(ivftreatmentId);
			
			if (obj1.size() > 0) {

				

				HeaderTable5ivf.addCell(new Phrase(" # ", header));
				HeaderTable5ivf.addCell(new Phrase("  Operation Name", header));
				HeaderTable5ivf.addCell(new Phrase("  Date", header));

				HeaderTable5ivf.addCell(new Phrase("  Description/Notes", header));

				if (obj1.size() > 0) {
					int countt = 1;
					for (int i = 0; i < obj1.size(); i++) {
						HeaderTable5ivf.addCell(new Phrase(" " + countt, tabletext));
						HeaderTable5ivf.addCell(new Phrase(" " + obj1.get(i).getOperationName(), tabletext));
						HeaderTable5ivf.addCell(new Phrase(" " + obj1.get(i).getDateF(), tabletext));
						HeaderTable5ivf.addCell(new Phrase(" " + obj1.get(i).getDescripNote(), tabletext));

						document.add(HeaderTable5ivf);
						HeaderTable5ivf.flushContent();
						countt++;
					}
				}

				document.add(HeaderTable5ivf);
				HeaderTable5ivf.flushContent();
				
				spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
				spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
				document.add(spaceHeaderTable11a);
				spaceHeaderTable11a.flushContent();
				
				
				/* ---------------for horizontal line------ */
				PdfPTable HeaderTable122 = new PdfPTable(5);
				int[] headerwidth122 = { 20, 20, 50, 20, 20 };
				HeaderTable12.setWidths(headerwidth12);
				HeaderTable12.setWidthPercentage(95f);
				HeaderTable12.getDefaultCell().setBorder(Rectangle.BOTTOM);

				HeaderTable12.addCell(new Phrase("", header1));
				HeaderTable12.addCell(new Phrase("", header1));
				HeaderTable12.addCell(new Phrase("", header1));
				HeaderTable12.addCell(new Phrase("", header1));
				HeaderTable12.addCell(new Phrase("", header1));

				document.add(HeaderTable12);
				HeaderTable12.flushContent();
				
				
				
				
			} else {

			}
			
		    ///// End Surgical History///////
		  
		  
		    //// Start  Gyno Exam///////
			   HeaderTable5.addCell(new Phrase("", header1));
			HeaderTable5.addCell(new Phrase("Gynocological Examination ", header));
			HeaderTable5.addCell(new Phrase("", header1));
			HeaderTable5.addCell(new Phrase("", header1));
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
			
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			document.add(spaceHeaderTable11a);
			spaceHeaderTable11a.flushContent();
			
			
			PdfPTable gHeaderTable5ivf = new PdfPTable(8);
			int[] gheaderwidth5ivf = {10, 20, 20, 20, 20, 20,20,30 };
			gHeaderTable5ivf.setWidths(gheaderwidth5ivf);
			gHeaderTable5ivf.setWidthPercentage(95f);
			gHeaderTable5ivf.getDefaultCell()
					.setBorder(Rectangle.BOX);
			
			GynaecologicalexamService gyobj=(ApplicationContextUtils.getApplicationContext()).getBean(GynaecologicalexamService.class);  
			List<GynoExamDto> gyobj1=  gyobj.getlistGynExam(ivftreatmentId);
			 if(gyobj1.size() > 0){
		
		
			       
			
			gHeaderTable5ivf.addCell(new Phrase("# ", header));
			gHeaderTable5ivf.addCell(new Phrase("Date", header));
			gHeaderTable5ivf.addCell(new Phrase("P/A", header));
			gHeaderTable5ivf.addCell(new Phrase("P/S", header));
			gHeaderTable5ivf.addCell(new Phrase("P/V", header));
			gHeaderTable5ivf.addCell(new Phrase("AFCRO", header));
			gHeaderTable5ivf.addCell(new Phrase("AFCLO", header));
			gHeaderTable5ivf.addCell(new Phrase("ROD/REMARK", header));
			//gHeaderTable5ivf.addCell(new Phrase("LH", header));
			
			
			if(gyobj1.size() > 0 ){
				int countt=1;
				for(int i=0;i<gyobj1.size();i++){
					gHeaderTable5ivf.addCell(new Phrase(""+countt, tabletext));
					gHeaderTable5ivf.addCell(new Phrase(""+gyobj1.get(i).getDateF(), tabletext));
					gHeaderTable5ivf.addCell(new Phrase(""+gyobj1.get(i).getPaA(), tabletext));
					gHeaderTable5ivf.addCell(new Phrase(""+gyobj1.get(i).getPsA(), tabletext));
					gHeaderTable5ivf.addCell(new Phrase(""+gyobj1.get(i).getPvA(), tabletext));
					gHeaderTable5ivf.addCell(new Phrase(""+gyobj1.get(i).getAfcroA(), tabletext));
					gHeaderTable5ivf.addCell(new Phrase(""+gyobj1.get(i).getAfcloA(), tabletext));
					gHeaderTable5ivf.addCell(new Phrase(""+gyobj1.get(i).getRodremarkA(), tabletext));
				//	gHeaderTable5ivf.addCell(new Phrase(""+gyobj1.get(i).getLhF(), tabletext));
					document.add(gHeaderTable5ivf);
					gHeaderTable5ivf.flushContent();
					countt++;
				}
			}
			
			document.add(gHeaderTable5ivf);
			gHeaderTable5ivf.flushContent();
			
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			document.add(spaceHeaderTable11a);
			spaceHeaderTable11a.flushContent();
			
			
			/* ---------------for horizontal line------ */
			PdfPTable HeaderTable122 = new PdfPTable(5);
			int[] headerwidth122 = { 20, 20, 50, 20, 20 };
			HeaderTable12.setWidths(headerwidth12);
			HeaderTable12.setWidthPercentage(95f);
			HeaderTable12.getDefaultCell().setBorder(Rectangle.BOTTOM);

			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));

			document.add(HeaderTable12);
			HeaderTable12.flushContent();
			 }else{
	           	 
	            }
			
		     //// End  Gyno Exam///////
		     
		       //// Start  Summary///////
		       
		       PdfPTable adHeaderTable31 = new PdfPTable(1);
			int[] adheaderwidth31 = { 120 };
			adHeaderTable31.setWidths(adheaderwidth31);
			adHeaderTable31.setWidthPercentage(95f);
			adHeaderTable31.getDefaultCell().setBorder(Rectangle.BOTTOM);
		       
		        HeaderTable5.addCell(new Phrase("", header1));
			HeaderTable5.addCell(new Phrase("Summary ", header));
			HeaderTable5.addCell(new Phrase("", header1));
			HeaderTable5.addCell(new Phrase("", header1));
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
			
			IVFDoctorDeskService ivfautoobjserv=(ApplicationContextUtils.getApplicationContext()).getBean(IVFDoctorDeskService.class);
			IVFAutoSummaryDischargeDTO ivfautoobj=ivfautoobjserv.getIvfAutoSummary(ivfTreatId);
			
			if(ivfautoobj !=null){
				spaceHeaderTable11a.addCell(new Phrase("Admission Note:", header1));
				spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
				document.add(spaceHeaderTable11a);
				spaceHeaderTable11a.flushContent();
				//dm = lstmaster1.get(i);
				
	            PdfPTable adHeaderTable32 = new PdfPTable(1);
	            int[] adheaderwidth32 = {100};
	            adHeaderTable32.setWidths(adheaderwidth32);
	            adHeaderTable32.setWidthPercentage(95f);
	            adHeaderTable32.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	            StyleSheet styleSheet = new StyleSheet();
	            styleSheet.loadTagStyle("body", "size", "90px");
	            styleSheet.loadTagStyle("p", "size", " 100px");
	            HTMLWorker htmlWorker = new HTMLWorker(document);
	            htmlWorker.setMargins(50, 100, 100, 150);
	            Paragraph paragraph = new Paragraph();
	            
	            PdfPTable HeaderTable33 = new PdfPTable(1);
	            int[] headerwidth30 = {100};
	            HeaderTable33.setWidths(headerwidth30);
	            HeaderTable33.setWidthPercentage(95f);
	            HeaderTable33.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	            htmlWorker.setMargins(50, 100, 100, 150);
	            
	           java.util.List<Element> ie1 = HTMLWorker.parseToList(new StringReader(ivfautoobj.getAdmissionNote()), styleSheet);
	           if(ivfautoobj.getAdmissionNote().equals("") || ivfautoobj.getAdmissionNote().equals("NULL")){
	               for (Element element : ie1) {
	                   if (element instanceof PdfPTable)
	                   {
	                       PdfPTable htmlTable = new PdfPTable(1);
	                       int[] htmlTableWidth = {50};
	                                         htmlTable.setWidths(htmlTableWidth);
	                       htmlTable.setWidths(htmlTableWidth);
	                       htmlTable.setWidthPercentage(50f);
	                       htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	                       htmlTable = (PdfPTable)element;
	                       adHeaderTable32.addCell(htmlTable);
	                       document.add(adHeaderTable32);
	                       adHeaderTable32.flushContent();
	                   }else{
	                       paragraph.add(element);
	                       cell = new PdfPCell(paragraph);
	                       cell.setBorder(Rectangle.NO_BORDER);
	                       adHeaderTable32.addCell(cell);
	                       document.add(adHeaderTable32);
	                       adHeaderTable32.flushContent();
	                       paragraph.clear();
	                   }
	               }                              
	           }else{
	        	   java.util.List<Element> ie3 = HTMLWorker.parseToList(new StringReader(ivfautoobj.getAdmissionNote()), styleSheet);
	               for (Element element : ie3) {
	                   if (element instanceof PdfPTable)
	                   {
	                       PdfPTable htmlTable = new PdfPTable(1);
	                       int[] htmlTableWidth = {50};
	                                         htmlTable.setWidths(htmlTableWidth);
	                       htmlTable.setWidths(htmlTableWidth);
	                       htmlTable.setWidthPercentage(50f);
	                       htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	                       htmlTable = (PdfPTable)element;
	                       adHeaderTable31.addCell(htmlTable);
	                       document.add(adHeaderTable31);
	                       adHeaderTable31.flushContent();
	                   }else{
	                       paragraph.add(element);
	                       cell = new PdfPCell(paragraph);
	                       cell.setBorder(Rectangle.NO_BORDER);
	                       adHeaderTable31.addCell(cell);
	                       document.add(adHeaderTable31);
	                       adHeaderTable31.flushContent();
	                       paragraph.clear();
	                   }
	               }

	           } 
			}else{
				spaceHeaderTable11a.addCell(new Phrase("", header1));
				spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
				document.add(spaceHeaderTable11a);
				spaceHeaderTable11a.flushContent();
			}
			
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			
			spaceHeaderTable11a.addCell(new Phrase("Provisional Diagnosis:", header1));
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			
			document.add(spaceHeaderTable11a);
			spaceHeaderTable11a.flushContent();
			
			IVFDoctorDeskController ivfdoctoresk=(ApplicationContextUtils.getApplicationContext()).getBean(IVFDoctorDeskController.class);
			int unitId=0;
			IVFDignosisDTO ivfDignoboj=ivfdoctoresk.getListOfIVFDignosis(ivfTreatId, unitId);
			
			PdfPTable ivfDignoHeader = new PdfPTable(8);
			int[] ivfDignoWidth = {10, 20, 20, 20, 20, 20,20,30 };
			ivfDignoHeader.setWidths(ivfDignoWidth);
			ivfDignoHeader.setWidthPercentage(95f);
			ivfDignoHeader.getDefaultCell()	.setBorder(Rectangle.BOX);
			
			ivfDignoHeader.addCell(new Phrase("# ", header));
			ivfDignoHeader.addCell(new Phrase("Diagnosis", header));
			ivfDignoHeader.addCell(new Phrase("Diagnosis Description", header));
			ivfDignoHeader.addCell(new Phrase("ICD 10 Code", header));
			ivfDignoHeader.addCell(new Phrase("Date", header));
			ivfDignoHeader.addCell(new Phrase("Diagnosis Type", header));
			ivfDignoHeader.addCell(new Phrase("Diagnosed By", header));
			ivfDignoHeader.addCell(new Phrase("Comment", header));
			
			
			int pcount=1;
			if(ivfDignoboj.getGetListOfIVFDignosisDTO().size() > 0){
			
				for(int i=0;i<ivfDignoboj.getGetListOfIVFDignosisDTO().size();i++){
					if(ivfDignoboj.getGetListOfIVFDignosisDTO().get(i).getDiagnosisType().equalsIgnoreCase("Provisional")){
					ivfDignoHeader.addCell(new Phrase(""+pcount, tabletext));
					ivfDignoHeader.addCell(new Phrase(""+ivfDignoboj.getGetListOfIVFDignosisDTO().get(i).getDiagnosis(), tabletext));
					ivfDignoHeader.addCell(new Phrase(""+ivfDignoboj.getGetListOfIVFDignosisDTO().get(i).getDiagnosisDescription(), tabletext));
					ivfDignoHeader.addCell(new Phrase(""+ivfDignoboj.getGetListOfIVFDignosisDTO().get(i).getiCD10Code(), tabletext));
					ivfDignoHeader.addCell(new Phrase(""+ivfDignoboj.getGetListOfIVFDignosisDTO().get(i).getDate(), tabletext));
					ivfDignoHeader.addCell(new Phrase(""+ivfDignoboj.getGetListOfIVFDignosisDTO().get(i).getDiagnosisType(), tabletext));
					ivfDignoHeader.addCell(new Phrase(""+ivfDignoboj.getGetListOfIVFDignosisDTO().get(i).getDignosedBy(), tabletext));
					ivfDignoHeader.addCell(new Phrase(""+ivfDignoboj.getGetListOfIVFDignosisDTO().get(i).getComments(), tabletext));
					document.add(ivfDignoHeader);
					ivfDignoHeader.flushContent();
					pcount++;
					}
				}
			}
			
			
			
			
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			
			spaceHeaderTable11a.addCell(new Phrase("Confirmed Diagnosis:", header1));
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			
			document.add(spaceHeaderTable11a);
			spaceHeaderTable11a.flushContent();
			
			
			
			
			ivfDignoHeader.addCell(new Phrase("# ", header));
			ivfDignoHeader.addCell(new Phrase("Diagnosis", header));
			ivfDignoHeader.addCell(new Phrase("Diagnosis Description", header));
			ivfDignoHeader.addCell(new Phrase("ICD 10 Code", header));
			ivfDignoHeader.addCell(new Phrase("Date", header));
			ivfDignoHeader.addCell(new Phrase("Diagnosis Type", header));
			ivfDignoHeader.addCell(new Phrase("Diagnosed By", header));
			ivfDignoHeader.addCell(new Phrase("Comment", header));
			
			
			int cdcount=1;
			if(ivfDignoboj.getGetListOfIVFDignosisDTO().size() > 0){
			
				for(int i=0;i<ivfDignoboj.getGetListOfIVFDignosisDTO().size();i++){
					if(ivfDignoboj.getGetListOfIVFDignosisDTO().get(i).getDiagnosisType().equalsIgnoreCase("Confirmed")){
					ivfDignoHeader.addCell(new Phrase(""+cdcount, tabletext));
					ivfDignoHeader.addCell(new Phrase(""+ivfDignoboj.getGetListOfIVFDignosisDTO().get(i).getDiagnosis(), tabletext));
					ivfDignoHeader.addCell(new Phrase(""+ivfDignoboj.getGetListOfIVFDignosisDTO().get(i).getDiagnosisDescription(), tabletext));
					ivfDignoHeader.addCell(new Phrase(""+ivfDignoboj.getGetListOfIVFDignosisDTO().get(i).getiCD10Code(), tabletext));
					ivfDignoHeader.addCell(new Phrase(""+ivfDignoboj.getGetListOfIVFDignosisDTO().get(i).getDate(), tabletext));
					ivfDignoHeader.addCell(new Phrase(""+ivfDignoboj.getGetListOfIVFDignosisDTO().get(i).getDiagnosisType(), tabletext));
					ivfDignoHeader.addCell(new Phrase(""+ivfDignoboj.getGetListOfIVFDignosisDTO().get(i).getDignosedBy(), tabletext));
					ivfDignoHeader.addCell(new Phrase(""+ivfDignoboj.getGetListOfIVFDignosisDTO().get(i).getComments(), tabletext));
					document.add(ivfDignoHeader);
					ivfDignoHeader.flushContent();
					cdcount++;
					}
				}
			}
			
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			
			document.add(spaceHeaderTable11a);
			spaceHeaderTable11a.flushContent();
			
			
			/* ---------------for horizontal line------ */
			PdfPTable HeaderTable122 = new PdfPTable(5);
			int[] headerwidth122 = { 20, 20, 50, 20, 20 };
			HeaderTable12.setWidths(headerwidth12);
			HeaderTable12.setWidthPercentage(95f);
			HeaderTable12.getDefaultCell().setBorder(Rectangle.BOTTOM);

			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));

			document.add(HeaderTable12);
			HeaderTable12.flushContent();
			
		       //// End   Summary///////
		       
		       //// Start Treatment At Discharge//////
		        
		       HeaderTable5.addCell(new Phrase("", header1));
			HeaderTable5.addCell(new Phrase("Treatment At Discharge ", header));
			HeaderTable5.addCell(new Phrase("", header1));
			HeaderTable5.addCell(new Phrase("", header1));
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
			
			
			
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			document.add(spaceHeaderTable11a);
			spaceHeaderTable11a.flushContent();
			
			
			IvfDoctorRoundController ivfdround=(ApplicationContextUtils.getApplicationContext()).getBean(IvfDoctorRoundController.class);
			IvfPrescriptionDto pobj=ivfdround.fetchIvfPrescriptionData(ivfTreatId, "AutoSummary");  
			
			
			PdfPTable ivfPrescHeader = new PdfPTable(5);
			int[] ivfPrescWidth = {10, 20, 20, 20, 20  };
			ivfPrescHeader.setWidths(ivfPrescWidth);
			ivfPrescHeader.setWidthPercentage(95f);
			ivfPrescHeader.getDefaultCell()	.setBorder(Rectangle.BOX);
			if(pobj !=null){
			
					ivfPrescHeader.addCell(new Phrase("# ", header));
					ivfPrescHeader.addCell(new Phrase("Drug", header));
					ivfPrescHeader.addCell(new Phrase("Prep", header));
					ivfPrescHeader.addCell(new Phrase("Instruction", header));
					ivfPrescHeader.addCell(new Phrase("Duration", header));
					int prcount=1;
					if(pobj.getIvfPrescriptionList().size() > 0){
						for(int i=0;i<pobj.getIvfPrescriptionList().size();i++){
					
						ivfPrescHeader.addCell(new Phrase(""+prcount, tabletext));
						ivfPrescHeader.addCell(new Phrase(""+pobj.getIvfPrescriptionList().get(i).getMedicineId(), tabletext));
						ivfPrescHeader.addCell(new Phrase(""+pobj.getIvfPrescriptionList().get(i).getPrepName(), tabletext));
						ivfPrescHeader.addCell(new Phrase(""+pobj.getIvfPrescriptionList().get(i).getInstructionName(), tabletext));
						ivfPrescHeader.addCell(new Phrase(""+pobj.getIvfPrescriptionList().get(i).getDays(), tabletext));
						document.add(ivfPrescHeader);
						ivfPrescHeader.flushContent();
						prcount++;
						}
					}
			}
		
			
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
			
			document.add(spaceHeaderTable11a);
			spaceHeaderTable11a.flushContent();
			
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));

			document.add(HeaderTable12);
			HeaderTable12.flushContent();
			
			
			
			
			/////End  Treatment At Discharge//////
			
			/////Start Treatment///
			
			PdfPTable ivfdataHead = new PdfPTable(2);
			int[] ivfdataWidth = {10, 20  };
			ivfdataHead.setWidths(ivfdataWidth);
			ivfdataHead.setWidthPercentage(95f);
			ivfdataHead.getDefaultCell()	.setBorder(Rectangle.NO_BORDER);
			
			HeaderTable5.addCell(new Phrase("", header1));
			HeaderTable5.addCell(new Phrase("Treatment ", header));
			HeaderTable5.addCell(new Phrase("", header1));
			HeaderTable5.addCell(new Phrase("", header1));
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
			IvfPrescriptionDto ptobj=ivfdround.fetchIvfPrescriptionData(ivfTreatId, "doctorstation"); 
			
			if(ptobj !=null){
				ivfPrescHeader.addCell(new Phrase("# ", header));
				ivfPrescHeader.addCell(new Phrase("Drug", header));
				ivfPrescHeader.addCell(new Phrase("Prep", header));
				ivfPrescHeader.addCell(new Phrase("Instruction", header));
				ivfPrescHeader.addCell(new Phrase("Duration", header));
				int prcount=1;
				if(ptobj.getIvfPrescriptionList().size() > 0){
					for(int i=0;i<ptobj.getIvfPrescriptionList().size();i++){
				
					ivfPrescHeader.addCell(new Phrase(""+prcount, tabletext));
					ivfPrescHeader.addCell(new Phrase(""+ptobj.getIvfPrescriptionList().get(i).getMedicineId(), tabletext));
					ivfPrescHeader.addCell(new Phrase(""+ptobj.getIvfPrescriptionList().get(i).getPrepName(), tabletext));
					ivfPrescHeader.addCell(new Phrase(""+ptobj.getIvfPrescriptionList().get(i).getInstructionName(), tabletext));
					ivfPrescHeader.addCell(new Phrase(""+ptobj.getIvfPrescriptionList().get(i).getDays(), tabletext));
					document.add(ivfPrescHeader);
					ivfPrescHeader.flushContent();
					prcount++;
					}
				}
				spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
				spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
				spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
				spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
				document.add(spaceHeaderTable11a);
				spaceHeaderTable11a.flushContent();
				
				if(ivfautoobj !=null){
				ivfdataHead.addCell(new Phrase("RiskFactor:-", header1));
				ivfdataHead.addCell(new Phrase(""+ivfautoobj.getRiskFactor(), tabletext1));
				
				ivfdataHead.addCell(new Phrase("Complications :- ", header1));
				ivfdataHead.addCell(new Phrase(""+ivfautoobj.getComplications(), tabletext1));
				
				ivfdataHead.addCell(new Phrase("Treatment Given : -", header1));
				ivfdataHead.addCell(new Phrase(""+ivfautoobj.getTreatmentGiven(), tabletext1));
				
				document.add(ivfdataHead);
				ivfdataHead.flushContent();
				}
			}
			
			
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));

			document.add(HeaderTable12);
			HeaderTable12.flushContent();
			
			
			/////End Treatment////
			
			/////Start Condition At Discharge/////
				HeaderTable5.addCell(new Phrase("", header1));
			HeaderTable5.addCell(new Phrase("Condition On Discharge ", header));
			HeaderTable5.addCell(new Phrase("", header1));
			HeaderTable5.addCell(new Phrase("", header1));
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
			
			if(ivfautoobj !=null){
				ivfdataHead.addCell(new Phrase("Condition At Discharge:-", header1));
				ivfdataHead.addCell(new Phrase(""+ivfautoobj.getConditionAtDischarge(), tabletext1));
				
				ivfdataHead.addCell(new Phrase("Advised On Discharge :- ", header1));
				ivfdataHead.addCell(new Phrase(""+ivfautoobj.getAdviceAtDischarge(), tabletext1));
				
				
				
				document.add(ivfdataHead);
				ivfdataHead.flushContent();
				}
			
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));

			document.add(HeaderTable12);
			HeaderTable12.flushContent();
			/////End Condition At Discharge/////
			
			////Start OT Notes/////
			HeaderTable5.addCell(new Phrase("", header1));
			HeaderTable5.addCell(new Phrase("OT Notes ", header));
			HeaderTable5.addCell(new Phrase("", header1));
			HeaderTable5.addCell(new Phrase("", header1));
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
			
			IVFOTNotesDTO ivfotobj=ivfautoobjserv.getIvfOTNotes(ivfTreatId);
			
			if(ivfotobj !=null){

				spaceHeaderTable11a.addCell(new Phrase("OT Notes :", header1));
				spaceHeaderTable11a.addCell(new Phrase("", tabletext1));
				document.add(spaceHeaderTable11a);
				spaceHeaderTable11a.flushContent();
				//dm = lstmaster1.get(i);
				
	            PdfPTable adHeaderTable32 = new PdfPTable(1);
	            int[] adheaderwidth32 = {100};
	            adHeaderTable32.setWidths(adheaderwidth32);
	            adHeaderTable32.setWidthPercentage(95f);
	            adHeaderTable32.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	            StyleSheet styleSheet = new StyleSheet();
	            styleSheet.loadTagStyle("body", "size", "90px");
	            styleSheet.loadTagStyle("p", "size", " 100px");
	            HTMLWorker htmlWorker = new HTMLWorker(document);
	            htmlWorker.setMargins(50, 100, 100, 150);
	            Paragraph paragraph = new Paragraph();
	            
	            PdfPTable HeaderTable33 = new PdfPTable(1);
	            int[] headerwidth30 = {100};
	            HeaderTable33.setWidths(headerwidth30);
	            HeaderTable33.setWidthPercentage(95f);
	            HeaderTable33.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	            htmlWorker.setMargins(50, 100, 100, 150);
	            
	           java.util.List<Element> ie1 = HTMLWorker.parseToList(new StringReader(ivfautoobj.getAdmissionNote()), styleSheet);
	           if(ivfotobj.getOtNotesDescription().equals("") || ivfotobj.getOtNotesDescription().equals("NULL")){
	               for (Element element : ie1) {
	                   if (element instanceof PdfPTable)
	                   {
	                       PdfPTable htmlTable = new PdfPTable(1);
	                       int[] htmlTableWidth = {50};
	                                         htmlTable.setWidths(htmlTableWidth);
	                       htmlTable.setWidths(htmlTableWidth);
	                       htmlTable.setWidthPercentage(50f);
	                       htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	                       htmlTable = (PdfPTable)element;
	                       adHeaderTable32.addCell(htmlTable);
	                       document.add(adHeaderTable32);
	                       adHeaderTable32.flushContent();
	                   }else{
	                       paragraph.add(element);
	                       cell = new PdfPCell(paragraph);
	                       cell.setBorder(Rectangle.NO_BORDER);
	                       adHeaderTable32.addCell(cell);
	                       document.add(adHeaderTable32);
	                       adHeaderTable32.flushContent();
	                       paragraph.clear();
	                   }
	               }                              
	           }else{
	        	   java.util.List<Element> ie3 = HTMLWorker.parseToList(new StringReader(ivfotobj.getOtNotesDescription()), styleSheet);
	               for (Element element : ie3) {
	                   if (element instanceof PdfPTable)
	                   {
	                       PdfPTable htmlTable = new PdfPTable(1);
	                       int[] htmlTableWidth = {50};
	                                         htmlTable.setWidths(htmlTableWidth);
	                       htmlTable.setWidths(htmlTableWidth);
	                       htmlTable.setWidthPercentage(50f);
	                       htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	                       htmlTable = (PdfPTable)element;
	                       adHeaderTable31.addCell(htmlTable);
	                       document.add(adHeaderTable31);
	                       adHeaderTable31.flushContent();
	                   }else{
	                       paragraph.add(element);
	                       cell = new PdfPCell(paragraph);
	                       cell.setBorder(Rectangle.NO_BORDER);
	                       adHeaderTable31.addCell(cell);
	                       document.add(adHeaderTable31);
	                       adHeaderTable31.flushContent();
	                       paragraph.clear();
	                   }
	               }

	           } 
	       	HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));
			HeaderTable12.addCell(new Phrase("", header1));

			document.add(HeaderTable12);
			HeaderTable12.flushContent();
			
			}
			
		
			////End OT Notes/////
		  
		   PdfPTable HeaderTable12u = new PdfPTable(3);
			int[] headerwidth12u = { 33, 33, 33 };
			HeaderTable12u.setWidths(headerwidth12u);
			HeaderTable12u.setWidthPercentage(95f);
			HeaderTable12u.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			HeaderTable12u.addCell(new Phrase("Prepared By", subheader2));
			HeaderTable12u.addCell(new Phrase("Checked By", subheader2));
			HeaderTable12u.addCell(new Phrase("For Hospital", subheader2));
			document.add(HeaderTable12u);
			HeaderTable12u.flushContent();

			HeaderTable12u.addCell(new Phrase("" + user_name, tabletext2));
			HeaderTable12u.addCell(new Phrase("" + user_name, tabletext2));
			HeaderTable12u.addCell(new Phrase("", subheader2));

			document.add(HeaderTable12u);
			HeaderTable12u.flushContent();

		document.close();
		outStream.close();
		outStream.flush();

	}

	catch (Exception e) {
		e.printStackTrace();
	}
%>
</body>
</html>
		
			
				    	