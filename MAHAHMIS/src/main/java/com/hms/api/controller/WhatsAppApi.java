package com.hms.api.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.Date;
import java.util.Properties;
import java.util.ResourceBundle;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.net.ssl.HttpsURLConnection;

import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.mail.smtp.SMTPTransport;

public class WhatsAppApi {
	public static void sendWhatsSMS() {
		try {
			RestTemplate template = new RestTemplate();
			// CreateObjectInput payload = new CreateObjectInput();

			HttpHeaders headers = new HttpHeaders();
			// headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
			// headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
			headers.set("apikey", "b7db496613cf440ec4d7933505c0a1d7");
			headers.set("Content-Type", "application/x-www-form-urlencoded");

			// HttpEntity requestEntity = new HttpEntity(headers);
			SmsBody smsBody = new SmsBody();
			smsBody.setType("text");
			smsBody.setText("Helooo");
			smsBody.setHSM("true");

			ObjectMapper mapper = new ObjectMapper();
			String json = mapper.writeValueAsString(smsBody);

			MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
			/*map.add("channel", "whatsapp");
			map.add("source", "917834811114");
			map.add("destination", "919665686910");
			map.add("message", json);*/


			HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(
					map, headers);

			ResponseEntity<String> response = template
					.exchange(
							"https://api.gupshup.io/sm/api/v1/msg?channel=whatsapp&source=917834811114&destination=917276564727&messag "
									+ json + "&src.name=Lifenity",
							HttpMethod.POST, request, String.class);

			

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void sendSMS(String mobileNo,String msg) {/*

		try {

			String username = "lifenity";
			String password = "Anurag@123";
			String sendername = "LWIREP";
			String apiKey = "O+YH81gfxgajy9NNOd2BnCBwH/YImGIAs9a2cc0aHug=";
			String clientId = "658b5dfc-7674-4874-ac30-123773263a43";
			
			String accurl = "https://api.mylogin.co.in/api/v2/SendSMS?";
			
			//String url="https://api.mylogin.co.in/api/v2/SendSMS?ApiKey=O+YH81gfxgajy9NNOd2BnCBwH/YImGIAs9a2cc0aHug=&ClientId=658b5dfc-7674-4874-ac30-123773263a43&SenderId=LWIREP&Message="+msg+"&MobileNumbers=91"+mobileNo+"&Is_Unicode=false&Is_Flash=false";
			
			String requestUrl = accurl + "ApiKey="
					+ URLEncoder.encode(apiKey, "UTF-8") + "&ClientId="
					+ URLEncoder.encode(clientId, "UTF-8") + "&SenderId="
					+ URLEncoder.encode(sendername, "UTF-8") + "&Message="
					+ URLEncoder.encode(msg, "UTF-8") + "&MobileNumbers=91"
					+ URLEncoder.encode(mobileNo, "UTF-8")
					+ "&Is_Unicode=false&Is_Flash=false";

			URL myURL = new URL(requestUrl);
			URLConnection myURLConnection = myURL.openConnection();
			BufferedReader in = new BufferedReader(new InputStreamReader(
					myURLConnection.getInputStream()));
			System.err.println("Message Print ---- : " + msg);
			System.err.println("Message Sent Successfully... : " + requestUrl);
			String decodedString;
			String retval = "";
			while ((decodedString = in.readLine()) != null) {
				retval += decodedString;
			}
			in.close();
			System.out.println("Message ---  : " + retval);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

	*/}
	
	public static void sendSmsUsingMsg91Domain(String mobileNo,String msg,String callfrom) {
		try {
			ResourceBundle resourceBundle = ResourceBundle.getBundle("SMSFormat");
			String authkey =(resourceBundle.getObject("authkey").toString());
			String sender =(resourceBundle.getObject("sender").toString());
			String mailSendFrom = resourceBundle.getObject("mailSendFrom").toString();
			
			//if(!tinyUrl.equalsIgnoreCase(null) || !tinyUrl.equalsIgnoreCase("")){
			
			//String authkey="357239AGS5NKYJIV6059a8e9P1";
			//String sender="AVANTE";
			//flow_id_registration="6070235f7765af6d21301532";
			//flow_id_report_send="6070238319282919a36affd5";
				
			String flow_id="";
			String SMS_BODY ="";
			
			if(callfrom.equalsIgnoreCase("registration")){
				
				String tinyUrl=convertUrlIntoTinyUrl(msg);//Method call for convert URL
				//System.err.println("tinyUrl tinyUrl === "+tinyUrl);	
				flow_id=resourceBundle.getObject("flow_id_registration").toString();
				 SMS_BODY ="{\n" + "\"flow_id\": \""+flow_id+"\",\r\n" +			
						 "\"sender\"	: \""+sender+"\",\r\n" +
						 "\"mobiles\"	: \"91"+mobileNo+"\",\r\n" +
						 "\"VAR1\"		: \"VALUE1\",\r\n" +
						 "\"VAR2\"		: \"VALUE2\",\r\n" +
						 "\"var\"		: \""+tinyUrl+"\"\r\n}";
				
			}else if(callfrom.equalsIgnoreCase("report_send")){
				
				String tinyUrl=convertUrlIntoTinyUrl(msg);//Method call for convert URL
				//System.err.println("tinyUrl tinyUrl === "+tinyUrl);	
				flow_id=resourceBundle.getObject("flow_id_report_send").toString();
				 SMS_BODY ="{\n" + "\"flow_id\": \""+flow_id+"\",\r\n" +			
						 "\"sender\"	: \""+sender+"\",\r\n" +
						 "\"mobiles\"	: \"91"+mobileNo+"\",\r\n" +
						 "\"VAR1\"		: \"VALUE1\",\r\n" +
						 "\"VAR2\"		: \"VALUE2\",\r\n" +
						 "\"var\"		: \""+tinyUrl+"\"\r\n}";
			}else if(callfrom.equalsIgnoreCase("pre_registartion_otp")){
				
				flow_id=resourceBundle.getObject("flow_id_pre_registartion_otp").toString();
				 SMS_BODY ="{\n" + "\"flow_id\": \""+flow_id+"\",\r\n" +			
						 "\"sender\"	: \""+sender+"\",\r\n" +
						 "\"mobiles\"	: \"91"+mobileNo+"\",\r\n" +
						 "\"VAR1\"		: \"VALUE1\",\r\n" +
						 "\"VAR2\"		: \"VALUE2\",\r\n" +
						 "\"var\"		: \""+msg+"\"\r\n}";
			}
			/*else if(callfrom.equalsIgnoreCase("online_registration_otp")){
				flow_id=resourceBundle.getObject("flow_id_online_registartion_otp").toString();
				System.out.println("inside online_registartion_otp::"+flow_id);
				 SMS_BODY ="{\n" + "\"flow_id\": \""+flow_id+"\",\r\n" +			
						 "\"sender\"	: \""+sender+"\",\r\n" +
						 "\"mobiles\"	: \"91"+mobileNo+"\",\r\n" +
						 "\"VAR1\"		: \"VALUE1\",\r\n" +
						 "\"VAR2\"		: \"VALUE2\",\r\n" +
						 "\"var\"		: \""+msg+"\"\r\n}";
			}*/
			else if(callfrom.equalsIgnoreCase("pre_registartion_token")){
				
				flow_id=resourceBundle.getObject("flow_id_pre_registartion_token").toString();
				 SMS_BODY ="{\n" + "\"flow_id\": \""+flow_id+"\",\r\n" +			
						 "\"sender\"	: \""+sender+"\",\r\n" +
						 "\"mobiles\"	: \"91"+mobileNo+"\",\r\n" +
						 "\"VAR1\"		: \"VALUE1\",\r\n" +
						 "\"VAR2\"		: \"VALUE2\",\r\n" +
						 "\"var\"		: \""+msg+"\"\r\n}";
			}
			 //System.err.println(SMS_BODY);
			
			
				URL url = new URL ("https://api.msg91.com/api/v5/flow/");			
				HttpsURLConnection con = (HttpsURLConnection)url.openConnection();
				con.setRequestMethod("POST");
				con.setRequestProperty("authkey", authkey);
				con.setRequestProperty("Content-Type", "application/json");
				con.setRequestProperty("Accept", "application/json");
				con.setDoOutput(true);			
				
					java.io.OutputStream oss = con.getOutputStream();
				    oss.write(SMS_BODY.getBytes());
				    oss.flush();
				    oss.close();
				    
				    BufferedReader inn = new BufferedReader(new InputStreamReader(
				    		con.getInputStream()));

					String decodedString;
					String retval = "";
					while ((decodedString = inn.readLine()) != null) {
						retval += decodedString;
					}
					inn.close();
				
		
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//This method is use for convert Large URL into Tiny URL - KishoR
	public static String convertUrlIntoTinyUrl(String fileUrl) {
		String response="";

		try {
			String accurl ="https://tinyurl.com/api-create.php?";
			String requestUrl = accurl + "url="
					+ URLEncoder.encode(fileUrl, "UTF-8")
					+ "&Is_Unicode=false&Is_Flash=false";

			URL myURL = new URL(requestUrl);
			URLConnection myURLConnection = myURL.openConnection();
			BufferedReader in = new BufferedReader(new InputStreamReader(
					myURLConnection.getInputStream()));
			
			String decodedString;
			String retval = "";
			while ((decodedString = in.readLine()) != null) {
				retval += decodedString;
			}
			in.close();
			//System.out.println("Message ---  : " + retval);
			response=retval;
		} catch (Exception e) {
			e.printStackTrace();
			response="";
		} 
		return response;
	}

	public static String sendEmailByLifenityDomainNew(String emailId, String mailSubject, String mailBody, String filePath,
			String fileName, String createdBy){
		String retval = "";
		try {
			String accurl = "http://betadiagnostics.lifenitycare.com/WEBSERVICE/LifenityLab.asmx/SendEmailWithPDF?";
			
			String requestUrl = accurl + "EmailId="
					+ emailId + "&MailSubject="
					+ mailSubject + "&MailBody="
					+ mailBody + "&FilePath="
					+ filePath + "&FileName="
					+ fileName + "&CreatedBy="
					+ createdBy;

			if(requestUrl.contains(" "))
				requestUrl = requestUrl.replace(" ", "%20");
			URL myURL = new URL(requestUrl);
			URLConnection myURLConnection = myURL.openConnection();
			BufferedReader in = new BufferedReader(new InputStreamReader(
					myURLConnection.getInputStream()));
			
			String decodedString;
			
			while ((decodedString = in.readLine()) != null) {
				retval += decodedString;
			}
			in.close();
			
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return retval;
	}
	
	public static String emailSendFromGmail(String emailId, String mailSubject, String mailBody, String filePath,
				String fileName, String createdBy,String mailCC) {

		String mailStatus = "";
		try {
			ResourceBundle resourceBundle = ResourceBundle.getBundle("SMSFormat");
            String host = resourceBundle.getObject("host").toString();
            String port = resourceBundle.getObject("port").toString();
            final String mailFrom = resourceBundle.getObject("mailFrom").toString();
            final String password = resourceBundle.getObject("password").toString();
            
			/*String host = "smtp.gmail.com";
			String port = "587";// "465";			
			final String mailFrom = "noreply@pluscare.org";
			final String password = "$XJrbX@5Sb";*/
			
			
			  /*final String mailFrom = "disha.s2infotech@gmail.com"; final
			  final String password = "disha@123";*/
			 
			/*final String mailFrom = "reports.lifenity@gmail.com";
			final String password = "cexraedexyrhahgl";*/
			
			// message info
			String mailTo = emailId;
			
			// sets SMTP server properties
			Properties properties = new Properties();
			properties.put("mail.smtp.host", host);
			properties.put("mail.smtp.port", port);
			properties.put("mail.smtp.auth", "true");
			properties.put("mail.smtp.starttls.enable", "true");
			properties.put("mail.user", mailFrom);
			properties.put("mail.password", password);
			properties.put("mail.smtp.ssl.trust", host);

			// creates a new session with an authenticator
			Authenticator auth = new Authenticator() {
				public PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(mailFrom, password);
				}
			};
			Session mailSession = Session.getInstance(properties, auth);
			// creates a new e-mail message
			Message msg = new MimeMessage(mailSession);
			msg.setFrom(new InternetAddress(mailFrom));
			InternetAddress[] toAddresses = { new InternetAddress(mailTo) };
			// InternetAddress[] CCAddresses = { new InternetAddress(mailCC) };
			msg.setRecipients(Message.RecipientType.TO, toAddresses);
			msg.setRecipients(Message.RecipientType.CC,InternetAddress.parse(mailCC));
			// msg.setRecipients(Message.RecipientType.CC, CCAddresses );
			msg.setSubject(mailSubject);
			msg.setSentDate(new Date());
			// creates message part
			MimeBodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setContent(mailBody, "text/html");
			// creates multi-part
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messageBodyPart);
			/*
			 * MimeBodyPart attachPart = new MimeBodyPart();
			 * attachPart.attachFile(filePath);
			 * multipart.addBodyPart(attachPart);
			 */
			// sets the multi-part as e-mail's content
			msg.setContent(multipart);

			// sends the e-mail
			// Transport.send(msg);

			SMTPTransport transport = (SMTPTransport) mailSession
					.getTransport("smtp");
			transport.connect(host, 587, mailFrom, password);

			transport.sendMessage(msg, msg.getAllRecipients());
			// you can get SMTP return code here
			int responseCode = transport.getLastReturnCode();
			String lastServerResponse = transport.getLastServerResponse();

			// 250 — Requested action taken and completed. This is the best
			// message for a sender to receive because it indicates that the
			// SMTP communication was successful. SMTP response code 250 is also
			// the most common response code in SMTP since it is issued in
			// response to every accepted command (likely 4 to 6 times per
			// message).
			if (responseCode == 250) {
				mailStatus = "Success";
			} else {
				mailStatus = "Fail";
			}

			//System.err.println("responseeee responseeee == " + responseCode);
			//System.err.println("lastServerResponse == " + lastServerResponse);

			/* -------------------send mail with gmail ends ------------- */
		} catch (Exception e) {
			e.printStackTrace();
			mailStatus = "Fail";
		}

		return mailStatus;
	}
	
	public static String sendBillReceiptFromGmail(String emailId, String mailSubject, String mailBody, String filePath,
			String fileName) {

	String mailStatus = "";
	try {
		ResourceBundle resourceBundle = ResourceBundle.getBundle("SMSFormat");
        String host = resourceBundle.getObject("host").toString();
        String port = resourceBundle.getObject("port").toString();
        final String mailFrom = resourceBundle.getObject("mailFrom").toString();
        final String password = resourceBundle.getObject("password").toString();
		
		/*String host = "smtp.gmail.com";
		String port = "587";// "465";
		final String mailFrom = "reports.lifenity@gmail.com";
		final String password = "cexraedexyrhahgl";*/
		// message info
		String mailTo = emailId;
		
		// sets SMTP server properties
		Properties properties = new Properties();
		properties.put("mail.smtp.host", host);
		properties.put("mail.smtp.port", port);
		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.user", mailFrom);
		properties.put("mail.password", password);
		properties.put("mail.smtp.ssl.trust", host);

		// creates a new session with an authenticator
		Authenticator auth = new Authenticator() {
			public PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(mailFrom, password);
			}
		};
		Session mailSession = Session.getInstance(properties, auth);
		// creates a new e-mail message
		Message msg = new MimeMessage(mailSession);
		msg.setFrom(new InternetAddress(mailFrom));
		InternetAddress[] toAddresses = { new InternetAddress(mailTo) };
		// InternetAddress[] CCAddresses = { new InternetAddress(mailCC) };
		msg.setRecipients(Message.RecipientType.TO, toAddresses);
		// msg.setRecipients(Message.RecipientType.CC,InternetAddress.parse(mailCC));
		// msg.setRecipients(Message.RecipientType.CC, CCAddresses );
		msg.setSubject(mailSubject);
		msg.setSentDate(new Date());
		// creates message part
		MimeBodyPart messageBodyPart = new MimeBodyPart();
		messageBodyPart.setContent(mailBody, "text/html");
		// creates multi-part
		Multipart multipart = new MimeMultipart();
		multipart.addBodyPart(messageBodyPart);
		MimeBodyPart attachPart = new MimeBodyPart();
		attachPart.attachFile(filePath);
		multipart.addBodyPart(attachPart);
		 
		// sets the multi-part as e-mail's content
		msg.setContent(multipart);

		// sends the e-mail
		// Transport.send(msg);

		SMTPTransport transport = (SMTPTransport) mailSession
				.getTransport("smtp");
		transport.connect(host, 587, mailFrom, password);

		transport.sendMessage(msg, msg.getAllRecipients());
		// you can get SMTP return code here
		int responseCode = transport.getLastReturnCode();
		String lastServerResponse = transport.getLastServerResponse();

		// 250 — Requested action taken and completed. This is the best
		// message for a sender to receive because it indicates that the
		// SMTP communication was successful. SMTP response code 250 is also
		// the most common response code in SMTP since it is issued in
		// response to every accepted command (likely 4 to 6 times per
		// message).
		if (responseCode == 250) {
			mailStatus = "Success";
		} else {
			mailStatus = "Fail";
		}

		//System.err.println("responseeee responseeee == " + responseCode);
		//System.err.println("lastServerResponse == " + lastServerResponse);

		/* -------------------send mail with gmail ends ------------- */
	} catch (Exception e) {
		e.printStackTrace();
		mailStatus = "Fail";
	}

		return mailStatus;
	}
	
	public static String sendEmailUsingMsg91Domain(String emailId, String mailSubject, String mailBody, String filePath,
			String fileName, String createdBy,String emailCC){
		String response="";
		try {
			ResourceBundle resourceBundle = ResourceBundle.getBundle("SMSFormat");
			String authkey =(resourceBundle.getObject("authkey").toString());
			String sender =(resourceBundle.getObject("sender").toString());
			String labName = resourceBundle.getObject("labName").toString();
			String mailSendFrom = resourceBundle.getObject("mailSendFrom").toString();
			
			String mailFrom = "";
			if(mailSendFrom.equalsIgnoreCase("Lifenity")) {
				mailFrom = "reports@lifenitywellness.in";
			}else if(mailSendFrom.equalsIgnoreCase("Plus Care")){
				mailFrom = "reports@pluscare.co.in";
			}else {
				mailFrom="khandekardayanand123@gmail.com";
			}
			
			String encoding = "UTF-8";

			String data = "apikey=" + URLEncoder.encode("4BEF2129BF1B77CD21DBB4EC2D42C0B173DC0046D076BAD5BF8DAE873D52945D5207A7992BB417AE99ACC789D557C1C0", encoding);
			data += "&from=" + URLEncoder.encode(mailFrom, encoding);
			data += "&fromName=" + URLEncoder.encode(labName, encoding);
			data += "&subject=" + URLEncoder.encode(mailSubject, encoding);
			data += "&bodyHtml=" + URLEncoder.encode(mailBody, encoding);
			data += "&msgTo=" + URLEncoder.encode(emailId, encoding);
			data += "&msgCC=" + URLEncoder.encode(emailCC, encoding);
			data += "&isTransactional=" + URLEncoder.encode("true", encoding);

			URL url = new URL("https://api.elasticemail.com/v2/email/send");
			URLConnection conn = url.openConnection();
			//conn.setRequestProperty("Content-Type", "application/json");
			//conn.setRequestProperty("Accept", "application/json");
			conn.setDoOutput(true);
			OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
			wr.write(data);
			wr.flush();
			BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String result = rd.readLine();
			wr.close();
			rd.close();

			JSONObject jsonResult = new JSONObject(result);
			String success = jsonResult.getString("success");
			
			if(success.equalsIgnoreCase("true")){
				response = "Success";
			}else{
				response = "Fail";
			}
				
			
/*		2	
			String MAIL_BODY = "";

			String toEmailSlpit[] = emailId.split(",");
			int toEmailCount = toEmailSlpit.length;

			MAIL_BODY = "{\"to\":[";

			for (int i = 0; i < toEmailCount; i++) {// if multiple toMail present

				MAIL_BODY = MAIL_BODY + "{\"name\":\"" + toEmailSlpit[i]
						+ "\",\"email\":\"" + toEmailSlpit[i] + "";
				if ((toEmailCount - 1) == i) {
					MAIL_BODY = MAIL_BODY + "\"}";
				} else {
					MAIL_BODY = MAIL_BODY + "\"},";
				}
			}
			MAIL_BODY = MAIL_BODY
					+ "],\"from\":{\"name\":\"Lifenity Wellness\",\"email\":\"reports@lifenitywellness.in\"},";

			if (emailCC.trim().length() > 0) { // if cc present
				String emailCCSlpit[] = emailCC.split(",");
				int emailCCCount = emailCCSlpit.length;

				MAIL_BODY = MAIL_BODY + "\"cc\":[";

				for (int i = 0; i < emailCCCount; i++) {// if multiple cc present

					MAIL_BODY = MAIL_BODY + "{\"email\":\"" + emailCCSlpit[i] + "";
					if ((emailCCCount - 1) == i) {
						MAIL_BODY = MAIL_BODY + "\"}";
					} else {
						MAIL_BODY = MAIL_BODY + "\"},";
					}

				}

				MAIL_BODY = MAIL_BODY + "],";
			} else {// if only one cc present
				MAIL_BODY = MAIL_BODY + "\"cc\":[],";
			}

			MAIL_BODY = MAIL_BODY
					+ "\"bcc\":[],\"mail_type_id\":\"1\",\"in_reply_to\":\"\",\"attachments\":[],\"subject\":\""
					+ mailSubject
					+ "\",\"body\":{\"data\":\""
					+ mailBody
					+ "\",\"type\":\"text/html\"},\"authkey\":\"357239AGS5NKYJIV6059a8e9P1\"}";*/
			
			/*MAIL_BODY = "{\"to\":[{\"name\":\""
					+ emailId
					+ "\",\"email\":\""
					+ emailId
					+ "\"}],\"from\":{\"name\":\"Lifenity Wellness\",\"email\":\" noreply@lifenitywellness.in\"},\"cc\":[],\"bcc\":[],\"mail_type_id\":\"2\",\"in_reply_to\":\"\",\"attachments\":[],\"subject\":\""
					+ mailSubject
					+ "\",\"body\":{\"data\":\""
					+ mailBody
					+ "\",\"type\":\"text/html\"},\"authkey\":\"357239AGS5NKYJIV6059a8e9P1\"}";*/
			
/*	2		 System.err.println(MAIL_BODY);	
			
			URL url = new URL ("https://api.msg91.com/api/v5/email/send");			
			HttpsURLConnection con = (HttpsURLConnection)url.openConnection();
			con.setRequestMethod("POST");
			//con.setRequestProperty("authkey", authkey);
			con.setRequestProperty("Content-Type", "application/json");
			con.setRequestProperty("Accept", "application/json");
			con.setDoOutput(true);			
			
				java.io.OutputStream oss = con.getOutputStream();
			    oss.write(MAIL_BODY.getBytes());
			    oss.flush();
			    oss.close();
			    
			    BufferedReader inn = new BufferedReader(new InputStreamReader(
			    		con.getInputStream()));

				String decodedString;
				String retval = "";
				while ((decodedString = inn.readLine()) != null) {
					retval += decodedString;
				}
				inn.close();
				
				if(retval.contains("success")){
					response="Success";
				}else{
					response="Fail";
				}
				
				System.err.println("------ Message ---  : " + retval);*/
				
		}catch (Exception e) {
			e.printStackTrace();
			response="Fail";
		}

		return response;
	}
	
	public static String emailSendFromGmailWithAttachment(String emailId, String mailSubject, String mailBody, String filePath,
			String fileName, String createdBy,String mailCC) {

		String mailStatus = "";
		try {
			ResourceBundle resourceBundle = ResourceBundle.getBundle("SMSFormat");
	        String host = resourceBundle.getObject("host").toString();
	        String port = resourceBundle.getObject("port").toString();
	        final String mailFrom = resourceBundle.getObject("mailFrom").toString();
	        final String password = resourceBundle.getObject("password").toString();
	        
			/*String host = "smtp.gmail.com";
			String port = "587";// "465";			
			final String mailFrom = "noreply@pluscare.org";
			final String password = "$XJrbX@5Sb";*/
			
			
			  /*final String mailFrom = "disha.s2infotech@gmail.com"; final
			  final String password = "disha@123";*/
			 
			/*final String mailFrom = "reports.lifenity@gmail.com";
			final String password = "cexraedexyrhahgl";*/
			
			// message info
			String mailTo = emailId;
			
			// sets SMTP server properties
			Properties properties = new Properties();
			properties.put("mail.smtp.host", host);
			properties.put("mail.smtp.port", port);
			properties.put("mail.smtp.auth", "true");
			properties.put("mail.smtp.starttls.enable", "true");
			properties.put("mail.user", mailFrom);
			properties.put("mail.password", password);
			properties.put("mail.smtp.ssl.trust", host);
	
			// creates a new session with an authenticator
			Authenticator auth = new Authenticator() {
				public PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(mailFrom, password);
				}
			};
			Session mailSession = Session.getInstance(properties, auth);
			// creates a new e-mail message
			Message msg = new MimeMessage(mailSession);
			msg.setFrom(new InternetAddress(mailFrom));
			InternetAddress[] toAddresses = { new InternetAddress(mailTo) };
			// InternetAddress[] CCAddresses = { new InternetAddress(mailCC) };
			msg.setRecipients(Message.RecipientType.TO, toAddresses);
			msg.setRecipients(Message.RecipientType.CC,InternetAddress.parse(mailCC));
			// msg.setRecipients(Message.RecipientType.CC, CCAddresses );
			msg.setSubject(mailSubject);
			msg.setSentDate(new Date());
			// creates message part
			MimeBodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setContent(mailBody, "text/html");
			// creates multi-part
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messageBodyPart);
			
			MimeBodyPart attachPart = new MimeBodyPart();
			attachPart.attachFile(filePath);
			multipart.addBodyPart(attachPart);
			 
			// sets the multi-part as e-mail's content
			msg.setContent(multipart);
	
			// sends the e-mail
			// Transport.send(msg);
	
			SMTPTransport transport = (SMTPTransport) mailSession
					.getTransport("smtp");
			transport.connect(host, 587, mailFrom, password);
	
			transport.sendMessage(msg, msg.getAllRecipients());
			// you can get SMTP return code here
			int responseCode = transport.getLastReturnCode();
			String lastServerResponse = transport.getLastServerResponse();
	
			// 250 — Requested action taken and completed. This is the best
			// message for a sender to receive because it indicates that the
			// SMTP communication was successful. SMTP response code 250 is also
			// the most common response code in SMTP since it is issued in
			// response to every accepted command (likely 4 to 6 times per
			// message).
			if (responseCode == 250) {
				mailStatus = "Success";
			} else {
				mailStatus = "Fail";
			}
	
			//System.err.println("responseeee responseeee == " + responseCode);
			//System.err.println("lastServerResponse == " + lastServerResponse);
	
			/* -------------------send mail with gmail ends ------------- */
		} catch (Exception e) {
			e.printStackTrace();
			mailStatus = "Fail";
		}
	
		return mailStatus;
	}
}