package com.hms.utility;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

public class SendSMS {

	public void sendSMS(String mobileno, String message) {

		try {

			String username = "Shraddha99";
			String password = "1362987751";
			String sendername = "SHHOSP";
			String accurl = "http://bulksms.mysmsmantra.com:8080/WebSMS/SMSAPI.jsp?";

			String requestUrl = accurl + "username="
					+ URLEncoder.encode(username, "UTF-8") + "&password="
					+ URLEncoder.encode(password, "UTF-8") + "&sendername="
					+ URLEncoder.encode(sendername, "UTF-8") + "&mobileno="
					+ URLEncoder.encode(mobileno, "UTF-8") + "&message="
					+ URLEncoder.encode(message, "UTF-8")
					+ "&responseformat=html";

			URL myURL = new URL(requestUrl);
			URLConnection myURLConnection = myURL.openConnection();
			BufferedReader in = new BufferedReader(new InputStreamReader(
					myURLConnection.getInputStream()));
			System.out.println("Message Sent Successfully... : " + requestUrl);
			in.close();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
}
