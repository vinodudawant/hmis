<%@page import="java.util.Date"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.itextpdf.text.html.simpleparser.StyleSheet"%>
<%@page import="com.hms.dto.IpdConsentForm"%>
<%@page import="com.hms.model.PatientModel"%>
<%@page import="com.hms.pharmacy.upload.FilePath"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.dto.Hall"%>
<%@page import="com.hms.canteen.dto.DietMaster"%>
<%@page import="com.hms.ivf.controller.IvfDoctorRoundController"%>
<%@page import="com.hms.ivf.dto.IvfPrescriptionDto"%>
<%@page import="com.hms.model.AdminModel"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto"%>
<%@page import="com.itextpdf.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>
<%@page import="com.hms.ipdbill.service.IpdBillService"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.hms.canteen.controller.CanteenController"%>
<%@page import="com.hms.canteen.service.CanteenService"%>
<%@page import="java.util.Calendar"%>
<%@page import="com.hms.dto.HospitalDetails"%>
<%@page import="com.hms.ivf.controller.IVFDoctorDeskController"%>
<%@page import="com.hms.ivf.dto.IVFRegPatientDTO"%>
<%@page import="com.hms.ivf.dto.IVFDietDTO"%>
<%@page import="com.hms.ivf.service.IVFDoctorDeskService"%>

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
<title>IPD ConsentForm Wit Header And Footer </title>
</head>
<body>
	<%
		try {

			response.setContentType("application/pdf");
			
			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String billPrint = (String) resourceBundle.getObject("billPrint").toString();
			String billPrintsHeader = (String) resourceBundle.getObject("billPrintsHeader").toString();		
			
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			document.setMargins(20, 20, 20, 0);

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
			Font tabletext = new Font(Font.FontFamily.HELVETICA, 8,
			Font.NORMAL);
			Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);

			session = request.getSession();
			String user_name = (String) session.getAttribute("userName");
			int userid = (Integer) session.getAttribute("userId");
			
			
			List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails.getHospDetails("0");
			HospitalDetails hospObj = arrHospitalDetails.get(0);
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
			int patID=Integer.parseInt(request.getParameter("patientId"));
			int treatId=Integer.parseInt(request.getParameter("treatmentId"));
			String patientID=(request.getParameter("patientId"));
			String treatmentID=(request.getParameter("treatmentId"));
			int unitId=Integer.parseInt(request.getParameter("unitId"));
			String date_pick=(request.getParameter("date_pick"));
			String callfrom=(request.getParameter("callfrom"));
			String depId=request.getParameter("depdocdeskid");
			String dietIds=request.getParameter("dietIds");
			String IVFTreatmentId=request.getParameter("IVFTreatmentId");
			int ivfTreatId=Integer.parseInt(IVFTreatmentId);
			int emrId = 0;
			String editorContent = "";
			String vaccinationFlagCheckboxPrint = "undefined";
			java.util.Calendar currentDate = Calendar.getInstance();
			SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss a");
			String curr_date = dateformatter.format(currentDate.getTime());
			
			NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");
			document.newPage();
			
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
			
						PdfPTable HeaderTable1 = new PdfPTable(3);
						int[] headerwidth1 = { 30, 80, 20 };
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
  						if(callfrom.equals("printHF")){
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
						p.add(new Chunk(" "+city+" Pin- "+hospitalZip+"\n", tabletext));
						p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
                        if(!webste.equalsIgnoreCase("")){
						p.add(new Chunk(" \n "+webste, tabletext));
						}
						p.add(new Chunk(" \n "+"email: "+email, tabletext));						//p.add(new Chunk(" \nPAN No: "+panNo, tabletext));	
					/* 	p.add(new Chunk(" \nCIN: "+cinNo+", GST : "+gstNo , tabletext));	
						p.add(new Chunk(" \nSERVICE TAX NO: "+serviceTaxNo+", PAN No: "+panNo, tabletext));	 */
						
						PdfPCell hospitalNameCell = new PdfPCell(p);				
						hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
						hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
						HeaderTable1.addCell(hospitalNameCell);
						
							if(billPrint.contains("on")){
							
							if (img == null) {
								
								HeaderTable1.addCell(new Phrase("", header));
							} else {
								if(cellNabh==null){
									HeaderTable1.addCell(new Phrase("", header));

								}else{
									HeaderTable1.addCell(cellNabh);

								}
								
							}
						}else{
							
							HeaderTable1.addCell(new Phrase("", header));
						}	
					
					  }else{
						  if (img == null) {
								
								HeaderTable1.addCell(new Phrase("", header));
							} else {
								
								HeaderTable1.addCell(cell);
							}		 
		
		Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
		Font bold = new Font(FontFamily.TIMES_ROMAN, 12, Font.BOLD);
		Phrase p = new Phrase();
		p.add(new Chunk(" ", bold));			
		p.add(new Chunk(" \n", tabletext));			
		p.add(new Chunk(" \n", tabletext));
		p.add(new Chunk(" \n", tabletext));	
		p.add(new Chunk(" \n", tabletext));	
		p.add(new Chunk(" \n", tabletext));	
		p.add(new Chunk(" \n", tabletext));	
		
		PdfPCell hospitalNameCell = new PdfPCell(p);				
		hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
		HeaderTable1.addCell(hospitalNameCell);
		
		if(billPrint.contains("on")){
			
			if (img == null) {
				
				HeaderTable1.addCell(new Phrase("", header));
			} else {
				if(cellNabh==null){
					HeaderTable1.addCell(new Phrase("", header));

				}else{
					HeaderTable1.addCell(cellNabh);
	
				}
			}
		}else{
			
			HeaderTable1.addCell(new Phrase("", header));
		}
  }
						HeaderTable1.addCell(new Phrase("", header));
						HeaderTable1.addCell(new Phrase("", header));
						HeaderTable1.addCell(new Phrase("", header));
						HeaderTable1.addCell(new Phrase("", header));
						HeaderTable1.addCell(new Phrase("", header));
						HeaderTable1.addCell(new Phrase("", header));
						
						document.add(HeaderTable1);
						HeaderTable1.flushContent();

						HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						HeaderTable1.addCell(new Phrase("", header));
						HeaderTable1.addCell(new Phrase("", header));
						HeaderTable1.addCell(new Phrase("", header));
						document.add(HeaderTable1);
						HeaderTable1.flushContent();
						
						// Table 1 : For hospital adress details end

			PdfPTable HeaderTable8 = new PdfPTable(2);
			int[] headerwidth8 = { 30, 60 };
			HeaderTable8.setWidths(headerwidth8);
			HeaderTable8.setWidthPercentage(95f);
			HeaderTable8.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable8.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable8.addCell(new Phrase("  ", header));
			HeaderTable8.addCell(new Phrase(" DIET FORM", header));			
						
			document.add(HeaderTable8);
			HeaderTable8.flushContent();		
		
			String docName="";
			String refDocName  ="";
			 RegistrationController uss=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
			RegTreBillDto rtd = new RegTreBillDto();	
			/* IVFDoctorDeskController userIvf=(ApplicationContextUtils.getApplicationContext()).getBean(IVFDoctorDeskController.class);
			IVFRegPatientDTO rtdobj=userIvf.getIvfPatientInfoByIVFTreatId(treatId); */
			
			List<RegTreBillDto> ltPatientRecord = null;
			Integer tid=Integer.parseInt(treatmentID);
			rtd=uss.fetchPatientsRecordByTreatmentId(tid);
			rtd=rtd.getListRegTreBillDto().get(0);
			
			
			String PType = "";
			String addressPatient = "";
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
				
				String docId=ltRegMasterDto.get(0).getDoctorId();
				
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
			
			
		  	//For Get Hall Name
		RegService regSer=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
		List<Hall> hallName = new ArrayList<Hall>();
		hallName = regSer.fetchPatientsBedRecords(treatId);
        
			
			//new table no 3 start
			PdfPTable HeaderTable3 = new PdfPTable(5);
			int[] headerwidth3 = { 15,43,15,20,10};
			HeaderTable3.setWidths(headerwidth3);
			HeaderTable3.setWidthPercentage(95f);		
			
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			HeaderTable3.addCell(new Phrase("Patient ID ", subheader));
			HeaderTable3.addCell(new Phrase(" : "+patientID, tabletext));
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", tabletext));
			/* HeaderTable3.addCell(new Phrase("Treatment ID ", subheader));
			HeaderTable3.addCell(new Phrase(" : "+treatId, tabletext)); */
			HeaderTable3.addCell(new Phrase("", tabletext));
			
			String dtTime="";
			Date dt =null;
			dt = rtd.getCreatedDateTime();
			SimpleDateFormat sdf=new SimpleDateFormat("dd/MM/YYYY, hh:mm:ss a");
			dtTime=sdf.format(dt);
			
			HeaderTable3.addCell(new Phrase("Patient Name", subheader));
			HeaderTable3.addCell(new Phrase(": "+ rtd.getPatientName(), tabletext));
			HeaderTable3.addCell(new Phrase("Date of Admission", subheader));
			HeaderTable3.addCell(new Phrase(": "+ dtTime, tabletext));
			HeaderTable3.addCell(new Phrase("", tabletext));
			
				HeaderTable3.addCell(new Phrase("Age", subheader));
				HeaderTable3.addCell(new Phrase(": "+ rtd.getAge(), tabletext));
			
			HeaderTable3.addCell(new Phrase("Gender", subheader));
			HeaderTable3.addCell(new Phrase(": "+ rtd.getGender(), tabletext));
			HeaderTable3.addCell(new Phrase("", tabletext));
				
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable3.addCell(new Phrase("Address", subheader));
			HeaderTable3.addCell(new Phrase(":"+ rtd.getAddress(), tabletext));
			HeaderTable3.addCell(new Phrase("Type", subheader));
			HeaderTable3.addCell(new Phrase(": ", tabletext));
			HeaderTable3.addCell(new Phrase(" ", tabletext));	
			
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable3.addCell(new Phrase("Tel/Mob.No", subheader));
			HeaderTable3.addCell(new Phrase(": "+ rtd.getMobile(), tabletext));	
			
			if(Integer.parseInt(depId)==1){
				
			HeaderTable3.addCell(new Phrase("OPD NO", subheader));
			HeaderTable3.addCell(new Phrase(": ", tabletext));
			}else{
				HeaderTable3.addCell(new Phrase("IPD NO", subheader));
			HeaderTable3.addCell(new Phrase(": ", tabletext));
			}
			HeaderTable3.addCell(new Phrase(" ", tabletext));	
			
			IpdBillService fetchServlist=(ApplicationContextUtils.getApplicationContext()).getBean(IpdBillService.class);	
			
			BillNobleService fetchSubServlist=(ApplicationContextUtils.getApplicationContext()).getBean(BillNobleService.class);	
			
			List<EhatViewPatientBedDetailsIpdDto> listBedIpdDto2=fetchServlist.getPatientBedBill(treatId,3);
			
			if(Integer.parseInt(depId)==2){
			HeaderTable3.addCell(new Phrase("Ward ",subheader));
			HeaderTable3.addCell(new Phrase(" : ",tabletext));
			}
			else{
				HeaderTable3.addCell(new Phrase("Ward ",subheader));
				HeaderTable3.addCell(new Phrase(" : ",tabletext));
			}
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", tabletext));
			HeaderTable3.addCell(new Phrase(" ", tabletext));	
			        
			AdminModel admodel1 = new AdminModel();
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
					listDoc2 = admodel1.getDoctorsDepDetails(docId);
					 Doc_Nme = Doc_Nme + listDoc2.get(0).getDoc_name()+",";
					 Depart = Depart + listDoc2.get(0).getDepartmentName()+",";
							
				}
				HeaderTable3.addCell(new Phrase("Consultant Doc.", subheader));
				HeaderTable3.addCell(new Phrase(": "+Doc_Nme, tabletext));			
				HeaderTable3.addCell(new Phrase("", subheader));
				HeaderTable3.addCell(new Phrase("", tabletext));
				HeaderTable3.addCell(new Phrase("", tabletext));
				
			}
			else{
				if(!rtd.getDoctorId().equalsIgnoreCase("")){
			int docId =  Integer.parseInt(rtd.getDoctorId());
			
			listDoc2 = admodel1.getDoctorsDepDetails(docId);
				
			HeaderTable3.addCell(new Phrase("Consultant Doc.", subheader));
			HeaderTable3.addCell(new Phrase(": ", tabletext));
				}else{
					HeaderTable3.addCell(new Phrase("Consultant Doc.", subheader));
					HeaderTable3.addCell(new Phrase(": -", tabletext));
					
				}
			HeaderTable3.addCell(new Phrase("Ref By", subheader));
			HeaderTable3.addCell(new Phrase(": ", tabletext));
			HeaderTable3.addCell(new Phrase("", tabletext));
			
			}
			
			HeaderTable3.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", tabletext));			
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", tabletext));
			HeaderTable3.addCell(new Phrase(" ", tabletext));	
			
			document.add(HeaderTable3);
			HeaderTable3.flushContent();	
			
			PdfPTable HeaderTableovamsalveInfo = new PdfPTable(5);
			int[] headerovamsalveInfo = {10, 45, 45, 45, 45 };
			HeaderTableovamsalveInfo.setWidths(headerovamsalveInfo);
			HeaderTableovamsalveInfo.setWidthPercentage(95f);
			HeaderTableovamsalveInfo.getDefaultCell().setBorder(Rectangle.BOX);
			
			
			HeaderTableovamsalveInfo.addCell(new Phrase("#", subheader));
			HeaderTableovamsalveInfo.addCell(new Phrase("Drug", subheader));
			HeaderTableovamsalveInfo.addCell(new Phrase("Prep", subheader));
			HeaderTableovamsalveInfo.addCell(new Phrase("Instruction", subheader));
			HeaderTableovamsalveInfo.addCell(new Phrase("Duration", subheader));
			
			
			
			document.add(HeaderTableovamsalveInfo);
			HeaderTableovamsalveInfo.flushContent();
			
			IvfDoctorRoundController ivfdocround=(ApplicationContextUtils.getApplicationContext()).getBean(IvfDoctorRoundController.class);
			
			IvfPrescriptionDto obj=ivfdocround.fetchIvfPrescriptionData(ivfTreatId, "AutoSummary");
		int index=1;
			 if(obj.getIvfPrescriptionList().size() > 0){
				 for(int i=0;i<obj.getIvfPrescriptionList().size();i++){
					HeaderTableovamsalveInfo.addCell(new Phrase(""+index, subheader));
					HeaderTableovamsalveInfo.addCell(new Phrase(""+obj.getIvfPrescriptionList().get(i).getMedicineId(), subheader));
					HeaderTableovamsalveInfo.addCell(new Phrase(""+obj.getIvfPrescriptionList().get(i).getPrepName(), subheader));
					HeaderTableovamsalveInfo.addCell(new Phrase(""+obj.getIvfPrescriptionList().get(i).getInstructionName(), subheader));
					HeaderTableovamsalveInfo.addCell(new Phrase(""+ obj.getIvfPrescriptionList().get(i).getDays(), subheader));
				index++;
				 }
			} 
			
			
			
			
				
				document.add(HeaderTableovamsalveInfo);
				HeaderTableovamsalveInfo.flushContent();
			
			
		
			String actualpath="";
			AdminModel admodel = new AdminModel();
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
                imgsign = Image.getInstance(actualpath);
                imgsign.scaleAbsolute(100, 50);
                cellsign = new PdfPCell();
                cellsign.addElement(new Chunk(imgsign, 5, -5));
                cellsign.setBorder(Rectangle.NO_BORDER);
            } catch (Exception e) {
                e.printStackTrace();
            }
            }
			//footer start			
			HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			if (imgsign == null) {
				HeaderTable4.addCell(new Phrase("", header));
	            } else {
	            	HeaderTable4.addCell(cellsign);
	            } 

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			
			HeaderTable4.addCell(new Phrase("\n \n Checked By",tabletext));
			HeaderTable4.addCell(new Phrase("\n \n", tabletext));
			HeaderTable4.addCell(new Phrase("\n \n Authorized Signatory",
					tabletext));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			document.add(HeaderTable4);
			HeaderTable4.flushContent();
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("" + user_name, subheader));

			document.add(HeaderTable4);
			HeaderTable4.flushContent();

			HeaderTable4.addCell(new Phrase("", tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));

			document.add(HeaderTable4);
			HeaderTable4.flushContent();
							
			document.close();
			outStream.flush();
			outStream.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	%>
	
</body>
</html>
			