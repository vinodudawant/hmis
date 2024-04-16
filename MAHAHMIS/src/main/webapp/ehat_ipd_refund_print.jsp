<%@page import="com.hms.opdbill.dto.PatientHeaderInfoDto"%>
<%@page import="com.hms.ipd.service.BedMgtService"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.ehat.dto.PatientSubServiceDetailsForOpdPackage"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.dto.DoctorDto"%>
<%@page import="com.hms.ehat.controller.MarkVisitController"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.ipdbill.dto.MultiBillReceiptMasterDTO"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="java.util.ArrayList"%>
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
<meta  http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Ipd Refund Receipt</title>
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
			// ============ Call for get hospital details =================//
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);

			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			
			response.setHeader("Content-Disposition", "inline; filename = IPD Refund Receipt");
			
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
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
			
		    
			//calling service leyer method to get patient records
			//RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
			BedMgtService us = (ApplicationContextUtils.getApplicationContext()).getBean(BedMgtService.class);
			//============ Call for get patient Demographics =============//
			PatientHeaderInfoDto rtdd = us.getIpdPatientHeaderInfo(treatmentId, 1);
			List<PatientHeaderInfoDto> ltRegMasterDto = rtdd.getListRegTreBillDto();
			
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
			String weight  	="";//ltRegMasterDto.get(0).getWeight();
			String height  	="";//ltRegMasterDto.get(0).getHeight();
			String wetHeg   =weight+" /"+height;
			String docId=ltRegMasterDto.get(0).getDoctorId();
			String docName="";
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
			 
			LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
			//AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
			//List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
			BillCategoryName = ltRegMasterDto.get(0).getCategoryName();
			
			/* BillService fetchReceiptId=(ApplicationContextUtils.getApplicationContext()).getBean(BillService.class);	
			int recId = fetchReceiptId.fetchreceiptId(treatmentId, billDetailsId); */ 
			/* if(doctorId > 0){
				Consultant   = fetchlist.getStringValOfObject("doctor","doc_name",doctorId,"Doctor_ID");
			} */ 
			
			/* if(sponsorSlave > 0){
				fetchsposor   = obj.fetchSuperCatofchargesSlave(sponsorSlave);
				BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
			}else{
				BillCategoryName = "Self";
			} */
			
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
			
			DateFormat dateFormat = new SimpleDateFormat("dd/MM/YYYY, hh:mm:ss a");
			Date date = new Date();
			String curDate=dateFormat.format(date);
			
			//HisabModel hm=new HisabModel();
			BillService hm = (ApplicationContextUtils.getApplicationContext()).getBean(BillService.class);
			List<BillReceiptMasterDTO> lstPojo = new ArrayList<BillReceiptMasterDTO>();
			String callFrom="refundIpd";		 	
			lstPojo=hm.getOpdRecDetails(billId, treatmentId, patId, recId, callFrom); 
			int recCount=lstPojo.get(0).getReceiptCount();
			
			//irfan khan 11-jan-2018 multi pay mode list
			List<MultiBillReceiptMasterDTO> listMultiPay = new ArrayList<MultiBillReceiptMasterDTO>();
			listMultiPay=hm.getMultiRecDetails(billId, treatmentId, patId, recId, departmentId);
			DecimalFormat df2 = new DecimalFormat("0.00");
			
			Integer createdUserId = lstPojo.get(0).getCreatedBy();
			String createdUserName="";
			if(createdUserId!=null || createdUserId!=0){	
				RegService regService = (ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
				Integer userId = lstPojo.get(0).getCreatedBy();
				createdUserName = regService.getUserNameByUserid(userId);
			}
			int pMode=lstPojo.get(0).getPayMode();
			String payMode="";
			if(pMode==1){
				
				payMode="Cash";
			}else if(pMode==2){
				
				payMode="Card";
			}else if(pMode==3){
				
				payMode="Cheque";
			}else if(pMode==4){
				
				payMode="Common Advance";
			}else if(pMode==5){
				
				payMode="Credit";
			}else{
				
				payMode="Multiple";
			}		
			
			String banknmeId =lstPojo.get(0).getbName();
			String cardcheqNo =lstPojo.get(0).getbNumber();
			Date   createdDate=lstPojo.get(0).getCreatedDateTime();
			double total_paid= lstPojo.get(0).getTotalPaid();
			
			
			
			Integer bankid = Integer.parseInt(banknmeId);
			String bankName="";
			if(bankid > 0 ){
				bankName   = fetchlist.getStringValOfObject("pharma_bank_master","bank_name",bankid,"bank_id");
			} 
			if(total_paid <= 0 ){
				total_paid=0;
			}
			if(cardcheqNo == null ){
				cardcheqNo="";
			}
			
			
			// patient address
			String addressPatient = "";
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
			if(cityObj != "0" && !cityObj.equals("undefined") && !cityObj.equals("")){
				addressPatient += cityObj;
			}
			
			if (taluka != "0" && !taluka.equals("undefined") && !taluka.equals("")) 
			{
				addressPatient +=  (" "+taluka);
			}						
			if (district != "0" && !district.equals("undefined") && !district.equals("")) 
			{
				addressPatient += ("  " + district);
			}
			/* if (state != "0" && !state.equals("undefined") && !state.equals("")) 
			{
				addressPatient += (", " + state);
			} */
			// end : patient address
			
			
			document.newPage();			
			
			//AdminModel adminModel = new AdminModel();
			int printId = 2;
			int numOfPrint = 1;//adminModel.generalAccessNumOfPrint(printId);// to get number of prints
	
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
			p.add(new Chunk(" \n\n"+address, tabletext));			
			p.add(new Chunk(" "+city+" Pin- "+hospitalZip, tabletext));
			p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
			p.add(new Chunk(" \n "+webste+" email: "+email, tabletext));
			//p.add(new Chunk(" \nPAN No : "+panNo , tabletext));	
		/* 	p.add(new Chunk(" \nCIN: "+cinNo, tabletext));	
			p.add(new Chunk(" \nSERVICE TAX NO : "+serviceTaxNo+", PAN No: "+panNo, tabletext)); */	
			
			PdfPCell hospitalNameCell = new PdfPCell(p);				
			hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
			HeaderTable1.addCell(hospitalNameCell);
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String billPrint = (String) resourceBundle.getObject("billPrint").toString();
			
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
			
			HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			// Table 1 : For hospital adress details end
			
			// Table 2 : For receipt head start
			
			PdfPTable HeaderTable2 = new PdfPTable(3);
			int[] headerwidth2 = { 30,30,30 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(new Phrase("Print Date:"+curDate, subheader));
			/* PdfPCell subcell = new PdfPCell(new Phrase("",subheader));
			subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
			subcell.setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(subcell); */
			HeaderTable2.addCell(new Phrase("                   IPD REFUND RECEIPT ", subheader));
			HeaderTable2.addCell(new Phrase("Printed By:"+user_name, subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			document.add(HeaderTable2);
			HeaderTable2.flushContent();
			
			// Table 2 : For receipt head end

			
			//RegistrationController regCon=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
            PatientHeaderInfoDto rtd = new PatientHeaderInfoDto();  
            rtd = rtdd.getListRegTreBillDto().get(0);
            //List<RegTreBillDto> ltPatientRecord = null;
            String PType = "";
           
            rtd.getPatientName();
            int a=rtd.getChargesMasterSlaveId();
            if(a>0){
                PType="Sponsor";
            }else{
                PType="Self";                 
            } 
            
            // Table3 : For patient header info start
           
            PdfPTable HeaderTable3 = new PdfPTable(4);
			int[] headerwidth3 = { 30, 50, 30, 50 };
			HeaderTable3.setWidths(headerwidth3);
			HeaderTable3.setWidthPercentage(95f);
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
            
            HeaderTable3.addCell(new Phrase("Receipt No. ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+recCount,tabletext));
			
			HeaderTable3.addCell(new Phrase("Ipd No. ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+opdipdno,tabletext));
            
			HeaderTable3.addCell(new Phrase("Paid To ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+pname,tabletext));

			String dtTime="";
			Date dt =null;
			dt = rtd.getCreatedDateTime();
			SimpleDateFormat sdf=new SimpleDateFormat("dd/MM/YYYY, hh:mm:ss a");
			dtTime=sdf.format(dt);
			
			
			
			/* HeaderTable3.addCell(new Phrase("Date ",subheader));
			HeaderTable3.addCell(new Phrase(" : " +curDate , tabletext)); */
			
			HeaderTable3.addCell(new Phrase("Patient Type ",subheader));
			HeaderTable3.addCell(new Phrase(" : " +BillCategoryName , tabletext));
			
			HeaderTable3.addCell(new Phrase("Ipd Refund Against ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+lstPojo.get(0).getAgainstId(),	tabletext));
			
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", subheader));
			 
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
			HeaderTable5.addCell(new Phrase("Total Bill", subheader));
			HeaderTable5.addCell(new Phrase(" : "+lstPojo.get(0).getTotalAmt(), tabletext));	
			
			HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable5.addCell(new Phrase("Advance Amount", subheader));
			HeaderTable5.addCell(new Phrase(" : "+lstPojo.get(0).getTotalDisc(), tabletext));
			
			HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable5.addCell(new Phrase("Refund Amount", subheader));
			HeaderTable5.addCell(new Phrase(" : "+total_paid, tabletext));	
			
			HeaderTable5.addCell(new Phrase("Refund Against Bill", subheader));
			HeaderTable5.addCell(new Phrase(" : "+lstPojo.get(0).getAgainstId(), tabletext));
			
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
			int[] headerwidth6 = { 20, 60, 30, 20, 20 };
			HeaderTable6.setWidths(headerwidth6);
			HeaderTable6.setWidthPercentage(95f);
			HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			
			
			
			HeaderTable6.addCell(new Phrase("Amount In Words:", subheader));
		    long finalam2 = (long) total_paid;
			df2.format(finalam2); 		
			
			/* HeaderTable6.addCell(new Phrase(""	+ (EnglishNumberToWords.convert(finalam)
							.toUpperCase()) + " Rs. ONLY", tabletext));  */
			HeaderTable6.addCell(new Phrase(""+currencyName+"."	+ (EnglishNumberToWords.convert(finalam2)
						.toUpperCase()) + "ONLY", tabletext)); 
			HeaderTable6.addCell(new Phrase("              Total", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.getDefaultCell().setBorder(Rectangle.BOX);
			HeaderTable6.addCell(new Phrase("       " + df2.format(total_paid), subheader));
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

			
			document.add(HeaderTable6);
			HeaderTable6.flushContent();
			
			PdfPTable HeaderTable8 = new PdfPTable(7);
			int[] headerwidth8 = { 15, 15, 15, 15, 15, 15, 10 };
			HeaderTable8.setWidths(headerwidth8);
			HeaderTable8.setWidthPercentage(95f);
			HeaderTable8.getDefaultCell().setBorder(Rectangle.TOP);
			
			
			
			HeaderTable8.addCell(new Phrase("Payment Mode", subheader));
			HeaderTable8.addCell(new Phrase("Bank Name", subheader));
			HeaderTable8.addCell(new Phrase("", subheader));
			HeaderTable8.addCell(new Phrase("Chq/ECS/CardNo", subheader));
			HeaderTable8.addCell(new Phrase("Date/Time", subheader));
			HeaderTable8.addCell(new Phrase("Amount", subheader));
			HeaderTable8.addCell(new Phrase("Batch NO", subheader));

		
			if(pMode == -1){
				for(int i = 0; i < listMultiPay.size(); i++){
					HeaderTable8.addCell(new Phrase(""+listMultiPay.get(i).getPayName(), tabletext));
					HeaderTable8.addCell(new Phrase(""+listMultiPay.get(i).getbName(), tabletext));
					HeaderTable8.addCell(new Phrase("", tabletext));
					HeaderTable8.addCell(new Phrase(""+listMultiPay.get(i).getbNumber(), tabletext));
					HeaderTable8.addCell(new Phrase("", tabletext));
					HeaderTable8.addCell(new Phrase(""+listMultiPay.get(i).getTotalPaid(), tabletext));
					HeaderTable8.addCell(new Phrase("", tabletext));
					
				}
				
			}else{
				HeaderTable8.addCell(new Phrase(""+payMode, tabletext));
				HeaderTable8.addCell(new Phrase(""+bankName, tabletext));
				HeaderTable8.addCell(new Phrase("", tabletext));
				HeaderTable8.addCell(new Phrase(""+cardcheqNo, tabletext));
				HeaderTable8.addCell(new Phrase(""+createdDate, tabletext));
				HeaderTable8.addCell(new Phrase(""+total_paid, tabletext));
				HeaderTable8.addCell(new Phrase("", tabletext));
				
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

			HeaderTable4.setSpacingBefore(50f);
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			
			String remark="";
			if(lstPojo.get(0).getRefRemark()!=null){
				
				remark=lstPojo.get(0).getRefRemark();
			}
			
			HeaderTable4.addCell(new Phrase(" Remark :",subheader));
			HeaderTable4.addCell(new Phrase(""+remark, tabletext));
			HeaderTable4.addCell(new Phrase("", subheader));
			
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			
			HeaderTable4.addCell(new Phrase(" Refund Receiver",tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));
			//HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			/* 	HeaderTable4.addCell(new Phrase(
							"                       Payee Signature", tabletext)); */
			HeaderTable4.addCell(new Phrase("Authorized Signatory",tabletext));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase(""+ createdUserName, subheader));
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