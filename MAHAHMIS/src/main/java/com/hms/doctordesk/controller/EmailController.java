package com.hms.doctordesk.controller;

import java.io.IOException;
import java.util.Date;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
@RequestMapping(value="/email")
public class EmailController {
	static Logger log=Logger.getLogger(EmailController.class.getName());
	
	@RequestMapping(value = "/emailSendingPatinetTest", method = RequestMethod.POST)
  	public @ResponseBody String emailSendingPatinetTest(@RequestParam("emailTo") String emailTo,@RequestParam("emailCC") String emailCC,@RequestParam("massageId") String massageId,HttpServletRequest request,HttpServletResponse res) {
  	String msssg="";
  	String host = "smtp.gmail.com";
    String port = "587";//"465";
    final String mailFrom = "client.s2infotech@gmail.com";
    final String password ="orcasys123";
    
    // message info
      String mailTo = emailTo;
      String mailCC = emailCC;
      String subject = "Patient Report Soft Copy";
      String message = massageId;
      
   // sets SMTP server properties
      Properties properties = new Properties();
      properties.put("mail.smtp.host", host);
      properties.put("mail.smtp.port", port);
      properties.put("mail.smtp.auth", "true");
      properties.put("mail.smtp.starttls.enable", "true");
      properties.put("mail.user", mailFrom);
      properties.put("mail.password", password);
      
      Authenticator auth = new Authenticator() {
          public PasswordAuthentication getPasswordAuthentication() {
              return new PasswordAuthentication(mailFrom, password);
          }
  };
  try{
  
  	Session mailSession = Session.getInstance(properties, auth);
  	 // creates a new e-mail message
    Message msg = new MimeMessage(mailSession);
    msg.setFrom(new InternetAddress(mailFrom));
    InternetAddress[] toAddresses = { new InternetAddress(mailTo) };
    //InternetAddress[] CCAddresses = { new InternetAddress(mailCC) };
    msg.setRecipients(Message.RecipientType.TO, toAddresses);
    msg.setRecipients(Message.RecipientType.CC,InternetAddress.parse(mailCC));
         //msg.setRecipients(Message.RecipientType.CC, CCAddresses );
    msg.setSubject(subject);
    msg.setText(message);
    msg.setSentDate(new Date());
         // creates message part
  // MimeBodyPart messageBodyPart = new MimeBodyPart();
   
    //messageBodyPart.setContent(message, "text/html");	   
         // creates multi-part
  /*  Multipart multipart = new MimeMultipart();
    multipart.addBodyPart(messageBodyPart);			
    MimeBodyPart attachPart = new MimeBodyPart();
    String filename="C:/Users/Acs/Downloads/Opd_treatment.pdf";
    DataSource source= new FileDataSource(filename);
    messageBodyPart.setDataHandler(new DataHandler(source));
    messageBodyPart.setFileName(filename);
    multipart.addBodyPart(messageBodyPart);	                  
         // sets the multi-part as e-mail's content
        msg.setContent(multipart);*/
 
         // sends the e-mail
         Transport.send(msg);
         System.out.println("Back to Accession Successfully");
  }catch (MessagingException e) {
      e.printStackTrace();
	  
  }
    //msg1="Back To Accession Successfully";	  	 
  	return msssg;
  }
	
	
}
