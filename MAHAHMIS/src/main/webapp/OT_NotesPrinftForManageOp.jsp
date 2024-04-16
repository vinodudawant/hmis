<%@page import="com.hms.ot.dto.OTNotesFetchOperationDto"%>
<%@page import="com.hms.ehat.dto.EhatOTOperationNotes"%>
<%@page import="com.hms.ot.service.OperationThService"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.opdbill.dto.PatientHeaderInfoDto"%>
<%@page import="com.hms.ipd.service.BedMgtService"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.dto.DoctorRoundReport"%>
<%@page import="com.itextpdf.text.html.simpleparser.StyleSheet"%>
<%@page import="com.itextpdf.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.hms.dto.TestDashboard"%>
<%@page import="com.hms.model.PatientModel"%>
<%@page import="com.hms.model.PathologyModel"%>
<%@page import="com.hms.dto.Order_comp_druges"%>
<%@page import="com.hms.dto.Order_master"%>
<%@page import="com.hms.dto.TreatmentOperations"%>
<%@page import="com.hms.dto.Treatment"%>
<%@ page import="java.util.Calendar"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.dto.Assessment"%>
<%@page import="com.hms.model.TreatmentModel"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.itextpdf.text.Font"%>
<%@page import="com.hms.dto.DischargeSummery"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.model.IPDTreatmentModel"%>
<%@ page import="com.hms.dto.Patient"%>
<%@ page import="com.hms.dto.PaediatricDeptNICU"%>
<%@ page import="com.hms.dto.PaediatricDept"%>
<%@page import="com.hms.dto.Hall"%>
<%@page import="org.krysalis.barcode4j.BarcodeUtil"%>
<%@ page import="com.hms.dto.IPDHistoryMaster"%>
<%@page import="com.hms.operation.util.OTOperationNotes"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.ehat.dto.DoctorDto"%>
<%@page import="com.hms.ehat.controller.MarkVisitController"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientSubServiceDetailsIpdDto"%>
<%@page import="com.hms.ipdbill.service.IpdBillService"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto"%>
<%@page import="java.util.ArrayList"%>

<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>OT_NotesPrint.jsp</title>
</head>
<body>
	<%
		try {
			response.setContentType("application/pdf");
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			//for centerpatientId
			 String patientId= resourceBundle.getObject("patientIdLabel").toString();
			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			String headerValue = request.getParameter("header");
			if(headerValue.equals("withoutHdr")){
				document.setMargins(20, 20, 100, 0);//Change for top margin By Amol Saware
			}else{
				document.setMargins(20, 20, 30, 0);
			}

			//PdfWriter.getInstance(document, outStream);
			PdfWriter writer = PdfWriter.getInstance(document, outStream);
			document.open();

			/* -------------------- Define Fonts ---------------------------  */
			Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font subheader = new Font(Font.FontFamily.HELVETICA, 8,Font.BOLD);
			Font subheader1 = new Font(Font.FontFamily.HELVETICA, 8,Font.BOLD | Font.UNDERLINE);
			Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
			header.setColor(10, 4, 2);

			Font tableheader = new Font(Font.FontFamily.HELVETICA, 10,Font.BOLD);
			Font tabletext = new Font(Font.FontFamily.HELVETICA, 8,Font.NORMAL);
			Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);

			Font header1 = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
			Font header2 = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD);
			Font subheader2 = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
			Font tabletext2 = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
			Font subheader3 = new Font(Font.FontFamily.HELVETICA, 8,Font.BOLD |Font.UNDERLINE);
			/* -------------------- Define Fonts ---------------------------  */
			
			//get hospital info.
			session = request.getSession();
			String user_name = (String) session.getAttribute("userName");
			int unitId       = (Integer)session.getAttribute("uId");
			
			// todays date code
		    java.util.Calendar currentDate = java.util.Calendar.getInstance();
			
		    String treatment_Id = request.getParameter("trId");
		    int treatmentId = Integer.parseInt(request.getParameter("trId"));
			String patientID = request.getParameter("patID");
			String currentOtNote = request.getParameter("currentOtNote");
			int TreatmentID = Integer.parseInt(treatment_Id);
			
		    SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy");
		    String curr_date = dateformatter.format(currentDate.getTime());
			
		
			SimpleDateFormat formatter = new SimpleDateFormat("hh:mm:ss a");
			Calendar calendar = Calendar.getInstance();
		
			int ProductId = 0;
			//int count = 1;
			PdfPCell cell = null;
			document.newPage();
			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 40, 100, 30 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			
			/**************************************************************************/
			/**************************************************************************/
			
			//calling service leyer method to get patient records
			BedMgtService us = (ApplicationContextUtils.getApplicationContext()).getBean(BedMgtService.class);
			List<PatientHeaderInfoDto> ltRegMasterDto = new ArrayList<PatientHeaderInfoDto>();
			ltRegMasterDto = us.getIpdPatientHeaderInfo(treatmentId, unitId).getListRegTreBillDto();
			
			Integer billId =ltRegMasterDto.get(0).getBillId();
			Integer PatientID=ltRegMasterDto.get(0).getPatientId();
			Integer departmentId=ltRegMasterDto.get(0).getDepartmentId();
			String pname  =ltRegMasterDto.get(0).getPatientName();
			String MRNo   =ltRegMasterDto.get(0).getMrnno();
			String age	  =ltRegMasterDto.get(0).getAge();
			String gender =ltRegMasterDto.get(0).getGender();
			String AgeSexWt=age+" /"+gender;
			String treatmentCount =ltRegMasterDto.get(0).getTrcount();
			String ContactNo =ltRegMasterDto.get(0).getMobile();
			int Departmentid =ltRegMasterDto.get(0).getDepartmentId();
			String TokenNo   =ltRegMasterDto.get(0).getTokenno();
			Date appDate   =ltRegMasterDto.get(0).getCreatedDateTime();
			String opdipdno =ltRegMasterDto.get(0).getOpdipdno();
			double weight  	=ltRegMasterDto.get(0).getWeight();
			double height  	=ltRegMasterDto.get(0).getHeight();
			String wetHeg   =weight+" /"+height;
			String Age = ltRegMasterDto.get(0).getAge();
			String Gender = ltRegMasterDto.get(0).getGender();
			String allInfo = Age+"/"+Gender+"/"+weight;
			String MrNo = ltRegMasterDto.get(0).getMrnno();
			String contactNo = ltRegMasterDto.get(0).getMobile();
			String docId=ltRegMasterDto.get(0).getDoctorId();
			String docName="";		
			int refDocId =ltRegMasterDto.get(0).getRefDocId();

			int count=0;
			
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
			 String disDate ="";
			 String disTime ="";
			 
			 String perPatientAdd ="";
			 String patientAdd ="";
			 String relativeName ="";
			 int relationId=0;
			 String relation="";
			 relationId= ltRegMasterDto.get(0).getRelationId();
			 patientAdd = ltRegMasterDto.get(0).getAddress();
			 perPatientAdd = ltRegMasterDto.get(0).getPerAddress();
			 relativeName = ltRegMasterDto.get(0).getRelativeName();

				// patient address
				String addressPatient = "";
				
				LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
				AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
				List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
				
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
					taluka   = " ";
				}	
				
				if(!cityObj.equals("0") && !cityObj.equals("undefined") && !cityObj.equals("")){
					addressPatient += cityObj;
				}
				
				if (!taluka.equals("0") && !taluka.equals("undefined") && !taluka.equals("")) 
				{
					addressPatient +=  (" "+taluka);
				}						
				if (!district.equals("0") && !district.equals("undefined") && !district.equals("")) 
				{
					addressPatient += (" "+district);
				}
				if (!state.equals("0") && !state.equals("undefined") && !state.equals("")) 
				{
					addressPatient += (","+state);
				}
				// end : patient address
				
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
			 
			 String perstate  ="";
			 String perdistrict  ="";
			 String percityObj  ="";
			 String pertaluka  ="";
			 
			String spLeafName="";
			String refDocName  ="";

			
			/* if(sponsorSlave > 0){
				
				fetchsposor   = obj.fetchSuperCatofchargesSlave(sponsorSlave);
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
			
			spLeafName = ltRegMasterDto.get(0).getCategoryName();
			BillCategoryName = ltRegMasterDto.get(0).getCategoryName();
			refDocName = ltRegMasterDto.get(0).getRefDocName();
			
			/* if(refDocId > 0 ){
				//refDocName   = fetchlist.getStringValOfObject("doctor","doc_name",refDocId,"Doctor_ID");
				refDocName   = fetchlist.getStringValOfObject("chanelling_doctor","docName",refDocId,"channDocId");
			}else{
				refDocName   = "";
			}
			System.err.println("refDocName>>"+refDocName); */
			
			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	        SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm a");
	       	Date now = new Date(new java.util.Date().getTime());
	       	String strDate = sdf.format(now);
			String rtime   = sdf2.format(now);
			
			/* RegistrationController regCon=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
	        RegTreBillDto rtd = new RegTreBillDto();            
	        List<RegTreBillDto> ltPatientRecord = null; */
	        
	        String PType = "";
	        Date admDateTime=new Date();
	        admDateTime = ltRegMasterDto.get(0).getCreatedDateTime();
	        int a = ltRegMasterDto.get(0).getSourceTypeId();
            if(a>0){
                PType="Sponsor";
            }else{
                PType="Self";                 
            } 
	        /* if(regCon != null){
	           
	        	rtd=regCon.fetchPatientsRecordByTreatmentId(treatmentId);
	            rtd=rtd.getListRegTreBillDto().get(0);
	            rtd.getPatientName();
	            
	            admDateTime = rtd.getCreatedDateTime();
	            
	            int a=rtd.getSourceTypeId();
	            if(a>0){
	                PType="Sponsor";
	            }else{
	                PType="Self";                 
	            }   
	        } */	
			Date adm = new Date(ltRegMasterDto.get(0).getCreatedDateTime().getTime());
	       	String admDate = sdf.format(adm);
			String admTime   = sdf2.format(adm);			
			String drIds = ltRegMasterDto.get(0).getDoctorId();
			String drId="";
			String docNames = ltRegMasterDto.get(0).getConsultingDocName();
			
			/* if(!drIds.equals("") && drIds!=null){
				
				if(drIds.contains(",")){
					
					String[] dId=drIds.split(",");
					if(dId.length > 0){
						
						for(int n=0; n < dId.length; n++){
							
							docNames=docNames + fetchlist.getStringValOfObject("doctor","doc_name",Integer.parseInt(dId[n]),"Doctor_ID")+", ";
						}		
					}
					
					docNames=docNames.substring(0, docNames.length()-2);
					
				}else{
					
					drId=drIds;
					docNames=docNames + fetchlist.getStringValOfObject("doctor","doc_name",Integer.parseInt(drId),"Doctor_ID");
				}
				
			} */
			
			/**********************************enddddddddddddd****************************************/
			/**************************************************************************/
			
			if(!headerValue.equals("withoutHdr")){
			
				HttpSession session2 = request.getSession();
				int hospitalUnitId= (Integer) session2.getAttribute("uId");
				HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
				//List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			    List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
				HospitalDetails hospObj = arrHospitalDetails.get(0);
				
				String path = hospObj.getFilePath();
				String hospitalName = hospObj.getHospitalName();
				//hospitalName = hospitalName.toUpperCase();			
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
				String gstNo =  hospObj.getTxtGstNo();
				String serviceTaxNo	  =   hospObj.getTxtSerTaxNo();
				String panNo	  =   hospObj.getPanNo();
				String hPhoneNo   = PhoneNo+"/"+secPhoneNo;
				String nabh = hospObj.getNabhImagePath(); 
				String nabhLogo = application.getRealPath(nabh);
				
				Image img = null;
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
		
			if (img == null) {
				HeaderTable1.addCell(new Phrase("", header));
			} else {
				HeaderTable1.addCell(cell);
			}

			Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
			Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD);
			Phrase p = new Phrase();
			p.add(new Chunk(" "+hospitalName, bold));			
			p.add(new Chunk(" \n\n"+address, tabletext));			
			p.add(new Chunk(" "+city+" Pin- "+hospitalZip, tabletext));
			p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
			p.add(new Chunk(" \n "+webste+" email: "+email, tabletext));
			//p.add(new Chunk(" \nPAN No : "+panNo , tabletext));	
		/* 	p.add(new Chunk(" \nCIN: "+cinNo+", GST : "+gstNo , tabletext));	
			p.add(new Chunk(" \nSERVICE TAX NO : "+serviceTaxNo+", PAN No: "+panNo, tabletext));	 */
			
			PdfPCell hospitalNameCell = new PdfPCell(p);				
			hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
			HeaderTable1.addCell(hospitalNameCell);
			
			//BarCode 
			PdfContentByte cb = writer.getDirectContent();
			 Barcode128 barcode39 = new Barcode128();
	         barcode39.setCode(patientID);
	         Image code39Image = barcode39.createImageWithBarcode(cb, null, null);
	         code39Image.setAbsolutePosition(400,630);
	         code39Image.scalePercent(125);
	         HeaderTable1.addCell(code39Image);
			}

			// spacing
			HeaderTable1.addCell(new Phrase(" ", header));
			HeaderTable1.addCell(new Phrase(" ", header));
			HeaderTable1.addCell(new Phrase(" ", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();

			HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			PdfPTable HeaderTable2 = new PdfPTable(4);
			int[] headerwidth2 = { 40,40, 10,10};
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
			
			HeaderTable2.addCell(new Phrase("", header1));
			HeaderTable2.addCell(new Phrase("OT Notes", header1));
         	HeaderTable2.addCell(new Phrase("Date", subheader1));
			HeaderTable2.addCell(new Phrase(curr_date, subheader1));
			
			document.add(HeaderTable2);
			HeaderTable2.flushContent();
			
			// Start: part-1
			PdfPTable patientDemoDetailName = new PdfPTable(4);
			int[] patientDemoDetailNameWidth = { 30, 50, 30, 50 };
			patientDemoDetailName.setWidths(patientDemoDetailNameWidth);
			patientDemoDetailName.setWidthPercentage(95f);
			patientDemoDetailName.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			patientDemoDetailName.addCell(new Phrase(" ", subheader));
			patientDemoDetailName.addCell(new Phrase(" ", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			 
			patientDemoDetailName.addCell(new Phrase("UHID / IPD No ", subheader));
			patientDemoDetailName.addCell(new Phrase(": "+ltRegMasterDto.get(0).getCenterPatientId()+ " / "+opdipdno ,tabletext));
			patientDemoDetailName.addCell(new Phrase("Patient Name ",subheader));
			patientDemoDetailName.addCell(new Phrase(": "+pname,	tabletext));
			patientDemoDetailName.addCell(new Phrase("Admission Date & Time ", subheader));
		    patientDemoDetailName.addCell(new Phrase(": "+admDate+" "+admTime, tabletext));
		    patientDemoDetailName.addCell(new Phrase("Age/Gender/Wt ", subheader));
		    patientDemoDetailName.addCell(new Phrase(": "+allInfo+" Kg", tabletext));	
			patientDemoDetailName.addCell(new Phrase("Address ", subheader));
			patientDemoDetailName.addCell(new Phrase(": "+patientAdd+" "+ addressPatient, tabletext));
			patientDemoDetailName.addCell(new Phrase("Height ",subheader)); 
			patientDemoDetailName.addCell(new Phrase(": "+height,tabletext));
			
			if(spLeafName==null || spLeafName=="" || spLeafName.equalsIgnoreCase("")){
				
				patientDemoDetailName.addCell(new Phrase("Sponsor",	subheader));		
				patientDemoDetailName.addCell(new Phrase(": ", tabletext));
			}else{
				patientDemoDetailName.addCell(new Phrase("Sponsor",	subheader));		
				patientDemoDetailName.addCell(new Phrase(": "+spLeafName, tabletext));
			}
			
			//added by jitendra (29 march 2019) to get latest hall 
			//For Get Hall Name
			/* RegService regSer=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
			List<Hall> hallName = new ArrayList<Hall>();
			hallName = regSer.fetchPatientsBedRecords(Integer.parseInt(treatment_Id));
			
			int bedid=0;
			if(listBedIpdDto2.get(0).getSubServiceId()==null){
				 bedid=0;
			}else{
				bedid=listBedIpdDto2.get(0).getSubServiceId();	
			} */
			
            patientDemoDetailName.addCell(new Phrase("Consultant Doc ",subheader));
			patientDemoDetailName.addCell(new Phrase(": "+docNames, tabletext));
			patientDemoDetailName.addCell(new Phrase("Ward Name ",subheader));
			patientDemoDetailName.addCell(new Phrase(": "+ltRegMasterDto.get(0).getHallName(),tabletext)); //listBedIpdDto2.get(0).gethName()
			/* if(listBedIpdDto2.get(0).getBedId()==null){
				patientDemoDetailName.addCell(new Phrase("Bed no ",subheader));
				patientDemoDetailName.addCell(new Phrase(":- ",tabletext));
			}else{
		    patientDemoDetailName.addCell(new Phrase("Bed no ",subheader));
			patientDemoDetailName.addCell(new Phrase(": "+listBedIpdDto2.get(0).getBedId(),tabletext));
			} */
			/* patientDemoDetailName.addCell(new Phrase("Bed no ",subheader));
			patientDemoDetailName.addCell(new Phrase(": "+bedid,tabletext)); */
		   patientDemoDetailName.addCell(new Phrase("Contact No",subheader));
		   patientDemoDetailName.addCell(new Phrase(" : "+contactNo,tabletext));
		   patientDemoDetailName.addCell(new Phrase("TreatmentId ",subheader));
	       patientDemoDetailName.addCell(new Phrase(": "+treatment_Id,tabletext));
			
			/* patientDemoDetailName.addCell(new Phrase("Corporate ",subheader));
			patientDemoDetailName.addCell(new Phrase(": -",tabletext));//pending */
			
			patientDemoDetailName.addCell(new Phrase("Ref. By ",subheader));
			patientDemoDetailName.addCell(new Phrase(": "+refDocName,tabletext));//Pending

			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader)); 

			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));

			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));
			patientDemoDetailName.addCell(new Phrase("", subheader));

			document.add(patientDemoDetailName);
			patientDemoDetailName.flushContent();
			// End: part-1
			
			PdfPTable HeaderTable12 = new PdfPTable(5);
			int[] headerwidth12 = { 20, 20, 50, 20, 20 };
			HeaderTable12.setWidths(headerwidth12);
			HeaderTable12.setWidthPercentage(95f);
			HeaderTable12.getDefaultCell().setBorder(Rectangle.BOTTOM);
			
			HeaderTable12.addCell(new Phrase(" ", header1));
			HeaderTable12.addCell(new Phrase(" ", header1));
			HeaderTable12.addCell(new Phrase(" ", header1));
			HeaderTable12.addCell(new Phrase(" ", header1));
			HeaderTable12.addCell(new Phrase(" ", header1));
			document.add(HeaderTable12);
			HeaderTable12.flushContent();
			
		    //Code For OT Notes 
		    String tomIdS = request.getParameter("tomId");
			int tomId = Integer.parseInt(tomIdS);
           
			OperationThService objadmin = (ApplicationContextUtils.getApplicationContext()).getBean(OperationThService.class);
			OTNotesFetchOperationDto listInfo = null;
			
			 listInfo = new OTNotesFetchOperationDto();
			listInfo = objadmin.getOtNotesDataByOtId(Integer.parseInt(currentOtNote),"");
			
			PdfPTable paraTable = new PdfPTable(1);
			int[] paraWidth = { 50 };
			paraTable.setWidths(paraWidth);
			paraTable.setWidthPercentage(95f);
			paraTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			PdfPTable subHeaderTable = new PdfPTable(1);
			int[] AdmissionNoteHeaderWidth = { 50 };
			subHeaderTable.setWidths(AdmissionNoteHeaderWidth);
			subHeaderTable.setWidthPercentage(95f);
			subHeaderTable.getDefaultCell().setBorder(Rectangle.BOTTOM);
		 	
			if (listInfo != null) {
				OTNotesFetchOperationDto otoperationNotes = (OTNotesFetchOperationDto) listInfo.getListOTNotes().get(0);
				subHeaderTable.addCell(new Phrase("Operation Notes",subheader));
				document.add(subHeaderTable);
				subHeaderTable.flushContent();

				HTMLWorker htmlWorker = new HTMLWorker(document);
				Paragraph paragraph = new Paragraph();
				StyleSheet styleSheet = new StyleSheet();
				styleSheet.loadTagStyle("body", "size", "9pt");
				styleSheet.loadTagStyle("p", "size", "8pt");
				java.util.List<Element> ie = 
						HTMLWorker.parseToList(new StringReader("              "+ otoperationNotes.getChkData()),styleSheet);
				for (Element element : ie) {
					//paragraph.add(element);
					if (element instanceof PdfPTable){
						
						PdfPTable htmlTable = new PdfPTable(1);
						int[] htmlTableWidth = {50};
						htmlTable.setWidths(htmlTableWidth);
						htmlTable.setWidthPercentage(50f);
						htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						htmlTable = (PdfPTable)element;
						
						paraTable.addCell(htmlTable);
						document.add(paraTable);
						paraTable.flushContent();
	                }else{
						paragraph.add(element); 
						cell = new PdfPCell(paragraph);
						cell.setBorder(Rectangle.NO_BORDER);
						paraTable.addCell(cell);
						document.add(paraTable);
						paraTable.flushContent();
						paragraph.clear();
	                }
				}
				cell = new PdfPCell(paragraph);
				cell.setBorder(Rectangle.NO_BORDER);
				paraTable.addCell(cell);

				document.add(paraTable);
				paraTable.flushContent();
			}	 
				
	       //End Code For OT Notes
			// finally
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