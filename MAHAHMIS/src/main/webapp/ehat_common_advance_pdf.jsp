<%@page import="com.hms.ehat.dto.CommonadvDto"%>
<%@page import="com.hms.dto.CommonAdvanceDTO"%>
<%@page import="com.hms.ehat.dto.CommanadvrecordDTO"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.ipdbill.dto.BillRefundMasterDTO"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
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
<title>OPD Receipt</title>
</head>
<body>
	<%

	String sql = null;
	
	
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
			
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			document.setMargins(20, 20, 20, 50);

			PdfWriter.getInstance(document, outStream);
			document.open();
			//font

			System.err.println("before image");
			
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
			
			DecimalFormat df2 = new DecimalFormat("0.00");

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
				cellNabh.addElement(new Chunk(imgNabh, 5, -5));
				cellNabh.setBorder(Rectangle.NO_BORDER);
			} catch (Exception e) {
				e.printStackTrace();
			} 					
			
			BillService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(BillService.class);	
			
			List<BillReceiptMasterDTO> lstPojo = new ArrayList<BillReceiptMasterDTO>();	
			List<BillRefundMasterDTO> lstRefPojo = new ArrayList<BillRefundMasterDTO>();	
			int userId=Integer.parseInt(request.getParameter("userId"));
			String fDate=request.getParameter("fromDate");
			String tDate=request.getParameter("toDate");
			String isPharmacy=request.getParameter("isPharmacy");
			int depId=Integer.parseInt(request.getParameter("deptId"));
			
			SimpleDateFormat fromUser  = new SimpleDateFormat("yyyy-MM-dd");
			SimpleDateFormat myFormat = new SimpleDateFormat("dd/MM/yyyy");
			
			SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy HH:mm a");
			String curr_date = dateformatter.format(new Date());
					
			String fromDMY = myFormat.format(fromUser.parse(fDate));
			String toDMY = myFormat.format(fromUser.parse(tDate));
            
            String fromYMD = "";
			String toYMD = "";

			if (fromDMY.contains("/")) {
				fromYMD = (fromDMY.split("/")[2]) + "-"
						+ (fromDMY.split("/")[1]) + "-"
						+ (fromDMY.split("/")[0]);
			}

			if (toDMY.contains("/")) {
				toYMD = (toDMY.split("/")[2]) + "-" + (toDMY.split("/")[1])
						+ "-" + (toDMY.split("/")[0]);
			}		
			
			document.newPage();
			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 30, 70, 30 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable2 = new PdfPTable(6);
			int[] headerwidth2 = { 10,15,10,35,15,30 };
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable2.setSpacingAfter(10.0f);
			
			PdfPTable HeaderTable3 = new PdfPTable(6);
			int[] headerwidth3 = { 30, 40, 20, 40, 25, 25 };
			HeaderTable3.setWidths(headerwidth3);
			HeaderTable3.setWidthPercentage(95f);
			HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable4 = new PdfPTable(3);
			int[] headerwidth4 = { 30, 60, 20 };
			HeaderTable4.setWidths(headerwidth4);
			HeaderTable4.setWidthPercentage(95f);
			HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			//For Receipt Details.
			PdfPTable HeaderTable5 = new PdfPTable(14);
			int[] headerwidth5 = { 7, 13, 30 ,25, 15, 15, 15, 15, 15, 15, 15, 15, 35, 25 };
			HeaderTable5.setWidths(headerwidth5);
			HeaderTable5.setWidthPercentage(100f);
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
			
			PdfPTable HeaderTable7 = new PdfPTable(6);
			int[] headerwidth7 = { 7, 40, 20, 15, 20, 18 };
			HeaderTable7.setWidths(headerwidth7);
			HeaderTable7.setWidthPercentage(95f);
			HeaderTable7.getDefaultCell().setBorder(Rectangle.BOTTOM);

			PdfPTable HeaderTable6 = new PdfPTable(5);

			int[] headerwidth6 = { 20, 60, 30, 20, 20 };
			HeaderTable6.setWidths(headerwidth6);
			HeaderTable6.setWidthPercentage(95f);
			HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable HeaderTable9 = new PdfPTable(3);
			int[] headerwidth9 = { 20, 60, 20 };
			HeaderTable9.setWidths(headerwidth9);
			HeaderTable9.setWidthPercentage(95f);
			HeaderTable9.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			//For Refund Details.
			PdfPTable HeaderTable10 = new PdfPTable(12);
			int[] headerwidth10 = { 7, 12, 30 ,25, 15, 15, 15, 15, 15, 15, 35, 25};
			HeaderTable10.setWidths(headerwidth10);
			HeaderTable10.setWidthPercentage(100f);
			HeaderTable10.getDefaultCell().setBorder(Rectangle.BOTTOM);

	//		AdminModel adminModel = new AdminModel();
	//		int printId = 2;
	//		int numOfPrint = adminModel.generalAccessNumOfPrint(printId);// to get number of prints

			//loop starts here			
					
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
			p.add(new Chunk(" \n", bold));
			p.add(new Chunk(" \n"+address, tabletext));			
			p.add(new Chunk(" \n"+city+" Pin- "+hospitalZip, tabletext));
			p.add(new Chunk(" \nPhone No. "+hPhoneNo, tabletext));	
			p.add(new Chunk(" \n "+webste+" email: "+email, tabletext));	
			/* p.add(new Chunk(" \nCIN: "+cinNo, regular));	
			p.add(new Chunk(" \nCIN: "+serviceTaxNo+", PAN No: "+panNo, regular));*/
			p.add(new Chunk(" \nPAN No: "+panNo, regular));
			//HeaderTable1.addCell(new Phrase("", header));
			
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
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("" + user_name, subheader));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();

			HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
			HeaderTable2.addCell(new Phrase(" From : ", subheader));
			PdfPCell subcell = new PdfPCell(new Phrase(""+fDate,tabletext));
			subcell.setHorizontalAlignment(Element.ALIGN_LEFT);
			subcell.setBorder(Rectangle.NO_BORDER);
			HeaderTable2.addCell(subcell);
			HeaderTable2.addCell(new Phrase(" To : ",subheader));
			HeaderTable2.addCell(new Phrase(" "+tDate, tabletext));
			HeaderTable2.addCell(new Phrase("  Date :", subheader));
			HeaderTable2.addCell(new Phrase("" +curr_date , tabletext));
			document.add(HeaderTable2);
			HeaderTable2.flushContent();
			
			
			
			CommonadvDto obj = fetchlist.dailyCommonAdvReport("onload", 1 , userId, fDate, tDate);	
			List<CommonadvDto> cAdvList = new ArrayList<CommonadvDto>();
			cAdvList = obj.getLstCommonadv();
			
			// Common Advance start			
			HeaderTable10.addCell(new Phrase("", subheader));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("Common Advance Details", subheader));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			
			HeaderTable10.getDefaultCell().setBorder(Rectangle.BOTTOM);
			
			
			HeaderTable10.addCell(new Phrase("#", subheader));
		//	HeaderTable10.addCell(new Phrase("Patient Id", subheader));
			HeaderTable10.addCell(new Phrase("UHId", subheader));
			HeaderTable10.addCell(new Phrase("Patient Name", subheader));
			HeaderTable10.addCell(new Phrase("Opd NO", subheader));
			HeaderTable10.addCell(new Phrase("Date", subheader));
			HeaderTable10.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			HeaderTable10.addCell(new Phrase("Cash", subheader));
			HeaderTable10.addCell(new Phrase("Card", subheader));
			HeaderTable10.addCell(new Phrase("Cheque", subheader));
			HeaderTable10.addCell(new Phrase("Total", subheader));
			HeaderTable10.addCell(new Phrase("Refund", subheader));
			HeaderTable10.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable10.addCell(new Phrase("User", subheader));			
			HeaderTable10.addCell(new Phrase("Narration", subheader));
			
			/* PdfPCell cell227 = new PdfPCell(new Phrase("Cash" ,subheader));
			cell227.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell227.setBorder(Rectangle.BOTTOM);
			HeaderTable10.addCell(cell227);
			
			PdfPCell cell28 = new PdfPCell(new Phrase("Card" ,subheader)); 
			cell28.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell28.setBorder(Rectangle.BOTTOM);
			HeaderTable10.addCell(cell28);
			
			PdfPCell cell29 = new PdfPCell(new Phrase("Cheque" ,subheader)); 
			cell29.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell29.setBorder(Rectangle.BOTTOM);
			HeaderTable10.addCell(cell29);
			
			PdfPCell cell210 = new PdfPCell(new Phrase("Advance" ,subheader)); 
			cell210.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell210.setBorder(Rectangle.BOTTOM);
			HeaderTable10.addCell(cell210);
			
			PdfPCell cell11 = new PdfPCell(new Phrase("Multiple" ,subheader)); 
			cell11.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell11.setBorder(Rectangle.BOTTOM);
			HeaderTable10.addCell(cell11);
			
			PdfPCell cell266 = new PdfPCell(new Phrase("Total" ,subheader)); 
			cell266.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell266.setBorder(Rectangle.BOTTOM);
			HeaderTable10.addCell(cell266);
			
			PdfPCell cellUserRef = new PdfPCell(new Phrase("User" ,subheader)); 
			cellUserRef.setHorizontalAlignment(Element.ALIGN_CENTER);
			cellUserRef.setBorder(Rectangle.BOTTOM);
			HeaderTable10.addCell(cellUserRef);
			
			PdfPCell cellRemarkRef = new PdfPCell(new Phrase("Remark" ,subheader)); 
			cellRemarkRef.setHorizontalAlignment(Element.ALIGN_CENTER);
			cellRemarkRef.setBorder(Rectangle.BOTTOM);
			HeaderTable10.addCell(cellRemarkRef); */ 


			
			document.add(HeaderTable10);
			HeaderTable10.flushContent();

			HeaderTable10.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			
			double totcashTotAdvance=0;
			double totcardTotAdvance=0;
			double totchequeTotAdvance=0;
			double totcadvcTotAdvance=0;
			double totmultiTotAdvance=0;
			double totTotAdvance=0;
			double totTotAdvanceRefund=0;
			
			for (int i = 0; i < cAdvList.size(); i++) {

				int pid=cAdvList.get(i).getPatient_ID();				
				String patName=cAdvList.get(i).getPatientName();
				double cash=cAdvList.get(i).getCashAmt();
				double card=cAdvList.get(i).getCardAmt();
				double cheque=cAdvList.get(i).getChequeAmt();
				double cadvc=0;//cAdvList.get(i).getTotalDisc();
				double multiple=0;//cAdvList.get(i).getTotalQty();
				double totAdvance = cAdvList.get(i).getTotAmt();
				double totAdvanceRefund = cAdvList.get(i).getRefund_amnt();
				Date appDates=cAdvList.get(i).getCreatedDate();
				if(appDates==null)
				{
					appDates= new Date();
				}
				System.out.println("appdates===>"+appDates);
				String users=cAdvList.get(i).getUserNames();
				String discRemark=cAdvList.get(i).getNarration();
				String opdNo=cAdvList.get(i).getOpdIpdNo();
				
				//SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd HH:mm:ss");
				SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	           SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm a");
	            String appDate = sdf.format(appDates);
	            
	           				
	            totTotAdvance = totTotAdvance + totAdvance;
	            totTotAdvanceRefund = totTotAdvanceRefund + totAdvanceRefund;
				
				HeaderTable10.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
				HeaderTable10.addCell(new Phrase("" + (i + 1), tabletext));
				HeaderTable10.addCell(new Phrase(""+ pid,tabletext));

				PdfPCell cell25 = new PdfPCell(new Phrase(""	+patName ,tabletext));
				cell25.setHorizontalAlignment(Element.ALIGN_LEFT);
				cell25.setBorder(Rectangle.NO_BORDER);
				HeaderTable10.addCell(cell25);
				
				PdfPCell cellOpdNo = new PdfPCell(new Phrase(""+opdNo ,tabletext));
				cellOpdNo.setHorizontalAlignment(Element.ALIGN_LEFT);
				cellOpdNo.setBorder(Rectangle.NO_BORDER);
				HeaderTable10.addCell(cellOpdNo);
				
				PdfPCell cell39 = new PdfPCell(new Phrase(""+appDate ,tabletext));
				cell39.setHorizontalAlignment(Element.ALIGN_LEFT);
				cell39.setBorder(Rectangle.NO_BORDER);
				HeaderTable10.addCell(cell39);

				PdfPCell cell2125 = new PdfPCell(new Phrase("" +df2.format(cash), tabletext));
				cell2125.setHorizontalAlignment(Element.ALIGN_RIGHT);
				cell2125.setBorder(Rectangle.NO_BORDER);
				HeaderTable10.addCell(cell2125);
				
				PdfPCell cell235 = new PdfPCell(new Phrase("" +df2.format(card), tabletext));
				cell235.setHorizontalAlignment(Element.ALIGN_RIGHT);
				cell235.setBorder(Rectangle.NO_BORDER);
				HeaderTable10.addCell(cell235);

				PdfPCell cell245 = new PdfPCell(new Phrase("" + df2.format(cheque),tabletext));
				cell245.setHorizontalAlignment(Element.ALIGN_RIGHT);
				cell245.setBorder(Rectangle.NO_BORDER);
				HeaderTable10.addCell(cell245);

				PdfPCell cell5 = new PdfPCell(new Phrase(""+ df2.format(totAdvance), tabletext));
				cell5.setHorizontalAlignment(Element.ALIGN_RIGHT);
				cell5.setBorder(Rectangle.NO_BORDER);
				HeaderTable10.addCell(cell5);
				
				/* PdfPCell cell6 = new PdfPCell(new Phrase(""+ df2.format(multiple), tabletext));
				cell6.setHorizontalAlignment(Element.ALIGN_RIGHT);
				cell6.setBorder(Rectangle.NO_BORDER);
				HeaderTable10.addCell(cell6); */
				
				PdfPCell cell16 = new PdfPCell(new Phrase(""+ df2.format(totAdvanceRefund), tabletext));
				cell16.setHorizontalAlignment(Element.ALIGN_RIGHT);
				cell16.setBorder(Rectangle.NO_BORDER);
				HeaderTable10.addCell(cell16);
				
				PdfPCell cellUsersRef = new PdfPCell(new Phrase(""+users, tabletext));
				cellUsersRef.setHorizontalAlignment(Element.ALIGN_LEFT);
				cellUsersRef.setBorder(Rectangle.NO_BORDER);
				HeaderTable10.addCell(cellUsersRef);
				
				
				PdfPCell cellDiscRemarkRef = new PdfPCell(new Phrase(""+discRemark, tabletext));
				cellDiscRemarkRef.setHorizontalAlignment(Element.ALIGN_LEFT);
				cellDiscRemarkRef.setBorder(Rectangle.NO_BORDER);
				HeaderTable10.addCell(cellDiscRemarkRef);

			}
			
			document.add(HeaderTable10);
			HeaderTable10.flushContent();
			
			HeaderTable10.getDefaultCell().setBorder(Rectangle.BOTTOM);
			
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
						
			document.add(HeaderTable10);
			HeaderTable10.flushContent();	
			
			
			HeaderTable10.addCell(new Phrase(" ", tabletext));
			HeaderTable10.addCell(new Phrase(" ", tabletext));
			HeaderTable10.addCell(new Phrase(" ", tabletext));
			PdfPCell cell2174 = new PdfPCell(new Phrase("",subheader));
			cell2174.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell2174.setBorder(Rectangle.BOTTOM);
			HeaderTable10.addCell(cell2174);
			
			HeaderTable10.addCell(new Phrase("Total", subheader));
			
			PdfPCell cell224 = new PdfPCell(new Phrase(""	+df2.format(totcashTotAdvance) ,subheader));
			cell224.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell224.setBorder(Rectangle.BOTTOM);
			HeaderTable10.addCell(cell224);

			PdfPCell cell2124 = new PdfPCell(new Phrase("" +df2.format(totcardTotAdvance), subheader));
			cell2124.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell2124.setBorder(Rectangle.BOTTOM);
			HeaderTable10.addCell(cell2124);
			
			PdfPCell cell234 = new PdfPCell(new Phrase("" +df2.format(totchequeTotAdvance), subheader));
			cell234.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell234.setBorder(Rectangle.BOTTOM);
			HeaderTable10.addCell(cell234);

			PdfPCell cell243 = new PdfPCell(new Phrase("" + df2.format(totTotAdvance),subheader));
			cell243.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell243.setBorder(Rectangle.BOTTOM);
			HeaderTable10.addCell(cell243); 

			/* PdfPCell cell5 = new PdfPCell(new Phrase(""+ df2.format(totmultiTotAdvance), subheader));
			cell5.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell5.setBorder(Rectangle.BOTTOM);
			HeaderTable10.addCell(cell5); */
			
			PdfPCell cell3274 = new PdfPCell(new Phrase(""+ df2.format(totTotAdvanceRefund), subheader));
			cell3274.setHorizontalAlignment(Element.ALIGN_RIGHT);
			cell3274.setBorder(Rectangle.BOTTOM);
			HeaderTable10.addCell(cell3274);
			
			HeaderTable10.addCell(new Phrase("", tabletext));
			HeaderTable10.addCell(new Phrase("", tabletext));
			
			document.add(HeaderTable10);
			HeaderTable10.flushContent();
			
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
			HeaderTable6.addCell(new Phrase("Total Common Advance Amount :", subheader));
			HeaderTable6.addCell(new Phrase(""+ df2.format(totTotAdvance), subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("Total Common Advance Refund Amount :", subheader));
			HeaderTable6.addCell(new Phrase(""+ df2.format(totTotAdvanceRefund), subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("Total Common Advance Remain Amount :", subheader));
			HeaderTable6.addCell(new Phrase(""+ df2.format(totTotAdvance - totTotAdvanceRefund), subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			HeaderTable6.addCell(new Phrase("", subheader));
			
			document.add(HeaderTable6);
			HeaderTable6.flushContent();
			
			// Common Advance end 
			
						
			HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));

			
			HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable4.addCell(new Phrase("",tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));
			
			HeaderTable4.addCell(new Phrase("Authorized Signatory",	tabletext));
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
			System.err.println(e.getMessage());
			e.printStackTrace();
		} 

	%>
	
</body>
</html>