<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.JSONArray"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.util.List"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.service.TotalCollectionService"%>
<%@page import="com.hms.ehat.dto.IpdCollectionReportDetails"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page trimDirectiveWhitespaces="true"%>

<%@page import="com.hms.pharmacy.upload.FilePath"%>
<%@page import="java.nio.file.Paths"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<%@ page import="java.util.ResourceBundle"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Daily Collection Pdf Report</title>
</head>
<body>
	<%
		Font subheader3 = new Font(Font.FontFamily.HELVETICA, 12,
			Font.BOLD |Font.UNDERLINE);
			Font header2 = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD);

			HttpSession session2 = request.getSession();
			int hospitalUnitId= (Integer) session2.getAttribute("uId");			
			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);
	
			Font header1 = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font tabletext2 = new Font(Font.FontFamily.HELVETICA, 8,
			Font.NORMAL);
			Font subheader2 = new Font(Font.FontFamily.HELVETICA, 8,
			Font.BOLD);
			//int userid = (Integer) session.getAttribute("userId");
			Integer userid = (Integer) session.getAttribute("userId1");
			if(userid==null){
		userid=0;
			}
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String billPrint = (String) resourceBundle.getObject("billPrint").toString();
		

			try {
				DecimalFormat df2 = new DecimalFormat("0.00");
		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		response.setContentType("application/pdf");
		
        Document document = new Document(PageSize.A4.rotate()); // Use rotate() for landscape orientation
		document.setMargins(20, 20, 20, 50);

		//PdfWriter.getInstance(document, outStream);
		PdfWriter writer = PdfWriter.getInstance(document, outStream);
		document.open();

		//font

		Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font subheadertitle = new Font(Font.FontFamily.HELVETICA, 9, Font.BOLD);
		Font subheader = new Font(Font.FontFamily.HELVETICA, 8,
				Font.BOLD, BaseColor.BLACK);
		Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader = new Font(Font.FontFamily.HELVETICA, 10,
				Font.BOLD);
		Font tabletext = new Font(Font.FontFamily.HELVETICA, 8,
				Font.NORMAL);
		Font small = new Font(Font.FontFamily.HELVETICA, 9, Font.NORMAL);

		FontSelector selector = new FontSelector();
		selector.addFont(subheader);

		java.util.Calendar currentDate = Calendar.getInstance();
		SimpleDateFormat dateformatter = new SimpleDateFormat(
				"dd/MM/yyyy hh:mm:ss a");
		String curr_date = dateformatter.format(currentDate.getTime());
		

		int ProductId = 0;
		int count = 1;
		
		 String imgName = hospObj.getFilePath();
	      java.io.File uploadPath = new java.io.File(FilePath.getUPLOADLOGO());
	      String filepath = Paths.get(uploadPath.toString(), imgName).toString();
	      String path1 = filepath;//application.getRealPath(path);


		String hospitalName = hospObj.getHospitalName();
		hospitalName = hospitalName.toUpperCase();
		String address = hospObj.getHospitalAddress();
		String city = hospObj.getHospitalCity();
		String contact = hospObj.getHospitalContact();
		
		String hospitalZip = hospObj.getHospitalZip(); 			
		String PhoneNo   =  hospObj.getHospitalContact();
		String secPhoneNo   =  hospObj.getSecPNo();
		String webste     =   hospObj.getWebsite();
		String email      =   hospObj.getHospitalEmail();
		String cinNo	  =   hospObj.getTxtCinNo();
		String serviceTaxNo	  =   hospObj.getTxtSerTaxNo();
		String panNo	  =   hospObj.getPanNo();
		String hPhoneNo   = PhoneNo+"/"+secPhoneNo;
		
		String nabh = path1; //hospObj.getNabhImagePath(); 
		String nabhLogo =path1; // application.getRealPath(nabh);
		
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
			cellNabh.addElement(new Chunk(imgNabh, 5, -5));
			cellNabh.setBorder(Rectangle.NO_BORDER);
		} catch (Exception e) {
			e.printStackTrace();
		} 
			
		
		
	
		
		
		String spLeafName="";
		String refDocName  ="";
		 String BillCategoryName ="";
		
		document.newPage();
		PdfPTable HeaderTable11 = new PdfPTable(3);
		int[] headerwidth11 = { 40, 70, 12 };
		HeaderTable11.setWidths(headerwidth11);
		HeaderTable11.setWidthPercentage(95f);
		HeaderTable11.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable11.getDefaultCell().setBorder(Rectangle.NO_BORDER);


		
		PdfPTable HeaderTable31 = new PdfPTable(1);
		int[] headerwidth31 = { 120 };
		HeaderTable31.setWidths(headerwidth31);
		HeaderTable31.setWidthPercentage(95f);
		HeaderTable31.getDefaultCell().setBorder(Rectangle.BOTTOM);
		
		PdfPTable HeaderTable4 = new PdfPTable(3);
		int[] headerwidth4 = { 30, 60, 20 };
		HeaderTable4.setWidths(headerwidth4);
		HeaderTable4.setWidthPercentage(95f);
		HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		// Table 1 : For hospital adress details start
		
					PdfPTable HeaderTable12 = new PdfPTable(3);
					int[] headerwidth12 = { 30, 70, 30 };
					HeaderTable12.setWidths(headerwidth12);
					HeaderTable12.setWidthPercentage(95f);
					HeaderTable12.setHorizontalAlignment(Element.ALIGN_CENTER);
					HeaderTable12.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					HeaderTable12.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					document.add(HeaderTable12);
					HeaderTable12.flushContent();
			
					if (img == null) {
						
						HeaderTable12.addCell(new Phrase("", header));
					} else {
						
						HeaderTable12.addCell(cell);
					}	
					
					Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
					Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD,BaseColor.BLACK);
					Phrase p = new Phrase();
					p.add(new Chunk(" "+hospitalName, bold));	
					p.add(new Chunk(" \n", bold));
					p.add(new Chunk(" \n"+address, tabletext));			
					p.add(new Chunk(" "+city+" Pin- "+hospitalZip+"\n", tabletext));
		 							p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
		                            if(!webste.equalsIgnoreCase("")){
					p.add(new Chunk(" \n "+webste, tabletext));
					}
					p.add(new Chunk(" \n "+"email: "+email, tabletext));							//p.add(new Chunk(" \nPAN No : "+panNo , tabletext));	
				//	p.add(new Chunk(" \nCIN: "+cinNo, tabletext));	
				//	p.add(new Chunk(" \nSERVICE TAX NO: "+serviceTaxNo+", PAN No: "+panNo, regular));	
					
					PdfPCell hospitalNameCell = new PdfPCell(p);				
					hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
					hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
					HeaderTable12.addCell(hospitalNameCell);
					
					if(billPrint.contains("on")){
						
						if (img == null) {
							
							HeaderTable12.addCell(new Phrase("", header));
						} else {
							
		//									HeaderTable12.addCell(cellNabh);
						}
					}else{
						
						HeaderTable12.addCell(new Phrase("", header));
					}
					
					
					
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					
					document.add(HeaderTable12);
					HeaderTable12.flushContent();
			
					HeaderTable12.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					HeaderTable12.addCell(new Phrase("", header));
					document.add(HeaderTable12);
					HeaderTable12.flushContent();
					
			 						// Table 1 : For hospital adress details end
			
			
			
			Integer payModeId =Integer.parseInt(request.getParameter("paymode"));
			String fromDate= request.getParameter("fromdatetime");
			String lastDate= request.getParameter("todatetime");
			TotalCollectionService tcs =(ApplicationContextUtils.getApplicationContext()).getBean(TotalCollectionService.class);
			List<IpdCollectionReportDetails> listIpdCollectionReportDetails=tcs.getIpdAllDetails(fromDate, lastDate, payModeId);
			
			
			PdfPTable HeaderTable1 = new PdfPTable(12);
			int[] HeaderWidth1 =  {10,10,13,26,26,70,40,30,20,20,25,20};
			HeaderTable1.setWidths(HeaderWidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			PdfPTable HeaderTable111 = new PdfPTable(11);
			int[] HeaderWidth111 =  {40,40,30,30,50,40,30,50,45,40,30};
			HeaderTable111.setWidths(HeaderWidth111);
			HeaderTable111.setWidthPercentage(95f);
			HeaderTable111.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			
			PdfPTable HeaderTable2 = new PdfPTable(1);
			int[] HeaderWidth2 =  {100};
			HeaderTable2.setWidths(HeaderWidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			
			
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			HeaderTable1.addCell(new Phrase("",tabletext));
			
			 document.add(HeaderTable1);
			 HeaderTable1.flushContent();
			
		   double opdrectotal=0;
		   double totalChecqueAmtOPD=0,totalcardAmtOPD=0,totalnetbankingAmtOPD=0,totalcashAmtOPD=0,totalpaytmAmtOPD=0,totalggoglepayAmtOPD=0,totalphonepeAmtOPD=0,totalrtgsAmtOPD=0,totalcadvanceAmtOPD=0,totalOnlineOPD=0;   
		//////////////////////////////////////////IPD Receipt Collection///////////////////////////////////////////////////////		
		
		         	 if (listIpdCollectionReportDetails != null
			&& listIpdCollectionReportDetails.size() > 0) {

		HeaderTable2.addCell(new Phrase("IPD Receipt Collection",subheader));
		        
			
		
		
			    document.add(HeaderTable2);
			    HeaderTable2.flushContent();
		
		HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
		
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",subheader));
		
		 
		document.add(HeaderTable1);
		HeaderTable1.flushContent();
		
		HeaderTable1.addCell(new Phrase("Sr", subheader));
		HeaderTable1.addCell(new Phrase("Bill No",subheader));
		HeaderTable1.addCell(new Phrase("Receipt No",subheader));
		HeaderTable1.addCell(new Phrase("UHID", subheader));
		HeaderTable1.addCell(new Phrase("DOA", subheader));
		HeaderTable1.addCell(new Phrase("Patient Name", subheader));
		HeaderTable1.addCell(new Phrase("Consultation Name", subheader));
		HeaderTable1.addCell(new Phrase("Receipt Date", subheader));
		HeaderTable1.addCell(new Phrase("Paid Amt", subheader));
		HeaderTable1.addCell(new Phrase("Receipt By", subheader));
		HeaderTable1.addCell(new Phrase("Sponsor Name", subheader));
		HeaderTable1.addCell(new Phrase("Remark", subheader));
		
		
		HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		
		document.add(HeaderTable1);
		HeaderTable1.flushContent();
			 for (int z = 0; z < listIpdCollectionReportDetails.size(); z++) {
		 HeaderTable1.getDefaultCell().setBorder(
			Rectangle.NO_BORDER);
		
		 Date df =(listIpdCollectionReportDetails.get(z).getReceiptDate()); 
		 DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
		 String strDate = dateFormat.format(df);
	 
		 HeaderTable1.addCell(new Phrase(""+ (z + 1),tabletext));
		 HeaderTable1.addCell(new Phrase(""+listIpdCollectionReportDetails.get(z).getBillId(),tabletext));
		 HeaderTable1.addCell(new Phrase(""+listIpdCollectionReportDetails.get(z).getReceiptId(),tabletext));
		 HeaderTable1.addCell(new Phrase(""+listIpdCollectionReportDetails.get(z).getPid(),tabletext));
		 HeaderTable1.addCell(new Phrase(""+listIpdCollectionReportDetails.get(z).getDoa(),tabletext));
		 HeaderTable1.addCell(new Phrase(""+listIpdCollectionReportDetails.get(z).getPatientName(),tabletext));
		 HeaderTable1.addCell(new Phrase(""+listIpdCollectionReportDetails.get(z).getConsultingDoctor(),tabletext));
		 HeaderTable1.addCell(new Phrase(""+strDate,tabletext));
		 HeaderTable1.addCell(new Phrase(""+listIpdCollectionReportDetails.get(z).getPaidAmt(),tabletext));
		 HeaderTable1.addCell(new Phrase(""+listIpdCollectionReportDetails.get(z).getReceiptBy(),tabletext));
		 
		 opdrectotal =  opdrectotal +(+listIpdCollectionReportDetails.get(z).getPaidAmt());
		/*  if(!(dailycollection.getLstOpdReceipt().get(z).getPayMode().trim()).equalsIgnoreCase("CAdvance")){
		  opdrectotal =  opdrectotal +(+dailycollection.getLstOpdReceipt().get(z).getRecAmt());
		 } */
		 HeaderTable1.addCell(new Phrase(""+listIpdCollectionReportDetails.get(z).getSponsorName(),tabletext));
		 HeaderTable1.addCell(new Phrase(""+listIpdCollectionReportDetails.get(z).getRemark(),tabletext));

		 if(!listIpdCollectionReportDetails.get(z).getPaymode().equalsIgnoreCase(null)){
			 
		
		      if(listIpdCollectionReportDetails.get(z).getPaymode().trim().equalsIgnoreCase("Cash")){
		    	
		    	  totalcashAmtOPD=totalcashAmtOPD+listIpdCollectionReportDetails.get(z).getPaidAmt();
		      
		      }
		      if(listIpdCollectionReportDetails.get(z).getPaymode().trim().equalsIgnoreCase("Card")){
		      	
		    	  totalcardAmtOPD=totalcardAmtOPD+listIpdCollectionReportDetails.get(z).getPaidAmt();
		      
		      }
		      
		      if(listIpdCollectionReportDetails.get(z).getPaymode().trim().equalsIgnoreCase("Cheque")){
		        	
		    	  totalChecqueAmtOPD=totalChecqueAmtOPD+listIpdCollectionReportDetails.get(z).getPaidAmt();
		      
		      }
		      
		      if(listIpdCollectionReportDetails.get(z).getPaymode().trim().equalsIgnoreCase("CAdvance")){
		      	
		    	  totalcadvanceAmtOPD=totalcadvanceAmtOPD+listIpdCollectionReportDetails.get(z).getPaidAmt();
		      
		      }
		      
		      if(listIpdCollectionReportDetails.get(z).getPaymode().trim().equalsIgnoreCase("GPay")){
		    	  totalggoglepayAmtOPD=totalggoglepayAmtOPD+(+listIpdCollectionReportDetails.get(z).getPaidAmt());
		      
		      }
		      
		      if(listIpdCollectionReportDetails.get(z).getPaymode().trim().equalsIgnoreCase("Phone Pay")){
		      	
		    	  totalphonepeAmtOPD=totalphonepeAmtOPD+(+listIpdCollectionReportDetails.get(z).getPaidAmt());
		      
		      }
		      
		      
		      if(listIpdCollectionReportDetails.get(z).getPaymode().trim().equalsIgnoreCase("Paytm")){
		        	
		    	  totalpaytmAmtOPD=totalpaytmAmtOPD+(+listIpdCollectionReportDetails.get(z).getPaidAmt());
		      
		      }
		      
		      if(listIpdCollectionReportDetails.get(z).getPaymode().trim().equalsIgnoreCase("RTGS/NEFT")){
		      	
		    	 // totalrtgsAmtOPD =  totalrtgsAmtOPD +(+listIpdCollectionReportDetails.get(z).getPaidAmt()); // add by rahul
		    	  totalrtgsAmtOPD=totalrtgsAmtOPD+listIpdCollectionReportDetails.get(z).getPaidAmt();
		      
		      }
		      
		       if(listIpdCollectionReportDetails.get(z).getPaymode().trim().equalsIgnoreCase("UPI")){
		    	   totalnetbankingAmtOPD=totalnetbankingAmtOPD+(+listIpdCollectionReportDetails.get(z).getPaidAmt());
		}
		 }
		       totalOnlineOPD=totalOnlineOPD+(+listIpdCollectionReportDetails.get(z).getPaidAmt());
		 /*       if(dailycollection.getLstOpdReceipt().get(z).getPayMode().equalsIgnoreCase("Online")){
		    	  totalOnlineOPD=totalOnlineOPD+(+dailycollection.getLstOpdReceipt().get(z).getRecAmt());
		} */
		 
		
		 HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);

			document.add(HeaderTable1);
			HeaderTable1.flushContent(); 

		} 
			    
			
			 
		HeaderTable1.getDefaultCell().setBorder(Rectangle.TOP);
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",subheader));
		HeaderTable1.addCell(new Phrase("",subheader));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("",tabletext));
		HeaderTable1.addCell(new Phrase("\n\n\n",tabletext));
		
		document.add(HeaderTable1);
		HeaderTable1.flushContent();
			 
		
			//	HeaderTable111.getDefaultCell().setBorder(Rectangle.BOTTOM);
		HeaderTable111.addCell(new Phrase(""+" Total Cheque",tabletext));
		HeaderTable111.addCell(new Phrase(""+totalChecqueAmtOPD,tabletext));
		HeaderTable111.addCell(new Phrase(""+"Total Card",tabletext));
		HeaderTable111.addCell(new Phrase(""+totalcardAmtOPD,tabletext));
		HeaderTable111.addCell(new Phrase("Total UPI",tabletext));
		HeaderTable111.addCell(new Phrase(""+totalnetbankingAmtOPD,tabletext));
		HeaderTable111.addCell(new Phrase("Total Cash",tabletext));
		HeaderTable111.addCell(new Phrase(""+totalcashAmtOPD,tabletext));
		HeaderTable111.addCell(new Phrase(""+"Total RTGS",tabletext));
		HeaderTable111.addCell(new Phrase(""+totalrtgsAmtOPD,tabletext));
		HeaderTable111.addCell(new Phrase("\n\n",tabletext));
		
		
		HeaderTable111.addCell(new Phrase("Total CAdvance",tabletext));
		HeaderTable111.addCell(new Phrase(""+totalcadvanceAmtOPD,tabletext));
		HeaderTable111.addCell(new Phrase(""+" Total PhonePay",tabletext));
		HeaderTable111.addCell(new Phrase(""+totalphonepeAmtOPD,tabletext));
		HeaderTable111.addCell(new Phrase("Total GooglePay",tabletext));
		HeaderTable111.addCell(new Phrase(""+totalggoglepayAmtOPD,tabletext));
		HeaderTable111.addCell(new Phrase("Total Paytm",tabletext));
		HeaderTable111.addCell(new Phrase(""+totalpaytmAmtOPD,tabletext));
		
		
		HeaderTable111.addCell(new Phrase("Total",subheader));
		
		HeaderTable111.addCell(new Phrase(""+df2.format(opdrectotal),subheader));
		HeaderTable111.addCell(new Phrase("",tabletext));		
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		HeaderTable111.addCell(new Phrase("",tabletext));
		
		
		document.add(HeaderTable111);
		HeaderTable111.flushContent();
			 
			}
	document.close();
	outStream.close();
	outStream.flush();

	} catch (Exception e) {
	System.err.println(e.getMessage());
	e.printStackTrace();
	}
	%>
</body>
</html>