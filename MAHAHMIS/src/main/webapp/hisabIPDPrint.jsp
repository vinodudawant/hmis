<%@page import="com.hms.dto.Test"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.hisab.model.HisabModel"%>
<%@page import="com.hms.hisab.Pojo.HisabIPDDTO"%>
<%@page import="com.hms.model.AdminModel"%>
<%@page import="com.hms.dto.SponsoredDetailsDTO"%>
<%@page import="com.hms.dto.MotivatorVoucherDetailsDTO"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%@ page import="com.hms.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>IPD Hisab Print</title>
</head>
<body>
<%
	try
	{
		response.setContentType("application/pdf");
		
		List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails.getHospDetails("0");
		HospitalDetails hospObj = arrHospitalDetails.get(0);

		ServletOutputStream outStream = response.getOutputStream();
		Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
		document.setMargins(20, 20, 20, 0);

		PdfWriter.getInstance(document, outStream);
		document.open();
		
		//font
		Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font subheader = new Font(Font.FontFamily.HELVETICA, 9,	Font.BOLD);
		Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font tabletext = new Font(Font.FontFamily.HELVETICA, 9,	Font.NORMAL);
		Font small = new Font(Font.FontFamily.HELVETICA, 7, Font.NORMAL);
		
		//--------------------------- @code for: To get current userName & userId  @Author: Vinod ------------------------------------
		session = request.getSession(true);
		String generatorName=(String)session.getAttribute("CurrentuserName");
		Integer generatorId=(Integer)session.getAttribute("currentUserID");
				
		String operation = request.getParameter("operation");	
		String selectedDate = request.getParameter("selectedDate");
		String toDate = request.getParameter("toDate");
		String serviceName=null;
		double totalReceipt=0;
		double totalRefund=0;
		double totalDiscount=0;
		double totalCash=0;
		
		String path = hospObj.getFilePath();
		String hospitalName = hospObj.getHospitalName();
		hospitalName = hospitalName.toUpperCase();
		String address = hospObj.getHospitalAddress();
		String city = hospObj.getHospitalCity();
		String contact = hospObj.getHospitalContact();
		String path1 = application.getRealPath(path);
		
		Image img = null;
		PdfPCell cell = null;
		try 
		{
			img = Image.getInstance(path1);
			img.scaleAbsolute(150, 60);
			cell = new PdfPCell();
			cell.addElement(new Chunk(img, 5, -5));
			cell.setBorder(Rectangle.NO_BORDER);
		} 
		catch (Exception e)
		{
			e.printStackTrace();
		}
		
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		String todays_date = formatter.format(currentDate.getTime());
		
		
		//------------------------ @code for: To get Service Name using Service Id  @Author: Vinod ----------------------------------//
		List<Test> arrTestType = new ArrayList<Test>();		
		AdminModel objAdminModel = new AdminModel();
		arrTestType = objAdminModel.fetchDefaultTestType();
		Test test=new Test();
			
		//---------------------- @code for: To get receipt & refund details  @Author: Vinod -----------------------------------------//
		HisabIPDDTO hisabPojo = new HisabIPDDTO(); 
		HisabModel hmodel = new HisabModel();		
		List<HisabIPDDTO> lstHisabDTO=new ArrayList<HisabIPDDTO>();
		lstHisabDTO = hmodel.fetchIPDHisab(operation, selectedDate,toDate);				
		
		document.newPage();		
		
		//---------------------- @Table for: To get Hospital Name & address details  @Author: Vinod -----------------------------------------//
		PdfPTable HeaderTable1 = new PdfPTable(3);
		int[] headerwidth1 = { 40, 70, 10 };
		HeaderTable1.setWidths(headerwidth1);
		HeaderTable1.setWidthPercentage(95f);
		HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		if (img == null) {
			HeaderTable1.addCell(new Phrase("", header));
		} else {
			HeaderTable1.addCell(cell);
		} 
		
		PdfPCell hospitalNameCell = new PdfPCell(new Phrase("\n\n    "+	hospitalName + "\n" + address, subheader));
		hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		hospitalNameCell.setBorder(Rectangle.NO_BORDER);
		HeaderTable1.addCell(hospitalNameCell);
		HeaderTable1.addCell(new Phrase("", header));
		
		document.add(HeaderTable1);
		HeaderTable1.flushContent();
		document.add(HeaderTable1);
		HeaderTable1.flushContent();

		//---------------------- @Table for: To print divider after hospital details  @Author: Vinod -----------------------------------------//
		PdfPTable HeaderTable2 = new PdfPTable(1);
		int[] headerwidth2 = { 100};
		HeaderTable2.setWidths(headerwidth2);
		HeaderTable2.setWidthPercentage(95f);
		HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
		HeaderTable2.addCell(new Phrase(" ",subheader));
		
		document.add(HeaderTable2);
		HeaderTable2.flushContent();
		
		//---------------------- @Table for: To get Date  @Author: Vinod -----------------------------------------//
		PdfPTable HeaderTable3 = new PdfPTable(3);
		int[] headerwidth3 = {7,15,30};
		HeaderTable3.setWidths(headerwidth3);
		HeaderTable3.setWidthPercentage(95f);
		HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable3.addCell(new Phrase("Date :",subheader));
		HeaderTable3.addCell(new Phrase(selectedDate,tabletext));
		HeaderTable3.addCell(new Phrase("",subheader));		
		
		HeaderTable3.addCell(new Phrase(" ",subheader));
		HeaderTable3.addCell(new Phrase(" ",subheader));
		HeaderTable3.addCell(new Phrase(" ",subheader));		
		
		document.add(HeaderTable3);
		HeaderTable3.flushContent();
		
		//---------------------- @Table for: To Details Receipt heading  @Author: Vinod -----------------------------------------//
		PdfPTable HeaderTable4 = new PdfPTable(3);
		int[] headerwidth4 = { 15,30,55};
		HeaderTable4.setWidths(headerwidth4);
		HeaderTable4.setWidthPercentage(95f);
		HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable4.addCell(new Phrase("Details Receipt : ",subheader));
		HeaderTable4.addCell(new Phrase("",tabletext));
		
		HeaderTable4.addCell(new Phrase("",subheader));
		HeaderTable4.addCell(new Phrase("",subheader));
		HeaderTable4.addCell(new Phrase("",subheader));
		HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		document.add(HeaderTable4);
		HeaderTable4.flushContent();
		
		//---------------------- @Table for: To print receipt details  @Author: Vinod -----------------------------------------//
		PdfPTable HeaderTable5 = new PdfPTable(6);
		int[] headerwidth5 = { 7, 30, 30, 30, 30, 30};
		HeaderTable5.setWidths(headerwidth5);
		HeaderTable5.setWidthPercentage(95f);
		HeaderTable5.setSpacingAfter(10f);
		HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
				
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
				
		HeaderTable5.addCell(new Phrase("#", subheader));
		HeaderTable5.addCell(new Phrase("Date", subheader));
		HeaderTable5.addCell(new Phrase("MRNo", subheader));
		HeaderTable5.addCell(new Phrase("RegNo", subheader));
		HeaderTable5.addCell(new Phrase("Head", subheader));
		HeaderTable5.addCell(new Phrase("Amount", subheader));				
		HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		int countUp=1;		
		for(HisabIPDDTO hisabDto:lstHisabDTO)
		{
			if(hisabDto.getRefundFlag().equals("N") && hisabDto.getDiscountFlag().equals("N"))
			{
				HeaderTable5.addCell(new Phrase(""+countUp++ , tabletext));			
				HeaderTable5.addCell(new Phrase(""+hisabDto.getReceiptDate() , tabletext));
				HeaderTable5.addCell(new Phrase(""+hisabDto.getReceiptMRNo() , tabletext));
				HeaderTable5.addCell(new Phrase(""+hisabDto.getReceiptRegNo() , tabletext));
				HeaderTable5.addCell(new Phrase(""+hisabDto.getBillType() , tabletext));
				HeaderTable5.addCell(new Phrase(""+hisabDto.getTotalAmount() , tabletext));		
					
				totalReceipt=totalReceipt+hisabDto.getTotalAmount();
			}			
		}		

		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));
		HeaderTable5.addCell(new Phrase("", tabletext));	
					
		document.add(HeaderTable5);
		HeaderTable5.flushContent();
		
		//---------------------- @Table for: To Details Refund heading  @Author: Vinod -----------------------------------------//
		PdfPTable HeaderTable6 = new PdfPTable(3);
		int[] headerwidth6 = {15,30,55};
		HeaderTable6.setWidths(headerwidth6);
		HeaderTable6.setWidthPercentage(95f);
		HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable6.addCell(new Phrase("Details Refund : ",subheader));
		HeaderTable6.addCell(new Phrase("",tabletext));
		
		HeaderTable6.addCell(new Phrase("",subheader));
		HeaderTable6.addCell(new Phrase("",subheader));
		HeaderTable6.addCell(new Phrase("",subheader));
		//HeaderTable6.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		document.add(HeaderTable6);
		HeaderTable6.flushContent();
			
		//---------------------- @Table for: To print refund details  @Author: Vinod -----------------------------------------//
		PdfPTable HeaderTable7 = new PdfPTable(5);
		int[] headerwidth7 = { 17, 35, 35, 35, 30};
		HeaderTable7.setWidths(headerwidth7);
		HeaderTable7.setWidthPercentage(95f);
		HeaderTable7.setSpacingAfter(10f);
		HeaderTable7.getDefaultCell().setBorder(Rectangle.BOTTOM);		
		
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
		
		HeaderTable7.addCell(new Phrase("#", subheader));
		HeaderTable7.addCell(new Phrase("Date", subheader));
		HeaderTable7.addCell(new Phrase("MRNo", subheader));
		HeaderTable7.addCell(new Phrase("RegNo", subheader));		
		HeaderTable7.addCell(new Phrase("Amount", subheader));		
		HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		int countDown=1;
		for(HisabIPDDTO hisabDto:lstHisabDTO)
		{
			if(hisabDto.getRefundFlag().equals("Y"))
			{
				HeaderTable7.addCell(new Phrase(""+countDown++ , tabletext));			
				HeaderTable7.addCell(new Phrase(""+hisabDto.getReceiptDate(), tabletext));
				HeaderTable7.addCell(new Phrase(""+hisabDto.getRefundMRNo(), tabletext));
				HeaderTable7.addCell(new Phrase(""+hisabDto.getRefundRegNo(), tabletext));
				HeaderTable7.addCell(new Phrase(""+hisabDto.getRefundAmount(), tabletext));
				
				totalRefund=totalRefund+hisabDto.getRefundAmount();
			}
		}
				
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
				
		document.add(HeaderTable7);
		HeaderTable7.flushContent();				
		
		//---------------------- @Table for: To Details Discount heading  @Author: Vinod -----------------------------------------//
		PdfPTable HeaderTable8 = new PdfPTable(3);
		int[] headerwidth8 = { 15,30,55};
		HeaderTable8.setWidths(headerwidth8);
		HeaderTable8.setWidthPercentage(95f);
		HeaderTable8.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable8.addCell(new Phrase("Details Discount : ",subheader));
		HeaderTable8.addCell(new Phrase("",tabletext));
		
		HeaderTable8.addCell(new Phrase("",subheader));
		HeaderTable8.addCell(new Phrase("",subheader));
		HeaderTable8.addCell(new Phrase("",subheader));
		HeaderTable8.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		document.add(HeaderTable8);
		HeaderTable8.flushContent();
		
		//---------------------- @Table for: To print Discount details  @Author: Vinod -----------------------------------------//
		PdfPTable HeaderTable9 = new PdfPTable(6);
		int[] headerwidth9 = { 7, 30, 30, 30, 30, 30};
		HeaderTable9.setWidths(headerwidth9);
		HeaderTable9.setWidthPercentage(95f);
		HeaderTable9.setSpacingAfter(10f);
		HeaderTable9.getDefaultCell().setBorder(Rectangle.BOTTOM);
				
		HeaderTable9.addCell(new Phrase("", tabletext));
		HeaderTable9.addCell(new Phrase("", tabletext));
		HeaderTable9.addCell(new Phrase("", tabletext));
		HeaderTable9.addCell(new Phrase("", tabletext));
		HeaderTable9.addCell(new Phrase("", tabletext));
		HeaderTable9.addCell(new Phrase("", tabletext));
				
		HeaderTable9.addCell(new Phrase("#", subheader));
		HeaderTable9.addCell(new Phrase("BillNo", subheader));
		HeaderTable9.addCell(new Phrase("Discount", subheader));
		HeaderTable9.addCell(new Phrase("RegId", subheader));
		HeaderTable9.addCell(new Phrase("Total", subheader));
		HeaderTable9.addCell(new Phrase("Narration", subheader));				
		HeaderTable9.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		int countDis=1;		
		for(HisabIPDDTO hisabDto:lstHisabDTO)
		{
			if(hisabDto.getDiscountFlag().equals("Y"))
			{
				HeaderTable9.addCell(new Phrase(""+countDis++ , tabletext));			
				HeaderTable9.addCell(new Phrase(""+hisabDto.getDiscountBillNo() , tabletext));
				HeaderTable9.addCell(new Phrase(""+hisabDto.getDiscountAmount() , tabletext));
				HeaderTable9.addCell(new Phrase(""+hisabDto.getDiscountRegId() , tabletext));
				HeaderTable9.addCell(new Phrase(""+hisabDto.getTotalAmount() , tabletext));
				HeaderTable9.addCell(new Phrase(""+hisabDto.getNarration() , tabletext));		
					
				totalDiscount=totalDiscount+hisabDto.getDiscountAmount();
			}			
		}		

		HeaderTable9.addCell(new Phrase("", tabletext));
		HeaderTable9.addCell(new Phrase("", tabletext));
		HeaderTable9.addCell(new Phrase("", tabletext));
		HeaderTable9.addCell(new Phrase("", tabletext));
		HeaderTable9.addCell(new Phrase("", tabletext));
		HeaderTable9.addCell(new Phrase("", tabletext));	
					
		document.add(HeaderTable9);
		HeaderTable9.flushContent();		
		
		//---------------------- @Table for: To Total hisab heading  @Author: Vinod -----------------------------------------//
		PdfPTable HeaderTable10 = new PdfPTable(3);
		int[] headerwidth10 = {15,30,55};
		HeaderTable10.setWidths(headerwidth10);
		HeaderTable10.setWidthPercentage(95f);
		HeaderTable10.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable10.addCell(new Phrase("Total Hisab : ",subheader));
		HeaderTable10.addCell(new Phrase("",tabletext));
		
		HeaderTable10.addCell(new Phrase("",subheader));
		HeaderTable10.addCell(new Phrase("",subheader));
		HeaderTable10.addCell(new Phrase("",subheader));
		HeaderTable10.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		document.add(HeaderTable10);
		HeaderTable10.flushContent();
		
		
		//---------------------- @Table for: To print Total hisab details  @Author: Vinod -----------------------------------------//
		
		totalCash=totalReceipt-totalRefund;
		/* if(totalCash<0)
		{
			totalCash=0;
		} */
		
		PdfPTable HeaderTable11 = new PdfPTable(4);
		int[] headerwidth11 = {30,30,30,30};
		HeaderTable11.setWidths(headerwidth11);
		HeaderTable11.setWidthPercentage(95f);
		HeaderTable11.setSpacingAfter(50f);
		HeaderTable11.getDefaultCell().setBorder(Rectangle.BOTTOM);		
		
		HeaderTable11.addCell(new Phrase("", tabletext));
		HeaderTable11.addCell(new Phrase("", tabletext));
		HeaderTable11.addCell(new Phrase("", tabletext));
		HeaderTable11.addCell(new Phrase("", tabletext));				
		
		HeaderTable11.addCell(new Phrase("Total Receipt", subheader));
		HeaderTable11.addCell(new Phrase("Total Discount", subheader));
		HeaderTable11.addCell(new Phrase("Total Refund", subheader));
		HeaderTable11.addCell(new Phrase("Total Cash", subheader));		
		
		HeaderTable11.getDefaultCell().setBorder(Rectangle.NO_BORDER);		
		HeaderTable11.addCell(new Phrase(""+totalReceipt, tabletext));			
		HeaderTable11.addCell(new Phrase(""+totalDiscount, tabletext));			
		HeaderTable11.addCell(new Phrase(""+totalRefund, tabletext));
		HeaderTable11.addCell(new Phrase(""+totalCash, tabletext));
		
		HeaderTable11.addCell(new Phrase("", tabletext));
		HeaderTable11.addCell(new Phrase("", tabletext));
		HeaderTable11.addCell(new Phrase("", tabletext));
		HeaderTable11.addCell(new Phrase("", tabletext));
		
		document.add(HeaderTable11);
		HeaderTable11.flushContent();
				
		//---------------------- @Table for: To print table footer  @Author: Vinod -----------------------------------------//
		PdfPTable HeaderTable12 = new PdfPTable(3);
		int[] headerwidth12 = { 30,30,40};
		HeaderTable12.setWidths(headerwidth12);
		HeaderTable12.setWidthPercentage(95f);
		HeaderTable12.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		HeaderTable12.addCell(new Phrase(" ",header));
		HeaderTable12.addCell(new Phrase(" ",header));
		HeaderTable12.addCell(new Phrase(" ",header));		
		
		HeaderTable12.addCell(new Phrase(" ",header));
		HeaderTable12.addCell(new Phrase(" ",header));
		HeaderTable12.addCell(new Phrase(" ",header));		
		
		HeaderTable12.addCell(new Phrase(" ",header));
		HeaderTable12.addCell(new Phrase(" ",header));
		HeaderTable12.addCell(new Phrase(" ",header));
		
		HeaderTable12.addCell(new Phrase("Signature ",header));
		HeaderTable12.addCell(new Phrase("Checked By",header));
		HeaderTable12.addCell(new Phrase("Auth.By : "+generatorName,header));
		
		document.add(HeaderTable12);
		HeaderTable12.flushContent(); 
		
		//------------------------------------------- End -----------------------------------------------------//
				
		document.close();
		outStream.close();
		outStream.flush();
		out.clear();
		
	}catch(Exception e){
		e.printStackTrace();
	}
%>
</body>
</html>