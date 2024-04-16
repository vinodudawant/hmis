<%@page import="com.hms.ehat.dto.SponsorCustomWardNameDTO"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientSubServiceDetailsForIpdPackage"%>
<%@page import="com.hms.pathology.service.SponsorCustomTestNameService"%>
<%@page import="com.hms.opdbill.dto.PatientSubServiceDetailsDto"%>
<%@page import="com.hms.opdbill.dto.PatientServiceDetailsDto"%>
<%@page import="com.hms.ipd.service.IpdBillMgtService"%>
<%@page import="com.hms.opdbill.dto.PatientHeaderInfoDto"%>
<%@page import="com.hms.ipd.service.BedMgtService"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientServiceDetailIpdDto"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientSubServiceDetailsIpdDto"%>
<%@page import="com.hms.ipdbill.service.IpdBillService"%>
<%@page import="com.hms.ehat.dto.BillNobleServiceDto"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>
<%@page import="org.springframework.format.datetime.joda.DateTimeFormatterFactory"%>
<%@page import="com.hms.ehat.dto.BillQuotationDto"%>
<%@page import="com.itextpdf.text.pdf.draw.DottedLineSeparator"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="org.jsoup.Jsoup"%>
<%@page import="com.hms.ipdbill.controller.BillController"%>
<%@page import="com.hms.ipdbill.dto.BillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.dto.BillRefundMasterDTO"%>

<%@page import="com.hms.ipdbill.controller.IpdBillController"%>
<%@page import="com.hms.ehat.dto.CghsIpdDto"%>
<%@page import="com.hms.ipdbill.dto.IpdBillReceiptMasterDTO"%>



<%@page import="com.hms.hisab.model.HisabModel"%>
<%@page import="com.hms.ipdbill.dto.BillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.serviceImpl.BillServiceImpl"%>
<%@page import="com.hms.ipdbill.service.BillService"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.dto.RadiationMaster"%>

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
<title>IPD Service Wise Print</title>

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
		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		
		response.setHeader("Content-Disposition", "inline; filename = IPD Service-Wise Print");
		
		//for centerpatientId
	    String patientId= resourceBundle.getObject("patientIdLabel").toString();	
		
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
		int unitId = (Integer)session.getAttribute("uId");
		
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
		String hPhoneNo   = PhoneNo+"/"+secPhoneNo;
		String nabh = hospObj.getNabhImagePath(); 
		String nabhLogo = application.getRealPath(nabh);
		
		Image img = null;
		PdfPCell cell = null;
		try {
			img = Image.getInstance(path1);
			img.scaleAbsolute(100, 60);
			cell = new PdfPCell();
			cell.addElement(new Chunk(img, 1, -40));
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
		
		DecimalFormat df2 = new DecimalFormat("0.00");
		
		int servId=Integer.parseInt(request.getParameter("servId"));
		int treatId=Integer.parseInt(request.getParameter("treatId"));			
		String callfrom=request.getParameter("callfrom");
		String Prev=request.getParameter("Prev");
		String treatIdString=request.getParameter("treatId");
		String departmentId=request.getParameter("deptId");
		String billDetailsId="";
		//if(servId==11){
		billDetailsId=request.getParameter("billDetailsId").toString();
		//}
		//String servName=request.getParameter("servName");
		int patID=Integer.parseInt(request.getParameter("patID"));
		
		NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");
		
		
		document.newPage();
		// Table 1 : For hospital adress details start
		
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
			Font bold = new Font(FontFamily.TIMES_ROMAN, 12, Font.BOLD);
			Phrase p = new Phrase();
			p.add(new Chunk(" "+hospitalName, bold));			
			p.add(new Chunk(" \n\n"+address, tabletext));			
			p.add(new Chunk(" "+city+" Pin- "+hospitalZip+"\n", tabletext));
			p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
            if(!webste.equalsIgnoreCase("")){
			p.add(new Chunk(" \n "+webste, tabletext));
			}
			p.add(new Chunk(" \n "+"email: "+email, tabletext));			//p.add(new Chunk(" \nPAN No : "+panNo , tabletext));		
		//	p.add(new Chunk(" \nSERVICE TAX NO: "+serviceTaxNo+", PAN No: "+panNo, regular));	
			
			PdfPCell hospitalNameCell = new PdfPCell(p);				
			hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
			HeaderTable1.addCell(hospitalNameCell);
			
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
			
			// Table 1 : For hospital adress details end
					
					// Table 1 : For hospital adress details end

		PdfPTable HeaderTable8 = new PdfPTable(1);
		int[] headerwidth8 = {100};
		HeaderTable8.setWidths(headerwidth8);
		HeaderTable8.setWidthPercentage(98f);
		HeaderTable8.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable8.getDefaultCell().setBorder(Rectangle.BOTTOM);
		HeaderTable8.addCell(new Phrase("  ", header));
		HeaderTable8.addCell(new Phrase("  Service Wise Bill", header));			
					
		document.add(HeaderTable8);
		HeaderTable8.flushContent();		
		
	 			
		//new table no 5 start
		BedMgtService uss = (ApplicationContextUtils.getApplicationContext()).getBean(BedMgtService.class);
		PatientHeaderInfoDto rtd = new PatientHeaderInfoDto();			
		List<RegTreBillDto> ltPatientRecord = null;
		rtd=uss.getIpdPatientHeaderInfo(treatId, unitId);
		rtd=rtd.getListRegTreBillDto().get(0);
		SponsorCustomTestNameService sponsorCustom  = (ApplicationContextUtils.getApplicationContext()).getBean(SponsorCustomTestNameService.class);
		//use for patient full address
		String addressPatient = "";
		
		SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss a");
		String CreatedDtTm=dateformatter.format(rtd.getCreatedDateTime());
		 int stateId = rtd.getStateId();
		 int townId   =rtd.getTownId();
		 int districtId =rtd.getDistrictId();
		 int talukaId   =rtd.getTalukaId();
		 
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
			addressPatient +=  (","+taluka);
		}						
		if (district != "0" && !district.equals("undefined") && !district.equals("")) 
		{
			addressPatient += ("," + district);
		}
		if (state != "0" && !state.equals("undefined") && !state.equals("")) 
		{
			addressPatient += ("," + state);
		}
		
		
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Date date = new Date();
		String curDate=dateFormat.format(date);
		
		
		
		PdfPTable HeaderTable5 = new PdfPTable(4);
		int[] headerwidth5 = { 15,40,15,30};
		HeaderTable5.setWidths(headerwidth5);
		HeaderTable5.setWidthPercentage(95f);		
		
		HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		
		
	/* 	HeaderTable5.addCell(new Phrase("Patient ID", subheader));
		HeaderTable5.addCell(new Phrase(": "+patID, tabletext)); */
		// added by sandip
		if(patientId.equalsIgnoreCase("UHID")){
				HeaderTable5.addCell(new Phrase(" "+patientId,subheader));
				HeaderTable5.addCell(new Phrase(": "+rtd.getCenterPatientId(),tabletext));
		}else{
    			HeaderTable5.addCell(new Phrase(""+patientId, subheader));
				HeaderTable5.addCell(new Phrase(": "+patID, tabletext));
    	}
		//HeaderTable5.addCell(new Phrase("Treatment ID", subheader));
		//HeaderTable5.addCell(new Phrase(": "+treatId, tabletext));
		
		
		HeaderTable5.addCell(new Phrase("Patient Name ", subheader));
		HeaderTable5.addCell(new Phrase(": "+ rtd.getPatientName(), tabletext));			
		HeaderTable5.addCell(new Phrase("Gender", subheader));
		HeaderTable5.addCell(new Phrase(": "+rtd.getGender(), tabletext));
		
		HeaderTable5.addCell(new Phrase("Address", subheader));
		HeaderTable5.addCell(new Phrase(": "+ rtd.getAddress().toLowerCase()+" "+addressPatient.toLowerCase(), tabletext));			
		HeaderTable5.addCell(new Phrase("Contact", subheader));
		HeaderTable5.addCell(new Phrase(": "+rtd.getMobile(), tabletext));
		
		HeaderTable5.addCell(new Phrase("Admission Date ", subheader));
		HeaderTable5.addCell(new Phrase(": "+CreatedDtTm , tabletext));			
		HeaderTable5.addCell(new Phrase("Age", subheader));
		HeaderTable5.addCell(new Phrase(": "+rtd.getAge(), tabletext));
		
		HeaderTable5.addCell(new Phrase("Receipt Date", subheader));
		HeaderTable5.addCell(new Phrase(": "+curDate, tabletext));			
		HeaderTable5.addCell(new Phrase("Bill No       ", subheader));
		HeaderTable5.addCell(new Phrase(": "+ rtd.getInvoiceCount(), tabletext));
		
		HeaderTable5.addCell(new Phrase("Sponsor ", subheader));
		HeaderTable5.addCell(new Phrase(": "+BillCategoryName, tabletext));			
		//HeaderTable5.addCell(new Phrase("", subheader));
		//HeaderTable5.addCell(new Phrase("", tabletext));
		
		//AdminModel admodel1 = new AdminModel();
		/* Doctor doc2 = new Doctor();
		List<Doctor> listDoc2 = null;

		
		if(rtd.getDoctorId().contains(",")){
			
			
			String[] doctors = rtd.getDoctorId().split(",") ;
			String Doc_Nme = "";
			String Depart = "";
			int cnt=0;
			for(String str :doctors )
			{
				String DocID = str;
				int docId23 =  Integer.parseInt(str);
				listDoc2 = admodel1.getDoctorsDepDetails(docId23);
				 Doc_Nme = Doc_Nme + listDoc2.get(0).getDoc_name()+",";
				 if(listDoc2.get(0).getDepartmentName()!=null){
					 if(cnt==0){
						 Depart = Depart + listDoc2.get(0).getDepartmentName();
						 cnt++;
					 }else{
					 	Depart = Depart +","+listDoc2.get(0).getDepartmentName();
					 }
				 }
						
			}
			HeaderTable5.addCell(new Phrase("Consultant", subheader));
			HeaderTable5.addCell(new Phrase(": "+Doc_Nme, tabletext));			
			HeaderTable5.addCell(new Phrase("Department", subheader));
			HeaderTable5.addCell(new Phrase(": "+Depart, tabletext));
			
		}
		else{
			if(rtd.getDoctorId() != ""){
				 
				int docId1 =  Integer.parseInt(rtd.getDoctorId());
				listDoc2 = admodel1.getDoctorsDepDetails(docId1);
				HeaderTable5.addCell(new Phrase("Consultant Doc.", subheader));
				HeaderTable5.addCell(new Phrase(": "+listDoc2.get(0).getDoc_name(), tabletext));			
				HeaderTable5.addCell(new Phrase("Department", subheader));
				if(listDoc2.get(0).getDepartmentName()!=null){
					HeaderTable5.addCell(new Phrase(": "+listDoc2.get(0).getDepartmentName(), tabletext));
				}else{
					HeaderTable5.addCell(new Phrase(": ", tabletext));
				}
			}
		} */
		/* HeaderTable5.addCell(new Phrase("Sponser               : ", subheader));
		HeaderTable5.addCell(new Phrase("", tabletext));			
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", tabletext)); */
		
		HeaderTable5.addCell(new Phrase("Consultant Doc.", subheader));
		HeaderTable5.addCell(new Phrase(": "+rtd.getConsultingDocName(), tabletext));			
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", tabletext));
		
		HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
		
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		HeaderTable5.addCell(new Phrase("", subheader));
		
		document.add(HeaderTable5);
		HeaderTable5.flushContent();
		//End table no 5 start
			
		//for consulting charges
		//IpdBillService obje=(ApplicationContextUtils.getApplicationContext()).getBean(IpdBillService.class);
		//List<EhatViewPatientSubServiceDetailsIpdDto> listBillDetails = new ArrayList<EhatViewPatientSubServiceDetailsIpdDto>();
		//listBillDetails =obje.getPatientServiceBill(treatId,servId);
		IpdBillMgtService billService = (ApplicationContextUtils.getApplicationContext()).getBean(IpdBillMgtService.class);				
		
		PatientServiceDetailsDto objServive = new PatientServiceDetailsDto();
		objServive.setTreatmentId(treatId);
		objServive.settFlag("AT");
		List<PatientServiceDetailsDto> listServDetails = billService.getPatientServiceDetails(objServive).getListServiceIpdDto();
		
		PatientSubServiceDetailsDto objSubServive = new PatientSubServiceDetailsDto();
		objSubServive.setTreatmentId(treatId);
		objSubServive.setServiceId(servId);
		objSubServive.setDrdeskflag("print");
		List<PatientSubServiceDetailsDto> listBillDetails = billService.getPatientSubServiceDetails(objSubServive).getListSubServiceIpdDto();
		if(billService.getPatientSubServiceDetails(objSubServive).getListBillNobleServiceDto().size()  > 0)
		listBillDetails.addAll(billService.getPatientSubServiceDetails(objSubServive).getListBillNobleServiceDto());
		if(billService.getPatientSubServiceDetails(objSubServive).getListSubServiceInventoryDto().size()  > 0)
		listBillDetails.addAll(billService.getPatientSubServiceDetails(objSubServive).getListSubServiceInventoryDto());
		
		//for Bed Services
		IpdBillService obje1=(ApplicationContextUtils.getApplicationContext()).getBean(IpdBillService.class);
		List<EhatViewPatientBedDetailsIpdDto> listBedDetails = new ArrayList<EhatViewPatientBedDetailsIpdDto>();
		listBedDetails =obje1.getPatientBedBill(treatId,servId);
		
		//IpdBillService obje2=(ApplicationContextUtils.getApplicationContext()).getBean(IpdBillService.class);
		//List<EhatViewPatientServiceDetailIpdDto> listServDetails = new ArrayList<EhatViewPatientServiceDetailIpdDto>();
		
		/* if(Prev.equalsIgnoreCase("Yes")){
			listServDetails =obje2.getIpdPatientServiceListFromView(treatId,"treatcloseForIpd",request);
		}else{
			listServDetails =obje2.getIpdPatientServiceListFromView(treatId,"openTreatment",request);
		} */ 
	
		String bedName="";
		String serviceName="";
		
		for (int i = 0; i < listServDetails.size(); i++) {
			if(listServDetails.get(i).getServiceId() == servId){
				serviceName=listServDetails.get(i).getServiceName();
			}
		}
		
		double tAmount=0.00f;
		double tAmountPatho=0.00f;
		
		if(concessionFlow.equalsIgnoreCase("on")){
			
			int packServSize = 0;
			//Start table no 2 start
			PdfPTable HeaderTable2 = new PdfPTable(7);
			int[] headerwidth2 = { 25,25,15,15,20,20,20};
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			
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
			PdfPCell cells21 = new PdfPCell(new Phrase("Concession", subheader));
			cells21.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cells21.setBorder(Rectangle.NO_BORDER);
			HeaderTable2.addCell(cells21);
			
			PdfPCell cells22 = new PdfPCell(new Phrase("Payable", subheader));
			cells22.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cells22.setBorder(Rectangle.NO_BORDER);
			HeaderTable2.addCell(cells22);
			
			HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", tabletext)); 
			HeaderTable2.addCell(new Phrase("", tabletext)); 
			HeaderTable2.addCell(new Phrase("", tabletext)); 
			HeaderTable2.addCell(new Phrase("", tabletext)); 
			
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			if(servId == 3){
				for (int i = 0; i < listBedDetails.size(); i++) {			
					String cancle=listBedDetails.get(i).getCancle();
					if(cancle.equalsIgnoreCase("N")){
						if(callfrom.equalsIgnoreCase("sponsor")){
							tAmount=tAmount+(listBedDetails.get(i).getOtherRate() * +listBedDetails.get(i).getQuantity() - +listBedDetails.get(i).getOtherConcession());
							
							HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
							 
							String customName="";
							 if(rtd.getChargesMasterSlaveId() > 0){
								 List<SponsorCustomWardNameDTO> lobj=sponsorCustom.getWardDetailsBysponsorIdandChargeId(rtd.getChargesMasterSlaveId(), listBedDetails.get(i).getHallID().intValue());
							       if(lobj.size() > 0){
							    	   customName=lobj.get(0).getCustomWardName();
							       }
							   
							 }
							
							if(!customName.equalsIgnoreCase("")){
								if(listBedDetails.get(i).getSubServiceId() == 0){
									HeaderTable2.addCell(new Phrase("Nursing ( "+customName+" )", tabletext));
								   }else{
									bedName=listBedDetails.get(i).getBedHall();
									HeaderTable2.addCell(new Phrase(""+customName, tabletext));							
								 }
							}else{
								if(listBedDetails.get(i).getSubServiceId() == 0){
									HeaderTable2.addCell(new Phrase("Nursing ( "+bedName+" )", tabletext));
								   }else{
									bedName=listBedDetails.get(i).getBedHall();
									HeaderTable2.addCell(new Phrase(""+listBedDetails.get(i).getBedHall(), tabletext));							
								 }
						    }
							
							
							PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBedDetails.get(i).getOtherRate()), tabletext));
							cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells3.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells3);
							
							PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBedDetails.get(i).getQuantity()), tabletext));
							cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells4.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells4);
							
							PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBedDetails.get(i).getOtherAmount()), tabletext));
							cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells5.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells5);
							
							PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBedDetails.get(i).getOtherConcession()), tabletext));
							cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells51.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells51);
							
							PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBedDetails.get(i).getOtherPay()), tabletext));
							cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells52.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells52);
											
						} else { 
							tAmount=tAmount+(listBedDetails.get(i).getRate() * +listBedDetails.get(i).getQuantity() - +listBedDetails.get(i).getConcession());
							
							HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
							
							String customName="";
							 if(rtd.getChargesMasterSlaveId() > 0){
								 List<SponsorCustomWardNameDTO> lobj=sponsorCustom.getWardDetailsBysponsorIdandChargeId(rtd.getChargesMasterSlaveId(), listBedDetails.get(i).getHallID().intValue());
							       if(lobj.size() > 0){
							    	   customName=lobj.get(0).getCustomWardName();
							       }
							   
							 }
							
							if(!customName.equalsIgnoreCase("")){
								if(listBedDetails.get(i).getSubServiceId() == 0){
									HeaderTable2.addCell(new Phrase("Nursing ( "+customName+" )", tabletext));
								   }else{
									bedName=listBedDetails.get(i).getBedHall();
									HeaderTable2.addCell(new Phrase(""+customName, tabletext));							
								 }
							}else{
								if(listBedDetails.get(i).getSubServiceId() == 0){
									HeaderTable2.addCell(new Phrase("Nursing ( "+bedName+" )", tabletext));
								   }else{
									bedName=listBedDetails.get(i).getBedHall();
									HeaderTable2.addCell(new Phrase(""+listBedDetails.get(i).getBedHall(), tabletext));							
								 }
						    }
							
							
							PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBedDetails.get(i).getRate()), tabletext));
							cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells3.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells3);
							
							PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBedDetails.get(i).getQuantity()), tabletext));
							cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells4.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells4);
							
							PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBedDetails.get(i).getAmount()), tabletext));
							cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells5.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells5);
							
							PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBedDetails.get(i).getConcession()), tabletext));
							cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells51.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells51);
							
							PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBedDetails.get(i).getCoPay()), tabletext));
							cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells52.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells52);
							
						 }
					}
				}
			}else{  
				
				for (int i = 0; i < listBillDetails.size(); i++) {			
					String cancle=listBillDetails.get(i).getCancle();
					String cghsCode = listBillDetails.get(i).getCghsCode();
					if(cghsCode.equalsIgnoreCase("") || cghsCode.equalsIgnoreCase("-") || cghsCode=="()" || cghsCode.equalsIgnoreCase("(-)") || cghsCode.equalsIgnoreCase("(null)")){
						cghsCode="";
					}else{
						
						cghsCode = "("+listBillDetails.get(i).getCghsCode()+")";
					}
					
					if(cancle.equalsIgnoreCase("N")){
						if(callfrom.equalsIgnoreCase("sponsor")){
							  String sname="";
							  if(rtd.getChargesMasterSlaveId() > 0){
								  sname=sponsorCustom.getSponsorCustomTestName(rtd.getChargesMasterSlaveId(), listBillDetails.get(i).getServiceId(), listBillDetails.get(i).getSubServiceId());
							  }
							tAmount=tAmount+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity() - +listBillDetails.get(i).getOtherConcession());
							if(servId==2){
								
								String[] bdi = null;
								// get checked service masters
								if(billDetailsId.length()>0){
									
									bdi=billDetailsId.split(",");
									
									for(String id:bdi){
										int billDetailsIdd=Integer.parseInt(id);
										if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
											
											tAmountPatho=tAmountPatho+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity() - +listBillDetails.get(i).getOtherConcession());
								
								HeaderTable2.addCell(new Phrase(""+serviceName + cghsCode, tabletext));
							
								if(sname.equalsIgnoreCase("")){
								   HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getDocName(), tabletext));
								}else{
									 HeaderTable2.addCell(new Phrase(""+sname, tabletext));
								}
								
	
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherConcession()), tabletext));
								cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells51.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells51);
								
								PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherPay()), tabletext));
								cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells52.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells52);
								
										}
									}
								}
								
							}else if(servId==4){
								
								String[] bdi = null;
								// get checked service masters
								if(billDetailsId.length()>0){
									
									bdi=billDetailsId.split(",");
									
									for(String id:bdi){
										int billDetailsIdd=Integer.parseInt(id);
										if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
											
											tAmountPatho=tAmountPatho+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity() - +listBillDetails.get(i).getOtherConcession());
	
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));

								if(sname.equalsIgnoreCase("")){
								   HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, tabletext));
								}else{
									 HeaderTable2.addCell(new Phrase(""+sname, tabletext));
								}
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, tabletext));
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherConcession()), tabletext));
								cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells51.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells51);
								
								PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherPay()), tabletext));
								cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells52.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells52);
								
								
										}
									}
								}
							}else if(servId==5){
								
								String[] bdi = null;
								// get checked service masters
								if(billDetailsId.length()>0){
									
									bdi=billDetailsId.split(",");
									
									for(String id:bdi){
										int billDetailsIdd=Integer.parseInt(id);
										if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
											
											tAmountPatho=tAmountPatho+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity() - +listBillDetails.get(i).getOtherConcession());
								
								HeaderTable2.addCell(new Phrase(""+serviceName + cghsCode, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getDocName(), tabletext));
								
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherConcession()), tabletext));
								cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells51.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells51);
								
								PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherPay()), tabletext));
								cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells52.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells52);
										}
									}
								}
								
							}else if(servId==11){
		
								String[] bdi = null;
								// get checked service masters
								if(billDetailsId.length()>0){
									
									bdi=billDetailsId.split(",");
									
									for(String id:bdi){
										int billDetailsIdd=Integer.parseInt(id);
										if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
											
											tAmountPatho=tAmountPatho+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity() - +listBillDetails.get(i).getOtherConcession());
		
		
											HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
											
										//	HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, tabletext));
											if(sname.equalsIgnoreCase("")){
												HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, tabletext));
												}else{
													 HeaderTable2.addCell(new Phrase(""+sname, tabletext));
												}
											PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
											cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells3.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells3);
											
											PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
											cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells4.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells4);
											
											PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), tabletext));
											cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells5.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells5);
											
											PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherConcession()), tabletext));
											cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells51.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells51);
											
											PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherPay()), tabletext));
											cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells52.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells52);
											
										}
									}
								}	
							
							}else if(servId==13){
								
								String[] bdi = null;
								// get checked service masters
								if(billDetailsId.length()>0){
									
									bdi=billDetailsId.split(",");
									
									for(String id:bdi){
										int billDetailsIdd=Integer.parseInt(id);
										if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
								
											tAmountPatho=tAmountPatho+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity() - listBillDetails.get(i).getOtherConcession());
								
											// ===================== For package details ========================//
													
											HeaderTable2.addCell(new Phrase(""+serviceName, subheader));
											HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, subheader));
																			
											PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), subheader));
											cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells3.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells3);
											
											PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), subheader));
											cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells4.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells4);
											
											PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), subheader));
											cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells5.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells5);
																			
											PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherConcession()), subheader));
											cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells51.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells51);
											
											PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherPay()), subheader));
											cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells52.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells52);
											
											document.add(HeaderTable2);
											HeaderTable2.flushContent();
											
											int subSrvId = listBillDetails.get(i).getSubServiceId();
											int sponsorId = 0;
											int chagesSlaveId = listBillDetails.get(i).getChargesSlaveId();							
											int billdetailsId = listBillDetails.get(i).getBillDetailsId();
											
											List<EhatViewPatientSubServiceDetailsForIpdPackage> listOpdPackage = new ArrayList<EhatViewPatientSubServiceDetailsForIpdPackage>();
											listOpdPackage= obje1.getPackagedataforIpd(servId,subSrvId,sponsorId,chagesSlaveId,treatId,patID,billdetailsId);
											
											if(listOpdPackage.size() > 0){
												
												PdfPTable HeaderTable4 = new PdfPTable(6);
												int[] headerwidth4 = { 10, 50, 50, 20, 20, 20 };
												HeaderTable4.setWidths(headerwidth4);
												HeaderTable4.setWidthPercentage(95f);
												
												HeaderTable4.getDefaultCell().setBorder(Rectangle.BOTTOM);
												HeaderTable4.addCell(new Phrase("", tabletext));
												HeaderTable4.addCell(new Phrase("", tabletext));
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
												HeaderTable4.addCell(new Phrase("#", tabletext));
												HeaderTable4.addCell(new Phrase("Service Name", tabletext));
												HeaderTable4.addCell(new Phrase("Doctor Name", tabletext));
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
																			
												HeaderTable4.setSpacingAfter(10f);
												document.add(HeaderTable4);
												HeaderTable4.flushContent();
											}
										}
									}
								}																
								
							}else if(servId==14){
								
								String[] bdi = null;
								// get checked service masters
								if(billDetailsId.length()>0){
									
									bdi=billDetailsId.split(",");
									
									for(String id:bdi){
										int billDetailsIdd=Integer.parseInt(id);
										if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
											
											tAmountPatho=tAmountPatho+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity() - +listBillDetails.get(i).getOtherConcession());
								
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getInvName()+ cghsCode, tabletext));
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherConcession()), tabletext));
								cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells51.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells51);
								
								PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherPay()), tabletext));
								cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells52.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells52);
								
										}
									}
								}
								
							}else if(servId==16){
								
								String[] bdi = null;
								// get checked service masters
								if(billDetailsId.length()>0){
									
									bdi=billDetailsId.split(",");
									
									for(String id:bdi){
										int billDetailsIdd=Integer.parseInt(id);
										if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
											
											tAmountPatho=tAmountPatho+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity() - +listBillDetails.get(i).getOtherConcession());
								
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, tabletext));
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherConcession()), tabletext));
								cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells51.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells51);
								
								PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherPay()), tabletext));
								cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells52.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells52);
										}
									}
								}
								
							}
							else if(servId==17){
								//by sandip
								String[] bdi = null;
								// get checked service masters
								if(billDetailsId.length()>0){
									
									bdi=billDetailsId.split(",");
									
									for(String id:bdi){
										int billDetailsIdd=Integer.parseInt(id);
										if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
											
											tAmountPatho=tAmountPatho+(listBillDetails.get(i).getAmount() - +listBillDetails.get(i).getOtherConcession());
								
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, tabletext));
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherConcession()), tabletext));
								cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells51.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells51);
								
								PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherPay()), tabletext));
								cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells52.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells52);
										}
									}
								}
								
							}
							else{
								
								String[] bdi = null;
								// get checked service masters
								if(billDetailsId.length()>0){
									
									bdi=billDetailsId.split(",");
									
									for(String id:bdi){
										int billDetailsIdd=Integer.parseInt(id);
										if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
											
											tAmountPatho=tAmountPatho+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity() - +listBillDetails.get(i).getOtherConcession());
											
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								
								//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, tabletext));
								if(sname.equalsIgnoreCase("")){
									HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, tabletext));
									}else{
										 HeaderTable2.addCell(new Phrase(""+sname, tabletext));
									}
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherConcession()), tabletext));
								cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells51.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells51);
								
								PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherPay()), tabletext));
								cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells52.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells52);
										}
									}
								}
							}
							
						} else {
							tAmount=tAmount+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity() - +listBillDetails.get(i).getConcession());
							if(servId==2){
								
								String[] bdi = null;
								// get checked service masters
								if(billDetailsId.length()>0){
									
									bdi=billDetailsId.split(",");
									
									for(String id:bdi){
										int billDetailsIdd=Integer.parseInt(id);
										if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
											
											tAmountPatho=tAmountPatho+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity() - +listBillDetails.get(i).getConcession());
								
								HeaderTable2.addCell(new Phrase(""+serviceName + cghsCode, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getDocName(), tabletext));
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getConcession()), tabletext));
								cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells51.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells51);
								
								PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getCoPay()), tabletext));
								cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells52.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells52);
										}
									}
								}
								
							}else if(servId==4){
	
								String[] bdi = null;
								// get checked service masters
								if(billDetailsId.length()>0){
									
									bdi=billDetailsId.split(",");
									
									for(String id:bdi){
										int billDetailsIdd=Integer.parseInt(id);
										if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
											
											tAmountPatho=tAmountPatho+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity() - +listBillDetails.get(i).getConcession());
										
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, tabletext));
								
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getConcession()), tabletext));
								cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells51.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells51);
								
								PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getCoPay()), tabletext));
								cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells52.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells52);
								
										}
									}
								}
							
							}else if(servId==5){
								
								String[] bdi = null;
								// get checked service masters
								if(billDetailsId.length()>0){
									
									bdi=billDetailsId.split(",");
									
									for(String id:bdi){
										int billDetailsIdd=Integer.parseInt(id);
										if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
											
											tAmountPatho=tAmountPatho+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity() - +listBillDetails.get(i).getConcession());
										
								HeaderTable2.addCell(new Phrase(""+serviceName + cghsCode, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getDocName(), tabletext));
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getConcession()), tabletext));
								cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells51.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells51);
								
								PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getCoPay()), tabletext));
								cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells52.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells52);
								
										}
									}
								}
								
							}else if(servId==11){
								 String[] bdi = null;
								// get checked service masters
								if(billDetailsId.length()>0){
									
									bdi=billDetailsId.split(",");
									
									for(String id:bdi){
										int billDetailsIdd=Integer.parseInt(id);
										if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
											tAmountPatho=tAmountPatho+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity() - +listBillDetails.get(i).getConcession());

											HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
											HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, tabletext));
											
											
											PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
											cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells3.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells3);
											
											PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
											cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells4.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells4);
											
											PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), tabletext));
											cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells5.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells5);
											
											PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getConcession()), tabletext));
											cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells51.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells51);
											
											PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getCoPay()), tabletext));
											cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells52.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells52);
										}
									}
								}	
								
							}else if(servId == 13){	
								
								String[] bdi = null;
								// get checked service masters
								if(billDetailsId.length()>0){
									
									bdi=billDetailsId.split(",");
									
									for(String id:bdi){
										int billDetailsIdd=Integer.parseInt(id);
										if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
								
											tAmountPatho=tAmountPatho+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity() - listBillDetails.get(i).getConcession());
																
											// ===================== For package details ========================//
													
											HeaderTable2.addCell(new Phrase(""+serviceName, subheader));
											HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, subheader));
																			
											PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), subheader));
											cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells3.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells3);
											
											PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), subheader));
											cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells4.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells4);
											
											PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), subheader));
											cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells5.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells5);
																			
											PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getConcession()), subheader));
											cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells51.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells51);
											
											PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getCoPay()), subheader));
											cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
											cells52.setBorder(Rectangle.NO_BORDER);
											HeaderTable2.addCell(cells52);
											
											document.add(HeaderTable2);
											HeaderTable2.flushContent();
											
											int subSrvId = listBillDetails.get(i).getSubServiceId();
											int sponsorId = 0;
											int chagesSlaveId = listBillDetails.get(i).getChargesSlaveId();							
											int billdetailsId = listBillDetails.get(i).getBillDetailsId();
											
											List<EhatViewPatientSubServiceDetailsForIpdPackage> listOpdPackage = new ArrayList<EhatViewPatientSubServiceDetailsForIpdPackage>();
											listOpdPackage= obje1.getPackagedataforIpd(servId,subSrvId,sponsorId,chagesSlaveId,treatId,patID,billdetailsId);
											
											if(listOpdPackage.size() > 0){
												
												PdfPTable HeaderTable4 = new PdfPTable(6);
												int[] headerwidth4 = { 10, 50, 50, 20, 20, 20 };
												HeaderTable4.setWidths(headerwidth4);
												HeaderTable4.setWidthPercentage(95f);
												
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
												HeaderTable4.addCell(new Phrase("#", tabletext));
												HeaderTable4.addCell(new Phrase("Service Name", tabletext));
												HeaderTable4.addCell(new Phrase("Doctor Name", tabletext));
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
										}
									}
								}																
								
							}else if(servId==14){
								
								String[] bdi = null;
								// get checked service masters
								if(billDetailsId.length()>0){
									
									bdi=billDetailsId.split(",");
									
									for(String id:bdi){
										int billDetailsIdd=Integer.parseInt(id);
										if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
											
											tAmountPatho=tAmountPatho+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity() - +listBillDetails.get(i).getConcession());
											
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, tabletext));
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+listBillDetails.get(i).getAmount(), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getConcession()), tabletext));
								cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells51.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells51);
								
								PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getCoPay()), tabletext));
								cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells52.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells52);
								
										}
									}
								}
								
							}else if(servId==16){
								
								String[] bdi = null;
								// get checked service masters
								if(billDetailsId.length()>0){
									
									bdi=billDetailsId.split(",");
									
									for(String id:bdi){
										int billDetailsIdd=Integer.parseInt(id);
										if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
								
											tAmountPatho=tAmountPatho+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity() - +listBillDetails.get(i).getConcession());
											
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, tabletext));
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getConcession()), tabletext));
								cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells51.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells51);
								
								PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getCoPay()), tabletext));
								cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells52.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells52);
										
										}
									}
								}
								
							}
							else if(servId==17){
								
								String[] bdi = null;
								// get checked service masters
								if(billDetailsId.length()>0){
									
									bdi=billDetailsId.split(",");
									
									for(String id:bdi){
										int billDetailsIdd=Integer.parseInt(id);
										if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
											
											tAmountPatho=tAmountPatho+(listBillDetails.get(i).getAmount() - +listBillDetails.get(i).getOtherConcession());
								
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, tabletext));
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getConcession()), tabletext));
								cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells51.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells51);
								
								PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getCoPay()), tabletext));
								cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells52.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells52);
										}
									}
								}
								
							}
							else{
								
								String[] bdi = null;
								// get checked service masters
								if(billDetailsId.length()>0){
									
									bdi=billDetailsId.split(",");
									
									for(String id:bdi){
										int billDetailsIdd=Integer.parseInt(id);
										if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
											
											tAmountPatho=tAmountPatho+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity() - +listBillDetails.get(i).getConcession());
										
								HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, tabletext));
								
								PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
								cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells3.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells3);
								
								PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
								cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells4.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells4);
								
								PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), tabletext));
								cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells5.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells5);
								
								PdfPCell cells51 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getConcession()), tabletext));
								cells51.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells51.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells51);
								
								PdfPCell cells52 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getCoPay()), tabletext));
								cells52.setHorizontalAlignment(Element.ALIGN_RIGHT);
								cells52.setBorder(Rectangle.NO_BORDER);
								HeaderTable2.addCell(cells52);
								
										}
									}
								}
								
							}
						}
					}
				}
			}

			if(servId != 13 || packServSize == 0){
				HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
			}
			
			document.add(HeaderTable2);
			HeaderTable2.flushContent();
				//end Table 2
	}else{
		
		int packServSize = 0;
		//Start table no 2 start
		PdfPTable HeaderTable2 = new PdfPTable(5);
		int[] headerwidth2 = { 25,25,15,15,20};
		HeaderTable2.setWidths(headerwidth2);
		HeaderTable2.setWidthPercentage(95f);
		
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
		
		HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
		HeaderTable2.addCell(new Phrase("", subheader));
		HeaderTable2.addCell(new Phrase("", subheader));
		HeaderTable2.addCell(new Phrase("", subheader));
		HeaderTable2.addCell(new Phrase("", tabletext)); 
		HeaderTable2.addCell(new Phrase("", tabletext)); 		
		
		HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		if(servId == 3){
			for (int i = 0; i < listBedDetails.size(); i++) {			
				String cancle=listBedDetails.get(i).getCancle();
				if(cancle.equalsIgnoreCase("N")){
					if(callfrom.equalsIgnoreCase("sponsor")){
						
						tAmount=tAmount+(listBedDetails.get(i).getOtherRate() * +listBedDetails.get(i).getQuantity());
						
						HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
						
						String customName="";
						 if(rtd.getChargesMasterSlaveId() > 0){
							 List<SponsorCustomWardNameDTO> lobj=sponsorCustom.getWardDetailsBysponsorIdandChargeId(rtd.getChargesMasterSlaveId(), listBedDetails.get(i).getHallID().intValue());
						       if(lobj.size() > 0){
						    	   customName=lobj.get(0).getCustomWardName();
						       }
						   
						 }
						
						if(!customName.equalsIgnoreCase("")){
							if(listBedDetails.get(i).getSubServiceId() == 0){
								HeaderTable2.addCell(new Phrase("Nursing ( "+customName+" )", tabletext));
							   }else{
								
								HeaderTable2.addCell(new Phrase(""+customName, tabletext));							
							 }
						}else{
							if(listBedDetails.get(i).getSubServiceId() == 0){
								HeaderTable2.addCell(new Phrase("Nursing ( "+bedName+" )", tabletext));
							   }else{
								HeaderTable2.addCell(new Phrase(""+listBedDetails.get(i).getBedHall(), tabletext));							
							 }
					    }
							
						
						PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBedDetails.get(i).getOtherRate()), tabletext));
						cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
						cells3.setBorder(Rectangle.NO_BORDER);
						HeaderTable2.addCell(cells3);
						
						PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBedDetails.get(i).getQuantity()), tabletext));
						cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
						cells4.setBorder(Rectangle.NO_BORDER);
						HeaderTable2.addCell(cells4);
						
						PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBedDetails.get(i).getOtherAmount()), tabletext));
						cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
						cells5.setBorder(Rectangle.NO_BORDER);
						HeaderTable2.addCell(cells5);
											
					} else { 
						
						tAmount=tAmount+(listBedDetails.get(i).getRate() * +listBedDetails.get(i).getQuantity());
						HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
						
						String customName="";
						 if(rtd.getChargesMasterSlaveId() > 0){
							 List<SponsorCustomWardNameDTO> lobj=sponsorCustom.getWardDetailsBysponsorIdandChargeId(rtd.getChargesMasterSlaveId(), listBedDetails.get(i).getHallID().intValue());
						       if(lobj.size() > 0){
						    	   customName=lobj.get(0).getCustomWardName();
						       }
						   
						 }
						
						if(!customName.equalsIgnoreCase("")){
							if(listBedDetails.get(i).getSubServiceId() == 0){
								HeaderTable2.addCell(new Phrase("Nursing ( "+customName+" )", tabletext));
							   }else{
								bedName=listBedDetails.get(i).getBedHall();
								HeaderTable2.addCell(new Phrase(""+customName, tabletext));							
							 }
						}else{
							if(listBedDetails.get(i).getSubServiceId() == 0){
								HeaderTable2.addCell(new Phrase("Nursing ( "+bedName+" )", tabletext));
							   }else{
								bedName=listBedDetails.get(i).getBedHall();
								HeaderTable2.addCell(new Phrase(""+listBedDetails.get(i).getBedHall(), tabletext));							
							 }
					    }
						
				
						
						PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBedDetails.get(i).getRate()), tabletext));
						cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
						cells3.setBorder(Rectangle.NO_BORDER);
						HeaderTable2.addCell(cells3);
						
						PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBedDetails.get(i).getQuantity()), tabletext));
						cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
						cells4.setBorder(Rectangle.NO_BORDER);
						HeaderTable2.addCell(cells4);
						
						PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBedDetails.get(i).getAmount()), tabletext));
						cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
						cells5.setBorder(Rectangle.NO_BORDER);
						HeaderTable2.addCell(cells5);
						
					 }
				}
			}
		}else{  
			
			for (int i = 0; i < listBillDetails.size(); i++) {			
				
				String cancle=listBillDetails.get(i).getCancle();
				String cghsCode = listBillDetails.get(i).getCghsCode();
				if(cghsCode.equalsIgnoreCase("") || cghsCode.equalsIgnoreCase("-") || cghsCode=="()" || cghsCode.equalsIgnoreCase("(-)") || cghsCode.equalsIgnoreCase("(null)")){
					cghsCode="";
				}else{
					
					cghsCode = "("+listBillDetails.get(i).getCghsCode()+")";
				}				
				
				if(cancle.equalsIgnoreCase("N")){
					if(callfrom.equalsIgnoreCase("sponsor")){
						String sname="";
						  if(rtd.getChargesMasterSlaveId() > 0){
							  sname=sponsorCustom.getSponsorCustomTestName(rtd.getChargesMasterSlaveId(), listBillDetails.get(i).getServiceId(), listBillDetails.get(i).getSubServiceId());
						  }
						tAmount=tAmount+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity());
						if(servId==2){
							
							String[] bdi = null;
							// get checked service masters
							if(billDetailsId.length()>0){
								
								bdi=billDetailsId.split(",");
								
								for(String id:bdi){
									int billDetailsIdd=Integer.parseInt(id);
									if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
							
										tAmountPatho=tAmountPatho+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity());
										
							HeaderTable2.addCell(new Phrase(""+serviceName + cghsCode, tabletext));
							//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getDocName(), tabletext));

							if(sname.equalsIgnoreCase("")){
							   HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getDocName(), tabletext));
							}else{
								 HeaderTable2.addCell(new Phrase(""+sname, tabletext));
							}

							PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
							cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells3.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells3);
							
							PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
							cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells4.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells4);
							
							PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
							cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells5.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells5);
							
									}
								}
							}
							
						}else if(servId==5){
							
							String[] bdi = null;
							// get checked service masters
							if(billDetailsId.length()>0){
								
								bdi=billDetailsId.split(",");
								
								for(String id:bdi){
									int billDetailsIdd=Integer.parseInt(id);
									if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
							
										tAmountPatho=tAmountPatho+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity());
										
							HeaderTable2.addCell(new Phrase(""+serviceName + cghsCode, tabletext));
							HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getDocName(), tabletext));
							
							PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
							cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells3.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells3);
							
							PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
							cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells4.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells4);
							
							PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), tabletext));
							cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells5.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells5);
							
									}
								}
							}
							
						}else if(servId==11){

							String[] bdi = null;
							// get checked service masters
							if(billDetailsId.length()>0){
								
								bdi=billDetailsId.split(",");
								
								for(String id:bdi){
									int billDetailsIdd=Integer.parseInt(id);
									if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
										
										tAmountPatho=tAmountPatho+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity());

										HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
										//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, tabletext));

										if(sname.equalsIgnoreCase("")){
											HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, tabletext));
										}else{
											 HeaderTable2.addCell(new Phrase(""+sname, tabletext));
										}
										PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
										cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
										cells3.setBorder(Rectangle.NO_BORDER);
										HeaderTable2.addCell(cells3);
										
										PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
										cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
										cells4.setBorder(Rectangle.NO_BORDER);
										HeaderTable2.addCell(cells4);
										
										PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), tabletext));
										cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
										cells5.setBorder(Rectangle.NO_BORDER);
										HeaderTable2.addCell(cells5);
										
									}
								}
							}	
							
						}else if(servId == 13){
							
							String[] bdi = null;
							// get checked service masters
							if(billDetailsId.length()>0){
								
								bdi=billDetailsId.split(",");
								
								for(String id:bdi){
									int billDetailsIdd=Integer.parseInt(id);
									if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
							
										tAmountPatho=tAmountPatho+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity());
							
										// ===================== For package details ========================//
												
										HeaderTable2.addCell(new Phrase(""+serviceName, subheader));
										HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, subheader));
																		
										PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), subheader));
										cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
										cells3.setBorder(Rectangle.NO_BORDER);
										HeaderTable2.addCell(cells3);
										
										PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), subheader));
										cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
										cells4.setBorder(Rectangle.NO_BORDER);
										HeaderTable2.addCell(cells4);
										
										PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), subheader));
										cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
										cells5.setBorder(Rectangle.NO_BORDER);
										HeaderTable2.addCell(cells5);
										
										document.add(HeaderTable2);
										HeaderTable2.flushContent();
										
										int subSrvId = listBillDetails.get(i).getSubServiceId();
										int sponsorId = 0;
										int chagesSlaveId = listBillDetails.get(i).getChargesSlaveId();							
										int billdetailsId = listBillDetails.get(i).getBillDetailsId();
										
										List<EhatViewPatientSubServiceDetailsForIpdPackage> listOpdPackage = new ArrayList<EhatViewPatientSubServiceDetailsForIpdPackage>();
										listOpdPackage= obje1.getPackagedataforIpd(servId,subSrvId,sponsorId,chagesSlaveId,treatId,patID,billdetailsId);
										
										if(listOpdPackage.size() > 0){
											
											PdfPTable HeaderTable4 = new PdfPTable(6);
											int[] headerwidth4 = { 10, 50, 50, 20, 20, 20 };
											HeaderTable4.setWidths(headerwidth4);
											HeaderTable4.setWidthPercentage(95f);
											
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
											HeaderTable4.addCell(new Phrase("#", tabletext));
											HeaderTable4.addCell(new Phrase("Service Name", tabletext));
											HeaderTable4.addCell(new Phrase("Doctor Name", tabletext));
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
											
											HeaderTable4.setSpacingAfter(10f);
											document.add(HeaderTable4);
											HeaderTable4.flushContent();
										}
									}
								}
							}
							
						}else if(servId==14){
							
							String[] bdi = null;
							// get checked service masters
							if(billDetailsId.length()>0){
								
								bdi=billDetailsId.split(",");
								
								for(String id:bdi){
									int billDetailsIdd=Integer.parseInt(id);
									if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
							
										tAmountPatho=tAmountPatho+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity());
										
							HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
							HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, tabletext));
							
							PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
							cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells3.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells3);
							
							PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
							cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells4.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells4);
							
							PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), tabletext));
							cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells5.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells5);
							
									}
								}
							}
							
						}else if(servId==16){
							
							String[] bdi = null;
							// get checked service masters
							if(billDetailsId.length()>0){
								
								bdi=billDetailsId.split(",");
								
								for(String id:bdi){
									int billDetailsIdd=Integer.parseInt(id);
									if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
							
										tAmountPatho=tAmountPatho+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity());
										
							HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
							HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, tabletext));
							
							PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
							cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells3.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells3);
							
							PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
							cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells4.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells4);
							
							PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), tabletext));
							cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells5.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells5);
							
									}
								}
							}
						}
						else if(servId==17){
							
							String[] bdi = null;
							// get checked service masters
							if(billDetailsId.length()>0){
								
								bdi=billDetailsId.split(",");
								
								for(String id:bdi){
									int billDetailsIdd=Integer.parseInt(id);
									if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
										
										tAmountPatho=tAmountPatho+(listBillDetails.get(i).getAmount() - +listBillDetails.get(i).getOtherConcession());
							
							HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
							HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, tabletext));
							
							PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
							cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells3.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells3);
							
							PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
							cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells4.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells4);
							
							PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), tabletext));
							cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells5.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells5);
							
									}
								}
							}
							
						}
						else{
							
							String[] bdi = null;
							// get checked service masters
							if(billDetailsId.length()>0){
								
								bdi=billDetailsId.split(",");
								
								for(String id:bdi){
									int billDetailsIdd=Integer.parseInt(id);
									if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
							
										tAmountPatho=tAmountPatho+(listBillDetails.get(i).getOtherRate() * +listBillDetails.get(i).getQuantity());
										
							HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
							//HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, tabletext));
							if(sname.equalsIgnoreCase("")){
								HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, tabletext));
							}else{
								 HeaderTable2.addCell(new Phrase(""+sname, tabletext));
							}
							PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherRate()), tabletext));
							cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells3.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells3);
							
							PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
							cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells4.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells4);
							
							PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getOtherAmount()), tabletext));
							cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells5.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells5);
									
									}
								}
							}
						}
						
					} else {
						tAmount=tAmount+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity());
						if(servId==2){
							
							String[] bdi = null;
							// get checked service masters
							if(billDetailsId.length()>0){
								
								bdi=billDetailsId.split(",");
								
								for(String id:bdi){
									int billDetailsIdd=Integer.parseInt(id);
									if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
							
										tAmountPatho=tAmountPatho+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity());
										
							HeaderTable2.addCell(new Phrase(""+serviceName + cghsCode, tabletext));
							HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getDocName(), tabletext));
							
							PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
							cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells3.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells3);
							
							PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
							cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells4.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells4);
							
							PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
							cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells5.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells5);
							
									}
								}
							}
							
						}else if(servId==5){
							
							String[] bdi = null;
							// get checked service masters
							if(billDetailsId.length()>0){
								
								bdi=billDetailsId.split(",");
								
								for(String id:bdi){
									int billDetailsIdd=Integer.parseInt(id);
									if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
							
										tAmountPatho=tAmountPatho+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity());
										
							HeaderTable2.addCell(new Phrase(""+serviceName + cghsCode, tabletext));
							HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getDocName(), tabletext));
							
							PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
							cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells3.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells3);
							
							PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
							cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells4.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells4);
							
							PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), tabletext));
							cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells5.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells5);
								
									}
								}
							}
									
							
						}else if(servId==11){

							String[] bdi = null;
							// get checked service masters
							if(billDetailsId.length()>0){
								
								bdi=billDetailsId.split(",");
								
								for(String id:bdi){
									int billDetailsIdd=Integer.parseInt(id);
									if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
										tAmountPatho=tAmountPatho+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity());

										HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
										HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, tabletext));
										
										
										PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
										cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
										cells3.setBorder(Rectangle.NO_BORDER);
										HeaderTable2.addCell(cells3);
										
										PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
										cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
										cells4.setBorder(Rectangle.NO_BORDER);
										HeaderTable2.addCell(cells4);
										
										PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), tabletext));
										cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
										cells5.setBorder(Rectangle.NO_BORDER);
										HeaderTable2.addCell(cells5);
										
									}
								}
							}
							
						}else if(servId == 13){
							
							String[] bdi = null;
							// get checked service masters
							if(billDetailsId.length()>0){
								
								bdi=billDetailsId.split(",");
								
								for(String id:bdi){
									int billDetailsIdd=Integer.parseInt(id);
									if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
							
										tAmountPatho=tAmountPatho+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity());
						
										// ===================== For package details ========================//
												
										HeaderTable2.addCell(new Phrase(""+serviceName, subheader));
										HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, subheader));
																		
										PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), subheader));
										cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
										cells3.setBorder(Rectangle.NO_BORDER);
										HeaderTable2.addCell(cells3);
										
										PdfPCell cells4 = new PdfPCell(new Phrase(""+Math.round(listBillDetails.get(i).getQuantity()), subheader));
										cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
										cells4.setBorder(Rectangle.NO_BORDER);
										HeaderTable2.addCell(cells4);
										
										PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), subheader));
										cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
										cells5.setBorder(Rectangle.NO_BORDER);
										HeaderTable2.addCell(cells5);
											
										document.add(HeaderTable2);
										HeaderTable2.flushContent();
										
										int subSrvId = listBillDetails.get(i).getSubServiceId();
										int sponsorId = 0;
										int chagesSlaveId = listBillDetails.get(i).getChargesSlaveId();							
										int billdetailsId = listBillDetails.get(i).getBillDetailsId();
										
										List<EhatViewPatientSubServiceDetailsForIpdPackage> listOpdPackage = new ArrayList<EhatViewPatientSubServiceDetailsForIpdPackage>();
										listOpdPackage= obje1.getPackagedataforIpd(servId,subSrvId,sponsorId,chagesSlaveId,treatId,patID,billdetailsId);
										
										if(listOpdPackage.size() > 0){
										
											packServSize = 1;
											PdfPTable HeaderTable4 = new PdfPTable(6);
											int[] headerwidth4 = { 10, 50, 50, 20, 20, 20 };
											HeaderTable4.setWidths(headerwidth4);
											HeaderTable4.setWidthPercentage(95f);
											
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
											HeaderTable4.addCell(new Phrase("#", tabletext));
											HeaderTable4.addCell(new Phrase("Service Name", tabletext));
											HeaderTable4.addCell(new Phrase("Doctor Name", tabletext));
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
									}
								}
							}
																						
						}else if(servId==14){
							
							String[] bdi = null;
							// get checked service masters
							if(billDetailsId.length()>0){
								
								bdi=billDetailsId.split(",");
								
								for(String id:bdi){
									int billDetailsIdd=Integer.parseInt(id);
									if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
							
										tAmountPatho=tAmountPatho+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity());
										
							HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
							HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, tabletext));
							
							PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
							cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells3.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells3);
							
							PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
							cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells4.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells4);
							
							PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), tabletext));
							cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells5.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells5);
							
									}
								}
							}
							
						}else if(servId==16){							
							
							String[] bdi = null;
							// get checked service masters
							if(billDetailsId.length()>0){
								
								bdi=billDetailsId.split(",");
								
								for(String id:bdi){
									int billDetailsIdd=Integer.parseInt(id);
									if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
							
										tAmountPatho=tAmountPatho+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity());
										
							HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
							HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, tabletext));
							
							PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
							cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells3.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells3);
							
							PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
							cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells4.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells4);
							
							PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), tabletext));
							cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells5.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells5);
							
									}
								}
							}
							
						}
						else if(servId==17){
							
							String[] bdi = null;
							// get checked service masters
							if(billDetailsId.length()>0){
								
								bdi=billDetailsId.split(",");
								
								for(String id:bdi){
									int billDetailsIdd=Integer.parseInt(id);
									if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
										
										tAmountPatho=tAmountPatho+(listBillDetails.get(i).getOtherAmount() - +listBillDetails.get(i).getOtherConcession());
							
							HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
							HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName()+ cghsCode, tabletext));
							
							PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
							cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells3.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells3);
							
							PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
							cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells4.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells4);
							
							PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), tabletext));
							cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells5.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells5);
							
									}
								}
							}
							
						}
						else{
							
							String[] bdi = null;
							// get checked service masters
							if(billDetailsId.length()>0){
								
								bdi=billDetailsId.split(",");
								
								for(String id:bdi){
									int billDetailsIdd=Integer.parseInt(id);
									if(billDetailsIdd==listBillDetails.get(i).getBillDetailsId()){
							
										tAmountPatho=tAmountPatho+(listBillDetails.get(i).getRate() * +listBillDetails.get(i).getQuantity());
										
							HeaderTable2.addCell(new Phrase(""+serviceName, tabletext));
							HeaderTable2.addCell(new Phrase(""+listBillDetails.get(i).getCategoryName() + cghsCode, tabletext));
							
							PdfPCell cells3 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getRate()), tabletext));
							cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells3.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells3);
							
							PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getQuantity()), tabletext));
							cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells4.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells4);
							
							PdfPCell cells5 = new PdfPCell(new Phrase(""+df2.format(listBillDetails.get(i).getAmount()), tabletext));
							cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells5.setBorder(Rectangle.NO_BORDER);
							HeaderTable2.addCell(cells5);
							
									}
								}
							}
							
						}
					}
				}
			}
	
		}
		if(servId != 13 || packServSize == 0){
		
			HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
		}
		document.add(HeaderTable2);
		HeaderTable2.flushContent();
		//end Table 2
	}

	// Table6 : Amount in words
	
	PdfPTable HeaderTable6 = new PdfPTable(5);
	int[] headerwidth6 = { 20, 50, 5, 15, 20 };
	HeaderTable6.setWidths(headerwidth6);
	HeaderTable6.setWidthPercentage(95f);
	HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	HeaderTable6.setSpacingBefore(10f);

	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", tabletext));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));

	//if(servId==11){
		//DecimalFormat df2 = new DecimalFormat("0.00");
		HeaderTable6.addCell(new Phrase("Amount In Words:", subheader));
		long finalam2 = (long) tAmountPatho;
		df2.format(finalam2);

		HeaderTable6.addCell(new Phrase("Rs. "+ (EnglishNumberToWords.convert(finalam2)+" Only") ,tabletext));
		HeaderTable6.addCell(new Phrase("", subheader));
		
		PdfPCell cells3 = new PdfPCell(new Phrase("Total", tabletext));
		cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
		cells3.setBorder(Rectangle.NO_BORDER);
		HeaderTable6.addCell(cells3);
		//HeaderTable6.addCell(new Phrase("Total", subheader));

		HeaderTable6.getDefaultCell().setBorder(Rectangle.BOX);			
		PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(tAmountPatho), tabletext));
		cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
		cells4.setBorder(Rectangle.NO_BORDER);
		HeaderTable6.addCell(cells4);
	/*}else{
		//DecimalFormat df2 = new DecimalFormat("0.00");
		HeaderTable6.addCell(new Phrase("Amount In Words:", subheader));
		long finalam2 = (long) tAmount;
		df2.format(finalam2);

		HeaderTable6.addCell(new Phrase("Rs. "+ (EnglishNumberToWords.convert(finalam2)+" Only") ,tabletext));
		HeaderTable6.addCell(new Phrase("", subheader));
		
		PdfPCell cells3 = new PdfPCell(new Phrase("Total", tabletext));
		cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
		cells3.setBorder(Rectangle.NO_BORDER);
		HeaderTable6.addCell(cells3);
		
		HeaderTable6.getDefaultCell().setBorder(Rectangle.BOX);			
		PdfPCell cells4 = new PdfPCell(new Phrase(""+df2.format(tAmount), tabletext));
		cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
		cells4.setBorder(Rectangle.NO_BORDER);
		HeaderTable6.addCell(cells4);
	}*/
	//HeaderTable6.addCell(new Phrase("       " + finalam2, subheader));
	HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);

	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", tabletext));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));

	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", tabletext));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));

	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", tabletext));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));

	HeaderTable6.addCell(new Phrase("", tabletext));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", tabletext));
	
	HeaderTable6.addCell(new Phrase("", tabletext));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", tabletext));
	
	HeaderTable6.addCell(new Phrase("", tabletext));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", tabletext));
	
	HeaderTable6.addCell(new Phrase("", tabletext));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", tabletext));
	
	HeaderTable6.addCell(new Phrase("", tabletext));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", tabletext));
	
	HeaderTable6.addCell(new Phrase("", tabletext));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", tabletext));
	
	HeaderTable6.setSpacingBefore(10f);
	document.add(HeaderTable6);
	HeaderTable6.flushContent();
	
	HeaderTable6.setSpacingBefore(50f);
	
	HeaderTable6.addCell(new Phrase("Payee Signature", tabletext));	
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("Authorized Signatory", tabletext));

	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", tabletext));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("", subheader));
	HeaderTable6.addCell(new Phrase("" + user_name, subheader));

	document.add(HeaderTable6);
	HeaderTable6.flushContent();

	document.close();

	outStream.flush();
	outStream.close();

} catch (Exception e) {
	e.printStackTrace();
}
%>

</body>
</html>