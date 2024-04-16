package com.hms.ipd.nurshing.controller;

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

import com.hms.ipd.nurshing.dto.NursingDocumentDTO;
import com.hms.ipd.nurshing.service.NursingDocumentService;
import com.hms.pharmacy.upload.FilePath;



@Controller
@RequestMapping(value="nursingDocument")
public class NursingDocumentController {
	
	@Autowired 
	NursingDocumentService nursingDocumentService;
	static Logger log=Logger.getLogger(NursingDocumentController.class.getName());
	
	
	@RequestMapping(value = "/saveNursingDocument",method = RequestMethod.POST)
	public @ResponseBody String saveNursingDocument(NursingDocumentDTO obj,
			@RequestParam("uploadDocs") MultipartFile[] uploadDocs,
			@RequestParam("patientId") Integer patientId,
			@RequestParam("treatmentId") Integer treatmentId,HttpServletRequest request) {
		
		int response = nursingDocumentService.uploadNursingDocument(obj,patientId,treatmentId,uploadDocs, request);
		log.debug("Upload Nursing Documentt"+response);
		String msg="";
		return msg = (response==1) ? "1" : (response==2) ? "2" : "0";
	}
	
	@RequestMapping(value="/getNursingDocument" , method = RequestMethod.GET)
	@ResponseBody
	public NursingDocumentDTO getNursingDocument(@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId,HttpServletRequest request) {
		log.info("getNursingDocument()");
		NursingDocumentDTO nursingDocument = new NursingDocumentDTO();
		List<NursingDocumentDTO> list = nursingDocumentService.getNursingDocument(patientId,treatmentId,request);
		nursingDocument.setLstNursingDocument(list);
		return nursingDocument;
	}
	
	@RequestMapping(value="/deleteNursingDocuments" , method = RequestMethod.POST)
	@ResponseBody
	public boolean deleteNursingDocuments(@RequestParam("documentId") Integer documentId,HttpServletRequest request) {
		log.info("In NursingDocument()");
		return nursingDocumentService.deleteNursingDocuments(documentId,request);
		
	}
	
	@RequestMapping(value = "/ReadDocuments", method = RequestMethod.GET)
	@ResponseBody
	public void readCertificate(@RequestParam("fileName") String fileName,
			@RequestParam("documentId") Integer documentId, HttpServletResponse response) {
		String filePath = FilePath.getDoctorDeskUploadFilesPath1();
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
