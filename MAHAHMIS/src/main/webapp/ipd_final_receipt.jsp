<%@page import="com.hms.opdbill.dto.PatientHeaderInfoDto"%>
<%@page import="com.hms.ipd.service.BedMgtService"%>
<%@page import="com.hms.users.service.UsersService"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.ehat.dto.PaymentModDto"%>
<%@page import="com.hms.ehat.service.PaymentModService"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.ehat.dto.PatientSubServiceDetailsForOpdPackage"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.service.CommonadvService"%>	<!-- jitendra -->
<%@page import="com.hms.ehat.dto.CommonadvDto"%>	<!-- jitendra -->
<%@page import="com.hms.ehat.dto.DoctorDto"%>
<%@page import="com.hms.ehat.controller.MarkVisitController"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.ipdbill.dto.MultiBillReceiptMasterDTO"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="java.util.ArrayList"%>
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
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants, com.hms.pharmacy.upload.FilePath"%>
<!DOCTYPE html>
<html>
<head>
<meta  http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Ipd Advance Receipt</title>
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

			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			
			response.setHeader("Content-Disposition", "inline; filename = IPD Final Receipt");
			
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			document.setMargins(20, 20, 20, 20);
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String billPrint = (String) resourceBundle.getObject("billPrint").toString();
			String billPrintsHeader = (String) resourceBundle.getObject("billPrintsHeader").toString();	
			String concessionFlow = (String) resourceBundle.getObject("concessionFlow").toString();
			
			//for centerpatientId
		    String patientId= resourceBundle.getObject("patientIdLabel").toString();

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
			String user_name    = (String) session.getAttribute("userName");
			int unitId          = (Integer)session.getAttribute("uId");
			
			String path         = hospObj.getFilePath();
			String hospitalName = hospObj.getHospitalName();
			//hospitalName = hospitalName.toUpperCase();			
			String address      = hospObj.getHospitalAddress();
			String city         = hospObj.getHospitalCity();
			String contact      = hospObj.getHospitalContact();
			String path1        = application.getRealPath(path);
			String gstNo        =  hospObj.getTxtGstNo();
			String hospitalZip  = hospObj.getHospitalZip(); 			
			String PhoneNo      =  hospObj.getHospitalContact();
			String secPhoneNo   =  hospObj.getSecPNo();
			String webste       =   hospObj.getWebsite();
			String email        =   hospObj.getHospitalEmail();
			String cinNo	    =   hospObj.getTxtCinNo();
			String serviceTaxNo	=   hospObj.getTxtSerTaxNo();
			String panNo	    =   hospObj.getPanNo();
			String hPhoneNo     = PhoneNo+"/"+secPhoneNo;
			String nabh         = hospObj.getNabhImagePath(); 
			String nabhLogo     = application.getRealPath(nabh);
			
			Image img = null;
			PdfPCell cell = null;
			try {
				img = Image.getInstance(path1);
				img.scaleAbsolute(100, 60);
				cell = new PdfPCell();
				cell.addElement(new Chunk(img, 1, -32));
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
			/* int patId=Integer.parseInt(request.getParameter("patId"));
			Integer treatmentId=Integer.parseInt(request.getParameter("treatmentId"));
			int psId=Integer.parseInt(request.getParameter("psId"));
			int pSubSId=Integer.parseInt(request.getParameter("pSubSId"));
			int billDetailsId=Integer.parseInt(request.getParameter("billDetailsId"));
			int sponsorId = Integer.parseInt(request.getParameter("sponsorId"));
			int chargesSlaveId = Integer.parseInt(request.getParameter("chargesSlaveId")); */
			
			Integer treatmentId=Integer.parseInt(request.getParameter("treatId"));
			Integer recId=Integer.parseInt(request.getParameter("recId"));
			Integer patId=Integer.parseInt(request.getParameter("patId"));
			//Integer outChk=Integer.parseInt(request.getParameter("outChk"));
			
			//calling service leyer method to get patient records
			BedMgtService us = (ApplicationContextUtils.getApplicationContext()).getBean(BedMgtService.class);
			PatientHeaderInfoDto rtd = us.getIpdPatientHeaderInfo(treatmentId, unitId).getListRegTreBillDto().get(0);
		
			String totalAdvc = "0.00";	//jitendra
			
			Integer billId        = rtd.getBillId();
			Integer PatientID     = rtd.getPatientId();
			Integer departmentId  = rtd.getDepartmentId();
			String pname          = rtd.getPatientName();
			String MRNo           = rtd.getMrnno();
			String age	          = rtd.getAge();
			String gender         = rtd.getGender();
			String AgeSexWt       = age+" /"+gender;
			String treatmentCount = rtd.getTrcount();
			String ContactNo      = rtd.getMobile();
			int Departmentid      = rtd.getDepartmentId();
			String TokenNo        = rtd.getTokenno();
			Date appDate          = rtd.getCreatedDateTime();
			String opdipdno       = rtd.getOpdipdno();
			String weight  	      = "";
			String height  	      = "";
			String wetHeg         = weight+" /"+height;
			String docId          = rtd.getDoctorId();
			String docName="";
			int count=0;
			
			// patient address
			String addressPatient = "";
			String patientAdd = "";
			String per_patient_address = "";
			String perPatientAdd = "";
			String relativeName ="";
						
			 int stateId = rtd.getStateId();
			 int townId   =rtd.getTownId();
			 int districtId =rtd.getDistrictId();
			 int talukaId   =rtd.getTalukaId();
			 int sponsorSlave=rtd.getChargesMasterSlaveId();
			 
			 String BillCategoryName ="";
			 String state  ="";
			 String district  ="";
			 String cityObj  ="";
			 String taluka  ="";
			 String spLeafName = rtd.getCategoryName();
			 
			 patientAdd=rtd.getAddress();
			 
			 if(rtd.getPerAddress()!=null){
				 perPatientAdd=rtd.getPerAddress();
			 }
			
			 relativeName=rtd.getRelativeName();
			 if(relativeName == null){
				 relativeName="";
			 }
			 
			//For Permanent Address on 08-May-2018.
			 int perstateId = rtd.getPerstateId();
			 int pertownId   =rtd.getPertownId();
			 int perdistrictId =rtd.getPerdistrictId();
			 int pertalukaId   =rtd.getPertalukaId();
			 
			 if(rtd.getPerAddress()!=null){
				 perPatientAdd = rtd.getPerAddress();
			 }
			 
			 String perstate  ="";
			 String perdistrict  ="";
			 String percityObj  ="";
			 String pertaluka  ="";
			 
			LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
			
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
			String callFrom="receiptIpd";
			/* String pendFlag = request.getParameter("pendFlag");
			if(pendFlag.equals("Y")){
				
				callFrom="prevReceiptIpd";
			}else{
				
				callFrom="receiptIpd";
			} */ 
			lstPojo=hm.getOpdRecDetails(billId, treatmentId, patId, recId, callFrom); 
			
			int recCount = lstPojo.get(0).getReceiptCount();
			
			if(lstPojo.get(0).getCommonAdv() != null)
				totalAdvc = lstPojo.get(0).getCommonAdv().split(",")[1];			
			
			//irfan khan 11-jan-2018 multi pay mode list
			List<MultiBillReceiptMasterDTO> listMultiPay = new ArrayList<MultiBillReceiptMasterDTO>();
			listMultiPay=hm.getMultiRecDetails(billId, treatmentId, patId, recId, departmentId);
			DecimalFormat df2 = new DecimalFormat("0.00");
			
			int pMode=lstPojo.get(0).getPayMode();
			PaymentModService pm=(ApplicationContextUtils.getApplicationContext()).getBean(PaymentModService.class);
			List<PaymentModDto> ltpayModeDto = new ArrayList<PaymentModDto>();
			ltpayModeDto =pm.getPaymodeById(pMode);
			
			String payMode = "";
			if(ltpayModeDto.size() > 0){
				
				payMode = ltpayModeDto.get(0).getPayName();
			}		
			
			String banknmeId ="";
			String cardcheqNo ="";
			String bankName="";
			String batchNo="";
			String discRemak = lstPojo.get(0).getDiscRemark();
			Date createdDate=lstPojo.get(0).getCreatedDateTime();
			
			String dtTime="";
			SimpleDateFormat sdf1=new SimpleDateFormat("dd/MM/yyyy, hh:mm:ss a");
			dtTime=sdf1.format(createdDate);
			String mulDtTime="";
			
			double total_paid= lstPojo.get(0).getTotalPaid();
			if(total_paid <= 0 ){
				total_paid=0;
			}
			
			if(pMode==2 || pMode==3){
				
				banknmeId = lstPojo.get(0).getbName();
				cardcheqNo = lstPojo.get(0).getbNumber();				
				Integer bankid = Integer.parseInt(banknmeId);
				batchNo = lstPojo.get(0).getBatchNumber();
				
				if(!(bankid == null || bankid.equals(""))){
					
					bankName = fetchlist.getStringValOfObject("pharma_bank_master","bank_name",bankid,"bank_id");
				} 				
				if(cardcheqNo == null || cardcheqNo.equals("")){
					
					cardcheqNo="";
				}
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
				addressPatient += (", " + state);
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
			
			document.newPage();			
			
			// AdminModel adminModel = new AdminModel();
			int printId = 2;
			int numOfPrint = 1;//adminModel.generalAccessNumOfPrint(printId);// to get number of prints
	
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
			
			//added by vishant
			SimpleDateFormat dateTimeFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm a");
           	Date currDate = new Date(new java.util.Date().getTime());
           	String currentDateTime = dateTimeFormat.format(currDate);
			
			// Table 2 : For receipt head start
			
			PdfPTable HeaderTable2 = new PdfPTable(3);
			int[] headerwidth2 = { 30,30,30 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(new Phrase("Print Date: "+currentDateTime, subheader));
			/* PdfPCell subcell = new PdfPCell(new Phrase("",subheader));
			subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
			subcell.setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(subcell); */
			HeaderTable2.addCell(new Phrase("                   IPD FINAL RECEIPT ", subheader));	//jitendra IPD ADVANCE RECEIPT
			HeaderTable2.addCell(new Phrase("Printed By: "+user_name, subheader));
			//HeaderTable2.addCell(new Phrase("", subheader));
			document.add(HeaderTable2);
			HeaderTable2.flushContent();
			
			// Table 2 : For receipt head end
			String PType = "";
            int a=rtd.getSourceTypeId();
            if(a>0){
                PType="Sponsor";
            }else{
                PType="Self";                 
            }
            
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
            SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm a");
           	Date now = new Date(new java.util.Date().getTime());
           	String strDate = sdf.format(now);
    		String rtime   = sdf2.format(now);
            
    		Date adm = new Date(rtd.getCreatedDateTime().getTime());
           	String admDate = sdf.format(adm);
    		String admTime   = sdf2.format(adm);
    		
    		Number billNo = 0;
    		if(rtd.getInvoiceFlag().equalsIgnoreCase("Y")){
    			billNo = rtd.getInvoiceCount();
    		}
    		
            // Table3 : For patient header info start
           
            PdfPTable HeaderTable3 = new PdfPTable(4);
			int[] headerwidth3 = { 25, 55, 25, 55 };
			HeaderTable3.setWidths(headerwidth3);
			HeaderTable3.setWidthPercentage(95f);
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
            
			//added by sandip
            if(patientId.equalsIgnoreCase("UHID")){
					HeaderTable3.addCell(new Phrase(""+patientId, subheader));
					HeaderTable3.addCell(new Phrase(": "+rtd.getCenterPatientId(), tabletext));
            }else{
            		HeaderTable3.addCell(new Phrase(""+patientId, subheader));
    				HeaderTable3.addCell(new Phrase(": "+patId, tabletext));
            }
			/* HeaderTable3.addCell(new Phrase("Treatment ID", subheader));
			HeaderTable3.addCell(new Phrase(": "+treatmentId, tabletext)); */
			
			HeaderTable3.addCell(new Phrase("Patient Name ", subheader));
			HeaderTable3.addCell(new Phrase(": "+ rtd.getPatientName(), tabletext));			
			
			/* HeaderTable3.addCell(new Phrase("Time ", subheader));
			HeaderTable3.addCell(new Phrase(": "+ rtime, tabletext));
			 */
			HeaderTable3.addCell(new Phrase("Res. Address", subheader));
			HeaderTable3.addCell(new Phrase(": "+ patientAdd.toLowerCase()+" "+addressPatient.toLowerCase(), tabletext));
			HeaderTable3.addCell(new Phrase("Per. Address", subheader));
			HeaderTable3.addCell(new Phrase(": "+ perPatientAdd.toLowerCase()+" "+per_patient_address.toLowerCase(), tabletext));
			
			HeaderTable3.addCell(new Phrase("Relative Name ", subheader));
			HeaderTable3.addCell(new Phrase(": "+relativeName, tabletext));
			HeaderTable3.addCell(new Phrase("Contact", subheader));
			HeaderTable3.addCell(new Phrase(": "+rtd.getMobile(), tabletext));
			
			HeaderTable3.addCell(new Phrase("Admission Date ", subheader));
			HeaderTable3.addCell(new Phrase(": "+admDate+" "+admTime, tabletext));			
			HeaderTable3.addCell(new Phrase("Age", subheader));
			HeaderTable3.addCell(new Phrase(": "+rtd.getAge(), tabletext));
			
			HeaderTable3.addCell(new Phrase("Bill No       ", subheader));
			HeaderTable3.addCell(new Phrase(": "+ billNo, tabletext));
			
			HeaderTable3.addCell(new Phrase("Sponsor ", subheader));
			HeaderTable3.addCell(new Phrase(": "+spLeafName, tabletext));			
			HeaderTable3.addCell(new Phrase(" ", subheader));
			HeaderTable3.addCell(new Phrase(" ", tabletext));
			
            HeaderTable3.addCell(new Phrase("Receipt No. ",subheader));
			HeaderTable3.addCell(new Phrase(": "+recCount,tabletext));
			
			HeaderTable3.addCell(new Phrase("IPD No ",subheader));
			HeaderTable3.addCell(new Phrase(": "+opdipdno,tabletext));

			/* HeaderTable3.addCell(new Phrase("Date ",subheader));
			HeaderTable3.addCell(new Phrase(": " +strDate, tabletext)); */
			
			HeaderTable3.addCell(new Phrase("Consultant", subheader));
			HeaderTable3.addCell(new Phrase(": "+rtd.getConsultingDocName(), tabletext));
			
			//AdminModel admodel1 = new AdminModel();
			/* UsersService uss = (ApplicationContextUtils.getApplicationContext()).getBean(UsersService.class);
			List<Doctor> listDoc2 = null;

			if(rtd.getDoctorId().contains(",")){
				
				String[] doctors = rtd.getDoctorId().split(",") ;
				String Doc_Nme = "";
				String Depart = "";
				for(String str :doctors )
				{
					String DocID = str;
					int docId23 =  Integer.parseInt(str);
					listDoc2 = uss.getDoctorsDepDetails(docId23);
					 Doc_Nme = Doc_Nme + listDoc2.get(0).getDoc_name()+",";
					 Depart = Depart + listDoc2.get(0).getDepartmentName()+",";
							
				}
				HeaderTable3.addCell(new Phrase("Consultant", subheader));
				HeaderTable3.addCell(new Phrase(": "+Doc_Nme, tabletext));			
				HeaderTable3.addCell(new Phrase("Department", subheader));
				HeaderTable3.addCell(new Phrase(": "+Depart, tabletext));
				
			}
			else{
				if(rtd.getDoctorId() != ""){
					
					int docId1 =  Integer.parseInt(rtd.getDoctorId());
				
					listDoc2 = uss.getDoctorsDepDetails(docId1);
				
					HeaderTable3.addCell(new Phrase("Consultant Doc.", subheader));
					HeaderTable3.addCell(new Phrase(": "+listDoc2.get(0).getDoc_name(), tabletext));			
					HeaderTable3.addCell(new Phrase("Department", subheader));
					HeaderTable3.addCell(new Phrase(": "+listDoc2.get(0).getDepartmentName(), tabletext));
				}
			} */
		/* 	
			HeaderTable3.addCell(new Phrase("Time ", subheader));
			HeaderTable3.addCell(new Phrase(": "+ rtime, tabletext));

			HeaderTable3.addCell(new Phrase(" ", subheader));
			HeaderTable3.addCell(new Phrase(" " , tabletext)); */
			
			
			Integer createdUserId = lstPojo.get(0).getCreatedBy();
			String createdUserName="";
			if(createdUserId!=0 ||createdUserId!=null){	
				RegService regService = (ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
				//Integer userId = ltpayModeDto.get(0).getCreatedBy();
				createdUserName = regService.getUserNameByUserid(createdUserId);
			}
			 
			document.add(HeaderTable3);
			HeaderTable3.flushContent();
			
			// Table3 : For patient header info end
			 
			// Table5 : For service details head start
			 
			PdfPTable HeaderTable5 = new PdfPTable(2);
			int[] headerwidth5 = { 11, 50 };
			HeaderTable5.setWidths(headerwidth5);
			HeaderTable5.setWidthPercentage(95f);
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
			 
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			/* if(outChk==1){
				
				HeaderTable5.addCell(new Phrase("Final Paid", subheader));
				HeaderTable5.addCell(new Phrase(" : "+total_paid, tabletext));	
				
				HeaderTable5.addCell(new Phrase("Final Against", subheader));
				HeaderTable5.addCell(new Phrase(" : Hospital Bill", tabletext));
			}else{ */				
				
				HeaderTable5.addCell(new Phrase("Advance Paid", subheader));
				HeaderTable5.addCell(new Phrase(" : "+total_paid, tabletext));	
				HeaderTable5.addCell(new Phrase("Advance Against", subheader));
				HeaderTable5.addCell(new Phrase(" : Hospital Bill", tabletext));				
				
			/* } */			
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();

			HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
					
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
			
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
			
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
		
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
			
			// Table5 : For service details head end
			
			// Table6 : For receipt footer start
						
			PdfPTable HeaderTable6 = new PdfPTable(5);
			int[] headerwidth6 = { 25, 55, 30, 20, 20 };
			HeaderTable6.setWidths(headerwidth6);
			HeaderTable6.setWidthPercentage(95f);
			HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			
			
			
			HeaderTable6.addCell(new Phrase("Amount In Words", subheader));
		    long finalam2 = (long) total_paid;
			df2.format(finalam2); 		
			
			HeaderTable6.addCell(new Phrase("Rs. "	+ (EnglishNumberToWords.convert(finalam2)
							.toUpperCase()) + " ONLY", tabletext));
			HeaderTable6.addCell(new Phrase("", tabletext)); 
			HeaderTable6.addCell(new Phrase("            Total", subheader));
			
			HeaderTable6.getDefaultCell().setBorder(Rectangle.BOX);
			HeaderTable6.addCell(new Phrase("" + finalam2, subheader));
			HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
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
			HeaderTable6.flushContent();
			
			PdfPTable HeaderTable8 = new PdfPTable(6);
			int[] headerwidth8 = { 15, 15, 15, 25, 15, 25 };
			HeaderTable8.setWidths(headerwidth8);
			HeaderTable8.setWidthPercentage(95f);
			HeaderTable8.getDefaultCell().setBorder(Rectangle.TOP);
					
			HeaderTable8.addCell(new Phrase("Payment Mode", subheader));
			HeaderTable8.addCell(new Phrase("Bank Name", subheader));
			//HeaderTable8.addCell(new Phrase("", subheader));
			HeaderTable8.addCell(new Phrase("Chq/ECS/CardNo", subheader));
			HeaderTable8.addCell(new Phrase("Date/Time", subheader));
			HeaderTable8.addCell(new Phrase("Amount", subheader));
			HeaderTable8.addCell(new Phrase("Remark", subheader));
		
			if(discRemak==null || discRemak.equals("null")){
				
				discRemak="-";
			}
			
			if(pMode == -1){
				
				HeaderTable8.addCell(new Phrase("", tabletext));
				HeaderTable8.addCell(new Phrase("", tabletext));
				HeaderTable8.addCell(new Phrase("", tabletext));
				HeaderTable8.addCell(new Phrase("", tabletext));
				HeaderTable8.addCell(new Phrase("", tabletext));
				HeaderTable8.addCell(new Phrase("", tabletext));
				//HeaderTable8.addCell(new Phrase("", tabletext));
				HeaderTable8.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				for(int i = 0; i < listMultiPay.size(); i++){
					
					Date mulCreatedDate = listMultiPay.get(i)
							.getCreatedDateTime();
					mulDtTime=sdf1.format(mulCreatedDate);
					
					HeaderTable8.addCell(new Phrase(""+listMultiPay.get(i).getPayName(), tabletext));
					HeaderTable8.addCell(new Phrase(""+listMultiPay.get(i).getbName(), tabletext));
					//HeaderTable8.addCell(new Phrase("", tabletext));
					HeaderTable8.addCell(new Phrase(""+listMultiPay.get(i).getbNumber(), tabletext));
					HeaderTable8.addCell(new Phrase("" +mulDtTime, tabletext));
					HeaderTable8.addCell(new Phrase(""+listMultiPay.get(i).getTotalPaid(), tabletext));
					HeaderTable8.addCell(new Phrase(""+discRemak, tabletext));
					
				}
				
			}else{
				HeaderTable8.addCell(new Phrase(""+payMode, tabletext));
				HeaderTable8.addCell(new Phrase(""+bankName, tabletext));
				//HeaderTable8.addCell(new Phrase("", tabletext));
				HeaderTable8.addCell(new Phrase(""+cardcheqNo, tabletext));
				HeaderTable8.addCell(new Phrase(""+dtTime, tabletext));
				HeaderTable8.addCell(new Phrase(""+total_paid, tabletext));
				HeaderTable8.addCell(new Phrase(""+discRemak, tabletext));
				
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
			
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			
			/* jitendra */
			HeaderTable4.addCell(new Phrase("Total Common Advance : "+totalAdvc, subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			
			document.add(HeaderTable4);
			HeaderTable4.flushContent();
			

			/* HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));	 */
			
			HeaderTable4.setSpacingBefore(50f);
			
			HeaderTable4.addCell(new Phrase(" Payee Signature",tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));
			//HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			/* 	HeaderTable4.addCell(new Phrase(
							"                       Payee Signature", tabletext)); */
			HeaderTable4.addCell(new Phrase("Authorized Signatory",
					tabletext));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase(""+ createdUserName, subheader));
			
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			
			document.add(HeaderTable4);
			HeaderTable4.flushContent();
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("" , subheader));

			document.add(HeaderTable4);
			HeaderTable4.flushContent();

			HeaderTable4.addCell(new Phrase("", tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));

			document.add(HeaderTable4);
			HeaderTable4.flushContent();
			
			// Table4 : For page footer end
						
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
							
			document.close();

			outStream.flush();
			outStream.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	%>
	
</body>
</html>