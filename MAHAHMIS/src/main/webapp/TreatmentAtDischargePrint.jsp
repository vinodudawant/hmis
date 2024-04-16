
<%@page import="com.hms.TempEventHandlerIPDPDF"%>
<%@page import="com.hms.patient.util.OSValidator"%>
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
<%@page import="com.hms.administrator.dto.CustomizeTemplate"%>
<%@page import="com.hms.model.TreatmentModel"%>
<%@page import="com.hms.ipd.nurshing.controller.TreatmentDischargeController"%>
<%@page import="com.hms.ipd.nurshing.service.TreatmentDischargeService"%>
<%@page import="com.hms.ipd.nurshing.dto.TreatmentDischargeDto"%>
<%@page import="com.lowagie.text.pdf.PdfGState"%>
<%@page import="com.lowagie.text.pdf.GrayColor"%>
<%@page import="com.lowagie.text.pdf.Barcode128"%>
<%@page import="com.lowagie.text.pdf.ColumnText"%>
<%@page import="com.lowagie.text.pdf.PdfContentByte"%>
<%@page import="com.lowagie.text.PageSize"%>
<%@page import="com.lowagie.text.HeaderFooter"%>

<%@page import="com.lowagie.text.pdf.BaseFont"%>

<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="com.lowagie.text.Chunk,com.lowagie.text.Document,com.lowagie.text.Element,com.lowagie.text.Font 
,com.lowagie.text.HeaderFooter,com.lowagie.text.Image,com.lowagie.text.Paragraph,com.lowagie.text.Phrase,com.lowagie.text.Rectangle
,com.lowagie.text.pdf.PdfPCell,com.lowagie.text.pdf.PdfPTable,com.lowagie.text.pdf.PdfWriter,com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport,
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants, com.hms.pharmacy.upload.FilePath,java.nio.file.Paths"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@page import="java.util.Calendar"%>
<!DOCTYPE html>
<html>
<head>
<meta  http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Opd Print</title>
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

			//String fontName = application.getRealPath("fonts\\Shivaji05.ttf");C:\Fonts
			//String fontName = application.getRealPath("fonts//Shivaji05.ttf");
			//String fontName= application.getRealPath("C://Fonts//Shivaji05.ttf");
			
			//String fontName= application.getRealPath("\\fonts\\Shivaji05.ttf");
			//String fontName= "E://S2 Data//MAHAHMIS DATA//MAHAHMIS_WORKSPACE_16-06-2022//mahait//MAHAHIMS01//src//main//webapp//fonts//Shivaji05.ttf";  
			//System.out.println("fontName======"+fontName);
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
				com.lowagie.text.FontFactory.register(fontName);
			
			//for centerpatientId
		    String patientId= resourceBundle.getObject("patientIdLabel").toString();
					
					
		    String treatment_Id = request.getParameter("treatID");
			String patient_Id = request.getParameter("patID");
			//String type = request.getParameter("type");
			String instructionLang = request.getParameter("langInstruction");
			String dischargedate=request.getParameter("dischargedate");
			String dischargeType=request.getParameter("discharge_Type");

			int treatmentId = Integer.parseInt(request.getParameter("treatID"));
			String  languageOF=request.getParameter("instructionLanguage");
			//String  CallFromOPD=request.getParameter("callfrom");
			String  printTitle= "Treatment At Discharge"; //request.getParameter("printTitle");
			String  patientName=request.getParameter("patientName");
			//String idTreatment = request.getParameter("treatmentId");
			//String callFrom = request.getParameter("callFrom");
	      String headerFlag="Yes";
	      //if(dischargeType.equalsIgnoreCase("Discharge")){
	   	    headerFlag="Yes";
	      //}
			
			HttpSession session1 = request.getSession();
			Integer userId = (Integer) session1.getAttribute("userId");
			//Integer unitId = (Integer) session1.getAttribute("uId");
			request.setAttribute("headerFlag", headerFlag);
			request.setAttribute("covide", "No");
			request.setAttribute("pageIteration", 0);
			request.setAttribute("footerAddress", "");		
			request.setAttribute("printTitle", printTitle);
			
			String printType="TreatmentAtDischarge";
			request.setAttribute("printType", printType);
			//String user_name = (String) session1.getAttribute("userName");
			Integer unitId = (Integer) session1.getAttribute("uId");
			
			request.setAttribute("treatmentId", request.getParameter("treatID"));		
					
					
			
			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			
			if(billPrintsHeader.contains("off")){
				
				document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
				
			}
			document.setMargins(20, 20, 20, 0);

			//PdfWriter.getInstance(document, outStream);
			
			PdfWriter pdfWriter = PdfWriter.getInstance(document, outStream);			
			TempEventHandlerIPDPDF  event = new TempEventHandlerIPDPDF();
			pdfWriter.setPageEvent(event);
			
			document.open();
		
			/* -------------------- Define Fonts ---------------------------  */			
			Font header = new Font(Font.HELVETICA, 10, Font.BOLD);
			Font subheader = new Font(Font.HELVETICA, 8, Font.BOLD);
			Font footer = new Font(Font.HELVETICA, 8, Font.BOLD);
			header.setColor(10, 4, 2);

			Font tableheader = new Font(Font.HELVETICA, 10, Font.BOLD);
			Font tabletext = new Font(Font.HELVETICA, 8, Font.NORMAL);
			Font small = new Font(Font.HELVETICA, 8, Font.NORMAL);
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
			
			
			//String chemoDate=request.getParameter("chemoDate");
						String  treatmentId1=request.getParameter("treatID");
						String  patientId1=request.getParameter("patID");

			
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
			 
 			
			 
			LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
			AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
			List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
			
				
			
			BillService hm = (ApplicationContextUtils.getApplicationContext()).getBean(BillService.class);				
			List<BillReceiptMasterDTO> lstPojo = new ArrayList<BillReceiptMasterDTO>();
			String pendFlag = request.getParameter("pendFlag");
			String callFrom = "receipt";
			/* if (pendFlag.equals("Y")) {

				callFrom = "prevReceipt";
			} else {

				callFrom = "receipt";
			} */

			Integer patBillId = ltRegMasterDto.get(0).getBillId();
			String billId = String.valueOf(ltRegMasterDto.get(0)
					.getBillId());
			String PatientID = String.valueOf(ltRegMasterDto.get(0)
					.getPatientId());

			/* lstPojo = hm.getOpdRecDetails(patBillId, treatmentId, patId,
					recId, callFrom); */
			
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

			

			//irfan khan 11-jan-2018 multi pay mode list
		/* 	List<MultiBillReceiptMasterDTO> listMultiPay = new ArrayList<MultiBillReceiptMasterDTO>();
			listMultiPay = hm.getMultiRecDetails(patBillId, treatmentId,patId, recId, departmentId); */

			DecimalFormat df2 = new DecimalFormat("0.00");

		//added by vishant	
			//For No. of prints.
			//AdminModel adminModel = new AdminModel();
			int printId = 2;
			int numOfPrint = 1; // adminModel.generalAccessNumOfPrint(printId);// to get number of prints
			for (int pro = 0; pro < 1; pro++) {
			
				
				if(pro > 0){
					 document.newPage();
					} 		
			//document.newPage();			

			

			// Table 1 : For hospital adress details end

			// Table 2 : For receipt head start

			PdfPTable HeaderTable2 = new PdfPTable(5);
			int[] headerwidth2 = { 15, 24, 40, 9, 20 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);

			if (billPrintsHeader.contains("off")) {

				HeaderTable2.setSpacingBefore(70f);
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

			
			//---------------------------------------------------------------------------//
			String date_pick=(request.getParameter("date_pick"));
				//TreatmentModel tModel = new TreatmentModel();
			
			//	CustomizeTemplate objTemplate=new CustomizeTemplate();
			
			
			//AdminModel admodel1 = new AdminModel();
			Doctor doc2 = new Doctor();
			List<Doctor> listDoc2 = null;
			
		
			if(totRemain==0){
				
				
			}
			
		
			document.add(HeaderTable3);
			HeaderTable3.flushContent();

			
			

// strat History Data
			// strat template Data

		PdfPTable HeaderTable6 = new PdfPTable(6);
				int[] headerwidth6 = { 10, 30, 44, 24, 16, 20 };
				HeaderTable6.setWidths(headerwidth6);
				HeaderTable6.setWidthPercentage(95f);
				HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
				PdfPTable twoPT2 = new PdfPTable(2);
				int[] widthInst2 = { 25, 75 };
				twoPT2.setWidths(widthInst2);
				twoPT2.setWidthPercentage(95f);
				twoPT2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				//int unitId=1;
				TreatmentDischargeController uss1=(ApplicationContextUtils.getApplicationContext()).getBean(TreatmentDischargeController.class);
				TreatmentDischargeService uss2=(ApplicationContextUtils.getApplicationContext()).getBean(TreatmentDischargeService.class);
						List<TreatmentDischargeDto> order_comp_drugesli=uss2.getAllPrescriptionsByTreatmentId(treatmentId, unitId);
							
				if (order_comp_drugesli.size() != 0) {
					
					String osName = System.getProperty("os.name");
					/* if (osName.equalsIgnoreCase("Linux")) {
						FontFactory.register("/usr/share/fonts/ARIALUNI/Shiv05.ttf");
					} else {
						FontFactory.register("C:/Windows/Fonts/Shiv05.ttf");
					} */
					
					//twoPT2.addCell(new Phrase("Treatment at Discharge : ", header));
					twoPT2.addCell(new Phrase("", subheader));
					
					twoPT2.addCell(new Phrase("", subheader));
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
					
					if (order_comp_drugesli.size() != 0) {


						HeaderTable6.addCell(new Phrase("#", subheader));
						HeaderTable6.addCell(new Phrase("Prep. Drug", subheader));
						HeaderTable6.addCell(new Phrase("Advice", subheader));
						HeaderTable6.addCell(new Phrase("Frequency", subheader));
						HeaderTable6.addCell(new Phrase("Duration", subheader));
						HeaderTable6.addCell(new Phrase("Qty.", subheader));

						document.add(HeaderTable6);
						HeaderTable6.flushContent();
						
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						
						HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);

						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						

						document.add(HeaderTable6);
						HeaderTable6.flushContent();

						
			 			for(int i=0;i<order_comp_drugesli.size();i++){
							
			 				String dayPrescription=order_comp_drugesli.get(i).getDayPrescription();
							String day[] = dayPrescription.split(",");     
							int Morning = Integer.parseInt(day[0]);
							int Afternoon = Integer.parseInt(day[1]);
							int Evening = Integer.parseInt(day[2]);
							int Night = Integer.parseInt(day[3]);
			 				

 
							    String instructions=order_comp_drugesli.get(i).getInstructionNameForUI();
								String instArray[]=instructions.split("/");
								System.err.println("instructions........."+instructions);
								
								String englishInstr=instArray[0];
								String hindiInstr=instArray[1];
								String marathiInstr=instArray[2];
								System.err.println("languageOF........."+languageOF);
								/* if(languageOF.equalsIgnoreCase("ENGLISH")){
									
									HeaderTableCh.addCell(new Phrase(""+englishInstr, tabletext));
									
								}else if(languageOF.equalsIgnoreCase("MARATHI")){
									
									HeaderTableCh.addCell(new Phrase(""+marathiInstr, com.lowagie.text.FontFactory.getFont("Shivaji05", 10)));
									
								} */
														
							 
 
 							HeaderTable6.addCell(new Phrase(""+(i+1), tabletext));
							HeaderTable6.addCell(new Phrase(""+order_comp_drugesli.get(i).getMedicineName(), tabletext));
							//HeaderTable6.addCell(new Phrase(""+order_comp_drugesli.get(i).getInstructionNameForUI(), com.lowagie.text.FontFactory.getFont("Shivaji05", 10)));
							HeaderTable6.addCell(new Phrase(""+englishInstr,tabletext ));
							HeaderTable6.addCell(new Phrase(""+Morning+" - "+Afternoon+" - "+Evening+" - "+Night, tabletext));
							HeaderTable6.addCell(new Phrase(""+order_comp_drugesli.get(i).getDays()+" Days", tabletext));
							HeaderTable6.addCell(new Phrase(""+order_comp_drugesli.get(i).getQty(), tabletext));
					}
					
			 			HeaderTable6.getDefaultCell()
								.setBorder(Rectangle.NO_BORDER);

						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));

						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));

						
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));

						document.add(HeaderTable6);
						HeaderTable6.flushContent();

						
					}
					
					HeaderTable6.addCell(new Phrase("", tabletext));
					 document.add(HeaderTable6);
					 HeaderTable6.flushContent(); 
					
				}
				
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

				document.add(HeaderTable5);
				HeaderTable5.flushContent();		
		
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

			

			// Table4 : For page footer end

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