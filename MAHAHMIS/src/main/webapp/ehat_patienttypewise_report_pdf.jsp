<%@page import="com.itextpdf.text.Font.FontFamily"%>
<%@page import="com.hms.ehat.dto.BillRegReportDTO"%>
<%@page import="java.util.ResourceBundle"%>
<%@page import="com.hms.ehat.dto.OpdDiagnoRecReportDTO"%>
<%@page import="com.hms.ehat.dto.OpdDiagnoReportDTO"%>
<%@page import="com.hms.ehat.service.FinanceService"%>
<%@page import="com.hms.ehat.dto.RegistrationOtherDto"%>
<%@page import="com.hms.ehat.service.OtherBillingService"%>
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
<%@page import="com.hms.hisab.model.HisabModel"%>
<%@page import="com.hms.ipdbill.dto.BillReceiptMasterDTO"%>
<%@page import="com.hms.ipdbill.serviceImpl.BillServiceImpl"%>
<%@page import="com.hms.ipdbill.service.BillService"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.hms.dto.BillComponentSample"%>
<%@page import="com.hms.administrator.service.HospitalDetailAdminService"%>
<%@page import="com.hms.administrator.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="com.hms.utility.EnglishNumberToWords"%>
<%@ page import="com.hms.dto.RadiationMaster"%>

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
<title>Other Bill Receipt PDf</title>
</head>
<body>
	<%
		try {

			response.setContentType("application/pdf");
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String patientId= resourceBundle.getObject("patientIdLabel").toString();

			ServletOutputStream outStream = response.getOutputStream();
			response.reset();
			
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			document.setMargins(20, 20, 40, 40);

			PdfWriter.getInstance(document, outStream);
			document.open();
		
			/* -------------------- Define Fonts ---------------------------  */			
			Font header = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font subheader = new Font(Font.FontFamily.HELVETICA, 9, Font.BOLD);
			Font footer = new Font(Font.FontFamily.HELVETICA, 9, Font.BOLD);
			header.setColor(10, 4, 2);

			Font tableheader = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
			Font tabletext = new Font(Font.FontFamily.HELVETICA, 9, Font.NORMAL);
			Font small = new Font(Font.FontFamily.HELVETICA, 9, Font.NORMAL);
			/* -------------------- Define Fonts ---------------------------  */
			
			session = request.getSession();
			String user_name = (String) session.getAttribute("userName");
			
			

			HttpSession session2 = request.getSession();
			int hospitalUnitId= (Integer) session2.getAttribute("uId");
			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			//List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
		    List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);
			
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
				img.scaleAbsolute(150, 60);
				cell = new PdfPCell();
				cell.addElement(new Chunk(img, 5, -40));
				cell.setBorder(Rectangle.NO_BORDER);
			} catch (Exception e) {
				e.printStackTrace();
			} 
			
			int unitId=Integer.parseInt(request.getParameter("unitId"));
			int userId=Integer.parseInt(request.getParameter("userId"));
			String fromDate=request.getParameter("fromDate")+"";
			String toDate=request.getParameter("toDate")+"";
			
			
			int source=Integer.parseInt(request.getParameter("source"));
			int sponsorId=Integer.parseInt(request.getParameter("sponsorId"));
			
			int sponsorF=Integer.parseInt(request.getParameter("sponsorF"));
			int sponsorL=Integer.parseInt(request.getParameter("sponsorL"));
		
			
			FinanceService financeService=(ApplicationContextUtils.getApplicationContext()).getBean(FinanceService.class);	
			//List<OpdDiagnoRecReportDTO> lstPojo1 = financeService.fetchOpdDiagnoRec(unitId,userId,fromDate,toDate);
			//List<BillRegReportDTO> lstPojo1 = financeService.getBillRegisterReport(unitId,userId,fromDate,toDate,source,sponsorId,sponsorF,sponsorL);
			List<BillRegReportDTO> lstPojo1=financeService.getPatientTypeWiseIpdBill(unitId,userId,fromDate,toDate,source,sponsorId,sponsorF,sponsorL);
			
			DecimalFormat df2 = new DecimalFormat("0.00");
			
						
			document.newPage();			
			
			///AdminModel adminModel = new AdminModel();
		//	int printId = 2;
		//	int numOfPrint = adminModel.generalAccessNumOfPrint(printId);// to get number of prints
	
			// Table 1 : For hospital adress details start
			
			PdfPTable HeaderTable1 = new PdfPTable(3);
			int[] headerwidth1 = { 40, 80, 20 };
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
			Font bold = new Font(FontFamily.TIMES_ROMAN, 12, Font.BOLD);
			Phrase p = new Phrase();
			p.add(new Chunk(" "+hospitalName, bold));			
			p.add(new Chunk(" \n\n"+address, tabletext));			
			p.add(new Chunk(" "+city+" Pin- "+hospitalZip, tabletext));
			p.add(new Chunk(" Phone No. "+hPhoneNo, tabletext));	
			p.add(new Chunk(" \n "+webste+" email: "+email, tabletext));
			if (cinNo.equalsIgnoreCase("-")) {
				
			}else{
				p.add(new Chunk(" \nCIN: " + cinNo, tabletext));
			}
			if (serviceTaxNo.equalsIgnoreCase("-")) {
				
			}else{
				p.add(new Chunk(" \nService Tax: " + serviceTaxNo, tabletext));
			}
			if (panNo.equalsIgnoreCase("-")) {
				
			}else{
				p.add(new Chunk( ", PAN No: " + panNo, tabletext));
			}	
			
			PdfPCell hospitalNameCell = new PdfPCell(p);				
			hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
			hospitalNameCell.setBorder(Rectangle.NO_BORDER);			
			HeaderTable1.addCell(hospitalNameCell);
			
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
			
			
			 
			// Table5 : For service details head start
			 
			PdfPTable HeaderTable5 = new PdfPTable(11);
			int[] headerwidth5 = { 4,4,5,10,5,5,5,5,5,5,5};
			HeaderTable5.setWidths(headerwidth5);
			HeaderTable5.setWidthPercentage(95f);
			HeaderTable5.getDefaultCell().setBorder(Rectangle.BOTTOM);
			 
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));	
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			//HeaderTable5.addCell(new Phrase("", tabletext));
			//HeaderTable5.addCell(new Phrase("", tabletext));

			HeaderTable5.addCell(new Phrase("Sr.No", subheader));	
			HeaderTable5.addCell(new Phrase("Bill No", subheader));	
			HeaderTable5.addCell(new Phrase("Date", subheader));
			HeaderTable5.addCell(new Phrase("Patient Name.", subheader));
			
			HeaderTable5.addCell(new Phrase("Sub Total", subheader));
			HeaderTable5.addCell(new Phrase("Concession", subheader));
			HeaderTable5.addCell(new Phrase("Tax Amt", subheader));
			HeaderTable5.addCell(new Phrase("Net Amt", subheader));
			
			HeaderTable5.addCell(new Phrase("Advance", subheader));
			HeaderTable5.addCell(new Phrase("Bill Paid", subheader));
			HeaderTable5.addCell(new Phrase("Balance", subheader));			
			//HeaderTable5.addCell(new Phrase("", subheader));		
			//HeaderTable5.addCell(new Phrase("", subheader));	
			
			

			document.add(HeaderTable5);
			HeaderTable5.flushContent();

			HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);

			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));	
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			//HeaderTable5.addCell(new Phrase("", tabletext));
			//HeaderTable5.addCell(new Phrase("", tabletext));
			
			double totGstAmt=0.0;
			double totAmt1=0.0;
			double totDisAmt=0.0;
			double totPaidAmt=0.0;
			double totBalAmt=0.0;
			//System.out.println(" lstPojo1.size():"+ lstPojo1.size());
			for (int i = 0; i < lstPojo1.size(); i++) {
				totGstAmt=totGstAmt+lstPojo1.get(i).getGstAmt();
				totAmt1=totAmt1+lstPojo1.get(i).getTotAmt();
				totDisAmt=totDisAmt+lstPojo1.get(i).getDiscAmt();
				totPaidAmt=totPaidAmt+lstPojo1.get(i).getPaidAmt();
				totBalAmt=totBalAmt+lstPojo1.get(i).getRemainAmt();
				
				
				int recNo=lstPojo1.get(i).getRecNo();
				String recDate=lstPojo1.get(i).getRecDate();
				String patientName=lstPojo1.get(i).getPatientName();
				String drName=lstPojo1.get(i).getDrName();
				String billdate=lstPojo1.get(i).getBillDate();
				
				String serviceName=lstPojo1.get(i).getServiceName();				
				double gstAmt=lstPojo1.get(i).getGstAmt();
				double totAmt=lstPojo1.get(i).getTotAmt();
				double discAmt=lstPojo1.get(i).getDiscAmt();
				
				double paidAmt=lstPojo1.get(i).getPaidAmt();
				double remainAmt=lstPojo1.get(i).getRemainAmt();				
				String refDr=lstPojo1.get(i).getRefDr();				
				String source1=lstPojo1.get(i).getSource();
				String sponsorLeaf =lstPojo1.get(i).getSponsorLeaf();
				 if(refDr==null){
						refDr="-";
				}  
				 if(remainAmt <=0){
					 if(remainAmt<0){
							
						 remainAmt=0;
						}
				 	HeaderTable5.addCell(new Phrase("", tabletext));
				 	HeaderTable5.addCell(new Phrase("" ,tabletext));	
					HeaderTable5.addCell(new Phrase("Company Type :",subheader));				
					HeaderTable5.addCell(new Phrase(""+source1,subheader));
					HeaderTable5.addCell(new Phrase("" ,tabletext));
					
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("" ,tabletext));				
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.addCell(new Phrase("",tabletext));
					
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("" ,tabletext));	
					//HeaderTable5.addCell(new Phrase("", tabletext));
					
					HeaderTable5.addCell(new Phrase("", tabletext));
				 	HeaderTable5.addCell(new Phrase("" ,tabletext));	
					HeaderTable5.addCell(new Phrase("Company Name :",subheader));				
					HeaderTable5.addCell(new Phrase(""+sponsorLeaf,subheader));
					HeaderTable5.addCell(new Phrase("" ,tabletext));
					
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("" ,tabletext));				
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.addCell(new Phrase("",tabletext));
					
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("" ,tabletext));	
					//HeaderTable5.addCell(new Phrase("", tabletext));
					
					//HeaderTable5.addCell(new Phrase("" ,tabletext));
				 
				HeaderTable5.addCell(new Phrase(""+(i+1),tabletext));	
				HeaderTable5.addCell(new Phrase(""+recNo, tabletext));
				HeaderTable5.addCell(new Phrase(""+ billdate,tabletext));				
				HeaderTable5.addCell(new Phrase(""+ patientName,tabletext));
				
				
				HeaderTable5.addCell(new Phrase(""+totAmt, tabletext));
				HeaderTable5.addCell(new Phrase(""+discAmt ,tabletext));				
				HeaderTable5.addCell(new Phrase("0.0",tabletext));
				HeaderTable5.addCell(new Phrase("" + totAmt,tabletext));
				
				HeaderTable5.addCell(new Phrase(""+paidAmt, tabletext));
				HeaderTable5.addCell(new Phrase(""+paidAmt ,tabletext));	
				HeaderTable5.addCell(new Phrase(""+remainAmt, tabletext));
				//HeaderTable5.addCell(new Phrase("" ,tabletext));	
				//HeaderTable5.addCell(new Phrase("" ,tabletext));
				
				
				HeaderTable5.addCell(new Phrase("", tabletext));
				HeaderTable5.addCell(new Phrase("" ,tabletext));				
				HeaderTable5.addCell(new Phrase("",tabletext));
				HeaderTable5.addCell(new Phrase("",tabletext));
				
				HeaderTable5.addCell(new Phrase(""+totAmt, subheader));
				HeaderTable5.addCell(new Phrase(""+discAmt ,subheader));				
				HeaderTable5.addCell(new Phrase("0.0",subheader));
				HeaderTable5.addCell(new Phrase("" + totAmt,subheader));
				
				HeaderTable5.addCell(new Phrase(""+paidAmt, subheader));
				HeaderTable5.addCell(new Phrase(""+paidAmt ,subheader));	
				HeaderTable5.addCell(new Phrase(""+remainAmt, subheader));
				//HeaderTable5.addCell(new Phrase("" ,subheader));
				//System.out.println(remainAmt);
				 }
				 else if(remainAmt > 0)
				 {
					 if(remainAmt<0){
							
						 remainAmt=0;
						}	

					 	HeaderTable5.addCell(new Phrase("", tabletext));
					 	HeaderTable5.addCell(new Phrase("" ,tabletext));	
						HeaderTable5.addCell(new Phrase("Company Type :",subheader));				
						HeaderTable5.addCell(new Phrase(""+source1,subheader));
						HeaderTable5.addCell(new Phrase("" ,tabletext));
						
						HeaderTable5.addCell(new Phrase("", tabletext));
						HeaderTable5.addCell(new Phrase("" ,tabletext));				
						HeaderTable5.addCell(new Phrase("",tabletext));
						HeaderTable5.addCell(new Phrase("",tabletext));
						
						HeaderTable5.addCell(new Phrase("", tabletext));
						HeaderTable5.addCell(new Phrase("" ,tabletext));	
						//HeaderTable5.addCell(new Phrase("", tabletext));
						
						HeaderTable5.addCell(new Phrase("", tabletext));
					 	HeaderTable5.addCell(new Phrase("" ,tabletext));	
						HeaderTable5.addCell(new Phrase("Company Name :",subheader));				
						HeaderTable5.addCell(new Phrase(""+sponsorLeaf,subheader));
						HeaderTable5.addCell(new Phrase("" ,tabletext));
						
						HeaderTable5.addCell(new Phrase("", tabletext));
						HeaderTable5.addCell(new Phrase("" ,tabletext));				
						HeaderTable5.addCell(new Phrase("",tabletext));
						HeaderTable5.addCell(new Phrase("",tabletext));
						
						HeaderTable5.addCell(new Phrase("", tabletext));
						HeaderTable5.addCell(new Phrase("" ,tabletext));	
						//HeaderTable5.addCell(new Phrase("", tabletext));
						
						//HeaderTable5.addCell(new Phrase("" ,tabletext));
					 
					HeaderTable5.addCell(new Phrase(""+(i+1),tabletext));	
					HeaderTable5.addCell(new Phrase(""+recNo, tabletext));
					HeaderTable5.addCell(new Phrase(""+ billdate,tabletext));				
					HeaderTable5.addCell(new Phrase(""+ patientName,tabletext));
					
					
					HeaderTable5.addCell(new Phrase(""+totAmt, tabletext));
					HeaderTable5.addCell(new Phrase(""+discAmt ,tabletext));				
					HeaderTable5.addCell(new Phrase("0.0",tabletext));
					HeaderTable5.addCell(new Phrase("" + totAmt,tabletext));
					
					HeaderTable5.addCell(new Phrase(""+paidAmt, tabletext));
					HeaderTable5.addCell(new Phrase(""+paidAmt ,tabletext));	
					HeaderTable5.addCell(new Phrase(""+remainAmt, tabletext));
					//HeaderTable5.addCell(new Phrase("" ,tabletext));	
					//HeaderTable5.addCell(new Phrase("" ,tabletext));
					
					
					HeaderTable5.addCell(new Phrase("", tabletext));
					HeaderTable5.addCell(new Phrase("" ,tabletext));				
					HeaderTable5.addCell(new Phrase("",tabletext));
					HeaderTable5.addCell(new Phrase("",tabletext));
					
					HeaderTable5.addCell(new Phrase(""+totAmt, subheader));
					HeaderTable5.addCell(new Phrase(""+discAmt ,subheader));				
					HeaderTable5.addCell(new Phrase("0.0",subheader));
					HeaderTable5.addCell(new Phrase("" + totAmt,subheader));
					
					HeaderTable5.addCell(new Phrase(""+paidAmt, subheader));
					HeaderTable5.addCell(new Phrase(""+paidAmt ,subheader));	
					HeaderTable5.addCell(new Phrase(""+remainAmt, subheader));
					//HeaderTable5.addCell(new Phrase("" ,subheader));
					  
				 }
			}
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
			
			/* HeaderTable5.getDefaultCell().setBorder(Rectangle.TOP);
			
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			
			HeaderTable5.addCell(new Phrase("Total", subheader));
			HeaderTable5.addCell(new Phrase(""+totGstAmt, subheader));	
			HeaderTable5.addCell(new Phrase(""+totAmt1, subheader));
			HeaderTable5.addCell(new Phrase(""+totDisAmt, subheader));
			
			HeaderTable5.addCell(new Phrase(""+totPaidAmt, subheader));
			HeaderTable5.addCell(new Phrase(""+totBalAmt, subheader));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));	 */
			//HeaderTable5.addCell(new Phrase("", tabletext));	
			HeaderTable5.getDefaultCell().setBorder(Rectangle.TOP);
			
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			HeaderTable5.addCell(new Phrase("", tabletext));
			//HeaderTable5.addCell(new Phrase("", tabletext));
			
			document.add(HeaderTable5);
			HeaderTable5.flushContent();
			
						
			document.add(HeaderTable1);
			HeaderTable1.flushContent();
							
			document.close();

			outStream.flush();
			outStream.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	%>
	
</body>
</html>