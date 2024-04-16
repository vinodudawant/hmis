package com.hms.inventory.controller;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
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

import com.hms.inventory.dto.HospitalLicenseDocUploadDto;
import com.hms.inventory.dto.HospitalLicenseDto;
import com.hms.inventory.service.HospitalLicenseService;
import com.hms.pharmacy.upload.FilePath;

@Controller
@RequestMapping(value = "/hospitalLicense")
public class HospitalLicenseController {

	static Logger log=Logger.getLogger(HospitalLicenseController.class.getName());
	@Autowired
	private HospitalLicenseService hospitalLicenseService;
	
	@Autowired
	private HospitalLicenseDto hospitalLicenseDto;
	
	@Autowired
	private HospitalLicenseDocUploadDto hospitalLicenseDocUploadDto;
	
	/**
	 * @since 24-11-2020
	 * @author Vishnu Thorat
	 * @codeFor below method is created for save Hospital License details
	 */
	@RequestMapping(value = "/saveHospitalLicense", method = RequestMethod.POST)
	@ResponseBody
	public int[] saveHospitalLicense(@RequestParam("lstHospitalLicenseDto") String obj,HttpServletRequest request) {
		log.info("in class HospitalLicenseController this is method saveHospitalLicense....");
		
		int status[]= hospitalLicenseService.saveHospitalLicense(obj,request);
		log.debug("this is status...."+status);
		return status;
	}

	/**
	 * @since 24-11-2020
	 * @author Vishnu Thorat
	 * @codeFor below method is created for get all Hospital License details
	 */
	@RequestMapping(value = "/getAllHospitalLicense", method = RequestMethod.GET)
	@ResponseBody
	public HospitalLicenseDto getAllHospitalLicense(HttpServletRequest request) {
		
		log.info("in class HospitalLicenseController this is method getAllHospitalLicense....");
		List<HospitalLicenseDto> hospitalLicenseDtoList = new ArrayList<HospitalLicenseDto>();
		Integer count = hospitalLicenseService.getAllPageCountHospitalLicense(request);
		hospitalLicenseDtoList = hospitalLicenseService.getAllHospitalLicense(request);
		hospitalLicenseDto.setLstHospitalLicenseDto(hospitalLicenseDtoList);
		hospitalLicenseDto.setNoOfPages(count);
		log.debug("this is list hospitalLicenseDtoList...."+hospitalLicenseDtoList);
		return hospitalLicenseDto;
	}

	/**
	 * @since 24-11-2020
	 * @author Vishnu Thorat
	 * @codeFor below method is created for edit Hospital License 
	 */
	@RequestMapping(value = "/editHospitalLicense", method = RequestMethod.GET)
	@ResponseBody
	public HospitalLicenseDto editHospitalLicense(
			@RequestParam("id") Integer hospitalLicenseId,HttpServletRequest request) {
		log.info("in class HospitalLicenseController this is method editHospitalLicense....");
		 return hospitalLicenseService.editHospitalLicense(hospitalLicenseId,request);
	}
	
	/**
	 * @since 24-11-2020
	 * @author Vishnu Thorat
	 * @codeFor below method is created for delete Hospital License 
	 */
	@RequestMapping(value = "/deleteHospitalLicense", method = RequestMethod.POST)
	@ResponseBody
	public int deleteHospitalLicense(
			@RequestParam("id") Integer hospitalLicenseId,HttpServletRequest request) {
		log.info("in class HospitalLicenseController this is method deleteHospitalLicense....");
		 return hospitalLicenseService.deleteHospitalLicense(hospitalLicenseId,request);
	}
	
	/**
	 * @since 24-11-2020
	 * @author Vishnu Thorat
	 * @codeFor below method is created for delete Hospital License 
	 */
	@RequestMapping(value = "/searchHospitalLicense", method = RequestMethod.GET)
	@ResponseBody
	public HospitalLicenseDto searchHospitalLicense(
			@RequestParam("searchByDate") String searchByDate, @RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate, @RequestParam("searchByDocument") String searchByDocument, @RequestParam("documentName") String documentName, @RequestParam("licenseNo") String licenseNo, @RequestParam("status") String status, HttpServletRequest request) {
		 return hospitalLicenseService.searchHospitalLicense(searchByDate,fromDate,toDate,searchByDocument,documentName,licenseNo,status,request);
	}
	
	/**
	 * @since 24-11-2020
	 * @author Vishnu Thorat
	 * @codeFor below method is created for get Hospital License Pagination 
	 */
	@RequestMapping(value = "/getHospitalLicensePagination", method = RequestMethod.POST)
	public @ResponseBody HospitalLicenseDto getHospitalLicensePagination(@RequestParam("startIndex") Integer startIndex,HttpServletRequest request) {
		log.debug("reponse getHospitalLicensePagination.....");
		return hospitalLicenseService.getHospitalLicensePagination(startIndex,request);
	}
	
	/**
	 * @since 24-11-2020
	 * @author Vishnu Thorat
	 * @codeFor below method is created for upload Hospital License Document 
	 */
	@RequestMapping(value = "/uploadHospitalLicenseDocument", method = RequestMethod.POST)
	public @ResponseBody String uploadHospitalLicenseDocument(@RequestParam("documentUpload") String document,
			@RequestParam("uploadHospitalLicenseDocs") MultipartFile[] uploadHospitalLicenseDocs,
			@RequestParam("hospitalLicenseId") Integer hospitalLicenseId,
			HttpServletRequest request) throws IOException {
		for (MultipartFile file : uploadHospitalLicenseDocs) {
            if (file.isEmpty()) { continue; }
            java.io.File uploadPath = new java.io.File(FilePath.getHospitalLicenseIdFilesPath() + hospitalLicenseId);
            if(!uploadPath.exists())
            	uploadPath.mkdirs();
            String fileName = file.getOriginalFilename();
            String filepath = Paths.get(uploadPath.toString(), fileName).toString();
            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
                stream.write(file.getBytes());
                stream.close();
	 }
		
	int response = hospitalLicenseService.uploadHospitalLicenseDocument(document, request);
	log.debug("reponse uploadHospitalLicenseDocument....."+response);
	String msg="";
	return msg = (response==1) ? "1" : (response==2) ? "2" : "0";
	}
	
	/**
	 * @since 24-11-2020
	 * @author Vishnu Thorat
	 * @codeFor below method is created for get Uploaded Hospital License Documents 
	 */
	
	@RequestMapping(value = "/getUploadedHospitalLicenseDocuments", method = RequestMethod.POST)
	@ResponseBody
	public HospitalLicenseDocUploadDto getUploadedHospitalLicenseDocuments(@RequestParam("hospitalLicenseId") Integer hospitalLicenseId,HttpServletRequest request) {
		hospitalLicenseDocUploadDto = hospitalLicenseService.getUploadedHospitalLicenseDocuments(hospitalLicenseId,request);
		log.debug("reponse getUploadedHospitalLicenseDocuments....."+hospitalLicenseDto);
		return hospitalLicenseDocUploadDto;	
	}
	
	/**
	 * @since 24-11-2020
	 * @author Vishnu Thorat
	 * @codeFor below method is created for readDocuments 
	 */
	@RequestMapping(value="/readDocuments",method=RequestMethod.GET)
	@ResponseBody
	public void readCertificate(@RequestParam("fileName") String fileName, @RequestParam("hospitalLicenseId") Integer hospitalLicenseId, HttpServletResponse response) {
		String filePath = FilePath.getHospitalLicenseIdFilesPath();
		try {

			if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png") || fileName.endsWith(".gif")) {
					java.io.File file = new java.io.File(filePath+ java.io.File.separator + hospitalLicenseId +  java.io.File.separator + fileName);
					ImageInputStream inputStream = ImageIO.createImageInputStream(file);
					java.util.Iterator<ImageReader> imageReaders = ImageIO.getImageReaders(inputStream);
					BufferedImage bufferedImage = ImageIO.read(file);
					java.io.OutputStream out = response.getOutputStream();
					while (imageReaders.hasNext()) {
						ImageReader reader = (ImageReader) imageReaders.next();
						ImageIO.write(bufferedImage, reader.getFormatName(),out);
					}
					out.close();
			} else if (fileName.endsWith(".pdf")) {
					String reportDestination = filePath+ java.io.File.separator + hospitalLicenseId +  java.io.File.separator + fileName;
					FileInputStream fileInputStream = new FileInputStream(
							new java.io.File(reportDestination));
					org.apache.commons.io.IOUtils.copy(fileInputStream,
							response.getOutputStream());
					response.setContentType("application/pdf");
					response.setHeader("Content-Disposition",
							"attachment; filename=" + reportDestination);
					response.flushBuffer();
					log.debug("reponse readCertificate....."+reportDestination);
				
			} else {
				
					String reportDestination = filePath+ java.io.File.separator + hospitalLicenseId +  java.io.File.separator + fileName;
					FileInputStream fileInputStream = new FileInputStream(new java.io.File(reportDestination));
					org.apache.commons.io.IOUtils.copy(fileInputStream,response.getOutputStream());
					log.debug("reponse readCertificate....."+reportDestination);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	/**
	 * @since 24-11-2020
	 * @author Vishnu Thorat
	 * @codeFor below method is created for get all Hospital License details
	 */
	@RequestMapping(value = "/getAllHospitalLicenseReports", method = RequestMethod.GET)
	@ResponseBody
	public HospitalLicenseDto getAllHospitalLicenseReports(HttpServletRequest request) {
		
		log.info("in class HospitalLicenseController this is method getAllHospitalLicense....");
		List<HospitalLicenseDto> hospitalLicenseDtoList = new ArrayList<HospitalLicenseDto>();
		hospitalLicenseDtoList = hospitalLicenseService.getAllHospitalLicenseReports(request);
		hospitalLicenseDto.setLstHospitalLicenseDto(hospitalLicenseDtoList);
		log.debug("this is list hospitalLicenseDtoList...."+hospitalLicenseDtoList);
		return hospitalLicenseDto;
	}
	
	/**
	 * @since 26-11-2020
	 * @author Vishnu Thorat
	 * @codeFor below method is created for auto suggest while hospital License Document
	 */
	@RequestMapping(value = "/hospitalLicenseDocumentAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public HospitalLicenseDto hospitalLicenseDocumentAutoSuggestion(
			@RequestParam("documentName") String documentName,HttpServletRequest request) {
		return hospitalLicenseService.hospitalLicenseDocumentAutoSuggestion(documentName,request);
	}
	
	/**
	 * @since 26-11-2020
	 * @author Vishnu Thorat
	 * @codeFor below method is created for auto suggest while hospital License  reg no and license no
	 */
	@RequestMapping(value = "/hospitalLicenseRegNOLicenseNOAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public HospitalLicenseDto hospitalLicenseRegNOLicenseNOAutoSuggestion(
			@RequestParam("regNOLicenseNo") String regNOLicenseNo,HttpServletRequest request) {
		return hospitalLicenseService.hospitalLicenseRegNOLicenseNOAutoSuggestion(regNOLicenseNo,request);
	}
	
	/**
	 * @since 15-12-2020
	 * @author Vishnu Thorat
	 * @codeFor below method is created for delete Hospital License document
	 */
	@RequestMapping(value = "/deleteUploadedDocumentHospitalLicense", method = RequestMethod.POST)
	@ResponseBody
	public int deleteUploadedDocumentHospitalLicense(
			@RequestParam("id") Integer hospitalLicenseId,HttpServletRequest request) {
		log.info("in class HospitalLicenseController this is method deleteUploadedDocumentHospitalLicense....");
		 return hospitalLicenseService.deleteUploadedDocumentHospitalLicense(hospitalLicenseId,request);
	}
	
}
