<%@page import="com.hms.opdbill.service.OpdBillService"%>
<%@page import="com.hms.opdbill.dto.PatientHeaderInfoDto"%>
<%@page import="com.hms.users.service.UsersService"%>
<%@page import="com.hms.ehat.dto.MlcDetailsDto"%>
<%@page import="com.hms.registration.service.RegistrationService"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%-- <%@page import="com.sun.org.apache.xpath.internal.operations.Mod"%> --%>
<%@ page import = "java.util.ResourceBundle" %>
<%@page import="com.hms.dto.MLCDetail"%>
<%@ page import="com.hms.dto.Doctor"%>
<%@ page import="com.hms.model.ChannelingModel"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.util.List"%>
<%@ page import="com.hms.dto.MLCDetail" %>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"
	import="com.itextpdf.text.*, java.io.*, javax.imageio.ImageIO, java.awt.image.BufferedImage, javax.swing.ImageIcon, com.itextpdf.text.pdf.*, java.util.Map,
    java.sql.*, java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition,com.hms.pharmacy.upload.FilePath"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Case Paper</title>
</head>
<body>
	<%
		try {
			response.setContentType("application/pdf");

			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String billPrint = (String) resourceBundle.getObject("billPrint").toString();
			String billPrintsHeader = (String) resourceBundle.getObject("billPrintsHeader").toString();	
			

			//for centerpatientId
		    String patientId= resourceBundle.getObject("patientIdLabel").toString();
			

			ServletOutputStream outStream = response.getOutputStream();
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			document.setMargins(20, 20, 20, 0);

			PdfWriter.getInstance(document, outStream);
			document.open();
			//font
			session = request.getSession();
			String user_name = (String) session.getAttribute("userName");
			
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

			String radioValue = request.getParameter("radioValue");
			String numberOf = request.getParameter("numberOf");
			java.util.Calendar currentDate = Calendar.getInstance();
			SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy hh:mm a");
			String curr_date = dateformatter.format(currentDate.getTime());
			
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
				cell.addElement(new Chunk(img, 1, -25));
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
			
			
			document.newPage();

			String readImagePath = FilePath.getBasePath();
			String withPhoto = request.getParameter("withPhoto");
			ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String serviceWiseBillingFlow=resource.getString("serviceWiseBillingFlow");
			String billCategoryDisc = request.getParameter("billCategoryDisc");
			
			/***@author  :BILAL
				@Date    :27-10-2017
			    @Code    :Getting Dynamic data of patient 
			***/
			String docDepartment = request.getParameter("docDept");
			String Department = request.getParameter("Department");
			String Consultant = request.getParameter("Consultant");
			String TreatmentId = request.getParameter("treatmentId");
			String drid = request.getParameter("drid");
			String profilePhoto = request.getParameter("image");
			String tokenNo = request.getParameter("tkn");
			
			Integer treatmentId = Integer.parseInt(TreatmentId);
			Integer doctorId = Integer.parseInt(drid);
			//calling service leyer method to get patient records
			//RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
			//List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>(); 
			//ltRegMasterDto =us.fetchPatientsRecordByTreatmentId(treatmentId);
			List<PatientHeaderInfoDto> ltRegMasterDto = null;
			OpdBillService opdService = (ApplicationContextUtils.getApplicationContext()).getBean(OpdBillService.class);
			PatientHeaderInfoDto rtd = new PatientHeaderInfoDto();	
			rtd.setTreatmentId(treatmentId);
			rtd = opdService.getPatientInfoByTreatmentId(rtd);
			
			ltRegMasterDto = rtd.getListRegTreBillDto();
			
			//rtd = rtd.getListRegTreBillDto().get(0);
					
			
			Integer billId =ltRegMasterDto.get(0).getBillId();
			Integer PatientID=ltRegMasterDto.get(0).getPatientId();
			Integer departmentId=ltRegMasterDto.get(0).getDepartmentId();
			String pname  =ltRegMasterDto.get(0).getPatientName();
			String MRNo   =ltRegMasterDto.get(0).getMrnno();
			String age	  =ltRegMasterDto.get(0).getAge();
			String gender =ltRegMasterDto.get(0).getGender();
			String AgeSexWt=age+" /"+gender;
			String treatmentCount =ltRegMasterDto.get(0).getTrcount();
			String ContactNo =ltRegMasterDto.get(0).getMobile();
			int Departmentid =ltRegMasterDto.get(0).getDepartmentId();
			String TokenNo   =ltRegMasterDto.get(0).getTokenno();
			Date appDate   =ltRegMasterDto.get(0).getCreatedDateTime();
			String opdipdno =ltRegMasterDto.get(0).getOpdipdno();
			
			String signature = "";
            String actualpath="";
			
			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy hh:mm a");
			String appDateTm = sdf.format(appDate);
			
			/* String[] opdno = {};
			if(opdipdno.contains("/")){
				opdno=opdipdno.split("/");
			}
			String uNamee=opdno[0].toString();
			String uName="";
			System.err.println("=-=-=-=-"+uNamee);
			if(uNamee.equalsIgnoreCase("Shr")){
				uName="Sh";
			}
			System.err.println("=-=-=-=-"+uName); */
			
			String weight = String.valueOf(ltRegMasterDto.get(0).getWeight());
			String height = String.valueOf(ltRegMasterDto.get(0).getHeight());
			String wetHeg = weight+" /"+height;
			//String depNameDoc  	=ltRegMasterDto.get(0).getDepartmentNameDoc();
			String depNameDoc = docDepartment;
			if(depNameDoc==null){
				depNameDoc="-";
			}
			
			String age2	  =ltRegMasterDto.get(0).getAge2();
			String dob    = ltRegMasterDto.get(0).getDob();
			if(dob.equals("") || dob.equals(null)){
				AgeSexWt = age2+"    "+gender;
			}
			
			 int stateId = ltRegMasterDto.get(0).getStateId();
			 int townId   =ltRegMasterDto.get(0).getTownId();
			 int districtId =ltRegMasterDto.get(0).getDistrictId();
			 int talukaId   =ltRegMasterDto.get(0).getTalukaId();
			 int sponsorSlave=ltRegMasterDto.get(0).getChargesMasterSlaveId();
			 
			 String nabh1 = ltRegMasterDto.get(0).getImageName();			 
			 String pathToWeb = FilePath.getBasePath();
			 String address2 = ltRegMasterDto.get(0).getAddress();
				//File f = new File(pathToWeb + File.separator + nabh1);
				
				pathToWeb=pathToWeb + File.separator + nabh1;			
				String nabhLogo1 = application.getRealPath(nabh1);
				
				Image img1 = null;
				PdfPCell cell1 = null;
				
				Image imgNabh1 = null;
				PdfPCell cellNabh1 = null;
				try {
					imgNabh1 = Image.getInstance(pathToWeb);
					imgNabh1.scaleAbsolute(80, 60);
					cellNabh1 = new PdfPCell();
					cellNabh1.addElement(new Chunk(imgNabh1, 5, -50));
					cellNabh1.setBorder(Rectangle.NO_BORDER);
				} catch (Exception e) {
					e.printStackTrace();
				} 
				
			 
			 //Patient Address.
			 String perstate  ="";
			 String perdistrict  ="";
			 String percityObj  ="";
			 String pertaluka  ="";
			 String BillCategoryName ="";
			 String state  ="";
			 String district  ="";
			 String cityObj  ="";
			 String taluka  ="";
			 String patientAdd = "";
			 String perPatientAdd = "";
			 String relativeName ="";
			 int relationId=0;
			 String relation="";
				
			 relationId= ltRegMasterDto.get(0).getRelationId();
			 patientAdd = ltRegMasterDto.get(0).getAddress();
			 perPatientAdd = ltRegMasterDto.get(0).getPerAddress();
			 relativeName = ltRegMasterDto.get(0).getRelativeName();
			 int perstateId = ltRegMasterDto.get(0).getPerstateId();
			 int pertownId   =ltRegMasterDto.get(0).getPertownId();
			 int perdistrictId =ltRegMasterDto.get(0).getPerdistrictId();
			 int pertalukaId   =ltRegMasterDto.get(0).getPertalukaId();
			 String regDate = dateformatter.format(ltRegMasterDto.get(0).getCreatedDateTime());
			 
			 if(relationId==1){
					relation="S/O";
				}else if(relationId==2){
					relation="W/O";
				}else if(relationId==3){
					relation="D/O";
				}else if(relationId==4){
					relation="F/O";
				}else if(relationId==5){
					relation="Late S/O";
				}else if(relationId==6){
					relation="Late W/O";
				}else if(relationId==7){
					relation="Late D/O";
				}else if(relationId==8){
					relation="Owner";
				}
			 
			LabService fetchlist=(ApplicationContextUtils.getApplicationContext()).getBean(LabService.class);	
			AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
			List<ChargesMasterSlave> fetchsposor = new ArrayList<ChargesMasterSlave>();
			
			if(doctorId > 0){
				Consultant   = fetchlist.getStringValOfObject("doctor","doc_name",doctorId,"Doctor_ID");
			}
			
			if(sponsorSlave > 0){
				fetchsposor   = obj.fetchSuperCatofchargesSlave(sponsorSlave);
				//BillCategoryName =fetchsposor.get(0).getCategoryName();
				BillCategoryName = fetchlist.getStringValOfObject("ehat_charges_master_slave","category_name",sponsorSlave,"id");
			}else{
				BillCategoryName   = "Self";
			}
			if(stateId > 0 ){
				state   = fetchlist.getStringValOfObject("state","state_name",stateId,"idstate");
			}else{
				state   = "";
			}
			if(districtId > 0){
				district = fetchlist.getStringValOfObject("district","dis_name",districtId,"iddistrict"); 
			}else{
				district   = "";
			}
			
			if(townId > 0){
				cityObj = fetchlist.getStringValOfObject("city","city_name",townId,"idcity");
			}else{
				cityObj   = "";
			}
			
			if(talukaId > 0){
				taluka  = fetchlist.getStringValOfObject("taluka","taluka_name",talukaId,"idtaluka"); 
			}else{
				taluka   = "";
			}
		    
			if(perstateId > 0 ){
				 perstate   = fetchlist.getStringValOfObject("state","state_name",perstateId,"idstate");
				}else{
					//perstate   = "Maharashtra";
				}
				if(perdistrictId > 0){
					perdistrict = fetchlist.getStringValOfObject("district","dis_name",perdistrictId,"iddistrict"); 
				}else{
					//perdistrict   = "Pune";
				}
				
				if(pertownId > 0){
					percityObj = fetchlist.getStringValOfObject("city","city_name",pertownId,"idcity");
				}else{
					percityObj   = "";
				}
				
				if(pertalukaId > 0){
					pertaluka  = fetchlist.getStringValOfObject("taluka","taluka_name",pertalukaId,"idtaluka"); 
				}else{
					pertaluka   = "";
				}	
			//String zipCode = fetchlist.getStringValOfObject("district","dis_name",districtId,"iddistrict");
			 
		
			if(withPhoto.equals("1")){

				
				PdfPTable HeaderTable2 = new PdfPTable(5);
				int[] headerwidth2 = { 20, 20, 40, 20, 20 };
				HeaderTable2.setWidths(headerwidth2);
				HeaderTable2.setWidthPercentage(95f);
				HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
				

				
				PdfPTable HeaderTable1 = new PdfPTable(3);
				int[] headerwidth1 = { 30, 80, 20 };
				HeaderTable1.setWidths(headerwidth1);
				HeaderTable1.setWidthPercentage(95f);
				HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
				HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				document.add(HeaderTable1);
				HeaderTable1.flushContent();

				if (img == null) {
					
					HeaderTable1.addCell(new Phrase("", header));
				} else {
					
					HeaderTable1.addCell(cell);
				}		 
				
				Font regular = new Font(FontFamily.TIMES_ROMAN, 11, Font.NORMAL);
				Font bold = new Font(FontFamily.TIMES_ROMAN, 12, Font.BOLD);
				Phrase p = new Phrase();
				p.add(new Chunk(" "+hospitalName, bold));			
				p.add(new Chunk(" \n\n"+address, tabletext));			
				p.add(new Chunk(" "+city+" Pin- "+hospitalZip, tabletext));
				p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
				p.add(new Chunk(" \n "+webste+" email: "+email, tabletext));	
				//p.add(new Chunk(" \nPan No: "+panNo, tabletext));	
				
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
				

				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("OPD CASE PAPER", header));
				HeaderTable2.addCell(new Phrase("Print Date and Time :", subheader));
				HeaderTable2.addCell(new Phrase(""+curr_date, subheader));
				document.add(HeaderTable2);
				HeaderTable2.flushContent();

				PdfPTable HeaderTable3 = new PdfPTable(5);
				int[] headerwidth3 = { 20, 30, 20, 30, 20 };
				HeaderTable3.setWidths(headerwidth3);
				HeaderTable3.setWidthPercentage(95f);
				HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				HeaderTable3.addCell(new Phrase("", header));
				HeaderTable3.addCell(new Phrase("", header));
				HeaderTable3.addCell(new Phrase("", header));
				HeaderTable3.addCell(new Phrase("", header));
				HeaderTable3.addCell(new Phrase("", header));
				HeaderTable3.addCell(new Phrase("", header));

				document.add(HeaderTable3);
				HeaderTable3.flushContent();
				
				if(imgNabh1 != null){
					PdfPTable HeaderTable4 = new PdfPTable(5);
					int[] headerwidth4 = {  15, 25, 15, 25,20 };
					HeaderTable4.setWidths(headerwidth4);
					HeaderTable4.setWidthPercentage(95f);
					HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					
					
					HeaderTable4.addCell(new Phrase("Patient Name", subheader));
					HeaderTable4.addCell(new Phrase(": "+ pname, tabletext));
				/* 	HeaderTable4.addCell(new Phrase("SH ID", subheader));
					HeaderTable4.addCell(new Phrase(": " + PatientID, tabletext)); */
					HeaderTable4.addCell(new Phrase(""+patientId, subheader));
					HeaderTable4.addCell(new Phrase(": " +ltRegMasterDto.get(0).getCenterPatientId(), tabletext)); 
					cellNabh1.setRowspan(20);
					HeaderTable4.addCell(cellNabh1);
					
					
					/* HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header)); */
					
					
					HeaderTable4.addCell(new Phrase("Age/Gender", subheader));
					HeaderTable4.addCell(new Phrase(": "+ AgeSexWt, tabletext));
					HeaderTable4.addCell(new Phrase("Contact No", subheader));
					HeaderTable4.addCell(new Phrase(": " + ContactNo, tabletext));
					
					/* HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header)); */
					
					HeaderTable4.addCell(new Phrase("OPD No", subheader));
					HeaderTable4.addCell(new Phrase(": " +opdipdno, tabletext));
					HeaderTable4.addCell(new Phrase("MRN No", subheader));
					HeaderTable4.addCell(new Phrase(": " + MRNo, tabletext)); 
					
					/* HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header)); */
					
				    HeaderTable4.addCell(new Phrase("Treatment Id", subheader));
					HeaderTable4.addCell(new Phrase(": " + TreatmentId, tabletext)); 
					HeaderTable4.addCell(new Phrase("Token No", subheader));
					HeaderTable4.addCell(new Phrase(": " + tokenNo, tabletext));
					
					/* HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header)); */
					// patient address
					String addressPatient = "";
					String per_patient_address = "";
					
					addressPatient=addressPatient + address2+", ";
					
					if(cityObj != "0" && !cityObj.equals("undefined") && !cityObj.equals("")){
						addressPatient += cityObj;
					}
					
					if (taluka != "0" && !taluka.equals("undefined") && !taluka.equals("")) 
					{
						addressPatient +=  (" "+taluka);
					}						
					if (district != "0" && !district.equals("undefined") && !district.equals("")) 
					{
						addressPatient += (", " + district);
					}
					if (state != "0" && !state.equals("undefined") && !state.equals("")) 
					{
						addressPatient += (", " + state);
					}
					// end : patient address
					
					// Strat : permanant patient address
					if(percityObj != "0" && !percityObj.equals("undefined") && !percityObj.equals("")){
						per_patient_address += percityObj;
					}
					
					if (pertaluka != "0" && !pertaluka.equals("undefined") && !pertaluka.equals("")) 
					{
						per_patient_address +=  (" "+pertaluka);
					}						
					if (perdistrict != "0" && !perdistrict.equals("undefined") && !perdistrict.equals("")) 
					{
						per_patient_address += (" " + perdistrict);
					}
					if (perstate != "0" && !perstate.equals("undefined") && !perstate.equals("")) 
					{
						per_patient_address += ("," + perstate);
					}
					// end : permanant patient address
						
					
					if(addressPatient == "" && addressPatient.equals("undefined"))
					{
						HeaderTable4.addCell(new Phrase("Res. Address", subheader));
						HeaderTable4.addCell(new Phrase(": ", tabletext));
					}else{
						HeaderTable4.addCell(new Phrase("Res. Address", subheader));
						HeaderTable4.addCell(new Phrase(": "+addressPatient, tabletext));
					}
					
					/* if(relativeName != null && relativeName !="" && relativeName!="undefined")
					{
						HeaderTable4.addCell(new Phrase("Relative Name", subheader));
						HeaderTable4.addCell(new Phrase(": "+relation+"-"+relativeName, tabletext));
					} else{
						HeaderTable4.addCell(new Phrase("Relative Name", subheader));
						HeaderTable4.addCell(new Phrase(": ", tabletext));
					} */
					
					if(per_patient_address != null && perPatientAdd !=null && !perPatientAdd.equalsIgnoreCase("") || !per_patient_address.equalsIgnoreCase("") && !per_patient_address.equalsIgnoreCase(null) && !per_patient_address.equals("undefined"))
					{
						HeaderTable4.addCell(new Phrase("Per. Address",	subheader));		
						HeaderTable4.addCell(new Phrase(": "+perPatientAdd+" "+ per_patient_address, tabletext));
					}else{
						HeaderTable4.addCell(new Phrase("Per. Address",	subheader));		
						HeaderTable4.addCell(new Phrase(": ", tabletext));
					}					
					
					HeaderTable4.addCell(new Phrase("Consultant", subheader));
					HeaderTable4.addCell(new Phrase(": " + Consultant, tabletext));	
					
					HeaderTable4.addCell(new Phrase("Ref. By", subheader));
					HeaderTable4.addCell(new Phrase(": " + ltRegMasterDto.get(0).getReferDoctorName() , tabletext));
										
					if(resourceBundle.getObject("shraddha").toString().equalsIgnoreCase("off")){
						HeaderTable4.addCell(new Phrase("Weight", subheader));
						HeaderTable4.addCell(new Phrase(": "+ weight, tabletext));
						HeaderTable4.addCell(new Phrase("Height", subheader));
						HeaderTable4.addCell(new Phrase(": " +height, tabletext));	
					}
								/* HeaderTable4.addCell(new Phrase("", header));
					
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header)); */
					
					
					HeaderTable4.addCell(new Phrase("Department", subheader));
					HeaderTable4.addCell(new Phrase(": " + Department+"/"+depNameDoc, tabletext));
					
					if(BillCategoryName != null && BillCategoryName !="" && BillCategoryName!="undefined")
					{
						HeaderTable4.addCell(new Phrase("Sponsor", subheader));
						HeaderTable4.addCell(new Phrase(": "+BillCategoryName, tabletext));
					} else{
						HeaderTable4.addCell(new Phrase("Sponsor", subheader));
						HeaderTable4.addCell(new Phrase(": ", tabletext));
					}
					
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					
					document.add(HeaderTable4);
					HeaderTable4.flushContent();

					HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable1.addCell(new Phrase("", header));
					HeaderTable1.addCell(new Phrase("", header));
					HeaderTable1.addCell(new Phrase("", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();
				} else{
					
					PdfPTable HeaderTable4 = new PdfPTable(4);
					int[] headerwidth4 = { 15, 35, 15, 35 };
					HeaderTable4.setWidths(headerwidth4);
					HeaderTable4.setWidthPercentage(95f);
					HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					
					HeaderTable4.addCell(new Phrase("Patient Name", subheader));
					HeaderTable4.addCell(new Phrase(": " + pname, tabletext));
				/* 	HeaderTable4.addCell(new Phrase("SH ID", subheader));
					HeaderTable4.addCell(new Phrase(": " + PatientID, tabletext)); */
					HeaderTable4.addCell(new Phrase(""+patientId, subheader));
					HeaderTable4.addCell(new Phrase(": " +ltRegMasterDto.get(0).getCenterPatientId(), tabletext)); 
					
					
					
					/* HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header)); */
					
					
					HeaderTable4.addCell(new Phrase("Age/Gender", subheader));
					HeaderTable4.addCell(new Phrase(": " + AgeSexWt, tabletext));
					HeaderTable4.addCell(new Phrase("OPD No", subheader));
					HeaderTable4.addCell(new Phrase(": " +opdipdno, tabletext));
				
					/* 
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header)); */
					
					HeaderTable4.addCell(new Phrase("Contact No", subheader));
					HeaderTable4.addCell(new Phrase(": " + ContactNo, tabletext));
					HeaderTable4.addCell(new Phrase("Treatment Id", subheader));
					HeaderTable4.addCell(new Phrase(": " + TreatmentId, tabletext)); 
					
					/* HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header)); */
					
					HeaderTable4.addCell(new Phrase("Department", subheader));
					HeaderTable4.addCell(new Phrase(": " + Department+"/"+depNameDoc, tabletext));
					HeaderTable4.addCell(new Phrase("Token No", subheader));
					HeaderTable4.addCell(new Phrase(": " + tokenNo, tabletext));
					
					HeaderTable4.addCell(new Phrase("MRN No", subheader));
					HeaderTable4.addCell(new Phrase(": " + MRNo, tabletext)); 
					
					
					// patient address
					String addressPatient = "";
					String per_patient_address = "";
					addressPatient=addressPatient + address2+", ";
					
					if(cityObj != "0" && !cityObj.equals("undefined") && !cityObj.equals("")){
						addressPatient += cityObj;
					}
					
					if (taluka != "0" && !taluka.equals("undefined") && !taluka.equals("")) 
					{
						addressPatient +=  (" "+taluka);
					}						
					if (district != "0" && !district.equals("undefined") && !district.equals("")) 
					{
						addressPatient += ("  " + district);
					}
					if (state != "0" && !state.equals("undefined") && !state.equals("")) 
					{
						addressPatient += (", " + state);
					}
					// end : patient address
					
					// Strat : permanant patient address
					if(percityObj != "0" && !percityObj.equals("undefined") && !percityObj.equals("")){
						per_patient_address += percityObj;
					}
					
					if (pertaluka != "0" && !pertaluka.equals("undefined") && !pertaluka.equals("")) 
					{
						per_patient_address +=  (" "+pertaluka);
					}						
					if (perdistrict != "0" && !perdistrict.equals("undefined") && !perdistrict.equals("")) 
					{
						per_patient_address += (" " + perdistrict);
					}
					if (perstate != "0" && !perstate.equals("undefined") && !perstate.equals("")) 
					{
						per_patient_address += ("," + perstate);
					}
					// end : permanant patient address
						
					if(addressPatient == "" && addressPatient.equals("undefined"))
					{
						HeaderTable4.addCell(new Phrase("Res. Address", subheader));
						HeaderTable4.addCell(new Phrase(": ", tabletext));
					}else{
						HeaderTable4.addCell(new Phrase("Res. Address", subheader));
						HeaderTable4.addCell(new Phrase(": "+addressPatient, tabletext));
					}
					
					if(BillCategoryName != null && BillCategoryName !="" && BillCategoryName!="undefined")
					{
						HeaderTable4.addCell(new Phrase("Sponsor", subheader));
						HeaderTable4.addCell(new Phrase(": "+BillCategoryName, tabletext));
					} else{
						HeaderTable4.addCell(new Phrase("Sponsor", subheader));
						HeaderTable4.addCell(new Phrase(": ", tabletext));
					}
					
					if(per_patient_address != null && perPatientAdd !=null && !perPatientAdd.equalsIgnoreCase("") || !per_patient_address.equalsIgnoreCase("") && !per_patient_address.equalsIgnoreCase(null) && !per_patient_address.equals("undefined"))
					{
						HeaderTable4.addCell(new Phrase("Per. Address",	subheader));		
						HeaderTable4.addCell(new Phrase(": "+perPatientAdd+" "+ per_patient_address, tabletext));
					}else{
						HeaderTable4.addCell(new Phrase("Per. Address",	subheader));		
						HeaderTable4.addCell(new Phrase(": ", tabletext));
					}
					
					HeaderTable4.addCell(new Phrase("Consultant", subheader));
					HeaderTable4.addCell(new Phrase(": " + Consultant, tabletext));
				
					HeaderTable4.addCell(new Phrase("Ref. By", subheader));
					HeaderTable4.addCell(new Phrase(": " + ltRegMasterDto.get(0).getReferDoctorName() , tabletext));
										
					if(resourceBundle.getObject("shraddha").toString().equalsIgnoreCase("off")){
						HeaderTable4.addCell(new Phrase("Weight", subheader));
						HeaderTable4.addCell(new Phrase(": "+ weight, tabletext));
						HeaderTable4.addCell(new Phrase("Height", subheader));
						HeaderTable4.addCell(new Phrase(": " +height, tabletext));	
					}
					HeaderTable4.addCell(new Phrase(" ", tabletext));
					
					
					/* HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header));
					HeaderTable4.addCell(new Phrase("", header)); */
					
					document.add(HeaderTable4);
					HeaderTable4.flushContent();

					HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable1.addCell(new Phrase("", header));
					HeaderTable1.addCell(new Phrase("", header));
					HeaderTable1.addCell(new Phrase("", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();
				}
				
				if(resourceBundle.getObject("shraddha").toString().equalsIgnoreCase("on")){

				PdfPTable HeaderTable4 = new PdfPTable(6);
				int[] headerwidth4 = { 50, 50, 20, 20,15 ,20};
				HeaderTable4.setWidths(headerwidth4);
				HeaderTable4.setWidthPercentage(95f);
				HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				HeaderTable4.addCell(new Phrase("", subheader));
                HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("Weight", subheader));
				HeaderTable4.addCell(new Phrase(": "+ weight, tabletext));
				HeaderTable4.addCell(new Phrase("Height", subheader));
				HeaderTable4.addCell(new Phrase(": " +height, tabletext));
				
				HeaderTable4.addCell(new Phrase("", subheader));
                HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("" , tabletext));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("" , tabletext));
				HeaderTable4.addCell(new Phrase("", subheader));
                HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("" , tabletext));
				HeaderTable4.addCell(new Phrase("", subheader));
				HeaderTable4.addCell(new Phrase("" , tabletext));


				document.add(HeaderTable4);
				HeaderTable4.flushContent();
				}
				
				/****************fetch mlc details**** @author husen*******/
			    //BillModel billmodel=new BillModel();
				RegService registrationService = (ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
			
			    int treatID=Integer.parseInt(TreatmentId);
			    //System.out.print("treatID=="+treatID);
				List<MlcDetailsDto> mlcDEtails = registrationService.fetchMlcDetails(ltRegMasterDto.get(0).getPatientId());
				//System.out.println("list size == "+mlcDEtails.size());
				if(mlcDEtails.size() > 0)
				{
					MlcDetailsDto mlcObj = mlcDEtails.get(0);
				
					String mlcDate = sdf.format(mlcObj.getMlcDate());
					
					PdfPTable HeaderTable5 = new PdfPTable(2);
					int[] headerwidth5 = { 30, 60 };
					HeaderTable5.setWidths(headerwidth5);
					HeaderTable5.setWidthPercentage(95f);
					HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(new Phrase("MLC details :", subheader));
					HeaderTable5.addCell(new Phrase("", header));
					HeaderTable5.addCell(new Phrase("", header));
					HeaderTable5.addCell(new Phrase("", header));
					HeaderTable5.addCell(new Phrase("", header));
					HeaderTable5.addCell(new Phrase("", header));

					document.add(HeaderTable5);
					HeaderTable5.flushContent();
					
					PdfPTable HeaderTable7 = new PdfPTable(6);
					int[] headerwidth7 = { 20, 30, 20, 30, 20, 30 };
					HeaderTable7.setWidths(headerwidth7);
					HeaderTable7.setWidthPercentage(95f);
					HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					HeaderTable7.addCell(new Phrase("MLC No", subheader));
					HeaderTable7.addCell(new Phrase(": " + mlcObj.getMlcNo(), tabletext));
					HeaderTable7.addCell(new Phrase("FIR No", subheader));
					HeaderTable7.addCell(new Phrase(": " + mlcObj.getFirNo(), tabletext));
					HeaderTable7.addCell(new Phrase("Buccle No", subheader));
					HeaderTable7.addCell(new Phrase(": " + mlcObj.getBuccleNo(), tabletext));

					HeaderTable7.addCell(new Phrase("Police station Name", subheader));
					HeaderTable7.addCell(new Phrase(": " + mlcObj.getPlStname(), tabletext));
					HeaderTable7.addCell(new Phrase("Police station address", subheader));
					HeaderTable7.addCell(new Phrase(": " + mlcObj.getMlcAddressText(), tabletext));
					HeaderTable7.addCell(new Phrase("Informer's Name", subheader));
					HeaderTable7.addCell(new Phrase(": " + mlcObj.getMlcFirstName()+" "+mlcObj.getMlcLastName(), tabletext));

					HeaderTable7.addCell(new Phrase("Mobile No", subheader));
					HeaderTable7.addCell(new Phrase(": " + mlcObj.getMlcMobile(), tabletext));
					HeaderTable7.addCell(new Phrase("Date", subheader));
					HeaderTable7.addCell(new Phrase(": " + mlcDate, tabletext));
					HeaderTable7.addCell(new Phrase("Authority Name", subheader));
					HeaderTable7.addCell(new Phrase(": " + mlcObj.getAuthorityName(), tabletext));

					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));

					document.add(HeaderTable7);
					HeaderTable7.flushContent();

					HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable1.addCell(new Phrase("", header));
					HeaderTable1.addCell(new Phrase("", header));
					HeaderTable1.addCell(new Phrase("", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();
				}
				
				PdfPTable HeaderTable01 = new PdfPTable(4);
				int[] headerwidth01 = { 15, 55, 35, 50 };
				HeaderTable01.setWidths(headerwidth01);
				HeaderTable01.setWidthPercentage(95f);
				HeaderTable01.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				
				UsersService uss = (ApplicationContextUtils.getApplicationContext()).getBean(UsersService.class);
				List<Doctor> autoList = uss.fetchDocInfo(TreatmentId,Consultant);

				Image imgsign = null;
                PdfPCell cellsign = null;
                String actual = FilePath.getUPLOADDOC();
                actualpath = actual + autoList.get(0).getDocsign();
                if(!signature.equals("-"))
                {
                
                try {
                    //String pathsign = application.getRealPath(actualpath);
                    imgsign = Image.getInstance(actualpath);
                    imgsign.scaleAbsolute(100, 50);
                    cellsign = new PdfPCell();
                    cellsign.addElement(new Chunk(imgsign, 5, -5));
                    cellsign.setBorder(Rectangle.NO_BORDER);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                }
               
				
				PdfPTable HeaderTable0 = new PdfPTable(4);
				int[] headerwidth0 = { 35, 35, 35, 50 };
				HeaderTable0.setWidths(headerwidth0);
				HeaderTable0.setWidthPercentage(95f);
				HeaderTable0.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				PdfPTable HeaderTablefooter = new PdfPTable(1);
				int[] headerwidthfooter = { 120 };
				HeaderTablefooter.setWidths(headerwidthfooter);
				HeaderTablefooter.setWidthPercentage(95f);
				HeaderTablefooter.getDefaultCell().setBorder(Rectangle.NO_BORDER);


				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				
				HeaderTable0.addCell(new Phrase("", header));
				 /* if (imgsign == null) {
					 HeaderTable0.addCell(new Phrase("", tabletext));
	              } else {
	            	  HeaderTable0.addCell(cellsign);
	              }   */
				 
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase(""+ Consultant, tabletext));
				
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase(""+ autoList.get(0).getQualification(), tabletext));
				
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase(""+ Department, tabletext));
				
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("Reg.No :" + autoList.get(0).getRegNo(), tabletext));
				
				
				if(serviceWiseBillingFlow.equals("on")){
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", tabletext));
				}else{
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("Reg Date and Time : " + regDate, tabletext));
				}

				
				document.add(HeaderTable0);
				HeaderTable0.flushContent();
				
				//HeaderTablefooter.addCell(new Phrase("Follow up appointment after 3 days and SOS", tabletext));
				//document.add(HeaderTablefooter);
				//HeaderTablefooter.flushContent();

				 HeaderTable01
						.addCell(new Phrase(
								" ",
								header));
				HeaderTable01
						.addCell(new Phrase(
								" ",
								header));
				HeaderTable01
						.addCell(new Phrase(
								" ",
								header));
				HeaderTable01
						.addCell(new Phrase(
								"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
								header)); 
				
				
				HeaderTable01.addCell(new Phrase("", tabletext));
				HeaderTable01.addCell(new Phrase("", tabletext));
				HeaderTable01.addCell(new Phrase("", header));
				
				if (imgsign == null) {
					HeaderTable01.addCell(new Phrase("", tabletext));
	            } else {
	            	HeaderTable01.addCell(cellsign);
	            } 

				HeaderTable01.addCell(new Phrase("Printed By:", tabletext));
				HeaderTable01.addCell(new Phrase(""+user_name, tabletext));
				HeaderTable01.addCell(new Phrase("", header));
				HeaderTable01.addCell(new Phrase(
						"Doctor's Signature & Authorized Stamp", tabletext));

				HeaderTable01.addCell(new Phrase("", header));
				HeaderTable01.addCell(new Phrase("", header));
				HeaderTable01.addCell(new Phrase("", header));
				HeaderTable01
						.addCell(new Phrase("Date :" + curr_date, tabletext));
				document.add(HeaderTable01);
				HeaderTable01.flushContent(); 
				
				document.close();
				outStream.close();
				outStream.flush();
				return;
				
				/* PdfPTable HeaderTable0 = new PdfPTable(4);
				int[] headerwidth0 = { 15, 55, 35, 50 };
				HeaderTable0.setWidths(headerwidth0);
				HeaderTable0.setWidthPercentage(95f);
				HeaderTable0.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				 HeaderTable0
						.addCell(new Phrase(
								"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
								header));
				HeaderTable0
						.addCell(new Phrase(
								"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
								header));
				HeaderTable0
						.addCell(new Phrase(
								"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
								header));
				HeaderTable0
						.addCell(new Phrase(
								"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
								header)); 

				HeaderTable0.addCell(new Phrase("Printed By:", tabletext));
				HeaderTable0.addCell(new Phrase(""+user_name, tabletext));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase(
						"Doctor's Signature & Authorized Stamp", tabletext));

				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0
						.addCell(new Phrase("Date :" + curr_date, tabletext));
				document.add(HeaderTable0);
				HeaderTable0.flushContent();

				document.close();
				outStream.close();
				outStream.flush();
				return; */
					
				
			}
			else{

				
				PdfPTable HeaderTable2 = new PdfPTable(5);
				int[] headerwidth2 = { 20, 20, 40, 20, 20 };
				HeaderTable2.setWidths(headerwidth2);
				HeaderTable2.setWidthPercentage(95f);
				HeaderTable2.getDefaultCell().setBorder(Rectangle.BOTTOM);
				

				
				PdfPTable HeaderTable1 = new PdfPTable(3);
				int[] headerwidth1 = { 30, 80, 20 };
				HeaderTable1.setWidths(headerwidth1);
				HeaderTable1.setWidthPercentage(95f);
				HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
				HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				document.add(HeaderTable1);
				HeaderTable1.flushContent();

				if (img == null) {
					
					HeaderTable1.addCell(new Phrase("", header));
				} else {
					
					HeaderTable1.addCell(cell);
				}		 
				
				Font regular = new Font(FontFamily.TIMES_ROMAN, 11, Font.NORMAL);
				Font bold = new Font(FontFamily.TIMES_ROMAN, 12, Font.BOLD);
				Phrase p = new Phrase();
				p.add(new Chunk(" "+hospitalName, bold));			
				p.add(new Chunk(" \n\n"+address, tabletext));			
				p.add(new Chunk(" "+city+" Pin- "+hospitalZip, tabletext));
				p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
				p.add(new Chunk(" \n "+webste+" email: "+email, tabletext));	
				//p.add(new Chunk(" \nPan No: "+panNo, tabletext));	
				
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
				

				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("", subheader));
				HeaderTable2.addCell(new Phrase("OPD CASE PAPER", header));
				HeaderTable2.addCell(new Phrase("Print Date and Time", subheader));
				HeaderTable2.addCell(new Phrase(": "+curr_date, subheader));
				document.add(HeaderTable2);
				HeaderTable2.flushContent();

				PdfPTable HeaderTable3 = new PdfPTable(5);
				int[] headerwidth3 = { 20, 30, 20, 30, 20 };
				HeaderTable3.setWidths(headerwidth3);
				HeaderTable3.setWidthPercentage(95f);
				HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				HeaderTable3.addCell(new Phrase("", header));
				HeaderTable3.addCell(new Phrase("", header));
				HeaderTable3.addCell(new Phrase("", header));
				HeaderTable3.addCell(new Phrase("", header));
				HeaderTable3.addCell(new Phrase("", header));
				HeaderTable3.addCell(new Phrase("", header));

				document.add(HeaderTable3);
				HeaderTable3.flushContent();
				

				
				PdfPTable HeaderTable4 = new PdfPTable(4);
				int[] headerwidth4 = { 15, 35, 15, 35 };
				HeaderTable4.setWidths(headerwidth4);
				HeaderTable4.setWidthPercentage(95f);
				HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				
				HeaderTable4.addCell(new Phrase("Patient Name", subheader));
				HeaderTable4.addCell(new Phrase(": " + pname, tabletext));
				/* HeaderTable4.addCell(new Phrase("SH ID", subheader));
				HeaderTable4.addCell(new Phrase(": " + PatientID, tabletext)); */
				HeaderTable4.addCell(new Phrase(""+patientId, subheader));
				HeaderTable4.addCell(new Phrase(": " +ltRegMasterDto.get(0).getCenterPatientId(), tabletext)); 
				
				
				
			/* 	HeaderTable4.addCell(new Phrase("", header));
				HeaderTable4.addCell(new Phrase("", header));
				HeaderTable4.addCell(new Phrase("", header));
				HeaderTable4.addCell(new Phrase("", header)); */
				
				
				HeaderTable4.addCell(new Phrase("Age/Gender", subheader));
				HeaderTable4.addCell(new Phrase(": " + AgeSexWt, tabletext));
				HeaderTable4.addCell(new Phrase("OPD No", subheader));
				HeaderTable4.addCell(new Phrase(": " +opdipdno, tabletext));
			
				
				/* HeaderTable4.addCell(new Phrase("", header));
				HeaderTable4.addCell(new Phrase("", header));
				HeaderTable4.addCell(new Phrase("", header));
				HeaderTable4.addCell(new Phrase("", header)); */
				
				HeaderTable4.addCell(new Phrase("Contact No", subheader));
				HeaderTable4.addCell(new Phrase(": " + ContactNo, tabletext));
				HeaderTable4.addCell(new Phrase("Treatment Id", subheader));
				HeaderTable4.addCell(new Phrase(": " + TreatmentId, tabletext)); 
				
				/* HeaderTable4.addCell(new Phrase("", header));
				HeaderTable4.addCell(new Phrase("", header));
				HeaderTable4.addCell(new Phrase("", header));
				HeaderTable4.addCell(new Phrase("", header)); */
				
				HeaderTable4.addCell(new Phrase("Department", subheader));
				HeaderTable4.addCell(new Phrase(": " + Department+"/"+depNameDoc, tabletext));
				HeaderTable4.addCell(new Phrase("Token No", subheader));
				HeaderTable4.addCell(new Phrase(": " + tokenNo, tabletext));
				
				HeaderTable4.addCell(new Phrase("MRN No", subheader));
				HeaderTable4.addCell(new Phrase(": " + MRNo, tabletext)); 
				
				
				// patient address
				String addressPatient = "";
				String per_patient_address = "";
				addressPatient=addressPatient + address2+", ";
				
				if(cityObj != "0" && !cityObj.equals("undefined") && !cityObj.equals("")){
					addressPatient += cityObj;
				}
				
				if (taluka != "0" && !taluka.equals("undefined") && !taluka.equals("")) 
				{
					addressPatient +=  (", "+taluka);
				}						
				if (district != "0" && !district.equals("undefined") && !district.equals("")) 
				{
					addressPatient += (",  " + district);
				}
				if (state != "0" && !state.equals("undefined") && !state.equals("")) 
				{
					addressPatient += (", " + state);
				}
				// end : patient address
				
				// Strat : permanant patient address
				if(percityObj != "0" && !percityObj.equals("undefined") && !percityObj.equals("")){
					per_patient_address += percityObj;
				}
				
				if (pertaluka != "0" && !pertaluka.equals("undefined") && !pertaluka.equals("")) 
				{
					per_patient_address +=  (" "+pertaluka);
				}						
				if (perdistrict != "0" && !perdistrict.equals("undefined") && !perdistrict.equals("")) 
				{
					per_patient_address += (" " + perdistrict);
				}
				if (perstate != "0" && !perstate.equals("undefined") && !perstate.equals("")) 
				{
					per_patient_address += ("," + perstate);
				}
				// end : permanant patient address
					
				if(addressPatient == "" && addressPatient.equals("undefined"))
				{
					HeaderTable4.addCell(new Phrase("Res. Address", subheader));
					HeaderTable4.addCell(new Phrase(": ", tabletext));
				}else{
					HeaderTable4.addCell(new Phrase("Res. Address", subheader));
					HeaderTable4.addCell(new Phrase(": "+addressPatient, tabletext));
				}
				
				if(BillCategoryName != null && BillCategoryName !="" && BillCategoryName!="undefined")
				{
					HeaderTable4.addCell(new Phrase("Sponsor", subheader));
					HeaderTable4.addCell(new Phrase(": "+BillCategoryName, tabletext));
				} else{
					HeaderTable4.addCell(new Phrase("Sponsor", subheader));
					HeaderTable4.addCell(new Phrase(": ", tabletext));
				}
				
				if(per_patient_address != null && perPatientAdd !=null && !perPatientAdd.equalsIgnoreCase("") || !per_patient_address.equalsIgnoreCase("") && !per_patient_address.equalsIgnoreCase(null) && !per_patient_address.equals("undefined"))
				{
					HeaderTable4.addCell(new Phrase("Per. Address",	subheader));		
					HeaderTable4.addCell(new Phrase(": "+perPatientAdd+" "+ per_patient_address, tabletext));
				}else{
					HeaderTable4.addCell(new Phrase("Per. Address",	subheader));		
					HeaderTable4.addCell(new Phrase(": ", tabletext));
				}
				
				HeaderTable4.addCell(new Phrase("Consultant", subheader));
				HeaderTable4.addCell(new Phrase(": " + Consultant, tabletext));
				
				HeaderTable4.addCell(new Phrase("Ref. By", subheader));
				HeaderTable4.addCell(new Phrase(": " + ltRegMasterDto.get(0).getDocNameChan() , tabletext));
				
				//HeaderTable4.addCell(new Phrase("", header));				
				//HeaderTable4.addCell(new Phrase("", header));
				
				if(resourceBundle.getObject("shraddha").toString().equalsIgnoreCase("off")){
					HeaderTable4.addCell(new Phrase("Weight", subheader));
					HeaderTable4.addCell(new Phrase(": "+ weight, tabletext));
					HeaderTable4.addCell(new Phrase("Height", subheader));
					HeaderTable4.addCell(new Phrase(": " +height, tabletext));	
				}
				/* HeaderTable4.addCell(new Phrase("", header));
				HeaderTable4.addCell(new Phrase("", header));
				
				
				HeaderTable4.addCell(new Phrase(" ", subheader));
				HeaderTable4.addCell(new Phrase(" ", tabletext)); */
				HeaderTable4.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable4.addCell(new Phrase("", header));
				HeaderTable4.addCell(new Phrase("", header));
				HeaderTable4.addCell(new Phrase("", header));
				HeaderTable4.addCell(new Phrase("", header));
				
				document.add(HeaderTable4);
				HeaderTable4.flushContent();

				HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				document.add(HeaderTable1);
				HeaderTable1.flushContent();
			
				if(resourceBundle.getObject("shraddha").toString().equalsIgnoreCase("on")){

					PdfPTable HeaderTable45 = new PdfPTable(6);
					int[] headerwidth45 = { 50, 50, 20, 20,15 ,20};
					HeaderTable45.setWidths(headerwidth45);
					HeaderTable45.setWidthPercentage(95f);
					HeaderTable45.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					HeaderTable45.addCell(new Phrase("", subheader));
	                HeaderTable45.addCell(new Phrase("", subheader));
					HeaderTable45.addCell(new Phrase("Weight", subheader));
					HeaderTable45.addCell(new Phrase(": "+ weight, tabletext));
					HeaderTable45.addCell(new Phrase("Height", subheader));
					HeaderTable45.addCell(new Phrase(": " +height, tabletext));
					
					HeaderTable45.addCell(new Phrase("", subheader));
	                HeaderTable45.addCell(new Phrase("", subheader));
					HeaderTable45.addCell(new Phrase("", subheader));
					HeaderTable45.addCell(new Phrase("" , tabletext));
					HeaderTable45.addCell(new Phrase("", subheader));
					HeaderTable45.addCell(new Phrase("" , tabletext));
					HeaderTable45.addCell(new Phrase("", subheader));
	                HeaderTable45.addCell(new Phrase("", subheader));
					HeaderTable45.addCell(new Phrase("", subheader));
					HeaderTable45.addCell(new Phrase("" , tabletext));
					HeaderTable45.addCell(new Phrase("", subheader));
					HeaderTable45.addCell(new Phrase("" , tabletext));


					document.add(HeaderTable45);
					HeaderTable45.flushContent();
					}

				
				/****************fetch mlc details**** @author husen*******/
			     //BillModel billmodel=new BillModel();
				RegService registrationService = (ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
			
			    int treatID=Integer.parseInt(TreatmentId);
			    //System.out.print("treatID=="+treatID);
				List<MlcDetailsDto> mlcDEtails = registrationService.fetchMlcDetails(ltRegMasterDto.get(0).getPatientId());
				//System.out.println("list size == "+mlcDEtails.size());
				if(mlcDEtails.size() > 0)
				{
					MlcDetailsDto mlcObj = mlcDEtails.get(0);
					
					String mlcDate = sdf.format(mlcObj.getMlcDate());
					PdfPTable HeaderTable5 = new PdfPTable(2);
					int[] headerwidth5 = { 30, 60 };
					HeaderTable5.setWidths(headerwidth5);
					HeaderTable5.setWidthPercentage(95f);
					HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable5.addCell(new Phrase("MLC details :", subheader));
					HeaderTable5.addCell(new Phrase("", header));
					HeaderTable5.addCell(new Phrase("", header));
					HeaderTable5.addCell(new Phrase("", header));
					HeaderTable5.addCell(new Phrase("", header));
					HeaderTable5.addCell(new Phrase("", header));

					document.add(HeaderTable5);
					HeaderTable5.flushContent();
					
					PdfPTable HeaderTable7 = new PdfPTable(6);
					int[] headerwidth7 = { 20, 30, 20, 30, 20, 30 };
					HeaderTable7.setWidths(headerwidth7);
					HeaderTable7.setWidthPercentage(95f);
					HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					
					HeaderTable7.addCell(new Phrase("MLC No", subheader));
					HeaderTable7.addCell(new Phrase(": " + mlcObj.getMlcNo(), tabletext));
					HeaderTable7.addCell(new Phrase("FIR No", subheader));
					HeaderTable7.addCell(new Phrase(": " + mlcObj.getFirNo(), tabletext));
					HeaderTable7.addCell(new Phrase("Buccle No", subheader));
					HeaderTable7.addCell(new Phrase(": " + mlcObj.getBuccleNo(), tabletext));

					HeaderTable7.addCell(new Phrase("Police station Name", subheader));
					HeaderTable7.addCell(new Phrase(": " + mlcObj.getPlStname(), tabletext));
					HeaderTable7.addCell(new Phrase("Police station address", subheader));
					HeaderTable7.addCell(new Phrase(": " + mlcObj.getMlcAddressText(), tabletext));
					HeaderTable7.addCell(new Phrase("Informer's Name", subheader));
					HeaderTable7.addCell(new Phrase(": " + mlcObj.getMlcFirstName()+" "+mlcObj.getMlcLastName(), tabletext));

					HeaderTable7.addCell(new Phrase("Mobile No", subheader));
					HeaderTable7.addCell(new Phrase(": " + mlcObj.getMlcMobile(), tabletext));
					HeaderTable7.addCell(new Phrase("Date", subheader));
					HeaderTable7.addCell(new Phrase(": " + mlcDate, tabletext));
					HeaderTable7.addCell(new Phrase("Authority Name", subheader));
					HeaderTable7.addCell(new Phrase(": " + mlcObj.getAuthorityName(), tabletext));

					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));
					HeaderTable7.addCell(new Phrase("", header));

					document.add(HeaderTable7);
					HeaderTable7.flushContent();

					HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
					HeaderTable1.addCell(new Phrase("", header));
					HeaderTable1.addCell(new Phrase("", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();
				}
				
				PdfPTable HeaderTable01 = new PdfPTable(4);
				int[] headerwidth01 = { 15, 55, 35, 50 };
				HeaderTable01.setWidths(headerwidth01);
				HeaderTable01.setWidthPercentage(95f);
				
				HeaderTable01.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				
				UsersService uss = (ApplicationContextUtils.getApplicationContext()).getBean(UsersService.class);
				List<Doctor> autoList = uss.fetchDocInfo(TreatmentId,Consultant);

				Image imgsign = null;
                PdfPCell cellsign = null;
                String actual = FilePath.getUPLOADDOC();
                actualpath = actual + autoList.get(0).getDocsign();
                if(!signature.equals("-"))
                {
                
                try {
                    //String pathsign = application.getRealPath(actualpath);
                    imgsign = Image.getInstance(actualpath);
                    imgsign.scaleAbsolute(100, 50);
                    cellsign = new PdfPCell();
                    cellsign.addElement(new Chunk(imgsign, 5, -5));
                    cellsign.setBorder(Rectangle.NO_BORDER);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                }
               
				
				PdfPTable HeaderTable0 = new PdfPTable(4);
				int[] headerwidth0 = { 35, 35, 35, 50 };
				HeaderTable0.setWidths(headerwidth0);
				HeaderTable0.setWidthPercentage(95f);
				HeaderTable0.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				PdfPTable HeaderTablefooter = new PdfPTable(1);
				int[] headerwidthfooter = { 120 };
				HeaderTablefooter.setWidths(headerwidthfooter);
				HeaderTablefooter.setWidthPercentage(95f);
				HeaderTablefooter.getDefaultCell().setBorder(Rectangle.NO_BORDER);


				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				
				HeaderTable0.addCell(new Phrase("", header));
				 /* if (imgsign == null) {
					 HeaderTable0.addCell(new Phrase("", tabletext));
	              } else {
	            	  HeaderTable0.addCell(cellsign);
	              } */  
				 
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase(""+ Consultant, tabletext));
				
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase(""+ autoList.get(0).getQualification(), tabletext));
				
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase(""+ Department, tabletext));
				
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("", header));
				HeaderTable0.addCell(new Phrase("Reg.No :" + autoList.get(0).getRegNo(), tabletext));
				
				
				if(serviceWiseBillingFlow.equals("on")){
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", tabletext));
				}else{
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("", header));
					HeaderTable0.addCell(new Phrase("Reg Date and Time : " + regDate, tabletext));
				}

				document.add(HeaderTable0);
				HeaderTable0.flushContent();
				
				//HeaderTablefooter.addCell(new Phrase("Follow up appointment after 3 days and SOS", tabletext));
				//document.add(HeaderTablefooter);
				//HeaderTablefooter.flushContent();

				 HeaderTable01
						.addCell(new Phrase(
								" ",
								header));
				HeaderTable01
						.addCell(new Phrase(
								" ",
								header));
				HeaderTable01
						.addCell(new Phrase(
								" ",
								header));
				HeaderTable01
						.addCell(new Phrase(
								"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
								header)); 

				
				HeaderTable01.addCell(new Phrase("", tabletext));
				HeaderTable01.addCell(new Phrase("", tabletext));
				HeaderTable01.addCell(new Phrase("", header));
				
				if (imgsign == null) {
					HeaderTable01.addCell(new Phrase("", tabletext));
	            } else {
	            	HeaderTable01.addCell(cellsign);
	            } 
				//HeaderTable01.addCell(new Phrase("aaaaaaaaaaaa", tabletext));
				
				HeaderTable01.addCell(new Phrase("Printed By:", tabletext));
				HeaderTable01.addCell(new Phrase(""+user_name, tabletext));
				HeaderTable01.addCell(new Phrase("", header));
				HeaderTable01.addCell(new Phrase(
						"Doctor's Signature & Authorized Stamp", tabletext));

				HeaderTable01.addCell(new Phrase("", header));
				HeaderTable01.addCell(new Phrase("", header));
				HeaderTable01.addCell(new Phrase("", header));
				HeaderTable01
						.addCell(new Phrase("Date :" + curr_date, tabletext));
				document.add(HeaderTable01);
				HeaderTable01.flushContent(); 
				
				document.close();
				outStream.close();
				outStream.flush();
				return;
			}
		} catch (Exception e) {
			System.err.println(e.getMessage());
			e.printStackTrace();
		}
	%>
</body>
</html>