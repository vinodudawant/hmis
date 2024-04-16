<%@page import="com.hms.administrator.dao.impl.VouchersDaoImpl"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.administrator.dto.IpdExpenceVoucher"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.administrator.controller.VouchersController"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.administrator.service.VouchersService"%>
<%@page import="com.hms.ehat.service.impl.BillingServiceImpl" %>
<%@page import="com.hms.ehat.service.BillingService" %>
<%@page import="com.hms.dto.Test"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.model.AdminModel"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
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
<title>Expence Voucher Print</title>
</head>
<body>
<%
	try
	{
		response.setContentType("application/pdf");
		
		HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
		List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
		HospitalDetails hospObj = arrHospitalDetails.get(0);

		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		
		Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
		document.setMargins(20, 20, 20, 0);

		PdfWriter.getInstance(document, outStream);
		document.open();
		
		//font
		/* Font header = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
		Font subheader = new Font(Font.FontFamily.HELVETICA, 9,	Font.BOLD);
		Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font tabletext = new Font(Font.FontFamily.HELVETICA, 9,	Font.NORMAL);
		Font small = new Font(Font.FontFamily.HELVETICA, 7, Font.NORMAL); */
		
		Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font subheader = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);

		Font tableheader = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font tabletext = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
		Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
		
		//--------------------------- @code for: To get current userName & userId  @Author: Vinod ------------------------------------
		session = request.getSession(true);
		String generatorName=(String)session.getAttribute("CurrentuserName");
		Integer generatorId=(Integer)session.getAttribute("currentUserID");
		
		String voucherId = request.getParameter("voucherIdPrint");		
		String voucherType = request.getParameter("voucherTypePrint");	
		String tabType = request.getParameter("tabTypePrint");
		String voucherName = request.getParameter("voucherNamePrint");
		String voucherIDs = request.getParameter("idipdExpense"); 
		System.out.println("voucherIDs------>"+voucherIDs);
		Integer voucherID = Integer.parseInt(voucherIDs);
		System.out.println("voucherID------>"+voucherID);
		
		 
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
		
		Image img = null;
		PdfPCell cell = null;
		try {
			img = Image.getInstance(path1);
			img.scaleAbsolute(150, 40);
			cell = new PdfPCell();
			cell.addElement(new Chunk(img, 5, -5));
			cell.setBorder(Rectangle.NO_BORDER);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		String todays_date = formatter.format(currentDate.getTime());		
		
		//------------------------ @code for: To get Service Name using Service Id  @Author: Vinod ----------------------------------//
		/* List<Test> arrTestType = new ArrayList<Test>();		
		AdminModel objAdminModel = new AdminModel();
		arrTestType = objAdminModel.fetchDefaultTestType();
		Test test=new Test(); */
		// @code for: If service Id=0 means it is pathology test otherwise investigation test group  @Author: Vinod
		
		/* String hpHeader="";		
		String hpName="",certificate="",unit="",hpAddress="";		
				
		if(voucherType.equals("2"))
		{
			hpName="R. B. MEMORIAL CHARITABLE TRUST";
			certificate="Registered Under Indian Trust Act";
			unit="A unit of";
			hpAddress="Reg No-6756            Estd.-2006  .\n R.S. Tank Laheriasarai, Darbhanga - 846001.";
			hpHeader=hpName+"\n"+certificate+"\n"+hpAddress;		
		}
		else
		{
			hpName="R. B. MEMORIAL HOSPITAL";
			certificate="ISO 9000-2000 Certified";
			unit="A unit of";
			hpAddress="MISHRA POLY CLINIC AND RESEARCH CENTRE PVT LTD.\n Benta road Laheriasarai, Darbhanga - 846001.";
			hpHeader=hpName+"\n"+certificate+"\n"+unit+"\n"+hpAddress;
		} */
		
		//---------------------- @code for: To get receipt & refund details  @Author: Vinod -----------------------------------------//
		//GeneralVouchersDTO voucherPojo = new GeneralVouchersDTO(); 
		//GeneralVoucherModel voucherModel = new GeneralVoucherModel();		
		//List<GeneralVouchersDTO> lstGeneralVouchers=new ArrayList<GeneralVouchersDTO>();
		//lstGeneralVouchers = voucherModel.fetchSearchVouchers(voucherId, voucherType, tabType, searchType);	
		//lstGeneralVouchers = vouchesrModel.fetchVoucherForPrint(voucherID);	
		
		VouchersService AdExpenseVoucherCont = (VouchersService) (ApplicationContextUtils.getApplicationContext()).getBean(VouchersService.class);
		List<IpdExpenceVoucher> lstExpenseVouchers = new ArrayList<IpdExpenceVoucher>();
		lstExpenseVouchers = AdExpenseVoucherCont.fetchExpenceVoucher(voucherID,"Print",request);
		
		String companyName="";
		String paymentTo="";
		double amount=0.0;
		double PaidAmount = 0.0;
		String ledgerhead = "";
		String GrpName = "";
		String remarks = "";
		Date createdDate = null; 
		for(int i=0;i < lstExpenseVouchers.size();i++ )
		{
			companyName= lstExpenseVouchers.get(i).getCompanyName();
		System.out.println("companyName "+companyName);
		}
		for(IpdExpenceVoucher lst:lstExpenseVouchers)
		{
		//	 payTo=lst.getPayTo();
			
			/*  if((lst.getLedgerHead()).equals("null")){				 
				 account=" ";
			 }else{
				 account=lst.getLedgerHead();
			 } */
			 
			 paymentTo=lst.getPaymentTo();
			 amount=lst.getAmount();
			 PaidAmount = lst.getPaidAmount();
			 ledgerhead = lst.getLedgerHeadname();
			 GrpName = lst.getGrpname();
			 remarks = lst.getRemark();
			 createdDate =(Date) lst.getAssignDateTime();
			 System.out.println("created date on jsp--> "+createdDate);
		}  	
	
		/*  Doctor doctor = new Doctor();
		BillingServiceImpl Bservice 	= new BillingServiceImpl();
		List<Doctor> autholist = Bservice.fetchAuthorisedBy();
		for (Doctor rs : autholist) {
			
			if(autherisedById==null || autherisedById == "")
			{
				autherisedById= "0";
			}
			if(Integer.parseInt(autherisedById)==rs.getDoctor_ID()){
				autherisedBy=rs.getDoc_name();
			}		
		} 
		 */
		document.newPage();		
		
		//---------------------- @Table for: To get Hospital Name & address details  @Author: Vinod -----------------------------------------//
		/* PdfPTable HeaderTable1 = new PdfPTable(3);
		int[] headerwidth1 = { 33, 33, 33 };
		HeaderTable1.setWidths(headerwidth1);
		HeaderTable1.setWidthPercentage(95f);
		HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
		HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		PdfPCell voucherNameCell = new PdfPCell(new Phrase(""+voucherName,subheader));
		voucherNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		voucherNameCell.setBorder(Rectangle.NO_BORDER);
		HeaderTable1.addCell(new Phrase("", header));
		HeaderTable1.addCell(voucherNameCell);
		HeaderTable1.addCell(new Phrase("", header));
		
		document.add(HeaderTable1);
		HeaderTable1.flushContent();
		document.add(HeaderTable1);
		HeaderTable1.flushContent(); */
		
		// Table 1 : For hospital adress details start
		
			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 40, 70, 10 };
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
			 PdfPCell hospitalNameCell1 = new PdfPCell(new Phrase("\n     "+
					hospitalName + "\n" + address + "\n" +city + ", " +hospitalZip 
					+ "\n" + "Phone No: "+hPhoneNo + "\n"+webste + ", " +email
					+ "\n"+ "CIN NO:"+cinNo + "\n"+ "Service Tax NO:"+serviceTaxNo
					+ ",  Pan NO:"+panNo,subheader));
			hospitalNameCell1.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell1.setBorder(Rectangle.NO_BORDER);
			HeaderTable1.addCell(hospitalNameCell1); 
			
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
			HeaderTable1.flushContent();

			HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			HeaderTable1.addCell(new Phrase("", header));
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
			
		// Table 1 : For hospital adress details end

		//---------------------- @Table for: To print divider after hospital details  @Author: Vinod -----------------------------------------//
			
		/* PdfPTable HeaderTable2 = new PdfPTable(1);
		int[] headerwidth2 = {100};
		HeaderTable2.setWidths(headerwidth2);
		HeaderTable2.setWidthPercentage(95f);
		HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		PdfPCell hpNameCell = new PdfPCell(new Phrase(""+hpName,header));
		hpNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		hpNameCell.setBorder(Rectangle.NO_BORDER);
		
		
		PdfPCell certificateCell = new PdfPCell(new Phrase(""+certificate,subheader));
		certificateCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		certificateCell.setBorder(Rectangle.NO_BORDER);
		PdfPCell unitCell=new PdfPCell(new Phrase("",subheader));
		if(!voucherType.equals("2"))
		{
			unitCell = new PdfPCell(new Phrase(""+unit,subheader));
			unitCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			unitCell.setBorder(Rectangle.NO_BORDER);
		}
		
		PdfPCell hpAddressCell = new PdfPCell(new Phrase(""+hpAddress,subheader));
		hpAddressCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		hpAddressCell.setBorder(Rectangle.BOTTOM);		
					
		HeaderTable2.addCell(hpNameCell);
		HeaderTable2.addCell(certificateCell);
		if(!voucherType.equals("2"))
		{
			HeaderTable2.addCell(unitCell);
		}
		HeaderTable2.addCell(hpAddressCell);		
		HeaderTable2.addCell(new Phrase("",subheader));
		HeaderTable2.addCell(new Phrase("",subheader));
		HeaderTable2.addCell(new Phrase("",subheader));
		
		document.add(HeaderTable2);
		HeaderTable2.flushContent(); */
		
	 	//---------------------- @Table for: To get Date & service name  @Author: Vinod -----------------------------------------//
		PdfPTable HeaderTable3 = new PdfPTable(5);
		int[] headerwidth3 = { 15,15,40,7,15};
		HeaderTable3.setWidths(headerwidth3);
		HeaderTable3.setWidthPercentage(95f);
		HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTable3.addCell(new Phrase("Voucher No",subheader));
		HeaderTable3.addCell(new Phrase(" : "+voucherID,tabletext));
		HeaderTable3.addCell(new Phrase("",tabletext));
		/* HeaderTable3.addCell(new Phrase("",subheader)); */
		HeaderTable3.addCell(new Phrase("Date",subheader));
		HeaderTable3.addCell(new Phrase(" : "+createdDate,tabletext));	
				
		HeaderTable3.addCell(new Phrase(" ",subheader));
		HeaderTable3.addCell(new Phrase(" ",subheader));
		HeaderTable3.addCell(new Phrase(" ",subheader));
		HeaderTable3.addCell(new Phrase(" ",subheader));
		HeaderTable3.addCell(new Phrase(" ",subheader));
		
		document.add(HeaderTable3);
		HeaderTable3.flushContent();
		
		//---------------------- @Table for: To Details Receipt heading  @Author: Vinod -----------------------------------------//
		PdfPTable HeaderTable4 = new PdfPTable(2);
		int[] headerwidth4 = {15,80};
		HeaderTable4.setWidths(headerwidth4);
		HeaderTable4.setWidthPercentage(95f);
		HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
		/* PdfPCell payToCell = new PdfPCell(new Phrase(""+payTo,subheader));
		hpNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		hpNameCell.setBorder(Rectangle.NO_BORDER);
				
		PdfPCell accountCell = new PdfPCell(new Phrase(""+account,subheader));
		certificateCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		certificateCell.setBorder(Rectangle.NO_BORDER);
				
		PdfPCell narrationCell = new PdfPCell(new Phrase(""+narration,subheader));
		unitCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		unitCell.setBorder(Rectangle.NO_BORDER); */ 
		
		HeaderTable4.addCell(new Phrase("company Name",subheader));	
		HeaderTable4.addCell(new Phrase(" : "+companyName,tabletext));
		/* HeaderTable4.addCell(new Phrase("In Account Of",subheader));		
		HeaderTable4.addCell(new Phrase(" : "+account,tabletext)); */
		HeaderTable4.addCell(new Phrase("payment To",subheader));		
		HeaderTable4.addCell(new Phrase(" : "+paymentTo,tabletext));
		HeaderTable4.addCell(new Phrase("Group Name",subheader));		
		HeaderTable4.addCell(new Phrase(" : "+GrpName,tabletext));
		HeaderTable4.addCell(new Phrase("ledger head Name",subheader));		
		HeaderTable4.addCell(new Phrase(" : "+ledgerhead,tabletext));
		HeaderTable4.addCell(new Phrase("Narration",subheader));		
		HeaderTable4.addCell(new Phrase(" : "+remarks,tabletext));
		
		document.add(HeaderTable4);
		HeaderTable4.flushContent();		
		
		//---------------------- @Table for: To Details Receipt heading  @Author: Vinod -----------------------------------------//
		PdfPTable HeaderTable5 = new PdfPTable(2);
		int[] headerwidth5 = {15,80};
		HeaderTable5.setWidths(headerwidth5);
		HeaderTable5.setWidthPercentage(95f);
		HeaderTable5.setSpacingBefore(20f);
		HeaderTable5.getDefaultCell().setBorder(Rectangle.TOP);			
		HeaderTable5.addCell(new Phrase("Amount",subheader));		
		HeaderTable5.addCell(new Phrase(" : "+amount,tabletext));
		HeaderTable5.addCell(new Phrase("Paid Amount",subheader));		
		HeaderTable5.addCell(new Phrase(" : "+PaidAmount,tabletext));
		HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
		HeaderTable5.addCell(new Phrase("",subheader));		
		HeaderTable5.addCell(new Phrase("",subheader));	
		
		
		document.add(HeaderTable5);
		HeaderTable5.flushContent();
		
		
		//---------------------- @Table for: To Details Receipt heading  @Author: Vinod -----------------------------------------//
		 
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
		
		HeaderTable10.addCell(new Phrase("Signature ",subheader));
		HeaderTable10.addCell(new Phrase("",subheader));
		HeaderTable10.addCell(new Phrase("Auth.By : ",tabletext));
		
		document.add(HeaderTable10);
		HeaderTable10.flushContent(); 
		
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