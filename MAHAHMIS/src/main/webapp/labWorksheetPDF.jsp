<%@page import="java.net.URLDecoder"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="javax.swing.text.StyledEditorKit.ItalicAction"%>
<%@page import="com.hms.dto.Doctor"%>
<%@page import="com.hms.model.AdminModel"%>

<%@page import="java.util.Set"%>
<%@page import="java.util.Arrays"%>
<%@page import="com.lowagie.text.PageSize"%>
<%@page import="com.hms.dto.PatientSponsredDetails"%>
<%@page import="com.hms.dto.MLCDetail"%>
<%@page import="com.hms.dto.IpdPatientRelativeDetails"%>
<%@page import="com.hms.dto.Treatment"%>
<%@page import="com.hms.dto.Patient"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.util.List"%>
<%@ page import="com.hms.model.TreatmentModel"%>
<%@ page import="com.hms.model.PatientModel"%>
<%@ page import="com.hms.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<%@ page import="com.hms.patient.util.ConfigUIJSONUtility"%>
<%@ page import="org.json.simple.JSONArray"%>
<%@ page import="org.json.simple.parser.JSONParser"%>
<%@ page import="com.hms.model.PathologyModel"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.HashSet"%>
<%@ page import="com.hms.dto.LabProfile"%>
<%@ page import="com.hms.dto.LabTest"%>
<%@ page import="com.hms.dto.LabPkg"%>
<%@ page import="com.hms.dto.LabProfileTestComp"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="com.hms.pharmacy.upload.FilePath"%>

<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>
<%@ page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.ehat.controller.LabWorkSheetController"%>
<%@ page import="com.hms.ehat.dto.LabRequestDTO"%>
<%@ page import="com.hms.dto.HospitalDetails"%>
<%@page import="com.hms.ehat.service.LabService"%>
<%@ page import="com.hms.ehat.dto.LabWorksheetViewDto"%>
<%@ page import="com.hms.ehat.dto.LabProfileDTO"%>
<%@page import="java.util.ResourceBundle"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"
    import="com.lowagie.text.Chunk,com.lowagie.text.Document,com.lowagie.text.Element,com.lowagie.text.Font
 
,com.lowagie.text.HeaderFooter,com.lowagie.text.Image,com.lowagie.text.Paragraph,com.lowagie.text.Phrase,com.lowagie.text.Rectangle
 
,com.lowagie.text.pdf.PdfPCell,com.lowagie.text.pdf.PdfPTable,com.lowagie.text.pdf.PdfWriter,com.itextpdf.text.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.List,java.util.Map,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext, com.hms.dao.InventoryDAO,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport,
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>OPD Receipt</title>
</head>
<body>
    <%
        try {
        	ServletOutputStream outStream = response.getOutputStream();
        	response.reset();
        	response.setContentType("application/pdf");
            Document document = new Document(new Rectangle(0, 0, 595, 842));///*new Rectangle(500,864),0,0,0,0);    //*/new Rectangle(0, 0,648, 864));/* width,height*/
            document.setMargins(10, 10, 40, 52);

            PdfWriter writer = PdfWriter.getInstance(document, outStream);
            //PdfWriter.getInstance(document, outStream);

            Font smallNew = new Font(Font.HELVETICA, 8,Font.BOLD);

            HeaderFooter event = new HeaderFooter(new Phrase(
                    "        RECPT DATE    RECEIPT NO.        TreatmentID                        PATIENT NAME                                       AGE                              REFERENCE DOCTOR        ",
                    smallNew), false);
            //writer.setBoxSize("art", new Rectangle(36, 54, 559, 788));
            //writer.setHeader(event);
            document.setHeader(event);
            document.open();
            // parameter value
            session = request.getSession();
			String txtFdate = (String) request.getParameter("txtFdate");
			String txtTdate = (String) request.getParameter("txtTdate");
           	int frmRecNo=Integer.parseInt(request.getParameter("frmRecNo"));
            int toRecNo=Integer.parseInt(request.getParameter("toRecNo"));
           	
            int IdPathologist=0;//Integer.parseInt(request.getParameter("IdPathologist"));
            
            //String TechnicianName = request.getParameter("TechnicianName");
            String advice="";
            String printTech = request.getParameter("TechN");
            
         	//checking for MEESHA or not(off for MEESHA).
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			ResourceBundle rsrcBndlEhat = ResourceBundle.getBundle("Ehat");
			String billPrintsHeader = (String)resourceBundleEhat.getString("billPrintsHeader");
			String labDrNameFolw = (String)rsrcBndlEhat.getString("labDrNameFolw");
            
			LabWorkSheetController labCon=(ApplicationContextUtils.getApplicationContext()).getBean(LabWorkSheetController.class);
			LabRequestDTO labReq=new LabRequestDTO();	
			List<LabRequestDTO> labReqDtolist = new ArrayList<LabRequestDTO>();
			
            PathologyModel objPathologyModel = new PathologyModel();
            LabWorksheetViewDto Obj = new LabWorksheetViewDto();
          //  List<LabProfileDTO> lpobj = new ArrayList();
            Obj = labCon.getLabWorksheetReportData(txtFdate, txtTdate, frmRecNo, toRecNo,"print", request);
           // lpobj = labCon.checkTestIsTemplate();
            
            Font subheader1 = new Font(Font.HELVETICA, 9,Font.BOLD);
 
            Font header = new Font(Font.HELVETICA, 10, Font.BOLD);
            Font subheader = new Font(Font.HELVETICA, 7, Font.BOLD);
           /*  Font footer = new Font(Font.HELVETICA, 8, Font.NORMAL);
            header.setColor(10, 4, 2); */

            Font tableheader = new Font(Font.HELVETICA, 10, Font.BOLD);
            Font tabletext = new Font(Font.HELVETICA, 9, Font.NORMAL);
            Font small = new Font(Font.HELVETICA, 8, Font.NORMAL);

			PdfPTable HeaderTable1 = new PdfPTable(5);
            int[] headerwidth1 = { 13, 35, 35, 30,10 };
            HeaderTable1.setWidths(headerwidth1);
            HeaderTable1.setWidthPercentage(95f);
            HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
            HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);


			PdfPTable HeaderTable2 = new PdfPTable(5);
            int[] headerwidth2 = { 13, 35, 35, 18, 22 };
            HeaderTable2.setWidths(headerwidth2);
            HeaderTable2.setWidthPercentage(95f);
            HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
            
			PdfPTable HeaderTable3 = new PdfPTable(8);
            int[] headerwidth3 = {20,35,19,35,19,35,19,10};
            HeaderTable3.setWidths(headerwidth3);
            HeaderTable3.setWidthPercentage(95f);
            HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
            
			PdfPTable HeaderTable4 = new PdfPTable(1);
            int[] headerwidth4 = {100};
            HeaderTable4.setWidths(headerwidth4);
            HeaderTable4.setWidthPercentage(95f);
            HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);
            
            
            //HeaderTable1.getDefaultCell().setBorder(Rectangle.TOP);
            
            
          	/* HeaderTable1.addCell(new Phrase("RECPT DATE", subheader1));
            HeaderTable1.addCell(new Phrase("RECEIPT NO. ",subheader1));
            HeaderTable1.addCell(new Phrase("PATIENT NAME", subheader1));
            HeaderTable1.addCell(new Phrase("REFERENCE DOCTOR", subheader1));
            HeaderTable1.addCell(new Phrase("AGE", subheader1)); */
            
			HeaderTable1.addCell(new Phrase("", tabletext));
            HeaderTable1.addCell(new Phrase("", tabletext));
            HeaderTable1.addCell(new Phrase("", tabletext));
            HeaderTable1.addCell(new Phrase("", tabletext));
            HeaderTable1.addCell(new Phrase("", tabletext));
            
            //HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
            
            document.add(HeaderTable1);
            HeaderTable1.flushContent();
            
            if (Obj.getListLabSlaveWorksheetView().size() > 0) {
            	
            	for(int pt = 0; pt < Obj.getListLabSlaveWorksheetView().size(); pt++){
                	
            		LabWorksheetViewDto labWrkObj=Obj.getListLabSlaveWorksheetView().get(pt);
            		String receiptDate = labWrkObj.getReceiptDate();
            		int billReceiptId = labWrkObj.getBillReceiptId();
            		String patientName = labWrkObj.getPatientName();
            		String refDocName = labWrkObj.getRefDocName();
            		int treatmentId = labWrkObj.getTreatmentId();
            		String age =labWrkObj.getAge();
            		String ptage = "";
                    if((age.split("/")[0]).equalsIgnoreCase("0Y")){
                        if((age.split("/")[1]).equalsIgnoreCase("0M")){
                            	ptage=(age.split("/")[2]);                  
                            }else{
                            	ptage=(age.split("/")[1]);
                            }                                
                        }else{
                        	ptage=age.split("/")[0];
                        }
                    
                    ptage=ptage+"/"+labWrkObj.getGender();
                    
            		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy"); 
            		Date rDate=new SimpleDateFormat("yyyy-MM-dd").parse(receiptDate);
            		receiptDate= formatter.format(rDate);
            		
                	HeaderTable4.addCell(new Phrase("", subheader1));
                	HeaderTable4.getDefaultCell().setBorder(Rectangle.BOTTOM);
                	document.add(HeaderTable4);
                	HeaderTable4.flushContent();
                	 
            		HeaderTable2.addCell(new Phrase(receiptDate, subheader1));
            		HeaderTable2.addCell(new Phrase(""+billReceiptId+"                       "+treatmentId, subheader1));
            		//HeaderTable2.addCell(new Phrase(""+treatmentId, subheader1));
            		HeaderTable2.addCell(new Phrase(patientName, subheader1));
            		HeaderTable2.addCell(new Phrase(ptage, subheader1));
            		
            		if(refDocName==null || refDocName.equalsIgnoreCase("") || refDocName==""){
            			HeaderTable2.addCell(new Phrase("(SELF)", subheader1));
            		}else{
            			HeaderTable2.addCell(new Phrase(refDocName, subheader1));
            		}
                    
            	   HeaderTable2.addCell(new Phrase("", tabletext));
            		HeaderTable2.addCell(new Phrase("", tabletext));
            		HeaderTable2.addCell(new Phrase("", tabletext));
            		HeaderTable2.addCell(new Phrase("", tabletext));
            		HeaderTable2.addCell(new Phrase("", tabletext)); 
                    
                    if(labWrkObj.getListLabProfile().size()>0){
                   
                    	for(int pro = 0; pro < labWrkObj.getListLabProfile().size(); pro++){
	                    		
                    		LabProfile proObj=labWrkObj.getListLabProfile().get(pro);
	                    		
	                    	String reportHeading =proObj.getReportHeading();
	                        String tempFlag = proObj.getTemplate_wise();
	                        System.out.println("tempFlag--------->"+tempFlag);
	                       if(tempFlag.equals("N")) 
	                       {
	                        HeaderTable2.addCell(new Phrase("", subheader1));
	                        Chunk underline = new Chunk(reportHeading,subheader1);
	                    	underline.setUnderline(0.1f, -2f); //0.1 thick, -2 y-location
	                    	HeaderTable2.addCell(new Phrase(underline));
	                        HeaderTable2.addCell(new Phrase("", subheader1));
	                        HeaderTable2.addCell(new Phrase("", subheader1));
	                        HeaderTable2.addCell(new Phrase("", subheader1));
	                        
	                		HeaderTable2.addCell(new Phrase("", tabletext));
	                		HeaderTable2.addCell(new Phrase("", tabletext));
	                		HeaderTable2.addCell(new Phrase("", tabletext));
	                		HeaderTable2.addCell(new Phrase("", tabletext));
	                		HeaderTable2.addCell(new Phrase("", tabletext));
	                		
	                        document.add(HeaderTable2);
	                        HeaderTable2.flushContent();
	                    
	                       
	                        int totalSize = proObj.getTestli().size();
	                        if(proObj.getTestli().size()>0){
		                        for(int tst = 0; tst < proObj.getTestli().size(); tst = tst+3){
		                        	LabTest test = proObj.getTestli().get(tst);
		                        	String testName=test.getTestName();
		                        	HeaderTable3.addCell(new Phrase("", tabletext));
		                        	HeaderTable3.addCell(new Phrase(testName, tabletext));
		                        	HeaderTable3.addCell(new Phrase("________", tabletext));
		                        	
		                        	if(totalSize > (tst+1) && proObj.getTestli().get(tst+1) != null){
		                        		HeaderTable3.addCell(new Phrase(""+Obj.getListLabSlaveWorksheetView().get(pt).getListLabProfile().get(pro).getTestli().get(tst+1).getTestName(), tabletext));
		                            	HeaderTable3.addCell(new Phrase("________", tabletext));
		                        	}else{
		                        		HeaderTable3.addCell(new Phrase("", tabletext));
		                            	HeaderTable3.addCell(new Phrase("________", tabletext));
		                        	}
		                        	
		                        	if(totalSize > (tst+2) && proObj.getTestli().get(tst+2) != null){
		                        		HeaderTable3.addCell(new Phrase(""+Obj.getListLabSlaveWorksheetView().get(pt).getListLabProfile().get(pro).getTestli().get(tst+2).getTestName(), tabletext));
		                            	HeaderTable3.addCell(new Phrase("________", tabletext));
		                        	}else{
		                        		HeaderTable3.addCell(new Phrase("", tabletext));
		                            	HeaderTable3.addCell(new Phrase("________", tabletext));
		                        	}
		                        	
		                        	HeaderTable3.addCell(new Phrase("", tabletext));
		                        	
		                        	HeaderTable3.addCell(new Phrase("\n", tabletext));
			                        HeaderTable3.addCell(new Phrase("\n", tabletext));
			                        HeaderTable3.addCell(new Phrase("\n", tabletext));
			                        HeaderTable3.addCell(new Phrase("\n", tabletext));
			                        HeaderTable3.addCell(new Phrase("\n", tabletext));
			                        HeaderTable3.addCell(new Phrase("\n", tabletext));
			                        HeaderTable3.addCell(new Phrase("\n", tabletext));
			                        HeaderTable3.addCell(new Phrase("\n", tabletext));
		                        	
		                        }
		                        HeaderTable3.addCell(new Phrase("", tabletext));
		                        HeaderTable3.addCell(new Phrase("", tabletext));
		                        HeaderTable3.addCell(new Phrase("", tabletext));
		                        HeaderTable3.addCell(new Phrase("", tabletext));
		                        HeaderTable3.addCell(new Phrase("", tabletext));
		                        HeaderTable3.addCell(new Phrase("", tabletext));
		                        HeaderTable3.addCell(new Phrase("", tabletext));
		                        HeaderTable3.addCell(new Phrase("", tabletext));
		                        
		                        document.add(HeaderTable3);
	                            HeaderTable3.flushContent();
		                        
	                        }
	                        
	                       }
	                       else
	                       {
	                    	   HeaderTable2.addCell(new Phrase("", subheader1));
		                        Chunk underline = new Chunk(reportHeading,subheader1);
		                    	underline.setUnderline(0.1f, -2f); //0.1 thick, -2 y-location
		                    	HeaderTable2.addCell(new Phrase(underline));
		                        HeaderTable2.addCell(new Phrase("", subheader1));
		                        HeaderTable2.addCell(new Phrase("", subheader1));
		                        HeaderTable2.addCell(new Phrase("", subheader1));
		                        
		                		HeaderTable2.addCell(new Phrase("", tabletext));
		                		HeaderTable2.addCell(new Phrase("", tabletext));
		                		HeaderTable2.addCell(new Phrase("", tabletext));
		                		HeaderTable2.addCell(new Phrase("", tabletext));
		                		HeaderTable2.addCell(new Phrase("", tabletext));
		                		
		                        document.add(HeaderTable2);
		                        HeaderTable2.flushContent();
		                        
		                        
		                       
	                        
	                        		HeaderTable3.addCell(new Phrase("", tabletext));
	  	                        	HeaderTable3.addCell(new Phrase(reportHeading, tabletext));
	  	                        	HeaderTable3.addCell(new Phrase("________", tabletext)); 
	  	                    	   
	                        	
	                        		HeaderTable3.addCell(new Phrase("", tabletext));
	                            	HeaderTable3.addCell(new Phrase("________", tabletext));
	                        	
	                            	

	                        		HeaderTable3.addCell(new Phrase("", tabletext));
	                            	HeaderTable3.addCell(new Phrase("________", tabletext));
	                        	
	                        	
	                        	HeaderTable3.addCell(new Phrase("", tabletext));
	                        	
	                        	 HeaderTable3.addCell(new Phrase("\n", tabletext));
		                        HeaderTable3.addCell(new Phrase("\n", tabletext));
		                        HeaderTable3.addCell(new Phrase("\n", tabletext));
		                        HeaderTable3.addCell(new Phrase("\n", tabletext));
		                        HeaderTable3.addCell(new Phrase("\n", tabletext));
		                        HeaderTable3.addCell(new Phrase("\n", tabletext));
		                        HeaderTable3.addCell(new Phrase("\n", tabletext));
		                        HeaderTable3.addCell(new Phrase("\n", tabletext)); 
		                        
		                        HeaderTable3.addCell(new Phrase("", tabletext));
		                        HeaderTable3.addCell(new Phrase("", tabletext));
		                        HeaderTable3.addCell(new Phrase("", tabletext));
		                        HeaderTable3.addCell(new Phrase("", tabletext));
		                        HeaderTable3.addCell(new Phrase("", tabletext));
		                        HeaderTable3.addCell(new Phrase("", tabletext));
		                        HeaderTable3.addCell(new Phrase("", tabletext));
		                        HeaderTable3.addCell(new Phrase("", tabletext)); 
		                        
		                        document.add(HeaderTable3);
	                            HeaderTable3.flushContent();
	                       }
	                    }
                    }
                }
            }
            
            document.close();
            outStream.flush();
            outStream.close();

        } catch (Exception e) {
             System.err.println(e.getMessage());
            e.printStackTrace();
        }
    %>
</body>
</html>