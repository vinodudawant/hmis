<%@page import="com.hms.dto.LabUnitType"%>
<%@page import="com.hms.ehat.service.DiagnosticsService"%>
<%@page import="com.hms.dto.Assessment"%>
<%@page import="com.hms.model.AdminModel"%>
<%@page import="com.hms.dto.Doctor"%>

<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@page import="com.hms.dto.HospitalDetails"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.model.TreatmentModel"%>
<%@page import="com.hms.pharmacy.upload.FilePath"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
	import="com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
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

		response.setContentType("application/pdf");
		List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails.getHospDetails("0",request);
		HospitalDetails hospObj = arrHospitalDetails.get(0);
		
		ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String lntUnit = (String) resource.getObject("lntUnit").toString();
		
		
		ServletOutputStream outStream = response.getOutputStream();
		response.reset();
		
		Document document = new Document(PageSize.A4);
		document.setMargins(20, 20, 20, 0);

		/* -------------------------------------- Declaration ---------------------------------------------   */		
		Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
		Font subheaderBold=new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
		Font subheader = new Font(Font.FontFamily.HELVETICA, 8,Font.BOLD);
		Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);

		Font tableheader = new Font(Font.FontFamily.HELVETICA, 10,Font.BOLD);
		Font tabletext = new Font(Font.FontFamily.HELVETICA, 9,Font.NORMAL);
		Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);
		Font regular = new Font(FontFamily.TIMES_ROMAN, 10, Font.NORMAL);
		Font bold = new Font(FontFamily.TIMES_ROMAN, 10, Font.BOLD);
		Image img = null;
		PdfPCell cell = null;
		int treatmentId=Integer.parseInt(request.getParameter("treatmentId"));
		String idTreatment=request.getParameter("treatmentId");
		String callFrom=request.getParameter("callFrom");
		
		HttpSession session1 = request.getSession();
		String user_name = (String) session1.getAttribute("userName");
		Integer userId = (Integer) session1.getAttribute("userId");
		
		Integer labRequestId=Integer.parseInt(request.getParameter("labRequstId"));
		String patientType=request.getParameter("gender");
		Integer id=Integer.parseInt(request.getParameter("id"));
		Integer outmasterId=Integer.parseInt(request.getParameter("outmasteId"));
		PdfPTable hospitalHeader = new PdfPTable(3);
		int[] hospitalHeaderWidth = { 30, 70, 35 };
		hospitalHeader.setWidths(hospitalHeaderWidth);
		hospitalHeader.setWidthPercentage(95f);
		hospitalHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
		hospitalHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		PdfPTable headerTable = new PdfPTable(2);
		int[] headerTableWidth = {50,50};
		headerTable.setWidths(headerTableWidth);
		headerTable.setWidthPercentage(95f);
		headerTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		/* -------------------------------------- End Declaration -------------------------------------------   */		
		
		/* --------------------------------------All Services -------------------------------------------   */	
		

		 	TreatmentModel treatmentModel = new TreatmentModel();
		 	List<RegTreBillDto> ltPatientRecord = null;
		 	RegTreBillDto rtd = new RegTreBillDto();
			RegistrationController uss=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);	
			rtd=uss.fetchPatientsRecordByTreatmentId(treatmentId);
			rtd=rtd.getListRegTreBillDto().get(0);	
			List<Assessment> listAssessment = treatmentModel.fetchAssessment(idTreatment);
			
		/* --------------------------------------End All Services -------------------------------------------   */		
		
		
		PdfWriter.getInstance(document, outStream);
		document.open();

		//HttpSession session1 = request.getSession();
	//	String user_name = (String) session.getAttribute("userName");
		
		String path = hospObj.getFilePath();
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
		
		String nabh = hospObj.getNabhImagePath(); 
		String nabhLogo = application.getRealPath(nabh);
		

		String path1 = "";
		if(lntUnit.equalsIgnoreCase("1")){
			String pathToWeb1 = FilePath.getBasePath();
			path1 = pathToWeb1 + "U1_L&T_community_HMI_screen_ahmednagar.jpg";
			}else if(lntUnit.equalsIgnoreCase("2")){
			String pathToWeb1 = FilePath.getBasePath();
			path1 = pathToWeb1 + "U2_L&T_community_HMI_screen_andheri.jpg";
			}else if(lntUnit.equalsIgnoreCase("3")){
			String pathToWeb1 = FilePath.getBasePath();
			path1 = pathToWeb1 + "U3_L&T_community_HMI_screen_chennai.jpg";
			}else if(lntUnit.equalsIgnoreCase("4")){
			String pathToWeb1 = FilePath.getBasePath();		
			path1 = pathToWeb1 + "U4_L&T_community_HMI_screen_coimbatore.jpg";		
			}else if(lntUnit.equalsIgnoreCase("5")){
			String pathToWeb1 = FilePath.getBasePath();
			path1 = pathToWeb1 + "U5_L&T_community_HMI_screen_lonavala.jpg";
			}else if(lntUnit.equalsIgnoreCase("6")){
			String pathToWeb1 = FilePath.getBasePath();
			path1 = pathToWeb1 + "U6_L&T_community_HMI_screen_surat.jpg";
			}else if(lntUnit.equalsIgnoreCase("7")){
			String pathToWeb1 = FilePath.getBasePath();
			path1 = pathToWeb1 + "U7_L&T_community_HMI_screen_Thane.jpg";
			}else if(lntUnit.equalsIgnoreCase("8")){
			String pathToWeb1 = FilePath.getBasePath();
		 	path1 = pathToWeb1 + "U8_L&T_community_HMI_screen_vadodara.jpg";
		 }
			
			img = Image.getInstance(path1);
			
			if(lntUnit.equalsIgnoreCase("1")){
		img.scaleAbsolute(230, 60);
			} else if(lntUnit.equalsIgnoreCase("2")){
		img.scaleAbsolute(230, 60);
			} else if(lntUnit.equalsIgnoreCase("3")){
		img.scaleAbsolute(310, 60);
			} else if(lntUnit.equalsIgnoreCase("4")){
		img.scaleAbsolute(230, 60);
			} else if(lntUnit.equalsIgnoreCase("5")){
		img.scaleAbsolute(230, 60);
			} else if(lntUnit.equalsIgnoreCase("6")){
		img.scaleAbsolute(310, 60);
			} else if(lntUnit.equalsIgnoreCase("7")){
		img.scaleAbsolute(310, 60);
			} else if(lntUnit.equalsIgnoreCase("8")){
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
			
		java.util.Calendar currentDate = Calendar.getInstance();
		SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss a");
		String curr_date = dateformatter.format(currentDate.getTime());
		NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");
			
		
		// For hospital address and Logo details start	
		hospitalHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		hospitalHeader.addCell(new Phrase("", header));
		hospitalHeader.addCell(new Phrase("", header));
		hospitalHeader.addCell(new Phrase("", header));
		hospitalHeader.addCell(new Phrase("", header));
		hospitalHeader.addCell(new Phrase("", header));
		hospitalHeader.addCell(new Phrase("", header));
		hospitalHeader.addCell(new Phrase("", header));
		hospitalHeader.addCell(new Phrase("", header));
		hospitalHeader.addCell(new Phrase("", header));
		
		document.add(hospitalHeader);
		hospitalHeader.flushContent();
		
		if (img == null) {
			hospitalHeader.addCell(new Phrase("", header));
		} else {
			hospitalHeader.addCell(cell);
		}
		
		Phrase p = new Phrase();
		p.add(new Chunk(""+hospitalName, bold));			
		p.add(new Chunk("\n\n"+"\t\t"+address, tabletext));			
		p.add(new Chunk(""+city+" Pin- "+hospitalZip+"\n", tabletext));
		p.add(new Chunk("Phone No. "+hPhoneNo, tabletext));	
		p.add(new Chunk("\n"+webste+"\n"+"email: "+email, tabletext));
		
		PdfPCell hospitalNameCell = new PdfPCell(p);				
		hospitalNameCell.setHorizontalAlignment(Element.ALIGN_LEFT);
		hospitalNameCell.setBorder(Rectangle.NO_BORDER);
		hospitalHeader.addCell("");
		hospitalHeader.addCell(hospitalNameCell);
		document.add(hospitalHeader);
		hospitalHeader.flushContent();

		
		PdfPTable patientDetailsHeader = new PdfPTable(4);		
		int[] patientDetailsHeaderWidth = {15,40,15,30};
		patientDetailsHeader.setWidths(patientDetailsHeaderWidth);
		patientDetailsHeader.setWidthPercentage(95f);	
		patientDetailsHeader.getDefaultCell().setBorder(Rectangle.BOTTOM);
		patientDetailsHeader.addCell(new Phrase("", tabletext));
		patientDetailsHeader.addCell(new Phrase("", tabletext));
		patientDetailsHeader.addCell(new Phrase("", tabletext));
		patientDetailsHeader.addCell(new Phrase("", tabletext));
		
		patientDetailsHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		patientDetailsHeader.addCell(new Phrase("Patient Name ", subheader));
		patientDetailsHeader.addCell(new Phrase(": "+ rtd.getPatientName(), tabletext));			
		patientDetailsHeader.addCell(new Phrase("Consultant Name ", subheader));
		patientDetailsHeader.addCell(new Phrase(": "+(rtd.getDocName()==null ? "-" : ""), tabletext));
		
		patientDetailsHeader.addCell(new Phrase("OPD No  ", subheader));
		patientDetailsHeader.addCell(new Phrase(": "+ rtd.getOpdipdno(), tabletext));			
		patientDetailsHeader.addCell(new Phrase("Age / Gender   ", subheader));
		patientDetailsHeader.addCell(new Phrase(": "+rtd.getAge()+"/"+rtd.getGender(), tabletext));
		
		patientDetailsHeader.addCell(new Phrase("Admission Date  ", subheader));
		patientDetailsHeader.addCell(new Phrase(": "+ rtd.getCreatedDateTime(), tabletext));	
		patientDetailsHeader.addCell(new Phrase("Bill No. ", subheader));
		patientDetailsHeader.addCell(new Phrase(": "+ rtd.getBillId(), tabletext));
		
		
		
		patientDetailsHeader.getDefaultCell().setBorder(Rectangle.BOTTOM);
		patientDetailsHeader.addCell(new Phrase("", tabletext));
		patientDetailsHeader.addCell(new Phrase("", tabletext));
		patientDetailsHeader.addCell(new Phrase("", tabletext));
		patientDetailsHeader.addCell(new Phrase("", tabletext));
		
		patientDetailsHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);	
		patientDetailsHeader.addCell(new Phrase("", tabletext));
		patientDetailsHeader.addCell(new Phrase("", tabletext));
		patientDetailsHeader.addCell(new Phrase("", tabletext));
		patientDetailsHeader.addCell(new Phrase("", tabletext));
		
		document.add(patientDetailsHeader);
		patientDetailsHeader.flushContent();
		
		DiagnosticsService diagnosticsService=(ApplicationContextUtils.getApplicationContext()).getBean(DiagnosticsService.class);
		List<LabUnitType> list=diagnosticsService.getRoutinevalueOutSourceResut(id,treatmentId,labRequestId,outmasterId,patientType);
		
		

		PdfPTable Headertable1 = new PdfPTable(2);		
		int[] HeaderWidth1 = {40,60};
		Headertable1.setWidths(HeaderWidth1);
		Headertable1.setWidthPercentage(95f);	
		Headertable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		Headertable1.addCell(new Phrase("", tabletext));
		Headertable1.addCell(new Phrase("", tabletext));
		
		
		PdfPTable Headertable = new PdfPTable(5);		
		int[] HeaderWidth = {10, 30, 20, 20, 20};
		Headertable.setWidths(HeaderWidth);
		Headertable.setWidthPercentage(95f);	
		Headertable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));


		PdfPTable Headertable2 = new PdfPTable(3);		
		int[] HeaderWidth2 = {35,35,30};
		Headertable2.setWidths(HeaderWidth2);
		Headertable2.setWidthPercentage(95f);	
		Headertable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		
		
		
		
		for(int pro = 0;pro< list.size();pro++){
			
		
			String proname=list.get(pro).getProfilename();
			String pkgname = list.get(pro).getPkgName();
			
			String Profile=proname +"-" +pkgname;
			
			Headertable1.addCell(new Phrase("", tabletext));
		    Headertable1.addCell(new Phrase(""+Profile, header));
			
			 document.add(Headertable1);
			 Headertable1.flushContent();
			
				Headertable.addCell(new Phrase("", tabletext));
			    Headertable.addCell(new Phrase("", tabletext));
				Headertable.addCell(new Phrase("", tabletext));
				Headertable.addCell(new Phrase("", tabletext));
				Headertable.addCell(new Phrase("", tabletext));
				
				
			Headertable.addCell(new Phrase("", tabletext));
			Headertable.addCell(new Phrase("Test Name", subheader));
			Headertable.addCell(new Phrase("Test Result", subheader));
			Headertable.addCell(new Phrase("Normal Values",subheader ));
			Headertable.addCell(new Phrase("Units", subheader));
			
		for ( int i = 0; i < list.get(pro).getTestli().size(); i++) {
				 //if (list.get(i).getTestId()!= 0) {
					 
					  String TestName = list.get(pro).getTestli().get(i).getTestname();
					  String TestResult =list.get(pro).getTestli().get(i).getTestResult();
					  String LowValues = list.get(pro).getTestli().get(i).getLowvalue();
					  String HighValues =list.get(pro).getTestli().get(i).getHighvalue();
					  String NormalValues = LowValues+"-"+HighValues;
					  String methodname=list.get(pro).getTestli().get(i).getMethodname();
					  System.out.println(NormalValues+"NormalValuesNormalValues");
					  String Units = list.get(pro).getTestli().get(i).getUnitname();
					 
						Headertable.addCell(new Phrase("", tabletext));

					 if(TestName!= null || !TestName.equalsIgnoreCase("null")){
					    Headertable.addCell(new Phrase(""+TestName, tabletext));
					 }
					 else{
						    Headertable.addCell(new Phrase("-", tabletext));
					 }
					 
					 
					  if(TestResult== null || TestResult.equalsIgnoreCase("null") || TestResult.equalsIgnoreCase("")){
						Headertable.addCell(new Phrase("-", tabletext));
					 }else if(Double.parseDouble(TestResult) < Double.parseDouble(LowValues)  || Double.parseDouble(TestResult) > Double.parseDouble(HighValues)) 
					 {
							Headertable.addCell(new Phrase(""+TestResult, bold));
					 }
					 else{
							Headertable.addCell(new Phrase(""+TestResult, tabletext));
					 } 
				//	 Headertable.addCell(new Phrase("-", tabletext));
					 
					 if(NormalValues== null || NormalValues.equalsIgnoreCase("null") || NormalValues.equalsIgnoreCase(""))
						 {
								Headertable.addCell(new Phrase("-", tabletext)); 
						 }else{
						Headertable.addCell(new Phrase(""+NormalValues, tabletext));
					 }
					 if(NormalValues== null || NormalValues.equalsIgnoreCase("null") || NormalValues.equalsIgnoreCase("")){
							Headertable.addCell(new Phrase("-", tabletext)); 

					 }else
					 {
							Headertable.addCell(new Phrase(""+Units, tabletext));
 
					 }
						
						Headertable.addCell(new Phrase("", tabletext));
						
						
						 if(methodname== null || methodname.equalsIgnoreCase("null") || methodname.equalsIgnoreCase("")|| methodname.equalsIgnoreCase("-")){
								Headertable.addCell(new Phrase(" ", tabletext)); 

						 }else
						 {
							 Headertable.addCell(new Phrase(""+"("+methodname+")", tabletext));
	 
						 }
						
						
						
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));

						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						Headertable.addCell(new Phrase("", tabletext));
						 document.add(Headertable);
						 Headertable.flushContent();
				
 }
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		Headertable.addCell(new Phrase("", tabletext));
		 document.add(Headertable);
		 Headertable.flushContent();
     
		}
		
		   String signature = "";
	        String actualpath="";
	        int IdPathologist=0;
	        
				
					AdminModel admodel = new AdminModel();
	 				Doctor doc1 = new Doctor();
	 				List<Doctor> listDoc = null;
	 				listDoc = admodel.getDoctorsDetails(userId);
	 				signature = listDoc.get(0).getDocsign();
	 				
	               Image imgsign = null;
	               PdfPCell cellsign = null;
	               String actual = FilePath.getUPLOADDOC();
	               actualpath = actual + signature;
	               if(!signature.equals("-"))
	               {
	               try {
	                   //String pathsign = application.getRealPath(actualpath);
	                   imgsign = Image.getInstance(actualpath);
	                   imgsign.scaleAbsolute(80, 50);
	                   cellsign = new PdfPCell();
	                   cellsign.addElement(new Chunk(imgsign, 5, -5));
	                   cellsign.setBorder(Rectangle.NO_BORDER);
	              			 } catch (Exception e) {
	                   e.printStackTrace();
	               	}
	               }
	               
	       		Headertable2.addCell(new Phrase("", tabletext));
	    		Headertable2.addCell(new Phrase("", tabletext));
	               if (imgsign == null) {
	            	   Headertable2.addCell(new Phrase("", tabletext));
	           
	               } else {
	            	   Headertable2.addCell(cellsign);
	               } 
	               
	       		Headertable2.addCell(new Phrase("", tabletext));
	       		Headertable2.addCell(new Phrase("", tabletext));
	    		Headertable2.addCell(new Phrase(""+user_name +"\n"+listDoc.get(0).getDesignation()+"\n"+"MCI Reg.No :" +listDoc.get(0).getRegNo(), header));
	          	 document.add(Headertable2);
	          	Headertable2.flushContent();
		
		
		
		 document.close();
         outStream.close();
         outStream.flush();
		} catch (Exception e) {
			e.printStackTrace();
		}
		%>
</body>
</html>