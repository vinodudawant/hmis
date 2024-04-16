package com.hms.organdonation.controller;

import java.awt.image.BufferedImage;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorCheckupListDto;
import com.hms.organdonation.dto.OrganDonorConsentFormDto;
import com.hms.organdonation.dto.OrganDonorTreatmentDto;
import com.hms.organdonation.service.OrganDonorConsentFormService;
import com.hms.pharmacy.upload.FilePath;

@Controller
@RequestMapping(value = "/organDonorConsentForm")
public class OrganDonorConsentFormController {

	static Logger log = Logger.getLogger(OrganDonorConsentFormController.class
			.getName());

	@Autowired
	private OrganDonorConsentFormService organDonorConsentFormService;

	@Autowired
	private OrganDonorConsentFormDto organDonorConsentFormDto;
	
	@Autowired
	OrganDonationRegistrationDto organDonationRegistrationDto;

	@RequestMapping(value = "/saveOrganDonorConsentForm", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrganDonorConsentForm(OrganDonorConsentFormDto obj,
			@RequestParam("organDonorId") Integer organDonorId, @RequestParam("treatmentId") Integer treatmentId,@RequestParam("checkupListId") Integer checkupListId,@RequestParam("uploadConsentFormDocs") MultipartFile[] uploadConsentFormDocs,
			HttpServletRequest request) {
		int status = organDonorConsentFormService.saveOrganDonorConsentForm(
				obj, organDonorId, treatmentId,checkupListId, uploadConsentFormDocs,request);
		return status;
	}

	@RequestMapping(value = "/getAllOrganDonorConsentForm", method = RequestMethod.GET)
	public @ResponseBody
	OrganDonorConsentFormDto getAllOrganDonorConsentForm(HttpServletRequest request,@RequestParam("fromDate") String fromDate,@RequestParam("lastDate") String lastDate) {
		log.info("In OrganDonorConsentFormController getAllOrganDonorConsentForm()");
		List<OrganDonorConsentFormDto> lstOrganDonorConsentFormDto = new ArrayList<OrganDonorConsentFormDto>();
		OrganDonorConsentFormDto obj = new OrganDonorConsentFormDto();
		lstOrganDonorConsentFormDto = organDonorConsentFormService
				.getAllOrganDonorConsentForm(request,fromDate,lastDate);
		System.out.println("thisbis "+lstOrganDonorConsentFormDto);
		obj.setLstOrganDonorConsentFormDto(lstOrganDonorConsentFormDto);
		log.debug("Response----> " + obj);
		return obj;
	}

	@RequestMapping(value = "/editOrganDonorConsentForm", method = RequestMethod.GET)
	public @ResponseBody
	OrganDonorConsentFormDto editOrganDonorConsentForm(
			@RequestParam("consentFormId") Integer consentFormId) {
		log.info("In OrganDonorConsentFormController editOrganDonorConsentForm()");
		OrganDonorConsentFormDto obj=new OrganDonorConsentFormDto();
		obj = organDonorConsentFormService
				.editOrganDonorConsentForm(consentFormId);
		log.error("Response-----> " + obj);
		return obj;
	}

	@RequestMapping(value = "/deleteOrganDonorConsentForm", method = RequestMethod.POST)
	public @ResponseBody
	String deleteOrganDonorConsentForm(
			@RequestParam("consentFormId") Integer consentFormId,
			HttpServletRequest request) {
		log.info("In OrganDonorConsentFormController deleteOrganDonorConsentForm()");
		System.out.println("consentFormId :" + consentFormId);
		boolean response = organDonorConsentFormService
				.deleteOrganDonorConsentForm(consentFormId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> " + msg);
		return msg;
	}
	
	@RequestMapping(value = "/organDonorConsentFormAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	OrganDonorConsentFormDto organDonorConsentFormAutoSuggestion(@RequestParam("consentFormId") Integer consentFormId, @RequestParam("callFrom") String callFrom) {
		log.info("In OrganDonorConsentFormController organDonorConsentFormAutoSuggestion()");
		List<OrganDonorConsentFormDto> lstOrganDonorConsentFormDto = new ArrayList<OrganDonorConsentFormDto>();
		OrganDonorConsentFormDto obj = new OrganDonorConsentFormDto();
		lstOrganDonorConsentFormDto = organDonorConsentFormService.organDonorConsentFormAutoSuggestion(consentFormId,callFrom);
		obj.setLstOrganDonorConsentFormDto(lstOrganDonorConsentFormDto);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/getOrganDonorById", method = RequestMethod.GET)
	@ResponseBody
	public OrganDonationRegistrationDto getOrganDonorById(@RequestParam("id") Integer organDonorId,HttpServletRequest request) {
		OrganDonationRegistrationDto obj=new OrganDonationRegistrationDto();
		obj = organDonorConsentFormService.getOrganDonorById(organDonorId,request);
		return obj;
	}
	
	@RequestMapping(value = "/getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId", method = RequestMethod.GET)
	@ResponseBody
	public OrganDonorCheckupListDto getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId(@RequestParam("organDonorId") Integer organDonorId,@RequestParam("checkupListId") Integer checkupListId,@RequestParam("treatmentId") Integer treatmentId,HttpServletRequest request) {
		OrganDonorCheckupListDto obj=new OrganDonorCheckupListDto();
		obj = organDonorConsentFormService.getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId(organDonorId,checkupListId,treatmentId,request);
		return obj;
	}
	
	
	/**
	 * @author :HM00066
	 * @Code :This method is view document in  organ consern form
	 * @return boolean
	 **/
	
	@RequestMapping(value = "/viewOpdDocuments", method = RequestMethod.GET)
	@ResponseBody
	public void readCertificate(@RequestParam("fileName") String fileName,
			@RequestParam("documentId") Integer documentId, HttpServletResponse response) {
		String filePath = FilePath.getConsentFormFilesPath();
		try {

			if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png")
					|| fileName.endsWith(".gif")) {
				java.io.File file = new java.io.File(
						filePath + java.io.File.separator + documentId + java.io.File.separator + fileName);
				ImageInputStream inputStream = ImageIO.createImageInputStream(file);
				java.util.Iterator<ImageReader> imageReaders = ImageIO.getImageReaders(inputStream);
				BufferedImage bufferedImage = ImageIO.read(file);
				java.io.OutputStream out = response.getOutputStream();
				while (imageReaders.hasNext()) {
					ImageReader reader = (ImageReader) imageReaders.next();
					ImageIO.write(bufferedImage, reader.getFormatName(), out);
				}
				out.close();
			} else if (fileName.endsWith(".pdf")) {
				String reportDestination = filePath + java.io.File.separator + documentId + java.io.File.separator
						+ fileName;
				FileInputStream fileInputStream = new FileInputStream(new java.io.File(reportDestination));
				org.apache.commons.io.IOUtils.copy(fileInputStream, response.getOutputStream());
				response.setContentType("application/pdf");
				response.setHeader("Content-Disposition", "attachment; filename=" + reportDestination);
				response.flushBuffer();
				log.debug("reponse readCertificate....." + reportDestination);

			} else {

				String reportDestination = filePath + java.io.File.separator + documentId + java.io.File.separator
						+ fileName;
				FileInputStream fileInputStream = new FileInputStream(new java.io.File(reportDestination));
				org.apache.commons.io.IOUtils.copy(fileInputStream, response.getOutputStream());
				log.debug("reponse readCertificate....." + reportDestination);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	
}
