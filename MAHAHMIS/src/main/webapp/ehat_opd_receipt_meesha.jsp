<%@page import="org.apache.bcel.generic.LSTORE"%>
<%@page import="com.hms.opdbill.service.OpdBillService"%>
<%@page import="com.hms.opdbill.dto.PatientHeaderInfoDto"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.pharmacy.upload.FilePath"%>
<%@page import="com.hms.dto.Chanelling_doctor"%>
<%@page import="com.hms.model.ChannelingModel"%>
<%@page import="java.util.ResourceBundle"%>
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
<%@page import="com.hms.hisab.model.HisabModel"%>
<%@page import="com.hms.ipdbill.dto.BillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.dto.MultiBillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.serviceImpl.BillServiceImpl"%>
<%@page import="com.hms.ipdbill.service.BillService"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.dto.RadiationMaster"%>
<%@ page import="com.hms.model.AdminModel"%>
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
<title>Opd Receipt PDF</title>
</head>
<body>
	<%
		try {

		response.setContentType("application/pdf");
		CurrencyTypeService fetchOneCurrency=(ApplicationContextUtils.getApplicationContext()).getBean(CurrencyTypeService.class);
		List<CurrencyTypeDto> listServiceCurrencyDto=fetchOneCurrency.getOneCurrencyList();
		String currencyCode=listServiceCurrencyDto.get(0).getCurrencyCode();
		String currencyName=listServiceCurrencyDto.get(0).getCurrencyName();
		
		HttpSession session2 = request.getSession();
		int hospitalUnitId= (Integer) session2.getAttribute("uId");
		HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
		//List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
	    List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
		HospitalDetails hospObj = arrHospitalDetails.get(0);
		
		ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String billPrint = (String) resourceBundle.getObject("billPrint").toString();
		String billPrintsHeader = (String) resourceBundle.getObject("billPrintsHeader").toString();		
				
		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
						
		Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
		
		if(billPrintsHeader.contains("on")){
			
			document = new Document(PageSize.A5);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
		}
		document.setMargins(20, 20, 20, 0);
		PdfWriter.getInstance(document, outStream);		
				
		// Code for save pdf file in folder start
			//String fName = FilePath.getAadharPath() + File.separator + "www.pdf";		
			//FileOutputStream fout=new FileOutputStream(fName);  
			//PdfWriter.getInstance(document, fout);
		// Code for save pdf file in folder start
	
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
		String serviceTaxNo	  =   hospObj.getTxtSerTaxNo();
		String panNo	  =   hospObj.getPanNo();
		String hPhoneNo   = PhoneNo+"/"+secPhoneNo;
		String nabh = hospObj.getNabhImagePath(); 
		String nabhLogo = application.getRealPath(nabh);
		String gstNo=hospObj.getTxtGstNo();
		
		Image img = null;
		PdfPCell cell = null;
		try {
			img = Image.getInstance(path1);
			img.scaleAbsolute(100, 60);
			cell = new PdfPCell();
			cell.addElement(new Chunk(img, 5, -45));
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
		List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
		ltRegMasterDto =us.fetchPatientsRecordByTreatmentId(treatmentId); */
		List<PatientHeaderInfoDto> ltRegMasterDto = null;
		OpdBillService uss=(ApplicationContextUtils.getApplicationContext()).getBean(OpdBillService.class);
		PatientHeaderInfoDto rtd = new PatientHeaderInfoDto();	
		rtd.setTreatmentId(treatmentId);
		rtd = uss.getPatientInfoByTreatmentId(rtd);
		
		ltRegMasterDto = rtd.getListRegTreBillDto();
						
		Integer departmentId=ltRegMasterDto.get(0).getDepartmentId();
		String pname  =ltRegMasterDto.get(0).getPatientName();
		String MRNo   =ltRegMasterDto.get(0).getMrnno();
		String age	  =ltRegMasterDto.get(0).getAge();
		String gender =ltRegMasterDto.get(0).getGender();
		String mobNo =ltRegMasterDto.get(0).getMobile();
		
		String newAge="";
		String newAge1="";
				
		String fileName="opdReceipt_"+mobNo+".pdf"; 		
		response.setContentType("application/pdf");
        response.addHeader("Content-Disposition","inline; filename="+fileName+" ");
        
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
			double weight = ltRegMasterDto.get(0).getWeight();
			double height = ltRegMasterDto.get(0).getHeight();
			String wetHeg = weight + " /" + height;
			String docId = ltRegMasterDto.get(0).getDoctorId();
			String docName = "";
			int count = 0;
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

			int stateId = ltRegMasterDto.get(0).getStateId();
			int townId = ltRegMasterDto.get(0).getTownId();
			int districtId = ltRegMasterDto.get(0).getDistrictId();
			int talukaId = ltRegMasterDto.get(0).getTalukaId();
			int sponsorSlave = ltRegMasterDto.get(0).getChargesMasterSlaveId();

			String BillCategoryName = "";
			String state = "";
			String district = "";
			String cityObj = "";
			String taluka = "";

			LabService fetchlist = (ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);
			//AutosuggestionService obj = (ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
			//List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();

			/* if(doctorId > 0){
				Consultant   = fetchlist.getStringValOfObject("doctor","doc_name",doctorId,"Doctor_ID");
			} */

			/* if (sponsorSlave > 0) {

				fetchsposor = obj.fetchSuperCatofchargesSlave(sponsorSlave);
				if (fetchsposor.size() > 0) {

					BillCategoryName = fetchsposor.get(0).getCategoryName()
							+ " Sponsor";
				} else {

					BillCategoryName = " Sponsor";
				}
				//BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id"); 
			} else {
				BillCategoryName = "Self";
			} */
			
			BillCategoryName = ltRegMasterDto.get(0).getCategoryName();
			
			
			if (stateId > 0) {
				state = fetchlist.getStringValOfObject("state",
						"state_name", stateId, "idstate");
			} else {
				state = "-";
			}
			if (districtId > 0) {
				district = fetchlist.getStringValOfObject("district",
						"dis_name", districtId, "iddistrict");
			} else {
				district = "";
			}

			if (townId > 0) {
				cityObj = fetchlist.getStringValOfObject("city",
						"city_name", townId, "idcity");
			} else {
				cityObj = "";
			}

			if (talukaId > 0) {
				taluka = fetchlist.getStringValOfObject("taluka",
						"taluka_name", talukaId, "idtaluka");
			} else {
				taluka = "";
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
			String billId = String.valueOf(ltRegMasterDto.get(0).getBillId());
			String PatientID = String.valueOf(ltRegMasterDto.get(0).getPatientId());

			lstPojo = hm.getOpdRecDetails(patBillId, treatmentId, patId, recId, callFrom);

			int recCount = lstPojo.get(0).getReceiptCount();
			int againstId = lstPojo.get(0).getAgainstId();
			String receiptNo1 = String.valueOf(recCount);
			//int receiptNo = lstPojo.get(0).getInvoiceCount();
			int receiptNo =Integer.parseInt(billId);
			String againstNo = String.valueOf(againstId);
			//int len = ltRegMasterDto.get(0).getListEhatBillPrefix().size();

			/* for (int n = 0; n < len; n++) { 

				EhatBillPrefix lst = ltRegMasterDto.get(0).getListEhatBillPrefix().get(n);
				// For Patient Id
				String patntId = String.valueOf(ltRegMasterDto.get(0).getPatientId());
				if (lst.getDepId() == 4) {

					String prefix = lst.getBillPrefix();
					String middle = lst.getBillMiddle();
					String sufix = lst.getBillSuffix();
					String patIdPrefix = prefix + patId + sufix;
				}
				// For Patient Id

				// For bill Id
				String billGenId = String.valueOf(ltRegMasterDto.get(0).getInvoiceCount());
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
			listMultiPay = hm.getMultiRecDetails(patBillId, treatmentId, patId, recId, departmentId);

			DecimalFormat df2 = new DecimalFormat("0.00");

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
			if (cityObj != "0" && !cityObj.equals("undefined")
					&& !cityObj.equals("")) {
				addressPatient += cityObj;
			}

			if (taluka != "0" && !taluka.equals("undefined")
					&& !taluka.equals("")) {
				addressPatient += (taluka + ",");
			}
			if (district != "0" && !district.equals("undefined")
					&& !district.equals("")) {
				addressPatient += (district + ",");
			}
			if (state != "0" && !state.equals("undefined")
					&& !state.equals("")) {
				addressPatient += (state + ",");
			}
			// end : patient address

			addressPatient = addressPatient.substring(0, addressPatient.length() - 1);

			document.newPage();

			//AdminModel adminModel = new AdminModel();
			int printId = 2;
			int numOfPrint = 1;//adminModel.generalAccessNumOfPrint(printId);// to get number of prints

			// Table 1 : For hospital adress details start

			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 40, 100, 0 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(100f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_LEFT);
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

				HeaderTable1.setHorizontalAlignment(Element.ALIGN_LEFT);
				//HeaderTable1.addCell(cell);
			}

			Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
			Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD);
			Phrase p = new Phrase();
			//p.add(new Chunk(" " + hospitalName, bold));
			//p.add(new Chunk(" \n\n" + address, tabletext));
			//p.add(new Chunk(" \n" + city + " Pin- " + hospitalZip, tabletext));
			//p.add(new Chunk(" \nPhone No. " + hPhoneNo, tabletext));
			//p.add(new Chunk(" \n " + webste + " email: " + email, tabletext));
			//p.add(new Chunk(" \nCIN: " + cinNo, tabletext));
			//p.add(new Chunk(" \nSERVICE TAX NO : " + serviceTaxNo + ", PAN No: " + panNo, tabletext));

			//PdfPCell hospitalNameCell = new PdfPCell(p);
			//hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			//hospitalNameCell.setBorder(Rectangle.NO_BORDER);
			//HeaderTable1.addCell(hospitalNameCell);

			if (billPrintsHeader.contains("on")) {/* 

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
				
			 */}

			
		
			
			PdfPTable HeaderTableSpace = new PdfPTable(1);
			int[] headerwidthSpace = {40 };
			HeaderTableSpace.setWidths(headerwidthSpace);
			HeaderTableSpace.setWidthPercentage(95f);
			HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTableSpace.setSpacingAfter(80.0f);
			
			HeaderTableSpace.addCell(new Phrase("", tabletext));
			HeaderTableSpace.addCell(new Phrase("", tabletext));
			HeaderTableSpace.addCell(new Phrase("", tabletext));
			HeaderTableSpace.addCell(new Phrase("", tabletext));
			HeaderTableSpace.addCell(new Phrase("", tabletext));
  			document.add(HeaderTableSpace);
  			HeaderTableSpace.flushContent();
			// Table 1 : For hospital adress details end

			// Table 2 : For receipt head start

			PdfPTable HeaderTable2 = new PdfPTable(5);
			int[] headerwidth2 = { 15, 24, 40, 9, 20 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);

			if (billPrintsHeader.contains("off")) {

				HeaderTable2.setSpacingBefore(74f);
			}

			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(new Phrase("", subheader));
			PdfPCell subcell = new PdfPCell(new Phrase("", subheader));
			subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
			subcell.setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(subcell);
			//HeaderTable2.getDefaultCell().setHorizontalAlignment(); 
			HeaderTable2.addCell(new Phrase("OPD RECEIPT ", header));
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			document.add(HeaderTable2);
			HeaderTable2.flushContent();
			
			// Table 2 : For receipt head end

			/* RegistrationController regCon = (ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
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
			
			
			// For ref doc start
			/* ChannelingModel objChannelingModel = new ChannelingModel();		
			List<Chanelling_doctor> arrChanelling_doctor = new ArrayList<Chanelling_doctor>();
			arrChanelling_doctor=objChannelingModel.getRefDoctors();
			String refDrName="";
			int refDrId=ltRegMasterDto.get(0).getRefDocId();
			for(Chanelling_doctor objRef : arrChanelling_doctor){
				
				if(refDrId==objRef.getChannDocId()){
					
					refDrName=objRef.getDocName();
				}
			} */	
			
			String refDrName = ltRegMasterDto.get(0).getRefDocName();
			// For
			

			double paidAmt = lstPojo.get(0).getFirstPaid();
			double totConAmt = lstPojo.get(0).getFirstDisc();
			double totRemain = lstPojo.get(0).getFirstRemain();

			totConAmt = totConAmt + lstPojo.get(0).getActualTotConcn();

			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
			SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm");
			//SimpleDateFormat sdf3 = new SimpleDateFormat("dd/MM/yyyy HH:mm");
			SimpleDateFormat sdf3 = new SimpleDateFormat("dd/MM/yyyy");
			Date now = new Date(new java.util.Date().getTime());
			String strDate = sdf.format(now);
			String rtime = sdf2.format(now);
			String rtimeDate = sdf3.format(now);

			String age2 = ltRegMasterDto.get(0).getAge2();
			String dob = ltRegMasterDto.get(0).getDob();

			if (dob.equals("") || dob.equals(null)) {
				AgeSexWt = ptage + "    " + gender;
			}

			/* if (!docId.equals("") && !docId.contains(",")) {

				int doctorId = Integer.parseInt(docId);
				if (doctorId > 0) {
					docName = fetchlist.getStringValOfObject("doctor",
							"doc_name", doctorId, "Doctor_ID");
				}
			} */
			docName = ltRegMasterDto.get(0).getConsultingDocName();

			// Table3 : For patient header info start

			PdfPTable HeaderTable3 = new PdfPTable(4);
			int[] headerwidth3 = { 30, 50, 30, 50 };
			HeaderTable3.setWidths(headerwidth3);
			HeaderTable3.setWidthPercentage(95f);
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		//	Date createdDate2 = lstPojo.get(0).getCreatedDateTime();
		//String recCrDate = sdf3.format(createdDate2);
			
			Date createdDate2 = ltRegMasterDto.get(0).getInvCreatedDateTime();
			System.out.println("createdDate2=== "+createdDate2);
		String recCrDate = sdf3.format(createdDate2);
			
			
			/* HeaderTable3.addCell(new Phrase("Reg. No. ", subheader));
			HeaderTable3.addCell(new Phrase(" : " + opdipdno, tabletext));*/
			
			HeaderTable3.addCell(new Phrase("Patient Id. ", subheader));
			HeaderTable3.addCell(new Phrase(" : " + patId, tabletext));

			//HeaderTable3.addCell(new Phrase("Receipt No. ", subheader));
			//HeaderTable3.addCell(new Phrase(" : " + receiptNo,tabletext));
			
			
			HeaderTable3.addCell(new Phrase("Bill No. ", subheader));
			HeaderTable3.addCell(new Phrase(" : " + receiptNo,tabletext));

			HeaderTable3.addCell(new Phrase("Patient Name ", subheader));
			HeaderTable3.addCell(new Phrase(" : " + pname, tabletext));

			HeaderTable3.addCell(new Phrase("Bill Date ", subheader));
			HeaderTable3.addCell(new Phrase(" : " + recCrDate,tabletext));

			HeaderTable3.addCell(new Phrase("Ref. By Dr. ", subheader));
			HeaderTable3.addCell(new Phrase(" : " + refDrName, tabletext));

			HeaderTable3.addCell(new Phrase("Company Name ", subheader));
			HeaderTable3.addCell(new Phrase(" : " + BillCategoryName,tabletext));

            HeaderTable3.addCell(new Phrase("Mobile No ", subheader));
            if(mobNo!=null && !mobNo.equalsIgnoreCase("")){
            	
            	HeaderTable3.addCell(new Phrase(" : "+mobNo,tabletext));
        	}else{
        		
        		HeaderTable3.addCell(new Phrase(" : ",tabletext));
        	}            

			HeaderTable3.addCell(new Phrase("Age/Sex ", subheader));
			HeaderTable3.addCell(new Phrase(" : " + AgeSexWt, tabletext));

			document.add(HeaderTable3);
			HeaderTable3.flushContent();

			// Table3 : For patient header info end

			// Table5 : For service details head start

			double totPayable = 0.0;
			double totDic = lstPojo.get(0).getTotalDisc();
			double totCon = 0.0;
			double totAmt = 0.0;
			
			int labId = 0;
			for (int i = 0; i < lstPojo.get(0).getListBillReceiptSlave().size(); i++) {

				double servId = lstPojo.get(0).getListBillReceiptSlave().get(i).getServiceId();
				if (servId == 11) {

					labId = 1;
				}
			}
			
			if (labId == 1) {
			
				PdfPTable HeaderTable5 = new PdfPTable(5);
				int[] headerwidth5 = {5,60,10,15,15};
				HeaderTable5.setWidths(headerwidth5);
				HeaderTable5.setWidthPercentage(95f);
				HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);	
				
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				
				HeaderTable5.addCell(new Phrase("No", subheader));
				HeaderTable5.addCell(new Phrase("Test Name", subheader));
				HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
				HeaderTable5.addCell(new Phrase("Qty", subheader));
				HeaderTable5.addCell(new Phrase("Rate", subheader));
				HeaderTable5.addCell(new Phrase("Amount", subheader));
										
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
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				
				for (int i = 0; i < lstPojo.get(0).getListBillReceiptSlave().size(); i++) {

					String compName = "";
					if (lstPojo.get(0).getAgainstId() > 0) {

						againstNo = lstPojo.get(0).getListBillReceiptSlave().get(0).getCompName();
						compName = "Receipt Against : " + againstNo;
					} else {

						compName = lstPojo.get(0).getListBillReceiptSlave().get(i).getCompName();
					}
					double rate = lstPojo.get(0).getListBillReceiptSlave().get(i).getRate();
					double qty = lstPojo.get(0).getListBillReceiptSlave().get(i).getQuantity();
					double amt = lstPojo.get(0).getListBillReceiptSlave().get(i).getAmount();
					double consn = lstPojo.get(0).getListBillReceiptSlave().get(i).getConcession();
					
					totCon = totCon + consn;
					totAmt = totAmt + (amt - consn);

					double netAmt = amt - consn;
					totPayable = totPayable + netAmt;
					totDic = totDic + consn;

					HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
					HeaderTable5.addCell(new Phrase("" + (i + 1), tabletext));
					HeaderTable5.addCell(new Phrase("" + compName,tabletext));
					HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
					HeaderTable5.addCell(new Phrase("" + qty, tabletext));
					HeaderTable5.addCell(new Phrase("" + df2.format(rate), tabletext));
					HeaderTable5.addCell(new Phrase("" + df2.format(netAmt), tabletext));
				}				
				
				document.add(HeaderTable5);
				HeaderTable5.flushContent();			
			
			}else{
			
				PdfPTable HeaderTable5 = new PdfPTable(5);
				int[] headerwidth5 = {60,40,15,15,15};
				HeaderTable5.setWidths(headerwidth5);
				HeaderTable5.setWidthPercentage(95f);
				HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);	
				
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				
				HeaderTable5.addCell(new Phrase("Bill Head", subheader));
				HeaderTable5.addCell(new Phrase("Doctor Name", subheader));
				HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
				HeaderTable5.addCell(new Phrase("Qty", subheader));
				HeaderTable5.addCell(new Phrase("Rate", subheader));
				HeaderTable5.addCell(new Phrase("Amount", subheader));
										
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
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));	
				
				for (int i = 0; i < lstPojo.get(0).getListBillReceiptSlave().size(); i++) {

					String compName = "";
					if (lstPojo.get(0).getAgainstId() > 0) {

						againstNo = lstPojo.get(0).getListBillReceiptSlave().get(0).getCompName();
						compName = "Receipt Against : " + againstNo;
					} else {

						compName = lstPojo.get(0).getListBillReceiptSlave().get(i).getCompName();
					}
					double rate = lstPojo.get(0).getListBillReceiptSlave().get(i).getRate();
					double qty = lstPojo.get(0).getListBillReceiptSlave().get(i).getQuantity();
					double amt = lstPojo.get(0).getListBillReceiptSlave().get(i).getAmount();
					double consn = lstPojo.get(0).getListBillReceiptSlave().get(i).getConcession();
					int servDocId = lstPojo.get(0).getListBillReceiptSlave().get(i).getDoctorId();
					
					totCon = totCon + consn;
					totAmt = totAmt + (amt - consn);

					String servDocName = "-";
					if (servDocId == 0) {

					} else {

						servDocName = fetchlist.getStringValOfObject("doctor", "doc_name", servDocId,"Doctor_ID");
					}
					
					double netAmt = amt - consn;
					totPayable = totPayable + netAmt;
					totDic = totDic + consn;

					HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
					HeaderTable5.addCell(new Phrase("" + compName, tabletext));
					HeaderTable5.addCell(new Phrase("" + servDocName,tabletext));
					HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
					HeaderTable5.addCell(new Phrase("" + qty, tabletext));
					HeaderTable5.addCell(new Phrase("" + df2.format(rate), tabletext));
					HeaderTable5.addCell(new Phrase("" + df2.format(netAmt), tabletext));					
				}
				
				document.add(HeaderTable5);
				HeaderTable5.flushContent();					
			}			
						
			PdfPTable HeaderTable25 = new PdfPTable(4);
			int[] headerwidth25 = {17,65,34,20};
			HeaderTable25.setWidths(headerwidth25);
			HeaderTable25.setWidthPercentage(95f);
			HeaderTable25.getDefaultCell().setBorder(Rectangle.BOTTOM);	
			
			HeaderTable25.addCell(new Phrase("", tabletext));
			HeaderTable25.addCell(new Phrase("", tabletext));
			HeaderTable25.addCell(new Phrase("", tabletext));
			HeaderTable25.addCell(new Phrase("", tabletext));
			
			HeaderTable25.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			HeaderTable25.addCell(new Phrase("In Words : ", subheader));
			long finalam1 = (long) lstPojo.get(0).getFirstPaid();
			
			String oustandingAmt="";
			
			if(lstPojo.get(0).getFirstPaid() > 0){
				
				oustandingAmt = EnglishNumberToWords.convert(finalam1);
				oustandingAmt = oustandingAmt + "Only";
			}else{
				
				oustandingAmt = " Zero Only";
			}			
			
			HeaderTable25.addCell(new Phrase("" + oustandingAmt, tabletext));				
			HeaderTable25.addCell(new Phrase("Total Amount ("+currencyName+")       :",tabletext));
			HeaderTable25.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable25.addCell(new Phrase(""+ df2.format(totAmt), tabletext));

			if (totConAmt > 0) {
				
				HeaderTable25.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
				HeaderTable25.addCell(new Phrase("", tabletext));
				HeaderTable25.addCell(new Phrase("", tabletext));
				HeaderTable25.addCell(new Phrase("Discount ("+currencyName+")              :",tabletext));
				HeaderTable25.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
				HeaderTable25.addCell(new Phrase(""+ df2.format(totConAmt), tabletext));
			}				
			
			HeaderTable25.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
			HeaderTable25.addCell(new Phrase("", tabletext));
			HeaderTable25.addCell(new Phrase("", tabletext));
			HeaderTable25.addCell(new Phrase("Paid Amount ("+currencyName+")        :",tabletext));
			HeaderTable25.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable25.addCell(new Phrase(""+ df2.format(paidAmt), tabletext));
			
			HeaderTable25.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
			HeaderTable25.addCell(new Phrase("", tabletext));
			HeaderTable25.addCell(new Phrase("", tabletext));
			HeaderTable25.addCell(new Phrase("Balance Amount ("+currencyName+")  :",tabletext));
			HeaderTable25.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable25.addCell(new Phrase(""+ df2.format(totRemain), tabletext));
			
			HeaderTable25.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable25.addCell(new Phrase("", tabletext));
			HeaderTable25.addCell(new Phrase("", tabletext));
			HeaderTable25.addCell(new Phrase("", tabletext));
			HeaderTable25.addCell(new Phrase("", tabletext));				
			
			document.add(HeaderTable25);
			HeaderTable25.flushContent();  

			// Table5 : For service details head end

			// Table6 : For receipt footer start

			PdfPTable HeaderTable6 = new PdfPTable(5);
			int[] headerwidth6 = { 30, 60, 30, 20, 20 };
			HeaderTable6.setWidths(headerwidth6);
			HeaderTable6.setWidthPercentage(95f);
			HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			int pMode = lstPojo.get(0).getPayMode();
			String payMode = "";
			if (pMode == 1) {

				payMode = "Cash";
			} else if (pMode == 2) {

				payMode = "Card";
			} else if (pMode == 3) {

				payMode = "Cheque";
			} else if (pMode == 4) {

				payMode = "Common Advance";
			} else if (pMode == 5) {

				payMode = "Credit";
			}else if (pMode == 6) {

				payMode = "PhonePay";
			} else if (pMode == 7) {

				payMode = "GooglePay";
			} else if (pMode == 8) {

				payMode = "UPI";
			}  
			else {

				payMode = "Multiple";
			}

			String banknmeId = "";
			String cardcheqNo = "";
			String bankName = "";
			String batchNo = "";
			Date createdDate = lstPojo.get(0).getCreatedDateTime();
			double total_paid = lstPojo.get(0).getFirstPaid();
			if (total_paid <= 0) {
				total_paid = 0;
			}

			if (pMode == 2 || pMode == 3) {

				banknmeId = lstPojo.get(0).getbName();
				cardcheqNo = lstPojo.get(0).getbNumber();
				Integer bankid = Integer.parseInt(banknmeId);
				batchNo = lstPojo.get(0).getBatchNumber();

				if (!(bankid == null || bankid.equals(""))) {

					bankName = fetchlist.getStringValOfObject("pharma_bank_master", "bank_name", bankid,"bank_id");
				}
				if (cardcheqNo == null || cardcheqNo.equals("")) {

					cardcheqNo = "";
				}
			}

			PdfPTable HeaderTable8 = new PdfPTable(7);
			int[] headerwidth8 = { 15, 25, 27, 25, 20, 15,15 };
			HeaderTable8.setWidths(headerwidth8);
			HeaderTable8.setWidthPercentage(95f);
			HeaderTable8.setSpacingAfter(20f);
			HeaderTable8.getDefaultCell().setBorder(Rectangle.TOP);

			HeaderTable8.addCell(new Phrase("Rec No", subheader));
			HeaderTable8.addCell(new Phrase("Pay Mode", subheader));
			HeaderTable8.addCell(new Phrase("Bank Name", subheader));			
			HeaderTable8.addCell(new Phrase("Chq/ECS/CardNo", subheader));
			HeaderTable8.addCell(new Phrase("Date", subheader));
			HeaderTable8.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable8.addCell(new Phrase("Amount", subheader));
			HeaderTable8.addCell(new Phrase("Batch No", subheader));

			if (pMode == -1) {

				HeaderTable8.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
				HeaderTable8.addCell(new Phrase("", subheader));
				HeaderTable8.addCell(new Phrase("", subheader));				
				HeaderTable8.addCell(new Phrase("", subheader));
				HeaderTable8.addCell(new Phrase("", subheader));
				HeaderTable8.addCell(new Phrase("", subheader));
				HeaderTable8.addCell(new Phrase("", subheader));
				HeaderTable8.addCell(new Phrase("", subheader));

				HeaderTable8.getDefaultCell().setBorder(Rectangle.TOP);

				for (int i = 0; i < listMultiPay.size(); i++) {

					Date mulCreatedDate = listMultiPay.get(i).getCreatedDateTime();

					HeaderTable8.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable8.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
					HeaderTable8.addCell(new Phrase(""+receiptNo1, tabletext));
					HeaderTable8.addCell(new Phrase(""+ listMultiPay.get(i).getPayName(), tabletext));
					HeaderTable8.addCell(new Phrase(""+ listMultiPay.get(i).getbName(), tabletext));					
					HeaderTable8.addCell(new Phrase(""+ listMultiPay.get(i).getbNumber(), tabletext));
					HeaderTable8.addCell(new Phrase("" + mulCreatedDate,tabletext));
					HeaderTable8.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
					HeaderTable8.addCell(new Phrase(""+ df2.format(listMultiPay.get(i).getTotalPaid()),tabletext));
					HeaderTable8.addCell(new Phrase(""+ listMultiPay.get(i).getBatchNumber(),tabletext));
				}

			} else {

				HeaderTable8.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
				HeaderTable8.addCell(new Phrase("" + receiptNo1, tabletext));
				HeaderTable8.addCell(new Phrase("" + payMode, tabletext));
				HeaderTable8.addCell(new Phrase("" + bankName, tabletext));			
				HeaderTable8.addCell(new Phrase("" + cardcheqNo, tabletext));
				HeaderTable8.addCell(new Phrase("" + createdDate, tabletext));
				HeaderTable8.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
				HeaderTable8.addCell(new Phrase("" + df2.format(total_paid), tabletext));
				HeaderTable8.addCell(new Phrase("" + batchNo, tabletext));
				HeaderTable8.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			}

			document.add(HeaderTable8);
			HeaderTable8.flushContent();

			// Table6 : For receipt footer end

			PdfPTable HeaderTable7 = new PdfPTable(3);
			int[] headerwidth7 = { 80, 25, 30 };
			HeaderTable7.setWidths(headerwidth7);
			HeaderTable7.setWidthPercentage(95f);
			HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable7.addCell(new Phrase("1. Please bring this receipt while collecting the reports",tabletext));
			HeaderTable7.addCell(new Phrase("", tabletext));
			HeaderTable7.addCell(new Phrase("", tabletext));

			HeaderTable7.addCell(new Phrase("2. Please collect the report within one month.",tabletext));
			HeaderTable7.addCell(new Phrase("", tabletext));
			HeaderTable7.addCell(new Phrase(" ", tabletext));
			
			HeaderTable7.addCell(new Phrase("\n\n",tabletext));
			HeaderTable7.addCell(new Phrase("\n\n", tabletext));
			HeaderTable7.addCell(new Phrase("\n\n", tabletext));
			
			HeaderTable7.addCell(new Phrase("GST No : "+gstNo,subheader));
			HeaderTable7.addCell(new Phrase("Prepared By", tabletext));
			HeaderTable7.addCell(new Phrase(" " + user_name, tabletext));

			document.add(HeaderTable7);
			HeaderTable7.flushContent();
			
			
			// Table4 : For page footer start

			/* PdfPTable HeaderTable4 = new PdfPTable(3);
			int[] headerwidth4 = { 17, 100, 30 };
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
				

			}else {

				HeaderTable4.addCell(new Phrase("GST No : ",subheader));
				HeaderTable4.addCell(new Phrase(""+gstNo, tabletext));
				HeaderTable4.addCell(new Phrase("", tabletext));
							
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));

				HeaderTable4.addCell(new Phrase("User :", tabletext));
				HeaderTable4.addCell(new Phrase("" + user_name, tabletext));
				HeaderTable4.addCell(new Phrase("Signature", tabletext));

				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", tabletext));

				document.add(HeaderTable4);
				HeaderTable4.flushContent();
			} */

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