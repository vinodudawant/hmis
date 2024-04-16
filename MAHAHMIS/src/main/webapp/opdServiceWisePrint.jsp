<%@page import="com.hms.pathology.service.SponsorCustomTestNameService"%>
<%@page import="com.hms.ehat.dto.PatientSubServiceDetailsForOpdPackage"%>
<%@page import="com.hms.ehat.dto.PatientServiceDetail2"%>
<%@page import="com.hms.ehat.dto.BillNobleServiceDto"%>
<%@page import="com.hms.opdbill.dto.PatientHeaderInfoDto"%>
<%@page import="com.hms.opdbill.service.OpdBillService"%>
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
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>OPD Service Wise Print</title>List
<Assessment> arrAssessments = new ArrayList<Assessment>();

</head>
<body>
	<%
		try {

		response.setContentType("application/pdf");
       
	   HttpSession session2 = request.getSession();
       int hospitalUnitId= (Integer) session2.getAttribute("uId");
       HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
       //List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
       List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
       HospitalDetails hospObj = arrHospitalDetails.get(0);

		ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String billPrint = (String) resourceBundle.getObject("billPrint").toString();
		String billPrintsHeader = (String) resourceBundle.getObject("billPrintsHeader").toString();	
		String concessionFlow = (String) resourceBundle.getObject("concessionFlow").toString();
		
		//for centerpatientId
	    String patientId= resourceBundle.getObject("patientIdLabel").toString();
	
		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		
		response.setHeader("Content-Disposition", "inline; filename = Service-Wise Print"); //added by sandip for Tab name
		
		Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/

		if(billPrintsHeader.contains("off")){
			
			document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			
		}
		
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
		String gstNo =  hospObj.getTxtGstNo();
		String serviceTaxNo	  =   hospObj.getTxtSerTaxNo();
		String panNo	  =   hospObj.getPanNo();
		
		String hPhoneNo   = "";
		
		if(secPhoneNo!=null && !secPhoneNo.equalsIgnoreCase("")){
			 hPhoneNo   = PhoneNo+"/"+secPhoneNo;
		}else{
		 	hPhoneNo   = PhoneNo;
		}
		
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
		
		
		int servId=Integer.parseInt(request.getParameter("servId"));
		int treatId=Integer.parseInt(request.getParameter("treatId"));			
		String callfrom=request.getParameter("callfrom");	
		String Prev=request.getParameter("Prev");	
		String treatIdString=request.getParameter("treatId");
		String departmentId=request.getParameter("deptId");
		//String servName=request.getParameter("servName");
		int patID=Integer.parseInt(request.getParameter("patID"));
		
		NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");
		DecimalFormat df2 = new DecimalFormat("0.00");
		
		
		document.newPage();
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

			if (img == null) {
				
				HeaderTable1.addCell(new Phrase("", header));
			} else {
				
				HeaderTable1.addCell(cell);
			}		 
			
			Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
			Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD);
			Phrase p = new Phrase();
			p.add(new Chunk(" "+hospitalName, bold));	
			p.add(new Chunk(" \n\n", bold));
			p.add(new Chunk(""+address, tabletext));			
			p.add(new Chunk(" "+city+" Pin- "+hospitalZip+"\n", tabletext));
			p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
            if(!webste.equalsIgnoreCase("")){
			p.add(new Chunk(" \n "+webste, tabletext));
			}
			p.add(new Chunk(" \n "+"email: "+email, tabletext));			//p.add(new Chunk(" \nPAN No : "+panNo , tabletext));	
		//	p.add(new Chunk(" \nSERVICE TAX NO :"+serviceTaxNo+", PAN No: "+panNo, tabletext));	
			
			PdfPCell hospitalNameCell = new PdfPCell(p);				
			hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
			HeaderTable1.addCell(hospitalNameCell);
			
			if(billPrintsHeader.contains("on")){
				
				if(billPrint.contains("on")){
			if (img == null) {
				
				HeaderTable1.addCell(new Phrase("", header));
			} else {
				
				HeaderTable1.addCell(cellNabh);
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
			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();

			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
            }
					// Table 1 : For hospital adress details end

		PdfPTable HeaderTable8 = new PdfPTable(1);
		int[] headerwidth8 = { 100 };
		HeaderTable8.setWidths(headerwidth8);
		HeaderTable8.setWidthPercentage(95f);
		
		if(billPrintsHeader.contains("off")){
			
			HeaderTable8.setSpacingBefore(70f);
		}
		
		HeaderTable8.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable8.getDefaultCell().setBorder(Rectangle.BOTTOM);
		
		HeaderTable8.addCell(new Phrase("", header));
		HeaderTable8.addCell(new Phrase("  Service Wise Bill", header));			
					
		document.add(HeaderTable8);
		HeaderTable8.flushContent();		
		
	 			
		//new table no 5 start
		OpdBillService uss=(ApplicationContextUtils.getApplicationContext()).getBean(OpdBillService.class);
		PatientHeaderInfoDto rtd = new PatientHeaderInfoDto();	
		rtd.setTreatmentId(treatId);
		List<PatientHeaderInfoDto> ltPatientRecord = null;
		rtd=uss.getPatientInfoByTreatmentId(rtd);
		rtd=rtd.getListRegTreBillDto().get(0);
		
		//use for patient full address
		String addressPatient = "";
				
		 RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
			List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
			ltRegMasterDto =us.fetchPatientsRecordByTreatmentId(treatId);
			
			 int sponsorSlave=ltRegMasterDto.get(0).getChargesMasterSlaveId();
			 
			 String TokenNo   =ltRegMasterDto.get(0).getTokenno();
				
		 int stateId = rtd.getStateId();
		 int townId   =rtd.getTownId();
		 int districtId =rtd.getDistrictId();
		 int talukaId   =rtd.getTalukaId();
		
		 
		 String BillCategoryName ="";
		 String state  ="";
		 String district  ="";
		 String cityObj  ="";
		 String taluka  ="";
		 
		LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
		AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
		List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
		
		
		if(sponsorSlave > 0){
			fetchsposor   = obj.fetchSuperCatofchargesSlave(sponsorSlave);
		//	BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
			BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id");
		}else{
			BillCategoryName = "Self";
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
			addressPatient +=  (", "+taluka);
		}						
		if (district != "0" && !district.equals("undefined") && !district.equals("")) 
		{
			addressPatient += (", " + district);
		}
		if (state != "0" && !state.equals("undefined") && !state.equals("")) 
		{
			addressPatient += (", " + state);
		}
		
		String admDtTime="";
		String billDtTime="";
		Date dt =null;
		dt = rtd.getCreatedDateTime();
		SimpleDateFormat sdf=new SimpleDateFormat("dd/MM/YYYY, hh:mm:ss a");
		billDtTime=sdf.format(dt);
		
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Date date = new Date();
		String curDate=dateFormat.format(date);
		admDtTime=dateFormat.format(dt);
		
		// For ref doc start
		/* ChannelingModel objChannelingModel = new ChannelingModel();		
		List<Chanelling_doctor> arrChanelling_doctor = new ArrayList<Chanelling_doctor>();
		arrChanelling_doctor=objChannelingModel.getRefDoctors(); */
		String refDrName=rtd.getRefDocName();
		/* int refDrId=ltRegMasterDto.get(0).getRefDocId();
		for(Chanelling_doctor objRef : arrChanelling_doctor){
			
			if(refDrId==objRef.getChannDocId()){
				
				refDrName=objRef.getDocName();
			}
		} */		
		
		PdfPTable HeaderTable5 = new PdfPTable(4);
		int[] headerwidth5 = { 15,40,15,30};
		HeaderTable5.setWidths(headerwidth5);
		HeaderTable5.setWidthPercentage(95f);		
		
		HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		
		/* HeaderTable5.addCell(new Phrase("Patient ID", subheader));
		HeaderTable5.addCell(new Phrase(": "+patID, tabletext)); */
		//added by sandip
        if(patientId.equalsIgnoreCase("UHID")){
				HeaderTable5.addCell(new Phrase(""+patientId, subheader));
				HeaderTable5.addCell(new Phrase(": "+rtd.getCenterPatientId(), tabletext));
        }else{
        		HeaderTable5.addCell(new Phrase(""+patientId, subheader));
				HeaderTable5.addCell(new Phrase(": "+patID, tabletext));
        }
		HeaderTable5.addCell(new Phrase("Treatment ID", subheader));
		HeaderTable5.addCell(new Phrase(": "+treatId, tabletext)); 
		//HeaderTable5.addCell(new Phrase("", subheader));
		//HeaderTable5.addCell(new Phrase("", subheader));
		
		HeaderTable5.addCell(new Phrase("Patient Name ", subheader));
		HeaderTable5.addCell(new Phrase(": "+ rtd.getPatientName(), tabletext));			
		HeaderTable5.addCell(new Phrase("Gender", subheader));
		HeaderTable5.addCell(new Phrase(": "+rtd.getGender(), tabletext));
		
		/* HeaderTable5.addCell(new Phrase("Address", subheader));
		HeaderTable5.addCell(new Phrase(": "+ rtd.getAddress()+", "+addressPatient, tabletext));			
		HeaderTable5.addCell(new Phrase("Contact", subheader));
		HeaderTable5.addCell(new Phrase(": "+rtd.getMobile(), tabletext)); */
		
		HeaderTable5.addCell(new Phrase("Ref. By Dr.", subheader));
		HeaderTable5.addCell(new Phrase(": "+ refDrName, tabletext));			
		HeaderTable5.addCell(new Phrase("Mobile No.", subheader));
		HeaderTable5.addCell(new Phrase(": "+rtd.getMobile(), tabletext));
		
		HeaderTable5.addCell(new Phrase("Admission Date ", subheader));
		HeaderTable5.addCell(new Phrase(": "+admDtTime, tabletext));			
		HeaderTable5.addCell(new Phrase("Age", subheader));
		HeaderTable5.addCell(new Phrase(": "+rtd.getAge(), tabletext));	
		
		/* HeaderTable5.addCell(new Phrase("Token No. ", subheader));
		HeaderTable5.addCell(new Phrase(": "+TokenNo, tabletext)); */
		HeaderTable5.addCell(new Phrase("Sponsor ", subheader));
		HeaderTable5.addCell(new Phrase(": "+BillCategoryName, tabletext));
		
		HeaderTable5.addCell(new Phrase("Bill No       ", subheader));
		HeaderTable5.addCell(new Phrase(": "+ rtd.getBillId(), tabletext));		
		HeaderTable5.addCell(new Phrase("Bill Date ", subheader));
		HeaderTable5.addCell(new Phrase(": "+billDtTime, tabletext));			
		
		
/* 		HeaderTable5.addCell(new Phrase("Bill No       ", subheader));
		HeaderTable5.addCell(new Phrase(": "+ rtd.getBillId(), tabletext));
		HeaderTable5.addCell(new Phrase("HSN Code",subheader));
		HeaderTable5.addCell(new Phrase(" ", tabletext)); */
		
		
		/* HeaderTable5.addCell(new Phrase("Sponser               : ", subheader));
		HeaderTable5.addCell(new Phrase("", tabletext));			
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", tabletext)); */
		
		/* AdminModel admodel1 = new AdminModel();
		Doctor doc2 = new Doctor();
		List<Doctor> listDoc2 = null;

		if(rtd.getDoctorId().contains(",")){
			
			
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
			HeaderTable5.addCell(new Phrase("Consultant Doc.", subheader));
			HeaderTable5.addCell(new Phrase(": "+Doc_Nme, tabletext));			
			HeaderTable5.addCell(new Phrase(" ", subheader));
			HeaderTable5.addCell(new Phrase(" ", tabletext));
			
		}
		else{
			if(!(rtd.getDoctorId()).equals("") || rtd.getDoctorId().length() > 0){
				int docId =  Integer.parseInt(rtd.getDoctorId());
				listDoc2 = admodel1.getDoctorsDepDetails(docId);
				
				HeaderTable5.addCell(new Phrase("Consultant Doc.", subheader));
				HeaderTable5.addCell(new Phrase(": "+listDoc2.get(0).getDoc_name(), tabletext));			
				HeaderTable5.addCell(new Phrase("", subheader));
				HeaderTable5.addCell(new Phrase("", tabletext));
				
			}
		} */
		
		HeaderTable5.addCell(new Phrase("Consultant Doc.", subheader));
		HeaderTable5.addCell(new Phrase(": "+rtd.getConsultingDocName(), tabletext));			
		/* HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", tabletext)); */
		
		HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
		
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
				
		document.add(HeaderTable5);
		HeaderTable5.flushContent();
		
		//End table no 5 start
			
		   /* BillQuotationDto billQuotationDto = (BillQuotationDto) ConfigUIJSONUtility
				.getObjectFromJSON(billquotations,
						BillQuotationDto.class); */
		 
		   BillNobleService obje=(ApplicationContextUtils.getApplicationContext()).getBean(BillNobleService.class);
			List<BillNobleServiceDto> listBillDetails = new ArrayList<BillNobleServiceDto>();
			listBillDetails =obje.getPatientServiceBill(treatId,servId);
			String serviceName="";	
			SponsorCustomTestNameService sponsorCustom  = (ApplicationContextUtils.getApplicationContext()).getBean(SponsorCustomTestNameService.class);
			
			if(Prev.equalsIgnoreCase("Yes")){
				BillNobleService objePre=(ApplicationContextUtils.getApplicationContext()).getBean(BillNobleService.class);
				List<PatientServiceDetail2> listServDetailsPre = new ArrayList<PatientServiceDetail2>();
				listServDetailsPre =objePre.fetchPatientPreviousBillAmount(treatId,request);			
				
			
			for (int i = 0; i < listServDetailsPre.size(); i++) {
				if(listServDetailsPre.get(i).getServiceId() == servId){
					serviceName=listServDetailsPre.get(i).getServiceName();					
				}
			}
			}else{
				BillNobleService obje1=(ApplicationContextUtils.getApplicationContext()).getBean(BillNobleService.class);
				List<BillNobleDto> listServDetails = new ArrayList<BillNobleDto>();
				listServDetails =obje1.getPatientBillAmount(treatId,request);			
							
				
			
			for (int i = 0; i < listServDetails.size(); i++) {
				if(listServDetails.get(i).getServiceId() == servId){
					serviceName=listServDetails.get(i).getServiceName();
					
				}
			}
			}
			 
			double tAmount=0.00f;
			
			if(concessionFlow.equalsIgnoreCase("off") || concessionFlow.equalsIgnoreCase("on")){
				//Start table no 2 start
				PdfPTable HeaderTable2 = null;
				
				if(concessionFlow.equalsIgnoreCase("on")){
					HeaderTable2 = new PdfPTable(7);
					int[] headerwidth2 = {25,25,15,15,20,20,20};
					HeaderTable2.setWidths(headerwidth2);
					HeaderTable2.setWidthPercentage(95f);
				}else{
					HeaderTable2 = new PdfPTable(5);
					int[] headerwidth2 = { 25,25,15,15,20};
					HeaderTable2.setWidths(headerwidth2);
					HeaderTable2.setWidthPercentage(95f);
				}
				
				HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTable2.addCell(new Phrase("Services", subheader));
				if(servId==2){
					HeaderTable2.addCell(new Phrase("Doc Name", subheader));
				}else{
				HeaderTable2.addCell(new Phrase("Sub-Services", subheader));
				}
				PdfPCell cells26 = new PdfPCell(new Phrase("Rate", subheader));
				cells26.setHorizontalAlignment(Element.ALIGN_RIGHT);
				cells26.setBorder(Rectangle.NO_BORDER);
				HeaderTable2.addCell(cells26);
				//HeaderTable2.addCell(new Phrase("Rate", subheader));
				PdfPCell cells1 = new PdfPCell(new Phrase("Qty", subheader));
				cells1.setHorizontalAlignment(Element.ALIGN_RIGHT);
				cells1.setBorder(Rectangle.NO_BORDER);
				HeaderTable2.addCell(cells1);
				//HeaderTable2.addCell(new Phrase("Qty", subheader));
				PdfPCell cells2 = new PdfPCell(new Phrase("Amount", subheader));
				cells2.setHorizontalAlignment(Element.ALIGN_RIGHT);
				cells2.setBorder(Rectangle.NO_BORDER);
				HeaderTable2.addCell(cells2);
				//HeaderTable2.addCell(new Phrase("Amount", subheader));
				
				if(concessionFlow.equalsIgnoreCase("on")){
					
					PdfPCell cells21 = new PdfPCell(new Phrase("Concession", subheader));
					cells21.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells21.setBorder(Rectangle.NO_BORDER);
					HeaderTable2.addCell(cells21);
					
					PdfPCell cells22 = new PdfPCell(new Phrase("Payable", subheader));
					cells22.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells22.setBorder(Rectangle.NO_BORDER);
					HeaderTable2.addCell(cells22);
				}				
								
				PdfPTable HeaderTable4 = new PdfPTable(6);
				int[] headerwidth4 = { 10, 50, 50, 10, 10, 20 };
				HeaderTable4.setWidths(headerwidth4);
				HeaderTable4.setWidthPercentage(95f);
				
				for (int i = 0; i < listBillDetails.size(); i++) {
					
					//System.err.println("=-hhhhhhhhh=-=-"+listBillDetails.get(i).getCancle());
						String cancle=listBillDetails.get(i).getCancle();
						//String cghsCode = "("+listBillDetails.get(i).getCghsCode()+")";
						String cghsCode = "";
						if(cghsCode.equalsIgnoreCase("") || cghsCode.equalsIgnoreCase("-") || cghsCode=="()" || cghsCode.equalsIgnoreCase("(-)") || cghsCode.equalsIgnoreCase("(null)")){
							cghsCode="";
						}
						if(cancle.equalsIgnoreCase("N")){
							
						if(callfrom.equalsIgnoreCase("sponsor")){
							   
							   
							   tAmount=tAmount+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity() - +listBillDetails.get(i).getOtherConcession());
							
							if(servId==2){
								HeaderTable2.addCell(new Phrase(""+serviceName + cghsCode, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getDocName(), tabletext));
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getOtherRate(), tabletext));
								PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								//HeaderTable2.addCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								if(concessionFlow.equalsIgnoreCase("on")){
									PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherConcession()), tabletext));
									cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
									cells51.setBorder(Rectangle.NO_BORDER);
									HeaderTable2.addCell(cells51);
									
									PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherPay()), tabletext));
									cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
									cells52.setBorder(Rectangle.NO_BORDER);
									HeaderTable2.addCell(cells52);
								}								
								
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getOtherRate(), tabletext));
							}else if(servId==14){
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getInvName()+ cghsCode, tabletext));
								
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getOtherRate(), tabletext));
								PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								//HeaderTable2.addCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								if(concessionFlow.equalsIgnoreCase("on")){
									PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherConcession()), tabletext));
									cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
									cells51.setBorder(Rectangle.NO_BORDER);
									HeaderTable2.addCell(cells51);
									
									PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherPay()), tabletext));
									cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
									cells52.setBorder(Rectangle.NO_BORDER);
									HeaderTable2.addCell(cells52);
								}			
								
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getOtherRate(), tabletext));
								//HeaderTable2.addCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getOtherAmount(), tabletext));
							}else if(servId == 13){
							
								// ===================== For package details ========================//
										
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, tabletext));
																
								PdfPCell cells3 = new PdfPCell(new Phrase(""+listBillDetails.get(i).getOtherRate(), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+listBillDetails.get(i).getOtherAmount(), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								if(concessionFlow.equalsIgnoreCase("on")){
									PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherConcession()), tabletext));
									cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
									cells51.setBorder(Rectangle.NO_BORDER);
									HeaderTable2.addCell(cells51);
									
									PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherPay()), tabletext));
									cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
									cells52.setBorder(Rectangle.NO_BORDER);
									HeaderTable2.addCell(cells52);
								}
								
								int subSrvId = listBillDetails.get(i).getSubServiceId();
								int sponsorId = 0;
								int chagesSlaveId = listBillDetails.get(i).getChargesSlaveId();							
								int billdetailsId = listBillDetails.get(i).getBillDetailsId();
								
								BillNobleService billNobleService=(ApplicationContextUtils.getApplicationContext()).getBean(BillNobleService.class);
								List<PatientSubServiceDetailsForOpdPackage> listOpdPackage = new ArrayList<PatientSubServiceDetailsForOpdPackage>();
								listOpdPackage= billNobleService.getPackagedataforOpd(servId,subSrvId,sponsorId,chagesSlaveId,treatId,patID,billdetailsId);
															
								HeaderTable4.getDefaultCell().setBorder(Rectangle.BOTTOM);
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("Package Details", tableheader));
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
	
								HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
	
								HeaderTable4.getDefaultCell().setBorder(Rectangle.BOTTOM);
								HeaderTable4.addCell(new Phrase("#", subheader));
								HeaderTable4.addCell(new Phrase("Service Name", subheader));
								HeaderTable4.addCell(new Phrase("Doctor Name", subheader));
								HeaderTable4.addCell(new Phrase("Rate", tabletext)); 
								HeaderTable4.addCell(new Phrase("Qty", tabletext)); 
								HeaderTable4.addCell(new Phrase("Amount", tabletext)); 
								
								HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								
								HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								
								int count=1;
								for (int k = 0; k < listOpdPackage.size(); k++) {
									
									HeaderTable4.addCell(new Phrase(""+(count++), tabletext));
									HeaderTable4.addCell(new Phrase(""+listOpdPackage.get(k).getCategoryName(), tabletext));
									HeaderTable4.addCell(new Phrase(""+listOpdPackage.get(k).getDocName(), tabletext));
									HeaderTable4.addCell(new Phrase(""+df2.format(listOpdPackage.get(k).getOtherRate()), tabletext)); 
									HeaderTable4.addCell(new Phrase(""+listOpdPackage.get(k).getQuantity(), tabletext)); 
									HeaderTable4.addCell(new Phrase(""+df2.format(listOpdPackage.get(k).getOtherAmount()), tabletext)); 
								}
								
								HeaderTable4.getDefaultCell().setBorder(Rectangle.BOTTOM);
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								
							}else{
								 String sname= sponsorCustom.getSponsorCustomTestName(rtd.getChargesMasterSlaveId(), servId, listBillDetails.get(i).getSubServiceId());
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));

                                 if(!sname.equalsIgnoreCase("")){
									HeaderTable2.addCell(new Phrase(""+sname, tabletext));
								}else{
									HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, tabletext));
								}
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, tabletext));
								
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getOtherRate(), tabletext));
								PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								//HeaderTable2.addCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								if(concessionFlow.equalsIgnoreCase("on")){
									PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherConcession()), tabletext));
									cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
									cells51.setBorder(Rectangle.NO_BORDER);
									HeaderTable2.addCell(cells51);
									
									PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherPay()), tabletext));
									cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
									cells52.setBorder(Rectangle.NO_BORDER);
									HeaderTable2.addCell(cells52);
								}
															
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getOtherRate(), tabletext));
								//HeaderTable2.addCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getOtherAmount(), tabletext));
							}
							
						
						}else {
							tAmount=tAmount+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity() - +listBillDetails.get(i).getConcession());
							if(servId==2){
								HeaderTable2.addCell(new Phrase(""+serviceName + cghsCode, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getDocName(), tabletext));								
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								if(concessionFlow.equalsIgnoreCase("on")){
									PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getConcession()), tabletext));
									cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
									cells51.setBorder(Rectangle.NO_BORDER);
									HeaderTable2.addCell(cells51);
									
									PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getCoPay()), tabletext));
									cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
									cells52.setBorder(Rectangle.NO_BORDER);
									HeaderTable2.addCell(cells52);
								}
								
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getRate(), tabletext));
								//HeaderTable2.addCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getRate(), tabletext));
							}else if(servId==14){
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getInvName() + cghsCode, tabletext));
								
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								if(concessionFlow.equalsIgnoreCase("on")){
									PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getConcession()), tabletext));
									cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
									cells51.setBorder(Rectangle.NO_BORDER);
									HeaderTable2.addCell(cells51);
									
									PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getCoPay()), tabletext));
									cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
									cells52.setBorder(Rectangle.NO_BORDER);
									HeaderTable2.addCell(cells52);
								}
								
							//	HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getRate(), tabletext));
							//	HeaderTable2.addCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
							//	HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getAmount(), tabletext));
							}else if(servId == 13){
								
								HeaderTable2.addCell(new Phrase(""+serviceName, subheader));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, subheader));
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+listBillDetails.get(i).getRate(), subheader));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), subheader));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+listBillDetails.get(i).getAmount(), subheader));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								if(concessionFlow.equalsIgnoreCase("on")){
									PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getConcession()), subheader));
									cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
									cells51.setBorder(Rectangle.NO_BORDER);
									HeaderTable2.addCell(cells51);
									
									PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getCoPay()), subheader));
									cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
									cells52.setBorder(Rectangle.NO_BORDER);
									HeaderTable2.addCell(cells52);
								}
								
								document.add(HeaderTable2);
								HeaderTable2.flushContent();
											
								// ===================== For package details ========================//
								
								int subSrvId = listBillDetails.get(i).getSubServiceId();
								int sponsorId = 0;
								int chagesSlaveId = listBillDetails.get(i).getChargesSlaveId();							
								int billdetailsId = listBillDetails.get(i).getBillDetailsId();
								
								BillNobleService billNobleService=(ApplicationContextUtils.getApplicationContext()).getBean(BillNobleService.class);
								List<PatientSubServiceDetailsForOpdPackage> listOpdPackage = new ArrayList<PatientSubServiceDetailsForOpdPackage>();
								listOpdPackage= billNobleService.getPackagedataforOpd(servId,subSrvId,sponsorId,chagesSlaveId,treatId,patID,billdetailsId);
														
								if(listOpdPackage.size() > 0){
									HeaderTable4.getDefaultCell().setBorder(Rectangle.BOTTOM);
									HeaderTable4.addCell(new Phrase("", subheader));
									HeaderTable4.addCell(new Phrase("", tableheader));
									HeaderTable4.addCell(new Phrase("", tabletext)); 
									HeaderTable4.addCell(new Phrase("", tabletext)); 
									HeaderTable4.addCell(new Phrase("", tabletext)); 
									HeaderTable4.addCell(new Phrase("", tabletext)); 
	
									HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
									HeaderTable4.addCell(new Phrase("", subheader));
									HeaderTable4.addCell(new Phrase("", subheader));
									HeaderTable4.addCell(new Phrase("", subheader));
									HeaderTable4.addCell(new Phrase("", tabletext)); 
									HeaderTable4.addCell(new Phrase("", tabletext)); 
									HeaderTable4.addCell(new Phrase("", tabletext));
	
									HeaderTable4.getDefaultCell().setBorder(Rectangle.BOTTOM);
									HeaderTable4.addCell(new Phrase("#", subheader));
									HeaderTable4.addCell(new Phrase("Service Name", subheader));
									HeaderTable4.addCell(new Phrase("Doctor Name", subheader));
									HeaderTable4.addCell(new Phrase("Rate", tabletext)); 
									HeaderTable4.addCell(new Phrase("Qty", tabletext)); 
									HeaderTable4.addCell(new Phrase("Amount", tabletext));
									
									HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
									HeaderTable4.addCell(new Phrase("", subheader));
									HeaderTable4.addCell(new Phrase("", subheader));
									HeaderTable4.addCell(new Phrase("", subheader));
									HeaderTable4.addCell(new Phrase("", tabletext)); 
									HeaderTable4.addCell(new Phrase("", tabletext)); 
									HeaderTable4.addCell(new Phrase("", tabletext));
									
									HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
									HeaderTable4.addCell(new Phrase("", subheader));
									HeaderTable4.addCell(new Phrase("", subheader));
									HeaderTable4.addCell(new Phrase("", subheader));
									HeaderTable4.addCell(new Phrase("", tabletext)); 
									HeaderTable4.addCell(new Phrase("", tabletext)); 
									HeaderTable4.addCell(new Phrase("", tabletext));
									
									int count=1;
									for (int k = 0; k < listOpdPackage.size(); k++) {
										
										HeaderTable4.addCell(new Phrase(""+(count++), tabletext));
										HeaderTable4.addCell(new Phrase(""+listOpdPackage.get(k).getCategoryName(), tabletext));
										HeaderTable4.addCell(new Phrase(""+listOpdPackage.get(k).getDocName(), tabletext));
										HeaderTable4.addCell(new Phrase(""+df2.format(listOpdPackage.get(k).getRate()), tabletext)); 
										HeaderTable4.addCell(new Phrase(""+listOpdPackage.get(k).getQuantity(), tabletext)); 
										HeaderTable4.addCell(new Phrase(""+df2.format(listOpdPackage.get(k).getAmount()), tabletext));
									}
									
									HeaderTable4.getDefaultCell().setBorder(Rectangle.BOTTOM);
									HeaderTable4.addCell(new Phrase("", subheader));
									HeaderTable4.addCell(new Phrase("", subheader));
									HeaderTable4.addCell(new Phrase("", subheader));
									HeaderTable4.addCell(new Phrase("", tabletext)); 
									HeaderTable4.addCell(new Phrase("", tabletext)); 
									HeaderTable4.addCell(new Phrase("", tabletext));
									
									HeaderTable4.setSpacingAfter(10f);
									document.add(HeaderTable4);
									HeaderTable4.flushContent();
								}
								
							}else{
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, tabletext));								

								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								if(concessionFlow.equalsIgnoreCase("on")){								
									PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getConcession()), tabletext));
									cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
									cells51.setBorder(Rectangle.NO_BORDER);
									HeaderTable2.addCell(cells51);
									
									PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getCoPay()), tabletext));
									cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
									cells52.setBorder(Rectangle.NO_BORDER);
									HeaderTable2.addCell(cells52);
								}
								
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getRate(), tabletext));
								//HeaderTable2.addCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getAmount(), tabletext));
							}
						}
						}
					}

					HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();
					
					document.add(HeaderTable4);
					HeaderTable4.flushContent();
					
					//end Table 2
			} else{
				//Start table no 2 start
				PdfPTable HeaderTable2 = new PdfPTable(5);
				int[] headerwidth2 = { 25,25,15,15,20};
				HeaderTable2.setWidths(headerwidth2);
				HeaderTable2.setWidthPercentage(95f);
				
				//HeaderTable2.addCell(new Phrase("Amount", subheader));
				
				PdfPTable HeaderTable4 = new PdfPTable(6);
				int[] headerwidth4 = { 10, 50, 50, 10, 10, 20 };
				HeaderTable4.setWidths(headerwidth4);
				HeaderTable4.setWidthPercentage(95f);
				
				
				if(servId != 13){
					HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable2.addCell(new Phrase("Services", subheader));
					if(servId==2){
						HeaderTable2.addCell(new Phrase("Doc Name", subheader));
					}else{
					HeaderTable2.addCell(new Phrase("Sub-Services", subheader));
					}
					PdfPCell cells261 = new PdfPCell(new Phrase("Rate", subheader));
					cells261.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells261.setBorder(Rectangle.NO_BORDER);
					HeaderTable2.addCell(cells261);
					//HeaderTable2.addCell(new Phrase("Rate", subheader));
					PdfPCell cells11 = new PdfPCell(new Phrase("Qty", subheader));
					cells11.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells11.setBorder(Rectangle.NO_BORDER);
					HeaderTable2.addCell(cells11);
					//HeaderTable2.addCell(new Phrase("Qty", subheader));
					PdfPCell cells21 = new PdfPCell(new Phrase("Amount", subheader));
					cells21.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells21.setBorder(Rectangle.NO_BORDER);
					HeaderTable2.addCell(cells21);
				
				
				
				for (int i = 0; i < listBillDetails.size(); i++) {
					String cancle=listBillDetails.get(i).getCancle();
					//System.err.println("=-hhhhhhhhh=-=-"+listBillDetails.get(i).getCancle());
						
						//String cghsCode = "("+listBillDetails.get(i).getCghsCode()+")";
						String cghsCode = "";
						if(cghsCode.equalsIgnoreCase("") || cghsCode.equalsIgnoreCase("-") || cghsCode=="()" || cghsCode.equalsIgnoreCase("(-)") || cghsCode.equalsIgnoreCase("(null)")){
							cghsCode="";
						}
						
							
						if(callfrom.equalsIgnoreCase("sponsor")){
							
							tAmount=tAmount+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity());
							if(servId==2){
								HeaderTable2.addCell(new Phrase(""+serviceName + cghsCode, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getDocName(), tabletext));
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getOtherRate(), tabletext));
								PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								//HeaderTable2.addCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getOtherRate(), tabletext));
							}else if(servId==14){
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getInvName()+ cghsCode, tabletext));
								
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getOtherRate(), tabletext));
								PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								//HeaderTable2.addCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);								
								
							}else if(servId==13){ // For package
								
								HeaderTable2.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
								HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(new Phrase("Services", subheader));
								if(servId==2){
									HeaderTable2.addCell(new Phrase("Doc Name", subheader));
								}else{
									HeaderTable2.addCell(new Phrase("Sub-Services", subheader));
								}
								
								HeaderTable2.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
								PdfPCell cells26 = new PdfPCell(new Phrase("Rate", subheader));
								cells26.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells26.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells26);
								//HeaderTable2.addCell(new Phrase("Rate", subheader));
								PdfPCell cells1 = new PdfPCell(new Phrase("Qty", subheader));
								cells1.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells1.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells1);
								//HeaderTable2.addCell(new Phrase("Qty", subheader));
								PdfPCell cells2 = new PdfPCell(new Phrase("Amount", subheader));
								cells2.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells2.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells2);
								
								HeaderTable2.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, tabletext));
																
								HeaderTable2.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
																
								// ===================== For package details ========================//
																
								int subSrvId = listBillDetails.get(i).getSubServiceId();
								int sponsorId = 0;
								int chagesSlaveId = listBillDetails.get(i).getChargesSlaveId();							
								int billdetailsId = listBillDetails.get(i).getBillDetailsId();
								
								BillNobleService billNobleService=(ApplicationContextUtils.getApplicationContext()).getBean(BillNobleService.class);
								List<PatientSubServiceDetailsForOpdPackage> listOpdPackage = new ArrayList<PatientSubServiceDetailsForOpdPackage>();
								listOpdPackage= billNobleService.getPackagedataforOpd(servId,subSrvId,sponsorId,chagesSlaveId,treatId,patID,billdetailsId);
															
								HeaderTable4.getDefaultCell().setBorder(Rectangle.BOTTOM);
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("Package Details", tableheader));
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 

								HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 

								HeaderTable4.getDefaultCell().setBorder(Rectangle.BOTTOM);
								HeaderTable4.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
								HeaderTable4.addCell(new Phrase("#", subheader));
								HeaderTable4.addCell(new Phrase("Service Name", subheader));
								HeaderTable4.addCell(new Phrase("Doctor Name", subheader));
								HeaderTable4.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
								HeaderTable4.addCell(new Phrase("Rate", subheader)); 
								HeaderTable4.addCell(new Phrase("Qty", subheader)); 
								HeaderTable4.addCell(new Phrase("Amount", subheader)); 
								
								HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								
								HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								
								int count=1;
								for (int k = 0; k < listOpdPackage.size(); k++) {
									
									String docName = listOpdPackage.get(k).getDocName();
									
									if(docName == null){
										
										docName = "-";
									}
									HeaderTable4.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
									HeaderTable4.addCell(new Phrase(""+(count++), tabletext));
									HeaderTable4.addCell(new Phrase(""+listOpdPackage.get(k).getCategoryName(), tabletext));
									HeaderTable4.addCell(new Phrase(""+docName, tabletext));
									HeaderTable4.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
									HeaderTable4.addCell(new Phrase(""+df2.format(listOpdPackage.get(k).getOtherRate()), tabletext)); 
									HeaderTable4.addCell(new Phrase(""+listOpdPackage.get(k).getQuantity(), tabletext)); 
									HeaderTable4.addCell(new Phrase(""+df2.format(listOpdPackage.get(k).getOtherAmount()), tabletext)); 
								}
								
								HeaderTable4.getDefaultCell().setBorder(Rectangle.BOTTOM);
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								
								document.add(HeaderTable2);
								HeaderTable2.flushContent();
								
								document.add(HeaderTable4);
								HeaderTable4.flushContent();
																
							}else{
								String sname= sponsorCustom.getSponsorCustomTestName(rtd.getChargesMasterSlaveId(), servId, listBillDetails.get(i).getSubServiceId());
								  
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								
								if(!sname.equalsIgnoreCase("")){
									HeaderTable2.addCell(new Phrase(""+sname, tabletext));
								}else{
									HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, tabletext));
								}
								
																
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getOtherRate(), tabletext));
								PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								//HeaderTable2.addCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								
								
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getOtherRate(), tabletext));
								//HeaderTable2.addCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getOtherAmount(), tabletext));
							}
							
						
							}else {
							tAmount=tAmount+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity());
							if(servId==2){
								HeaderTable2.addCell(new Phrase(""+serviceName + cghsCode, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getDocName(), tabletext));
								
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getRate(), tabletext));
								//HeaderTable2.addCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getRate(), tabletext));
							}else if(servId==14){
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getInvName() + cghsCode, tabletext));
								
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								
							//	HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getRate(), tabletext));
							//	HeaderTable2.addCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
							//	HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getAmount(), tabletext));
							}else if(servId==13){
								
								HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								HeaderTable2.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
								HeaderTable2.addCell(new Phrase("Services", subheader));
								if(servId==2){
									HeaderTable2.addCell(new Phrase("Doc Name", subheader));
								}else{
									HeaderTable2.addCell(new Phrase("Sub-Services", subheader));
								}
								
								HeaderTable2.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
								PdfPCell cells26 = new PdfPCell(new Phrase("Rate", subheader));
								cells26.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells26.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells26);
								//HeaderTable2.addCell(new Phrase("Rate", subheader));
								PdfPCell cells1 = new PdfPCell(new Phrase("Qty", subheader));
								cells1.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells1.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells1);
								//HeaderTable2.addCell(new Phrase("Qty", subheader));
								PdfPCell cells2 = new PdfPCell(new Phrase("Amount", subheader));
								cells2.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells2.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells2);
								
								HeaderTable2.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, tabletext));
								
								HeaderTable2.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								// ===================== For package details ========================//
								int subSrvId = listBillDetails.get(i).getSubServiceId();
								int sponsorId = 0;
								int chagesSlaveId = listBillDetails.get(i).getChargesSlaveId();							
								int billdetailsId = listBillDetails.get(i).getBillDetailsId();
								
								BillNobleService billNobleService=(ApplicationContextUtils.getApplicationContext()).getBean(BillNobleService.class);
								List<PatientSubServiceDetailsForOpdPackage> listOpdPackage = new ArrayList<PatientSubServiceDetailsForOpdPackage>();
								listOpdPackage= billNobleService.getPackagedataforOpd(servId,subSrvId,sponsorId,chagesSlaveId,treatId,patID,billdetailsId);
															
								HeaderTable4.getDefaultCell().setBorder(Rectangle.BOTTOM);
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("Package Details", tableheader));
								HeaderTable4.addCell(new Phrase("", tabletext)); 
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));

								HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));

								HeaderTable4.getDefaultCell().setBorder(Rectangle.BOTTOM);
								HeaderTable4.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
								HeaderTable4.addCell(new Phrase("#", subheader));
								HeaderTable4.addCell(new Phrase("Service Name", subheader));
								HeaderTable4.addCell(new Phrase("Doctor Name", subheader));
								HeaderTable4.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
								HeaderTable4.addCell(new Phrase("Rate", subheader));
								HeaderTable4.addCell(new Phrase("Qty", subheader));
								HeaderTable4.addCell(new Phrase("Amount", subheader));
								
								HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								
								HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								
								int count=1;
								for (int k = 0; k < listOpdPackage.size(); k++) {
									
									HeaderTable4.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
									HeaderTable4.addCell(new Phrase(""+(count++), tabletext));
									HeaderTable4.addCell(new Phrase(""+listOpdPackage.get(k).getCategoryName(), tabletext));
									HeaderTable4.addCell(new Phrase(""+listOpdPackage.get(k).getDocName(), tabletext));
									HeaderTable4.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
									HeaderTable4.addCell(new Phrase(""+df2.format(listOpdPackage.get(k).getRate()), tabletext)); 
									HeaderTable4.addCell(new Phrase(""+listOpdPackage.get(k).getQuantity(), tabletext)); 
									HeaderTable4.addCell(new Phrase(""+df2.format(listOpdPackage.get(k).getAmount()), tabletext));
								}
								
								HeaderTable4.getDefaultCell().setBorder(Rectangle.BOTTOM);
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								HeaderTable4.addCell(new Phrase("", subheader));
								
								document.add(HeaderTable2);
								HeaderTable2.flushContent();
								
								document.add(HeaderTable4);
								HeaderTable4.flushContent();
															
							}else{
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, tabletext));
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getRate(), tabletext));
								//HeaderTable2.addCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), tabletext));
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getAmount(), tabletext));
							}
						}
						}
					}

					HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));
					HeaderTable2.addCell(new Phrase("", subheader));

					document.add(HeaderTable2);
					HeaderTable2.flushContent();
					//end Table 2
					
					document.add(HeaderTable4);
					HeaderTable4.flushContent();
			}
			

			

			// Table6 : Amount in words

			PdfPTable HeaderTable6 = new PdfPTable(5);
			int[] headerwidth6 = { 15, 45, 5, 15, 20 };
			HeaderTable6.setWidths(headerwidth6);
			HeaderTable6.setWidthPercentage(95f);
			HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));

			//DecimalFormat df2 = new DecimalFormat("0.00");
			HeaderTable6.addCell(new Phrase("Amount In Words:", subheader));
			long finalam2 = (long) tAmount;
			df2.format(finalam2);
			String oustandingAmt ="";
			if(tAmount > 0){
				
				oustandingAmt = EnglishNumberToWords.convert(finalam2);
			}else{
				
				oustandingAmt = " Zero";
			}	
			HeaderTable6.addCell(new Phrase(
					"Rs. "+ (oustandingAmt +" Only"),tabletext)); //editedrs.only
					
					
			HeaderTable6.addCell(new Phrase("", subheader));
			PdfPCell cells5 = new PdfPCell(new Phrase("Total", subheader));
			cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cells5.setBorder(Rectangle.NO_BORDER);
			HeaderTable6.addCell(cells5);
			
			//HeaderTable6.addCell(new Phrase("Total", subheader));

			HeaderTable6.getDefaultCell().setBorder(Rectangle.BOX);
			
			PdfPCell cells6 = new PdfPCell(new Phrase(""+tAmount, subheader));
			cells6.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cells6.setBorder(Rectangle.NO_BORDER);
			HeaderTable6.addCell(cells6);
			
			//HeaderTable6.addCell(new Phrase("       " + finalam2, subheader));
			HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			
			document.add(HeaderTable6);
			HeaderTable6.flushContent();
			
			PdfPTable HeaderTable9 = new PdfPTable(2);
			int[] headerwidth9 = { 180,50 };
			HeaderTable9.setWidths(headerwidth9);
			HeaderTable9.setWidthPercentage(95f);
			HeaderTable9.setSpacingBefore(80f);
			HeaderTable9.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			HeaderTable9.addCell(new Phrase("Payee Signature", tabletext));
			HeaderTable9.addCell(new Phrase("Authorized Signatory",	tabletext));

			HeaderTable9.addCell(new Phrase("", subheader));
			HeaderTable9.addCell(new Phrase("" + user_name, subheader));

			document.add(HeaderTable9);
			HeaderTable9.flushContent();

			document.close();

			outStream.flush();
			outStream.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	%>

</body>
</html>