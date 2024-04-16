<%@page import="java.util.ResourceBundle"%>
<%@page import="java.util.HashSet"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Set"%>
<%@page import="com.hms.ehat.dto.WardWiseDetaisDto"%>
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
<%@page import="com.hms.laundry.service.LaundryService"%> 
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
<%@ page import="com.hms.laundry.dto.LaundryLinenMasterDTO"%> 
<%@ page import="com.hms.dto.HospitalDetails"%>
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
			System.err.println("Running ..........");
			response.setContentType("application/pdf");
			//List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails.getHospDetails("0");
			//HospitalDetails hospObj = arrHospitalDetails.get(0);

			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String billPrint = (String) resourceBundle.getObject("billPrint").toString();
			
			 Document document = new Document(PageSize.LEGAL.rotate());
			document.setMargins(20, 20, 20, 0); 

			//Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			//document.setMargins(20, 20, 20, 0);
			
			PdfWriter.getInstance(document, outStream);
			document.open();
		
			/* -------------------- Define Fonts ---------------------------  */			
			Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font subheader = new Font(Font.FontFamily.HELVETICA, 9, Font.BOLD);
			Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
			header.setColor(10, 4, 2);

			Font tableheader = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font tabletext = new Font(Font.FontFamily.HELVETICA, 11, Font.NORMAL);
			Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
			/* -------------------- Define Fonts ---------------------------  */
			
			session = request.getSession();
			String user_name = (String) session.getAttribute("userName");
			
			/* 
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
			String nabhLogo = application.getRealPath(nabh); */
			
			Image img = null;
			PdfPCell cell = null;
			try {
				//img = Image.getInstance(path1);
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
			//	imgNabh = Image.getInstance(nabhLogo);
				imgNabh.scaleAbsolute(80, 60);
				cellNabh = new PdfPCell();
				cellNabh.addElement(new Chunk(imgNabh, 5, -5));
				cellNabh.setBorder(Rectangle.NO_BORDER);
			} catch (Exception e) {
				e.printStackTrace();
			} 
			
			/* int unitId=Integer.parseInt(request.getParameter("unitId"));
			int userId=Integer.parseInt(request.getParameter("userId")); */
			String fromDate=request.getParameter("fromDate");
			String toDate=request.getParameter("toDate");
			/* Integer docId=Integer.parseInt(request.getParameter("docId"));
			String letter=request.getParameter("letter");			
			Integer hallId=Integer.parseInt(request.getParameter("hallId"));
			Integer hallSlaveId=Integer.parseInt(request.getParameter("hallSlaveId")); */
			
			Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
			Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
			
			LaundryService inventoryNewService = (ApplicationContextUtils.getApplicationContext()).getBean(LaundryService.class);
			List<LaundryLinenMasterDTO> lstPojo1 = inventoryNewService.getLnlReport(fromDate,toDate);
			
			
			
			DecimalFormat df2 = new DecimalFormat("0.00");
			
						
			document.newPage();			
			
		
					// Table 1 : For hospital adress details start
			
			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 30, 70, 30 };
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
			/* p.add(new Chunk(" "+hospitalName, bold));			
			p.add(new Chunk(" \n"+address, regular));			
			p.add(new Chunk(" \n"+city+" Pin- "+hospitalZip, regular));
			p.add(new Chunk(" \nPhone No. "+hPhoneNo, tabletext));	
			p.add(new Chunk(" \n "+webste+" email: "+email, regular));	
			/* p.add(new Chunk(" \nCIN: "+cinNo, regular));	
			p.add(new Chunk(" \nCIN: "+serviceTaxNo+", PAN No: "+panNo, regular));*/
			//p.add(new Chunk(" \nPAN No: "+panNo, regular)); 
			
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
			 
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
			String todays_date = formatter.format(currentDate.getTime());
			
			DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
			Date date = new Date();
			
			
			DateFormat dateFormat1 = new SimpleDateFormat("dd/MM/yyyy");
			Date date1 = new Date();
			
			
			
			PdfPCell cells113 = new PdfPCell(new Phrase("Laundry Register "+todays_date,bold));
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
			
			
			
			
			
			PdfPTable HeaderTable51 = new PdfPTable(2);
				int[] headerwidth51 = { 5,50};
				HeaderTable51.setWidths(headerwidth51);
				HeaderTable51.setWidthPercentage(95f);
				
				PdfPTable HeaderTable511 = new PdfPTable(2);
				int[] headerwidth511 = { 20,80};
				HeaderTable511.setWidths(headerwidth511);
				HeaderTable511.setWidthPercentage(95f);
			
			
			
			
			
			 
			 // Table5 : For service details head start
			 
			PdfPTable HeaderTable5 = new PdfPTable(13);
			int[] headerwidth5 = {4,8,8,7,7,7,7,7,7,7,7,7,7};
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
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));

			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOX);
			HeaderTable5.addCell(new Phrase("Sr No", subheader));			
			HeaderTable5.addCell(new Phrase("Date", subheader));
			HeaderTable5.addCell(new Phrase("Description Of Linen", subheader));				
			HeaderTable5.addCell(new Phrase("Qty Given.", subheader));
			HeaderTable5.addCell(new Phrase("Sign Ward", subheader));
			HeaderTable5.addCell(new Phrase("Qty Received", subheader));
			HeaderTable5.addCell(new Phrase("Sign Laundry", subheader));
			HeaderTable5.addCell(new Phrase("Qty Received", subheader));
			HeaderTable5.addCell(new Phrase("Sign Ward", subheader));			
			HeaderTable5.addCell(new Phrase("Balance Qty", subheader));
			HeaderTable5.addCell(new Phrase("Sign Laundry", subheader));
			HeaderTable5.addCell(new Phrase("Balance Received", subheader));
			HeaderTable5.addCell(new Phrase("Sign Ward", subheader));
					
			document.add(HeaderTable5);
			HeaderTable5.flushContent();

			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

/* 			HeaderTable5.addCell(new Phrase("", tabletext));
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
			HeaderTable5.addCell(new Phrase("", tabletext)); */
			
			
			
			

			Set<Integer> arList = new HashSet<Integer>();
			HashMap<Integer,String> lst = new HashMap<Integer,String>();
			//ArrayList al=new ArrayList();
			HashMap<ArrayList<Integer>,String> sponDetails = new HashMap<ArrayList<Integer>,String>();
			ArrayList<Integer> alll=new ArrayList<Integer>();
			ArrayList<String> CountSpon=new ArrayList<String>();
			
			
			
			Integer selfCount = 0;
			Integer mediclaimCount = 0;
			Integer hospitalCount = 0;
			Integer privateCount = 0;
			//add Charges id & sponsor name in hashMap
						
	
			// System.err.println("--------------spon---Count------------"+lst);
				 int index=1;
				
				 for (int j = 0; j < lstPojo1.size(); j++) {						
							
				Date datetime=lstPojo1.get(0).getCreatedDate();
				HeaderTable51.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTable51.getDefaultCell().setBorder(Rectangle.TOP);
				/* HeaderTable51.addCell(new Phrase("Ward Name :", subheader));
				HeaderTable51.addCell(new Phrase(""+c, subheader)); */
				document.add(HeaderTable51);
				HeaderTable51.flushContent(); 
				
				Integer w = 0;
				String cat = "";
				
		        for (int i = 0; i < lstPojo1.get(j).getLtlandlSlave().size(); i++) {
		        	
		        	
		        	Date datetime1=lstPojo1.get(j).getCreatedDate();
		        	//System.out.println("datetime1>>>>>>"+datetime);
					 
						HeaderTable5.getDefaultCell().setBorder(Rectangle.BOX);
						
						HeaderTable5.addCell(new Phrase(""+index, tabletext));
						HeaderTable5.addCell(new Phrase(""+datetime ,tabletext));
						HeaderTable5.addCell(new Phrase(""+ lstPojo1.get(j).getLtlandlSlave().get(i).getItemName(),tabletext));	
						
						HeaderTable5.addCell(new Phrase(""+ lstPojo1.get(j).getLtlandlSlave().get(i).getSendQty(),tabletext));
						HeaderTable5.addCell(new Phrase("          ",tabletext));
						
						HeaderTable5.addCell(new Phrase(""+lstPojo1.get(j).getLtlandlSlave().get(i).getRecievedQty(),tabletext));
						HeaderTable5.addCell(new Phrase("          ",tabletext));
						
						HeaderTable5.addCell(new Phrase(""+lstPojo1.get(j).getLtlandlSlave().get(i).getTotalRecievedQty(),tabletext));
						HeaderTable5.addCell(new Phrase("          ",tabletext));
						
						HeaderTable5.addCell(new Phrase(""+lstPojo1.get(j).getLtlandlSlave().get(i).getPendingQtyLnl(),tabletext));
						HeaderTable5.addCell(new Phrase("          ",tabletext));
						
						HeaderTable5.addCell(new Phrase(""+lstPojo1.get(j).getLtlandlSlave().get(i).getRecievedQtySubDept(),tabletext));
						HeaderTable5.addCell(new Phrase("          ",tabletext));
						
				/* 		HeaderTable5.addCell(new Phrase(""+lstPojo1.get(i).getDocNameStr(), tabletext));
						HeaderTable5.addCell(new Phrase(""+lstPojo1.get(i).getCategory_name(), tabletext));
						
						HeaderTable5.addCell(new Phrase(""+ PatientType,tabletext));						
						HeaderTable5.addCell(new Phrase(""+SelfMediclaim,tabletext));
						HeaderTable5.addCell(new Phrase(""+ lstPojo1.get(i).getAddmitDays(),tabletext)); */
						
						
						
					}
					
					document.add(HeaderTable5);
					HeaderTable5.flushContent(); 
					index++;
		        }
		        
	 
			document.add(HeaderTable5);
			HeaderTable5.flushContent(); 
			
						
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