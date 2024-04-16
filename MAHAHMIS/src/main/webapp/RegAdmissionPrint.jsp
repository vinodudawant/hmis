<%@page import="com.hms.opdbill.controller.OpdBillController"%>
<%@page import="com.hms.opdbill.dto.PatientHeaderInfoDto"%>
<%@page import="com.hms.users.service.UsersService"%>
<%@page import="com.hms.dto.Users"%>
<%@page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
 <%@page import="com.itextpdf.text.Element"%>
<%@page import="com.lowagie.text.pdf.Barcode128"%>
<%@page import="java.util.Calendar"%>
<%@page import="com.lowagie.text.pdf.PdfContentByte"%>
 <%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.pharmacy.pojo.CounterSaleMaster"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@ page import="java.util.Date"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.ehat.dto.TreatmentDto"%>
<%@page import="com.hms.ehat.dto.DoctorDto"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.pharmacy.controller.CounterSaleController"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.lowagie.text.PageSize"%>
<%@page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.List"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>

<%@page import="com.hms.pharmacy.upload.FilePath"%>
<%@page import="java.nio.file.Paths"%>

<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"
	import="com.lowagie.text.Chunk,com.lowagie.text.Document,com.lowagie.text.Font
	,com.lowagie.text.HeaderFooter,com.lowagie.text.Image,com.lowagie.text.Paragraph,com.lowagie.text.Phrase,com.lowagie.text.Rectangle
	,com.lowagie.text.pdf.PdfPCell,com.lowagie.text.pdf.PdfPTable,com.lowagie.text.pdf.PdfWriter,com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext,
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>

<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Admission Print</title>
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
		
		ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String billPrint = (String) resourceBundle.getObject("billPrint").toString();
		String billPrintsHeader = (String) resourceBundle.getObject("billPrintsHeader").toString();		
		
		Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
		document.setMargins(20, 20, 20, 0);

		PdfWriter.getInstance(document, outStream);
		document.open();
		//font

		Font header = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font subheader = new Font(Font.HELVETICA, 9, Font.BOLD);
		Font footer = new Font(Font.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader = new Font(Font.HELVETICA, 10,	Font.BOLD);
		Font tabletext = new Font(Font.HELVETICA, 8, Font.NORMAL);
		Font small = new Font(Font.HELVETICA, 8, Font.NORMAL);

		session = request.getSession();
		String user_name = (String) session.getAttribute("userName");
		
		java.util.Calendar currentDate = Calendar.getInstance();
		SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy hh:mm a");
		String curr_date = dateformatter.format(currentDate.getTime());
		
		
		String path = hospObj.getFilePath();
		//String imgName = hospObj.getFilePath();
		//ava.io.File uploadPath = new java.io.File(FilePath.getUPLOADLOGO());
		//String filepath = Paths.get(uploadPath.toString(), imgName).toString(); 
		//String path1 = filepath;//application.getRealPath(path);
		String path1 = application.getRealPath(path);
		
		String hospitalName = hospObj.getHospitalName();
		hospitalName = hospitalName.toUpperCase();
		String address = hospObj.getHospitalAddress();
		String city = hospObj.getHospitalCity();
		String contact = hospObj.getHospitalContact();
		
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
			cell.addElement(new Chunk(img, 1, -25));
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
		int treatId=Integer.parseInt(request.getParameter("treatmentId"));	 
	
		document.newPage();
		
		PdfPTable HeaderTable1 = new PdfPTable(3);
		int[] headerwidth1 = { 30, 70, 30 };
		HeaderTable1.setWidths(headerwidth1);
		HeaderTable1.setWidthPercentage(95f);
		HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		/* HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
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
		HeaderTable1.flushContent(); */

		if (img == null) {
			
			HeaderTable1.addCell(new Phrase("", header));
		} else {
			
			HeaderTable1.addCell(cell);
		}		 
		
		Font regular = new Font(Font.TIMES_ROMAN, 10, Font.NORMAL);
		Font bold = new Font(Font.TIMES_ROMAN, 12, Font.BOLD);
		Phrase p = new Phrase();
		p.add(new Chunk(" "+hospitalName, bold));			
		p.add(new Chunk(" \n\n"+address, tabletext));			
		p.add(new Chunk(" "+city+" Pin- "+hospitalZip+"\n", tabletext));
		p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
           if(!webste.equalsIgnoreCase("")){
		p.add(new Chunk(" \n "+webste, tabletext));
		}
	    p.add(new Chunk(" \n "+"email: "+email, tabletext));			//p.add(new Chunk(" \nPAN No: "+panNo, regular));	
		
		PdfPCell hospitalNameCell = new PdfPCell(p);				
		hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
		HeaderTable1.addCell(hospitalNameCell);
		
		if(billPrint.contains("on")){
			
			if (img == null) {
				
				HeaderTable1.addCell(new Phrase("", header));
			} else {
				
				HeaderTable1.addCell(cellNabh);
			}
		}else{
			
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
		
		PdfPTable HeaderTable8 = new PdfPTable(3);
		int[] headerwidth8 = { 50, 70, 70 };
		HeaderTable8.setWidths(headerwidth8);
		HeaderTable8.setWidthPercentage(95f);
		HeaderTable8.setHorizontalAlignment(Element.ALIGN_RIGHT);
		HeaderTable8.getDefaultCell().setBorder(Rectangle.BOTTOM);
		
		HeaderTable8.addCell(new Phrase("", header));
		HeaderTable8.addCell(new Phrase("", header));		
		HeaderTable8.addCell(new Phrase("", subheader));
		document.add(HeaderTable8);
		HeaderTable8.flushContent();
		
		HeaderTable8.addCell(new Phrase("             ", header));
		HeaderTable8.addCell(new Phrase("             ADMISSION CASE PAPER", header));		
		HeaderTable8.addCell(new Phrase("Print Date and Time : "+curr_date, subheader));
		document.add(HeaderTable8);
		HeaderTable8.flushContent();
 
		OpdBillController uss=(ApplicationContextUtils.getApplicationContext()).getBean(OpdBillController.class);
		PatientHeaderInfoDto rtd = new PatientHeaderInfoDto();	
		rtd.setTreatmentId(treatId);
		rtd=uss.getPatientInfoByTreatmentId(rtd);
		rtd=rtd.getListRegTreBillDto().get(0);
		String HallName="";
		if(rtd.getHallName().equals(null)){
			HallName="-";
		}else{
		 HallName=rtd.getHallName();
		}
		DoctorDto rtd1 = new DoctorDto();
		List<RegTreBillDto> ltPatientRecord = null;
		List<RegTreBillDto> ltDocotorRecord = null;
		String PType = "";
		String addressPatient = "";
		String perAddressPatient = "";
		String conDocName  ="";
		String docName  ="";
		String refSourceDocName  ="";
		String refSourceName ="";
		String relativeName ="";
		int relationId=0;
		String relation="";
		String dtTime="";
		String BillCategoryName ="";
		
		if(uss != null){
			
			int stateId = rtd.getStateId();
			int townId   =rtd.getTownId();
			int districtId =rtd.getDistrictId();
			int talukaId   =rtd.getTalukaId();
			int refDocId   =rtd.getRefDocId();
			int refSourceId   =rtd.getRefSrcId();
			int refSourceDocId   =rtd.getRefSrcDocId();
			int doctorId = 0;
			 
			String nabh1 = rtd.getImageName();
			addressPatient=rtd.getAddress();
			if(rtd.getPerAddress()!=null){
				perAddressPatient=rtd.getPerAddress();
			}
			 
			relativeName= rtd.getRelativeName();
			relationId= rtd.getRelationId();
			 
			if(relationId==1){
					relation="S/O";
			}else if(relationId==2){
				relation="W/O";
			}else if(relationId==3){
				relation="D/O";
			}else if(relationId==4){
				relation="F/O";
			}else if(relationId==5){
				relation="Late S/O";
			}else if(relationId==6){
				relation="Late W/O";
			}else if(relationId==7){
				relation="Late D/O";
			}else if(relationId==8){
				relation="Owner";
			}
			 				 
			 /* if(rtd.getDoctorId() != ""){
				  doctorId =Integer.parseInt(rtd.getDoctorId());
			 } */
			SimpleDateFormat sdf1=new SimpleDateFormat("dd/MM/YYYY, hh:mm:ss a");
			dtTime=sdf1.format(rtd.getCreatedDateTime());
			 
			String state  ="";
			String district  ="";
			String cityObj  ="";
			String taluka  ="";
			 
			LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
			 
			if(refSourceId == 0){
				 refSourceName = ""; 
			}else if((refSourceId == 1)){
				refSourceName   = "Awareness Lecture";
			}else if((refSourceId == 2)){
				refSourceName   = "Hospital";
			}else if((refSourceId == 3)){
				refSourceName   = "Internet";
			}else if((refSourceId == 4)){
				refSourceName   = "News Paper";
			}else if((refSourceId == 5)){
				refSourceName   = "Other";
			}else if((refSourceId == 6)){
				refSourceName   = "Our Patient Name";
			}else if((refSourceId == 7)){
				refSourceName   = "Our Patient Name";
			}else if((refSourceId == 8)){
				refSourceName   = "Television";
			}else if((refSourceId == 9)){
				refSourceName   = "In House Doctor/User";
			}else{
				refSourceName   = "";
			}
			
			if(refDocId > 0){
				conDocName  = fetchlist.getStringValOfObject("doctor","doc_name",refDocId,"Doctor_ID");
			}else{
				conDocName   = "";
			}
			
			if(refSourceDocId > 0){
				refSourceDocName = fetchlist.getStringValOfObject("doctor","doc_name",refSourceDocId,"Doctor_ID"); 
			}else{
				refSourceDocName   = "";
			}
		
			int sponsorSlave=rtd.getChargesMasterSlaveId();
			
			AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
			List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
			
			if(sponsorSlave > 0){
				fetchsposor   = obj.fetchSuperCatofchargesSlave(sponsorSlave);
				BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
				BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id");
			}else{
				BillCategoryName = "Self";
			}
		}
		
		//Added for Residential And Parmanant address on 08-May-2018.
		//RegistrationController uss1=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
		PatientHeaderInfoDto rtd2 = rtd;//new RegTreBillDto();			
		//String PType = "";
		String patient_address = "";
		String per_patient_address = "";
		if(uss != null){
			
			//rtd2=uss1.fetchPatientsRecordByTreatmentId(treatId);
			//rtd2=rtd2.getListRegTreBillDto().get(0);
			rtd2.getPatientName();
			
			int stateId = rtd2.getStateId();
			int townId   =rtd2.getTownId();
			int districtId =rtd2.getDistrictId();
			int talukaId   =rtd2.getTalukaId();
			
			String state  ="";
			String district  ="";
			String cityObj  ="";
			String taluka  ="";
			 
			LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
			
			if(stateId > 0 ){
				state   = fetchlist.getStringValOfObject("state","state_name",stateId,"idstate");
			}else{
				state   = "";
			}
			if(districtId > 0){
				district = fetchlist.getStringValOfObject("district","dis_name",districtId,"iddistrict"); 
			}else{
				district   = "";
			}
			
			if(townId > 0){
				cityObj = fetchlist.getStringValOfObject("city","city_name",townId,"idcity");
			}else{
				cityObj   = "";
			}
			
			if(talukaId > 0){
				taluka  = fetchlist.getStringValOfObject("taluka","taluka_name",talukaId,"idtaluka"); 
			}else{
				taluka   = "";
			}				
			
			if(cityObj != "0" && !cityObj.equals("undefined") && !cityObj.equals("")){
				patient_address += cityObj;
			}
			
			if (taluka != "0" && !taluka.equals("undefined") && !taluka.equals("")){
				patient_address +=  (" "+taluka);
			}						
			if (district != "0" && !district.equals("undefined") && !district.equals("")){
				patient_address += (" " + district);
			}
			if (state != "0" && !state.equals("undefined") && !state.equals("")){
				patient_address += ("," + state);
			}
			
			int perstateId = rtd2.getPerstateId();
			int pertownId   =rtd2.getPertownId();
			int perdistrictId =rtd2.getPerdistrictId();
			int pertalukaId   =rtd2.getPertalukaId();
			 
			String perstate  ="";
			String perdistrict  ="";
			String percityObj  ="";
			String pertaluka  ="";
			 
			if(perstateId > 0 ){
				 perstate   = fetchlist.getStringValOfObject("state","state_name",perstateId,"idstate");
			}else{
				//perstate   = "Maharashtra";
			}
			if(perdistrictId > 0){
				perdistrict = fetchlist.getStringValOfObject("district","dis_name",perdistrictId,"iddistrict"); 
			}else{
				//perdistrict   = "Pune";
			}
			
			if(pertownId > 0){
				percityObj = fetchlist.getStringValOfObject("city","city_name",pertownId,"idcity");
			}else{
				percityObj   = "";
			}
			
			if(pertalukaId > 0){
				pertaluka  = fetchlist.getStringValOfObject("taluka","taluka_name",pertalukaId,"idtaluka"); 
			}else{
				pertaluka   = "";
			}				
			
			if(percityObj != "0" && !percityObj.equals("undefined") && !percityObj.equals("")){
				per_patient_address += percityObj;
			}
			
			if (pertaluka != "0" && !pertaluka.equals("undefined") && !pertaluka.equals("")){
				per_patient_address +=  (" "+pertaluka);
			}						
			if (perdistrict != "0" && !perdistrict.equals("undefined") && !perdistrict.equals("")){
				per_patient_address += (" " + perdistrict);
			}
			if (perstate != "0" && !perstate.equals("undefined") && !perstate.equals("")){
				per_patient_address += ("," + perstate);
			}
		}
		
		PdfPTable HeaderTable2 = new PdfPTable(4);
		int[] headerwidth2 = { 5,10,5,10 };
		HeaderTable2.setWidths(headerwidth2);
		HeaderTable2.setWidthPercentage(95f);
		HeaderTable2.setHorizontalAlignment(Element.ALIGN_RIGHT);
		HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
		
		PdfPTable HeaderTable3 = new PdfPTable(3);
		int[] headerwidth3 = { 30,40,20};
		HeaderTable3.setWidths(headerwidth3);
		HeaderTable3.setWidthPercentage(95f);
		HeaderTable3.setHorizontalAlignment(Element.ALIGN_RIGHT);
		HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER); 
		
		PdfPTable HeaderTable4 = new PdfPTable(4);
		int[] headerwidth4 = { 5,10,6,10 };
		HeaderTable4.setWidths(headerwidth4);
		HeaderTable4.setWidthPercentage(95f);
		HeaderTable4.setHorizontalAlignment(Element.ALIGN_RIGHT);
		HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		
		document.add(HeaderTable1);
		HeaderTable1.flushContent();
		
		
		String [] opdno = rtd.getOpdipdno().split("/");
		int deptId = rtd.getDepartmentId();
		
		if(deptId == 2)
		{
			HeaderTable2.addCell(new Phrase("IPD No", subheader));
		}else if(deptId == 1){
			
			HeaderTable2.addCell(new Phrase("OPD No", subheader));
		}else if(deptId == 3){
			
			HeaderTable2.addCell(new Phrase("Diag No", subheader));
		}
		HeaderTable2.addCell(new Phrase(""+rtd.getOpdipdno(), tabletext));
		
		/* HeaderTable2.addCell(new Phrase("MR NO :", subheader));
		HeaderTable2.addCell(new Phrase(""+rtd.getMrnno(), tabletext)); */
		HeaderTable2.addCell(new Phrase("", subheader));
		HeaderTable2.addCell(new Phrase("", tabletext));
					
		document.add(HeaderTable2);
		HeaderTable2.flushContent();
		//RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
		//List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
		//ltRegMasterDto =us.fetchPatientsRecordByTreatmentId(treatId);
		
		String nabh1 = rtd.getImageName();//ltRegMasterDto.get(0).getImageName();
		
		String pathToWeb = FilePath.getBasePath();
		pathToWeb=pathToWeb + File.separator + nabh1;			
		String nabhLogo1 = application.getRealPath(nabh1);
		
		Image imgNabh1 = null;
		PdfPCell cellNabh1 = null;
		try {
			imgNabh1 = Image.getInstance(pathToWeb);
			imgNabh1.scaleAbsolute(60, 40);
			cellNabh1 = new PdfPCell();
			cellNabh1.addElement(new Chunk(imgNabh1, 5, -5));
			cellNabh1.setBorder(Rectangle.NO_BORDER);
		} catch (Exception e) {
			e.printStackTrace();
		} 
					
		HeaderTable3.addCell(new Phrase("Patient ID", subheader));
		HeaderTable3.addCell(new Phrase(": "+rtd.getPatientId(), tabletext));
		HeaderTable3.addCell(new Phrase("", subheader));
		
		HeaderTable3.addCell(new Phrase("Name", subheader));
		HeaderTable3.addCell(new Phrase(": "+rtd.getPatientName(), tabletext));
		HeaderTable3.addCell(new Phrase("", subheader));
		
		
		/*  cellNabh1.setRowspan(20);
		 HeaderTable3.addCell(cellNabh1);  */
		
		HeaderTable3.addCell(new Phrase("Age/Gender/Wt", subheader));
		HeaderTable3.addCell(new Phrase(": "+rtd.getAge()+"/"+rtd.getGender()+"/"+rtd.getWeight(), tabletext));
		HeaderTable3.addCell(new Phrase("", subheader)); 
		
		HeaderTable3.addCell(new Phrase("Mob No", subheader));
		HeaderTable3.addCell(new Phrase(": "+rtd.getMobile(), tabletext));
		HeaderTable3.addCell(new Phrase("", subheader));
		
		/* HeaderTable3.addCell(new Phrase("", tabletext));
		HeaderTable3.addCell(new Phrase("", subheader));
		HeaderTable3.addCell(new Phrase("", tabletext));
		
		HeaderTable3.addCell(new Phrase("", tabletext));
		HeaderTable3.addCell(new Phrase("", subheader));
		HeaderTable3.addCell(new Phrase("", tabletext)); */
		
		/* HeaderTable3.addCell(new Phrase("Admission Details", subheader));
		HeaderTable3.addCell(new Phrase(": ", tabletext));
		 HeaderTable3.addCell(new Phrase("", subheader)); */ 
		
		if(!addressPatient.equalsIgnoreCase("") || !patient_address.equalsIgnoreCase("") && addressPatient!=null){
			HeaderTable3.addCell(new Phrase("Residential Address", subheader));
			HeaderTable3.addCell(new Phrase(": "+addressPatient+" "+patient_address,tabletext));
		 	HeaderTable3.addCell(new Phrase("", subheader));
		}
		
		if(!perAddressPatient.equalsIgnoreCase("") || !per_patient_address.equalsIgnoreCase("") && perAddressPatient!=null){
			HeaderTable3.addCell(new Phrase("Permanent Address", subheader));
			HeaderTable3.addCell(new Phrase(": "+perAddressPatient+" "+per_patient_address,tabletext));
		 	HeaderTable3.addCell(new Phrase("", subheader)); 
		}
		
		if(!relativeName.equalsIgnoreCase("") && relativeName!=null){
			HeaderTable3.addCell(new Phrase("Relative Name", subheader));
			HeaderTable3.addCell(new Phrase(": "+relation+"-"+relativeName,tabletext));
		 	HeaderTable3.addCell(new Phrase("", subheader)); 
		}
		
		document.add(HeaderTable3);
		HeaderTable3.flushContent();
		
		HeaderTable2.addCell(new Phrase("", tabletext));
		HeaderTable2.addCell(new Phrase("", tabletext));
		HeaderTable2.addCell(new Phrase("", tabletext));
		HeaderTable2.addCell(new Phrase("", tabletext));
		
		document.add(HeaderTable2);
		HeaderTable2.flushContent();
		
		/* UsersService user = (ApplicationContextUtils.getApplicationContext()).getBean(UsersService.class);
		Doctor doc2 = new Doctor();
		List<Doctor> listDoc2 = null;
		
		if(!rtd.getDoctorId().equals("")){
			if(rtd.getDoctorId().contains(",")){
				
				String[] doctors = rtd.getDoctorId().split(",") ;
				String Doc_Nme = "";
				String Depart = "";
				for(String str :doctors){
					String DocID = str;
					int docId =  Integer.parseInt(str);
					listDoc2 = user.getDoctorsDepDetails(docId);
					Doc_Nme = Doc_Nme + listDoc2.get(0).getDoc_name()+",";
				}
				
				HeaderTable4.addCell(new Phrase("Doctor Incharge", subheader));
				HeaderTable4.addCell(new Phrase(": "+Doc_Nme, tabletext));			
				
			}else{
					
				int docId =  Integer.parseInt(rtd.getDoctorId());
				listDoc2 = user.getDoctorsDepDetails(docId);
				
				HeaderTable4.addCell(new Phrase("Doctor Incharge", subheader));
				HeaderTable4.addCell(new Phrase(": "+listDoc2.get(0).getDoc_name(), tabletext));
			}
		} */
		
		HeaderTable4.addCell(new Phrase("Doctor Incharge", subheader));
		HeaderTable4.addCell(new Phrase(": "+rtd.getConsultingDocName(), tabletext));
		
		String regDate = dateformatter.format(rtd.getCreatedDateTime());
		
		HeaderTable4.addCell(new Phrase("Reg Date and Time:", subheader));
		HeaderTable4.addCell(new Phrase(""+regDate, tabletext));
		
		HeaderTable4.addCell(new Phrase("Referred By", subheader));
		if(!conDocName.equals("")){
		HeaderTable4.addCell(new Phrase(": "+rtd.getRefDocName(), tabletext));
		}else{
		HeaderTable4.addCell(new Phrase("", subheader));
		}
		HeaderTable4.addCell(new Phrase("Ward Name:", subheader));
		HeaderTable4.addCell(new Phrase(""+HallName, tabletext));
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", tabletext));
		
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", tabletext));
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", tabletext));
		
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", tabletext));
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", tabletext));
		
		/* HeaderTable4.addCell(new Phrase("Payment Details", subheader));
		HeaderTable4.addCell(new Phrase("", tabletext));
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", tabletext)); */
		
		document.add(HeaderTable4);
		HeaderTable4.flushContent();
		
		HeaderTable2.addCell(new Phrase("", tabletext));
		HeaderTable2.addCell(new Phrase("", tabletext));
		HeaderTable2.addCell(new Phrase("", tabletext));
		HeaderTable2.addCell(new Phrase("", tabletext));
		
		document.add(HeaderTable2);
		HeaderTable2.flushContent();
		
		HeaderTable2.addCell(new Phrase("Bill Category", subheader));
		HeaderTable2.addCell(new Phrase(": "+BillCategoryName, tabletext));
		HeaderTable2.addCell(new Phrase("", subheader));		
		HeaderTable2.addCell(new Phrase("", tabletext));
		
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", tabletext));
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", tabletext));
		
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", tabletext));
		HeaderTable4.addCell(new Phrase("", subheader));
		HeaderTable4.addCell(new Phrase("", tabletext));
		
		document.add(HeaderTable4);
		HeaderTable4.flushContent();
		
		document.add(HeaderTable2);
		HeaderTable2.flushContent();
				
		document.close();
 		outStream.close();
		outStream.flush();
		return;

	} catch (Exception e) {
		System.err.println(e.getMessage());
		e.printStackTrace();
	}
%>
</body>
</html>
