package com.hms.histopath.controller;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.ResourceBundle;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

//import com.hms.administrator.dto.BusinessCustMasterDto;
//import com.hms.adminstrator.service.BusinessCustMasterService;
import com.hms.histopath.dto.HistoPathReportDTO;
import com.hms.histopath.dto.HistopathMaster;
import com.hms.histopath.service.HistopathActionService;
import com.hms.pathology.dto.FilePathPathology;
import com.sun.mail.smtp.SMTPTransport;

@Controller
@RequestMapping(value = "/histopathAction")
public class HistopathActionController {

	@Autowired
	HistopathActionService histopathActionService;

	//@Autowired
	//BusinessCustMasterService businessMasterService;

	@RequestMapping(value = "/uploadDmsDoc", method = RequestMethod.POST)
	@ResponseBody
	public Integer uploadDocuments(@RequestParam("documentFile") MultipartFile[] uploadfiles,
			@RequestParam("folderName") String folderName, @RequestParam("note") String note,
			@RequestParam("histopathMasterId") Integer histopathMasterId,HttpServletRequest request) {
		try {
			
			HttpSession httpSession = request.getSession();
			Integer userId = (Integer) httpSession.getAttribute("userId1");
			
			List<HistoPathReportDTO> list = new ArrayList<>();
			int bufferSize = 2048;
			for (MultipartFile file : uploadfiles) {

				if (file.isEmpty()) {
					continue;
				}
				java.io.File uploadPath = new java.io.File(FilePathPathology.getHistoDocPath());

				if (!uploadPath.exists())
					uploadPath.mkdirs();
				String fileName = file.getOriginalFilename();
				String filepath = Paths.get(uploadPath.toString(), fileName).toString();
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)),
						bufferSize);
				stream.write(file.getBytes());
				stream.close();

				HistoPathReportDTO dto = new HistoPathReportDTO();
				dto.setCreatedBy(userId);
				dto.setDocumentpath(fileName);
				dto.setEmailStatus("N");
				dto.setCreatedDate(new Date());
				dto.setLabel(note);
				dto.setHistopathMasterId(histopathMasterId);
				list.add(dto);
			}

			int response = histopathActionService.uploadDocuments(list);

		} catch (Exception e) {

			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/getHistoPathReportDoc", method = RequestMethod.POST)
	public @ResponseBody HistoPathReportDTO getHistoPathReportDoc(@RequestParam("masterid") Integer masterid) {
		List<HistoPathReportDTO> listupload = new ArrayList<HistoPathReportDTO>();
		listupload = histopathActionService.getHistoPathReportDoc(masterid);
		HistoPathReportDTO obj = new HistoPathReportDTO();
		obj.setHistoPathReportDTO(listupload);
		return obj;
	}

	/********************************************************************
	 * @author Kranti Godse
	 * @since 07-05-2021
	 **********************************************************************/

	@RequestMapping(value = "/readDocuments", method = RequestMethod.GET)
	@ResponseBody
	public void readCertificate(@RequestParam("fileName") String fileName, @RequestParam("id") String id,
			HttpServletResponse response) {
		String filePath = FilePathPathology.getHistoDocPath();
		try {
			if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png")
					|| fileName.endsWith(".gif")) {
				// System.out.println(" image "+fileName);
				java.io.File file = new java.io.File(filePath + java.io.File.separator + fileName);
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
				String reportDestination = filePath + java.io.File.separator + fileName;
				// System.out.println(" image "+reportDestination);
				FileInputStream fileInputStream = new FileInputStream(new java.io.File(reportDestination));
				org.apache.commons.io.IOUtils.copy(fileInputStream, response.getOutputStream());
				response.setContentType("application/pdf");
				response.setHeader("Content-Disposition", "attachment; filename=" + reportDestination);
				response.flushBuffer();
			} else {

				String reportDestination = filePath + java.io.File.separator + fileName;
				FileInputStream fileInputStream = new FileInputStream(new java.io.File(reportDestination));
				org.apache.commons.io.IOUtils.copy(fileInputStream, response.getOutputStream());
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/********************************************************************
	 * @author Kranti Godse
	 * @since 07-05-2021
	 **********************************************************************/

	@RequestMapping(value = "/deleteHistoPathDocument", method = RequestMethod.POST)
	public @ResponseBody String deleteOutSourceUploadedDocument(@RequestParam("id") Integer id,
			HttpServletRequest request) {
		boolean response = histopathActionService.deleteHistoPathDocument(id, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}

	/********************************************************************
	 * @author Kranti Godse
	 * @since 11-05-2021
	 **********************************************************************/

	@RequestMapping(value = "/reportingEmail", method = RequestMethod.POST)
	public @ResponseBody String reportingEmail(@RequestParam("id") String idList,
			@RequestParam("emailTo") String emailTo, @RequestParam("emailCC") String emailCC,
			@RequestParam("patientName") String patientName, HttpServletRequest request) {

		try {
			ResourceBundle resourceBundle = ResourceBundle.getBundle("SMSFormat");
            String host = resourceBundle.getObject("host").toString();
            String port = resourceBundle.getObject("port").toString();
            final String mailFrom = resourceBundle.getObject("mailFrom").toString();
            final String password = resourceBundle.getObject("password").toString();
            String labName = resourceBundle.getObject("labName").toString();
            String regards = resourceBundle.getObject("regards").toString();
            
			/*String host = "smtp.gmail.com";
			String port = "587";// "465";
			final String mailFrom = "reports.lifenity@gmail.com";
			final String password = "cexraedexyrhahgl";*/

			// message info
			String mailTo = emailTo;
			String mailCC = emailCC;
			String subject = labName+" Report";
			String message = "Dear <b>" + patientName + "</b>," + "<br>" + "<br>" +

					"Thank you for registering with us." + "<br>"
					+ " Please find your  <b>Lab Test Report</b> attached herewith." + "<br>" + "<br>" +

					" Conditions on reporting" + "<br>" + "1.This is a computer generated report." + "<br>"
					+ "2.Partial reproduction of this report is not permitted." + "<br>" + "" + "<br>"
					+ "<b>Regards</b>," + "<br>" + "<b>"+regards+"</b>" + "<br>" + "<br>" +

					"<b>Disclaimer -</b>" + "<br>"
					+ "<i>This e-mail may contain confidential information which is the property of "+labName+". It is intended only for the use of the individual or entity to which it is addressed. If you are not "
					+ "<br>"
					+ " the intended recipient, you are not authorized to read,retain,copy, print,distribute or use the contents of this e-mail. If you have received this communication in error please notify the "
					+ "<br>"
					+ " sender & delete all copies of this message. "+labName+" does not accept any liability for virus infected mails</i>.";
			// sets SMTP server properties
			Properties properties = new Properties();
			properties.put("mail.smtp.host", host);
			properties.put("mail.smtp.port", port);
			properties.put("mail.smtp.auth", "true");
			properties.put("mail.smtp.starttls.enable", "true");
			properties.put("mail.user", mailFrom);
			properties.put("mail.password", password);

			// creates a new session with an authenticator
			Authenticator auth = new Authenticator() {
				public PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(mailFrom, password);
				}
			};
			String filePath = FilePathPathology.getHistoDocPath();
			// java.io.File file = new java.io.File(filePath + java.io.File.separator +
			// fileName);
			Session mailSession = Session.getInstance(properties, auth);
			// creates a new e-mail message
			Message msg = new MimeMessage(mailSession);
			msg.setFrom(new InternetAddress(mailFrom));
			// InternetAddress[] toAddresses = { new InternetAddress(mailTo) };
			// InternetAddress[] CCAddresses = { new InternetAddress(mailCC) };
			msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(mailTo));
			msg.setRecipients(Message.RecipientType.CC, InternetAddress.parse(mailCC));
			// msg.setRecipients(Message.RecipientType.CC, CCAddresses );
			msg.setSubject(subject);
			msg.setSentDate(new Date());
			// creates message part
			MimeBodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setContent(message, "text/html");
			// creates multi-part
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messageBodyPart);
			// MimeBodyPart attachPart = new MimeBodyPart();
			// attachPart.attachFile(file);
			// multipart.addBodyPart(attachPart);
			// sets the multi-part as e-mail's content
			String[] document = idList.split("/");
			if (document != null && document.length > 0) {
				for (String filePath1 : document) {
					MimeBodyPart attachPart = new MimeBodyPart();
					HistoPathReportDTO dto = histopathActionService
							.getHistoPathReportDocById(Integer.parseInt(filePath1));
					try {
						attachPart.attachFile(filePath + java.io.File.separator + dto.getDocumentpath());
					} catch (IOException ex) {
						ex.printStackTrace();
					}

					multipart.addBodyPart(attachPart);
				}
			}
			msg.setContent(multipart);

			// sends the e-mail
			// Transport.send(msg);
			String mailStatus = "N";
			SMTPTransport transport = (SMTPTransport) mailSession.getTransport("smtp");
			transport.connect(host, 587, mailFrom, password);

			transport.sendMessage(msg, msg.getAllRecipients());
			// you can get SMTP return code here
			int responseCode = transport.getLastReturnCode();
			// String lastServerResponse = transport.getLastServerResponse();

			// 250 — Requested action taken and completed. This is the best
			// message for a sender to receive because it indicates that the
			// SMTP communication was successful. SMTP response code 250 is also
			// the most common response code in SMTP since it is issued in
			// response to every accepted command (likely 4 to 6 times per
			// message).
			if (responseCode == 250) {
				mailStatus = "Y";
			} else {
				mailStatus = "N";
			}

			System.err.println("mailStatus.." + mailStatus);
			histopathActionService.updateEmailStatus(document, mailStatus);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return "Email send successfully.";
	}

	/*@RequestMapping(value = "/getBusinessLabMasterById", method = RequestMethod.GET)
	@ResponseBody
	public BusinessCustMasterDto getBusinessLabMasterById(@RequestParam("id") Integer businessMasterId) {
		BusinessCustMasterDto businessLabMasterDto = new BusinessCustMasterDto();
		businessLabMasterDto = businessMasterService.getBusinessLabMasterById(businessMasterId);
		return businessLabMasterDto;
	}*/
	
	@RequestMapping(value = "/getHistopathMasterById", method = RequestMethod.GET)
	@ResponseBody
	public HistopathMaster getHistopathMasterById(@RequestParam("id") Integer masterId) {
		HistopathMaster dto = new HistopathMaster();
		dto = histopathActionService.getHistopathMasterById(masterId);
		return dto;
	}

}
