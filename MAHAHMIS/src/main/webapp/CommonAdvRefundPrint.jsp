<%@page import="com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>
<%@page import="com.hms.ipdbill.service.IpdBillService"%>
<%@page import="com.hms.dto.Doctor"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.util.*"%>
<%@ page import="com.hms.dto.CommonAdvanceDTO"%>
<%@ page import="com.hms.ehat.dto.CommonadvDto"%>
<%@ page import="com.hms.ehat.dto.CommanAdvRefund"%>

<%@ page import="com.hms.ehat.dao.CommonadvDao"%>
<%@ page import=" org.codehaus.jackson.map.ObjectMapper"%>
<%@ page import="com.hms.ehat.service.impl.CommonadvServiceImpl"%>
<%@ page import="com.hms.ehat.dao.impl.CommonadvDaoImpl"%>
<%@ page import="javax.servlet.http.HttpServletRequest"%>

<%@ page import="com.hms.dto.Patient"%>
<%@page import="com.hms.administrator.dto.HospitalDetailsDTO"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.model.AdminModel"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@ page import="com.hms.ehat.dto.CurrencyTypeDto"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>OPD Advance Receipt</title>
</head>
<body>
	<%
		try {
			ServletOutputStream outStream = response.getOutputStream();
			response.setContentType("application/pdf");
			CurrencyTypeService fetchOneCurrency=(ApplicationContextUtils.getApplicationContext()).getBean(CurrencyTypeService.class);
			List<CurrencyTypeDto> listServiceCurrencyDto=fetchOneCurrency.getOneCurrencyList();
			String currencyCode=listServiceCurrencyDto.get(0).getCurrencyCode();
			String currencyName=listServiceCurrencyDto.get(0).getCurrencyName();
			response.reset();
/* 
			List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails
					.getHospDetails("0");
			HospitalDetails hospObj = arrHospitalDetails.get(0);
 */
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

			// parameter value
			String query = null;
			String receiptobj[] = request.getParameterValues("myobj");
		
			String str =  receiptobj[0].substring(0, receiptobj[0].length());
			System.out.println("Test 1...." + str );
			
			/* CommonadvDto Commonadv = new CommonadvDto();
			Commonadv = (CommonadvDto) ConfigUIJSONUtility
					.getObjectFromJSON(str,
							CommonadvDto.class); */
							
							CommanAdvRefund cadvrefund = new CommanAdvRefund();
							cadvrefund = (CommanAdvRefund) ConfigUIJSONUtility
									.getObjectFromJSON(str,
											CommanAdvRefund.class);			
							
			int  mypatobj = Integer.parseInt(request.getParameter("cadvid"));
			int  refundID = Integer.parseInt(request.getParameter("refundID"));
			//System.out.println("Test 1...." + Commonadv.getLstCommonadvrecrd().get(0).getCommonadv_amnt());
		//	System.out.println("Test 2...." + receiptobj);

			int ProductId = 0;
			int count = 1;
			
			
			//String sql5 = "select * from hospital limit 1";
			// List<Map> listHospitalDetails = getJdbcTemplate().queryForList(sql5);

			/* String path = hospObj.getFilePath();
			String hospitalName = hospObj.getHospitalName();
			hospitalName = hospitalName.toUpperCase();
			String address = hospObj.getHospitalAddress();
			String city = hospObj.getHospitalCity();
			String contact = hospObj.getHospitalContact();
			String path1 = application.getRealPath(path);
			//System.out.println("Path : "+path1);
			Image img = null;
			PdfPCell cell = null;
			try {

				img = Image.getInstance(path1);
				img.scaleAbsolute(150, 60);
				cell = new PdfPCell();
				cell.addElement(new Chunk(img, 5, -5));
				cell.setBorder(Rectangle.NO_BORDER);
			} catch (Exception e) {
				e.printStackTrace();
			} */

			document.newPage();
			/* PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 40, 70, 10 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
 */
			PdfPTable HeaderTable2 = new PdfPTable(5);
			int[] headerwidth2 = { 15, 15, 40, 5, 20 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable3 = new PdfPTable(6);
			int[] headerwidth3 = { 18, 30, 20, 20, 20, 20 };
			HeaderTable3.setWidths(headerwidth3);
			HeaderTable3.setWidthPercentage(95f);
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable4 = new PdfPTable(3);
			int[] headerwidth4 = { 30, 60, 20 };
			HeaderTable4.setWidths(headerwidth4);
			HeaderTable4.setWidthPercentage(95f);
			HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable5 = new PdfPTable(7);
			int[] headerwidth5 = { 7, 20, 20, 20, 20, 20, 20 };
			HeaderTable5.setWidths(headerwidth5);
			HeaderTable5.setWidthPercentage(95f);
			HeaderTable5.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

			PdfPTable HeaderTable6 = new PdfPTable(5);
			int[] headerwidth6 = { 20, 50, 20, 20, 20 };
			HeaderTable6.setWidths(headerwidth6);
			HeaderTable6.setWidthPercentage(95f);
			HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
		//	AdminModel adminModel = new AdminModel(); 
			int printId = 1;
			int numOfPrint = 1;
					//adminModel.generalAccessNumOfPrint(printId);
			
			for (int i = 0; i < numOfPrint; i++) {
				if((i % 2) == 0){
					document.newPage();
				}
				/* if (i == 0) {
					/* if (img == null) {
						HeaderTable1.addCell(new Phrase("", header));
					} else {
						HeaderTable1.addCell(cell);
					}
					PdfPCell hospitalNameCell1 = new PdfPCell(new Phrase(
							"\n    " + hospitalName + "\n" + address,
							header));
					hospitalNameCell1.setHorizontalAlignment(Element.ALIGN_CENTER);
					hospitalNameCell1.setBorder(Rectangle.NO_BORDER);
					HeaderTable1.addCell(hospitalNameCell1);
					HeaderTable1.addCell(new Phrase("", header));

					HeaderTable1.addCell(new Phrase("", header));
					HeaderTable1.addCell(new Phrase("", header));
					HeaderTable1.addCell(new Phrase("", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();

					HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable1.addCell(new Phrase("            ", header));
					HeaderTable1.addCell(new Phrase("            ", header));
					HeaderTable1.addCell(new Phrase("", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent(); */
				/* } else {

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
					HeaderTable1.addCell(new Phrase("", header));
					HeaderTable1.addCell(new Phrase("", header));
					HeaderTable1.addCell(new Phrase("", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent(); */
					
					/* if (img == null) {
						HeaderTable1.addCell(new Phrase("", header));
					} else {
						HeaderTable1.addCell(cell);
					}
					PdfPCell hospitalNameCell1 = new PdfPCell(new Phrase(
							"\n    " + hospitalName + "\n" + address,
							header));
					hospitalNameCell1.setHorizontalAlignment(Element.ALIGN_CENTER);
					hospitalNameCell1.setBorder(Rectangle.NO_BORDER);
					HeaderTable1.addCell(hospitalNameCell1);
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
					HeaderTable1.flushContent(); */
			/*	} */

			//	CommonAdvanceDTO billobj = new CommonAdvanceDTO();
		
		//	CommonadvDto billobj = new CommonadvDto();
				/* if (!receiptobj.equals("null")) { */
				/* 	String strForBill = receiptobj.substring(0,
							receiptobj.length());
					//System.out.println("Test 3...." + strForBill);

					billobj = (CommonadvDto) ConfigUIJSONUtility
							.getObjectFromJSON(strForBill,
									CommonadvDto.class); */
				/* } */

			//	String head = Commonadv.getLstCommonadv().get(0).getTransationflag() ;
				
		PdfPTable HeaderTable1 = new PdfPTable(3);
		int[] headerwidth1 = { 40, 80, 20 };
		HeaderTable1.setWidths(headerwidth1);
		HeaderTable1.setWidthPercentage(95f);
		HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

		//List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails
			//	.getHospDetails("0");
		//HospitalDetails hospObj = arrHospitalDetails.get(0);

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
		String gstNo =  hospObj.getTxtGstNo();
		String hospitalZip = hospObj.getHospitalZip(); 			
		String PhoneNo   =  hospObj.getHospitalContact();
		String secPhoneNo   =  hospObj.getSecPNo();
		String webste     =   hospObj.getWebsite();
		String email      =   hospObj.getHospitalEmail();
		String cinNo	  =   hospObj.getTxtCinNo();
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
			//String path1 = application.getRealPath(path);
			img = Image.getInstance(path1);
			img.scaleAbsolute(150, 60);
			cell = new PdfPCell();
			cell.addElement(new Chunk(img, 5, -5));
			cell.setBorder(Rectangle.NO_BORDER);
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (img == null) {
			HeaderTable1.addCell(new Phrase("", header));
		} else {
			HeaderTable1.addCell(cell);
		}

		/* PdfPCell hospitalNameCell = new PdfPCell(new Phrase(
				hospitalName + "\n" + address, header));
		hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER); */
		
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
		HeaderTable1.addCell(new Phrase("", header));
		/* hospitalNameCell.setBorder(Rectangle.NO_BORDER);
		HeaderTable1.addCell(hospitalNameCell);
		HeaderTable1.addCell(new Phrase("", header)); */

		// spacing
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
		
				
				
			    String head = "Refund";
				String heading = "";
				if (head.equals("Advance")) {
					heading = "Common Advance Payment Receipt";
				} else {
					heading = "Common Refund Payment Receipt";
				}

				String payeeName = "";
				if (head.equals("Advance")) {
					payeeName = "Received with Thanks From";
				} else {
					payeeName = "Refunded To";
				}

				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				document.add(HeaderTable2);
				HeaderTable2.flushContent();
				
				document.add(HeaderTable2);
				HeaderTable2.flushContent();
				String time="";
				String time2="";
				Date timecadv =null;
	            DecimalFormat twoDForm = new DecimalFormat("#.##");
//				timecadv = Commonadv.getLstCommonadvrecrd().get(0).getCreatedDate();
				SimpleDateFormat sdf=new SimpleDateFormat("dd/MM/YYYY hh:mm:ss a");
			 
			 	Double refundamount=0.0;
			 	Double balnceamount=0.0;
			 	if(cadvrefund.getLstrefund()!=null){
			 				refundamount= Double.valueOf(twoDForm.format(cadvrefund.getLstrefund().get(0).getCommon_adv_refund_amnt()));
			 				if(cadvrefund.getLstrefund().get(0).getCommon_adv_balnce_amnt() !=null){
				 	//			balnceamount= cadvrefund.getLstrefund().get(0).getCommon_adv_balnce_amnt();
				 				balnceamount=Double.valueOf(twoDForm.format(cadvrefund.getLstrefund().get(0).getCommon_adv_balnce_amnt()));
				 				}
			 				timecadv = cadvrefund.getLstrefund().get(0).getCreatedDate();
			 				time=sdf.format(timecadv);
							SimpleDateFormat sdf2=new SimpleDateFormat("dd/MM/YYYY");
							time2=sdf2.format(timecadv);
			 			
			 		
			 		
			 	}
			 	LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
				AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
				List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
				
				
				RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
				List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
				ltRegMasterDto =us.fetchPatientsRecordByTreatmentId(cadvrefund.getLstrefund().get(0).getTreatmentId());
				

				 String BillCategoryName ="";
				
				 String spLeafName  ="";
				 int sponsorSlave=ltRegMasterDto.get(0).getChargesMasterSlaveId();
					
				 if(sponsorSlave > 0){
						fetchsposor   = obj.fetchSuperCatofchargesSlave(sponsorSlave);
					//	BillCategoryName = fetchsposor.get(0).getCategoryName()+" Sponsor";
						spLeafName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id");
						//BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id"); 
					}else{
						BillCategoryName = "Self";
					}
				 
				RegistrationController uss=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
				RegTreBillDto rtd = new RegTreBillDto();			
				List<RegTreBillDto> ltPatientRecord = null;
				rtd=uss.fetchPatientsRecordByTreatmentId(cadvrefund.getLstrefund().get(0).getTreatmentId());
				rtd=rtd.getListRegTreBillDto().get(0);
				
				//use for patient full address
				String addressPatient = "";
				
				 int stateId = rtd.getStateId();
				 int townId   =rtd.getTownId();
				 int districtId =rtd.getDistrictId();
				 int talukaId   =rtd.getTalukaId();
				 int refDocId =rtd.getRefDocId();
				 
					
				
			     String PType = "";
				 String state  ="";
				 String district  ="";
				 String cityObj  ="";
				 String taluka  ="";
				 String refDocName  ="";
				
				
				
				if(sponsorSlave > 0){
					fetchsposor   = obj.fetchSuperCatofchargesSlave(sponsorSlave);
				//	BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
				}else{
					BillCategoryName = "Self";
				}
				
				if(sponsorSlave > 0){
					fetchsposor   = obj.fetchSuperCatofchargesSlave(sponsorSlave);
				//	BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
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
				}if(refDocId > 0 ){
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
				String weight  	=ltRegMasterDto.get(0).getWeight();
				String height  	=ltRegMasterDto.get(0).getHeight();
				
				
				DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
				Date date = new Date();
				String curDate=dateFormat.format(date);
				
				
				
			 
				PdfPTable HeaderTable3aa = new PdfPTable(5);
				int[] headerwidth3aba = { 15,43,20,21,7};
				HeaderTable3aa.setWidths(headerwidth3aba);
				HeaderTable3aa.setWidthPercentage(95f);		
				
				HeaderTable3aa.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				HeaderTable3aa.addCell(new Phrase("Patient ID ", subheader));
				HeaderTable3aa.addCell(new Phrase(" : "+ rtd.getPatientIdd(), tabletext));
				HeaderTable3aa.addCell(new Phrase("Treatment ID ", subheader));
				HeaderTable3aa.addCell(new Phrase(" : "+cadvrefund.getLstrefund().get(0).getTreatmentId(), tabletext));
				HeaderTable3aa.addCell(new Phrase("", tabletext));
				
				HeaderTable3aa.addCell(new Phrase("Patient Name", subheader));
				HeaderTable3aa.addCell(new Phrase(": "+ rtd.getPatientName(), tabletext));
				HeaderTable3aa.addCell(new Phrase("Admission Date", subheader));
				HeaderTable3aa.addCell(new Phrase(": "+time, tabletext));
				HeaderTable3aa.addCell(new Phrase("", tabletext));
				
				HeaderTable3aa.addCell(new Phrase("Age", subheader));
				HeaderTable3aa.addCell(new Phrase(": "+ rtd.getAge(), tabletext));
				HeaderTable3aa.addCell(new Phrase("Gender", subheader));
				HeaderTable3aa.addCell(new Phrase(": "+ rtd.getGender(), tabletext));
				HeaderTable3aa.addCell(new Phrase("", tabletext));

				HeaderTable3aa.addCell(new Phrase("Height", subheader));
				HeaderTable3aa.addCell(new Phrase(": "+ height, tabletext));
				HeaderTable3aa.addCell(new Phrase("Weight", subheader));
				HeaderTable3aa.addCell(new Phrase(": "+ weight, tabletext));
				HeaderTable3aa.addCell(new Phrase("", tabletext));
					
				HeaderTable3aa.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTable3aa.addCell(new Phrase("Address", subheader));
				HeaderTable3aa.addCell(new Phrase(":"+ rtd.getAddress().toLowerCase()+" , "+ addressPatient.toLowerCase(), tabletext));
				HeaderTable3aa.addCell(new Phrase("Patient Type", subheader));
				HeaderTable3aa.addCell(new Phrase(": "+ BillCategoryName, tabletext));
				HeaderTable3aa.addCell(new Phrase(" ", tabletext));	
				
				HeaderTable3aa.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTable3aa.addCell(new Phrase("Tel/Mob.No", subheader));
				HeaderTable3aa.addCell(new Phrase(": "+ rtd.getMobile(), tabletext));			
				String [] opdno = rtd.getOpdipdno().split("/");
				
				if(opdno[1].equals("IPD"))
				{
					HeaderTable3aa.addCell(new Phrase("IPD No.", subheader));
				}else if(opdno[1].equals("OPD")){
					
					HeaderTable3aa.addCell(new Phrase("OPD No.", subheader));
				}else{
					HeaderTable3aa.addCell(new Phrase("Diagnostic No.", subheader));
				}
				
				HeaderTable3aa.addCell(new Phrase(": "+ rtd.getOpdipdno(), tabletext));
				HeaderTable3aa.addCell(new Phrase(" ", tabletext));	
				
				IpdBillService fetchServlist=(ApplicationContextUtils.getApplicationContext()).getBean(IpdBillService.class);	
				
				BillNobleService fetchSubServlist=(ApplicationContextUtils.getApplicationContext()).getBean(BillNobleService.class);	
				
				List<EhatViewPatientBedDetailsIpdDto> listBedIpdDto2=fetchServlist.getPatientBedBill(cadvrefund.getLstrefund().get(0).getTreatmentId(),3);
				
				
				HeaderTable3aa.addCell(new Phrase(" ",subheader));
				HeaderTable3aa.addCell(new Phrase(" ",tabletext));
				HeaderTable3aa.addCell(new Phrase("", subheader));
				HeaderTable3aa.addCell(new Phrase("", tabletext));
				HeaderTable3aa.addCell(new Phrase(" ", tabletext));	
				        
			
				
			//	AdminModel admodel1 = new AdminModel();
				Doctor doc2 = new Doctor();
				List<Doctor> listDoc2 = null;
/* 
				if(rtd.getDoctorId().contains(",")&& !rtd.getDoctorId().equalsIgnoreCase("")){
					
					
					String[] doctors = rtd.getDoctorId().split(",") ;
					String Doc_Nme = "";
					String Depart = "";
					for(String str1 :doctors )
					{
						String DocID = str1;
						int docId =  Integer.parseInt(str1);
						listDoc2 = admodel1.getDoctorsDepDetails(docId);
						 Doc_Nme = Doc_Nme + listDoc2.get(0).getDoc_name()+",";
						 Depart = Depart + listDoc2.get(0).getDepartmentName()+",";
								
					}
					HeaderTable3aa.addCell(new Phrase("Consultant Doc.", subheader));
					HeaderTable3aa.addCell(new Phrase(": "+Doc_Nme, tabletext));			
					HeaderTable3aa.addCell(new Phrase("", subheader));
					HeaderTable3aa.addCell(new Phrase("", tabletext));
					HeaderTable3aa.addCell(new Phrase("", tabletext));
					
				}
				else{
					if(!rtd.getDoctorId().equalsIgnoreCase("")){
				int docId =  Integer.parseInt(rtd.getDoctorId());
				
				listDoc2 = admodel1.getDoctorsDepDetails(docId);
					
				HeaderTable3aa.addCell(new Phrase("Consultant Doc.", subheader));
				HeaderTable3aa.addCell(new Phrase(": "+listDoc2.get(0).getDoc_name(), tabletext));
					}else{
						HeaderTable3aa.addCell(new Phrase("Consultant Doc.", subheader));
						HeaderTable3aa.addCell(new Phrase(": -", tabletext));
						
					}
				HeaderTable3aa.addCell(new Phrase("Ref By", subheader));
				HeaderTable3aa.addCell(new Phrase(": "+refDocName, tabletext));
				HeaderTable3aa.addCell(new Phrase("", tabletext));
				
				}
				HeaderTable3aa.addCell(new Phrase("Sponsor ", subheader));
				HeaderTable3aa.addCell(new Phrase(" : "+spLeafName, tabletext));
				HeaderTable3aa.addCell(new Phrase("", subheader));
				HeaderTable3aa.addCell(new Phrase("", tabletext));
				HeaderTable3aa.addCell(new Phrase("", tabletext)); */
				
				HeaderTable3aa.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable3aa.addCell(new Phrase("", subheader));
				HeaderTable3aa.addCell(new Phrase("", tabletext));			
				HeaderTable3aa.addCell(new Phrase("", subheader));
				HeaderTable3aa.addCell(new Phrase("", tabletext));
				HeaderTable3aa.addCell(new Phrase(" ", tabletext));	
				
				
				
				HeaderTable2
						.addCell(new Phrase("Receipt No : ", subheader));
				PdfPCell subcell = new PdfPCell(new Phrase(""
						+ cadvrefund.getLstrefund().get(0).getCommon_adv_refund_id(), subheader));
				subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
				subcell.setBorder(Rectangle.NO_BORDER);
				HeaderTable2.addCell(subcell);
				HeaderTable2.addCell(new Phrase("" + heading, subheader));
				HeaderTable2.addCell(new Phrase("Date:", subheader));
				HeaderTable2.addCell(new Phrase(""
						+ "" + " " + time, subheader));
				
				HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				document.add(HeaderTable2);
				HeaderTable2.flushContent();
				HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			
 
              int depid =  rtd.getDepartmentId();
               String depname="IPD";
              if (depid==1){
            	  depname ="OPD";
              }else{
            	  depname="IPD";  
              }
				/* HeaderTable3.addCell(new Phrase("Consultant Name:",
						subheader));
				HeaderTable3
						.addCell(new Phrase("" + "Dr.Ajay Sharma", tabletext));

				HeaderTable3.addCell(new Phrase("", subheader));
				
				HeaderTable3.addCell(new Phrase("", subheader));
				PdfPCell cell1 = new PdfPCell(new Phrase("" + depname,
						subheader));
				cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
				cell1.setBorder(Rectangle.NO_BORDER);
				HeaderTable3.addCell(cell1);
				HeaderTable3.addCell(new Phrase("" +  Commonadv.getLstCommonadvrecrd().get(0).getTrcount(), tabletext));

				document.add(HeaderTable3);
				HeaderTable3.flushContent(); */
			//	HeaderTable3.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable3.addCell(new Phrase("", subheader));
				HeaderTable3.addCell(new Phrase("", subheader));
				HeaderTable3.addCell(new Phrase("", subheader));
				HeaderTable3.addCell(new Phrase("", subheader));
				HeaderTable3.addCell(new Phrase("", subheader));
				HeaderTable3.addCell(new Phrase("", subheader));

				document.add(HeaderTable3aa);
				HeaderTable3aa.flushContent();		
				
				
				document.add(HeaderTable3);
				HeaderTable3.flushContent();

				
				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));

				HeaderTable4.addCell(new Phrase("" + payeeName, tabletext));
				HeaderTable4.addCell(new Phrase("" + rtd.getPatientName(), subheader));
				HeaderTable4.addCell(new Phrase("", subheader));

				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", tabletext));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));

				document.add(HeaderTable4);
				HeaderTable4.flushContent();

				HeaderTable5.addCell(new Phrase("", subheader));
				HeaderTable5.addCell(new Phrase("", subheader));
				HeaderTable5.addCell(new Phrase("", subheader));
				HeaderTable5.addCell(new Phrase("", subheader));
				HeaderTable5.addCell(new Phrase("", subheader));
				HeaderTable5.addCell(new Phrase("", subheader));
				HeaderTable5.addCell(new Phrase("", subheader));

				HeaderTable5.addCell(new Phrase("#", subheader));
				HeaderTable5.addCell(new Phrase("Payment Mode", subheader));
				HeaderTable5.addCell(new Phrase("Receipt No", subheader));
				HeaderTable5.addCell(new Phrase("Date", subheader));
				HeaderTable5.addCell(new Phrase("Bank Name", subheader));
				HeaderTable5.addCell(new Phrase("Comment", subheader));
				HeaderTable5.addCell(new Phrase("Amount ("+currencyCode+")", subheader));

				document.add(HeaderTable5);
				HeaderTable5.flushContent();

				HeaderTable5.getDefaultCell()
						.setBorder(Rectangle.NO_BORDER);

				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));

			//	System.out.println("Test 4....");

				String number = "";
				String bank_name = "";
			 if (head.equals("Refund")) { 
					HeaderTable5.addCell(new Phrase("1", tabletext));
					HeaderTable5.addCell(new Phrase("Refund Receipt Against",
							tabletext));
					HeaderTable5.addCell(new Phrase(""+ cadvrefund.getLstrefund().get(0).getCommonadv_id(), tabletext));
					HeaderTable5.addCell(new Phrase(""
							+ time2, tabletext));
					HeaderTable5.addCell(new Phrase("-", tabletext));
					HeaderTable5.addCell(new Phrase(""
							+ "-", tabletext));
					HeaderTable5.addCell(new Phrase(""
							+ refundamount, tabletext));
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

				document.add(HeaderTable5);
				HeaderTable5.flushContent();

				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", tabletext));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));

				Double amt = 0.0;
			 if (head.equals("Refund")) {
					amt = refundamount;
				}

				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("" , tabletext));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("Refunded Amount", subheader));
				HeaderTable6.addCell(new Phrase("" + amt, subheader));

				HeaderTable6.addCell(new Phrase("Amount In Words", subheader));
				long finalam = (long) (amt.longValue());
				HeaderTable6.addCell(new Phrase(""
						+ (EnglishNumberToWords.convert(finalam)
								.toUpperCase()) + " "+currencyName+". ONLY", tabletext));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("Balance Amount", subheader));
				HeaderTable6.addCell(new Phrase(""+ balnceamount , subheader));

				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));

				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));
				HeaderTable6.addCell(new Phrase("", subheader));

				document.add(HeaderTable6);
				HeaderTable6.flushContent();

				int[] headerwidth = { 20, 60, 20 };
				HeaderTable4.setWidths(headerwidth);
				HeaderTable4.getDefaultCell().setBorder(Rectangle.BOX);

				HeaderTable4.addCell(new Phrase(
						"               "+currencyCode+" " + amt, subheader));
				HeaderTable4.getDefaultCell()
						.setBorder(Rectangle.NO_BORDER);
				HeaderTable4
						.addCell(new Phrase(
								"                       Payee Signature",
								tabletext));
				HeaderTable4.addCell(new Phrase("Authorized Signatory",
						tabletext));

				document.add(HeaderTable4);
				HeaderTable4.flushContent();
				
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					HeaderTable6.addCell(new Phrase("", subheader));
					if((i % 2) == 0){
						
						HeaderTable6.getDefaultCell().setBorder(Rectangle.BOTTOM);
						HeaderTable6.addCell(new Phrase("", subheader));
						HeaderTable6.addCell(new Phrase("", subheader));
						HeaderTable6.addCell(new Phrase("", subheader));
						HeaderTable6.addCell(new Phrase("", subheader));
						HeaderTable6.addCell(new Phrase("", subheader));
						document.add(HeaderTable6);
						HeaderTable6.flushContent();
						HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					}
			}

			document.close();
			outStream.close();
			outStream.flush();
			return;
		} catch (Exception e) {
			System.err.println(e.getMessage());
			e.printStackTrace();
		}
	%>
</body>
</html>