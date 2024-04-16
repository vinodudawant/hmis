package com.hms.doctordesk.controller;

import java.awt.image.BufferedImage;
import java.io.FileInputStream;
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

import com.hms.doctordesk.dto.OpdDocumentUploadDto;
import com.hms.doctordesk.service.OpdDocumentUploadService;
import com.hms.ehat.dto.DoctorDto;
import com.hms.pharmacy.upload.FilePath;

@Controller
@RequestMapping(value="opdDocumentUpload")
public class OpdDocumentUploadController {
	
	@Autowired 
	OpdDocumentUploadService opdDocumentUploadService;
	static Logger log=Logger.getLogger(OpdDocumentUploadController.class.getName());
	
	/**
	 * @author :HM00066
	 * @Date :28-12-2021
	 * @Code :This method is document upload doctor desk
	 * @return
	 **/
	
	@RequestMapping(value = "/saveDoctorDeskDocument", method = RequestMethod.POST)
	public @ResponseBody String uploadDoctorDeskDocument(OpdDocumentUploadDto obj,
			@RequestParam("uploadOpdDocs") MultipartFile[] uploadDocs,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId")Integer treatmentId,
			HttpServletRequest request){
		int response = opdDocumentUploadService.uploadDoctorDeskDocument(obj,patientId,treatmentId,uploadDocs, request);
		log.debug("reponse uploadDoctorDeskDocument....."+response);
		String msg="";
		return msg = (response==1) ? "1" : (response==2) ? "2" : "0";
	}
	
	/**
	 * @author :HM00066
	 * @Date :24-12-2021
	 * @Code :This method is fetch doctor list
	 * @return DoctorDeskDocumentUploadDto
	 **/
	@RequestMapping(value = "/getAllOPDDocuments", method = RequestMethod.GET)
	@ResponseBody
	public OpdDocumentUploadDto getAllOPDDocuments(@RequestParam("patientId")Integer patientId, @RequestParam("treatmentId")Integer treatmentId, HttpServletRequest request) {
		log.info("In DoctorDesk getAllOPDDocuments()");
		OpdDocumentUploadDto doctorDeskDocumentUploadDto = new OpdDocumentUploadDto();
		List<OpdDocumentUploadDto> list=opdDocumentUploadService.getAllOPDDocuments(patientId,treatmentId,request);
		doctorDeskDocumentUploadDto.setLstDoctorDeskDocumentUploadDto(list);
		log.debug("Reponse----> "+list);
		return doctorDeskDocumentUploadDto;
	}
	
	/**
	 * @author :HM00066
	 * @Date :29-12-2021
	 * @Code :This method is Edit document in opd  doctor desk
	 * @return DoctorDeskDocumentUploadDto
	 **/

	@RequestMapping(value = "/editOPDDocuments", method = RequestMethod.GET)
	@ResponseBody
	public OpdDocumentUploadDto  editOPDDocuments(@RequestParam("documentId")Integer documentId){
		log.info("In DoctorDesk editOPDDocuments()");
		OpdDocumentUploadDto doctorDeskDocumentUploadDto= opdDocumentUploadService.editOPDDocuments(documentId);
		log.debug("Reponse----> "+doctorDeskDocumentUploadDto);
		return doctorDeskDocumentUploadDto;
	}
	
	/**
	 * @author :HM00066
	 * @Date :29-12-2021
	 * @Code :This method is Delete document in opd doctor desk
	 * @return boolean
	 **/

	@RequestMapping(value = "/deleteOPDDocuments", method = RequestMethod.POST)
	@ResponseBody
	public boolean  deleteOPDDocuments(@RequestParam("documentId") Integer documentId,HttpServletRequest request){
		log.info("In DoctorDesk deleteOPDDocuments()");
		return opdDocumentUploadService.deleteOPDDocuments(documentId,request);
	}
	
	/**
	 * @author :HM00066
	 * @Date :29-12-2021
	 * @Code :This method is view document in opd doctor desk
	 * @return boolean
	 **/
	
	@RequestMapping(value = "/viewOpdDocuments", method = RequestMethod.GET)
	@ResponseBody
	public void readCertificate(@RequestParam("fileName") String fileName,
			@RequestParam("documentId") Integer documentId, HttpServletResponse response) {
		String filePath = FilePath.getDoctorDeskUploadFilesPath();
		try {

			if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png")
					|| fileName.endsWith(".gif")) {
				//java.io.File file = new java.io.File(filePath + java.io.File.separator + documentId + java.io.File.separator + fileName);
				java.io.File file = new java.io.File(filePath + java.io.File.separator  + java.io.File.separator + fileName);
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
				//String reportDestination = filePath + java.io.File.separator + documentId + java.io.File.separator+ fileName;
				String reportDestination = filePath + java.io.File.separator  + java.io.File.separator+ fileName;
				FileInputStream fileInputStream = new FileInputStream(new java.io.File(reportDestination));
				org.apache.commons.io.IOUtils.copy(fileInputStream, response.getOutputStream());
				response.setContentType("application/pdf");
				response.setHeader("Content-Disposition", "attachment; filename=" + reportDestination);
				response.flushBuffer();
				log.debug("reponse readCertificate....." + reportDestination);

			} else {

			//	String reportDestination = filePath + java.io.File.separator + documentId + java.io.File.separator+ fileName;
				String reportDestination = filePath + java.io.File.separator  + java.io.File.separator+ fileName;
				FileInputStream fileInputStream = new FileInputStream(new java.io.File(reportDestination));
				org.apache.commons.io.IOUtils.copy(fileInputStream, response.getOutputStream());
				log.debug("reponse readCertificate....." + reportDestination);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	
	
}
