package com.hms.ot.controller;

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.nio.file.Paths;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.hms.pharmacy.upload.FilePath;
import com.hms.registration.controller.uploadFileController;

@Controller
@RequestMapping(value = "/uploadOTDoc")
public class UploadOTDocumentController {

	static Logger log=Logger.getLogger(uploadFileController.class.getName());
	static {
		System.out.println("UploadOTDocumentController is Loaded...!");
	}
	
	//@author : Vinod Udawant @reason : To upload patient documents from OT 
	@ResponseBody
	@RequestMapping(value = "/uploadPreOpDoc", method = RequestMethod.POST)
	public void uploadPreOpDoc(@RequestParam("ifile") MultipartFile[] uploadfiles, HttpServletRequest request) {

		log.info("In UploadOTDocumentController uploadPreOpDoc()");
		try {
			for (MultipartFile file : uploadfiles) {

				if (file.isEmpty()) {
					continue;
				}

				java.io.File uploadPath = new java.io.File(FilePath.getUPLOADDOC());
				if (!uploadPath.exists())
					uploadPath.mkdirs();

				String fileName = file.getOriginalFilename();
				String filepath = Paths.get(uploadPath.toString(), fileName).toString();
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
				stream.write(file.getBytes());
				stream.close();
				log.debug("Response--------> "+filepath);
			}
		} catch (Exception e) {

			e.printStackTrace();
		}
	}
}
