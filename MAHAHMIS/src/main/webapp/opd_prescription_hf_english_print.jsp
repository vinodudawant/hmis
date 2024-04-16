<%@page import="com.hms.TempEventHandlerPalvePDF"%>
<%@page import="com.hms.pathology.service.Phlebotomyservice"%>
<%@page import="com.hms.opdbill.dto.PatientHeaderInfoDto"%>
<%@page import="com.hms.opdbill.service.OpdBillService"%>
<%@page import="com.hms.patient.util.OSValidator"%>
<%@page import="org.apache.bcel.verifier.structurals.InstConstraintVisitor"%>
<%@page import="com.hms.administrator.service.ChannelHospitalMgmtService"%>
<%@page import="com.hms.administrator.dto.HospitalDetailsDTO"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.doctordesk.dto.OPDPrescriptionFolloUpDto"%>
<%@page import="com.hms.ehat.dto.PaymentModDto"%>
<%@page import="com.hms.ehat.service.PaymentModService"%>
<%@page import="com.hms.administrator.dto.Chanelling_doctor"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.ehat.dto.ServiceMasterDto"%>
<%@page import="com.hms.ehat.service.ServService"%>
<%@page import="com.hms.ehat.dto.BillNobleDto"%>
<%@page import="com.hms.ehat.service.BillNobleService"%>
<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.ehat.dto.EhatBillPrefix"%>
<%@page import="com.hms.ehat.service.AutosuggestionService"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@page import="com.hms.ehat.dto.DoctorDto"%>
<%@page import="com.hms.ehat.controller.MarkVisitController"%>
<%@page import="com.hms.ehat.dto.ChargesMasterSlave"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.itextpdf.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.itextpdf.text.html.simpleparser.StyleSheet"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.ipdbill.dto.BillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.dto.MultiBillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.serviceImpl.BillServiceImpl"%>
<%@page import="com.hms.ipdbill.service.BillService"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.ehat.service.CurrencyTypeService"%>
<%@ page import="com.hms.ehat.dto.CurrencyTypeDto"%>
<%@ page import="com.hms.doctordesk.controller.OPDHistoryController"%>
<%@ page import="com.hms.doctordesk.service.PrescriptionService"%>
<%@ page import="com.hms.doctordesk.dto.OPDPrescriptionDtoSP"%>
<%@ page import="com.hms.doctordesk.dto.OPDHistoryMasterDTO"%>
<%@page import="com.lowagie.text.pdf.PdfGState"%>
<%@page import="com.lowagie.text.pdf.GrayColor"%>
<%@page import="com.lowagie.text.pdf.Barcode128"%>
<%@page import="com.lowagie.text.pdf.ColumnText"%>
<%@page import="com.lowagie.text.pdf.PdfContentByte"%>
<%@page import="com.lowagie.text.PageSize"%>
<%@page import="com.lowagie.text.HeaderFooter"%>


<%@page import="com.lowagie.text.pdf.BaseFont"%>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="com.lowagie.text.Chunk,com.lowagie.text.Document,com.lowagie.text.Element,com.lowagie.text.Font 
,com.lowagie.text.HeaderFooter,com.lowagie.text.Image,com.lowagie.text.Paragraph,com.lowagie.text.Phrase,com.lowagie.text.Rectangle
,com.lowagie.text.pdf.PdfPCell,com.lowagie.text.pdf.PdfPTable,com.lowagie.text.pdf.PdfWriter,com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport,
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants, com.hms.pharmacy.upload.FilePath,java.nio.file.Paths"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@page import="java.util.Calendar"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta  http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Opd Receipt PDf</title>
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
			
			ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String lntUnit = (String) resource.getObject("lntUnit").toString();
			
			String CovidReportProfileId = (String) resource.getObject("CovidReportProfileId").toString();

			Integer covidReportId=Integer.parseInt(CovidReportProfileId);
			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			
			Document document = new Document(PageSize.A4);
			document.setMargins(20, 20, 20, 145);
			
			Font header = new Font(Font.HELVETICA, 10, Font.BOLD);
			Font headerTitle = new Font(Font.HELVETICA, 9, Font.BOLD);
			Font headerUnderline = new Font(Font.HELVETICA, 11, Font.BOLD | Font.UNDERLINE);
			Font subheader = new Font(Font.HELVETICA, 8, Font.BOLD);
			Font footer = new Font(Font.HELVETICA, 8, Font.BOLD);
			header.setColor(10, 4, 2);
			Font tableheader22 = new Font(Font.HELVETICA, 21, Font.BOLD);
			Font tableheader11 = new Font(Font.HELVETICA, 13, Font.BOLD);
			Font tableheader111 = new Font(Font.HELVETICA, 13, Font.BOLD);
			Font tableheader12 = new Font(Font.COURIER, 13, Font.BOLD);
			Font tableheader13 = new Font(Font.HELVETICA, 10, Font.BOLD);
			Font tableheader14 = new Font(Font.HELVETICA, 10,Font.BOLD | Font.UNDERLINE);
			Font tableheader = new Font(Font.HELVETICA, 10, Font.BOLD);
			Font tabletext = new Font(Font.HELVETICA, 8, Font.NORMAL);
			Font tabletext7 = new Font(Font.HELVETICA, 8, Font.NORMAL);
			Font tableheader15 = new Font(Font.HELVETICA, 10, Font.NORMAL);		
			Font small = new Font(Font.HELVETICA, 8, Font.NORMAL);
			Font subheaderUNDERLINE = new Font(Font.HELVETICA, 9, Font.BOLD | Font.UNDERLINE);

			/* =============================================================================== */
			/* Newly added font for the grater than and less than sign expression */
			/* =============================================================================== */
			String fontFilePath = "itext-font/Cardo-Regular.ttf";
			String fontFileRealPath = application.getRealPath(fontFilePath);
			//BaseFont bf_cjk = BaseFont.createFont("R://Airport_disha/EhatEnterprise/WebContent/itext-font/Cardo-Regular.ttf",BaseFont.IDENTITY_H,BaseFont.EMBEDDED);
			BaseFont bf_cjk = BaseFont.createFont(fontFileRealPath, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
			Font bf_cjk_font = new Font(bf_cjk, 10, Font.BOLD);
			/* =============================================================================== */
			/* =============================================================================== */
			
			
			String pathFont=System.getProperty("user.dir");
				System.out.println("pathFont======"+pathFont);
				String pathProject = Paths.get("").toAbsolutePath().toString();
				System.out.println("pathProject======"+pathProject);
				//String fontName= application.getRealPath("\\fonts\\Shivaji05.ttf");
				String fontName="";
				if (OSValidator.isWindows()) {
					fontName = application.getRealPath("\\fonts\\Shivaji05.ttf");//System.getProperty("jboss.server.data.dir") + "\\patImages\\";
				} else if (OSValidator.isMac()) {
					System.out.println("This is Mac");
				} else if (OSValidator.isUnix()) {
					fontName = application.getRealPath("/fonts/Shivaji05.ttf");//System.getProperty("jboss.server.data.dir") + "/patImages/";
				} else if (OSValidator.isSolaris()) {
					System.out.println("This is Solaris");
				} else {
					System.out.println("Your OS is not support!!");
				}
				//String fontName= "E://S2 Data//MAHAHMIS DATA//MAHAHMIS_WORKSPACE_16-06-2022//mahait//MAHAHIMS01//src//main//webapp//fonts//Shivaji05.ttf";  
				System.out.println("fontName======"+fontName);
				com.lowagie.text.FontFactory.register(fontName);
			
			
			Image img = null;
			PdfPCell cell = null;
			Image imgFQRcode=null;
			
			int treatmentId = Integer.parseInt(request.getParameter("treatmentId"));
			String  languageOF=request.getParameter("instructionLanguage");
			
			
			String  printTitle=request.getParameter("printTitle");
			String  patientName=request.getParameter("patientName");
			
	       String headerFlag="Yes";
	      /*  if(CallFromOPD.equalsIgnoreCase("withoutheader")){
	    	   headerFlag="No";
	       } */
			
			HttpSession session1 = request.getSession();
			String user_name = (String) session1.getAttribute("userName");
			Integer userId = (Integer) session1.getAttribute("userId");
			Integer unitId = (Integer) session1.getAttribute("uId");
			
			request.setAttribute("headerFlag", headerFlag);
			request.setAttribute("covide", "No");
			request.setAttribute("pageIteration", 0);
			request.setAttribute("footerAddress", "");
			
			request.setAttribute("printTitle", printTitle);
			
			Phlebotomyservice phlebotomyservice = (ApplicationContextUtils.getApplicationContext()).getBean(Phlebotomyservice.class);
		
			RegService regservice = (ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
			List<RegTreBillDto> robj=regservice.fetchPatientsRecordByTreatmentId(treatmentId);
			String pmobile="0";
			if(robj.size() > 0){
				pmobile=robj.get(0).getMobile();
			}
			
			SimpleDateFormat formDate = new SimpleDateFormat("dd-MM-yyyy");
		     
		       String strDate = formDate.format(new Date());
		       System.out.println("strDate==="+strDate);
				
			response.setHeader("Content-Disposition", "inline; filename="+patientName+"_"+strDate+".pdf");

			PdfPTable hospitalHeader = new PdfPTable(3);
			int[] hospitalHeaderWidth = { 30, 70, 35 };
			hospitalHeader.setWidths(hospitalHeaderWidth);
			hospitalHeader.setWidthPercentage(95f);
			hospitalHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			PdfPTable headerTable = new PdfPTable(2);
			int[] headerTableWidth = { 50, 50 };
			headerTable.setWidths(headerTableWidth);
			headerTable.setWidthPercentage(95f);
			headerTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			/* -------------------------------------- End Declaration -------------------------------------------   */

			/* --------------------------------------All Services -------------------------------------------   */
			//TreatmentModel treatmentModel = new TreatmentModel();
			List<RegTreBillDto> ltPatientRecord = null;
			RegTreBillDto rtd = new RegTreBillDto();
			RegistrationController uss = (ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
			rtd = uss.fetchPatientsRecordByTreatmentId(treatmentId);
			rtd = rtd.getListRegTreBillDto().get(0);
			
			Integer postId=1;
			Integer authoId=0;
			
			if(postId > 0)
				request.setAttribute("postId", postId); // added by vinod
			else
				request.setAttribute("postId", authoId); // added by vinod
			//System.out.println(collecteddate+postdate);
			/* --------------------------------------End All Services -------------------------------------------   */
				     
			PdfWriter pdfWriter = PdfWriter.getInstance(document, outStream);			
			TempEventHandlerPalvePDF event = new TempEventHandlerPalvePDF();
			pdfWriter.setPageEvent(event);

			String reportFooterAddress = "";//hospObj.getReportFooterAddress();
			if(reportFooterAddress.equalsIgnoreCase(null) || reportFooterAddress.equalsIgnoreCase("") || reportFooterAddress == null)
				{
				reportFooterAddress="";			
				}
			
			
			
			
			document.open();		
			String path = hospObj.getFilePath();
			String nabh = hospObj.getNabhImagePath();
			String hospitalName = hospObj.getHospitalName();
			hospitalName = hospitalName.toUpperCase();
			String address = hospObj.getHospitalAddress();
			String state = hospObj.getHospitalState();
			String city = hospObj.getHospitalCity();
			String contact = hospObj.getHospitalContact();
			String path2 = application.getRealPath(nabh);
			
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

			String nabhLogo = application.getRealPath(nabh);

			String path1 = "";

			img = Image.getInstance(path2);

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

			PdfPTable Headertable3 = new PdfPTable(3);
			int[] HeaderWidth3 = { 0,100,0 };
			Headertable3.setWidths(HeaderWidth3);
			Headertable3.setWidthPercentage(95f);
			Headertable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);			

			PdfPTable Headertable1 = new PdfPTable(3);

				
				boolean pageflag=true;
				boolean codefbsppbss=true;

				String proname="";
				Integer proId=0;
				String pkgname = "";
				String barcodefbsppbs="";
				String fbsppbscollecteddate="";
				String fbsppbspostdate="";
				PdfContentByte canvas = pdfWriter.getDirectContentUnder();
				Barcode128 code129 = new Barcode128();
				
				for (int pro = 0; pro < 1; pro++) {	
					request.setAttribute("pageIteration", pro);
				int[] HeaderWidth1 = { 0, 100,0 };
				Headertable1.setWidths(HeaderWidth1);
				Headertable1.setWidthPercentage(95f);
				Headertable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);   
				
			
				
				 if(pro > 0){
				 document.newPage();
				} 

// start Prescription Data

  PdfPTable HeaderTable5 = new PdfPTable(7);
				int[] headerwidth5 = { 27, 40, 30, 10, 15, 40, 20 };
				HeaderTable5.setWidths(headerwidth5);
				HeaderTable5.setWidthPercentage(95f);
				HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

	PrescriptionService uss2  =(ApplicationContextUtils.getApplicationContext()).getBean(PrescriptionService.class);
	List<OPDPrescriptionDtoSP> listPrescriptionsSP = new ArrayList<>();	
	listPrescriptionsSP =  uss2.getAllPrescriptionsByTreatmentId(treatmentId, unitId);  // data by stored procedure
	
	
	 PdfPTable HeaderTableSpace = new PdfPTable(1);
		int[] headerwidthSpace = {40 };
		HeaderTableSpace.setWidths(headerwidthSpace);
		HeaderTableSpace.setWidthPercentage(95f);
		HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTableSpace.setSpacingAfter(5.0f);
		
		PdfPTable HeaderTableSpace1 = new PdfPTable(1);
		int[] headerwidthSpace1 = {40 };
		HeaderTableSpace1.setWidths(headerwidthSpace1);
		HeaderTableSpace1.setWidthPercentage(95f);
		HeaderTableSpace1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		HeaderTableSpace1.setSpacingAfter(50.0f);
	
		PdfPTable HeaderTableH = new PdfPTable(4);
				int[] headerwidthChemo = {20,20,20,20 };
				HeaderTableH.setWidths(headerwidthChemo);
				HeaderTableH.setWidthPercentage(95f);
				HeaderTableH.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				PdfPTable HeaderTableCh = new PdfPTable(3);
				int[] headerwidthCh = {2,8,4 };
				HeaderTableCh.setWidths(headerwidthCh);
				HeaderTableCh.setWidthPercentage(95f);
				HeaderTableCh.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
				HeaderTableCh.addCell(new Phrase("Sr. No", subheader));
				HeaderTableCh.addCell(new Phrase("Medicine Name", subheader));
				HeaderTableCh.addCell(new Phrase("QTY", subheader));
				
				HeaderTableCh.addCell(new Phrase("", tabletext));
				HeaderTableCh.addCell(new Phrase("", tabletext));
				HeaderTableCh.addCell(new Phrase("", tabletext));
				
				int countp=1;
				
				for(int i=0;i<listPrescriptionsSP.size();i++ ){
					HeaderTableCh.addCell(new Phrase(""+countp, tabletext));
					HeaderTableCh.addCell(new Phrase(""+listPrescriptionsSP.get(i).getPrepName() + ". "+listPrescriptionsSP.get(i).getMedicineName()+"  "+"("+listPrescriptionsSP.get(i).getUnitName()+")", tabletext));
					HeaderTableCh.addCell(new Phrase(""+listPrescriptionsSP.get(i).getQty(), tabletext));
					
					HeaderTableCh.addCell(new Phrase("", tabletext));
					
					if(listPrescriptionsSP.get(i).getNutracalProductFlag() ==0){
					HeaderTableCh.addCell(new Phrase(""+"(" +listPrescriptionsSP.get(i).getDrugName()+")", tabletext));
					}else{
						HeaderTableCh.addCell(new Phrase("", tabletext));
					}
					HeaderTableCh.addCell(new Phrase("", tabletext));
					
					String pdays=listPrescriptionsSP.get(i).getDayPrescription();
				String preDays[]=pdays.split(",");
				String mo=preDays[0];
				String an=preDays[1];
				String ev=preDays[2];
				String nt=preDays[3];
				String moName="";
				String anName="";
				String evName="";
				String ntName="";
				if(!mo.equalsIgnoreCase("0")){
					moName="Morning";
				}
				if(!an.equalsIgnoreCase("0")){
					anName="Afternoon";
				}
				if(!ev.equalsIgnoreCase("0")){
					evName="Evenining";
				}
				if(!nt.equalsIgnoreCase("0")){
					ntName="Night";
				}
				
				String instructions=listPrescriptionsSP.get(i).getInstructionName();
				String instArray[]=instructions.split("/");
				System.err.println("instructions........."+instructions);
				
				String englishInstr=instArray[0];
				String hindiInstr=instArray[1];
				String marathiInstr=instArray[2];
				System.err.println("languageOF........."+languageOF);
				if(languageOF.equalsIgnoreCase("ENGLISH")){
					HeaderTableCh.addCell(new Phrase("", tabletext));
					HeaderTableCh.addCell(new Phrase(""+mo+"------"+an+"------"+ev+"------"+nt, tabletext));
					HeaderTableCh.addCell(new Phrase(""+englishInstr, tabletext));
					
				}else if(languageOF.equalsIgnoreCase("MARATHI")){
					System.err.println("marathiInstr........."+marathiInstr);
					HeaderTableCh.addCell(new Phrase("", tabletext));
					HeaderTableCh.addCell(new Phrase(""+mo+"------"+an+"------"+ev+"------"+nt, tabletext));
					HeaderTableCh.addCell(new Phrase(""+marathiInstr, com.lowagie.text.FontFactory.getFont("Shivaji05", 10)));
					
				}
				
				
				
				
				HeaderTableCh.addCell(new Phrase("", tabletext));
				HeaderTableCh.addCell(new Phrase(""+moName+"   "+anName+"   "+evName+"    "+ntName, tabletext));
				HeaderTableCh.addCell(new Phrase("", tabletext));
					
				countp++;
					
				}
				
	   			
		   		 document.add(HeaderTableCh);
		   		HeaderTableCh.flushContent();
		   
		   		HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				 HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				 HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				 HeaderTable5.addCell(new Phrase("", tabletext));
					 document.add(HeaderTable5);
				HeaderTable5.flushContent();


//End Prescription  Data

			
			
			//Added By Badrinath For Follow Up Date
			
			PrescriptionService objp  =(ApplicationContextUtils.getApplicationContext()).getBean(PrescriptionService.class);
			OPDPrescriptionFolloUpDto OpdPrescription = new OPDPrescriptionFolloUpDto();	
			OpdPrescription =  objp.getfollowUpForOPDPatient( unitId ,treatmentId);  // data by stored procedure

			System.err.print("Start follow up");
			

			
			if (OpdPrescription != null) {

				HeaderTableH.addCell(new Phrase("Next follow up on:", subheader));
				HeaderTableH.addCell(new Phrase(""+OpdPrescription.getDate(), tabletext));
				HeaderTableH.addCell(new Phrase("", header));
				HeaderTableH.addCell(new Phrase("", header));

				document.add(HeaderTableH);
				HeaderTableH.flushContent();

				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				 HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				 HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("", tabletext));
				 HeaderTable5.addCell(new Phrase("", tabletext));
					 document.add(HeaderTable5);
				HeaderTable5.flushContent();

			} 

			
			// end code for follow up date
			// Table5 : For service details head end
			
			 HeaderTableSpace1.addCell(new Phrase("", tabletext));
			 document.add(HeaderTableSpace1);
			 HeaderTableSpace1.flushContent();
			
			
			
			
		
			// Table6 : For receipt footer end

			// Table4 : For page footer start

			PdfPTable HeaderTable4 = new PdfPTable(3);
			int[] headerwidth4 = { 30, 60, 20 };
			HeaderTable4.setWidths(headerwidth4);
			HeaderTable4.setWidthPercentage(95f);
			HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", tabletext));
			HeaderTable4.addCell(new Phrase("", tabletext));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));

			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			HeaderTable4.addCell(new Phrase("", subheader));
			Integer labId=0;

			

			
			}
			document.close();
			outStream.flush();
			outStream.close();
	
		} catch (Exception e) {
			e.printStackTrace();
		}
	%>
	
</body>
</html>