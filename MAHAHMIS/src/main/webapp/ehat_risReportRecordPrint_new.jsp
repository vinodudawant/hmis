<%@page import="com.hms.patient.util.OSValidator"%>
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
<%@page import="java.util.Locale" %>

<!-- NEW -->

<%@page import="org.apache.bcel.verifier.structurals.InstConstraintVisitor"%>
<%@page import="com.hms.administrator.service.ChannelHospitalMgmtService"%>
<%@page import="com.hms.administrator.dto.HospitalDetailsDTO"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.ehat.dto.PaymentModDto"%>
<%@page import="com.hms.ehat.service.PaymentModService"%>
<%@page import="com.hms.administrator.dto.Chanelling_doctor"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.ehat.dto.ServiceMasterDto"%>
<%@page import="com.hms.ehat.service.ServService"%>
<%@page import="com.hms.ehat.dto.BillNobleDto"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.ehat.dto.EhatBillPrefix"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.dto.DoctorDto"%>
<%@page import="com.hms.ehat.controller.MarkVisitController"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.itextpdf.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.itextpdf.text.html.simpleparser.StyleSheet"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.ipdbill.dto.BillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.dto.MultiBillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.serviceImpl.BillServiceImpl"%>
<%@page import="com.hms.ipdbill.service.BillService"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@ page import="com.hms.ehat.dto.CurrencyTypeDto"%>

<!-- NEW END -->
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
<title>RIS Print</title>
</head>
<body>

	<%
		try {

			response.setContentType("application/pdf");
			CurrencyTypeService fetchOneCurrency=(ApplicationContextUtils.getApplicationContext()).getBean(CurrencyTypeService.class);
			List<CurrencyTypeDto> listServiceCurrencyDto=fetchOneCurrency.getOneCurrencyList();
			String currencyCode=listServiceCurrencyDto.get(0).getCurrencyCode();
 			String currencyName=listServiceCurrencyDto.get(0).getCurrencyName();
		
 			HttpSession session2 = request.getSession();
			int hospitalUnitId= (Integer) session2.getAttribute("uId");
			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			//List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
		    List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);
			
			/* aniket for RIS data START */
			
			RisController risController = (ApplicationContextUtils.getApplicationContext()).getBean(RisController.class);
			ViewRisRecordsDTO risDTO = new ViewRisRecordsDTO();			
			List<ViewRisRecordsDTO> listViewRisRecordsDTO = null;
			listViewRisRecordsDTO = risController.getSingleRISRecord(Integer.parseInt(request.getParameter("pkViewRisRecordsDTO")));
			
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
			
			
			/* aniket for RIS data START */
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String billPrint = (String) resourceBundle.getObject("billPrint").toString();
			String billPrintsHeader = (String) resourceBundle.getObject("billPrintsHeader").toString();	
			String concessionFlow = (String) resourceBundle.getObject("concessionFlow").toString();	
			
			ResourceBundle hospitalaccess = ResourceBundle.getBundle("hospitalaccess");
			String hospitalname = (String) hospitalaccess.getObject("hospitalname").toString();	
			
			//String fontName = application.getRealPath("fonts\\Shivaji05.ttf");
			//FontFactory.register(fontName);String fontName="";
			String fontName="";
			if (OSValidator.isWindows()) {
				fontName = application.getRealPath("\\fonts\\Shivaji05.ttf");//System.getProperty("jboss.server.data.dir") + "\\patImages\\";
			} else if (OSValidator.isMac()) {
				System.out.println("This is Mac");
			} else if (OSValidator.isUnix()) {
				fontName = application.getRealPath("/fonts/Shivaji05.ttf");//System.getProperty("jboss.server.data.dir") + "/patImages/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
			FontFactory.register(fontName);
			
			

			//for centerpatientId
		    String patientId= resourceBundle.getObject("patientIdLabel").toString();
			
			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			
			if(billPrintsHeader.contains("off")){
				
				document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
				
			}
			document.setMargins(50, 20, 35, 0);

			PdfWriter.getInstance(document, outStream);
			document.open();
		
			/* -------------------- Define Fonts ---------------------------  */			
			Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font subheader = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
			Font subheaderAdv = new Font(Font.FontFamily.HELVETICA, 9, Font.BOLD);
			Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
			header.setColor(10, 4, 2);

			Font tableheader = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font tabletext = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
			Font tabletextAdv = new Font(Font.FontFamily.HELVETICA, 9, Font.NORMAL);
			Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
			/* -------------------- Define Fonts ---------------------------  */
			
			session = request.getSession();
			String user_name = (String) session.getAttribute("userName");
			
			String path = hospObj.getFilePath();
			String hospitalName = hospObj.getHospitalName();
			//hospitalName = hospitalName.toUpperCase();			
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
			String nabh = hospObj.getNabhImagePath(); 
			String nabhLogo = application.getRealPath(nabh);
			
			Image img = null;
			PdfPCell cell = null;
			try {
				img = Image.getInstance(path1);
				img.scaleAbsolute(100, 60);
				cell = new PdfPCell();
				cell.addElement(new Chunk(img, 5, -40));
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
// 			int patId=Integer.parseInt(request.getParameter("patId"));
// 			Integer treatmentId = Integer.parseInt(request.getParameter("treatId"));
// 			Integer unitId = Integer.parseInt(request.getParameter("unitId"));
// 			int recId = Integer.parseInt(request.getParameter("recId"));

			int patId=Integer.parseInt(request.getParameter("patID"));
			Integer treatmentId = Integer.parseInt(request.getParameter("treatID"));
//			Integer unitId = Integer.parseInt(request.getParameter("unitId"));
			int recId = 0;
			
			
			//String chemoDate=request.getParameter("chemoDate");
			
	//		String languageOF = request.getParameter("instructionLanguage"); 
	//		System.err.println("languageOF======="+ languageOF + " --> treatmentId : " + treatmentId + " ---> patId : " + patId);
			
			//calling service leyer method to get patient records
			RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
			List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
			ltRegMasterDto =us.fetchPatientsRecordByTreatmentId(treatmentId);
							
			Integer departmentId=ltRegMasterDto.get(0).getDepartmentId();
			String pname  =ltRegMasterDto.get(0).getPatientName();
			String MRNo   =ltRegMasterDto.get(0).getMrnno();
			String age	  =ltRegMasterDto.get(0).getAge();
			String gender =ltRegMasterDto.get(0).getGender();
			
			String newAge="";
		String newAge1="";
		
		/* if((age.split("Yrs")[0]).equalsIgnoreCase("0")){        
			if((age.split("M")[0]).equalsIgnoreCase("0Yrs, 0")){  
				newAge=(age.split("/")[2]);                   }
			else{                   
				newAge=(age.split("/")[1])+"/"+(age.split("/")[2]);  
	   					}          }else{
		   					newAge=age;             
		   } */
		
		String ptage="";
		if((age.split("/")[0]).equalsIgnoreCase("0Y")){ 
			if((age.split("/")[1]).equalsIgnoreCase("0M")){
				ptage=(age.split("/")[2]);                  
				}else{
					if((age.split("/")[2]).equalsIgnoreCase("0D")){
						ptage=(age.split("/")[1]); 
					}else{
						ptage=(age.split("/")[1])+"/"+(age.split("/")[2]); 
					}
				}                                 
			}else{
				
				if((age.split("/")[1]).equalsIgnoreCase("0M")){
					if((age.split("/")[2]).equalsIgnoreCase("0D")){
						ptage=age.split("/")[0];
					}else{
						ptage=age.split("/")[0]+"/"+age.split("/")[2];
					}
				}else{
					if((age.split("/")[2]).equalsIgnoreCase("0D")){
						ptage=age.split("/")[0]+"/"+age.split("/")[1];
					}else{
						ptage=age;
					}
				}
				      
			}
		
			//String AgeSexWt = age + " /" + gender;
			String AgeSexWt = ptage + " /" + gender;

			String treatmentCount = ltRegMasterDto.get(0).getTrcount();
			String ContactNo = ltRegMasterDto.get(0).getMobile();
			int Departmentid = ltRegMasterDto.get(0).getDepartmentId();
			String TokenNo = ltRegMasterDto.get(0).getTokenno();
			Date appDate = ltRegMasterDto.get(0).getCreatedDateTime();
			String opdipdno = ltRegMasterDto.get(0).getOpdipdno();
			String weight = ltRegMasterDto.get(0).getWeight();
			String height = ltRegMasterDto.get(0).getHeight();
			String wetHeg = weight + " /" + height;
			String docId = ltRegMasterDto.get(0).getDoctorId();
			String docName = "";
			int count = 0;
			String refDoc  	=ltRegMasterDto.get(0).getDocName();
			
			String[] opdno = {};
			if(opdipdno.contains("/")){
				opdno=opdipdno.split("/");
			}
			/* if(docId.length()>0){
				
				if(docId.contains(",")){
					
					String dId[]=docId.split(",");
					if(doctorId > 0){
						Consultant   = fetchlist.getStringValOfObject("doctor","doc_name",dId,"Doctor_ID");
					}
					
					for(int a=0;a<docId.length();a++){
						count++;
					}
				}
			} */
			// patient address
			String patientAdd = "";
			String perPatientAdd = "";
			String relativeName ="";
			int relationId=0;
			String relation="";
						
			 int stateId = ltRegMasterDto.get(0).getStateId();
			 int townId   =ltRegMasterDto.get(0).getTownId();
			 int districtId =ltRegMasterDto.get(0).getDistrictId();
			 int talukaId   =ltRegMasterDto.get(0).getTalukaId();
			 int sponsorSlave=ltRegMasterDto.get(0).getChargesMasterSlaveId();
			 
			 String BillCategoryName ="";
			 String state  ="";
			 String district  ="";
			 String cityObj  ="";
			 String taluka  ="";
			 
			//For Permanent Address on 08-May-2018.
			 int perstateId = ltRegMasterDto.get(0).getPerstateId();
			 int pertownId   =ltRegMasterDto.get(0).getPertownId();
			 int perdistrictId =ltRegMasterDto.get(0).getPerdistrictId();
			 int pertalukaId   =ltRegMasterDto.get(0).getPertalukaId();
			 
			 String perstate  ="";
			 String perdistrict  ="";
			 String percityObj  ="";
			 String pertaluka  ="";
			 
 			 patientAdd=ltRegMasterDto.get(0).getAddress();
			 
 			/* if(ltRegMasterDto.get(0).getPerAddress()!=null){
				 perPatientAdd=ltRegMasterDto.get(0).getPerAddress();
			 } */
			
			 relativeName=ltRegMasterDto.get(0).getRelativeName();
			 
			 relationId= ltRegMasterDto.get(0).getRelationId();
			 
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
			 
			LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
			AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
			List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
			
			/* if(doctorId > 0){
				Consultant   = fetchlist.getStringValOfObject("doctor","doc_name",doctorId,"Doctor_ID");
			} */			
			
			if(stateId > 0 ){
				state   = fetchlist.getStringValOfObject("state","state_name",stateId,"idstate");
			}else{
				state   = " ";
			}
			if(districtId > 0){
				district = fetchlist.getStringValOfObject("district","dis_name",districtId,"iddistrict"); 
			}else{
				district   = " ";
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
				
				
			
			BillService hm = (ApplicationContextUtils.getApplicationContext()).getBean(BillService.class);				
			List<BillReceiptMasterDTO> lstPojo = new ArrayList<BillReceiptMasterDTO>();
			String pendFlag = request.getParameter("pendFlag");
			String callFrom = request.getParameter("callFrom");
			String isHeader = request.getParameter("isHeader");
			

			Integer patBillId = ltRegMasterDto.get(0).getBillId();
			String billId = String.valueOf(ltRegMasterDto.get(0)
					.getBillId());
			String PatientID = String.valueOf(ltRegMasterDto.get(0)
					.getPatientId());

			lstPojo = hm.getOpdRecDetails(patBillId, treatmentId, patId,
					recId, callFrom);
			
			String discRemark = "";
			int recCount = 0;
			int againstId = 0;
			String receiptNo = "";
			String againstNo = "";
			
			if(lstPojo.size() !=0)
			{
				 discRemark = lstPojo.get(0).getDiscRemark();
				 recCount = lstPojo.get(0).getReceiptCount();
				 againstId = lstPojo.get(0).getAgainstId();
				 receiptNo = String.valueOf(recCount);
				 againstNo = String.valueOf(againstId); 
			}
			
			
			int len = ltRegMasterDto.get(0).getListEhatBillPrefix().size();

			for (int n = 0; n < len; n++) {

				EhatBillPrefix lst = ltRegMasterDto.get(0)
						.getListEhatBillPrefix().get(n);
				// For Patient Id
				String patntId = String.valueOf(ltRegMasterDto.get(0)
						.getPatientId());
				if (lst.getDepId() == 4) {

					String prefix = lst.getBillPrefix();
					String middle = lst.getBillMiddle();
					String sufix = lst.getBillSuffix();
					String patIdPrefix = prefix + patId + sufix;
				}
				// For Patient Id

				// For bill Id
				String billGenId = String.valueOf(ltRegMasterDto.get(0)
						.getInvoiceCount());
				if ((lst.getBillRecBoth() == 1 || lst.getBillRecBoth() == 3)) {

					String prefix = lst.getBillPrefix();
					String middle = lst.getBillMiddle();
					String sufix = lst.getBillSuffix();
					String billIdPrefix = prefix + billGenId + sufix;
				}
				// For bill Id

				// For Rec Id
				receiptNo = String.valueOf(recCount);
				if ((lst.getBillRecBoth() == 2 || lst.getBillRecBoth() == 3)) {

					String prefix = lst.getBillPrefix();
					String middle = lst.getBillMiddle();
					String sufix = lst.getBillSuffix();
					receiptNo = prefix + receiptNo + sufix;
					againstNo = prefix + againstId + sufix;
				}
				// For Rec Id

			}

			//irfan khan 11-jan-2018 multi pay mode list
			List<MultiBillReceiptMasterDTO> listMultiPay = new ArrayList<MultiBillReceiptMasterDTO>();
			listMultiPay = hm.getMultiRecDetails(patBillId, treatmentId,patId, recId, departmentId);
			
			// start RIS Data

			  /*  RisController risController=(ApplicationContextUtils.getApplicationContext()).getBean(RisController.class); */
          RadiologyTemplateReportDTO rtd1 = new RadiologyTemplateReportDTO();  
          rtd1 = risController.getRisReportRecordForPrint(patID,testId,radiologyTestId,treatId,idRadiologyTestReport);
          Date reportingDate = rtd1.getListRadiologyTempReportDTO().get(0).getCreatedDate();
          
          String dtTime="";
          SimpleDateFormat sdf1 = new SimpleDateFormat("dd-MMM-yyyy", Locale.ENGLISH);
          dtTime=sdf1.format(reportingDate);

			DecimalFormat df2 = new DecimalFormat("0.00");

			// patient address
			String addressPatient = "";
			String per_patient_address = "";
			
			if (!cityObj.trim().equals("0") && !cityObj.trim().equals("undefined") && !cityObj.trim().equals("")) {
			    addressPatient += cityObj.trim();
			}
			if (!taluka.trim().equals("0") && !taluka.trim().equals("undefined") && !taluka.trim().equals("")) {
			    addressPatient += (", " + taluka.trim() + ", ");
			}
			if (!district.trim().equals("0") && !district.trim().equals("undefined") && !district.trim().equals("")) {
			    addressPatient += (district.trim() + ", ");
			}
			if (!state.trim().equals("0") && !state.trim().equals("undefined") && !state.trim().equals("")) {
			    addressPatient += (state.trim());
			}

			// Print the final address
			System.out.println("Final Address: " + addressPatient);
			
			// Strat : permanant patient address
			if(percityObj != "0" && !percityObj.equals("undefined") && !percityObj.equals("")){
				per_patient_address += percityObj;
			}
			
			if (pertaluka != "0" && !pertaluka.equals("undefined") && !pertaluka.equals("")) 
			{
				per_patient_address +=  (", "+pertaluka);
			}						
			if (perdistrict != "0" && !perdistrict.equals("undefined") && !perdistrict.equals("")) 
			{
				per_patient_address += (", " + perdistrict);
			}
			if (perstate != "0" && !perstate.equals("undefined") && !perstate.equals("")) 
			{
				per_patient_address += (", " + perstate);
			}
			// end : permanant patient address
							
						
			//For No. of prints.
			//AdminModel adminModel = new AdminModel();
			int printId = 2;
			int numOfPrint = 1; // adminModel.generalAccessNumOfPrint(printId);// to get number of prints
			for (int cnt = 0; cnt < numOfPrint; cnt++) {
				
			document.newPage();			

			// Table 1 : For hospital adress details start

			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 30, 80, 30 };
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

			if(isHeader.equals("withHf")){
			if (img == null) {

				HeaderTable1.addCell(new Phrase("", header));
			} else {

				HeaderTable1.addCell(cell);
			}

			Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
			Font bold = new Font(FontFamily.TIMES_ROMAN, 15, Font.BOLD);
			Phrase p = new Phrase();
			p.add(new Chunk(" "+hospitalName, bold));			
			p.add(new Chunk(" \n\n"+address, tabletext));			
			p.add(new Chunk(" "+city+" Pin- "+hospitalZip+"\n", tabletext));
			p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
            if(!webste.equalsIgnoreCase("")){
			p.add(new Chunk(" \n "+webste, tabletext));
			}
			p.add(new Chunk(" \n "+"email: "+email, tabletext));			//p.add(new Chunk(" \nPAN No : "+panNo , tabletext));	
		/* 	p.add(new Chunk(" \nCIN: "+cinNo+", GST : "+gstNo , tabletext));	
			p.add(new Chunk(" \nSERVICE TAX NO : "+serviceTaxNo+", PAN No: "+panNo, tabletext));	 */
			
			PdfPCell hospitalNameCell = new PdfPCell(p);				
			hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(hospitalNameCell);

			if (billPrintsHeader.contains("on")) {

				if (billPrint.contains("on")) {

					if (img == null) {

						HeaderTable1.addCell(new Phrase("", header));
					} else {

						HeaderTable1.addCell("");
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

		HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(new Phrase("", header));
		document.add(HeaderTable1);
		HeaderTable1.flushContent();
	}

			
			}
					
			// Table 1 : For hospital adress details end

			// Table 2 : For receipt head start

			PdfPTable HeaderTable2 = new PdfPTable(5);
			int[] headerwidth2 = { 15, 24, 40, 9, 20 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);

			if (billPrintsHeader.contains("off")) {

				HeaderTable2.setSpacingBefore(70f);
			}

			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(new Phrase("", subheader));
			PdfPCell subcell = new PdfPCell(new Phrase("", subheader));
			subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
			subcell.setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(subcell);
			HeaderTable2.addCell(new Phrase("    	REPORT ", header));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			if(isHeader.equals("withHf"))
			{
			document.add(HeaderTable2);
			HeaderTable2.flushContent();
			}

			// Table 2 : For receipt head end

			RegistrationController regCon = (ApplicationContextUtils
					.getApplicationContext())
					.getBean(RegistrationController.class);
			RegTreBillDto rtd = new RegTreBillDto();
			List<RegTreBillDto> ltPatientRecord = null;
			String PType = "";
			if (regCon != null) {

				rtd = regCon.fetchPatientsRecordByTreatmentId(treatmentId);
				rtd = rtd.getListRegTreBillDto().get(0);
				rtd.getPatientName();

				int a = rtd.getSourceTypeId();
				if (a > 0) {
					PType = "Sponsor";
				} else {
					PType = "Self";
				}
			}
			
			
			// For ref doc start
			String refDrName = "";
			if(!rtd.getRefDoctorName().equalsIgnoreCase(null))
			{	  refDrName = rtd.getRefDoctorName();	
			}
			
			/* ChannelHospitalMgmtService objChannelingModel = (ApplicationContextUtils.getApplicationContext()).getBean(ChannelHospitalMgmtService.class);	
			List<HospitalDetailsDTO> arrChanelling_doctor = new ArrayList<HospitalDetailsDTO>();
			arrChanelling_doctor = objChannelingModel.setExistingHospitalTemp(1, request);
			
			String refDrName="";
			int refDrId=ltRegMasterDto.get(0).getRefDocId();
			for(HospitalDetailsDTO objRef : arrChanelling_doctor){
				
				if(refDrId==objRef.getHosId()){
					
					refDrName=objRef.getHos_name();
				}
			} */	
			// For
			
			double paidAmt = 0.0;
			double totConAmt = 0.0;
			double totRemain = 0.0;
			
			if(lstPojo.size() != 0)
			{
				 paidAmt = lstPojo.get(0).getFirstPaid();
				 totConAmt = lstPojo.get(0).getFirstDisc();
				 totRemain = lstPojo.get(0).getFirstRemain();

				totConAmt = totConAmt + lstPojo.get(0).getActualTotConcn();
			}
			

			SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yyyy", Locale.ENGLISH);
			SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm a");
			SimpleDateFormat sdf3 = new SimpleDateFormat(
					"dd/MM/yyyy HH:mm a");
			Date now = new Date(new java.util.Date().getTime());
			String strDate = sdf.format(now);
			String rtime = sdf2.format(now);
			String rtimeDate = sdf3.format(now);

			String age2 = ltRegMasterDto.get(0).getAge2();
			String dob = ltRegMasterDto.get(0).getDob();

			if (dob.equals("") || dob.equals(null)) {
				AgeSexWt = ptage + "    " + gender;
			}

			if (!docId.equals("") && !docId.contains(",")) {

				int doctorId = Integer.parseInt(docId);
				if (doctorId > 0) {
					docName = fetchlist.getStringValOfObject("doctor",
							"doc_name", doctorId, "Doctor_ID");
				}
			}
			
			int chargesSlaveId =0;
			if(lstPojo.size() != 0)
			{
				 chargesSlaveId=lstPojo.get(0).getSponsorCatId();
			}
			
			/* if(chargesSlaveId > 0){
				fetchsposor   = obj.fetchSuperCatofchargesSlave(chargesSlaveId);
				if(fetchsposor.size() >0){
					BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
				}
				
				BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",chargesSlaveId,"id"); 
			
			}else{
				BillCategoryName = "Self";
			} */
			
			if(sponsorSlave > 0){
				fetchsposor   = obj.fetchSuperCatofchargesSlave(sponsorSlave);
			//	BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
				BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id");
			}else{
				BillCategoryName = "Self";
			}

			// Table3 : For patient header info start

			PdfPTable HeaderTable3 = new PdfPTable(4);
			int[] headerwidth3 = { 20, 50, 20, 50 };
			HeaderTable3.setWidths(headerwidth3);
			HeaderTable3.setWidthPercentage(95f);
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			//AdminModel admodel1 = new AdminModel();
			Doctor doc2 = new Doctor();
			List<Doctor> listDoc2 = null;
			
		
			if(totRemain==0){
				
				if(hospitalname.equalsIgnoreCase("Siddhivinayak")){
					if(isHeader.equals("withoutHf"))
					{
						// Table3 : For patient header info start Siddhivinayak specific

						PdfPTable HeaderTable4 = new PdfPTable(3);
						int[] headerwidth4 = { 15, 50, 35};
						HeaderTable4.setWidths(headerwidth4);
						HeaderTable4.setWidthPercentage(95f);
						HeaderTable4.setSpacingBefore(15f);
					    HeaderTable4.getDefaultCell().setPadding(3); 
					//	HeaderTable4.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
						HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						//HeaderTable4.setHorizontalAlignment(Element.ALIGN_LEFT);
						//HeaderTable4.setSpacingBefore(20f);
						
						
						
						HeaderTable4.addCell(new Phrase("Report Date  ",subheaderAdv));
						HeaderTable4.addCell(new Phrase(" : " +dtTime , tabletextAdv));
						HeaderTable4.addCell(new Phrase(" ",subheader));
						
						if(receiptNo == ""){
							HeaderTable4.addCell(new Phrase("Receipt Date Time ",subheaderAdv));
							HeaderTable4.addCell(new Phrase(" : " +strDate+" "+rtime , tabletextAdv));
							HeaderTable4.addCell(new Phrase(" ",subheader));
						}
						else
						{
							HeaderTable4.addCell(new Phrase("Receipt No./Date Time ",subheaderAdv));
							HeaderTable4.addCell(new Phrase(" : " +receiptNo+"/ "+strDate+" "+rtime , tabletextAdv));
							HeaderTable4.addCell(new Phrase(" ",subheader));
						}
						
						HeaderTable4.addCell(new Phrase("Patient Id ",subheaderAdv));
						HeaderTable4.addCell(new Phrase(" : "+rtd.getCenterPatientId(),tabletextAdv));
						HeaderTable4.addCell(new Phrase(" ",subheader));

						HeaderTable4.addCell(new Phrase("OPD. No. ",subheaderAdv));
						HeaderTable4.addCell(new Phrase(" : "+opdipdno,tabletextAdv));
						HeaderTable4.addCell(new Phrase(" ",subheader));
						
						
						
						/* HeaderTable4.addCell(new Phrase("Patient ID ", subheader));
						HeaderTable4.addCell(new Phrase(" : "+PatientID, tabletext)); */
						
						
						 
						HeaderTable4.addCell(new Phrase("Patient Name ",subheaderAdv));
						HeaderTable4.addCell(new Phrase(" : "+pname,tabletextAdv));
						HeaderTable4.addCell(new Phrase(" ",subheader));

						//HeaderTable4.addCell(new Phrase("Treatment ID ", subheader));
						//HeaderTable4.addCell(new Phrase(" : "+treatmentId, tabletext));
						
						//HeaderTable4.addCell(new Phrase("Token No. ", subheader));
						//HeaderTable4.addCell(new Phrase(" : "+TokenNo, tabletext));
						
					 	HeaderTable4.addCell(new Phrase("Age/Gender ", subheaderAdv));
						HeaderTable4.addCell(new Phrase(" : "+ AgeSexWt, tabletextAdv));
						HeaderTable4.addCell(new Phrase(" ",subheader));
						
						 
						
						/* HeaderTable4.addCell(new Phrase("Contact No ", subheader));
						HeaderTable4.addCell(new Phrase(" : "+ ContactNo, tabletext)); */
						
						/*  if(!addressPatient.equals(",") && !patientAdd.equals(","))
						{
						HeaderTable4.addCell(new Phrase("Res. Address ",	subheader));		
						HeaderTable4.addCell(new Phrase(" : "+patientAdd.toLowerCase()+" "+ addressPatient.toLowerCase(), tabletext));
						} */
						
						/* if(perPatientAdd !="" || per_patient_address != "" && !per_patient_address.equals("undefined") && per_patient_address != null && perPatientAdd !=null)
						{
							HeaderTable4.addCell(new Phrase("Per. Address ",subheader));
							HeaderTable4.addCell(new Phrase(" : "+perPatientAdd+" "+per_patient_address,	tabletext));
						}
						
						if(relativeName != "" && relativeName!="undefined" && relativeName != null)
						{
							HeaderTable4.addCell(new Phrase("Relative Name ",subheader));
							HeaderTable4.addCell(new Phrase(" : "+relation+"-"+relativeName,	tabletext));
						} */
						
						/* HeaderTable4.addCell(new Phrase("Ref. By  ",subheader));
						HeaderTable4.addCell(new Phrase(" : "+refDoc, tabletext)); */
						HeaderTable4.addCell(new Phrase("Ref. By  ",subheaderAdv));
						HeaderTable4.addCell(new Phrase(" : "+refDrName, tabletextAdv));
						HeaderTable4.addCell(new Phrase(" ",subheader));
						
						if(rtd.getDoctorId().contains(",")){
							String[] doctors = rtd.getDoctorId().split(",") ;
							String Doc_Nme = "";
							String Depart = "";
							for(String str :doctors )
							{
								String DocID = str;
								int docId23 =  Integer.parseInt(str);
								//listDoc2 = admodel1.getDoctorsDepDetails(docId23);
								 Doc_Nme = "";//Doc_Nme + listDoc2.get(0).getDoc_name()+",";
								 Depart = "";//Depart + listDoc2.get(0).getDepartmentName()+",";
							}
							
							
							/* HeaderTable4.addCell(new Phrase("Consultant", subheader));
							HeaderTable4.addCell(new Phrase(": "+Doc_Nme, tabletext));		 */	
							HeaderTable4.addCell(new Phrase("", subheaderAdv));
							HeaderTable4.addCell(new Phrase("", tabletextAdv)); 
							HeaderTable4.addCell(new Phrase(" ",subheader));

						}
						else{
							
							/* if(!rtd.getDoctorId().equalsIgnoreCase("") && rtd.getDoctorId() != ""){
							
								int docId1 =  Integer.parseInt(rtd.getDoctorId());
								//listDoc2 = admodel1.getDoctorsDepDetails(docId1);
								
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", tabletext));
								HeaderTable4.addCell(new Phrase("Consultant Doc.", subheader));
								HeaderTable4.addCell(new Phrase(": "+rtd.getDoctorName(), tabletext));					
								
							} */
						}
						
						/* HeaderTable4.addCell(new Phrase("Under Care ",	subheader));		
						HeaderTable4.addCell(new Phrase(" : ", tabletext)); */
						//HeaderTable4.addCell(new Phrase("HSN Code",subheader));
						
						HeaderTable4.addCell(new Phrase("Sponsor ",subheaderAdv));
						HeaderTable4.addCell(new Phrase(" : " + BillCategoryName+"\n", tabletextAdv));
						HeaderTable4.addCell(new Phrase(" ",subheader));
						
						HeaderTable4.addCell(new Phrase("", subheader));
						HeaderTable4.addCell(new Phrase("", tabletext)); 
						HeaderTable4.addCell(new Phrase(" ",subheader));
						
						
						document.add(HeaderTable4);
						HeaderTable4.flushContent();
					}
					else{
					
					HeaderTable3.addCell(new Phrase("Report Date  ",subheader));
					HeaderTable3.addCell(new Phrase(" : " +dtTime , tabletext));
					if(receiptNo == ""){
						HeaderTable3.addCell(new Phrase("Receipt Date Time ",subheader));
						HeaderTable3.addCell(new Phrase(" : " +strDate+" "+rtime , tabletext));
					}
					else
					{
						HeaderTable3.addCell(new Phrase("Receipt No./Date Time ",subheader));
						HeaderTable3.addCell(new Phrase(" : " +receiptNo+"/ "+strDate+" "+rtime , tabletext));
					}
					
					HeaderTable3.addCell(new Phrase("Patient Id ",subheader));
					HeaderTable3.addCell(new Phrase(" : "+rtd.getCenterPatientId(),tabletext));

					HeaderTable3.addCell(new Phrase("OPD. No. ",subheader));
					HeaderTable3.addCell(new Phrase(" : "+opdipdno,tabletext));
					
					
					
					/* HeaderTable3.addCell(new Phrase("Patient ID ", subheader));
					HeaderTable3.addCell(new Phrase(" : "+PatientID, tabletext)); */
					
					
					 
					HeaderTable3.addCell(new Phrase("Patient Name ",subheader));
					HeaderTable3.addCell(new Phrase(" : "+pname,tabletext));

					//HeaderTable3.addCell(new Phrase("Treatment ID ", subheader));
					//HeaderTable3.addCell(new Phrase(" : "+treatmentId, tabletext));
					
					//HeaderTable3.addCell(new Phrase("Token No. ", subheader));
					//HeaderTable3.addCell(new Phrase(" : "+TokenNo, tabletext));
					
				 	
					
					 
					
					HeaderTable3.addCell(new Phrase("Mobile No ", subheader));
					HeaderTable3.addCell(new Phrase(" : "+ ContactNo, tabletext));
					
					HeaderTable3.addCell(new Phrase("Age/Gender ", subheader));
					HeaderTable3.addCell(new Phrase(" : "+ AgeSexWt, tabletext));
					
					 if(!addressPatient.equals(",") && !patientAdd.equals(","))
					{
					HeaderTable3.addCell(new Phrase("Res. Address ",	subheader));		
					HeaderTable3.addCell(new Phrase(" : "+patientAdd.toLowerCase()+" "+ addressPatient.toLowerCase(), tabletext));
					}
					
					/* if(perPatientAdd !="" || per_patient_address != "" && !per_patient_address.equals("undefined") && per_patient_address != null && perPatientAdd !=null)
					{
						HeaderTable3.addCell(new Phrase("Per. Address ",subheader));
						HeaderTable3.addCell(new Phrase(" : "+perPatientAdd+" "+per_patient_address,	tabletext));
					}
					
					if(relativeName != "" && relativeName!="undefined" && relativeName != null)
					{
						HeaderTable3.addCell(new Phrase("Relative Name ",subheader));
						HeaderTable3.addCell(new Phrase(" : "+relation+"-"+relativeName,	tabletext));
					} */
					
					/* HeaderTable3.addCell(new Phrase("Ref. By  ",subheader));
					HeaderTable3.addCell(new Phrase(" : "+refDoc, tabletext)); */
					HeaderTable3.addCell(new Phrase("Ref. By  ",subheader));
					HeaderTable3.addCell(new Phrase(" : "+refDrName, tabletext));
					
					if(rtd.getDoctorId().contains(",")){
						String[] doctors = rtd.getDoctorId().split(",") ;
						String Doc_Nme = "";
						String Depart = "";
						for(String str :doctors )
						{
							String DocID = str;
							int docId23 =  Integer.parseInt(str);
							//listDoc2 = admodel1.getDoctorsDepDetails(docId23);
							 Doc_Nme = "";//Doc_Nme + listDoc2.get(0).getDoc_name()+",";
							 Depart = "";//Depart + listDoc2.get(0).getDepartmentName()+",";
						}
						
						
						HeaderTable3.addCell(new Phrase("Consultant", subheader));
						HeaderTable3.addCell(new Phrase(": "+Doc_Nme, tabletext));			
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", tabletext)); 

					}
					else{
						
						if(!rtd.getDoctorId().equalsIgnoreCase("") && rtd.getDoctorId() != ""){
						
							int docId1 =  Integer.parseInt(rtd.getDoctorId());
							//listDoc2 = admodel1.getDoctorsDepDetails(docId1);
							
							HeaderTable3.addCell(new Phrase("", subheader));
							HeaderTable3.addCell(new Phrase("", tabletext));
							HeaderTable3.addCell(new Phrase("Consultant Doc.", subheader));
							HeaderTable3.addCell(new Phrase(": "+rtd.getDoctorName(), tabletext));					
							
						}
					}
					
					/* HeaderTable3.addCell(new Phrase("Under Care ",	subheader));		
					HeaderTable3.addCell(new Phrase(" : ", tabletext)); */
					//HeaderTable3.addCell(new Phrase("HSN Code",subheader));
					
					HeaderTable3.addCell(new Phrase("Sponsor ",subheader));
					HeaderTable3.addCell(new Phrase(" : " + BillCategoryName+"\n", tabletext));
					HeaderTable3.addCell(new Phrase("Age ", subheader));
					HeaderTable3.addCell(new Phrase(": "+rtd.getAge(), tabletext));
					
					
					}
					
				}else
				{
				HeaderTable3.addCell(new Phrase("OPD. No. ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+opdipdno,tabletext));
				
				HeaderTable3.addCell(new Phrase("Receipt No. ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+receiptNo,tabletext));
				
				/* HeaderTable3.addCell(new Phrase("Patient ID ", subheader));
				HeaderTable3.addCell(new Phrase(" : "+PatientID, tabletext)); */
				
				HeaderTable3.addCell(new Phrase(" Patient Id ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+rtd.getCenterPatientId(),tabletext));
				 
				HeaderTable3.addCell(new Phrase("Patient Name ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+pname,tabletext));

				//HeaderTable3.addCell(new Phrase("Treatment ID ", subheader));
				//HeaderTable3.addCell(new Phrase(" : "+treatmentId, tabletext));
				
				//HeaderTable3.addCell(new Phrase("Token No. ", subheader));
				//HeaderTable3.addCell(new Phrase(" : "+TokenNo, tabletext));
				
			 	HeaderTable3.addCell(new Phrase("Age/Gender ", subheader));
				HeaderTable3.addCell(new Phrase(" : "+ AgeSexWt, tabletext));
				
				HeaderTable3.addCell(new Phrase("Report Date  ",subheader));
				HeaderTable3.addCell(new Phrase(" : " +dtTime , tabletext)); 
				
				HeaderTable3.addCell(new Phrase("Contact No ", subheader));
				HeaderTable3.addCell(new Phrase(" : "+ ContactNo, tabletext));
				
				HeaderTable3.addCell(new Phrase("Receipt Date ",subheader));
				HeaderTable3.addCell(new Phrase(" : " +strDate , tabletext));
				
				HeaderTable3.addCell(new Phrase("Res. Address ",	subheader));		
				HeaderTable3.addCell(new Phrase(" : "+patientAdd.toLowerCase()+" "+ addressPatient.toLowerCase(), tabletext));
				
				if(perPatientAdd !="" || per_patient_address != "" && !per_patient_address.equals("undefined") && per_patient_address != null && perPatientAdd !=null)
				{
					HeaderTable3.addCell(new Phrase("Per. Address ",subheader));
					HeaderTable3.addCell(new Phrase(" : "+perPatientAdd+" "+per_patient_address,	tabletext));
				}
				
				if(relativeName != "" && relativeName!="undefined" && relativeName != null)
				{
					HeaderTable3.addCell(new Phrase("Relative Name ",subheader));
					HeaderTable3.addCell(new Phrase(" : "+relation+"-"+relativeName,	tabletext));
				}
				
				HeaderTable3.addCell(new Phrase("Receipt Time ",subheader));
				HeaderTable3.addCell(new Phrase(" : " +rtime , tabletext));
				
				/* HeaderTable3.addCell(new Phrase("Ref. By  ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+refDoc, tabletext)); */
				HeaderTable3.addCell(new Phrase("Ref. By  ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+refDrName, tabletext));
				
				if(rtd.getDoctorId().contains(",")){
					String[] doctors = rtd.getDoctorId().split(",") ;
					String Doc_Nme = "";
					String Depart = "";
					for(String str :doctors )
					{
						String DocID = str;
						int docId23 =  Integer.parseInt(str);
						//listDoc2 = admodel1.getDoctorsDepDetails(docId23);
						 Doc_Nme = "";//Doc_Nme + listDoc2.get(0).getDoc_name()+",";
						 Depart = "";//Depart + listDoc2.get(0).getDepartmentName()+",";
					}
					
					
					HeaderTable3.addCell(new Phrase("Consultant", subheader));
					HeaderTable3.addCell(new Phrase(": "+Doc_Nme, tabletext));			
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", tabletext)); 

				}
				else{
					
					if(!rtd.getDoctorId().equalsIgnoreCase("") && rtd.getDoctorId() != ""){
					
						int docId1 =  Integer.parseInt(rtd.getDoctorId());
						//listDoc2 = admodel1.getDoctorsDepDetails(docId1);
						
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", tabletext));
						HeaderTable3.addCell(new Phrase("Consultant Doc.", subheader));
						HeaderTable3.addCell(new Phrase(": "+rtd.getDoctorName(), tabletext));					
						
					}
				}
				
				/* HeaderTable3.addCell(new Phrase("Under Care ",	subheader));		
				HeaderTable3.addCell(new Phrase(" : ", tabletext)); */
				//HeaderTable3.addCell(new Phrase("HSN Code",subheader));
				
				HeaderTable3.addCell(new Phrase("Sponsor ",subheader));
				HeaderTable3.addCell(new Phrase(" : " + BillCategoryName, tabletext));
				HeaderTable3.addCell(new Phrase("Age ", subheader));
				HeaderTable3.addCell(new Phrase(": "+rtd.getAge(), tabletext));
				
				
			}	
			}
			
		
			if(isHeader.equals("withHf"))
			{
				document.add(HeaderTable3);
				HeaderTable3.flushContent();				
			}	
			
		

			
			PdfPTable HeaderTable5 = new PdfPTable(7);
			int[] headerwidth5 = { 27, 40, 30, 10, 15, 40, 20 };
			HeaderTable5.setWidths(headerwidth5);
			HeaderTable5.setWidthPercentage(95f);
			if(hospitalname.equalsIgnoreCase("Siddhivinayak") && isHeader.equals("withoutHf")){
					HeaderTable5.setSpacingBefore(2f);
			}
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

		
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));

			document.add(HeaderTable5);
			HeaderTable5.flushContent();


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
if(hospitalname.equalsIgnoreCase("Siddhivinayak"))
HeaderTable29.addCell(new Phrase("" + "", header));
else
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


			
         
        	 
        	 
        	 
        	
        	 
         


//End RIS  Data

			// Table5 : For service details head start

			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));

			document.add(HeaderTable5);
			HeaderTable5.flushContent();

			// Table5 : For service details head end

			
			
			
			
			
		
			// Table6 : For receipt footer end

			// Table4 : For page footer start

			PdfPTable HeaderTable4 = new PdfPTable(3);
			int[] headerwidth4 = { 30, 60, 20 };
			HeaderTable4.setWidths(headerwidth4);
			HeaderTable4.setWidthPercentage(95f);
			HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4
			.addCell(new Phrase(
					"\n\n\n\n\n\n",
					subheader));
			Integer labId=0;

			if (labId == 1 || sponsorSlave > 0) {

				

				PdfPTable HeaderTable7 = new PdfPTable(3);
				int[] headerwidth7 = { 80, 25, 30 };
				HeaderTable7.setWidths(headerwidth7);
				HeaderTable7.setWidthPercentage(95f);
				HeaderTable7.getDefaultCell()
						.setBorder(Rectangle.NO_BORDER);

				HeaderTable7.getDefaultCell()
						.setBorder(Rectangle.NO_BORDER);
				HeaderTable7
						.addCell(new Phrase(
								"1. Please bring this receipt while collecting the reports",
								tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));

				HeaderTable7.addCell(new Phrase(
						"2. Please collect the report within one month.",
						tabletext));
				HeaderTable7.addCell(new Phrase("Payee Signature", subheader));
				HeaderTable7.addCell(new Phrase("Authorized Signatory", subheader));
				HeaderTable7.addCell(new Phrase("", tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));
				if(user_name != null)
				{
					HeaderTable7.addCell(new Phrase(" " + user_name, tabletext));
				}
				else
				{
					HeaderTable7.addCell(new Phrase(" " , tabletext));
				}
				

				

				document.add(HeaderTable7);
				HeaderTable7.flushContent();
				
				
				

			}else {

				
				if(user_name != null)
				{
					HeaderTable4.addCell(new Phrase(
							"          User :" + user_name, tabletext));
				}
				else
				{
					HeaderTable4.addCell(new Phrase(
							"          User :" , tabletext));
				}
				HeaderTable4.addCell(new Phrase("", tabletext));

				HeaderTable4.addCell(new Phrase("Signature", tabletext));
				
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				document.add(HeaderTable4);

				HeaderTable4.flushContent();
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));

				document.add(HeaderTable4);
				HeaderTable4.flushContent();

				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", tabletext));

				document.add(HeaderTable4);
				HeaderTable4.flushContent();
			}

			// Table4 : For page footer end

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