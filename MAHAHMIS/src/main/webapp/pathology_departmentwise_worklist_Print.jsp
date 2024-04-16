
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="java.util.Date"%>
<%@page import="com.lowagie.text.pdf.PdfGState"%>
<%@page import="com.lowagie.text.pdf.GrayColor"%>
<%@page import="com.lowagie.text.pdf.Barcode128"%>
<%@page import="com.lowagie.text.pdf.ColumnText"%>
<%@page import="com.lowagie.text.pdf.PdfContentByte"%>
<%@page import="com.lowagie.text.PageSize"%>
<%@page import="com.lowagie.text.HeaderFooter"%>
<%@page import="com.hms.pathology.dto.PathologySampleWiseMaster"%>
<%@page import="com.hms.pathology.service.Phlebotomyservice"%>
<%@page import="com.hms.dto.LabUnitType"%>
<%@page import="com.hms.dto.Assessment"%>
<%@page import="com.hms.model.AdminModel"%>
<%@page import="com.hms.dto.Doctor"%>

<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.model.TreatmentModel"%>
<%@page import="com.hms.pharmacy.upload.FilePath"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="com.lowagie.text.Chunk,com.lowagie.text.Document,com.lowagie.text.Element,com.lowagie.text.Font
 
,com.lowagie.text.HeaderFooter,com.lowagie.text.Image,com.lowagie.text.Paragraph,com.lowagie.text.Phrase,com.lowagie.text.Rectangle
 
,com.lowagie.text.pdf.PdfPCell,com.lowagie.text.pdf.PdfPTable,com.lowagie.text.pdf.PdfWriter,com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport,
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants, com.hms.pharmacy.upload.FilePath"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@page import="java.util.Calendar"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Routine Value</title>
</head>
<body>
	<%
		try {
		/* -------------------------------------- Declaration ---------------------------------------------   */
		response.setContentType("application/pdf");
		HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
		List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
		HospitalDetails hospObj = arrHospitalDetails.get(0);

		ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String lntUnit = (String) resource.getObject("lntUnit").toString();

		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		
		Document document = new Document(PageSize.A4);
		document.setMargins(20, 20, 20, 20);
		
		Font header = new Font(Font.HELVETICA, 10, Font.BOLD);
		Font subheader = new Font(Font.HELVETICA, 8, Font.BOLD);
		Font footer = new Font(Font.HELVETICA, 8, Font.BOLD);
		header.setColor(10, 4, 2);
		Font tableheader22 = new Font(Font.HELVETICA, 20, Font.BOLD);
		Font tableheader11 = new Font(Font.HELVETICA, 12, Font.BOLD);
		Font tableheader111 = new Font(Font.HELVETICA, 12, Font.BOLD);
		Font tableheader12 = new Font(Font.COURIER, 12, Font.BOLD);
		Font tableheader13 = new Font(Font.HELVETICA, 9, Font.BOLD);
		Font tableheader = new Font(Font.HELVETICA, 12, Font.BOLD);
		Font tabletext = new Font(Font.HELVETICA, 8, Font.NORMAL);
		Font small = new Font(Font.HELVETICA, 8, Font.NORMAL);
		Image img = null;
		PdfPCell cell = null;
	
		HttpSession session1 = request.getSession();
		String user_name = (String) session1.getAttribute("userName");
		Integer userId = (Integer) session1.getAttribute("userId");
		
		int Iddepartment = Integer.parseInt(request.getParameter("Iddepartment"));
			
		PdfPTable hospitalHeader = new PdfPTable(3);
		int[] hospitalHeaderWidth = { 30, 70, 35 };
		hospitalHeader.setWidths(hospitalHeaderWidth);
		hospitalHeader.setWidthPercentage(95f);
		hospitalHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
		hospitalHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		/* -------------------------------------- End Declaration -------------------------------------------   */

		/* --------------------------------------All Services -------------------------------------------   */
		Phlebotomyservice phlebotomyservice = (ApplicationContextUtils.getApplicationContext()).getBean(Phlebotomyservice.class);
		
		
		List<PathologySampleWiseMaster> list = phlebotomyservice.getdepartmentWiseWorkList(Iddepartment, request);
		/* --------------------------------------End All Services -------------------------------------------   */
			     
		PdfWriter pdfWriter = PdfWriter.getInstance(document, outStream);

			
		// adding footer information//
		Font smallNew = new Font(Font.HELVETICA, 10, Font.BOLD);
		smallNew.setSize(8);
		String hospitaladdress1 = "Mumbai R.O.:20,Topaz Tower CHS,Near Nair Hospital Casuality Gate,Opp,Yusuf Manzil,Dr.A.Nair Road,Agripada,Mumbai Central,Mumbai-400 011."+ "\n" + "PHONE : 022-2302 3003, Mob: 98921 45371" + "\n"+ "MUMBAI * DELHI * CHANDIGARH * HALDIA" + "\n" + "Page Of ";
		HeaderFooter footerNew = new HeaderFooter(new Phrase(hospitaladdress1, smallNew), true);
		footerNew.setPageNumber(1);
		footerNew.setAlignment(Element.ALIGN_CENTER);
		footerNew.setBorderWidthBottom(0);
		document.setFooter(footerNew);
		// ending footer information//		
		
		document.open();		
		String path = hospObj.getFilePath();
		String hospitalName = hospObj.getHospitalName();
		hospitalName = hospitalName.toUpperCase();
		String address = hospObj.getHospitalAddress();
		String city = hospObj.getHospitalCity();
		String contact = hospObj.getHospitalContact();
		String path2 = application.getRealPath(path);
		
		String regno = hospObj.getHosRegNo();
		String hospitalZip = hospObj.getHospitalZip();
		String PhoneNo = hospObj.getHospitalContact();
		String secPhoneNo = hospObj.getSecPNo();
		String webste = hospObj.getWebsite();
		String email = hospObj.getHospitalEmail();
		String cinNo = hospObj.getTxtCinNo();
		String serviceTaxNo = hospObj.getTxtSerTaxNo();
		String panNo = hospObj.getPanNo();
		String hPhoneNo = PhoneNo + "/" + secPhoneNo;

		String nabh = hospObj.getNabhImagePath();
		String nabhLogo = application.getRealPath(nabh);
		String pathToWeb1 = FilePath.getBasePath();
		String path1 = "";
		if (lntUnit.equalsIgnoreCase("1")) {	
		   path1 = pathToWeb1 + "U1_L&T_community_HMI_screen_ahmednagar.jpg";
		} else if (lntUnit.equalsIgnoreCase("2")) {
		   path1 = pathToWeb1 + "U2_L&T_community_HMI_screen_andheri.jpg";
		} else if (lntUnit.equalsIgnoreCase("3")) {
		   path1 = pathToWeb1 + "U3_L&T_community_HMI_screen_chennai.jpg";
		} else if (lntUnit.equalsIgnoreCase("4")) {
		   path1 = pathToWeb1 + "U4_L&T_community_HMI_screen_coimbatore.jpg";
		} else if (lntUnit.equalsIgnoreCase("5")) {
		   path1 = pathToWeb1 + "U5_L&T_community_HMI_screen_lonavala.jpg";
		} else if (lntUnit.equalsIgnoreCase("6")) {
		   path1 = pathToWeb1 + "U6_L&T_community_HMI_screen_surat.jpg";
		} else if (lntUnit.equalsIgnoreCase("7")) {
		   path1 = pathToWeb1 + "U7_L&T_community_HMI_screen_Thane.jpg";
		} else if (lntUnit.equalsIgnoreCase("8")) {
		   path1 = pathToWeb1 + "U8_L&T_community_HMI_screen_vadodara.jpg";
		}

		img = Image.getInstance(path2);

		if (lntUnit.equalsIgnoreCase("1")) {
			img.scaleAbsolute(230, 60);
		} else if (lntUnit.equalsIgnoreCase("2")) {
			img.scaleAbsolute(230, 60);
		} else if (lntUnit.equalsIgnoreCase("3")) {
			img.scaleAbsolute(310, 60);
		} else if (lntUnit.equalsIgnoreCase("4")) {
			img.scaleAbsolute(230, 60);
		} else if (lntUnit.equalsIgnoreCase("5")) {
			img.scaleAbsolute(230, 60);
		} else if (lntUnit.equalsIgnoreCase("6")) {
			img.scaleAbsolute(310, 60);
		} else if (lntUnit.equalsIgnoreCase("7")) {
			img.scaleAbsolute(310, 60);
		} else if (lntUnit.equalsIgnoreCase("8")) {
			img.scaleAbsolute(310, 60);
		}

		cell = new PdfPCell();
		cell.addElement(new Chunk(img, 1, -45));
		cell.setBorder(Rectangle.NO_BORDER);

		Image imgNabh = null;
		PdfPCell cellNabh = null;

		imgNabh = Image.getInstance(nabhLogo);
		imgNabh.scaleAbsolute(80, 60);
		cellNabh = new PdfPCell();
		cellNabh.addElement(new Chunk(imgNabh, 5, -5));
		cellNabh.setBorder(Rectangle.NO_BORDER);
		
		Phrase p = new Phrase();
		p.add(new Chunk("" + hospitalName, header));
		p.add(new Chunk("\n\n" + "\t\t" + address, tabletext));
		p.add(new Chunk("" + city + " Pin- " + hospitalZip + "\n", tabletext));
		p.add(new Chunk("Phone No. " + hPhoneNo, tabletext));
		p.add(new Chunk("\n" + webste + "\n" + "email: " + email, tabletext));
		
		PdfPCell hospitalNameCell = new PdfPCell(p);
		hospitalNameCell.setHorizontalAlignment(Element.ALIGN_LEFT);
		hospitalNameCell.setBorder(Rectangle.NO_BORDER);
		
		if (img == null) {
			hospitalHeader.addCell(new Phrase("", header));
		} else {
			hospitalHeader.addCell(cell);
		}
		hospitalHeader.addCell("");
		hospitalHeader.addCell(hospitalNameCell);
	
		
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		hospitalHeader.addCell("");
		
		document.add(hospitalHeader);
		hospitalHeader.flushContent();

		java.util.Calendar currentDate = Calendar.getInstance();
		SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss a");
		String curr_date = dateformatter.format(currentDate.getTime());
		NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");
	
		
		PdfPTable Headertable1 = new PdfPTable(3);
		int[] HeaderWidth1 = { 30,60,30};
		Headertable1.setWidths(HeaderWidth1);
		Headertable1.setWidthPercentage(95f);
		Headertable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);	
		Headertable1.addCell(new Phrase("", subheader));
		Headertable1.addCell(new Phrase("Worksheet for COVID-19  ("+curr_date+")", header));
		Headertable1.addCell(new Phrase("", subheader));
	    
		document.add(Headertable1);
		Headertable1.flushContent();

		
		PdfPTable Headertable = new PdfPTable(8);
		int[] HeaderWidth = { 10,15,15,20,15,30,15,15};
		Headertable.setWidths(HeaderWidth);
		Headertable.setWidthPercentage(95f);
		
		Headertable.addCell(new Phrase("#", subheader));
		Headertable.addCell(new Phrase("Patient Id", subheader));
		Headertable.addCell(new Phrase("Barcode", subheader));
		
		Headertable.addCell(new Phrase("Patient Name", subheader));
		/* Headertable.addCell(new Phrase("CenterId", subheader));
		

		Headertable.addCell(new Phrase("Visit Date", subheader));
		Headertable.addCell(new Phrase("SampleId", subheader));
		Headertable.addCell(new Phrase("Refer Doctor", subheader));
		Headertable.addCell(new Phrase("Profile/Testname", subheader));
		Headertable.addCell(new Phrase("Department", subheader)); */
		
		Headertable.addCell(new Phrase("Obs", subheader));
		Headertable.addCell(new Phrase("Results", subheader));
		Headertable.addCell(new Phrase("Lis Entry", subheader));
		Headertable.addCell(new Phrase("Auth", subheader));
		

		
		
		for (int pro = 0; pro < list.size(); pro++) {
			//String datetime= new Date(list.get(pro).getCollecteddatetime()).toLocaleString();
			Integer patientId = list.get(pro).getPatientId();
			String patientName =list.get(pro).getPatientname();
			String centerId = list.get(pro).getBarCode();
			String barcode = list.get(pro).getBarCode();
			Date visitDate = list.get(pro).getCollecteddatetime();
			Integer sampleId =list.get(pro).getSampleTypeId();
			String referDoctor = list.get(pro).getDocname();
			String profiletestname = list.get(pro).getProfileName();
			String department = list.get(pro).getHeadingname();
						
			Headertable.addCell(new Phrase("" +(+pro+1) , tabletext));	    		
			Headertable.addCell(new Phrase("" + patientId, tabletext));  
			Headertable.addCell(new Phrase("" + barcode, tabletext));	
			Headertable.addCell(new Phrase("" + patientName, tabletext));
			Headertable.addCell(new Phrase("" , tabletext));
			Headertable.addCell(new Phrase("" , tabletext));
			
			Headertable.addCell(new Phrase("" , tabletext));
			Headertable.addCell(new Phrase("" , tabletext));
			/* Headertable.addCell(new Phrase("" + centerId, tabletext));	
			
					
			Headertable.addCell(new Phrase("" + visitDate, tabletext));
			Headertable.addCell(new Phrase("" + sampleId, tabletext));
			
			Headertable.addCell(new Phrase("" + referDoctor, tabletext));
			Headertable.addCell(new Phrase("" + profiletestname, tabletext));
			Headertable.addCell(new Phrase("" + department, tabletext));		 */
			document.add(Headertable);
			Headertable.flushContent();

		}
		
		

		document.close();
		outStream.close();
		outStream.flush();
			} catch (Exception e) {
		e.printStackTrace();
			}
	%>
</body>
</html>