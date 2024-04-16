package com.hms.utility;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ResourceBundle;

public class SendSMSAllFormat {

	public static void sendSMS(String parUsername, String parPassword,
			String parSendername, String parAccurl, String parMobileNo,
			String parMessage) {
		try {

			/*String username = parUsername.toString();
			String password = parPassword.toString();
			String sendername = parSendername.toString();
			String accurl = parAccurl;*/
			
			ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
			String hospitalName = bundle.getObject("hospitalname").toString();
			//String message=bundle.getObject("msg").toString();
			String user=bundle.getObject("user").toString();
			String password=bundle.getObject("password").toString();
			String senderID=bundle.getObject("senderid").toString();
			
			String message=parMessage.toString();
			
			String requestUrl="";
			
			if(hospitalName.equalsIgnoreCase("vatslya"))
			{
				requestUrl="http://www.smsindia.mobi/sendurlcomma.aspx?user=20073460&pwd=20073460321&senderid=Vatslya&mobileno="+parMobileNo+"&msgtext="+URLEncoder.encode(message, "UTF-8")+"";
  
			}
			else if(hospitalName.equalsIgnoreCase("MITR"))
			{
				requestUrl="http://www.perfectbulksms.com/Sendsmsapi.aspx?USERID=mitrtrans&PASSWORD=32147281&SENDERID=TMMITR&To="+parMobileNo+"&MESSAGE="+URLEncoder.encode(message, "UTF-8")+"";
			}
			//Added By Rahul
			else if(hospitalName.equalsIgnoreCase("palve"))
			{
				//requestUrl="http://bulksms.mysmsmantra.com:8080/WebSMS/SMSAPI.jsp?username=Risingpune&password=435157140&sendername=RISING&mobileno="+parMobileNo+"&message="+URLEncoder.encode(message, "UTF-8")+"";
				/*
				 * requestUrl="http://bulksms.mysmsmantra.com:8080/WebSMS/SMSAPI.jsp?username="
				 * + URLEncoder.encode(user, "UTF-8") + "&password=" +
				 * URLEncoder.encode(password, "UTF-8") +"&sendername=" +
				 * URLEncoder.encode(senderID, "UTF-8") +"&mobileno=91" +
				 * URLEncoder.encode(parMobileNo, "UTF-8") +"&message="+
				 * URLEncoder.encode(message, "UTF-8")+"";
				 */
				String	ApiKey="PA9MQ2xKCkCnPFHBYVITchdQXHfftQZBC4Wq4t3Xk3o=";
				String	ClientId="abf9a974-35c9-4431-b7ad-7bc1e5764300";
				String Is_Unicode="false";
				String Is_Flash="false";
				requestUrl="https://api.mylogin.co.in/api/v2/SendSMS?ApiKey="
						+ URLEncoder.encode(ApiKey, "UTF-8") + "&ClientId="
								+ URLEncoder.encode(ClientId, "UTF-8") + "&SenderId="
										+ URLEncoder.encode(senderID, "UTF-8")  + "&Message="
						+ URLEncoder.encode(message, "UTF-8") +"&MobileNumbers=91"
							+	URLEncoder.encode(parMobileNo, "UTF-8") + "&Is_Unicode="
								+ URLEncoder.encode(Is_Unicode, "UTF-8") +"&Is_Flash="
						+ URLEncoder.encode(Is_Flash, "UTF-8") +"";
			}
			
//			URL myURL = new URL(requestUrl);
//			URLConnection myURLConnection = myURL.openConnection();
//			BufferedReader in = new BufferedReader(new InputStreamReader(myURLConnection.getInputStream()));
//			System.out.println("Message Sent Successfully... : " + requestUrl);
//			in.close();
			
			//Added By Rahul
			URL myURL = new URL(requestUrl);
			HttpURLConnection myURLConnection = (HttpURLConnection) myURL.openConnection();
							  myURLConnection.setRequestMethod("GET");
							  
			int status = myURLConnection.getResponseCode();
			
			boolean redirect = false;

			if (status != HttpURLConnection.HTTP_OK) {
				if (status == HttpURLConnection.HTTP_MOVED_TEMP
					|| status == HttpURLConnection.HTTP_MOVED_PERM
						|| status == HttpURLConnection.HTTP_SEE_OTHER)
				redirect = true;
			}
			
			if(redirect){
				
				String newUrl = myURLConnection.getHeaderField("Location");
				String cookies = myURLConnection.getHeaderField("Set-Cookie");
				
				myURLConnection = (HttpURLConnection) new URL(newUrl).openConnection();
				myURLConnection.setRequestProperty("Cookie", cookies);
				myURLConnection.setRequestMethod("GET");
			}
			
			BufferedReader in = new BufferedReader(new InputStreamReader(myURLConnection.getInputStream()));
			System.out.println("Message Sent Successfully... : " + requestUrl);
			in.close();
			myURLConnection.disconnect();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}
