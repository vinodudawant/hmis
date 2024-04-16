<%@page import="com.hms.ehat.dto.EhatViewPatientSubServiceDetailsIpdDto"%>
<%@page import="com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto"%>
<%@page import="com.hms.ipdbill.service.IpdBillService"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.itextpdf.text.pdf.draw.DottedLineSeparator"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="org.jsoup.Jsoup"%>
<%@page import="com.hms.ipdbill.controller.BillController"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
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
<%-- <%@ page import="com.hms.dto.HospitalDetails"%> --%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.dto.RadiationMaster"%>
<%@ page import="com.hms.model.AdminModel"%>
<%@ page import = "java.util.ResourceBundle" %>

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
<title>Auto DischargeSummaryPrint</title>List<Assessment> arrAssessments = new ArrayList<Assessment>();
</head>
<body>
	<%
		try {

			response.setContentType("application/pdf");
			
			HttpSession session2 = request.getSession();
			int hospitalUnitId= (Integer) session2.getAttribute("uId");			
			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
		  // List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String ShradhhaFlag = (String) resourceBundle.getObject("ShradhhaFlag").toString();
			
			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			
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
			String hospRegNo = hospObj.getHosRegNo();

			String nabh = hospObj.getNabhImagePath(); 
			String nabhLogo = application.getRealPath(nabh);
			
			Image img = null;
			PdfPCell cell = null;
			try {
				img = Image.getInstance(path1);
				img.scaleAbsolute(100, 60);
				cell = new PdfPCell();
				cell.addElement(new Chunk(img, 20, -40));
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
				if(ShradhhaFlag.equalsIgnoreCase("ON"))
				{
					cellNabh.addElement(new Chunk(imgNabh, 20, -40));
				}else{
					cellNabh.addElement(new Chunk(imgNabh, 5, -5));
				}
				cellNabh.setBorder(Rectangle.NO_BORDER);
			} catch (Exception e) {
				e.printStackTrace();
			} 
					
			
			int treatId=Integer.parseInt(request.getParameter("treatID"));	
			String treatIdString=request.getParameter("treatID");		
			NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");
			
			document.newPage();
			
			PdfPTable HeaderTable4 = new PdfPTable(3);
			int[] headerwidth4 = { 30, 60, 20 };
			HeaderTable4.setWidths(headerwidth4);
			HeaderTable4.setWidthPercentage(95f);
			HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			// Table 1 : For hospital adress details start
			
			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 30, 80, 20 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			
			//HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
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
				//HeaderTable1.addCell(new Phrase("", header));
			}		 
			
			Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
			Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD);
			Phrase p = new Phrase();
			p.add(new Chunk(" "+hospitalName, bold));	
			p.add(new Chunk(" \n", bold));
			p.add(new Chunk(" \n"+address, tabletext));			
			p.add(new Chunk(" "+city+" Pin- "+hospitalZip, tabletext));
			p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
			p.add(new Chunk(" \n "+webste+" email: "+email, tabletext));	
			if(!hospRegNo.equalsIgnoreCase("")){
				p.add(new Chunk("\n "+"Hospital RegNo: "+hospRegNo, tabletext));
			    }else{
			    p.add(new Chunk("\n "+"Hospital RegNo: -", tabletext));
				}

			//p.add(new Chunk(" \nCIN: "+cinNo, tabletext));	
			//p.add(new Chunk(" \nSERVICE TAX NO : "+serviceTaxNo+", PAN No: "+panNo, tabletext));	
		//	p.add(new Chunk(" \nPAN No: "+panNo, tabletext));
			
			PdfPCell hospitalNameCell = new PdfPCell(p);				
			hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
			HeaderTable1.addCell(hospitalNameCell);
			
			if (img == null) {
				
				HeaderTable1.addCell(new Phrase("", header));
			} else {
				if(ShradhhaFlag.equalsIgnoreCase("ON"))
				{
					HeaderTable1.addCell(cellNabh);
				}else{
					//HeaderTable1.addCell(cellNabh);
				}	
				
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

			PdfPTable HeaderTable8 = new PdfPTable(2);
			int[] headerwidth8 = { 35, 65 };
			HeaderTable8.setWidths(headerwidth8);
			HeaderTable8.setWidthPercentage(95f);
			HeaderTable8.setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable8.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable8.addCell(new Phrase("  ", header));
			HeaderTable8.addCell(new Phrase("  PATIENT IDENTIFICATION SHEET", header));	
			
			HeaderTable8.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable8.addCell(new Phrase("  ", header));
			HeaderTable8.addCell(new Phrase("", header));	
						
			document.add(HeaderTable8);
			HeaderTable8.flushContent();		
			
 			//new table no 5 start
			RegistrationController uss=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
			RegTreBillDto rtd = new RegTreBillDto();			
			List<RegTreBillDto> ltPatientRecord = null;
			rtd=uss.fetchPatientsRecordByTreatmentId(treatId);
			rtd=rtd.getListRegTreBillDto().get(0);
			
			 RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
				List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
				ltRegMasterDto =us.fetchPatientsRecordByTreatmentId(treatId);
				
				 int sponsorSlave=ltRegMasterDto.get(0).getChargesMasterSlaveId();
			
					LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
					AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
					List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
				 
					
					//Start for bed Name
					IpdBillService fetchServlist=(ApplicationContextUtils.getApplicationContext()).getBean(IpdBillService.class);
					List<EhatViewPatientBedDetailsIpdDto> listBedIpdDto2=fetchServlist.getPatientBedBill(treatId,3);
					//End for bed Name
					
					
					List<EhatViewPatientSubServiceDetailsIpdDto> listSubServiceIpdDto = new ArrayList<EhatViewPatientSubServiceDetailsIpdDto>();
					// For consulting doctors start
					listSubServiceIpdDto = fetchServlist.getPatientServiceBill(treatId,2);
							
					
				 
					
					//String drIds=rtd.getListRegTreBillDto().get(0).getDoctorId();
					String drIds=rtd.getDoctorId();
					//String drIds="1,2,3";
					String drId="";
					String docNames="";
					if(drIds.equalsIgnoreCase(null) || drIds.equalsIgnoreCase("")){
						
						docNames="-";
					}else{
					if(drIds.contains(",")){
						
						String[] dId=drIds.split(",");
						if(dId.length > 0){
							
							for(int n=0; n < dId.length; n++){
								
								docNames=docNames + fetchlist.getStringValOfObject("doctor","doc_name",Integer.parseInt(dId[n]),"Doctor_ID")+", ";
							}		
						}
						
					}else{
						
						drId=drIds;
						docNames=docNames + fetchlist.getStringValOfObject("doctor","doc_name",Integer.parseInt(drId),"Doctor_ID")+", ";

					}
					docNames=docNames.substring(0, docNames.length()-2);
					}
					// For consulting doctors end
					
			
			String BillCategoryName ="";
			if(sponsorSlave > 0){
				fetchsposor   = obj.fetchSuperCatofchargesSlave(sponsorSlave);
				//BillCategoryName =fetchsposor.get(0).getCategoryName()+" Sponsor";
				BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id");

			}else{
				BillCategoryName = "Self";
			}
			
			
			
			// table no 15 start
			
			PdfPTable HeaderTable15 = new PdfPTable(2);
			int[] headerwidth15 = { 30,70};
			HeaderTable15.setWidths(headerwidth15);
			HeaderTable15.setWidthPercentage(95f);		
			
			HeaderTable15.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
			HeaderTable15.addCell(new Phrase("", subheader));
			HeaderTable15.addCell(new Phrase("", tabletext));	
			HeaderTable15.addCell(new Phrase("", subheader));
			HeaderTable15.addCell(new Phrase("", tabletext));	
			
			HeaderTable15.addCell(new Phrase("NAME OF THE PATIENT ", header));
			HeaderTable15.addCell(new Phrase(": "+ rtd.getPatientName(), header));
			
			HeaderTable15.addCell(new Phrase("Ref.by", subheader));
			 HeaderTable15.addCell(new Phrase(": "+ docNames, tabletext));	 
			/* HeaderTable15.addCell(new Phrase(": "+rtd.getDocNameChan(), tabletext)); */
			
			HeaderTable15.addCell(new Phrase("", subheader));
			HeaderTable15.addCell(new Phrase("", tabletext));	
			HeaderTable15.addCell(new Phrase("", subheader));
			HeaderTable15.addCell(new Phrase("", tabletext));	
			
			
			document.add(HeaderTable15);
			HeaderTable15.flushContent();
			
			//End table no 15 
			
			
			// table no 16 start
			
			PdfPTable HeaderTable16 = new PdfPTable(4);
			int[] headerwidth16 = { 25,25,25,25};
			HeaderTable16.setWidths(headerwidth16);
			HeaderTable16.setWidthPercentage(95f);		
			
			HeaderTable16.getDefaultCell().setBorder(Rectangle.BOX);
			HeaderTable16.getDefaultCell().setFixedHeight(30f);
			HeaderTable16.getDefaultCell().getFixedHeight();
		
			
			HeaderTable16.addCell(new Phrase("AGE", subheader));
			/* PdfPCell cells24t = new PdfPCell(new Phrase("AGE", subheader));
			cells24t.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable16.addCell(cells24t); */
			
			
			HeaderTable16.addCell(new Phrase("Gender", subheader));	
			/* PdfPCell cells24 = new PdfPCell(new Phrase("Gender", subheader));
			cells24.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable16.addCell(cells24); */
			
			HeaderTable16.addCell(new Phrase("WEIGHT", subheader));
			/* PdfPCell cells2 = new PdfPCell(new Phrase("WEIGHT", subheader));
			cells2.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable16.addCell(cells2); */
			
			HeaderTable16.addCell(new Phrase("DATE OF ADMISSIOIN", subheader));	
			/* PdfPCell cells4 = new PdfPCell(new Phrase("DATE OF ADMISSIOIN", subheader));
			cells4.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable16.addCell(cells4); */
			
			if(rtd.gettFlag().equals("N") && rtd.getAge3() != null){
			HeaderTable16.addCell(new Phrase(""+ rtd.getAge3(), tabletext));
			}else{
				HeaderTable16.addCell(new Phrase(""+ rtd.getAge(), tabletext));
			}
			/* PdfPCell cells41 = new PdfPCell(new Phrase(""+ rtd.getAge(), tabletext));
			cells41.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable16.addCell(cells41); */
			
			HeaderTable16.addCell(new Phrase(""+ rtd.getGender(), tabletext));
			/* PdfPCell cells42 = new PdfPCell(new Phrase(""+ rtd.getGender(), tabletext));
			cells42.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable16.addCell(cells42); */
			
			HeaderTable16.addCell(new Phrase(""+ rtd.getWeight(), tabletext));
			/* PdfPCell cells43 = new PdfPCell(new Phrase(""+ rtd.getWeight(), tabletext));
			cells43.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable16.addCell(cells43); */
			
			SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss a");
			String CreatedDtTm=dateformatter.format(rtd.getCreatedDateTime());
			
			HeaderTable16.addCell(new Phrase(""+CreatedDtTm , tabletext));
			/* PdfPCell cells44 = new PdfPCell(new Phrase(""+ rtd.getCreatedDateTime(), tabletext));
			cells44.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable16.addCell(cells44); */
			
			
			document.add(HeaderTable16);
			HeaderTable16.flushContent();
			
			//End table no 16 
			
			// table no 17 start
			
			PdfPTable HeaderTable17 = new PdfPTable(4);
			int[] headerwidth17 = { 15,35,15,35};
			HeaderTable17.setWidths(headerwidth17);
			HeaderTable17.setWidthPercentage(95f);		
			
			HeaderTable17.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
			
			HeaderTable17.addCell(new Phrase("", subheader));
			HeaderTable17.addCell(new Phrase("", tabletext));	
			HeaderTable17.addCell(new Phrase("", subheader));
			HeaderTable17.addCell(new Phrase("", tabletext));	
			
			HeaderTable17.addCell(new Phrase("", subheader));
			HeaderTable17.addCell(new Phrase("", tabletext));	
			HeaderTable17.addCell(new Phrase("", subheader));
			HeaderTable17.addCell(new Phrase("", tabletext));	
			
			
			HeaderTable17.addCell(new Phrase("REG. NO.:", header));
			HeaderTable17.addCell(new Phrase(" ", header));
			
			
			HeaderTable17.addCell(new Phrase("DR'S UNIT :", header));
			HeaderTable17.addCell(new Phrase(" ", tabletext));
			
			HeaderTable17.addCell(new Phrase("", subheader));
			HeaderTable17.addCell(new Phrase("", tabletext));	
			HeaderTable17.addCell(new Phrase("", subheader));
			HeaderTable17.addCell(new Phrase("", tabletext));
			
			HeaderTable17.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable17.addCell(new Phrase("", subheader));
			HeaderTable17.addCell(new Phrase("", tabletext));	
			HeaderTable17.addCell(new Phrase("", subheader));
			HeaderTable17.addCell(new Phrase("", tabletext));
			
			HeaderTable17.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable17.addCell(new Phrase("", subheader));
			HeaderTable17.addCell(new Phrase("", tabletext));	
			HeaderTable17.addCell(new Phrase("", subheader));
			HeaderTable17.addCell(new Phrase("", tabletext));
			
			HeaderTable17.addCell(new Phrase("", subheader));
			HeaderTable17.addCell(new Phrase("", tabletext));	
			HeaderTable17.addCell(new Phrase("", subheader));
			HeaderTable17.addCell(new Phrase("", tabletext));
			
			HeaderTable17.addCell(new Phrase("DIAGNOSIS :", header));
			HeaderTable17.addCell(new Phrase("", tabletext));	
			HeaderTable17.addCell(new Phrase("", subheader));
			HeaderTable17.addCell(new Phrase("", tabletext));
			
			HeaderTable17.addCell(new Phrase("", subheader));
			HeaderTable17.addCell(new Phrase("", tabletext));	
			HeaderTable17.addCell(new Phrase("", subheader));
			HeaderTable17.addCell(new Phrase("", tabletext));
			
			HeaderTable17.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable17.addCell(new Phrase("", subheader));
			HeaderTable17.addCell(new Phrase("", tabletext));	
			HeaderTable17.addCell(new Phrase("", subheader));
			HeaderTable17.addCell(new Phrase("", tabletext));
			
			document.add(HeaderTable17);
			HeaderTable17.flushContent();
			
			//End table no 15 
			
			
			/* 
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
			
			HeaderTable5.addCell(new Phrase("Patient Name", subheader));
			HeaderTable5.addCell(new Phrase(": "+ rtd.getPatientName(), tabletext));
			HeaderTable5.addCell(new Phrase("Bill No.", subheader));
			HeaderTable5.addCell(new Phrase(": "+ rtd.getBillId(), tabletext));
			
			HeaderTable5.addCell(new Phrase("IPD No.", subheader));
			HeaderTable5.addCell(new Phrase(": "+ rtd.getOpdipdno(), tabletext));	
			HeaderTable5.addCell(new Phrase("Admission Date", subheader));
			HeaderTable5.addCell(new Phrase(": "+ rtd.getCreatedDateTime(), tabletext));
						
			HeaderTable5.addCell(new Phrase("Sponser", subheader));
			HeaderTable5.addCell(new Phrase(": "+BillCategoryName, tabletext));			
			HeaderTable5.addCell(new Phrase("P.A.No.", subheader));
			HeaderTable5.addCell(new Phrase(": ", tabletext));
			
			HeaderTable5.addCell(new Phrase("Ward", subheader));
			HeaderTable5.addCell(new Phrase(": "+listBedIpdDto2.get(0).getBedHall(), tabletext));			
			HeaderTable5.addCell(new Phrase("Doctor Name", subheader));
			HeaderTable5.addCell(new Phrase(": "+docNames, tabletext));			
			
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable5.addCell(new Phrase("", subheader));
			HeaderTable5.addCell(new Phrase("", subheader));
			HeaderTable5.addCell(new Phrase("", subheader));
			HeaderTable5.addCell(new Phrase("", subheader));
			
			//HeaderTable5.addCell(new Phrase("Date : ", subheader));
			//HeaderTable5.addCell(new Phrase(""+ rtd.getCreatedDateTime(), subheader));
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
			 */
			//End table no 5 start
			
		
			
		
			
			
			
			
	
			
			//footer start			
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
			
			HeaderTable4.addCell(new Phrase("                       ",tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));
			//HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			/* 	HeaderTable4.addCell(new Phrase(
							"                       Payee Signature", tabletext)); */
			HeaderTable4.addCell(new Phrase("",
					tabletext));

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