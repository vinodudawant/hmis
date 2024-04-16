package com.hms;

import java.awt.Color;
import java.text.SimpleDateFormat;
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
import com.hms.opdbill.controller.OpdBillController;
import com.hms.opdbill.dto.PatientHeaderInfoDto;
import com.hms.pharmacy.upload.FilePath;
import com.hms.users.service.UsersService;
import com.hms.utility.ApplicationContextUtils;
import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.ColumnText;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfPageEvent;
import com.lowagie.text.pdf.PdfPageEventHelper;
import com.lowagie.text.pdf.PdfTemplate;
import com.lowagie.text.pdf.PdfWriter;

public class TempEventHandlerPalvePDF extends PdfPageEventHelper implements PdfPageEvent {


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
		Font headerTitle = new Font(Font.HELVETICA, 9, Font.BOLD);
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
			String trId = request.getParameter("treatmentId");
			String headerFlag = (String) request.getAttribute("headerFlag");
			String printTitle = (String) request.getAttribute("printTitle");
			int treatmentId = Integer.parseInt(trId);
			
			SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy hh:mm aa");
			
			PatientHeaderInfoDto objPat = new PatientHeaderInfoDto();
			objPat.setTreatmentId(treatmentId);
			OpdBillController uss = (ApplicationContextUtils.getApplicationContext()).getBean(OpdBillController.class);
			PatientHeaderInfoDto rtd = uss.getPatientInfoByTreatmentId(objPat).getListRegTreBillDto().get(0);
			
			String age     = rtd.getAge();
			String dob     = rtd.getDob();
			String regDate = format.format(rtd.getCreatedDateTime());
			
			String[] ageArray = age.split("/");
			String finalAge = ageArray[0];
			if (ageArray[0].equalsIgnoreCase("0Y")) {
				finalAge = ageArray[1];
			}
			if (ageArray[0].equalsIgnoreCase("0Y") && ageArray[1].equalsIgnoreCase("0M")) {
				finalAge = ageArray[2];
			}

			if ((dob.trim()).equalsIgnoreCase("")) {
				dob = "-";
			} else {
				dob = dob.replaceAll("/", "-");
				String[] dobChane1 = dob.split("-");
			//	dob = dobChane1[0] + "-" + dobChane1[1] + "-" + dobChane1[2];

				dob = dobChane1[1] + "-" + dobChane1[0] + "-" + dobChane1[2];
			}
			
			String referDoctorName=rtd.getReferDoctorName();
			
			String patType = "Self";
			if(rtd.getChargesMasterSlaveId() > 0)
				patType = "Sponsor";

			if (headerFlag.equalsIgnoreCase("No")) {
				
				//=========================Print Heading start ===========================//
				
				PdfPTable HeaderTableSpace = new PdfPTable(1);
				int[] headerwidthSpace = {40 };
				HeaderTableSpace.setWidths(headerwidthSpace);
				HeaderTableSpace.setWidthPercentage(95f);
				HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTableSpace.setSpacingAfter(3.0f);
				
				
				PdfPTable patientDetailsDate = new PdfPTable(6);
				int[] patientDetailsHeaderDate = { 10,10,10,25,10,25};
				patientDetailsDate.setWidths(patientDetailsHeaderDate);
				patientDetailsDate.setWidthPercentage(95f);
				patientDetailsDate.setSpacingBefore(62.0f);
				patientDetailsDate.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				Date date = new Date();
				String currentDate1= format.format(date);
				
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", subheader));
				patientDetailsDate.addCell(new Phrase("", subheader));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				
				document.add(patientDetailsDate);
				patientDetailsDate.flushContent();
				
				patientDetailsDate.getDefaultCell().setBorder(Rectangle.BOTTOM);
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", subheader));
				patientDetailsDate.addCell(new Phrase("", subheader));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				
				patientDetailsDate.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase(printTitle, headerTitle));
				patientDetailsDate.addCell(new Phrase(" ", subheader));
				patientDetailsDate.addCell(new Phrase("  Printed Date: " +currentDate1, tabletext));				
				
				patientDetailsDate.getDefaultCell().setBorder(Rectangle.BOTTOM);
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", subheader));
				patientDetailsDate.addCell(new Phrase("", subheader));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				
				document.add(patientDetailsDate);
				patientDetailsDate.flushContent();
				//=========================Print Heading end ===========================//
				
				//=========================Patient header info start ===================//
			
	  	 		PdfPTable patientDetailsHeader = new PdfPTable(4);
				int[] patientDetailsHeaderWidth = {15,40,15,40};
				patientDetailsHeader.setWidths(patientDetailsHeaderWidth);
				patientDetailsHeader.setWidthPercentage(95f);
				
				patientDetailsHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				patientDetailsHeader.addCell(new Phrase("", subheader));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", subheader));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				
				patientDetailsHeader.addCell(new Phrase("UHID" , subheader));
				patientDetailsHeader.addCell(new Phrase(": "+ rtd.getCenterPatientId(), tabletext));
				patientDetailsHeader.addCell(new Phrase("Patient Name ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getPatientName().replaceAll("  ", " "), tabletext));
				
				patientDetailsHeader.addCell(new Phrase("Visit Date", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + regDate, tabletext));			      
				patientDetailsHeader.addCell(new Phrase("Gender ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getGender(), tabletext));
				
				patientDetailsHeader.addCell(new Phrase("DOB", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + dob, tabletext));
				patientDetailsHeader.addCell(new Phrase("Age", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + finalAge, tabletext));
								
				patientDetailsHeader.addCell(new Phrase("Height", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getHeight(), tabletext));
				patientDetailsHeader.addCell(new Phrase("Weight  ", subheader));
				patientDetailsHeader.addCell(new Phrase(": "+rtd.getWeight(), tabletext));
				  
				patientDetailsHeader.addCell(new Phrase("Mobile No", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getMobile(), tabletext));
				patientDetailsHeader.addCell(new Phrase("Patient Type  ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + patType, tabletext));
				 
				patientDetailsHeader.addCell(new Phrase("Ref. By  ", subheader));
				patientDetailsHeader.addCell(new Phrase(": "+referDoctorName, tabletext));
				patientDetailsHeader.addCell(new Phrase("Consultant Doc.", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getConsultingDocName(), tabletext));
					
				patientDetailsHeader.addCell(new Phrase("Sponsor Name  ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getCategoryName(), tabletext));
				patientDetailsHeader.addCell(new Phrase("", subheader));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
					
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				
				patientDetailsHeader.getDefaultCell().setBorder(Rectangle.BOTTOM);
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));

				document.add(patientDetailsHeader);
				patientDetailsHeader.flushContent();
				
				HeaderTableSpace.addCell(new Phrase("", tabletext));
				document.add(HeaderTableSpace);
				HeaderTableSpace.flushContent();
				
				
				//=========================Patient header info end ===================//
				
			} else {
				
				ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
				String ShradhhaFlag = (String) resourceBundle.getObject("ShradhhaFlag").toString();
				String nabhLogoPrint = (String) resourceBundle.getObject("nabhLogoPrint").toString();

				//========================= Hospital Information start =====================//	
				
				HttpSession session1 = request.getSession();
				int hospitalUnitId= (Integer) session1.getAttribute("uId");
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
				String nabhLogo = context.getRealPath(nabh);
				String path1 = context.getRealPath(path);
				
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
				
				Image img = null;
				PdfPCell cell = null;
				try {
					img = Image.getInstance(path1);
					img.scaleAbsolute(100, 70);
					cell = new PdfPCell();
					cell.addElement(new Chunk(img, 1, -40));
					cell.setBorder(Rectangle.NO_BORDER);
				} catch (Exception e) {
					
					e.printStackTrace();
				} 
				
				Image imgNabh = null;
				PdfPCell cellNabh = null;
				try {
					imgNabh = Image.getInstance(nabhLogo);
					if(ShradhhaFlag.equalsIgnoreCase("ON"))
					{
					imgNabh.scaleAbsolute(130, 50);
					cellNabh = new PdfPCell();
					cellNabh.addElement(new Chunk(imgNabh, 1, -40));
					}else
					{
						imgNabh.scaleAbsolute(80, 60);
						cellNabh = new PdfPCell();
						cellNabh.addElement(new Chunk(imgNabh, 5, -45));
					}
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
				Font bold = new Font(Font.TIMES_ROMAN, 12, Font.BOLD);	
				Phrase p = new Phrase();
				p.add(new Chunk("" + hospitalName, bold));
				p.add(new Chunk("\n\n" + "\t" + address, tabletext));
				p.add(new Chunk(" " + city + " Pin - " + hospitalZip + "\n", tabletext));
				p.add(new Chunk("Phone No. " + hPhoneNo, tabletext));
				p.add(new Chunk("\n" + webste + "\n" + "email: " + email, tabletext));

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
				//========================= Hospital Information End =====================//				
				
				//=========================Print Heading start ===========================//
				PdfPTable HeaderTableSpace = new PdfPTable(1);
				int[] headerwidthSpace = {40 };
				HeaderTableSpace.setWidths(headerwidthSpace);
				HeaderTableSpace.setWidthPercentage(95f);
				HeaderTableSpace.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				HeaderTableSpace.setSpacingAfter(3.0f);
				
				PdfPTable patientDetailsDate = new PdfPTable(6);
				int[] patientDetailsHeaderDate = { 10,10,10,25,12,25};
				patientDetailsDate.setWidths(patientDetailsHeaderDate);
				patientDetailsDate.setWidthPercentage(95f);
				patientDetailsDate.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				
				Date date = new Date();
				String currentDate1= format.format(date);
				
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", subheader));
				patientDetailsDate.addCell(new Phrase("", subheader));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				
				patientDetailsDate.getDefaultCell().setBorder(Rectangle.BOTTOM);
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", subheader));
				patientDetailsDate.addCell(new Phrase("", subheader));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				
				patientDetailsDate.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase(printTitle, headerTitle));
				patientDetailsDate.addCell(new Phrase(" ", subheader));
				patientDetailsDate.addCell(new Phrase("  Printed Date: " +currentDate1, tabletext));				
				
				patientDetailsDate.getDefaultCell().setBorder(Rectangle.BOTTOM);
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				patientDetailsDate.addCell(new Phrase("", subheader));
				patientDetailsDate.addCell(new Phrase("", subheader));
				patientDetailsDate.addCell(new Phrase("", tabletext));
				
				
				document.add(patientDetailsDate);
				patientDetailsDate.flushContent();
				//=========================Print Heading end ===========================//
				
				//=========================Patient header info start ===================//
				
	  	 		PdfPTable patientDetailsHeader = new PdfPTable(4);
				int[] patientDetailsHeaderWidth = {15,40,15,40};
				patientDetailsHeader.setWidths(patientDetailsHeaderWidth);
				patientDetailsHeader.setWidthPercentage(95f);
							
				patientDetailsHeader.getDefaultCell().setBorder(Rectangle.NO_BORDER);
				patientDetailsHeader.addCell(new Phrase("UHID" , subheader));
				patientDetailsHeader.addCell(new Phrase(": "+ rtd.getCenterPatientId(), tabletext));
				patientDetailsHeader.addCell(new Phrase("Patient Name ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getPatientName().replaceAll("  ", " "), tabletext));
				
				patientDetailsHeader.addCell(new Phrase("Visit Date", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + regDate, tabletext));			      
				patientDetailsHeader.addCell(new Phrase("Gender ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getGender(), tabletext));
				
				patientDetailsHeader.addCell(new Phrase("DOB", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + dob, tabletext));
				patientDetailsHeader.addCell(new Phrase("Age", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + finalAge, tabletext));
								
				patientDetailsHeader.addCell(new Phrase("Height", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getHeight(), tabletext));
				patientDetailsHeader.addCell(new Phrase("Weight  ", subheader));
				patientDetailsHeader.addCell(new Phrase(": "+rtd.getWeight(), tabletext));
				  
				patientDetailsHeader.addCell(new Phrase("Mobile No", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getMobile(), tabletext));
				patientDetailsHeader.addCell(new Phrase("Patient Type  ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + patType, tabletext));
				 
				patientDetailsHeader.addCell(new Phrase("Ref. By  ", subheader));
				patientDetailsHeader.addCell(new Phrase(": "+referDoctorName, tabletext));
				patientDetailsHeader.addCell(new Phrase("Consultant Doc.", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getConsultingDocName(), tabletext));
					
				patientDetailsHeader.addCell(new Phrase("Sponsor Name  ", subheader));
				patientDetailsHeader.addCell(new Phrase(": " + rtd.getCategoryName(), tabletext));
				patientDetailsHeader.addCell(new Phrase("", subheader));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
					
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				
				patientDetailsHeader.getDefaultCell().setBorder(Rectangle.BOTTOM);
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));
				patientDetailsHeader.addCell(new Phrase("", tabletext));

				document.add(patientDetailsHeader);
				patientDetailsHeader.flushContent();
				
				HeaderTableSpace.addCell(new Phrase("", tabletext));
				document.add(HeaderTableSpace);
				HeaderTableSpace.flushContent();
				//=========================Patient header info end ===================//
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
		//Integer postId = (Integer) request.getAttribute("userId1");
		HttpSession session = request.getSession();
		Integer postId = (Integer) session.getAttribute("userId1");
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String hospitalName = (String) resourceBundleEhat.getString("hospitalName");
		String meeshaFlow = (String) resourceBundleEhat.getString("meesha");
		if (covide.equalsIgnoreCase("Yes")) {

		} else {

			HttpSession session1 = request.getSession();
			int hospitalUnitId= (Integer) session1.getAttribute("uId");
			HospitalDetailAdminService hs = (ApplicationContextUtils.getApplicationContext()).getBean(HospitalDetailAdminService.class);
			//List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetails().getListHospitalDetails();
		    List<HospitalDetails> arrHospitalDetails = hs.getListHospitalDetailsNew(hospitalUnitId).getListHospitalDetails();
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
			//	signOneDocName = userDetails.getUsersList().get(0). getSign_one_doctor();
				//signOneImageName = userDetails.getUsersList().get(0).getSign_one();
				//signTwoDocName = userDetails.getUsersList().get(0).getSign_one_doctor();
				signTwoImageName = "";
				signThreeDocName = userDetails.getUsersList().get(0).getSign_two_doctor();
				signThreeImageName = userDetails.getUsersList().get(0).getSign_two();
				
				//signTechImageName = userDetails.getUsersList().get(0).getSign_one();
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

					//table.writeSelectedRows(0, -1, document.left(document.leftMargin()), 20,
						//	pdfWriter.getDirectContent());
					Headertable2.writeSelectedRows(0, -1, document.left(document.leftMargin()), 120,
							pdfWriter.getDirectContent());
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
