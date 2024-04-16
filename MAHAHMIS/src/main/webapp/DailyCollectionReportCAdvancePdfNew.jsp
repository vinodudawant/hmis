<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.JSONArray"%>
<%@page import="com.itextpdf.text.html.simpleparser.StyleSheet"%>
<%@page import="com.itextpdf.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.hms.dto.Patient"%>
<%@page import="com.hms.model.AdminModel"%>
<%@page import="com.hms.dto.PrescriptionInstruction"%>
<%@page import="com.hms.ehat.controller.CpoeIPDdetails"%>
<%@page import="com.hms.dto.DoctorRoundReport"%>
<%@page import="com.hms.dto.Treatment"%>
<%@page import="com.hms.dto.Assessment"%>
<%@page import="com.hms.dto.AdviceDTO"%>
<%@page import="com.hms.ehat.dto.DailyCollectionReportDto"%>
<%@page import="com.hms.dto.Appointment"%>
<%@page import="com.hms.dto.ReportInstructionDTO"%>
<%@page import="com.hms.dto.TreatmentInstructionDTO"%>
<%@page import="com.hms.dto.Prescription"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.util.List"%>
<%@ page import="com.hms.dto.RadiotherapyDTO"%>
<%@ page import="com.hms.dto.VaccineDTO"%>
<%@ page import="com.hms.dto.CustomizeTemplate"%>
<%@ page import="com.hms.model.TreatmentModel"%>
<%@ page import="com.hms.model.PatientModel"%>
<%@ page import="com.hms.model.ChannelingModel"%>
<%-- <%@ page import="com.hms.dto.HospitalDetails"%> --%>
<%@ page import="com.hms.dto.AllergyAlertsDTO"%>
<%@ page import="com.hms.dto.TestDashboard"%>
<%@ page import="com.hms.model.PathologyModel"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.admin.util.QuestionMaster"%>
<%@ page import="com.hms.pharmacy.upload.FilePath"%>
<%@ page import="com.hms.model.PatientModel"%>
<%@page import="com.hms.dto.Patient"%>
<%@ page import="com.hms.dto.PatientSponsredDetails"%>
<%-- <%@page import="com.hms.model.BillModel"%> --%>

<%@page import="org.krysalis.barcode4j.BarcodeUtil"%>
<%@page import="com.hms.pharmacy.dao.EhatEnterpriseUtil"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.pharmacy.dao.EhatEnterpriseUtil"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.pharmacy.upload.FilePath"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.dto.RadiotherapyDTO"%>
<%@page import="com.hms.dto.AdviceDTO"%>
<%@page import="com.hms.dto.ReportInstructionDTO"%>
<%@page import="com.hms.dto.TreatmentInstructionDTO"%>
<%@page import="com.hms.ehat.dto.CpoeServdetails"%>
<%@page import="com.hms.ehat.controller.DoctordeskController"%>
<%@page import="com.hms.dto.Prescription"%>
<%@page import="java.util.Calendar"%>
<%@page import="com.hms.dto.VaccineDTO"%>
<%@page import="com.itextpdf.text.html.simpleparser.StyleSheet"%>
<%@page import="com.itextpdf.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.hms.dto.AllergyAlertsDTO"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@ page import="com.hms.admin.util.QuestionMaster"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="org.jsoup.Jsoup"%>
<%@page import="com.hms.model.TreatmentModel"%>
<%@page import="com.hms.dto.Assessment"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%-- <%@page import="com.hms.ehat.service.HMISservice"%> --%>

<%@page import="com.hms.ehat.service.FinanceService"%>


<%@page import="com.hms.model.IPDTreatmentModel"%>
<%@page import="com.hms.dto.IPDHistoryMaster"%>
<%@page import="com.hms.dto.Order_master"%>

<%@page import="com.hms.dto.CustomizeTemplate"%>
<%@page import="com.hms.ipdbill.dto.BillReceiptMasterDTO"%>

<%@page import="com.hms.hisab.model.HisabModel"%>
<%@page import="com.hms.ipdbill.dto.BillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.serviceImpl.BillServiceImpl"%>
<%@page import="com.hms.ipdbill.service.BillService"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%-- <%@ page import="com.hms.dto.HospitalDetails"%> --%>
<%-- <%@ page import="com.hms.admin.util.FetchHospitalDetails"%> --%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.dto.RadiationMaster"%>
<%@ page import="com.hms.model.AdminModel"%>
<%@page import="com.hms.dto.PatientCareAdvicesDto"%>
<%@page import="com.hms.ehat.controller.PatientChemoController"%>
<%@page import="com.hms.dto.PatientChemoDto"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.JSONArray"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<%@ page import="java.util.ResourceBundle"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Daily Collection Pdf Report</title>
</head>
<body>
	<%
		Font subheader3 = new Font(Font.FontFamily.HELVETICA, 12,
			Font.BOLD |Font.UNDERLINE);
			Font header2 = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD);

			HttpSession session2 = request.getSession();
			int hospitalUnitId= (Integer) session2.getAttribute("uId");			
			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);
	
			Font header1 = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font tabletext2 = new Font(Font.FontFamily.HELVETICA, 8,
			Font.NORMAL);
			Font subheader2 = new Font(Font.FontFamily.HELVETICA, 8,
			Font.BOLD);
			//int userid = (Integer) session.getAttribute("userId");
			Integer userid = (Integer) session.getAttribute("userId1");
			if(userid==null){
		userid=0;
			}
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String billPrint = (String) resourceBundle.getObject("billPrint").toString();
			String billPrintsHeader = (String) resourceBundle.getObject("billPrintsHeader").toString();
			ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String multipleConsultationFlow = "";
			String oncologyFlow = "";
			String subobjWithComplaintAndFinding ="off";//jitendra 25 march 2019 off value added
			String instructionLanguage = request
					.getParameter("instructionLanguage");
			String vaccinationFlagCheckboxPrint = request
					.getParameter("vaccinationFlagCheckboxPrint");
			String languageOF=request.getParameter("instructionLanguage"); 
			String printType=request.getParameter("printType"); 
			String date_pick=(request.getParameter("date_pick"));

			try {
				DecimalFormat df2 = new DecimalFormat("0.00");
		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		response.setContentType("application/pdf");
		
		Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
		document.setMargins(20, 20, 20, 50);

		//PdfWriter.getInstance(document, outStream);
		PdfWriter writer = PdfWriter.getInstance(document, outStream);
		document.open();

		//font

		Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font subheadertitle = new Font(Font.FontFamily.HELVETICA, 9, Font.BOLD);
		Font subheader = new Font(Font.FontFamily.HELVETICA, 8,
				Font.BOLD);
		Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader = new Font(Font.FontFamily.HELVETICA, 10,
				Font.BOLD);
		Font tabletext = new Font(Font.FontFamily.HELVETICA, 8,
				Font.NORMAL);
		Font small = new Font(Font.FontFamily.HELVETICA, 9, Font.NORMAL);

		FontSelector selector = new FontSelector();
		selector.addFont(subheader);

		java.util.Calendar currentDate = Calendar.getInstance();
		SimpleDateFormat dateformatter = new SimpleDateFormat(
				"dd/MM/yyyy hh:mm:ss a");
		String curr_date = dateformatter.format(currentDate.getTime());
		

		int ProductId = 0;
		int count = 1;
		
		String path = hospObj.getFilePath();
		String hospitalName = hospObj.getHospitalName();
		hospitalName = hospitalName.toUpperCase();
		String address = hospObj.getHospitalAddress();
		String city = hospObj.getHospitalCity();
		String contact = hospObj.getHospitalContact();
		String path1 = application.getRealPath(path);
		
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
			
		LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
		AutosuggestionService obj1=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
		List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
		
		//calling service leyer method to get patient records
		RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
		List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
	
		
		
		String spLeafName="";
		String refDocName  ="";
		 String BillCategoryName ="";
		
		document.newPage();
		PdfPTable HeaderTable11 = new PdfPTable(3);
		int[] headerwidth11 = { 40, 70, 12 };
		HeaderTable11.setWidths(headerwidth11);
		HeaderTable11.setWidthPercentage(95f);
		HeaderTable11.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable11.getDefaultCell().setBorder(Rectangle.NO_BORDER);


		
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
		
					PdfPTable HeaderTable12 = new PdfPTable(3);
					int[] headerwidth12 = { 30, 70, 30 };
					HeaderTable12.setWidths(headerwidth12);
					HeaderTable12.setWidthPercentage(95f);
					HeaderTable12.setHorizontalAlignment(Element.ALIGN_CENTER);
					HeaderTable12.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					HeaderTable12.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					document.add(HeaderTable12);
					HeaderTable12.flushContent();
			
					if (img == null) {
						
						HeaderTable12.addCell(new Phrase("", header));
					} else {
						
						HeaderTable12.addCell(cell);
					}	
					
					Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
					Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD);
					Phrase p = new Phrase();
					p.add(new Chunk(" "+hospitalName, bold));	
					p.add(new Chunk(" \n", bold));
					p.add(new Chunk(" \n"+address, tabletext));			
					p.add(new Chunk(" "+city+" Pin- "+hospitalZip+"\n", tabletext));
		 							p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
		                            if(!webste.equalsIgnoreCase("")){
					p.add(new Chunk(" \n "+webste, tabletext));
					}
					p.add(new Chunk(" \n "+"email: "+email, tabletext));							//p.add(new Chunk(" \nPAN No : "+panNo , tabletext));	
				//	p.add(new Chunk(" \nCIN: "+cinNo, tabletext));	
				//	p.add(new Chunk(" \nSERVICE TAX NO: "+serviceTaxNo+", PAN No: "+panNo, regular));	
					
					PdfPCell hospitalNameCell = new PdfPCell(p);				
					hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
					hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
					HeaderTable12.addCell(hospitalNameCell);
					
					if(billPrint.contains("on")){
						
						if (img == null) {
							
							HeaderTable12.addCell(new Phrase("", header));
						} else {
							
		//									HeaderTable12.addCell(cellNabh);
						}
					}else{
						
						HeaderTable12.addCell(new Phrase("", header));
					}
					
					
					
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					
					document.add(HeaderTable12);
					HeaderTable12.flushContent();
			
					HeaderTable12.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					document.add(HeaderTable12);
					HeaderTable12.flushContent();
					
			 						// Table 1 : For hospital adress details end
			
			
			
			int unitId= Integer.parseInt(request.getParameter("unitId"));
			Integer deptId= Integer.parseInt(request.getParameter("deptId"));
			Integer userId= Integer.parseInt(request.getParameter("userId"));
			Integer payModeId =Integer.parseInt(request.getParameter("payModeId"));
			String fromDate= request.getParameter("fromDate");
			String lastDate= request.getParameter("lastDate");
			String callfrom="";
			
			
			
			
			BillReceiptMasterDTO obj=new BillReceiptMasterDTO();
			obj.setUnitId(unitId);
			obj.setDepartmentId(deptId);
			obj.setCreatedBy(userId);	
			obj.setPayMode(payModeId);
			
			
			
			FinanceService fs =(ApplicationContextUtils.getApplicationContext()).getBean(FinanceService.class);
			DailyCollectionReportDto dailycollection = new DailyCollectionReportDto();
			//List<DailyCollectionReportDto> lstOpdRec = new ArrayList<DailyCollectionReportDto>();
			dailycollection=fs.getDailyCollectionReportNew(obj,callfrom, fromDate, lastDate);
			
			
			PdfPTable HeaderTable1 = new PdfPTable(12);
			int[] HeaderWidth1 =  {10,10,13,26,16,19,23,20,20,20,25,20};
			HeaderTable1.setWidths(HeaderWidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			PdfPTable HeaderTable111 = new PdfPTable(11);
			int[] HeaderWidth111 =  {40,25,30,30,50,40,30,35,45,40,30};
			HeaderTable111.setWidths(HeaderWidth111);
			HeaderTable111.setWidthPercentage(95f);
			HeaderTable111.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			
			PdfPTable HeaderTable2 = new PdfPTable(1);
			int[] HeaderWidth2 =  {100};
			HeaderTable2.setWidths(HeaderWidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			
			
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			
			 document.add(HeaderTable1);
			 HeaderTable1.flushContent();
			
		   double opdrectotal=0;
		   double opdreftotal=0; 
		   double ipdrectotal=0;
		   double ipdreftotal=0;
		   double diagrectotal=0;
		   double diagreftotal=0;
		   double commonadvrectotal=0;
		   double commonadvrectotalrefund=0;
		   
		   double TotalReceiptCollection=0;
		   double TotalRefundCollection=0;
		   double TotalCollection=0;
		
		   //opd total collection
		   double totalChecqueAmtOPD=0;
		   double totalcardAmtOPD=0;
		   double totalnetbankingAmtOPD=0;
		   double totalcashAmtOPD=0;
		   double totalpaytmAmtOPD=0;
		   double totalggoglepayAmtOPD=0;
		   double totalphonepeAmtOPD=0;
		   double totalrtgsAmtOPD=0;
		   double totalcadvanceAmtOPD=0;
		   double totalOnlineOPD=0;
		   
		   
		   
		 //opd total Refund
		   double totalChecqueAmtOPDRefund=0;
		   double totalcardAmtOPDRefund=0;
		   double totalnetbankingAmtOPDRefund=0;
		   double totalcashAmtOPDRefund=0;
		   double totalpaytmAmtOPDRefund=0;
		   double totalggoglepayAmtOPDRefund=0;
		   double totalphonepeAmtOPDRefund=0;
		   double totalrtgsAmtOPDRefund=0;
		   double totalcadvanceAmtOPDRefund=0;
		   double totalOnlineOPDRefund=0;
		   
		   
		   //IPD total collection
		   double totalChecqueAmtIPD=0;
		   double totalcardAmtIPD=0;
		   double totalnetbankingAmtIPD=0;
		   double totalcashAmtIPD=0;
		   double totalpaytmAmtIPD=0;
		   double totalggoglepayAmtIPD=0;
		   double totalphonepeAmtIPD=0;
		   double totalrtgsAmtIPD=0;
		   double totalcadvanceAmtIPD=0;
		   double totalOnlineIPD=0;
		   
		   
		 //IPD total Refund
		   double totalChecqueAmtIPDRefund=0;
		   double totalcardAmtIPDRefund=0;
		   double totalnetbankingAmtIPDRefund=0;
		   double totalcashAmtIPDRefund=0;
		   double totalpaytmAmtIPDRefund=0;
		   double totalggoglepayAmtIPDRefund=0;
		   double totalphonepeAmtIPDRefund=0;
		   double totalrtgsAmtIPDRefund=0;
		   double totalcadvanceAmtIPDRefund=0;
		   double totalOnlineIPDRefund=0;
		   
		   
		   //Dignosis total collection
		   double totalChecqueAmtDigno=0;
		   double totalcardAmtDigno=0;
		   double totalnetbankingAmtDigno=0;
		   double totalcashAmtDigno=0;
		   double totalpaytmAmtDigno=0;
		   double totalggoglepayAmtDigno=0;
		   double totalphonepeAmtDigno=0;
		   double totalrtgsAmtDigno=0;
		   double totalcadvanceAmtDigno=0;
		   double totalOnlineDiag=0;
		   
		 //Dignosis total Refund
		   double totalChecqueAmtDignoRefund=0;
		   double totalcardAmtDignoRefund=0;
		   double totalnetbankingAmtDignoRefund=0;
		   double totalcashAmtDignoRefund=0;
		   double totalpaytmAmtDignoRefund=0;
		   double totalggoglepayAmtDignoRefund=0;
		   double totalphonepeAmtDignoRefund=0;
		   double totalrtgsAmtDignoRefund=0;
		   double totalcadvanceAmtDignoRefund=0;
		   double totalOnlineDiagRefund=0;
		   
		  //Common Advance total collection
		   double totalChecqueAmtCadvanced=0;
		   double totalcardAmCadvanced=0;
		   double totalnetbankingCadvanced=0;
		   double totalcashAmtCadvanced=0;
		   double totalpaytmAmtCadvanced=0;
		   double totalggoglepayAmtCadvanced=0;
		   double totalphonepeAmtCadvanced=0;
		   double totalrtgsAmtCadvanced=0;
		   double totalcadvanceAmtCadvanced=0;
		   
		 //Common Advance total Refund
		   double totalChecqueAmtCadvancedRefund=0;
		   double totalcardAmtCadvancedRefund=0;
		   double totalnetbankingAmtCadvancedRefund=0;
		   double totalcashAmtCadvancedRefund=0;
		   double totalpaytmAmtCadvancedRefund=0;
		   double totalggoglepayAmtCadvancedRefund=0;
		   double totalphonepeAmtCadvancedRefund=0;
		   double totalrtgsAmtCadvancedRefund=0;
		   double totalcadvanceAmtCadvancedRefund=0;
		   
		   
		   
		//////////////////////////////////////////OPD Total Collection///////////////////////////////////////////////////////		
		
		         	 if (dailycollection.getLstOpdReceipt() != null
			&& dailycollection.getLstOpdReceipt().size() > 0
			&& dailycollection.getLstOpdReceipt().size() != 0) {

		HeaderTable2.addCell(new Phrase("OPD Total Collection",subheader));
		        
			
		
		
			    document.add(HeaderTable2);
			    HeaderTable2.flushContent();
		

		//HeaderTable1.addCell(new Phrase("",subheader));
		
		HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
		
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",subheader));
		
		 
		document.add(HeaderTable1);
		HeaderTable1.flushContent();
		
		HeaderTable1.addCell(new Phrase("#", subheader));
		HeaderTable1.addCell(new Phrase("UHID",subheader));
		HeaderTable1.addCell(new Phrase("Bill Id",subheader));
		HeaderTable1.addCell(new Phrase("Opd No.", subheader));
		HeaderTable1.addCell(new Phrase("Rec.ID", subheader));
		HeaderTable1.addCell(new Phrase("Patient Name", subheader));
		HeaderTable1.addCell(new Phrase("Consultation Name", subheader));
		HeaderTable1.addCell(new Phrase("Rec Date", subheader));
		HeaderTable1.addCell(new Phrase("Paymode", subheader));
		HeaderTable1.addCell(new Phrase("Total", subheader));
		HeaderTable1.addCell(new Phrase("User", subheader));
		HeaderTable1.addCell(new Phrase("Remark", subheader));
		
		
		HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		
		document.add(HeaderTable1);
		HeaderTable1.flushContent();
			 for (int z = 0; z < dailycollection.getLstOpdReceipt().size(); z++) {
		 HeaderTable1.getDefaultCell().setBorder(
			Rectangle.NO_BORDER);
		
		 Date df =(dailycollection.getLstOpdReceipt().get(z).getRecDate()); 
		 DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
		 String strDate = dateFormat.format(df);
	 
		 HeaderTable1.addCell(new Phrase(""+ (z + 1),tabletext));
		 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdReceipt().get(z).getPatientId(),tabletext));
		 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdReceipt().get(z).getBillId(),tabletext));
		 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdReceipt().get(z).getOpdipdno(),tabletext));
		 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdReceipt().get(z).getRecNo(),tabletext));
		 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdReceipt().get(z).getPatientName(),tabletext));
		 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdReceipt().get(z).getDocName(),tabletext));
		 HeaderTable1.addCell(new Phrase(""+strDate,tabletext));
		 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdReceipt().get(z).getPayMode(),tabletext));
		 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdReceipt().get(z).getRecAmt(),tabletext));
		 
		  if(!(dailycollection.getLstOpdReceipt().get(z).getPayMode().trim()).equalsIgnoreCase("CAdvance")){
		  opdrectotal =  opdrectotal +(+dailycollection.getLstOpdReceipt().get(z).getRecAmt());
		 } 
		 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdReceipt().get(z).getUser(),tabletext));
		 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdReceipt().get(z).getRemark(),tabletext));

		      if(dailycollection.getLstOpdReceipt().get(z).getPayMode().equalsIgnoreCase("Cash")){
		    	
		    	  totalcashAmtOPD=totalcashAmtOPD+dailycollection.getLstOpdReceipt().get(z).getRecAmt();
		      
		      }
		      if(dailycollection.getLstOpdReceipt().get(z).getPayMode().trim().equalsIgnoreCase("Card")){
		      	
		    	  totalcardAmtOPD=totalcardAmtOPD+dailycollection.getLstOpdReceipt().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstOpdReceipt().get(z).getPayMode().equalsIgnoreCase("Cheque")){
		        	
		    	  totalChecqueAmtOPD=totalChecqueAmtOPD+dailycollection.getLstOpdReceipt().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstOpdReceipt().get(z).getPayMode().equalsIgnoreCase("CAdvance")){
		      	
		    	  totalcadvanceAmtOPD=totalcadvanceAmtOPD+dailycollection.getLstOpdReceipt().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstOpdReceipt().get(z).getPayMode().trim().equalsIgnoreCase("GPay")){
		    	  totalggoglepayAmtOPD=totalggoglepayAmtOPD+(+dailycollection.getLstOpdReceipt().get(z).getRecAmt());
		      
		      }
		      
		      if(dailycollection.getLstOpdReceipt().get(z).getPayMode().equalsIgnoreCase("Phone Pay")){
		      	
		    	  totalphonepeAmtOPD=totalphonepeAmtOPD+(+dailycollection.getLstOpdReceipt().get(z).getRecAmt());
		      
		      }
		      
		      
		      if(dailycollection.getLstOpdReceipt().get(z).getPayMode().equalsIgnoreCase("Paytm")){
		        	
		    	  totalpaytmAmtOPD=totalpaytmAmtOPD+(+dailycollection.getLstOpdReceipt().get(z).getRecAmt());
		      
		      }
		      
		      if(dailycollection.getLstOpdReceipt().get(z).getPayMode().trim().equalsIgnoreCase("RTGS/NEFT")){
		      	
		    	 // totalrtgsAmtOPD =  totalrtgsAmtOPD +(+dailycollection.getLstOpdReceipt().get(z).getRecAmt()); // add by rahul
		    	  totalrtgsAmtOPD=totalrtgsAmtOPD+dailycollection.getLstOpdReceipt().get(z).getRecAmt();
		      
		      }
		      
		       if(dailycollection.getLstOpdReceipt().get(z).getPayMode().equalsIgnoreCase("UPI")){
		    	   totalnetbankingAmtOPD=totalnetbankingAmtOPD+(+dailycollection.getLstOpdReceipt().get(z).getRecAmt());
		}
		       totalOnlineOPD=totalOnlineOPD+(+dailycollection.getLstOpdReceipt().get(z).getRecAmt());
		 /*       if(dailycollection.getLstOpdReceipt().get(z).getPayMode().equalsIgnoreCase("Online")){
		    	  totalOnlineOPD=totalOnlineOPD+(+dailycollection.getLstOpdReceipt().get(z).getRecAmt());
		} */
		 
		 HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);

			document.add(HeaderTable1);
			HeaderTable1.flushContent(); 

		} 
			    
			
			 
		HeaderTable1.getDefaultCell().setBorder(Rectangle.TOP);
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",subheader));
		HeaderTable1.addCell(new Phrase("",subheader));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		
		document.add(HeaderTable1);
		HeaderTable1.flushContent();
			 
		
			//	HeaderTable111.getDefaultCell().setBorder(Rectangle.BOTTOM);
		HeaderTable111.addCell(new Phrase(""+" Total Cheque",tabletext));
		HeaderTable111.addCell(new Phrase(""+totalChecqueAmtOPD,tabletext));
		HeaderTable111.addCell(new Phrase(""+"Total Card",tabletext));
		HeaderTable111.addCell(new Phrase(""+totalcardAmtOPD,tabletext));
		HeaderTable111.addCell(new Phrase("Total UPI",tabletext));
		HeaderTable111.addCell(new Phrase(""+totalnetbankingAmtOPD,tabletext));
		HeaderTable111.addCell(new Phrase("Total Cash",tabletext));
		HeaderTable111.addCell(new Phrase(""+totalcashAmtOPD,tabletext));
		HeaderTable111.addCell(new Phrase(""+"Total RTGS",tabletext));
		HeaderTable111.addCell(new Phrase(""+totalrtgsAmtOPD,tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		
		
		HeaderTable111.addCell(new Phrase("Total CAdvance",tabletext));
		HeaderTable111.addCell(new Phrase(""+totalcadvanceAmtOPD,tabletext));
		HeaderTable111.addCell(new Phrase(""+" Total PhonePay",tabletext));
		HeaderTable111.addCell(new Phrase(""+totalphonepeAmtOPD,tabletext));
		HeaderTable111.addCell(new Phrase("Total GooglePay",tabletext));
		HeaderTable111.addCell(new Phrase(""+totalggoglepayAmtOPD,tabletext));
		HeaderTable111.addCell(new Phrase("Total Paytm",tabletext));
		HeaderTable111.addCell(new Phrase(""+totalpaytmAmtOPD,tabletext));
		
		
		HeaderTable111.addCell(new Phrase("Total",subheader));
		
		HeaderTable111.addCell(new Phrase(""+df2.format(opdrectotal),subheader));
		HeaderTable111.addCell(new Phrase("",tabletext));		
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		
		
		document.add(HeaderTable111);
		HeaderTable111.flushContent();
			 
			}
			       
		//////////////////////////////////////////OPD Total Refund///////////////////////////////////////////////////////		 
		            
			 if (dailycollection.getLstOpdRefund() != null
			&& dailycollection.getLstOpdRefund().size() > 0
			&& dailycollection.getLstOpdRefund().size() != 0) {


		  HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(new Phrase("",subheader));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext)); 
			
			 
			document.add(HeaderTable1);
			HeaderTable1.flushContent();

			HeaderTable2.addCell(new Phrase("OPD Total Refund",subheader));

		    document.add(HeaderTable2);
		    HeaderTable2.flushContent();
			
			HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable1.addCell(new Phrase("",subheader));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext)); 
			//HeaderTable1.addCell(new Phrase("",tabletext)); 
			
			 
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			HeaderTable1.addCell(new Phrase("#", subheader));
			HeaderTable1.addCell(new Phrase("UHID",subheader));
			HeaderTable1.addCell(new Phrase("Bill Id",subheader));
			HeaderTable1.addCell(new Phrase("Opd No.", subheader));
			HeaderTable1.addCell(new Phrase("Rec.ID", subheader));
			HeaderTable1.addCell(new Phrase("Patient Name", subheader));
			HeaderTable1.addCell(new Phrase("Consultation Name", subheader));  
			HeaderTable1.addCell(new Phrase("Rec Date", subheader));
			HeaderTable1.addCell(new Phrase("Paymode", subheader));
			HeaderTable1.addCell(new Phrase("Total", subheader));
			HeaderTable1.addCell(new Phrase("User", subheader));
			HeaderTable1.addCell(new Phrase("Remark", subheader));
			
			
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));//
			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
		 for (int z = 0; z < dailycollection.getLstOpdRefund().size(); z++) {
			 HeaderTable1.getDefaultCell().setBorder(
				Rectangle.NO_BORDER);
			
			 Date df =(dailycollection.getLstOpdRefund().get(z).getRecDate()); 
			 DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
			 String strDate = dateFormat.format(df);
			 
			 HeaderTable1.addCell(new Phrase(""+ (z + 1),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getPatientId(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getBillId(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getOpdipdno(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getRecNo(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getPatientName(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getDocName(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+strDate,tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getPayMode(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getRecAmt(),tabletext));
			 if(!(dailycollection.getLstOpdRefund().get(z).getPayMode().trim()).equalsIgnoreCase("CAdvance")){
				 opdreftotal =  opdreftotal +(+dailycollection.getLstOpdRefund().get(z).getRecAmt());
				 } 
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getUser(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getRemark(),tabletext));

			 
			 
			 if(dailycollection.getLstOpdRefund().get(z).getPayMode().equalsIgnoreCase("Cash")){
			    	
		    	  totalcashAmtOPDRefund=totalcashAmtOPDRefund+dailycollection.getLstOpdRefund().get(z).getRecAmt();
		      
		      }
		      if(dailycollection.getLstOpdRefund().get(z).getPayMode().trim().equalsIgnoreCase("Card")){
		      	
		    	  totalcardAmtOPDRefund=totalcardAmtOPDRefund+dailycollection.getLstOpdRefund().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstOpdRefund().get(z).getPayMode().equalsIgnoreCase("Cheque")){
		        	
		    	  totalChecqueAmtOPDRefund=totalChecqueAmtOPDRefund+dailycollection.getLstOpdRefund().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstOpdRefund().get(z).getPayMode().equalsIgnoreCase("CAdvance")){
		      	
		    	  totalcadvanceAmtOPDRefund=totalcadvanceAmtOPDRefund+dailycollection.getLstOpdRefund().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstOpdRefund().get(z).getPayMode().trim().equalsIgnoreCase("GPay")){
		        	
		    	  totalggoglepayAmtOPDRefund=totalggoglepayAmtOPDRefund+dailycollection.getLstOpdRefund().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstOpdRefund().get(z).getPayMode().equalsIgnoreCase("Phone Pay")){
		      	
		    	  totalphonepeAmtOPDRefund=totalphonepeAmtOPDRefund+dailycollection.getLstOpdRefund().get(z).getRecAmt();
		      
		      }
		      
		      
		      if(dailycollection.getLstOpdRefund().get(z).getPayMode().equalsIgnoreCase("Paytm")){
		        	
		    	  totalpaytmAmtOPDRefund=totalpaytmAmtOPDRefund+dailycollection.getLstOpdRefund().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstOpdRefund().get(z).getPayMode().trim().equalsIgnoreCase("RTGS/NEFT")){
		      	
		    	  totalrtgsAmtOPDRefund=totalrtgsAmtOPDRefund+dailycollection.getLstOpdRefund().get(z).getRecAmt();
		      
		      }
		      
		      
		      if(dailycollection.getLstOpdRefund().get(z).getPayMode().equalsIgnoreCase("UPI")){
		    	  totalnetbankingAmtOPDRefund=totalnetbankingAmtOPDRefund+dailycollection.getLstOpdRefund().get(z).getRecAmt();
		}

			 

			 
			 HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);

		document.add(HeaderTable1);
		HeaderTable1.flushContent(); 
			
			
		 }
		 
		 HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",subheader));
			HeaderTable1.addCell(new Phrase("",subheader));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));//
			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			HeaderTable111.addCell(new Phrase(""+" Total Cheque",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalChecqueAmtOPDRefund,tabletext));
			HeaderTable111.addCell(new Phrase(""+"Total Card",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalcardAmtOPDRefund,tabletext));
			HeaderTable111.addCell(new Phrase("Total UPI",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalnetbankingAmtOPDRefund,tabletext));
			HeaderTable111.addCell(new Phrase("Total Cash",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalcashAmtOPDRefund,tabletext));
			HeaderTable111.addCell(new Phrase(""+"Total RTGS",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalrtgsAmtOPDRefund,tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			
			
			HeaderTable111.addCell(new Phrase("Total CAdvance",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalcadvanceAmtOPDRefund,tabletext));
			HeaderTable111.addCell(new Phrase(""+" Total PhonePay",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalphonepeAmtOPDRefund,tabletext));
			HeaderTable111.addCell(new Phrase("Total GooglePay",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalggoglepayAmtOPDRefund,tabletext));
			HeaderTable111.addCell(new Phrase("Total Paytm",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalpaytmAmtOPDRefund,tabletext));
			HeaderTable111.addCell(new Phrase("Total",subheader));
			HeaderTable111.addCell(new Phrase(""+df2.format(opdreftotal),subheader));
			HeaderTable111.addCell(new Phrase("",tabletext));
		
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			
			
			document.add(HeaderTable111);
			HeaderTable111.flushContent();
		 
			 } 
		 
		//////////////////////////////////////////IPD Total Collection///////////////////////////////////////////////////////

		         if (dailycollection.getLstIpdReceipt() != null
			&& dailycollection.getLstIpdReceipt().size() > 0
			&& dailycollection.getLstIpdReceipt().size() != 0) {



		 HeaderTable2.addCell(new Phrase("IPD Total Collection",subheader));

		    document.add(HeaderTable2);
		    HeaderTable2.flushContent();
			

		
			
			HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));  
			HeaderTable1.addCell(new Phrase("",tabletext));
			
			 
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			HeaderTable1.addCell(new Phrase("#", subheader));
			HeaderTable1.addCell(new Phrase("UHID",subheader));
			HeaderTable1.addCell(new Phrase("Bill Id",subheader));
			HeaderTable1.addCell(new Phrase("Opd No.", subheader));
			HeaderTable1.addCell(new Phrase("Rec.ID", subheader));
			HeaderTable1.addCell(new Phrase("Patient Name", subheader));
			HeaderTable1.addCell(new Phrase("Consultation Name", subheader));  
			HeaderTable1.addCell(new Phrase("Rec Date", subheader));
			HeaderTable1.addCell(new Phrase("Paymode", subheader));
			HeaderTable1.addCell(new Phrase("Total", subheader));
			HeaderTable1.addCell(new Phrase("User", subheader));
			HeaderTable1.addCell(new Phrase("Remark", subheader));
			
			
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext)); 
			
			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
		 for (int z = 0; z < dailycollection.getLstIpdReceipt().size(); z++) {
			 HeaderTable1.getDefaultCell().setBorder(
				Rectangle.NO_BORDER);
			
			 Date df =(dailycollection.getLstIpdReceipt().get(z).getRecDate()); 
			 DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
			 String strDate = dateFormat.format(df);
			 HeaderTable1.addCell(new Phrase(""+ (z + 1),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getPatientId(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getBillId(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getOpdipdno(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getRecNo(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getPatientName(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getDocName(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+strDate,tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getPayMode(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getRecAmt(),tabletext));
			
			 if(!(dailycollection.getLstIpdReceipt().get(z).getPayMode().trim()).equalsIgnoreCase("CAdvance")){
				 ipdrectotal =  ipdrectotal +(+dailycollection.getLstIpdReceipt().get(z).getRecAmt());
				 } 
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getUser(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getRemark(),tabletext));


			  if(dailycollection.getLstIpdReceipt().get(z).getPayMode().equalsIgnoreCase("Cash")){
			    	
		    	  totalcashAmtIPD=totalcashAmtIPD+dailycollection.getLstIpdReceipt().get(z).getRecAmt();
		      
		      }
		      if(dailycollection.getLstIpdReceipt().get(z).getPayMode().trim().equalsIgnoreCase("Card")){
		      	
		    	  totalcardAmtIPD=totalcardAmtIPD+dailycollection.getLstIpdReceipt().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstIpdReceipt().get(z).getPayMode().equalsIgnoreCase("Cheque")){
		        	
		    	  totalChecqueAmtIPD=totalChecqueAmtIPD+dailycollection.getLstIpdReceipt().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstIpdReceipt().get(z).getPayMode().equalsIgnoreCase("CAdvance")){
		      	
		    	  totalcadvanceAmtIPD=totalcadvanceAmtIPD+dailycollection.getLstIpdReceipt().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstIpdReceipt().get(z).getPayMode().trim().equalsIgnoreCase("GPay")){
		        	
		    	  totalggoglepayAmtIPD=totalggoglepayAmtIPD+dailycollection.getLstIpdReceipt().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstIpdReceipt().get(z).getPayMode().equalsIgnoreCase("Phone Pay")){
		      	
		    	  totalphonepeAmtIPD=totalphonepeAmtIPD+(+dailycollection.getLstIpdReceipt().get(z).getRecAmt());
		      
		      }
		      
		      
		      if(dailycollection.getLstIpdReceipt().get(z).getPayMode().equalsIgnoreCase("Paytm")){
		        	
		    	  totalpaytmAmtIPD=totalpaytmAmtIPD+dailycollection.getLstIpdReceipt().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstIpdReceipt().get(z).getPayMode().trim().equalsIgnoreCase("RTGS/NEFT")){
		      	
		    	  totalrtgsAmtIPD=totalrtgsAmtIPD+dailycollection.getLstIpdReceipt().get(z).getRecAmt();
		      
		      }

		      if(dailycollection.getLstIpdReceipt().get(z).getPayMode().equalsIgnoreCase("UPI")){
		    	  totalnetbankingAmtIPD=totalnetbankingAmtIPD+dailycollection.getLstIpdReceipt().get(z).getRecAmt();
		}
			 
			 
			 
			 
			 HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);

		document.add(HeaderTable1);
		HeaderTable1.flushContent(); 
			
			
		 }
		 
		 document.add(HeaderTable1);
		HeaderTable1.flushContent();
		 
		  HeaderTable1.getDefaultCell().setBorder(Rectangle.TOP);
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",subheader));
			HeaderTable1.addCell(new Phrase("",subheader));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			document.add(HeaderTable1);
			HeaderTable1.flushContent(); 
		            
			
			HeaderTable111.addCell(new Phrase(""+" Total Cheque",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalChecqueAmtIPD,tabletext));
			HeaderTable111.addCell(new Phrase(""+"Total Card",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalcardAmtIPD,tabletext));
			HeaderTable111.addCell(new Phrase("Total UPI",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalnetbankingAmtIPD,tabletext));
			HeaderTable111.addCell(new Phrase("Total Cash",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalcashAmtIPD,tabletext));
			HeaderTable111.addCell(new Phrase(""+"Total RTGS",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalrtgsAmtIPD,tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			
			
			HeaderTable111.addCell(new Phrase("Total CAdvance",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalcadvanceAmtIPD,tabletext));
			HeaderTable111.addCell(new Phrase(""+" Total PhonePay",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalphonepeAmtIPD,tabletext));
			HeaderTable111.addCell(new Phrase("Total GooglePay",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalggoglepayAmtIPD,tabletext));
			HeaderTable111.addCell(new Phrase("Total Paytm",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalpaytmAmtIPD,tabletext));
			HeaderTable111.addCell(new Phrase("Total",subheader));
			HeaderTable111.addCell(new Phrase(""+df2.format(ipdrectotal),subheader));
			HeaderTable111.addCell(new Phrase("",tabletext));
			
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
					
			document.add(HeaderTable111);
			HeaderTable111.flushContent();
		
			
		 
		         }

		//////////////////////////////////////////IPD Total Refund///////////////////////////////////////////////////////		
		         
		         	 if (dailycollection.getLstIpdRefund()!= null
			&& dailycollection.getLstIpdRefund().size() > 0
			&& dailycollection.getLstIpdRefund().size() != 0) { 


		         		 
		         	    HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		    			HeaderTable1.addCell(new Phrase("",tabletext));
		    			HeaderTable1.addCell(new Phrase("",tabletext));
		    			HeaderTable1.addCell(new Phrase("",tabletext));
		    			HeaderTable1.addCell(new Phrase("",tabletext));
		    			HeaderTable1.addCell(new Phrase("",tabletext));
		    			HeaderTable1.addCell(new Phrase("",tabletext));
		    			HeaderTable1.addCell(new Phrase("",tabletext));
		    			HeaderTable1.addCell(new Phrase("",tabletext));
		    			HeaderTable1.addCell(new Phrase("",tabletext));
		    			HeaderTable1.addCell(new Phrase("",tabletext));
		    			HeaderTable1.addCell(new Phrase("",tabletext)); 
		    		//	HeaderTable1.addCell(new Phrase("",tabletext));
		    			 
		    			document.add(HeaderTable1);
		    			HeaderTable1.flushContent();

		 HeaderTable2.addCell(new Phrase("IPD Total Refund",subheader));

		    document.add(HeaderTable2);
		    HeaderTable2.flushContent();
			

		
			
			HeaderTable1.addCell(new Phrase("",subheader));
			
			HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));  
			HeaderTable1.addCell(new Phrase("",tabletext));
			 
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			HeaderTable1.addCell(new Phrase("#", subheader));
			HeaderTable1.addCell(new Phrase("UHID",subheader));
			HeaderTable1.addCell(new Phrase("Bill Id",subheader));
			HeaderTable1.addCell(new Phrase("Opd No.", subheader));
			HeaderTable1.addCell(new Phrase("Rec.ID", subheader));
			HeaderTable1.addCell(new Phrase("Patient Name", subheader));
			HeaderTable1.addCell(new Phrase("Consultation Name", subheader));  // add by rahul
			HeaderTable1.addCell(new Phrase("Rec Date", subheader));
			HeaderTable1.addCell(new Phrase("Paymode", subheader));
			HeaderTable1.addCell(new Phrase("Total", subheader));
			HeaderTable1.addCell(new Phrase("User", subheader));
			HeaderTable1.addCell(new Phrase("Remark", subheader));
			
			
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));  
			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
		 for (int z = 0; z < dailycollection.getLstIpdRefund().size(); z++) {
			 HeaderTable1.getDefaultCell().setBorder(
				Rectangle.NO_BORDER);
			 Date df =(dailycollection.getLstIpdRefund().get(z).getRecDate()); 
			 DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
			 String strDate = dateFormat.format(df);
			
			 HeaderTable1.addCell(new Phrase(""+ (z + 1),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getPatientId(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getBillId(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getOpdipdno(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getRecNo(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getPatientName(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getDocName(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+strDate,tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getPayMode(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getRecAmt(),tabletext));
			 
			 if(!(dailycollection.getLstIpdRefund().get(z).getPayMode().trim()).equalsIgnoreCase("CAdvance")){
				 ipdreftotal =  ipdreftotal +(+dailycollection.getLstIpdRefund().get(z).getRecAmt());
				 } 
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getUser(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getRemark(),tabletext));

			 
			 
			 
			 if(dailycollection.getLstIpdRefund().get(z).getPayMode().equalsIgnoreCase("Cash")){
			    	
		    	  totalcashAmtIPDRefund=totalcashAmtIPDRefund+dailycollection.getLstIpdRefund().get(z).getRecAmt();
		      
		      }
		      if(dailycollection.getLstIpdRefund().get(z).getPayMode().trim().equalsIgnoreCase("Card")){
		      	
		    	  totalcardAmtIPDRefund=totalcardAmtIPDRefund+dailycollection.getLstIpdRefund().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstIpdRefund().get(z).getPayMode().equalsIgnoreCase("Cheque")){
		        	
		    	  totalChecqueAmtIPDRefund=totalChecqueAmtIPDRefund+dailycollection.getLstIpdRefund().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstIpdRefund().get(z).getPayMode().equalsIgnoreCase("CAdvance")){
		      	
		    	  totalcadvanceAmtIPDRefund=totalcadvanceAmtIPDRefund+dailycollection.getLstIpdRefund().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstIpdRefund().get(z).getPayMode().trim().equalsIgnoreCase("GPay")){
		        	
		    	  totalggoglepayAmtIPDRefund=totalggoglepayAmtIPDRefund+dailycollection.getLstIpdRefund().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstIpdRefund().get(z).getPayMode().equalsIgnoreCase("Phone Pay")){
		      	
		    	  totalphonepeAmtIPDRefund=totalphonepeAmtIPDRefund+(+dailycollection.getLstIpdRefund().get(z).getRecAmt());
		    	  totalphonepeAmtOPD=totalphonepeAmtOPD+(+dailycollection.getLstOpdReceipt().get(z).getRecAmt());

		      
		      }
		      
		      
		      if(dailycollection.getLstIpdRefund().get(z).getPayMode().equalsIgnoreCase("Paytm")){
		        	
		    	  totalpaytmAmtIPDRefund=totalpaytmAmtIPDRefund+dailycollection.getLstIpdRefund().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstIpdRefund().get(z).getPayMode().trim().equalsIgnoreCase("RTGS/NEFT")){
		      	
		    	  totalrtgsAmtIPDRefund=totalrtgsAmtIPDRefund+dailycollection.getLstIpdRefund().get(z).getRecAmt();
		      
		      }


		      if(dailycollection.getLstIpdRefund().get(z).getPayMode().equalsIgnoreCase("UPI")){
		    	  totalnetbankingAmtIPDRefund=totalnetbankingAmtIPDRefund+dailycollection.getLstIpdRefund().get(z).getRecAmt();
		}

			 
			 HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);

		document.add(HeaderTable1);
		HeaderTable1.flushContent(); 
			
			
		        }
		 HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",subheader));
			HeaderTable1.addCell(new Phrase("",subheader));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			
			HeaderTable1.addCell(new Phrase("",tabletext));			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			
			
			HeaderTable111.addCell(new Phrase(""+" Total Cheque",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalChecqueAmtIPDRefund,tabletext));
			HeaderTable111.addCell(new Phrase(""+"Total Card",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalcardAmtIPDRefund,tabletext));
			HeaderTable111.addCell(new Phrase("Total UPI",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalnetbankingAmtIPDRefund,tabletext));
			HeaderTable111.addCell(new Phrase("Total Cash",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalcashAmtIPDRefund,tabletext));
			HeaderTable111.addCell(new Phrase(""+"Total RTGS",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalrtgsAmtIPDRefund,tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			
			
			HeaderTable111.addCell(new Phrase("Total CAdvance",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalcadvanceAmtIPDRefund,tabletext));	
			HeaderTable111.addCell(new Phrase(""+" Total PhonePay",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalphonepeAmtIPDRefund,tabletext));
			HeaderTable111.addCell(new Phrase("Total GooglePay",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalggoglepayAmtIPDRefund,tabletext));
			HeaderTable111.addCell(new Phrase("Total Paytm",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalpaytmAmtIPDRefund,tabletext));
			HeaderTable111.addCell(new Phrase("Total",subheader));
			HeaderTable111.addCell(new Phrase(""+df2.format(ipdreftotal),subheader));
			HeaderTable111.addCell(new Phrase("",tabletext));
			
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			
			document.add(HeaderTable111);
			HeaderTable111.flushContent();
		//	document.add(HeaderTable111);
			//HeaderTable111.flushContent();

			
			
			
		         	 }
			
		//////////////////////////////////////////Diagnosis Total Collection///////////////////////////////////////////////////////		 
		 
		          
		     if (dailycollection.getLstDiagReceipt()!= null
			&& dailycollection.getLstDiagReceipt().size() > 0
			&& dailycollection.getLstDiagReceipt().size() != 0) { 

		  


		 HeaderTable2.addCell(new Phrase("Diagnosis Total Collection",subheader));

		    document.add(HeaderTable2);
		    HeaderTable2.flushContent();
			
			HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			
			 
			//HeaderTable1.addCell(new Phrase("",tabletext));
			 
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			HeaderTable1.addCell(new Phrase("#", subheader));
			HeaderTable1.addCell(new Phrase("UHID",subheader));
			HeaderTable1.addCell(new Phrase("Bill Id",subheader));
			HeaderTable1.addCell(new Phrase("Opd No.", subheader));
			HeaderTable1.addCell(new Phrase("Rec.ID", subheader));
			HeaderTable1.addCell(new Phrase("Patient Name", subheader));
			HeaderTable1.addCell(new Phrase("Consultation Name", subheader));
			HeaderTable1.addCell(new Phrase("Rec Date", subheader));
			HeaderTable1.addCell(new Phrase("Paymode", subheader));
			HeaderTable1.addCell(new Phrase("Total", subheader));
			HeaderTable1.addCell(new Phrase("User", subheader));
			HeaderTable1.addCell(new Phrase("Remark", subheader));
			
			
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
		 for (int z = 0; z < dailycollection.getLstDiagReceipt().size(); z++) {
			 HeaderTable1.getDefaultCell().setBorder(
				Rectangle.NO_BORDER);
			
			 Date df =(dailycollection.getLstDiagReceipt().get(z).getRecDate()); 
			 DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
			 String strDate = dateFormat.format(df);
             
			 HeaderTable1.addCell(new Phrase(""+ (z + 1),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagReceipt().get(z).getPatientId(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagReceipt().get(z).getBillId(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagReceipt().get(z).getOpdipdno(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagReceipt().get(z).getRecNo(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagReceipt().get(z).getPatientName(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagReceipt().get(z).getDocName(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+strDate,tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagReceipt().get(z).getPayMode(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagReceipt().get(z).getRecAmt(),tabletext));
			 
			
			  if(!(dailycollection.getLstDiagReceipt().get(z).getPayMode().trim()).equalsIgnoreCase("CAdvance")){
				 diagrectotal =  diagrectotal +(+dailycollection.getLstDiagReceipt().get(z).getRecAmt());
				 } 
		
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagReceipt().get(z).getUser(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagReceipt().get(z).getRemark(),tabletext));
			 
			 HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			 
			 
			 
			 
			 if(dailycollection.getLstDiagReceipt().get(z).getPayMode().equalsIgnoreCase("Cash")){
			    	
		    	  totalcashAmtDigno=totalcashAmtDigno+dailycollection.getLstDiagReceipt().get(z).getRecAmt();
		      
		      }
		      if(dailycollection.getLstDiagReceipt().get(z).getPayMode().trim().equalsIgnoreCase("Card")){
		      	
		    	  totalcardAmtDigno=totalcardAmtDigno+dailycollection.getLstDiagReceipt().get(z).getRecAmt();
		    
		      }
		      
		      if(dailycollection.getLstDiagReceipt().get(z).getPayMode().equalsIgnoreCase("Cheque")){
		        	
		    	  totalChecqueAmtDigno=totalChecqueAmtDigno+dailycollection.getLstDiagReceipt().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstDiagReceipt().get(z).getPayMode().equalsIgnoreCase("CAdvance")){
		      	
		    	  totalcadvanceAmtDigno=totalcadvanceAmtDigno+dailycollection.getLstDiagReceipt().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstDiagReceipt().get(z).getPayMode().trim().equalsIgnoreCase("GPay")){
		        	
		    	  totalggoglepayAmtDigno=totalggoglepayAmtDigno+dailycollection.getLstDiagReceipt().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstDiagReceipt().get(z).getPayMode().equalsIgnoreCase("Phone Pay")){
		      	
		    	  totalphonepeAmtDigno=totalphonepeAmtDigno+dailycollection.getLstDiagReceipt().get(z).getRecAmt();
		      
		      }
		      
		      
		      if(dailycollection.getLstDiagReceipt().get(z).getPayMode().equalsIgnoreCase("Paytm")){
		        	
		    	  totalpaytmAmtDigno=totalpaytmAmtDigno+dailycollection.getLstDiagReceipt().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstDiagReceipt().get(z).getPayMode().trim().equalsIgnoreCase("RTGS/NEFT")){
		      	
		    	  totalrtgsAmtDigno=totalrtgsAmtDigno+dailycollection.getLstDiagReceipt().get(z).getRecAmt();
		      
		      }
		      if(dailycollection.getLstDiagReceipt().get(z).getPayMode().equalsIgnoreCase("UPI")){
		    	  totalnetbankingAmtDigno=totalnetbankingAmtDigno+dailycollection.getLstDiagReceipt().get(z).getRecAmt();
		}
			 
			 
			 

		document.add(HeaderTable1);
		HeaderTable1.flushContent(); 
			
			
		 }
		 
		 HeaderTable1.getDefaultCell().setBorder(Rectangle.TOP);
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",subheader));
			HeaderTable1.addCell(new Phrase("",subheader));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			//HeaderTable1.addCell(new Phrase("",tabletext));
			
			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			
			
			
			HeaderTable111.addCell(new Phrase(""+" Total Cheque",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalChecqueAmtDigno,tabletext));
			HeaderTable111.addCell(new Phrase(""+"Total Card",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalcardAmtDigno,tabletext));
			HeaderTable111.addCell(new Phrase("Total UPI",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalnetbankingAmtDigno,tabletext));
			HeaderTable111.addCell(new Phrase("Total Cash",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalcashAmtDigno,tabletext));
			HeaderTable111.addCell(new Phrase(""+"Total RTGS",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalrtgsAmtDigno,tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			
			HeaderTable111.addCell(new Phrase("Total CAdvance",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalcadvanceAmtDigno,tabletext));
			HeaderTable111.addCell(new Phrase(""+" Total PhonePay",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalphonepeAmtDigno,tabletext));
			HeaderTable111.addCell(new Phrase("Total GooglePay",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalggoglepayAmtDigno,tabletext));
			HeaderTable111.addCell(new Phrase("Total Paytm",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalpaytmAmtDigno,tabletext));			
			HeaderTable111.addCell(new Phrase("Total",subheader));
			HeaderTable111.addCell(new Phrase(""+df2.format(diagrectotal),subheader));
			HeaderTable111.addCell(new Phrase("",tabletext));
			
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));		
			HeaderTable111.addCell(new Phrase("",tabletext));
			
			document.add(HeaderTable111);
			HeaderTable111.flushContent();
		

		 
		 
		         	 }
			
		//////////////////////////////////////////Diagnosis Total Refund///////////////////////////////////////////////////////		
		           		 
		         	 if (dailycollection.getLstDiagRefund()!= null
			&& dailycollection.getLstDiagRefund().size() > 0
			&& dailycollection.getLstDiagRefund().size() != 0) { 



		 HeaderTable2.addCell(new Phrase("Diagnosis Total Refund",subheader));

		    document.add(HeaderTable2);
		    HeaderTable2.flushContent();
					
			HeaderTable1.addCell(new Phrase("#", subheader));
			HeaderTable1.addCell(new Phrase("UHID",subheader));
			HeaderTable1.addCell(new Phrase("Bill Id",subheader));
			HeaderTable1.addCell(new Phrase("Opd No.", subheader));
			HeaderTable1.addCell(new Phrase("Rec.ID", subheader));
			HeaderTable1.addCell(new Phrase("Patient Name", subheader));
			HeaderTable1.addCell(new Phrase("Consultation Name", subheader));
			HeaderTable1.addCell(new Phrase("Rec Date", subheader));
			HeaderTable1.addCell(new Phrase("Paymode", subheader));
			HeaderTable1.addCell(new Phrase("Total", subheader));
			HeaderTable1.addCell(new Phrase("User", subheader));
			HeaderTable1.addCell(new Phrase("Remark", subheader));
			
			
			HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
		 for (int z = 0; z < dailycollection.getLstDiagRefund().size(); z++) {
			 HeaderTable1.getDefaultCell().setBorder(
				Rectangle.NO_BORDER);
			 Date df =(dailycollection.getLstDiagRefund().get(z).getRecDate()); 
			 DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
			 String strDate = dateFormat.format(df);
			 
			 HeaderTable1.addCell(new Phrase(""+ (z + 1),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getPatientId(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getBillId(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getOpdipdno(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getRecNo(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getPatientName(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getDocName(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+strDate,tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getPayMode(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getRecAmt(),tabletext));
			 
			 if(!(dailycollection.getLstDiagRefund().get(z).getPayMode().trim()).equalsIgnoreCase("CAdvance")){
				 diagreftotal =  diagreftotal +(+dailycollection.getLstDiagRefund().get(z).getRecAmt());
				 } 
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getUser(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getRemark(),tabletext));

			 HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			 
			 
			 if(dailycollection.getLstDiagRefund().get(z).getPayMode().equalsIgnoreCase("Cash")){
			    	
		    	  totalcashAmtDignoRefund=totalcashAmtDignoRefund+dailycollection.getLstDiagRefund().get(z).getRecAmt();
		      
		      }
		      if(dailycollection.getLstDiagRefund().get(z).getPayMode().trim().equalsIgnoreCase("Card")){
		      	
		    	  totalcardAmtDignoRefund=totalcardAmtDignoRefund+dailycollection.getLstDiagRefund().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstDiagRefund().get(z).getPayMode().equalsIgnoreCase("Cheque")){
		        	
		    	  totalChecqueAmtDignoRefund=totalChecqueAmtDignoRefund+dailycollection.getLstDiagRefund().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstDiagRefund().get(z).getPayMode().equalsIgnoreCase("CAdvance")){
		      	
		    	  totalcadvanceAmtDignoRefund=totalcadvanceAmtDignoRefund+dailycollection.getLstDiagRefund().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstDiagRefund().get(z).getPayMode().trim().equalsIgnoreCase("GPay")){
		        	
		    	  totalggoglepayAmtDignoRefund=totalggoglepayAmtDignoRefund+dailycollection.getLstDiagRefund().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstDiagRefund().get(z).getPayMode().equalsIgnoreCase("Phone Pay")){
		      	
		    	  totalphonepeAmtDignoRefund=totalphonepeAmtDignoRefund+dailycollection.getLstDiagRefund().get(z).getRecAmt();
		      
		      }
		      
		      
		      if(dailycollection.getLstDiagRefund().get(z).getPayMode().equalsIgnoreCase("Paytm")){
		        	
		    	  totalpaytmAmtDignoRefund=totalpaytmAmtDignoRefund+dailycollection.getLstDiagRefund().get(z).getRecAmt();
		      
		      }
		      
		      if(dailycollection.getLstDiagRefund().get(z).getPayMode().trim().equalsIgnoreCase("RTGS/NEFT")){
		      	
		    	  totalrtgsAmtDignoRefund=totalrtgsAmtDignoRefund+dailycollection.getLstDiagRefund().get(z).getRecAmt();
		      
		      }

		      
		      if(dailycollection.getLstDiagRefund().get(z).getPayMode().equalsIgnoreCase("UPI")){
		    	  totalnetbankingAmtDignoRefund=totalnetbankingAmtDignoRefund+dailycollection.getLstDiagRefund().get(z).getRecAmt();
		}
			 

		document.add(HeaderTable1);
		HeaderTable1.flushContent(); 
			
			
		 }
		 
		 HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",subheader));
			HeaderTable1.addCell(new Phrase("",subheader));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			
			 HeaderTable1.getDefaultCell().setBorder(Rectangle.TOP);
			HeaderTable111.addCell(new Phrase(""+" Total Cheque",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalChecqueAmtDignoRefund,tabletext));
			HeaderTable111.addCell(new Phrase(""+"Total Card",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalcardAmtDignoRefund,tabletext));
			HeaderTable111.addCell(new Phrase("Total UPI",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalnetbankingAmtDignoRefund,tabletext));
			HeaderTable111.addCell(new Phrase("Total Cash",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalcashAmtDignoRefund,tabletext));
			HeaderTable111.addCell(new Phrase(""+"Total RTGS",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalrtgsAmtDignoRefund,tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			
			HeaderTable111.addCell(new Phrase("Total CAdvance",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalcadvanceAmtDignoRefund,tabletext));			
			HeaderTable111.addCell(new Phrase(""+" Total PhonePay",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalphonepeAmtDignoRefund,tabletext));
			HeaderTable111.addCell(new Phrase("Total GooglePay",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalggoglepayAmtDignoRefund,tabletext));
			HeaderTable111.addCell(new Phrase("Total Paytm",tabletext));
			HeaderTable111.addCell(new Phrase(""+totalpaytmAmtDignoRefund,tabletext));			
			HeaderTable111.addCell(new Phrase("Total",subheader));
			HeaderTable111.addCell(new Phrase(""+df2.format(diagreftotal),subheader));			
			HeaderTable111.addCell(new Phrase("",tabletext));
			
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));			
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			HeaderTable111.addCell(new Phrase("",tabletext));
			
			document.add(HeaderTable111);
			HeaderTable111.flushContent();
			
			HeaderTable2.addCell(new Phrase("    ",subheader));
		     HeaderTable2.addCell(new Phrase("    ",subheader));			     		
		 
		    	 }
		    	 // for Receipt
		         	double totalChecque = 0;
		        	double totalCard = 0;
		        	double totalNeBanking = 0;
		        	double totalCash = 0;
		        	double totalGooglePay = 0;
		        	double totalPhonepe = 0;
		        	double totalPaytm = 0;
		        	double totalCadvance = 0;
		        	double totalRTGS = 0;
		        	double totalOnline = 0;
		        	
		        	 // for Refund
		        	double totalChecqueRef = 0;
		        	double totalCardRef = 0;
		        	double totalNeBankingRef = 0;
		        	double totalCashRef = 0;
		        	double totalGooglePayRef = 0;
		        	double totalPhonepeRef= 0;
		        	double totalPaytmRef= 0;
		        	double totalCadvanceRef= 0;
		        	double totalRTGSRef = 0;
		        	double totalOnlineRef = 0;
		        	
		            // For TotalPaymodeReceipt Calculation
		        	totalChecque = totalChecqueAmtOPD + totalChecqueAmtIPD + totalChecqueAmtDigno;
		        	totalCard = totalcardAmtOPD + totalcardAmtIPD + totalcardAmtDigno;
		        	totalNeBanking = totalnetbankingAmtOPD + totalnetbankingAmtIPD + totalnetbankingAmtDigno;
		        	totalCash = totalcashAmtOPD + totalcashAmtIPD + totalcashAmtDigno;
		        	totalGooglePay = totalggoglepayAmtOPD + totalggoglepayAmtIPD + totalggoglepayAmtDigno;
		        	totalPhonepe = totalphonepeAmtOPD + totalphonepeAmtIPD + totalphonepeAmtDigno;
		        	totalPaytm = totalpaytmAmtOPD + totalpaytmAmtIPD + totalpaytmAmtDigno;
		        	totalCadvance = totalcadvanceAmtOPD + totalcadvanceAmtIPD + totalcadvanceAmtDigno;
		        	totalRTGS = totalrtgsAmtOPD + totalrtgsAmtIPD + totalrtgsAmtDigno;
		        	totalOnline = totalOnlineOPD + totalOnlineIPD + totalOnlineDiag;
		        	
		        	// For TotalPymodeRefund Calculation
		        	totalChecqueRef = totalChecqueAmtOPDRefund + totalChecqueAmtIPDRefund + totalChecqueAmtDignoRefund;
		        	totalCardRef = totalcardAmtOPDRefund + totalcardAmtIPDRefund + totalcardAmtDignoRefund;
		        	totalNeBankingRef = totalnetbankingAmtOPDRefund + totalnetbankingAmtIPDRefund + totalnetbankingAmtDignoRefund;
		        	totalCashRef = totalcashAmtOPDRefund + totalcashAmtIPDRefund + totalcashAmtDignoRefund;
		        	totalGooglePayRef = totalggoglepayAmtOPDRefund + totalggoglepayAmtIPDRefund + totalggoglepayAmtDignoRefund;
		        	totalPhonepeRef = totalphonepeAmtOPDRefund + totalphonepeAmtIPDRefund + totalphonepeAmtDignoRefund;
		        	totalPaytmRef= totalpaytmAmtOPDRefund + totalpaytmAmtIPDRefund + totalpaytmAmtDignoRefund;
		        	totalCadvanceRef = totalcadvanceAmtOPDRefund + totalcadvanceAmtIPDRefund + totalcadvanceAmtDignoRefund;
		        	totalRTGSRef = totalrtgsAmtOPDRefund + totalrtgsAmtIPDRefund + totalrtgsAmtDignoRefund;
		        	totalOnlineRef = totalOnlineOPDRefund + totalOnlineIPDRefund + totalOnlineDiagRefund;

		        	TotalReceiptCollection = opdrectotal + ipdrectotal + diagrectotal;
		        	TotalRefundCollection = opdreftotal + ipdreftotal + diagreftotal;
		        	TotalCollection = TotalReceiptCollection - TotalRefundCollection;

		        	HeaderTable2.addCell(new Phrase("    ", subheader));
		        	HeaderTable2.addCell(new Phrase("    ", subheader));
		            
		        	//for Total Receipt Calculation
		        	if (totalChecque > 0) {
		        		HeaderTable2.addCell(new Phrase("Total Cheque Amt :    " + df2.format(totalChecque), subheader));
		        	}
		        	if (totalCard > 0) {
		        		HeaderTable2.addCell(new Phrase("Total Card Amt:    " + df2.format(totalCard), subheader));
		        	}
		        	if (totalNeBanking > 0) {
		        		HeaderTable2.addCell(new Phrase("Total UPI:    " + df2.format(totalNeBanking), subheader));
		        	}

		        	if (totalCash > 0) {
		        		HeaderTable2.addCell(new Phrase("Total Cash Amt :    " + df2.format(totalCash), subheader));
		        	}
		        	if (totalGooglePay > 0) {
		        		HeaderTable2.addCell(new Phrase("Total Google Pay  Amt:    "+df2.format(totalGooglePay),subheader));	
		        	}

		        	 if(totalPhonepe>0){
		        		 HeaderTable2.addCell(new Phrase("Total Phonepe Amt :    "+df2.format(totalPhonepe),subheader)); 
		        	 }
		        	if(totalPaytm>0){
		        		HeaderTable2.addCell(new Phrase("Total Paytm Amt:    "+df2.format(totalPaytm),subheader));
		        	}
		        	
		        	if (totalCadvance > 0) {
		        		HeaderTable2.addCell(new Phrase("Total CAdvance Amt :    " + df2.format(totalCadvance), subheader));
		        	}

		        	if (totalRTGS > 0) {
		        		HeaderTable2.addCell(new Phrase("Total RTGS Amt :    " +df2.format(totalRTGS) , subheader));
		        	}
		        	
		        	/* if (totalOnline > 0) {
		        		HeaderTable2.addCell(new Phrase("Total Online Amt :    " +df2.format(totalOnline) , subheader));
		        	} */
		        	HeaderTable2.addCell(new Phrase("    ", subheader));
		        	HeaderTable2.addCell(new Phrase("    ", subheader));
		           
		            // For Total Refund Calculation
		            
		        	if (totalChecqueRef > 0) {
		        		HeaderTable2.addCell(new Phrase("Total ChequeRefund Amt :    " + df2.format(totalChecqueRef), subheader));
		        	}
		        	if (totalCardRef > 0) {
		        		HeaderTable2.addCell(new Phrase("Total CardRefund Amt:    " + df2.format(totalCardRef), subheader));
		        	}
		        	if (totalNeBankingRef > 0) {
		        		HeaderTable2.addCell(new Phrase("Total UPIRefund Amt:    " + df2.format(totalNeBankingRef), subheader));
		        	}

		        	if (totalCashRef > 0) {
		        		HeaderTable2.addCell(new Phrase("Total CashRefund Amt :    " + df2.format(totalCashRef), subheader));
		        	}
		        	if (totalGooglePayRef > 0) {
		        		HeaderTable2.addCell(new Phrase("Total GPayRefund  Amt:    "+df2.format(totalGooglePayRef),subheader));	
		        	}

		        	 if(totalPhonepeRef>0){
		        		 HeaderTable2.addCell(new Phrase("Total PhonepeRefund Amt :    "+df2.format(totalPhonepeRef),subheader)); 
		        	 }
		        	if(totalPaytmRef>0){
		        		HeaderTable2.addCell(new Phrase("Total PaytmRefund Amt:    "+df2.format(totalPaytmRef),subheader));
		        	}
		        	
		        	if (totalCadvanceRef > 0) {
		        		HeaderTable2.addCell(new Phrase("Total CAdvanceRefund Amt :    " + df2.format(totalCadvanceRef), subheader));
		        	}

		        	if (totalRTGSRef > 0) {
		        		HeaderTable2.addCell(new Phrase("Total RTGSRefund Amt :    " +df2.format(totalRTGSRef) , subheader));
		        	}
		        	
		        	if (totalOnlineRef > 0) {
		        		HeaderTable2.addCell(new Phrase("Total OnlineRefund Amt :    " +df2.format(totalOnlineRef) , subheader));
		        	}
		         
		        	
		        	HeaderTable2.addCell(new Phrase("    ", subheader));
		        	HeaderTable2.addCell(new Phrase("    ", subheader));

		        	HeaderTable2.addCell(new Phrase("Total Receipt Collection :    " + df2.format(TotalReceiptCollection), subheader));
		        	HeaderTable2.addCell(new Phrase("Total Refunded Amt:    " + df2.format(TotalRefundCollection), subheader));
		        	HeaderTable2.addCell(new Phrase("Total Collection:    " + df2.format(TotalCollection), subheader));

		        	document.add(HeaderTable2);
		        	HeaderTable2.flushContent();

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