package com.hms.utility;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ResourceBundle;
import java.net.HttpURLConnection;

public class SendSMSNoble {
	


	public static void sendSMS(String parSendername, String pMobileNo,int pid,String pname,int depId) {
		try {

			//String username = parUsername.toString();
		//	String password = parPassword.toString();
		//	String sendername = parSendername.toString();
			//String accurl = parAccurl;
			
			String depName="";
			if(depId==1){
				
				depName = "OPD";
			}else if(depId==2){
				
				depName = "IPD";
			}else{
				
				depName = "Diagnosis";
			}
			
			System.err.println(pMobileNo);
			ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
			String hospitalName = bundle.getObject("hospitalname").toString();
			String message=bundle.getObject("msg").toString();
			String user=bundle.getObject("user").toString();
			String password=bundle.getObject("password").toString();
			String senderID=bundle.getObject("senderid").toString();
			message =pname+ "," + message+", Your PNR:"+pid+".";
			String tempMsg="Dear Patient, Thank you for visiting 'SHRADDHA HOSPITAL',Barshi.Your SHID is -"+pid+". Contact:02184 224466/222762 www.shraddhahospitals.in";
			String requestUrl="";
			
			if(hospitalName.equalsIgnoreCase("Shraddha"))
			{
				
				requestUrl="http://bulksms.mysmsmantra.com:8080/WebSMS/SMSAPI.jsp?username="
						+ URLEncoder.encode(user, "UTF-8") + "&password="
						+ URLEncoder.encode(password, "UTF-8") +"&sendername="
						+ URLEncoder.encode(senderID, "UTF-8") +"&mobileno=91"
						+ URLEncoder.encode(pMobileNo, "UTF-8") +"&message="+
				URLEncoder.encode(tempMsg, "UTF-8")+"&fl=0&dc=8&gwid=2"; 
				//requestUrl="http://login.smsdhamaka.com/vendorsms/pushsms.aspx?user="+user+"&password="+password+"&msisdn="+pMobileNo+"&sid="+senderID+"&msg="+URLEncoder.encode(tempMsg, "UTF-8")+"&fl=0&dc=8&gwid=2";//"&fl=0&gwid=2";
				System.err.println("Url====================>"+requestUrl);
			}else if(hospitalName.equalsIgnoreCase("Meesha")){	          

		        //  requestUrl = "http://enterprise.smsgupshup.com/GatewayAPI/rest?method=SendMessage&send_to=91" + URLEncoder.encode(pMobileNo, "UTF-8") + "&msg=" + URLEncoder.encode(tempMsg, "UTF-8") + "&msg_type=TEXT&userid=" + URLEncoder.encode(user, "UTF-8") + "&auth_scheme=plain&password=" + URLEncoder.encode(password, "UTF-8") + "&v=1.1&format=text";
		    

		    	 bundle = ResourceBundle
						.getBundle("SMSFormat");
			
				
				String registrationMessageForRising = bundle.getObject(
						"RegistrationForMeesha").toString();
		    	String replacePatientName = registrationMessageForRising
						.replaceAll("Patient_Name",pname);

				String convertPatientId = Integer.toString(pid);

				String replacePatientId = replacePatientName
						.replaceAll("Patient_Id", (convertPatientId));

				String	ApiKey="PA9MQ2xKCkCnPFHBYVITchdQXHfftQZBC4Wq4t3Xk3o=";
				String	ClientId="abf9a974-35c9-4431-b7ad-7bc1e5764300";
				String Is_Unicode="false";
				String Is_Flash="false";
				requestUrl="https://api.mylogin.co.in/api/v2/SendSMS?ApiKey="
						+ URLEncoder.encode(ApiKey, "UTF-8") + "&ClientId="
								+ URLEncoder.encode(ClientId, "UTF-8") + "&SenderId="
										+ URLEncoder.encode(senderID, "UTF-8")  + "&Message="
						+ URLEncoder.encode(replacePatientId, "UTF-8") +"&MobileNumbers=91"
							+	URLEncoder.encode(pMobileNo, "UTF-8") + "&Is_Unicode="
								+ URLEncoder.encode(Is_Unicode, "UTF-8") +"&Is_Flash="
						+ URLEncoder.encode(Is_Flash, "UTF-8") +"";
			
			
			}else if(hospitalName.equalsIgnoreCase("rising"))
			{
		    	 bundle = ResourceBundle
						.getBundle("SMSFormat");
			
				
				String registrationMessageForRising = bundle.getObject(
						"RegistrationForRising").toString();
		    	String replacePatientName = registrationMessageForRising
						.replaceAll("Patient_Name",pname);

				String convertPatientId = Integer.toString(pid);

				String replacePatientId = replacePatientName
						.replaceAll("Patient_Id", (convertPatientId));
				//requestUrl="http://bulksms.mysmsmantra.com:8080/WebSMS/SMSAPI.jsp?username=Risingpune&password=435157140&sendername=RISING&mobileno="+pMobileNo+"&message="+URLEncoder.encode(replacePatientId, "UTF-8")+"";
				requestUrl="http://bulksms.mysmsmantra.com:8080/WebSMS/SMSAPI.jsp?username="
						+ URLEncoder.encode(user, "UTF-8") + "&password="
						+ URLEncoder.encode(password, "UTF-8") +"&sendername="
						+ URLEncoder.encode(senderID, "UTF-8") +"&mobileno=91"
						+ URLEncoder.encode(pMobileNo, "UTF-8") +"&message="+
						  URLEncoder.encode(replacePatientId, "UTF-8")+""; 
			}else if(hospitalName.equalsIgnoreCase("palve"))
			{
		    	 bundle = ResourceBundle
						.getBundle("SMSFormat");
			
				
				String registrationMessageForRising = bundle.getObject(
						"RegistrationForPalve").toString();
		    	String replacePatientName = registrationMessageForRising
						.replaceAll("Patient_Name",pname);

				String convertPatientId = Integer.toString(pid);

				String replacePatientId = replacePatientName
						.replaceAll("Patient_Id", (convertPatientId));

				String	ApiKey="PA9MQ2xKCkCnPFHBYVITchdQXHfftQZBC4Wq4t3Xk3o=";
				String	ClientId="abf9a974-35c9-4431-b7ad-7bc1e5764300";
				String Is_Unicode="false";
				String Is_Flash="false";
				requestUrl="https://api.mylogin.co.in/api/v2/SendSMS?ApiKey="
						+ URLEncoder.encode(ApiKey, "UTF-8") + "&ClientId="
								+ URLEncoder.encode(ClientId, "UTF-8") + "&SenderId="
										+ URLEncoder.encode(senderID, "UTF-8")  + "&Message="
						+ URLEncoder.encode(replacePatientId, "UTF-8") +"&MobileNumbers=91"
							+	URLEncoder.encode(pMobileNo, "UTF-8") + "&Is_Unicode="
								+ URLEncoder.encode(Is_Unicode, "UTF-8") +"&Is_Flash="
						+ URLEncoder.encode(Is_Flash, "UTF-8") +"";
			}
			
			//Commented By Rahul
			
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
