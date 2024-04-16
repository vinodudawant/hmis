<%@page import="com.hms.ehat.dto.InformedConsentFormDto"%>
<%@page import="com.hms.ehat.service.DialysisService"%>
<%@page import="com.hms.dao.AdminDAO"%>
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

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Consent Form Informed</title>
</head>
<body>
	<%
		try {
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
		
		Integer treatmentId=Integer.parseInt(request.getParameter("tretmentId"));
		
		RegistrationController uss=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
		RegTreBillDto rtd = new RegTreBillDto();			
		List<RegTreBillDto> ltPatientRecord = null;
		rtd=uss.fetchPatientsRecordByTreatmentId(treatmentId);
		rtd=rtd.getListRegTreBillDto().get(0);
		
			
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
		
		PdfPTable HeaderTable3 = new PdfPTable(4);
		int[] headerwidth3 = { 40,40, 5,10};
		HeaderTable3.setWidths(headerwidth3);
		HeaderTable3.setWidthPercentage(95f);
		HeaderTable3.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable3.getDefaultCell().setBorder(Rectangle.BOTTOM);

		HeaderTable3.addCell(new Phrase("", header));
		HeaderTable3.addCell(new Phrase("HAERECORDMODIALTSIS ", header));
		HeaderTable3.addCell(new Phrase("Date:", subheader));
		HeaderTable3.addCell(new Phrase(curr_date, subheader));
		document.add(HeaderTable1);
		HeaderTable3.flushContent();
		
		PdfPTable headerTable5 = new PdfPTable(4);
		int[] headerwidth5 = { 15,40,15,30};
		headerTable5.setWidths(headerwidth5);
		headerTable5.setWidthPercentage(95f);		
		headerTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", subheader));
		headerTable5.addCell(new Phrase("", subheader));
		
		headerTable5.addCell(new Phrase("Patient Name       :", subheader));
		headerTable5.addCell(new Phrase(""+ rtd.getPatientName(), tabletext));			
	
		
		headerTable5.addCell(new Phrase("OPD No.                 : ", subheader));
		headerTable5.addCell(new Phrase(""+ rtd.getOpdipdno(), tabletext));			
		
		
		headerTable5.addCell(new Phrase("Admission Date   : ", subheader));
		headerTable5.addCell(new Phrase(""+ rtd.getCreatedDateTime(), tabletext));			
	
				
		headerTable5.addCell(new Phrase("Bill No.                 : ", subheader));
		headerTable5.addCell(new Phrase(""+ rtd.getBillId(), tabletext));
		
		headerTable5.addCell(new Phrase(" ", subheader));
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
		
		DialysisService  ds=(ApplicationContextUtils.getApplicationContext()).getBean(DialysisService.class);
		List<InformedConsentFormDto> ListinfromedDto = ds.getinformedconsentForm(treatmentId);		
		InformedConsentFormDto obj =new InformedConsentFormDto();	
		obj.setListinformedform(ListinfromedDto);
	
		String patientName="-";
		      
		String addresspatient="-";
		String reletive="-";
		
		if(obj.getListinformedform().size()>0){
			patientName =obj.getListinformedform().get(0).getPatientName();
			System.out.println(patientName);
			addresspatient=obj.getListinformedform().get(0).getAddress();
			System.out.println(addresspatient);
			reletive =obj.getListinformedform().get(0).getReletive();
		  }else{
			patientName="-";
			addresspatient="-";
			reletive="-";
		} 
		 
		
		PdfPTable HeaderTable2 = new PdfPTable(1);
		int[] headerwidth2 = { 100 };
		HeaderTable2.setWidths(headerwidth2);
		HeaderTable2.setWidthPercentage(95f);
		
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable2
					.addCell(new Phrase(
							"I  "
									+ patientName
									+ "    Resident Of   "
									+ addresspatient
									+ "   do hear by 1)consent to undergo hemodialysis 2) Subject my wife/  Hunband/Father/mother/Son/Daughter/Relative  "
									+ reletive
									+ "   to undergo hemodialysis on such occassions and at such times as	 may deemed necessary by Nephrologist of health & Dialysis Center Larsen & Tuorbo.",
							tabletext));
			HeaderTable2.addCell(new Phrase(
							"If an access has not already been created.I agree to have a subcleaven juguar or femoral calheter inserted as many times as required.as decided by the doctor in charge.Complication arising out of this procedure have been explained to me.",
							tabletext));
			HeaderTable2.addCell(new Phrase(
							"The Nephrologist concerned has explained to me about hemodialysis and its effect and possible risks such as nausea,vomiting,hypertension,rigors,bleeding,convulsions even cardiac arrest.The possiblity of transmission of viruses such as hepatitis B,C & HIV during the procedure has also been explained to me.",
							tabletext));
			HeaderTable2.addCell(new Phrase(
							"I consent to the performance of any other procedure and administrator of any drug including blood trasfusion ,which may become necessary as a result hemodialysis or the disease.",
							tabletext));
			HeaderTable2.addCell(new Phrase(
							"I undersatnd that each patient is oermitted to have only one visitor to wait in waiting area while She/he is on dialysis.eachy patient is oermitted to have only one visitor to wait in waiting area while She/he is on dialysis.",
							tabletext));
			HeaderTable2.addCell(new Phrase(
							"I consenet to accept any dialysis machine alloted to me by the technician /nurse/doctor on duty.Demands for any perticular machine of my choice will not be entertained,also schedule for dialysis may be keep changing and no perticular shift will be permanently given.Machine with TV will not be provided every time.During the commencement and termination of a dialysis no realtives will be allowed to interfere with the work schedule.",
							tabletext));
			HeaderTable2.addCell(new Phrase(
							"Patient not responding for dialysis must inform sister inchage of the doctor at least 4 hours time.",
							tabletext));
			HeaderTable2.addCell(new Phrase(
							"I understand that HIV test,Australia antigen test and Anti HCV test are compulsory before putting a patient on the dialysis programme.These tests will be repeated from time as deemed nesessary by the Nephrologists.These tests,I unserstand are to be paid for by me.",
							tabletext));
			HeaderTable2.addCell(new Phrase(
							"I have read and understood above things.i have been explaines the alternative modes of treatement including CAPO,Kidney trasplantation and the consequences of not taking regular dialsys.",
							tabletext));
			HeaderTable2.addCell(new Phrase(
							"I have read also been told that certain items will be resused during dialysis to decrease the cost of dialysis.These items are Dialyzers,blood tubing sets,Plasmapheresis filter etc.",
							tabletext));
			HeaderTable2.addCell(new Phrase(
							"I also understand that explained nurese and/or technicians mainly carry out dialysis and the nephrologists may not be present during the entire procidure.",
							tabletext));
			HeaderTable2.addCell(new Phrase(
							"Doctors have tolde me that patient may get Cardio-Respiratory Arrest or any complication or mishaup during & after Hemodialysis.",
							tabletext));
			HeaderTable2.addCell(new Phrase(
							"In case of any complication I shall need to be transported to nearest Hospital with Intensive Care Unit facility as I am aware is not available at Larsen & Toubro.Health & Dialysis Centre Thane.",
							tabletext));
			HeaderTable2.addCell(new Phrase("Doctors have tolde me that patient may get Cardio-Respiratory Arrest or any complication or mishaup during & after Hemodialysis.",
					tabletext));
			HeaderTable2.addCell(new Phrase("In case of any complication I shall need to be transported to nearest Hospital with Intensive Care Unit facility as I am aware is not available at Larsen & Toubro.Health & Dialysis Centre Thane.",
					tabletext));

			document.add(HeaderTable2);
			HeaderTable2.flushContent();

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

			Paragraph title = new Paragraph("Signature");
			title.setAlignment(Element.ALIGN_RIGHT);
			document.add(title);
			title.setSpacingAfter(500);
			title.setSpacingBefore(500);

			title.setIndentationLeft(500);
			title.setIndentationRight(500);

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