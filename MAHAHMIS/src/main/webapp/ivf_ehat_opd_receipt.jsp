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
			
			//calling service leyer method to get patient records
			/* RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
			List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>(); */
			List<PatientHeaderInfoDto> ltRegMasterDto = null;
			OpdBillService uss=(ApplicationContextUtils.getApplicationContext()).getBean(OpdBillService.class);
			PatientHeaderInfoDto rtd = new PatientHeaderInfoDto();	
			rtd.setTreatmentId(treatmentId);
			rtd = uss.getPatientInfoByTreatmentId(rtd);
			
			ltRegMasterDto = rtd.getListRegTreBillDto();
			
			rtd = rtd.getListRegTreBillDto().get(0);
							
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
			//String weight = ltRegMasterDto.get(0).getWeight();
			//String height = ltRegMasterDto.get(0).getHeight();
			//String wetHeg = weight + " /" + height;
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

			lstPojo = hm.getIvfOpdRecDetails(patBillId, treatmentId, patId,
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
			
			
			/* int len = ltRegMasterDto.get(0).getListEhatBillPrefix().size();

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

			} */

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
			HeaderTable2.addCell(new Phrase("     BILL CUM RECEIPT ", header));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			document.add(HeaderTable2);
			HeaderTable2.flushContent();

			// Table 2 : For receipt head end

			/* RegistrationController regCon = (ApplicationContextUtils
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
			} */
			String PType = "";
			int a = rtd.getSourceTypeId();
			if (a > 0) {
				PType = "Sponsor";
			} else {
				PType = "Self";
			}
			
			String refDrName=rtd.getRefDocName();
			// For ref doc start
			/* ChannelHospitalMgmtService objChannelingModel = (ApplicationContextUtils.getApplicationContext()).getBean(ChannelHospitalMgmtService.class);	
			List<HospitalDetailsDTO> arrChanelling_doctor = new ArrayList<HospitalDetailsDTO>();
			arrChanelling_doctor = objChannelingModel.setExistingHospitalTemp(1, request);
			
			String refDrName="";
			int refDrId=ltRegMasterDto.get(0).getRefDocId();
			for(HospitalDetailsDTO objRef : arrChanelling_doctor){
				
				if(refDrId==objRef.getHosId()){
					
					refDrName=objRef.getHos_name();
				}
			} */	
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

            HeaderTable3.addCell(new Phrase("OPD No. ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+opdipdno,tabletext));
			
			HeaderTable3.addCell(new Phrase("Receipt No. ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+receiptNo,tabletext));
			
			HeaderTable3.addCell(new Phrase(" "+patientId,subheader));
			HeaderTable3.addCell(new Phrase(" : "+rtd.getCenterPatientId(),tabletext));
			
			HeaderTable3.addCell(new Phrase("Patient Name ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+pname,tabletext));

			HeaderTable3.addCell(new Phrase("Token No. ", subheader));
			HeaderTable3.addCell(new Phrase(" : "+TokenNo, tabletext));
			
			/* HeaderTable3.addCell(new Phrase("Age/Gender ", subheader));
			HeaderTable3.addCell(new Phrase(" : "+ AgeSexWt, tabletext));
			
			HeaderTable3.addCell(new Phrase("Weight ",subheader));
			HeaderTable3.addCell(new Phrase(" : " +weight , tabletext));
			 */
			HeaderTable3.addCell(new Phrase("Contact No ", subheader));
			HeaderTable3.addCell(new Phrase(" : "+ ContactNo, tabletext));
			
			HeaderTable3.addCell(new Phrase("Receipt Date ",subheader));
			HeaderTable3.addCell(new Phrase(" : " +strDate , tabletext));
			
			HeaderTable3.addCell(new Phrase("Receipt Time ",subheader));
			HeaderTable3.addCell(new Phrase(" : " +rtime , tabletext));
			
			HeaderTable3.addCell(new Phrase("Ref. By  ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+rtd.getRefDocName(), tabletext));
			
			HeaderTable3.addCell(new Phrase("Consultant Doc.", subheader));
			HeaderTable3.addCell(new Phrase(": "+rtd.getConsultingDocName(), tabletext));
			
			HeaderTable3.addCell(new Phrase("Age/Gender ",	subheader));		
			HeaderTable3.addCell(new Phrase(" : "+ AgeSexWt, tabletext));
			
			HeaderTable3.addCell(new Phrase("Sponsor ",subheader));
			HeaderTable3.addCell(new Phrase(" : " + BillCategoryName, tabletext));	
			
			HeaderTable3.addCell(new Phrase("Res. Address ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+patientAdd+", "+addressPatient,	tabletext));
			
			if(perPatientAdd !="" || per_patient_address != "" && !per_patient_address.equals("undefined") && per_patient_address != null && perPatientAdd !=null){
				
				HeaderTable3.addCell(new Phrase("Per. Address ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+perPatientAdd+" "+per_patient_address,	tabletext));
			}else{
				
				HeaderTable3.addCell(new Phrase(" ",subheader));
				HeaderTable3.addCell(new Phrase(" ",	tabletext));
			}
			
			HeaderTable3.addCell(new Phrase(" ",subheader));
			HeaderTable3.addCell(new Phrase(" ",	tabletext));
			HeaderTable3.addCell(new Phrase(" ",subheader));
			HeaderTable3.addCell(new Phrase(" ",	tabletext));
			
			document.add(HeaderTable3);
			HeaderTable3.flushContent();

			// Table3 : For patient header info end

			// Table5 : For service details head start

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
			int labId = 0;
			
			if(lstPojo.size() != 0)
			{
				for (int i = 0; i < lstPojo.get(0).getListBillReceiptSlave()
						.size(); i++) {

					double servId = lstPojo.get(0).getListBillReceiptSlave()
							.get(i).getServiceId();
					if (servId == 11) {

						labId = 1;
					}
				}
			}
			

			if (labId == 1) {

				HeaderTable5.addCell(new Phrase("Department", subheader));
				HeaderTable5.addCell(new Phrase("BillHead", subheader));
				HeaderTable5.addCell(new Phrase("Doctor Name", subheader));
				HeaderTable5.addCell(new Phrase("Qty.", subheader));
				HeaderTable5.getDefaultCell().setHorizontalAlignment(
						Element.ALIGN_RIGHT);
				HeaderTable5.addCell(new Phrase("Rate", subheader));
				
				if(concessionFlow.equalsIgnoreCase("on")){
					HeaderTable5.addCell(new Phrase("Concession", subheader));
				}else{
					HeaderTable5.addCell(new Phrase("", subheader));
				}
				HeaderTable5.addCell(new Phrase("Amount", subheader));
			} else {

				HeaderTable5.getDefaultCell().setHorizontalAlignment(
						Element.ALIGN_LEFT);
				HeaderTable5.addCell(new Phrase("Department", subheader));
				HeaderTable5.addCell(new Phrase("BillHead", subheader));
				HeaderTable5.addCell(new Phrase("Doctor Name", subheader));
				HeaderTable5.addCell(new Phrase("Qty.", subheader));
				HeaderTable5.getDefaultCell().setHorizontalAlignment(
						Element.ALIGN_RIGHT);
				HeaderTable5.addCell(new Phrase("Rate", subheader));
				
				if(concessionFlow.equalsIgnoreCase("on")){
					HeaderTable5.addCell(new Phrase("Concession", subheader));
				}else{
					HeaderTable5.addCell(new Phrase("", subheader));
				}
						HeaderTable5.addCell(new Phrase("Amount", subheader));
			}

			document.add(HeaderTable5);
			HeaderTable5.flushContent();

			HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));

			double totPayable = 0.0;
			double totDic = 0.0;
			if(lstPojo.size() != 0)
			{
				totDic = lstPojo.get(0).getFirstDisc();
			}
			
			double totCon = 0.0;
			double totAmt = 0.0;
			
			if (labId == 1) {
				if(lstPojo.size() != 0)
				{
				for (int i = 0; i < lstPojo.get(0)
						.getListBillReceiptSlave().size(); i++) {
					
					int serId = lstPojo.get(0).getListBillReceiptSlave()
							.get(i).getServiceId();

					String serviceName = "";

					ServService obje1 = (ApplicationContextUtils
							.getApplicationContext())
							.getBean(ServService.class);
					List<ServiceMasterDto> listServDetails = new ArrayList<ServiceMasterDto>();
					ServiceMasterDto objDTO = new ServiceMasterDto();
					objDTO = obje1.getAllServiceList2(request);

					if (serId == 0) {

						serviceName = "OPD";
					} else {

						for (int j = 0; j < objDTO.getListService().size(); j++) {

							if (objDTO.getListService().get(j)
									.getServiceId() == serId) {

								serviceName = objDTO.getListService()
										.get(j).getServiceName();
							}
						}
					}


					String compName = "";
					if (lstPojo.get(0).getAgainstId() > 0) {

						againstNo = lstPojo.get(0).getListBillReceiptSlave().get(0).getCompName();
						compName = "Receipt Against : " + againstNo;
					} else {

						compName = lstPojo.get(0).getListBillReceiptSlave()
								.get(i).getCompName();
					}
					double rate = lstPojo.get(0).getListBillReceiptSlave()
							.get(i).getRate();
					double qty = lstPojo.get(0).getListBillReceiptSlave()
							.get(i).getQuantity();
					double amt = lstPojo.get(0).getListBillReceiptSlave()
							.get(i).getAmount();
					double consn = lstPojo.get(0).getListBillReceiptSlave()
							.get(i).getConcession();
					int servDocId = lstPojo.get(0)
							.getListBillReceiptSlave().get(i).getDoctorId();

					totCon = totCon + consn;
					totAmt = totAmt + (amt - consn);

					String servDocName = "-";
					if (servDocId == 0) {

					} else {

						servDocName = fetchlist.getStringValOfObject(
								"doctor", "doc_name", servDocId,
								"Doctor_ID");
					}

					double netAmt = amt - consn;
					totPayable = totPayable + netAmt;
					totDic = totDic + consn;

					HeaderTable5.getDefaultCell().setHorizontalAlignment(
							Element.ALIGN_LEFT);
					HeaderTable5
							.addCell(new Phrase("" + serviceName, tabletext));
					HeaderTable5.addCell(new Phrase("" + compName,
							tabletext));
					HeaderTable5.addCell(new Phrase("" + servDocName, tabletext));
					HeaderTable5.addCell(new Phrase("" + Math.round(qty), tabletext));

					PdfPCell cell2 = new PdfPCell(new Phrase("" + df2.format(rate), tabletext));
					cell2.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cell2.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(cell2);

					/* PdfPCell cell3 = new PdfPCell(new Phrase("" +df2.format(amt), tabletext));
					cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell3.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(cell3);

					PdfPCell cell4 = new PdfPCell(new Phrase("" + df2.format(consn),tabletext));
					cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell4.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(cell4); */

					if(concessionFlow.equalsIgnoreCase("on")){
						HeaderTable5.getDefaultCell().setHorizontalAlignment(
								Element.ALIGN_RIGHT);
						HeaderTable5.addCell(new Phrase("" + df2.format(consn), tabletext));
					}else{
						HeaderTable5.getDefaultCell().setHorizontalAlignment(
								Element.ALIGN_RIGHT);
						HeaderTable5.addCell(new Phrase("", tabletext));
					}
					
					PdfPCell cell5 = new PdfPCell(new Phrase(""
							+ df2.format(netAmt), tabletext));
					cell5.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cell5.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(cell5);
				}
			}

			} else {
				if(lstPojo.size() != 0)
				{
				for (int i = 0; i < lstPojo.get(0)
						.getListBillReceiptSlave().size(); i++) {

					int serId = lstPojo.get(0).getListBillReceiptSlave()
							.get(i).getServiceId();

					String serviceName = "";

					ServService obje1 = (ApplicationContextUtils
							.getApplicationContext())
							.getBean(ServService.class);
					List<ServiceMasterDto> listServDetails = new ArrayList<ServiceMasterDto>();
					ServiceMasterDto objDTO = new ServiceMasterDto();
					objDTO = obje1.getAllServiceList2(request);

					if (serId == 0) {

						serviceName = "OPD";
					} else {

						for (int j = 0; j < objDTO.getListService().size(); j++) {

							if (objDTO.getListService().get(j)
									.getServiceId() == serId) {

								serviceName = objDTO.getListService()
										.get(j).getServiceName();
							}
						}
					}

					String compName = "";
					if (lstPojo.get(0).getAgainstId() > 0) {

						againstNo = lstPojo.get(0).getListBillReceiptSlave().get(0).getCompName();
						compName = "Receipt Against : " + againstNo;
					} else {

						compName = lstPojo.get(0).getListBillReceiptSlave()
								.get(i).getCompName();
					}
					double rate = lstPojo.get(0).getListBillReceiptSlave()
							.get(i).getRate();
					double qty = lstPojo.get(0).getListBillReceiptSlave()
							.get(i).getQuantity();
					double amt = lstPojo.get(0).getListBillReceiptSlave()
							.get(i).getAmount();
					double consn = lstPojo.get(0).getListBillReceiptSlave()
							.get(i).getConcession();
					int servDocId = lstPojo.get(0)
							.getListBillReceiptSlave().get(i).getDoctorId();

					totCon = totCon + consn;
					totAmt = totAmt + (amt - consn);

					String servDocName = "-";
					if (servDocId == 0) {

					} else {

						servDocName = fetchlist.getStringValOfObject(
								"doctor", "doc_name", servDocId,
								"Doctor_ID");
					}

					double netAmt = amt - consn;
					totPayable = totPayable + netAmt;
					totDic = totDic + consn;

					HeaderTable5.getDefaultCell().setHorizontalAlignment(
							Element.ALIGN_LEFT);
					HeaderTable5.addCell(new Phrase("" + serviceName,
							tabletext));
					HeaderTable5.addCell(new Phrase("" + compName,
							tabletext));
					HeaderTable5.addCell(new Phrase("" + servDocName,
							tabletext));
					HeaderTable5.addCell(new Phrase("" + Math.round(qty),
							tabletext));

					PdfPCell cell2 = new PdfPCell(new Phrase(""
							+ df2.format(rate), tabletext));
					cell2.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cell2.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(cell2);

					/* PdfPCell cell3 = new PdfPCell(new Phrase("" +df2.format(amt), tabletext));
					cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell3.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(cell3);

					PdfPCell cell4 = new PdfPCell(new Phrase("" + df2.format(consn),tabletext));
					cell4.setHorizontalAlignment(Element.ALIGN_CENTER);
					cell4.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(cell4); */

					if(concessionFlow.equalsIgnoreCase("on")){
						HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
						HeaderTable5.addCell(new Phrase("" + df2.format(consn),tabletext));
					}else{
						HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
						HeaderTable5.addCell(new Phrase("", tabletext));
					}
					
					PdfPCell cell5 = new PdfPCell(new Phrase(""
							+ df2.format(netAmt), tabletext));
					cell5.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cell5.setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(cell5);
				}
			}
			}

			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();

			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));

			HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));

			HeaderTable5.addCell(new Phrase("Amount In Words:", subheader));
			
			long finalam1 = 0l;
			
			if(lstPojo.size() !=0)
			{
				finalam1 = (long) lstPojo.get(0).getFirstPaid();
			}
			
			
			
			String oustandingAmt="";
			if(lstPojo.size() !=0)
			{
			if(lstPojo.get(0).getFirstPaid() > 0){
				
				oustandingAmt = EnglishNumberToWords.convert(finalam1);
			}else{
				
				oustandingAmt = " Zero ";
			}	
			}
			
			if(lstPojo.size() !=0)
			{
				HeaderTable5.addCell(new Phrase("Rs. " + oustandingAmt + " Only", tabletext));
			
			}
			else
			{
				HeaderTable5.addCell(new Phrase("Rs.  Zero  Only", tabletext));
			}

			//HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("Total Amount ("+currencyName+".) :",
					tabletext));

			PdfPCell cell5 = new PdfPCell(new Phrase(""
					+ df2.format(totAmt), tabletext));
			cell5.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell5.setBorder(Rectangle.NO_BORDER);
			HeaderTable5.addCell(cell5);

			/* HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));	
			HeaderTable5.addCell(new Phrase("", tabletext)); */

			/* if(totAmt==totConAmt){ */

			if (totConAmt > 0) {

				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				//HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
				HeaderTable5.addCell(new Phrase("Discount ("+currencyName+".) :",
						tabletext));

				PdfPCell cell7 = new PdfPCell(new Phrase(""
						+ df2.format(totConAmt), tabletext));
				cell7.setHorizontalAlignment(Element.ALIGN_RIGHT);
				cell7.setBorder(Rectangle.NO_BORDER);
				HeaderTable5.addCell(cell7);

			}

			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("Paid Amount ("+currencyName+".) :",
					tabletext));
			
			
			/* }else{
				
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("Recd Amount (Rs.) :", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
			  //	HeaderTable5.addCell(new Phrase("", tabletext)); 
			} */

			PdfPCell cell6 = new PdfPCell(new Phrase(""
					+ df2.format(paidAmt), tabletext));
			cell6.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell6.setBorder(Rectangle.NO_BORDER);
			HeaderTable5.addCell(cell6);
			
			if(totRemain != 0){
			
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("Balance Amount("+currencyName+"):",tabletext));
			
			PdfPCell cell7 = new PdfPCell(new Phrase(""
					+ df2.format(totRemain), tabletext));
			cell7.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell7.setBorder(Rectangle.NO_BORDER);
			HeaderTable5.addCell(cell7);
			}

			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
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

			// Table6 : For receipt footer start

			PdfPTable HeaderTable6 = new PdfPTable(5);
			int[] headerwidth6 = { 30, 60, 30, 20, 20 };
			HeaderTable6.setWidths(headerwidth6);
			HeaderTable6.setWidthPercentage(95f);
			HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			/* 	HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", tabletext));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader)); */

			/* HeaderTable6.addCell(new Phrase("Payment Mode", subheader));
			HeaderTable6.addCell(new Phrase(""+payMode, tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));

			HeaderTable6.addCell(new Phrase("Paid", subheader));
			HeaderTable6.addCell(new Phrase("" + df2.format(lstPojo.get(0).getTotalPaid()) , tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("Total", subheader));
			HeaderTable6.addCell(new Phrase("       " + df2.format(totPayable), subheader));
			
			HeaderTable6.addCell(new Phrase("Discount", subheader));
			HeaderTable6.addCell(new Phrase(""+ df2.format(lstPojo.get(0).getTotalDisc()), tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader)); 
			
			HeaderTable6.addCell(new Phrase("Narration", subheader));
			HeaderTable6.addCell(new Phrase(""+ lstPojo.get(0).getDiscNarrtn(), tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader)); 
			
			HeaderTable6.addCell(new Phrase("Balance", subheader));
			HeaderTable6.addCell(new Phrase(""+ df2.format(lstPojo.get(0).getTotalRemain()), tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));*/

			/* HeaderTable6.addCell(new Phrase("In Words", subheader));
			long finalam = (long) lstPojo.get(0).getTotalPaid();
			df2.format(finalam);			
			
			HeaderTable6.addCell(new Phrase(""	+ (EnglishNumberToWords.convert(finalam)
							.toUpperCase()) + " Rs. ONLY", tabletext));
			HeaderTable6.addCell(new Phrase("              Total", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.getDefaultCell().setBorder(Rectangle.BOX);
			HeaderTable6.addCell(new Phrase("       " + df2.format(totPayable), subheader));
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

			document.add(HeaderTable6);
			HeaderTable6.flushContent(); */

			/* HeaderTable6.addCell(new Phrase("Payment Mode", subheader));
			HeaderTable6.addCell(new Phrase(""+payMode, tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));

			HeaderTable6.addCell(new Phrase("Paid", subheader));
			HeaderTable6.addCell(new Phrase("" + df2.format(lstPojo.get(0).getTotalPaid()), tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("       ", subheader));
			
			if(totCon>0){
				
				HeaderTable6.addCell(new Phrase("Concession", subheader));
				HeaderTable6.addCell(new Phrase(""+ df2.format(totCon), tabletext));
			}else{
				
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", tabletext));
			}		
			
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("Total", subheader));
			HeaderTable6.addCell(new Phrase("       "+df2.format(totPayable), subheader));
			
			HeaderTable6.addCell(new Phrase("Discount", subheader));
			HeaderTable6.addCell(new Phrase(""+ lstPojo.get(0).getTotalDisc(), tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader)); 
			
			HeaderTable6.addCell(new Phrase("Balance", subheader));
			HeaderTable6.addCell(new Phrase(""+ df2.format(lstPojo.get(0).getTotalRemain()), tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader)); */

			/* HeaderTable6.addCell(new Phrase("Amount In Words:", subheader));
			long finalam = (long) lstPojo.get(0).getTotalPaid();
			HeaderTable6.addCell(new Phrase(""	+ (EnglishNumberToWords.convert(finalam)), tabletext));
			HeaderTable6.addCell(new Phrase("", subheader)); */
			/* HeaderTable6.addCell(new Phrase("Paid", subheader));
			HeaderTable6.getDefaultCell().setBorder(Rectangle.BOX);
			HeaderTable6.addCell(new Phrase("       " + df2.format(lstPojo.get(0).getTotalPaid()), subheader)); */
			/* HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader)); */

			//Code for Multiple paymode details
			/* if(pMode == -1){
				HeaderTable6.addCell(new Phrase("Payment Mode", subheader));
				HeaderTable6.addCell(new Phrase("Amount", subheader));
				HeaderTable6.addCell(new Phrase("Bank Name", subheader));
				HeaderTable6.addCell(new Phrase("Bank Number", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				
				
				for(int i = 0; i < listMultiPay.size(); i++){
					HeaderTable6.addCell(new Phrase(""+listMultiPay.get(i).getPayName(), subheader));
					HeaderTable6.addCell(new Phrase(""+df2.format(listMultiPay.get(i).getTotalPaid()), tabletext));
					HeaderTable6.addCell(new Phrase(""+listMultiPay.get(i).getbName(), tabletext));
					HeaderTable6.addCell(new Phrase(""+listMultiPay.get(i).getbNumber(), tabletext));
					HeaderTable6.addCell(new Phrase("", subheader));
				}			
			} */

			/* HeaderTable6.addCell(new Phrase("", subheader));
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

			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader)); */

			document.add(HeaderTable6);
			HeaderTable6.flushContent();
			int pMode = 0;
			if(lstPojo.size() !=0)
			{
			pMode = lstPojo.get(0).getPayMode();
			}
			PaymentModService pm=(ApplicationContextUtils.getApplicationContext()).getBean(PaymentModService.class);
			List<PaymentModDto> ltpayModeDto = new ArrayList<PaymentModDto>();
			ltpayModeDto =pm.getPaymodeById(pMode);
			
			String payMode = "";
			if(ltpayModeDto.size() > 0){
				
				payMode = ltpayModeDto.get(0).getPayName();
			}
			
			System.err.println("banknmeId==========="+payMode);
			
			/* if (pMode == 1) {

				payMode = "Cash";
			} else if (pMode == 2) {

				payMode = "Card";
			} else if (pMode == 3) {

				payMode = "Cheque";
			} else if (pMode == 4) {

				payMode = "Common Advance";
			} else if (pMode == 5) {

				payMode = "Credit";
			} else {

				payMode = "Multiple";
			} */

			String banknmeId = "";
			String cardcheqNo = "";
			String bankName = "";
			String batchNo = "";
			Date createdDate = new Date(0);
			if(lstPojo.size() != 0)
			{
				createdDate = lstPojo.get(0).getCreatedDateTime();
			}
			
			//String discRemark =  lstPojo.get(0).getDiscRemark();
			
			String dtTime="";
			SimpleDateFormat sdf1=new SimpleDateFormat("dd/MM/YYYY, hh:mm:ss a");
			if(lstPojo.size() != 0)
			{
			dtTime=sdf1.format(createdDate);
			}
			String mulDtTime="";
			double total_paid = 0.0;
			if(lstPojo.size() != 0)
			{
				total_paid = lstPojo.get(0).getFirstPaid();
			}
			if (total_paid <= 0) {
				total_paid = 0;
			}
			
			if(lstPojo.size() != 0)
			{

			if (pMode == 2 || pMode == 3) {

				banknmeId = lstPojo.get(0).getbName();
				cardcheqNo = lstPojo.get(0).getbNumber();
				Integer bankid = Integer.parseInt(banknmeId);
				batchNo = lstPojo.get(0).getBatchNumber();

				if (!(bankid == null || bankid.equals(""))) {

					bankName = fetchlist.getStringValOfObject(
							"pharma_bank_master", "bank_name", bankid,
							"bank_id");
				}
				if (cardcheqNo == null || cardcheqNo.equals("")) {

					cardcheqNo = "";
				}
			}
			}
			
			PdfPTable HeaderTable8 = new PdfPTable(7);
			int[] headerwidth8 = { 14, 21, 24, 24, 15,15, 15 };
			HeaderTable8.setWidths(headerwidth8);
			HeaderTable8.setWidthPercentage(95f);
			HeaderTable8.setSpacingAfter(20f);
			HeaderTable8.getDefaultCell().setBorder(Rectangle.TOP);

			HeaderTable8.addCell(new Phrase("Pay Mode", subheader));
			HeaderTable8.addCell(new Phrase("Bank Name", subheader));
			/* HeaderTable8.addCell(new Phrase("Branch Name", subheader)); */
			HeaderTable8.addCell(new Phrase("Chq/ECS/  CardNo", subheader));
			HeaderTable8.addCell(new Phrase("Date", subheader));
			HeaderTable8.getDefaultCell().setHorizontalAlignment(
					Element.ALIGN_RIGHT);
			HeaderTable8.addCell(new Phrase("Amount", subheader));
			HeaderTable8.addCell(new Phrase("Remark", subheader));
			HeaderTable8.addCell(new Phrase("Batch No", subheader));

			if (pMode == -1) {

				HeaderTable8.getDefaultCell().setHorizontalAlignment(
						Element.ALIGN_LEFT);
				HeaderTable8.addCell(new Phrase("", subheader));
				HeaderTable8.addCell(new Phrase("", subheader));
				/* HeaderTable8.addCell(new Phrase("Branch Name", subheader)); */
				HeaderTable8.addCell(new Phrase("", subheader));
				HeaderTable8.addCell(new Phrase("", subheader));
				HeaderTable8.addCell(new Phrase("", subheader));
				HeaderTable8.addCell(new Phrase("", subheader));
				HeaderTable8.addCell(new Phrase("", subheader));

				HeaderTable8.getDefaultCell().setBorder(Rectangle.TOP);
				
				for (int i = 0; i < listMultiPay.size(); i++) {

					Date mulCreatedDate = listMultiPay.get(i)
							.getCreatedDateTime();
					mulDtTime=sdf1.format(mulCreatedDate);

					
					HeaderTable8.getDefaultCell().setBorder(
							Rectangle.NO_BORDER);
					HeaderTable8.getDefaultCell().setHorizontalAlignment(
							Element.ALIGN_LEFT);
					HeaderTable8.addCell(new Phrase(""
							+ listMultiPay.get(i).getPayName(), tabletext));
					HeaderTable8.addCell(new Phrase(""
							+ listMultiPay.get(i).getbName(), tabletext));
					/* HeaderTable8.addCell(new Phrase("", tabletext)); */
					HeaderTable8.addCell(new Phrase(""
							+ listMultiPay.get(i).getbNumber(), tabletext));
					HeaderTable8.addCell(new Phrase("" +mulDtTime,
							tabletext));
					HeaderTable8.getDefaultCell().setHorizontalAlignment(
							Element.ALIGN_RIGHT);
					HeaderTable8
							.addCell(new Phrase(""
									+ listMultiPay.get(i).getTotalPaid(),
									tabletext));
					HeaderTable8
					.addCell(new Phrase(""
							+ discRemark,
							tabletext));
					HeaderTable8.addCell(new Phrase(""
							+ listMultiPay.get(i).getBatchNumber(),
							tabletext));
				}

			} else {

				HeaderTable8.getDefaultCell().setHorizontalAlignment(
						Element.ALIGN_LEFT);
				HeaderTable8.addCell(new Phrase("" + payMode, tabletext));
				HeaderTable8.addCell(new Phrase("" + bankName, tabletext));
				/* 	HeaderTable8.addCell(new Phrase("", tabletext)); */
				HeaderTable8
						.addCell(new Phrase("" + cardcheqNo, tabletext));
				HeaderTable8
						.addCell(new Phrase("" + dtTime, tabletext));
				HeaderTable8.getDefaultCell().setHorizontalAlignment(
						Element.ALIGN_RIGHT);
				HeaderTable8
						.addCell(new Phrase("" + total_paid, tabletext));
				HeaderTable8
				.addCell(new Phrase("" + discRemark, tabletext));
				HeaderTable8.addCell(new Phrase("" + batchNo, tabletext));

				HeaderTable8.getDefaultCell()
						.setBorder(Rectangle.NO_BORDER);
			}

			document.add(HeaderTable8);
			HeaderTable8.flushContent();

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

			if (labId == 1 || sponsorSlave > 0) {

				/* HeaderTable4.addCell(new Phrase("                       Payee Signature",tabletext));
				HeaderTable4.addCell(new Phrase("", tabletext));
				
				HeaderTable4.addCell(new Phrase("Authorized Signatory",	tabletext));
				
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
				HeaderTable4.flushContent(); */

				PdfPTable HeaderTable7 = new PdfPTable(3);
				int[] headerwidth7 = { 80, 25, 30 };
				HeaderTable7.setWidths(headerwidth7);
				HeaderTable7.setWidthPercentage(95f);
				HeaderTable7.getDefaultCell()
						.setBorder(Rectangle.NO_BORDER);

				HeaderTable7.getDefaultCell()
						.setBorder(Rectangle.NO_BORDER);
				HeaderTable7
						.addCell(new Phrase(
								"1. Please bring this receipt while collecting the reports",
								tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));

				HeaderTable7.addCell(new Phrase(
						"2. Please collect the report within one month.",
						tabletext));
				HeaderTable7.addCell(new Phrase("Payee Signature", subheader));
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
				

				/* HeaderTable7.addCell(new Phrase("2. Reports will not be issued without the receipt.", tabletext));
				HeaderTable7.addCell(new Phrase("Prepared By", tabletext));
				HeaderTable7.addCell(new Phrase(" "+user_name, tabletext));
				
				HeaderTable7.addCell(new Phrase("3. Lab timing : Mon - Fri:7.30 am- 8.30 pm, Sun: 8.00 am- 12.30 noon", tabletext));
				HeaderTable7.addCell(new Phrase(""+hospitalName, tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));
				
				HeaderTable7.addCell(new Phrase("4. Please refer to the Turn Around timeschedule for your reports.", tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));
				
				HeaderTable7.addCell(new Phrase("5. Outsourcing is performed as per hospital policy.", tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext));
				HeaderTable7.addCell(new Phrase("", tabletext)); */

				document.add(HeaderTable7);
				HeaderTable7.flushContent();

			}/* else if(totAmt==totConAmt){
				
				HeaderTable4.addCell(new Phrase("                       User :",tabletext));
				HeaderTable4.addCell(new Phrase(""+ user_name, tabletext));
				
				HeaderTable4.addCell(new Phrase("Signature",	tabletext));
				
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
				
				} */else {

				
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