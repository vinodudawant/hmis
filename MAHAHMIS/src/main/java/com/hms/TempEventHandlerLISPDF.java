package com.hms;

import java.awt.Color;
import java.io.File;
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

import org.springframework.beans.factory.annotation.Autowired;

import com.hms.administrator.dto.HospitalDetails;
import com.hms.administrator.service.HospitalDetailAdminService;
import com.hms.configuration.PageEventHandlerBean;
import com.hms.dto.Users;
import com.hms.ehat.controller.RegistrationController;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.opdbill.controller.OpdBillController;
import com.hms.opdbill.dto.PatientHeaderInfoDto;
import com.hms.opdbill.service.OpdBillService;
import com.hms.pathology.dto.PathologySampleWiseMaster;
import com.hms.pathology.service.Phlebotomyservice;
import com.hms.pharmacy.upload.FilePath;
import com.hms.users.service.UsersService;
import com.hms.users.serviceimpl.UsersServiceImpl;
import com.hms.utility.ApplicationContextUtils;
import com.itextpdf.text.pdf.BarcodeQRCode;
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

public class TempEventHandlerLISPDF extends PdfPageEventHelper implements PdfPageEvent {

	private static int count = 0;
	private int pageNumber;
	
	@Autowired
	UsersService userservice;

//	Font font;
	private String strHeader;
	private PdfTemplate total;

	public String getStrHeader() {
		return strHeader;
	}

	public void setStrHeader(String strHeader) {
		this.strHeader = strHeader;
	}

	@Override
	public void onStartPage(PdfWriter writer, Document document) {
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

			String masterIdd = request.getParameter("masterIdd");
			String trId = request.getParameter("treatmentId");
			String patientType = request.getParameter("gender");
			String mIds[]=masterIdd.split(",");
			String mIdd=mIds[0];
			Integer mid = Integer.parseInt(mIdd);

			if (masterIdd == null || trId == null || patientType == null) {
				masterIdd = (String) request.getAttribute("masterIdd");
				trId = ((Integer) request.getAttribute("treatmentId")).toString();
				patientType = (String) request.getAttribute("gender");
			}

			String headerFlag = (String) request.getAttribute("headerFlag");

			int treatmentId = Integer.parseInt(trId);

			if (headerFlag.equalsIgnoreCase("No")) {
				ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
				String lntUnit = (String) resource.getObject("lntUnit").toString();
				
				ResourceBundle resource1 = ResourceBundle.getBundle("Ehat");
				String meesha = (String) resource1.getObject("meesha").toString();

				//TreatmentModel treatmentModel = new TreatmentModel();
				//List<RegTreBillDto> ltPatientRecord = null;
				//RegTreBillDto rtd = new RegTreBillDto();
				//RegistrationController uss = (ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
				//rtd = uss.fetchPatientsRecordByTreatmentId(treatmentId);
				//rtd = rtd.getListRegTreBillDto().get(0);
				
				PatientHeaderInfoDto objPat = new PatientHeaderInfoDto();
				objPat.setTreatmentId(treatmentId);
				OpdBillController uss = (ApplicationContextUtils.getApplicationContext()).getBean(OpdBillController.class);
				PatientHeaderInfoDto rtd = uss.getPatientInfoByTreatmentId(objPat).getListRegTreBillDto().get(0);
				
				OpdBillService opdService = (ApplicationContextUtils.getApplicationContext()).getBean(OpdBillService.class);
		    	String sampleCollectDateTime="";
		    	if(meesha.equalsIgnoreCase("on")) {
		    		 sampleCollectDateTime=opdService.getSampleCollectionDateandTime(mid);
		    		 SimpleDateFormat sdfIn1 = new SimpleDateFormat("dd/MM/yyyy HH:mm");
						//SimpleDateFormat sdfOut = new SimpleDateFormat("dd-MM-yyyy HH:mm");
						SimpleDateFormat sdfOut1 = new SimpleDateFormat("dd-MM-yyyy hh:mm aa");
						Date date1 = sdfIn1.parse(sampleCollectDateTime);
						sampleCollectDateTime = sdfOut1.format(date1);
		    	}

		    	
			
				String age = rtd.getAge();
				String[] ageArray = age.split("/");
				String finalAge = ageArray[0];
				if (ageArray[0].equalsIgnoreCase("0Y")) {
					finalAge = ageArray[1];
				}
				if (ageArray[0].equalsIgnoreCase("0Y") && ageArray[1].equalsIgnoreCase("0M")) {
					finalAge = ageArray[2];
				}

				String dob = rtd.getDob();

				if ((dob.trim()).equalsIgnoreCase("")) {
					dob = "-";
				} else {
					dob = dob.replaceAll("/", "-");
					String[] dobChane1 = dob.split("-");
					dob = dobChane1[2] + "-" + dobChane1[1] + "-" + dobChane1[0];
				}

				//SimpleDateFormat dateformatterr = new SimpleDateFormat("dd-MM-yyyy HH:mm");
				SimpleDateFormat dateformatterr = new SimpleDateFormat("dd/MM/yyyy hh:mm aa");
				String regDate = dateformatterr.format(rtd.getCreatedDateTime());

				String idProof = "";
				String id = rtd.getProofId();
				if (id.equalsIgnoreCase("1")) {
					idProof = "Aadhar";
				} else if (id.equalsIgnoreCase("2")) {
					idProof = "Pan Card";
				} else if (id.equalsIgnoreCase("3")) {
					idProof = "Passport";
				} else if (id.equalsIgnoreCase("4")) {
					idProof = "Driving License";
				} else if (id.equalsIgnoreCase("5")) {
					idProof = "Other";
				}

				if (rtd.getBusinessType() == 2) {
					int refferSource = rtd.getReferSource();

					if (refferSource == 0)
						rtd.setCustomerName("Self");
					else if (refferSource == 1)
						rtd.setCustomerName("Self (Walk In)");
					else if (refferSource == 2)
						rtd.setCustomerName("Self (Home Collection)");
					else if (refferSource == 4)
						rtd.setCustomerName("Self (Corporate)");
				}

				String refDocName = "";
				if (rtd.getDocNameChan().equalsIgnoreCase("-"))
					refDocName = "-";
				else
					refDocName = rtd.getDocNameChan();
				
				String referDoctorName=rtd.getReferDoctorName();

				/*
				 * String customerName = ""; if(rtd.getCustomerName().equalsIgnoreCase("-")){
				 * customerName="Self"; }else{ customerName=rtd.getCustomerName(); }
				 */

				HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
				List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
				HospitalDetails hospObj = arrHospitalDetails.get(0);

				Phlebotomyservice phlebotomyservice = (ApplicationContextUtils.getApplicationContext())
						.getBean(Phlebotomyservice.class);
				List<PathologySampleWiseMaster> list = phlebotomyservice.getRoutinevalueResutlusingNewPrint(masterIdd,
						treatmentId, patientType, unitId, request);

				String barcodenumber = list.get(pageIteration).getBarCode();

				String collecteddate1 = list.get(pageIteration).getCollecteddate();

				String collectDateReg = rtd.getCollectionDate();
				
				/*String serviceAssignedDateTime = "";

				if (collectDateReg != null || collectDateReg != "null") {

					String[] splitDateCReg = rtd.getCollectionDate().split("/");

					String dd = splitDateCReg[0];
					String mm = splitDateCReg[1];
					String yy = splitDateCReg[2];
					StringBuffer fd = new StringBuffer();
					fd.append(dd + "-" + mm + "-" + yy);

					String regCollectDate = fd.toString();
					serviceAssignedDateTime = regCollectDate + ":" + rtd.getCollectionTime();
				} else {
					serviceAssignedDateTime = phlebotomyservice.getOldestCollectionDateInString(masterIdd);
				}
               */
				
				String serviceAssignedDateTime="";
				serviceAssignedDateTime=opdService.getSampleCollectionDateandTime(mid);
		    		 SimpleDateFormat sdfIn1 = new SimpleDateFormat("dd/MM/yyyy HH:mm");
						//SimpleDateFormat sdfOut = new SimpleDateFormat("dd-MM-yyyy HH:mm");
						SimpleDateFormat sdfOut1 = new SimpleDateFormat("dd/MM/yyyy hh:mm aa");
						Date date1 = sdfIn1.parse(serviceAssignedDateTime);
						serviceAssignedDateTime = sdfOut1.format(date1);
		    	
				
				if (collecteddate1 != null) {
					collecteddate1 = list.get(pageIteration).getCollecteddate();
				} else {
					collecteddate1 = "-";
				}
				String postdate1 = list.get(pageIteration).getPostdate();
				String postdate = "";
				if (postdate1 != null) {

					postdate1 = list.get(pageIteration).getPostdate();
					String[] wordspostddate = postdate1.split(" ");

					String postDate = wordspostddate[0];
					String postTime = wordspostddate[1];

					String[] postDateddmmyy = postDate.split("-");

					SimpleDateFormat sdfIn = new SimpleDateFormat("yyyy-MM-dd HH:mm");
					//SimpleDateFormat sdfOut = new SimpleDateFormat("dd-MM-yyyy HH:mm");
					SimpleDateFormat sdfOut = new SimpleDateFormat("dd-MM-yyyy hh:mm aa");
					Date date = sdfIn.parse(postdate1);

					// System.err.println(">>>> reported on "+sdfOut.format(date));

					StringBuffer fd2 = new StringBuffer();
					fd2.append(postDateddmmyy[2] + "-" + postDateddmmyy[1] + "-" + postDateddmmyy[0]);

					String postDateddmmyy1 = fd2.toString();
					postdate = sdfOut.format(date);// postDateddmmyy1+" "+ postTime;
				} else {
					postdate1 = "-";
				}

				String[] wordscollecteddate = collecteddate1.split(" ");

				String collectedDate = wordscollecteddate[0];
				// String collectedTime=wordscollecteddate[1];

				// String[] collectedDateddmmyy=collectedDate.split("-");

				// StringBuffer fd1 = new StringBuffer();
				// fd1.append(collectedDateddmmyy[2]+"-"+collectedDateddmmyy[1]+"-"+collectedDateddmmyy[0]);

				// String collectedDateddmy=fd1.toString();
				// String collecteddate=collectedDateddmy+" "+ collectedTime;

				SimpleDateFormat sdfIn = new SimpleDateFormat("yyyy-MM-dd HH:mm");
				SimpleDateFormat sdfOut = new SimpleDateFormat("dd-MM-yyyy HH:mm");
				// Date date = sdfIn.parse(collecteddate1);

				// System.err.println(">>>> "+sdfOut.format(date));

				// String collecteddate=collectedDateddmy+" "+ collectedTime;
				// String collecteddate=sdfOut.format(date);
				// System.err.println(collecteddate+"collecteddatecollecteddate"+collecteddate1);

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
				p.add(new Chunk("" + hospitalName, bold));
				p.add(new Chunk("\n\n" + "\t" + address, tabletext));
				p.add(new Chunk(" " + city + " Pin - " + hospitalZip + "\n", tabletext));
				p.add(new Chunk("Phone No. " + hPhoneNo, tabletext));
				p.add(new Chunk("\n" + webste + "\n" + "email: " + email, tabletext));

				// added code for QR
				  String pNameSplit=rtd.getPatientName();
				String pNameee = pNameSplit.replaceAll("\\s", "");
			    String ReportUrlSmsLinkk = (String) resource.getObject("ReportUrlSmsLink").toString();	    
			    final String labReportPath = ReportUrlSmsLinkk+"/LabResultPdf/" + File.separator +
			    		masterIdd + File.separator + pNameee + File.separator +pNameee+".pdf";
				String filePath = labReportPath.replace("\\", "/");
				  String finala= filePath;	
				   BarcodeQRCode my_code = new BarcodeQRCode(finala, 1, 1, null);
				   Image imgq = null;
				   
				   java.awt.Image awtImage = my_code.createAwtImage(Color.BLACK, Color.WHITE);			    			                
				   imgq = com.lowagie.text.Image.getInstance(awtImage, null);
				   imgq.scaleAbsolute(60,60);
				   imgq.scaleAbsoluteHeight(60);
				    PdfPCell QrCodecell = null;
	                 QrCodecell = new PdfPCell();
	                 QrCodecell.addElement(new Chunk(imgq, 1, -45));
	                 QrCodecell.setBorder(Rectangle.NO_BORDER);
	                 QrCodecell.setRowspan(6);
				// end QR code
				
				
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
				
				PdfPTable HeaderTableSpace = new PdfPTable(1);
				int[] headerwidthSpace = {40 };
				HeaderTableSpace.setWidths(headerwidthSpace);
				HeaderTableSpace.setWidthPercentage(95f);
				HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTableSpace.setSpacingAfter(62.0f);
				
				HeaderTableSpace.addCell(new Phrase("", tabletext));
				HeaderTableSpace.addCell(new Phrase("", tabletext));
				HeaderTableSpace.addCell(new Phrase("", tabletext));
				HeaderTableSpace.addCell(new Phrase("", tabletext));
				HeaderTableSpace.addCell(new Phrase("", tabletext));
	  			document.add(HeaderTableSpace);
	  			HeaderTableSpace.flushContent();	
	  			
	  			PdfPTable HeaderTable11 = new PdfPTable(10);
	  			int[] headerwidth11 = { 40,10,40,10,40,10,40,10,40,10 };
	  			HeaderTable11.setWidths(headerwidth11);
	  			HeaderTable11.setWidthPercentage(10f);
	  	 		HeaderTable11.setHorizontalAlignment(Element.ALIGN_CENTER);
	  			HeaderTable11.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  	 		HeaderTable11.setWidthPercentage(100);
	  	 		

                PdfPTable patientDetailsHeaderTitle = new PdfPTable(1);
			int[] patientDetailsHeaderWidthTitle = { 20};
			patientDetailsHeaderTitle.setWidths(patientDetailsHeaderWidthTitle);
			patientDetailsHeaderTitle.setWidthPercentage(95f);
			patientDetailsHeaderTitle.getDefaultCell().setBorder(Rectangle.TOP);
			patientDetailsHeaderTitle.getDefaultCell().setHorizontalAlignment(Rectangle.ALIGN_CENTER);
			patientDetailsHeaderTitle.addCell(new Phrase("", tabletext));
			document.add(patientDetailsHeaderTitle);
			patientDetailsHeaderTitle.flushContent();
		
			  PdfPTable patientDetailsDate = new PdfPTable(6);
				int[] patientDetailsHeaderDate = { 10,10,10,10,15,23};
				patientDetailsDate.setWidths(patientDetailsHeaderDate);
				patientDetailsDate.setWidthPercentage(95f);
				patientDetailsDate.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				Date date = new Date();
		     //   SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm aa");
				  SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		        String currentDate1= format.format(date);
		        System.out.println("currentDate===="+currentDate1);
				
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("LAB  REPORT", subheader));
				patientDetailsDate.addCell(new Phrase(" ", subheader));
				patientDetailsDate.addCell(new Phrase("  Printed Date: " +currentDate1, tabletext));
				
				document.add(patientDetailsDate);
				patientDetailsDate.flushContent();
			

	  	 		PdfPTable patientDetailsHeader = new PdfPTable(6);
				int[] patientDetailsHeaderWidth = { 32, 37, 29, 37, 28,38};
				patientDetailsHeader.setWidths(patientDetailsHeaderWidth);
				patientDetailsHeader.setWidthPercentage(95f);

				patientDetailsHeader.getDefaultCell().setBorder(Rectangle.BOTTOM);
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
		

				patientDetailsHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				patientDetailsHeader.addCell(new Phrase("", subheader));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", subheader));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
			

				patientDetailsHeader.addCell(new Phrase("Patient Id" , subheader));
				patientDetailsHeader.addCell(new Phrase(": "+ rtd.getPatientId(), tabletext));
				patientDetailsHeader.addCell(new Phrase("Patient Name ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getPatientName().replaceAll("  ", " "), tabletext));
				patientDetailsHeader.addCell(new Phrase("TreatmentId", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getTreatmentId(), tabletext));
				
				if(meesha.equalsIgnoreCase("on")) {
					patientDetailsHeader.addCell(new Phrase("Age/Gender ", subheader));
					patientDetailsHeader.addCell(new Phrase(": " + finalAge+"/"+rtd.getGender(), tabletext));
				}else {
					patientDetailsHeader.addCell(new Phrase("Age/DOB/Gender   ", subheader));
					patientDetailsHeader.addCell(new Phrase(": " + finalAge + "/" + dob + "/" + rtd.getGender(), tabletext));
				}
				patientDetailsHeader.addCell(new Phrase("Mobile No", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getMobile(), tabletext));
				  patientDetailsHeader.addCell(new Phrase("Ref. By  ", subheader));
				  patientDetailsHeader.addCell(new Phrase(": "+referDoctorName, tabletext));

				  patientDetailsHeader.addCell(new Phrase("Registered On", subheader));
					patientDetailsHeader.addCell(new Phrase(": " + regDate, tabletext));
				  
				  if(meesha.equalsIgnoreCase("on")) {
						patientDetailsHeader.addCell(new Phrase("Collected On ", subheader));
						patientDetailsHeader.addCell(new Phrase(": " + sampleCollectDateTime, tabletext));
						
						}else {
							patientDetailsHeader.addCell(new Phrase("Collected On ", subheader));
							patientDetailsHeader.addCell(new Phrase(": " + serviceAssignedDateTime, tabletext));
							
						}
				  
				
				patientDetailsHeader.addCell(new Phrase("Reported On", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + postdate, tabletext));
				  
			
				patientDetailsHeader.addCell(new Phrase("Nationality  ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getNationality(), tabletext));
				String patType = "Self";
				if(rtd.getChargesMasterSlaveId() > 0)
					patType = "Sponsor";
				// added by Rohit on 10-08-2021 to set customer type on PDF print header
				patientDetailsHeader.addCell(new Phrase("Patient Type  ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + patType, tabletext));
				patientDetailsHeader.addCell(new Phrase("Sponsor Name  ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getCategoryName(), tabletext));
				//patientDetailsHeader.addCell(new Phrase("Sample UID No.  ", subheader));
			//	patientDetailsHeader.addCell(new Phrase(": " + barcodenumber.trim(), tabletext));
				
			//	patientDetailsHeader.addCell(new Phrase("UHID ", subheader));
				//patientDetailsHeader.addCell(new Phrase(": " + rtd.getCenterPatientId(), tabletext));
				
				if ((rtd.getIdentificationNo().trim()).equals("") || rtd.getProofId().equals("0")) {
					
					// patientDetailsHeader.addCell(new Phrase(" ", tabletext));
					//  patientDetailsHeader.addCell(new Phrase(" ", tabletext));
					
				} else {
					//patientDetailsHeader.addCell(new Phrase("Patient UID No.  ", subheader));
					//patientDetailsHeader.addCell(new Phrase(": " + rtd.getIdentificationNo() + " (" + idProof + ")", tabletext));
				
				}

				// added by Rohit on 10-08-2021 to set customer type on PDF print header
				
		                  Barcode128 code128 = new Barcode128();
				   		
				   		code128.setSize(7f);
				  		code128.setBarHeight(15);
				   		//Jitendra 15 March 2019
						code128.setBaseline(-1);
						code128.setGenerateChecksum(true);
						code128.setCodeType(Barcode128.CODE128);
						System.out.println("Barcode128.CODE128 "+Barcode128.CODE128);
		                    
						code128.setCode(Integer.toString(rtd.getPatientId()));
						
						PdfContentByte contentByte;
						contentByte = writer.getDirectContent();
						
						

				
				Barcode128 code129 = new Barcode128();

				PdfContentByte canvas = writer.getDirectContentUnder();

				/*
				 * Phrase watermark = new Phrase("JCG", new Font()); Image bg =
				 * Image.getInstance(path1); bg.scaleAbsolute(400, 300); float w =
				 * bg.getScaledWidth(); float h = bg.getScaledHeight(); PdfContentByte over;
				 * Rectangle pagesize; float x, y; int n = writer.getPageNumber();
				 * 
				 * pagesize = writer.getPageSize(); x = (pagesize.getLeft() +
				 * pagesize.getRight()) / 2; y = (pagesize.getTop() + pagesize.getBottom()) / 2;
				 * over = writer.getDirectContent(); over.saveState();
				 * 
				 * // set transparency PdfGState state = new PdfGState();
				 * state.setFillOpacity(0.2f); over.setGState(state);
				 * 
				 * // add watermark text and image over.addImage(bg, w, 0, 0, h, x - (w / 2), y
				 * - (h / 2)); over.restoreState();
				 */

				/*
				 * Barcode128 code128 = new Barcode128(); code128.setBaseline(5);
				 * code128.setGenerateChecksum(true); code128.setSize(2);
				 * code128.setBarHeight(5); code128.setCodeType(Barcode128.CODE128);
				 * code128.setSize(4); code128.setCode(barcodenumber);
				 */
				
				

				
			
				
				  
				  
				 /* patientDetailsHeader.addCell(new Phrase(" ", subheader));
				  patientDetailsHeader.addCell(new Phrase(" ", tabletext));
				patientDetailsHeader.addCell(new Phrase("", subheader));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				*/

				patientDetailsHeader.addCell(new Phrase("", subheader));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", subheader));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				
				
				
				/*
				 * patientDetailsHeader.addCell(new Phrase(" ", subheader));
				 * patientDetailsHeader.addCell(new Phrase(" ", tabletext));
				 * patientDetailsHeader.addCell(new Phrase(" ", subheader));
				 * patientDetailsHeader.addCell(new Phrase(" ", tabletext));
				 */
				// patientDetailsHeader.addCell(code128.createImageWithBarcode(canvas, null,
				// null));

				/*
				 * patientDetailsHeader.addCell(new Phrase("Nationality  ", subheader));
				 * patientDetailsHeader.addCell(new Phrase(": "+country, tabletext));
				 * patientDetailsHeader.addCell(new Phrase(" ", subheader));
				 * patientDetailsHeader.addCell(new Phrase(" ", tabletext));
				 * 
				 * if((rtd.getIdentificationNo().trim()).equals("") ||
				 * rtd.getProofId().equals("0")) { patientDetailsHeader.addCell(new
				 * Phrase("Id No.  ", subheader)); patientDetailsHeader.addCell(new
				 * Phrase(": "+"-", tabletext)); }else { patientDetailsHeader.addCell(new
				 * Phrase("Id No.  ", subheader)); patientDetailsHeader.addCell(new
				 * Phrase(": "+rtd.getIdentificationNo()+"("+idProof+")", tabletext)); }
				 * patientDetailsHeader.addCell(new Phrase(" ", subheader));
				 * patientDetailsHeader.addCell(new Phrase(" ", tabletext));
				 */

				patientDetailsHeader.getDefaultCell().setBorder(Rectangle.TOP);
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				

				document.add(patientDetailsHeader);
				patientDetailsHeader.flushContent();
			} else {
				ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
				String lntUnit = (String) resource.getObject("lntUnit").toString();
				String nabhLogoPrint = (String) resource.getObject("nabhLogoPrint").toString();
				
				
				ResourceBundle resource1 = ResourceBundle.getBundle("Ehat");
				String meesha = (String) resource1.getObject("meesha").toString();

				//TreatmentModel treatmentModel = new TreatmentModel();
				//List<RegTreBillDto> ltPatientRecord = null;
				//RegTreBillDto rtd = new RegTreBillDto();
				//RegistrationController uss = (ApplicationContextUtils.getApplicationContext()).getBean(RegistrationController.class);
				//rtd = uss.fetchPatientsRecordByTreatmentId(treatmentId);
				//rtd = rtd.getListRegTreBillDto().get(0);
				
				PatientHeaderInfoDto objPat = new PatientHeaderInfoDto();
				objPat.setTreatmentId(treatmentId);
				OpdBillController uss = (ApplicationContextUtils.getApplicationContext()).getBean(OpdBillController.class);
				PatientHeaderInfoDto rtd = uss.getPatientInfoByTreatmentId(objPat).getListRegTreBillDto().get(0);
				
				OpdBillService opdService = (ApplicationContextUtils.getApplicationContext()).getBean(OpdBillService.class);
		    	String sampleCollectDateTime="";
		    	if(meesha.equalsIgnoreCase("on")) {
		    		 sampleCollectDateTime=opdService.getSampleCollectionDateandTime(mid);
		    		 SimpleDateFormat sdfIn1 = new SimpleDateFormat("dd/MM/yyyy HH:mm");
						//SimpleDateFormat sdfOut = new SimpleDateFormat("dd-MM-yyyy HH:mm");
						SimpleDateFormat sdfOut1 = new SimpleDateFormat("dd-MM-yyyy hh:mm aa");
						Date date1 = sdfIn1.parse(sampleCollectDateTime);
						sampleCollectDateTime = sdfOut1.format(date1);
		    	}

		    	
			
				String age = rtd.getAge();
				String[] ageArray = age.split("/");
				String finalAge = ageArray[0];
				if (ageArray[0].equalsIgnoreCase("0Y")) {
					finalAge = ageArray[1];
				}
				if (ageArray[0].equalsIgnoreCase("0Y") && ageArray[1].equalsIgnoreCase("0M")) {
					finalAge = ageArray[2];
				}

				String dob = rtd.getDob();

				if ((dob.trim()).equalsIgnoreCase("")) {
					dob = "-";
				} else {
					dob = dob.replaceAll("/", "-");
					String[] dobChane1 = dob.split("-");
					dob = dobChane1[2] + "-" + dobChane1[1] + "-" + dobChane1[0];
				}

				//SimpleDateFormat dateformatterr = new SimpleDateFormat("dd-MM-yyyy HH:mm");
				SimpleDateFormat dateformatterr = new SimpleDateFormat("dd/MM/yyyy hh:mm aa");
				String regDate = dateformatterr.format(rtd.getCreatedDateTime());

				String idProof = "";
				String id = rtd.getProofId();
				if (id.equalsIgnoreCase("1")) {
					idProof = "Aadhar";
				} else if (id.equalsIgnoreCase("2")) {
					idProof = "Pan Card";
				} else if (id.equalsIgnoreCase("3")) {
					idProof = "Passport";
				} else if (id.equalsIgnoreCase("4")) {
					idProof = "Driving License";
				} else if (id.equalsIgnoreCase("5")) {
					idProof = "Other";
				}

				if (rtd.getBusinessType() == 2) {
					int refferSource = rtd.getReferSource();

					if (refferSource == 0)
						rtd.setCustomerName("Self");
					else if (refferSource == 1)
						rtd.setCustomerName("Self (Walk In)");
					else if (refferSource == 2)
						rtd.setCustomerName("Self (Home Collection)");
					else if (refferSource == 4)
						rtd.setCustomerName("Self (Corporate)");
				}

				String refDocName = "";
				if (rtd.getDocNameChan().equalsIgnoreCase("-"))
					refDocName = "-";
				else
					refDocName = rtd.getDocNameChan();
				
				String referDoctorName=rtd.getReferDoctorName();

				/*
				 * String customerName = ""; if(rtd.getCustomerName().equalsIgnoreCase("-")){
				 * customerName="Self"; }else{ customerName=rtd.getCustomerName(); }
				 */

				HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
				List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
				HospitalDetails hospObj = arrHospitalDetails.get(0);

				Phlebotomyservice phlebotomyservice = (ApplicationContextUtils.getApplicationContext())
						.getBean(Phlebotomyservice.class);
				List<PathologySampleWiseMaster> list = phlebotomyservice.getRoutinevalueResutlusingNewPrint(masterIdd,
						treatmentId, patientType, unitId, request);

				String barcodenumber = list.get(pageIteration).getBarCode();

				String collecteddate1 = list.get(pageIteration).getCollecteddate();

				String collectDateReg = rtd.getCollectionDate();
				
				/*String serviceAssignedDateTime = "";

				if (collectDateReg != null || collectDateReg != "null") {

					String[] splitDateCReg = rtd.getCollectionDate().split("/");

					String dd = splitDateCReg[0];
					String mm = splitDateCReg[1];
					String yy = splitDateCReg[2];
					StringBuffer fd = new StringBuffer();
					fd.append(dd + "-" + mm + "-" + yy);

					String regCollectDate = fd.toString();
					serviceAssignedDateTime = regCollectDate + ":" + rtd.getCollectionTime();
				} else {
					serviceAssignedDateTime = phlebotomyservice.getOldestCollectionDateInString(masterIdd);
				}
                */
				String serviceAssignedDateTime="";
				serviceAssignedDateTime=opdService.getSampleCollectionDateandTime(mid);
		    		 SimpleDateFormat sdfIn1 = new SimpleDateFormat("dd/MM/yyyy HH:mm");
						//SimpleDateFormat sdfOut = new SimpleDateFormat("dd-MM-yyyy HH:mm");
						SimpleDateFormat sdfOut1 = new SimpleDateFormat("dd/MM/yyyy hh:mm aa");
						Date date1 = sdfIn1.parse(serviceAssignedDateTime);
						serviceAssignedDateTime = sdfOut1.format(date1);
						
						
				if (collecteddate1 != null) {
					collecteddate1 = list.get(pageIteration).getCollecteddate();
				} else {
					collecteddate1 = "-";
				}
				String postdate1 = list.get(pageIteration).getPostdate();
				String postdate = "";
				if (postdate1 != null) {

					postdate1 = list.get(pageIteration).getPostdate();
					String[] wordspostddate = postdate1.split(" ");

					String postDate = wordspostddate[0];
					String postTime = wordspostddate[1];

					String[] postDateddmmyy = postDate.split("-");

					SimpleDateFormat sdfIn = new SimpleDateFormat("yyyy-MM-dd HH:mm");
					//SimpleDateFormat sdfOut = new SimpleDateFormat("dd-MM-yyyy HH:mm");
					SimpleDateFormat sdfOut = new SimpleDateFormat("dd-MM-yyyy hh:mm aa");
					Date date = sdfIn.parse(postdate1);

					// System.err.println(">>>> reported on "+sdfOut.format(date));

					StringBuffer fd2 = new StringBuffer();
					fd2.append(postDateddmmyy[2] + "-" + postDateddmmyy[1] + "-" + postDateddmmyy[0]);

					String postDateddmmyy1 = fd2.toString();
					postdate = sdfOut.format(date);// postDateddmmyy1+" "+ postTime;
				} else {
					postdate1 = "-";
				}

				String[] wordscollecteddate = collecteddate1.split(" ");

				String collectedDate = wordscollecteddate[0];
				// String collectedTime=wordscollecteddate[1];

				// String[] collectedDateddmmyy=collectedDate.split("-");

				// StringBuffer fd1 = new StringBuffer();
				// fd1.append(collectedDateddmmyy[2]+"-"+collectedDateddmmyy[1]+"-"+collectedDateddmmyy[0]);

				// String collectedDateddmy=fd1.toString();
				// String collecteddate=collectedDateddmy+" "+ collectedTime;

				SimpleDateFormat sdfIn = new SimpleDateFormat("yyyy-MM-dd HH:mm");
				SimpleDateFormat sdfOut = new SimpleDateFormat("dd-MM-yyyy HH:mm");
				// Date date = sdfIn.parse(collecteddate1);

				// System.err.println(">>>> "+sdfOut.format(date));

				// String collecteddate=collectedDateddmy+" "+ collectedTime;
				// String collecteddate=sdfOut.format(date);
				// System.err.println(collecteddate+"collecteddatecollecteddate"+collecteddate1);

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
				String path1 = context.getRealPath(path);
				String nabhLogo = context.getRealPath(nabh);
				//Image img = null;
				//PdfPCell cell = null;
				//String path1 = "";

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
				
				// added for left side logo
				Image img = null;
				PdfPCell cell = null;
				try {
					img = Image.getInstance(path1);
					img.scaleAbsolute(100, 60);
					cell = new PdfPCell();
					cell.addElement(new Chunk(img, 1, -40));
					cell.setBorder(Rectangle.NO_BORDER);
				} catch (Exception e) {
					
					e.printStackTrace();
				} 
				// end
				
				Image imgNabh = null;
				PdfPCell cellNabh = null;
				try {
					imgNabh = Image.getInstance(nabhLogo);
					imgNabh.scaleAbsolute(100, 60);
					cellNabh = new PdfPCell();
					cellNabh.addElement(new Chunk(imgNabh, 1, -5));
					cellNabh.setBorder(Rectangle.NO_BORDER);
				} catch (Exception e) {
					e.printStackTrace();
				} 

				PdfPTable HeaderTable1 = new PdfPTable(3);
				int[] headerwidth1 = { 30, 70, 35 };
				HeaderTable1.setWidths(headerwidth1);
				HeaderTable1.setWidthPercentage(95f);
				HeaderTable1.setHorizontalAlignment(Element.ALIGN_CENTER);
				HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				if (img == null) {
					HeaderTable1.addCell(new Phrase("", header));
				} else {
					//HeaderTable1.addCell("");
					HeaderTable1.addCell(cell);
				}

				Font bold = new Font(Font.TIMES_ROMAN, 8, Font.BOLD);
				Phrase p = new Phrase();
				p.add(new Chunk("" + hospitalName, bold));
				p.add(new Chunk("\n\n" + "\t" + address, tabletext));
				p.add(new Chunk(" " + city + " Pin - " + hospitalZip + "\n", tabletext));
				p.add(new Chunk("Phone No. " + hPhoneNo, tabletext));
				p.add(new Chunk("\n" + webste + "\n" + "email: " + email, tabletext));

				// added code for QR
				  String pNameSplit=rtd.getPatientName();
				String pNameee = pNameSplit.replaceAll("\\s", "");
			    String ReportUrlSmsLinkk = (String) resource.getObject("ReportUrlSmsLink").toString();	    
			    final String labReportPath = ReportUrlSmsLinkk+"/LabResultPdf/" + File.separator +
			    		masterIdd + File.separator + pNameee + File.separator +pNameee+".pdf";
				String filePath = labReportPath.replace("\\", "/");
				  String finala= filePath;	
				   BarcodeQRCode my_code = new BarcodeQRCode(finala, 1, 1, null);
				   Image imgq = null;
				   
				   java.awt.Image awtImage = my_code.createAwtImage(Color.BLACK, Color.WHITE);			    			                
				   imgq = com.lowagie.text.Image.getInstance(awtImage, null);
				   imgq.scaleAbsolute(60,60);
				   imgq.scaleAbsoluteHeight(60);
				    PdfPCell QrCodecell = null;
	                 QrCodecell = new PdfPCell();
	                 QrCodecell.addElement(new Chunk(imgq, 1, -45));
	                 QrCodecell.setBorder(Rectangle.NO_BORDER);
	                 QrCodecell.setRowspan(6);
				// end QR code
				
				
				PdfPCell hospitalNameCell = new PdfPCell(p);
				hospitalNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
				hospitalNameCell.setBorder(Rectangle.NO_BORDER);
				HeaderTable1.addCell(hospitalNameCell);
				
				if(nabhLogoPrint.equalsIgnoreCase("on")) {
					if (imgNabh == null) {

						HeaderTable1.addCell(new Phrase("", header));
					} else {

							HeaderTable1.addCell(cellNabh);
					}
				}else {
					HeaderTable1.addCell(new Phrase("", header));
				}

				HeaderTable1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				HeaderTable1.addCell(new Phrase("", header));
				document.add(HeaderTable1);
				HeaderTable1.flushContent();
				
				
				PdfPTable HeaderTableSpace = new PdfPTable(1);
				int[] headerwidthSpace = {40 };
				HeaderTableSpace.setWidths(headerwidthSpace);
				HeaderTableSpace.setWidthPercentage(95f);
				HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTableSpace.setSpacingAfter(0.2f);
				
				HeaderTableSpace.addCell(new Phrase("", tabletext));
				//HeaderTableSpace.addCell(new Phrase("", tabletext));
				
	  			//document.add(HeaderTableSpace);
	  			//HeaderTableSpace.flushContent();
				
			
	  			
	  			PdfPTable HeaderTable11 = new PdfPTable(10);
	  			int[] headerwidth11 = { 40,10,40,10,40,10,40,10,40,10 };
	  			HeaderTable11.setWidths(headerwidth11);
	  			HeaderTable11.setWidthPercentage(10f);
	  	 		HeaderTable11.setHorizontalAlignment(Element.ALIGN_CENTER);
	  			HeaderTable11.getDefaultCell().setBorder(Rectangle.NO_BORDER);
	  	 		HeaderTable11.setWidthPercentage(100);
	  	 		

                PdfPTable patientDetailsHeaderTitle = new PdfPTable(1);
			int[] patientDetailsHeaderWidthTitle = { 20};
			patientDetailsHeaderTitle.setWidths(patientDetailsHeaderWidthTitle);
			patientDetailsHeaderTitle.setWidthPercentage(95f);
			patientDetailsHeaderTitle.getDefaultCell().setBorder(Rectangle.TOP);
			patientDetailsHeaderTitle.getDefaultCell().setHorizontalAlignment(Rectangle.ALIGN_CENTER);
			patientDetailsHeaderTitle.addCell(new Phrase("", tabletext));
			document.add(patientDetailsHeaderTitle);
			patientDetailsHeaderTitle.flushContent();
		
			  PdfPTable patientDetailsDate = new PdfPTable(6);
				int[] patientDetailsHeaderDate = { 10,10,10,10,15,23};
				patientDetailsDate.setWidths(patientDetailsHeaderDate);
				patientDetailsDate.setWidthPercentage(95f);
				patientDetailsDate.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				Date date = new Date();
		      //  SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm aa");
				  SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		        
		        String currentDate1= format.format(date);
		        System.out.println("currentDate===="+currentDate1);
				
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("LAB  REPORT", subheader));
				patientDetailsDate.addCell(new Phrase(" ", subheader));
				patientDetailsDate.addCell(new Phrase("  Printed Date: " +currentDate1, tabletext));
				
				document.add(patientDetailsDate);
				patientDetailsDate.flushContent();
			

	  	 		PdfPTable patientDetailsHeader = new PdfPTable(6);
				int[] patientDetailsHeaderWidth = { 32, 37, 29, 37, 28,38};
				patientDetailsHeader.setWidths(patientDetailsHeaderWidth);
				patientDetailsHeader.setWidthPercentage(95f);

				patientDetailsHeader.getDefaultCell().setBorder(Rectangle.BOTTOM);
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
		

				patientDetailsHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				patientDetailsHeader.addCell(new Phrase("", subheader));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", subheader));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
			

				patientDetailsHeader.addCell(new Phrase("Patient Id" , subheader));
				patientDetailsHeader.addCell(new Phrase(": "+ rtd.getPatientId(), tabletext));
				patientDetailsHeader.addCell(new Phrase("Patient Name ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getPatientName().replaceAll("  ", " "), tabletext));
				patientDetailsHeader.addCell(new Phrase("TreatmentId", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getTreatmentId(), tabletext));
				
				if(meesha.equalsIgnoreCase("on")) {
					patientDetailsHeader.addCell(new Phrase("Age/Gender ", subheader));
					patientDetailsHeader.addCell(new Phrase(": " + finalAge+"/"+rtd.getGender(), tabletext));
				}else {
					patientDetailsHeader.addCell(new Phrase("Age/DOB/Gender   ", subheader));
					patientDetailsHeader.addCell(new Phrase(": " + finalAge + "/" + dob + "/" + rtd.getGender(), tabletext));
				}
				patientDetailsHeader.addCell(new Phrase("Mobile No", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getMobile(), tabletext));
				  patientDetailsHeader.addCell(new Phrase("Ref. By  ", subheader));
				  patientDetailsHeader.addCell(new Phrase(": "+referDoctorName, tabletext));

				  patientDetailsHeader.addCell(new Phrase("Registered On", subheader));
					patientDetailsHeader.addCell(new Phrase(": " + regDate, tabletext));
				  if(meesha.equalsIgnoreCase("on")) {
						patientDetailsHeader.addCell(new Phrase("Collected On ", subheader));
						patientDetailsHeader.addCell(new Phrase(": " + sampleCollectDateTime, tabletext));
						
						}else {
							patientDetailsHeader.addCell(new Phrase("Collected On ", subheader));
							patientDetailsHeader.addCell(new Phrase(": " + serviceAssignedDateTime, tabletext));
							
						}
				  
				
				patientDetailsHeader.addCell(new Phrase("Reported On", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + postdate, tabletext));
				  
			
				patientDetailsHeader.addCell(new Phrase("Nationality  ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getNationality(), tabletext));
				String patType = "Self";
				if(rtd.getChargesMasterSlaveId() > 0)
					patType = "Sponsor";
				// added by Rohit on 10-08-2021 to set customer type on PDF print header
				patientDetailsHeader.addCell(new Phrase("Patient Type  ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + patType, tabletext));
				patientDetailsHeader.addCell(new Phrase("Sponsor Name  ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getCategoryName(), tabletext));
				
				//patientDetailsHeader.addCell(new Phrase("Sample UID No.  ", subheader));
				//patientDetailsHeader.addCell(new Phrase(": " + barcodenumber.trim(), tabletext));
				
				//patientDetailsHeader.addCell(new Phrase("UHID ", subheader));
				//patientDetailsHeader.addCell(new Phrase(": " + rtd.getCenterPatientId(), tabletext));
				if ((rtd.getIdentificationNo().trim()).equals("") || rtd.getProofId().equals("0")) {
					
					// patientDetailsHeader.addCell(new Phrase(" ", tabletext));
					  //patientDetailsHeader.addCell(new Phrase(" ", tabletext));
					
				} else {
					//patientDetailsHeader.addCell(new Phrase("Patient UID No.  ", subheader));
					//patientDetailsHeader.addCell(new Phrase(": " + rtd.getIdentificationNo() + " (" + idProof + ")", tabletext));
				
				}

				// added by Rohit on 10-08-2021 to set customer type on PDF print header
				
		                  Barcode128 code128 = new Barcode128();
				   		
				   		code128.setSize(7f);
				  		code128.setBarHeight(15);
				   		//Jitendra 15 March 2019
						code128.setBaseline(-1);
						code128.setGenerateChecksum(true);
						code128.setCodeType(Barcode128.CODE128);
						System.out.println("Barcode128.CODE128 "+Barcode128.CODE128);
		                    
						code128.setCode(Integer.toString(rtd.getPatientId()));
						
						PdfContentByte contentByte;
						contentByte = writer.getDirectContent();
						
						

				
				Barcode128 code129 = new Barcode128();

				PdfContentByte canvas = writer.getDirectContentUnder();

				/*
				 * Phrase watermark = new Phrase("JCG", new Font()); Image bg =
				 * Image.getInstance(path1); bg.scaleAbsolute(400, 300); float w =
				 * bg.getScaledWidth(); float h = bg.getScaledHeight(); PdfContentByte over;
				 * Rectangle pagesize; float x, y; int n = writer.getPageNumber();
				 * 
				 * pagesize = writer.getPageSize(); x = (pagesize.getLeft() +
				 * pagesize.getRight()) / 2; y = (pagesize.getTop() + pagesize.getBottom()) / 2;
				 * over = writer.getDirectContent(); over.saveState();
				 * 
				 * // set transparency PdfGState state = new PdfGState();
				 * state.setFillOpacity(0.2f); over.setGState(state);
				 * 
				 * // add watermark text and image over.addImage(bg, w, 0, 0, h, x - (w / 2), y
				 * - (h / 2)); over.restoreState();
				 */

				/*
				 * Barcode128 code128 = new Barcode128(); code128.setBaseline(5);
				 * code128.setGenerateChecksum(true); code128.setSize(2);
				 * code128.setBarHeight(5); code128.setCodeType(Barcode128.CODE128);
				 * code128.setSize(4); code128.setCode(barcodenumber);
				 */
				
				

				
			
				
				  
				  
				 /* patientDetailsHeader.addCell(new Phrase(" ", subheader));
				  patientDetailsHeader.addCell(new Phrase(" ", tabletext));
				patientDetailsHeader.addCell(new Phrase("", subheader));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				*/

				patientDetailsHeader.addCell(new Phrase("", subheader));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", subheader));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				
				
				
				/*
				 * patientDetailsHeader.addCell(new Phrase(" ", subheader));
				 * patientDetailsHeader.addCell(new Phrase(" ", tabletext));
				 * patientDetailsHeader.addCell(new Phrase(" ", subheader));
				 * patientDetailsHeader.addCell(new Phrase(" ", tabletext));
				 */
				// patientDetailsHeader.addCell(code128.createImageWithBarcode(canvas, null,
				// null));

				/*
				 * patientDetailsHeader.addCell(new Phrase("Nationality  ", subheader));
				 * patientDetailsHeader.addCell(new Phrase(": "+country, tabletext));
				 * patientDetailsHeader.addCell(new Phrase(" ", subheader));
				 * patientDetailsHeader.addCell(new Phrase(" ", tabletext));
				 * 
				 * if((rtd.getIdentificationNo().trim()).equals("") ||
				 * rtd.getProofId().equals("0")) { patientDetailsHeader.addCell(new
				 * Phrase("Id No.  ", subheader)); patientDetailsHeader.addCell(new
				 * Phrase(": "+"-", tabletext)); }else { patientDetailsHeader.addCell(new
				 * Phrase("Id No.  ", subheader)); patientDetailsHeader.addCell(new
				 * Phrase(": "+rtd.getIdentificationNo()+"("+idProof+")", tabletext)); }
				 * patientDetailsHeader.addCell(new Phrase(" ", subheader));
				 * patientDetailsHeader.addCell(new Phrase(" ", tabletext));
				 */

				patientDetailsHeader.getDefaultCell().setBorder(Rectangle.TOP);
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
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
	public void onChapter(PdfWriter arg0, Document arg1, float arg2, Paragraph arg3) {
		// TODO Auto-generated method stub
	}

	@Override
	public void onChapterEnd(PdfWriter arg0, Document arg1, float arg2) {
		// TODO Auto-generated method stub
	}

	@Override
	public void onOpenDocument(PdfWriter pdfWriter, Document document) {
		PageEventHandlerBean eventObj = new PageEventHandlerBean();
		HttpServletRequest request = eventObj.getRequest();
		String covide = (String) request.getAttribute("covide");
		if (covide.equalsIgnoreCase("Yes")) {

		} else {
			total = pdfWriter.getDirectContent().createTemplate(35, 28);
		}

		// font = new Font(BaseFont.createFont(Font, BaseFont.IDENTITY_H,
		// BaseFont.EMBEDDED), 10);
	}

	@Override
	public void onEndPage(PdfWriter pdfWriter, Document document) {

		PageEventHandlerBean eventObj = new PageEventHandlerBean();
		HttpServletRequest request = eventObj.getRequest();
		// HttpSession session1 = request.getSession();
		String covide = (String) request.getAttribute("covide");
		Integer postId = (Integer) request.getAttribute("postId");
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String hospitalName = (String) resourceBundleEhat.getString("hospitalName");
		String meeshaFlow = (String) resourceBundleEhat.getString("meesha");
		if (covide.equalsIgnoreCase("Yes")) {

		} else {

			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
			HospitalDetails hospObj = arrHospitalDetails.get(0);

			//PatientModel patModel = new PatientModel();
			System.err.println("postId..." + postId);
			if (postId == null) {
				postId = 1;
			}
		//	Users userDetails = patModel.getUserDetailsById(postId);
			UsersService uss = (ApplicationContextUtils.getApplicationContext()).getBean(UsersService.class);
			
			Users userDetails=uss.getUsersByUserIdForLISPrint(postId);

			String signOneDocName = "";
			String signOneImageName = "";
			String signTwoDocName = "";
			String signTwoImageName = "";
			String signThreeDocName = "";
			String signThreeImageName = "";
			String signTechImageName = "";
			
			if(userDetails.getUsersList().size() > 0) {
				signOneDocName = userDetails.getUsersList().get(0). getSign_one_doctor();
				signOneImageName = userDetails.getUsersList().get(0).getSign_one();
				signTwoDocName = userDetails.getUsersList().get(0).getSign_one_doctor();
				signTwoImageName = "";
				signThreeDocName = userDetails.getUsersList().get(0).getSign_two_doctor();
				signThreeImageName = userDetails.getUsersList().get(0).getSign_two();
				
				signTechImageName = userDetails.getUsersList().get(0).getSign_one();
			}
			

			/*if (hospitalName.equalsIgnoreCase("Nariman")) {

				signOneDocName = userDetails.getSignOneDoctor();
				signOneImageName = userDetails.getSignOne();
				signTwoDocName = userDetails.getSignOneDoctor();
				signTwoImageName = "";
				signThreeDocName = userDetails.getSignTwoDoctor();
				signThreeImageName = userDetails.getSignTwo();
			} else {

				signOneDocName = hospObj.getSignOneDocName();
				signOneImageName = hospObj.getSignOneImageName();
				signTwoDocName = hospObj.getSignOneDocName();
				signTwoImageName = "";
				signThreeDocName = hospObj.getSignTwoDocName();
				signThreeImageName = hospObj.getSignTwoImageName();
			}*/

			Font tabletext = new Font(Font.HELVETICA, 8, Font.BOLD);
//			Font tabletextSign = new Font(Font.HELVETICA, 8, Font.NORMAL);
			Font tabletextSign = new Font(Font.HELVETICA, 8, Font.BOLD);
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
				
				// added for technician signature
				String path4 = "";
				Image imageTechSign = null;
				PdfPCell cellTechSign = null;
				
				// end technician

				PdfPTable Headertable2 = new PdfPTable(5);
				int[] HeaderWidth2 = { 20, 20, 20, 20, 20 };
				Headertable2.setWidths(HeaderWidth2);
				Headertable2.setWidthPercentage(95f);
				Headertable2.setTotalWidth(527);
				Headertable2.setLockedWidth(true);
				Headertable2.getDefaultCell().setFixedHeight(50);
				Headertable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);

				if (signOneImageName.equalsIgnoreCase(null) || signOneImageName.equalsIgnoreCase("")
						|| signTwoImageName.equalsIgnoreCase(null) || signTwoImageName.equalsIgnoreCase("")
						|| signThreeImageName.equalsIgnoreCase(null) || signThreeImageName.equalsIgnoreCase(""))

				{
					if (signOneImageName.equalsIgnoreCase(null) || signOneImageName.equalsIgnoreCase("")
							|| signThreeImageName.equalsIgnoreCase(null) || signThreeImageName.equalsIgnoreCase("")) {
						
						if (signTwoImageName.equalsIgnoreCase(null) || signTwoImageName.equalsIgnoreCase("") ||
							signOneImageName.equalsIgnoreCase(null) || signOneImageName.equalsIgnoreCase("")) {
							// Set 1st & 3nd sign on left & right bottom

							try {
								
								String pathToWeb3 = FilePath.getBasePath();
								path3 = pathToWeb3 + signThreeImageName; // "Dr.Amita Neelakantan.jpg";
								imageThreeSign = Image.getInstance(path3);
								imageThreeSign.scaleAbsolute(90, 50);
								cellThreeSign = new PdfPCell();
								cellThreeSign.addElement(new Chunk(imageThreeSign, 5, -5));
								cellThreeSign.setBorder(Rectangle.NO_BORDER);
								cellThreeSign.setHorizontalAlignment(Element.ALIGN_CENTER);

								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(cellThreeSign);

								PdfPCell cells30 = new PdfPCell(
										new Phrase(signOneDocName.replaceAll("@", "\n"), tabletextSign));
								cells30.setHorizontalAlignment(Element.ALIGN_CENTER);
								cells30.setBorder(Rectangle.NO_BORDER);
								
								Headertable2.addCell(cells30);
								
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));

								PdfPCell cells33 = new PdfPCell(
										new Phrase(signThreeDocName.replaceAll("@", "\n"), tabletextSign));
								cells33.setHorizontalAlignment(Element.ALIGN_CENTER);
								cells33.setBorder(Rectangle.NO_BORDER);
								
								Headertable2.addCell(cells33);
								
							} catch (Exception e) {
								e.printStackTrace();
							}

						} else {
							// Set Third sign on right bottom

							/*try {
								String pathToWeb1 = FilePath.getBasePath();
								path1 = pathToWeb1 + signThreeImageName; // "Dr.Amita Neelakantan.jpg";
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
								PdfPCell cells33 = new PdfPCell(
										new Phrase(signThreeDocName.replaceAll("@", "\n"), tabletextSign));
								cells33.setHorizontalAlignment(Element.ALIGN_CENTER);
								cells33.setBorder(Rectangle.NO_BORDER);
								Headertable2.addCell(cells33);
							} catch (Exception e) {
								e.printStackTrace();
							}*/
						
						

							// Set 1st & 3nd sign on left & right bottom

							try {
								
								String pathToWeb3 = FilePath.getBasePath();
								path3 = pathToWeb3 + signThreeImageName; // "Dr.Amita Neelakantan.jpg";
								imageThreeSign = Image.getInstance(path3);
								imageThreeSign.scaleAbsolute(90, 50);
								cellThreeSign = new PdfPCell();
								cellThreeSign.addElement(new Chunk(imageThreeSign, 5, -5));
								cellThreeSign.setBorder(Rectangle.NO_BORDER);
								cellThreeSign.setHorizontalAlignment(Element.ALIGN_CENTER);

								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(cellThreeSign);

								PdfPCell cells30 = new PdfPCell(
										new Phrase(signOneDocName.replaceAll("@", "\n"), tabletextSign));
								cells30.setHorizontalAlignment(Element.ALIGN_CENTER);
								cells30.setBorder(Rectangle.NO_BORDER);
								
								Headertable2.addCell(cells30);
								
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));
								Headertable2.addCell(new Phrase(" ", tabletextSign));

								PdfPCell cells33 = new PdfPCell(
										new Phrase(signThreeDocName.replaceAll("@", "\n"), tabletextSign));
								cells33.setHorizontalAlignment(Element.ALIGN_CENTER);
								cells33.setBorder(Rectangle.NO_BORDER);
								
								Headertable2.addCell(cells33);
								
							} catch (Exception e) {
								e.printStackTrace();
							}

						
							
							
						}

					} else {
						// Set 1st & 3nd sign on left & right bottom
						/*
						 * String pathToWeb1 = FilePath.getBasePath(); path1 = pathToWeb1 +
						 * signOneImageName; // "Dr.Amita Neelakantan.jpg"; imageOneSign =
						 * Image.getInstance(path1); imageOneSign.scaleAbsolute(90, 50); cellOneSign =
						 * new PdfPCell(); cellOneSign.addElement(new Chunk(imageOneSign, 5, -5));
						 * cellOneSign.setBorder(Rectangle.NO_BORDER);
						 */
                       /*
						try {
							

							String pathToWeb3 = FilePath.getBasePath();
							path3 = pathToWeb3 + signThreeImageName; // "Dr.Amita Neelakantan.jpg";
							imageThreeSign = Image.getInstance(path3);
							imageThreeSign.scaleAbsolute(90, 50);
							cellThreeSign = new PdfPCell();
							cellThreeSign.addElement(new Chunk(imageThreeSign, 5, -5));
							cellThreeSign.setBorder(Rectangle.NO_BORDER);
							cellThreeSign.setHorizontalAlignment(Element.ALIGN_CENTER);

							Headertable2.addCell(cellThreeSign);
							Headertable2.addCell(new Phrase(" ", tabletextSign));
							Headertable2.addCell(new Phrase(" ", tabletextSign));
							Headertable2.addCell(new Phrase(" ", tabletextSign));
							Headertable2.addCell(cellThreeSign);

							PdfPCell cells30 = new PdfPCell(
									new Phrase(signOneDocName.replaceAll("@", "\n"), tabletextSign));
							cells30.setHorizontalAlignment(Element.ALIGN_CENTER);
							cells30.setBorder(Rectangle.NO_BORDER);
							Headertable2.addCell(cells30);

							Headertable2.addCell(new Phrase(" ", tabletextSign));
							Headertable2.addCell(new Phrase(" ", tabletextSign));
							Headertable2.addCell(new Phrase(" ", tabletextSign));

							PdfPCell cells33 = new PdfPCell(
									new Phrase(signThreeDocName.replaceAll("@", "\n"), tabletextSign));
							cells33.setHorizontalAlignment(Element.ALIGN_CENTER);
							cells33.setBorder(Rectangle.NO_BORDER);
							Headertable2.addCell(cells33);
						} catch (Exception e) {
							e.printStackTrace();
						}
                      */
						
						// Set 1st & 3nd sign on left & right bottom

						try {
							
							String pathToWeb3 = FilePath.getBasePath();
							path3 = pathToWeb3 + signThreeImageName; // "Dr.Amita Neelakantan.jpg";
							imageThreeSign = Image.getInstance(path3);
							imageThreeSign.scaleAbsolute(90, 50);
							cellThreeSign = new PdfPCell();
							cellThreeSign.addElement(new Chunk(imageThreeSign, 5, -5));
							cellThreeSign.setBorder(Rectangle.NO_BORDER);
							cellThreeSign.setHorizontalAlignment(Element.ALIGN_CENTER);
							
							
							String pathToWeb4 = FilePath.getBasePath();
							path4 = pathToWeb4 + signTechImageName; // "Dr.Amita Neelakantan.jpg";
							imageTechSign = Image.getInstance(path4);
							imageTechSign.scaleAbsolute(90, 50);
							cellTechSign= new PdfPCell();
							cellTechSign.addElement(new Chunk(imageTechSign, 5, -5));
							cellTechSign.setBorder(Rectangle.NO_BORDER);
							cellTechSign.setHorizontalAlignment(Element.ALIGN_CENTER);

							//Headertable2.addCell(new Phrase(" ", tabletextSign));
						//	Headertable2.addCell(new Phrase(" ", tabletextSign));
							//Headertable2.addCell(new Phrase(" ", tabletextSign));
						//	Headertable2.addCell(new Phrase(" ", tabletextSign));
						//	Headertable2.addCell(cellTechSign);
							
							Headertable2.addCell(cellTechSign);
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

							PdfPCell cells33 = new PdfPCell(
									new Phrase(signThreeDocName.replaceAll("@", "\n"), tabletextSign));
							cells33.setHorizontalAlignment(Element.ALIGN_CENTER);
							cells33.setBorder(Rectangle.NO_BORDER);
							
							Headertable2.addCell(cells33);
							
						} catch (Exception e) {
							e.printStackTrace();
						}

					}

				} else {
					// Set 1st, 2nd & 3nd sign on left,Center & right bottom

					try {

						String pathToWeb1 = FilePath.getBasePath();
						path1 = pathToWeb1 + signOneImageName; // "Dr.Amita Neelakantan.jpg";
						imageOneSign = Image.getInstance(path1);
						imageOneSign.scaleAbsolute(90, 50);
						cellOneSign = new PdfPCell();
						cellOneSign.addElement(new Chunk(imageOneSign, 5, -5));
						cellOneSign.setBorder(Rectangle.NO_BORDER);

						String pathToWeb2 = FilePath.getBasePath();
						path2 = pathToWeb2 + signTwoImageName; // "Dr.Amita Neelakantan.jpg";
						imageTwoSign = Image.getInstance(path2);
						imageTwoSign.scaleAbsolute(90, 50);
						cellTwoSign = new PdfPCell();
						cellTwoSign.addElement(new Chunk(imageTwoSign, 5, -5));
						cellTwoSign.setBorder(Rectangle.NO_BORDER);

						String pathToWeb3 = FilePath.getBasePath();
						path3 = pathToWeb3 + signThreeImageName; // "Dr.Amita Neelakantan.jpg";
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

						PdfPCell cells30 = new PdfPCell(
								new Phrase(signOneDocName.replaceAll("@", "\n"), tabletextSign));
						cells30.setHorizontalAlignment(Element.ALIGN_CENTER);
						cells30.setBorder(Rectangle.NO_BORDER);
						Headertable2.addCell(cells30);

						Headertable2.addCell(new Phrase(" ", tabletextSign));

						PdfPCell cells31 = new PdfPCell(
								new Phrase(signTwoDocName.replaceAll("@", "\n"), tabletextSign));
						cells31.setHorizontalAlignment(Element.ALIGN_CENTER);
						cells31.setBorder(Rectangle.NO_BORDER);
						Headertable2.addCell(cells31);

						Headertable2.addCell(new Phrase(" ", tabletextSign));

						PdfPCell cells33 = new PdfPCell(
								new Phrase(signThreeDocName.replaceAll("@", "\n"), tabletextSign));
						cells33.setHorizontalAlignment(Element.ALIGN_CENTER);
						cells33.setBorder(Rectangle.NO_BORDER);
						Headertable2.addCell(cells33);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}

				String headerFlag = (String) request.getAttribute("headerFlag");
				if (headerFlag.equalsIgnoreCase("No")) {
					// set page total number
                 /*
					table.setWidths(new int[] { 80, 18, 2 });
					table.setTotalWidth(527);
					table.setLockedWidth(true);
					table.getDefaultCell().setFixedHeight(20);
					//table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
					table.getDefaultCell().setBorder(Rectangle.TOP);

					table.addCell(new Phrase(strHeader, tabletext));

					table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
					table.addCell(new Phrase(String.format("\nPage %d of ", pdfWriter.getPageNumber()), tabletext));

					PdfPCell cell = new PdfPCell(Image.getInstance(total));
					cell.setBorder(Rectangle.NO_BORDER);
					cell.setBorderColor(Color.BLACK);
					table.addCell(cell);

					table.setTotalWidth(document.right(document.rightMargin()) - document.left(document.leftMargin()));
					table.writeSelectedRows(0, -1, document.left(document.leftMargin()), 29,
							pdfWriter.getDirectContent());
					Headertable2.setTotalWidth(
							document.right(document.rightMargin()) - document.left(document.leftMargin()));
					Headertable2.writeSelectedRows(0, -1, document.left(document.leftMargin()), 168,
							pdfWriter.getDirectContent());
					*/
					
					String footerAddress = (String) request.getAttribute("footerAddress");
					table.setWidths(new int[] { 80, 18, 2 });
					table.setTotalWidth(527);
					table.setLockedWidth(true);
					table.getDefaultCell().setFixedHeight(20);
					table.getDefaultCell().setBorder(Rectangle.TOP);

					// table.addCell(new Phrase(strHeader, tabletext));
					// below line removed by Rohit to get full footer address on 12-08-2021
					// strHeader=footerAddress.replaceAll("@", "\n");
					table.addCell(new Phrase(footerAddress, tabletext));

					table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
					table.addCell(new Phrase(String.format("\nPage %d of ", pdfWriter.getPageNumber()), tabletext));

					PdfPCell cell = new PdfPCell(Image.getInstance(total));
					cell.setBorder(Rectangle.TOP);
					cell.setBorderColor(Color.BLACK);
					table.addCell(cell);

					
					// PdfContentByte canvas = pdfWriter.getDirectContent();
					// canvas.beginMarkedContentSequence(PdfName.BASEFONT);

					//table.writeSelectedRows(0, -1, document.left(document.leftMargin()), 20,
						//	pdfWriter.getDirectContent());
					
					if(meeshaFlow.equalsIgnoreCase("on")) {
						Headertable2.writeSelectedRows(0, -1, document.left(document.leftMargin()), 120,pdfWriter.getDirectContent());
					}else {
						Headertable2.writeSelectedRows(0, -1, document.left(document.leftMargin()), 180,pdfWriter.getDirectContent());
					}
					
					
					

				} else {

					// set page total number
					String footerAddress = (String) request.getAttribute("footerAddress");
					table.setWidths(new int[] { 80, 18, 2 });
					table.setTotalWidth(527);
					table.setLockedWidth(true);
					table.getDefaultCell().setFixedHeight(20);
					table.getDefaultCell().setBorder(Rectangle.TOP);

					// table.addCell(new Phrase(strHeader, tabletext));
					// below line removed by Rohit to get full footer address on 12-08-2021
					// strHeader=footerAddress.replaceAll("@", "\n");
					table.addCell(new Phrase(footerAddress, tabletext));

					table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
					table.addCell(new Phrase(String.format("\nPage %d of ", pdfWriter.getPageNumber()), tabletext));

					PdfPCell cell = new PdfPCell(Image.getInstance(total));
					cell.setBorder(Rectangle.TOP);
					cell.setBorderColor(Color.BLACK);
					table.addCell(cell);

					// PdfContentByte canvas = pdfWriter.getDirectContent();
					// canvas.beginMarkedContentSequence(PdfName.BASEFONT);
                    if(meeshaFlow.equalsIgnoreCase("on")) {
					//table.writeSelectedRows(0, -1, document.left(document.leftMargin()), 50,
						///	pdfWriter.getDirectContent());
                    	Headertable2.writeSelectedRows(0, -1, document.left(document.leftMargin()), 80,pdfWriter.getDirectContent());
                    }else {
					Headertable2.writeSelectedRows(0, -1, document.left(document.leftMargin()), 180,	pdfWriter.getDirectContent());
                    }
					// table.writeSelectedRows(0, -1, 44, 50, pdfWriter.getDirectContent());

					// canvas.endMarkedContentSequence();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public void onCloseDocument(PdfWriter writer, Document document) {
		PageEventHandlerBean eventObj = new PageEventHandlerBean();
		HttpServletRequest request = eventObj.getRequest();
		String covide = (String) request.getAttribute("covide");
		if (covide.equalsIgnoreCase("Yes")) {

		} else {
			Font tabletext = new Font(Font.HELVETICA, 8, Font.BOLD);
			ColumnText.showTextAligned(total, Element.ALIGN_LEFT,
					new Phrase("" + String.valueOf(writer.getPageNumber() - 1), tabletext), 2, 10, 0);
		}

	}

	@Override
	public void onGenericTag(PdfWriter arg0, Document arg1, Rectangle arg2, String arg3) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onParagraph(PdfWriter arg0, Document arg1, float arg2) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onParagraphEnd(PdfWriter arg0, Document arg1, float arg2) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onSection(PdfWriter arg0, Document arg1, float arg2, int arg3, Paragraph arg4) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onSectionEnd(PdfWriter arg0, Document arg1, float arg2) {
		// TODO Auto-generated method stub

	}
}