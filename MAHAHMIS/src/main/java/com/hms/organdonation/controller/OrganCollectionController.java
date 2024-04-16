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

import com.hms.bloodbank.dto.DonorBloodBagDetails;
import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.organdonation.dto.OrganCrossMatchDto;
import com.hms.organdonation.dto.OrganDonorConsentFormDto;
import com.hms.organdonation.service.OrganCollectionService;
import com.hms.pharmacy.upload.FilePath;

@Controller
@RequestMapping(value = "/organCollection")
public class OrganCollectionController {
	
static Logger log = Logger.getLogger(OrganCollectionController.class.getName());
	
	@Autowired
	private OrganCollectionService organCollectionService;
	
	
	@RequestMapping(value = "/saveOrganCollection", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrganCollection(OrganCollectionDto obj, 
									@RequestParam("organDonorId") Integer organDonorId,
									@RequestParam("treatmentId") Integer treatmentId, 
									@RequestParam("checkupListId") Integer checkupListId, 
									@RequestParam("uploadOrganCollectionDocs") MultipartFile[] docList,
									@RequestParam("remarksNew") String remarks, HttpServletRequest request) {
		
		log.info("in OrganCollectionController : saveOrganCollection()");
		
		obj.setRemarks(remarks);
		
		int status = organCollectionService.saveOrganCollection(obj, organDonorId, treatmentId, checkupListId, docList, request);
		return status;
	}
	
	@RequestMapping(value = "/getAllCollectedOrgans", method = RequestMethod.GET)
	@ResponseBody
	public OrganCollectionDto getAllCollectedOrgans(HttpServletRequest request,@RequestParam("fromDate") String fromDate,@RequestParam("lastDate") String lastDate) {
		
		log.info("In OrganCollectionController : getAllCollectedOrgans()");
		
		List<OrganCollectionDto> listOrganCollectionDto = new ArrayList<OrganCollectionDto>();
		OrganCollectionDto obj = new OrganCollectionDto();
		listOrganCollectionDto = organCollectionService.getAllCollectedOrgans(request,fromDate,lastDate);
		
		System.out.println("list :  " + listOrganCollectionDto);
		
		obj.setListOrganCollectionDto(listOrganCollectionDto);
		log.debug("Response----> " + obj);
		return obj;
	}
	
	@RequestMapping(value = "/editCollectedOrganById", method = RequestMethod.GET)
	public @ResponseBody
	OrganCollectionDto editCollectedOrganById(@RequestParam("organCollectionId") Integer organCollectionId) {
		
		log.info("In OrganCollectionController editCollectedOrganById()");
		OrganCollectionDto obj = new OrganCollectionDto();
		obj = organCollectionService.editCollectedOrganById(organCollectionId);
		
		log.error("Response-----> " + obj);
		return obj;
	}
	
	
	@RequestMapping(value = "/getCollectedOrganById", method = RequestMethod.GET)
	public @ResponseBody
	OrganCollectionDto getCollectedOrganById(@RequestParam("organCollectionId") Integer organCollectionId) {
		
		log.info("In OrganCollectionController getCollectedOrganById()");
		OrganCollectionDto obj = new OrganCollectionDto();
		obj = organCollectionService.getCollectedOrganById(organCollectionId);
		
		log.error("Response-----> " + obj);
		return obj;
	}
	
	@RequestMapping(value = "/deleteCollectedOrganById", method = RequestMethod.POST)
	@ResponseBody
	public String deleteCollectedOrganById(@RequestParam("organCollectionId") Integer organCollectionId, HttpServletRequest request) {
		
		boolean response = organCollectionService.deleteCollectedOrganById(organCollectionId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> " + msg);
		return msg;
	}
	
	@RequestMapping(value = "/serachOrganContainerDetailsById", method = RequestMethod.POST)
	@ResponseBody
	public OrganCollectionDto serachOrganContainerDetailsById(@RequestParam("searchParam") Integer searchParam,HttpServletRequest request) {
		List<OrganCollectionDto> list=new ArrayList<OrganCollectionDto>();
		OrganCollectionDto obj=new OrganCollectionDto();
		list = organCollectionService.serachOrganContainerDetailsById(searchParam);
		obj.setListOrganCollectionDto(list);
		return  obj;
	}
	
	@RequestMapping(value = "/organCollectionAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public OrganCollectionDto organCollectionAutoSuggestion(@RequestParam("organCollectionId") Integer organCollectionId, @RequestParam("callFrom") String callFrom) {
		OrganCollectionDto organCollectionDto = new OrganCollectionDto();
		List<OrganCollectionDto> listOrganCollectionDto = new ArrayList<OrganCollectionDto>();
		listOrganCollectionDto = organCollectionService.organCollectionAutoSuggestion(organCollectionId, callFrom);
		organCollectionDto.setListOrganCollectionDto(listOrganCollectionDto);
		return organCollectionDto;
	}
	
	
	/**
	 * @author :HM00066
	 * @Code :This method is view document in  organ collection form
	 * @return boolean
	 **/
	
	@RequestMapping(value = "/viewOpdDocuments", method = RequestMethod.GET)
	@ResponseBody
	public void readCertificate(@RequestParam("fileName") String fileName,
			@RequestParam("documentId") Integer documentId, HttpServletResponse response) {
		String filePath = FilePath.getOrganCollectionFilesPath();
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
