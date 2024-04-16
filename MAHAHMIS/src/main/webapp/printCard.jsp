<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@page import="java.util.ResourceBundle"%>

<%-- 
<script type="text/javascript">
	/* onload = function() {
		window.print();
		window.close();

	} */
</script>

<head>
<title>Patient Card</title>
</head>
<%
	String id = request.getParameter("pid");
	String nid = "";
	if ((id.length()) < 4) {
		int len = id.length();
		int xp = (4 - len);
		for (int j = 0; j <= xp; j++) {
			id = "0" + id;
		}
	}
	bcrequest.setHeight("11");
	bcrequest.setMsg(id);
	final String genbc = bcrequest.toURL();
	String strPatName = request.getParameter("pname");
	String regDate = request.getParameter("regDate");
	
%>
<style type="text/css" media="print">
@page {
	size: landscape;
}
</style>

<body onload="window.print()">

	<div style="width: 310px; height: 160px;">
		<div
			style="width: 70px; font-size: 9pt; font-family: arial; padding-left: 25px; font-weight: bold; margin-top: 0.4cm"><%=id%>
		</div>
		<div
			style="width: 200px; margin-top: 2.5cm; margin-left: 160px; font-family: cambria; font-weight: bold;">
			<div style="width: 225px; float: left;">
				<table>
					<tr>
						<td
							style="text-transform: uppercase; font-size: 9pt; font-weight: bold;">Patient ID:<%=id%></td>
					</tr>
					<tr>
						<td
							style="text-transform: uppercase; font-size: 9pt; font-weight: bold;">Patient Name:<%=strPatName%></td>
					</tr>
				</table>
				<div style="width: 225px; font-size: 9pt;">Reg Date:
					<%=request.getParameter("regDate")%></div>
			</div>
			<div style="width: 70px; float: left; margin-top: 0.2cm;">
				<img height="45" src="<%=genbc%>&ext=.svg"></img>
			</div>
		</div>
	</div>
</body>
</html>  --%>




<%@ page import="java.util.Date"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"
	import="com.itextpdf.text.*,com.itextpdf.text.pdf.*, java.io.*,javax.imageio.ImageIO,java.awt.image.BufferedImage,javax.swing.ImageIcon, com.itextpdf.text.pdf.*,java.util.*,
    java.sql.*,java.text.*, org.springframework.context.support.ClassPathXmlApplicationContext,
     org.springframework.context.ApplicationContext, org.springframework.jdbc.core.support.JdbcDaoSupport, 
     org.springframework.transaction.PlatformTransactionManager, org.springframework.transaction.TransactionDefinition,
     org.springframework.transaction.TransactionStatus, org.springframework.transaction.support.DefaultTransactionDefinition, com.hms.constants.HMSConstants"%>
<%@page import="org.krysalis.barcode4j.BarcodeUtil"%>
<%@page import="com.hms.ehat.dto.RegTreBillDto"%>
<%@page import="com.hms.utility.ApplicationContextUtils"%>
<%@page import="com.hms.ehat.controller.RegistrationController"%>

<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Admission Receipt</title>
</head>
<body>
    <%
		try {
			response.setContentType("application/pdf");
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			
			//for centerpatientId
		    String patientId= resourceBundle.getObject("patientIdLabel").toString();
			ServletOutputStream outStream = response.getOutputStream();
			Document document = new Document(PageSize.A4);///*new Rectangle(500,864),0,0,0,0);	//*/new Rectangle(0, 0,648, 864));/* width,height*/
			document.setMargins(20, 20, 20, 0);

			PdfWriter writer = PdfWriter.getInstance(document, outStream);
			document.open();
			
			Font tabletext = new Font(Font.FontFamily.HELVETICA, 13,
					Font.BOLD);
			String treatId = request.getParameter("treatId"); 

			 RegistrationController uss=(ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
				RegTreBillDto rtd = new RegTreBillDto();
				rtd=uss.fetchPatientsRecordByTreatmentId(Integer.parseInt(treatId));
				rtd=rtd.getListRegTreBillDto().get(0);

			String patientName = rtd.getPatientName();
		
			//String patID = rtd.getPatientIdd();
			String patID = rtd.getCenterPatientId();

			
			String dob = rtd.getDob();
			
			Date df =rtd.getCreatedDateTime();
			DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
			String strDate = dateFormat.format(df);
			
			  PdfPTable HeaderTable2 = new PdfPTable(1);
	          int[] headerwidth3 = { 80};
	          HeaderTable2.setWidths(headerwidth3);
	          HeaderTable2.setWidthPercentage(95f);
	          HeaderTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
			
			PdfPTable HeaderTable1 = new PdfPTable(1);
			int[] headerwidth1 = {90};
			HeaderTable1.setWidths(headerwidth1);
			HeaderTable1.setWidthPercentage(95f);
			HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
			HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			
// 			HeaderTable1.addCell(new Phrase("", tabletext));
// 			HeaderTable1.addCell(new Phrase("", tabletext));
// 			HeaderTable1.addCell(new Phrase("", tabletext));
// 			HeaderTable1.addCell(new Phrase("", tabletext));
// 			HeaderTable1.addCell(new Phrase("", tabletext));
// 			HeaderTable1.addCell(new Phrase("", tabletext));
// 			HeaderTable1.addCell(new Phrase("", tabletext));
// 			HeaderTable1.addCell(new Phrase("", tabletext));
// 			HeaderTable1.addCell(new Phrase("", tabletext));
// 			HeaderTable1.addCell(new Phrase("", tabletext));
// 			HeaderTable1.addCell(new Phrase("", tabletext));
// 			HeaderTable1.addCell(new Phrase("", tabletext));
// 			HeaderTable1.addCell(new Phrase("", tabletext));
// 			HeaderTable1.addCell(new Phrase("", tabletext));
// 			HeaderTable1.addCell(new Phrase("", tabletext));
			
			

//              for(int i=0;i<8;i++)
//              {
     			

			HeaderTable1.addCell(new Phrase(""+patientName, tabletext));
// 			HeaderTable1.addCell(new Phrase(""+patientName, tabletext));
// 			HeaderTable1.addCell(new Phrase(""+patientName, tabletext));
			
			HeaderTable1.addCell(new Phrase(""+dob, tabletext));
// 			HeaderTable1.addCell(new Phrase(""+dob, tabletext));
// 			HeaderTable1.addCell(new Phrase(""+dob, tabletext));
			
			HeaderTable1.addCell(new Phrase(""+strDate, tabletext));
// 			HeaderTable1.addCell(new Phrase(""+date, tabletext));
// 			HeaderTable1.addCell(new Phrase(""+date, tabletext));
			
// 			HeaderTable1.addCell(new Phrase("", tabletext));
// 			HeaderTable1.addCell(new Phrase("", tabletext));
			
			//BarCode --24 Feb 2017
			


            PdfContentByte cb = writer.getDirectContent();	
            Barcode128 barcode39 = new Barcode128();
	         barcode39.setCode(patID);
	        Image  code39Image = barcode39.createImageWithBarcode(cb, null, null);
 	         code39Image.setAbsolutePosition(38,710);
 	         code39Image.scalePercent(150);
			document.add(code39Image);

 	         
	          
	  		document.add(HeaderTable1);
			HeaderTable1.flushContent();
	 
			
			// finally
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
<html>
<head></head>
<body></body>
</html>