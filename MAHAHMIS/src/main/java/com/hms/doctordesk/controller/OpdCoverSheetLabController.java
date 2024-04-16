package com.hms.doctordesk.controller;

import java.awt.image.BufferedImage;
import java.lang.invoke.MethodHandles;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.OPDIPDLabTestResultDTO;
import com.hms.doctordesk.service.OpdCoverSheetLabService;
import com.hms.dto.RisImageUploadDTO;
import com.hms.pathology.dto.PathologyTemplateRotineValueDTO;
import com.hms.pharmacy.upload.FilePath;

import groovy.util.logging.Slf4j;

@Controller
@RequestMapping(value = "/opdCoverSheetLab")
@Slf4j
public class OpdCoverSheetLabController {

	private static final Logger log = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	@Autowired
	OpdCoverSheetLabService labservice;

	/**
	 * @author :HM00066
	 * @Date :06-1-2022
	 * @Code :This method is fetchInvestigationXrayImage
	 * @return
	 **/

	@RequestMapping(value = "/fetchInvestigationXrayImage", method = RequestMethod.POST)
	@ResponseBody
	public RisImageUploadDTO fetchXrayImage(@RequestParam("treatmentId") Integer treatmentId,
			@RequestParam("testId") Integer testId, @RequestParam("billdetailsid") Integer billdetailsid) {
		log.info("In OpdCoverSheetLabController fetchInvestigationXrayImage()");
		List<RisImageUploadDTO> ltRadisImage = new ArrayList<RisImageUploadDTO>();
		ltRadisImage = labservice.fetchInvestigationXrayImage(treatmentId, testId, billdetailsid);
		RisImageUploadDTO obj = new RisImageUploadDTO();
		obj.setLstRisImageUploadDTO(ltRadisImage);
		return obj;
	}

	@RequestMapping(value = "/viewXrayImage", method = RequestMethod.GET)
	@ResponseBody
	public void readCertificate(@RequestParam("fileName") String fileName, HttpServletResponse response) {
		String filePath = FilePath.getXrayFilesPath();
		try {

			if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png")
					|| fileName.endsWith(".gif")) {
				java.io.File file = new java.io.File(
						filePath + java.io.File.separator + java.io.File.separator + fileName);
				ImageInputStream inputStream = ImageIO.createImageInputStream(file);
				java.util.Iterator<ImageReader> imageReaders = ImageIO.getImageReaders(inputStream);
				BufferedImage bufferedImage = ImageIO.read(file);
				java.io.OutputStream out = response.getOutputStream();
				while (imageReaders.hasNext()) {
					ImageReader reader = (ImageReader) imageReaders.next();
					ImageIO.write(bufferedImage, reader.getFormatName(), out);
				}
				out.close();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	
	@RequestMapping(value = "/getOPDIPDLabtestResult", method = RequestMethod.POST)
	@ResponseBody
	public OPDIPDLabTestResultDTO getOPDIPDLabtestResult(@RequestParam("treatmentId") Integer treatmentId,
			 @RequestParam("billDetailsId") Integer billDetailsId,@RequestParam("age") String age,@RequestParam("ageIn") String ageIn,@RequestParam("sexType") String sexType) {
		log.info("In OpdCoverSheetLabController getOPDIPDLabtestResult()");
		OPDIPDLabTestResultDTO obj=new OPDIPDLabTestResultDTO();
		obj = labservice.getOPDIPDLabtestResult(treatmentId, billDetailsId, age, ageIn,sexType);
		return obj;
	}
	
	@RequestMapping(value = "/getTemplateWistTestResult", method = RequestMethod.POST)
	@ResponseBody
	public PathologyTemplateRotineValueDTO getTemplateWistTestResult(@RequestParam("treatmentId") Integer treatmentId, @RequestParam("billDetailsId") Integer billDetailsId) {
		log.info("In OpdCoverSheetLabController getTemplateWistTestResult()");
		PathologyTemplateRotineValueDTO obj=new PathologyTemplateRotineValueDTO();
		obj = labservice.getTemplateWistTestResult(treatmentId, billDetailsId);
		return obj;
	}
}
