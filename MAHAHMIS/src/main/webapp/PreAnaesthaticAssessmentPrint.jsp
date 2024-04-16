<%@page import="com.hms.ot.dao.OperationThDao"%>
<%@page import="com.hms.ot.dao.impl.OperationThDaoImpl"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="java.util.Set"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.LinkedHashMap"%>
<%@page import="java.util.Collections"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto"%>
<%@page import="com.hms.dto.Hall"%>
<%@page import="com.hms.model.AdminModel"%>
<%@page import="com.hms.dto.ChartReport"%>
<%@page import="com.hms.ot.dto.Operation"%>
<%@page import="com.hms.dto.ComplaintsDTO"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ot.dao.impl.OperationThDaoImpl"%>
<%@page import="com.itextpdf.text.Chunk"%>
<%@page import="com.itextpdf.text.pdf.Barcode128"%>
<%@page import="com.itextpdf.text.pdf.PdfContentByte"%>
<%@page import="com.itextpdf.text.Phrase"%>
<%@page import="com.itextpdf.text.Image"%>
<%@page import="java.util.List"%>
<%@page import="com.itextpdf.text.Rectangle"%>
<%@page import="com.itextpdf.text.Element"%>
<%@page import="com.itextpdf.text.pdf.PdfPTable"%>
<%@page import="com.itextpdf.text.pdf.PdfPCell"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.itextpdf.text.Font"%>
<%@page import="com.itextpdf.text.pdf.PdfWriter"%>
<%@page import="com.itextpdf.text.PageSize"%>
<%@page import="com.itextpdf.text.Document"%>
<%@page import="com.hms.model.TreatmentModel"%>
<%@page import="com.hms.dto.Treatment"%>
<%@page import="com.hms.model.PatientModel"%>
<%@page import="com.hms.dto.Patient"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>
<%@page import="com.hms.ipdbill.service.IpdBillService"%>
<%@page import="com.hms.model.TreatmentModel"%>
<%@page import="com.hms.ot.dto.PreAnaesthetic"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@page import="java.util.Calendar"%>
<%@page trimDirectiveWhitespaces="true"%>
<%@page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Conduct Anesthesia</title>
</head>
<body>
	<%
		try {
		response.setContentType("application/pdf");
		ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String patientId= resourceBundle.getObject("patientIdLabel").toString();
		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
		String headerValue = request.getParameter("header");
			document.setMargins(20, 20, 40, 40);

		//PdfWriter.getInstance(document, outStream);
		PdfWriter writer = PdfWriter.getInstance(document, outStream);
		document.open();

		//font
		Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font subheader = new Font(Font.FontFamily.HELVETICA, 8,
				Font.BOLD);
		Font subheader1 = new Font(Font.FontFamily.HELVETICA, 8,
				Font.BOLD | Font.UNDERLINE);
		Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader = new Font(Font.FontFamily.HELVETICA, 10,
				Font.BOLD);
		Font tabletext = new Font(Font.FontFamily.HELVETICA, 8,
				Font.NORMAL);
		Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);

		Font header1 = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		Font header2 = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD);
		Font subheader2 = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		Font tabletext2 = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
		Font subheader3 = new Font(Font.FontFamily.HELVETICA, 8,Font.BOLD |Font.UNDERLINE);
		
		// todays date code
			    java.util.Calendar currentDate = java.util.Calendar
				.getInstance();
		
			    String treatment_Id = request.getParameter("trId");
		String patientID = request.getParameter("patID");
		String anaesID = request.getParameter("anaesID");
		int TreatmentID = Integer.parseInt(treatment_Id);
		String tomId = request.getParameter("tomId");
		String cType = request.getParameter("cType");
		
		String[] patientObj = request.getParameterValues("PatientDetails");
			    SimpleDateFormat dateformatter = new SimpleDateFormat(
			"dd/MM/yyyy");
			    String curr_date = dateformatter.format(currentDate.getTime());
		
			
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
        barcode39.setCode(patientID);
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
		int[] headerwidth2 = { 40,40, 10,10};
		HeaderTable2.setWidths(headerwidth2);
		HeaderTable2.setWidthPercentage(95f);
		HeaderTable2.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
		
		HeaderTable2.addCell(new Phrase("", header1));
		HeaderTable2.addCell(new Phrase("Pre-Anaesthatic Assesment", header1));
	         	HeaderTable2.addCell(new Phrase("Date", subheader1));
		HeaderTable2.addCell(new Phrase(curr_date, subheader1));
		
			
		document.add(HeaderTable2);
		HeaderTable2.flushContent();
		
	 			
		//Patient objPat = new Patient();
		//PatientModel objuserModel = new PatientModel();
		//objPat = objuserModel.fetchPatientInfoForDoctorStation(treatment_Id,patientID);
		IpdBillService fetchServlist=(ApplicationContextUtils.getApplicationContext()).getBean(IpdBillService.class);	
		
		BillNobleService fetchSubServlist=(ApplicationContextUtils.getApplicationContext()).getBean(BillNobleService.class);	
		
		List<EhatViewPatientBedDetailsIpdDto> listBedIpdDto2=fetchServlist.getPatientBedBill(Integer.parseInt(treatment_Id) ,3);
		
		///patient details
						//Start table for 
			//fetch patient record
			String spLeafName  ="";
		             String docName="";
			String refDocName  ="";
			 RegistrationController uss=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
			RegTreBillDto rtd = new RegTreBillDto();			
			List<RegTreBillDto> ltPatientRecord = null;
			String PType = "";
			String addressPatient = "";
			
			String weight = "";
			String height = "";
			if(uss != null)
			{
				rtd=uss.fetchPatientsRecordByTreatmentId(Integer.parseInt(treatment_Id));
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
				 //sponser
				LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
				AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
				List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
				
				//end
				RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
				List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
				ltRegMasterDto =us.fetchPatientsRecordByTreatmentId(Integer.parseInt(treatment_Id));
				
				 int sponsorSlave=ltRegMasterDto.get(0).getChargesMasterSlaveId();
					
				 if(sponsorSlave > 0){
						fetchsposor   = obj.fetchSuperCatofchargesSlave(sponsorSlave);
						BillCategoryName = fetchsposor.get(0).getCategoryName()+" Sponsor";
						spLeafName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id");
						//BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id"); 
					}else{
						BillCategoryName = "Self";
					}
				
				
				 weight  	=ltRegMasterDto.get(0).getWeight();
				 height  	=ltRegMasterDto.get(0).getHeight();
			
				/* String docId=ltRegMasterDto.get(0).getDoctorId();
				System.out.println("docId....."+docId);
				
				
				if(!docId.equals("") && !docId.contains(",")){
					
					int doctorId = Integer.parseInt(docId);
					if(doctorId > 0){
						docName   = fetchlist.getStringValOfObject("doctor","doc_name",doctorId,"Doctor_ID");
					}
				}else{
					docName   = "";
				}
	 */					
		 
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
			/* 	if(refDocId > 0 ){
					refDocName   = fetchlist.getStringValOfObject("doctor","doc_name",refDocId,"Doctor_ID");
				} */
				else{
					refDocName   = "";
				}
				
				
				int a=rtd.getSourceTypeId();
				if(a>0){
					PType="Sponsor";
			 			}else{
			 				PType="Self";					
				}	
			}
			
		
		//end
		
		//Ref By Name
		/* Treatment treat = new Treatment();
		treat.setTreatment_ID(Integer.parseInt(treatment_Id));
		treat.setPatient_ID(Integer.parseInt(patientID));
		TreatmentModel objTreatmentModel = new TreatmentModel();
		String RefDoc = objTreatmentModel.fetchRefDoc(treat); */
		//End Ref By Name

		
		String ageString="";
			
		PdfPTable patientDemoDetailName = new PdfPTable(6);
		int[] patientDemoDetailNameWidth = { 13, 22, 16, 20, 13, 20 };
		patientDemoDetailName.setWidths(patientDemoDetailNameWidth);
		patientDemoDetailName.setWidthPercentage(95f);
		patientDemoDetailName.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						
		 patientDemoDetailName.addCell(new Phrase("", subheader));
		patientDemoDetailName.addCell(new Phrase("", subheader));
		patientDemoDetailName.addCell(new Phrase("", subheader));
		patientDemoDetailName.addCell(new Phrase("", subheader));
		patientDemoDetailName.addCell(new Phrase("", subheader));
		patientDemoDetailName.addCell(new Phrase("", subheader));
		patientDemoDetailName.addCell(new Phrase("Patient Name: ",subheader));
			 	patientDemoDetailName.addCell(new Phrase(rtd.getPatientName(), tabletext));
	             
		patientDemoDetailName.addCell(new Phrase(
				"UHID / IPD No.:", subheader));
		patientDemoDetailName.addCell(new Phrase(rtd.getCenterPatientId()+ " / "
				+ (rtd.getTrcount()),
				tabletext));
		patientDemoDetailName.addCell(new Phrase(
				"Admission Date: ", subheader));
			    patientDemoDetailName.addCell(new Phrase("" + rtd.getCreatedDateTime(), tabletext));
			    patientDemoDetailName.addCell(new Phrase("Age/Gender/Wt:", subheader));
			    patientDemoDetailName.addCell(new Phrase(""+(rtd.getAge()) + "/"+ (rtd.getGender()) + "/"+ (weight+ " Kg"), tabletext));	
		patientDemoDetailName.addCell(new Phrase("Address :", subheader));
		patientDemoDetailName.addCell(new Phrase("" + addressPatient, tabletext));
		patientDemoDetailName.addCell(new Phrase("Height:",
				subheader)); 
		patientDemoDetailName.addCell(new Phrase((""+height),
				tabletext));
		patientDemoDetailName.addCell(new Phrase("Bill Category :",
				subheader));
		patientDemoDetailName.addCell(new Phrase(PType,
				tabletext));

		/* AdminModel admodel1 = new AdminModel();
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
				Doc_Nme = Doc_Nme + listDoc2.get(0).getDoc_name()+",";
				 Depart = Depart + listDoc2.get(0).getDepartmentName()+",";
						
			}
			  patientDemoDetailName.addCell(new Phrase("Consultant Doc:",
						subheader));
				patientDemoDetailName.addCell(new Phrase(Doc_Nme,
						tabletext));
			
		}
		else{
			if(!rtd.getDoctorId().equalsIgnoreCase("")){
		int docId =  Integer.parseInt(rtd.getDoctorId());
		
		listDoc2 = admodel1.getDoctorsDepDetails(docId);
			     patientDemoDetailName.addCell(new Phrase("Consultant Doc:",
					subheader));
			patientDemoDetailName.addCell(new Phrase(listDoc2.get(0).getDoc_name(),
					tabletext));
			}else{
			     patientDemoDetailName.addCell(new Phrase("Consultant Doc:",
							subheader));
					patientDemoDetailName.addCell(new Phrase(": -",
							tabletext));
				
			}
		
		}
		 */
		//For Get Hall Name
		RegService regSer=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
		List<ChargesMasterSlave> hallName = new ArrayList<ChargesMasterSlave>();
		hallName = regSer.fetchPatientsBedRecords1(Integer.parseInt(treatment_Id));
		System.out.println("Hall NAME:  "+hallName);
		
		int bedid=0;
		if(listBedIpdDto2.get(0).getSubServiceId()==null){
			 bedid=0;
		}else{
			bedid=listBedIpdDto2.get(0).getSubServiceId();	
		}
		
		patientDemoDetailName.addCell(new Phrase("Ward Name:", subheader));
		patientDemoDetailName.addCell(new Phrase("(" + hallName.get(0).getCategoryName() + ")", tabletext));

		patientDemoDetailName.addCell(new Phrase("Bed no:", subheader));
		patientDemoDetailName.addCell(new Phrase("" + bedid, tabletext));
		patientDemoDetailName.addCell(new Phrase("mobile no :", subheader));
		patientDemoDetailName.addCell(new Phrase("" + rtd.getMobile(), tabletext));
		patientDemoDetailName.addCell(new Phrase("TreatmentId:", subheader));
		patientDemoDetailName.addCell(new Phrase(treatment_Id, tabletext));

		patientDemoDetailName.addCell(new Phrase("Corporate :", subheader));
		patientDemoDetailName.addCell(new Phrase("" + spLeafName, tabletext));

		patientDemoDetailName.addCell(new Phrase("Ref. By :", subheader));
		patientDemoDetailName.addCell(new Phrase("" + rtd.getRefDoctorName(), tabletext));

		patientDemoDetailName.addCell(new Phrase("", subheader));
		patientDemoDetailName.addCell(new Phrase("", subheader));
		patientDemoDetailName.addCell(new Phrase("", subheader));
		patientDemoDetailName.addCell(new Phrase("", subheader));

		patientDemoDetailName.addCell(new Phrase("", subheader));
		patientDemoDetailName.addCell(new Phrase("", subheader));
		patientDemoDetailName.addCell(new Phrase("", subheader));
		patientDemoDetailName.addCell(new Phrase("", subheader));
		patientDemoDetailName.addCell(new Phrase("", subheader));
		patientDemoDetailName.addCell(new Phrase("", subheader));

		document.add(patientDemoDetailName);
		patientDemoDetailName.flushContent();

		HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		document.add(HeaderTable1);
		HeaderTable1.flushContent();

		PdfPTable HeaderTable3 = new PdfPTable(2);
		int[] headerwidth3 = { 45, 100 };
		HeaderTable3.setWidths(headerwidth3);
		HeaderTable3.setWidthPercentage(95f);
		HeaderTable3.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		PdfPTable HeaderTable4 = new PdfPTable(1);
		int[] headerwidth4 = { 100 };
		HeaderTable4.setWidths(headerwidth4);
		HeaderTable4.setWidthPercentage(95f);
		HeaderTable4.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		PdfPTable HeaderTable5 = new PdfPTable(10);
		int[] headerwidth5 = { 15, 10, 12, 10, 10, 10, 10, 10, 15, 10 };
		HeaderTable5.setWidths(headerwidth5);
		HeaderTable5.setWidthPercentage(95f);
		HeaderTable5.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		//	OperationThDaoImpl operationModel = new OperationThDaoImpl();
		OperationThDao operationModel = (ApplicationContextUtils.getApplicationContext())
				.getBean(OperationThDao.class);
		List<PreAnaesthetic> objPreAnesAss = operationModel.fetchPreAnaestheticReport(treatment_Id, anaesID);
		//ChartReport chartReportVitals =operationModel.defaultOTVitalsView(cType,tomId, treatment_Id, curr_date);
		ChartReport chartReportVitals =operationModel.defaultOTVitalsView2(cType,tomId, treatment_Id, curr_date);
		if (objPreAnesAss.size() > 0) {
			HeaderTable4.addCell(new Phrase("MEDICAL HISTORY", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			document.add(HeaderTable4);
			HeaderTable4.flushContent();

			String[] SplitedPreAnaeAssRadio = new String[55];

			if (!objPreAnesAss.get(0).getRadio_anaesthetic_status().equals("NULL")
					&& !objPreAnesAss.get(0).getRadio_anaesthetic_status().equals("undefined")
					&& !objPreAnesAss.get(0).getRadio_anaesthetic_status().equals("")) {
				String AnesthesiaData = objPreAnesAss.get(0).getRadio_anaesthetic_status();
				SplitedPreAnaeAssRadio = AnesthesiaData.split(",");

				for (int i = 0; i < SplitedPreAnaeAssRadio.length; i++) {

					String SplitedData = SplitedPreAnaeAssRadio[i];
				}
			}

			if (objPreAnesAss.get(0).getCoughQty() != 0) {
				HeaderTable3.addCell(new Phrase("COUGH : ", subheader));
				HeaderTable3.addCell(new Phrase(
						"Yes, " + objPreAnesAss.get(0).getCoughQty() + " " + objPreAnesAss.get(0).getCoughTime(),
						tabletext));
				document.add(HeaderTable3);
				HeaderTable3.flushContent();
			}

			if (!SplitedPreAnaeAssRadio[3].equals("0") || !SplitedPreAnaeAssRadio[4].equals("0")) {
				HeaderTable3.addCell(new Phrase("", header1));
				String RegionalDataRadio1 = "";
				String RegionalDataRadio2 = "";

				if (!SplitedPreAnaeAssRadio[3].equals("0")) {
					RegionalDataRadio1 = "Dry ";
					HeaderTable3.addCell(new Phrase(RegionalDataRadio1, tabletext2));
				}
				if (!SplitedPreAnaeAssRadio[4].equals("0")) {
					RegionalDataRadio2 = "Expert ";
					HeaderTable3.addCell(new Phrase(RegionalDataRadio2, tabletext2));
				}

				document.add(HeaderTable3);
				HeaderTable3.flushContent();
			}

			if (objPreAnesAss.get(0).getDyspnoeaQty() != 0) {
				HeaderTable3.addCell(new Phrase("DYSPNOEA : ", subheader));
				HeaderTable3.addCell(new Phrase("Yes, " + objPreAnesAss.get(0).getDyspnoeaQty() + " "
						+ objPreAnesAss.get(0).getDyspnoeaTime(), tabletext));
			}
			if (objPreAnesAss.get(0).getGiddinessQty() != 0) {
				HeaderTable3.addCell(new Phrase("GIDDINESS : ", subheader));
				HeaderTable3.addCell(new Phrase("Yes, " + objPreAnesAss.get(0).getGiddinessQty() + " "
						+ objPreAnesAss.get(0).getGiddinessTime(), tabletext));
			}
			if (objPreAnesAss.get(0).getChestPainQty() != 0) {
				HeaderTable3.addCell(new Phrase("CHEST PAIN : ", subheader));
				HeaderTable3.addCell(new Phrase("Yes, " + objPreAnesAss.get(0).getChestPainQty() + " "
						+ objPreAnesAss.get(0).getChestPainTime(), tabletext));
			}
			document.add(HeaderTable3);
			HeaderTable3.flushContent();

			String[] SplitedPreAnaeAss = new String[15];

			if (!objPreAnesAss.get(0).getChk_anaesthetic_status().equals("NULL")
					&& !objPreAnesAss.get(0).getChk_anaesthetic_status().equals("undefined")
					&& !objPreAnesAss.get(0).getChk_anaesthetic_status().equals("")) {
				String AnesthesiaData = objPreAnesAss.get(0).getChk_anaesthetic_status();
				SplitedPreAnaeAss = AnesthesiaData.split(",");

				for (int i = 0; i < SplitedPreAnaeAss.length; i++) {

					String SplitedData = SplitedPreAnaeAss[i];
				}

			}

			if(!SplitedPreAnaeAss[7].equals("0")||
                    !SplitedPreAnaeAss[8].equals("0")||
                    !SplitedPreAnaeAss[9].equals("0"))
                {
             HeaderTable3.addCell(new Phrase("COMPLAINTS : ", header1));
                    String RegionalData1 ="";
                    String RegionalData2 ="";
                    String RegionalData3 ="";
                    
                    if(!SplitedPreAnaeAss[8].equals("0"))
                        {
                            RegionalData1 = "SMOKING ";
                        }
                    if(!SplitedPreAnaeAss[9].equals("0"))
                    {
                        RegionalData2 = "ALCOHOL ";
                    }
                    if(!SplitedPreAnaeAss[10].equals("0"))
                    {
                        RegionalData3 = "TOBACCO ";
                    }
                    
                    HeaderTable3.addCell(new Phrase(RegionalData1+" "+RegionalData2+" "+RegionalData3, tabletext2));
                    document.add(HeaderTable3);
                    HeaderTable3.flushContent();
                }
			/* if (!objPreAnesAss.get(0).getOther().equals("") || !objPreAnesAss.get(0).getOther().equals("Null")) {
				HeaderTable3.addCell(new Phrase("OTHER : ", header1));
				HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getOther(), tabletext));
				document.add(HeaderTable3);
				HeaderTable3.flushContent();
			}

			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", subheader));
			document.add(HeaderTable3);
			HeaderTable3.flushContent(); */
			
			if(!objPreAnesAss.get(0).getOther().equals("") || !objPreAnesAss.get(0).getOther().equals("Null")){
                HeaderTable3.addCell(new Phrase("OTHER : ", header1));
                HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getOther(), tabletext)); 
                document.add(HeaderTable3);
                HeaderTable3.flushContent();
                }
                if(!SplitedPreAnaeAss[14].equals("0") || !SplitedPreAnaeAss[1].equals("0") || !SplitedPreAnaeAss[2].equals("0") || !SplitedPreAnaeAss[3].equals("0")||
                           !SplitedPreAnaeAss[4].equals("0") || !SplitedPreAnaeAss[5].equals("0") || !SplitedPreAnaeAss[6].equals("0") || !SplitedPreAnaeAss[7].equals("0") 
                           || !SplitedPreAnaeAss[10].equals("0") || !SplitedPreAnaeAss[11].equals("0") || !SplitedPreAnaeAss[12].equals("0") || !SplitedPreAnaeAss[13].equals("0"))
                               {
                            HeaderTable3.addCell(new Phrase("CHECKBOXES : ", header1));
                                   String RegionalData1 ="";
                                   String RegionalData2 ="";
                                   String RegionalData3 ="";
                                   String RegionalData4 ="";
                                   String RegionalData5 ="";
                                   String RegionalData6 ="";
                                   String RegionalData7 ="";
                                   String RegionalData8 ="";
                                   String RegionalData9 ="";
                                   String RegionalData10 ="";
                                   String RegionalData11="";
                                   
                                   if(!SplitedPreAnaeAss[1].equals("0"))
                                       {
                                           RegionalData1 = "H/O:HYPERTENSION, ";
                                       }
                                   if(!SplitedPreAnaeAss[2].equals("0"))
                                   {
                                       RegionalData2 = "IHD COAGULATION DEFECT, ";
                                   }
                                   if(!SplitedPreAnaeAss[3].equals("0"))
                                   {
                                       RegionalData3 = "JAUNDICE, ";
                                   }
                                   if(!SplitedPreAnaeAss[4].equals("0"))
                                   {
                                       RegionalData4 = "DIABETES, ";
                                   }
                                   if(!SplitedPreAnaeAss[5].equals("0"))
                                   {
                                       RegionalData5 = "HOSPITALISATION,  ";
                                   }
                                   if(!SplitedPreAnaeAss[6].equals("0"))
                                   {
                                       RegionalData6 = "BLOOD TRANSFUSION,  ";
                                   }
                                   if(!SplitedPreAnaeAss[7].equals("0"))
                                   {
                                       RegionalData7 = "ALLERGY, ";
                                   }
                                   
                                   HeaderTable3.addCell(new Phrase(RegionalData1+RegionalData2+RegionalData3+RegionalData4+RegionalData5+RegionalData6+RegionalData7+RegionalData8+RegionalData9+RegionalData10+RegionalData11, tabletext2));
                                   document.add(HeaderTable3);
                                   HeaderTable3.flushContent();
                               }
                
                HeaderTable3.addCell(new Phrase("", subheader));
                HeaderTable3.addCell(new Phrase("", subheader));
                HeaderTable3.addCell(new Phrase("", subheader));
                HeaderTable3.addCell(new Phrase("", subheader));
                document.add(HeaderTable3);
                HeaderTable3.flushContent();
                

			HeaderTable4.addCell(new Phrase("PRESENT MEDICATIONS", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			document.add(HeaderTable4);
			HeaderTable4.flushContent();

			if(!SplitedPreAnaeAss[11].equals("0")||
                    !SplitedPreAnaeAss[12].equals("0")||!SplitedPreAnaeAss[14].equals("0")||
                    !SplitedPreAnaeAss[13].equals("0"))
                {
             HeaderTable3.addCell(new Phrase("CHECKBOX : ", header1));
                    String RegionalData11 ="";
                    String RegionalData12 ="";
                    String RegionalData13 ="";
                    String RegionalData14 ="";
                    
                    if(!SplitedPreAnaeAss[11].equals("0"))
                        {
                            RegionalData11 = "Dilanatin Phenobarb ";
                        }
                    if(!SplitedPreAnaeAss[12].equals("0"))
                    {
                        RegionalData12 = "Steroids Anti hypertensive ";
                    }
                    if(!SplitedPreAnaeAss[13].equals("0"))
                    {
                        RegionalData13 = " Anti coagulants ";
                    }
                    if(!SplitedPreAnaeAss[14].equals("0"))
                    {
                        RegionalData14 = " Anti Arrythmics ";
                    }
                    
                    HeaderTable3.addCell(new Phrase(RegionalData11+" "+RegionalData12+" "+RegionalData13+" "+RegionalData14, tabletext2));
                    document.add(HeaderTable3);
                    HeaderTable3.flushContent();
                }
         
         if(!objPreAnesAss.get(0).getTxtPresMedOther().equals("") || !objPreAnesAss.get(0).getTxtPresMedOther().equals("Null")){
         HeaderTable3.addCell(new Phrase("OTHER : ", subheader));
         HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getTxtPresMedOther(), tabletext));
         document.add(HeaderTable3);
         HeaderTable3.flushContent();
         }
         if(!objPreAnesAss.get(0).getprevanaes_exp().equals("") || !objPreAnesAss.get(0).getprevanaes_exp().equals("Null")){
         HeaderTable3.addCell(new Phrase("PREVIOUS ANAESTHETIC EXPERIENCE : ", subheader));
         HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getprevanaes_exp(), tabletext));
         
             }
         
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", subheader));
			document.add(HeaderTable3);
			HeaderTable3.flushContent();

			HeaderTable4.addCell(new Phrase("EXAMINATION FINDINGS MEDICATIONS", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			document.add(HeaderTable4);
			HeaderTable4.flushContent();

			if (!objPreAnesAss.get(0).getPallor().equals("")) {
				HeaderTable3.addCell(new Phrase("PALLOR : ", subheader));
				HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getPallor(), tabletext));
			}
			if (!objPreAnesAss.get(0).getIcterus().equals("")) {
				HeaderTable3.addCell(new Phrase("ICTERUS : ", subheader));
				HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getIcterus(), tabletext));
			}
			if (!objPreAnesAss.get(0).getCyanosis().equals("")) {
				HeaderTable3.addCell(new Phrase("CYANOSIS : ", subheader));
				HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getCyanosis(), tabletext));
			}
			if (!objPreAnesAss.get(0).getClub().equals("")) {
				HeaderTable3.addCell(new Phrase("CLUBBING : ", subheader));
				HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getClub(), tabletext));
			}
			if (!objPreAnesAss.get(0).getOedema().equals("")) {
				HeaderTable3.addCell(new Phrase("OEDEMA : ", subheader));
				HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getOedema(), tabletext));
			}
			if (!objPreAnesAss.get(0).getVein().equals("")) {
				HeaderTable3.addCell(new Phrase("VEINS : ", subheader));
				HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getVein(), tabletext));
			}
			if (!objPreAnesAss.get(0).getObesity().equals("")) {
				HeaderTable3.addCell(new Phrase("OBESITY : ", subheader));
				HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getObesity(), tabletext));
			}
			if (!objPreAnesAss.get(0).getNeckobj().equals("")) {
				HeaderTable3.addCell(new Phrase("NECK : ", subheader));
				HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getNeckobj(), tabletext));
			}
			if (!objPreAnesAss.get(0).getJawobj().equals("")) {
				HeaderTable3.addCell(new Phrase("JAW : ", subheader));
				HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getJawobj(), tabletext));
			}
			if (!objPreAnesAss.get(0).getTeethobj().equals("")) {
				HeaderTable3.addCell(new Phrase("TEETH	 : ", subheader));
				HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getTeethobj(), tabletext));
			}
			if (!objPreAnesAss.get(0).getSpineobj().equals("")) {
				HeaderTable3.addCell(new Phrase("SPINE : ", subheader));
				HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getSpineobj(), tabletext));
			}
			if (!objPreAnesAss.get(0).getBHTobj().equals("")) {
				HeaderTable3.addCell(new Phrase("BHT(SEC) : ", subheader));
				HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getBHTobj(), tabletext));
			}
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", subheader));
			document.add(HeaderTable3);
			HeaderTable3.flushContent();

			HeaderTable4.addCell(new Phrase("INVESTIGATIONS", subheader));
            HeaderTable4.addCell(new Phrase("", subheader));
            HeaderTable4.addCell(new Phrase("", subheader));
            HeaderTable4.addCell(new Phrase("", subheader));
            document.add(HeaderTable4);
            HeaderTable4.flushContent();
            
            HeaderTable5.addCell(new Phrase("Blood Group :", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getBloodgroup(), tabletext));
            HeaderTable5.addCell(new Phrase("Hb(gms%) : ", subheader));
         //   HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getHBobj(), tabletext));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getHb(), tabletext));
            HeaderTable5.addCell(new Phrase("Platelets : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getPlateletobj(), tabletext));
            HeaderTable5.addCell(new Phrase("HIV : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getHIVobj(), tabletext));
            HeaderTable5.addCell(new Phrase("TC : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getTCobj(), tabletext));
            
            HeaderTable5.addCell(new Phrase("P :", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getPobj(), tabletext));
            HeaderTable5.addCell(new Phrase("L : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getLobj(), tabletext));
            HeaderTable5.addCell(new Phrase("E : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getEobj(), tabletext));
            HeaderTable5.addCell(new Phrase("M : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getMobj(), tabletext));
            HeaderTable5.addCell(new Phrase("B : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getBoneobj(), tabletext));
            
            HeaderTable5.addCell(new Phrase("Smear :", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getSmearobj(), tabletext));
            HeaderTable5.addCell(new Phrase("ESR(mm) : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getESRobj(), tabletext));
            HeaderTable5.addCell(new Phrase("Urine : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getUrineobj(), tabletext));
            HeaderTable5.addCell(new Phrase("BUN : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getBUNobj(), tabletext));
            HeaderTable5.addCell(new Phrase("BSL(R)(mg%) : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getBSLobj(), tabletext));
            
            HeaderTable5.addCell(new Phrase("F(mg%) : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getFobj(), tabletext));
            HeaderTable5.addCell(new Phrase("PP(mg%) : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getPPobj(), tabletext));
            HeaderTable5.addCell(new Phrase("K+(mg%) : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getkElectolytes(), tabletext));
            HeaderTable5.addCell(new Phrase("Cl+(mg%) : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getclElectolytes(), tabletext));
            HeaderTable5.addCell(new Phrase("S.Electrolytes Na+ : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getnaElectolytes(), tabletext));
            
            HeaderTable5.addCell(new Phrase("B : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getBonetwoobj(), tabletext));
            HeaderTable5.addCell(new Phrase("CT : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getCTobj(), tabletext));
            HeaderTable5.addCell(new Phrase("PT : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getPTobj(), tabletext));
            HeaderTable5.addCell(new Phrase(" S.Creat : ", subheader));
            HeaderTable5.addCell(new Phrase(objPreAnesAss.get(0).getScreatobj(), tabletext));
            HeaderTable5.addCell(new Phrase("", subheader));
            HeaderTable5.addCell(new Phrase("", tabletext));
            
            HeaderTable5.addCell(new Phrase("", subheader));
            HeaderTable5.addCell(new Phrase("", tabletext));
            HeaderTable5.addCell(new Phrase("", subheader));
            HeaderTable5.addCell(new Phrase("", tabletext));
            HeaderTable5.addCell(new Phrase("", subheader));
            HeaderTable5.addCell(new Phrase("", subheader));
            HeaderTable5.addCell(new Phrase("", tabletext));
            HeaderTable5.addCell(new Phrase("", subheader));
            HeaderTable5.addCell(new Phrase("", tabletext));
            HeaderTable5.addCell(new Phrase("", subheader));
            
            HeaderTable5.addCell(new Phrase("", subheader));
            HeaderTable5.addCell(new Phrase("", tabletext));
            HeaderTable5.addCell(new Phrase("", subheader));
            HeaderTable5.addCell(new Phrase("", tabletext));
            HeaderTable5.addCell(new Phrase("", subheader));
            HeaderTable5.addCell(new Phrase("", subheader));
            HeaderTable5.addCell(new Phrase("", tabletext));
            HeaderTable5.addCell(new Phrase("", subheader));
            HeaderTable5.addCell(new Phrase("", tabletext));
            HeaderTable5.addCell(new Phrase("", subheader));
            
            document.add(HeaderTable5);
            HeaderTable5.flushContent();
           
            if(!objPreAnesAss.get(0).getECGobj().equals("")){
                HeaderTable3.addCell(new Phrase("ECG : ", subheader));
                HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getECGobj(), tabletext));
                }
            if(!objPreAnesAss.get(0).getXray_chest().equals("")){
                HeaderTable3.addCell(new Phrase("X RAY CHEST : ", subheader));
                HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getXray_chest(), tabletext));
                }
            if(!objPreAnesAss.get(0).getXray_chest().equals("")){
                HeaderTable3.addCell(new Phrase("OTHER : ", subheader));
             // HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getOtherpresentMedication(), tabletext));
                HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getOther(), tabletext));
                }
            HeaderTable3.addCell(new Phrase("", subheader));
            HeaderTable3.addCell(new Phrase("", subheader));
            HeaderTable3.addCell(new Phrase("", subheader));
            HeaderTable3.addCell(new Phrase("", subheader));
            document.add(HeaderTable3);
            HeaderTable3.flushContent();
            
            HeaderTable4.addCell(new Phrase("PLAN OF ANAESTHIA", subheader));
            HeaderTable4.addCell(new Phrase("", subheader));
            HeaderTable4.addCell(new Phrase("", subheader));
            HeaderTable4.addCell(new Phrase("", subheader));
            document.add(HeaderTable4);
            HeaderTable4.flushContent();

			if (!objPreAnesAss.get(0).getRisk_assess().equals("")) {
				HeaderTable3.addCell(new Phrase("RISK ASSESSMENT:ASA : ", subheader));
				HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getRisk_assess(), tabletext));
			}
			if (!objPreAnesAss.get(0).getProposed_plan().equals("")) {
				HeaderTable3.addCell(new Phrase(" PROPOSED PLAN OF ANAESTHESIA : ", subheader));
				HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getProposed_plan(), tabletext));
			}
			if (!objPreAnesAss.get(0).getRisk_assess().equals("")) {
				HeaderTable3.addCell(new Phrase("PRE-OPERATIVE INSTRUCTION : ", subheader));
				HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getPre_operativeinstuct(), tabletext));
			}
			if (!objPreAnesAss.get(0).getPre_medication().equals("")) {
				HeaderTable3.addCell(new Phrase("PRE MEDICATION : ", subheader));
				HeaderTable3.addCell(new Phrase(objPreAnesAss.get(0).getPre_medication(), tabletext));
			}

			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", subheader));
			document.add(HeaderTable3);
			HeaderTable3.flushContent();

			/* if (!SplitedPreAnaeAss[0].equals("0") || !SplitedPreAnaeAss[1].equals("0")
					|| !SplitedPreAnaeAss[2].equals("0") || !SplitedPreAnaeAss[3].equals("0")
					|| !SplitedPreAnaeAss[4].equals("0") || !SplitedPreAnaeAss[5].equals("0")
					|| !SplitedPreAnaeAss[6].equals("0") || !SplitedPreAnaeAss[7].equals("0")
					|| !SplitedPreAnaeAss[10].equals("0") || !SplitedPreAnaeAss[11].equals("0")
					|| !SplitedPreAnaeAss[12].equals("0") || !SplitedPreAnaeAss[13].equals("0")) {
				HeaderTable3.addCell(new Phrase("CHECKBOXES : ", header1));
				String RegionalData1 = "";
				String RegionalData2 = "";
				String RegionalData3 = "";
				String RegionalData4 = "";
				String RegionalData5 = "";
				String RegionalData6 = "";
				String RegionalData7 = "";
				String RegionalData8 = "";
				String RegionalData9 = "";
				String RegionalData10 = "";
				String RegionalData11 = "";

				if (!SplitedPreAnaeAss[0].equals("0")) {
					RegionalData1 = "H/O:HYPERTENSION, ";
				}
				if (!SplitedPreAnaeAss[1].equals("0")) {
					RegionalData2 = "IHD COAGULATION DEFECT, ";
				}
				if (!SplitedPreAnaeAss[2].equals("0")) {
					RegionalData3 = "JAUNDICE, ";
				}
				if (!SplitedPreAnaeAss[3].equals("0")) {
					RegionalData4 = "DIABETES, ";
				}
				if (!SplitedPreAnaeAss[4].equals("0")) {
					RegionalData5 = "HOSPITALISATION,  ";
				}
				if (!SplitedPreAnaeAss[5].equals("0")) {
					RegionalData6 = "BLOOD TRANSFUSION,  ";
				}
				if (!SplitedPreAnaeAss[6].equals("0")) {
					RegionalData7 = "ALLERGY, ";
				}
				if (!SplitedPreAnaeAss[10].equals("0")) {
					RegionalData8 = "DILANATIN PHENOBARB, ";
				}
				if (!SplitedPreAnaeAss[11].equals("0")) {
					RegionalData9 = "STEROIDS ANTI HYPERTENSIVE, ";
				}
				if (!SplitedPreAnaeAss[12].equals("0")) {
					RegionalData10 = "ANTI COAGULANTS, ";
				}
				if (!SplitedPreAnaeAss[13].equals("0")) {
					RegionalData11 = "ANTI ARRYTHMICS ";
				}
				HeaderTable3.addCell(new Phrase(RegionalData1 + RegionalData2 + RegionalData3 + RegionalData4
						+ RegionalData5 + RegionalData6 + RegionalData7 + RegionalData8 + RegionalData9
						+ RegionalData10 + RegionalData11, tabletext2));
				document.add(HeaderTable3);
				HeaderTable3.flushContent();
			} */
		}
		
		if(chartReportVitals != null )
		{
			 HeaderTable3.addCell(new Phrase("", subheader));
			 HeaderTable3.addCell(new Phrase("", subheader));
			 HeaderTable3.addCell(new Phrase("", subheader));
			 HeaderTable3.addCell(new Phrase("", subheader));
			 document.add(HeaderTable3);
			 HeaderTable3.flushContent();
			 HeaderTable3.addCell(new Phrase("Vitals :", header));
			 HeaderTable3.addCell(new Phrase("", subheader));
			 HeaderTable3.addCell(new Phrase("", subheader));
			 HeaderTable3.addCell(new Phrase("", subheader));
			 document.add(HeaderTable3);
			 HeaderTable3.flushContent();
			
			List<Operation> otname=chartReportVitals.getListOtSlaveList();
			List<ComplaintsDTO> pobj1 = new ArrayList<ComplaintsDTO>();
			pobj1 =chartReportVitals.getListChartSlave(); 
			
			
			
			String temp=otname.get(0).getStatus();
			String bp=otname.get(1).getStatus();
			String pr=otname.get(2).getStatus();
			String ar=otname.get(3).getStatus();
			String os=otname.get(4).getStatus();
			//String bsl=otname.get(5).getStatus();
			
			
			PdfPTable HeaderTable55 = new PdfPTable(6);
			int[] headerwidth55 = { 3,10,10,10,10,10};
			HeaderTable55.setWidths(headerwidth55);
			HeaderTable55.setWidthPercentage(95f);
			HeaderTable55.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable55.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable55.getDefaultCell().setBorder(Rectangle.BOX);
			
			 HeaderTable55.addCell(new Phrase("Sr.No", subheader));
			HeaderTable55.addCell(new Phrase("Vital", subheader));
			 HeaderTable55.addCell(new Phrase("Time", subheader));
			 HeaderTable55.addCell(new Phrase("Date", subheader));
			 HeaderTable55.addCell(new Phrase("Save From", subheader));
			 HeaderTable55.addCell(new Phrase("Values", subheader));
			 //HeaderTable55.addCell(new Phrase("Time", subheader));
			 
			 
			 //for (Operation operation : otname) {
			//	    HeaderTable55.addCell(new Phrase(""+operation.getStatus(), subheader));
			//	} 
			
			for(int i=0;i<pobj1.size();i++){
				
				 HeaderTable55.addCell(new Phrase(" "+(i+1), tabletext));
				 HeaderTable55.addCell(new Phrase(" "+pobj1.get(i).getLoginUserName(), tabletext));
				 HeaderTable55.addCell(new Phrase(" "+pobj1.get(i).getTime(), tabletext));
				 HeaderTable55.addCell(new Phrase(" "+pobj1.get(i).getDate(), tabletext)); 
			     HeaderTable55.addCell(new Phrase(" "+pobj1.get(i).getCommentType() , tabletext));
				 
			    //for (Operation operation : otname) { 
			     HeaderTable55.addCell(new Phrase(" "+pobj1.get(i).getStatus(), tabletext));
			    // }
				 /* HeaderTable55.addCell(new Phrase(" "+bloodpre, tabletext));
				 HeaderTable55.addCell(new Phrase(" "+plusrate, tabletext));
				 HeaderTable55.addCell(new Phrase(" "+resprate, tabletext));
				 HeaderTable55.addCell(new Phrase(" "+oxygen, tabletext));
				 HeaderTable55.addCell(new Phrase(" "+bsl1, tabletext)); */
				
			}
			/* HeaderTable55.addCell(new Phrase(""+temp, subheader));
			 HeaderTable55.addCell(new Phrase(""+bp, subheader));
			 HeaderTable55.addCell(new Phrase(""+pr, subheader));
			 HeaderTable55.addCell(new Phrase(""+ar, subheader));
			 HeaderTable55.addCell(new Phrase(""+os, subheader));
			 HeaderTable55.addCell(new Phrase(""+os, subheader));*/
			 document.add(HeaderTable55); 
				HeaderTable55.flushContent();
			
			 
				
			 
			 
			 
			 /*
		//  if(countSize == otSlaveList.size()){
			  
			  if( !temp1.equalsIgnoreCase("")){
			  
			  	 HeaderTable55.addCell(new Phrase(" "+count, tabletext));
				 HeaderTable55.addCell(new Phrase(" "+date, tabletext));
				 HeaderTable55.addCell(new Phrase(" "+type, tabletext)); 
			     HeaderTable55.addCell(new Phrase(" "+time , tabletext));
				 HeaderTable55.addCell(new Phrase(" "+temp1, tabletext));
				 HeaderTable55.addCell(new Phrase(" "+bloodpre, tabletext));
				 HeaderTable55.addCell(new Phrase(" "+plusrate, tabletext));
				 HeaderTable55.addCell(new Phrase(" "+resprate, tabletext));
				 HeaderTable55.addCell(new Phrase(" "+oxygen, tabletext));
				 HeaderTable55.addCell(new Phrase(" "+bsl1, tabletext));
			      
				 date="";  type=""; time="";  temp1="";  bloodpre="";
				 plusrate=""; resprate=""; oxygen=""; bsl1 ="";
				 count++;
			  }
		 // }
				   
	countSize++;
		   }
				   
	}	 
			   }*/ //end of i for loop 
			   
			 
			
			
			
		}
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