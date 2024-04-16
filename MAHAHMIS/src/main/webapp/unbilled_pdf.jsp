<%@page import="com.hms.ipdbill.dto.MultiBillReceiptMasterDTO"%>
<%@page import="com.hms.ehat.dto.MultipleSponsorDto"%>
<%@page import="com.hms.ehat.dto.PharmacyDetailsOnBillingPrintDto"%>
<%@page import="com.hms.ehat.dto.BillMasterAllTreat"%>
<%@page import="com.hms.ehat.dto.TreatmentServiceDetails"%>
<%@page import="com.hms.ehat.dto.TreatmentDto"%>
<%@page import="com.hms.dto.Treatment"%>
<%@page import="com.hms.ipdbill.controller.BillController"%>
<%@page import="com.hms.ehat.service.FinanceService"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.dto.Chanelling_doctor"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.ipdbill.dto.IpdBillDiscount"%>
<%@page import="com.hms.ipdbill.dto.IpdBillReceiptMasterDTO"%>
<%@page import="com.hms.ehat.service.CommonadvService"%>
<%@page import="com.hms.ehat.dto.CommonadvDto"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientSubServiceDetailsIpdDto"%>
<%@page import="com.hms.ehat.dto.BillNobleServiceDto"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientServiceDetailIpdDto"%>
<%@page import="com.hms.ipdbill.service.IpdBillService"%>
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
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.hisab.model.HisabModel"%>
<%@page import="com.hms.ipdbill.dto.BillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.serviceImpl.BillServiceImpl"%>
<%@page import="com.hms.ipdbill.service.BillService"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.dto.RadiationMaster"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@ page import="com.hms.ehat.dto.CurrencyTypeDto"%>
<%@page import="com.hms.model.PatientModel"%>
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
<title>UnBilled Bill PDf</title>
</head>
<body>
	<%
		try {

		response.setContentType("application/pdf");
		CurrencyTypeService fetchOneCurrency=(ApplicationContextUtils.getApplicationContext()).getBean(CurrencyTypeService.class);
		List<CurrencyTypeDto> listServiceCurrencyDto=fetchOneCurrency.getOneCurrencyList();
		String currencyCode=listServiceCurrencyDto.get(0).getCurrencyCode();
		String currencyName=listServiceCurrencyDto.get(0).getCurrencyName();
		int userId= (Integer)session.getAttribute("userId1");
		
		HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext())
				.getBean(HospitalDetailAdminService.class);
				List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
				HospitalDetails hospObj = arrHospitalDetails.get(0);

		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		
		Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
		document.setMargins(20, 20, 20, 10);

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
			cellNabh.addElement(new Chunk(imgNabh, 5, -40));
			cellNabh.setBorder(Rectangle.NO_BORDER);
		} catch (Exception e) {
			e.printStackTrace();
		}   
		
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
		String pharmacy_Invoice = (String)resourceBundleEhat.getString("pharmacyInvoice");   
		String pharmacy_Serve_Id = (String)resourceBundleEhat.getString("pharmacy");    
		int pharmacyInvoiceId = Integer.parseInt(pharmacy_Invoice);
		int pharmacyServId = Integer.parseInt(pharmacy_Serve_Id);
					
		//int billId=0;
		int patId=Integer.parseInt(request.getParameter("patId"));
		String treatIds=request.getParameter("treatIds");
		int sponsorId=Integer.parseInt(request.getParameter("sponsorId"));
		int treatmentId=0;//Integer.parseInt(request.getParameter("treatId"));
		/* int billTypeId=Integer.parseInt(request.getParameter("billTypeId"));
		String receiptOf=request.getParameter("receiptOf");
		String sponId=request.getParameter("chargesSlaveId"); */
		String finalbillIs="finalBill";//request.getParameter("finalbillIs");		
		int recId=0;
		Double finalRefundable=0.0;//Double.parseDouble(request.getParameter("finalRefundable"));
		
		// Get all treatments of patient
		FinanceService fs=(ApplicationContextUtils.getApplicationContext()).getBean(FinanceService.class);
		List<TreatmentDto> ltTreats = new ArrayList<TreatmentDto>();
		List<TreatmentDto> ltTreatsAll = new ArrayList<TreatmentDto>();
		int unitId=1;
		int cashPaidSpId=0;
		ltTreatsAll = fs.getAllTreatments(unitId, userId, patId, sponsorId);
		
		if(ltTreatsAll.size() > 0){
			
			List<String> mstIds = new ArrayList<String>();
			
			if(treatIds.contains(",")){
				
				String ar[] = treatIds.split(",");
				for(String ss : ar){
					
					mstIds.add(ss);
				}
				
			}else{
				
				mstIds.add(treatIds);			
			}	
			
			if(mstIds.size() > 0){
				
				for(String s:mstIds){
					
					String[] sptreatId=new String[2];	
					sptreatId=s.split("_");
					int treatId = Integer.parseInt(sptreatId[0]);
					int spsrId = Integer.parseInt(sptreatId[1]);
					
					for(TreatmentDto pojo:ltTreatsAll){
						
						if(pojo.getTreatmentId() == treatId && pojo.getCount() == spsrId){
							
							TreatmentDto objTreat=new TreatmentDto();
							objTreat.setDepartmentId(pojo.getDepartmentId());
							objTreat.setTreatmentId(treatId);
							objTreat.setCount(spsrId);
							ltTreats.add(objTreat);
						}
					}						
				}
			}		
					
			if(ltTreats.size()>0){
				
				treatmentId = ltTreats.get(0).getTreatmentId();
				cashPaidSpId = ltTreats.get(0).getCount();
			}		
			
			// ----------------------------------------
	        IpdBillService fetchServlist=(ApplicationContextUtils.getApplicationContext()).getBean(IpdBillService.class);		
	        // ----------------------------------------
					
			//calling service leyer method to get patient records
			RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
			List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
			ltRegMasterDto = us.fetchPatientsRecordByTreatmentId(treatmentId);
			
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
			String weight  	=ltRegMasterDto.get(0).getWeight();
			String height  	=ltRegMasterDto.get(0).getHeight();
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
			 int perstateId = ltRegMasterDto.get(0).getPerstateId();
			 int pertownId   =ltRegMasterDto.get(0).getPertownId();
			 int perdistrictId =ltRegMasterDto.get(0).getPerdistrictId();
			 int pertalukaId   =ltRegMasterDto.get(0).getPertalukaId();
			 
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
			 
			LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
			AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
			List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
			
			String spLeafName="";
			String refDocName  ="";
	
			if(sponsorSlave > 0){
				
				fetchsposor   = obj.fetchSuperCatofchargesSlave(sponsorSlave);
				if(fetchsposor.size() > 0 ){
					
					BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
				}else{
					
					BillCategoryName = " Sponsor";
				}
				spLeafName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",cashPaidSpId,"id");
				//BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id"); 
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
			
			if(refDocId > 0 ){
				refDocName   = fetchlist.getStringValOfObject("doctor","doc_name",refDocId,"Doctor_ID");
			}else{
				refDocName   = "";
			}
			
			List<BillReceiptMasterDTO> lstPojo = new ArrayList<BillReceiptMasterDTO>();
			String callFrom="ipdSummary";
			NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");
			
			DecimalFormat df2 = new DecimalFormat("0.00");
			
			// patient address
			String addressPatient = "";
			String per_patient_address = "";
			
			if(!cityObj.equals("0") && !cityObj.equals("undefined") && !cityObj.equals("")){
				addressPatient += cityObj;
			}
			
			if (!taluka.equals("0") && !taluka.equals("undefined") && !taluka.equals("")) 
			{
				addressPatient +=  (taluka + ",");
			}						
			if (!district.equals("0") && !district.equals("undefined") && !district.equals("")) 
			{
				addressPatient += (district + ",");
			}
			if (!state.equals("0") && !state.equals("undefined") && !state.equals("")) 
			{
				addressPatient += (state + ",");
			}
			// end : patient address
			
			// Strat : permanant patient address
			if(percityObj != "0" && !percityObj.equals("undefined") && !percityObj.equals("")){
				per_patient_address += percityObj;
			}
			
			if (pertaluka != "0" && !pertaluka.equals("undefined") && !pertaluka.equals("")) 
			{
				per_patient_address +=  (" "+pertaluka);
			}						
			if (perdistrict != "0" && !perdistrict.equals("undefined") && !perdistrict.equals("")) 
			{
				per_patient_address += (" " + perdistrict);
			}
			if (perstate != "0" && !perstate.equals("undefined") && !perstate.equals("")) 
			{
				per_patient_address += ("," + perstate);
			}
			// end : permanant patient address
				
			//document.newPage();			
	
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
	
			
			HeaderTable1.addCell(new Phrase("", header));
			
			Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
			Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD);
			Phrase p = new Phrase();
			p.add(new Chunk(" "+hospitalName, bold));			
			p.add(new Chunk(" \n\n"+address, tabletext));			
			p.add(new Chunk(" "+city+" Pin- "+hospitalZip, tabletext));
			p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
			p.add(new Chunk(" \n "+webste+" email: "+email, tabletext));
			
			PdfPCell hospitalNameCell = new PdfPCell(p);				
			hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
			HeaderTable1.addCell(hospitalNameCell);
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String billPrint = (String) resourceBundle.getObject("billPrint").toString();
			
			if(billPrint.contains("on")){
				
				/* if (img == null) {
					
					HeaderTable1.addCell(new Phrase("", header));
				} else {
					
					HeaderTable1.addCell(cellNabh);
				} */
				HeaderTable1.addCell(new Phrase("", header));
				
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
						
			String drIds=ltRegMasterDto.get(0).getDoctorId();
			String drId="";
			String docNames="";
			
			if(!drIds.equals("") && drIds!=null){
				
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
				
			}
			
			// For consulting doctors end
			
			// For ref doc start
				
			List<Chanelling_doctor> arrChanelling_doctor = new ArrayList<Chanelling_doctor>();
			String refDrName="";
			int refDrId=ltRegMasterDto.get(0).getRefDocId();
			for(Chanelling_doctor objRef : arrChanelling_doctor){
				
				if(refDrId==objRef.getChannDocId()){
					
					refDrName=objRef.getDocName();
				}
			}	
			// For ref doc end
			
			
			// Table 2 : For receipt head start
			
			PdfPTable HeaderTable2 = new PdfPTable(5);
			int[] headerwidth2 = { 15, 24, 50, 9, 20 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(new Phrase("", subheader));
			PdfPCell subcell = new PdfPCell(new Phrase("",subheader));
			subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
			subcell.setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(subcell);
			if(finalbillIs.equals("finalBill")){
				
				HeaderTable2.addCell(new Phrase("                 FINAL BILL ", header));
				
			}else{
				
				HeaderTable2.addCell(new Phrase("       GENERAL DETAILED INVOICE ", header));
			}
			
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			document.add(HeaderTable2);
			HeaderTable2.flushContent();
			
			// Table 2 : For receipt head end
			
			RegistrationController regCon=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
	        RegTreBillDto rtd = new RegTreBillDto();            
	        List<RegTreBillDto> ltPatientRecord = null;
	        String PType = "";
	        Date admDateTime=new Date();
	        if(regCon != null){
	           
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
	        }
	                
	        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	        SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm a");
	        SimpleDateFormat sdf3 = new SimpleDateFormat("yyyy-MM-dd");
	       	Date now = new Date(new java.util.Date().getTime());
	       	String strDate = sdf.format(now);
			String rtime   = sdf2.format(now);
			
			Date adm = new Date(rtd.getCreatedDateTime().getTime());
	       	String admDate = sdf.format(adm);
			String admTime   = sdf2.format(adm);
				
			/* if(rtd.getDischargeDate().equals("-")){
				
				disDate="-";
				disTime="-";
			}else *//* {
				
			 	DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");   
	        	Date date1 = dateFormat.parse(rtd.getDischargeDate());        	
	        	Date dsDate = new Date(date1.getTime());
	        	disDate=sdf.format(dsDate);
	        	
	        	DateFormat timeFormat = new SimpleDateFormat("HH:MM:SS");   
	        	Date time1 = timeFormat.parse(rtd.getDischargeTime()); 
	        	disTime=sdf2.format(time1);   		
			} */
			
	        // Table3 : For patient header info start
	       
	        PdfPTable HeaderTable3 = new PdfPTable(4);
			int[] headerwidth3 = { 30, 50, 30, 50 };
			HeaderTable3.setWidths(headerwidth3);
			HeaderTable3.setWidthPercentage(95f);
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			if(finalbillIs.equals("finalBill")){
				/* HeaderTable3.addCell(new Phrase("Bill No. ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+billId,tabletext)); */ 
			//	HeaderTable3.addCell(new Phrase("Patient Id",subheader));
				HeaderTable3.addCell(new Phrase("UHID",subheader));
				HeaderTable3.addCell(new Phrase(" : "+PatientID,tabletext)); 
				
				/* HeaderTable3.addCell(new Phrase("Bill Date ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+strDate,tabletext)); */
				
				HeaderTable3.addCell(new Phrase("Patient Name ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+pname,	tabletext));
					            
				/* HeaderTable3.addCell(new Phrase("Bill Time ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+rtime,tabletext)); */
				
				HeaderTable3.addCell(new Phrase("Bill No",subheader));
				HeaderTable3.addCell(new Phrase(" : 0",tabletext));
				
				HeaderTable3.addCell(new Phrase("Contact No",subheader));
				HeaderTable3.addCell(new Phrase(" : "+contactNo,tabletext));
				
				HeaderTable3.addCell(new Phrase("Res. Address ",	subheader));		
				HeaderTable3.addCell(new Phrase(" : "+patientAdd+" "+ addressPatient, tabletext));
				
				if(per_patient_address != null && perPatientAdd !=null && !perPatientAdd.equalsIgnoreCase("") || !per_patient_address.equalsIgnoreCase("") && !per_patient_address.equalsIgnoreCase(null) && !per_patient_address.equals("undefined"))
				{
					HeaderTable3.addCell(new Phrase("Per. Address ",	subheader));		
					HeaderTable3.addCell(new Phrase(" : "+perPatientAdd+" "+ per_patient_address, tabletext));
				}else{
					HeaderTable3.addCell(new Phrase("Per. Address ",	subheader));		
					HeaderTable3.addCell(new Phrase(" : ", tabletext));
				}
			
				HeaderTable3.addCell(new Phrase("Age/Gender/Wt ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+allInfo,tabletext));
				
				if(relativeName != null && relativeName !="" && relativeName!="undefined")
				{
					HeaderTable3.addCell(new Phrase("Relative Name ", subheader));
					HeaderTable3.addCell(new Phrase(" : "+relation+"-"+relativeName, tabletext));
				} else{
					HeaderTable3.addCell(new Phrase("Relative Name ", subheader));
					HeaderTable3.addCell(new Phrase(" : ", tabletext));
				}
				 
				/* HeaderTable3.addCell(new Phrase("Consultant ",	subheader));		
				HeaderTable3.addCell(new Phrase(" : "+docNames, tabletext)); */
				
				/* HeaderTable3.addCell(new Phrase("Ref. Doctor ",	subheader));		
				HeaderTable3.addCell(new Phrase(" : "+rtd.getDocName(), tabletext)); */
	
				/* HeaderTable3.addCell(new Phrase("Admission Date & Time ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+admDate+" "+admTime, tabletext));
				
				HeaderTable3.addCell(new Phrase("OPD/IPD No ",subheader));
				HeaderTable3.addCell(new Phrase(" : " +opdipdno , tabletext)); */	
							
		        /* if(departmentId==2){
		        	
		        	List<EhatViewPatientBedDetailsIpdDto> listBedIpdDto2=fetchServlist.getPatientBedBill(treatmentId,3);				
					HeaderTable3.addCell(new Phrase("Ward ",subheader));
					HeaderTable3.addCell(new Phrase(" : "+listBedIpdDto2.get(0).gethName(),tabletext));	        	
		        } */			
				
				/* HeaderTable3.addCell(new Phrase("Age/Gender/Wt ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+allInfo,tabletext)); */
				
				if(spLeafName==null || spLeafName=="" || spLeafName.equalsIgnoreCase("")){
				}else{
					HeaderTable3.addCell(new Phrase("Sponsor",	subheader));		
					HeaderTable3.addCell(new Phrase(" : "+spLeafName, tabletext));
				}
				
				/* HeaderTable3.addCell(new Phrase("Mr No",subheader));
				HeaderTable3.addCell(new Phrase(" : "+MrNo,tabletext)); */
				
				/* if(spLeafName==null || spLeafName=="" || spLeafName.equalsIgnoreCase("")){
				}else{
					HeaderTable3.addCell(new Phrase("Sponsor",	subheader));		
					HeaderTable3.addCell(new Phrase(" : "+spLeafName, tabletext));
				} */
				
				/* HeaderTable3.addCell(new Phrase("Insurance Comapny ",subheader));
				HeaderTable3.addCell(new Phrase(" : "+BillCategoryName,tabletext)); */
				HeaderTable3.addCell(new Phrase(" ",subheader));
				HeaderTable3.addCell(new Phrase(" ",tabletext));
				
				
				/* if(disDate== null || disDate==""|| disDate=="-"){
				
					HeaderTable3.addCell(new Phrase("Discharge Date & Time ",subheader));
					HeaderTable3.addCell(new Phrase(" : -",tabletext));
				}else{
					HeaderTable3.addCell(new Phrase("Discharge Date & Time ",subheader));
					HeaderTable3.addCell(new Phrase(" : "+disDate+" "+disTime,tabletext));
				} */
				
				
				
				/* HeaderTable3.addCell(new Phrase("",subheader));
				HeaderTable3.addCell(new Phrase("" ,tabletext)); */
				
				/* HeaderTable3.addCell(new Phrase("TPA Name",subheader));
				HeaderTable3.addCell(new Phrase(" : "+spLeafName,tabletext)); */
	
				/* HeaderTable3.addCell(new Phrase(" ",subheader));
				HeaderTable3.addCell(new Phrase(" ", tabletext)); */
				
				/* HeaderTable3.addCell(new Phrase("Bed No",subheader));
				HeaderTable3.addCell(new Phrase(" : "+listBedIpdDto2.get(0).getBedId(), tabletext)); */
				//HeaderTable3.addCell(new Phrase("",subheader));
				//HeaderTable3.addCell(new Phrase("", tabletext));
				  //Start Dept
		       
				Doctor doc2 = new Doctor();
				List<Doctor> listDoc2 = null;
	
				if(rtd.getDoctorId().contains(",")){
					String[] doctors = rtd.getDoctorId().split(",") ;
					String Doc_Nme = "";
					String Depart = "";
					for(String str :doctors )
					{
						String DocID = str;
						int docId1 =  Integer.parseInt(str);
					
						 //Doc_Nme = Doc_Nme + listDoc2.get(0).getDoc_name()+",";
						// Depart = Depart + listDoc2.get(0).getDepartmentName()+",";
						// Depart = Depart.replace("$,","");
					}
					HeaderTable3.addCell(new Phrase("", subheader));
					HeaderTable3.addCell(new Phrase("", tabletext));
			/* 		HeaderTable3.addCell(new Phrase("Department", subheader));
					HeaderTable3.addCell(new Phrase(" : "+Depart, tabletext)); */
				}
				else{
					if(!rtd.getDoctorId().equalsIgnoreCase("")){
				int docId1 =  Integer.parseInt(rtd.getDoctorId());
				HeaderTable3.addCell(new Phrase("", subheader));
				HeaderTable3.addCell(new Phrase(" ", tabletext));
				/* HeaderTable3.addCell(new Phrase("Department", subheader));
				HeaderTable3.addCell(new Phrase(" : "+listDoc2.get(0).getDepartmentName(), tabletext)); */
				}
				}
		        //End Dept
		        
			}
			
			HeaderTable3.addCell(new Phrase(" ", subheader));
			HeaderTable3.addCell(new Phrase(" ", subheader)); 
			
			document.add(HeaderTable3);
			HeaderTable3.flushContent();
			
			// Table3 : For patient header info end
			 		
			if(ltTreats.size()>0){
				
				/* for(int m=0;m<1;m++){ */
							
					int depId = ltTreats.get(0).getDepartmentId();	
					FinanceService financeService = (ApplicationContextUtils.getApplicationContext()).getBean(FinanceService.class);
																				
					treatmentId = ltTreats.get(0).getTreatmentId();
					int spId = ltTreats.get(0).getCount(); // For sponsor Id
					
					if(spId>0){
			            PType="Sponsor";
		            }else{
		                PType="Self";                 
		            } 
					
					BillReceiptMasterDTO objBill = new BillReceiptMasterDTO();
					objBill.setPatientId(patId);
					objBill.setTreatmentId(treatmentId);
					objBill.setSponsorCatId(spId);
					objBill.setBillSettledFlag("openTreatment");
					objBill.setCreatedBy(userId);
					objBill.setListTreatDto(ltTreats);
								
					/* RegService rs = (ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);						
					MultipleSponsorDto mulObj = rs.getMultilpleSponsorList(treatmentId, request);
					List<MultipleSponsorDto> lstSponsors = mulObj.getListMultipleSponsor(); */
					
					/* if(lstSponsors.size() > 0){ */
												
						// Table5 : For service details head start															
						PdfPTable HeaderTable29 = new PdfPTable(6);
						int[] headerwidth29 = { 50,10, 7, 13, 13, 12 };
						HeaderTable29.setWidths(headerwidth29);
						HeaderTable29.setWidthPercentage(95f);
											
						PdfPTable HeaderTable5 = new PdfPTable(3);
						int[] headerwidth5 = { 60, 50, 20 };
						HeaderTable5.setWidths(headerwidth5);
						HeaderTable5.setWidthPercentage(95f);	
						
						PdfPTable HeaderTable299 = new PdfPTable(6);
						int[] headerwidth299 = { 50,8,8, 8, 13, 12 };
						HeaderTable299.setWidths(headerwidth299);
						HeaderTable299.setWidthPercentage(95f);
						
						/* for(MultipleSponsorDto mulSpObj: lstSponsors){
								
							if(spId == mulSpObj.getChargesSlaveId()){ */
									
									double totalPharmaAmount=0.0f;									
									//int sponsorBillNo = mulSpObj.getMulSponsorId(); 
									//int chargesSlaveId=mulSpObj.getChargesSlaveId();
									SimpleDateFormat sdf11 = new SimpleDateFormat("yyyy-MM-dd"); 
									double pharmaFinalAmt=0,pharmaDisc=0,pharmaDiscAmt=0,pharmaTotalAmt=0;
									double totalpharmaInvoiceAmount=0.0f;										
																
									//===================== Services List ======================//
									List<EhatViewPatientServiceDetailIpdDto> listService = financeService.getIpdPatientServiceListFromView(objBill);
									
									
									// =================== Pharmacy List ======================//
									List<PharmacyDetailsOnBillingPrintDto> listPharmacyDetailsOnBillingPrint = financeService.getPharmacyDetailsONBillingPrint(objBill);									
									objBill.setAgainstId(pharmacyInvoiceId);
									List<EhatViewPatientSubServiceDetailsIpdDto> lstNarcotics = financeService.getPatientServiceBillPharmacyInvoice(objBill);
									
									if(listPharmacyDetailsOnBillingPrint.size() > 0 || lstNarcotics.size() > 0){
										
										PdfPTable HeaderTable51 = new PdfPTable(3);
										int[] headerwidth51 = { 60, 30, 20 };
										HeaderTable51.setWidths(headerwidth51);
										HeaderTable51.setWidthPercentage(95f);
										
										HeaderTable51.getDefaultCell().setBorder(Rectangle.BOTTOM);	
										HeaderTable51.addCell(new Phrase("", tabletext));
										HeaderTable51.addCell(new Phrase("", tabletext));
										HeaderTable51.addCell(new Phrase("", tabletext));
										
										HeaderTable51.addCell(new Phrase("Pharmacy Details    ", subheader));
										HeaderTable51.addCell(new Phrase("", tabletext));
										HeaderTable51.addCell(new Phrase("", tabletext));										
										
										document.add(HeaderTable51);
										HeaderTable51.flushContent();						
																				
										PdfPTable HeaderTable511 = new PdfPTable(3);
										int[] headerwidth511 = { 55, 35, 20 };
										HeaderTable511.setWidths(headerwidth511);
										HeaderTable511.setWidthPercentage(95f);
										
										HeaderTable511.getDefaultCell().setBorder(Rectangle.NO_BORDER);	
										HeaderTable511.addCell(new Phrase("", tabletext));
										HeaderTable511.addCell(new Phrase("", tabletext));
										HeaderTable511.addCell(new Phrase("", tabletext));
										
										HeaderTable511.addCell(new Phrase("Invoice No ", subheader));
										HeaderTable511.addCell(new Phrase("Date", subheader));
										HeaderTable511.addCell(new Phrase("Amount", subheader));
										HeaderTable511.getDefaultCell().setBorder(Rectangle.NO_BORDER);
																
										for (int i = 0; i < listPharmacyDetailsOnBillingPrint.size(); i++) {			
											
											totalPharmaAmount = totalPharmaAmount +	listPharmacyDetailsOnBillingPrint.get(i).getAmount();		
											HeaderTable511.addCell(new Phrase(""+listPharmacyDetailsOnBillingPrint.get(i).getSaleName()+""+listPharmacyDetailsOnBillingPrint.get(i).getInvoiceNo(), tabletext));
											HeaderTable511.addCell(new Phrase(""+listPharmacyDetailsOnBillingPrint.get(i).getDate(), tabletext));
											HeaderTable511.addCell(new Phrase(""+listPharmacyDetailsOnBillingPrint.get(i).getAmount(), tabletext));
													
										}															
																
										objBill.setAgainstId(pharmacyInvoiceId);
										List<EhatViewPatientSubServiceDetailsIpdDto> listBillDetailPharmaInvoice = financeService.getPatientServiceBillPharmacyInvoice(objBill);
										
										for (int k = 0; k < listBillDetailPharmaInvoice.size(); k++) {
																										
											if(listBillDetailPharmaInvoice.get(k).getCancle().equals("N")){						
												String subServName="";
												double rate = 0;
												double qty  = 0;
												double amt  = 0;
												
												String cghsId = "("+listBillDetailPharmaInvoice.get(k).getCghsCode()+")";
												if(cghsId.equalsIgnoreCase("") || cghsId.equalsIgnoreCase("-") || cghsId=="()" || cghsId.equalsIgnoreCase("(-)") || cghsId.equalsIgnoreCase("(null)")){
													cghsId="";
												}							
												
												if(PType.equals("Sponsor")){
													
													rate= listBillDetailPharmaInvoice.get(k).getOtherRate();
													qty= listBillDetailPharmaInvoice.get(k).getQuantity();
													amt= listBillDetailPharmaInvoice.get(k).getOtherAmount();
												}else{
													
													rate= listBillDetailPharmaInvoice.get(k).getRate();
													qty= listBillDetailPharmaInvoice.get(k).getQuantity();
													amt= listBillDetailPharmaInvoice.get(k).getAmount();
												}
												totalpharmaInvoiceAmount=totalpharmaInvoiceAmount +(qty*rate);
												totalPharmaAmount=totalPharmaAmount+(qty*rate);	
												subServName = listBillDetailPharmaInvoice.get(k).getCategoryName();								
												subServName = subServName + cghsId;	
																		
														
												HeaderTable511.addCell(new Phrase(""+subServName, tabletext));
												HeaderTable511.addCell(new Phrase(""+sdf11.format(listBillDetailPharmaInvoice.get(k).getCreatedDate()), tabletext));
												HeaderTable511.addCell(new Phrase(""+amt, tabletext));									
												
											}					
										}					
											
										objBill.setAgainstId(-5);
										List<EhatViewPatientSubServiceDetailsIpdDto> listBillDetail = financeService.getPatientServiceBill(objBill);
										
										for (int k = 0; k < listBillDetail.size(); k++) {
																			
											if(listBillDetail.get(k).getCancle().equals("N")){						
												
												double rate = 0;
												double qty  = 0;
												double amt  = 0;
												
												if(PType.equals("Sponsor")){
													
													rate= listBillDetail.get(k).getOtherRate();
													qty= listBillDetail.get(k).getQuantity();
													amt= listBillDetail.get(k).getOtherAmount();
												}else{
													
													rate= listBillDetail.get(k).getRate();
													qty= listBillDetail.get(k).getQuantity();
													amt= listBillDetail.get(k).getAmount();
												}					
												
												/* pharmaFinalAmt = pharmaFinalAmt + rate;
												pharmaDisc = listBillDetail.get(k).getConcessionPer();
												pharmaDiscAmt = pharmaDiscAmt + (rate * pharmaDisc)/100;
												pharmaTotalAmt = (pharmaFinalAmt - pharmaDiscAmt); */
												
												pharmaFinalAmt = (totalPharmaAmount);
												pharmaDisc = listBillDetail.get(k).getConcessionPer();
												pharmaDiscAmt = pharmaDiscAmt + (pharmaFinalAmt * pharmaDisc)/100;
												pharmaTotalAmt = (pharmaFinalAmt - pharmaDiscAmt);
																				
											}					
										}		
										
										if(pharmaDisc > 0){
											
											HeaderTable511.getDefaultCell().setBorder(Rectangle.TOP);	
											HeaderTable511.addCell(new Phrase("", tabletext));
											HeaderTable511.addCell(new Phrase("Total", subheader));
											HeaderTable511.addCell(new Phrase(""+df2.format(pharmaFinalAmt), subheader));
											
											HeaderTable511.addCell(new Phrase("", tabletext));
											HeaderTable511.addCell(new Phrase("Discount(%)", subheader));
											HeaderTable511.addCell(new Phrase(""+df2.format(pharmaDisc), subheader));
											
											HeaderTable511.addCell(new Phrase("", tabletext));
											HeaderTable511.addCell(new Phrase("Discount Amount", subheader));
											HeaderTable511.addCell(new Phrase(""+df2.format(pharmaDiscAmt), subheader));
											
											HeaderTable511.addCell(new Phrase("", tabletext));
											HeaderTable511.addCell(new Phrase("Final Pharmacy Payable", subheader));
											HeaderTable511.addCell(new Phrase(""+df2.format(pharmaTotalAmt), subheader)); 
										
											totalPharmaAmount = pharmaTotalAmt;
										}else{								
											
											HeaderTable511.getDefaultCell().setBorder(Rectangle.TOP);	
											HeaderTable511.addCell(new Phrase("", tabletext));
											HeaderTable511.addCell(new Phrase("Final Pharmacy Payable", subheader));
											HeaderTable511.addCell(new Phrase(""+df2.format(totalPharmaAmount), subheader)); 
										}						
																	
										HeaderTable511.setSpacingAfter(20f);							
										
										document.add(HeaderTable511);
										HeaderTable511.flushContent();
										
									}	
									
									
									/* HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);	
									HeaderTable5.addCell(new Phrase("", tabletext));
									HeaderTable5.addCell(new Phrase("", tabletext));
									HeaderTable5.addCell(new Phrase("", tabletext));
									
									HeaderTable5.addCell(new Phrase("Group/Service     ", subheader));								
									HeaderTable5.addCell(new Phrase("Quantity    Rate                 Amount", subheader)) ;								
									HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
									HeaderTable5.addCell(new Phrase("Amount ("+currencyCode+")",subheader));
							
									HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);	
									
									document.add(HeaderTable5);
									HeaderTable5.flushContent(); */
									
									HeaderTable299.getDefaultCell().setBorder(Rectangle.BOTTOM);	
									HeaderTable299.addCell(new Phrase("", tabletext));
									HeaderTable299.addCell(new Phrase("", tabletext));
									HeaderTable299.addCell(new Phrase("", tabletext));
									HeaderTable299.addCell(new Phrase("", tabletext));
									HeaderTable299.addCell(new Phrase("", tabletext));					
									HeaderTable299.addCell(new Phrase("", tabletext));
									
									
									HeaderTable299.getDefaultCell().setBorder(Rectangle.NO_BORDER);	
									HeaderTable299.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
									HeaderTable299.addCell(new Phrase("       Group/Service", subheader));
									HeaderTable299.addCell(new Phrase("Date", subheader));
									HeaderTable299.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
									HeaderTable299.addCell(new Phrase(" Quantity", subheader));
									HeaderTable299.addCell(new Phrase(" Rate", subheader));
									HeaderTable299.addCell(new Phrase(" Amount", subheader));					
									HeaderTable299.addCell(new Phrase("Amount ("+currencyCode+")",subheader));
									
									HeaderTable299.getDefaultCell().setBorder(Rectangle.NO_BORDER);		
									
									document.add(HeaderTable299);
									HeaderTable299.flushContent();
									
									double adminAmt=0;								
																
																	
									for (int i = 0; i < listService.size(); i++) {
										
										double totAmt=0;
										int serId=listService.get(i).getServiceId();
										String sevName=listService.get(i).getServiceName();
										
											if(PType.equals("Sponsor")){
												
												totAmt=listService.get(i).getOtherAmount();
											}else{
												
												totAmt=listService.get(i).getAmount();
											}
											
											if(totAmt != 0 ){
												HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);	
												HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
												HeaderTable5.addCell(new Phrase(" "+sevName.toUpperCase(),subheader));
												HeaderTable5.addCell(new Phrase(" ",tabletext));
												HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
												HeaderTable5.addCell(new Phrase(" ",subheader));
												
												document.add(HeaderTable5);
												HeaderTable5.flushContent();
											}	
											
											//============================= For Subservice start ======================//
											objBill.setAgainstId(serId);
											
											if(serId == 3){
												
												List<EhatViewPatientBedDetailsIpdDto> listBedIpdDto=financeService.getPatientBedBill(objBill);
												ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");									 	
											 	String shraddha = resourceBundleEha.getObject("shraddha").toString();	
											 	
												for (int k = 0; k < listBedIpdDto.size(); k++) {
																										
													if(listBedIpdDto.get(k).getCancle().equals("N") && listBedIpdDto.get(k).getPaidByCashFlag().equals("N")){
													
														if(listBedIpdDto.get(k).getSubServiceId()!=0){
																
															String subServName = listBedIpdDto.get(k).gethName();
															String nurse="";
															if((k%2)!=0){
																if(shraddha.equalsIgnoreCase("on")){
																	
																	subServName="Medication Charges : "+listBedIpdDto.get(k-1).gethName();
																}else{
																	
																	subServName="Nursing : "+listBedIpdDto.get(k-1).gethName();
																}														
															}
															double rate = 0;
															double qty  = 0;
															double amt  = 0;
															
															if(PType.equals("Sponsor")){
																
																rate= listBedIpdDto.get(k).getOtherRate();
																qty= listBedIpdDto.get(k).getQuantity();
																amt= listBedIpdDto.get(k).getOtherAmount();
															}else{
																
																rate= listBedIpdDto.get(k).getRate();
																qty= listBedIpdDto.get(k).getQuantity();
																amt= listBedIpdDto.get(k).getAmount();
															}
															
															if(amt != 0){
																
																HeaderTable29.getDefaultCell().setBorder(Rectangle.NO_BORDER);	
																HeaderTable29.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
																HeaderTable29.addCell(new Phrase("       "+subServName, tabletext));
																HeaderTable29.addCell(new Phrase(""+sdf3.format(listBedIpdDto.get(k).getCreatedDate()), tabletext));
																HeaderTable29.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
																HeaderTable29.addCell(new Phrase(" "+ Math.round(qty) +" x ", tabletext));
																HeaderTable29.addCell(new Phrase(" "+ df2.format(rate) +" = ", tabletext));
																HeaderTable29.addCell(new Phrase(" "+ df2.format((qty*rate)), tabletext));					
																HeaderTable29.addCell(new Phrase("",tabletext));	
																
																document.add(HeaderTable29);
																HeaderTable29.flushContent();
															}
																					
														}else if(listBedIpdDto.get(k).getSubServiceId()==0){
															
															String subServName = listBedIpdDto.get(k).gethName() +"("+listBedIpdDto.get(k).getSponsorName()+")";
															String nurse="";
															if((k%2)!=0){
																if(shraddha.equalsIgnoreCase("on")){
																	
																	subServName="Medication Charges : "+listBedIpdDto.get(k-1).gethName();
																}else{
																	
																	subServName="Nursing : "+listBedIpdDto.get(k-1).gethName();
																}
																
															}
															double rate = 0;
															double qty  = 0;
															double amt  = 0;
															
															if(PType.equals("Sponsor")){
																
																rate= listBedIpdDto.get(k).getOtherRate();
																qty= listBedIpdDto.get(k).getQuantity();
																amt= listBedIpdDto.get(k).getOtherAmount();
															}else{
																
																rate= listBedIpdDto.get(k).getRate();
																qty= listBedIpdDto.get(k).getQuantity();
																amt= listBedIpdDto.get(k).getAmount();
															}
															
															if(amt != 0){
																HeaderTable29.getDefaultCell().setBorder(Rectangle.NO_BORDER);	
																HeaderTable29.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
																HeaderTable29.addCell(new Phrase("       "+subServName, tabletext));
																HeaderTable29.addCell(new Phrase(""+sdf3.format(listBedIpdDto.get(k).getCreatedDate()), tabletext));
																HeaderTable29.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
																HeaderTable29.addCell(new Phrase(" "+ Math.round(qty) +" x ", tabletext));
																HeaderTable29.addCell(new Phrase(" "+ df2.format(rate) +" = ", tabletext));
																HeaderTable29.addCell(new Phrase(" "+ df2.format((qty*rate)), tabletext));					
																HeaderTable29.addCell(new Phrase("",tabletext));	
																
																document.add(HeaderTable29);
																HeaderTable29.flushContent();
															}
															
														}					
														
													}				
												} 
												
											}else{
												
												List<EhatViewPatientSubServiceDetailsIpdDto> listBillDetail = financeService.getPatientServiceBill(objBill);													
												
												for (int k = 0; k < listBillDetail.size(); k++) {
													
													if(listBillDetail.get(k).getCancle().equals("N") && listBillDetail.get(k).getPaidByCashFlag().equals("N")){
													
														String subServName="";
														double rate = 0;
														double qty  = 0;
														double amt  = 0;
														
														String cghsId = "("+listBillDetail.get(k).getCghsCode()+")";
														if(cghsId.equalsIgnoreCase("") || cghsId.equalsIgnoreCase("-") || cghsId=="()" || cghsId.equalsIgnoreCase("(-)") || cghsId.equalsIgnoreCase("(null)")){
															cghsId="";
														}
														String Date = ""+sdf3.format(listBillDetail.get(k).getCreatedDate())+"";
														if(PType.equals("Sponsor")){
															
															rate= listBillDetail.get(k).getOtherRate();
															qty= listBillDetail.get(k).getQuantity();
															amt= listBillDetail.get(k).getOtherAmount();
														}else{
															
															rate= listBillDetail.get(k).getRate();
															qty= listBillDetail.get(k).getQuantity();
															amt= listBillDetail.get(k).getAmount();
														}													
														
														if(serId==2){
																							
															subServName="Consultation Charges  ("+listBillDetail.get(k).getDocName()+")";	
															subServName = subServName + cghsId;
															
														}if(serId==4){
															
															String docServName="";								
															if(listBillDetail.get(k).getDocId()!=null && listBillDetail.get(k).getDocId() >0){
																
																Integer docServId=listBillDetail.get(k).getDocId();													
																docServName = fetchlist.getStringValOfObject("doctor","doc_name",docServId,"Doctor_ID");									
															} 
															
															if(listBillDetail.get(k).getSubServiceId()==2302){
																
																subServName = listBillDetail.get(k).getOtProcedure();	
																subServName = subServName + cghsId;
																subServName=subServName +"      "+docServName;
																
															}else{
																
																subServName = listBillDetail.get(k).getCategoryName();
																subServName = subServName + cghsId;
																subServName=subServName +"      "+docServName;
															}				
															
														}if(serId==5){
															
															subServName= listBillDetail.get(k).getDocName();	
															subServName = subServName + cghsId;
														
														}else if (serId==14) {
															
															subServName = listBillDetail.get(k).getInventoryName();
															subServName = subServName + cghsId;
															
														}else if (serId==16) {			
									
															subServName = listBillDetail.get(k).getPharmaName();
															subServName = subServName + cghsId;								
															
														}else if (serId==15) {
															
															subServName = listBillDetail.get(k).getCategoryName();
															subServName = subServName + cghsId;
															adminAmt=adminAmt+(qty*rate);
														}
														else {
															
															String otProcedure="";	
															otProcedure = listBillDetail.get(k).getOtProcedure();
															subServName = listBillDetail.get(k).getCategoryName();								
															if(otProcedure!=null){
																subServName = subServName + cghsId +"("+otProcedure+")";			
															}else{
																subServName = subServName + cghsId;				
															}			
															
															String docServName="";
															
															if(listBillDetail.get(k).getDocId()!=null && listBillDetail.get(k).getDocId() >0){
																
																Integer docServId=listBillDetail.get(k).getDocId();													
																docServName = fetchlist.getStringValOfObject("doctor","doc_name",docServId,"Doctor_ID");									
															} 
															
															subServName = subServName + "        " +docServName;
														}				
														
														if(qty*rate != 0){
															HeaderTable29.getDefaultCell().setBorder(Rectangle.NO_BORDER);	
															HeaderTable29.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
															HeaderTable29.addCell(new Phrase("       "+subServName, tabletext));
															HeaderTable29.addCell(new Phrase(""+Date, tabletext));
															HeaderTable29.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
															HeaderTable29.addCell(new Phrase(" "+ Math.round(qty) +" x ", tabletext));
															HeaderTable29.addCell(new Phrase(" "+ df2.format(rate) +" = ", tabletext));
															HeaderTable29.addCell(new Phrase(" "+ df2.format((qty*rate)), tabletext));					
															HeaderTable29.addCell(new Phrase("",tabletext));
															
															document.add(HeaderTable29);
															HeaderTable29.flushContent();
														}						
														
													}					
												}
											}									
																						
											//============================= For Subservice end ======================//
											
											if(totAmt != 0 ){
												
												HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);	
												HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
												HeaderTable5.addCell(new Phrase(" ",subheader));
												HeaderTable5.addCell(new Phrase(" ",tabletext));
												HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
												HeaderTable5.addCell(new Phrase(" "+df2.format(totAmt),subheader));
											}										
									}										
									
									HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);	
									HeaderTable5.addCell(new Phrase(" ",subheader));
									HeaderTable5.addCell(new Phrase(" ",tabletext));
									HeaderTable5.addCell(new Phrase(" ",subheader));
									
									HeaderTable5.addCell(new Phrase(" ",subheader));
									HeaderTable5.addCell(new Phrase(" ",tabletext));
									HeaderTable5.addCell(new Phrase(" ",subheader));
									
									
									// For get totals 
									BillReceiptMasterDTO billObj=new BillReceiptMasterDTO();
									billObj.setUnitId(1);
									billObj.setCreatedBy(userId);
									billObj.setTreatmentId(treatmentId);
									billObj.setSponsorCatId(spId);		
									billObj.setPatientId(patId);
									billObj.setListTreatDto(ltTreats);
									BillReceiptMasterDTO resultObj=financeService.fetchAllReceiptTotals(billObj);
									
									double servFinalTot = resultObj.getActualAmt();									
									double finalTot = resultObj.getActualAmt() + totalPharmaAmount;
									double conTot= resultObj.getActualTotConcn();
									double totDisc= resultObj.getTotalDisc();
									double netAmt = finalTot - (totDisc + conTot);
									double totPaid = resultObj.getTotalPaid();
									double totRefund = resultObj.getRefundAmt();
									double setTotalSonsorAmt = resultObj.getTotalSonsorAmt();
											
									HeaderTable5.getDefaultCell().setBorder(Rectangle.BOX);		
									
									FinanceService finServ=(ApplicationContextUtils.getApplicationContext()).getBean(FinanceService.class);		
									Double pharmaReturn=finServ.getPharmaReturn(treatmentId);
									if(pharmaReturn == null){
										
										pharmaReturn=0.0;
									}
									
									
									if(pharmaReturn != 0){
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
										HeaderTable5.getDefaultCell().setColspan(1);
										HeaderTable5.addCell(new Phrase("Pharmacy Sale Return Amount(-)", subheader));
										HeaderTable5.addCell(new Phrase("", tabletext));
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
										HeaderTable5.addCell(new Phrase(""+df2.format(pharmaReturn), subheader));
									}
									
									if(finalTot != 0){
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
										HeaderTable5.addCell(new Phrase("Investigation Total Amount", subheader));
										HeaderTable5.addCell(new Phrase("", subheader));
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
										HeaderTable5.addCell(new Phrase(""+df2.format(servFinalTot), subheader));										
									}
										
									if(finalTot != 0){
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
										HeaderTable5.addCell(new Phrase("Total Investigation + Pharmacy Amount", subheader));
										HeaderTable5.addCell(new Phrase("", subheader));
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
										HeaderTable5.addCell(new Phrase(""+df2.format(finalTot), subheader));										
									}
									
									if(conTot != 0){
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
										HeaderTable5.addCell(new Phrase("Total Concession", subheader));
										HeaderTable5.addCell(new Phrase("", tabletext));
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
										HeaderTable5.addCell(new Phrase(""+df2.format(conTot), subheader));
									}
									
									if(totDisc != 0){
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
										HeaderTable5.addCell(new Phrase("Discount", subheader));
										HeaderTable5.addCell(new Phrase("", tabletext));
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
										HeaderTable5.addCell(new Phrase(""+df2.format(totDisc), subheader));
									}	
									
									if(netAmt != 0){
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
										HeaderTable5.addCell(new Phrase("Amount Payable", subheader));
										HeaderTable5.addCell(new Phrase("", tabletext));
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
										HeaderTable5.addCell(new Phrase(""+df2.format(netAmt), subheader));
									}
									
									List<CommonadvDto> lstCommonadv=financeService.getCommonadv(billObj);
									double cmAdvc=0;
									if(lstCommonadv != null && lstCommonadv.size()>0){
										
										cmAdvc = lstCommonadv.get(0).getRemaining_amnt();
									}else{
										
										cmAdvc=0;
									} 
									
									if(cmAdvc != 0){
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
										HeaderTable5.addCell(new Phrase("Common Advance", subheader));
										HeaderTable5.addCell(new Phrase("", tabletext));
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
										HeaderTable5.addCell(new Phrase(""+df2.format(cmAdvc), subheader));
									} 
										
									if(totPaid != 0){
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
										HeaderTable5.addCell(new Phrase("Amount Received", subheader));
										HeaderTable5.addCell(new Phrase("", tabletext));
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
										HeaderTable5.addCell(new Phrase(""+df2.format(totPaid), subheader));
									}
									
									if(setTotalSonsorAmt != 0){
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
										HeaderTable5.addCell(new Phrase("Paid By Sponsor", subheader));
										HeaderTable5.addCell(new Phrase("", tabletext));
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
										HeaderTable5.addCell(new Phrase(""+df2.format(setTotalSonsorAmt), subheader));
									}
									
									if(finalRefundable != 0){
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
										HeaderTable5.addCell(new Phrase("Refundable Amount", subheader));
										HeaderTable5.addCell(new Phrase("", tabletext));
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
										HeaderTable5.addCell(new Phrase(""+df2.format(finalRefundable), subheader));
									}
									
									if(totRefund != 0){
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
										HeaderTable5.addCell(new Phrase("Total Refund", subheader));
										HeaderTable5.addCell(new Phrase("", tabletext));
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
										HeaderTable5.addCell(new Phrase(""+df2.format(totRefund), subheader));
									}	
											
									double TotalPayable=netAmt-(totPaid+setTotalSonsorAmt);
									if(TotalPayable< 0){
										TotalPayable=0;
									}
									
									if(TotalPayable != 0){
										
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
										// HeaderTable5.addCell(new Phrase("Balance Amount  "+spLeafName, subheader));
										HeaderTable5.addCell(new Phrase("Balance Amount  ", subheader));
										HeaderTable5.addCell(new Phrase("", tabletext));
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
										HeaderTable5.addCell(new Phrase(""+df2.format(TotalPayable), subheader));
									} 
									
									
									long finalam = (long) TotalPayable;									
									String oustandingAmt="";
									
									if(TotalPayable > 0){
										
										oustandingAmt = EnglishNumberToWords.convert(finalam);
									}else{
										
										oustandingAmt = " Zero Only";
									}
									
									if(TotalPayable != 0){
										
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
										HeaderTable5.addCell(new Phrase("Balance Amount In Word    "+currencyName+"."+oustandingAmt, subheader));
										HeaderTable5.addCell(new Phrase("", tabletext));
										HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
										HeaderTable5.addCell(new Phrase("", subheader));
									}									
									
									HeaderTable5.setSpacingAfter(20f);
											
									document.add(HeaderTable5);
									HeaderTable5.flushContent();					
								
								/* }									
						
							} */		
					
					
							PdfPTable HeaderTable9 = new PdfPTable(8);
							int[] headerwidth9 = { 20,10,20,10,10,10,20,20};
							HeaderTable9.setWidths(headerwidth9);
							HeaderTable9.setWidthPercentage(95f);
							
							BillService objeOpd=(ApplicationContextUtils.getApplicationContext()).getBean(BillService.class);
							List<BillReceiptMasterDTO> listAllRecOpd = new ArrayList<BillReceiptMasterDTO>();						
							
							BillReceiptMasterDTO ipdObj1=new BillReceiptMasterDTO();
							ipdObj1.setBillId(billId);
							ipdObj1.setPatientId(patId);
							ipdObj1.setTreatmentId(treatmentId);
							ipdObj1.setSponsorCatId(spId);
							ipdObj1.setReceiptOf("all");
							ipdObj1.setCreatedBy(userId);
							ipdObj1.setListTreatDto(ltTreats);
							BillReceiptMasterDTO obj3=objeOpd.getBillReceiptDetails(ipdObj1,"console");
							double totPaid123=0.00;
							
							IpdBillService obje4=(ApplicationContextUtils.getApplicationContext()).getBean(IpdBillService.class);
							List<IpdBillReceiptMasterDTO> listAllRec = new ArrayList<IpdBillReceiptMasterDTO>();
													
							IpdBillReceiptMasterDTO ipdObj=new IpdBillReceiptMasterDTO();
							ipdObj.setBillId(billId);
							ipdObj.setPatientId(patId);
							ipdObj.setSponsorCatId(spId);
							ipdObj.setTreatmentId(treatmentId);
							ipdObj.setReceiptOf("all");
							ipdObj.setCreatedBy(userId);
							ipdObj.setListTreatDto(ltTreats);
							IpdBillReceiptMasterDTO objIpd=obje4.getBillReceiptDetailsIpd(ipdObj,"console");
							double totPaid1Ipd=0.00;
							
							if(obj3.getListBillReceiptMaster().size()>0 || objIpd.getListBillReceiptMaster().size()>0){
								
								HeaderTable9.getDefaultCell().setBorder(Rectangle.BOTTOM);
								HeaderTable9.addCell(new Phrase("Receipt Details", subheader));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", subheader));
								HeaderTable9.addCell(new Phrase("", subheader));
								
								HeaderTable9.getDefaultCell().setBorder(Rectangle.NO_BORDER);		
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", subheader));
								HeaderTable9.addCell(new Phrase("", subheader));
								
								HeaderTable9.addCell(new Phrase("Rec.No", subheader));
								HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
								HeaderTable9.addCell(new Phrase("Amount", subheader));
								HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
								HeaderTable9.addCell(new Phrase("Date", subheader));
								HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
								HeaderTable9.addCell(new Phrase("Cash Amt", subheader));
								HeaderTable9.addCell(new Phrase("Card.Amt", subheader));
								HeaderTable9.addCell(new Phrase("Chq.Amt", subheader));
								HeaderTable9.addCell(new Phrase("Common Adv", subheader));
								HeaderTable9.addCell(new Phrase("Batch No.", subheader));
								
								HeaderTable9.getDefaultCell().setBorder(Rectangle.NO_BORDER);		
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", subheader));		
								HeaderTable9.addCell(new Phrase("", subheader));
								
								HeaderTable9.getDefaultCell().setBorder(Rectangle.BOTTOM);		
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", tabletext));
								HeaderTable9.addCell(new Phrase("", subheader));
								HeaderTable9.addCell(new Phrase("", subheader));
							}
							
							if(obj3.getListBillReceiptMaster().size()>0){
								
								HeaderTable9.getDefaultCell().setBorder(Rectangle.NO_BORDER);
								for(int i=0;i< obj3.getListBillReceiptMaster().size();i++){
									
									totPaid123=totPaid123+obj3.getListBillReceiptMaster().get(i).getTotalPaid();
									HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
									HeaderTable9.addCell(new Phrase(""+obj3.getListBillReceiptMaster().get(i).getReceiptCount(), tabletext));
									HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
									HeaderTable9.addCell(new Phrase(""+df2.format(obj3.getListBillReceiptMaster().get(i).getTotalPaid()), tabletext));
									HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
									HeaderTable9.addCell(new Phrase(""+obj3.getListBillReceiptMaster().get(i).getCreatedDateTime(), tabletext));			
									HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
										if (obj3.getListBillReceiptMaster().get(i).getPayMode() == 1) {
											HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
											HeaderTable9.addCell(new Phrase(""
													+ df2.format(obj3.getListBillReceiptMaster().get(i)
															.getTotalPaid()), tabletext));
										} else {
											HeaderTable9.addCell(new Phrase("0.00", tabletext));
										}
	
										if (obj3.getListBillReceiptMaster().get(i).getPayMode() == 2) {
											HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
											HeaderTable9.addCell(new Phrase(""
													+ df2.format(obj3.getListBillReceiptMaster().get(i)
															.getTotalPaid()), tabletext));
										} else {
											HeaderTable9.addCell(new Phrase("0.00", tabletext));
										}
										if (obj3.getListBillReceiptMaster().get(i).getPayMode() == 3) {
											HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
											HeaderTable9.addCell(new Phrase(""
													+ df2.format(obj3.getListBillReceiptMaster().get(i)
															.getTotalPaid()), tabletext));
										} else {
											HeaderTable9.addCell(new Phrase("0.00", tabletext));
										}
										
										if (obj3.getListBillReceiptMaster().get(i).getPayMode() == 4) {
											HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
											HeaderTable9.addCell(new Phrase(""
													+ df2.format(obj3.getListBillReceiptMaster().get(i)
															.getTotalPaid()), tabletext));
										}else {
											HeaderTable9.addCell(new Phrase("0.00", tabletext));
										}
	
										//Added for Comment
										//HeaderTable9.addCell(new Phrase(""+obj3.getListBillReceiptMaster().get(i).getDiscRemark(), tabletext));
										HeaderTable9.addCell(new Phrase(""+obj3.getListBillReceiptMaster().get(i).getBatchNumber(), tabletext));
	
									}				
								}
						
								document.add(HeaderTable9);
								HeaderTable9.flushContent();
																
								if(objIpd.getListBillReceiptMaster().size()>0){
																
									HeaderTable9.getDefaultCell().setBorder(Rectangle.NO_BORDER);
									for(int i=0;i< objIpd.getListBillReceiptMaster().size();i++){
										totPaid1Ipd=totPaid1Ipd+objIpd.getListBillReceiptMaster().get(i).getTotalPaid();
										HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
										HeaderTable9.addCell(new Phrase(""+objIpd.getListBillReceiptMaster().get(i).getReceiptCount(), tabletext));
										HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
										HeaderTable9.addCell(new Phrase(""+df2.format(objIpd.getListBillReceiptMaster().get(i).getTotalPaid()), tabletext));
										HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
										HeaderTable9.addCell(new Phrase(""+objIpd.getListBillReceiptMaster().get(i).getCreatedDateTime(), tabletext));			
										HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
										
										if(objIpd.getListBillReceiptMaster().get(i).getPayMode() == -1){
											
											recId=objIpd.getListBillReceiptMaster().get(i).getBillReceiptId();
											List<MultiBillReceiptMasterDTO> listMultiPay = new ArrayList<MultiBillReceiptMasterDTO>();
											double mulCashAmt=0,mulCardAmt=0,mulChqAmt=0,mulCdaAmt=0;
																		
											for(int k = 0; k < listMultiPay.size(); k++){
												
												if (listMultiPay.get(k).getPayMode() == 1) {
													
													mulCashAmt = listMultiPay.get(k).getTotalPaid();						
												}
			
												if (listMultiPay.get(k).getPayMode() == 2) {
													
													mulCardAmt = listMultiPay.get(k).getTotalPaid();
												}
												
												if (listMultiPay.get(k).getPayMode() == 3) {
													
													mulChqAmt = listMultiPay.get(k).getTotalPaid();
												}
												
												if (listMultiPay.get(k).getPayMode() == 4) {
													
													mulCdaAmt = listMultiPay.get(k).getTotalPaid();
												}					
											}	
											
											HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
											HeaderTable9.addCell(new Phrase(""+ df2.format(mulCashAmt), tabletext));
											
											HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
											HeaderTable9.addCell(new Phrase(""+ df2.format(mulCardAmt), tabletext));
											
											HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
											HeaderTable9.addCell(new Phrase(""+ df2.format(mulChqAmt), tabletext));
											
											HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
											HeaderTable9.addCell(new Phrase(""+ df2.format(mulCdaAmt), tabletext));
											
											
											}else{					
												
												if (objIpd.getListBillReceiptMaster().get(i).getPayMode() == 1) {
														HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
														HeaderTable9.addCell(new Phrase(""
																+ df2.format(objIpd.getListBillReceiptMaster().get(i)
																		.getTotalPaid()), tabletext));
												} else {
													HeaderTable9.addCell(new Phrase("0.00", tabletext));
												}
							
												if (objIpd.getListBillReceiptMaster().get(i).getPayMode() == 2) {
													HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
													HeaderTable9.addCell(new Phrase(""
															+ df2.format(objIpd.getListBillReceiptMaster().get(i)
																	.getTotalPaid()), tabletext));
												} else {
													HeaderTable9.addCell(new Phrase("0.00", tabletext));
												}
												
												if (objIpd.getListBillReceiptMaster().get(i).getPayMode() == 3) {
													HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
													HeaderTable9.addCell(new Phrase(""
															+ df2.format(objIpd.getListBillReceiptMaster().get(i)
																	.getTotalPaid()), tabletext));
												}else {
													HeaderTable9.addCell(new Phrase("0.00", tabletext));
												}
												
												if (objIpd.getListBillReceiptMaster().get(i).getPayMode() == 4) {
													HeaderTable9.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
													HeaderTable9.addCell(new Phrase(""
															+ df2.format(objIpd.getListBillReceiptMaster().get(i)
																	.getTotalPaid()), tabletext));
												}else {
													HeaderTable9.addCell(new Phrase("0.00", tabletext));
												}
													
											}
			
											HeaderTable9.addCell(new Phrase(""+objIpd.getListBillReceiptMaster().get(i).getBatchNumber(), tabletext));
			
										}				
									
									}
							
									document.add(HeaderTable9);
									HeaderTable9.flushContent();									
									
											
							/* }
									
						
						} */	
				
					}		
			
				// Table4 : For page footer start
				
				PdfPTable HeaderTable4 = new PdfPTable(3);
				int[] headerwidth4 = { 30, 60, 20 };
				HeaderTable4.setWidths(headerwidth4);
				HeaderTable4.setWidthPercentage(95f);
				HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTable4.setSpacingBefore(30f);
				
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
						
				HeaderTable4.addCell(new Phrase("                       Payee Signature", tabletext));
				HeaderTable4.addCell(new Phrase("", tabletext));			
				HeaderTable4.addCell(new Phrase("Authorized Signatory", tabletext));
		
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
	
				// Table4 : For page footer end
	
				document.add(HeaderTable1);
				HeaderTable1.flushContent();
	
				document.close();
	
				outStream.flush();
				outStream.close();
				
				BillMasterAllTreat objBill = new BillMasterAllTreat();
				objBill.setPatientId(patId);
				objBill.setTreatIds(treatIds);
				objBill.setCreatedBy(userId);
				objBill.setUnitId(unitId);
				fs.generateBillIdTreats(objBill); 		
			}		

		} catch (Exception e) {
			e.printStackTrace();
		}
	%>
	
</body>
</html>