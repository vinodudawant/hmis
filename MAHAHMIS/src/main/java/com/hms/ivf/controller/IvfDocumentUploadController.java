package com.hms.ivf.controller;

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

import com.hms.ivf.dto.IvfDocumentUploadDto;
import com.hms.ivf.service.IvfDocumentUploadService;
import com.hms.pharmacy.upload.FilePath;

@Controller
@RequestMapping(value="ivfDocumentUpload")
public class IvfDocumentUploadController {
	
	@Autowired
	IvfDocumentUploadService ivfservice;
	
	static Logger log=Logger.getLogger(IvfDocumentUploadController.class.getName());
	
	/**
	 * @author :HM00054
	 * @Code :This method is use for uploading ivf document
	 **/
	
	@RequestMapping(value = "/saveIVFDocument", method = RequestMethod.POST)
	public @ResponseBody String saveIVFDocument(IvfDocumentUploadDto obj,
			@RequestParam("uploadOpdDocs") MultipartFile[] uploadDocs,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId")Integer treatmentId,
			@RequestParam("ivftreatmentId")Integer ivftreatmentId,
			HttpServletRequest request){
		log.info("inside saveIVFDocument.....");
		int response = ivfservice.uploadDoctorDeskDocument(obj, patientId, treatmentId, uploadDocs, ivftreatmentId, request);
		log.debug("reponse saveIVFDocument....."+response);
		String msg="";
		return msg = (response==1) ? "1" : (response==2) ? "2" : "0";
	}
	
	/**
	 * @author :HM00054
	 * @Code :This method is fetch ivf document 
	 **/
	@RequestMapping(value = "/getAllIVFDocuments", method = RequestMethod.GET)
	@ResponseBody
	public IvfDocumentUploadDto getAllOPDDocuments(@RequestParam("patientId")Integer patientId, @RequestParam("ivftreatmentId")Integer treatmentId, HttpServletRequest request) {
		log.info("In DoctorDesk getAllOPDDocuments()");
		IvfDocumentUploadDto doctorDeskDocumentUploadDto = new IvfDocumentUploadDto();
		List<IvfDocumentUploadDto> list=ivfservice.getAllOPDDocuments(patientId,treatmentId,request);
		doctorDeskDocumentUploadDto.setLstDoctorDeskDocumentUploadDto(list);
		log.debug("getAllIVFDocuments----> "+list);
		return doctorDeskDocumentUploadDto;
	}
	
	
	/**
	 * @author :HM00066
	 * @Code :This method is Edit document in ivf 
	 **/

	@RequestMapping(value = "/editIVFDocuments", method = RequestMethod.GET)
	@ResponseBody
	public IvfDocumentUploadDto  editOPDDocuments(@RequestParam("documentId")Integer documentId){
		log.info("In  editIVFDocuments()");
		IvfDocumentUploadDto doctorDeskDocumentUploadDto= ivfservice.editOPDDocuments(documentId);
		log.debug("editIVFDocuments Reponse----> "+doctorDeskDocumentUploadDto);
		return doctorDeskDocumentUploadDto;
	}
	
	
	/**
	 * @author :HM00066
	 * @Code :This method is Delete document in ivf
	 **/

	@RequestMapping(value = "/deleteIVFDocuments", method = RequestMethod.POST)
	@ResponseBody
	public boolean  deleteOPDDocuments(@RequestParam("documentId") Integer documentId,HttpServletRequest request){
		log.info("In deleteIVFDocuments ");
		return ivfservice.deleteOPDDocuments(documentId,request);
	}

	
	
	/**
	 * @author :HM00054
	 * @Date :29-12-2021
	 * @Code :This method is view document in ivf doctor desk
	 * @return boolean
	 **/
	
	@RequestMapping(value = "/viewIVFDocuments", method = RequestMethod.GET)
	@ResponseBody
	public void readCertificate(@RequestParam("fileName") String fileName,
			@RequestParam("documentId") Integer documentId, HttpServletResponse response) {
		String filePath = FilePath.getIVFUploadFilesPath();
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
