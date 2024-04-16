package com.hms.registration.controller;

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.nio.file.Paths;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.hms.pharmacy.upload.FilePath;

@Controller
@RequestMapping(value = "/uploadregdoc")
public class uploadFileController {

	static Logger log=Logger.getLogger(uploadFileController.class.getName());
	static {
		System.out.println("uploadFileController is Loaded...!");
	}
	
	//@author : Vinod Udawant @date: 04-Jan-2021 @reason : To upload patient documents from registration 
	@ResponseBody
	@RequestMapping(value = "/uploadPatientDocument", method = RequestMethod.POST)
	public void uploadPatientDocuments(@RequestParam("ifile") MultipartFile[] uploadfiles, HttpServletRequest request) {

		log.info("In uploadFileController uploadPatientDocuments()");
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
	//@author : Vinod Udawant @date: 04-Jan-2021 @reason : To upload patient photo from registration 
	@ResponseBody
	@RequestMapping(value = "/uploadPatientPhoto", method = RequestMethod.POST)
	public void uploadPatientPhoto(@RequestParam("changeProfilePicture") MultipartFile[] uploadfiles, HttpServletRequest request) {

		log.info("In uploadFileController uploadPatientPhoto()");
		try {
			for (MultipartFile file : uploadfiles) {

				if (file.isEmpty()) {
					continue;
				}

				java.io.File uploadPath = new java.io.File(FilePath.getBasePath());
				
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
	//@author : Vinod Udawant @date: 04-Jan-2021 @reason : To upload patient addhar photo from registration 
	@ResponseBody
	@RequestMapping(value = "/uploadPatientAddhar", method = RequestMethod.POST)
	public void uploadPatientAddhar(@RequestParam("changeAadharPicture") MultipartFile[] uploadfiles, HttpServletRequest request) {

		log.info("In uploadFileController uploadPatientAddhar()");
		try {
			for (MultipartFile file : uploadfiles) {

				if (file.isEmpty()) {
					continue;
				}

				java.io.File uploadPath = new java.io.File(FilePath.getAadharPath());
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
	
	@ResponseBody
	@RequestMapping(value = "/uploadDoctorSign", method = RequestMethod.POST)
	public void uploadDoctorSign(@RequestParam("signature") MultipartFile[] uploadfiles, HttpServletRequest request) {

		log.info("In uploadFileController uploadDoctorSign()");
		try {
			for (MultipartFile file : uploadfiles) {

				if (file.isEmpty()) {
					continue;
				}

				//java.io.File uploadPath = new java.io.File(FilePath.getUPLOADDOC());
				java.io.File uploadPath = new java.io.File(FilePath.getBasePath());
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
	//Added By Annapurna code for hospitalLogoUnitWise
	@ResponseBody
	@RequestMapping(value = "/uploadHospitalLogo", method = RequestMethod.POST)
	public void uploadHospitalLogo(@RequestParam("signature") MultipartFile[] uploadfiles, HttpServletRequest request) {

		log.info("In uploadFileController uploadHospitalLogo()");
		try {
			for (MultipartFile file : uploadfiles) {

				if (file.isEmpty()) {
					continue;
				}
				ServletContext context = request.getServletContext();
				String fileName = file.getOriginalFilename();
                String newpath=context.getRealPath("/images/Hospital/");
				java.io.File uploadPath = new java.io.File(newpath);
				if (!uploadPath.exists())
					uploadPath.mkdirs();

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
	//Added By Annapurna code for NabhLogo
	@ResponseBody
	@RequestMapping(value = "/uploadNabhLogo", method = RequestMethod.POST)
	public void uploadNabhLogo(@RequestParam("nabhLogo") MultipartFile[] uploadfiles, HttpServletRequest request) {

		log.info("In uploadFileController uploadNabhLogo()");
		try {
			for (MultipartFile file : uploadfiles) {

				if (file.isEmpty()) {
					continue;
				}
				ServletContext context = request.getServletContext();
				String fileName = file.getOriginalFilename();
                String newpath=context.getRealPath("/images/Hospital/");
				java.io.File uploadPath = new java.io.File(newpath);
				if (!uploadPath.exists())
					uploadPath.mkdirs();

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

	//Added By Annapurna code for MedicalLogoUnitWise
	@ResponseBody
	@RequestMapping(value = "/uploadMedicalLogo", method = RequestMethod.POST)
	public void uploadMedicalLogo(@RequestParam("pharmaLogo") MultipartFile[] uploadfiles, HttpServletRequest request) {

		log.info("In uploadFileController uploadMedicalLogo()");
		try {
			for (MultipartFile file : uploadfiles) {

				if (file.isEmpty()) {
					continue;
				}

				java.io.File uploadPath = new java.io.File(FilePath.getUPLOADLOGO());
				if (!uploadPath.exists())
					uploadPath.mkdirs();

				String fileName = file.getOriginalFilename();
				String medLogoPath = Paths.get(uploadPath.toString(), fileName).toString();
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(medLogoPath)));
				stream.write(file.getBytes());
				stream.close();
				log.debug("Response--------> "+medLogoPath);
			}
		} catch (Exception e) {

			e.printStackTrace();
		}
	}
	//Added By Annapurna code for PriscriptionPhotoUpload
		@ResponseBody
		@RequestMapping(value = "/uploadPrescriptionPhoto/{}", method = RequestMethod.POST)
		public void uploadPrescriptionPhoto(@RequestParam("prescriptionPhoto") MultipartFile[] uploadfiles, HttpServletRequest request) {

			log.info("In uploadFileController uploadPrescriptionPhoto()");
			try {
				for (MultipartFile file : uploadfiles) {

					if (file.isEmpty()) {
						continue;
					}

					java.io.File uploadPath = new java.io.File(FilePath.getPriscriptionPhoto());
					if (!uploadPath.exists())
						uploadPath.mkdirs();

					String fileName = file.getOriginalFilename();
					String photoPath = Paths.get(uploadPath.toString(), fileName).toString();
					BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(photoPath)));
					stream.write(file.getBytes());
					stream.close();
					log.debug("Response--------> "+photoPath);
				}
			} catch (Exception e) {

				e.printStackTrace();
			}
		}
		
		//Added By Tushar code for Pathology Logo
		@ResponseBody
		@RequestMapping(value = "/uploadPathologyLogo", method = RequestMethod.POST)
		public void uploadPathologyLogo(@RequestParam("PathologyLogo") MultipartFile[] uploadfiles, HttpServletRequest request) {

			log.info("In uploadFileController uploadHospitalLogo()");
			try {
				for (MultipartFile file : uploadfiles) {

					if (file.isEmpty()) {
						continue;
					}
					ServletContext context = request.getServletContext();
					String fileName = file.getOriginalFilename();
	                String newpath=context.getRealPath("/images/Hospital/");
					java.io.File uploadPath = new java.io.File(newpath);
					if (!uploadPath.exists())
						uploadPath.mkdirs();

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