<%@page import="com.hms.doctordesk.service.OPDHistoryService"%>
<%@page import="com.hms.doctordesk.dto.OPDDietMasterDTO"%>
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
<%@page import="com.lowagie.text.html.simpleparser.HTMLWorker"%>
<%@page import="com.lowagie.text.html.simpleparser.StyleSheet"%>

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
			String  printTitle=request.getParameter("printTitle");
			String  patientName=request.getParameter("patientName");
			String dietIds=request.getParameter("dietIds");
			
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

// strat template Data

OPDHistoryController uss1=(ApplicationContextUtils.getApplicationContext()).getBean(OPDHistoryController.class);
			OPDHistoryService uss2=(ApplicationContextUtils.getApplicationContext()).getBean(OPDHistoryService.class);
			
			  PdfPTable HeaderTable5 = new PdfPTable(1);
				int[] headerwidth5 = { 100};
				HeaderTable5.setWidths(headerwidth5);
				HeaderTable5.setWidthPercentage(95f);
				HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);

			
			OPDDietMasterDTO dm = new OPDDietMasterDTO();
			List<OPDDietMasterDTO> lstmaster1 = uss2.getOPDDietListByDietIds(dietIds);
			PdfPTable HeaderTable31 = new PdfPTable(1);
			int[] headerwidth31 = { 120 };
			HeaderTable31.setWidths(headerwidth31);
			HeaderTable31.setWidthPercentage(95f);
			HeaderTable31.getDefaultCell().setBorder(Rectangle.BOTTOM);
			
			for(int i=0;i<lstmaster1.size();i++){	
				if(lstmaster1.size()!=0){
					
					dm = lstmaster1.get(i);
					
		            PdfPTable HeaderTable32 = new PdfPTable(1);
		            int[] headerwidth32 = {100};
		            HeaderTable32.setWidths(headerwidth32);
		            HeaderTable32.setWidthPercentage(95f);
		            HeaderTable32.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		            StyleSheet styleSheet = new StyleSheet();
		            styleSheet.loadTagStyle("body", "size", "90px");
		            styleSheet.loadTagStyle("p", "size", " 100px");
		            HTMLWorker htmlWorker = new HTMLWorker(document);
		            htmlWorker.setMargins(50, 100, 100, 150);
		            Paragraph paragraph = new Paragraph();
		            
		            PdfPTable HeaderTable33 = new PdfPTable(1);
		            int[] headerwidth30 = {100};
		            HeaderTable33.setWidths(headerwidth30);
		            HeaderTable33.setWidthPercentage(95f);
		            HeaderTable33.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		            htmlWorker.setMargins(50, 100, 100, 150);
		            
		           java.util.List<Element> ie1 = HTMLWorker.parseToList(new StringReader(dm.getTemplateData()), styleSheet);
		           if(dm.getTemplateData().equals("") || dm.getTemplateData().equals("NULL")){
		               for (Element element : ie1) {
		                   if (element instanceof PdfPTable)
		                   {
		                       PdfPTable htmlTable = new PdfPTable(1);
		                       int[] htmlTableWidth = {50};
		                                         htmlTable.setWidths(htmlTableWidth);
		                       htmlTable.setWidths(htmlTableWidth);
		                       htmlTable.setWidthPercentage(50f);
		                       htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		                       htmlTable = (PdfPTable)element;
		                       HeaderTable32.addCell(htmlTable);
		                       document.add(HeaderTable32);
		                       HeaderTable32.flushContent();
		                   }else{
		                       paragraph.add(element);
		                       cell = new PdfPCell(paragraph);
		                       cell.setBorder(Rectangle.NO_BORDER);
		                       HeaderTable32.addCell(cell);
		                       document.add(HeaderTable32);
		                       HeaderTable32.flushContent();
		                       paragraph.clear();
		                   }
		               }                              
		           }else{
		        	   java.util.List<Element> ie3 = HTMLWorker.parseToList(new StringReader(dm.getTemplateData()), styleSheet);
		               for (Element element : ie3) {
		                   if (element instanceof PdfPTable)
		                   {
		                       PdfPTable htmlTable = new PdfPTable(1);
		                       int[] htmlTableWidth = {50};
		                                         htmlTable.setWidths(htmlTableWidth);
		                       htmlTable.setWidths(htmlTableWidth);
		                       htmlTable.setWidthPercentage(50f);
		                       htmlTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
		                       htmlTable = (PdfPTable)element;
		                       HeaderTable31.addCell(htmlTable);
		                       document.add(HeaderTable31);
		                       HeaderTable31.flushContent();
		                   }else{
		                       paragraph.add(element);
		                       cell = new PdfPCell(paragraph);
		                       cell.setBorder(Rectangle.NO_BORDER);
		                       HeaderTable31.addCell(cell);
		                       document.add(HeaderTable31);
		                       HeaderTable31.flushContent();
		                       paragraph.clear();
		                   }
		               }

		           } 
				}
				}

			
			HeaderTable5.addCell(new Phrase("", tabletext));
				 document.add(HeaderTable5);
			HeaderTable5.flushContent();

//End Template Data
			

			
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