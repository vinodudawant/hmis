<%@page import="com.hms.ivf.dto.IVFRegPatientDTO"%>
<%@page import="com.hms.ivf.service.IVFDoctorDeskService"%>
<%@page import="com.hms.ivf.dto.IvfDoctorRoundDto"%>
<%@page import="com.hms.ivf.service.IvfDoctorRoundService"%>
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
<title> Doctor Round Print Receipt</title>


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
		
		String toDate = request.getParameter("toDate");   ///////
		String fromDate = request.getParameter("fromDate");
  
		int tid = Integer.parseInt(tratID);

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
		
		String ivftreatmentId = request.getParameter("ivftreatmentId");
		int ivfTreatId = Integer.parseInt(ivftreatmentId);
		 
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

		//Spacing

		HeaderTable11.addCell(new Phrase("", header1));
		HeaderTable11.addCell(new Phrase("", header1));
		HeaderTable11.addCell(new Phrase("", header1));
		HeaderTable11.addCell(new Phrase("", header1));
		HeaderTable11.addCell(new Phrase("", header1));
		document.add(HeaderTable11);
		HeaderTable11.flushContent();

		PdfPTable HeaderTable11c = new PdfPTable(5);
		int[] headerwidth11c = { 20, 20, 50, 20, 20 };
		HeaderTable11c.setWidths(headerwidth11c);
		HeaderTable11c.setWidthPercentage(95f);
		HeaderTable11c.getDefaultCell().setBorder(Rectangle.BOTTOM);

		//Spacing

		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		HeaderTable11c.addCell(new Phrase("", header1));
		document.add(HeaderTable11c);
		HeaderTable11c.flushContent();

		PdfPTable HeaderTable2 = new PdfPTable(4);
		int[] headerwidth2 = { 40, 40, 10, 10 };
		HeaderTable2.setWidths(headerwidth2);
		HeaderTable2.setWidthPercentage(95f);
		HeaderTable2.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);

		HeaderTable2.addCell(new Phrase("", header));
		/* HeaderTable2.addCell(new Phrase("Doctor Initial Assessment ", header)); */
		HeaderTable2.addCell(new Phrase(" Ivf Doctor Round Receipt ", header));
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
	//	HeaderTable31.addCell(new Phrase(" ", tabletext)); 

		/* String[] aaa = (rtd.getOpdipdno()).split("/");                        
		if (aaa[1].equalsIgnoreCase("opd")) {
			HeaderTable31.addCell(new Phrase("OPD NO", subheader));
		} else {
			HeaderTable31.addCell(new Phrase("IPD NO", subheader));
		}

		HeaderTable31.addCell(new Phrase(": " + rtd.getOpdipdno(), tabletext));
		HeaderTable31.addCell(new Phrase(" ", tabletext));

		AdminModel admodel1 = new AdminModel();
		Doctor doc2 = new Doctor();
		List<Doctor> listDoc2 = null;
		String dept = "";
		if (rtd.getDepartmentId() == 1) {
			dept = "OPD";
		} else {
			dept = "IPD";
		}
		if (rtd.getDoctorId().contains(",")) {
			String[] doctors = rtd.getDoctorId().split(",");
			//String Doc_Nme = "";
			String Depart = "";
			for (String str : doctors) {
				String DocID = str;
				int docId = Integer.parseInt(str);
				listDoc2 = admodel1.getDoctorsDepDetails(docId);
				Doc_Nme = Doc_Nme + listDoc2.get(0).getDoc_name() + ",";
				Depart = Depart + listDoc2.get(0).getDepartmentName() + ",";

				if (Depart.contains("null")) {
					Depart = Depart.replace("null,", "");
				}
			}

			HeaderTable31.addCell(new Phrase("Consultant Doc.", subheader));
			HeaderTable31.addCell(new Phrase(": " + Doc_Nme, tabletext));
			HeaderTable31.addCell(new Phrase("Department", subheader));
			HeaderTable31.addCell(new Phrase(": " + dept, tabletext));
			HeaderTable31.addCell(new Phrase(" ", tabletext));

		} else {
			if (!rtd.getDoctorId().equalsIgnoreCase("")) {
				int docId = Integer.parseInt(rtd.getDoctorId());

				listDoc2 = admodel1.getDoctorsDepDetails(docId);

				HeaderTable31.addCell(new Phrase("Consultant Doc.", subheader));
				HeaderTable31.addCell(new Phrase(": " + listDoc2.get(0).getDoc_name(), tabletext));
			} else {
				HeaderTable31.addCell(new Phrase("Consultant Doc.", subheader));
				HeaderTable31.addCell(new Phrase(": -", tabletext));

			}
			if (!rtd.getDoctorId().equalsIgnoreCase("")) {
				int docId = Integer.parseInt(rtd.getDoctorId());
				listDoc2 = admodel1.getDoctorsDepDetails(docId);
				HeaderTable31.addCell(new Phrase("Department", subheader));
				HeaderTable31.addCell(new Phrase(": " + dept, tabletext));
			} else {
				HeaderTable31.addCell(new Phrase("Department", subheader));
				HeaderTable31.addCell(new Phrase(": -", tabletext));

			}
			HeaderTable31.addCell(new Phrase(" ", tabletext));
		} */
		
		HeaderTable31.addCell(new Phrase("OPD/IPD NO", subheader));
		HeaderTable31.addCell(new Phrase(":", tabletext));
		HeaderTable31.addCell(new Phrase("", tabletext));
		
		HeaderTable31.addCell(new Phrase("Consultant Doc.", subheader));
		HeaderTable31.addCell(new Phrase(": " , tabletext)); 
	    HeaderTable31.addCell(new Phrase("Department", subheader));
		HeaderTable31.addCell(new Phrase(": " , tabletext));
		HeaderTable31.addCell(new Phrase("" , tabletext));

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
		HeaderTable11a.setWidths(headerwidth11);
		HeaderTable11a.setWidthPercentage(95f);
		HeaderTable11a.getDefaultCell().setBorder(Rectangle.BOTTOM);

		//Spacing

		HeaderTable11a.addCell(new Phrase("", header1));
		HeaderTable11a.addCell(new Phrase("", header1));
		HeaderTable11a.addCell(new Phrase("", header1));
		HeaderTable11a.addCell(new Phrase("", header1));
		HeaderTable11a.addCell(new Phrase("", header1));
		document.add(HeaderTable11a);
		HeaderTable11a.flushContent();

		PdfPTable HeaderTable6 = new PdfPTable(4);
		int[] headerwidth7 = { 50, 45, 70, 20 };
		HeaderTable6.setWidths(headerwidth7);
		HeaderTable6.setWidthPercentage(95f);
		HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		HeaderTable6.addCell(new Phrase("", subheader2));
		HeaderTable6.addCell(new Phrase("", tabletext2));
		HeaderTable6.addCell(new Phrase("", subheader2));
		HeaderTable6.addCell(new Phrase("", tabletext2));
		HeaderTable6.addCell(new Phrase("", tabletext2));
		HeaderTable6.addCell(new Phrase("", subheader2));
		HeaderTable6.addCell(new Phrase("", tabletext2));

		PdfPTable HeaderTable5ivf = new PdfPTable(6);
		int[] headerwidth5ivf = { 10, 10, 10, 20,20,20 };
		HeaderTable5ivf.setWidths(headerwidth5ivf);
		HeaderTable5ivf.setWidthPercentage(95f);
		HeaderTable5ivf.getDefaultCell().setBorder(Rectangle.BOX);

		IvfDoctorRoundService obj = (ApplicationContextUtils.getApplicationContext())
				.getBean(IvfDoctorRoundService.class);
		//List<IvfDoctorRoundDto> obj1 = obj.getListForIvfDoctorRound(patID);
		
		List<IvfDoctorRoundDto> obj1 = obj.getListForIvfDoctorRoundPrint(ivfTreatId, toDate, fromDate);     
		
		if (obj1.size() > 0) {

			PdfPTable HeaderTable5 = new PdfPTable(4);
			int[] headerwidth5 = { 40, 40, 10, 10 };
			HeaderTable5.setWidths(headerwidth5);
			HeaderTable5.setWidthPercentage(95f);
			HeaderTable5.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

			HeaderTable5.addCell(new Phrase("", header));
			HeaderTable5.addCell(new Phrase("Ivf Doctor Round All Information ", header));
			HeaderTable5.addCell(new Phrase("", header1));
			HeaderTable5.addCell(new Phrase("", header1));

			document.add(HeaderTable5);
			HeaderTable5.flushContent();

			HeaderTable5ivf.addCell(new Phrase(" # ", header));
			HeaderTable5ivf.addCell(new Phrase("  Time", header));
			HeaderTable5ivf.addCell(new Phrase("  Template Name ", header));
			HeaderTable5ivf.addCell(new Phrase("  Clinical Notes", header));
			HeaderTable5ivf.addCell(new Phrase(" Investigation Advice ", header));
			HeaderTable5ivf.addCell(new Phrase("  RoundBy", header));

			if (obj1.size() > 0) {
				int countt = 1;
				for (int i = 0; i < obj1.size(); i++) {
					HeaderTable5ivf.addCell(new Phrase(" " + countt, tabletext));
					HeaderTable5ivf.addCell(new Phrase(" " + obj1.get(i).getTime(), tabletext));
					HeaderTable5ivf.addCell(new Phrase(" " + obj1.get(i).getTmNameIvfDoctorName(), tabletext));
					HeaderTable5ivf.addCell(new Phrase(" " + obj1.get(i).getClinicalNotes(), tabletext));
					HeaderTable5ivf.addCell(new Phrase(" " + obj1.get(i).getInvestigationAd(), tabletext));
					HeaderTable5ivf.addCell(new Phrase(" " + obj1.get(i).getRoundByDoctorName(), tabletext));

					document.add(HeaderTable5ivf);
					HeaderTable5ivf.flushContent();
					countt++;
				}
			}

			document.add(HeaderTable5ivf);
			HeaderTable5ivf.flushContent();
		} else {

		}

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
		
			
				    	