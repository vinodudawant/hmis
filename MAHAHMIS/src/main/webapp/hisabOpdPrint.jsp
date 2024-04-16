<%@page import="com.hms.dto.Test"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.hisab.model.HisabModel"%>
<%@page import="com.hms.hisab.Pojo.HisabDTO"%>
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
<title>Opd Hisab Print</title>
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
		
		int selectService = Integer.parseInt(request.getParameter("selectService"));		
		String operation = request.getParameter("operation");	
		String selectedDate = request.getParameter("selectedDate");
		String toDate = request.getParameter("toDate");
		String serviceName=null;
		double totalReceipt=0;
		double totalRefund=0;
		double totalConcession=0;
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
		// @code for: If service Id=0 means it is pathology test otherwise investigation test group  @Author: Vinod
		if(selectService!=0)
		{
			for(Test t:arrTestType)
			{
				if(t.getGroupId()==selectService)
				{
					serviceName=t.getGroupName();
				}
			}
		}
		else
		{
			serviceName="Pathology";
		}
		
		//---------------------- @code for: To get receipt & refund details  @Author: Vinod -----------------------------------------//
		HisabDTO hisabPojo = new HisabDTO(); 
		HisabModel hmodel = new HisabModel();		
		List<HisabDTO> lstHisabDTO=new ArrayList<HisabDTO>();
		lstHisabDTO = hmodel.fetchOpdHisab(selectService, operation, selectedDate,toDate);				
		
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
		
		//---------------------- @Table for: To get Date & service name  @Author: Vinod -----------------------------------------//
		PdfPTable HeaderTable3 = new PdfPTable(5);
		int[] headerwidth3 = { 7,15,30,15,25};
		HeaderTable3.setWidths(headerwidth3);
		HeaderTable3.setWidthPercentage(95f);
		HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable3.addCell(new Phrase("Date :",subheader));
		HeaderTable3.addCell(new Phrase(todays_date,tabletext));
		HeaderTable3.addCell(new Phrase("",subheader));
		HeaderTable3.addCell(new Phrase("Service Name :",subheader));
		HeaderTable3.addCell(new Phrase(""+serviceName,tabletext));	
		
		HeaderTable3.addCell(new Phrase(" ",subheader));
		HeaderTable3.addCell(new Phrase(" ",subheader));
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
		PdfPTable HeaderTable5 = new PdfPTable(7);
		int[] headerwidth5 = { 7, 30, 30, 28, 12, 15, 25};
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
		HeaderTable5.addCell(new Phrase("", tabletext));		
		
		HeaderTable5.addCell(new Phrase("#", subheader));
		HeaderTable5.addCell(new Phrase("Name of Patient", subheader));
		HeaderTable5.addCell(new Phrase("Name of Doctor", subheader));
		HeaderTable5.addCell(new Phrase("Receipt No-Compt No", subheader));
		HeaderTable5.addCell(new Phrase("Amount", subheader));
		HeaderTable5.addCell(new Phrase("Concession", subheader));		
		HeaderTable5.addCell(new Phrase("Net Amount (INR)", subheader));
		HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		int countUp=1;		
		for(HisabDTO hisabDto:lstHisabDTO)
		{
			if(hisabDto.getRefundFlag().equals("N"))
			{
				HeaderTable5.addCell(new Phrase(""+countUp++ , tabletext));			
				HeaderTable5.addCell(new Phrase(""+hisabDto.getPatientName() , tabletext));
				HeaderTable5.addCell(new Phrase(""+hisabDto.getDoctorName() , tabletext));
				HeaderTable5.addCell(new Phrase(""+hisabDto.getReceiptId() +"-"+""+hisabDto.getComponentId(), tabletext));
				HeaderTable5.addCell(new Phrase(""+hisabDto.getTotalTestAmount() , tabletext));
				HeaderTable5.addCell(new Phrase(""+hisabDto.getDiscountAmount() , tabletext));		
				HeaderTable5.addCell(new Phrase(""+hisabDto.getPaidAmount() , tabletext ));		
				totalRefund=totalRefund+hisabDto.getPaidAmount();
				totalConcession=totalConcession+hisabDto.getDiscountAmount();
			}			
		}		

		HeaderTable5.addCell(new Phrase("", tabletext));
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
		int[] headerwidth6 = { 15,30,55};
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
		PdfPTable HeaderTable7 = new PdfPTable(7);
		int[] headerwidth7 = { 7, 30, 30, 28, 12, 15, 25};
		HeaderTable7.setWidths(headerwidth7);
		HeaderTable7.setWidthPercentage(95f);
		HeaderTable7.setSpacingAfter(10f);
		HeaderTable7.getDefaultCell().setBorder(Rectangle.BOTTOM);		
		
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));		

		HeaderTable7.addCell(new Phrase("#", subheader));
		HeaderTable7.addCell(new Phrase("Name of Patient", subheader));
		HeaderTable7.addCell(new Phrase("Name of Doctor", subheader));
		HeaderTable7.addCell(new Phrase("Receipt No-Compt No", subheader));		
		HeaderTable7.addCell(new Phrase("Amount", subheader));		
		HeaderTable7.addCell(new Phrase("Reduction", subheader));		
		HeaderTable7.addCell(new Phrase("Net Amount (INR)", subheader));
		
		HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		int countDown=1;
		for(HisabDTO hisabDto:lstHisabDTO)
		{
			if(hisabDto.getRefundFlag().equals("Y"))
			{
				HeaderTable7.addCell(new Phrase(""+countDown++ , tabletext));			
				HeaderTable7.addCell(new Phrase(""+hisabDto.getPatientName() , tabletext));
				HeaderTable7.addCell(new Phrase(""+hisabDto.getDoctorName() , tabletext));
				HeaderTable7.addCell(new Phrase(""+hisabDto.getRefundAgainstReceiptId() +"-"+""+hisabDto.getRefundAgainstComponentId(), tabletext));
				HeaderTable7.addCell(new Phrase(""+hisabDto.getTotalTestAmount() , tabletext));
				HeaderTable7.addCell(new Phrase(""+hisabDto.getUnpaidAmount() , tabletext));		
				HeaderTable7.addCell(new Phrase(""+hisabDto.getRefundAmount() , tabletext));	
				totalReceipt=totalReceipt+hisabDto.getRefundAmount();
			}
		}
				
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
		HeaderTable7.addCell(new Phrase("", tabletext));
		
		document.add(HeaderTable7);
		HeaderTable7.flushContent();
				
		
		//---------------------- @Table for: To Total hisab heading  @Author: Vinod -----------------------------------------//
		PdfPTable HeaderTable8 = new PdfPTable(3);
		int[] headerwidth8 = {15,30,55};
		HeaderTable8.setWidths(headerwidth8);
		HeaderTable8.setWidthPercentage(95f);
		HeaderTable8.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable8.addCell(new Phrase("Total Hisab : ",subheader));
		HeaderTable8.addCell(new Phrase("",tabletext));
		
		HeaderTable8.addCell(new Phrase("",subheader));
		HeaderTable8.addCell(new Phrase("",subheader));
		HeaderTable8.addCell(new Phrase("",subheader));
		HeaderTable8.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		document.add(HeaderTable8);
		HeaderTable8.flushContent();
		
		
		//---------------------- @Table for: To print Total hisab details  @Author: Vinod -----------------------------------------//
		
		totalCash=totalRefund-totalReceipt;
		/* if(totalCash<0)
		{
			totalCash=0;
		} */
		
		PdfPTable HeaderTable9 = new PdfPTable(4);
		int[] headerwidth9 = { 50,50,50,30};
		HeaderTable9.setWidths(headerwidth9);
		HeaderTable9.setWidthPercentage(95f);
		HeaderTable9.setSpacingAfter(50f);
		HeaderTable9.getDefaultCell().setBorder(Rectangle.BOTTOM);		
		
		HeaderTable9.addCell(new Phrase("", tabletext));
		HeaderTable9.addCell(new Phrase("", tabletext));
		HeaderTable9.addCell(new Phrase("", tabletext));
		HeaderTable9.addCell(new Phrase("", tabletext));				
		
		HeaderTable9.addCell(new Phrase("Total Receipt", subheader));
		HeaderTable9.addCell(new Phrase("Total Refund", subheader));
		HeaderTable9.addCell(new Phrase("Total Concession", subheader));
		HeaderTable9.addCell(new Phrase("Total Cash", subheader));		
		
		HeaderTable9.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable9.addCell(new Phrase(""+totalRefund, tabletext));			
		HeaderTable9.addCell(new Phrase(""+totalReceipt, tabletext));
		HeaderTable9.addCell(new Phrase(""+totalConcession, tabletext));		
		HeaderTable9.addCell(new Phrase(""+totalCash, tabletext));
		
		HeaderTable9.addCell(new Phrase("", tabletext));
		HeaderTable9.addCell(new Phrase("", tabletext));
		HeaderTable9.addCell(new Phrase("", tabletext));
		HeaderTable9.addCell(new Phrase("", tabletext));
		
		document.add(HeaderTable9);
		HeaderTable9.flushContent();
		
		
		//---------------------- @Table for: To print table footer  @Author: Vinod -----------------------------------------//
		PdfPTable HeaderTable10 = new PdfPTable(3);
		int[] headerwidth10 = { 30,30,40};
		HeaderTable10.setWidths(headerwidth10);
		HeaderTable10.setWidthPercentage(95f);
		HeaderTable10.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		HeaderTable10.addCell(new Phrase(" ",header));
		HeaderTable10.addCell(new Phrase(" ",header));
		HeaderTable10.addCell(new Phrase(" ",header));		
		
		HeaderTable10.addCell(new Phrase(" ",header));
		HeaderTable10.addCell(new Phrase(" ",header));
		HeaderTable10.addCell(new Phrase(" ",header));		
		
		HeaderTable10.addCell(new Phrase(" ",header));
		HeaderTable10.addCell(new Phrase(" ",header));
		HeaderTable10.addCell(new Phrase(" ",header));
		
		HeaderTable10.addCell(new Phrase("Signature ",header));
		HeaderTable10.addCell(new Phrase("Checked By",header));
		HeaderTable10.addCell(new Phrase("Auth.By : "+generatorName,header));
		
		document.add(HeaderTable10);
		HeaderTable10.flushContent(); 
		
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