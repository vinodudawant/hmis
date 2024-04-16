<%@page import="java.util.ResourceBundle"%>
<%@page import="javax.sound.midi.SysexMessage"%>
<%@page import="com.hms.pharmacy.upload.FilePath"%>
<%@page import="com.hms.dto.Doctor"%>
 <%@page import="java.util.ResourceBundle"%>
<%@page import="com.itextpdf.text.html.simpleparser.StyleSheet"%>
<%@page import="com.itextpdf.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.hms.dto.RadiologyTemplate"%>
<%@page import="com.hms.dto.RadiologyTemplateReportDTO"%>
<%@page import="com.hms.ehat.controller.RisController"%>
<%@page import="java.util.Date"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.ehat.controller.RisController"%>	<!-- imported /aniket_kanse / 17 DEC 2020 -->
<%@page import="com.hms.dto.ViewRisRecordsDTO"%>	<!-- imported /aniket_kanse / 17 DEC 2020 -->
<%@page import="com.hms.ehat.dto.DoctorDto"%>	<!-- imported /aniket_kanse / 17 DEC 2020 -->

<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>

<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>RIS Assessment Print</title>
</head>
<body>

	<%
		try {

 			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String billPrint = (String) resourceBundle.getObject("billPrint").toString();
			String billPrintsHeader = (String) resourceBundle.getObject("billPrintsHeader").toString();	
			String concessionFlow = (String) resourceBundle.getObject("concessionFlow").toString();	
			
			String fontName = application.getRealPath("fonts\\Shivaji05.ttf");
			FontFactory.register(fontName);

			//for centerpatientId
		    String patientId= resourceBundle.getObject("patientIdLabel").toString();
		
		
		RisController risController = (ApplicationContextUtils.getApplicationContext()).getBean(RisController.class);
		ViewRisRecordsDTO risDTO = new ViewRisRecordsDTO();			
		List<ViewRisRecordsDTO> listViewRisRecordsDTO = null;
		listViewRisRecordsDTO = risController.getSingleRISRecord(Integer.parseInt(request.getParameter("pkViewRisRecordsDTO")));
		System.out.println("verify date test :: " + listViewRisRecordsDTO.get(0).getVerifiedOnDateTime());
		String verified =  listViewRisRecordsDTO.get(0).getVerifiedOnDateTime();
		
		String verfiedDateTime = "";
		if(verified == null || verified == "" || verified == "null" || verified.isEmpty()){
			verfiedDateTime = "NOT VERIFIED";
		}else
			verfiedDateTime = verified;
		
		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		
		Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
		document.setMargins(20, 20, 20, 0);

		PdfWriter.getInstance(document, outStream);
		document.open();
		//font

		Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font subheader = new Font(Font.FontFamily.HELVETICA, 8,Font.BOLD);
		Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);
		
	

		Font tableheader = new Font(Font.FontFamily.HELVETICA, 10,Font.BOLD);
		Font tabletext = new Font(Font.FontFamily.HELVETICA, 8,Font.NORMAL);
		Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
 
		session = request.getSession();
		String user_name = (String) session.getAttribute("userName");
		
		String path = hospObj.getFilePath();
		String hospitalName = hospObj.getHospitalName();
		hospitalName = hospitalName.toUpperCase();
		String address = hospObj.getHospitalAddress();
		String city = hospObj.getHospitalCity();
		String contact = hospObj.getHospitalContact();
		//String path1 = application.getRealPath(path);
		
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
		

		int testId=Integer.parseInt(request.getParameter("testId"));
		int radiologyTestId=Integer.parseInt(request.getParameter("radiologyTestId"));
		int treatId=Integer.parseInt(request.getParameter("treatID"));	
		System.err.println("treatId :"+treatId);
		String treat = treatId+""; 
		String pageType = request.getParameter("pageType"); 
		System.err.println("pageType :"+pageType);
		int patID=Integer.parseInt(request.getParameter("patID"));
		int idRadiologyTestReport=Integer.parseInt(request.getParameter("idRadiologyTestReport"));	//aniket_kanse //11/11/2020 //PK of table "ehat_radiology_test_report"
		String patientIdstr = patID+"";
		System.err.println("patID :"+patID);
		System.err.println("idRadiologyTestReport /TEST NEW PRINT :"+idRadiologyTestReport);
		
		document.newPage();
		// Table 1 : For hospital adress details start
		// Table 1 : For hospital adress details start
		 	PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 30, 70, 35 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			//ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");

			
			Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
			Font bold = new Font(FontFamily.TIMES_ROMAN, 10, Font.BOLD); //edit by aniket kanse/16DEC2020
			Phrase p = new Phrase();
			p.add(new Chunk(""+hospitalName, bold));			
			p.add(new Chunk("\n\n"+"\t\t"+address, tabletext));			
			p.add(new Chunk(" "+city+" Pin- "+hospitalZip+"\n", tabletext));
			p.add(new Chunk("Phone No. "+hPhoneNo, tabletext));	
			p.add(new Chunk("\n"+webste+"\n"+"email: "+email, tabletext));
			
			PdfPCell hospitalNameCell = new PdfPCell(p);				
			hospitalNameCell.setHorizontalAlignment(Element.ALIGN_LEFT);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);		
			HeaderTable1.addCell("");
			HeaderTable1.addCell(hospitalNameCell);
			if(billPrint.contains("on")){
				

			
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

			/* HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent(); */
			
			HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);	//edit aniket/16 DEC 2020
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			// Table 1 : For hospital adress details end

			PdfPTable HeaderTable2 = new PdfPTable(5);		// table added, Aniket kanse / 16 DEC 2020
				int[] headerwidth2 = { 20, 20, 20, 10, 20 };
				HeaderTable2.setWidths(headerwidth2);
				HeaderTable2.setWidthPercentage(95f);
				HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
				
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("REPORT", header));
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("Date : "+verfiedDateTime, subheader)); 
				document.add(HeaderTable2);
				HeaderTable2.flushContent();


		//new table no 5 start
		RegistrationController uss=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
		RegTreBillDto rtd = new RegTreBillDto();			
		List<RegTreBillDto> ltPatientRecord = null;
		rtd=uss.fetchPatientsRecordByTreatmentId(treatId);
		rtd=rtd.getListRegTreBillDto().get(0);
		
		//use for patient full address
		String addressPatient = "";
		
		 int stateId = rtd.getStateId();
		 int townId   =rtd.getTownId();
		 int districtId =rtd.getDistrictId();
		 int talukaId   =rtd.getTalukaId();
		 int refDocId   =rtd.getRefDocId();
		 String refDoc2=rtd.getDocNameChan();
		 
		 //added, aniket kanse / 18 DEC 2020
		Date appDate   = rtd.getCreatedDateTime();
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy  HH:mm a");
		String appDateTm = sdf.format(appDate);
		
		String age2	= rtd.getAge2();
		String gender = rtd.getGender();
		String AgeSexWt = age2+"    "+gender;
		String departmentNameByDoctorWise = "";
		
	//	AdminModel admodel1 = new AdminModel();
		Doctor doc2 = new Doctor();
		List<Doctor> listDoc2 = null;
		
		
		if(rtd.getDoctorId().contains(",")){
			String[] doctors = rtd.getDoctorId().split(",") ;
			String Doc_Nme = "";
			
			for(String str :doctors )
			{
				String DocID = str;
				int docId =  Integer.parseInt(str);
				 System.err.println("DOCCIDDDDDD  ris PRINT"+docId);
		//		listDoc2 = admodel1.getDoctorsDepDetails(docId);
				System.out.println("listDoc2.get(0).getDepartmentName()::"+listDoc2.get(0).getDepartmentName());
				departmentNameByDoctorWise = departmentNameByDoctorWise + listDoc2.get(0).getDepartmentName();
			
			}
		}
		else {
						
			if(!rtd.getDoctorId().equalsIgnoreCase("")){
				int docId =  Integer.parseInt(rtd.getDoctorId());
				listDoc2 = admodel1.getDoctorsDepDetails(docId);
				departmentNameByDoctorWise = listDoc2.get(0).getDepartmentName();
			}else{
				//added by Rohit on 16-03-2021
				departmentNameByDoctorWise = "Diagnostic";
				//departmentNameByDoctorWise = "-";
			}
		}
		 
		 
		 RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
			List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
			ltRegMasterDto =us.fetchPatientsRecordByTreatmentId(treatId);
			
			 int sponsorSlave=ltRegMasterDto.get(0).getChargesMasterSlaveId();
		
		 
		 String BillCategoryName ="";
		 String state  ="";
		 String district  ="";
		 String cityObj  ="";
		 String taluka  ="";
		 String conDocName  ="";
		 
		LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
		AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
		List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
		
		
		if(refDocId > 0){
			conDocName = fetchlist.getStringValOfObject("chanelling_doctor","docName",refDocId,"channDocId"); 
		}else{
			conDocName   = "";
		}
		
		if(sponsorSlave > 0 && sponsorSlave != 56){
			fetchsposor   = obj.fetchSuperCatofchargesSlave(sponsorSlave);
			//BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
			BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id");
		}else{
			BillCategoryName = "Self";
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
			addressPatient +=  (", "+taluka);
		}						
		if (district != "0" && !district.equals("undefined") && !district.equals("")) 
		{
			addressPatient += (", " + district);
		}
		if (state != "0" && !state.equals("undefined") && !state.equals("")) 
		{
			addressPatient += (", " + state);
		}
		
		String refDocName  ="";
		
		if(refDocId > 0 ){
			refDocName   = fetchlist.getStringValOfObject("doctor","doc_name",refDocId,"Doctor_ID");
		}else{
			refDocName   = "";
		}
		String weight  	=ltRegMasterDto.get(0).getWeight();
		String height  	=ltRegMasterDto.get(0).getHeight();
		String opdipdno =ltRegMasterDto.get(0).getOpdipdno();
		
		
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Date date = new Date();
		String curDate=dateFormat.format(date);
		
		
		PdfPTable HeaderTable5 = new PdfPTable(4);
		int[] headerwidth5 = { 15,40,15,30};
		HeaderTable5.setWidths(headerwidth5);
		HeaderTable5.setWidthPercentage(95f);		
		
		HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		
		HeaderTable5.addCell(new Phrase("Patient Id ", subheader));
		HeaderTable5.addCell(new Phrase(": "+ rtd.getPatientIdd(), tabletext));
		HeaderTable5.addCell(new Phrase("Date of Admission", subheader));
		HeaderTable5.addCell(new Phrase(": "+appDateTm , tabletext));
		
		HeaderTable5.addCell(new Phrase("Patient Name ", subheader));
		HeaderTable5.addCell(new Phrase(": "+ rtd.getPatientName(), tabletext));
		HeaderTable5.addCell(new Phrase("Admission No.", subheader));
		HeaderTable5.addCell(new Phrase(": "+opdipdno, tabletext));
		
		
		HeaderTable5.addCell(new Phrase("Gender/Age", subheader));
		HeaderTable5.addCell(new Phrase(": "+AgeSexWt, tabletext));
		HeaderTable5.addCell(new Phrase("Department", subheader));
		HeaderTable5.addCell(new Phrase(": " + departmentNameByDoctorWise, tabletext));
		
		/* HeaderTable5.addCell(new Phrase("Height", subheader));
		HeaderTable5.addCell(new Phrase(": "+height, tabletext));
		HeaderTable5.addCell(new Phrase("Weight", subheader));
		HeaderTable5.addCell(new Phrase(": "+weight, tabletext)); */
		
		HeaderTable5.addCell(new Phrase("Address", subheader));
		HeaderTable5.addCell(new Phrase(": "+ rtd.getAddress()+", "+addressPatient, tabletext));
		//below line of code commentted by Rohit on 16-03-2021
		/* HeaderTable5.addCell(new Phrase("Department Code", subheader));
		HeaderTable5.addCell(new Phrase(": " , tabletext)); */
		
		HeaderTable5.addCell(new Phrase("Contact", subheader));
		HeaderTable5.addCell(new Phrase(": "+rtd.getMobile(), tabletext));
		
		/* HeaderTable5.addCell(new Phrase("Bill Category", subheader));
		HeaderTable5.addCell(new Phrase(": "+BillCategoryName, tabletext));
		HeaderTable5.addCell(new Phrase("Bill Category", subheader));
		HeaderTable5.addCell(new Phrase(": "+BillCategoryName, tabletext)); */
		
		
		

		/* AdminModel admodel1 = new AdminModel();
		Doctor doc2 = new Doctor();
		List<Doctor> listDoc2 = null; */

		if(rtd.getDoctorId().contains(",")&& !rtd.getDoctorId().equalsIgnoreCase("")){
			
			
			String[] doctors = rtd.getDoctorId().split(",") ;
			String Doc_Nme = "";
			String Depart = "";
			for(String str :doctors )
			{
				String DocID = str;
				int docId =  Integer.parseInt(str);
		//		listDoc2 = admodel1.getDoctorsDepDetails(docId);
				 Doc_Nme = Doc_Nme + listDoc2.get(0).getDoc_name()+",";
				 Depart = Depart + listDoc2.get(0).getDepartmentName()+",";
						
			}
			HeaderTable5.addCell(new Phrase("Consultant", subheader));
			HeaderTable5.addCell(new Phrase(": "+Doc_Nme, tabletext));			
			
		}
		else{
			if(!rtd.getDoctorId().equalsIgnoreCase("")){
		int docId =  Integer.parseInt(rtd.getDoctorId());
		
		listDoc2 = admodel1.getDoctorsDepDetails(docId);
			
		HeaderTable5.addCell(new Phrase("Consultant", subheader));
		HeaderTable5.addCell(new Phrase(": "+listDoc2.get(0).getDoc_name(), tabletext));
			}else{
				HeaderTable5.addCell(new Phrase("Consultant", subheader));
				HeaderTable5.addCell(new Phrase(": -", tabletext));
				
			}
		}
			/* HeaderTable5.addCell(new Phrase("Date", subheader));
			HeaderTable5.addCell(new Phrase(": "+curDate, tabletext));
		
			HeaderTable5.addCell(new Phrase("Ref By", subheader)); */
			/* HeaderTable5.addCell(new Phrase(": "+refDocName, tabletext)); */
			//HeaderTable5.addCell(new Phrase(": "+refDoc2, tabletext));
			HeaderTable5.addCell(new Phrase("", subheader));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", subheader));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			
			
			
		HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
		
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		
		document.add(HeaderTable5);
		HeaderTable5.flushContent(); 
		
		//End table no 5 start
		
		  /*  RisController risController=(ApplicationContextUtils.getApplicationContext()).getBean(RisController.class); */
                                RadiologyTemplateReportDTO rtd1 = new RadiologyTemplateReportDTO();  
                                rtd1 = risController.getRisReportRecordForPrint(patID,testId,radiologyTestId,treatId,idRadiologyTestReport);
                             //   System.out.println("RadiologyTemplateReportDTO :: " + rtd1);
		// investigation name added / aniket kanse, 17 DEC 2020
		
				PdfPTable HeaderTable29 = new PdfPTable(1);		
			//	int[] headerwidth29 = { 20, 20, 40, 10, 20 };
				int[] headerwidth29 = { 100 };
				HeaderTable29.setWidths(headerwidth29);
				HeaderTable29.setWidthPercentage(95f);
				HeaderTable29.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTable29.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
				
				HeaderTable29.addCell(new Phrase("" , header));
				HeaderTable29.addCell(new Phrase("" , header));
				HeaderTable29.addCell(new Phrase("" + rtd1.getListRadiologyTempReportDTO().get(0).getTemplateName(), header));
				HeaderTable29.addCell(new Phrase("" , header));
				HeaderTable29.addCell(new Phrase("" , header));
				HeaderTable29.addCell(new Phrase("" , header));
				HeaderTable29.addCell(new Phrase("" , header));
				HeaderTable29.addCell(new Phrase("" , header));
				
				
				document.add(HeaderTable29);
				HeaderTable29.flushContent();
		
		// INVESTIGATION NAME END
                                
                               // REPORT CONTENT BELOW
                                PdfPTable HeaderTable32 = new PdfPTable(1);
                                int[] headerwidth32 = {100};
                                HeaderTable32.setWidths(headerwidth32);
                                HeaderTable32.setWidthPercentage(95f);
                                HeaderTable32.getDefaultCell().setBorder(Rectangle.NO_BORDER);
                                
                                StyleSheet styleSheet = new StyleSheet();
                                styleSheet.loadTagStyle("body", "size", "90px");
                                styleSheet.loadTagStyle("p", "size", " 100px");
                                HTMLWorker htmlWorker = new HTMLWorker(document);
                                htmlWorker.setMargins(50, 100, 100, 150);
                                Paragraph paragraph = new Paragraph();
                                
                                PdfPTable HeaderTable31 = new PdfPTable(1);
                                int[] headerwidth30 = {100};
                                HeaderTable31.setWidths(headerwidth30);
                                HeaderTable31.setWidthPercentage(95f);
                                HeaderTable31.getDefaultCell().setBorder(Rectangle.NO_BORDER);
                                htmlWorker.setMargins(50, 100, 100, 150);
                                
                                String ristempData = "";
                                if(pageType.equals("Ris")){
                                	ristempData = rtd1.getListRadiologyTempReportDTO().get(0).getTemplateData();
                                	
                                }else{
                                	ristempData = rtd1.getListRadiologyTempReportDTO().get(0).getNuclearData();
                                	System.err.print(">>>>>>> Print Vikas "+rtd1.getGroupName());
                                }
                                java.util.List<Element> ie1 = HTMLWorker.parseToList(new StringReader(ristempData), styleSheet);
                               if(ristempData.equalsIgnoreCase("") || ristempData.equalsIgnoreCase("NULL")){
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
                                           HeaderTable32.addCell(htmlTable);
                                           document.add(HeaderTable32);
                                           HeaderTable32.flushContent();
                                       }else{
                                           paragraph.add(element);
                                           cell = new PdfPCell(paragraph);
                                           cell.setBorder(Rectangle.NO_BORDER);
                                           HeaderTable32.addCell(cell);
                                           document.add(HeaderTable32);
                                           HeaderTable32.flushContent();
                                           paragraph.clear();
                                           
                                       }
                                   }                              
                               }else{
                            	   java.util.List<Element> ie3 = HTMLWorker.parseToList(new StringReader(ristempData), styleSheet);
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
                                           HeaderTable31.addCell(htmlTable);
                                           document.add(HeaderTable31);
                                           HeaderTable31.flushContent();
                                       }else{
                                           paragraph.add(element);
                                           cell = new PdfPCell(paragraph);
                                           cell.setBorder(Rectangle.NO_BORDER);
                                           HeaderTable31.addCell(cell);
                                           document.add(HeaderTable31);
                                           HeaderTable31.flushContent();
                                           paragraph.clear();
                                           
                                       }
                                   }

                               } 
                               
                                
				 PdfPTable HeaderTableTechN = new PdfPTable(5);
     			int[] headerwidth51 = { 20, 10, 15, 15, 25 };
    			  HeaderTableTechN.setWidths(headerwidth51);
   			  HeaderTableTechN.setWidthPercentage(95f);
   			  HeaderTableTechN.getDefaultCell().setBorder(Rectangle.NO_BORDER);

            	HeaderTableTechN.addCell(new Phrase("", subheader));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", subheader));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("",subheader));
            	
                HeaderTableTechN.addCell(new Phrase("", subheader));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("--End Of Report--", subheader));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("",subheader));
         	
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", subheader));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("",subheader));
            	HeaderTableTechN.addCell(new Phrase("", subheader));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", header));
            	HeaderTableTechN.addCell(new Phrase("", subheader));
            	
            	document.add(HeaderTableTechN);
            	HeaderTableTechN.flushContent();

            	
            	
        /*--------START------------- RADIOLOGIST SIGN AND OTHER DETAILS BELOW / aniket kanse 17 DEC 2020-------------------*/
        
        		String docsName = listViewRisRecordsDTO.get(0).getRadiologist();	// edit, aniket kanse, 04 JAN 2021

    			String signature = "";
        	
        		String degree = "";
        		String designation = "";
        		String regNo = "";
        
    			int IdPathologist = 0;
    			String actualpath = "";
    	        
    	        Integer userid = (Integer) session.getAttribute("userId1");
    	    	if(userid==null){
    	    		userid=0;
    	    	}
    	    	
    	    	System.out.println("----user ID-----" + userid);
    	    	
                //print code modification for sign /aniket kanse /13/07/2020
                UsersManagementController usrController = (ApplicationContextUtils.getApplicationContext()).getBean(UsersManagementController.class);
    			DoctorDTO docDto = new DoctorDTO();			
    			List<DoctorDTO> listDocs = new ArrayList<DoctorDTO>();
    			//docDto = usrController.getDoctorObjectById(userid);
    			docDto = usrController.getDoctorObjectByName(docsName);		// edit, aniket kanse, 04 JAN 2021
    			signature = docDto.getListDoctor().get(0).getSignature();
    			
    			if(docDto.getListDoctor().get(0).getQualification() == null || docDto.getListDoctor().get(0).getQualification() == "" || docDto.getListDoctor().get(0).getQualification() == "null" || docDto.getListDoctor().get(0).getQualification().isEmpty() || docDto.getListDoctor().get(0).getQualification() == "undefined"){
    				degree = "-";
    			}else
    				degree = docDto.getListDoctor().get(0).getQualification();
    			
    			if(docDto.getListDoctor().get(0).getDesignation() == null || docDto.getListDoctor().get(0).getDesignation() == "" || docDto.getListDoctor().get(0).getDesignation() == "null" || docDto.getListDoctor().get(0).getDesignation().isEmpty() || docDto.getListDoctor().get(0).getDesignation() == "undefined"){
    				designation = "-";
    			}else
    				designation = docDto.getListDoctor().get(0).getDesignation();
    				
    			if(docDto.getListDoctor().get(0).getRegNo() == null || docDto.getListDoctor().get(0).getRegNo() == "" || docDto.getListDoctor().get(0).getRegNo() == "null" || docDto.getListDoctor().get(0).getRegNo().isEmpty() || docDto.getListDoctor().get(0).getRegNo() == "undefined"){
    				regNo = "-";
    			}else
    				regNo = docDto.getListDoctor().get(0).getRegNo();
    			
    			System.out.println("doctor : --------:" + docDto);
    			System.out.println("doc list-size-----:" + docDto.getListDoctor().size());
                System.out.println("sign-name--------:" + signature);
                System.out.println("degree--------:" + degree);
                System.out.println("designation--------:" + designation);
                System.out.println("regNo--------:" + regNo);
                
                
                Image imgsign = null;
                PdfPCell cellsign = null;
                String actual = FilePath.getUPLOADDOC();
                actualpath = actual + signature;
                  	                          

    /* ------------------START this is DOCTOR Sign print----------------*/
    	
    				PdfPTable HeaderTable73 = new PdfPTable(1);
    				int[] headerwidth73 = { 100 };
    				HeaderTable73.setWidths(headerwidth73);
    				HeaderTable73.setWidthPercentage(95f);
    				
    				HeaderTable73.getDefaultCell().setBorder(Rectangle.NO_BORDER);
    				HeaderTable73.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
    				
    				
    				  if(!signature.equals("-"))
                  	                            {
                  	                            try {
                  	                                //String pathsign = application.getRealPath(actualpath);
                  	                                imgsign = Image.getInstance(actualpath);
                  	                                imgsign.scaleAbsolute(100, 50);
                  	                                cellsign = new PdfPCell();
                  	                              
                  	                                cellsign.addElement(new Chunk(imgsign, 15, 5));
                  	                                cellsign.setBorder(Rectangle.NO_BORDER);
                  	                              	cellsign.setHorizontalAlignment(Rectangle.ALIGN_LEFT);
                  	                            } catch (Exception e) {
                  	                                e.printStackTrace();
                  	                            }
                  	                            }
                  	                            if (imgsign == null) {
                  	                            	HeaderTable73.addCell(new Phrase("", subheader));
                  	                            } else {
                  	                            	//HeaderTable73.addCell(new Phrase("", subheader));
                  	                            	HeaderTable73.addCell(new Phrase("", subheader));
                  	                            	HeaderTable73.addCell(new Phrase("", subheader));
                  	                            	HeaderTable73.addCell(cellsign);
                  	                            }
    				
    				document.add(HeaderTable73);
    				HeaderTable73.flushContent();
    	
    	/* ------------------END this isDOCTOR Sign print----------------*/
    	
    		PdfPTable HeaderTable72 = new PdfPTable(1);
			int[] headerwidth72 = { 100 };
			HeaderTable72.setWidths(headerwidth72);
			HeaderTable72.setWidthPercentage(95f);
				
			HeaderTable72.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable72.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
			HeaderTable72.addCell(new Phrase("\n" + listViewRisRecordsDTO.get(0).getRadiologist(), subheader));
			HeaderTable72.addCell(new Phrase("" + degree, tabletext));
			HeaderTable72.addCell(new Phrase("" + designation, tabletext));
			
			 if(regNo == "-" || regNo.isEmpty()){
				 HeaderTable72.addCell(new Phrase("", tabletext));
			 }else{
				 HeaderTable72.addCell(new Phrase("Reg. no.- " + regNo, tabletext));
			 }
			
				HeaderTable72.addCell(new Phrase("  "+ "", tabletext));
						
				/* HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTable7.addCell(new Phrase("", subheader)); */
				
				document.add(HeaderTable72);
				HeaderTable72.flushContent();
    	
    	/*--------END------------- RADIOLOGIST SIGN AND OTHER DETAILS / aniket kanse 17 DEC 2020-------------------*/

	document.close();

			outStream.flush();
			outStream.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	%>

</body>
</html>