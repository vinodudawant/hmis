
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
<%@ page import="com.hms.doctordesk.controller.OPDHistoryController"%>
<%@ page import="com.hms.doctordesk.service.OPDHistoryService"%>
<%@ page import="com.hms.doctordesk.dto.OPDDietMasterDTO"%>
<%@ page import="com.hms.doctordesk.controller.OPDSxAdviceController"%>
<%@ page import="com.hms.doctordesk.service.OPDSxAdviceService"%>
<%@ page import="com.hms.doctordesk.dto.OPDChemoTheropyDTO"%>
<%@ page import="com.hms.doctordesk.dto.OPDSxAdvicedDTO"%>
<%@ page import="com.hms.doctordesk.controller.OPDHistoryController"%>
<%@ page import="com.hms.doctordesk.service.OPDHistoryService"%>
<%@ page import="com.hms.doctordesk.dto.OPDHistoryMasterDTO"%>
<%@ page import="com.hms.doctordesk.dto.OPDHistorySlaveDTO"%>
<%@ page import="com.hms.doctordesk.controller.DiagonosisController"%>
<%@ page import="com.hms.doctordesk.service.DiagonosisService"%>
<%@ page import="com.hms.doctordesk.dto.DiagonosisMasterDto"%>
<%@ page import="com.hms.doctordesk.controller.OpdServicesAdvisedController"%>
<%@ page import="com.hms.doctordesk.service.OpdServicesAdvisedService"%>
<%@ page import="com.hms.ehat.dto.CpoeServdetails"%>
<%@ page import="com.hms.doctordesk.dto.OPDRadioTheorapyMaster"%>
<%@ page import="com.hms.doctordesk.service.PrescriptionService"%>
<%@ page import="com.hms.doctordesk.dto.OPDPrescriptionDtoSP"%>
<%@ page import="com.hms.doctordesk.controller.OPDClinicalEvaluationController"%>
<%@ page import="com.hms.doctordesk.dto.OPDClinicalEvaluationDto"%>
<%@ page import="com.hms.doctordesk.service.OPDClinicalEvaluationService"%>
<%@ page import="com.hms.doctordesk.dto.OPDAllergyAlertsDto"%>
<%@ page import="com.hms.doctordesk.service.OPDClinicalStagingService"%>
<%@ page import="com.hms.doctordesk.dto.OPDClinicalStagingDTO"%>
<%@ page import="com.hms.doctordesk.dto.OPDReportInstructionDTO"%>
<%@ page import="com.hms.doctordesk.service.InstructionService"%>
<%@ page import="com.hms.doctordesk.dto.TreatmentInstruction"%>
<%@ page import="com.hms.ivf.controller.IvfHistoryController"%>
<%@ page import="com.hms.ivf.dto.IvfHistoryTempMasterDto"%>
<%@ page import="com.hms.ivf.service.IvfHistoryService"%>
<%@ page import="com.hms.ivf.controller.IVFDignosisController"%>
<%@ page import="com.hms.ivf.dto.IVFDignosisDTO"%>
<%@ page import="com.hms.ivf.service.IVFDignosisService"%>
<%@ page import="com.hms.ivf.controller.IVFSxAdviceController"%>
<%@ page import="com.hms.ivf.dto.IVFSxAdvicedDTO"%>
<%@ page import="com.hms.ivf.service.IvfSxService"%>

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
<meta  http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Ivf Print</title>
</head>
<body>
	<%
		try {

			response.setContentType("application/pdf");
			CurrencyTypeService fetchOneCurrency=(ApplicationContextUtils.getApplicationContext()).getBean(CurrencyTypeService.class);
			List<CurrencyTypeDto> listServiceCurrencyDto=fetchOneCurrency.getOneCurrencyList();
			String currencyCode=listServiceCurrencyDto.get(0).getCurrencyCode();
 			String currencyName=listServiceCurrencyDto.get(0).getCurrencyName();
		
 			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String billPrint = (String) resourceBundle.getObject("billPrint").toString();
			String billPrintsHeader = (String) resourceBundle.getObject("billPrintsHeader").toString();	
			String concessionFlow = (String) resourceBundle.getObject("concessionFlow").toString();	

			//String fontName = application.getRealPath("fonts\\Shivaji05.ttf");
			String fontName = application.getRealPath("fonts//Shivaji05.ttf");
			FontFactory.register(fontName);
			
			//for centerpatientId
		    String patientId= resourceBundle.getObject("patientIdLabel").toString();
			
			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			
			if(billPrintsHeader.contains("off")){
				
				document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
				
			}
			document.setMargins(20, 20, 20, 0);

			PdfWriter.getInstance(document, outStream);
			document.open();
		
			/* -------------------- Define Fonts ---------------------------  */			
			Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font subheader = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
			Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
			header.setColor(10, 4, 2);

			Font tableheader = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font tabletext = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
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
			int patId=Integer.parseInt(request.getParameter("patId"));
			Integer treatmentId=Integer.parseInt(request.getParameter("treatId"));
			int recId=Integer.parseInt(request.getParameter("recId"));
			String  languageOF=request.getParameter("instructionLanguage");
			String  CallFromOPD=request.getParameter("CallFrom");
			int unitId=Integer.parseInt(request.getParameter("unitId"));
			int ivfTreatId=Integer.parseInt(request.getParameter("ivfTreatId"));
			//String chemoDate=request.getParameter("chemoDate");
			
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
			 
			 if(ltRegMasterDto.get(0).getPerAddress()!=null){
				 perPatientAdd=ltRegMasterDto.get(0).getPerAddress();
			 }
			
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
			String callFrom = "receipt";
			if (pendFlag.equals("Y")) {

				callFrom = "prevReceipt";
			} else {

				callFrom = "receipt";
			}

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

			DecimalFormat df2 = new DecimalFormat("0.00");

			// patient address
			String addressPatient = "";
			String per_patient_address = "";
			
			/* if(a1 != "")
			{
				addressPatient = a1;
			}
			if(a2 != "" && a1 != ""){
				addressPatient += (", "+a2);
			}
			if(a1 == "" && a2!= ""){
				addressPatient = a2;
			} */
			if (cityObj != "0" && !cityObj.equals("undefined")
					&& !cityObj.equals("")) {
				addressPatient += cityObj;
			}

			if (taluka != "0" && !taluka.equals("undefined")
					&& !taluka.equals("")) {
				addressPatient += (taluka + ", ");
			}
			if (district != "0" && !district.equals("undefined")
					&& !district.equals("")) {
				addressPatient += (district + ", ");
			}
			if (state != "0" && !state.equals("undefined")
					&& !state.equals("")) {
				addressPatient += (state + " ");
			}
			// end : patient address
			
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
							
						
			addressPatient=addressPatient.substring(0,addressPatient.length()-1);
						
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

			if (img == null) {

				HeaderTable1.addCell(new Phrase("", header));
			} else {

				HeaderTable1.addCell(cell);
			}

			Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
			Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD);
			Phrase p = new Phrase();
			
			System.err.println("CallFromOPD..."+CallFromOPD);
			
			if(!CallFromOPD.equalsIgnoreCase("withoutheader")){
			p.add(new Chunk(" "+hospitalName, bold));			
			p.add(new Chunk(" \n\n"+address, tabletext));			
			p.add(new Chunk(" "+city+" Pin- "+hospitalZip+"\n", tabletext));
			p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
            if(!webste.equalsIgnoreCase("")){
			p.add(new Chunk(" \n "+webste, tabletext));
			}
			p.add(new Chunk(" \n "+"email: "+email, tabletext));
			}//p.add(new Chunk(" \nPAN No : "+panNo , tabletext));	
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

				HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				document.add(HeaderTable1);
				HeaderTable1.flushContent();
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
			HeaderTable2.addCell(new Phrase("    OPD print ", header));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			document.add(HeaderTable2);
			HeaderTable2.flushContent();

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
			ChannelHospitalMgmtService objChannelingModel = (ApplicationContextUtils.getApplicationContext()).getBean(ChannelHospitalMgmtService.class);	
			List<HospitalDetailsDTO> arrChanelling_doctor = new ArrayList<HospitalDetailsDTO>();
			arrChanelling_doctor = objChannelingModel.setExistingHospitalTemp(1, request);
			
			String refDrName="";
			int refDrId=ltRegMasterDto.get(0).getRefDocId();
			for(HospitalDetailsDTO objRef : arrChanelling_doctor){
				
				if(refDrId==objRef.getHosId()){
					
					refDrName=objRef.getHos_name();
				}
			}	
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
			

			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
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
			
			if(chargesSlaveId > 0){
				fetchsposor   = obj.fetchSuperCatofchargesSlave(chargesSlaveId);
				if(fetchsposor.size() >0){
					BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
				}
				
				BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",chargesSlaveId,"id"); 
			
			}else{
				BillCategoryName = "Self";
			}

			// Table3 : For patient header info start

			PdfPTable HeaderTable3 = new PdfPTable(4);
			int[] headerwidth3 = { 30, 50, 30, 50 };
			HeaderTable3.setWidths(headerwidth3);
			HeaderTable3.setWidthPercentage(95f);
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			//AdminModel admodel1 = new AdminModel();
			Doctor doc2 = new Doctor();
			List<Doctor> listDoc2 = null;
			
		
			if(totRemain==0){
				
				HeaderTable3.addCell(new Phrase("OPD. No. ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+opdipdno,tabletext));
				
				HeaderTable3.addCell(new Phrase("Receipt No. ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+receiptNo,tabletext));
				
				/* HeaderTable3.addCell(new Phrase("Patient ID ", subheader));
				HeaderTable3.addCell(new Phrase(" : "+PatientID, tabletext)); */
				
				HeaderTable3.addCell(new Phrase(" "+patientId,subheader));
				HeaderTable3.addCell(new Phrase(" : "+rtd.getCenterPatientId(),tabletext));
				 
				HeaderTable3.addCell(new Phrase("Patient Name ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+pname,tabletext));

				//HeaderTable3.addCell(new Phrase("Treatment ID ", subheader));
				//HeaderTable3.addCell(new Phrase(" : "+treatmentId, tabletext));
				
				HeaderTable3.addCell(new Phrase("Token No. ", subheader));
				HeaderTable3.addCell(new Phrase(" : "+TokenNo, tabletext));
				
			/* 	HeaderTable3.addCell(new Phrase("Age/Gender ", subheader));
				HeaderTable3.addCell(new Phrase(" : "+ AgeSexWt, tabletext));
				
				HeaderTable3.addCell(new Phrase("Weight ",subheader));
				HeaderTable3.addCell(new Phrase(" : " +weight , tabletext)); */
				
				HeaderTable3.addCell(new Phrase("Contact No ", subheader));
				HeaderTable3.addCell(new Phrase(" : "+ ContactNo, tabletext));
				
				HeaderTable3.addCell(new Phrase("Receipt Date ",subheader));
				HeaderTable3.addCell(new Phrase(" : " +strDate , tabletext));
				
				HeaderTable3.addCell(new Phrase("Res. Address ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+patientAdd+", "+addressPatient,	tabletext));
				
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
						if(str.equalsIgnoreCase("")){
							str="0";
						}
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
						HeaderTable3.addCell(new Phrase(": "+docId1, tabletext));					
						
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
			
		
			document.add(HeaderTable3);
			HeaderTable3.flushContent();

			
			PdfPTable HeaderTable5 = new PdfPTable(7);
			int[] headerwidth5 = { 27, 40, 30, 10, 15, 40, 20 };
			HeaderTable5.setWidths(headerwidth5);
			HeaderTable5.setWidthPercentage(95f);
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

// strat History Data



IvfHistoryController uss1=(ApplicationContextUtils.getApplicationContext()).getBean(IvfHistoryController.class);
IvfHistoryService uss2=(ApplicationContextUtils.getApplicationContext()).getBean(IvfHistoryService.class);
 IvfHistoryTempMasterDto historyobj=  uss2.getIVFHistory(ivfTreatId);

 PdfPTable HeaderTableSpace = new PdfPTable(1);
	int[] headerwidthSpace = {40 };
	HeaderTableSpace.setWidths(headerwidthSpace);
	HeaderTableSpace.setWidthPercentage(95f);
	HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	HeaderTableSpace.setSpacingAfter(5.0f);

	PdfPTable HeaderTableH = new PdfPTable(4);
			int[] headerwidthChemo = {20,20,20,20 };
			HeaderTableH.setWidths(headerwidthChemo);
			HeaderTableH.setWidthPercentage(95f);
			HeaderTableH.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			PdfPTable HeaderTableCh = new PdfPTable(3);
			int[] headerwidthCh = {5,5,5 };
			HeaderTableCh.setWidths(headerwidthCh);
			HeaderTableCh.setWidthPercentage(95f);
			HeaderTableCh.getDefaultCell().setBorder(Rectangle.BOX);
			
		
			
         if(historyobj !=null){
        	 HeaderTableH.addCell(new Phrase("Medical Officer:", subheader));
        	 HeaderTableH.addCell(new Phrase(""+historyobj.getMedicalOfficerName(), tabletext));
        	 
        	 HeaderTableH.addCell(new Phrase("MRN No:", subheader));
        	 HeaderTableH.addCell(new Phrase(""+historyobj.getMrnNo(), tabletext));
        	 
        	 document.add(HeaderTableH);
        	 HeaderTableH.flushContent();
        	 
        	 HeaderTable5.addCell(new Phrase("", tabletext));
  			HeaderTable5.addCell(new Phrase("", tabletext));
  			 HeaderTable5.addCell(new Phrase("", tabletext));
  			HeaderTable5.addCell(new Phrase("", tabletext));
  			 HeaderTable5.addCell(new Phrase("", tabletext));
   			HeaderTable5.addCell(new Phrase("", tabletext));
   			 HeaderTable5.addCell(new Phrase("", tabletext));
	   		 document.add(HeaderTable5);
   			HeaderTable5.flushContent();
        	 
        	 
	    	 HeaderTableH.addCell(new Phrase("", tabletext));
	    	 HeaderTableH.addCell(new Phrase("", tabletext));
	    	 HeaderTableH.addCell(new Phrase("", tabletext));
	    	 HeaderTableH.addCell(new Phrase("", tabletext));
	    	 
	    	 HeaderTableH.addCell(new Phrase("", tabletext));
	    	 HeaderTableH.addCell(new Phrase("", tabletext));
	    	 HeaderTableH.addCell(new Phrase("", tabletext));
	    	 HeaderTableH.addCell(new Phrase("", tabletext));
	    	 
	    	 HeaderTableH.addCell(new Phrase("", tabletext));
	    	 HeaderTableH.addCell(new Phrase("", tabletext));
	    	 HeaderTableH.addCell(new Phrase("", tabletext));
	    	 HeaderTableH.addCell(new Phrase("", tabletext));
	    	 
	    	 HeaderTableH.addCell(new Phrase("", tabletext));
	    	 HeaderTableH.addCell(new Phrase("", tabletext));
	    	 HeaderTableH.addCell(new Phrase("", tabletext));
	    	 HeaderTableH.addCell(new Phrase("", tabletext));
	 			document.add(HeaderTableH);
	 			HeaderTableH.flushContent();
 			
 			
 			 HeaderTableH.addCell(new Phrase("Chief Complaints and Duration:", subheader));
        	 HeaderTableH.addCell(new Phrase("", tabletext));
        	 HeaderTableH.addCell(new Phrase("", tabletext));
        	 HeaderTableH.addCell(new Phrase("", tabletext));
        	 
        	 document.add(HeaderTableH);
  			HeaderTableH.flushContent();
  			
  			
  			HeaderTableSpace.addCell(new Phrase("", tabletext));
  			document.add(HeaderTableSpace);
  			HeaderTableSpace.flushContent();
        	
   	 		
     			
     			if(historyobj.getGetListOfHistorySlaveDTO().size() > 0){
	     				HeaderTableCh.addCell(new Phrase("#", subheader));
	     				HeaderTableCh.addCell(new Phrase("Chief Complaint", subheader));
	     				HeaderTableCh.addCell(new Phrase("Duration", subheader));
	     		    	 int index=1;
	     		    	 for( int i=0;i< historyobj.getGetListOfHistorySlaveDTO().size();i++){
	     		    		HeaderTableCh.addCell(new Phrase(""+index, tabletext));
	     		    		HeaderTableCh.addCell(new Phrase(""+historyobj.getGetListOfHistorySlaveDTO().get(i).getChiefComplaints(), tabletext));
	     		    		HeaderTableCh.addCell(new Phrase(""+historyobj.getGetListOfHistorySlaveDTO().get(i).getDuration() + " "+historyobj.getGetListOfHistorySlaveDTO().get(i).getDurationType(), tabletext));
	     		    		index++;
	     		    	 }
	     		    	 
	     		    	 
     			}
     			
     			
     			
     			
     			document.add(HeaderTableCh);
 		    	HeaderTableCh.flushContent();
 		    	
 		    	
 		    	HeaderTableSpace.addCell(new Phrase("", tabletext));
      			document.add(HeaderTableSpace);
      			HeaderTableSpace.flushContent();
 		    	
 		    	
 		    	 HeaderTable5.addCell(new Phrase("", tabletext));
 	  			HeaderTable5.addCell(new Phrase("", tabletext));
 	  			 HeaderTable5.addCell(new Phrase("", tabletext));
 	  			HeaderTable5.addCell(new Phrase("", tabletext));
 	  			 HeaderTable5.addCell(new Phrase("", tabletext));
 	   			HeaderTable5.addCell(new Phrase("", tabletext));
 	   			 HeaderTable5.addCell(new Phrase("", tabletext));
 		   		 document.add(HeaderTable5);
 	   			HeaderTable5.flushContent();
 	   			
 	   		 HeaderTableH.addCell(new Phrase("Past Medical History:", subheader));
        	 HeaderTableH.addCell(new Phrase("", tabletext));
        	 HeaderTableH.addCell(new Phrase("", tabletext));
        	 HeaderTableH.addCell(new Phrase("", tabletext));
        	 
        	 HeaderTableH.addCell(new Phrase("Medications:", subheader));
        	 HeaderTableH.addCell(new Phrase(""+historyobj.getMedications(), tabletext));
        	 HeaderTableH.addCell(new Phrase("Past Surgical History", tabletext));
        	 HeaderTableH.addCell(new Phrase(""+historyobj.getPastSurgicalHistory(), tabletext));
        	 
        	 
        	 HeaderTableH.addCell(new Phrase("Clinical Finding:", subheader));
        	 HeaderTableH.addCell(new Phrase(""+historyobj.getNegativeHistory(), tabletext));
        	 HeaderTableH.addCell(new Phrase("History of Present Illness ", tabletext));
        	 HeaderTableH.addCell(new Phrase(""+historyobj.getChiefComplaints(), tabletext));
        	 
        	 document.add(HeaderTableH);
  			HeaderTableH.flushContent();
  			
  			

  			HeaderTableSpace.addCell(new Phrase("", tabletext));
  			document.add(HeaderTableSpace);
  			HeaderTableSpace.flushContent();
  			
  			
  			
  			if(historyobj.getDmFlag().equalsIgnoreCase("Y") || historyobj.getHtnFlag().equalsIgnoreCase("Y") || historyobj.getIhdFlag().equalsIgnoreCase("Y") || historyobj.getOtherFlag().equalsIgnoreCase("Y")){
 				HeaderTableCh.addCell(new Phrase("#", subheader));
 				HeaderTableCh.addCell(new Phrase("Yes/No", subheader));
 				HeaderTableCh.addCell(new Phrase("Duration", subheader)); 
 				
 				if(historyobj.getDmFlag().equalsIgnoreCase("Y")){ 
 				HeaderTableCh.addCell(new Phrase("DM ", subheader));
 				HeaderTableCh.addCell(new Phrase(""+historyobj.getDmFlag(), tabletext));
 				HeaderTableCh.addCell(new Phrase(""+historyobj.getDmDuration(), tabletext)); 
 				}
 				
 				if(historyobj.getHtnFlag().equalsIgnoreCase("Y")){
 				HeaderTableCh.addCell(new Phrase("HT  ", subheader));
 				HeaderTableCh.addCell(new Phrase(""+historyobj.getHtnFlag(), tabletext));
 				HeaderTableCh.addCell(new Phrase(""+historyobj.getHtnDuration(), tabletext)); 
 				}
 				
 				if(historyobj.getIhdFlag().equalsIgnoreCase("Y")){
 				HeaderTableCh.addCell(new Phrase("IHD  ", subheader));
 				HeaderTableCh.addCell(new Phrase(""+historyobj.getIhdFlag(), tabletext));
 				HeaderTableCh.addCell(new Phrase(""+historyobj.getIhdDuration(), tabletext)); 
 				}
 				
 				if(historyobj.getBacopdFlag().equalsIgnoreCase("Y")){
 	 				HeaderTableCh.addCell(new Phrase("BA/COPD  ", subheader));
 	 				HeaderTableCh.addCell(new Phrase(""+historyobj.getBacopdFlag(), tabletext));
 	 				HeaderTableCh.addCell(new Phrase(""+historyobj.getBacopdDuration(), tabletext)); 
 	 				}
 				
 				
 				if(historyobj.getOtherFlag().equalsIgnoreCase("Y")){
 				HeaderTableCh.addCell(new Phrase("OTHER  ", subheader));
 				HeaderTableCh.addCell(new Phrase(""+historyobj.getOtherFlag(), tabletext));
 				HeaderTableCh.addCell(new Phrase(""+historyobj.getOtherDuration(), tabletext)); 
 				}
 				
 				
 				
 			}
 			
 			 document.add(HeaderTableCh);
 			HeaderTableCh.flushContent();
 			
 			
 			HeaderTableSpace.addCell(new Phrase("", tabletext));
  			document.add(HeaderTableSpace);
  			HeaderTableSpace.flushContent();
		    	
		    	
		    	 HeaderTable5.addCell(new Phrase("", tabletext));
	  			HeaderTable5.addCell(new Phrase("", tabletext));
	  			 HeaderTable5.addCell(new Phrase("", tabletext));
	  			HeaderTable5.addCell(new Phrase("", tabletext));
	  			 HeaderTable5.addCell(new Phrase("", tabletext));
	   			HeaderTable5.addCell(new Phrase("", tabletext));
	   			 HeaderTable5.addCell(new Phrase("", tabletext));
		   		 document.add(HeaderTable5);
	   			HeaderTable5.flushContent();
	   			
	   			
	   		 HeaderTableH.addCell(new Phrase("Past/Present/Family History:", subheader));
        	 HeaderTableH.addCell(new Phrase("", tabletext));
        	 HeaderTableH.addCell(new Phrase(" ", tabletext));
        	 HeaderTableH.addCell(new Phrase("", tabletext));
        	 
        	 
        	 HeaderTableH.addCell(new Phrase("GYNAE/OBS History:", subheader));
        	 HeaderTableH.addCell(new Phrase(""+historyobj.getObsHistory(), tabletext));
        	 HeaderTableH.addCell(new Phrase("Any allergies or adverse drug  reactions?: ", subheader));
        	 HeaderTableH.addCell(new Phrase(""+historyobj.getAnyAllergy(), tabletext));
        	 
        	 HeaderTableH.addCell(new Phrase("Family History:", subheader));
        	 HeaderTableH.addCell(new Phrase(""+historyobj.getFamilyHistory(), tabletext));
        	 HeaderTableH.addCell(new Phrase("Personal History: ", subheader));
        	 HeaderTableH.addCell(new Phrase(""+historyobj.getPersonalHistory(), tabletext));
        	 
        	 document.add(HeaderTableH);
  			HeaderTableH.flushContent();
  			
  			
  			HeaderTableSpace.addCell(new Phrase("", tabletext));
  			document.add(HeaderTableSpace);
  			HeaderTableSpace.flushContent();
		    	
		    	
		    	 HeaderTable5.addCell(new Phrase("", tabletext));
	  			HeaderTable5.addCell(new Phrase("", tabletext));
	  			 HeaderTable5.addCell(new Phrase("", tabletext));
	  			HeaderTable5.addCell(new Phrase("", tabletext));
	  			 HeaderTable5.addCell(new Phrase("", tabletext));
	   			HeaderTable5.addCell(new Phrase("", tabletext));
	   			 HeaderTable5.addCell(new Phrase("", tabletext));
		   		 document.add(HeaderTable5);
	   			HeaderTable5.flushContent();
	   			
	   			HeaderTableSpace.addCell(new Phrase("", tabletext));
	  			document.add(HeaderTableSpace);
	  			HeaderTableSpace.flushContent();
	  			
	  			
	  			HeaderTableH.addCell(new Phrase("On Examination:", subheader));
	        	 HeaderTableH.addCell(new Phrase("", tabletext));
	        	 HeaderTableH.addCell(new Phrase(" ", tabletext));
	        	 HeaderTableH.addCell(new Phrase("", tabletext));
	        	 
	        	 
	        	 HeaderTableH.addCell(new Phrase("Temperature:", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getTemperature(), tabletext));
	        	 HeaderTableH.addCell(new Phrase("Pulse: ", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getPulse(), tabletext));
	        	 
	        	 HeaderTableH.addCell(new Phrase("BP:", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getBp(), tabletext));
	        	 HeaderTableH.addCell(new Phrase(" ", subheader));
	        	 HeaderTableH.addCell(new Phrase("", tabletext));
	        	 
	        	 document.add(HeaderTableH);
	  			HeaderTableH.flushContent();
	  			
	  			HeaderTableSpace.addCell(new Phrase("", tabletext));
	  			document.add(HeaderTableSpace);
	  			HeaderTableSpace.flushContent();
	  			
	  			HeaderTableH.addCell(new Phrase("GENERAL EXAM:", subheader));
	        	 HeaderTableH.addCell(new Phrase("", tabletext));
	        	 HeaderTableH.addCell(new Phrase(" ", tabletext));
	        	 HeaderTableH.addCell(new Phrase("", tabletext));
	        	 
	        	 
	        	 HeaderTableH.addCell(new Phrase("Pallor:", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getPallor(), tabletext));
	        	 HeaderTableH.addCell(new Phrase("Clubbing: ", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getClubbing(), tabletext));
	        	 
	        	 HeaderTableH.addCell(new Phrase("Lymph Adenopathy:", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getLymphAdenopathy(), tabletext));
	        	 HeaderTableH.addCell(new Phrase("Icterus: ", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getIcterus(), tabletext));
	        	 
	        	 HeaderTableH.addCell(new Phrase("Oedema:", subheader));
	        	 HeaderTableH.addCell(new Phrase(""+historyobj.getOedema(), tabletext));
	        	 HeaderTableH.addCell(new Phrase(" ", subheader));
	        	 HeaderTableH.addCell(new Phrase("", tabletext));
	        	 
	        	 document.add(HeaderTableH);
	  			HeaderTableH.flushContent();
	  			
	  			
	  			HeaderTableSpace.addCell(new Phrase("", tabletext));
	  			document.add(HeaderTableSpace);
	  			HeaderTableSpace.flushContent();
			    	
			    	
			    	 HeaderTable5.addCell(new Phrase("", tabletext));
		  			HeaderTable5.addCell(new Phrase("", tabletext));
		  			 HeaderTable5.addCell(new Phrase("", tabletext));
		  			HeaderTable5.addCell(new Phrase("", tabletext));
		  			 HeaderTable5.addCell(new Phrase("", tabletext));
		   			HeaderTable5.addCell(new Phrase("", tabletext));
		   			 HeaderTable5.addCell(new Phrase("", tabletext));
			   		 document.add(HeaderTable5);
		   			HeaderTable5.flushContent();
		   			
		   			HeaderTableSpace.addCell(new Phrase("", tabletext));
		  			document.add(HeaderTableSpace);
		  			HeaderTableSpace.flushContent();
		  			
		  			
		  			 HeaderTableH.addCell(new Phrase("Systematic Examination:", subheader));
		        	 HeaderTableH.addCell(new Phrase("", tabletext));
		        	 HeaderTableH.addCell(new Phrase(" ", subheader));
		        	 HeaderTableH.addCell(new Phrase("", tabletext));
		        	 
		        	 HeaderTableH.addCell(new Phrase("R/S:", subheader));
		        	 HeaderTableH.addCell(new Phrase(""+historyobj.getRs(), tabletext));
		        	 HeaderTableH.addCell(new Phrase("CVS ", subheader));
		        	 HeaderTableH.addCell(new Phrase(""+historyobj.getCvs(), tabletext));
		        	 
		        	 HeaderTableH.addCell(new Phrase("CNS:", subheader));
		        	 HeaderTableH.addCell(new Phrase(""+historyobj.getCns(), tabletext));
		        	 HeaderTableH.addCell(new Phrase("PA ", subheader));
		        	 HeaderTableH.addCell(new Phrase(""+historyobj.getPa(), tabletext));
		        	 
		        	 HeaderTableH.addCell(new Phrase("Local Examinations:", subheader));
		        	 HeaderTableH.addCell(new Phrase(""+historyobj.getLocalExamination(), tabletext));
		        	 HeaderTableH.addCell(new Phrase("Investigation Reports: ", subheader));
		        	 HeaderTableH.addCell(new Phrase(""+historyobj.getInvestigationReport(), tabletext));
		        	 
		        	 HeaderTableH.addCell(new Phrase("Provisional Diagnosis:", subheader));
		        	 HeaderTableH.addCell(new Phrase("", tabletext));
		        	 HeaderTableH.addCell(new Phrase("Treatment Plan: ", subheader));
		        	 HeaderTableH.addCell(new Phrase("", tabletext));
		        	 
		        	 document.add(HeaderTableH);
		  			HeaderTableH.flushContent();
 			
		  			
		  			HeaderTableSpace.addCell(new Phrase("", tabletext));
		  			document.add(HeaderTableSpace);
		  			HeaderTableSpace.flushContent();
				    	
				    	
				    	 HeaderTable5.addCell(new Phrase("", tabletext));
			  			HeaderTable5.addCell(new Phrase("", tabletext));
			  			 HeaderTable5.addCell(new Phrase("", tabletext));
			  			HeaderTable5.addCell(new Phrase("", tabletext));
			  			 HeaderTable5.addCell(new Phrase("", tabletext));
			   			HeaderTable5.addCell(new Phrase("", tabletext));
			   			 HeaderTable5.addCell(new Phrase("", tabletext));
				   		 document.add(HeaderTable5);
			   			HeaderTable5.flushContent();
			   			
			   			HeaderTableSpace.addCell(new Phrase("", tabletext));
			  			document.add(HeaderTableSpace);
			  			HeaderTableSpace.flushContent();
			  			
     			
     			
     				
     			}
//End History Data

//start dignosis info
IVFDignosisController daignocontrooler=(ApplicationContextUtils.getApplicationContext()).getBean(IVFDignosisController.class);
IVFDignosisService diagnoservice=(ApplicationContextUtils.getApplicationContext()).getBean(IVFDignosisService.class);
List<IVFDignosisDTO> lstdignoObj=  diagnoservice.getListOfIVFDignosis(ivfTreatId, unitId);
 
PdfPTable HeaderTableDiagno = new PdfPTable(7);
int[] headerwidthDigno = {5,10,10,5,5,5,5 };
HeaderTableDiagno.setWidths(headerwidthDigno);
HeaderTableDiagno.setWidthPercentage(95f);
HeaderTableDiagno.getDefaultCell().setBorder(Rectangle.BOX);
if(lstdignoObj.size() > 0){
	
	 HeaderTableH.addCell(new Phrase(" Diagnosis Info:", subheader));
	 HeaderTableH.addCell(new Phrase("", tabletext));
	 HeaderTableH.addCell(new Phrase(" ", subheader));
	 HeaderTableH.addCell(new Phrase("", tabletext));
	 
	 document.add(HeaderTableH);
	 HeaderTableH.flushContent();
	 
	 HeaderTableSpace.addCell(new Phrase("", tabletext));
		document.add(HeaderTableSpace);
		HeaderTableSpace.flushContent();
		
		 HeaderTableH.addCell(new Phrase(" Provisional Diagnosis :", subheader));
		 HeaderTableH.addCell(new Phrase("", tabletext));
		 HeaderTableH.addCell(new Phrase(" ", subheader));
		 HeaderTableH.addCell(new Phrase("", tabletext));
		 
		 document.add(HeaderTableH);
		 HeaderTableH.flushContent();
		 
		 HeaderTableSpace.addCell(new Phrase("", tabletext));
			document.add(HeaderTableSpace);
			HeaderTableSpace.flushContent();
		
		HeaderTableDiagno.addCell(new Phrase(" Sr.No", subheader));
		HeaderTableDiagno.addCell(new Phrase("Diagnosis", subheader));
		HeaderTableDiagno.addCell(new Phrase(" Diagnosis Description", subheader));
		HeaderTableDiagno.addCell(new Phrase("ICD 0/10 Code", subheader));
		HeaderTableDiagno.addCell(new Phrase(" Date", subheader));
		HeaderTableDiagno.addCell(new Phrase("Diagnosis Type", subheader));
		HeaderTableDiagno.addCell(new Phrase("Comment", subheader));
		
		int pcount=1;
		for(int i=0; i< lstdignoObj.size();i++){
					if(lstdignoObj.get(i).getDiagnosisType().equalsIgnoreCase("Provisional")){
					HeaderTableDiagno.addCell(new Phrase(""+pcount, tabletext));
					HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDiagnosis(), tabletext));
					HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDiagnosisDescription(), tabletext));
					HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getiCD10Code(), tabletext));
					HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDate(), tabletext));
					HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDiagnosisType(), tabletext));
					HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getComments(), tabletext));
					pcount++;
					}
					
			
		}
		document.add(HeaderTableDiagno);
		HeaderTableDiagno.flushContent();
		
		 HeaderTableSpace.addCell(new Phrase("", tabletext));
			document.add(HeaderTableSpace);
			HeaderTableSpace.flushContent();
			
			 HeaderTableH.addCell(new Phrase(" Confirmed Diagnosis :", subheader));
			 HeaderTableH.addCell(new Phrase("", tabletext));
			 HeaderTableH.addCell(new Phrase(" ", subheader));
			 HeaderTableH.addCell(new Phrase("", tabletext));
			 
			 document.add(HeaderTableH);
			 HeaderTableH.flushContent();
			 
			 HeaderTableSpace.addCell(new Phrase("", tabletext));
				document.add(HeaderTableSpace);
				HeaderTableSpace.flushContent();
				
				
				HeaderTableDiagno.addCell(new Phrase(" Sr.No", subheader));
				HeaderTableDiagno.addCell(new Phrase("Diagnosis", subheader));
				HeaderTableDiagno.addCell(new Phrase(" Diagnosis Description", subheader));
				HeaderTableDiagno.addCell(new Phrase("ICD 0/10 Code", subheader));
				HeaderTableDiagno.addCell(new Phrase(" Date", subheader));
				HeaderTableDiagno.addCell(new Phrase("Diagnosis Type", subheader));
				HeaderTableDiagno.addCell(new Phrase("Comment", subheader));
				
				int ccount=1;
				for(int i=0; i< lstdignoObj.size();i++){
							if(lstdignoObj.get(i).getDiagnosisType().equalsIgnoreCase("Confirmed")){
							HeaderTableDiagno.addCell(new Phrase(""+ccount, tabletext));
							HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDiagnosis(), tabletext));
							HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDiagnosisDescription(), tabletext));
							HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getiCD10Code(), tabletext));
							HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDate(), tabletext));
							HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDiagnosisType(), tabletext));
							HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getComments(), tabletext));
							ccount++;
							}
					
				}
				document.add(HeaderTableDiagno);
				HeaderTableDiagno.flushContent();
				
				 HeaderTableSpace.addCell(new Phrase("", tabletext));
					document.add(HeaderTableSpace);
					HeaderTableSpace.flushContent();
					
					HeaderTableSpace.addCell(new Phrase("", tabletext));
					document.add(HeaderTableSpace);
					HeaderTableSpace.flushContent();
					
					 HeaderTable5.addCell(new Phrase("", tabletext));
			  			HeaderTable5.addCell(new Phrase("", tabletext));
			  			 HeaderTable5.addCell(new Phrase("", tabletext));
			  			HeaderTable5.addCell(new Phrase("", tabletext));
			  			 HeaderTable5.addCell(new Phrase("", tabletext));
			   			HeaderTable5.addCell(new Phrase("", tabletext));
			   			 HeaderTable5.addCell(new Phrase("", tabletext));
				   		 document.add(HeaderTable5);
			   			HeaderTable5.flushContent();
			   			
			   			HeaderTableSpace.addCell(new Phrase("", tabletext));
			  			document.add(HeaderTableSpace);
			  			HeaderTableSpace.flushContent();
			  			
			  			
}

//End Dignosis Info

//start service Advice Info
	HttpServletRequest hrequest=null;
OpdServicesAdvisedController serviceController=(ApplicationContextUtils.getApplicationContext()).getBean(OpdServicesAdvisedController.class);
OpdServicesAdvisedService serviceAdvice=(ApplicationContextUtils.getApplicationContext()).getBean(OpdServicesAdvisedService.class);
List<CpoeServdetails> lstserviceObj=  serviceAdvice.getListBill(treatmentId, "default", 0, hrequest);

PdfPTable HeaderTableServiceAdvice = new PdfPTable(6);
int[] headerwidthServiceAdvice = {5,10,10,5,5,5 };
HeaderTableServiceAdvice.setWidths(headerwidthServiceAdvice);
HeaderTableServiceAdvice.setWidthPercentage(95f);
HeaderTableServiceAdvice.getDefaultCell().setBorder(Rectangle.BOX);

if(lstserviceObj.size() > 0){
	
	HeaderTableH.addCell(new Phrase(" Service Advice Info:", subheader));
	 HeaderTableH.addCell(new Phrase("", tabletext));
	 HeaderTableH.addCell(new Phrase(" ", subheader));
	 HeaderTableH.addCell(new Phrase("", tabletext));
	 
	 document.add(HeaderTableH);
	 HeaderTableH.flushContent();
	 
	 HeaderTableSpace.addCell(new Phrase("", tabletext));
		document.add(HeaderTableSpace);
		HeaderTableSpace.flushContent();
		
		HeaderTableServiceAdvice.addCell(new Phrase("Sr.No", subheader));
		HeaderTableServiceAdvice.addCell(new Phrase("Particulars ", tabletext));
		HeaderTableServiceAdvice.addCell(new Phrase("Date", tabletext));
		HeaderTableServiceAdvice.addCell(new Phrase("Consultant Name", subheader));
		HeaderTableServiceAdvice.addCell(new Phrase("Type", tabletext));
		HeaderTableServiceAdvice.addCell(new Phrase("Clinical Notes", tabletext));
		
		int scount=1;
		for(int i=0;i < lstserviceObj.size();i++){
			
		/* Date d=lstserviceObj.get(i).getCreated_date_time();
		String date=d.toLocaleString(); */
		
			HeaderTableServiceAdvice.addCell(new Phrase(""+scount, tabletext));
			HeaderTableServiceAdvice.addCell(new Phrase(""+lstserviceObj.get(i).getCategoryName(), tabletext));
			HeaderTableServiceAdvice.addCell(new Phrase(""+lstserviceObj.get(i).getCreated_date_time(), tabletext));
			HeaderTableServiceAdvice.addCell(new Phrase(""+lstserviceObj.get(i).getDocName(), tabletext));
			HeaderTableServiceAdvice.addCell(new Phrase(""+lstserviceObj.get(i).getServicename(), tabletext));
			HeaderTableServiceAdvice.addCell(new Phrase(""+lstserviceObj.get(i).getClinical_notes(), tabletext));
			scount++;
		}
		
		
		 document.add(HeaderTableServiceAdvice);
		 HeaderTableServiceAdvice.flushContent();
		 
		 HeaderTableSpace.addCell(new Phrase("", tabletext));
			document.add(HeaderTableSpace);
			HeaderTableSpace.flushContent();
			
			HeaderTableSpace.addCell(new Phrase("", tabletext));
			document.add(HeaderTableSpace);
			HeaderTableSpace.flushContent();
		 
		 HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			 HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			 HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			 HeaderTable5.addCell(new Phrase("", tabletext));
	   		 document.add(HeaderTable5);
			HeaderTable5.flushContent();
			
			HeaderTableSpace.addCell(new Phrase("", tabletext));
			document.add(HeaderTableSpace);
			HeaderTableSpace.flushContent();
			
			 HeaderTableSpace.addCell(new Phrase("", tabletext));
				document.add(HeaderTableSpace);
				HeaderTableSpace.flushContent();
			
			
}
//end service Advice Info

//start prescription 

PrescriptionService pservice  =(ApplicationContextUtils.getApplicationContext()).getBean(PrescriptionService.class);
List<OPDPrescriptionDtoSP> listPrescriptionsSP = new ArrayList<>();	
listPrescriptionsSP =  pservice.getAllPrescriptionsByTreatmentId(treatmentId, unitId);  // data by stored procedure

HeaderTableSpace.addCell(new Phrase("", tabletext));
document.add(HeaderTableSpace);
HeaderTableSpace.flushContent();

HeaderTableSpace.addCell(new Phrase("", tabletext));
document.add(HeaderTableSpace);
HeaderTableSpace.flushContent();

HeaderTableSpace.addCell(new Phrase("", tabletext));
document.add(HeaderTableSpace);
HeaderTableSpace.flushContent();

HeaderTableSpace.addCell(new Phrase("", tabletext));
document.add(HeaderTableSpace);
HeaderTableSpace.flushContent();

HeaderTableSpace.addCell(new Phrase("", tabletext));
document.add(HeaderTableSpace);
HeaderTableSpace.flushContent();

HeaderTableSpace.addCell(new Phrase("", tabletext));
document.add(HeaderTableSpace);
HeaderTableSpace.flushContent();
HeaderTableSpace.addCell(new Phrase("", tabletext));
document.add(HeaderTableSpace);
HeaderTableSpace.flushContent();
HeaderTableSpace.addCell(new Phrase("", tabletext));
document.add(HeaderTableSpace);
HeaderTableSpace.flushContent();
HeaderTableSpace.addCell(new Phrase("", tabletext));
document.add(HeaderTableSpace);
HeaderTableSpace.flushContent();
HeaderTableSpace.addCell(new Phrase("", tabletext));
document.add(HeaderTableSpace);
HeaderTableSpace.flushContent();
 

	PdfPTable HeaderTableH1 = new PdfPTable(4);
			int[] headerwidthChemo1 = {20,20,20,20 };
			HeaderTableH1.setWidths(headerwidthChemo1);
			HeaderTableH1.setWidthPercentage(95f);
			HeaderTableH1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			PdfPTable HeaderTableCh1 = new PdfPTable(7);
			int[] headerwidthCh1 = {5,5,5,5,5,5,5 };
			HeaderTableCh1.setWidths(headerwidthCh1);
			HeaderTableCh1.setWidthPercentage(95f);
			HeaderTableCh1.getDefaultCell().setBorder(Rectangle.BOX);
			
			if(listPrescriptionsSP.size() > 0){
			
			
			HeaderTableH.addCell(new Phrase(" Prescription  Info:", subheader));
			 HeaderTableH.addCell(new Phrase("", tabletext));
			 HeaderTableH.addCell(new Phrase(" ", subheader));
			 HeaderTableH.addCell(new Phrase("", tabletext));
			 
			 HeaderTableH.addCell(new Phrase("RX:", subheader));
			 HeaderTableH.addCell(new Phrase("", tabletext));
			 HeaderTableH.addCell(new Phrase(" ", subheader));
			 HeaderTableH.addCell(new Phrase("", tabletext));
			 
			 document.add(HeaderTableH);
			 HeaderTableH.flushContent();
			 
			 document.add(HeaderTableH);
			 HeaderTableH.flushContent();
			
			
		
			HeaderTableCh1.addCell(new Phrase("#", tabletext));
			HeaderTableCh1.addCell(new Phrase("Prep. Drug", tabletext));
			HeaderTableCh1.addCell(new Phrase("Dose", tabletext));
			HeaderTableCh1.addCell(new Phrase("Advice", tabletext));
			HeaderTableCh1.addCell(new Phrase("Frequency", tabletext));
			HeaderTableCh1.addCell(new Phrase("Duration", tabletext));
			HeaderTableCh1.addCell(new Phrase("Qty.", tabletext));
			
			
			int countp=1;
			
			for(int i=0;i<listPrescriptionsSP.size();i++ ){
				HeaderTableCh1.addCell(new Phrase(""+countp, tabletext));
				HeaderTableCh1.addCell(new Phrase(""+listPrescriptionsSP.get(i).getPrepName() + ". "+listPrescriptionsSP.get(i).getMedicineName(), tabletext));
				HeaderTableCh1.addCell(new Phrase(""+listPrescriptionsSP.get(i).getDose(), tabletext));
				
				String instructions=listPrescriptionsSP.get(i).getInstructionName();
				String instArray[]=instructions.split("/");
				System.err.println("instructions........."+instructions);
				
				String englishInstr=instArray[0];
				String hindiInstr=instArray[1];
				String marathiInstr=instArray[2];
				System.err.println("languageOF........."+languageOF);
				if(languageOF.equalsIgnoreCase("ENGLISH")){
					
					HeaderTableCh1.addCell(new Phrase(""+englishInstr, tabletext));
					
				}else if(languageOF.equalsIgnoreCase("MARATHI")){
					
					HeaderTableCh1.addCell(new Phrase(""+marathiInstr, FontFactory.getFont("Shivaji05", 10)));
					
				}else if(languageOF.equalsIgnoreCase("HINDI")){
					
					HeaderTableCh1.addCell(new Phrase(""+hindiInstr, FontFactory.getFont("Shivaji05", 10)));
					
				}
				
				String pdays=listPrescriptionsSP.get(i).getDayPrescription();
				String preDays[]=pdays.split(",");
				String mo=preDays[0];
				String an=preDays[1];
				String ev=preDays[2];
				String nt=preDays[3];
				
				HeaderTableCh1.addCell(new Phrase(""+mo+"-"+an+"-"+ev+"-"+nt, tabletext));
				HeaderTableCh1.addCell(new Phrase(""+listPrescriptionsSP.get(i).getDays() + " Days", tabletext));
				HeaderTableCh1.addCell(new Phrase(""+listPrescriptionsSP.get(i).getQty(), tabletext));
				
				
			countp++;
			
				
			}
			
			
			document.add(HeaderTableCh1);
			HeaderTableCh1.flushContent();
			
			HeaderTableSpace.addCell(new Phrase("", tabletext));
			 document.add(HeaderTableSpace);
			 HeaderTableSpace.flushContent();
			 
			
			 
			 HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));

				document.add(HeaderTable5);
				HeaderTable5.flushContent();
				
				HeaderTableSpace.addCell(new Phrase("", tabletext));
				 document.add(HeaderTableSpace);
				 HeaderTableSpace.flushContent();
			
			}
			
    	 
//end prescription

//start Surgery Advice Info

IVFSxAdviceController sxController=(ApplicationContextUtils.getApplicationContext()).getBean(IVFSxAdviceController.class);
IvfSxService sxservice=(ApplicationContextUtils.getApplicationContext()).getBean(IvfSxService.class);
List<IVFSxAdvicedDTO> lstsxadviceObj=  sxservice.getIVFSxAdviceListByTreatmentId(ivfTreatId, unitId);

PdfPTable HeaderTablesxAdvice = new PdfPTable(3);
int[] headerwidthsxAdvice = {5,10,5 };
HeaderTablesxAdvice.setWidths(headerwidthsxAdvice);
HeaderTablesxAdvice.setWidthPercentage(95f);
HeaderTablesxAdvice.getDefaultCell().setBorder(Rectangle.BOX);

    if(lstsxadviceObj.size() > 0){
    	
    	HeaderTableH.addCell(new Phrase(" Surgery Advice Info:", subheader));
   	 HeaderTableH.addCell(new Phrase("", tabletext));
   	 HeaderTableH.addCell(new Phrase(" ", subheader));
   	 HeaderTableH.addCell(new Phrase("", tabletext));
   	 
   	 document.add(HeaderTableH);
   	 HeaderTableH.flushContent();
   	 
     HeaderTableSpace.addCell(new Phrase("", tabletext));
 	document.add(HeaderTableSpace);
 	HeaderTableSpace.flushContent();
    	
    	
    	HeaderTablesxAdvice.addCell(new Phrase("Sr.No", subheader));
    	HeaderTablesxAdvice.addCell(new Phrase("Name ", subheader));
    	HeaderTablesxAdvice.addCell(new Phrase("Date", subheader));
  
    int sxCount=1;
    for(int i=0;i< lstsxadviceObj.size() ;i++){
    	HeaderTablesxAdvice.addCell(new Phrase(""+sxCount, tabletext));
    	HeaderTablesxAdvice.addCell(new Phrase(""+lstsxadviceObj.get(i).getProcedureName(), tabletext));
    	HeaderTablesxAdvice.addCell(new Phrase(""+lstsxadviceObj.get(i).getAdviceDate(), tabletext));
    	sxCount++;
    }

    document.add(HeaderTablesxAdvice);
    HeaderTablesxAdvice.flushContent();
	
    
    HeaderTableSpace.addCell(new Phrase("", tabletext));
	document.add(HeaderTableSpace);
	HeaderTableSpace.flushContent();
	
	HeaderTableSpace.addCell(new Phrase("", tabletext));
	document.add(HeaderTableSpace);
	HeaderTableSpace.flushContent();
 
 HeaderTable5.addCell(new Phrase("", tabletext));
	HeaderTable5.addCell(new Phrase("", tabletext));
	 HeaderTable5.addCell(new Phrase("", tabletext));
	HeaderTable5.addCell(new Phrase("", tabletext));
	 HeaderTable5.addCell(new Phrase("", tabletext));
	HeaderTable5.addCell(new Phrase("", tabletext));
	 HeaderTable5.addCell(new Phrase("", tabletext));
		 document.add(HeaderTable5);
	HeaderTable5.flushContent();
	
	HeaderTableSpace.addCell(new Phrase("", tabletext));
	document.add(HeaderTableSpace);
	HeaderTableSpace.flushContent();
	
	 HeaderTableSpace.addCell(new Phrase("", tabletext));
		document.add(HeaderTableSpace);
		HeaderTableSpace.flushContent();
    }

//end Surgery Advice Info

//start Rediotherapy Advice



//end Rediotherapy Advice

//start subjective and objective

OPDClinicalEvaluationService clinicalService=(ApplicationContextUtils.getApplicationContext()).getBean(OPDClinicalEvaluationService.class);
OPDClinicalEvaluationDto clinicalObj=clinicalService.fetchClinicalEvalTempDataByTreatmentId(treatmentId, request);
if(clinicalObj !=null){
	
	

	HeaderTableH.addCell(new Phrase(" Subjective & Objective:", subheader));
  	 HeaderTableH.addCell(new Phrase("", tabletext));
  	 HeaderTableH.addCell(new Phrase(" ", subheader));
  	 HeaderTableH.addCell(new Phrase("", tabletext));
  	 
  	 document.add(HeaderTableH);
  	 HeaderTableH.flushContent();
  	 
    HeaderTableSpace.addCell(new Phrase("", tabletext));
	document.add(HeaderTableSpace);
	HeaderTableSpace.flushContent();
	
	
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
     
     PdfPTable HeaderTable33 = new PdfPTable(1);
     int[] headerwidth30 = {100};
     HeaderTable33.setWidths(headerwidth30);
     HeaderTable33.setWidthPercentage(95f);
     HeaderTable33.getDefaultCell().setBorder(Rectangle.NO_BORDER);
     htmlWorker.setMargins(50, 100, 100, 150);
     
     PdfPTable HeaderTable31 = new PdfPTable(1);
		int[] headerwidth31 = { 120 };
		HeaderTable31.setWidths(headerwidth31);
		HeaderTable31.setWidthPercentage(95f);
		HeaderTable31.getDefaultCell().setBorder(Rectangle.BOTTOM);
     String dm=clinicalObj.getClinicalEvaltemplateData();
     java.util.List<Element> ie1 = HTMLWorker.parseToList(new StringReader(dm), styleSheet);
     
     if(dm.equals("") || dm.equals("NULL")){
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
  	   java.util.List<Element> ie3 = HTMLWorker.parseToList(new StringReader(dm), styleSheet);
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
     
     
     HeaderTableSpace.addCell(new Phrase("", tabletext));
		document.add(HeaderTableSpace);
		HeaderTableSpace.flushContent();
		
		HeaderTableSpace.addCell(new Phrase("", tabletext));
		document.add(HeaderTableSpace);
		HeaderTableSpace.flushContent();
	 
	 HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		 HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		 HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		 HeaderTable5.addCell(new Phrase("", tabletext));
			 document.add(HeaderTable5);
		HeaderTable5.flushContent();
		
		HeaderTableSpace.addCell(new Phrase("", tabletext));
		document.add(HeaderTableSpace);
		HeaderTableSpace.flushContent();
		
		 HeaderTableSpace.addCell(new Phrase("", tabletext));
			document.add(HeaderTableSpace);
			HeaderTableSpace.flushContent();
     
}
//end subjective and objective

//start allergy info

	
	PdfPTable HeaderTableallergy = new PdfPTable(2);
	int[] headerwidthAllergy = {5,10 };
	HeaderTableallergy.setWidths(headerwidthAllergy);
	HeaderTableallergy.setWidthPercentage(95f);
	HeaderTableallergy.getDefaultCell().setBorder(Rectangle.BOX);
	
	List<OPDAllergyAlertsDto> lstallergyObj=clinicalService.fetchAllAllergyAlerts(treatmentId, request);
	
	if(lstallergyObj.size() > 0){
		   
		HeaderTableH.addCell(new Phrase(" Alerts & Allergies:", subheader));
	  	 HeaderTableH.addCell(new Phrase("", tabletext));
	  	 HeaderTableH.addCell(new Phrase(" ", subheader));
	  	 HeaderTableH.addCell(new Phrase("", tabletext));
	  	 
	  	 document.add(HeaderTableH);
	  	 HeaderTableH.flushContent();
	  	 
	    HeaderTableSpace.addCell(new Phrase("", tabletext));
		document.add(HeaderTableSpace);
		HeaderTableSpace.flushContent();
		
		HeaderTableallergy.addCell(new Phrase("Sr.No", subheader));
		HeaderTableallergy.addCell(new Phrase("Allergy Name ", subheader));
		int acount=1;
		for(int i=0;i< lstallergyObj.size() ;i++){
			HeaderTableallergy.addCell(new Phrase(""+acount, tabletext));
			HeaderTableallergy.addCell(new Phrase(""+lstallergyObj.get(i).getAllergyName(), tabletext));
			acount++;
		}
		
		document.add(HeaderTableallergy);
		HeaderTableallergy.flushContent();
		
		
		HeaderTableSpace.addCell(new Phrase("", tabletext));
		document.add(HeaderTableSpace);
		HeaderTableSpace.flushContent();
		
		HeaderTableSpace.addCell(new Phrase("", tabletext));
		document.add(HeaderTableSpace);
		HeaderTableSpace.flushContent();
	 
	 HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		 HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		 HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		 HeaderTable5.addCell(new Phrase("", tabletext));
			 document.add(HeaderTable5);
		HeaderTable5.flushContent();
		
		HeaderTableSpace.addCell(new Phrase("", tabletext));
		document.add(HeaderTableSpace);
		HeaderTableSpace.flushContent();
		
		 HeaderTableSpace.addCell(new Phrase("", tabletext));
			document.add(HeaderTableSpace);
			HeaderTableSpace.flushContent();
     
		
	}
	
//end allergy info


//start clinical staging
OPDClinicalStagingService clinicalStagingService=(ApplicationContextUtils.getApplicationContext()).getBean(OPDClinicalStagingService.class);
PdfPTable HeaderTableclinicalStaging = new PdfPTable(7);
	int[] headerwidthclinicalStaging = {5,10,5,5,5,5,5 };
	HeaderTableclinicalStaging.setWidths(headerwidthclinicalStaging);
	HeaderTableclinicalStaging.setWidthPercentage(95f);
	HeaderTableclinicalStaging.getDefaultCell().setBorder(Rectangle.BOX);
	
	List<OPDClinicalStagingDTO> lstclinicalStagingObj=clinicalStagingService.getOPDClinicalStagingList(treatmentId, unitId);
	if(lstclinicalStagingObj.size() > 0){
		
		HeaderTableH.addCell(new Phrase(" Clinical Staging:", subheader));
	  	 HeaderTableH.addCell(new Phrase("", tabletext));
	  	 HeaderTableH.addCell(new Phrase(" ", subheader));
	  	 HeaderTableH.addCell(new Phrase("", tabletext));
	  	 
	  	 document.add(HeaderTableH);
	  	 HeaderTableH.flushContent();
	  	 
	    HeaderTableSpace.addCell(new Phrase("", tabletext));
		document.add(HeaderTableSpace);
		HeaderTableSpace.flushContent();
		
		
		HeaderTableclinicalStaging.addCell(new Phrase("Sr.No ", subheader));
		HeaderTableclinicalStaging.addCell(new Phrase("Body Part  ", subheader));
		HeaderTableclinicalStaging.addCell(new Phrase("TNM Stage", subheader));
		HeaderTableclinicalStaging.addCell(new Phrase("Description ", subheader));
		HeaderTableclinicalStaging.addCell(new Phrase("Date ", subheader));
		HeaderTableclinicalStaging.addCell(new Phrase("Comment ", subheader));
		HeaderTableclinicalStaging.addCell(new Phrase("Investigator ", subheader));
		int icount=1;
		for(int i=0;i<lstclinicalStagingObj.size() ;i++){
			HeaderTableclinicalStaging.addCell(new Phrase(" "+icount, tabletext));
			HeaderTableclinicalStaging.addCell(new Phrase(" "+lstclinicalStagingObj.get(i).getBodyPartName(), tabletext));
			HeaderTableclinicalStaging.addCell(new Phrase(" "+lstclinicalStagingObj.get(i).getTnmStage(), tabletext));
			HeaderTableclinicalStaging.addCell(new Phrase(" "+lstclinicalStagingObj.get(i).getDescription(), tabletext));
			HeaderTableclinicalStaging.addCell(new Phrase(" "+lstclinicalStagingObj.get(i).getClinicalDate(), tabletext));
			HeaderTableclinicalStaging.addCell(new Phrase(" "+lstclinicalStagingObj.get(i).getComment(), tabletext));
			HeaderTableclinicalStaging.addCell(new Phrase(" "+lstclinicalStagingObj.get(i).getInvestigatorName(), tabletext));
			icount++;
		}
	  	
		document.add(HeaderTableclinicalStaging);
		HeaderTableclinicalStaging.flushContent();
		
		HeaderTableSpace.addCell(new Phrase("", tabletext));
		document.add(HeaderTableSpace);
		HeaderTableSpace.flushContent();
		
		HeaderTableSpace.addCell(new Phrase("", tabletext));
		document.add(HeaderTableSpace);
		HeaderTableSpace.flushContent();
	 
	 HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		 HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		 HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		 HeaderTable5.addCell(new Phrase("", tabletext));
			 document.add(HeaderTable5);
		HeaderTable5.flushContent();
		
		HeaderTableSpace.addCell(new Phrase("", tabletext));
		document.add(HeaderTableSpace);
		HeaderTableSpace.flushContent();
		
		 HeaderTableSpace.addCell(new Phrase("", tabletext));
			document.add(HeaderTableSpace);
			HeaderTableSpace.flushContent();
		
	}
//end clinical staging
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

			// START : Individual Instruction
			InstructionService instructionService=(ApplicationContextUtils.getApplicationContext()).getBean(InstructionService.class);
			List<OPDReportInstructionDTO> reportInstructionDTOList = instructionService.fetchIndividualTreatmentInstruction(treatmentId);
			if (reportInstructionDTOList.size() != 0) {

				PdfPTable HeaderTable7 = new PdfPTable(3);
				int[] headerwidth7 = { 2, 20, 40 };
				HeaderTable7.setWidths(headerwidth7);
				HeaderTable7.setWidthPercentage(95f);

				HeaderTable7.getDefaultCell()
						.setBorder(Rectangle.NO_BORDER);
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				document.add(HeaderTable7);
				HeaderTable7.flushContent();

				HeaderTable7.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("Primary Instructions",
						subheader));
				HeaderTable7.addCell(new Phrase("", header));
				document.add(HeaderTable7);
				HeaderTable7.flushContent();

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

							Table3.addCell(new Phrase("" + (i + 2) + ".",tabletext));

							Table3.addCell(new Phrase(""+ (reportInstructionDTOList.get(i + 1).getReportInstruction()),
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

				Table3.addCell(new Phrase("", header));
				Table3.addCell(new Phrase("", header));
				Table3.addCell(new Phrase("", header));
				Table3.addCell(new Phrase("", header));
				Table3.addCell(new Phrase("", header));
				document.add(Table3);
				Table3.flushContent();

			}
		
			// END : Individual Instruction
			
			// START : General Instruction
				List<String> generalInstructionList = instructionService.fetchPCTreatmentInstruction(treatmentId);
				System.out.println("generalInstructionList----"+generalInstructionList);
				if (generalInstructionList.size() != 0){
				PdfPTable HeaderTable7 = new PdfPTable(3);
				int[] headerwidth7 = { 2, 20, 40 };
				HeaderTable7.setWidths(headerwidth7);
				HeaderTable7.setWidthPercentage(95f);

				HeaderTable7.getDefaultCell()
						.setBorder(Rectangle.NO_BORDER);
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				document.add(HeaderTable7);
				HeaderTable7.flushContent();

				HeaderTable7.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("General Instructions",
						subheader));
				HeaderTable7.addCell(new Phrase("", header));
				document.add(HeaderTable7);
				HeaderTable7.flushContent();

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
										+ (generalInstructionList.get(i)),
								tabletext));
						Table3.addCell(new Phrase("", tabletext));
						 if (generalInstructionList.get(i + 1) != null
								|| generalInstructionList.get(i + 1) != "") {
							Table3.addCell(new Phrase("" + (i + 2) + ".",
									tabletext));
							Table3.addCell(new Phrase(
									""
											+ (generalInstructionList
													.get(i + 1)
													),
									tabletext)); 
						} 
						document.add(Table3);
						Table3.flushContent();
					}
				
				} catch (Exception e) {
					e.printStackTrace();
				}
				}
				// END: General Instruction
			
			
			
		
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
			HeaderTable4.addCell(new Phrase("", subheader));
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
				HeaderTable7.addCell(new Phrase("",	tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));

				HeaderTable7.addCell(new Phrase("",	tabletext));
				HeaderTable7.addCell(new Phrase("", subheader));
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