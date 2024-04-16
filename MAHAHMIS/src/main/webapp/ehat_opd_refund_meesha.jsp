<%@page import="com.hms.ipdbill.dto.BillRefundMasterDTO"%>
<%@page import="com.hms.opdbill.service.OpdBillService"%>
<%@page import="com.hms.opdbill.dto.PatientHeaderInfoDto"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.ehat.dto.EhatBillPrefix"%>
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
<title>OPD Receipt</title>
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
			
			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			
			if(billPrintsHeader.contains("on")){
				
				document = new Document(PageSize.A5);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
				
			}
			document.setMargins(20, 20, 20, 0);

			PdfWriter.getInstance(document, outStream);
			document.open();
			//font

			/* Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
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
			
			//String AgeSexWt=age+" /"+gender;
			String AgeSexWt=ptage+" /"+gender;
			String treatmentCount =ltRegMasterDto.get(0).getTrcount();
			String ContactNo =ltRegMasterDto.get(0).getMobile();
			int Departmentid =ltRegMasterDto.get(0).getDepartmentId();
			String TokenNo   =ltRegMasterDto.get(0).getTokenno();
			Date appDate   =ltRegMasterDto.get(0).getCreatedDateTime();
			String opdipdno =ltRegMasterDto.get(0).getOpdipdno();
			double weight  	=ltRegMasterDto.get(0).getWeight();
			double height  	=ltRegMasterDto.get(0).getHeight();
			String wetHeg   =weight+" /"+height;
			String docId=ltRegMasterDto.get(0).getDoctorId();
			String docName="";
			int count=0;
			
			String fileName="opdRefund_"+ContactNo;        
	        response.setHeader("Content-Disposition","inline; filename=\" "+fileName+" \"");
	        response.setContentType("application/pdf; name=\" "+fileName+" \""); 
			
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
			
			/* if(doctorId > 0){
				Consultant   = fetchlist.getStringValOfObject("doctor","doc_name",doctorId,"Doctor_ID");
			} */ 
			
			/* if(sponsorSlave > 0){
				
				fetchsposor   = obj.fetchSuperCatofchargesSlave(sponsorSlave);
				if(fetchsposor.size() > 0 ){
					
					BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
				}else{
					
					BillCategoryName = " Sponsor";
				} 
			}else{
				BillCategoryName = "Self";
			} */

			BillCategoryName = ltRegMasterDto.get(0).getCategoryName();
			
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
					
			/* int billId=Integer.parseInt(request.getParameter("billId"));
			int patId=Integer.parseInt(request.getParameter("patId")); */
			int treatId=Integer.parseInt(request.getParameter("treatId"));
			//int recId=Integer.parseInt(request.getParameter("recId"));
			
			Integer patBillId = ltRegMasterDto.get(0).getBillId();
			String billId =String.valueOf(ltRegMasterDto.get(0).getBillId());			
			String PatientID=String.valueOf(ltRegMasterDto.get(0).getPatientId());
			
			BillService hm = (ApplicationContextUtils.getApplicationContext()).getBean(BillService.class);	
			List<BillRefundMasterDTO> lstPojo = new ArrayList<BillRefundMasterDTO>();
			String callFrom="refund";
			lstPojo=hm.getOpdRefundDetails(patBillId, treatId, patId, recId, callFrom);
			int recCount=lstPojo.get(0).getRefundCount();
			int againstId=lstPojo.get(0).getAgainstId();
			String receiptNo=String.valueOf(recCount);		
			String againstNo=String.valueOf(againstId);
			//int len = ltRegMasterDto.get(0).getListEhatBillPrefix().size();	
			
			/* for(int n=0;n<len;n++){
				
		  		EhatBillPrefix lst = ltRegMasterDto.get(0).getListEhatBillPrefix().get(n);
		  		// For Patient Id
		  		String patntId=String.valueOf(ltRegMasterDto.get(0).getPatientId());
		  		if(lst.getDepId()==4){
		  			
		  			String prefix=lst.getBillPrefix();
		  			String middle=lst.getBillMiddle();
		  			String sufix=lst.getBillSuffix();
		  			String patIdPrefix=prefix+patId+sufix;		  						  			
		  		}
		  		// For Patient Id
		  		
		  		// For bill Id
		  		String billGenId=String.valueOf(ltRegMasterDto.get(0).getInvoiceCount());
		  		if((lst.getBillRecBoth()==1 || lst.getBillRecBoth()==3)){
		  			
		  			String prefix=lst.getBillPrefix();
		  			String middle=lst.getBillMiddle();
		  			String sufix=lst.getBillSuffix();
		  			String billIdPrefix=prefix+billGenId+sufix;			  			
		  		}		  		
		  		// For bill Id
		  		
		  		// For Rec Id
		  		receiptNo=String.valueOf(recCount);
		  		if((lst.getBillRecBoth()==2 || lst.getBillRecBoth()==3)){
		  			
		  			String prefix=lst.getBillPrefix();
		  			String middle=lst.getBillMiddle();
		  			String sufix=lst.getBillSuffix();
		  			receiptNo=prefix+receiptNo+sufix;	
		  			againstNo=prefix+againstId+sufix;	
		  		}		  		
		  		// For Rec Id
		  		
		  	} */	
			
			//irfan khan 11-jan-2018 multi pay mode list
			List<MultiBillReceiptMasterDTO> listMultiPay = new ArrayList<MultiBillReceiptMasterDTO>();
			listMultiPay=hm.getMultiRecDetails(patBillId, treatmentId, patId, recId, departmentId);
			
			document.newPage();
			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 30, 100, 0 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(100f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			

			PdfPTable HeaderTable3 = new PdfPTable(4);
			int[] headerwidth3 = { 30, 50, 30, 50 };
			HeaderTable3.setWidths(headerwidth3);
			HeaderTable3.setWidthPercentage(95f);
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable4 = new PdfPTable(3);
			int[] headerwidth4 = { 30, 60, 20 };
			HeaderTable4.setWidths(headerwidth4);
			HeaderTable4.setWidthPercentage(95f);
			HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable5 = new PdfPTable(7);
			int[] headerwidth5 = { 7, 30, 15, 10, 15, 20, 20 };
			HeaderTable5.setWidths(headerwidth5);
			HeaderTable5.setWidthPercentage(95f);
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
			
			PdfPTable HeaderTable7 = new PdfPTable(6);
			int[] headerwidth7 = { 7, 40, 20, 15, 20, 18 };
			HeaderTable7.setWidths(headerwidth7);
			HeaderTable7.setWidthPercentage(95f);
			HeaderTable7.getDefaultCell().setBorder(Rectangle.BOTTOM);

			PdfPTable HeaderTable6 = new PdfPTable(5);

			int[] headerwidth6 = { 30, 60, 20, 20, 20 };
			HeaderTable6.setWidths(headerwidth6);
			HeaderTable6.setWidthPercentage(95f);
			HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable9 = new PdfPTable(3);
			int[] headerwidth9 = { 20, 60, 20 };
			HeaderTable9.setWidths(headerwidth9);
			HeaderTable9.setWidthPercentage(95f);
			HeaderTable9.getDefaultCell().setBorder(Rectangle.NO_BORDER);	
			
			
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
				addressPatient +=  (taluka + ",");
			}						
			if (district != "0" && !district.equals("undefined") && !district.equals("")) 
			{
				addressPatient += (district + ",");
			}
			if (state != "0" && !state.equals("undefined") && !state.equals("")) 
			{
				addressPatient += (state + ",");
			}
			// end : patient address
			
			addressPatient=addressPatient.substring(0,addressPatient.length()-1);
			

			//AdminModel adminModel = new AdminModel();
			int printId = 2;
			int numOfPrint = 1;//adminModel.generalAccessNumOfPrint(printId);// to get number of prints

			//loop starts here
					
				/* if (img == null) {
					HeaderTable1.addCell(new Phrase("", header));
				} else {
					HeaderTable1.addCell(cell);
				}
				PdfPCell hospitalNameCell1 = new PdfPCell(new Phrase(
						"\n    " + hospitalName + "\n" + address,
						subheader));
				hospitalNameCell1
						.setHorizontalAlignment(Element.ALIGN_CENTER);
				hospitalNameCell1.setBorder(Rectangle.NO_BORDER);
				HeaderTable1.addCell(hospitalNameCell1);
				HeaderTable1.addCell(new Phrase("", header));
	
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				document.add(HeaderTable1);
				HeaderTable1.flushContent();
	
				HeaderTable1.getDefaultCell().setBorder(
						Rectangle.BOTTOM);
				HeaderTable1
						.addCell(new Phrase("            ", header));
				HeaderTable1
						.addCell(new Phrase("            ", header));
				HeaderTable1.addCell(new Phrase("", header));
				document.add(HeaderTable1);
				HeaderTable1.flushContent(); */
					
					
					
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
			//document.add(HeaderTable1);
			//HeaderTable1.flushContent();

			if (img == null) {
				
				HeaderTable1.addCell(new Phrase("", header));
			} else {
				
				//HeaderTable1.addCell(cell);
				HeaderTable1.addCell(new Phrase("", header));
			}		 
		
			Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
			Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD);
			Phrase p = new Phrase();
			p.add(new Chunk(" "+hospitalName, bold));			
			p.add(new Chunk(" \n\n"+address, tabletext));			
			p.add(new Chunk(" \n"+city+" Pin- "+hospitalZip, tabletext));
			p.add(new Chunk(" \nPhone No. "+hPhoneNo, tabletext));	
			p.add(new Chunk(" \n "+webste+" email: "+email, tabletext));	
			p.add(new Chunk(" \nCIN: "+cinNo, tabletext));	
			p.add(new Chunk(" \nSERVICE TAX NO : "+serviceTaxNo+", PAN No: "+panNo, tabletext));	
			
			PdfPCell hospitalNameCell = new PdfPCell(p);				
			hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
			//HeaderTable1.addCell(hospitalNameCell);
			
			PdfPTable HeaderTableSpace = new PdfPTable(1);
			int[] headerwidthSpace = {40 };
			HeaderTableSpace.setWidths(headerwidthSpace);
			HeaderTableSpace.setWidthPercentage(95f);
			HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTableSpace.setSpacingAfter(60.0f);
			
			HeaderTableSpace.addCell(new Phrase("", tabletext));
			HeaderTableSpace.addCell(new Phrase("", tabletext));
			HeaderTableSpace.addCell(new Phrase("", tabletext));
			HeaderTableSpace.addCell(new Phrase("", tabletext));
			HeaderTableSpace.addCell(new Phrase("", tabletext));
  			document.add(HeaderTableSpace);
  			HeaderTableSpace.flushContent();
			
			/* ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String billPrint = (String) resourceBundle.getObject("billPrint").toString(); */
			
			if (billPrintsHeader.contains("on")) {

				if (billPrint.contains("on")) {

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
			}
			
			PdfPTable HeaderTable2 = new PdfPTable(5);
			int[] headerwidth2 = { 15, 24, 40, 9, 20 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			
			if (billPrintsHeader.contains("off")) {

				HeaderTable2.setSpacingBefore(70f);
			}
			
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable2
					.addCell(new Phrase("", subheader));
			PdfPCell subcell = new PdfPCell(new Phrase("",
					subheader));
			subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
			subcell.setBorder(Rectangle.BOTTOM);
			HeaderTable2.addCell(subcell);
			//HeaderTable2.addCell(new Phrase(""+ReceiptNo,subheader));
			HeaderTable2.addCell(new Phrase("OPD REFUND ", header));
			HeaderTable2.addCell(new Phrase(" ", subheader));
			HeaderTable2.addCell(new Phrase("", subheader));
			//HeaderTable2.addCell(new Phrase("", subheader));
			document.add(HeaderTable2);
			HeaderTable2.flushContent();			

			//Start table for 
			/* RegistrationController regCon=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
            RegTreBillDto rtd = new RegTreBillDto();            
            List<RegTreBillDto> ltPatientRecord = null;
            String PType = "";
            if(regCon != null){
                
            	rtd=regCon.fetchPatientsRecordByTreatmentId(treatId);
                rtd=rtd.getListRegTreBillDto().get(0);
                rtd.getPatientName();
                
                int a=rtd.getSourceTypeId();
                if(a>0){
                    PType="Sponsor";
                }else{
                    PType="Self";                 
                }   
            } */		
            
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
            SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm a");
           	Date now = new Date(new java.util.Date().getTime());
           	String strDate = sdf.format(now);
			String rtime   = sdf2.format(now);
			
			String age2	  =ltRegMasterDto.get(0).getAge2();
			String dob    = ltRegMasterDto.get(0).getDob();
			if(dob.equals("") || dob.equals(null)){
				AgeSexWt = ptage+"    "+gender;
			}
			
			/* if(!docId.equals("") && !docId.contains(",")){
				
				int doctorId = Integer.parseInt(docId);
				if(doctorId > 0){
					docName   = fetchlist.getStringValOfObject("doctor","doc_name",doctorId,"Doctor_ID");
				}
			} */
			docName = ltRegMasterDto.get(0).getConsultingDocName();
			String sName = ltRegMasterDto.get(0).getCategoryName();        
            /* ChargesMasterSlave obj2=regCon.getSponsorRecords(rtd.getSourceTypeId());
            if(rtd.getSourceTypeId()>0){ 
            	
            	sName=obj2.getLstChargesSlave().get(0).getCategoryName();
            } */            
           
            String drName = ltRegMasterDto.get(0).getConsultingDocName();
           // LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
           /*  if(!rtd.getDoctorId().equals("")){
            	
            	 int drId=Integer.parseInt(rtd.getDoctorId());           
                 if(drId > 0){
                 	drName   = fetchlist.getStringValOfObject("doctor","doc_name",drId,"Doctor_ID");
     			}
            }  */           		
            
            // Table3 : For patient header info start
                       
            HeaderTable3.addCell(new Phrase("OPD No. ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+opdipdno,tabletext));
			
			HeaderTable3.addCell(new Phrase("Receipt No. ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+receiptNo,tabletext));
            
			HeaderTable3.addCell(new Phrase("Patient Name ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+pname,tabletext));

			HeaderTable3.addCell(new Phrase("Receipt Date ",subheader));
			HeaderTable3.addCell(new Phrase(" : " +strDate , tabletext));
			
			HeaderTable3.addCell(new Phrase("Address ",subheader));
			HeaderTable3.addCell(new Phrase(" : "+addressPatient,	tabletext));
			
			HeaderTable3.addCell(new Phrase("Receipt Time ",subheader));
			HeaderTable3.addCell(new Phrase(" : " +rtime , tabletext));

			HeaderTable3.addCell(new Phrase("Company Name ",subheader));
			HeaderTable3.addCell(new Phrase(" : " + BillCategoryName, tabletext));
			
			HeaderTable3.addCell(new Phrase("Age/Sex ",	subheader));		
			HeaderTable3.addCell(new Phrase(" : "+ AgeSexWt, tabletext));
			
			HeaderTable3.addCell(new Phrase("", subheader));
			HeaderTable3.addCell(new Phrase("", subheader));
			 
			document.add(HeaderTable3);
			HeaderTable3.flushContent();
			
			// Table3 : For patient header info end				
	
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));

			HeaderTable5.addCell(new Phrase("#", subheader));
			HeaderTable5.addCell(new Phrase("Against Receipt Id", subheader));
			
			HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable5.addCell(new Phrase("Rate ("+currencyCode+")", subheader));
			HeaderTable5.addCell(new Phrase("Qty.", subheader));		
			HeaderTable5.addCell(new Phrase("Amount ("+currencyCode+")", subheader));
			HeaderTable5.addCell(new Phrase("Reduction ("+currencyCode+")",subheader));
			HeaderTable5.addCell(new Phrase("Net Amount ("+currencyCode+")",subheader));

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
			
			double totPayable=0.0;
			double totDic=0.0;
			
			//for (int i = 0; i < lstPojo.get(0).getListBillReceiptSlave().size(); i++) {

				String compName=againstNo;
				double rate=lstPojo.get(0).getTotalAmt();
				double qty=lstPojo.get(0).getTotalQty();
				double amt=lstPojo.get(0).getTotalAmt();
				double consn=lstPojo.get(0).getTotalDisc();
				double paid=lstPojo.get(0).getTotalPaid();
				double netAmt=amt-consn;
				
				double reducn=amt-paid;
				
				totPayable=totPayable+netAmt;
				totDic=totDic+consn;
				
				HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
				HeaderTable5.addCell(new Phrase("" + 1, tabletext));
				HeaderTable5.addCell(new Phrase(""+ compName,tabletext));

				HeaderTable5.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);				
				PdfPCell cell2 = new PdfPCell(new Phrase(""	+rate ,tabletext));
				cell2.setHorizontalAlignment(Element.ALIGN_RIGHT);
				cell2.setBorder(Rectangle.NO_BORDER);
				HeaderTable5.addCell(cell2);

				HeaderTable5.addCell(new Phrase("" + Math.round(qty),tabletext));

				PdfPCell cell3 = new PdfPCell(new Phrase("" +amt, tabletext));
				cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
				cell3.setBorder(Rectangle.NO_BORDER);
				HeaderTable5.addCell(cell3);

				PdfPCell cell4 = new PdfPCell(new Phrase("" + reducn,tabletext));
				cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
				cell4.setBorder(Rectangle.NO_BORDER);
				HeaderTable5.addCell(cell4);

				PdfPCell cell5 = new PdfPCell(new Phrase(""+ netAmt, tabletext));
				cell5.setHorizontalAlignment(Element.ALIGN_RIGHT);
				cell5.setBorder(Rectangle.NO_BORDER);
				HeaderTable5.addCell(cell5);

			//}
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
			
			HeaderTable5.getDefaultCell().setBorder(
					Rectangle.BOTTOM);
			
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
			
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
			
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));

			HeaderTable6.addCell(new Phrase("Payment Mode", subheader));
			HeaderTable6.addCell(new Phrase(""+payMode, tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			
			//HeaderTable6.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable6.addCell(new Phrase("Refund", subheader));
			HeaderTable6.addCell(new Phrase("" + lstPojo.get(0).getTotalPaid(), tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));			
			
			HeaderTable6.addCell(new Phrase("Reduction", subheader));
			HeaderTable6.addCell(new Phrase(""+ lstPojo.get(0).getTotalRemain(), tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			
			HeaderTable6.addCell(new Phrase("Narration", subheader));
			HeaderTable6.addCell(new Phrase(""+ lstPojo.get(0).getRefRemark(), tabletext));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			
			HeaderTable6.addCell(new Phrase("In Words", subheader));
			
			long finalam1 = (long) lstPojo.get(0).getTotalPaid();
			
			String oustandingAmt="";
			
			if(lstPojo.get(0).getTotalPaid() > 0){
				
				oustandingAmt = EnglishNumberToWords.convert(finalam1);
			}else{
				
				oustandingAmt = " Zero Only";
			}			
			
			HeaderTable6.addCell(new Phrase("" + oustandingAmt + "Rs. Only", tabletext));			
			HeaderTable6.addCell(new Phrase("", subheader));		
			
			HeaderTable6.addCell(new Phrase("Refund", subheader));
			PdfPCell cells33 = new PdfPCell(
					new Phrase("       " + paid, subheader));
			cells33.setHorizontalAlignment(Element.ALIGN_CENTER);
			cells33.setBorder(Rectangle.BOX);
			HeaderTable6.addCell(cells33);

			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
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
			
			//Code for Multiple paymode details
					
			String banknmeId ="";
			String cardcheqNo ="";
			String bankName="";
			String batchNo="";
			Date createdDate=lstPojo.get(0).getCreatedDateTime();
			double total_paid= lstPojo.get(0).getTotalPaid();
			if(total_paid <= 0 ){
				total_paid=0;
			}
			
			if(pMode==2 || pMode==3){
				
				banknmeId =lstPojo.get(0).getbName();
				cardcheqNo =lstPojo.get(0).getbNumber();				
				Integer bankid = Integer.parseInt(banknmeId);
				batchNo = lstPojo.get(0).getBatchNumber();
				
				if(!(bankid == null || bankid.equals(""))){
					
					bankName = fetchlist.getStringValOfObject("pharma_bank_master","bank_name",bankid,"bank_id");
				} 				
				if(cardcheqNo == null || cardcheqNo.equals("")){
					
					cardcheqNo="";
				}
			}
			 PdfPTable HeaderTableSpace1 = new PdfPTable(1);
			 	int[] headerwidthSpace1 = {100 };
			 	HeaderTableSpace1.setWidths(headerwidthSpace1);
			 	HeaderTableSpace1.setWidthPercentage(95f);
			 	HeaderTableSpace1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			 	HeaderTableSpace1.setSpacingAfter(5.0f);
			 	HeaderTableSpace1.addCell(new Phrase("", subheader));
			 	document.add(HeaderTableSpace1);
			 	HeaderTableSpace1.flushContent();	
			
			PdfPTable HeaderTable8 = new PdfPTable(6);
			int[] headerwidth8 = { 22, 25, 25, 20, 15, 15 };
			HeaderTable8.setWidths(headerwidth8);
			HeaderTable8.setWidthPercentage(95f);
			HeaderTable8.setSpacingAfter(20f);
			HeaderTable8.getDefaultCell().setBorder(Rectangle.TOP);
			
			if(pMode != -1){
				
				HeaderTable8.addCell(new Phrase("Payment Mode", subheader));
				HeaderTable8.addCell(new Phrase("Bank Name", subheader));
				/* HeaderTable8.addCell(new Phrase("Branch Name", subheader)); */
				HeaderTable8.addCell(new Phrase("Chq/ECS/CardNo", subheader));
				HeaderTable8.addCell(new Phrase("Date", subheader));
				
				HeaderTable8.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
				HeaderTable8.addCell(new Phrase("Amount", subheader));
				HeaderTable8.addCell(new Phrase("Batch No", subheader));				
			}			
		
			if(pMode == -1){
							
				/* for(int i = 0; i < listMultiPay.size(); i++){
					
					HeaderTable8.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					HeaderTable8.addCell(new Phrase(""+listMultiPay.get(i).getPayName(), tabletext));
					HeaderTable8.addCell(new Phrase(""+listMultiPay.get(i).getbName(), tabletext));					
					HeaderTable8.addCell(new Phrase(""+listMultiPay.get(i).getbNumber(), tabletext));
					HeaderTable8.addCell(new Phrase("", tabletext));
					HeaderTable8.addCell(new Phrase(""+listMultiPay.get(i).getTotalPaid(), tabletext));
					HeaderTable8.addCell(new Phrase(""+listMultiPay.get(i).getBatchNumber(), tabletext));				
				} */			
				
			}else{
				
				HeaderTable8.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
				HeaderTable8.addCell(new Phrase(""+payMode, tabletext));
				HeaderTable8.addCell(new Phrase(""+bankName, tabletext));
				/*HeaderTable8.addCell(new Phrase("", tabletext)); */
				HeaderTable8.addCell(new Phrase(""+cardcheqNo, tabletext));
				HeaderTable8.addCell(new Phrase(""+createdDate, tabletext));
				
				HeaderTable8.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
				HeaderTable8.addCell(new Phrase(""+total_paid, tabletext));
				HeaderTable8.addCell(new Phrase(""+batchNo, tabletext));	
				
				HeaderTable8.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			}
			
			document.add(HeaderTable8);
			HeaderTable8.flushContent();			
			
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
			
			HeaderTable4.addCell(new Phrase("Payee Signature",tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));
			//HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			/* 	HeaderTable4.addCell(new Phrase(
							"                       Payee Signature", tabletext)); */
			HeaderTable4.addCell(new Phrase("Authorized Signatory",tabletext));

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
			
			document.add(HeaderTable9);
			HeaderTable9.flushContent();

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
