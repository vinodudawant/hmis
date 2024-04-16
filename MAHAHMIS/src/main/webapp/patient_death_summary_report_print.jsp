<%@page import="com.hms.ipd.nurshing.dto.PatientDeathSummaryReportDTO"%>
<%@page import="com.hms.ipd.nurshing.service.PatientDeathSummaryReportService"%>
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
		response.setContentType("application/pdf");
		HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
		List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
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
		
	    //int patId=Integer.parseInt(request.getParameter("patId"));
		Integer treatmentId=Integer.parseInt(request.getParameter("treatmentId"));
		//int recId=Integer.parseInt(request.getParameter("recId"));
		//String  languageOF=request.getParameter("instructionLanguage");
		//String  CallFromOPD=request.getParameter("CallFrom");
		//int unitId=Integer.parseInt(request.getParameter("unitId"));
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
		
		Image img = null;
		PdfPCell cell = null;
		Image imgFQRcode=null;
		
		
		
      

		
		String  printTitle= "IPD Print "; //request.getParameter("printTitle");
		String  patientName=request.getParameter("patientName");
		//String idTreatment = request.getParameter("treatmentId");
		//String callFrom = request.getParameter("callFrom");
      	String headerFlag="No";
      
		
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
		
		request.setAttribute("treatmentId", request.getParameter("treatmentId"));
		
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

		PdfPTable Headertable1 = new PdfPTable(3);

			
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
				Headertable1.setWidths(HeaderWidth1);
				Headertable1.setWidthPercentage(95f);
				Headertable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);   
				
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
				
				//System.err.println("CallFromOPD..."+CallFromOPD);
			

				

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
				rtd=uss.getIpdPatientHeaderInfo(treatmentId, 1);
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
				Date date1 = new Date();
				String curDate=dateFormat.format(date1);
	 
	 
	 
				// Table3 : For patient header info start

				PdfPTable HeaderTable3 = new PdfPTable(4);
				int[] headerwidth3 = { 30, 50, 30, 50 };
				HeaderTable3.setWidths(headerwidth3);
				HeaderTable3.setWidthPercentage(95f);
				HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				//AdminModel admodel1 = new AdminModel();
				Doctor doc2 = new Doctor();
				List<Doctor> listDoc2 = null;
				
			
				// strat template Data

		PatientDeathSummaryReportService us1=(ApplicationContextUtils.getApplicationContext()).getBean(PatientDeathSummaryReportService.class);
		List<PatientDeathSummaryReportDTO> lstpatientDeathSummaryReportDto = new ArrayList<PatientDeathSummaryReportDTO>();
		lstpatientDeathSummaryReportDto =us1.getListOfDeathSummaryReportByTreatmentId(treatmentId);
		System.out.println("size====="+lstpatientDeathSummaryReportDto.size());
		if(lstpatientDeathSummaryReportDto.size() > 0)
		{
			PdfPTable HeaderTable21 = new PdfPTable(2);
			int[] headerwidth21 = { 35 ,35};
			HeaderTable21.setWidths(headerwidth21);
			HeaderTable21.setWidthPercentage(95f);
			
			HeaderTable21.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable21.getDefaultCell().setBorder(Rectangle.BOX);
			//HeaderTable8.addCell(new Phrase("  "));
			 PdfPCell date = new PdfPCell(new Paragraph("  Date"));
			 date.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell datedata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientDischargeDate()));
			 datedata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable21.addCell(date);
			 HeaderTable21.addCell(datedata);
						
			document.add(HeaderTable21);
			HeaderTable21.flushContent();
			
			
			
			
			PdfPTable HeaderTable31 = new PdfPTable(2);
			int[] headerwidth31 = { 35 ,35};
			HeaderTable31.setWidths(headerwidth31);
			HeaderTable31.setWidthPercentage(95f);
			
			HeaderTable31.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable31.getDefaultCell().setBorder(Rectangle.BOX);
			//HeaderTable8.addCell(new Phrase("  "));
			 PdfPCell hname = new PdfPCell(new Paragraph("                                  Name of the Hospital"));
			 hname.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell hnamedata = new PdfPCell(new Paragraph(""+hospObj.getHospitalName()));
			 hnamedata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable31.addCell(hname);
			 HeaderTable31.addCell(hnamedata);
						
			document.add(HeaderTable31);
			HeaderTable31.flushContent();
			
			
			
			
			PdfPTable HeaderTable4 = new PdfPTable(3);
			int[] headerwidth4 = { 5 ,30,35};
			HeaderTable4.setWidths(headerwidth4);
			HeaderTable4.setWidthPercentage(95f);
			
			HeaderTable4.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable4.getDefaultCell().setBorder(Rectangle.BOX);
			//HeaderTable8.addCell(new Phrase("  "));
			
			
			PdfPCell sr1 = new PdfPCell(new Paragraph("1"));
			sr1.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell pname1 = new PdfPCell(new Paragraph(""+"Name of Patient"));
			 pname1.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 
			 PdfPCell pdata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientName()));
			 pdata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr1);
			 HeaderTable4.addCell(pname1);
			 HeaderTable4.addCell(pdata);
			
			
			
			PdfPCell sr2 = new PdfPCell(new Paragraph("2"));
			sr2.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell ageorsex = new PdfPCell(new Paragraph(""+"Age/Sex"));
			 hnamedata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 
			 PdfPCell ageorsexdata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientAge()+"  / "+lstpatientDeathSummaryReportDto.get(0).getPatientGeneder() ));
			 hnamedata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr2);
			 HeaderTable4.addCell(ageorsex);
			 HeaderTable4.addCell(ageorsexdata);
			 
			 
			 
			 PdfPCell sr3 = new PdfPCell(new Paragraph("3"));
			 sr3.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell address1 = new PdfPCell(new Paragraph(""+"Residental Address $ Contact No"));
			 address1.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell adddata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientAddress() +" & " +lstpatientDeathSummaryReportDto.get(0).getPatientContact()));
			 adddata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr3);
			 HeaderTable4.addCell(address1);
			 HeaderTable4.addCell(adddata);
			 
			 
			 PdfPCell sr4= new PdfPCell(new Paragraph("4"));
			 sr4.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell occupation = new PdfPCell(new Paragraph(""+"Occupation"));
			 occupation.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell occudata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientOccuption()));
			 occudata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr4);
			 HeaderTable4.addCell(occupation);
			 HeaderTable4.addCell(occudata);
			 
			 
			 
			 PdfPCell sr5= new PdfPCell(new Paragraph("5"));
			 sr5.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell dateofonset = new PdfPCell(new Paragraph(""+"Date of Onset of Illness"));
			 dateofonset.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell dateonsetdata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientDate()));
			 dateonsetdata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr5);
			 HeaderTable4.addCell(dateofonset);
			 HeaderTable4.addCell(dateonsetdata);
			 
			 
			 
			 PdfPCell sr6= new PdfPCell(new Paragraph("6"));
			 sr6.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell SignSymptoms = new PdfPCell(new Paragraph(""+"Sign & Symptoms (Details)"));
			 SignSymptoms.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell signdata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientSymptom()));
			 signdata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr6);
			 HeaderTable4.addCell(SignSymptoms);
			 HeaderTable4.addCell(signdata);
			 
			 
			 
			 
			 PdfPCell sr7= new PdfPCell(new Paragraph("7"));
			 sr6.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell briefho = new PdfPCell(new Paragraph(""+"Brief H/O Presumptive source of infection(Brief travel history or h/o contact with positive case)"));
			 briefho.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell briefdata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientTravelHistory()));
			 briefdata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr7);
			 HeaderTable4.addCell(briefho);
			 HeaderTable4.addCell(briefdata);
			 
			 
			 
			 PdfPCell sr8= new PdfPCell(new Paragraph("8"));
			 sr6.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell physicalcon = new PdfPCell(new Paragraph(""+"Associated illness/Physiological condition(if any)"));
			 physicalcon.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell physicaldata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientPhysicalCondition()));
			 signdata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr8);
			 HeaderTable4.addCell(physicalcon);
			 HeaderTable4.addCell(physicaldata);
			 
			 PdfPCell sr9= new PdfPCell(new Paragraph("9"));
			 sr9.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell treatmentgiv = new PdfPCell(new Paragraph(""+"Details of treatment given at"));
			 treatmentgiv.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell treatdata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientTreatmentDetail()));
			 treatdata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr9);
			 HeaderTable4.addCell(treatmentgiv);
			 HeaderTable4.addCell(treatdata);
			 
			 
			 PdfPCell sr10= new PdfPCell(new Paragraph("10"));
			 sr10.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell fistdoctor = new PdfPCell(new Paragraph(""+"1.By first Doctor/Hospital Dt.From"));
			 fistdoctor.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell firstddata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientFirstDateFrom()));
			 firstddata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr10);
			 HeaderTable4.addCell(fistdoctor);
			 HeaderTable4.addCell(firstddata);
			 
			 
			 PdfPCell sr11= new PdfPCell(new Paragraph("11"));
			 sr11.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell seconddoctor = new PdfPCell(new Paragraph(""+"2.Second doctor/Hospital"));
			 seconddoctor.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell secondddata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientSecondDateFrom()));
			 secondddata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr11);
			 HeaderTable4.addCell(seconddoctor);
			 HeaderTable4.addCell(secondddata);
			 
			 
			 
			 PdfPCell sr12= new PdfPCell(new Paragraph("12"));
			 sr12.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell iiwdtfrom = new PdfPCell(new Paragraph(""+"By IIW Dt.From"));
			 iiwdtfrom.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell iiwdtdata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientIWWDateFrom()));
			 iiwdtdata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr12);
			 HeaderTable4.addCell(iiwdtfrom);
			 HeaderTable4.addCell(iiwdtdata);
			 
			 
			 
			 PdfPCell sr13= new PdfPCell(new Paragraph("13"));
			 sr13.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell rhname = new PdfPCell(new Paragraph(""+"Name Of Referring Hospital"));
			 rhname.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell rhnamedata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientreferncingHospital()));
			 iiwdtdata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr13);
			 HeaderTable4.addCell(rhname);
			 HeaderTable4.addCell(rhnamedata);
			 
			 
			 
			 PdfPCell sr14= new PdfPCell(new Paragraph("14"));
			 sr14.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell iiwdatatime = new PdfPCell(new Paragraph(""+"Date & Time of Admission  in Identified Isolation Ward(IIW)"));
			 iiwdatatime.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell iiwdatatimedata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientAdmissionDateinIWW()+"  / "+lstpatientDeathSummaryReportDto.get(0).getPatientAdmissionTimeinIWW()));
			 iiwdtdata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr14);
			 HeaderTable4.addCell(iiwdatatime);
			 HeaderTable4.addCell(iiwdatatimedata);
			 
			 
			 PdfPCell sr15= new PdfPCell(new Paragraph("15"));
			 sr15.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell niiw = new PdfPCell(new Paragraph(""+"Name of IIW"));
			 niiw.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell iiwdata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientIWWName()));
			 iiwdtdata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr15);
			 HeaderTable4.addCell(niiw);
			 HeaderTable4.addCell(iiwdata);
			 
			 
			 
			 PdfPCell sr16= new PdfPCell(new Paragraph("16"));
			 sr16.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell dthroattaken = new PdfPCell(new Paragraph(""+"Date of Throat of Swab Taken"));
			 dthroattaken.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell dttdata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientDateThroatTaken()));
			 iiwdtdata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr16);
			 HeaderTable4.addCell(dthroattaken);
			 HeaderTable4.addCell(dttdata);
			 
			 
			 
			 PdfPCell sr17= new PdfPCell(new Paragraph("17"));
			 sr17.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell dateandresultofswab = new PdfPCell(new Paragraph(""+"Date & Result of  Throat Swab"));
			 dateandresultofswab.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell dateresultdata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatienTrhoatSwabResultDate() + "\n     Result:"+lstpatientDeathSummaryReportDto.get(0).getPatienTrhoatSwabResult()));
			 dateresultdata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr17);
			 HeaderTable4.addCell(dateandresultofswab);
			 HeaderTable4.addCell(dateresultdata);
			 
			 
			 
			 PdfPCell sr18= new PdfPCell(new Paragraph("18"));
			 sr18.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell nlaborator = new PdfPCell(new Paragraph(""+"Name of Laboratory"));
			 nlaborator.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell nlabdata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientLaboratoryName()));
			 nlabdata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr18);
			 HeaderTable4.addCell(nlaborator);
			 HeaderTable4.addCell(nlabdata);
			 
			 
			 
			 PdfPCell sr19= new PdfPCell(new Paragraph("19"));
			 sr19.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell otherrlabresult = new PdfPCell(new Paragraph(""+"Other relevant lab result-CBC,X-ray,CT Scan etc"));
			 otherrlabresult.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell otherrlabdata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientOtRelevantLabResult()));
			 nlabdata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr19);
			 HeaderTable4.addCell(otherrlabresult);
			 HeaderTable4.addCell(otherrlabdata);
			 
			 
			 
			 PdfPCell sr20= new PdfPCell(new Paragraph("20"));
			 sr20.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell specialtreatment = new PdfPCell(new Paragraph(""+"Special mention of various treatment modalities(Anti-retroviral drugs/Oseltamivir/HCQ or cholroquine/Any other)"));
			 specialtreatment.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell specialtdata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientSpecialTreatment()));
			 nlabdata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr20);
			 HeaderTable4.addCell(specialtreatment);
			 HeaderTable4.addCell(specialtdata);
			 
			 
			 
			 PdfPCell sr21= new PdfPCell(new Paragraph("21"));
			 sr21.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell datetimedeath = new PdfPCell(new Paragraph(""+"Date : Time : Place Of Death"));
			 datetimedeath.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell datetimeddata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientDeathDate()+ " :  "+lstpatientDeathSummaryReportDto.get(0).getPatientDeathTime()+" :  "+lstpatientDeathSummaryReportDto.get(0).getPatientDathPlace()));
			 datetimeddata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr21);
			 HeaderTable4.addCell(datetimedeath);
			 HeaderTable4.addCell(datetimeddata);
			 
			 
			 
			 
			 PdfPCell sr22= new PdfPCell(new Paragraph("22"));
			 sr22.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell causeofdeath = new PdfPCell(new Paragraph(""+"Cause of Death"));
			 causeofdeath.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 PdfPCell causeddata = new PdfPCell(new Paragraph(""+lstpatientDeathSummaryReportDto.get(0).getPatientDeathCause()));
			 datetimeddata.setVerticalAlignment(Element.ALIGN_CENTER);
			 
			 HeaderTable4.addCell(sr22);
			 HeaderTable4.addCell(causeofdeath);
			 HeaderTable4.addCell(causeddata);
			 document.add(HeaderTable4);
				HeaderTable4.flushContent();
			 
			}else{
				
			}
				

					//End Template Data


				
				

				PdfPTable HeaderTable51 = new PdfPTable(4);
				int[] headerwidth51 = { 15,40,15,30};
				HeaderTable51.setWidths(headerwidth51);
				HeaderTable51.setWidthPercentage(95f);		
				
				HeaderTable51.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
				HeaderTable51.addCell(new Phrase("", subheader));
				HeaderTable51.addCell(new Phrase("", subheader));
				HeaderTable51.addCell(new Phrase("", subheader));
				HeaderTable51.addCell(new Phrase("", subheader));
			
				
				
			
				
				
				PdfPTable HeaderTable5 = new PdfPTable(7);
				int[] headerwidth5 = { 27, 40, 30, 10, 15, 40, 20 };
				HeaderTable5.setWidths(headerwidth5);
				HeaderTable5.setWidthPercentage(95f);
				HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

			
				
	
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

				document.add(HeaderTable1);
				HeaderTable1.flushContent();
				
				
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