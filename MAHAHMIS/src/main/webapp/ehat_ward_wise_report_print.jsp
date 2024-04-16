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
<%@page import="com.hms.ehat.dto.DoctorDto"%>
<%@page import="com.hms.ehat.controller.MarkVisitController"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="java.util.ArrayList"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.hisab.model.HisabModel"%>
<%@page import="com.hms.ipdbill.dto.BillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.serviceImpl.BillServiceImpl"%>
<%@page import="com.hms.ipdbill.service.BillService"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%-- <%@ page import="com.hms.dto.HospitalDetails"%> --%>
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
			
			HttpSession session2 = request.getSession();
			int hospitalUnitId= (Integer) session2.getAttribute("uId");
			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			//List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
		    List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);

			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String billPrint = (String) resourceBundle.getObject("billPrint").toString();
			
			 Document document = new Document(PageSize.A4);
			document.setMargins(20, 20, 40, 40); 

			//Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			//document.setMargins(20, 20, 20, 0);
			
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
			Integer docId=Integer.parseInt(request.getParameter("docId"));
			String letter=request.getParameter("letter");			
			Integer hallId=Integer.parseInt(request.getParameter("hallId"));
			Integer hallSlaveId=Integer.parseInt(request.getParameter("hallSlaveId"));
			
			Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
			Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
			
			InventoryNewService inventoryNewService = (ApplicationContextUtils.getApplicationContext()).getBean(InventoryNewService.class);
			List<WardWiseDetaisDto> lstPojo1 = inventoryNewService.getWardWisePatientsDetails(unitId,userId1,hallId,hallSlaveId,docId,fromDate,toDate,letter);
			
			
			
			DecimalFormat df2 = new DecimalFormat("0.00");
			
						
			document.newPage();			
			
		
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
			 
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
			String todays_date = formatter.format(currentDate.getTime());
			
			DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
			Date date = new Date();
			
			
			DateFormat dateFormat1 = new SimpleDateFormat("dd/MM/yyyy");
			Date date1 = new Date();
			
			
			
			PdfPCell cells113 = new PdfPCell(new Phrase("Ward Wise Admit Patient Report As on Date "+todays_date,bold));
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
			 
			PdfPTable HeaderTable5 = new PdfPTable(10);
			int[] headerwidth5 = { 4,8,8,10,14,10,10,10,10,6};
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

			HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable5.addCell(new Phrase("Sr No", subheader));			
			HeaderTable5.addCell(new Phrase("Addmission No", subheader));
			HeaderTable5.addCell(new Phrase("Reg No", subheader));				
			HeaderTable5.addCell(new Phrase("Patient Name.", subheader));
			HeaderTable5.addCell(new Phrase("Bed", subheader));
			HeaderTable5.addCell(new Phrase("Admitted Under", subheader));
			HeaderTable5.addCell(new Phrase("Company Name", subheader));
			HeaderTable5.addCell(new Phrase("Patient Type", subheader));
			HeaderTable5.addCell(new Phrase("Self/Mediclaim", subheader));			
			HeaderTable5.addCell(new Phrase("Total Days", subheader));
					
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
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			
			
			
			

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
			System.out.println("object"+lstPojo1);
			//add Charges id & sponsor name in hashMap
			for (int j = 0; j < lstPojo1.size(); j++) {				
				/* int x = lstPojo1.get(j).getChargesMasterSlaveId();
				String c = lstPojo1.get(j).getCategory_name(); */
				int x = lstPojo1.get(j).getBedHall().length();
				String c = lstPojo1.get(j).getBedHall();
				lst.put(x,c);	
			//	System.err.println("--------------spon---Count------------"+x);
			}
			// System.err.println("--------------spon---Count------------"+lst);
				 int index=0;
				
				for (Map.Entry<Integer,String> entry : lst.entrySet()) {					
				int z=entry.getKey();
				String c=entry.getValue();				
				
				HeaderTable51.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTable51.getDefaultCell().setBorder(Rectangle.TOP);
				HeaderTable51.addCell(new Phrase("Ward Name :", subheader));
				HeaderTable51.addCell(new Phrase(""+c, subheader));
				document.add(HeaderTable51);
				HeaderTable51.flushContent(); 
				
				Integer w = 0;
				String cat = "";
				
		        for (int i = 0; i < lstPojo1.size(); i++) {
		        	
					if(z == lstPojo1.get(i).getBedHall().length()){
						w++;
					   index++;
					 cat=lstPojo1.get(i).getBedHall();
					 if(lstPojo1.get(i).getChargesMasterSlaveId() == 0){
						 selfCount++;
					 }else{
						 mediclaimCount++;
					 }
					 
					 	int sourceId=lstPojo1.get(i).getSourceTypeId();		
						int caseTypeId=lstPojo1.get(i).getCaseType(); 
						String PatientType ="";
						String SelfMediclaim ="";
						if(caseTypeId == 1){
							hospitalCount ++;
							 PatientType ="Hospital";
						}else /* if(caseTypeId == 2) */{
							privateCount ++;
							 PatientType ="Private";
						}
						
						if(sourceId == 0){
							SelfMediclaim ="Self";
						}else {
							SelfMediclaim ="Mediclaim";
						}
					 
					 
						HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						
						HeaderTable5.addCell(new Phrase(""+index, tabletext));
						HeaderTable5.addCell(new Phrase(""+ lstPojo1.get(i).getOpdipdno(),tabletext));
						HeaderTable5.addCell(new Phrase(""+ lstPojo1.get(i).getPatientId(),tabletext));				
						HeaderTable5.addCell(new Phrase(""+ lstPojo1.get(i).getPatientName(),tabletext));
						
						HeaderTable5.addCell(new Phrase(""+lstPojo1.get(i).getBedHall(),tabletext));	
						HeaderTable5.addCell(new Phrase(""+lstPojo1.get(i).getDocNameStr(), tabletext));
						HeaderTable5.addCell(new Phrase(""+lstPojo1.get(i).getCategory_name(), tabletext));
						
						HeaderTable5.addCell(new Phrase(""+ PatientType,tabletext));						
						HeaderTable5.addCell(new Phrase(""+SelfMediclaim,tabletext));
						HeaderTable5.addCell(new Phrase(""+ lstPojo1.get(i).getAddmitDays(),tabletext));
						
						
						
					}
					
					document.add(HeaderTable5);
					HeaderTable5.flushContent(); 					 
		        }
		        HeaderTable511.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		        HeaderTable511.addCell(new Phrase("", subheader));
				HeaderTable511.addCell(new Phrase("", subheader));
				HeaderTable511.addCell(new Phrase(""+c, subheader));
				HeaderTable511.addCell(new Phrase(""+w, subheader));
				document.add(HeaderTable511);
				HeaderTable511.flushContent(); 
		        
		        alll.add(w);
		        CountSpon.add(cat);
				w=0;
				cat="";
				
		     }
				
				Set<Integer> arListt = new HashSet<Integer>();
				HashMap<Integer,String> lstt = new HashMap<Integer,String>();
				//ArrayList al=new ArrayList();
				//HashMap<ArrayList<Integer>,String> sponDetailss = new HashMap<ArrayList<Integer>,String>();
				ArrayList<Integer> allll=new ArrayList<Integer>();
				ArrayList<String> CountSponn=new ArrayList<String>();				
				
			
				//add Charges id & sponsor name in hashMap
				for (int j = 0; j < lstPojo1.size(); j++) {				
					int x = lstPojo1.get(j).getChargesMasterSlaveId();
					String c = lstPojo1.get(j).getCategory_name();
					lstt.put(x, c);	
				}
				
					for (Map.Entry<Integer,String> entryy : lstt.entrySet()) {					
					int zz=entryy.getKey();
					String c=entryy.getValue();	
					
					Integer ww = 0;
					String catt = "";
					
			        for (int i = 0; i < lstPojo1.size(); i++) {
			        	
						if(zz == lstPojo1.get(i).getChargesMasterSlaveId()){
							ww ++;						 
							catt=lstPojo1.get(i).getCategory_name();
						}
									 
			        }
			        //System.err.println("--------------spon---Count------------"+ww);
			        allll.add(ww);
			        CountSponn.add(catt);
					ww=0;
					catt="";
					
			     }
			
				// Paragraph paragraph = new Paragraph();
	            int[] headerwidth61 = {90};
	            DottedLineSeparator lineSeparator1 = new DottedLineSeparator();
	            lineSeparator1.setLineColor(BaseColor.GRAY);
	            lineSeparator1.setGap(3);
	            paragraph.add(lineSeparator);
	            paragraph.setFont(subheader);
	            HeaderTable15.setWidths(headerwidth6);
	            HeaderTable15.setWidthPercentage(95f);
	            HeaderTable15.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	            HeaderTable15.addCell(paragraph);
	           //HeaderTable8.addCell(new Phrase("" + fetchreports.getOTRepordetails().get(j).getCategoryName(), tabletext));
	           document.add(HeaderTable15);
	           HeaderTable15.flushContent();
			
	           PdfPTable HeaderTable111 = new PdfPTable(2);
				int[] headerwidth111 = { 40,10};
				HeaderTable111.setWidths(headerwidth111);
				HeaderTable111.setWidthPercentage(50f);
				HeaderTable111.setHorizontalAlignment(Element.ALIGN_LEFT);
				HeaderTable111.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				
				HeaderTable111.addCell(new Phrase("", subheader));
				HeaderTable111.addCell(new Phrase("", subheader));
				
				HeaderTable111.addCell(new Phrase("", subheader));
				HeaderTable111.addCell(new Phrase("", subheader));
				
				HeaderTable111.addCell(new Phrase("Company Wise Summary :", subheader));
				HeaderTable111.addCell(new Phrase("", subheader));
				
				HeaderTable111.addCell(new Phrase("", subheader));
				HeaderTable111.addCell(new Phrase("", subheader));
				
				HeaderTable111.addCell(new Phrase("", subheader));
				HeaderTable111.addCell(new Phrase("", subheader));
				
				HeaderTable111.addCell(new Phrase("", subheader));
				HeaderTable111.addCell(new Phrase("", subheader));
	           
				document.add(HeaderTable111);
				HeaderTable111.flushContent(); 
			
				
				
				
				PdfPTable HeaderTable114 = new PdfPTable(2);
				int[] headerwidth114 = { 40,10};
				HeaderTable114.setWidths(headerwidth114);
				HeaderTable114.setWidthPercentage(50f);
				HeaderTable114.setHorizontalAlignment(Element.ALIGN_LEFT);
				HeaderTable114.getDefaultCell().setBorder(Rectangle.BOX);
				//HeaderTable114.addCell(new Phrase("Sponsor Type :", subheader));
				//HeaderTable114.addCell(new Phrase("Total Count", subheader));
				
				int totall=0;
					 for (int h = 0; h < CountSponn.size(); h++) {
							 totall=totall+allll.get(h);
						 HeaderTable114.addCell(new Phrase(""+CountSponn.get(h), tabletext));
						//	HeaderTable114.addCell(new Phrase(""+allll.get(h), tabletext));
							PdfPCell cells9 = new PdfPCell(new Phrase(""+allll.get(h), tabletext));
							cells9.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells9.setBorder(Rectangle.BOX);
							HeaderTable114.addCell(cells9);
					 }
				
						 HeaderTable114.addCell(new Phrase("Total :", subheader));
						//HeaderTable114.addCell(new Phrase(""+totall, subheader));
						PdfPCell cells10 = new PdfPCell(new Phrase(""+totall, subheader));
						cells10.setHorizontalAlignment(Element.ALIGN_RIGHT);
						cells10.setBorder(Rectangle.BOX);
						HeaderTable114.addCell(cells10);
						
						HeaderTable114.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						 HeaderTable114.addCell(new Phrase("", subheader));
							HeaderTable114.addCell(new Phrase("", subheader));
							
							 HeaderTable114.addCell(new Phrase("", subheader));
								HeaderTable114.addCell(new Phrase("", subheader));
											
						
						document.add(HeaderTable114);
						HeaderTable114.flushContent();
				
				
						
						HeaderTable111.setHorizontalAlignment(Element.ALIGN_LEFT);
						HeaderTable111.getDefaultCell().setBorder(Rectangle.NO_BORDER);						
						
						HeaderTable111.addCell(new Phrase("", subheader));
						HeaderTable111.addCell(new Phrase("", subheader));						
						HeaderTable111.addCell(new Phrase("", subheader));
						HeaderTable111.addCell(new Phrase("", subheader));						
						HeaderTable111.addCell(new Phrase("Ward Wise Summary :", subheader));
						HeaderTable111.addCell(new Phrase("", subheader));						
						HeaderTable111.addCell(new Phrase("", subheader));
						HeaderTable111.addCell(new Phrase("", subheader));						
						HeaderTable111.addCell(new Phrase("", subheader));
						HeaderTable111.addCell(new Phrase("", subheader));						
						HeaderTable111.addCell(new Phrase("", subheader));
						HeaderTable111.addCell(new Phrase("", subheader));			           
						document.add(HeaderTable111);
						HeaderTable111.flushContent(); 
						
		
			PdfPTable HeaderTable11 = new PdfPTable(2);
			int[] headerwidth11 = { 40,10};
			HeaderTable11.setWidths(headerwidth11);
			HeaderTable11.setWidthPercentage(50f);
			HeaderTable11.setHorizontalAlignment(Element.ALIGN_LEFT);
			HeaderTable11.getDefaultCell().setBorder(Rectangle.BOX);
		//	HeaderTable11.addCell(new Phrase("Sponsor Type :", subheader));
			//HeaderTable11.addCell(new Phrase("Total Count", subheader));
			
			int total=0;
				 for (int h = 0; h < CountSpon.size(); h++) {
						 total=total+alll.get(h);
					 HeaderTable11.addCell(new Phrase(""+CountSpon.get(h), tabletext));
						//HeaderTable11.addCell(new Phrase(""+alll.get(h), tabletext));
						PdfPCell cells9 = new PdfPCell(new Phrase(""+alll.get(h), tabletext));
						cells9.setHorizontalAlignment(Element.ALIGN_RIGHT);
						cells9.setBorder(Rectangle.BOX);
						HeaderTable11.addCell(cells9);
				 }			
					 HeaderTable11.addCell(new Phrase("Total :", subheader));
					//HeaderTable11.addCell(new Phrase(""+total, subheader));
					PdfPCell cells8 = new PdfPCell(new Phrase(""+total, subheader));
					cells8.setHorizontalAlignment(Element.ALIGN_RIGHT);
					cells8.setBorder(Rectangle.BOX);
					HeaderTable11.addCell(cells8);
					
					HeaderTable11.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					 HeaderTable11.addCell(new Phrase("", subheader));
						HeaderTable11.addCell(new Phrase("", subheader));
						
						 HeaderTable11.addCell(new Phrase("", subheader));
							HeaderTable11.addCell(new Phrase("", subheader));										
					
					document.add(HeaderTable11);
					HeaderTable11.flushContent();
					
					
					HeaderTable111.setHorizontalAlignment(Element.ALIGN_LEFT);
					HeaderTable111.getDefaultCell().setBorder(Rectangle.NO_BORDER);						
					
					HeaderTable111.addCell(new Phrase("", subheader));
					HeaderTable111.addCell(new Phrase("", subheader));						
					HeaderTable111.addCell(new Phrase("", subheader));
					HeaderTable111.addCell(new Phrase("", subheader));						
					HeaderTable111.addCell(new Phrase("Self/Mediclaim Wise Summary :", subheader));
					HeaderTable111.addCell(new Phrase("", subheader));						
					HeaderTable111.addCell(new Phrase("", subheader));
					HeaderTable111.addCell(new Phrase("", subheader));						
					HeaderTable111.addCell(new Phrase("", subheader));
					HeaderTable111.addCell(new Phrase("", subheader));						
					HeaderTable111.addCell(new Phrase("", subheader));
					HeaderTable111.addCell(new Phrase("", subheader));			           
					document.add(HeaderTable111);
					HeaderTable111.flushContent(); 
					
					
					PdfPTable HeaderTable112 = new PdfPTable(2);
					int[] headerwidth112 = { 20,10};
					HeaderTable112.setWidths(headerwidth112);
					HeaderTable112.setWidthPercentage(30f);
					HeaderTable112.setHorizontalAlignment(Element.ALIGN_LEFT);
					HeaderTable112.getDefaultCell().setBorder(Rectangle.BOX);
					//HeaderTable112.addCell(new Phrase("Patient Type :", tabletext));
					//HeaderTable112.addCell(new Phrase("Total Count", tabletext));						
					
					int totalCount =selfCount+mediclaimCount;
						 HeaderTable112.addCell(new Phrase("Mediclaim ", tabletext));
						// HeaderTable112.addCell(new Phrase(""+mediclaimCount, tabletext));
						 PdfPCell cells6 = new PdfPCell(new Phrase(""+mediclaimCount, tabletext));
							cells6.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells6.setBorder(Rectangle.BOX);
							HeaderTable112.addCell(cells6);
							
						 HeaderTable112.addCell(new Phrase("Self ", tabletext));
						// HeaderTable112.addCell(new Phrase(""+selfCount, tabletext));
						 PdfPCell cells5 = new PdfPCell(new Phrase(""+selfCount, tabletext));
							cells5.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells5.setBorder(Rectangle.BOX);
							HeaderTable112.addCell(cells5);
							
						 HeaderTable112.addCell(new Phrase("Total :", subheader));
						// HeaderTable112.addCell(new Phrase(""+totalCount, subheader));
						 PdfPCell cells7 = new PdfPCell(new Phrase(""+totalCount, subheader));
							cells7.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells7.setBorder(Rectangle.BOX);
							HeaderTable112.addCell(cells7);
							
					document.add(HeaderTable112);
					HeaderTable112.flushContent();
					
					
					
					HeaderTable111.setHorizontalAlignment(Element.ALIGN_LEFT);
					HeaderTable111.getDefaultCell().setBorder(Rectangle.NO_BORDER);						
					
					HeaderTable111.addCell(new Phrase("", subheader));
					HeaderTable111.addCell(new Phrase("", subheader));						
					HeaderTable111.addCell(new Phrase("", subheader));
					HeaderTable111.addCell(new Phrase("", subheader));						
					HeaderTable111.addCell(new Phrase("Patient Type Wise Summary :", subheader));
					HeaderTable111.addCell(new Phrase("", subheader));						
					HeaderTable111.addCell(new Phrase("", subheader));
					HeaderTable111.addCell(new Phrase("", subheader));						
					HeaderTable111.addCell(new Phrase("", subheader));
					HeaderTable111.addCell(new Phrase("", subheader));						
					HeaderTable111.addCell(new Phrase("", subheader));
					HeaderTable111.addCell(new Phrase("", subheader));			           
					document.add(HeaderTable111);
					HeaderTable111.flushContent(); 
					
					
					PdfPTable HeaderTable115 = new PdfPTable(2);
					int[] headerwidth115 = { 20,10};
					HeaderTable115.setWidths(headerwidth115);
					HeaderTable115.setWidthPercentage(30f);
					HeaderTable115.setHorizontalAlignment(Element.ALIGN_LEFT);
					HeaderTable115.getDefaultCell().setBorder(Rectangle.BOX);
					//HeaderTable112.addCell(new Phrase("Patient Type :", tabletext));
					//HeaderTable112.addCell(new Phrase("Total Count", tabletext));						
					
					int totalCountt =hospitalCount+privateCount;
						 HeaderTable115.addCell(new Phrase("Hospital ", tabletext));
						// HeaderTable112.addCell(new Phrase(""+hospitalCount, tabletext));
						 	PdfPCell cells2 = new PdfPCell(new Phrase(""+hospitalCount, tabletext));
							cells2.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells2.setBorder(Rectangle.BOX);
							HeaderTable115.addCell(cells2);
							
						 HeaderTable115.addCell(new Phrase("Private ", tabletext));
						 //HeaderTable112.addCell(new Phrase(""+privateCount, tabletext));
						 PdfPCell cells3 = new PdfPCell(new Phrase(""+privateCount, tabletext));
							cells3.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells3.setBorder(Rectangle.BOX);
							HeaderTable115.addCell(cells3);
							
						 HeaderTable115.addCell(new Phrase("Total :", subheader));
						// HeaderTable112.addCell(new Phrase(""+totalCountt, subheader));
							PdfPCell cells4 = new PdfPCell(new Phrase(""+totalCountt, subheader));
							cells4.setHorizontalAlignment(Element.ALIGN_RIGHT);
							cells4.setBorder(Rectangle.BOX);
							HeaderTable115.addCell(cells4);
							
					document.add(HeaderTable115);
					HeaderTable115.flushContent();
			
			
						 
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