<%@page import="java.util.ResourceBundle"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="org.springframework.format.datetime.joda.DateTimeFormatterFactory"%>
<%@page import="com.hms.ehat.dto.BillQuotationDto"%>
<%@page import="com.itextpdf.text.pdf.draw.DottedLineSeparator"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="org.jsoup.Jsoup"%>
<%@page import="com.hms.ipdbill.controller.BillController"%>
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
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.dto.RadiationMaster"%>
<%@ page import="com.hms.model.AdminModel"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>

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
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Quotation Print</title>List
<Assessment> arrAssessments = new ArrayList<Assessment>();

</head>
<body>
	<%
		try {

			response.setContentType("application/pdf");
			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails  = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);

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
			
			
			String billquotations=request.getParameter("billquotations");
			int treatId=Integer.parseInt(request.getParameter("treatId"));			
			int billId=Integer.parseInt(request.getParameter("billId"));			
			String treatIdString=request.getParameter("treatId");
			String departmentId=request.getParameter("deptId");
			int patID=Integer.parseInt(request.getParameter("patID"));
			
			NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");
			
			
			document.newPage();
			/* PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 40, 70, 10 };
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			 */

			PdfPTable HeaderTable4 = new PdfPTable(3);
			int[] headerwidth4 = { 30, 60, 20 };
			HeaderTable4.setWidths(headerwidth4);
			HeaderTable4.setWidthPercentage(95f);
			HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					
					
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
			Font bold = new Font(FontFamily.TIMES_ROMAN, 14, Font.BOLD);
			Phrase p = new Phrase();
			p.add(new Chunk(" "+hospitalName, bold));	
			p.add(new Chunk(" \n", bold));
			p.add(new Chunk(" \n"+address, tabletext));			
			p.add(new Chunk(" "+city+" Pin- "+hospitalZip, tabletext));
			p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
			p.add(new Chunk(" \n "+webste+" email: "+email, tabletext));	
			//p.add(new Chunk(" \nCIN: "+cinNo, tabletext));	
			//p.add(new Chunk(" \nSERVICE TAX NO : "+serviceTaxNo+", PAN No: "+panNo, tabletext));	
			
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
			
			document.add(HeaderTable1);
			HeaderTable1.flushContent();

			HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
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
			HeaderTable8.addCell(new Phrase("  ESTIMATE", header));			
						
			document.add(HeaderTable8);
			HeaderTable8.flushContent();		
			
 			
			//new table no 5 start
			RegistrationController uss=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
			RegTreBillDto rtd = new RegTreBillDto();			
			List<RegTreBillDto> ltPatientRecord = null;
			rtd=uss.fetchPatientsRecordByTreatmentId(treatId);
			rtd=rtd.getListRegTreBillDto().get(0);
			
			
			DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			Date date = new Date();
			String curDate=dateFormat.format(date);
			
			
			
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
			
			HeaderTable5.addCell(new Phrase("Patient Name       :", subheader));
			HeaderTable5.addCell(new Phrase(""+ rtd.getPatientName(), tabletext));			
			HeaderTable5.addCell(new Phrase("Gender     : ", subheader));
			HeaderTable5.addCell(new Phrase(""+rtd.getGender(), tabletext));
			
			HeaderTable5.addCell(new Phrase("Address.              : ", subheader));
			HeaderTable5.addCell(new Phrase(""+ rtd.getAddress(), tabletext));			
			HeaderTable5.addCell(new Phrase("Contact    : ", subheader));
			HeaderTable5.addCell(new Phrase(""+rtd.getMobile(), tabletext));
			
			HeaderTable5.addCell(new Phrase("Admission Date   : ", subheader));
			HeaderTable5.addCell(new Phrase(""+ rtd.getCreatedDateTime(), tabletext));			
			HeaderTable5.addCell(new Phrase("MRN No    : ", subheader));
			HeaderTable5.addCell(new Phrase(""+rtd.getMrnno(), tabletext));
			
			HeaderTable5.addCell(new Phrase("Date                      : ", subheader));
			HeaderTable5.addCell(new Phrase(""+curDate, tabletext));			
			HeaderTable5.addCell(new Phrase("Bill No      : ", subheader));
			HeaderTable5.addCell(new Phrase(""+ rtd.getBillId(), tabletext));
			
			/* HeaderTable5.addCell(new Phrase("Sponser               : ", subheader));
			HeaderTable5.addCell(new Phrase("", tabletext));			
			HeaderTable5.addCell(new Phrase("", subheader));
			HeaderTable5.addCell(new Phrase("", tabletext)); */
			
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
			
			HeaderTable5.addCell(new Phrase("", subheader));
			HeaderTable5.addCell(new Phrase("", subheader));
			HeaderTable5.addCell(new Phrase("", subheader));
			HeaderTable5.addCell(new Phrase("", subheader));
			
			
			
			
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
			
			//End table no 5 start
			
			
			//Start table no 7 start
			
			
			PdfPTable HeaderTable7 = new PdfPTable(1);
			int[] headerwidth7 = { 100};
			HeaderTable7.setWidths(headerwidth7);
			HeaderTable7.setWidthPercentage(95f);		
			
			HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
			HeaderTable7.addCell(new Phrase("", subheader));
			HeaderTable7.addCell(new Phrase("", subheader));
			HeaderTable7.addCell(new Phrase("", subheader));
			HeaderTable7.addCell(new Phrase("", subheader));
			
			
			HeaderTable7.addCell(new Phrase("This is certify that Mr./Mrs.  "+rtd.getPatientName(), subheader));
			
			HeaderTable7.addCell(new Phrase("is getting admitted here for the treatment of ", subheader));
			
			HeaderTable7.addCell(new Phrase("He/She will remain in the Hospital for Approximate.", subheader));
			
			
			HeaderTable7.addCell(new Phrase("", subheader));
			HeaderTable7.addCell(new Phrase("", subheader));
			HeaderTable7.addCell(new Phrase("", subheader));
			HeaderTable7.addCell(new Phrase("", subheader));
			
			
			document.add(HeaderTable7);
			HeaderTable7.flushContent();
			
			//End table no 9 start
			
			
			  BillQuotationDto billQuotationDto = (BillQuotationDto) ConfigUIJSONUtility
					.getObjectFromJSON(billquotations,
							BillQuotationDto.class);
			 

				//Start table no 2 start
			PdfPTable HeaderTable2 = new PdfPTable(4);
			int[] headerwidth2 = { 50,15,15,20};
			HeaderTable2.setWidths(headerwidth2);
			HeaderTable2.setWidthPercentage(95f);
			
			
		
			HeaderTable2.addCell(new Phrase("Services", subheader));			
			HeaderTable2.addCell(new Phrase("Rate", subheader));
			HeaderTable2.addCell(new Phrase("Qty", subheader));
			//HeaderTable2.addCell(new Phrase("", subheader));
			//HeaderTable2.addCell(new Phrase("", subheader));
			//HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("Amount", subheader));
			
			
			
			
			double tAmount=0.00f;
			
			for (int i = 0; i < billQuotationDto.getListBillquotations()
					.size(); i++) {
				
				BillQuotationDto obj1 = new BillQuotationDto();
				
				tAmount=tAmount+billQuotationDto.getListBillquotations().get(i).getAmount();
				
					HeaderTable2.addCell(new Phrase(""+billQuotationDto.getListBillquotations().get(i).getServiceName(), tabletext));
					HeaderTable2.addCell(new Phrase(""+billQuotationDto.getListBillquotations().get(i).getRate(), tabletext));
					HeaderTable2.addCell(new Phrase(""+billQuotationDto.getListBillquotations().get(i).getQuantity(), tabletext));
					HeaderTable2.addCell(new Phrase(""+billQuotationDto.getListBillquotations().get(i).getAmount(), tabletext));
				 }				
				
			
			HeaderTable2.addCell(new Phrase("", subheader));			
			HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase("Total", subheader));
			//HeaderTable2.addCell(new Phrase("", subheader));
			//HeaderTable2.addCell(new Phrase("", subheader));
			//HeaderTable2.addCell(new Phrase("", subheader));
			HeaderTable2.addCell(new Phrase(""+tAmount, subheader));
			
			document.add(HeaderTable2);
			HeaderTable2.flushContent();
			//end Table 2
			
			//Start table no 9 start
			
			
			PdfPTable HeaderTable9 = new PdfPTable(1);
			int[] headerwidth9 = { 100};
			HeaderTable9.setWidths(headerwidth9);
			HeaderTable9.setWidthPercentage(95f);		
			
			HeaderTable9.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
			HeaderTable9.addCell(new Phrase("", subheader));
			HeaderTable9.addCell(new Phrase("", subheader));
			HeaderTable9.addCell(new Phrase("", subheader));
			HeaderTable9.addCell(new Phrase("", subheader));
			
			
			HeaderTable9.addCell(new Phrase("Terms & Conditions:       ", subheader));
			
			HeaderTable9.addCell(new Phrase("1) This Estimate is given to as approximate as possible.", tabletext));
			
			HeaderTable9.addCell(new Phrase("2) If patient is High-Risk charges will be change.", tabletext));
			
			HeaderTable9.addCell(new Phrase("3) Any Emergency case will be charged extra as per Soc upto 50%.", tabletext));
			
			HeaderTable9.addCell(new Phrase("4) Estimate may vary due to increase in stay(Post Operative) or Bed Category Change lower to Higher only.", tabletext));
			
			HeaderTable9.addCell(new Phrase("5) Estimate may vary due to unincidental causes or complication that may occur.", tabletext));
			
			HeaderTable9.addCell(new Phrase("6) Estimate may vary due to other OR Special consumables Materials/Instruments/Equipments ect. used by consultant.", tabletext));
			
			HeaderTable9.addCell(new Phrase("7) Estimate may vary due to additional Surgery,Drugs,Implant,Investigation etc. ,Increase in time of surgery.", tabletext));
			
			HeaderTable9.addCell(new Phrase("8) 80% Advance is to be paid before Surgery.", tabletext));
			
			HeaderTable9.addCell(new Phrase("9) This is an Estimate not Billing or Certificate.", tabletext));
			
			HeaderTable9.addCell(new Phrase("", tabletext));
			
			HeaderTable9.addCell(new Phrase("I the undersigned                                                           	 relation", tabletext));
			HeaderTable9.addCell(new Phrase("have understood and have no objection for the above mentioned estimation details and I take full resposibility to deposit", tabletext));
			HeaderTable9.addCell(new Phrase("total estimated cost on addition/surgery. The balence if any would be further cleared befor discharge.", tabletext));
			HeaderTable9.addCell(new Phrase("Failing which may be postponed OR cancle the Treatment/Procedure.", tabletext));
			
			HeaderTable9.addCell(new Phrase("", tabletext));
			HeaderTable9.addCell(new Phrase("", tabletext));
			HeaderTable9.addCell(new Phrase("", tabletext));
			HeaderTable9.addCell(new Phrase("", tabletext));
			HeaderTable9.addCell(new Phrase("", tabletext));
			HeaderTable9.addCell(new Phrase("", tabletext));
			HeaderTable9.addCell(new Phrase("", tabletext));
			HeaderTable9.addCell(new Phrase("Prep By                                                                   Consultant                                                               Receiver Sign", tabletext));
			HeaderTable9.addCell(new Phrase(""+user_name, tabletext));
			
			HeaderTable9.getDefaultCell().setBorder(Rectangle.BOTTOM);
			HeaderTable9.addCell(new Phrase("", subheader));
			
			
			document.add(HeaderTable9);
			HeaderTable9.flushContent();
			
			//End table no 9 start
			
			
				
			
							
			document.close();

			outStream.flush();
			outStream.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	%>

</body>
</html>