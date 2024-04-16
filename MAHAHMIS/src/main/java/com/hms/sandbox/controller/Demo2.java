package com.hms.sandbox.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.UUID;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class Demo2 {

	@SuppressWarnings("unchecked")
	public static String generateToken() {

		String clientId = "SBX_001584";
		String clientSecret = "d6efe4f9-c497-4a5c-bd16-21e415bf21fb";

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("clientId", clientId);
		jsonObject.put("clientSecret", clientSecret);

		String accesToken = "";

		String urlname = "https://dev.abdm.gov.in/gateway/v0.5/sessions";
		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setDoOutput(true);
			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			if (conn.getResponseCode() != 200) {
				throw new RuntimeException(
						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			String output = br.readLine();
			org.json.JSONObject json = new org.json.JSONObject(output);
			System.out.println(json);
			accesToken = json.getString("accessToken");
			conn.disconnect();
			// ObjectMapper mapper = new ObjectMapper();

		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return accesToken;
	}

	@SuppressWarnings("unchecked")
	public static String addCareContext(String date) {

		String output = "";

//		{
//			  "requestId": "{{$guid}}",
//			  "timestamp": "{{timestamp}}",
//			  "link": {
//			    "accessToken": "eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJkYXlhbmFuZGtoYW5kZWthckBzYngiLCJyZXF1ZXN0ZXJUeXBlIjoiSElQIiwicmVxdWVzdGVySWQiOiJISVBITUlTIiwicGF0aWVudElkIjoiZGF5YW5hbmRraGFuZGVrYXJAc2J4Iiwic2Vzc2lvbklkIjoiZGM4YmE5YzYtNWRjMC00Y2EwLWFkN2EtYzllNDMyOTgyYmUxIiwiZXhwIjoxNjYzODM4NjA4LCJpYXQiOjE2NjM3NTIyMDh9.cSI1Gb7OvcECzcFpXIK8GI7WGe7oCa2h11LH4U-C0812Y7tvv9FbluwvdmOFOu4l0-Kr3fG_Jnzn3eKgvSzL1rncV9yelM_7Zo43xQuOpmv0KhJau4a5VOSmdfjmI0mJjyEcQ8Hd9hj7MDojZ9guu7bD7hjp-s0CVafvGhBMOM5raHgImjyPrw9-NO-46cmiAB_CqDNA1NzqT5Fz-bW9tMS_0xBtPYRRz5FUzguDOzAwks4Il3HcSfp0VsPLmLWv1La0RONGqZuNbzWk2ABYnPRK6mUCQiRQDjSyQvdO7qMcoNaqldsOqs86YxYXdD1SA1PHIeW3OiikndL-lY6TRA",
//			    "patient": {
//			      "referenceNumber": "TEST-001",
//			      "display": "asdefjehf",
//			      "careContexts": [
//			        {
//			          "referenceNumber": "DK001",
//			          "display": "Diagnosis Report"
//			        },
//			        {
//			            
//			        }
//			      ]
//			    }
//			  }
//			}

		UUID uuid = UUID.randomUUID();

		JSONArray careContextsArray = new JSONArray();

		JSONObject careContextObj = new JSONObject();
		careContextObj.put("referenceNumber", "");
		careContextObj.put("display", "");

		careContextsArray.add(careContextObj);

		JSONObject patientObj = new JSONObject();
		patientObj.put("referenceNumber", "");
		patientObj.put("display", "");
		patientObj.put("careContexts", careContextsArray);

		JSONObject links = new JSONObject();
		links.put("accessToken", "");
		links.put("patient", patientObj);

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("requestId", uuid.toString());
		jsonObject.put("timestamp", "2022-09-21T17:13:27.331Z");
		jsonObject.put("links", links);

		String generateToken = generateToken();

		String urlname = "https://dev.abdm.gov.in/gateway/v0.5/links/link/add-contexts";

		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("X-CM-ID", "sbx");
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			System.out.println(conn.getResponseCode());

			if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
				throw new RuntimeException(
						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();

			conn.disconnect();

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return output;
	}

	public static void main(String[] args) {

	}
}
