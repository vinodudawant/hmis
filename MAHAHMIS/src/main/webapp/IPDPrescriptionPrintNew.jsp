<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.ehat.dto.PlanTreatDTO"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.ehat.controller.NursingStationController"%>
<%@page import="com.hms.ipdbill.service.IpdBillService"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>
<%@page import="com.hms.pharmacy.upload.FilePath"%>
<%@ page import="com.hms.dto.DischargeSummery"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.dto.Appointment"%>
<%@page import="com.hms.ehat.dao.impl.PatientChemoDaoImpl"%>
<%@page import="com.hms.ehat.dao.PatientChemoDao"%>
<%@page import="com.hms.dto.PatientCareAdvicesDto"%>
<%@page import="com.hms.ehat.controller.PatientChemoController"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.ehat.dto.TreatmentDto"%>
<%@page import="com.hms.ehat.dto.CpoeOTdetails"%>
<%@page import="com.hms.model.PatientModel"%>
<%@page import="com.hms.dto.Treatmentipdservices"%>
<%@page import="com.hms.dto.DoctorRoundReport"%>
<%@page import="com.hms.ehat.controller.CpoeIPDdetails"%>
<%@page import="com.hms.dto.RadiotherapyDTO"%>
<%@ page import="com.hms.dto.LabTest"%>
<%@page import="com.hms.dto.AdviceDTO"%>
<%@page import="com.hms.dto.ReportInstructionDTO"%>
<%@page import="com.hms.dto.PrescriptionInstruction"%>
<%@ page import="com.hms.dto.LabProfile"%>
<%@ page import="com.hms.admin.util.QuestionMaster"%>
<%@page import="com.hms.dto.TreatmentInstructionDTO"%>
<%@ page import="com.hms.dto.Order_comp_druges"%>
<%@page import="com.hms.ehat.dto.CpoeServdetails"%>
<%@page import="com.hms.ehat.controller.DoctordeskController"%>
<%@page import="com.hms.dto.Prescription"%>
<%@page import="java.util.Calendar"%>
<%@page import="com.hms.dto.VaccineDTO"%>
<%@page import="com.hms.dto.Treatment"%>
<%@page import="com.itextpdf.text.html.simpleparser.StyleSheet"%>
<%@page import="com.itextpdf.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.hms.dto.AllergyAlertsDTO"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="org.jsoup.Jsoup"%>
<%@page import="com.hms.model.TreatmentModel"%>
<%@page import="com.hms.dto.Assessment"%>

<%@page import="com.hms.model.IPDTreatmentModel"%>
<%@page import="com.hms.dto.IPDHistoryMaster"%>
<%@page import="com.hms.dto.Order_master"%>

<%@page import="com.hms.dto.CustomizeTemplate"%>


<%@page import="com.hms.hisab.model.HisabModel"%>
<%@page import="com.hms.ipdbill.dto.BillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.serviceImpl.BillServiceImpl"%>
<%@page import="com.hms.ipdbill.service.BillService"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%-- <%@ page import="com.hms.dto.HospitalDetails"%> --%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.dto.RadiationMaster"%>
<%@ page import="com.hms.model.AdminModel"%>
<%@page import="com.hms.dto.PatientCareAdvicesDto"%>
<%@page import="com.hms.ehat.controller.PatientChemoController"%>
<%@page import="com.hms.dto.PatientChemoDto"%>
<%@page import="com.hms.dto.Hall"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<!DOCTYPE html>
<html>
<head>
<meta  http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Auto DischargeSummaryPrint</title>
</head>
<body>
	<%
		try {

			response.setContentType("application/pdf");
			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext())
					.getBean(HospitalDetailAdminService.class);
					List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String billPrint = (String) resourceBundle.getObject("billPrint").toString();
			String billPrintsHeader = (String) resourceBundle.getObject("billPrintsHeader").toString();	
			
			String fontName = application.getRealPath("font-awesome/fonts/Shiv05.ttf");
			FontFactory.register(fontName);

			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			document.setMargins(20, 20, 20, 50);

			PdfWriter.getInstance(document, outStream);
			document.open();
			//font

			Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font subheader = new Font(Font.FontFamily.HELVETICA, 8,
			Font.BOLD);
			Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
			header.setColor(10, 4, 2);
			 Font header1 = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font header2 = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font subheader2 = new Font(Font.FontFamily.HELVETICA, 8,
					Font.BOLD);
			Font tabletext2 = new Font(Font.FontFamily.HELVETICA, 8,
					Font.NORMAL);

			Font tableheader = new Font(Font.FontFamily.HELVETICA, 10,
			Font.BOLD);
			Font tabletext = new Font(Font.FontFamily.HELVETICA, 8,
			Font.NORMAL);
			Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);

			session = request.getSession();
			String user_name = (String) session.getAttribute("userName");
			int userid = (Integer) session.getAttribute("userId");
			String path = hospObj.getFilePath();
			String hospitalName = hospObj.getHospitalName();
			hospitalName = hospitalName.toUpperCase();
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
			String hospRegNo = hospObj.getHosRegNo();
			String nabh = hospObj.getNabhImagePath(); 
			String nabhLogo = application.getRealPath(nabh);
			
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
					
			//int billId=Integer.parseInt(request.getParameter("billId"));
			int patID=Integer.parseInt(request.getParameter("patID"));
			int treatId=Integer.parseInt(request.getParameter("treatID"));
			String patientID=(request.getParameter("patID"));
			String treatmentID=(request.getParameter("treatID"));
			String date_pick=(request.getParameter("date_pick"));
			String dischargeType=request.getParameter("discharge_Type");
			String tomIdS = request.getParameter("tomId");
			String dischargedate=request.getParameter("dischargedate");
			String	divfollow =request.getParameter("divfollow");
			String	opdlab =request.getParameter("opdlab");
			System.err.println("=-==----OPD-------------->>>"+opdlab);
			int emrId = 0;
			//String editorContent = request.getParameter("editorContent");
			
			String editorContent = "";
			String vaccinationFlagCheckboxPrint = "undefined";
			java.util.Calendar currentDate = Calendar.getInstance();
			SimpleDateFormat dateformatter = new SimpleDateFormat(
					"dd/MM/yyyy hh:mm:ss a");
			String curr_date = dateformatter.format(currentDate.getTime());
			//String dischargeType=request.getParameter("discharge_Type");
			//String dischargedate=request.getParameter("dischargedate");
						
			
			NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");
			//numberFormatTwoDecimal.format(Math.round(5.5));
			//System.err.println(lstPojo.size());
			
			//For No. of prints.
			AdminModel adminModelObj = new AdminModel();
			int printId = 2;
			int numOfPrint = adminModelObj.generalAccessNumOfPrint(printId);// to get number of prints
			System.err.println("=-==------------------>>>"+numOfPrint);

			for (int no = 0; no < numOfPrint; no++) {
	
			document.newPage();
			
			PdfPTable HeaderTable31 = new PdfPTable(1);
			int[] headerwidth31 = { 120 };
			HeaderTable31.setWidths(headerwidth31);
			HeaderTable31.setWidthPercentage(95f);
			HeaderTable31.getDefaultCell().setBorder(Rectangle.BOTTOM);

			PdfPTable HeaderTable4 = new PdfPTable(3);
			int[] headerwidth4 = { 30, 60, 20 };
			HeaderTable4.setWidths(headerwidth4);
			HeaderTable4.setWidthPercentage(95f);
			HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
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

						if (img == null) {
							
							HeaderTable1.addCell(new Phrase("", header));
						} else {
							
							HeaderTable1.addCell(cell);
						}		 
						
						Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
						Font bold = new Font(FontFamily.TIMES_ROMAN, 12, Font.BOLD);
						Phrase p = new Phrase();
						p.add(new Chunk(" "+hospitalName, bold));			
						p.add(new Chunk(" \n\n"+address, tabletext));			
						p.add(new Chunk(" "+city+" Pin- "+hospitalZip, tabletext));
						p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
						p.add(new Chunk(" \n "+webste+" email: "+email, tabletext));
						if(!hospRegNo.equalsIgnoreCase("")){
							p.add(new Chunk(" \n "+"Hospital RegNo: "+hospRegNo, tabletext));	
							}else
							{
								p.add(new Chunk(" \n "+"Hospital RegNo: -", tabletext));	

							}
						//p.add(new Chunk(" \nPAN No : "+panNo , tabletext));	
					/* 	p.add(new Chunk(" \nCIN: "+cinNo+", GST : "+gstNo , tabletext));	
						p.add(new Chunk(" \nSERVICE TAX NO: "+serviceTaxNo+", PAN No: "+panNo, tabletext)); */	
						
						PdfPCell hospitalNameCell = new PdfPCell(p);				
						hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
						HeaderTable1.addCell(hospitalNameCell);
						
						if(billPrint.contains("on")){
							
							if (img == null) {
								
								HeaderTable1.addCell(new Phrase("", header));
							} else {
								if(cellNabh==null){
									
									HeaderTable1.addCell("");

								}else{
									HeaderTable1.addCell(cellNabh);
								}
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
						
						// Table 1 : For hospital adress details end

			PdfPTable HeaderTable8 = new PdfPTable(2);
			int[] headerwidth8 = { 30, 60 };
			HeaderTable8.setWidths(headerwidth8);
			HeaderTable8.setWidthPercentage(95f);
			HeaderTable8.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable8.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable8.addCell(new Phrase("  ", header));
			HeaderTable8.addCell(new Phrase("  DISCHARGE SUMMARY", header));			
						
			document.add(HeaderTable8);
			HeaderTable8.flushContent();		
			
			
			//Start table for 
			//fetch patient record
			
			String docName="";
			String refDocName  ="";
			 RegistrationController uss=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
			RegTreBillDto rtd = new RegTreBillDto();			
			List<RegTreBillDto> ltPatientRecord = null;
			String PType = "";
			String addressPatient = "";
			if(uss != null)
			{
				rtd=uss.fetchPatientsRecordByTreatmentId(treatId);
				rtd=rtd.getListRegTreBillDto().get(0);
				rtd.getPatientName();
				
				
				
				 int stateId = rtd.getStateId();
				 int townId   =rtd.getTownId();
				 int districtId =rtd.getDistrictId();
				 int talukaId   =rtd.getTalukaId();
				 int refDocId =rtd.getRefDocId();
				
				 
				 String BillCategoryName ="";
				 String state  ="";
				 String district  ="";
				 String cityObj  ="";
				 String taluka  ="";
				 
				LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
				AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
				List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
				
				
				RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
				List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
				ltRegMasterDto =us.fetchPatientsRecordByTreatmentId(treatId);
				
				
				String docId=ltRegMasterDto.get(0).getDoctorId();
				System.out.println("docId....."+docId);
				
				
				if(!docId.equals("") && !docId.contains(",")){
					
					int doctorId = Integer.parseInt(docId);
					if(doctorId > 0){
						docName   = fetchlist.getStringValOfObject("doctor","doc_name",doctorId,"Doctor_ID");
					}
				}else{
					docName   = "";
				}
				
				
		 
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
					addressPatient += cityObj;
				}
				
				if (taluka != "0" && !taluka.equals("undefined") && !taluka.equals("")) 
				{
					addressPatient +=  (" "+taluka);
				}						
				if (district != "0" && !district.equals("undefined") && !district.equals("")) 
				{
					addressPatient += (" " + district);
				}
				if (state != "0" && !state.equals("undefined") && !state.equals("")) 
				{
					addressPatient += ("," + state);
				}
				if(refDocId > 0 ){
					refDocName   = fetchlist.getStringValOfObject("doctor","doc_name",refDocId,"Doctor_ID");
				}else{
					refDocName   = "";
				}
				
				
				int a=rtd.getSourceTypeId();
				if(a>0){
					PType="Sponsor";
	 			}else{
	 				PType="Self";					
				}	
			}
		/* 	//new table no 2 start
			PdfPTable HeaderTable2 = new PdfPTable(2);
			int[] headerwidth2 = { 7,46};
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);		
			
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable2.addCell(new Phrase("Patient Name", subheader));
			HeaderTable2.addCell(new Phrase(": "+ rtd.getPatientName(), subheader));
			
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			
			document.add(HeaderTable2);
			HeaderTable2.flushContent();
			//End table no 2 start */
			
			//For Get Hall Name
			RegService regSer=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
			List<Hall> hallName = new ArrayList<Hall>();
			hallName = regSer.fetchPatientsBedRecords(treatId);
						
			IpdBillService fetchServlist=(ApplicationContextUtils.getApplicationContext()).getBean(IpdBillService.class);	
			
			BillNobleService fetchSubServlist=(ApplicationContextUtils.getApplicationContext()).getBean(BillNobleService.class);	
			
			List<EhatViewPatientBedDetailsIpdDto> listBedIpdDto2=fetchServlist.getPatientBedBill(treatId,3);
			
			
			//new table no 3 start
			PdfPTable HeaderTable3 = new PdfPTable(5);
			int[] headerwidth3 = { 15,43,20,18,7};
			HeaderTable3.setWidths(headerwidth3);
			HeaderTable3.setWidthPercentage(95f);		
			
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
		//	HeaderTable3.addCell(new Phrase("Patient ID", subheader));
			HeaderTable3.addCell(new Phrase("UHID", subheader));
			HeaderTable3.addCell(new Phrase(": "+patientID, tabletext));
			//HeaderTable3.addCell(new Phrase("Treatment ID", subheader));
			//HeaderTable3.addCell(new Phrase(": "+treatId, tabletext));
			HeaderTable3.addCell(new Phrase("Ward",subheader));
			//HeaderTable3.addCell(new Phrase(": "+listBedIpdDto2.get(0).gethName(),tabletext));
			HeaderTable3.addCell(new Phrase(": "+hallName.get(0).getHname(),tabletext));
			HeaderTable3.addCell(new Phrase(" ", tabletext));
			
			HeaderTable3.addCell(new Phrase("Patient Name", subheader));
			HeaderTable3.addCell(new Phrase(": "+ rtd.getPatientName(), tabletext));
			HeaderTable3.addCell(new Phrase("Date of Admission", subheader));
			HeaderTable3.addCell(new Phrase(": "+ rtd.getCreatedDateTime(), tabletext));
			HeaderTable3.addCell(new Phrase(" ", tabletext));
			
			HeaderTable3.addCell(new Phrase("Age", subheader));
			if(rtd.gettFlag().equals("N") && rtd.getAge3() != null){			
			HeaderTable3.addCell(new Phrase(": "+ rtd.getAge3(), tabletext));
			}else{
			HeaderTable3.addCell(new Phrase(": "+ rtd.getAge(), tabletext));
			}
			HeaderTable3.addCell(new Phrase("Gender", subheader));
			HeaderTable3.addCell(new Phrase(": "+ rtd.getGender(), tabletext));
			HeaderTable3.addCell(new Phrase(" ", tabletext));
				
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable3.addCell(new Phrase("Address", subheader));
			HeaderTable3.addCell(new Phrase(":"+ rtd.getAddress()+" "+ addressPatient, tabletext));
			HeaderTable3.addCell(new Phrase("Type", subheader));
			HeaderTable3.addCell(new Phrase(": "+ PType, tabletext));
			HeaderTable3.addCell(new Phrase(" ", tabletext));	
			
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable3.addCell(new Phrase("Tel/Mob.No", subheader));
			HeaderTable3.addCell(new Phrase(": "+ rtd.getMobile(), tabletext));			
			HeaderTable3.addCell(new Phrase("IPD NO", subheader));
			HeaderTable3.addCell(new Phrase(": "+ rtd.getOpdipdno(), tabletext));
			HeaderTable3.addCell(new Phrase(" ", tabletext));	
			
			
			
			
		/* 	HeaderTable3.addCell(new Phrase("Ward",subheader));
			HeaderTable3.addCell(new Phrase(": "+listBedIpdDto2.get(0).gethName(),tabletext));
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", tabletext));
			HeaderTable3.addCell(new Phrase(" ", tabletext)); */	
			        
		
			
			AdminModel admodel1 = new AdminModel();
			Doctor doc2 = new Doctor();
			List<Doctor> listDoc2 = null;

			if(rtd.getDoctorId().contains(",")&& !rtd.getDoctorId().equalsIgnoreCase("")){
				
				
				String[] doctors = rtd.getDoctorId().split(",") ;
				String Doc_Nme = "";
				String Depart = "";
				for(String str :doctors )
				{
					String DocID = str;
					int docId =  Integer.parseInt(str);
					listDoc2 = admodel1.getDoctorsDepDetails(docId);
					if(listDoc2.size() != 0){
						 Doc_Nme = Doc_Nme + listDoc2.get(0).getDoc_name()+",";
						 Depart = Depart + listDoc2.get(0).getDepartmentName()+",";
					}
					
							
				}
				HeaderTable3.addCell(new Phrase("Consultant Doc.", subheader));
				HeaderTable3.addCell(new Phrase(": "+Doc_Nme, tabletext));			
				HeaderTable3.addCell(new Phrase("", subheader));
				HeaderTable3.addCell(new Phrase("", tabletext));
				HeaderTable3.addCell(new Phrase("", tabletext));
				
			}
			else{
				if(!rtd.getDoctorId().equalsIgnoreCase("")){
			int docId =  Integer.parseInt(rtd.getDoctorId());
			
			listDoc2 = admodel1.getDoctorsDepDetails(docId);
				
			HeaderTable3.addCell(new Phrase("Consultant Doc.", subheader));
			HeaderTable3.addCell(new Phrase(": "+listDoc2.get(0).getDoc_name(), tabletext));
				}else{
					HeaderTable3.addCell(new Phrase("Consultant Doc.", subheader));
					HeaderTable3.addCell(new Phrase(": -", tabletext));
					
				}
			HeaderTable3.addCell(new Phrase("Ref By", subheader));
			/* HeaderTable3.addCell(new Phrase(": "+refDocName, tabletext)); */
			HeaderTable3.addCell(new Phrase(": "+rtd.getDocNameChan(), tabletext));
			
			HeaderTable3.addCell(new Phrase("", tabletext));
			
			}
			
			HeaderTable3.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", tabletext));			
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", tabletext));
			HeaderTable3.addCell(new Phrase(" ", tabletext));	
			
			document.add(HeaderTable3);
			HeaderTable3.flushContent();			
			//End table no 3 start
			
			
		/* 	//new table no 5 start
			PdfPTable HeaderTable5 = new PdfPTable(2);
			int[] headerwidth5 = { 10,46};
			HeaderTable5.setWidths(headerwidth5);
			HeaderTable5.setWidthPercentage(95f);		
			
			HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable5.addCell(new Phrase("Tel/Mob.No", subheader));
			HeaderTable5.addCell(new Phrase(": "+ rtd.getMobile(), tabletext));
			
			HeaderTable5.addCell(new Phrase("IPD NO", subheader));
			HeaderTable5.addCell(new Phrase(": "+ rtd.getOpdipdno(), tabletext));
		
			
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable5.addCell(new Phrase("", subheader));
			HeaderTable5.addCell(new Phrase("", subheader));
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
			//End table no5 start */
			
			
			
			
			PdfPTable twoPT = new PdfPTable(2);
			int[] widthInst = { 25, 75 };
			twoPT.setWidths(widthInst);
			twoPT.setWidthPercentage(95f);
			twoPT.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			TreatmentModel treatmentModel = new TreatmentModel();

			// start: Allergies
			List<AllergyAlertsDTO> allergyAlertsDTOList = null;
			allergyAlertsDTOList = treatmentModel.fetchAllergyAlerts(patientID);

			twoPT.addCell(new Phrase("", subheader));
			twoPT.addCell(new Phrase("", tabletext));

			document.add(twoPT);
			twoPT.flushContent();

			/*****************New Instruction Table***********************/
			
			AdminModel adminModel = new AdminModel(); 
			List<QuestionMaster> result = adminModel.FetchEMRTemplate(patID,treatId,emrId);
			List<QuestionMaster> assignCompFindList = adminModel.FetchEMRAssignedCompFind(patID,treatId,emrId);

////////////////////////////////////////////////////////////////			
			if(assignCompFindList.get(0).getCmpli().size() != 0){
				twoPT.addCell(new Phrase("Complaints : ", subheader));
				twoPT.addCell(new Phrase("", subheader));
				for (int j = 0; j < assignCompFindList.get(0).getCmpli().size(); j++) {
					if(assignCompFindList.get(0).getCmpli().get(j).getType().equals("complaint")){
						if (j == 0) {
							twoPT.addCell(new Phrase("", subheader));
							twoPT.addCell(new Phrase("" + assignCompFindList.get(0).getCmpli().get(j).getComplaintName(), tabletext));
							}else{
								twoPT.addCell(new Phrase("", subheader));
								twoPT.addCell(new Phrase("" + assignCompFindList.get(0).getCmpli().get(j).getComplaintName(), tabletext));
							}

					}else{
						twoPT.addCell(new Phrase("", subheader));
						twoPT.addCell(new Phrase("", subheader));
					}
				}
				
				twoPT.addCell(new Phrase("", subheader));
				twoPT.addCell(new Phrase("", tabletext));

				document.add(twoPT);
				twoPT.flushContent(); 
			}

			
			
			/*****************New Instruction Table***********************/
			PdfPTable twoPTF = new PdfPTable(2);
				int[] widthInstF = { 25, 75 };
				twoPTF.setWidths(widthInstF);
				twoPTF.setWidthPercentage(95f);
				twoPTF.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			String xyz = "";
			List<CustomizeTemplate> customizeTemplateList = adminModel.fetchCKEditorDocterDesk1(treatmentID);
			PdfPTable instructionPT = new PdfPTable(3);
			int[] widthforInst = { 30, 35, 35 };
			instructionPT.setWidths(widthforInst);
			instructionPT.setWidthPercentage(95f);
			instructionPT.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			String StringFinal = "";

			
			if (result.size() != 0) {
				twoPT.addCell(new Phrase("Past and Personal History : ", subheader));
				twoPT.addCell(new Phrase("", subheader));
				for (int i = 0; i < result.size(); i++) {
					if(result.get(i).getOptli().size() == 0){
						
						twoPT.addCell(new Phrase("", subheader));
						
						twoPT.addCell(new Phrase("" + (result.get(i).getLique_access().get(0).getQuestion()) + " = " + 
								(result.get(i).getTextAns()), tabletext));
						
					}else{
						twoPT.addCell(new Phrase("", subheader));
						
						twoPT.addCell(new Phrase("" + (result.get(i).getLique_access().get(0).getQuestion()) + " = " + 
								(result.get(i).getOptli().get(0).getOptName()), tabletext));
					}
				}
				
			} else {
				/* twoPT.addCell(new Phrase("--", tabletext)); */
			
			}
		
			document.add(twoPT);
			twoPT.flushContent(); 
//////////////////////////////////

			int cnt = 0;
			if(assignCompFindList.get(0).getCmpli().size() != 0){
				twoPTF.addCell(new Phrase("Findings : ", subheader));
				twoPTF.addCell(new Phrase("", subheader));
				for (int k = 0; k < assignCompFindList.get(0).getCmpli().size(); k++) {
					if(assignCompFindList.get(0).getCmpli().get(k).getType().equals("finding")){
							if (cnt == 0) {
								cnt++;		
								twoPTF.addCell(new Phrase("", subheader));
								twoPTF.addCell(new Phrase("" + assignCompFindList.get(0).getCmpli().get(k).getComplaintName(), tabletext));
								}else{
									twoPTF.addCell(new Phrase("", subheader));
									twoPTF.addCell(new Phrase("" + assignCompFindList.get(0).getCmpli().get(k).getComplaintName(), tabletext));
								}
						
					}
				}
				
				twoPTF.addCell(new Phrase("", subheader));
				twoPTF.addCell(new Phrase("", tabletext));

				document.add(twoPTF);
				twoPTF.flushContent(); 
			}


			
			// start: Allergies
			//List<AllergyAlertsDTO> allergyAlertsDTOList = null;
			allergyAlertsDTOList = treatmentModel.fetchAllergyAlerts(patientID);

			twoPT.addCell(new Phrase("", subheader));
			twoPT.addCell(new Phrase("", tabletext));
			
			
			if (allergyAlertsDTOList.size() != 0) {
				twoPT.addCell(new Phrase("Alerts & Allergies: ", subheader));
				twoPT.addCell(new Phrase("", subheader));
				for (int i = 0; i < allergyAlertsDTOList.size(); i++) {

					
						twoPT.addCell(new Phrase("", subheader));
						twoPT.addCell(new Phrase(""+allergyAlertsDTOList.get(i).getAllergyName()
								+"---"+allergyAlertsDTOList.get(i).getAllergyDate(), tabletext));
						

				}

			} else {/* 
				twoPT.addCell(new Phrase("", subheader));
				twoPT.addCell(new Phrase("- No Known Allergies -",tabletext));
			 */}

			twoPT.addCell(new Phrase("", subheader));
			twoPT.addCell(new Phrase("", tabletext));

			document.add(twoPT);
			twoPT.flushContent();
			

			/*****************New Instruction Table***********************/
			//String xyz = "";
			
			// end: Allergies
			
			
			// START: assesment
				List<Assessment> listasses = treatmentModel
						.fetchAssessment(treatmentID);

				if (listasses.size() != 0) {

					PdfPTable HeaderTable15 = new PdfPTable(2);
					int[] headerwidth15 = { 20, 80 };
					HeaderTable15.setWidths(headerwidth15);
					HeaderTable15.setWidthPercentage(95f);
					HeaderTable15.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);

					HeaderTable15.addCell(new Phrase("", header));
					HeaderTable15.addCell(new Phrase("", header));

					HeaderTable15.addCell(new Phrase("", header));
					HeaderTable15.addCell(new Phrase("", header));

					document.add(HeaderTable15);
					HeaderTable15.flushContent();

					for (int i = 0; i < listasses.size(); i++) {

						if (listasses.get(i).getDiagno_type()
								.equalsIgnoreCase("Confirmed")) {

							HeaderTable15.addCell(new Phrase(
									"Confirmed Diagnosis :", subheader));
							HeaderTable15.addCell(new Phrase(""
									+ (listasses.get(i).getDiagnosis()),
									tabletext));
						}

						if (listasses.get(i).getDiagno_type()
								.equalsIgnoreCase("Provisional")) {

							HeaderTable15.addCell(new Phrase(
									"Provisional Diagnosis :", subheader));
							HeaderTable15.addCell(new Phrase(""
									+ (listasses.get(i).getDiagnosis()),
									tabletext));

						}

					}

					HeaderTable15.addCell(new Phrase("", header));
					HeaderTable15.addCell(new Phrase("", header));

					HeaderTable15.addCell(new Phrase("", header));
					HeaderTable15.addCell(new Phrase("", header));

					document.add(HeaderTable15);
					HeaderTable15.flushContent();

					HeaderTable15.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable15.addCell(new Phrase("", header));
					HeaderTable15.addCell(new Phrase("", header));
					document.add(HeaderTable15);
					HeaderTable15.flushContent();

				}
				// END: assesment

				///////////////////////////////Cheif//////////////////
				
				
				String treatIdString=request.getParameter("treatID");
			IPDTreatmentModel IpdTmodel= new IPDTreatmentModel(); //(ApplicationContextUtils.getApplicationContext()).getBean(TreatmentModel.class);
			IPDHistoryMaster IpdHM = new IPDHistoryMaster();			
			
			List<Order_master> order_masterli = new ArrayList<Order_master>();
			
			List<IPDHistoryMaster> IPDHistoryMasterli = new ArrayList<IPDHistoryMaster>();
			List<IPDHistoryMaster> IPDHistoryCompli = new ArrayList<IPDHistoryMaster>();
			IPDHistoryMasterli=IpdTmodel.fetchIPDHistory(treatIdString);

				
				
							DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			
			Date date = new Date();
			String currDate=dateFormat.format(date);
			
			order_masterli=IpdTmodel.featchOrderFormByDate(currDate, treatIdString, "previous");
			
			IPDTreatmentModel objIPDTreatmentModel = new IPDTreatmentModel();
			List<IPDHistoryMaster> arrTN = new ArrayList<IPDHistoryMaster>();

			arrTN = objIPDTreatmentModel.fetchIPDHistory(treatIdString);
			
			IPDHistoryMaster objTN = new IPDHistoryMaster();
			PdfPTable HeaderTable5a = new PdfPTable(4);
			int[] headerwidth5a = {30,45,30,45 };
			HeaderTable5a.setWidths(headerwidth5a);
			HeaderTable5a.setWidthPercentage(95f);
			HeaderTable5a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			   PdfPTable HeaderTable6a = new PdfPTable(4);
			    int[] headerwidth7a={40,55,45,55};
			    HeaderTable6a.setWidths(headerwidth7a);
			    HeaderTable6a.setWidthPercentage(95f);
			    HeaderTable6a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			    PdfPTable HeaderTable6b = new PdfPTable(4);
			    int[] headerwidth7c={60,55,45,35};
			    HeaderTable6b.setWidths(headerwidth7c);
			    HeaderTable6b.setWidthPercentage(95f);
			    HeaderTable6b.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				PdfPTable HeaderTable3a = new PdfPTable(4);
			    int[] headerwidth3a= {45,45,45,45 };
			    HeaderTable3a.setWidths(headerwidth3a);
			    HeaderTable3a.setWidthPercentage(95f);
			    HeaderTable3a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			   PdfPTable HeaderTable6 = new PdfPTable(7);
			    int[] headerwidth71={40,75,45,55,20,30,50};
			    HeaderTable6.setWidths(headerwidth71);
			    HeaderTable6.setWidthPercentage(95f);
			    HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			    PdfPTable HeaderTable8a = new PdfPTable(4);
			    int[] headerwidth8a= {45,45,45,45 };
			    HeaderTable8a.setWidths(headerwidth8a);
			    HeaderTable8a.setWidthPercentage(95f);
			    HeaderTable8a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		    	objTN.setListIPdHistoryCompona(arrTN);
			int ncount = 1;
			PdfPTable twoPT1 = new PdfPTable(2);
			int[] widthInst1 = { 75, 25 };
			twoPT1.setWidths(widthInst1);
			twoPT1.setWidthPercentage(95f);
			twoPT1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			PdfPTable twoPT21 = new PdfPTable(2);
			int[] widthInst12 = { 75, 25 };
			twoPT21.setWidths(widthInst12);
			twoPT21.setWidthPercentage(95f);
			twoPT21.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		    if (arrTN.size() != 0) {
	    		
				   
				 
	    for (IPDHistoryMaster objIPDHistoryMasterCom : objTN.getListIPdHistoryCompona()) 
		{
	       /* HeaderTable5a.addCell(new Phrase("\nChief Complaints and Duration", header1)); */
	       String age3="";
	       String age=rtd.getAge();
	       String age2[] =age.split("/");
	       if(age2[0].contains("Y")){
	    	   age =age2[0].replaceAll("Y", "Year Old " + rtd.getGender());
	       }else{
	    	   age="";
	       }
	       HeaderTable5a.addCell(new Phrase("", header1));
		   HeaderTable5a.addCell(new Phrase(""+ age,subheader2));
		   HeaderTable5a.addCell(new Phrase("",subheader2));
		   HeaderTable5a.addCell(new Phrase("",tabletext2));
	       HeaderTable5a.addCell(new Phrase("\nChief Complaints:", header1));
		   HeaderTable5a.addCell(new Phrase("",tabletext2));
		   HeaderTable5a.addCell(new Phrase("",subheader2));
		   HeaderTable5a.addCell(new Phrase("",tabletext2));
		   
		   HeaderTable5a.addCell(new Phrase("", header1));
		   HeaderTable5a.addCell(new Phrase("",tabletext2));
		   HeaderTable5a.addCell(new Phrase("",subheader2));
		   HeaderTable5a.addCell(new Phrase("",tabletext2));
		   
		   HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	    	HeaderTable6.addCell(new Phrase("",subheader2));
	    	
	    	HeaderTable6.getDefaultCell().setBorder(Rectangle.BOX);
	    	/* HeaderTable6.addCell(new Phrase("              #",subheader2)); */
	    	HeaderTable6.addCell(new Phrase(" Chief Complaints",subheader2));
	    	HeaderTable6.addCell(new Phrase(" Duration",subheader2));
	    	
	    	HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	    	HeaderTable6.addCell(new Phrase("",subheader2));
	    	HeaderTable6.addCell(new Phrase("",subheader2));
	    	HeaderTable6.addCell(new Phrase("",subheader2));
	    	HeaderTable6.addCell(new Phrase("",subheader2));
	    	
		  
		}
	     
	    document.add(HeaderTable5a);
		HeaderTable5a.flushContent(); 
		
	    document.add(HeaderTable6);
	    HeaderTable6.flushContent(); 
	    
	    
	    for (IPDHistoryMaster objIPDHistoryMasterCom : objTN.getListIPdHistoryCompona().get(0).getListIPdHistoryCompona()) 
		{
	    	HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	    	HeaderTable6.addCell(new Phrase("",footer));
	    	HeaderTable6.getDefaultCell().setBorder(Rectangle.BOX);
		   /*  HeaderTable6.addCell(new Phrase("             "+ncount,tabletext2)); */
	    	HeaderTable6.addCell(new Phrase("   "+objIPDHistoryMasterCom.getChief_com_durration(),tabletext2));
	    	HeaderTable6.addCell(new Phrase("   "+objIPDHistoryMasterCom.getChief_duration() +"   "+objIPDHistoryMasterCom.getdays_month_year(),tabletext2));
	    	
	    	HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	    	HeaderTable6.addCell(new Phrase("",footer));
	    	HeaderTable6.addCell(new Phrase("",footer));
	    	HeaderTable6.addCell(new Phrase("",footer)); 
	    	HeaderTable6.addCell(new Phrase("",footer));  
	    	ncount++;
		}
	    
	    document.add(HeaderTable6);
	    HeaderTable6.flushContent(); 
	      
	     for (IPDHistoryMaster objIPDHistoryMasterCom : objTN.getListIPdHistoryCompona()) 
		{
		  		    		
	    		if(!objIPDHistoryMasterCom.getChiefComplaintsTxt().equals("") && !objIPDHistoryMasterCom.getChiefComplaintsTxt().equals("-") ){
	    			
	    			
	    		        	 HeaderTable6b.addCell(new Phrase("Cheif Compliants :",subheader2));
			    			 HeaderTable6b.addCell(new Phrase(""+objIPDHistoryMasterCom.getChiefComplaintsTxt(),tabletext2));
			    			 HeaderTable6b.addCell(new Phrase("",subheader2));
			    			 HeaderTable6b.addCell(new Phrase("", tabletext2));
	    		        
				 }
	    		else{
	    			 HeaderTable6b.addCell(new Phrase("",subheader2));
	    			 HeaderTable6b.addCell(new Phrase("",tabletext2));
	    			 HeaderTable6b.addCell(new Phrase("",subheader2));
	    			 HeaderTable6b.addCell(new Phrase("", tabletext2));
	    		}
	    		document.add(HeaderTable6b);
	    		HeaderTable6b.flushContent();
	    		
	    		}
	    
	   
	    for (IPDHistoryMaster objIPDHistoryMasterCom : objTN.getListIPdHistoryCompona()) 
		{

			if(!objIPDHistoryMasterCom.getclinicalFinding().equals("")){
				 
				/* HeaderTable6a.addCell(new Phrase("Clinical Finding:", subheader2)); */
				HeaderTable6a.addCell(new Phrase("Negative History :", subheader2));
				HeaderTable6a.addCell(new Phrase(""+objIPDHistoryMasterCom.getclinicalFinding(),tabletext2));
				HeaderTable6a.addCell(new Phrase("",subheader2));
				   HeaderTable6a.addCell(new Phrase("",tabletext2));
				 
			 }
		}
	    
	    HeaderTable8a.getDefaultCell().setBorder(Rectangle.BOTTOM);
	    HeaderTable8a.addCell(new Phrase("",tabletext2));
	    HeaderTable8a.addCell(new Phrase("",subheader2));
	    HeaderTable8a.addCell(new Phrase("",tabletext2));
	    HeaderTable8a.addCell(new Phrase("",tabletext2)); 
	    
	    document.add(HeaderTable5a);
		HeaderTable5a.flushContent(); 
		
	    document.add(HeaderTable6);
	    HeaderTable6.flushContent();
	    
	    document.add(HeaderTable6a);
	    HeaderTable6a.flushContent();
	    
	    document.add(HeaderTable8a);
		HeaderTable8a.flushContent(); 
	  
	    
	   for (IPDHistoryMaster objIPDHistoryMasterCom : objTN.getListIPdHistoryCompona()) 
		{
		  
		    String DM   = objIPDHistoryMasterCom.getDm();
	    	String HTN = objIPDHistoryMasterCom.getHtn();
	    	String IHD = objIPDHistoryMasterCom.getIhd();
	    	String BA_COPD = objIPDHistoryMasterCom.getBacopd();
	    	String OTHER = objIPDHistoryMasterCom.getOther();
	    	
	    	if(!DM.equals("0-") || !HTN.equals("0-") || !IHD.equals("0-") || !BA_COPD.equals("0-") || !OTHER.equals("0-")||
	    			!objIPDHistoryMasterCom.getMedications().equals("") ||!objIPDHistoryMasterCom.getPast_surgical_his().equals("")){
	    		
	    					   
		   //HeaderTable5a.addCell(new Phrase("\nPast Medical History", header1));
		   	twoPT1.addCell(new Phrase("\n Past History  :", header1));
					twoPT1.addCell(new Phrase("", subheader));
					document.add(twoPT1);
					twoPT.flushContent();

			
			HeaderTable6a.addCell(new Phrase("",tabletext2));
			HeaderTable6a.addCell(new Phrase("",subheader2));
			HeaderTable6a.addCell(new Phrase("",tabletext2));
			HeaderTable6a.addCell(new Phrase("", subheader2));
			
			
			
			
			 if(!objIPDHistoryMasterCom.getMedications().equals("")){
				 
				 HeaderTable6a.addCell(new Phrase("Medications:",subheader2));
				 HeaderTable6a.addCell(new Phrase(""+objIPDHistoryMasterCom.getMedications(),tabletext2));
				 HeaderTable6a.addCell(new Phrase("", subheader2));
				 HeaderTable6a.addCell(new Phrase("", subheader2));
			 }
			
			 
			if(!objIPDHistoryMasterCom.getPast_surgical_his().equals("")){
				 
				HeaderTable6a.addCell(new Phrase("Past Surgical History:", subheader2));
				HeaderTable6a.addCell(new Phrase(""+objIPDHistoryMasterCom.getPast_surgical_his(),tabletext2));
				HeaderTable6a.addCell(new Phrase("", subheader2));
				HeaderTable6a.addCell(new Phrase("", subheader2));
			 }
			
			/* 
			if(!objIPDHistoryMasterCom.getclinicalFinding().equals("")){
				 
				HeaderTable6a.addCell(new Phrase("Clinical Finding:", subheader2));
				HeaderTable6a.addCell(new Phrase(""+objIPDHistoryMasterCom.getclinicalFinding(),tabletext2));
				 
			 } */
			
			HeaderTable6a.addCell(new Phrase("",tabletext2));
			HeaderTable6a.addCell(new Phrase("", subheader2));
			
			
			
			HeaderTable6a.addCell(new Phrase("",tabletext2));
			HeaderTable6a.addCell(new Phrase("",subheader2));
			HeaderTable6a.addCell(new Phrase("",tabletext2));
			HeaderTable6a.addCell(new Phrase("", subheader2));
			
		
			HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable6.addCell(new Phrase("",tabletext2));
			HeaderTable6.addCell(new Phrase("",subheader2));
			HeaderTable6.addCell(new Phrase("",tabletext2));
			HeaderTable6.addCell(new Phrase("", subheader2));
			HeaderTable6.addCell(new Phrase("",subheader2));
			HeaderTable6.addCell(new Phrase("",subheader2));
			HeaderTable6.addCell(new Phrase("",tabletext2));
			
			HeaderTable8a.getDefaultCell().setBorder(Rectangle.BOTTOM);
		    HeaderTable8a.addCell(new Phrase("",tabletext2));
		    HeaderTable8a.addCell(new Phrase("",subheader2));
		    HeaderTable8a.addCell(new Phrase("",tabletext2));
		    HeaderTable8a.addCell(new Phrase("",tabletext2)); 
		    
			
		    PdfPTable HeaderTable7 = new PdfPTable(2);
		    int[] headerwidth81= {20,80};
		    HeaderTable7.setWidths(headerwidth81);
		    HeaderTable7.setWidthPercentage(95f);
		    HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		    
		    
		    String[] DMT = DM.split("-");
		    String dmtDetails="";
	    	if(DMT[0].equals("1")){
	    		DMT[0] = "K/c/o";
	    	}else{
	    		DMT[0] = "No H/O";
	    	}
	    	
	    	if(DMT.length > 1){
	    		dmtDetails=DMT[1];
	    	}
	    	
		    HeaderTable7.addCell(new Phrase("",tabletext2)); 
		    HeaderTable7.addCell(new Phrase(DMT[0]+" DM "+dmtDetails,tabletext2));
		    
		    
		    String[] HTNT = HTN.split("-");
		    String htntDetails="";
		    
	    	if(HTNT[0].equals("1")){
	    		HTNT[0] = "K/c/o";
	    	}else{
	    		HTNT[0] = "No H/O";
	    	}
	    	
	    	if(HTNT.length > 1){
	    		htntDetails=HTNT[1];
	    	}
	    	
	    	HeaderTable7.addCell(new Phrase("",tabletext2)); 
		    HeaderTable7.addCell(new Phrase(HTNT[0]+" HTN "+htntDetails,tabletext2));
		    
		    String[] IHDT = IHD.split("-");
		    String ihdtDetails="";
		    
	    	if(IHDT[0].equals("1")){
	    		IHDT[0] = "K/c/o";
	    	}else{
	    		IHDT[0] = "No H/O";
	    	}
	    	
	    	if(IHDT.length > 1){
	    		ihdtDetails=IHDT[1];
	    	}
	    	
	    	HeaderTable7.addCell(new Phrase("",tabletext2)); 
		    HeaderTable7.addCell(new Phrase(IHDT[0]+" IHD "+ihdtDetails,tabletext2));
		    
		    String[] BA_COPDT = BA_COPD.split("-");
		    String ba_copdtDetails="";
	    	if(BA_COPDT[0].equals("1")){
	    		BA_COPDT[0] = "K/c/o";
	    	}else{
	    		BA_COPDT[0] = "No H/O";
	    	}
	    	
	    	if(BA_COPDT.length > 1){
	    		ba_copdtDetails=BA_COPDT[1];
	    	}
	    	
	    	HeaderTable7.addCell(new Phrase("",tabletext2)); 
		    HeaderTable7.addCell(new Phrase(BA_COPDT[0]+" BA/COPD "+ba_copdtDetails,tabletext2));
		    
		    String[] OTHERT = OTHER.split("-");
	    
	    	if(OTHERT.length > 1){
	    		HeaderTable7.addCell(new Phrase("",tabletext2)); 
			    HeaderTable7.addCell(new Phrase(OTHERT[1],tabletext2));
	    	}
	    	
		    
		    document.add(HeaderTable7);
		    HeaderTable7.flushContent(); 
		    
			/* if(!DM.equals("0-") || !HTN.equals("0-") || !IHD.equals("0-") || !BA_COPD.equals("0-") || !OTHER.equals("0-")){
	    	HeaderTable6.getDefaultCell().setBorder(Rectangle.BOX);
	    	HeaderTable6.addCell(new Phrase("             #",subheader2));
	    	HeaderTable6.addCell(new Phrase("        Yes/No",subheader2));
	    	HeaderTable6.addCell(new Phrase("    Duration(Hr.)",subheader2));
	    	
	    	HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	    	HeaderTable6.addCell(new Phrase("",subheader2));
	    	HeaderTable6.addCell(new Phrase("",subheader2));
	    	HeaderTable6.addCell(new Phrase("",subheader2));
	    	HeaderTable6.addCell(new Phrase("",subheader2));
	    	
			} */
	    	
	    	
	    	/* //if(!DM.equals("0-")){
	    		
	    	String[] DMT = DM.split("-");
	    	if(DMT[0].equals("1")){
	    		//DMT[0] = "Yes";
	    		DMT[0] = "K/c/o";
	    	}else{
	    		//DMT[0] = "No";
	    		DMT[0] = "No h/o";
	    	}

	    	
	    	HeaderTable6.getDefaultCell().setBorder(Rectangle.BOX);
	    	HeaderTable6.addCell(new Phrase("           DM",subheader2));
	    	HeaderTable6.addCell(new Phrase("          "+DMT[0],tabletext2));
	    	
	    	if(DMT.length > 1){
	    		HeaderTable6.addCell(new Phrase(""+DMT[1],tabletext2));
	    	}else{
	    		HeaderTable6.addCell(new Phrase("-",tabletext2));
	    	}
	    	
	    	HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	    	HeaderTable6.addCell(new Phrase("",footer));
	    	HeaderTable6.addCell(new Phrase("",footer));
	    	HeaderTable6.addCell(new Phrase("",footer)); 
	    	HeaderTable6.addCell(new Phrase("",footer)); 
	    	}
	    	
	    	if(!HTN.equals("0-")){
	    	 String[] HTNT = HTN.split("-");
		    	if(HTNT[0].equals("1")){
		    		HTNT[0] = "K/c/o";
		    	}else{
		    		HTNT[0] = "No h/o";
		    	}

		    	HeaderTable6.getDefaultCell().setBorder(Rectangle.BOX);
		    	HeaderTable6.addCell(new Phrase("           HTN",subheader2));
		    	HeaderTable6.addCell(new Phrase("          "+HTNT[0],tabletext2));
		    	
		    	if(HTNT.length > 1){
		    		HeaderTable6.addCell(new Phrase(""+HTNT[1],tabletext2));
		    	}else{
		    		HeaderTable6.addCell(new Phrase("-",tabletext2));
		    	}
		    	
		    	HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		    	HeaderTable6.addCell(new Phrase("",footer));
		    	HeaderTable6.addCell(new Phrase("",footer));
		    	HeaderTable6.addCell(new Phrase("",footer)); 
		    	HeaderTable6.addCell(new Phrase("",footer)); 
	    	//} */
	    	
	    	/* //if(!IHD.equals("0-")){
		    	String[] IHDT = IHD.split("-");
		    	if(IHDT[0].equals("1")){
		    		IHDT[0] = "K/c/o";
		    	}else{
		    		IHDT[0] = "No h/o";
		    	}

		    	HeaderTable6.getDefaultCell().setBorder(Rectangle.BOX);
		    	HeaderTable6.addCell(new Phrase("           IHD",subheader2));
		    	HeaderTable6.addCell(new Phrase("          "+IHDT[0],tabletext2));
		    	
		    	if(IHDT.length > 1){
		    		HeaderTable6.addCell(new Phrase(""+IHDT[1],tabletext2));
		    	}else{
		    		HeaderTable6.addCell(new Phrase("-",tabletext2));
		    	}
		    	
		    	HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		    	HeaderTable6.addCell(new Phrase("",footer));
		    	HeaderTable6.addCell(new Phrase("",footer));
		    	HeaderTable6.addCell(new Phrase("",footer)); 
		    	HeaderTable6.addCell(new Phrase("",footer)); 
	    	//} */
	    	
	    	
	    	/* //if(!BA_COPD.equals("0-")){
		    	String[] BA_COPDT = BA_COPD.split("-");
		    	if(BA_COPDT[0].equals("1")){
		    		BA_COPDT[0] = "K/c/o";
		    	}else{
		    		BA_COPDT[0] = "No h/o";
		    	}

		    	
		    	
		    	HeaderTable6.getDefaultCell().setBorder(Rectangle.BOX);
		    	HeaderTable6.addCell(new Phrase("           BA/COPD",subheader2));
		    	HeaderTable6.addCell(new Phrase("          "+BA_COPDT[0],tabletext2));
		    	
		    	if(BA_COPDT.length > 1){
		    		HeaderTable6.addCell(new Phrase(""+BA_COPDT[1],tabletext2));
		    	}else{
		    		HeaderTable6.addCell(new Phrase("-",tabletext2));
		    	}
		    	
		    	HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		    	HeaderTable6.addCell(new Phrase("",footer));
		    	HeaderTable6.addCell(new Phrase("",footer));
		    	HeaderTable6.addCell(new Phrase("",footer)); 
		    	HeaderTable6.addCell(new Phrase("",footer)); 
	    	//} */
	    	
	    	/* //if(!OTHER.equals("0-")){
		    	String[] OTHERT = OTHER.split("-");
		    	if(OTHERT[0].equals("1")){
		    		OTHERT[0] = "K/c/o";
		    	}else{
		    		OTHERT[0] = "No h/o";
		    	}

		    	
		    	
		    	HeaderTable6.getDefaultCell().setBorder(Rectangle.BOX);
		    	HeaderTable6.addCell(new Phrase("           OTHER",subheader2));
		    	HeaderTable6.addCell(new Phrase("          "+OTHERT[0],tabletext2));
		    	
		    	if(OTHERT.length > 1){
		    		HeaderTable6.addCell(new Phrase("        "+OTHERT[1],tabletext2));
		    	}else{
		    		HeaderTable6.addCell(new Phrase("         -",tabletext2));
		    	}
	    	//} */
		    	HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		    	HeaderTable6.addCell(new Phrase("",footer));
		    	HeaderTable6.addCell(new Phrase("",footer));
		    	HeaderTable6.addCell(new Phrase("",footer)); 
		    	HeaderTable6.addCell(new Phrase("",footer)); 
	    	 }
	    	
		    	
		    	HeaderTable6.addCell(new Phrase("", header2));
				HeaderTable6.addCell(new Phrase("", header2));
				HeaderTable6.addCell(new Phrase("", header2));
				HeaderTable6.addCell(new Phrase("", header2));
				HeaderTable6.addCell(new Phrase("", header2));
				HeaderTable6.addCell(new Phrase("", header2));
				HeaderTable6.addCell(new Phrase("", header2));
	    	
	    	}
	   
		
		
		
		
		HeaderTable6a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable6a.addCell(new Phrase("", header2));
		HeaderTable6a.addCell(new Phrase("", header2));
		HeaderTable6a.addCell(new Phrase("", header2));
		HeaderTable6a.addCell(new Phrase("", header2));
		
		
		
	   document.add(HeaderTable6a);
	    HeaderTable6a.flushContent(); 
		
		HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable6.addCell(new Phrase("", header2));
		HeaderTable6.addCell(new Phrase("", header2));
		HeaderTable6.addCell(new Phrase("", header2));
		HeaderTable6.addCell(new Phrase("", header2));
		HeaderTable6.addCell(new Phrase("", header2));
		HeaderTable6.addCell(new Phrase("", header2));
		HeaderTable6.addCell(new Phrase("", header2));
		
	   document.add(HeaderTable6);
	    HeaderTable6.flushContent(); 
	    
	    document.add(HeaderTable8a);
	    HeaderTable8a.flushContent(); 
		
		
		 for (IPDHistoryMaster objIPDHistoryMasterCom : objTN.getListIPdHistoryCompona()) 
			{
			 
			 if(objIPDHistoryMasterCom.getPast_Reguler()==null||objIPDHistoryMasterCom.getPresent_reguler()==null||!objIPDHistoryMasterCom.getGynac().equals("")||
					 !objIPDHistoryMasterCom.getDrugReactions().equals("")||!objIPDHistoryMasterCom.getFamilyHistory().equals("")||!objIPDHistoryMasterCom.getPersonalHistory().equals("")||
					 !objIPDHistoryMasterCom.getHabbits().equals("")||!objIPDHistoryMasterCom.getBowel().equals("")||!objIPDHistoryMasterCom.getBlader().equals("")){
			 
			    HeaderTable3a.addCell(new Phrase("", header1));
			    HeaderTable3a.addCell(new Phrase("",tabletext2));
			    HeaderTable3a.addCell(new Phrase("",subheader2));
			    HeaderTable3a.addCell(new Phrase("",tabletext2));
				
			    HeaderTable3a.addCell(new Phrase("", subheader2));
			    HeaderTable3a.addCell(new Phrase("",subheader2));
			    HeaderTable3a.addCell(new Phrase("",subheader2));
			    HeaderTable3a.addCell(new Phrase("",subheader2));
			    
			    if(!objIPDHistoryMasterCom.getGynac().equals("")){
					 
			    	HeaderTable3a.addCell(new Phrase("GYNAE/OBS History :", subheader2));
				    HeaderTable3a.addCell(new Phrase(""+objIPDHistoryMasterCom.getGynac(),tabletext2));
				    HeaderTable3a.addCell(new Phrase("",subheader2));
				    HeaderTable3a.addCell(new Phrase("",subheader2));
				 }
			    
			    if(!objIPDHistoryMasterCom.getDrugReactions().equals("")){
					 
			    	HeaderTable3a.addCell(new Phrase("Allergy:",subheader2));
				    HeaderTable3a.addCell(new Phrase(""+objIPDHistoryMasterCom.getDrugReactions(),tabletext2));
				    HeaderTable3a.addCell(new Phrase("",subheader2));
				    HeaderTable3a.addCell(new Phrase("",subheader2));
				 }
			    
			    if(!objIPDHistoryMasterCom.getFamilyHistory().equals("")){
					 
			    	HeaderTable3a.addCell(new Phrase("Family History:", subheader2));
				    HeaderTable3a.addCell(new Phrase(""+objIPDHistoryMasterCom.getFamilyHistory(),tabletext2));
				    HeaderTable3a.addCell(new Phrase("",subheader2));
				    HeaderTable3a.addCell(new Phrase("",subheader2));
				 }
			    
			    if(!objIPDHistoryMasterCom.getPersonalHistory().equals("")){
					 
			    	HeaderTable3a.addCell(new Phrase("Personal History:",subheader2));
				    HeaderTable3a.addCell(new Phrase(""+objIPDHistoryMasterCom.getPersonalHistory(),tabletext2));
				    HeaderTable3a.addCell(new Phrase("",subheader2));
				    HeaderTable3a.addCell(new Phrase("",subheader2));
				 }
			    
			   /* if(!objIPDHistoryMasterCom.getPast_Reguler().equals("")){
				   String pr=objIPDHistoryMasterCom.getPast_Reguler();
					 if(pr.contains("undefined"))
					 {
						 pr="-";
					 }
			    	HeaderTable3a.addCell(new Phrase("Past History :", subheader2));
				    HeaderTable3a.addCell(new Phrase(""+pr,tabletext2));
				    HeaderTable3a.addCell(new Phrase("",subheader2));
				    HeaderTable3a.addCell(new Phrase("",subheader2));
				 }
				 */
		/* 	    if(!objIPDHistoryMasterCom.getPresent_reguler().equals("")){
			    	 String pr=objIPDHistoryMasterCom.getPresent_reguler();
					 if(pr.contains("undefined"))
					 {
						 pr="-";
					 }
			    	HeaderTable3a.addCell(new Phrase("Present Reguler :",subheader2));
				    HeaderTable3a.addCell(new Phrase(""+pr,tabletext2));
				    HeaderTable3a.addCell(new Phrase("",subheader2));
				    HeaderTable3a.addCell(new Phrase("",subheader2));
				 } */ 
			    
		/* 	    if(!objIPDHistoryMasterCom.getHabbits().equals("") || !objIPDHistoryMasterCom.getHabbits().equals("")){
					 
			    	HeaderTable3a.addCell(new Phrase("Habbits:", subheader2));
				    HeaderTable3a.addCell(new Phrase(""+objIPDHistoryMasterCom.getHabbits(),tabletext2));
				    HeaderTable3a.addCell(new Phrase("",subheader2));
				    HeaderTable3a.addCell(new Phrase("",subheader2)); 
				 }
				
			    if(!objIPDHistoryMasterCom.getBowel().equals("")){
					 
			    	HeaderTable3a.addCell(new Phrase("Bowel:",subheader2));
				    HeaderTable3a.addCell(new Phrase(""+objIPDHistoryMasterCom.getBowel(),tabletext2));
				    HeaderTable3a.addCell(new Phrase("",subheader2));
				    HeaderTable3a.addCell(new Phrase("",subheader2));
				 }
				
			   
			    if(!objIPDHistoryMasterCom.getBlader().equals("")){
					 
			    	HeaderTable3a.addCell(new Phrase("Blader:", subheader2));
				    HeaderTable3a.addCell(new Phrase(""+objIPDHistoryMasterCom.getBlader(),tabletext2));
				    HeaderTable3a.addCell(new Phrase("",subheader2));
				    HeaderTable3a.addCell(new Phrase("",subheader2));
				 }
				 */
			    
			    HeaderTable3a.addCell(new Phrase("",subheader2));
			    HeaderTable3a.addCell(new Phrase("",tabletext2));
				
			    HeaderTable3a.addCell(new Phrase("", subheader2));
			    HeaderTable3a.addCell(new Phrase("",subheader2));
			    HeaderTable3a.addCell(new Phrase("",subheader2));
			    HeaderTable3a.addCell(new Phrase("",subheader2));
			
		       HeaderTable8a.getDefaultCell().setBorder(Rectangle.BOTTOM);
		       HeaderTable8a.addCell(new Phrase("", header2));
		       HeaderTable8a.addCell(new Phrase("", header2));
		       HeaderTable8a.addCell(new Phrase("", header2));
		       HeaderTable8a.addCell(new Phrase("", header2));
			}
		}
			document.add(HeaderTable3a);
			HeaderTable3a.flushContent(); 
			
			document.add(HeaderTable8a);
			HeaderTable8a.flushContent();
			
			PdfPTable HeaderTable2a = new PdfPTable(4);
		    int[] headerwidth2a= {40,45,40,45 };
		    HeaderTable2a.setWidths(headerwidth2a);
		    HeaderTable2a.setWidthPercentage(95f);
		    HeaderTable2a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		    
		    
		    PdfPTable HeaderTable9a = new PdfPTable(4);
		    int[] headerwidth9a= {40,45,40,45 };
		    HeaderTable9a.setWidths(headerwidth9a);
		    HeaderTable9a.setWidthPercentage(95f);
		    HeaderTable9a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		   
		    HeaderTable2a.addCell(new Phrase("",tabletext2));
		    HeaderTable2a.addCell(new Phrase("",tabletext2));
		    HeaderTable2a.addCell(new Phrase("",tabletext2));
		    HeaderTable2a.addCell(new Phrase("",tabletext2));
		    
		    HeaderTable2a.addCell(new Phrase("",tabletext2));
		    HeaderTable2a.addCell(new Phrase("",tabletext2));
		    HeaderTable2a.addCell(new Phrase("",tabletext2));
		    HeaderTable2a.addCell(new Phrase("",tabletext2));
		    
		    HeaderTable2a.addCell(new Phrase("",tabletext2));
		    HeaderTable2a.addCell(new Phrase("",tabletext2));
		    HeaderTable2a.addCell(new Phrase("",tabletext2));
		    HeaderTable2a.addCell(new Phrase("",tabletext2));
		    
		   for (IPDHistoryMaster objIPDHistoryMasterCom : objTN.getListIPdHistoryCompona()) 
			{
			   if(!objIPDHistoryMasterCom.getTemp().equals("") ||!objIPDHistoryMasterCom.getPulse().equals("") ||!objIPDHistoryMasterCom.getBp().equals("") ||
					   !objIPDHistoryMasterCom.getPallor().equals("") || !objIPDHistoryMasterCom.getClubbing().equals("") || !objIPDHistoryMasterCom.getLymph().equals("")||
					   !objIPDHistoryMasterCom.getLcterus().equals("") || !objIPDHistoryMasterCom.getOedema().equals("")){
			   				   
			   HeaderTable2a.addCell(new Phrase("On Examination", header1));
			   HeaderTable2a.addCell(new Phrase("",tabletext2));
			   HeaderTable2a.addCell(new Phrase("",subheader2));
			   HeaderTable2a.addCell(new Phrase("",tabletext2));
				
			   HeaderTable2a.addCell(new Phrase("", subheader2));
			   HeaderTable2a.addCell(new Phrase("",subheader2));
			   HeaderTable2a.addCell(new Phrase("",subheader2));
			   HeaderTable2a.addCell(new Phrase("",subheader2));
			   
			   if(!objIPDHistoryMasterCom.getTemp().equals("") ||!objIPDHistoryMasterCom.getPulse().equals("") ||!objIPDHistoryMasterCom.getBp().equals("")){
				   
			   
			   HeaderTable2a.addCell(new Phrase("VITALS --", subheader2));
			   HeaderTable2a.addCell(new Phrase("",tabletext2));
			   HeaderTable2a.addCell(new Phrase("",subheader2));
			   HeaderTable2a.addCell(new Phrase("",tabletext2));
			   
			   HeaderTable2a.addCell(new Phrase("", subheader2));
			   HeaderTable2a.addCell(new Phrase("",subheader2));
			   HeaderTable2a.addCell(new Phrase("",subheader2));
			   HeaderTable2a.addCell(new Phrase("",subheader2));
			   
			   
			   if(!objIPDHistoryMasterCom.getTemp().equals("")){
					 
				   HeaderTable2a.addCell(new Phrase("Temperature:", subheader2));
				   HeaderTable2a.addCell(new Phrase(""+objIPDHistoryMasterCom.getTemp(),tabletext2));
				   HeaderTable2a.addCell(new Phrase("",subheader2));
				   HeaderTable2a.addCell(new Phrase("",subheader2));
				 }
			   
			   if(!objIPDHistoryMasterCom.getPulse().equals("")){
					 
				   HeaderTable2a.addCell(new Phrase("Pulse:",subheader2));
				   HeaderTable2a.addCell(new Phrase(""+objIPDHistoryMasterCom.getPulse(),tabletext2));
				   HeaderTable2a.addCell(new Phrase("",subheader2));
				   HeaderTable2a.addCell(new Phrase("",subheader2));
				 }
			   
			   if(!objIPDHistoryMasterCom.getBp().equals("")){
					 
				   HeaderTable2a.addCell(new Phrase("BP:", subheader2));
				   HeaderTable2a.addCell(new Phrase(""+objIPDHistoryMasterCom.getBp(),tabletext2));
				   HeaderTable2a.addCell(new Phrase("",subheader2));
				   HeaderTable2a.addCell(new Phrase("",subheader2));
				 }
			   
			  }
			   
			   HeaderTable2a.addCell(new Phrase("",subheader2));
			   HeaderTable2a.addCell(new Phrase("",subheader2));
			    
			   HeaderTable2a.addCell(new Phrase("", subheader2));
			   HeaderTable2a.addCell(new Phrase("",subheader2));
			   HeaderTable2a.addCell(new Phrase("",subheader2));
			   HeaderTable2a.addCell(new Phrase("",subheader2));  
			   
			   
			   
			   
			   if(!objIPDHistoryMasterCom.getPallor().equals("") || !objIPDHistoryMasterCom.getClubbing().equals("") || !objIPDHistoryMasterCom.getLymph().equals("")||
					   !objIPDHistoryMasterCom.getLcterus().equals("") || !objIPDHistoryMasterCom.getOedema().equals("")){
			
				   /* HeaderTable9a.addCell(new Phrase("GENERAL EXAM --", subheader3));
				   HeaderTable9a.addCell(new Phrase("",subheader2));
				   HeaderTable9a.addCell(new Phrase("",subheader2));
				   HeaderTable9a.addCell(new Phrase("",subheader2)); */
				   
				   /* HeaderTable6a.addCell(new Phrase("", subheader2));
				   HeaderTable6a.addCell(new Phrase("",subheader2));
				   HeaderTable6a.addCell(new Phrase("", subheader2));
				   HeaderTable6a.addCell(new Phrase("",subheader2));  */
				   
				   HeaderTable6a.addCell(new Phrase("", subheader2));
				   HeaderTable6a.addCell(new Phrase("",subheader2));
				   
				   if(!objIPDHistoryMasterCom.getPallor().equals("")){
						 
					   HeaderTable6a.addCell(new Phrase("Pallor:", subheader2));
					   HeaderTable6a.addCell(new Phrase(""+objIPDHistoryMasterCom.getPallor(),tabletext2));
						 
					 }
				   
				   if(!objIPDHistoryMasterCom.getLcterus().equals("")){
						 
					   HeaderTable6a.addCell(new Phrase("Icterus:",subheader2));
					   HeaderTable6a.addCell(new Phrase(""+objIPDHistoryMasterCom.getLcterus(),tabletext2));
						 
					 }
				   
				   if(!objIPDHistoryMasterCom.getClubbing().equals("")){
						 
					   HeaderTable6a.addCell(new Phrase("Clubbing:",subheader2));
					   HeaderTable6a.addCell(new Phrase(""+objIPDHistoryMasterCom.getClubbing(),tabletext2));
						 
					 }
				    
				   if(!objIPDHistoryMasterCom.getOedema().equals("")){
						 
					   HeaderTable6a.addCell(new Phrase("Oedema:", subheader2));
					   HeaderTable6a.addCell(new Phrase(""+objIPDHistoryMasterCom.getOedema(),tabletext2));
						 
					 }
				   
				   if(!objIPDHistoryMasterCom.getLymph().equals("")){
						 
					   HeaderTable6a.addCell(new Phrase("Lymph Adenopathy:", subheader2));
					   HeaderTable6a.addCell(new Phrase(""+objIPDHistoryMasterCom.getLymph(),tabletext2));
						 
					 }
				  
			}
			   
			   
			   
			   HeaderTable6a.addCell(new Phrase("", subheader2));
			   HeaderTable6a.addCell(new Phrase("",subheader2));
			   HeaderTable6a.addCell(new Phrase("",subheader2));
			   HeaderTable6a.addCell(new Phrase("",subheader2));
			  
			   
			   HeaderTable8a.getDefaultCell().setBorder(Rectangle.BOTTOM);
			   HeaderTable8a.addCell(new Phrase("", header2));
			   HeaderTable8a.addCell(new Phrase("", header2));
			   HeaderTable8a.addCell(new Phrase("", header2));
			   HeaderTable8a.addCell(new Phrase("", header2));
			 }
		}
			 
		    document.add(HeaderTable2a);
			HeaderTable2a.flushContent();
			
			document.add(HeaderTable9a);
			HeaderTable9a.flushContent();
			
			document.add(HeaderTable6a);
			HeaderTable6a.flushContent(); 
			
			document.add(HeaderTable8a);
			HeaderTable8a.flushContent(); 
		   
			
			
			 
			
			
			
			PdfPTable HeaderTable4a = new PdfPTable(4);
		    int[] headerwidth22a= {40,45,40,45 };
		    HeaderTable4a.setWidths(headerwidth22a);
		    HeaderTable4a.setWidthPercentage(95f);
		    HeaderTable4a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		    
		  
		   for (IPDHistoryMaster objIPDHistoryMasterCom : objTN.getListIPdHistoryCompona()) 
			{
			   if(!objIPDHistoryMasterCom.getRs().equals("") || !objIPDHistoryMasterCom.getCvs().equals("") || !objIPDHistoryMasterCom.getCns().equals("") ||
					   !objIPDHistoryMasterCom.getPa().equals("") || !objIPDHistoryMasterCom.getLocal_Exma().equals("") || !objIPDHistoryMasterCom.getInvestigation().equals("") ||
					   !objIPDHistoryMasterCom.getProvisional().equals("") || !objIPDHistoryMasterCom.getTreatment().equals("")){
				   
				   if(!objIPDHistoryMasterCom.getLocal_Exma().equals("")){
						 
					   HeaderTable4a.addCell(new Phrase("Local Examinations:", header1));
					   HeaderTable4a.addCell(new Phrase(""+objIPDHistoryMasterCom.getLocal_Exma(),tabletext2));
					   HeaderTable4a.addCell(new Phrase("",subheader2));
					   HeaderTable4a.addCell(new Phrase("",subheader2));
					   
					  
				   }
				   
				   HeaderTable8a.getDefaultCell().setBorder(Rectangle.BOTTOM);
				   HeaderTable8a.addCell(new Phrase("", header2));
				   HeaderTable8a.addCell(new Phrase("", header2));
				   HeaderTable8a.addCell(new Phrase("", header2));
				   HeaderTable8a.addCell(new Phrase("", header2));
				   

			       HeaderTable4a.addCell(new Phrase("", header2));
			       HeaderTable4a.addCell(new Phrase("", header2));
			       HeaderTable4a.addCell(new Phrase("", header2));
			       HeaderTable4a.addCell(new Phrase("", header2));
			       
			       document.add(HeaderTable4a);
					HeaderTable4a.flushContent(); 
			       
				   document.add(HeaderTable8a);
					HeaderTable8a.flushContent();
			   
				   
			   HeaderTable4a.addCell(new Phrase("Systematic Examination", header1));
			   HeaderTable4a.addCell(new Phrase("",tabletext2));
			   HeaderTable4a.addCell(new Phrase("",subheader2));
			   HeaderTable4a.addCell(new Phrase("",tabletext2));
				
			   HeaderTable4a.addCell(new Phrase("", subheader2));
			   HeaderTable4a.addCell(new Phrase("",subheader2));
			   HeaderTable4a.addCell(new Phrase("",subheader2));
			   HeaderTable4a.addCell(new Phrase("",subheader2));
			   
			   if(!objIPDHistoryMasterCom.getCvs().equals("")){
					 
				   HeaderTable4a.addCell(new Phrase("CVS:",subheader2));
				   HeaderTable4a.addCell(new Phrase(""+objIPDHistoryMasterCom.getCvs(),tabletext2));
				   HeaderTable4a.addCell(new Phrase("",subheader2));
				   HeaderTable4a.addCell(new Phrase("",subheader2));
				 }
			   
			   if(!objIPDHistoryMasterCom.getRs().equals("")){
					 
				   HeaderTable4a.addCell(new Phrase("R/S:", subheader2));
				   HeaderTable4a.addCell(new Phrase(""+objIPDHistoryMasterCom.getRs(),tabletext2));
				   HeaderTable4a.addCell(new Phrase("",subheader2));
				   HeaderTable4a.addCell(new Phrase("",subheader2)); 
				 }
			   
			   if(!objIPDHistoryMasterCom.getPa().equals("")){
					 
				   HeaderTable4a.addCell(new Phrase("PA:",subheader2));
				   HeaderTable4a.addCell(new Phrase(""+objIPDHistoryMasterCom.getPa(),tabletext2));
				   HeaderTable4a.addCell(new Phrase("",subheader2));
				   HeaderTable4a.addCell(new Phrase("",subheader2));
					 
				 }
			   
			   if(!objIPDHistoryMasterCom.getCns().equals("")){
					 
				   HeaderTable4a.addCell(new Phrase("CNS:", subheader2));
				   HeaderTable4a.addCell(new Phrase(""+objIPDHistoryMasterCom.getCns(),tabletext2));
				   HeaderTable4a.addCell(new Phrase("",subheader2));
				   HeaderTable4a.addCell(new Phrase("",subheader2));
				 }
			   
			   HeaderTable8a.getDefaultCell().setBorder(Rectangle.BOTTOM);
			   HeaderTable8a.addCell(new Phrase("", header2));
			   HeaderTable8a.addCell(new Phrase("", header2));
			   HeaderTable8a.addCell(new Phrase("", header2));
			   HeaderTable8a.addCell(new Phrase("", header2));
		   
		     
		       HeaderTable4a.addCell(new Phrase("", header2));
		       HeaderTable4a.addCell(new Phrase("", header2));
		       HeaderTable4a.addCell(new Phrase("", header2));
		       HeaderTable4a.addCell(new Phrase("", header2));
		       
		   	document.add(HeaderTable4a);
			HeaderTable4a.flushContent(); 
			
			document.add(HeaderTable8a);
			HeaderTable8a.flushContent();
			  
			/*    
			  if(!objIPDHistoryMasterCom.getProvisional().equals("")){
					 
				   HeaderTable4a.addCell(new Phrase("Provisional Diagnosis:", subheader2));
				   HeaderTable4a.addCell(new Phrase(""+objIPDHistoryMasterCom.getProvisional(),tabletext2));
				   HeaderTable4a.addCell(new Phrase("",subheader2));
				   HeaderTable4a.addCell(new Phrase("",subheader2));
				 } */
			   
			   if(!objIPDHistoryMasterCom.getInvestigation().equals("")){
					 
				   HeaderTable4a.addCell(new Phrase("Investigation Reports:",subheader2));
				   HeaderTable4a.addCell(new Phrase(""+objIPDHistoryMasterCom.getInvestigation(),tabletext2));
				   HeaderTable4a.addCell(new Phrase("",subheader2));
				   HeaderTable4a.addCell(new Phrase("",subheader2));
					 
				 }
			   
			  /*  if(!objIPDHistoryMasterCom.getTreatment().equals("")){
					 
				   HeaderTable4a.addCell(new Phrase("Treatment Plan:",subheader2));
				   HeaderTable4a.addCell(new Phrase(""+objIPDHistoryMasterCom.getTreatment(),tabletext2));
				   HeaderTable4a.addCell(new Phrase("",subheader2));
				   HeaderTable4a.addCell(new Phrase("",subheader2));
					 
				 }  */
			   
			   HeaderTable8a.getDefaultCell().setBorder(Rectangle.BOTTOM);
			   HeaderTable8a.addCell(new Phrase("", header2));
			   HeaderTable8a.addCell(new Phrase("", header2));
			   HeaderTable8a.addCell(new Phrase("", header2));
			   HeaderTable8a.addCell(new Phrase("", header2));
		   
		     
		       HeaderTable4a.addCell(new Phrase("", header2));
		       HeaderTable4a.addCell(new Phrase("", header2));
		       HeaderTable4a.addCell(new Phrase("", header2));
		       HeaderTable4a.addCell(new Phrase("", header2));
		   }
	     }

			document.add(HeaderTable4a);
			HeaderTable4a.flushContent(); 
			
			document.add(HeaderTable8a);
			HeaderTable8a.flushContent();
		}
				
			//Start admission note
			Treatment obj =new Treatment();
				obj.setTreatment_ID(treatId);
				obj.setPatient_ID(patID);
				String tratServ=treatmentModel.fetchPatientAdmissionNote(obj);
			
				if (tratServ != "" || tratServ != null || tratServ != "-" ) {
					tratServ = tratServ.replaceAll("\\<.*?>","");
					tratServ = tratServ.replaceAll("<p>","");
					tratServ = tratServ.replaceAll("</p>","");
					PdfPTable HeaderTable17 = new PdfPTable(3);
					int[] headerwidth17 = { 2, 20, 40 };
					HeaderTable17.setWidths(headerwidth17);
					HeaderTable17.setWidthPercentage(95f);

					HeaderTable17.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
					HeaderTable17.addCell(new Phrase("", header));
					HeaderTable17.addCell(new Phrase("", header));
					HeaderTable17.addCell(new Phrase("", header));
					document.add(HeaderTable17);
					HeaderTable17.flushContent();

					HeaderTable17.addCell(new Phrase("", header));
					HeaderTable17.addCell(new Phrase("",
							subheader));
					HeaderTable17.addCell(new Phrase("", header));
					document.add(HeaderTable17);
					HeaderTable17.flushContent();

					PdfPTable Table13 = new PdfPTable(2);
					int[] width3 = { 20,80 };
					Table13.setWidths(width3);
					Table13.setWidthPercentage(95f);
					Table13.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					Table13.addCell(new Phrase("", header));
					Table13.addCell(new Phrase("", header));
					
					document.add(Table13);
					Table13.flushContent();

					try {
                            if(tratServ.contains("-")){
                            	
                            }else{
                            	Table13.addCell(new Phrase("Admission Note:", subheader));
        						Table13.addCell(new Phrase(""+tratServ, tabletext));
        						
                            }
						
						document.add(Table13);
						Table13.flushContent();
					} catch (Exception e) {
						document.add(Table13);
						Table13.flushContent();
						e.printStackTrace();
					}
					
					Table13.getDefaultCell().setBorder(Rectangle.BOTTOM);
					Table13.addCell(new Phrase("", header));
					Table13.addCell(new Phrase("", header));
					
					document.add(Table13);
					Table13.flushContent();

				}
			
			//End admission note
			
			
			//start Investigation
			
			PdfPTable HeaderTable6g = new PdfPTable(6);
			int[] headerwidth6g = { 30, 30, 44, 24, 16, 20 };
			HeaderTable6g.setWidths(headerwidth6g);
			HeaderTable6g.setWidthPercentage(95f);
			HeaderTable6g.getDefaultCell().setBorder(Rectangle.BOTTOM);
			
			DoctordeskController recpt=(ApplicationContextUtils.getApplicationContext()).getBean(DoctordeskController.class);
			CpoeIPDdetails icd = new CpoeIPDdetails();
			List<CpoeIPDdetails> listBillReceiptMaster = null;
			List<CpoeIPDdetails> listBillReceiptMaster1 = new ArrayList<CpoeIPDdetails>();
			icd=recpt.fetchipddetails(treatId,"default",request );
			listBillReceiptMaster=icd.getCpoeServdetails();
			List<DischargeSummery> dsList12 = objIPDTreatmentModel
					.fetchDischargeAutoSummary(patientID, treatmentID);

			if (listBillReceiptMaster.size() != 0) {

				PdfPTable twoPT2 = new PdfPTable(2);
				int[] widthInst2 = { 25, 75 };
				twoPT2.setWidths(widthInst2);
				twoPT2.setWidthPercentage(95f);
				twoPT2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				twoPT2.addCell(new Phrase("Test Details : " ,subheader));
				twoPT2.addCell(new Phrase("" ,subheader));
				for (int i = 0; i < listBillReceiptMaster.size(); i++) {
					 
					twoPT2.addCell(new Phrase("" ,subheader));
					twoPT2.addCell(new Phrase(listBillReceiptMaster.get(i).getCategoryName()+","+listBillReceiptMaster.get(i).getCreated_date_time()+","+listBillReceiptMaster.get(i).getServicename(),tabletext));
					
					twoPT2.addCell(new Phrase("" ,subheader));
					twoPT2.addCell(new Phrase("" ,subheader));
					
					twoPT2.addCell(new Phrase("" ,subheader));
					twoPT2.addCell(new Phrase("" ,subheader));
					
					
					
					document.add(twoPT2);
					twoPT2.flushContent();
				 }
				 for(int i = 0; i < dsList12.size(); i++)
				 {
	 				 if (dsList12.get(i).getSpl_investigation() != null
	 							&& !dsList12.get(i).getSpl_investigation().equals("undefined")
	 							&& !dsList12.get(i).getSpl_investigation().equals(""))
	 				 {
	 					twoPT2.addCell(new Phrase("Special Investigation :", subheader));
	 					twoPT2.addCell(new Phrase("" + dsList12.get(i).getSpl_investigation(), tabletext));
	 					
	 					twoPT2.addCell(new Phrase("" , tabletext));
	 					twoPT2.getDefaultCell().setBorder(Rectangle.BOTTOM);
	 					 document.add(twoPT2);
	 					twoPT2.flushContent();
	 				 }
				 }
				
				 document.add(twoPT2);
				twoPT2.flushContent();
			}
			
			//End Investigation
			
			//start special investigation
			/* PdfPTable twoPT12 = new PdfPTable(2);
			int[] widthInst121 = { 25, 75 };
			twoPT12.setWidths(widthInst121);
			twoPT12.setWidthPercentage(95f);
			twoPT12.getDefaultCell().setBorder(Rectangle.BOTTOM);
			List<DischargeSummery> dsList1 = objIPDTreatmentModel
					.fetchDischargeAutoSummary(patientID, treatmentID);
			if (dsList1 != null && dsList1.size() != 0
					&& dsList1.size() > 0) {}
			 for(int i = 0; i < dsList1.size(); i++)
			 {
 				 if (dsList1.get(i).getSpl_investigation() != null
 							&& !dsList1.get(i).getSpl_investigation().equals("undefined")
 							&& !dsList1.get(i).getSpl_investigation().equals(""))
 				 {
 					twoPT.addCell(new Phrase("Special Investigation :", subheader));
 					twoPT.addCell(new Phrase("" + dsList1.get(i).getSpl_investigation(), tabletext));
 				 }
			 }
 				 document.add(twoPT12);
 				twoPT12.flushContent(); */
			
				//End  special investigation
				
				
				//start COURSE IN HOSPTIAL & TREATMENT GIVEN :
					List<DischargeSummery> dsList1 = objIPDTreatmentModel
					.fetchDischargeAutoSummary(patientID, treatmentID);
					PdfPTable HeaderTable81 = new PdfPTable(6);
			int[] headerwidth81 = { 20, 30, 44, 24, 16, 20 };
			HeaderTable81.setWidths(headerwidth81);
			HeaderTable81.setWidthPercentage(95f);
			HeaderTable81.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
 				if(dsList1.size() >0 ){
 					twoPT21.addCell(new Phrase("COURSE IN HOSPITAL & TREATMENT GIVEN : ", header));
 					twoPT21.addCell(new Phrase("", subheader));
 					
 				}
 					for(int i = 0; i < dsList1.size(); i++){
 					
 						if (dsList1.get(i).getTreatmentGiven() != null
 								&& !dsList1.get(i).getTreatmentGiven().equals("undefined")
 								&& !dsList1.get(i).getTreatmentGiven().equals(""))
 						{
 							
 							document.add(twoPT21);
 							twoPT21.flushContent();
 							document.add(HeaderTable81);
 							HeaderTable81.flushContent();
 							
 							 HeaderTable31.addCell(new Phrase("", tabletext));
 							 document.add(HeaderTable31);
 							 HeaderTable31.flushContent();
 							twoPT.addCell(new Phrase("Treatment Given :", subheader));
 							twoPT.addCell(new Phrase("" +dsList1.get(i).getTreatmentGiven() , tabletext));	
 						}
 						
 						document.add(twoPT);
 						twoPT.flushContent();
 					
 						}
 					for(int i = 0; i < dsList1.size(); i++){
 						if (dsList1.get(i).getRisk() != null
 								&& !dsList1.get(i).getRisk().equals("undefined")
 								&& !dsList1.get(i).getRisk().equals(""))
 						{
 							document.add(twoPT21);
 							twoPT21.flushContent();
 							document.add(HeaderTable81);
 							HeaderTable81.flushContent();
 							twoPT.addCell(new Phrase("Risk Factors :",subheader));
 							twoPT.addCell(new Phrase("" + dsList1.get(i).getRisk(), tabletext));
 						}
 						 twoPT.addCell(new Phrase("" ,subheader));
 						 twoPT.addCell(new Phrase("" ,subheader));
 						 
 							document.add(twoPT);
 							twoPT.flushContent();

 						}
 						for(int i = 0; i < dsList1.size(); i++){
 						if (dsList1.get(i).getComplications() != null
 								&& !dsList1.get(i).getComplications().equals("undefined")
 								&& !dsList1.get(i).getComplications().equals(""))
 						{
 							document.add(twoPT21);
 							twoPT21.flushContent();
 							document.add(HeaderTable81);
 							HeaderTable81.flushContent();
 							twoPT.addCell(new Phrase("Complications :", subheader));
 							twoPT.addCell(new Phrase("" + dsList1.get(0).getComplications(), tabletext));
 						}
 						 twoPT.addCell(new Phrase("" ,subheader));
 						 twoPT.addCell(new Phrase("" ,subheader));
 						 
 							document.add(twoPT);
 							twoPT.flushContent();
 						}
 						
 					if (order_masterli.size() > 0) {
 				/* 		if(order_masterli.get(0).getOrder_comp_drugesList().size() > 0){
 							 twoPT.addCell(new Phrase("Medicines :" ,subheader));
 							 twoPT.addCell(new Phrase("" ,subheader));
 							 
 								document.add(twoPT);
 								twoPT.flushContent();	
 						} */
 						
 							
 						 /* for(int i=0;i<order_masterli.size();i++){
 								
 								for(int j=0;j < order_masterli.get(i).getOrder_comp_drugesList().size();j++){
 									twoPT.addCell(new Phrase("", subheader));
 									twoPT.addCell(new Phrase(order_masterli.get(i).getOrder_comp_drugesList().get(j).getDruges_doses()+" , "+order_masterli.get(i).getOrder_comp_drugesList().get(j).getFrequency()+" Times a Day"
 											+" , "+order_masterli.get(i).getOrder_comp_drugesList().get(j).getDays()+" Days", tabletext));
 									}
 							} */
 						 
 							
 						/* 	if (order_masterli.size() > 0) {

 							
 								HeaderTable7.addCell(new Phrase("", header));
 								HeaderTable7.addCell(new Phrase("", header));
 								HeaderTable7.addCell(new Phrase("", header));
 								HeaderTable7.addCell(new Phrase("", header));
 								HeaderTable7.addCell(new Phrase("", header));
 								HeaderTable7.addCell(new Phrase("", header));
 								
 								HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);

 								HeaderTable7.addCell(new Phrase("", header));
 								HeaderTable7.addCell(new Phrase("", header));
 								HeaderTable7.addCell(new Phrase("", header));
 								HeaderTable7.addCell(new Phrase("", header));
 								HeaderTable7.addCell(new Phrase("", header));
 								HeaderTable7.addCell(new Phrase("", header));
 								

 								document.add(HeaderTable7);
 								HeaderTable7.flushContent();
 							} */
 							
 						/* 	for(int i=0;i<order_masterli.size();i++){
 								
 								for(int j=0;j < order_masterli.get(i).getOrder_comp_drugesList().size();j++){
 									
 									int Morning = 0;
 									int Afternoon = 0;
 									int Evening = 0;
 									int Night = 0;
 									if(order_masterli.get(i).getOrder_comp_drugesList().get(j).getMorning().equalsIgnoreCase("Morning"))
 									{
 										Morning = 1;
 									}else{
 										Morning = 0;
 									}
 									if(order_masterli.get(i).getOrder_comp_drugesList().get(j).getAfternoon().equalsIgnoreCase("Afternoon"))
 									{
 										Afternoon = 1;
 									}else{
 										Afternoon = 0;
 									}
 									if(order_masterli.get(i).getOrder_comp_drugesList().get(j).getEvening().equalsIgnoreCase("Evening"))
 									{
 										Evening = 1;
 									}else{
 										Evening = 0;
 									}
 									if(order_masterli.get(i).getOrder_comp_drugesList().get(j).getNight().equalsIgnoreCase("Night"))
 									{
 										Night = 1;
 									}else{
 										Night = 0;
 									}

 									HeaderTable71.addCell(new Phrase("", tabletext));
 									HeaderTable71.addCell(new Phrase(""+(j+1)+".", tabletext));
 									HeaderTable71.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getDruges_doses(), tabletext));
 									HeaderTable71.addCell(new Phrase("", tabletext));
 									HeaderTable71.addCell(new Phrase("", tabletext));
 									HeaderTable71.addCell(new Phrase("", tabletext));
 									
 							}
 								HeaderTable71.getDefaultCell()
 										.setBorder(Rectangle.NO_BORDER);

 								document.add(HeaderTable71);
 								HeaderTable71.flushContent();

 							} */
 							/*  HeaderTable31.addCell(new Phrase("", tabletext));
 							 document.add(HeaderTable31);
 							 HeaderTable31.flushContent(); */
 						}
 						//End Order Form
 					 	//Condition At Discharge
 					 	
 					 	 if (dsList1.size() > 0) {
							// Start: Part-12 Condition At Discharge
							if (dsList1.get(0).getConditionAtDischarge() != null
									&& !dsList1.get(0).getConditionAtDischarge()
											.equals("undefined")
									&& !dsList1.get(0).getConditionAtDischarge()
											.equals("")) {
								twoPT.addCell(new Phrase("Condition At Discharge :", header));
								twoPT.addCell(new Phrase("" + dsList1.get(0).getConditionAtDischarge(), tabletext));
								
								document.add(twoPT);
								twoPT.flushContent();
								
								 HeaderTable31.addCell(new Phrase("", tabletext));
								 document.add(HeaderTable31);
								 HeaderTable31.flushContent();
							}
						}
 					 	//conditaion at discharge end
 					/* if (dsList1.size() > 0) {
 							// Start: Part-12 Condition At Discharge
 							if (dsList1.get(0).getConditionAtDischarge() != null
 									&& !dsList1.get(0).getConditionAtDischarge()
 											.equals("undefined")
 									&& !dsList1.get(0).getConditionAtDischarge()
 											.equals("")) {
 								twoPT.addCell(new Phrase("", header));
 								twoPT.addCell(new Phrase("" , tabletext));
 								twoPT.getDefaultCell().setBorder(Rectangle.NO_BORDER);
 								
 								twoPT.addCell(new Phrase("Advice At Discharge :", header));
 								twoPT.addCell(new Phrase("" + dsList1.get(0).getAdvisedOnDischarge(), tabletext));
 								System.out.println("advice="+dsList1.get(0).getAdvisedOnDischarge());
 								document.add(twoPT);
 								twoPT.flushContent();
 								
 								 HeaderTable31.addCell(new Phrase("", tabletext));
 								 document.add(HeaderTable31);
 								 HeaderTable31.flushContent();
 							}
 						} */
					
		    //End COURSE IN HOSPTIAL & TREATMENT GIVEN :			
				
		  //Start Lab
		    
		    PdfPTable twoPT2Q = new PdfPTable(2);
		    				int[] widthInst2O = { 25, 75 };
		    				twoPT2Q.setWidths(widthInst2O);
		    				twoPT2Q.setWidthPercentage(95f);
		    				twoPT2Q.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		    	    
		    				PdfPTable twoPT221 = new PdfPTable(5);
		    				int[] widthInst221 = { 20, 20, 75 ,5,5};
		    				twoPT221.setWidths(widthInst221);
		    				twoPT221.setWidthPercentage(95f);
		    				twoPT221.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		    	 DoctordeskController obj1=(ApplicationContextUtils.getApplicationContext()).getBean(DoctordeskController.class);
		                
		               LabProfile labObj=new LabProfile();
		                List proLi = new ArrayList();
		               String callFrom1 = "autodischargesum";
		                labObj= obj1.fetchLabTestResult(0, 0, 0, treatId,"", callFrom1, request);
		                proLi=labObj.getProfileli();
		                ArrayList<LabProfile> labProfileIsEmpty = (ArrayList<LabProfile>) proLi.get(0);
		                int paksize = labProfileIsEmpty.size();
		                ArrayList<LabProfile> labProfile = (ArrayList<LabProfile>) proLi.get(0);
		                String opdlabid[]=null;
		                     if(opdlab==null || opdlab.equals("")  ){
		                  	   
		                     }else{


		                  	   opdlabid     =opdlab.split(",");

		                  	   BillNobleService list=(ApplicationContextUtils.getApplicationContext()).getBean(BillNobleService.class);	

		             			Integer unitId = (Integer) session.getAttribute("uId");

		                                       List<TreatmentDto> listRegistrationViewDto2=list.getPrevPatdetailsOPD(Integer.parseInt(rtd.getPatientIdd())  ,1);			
		                                        System.err.print("listRegistrationViewDto2.size()=============" + listRegistrationViewDto2.size());
		                                        labObj= obj1.fetchLabTestResult(0, 0, 0, treatId,"", callFrom1, request);
		                                        proLi=labObj.getProfileli();     
		                                        labProfileIsEmpty = (ArrayList<LabProfile>) proLi.get(0);
		                                         paksize = labProfileIsEmpty.size();
		                                       if(opdlabid.length > 0){
		                                     	    if(listRegistrationViewDto2.size() > 0)
		                                                 
		                                             {                                   document.add(twoPT2Q);
		                                	            twoPT2Q.flushContent();
		                                	            twoPT221.addCell(new Phrase("LAB (OPD) :", header));
		                                 				twoPT221.addCell(new Phrase("", subheader));
		                                 				twoPT221.addCell(new Phrase("", subheader));
		                                 				twoPT221.addCell(new Phrase("", subheader));
		                                 				 twoPT221.addCell(new Phrase("", subheader));
		                                 				twoPT221.addCell(new Phrase("", header));
		                                 				twoPT221.addCell(new Phrase("", subheader));
		                                 				twoPT221.addCell(new Phrase("", subheader));
		                                 				twoPT221.addCell(new Phrase("", subheader));
		                                 				 twoPT221.addCell(new Phrase("", subheader));
		                                	            
		                                            	twoPT221.addCell(new Phrase("Date", subheader));
		                                 				twoPT221.addCell(new Phrase("Test Name", subheader));
		                                 				twoPT221.addCell(new Phrase("Values", subheader));
		                                 				twoPT221.addCell(new Phrase("", subheader));
		                                 				 twoPT221.addCell(new Phrase("", subheader));
		                                 				
		                                 				 twoPT221.addCell(new Phrase("", subheader));
		                                                 twoPT221.addCell(new Phrase("", subheader));
		                                                 twoPT221.addCell(new Phrase("", subheader));
		                                                 twoPT221.addCell(new Phrase("", subheader));
		                                                 twoPT221.addCell(new Phrase("", subheader));
		                                                 document.add(twoPT221);
		                                 				twoPT221.flushContent(); 
		                                          	   for ( int  i = 0; i < opdlabid.length;i++) {
		                     	   
		                                          	   
		                                                 labObj= obj1.fetchLabTestResult(0, 0, 0, Integer.parseInt(opdlabid[i]) ,"", callFrom1, request);
		                                                 proLi=labObj.getProfileli();
		                                               labProfileIsEmpty = (ArrayList<LabProfile>) proLi.get(0);
		                                                  paksize = labProfileIsEmpty.size();
		                                                 labProfile = (ArrayList<LabProfile>) proLi.get(0);

		                                                 if (labProfileIsEmpty.size() > 0) {

		                                      				HeaderTable31.addCell(new Phrase("", tabletext));
		                                     				document.add(HeaderTable31);
		                                     				HeaderTable31.flushContent();
		                                                 	int psize = labProfileIsEmpty.size();
		                                                 	
		                                                 	for (int pro = 0; pro < psize; pro++) {
		                                                 		Date date1=labProfileIsEmpty.get(pro).getPostDateTime();
		                                                 	if(date1 ==null){
		                                                 		twoPT221.addCell(new Phrase("-" , tabletext));
		                                                 	}else{
		                                                 		twoPT221.addCell(new Phrase(""+ date1, tabletext));
		                                                 	}
		                                                 	
		                                                 		if(!labProfileIsEmpty.get(pro).getPkgName().equals("-")){
		                                          				twoPT221.addCell(new Phrase(labProfileIsEmpty.get(pro).getProfileName()+"("+labProfileIsEmpty.get(pro).getPkgName()+")", subheader));
		                                                 		}else{
		                                                 			twoPT221.addCell(new Phrase(labProfileIsEmpty.get(pro).getProfileName(), subheader));
		                                                 		}
		                                          				
		                                          			
		                                                 		   String valuespthology="";
		                                                 		
		                                                		 ArrayList<Integer> testids = new ArrayList<Integer>();
		                                                		 ArrayList<Integer> testNullval = new ArrayList<Integer>();
		                                                		
		                                                		
		                                                		 String proname = labProfileIsEmpty.get(pro).getProfileName();
		                                                		 int pid  = labProfileIsEmpty.get(pro).getIdprofile();
		                                                		 
		                                                		 
		                                                		ArrayList<LabTest> tst = (ArrayList<LabTest>) labProfile
		                                     	                                .get(pro).getTestli();

		                                     	                        int tsize = tst.size();
		                                     	                        int tcn = 1;
		                                     	                        for (int ts = 0; ts < tsize; ts++) {

		                                     	                            int ti = tst.get(ts).getIdTest();

		                                     	                            if (ti != 0) {
		                                     	                                String noval = "";
		                                     	                                String tn = tst.get(ts).getTestName();
		                                     	                                String tc = tst.get(ts).getTestCode();
		                                     	                                String tr = tst.get(ts).getTestResult();
		                                     	                                String vt = tst.get(ts).getValueType();
		                                     	                                String details = tst.get(ts).getNoteDeatilsForGeneral();
		                                     	                                float notifi = 0;
		                                     	                             
		                                     	                               
		                                     	                                
		                                     	                                if(ts == (tsize-1)){
		                                     	                                	  tr = tr.replaceAll("&nbsp;", "");
		                                     	  	                                valuespthology = valuespthology+   tn +" " +"-" +  tr  ;
		                                     	  	                          
		                                     	                                }else{
		                                     	                                	if(tr!=null){
		                                       	                                	  tr = tr.replaceAll("&nbsp;", "");

		                                     	                                	}else{
		                                       	                                	  tr = "-";

		                                     	                                	}
		                                     	                                	
		                                     	  	                                valuespthology = valuespthology+   tn +" " +"-" +  tr + "," + "   "  ;
		                                     	  	                          
		                                     	                                }
		                                     	                              

		                                                                            

		                                     	                            }else{/* 
		                                     	                            	String testINproName = tst.get(ts)
		                                     	                                        .getTestName();
		                                     	                            	twoPT221.addCell(new Phrase("", subheader));
		                                     	                            	twoPT221.addCell(new Phrase("", subheader));
		                                     	                                twoPT221.addCell(new Phrase("", subheader));
		                                     	                 				twoPT221.addCell(new Phrase(testINproName + "", subheader));
		                                     	                 				twoPT221.addCell(new Phrase("", subheader));
		                                     	                 				  twoPT221.addCell(new Phrase("", subheader));
		                                     	                             */}
		                                     	                            
		                                     	                           
		                                     	                        }
		                                     	                        
		                                     	                        if(valuespthology.length() == 0){
		                                     	                        	valuespthology="-";
		                                     		                        }
		                                     	                   
		                                                               
		                                                  				twoPT221.addCell(new Phrase(valuespthology, tabletext));
		                                                  				twoPT221.addCell(new Phrase("", tabletext));
		                                                  				  twoPT221.addCell(new Phrase("", subheader));
		                                                               
		                                                 				document.add(twoPT221);
		                                                 				twoPT221.flushContent(); 
		                                     	                        valuespthology="";
		                                     	                        HeaderTable31.addCell(new Phrase("", tabletext));
		                                                 				document.add(HeaderTable31);
		                                                 				HeaderTable31.flushContent();
		                                     	                  
		                                                	}
		                                                 	   twoPT2Q.addCell(new Phrase("" ,header));
		                                            		    twoPT2Q.addCell(new Phrase("" ,subheader));
		                                            		    document.add(twoPT2Q);
		                                                        twoPT2Q.flushContent();
		                                                 }
		                                          		
		                                          		
		                                          		
		                                             }


		                                       
		                                          	   
		                                          	   
		                                          	   
		                                          	   
		                                             }

		                                       }
		                                   
		                     }
		    ////opd lab

		                labObj= obj1.fetchLabTestResult(0, 0, 0, treatId,"", callFrom1, request);
		                 proLi=labObj.getProfileli();
		                 labProfileIsEmpty = (ArrayList<LabProfile>) proLi.get(0);
		                 paksize = labProfileIsEmpty.size();
		                labProfile = (ArrayList<LabProfile>) proLi.get(0);
		                if (labProfileIsEmpty.size() > 0) {
		                    document.add(twoPT2Q);
		    	            twoPT2Q.flushContent();
		    	            twoPT221.addCell(new Phrase("LAB  :", header));
		     				twoPT221.addCell(new Phrase("", subheader));
		     				twoPT221.addCell(new Phrase("", subheader));
		     				twoPT221.addCell(new Phrase("", subheader));
		     				 twoPT221.addCell(new Phrase("", subheader));
		     				twoPT221.addCell(new Phrase("", header));
		     				twoPT221.addCell(new Phrase("", subheader));
		     				twoPT221.addCell(new Phrase("", subheader));
		     				twoPT221.addCell(new Phrase("", subheader));
		     				 twoPT221.addCell(new Phrase("", subheader));
		    	            
		                	twoPT221.addCell(new Phrase("Date", subheader));
		     				twoPT221.addCell(new Phrase("Test Name", subheader));
		     				twoPT221.addCell(new Phrase("Values", subheader));
		     				twoPT221.addCell(new Phrase("", subheader));
		     				 twoPT221.addCell(new Phrase("", subheader));
		     				
		     				 twoPT221.addCell(new Phrase("", subheader));
		                     twoPT221.addCell(new Phrase("", subheader));
		                     twoPT221.addCell(new Phrase("", subheader));
		                     twoPT221.addCell(new Phrase("", subheader));
		                     twoPT221.addCell(new Phrase("", subheader));
		                     document.add(twoPT221);
		     				twoPT221.flushContent(); 
		     				HeaderTable31.addCell(new Phrase("", tabletext));
		    				document.add(HeaderTable31);
		    				HeaderTable31.flushContent();
		                	int psize = labProfileIsEmpty.size();
		                	
		                	for (int pro = 0; pro < psize; pro++) {
		                		Date date1=labProfileIsEmpty.get(pro).getPostDateTime();
		                	if(date1 ==null){
		                		twoPT221.addCell(new Phrase("-" , tabletext));
		                	}else{
		                		twoPT221.addCell(new Phrase(""+ date1, tabletext));
		                	}
		                	String pkgnmae=labProfileIsEmpty.get(pro).getPkgName();
		                		if(!labProfileIsEmpty.get(pro).getPkgName().equals("-")){
		         				twoPT221.addCell(new Phrase(labProfileIsEmpty.get(pro).getProfileName()+"("+labProfileIsEmpty.get(pro).getPkgName()+")", subheader));
		                		}else{
		                			twoPT221.addCell(new Phrase(labProfileIsEmpty.get(pro).getProfileName(), subheader));
		                		}
		         				
		                		   String valuespthology="";
		                		
		               		 ArrayList<Integer> testids = new ArrayList<Integer>();
		               		 ArrayList<Integer> testNullval = new ArrayList<Integer>();
		               		
		               		
		               		 String proname = labProfileIsEmpty.get(pro).getProfileName();
		               		 int pid  = labProfileIsEmpty.get(pro).getIdprofile();
		               		 
		               		 
		               		ArrayList<LabTest> tst = (ArrayList<LabTest>) labProfile
		    	                                .get(pro).getTestli();

		    	                        int tsize = tst.size();
		    	                        int tcn = 1;
		    	                        for (int ts = 0; ts < tsize; ts++) {

		    	                            int ti = tst.get(ts).getIdTest();

		    	                            if (ti != 0) {
		    	                                String noval = "";
		    	                                String tn = tst.get(ts).getTestName();
		    	                                String tc = tst.get(ts).getTestCode();
		    	                                String tr = tst.get(ts).getTestResult();
		    	                                String vt = tst.get(ts).getValueType();
		    	                                String details = tst.get(ts).getNoteDeatilsForGeneral();
		    	                                float notifi = 0;
		    	                             
		    	                               
		    	                                
		    	                                if(ts == (tsize-1)){
		    	                                	  tr = tr.replaceAll("&nbsp;", "");
		    	  	                                valuespthology = valuespthology+   tn +" " +"-" +  tr  ;
		    	  	                          
		    	                                }else{
		    	                                	if(tr!=null){
		    		                                	  tr = tr.replaceAll("&nbsp;", "");

		    	                                	}else{
		    	                                		tr="-";
		    	                                	}
		    	  	                                valuespthology = valuespthology+   tn +" " +"-" +  tr + "," + "   "  ;
		    	  	                          
		    	                                }
		    	                              

		                                           

		    	                            }else{/* 
		    	                            	String testINproName = tst.get(ts)
		    	                                        .getTestName();
		    	                            	twoPT221.addCell(new Phrase("", subheader));
		    	                            	twoPT221.addCell(new Phrase("", subheader));
		    	                                twoPT221.addCell(new Phrase("", subheader));
		    	                 				twoPT221.addCell(new Phrase(testINproName + "", subheader));
		    	                 				twoPT221.addCell(new Phrase("", subheader));
		    	                 				  twoPT221.addCell(new Phrase("", subheader));
		    	                             */}
		    	                            
		    	                           
		    	                        }
		    	                        
		    	                        if(valuespthology.length() == 0){
		    	                        	valuespthology="-";
		    		                        }
		    	                   
		                              
		                 				twoPT221.addCell(new Phrase(valuespthology, tabletext));
		                 				twoPT221.addCell(new Phrase("", tabletext));
		                 				  twoPT221.addCell(new Phrase("", subheader));
		                              
		                				document.add(twoPT221);
		                				twoPT221.flushContent(); 
		    	                        valuespthology="";
		    	                        HeaderTable31.addCell(new Phrase("", tabletext));
		                				document.add(HeaderTable31);
		                				HeaderTable31.flushContent();
		    	                  
		               	}
		                	   twoPT2Q.addCell(new Phrase("" ,header));
		           		    twoPT2Q.addCell(new Phrase("" ,subheader));
		           		    document.add(twoPT2Q);
		                       twoPT2Q.flushContent();
		                }
		                			
		            	List<DischargeSummery> dsList = objIPDTreatmentModel
		    					.fetchDischargeAutoSummary(patientID, treatmentID);
		    			if (dsList != null && dsList.size() != 0
		    					&& dsList.size() > 0) {}
		    			
		    			//Treatment At DIscharge
		    			PdfPTable HeaderTable7 = new PdfPTable(6);
		    			int[] headerwidth7 = { 20, 30, 44, 24, 16, 20 };
		    			HeaderTable7.setWidths(headerwidth7);
		    			HeaderTable7.setWidthPercentage(95f);
		    			HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		    		
		    			PdfPTable twoPT2 = new PdfPTable(2);
		    			int[] widthInst2 = { 25, 75 };
		    			twoPT2.setWidths(widthInst2);
		    			twoPT2.setWidthPercentage(95f);
		    			twoPT2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		    			PdfPTable HeaderTable71 = new PdfPTable(6);
		    			int[] headerwidth711 = { 20, 8, 60, 20, 16, 20 };
		    			HeaderTable71.setWidths(headerwidth711);
		    			HeaderTable71.setWidthPercentage(95f);
		    			HeaderTable71.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		    		
		    			
		    			//Advice At discharge start
		    			
		    			if (dsList1.size() > 0) {
 							// Start: Part-12 Condition At Discharge
 							if (dsList1.get(0).getConditionAtDischarge() != null
 									&& !dsList1.get(0).getConditionAtDischarge()
 											.equals("undefined")
 									&& !dsList1.get(0).getConditionAtDischarge()
 											.equals("")) {
 								twoPT.addCell(new Phrase("", header));
 								twoPT.addCell(new Phrase("" , tabletext));
 								twoPT.getDefaultCell().setBorder(Rectangle.NO_BORDER);
 								
 								twoPT.addCell(new Phrase("Advice At Discharge :", header));
 								twoPT.addCell(new Phrase("" + dsList1.get(0).getAdvisedOnDischarge(), tabletext));
 								System.out.println("advice="+dsList1.get(0).getAdvisedOnDischarge());
 								document.add(twoPT);
 								twoPT.flushContent();
 								
 								 HeaderTable31.addCell(new Phrase("", tabletext));
 								 document.add(HeaderTable31);
 								 HeaderTable31.flushContent();
 							}
 						}
		    			
		    			//Advice At discharge end
				
		               /*  if (dsList.size() > 0) {
							// Start: Part-12 Condition At Discharge
							if (dsList.get(0).getConditionAtDischarge() != null
									&& !dsList.get(0).getConditionAtDischarge()
											.equals("undefined")
									&& !dsList.get(0).getConditionAtDischarge()
											.equals("")) {
								twoPT.addCell(new Phrase("Condition At Discharge :", header));
								twoPT.addCell(new Phrase("" + dsList.get(0).getConditionAtDischarge(), tabletext));
								
								document.add(twoPT);
								twoPT.flushContent();
								
								 HeaderTable31.addCell(new Phrase("", tabletext));
								 document.add(HeaderTable31);
								 HeaderTable31.flushContent();
							}
						}//End Condition At Discharge */
		
						IPDTreatmentModel objIPDTreatment = new IPDTreatmentModel();
						List<Order_comp_druges> order_comp_drugesli = new ArrayList<Order_comp_druges>();
						order_comp_drugesli = objIPDTreatment
								.fetchTreatmentAtDischrageOrder_comp_druges(treatId);
						if (order_comp_drugesli.size() != 0) {
							
							twoPT2.addCell(new Phrase("Treatment at Discharge : ", header));
							twoPT2.addCell(new Phrase("", subheader));
							document.add(twoPT2);
							twoPT2.flushContent();
							
							/* for (int m = 0; m < order_comp_drugesli.size(); m++) {
								twoPT2.addCell(new Phrase("", subheader));
		     						String English = order_comp_drugesli.get(m).getInstruction().split("/")[0];
								twoPT2.addCell(new Phrase("" + (order_comp_drugesli.get(m).getDruges_doses()
										+","+ order_comp_drugesli.get(m).getPrepName()
										+","+ English
										+","+ order_comp_drugesli.get(m).getDays()
										),tabletext));
								
							} */
							List<PrescriptionInstruction> inlist = new ArrayList<PrescriptionInstruction>();
							TreatmentModel tModel = new TreatmentModel();
							inlist = tModel.fectchAllPrescriptionInstruction("IPD");
							if (order_comp_drugesli.size() != 0) {


							 
								
								HeaderTable7.addCell(new Phrase("", header));
								HeaderTable7.addCell(new Phrase("", header));
								HeaderTable7.addCell(new Phrase("", header));
								HeaderTable7.addCell(new Phrase("", header));
								HeaderTable7.addCell(new Phrase("", header));
								HeaderTable7.addCell(new Phrase("", header));
								
								HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);

								HeaderTable7.addCell(new Phrase("", header));
								HeaderTable7.addCell(new Phrase("", header));
								HeaderTable7.addCell(new Phrase("", header));
								HeaderTable7.addCell(new Phrase("", header));
								HeaderTable7.addCell(new Phrase("", header));
								HeaderTable7.addCell(new Phrase("", header));
								

								document.add(HeaderTable7);
								HeaderTable7.flushContent();

								String insrtn="";
								
								 for(int i=0;i<order_masterli.size();i++){

										if(order_masterli.get(i).getOrder_comp_drugesList().size() !=0 )
										{
										 	HeaderTable7.addCell(new Phrase("#", subheader));
											HeaderTable7.addCell(new Phrase("Prep. Drug", subheader));
											HeaderTable7.addCell(new Phrase("Advice", subheader));
											HeaderTable7.addCell(new Phrase("Frequency", subheader));
											HeaderTable7.addCell(new Phrase("Duration", subheader));
											HeaderTable7.addCell(new Phrase("Qty.", subheader));

											document.add(HeaderTable7);
											HeaderTable7.flushContent(); 
											
										}
										
										
											for(int j=0;j < order_masterli.get(i).getOrder_comp_drugesList().size();j++){
												
												int Morning = 0;
												int Afternoon = 0;
												int Evening = 0;
												int Night = 0;
												String prep="";
												String daypr[];

											
													int insrtId= Integer.parseInt(order_masterli.get(i).getOrder_comp_drugesList().get(j).getRemarks());
													for(PrescriptionInstruction objDto:inlist){
														
														if(objDto.getPresciptionInstructionId()==insrtId){
															
															insrtn=objDto.getEnglishInstruction();
														
														}					
													}
												if(order_masterli.get(i).getOrder_comp_drugesList().get(j).getMorning().equalsIgnoreCase("Morning"))
												{
													Morning = 1;
												}else{
													Morning = 0;
												}
												if(order_masterli.get(i).getOrder_comp_drugesList().get(j).getAfternoon().equalsIgnoreCase("Afternoon"))
												{
													Afternoon = 1;
												}else{
													Afternoon = 0;
												}
												if(order_masterli.get(i).getOrder_comp_drugesList().get(j).getEvening().equalsIgnoreCase("Evening"))
												{
													Evening = 1;
												}else{
													Evening = 0;
												}
												if(order_masterli.get(i).getOrder_comp_drugesList().get(j).getNight().equalsIgnoreCase("Night"))
												{
													Night = 1;
												}else{
													Night = 0;
												}
												//daypr=null;
												String daypriction=order_masterli.get(i).getOrder_comp_drugesList().get(j).getDayPrescription();
												if(daypriction==null){
													
													daypriction="0,0,0,0";
												}
												 daypr=daypriction.split(",");

												HeaderTable7.addCell(new Phrase("" + order_masterli.get(i).getOrder_comp_drugesList().get(j).getPrep(), tabletext));
												HeaderTable7.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getDruges_doses(), tabletext));
												HeaderTable7.addCell(new Phrase(""+insrtn, tabletext));

												HeaderTable7.addCell(new Phrase(""+daypr[0]+" - "+daypr[1]+" - "+daypr[2]+" - "+daypr[3], tabletext));

												HeaderTable7.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getDays()+" Days", tabletext));
												HeaderTable7.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getQuantity(), tabletext));

												
												
												}
										}
			
				

								

					 			HeaderTable7.getDefaultCell()
										.setBorder(Rectangle.NO_BORDER);

					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));

					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));

								
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));
					 			HeaderTable7.addCell(new Phrase("", header));

								document.add(HeaderTable7);
								HeaderTable7.flushContent();

								
							}
							
							 HeaderTable31.addCell(new Phrase("", tabletext));
							 document.add(HeaderTable31);
							 HeaderTable31.flushContent();
							
						}
						
						TreatmentModel objtreatModel = new TreatmentModel();
						List<Appointment> patAppointmentList = new ArrayList<Appointment>();
						patAppointmentList = objtreatModel.fetchfollowUpForPatient(treatmentID);

						

						
					//End Treatment At DIscharge
					
									if (order_masterli.size() > 0) {
							
							PdfPTable twoPT11 = new PdfPTable(2);
							int[] widthInst11 = { 25, 75 };
							twoPT11.setWidths(widthInst11);
							twoPT11.setWidthPercentage(95f);
							twoPT11.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							
							PdfPTable HeaderTable778 = new PdfPTable(7);
			    			int[] headerwidth778 = { 20, 30, 44, 24, 16, 20,15 };
			    			HeaderTable778.setWidths(headerwidth778);
			    			HeaderTable778.setWidthPercentage(95f);
			    			HeaderTable778.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							
							//twoPT11.getDefaultCell().setBorder(Rectangle.BOTTOM);
							twoPT11.addCell(new Phrase("", subheader));
							twoPT11.addCell(new Phrase("", subheader));
							
							document.add(twoPT11);
							twoPT11.flushContent();
							
							
						 /* for(int i=0;i<order_masterli.size();i++){
								
								for(int j=0;j < order_masterli.get(i).getOrder_comp_drugesList().size();j++){
									twoPT.addCell(new Phrase("", subheader));
									twoPT.addCell(new Phrase(order_masterli.get(i).getOrder_comp_drugesList().get(j).getDruges_doses()+" , "+order_masterli.get(i).getOrder_comp_drugesList().get(j).getFrequency()+" Times a Day"
											+" , "+order_masterli.get(i).getOrder_comp_drugesList().get(j).getDays()+" Days", tabletext));
									}
							} */
						 
							order_masterli=IpdTmodel.featchOrderFormByDate(currDate, treatIdString, "previousAuto");
			
							if (order_masterli.size() > 0) {

							
							}
							String Hindi="";
							String Marathi="";	
							String all="";	
							String insrtn="";
						 	List<PrescriptionInstruction> inlist = new ArrayList<PrescriptionInstruction>();
							TreatmentModel tModel = new TreatmentModel();
							inlist = tModel.fectchAllPrescriptionInstruction("IPD");
							for(int i=0;i<order_masterli.size();i++){
								
								if(order_masterli.get(i).getOrder_comp_drugesList().size() !=0 )
								{
									twoPT11.addCell(new Phrase("Treatment : ", header1));
									twoPT11.addCell(new Phrase("", subheader));
									document.add(twoPT11);
									twoPT11.flushContent(); 
									
									HeaderTable778.addCell(new Phrase("#", subheader));
									HeaderTable778.addCell(new Phrase("Prep. Drug", subheader));
									HeaderTable778.addCell(new Phrase("Advice", subheader));
									HeaderTable778.addCell(new Phrase("", subheader));
									HeaderTable778.addCell(new Phrase("Frequency", subheader));
									HeaderTable778.addCell(new Phrase("Duration.", subheader));
									HeaderTable778.addCell(new Phrase("Qty." ,tabletext));

									document.add(HeaderTable778);
									HeaderTable778.flushContent();
									
									twoPT11.getDefaultCell().setBorder(Rectangle.BOTTOM);
									twoPT11.addCell(new Phrase("", subheader));
									twoPT11.addCell(new Phrase("", subheader));
									
									document.add(twoPT11);
									twoPT11.flushContent();
									
									HeaderTable778.addCell(new Phrase("", header));
									HeaderTable778.addCell(new Phrase("", header));
									HeaderTable778.addCell(new Phrase("", header));
									HeaderTable778.addCell(new Phrase("", header));
									HeaderTable778.addCell(new Phrase("", header));
									HeaderTable778.addCell(new Phrase("", header));
									HeaderTable778.addCell(new Phrase("", header));
									
									HeaderTable778.getDefaultCell().setBorder(Rectangle.NO_BORDER);

									HeaderTable778.addCell(new Phrase("", header));
									HeaderTable778.addCell(new Phrase("", header));
									HeaderTable778.addCell(new Phrase("", header));
									HeaderTable778.addCell(new Phrase("", header));
									HeaderTable778.addCell(new Phrase("", header));
									HeaderTable778.addCell(new Phrase("", header));
									HeaderTable778.addCell(new Phrase("", header));

									document.add(HeaderTable778);
									HeaderTable778.flushContent();	
								}	
								for(int j=0;j < order_masterli.get(i).getOrder_comp_drugesList().size();j++){
									
									int insrtId= Integer.parseInt(order_masterli.get(i).getOrder_comp_drugesList().get(j).getRemarks());
									for(PrescriptionInstruction objDto:inlist){
										
										if(objDto.getPresciptionInstructionId()==insrtId){
											
											insrtn=objDto.getEnglishInstruction();
											Hindi=objDto.getHindiInstruction();
											Marathi=objDto.getMarathiInstruction_forPrint();
											System.out.println("Instructions : "+insrtn );
											System.out.println("Instructions : "+Hindi );
											System.out.println("Instructions : "+Marathi );
										
										}					
									}
									
									int Morning = 0;
									int Afternoon = 0;
									int Evening = 0;
									int Night = 0;
									String daypr[];
									
									String daypriction=order_masterli.get(i).getOrder_comp_drugesList().get(j).getDayPrescription();
									System.err.println("dayyyyyyyyyyy" + insrtId);
									if(daypriction==null){
										
										daypriction="0,0,0,0";
									}
									
									 daypr=daypriction.split(",");
									if(order_masterli.get(i).getOrder_comp_drugesList().get(j).getMorning().equalsIgnoreCase("Morning"))
									{
										Morning = 1;
									}else{
										Morning = 0;
									}
									if(order_masterli.get(i).getOrder_comp_drugesList().get(j).getAfternoon().equalsIgnoreCase("Afternoon"))
									{
										Afternoon = 1;
									}else{
										Afternoon = 0;
									}
									if(order_masterli.get(i).getOrder_comp_drugesList().get(j).getEvening().equalsIgnoreCase("Evening"))
									{
										Evening = 1;
									}else{
										Evening = 0;
									}
									if(order_masterli.get(i).getOrder_comp_drugesList().get(j).getNight().equalsIgnoreCase("Night"))
									{
										Night = 1;
									}else{
										Night = 0;
									}

									HeaderTable778.addCell(new Phrase(""+(j+1), tabletext));
									HeaderTable778.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getDruges_doses(), tabletext));
									HeaderTable778.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getInstruction(), tabletext));


									//if(language.equalsIgnoreCase("MARATHI")){
										  if(!Marathi.equals("null")){
												
											  HeaderTable778.addCell(new Phrase(""+  Marathi,FontFactory.getFont("Shivaji05", 10)));

												}else{
													
												}
									//}else if(language.equalsIgnoreCase("HINDI")){
										//  if(!Hindi.equals("null")){
												
											 // HeaderTable7.addCell(new Phrase(""+  Hindi,FontFactory.getFont("Shivaji05", 10)));

											//	}else{
													
											//	}
									//}else{
										//HeaderTable7.addCell(new Phrase("" + insrtn,tabletext));
										
									//}
										  HeaderTable778.addCell(new Phrase(""+ daypr[0]+" - "+ daypr[1]+" - "+ daypr[2]+" - "+ daypr[3], tabletext));
										  HeaderTable778.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getDays()+" Days", tabletext));
										  HeaderTable778.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getQuantity(), tabletext));
									
							}

								

								HeaderTable778.getDefaultCell()
										.setBorder(Rectangle.NO_BORDER);

								HeaderTable778.addCell(new Phrase("", header));
								HeaderTable778.addCell(new Phrase("", header));
								HeaderTable778.addCell(new Phrase("", header));
								HeaderTable778.addCell(new Phrase("", header));
								HeaderTable778.addCell(new Phrase("", header));
								HeaderTable778.addCell(new Phrase("", header));
								HeaderTable778.addCell(new Phrase("", header));

								HeaderTable778.addCell(new Phrase("", header));
								HeaderTable778.addCell(new Phrase("", header));
								HeaderTable778.addCell(new Phrase("", header));
								HeaderTable778.addCell(new Phrase("", header));
								HeaderTable778.addCell(new Phrase("", header));
								HeaderTable778.addCell(new Phrase("", header));
								HeaderTable778.addCell(new Phrase("", header));
								
								HeaderTable778.addCell(new Phrase("", header));
								HeaderTable778.addCell(new Phrase("", header));
								HeaderTable778.addCell(new Phrase("", header));
								HeaderTable778.addCell(new Phrase("", header));
								HeaderTable778.addCell(new Phrase("", header));
								HeaderTable778.addCell(new Phrase("", header));
								HeaderTable778.addCell(new Phrase("", header));

								document.add(HeaderTable778);
								HeaderTable778.flushContent();

							}
							 HeaderTable31.addCell(new Phrase("", tabletext));
							 document.add(HeaderTable31);
							 HeaderTable31.flushContent();
						}
						
						//end
					
					if( divfollow==null){
						divfollow="--";
					}
					if(patAppointmentList.size()==0)
					{

			        	twoPT2.addCell(new Phrase("NEXT FOLLOW UP : ", header));
						twoPT2.addCell(new Phrase("", subheader));
						document.add(twoPT2);
						twoPT2.flushContent();
			
					}
					else
					{
				        	twoPT2.addCell(new Phrase("NEXT FOLLOW UP : ", header));
							twoPT2.addCell(new Phrase(""+ patAppointmentList.get(0).getApptDate(), subheader));
							document.add(twoPT2);
							twoPT2.flushContent();
					}		
				
				String date1 = request.getParameter("date");
		
			
			IPDTreatmentModel objIPDTreatmentModel1 = new IPDTreatmentModel();
					List<DoctorRoundReport> pdrrlist = objIPDTreatmentModel.getPreviousRoundList(treatmentID,date1);
					
					PdfPTable HeaderTable16 = new PdfPTable(5);
					int[] headerwidth16 = { 10, 20, 44, 28, 30};
					HeaderTable16.setWidths(headerwidth16);
					HeaderTable16.setWidthPercentage(95f);
					HeaderTable16.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					PdfPTable HeaderTable9 = new PdfPTable(1);
					int[] headerwidth9 = { 100 };
					HeaderTable9.setWidths(headerwidth9);
					HeaderTable9.setWidthPercentage(95f);
					HeaderTable9.getDefaultCell().setBorder(Rectangle.BOTTOM);
				
					
				
			
			// START: prescription
				PdfPTable HeaderTable61 = new PdfPTable(6);
				int[] headerwidth6 = { 30, 30, 44, 24, 16, 20 };
				HeaderTable61.setWidths(headerwidth6);
				HeaderTable61.setWidthPercentage(95f);
				HeaderTable61.getDefaultCell().setBorder(Rectangle.NO_BORDER);

// 				HeaderTable6.addCell(new Phrase("Order", header));
// 				HeaderTable6.addCell(new Phrase("Form", header));
// 				HeaderTable6.addCell(new Phrase("", header));
// 				HeaderTable6.addCell(new Phrase("", header));
// 				HeaderTable6.addCell(new Phrase("", header));
// 				HeaderTable6.addCell(new Phrase("", header));

			

// 				Font tabletextU = null;
// 				try {

// 					String osName = System.getProperty("os.name");

// 					if (osName.equalsIgnoreCase("Linux")) {
// 						tabletextU = new Font(BaseFont.createFont(
// 								"/usr/share/fonts/ARIALUNI/ARIALUNI.TTF",
// 								BaseFont.IDENTITY_H, BaseFont.EMBEDDED), 10,
// 								Font.NORMAL);
// 					} else {
// 						tabletextU = new Font(BaseFont.createFont(
// 								"c:/windows/fonts/ARIALUNI.TTF",
// 								BaseFont.IDENTITY_H, BaseFont.EMBEDDED), 10,
// 								Font.NORMAL);
// 					}

// 				} catch (Exception e2) {
// 					tabletextU = new Font(Font.FontFamily.HELVETICA, 10,
// 							Font.NORMAL);
// 				}

				/* List<Prescription> prepList = treatmentModel
						.fetchPrescription(treatmentID); */
				
			//	IPDTreatmentModel objIPDTreatmentModel = new IPDTreatmentModel();
			//List<Order_master> orderMasterli = objIPDTreatmentModel.getPreviousRoundList(treatmentID,date);
				/* List<Order_master> sampleBean = objIPDTreatmentModel
						.featchOrderFormByDate(date_pick,treatmentID,"previous"); */
				
// 				IPDTreatmentModel IpdTmodel= new IPDTreatmentModel();
// 				List<Order_master> order_masterli = new ArrayList<Order_master>();
			//	order_masterli=IpdTmodel.featchOrderFormByDate(date_pick,treatmentID,"previous");
				order_masterli=IpdTmodel.featchOrderFormByDate(date_pick,treatmentID,"previousAuto");
				
				/* PatientChemoController patChemoObj = new PatientChemoController();
				PatientCareAdvicesDto objDto = new PatientCareAdvicesDto();
				objDto=patChemoObj.getPatCareAdvicesData1(treatId);
				
				PdfPTable Table13a = new PdfPTable(2);
				int[] width31 = { 20,80 };
				Table13a.setWidths(width31);
				Table13a.setWidthPercentage(95f);
				Table13a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				Table13a.addCell(new Phrase("", header));
				Table13a.addCell(new Phrase("", header));
				
				if(!objDto.getLstPatCareAdvicedetails().get(0).getPallCare().equalsIgnoreCase("NULL")
						&& !objDto.getLstPatCareAdvicedetails().get(0).getPallCare().equalsIgnoreCase("undefined")
						&& !objDto.getLstPatCareAdvicedetails().get(0).getPallCare().equalsIgnoreCase("")){
					
					Table13a.addCell(new Phrase("Palliative Care Advice:", subheader));
					Table13a.addCell(new Phrase(objDto.getLstPatCareAdvicedetails().get(0).getPallCare(), subheader));
				}
				if(!objDto.getLstPatCareAdvicedetails().get(0).getSuppCare().equalsIgnoreCase("NULL")
						&& !objDto.getLstPatCareAdvicedetails().get(0).getSuppCare().equalsIgnoreCase("undefined")
						&& !objDto.getLstPatCareAdvicedetails().get(0).getSuppCare().equalsIgnoreCase("")){
					
					Table13a.addCell(new Phrase("Supportive Care:", subheader));
					Table13a.addCell(new Phrase(objDto.getLstPatCareAdvicedetails().get(0).getSuppCare(), subheader));
				}
				if(!objDto.getLstPatCareAdvicedetails().get(0).getPrevCare().equalsIgnoreCase("NULL")
						&& !objDto.getLstPatCareAdvicedetails().get(0).getPrevCare().equalsIgnoreCase("undefined")
						&& !objDto.getLstPatCareAdvicedetails().get(0).getPrevCare().equalsIgnoreCase("")){
					
					Table13a.addCell(new Phrase("Preventive Care:", subheader));
					Table13a.addCell(new Phrase(objDto.getLstPatCareAdvicedetails().get(0).getPrevCare(), subheader));
				}
				if(!objDto.getLstPatCareAdvicedetails().get(0).getRehabCare().equalsIgnoreCase("NULL")
						&& !objDto.getLstPatCareAdvicedetails().get(0).getRehabCare().equalsIgnoreCase("undefined")
						&& !objDto.getLstPatCareAdvicedetails().get(0).getRehabCare().equalsIgnoreCase("")){
					
					Table13a.addCell(new Phrase("Rehabilitative Care:", subheader));
					Table13a.addCell(new Phrase(objDto.getLstPatCareAdvicedetails().get(0).getRehabCare(), subheader));
				}
				
				
				
				document.add(Table13a);
				Table13a.flushContent();  */

// 				if (order_masterli.size() != 0) {
// 					document.add(HeaderTable6);
// 					HeaderTable6.flushContent();
// 					HeaderTable6.addCell(new Phrase("#", subheader));
// 					HeaderTable6.addCell(new Phrase("Prep. Drug", subheader));
// 					HeaderTable6.addCell(new Phrase("Advice", subheader));
// 					HeaderTable6.addCell(new Phrase("Frequency", subheader));
// 					HeaderTable6.addCell(new Phrase("Duration", subheader));
// 					HeaderTable6.addCell(new Phrase("Qty.", subheader));

// 					document.add(HeaderTable6);
// 					HeaderTable6.flushContent();
					
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
					
// 					HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);

// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
					

// 					document.add(HeaderTable6);
// 					HeaderTable6.flushContent();

					/* for (int i = 0; i < prepList.size(); i++) {
						
						
						HeaderTable6.addCell(new Phrase(""+i+1, tabletext));
						HeaderTable6.addCell(new Phrase(""+prepList.get(i).getPrepName()+"."+prepList.get(i).getName(), tabletext));
						HeaderTable6.addCell(new Phrase(""+prepList.get(i).getInstructionName(), tabletext));
						HeaderTable6.addCell(new Phrase(""+prepList.get(i).getFrequency()+" Times a Day", tabletext));
						HeaderTable6.addCell(new Phrase(""+prepList.get(i).getDays()+" Days", tabletext));
						HeaderTable6.addCell(new Phrase(""+prepList.get(i).getQty(), tabletext));
						
					} */
					
// 		 for(int i=0;i<order_masterli.size();i++){
// 				int count = 1;
// 					for(int j=0;j < order_masterli.get(i).getOrder_comp_drugesList().size();j++){
						
// 						int Morning = 0;
// 						int Afternoon = 0;
// 						int Evening = 0;
// 						int Night = 0;
// 						if(order_masterli.get(i).getOrder_comp_drugesList().get(j).getMorning().equalsIgnoreCase("Morning"))
// 						{
// 							Morning = 1;
// 						}else{
// 							Morning = 0;
// 						}
// 						if(order_masterli.get(i).getOrder_comp_drugesList().get(j).getAfternoon().equalsIgnoreCase("Afternoon"))
// 						{
// 							Afternoon = 1;
// 						}else{
// 							Afternoon = 0;
// 						}
// 						if(order_masterli.get(i).getOrder_comp_drugesList().get(j).getEvening().equalsIgnoreCase("Evening"))
// 						{
// 							Evening = 1;
// 						}else{
// 							Evening = 0;
// 						}
// 						if(order_masterli.get(i).getOrder_comp_drugesList().get(j).getNight().equalsIgnoreCase("Night"))
// 						{
// 							Night = 1;
// 						}else{
// 							Night = 0;
// 						}
						
// 						/* HeaderTable6.addCell(new Phrase(""+j+1, tabletext));
// 						HeaderTable6.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getDruges_doses(), tabletext));
// 						HeaderTable6.addCell(new Phrase(""+Morning+"-"+Afternoon+"-"+Evening+"-"+Night, tabletext));
// 						HeaderTable6.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getFrequency()+" Times a Day", tabletext));
// 						HeaderTable6.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getDays()+" Days", tabletext));
// 						HeaderTable6.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getQuantity(), tabletext)); */
						
// 						HeaderTable6.addCell(new Phrase(""+count++, tabletext));
// 						HeaderTable6.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getDruges_doses(), tabletext));
// 						HeaderTable6.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getInstruction(), tabletext));
// 						HeaderTable6.addCell(new Phrase(""+Morning+" - "+Afternoon+" - "+Evening+" - "+Night, tabletext));
// 						HeaderTable6.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getDays()+" Days", tabletext));
// 						HeaderTable6.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getQuantity(), tabletext));
						
						
// 						}
// 				}

					

// 					HeaderTable6.getDefaultCell()
// 							.setBorder(Rectangle.NO_BORDER);

// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));

// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));

					
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));
// 					HeaderTable6.addCell(new Phrase("", header));

// 					document.add(HeaderTable6);
// 					HeaderTable6.flushContent();

// 				}
				// END: prescription
			
			

			PdfPTable HeaderTable0 = new PdfPTable(6);
				int[] headerwidth0 = { 5, 30, 20, 10, 20, 20 };
				HeaderTable0.setWidths(headerwidth0);
				HeaderTable0.setWidthPercentage(95f);
				HeaderTable0.getDefaultCell().setBorder(Rectangle.NO_BORDER);


				PdfPTable HeaderTable01 = new PdfPTable(1);
				int[] headerwidth01 = { 100 };
				HeaderTable01.setWidths(headerwidth01);
				HeaderTable01.setWidthPercentage(95f);
				HeaderTable01.getDefaultCell().setBorder(Rectangle.TOP);
				
				PatientModel objpatiPatientModel = new PatientModel();
				int trid = Integer.parseInt(treatmentID);
				List<CpoeOTdetails> serviceResponse1 = objpatiPatientModel.fetchIpdServices(trid,6);
				List<CpoeOTdetails> serviceResponse = objpatiPatientModel.fetchIpdServices(trid,7);
				List<CpoeOTdetails> serviceResponse2 = objpatiPatientModel.fetchIpdServices(trid,8);
				
				if (serviceResponse.size() != 0) {

					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", header));
					document.add(HeaderTable0);
					HeaderTable0.flushContent();
					
					HeaderTable01.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable01.addCell(new Phrase("IPD Services", header));
					document.add(HeaderTable01);
					HeaderTable01.flushContent();

					HeaderTable0.addCell(new Phrase("#", subheader));
					HeaderTable0.addCell(new Phrase("Particulars/Details", subheader));
					HeaderTable0.addCell(new Phrase("Service Type ", subheader));
					HeaderTable0.addCell(new Phrase("Quantity", subheader));
					HeaderTable0.addCell(new Phrase("Assign By", subheader));
					HeaderTable0.addCell(new Phrase("Assign Date & Time", subheader));
					document.add(HeaderTable0);
					HeaderTable0.flushContent();
					//System.err.println("dfadsfdsa------"+serviceResponse.get(0).getCategoryName());
					
					 for (int i = 0; i < serviceResponse1.size(); i++) {
							
							try { 
	  							
								HeaderTable0.addCell(new Phrase("" + (i + 1) + ".",
										tabletext));
								HeaderTable0.addCell(new Phrase(""
										+ serviceResponse1.get(i).getCategoryName(),
										tabletext));

								HeaderTable0.addCell(new Phrase(""+ serviceResponse1.get(i).getServicename(),
										tabletext));

								HeaderTable0.addCell(new Phrase(""
										+ serviceResponse1.get(i).getQuantity(),
										tabletext));
								HeaderTable0.addCell(new Phrase("-",	tabletext));
								HeaderTable0.addCell(new Phrase(""
										+ serviceResponse1.get(i).getCreated_date_time(),
										tabletext));

								document.add(HeaderTable0);
								HeaderTable0.flushContent();

							 } catch (Exception e) {
								e.printStackTrace();
							}

						} 
					//for Gases and Monitors
					 for (int i = 0; i < serviceResponse.size(); i++) {
						
						try { 
  							
							HeaderTable0.addCell(new Phrase("" + (i + 1) + ".",
									tabletext));
							HeaderTable0.addCell(new Phrase(""
									+ serviceResponse.get(i).getCategoryName(),
									tabletext));

							HeaderTable0.addCell(new Phrase(""+ serviceResponse.get(i).getServicename(),
									tabletext));

							HeaderTable0.addCell(new Phrase(""
									+ serviceResponse.get(i).getQuantity(),
									tabletext));
							HeaderTable0.addCell(new Phrase("-",	tabletext));
							HeaderTable0.addCell(new Phrase(""
									+ serviceResponse.get(i).getCreated_date_time(),
									tabletext));

							document.add(HeaderTable0);
							HeaderTable0.flushContent();

						 } catch (Exception e) {
							e.printStackTrace();
						}

					} 
					 
					 
					
					 
					 
					 for (int i = 0; i < serviceResponse2.size(); i++) {
							
							try { 
	  							
								HeaderTable0.addCell(new Phrase("" + (i + 1) + ".",
										tabletext));
								HeaderTable0.addCell(new Phrase(""
										+ serviceResponse2.get(i).getCategoryName(),
										tabletext));

								HeaderTable0.addCell(new Phrase(""+ serviceResponse2.get(i).getServicename(),
										tabletext));

								HeaderTable0.addCell(new Phrase(""
										+ serviceResponse2.get(i).getQuantity(),
										tabletext));
								HeaderTable0.addCell(new Phrase("-",	tabletext));
								HeaderTable0.addCell(new Phrase(""
										+ serviceResponse2.get(i).getCreated_date_time(),
										tabletext));

								document.add(HeaderTable0);
								HeaderTable0.flushContent();

							 } catch (Exception e) {
								e.printStackTrace();
							}

						} 

					HeaderTable0.getDefaultCell()
							.setBorder(Rectangle.BOTTOM);
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", header));

					document.add(HeaderTable0);
					HeaderTable0.flushContent();

				}
			
				// START: General Instruction
				List<TreatmentInstructionDTO> generalInstructionList = treatmentModel
						.fetchPCTreatmentInstruction(treatmentID);

				if (generalInstructionList.size() != 0) {

					PdfPTable HeaderTable74 = new PdfPTable(3);
					int[] headerwidth74 = { 2, 20, 40 };
					HeaderTable74.setWidths(headerwidth74);
					HeaderTable74.setWidthPercentage(95f);
					HeaderTable74.getDefaultCell().setBorder(Rectangle.TOP);
					HeaderTable74.addCell(new Phrase("", header));
					HeaderTable74.addCell(new Phrase("", header));
					HeaderTable74.addCell(new Phrase("", header));
					document.add(HeaderTable7);
					HeaderTable74.flushContent();

					HeaderTable74.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
					HeaderTable74.addCell(new Phrase("", header));
					HeaderTable74.addCell(new Phrase("", header));
					HeaderTable74.addCell(new Phrase("", header));
					document.add(HeaderTable74);
					HeaderTable74.flushContent();

					HeaderTable74.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable74.addCell(new Phrase("", header));
					HeaderTable74.addCell(new Phrase("General Instructions",
							subheader));
					HeaderTable74.addCell(new Phrase("", header));
					document.add(HeaderTable74);
					HeaderTable74.flushContent();

					PdfPTable Table3 = new PdfPTable(5);
					int[] width3 = { 10, 40, 10, 10, 40 };
					Table3.setWidths(width3);
					Table3.setWidthPercentage(95f);
					Table3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					Table3.addCell(new Phrase("", header));
					Table3.addCell(new Phrase("", header));
					Table3.addCell(new Phrase("", header));
					Table3.addCell(new Phrase("", header));
					Table3.addCell(new Phrase("", header));
					document.add(Table3);
					Table3.flushContent();

					try {

						for (int i = 0; i < generalInstructionList.size(); i = i + 2) {

							Table3.addCell(new Phrase("" + (i + 1) + ".",
									tabletext));
							Table3.addCell(new Phrase(
									""
											+ (generalInstructionList.get(i)
													.getTreatmentChildInstructionName()),
									tabletext));
							Table3.addCell(new Phrase("", tabletext));
							if (generalInstructionList.get(i + 1)
									.getTreatmentChildInstructionName() != null
									|| generalInstructionList.get(i + 1)
											.getTreatmentChildInstructionName() != "") {
								Table3.addCell(new Phrase("" + (i + 2) + ".",
										tabletext));
								Table3.addCell(new Phrase(
										""
												+ (generalInstructionList
														.get(i + 1)
														.getTreatmentChildInstructionName()),
										tabletext));
							}
							document.add(Table3);
							Table3.flushContent();
						}

					} catch (Exception e) {
						e.printStackTrace();
					}

					Table3.getDefaultCell().setBorder(Rectangle.BOTTOM);
					Table3.addCell(new Phrase("", header));
					Table3.addCell(new Phrase("", header));
					Table3.addCell(new Phrase("", header));
					Table3.addCell(new Phrase("", header));
					Table3.addCell(new Phrase("", header));
					document.add(Table3);
					Table3.flushContent();

				}
				// END: General Instruction
			
				
				// START : Individual Instruction
				List<ReportInstructionDTO> reportInstructionDTOList = treatmentModel
						.fetchIndividualTreatmentInstruction(treatmentID);
				if (reportInstructionDTOList.size() != 0) {

					PdfPTable HeaderTable75 = new PdfPTable(3);
					int[] headerwidth75 = { 2, 20, 40 };
					HeaderTable75.setWidths(headerwidth75);
					HeaderTable75.setWidthPercentage(95f);

					HeaderTable75.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
					HeaderTable75.addCell(new Phrase("", header));
					HeaderTable75.addCell(new Phrase("", header));
					HeaderTable75.addCell(new Phrase("", header));
					document.add(HeaderTable75);
					HeaderTable75.flushContent();

					HeaderTable75.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable75.addCell(new Phrase("", header));
					HeaderTable75.addCell(new Phrase("Primary Instructions",
							subheader));
					HeaderTable75.addCell(new Phrase("", header));
					document.add(HeaderTable75);
					HeaderTable75.flushContent();

					PdfPTable Table3 = new PdfPTable(5);
					int[] width3 = { 10, 40, 10, 10, 40 };
					Table3.setWidths(width3);
					Table3.setWidthPercentage(95f);
					Table3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					Table3.addCell(new Phrase("", header));
					Table3.addCell(new Phrase("", header));
					Table3.addCell(new Phrase("", header));
					Table3.addCell(new Phrase("", header));
					Table3.addCell(new Phrase("", header));
					document.add(Table3);
					Table3.flushContent();

					try {

						for (int i = 0; i < reportInstructionDTOList.size(); i = i + 2) {

							Table3.addCell(new Phrase("" + (i + 1) + ".",
									tabletext));

							Table3.addCell(new Phrase(""
									+ (reportInstructionDTOList.get(i)
											.getReportInstruction()), tabletext));

							Table3.addCell(new Phrase("", tabletext));

							if (reportInstructionDTOList.get(i + 1)
									.getReportInstruction() != null
									|| reportInstructionDTOList.get(i + 1)
											.getReportInstruction() != "") {

								Table3.addCell(new Phrase("" + (i + 2) + ".",
										tabletext));

								Table3.addCell(new Phrase(""
										+ (reportInstructionDTOList.get(i + 1)
												.getReportInstruction()),
										tabletext));

							}

							document.add(Table3);
							Table3.flushContent();

						}

					} catch (Exception e) {
						document.add(Table3);
						Table3.flushContent();
						e.printStackTrace();
					}
					
					Table3.getDefaultCell().setBorder(Rectangle.BOTTOM);
					Table3.addCell(new Phrase("", header));
					Table3.addCell(new Phrase("", header));
					Table3.addCell(new Phrase("", header));
					Table3.addCell(new Phrase("", header));
					Table3.addCell(new Phrase("", header));
					document.add(Table3);
					Table3.flushContent();

				}
				
				//START admission Note
				
				
				/* Treatment obj =new Treatment();
				obj.setTreatment_ID(treatId);
				obj.setPatient_ID(patID);
				String tratServ=treatmentModel.fetchPatientAdmissionNote(obj);
			
				if (tratServ != "" || tratServ != null || tratServ != "-" ) {
					tratServ = tratServ.replaceAll("\\<.*?>","");
					tratServ = tratServ.replaceAll("<p>","");
					tratServ = tratServ.replaceAll("</p>","");
					PdfPTable HeaderTable17 = new PdfPTable(3);
					int[] headerwidth17 = { 2, 20, 40 };
					HeaderTable17.setWidths(headerwidth17);
					HeaderTable17.setWidthPercentage(95f);

					HeaderTable17.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
					HeaderTable17.addCell(new Phrase("", header));
					HeaderTable17.addCell(new Phrase("", header));
					HeaderTable17.addCell(new Phrase("", header));
					document.add(HeaderTable17);
					HeaderTable17.flushContent();

					HeaderTable17.addCell(new Phrase("", header));
					HeaderTable17.addCell(new Phrase("",
							subheader));
					HeaderTable17.addCell(new Phrase("", header));
					document.add(HeaderTable17);
					HeaderTable17.flushContent();

					PdfPTable Table13 = new PdfPTable(2);
					int[] width3 = { 20,80 };
					Table13.setWidths(width3);
					Table13.setWidthPercentage(95f);
					Table13.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					Table13.addCell(new Phrase("", header));
					Table13.addCell(new Phrase("", header));
					
					document.add(Table13);
					Table13.flushContent();

					try {
                            if(tratServ.contains("-")){
                            	
                            }else{
                            	Table13.addCell(new Phrase("Admission Note:", subheader));
        						Table13.addCell(new Phrase(""+tratServ, tabletext));
        						
                            }
						
						document.add(Table13);
						Table13.flushContent();
					} catch (Exception e) {
						document.add(Table13);
						Table13.flushContent();
						e.printStackTrace();
					}
					
					Table13.getDefaultCell().setBorder(Rectangle.BOTTOM);
					Table13.addCell(new Phrase("", header));
					Table13.addCell(new Phrase("", header));
					
					document.add(Table13);
					Table13.flushContent();

				} */
				
				//End admission Note
				
				
				
				
				
				
				
				//IPDTreatmentModel IpdTmodel= new IPDTreatmentModel(); //(ApplicationContextUtils.getApplicationContext()).getBean(TreatmentModel.class);
		//	IPDHistoryMaster IpdHM = new IPDHistoryMaster();			
			
			//List<Order_master> order_masterli = new ArrayList<Order_master>();
			
			//List<IPDHistoryMaster> IPDHistoryMasterli = new ArrayList<IPDHistoryMaster>();
			//List<IPDHistoryMaster> IPDHistoryCompli = new ArrayList<IPDHistoryMaster>();
			IPDHistoryMasterli=IpdTmodel.fetchIPDHistory(treatmentID);
			
			DateFormat dateFormat1 = new SimpleDateFormat("dd/MM/yyyy");
			Date date11 = new Date();
			String currDate1=dateFormat1.format(date11);
			
			order_masterli=IpdTmodel.featchOrderFormByDate(currDate1, treatmentID, "previous");
			
			
			if(IpdTmodel != null && IPDHistoryMasterli.size() > 0)
			{/*  
				IPDHistoryMasterli=IpdTmodel.fetchIPDHistory(treatmentID);
				//IPDHistoryMasterli.get(0)
				
				//IPDHistoryMasterli.get(0).getListIPdHistoryCompona().get(0).getChief_com_durration();
				//IPDHistoryMasterli.get(0).getFamilyHistory();

			
			
			PdfPTable HeaderTable76 = new PdfPTable(1);
			int[] headerwidth76 = {100};
			HeaderTable76.setWidths(headerwidth76);
			HeaderTable76.setWidthPercentage(95f);		
			
			HeaderTable76.addCell(new Phrase("History", subheader));
			HeaderTable76.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable76.addCell(new Phrase("", subheader));
			HeaderTable76.addCell(new Phrase("", subheader));
			
			HeaderTable76.addCell(new Phrase("CHIEF COMPLAINTS  :  ", subheader));
			for(int i=0;i<IPDHistoryMasterli.size();i++){
				for(int j=0;j < IPDHistoryMasterli.get(i).getListIPdHistoryCompona().size();j++){
					
					HeaderTable76.addCell(new Phrase(" "+IPDHistoryMasterli.get(i).getListIPdHistoryCompona().get(j).getChief_com_durration(), tabletext));
	
				}
			}
			HeaderTable76.addCell(new Phrase(" "+IPDHistoryMasterli.get(0).getChiefComplaintsTxt(), tabletext));
			
			HeaderTable76.addCell(new Phrase("", subheader));
			HeaderTable76.addCell(new Phrase("", subheader));
			
			HeaderTable76.addCell(new Phrase("HISTORY OF PRESENTING ILLNESS  :  ", subheader));
			HeaderTable76.addCell(new Phrase(" "+IPDHistoryMasterli.get(0).getLocal_Exma(), tabletext));
			
			HeaderTable76.addCell(new Phrase("", subheader));
			HeaderTable76.addCell(new Phrase("", subheader));
			
			HeaderTable76.addCell(new Phrase("PAST HISTORY  :  ", subheader));
			HeaderTable76.addCell(new Phrase(" "+IPDHistoryMasterli.get(0).getPast_surgical_his(), tabletext));
			
			HeaderTable76.addCell(new Phrase("", subheader));
			HeaderTable76.addCell(new Phrase("", subheader));
			
			HeaderTable76.addCell(new Phrase("PERSONAL & FAMILY HISTORY  :  ", subheader));

			for(int i=0;i<IPDHistoryMasterli.size();i++){			
					
					//IPDHistoryMasterli.get(i).getListIPdHistoryCompona().get(j).getChief_com_durration();
					HeaderTable76.addCell(new Phrase("PERSONAL - " + IPDHistoryMasterli.get(i).getPersonalHistory(), tabletext));
					HeaderTable76.addCell(new Phrase("", subheader));
					HeaderTable76.addCell(new Phrase("FAMILY -"+ IPDHistoryMasterli.get(i).getFamilyHistory(), tabletext));

			}
			
			HeaderTable76.addCell(new Phrase("", subheader));
			HeaderTable76.addCell(new Phrase("", subheader));
			
			HeaderTable76.addCell(new Phrase("PHYSICAL EXAMINATION :   ", subheader));
			
			HeaderTable76.addCell(new Phrase("O/E :", tabletext));
			HeaderTable76.addCell(new Phrase("", subheader));
			HeaderTable76.addCell(new Phrase("VITALS -", tabletext));
			HeaderTable76.addCell(new Phrase("Temperature -"+IPDHistoryMasterli.get(0).getTemp(), tabletext));
			HeaderTable76.addCell(new Phrase("Pulse -"+IPDHistoryMasterli.get(0).getPulse(), tabletext));
			HeaderTable76.addCell(new Phrase("BP -"+IPDHistoryMasterli.get(0).getBp(), tabletext));
			HeaderTable76.addCell(new Phrase("", subheader));
			
			HeaderTable76.addCell(new Phrase("General Exam -", tabletext));
			HeaderTable76.addCell(new Phrase("Pallor -"+IPDHistoryMasterli.get(0).getPallor(), tabletext));
			HeaderTable76.addCell(new Phrase("Clubbing -"+IPDHistoryMasterli.get(0).getClubbing(), tabletext));
			HeaderTable76.addCell(new Phrase("Icterus -"+IPDHistoryMasterli.get(0).getLcterus(), tabletext));
			HeaderTable76.addCell(new Phrase("Oedema -"+IPDHistoryMasterli.get(0).getOedema(), tabletext));
			HeaderTable76.addCell(new Phrase("Lymph Adenopathy -"+IPDHistoryMasterli.get(0).getLymph(), tabletext));
			HeaderTable76.addCell(new Phrase("", subheader));
			
			
			
			HeaderTable76.addCell(new Phrase("S/E :", tabletext));			
			HeaderTable76.addCell(new Phrase("CVS -"+IPDHistoryMasterli.get(0).getCvs(), tabletext));
			HeaderTable76.addCell(new Phrase("CNS -"+IPDHistoryMasterli.get(0).getCns(), tabletext));
			HeaderTable76.addCell(new Phrase("R/S -"+IPDHistoryMasterli.get(0).getRs(), tabletext));
			HeaderTable76.addCell(new Phrase("P/A -"+IPDHistoryMasterli.get(0).getPa(), tabletext));
			
			AdminModel Treatmodel= new AdminModel();
			CustomizeTemplate cT= new CustomizeTemplate();
			//List<CustomizeTemplate> customizeTemplateList = new ArrayList<CustomizeTemplate>();
			List<CustomizeTemplate> patientHistoryTemplateList = new ArrayList<CustomizeTemplate>();
			
			patientHistoryTemplateList = Treatmodel.fetchCKEditorDocterDesk1(treatmentID);
			
			 if(Treatmodel != null && patientHistoryTemplateList.size() > 0)
			{
				
			patientHistoryTemplateList = Treatmodel.fetchCKEditorDocterDesk1(treatmentID);
			
			//String a=patientHistoryTemplateList.get(0).getTemp_data();
			String s = Jsoup.parse(patientHistoryTemplateList.get(0).getTemp_data()).text();
			
			HeaderTable76.addCell(new Phrase(" "+s, tabletext));		
			
			}  
			 HeaderTable76.addCell(new Phrase(" ", subheader));
			 			 
			 HeaderTable76.addCell(new Phrase("SUMMARY OF HOSPITALI COURSE :   ", subheader));
			 HeaderTable76.addCell(new Phrase("MEDICATIONS -", tabletext));
			 
			 for(int i=0;i<order_masterli.size();i++){
					for(int j=0;j < order_masterli.get(i).getOrder_comp_drugesList().size();j++){
						
						HeaderTable76.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getDruges_doses(), tabletext));
		
					}
				}
			 
			 
			 HeaderTable76.addCell(new Phrase(" ", subheader));
			 HeaderTable76.addCell(new Phrase(" ", subheader));
			 
			
			document.add(HeaderTable76);
			HeaderTable76.flushContent();
			 */}
				
				
				
			/* if(editorContent.equals(xyz)){
				PdfPTable twoPTT = new PdfPTable(2);
				int[] widthInstt = { 20, 80 };
				twoPTT.setWidths(widthInstt);
				twoPTT.setWidthPercentage(95f);
				twoPTT.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			//	AdminModel adminModel = new AdminModel(); 
			//	List<CustomizeTemplate> customizeTemplateList = adminModel.fetchCKEditorDocterDesk1(treatmentID);
				

				twoPTT.addCell(new Phrase("", subheader));
				twoPTT.addCell(new Phrase("", tabletext));

				document.add(twoPTT);
				twoPTT.flushContent();

				twoPTT.addCell(new Phrase("Subjective & Objective: ", subheader));

				if (customizeTemplateList.size() != 0) {

					for (int i = 0; i < customizeTemplateList.size(); i++) {

						if (i == 0) {
							String subobjdata = customizeTemplateList.get(i).getTemp_data();
							String s = "<p>";
							String s1 = "</p>";
							if(subobjdata.contains(s) && subobjdata.contains(s1)){
								subobjdata = subobjdata.replace("<p>", "");
								subobjdata = subobjdata.replace("</p>", "");
								subobjdata=subobjdata.replaceAll("\\<.*?>","");
							}
							twoPTT.addCell(new Phrase(""+ subobjdata, tabletext));
							System.err.println("=-=fff-=-=-=-=-=-=-"+subobjdata);
						} else {
							String subobjdata = customizeTemplateList.get(i).getTemp_data();
							String s = "<p>";
							String s1 = "</p>";
							if(subobjdata.contains(s) && subobjdata.contains(s1)){
								subobjdata = subobjdata.replace("<p>", "");
								subobjdata = subobjdata.replace("</p>", "");
								subobjdata = subobjdata.replaceAll("\\<.*?>","");
							}
							twoPTT.addCell(new Phrase("", subheader));
							twoPTT.addCell(new Phrase(""+ subobjdata, tabletext));
							System.err.println("=-=fff-=-=-=-=-=-=-"+subobjdata);
						}

					}

				} else {
					twoPTT.addCell(new Phrase("--",
							tabletext));
				}

				twoPTT.addCell(new Phrase("", subheader));
				twoPTT.addCell(new Phrase("", tabletext));

				document.add(twoPTT);
				twoPTT.flushContent(); 
			}
			else{
		
			document.add(instructionPT);
			instructionPT.flushContent();

			twoPT.addCell(new Phrase("Subjective & Objective : ", subheader));
			HTMLWorker htmlWorker = new HTMLWorker(document);
			Paragraph paragraph = new Paragraph();
			StyleSheet styleSheet = new StyleSheet();
			styleSheet.loadTagStyle("body", "size", "9pt");
			styleSheet.loadTagStyle("p", "size", "9pt");
			java.util.List<Element> ie = HTMLWorker.parseToList(
					new StringReader(editorContent), styleSheet);
			for (Element element : ie) { paragraph.add(element);
			}
			cell = new PdfPCell(paragraph);
			cell.setBorder(Rectangle.NO_BORDER);
			twoPT.addCell(cell);
			} */

			
				
				
			if (pdrrlist.size() != 0) {/* 

				HeaderTable9.addCell(new Phrase(" Doctor Round Report:", header));
				document.add(HeaderTable9);
				HeaderTable9.flushContent();
				
				HeaderTable16.addCell(new Phrase("#", subheader));
				HeaderTable16.addCell(new Phrase("DateTime", subheader));
				HeaderTable16.addCell(new Phrase("Clinical Notes",
						subheader));
				HeaderTable16.addCell(new Phrase("Investigation Advice", subheader));
				HeaderTable16.addCell(new Phrase("RoundBy", subheader));
				document.add(HeaderTable16);
				HeaderTable16.flushContent();

				for (int i = 0; i < pdrrlist.size(); i++) {
					try {

						HeaderTable16.addCell(new Phrase("" + (i + 1) + ".",
								tabletext));
						HeaderTable16.addCell(new Phrase(""
								+ pdrrlist.get(i).getDate()+" "+pdrrlist.get(i).getTime(),
								tabletext));
						HeaderTable16.addCell(new Phrase(""
								+ pdrrlist.get(i)
										.getClinical_note(),
								tabletext));

						HeaderTable16.addCell(new Phrase(""
								+ pdrrlist.get(i).getInvestigation_advice(),
								tabletext));
						HeaderTable16.addCell(new Phrase(""
								+ pdrrlist.get(i).getDocName(),
								tabletext));
						
						document.add(HeaderTable16);
						HeaderTable16.flushContent();

					} catch (Exception e) {
						e.printStackTrace();
					}

				}

				HeaderTable16.getDefaultCell()
						.setBorder(Rectangle.BOTTOM);
				HeaderTable16.addCell(new Phrase("", header));
				HeaderTable16.addCell(new Phrase("", header));
				HeaderTable16.addCell(new Phrase("", header));
				HeaderTable16.addCell(new Phrase("", header));
				HeaderTable16.addCell(new Phrase("", header));
				HeaderTable16.addCell(new Phrase("", header));

				document.add(HeaderTable16);
				HeaderTable16.flushContent();

			 */}
		
			//Chemo Start
			PdfPTable twoPT3 = new PdfPTable(2);
			int[] widthInst3 = { 25, 75 };
			twoPT3.setWidths(widthInst3);
			twoPT3.setWidthPercentage(95f);
			twoPT3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			PatientChemoController pcc=(ApplicationContextUtils.getApplicationContext()).getBean(PatientChemoController.class);
			List<PatientChemoDto> pcd = new ArrayList<PatientChemoDto>();	
				
				String callFrom = "datewiseChemo";
				String date2 = "";
				pcd=pcc.getPatChemoTherapyAll(treatId,callFrom,date2);
					
				PdfPTable twoPT19 = new PdfPTable(2);
				int[] widthInst11 = { 30, 70 };
				twoPT19.setWidths(widthInst11);
				twoPT19.setWidthPercentage(95f);
				twoPT19.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				PdfPTable HeaderTable19 = new PdfPTable(19);
				int[] headerwidth19 = { 10, 10, 10, 10, 10, 10, 10, 10, 10,
						10, 10, 10, 10, 10, 10, 10, 10, 10, 10 };
				HeaderTable19.setWidths(headerwidth19);
				HeaderTable19.setWidthPercentage(95f);
				HeaderTable19.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);

				PdfPTable HeaderTable77 = new PdfPTable(1);
				int[] headerwidth77 = { 100 };
				HeaderTable77.setWidths(headerwidth77);
				HeaderTable77.setWidthPercentage(95f);
				HeaderTable77.getDefaultCell().setBorder(Rectangle.BOTTOM);

				if (!pcd.isEmpty()) {/* 


					twoPT19.addCell(new Phrase("Chemotherapy ",
							header));
					twoPT19.addCell(new Phrase("",
							subheader));

					twoPT19.addCell(new Phrase("Chemotherapy Protocol : ",
							subheader));
					twoPT19.addCell(new Phrase(""
							+ pcd.get(0).getChemoName(),
							tabletext));
					twoPT19.addCell(new Phrase("Indication : ", subheader));
					twoPT19.addCell(new Phrase(""
							+ pcd.get(0).getChemoIndication(),
							tabletext));
					twoPT19.addCell(new Phrase("Weight(Kg) : ", subheader));
					twoPT19.addCell(new Phrase(""
					+ pcd.get(0).getPatWeight(), tabletext));
					twoPT19.addCell(new Phrase("Height(Mt) : ", subheader));
					twoPT19.addCell(new Phrase(""
							+ pcd.get(0).getPatHeight(), tabletext));
					twoPT19.addCell(new Phrase("BSA : ", subheader));
					twoPT19.addCell(new Phrase(""
							+ pcd.get(0).getPatBsa(), tabletext));
					twoPT19.addCell(new Phrase("Blood Orders : ", subheader));
					twoPT19.addCell(new Phrase(""
							+ pcd.get(0).getPatBlodOrd(),
							tabletext));
					twoPT19.addCell(new Phrase("Allergies : ", subheader));
					twoPT19.addCell(new Phrase(""
							+ pcd.get(0).getPatAllergies(),
							tabletext));
					twoPT19.addCell(new Phrase("History : ", subheader));
					twoPT19.addCell(new Phrase(""
							+ pcd.get(0).getPatHistory(), tabletext));
					twoPT19.addCell(new Phrase("Frequency : ", subheader));
					twoPT19.addCell(new Phrase(""
							+ pcd.get(0).getPatFreq(),
							tabletext));
					twoPT19.addCell(new Phrase("Number of Cycles : ",
							subheader));
					twoPT19.addCell(new Phrase(""
							+ pcd.get(0).getNoOfCycle(),
							tabletext));
					twoPT19.addCell(new Phrase("Dose : ", subheader));
					twoPT19.addCell(new Phrase(""
							+ pcd.get(0).getPatDose(), tabletext));
					twoPT19.addCell(new Phrase("Investigations : ",
							subheader));
					twoPT19.addCell(new Phrase(""
							+ pcd.get(0).getPatInvest(),
							tabletext));
					twoPT19.addCell(new Phrase("Chemo Drug Orders : ", subheader));
					twoPT19.addCell(new Phrase(""
							+ pcd.get(0).getChemoOrders(),
							tabletext));
					twoPT19.addCell(new Phrase("Post-Medications : ",
							subheader));
					twoPT19.addCell(new Phrase(""
							+ pcd.get(0).getPostMed(),
							tabletext));
					twoPT19.addCell(new Phrase("Post Chemo Advise : ",
							subheader));
					twoPT19.addCell(new Phrase(""
							+ pcd.get(0).getChemoAdvice(),
							tabletext));

					document.add(twoPT19);
					twoPT19.flushContent();
					
					HeaderTable77.addCell(new Phrase("", tabletext));
					document.add(HeaderTable77);
					 HeaderTable77.flushContent();

				 */}				
				//Chemo End	
				
				//Start Care Advices
				List<PatientCareAdvicesDto> pcad = new ArrayList<PatientCareAdvicesDto>();	
				
				pcad=pcc.getPatCareAdvices2(treatId);
				
				PdfPTable twoPT22 = new PdfPTable(2);
					int[] widthInst22 = { 25, 75 };
					twoPT22.setWidths(widthInst22);
					twoPT22.setWidthPercentage(95f);
					twoPT22.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
			 	if(!pcad.isEmpty()){/* 
				if (!pcad.get(0).getPallCare().equals("")) {

					twoPT22.addCell(new Phrase("Palliative Care Advice: ", subheader));
										
					twoPT22.addCell(new Phrase("" + ((pcad.get(0).getPallCare())
									), tabletext));
					
					
					twoPT22.addCell(new Phrase("", subheader));
					twoPT22.addCell(new Phrase("", tabletext));

					document.add(twoPT22);
					twoPT22.flushContent(); 
				  
				}
				
				if (!pcad.get(0).getSuppCare().equals("")) {

					twoPT22.addCell(new Phrase("Supportive Care Advice: ", subheader));
										
					twoPT22.addCell(new Phrase("" + ((pcad.get(0).getSuppCare())
									), tabletext));
					
					
					twoPT22.addCell(new Phrase("", subheader));
					twoPT22.addCell(new Phrase("", tabletext));

					document.add(twoPT22);
					twoPT22.flushContent(); 
				}
				
				if (!pcad.get(0).getPrevCare().equals("")) {

					twoPT22.addCell(new Phrase("Preventive Care Advice: ", subheader));
										
					twoPT22.addCell(new Phrase("" + ((pcad.get(0).getPrevCare())
									), tabletext));
					
					twoPT22.addCell(new Phrase("", subheader));
					twoPT22.addCell(new Phrase("", tabletext));

					document.add(twoPT22);
					twoPT22.flushContent(); 
				}
				if (!pcad.get(0).getRehabCare().equals("")) {

					twoPT22.addCell(new Phrase("Rehabilitative Care Advice: ", subheader));
										
					twoPT22.addCell(new Phrase("" 
					+ ((pcad.get(0).getRehabCare())), tabletext));
					twoPT22.addCell(new Phrase("", subheader));
					twoPT22.addCell(new Phrase("", tabletext));

					document.add(twoPT22);
					twoPT22.flushContent(); 
				}
				if (!pcad.get(0).getOtherServ().equals("")) {

					twoPT22.addCell(new Phrase("Other Care Advice: ", subheader));
										
					twoPT22.addCell(new Phrase("" + ((pcad.get(0).getOtherServ())
									), tabletext));
					
					
					twoPT22.addCell(new Phrase("", subheader));
					twoPT22.addCell(new Phrase("", tabletext));

					document.add(twoPT22);
					twoPT22.flushContent(); 
				} 
				 HeaderTable31.addCell(new Phrase("", tabletext));
				 document.add(HeaderTable31);
				 HeaderTable31.flushContent();
			 */} //End Care Advices
				
			NursingStationController nscntrl = (ApplicationContextUtils.getApplicationContext()).getBean(NursingStationController.class);
			PlanTreatDTO planobj = new PlanTreatDTO();			
			planobj=nscntrl.fetchPlanTreatData(patientID,treatmentID);
			
			if(planobj.getPlanlist().size()!=0)
			{/* 	
				PdfPTable HeaderTable62a = new PdfPTable(3);
				int[] headerwidth62b = { 30,30,30 };
				HeaderTable62a.setWidths(headerwidth62b);
				HeaderTable62a.setWidthPercentage(95f);
				HeaderTable62a.getDefaultCell().setBorder(Rectangle.TOP);
				
				HeaderTable62a.addCell(new Phrase("PLAN OF TREATMENT", subheader));
				HeaderTable62a.addCell(new Phrase("", subheader));
				HeaderTable62a.addCell(new Phrase("", subheader));
				
				HeaderTable62a.addCell(new Phrase("", subheader));
				HeaderTable62a.addCell(new Phrase("", subheader));
				HeaderTable62a.addCell(new Phrase("", subheader));
				
				 document.add(HeaderTable62a);
				 HeaderTable62a.flushContent();
			
				PdfPTable HeaderTable61a = new PdfPTable(6);
				int[] headerwidth61b = { 30,10,30,10,30,10 };
				HeaderTable61a.setWidths(headerwidth61b);
				HeaderTable61a.setWidthPercentage(95f);
				HeaderTable61a.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				

				if(planobj.getPlanlist().get(0).getChka().equalsIgnoreCase("1"))
				{
					HeaderTable61a.addCell(new Phrase("SURGERY:", subheader));
					HeaderTable61a.addCell(new Phrase("Yes", tabletext));

				}else{
					HeaderTable61a.addCell(new Phrase("SURGERY:", subheader));
					HeaderTable61a.addCell(new Phrase("NO", tabletext));

					
				}

				if(planobj.getPlanlist().get(0).getChkb().equalsIgnoreCase("1"))
				{
					HeaderTable61a.addCell(new Phrase("CHEMOTHERAPY:", subheader));
					HeaderTable61a.addCell(new Phrase("Yes", tabletext));

				}else{
					HeaderTable61a.addCell(new Phrase("CHEMOTHERAPY:", subheader));
					HeaderTable61a.addCell(new Phrase("NO", tabletext));

					
				}

				if(planobj.getPlanlist().get(0).getChkc().equalsIgnoreCase("1"))
				{
					HeaderTable61a.addCell(new Phrase("RADIOTHERAPY:", subheader));
					HeaderTable61a.addCell(new Phrase("Yes", tabletext));

				}else{
					HeaderTable61a.addCell(new Phrase("RADIOTHERAPY:", subheader));
					HeaderTable61a.addCell(new Phrase("NO", tabletext));

					
				}

				if(planobj.getPlanlist().get(0).getChkd().equalsIgnoreCase("1"))
				{
					HeaderTable61a.addCell(new Phrase("HORMONE THERAPY:", subheader));
					HeaderTable61a.addCell(new Phrase("Yes", tabletext));

				}else{
					HeaderTable61a.addCell(new Phrase("HORMONE THERAPY:", subheader));
					HeaderTable61a.addCell(new Phrase("NO", tabletext));

					
				}

				if(planobj.getPlanlist().get(0).getChke().equalsIgnoreCase("1"))
				{
					HeaderTable61a.addCell(new Phrase("TARGETED THERAPY:", subheader));
					HeaderTable61a.addCell(new Phrase("Yes", tabletext));

				}else{
					HeaderTable61a.addCell(new Phrase("TARGETED THERAPY:", subheader));
					HeaderTable61a.addCell(new Phrase("NO", tabletext));

					
				}

				if(planobj.getPlanlist().get(0).getChkf().equalsIgnoreCase("1"))
				{
					HeaderTable61a.addCell(new Phrase("CONCOMITANT RADIOTHERAPY + CHEMOTHERAPY:", subheader));
					HeaderTable61a.addCell(new Phrase("Yes", tabletext));

				}else{
					HeaderTable61a.addCell(new Phrase("CONCOMITANT RADIOTHERAPY + CHEMOTHERAPY:", subheader));
					HeaderTable61a.addCell(new Phrase("NO", tabletext));

					
				}

				if(planobj.getPlanlist().get(0).getChkg().equalsIgnoreCase("1"))
				{
					HeaderTable61a.addCell(new Phrase("FOLLOW UP:", subheader));
					HeaderTable61a.addCell(new Phrase("Yes", tabletext));

				}else{
					HeaderTable61a.addCell(new Phrase("FOLLOW UP:", subheader));
					HeaderTable61a.addCell(new Phrase("NO", tabletext));

					
				}

				if(planobj.getPlanlist().get(0).getChkh().equalsIgnoreCase("1"))
				{
					HeaderTable61a.addCell(new Phrase("PALLIATIVE CARE:", subheader));
					HeaderTable61a.addCell(new Phrase("Yes", tabletext));

				}else{
					HeaderTable61a.addCell(new Phrase("PALLIATIVE CARE:", subheader));
					HeaderTable61a.addCell(new Phrase("NO", tabletext));

					
				}
				

				if(planobj.getPlanlist().get(0).getChki().equalsIgnoreCase("1"))
				{
					HeaderTable61a.addCell(new Phrase("SUPPORTIVE CARE:", subheader));
					HeaderTable61a.addCell(new Phrase("Yes", tabletext));

				}else{
					HeaderTable61a.addCell(new Phrase("SUPPORTIVE CARE:", subheader));
					HeaderTable61a.addCell(new Phrase("NO", tabletext));

					
				}

				document.add(HeaderTable61a);
				HeaderTable61a.flushContent();
				
			 */}
			
			
			
					String actualpath="";
				
				
			AdminModel admodel = new AdminModel();
				Doctor doc1 = new Doctor();
				List<Doctor> listDoc = null;
				listDoc = admodel.getDoctorsDetails(userid);
			String signature = listDoc.get(0).getDocsign();
				
            Image imgsign = null;
            PdfPCell cellsign = null;
            String actual = FilePath.getUPLOADDOC();
            actualpath = actual + signature;
            if(!signature.equals("-"))
            {
            try {
                //String pathsign = application.getRealPath(actualpath);
                imgsign = Image.getInstance(actualpath);
                imgsign.scaleAbsolute(100, 50);
                cellsign = new PdfPCell();
                cellsign.addElement(new Chunk(imgsign, 5, -5));
                cellsign.setBorder(Rectangle.NO_BORDER);
            } catch (Exception e) {
                e.printStackTrace();
            }
            }
              
				
				
				
			
			//footer start			
			HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			if (imgsign == null) {
				HeaderTable4.addCell(new Phrase("", header));
	            } else {
	            	HeaderTable4.addCell(cellsign);
	            } 

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			
			HeaderTable4.addCell(new Phrase("                       Payee Signature",tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));
			//HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			/* 	HeaderTable4.addCell(new Phrase(
							"                       Payee Signature", tabletext)); */
			HeaderTable4.addCell(new Phrase("Authorized Signatory",
					tabletext));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			document.add(HeaderTable4);
			HeaderTable4.flushContent();
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("" + user_name, subheader));

			document.add(HeaderTable4);
			HeaderTable4.flushContent();

			HeaderTable4.addCell(new Phrase("", tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));

			document.add(HeaderTable4);
			HeaderTable4.flushContent();

			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			}		
			document.close();
			outStream.flush();
			outStream.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	%>
	
</body>
</html>