package com.hms;

import java.awt.Color;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.hms.administrator.dto.HospitalDetails;
import com.hms.administrator.service.HospitalDetailAdminService;
import com.hms.configuration.PageEventHandlerBean;
import com.hms.ehat.controller.RegistrationController;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.pathology.dto.PathologySampleWiseMaster;
import com.hms.pathology.service.Phlebotomyservice;
import com.hms.pharmacy.upload.FilePath;
import com.hms.utility.ApplicationContextUtils;
import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.Barcode128;
import com.lowagie.text.pdf.ColumnText;
import com.lowagie.text.pdf.PdfContentByte;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfPageEvent;
import com.lowagie.text.pdf.PdfPageEventHelper;
import com.lowagie.text.pdf.PdfTemplate;
import com.lowagie.text.pdf.PdfWriter;

public class TempEventHandlerLISEmailPDF extends PdfPageEventHelper implements PdfPageEvent  {

	private static int count = 0;
	private int pageNumber;
	
	private String strHeader;
	private PdfTemplate total;

	public String getStrHeader() {
		return strHeader;
	}

	public void setStrHeader(String strHeader) {
		this.strHeader = strHeader;
	}

	@Override
	public void onStartPage(PdfWriter writer, Document document){
		pageNumber++;
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
		
		try {
			
			PageEventHandlerBean eventObj = new PageEventHandlerBean();			
			HttpServletRequest request = eventObj.getRequest();

			HttpSession session1 = request.getSession();
			Integer unitId = (Integer) session1.getAttribute("uId");

			int pageIteration = (int) request.getAttribute("pageIteration");
			String masterIdd = (String) request.getAttribute("masterIdd");
			String trId = (String)request.getAttribute("treatmentId");
			String patientType = (String)request.getAttribute("gender");
			String headerFlag = (String) request.getAttribute("headerFlag");
			
			int treatmentId = Integer.parseInt(trId);
			
			if(headerFlag.equalsIgnoreCase("No")){
				ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
				String lntUnit = (String) resource.getObject("lntUnit").toString();

				//TreatmentModel treatmentModel = new TreatmentModel();
				List<RegTreBillDto> ltPatientRecord = null;
				RegTreBillDto rtd = new RegTreBillDto();
				RegistrationController uss = (ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
					rtd = uss.fetchPatientsRecordByTreatmentId(treatmentId);
					rtd = rtd.getListRegTreBillDto().get(0);
			
				String age = rtd.getAge();
				String[] ageArray = age.split("/");
				String finalAge = ageArray[0];
				if(ageArray[0].equalsIgnoreCase("0Y")) {
					finalAge = ageArray[1];
				}
				if(ageArray[0].equalsIgnoreCase("0Y") && ageArray[1].equalsIgnoreCase("0M")) {
					finalAge = ageArray[2];
				}
				
				String dob = rtd.getDob();
				
				if((dob.trim()).equalsIgnoreCase("")){
					dob = "-";
				}
				else {
					dob = dob.replaceAll("/", "-");
					String[] dobChane1 = dob.split("-");				
					dob=dobChane1[2]+"-"+dobChane1[1] +"-"+dobChane1[0];
				}
				
				SimpleDateFormat dateformatterr = new SimpleDateFormat("dd-MM-yyyy HH:mm");
				String regDate = dateformatterr.format(rtd.getCreatedDateTime());
				
				String idProof = "";
				String id = rtd.getProofId();
				if(id.equalsIgnoreCase("1")) {
					idProof = "Aadhar";
				}else if(id.equalsIgnoreCase("2")) {
					idProof = "Pan Card";
				}else if(id.equalsIgnoreCase("3")) {
					idProof = "Passport";
				}else if(id.equalsIgnoreCase("4")) {
					idProof = "Driving License";
				}else if(id.equalsIgnoreCase("5")) {
					idProof = "Other";
				}
				
				if(rtd.getBusinessType() == 2) {
					int refferSource = rtd.getReferSource();
					
					if(refferSource == 0)
						rtd.setCustomerName("Self");
					else if(refferSource == 1)
						rtd.setCustomerName("Self (Walk In)");
					else if(refferSource == 2)
						rtd.setCustomerName("Self (Home Collection)");
					else if(refferSource == 4)
						rtd.setCustomerName("Self (Corporate)");
				}
			
				String refDocName = "";
				if(rtd.getRefDocPrefix().equalsIgnoreCase("-") || rtd.getDocNameChan().equalsIgnoreCase("-"))
					refDocName = "-";
				else
					refDocName = rtd.getRefDocPrefix()+" "+rtd.getDocNameChan(); 
				
				/*
				String customerName = "";
				if(rtd.getCustomerName().equalsIgnoreCase("-")){
					customerName="Self";
				}else{
					customerName=rtd.getCustomerName();
				}
				*/

				HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
				List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
				HospitalDetails hospObj = arrHospitalDetails.get(0);
			
				Phlebotomyservice phlebotomyservice = (ApplicationContextUtils.getApplicationContext()).getBean(Phlebotomyservice.class);
				List<PathologySampleWiseMaster> list = phlebotomyservice.getRoutinevalueResutlusingPrint(masterIdd, treatmentId,patientType,unitId, request);
			
                String barcodenumber = list.get(pageIteration).getBarCode();
				
				String collecteddate1 = list.get(pageIteration).getCollecteddate();
				
				String collectDateReg=rtd.getCollectionDate();
				String serviceAssignedDateTime ="";
				
				if (collectDateReg != null || collectDateReg != "null") {										
					
					String[] splitDateCReg=rtd.getCollectionDate().split("/");				
					
					String dd=splitDateCReg[0];
					String mm=splitDateCReg[1];
					String yy=splitDateCReg[2];						
					StringBuffer fd = new StringBuffer();
					fd.append(dd+"-"+mm+"-"+yy);			
						
					String regCollectDate=fd.toString();				
					serviceAssignedDateTime=regCollectDate+":"+rtd.getCollectionTime();
				}else
				{
					serviceAssignedDateTime= phlebotomyservice.getOldestCollectionDateInString(masterIdd);
				}	
				
				if (collecteddate1 != null) {
					collecteddate1 = list.get(pageIteration).getCollecteddate();
				} else {
					collecteddate1 = "-";
				}
				String postdate1 = list.get(pageIteration).getPostdate();
				String postdate="";
				if (postdate1 != null) {
					
					postdate1 = list.get(pageIteration).getPostdate();
					String[] wordspostddate=postdate1.split(" ");				
					
					String postDate=wordspostddate[0];
					String postTime=wordspostddate[1];
						
					String[] postDateddmmyy=postDate.split("-");
					
					SimpleDateFormat sdfIn = new SimpleDateFormat("yyyy-MM-dd HH:mm");
				    SimpleDateFormat sdfOut = new SimpleDateFormat("dd-MM-yyyy HH:mm");
				    Date date = sdfIn.parse(postdate1);

				   
						
					StringBuffer fd2 = new StringBuffer();
					fd2.append(postDateddmmyy[2]+"-"+postDateddmmyy[1]+"-"+postDateddmmyy[0]);			
						
					String postDateddmmyy1=fd2.toString();				
					postdate=sdfOut.format(date);//postDateddmmyy1+" "+ postTime;
				} else {
					postdate1 = "-";
				}
				
                String[] wordscollecteddate=collecteddate1.split(" ");				
				
				String collectedDate=wordscollecteddate[0];
				String collectedTime=wordscollecteddate[1];
				
				SimpleDateFormat sdfIn = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			    SimpleDateFormat sdfOut = new SimpleDateFormat("dd-MM-yyyy HH:mm");
			    Date date = sdfIn.parse(collecteddate1);

			   
				String[] collectedDateddmmyy=collectedDate.split("-");				
				
				StringBuffer fd1 = new StringBuffer();
				fd1.append(collectedDateddmmyy[2]+"-"+collectedDateddmmyy[1]+"-"+collectedDateddmmyy[0]);			
				
				String collectedDateddmy=fd1.toString();				
				//String collecteddate=collectedDateddmy+" "+ collectedTime;
				String collecteddate=sdfOut.format(date);
				
				
			
				java.util.Calendar currentDate = Calendar.getInstance();
				SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss a");
				String curr_date = dateformatter.format(currentDate.getTime());
				NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");
			
				String path = hospObj.getFilePath();
				String hospitalName = hospObj.getHospitalName();
				hospitalName = hospitalName.toUpperCase();
				String address = hospObj.getHospitalAddress();
				String city = hospObj.getHospitalCity();
				String contact = hospObj.getHospitalContact();
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
				ServletContext context = request.getServletContext();
				String lisLogoPath = hospObj.getLisLogoPath();
				String path2 = context.getRealPath(lisLogoPath);
				
				Image img = null;
				PdfPCell cell = null;
				String path1 = "";
				
				Image img124 = null;
				PdfPCell cell13 = null;

				try {
					img124 = Image.getInstance(path2);
					img124.scaleAbsolute(230, 60);
					
					cell13 = new PdfPCell();
					cell13.addElement(new Chunk(img124, 1, -45));
					cell13.setBorder(Rectangle.NO_BORDER);
				} catch (Exception e) {
					e.printStackTrace();
				}
			
				PdfPTable HeaderTable1 = new PdfPTable(3);
				int[] headerwidth1 = { 30, 70, 35 };
					HeaderTable1.setWidths(headerwidth1);
					HeaderTable1.setWidthPercentage(95f);
					HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
					HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				if (img124 == null) {
					HeaderTable1.addCell(new Phrase("", header));
				} else {
					HeaderTable1.addCell("");
				}
				
				Font bold = new Font(Font.TIMES_ROMAN, 8, Font.BOLD);
				Phrase p = new Phrase();
					p.add(new Chunk(""+hospitalName, bold));			
					p.add(new Chunk("\n\n"+"\t"+address, tabletext));			
					p.add(new Chunk(" "+city+" Pin - "+hospitalZip+"\n", tabletext));
					p.add(new Chunk("Phone No. "+hPhoneNo, tabletext));	
					p.add(new Chunk("\n"+webste+"\n"+"email: "+email, tabletext));
				
				PdfPCell hospitalNameCell = new PdfPCell(p);
					hospitalNameCell.setHorizontalAlignment(Element.ALIGN_LEFT);
					hospitalNameCell.setBorder(Rectangle.NO_BORDER);
					HeaderTable1.addCell("");
					HeaderTable1.addCell("");
				
					HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					HeaderTable1.addCell(new Phrase("", header));
					HeaderTable1.addCell(new Phrase("", header));
					HeaderTable1.addCell(new Phrase("", header));
					document.add(HeaderTable1);
					HeaderTable1.flushContent();
					
					    PdfPTable patientDetailsHeader = new PdfPTable(4);
			    		int[] patientDetailsHeaderWidth = { 15, 37, 18, 35 };
			    		patientDetailsHeader.setWidths(patientDetailsHeaderWidth);
			    		patientDetailsHeader.setWidthPercentage(95f);
			    		
			    		patientDetailsHeader.getDefaultCell().setBorder(Rectangle.BOTTOM);
			    		patientDetailsHeader.addCell(new Phrase("", tabletext));
			    		patientDetailsHeader.addCell(new Phrase("", tabletext));
			    		patientDetailsHeader.addCell(new Phrase("", tabletext));
			    		patientDetailsHeader.addCell(new Phrase("", tabletext));

			    		patientDetailsHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
						
			    		
			    		patientDetailsHeader.addCell(new Phrase("Patient Name ", subheader));
			    		patientDetailsHeader.addCell(new Phrase(": " + rtd.getPatientName().replaceAll("  ", " "), tabletext));
						
						/*patientDetailsHeader.addCell(new Phrase("Customer Name ", subheader));
						patientDetailsHeader.addCell(new Phrase(": " + rtd.getCustomerName(), tabletext));
						*/
			    	
			    		
			    		patientDetailsHeader.addCell(new Phrase("Registered On", subheader));
			    		patientDetailsHeader.addCell(new Phrase(": " + regDate, tabletext));

			    		
			    		patientDetailsHeader.addCell(new Phrase("Patient Id ", subheader));
						patientDetailsHeader.addCell(new Phrase(": " + rtd.getPatientId(), tabletext));
			    		
			    		
			    		
			    		patientDetailsHeader.addCell(new Phrase("Sample Collected On ", subheader));
			    		patientDetailsHeader.addCell(new Phrase(": "+serviceAssignedDateTime, tabletext));
			    		
			    		/*patientDetailsHeader.addCell(new Phrase("Ref. By  ", subheader));
			    		patientDetailsHeader.addCell(new Phrase(": "+refDocName, tabletext));*/
			     		patientDetailsHeader.addCell(new Phrase("Age/DOB/Gender   ", subheader));
			    		patientDetailsHeader.addCell(new Phrase(": "+finalAge+"/"+dob+"/"+rtd.getGender(), tabletext));
			    		
			    		
			    		patientDetailsHeader.addCell(new Phrase("Reported On", subheader));
						patientDetailsHeader.addCell(new Phrase(": "+postdate  , tabletext));
			    		/*patientDetailsHeader.addCell(new Phrase("Sample Accepted On ", subheader));
			    		patientDetailsHeader.addCell(new Phrase(": "+collecteddate, tabletext));*/

			    		patientDetailsHeader.addCell(new Phrase("Nationality  ", subheader));
			    		patientDetailsHeader.addCell(new Phrase(": "+rtd.getNationality(), tabletext));
			    		
//			    		patientDetailsHeader.addCell(new Phrase(": " + rtd.getAge() + "/" + rtd.getGender(), tabletext));
			    	
			    		patientDetailsHeader.addCell(new Phrase("Sample UID No.  ", subheader));
			    		patientDetailsHeader.addCell(new Phrase(": "+barcodenumber.trim(), tabletext));
						
						
			    		/*patientDetailsHeader.addCell(new Phrase("Special case ", subheader));
						patientDetailsHeader.addCell(new Phrase(": " + rtd.getSpecialcasename(), tabletext));*/
						
			    		
						
					
			    		if((rtd.getIdentificationNo().trim()).equals("") || rtd.getProofId().equals("0")) {
				    		/*	patientDetailsHeader.addCell(new Phrase("Id No.  ", subheader));
					    		patientDetailsHeader.addCell(new Phrase(": "+"-", tabletext));*/
				    			patientDetailsHeader.addCell(new Phrase("", tabletext));
					    		patientDetailsHeader.addCell(new Phrase("", tabletext));
				    		}else {
				    			/*patientDetailsHeader.addCell(new Phrase("", tabletext));
					    		patientDetailsHeader.addCell(new Phrase("", tabletext));*/
				    			patientDetailsHeader.addCell(new Phrase("Patient UID No.  ", subheader));
					    		patientDetailsHeader.addCell(new Phrase(": "+rtd.getIdentificationNo()+" ("+idProof+")", tabletext));
				    		}
						Barcode128 code129 = new Barcode128();

						PdfContentByte canvas = writer.getDirectContentUnder();
						
						/*Phrase watermark = new Phrase("JCG", new Font());		
						Image bg = Image.getInstance(path1);
						bg.scaleAbsolute(400, 300);
						float w = bg.getScaledWidth();
						float h = bg.getScaledHeight();		
						PdfContentByte over;
						Rectangle pagesize;		
						float x, y;
						int n = writer.getPageNumber();
						
						pagesize = writer.getPageSize();
						x = (pagesize.getLeft() + pagesize.getRight()) / 2;
						y = (pagesize.getTop() + pagesize.getBottom()) / 2; 
						over = writer.getDirectContent();
						over.saveState();

						// set transparency
						PdfGState state = new PdfGState();
						state.setFillOpacity(0.2f);
						over.setGState(state);
						
						// add watermark text and image	
						over.addImage(bg, w, 0, 0, h, x - (w / 2), y - (h / 2));	
						over.restoreState();*/
						
			    		Barcode128 code128 = new Barcode128();
			    		code128.setBaseline(5);
			    		code128.setGenerateChecksum(true);
			    		code128.setSize(2);
			    		code128.setBarHeight(5);
			    		code128.setCodeType(Barcode128.CODE128);
			    		code128.setSize(4);
			    		code128.setCode(barcodenumber);

			    		/*patientDetailsHeader.addCell(new Phrase(" ", subheader));
			    		patientDetailsHeader.addCell(new Phrase(" ", tabletext));*/
			    		
			    		patientDetailsHeader.addCell(new Phrase("", subheader));
			    		patientDetailsHeader.addCell(new Phrase("", tabletext));
			    		patientDetailsHeader.addCell(new Phrase("", subheader));
			    		patientDetailsHeader.addCell(new Phrase("", tabletext));
			    		patientDetailsHeader.addCell(new Phrase("", subheader));
			    		patientDetailsHeader.addCell(new Phrase("", tabletext));
			    		patientDetailsHeader.addCell(new Phrase(" ", subheader));
			    		patientDetailsHeader.addCell(new Phrase(" ", tabletext));
			    		patientDetailsHeader.addCell(new Phrase(" ", subheader));
			    		patientDetailsHeader.addCell(new Phrase(" ", tabletext));
			    		//patientDetailsHeader.addCell(code128.createImageWithBarcode(canvas, null, null));

			    		/*patientDetailsHeader.addCell(new Phrase("Nationality  ", subheader));
			    		patientDetailsHeader.addCell(new Phrase(": "+country, tabletext));
			    		patientDetailsHeader.addCell(new Phrase(" ", subheader));
			    		patientDetailsHeader.addCell(new Phrase(" ", tabletext));
			    		
			    		if((rtd.getIdentificationNo().trim()).equals("") || rtd.getProofId().equals("0")) {
			    			patientDetailsHeader.addCell(new Phrase("Id No.  ", subheader));
				    		patientDetailsHeader.addCell(new Phrase(": "+"-", tabletext));
			    		}else {
			    			patientDetailsHeader.addCell(new Phrase("Id No.  ", subheader));
				    		patientDetailsHeader.addCell(new Phrase(": "+rtd.getIdentificationNo()+"("+idProof+")", tabletext));
			    		}
			    		patientDetailsHeader.addCell(new Phrase(" ", subheader));
			    		patientDetailsHeader.addCell(new Phrase(" ", tabletext));*/
			    		
			    		patientDetailsHeader.getDefaultCell().setBorder(Rectangle.TOP);
						patientDetailsHeader.addCell(new Phrase("", tabletext));
						patientDetailsHeader.addCell(new Phrase("", tabletext));
						patientDetailsHeader.addCell(new Phrase("", tabletext));
						patientDetailsHeader.addCell(new Phrase("", tabletext));

						
			    		document.add(patientDetailsHeader);
			    		patientDetailsHeader.flushContent();
			}else{
				ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
				String lntUnit = (String) resource.getObject("lntUnit").toString();

				//TreatmentModel treatmentModel = new TreatmentModel();
				List<RegTreBillDto> ltPatientRecord = null;
				RegTreBillDto rtd = new RegTreBillDto();
				RegistrationController uss = (ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
				rtd = uss.fetchPatientsRecordByTreatmentId(treatmentId);
				rtd = rtd.getListRegTreBillDto().get(0);
				
				String age = rtd.getAge();
				String[] ageArray = age.split("/");
				String finalAge = ageArray[0];
				if(ageArray[0].equalsIgnoreCase("0Y")) {
					finalAge = ageArray[1];
				}
				if(ageArray[0].equalsIgnoreCase("0Y") && ageArray[1].equalsIgnoreCase("0M")) {
					finalAge = ageArray[2];
				}
				
				String dob = rtd.getDob();
				if((dob.trim()).equalsIgnoreCase("")){
					dob = "-";
				}					
				else{
					dob = dob.replaceAll("/", "-");
					String[] dobChane1 = dob.split("-");				
					dob=dobChane1[2]+"-"+dobChane1[1] +"-"+dobChane1[0];
				}
					
				SimpleDateFormat dateformatterr = new SimpleDateFormat("dd-MM-yyyy HH:mm");
				String regDate = dateformatterr.format(rtd.getCreatedDateTime());
				
				
				String idProof = "";
				String id = rtd.getProofId();
				if(id.equalsIgnoreCase("1")) {
					idProof = "Aadhar";
				}else if(id.equalsIgnoreCase("2")) {
					idProof = "Pan Card";
				}else if(id.equalsIgnoreCase("3")) {
					idProof = "Passport";
				}else if(id.equalsIgnoreCase("4")) {
					idProof = "Driving License";
				}else if(id.equalsIgnoreCase("5")) {
					idProof = "Other";
				}
				
				if(rtd.getBusinessType() == 2) {
					int refferSource = rtd.getReferSource();
					
					if(refferSource == 0)
						rtd.setCustomerName("Self");
					else if(refferSource == 1)
						rtd.setCustomerName("Self (Walk In)");
					else if(refferSource == 2)
						rtd.setCustomerName("Self (Home Collection)");
					else if(refferSource == 4)
						rtd.setCustomerName("Self (Corporate)");
				}
				
				String refDocName = "";
				if(rtd.getRefDocPrefix().equalsIgnoreCase("-") || rtd.getDocNameChan().equalsIgnoreCase("-"))
					refDocName = "-";
				else
					refDocName = rtd.getRefDocPrefix()+" "+rtd.getDocNameChan();
				
				/*
				String customerName = "";
				if(rtd.getCustomerName().equalsIgnoreCase("-")){
					customerName="Self";
				}else{
					customerName=rtd.getCustomerName();
				}
				*/
				
				HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
				List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
				HospitalDetails hospObj = arrHospitalDetails.get(0);
				
				Phlebotomyservice phlebotomyservice = (ApplicationContextUtils.getApplicationContext()).getBean(Phlebotomyservice.class);
				List<PathologySampleWiseMaster> list = phlebotomyservice.getRoutinevalueResutlusingPrint(masterIdd, treatmentId,patientType,unitId, request);
				
                String barcodenumber = list.get(pageIteration).getBarCode();
				
				String collecteddate1 = list.get(pageIteration).getCollecteddate();
				
				String collectDateReg=rtd.getCollectionDate();
				String serviceAssignedDateTime ="";
				
				if (collectDateReg != null || collectDateReg != "null") {										
					
					String[] splitDateCReg=rtd.getCollectionDate().split("/");				
					
					String dd=splitDateCReg[0];
					String mm=splitDateCReg[1];
					String yy=splitDateCReg[2];						
					StringBuffer fd = new StringBuffer();
					fd.append(dd+"-"+mm+"-"+yy);			
						
					String regCollectDate=fd.toString();				
					serviceAssignedDateTime=regCollectDate+":"+rtd.getCollectionTime();
				}else
				{
					serviceAssignedDateTime= phlebotomyservice.getOldestCollectionDateInString(masterIdd);
				}	
				
				if (collecteddate1 != null) {
					collecteddate1 = list.get(pageIteration).getCollecteddate();
				} else {
					collecteddate1 = "-";
				}
				String postdate1 = list.get(pageIteration).getPostdate();
				String postdate="";
				if (postdate1 != null) {
					
					postdate1 = list.get(pageIteration).getPostdate();
					String[] wordspostddate=postdate1.split(" ");				
					
					String postDate=wordspostddate[0];
					String postTime=wordspostddate[1];
						
					String[] postDateddmmyy=postDate.split("-");
					
					SimpleDateFormat sdfIn = new SimpleDateFormat("yyyy-MM-dd HH:mm");
				    SimpleDateFormat sdfOut = new SimpleDateFormat("dd-MM-yyyy HH:mm");
				    Date date = sdfIn.parse(postdate1);

				  
						
					StringBuffer fd2 = new StringBuffer();
					fd2.append(postDateddmmyy[2]+"-"+postDateddmmyy[1]+"-"+postDateddmmyy[0]);			
						
					String postDateddmmyy1=fd2.toString();				
					postdate=sdfOut.format(date);//postDateddmmyy1+" "+ postTime;
				} else {
					postdate1 = "-";
				}
				
                String[] wordscollecteddate=collecteddate1.split(" ");				
				
				String collectedDate=wordscollecteddate[0];
				String collectedTime=wordscollecteddate[1];
				
				SimpleDateFormat sdfIn = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			    SimpleDateFormat sdfOut = new SimpleDateFormat("dd-MM-yyyy HH:mm");
			    Date date = sdfIn.parse(collecteddate1);

			   
				
				String[] collectedDateddmmyy=collectedDate.split("-");				
				
				StringBuffer fd1 = new StringBuffer();
				fd1.append(collectedDateddmmyy[2]+"-"+collectedDateddmmyy[1]+"-"+collectedDateddmmyy[0]);			
				
				String collectedDateddmy=fd1.toString();				
				//String collecteddate=collectedDateddmy+" "+ collectedTime;
				String collecteddate=sdfOut.format(date);
				
				
				
				java.util.Calendar currentDate = Calendar.getInstance();
				SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss a");
				String curr_date = dateformatter.format(currentDate.getTime());
				NumberFormat numberFormatTwoDecimal = new DecimalFormat("#0.00");
				
				String path = hospObj.getFilePath();
				String hospitalName = hospObj.getHospitalName();
				hospitalName = hospitalName.toUpperCase();
				String address = hospObj.getHospitalAddress();
				String city = hospObj.getHospitalCity();
				String contact = hospObj.getHospitalContact();			
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
				ServletContext context = request.getServletContext();
				String lisLogoPath = hospObj.getLisLogoPath();
				String path2 = context.getRealPath(lisLogoPath);
				
				Image img = null;
				PdfPCell cell = null;
				String path1 = "";
				
				Image img124 = null;
				PdfPCell cell13 = null;

				try {
					
					String pathToWeb1 = FilePath.getBasePath();
					 path1 = pathToWeb1 + "LW-Report-Header 4.jpg";
					

					img124 = Image.getInstance(path2);
					img124.scaleAbsolute(550, 80);
					

					cell13 = new PdfPCell();
					cell13.addElement(new Chunk(img124, 1, -45));
					cell13.setBorder(Rectangle.NO_BORDER);
				} catch (Exception e) {
					e.printStackTrace();
				}
				
				PdfPTable HeaderTable1 = new PdfPTable(1);
				int[] headerwidth1 = {100};
				HeaderTable1.setWidths(headerwidth1);
				HeaderTable1.setWidthPercentage(95f);
				HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
				HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				if (img124 == null) {
					HeaderTable1.addCell(new Phrase("", header));
				} else {
					HeaderTable1.addCell(cell13);
				}
				
				Font bold = new Font(Font.TIMES_ROMAN, 8, Font.BOLD);
	    		Phrase p = new Phrase();
				p.add(new Chunk(""+hospitalName, bold));			
				p.add(new Chunk("\n\n"+""+address, tabletext));			
				p.add(new Chunk(" "+city+" Pin - "+hospitalZip+"\n", tabletext));
				p.add(new Chunk("Phone No. "+hPhoneNo, tabletext));	
				p.add(new Chunk("\n"+webste+"\n"+"email: "+email, tabletext));
				
				PdfPCell hospitalNameCell = new PdfPCell(p);
	            hospitalNameCell.setHorizontalAlignment(Element.ALIGN_LEFT);
	            hospitalNameCell.setBorder(Rectangle.NO_BORDER);
	            HeaderTable1.addCell("");
	            HeaderTable1.addCell("");
	            HeaderTable1.addCell("");
	            HeaderTable1.addCell("");
	            HeaderTable1.addCell("");
	            HeaderTable1.addCell("");
	           // HeaderTable1.addCell(hospitalNameCell);
	          
	            //HeaderTable1.addCell(hospitalNameCell);
	        
	            HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            HeaderTable1.addCell(new Phrase("", header));
	            document.add(HeaderTable1);
	            HeaderTable1.flushContent();
	            
	            
	            PdfPTable patientDetailsHeader = new PdfPTable(4);
	    		int[] patientDetailsHeaderWidth = { 15, 37, 18, 35 };
	    		patientDetailsHeader.setWidths(patientDetailsHeaderWidth);
	    		patientDetailsHeader.setWidthPercentage(95f);
	    		
	    		patientDetailsHeader.getDefaultCell().setBorder(Rectangle.BOTTOM);
	    		patientDetailsHeader.addCell(new Phrase("", tabletext));
	    		patientDetailsHeader.addCell(new Phrase("", tabletext));
	    		patientDetailsHeader.addCell(new Phrase("", tabletext));
	    		patientDetailsHeader.addCell(new Phrase("", tabletext));

	    		patientDetailsHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	    		patientDetailsHeader.addCell(new Phrase("Patient Name ", subheader));
	    		patientDetailsHeader.addCell(new Phrase(": " + rtd.getPatientName().replaceAll("  ", " "), tabletext));
				
				/*patientDetailsHeader.addCell(new Phrase("Customer Name ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getCustomerName(), tabletext));
				*/
	    	
	    		
	    		patientDetailsHeader.addCell(new Phrase("Registered On", subheader));
	    		patientDetailsHeader.addCell(new Phrase(": " + regDate, tabletext));

	    		patientDetailsHeader.addCell(new Phrase("Patient Id ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getPatientId(), tabletext));
	    		
	    		
	    		
	    		patientDetailsHeader.addCell(new Phrase("Sample Collected On ", subheader));
	    		patientDetailsHeader.addCell(new Phrase(": "+serviceAssignedDateTime, tabletext));
	    		
	    		/*patientDetailsHeader.addCell(new Phrase("Ref. By  ", subheader));
	    		patientDetailsHeader.addCell(new Phrase(": "+refDocName, tabletext));*/
	    		patientDetailsHeader.addCell(new Phrase("Age/DOB/Gender   ", subheader));
	    		patientDetailsHeader.addCell(new Phrase(": "+finalAge+"/"+dob+"/"+rtd.getGender(), tabletext));
	    		patientDetailsHeader.addCell(new Phrase("Reported On", subheader));
				patientDetailsHeader.addCell(new Phrase(": "+postdate  , tabletext));
	    		/*patientDetailsHeader.addCell(new Phrase("Sample Accepted On ", subheader));
	    		patientDetailsHeader.addCell(new Phrase(": "+collecteddate, tabletext));*/

	    		patientDetailsHeader.addCell(new Phrase("Nationality  ", subheader));
	    		patientDetailsHeader.addCell(new Phrase(": "+rtd.getNationality(), tabletext));
	    		
//	    		patientDetailsHeader.addCell(new Phrase(": " + rtd.getAge() + "/" + rtd.getGender(), tabletext));
	    	
	    		patientDetailsHeader.addCell(new Phrase("Sample UID No.  ", subheader));
	    		patientDetailsHeader.addCell(new Phrase(": "+barcodenumber.trim(), tabletext));
				
				
	    		/*patientDetailsHeader.addCell(new Phrase("Special case ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getSpecialcasename(), tabletext));*/
				
	    		
				
			
	    		if((rtd.getIdentificationNo().trim()).equals("") || rtd.getProofId().equals("0")) {
		    		/*	patientDetailsHeader.addCell(new Phrase("Id No.  ", subheader));
			    		patientDetailsHeader.addCell(new Phrase(": "+"-", tabletext));*/
		    			patientDetailsHeader.addCell(new Phrase("", tabletext));
			    		patientDetailsHeader.addCell(new Phrase("", tabletext));
		    		}else {
		    			/*patientDetailsHeader.addCell(new Phrase("", tabletext));
			    		patientDetailsHeader.addCell(new Phrase("", tabletext));*/
		    			patientDetailsHeader.addCell(new Phrase("Patient UID No.  ", subheader));
			    		patientDetailsHeader.addCell(new Phrase(": "+rtd.getIdentificationNo()+" ("+idProof+")", tabletext));
		    		}
				Barcode128 code129 = new Barcode128();

				PdfContentByte canvas = writer.getDirectContentUnder();
				
				/*Phrase watermark = new Phrase("JCG", new Font());		
				Image bg = Image.getInstance(path1);
				bg.scaleAbsolute(400, 300);
				float w = bg.getScaledWidth();
				float h = bg.getScaledHeight();		
				PdfContentByte over;
				Rectangle pagesize;		
				float x, y;
				int n = writer.getPageNumber();
				
				pagesize = writer.getPageSize();
				x = (pagesize.getLeft() + pagesize.getRight()) / 2;
				y = (pagesize.getTop() + pagesize.getBottom()) / 2; 
				over = writer.getDirectContent();
				over.saveState();

				// set transparency
				PdfGState state = new PdfGState();
				state.setFillOpacity(0.2f);
				over.setGState(state);
				
				// add watermark text and image	
				over.addImage(bg, w, 0, 0, h, x - (w / 2), y - (h / 2));	
				over.restoreState();*/
				
	    		Barcode128 code128 = new Barcode128();
	    		code128.setBaseline(5);
	    		code128.setGenerateChecksum(true);
	    		code128.setSize(2);
	    		code128.setBarHeight(5);
	    		code128.setCodeType(Barcode128.CODE128);
	    		code128.setSize(4);
	    		code128.setCode(barcodenumber);

	    		/*patientDetailsHeader.addCell(new Phrase(" ", subheader));
	    		patientDetailsHeader.addCell(new Phrase(" ", tabletext));*/
	    		
	    		patientDetailsHeader.addCell(new Phrase("", subheader));
	    		patientDetailsHeader.addCell(new Phrase("", tabletext));
	    		patientDetailsHeader.addCell(new Phrase("", subheader));
	    		patientDetailsHeader.addCell(new Phrase("", tabletext));
	    		patientDetailsHeader.addCell(new Phrase("", subheader));
	    		patientDetailsHeader.addCell(new Phrase("", tabletext));
	    		patientDetailsHeader.addCell(new Phrase(" ", subheader));
	    		patientDetailsHeader.addCell(new Phrase(" ", tabletext));
	    		patientDetailsHeader.addCell(new Phrase(" ", subheader));
	    		patientDetailsHeader.addCell(new Phrase(" ", tabletext));
	    		//patientDetailsHeader.addCell(code128.createImageWithBarcode(canvas, null, null));

	    		/*patientDetailsHeader.addCell(new Phrase("Nationality  ", subheader));
	    		patientDetailsHeader.addCell(new Phrase(": "+country, tabletext));
	    		patientDetailsHeader.addCell(new Phrase(" ", subheader));
	    		patientDetailsHeader.addCell(new Phrase(" ", tabletext));
	    		
	    		if((rtd.getIdentificationNo().trim()).equals("") || rtd.getProofId().equals("0")) {
	    			patientDetailsHeader.addCell(new Phrase("Id No.  ", subheader));
		    		patientDetailsHeader.addCell(new Phrase(": "+"-", tabletext));
	    		}else {
	    			patientDetailsHeader.addCell(new Phrase("Id No.  ", subheader));
		    		patientDetailsHeader.addCell(new Phrase(": "+rtd.getIdentificationNo()+"("+idProof+")", tabletext));
	    		}
	    		patientDetailsHeader.addCell(new Phrase(" ", subheader));
	    		patientDetailsHeader.addCell(new Phrase(" ", tabletext));*/
	    		
	    		patientDetailsHeader.getDefaultCell().setBorder(Rectangle.TOP);
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));

				
	    		document.add(patientDetailsHeader);
	    		patientDetailsHeader.flushContent();
			}	
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void onChapter(PdfWriter arg0, Document arg1, float arg2,
			Paragraph arg3) {
	}

	@Override
	public void onChapterEnd(PdfWriter arg0, Document arg1, float arg2) {
	}
	
	@Override
	public void onOpenDocument(PdfWriter pdfWriter, Document document) {
		PageEventHandlerBean eventObj = new PageEventHandlerBean();	
		HttpServletRequest request = eventObj.getRequest();
		String covide = (String) request.getAttribute("covide");
		if(covide.equalsIgnoreCase("Yes")){
			
		}else{
			total = pdfWriter.getDirectContent().createTemplate(35, 28);
		}
		
		//font =  new Font(BaseFont.createFont(Font, BaseFont.IDENTITY_H, BaseFont.EMBEDDED), 10);
	}

	@Override
	public void onEndPage(PdfWriter pdfWriter, Document document) {
		
		PageEventHandlerBean eventObj = new PageEventHandlerBean();			
		HttpServletRequest request = eventObj.getRequest();
	//	HttpSession session1 = request.getSession();
		String covide = (String) request.getAttribute("covide");
		Integer postId = (Integer) request.getAttribute("postId");
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String hospitalName = (String)resourceBundleEhat.getString("hospitalName");
		if(covide.equalsIgnoreCase("Yes")){
			
		}else{
		
			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);
		
			//PatientModel patModel = new PatientModel();
			//Users userDetails = patModel.getUserDetailsById(postId);
		
		String signOneDocName="";
		String signOneImageName = "";
		String signTwoDocName = "";
		String signTwoImageName = "";		
		String signThreeDocName = "";
		String signThreeImageName = "";
		
		/*if(hospitalName.equalsIgnoreCase("Nariman")){
			
			signOneDocName = userDetails.getSignOneDoctor();
			signOneImageName = userDetails.getSignOne();
			signTwoDocName = userDetails.getSignOneDoctor();
			signTwoImageName = "";		
			signThreeDocName = userDetails.getSignTwoDoctor();
			signThreeImageName = userDetails.getSignTwo();
		}else{
			
			signOneDocName = hospObj.getSignOneDocName();
			signOneImageName = hospObj.getSignOneImageName();
			signTwoDocName = hospObj.getSignOneDocName();
			signTwoImageName = "";
			signThreeDocName = hospObj.getSignTwoDocName();
			signThreeImageName = hospObj.getSignTwoImageName();
		}*/
		
		Font tabletext = new Font(Font.HELVETICA, 8, Font.BOLD);
		Font tabletextSign = new Font(Font.HELVETICA, 8, Font.NORMAL);
		PdfPTable table = new PdfPTable(3);
		
		try {
			String path1 = "";
			String path2 = "";
			String path3 = "";
			
			Image imageOneSign = null;
			PdfPCell cellOneSign = null;
			
			Image imageTwoSign = null;
			PdfPCell cellTwoSign = null;
			
			Image imageThreeSign = null;
			PdfPCell cellThreeSign = null;
			
			PdfPTable Headertable2 = new PdfPTable(5);
			int[] HeaderWidth2 = { 20,20,20,20,20 };
			Headertable2.setWidths(HeaderWidth2);
		    Headertable2.setWidthPercentage(95f);
			Headertable2.setTotalWidth(527);
			Headertable2.setLockedWidth(true);
			Headertable2.getDefaultCell().setFixedHeight(50);
			Headertable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);			
			
			

			if(signOneImageName.equalsIgnoreCase(null) || signOneImageName.equalsIgnoreCase("") || signTwoImageName.equalsIgnoreCase(null) || signTwoImageName.equalsIgnoreCase("")
			|| signThreeImageName.equalsIgnoreCase(null) || signThreeImageName.equalsIgnoreCase(""))
		
			{
				if(signOneImageName.equalsIgnoreCase(null) || signOneImageName.equalsIgnoreCase("") || signThreeImageName.equalsIgnoreCase(null) || signThreeImageName.equalsIgnoreCase(""))
				{
					if(signThreeImageName.equalsIgnoreCase(null) || signThreeImageName.equalsIgnoreCase(""))
					{
					}else{ 			
						//Set Third sign on right bottom
						
						try{
							 String pathToWeb1 = FilePath.getBasePath();
							 path1 = pathToWeb1 + signThreeImageName ; //"Dr.Amita Neelakantan.jpg";							
							 imageThreeSign = Image.getInstance(path1);
							 imageThreeSign.scaleAbsolute(80, 50);
							 cellThreeSign = new PdfPCell();
							 cellThreeSign.addElement(new Chunk(imageThreeSign, 5, -5));
							 cellThreeSign.setBorder(Rectangle.NO_BORDER);
							
							 Headertable2.addCell(new Phrase(" ", tabletextSign));
							 Headertable2.addCell(new Phrase(" ", tabletextSign));	
							 Headertable2.addCell(new Phrase(" ", tabletextSign));
							 Headertable2.addCell(new Phrase(" ", tabletextSign));
							 Headertable2.addCell(cellThreeSign);
							
							 Headertable2.addCell(new Phrase(" ", tabletextSign));
							 Headertable2.addCell(new Phrase(" ", tabletextSign));
							 Headertable2.addCell(new Phrase(" ", tabletextSign));
							 Headertable2.addCell(new Phrase(" ", tabletextSign));
							PdfPCell cells33 = new PdfPCell(new Phrase(signThreeDocName.replaceAll("@", "\n"), tabletextSign));
							cells33.setHorizontalAlignment(Element.ALIGN_CENTER);
							cells33.setBorder(Rectangle.NO_BORDER);
							Headertable2.addCell(cells33);
						}catch(Exception e){
							e.printStackTrace();
						}
					 }
					
				}else{			
					//Set 1st & 3nd  sign on left & right bottom
				
					try{
						 String pathToWeb1 = FilePath.getBasePath();
						 path1 = pathToWeb1 + signOneImageName ; //"Dr.Amita Neelakantan.jpg";
						 imageOneSign = Image.getInstance(path1);
						 imageOneSign.scaleAbsolute(90, 50);
						 cellOneSign = new PdfPCell();
						 cellOneSign.addElement(new Chunk(imageOneSign, 5, -5));
						 cellOneSign.setBorder(Rectangle.NO_BORDER);				 
						 
						 String pathToWeb3 = FilePath.getBasePath();
						 path3 = pathToWeb3 + signThreeImageName ; //"Dr.Amita Neelakantan.jpg";			
						 imageThreeSign = Image.getInstance(path3);
						 imageThreeSign.scaleAbsolute(90, 50);
						 cellThreeSign = new PdfPCell();
						 cellThreeSign.addElement(new Chunk(imageThreeSign, 5, -5));
						 cellThreeSign.setBorder(Rectangle.NO_BORDER);
						 cellThreeSign.setHorizontalAlignment(Element.ALIGN_CENTER);				 
					
						 Headertable2.addCell(cellOneSign);
						 Headertable2.addCell(new Phrase(" ", tabletextSign));
						 Headertable2.addCell(new Phrase(" ", tabletextSign));
						 Headertable2.addCell(new Phrase(" ", tabletextSign));
						 Headertable2.addCell(cellThreeSign);						
						
						 PdfPCell cells30 = new PdfPCell(new Phrase(signOneDocName.replaceAll("@", "\n"), tabletextSign));
						 cells30.setHorizontalAlignment(Element.ALIGN_CENTER);
						 cells30.setBorder(Rectangle.NO_BORDER);
						 Headertable2.addCell(cells30);
						
						 Headertable2.addCell(new Phrase(" ", tabletextSign));						
						 Headertable2.addCell(new Phrase(" ", tabletextSign));						
						 Headertable2.addCell(new Phrase(" ", tabletextSign));
						
						 PdfPCell cells33 = new PdfPCell(new Phrase(signThreeDocName.replaceAll("@", "\n"), tabletextSign));
						 cells33.setHorizontalAlignment(Element.ALIGN_CENTER);
						 cells33.setBorder(Rectangle.NO_BORDER);
						 Headertable2.addCell(cells33);
					}catch(Exception e)
					{
						e.printStackTrace();
					}
				
				}	
		
			}else{			
				//Set 1st, 2nd & 3nd  sign on left,Center & right bottom
			
			try{
		
				 String pathToWeb1 = FilePath.getBasePath();
				 path1 = pathToWeb1 + signOneImageName ; //"Dr.Amita Neelakantan.jpg";
				 imageOneSign = Image.getInstance(path1);
				 imageOneSign.scaleAbsolute(90, 50);
				 cellOneSign = new PdfPCell();
				 cellOneSign.addElement(new Chunk(imageOneSign, 5, -5));
				 cellOneSign.setBorder(Rectangle.NO_BORDER);		 

				 String pathToWeb2 = FilePath.getBasePath();
				 path2 = pathToWeb2 + signTwoImageName ; //"Dr.Amita Neelakantan.jpg";			
				 imageTwoSign = Image.getInstance(path2);
				 imageTwoSign.scaleAbsolute(90, 50);
				 cellTwoSign = new PdfPCell();
				 cellTwoSign.addElement(new Chunk(imageTwoSign, 5, -5));
				 cellTwoSign.setBorder(Rectangle.NO_BORDER);
				 
				 String pathToWeb3 = FilePath.getBasePath();
				 path3 = pathToWeb3 + signThreeImageName ; //"Dr.Amita Neelakantan.jpg";			
				 imageThreeSign = Image.getInstance(path3);
				 imageThreeSign.scaleAbsolute(90, 50);
				 cellThreeSign = new PdfPCell();
				 cellThreeSign.addElement(new Chunk(imageThreeSign, 5, -5));
				 cellThreeSign.setBorder(Rectangle.NO_BORDER);
				 cellThreeSign.setHorizontalAlignment(Element.ALIGN_CENTER);
		 
			
				 Headertable2.addCell(cellOneSign);
				 Headertable2.addCell(new Phrase(" ", tabletextSign));
				 Headertable2.addCell(cellTwoSign);
				 Headertable2.addCell(new Phrase(" ", tabletextSign));		 
				 Headertable2.addCell(cellThreeSign);				
				
				PdfPCell cells30 = new PdfPCell(new Phrase(signOneDocName.replaceAll("@", "\n"), tabletextSign));
				cells30.setHorizontalAlignment(Element.ALIGN_CENTER);
				cells30.setBorder(Rectangle.NO_BORDER);
				Headertable2.addCell(cells30);
				
				 Headertable2.addCell(new Phrase(" ", tabletextSign));
				
				PdfPCell cells31 = new PdfPCell(new Phrase(signTwoDocName.replaceAll("@", "\n"), tabletextSign));
				cells31.setHorizontalAlignment(Element.ALIGN_CENTER);
				cells31.setBorder(Rectangle.NO_BORDER);
				Headertable2.addCell(cells31);
				
				 Headertable2.addCell(new Phrase(" ", tabletextSign));
				
				PdfPCell cells33 = new PdfPCell(new Phrase(signThreeDocName.replaceAll("@", "\n"), tabletextSign));
				cells33.setHorizontalAlignment(Element.ALIGN_CENTER);
				cells33.setBorder(Rectangle.NO_BORDER);
				Headertable2.addCell(cells33);
			}catch(Exception e)
			{
				e.printStackTrace();
			}		
		}	
			//set page total number 
			
			table.setWidths(new int[] {80, 18, 2});
			table.setTotalWidth(527);
			table.setLockedWidth(true);
			table.getDefaultCell().setFixedHeight(20);
			table.getDefaultCell().setBorder(Rectangle.TOP);
			
			table.addCell(strHeader);
		
			table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			table.addCell( new Phrase(String.format("\nPage %d of ", pdfWriter.getPageNumber()), tabletext));
			
			PdfPCell cell = new PdfPCell(Image.getInstance(total));
			cell.setBorder(Rectangle.TOP);
			cell.setBorderColor(Color.BLACK);	
			table.addCell(cell);

			//PdfContentByte canvas = pdfWriter.getDirectContent();
            //canvas.beginMarkedContentSequence(PdfName.BASEFONT);
            
			table.writeSelectedRows(0, -1, document.left(document.leftMargin()), 30, pdfWriter.getDirectContent());
			Headertable2.writeSelectedRows(0, -1, document.left(document.leftMargin()), 140, pdfWriter.getDirectContent());
			//table.writeSelectedRows(0, -1, 44, 50, pdfWriter.getDirectContent());
			
          //  canvas.endMarkedContentSequence();
		}catch(Exception e) {
			e.printStackTrace();
		}
		}
	}
	
	@Override
	public void onCloseDocument(PdfWriter writer, Document document) {
		PageEventHandlerBean eventObj = new PageEventHandlerBean();	
		HttpServletRequest request = eventObj.getRequest();
		String covide = (String) request.getAttribute("covide");
		if(covide.equalsIgnoreCase("Yes")){
			
		}else{
			Font tabletext = new Font(Font.HELVETICA, 8, Font.BOLD);
			ColumnText.showTextAligned(total, Element.ALIGN_LEFT, new Phrase(""+String.valueOf(writer.getPageNumber() - 1), tabletext), 2, 10, 0);
		}
		
	}

	@Override
	public void onGenericTag(PdfWriter arg0, Document arg1, Rectangle arg2,
			String arg3) {
	}

	@Override
	public void onParagraph(PdfWriter arg0, Document arg1, float arg2) {
	}

	@Override
	public void onParagraphEnd(PdfWriter arg0, Document arg1, float arg2) {
	}

	@Override
	public void onSection(PdfWriter arg0, Document arg1, float arg2, int arg3,
			Paragraph arg4) {
	}

	@Override
	public void onSectionEnd(PdfWriter arg0, Document arg1, float arg2) {
	}
}
