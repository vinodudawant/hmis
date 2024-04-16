<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.ehat.dto.SponsorSummaryDetailsDto"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Set"%>
<%@page import="java.util.HashSet"%>
<%@page import="com.hms.ehat.dto.DischargeAllPatientsDto"%>
<%@page import="com.hms.ehat.service.InventoryNewService"%>
<%@page import="com.itextpdf.text.pdf.draw.DottedLineSeparator"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.ehat.dto.BillRegReportDTO"%>
<%@page import="com.hms.ehat.dto.OpdDiagnoRecReportDTO"%>
<%@page import="com.hms.ehat.dto.OpdDiagnoReportDTO"%>
<%@page import="com.hms.ehat.service.FinanceService"%>
<%@page import="com.hms.ehat.dto.RegistrationOtherDto"%>
<%@page import="com.hms.ehat.service.OtherBillingService"%>
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
<%@page import="com.hms.ipdbill.serviceImpl.BillServiceImpl"%>
<%@page import="com.hms.ipdbill.service.BillService"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.dto.RadiationMaster"%>
<%@ page import="com.hms.model.AdminModel"%>

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
<title>Other Bill Receipt PDf</title>
</head>
<body>
	<%
		try {

			response.setContentType("application/pdf");
			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);

			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String billPrint = (String) resourceBundle.getObject("billPrint").toString();
			
			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			
			/*  Document document = new Document(PageSize.LEGAL.rotate());
			document.setMargins(20, 20, 20, 0); */ 

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
				cell.addElement(new Chunk(img, 5, -40));
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
			
			/* int unitId=Integer.parseInt(request.getParameter("unitId"));
			int userId=Integer.parseInt(request.getParameter("userId")); */
			String fromDate=request.getParameter("fromDate");
			String toDate=request.getParameter("toDate");
			String typeOf=request.getParameter("typeOf");
			String letter=request.getParameter("letter");			
			int chargesId=Integer.parseInt(request.getParameter("chargesId"));
			int chargesSlaveId=Integer.parseInt(request.getParameter("chargesSlaveId"));
			
			Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
			Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
			
			InventoryNewService inventoryNewService = (ApplicationContextUtils.getApplicationContext()).getBean(InventoryNewService.class);
			List<SponsorSummaryDetailsDto> lstPojo1 = inventoryNewService.getSponsorSummaryDetails(unitId,userId1,chargesId,chargesSlaveId,typeOf,fromDate,toDate,letter);
			
			DecimalFormat df2 = new DecimalFormat("0.0");
			
						
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
			Font bold = new Font(FontFamily.TIMES_ROMAN, 12, Font.BOLD);
			Phrase p = new Phrase();
			p.add(new Chunk(" "+hospitalName, bold));			
			p.add(new Chunk(" \n\n"+address, tabletext));			
			p.add(new Chunk(" "+city+" Pin- "+hospitalZip, tabletext));
			p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
			p.add(new Chunk(" \n "+webste+" email: "+email, tabletext));
			if (cinNo.equalsIgnoreCase("-")) {
				
			}else{
				p.add(new Chunk(" \nCIN: " + cinNo, tabletext));
			}
			if (serviceTaxNo.equalsIgnoreCase("-")) {
				
			}else{
				p.add(new Chunk(" \nService Tax: " + serviceTaxNo, tabletext));
			}
			if (panNo.equalsIgnoreCase("-")) {
				
			}else{
				p.add(new Chunk( ", PAN No: " + panNo, tabletext));
			}	
			
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

			HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			// Table 1 : For hospital adress details end
					
			
			
			
			 // Table15 : For service details head start
			 
			PdfPTable HeaderTable15 = new PdfPTable(1);
			int[] headerwidth15 = { 100 };
			HeaderTable15.setWidths(headerwidth15);
			HeaderTable15.setWidthPercentage(95f);
			HeaderTable15.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			 
			
			PdfPCell cells113 = new PdfPCell(new Phrase("Sponsor Summary",bold));
			cells113.setHorizontalAlignment(Element.ALIGN_CENTER);
			cells113.setBorder(Rectangle.NO_BORDER);
			HeaderTable15.addCell(cells113);
			
			//PdfPTable HeaderTable88 = new PdfPTable(1);
            Paragraph paragraph = new Paragraph();
            int[] headerwidth6 = {90};
            DottedLineSeparator lineSeparator = new DottedLineSeparator();
            lineSeparator.setLineColor(BaseColor.GRAY);
            lineSeparator.setGap(3);
            paragraph.add(lineSeparator);
            paragraph.setFont(subheader);
            HeaderTable15.setWidths(headerwidth6);
            HeaderTable15.setWidthPercentage(95f);
            HeaderTable15.getDefaultCell().setBorder(Rectangle.NO_BORDER);
            HeaderTable15.addCell(paragraph);
           //HeaderTable8.addCell(new Phrase("" + fetchreports.getOTRepordetails().get(j).getCategoryName(), tabletext));
           document.add(HeaderTable15);
           HeaderTable15.flushContent();
           
			 // Table15 : For service details head End
			
			 
			PdfPTable HeaderTable115 = new PdfPTable(1);
			int[] headerwidth115 = { 100};
			HeaderTable115.setWidths(headerwidth115);
			HeaderTable115.setWidthPercentage(95f);
			HeaderTable115.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable115.addCell(new Phrase("", tabletext));
			/* HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			 */
			HeaderTable115.addCell(new Phrase("To,", subheader));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			
			HeaderTable115.addCell(new Phrase("Sub : Submission of Medical Treatment Bills From "+fromDate+" To "+toDate, subheader));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("Dear Sir,", subheader));
			
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("Please find attached herewith medical treatment Bills of Cancer Patients reffered by CMS Railway Hospital,", subheader));
			
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			HeaderTable115.addCell(new Phrase("", tabletext));
			
			document.add(HeaderTable115);
			HeaderTable115.flushContent(); 
			
			 // Table5 : For service details head start
			  
			 
			PdfPTable HeaderTable5 = new PdfPTable(9);
			int[] headerwidth5 = { 5,15,20,20,15,15,15,15,15};
			HeaderTable5.setWidths(headerwidth5);
			HeaderTable5.setWidthPercentage(95f);
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
			

			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOX);
			HeaderTable5.addCell(new Phrase("Sr No", subheader));	
			HeaderTable5.addCell(new Phrase("Reg.No.", subheader));			
			HeaderTable5.addCell(new Phrase("Name of Patient", subheader));
			HeaderTable5.addCell(new Phrase("Diagnostic", subheader));
			HeaderTable5.addCell(new Phrase("DOA", subheader));
			HeaderTable5.addCell(new Phrase("DOD", subheader));
			HeaderTable5.addCell(new Phrase("Bill NO & Date", subheader));
			
			PdfPCell cells61 = new PdfPCell(new Phrase("Amount (Rs.)", subheader));
			cells61.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cells61.setBorder(Rectangle.BOX);
			HeaderTable5.addCell(cells61);
			
			PdfPCell cells161 = new PdfPCell(new Phrase("Total Amount incurred upto", subheader));
			cells161.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cells161.setBorder(Rectangle.BOX);
			HeaderTable5.addCell(cells161);
			//HeaderTable5.addCell(new Phrase("Amount(Rs.)", subheader));
			

			
			int index=0;
			double amount=0.0;
			
		         for (int i = 0; i < lstPojo1.size(); i++) {
		        	
		        	 DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		        	 Date df =(lstPojo1.get(i).getCreatedDateTime());   // added by sandip
					 String strDate = dateFormat.format(df);
		        	 
					 String date ="";
					 String disdate=lstPojo1.get(i).getDischargeDate();
					 System.out.println(disdate);
		        	 if(!disdate.equals("-") || disdate.equals(null)){
						 String space[]=lstPojo1.get(i).getDischargeDate().split(" ");
						 String a1=space[0];
						 String a[]=a1.split("-");
						 System.out.println(a);
						 date = a[2] +"/"+a[1]+"/"+a[0]+" "+space[1];
		        	 }
		        	 else{
		        		   date = "-";
		        	 }
					
		        	 index++;
		        	 amount=amount + lstPojo1.get(i).getAmount();
					 
						HeaderTable5.getDefaultCell().setBorder(Rectangle.BOX);
						HeaderTable5.addCell(new Phrase(""+index, tabletext));
						HeaderTable5.addCell(new Phrase(""+ lstPojo1.get(i).getOpdipdno(),tabletext));				
						
						HeaderTable5.addCell(new Phrase(""+ lstPojo1.get(i).getPatientName(),tabletext));
						
						if(lstPojo1.get(i).getDignoName().equalsIgnoreCase("-")){
							PdfPCell cells611 = new PdfPCell(new Phrase(""+ lstPojo1.get(i).getDignoName(), tabletext));
							cells611.setHorizontalAlignment(Element.ALIGN_CENTER);
							cells611.setBorder(Rectangle.BOX);
							HeaderTable5.addCell(cells611);
						}else{
							HeaderTable5.addCell(new Phrase(""+ lstPojo1.get(i).getDignoName(), tabletext));
						}
						
						
						HeaderTable5.addCell(new Phrase(""+ strDate,tabletext));						
						HeaderTable5.addCell(new Phrase(""+ date, tabletext));
						
						HeaderTable5.addCell(new Phrase(""+lstPojo1.get(i).getBillId()+"-"+strDate ,tabletext));
						
						PdfPCell cells6 = new PdfPCell(new Phrase(""+lstPojo1.get(i).getAmount(), subheader));
						cells6.setHorizontalAlignment(Element.ALIGN_RIGHT);
						cells6.setBorder(Rectangle.BOX);
						HeaderTable5.addCell(cells6);
						
						PdfPCell cells16 = new PdfPCell(new Phrase(""+lstPojo1.get(i).getTotAmount(), subheader));
						cells16.setHorizontalAlignment(Element.ALIGN_RIGHT);
						cells16.setBorder(Rectangle.BOX);
						HeaderTable5.addCell(cells16);
						//HeaderTable5.addCell(new Phrase(""+lstPojo1.get(i).getAmount() ,tabletext));
						
						} 
		        	 HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
		        	 HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("", tabletext));
					long finalam = (long) amount;
					df2.format(finalam);
					
					HeaderTable5.addCell(new Phrase("Grand Total", subheader));
					
					PdfPCell cells6 = new PdfPCell(new Phrase(""+df2.format(amount), subheader));
					cells6.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells6.setBorder(Rectangle.BOX);
					HeaderTable5.addCell(cells6);
					HeaderTable5.addCell(new Phrase("", tabletext));
					
					
					
					String oustandingAmt=EnglishNumberToWords.convert(finalam);;					
						
						
					
					//HeaderTable5.addCell(new Phrase(""+amount, tabletext));
					
					
					document.add(HeaderTable5);
					HeaderTable5.flushContent(); 					 
		        
		
					HeaderTable115.addCell(new Phrase("", tabletext));
					HeaderTable115.addCell(new Phrase("", tabletext));
					HeaderTable115.addCell(new Phrase("Rupees ("+oustandingAmt+" )", subheader));
					
					
					HeaderTable115.addCell(new Phrase("", tabletext));
					HeaderTable115.addCell(new Phrase("", tabletext));
					HeaderTable115.addCell(new Phrase("", tabletext));
					
					HeaderTable115.addCell(new Phrase("You are requested to kindly release payment at your earliest.", tabletext));
					HeaderTable115.addCell(new Phrase("", tabletext));
					HeaderTable115.addCell(new Phrase("", tabletext));
					HeaderTable115.addCell(new Phrase("", tabletext));
					
					HeaderTable115.addCell(new Phrase("Thanking You,", tabletext));
					//HeaderTable115.addCell(new Phrase("", tabletext));
					
					HeaderTable115.addCell(new Phrase("Yours Faithfully,", tabletext));
					HeaderTable115.addCell(new Phrase("For Jawaharlal Nehru ", tabletext));
					HeaderTable115.addCell(new Phrase("and Research Centre", tabletext));
			
			
					HeaderTable115.addCell(new Phrase("", tabletext));
					HeaderTable115.addCell(new Phrase("", tabletext));
					HeaderTable115.addCell(new Phrase("", tabletext));
					HeaderTable115.addCell(new Phrase("", tabletext));
					HeaderTable115.addCell(new Phrase("", tabletext));
					HeaderTable115.addCell(new Phrase("", tabletext));
					HeaderTable115.addCell(new Phrase("", tabletext));
					HeaderTable115.addCell(new Phrase("", tabletext));
					HeaderTable115.addCell(new Phrase("", tabletext));
					HeaderTable115.addCell(new Phrase("", tabletext));
					HeaderTable115.addCell(new Phrase("", tabletext));
					
					
					HeaderTable115.addCell(new Phrase("( "+user_name+" )", subheader));
					HeaderTable115.addCell(new Phrase("Head-Finance & Accounts", subheader));
					
						
					document.add(HeaderTable115);
					HeaderTable115.flushContent();
					
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