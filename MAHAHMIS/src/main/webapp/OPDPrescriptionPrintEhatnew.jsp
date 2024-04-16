<%-- <%@page import="com.itextpdf.awt.geom.Line2D"%>
 --%>
 <%@page import="com.hms.dto.Appointment"%>
 <%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.pharmacy.upload.FilePath"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.dto.PrescriptionInstruction"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>
<%@page import="com.hms.ipdbill.service.IpdBillService"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="java.util.Calendar"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@page import="com.hms.dto.Prescription"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.doctordesk.dto.OPDPrescriptionDtoSP"%>
<%@ page import="com.hms.doctordesk.service.PrescriptionService"%>
<%@page import="com.hms.doctordesk.dto.OPDPrescriptionFolloUpDto"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<!DOCTYPE html>
<html>
<head>
<meta  http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Auto DischargeSummaryPrint</title>List<Assessment> arrAssessments = new ArrayList<Assessment>();
</head>
<body>
	<%
		try {

			response.setContentType("application/pdf");
			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails  = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String billPrint = (String) resourceBundle.getObject("billPrint").toString();
			String billPrintsHeader = (String) resourceBundle.getObject("billPrintsHeader").toString();		
			
			String fontName = application.getRealPath("font-awesome/fonts/Shiv05.ttf");
			FontFactory.register(fontName);

			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			document.setMargins(20, 5, 20, 0);

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
			Font tabletext = new Font(Font.FontFamily.HELVETICA, 8,	Font.BOLD);
			Font tabletextDrug = new Font(Font.FontFamily.HELVETICA, 7,	Font.NORMAL);
			Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);

			session = request.getSession();
			String user_name = (String) session.getAttribute("userName");
			int userid = (Integer) session.getAttribute("userId");
			String path = hospObj.getFilePath();
			String hospitalName = hospObj.getHospitalName();
			hospitalName = hospitalName.toUpperCase();
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
			String spLeafName  ="";
		String languageOF=request.getParameter("instructionLanguage"); 
		System.err.println("languageOF======="+ languageOF);
		String call= request.getParameter("call"); 
			Image img = null;
			PdfPCell cell = null;
			try {
			//	img = Image.getInstance(path1);
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
						
						
			//int billId=Integer.parseInt(request.getParameter("billId"));
		    int patID=Integer.parseInt(request.getParameter("patID"));
			int treatId=Integer.parseInt(request.getParameter("treatID"));
			String patientID=(request.getParameter("patID"));
			Integer treatmentId=  Integer.parseInt(request.getParameter("treatID"));
			Integer unitId = (Integer) session.getAttribute("uId");			
			int emrId = 0;
			//String editorContent = request.getParameter("editorContent");
			
			String editorContent = "";
			String vaccinationFlagCheckboxPrint = "undefined";
			java.util.Calendar currentDate = Calendar.getInstance();
			SimpleDateFormat dateformatter = new SimpleDateFormat(
					"dd/MM/yyyy hh:mm:ss a");
			String curr_date = dateformatter.format(currentDate.getTime());
			//String dischargeType=request.getParameter("discharge_Type");
			//String dischargedate=request.getParameter("dischargedate");
						
			
			NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");
			//numberFormatTwoDecimal.format(Math.round(5.5));
			//System.err.println(lstPojo.size());
			
			//For No. of prints.
			int printId = 2;
			
				document.newPage();
				
				PdfPTable HeaderTable31 = new PdfPTable(1);
				int[] headerwidth31 = { 120 };
				HeaderTable31.setWidths(headerwidth31);
				HeaderTable31.setWidthPercentage(95f);
				HeaderTable31.getDefaultCell().setBorder(Rectangle.BOTTOM);
	
				PdfPTable HeaderTable4 = new PdfPTable(4);
				int[] headerwidth4 = {3, 30, 60, 30 };
				HeaderTable4.setWidths(headerwidth4);
				HeaderTable4.setWidthPercentage(95f);
				HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				// Table 1 : For hospital adress details start
				
							PdfPTable HeaderTable1 = new PdfPTable(3);
							int[] headerwidth1 = { 30, 70, 30 };
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
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
						//	if(call.equals("HF")){
							document.add(HeaderTable1);
							HeaderTable1.flushContent();
					//		}
							if (img == null) {
								
								HeaderTable1.addCell(new Phrase("", header));
							} else {
								
								HeaderTable1.addCell(cell);
							}		 
							
							Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
							Font bold = new Font(FontFamily.TIMES_ROMAN, 12, Font.BOLD);
							Phrase p = new Phrase();
							p.add(new Chunk(" "+hospitalName, bold));			
							p.add(new Chunk(" \n\n"+address, tabletext));			
							p.add(new Chunk(" "+city+" Pin- "+hospitalZip, tabletext));
							p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
							p.add(new Chunk(" \n "+webste+" email: "+email, tabletext));
							//p.add(new Chunk(" \nPAN No : "+panNo , tabletext));	
				/* 			p.add(new Chunk(" \nCIN: "+cinNo+", GST : "+gstNo , tabletext));	
							p.add(new Chunk(" \nSERVICE TAX NO: "+serviceTaxNo+", PAN No: "+panNo, tabletext));	 */
							p.add(new Chunk(" "+hospitalName, bold));			
							p.add(new Chunk(" \n\n"+address, tabletext));			
							p.add(new Chunk(" "+city+" Pin- "+hospitalZip, tabletext));
							p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
							p.add(new Chunk(" \n "+webste+" email: "+email, tabletext));
							PdfPCell hospitalNameCell = new PdfPCell(p);				
							hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
							hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
						//	HeaderTable1.addCell(hospitalNameCell);
							
						if(billPrint.contains("on")){
								
								if (img == null) {
									
									HeaderTable1.addCell(new Phrase("", header));
								} else {
									HeaderTable1.addCell(new Phrase("", header));
								//	HeaderTable1.addCell(cellNabh);
								}
							}else{
								
								HeaderTable1.addCell(new Phrase("", header));
							}	
							
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
						//	if(call.equals("HF")){
							document.add(HeaderTable1);
							HeaderTable1.flushContent();
						//	}
							HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
							HeaderTable1.addCell(new Phrase("", header));
						//	if(call.equals("HF")){
								document.add(HeaderTable1);
								HeaderTable1.flushContent();
					//		}
							
							
							// Table 1 : For hospital adress details end
	
				PdfPTable HeaderTable8 = new PdfPTable(2);
				int[] headerwidth8 = { 15, 110};
				HeaderTable8.setWidths(headerwidth8);
				HeaderTable8.setWidthPercentage(95f);
			//	HeaderTable8.setHorizontalAlignment(Element.ALIGN_RIGHT);
				
				PdfPCell nestedTable2 = new PdfPCell();
				nestedTable2.setBorder(Rectangle.NO_BORDER);
			    nestedTable2.addElement(new Phrase("  ", header));
				PdfPCell cell2 = new PdfPCell();
				cell2.setBorder(Rectangle.BOTTOM);
				HeaderTable8.addCell(nestedTable2);    
				//HeaderTable8.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable8.addCell(cell2);
			//	HeaderTable8.addCell(new Phrase("PRESCRIPTION DETAILS", header));			
					if(call.equals("HF")){	
				document.add(HeaderTable8);
				HeaderTable8.flushContent();		
					}
				
				//Start table for 
				//fetch patient record
				
				String docName="";
				String refDocName  ="";
				 RegistrationController uss=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
				RegTreBillDto rtd = new RegTreBillDto();			
				List<RegTreBillDto> ltPatientRecord = null;
				String PType = "";
				String addressPatient = "";
				
				String weight = "";
				String height = "";
				if(uss != null)
				{
					rtd=uss.fetchPatientsRecordByTreatmentId(treatId);
					rtd=rtd.getListRegTreBillDto().get(0);
					rtd.getPatientName();
					
					
					
					 int stateId = rtd.getStateId();
					 int townId   =rtd.getTownId();
					 int districtId =rtd.getDistrictId();
					 int talukaId   =rtd.getTalukaId();
					 int refDocId =rtd.getRefDocId();
					
					 
					 String BillCategoryName ="";
					 String state  ="";
					 String district  ="";
					 String cityObj  ="";
					 String taluka  ="";
					 
					LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
					AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
					List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
					
					
					RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
					List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
					ltRegMasterDto =us.fetchPatientsRecordByTreatmentId(treatId);
					
					 int sponsorSlave=ltRegMasterDto.get(0).getChargesMasterSlaveId();
						
					 if(sponsorSlave > 0){
							fetchsposor   = obj.fetchSuperCatofchargesSlave(sponsorSlave);
							BillCategoryName = fetchsposor.get(0).getCategoryName()+" Sponsor";
							spLeafName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id");
							//BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id"); 
						}else{
							BillCategoryName = "Self";
						}
					
					
					 weight  	=ltRegMasterDto.get(0).getWeight();
					 height  	=ltRegMasterDto.get(0).getHeight();
				
					String docId=ltRegMasterDto.get(0).getDoctorId();
					System.out.println("docId....."+docId);
					
					
					if(!docId.equals("") && !docId.contains(",")){
						
						int doctorId = Integer.parseInt(docId);
						if(doctorId > 0){
							docName   = fetchlist.getStringValOfObject("doctor","doc_name",doctorId,"Doctor_ID");
						}
					}else{
						docName   = "";
					}
					
					
			 
					if(stateId > 0 ){
						state   = fetchlist.getStringValOfObject("state","state_name",stateId,"idstate");
					}else{
						state   = "Maharashtra";
					}
					if(districtId > 0){
						district = fetchlist.getStringValOfObject("district","dis_name",districtId,"iddistrict"); 
					}else{
						district   = "Pune";
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
						addressPatient +=  (" "+taluka);
					}						
					if (district != "0" && !district.equals("undefined") && !district.equals("")) 
					{
						addressPatient += (" " + district);
					}
					if (state != "0" && !state.equals("undefined") && !state.equals("")) 
					{
						addressPatient += ("," + state);
					}
					if(refDocId > 0 ){
						refDocName   = fetchlist.getStringValOfObject("doctor","doc_name",refDocId,"Doctor_ID");
					}else{
						refDocName   = "";
					}
					
					
					int a=rtd.getSourceTypeId();
					if(a>0){
						PType="Sponsor";
		 			}else{
		 				PType="Self";					
					}	
				}

				
			
				
				//new table no 3 start
				PdfPTable HeaderTable3 = new PdfPTable(7);
				int[] headerwidth3 = {15,40,80,5,10,20,30};
				HeaderTable3.setWidths(headerwidth3);
				HeaderTable3.setWidthPercentage(95f);		
				
				HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				PdfPTable HeaderTable41 = new PdfPTable(3);
				int[] headerwidth41 = {15, 25,95};
				HeaderTable41.setWidths(headerwidth41);
				HeaderTable41.setWidthPercentage(95f);		
				
				HeaderTable41.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				PdfPTable HeaderTable42 = new PdfPTable(7);
				int[] headerwidth42= {15, 15,17,15,30,15,25};
				HeaderTable42.setWidths(headerwidth42);
				HeaderTable42.setWidthPercentage(95f);		
				
				HeaderTable42.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				/* HeaderTable3.addCell(new Phrase("Patient ID", subheader));
				HeaderTable3.addCell(new Phrase(": "+patientID, tabletext));
				HeaderTable3.addCell(new Phrase("Treatment ID", subheader));
				HeaderTable3.addCell(new Phrase(": "+treatId, tabletext));
				HeaderTable3.addCell(new Phrase("", tabletext)); */
				  SimpleDateFormat formatNowDay = new SimpleDateFormat("dd");
			    SimpleDateFormat formatNowMonth = new SimpleDateFormat("MM");
			    SimpleDateFormat formatNowYear = new SimpleDateFormat("YYYY");	
				if(call.equals("HF")){
					
					SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");  
				    String strDate= formatter.format(rtd.getCreatedDateTime());  	
					
				HeaderTable3.addCell(new Phrase("", tabletext));
				HeaderTable3.addCell(new Phrase("", subheader));
				HeaderTable3.addCell(new Phrase(""+ rtd.getPatientName(), tabletext));
				HeaderTable3.addCell(new Phrase("", tabletext));
				HeaderTable3.addCell(new Phrase("", tabletext));
		
				HeaderTable3.addCell(new Phrase("", subheader));
				HeaderTable3.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
				HeaderTable3.addCell(new Phrase(""+ strDate, tabletext));
		
				document.add(HeaderTable3);
				HeaderTable3.flushContent();
				}else{

				    String currentDay = formatNowDay.format(currentDate.getTime());
				    String currentMonth = formatNowMonth.format(currentDate.getTime());
				    String currentYear = formatNowYear.format(currentDate.getTime());
				    currentYear =currentYear.substring(2);
					/* HeaderTable3.addCell(new Phrase("", tabletext));
					HeaderTable3.addCell(new Phrase(" ", subheader));
					HeaderTable3.addCell(new Phrase(" ", tabletext));
					HeaderTable3.addCell(new Phrase("", tabletext));
					HeaderTable3.addCell(new Phrase("", tabletext));
					HeaderTable3.addCell(new Phrase(" ", subheader));
					HeaderTable3.addCell(new Phrase(" ", tabletext));
					 */
					/* HeaderTable3.addCell(new Phrase("", tabletext));
					HeaderTable3.addCell(new Phrase(" ", subheader));
					HeaderTable3.addCell(new Phrase(" ", tabletext));
					HeaderTable3.addCell(new Phrase("", tabletext));
					HeaderTable3.addCell(new Phrase("", tabletext));
					HeaderTable3.addCell(new Phrase(" ", subheader));
					HeaderTable3.addCell(new Phrase(" ", tabletext)); */
					
				/* 	HeaderTable3.addCell(new Phrase("", tabletext));
					HeaderTable3.addCell(new Phrase(" ", subheader));
					HeaderTable3.addCell(new Phrase(" ", tabletext));
					HeaderTable3.addCell(new Phrase("", tabletext));
					HeaderTable3.addCell(new Phrase("", tabletext));
					HeaderTable3.addCell(new Phrase(" ", subheader));
					HeaderTable3.addCell(new Phrase(" ", tabletext));*/
					
					
					HeaderTable3.addCell(new Phrase("", tabletext));
					HeaderTable3.addCell(new Phrase(" ", subheader));
					HeaderTable3.addCell(new Phrase(" ", tabletext));
					HeaderTable3.addCell(new Phrase("", tabletext));
					HeaderTable3.addCell(new Phrase("", tabletext));
					HeaderTable3.addCell(new Phrase(" ", subheader));
					HeaderTable3.addCell(new Phrase(" ", tabletext));
					
					HeaderTable3.addCell(new Phrase("", tabletext));
					HeaderTable3.addCell(new Phrase(" ", subheader));
						HeaderTable3.addCell(new Phrase(" ", subheader));
					///HeaderTable3.addCell(new Phrase("        "+ rtd.getPatientName(), subheader));
					HeaderTable3.addCell(new Phrase("", tabletext));
					HeaderTable3.addCell(new Phrase("", tabletext));
					HeaderTable3.addCell(new Phrase(" ", subheader));
				HeaderTable3.addCell(new Phrase(" ", subheader));	
				//	HeaderTable3.addCell(new Phrase("                                            "+ currentDay +"  /   "+ currentMonth +"   /  "+ currentYear , tabletext));
			
					document.add(HeaderTable3);
					HeaderTable3.flushContent();
				}
				if(call.equals("HF")){
				
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", tabletext));

					document.add(HeaderTable41);
					HeaderTable41.flushContent();
				
				HeaderTable41.addCell(new Phrase("", subheader));
				HeaderTable41.addCell(new Phrase("", subheader));
				HeaderTable41.addCell(new Phrase(""+ rtd.getAddress()+" "+ addressPatient, tabletext));

				document.add(HeaderTable41);
				HeaderTable41.flushContent();
				}else{
					
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase(" ", subheader));

					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));

					//HeaderTable41.addCell(new Phrase("      "+ rtd.getAddress()+" "+ addressPatient, subheader));

					document.add(HeaderTable41);
					HeaderTable41.flushContent();
				
				}
				if(call.equals("HF")){
				
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", tabletext));

					document.add(HeaderTable41);
					HeaderTable41.flushContent();
					
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", subheader));
					HeaderTable41.addCell(new Phrase("", tabletext));

					document.add(HeaderTable41);
					HeaderTable41.flushContent();
					
				HeaderTable42.addCell(new Phrase("", tabletext));
				HeaderTable42.addCell(new Phrase("", subheader));
				//HeaderTable42.addCell(new Phrase(""+ rtd.getAge(), tabletext));
				 if(rtd.gettFlag().equals("N") && rtd.getAge3() != null){
					HeaderTable42.addCell(new Phrase(""+ rtd.getAge3() +"" , tabletext));
				}else{
					HeaderTable42.addCell(new Phrase(""+ rtd.getAge() +"" , tabletext));
				} 
				HeaderTable42.addCell(new Phrase("", subheader));
				HeaderTable42.addCell(new Phrase(""+ rtd.getGender(), tabletext));
				HeaderTable42.addCell(new Phrase("", subheader));
				HeaderTable42.addCell(new Phrase(""+weight, tabletext));
	
				document.add(HeaderTable42);
				HeaderTable42.flushContent();
				}else{
					
				/* 	HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext)); */
					
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
				///	HeaderTable42.addCell(new Phrase(" "+ rtd.getAge() +"" , subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					///HeaderTable42.addCell(new Phrase(" "+ rtd.getGender(), subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
					HeaderTable42.addCell(new Phrase("", subheader));
				//	HeaderTable42.addCell(new Phrase("   "+weight, subheader));
		
					document.add(HeaderTable42);
					HeaderTable42.flushContent();
					
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					
					/* HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext));
					HeaderTable42.addCell(new Phrase("", tabletext)); */
					
					document.add(HeaderTable42);
					HeaderTable42.flushContent();
				}
				HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
				

					
				
				
		/* 		HeaderTable3.addCell(new Phrase("Height", subheader));
				HeaderTable3.addCell(new Phrase(": "+height, tabletext));
				HeaderTable3.addCell(new Phrase("Weight", subheader));
				HeaderTable3.addCell(new Phrase(": "+weight , tabletext));
				HeaderTable3.addCell(new Phrase("", tabletext));	
				
				HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTable3.addCell(new Phrase("Tel/Mob.No", subheader));
				HeaderTable3.addCell(new Phrase(": "+ rtd.getMobile(), tabletext));			
				HeaderTable3.addCell(new Phrase("IPD NO", subheader));
				HeaderTable3.addCell(new Phrase(": "+ rtd.getOpdipdno(), tabletext));
				HeaderTable3.addCell(new Phrase("", tabletext));	 */
				
				IpdBillService fetchServlist=(ApplicationContextUtils.getApplicationContext()).getBean(IpdBillService.class);	
				
				BillNobleService fetchSubServlist=(ApplicationContextUtils.getApplicationContext()).getBean(BillNobleService.class);	
				
				List<EhatViewPatientBedDetailsIpdDto> listBedIpdDto2=fetchServlist.getPatientBedBill(treatId,3);
				
				
			/* 	HeaderTable3.addCell(new Phrase("Ward",subheader));
				HeaderTable3.addCell(new Phrase(": "+listBedIpdDto2.get(0).getBedHall(),tabletext));
				HeaderTable3.addCell(new Phrase("Sponsor Name", subheader));
				HeaderTable3.addCell(new Phrase(": "+spLeafName, tabletext));
				HeaderTable3.addCell(new Phrase("", tabletext));	 */
				        
			
				
			
				Doctor doc2 = new Doctor();
				List<Doctor> listDoc2 = null;
	
				if(rtd.getDoctorId().contains(",")&& !rtd.getDoctorId().equalsIgnoreCase("")){
					
					
					String[] doctors = rtd.getDoctorId().split(",") ;
					String Doc_Nme = "";
					String Depart = "";
					for(String str :doctors )
					{
						String DocID = str;
						int docId =  Integer.parseInt(str);
				/* 		listDoc2 = admodel1.getDoctorsDepDetails(docId);
						 Doc_Nme = Doc_Nme + listDoc2.get(0).getDoc_name()+",";
						 Depart = Depart + listDoc2.get(0).getDepartmentName()+","; */
								
					}
			/* 		HeaderTable3.addCell(new Phrase("Consultant Doc.", subheader));
					HeaderTable3.addCell(new Phrase(": "+Doc_Nme, tabletext));			
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", tabletext));
					HeaderTable3.addCell(new Phrase("", tabletext));
					 */
				}
				else{/* 
					if(!rtd.getDoctorId().equalsIgnoreCase("")){
				int docId =  Integer.parseInt(rtd.getDoctorId());
				
				listDoc2 = admodel1.getDoctorsDepDetails(docId);
					
				HeaderTable3.addCell(new Phrase("Consultant Doc.", subheader));
				HeaderTable3.addCell(new Phrase(": "+listDoc2.get(0).getDoc_name(), tabletext));
					}else{
						HeaderTable3.addCell(new Phrase("Consultant Doc.", subheader));
						HeaderTable3.addCell(new Phrase(": -", tabletext));
						
					}
				HeaderTable3.addCell(new Phrase("Ref By", subheader));
		   HeaderTable3.addCell(new Phrase(": "+refDocName, tabletext)); 
				HeaderTable3.addCell(new Phrase(": "+rtd.getDocNameChan(), tabletext));
				HeaderTable3.addCell(new Phrase("", tabletext));
				
				 */}
				
				PdfPTable HeaderTable9 = new PdfPTable(2);
				int[] headerwidth9 = { 15, 110};
				HeaderTable9.setWidths(headerwidth9);
				HeaderTable9.setWidthPercentage(95f);
	        	PdfPCell nestedTable9 = new PdfPCell();
	        	nestedTable9.setBorder(Rectangle.NO_BORDER);
	        	nestedTable9.addElement(new Phrase("  ", header));
				PdfPCell cell9 = new PdfPCell();
				cell9.setBorder(Rectangle.NO_BORDER);
				HeaderTable9.addCell(nestedTable9);    
				//HeaderTable8.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable9.addCell(cell9);
			//	HeaderTable8.addCell(new Phrase("PRESCRIPTION DETAILS", header));			
						
				document.add(HeaderTable9);
				HeaderTable9.flushContent();		
				
				
				
				// START: prescription
				
						
				PdfPTable HeaderTableA = new PdfPTable(7);
				int[] headerwidthA= {15, 10, 44, 30, 10, 10, 40 };
				HeaderTableA.setWidths(headerwidthA);
				HeaderTableA.setWidthPercentage(95f);		
				HeaderTableA.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				PdfPTable HeaderTable6 = new PdfPTable(7);
				int[] headerwidth6 = {33,  15, 65, 10, 10, 10, 50 };
				HeaderTable6.setWidths(headerwidth6);
				HeaderTable6.setWidthPercentage(95f);
				HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTable6.addCell(new Phrase("", header));
				HeaderTable6.addCell(new Phrase("", header));
				HeaderTable6.addCell(new Phrase("", header));
				HeaderTable6.addCell(new Phrase("", header));
				HeaderTable6.addCell(new Phrase("", header));
				HeaderTable6.addCell(new Phrase("", header));
				HeaderTable6.addCell(new Phrase("", header));
	
				document.add(HeaderTable6);
				HeaderTable6.flushContent();
	
				Font tabletextU = null;
				try {
	
					String osName = System.getProperty("os.name");
	
					if (osName.equalsIgnoreCase("Linux")) {
						tabletextU = new Font(BaseFont.createFont(
								"/usr/share/fonts/ARIALUNI/ARIALUNI.TTF",
								BaseFont.IDENTITY_H, BaseFont.EMBEDDED), 10,
								Font.NORMAL);
					} else {
						tabletextU = new Font(BaseFont.createFont(
								"c:/windows/fonts/ARIALUNI.TTF",
								BaseFont.IDENTITY_H, BaseFont.EMBEDDED), 10,
								Font.NORMAL);
					}
	
				} catch (Exception e2) {
					tabletextU = new Font(Font.FontFamily.HELVETICA, 10,
							Font.NORMAL);
				}
				
				
			
				
	
			
				String Hindi="";
				String Marathi="";	
				String all="";
				
				PrescriptionService uss2  =(ApplicationContextUtils.getApplicationContext()).getBean(PrescriptionService.class);
				List<OPDPrescriptionDtoSP> listPrescriptionsSP = new ArrayList<>();	
				listPrescriptionsSP =  uss2.getAllPrescriptionsByTreatmentId(treatmentId, unitId);  // data by stored procedure
				
				
				
				if (listPrescriptionsSP.size() != 0) {
					HeaderTable6.addCell(new Phrase("", header));
					HeaderTable6.addCell(new Phrase("           ", subheader));
					HeaderTable6.addCell(new Phrase("      ", subheader));
				//	HeaderTable6.addCell(new Phrase("Advice", subheader));
				   HeaderTable6.addCell(new Phrase("", subheader));
				/* 	HeaderTable6.addCell(new Phrase("Frequency", subheader));
					HeaderTable6.addCell(new Phrase("Duration", subheader)); */
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("Qty.", subheader));
	
					document.add(HeaderTable6);
					HeaderTable6.flushContent();
				
					
					HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable6.addCell(new Phrase("", header));
					HeaderTable6.addCell(new Phrase("", header));
					HeaderTable6.addCell(new Phrase("", header));
					HeaderTable6.addCell(new Phrase("", header));
					HeaderTable6.addCell(new Phrase("", header));
					HeaderTable6.addCell(new Phrase("", header));
					HeaderTable6.addCell(new Phrase("", header));
					
	
					document.add(HeaderTable6);
					HeaderTable6.flushContent();
					
					int k=0;
					String daypr[];
			
		 			for(int i=0;i<listPrescriptionsSP.size();i++){
				
				//	for(int j=0;j < order_masterli.get(i).getOrder_comp_drugesList().size();j++){
						
						int Morning = 0;
						int Afternoon = 0;
						int Evening = 0;
						int Night = 0;
						String prep="";
						String insrtn="";
						 k++;
						 String instructions=listPrescriptionsSP.get(i).getInstructionName();
							String instArray[]=instructions.split("/");
							System.err.println("instructions........."+instructions);
							
							String englishInstr=instArray[0];
							String hindiInstr=instArray[1];
							String marathiInstr=instArray[2];
							System.err.println("languageOF........."+languageOF);
							
							String daypriction=listPrescriptionsSP.get(i).getDayPrescription();
							System.err.println("dayyyyyyyyyyy" + daypriction);
							if(daypriction==null){
								
								daypriction="0,0,0,0";
							}
							
							 daypr=daypriction.split(",");
						if(!daypr[0].equals("0"))
						{
							Morning = 1;
						}else{
							Morning = 0;
						}
						if(!daypr[1].equals("0"))
						{
							Afternoon = 1;
						}else{
							Afternoon = 0;
						}
						if(!daypr[2].equals("0"))
						{
							Evening = 1;
						}else{
							Evening = 0;
						}
						if(!daypr[3].equals("0"))
						{
							Night = 1;
						}else{
							Night = 0;
						}
						//daypr=null;
						
						
						/* HeaderTable6.addCell(new Phrase(""+j+1, tabletext));
						HeaderTable6.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getDruges_doses(), tabletext));
						HeaderTable6.addCell(new Phrase(""+Morning+"-"+Afternoon+"-"+Evening+"-"+Night, tabletext));
						HeaderTable6.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getFrequency()+" Times a Day", tabletext));
						HeaderTable6.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getDays()+" Days", tabletext));
						HeaderTable6.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getQuantity(), tabletext)); */
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("          "+ k, tabletext));
/* 						HeaderTable6.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getDruges_doses(), tabletext));
						HeaderTable6.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getInstruction(), tabletext));
						HeaderTable6.addCell(new Phrase(""+Morning+" - "+Afternoon+" - "+Evening+" - "+Night, tabletext));
						HeaderTable6.addCell(new Phrase(""+order_masterli.get(i).getOrder_comp_drugesList().get(j).getDays()+" Days", tabletext)); */
						Phrase p1 = new Phrase();
						p1.add(new Chunk(" "+listPrescriptionsSP.get(i).getPrepName() + "."+listPrescriptionsSP.get(i).getMedicineName(), tabletext));			
						p1.add(new Chunk(" \n\n ("+listPrescriptionsSP.get(i).getDrugName()+")", tabletextDrug));	
						PdfPCell drugCell = new PdfPCell(p1);	
						drugCell.setBorder(Rectangle.NO_BORDER);
						if(listPrescriptionsSP.get(i).getNutracalProductFlag() ==0){
						HeaderTable6.addCell(drugCell);
						}else {
							HeaderTable6.addCell(new Phrase(""+listPrescriptionsSP.get(i).getPrepName() + "."+listPrescriptionsSP.get(i).getMedicineName(), tabletext));
						}
						HeaderTable6.addCell(new Phrase("", tabletext));
						HeaderTable6.addCell(new Phrase("", tabletext));
						HeaderTable6.addCell(new Phrase("", tabletext)); 
						HeaderTable6.addCell(new Phrase(""+listPrescriptionsSP.get(i).getQty(), tabletext));
						
					 
						
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", subheader));
				        HeaderTable6.addCell(new Phrase("", subheader));
						HeaderTable6.addCell(new Phrase("", subheader));
						HeaderTable6.addCell(new Phrase("", subheader));
						HeaderTable6.addCell(new Phrase("", subheader));
						HeaderTable6.addCell(new Phrase("", subheader));
						String inst= listPrescriptionsSP.get(i).getInstructionName();
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", subheader));
						HeaderTable6.addCell(new Phrase("" + daypr[0] +"  ------- " +"    "+ daypr[1]+ "    " +"  ------- "+"    "+ daypr[2]+ "    " +"  ------- "+"    "+ daypr[3]  , subheader));
						HeaderTable6.addCell(new Phrase("", subheader));
						HeaderTable6.addCell(new Phrase("", subheader));
						HeaderTable6.addCell(new Phrase("", subheader));
					
						if(languageOF.equalsIgnoreCase("MARATHI")){
							  if(!Marathi.equals("null")){
									
								  HeaderTable6.addCell(new Phrase(""+  Marathi,FontFactory.getFont("Shivaji05", 10)));

									}else{
										
									}
						}else{
							HeaderTable6.addCell(new Phrase("" + insrtn,tabletext));
							
						}
						
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", subheader));
				/* 		
						String moringen ="Morning";
						
						String Afternoonen ="Afternoon";
						
						String Eveningen ="Evening";
						
						String Nighten ="Nighten"; */
						if(languageOF.equalsIgnoreCase("MARATHI")){
							
							String moringen ="    ";
							
							String Afternoonen ="    ";
							
							String Eveningen ="    ";
							
							String Nighten ="  ";
							if(Morning==1){
								moringen="sakaLI";
							}
							if(Afternoon==1){
								Afternoonen="duparI";
							}
							if(Evening==1){
								Eveningen="saMQyaakaLI";
							}
							if(Night==1){
								Nighten="ra~I";
							}
						
									
								  HeaderTable6.addCell(new Phrase("" + moringen +"   " + Afternoonen +"          "+ Eveningen +"        "+Nighten   ,FontFactory.getFont("Shivaji05", 8)));

									
						}else{
							
							
	                      String moringen =     "              ";
							
							String Afternoonen ="              ";
							
							String Eveningen =  "              ";
							
							String Nighten =    "              ";
							if(Morning==1){
								moringen="Morning";
							}
							if(Afternoon==1){
								Afternoonen="Afternoon";
							}
							if(Evening==1){
								Eveningen="Evening";
							}
							if(Night==1){
								Nighten="       Night";
							}
							  PdfPCell cell1 = new PdfPCell();
						      cell1.setBorder(Rectangle.NO_BORDER);
						      PdfPTable nestedTable1 = new PdfPTable(4);
						      int[] hW = {20,20,20,20}; 
						      nestedTable1.setWidths(hW);
						      nestedTable1.setWidthPercentage(95f);
						     nestedTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						      nestedTable1.addCell(new Paragraph(""+ moringen ,tabletext ));
						      nestedTable1.addCell(new Paragraph(""+ Afternoonen,tabletext));
						      nestedTable1.addCell(new Paragraph(""+ Eveningen ,tabletext));
                              nestedTable1.addCell(new Paragraph(""+ Nighten ,tabletext));
                              cell1.addElement(nestedTable1);
							  HeaderTable6.addCell(cell1);
							
						}
						HeaderTable6.addCell(new Phrase("", subheader));
						HeaderTable6.addCell(new Phrase("", subheader));
						HeaderTable6.addCell(new Phrase("", subheader));
						HeaderTable6.addCell(new Phrase("", subheader));
						
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						HeaderTable6.addCell(new Phrase("", header));
						
					//	}
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
					HeaderTable6.addCell(new Phrase("", header));
					HeaderTable6.addCell(new Phrase("", header));
					HeaderTable6.addCell(new Phrase("", header));
	
					document.add(HeaderTable6);
					HeaderTable6.flushContent();
	
				}
				// END: prescription	
	
				
				//======== For follow up on next start ============//
				PdfPTable HeaderTable7 = new PdfPTable(4);
				int[] headerwidth7 = { 3, 25, 25,80 };
				HeaderTable7.setWidths(headerwidth7);
				HeaderTable7.setWidthPercentage(95f);
				HeaderTable7.setSpacingBefore(10f);
				HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
			
				HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));

				PrescriptionService objp  =(ApplicationContextUtils.getApplicationContext()).getBean(PrescriptionService.class);
				OPDPrescriptionFolloUpDto OpdPrescription = new OPDPrescriptionFolloUpDto();	
				OpdPrescription =  objp.getfollowUpForOPDPatient( unitId ,treatmentId);  // data by stored procedure

			//	System.err.print("Start follow up");

			
				if (OpdPrescription != null) {
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));

					document.add(HeaderTable7);
					HeaderTable7.flushContent();

					
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("Next follow up on: ",
							subheader));
					HeaderTable7.addCell(new Phrase(""
							+OpdPrescription.getDate(), tabletext));

				} else {
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
					HeaderTable7.addCell(new Phrase("", subheader));
				}

				//HeaderTable7.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header));
				HeaderTable7.addCell(new Phrase("", header)); 

				document.add(HeaderTable7);
				HeaderTable7.flushContent();
				//======== For follow up on next end ============//
				
						String actualpath="";
					
					
			/* 	AdminModel admodel = new AdminModel();
					Doctor doc1 = new Doctor();
					List<Doctor> listDoc = null;
					listDoc = admodel.getDoctorsDetails(userid);
				String signature = listDoc.get(0).getDocsign(); 
					
	            Image imgsign = null;
	            PdfPCell cellsign = null;
	            String actual = FilePath.getUPLOADDOC();
	            actualpath = actual + signature;
	            if(!signature.equals("-"))
	            {
	            try {
	                //String pathsign = application.getRealPath(actualpath);
	                imgsign = Image.getInstance(actualpath);
	                imgsign.scaleAbsolute(100, 50);
	                cellsign = new PdfPCell();
	                cellsign.addElement(new Chunk(imgsign, 5, -5));
	                cellsign.setBorder(Rectangle.NO_BORDER);
	            		} catch (Exception e) {
	                e.printStackTrace();
	            	}
	            }
	            */
					
				
				//footer start			
				HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", tabletext));
	
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", tabletext));
				
				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				/*  if (imgsign == null) {
					HeaderTable4.addCell(new Phrase("", header));
		            } else {
		            	HeaderTable4.addCell(cellsign);
		            }  */
				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				
				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("                           ",tabletext));
				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("              ",
						tabletext));
				
				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				document.add(HeaderTable4);
				HeaderTable4.flushContent();
				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("" + user_name, subheader));
	
				document.add(HeaderTable4);
				HeaderTable4.flushContent();
				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", tabletext));
	
				document.add(HeaderTable4);
				HeaderTable4.flushContent();
				if(call.equals("HF")){
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