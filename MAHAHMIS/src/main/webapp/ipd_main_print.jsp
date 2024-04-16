<%@page import="com.hms.ehat.dto.TreatmentDto"%>
<%@page import="com.hms.ipd.controller.IPD_AutoSummaryController"%>
<%@page import="com.hms.doctordesk.dto.OPDRadioTheropyCheckBox"%>
<%@page import="com.hms.doctordesk.dto.OPDCareAdviceDTO"%>
<%@page import="com.hms.ipd.service.IPDHistoryService"%>
<%@page import="com.hms.ipd.dto.DoctorRoundSlaveDTO"%>
<%@page import="com.hms.ipd.dto.DoctorRoundDTO"%>
<%@page import="java.util.Calendar"%>
<%@page import="com.hms.TempEventHandlerIPDPDF"%>
<%@page import="com.hms.opdbill.dto.PatientHeaderInfoDto"%>
<%@page import="com.hms.ipd.service.BedMgtService"%>
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

<%@page import="com.hms.ehat.dto.EhatBillPrefix"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.dto.DoctorDto"%>
<%@page import="com.hms.ehat.controller.MarkVisitController"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.lowagie.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.lowagie.text.html.simpleparser.StyleSheet"%>
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
<%@page import="com.lowagie.text.pdf.PdfGState"%>
<%@page import="com.lowagie.text.pdf.GrayColor"%>
<%@page import="com.lowagie.text.pdf.Barcode128"%>
<%@page import="com.lowagie.text.pdf.ColumnText"%>
<%@page import="com.lowagie.text.pdf.PdfContentByte"%>
<%@page import="com.lowagie.text.PageSize"%>
<%@page import="com.lowagie.text.HeaderFooter"%>

<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
	import="com.lowagie.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.lowagie.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<!DOCTYPE html>
<html>
<head>
<meta  http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>IPD Print</title>
</head>
<body>
	<%
		try {
		/* -------------------------------------- Declaration ---------------------------------------------   */
		HttpSession session2 = request.getSession();
		int hospitalUnitId= (Integer) session2.getAttribute("uId");
		response.setContentType("application/pdf");
		HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
	//	List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
		List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
		HospitalDetails hospObj = arrHospitalDetails.get(0);
		

		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		
		Document document = new Document(PageSize.A4);
		document.setMargins(20, 20, 20, 145);
		
		Font header = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font headerTitle = new Font(Font.HELVETICA, 9, Font.BOLD);
		Font headerUnderline = new Font(Font.HELVETICA, 11, Font.BOLD | Font.UNDERLINE);
		Font subheader = new Font(Font.HELVETICA, 8, Font.BOLD);
		Font footer = new Font(Font.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);
		Font tableheader22 = new Font(Font.HELVETICA, 21, Font.BOLD);
		Font tableheader11 = new Font(Font.HELVETICA, 13, Font.BOLD);
		Font tableheader111 = new Font(Font.HELVETICA, 13, Font.BOLD);
		Font tableheader12 = new Font(Font.COURIER, 13, Font.BOLD);
		Font tableheader13 = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font tableheader14 = new Font(Font.HELVETICA, 10,Font.BOLD | Font.UNDERLINE);
		Font tableheader = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font tabletext = new Font(Font.HELVETICA, 8, Font.NORMAL);
		Font tabletext7 = new Font(Font.HELVETICA, 8, Font.NORMAL);
		Font tableheader15 = new Font(Font.HELVETICA, 10, Font.NORMAL);		
		Font small = new Font(Font.HELVETICA, 8, Font.NORMAL);
		Font subheaderUNDERLINE = new Font(Font.HELVETICA, 9, Font.BOLD | Font.UNDERLINE);
		
		ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");

		/* =============================================================================== */
		/* Newly added font for the grater than and less than sign expression */
		/* =============================================================================== */
		String fontFilePath = "itext-font/Cardo-Regular.ttf";
		String fontFileRealPath = application.getRealPath(fontFilePath);
		//BaseFont bf_cjk = BaseFont.createFont("R://Airport_disha/EhatEnterprise/WebContent/itext-font/Cardo-Regular.ttf",BaseFont.IDENTITY_H,BaseFont.EMBEDDED);
		BaseFont bf_cjk = BaseFont.createFont(fontFileRealPath, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
		Font bf_cjk_font = new Font(bf_cjk, 10, Font.BOLD);
		/* =============================================================================== */
		/* =============================================================================== */
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
				//String fontName= "E://S2 Data//MAHAHMIS DATA//MAHAHMIS_WORKSPACE_16-06-2022//mahait//MAHAHIMS01//src//main//webapp//fonts//Shivaji05.ttf";  
				System.out.println("fontName======"+fontName);
				com.lowagie.text.FontFactory.register(fontName);
		
		String billPrint = (String) resource.getObject("billPrint").toString();
		String subobjWithComplaintAndFinding ="off";
		ResourceBundle resourceBundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalname = (String) resourceBundle.getObject("hospitalname").toString();
		//for centerpatientId
	    String patientId= resource.getObject("patientIdLabel").toString();
		
	    int patId=Integer.parseInt(request.getParameter("patId"));
		Integer treatmentId=Integer.parseInt(request.getParameter("treatId"));
		int recId=Integer.parseInt(request.getParameter("recId"));
		String  languageOF=request.getParameter("instructionLanguage");
		String  CallFromOPD=request.getParameter("CallFrom");
		int unitId=Integer.parseInt(request.getParameter("unitId"));
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
		//Integer patientId2 = ltRegMasterDto.get(0).getPatientId();
		
		Image img = null;
		PdfPCell cell = null;
		Image imgFQRcode=null;
		
		
		
      

		
		String  printTitle= "IPD Case Record "; //request.getParameter("printTitle");
		String  patientName=request.getParameter("patientName");
		//String idTreatment = request.getParameter("treatmentId");
		//String callFrom = request.getParameter("callFrom");
      	String headerFlag="Yes";
      if(CallFromOPD.equalsIgnoreCase("withoutheader")){
    	  headerFlag="No";
      }
      
		
		HttpSession session1 = request.getSession();
		Integer userId = (Integer) session1.getAttribute("userId");
		//Integer unitId = (Integer) session1.getAttribute("uId");
		request.setAttribute("headerFlag", headerFlag);
		request.setAttribute("covide", "No");
		request.setAttribute("pageIteration", 0);
		request.setAttribute("footerAddress", "");		
		request.setAttribute("printTitle", printTitle);
		
		String printType="IPDPrint";
		request.setAttribute("printType", printType);
		//String user_name = (String) session1.getAttribute("userName");
		//Integer unitId = (Integer) session1.getAttribute("uId");
		
		request.setAttribute("treatmentId", request.getParameter("treatId"));
		
		SimpleDateFormat formDate = new SimpleDateFormat("dd-MM-yyyy");
	    String strDate = formDate.format(new Date());
		//response.setHeader("Content-Disposition", "inline; filename="+pmobile+"_"+ppName+"_"+profileName+"_"+strDate+".pdf");	
		//response.setHeader("Content-Disposition", "inline; filename="+patientName+"_"+strDate+".pdf");

		PdfPTable hospitalHeader = new PdfPTable(3);
		int[] hospitalHeaderWidth = { 30, 70, 35 };
		hospitalHeader.setWidths(hospitalHeaderWidth);
		hospitalHeader.setWidthPercentage(95f);
		hospitalHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
		hospitalHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		PdfPTable headerTable = new PdfPTable(2);
		int[] headerTableWidth = { 50, 50 };
		headerTable.setWidths(headerTableWidth);
		headerTable.setWidthPercentage(95f);
		headerTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		

		/* -------------------------------------- End Declaration -------------------------------------------   */

		/* --------------------------------------All Services -------------------------------------------   */
		PdfWriter pdfWriter = PdfWriter.getInstance(document, outStream);	
		TempEventHandlerIPDPDF  event = new TempEventHandlerIPDPDF();
		pdfWriter.setPageEvent(event);
	
		String reportFooterAddress = "";//hospObj.getReportFooterAddress();
		if(reportFooterAddress.equalsIgnoreCase(null) || reportFooterAddress.equalsIgnoreCase("") || reportFooterAddress == null)
		{
			reportFooterAddress="";			
		}
		
		document.open();		
		
			int emrId = 0;
			/* String strForPat = patientObject[0].substring(0,
					patientObject[0].length()); */
			
					String docId=ltRegMasterDto.get(0).getDoctorId();
					//ResourceBundle resource= ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
					//String billPrint = (String) resource.getObject("billPrint").toString();
					String billPrintsHeader = (String) resource.getObject("billPrintsHeader").toString();	
					String concessionFlow = (String) resource.getObject("concessionFlow").toString();	

		java.util.Calendar currentDate = Calendar.getInstance();
		SimpleDateFormat dateformatter = new SimpleDateFormat("yyyy-MM-dd hh:mm aa");
		//SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss a");
		String curr_date = dateformatter.format(currentDate.getTime());
		NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");

		PdfPTable Headertable3 = new PdfPTable(3);
		int[] HeaderWidth3 = { 0,100,0 };
		Headertable3.setWidths(HeaderWidth3);
		Headertable3.setWidthPercentage(95f);
		Headertable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);			

		

			
			boolean pageflag=true;
			boolean codefbsppbss=true;

			String proname="";
			Integer proId=0;
			String pkgname = "";
			String barcodefbsppbs="";
			String fbsppbscollecteddate="";
			String fbsppbspostdate="";
			PdfContentByte canvas = pdfWriter.getDirectContentUnder();
			Barcode128 code129 = new Barcode128();
			
			
			
			for (int pro = 0; pro < 1; pro++) {

				
				request.setAttribute("pageIteration", pro);
				int[] HeaderWidth1 = { 0, 100,0 };
				 
				
				/* if(list.size() > 1){
			//document.newPage();
				}else{} */
				
				 if(pro > 0){
				 document.newPage();
				} 		

				// Table 1 : For hospital adress details start

				PdfPTable HeaderTable1 = new PdfPTable(3);
				int[] headerwidth1 = { 30, 80, 30 };
				HeaderTable1.setWidths(headerwidth1);
				HeaderTable1.setWidthPercentage(95f);
				HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
				HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				

				

				Font regular = new Font(Font.TIMES_ROMAN, 10, Font.NORMAL);
				Font bold = new Font(Font.TIMES_ROMAN, 14, Font.BOLD);
				Phrase p = new Phrase();
				
				System.err.println("CallFromOPD..."+CallFromOPD);
			

				

				// Table 1 : For hospital adress details end

				// Table 2 : For receipt head start

				PdfPTable HeaderTable2 = new PdfPTable(5);
				int[] headerwidth2 = { 15, 24, 40, 9, 20 };
				HeaderTable2.setWidths(headerwidth2);
				HeaderTable2.setWidthPercentage(95f);

				if (billPrintsHeader.contains("off")) {

					//HeaderTable2.setSpacingBefore(70f);
				}

				HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				/* HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable2.addCell(new Phrase("", subheader));
				PdfPCell subcell = new PdfPCell(new Phrase("", subheader));
				subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
				subcell.setBorder(Rectangle.BOTTOM);
				HeaderTable2.addCell(subcell);
				HeaderTable2.addCell(new Phrase("    IPD print ", header));
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				document.add(HeaderTable2);
				HeaderTable2.flushContent(); */

				// Table 2 : For receipt head end

				
	 
	 
				//new table no 5 start
				BedMgtService uss = (ApplicationContextUtils.getApplicationContext()).getBean(BedMgtService.class);
				PatientHeaderInfoDto rtd = new PatientHeaderInfoDto();			
				List<RegTreBillDto> ltPatientRecord = null;
				rtd=uss.getIpdPatientHeaderInfo(treatmentId, unitId);
				rtd=rtd.getListRegTreBillDto().get(0);
				
				//use for patient full address
			
				
			
				 
				/*  RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
					List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
					ltRegMasterDto =us.fetchPatientsRecordByTreatmentId(treatId); */
					
					 int sponsorSlave=rtd.getChargesMasterSlaveId();
				
				 
				 String BillCategoryName ="";
				 String state  ="";
				 String district  ="";
				 String cityObj  ="";
				 String taluka  ="";
				 
				LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
				AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
				List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
				
				
				
				/* if(sponsorSlave > 0){
					fetchsposor   = obj.fetchSuperCatofchargesSlave(sponsorSlave);
					if(fetchsposor.size() >0){
						BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
						BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id"); 
						}
				}else{
					BillCategoryName = "Self";
				} */
				
				BillCategoryName = rtd.getCategoryName();

				/* if(doctorId > 0){
					Consultant   = fetchlist.getStringValOfObject("doctor","doc_name",doctorId,"Doctor_ID");
				} */ 
				
				/* if(sponsorSlave > 0){
					fetchsposor   = obj.fetchSuperCatofchargesSlave(sponsorSlave);
					BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
					BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id"); 
				}else{
					BillCategoryName = "Self";
				} */
				

				
				
				
				DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
				Date date = new Date();
				String curDate=dateFormat.format(date);
	 
	 
	 
				// Table3 : For patient header info start

				PdfPTable HeaderTable3 = new PdfPTable(4);
				int[] headerwidth3 = { 30, 50, 30, 50 };
				HeaderTable3.setWidths(headerwidth3);
				HeaderTable3.setWidthPercentage(95f);
				HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				//AdminModel admodel1 = new AdminModel();
				Doctor doc2 = new Doctor();
				List<Doctor> listDoc2 = null;
				
			
				
				
				

				PdfPTable HeaderTable51 = new PdfPTable(4);
				int[] headerwidth51 = { 15,40,15,30};
				HeaderTable51.setWidths(headerwidth51);
				HeaderTable51.setWidthPercentage(95f);		
				
				HeaderTable51.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
				/* HeaderTable51.addCell(new Phrase("", subheader));
				HeaderTable51.addCell(new Phrase("", subheader));
				HeaderTable51.addCell(new Phrase("", subheader));
				HeaderTable51.addCell(new Phrase("", subheader)); */
			
				
				
			
				
				
				PdfPTable HeaderTable5 = new PdfPTable(7);
				int[] headerwidth5 = { 27, 40, 30, 10, 15, 40, 20 };
				HeaderTable5.setWidths(headerwidth5);
				HeaderTable5.setWidthPercentage(95f);
				HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

			
				

	// strat History Data



	OPDHistoryController uss1=(ApplicationContextUtils.getApplicationContext()).getBean(OPDHistoryController.class);
	OPDHistoryService uss2=(ApplicationContextUtils.getApplicationContext()).getBean(OPDHistoryService.class);
	 OPDHistoryMasterDTO historyobj=  uss2.getOPDHistory(treatmentId);

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
				/* PdfPTable HeaderTableH = new PdfPTable(1);
				int[] headerwidthChemo = {100 };
				HeaderTableH.setWidths(headerwidthChemo);
				HeaderTableH.setWidthPercentage(95f);
			 	HeaderTableH.getDefaultCell().setBorder(Rectangle.NO_BORDER); */
			 	//HeaderTableH.setSpacingAfter(5.0f);
				
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
	      			
	      			 HeaderTableH.addCell(new Phrase("Chief Complaints ", subheader));
	            	 HeaderTableH.addCell(new Phrase(""+historyobj.getChiefComplaints(), tabletext));
	            	 HeaderTableH.addCell(new Phrase("Negative History:", subheader));
	            	 HeaderTableH.addCell(new Phrase(""+historyobj.getNegativeHistory(), tabletext));
	            	 
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
			        	 HeaderTableH.addCell(new Phrase(""+historyobj.getProvisionalDiagno(), tabletext));
			        	 HeaderTableH.addCell(new Phrase("Treatment Plan: ", subheader));
			        	 HeaderTableH.addCell(new Phrase(""+historyobj.getTreatPlan(), tabletext));
			        	 
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
	DiagonosisController daignocontrooler=(ApplicationContextUtils.getApplicationContext()).getBean(DiagonosisController.class);
	DiagonosisService diagnoservice=(ApplicationContextUtils.getApplicationContext()).getBean(DiagonosisService.class);
	List<DiagonosisMasterDto> lstdignoObj=  diagnoservice.getListOfDiagoList(treatmentId);
	 
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
						if(lstdignoObj.get(i).getDiagnoType().equalsIgnoreCase("Provisional")){
						HeaderTableDiagno.addCell(new Phrase(""+pcount, tabletext));
						HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDiagoName(), tabletext));
						HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDiagndesc(), tabletext));
						HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getIcd10_code(), tabletext));
						HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDate(), tabletext));
						HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDiagnoType(), tabletext));
						HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getComment(), tabletext));
						pcount++;
						}
						
				
			}
			document.add(HeaderTableDiagno);
			HeaderTableDiagno.flushContent();
			
			 HeaderTableSpace.addCell(new Phrase("", tabletext));
				document.add(HeaderTableSpace);
				HeaderTableSpace.flushContent();
				
				int confirmDiagnosis=0;
				for(int i=0; i< lstdignoObj.size();i++){
							if(lstdignoObj.get(i).getDiagnoType().equalsIgnoreCase("Confirmed")){
								confirmDiagnosis++;
							}
								
				}
			if(confirmDiagnosis!=0){
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
								if(lstdignoObj.get(i).getDiagnoType().equalsIgnoreCase("Confirmed")){
								HeaderTableDiagno.addCell(new Phrase(""+ccount, tabletext));
								HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDiagoName(), tabletext));
								HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDiagndesc(), tabletext));
								HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getIcd10_code(), tabletext));
								HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDate(), tabletext));
								HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getDiagnoType(), tabletext));
								HeaderTableDiagno.addCell(new Phrase(""+lstdignoObj.get(i).getComment(), tabletext));
								ccount++;
								}
						
					}
					
					
					document.add(HeaderTableDiagno);
					HeaderTableDiagno.flushContent();
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
				  			
				  			
	}

	//End Dignosis Info
	
	//start doctor round
	    IPDHistoryService historyService = (ApplicationContextUtils.getApplicationContext()).getBean(IPDHistoryService.class);
		List<DoctorRoundDTO> pdrrlist = historyService.fetchDoctorRounds(treatmentId, 1);
		System.out.println("----------" + pdrrlist);
		
		if (pdrrlist.size() > 0) {
			List<DoctorRoundSlaveDTO> doctorRoundSlave = pdrrlist.get(0).getListDoctorRoundSlaveDTO();
			//	End Doctor Round
				
				PdfPTable DRRHeaderTable = new PdfPTable(1);
				int[] DRRHeaderWidth = { 50 };
				DRRHeaderTable.setWidths(DRRHeaderWidth);
				DRRHeaderTable.setWidthPercentage(95f);
				DRRHeaderTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				PdfPTable DRRHeaderTable1 = new PdfPTable(7);
				int[] DRRHeaderWidth1 = { 20, 22, 20, 30, 80, 40, 50 };
				DRRHeaderTable1.setWidths(DRRHeaderWidth1);
				DRRHeaderTable1.setWidthPercentage(95f);
				DRRHeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				DRRHeaderTable1.addCell(new Phrase("", tabletext));
				DRRHeaderTable1.addCell(new Phrase("", tabletext));
				DRRHeaderTable1.addCell(new Phrase("", tabletext));
				DRRHeaderTable1.addCell(new Phrase("", tabletext));
				DRRHeaderTable1.addCell(new Phrase("", tabletext));
				DRRHeaderTable1.addCell(new Phrase("", tabletext));
				DRRHeaderTable1.addCell(new Phrase("", tabletext));

				document.add(DRRHeaderTable);
				DRRHeaderTable.flushContent();
				
				
				if (pdrrlist.size() != 0) {
			
					DRRHeaderTable.addCell(new Phrase("Doctor Round Details :-", subheader));

					DRRHeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));

					document.add(DRRHeaderTable);
					DRRHeaderTable.flushContent();

					DRRHeaderTable1.addCell(new Phrase("#", subheader));
					DRRHeaderTable1.addCell(new Phrase("Date", subheader));
					DRRHeaderTable1.addCell(new Phrase("Time", subheader));
					DRRHeaderTable1.addCell(new Phrase("Template Name", subheader));
					DRRHeaderTable1.addCell(new Phrase("Clinical Notes", subheader));
					DRRHeaderTable1.addCell(new Phrase("Investigation Advice", subheader));
					DRRHeaderTable1.addCell(new Phrase("RoundBy", subheader));

					DRRHeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));

					document.add(DRRHeaderTable1);
					DRRHeaderTable1.flushContent();
					
					/* twoPT22.addCell(new Phrase("Doctor Round Report:", subheader));
					twoPT22.addCell(new Phrase("", tabletext)); */
				}
			int count=1;	
			for(int j =0 ;j < pdrrlist.size();j++){	
				
				
				for (int i = 0; i < pdrrlist.get(j).getListDoctorRoundSlaveDTO().size(); i++) {
					
					
					//fetch date
					DateFormat formatter2 = new SimpleDateFormat("dd/MM/yyyy");
					String todayAsString = formatter2.format(pdrrlist.get(j).getPreviousDate());
					
					DRRHeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					DRRHeaderTable1.addCell(new Phrase("" + (count), tabletext));
					DRRHeaderTable1.addCell(new Phrase("" + todayAsString, tabletext));
					DRRHeaderTable1.addCell(new Phrase("" + pdrrlist.get(j).getListDoctorRoundSlaveDTO().get(i).getTime(), tabletext));
					if( pdrrlist.get(j).getListDoctorRoundSlaveDTO().get(i).getTemplateId() == 0){
						DRRHeaderTable1.addCell(new Phrase("", tabletext));
	        		 }else{
					     DRRHeaderTable1.addCell(new Phrase("" + pdrrlist.get(j).getListDoctorRoundSlaveDTO().get(i).getTemplateName(), tabletext));
			    	}
					if (pdrrlist.get(j).getListDoctorRoundSlaveDTO().get(i).getClinicalNotes() != null) {
						DRRHeaderTable1.addCell(new Phrase("" + pdrrlist.get(j).getListDoctorRoundSlaveDTO().get(i).getClinicalNotes(), tabletext));
					} else {
						DRRHeaderTable1.addCell(new Phrase("-", tabletext));
					}
					DRRHeaderTable1.addCell(new Phrase("" + pdrrlist.get(j).getListDoctorRoundSlaveDTO().get(i).getInvestigationAdvice(), tabletext));
					DRRHeaderTable1.addCell(new Phrase("" + pdrrlist.get(j).getListDoctorRoundSlaveDTO().get(i).getDoctorName(), tabletext));

					DRRHeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));
					DRRHeaderTable1.addCell(new Phrase("", tabletext));

					document.add(DRRHeaderTable1);
					DRRHeaderTable1.flushContent();

				
					
					/* 
					twoPT22.addCell(new Phrase("", tabletext));
					twoPT22.addCell(new Phrase("" + (i + 1) + ".    " + doctorRoundSlave.get(i).getTime() + ", "
							+ doctorRoundSlave.get(i).getClinicalNotes() + ", "
							+ doctorRoundSlave.get(i).getInvestigationAdvice() + ", " + doctorRoundSlave.get(i).getDoctorName(),
							tabletext));
			
					document.add(twoPT22);
					twoPT22.flushContent();
					
				 */
				count++;
				}
				/* if (pdrrlist.size() > 0) {
					HeaderTable31.addCell(new Phrase("", tabletext));
					document.add(HeaderTable31);
					HeaderTable31.flushContent();
				} */
				 
			}
		  }
		
		
	//end doctor round	
	

	//start service Advice Info
		 //start service Advice Info
      	HttpServletRequest hrequest=null;
      OpdServicesAdvisedController serviceController=(ApplicationContextUtils.getApplicationContext()).getBean(OpdServicesAdvisedController.class);
      OpdServicesAdvisedService serviceAdvice=(ApplicationContextUtils.getApplicationContext()).getBean(OpdServicesAdvisedService.class);
      List<CpoeServdetails> lstserviceObj=  serviceAdvice.getListBillIPD(treatmentId, "default", 0, hrequest);

      PdfPTable HeaderTableServiceAdvice = new PdfPTable(6);
      int[] headerwidthServiceAdvice = {3,15,5,15,5,10 };
      HeaderTableServiceAdvice.setWidths(headerwidthServiceAdvice);
      HeaderTableServiceAdvice.setWidthPercentage(95f);
      HeaderTableServiceAdvice.getDefaultCell().setBorder(Rectangle.BOX);

      if(lstserviceObj.size() > 0){
	    	 
    	  HeaderTableH.addCell(new Phrase("SERVICE ADVICE INFO:", headerTitle));
     	 		document.add(HeaderTableH);
     	 		HeaderTableH.flushContent();
	      	 
	        	 HeaderTableSpace.addCell(new Phrase("", tabletext));
	      		document.add(HeaderTableSpace);
	      		HeaderTableSpace.flushContent();
      		
      		HeaderTableServiceAdvice.addCell(new Phrase("Sr.No", subheader));
      		HeaderTableServiceAdvice.addCell(new Phrase("Particulars ", subheader));
      		HeaderTableServiceAdvice.addCell(new Phrase("Date", subheader));
      		HeaderTableServiceAdvice.addCell(new Phrase("Consultant Name", subheader));
      		HeaderTableServiceAdvice.addCell(new Phrase("Type", subheader));
      		HeaderTableServiceAdvice.addCell(new Phrase("Clinical Notes", subheader));
      		
      		int scount=1;
      		for(int i=0;i < lstserviceObj.size();i++){
      			
      		/* String date=d.toLocaleString(); */
      		SimpleDateFormat sm = new SimpleDateFormat("dd-MM-yyyy");	
      	    Date d=lstserviceObj.get(i).getCreated_date_time();
      		// String date=d.toLocaleString(); 
      	    String strDate1= sm.format(d);
      		
      			HeaderTableServiceAdvice.addCell(new Phrase(""+scount, tabletext));
      			HeaderTableServiceAdvice.addCell(new Phrase(""+lstserviceObj.get(i).getCategoryName(), tabletext));
      			HeaderTableServiceAdvice.addCell(new Phrase(""+strDate1, tabletext));
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
      //end service Advice Info

	//start prescription 

	PrescriptionService pservice  =(ApplicationContextUtils.getApplicationContext()).getBean(PrescriptionService.class);
	List<OPDPrescriptionDtoSP> listPrescriptionsSP = new ArrayList<>();	
	listPrescriptionsSP =  pservice.getAllPrescriptionsByTreatmentId(treatmentId, unitId);  // data by stored procedure

	
	 	
			if(listPrescriptionsSP.size()>0){	
				PdfPTable HeaderTableCh12 = new PdfPTable(7);
				int[] headerwidthCh12 = {5,7,5,5,5,5,5 };
				HeaderTableCh12.setWidths(headerwidthCh12);
				HeaderTableCh12.setWidthPercentage(95f);
				HeaderTableCh12.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				HeaderTableCh12.addCell(new Phrase("RX", subheader));
				HeaderTableCh12.addCell(new Phrase("", tabletext));
				HeaderTableCh12.addCell(new Phrase("", tabletext));
				HeaderTableCh12.addCell(new Phrase("", tabletext));
				HeaderTableCh12.addCell(new Phrase("", tabletext));
				HeaderTableCh12.addCell(new Phrase("", tabletext));
				HeaderTableCh12.addCell(new Phrase("", tabletext));
				
				
			
				HeaderTableCh12.addCell(new Phrase("#", subheader));
				HeaderTableCh12.addCell(new Phrase("Prep. Drug", subheader));
				HeaderTableCh12.addCell(new Phrase("Dose", subheader));
				HeaderTableCh12.addCell(new Phrase("Advice", subheader));
				HeaderTableCh12.addCell(new Phrase("Frequency", subheader));
				HeaderTableCh12.addCell(new Phrase("Duration", subheader));
				HeaderTableCh12.addCell(new Phrase("Qty.", subheader));
				
				
				document.add(HeaderTableCh12);
		   		HeaderTableCh12.flushContent();
				
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
				 
				
				
				
				int countp=1;
				
				for(int i=0;i<listPrescriptionsSP.size();i++ ){
					HeaderTableCh12.addCell(new Phrase(""+countp, tabletext));
					HeaderTableCh12.addCell(new Phrase(""+listPrescriptionsSP.get(i).getPrepName() + ". "+listPrescriptionsSP.get(i).getMedicineName(), tabletext));
					//HeaderTableCh12.addCell(new Phrase(""+listPrescriptionsSP.get(i).getDose(), tabletext));
					
					Integer dose=listPrescriptionsSP.get(i).getDose();
					if(dose == null){
						HeaderTableCh12.addCell(new Phrase("-", tabletext));
   				}else{
   					HeaderTableCh12.addCell(new Phrase(""+listPrescriptionsSP.get(i).getDose(), tabletext));
   				}
					
					
					String instructions=listPrescriptionsSP.get(i).getInstructionName();
					String instArray[]=instructions.split("/");
					System.err.println("instructions........."+instructions);
					
					String englishInstr=instArray[0];
					String hindiInstr=instArray[1];
					String marathiInstr=instArray[2];
					System.err.println("languageOF........."+languageOF);
					if(languageOF.equalsIgnoreCase("ENGLISH")){
						
						HeaderTableCh12.addCell(new Phrase(""+englishInstr, tabletext));
						
					}else if(languageOF.equalsIgnoreCase("MARATHI")){
						
						//HeaderTableCh12.addCell(new Phrase(""+marathiInstr, FontFactory.getFont("Shivaji05", 10)));
						HeaderTableCh12.addCell(new Phrase(""+marathiInstr,com.lowagie.text.FontFactory.getFont("Shivaji05", 10)));
						
					}else if(languageOF.equalsIgnoreCase("HINDI")){
						
						//HeaderTableCh12.addCell(new Phrase(""+marathiInstr, FontFactory.getFont("Shivaji05", 10)));
						HeaderTableCh12.addCell(new Phrase(""+hindiInstr,com.lowagie.text.FontFactory.getFont("Shivaji05", 10)));
						
					}
					
					String pdays=listPrescriptionsSP.get(i).getDayPrescription();
					String preDays[]=pdays.split(",");
					String mo=preDays[0];
					String an=preDays[1];
					String ev=preDays[2];
					String nt=preDays[3];
					
					HeaderTableCh12.addCell(new Phrase(""+mo+"-"+an+"-"+ev+"-"+nt, tabletext));
					HeaderTableCh12.addCell(new Phrase(""+listPrescriptionsSP.get(i).getDays() + " Days", tabletext));
					HeaderTableCh12.addCell(new Phrase(""+listPrescriptionsSP.get(i).getQty(), tabletext));
					
				
				
					HeaderTableCh12.addCell(new Phrase("", tabletext));
					HeaderTableCh12.addCell(new Phrase(""+"(" +listPrescriptionsSP.get(i).getDrugName()+")", tabletext));
					HeaderTableCh12.addCell(new Phrase("", tabletext));
					HeaderTableCh12.addCell(new Phrase("", tabletext));
					HeaderTableCh12.addCell(new Phrase("", tabletext));
					HeaderTableCh12.addCell(new Phrase("", tabletext));
					HeaderTableCh12.addCell(new Phrase("", tabletext));
			
				
					
				countp++;
				
				 
				document.add(HeaderTableCh12);
			   		HeaderTableCh12.flushContent();
				
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
					
				
					
				}
			}	
	    	 
	//end prescription

	//start Surgery Advice Info

	OPDSxAdviceController sxController=(ApplicationContextUtils.getApplicationContext()).getBean(OPDSxAdviceController.class);
	OPDSxAdviceService sxservice=(ApplicationContextUtils.getApplicationContext()).getBean(OPDSxAdviceService.class);
	List<OPDSxAdvicedDTO> lstsxadviceObj=  sxservice.getOPDSxAdviceListByTreatmentId(treatmentId, unitId);

	PdfPTable HeaderTablesxAdvice = new PdfPTable(3);
	int[] headerwidthsxAdvice = {5,10,5 };
	HeaderTablesxAdvice.setWidths(headerwidthsxAdvice);
	HeaderTablesxAdvice.setWidthPercentage(95f);
	HeaderTablesxAdvice.getDefaultCell().setBorder(Rectangle.BOX);

	    if(lstsxadviceObj.size() > 0){
	    	
	    	HeaderTableH.addCell(new Phrase(" Surgery Advice Info:", subheader));
	   	 HeaderTableH.addCell(new Phrase("", tabletext));
	   	 HeaderTableH.addCell(new Phrase(" ", subheader));
	   	 //HeaderTableH.addCell(new Phrase("", tabletext));
	   	 
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
	
	  //start Care advises

        PdfPTable HeaderTableCareAdvice = new PdfPTable(4);
        int [] HeaderWidthCareAdvice = {10,20,10,20};
        HeaderTableCareAdvice.setWidths(HeaderWidthCareAdvice);
        HeaderTableCareAdvice.setWidthPercentage(95f);
        HeaderTableCareAdvice.getDefaultCell().setBorder(Rectangle.NO_BORDER);
              
        OPDCareAdviceDTO careadv = sxservice.editOPDCareAdvice(treatmentId);
              
              if(careadv != null){
           	   
             	  	 
           	  /*  HeaderTableH.addCell(new Phrase("CARE ADVICE INFO:", headerTitle));
           	   HeaderTableH.addCell(new Phrase("", tabletext));
	      		   	 HeaderTableH.addCell(new Phrase(" ", subheader));
	      		   	 HeaderTableH.addCell(new Phrase("", tabletext));
	      		   HeaderTableH.addCell(new Phrase("", tabletext)); */
	      		   
	      		 HeaderTableH.addCell(new Phrase("CARE ADVICE INFO:", headerTitle));
	      			HeaderTableH.addCell(new Phrase("", tabletext));
	      		   	 HeaderTableH.addCell(new Phrase(" ", subheader));
	      		   	 //HeaderTableH.addCell(new Phrase("", tabletext));
	      		   //HeaderTableH.addCell(new Phrase("", tabletext));
	      		   
	      		   
        	 		document.add(HeaderTableH);
        	 		HeaderTableH.flushContent();
	      			
             	  	 
             	  
             	  	HeaderTableCareAdvice.addCell(new Phrase("Palliative Care Advice", subheader));
             	  	HeaderTableCareAdvice.addCell(new Phrase(":"+careadv.getPalliativeCareAdvice(), tabletext));
             	  
             	  	HeaderTableCareAdvice.addCell(new Phrase("Supportive Care", subheader));
             	  	HeaderTableCareAdvice.addCell(new Phrase(":"+careadv.getSupportiveCare(), tabletext));
             	  	
             		HeaderTableCareAdvice.addCell(new Phrase("Preventive Care:", subheader));
             	  	HeaderTableCareAdvice.addCell(new Phrase(":"+careadv.getPreventiveCare(), tabletext));
             	  	
             		HeaderTableCareAdvice.addCell(new Phrase("Rehabilitative Care", subheader));
             		HeaderTableCareAdvice.addCell(new Phrase(":"+careadv.getRehabilitativeCare(), tabletext));
             		
             		HeaderTableCareAdvice.addCell(new Phrase("Other Services", subheader));
             		HeaderTableCareAdvice.addCell(new Phrase(":"+careadv.getOtherServices(), tabletext));
             		
             		HeaderTableCareAdvice.addCell(new Phrase("", subheader));
             		HeaderTableCareAdvice.addCell(new Phrase("", tabletext));
             	  
             		document.add(HeaderTableCareAdvice);
             		HeaderTableCareAdvice.flushContent();
             		
             		HeaderTableSpace.addCell(new Phrase("", tabletext));
		      		document.add(HeaderTableSpace);
		      		HeaderTableSpace.flushContent();
             		
             		HeaderTableCareAdvice.getDefaultCell().setBorder(Rectangle.BOTTOM);
             		HeaderTableCareAdvice.addCell(new Phrase("", tabletext));
             		HeaderTableCareAdvice.addCell(new Phrase("", tabletext));
             		HeaderTableCareAdvice.addCell(new Phrase("", tabletext));
             		HeaderTableCareAdvice.addCell(new Phrase("", tabletext));
         			
         			
         			document.add(HeaderTableCareAdvice);
         			HeaderTableCareAdvice.flushContent();
         			
         			
			      		
			      		
			      		HeaderTableSpace.addCell(new Phrase("", tabletext));
			      		document.add(HeaderTableSpace);
			      		HeaderTableSpace.flushContent();
          	
          	
              }
     //end Care advises
	
	  //start Chemotherapy
		
	       OPDChemoTheropyDTO chemoobj = new OPDChemoTheropyDTO();
	       chemoobj=sxservice.getOPDChemoByTreatmentIdForPrint(treatmentId);
	       
	       
	       PdfPTable HeaderTableChem = new PdfPTable(4);
	      			int[] headerwidthChemotherapy = {13,20,10,20 };
	      			HeaderTableChem.setWidths(headerwidthChemotherapy);
	      			HeaderTableChem.setWidthPercentage(95f);
	      			HeaderTableChem.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	      			
	      			System.err.println("chemoobj..."+chemoobj);
	      			
	      		if(chemoobj !=null){
			      		
			      		//HeaderTableSpace.addCell(new Phrase("", tabletext));
			      		//document.add(HeaderTableSpace);
			      		//HeaderTableSpace.flushContent();
	      			
	      			//HeaderTableChem.addCell(new Phrase("Chemotherapy Info :", subheader));
	      			//HeaderTableChem.addCell(new Phrase("", tabletext));
	      			//HeaderTableChem.addCell(new Phrase("", tabletext));
	      			//HeaderTableChem.addCell(new Phrase("", tabletext));
	      			
	      			HeaderTableH.addCell(new Phrase("CHEMOTHERAPY  INFO:", headerTitle));
	      			HeaderTableH.addCell(new Phrase("", tabletext));
	      		   	 HeaderTableH.addCell(new Phrase(" ", subheader));
	      		   	 HeaderTableH.addCell(new Phrase("", tabletext));
	      		   HeaderTableH.addCell(new Phrase("", tabletext));
	      		   	 
	      		   	
        	 		document.add(HeaderTableH);
        	 		HeaderTableH.flushContent();
	      			
	      			HeaderTableChem.addCell(new Phrase("Chemotherapy Protocol", subheader));
	      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getChemotherapyProtocol(), tabletext));
	      			
	      			
	      			HeaderTableChem.addCell(new Phrase("Indication", subheader));
	      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getLocation(), tabletext));
	      			
	      			
	      			HeaderTableChem.addCell(new Phrase("Weight(Kg)", subheader));
	      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getWeight(), tabletext));
	      			
	      			
	      			HeaderTableChem.addCell(new Phrase("Height(Mt)", subheader));
	      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getHeight(), tabletext));
	      			
	      			
	      			HeaderTableChem.addCell(new Phrase("BSA", subheader));
	      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getBsa(), tabletext));
	      			
	      			
	      			HeaderTableChem.addCell(new Phrase("Blood Orders", subheader));
	      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getBloodOrder(), tabletext));
	      			
	      			HeaderTableChem.addCell(new Phrase("Allergies", subheader));
	      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getAllergies(), tabletext));
	      			
	      			HeaderTableChem.addCell(new Phrase("History", subheader));
	      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getHistory(), tabletext));
	      			
	      			HeaderTableChem.addCell(new Phrase("Frequency", subheader));
	      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getFrequency(), tabletext));
	      			
	      			HeaderTableChem.addCell(new Phrase("Number of Cycles", subheader));
	      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getNumberofCycles(), tabletext));
	      			
	      			HeaderTableChem.addCell(new Phrase("Dose", subheader));
	      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getDose(), tabletext));
	      			
	      			
	      			HeaderTableChem.addCell(new Phrase("Investigations", subheader));
	      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getInvestigations(), tabletext));
	      			
	      			HeaderTableChem.addCell(new Phrase("Chemo Drug Orders", subheader));
	      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getChemoOrders(), tabletext));
	      			
	      			HeaderTableChem.addCell(new Phrase("Post-Medications", subheader));
	      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getPostMedications(), tabletext));
	      			
	      			HeaderTableChem.addCell(new Phrase("Post Chemo Advise", subheader));
	      			HeaderTableChem.addCell(new Phrase(":  "+chemoobj.getPostChemoAdvice(), tabletext));
	      			
	      			 HeaderTableChem.addCell(new Phrase("", tabletext));
	      	         HeaderTableChem.addCell(new Phrase("", tabletext));
	      			
	      			
	      			document.add(HeaderTableChem);
	      			HeaderTableChem.flushContent();
	      			
	      			HeaderTableSpace.addCell(new Phrase("", tabletext));
		      		document.add(HeaderTableSpace);
		      		HeaderTableSpace.flushContent();
	      			
	      			HeaderTableChem.getDefaultCell().setBorder(Rectangle.BOTTOM);
	                  HeaderTableChem.addCell(new Phrase("", tabletext));
	                  HeaderTableChem.addCell(new Phrase("", tabletext));
	                  HeaderTableChem.addCell(new Phrase("", tabletext));
	                  HeaderTableChem.addCell(new Phrase("", tabletext));
	      			
	      			
	      			document.add(HeaderTableChem);
	      			HeaderTableChem.flushContent();
	      			 
			      		
			      		HeaderTableSpace.addCell(new Phrase("", tabletext));
			      		document.add(HeaderTableSpace);
			      		HeaderTableSpace.flushContent();
	      			
	      			}


	      //end Chemotherapy
	      
	      
	      		 
		      
		               //start Plan Of Treatment  added Rohini

			              // List<OPDRadioTheropyCheckBox>  planoftreat =sxservice.getRadioTheropyCheckBoxList("POT");
			       List<OPDRadioTheropyCheckBox>  planoftreat =sxservice.getCheckListOPDPlanOfTreatmentListByTreatmentId(treatmentId, unitId);
             //   List<OPDPlanOfTreatmentDTO>  planoftreat =sxservice.getOPDPlanOfTreatmentListByTreatmentId(treatmentId, unitId);
 
			               PdfPTable HeaderTableplant = new PdfPTable(3);
			             	int[] headerwidthplant = {10,50,20 };
			             	HeaderTableplant.setWidths(headerwidthplant);
			             	HeaderTableplant.setWidthPercentage(95f);
			             	HeaderTableplant.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			             	System.out.println("...planoftreat.size()..."+planoftreat.size());
			                 if(planoftreat.size() >0){
			                 	
			                	 HeaderTableH.addCell(new Phrase("PLAN OF TREATMENT:", headerTitle));
			               
			                	 HeaderTableH.addCell(new Phrase("", tabletext));
				      		   	 HeaderTableH.addCell(new Phrase(" ", subheader));
				      		   	 HeaderTableH.addCell(new Phrase("", tabletext));
				      		   HeaderTableH.addCell(new Phrase("", tabletext));
				      		   
				      		   
				         	 		document.add(HeaderTableH);
				         	 		HeaderTableH.flushContent();
			                  	 
			                  	int acount=1;
			                  
			                  	for(int i=0;i< planoftreat.size() ;i++){
			                  		HeaderTableplant.addCell(new Phrase(""+acount , tabletext));
			                 		HeaderTableplant.addCell(new Phrase(" "+planoftreat.get(i).getName(), tabletext));
			                 		HeaderTableplant.addCell(new Phrase(" ", tabletext));
			             			acount++;
			             		}
			             		
			             		document.add(HeaderTableplant);
			             		HeaderTableplant.flushContent();
			             		
			             		
						      		
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

			       //end Plan Of Treatment     

	//start Rediotherapy Advice

	List<OPDRadioTheorapyMaster> lstradioObj=  sxservice.getOPDRadioTheropyListByTreatmentId(treatmentId, unitId);
	PdfPTable HeaderTablesxRadio = new PdfPTable(5);
	int[] headerwidthsxRadio = {5,10,10,5,5 };
	HeaderTablesxRadio.setWidths(headerwidthsxRadio);
	HeaderTablesxRadio.setWidthPercentage(95f);
	HeaderTablesxRadio.getDefaultCell().setBorder(Rectangle.BOX);
	  
	if(lstradioObj.size() > 0){
		
		HeaderTableH.addCell(new Phrase(" Rediotherapy Advice Info:", subheader));
	  	 HeaderTableH.addCell(new Phrase("", tabletext));
	  	 HeaderTableH.addCell(new Phrase(" ", subheader));
	  	 HeaderTableH.addCell(new Phrase("", tabletext));
	  	 
	  	 document.add(HeaderTableH);
	  	 HeaderTableH.flushContent();
	  	 
	    HeaderTableSpace.addCell(new Phrase("", tabletext));
		document.add(HeaderTableSpace);
		HeaderTableSpace.flushContent();
		
		
		HeaderTablesxRadio.addCell(new Phrase("Sr.No", subheader));
		HeaderTablesxRadio.addCell(new Phrase("Serum Creatine ", subheader));
		HeaderTablesxRadio.addCell(new Phrase("Radiation Technique", subheader));
		HeaderTablesxRadio.addCell(new Phrase("Simulation Date & Time", subheader));
		HeaderTablesxRadio.addCell(new Phrase("Treatment Date & Time", subheader));
		
		int radioCount=1;
		for(int i=0;i<lstradioObj.size() ;i++){
			HeaderTablesxRadio.addCell(new Phrase(""+radioCount, tabletext));
			HeaderTablesxRadio.addCell(new Phrase(""+lstradioObj.get(i).getSerumCreatinine(), tabletext));
			HeaderTablesxRadio.addCell(new Phrase(""+lstradioObj.get(i).getRadiationTechniqueName(), tabletext));
			HeaderTablesxRadio.addCell(new Phrase(""+lstradioObj.get(i).getAdvicedSimulationDate() +"  "+lstradioObj.get(i).getAdvicedSimulationTime(), tabletext));
			HeaderTablesxRadio.addCell(new Phrase(""+lstradioObj.get(i).getAdvicedTreatmentDate() +"  "+lstradioObj.get(i).getAdvicedTreatmentTime(), tabletext));
		}
		
		document.add(HeaderTablesxRadio);
		HeaderTablesxRadio.flushContent();
		
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

	//end Rediotherapy Advice
	
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
		List<String> generalInstructionList = instructionService.fetchPCTreatmentInstructionForPrint(treatmentId);
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
		String isnrtuction ="";
		try {
		for (int i = 0; i < generalInstructionList.size(); i ++) {
		
		
		
		System.out.println("666666----"+generalInstructionList.get(i));
		
		if(isnrtuction.equals("")){
			isnrtuction =  isnrtuction +  generalInstructionList.get(i);
		}else{
			isnrtuction = isnrtuction +", "+ generalInstructionList.get(i);
			}
		}
		
		Table3.addCell(new Phrase("" ,	tabletext));
		Table3.addCell(new Phrase(""+  isnrtuction,tabletext)); 
		Table3.addCell(new Phrase("" ,	tabletext));
		Table3.addCell(new Phrase("",tabletext)); 
		Table3.addCell(new Phrase("" ,	tabletext));
		document.add(Table3);
		Table3.flushContent();
		
			//Table3.addCell(new Phrase("" + (i + 1) + ".",tabletext));
			/*  Table3.addCell(new Phrase(
					""+ (generalInstructionList.get(i)),tabletext)); */
		// Table3.addCell(new Phrase(	""+ (generalInstructionList.get(i)),tabletext));
		//Table3.addCell(new Phrase("", tabletext));
			/*  if (generalInstructionList.get(i) != null
					|| generalInstructionList.get(i) != "") {
				Table3.addCell(new Phrase("" + (i) + ".",
						tabletext));
				Table3.addCell(new Phrase(
						""
								+ (generalInstructionList
										.get(i )
										),
						tabletext));  */
						
			/*  if (generalInstructionList.get(i) != null	|| generalInstructionList.get(i) != "") {
						Table3.addCell(new Phrase("" ,	tabletext));
						Table3.addCell(new Phrase("",tabletext)); 
			 }  */
					
			//document.add(Table3);
			//Table3.flushContent();
		//}
		//Table3.addCell(new Phrase("" + (i + 1) + ".",tabletext));		
		
		
				
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		 document.add(HeaderTable5);
		HeaderTable5.flushContent();
		
		
		
		} catch (Exception e) {
		e.printStackTrace();
		}
		}
// END: General Instruction



		// start IPD Diet
				OPDHistoryController dietController=(ApplicationContextUtils.getApplicationContext()).getBean(OPDHistoryController.class);
		       OPDHistoryService dietService=(ApplicationContextUtils.getApplicationContext()).getBean(OPDHistoryService.class);
		       OPDDietMasterDTO dm2 = new OPDDietMasterDTO();
			
		       List<OPDDietMasterDTO> lstmaster1 = uss2.getOPDDietListByTreatmentId(treatmentId);
				PdfPTable HeaderTable31 = new PdfPTable(1);
				int[] headerwidth31 = { 120 };
				HeaderTable31.setWidths(headerwidth31);
				HeaderTable31.setWidthPercentage(95f);
				HeaderTable31.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				if(lstmaster1.size() > 0){
			
					
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
		                 
					HeaderTableH.addCell(new Phrase("DIET INFORMATION:", headerTitle));
					 HeaderTableH.addCell(new Phrase("", tabletext));
				  	 HeaderTableH.addCell(new Phrase(" ", subheader));
				  	 HeaderTableH.addCell(new Phrase("", tabletext));
		       	 	document.add(HeaderTableH);
		       	 	HeaderTableH.flushContent();
		                 
		                
					
					for(int i=0;i<lstmaster1.size();i++){	
					if(lstmaster1.size()!=0){
						
						dm2 = lstmaster1.get(i);
						
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
			            
			           java.util.List<Element> ie1 = HTMLWorker.parseToList(new StringReader(dm2.getTemplateData()), styleSheet);
			           if(dm2.getTemplateData().equals("") || dm2.getTemplateData().equals("NULL")){
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
			        	   java.util.List<Element> ie3 = HTMLWorker.parseToList(new StringReader(dm2.getTemplateData()), styleSheet);
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
					}
					}

				
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
		  		
		  		//HeaderTableSpace.addCell(new Phrase("", tabletext));
		  		//document.add(HeaderTableSpace);
		  		//HeaderTableSpace.flushContent();
		  		
				
				}
				
		       // end IPD Diet
		       
	
	//added by vishant	       
	//START admission Note
	
		IPD_AutoSummaryController iauto=(ApplicationContextUtils.getApplicationContext()).getBean(IPD_AutoSummaryController.class);
		IPD_AutoSummaryController objTreatmentModel = new IPD_AutoSummaryController();
			TreatmentDto tobj2 = iauto
			.fetchPatientAdmissionNote(Integer.toString(treatmentId),Integer.toString(patId));
			List<TreatmentDto> admissionNotes = tobj2.getListTreatment();
			
				
	if (admissionNotes.size()>0) {
		
		String tratServ = admissionNotes.get(0).getNotes();
		if (tratServ != "" || tratServ != null) {
			//HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
			/* HeaderTable5.addCell(new Phrase("", subheader));
			HeaderTable5.addCell(new Phrase("", subheader));
			document.add(HeaderTable5);
			HeaderTable5.flushContent(); */

			HTMLWorker htmlWorker2 = new HTMLWorker(document);
			Paragraph paragraph2 = new Paragraph();
			StyleSheet styleSheet2 = new StyleSheet();
			styleSheet2.loadTagStyle("body", "size", "9pt");
			styleSheet2.loadTagStyle("p", "size", "8pt");
			java.util.List<Element> ie3 = HTMLWorker.parseToList(new StringReader("              " + tratServ),
			styleSheet2);
			PdfPTable Table13 = new PdfPTable(2);
			int[] width3 = { 25, 75 };
			Table13.setWidths(width3);
			Table13.setWidthPercentage(95f);
			Table13.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			Table13.addCell(new Phrase("", header));
			Table13.addCell(new Phrase("", header));

			System.out.println("-----------------"+tratServ);
			/* 		tratServ = tratServ.replaceAll("\\<.*?>;-","");
			tratServ = tratServ.replaceAll("<p>","");
			tratServ = tratServ.replaceAll("</p>",""); */

			document.add(Table13);
			Table13.flushContent();

			try {
		Table13.addCell(new Phrase("Admission Note:", subheader));

		for (Element element : ie3) {
			//paragraph.add(element);
			if (element instanceof PdfPTable) {
				PdfPTable htmlTable = new PdfPTable(1);
				int[] htmlTableWidth = { 50 };
				htmlTable.setWidths(htmlTableWidth);
				htmlTable.setWidthPercentage(50f);
				htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				htmlTable = (PdfPTable) element;
				/* Table13.addCell(new Phrase("  ",
				       subheader)); */
				Table13.addCell(htmlTable);

				document.add(Table13);
				Table13.flushContent();
			} else {
				/*    tratServ = tratServ.replaceAll("\\<.*?>;-","");
				tratServ = tratServ.replaceAll("<p>","");
				tratServ = tratServ.replaceAll("</p>",""); 
				tratServ = tratServ.replaceAll("</p>",""); 
				*/

				paragraph2.add(element);
				cell = new PdfPCell(paragraph2);
				cell.setBorder(Rectangle.NO_BORDER);
				/* 		                       Table13.addCell(new Phrase(" ",
				       subheader)); */
				Table13.addCell(cell);

				document.add(Table13);
				Table13.flushContent();
				paragraph2.clear();
			}
		}

		//Table13.addCell(new Phrase(tratServ, tabletext));

		document.add(Table13);
		Table13.flushContent();
			} catch (Exception e) {
		document.add(Table13);
		Table13.flushContent();
		e.printStackTrace();
			}
			Table13.addCell(new Phrase("", subheader));
			Table13.addCell(new Phrase("", subheader));

			document.add(Table13);
			Table13.flushContent();
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable5.addCell(new Phrase("", subheader));
			HeaderTable5.addCell(new Phrase("", subheader));

			document.add(HeaderTable5);
			HeaderTable5.flushContent();
		}
		
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
}		//End admission Note  
		       
		       
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
	     
	     	PdfPTable HeaderTable312 = new PdfPTable(1);
			int[] headerwidth312 = { 120 };
			HeaderTable312.setWidths(headerwidth312);
			HeaderTable312.setWidthPercentage(95f);
			HeaderTable312.getDefaultCell().setBorder(Rectangle.BOTTOM);
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
	                 HeaderTable312.addCell(htmlTable);
	                 document.add(HeaderTable312);
	                 HeaderTable312.flushContent();
	             }else{
	                 paragraph.add(element);
	                 cell = new PdfPCell(paragraph);
	                 cell.setBorder(Rectangle.NO_BORDER);
	                 HeaderTable312.addCell(cell);
	                 document.add(HeaderTable312);
	                 HeaderTable312.flushContent();
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


	
		
	
	
		
       
				// Table5 : For service details head start

			
				/* HeaderTable5.addCell(new Phrase("", tabletext));
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
				HeaderTable5.addCell(new Phrase("", tabletext)); */
				
				/* HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext)); */

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
				HeaderTable4.addCell(new Phrase("", subheader));
				Integer labId=0;

				if (labId == 1 || sponsorSlave > 0) {}else {}

				// Table4 : For page footer end

				/* document.add(HeaderTable1);
				HeaderTable1.flushContent(); */
				
				
			}
			document.close();
			outStream.close();
			outStream.flush();
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
				+ e.getStackTrace()[0].getClassName() + " Method Name : "
				+ e.getStackTrace()[0].getMethodName() + " Line No :"
				+ e.getStackTrace()[0].getLineNumber());
		}
	%>
</body>
</html>