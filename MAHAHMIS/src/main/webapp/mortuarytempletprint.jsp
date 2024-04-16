 <%@page import="com.hms.mortuary.dto.MortuaryPmReport"%> 
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
<%@ page import="com.hms.dto.HospitalDetails"%>
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
 <%@page import="com.hms.mortuary.controller.MortuaryController"%>
<%@page import="com.hms.mortuary.dto.MortuaryMasterDto"%> 
<%@page import="org.jsoup.Jsoup"%>
<%@page import="com.hms.model.TreatmentModel"%>
<%@page import="com.hms.dto.Assessment"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.model.IPDTreatmentModel"%>
<%@page import="com.hms.dto.IPDHistoryMaster"%>
<%@page import="com.hms.dto.Order_master"%>

<%@page import="com.hms.dto.CustomizeTemplate"%>


<%@page import="com.hms.hisab.model.HisabModel"%>
<%@page import="com.hms.ipdbill.dto.BillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.serviceImpl.BillServiceImpl"%>
<%@page import="com.hms.ipdbill.service.BillService"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%@ page import="com.hms.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
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
<title>OPD Receipt</title>
</head>
<body>
	<%
	Font subheader3 = new Font(Font.FontFamily.HELVETICA, 12,
			Font.BOLD |Font.UNDERLINE);
	Font header2 = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD);

	/* List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails.getHospDetails("0");
	HospitalDetails hospObj = arrHospitalDetails.get(0); */
	
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
	/* String billPrint = (String) resourceBundle.getObject("billPrint").toString();
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
	String date_pick=(request.getParameter("date_pick")); */

	int morid=Integer.parseInt(request.getParameter("mortuaryId"));

	
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
				
				/* String path = hospObj.getFilePath();
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
				String panNo	  =   hospObj.getPanNo(); */
			//	String hPhoneNo   = PhoneNo+"/"+secPhoneNo;
				
				//String nabh = hospObj.getNabhImagePath(); 
				//String nabhLogo = application.getRealPath(nabh);
				
				Image img = null;
				PdfPCell cell = null;
				try {
					//img = Image.getInstance(path1);
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
					//imgNabh = Image.getInstance(nabhLogo);
					imgNabh.scaleAbsolute(80, 60);
					cellNabh = new PdfPCell();
					cellNabh.addElement(new Chunk(imgNabh, 5, -5));
					cellNabh.setBorder(Rectangle.NO_BORDER);
				} catch (Exception e) {
					e.printStackTrace();
				} 
					
			
				 MortuaryController mor=(ApplicationContextUtils.getApplicationContext()).getBean( MortuaryController.class);
				 MortuaryMasterDto mortuary = new MortuaryMasterDto();			
					
					mortuary =mor.getMortuaryById(morid);
					
				MortuaryPmReport mortuarypmreport=new MortuaryPmReport();
				List<MortuaryPmReport> mortuarypmreportlist = null;
				/* mortuarypmreport=mor.updatePmReport(morid);
				mortuarypmreportlist.add(mortuarypmreport); */
				mortuarypmreportlist=mor.getPmReportforPrint(morid);//Annapurna
				//mortuarypmreportlist.add(mortuarypmreport);
			
				System.out.println("Data Added Successfully:: "+mortuarypmreportlist.size());//Annapurna
				System.out.println("Data :: "+mortuarypmreportlist.get(0).getTemplate_data());//Annapurna
				
				document.newPage();
				PdfPTable HeaderTable1 = new PdfPTable(3);
				int[] headerwidth1 = { 40, 70, 12 };
				HeaderTable1.setWidths(headerwidth1);
				HeaderTable1.setWidthPercentage(95f);
				HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
				HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);


				
				PdfPTable HeaderTable31 = new PdfPTable(1);
				int[] headerwidth31 = { 120 };
				HeaderTable31.setWidths(headerwidth31);
				HeaderTable31.setWidthPercentage(95f);
				HeaderTable31.getDefaultCell().setBorder(Rectangle.BOTTOM);
				
				PdfPTable HeaderTable4 = new PdfPTable(6);
				int[] headerwidth4 = { 15,15,15,15,15,15};
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
							/* p.add(new Chunk(" "+hospitalName, bold));	
							p.add(new Chunk(" \n", bold));
							p.add(new Chunk(" \n"+address, tabletext));			
							p.add(new Chunk(" "+city+" Pin- "+hospitalZip+"\n", tabletext));
 							p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
                            if(!webste.equalsIgnoreCase("")){
							p.add(new Chunk(" \n "+webste, tabletext));
							}
							p.add(new Chunk(" \n "+"email: "+email, tabletext)); */							//p.add(new Chunk(" \nPAN No : "+panNo , tabletext));	
						//	p.add(new Chunk(" \nCIN: "+cinNo, tabletext));	
						//	p.add(new Chunk(" \nSERVICE TAX NO: "+serviceTaxNo+", PAN No: "+panNo, regular));	
							
							PdfPCell hospitalNameCell = new PdfPCell(p);				
							hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
							hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
							HeaderTable12.addCell(hospitalNameCell);
							
							
								
								HeaderTable12.addCell(new Phrase("", header));
							
							
							
							
							HeaderTable12.addCell(new Phrase("", header));
							HeaderTable12.addCell(new Phrase("", header));
							HeaderTable12.addCell(new Phrase("", header));
							HeaderTable12.addCell(new Phrase("", header));
							HeaderTable12.addCell(new Phrase("", header));
							HeaderTable12.addCell(new Phrase("", header));
							
							document.add(HeaderTable12);
							HeaderTable12.flushContent();
	
							PdfPTable HeaderTable9 = new PdfPTable(3);
							int[] headerwidth9 = { 60, 40, 30 };
							HeaderTable9.setWidths(headerwidth9);
							HeaderTable9.setWidthPercentage(95f);
							HeaderTable9.setHorizontalAlignment(Element.ALIGN_CENTER);
							HeaderTable9.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							
							HeaderTable9.getDefaultCell().setBorder(Rectangle.TOP);
							HeaderTable9.addCell(new Phrase("", header));
							HeaderTable9.addCell(new Phrase("PM Report", subheader));
							HeaderTable9.addCell(new Phrase("Date:"+curr_date, subheader));
							document.add(HeaderTable9);
							HeaderTable9.flushContent();
							
							HeaderTable9.getDefaultCell().setBorder(Rectangle.BOTTOM);
							HeaderTable9.addCell(new Phrase("", header));
							HeaderTable9.addCell(new Phrase("", tabletext));
							HeaderTable9.addCell(new Phrase("", tabletext));
							document.add(HeaderTable9);
							HeaderTable9.flushContent();
							
							
							
							
							
							HeaderTable4.addCell(new Phrase("Mortuary Id :", subheader));
							HeaderTable4.addCell(new Phrase(""+mortuary.getMor_id(), tabletext));
							HeaderTable4.addCell(new Phrase("Deceased Name :", subheader));
							HeaderTable4.addCell(new Phrase(""+mortuary.getDeceased_name(), tabletext));
							HeaderTable4.addCell(new Phrase("Address :", subheader));
							HeaderTable4.addCell(new Phrase(""+mortuary.getAddress1(), tabletext));


							HeaderTable4.addCell(new Phrase("Gender :", subheader));
							HeaderTable4.addCell(new Phrase(""+mortuary.getGender1(), tabletext));
							HeaderTable4.addCell(new Phrase("Age :", subheader));
							HeaderTable4.addCell(new Phrase(""+mortuary.getAge1(), tabletext));
							HeaderTable4.addCell(new Phrase("Date Of Death :", subheader));
							HeaderTable4.addCell(new Phrase(""+mortuary.getDate_of_death(), tabletext));
							
							HeaderTable4.addCell(new Phrase("Date In :", subheader));
							HeaderTable4.addCell(new Phrase(""+mortuary.getDate_in(), tabletext));
							HeaderTable4.addCell(new Phrase("", tabletext));
							HeaderTable4.addCell(new Phrase("", tabletext));
							HeaderTable4.addCell(new Phrase("", tabletext));
							HeaderTable4.addCell(new Phrase("", tabletext));
							
							
							document.add(HeaderTable4);
							HeaderTable4.flushContent();
							
							
							HeaderTable12.getDefaultCell().setBorder(Rectangle.TOP);
							HeaderTable12.addCell(new Phrase("", tabletext));
							HeaderTable12.addCell(new Phrase("", tabletext));
							HeaderTable12.addCell(new Phrase("", tabletext));
							document.add(HeaderTable12);
							HeaderTable12.flushContent();
							
							
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
	
							
							
							

							
							if(mortuarypmreportlist.size() > 0){
								if(mortuarypmreportlist.get(0).getTemplate_data()==null){
									
								}else{
									
									String tratServ= mortuarypmreportlist.get(0).getTemplate_data();
									   HTMLWorker htmlWorker2 = new HTMLWorker(document);
							            Paragraph paragraph2 = new Paragraph();
							            StyleSheet styleSheet2 = new StyleSheet();
							            styleSheet2.loadTagStyle("body", "size", "90px");
							            styleSheet2.loadTagStyle("p", "size", " 100px");
							            java.util.List<Element> ie3 = HTMLWorker.parseToList(
							                    new StringReader("              "+ tratServ),
							                    styleSheet2);
							            PdfPTable Table13 = new PdfPTable(1);
										int[] width3 = { 500 };
										Table13.setWidths(width3);
										Table13.setWidthPercentage(95f);
										Table13.getDefaultCell().setBorder(Rectangle.NO_BORDER);
										
										if (tratServ != "" || tratServ != null) {
											
											
								
									

											try {

											     for (Element element : ie3) {
									                   if (element instanceof PdfPTable)
									                   {
									                       PdfPTable htmlTable = new PdfPTable(1);
									                       int[] htmlTableWidth = {500};
									                       htmlTable.setWidths(htmlTableWidth);
									                       htmlTable.setWidthPercentage(50f);
									                       htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
									                       htmlTable = (PdfPTable)element;
									                  
									                       Table13.addCell(htmlTable);
									                      
									                       document.add(Table13);
									                       Table13.flushContent();
									                   }else{
								      	   paragraph2.add(element); 
									                       cell = new PdfPCell(paragraph2);
									                       cell.setBorder(Rectangle.NO_BORDER);
							
									                       Table13.addCell(cell);
									                      
									                       document.add(Table13);
									                       Table13.flushContent();
									                       paragraph2.clear();
									                   }
									               }

												
												
											} catch (Exception e) {
												document.add(Table13);
												Table13.flushContent();
												e.printStackTrace();
											}}
								}
							
						}
							
							
							document.close();
							outStream.close();
							outStream.flush();
							
							}
							catch(Exception e)
							{
								e.printStackTrace();
								}
							
							%>
</body>
</html>