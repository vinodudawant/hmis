<%@page import="java.util.ArrayList"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.service.RegService"%>
<%-- <%@page import="com.sun.org.apache.xpath.internal.operations.Mod"%> --%>
<%@page import="com.hms.model.BillModel"%>
<%@page import="com.hms.dto.MLCDetail"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.util.List"%>
<%@ page import="com.hms.dto.MLCDetail" %>
<%@ page import="com.hms.dto.HospitalDetails"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
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

            List<HospitalDetails> arrHospitalDetails = FetchHospitalDetails
                    .getHospDetails("0");
            HospitalDetails hospObj = arrHospitalDetails.get(0);

            ServletOutputStream outStream = response.getOutputStream();
            Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);    //*/new Rectangle(0, 0,648, 864));/* width,height*/
            document.setMargins(20, 20, 20, 50);

            PdfWriter.getInstance(document, outStream);
            document.open();
            //font

            Font header = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD);
            Font subheader = new Font(Font.FontFamily.HELVETICA, 8,
                    Font.BOLD);
            Font footer = new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD);
            header.setColor(10, 4, 2);

            Font tableheader = new Font(Font.FontFamily.HELVETICA, 10,
                    Font.BOLD);
            Font tabletext = new Font(Font.FontFamily.HELVETICA, 9,
                    Font.BOLD);
            Font small = new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL);

            String radioValue = request.getParameter("radioValue");
            String numberOf = request.getParameter("numberOf");
            java.util.Calendar currentDate = Calendar.getInstance();
            SimpleDateFormat dateformatter = new SimpleDateFormat(
                    "dd-MM-yyyy");
            String curr_date = dateformatter.format(currentDate.getTime());

            String path = hospObj.getFilePath();
            String hospitalName = hospObj.getHospitalName().toUpperCase();
            String address = hospObj.getHospitalAddress();
            String city = hospObj.getHospitalCity();
            String contact = hospObj.getHospitalContact();
            String path1 = application.getRealPath(path);

            document.newPage();
            PdfPTable HeaderTable1 = new PdfPTable(3);
            int[] headerwidth1 = { 40, 70, 10 };
            HeaderTable1.setWidths(headerwidth1);
            HeaderTable1.setWidthPercentage(95f);
            HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
            HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

            PdfPTable HeaderTable2 = new PdfPTable(5);
            int[] headerwidth2 = { 20, 20, 40, 10, 10 };
            HeaderTable2.setWidths(headerwidth2);
            HeaderTable2.setWidthPercentage(95f);
            HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

           
            String pname = request.getParameter("pname");
            String PatientID = request.getParameter("PatientID");
            String MRNo = request.getParameter("MRNo");
            String AgeSexWt = request.getParameter("AgeSexWt");
            String[] dim=AgeSexWt.split("/");
            String treatmentCount = request.getParameter("treatmentCount");
            String a1 = request.getParameter("a1");
            String a2 = request.getParameter("a2");
            String cityObj = request.getParameter("city");
            String taluka = request.getParameter("taluka");
            String district = request.getParameter("district");
            String ContactNo = request.getParameter("ContactNo");
            String Department = request.getParameter("Department");
            String Consultant = request.getParameter("Consultant");
            String regNo = request.getParameter("regNo");
            String TreatmentId = request.getParameter("treatmentId");
            String TokenNo = request.getParameter("TokenNo");
            String appDate = request.getParameter("appDate");
            String image = request.getParameter("image");
            String readImagePath = FilePath.getBasePath();
            String withPhoto = request.getParameter("withPhoto");
            Image img = null;
            PdfPCell cell = null;
            System.err.println("tieeeeeedd---------"+TreatmentId);
            Integer treatmentId = Integer.parseInt(TreatmentId);
			System.err.println("tidd---------"+treatmentId);
            RegService us=(ApplicationContextUtils.getApplicationContext()).getBean(RegService.class);
			List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
			ltRegMasterDto =us.fetchPatientsRecordByTreatmentId(treatmentId);
            
			String weight  	=ltRegMasterDto.get(0).getWeight();
			String opdipdno =ltRegMasterDto.get(0).getOpdipdno();
			//String height  	=ltRegMasterDto.get(0).getHeight();
			
            // second for spacing
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
            HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));
            document.add(HeaderTable1);
            HeaderTable1.flushContent();

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
            HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));

            HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));
            document.add(HeaderTable1);
            HeaderTable1.flushContent();

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
            HeaderTable1.addCell(new Phrase("", header));

            HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));

            HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));
            document.add(HeaderTable1);
            HeaderTable1.flushContent();

             HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));

            HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));


            /* Suraj Changes for Roplekar */
            HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));

            HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));
            HeaderTable1.addCell(new Phrase("", header));
            document.add(HeaderTable1);
            HeaderTable1.flushContent();


            HeaderTable1.getDefaultCell().setBorder(Rectangle.BOTTOM);
            HeaderTable1.addCell(new Phrase("            ", header));
            HeaderTable1.addCell(new Phrase("            ", header));
            document.add(HeaderTable1);
            HeaderTable1.flushContent();

            HeaderTable2.addCell(new Phrase("", subheader));
            HeaderTable2.addCell(new Phrase("", subheader));
            HeaderTable2.addCell(new Phrase(" ", header));
            HeaderTable2.addCell(new Phrase("", subheader));
            HeaderTable2.addCell(new Phrase("", subheader));
            document.add(HeaderTable2);
            HeaderTable2.flushContent();

            PdfPTable HeaderTable3 = new PdfPTable(4);
            int[] headerwidth3 = { 9, 60, 40, 30 };
            HeaderTable3.setWidths(headerwidth3);
            HeaderTable3.setWidthPercentage(95f);
            HeaderTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);

            document.add(HeaderTable3);
            HeaderTable3.flushContent();
            HeaderTable3.addCell(new Phrase(" ", subheader));
            HeaderTable3.addCell(new Phrase("Patient ID - " +PatientID, tabletext));
            HeaderTable3.addCell(new Phrase(" ", subheader));
            HeaderTable3.addCell(new Phrase("Date - " + appDate, tabletext));

            if(withPhoto.equals("1")){
            try {
                img = Image.getInstance(readImagePath + image);
                img.scaleAbsolute(60, 60);
                cell = new PdfPCell();
                cell.addElement(new Chunk(img, 5, -5));
                cell.setBorder(Rectangle.NO_BORDER);
            } catch (Exception e) {
                e.printStackTrace();
            }

            if (img == null) {
                HeaderTable3.addCell(new Phrase("", header));
            } else {
                HeaderTable3.addCell(cell);
            }
            }

            /* HeaderTable3.addCell(new Phrase("", header));
            HeaderTable3.addCell(new Phrase("", header));
            HeaderTable3.addCell(new Phrase("", header));
            HeaderTable3.addCell(new Phrase("", header));

            HeaderTable3.addCell(new Phrase("", header));
            HeaderTable3.addCell(new Phrase("", header));
            HeaderTable3.addCell(new Phrase("", header));
            HeaderTable3.addCell(new Phrase("", header)); */

            document.add(HeaderTable3);
            HeaderTable3.flushContent();
            PdfPTable HeaderTable4 = new PdfPTable(4);
            int[] headerwidth4 = { 9, 60, 40, 30};
            HeaderTable4.setWidths(headerwidth4);
            HeaderTable4.setWidthPercentage(95f);
            HeaderTable4.getDefaultCell().setBorder(Rectangle.NO_BORDER);

            HeaderTable4.addCell(new Phrase("", subheader));
            HeaderTable4.addCell(new Phrase("OPD No - " + opdipdno, tabletext));
            HeaderTable4.addCell(new Phrase("", subheader));
            HeaderTable4.addCell(new Phrase("", tabletext));
            
            HeaderTable4.addCell(new Phrase("", subheader));
            /* HeaderTable4.addCell(new Phrase("" + Consultant, tabletext)); commented by suraj for roplekar*/
            HeaderTable4.addCell(new Phrase("Name - " +pname , tabletext));
            HeaderTable4.addCell(new Phrase("", subheader));
            HeaderTable4.addCell(new Phrase("", tabletext));

            HeaderTable4.addCell(new Phrase("", subheader));
            HeaderTable4.addCell(new Phrase("Age/Gender - " + dim[0] +"/"+ dim[1], tabletext));
            HeaderTable4.addCell(new Phrase("", subheader));
            HeaderTable4.addCell(new Phrase("", tabletext));


            HeaderTable4.addCell(new Phrase("", subheader));
            HeaderTable4.addCell(new Phrase("Weight - "+ weight , tabletext));
            HeaderTable4.addCell(new Phrase("", header));
            HeaderTable4.addCell(new Phrase("", header));

            HeaderTable4.getDefaultCell().setBorder(Rectangle.BOTTOM);
            HeaderTable4.addCell(new Phrase("", header));
            HeaderTable4.addCell(new Phrase("", header));
            HeaderTable4.addCell(new Phrase("", header));
            HeaderTable4.addCell(new Phrase("", header));

            document.add(HeaderTable4);
            HeaderTable4.flushContent();

            /****************fetch mlc details**** @author husen*******/
            BillModel billmodel=new BillModel();
            int treatID=Integer.parseInt(TreatmentId);
            List<MLCDetail> mlcDEtails = billmodel.getMLCdetailsForPatient(treatID);
            if(mlcDEtails.size() > 0)
            {
                MLCDetail mlcObj = mlcDEtails.get(0);
                PdfPTable HeaderTable5 = new PdfPTable(2);
                int[] headerwidth5 = { 30, 60 };
                HeaderTable5.setWidths(headerwidth5);
                HeaderTable5.setWidthPercentage(95f);
                HeaderTable5.getDefaultCell().setBorder(Rectangle.NO_BORDER);
                HeaderTable5.addCell(new Phrase("MLC details:", subheader));
                HeaderTable5.addCell(new Phrase("", header));
                HeaderTable4.addCell(new Phrase("", header));
                HeaderTable4.addCell(new Phrase("", header));
                HeaderTable4.addCell(new Phrase("", header));
                HeaderTable4.addCell(new Phrase("", header));

                document.add(HeaderTable5);
                HeaderTable5.flushContent();

                PdfPTable HeaderTable7 = new PdfPTable(6);
                int[] headerwidth7 = { 20, 30, 20, 30, 20, 30 };
                HeaderTable7.setWidths(headerwidth7);
                HeaderTable7.setWidthPercentage(95f);
                HeaderTable7.getDefaultCell().setBorder(Rectangle.NO_BORDER);

                HeaderTable7.addCell(new Phrase("MLC No :", subheader));
                HeaderTable7.addCell(new Phrase("" + mlcObj.getMlc_no(), tabletext));
                HeaderTable7.addCell(new Phrase("FIR No :", subheader));
                HeaderTable7.addCell(new Phrase("" + mlcObj.getFir_no(), tabletext));
                HeaderTable7.addCell(new Phrase("Buccle No:", subheader));
                HeaderTable7.addCell(new Phrase("" + mlcObj.getBuccle_no(), tabletext));

                HeaderTable7.addCell(new Phrase("Police station Name:", subheader));
                HeaderTable7.addCell(new Phrase("" + mlcObj.getPolice_st_name(), tabletext));
                HeaderTable7.addCell(new Phrase("Police station address:", subheader));
                HeaderTable7.addCell(new Phrase("" + mlcObj.getPolice_st_add(), tabletext));
                HeaderTable7.addCell(new Phrase("Informer's Name:", subheader));
                HeaderTable7.addCell(new Phrase("" + mlcObj.getMlcInformerFirstName()+" "+mlcObj.getMlcInformerLastName(), tabletext));

                HeaderTable7.addCell(new Phrase("Mobile No :", subheader));
                HeaderTable7.addCell(new Phrase("" + mlcObj.getMlcInformerMobile(), tabletext));
                HeaderTable7.addCell(new Phrase("Date :", subheader));
                HeaderTable7.addCell(new Phrase("" + mlcObj.getMlcDate(), tabletext));
                HeaderTable7.addCell(new Phrase("Authority Name:", subheader));
                HeaderTable7.addCell(new Phrase("" + mlcObj.getAuthority_name(), tabletext));

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

            PdfPTable HeaderTable0 = new PdfPTable(4);
            int[] headerwidth0 = { 35, 35, 35, 50 };
            HeaderTable0.setWidths(headerwidth0);
            HeaderTable0.setWidthPercentage(95f);
            HeaderTable0.getDefaultCell().setBorder(Rectangle.NO_BORDER);

            HeaderTable0
                    .addCell(new Phrase(
                            "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
                            header));
            HeaderTable0
                    .addCell(new Phrase(
                            "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
                            header));
            HeaderTable0
                    .addCell(new Phrase(
                            "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
                            header));
            HeaderTable0
                    .addCell(new Phrase(
                            "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
                            header));

            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));

            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));

            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));

            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));

            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));

            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));

            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));

            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));

            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));

            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));

            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            
            
            
            HeaderTable0.addCell(new Phrase("Doctor's Signature & Authorized Stamp", tabletext));

            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("", header));
            HeaderTable0.addCell(new Phrase("Registration No. :   " + regNo, tabletext));
            document.add(HeaderTable0);
            HeaderTable0.flushContent();

            document.close();
            outStream.close();
            outStream.flush();
            return;
        } catch (Exception e) {
            System.err.println(e.getMessage());
            e.printStackTrace();
        }
    %>
</body>
</html>