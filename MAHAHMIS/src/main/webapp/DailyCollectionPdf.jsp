<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.JSONArray"%>
<%@page import="com.itextpdf.text.html.simpleparser.StyleSheet"%>
<%@page import="com.itextpdf.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.hms.dto.Patient"%>
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
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%-- <%@ page import="com.hms.dto.HospitalDetails"%> --%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.dto.RadiationMaster"%>
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
	
	HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
	List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
	HospitalDetails hospObj = arrHospitalDetails.get(0);
//	int patID=Integer.parseInt(request.getParameter("patID"));
//	int treatId=Integer.parseInt(request.getParameter("tid"));
//	String patientID=(request.getParameter("patID"));
//	String treatmentID=(request.getParameter("tid"));
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

	// .............Amrut code.........
	//	if(request.getParameter("pageSize").equals("standard"))
	//	{ 	System.err.println("IFFFFFF");
			try {
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
					
				LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
				AutosuggestionService obj1=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
				List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
				
				//calling service leyer method to get patient records
				RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
				List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
				//ltRegMasterDto = us.fetchPatientsRecordByTreatmentId(treatId);
				//int sponsorSlave=ltRegMasterDto.get(0).getChargesMasterSlaveId();
				
				String spLeafName="";
				String refDocName  ="";
				 String BillCategoryName ="";

		/* 		if(sponsorSlave > 0){
					
					fetchsposor   = obj1.fetchSuperCatofchargesSlave(sponsorSlave);
					if(fetchsposor.size() > 0 ){
						
						BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
					}else{
						
						BillCategoryName = " Sponsor";
					}
					spLeafName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id");
					//BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id"); 
				}else{
					BillCategoryName = "Self";
				} */
				
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
	//dailycollection=fs.getDailyCollectionReport(obj,callfrom, fromDate, lastDate);
	dailycollection=fs.getDailyCollectionReportForMeesha(obj,callfrom, fromDate, lastDate);
	
	PdfPTable HeaderTable1 = new PdfPTable(13);
	int[] HeaderWidth1 =  {10,20,15,35,15,40,25,24,20,25,25,25,20};
	HeaderTable1.setWidths(HeaderWidth1);
	HeaderTable1.setWidthPercentage(95f);
	HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	
	PdfPTable HeaderTable2 = new PdfPTable(1);
	int[] HeaderWidth2 =  {100};
	HeaderTable2.setWidths(HeaderWidth2);
	HeaderTable2.setWidthPercentage(95f);
	HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	
	PdfPTable headerTable1 = new PdfPTable(13);
	int[] headerWidth1 =  {10,20,15,35,15,40,25,24,20,25,25,25,20};
	headerTable1.setWidths(headerWidth1);
	headerTable1.setWidthPercentage(95f);
	headerTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	
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
	HeaderTable1.addCell(new Phrase("",tabletext));
	
	 document.add(HeaderTable1);
	 HeaderTable1.flushContent();
	 
	    headerTable1.addCell(new Phrase("",tabletext));
	    headerTable1.addCell(new Phrase("",tabletext));
		headerTable1.addCell(new Phrase("",tabletext));
		headerTable1.addCell(new Phrase("",tabletext));
		headerTable1.addCell(new Phrase("",tabletext));
		headerTable1.addCell(new Phrase("",tabletext));
		headerTable1.addCell(new Phrase("",tabletext));
		headerTable1.addCell(new Phrase("",tabletext));
		headerTable1.addCell(new Phrase("",tabletext));
		headerTable1.addCell(new Phrase("",tabletext));
		headerTable1.addCell(new Phrase("",tabletext));
		headerTable1.addCell(new Phrase("",tabletext));
		headerTable1.addCell(new Phrase("",tabletext));
		
		 document.add(HeaderTable1);
		 headerTable1.flushContent();
	
   double opdrectotal=0;
   double opdreftotal=0; 
   double ipdrectotal=0;
   double ipdreftotal=0;
   double diagrectotal=0;
   double diagreftotal=0;
   double opdtotalBill=0;
   double opdtotalRemain=0;
   double opdtotalOnline=0;
   double ipdtotalOnline=0;
   double diagtotalOnline=0;
   double opdtotalCard=0;
   double ipdtotalCard=0;
   double diagtotalCard=0;
   double opdtotalCheque=0;
   double ipdtotalCheque=0;
   double diagtotalCheque=0;
   
   double opdtotalCash=0;
   double ipdtotalCash=0;
   double diagtotalCash=0;
   
   double opdtotalCAdvance=0;
   double ipdtotalCAdvance=0;
   double diagtotalCAdvance=0;
   
   double opdtotalMultiple=0;
   double ipdtotalMultiple=0;
   double diagtotalMultiple=0;
   
   double opdtotalPhonepe=0;
   double ipdtotalPhonepe=0;
   double diagtotalPhonepe=0;
   
   double opdtotalGpay=0;
   double ipdtotalGpay=0;
   double diagtotalGpay=0;
   
   double opdtotalPaytm=0;
   double ipdtotalPaytm=0;
   double diagtotalPaytm=0;
   
   double opdtotalRTGS=0;
   double ipdtotalRTGS=0;
   double diagtotalRTGS=0;
   
   double ipdtotalBill=0;  	/* Added By Annapurna */
   double ipdtotalRemain=0;/* Added By Annapurna */
   double diagnototalBill=0;
   double diagnototalRemain=0;
 
   double TotalReceiptCollection=0;
   double TotalRefundCollection=0;
   double TotalCollection=0;
   double totalBill=0;
   double totalRemain=0;
   
   
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
				HeaderTable1.addCell(new Phrase("",tabletext));
				HeaderTable1.addCell(new Phrase("",tabletext));
				 
				document.add(HeaderTable1);
				HeaderTable1.flushContent();
				
				HeaderTable1.addCell(new Phrase("#", subheader));
				HeaderTable1.addCell(new Phrase("UHID",subheader));
				HeaderTable1.addCell(new Phrase("Bill Id",subheader));
				HeaderTable1.addCell(new Phrase("Opd No.", subheader));
				HeaderTable1.addCell(new Phrase("RecId", subheader));
				HeaderTable1.addCell(new Phrase("Patient Name", subheader));
				HeaderTable1.addCell(new Phrase("Rec Date", subheader));
				HeaderTable1.addCell(new Phrase("Paymode", subheader));
				HeaderTable1.addCell(new Phrase("Total Paid", subheader));
				HeaderTable1.addCell(new Phrase("Total Bill", subheader));
				HeaderTable1.addCell(new Phrase("Total Remain", subheader));
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
				 HeaderTable1.addCell(new Phrase(""+strDate,tabletext));			//added by sandip
				 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdReceipt().get(z).getPayMode(),tabletext));
				 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdReceipt().get(z).getRecAmt(),tabletext));
				  opdrectotal =  opdrectotal +(+dailycollection.getLstOpdReceipt().get(z).getRecAmt());
				  opdtotalBill=opdtotalBill+dailycollection.getLstOpdReceipt().get(z).getTotalBill();
				  opdtotalRemain=opdtotalRemain+dailycollection.getLstOpdReceipt().get(z).getTotalRemain();
				  HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdReceipt().get(z).getTotalBill(),tabletext));
				  HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdReceipt().get(z).getTotalRemain(),tabletext));
				 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdReceipt().get(z).getUser(),tabletext));
				 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdReceipt().get(z).getRemark(),tabletext));
				 
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
				HeaderTable1.addCell(new Phrase("Total",subheader));
				HeaderTable1.addCell(new Phrase(""+opdrectotal,subheader));
				HeaderTable1.addCell(new Phrase(""+opdtotalBill,subheader));
				HeaderTable1.addCell(new Phrase(""+opdtotalRemain,subheader));
				HeaderTable1.addCell(new Phrase("",tabletext));
				HeaderTable1.addCell(new Phrase("",tabletext));
				
				document.add(HeaderTable1);
				HeaderTable1.flushContent();
			}
	       
        if(dailycollection.getLstOpdtotalAmt().size() > 0){
      	  for(DailyCollectionReportDto tobj :dailycollection.getLstOpdtotalAmt()){
      		  HeaderTable2.addCell(new Phrase("Total   "+(tobj.getPayMode() +":     "+(tobj.getTotalAmount())),subheader));
      		 // HeaderTable2.addCell(new Phrase("  "+(tobj.getTotalAmount()),subheader));
      		 if(tobj.getPayMode().equalsIgnoreCase("Online"))
      		 {
      			opdtotalOnline = opdtotalOnline + tobj.getTotalAmount();
      		 }
      		
      		 if(tobj.getPayMode().equalsIgnoreCase("Card"))
      		 {
      			opdtotalCard = opdtotalCard + tobj.getTotalAmount();
      		 }
      		if(tobj.getPayMode().equalsIgnoreCase("Cheque"))
     		 {
     			opdtotalCheque = opdtotalCheque + tobj.getTotalAmount();
     		 }
      		
      		if(tobj.getPayMode().equalsIgnoreCase("Cash"))
    		 {
    			opdtotalCash = opdtotalCash + tobj.getTotalAmount();
    		 }     		
      		if(tobj.getPayMode().equalsIgnoreCase("CAdvance"))
   		 {
   			opdtotalCAdvance = opdtotalCAdvance + tobj.getTotalAmount();
   		 }
      		if(tobj.getPayMode().equalsIgnoreCase("Multiple"))
      		 {
      			opdtotalMultiple = opdtotalMultiple + tobj.getTotalAmount();
      		 }
      		if(tobj.getPayMode().equalsIgnoreCase("Phonepe"))
     		 {
     			opdtotalPhonepe = opdtotalPhonepe + tobj.getTotalAmount();
     		 }
      		if(tobj.getPayMode().equalsIgnoreCase("Gpay"))
    		 {
    			opdtotalGpay = opdtotalGpay + tobj.getTotalAmount();
    		 }
      		if(tobj.getPayMode().equalsIgnoreCase("Paytm"))
   		 {
   			opdtotalPaytm = opdtotalPaytm + tobj.getTotalAmount();
   		 }
      		if(tobj.getPayMode().equalsIgnoreCase("RTGS"))
      		 {
      			opdtotalRTGS = opdtotalRTGS + tobj.getTotalAmount();
      		 }
      	  }
       }
        document.add(HeaderTable2);
	    HeaderTable2.flushContent();
	    
	    HeaderTable2.addCell(" ");
	   
	    document.add(HeaderTable2);
	    HeaderTable2.flushContent();

//////////////////////////////////////////OPD Total Refund///////////////////////////////////////////////////////		 
            
	  if (dailycollection.getLstOpdRefund() != null
			&& dailycollection.getLstOpdRefund().size() > 0
			&& dailycollection.getLstOpdRefund().size() != 0) {

			HeaderTable2.addCell(new Phrase("OPD Total Refund",subheader));

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
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			HeaderTable1.addCell(new Phrase("#", subheader));
			HeaderTable1.addCell(new Phrase("UHID",subheader));
			HeaderTable1.addCell(new Phrase("Bill Id",subheader));
			HeaderTable1.addCell(new Phrase("Opd No.", subheader));
			HeaderTable1.addCell(new Phrase("RecId", subheader));
			HeaderTable1.addCell(new Phrase("Patient Name", subheader));
			HeaderTable1.addCell(new Phrase("Rec Date", subheader));
			HeaderTable1.addCell(new Phrase("Paymode", subheader));
			HeaderTable1.addCell(new Phrase("Total Refund", subheader));
			HeaderTable1.addCell(new Phrase("Total Bill", subheader));
			HeaderTable1.addCell(new Phrase("Total Remain", subheader));
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
			HeaderTable1.addCell(new Phrase("",tabletext));
			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			 	for (int z = 0; z < dailycollection.getLstOpdRefund().size(); z++) {
					 
			 		 Date df =(dailycollection.getLstOpdReceipt().get(z).getRecDate()); 
					 DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
					 String strDate = dateFormat.format(df);
					 
			 		 HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					 HeaderTable1.addCell(new Phrase(""+ (z + 1),tabletext));
					 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getPatientId(),tabletext));
					 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getBillId(),tabletext));
					 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getOpdipdno(),tabletext));
					 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getRecNo(),tabletext));
					 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getPatientName(),tabletext));
					 HeaderTable1.addCell(new Phrase(""+strDate,tabletext));
					 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getPayMode(),tabletext));
					 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getRecAmt(),tabletext));
					 opdreftotal =  opdreftotal +(+dailycollection.getLstOpdRefund().get(z).getRecAmt());
					 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getTotalBill(),tabletext));
					 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getTotalRemain(),tabletext));
					 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getUser(),tabletext));
					 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstOpdRefund().get(z).getRemark(),tabletext));
					 
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
			HeaderTable1.addCell(new Phrase("Total",subheader));
			HeaderTable1.addCell(new Phrase(""+opdreftotal,subheader));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
	 } 

	  if(dailycollection.getLstOpdtotalRefundAmt().size() > 0){
      	  for(DailyCollectionReportDto tobj :dailycollection.getLstOpdtotalRefundAmt()){
      		  HeaderTable2.addCell(new Phrase("Total   "+(tobj.getPayMode() +":     "+(tobj.getTotalAmount())),subheader));
      		 // HeaderTable2.addCell(new Phrase("  "+(tobj.getTotalAmount()),subheader));
      	  }
      	  document.add(HeaderTable2);
  	    HeaderTable2.flushContent();
  	    
  	    HeaderTable2.addCell(" ");
  	   
  	    document.add(HeaderTable2);
  	    HeaderTable2.flushContent();
       }
      

		 
//////////////////////////////////////////IPD Total Collection///////////////////////////////////////////////////////

         if (dailycollection.getLstIpdReceipt() != null
			&& dailycollection.getLstIpdReceipt().size() > 0
			&& dailycollection.getLstIpdReceipt().size() != 0) {

		 	HeaderTable2.addCell(new Phrase("IPD Total Collection",subheader));

		    document.add(HeaderTable2);
		    HeaderTable2.flushContent();

			
			
		    headerTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			
			 
			document.add(headerTable1);
			headerTable1.flushContent();
			
			headerTable1.addCell(new Phrase("#", subheader));
			headerTable1.addCell(new Phrase("UHID",subheader));
			headerTable1.addCell(new Phrase("Bill Id",subheader));
			headerTable1.addCell(new Phrase("Opd No.", subheader));
			headerTable1.addCell(new Phrase("RecId", subheader));
			headerTable1.addCell(new Phrase("Patient Name", subheader));
			headerTable1.addCell(new Phrase("Rec Date", subheader));
			headerTable1.addCell(new Phrase("Paymode", subheader));
			headerTable1.addCell(new Phrase("Total Paid", subheader));
			headerTable1.addCell(new Phrase("Total Bill", subheader));
			headerTable1.addCell(new Phrase("Total Remain", subheader));
			headerTable1.addCell(new Phrase("User", subheader));
			headerTable1.addCell(new Phrase("Remark", subheader));
			
			headerTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
								
			document.add(headerTable1);
			headerTable1.flushContent();
		 for (int z = 0; z < dailycollection.getLstIpdReceipt().size(); z++) {
			 headerTable1.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);
			
			 Date df =(dailycollection.getLstIpdReceipt().get(z).getRecDate()); 
			 DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
			 String strDate = dateFormat.format(df);
			 
			 headerTable1.addCell(new Phrase(""+ (z + 1),tabletext));
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getPatientId(),tabletext));
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getBillId(),tabletext));
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getOpdipdno(),tabletext));
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getRecNo(),tabletext));
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getPatientName(),tabletext));
			 headerTable1.addCell(new Phrase(""+strDate,tabletext));
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getPayMode(),tabletext));
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getRecAmt(),tabletext));
			 ipdrectotal =  ipdrectotal +(+dailycollection.getLstIpdReceipt().get(z).getRecAmt());
			
			 ipdtotalBill=ipdtotalBill+dailycollection.getLstIpdReceipt().get(z).getTotalBill();
			 ipdtotalRemain=ipdtotalRemain+dailycollection.getLstIpdReceipt().get(z).getTotalRemain();	/* Added By Annapurna */		 
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getTotalBill(),tabletext)); /* Added By Annapurna */
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getTotalRemain(),tabletext)); /* Added By Annapurna */
 			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getUser(),tabletext));
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getRemark(),tabletext));

			 headerTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);

				document.add(headerTable1);
				headerTable1.flushContent(); 
				
				if(dailycollection.getLstIpdReceipt().get(z).getPayMode().equalsIgnoreCase("Cash"))
				{
					ipdtotalCash = ipdtotalCash + dailycollection.getLstIpdReceipt().get(z).getRecAmt();
				}
				if(dailycollection.getLstIpdReceipt().get(z).getPayMode().equalsIgnoreCase("Online"))
				{
					ipdtotalOnline = ipdtotalOnline + dailycollection.getLstIpdReceipt().get(z).getRecAmt();
				}
				
				if(dailycollection.getLstIpdReceipt().get(z).getPayMode().equalsIgnoreCase("Card"))
				{
					ipdtotalCard = ipdtotalCard + dailycollection.getLstIpdReceipt().get(z).getRecAmt();
				}
				if(dailycollection.getLstIpdReceipt().get(z).getPayMode().equalsIgnoreCase("Cheque"))
				{
					ipdtotalCheque = ipdtotalCheque + dailycollection.getLstIpdReceipt().get(z).getRecAmt();
				}
				if(dailycollection.getLstIpdReceipt().get(z).getPayMode().equalsIgnoreCase("CAdvance"))
				{
					ipdtotalCAdvance = ipdtotalCAdvance + dailycollection.getLstIpdReceipt().get(z).getRecAmt();
				}
				if(dailycollection.getLstIpdReceipt().get(z).getPayMode().equalsIgnoreCase("Multiple"))
				{
					ipdtotalMultiple = ipdtotalMultiple + dailycollection.getLstIpdReceipt().get(z).getRecAmt();
				}
				if(dailycollection.getLstIpdReceipt().get(z).getPayMode().equalsIgnoreCase("Phonepe"))
				{
					ipdtotalPhonepe = ipdtotalPhonepe + dailycollection.getLstIpdReceipt().get(z).getRecAmt();
				}
				if(dailycollection.getLstIpdReceipt().get(z).getPayMode().equalsIgnoreCase("Gpay"))
				{
					ipdtotalGpay = ipdtotalGpay + dailycollection.getLstIpdReceipt().get(z).getRecAmt();
				}
				if(dailycollection.getLstIpdReceipt().get(z).getPayMode().equalsIgnoreCase("Paytm"))
				{
					ipdtotalPaytm = ipdtotalPaytm + dailycollection.getLstIpdReceipt().get(z).getRecAmt();
				}
				if(dailycollection.getLstIpdReceipt().get(z).getPayMode().equalsIgnoreCase("RTGS"))
				{
					ipdtotalRTGS = ipdtotalRTGS + dailycollection.getLstIpdReceipt().get(z).getRecAmt();
				}
		 }
		 
		    headerTable1.getDefaultCell().setBorder(Rectangle.TOP);
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("Total",subheader));
			headerTable1.addCell(new Phrase(""+ipdrectotal,subheader));
			headerTable1.addCell(new Phrase(""+ipdtotalBill,subheader)); 
			headerTable1.addCell(new Phrase(""+ipdtotalRemain,subheader));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			
			document.add(headerTable1);
			headerTable1.flushContent();
         }
   /* if(dailycollection.getLstOpdtotalAmt().size() > 0){
         	  for(DailyCollectionReportDto tobj :dailycollection.getLstOpdtotalAmt()){
         		  HeaderTable2.addCell(new Phrase("Total   "+(tobj.getPayMode() +": "+(tobj.getTotalAmount())),subheader));
         		
         	  }
          } */
           document.add(HeaderTable2);
   	    HeaderTable2.flushContent();
   	    
   	    HeaderTable2.addCell(" ");
   	   
   	    document.add(HeaderTable2);
   	    HeaderTable2.flushContent();


//////////////////////////////////////////IPD Total Refund///////////////////////////////////////////////////////		
         
         	if (dailycollection.getLstIpdRefund()!= null
			&& dailycollection.getLstIpdRefund().size() > 0
			&& dailycollection.getLstIpdRefund().size() != 0) { 

		 HeaderTable2.addCell(new Phrase("IPD Total Refund",subheader));

		    document.add(HeaderTable2);
		    HeaderTable2.flushContent();
					
		   // headerTable1.addCell(new Phrase("",subheader));
			
			headerTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			
			document.add(headerTable1);
			headerTable1.flushContent();
			
			headerTable1.addCell(new Phrase("#", subheader));
			headerTable1.addCell(new Phrase("UHID",subheader));
			headerTable1.addCell(new Phrase("Bill Id",subheader));
			headerTable1.addCell(new Phrase("Opd No.", subheader));
			headerTable1.addCell(new Phrase("RecId", subheader));
			headerTable1.addCell(new Phrase("Patient Name", subheader));
			headerTable1.addCell(new Phrase("Rec Date", subheader));
			headerTable1.addCell(new Phrase("Paymode", subheader));
			headerTable1.addCell(new Phrase("Total Refund", subheader));
			headerTable1.addCell(new Phrase("Total Bill", subheader));
			headerTable1.addCell(new Phrase("Total Remain", subheader));
			headerTable1.addCell(new Phrase("User", subheader));
			headerTable1.addCell(new Phrase("Remark", subheader));
			
			
			headerTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			
			document.add(headerTable1);
			headerTable1.flushContent();
			
		 for (int z = 0; z < dailycollection.getLstIpdRefund().size(); z++) {
			 headerTable1.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);
			 
			 Date df =(dailycollection.getLstOpdReceipt().get(z).getRecDate()); 
			 DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
			 String strDate = dateFormat.format(df);
			 
			 headerTable1.addCell(new Phrase(""+ (z + 1),tabletext));
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getPatientId(),tabletext));
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getBillId(),tabletext));
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getOpdipdno(),tabletext));
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getRecNo(),tabletext));
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getPatientName(),tabletext));
			 headerTable1.addCell(new Phrase(""+strDate,tabletext));
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getPayMode(),tabletext));
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getRecAmt(),tabletext));
			 ipdreftotal =  ipdreftotal +(+dailycollection.getLstIpdRefund().get(z).getRecAmt());
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getTotalBill(),tabletext)); 
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdReceipt().get(z).getTotalRemain(),tabletext));
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getUser(),tabletext));
			 headerTable1.addCell(new Phrase(""+dailycollection.getLstIpdRefund().get(z).getRemark(),tabletext));		 
			 headerTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);

				document.add(headerTable1);
				headerTable1.flushContent(); 
		 }
		 
		 headerTable1.getDefaultCell().setBorder(Rectangle.TOP);
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("Total",subheader));
			headerTable1.addCell(new Phrase(""+ipdreftotal,subheader));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			headerTable1.addCell(new Phrase("",tabletext));
			
			document.add(headerTable1);
			headerTable1.flushContent();
         	 }
    
         	document.add(HeaderTable2);
    	    HeaderTable2.flushContent();
    	    
    	    HeaderTable2.addCell(" ");
    	   
    	    document.add(HeaderTable2);
    	    HeaderTable2.flushContent();
	
//////////////////////////////////////////Diagnosis Total Collection///////////////////////////////////////////////////////		 
		 
         	 if (dailycollection.getLstDiagReceipt()!= null
			&& dailycollection.getLstDiagReceipt().size() > 0
			&& dailycollection.getLstDiagReceipt().size() != 0) { 

		 HeaderTable2.addCell(new Phrase("Diagnosis Total Collection",subheader));

		    document.add(HeaderTable2);
		    HeaderTable2.flushContent();

			///HeaderTable1.addCell(new Phrase("",subheader));
			
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
			HeaderTable1.addCell(new Phrase("",tabletext));
			 
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			HeaderTable1.addCell(new Phrase("#", subheader));
			HeaderTable1.addCell(new Phrase("UHID",subheader));
			HeaderTable1.addCell(new Phrase("Bill Id",subheader));
			HeaderTable1.addCell(new Phrase("Opd No.", subheader));
			HeaderTable1.addCell(new Phrase("RecId", subheader));
			HeaderTable1.addCell(new Phrase("Patient Name", subheader));
			HeaderTable1.addCell(new Phrase("Rec Date", subheader));
			HeaderTable1.addCell(new Phrase("Paymode", subheader));
			HeaderTable1.addCell(new Phrase("Total Paid", subheader));
			HeaderTable1.addCell(new Phrase("Total Bill", subheader));
			HeaderTable1.addCell(new Phrase("Total Remain", subheader));
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
			HeaderTable1.addCell(new Phrase("", subheader));
			HeaderTable1.addCell(new Phrase("", subheader));
			
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
			 HeaderTable1.addCell(new Phrase(""+strDate,tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagReceipt().get(z).getPayMode(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagReceipt().get(z).getRecAmt(),tabletext));
			 diagrectotal =  diagrectotal +(+dailycollection.getLstDiagReceipt().get(z).getRecAmt());
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagReceipt().get(z).getTotalBill(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagReceipt().get(z).getTotalRemain(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagReceipt().get(z).getUser(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagReceipt().get(z).getRemark(),tabletext));
			 
			 diagnototalBill=diagnototalBill+dailycollection.getLstDiagReceipt().get(z).getTotalBill();
			 diagnototalRemain=diagnototalRemain+dailycollection.getLstDiagReceipt().get(z).getTotalRemain();
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
			HeaderTable1.addCell(new Phrase("Total",subheader));
			HeaderTable1.addCell(new Phrase(""+diagrectotal,subheader));
			HeaderTable1.addCell(new Phrase(""+diagnototalBill,subheader));
			HeaderTable1.addCell(new Phrase(""+diagnototalRemain,subheader));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
         	 }
         	 if(dailycollection.getLstDiagnototalAmt().size() > 0){
             	  for(DailyCollectionReportDto tobj :dailycollection.getLstDiagnototalAmt()){
             		  HeaderTable2.addCell(new Phrase("Total   "+(tobj.getPayMode() +":     "+(tobj.getTotalAmount())),subheader));
             		 // HeaderTable2.addCell(new Phrase("  "+(tobj.getTotalAmount()),subheader));
             		 if(tobj.getPayMode().equalsIgnoreCase("Cash"))
             	  	{
             	  		diagtotalCash = diagtotalCash + tobj.getTotalAmount();
             	  	}
             	  	if(tobj.getPayMode().equalsIgnoreCase("Online"))
             	  	{
             	  		diagtotalOnline = diagtotalOnline + tobj.getTotalAmount();
             	  	}
             	  	if(tobj.getPayMode().equalsIgnoreCase("Card"))
             	  	{
             	  		diagtotalCard = diagtotalCard + tobj.getTotalAmount();
             	  	}
             	  	if(tobj.getPayMode().equalsIgnoreCase("Cheque"))
             	  	{
             	  		diagtotalCheque = diagtotalCheque + tobj.getTotalAmount();
             	  	}
             		if(tobj.getPayMode().equalsIgnoreCase("CAdvance"))
             	  	{
             	  		diagtotalCAdvance = diagtotalCAdvance + tobj.getTotalAmount();
             	  	}
             		if(tobj.getPayMode().equalsIgnoreCase("Multiple"))
             	  	{
             	  		diagtotalMultiple = diagtotalMultiple + tobj.getTotalAmount();
             	  	}
             		if(tobj.getPayMode().equalsIgnoreCase("Phonepe"))
             	  	{
             	  		diagtotalPhonepe = diagtotalPhonepe + tobj.getTotalAmount();
             	  	}
             		if(tobj.getPayMode().equalsIgnoreCase("Paytm"))
             	  	{
             	  		diagtotalPaytm = diagtotalPaytm + tobj.getTotalAmount();
             	  	}
             		if(tobj.getPayMode().equalsIgnoreCase("RTGS"))
             	  	{
             	  		diagtotalRTGS = diagtotalRTGS + tobj.getTotalAmount();
             	  	}
             	  }           	  
              }
               document.add(HeaderTable2);
       	    HeaderTable2.flushContent();
       	    
       	    HeaderTable2.addCell(" ");
       	   
       	    document.add(HeaderTable2);
       	    HeaderTable2.flushContent();
//////////////////////////////////////////Diagnosis Total Refund///////////////////////////////////////////////////////		
           		 
         	 if (dailycollection.getLstDiagRefund()!= null
			&& dailycollection.getLstDiagRefund().size() > 0
			&& dailycollection.getLstDiagRefund().size() != 0) { 

		 HeaderTable2.addCell(new Phrase("Diagnosis Total Refund",subheader));

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
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			 
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			HeaderTable1.addCell(new Phrase("#", subheader));
			HeaderTable1.addCell(new Phrase("UHID",subheader));
			HeaderTable1.addCell(new Phrase("Bill Id",subheader));
			HeaderTable1.addCell(new Phrase("Opd No.", subheader));
			HeaderTable1.addCell(new Phrase("RecId", subheader));
			HeaderTable1.addCell(new Phrase("Patient Name", subheader));
			HeaderTable1.addCell(new Phrase("Rec Date", subheader));
			HeaderTable1.addCell(new Phrase("Paymode", subheader));
			HeaderTable1.addCell(new Phrase("Total Refund", subheader));
			HeaderTable1.addCell(new Phrase("Total Bill", subheader));
			HeaderTable1.addCell(new Phrase("Total Remain", subheader));
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
			HeaderTable1.addCell(new Phrase("",tabletext));
			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
		 for (int z = 0; z < dailycollection.getLstDiagRefund().size(); z++) {
			 HeaderTable1.getDefaultCell().setBorder(
						Rectangle.NO_BORDER);
			
			 Date df =(dailycollection.getLstOpdReceipt().get(z).getRecDate()); 
			 DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
			 String strDate = dateFormat.format(df);
			 
			 HeaderTable1.addCell(new Phrase(""+ (z + 1),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getPatientId(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getBillId(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getOpdipdno(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getRecNo(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getPatientName(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+strDate,tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getPayMode(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getRecAmt(),tabletext));
			 diagreftotal =  diagreftotal +(+dailycollection.getLstDiagRefund().get(z).getRecAmt());
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getTotalBill(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getTotalRemain(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getUser(),tabletext));
			 HeaderTable1.addCell(new Phrase(""+dailycollection.getLstDiagRefund().get(z).getRemark(),tabletext));
			 
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
			HeaderTable1.addCell(new Phrase("Total",subheader));
			HeaderTable1.addCell(new Phrase(""+diagreftotal,subheader));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
    	 }

         	 if(dailycollection.getLstDiagnototalRefundAmt().size() > 0){
             	  for(DailyCollectionReportDto tobj :dailycollection.getLstDiagnototalRefundAmt()){
             		  HeaderTable2.addCell(new Phrase("Total   "+(tobj.getPayMode() +":     "+(tobj.getTotalAmount())),subheader));
             		 // HeaderTable2.addCell(new Phrase("  "+(tobj.getTotalAmount()),subheader));
             	  }
             	  document.add(HeaderTable2);
         	    HeaderTable2.flushContent();
         	    
         	    HeaderTable2.addCell(" ");
         	   
         	    document.add(HeaderTable2);
         	    HeaderTable2.flushContent();
              }

     TotalReceiptCollection =opdrectotal + ipdrectotal + diagrectotal ;
	 TotalRefundCollection = opdreftotal + ipdreftotal +diagreftotal;
	 TotalCollection = TotalReceiptCollection - TotalRefundCollection;
	double totalCash=opdtotalCash+ipdtotalCash+diagtotalCash;
	double totalOnline=opdtotalOnline+ipdtotalOnline+diagtotalOnline;
	double totalCard=opdtotalCard+ipdtotalCard+diagtotalCard;
	double totalCheque=opdtotalCheque+ipdtotalCheque+diagtotalCheque;
	double totalCAdvance=opdtotalCAdvance+ipdtotalCAdvance+diagtotalCAdvance;
	double totalMultiple=opdtotalMultiple+ipdtotalMultiple+diagtotalMultiple;
	double totalPhonepe=opdtotalPhonepe+ipdtotalPhonepe+diagtotalPhonepe;
    double totalGpay=opdtotalGpay+ipdtotalGpay+diagtotalGpay;
	double totalPaytm=opdtotalPaytm+ipdtotalPaytm+diagtotalPaytm;
	double totalRTGS=opdtotalRTGS+ipdtotalRTGS+diagtotalRTGS;
	 
	// HeaderTable2.addCell(new Phrase("Total Bill            :    "+(opdtotalBill+diagnototalBill),subheader));
	 HeaderTable2.addCell(new Phrase("Total Bill            :    "+(opdtotalBill+ipdtotalBill+diagnototalBill),subheader));
     HeaderTable2.addCell(new Phrase("Total Receipt     :    "+TotalReceiptCollection,subheader));
     HeaderTable2.addCell(new Phrase("Total Refund      :    "+TotalRefundCollection,subheader));
  //   HeaderTable2.addCell(new Phrase("Total Collection :    "+TotalCollection,subheader));
    HeaderTable2.addCell(new Phrase("Total Collection :    "+TotalCollection,subheader));
  //  HeaderTable2.addCell(new Phrase("Total Remain     :    "+(opdtotalRemain+diagnototalRemain),subheader));
    HeaderTable2.addCell(new Phrase("Total Remain     :    "+(opdtotalRemain+ipdtotalRemain+diagnototalRemain),subheader));
   
    if (totalCash > 0) {
    	 HeaderTable2.addCell(new Phrase("Total Cash Amt   :    "+(totalCash),subheader));
    }
    if (totalOnline > 0){
    HeaderTable2.addCell(new Phrase("Total Online Amt   :    "+(totalOnline),subheader));
    }
    if (totalCard > 0){
    HeaderTable2.addCell(new Phrase("Total Card Amt     :    "+(totalCard),subheader));
    }
    if (totalMultiple > 0){
    	HeaderTable2.addCell(new Phrase("Total Multiple Amt     :    "+(totalMultiple),subheader));
    }
    if (totalCheque > 0){
    HeaderTable2.addCell(new Phrase("Total Cheque Amt     :    "+(totalCheque),subheader));
    }
    
    if (totalCAdvance > 0){
    HeaderTable2.addCell(new Phrase("Total CAdvance Amt     :    "+(totalCAdvance),subheader));
    }
    
    if (totalPhonepe > 0){
    HeaderTable2.addCell(new Phrase("Total Phonepe Amt     :    "+(totalPhonepe),subheader));
    }
    
    if (totalGpay > 0){
    HeaderTable2.addCell(new Phrase("Total Gpay Amt     :    "+(totalGpay),subheader));
    }
    
    if (totalPaytm > 0){
    HeaderTable2.addCell(new Phrase("Total Paytm Amt     :    "+(totalPaytm),subheader));
    }
     
    if (totalRTGS > 0) {
    	 HeaderTable2.addCell(new Phrase("Total RTGS Amt :    " + totalRTGS, subheader));
	}
     
     
    
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