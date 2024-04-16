<%@page import="com.hms.dto.Doctor"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="javax.sound.midi.SysexMessage"%>
<%@ page import="com.hms.dto.Patient"%>
<%@ page import="com.hms.dto.VaccineDTO"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.util.List"%>
<%@ page import="com.hms.model.PatientModel"%>
<%@ page import="com.hms.model.TreatmentModel"%>
<%-- <%@ page import="com.hms.dto.HospitalDetails"%> --%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@page import="com.hms.model.AdminModel"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"
	import="com.itextpdf.text.*, com.itextpdf.text.pdf.*, java.util.List, java.text.*"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Vaccination Print</title>
</head>
<body>
	<%
		try {
			response.setContentType("application/pdf");

			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			document.setMargins(20, 20, 20, 20);

			PdfWriter.getInstance(document, outStream);
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

			FontSelector selector = new FontSelector();
			selector.addFont(subheader);

			java.util.Calendar currentDate = Calendar.getInstance();
			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
			String curr_date = sdf.format(currentDate.getTime());

			int ProductId = 0;
			int count = 1;

			//For No. of prints.
			AdminModel adminModel = new AdminModel();
			int printId = 2;
			int numOfPrint = adminModel.generalAccessNumOfPrint(printId);// to get number of prints
			System.err.println("=-==------------------>>>"+numOfPrint);

			for (int cnt = 0; cnt < numOfPrint; cnt++) {
				document.newPage();
				PdfPTable HeaderTable1 = new PdfPTable(3);
				int[] headerwidth1 = { 40, 70, 10 };
				HeaderTable1.setWidths(headerwidth1);
				HeaderTable1.setWidthPercentage(95f);
				HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
				HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	
				/* List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails
						.getHospDetails("0");
				HospitalDetails hospObj = arrHospitalDetails.get(0); */
				
				HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
				List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
				HospitalDetails hospObj = arrHospitalDetails.get(0);
	
				String path = hospObj.getFilePath();
				String hospitalName = hospObj.getHospitalName();
				hospitalName = hospitalName.toUpperCase();
				String address = hospObj.getHospitalAddress();
				String city = hospObj.getHospitalCity();
				String contact = hospObj.getHospitalContact();
				Image img = null;
				PdfPCell cell = null;
	
				try {
					String path1 = application.getRealPath(path);
					img = Image.getInstance(path1);
					img.scaleAbsolute(150, 60);
					cell = new PdfPCell();
					cell.addElement(new Chunk(img, 5, -5));
					cell.setBorder(Rectangle.NO_BORDER);
				} catch (Exception e) {
					e.printStackTrace();
				}
	
				if (img == null) {
					HeaderTable1.addCell(new Phrase("", header));
				} else {
					HeaderTable1.addCell(cell);
				}
	
				PdfPCell hospitalNameCell = new PdfPCell(new Phrase(
						hospitalName + "\n" + address, header));
				hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hospitalNameCell.setBorder(Rectangle.NO_BORDER);
				HeaderTable1.addCell(hospitalNameCell);
				HeaderTable1.addCell(new Phrase("", header));
	
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
				
				
				/////////////////
				//Start table for 
				//fetch patient record
				 RegistrationController uss=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
				RegTreBillDto rtd = new RegTreBillDto();			
				List<RegTreBillDto> ltPatientRecord = null;
				String PType = "";
				String addressPatient = "";
				int depid=0;
				int treatId=Integer.parseInt(request.getParameter("tid"));
				if(uss != null)
				{
					rtd=uss.fetchPatientsRecordByTreatmentId(treatId);
					rtd=rtd.getListRegTreBillDto().get(0);
					rtd.getPatientName();
					depid=rtd.getDepartmentId();
					
					
					 int stateId = rtd.getStateId();
					 int townId   =rtd.getTownId();
					 int districtId =rtd.getDistrictId();
					 int talukaId   =rtd.getTalukaId();
					
					 
					 String BillCategoryName ="";
					 String state  ="";
					 String district  ="";
					 String cityObj  ="";
					 String taluka  ="";
					 
					LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
					AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
					List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
					
			 
					if(stateId > 0 ){
						state   = fetchlist.getStringValOfObject("state","state_name",stateId,"idstate");
					}else{
						state   = "";
					}
					if(districtId > 0){
						district = fetchlist.getStringValOfObject("district","dis_name",districtId,"iddistrict"); 
					}else{
						district   = " ";
					}
					
					if(townId > 0){
						cityObj = fetchlist.getStringValOfObject("city","city_name",townId,"idcity");
					}else{
						cityObj   = " ";
					}
					
					if(talukaId > 0){
						taluka  = fetchlist.getStringValOfObject("taluka","taluka_name",talukaId,"idtaluka"); 
					}else{
						taluka   = ", ";
					}				
					
					if(cityObj != "0" && !cityObj.equals("undefined") && !cityObj.equals("")){
						addressPatient += cityObj;
					}
					
					if (taluka != "0" && !taluka.equals("undefined") && !taluka.equals("")) 
					{
						addressPatient +=  (","+taluka);
					}						
					if (district != "0" && !district.equals("undefined") && !district.equals("")) 
					{
						addressPatient += ("," + district);
					}
					if (state != "0" && !state.equals("undefined") && !state.equals("")) 
					{
						addressPatient += ("," + state);
					}
					
					
					
					
					
					int a=rtd.getSourceTypeId();
					if(a>0){
						PType="Sponsor";
		 			}else{
		 				PType="Self";					
					}	
				}
				/* //new table no 2 start
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
				
				//new table no 3 start
				PdfPTable HeaderTable3 = new PdfPTable(5);
				int[] headerwidth3 = { 13,39,20,26,4};
				HeaderTable3.setWidths(headerwidth3);
				HeaderTable3.setWidthPercentage(95f);		
				
				HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				HeaderTable3.addCell(new Phrase("Patient Name", subheader));
				HeaderTable3.addCell(new Phrase(": "+ rtd.getPatientName(), tabletext));			
				HeaderTable3.addCell(new Phrase("Date of Admission", subheader));
				HeaderTable3.addCell(new Phrase(": "+ rtd.getCreatedDateTime(), tabletext));
				HeaderTable3.addCell(new Phrase(" ", tabletext));
				
				
				HeaderTable3.addCell(new Phrase("Age", subheader));
				HeaderTable3.addCell(new Phrase(": "+ rtd.getAge(), tabletext));
				HeaderTable3.addCell(new Phrase("Gender", subheader));
				HeaderTable3.addCell(new Phrase(": "+ rtd.getGender(), tabletext));
				HeaderTable3.addCell(new Phrase(" ", tabletext));
				
				HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTable3.addCell(new Phrase("Address", subheader));
				HeaderTable3.addCell(new Phrase(": "+ rtd.getAddress()+","+ addressPatient, tabletext));
				HeaderTable3.addCell(new Phrase("Type", subheader));
				HeaderTable3.addCell(new Phrase(": "+ PType, tabletext));
				HeaderTable3.addCell(new Phrase(" ", tabletext));	
				
				HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTable3.addCell(new Phrase("Tel/Mob.No", subheader));
				HeaderTable3.addCell(new Phrase(": "+ rtd.getMobile(), tabletext));			
				HeaderTable3.addCell(new Phrase("OPD NO", subheader));
				HeaderTable3.addCell(new Phrase(": "+ rtd.getOpdipdno(), tabletext));
				HeaderTable3.addCell(new Phrase(" ", tabletext));
	
				AdminModel admodel1 = new AdminModel();
				Doctor doc2 = new Doctor();
				List<Doctor> listDoc2 = null;
	
				if(rtd.getDoctorId().contains(",")){
					String[] doctors = rtd.getDoctorId().split(",") ;
					String Doc_Nme = "";
					String Depart = "";
					for(String str :doctors )
					{
						String DocID = str;
						int docId =  Integer.parseInt(str);
						System.err.println("DOCCIDDDDDD"+docId);
						listDoc2 = admodel1.getDoctorsDepDetails(docId);
						 Doc_Nme = Doc_Nme + listDoc2.get(0).getDoc_name()+",";
						 Depart = Depart + listDoc2.get(0).getDepartmentName()+",";
					}
					HeaderTable3.addCell(new Phrase("Consultant", subheader));
					HeaderTable3.addCell(new Phrase(": "+Doc_Nme, tabletext));			
					HeaderTable3.addCell(new Phrase("Department", subheader));
					HeaderTable3.addCell(new Phrase(": "+Depart, tabletext));
					HeaderTable3.addCell(new Phrase(" ", tabletext));
				}
				else{
					if(!rtd.getDoctorId().equalsIgnoreCase("")){
						int docId =  Integer.parseInt(rtd.getDoctorId());
						System.err.println("AAAALLLLAAAAAMMMMM"+docId);
						listDoc2 = admodel1.getDoctorsDepDetails(docId);
						HeaderTable3.addCell(new Phrase("Consultant", subheader));
						System.err.println("AAAALLLLAAAAAMMMMM"+listDoc2.get(0).getDoc_name());
						HeaderTable3.addCell(new Phrase(": "+listDoc2.get(0).getDoc_name(), tabletext));
							}else{
								HeaderTable3.addCell(new Phrase("Consultant", subheader));
								HeaderTable3.addCell(new Phrase(": -", tabletext));
							}			
					if(!rtd.getDoctorId().equalsIgnoreCase("")){
						int docId =  Integer.parseInt(rtd.getDoctorId());
						listDoc2 = admodel1.getDoctorsDepDetails(docId);
						HeaderTable3.addCell(new Phrase("Department", subheader));
						//HeaderTable3.addCell(new Phrase(": "+listDoc2.get(0).getDepartmentName(), tabletext));
						
						if(rtd.getDepartmentId()== 2){
							HeaderTable3.addCell(new Phrase(": IPD ", tabletext));
						}else if(rtd.getDepartmentId()== 1){
							HeaderTable3.addCell(new Phrase(": OPD ", tabletext));
						}
						
					}else{
						HeaderTable3.addCell(new Phrase("Department", subheader));
						HeaderTable3.addCell(new Phrase(": -", tabletext));
					}
				HeaderTable3.addCell(new Phrase(" ", tabletext));
				}
				
				HeaderTable3.addCell(new Phrase("Patient ID", subheader));
				HeaderTable3.addCell(new Phrase(": "+ rtd.getPatientId(), tabletext));
				HeaderTable3.addCell(new Phrase(" ", tabletext));
				HeaderTable3.addCell(new Phrase(" ", tabletext));
				HeaderTable3.addCell(new Phrase(" ", tabletext));
				HeaderTable3.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable3.addCell(new Phrase("", subheader));
				HeaderTable3.addCell(new Phrase("", tabletext));			
				HeaderTable3.addCell(new Phrase("", subheader));
				HeaderTable3.addCell(new Phrase("", tabletext));
				HeaderTable3.addCell(new Phrase(" ", tabletext));
				
				document.add(HeaderTable3);
				HeaderTable3.flushContent();	
				
				
	/////////////////////////////
				PdfPTable HeaderTable2 = new PdfPTable(5);
				int[] headerwidth2 = { 20, 20, 40, 10, 10 };
				HeaderTable2.setWidths(headerwidth2);
				HeaderTable2.setWidthPercentage(95f);
				HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
	
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("Vaccination Details", header));
				HeaderTable2.addCell(new Phrase("Date:", subheader));
				HeaderTable2.addCell(new Phrase(curr_date, subheader));
				document.add(HeaderTable2);
				HeaderTable2.flushContent();
	
				int patientID = Integer.parseInt(request.getParameter("pid"));
				String treatmentID = request.getParameter("tid");
				String printOption = request.getParameter("printOption");
				String callFrom = request.getParameter("callFrom");
	
				List<Patient> arrPatient = null;
				PatientModel patientModel = new PatientModel();
				String OPD_ER_IPD= "";
				if(callFrom.equals("previousTreatmentOPDER")){
					OPD_ER_IPD = "OPD_INACTIVE";
				}else{
					OPD_ER_IPD = "OPD";
				}
				
				arrPatient = patientModel.fetchPatientDataByOPD_ER_IPD(OPD_ER_IPD,
						"byTreatmentID", treatmentID);
				
				if (arrPatient.size() != 0) {
	
					Patient objPat = arrPatient.get(0);
	
					PdfPTable HeaderTable33 = new PdfPTable(6);
					int[] headerwidth33 = { 20, 30, 20, 30, 20, 30 };
					HeaderTable33.setWidths(headerwidth33);
					HeaderTable33.setWidthPercentage(95f);
					HeaderTable33.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
	
					HeaderTable33.addCell(new Phrase("", header));
					HeaderTable33.addCell(new Phrase("", header));
					HeaderTable33.addCell(new Phrase("", header));
					HeaderTable33.addCell(new Phrase("", header));
					HeaderTable33.addCell(new Phrase("", header));
					HeaderTable33.addCell(new Phrase("", header));
	
					String doc_name = "";
					String spln_name = "";
	
					if (null != objPat.getObjDoc()) {
						doc_name = objPat.getObjDoc().getDoc_name();
						spln_name = objPat.getObjDoc().getSpecialisation();
					} else {
						doc_name = "";
						spln_name = "";
					}
	
					HeaderTable33.addCell(new Phrase("Consultant :", subheader));
					HeaderTable33
							.addCell(new Phrase("" + (doc_name), tabletext));
					HeaderTable33.addCell(new Phrase("Department :", subheader));
					HeaderTable33
							.addCell(new Phrase("" + (spln_name), tabletext));
					HeaderTable33.addCell(new Phrase("Patient Id", subheader));
					HeaderTable33.addCell(new Phrase(""
							+ (objPat.getPatient_ID()), tabletext));
	
					HeaderTable33.addCell(new Phrase("", header));
					HeaderTable33.addCell(new Phrase("", header));
					HeaderTable33.addCell(new Phrase("", header));
					HeaderTable33.addCell(new Phrase("", header));
					HeaderTable33.addCell(new Phrase("", header));
					HeaderTable33.addCell(new Phrase("", header));
	
					HeaderTable33.addCell(new Phrase("", header));
					HeaderTable33.addCell(new Phrase("", header));
					HeaderTable33.addCell(new Phrase("", header));
					HeaderTable33.addCell(new Phrase("", header));
					HeaderTable33.addCell(new Phrase("", header));
					HeaderTable33.addCell(new Phrase("", header));
	
					document.add(HeaderTable33);
					HeaderTable33.flushContent();
					PdfPTable HeaderTable4 = new PdfPTable(5);
					int[] headerwidth4 = { 20, 80, 20, 30, 0 };
					HeaderTable4.setWidths(headerwidth4);
					HeaderTable4.setWidthPercentage(95f);
					HeaderTable4.getDefaultCell()
							.setBorder(Rectangle.NO_BORDER);
	
					HeaderTable4
							.addCell(new Phrase("Patient Name :", subheader));
					HeaderTable4.addCell(new Phrase("" + (objPat.getTitle())
							+ " " + (objPat.getfName()) + " "
							+ (objPat.getmName()) + " " + (objPat.getlName()),
							tabletext));
					HeaderTable4.addCell(new Phrase("MR No.", subheader));
					HeaderTable4.addCell(new Phrase("" + (objPat.getMrNo()),
							tabletext));
					HeaderTable4.addCell(new Phrase("", header));
	
					String ageString = "";
					System.out.println("Days: " + objPat.getDays());
					System.out.println("Month: " + objPat.getMonth());
					System.out.println("Year: " + objPat.getAge());
	
					if (!objPat.getAge().trim().equals("0")) {
						ageString += (objPat.getAge() + " Yr ");
					}
	
					if (!objPat.getMonth().trim().equals("0")) {
						ageString += (objPat.getMonth() + " M ");
					}
	
					if (!objPat.getDays().trim().equals("0")) {
						ageString += (objPat.getDays() + " D");
					}
	
					HeaderTable4.addCell(new Phrase("Age/Gender/Wt :", subheader));
					HeaderTable4.addCell(new Phrase("" + (ageString) + "/"
							+ (objPat.getSex()) + "/"
							+ (objPat.getObjTreatment().getWeight() + " Kg"),
							tabletext));
					HeaderTable4.addCell(new Phrase("OPD No.", subheader));
					HeaderTable4.addCell(new Phrase(""
							+ (objPat.getObjTreatment().getTreatmentCount()),
							tabletext));
					HeaderTable4.addCell(new Phrase("", header));
	
					// patient address
					String addressPatient1 = "";
					if ((objPat.getAddressLine1().trim()) != "" || objPat.getAddressLine1().trim() != null) {
						addressPatient += ((objPat.getAddressLine1().trim()));
					}
					if ((objPat.getAddressLine2().trim()) != "" || objPat.getAddressLine2().trim() != null) {
						addressPatient += (", " +(objPat.getAddressLine2().trim()));
					}
					
					if ((objPat.getAddressLine3().trim()) != "" || objPat.getAddressLine3().trim() != null) {
						addressPatient += (", " +(objPat.getCityAddress().trim()));
					}
	
					if (((objPat.getAddressLine3().trim()) != "" || objPat.getAddressLine3().trim() != null)
							&& ((objPat.getAddressLine4().trim()) != "" || objPat.getAddressLine4().trim() != null)) {
						addressPatient += (", " + (objPat.getDistrictAddress()
								.trim()));
					} else {
						addressPatient += ((objPat.getCityAddress().trim())+(objPat.getDistrictAddress().trim()));
					}
	
					if (((addressPatient.trim()) != "" || addressPatient.trim() != null)
							&& (objPat.getPostalCode().trim() != "" || objPat.getPostalCode().trim() != null )) {
						addressPatient += (" - " + (objPat.getPostalCode()
								.trim()));
					}
					// end : patient address
	
					HeaderTable4.addCell(new Phrase("Address :", subheader));
					HeaderTable4.addCell(new Phrase(addressPatient, tabletext));
					HeaderTable4.addCell(new Phrase("Contact No.", subheader));
					HeaderTable4.addCell(new Phrase("" + (objPat.getMobile()),
							tabletext));
					HeaderTable4.addCell(new Phrase("", header));
	
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					document.add(HeaderTable4);
					HeaderTable4.flushContent();
	
					HeaderTable4.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					document.add(HeaderTable4);
					HeaderTable4.flushContent();
	
				}
	
				// START:
	
				// # Age VaccineName FromDate ToDate Givenon DueDate Status Notes
				PdfPTable HeaderTable9 = new PdfPTable(6);
				int[] headerwidth9 = { 3, 20, 10, 10, 15, 20 };
				HeaderTable9.setWidths(headerwidth9);
				HeaderTable9.setWidthPercentage(95f);
				HeaderTable9.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	
				HeaderTable9.addCell(new Phrase("", header));
				HeaderTable9.addCell(new Phrase("", header));
				HeaderTable9.addCell(new Phrase("", header));
				HeaderTable9.addCell(new Phrase("", header));
				HeaderTable9.addCell(new Phrase("", header));
				HeaderTable9.addCell(new Phrase("", header));
	
				document.add(HeaderTable9);
				HeaderTable9.flushContent();
	
				List<VaccineDTO> vaccineDTOListProcessed = null;
				TreatmentModel treatmentModel = new TreatmentModel();
				vaccineDTOListProcessed = treatmentModel
						.generateImmunizationChartForPatient(patientID);
	
				if (vaccineDTOListProcessed.size() != 0) {
	
					HeaderTable9.addCell(new Phrase("#", subheader));
					HeaderTable9.addCell(new Phrase("Vaccine Name", subheader));
					HeaderTable9.addCell(new Phrase("Given Dt.", subheader));
					HeaderTable9.addCell(new Phrase("Due Dt.", subheader));
					HeaderTable9.addCell(new Phrase("Status", subheader));
					HeaderTable9.addCell(new Phrase("Notes", subheader));
	
					document.add(HeaderTable9);
					HeaderTable9.flushContent();
	
					HeaderTable9.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable9.addCell(new Phrase("", header));
					HeaderTable9.addCell(new Phrase("", header));
					HeaderTable9.addCell(new Phrase("", header));
					HeaderTable9.addCell(new Phrase("", header));
					HeaderTable9.addCell(new Phrase("", header));
					HeaderTable9.addCell(new Phrase("", header));
	
					document.add(HeaderTable9);
					HeaderTable9.flushContent();
	
					Date todaysDate = sdf.parse(curr_date);
					//System.err.println("todaysDate: " + todaysDate);
	
					boolean flushvaccination;
					int counter = 1;
	
					for (int i = 0; i < vaccineDTOListProcessed.size(); i++) {
						
						if (!printOption.equalsIgnoreCase("ALL")) {
							// print chart based on dates (GivenDate: todays date) and (DueDate: future date)
	
							flushvaccination = false;
	
							if (!(vaccineDTOListProcessed.get(i)
									.getVaccineGivenDate()).equals("")) {
	
								String vaccinedateString = vaccineDTOListProcessed
										.get(i).getVaccineGivenDate();
								
								Date vaccinedate = sdf.parse(vaccinedateString);
								
								// check for todays date
								flushvaccination = true;
								if (todaysDate.compareTo(vaccinedate) == 0) {
									flushvaccination = true;
								} 
	
							}
	
							if (!(vaccineDTOListProcessed.get(i).getDueDate())
									.equals("")) {
	
								String vaccineDuedateString = vaccineDTOListProcessed
										.get(i).getDueDate();
								
								Date vaccineDuedate = sdf
										.parse(vaccineDuedateString);
								
								// check for future date
								
								if (todaysDate.compareTo(vaccineDuedate) <= 0) {
									flushvaccination = true;
								} 
	
							}
	
						} else {
							// print complete chart
							flushvaccination = true;
						}
	
						if (flushvaccination) {
	
							HeaderTable9.addCell(new Phrase("" + (counter++),
									tabletext));
							HeaderTable9.addCell(new Phrase(""
									+ vaccineDTOListProcessed.get(i)
											.getVaccineName(), tabletext));
							HeaderTable9.addCell(new Phrase(""
									+ vaccineDTOListProcessed.get(i)
											.getVaccineGivenDate(), tabletext));
							HeaderTable9.addCell(new Phrase(""
									+ vaccineDTOListProcessed.get(i)
											.getDueDate(), tabletext));
							HeaderTable9.addCell(new Phrase(""
									+ vaccineDTOListProcessed.get(i)
											.getVaccineStatusForPatient(),
									tabletext));
							HeaderTable9.addCell(new Phrase(""
									+ vaccineDTOListProcessed.get(i)
											.getVaccineNotes(), tabletext));
	
							document.add(HeaderTable9);
							HeaderTable9.flushContent();
	
						}
	
					}
	
				}
				// END: 
	
				treatmentModel = null;
				patientModel = null;
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