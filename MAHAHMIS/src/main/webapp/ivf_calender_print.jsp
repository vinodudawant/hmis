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
<%@page import="com.itextpdf.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.itextpdf.text.html.simpleparser.StyleSheet"%>
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
<%@page import="com.hms.ivf.controller.ShelfSponserPayAlertController"%>
<%@page import="com.hms.ivf.service.ShelfSponsorPayAlertService"%>
<%@page import="com.hms.ivf.dto.OvamPickMasterDTO"%>
<%@page import="com.hms.ivf.dto.IVFFollicularStudy"%>
<%@page import="com.hms.ivf.dto.IVFFollicularSutdyRecord"%>
<%@page import="com.hms.ivf.dto.FollicularStudyBasicInfoDTO"%>
<%@page import="com.hms.ivf.service.IvfFmStudyService"%>
<%@page import="com.hms.ivf.dto.IVFCalenderInfoDTO"%>

<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<!DOCTYPE html>
<html>
<head>
<meta  http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Opd Receipt PDf</title>
</head>
<body>
	<%
		try {

			response.setContentType("application/pdf");
			CurrencyTypeService fetchOneCurrency=(ApplicationContextUtils.getApplicationContext()).getBean(CurrencyTypeService.class);
			List<CurrencyTypeDto> listServiceCurrencyDto=fetchOneCurrency.getOneCurrencyList();
			String currencyCode=listServiceCurrencyDto.get(0).getCurrencyCode();
 			String currencyName=listServiceCurrencyDto.get(0).getCurrencyName();
 			

		
 			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String billPrint = (String) resourceBundle.getObject("billPrint").toString();
			String billPrintsHeader = (String) resourceBundle.getObject("billPrintsHeader").toString();	
			String concessionFlow = (String) resourceBundle.getObject("concessionFlow").toString();	

			//for centerpatientId
		    String patientId= resourceBundle.getObject("patientIdLabel").toString();
			
			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			
			if(billPrintsHeader.contains("off")){
				
				document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
				
			}
			document.setMargins(20, 20, 20, 0);

			PdfWriter.getInstance(document, outStream);
			document.open();
		
			/* -------------------- Define Fonts ---------------------------  */			
			Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font subheader = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
			Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
			header.setColor(10, 4, 2);

			Font tableheader = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font tabletext = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
			Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
			/* -------------------- Define Fonts ---------------------------  */
			
			session = request.getSession();
			String user_name = (String) session.getAttribute("userName");
			
			String path = hospObj.getFilePath();
			String hospitalName = hospObj.getHospitalName();
			//hospitalName = hospitalName.toUpperCase();			
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
			int patId=Integer.parseInt(request.getParameter("patId"));
			Integer treatmentId=Integer.parseInt(request.getParameter("treatId"));
			int recId=Integer.parseInt(request.getParameter("recId"));
			String cycleNo=request.getParameter("cycleNo");
			String inidate=request.getParameter("inidate");
			int IVFTreatmentId=Integer.parseInt(request.getParameter("IVFTreatmentId"));
			int masterFollicularStudyId=Integer.parseInt(request.getParameter("masterFollicularStudyId"));
			
			//calling service leyer method to get patient records
			RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
			List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
			ltRegMasterDto =us.fetchPatientsRecordByTreatmentId(treatmentId);
							
			Integer departmentId=ltRegMasterDto.get(0).getDepartmentId();
			String pname  =ltRegMasterDto.get(0).getPatientName();
			String MRNo   =ltRegMasterDto.get(0).getMrnno();
			String age	  =ltRegMasterDto.get(0).getAge();
			String gender =ltRegMasterDto.get(0).getGender();
			
			String newAge="";
		String newAge1="";
		
		/* if((age.split("Yrs")[0]).equalsIgnoreCase("0")){        
			if((age.split("M")[0]).equalsIgnoreCase("0Yrs, 0")){  
				newAge=(age.split("/")[2]);                   }
			else{                   
				newAge=(age.split("/")[1])+"/"+(age.split("/")[2]);  
	   					}          }else{
		   					newAge=age;             
		   } */
		
		String ptage="";
		if((age.split("/")[0]).equalsIgnoreCase("0Y")){ 
			if((age.split("/")[1]).equalsIgnoreCase("0M")){
				ptage=(age.split("/")[2]);                  
				}else{
					if((age.split("/")[2]).equalsIgnoreCase("0D")){
						ptage=(age.split("/")[1]); 
					}else{
						ptage=(age.split("/")[1])+"/"+(age.split("/")[2]); 
					}
				}                                 
			}else{
				
				if((age.split("/")[1]).equalsIgnoreCase("0M")){
					if((age.split("/")[2]).equalsIgnoreCase("0D")){
						ptage=age.split("/")[0];
					}else{
						ptage=age.split("/")[0]+"/"+age.split("/")[2];
					}
				}else{
					if((age.split("/")[2]).equalsIgnoreCase("0D")){
						ptage=age.split("/")[0]+"/"+age.split("/")[1];
					}else{
						ptage=age;
					}
				}
				      
			}
		
			//String AgeSexWt = age + " /" + gender;
			String AgeSexWt = ptage + " /" + gender;

			String treatmentCount = ltRegMasterDto.get(0).getTrcount();
			String ContactNo = ltRegMasterDto.get(0).getMobile();
			int Departmentid = ltRegMasterDto.get(0).getDepartmentId();
			String TokenNo = ltRegMasterDto.get(0).getTokenno();
			Date appDate = ltRegMasterDto.get(0).getCreatedDateTime();
			String opdipdno = ltRegMasterDto.get(0).getOpdipdno();
			String weight = ltRegMasterDto.get(0).getWeight();
			String height = ltRegMasterDto.get(0).getHeight();
			String wetHeg = weight + " /" + height;
			String docId = ltRegMasterDto.get(0).getDoctorId();
			String docName = "";
			int count = 0;
			String refDoc  	=ltRegMasterDto.get(0).getDocName();
			
			String[] opdno = {};
			if(opdipdno.contains("/")){
				opdno=opdipdno.split("/");
			}
			/* if(docId.length()>0){
				
				if(docId.contains(",")){
					
					String dId[]=docId.split(",");
					if(doctorId > 0){
						Consultant   = fetchlist.getStringValOfObject("doctor","doc_name",dId,"Doctor_ID");
					}
					
					for(int a=0;a<docId.length();a++){
						count++;
					}
				}
			} */
			// patient address
			String patientAdd = "";
			String perPatientAdd = "";
			String relativeName ="";
			int relationId=0;
			String relation="";
						
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
			 
			//For Permanent Address on 08-May-2018.
			 int perstateId = ltRegMasterDto.get(0).getPerstateId();
			 int pertownId   =ltRegMasterDto.get(0).getPertownId();
			 int perdistrictId =ltRegMasterDto.get(0).getPerdistrictId();
			 int pertalukaId   =ltRegMasterDto.get(0).getPertalukaId();
			 
			 String perstate  ="";
			 String perdistrict  ="";
			 String percityObj  ="";
			 String pertaluka  ="";
			 
 			patientAdd=ltRegMasterDto.get(0).getAddress();
			 
			 if(ltRegMasterDto.get(0).getPerAddress()!=null){
				 perPatientAdd=ltRegMasterDto.get(0).getPerAddress();
			 }
			
			 relativeName=ltRegMasterDto.get(0).getRelativeName();
			 
			 relationId= ltRegMasterDto.get(0).getRelationId();
			 
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
			 
			LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
			AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
			List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
			
			/* if(doctorId > 0){
				Consultant   = fetchlist.getStringValOfObject("doctor","doc_name",doctorId,"Doctor_ID");
			} */			
			
			if(stateId > 0 ){
				state   = fetchlist.getStringValOfObject("state","state_name",stateId,"idstate");
			}else{
				state   = " ";
			}
			if(districtId > 0){
				district = fetchlist.getStringValOfObject("district","dis_name",districtId,"iddistrict"); 
			}else{
				district   = " ";
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
			
			
			if(perstateId > 0 ){
				 perstate   = fetchlist.getStringValOfObject("state","state_name",perstateId,"idstate");
				}else{
					//perstate   = "Maharashtra";
				}
				if(perdistrictId > 0){
					perdistrict = fetchlist.getStringValOfObject("district","dis_name",perdistrictId,"iddistrict"); 
				}else{
					//perdistrict   = "Pune";
				}
				
				if(pertownId > 0){
					percityObj = fetchlist.getStringValOfObject("city","city_name",pertownId,"idcity");
				}else{
					percityObj   = "";
				}
				
				if(pertalukaId > 0){
					pertaluka  = fetchlist.getStringValOfObject("taluka","taluka_name",pertalukaId,"idtaluka"); 
				}else{
					pertaluka   = "";
				}				
				
				
			
			BillService hm = (ApplicationContextUtils.getApplicationContext()).getBean(BillService.class);				
			List<BillReceiptMasterDTO> lstPojo = new ArrayList<BillReceiptMasterDTO>();
			String pendFlag = request.getParameter("pendFlag");
			String callFrom = "receipt";
			if (pendFlag.equals("Y")) {

				callFrom = "prevReceipt";
			} else {

				callFrom = "receipt";
			}

			Integer patBillId = ltRegMasterDto.get(0).getBillId();
			String billId = String.valueOf(ltRegMasterDto.get(0)
					.getBillId());
			String PatientID = String.valueOf(ltRegMasterDto.get(0)
					.getPatientId());

			lstPojo = hm.getOpdRecDetails(patBillId, treatmentId, patId,
					recId, callFrom);
			
			String discRemark = "";
			int recCount = 0;
			int againstId = 0;
			String receiptNo = "";
			String againstNo = "";
			
			if(lstPojo.size() !=0)
			{
				 discRemark = lstPojo.get(0).getDiscRemark();
				 recCount = lstPojo.get(0).getReceiptCount();
				 againstId = lstPojo.get(0).getAgainstId();
				 receiptNo = String.valueOf(recCount);
				 againstNo = String.valueOf(againstId); 
			}
			
			
			int len = ltRegMasterDto.get(0).getListEhatBillPrefix().size();

			for (int n = 0; n < len; n++) {

				EhatBillPrefix lst = ltRegMasterDto.get(0)
						.getListEhatBillPrefix().get(n);
				// For Patient Id
				String patntId = String.valueOf(ltRegMasterDto.get(0)
						.getPatientId());
				if (lst.getDepId() == 4) {

					String prefix = lst.getBillPrefix();
					String middle = lst.getBillMiddle();
					String sufix = lst.getBillSuffix();
					String patIdPrefix = prefix + patId + sufix;
				}
				// For Patient Id

				// For bill Id
				String billGenId = String.valueOf(ltRegMasterDto.get(0)
						.getInvoiceCount());
				if ((lst.getBillRecBoth() == 1 || lst.getBillRecBoth() == 3)) {

					String prefix = lst.getBillPrefix();
					String middle = lst.getBillMiddle();
					String sufix = lst.getBillSuffix();
					String billIdPrefix = prefix + billGenId + sufix;
				}
				// For bill Id

				// For Rec Id
				receiptNo = String.valueOf(recCount);
				if ((lst.getBillRecBoth() == 2 || lst.getBillRecBoth() == 3)) {

					String prefix = lst.getBillPrefix();
					String middle = lst.getBillMiddle();
					String sufix = lst.getBillSuffix();
					receiptNo = prefix + receiptNo + sufix;
					againstNo = prefix + againstId + sufix;
				}
				// For Rec Id

			}

			//irfan khan 11-jan-2018 multi pay mode list
			List<MultiBillReceiptMasterDTO> listMultiPay = new ArrayList<MultiBillReceiptMasterDTO>();
			listMultiPay = hm.getMultiRecDetails(patBillId, treatmentId,patId, recId, departmentId);

			DecimalFormat df2 = new DecimalFormat("0.00");

			// patient address
			String addressPatient = "";
			String per_patient_address = "";
			
			/* if(a1 != "")
			{
				addressPatient = a1;
			}
			if(a2 != "" && a1 != ""){
				addressPatient += (", "+a2);
			}
			if(a1 == "" && a2!= ""){
				addressPatient = a2;
			} */
			if (cityObj != "0" && !cityObj.equals("undefined")
					&& !cityObj.equals("")) {
				addressPatient += cityObj;
			}

			if (taluka != "0" && !taluka.equals("undefined")
					&& !taluka.equals("")) {
				addressPatient += (taluka + ", ");
			}
			if (district != "0" && !district.equals("undefined")
					&& !district.equals("")) {
				addressPatient += (district + ", ");
			}
			if (state != "0" && !state.equals("undefined")
					&& !state.equals("")) {
				addressPatient += (state + " ");
			}
			// end : patient address
			
			// Strat : permanant patient address
			if(percityObj != "0" && !percityObj.equals("undefined") && !percityObj.equals("")){
				per_patient_address += percityObj;
			}
			
			if (pertaluka != "0" && !pertaluka.equals("undefined") && !pertaluka.equals("")) 
			{
				per_patient_address +=  (", "+pertaluka);
			}						
			if (perdistrict != "0" && !perdistrict.equals("undefined") && !perdistrict.equals("")) 
			{
				per_patient_address += (", " + perdistrict);
			}
			if (perstate != "0" && !perstate.equals("undefined") && !perstate.equals("")) 
			{
				per_patient_address += (", " + perstate);
			}
			// end : permanant patient address
							
						
			addressPatient=addressPatient.substring(0,addressPatient.length()-1);
						
			//For No. of prints.
			//AdminModel adminModel = new AdminModel();
			int printId = 2;
			int numOfPrint = 1; // adminModel.generalAccessNumOfPrint(printId);// to get number of prints
			for (int cnt = 0; cnt < numOfPrint; cnt++) {
				
			document.newPage();			

			// Table 1 : For hospital adress details start

			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 30, 80, 30 };
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
			p.add(new Chunk(" \n\n"+address, tabletext));			
			p.add(new Chunk(" "+city+" Pin- "+hospitalZip+"\n", tabletext));
			p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
            if(!webste.equalsIgnoreCase("")){
			p.add(new Chunk(" \n "+webste, tabletext));
			}
			p.add(new Chunk(" \n "+"email: "+email, tabletext));			//p.add(new Chunk(" \nPAN No : "+panNo , tabletext));	
		/* 	p.add(new Chunk(" \nCIN: "+cinNo+", GST : "+gstNo , tabletext));	
			p.add(new Chunk(" \nSERVICE TAX NO : "+serviceTaxNo+", PAN No: "+panNo, tabletext));	 */
			
			PdfPCell hospitalNameCell = new PdfPCell(p);				
			hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(hospitalNameCell);

			if (billPrintsHeader.contains("on")) {

				if (billPrint.contains("on")) {

					if (img == null) {

						HeaderTable1.addCell(new Phrase("", header));
					} else {

						HeaderTable1.addCell(cellNabh);
					}
				} else {

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

				HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				document.add(HeaderTable1);
				HeaderTable1.flushContent();
			}

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

			HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(new Phrase("", subheader));
			PdfPCell subcell = new PdfPCell(new Phrase("", subheader));
			subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
			subcell.setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(subcell);
			HeaderTable2.addCell(new Phrase("   IVF Calender  ", header));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			document.add(HeaderTable2);
			HeaderTable2.flushContent();

			// Table 2 : For receipt head end

			RegistrationController regCon = (ApplicationContextUtils
					.getApplicationContext())
					.getBean(RegistrationController.class);
			RegTreBillDto rtd = new RegTreBillDto();
			List<RegTreBillDto> ltPatientRecord = null;
			String PType = "";
			if (regCon != null) {

				rtd = regCon.fetchPatientsRecordByTreatmentId(treatmentId);
				rtd = rtd.getListRegTreBillDto().get(0);
				rtd.getPatientName();

				int a = rtd.getSourceTypeId();
				if (a > 0) {
					PType = "Sponsor";
				} else {
					PType = "Self";
				}
			}
			
			
			// For ref doc start
			ChannelHospitalMgmtService objChannelingModel = (ApplicationContextUtils.getApplicationContext()).getBean(ChannelHospitalMgmtService.class);	
			List<HospitalDetailsDTO> arrChanelling_doctor = new ArrayList<HospitalDetailsDTO>();
			arrChanelling_doctor = objChannelingModel.setExistingHospitalTemp(1, request);
			
			String refDrName="";
			int refDrId=ltRegMasterDto.get(0).getRefDocId();
			for(HospitalDetailsDTO objRef : arrChanelling_doctor){
				
				if(refDrId==objRef.getHosId()){
					
					refDrName=objRef.getHos_name();
				}
			}	
			// For
			
			double paidAmt = 0.0;
			double totConAmt = 0.0;
			double totRemain = 0.0;
			
			if(lstPojo.size() != 0)
			{
				 paidAmt = lstPojo.get(0).getFirstPaid();
				 totConAmt = lstPojo.get(0).getFirstDisc();
				 totRemain = lstPojo.get(0).getFirstRemain();

				totConAmt = totConAmt + lstPojo.get(0).getActualTotConcn();
			}
			

			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
			SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm a");
			SimpleDateFormat sdf3 = new SimpleDateFormat(
					"dd/MM/yyyy HH:mm a");
			Date now = new Date(new java.util.Date().getTime());
			String strDate = sdf.format(now);
			String rtime = sdf2.format(now);
			String rtimeDate = sdf3.format(now);

			String age2 = ltRegMasterDto.get(0).getAge2();
			String dob = ltRegMasterDto.get(0).getDob();

			if (dob.equals("") || dob.equals(null)) {
				AgeSexWt = ptage + "    " + gender;
			}

			if (!docId.equals("") && !docId.contains(",")) {

				int doctorId = Integer.parseInt(docId);
				if (doctorId > 0) {
					docName = fetchlist.getStringValOfObject("doctor",
							"doc_name", doctorId, "Doctor_ID");
				}
			}
			
			int chargesSlaveId =0;
			if(lstPojo.size() != 0)
			{
				 chargesSlaveId=lstPojo.get(0).getSponsorCatId();
			}
			
			if(chargesSlaveId > 0){
				fetchsposor   = obj.fetchSuperCatofchargesSlave(chargesSlaveId);
				if(fetchsposor.size() >0){
					BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
				}
				
				BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",chargesSlaveId,"id"); 
			
			}else{
				BillCategoryName = "Self";
			}

			// Table3 : For patient header info start

			PdfPTable HeaderTable3 = new PdfPTable(4);
			int[] headerwidth3 = { 30, 50, 30, 50 };
			HeaderTable3.setWidths(headerwidth3);
			HeaderTable3.setWidthPercentage(95f);
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			//AdminModel admodel1 = new AdminModel();
			Doctor doc2 = new Doctor();
			List<Doctor> listDoc2 = null;
			
		
			if(totRemain==0){
				
				HeaderTable3.addCell(new Phrase("OPD. No. ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+opdipdno,tabletext));
				
				HeaderTable3.addCell(new Phrase("Receipt No. ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+receiptNo,tabletext));
				
				/* HeaderTable3.addCell(new Phrase("Patient ID ", subheader));
				HeaderTable3.addCell(new Phrase(" : "+PatientID, tabletext)); */
				
				HeaderTable3.addCell(new Phrase(" "+patientId,subheader));
				HeaderTable3.addCell(new Phrase(" : "+rtd.getCenterPatientId(),tabletext));
				 
				HeaderTable3.addCell(new Phrase("Patient Name ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+pname,tabletext));

				//HeaderTable3.addCell(new Phrase("Treatment ID ", subheader));
				//HeaderTable3.addCell(new Phrase(" : "+treatmentId, tabletext));
				
				HeaderTable3.addCell(new Phrase("Token No. ", subheader));
				HeaderTable3.addCell(new Phrase(" : "+TokenNo, tabletext));
				
			/* 	HeaderTable3.addCell(new Phrase("Age/Gender ", subheader));
				HeaderTable3.addCell(new Phrase(" : "+ AgeSexWt, tabletext));
				
				HeaderTable3.addCell(new Phrase("Weight ",subheader));
				HeaderTable3.addCell(new Phrase(" : " +weight , tabletext)); */
				
				HeaderTable3.addCell(new Phrase("Contact No ", subheader));
				HeaderTable3.addCell(new Phrase(" : "+ ContactNo, tabletext));
				
				HeaderTable3.addCell(new Phrase("Receipt Date ",subheader));
				HeaderTable3.addCell(new Phrase(" : " +strDate , tabletext));
				
				HeaderTable3.addCell(new Phrase("Res. Address ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+patientAdd+", "+addressPatient,	tabletext));
				
				if(perPatientAdd !="" || per_patient_address != "" && !per_patient_address.equals("undefined") && per_patient_address != null && perPatientAdd !=null)
				{
					HeaderTable3.addCell(new Phrase("Per. Address ",subheader));
					HeaderTable3.addCell(new Phrase(" : "+perPatientAdd+" "+per_patient_address,	tabletext));
				}
				
				if(relativeName != "" && relativeName!="undefined" && relativeName != null)
				{
					HeaderTable3.addCell(new Phrase("Relative Name ",subheader));
					HeaderTable3.addCell(new Phrase(" : "+relation+"-"+relativeName,	tabletext));
				}
				
				HeaderTable3.addCell(new Phrase("Receipt Time ",subheader));
				HeaderTable3.addCell(new Phrase(" : " +rtime , tabletext));
				
				/* HeaderTable3.addCell(new Phrase("Ref. By  ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+refDoc, tabletext)); */
				HeaderTable3.addCell(new Phrase("Ref. By  ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+refDrName, tabletext));
				
				if(rtd.getDoctorId().contains(",")){
					String[] doctors = rtd.getDoctorId().split(",") ;
					String Doc_Nme = "";
					String Depart = "";
					for(String str :doctors )
					{
						String DocID = str;
						int docId23 =  Integer.parseInt(str);
						//listDoc2 = admodel1.getDoctorsDepDetails(docId23);
						 Doc_Nme = "";//Doc_Nme + listDoc2.get(0).getDoc_name()+",";
						 Depart = "";//Depart + listDoc2.get(0).getDepartmentName()+",";
					}
					
					
					HeaderTable3.addCell(new Phrase("Consultant", subheader));
					HeaderTable3.addCell(new Phrase(": "+Doc_Nme, tabletext));			
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", tabletext)); 

				}
				else{
					
					if(!rtd.getDoctorId().equalsIgnoreCase("") && rtd.getDoctorId() != ""){
					
						int docId1 =  Integer.parseInt(rtd.getDoctorId());
						//listDoc2 = admodel1.getDoctorsDepDetails(docId1);
						
						HeaderTable3.addCell(new Phrase("", subheader));
						HeaderTable3.addCell(new Phrase("", tabletext));
						HeaderTable3.addCell(new Phrase("Consultant Doc.", subheader));
						HeaderTable3.addCell(new Phrase(": "+docId1, tabletext));					
						
					}
				}
				
				/* HeaderTable3.addCell(new Phrase("Under Care ",	subheader));		
				HeaderTable3.addCell(new Phrase(" : ", tabletext)); */
				//HeaderTable3.addCell(new Phrase("HSN Code",subheader));
				
				HeaderTable3.addCell(new Phrase("Sponsor ",subheader));
				HeaderTable3.addCell(new Phrase(" : " + BillCategoryName, tabletext));
				HeaderTable3.addCell(new Phrase("Age ", subheader));
				HeaderTable3.addCell(new Phrase(": "+rtd.getAge(), tabletext));
				
				
				
			}
			
		
			document.add(HeaderTable3);
			HeaderTable3.flushContent();

			
			PdfPTable HeaderTable5 = new PdfPTable(7);
			int[] headerwidth5 = { 27, 40, 30, 10, 15, 40, 20 };
			HeaderTable5.setWidths(headerwidth5);
			HeaderTable5.setWidthPercentage(95f);
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

		
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
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));

			document.add(HeaderTable5);
			HeaderTable5.flushContent();

// strat template Data
PdfPTable HeaderTableSpace = new PdfPTable(1);
	int[] headerwidthSpace = {40 };
	HeaderTableSpace.setWidths(headerwidthSpace);
	HeaderTableSpace.setWidthPercentage(95f);
	HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	HeaderTableSpace.setSpacingAfter(5.0f);
	
	PdfPTable HeaderTableBorder = new PdfPTable(1);
	int[] headerwidthborder = { 20};
	HeaderTableBorder.setWidths(headerwidthborder);
	HeaderTableBorder.setWidthPercentage(95f);
	HeaderTableBorder.getDefaultCell().setBorder(Rectangle.BOTTOM);

 			ShelfSponsorPayAlertService obj1=(ApplicationContextUtils.getApplicationContext()).getBean(ShelfSponsorPayAlertService.class);
			
			IVFFollicularStudy fmObj=	obj1.getBasicStudyDataForFollucularStudyOnPrint(masterFollicularStudyId);
		if(fmObj !=null){
			   
			PdfPTable HeaderTable50 = new PdfPTable(8);
			int[] headerwidth51 = {10, 10, 10, 10, 10, 10, 10, 10};
			HeaderTable50.setWidths(headerwidth51);
			HeaderTable50.setWidthPercentage(95f);
			HeaderTable50.getDefaultCell()
					.setBorder(Rectangle.NO_BORDER);
			HeaderTable50.setHorizontalAlignment(Element.ALIGN_CENTER);
			
		
			HeaderTable50.addCell(new Phrase("Age", subheader));
			HeaderTable50.addCell(new Phrase(fmObj.getAge(), tabletext));
			HeaderTable50.addCell(new Phrase("Weight", subheader));
			HeaderTable50.addCell(new Phrase(fmObj.getWeight(), tabletext));
			HeaderTable50.addCell(new Phrase("Height", subheader));
			HeaderTable50.addCell(new Phrase(fmObj.getHeight(), tabletext));
			HeaderTable50.addCell(new Phrase("BMI", subheader));
			HeaderTable50.addCell(new Phrase(fmObj.getBmi(), tabletext));
			
			
			HeaderTable50.addCell(new Phrase("", subheader));
			HeaderTable50.addCell(new Phrase("", header));
			HeaderTable50.addCell(new Phrase("", subheader));
			HeaderTable50.addCell(new Phrase("", header));
			HeaderTable50.addCell(new Phrase("", subheader));
			HeaderTable50.addCell(new Phrase("", header));
			HeaderTable50.addCell(new Phrase("", subheader));
			HeaderTable50.addCell(new Phrase("", header));
			
			
			HeaderTable50.addCell(new Phrase("AFC", subheader));
			HeaderTable50.addCell(new Phrase(fmObj.getAfc(), tabletext));
			HeaderTable50.addCell(new Phrase("RX", subheader));
			HeaderTable50.addCell(new Phrase(fmObj.getRx(), tabletext));								
			HeaderTable50.addCell(new Phrase("HSG", subheader));
			HeaderTable50.addCell(new Phrase(fmObj.getHsg(), tabletext));
			HeaderTable50.addCell(new Phrase("HSA", subheader));
			HeaderTable50.addCell(new Phrase(fmObj.getHsa(), tabletext));
			
			HeaderTable50.addCell(new Phrase("", subheader));
			HeaderTable50.addCell(new Phrase("", header));
			HeaderTable50.addCell(new Phrase("", subheader));
			HeaderTable50.addCell(new Phrase("", header));
			HeaderTable50.addCell(new Phrase("", subheader));
			HeaderTable50.addCell(new Phrase("", header));
			HeaderTable50.addCell(new Phrase("", subheader));
			HeaderTable50.addCell(new Phrase("", header));
			
			
			HeaderTable50.addCell(new Phrase("Protocol", subheader));
			HeaderTable50.addCell(new Phrase(fmObj.getProtocoloF(), header));
			HeaderTable50.addCell(new Phrase("", subheader));
			HeaderTable50.addCell(new Phrase("", header));
			HeaderTable50.addCell(new Phrase("", subheader));
			HeaderTable50.addCell(new Phrase("", header));
			HeaderTable50.addCell(new Phrase("", subheader));
			HeaderTable50.addCell(new Phrase("", header));
			
			HeaderTable50.addCell(new Phrase("", subheader));
			HeaderTable50.addCell(new Phrase("", header));
			HeaderTable50.addCell(new Phrase("", subheader));
			HeaderTable50.addCell(new Phrase("", header));
			HeaderTable50.addCell(new Phrase("", subheader));
			HeaderTable50.addCell(new Phrase("", header));
			HeaderTable50.addCell(new Phrase("", header));
			HeaderTable50.addCell(new Phrase("", header));
			document.add(HeaderTable50);
			HeaderTable50.flushContent();
		}
			
		
		HeaderTableBorder.addCell(new Phrase("", tabletext));
		HeaderTableBorder.addCell(new Phrase("", tabletext));
		HeaderTableBorder.addCell(new Phrase("", tabletext));
		
	   		 document.add(HeaderTableBorder);
	   		HeaderTableBorder.flushContent();
			
			HeaderTableSpace.addCell(new Phrase("", tabletext));
			document.add(HeaderTableSpace);
			HeaderTableSpace.flushContent();
			
			
		

			PdfPTable HeaderTable5ivf = new PdfPTable(6);
			int[] headerwidth5ivf = {20, 20, 20, 20, 20, 20 };
			HeaderTable5ivf.setWidths(headerwidth5ivf);
			HeaderTable5ivf.setWidthPercentage(95f);
			HeaderTable5ivf.getDefaultCell().setBorder(Rectangle.BOX);
		
		
		List<FollicularStudyBasicInfoDTO> bobj=  obj1.getListForFollicularStudy(masterFollicularStudyId);
		List<IVFCalenderInfoDTO> cObj=  obj1.getIvfCalenderInfo(masterFollicularStudyId);
		
		HeaderTable5.addCell(new Phrase("IVF Calender Info", header));
		HeaderTable5.addCell(new Phrase("", header));
		HeaderTable5.addCell(new Phrase("", header));
		HeaderTable5.addCell(new Phrase("", header));
		HeaderTable5.addCell(new Phrase("", header));
		HeaderTable5.addCell(new Phrase("", header));
		HeaderTable5.addCell(new Phrase("", header));
		HeaderTable5.addCell(new Phrase("", header));
		HeaderTable5.addCell(new Phrase("", header));
		document.add(HeaderTable5);
		HeaderTable5.flushContent();
		
		HeaderTable5.addCell(new Phrase("", header));
		HeaderTable5.addCell(new Phrase("", header));
		HeaderTable5.addCell(new Phrase("", header));
		HeaderTable5.addCell(new Phrase("", header));
		HeaderTable5.addCell(new Phrase("", header));
		HeaderTable5.addCell(new Phrase("", header));
		HeaderTable5.addCell(new Phrase("", header));
		HeaderTable5.addCell(new Phrase("", header));
		HeaderTable5.addCell(new Phrase("", header));
		document.add(HeaderTable5);
		HeaderTable5.flushContent();
		
		
		
		HeaderTable5ivf.addCell(new Phrase("# ", header));
		
		HeaderTable5ivf.addCell(new Phrase("Start Date", header));
		HeaderTable5ivf.addCell(new Phrase("Days", header));
		HeaderTable5ivf.addCell(new Phrase("End Date", header));
		HeaderTable5ivf.addCell(new Phrase("Drug", header));
		HeaderTable5ivf.addCell(new Phrase("Dose", header));
		
		document.add(HeaderTable5ivf);
		HeaderTable5ivf.flushContent();
		
		
		if(cObj.size() > 0){
			int countt=1;
			for(int i=0;i<cObj.size();i++){
				HeaderTable5ivf.addCell(new Phrase(""+countt, tabletext));
				
				HeaderTable5ivf.addCell(new Phrase(""+cObj.get(i).getStartDate(), tabletext));
				HeaderTable5ivf.addCell(new Phrase(""+cObj.get(i).getDays(), tabletext));
				HeaderTable5ivf.addCell(new Phrase(""+cObj.get(i).getEndDate(), tabletext));
				HeaderTable5ivf.addCell(new Phrase(""+cObj.get(i).getDrug(), tabletext));
				HeaderTable5ivf.addCell(new Phrase(""+cObj.get(i).getDose(), tabletext));
				
				document.add(HeaderTable5ivf);
				HeaderTable5ivf.flushContent();
				countt++;
			}
		}
		
		
		
		
		HeaderTableSpace.addCell(new Phrase("", tabletext));
		document.add(HeaderTableSpace);
		HeaderTableSpace.flushContent();
			
			HeaderTableBorder.addCell(new Phrase("", tabletext));
	   		 document.add(HeaderTableBorder);
	   		HeaderTableBorder.flushContent();
			
			
							



//End Template Data

			// Table5 : For service details head start

			

		
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
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));

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

			if (labId == 1 || sponsorSlave > 0) {

				

				PdfPTable HeaderTable7 = new PdfPTable(3);
				int[] headerwidth7 = { 80, 25, 30 };
				HeaderTable7.setWidths(headerwidth7);
				HeaderTable7.setWidthPercentage(95f);
				HeaderTable7.getDefaultCell()
						.setBorder(Rectangle.NO_BORDER);

				HeaderTable7.getDefaultCell()
						.setBorder(Rectangle.NO_BORDER);
				HeaderTable7.addCell(new Phrase("",	tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));

				HeaderTable7.addCell(new Phrase("",	tabletext));
				HeaderTable7.addCell(new Phrase("", subheader));
				HeaderTable7.addCell(new Phrase("Authorized Signatory", subheader));
				HeaderTable7.addCell(new Phrase("", tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));
				if(user_name != null)
				{
					HeaderTable7.addCell(new Phrase(" " + user_name, tabletext));
				}
				else
				{
					HeaderTable7.addCell(new Phrase(" " , tabletext));
				}
				

				

				document.add(HeaderTable7);
				HeaderTable7.flushContent();
				
				
				

			}else {

				
				if(user_name != null)
				{
					HeaderTable4.addCell(new Phrase(
							"          User :" + user_name, tabletext));
				}
				else
				{
					HeaderTable4.addCell(new Phrase(
							"          User :" , tabletext));
				}
				HeaderTable4.addCell(new Phrase("", tabletext));

				HeaderTable4.addCell(new Phrase("Signature", tabletext));

				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				document.add(HeaderTable4);

				HeaderTable4.flushContent();
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));

				document.add(HeaderTable4);
				HeaderTable4.flushContent();

				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", tabletext));

				document.add(HeaderTable4);
				HeaderTable4.flushContent();
			}

			// Table4 : For page footer end

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