package com.hms.sandbox.controller;


import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.sandbox.dto.ConsentDTO;
import com.hms.sandbox.dto.SandBoxPatientInfo;
import com.hms.sandbox.dto.SandboxData;
import com.hms.sandbox.dto.SandboxDocumentDTO;
import com.hms.sandbox.encryption.SandboxResponse;
import com.hms.sandbox.encryption.SandboxResponse2;
import com.hms.sandbox.service.HIPSandBoxService;
import com.hms.sandbox.service.ISandboxReportService;
import com.hms.sandbox.service.ISandboxService;
import com.itextpdf.text.pdf.PdfStructTreeController.returnType;

import groovy.util.logging.Slf4j;

/******
 * @author :Vishant Pawar
 * @Date :15-09-2022
 *****/

@Controller
@RequestMapping(value = "/sandbox")
@Slf4j
public class SandboxAPIController {
	
	//final static String urlabdmApi="https://healthidsbx.abdm.gov.in/api";
	
	ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	final String sandboxURL = resourceBundleEha.getObject("sandboxURL").toString();
	
	final String HIP_HIU_URL = resourceBundleEha.getObject("HIP_HIU_URL").toString();
	final String consentManager = resourceBundleEha.getObject("sandboxConsentManager").toString();
	
	@Autowired
	public ISandboxService sandboxService;
	
	@Autowired
	public ISandboxReportService sandboxReport;
	
	@Autowired
	public HIPSandBoxService hipsandboxService;
	
	final String sumaSoftUrl="https://nha-suma-azb7fa3pfa-el.a.run.app/";

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/session", method = RequestMethod.POST)
	public  String generateToken() {

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

		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return accesToken;

	}

	@SuppressWarnings("unchecked")
	public String createToken() {

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
			ObjectMapper mapper = new ObjectMapper();

		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return accesToken;
	}

	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping(value = "/searchByMobile", method = RequestMethod.POST)
	public String searchByMobile(@RequestParam("mobile") String mobile) {

//		String clientId="SBX_001584";
//		String clientSecret="d6efe4f9-c497-4a5c-bd16-21e415bf21fb";
		String generateToken = createToken();

		String output = "";
		org.json.JSONObject json = null;

//		String[] yearOfBirth = birthDate.split("/");
//		if (gender.equalsIgnoreCase("Male")) {
//			gender = "M";
//		} else if (gender.equalsIgnoreCase("Female")) {
//			gender = "F";
//		}

		JSONObject jsonObject = new JSONObject();
		//jsonObject.put("gender", gender);
		jsonObject.put("mobile", mobile);
//		jsonObject.put("name", name);
//		jsonObject.put("yearOfBirth", yearOfBirth[2]);

//		String urlname = "https://healthidsbx.abdm.gov.in/api/v1/search/searchByMobile";
		String urlname = sandboxURL +"v1/search/searchByMobile";
		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);
			//conn.setRequestProperty("X-CM-ID", "sbx");
			conn.setRequestProperty("X-CM-ID", consentManager);
			

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			if (conn.getResponseCode() != 200) {
				
				InputStream errorStream = conn.getErrorStream();
				String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
				return result;
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
			json = new org.json.JSONObject(output);
			conn.disconnect();
			ObjectMapper mapper = new ObjectMapper();

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return output;
	}

	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping(value = "/searchByHealthId", method = RequestMethod.POST)
	public SandboxResponse2 searchByHealthId(@RequestParam("healthId") String healthId) {

		String generateToken = createToken();
		SandboxResponse2 response2 = new SandboxResponse2();

		String output = "";

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("healthId", healthId);

//		String urlname = "https://healthidsbx.abdm.gov.in/api/v1/search/searchByHealthId";
		String urlname = sandboxURL+"v1/search/searchByHealthId";
		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			if (conn.getResponseCode() != 200) {
				
				InputStream errorStream = conn.getErrorStream();
				String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
				response2.setResultError(result);
				return response2;
				
//				System.out.println(result);
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
			response2.setResultData(output);

			conn.disconnect();

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return response2;
	}

	@SuppressWarnings({ "unchecked", "null" })
	@ResponseBody
	@RequestMapping(value = "/generateOtp", method = RequestMethod.POST)
	public SandboxResponse generateOtp(@RequestParam("aadhaar") String aadhaar,
			HttpServletRequest request) {

		String generateToken = createToken();
		
		SandboxResponse response = new SandboxResponse();
		
		HttpSession session = request.getSession(true);
		String hospitalHIPUnitId = (String) session.getAttribute("hospitalHIPUnitId");
		
		String output = "";

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("aadhaar", aadhaar);

//		String urlname = "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/generateOtp";
		String urlname = sandboxURL+"v1/registration/aadhaar/generateOtp";
		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("X-HIP-ID", hospitalHIPUnitId);
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			if (conn.getResponseCode() != 200) {
				
				InputStream errorStream = conn.getErrorStream();
				String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
				System.out.println(result);
				response.setErrorResult(result);
				return response;
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
			org.json.JSONObject jsonObject2 = new org.json.JSONObject(output);
			
			response.setTxnId(jsonObject2.getString("txnId"));
			conn.disconnect();
			return response;

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping(value = "/verifyOTP", method = RequestMethod.POST)
	public SandboxResponse verifyOTP(@RequestParam("otp") String verifyOTP, @RequestParam("txnId") String txnId,
			HttpServletRequest request) {

		String generateToken = createToken();
		
		SandboxResponse response = new SandboxResponse();
		
		HttpSession session = request.getSession(true);
		String hospitalHIPUnitId = (String) session.getAttribute("hospitalHIPUnitId");

		String output = "";

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("otp", verifyOTP);
		jsonObject.put("txnId", txnId);

//		String urlname = "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/verifyOTP";
		String urlname = sandboxURL+"v1/registration/aadhaar/verifyOTP";
		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			//conn.setRequestProperty("X-HIP-ID", "HIPHMIS");
			conn.setRequestProperty("X-HIP-ID", hospitalHIPUnitId);
			
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			if (conn.getResponseCode() != 200) {
				
				InputStream errorStream = conn.getErrorStream();
				String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
				System.out.println(result);
				response.setErrorResult(result);
				return response;
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
			org.json.JSONObject jsonObject2 = new org.json.JSONObject(output);
			
			response.setTxnId(jsonObject2.getString("txnId"));
			conn.disconnect();
			return response;

			

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping(value = "/generateMobileOTP", method = RequestMethod.POST)
	public SandboxResponse generateMobileOTP(@RequestParam("mobile") String mobileOTP, @RequestParam("txnId") String txnId,
			HttpServletRequest request) {

		String generateToken = createToken();
		SandboxResponse response = new SandboxResponse();
		
		HttpSession session = request.getSession(true);
		String hospitalHIPUnitId = (String) session.getAttribute("hospitalHIPUnitId");

		String output = "";

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("mobile", mobileOTP);
		jsonObject.put("txnId", txnId);

//		String urlname = "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/generateMobileOTP";
		String urlname = sandboxURL+"v1/registration/aadhaar/generateMobileOTP";
		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
//			conn.setRequestProperty("X-HIP-ID", "HIPHMIS");
			conn.setRequestProperty("X-HIP-ID", hospitalHIPUnitId);
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			if (conn.getResponseCode() != 200) {
				
				InputStream errorStream = conn.getErrorStream();
				String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
				System.out.println(result);
				response.setErrorResult(result);
				return response;
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
			org.json.JSONObject jsonObject2 = new org.json.JSONObject(output);
			
			response.setTxnId(jsonObject2.getString("txnId"));
			conn.disconnect();
			return response;

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping(value = "/verifyMobileOTP", method = RequestMethod.POST)
	public SandboxResponse verifyMobileOTP(@RequestParam("otp") String verifyMobileOTP, @RequestParam("txnId") String txnId,
			HttpServletRequest request) {

		String generateToken = createToken();
		
		SandboxResponse response = new SandboxResponse();
		
		HttpSession session = request.getSession(true);
		String hospitalHIPUnitId = (String) session.getAttribute("hospitalHIPUnitId");

		String output = "";

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("otp", verifyMobileOTP);
		jsonObject.put("txnId", txnId);

//		String urlname = "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/verifyMobileOTP";
		String urlname = sandboxURL+"v1/registration/aadhaar/verifyMobileOTP";
		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
//			conn.setRequestProperty("X-HIP-ID", "HIPHMIS");
			conn.setRequestProperty("X-HIP-ID", hospitalHIPUnitId);
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			if (conn.getResponseCode() != 200) {
				
				InputStream errorStream = conn.getErrorStream();
				String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
				System.out.println(result);
				response.setErrorResult(result);
				return response;
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
			org.json.JSONObject jsonObject2 = new org.json.JSONObject(output);
			
			response.setTxnId(jsonObject2.getString("txnId"));
			conn.disconnect();
			return response;

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping(value = "/createHealthIdWithPreVerified", method = RequestMethod.POST)
	public SandboxResponse createHealthIdWithPreVerified(@RequestParam("fName") String fName,
			@RequestParam("mName") String mName, @RequestParam("lName") String lName,
			@RequestParam("email") String email, @RequestParam("healthId") String healthId,
			@RequestParam("password") String password, @RequestParam("txnId") String txnId) {

		String generateToken = createToken();
		
		SandboxResponse sandres = new SandboxResponse();

		String output = "";

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("healthId", healthId);
		jsonObject.put("txnId", txnId);

//		String urlname = "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/createHealthIdWithPreVerified";
		String urlname = sandboxURL+"v1/registration/aadhaar/createHealthIdWithPreVerified";
		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			System.out.println("response code------------"+conn.getResponseCode());
			if (conn.getResponseCode() != 200) {

				InputStream errorStream = conn.getErrorStream();
				String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
				System.out.println(result);
				sandres.setErrorResult(result);
				return sandres;
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
			org.json.JSONObject jsonObject2 = new org.json.JSONObject(output);
			
			sandres.setFirstName(jsonObject2.get("firstName").toString());
			sandres.setMiddleName(jsonObject2.get("middleName").toString());
			sandres.setLastName(jsonObject2.get("lastName").toString());
			sandres.setDayOfBirth(jsonObject2.get("dayOfBirth").toString());
			sandres.setDistrictCode(jsonObject2.get("districtCode").toString());
			sandres.setDistrictName(jsonObject2.get("districtName").toString());
			sandres.setEmail(jsonObject2.get("email").toString());
			sandres.setGender(jsonObject2.get("gender").toString());
			sandres.setHealthId(jsonObject2.get("healthId").toString());
			sandres.setHealthIdNumber(jsonObject2.get("healthIdNumber").toString());
			sandres.setMobile(jsonObject2.get("mobile").toString());
			sandres.setMonthOfBirth(jsonObject2.get("monthOfBirth").toString());
			sandres.setName(jsonObject2.get("name").toString());
			sandres.setStateCode(jsonObject2.get("stateCode").toString());
			sandres.setStateName(jsonObject2.get("stateName").toString());
			sandres.setYearOfBirth(jsonObject2.get("yearOfBirth").toString());
			conn.disconnect();
			return sandres;

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	@SuppressWarnings({ "unchecked", "unused" })
	@RequestMapping(value = "/consentRequest", method = RequestMethod.POST)
	@ResponseBody
	public SandboxResponse2 sendConsentRequest(@RequestParam("json") String json) {

		String output = "";
		UUID uuid = UUID.randomUUID();
		SandboxResponse2 sandboxResponse2 = new SandboxResponse2();
		
		Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
		String currentDate = instant.toString();

		JsonParser jsonParser = new JsonParser();
		JsonObject jsonData = (JsonObject) jsonParser.parse(json);
		String patientName = jsonData.get("patientName").getAsString();
//		JsonElement jsonElement2 = jsonData.get("patientName");
		
//		int patientId = jsonData.get("patientId").getAsInt();
		
		HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
				.currentRequestAttributes()).getRequest();
		HttpSession session = httpServletRequest.getSession(true);
		
		
		
		String healthId = jsonData.get("healthId").getAsString();
		SandBoxPatientInfo sandboxPatientById = hipsandboxService.getSandboxPatient(healthId);
		
		
		
//		String healthId = sandboxPatientById.getHelathId();
		System.out.println("healthId--------------"+healthId);
		session.setAttribute("consentHealthId", healthId);
		
		String healthId1 = (String) session.getAttribute("consentHealthId");
		System.out.println("healthId in session--------------"+healthId1);

		List<ConsentDTO> listSaveConsent = new ArrayList<>();
		List<String> arr = new ArrayList<>();
		JSONObject purpose = new JSONObject();
		purpose.put("text", jsonData.get("code"));
		purpose.put("code", "CAREMGT");

		JSONObject patient = new JSONObject();
		patient.put("id", healthId);

		JSONObject hiu = new JSONObject();
		hiu.put("id", "HIUHMIS");

		JSONObject identifier = new JSONObject();
		identifier.put("type", "REGNO");
		identifier.put("value", "MH1001");
		identifier.put("system", "https://www.mciindia.org");

		JSONObject requester = new JSONObject();
		requester.put("name", jsonData.get("consentDoctorName"));
		requester.put("identifier", identifier);

		JSONArray hiTypes = new JSONArray();
		// String res = "";

		// String arr[]= new String[4];

		if (jsonData.get("prescription").getAsString().equals("Y")) {

			hiTypes.add("Prescription");
			arr.add("Prescription");
		}
		if (jsonData.get("diagnosticReport").getAsString().equals("Y")) {
			hiTypes.add("DiagnosticReport");
			arr.add("DiagnosticReport");
			// arr[1]="DiagnosticReport,";
		}
		if (jsonData.get("dischargeSummary").getAsString().equals("Y")) {

			hiTypes.add("DischargeSummary");
			arr.add("DischargeSummary");
			// arr[2]="DischargeSummary,";
		}
		if (jsonData.get("opConsultation").getAsString().equals("Y")) {
			hiTypes.add("OPConsultation");
			arr.add("OPConsultation");
			// arr[3]="OPConsultation";
		}

		// String listString = String.join(", ", arr);

		JSONObject dateRange = new JSONObject();
		dateRange.put("from", jsonData.get("formDate"));
		dateRange.put("to", jsonData.get("toDate"));

		JSONObject frequency = new JSONObject();
		frequency.put("unit", "HOUR");
		frequency.put("value", 1);
		frequency.put("repeats", 0);

		JSONObject permission = new JSONObject();
		permission.put("accessMode", "VIEW");
		permission.put("dataEraseAt", jsonData.get("consentExpiry"));
		permission.put("dateRange", dateRange);
		permission.put("frequency", frequency);

		JSONObject consent = new JSONObject();
		consent.put("purpose", purpose);
		consent.put("patient", patient);
		consent.put("hiu", hiu);
		consent.put("requester", requester);
		consent.put("hiTypes", hiTypes);
		consent.put("permission", permission);

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("requestId", uuid.toString());
		jsonObject.put("timestamp", currentDate);
		jsonObject.put("consent", consent);

		String generateToken = generateToken();

//		String urlname = "https://dev.abdm.gov.in/gateway/v0.5/consent-requests/init";
		
		String urlname = HIP_HIU_URL+"v0.5/consent-requests/init";
		
		try {

			URL url = new URL(urlname);

			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
//			conn.setRequestProperty("X-CM-ID", "sbx");
			conn.setRequestProperty("X-CM-ID", consentManager);
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			System.out.println(conn.getResponseCode());

			if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {

				InputStream errorStream = conn.getErrorStream();
				String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
				System.out.println(result);
				
				sandboxResponse2.setResultError(result);
				return sandboxResponse2;
				
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
				// return "HTTP error code :" + conn.getResponseCode() + " HTTP message " +
				// conn.getResponseMessage();
			}

			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
			sandboxResponse2.setResultData(output);

			if (conn.getResponseCode() == 202) {

				
				ConsentDTO consentDTO = new ConsentDTO();
				consentDTO.setPatientName(patientName);
				consentDTO.setConsentPurpose(jsonData.get("code").getAsString());
				consentDTO.setDateRangeFrom(jsonData.get("formDate").getAsString());
				consentDTO.setDateRangeTo(jsonData.get("toDate").getAsString());
				consentDTO.setDataEraseAt(jsonData.get("consentExpiry").getAsString());
				consentDTO.setHiTypes(arr.toString());
				consentDTO.setDoctorName(jsonData.get("consentDoctorName").getAsString());
				consentDTO.setHealthId(healthId);
				consentDTO.setRequestStatus("Request Initiated");
				consentDTO.setRequestId(uuid.toString());

				// jsonObject.entrySet().iterator()
				listSaveConsent = sandboxService.saveConsent(consentDTO);
			}

			conn.disconnect();

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return sandboxResponse2;
	}
	
	
	
	@RequestMapping(value = "/getConsentData", method = RequestMethod.GET)
	@ResponseBody
	public List<ConsentDTO> getConsentData() {
		
		List<ConsentDTO> consentData = sandboxService.getConsentData();
		return consentData;
		
		
	}
	
	@RequestMapping(value = "/getDecryptedData", method = RequestMethod.POST)
	@ResponseBody
	public ConsentDTO getDecryptedData(@RequestParam("id") int id) {
		
		
		ConsentDTO consentData = sandboxService.getDecryptedData(id);
		return consentData;
		
		
	}

	 @SuppressWarnings("unchecked")
		@ResponseBody
		@RequestMapping(value = "/authConfirm1", method = RequestMethod.POST)
		public void  authConfirm(@RequestParam ("patientId") int patientId, @RequestParam("callFrom")  String callFrom){
		 
		 sandboxService.authConfirm(patientId, callFrom);
		 
	 }
	 
	    @SuppressWarnings("unchecked")
	    @ResponseBody
		@RequestMapping(value = "/authInit", method = RequestMethod.POST)
		public String authInit1(@RequestParam("healthId") String healthId,
				@RequestParam("authType") String authType,@RequestParam("purpose") String purpose,
				HttpServletRequest request){
			 
			 
			 	String output = "";
			 	
			 	HttpSession session = request.getSession(true);
			 	String hospitalHIPUnitId = (String) session.getAttribute("hospitalHIPUnitId");
			 	
				String generateToken = generateToken();

//				JSONObject jsonObject = new JSONObject();

				Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
				String currentDate = instant.toString();

				JSONObject jsonObject = new JSONObject();
				
				JSONObject requester = new JSONObject();
				requester.put("type", "HIP");
//				requester.put("id", "HIPHMIS");
				requester.put("id", hospitalHIPUnitId);

				UUID uuid = UUID.randomUUID();

				JSONObject query = new JSONObject();
				query.put("id", healthId);
				query.put("purpose", purpose);
				query.put("authMode", authType);
				query.put("requester", requester);

				jsonObject.put("requestId", uuid.toString());
				jsonObject.put("timestamp", currentDate);
				jsonObject.put("query", query);			

//				String urlname = "https://dev.abdm.gov.in/gateway/v0.5/users/auth/init";
				
				String urlname = HIP_HIU_URL+"v0.5/users/auth/init";
				
				try {

					URL url = new URL(urlname);

					HttpURLConnection conn = (HttpURLConnection) url.openConnection();
					conn.setDoOutput(true);
					conn.setRequestMethod("POST");
					conn.setRequestProperty("Content-Type", "application/json");
//					conn.setRequestProperty("charset", "utf-8");
//					conn.setRequestProperty("X-CM-ID", "sbx");
					conn.setRequestProperty("X-CM-ID", consentManager);
					conn.setRequestProperty("Authorization", "Bearer " + generateToken);

					OutputStream os = conn.getOutputStream();
					os.write(jsonObject.toString().getBytes());
					os.flush();
					os.close();

					System.out.println(conn.getResponseCode());

					if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
						
						InputStream errorStream = conn.getErrorStream();
						String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
						return result;
//						throw new RuntimeException(
//								"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
					}
					BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

					output = br.readLine();
					
					sandboxService.saveAuthInit(healthId, uuid.toString());
				
					return output;
//				
				} catch (Exception ex) {
					ex.printStackTrace();
				}
				return output;
		 }
	    
	    
	    @SuppressWarnings("unchecked")
	    @ResponseBody
		@RequestMapping(value = "/authConfirmWithMobile", method = RequestMethod.POST)
		public String authConfirmWithMobile(@RequestParam("otp") String otp,@RequestParam("healthId") String healthId){
			 
			 	String output = "";

				String generateToken = generateToken();

				Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
				String currentDate = instant.toString();

				JSONObject jsonObject = new JSONObject();
				
				SandBoxPatientInfo sandboxPatient = hipsandboxService.getSandboxPatient(healthId);
				
				
				UUID uuid = UUID.randomUUID();
				
				JSONObject credential = new JSONObject();
				credential.put("authCode", otp);
//				credential.put("demographic", demographic);
		
				
				jsonObject.put("requestId", uuid.toString());
				jsonObject.put("timestamp", currentDate);
				jsonObject.put("transactionId", sandboxPatient.getAuthInitTransactionId());
				jsonObject.put("credential", credential);
		
				
//				String urlname = "https://dev.abdm.gov.in/gateway/v0.5/users/auth/confirm";
				
				String urlname = HIP_HIU_URL+"v0.5/users/auth/confirm";
		
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
						
						InputStream errorStream = conn.getErrorStream();
						String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
						return result;
//						throw new RuntimeException(
//								"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
					}
					
					BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
		
					output = br.readLine();
					
		
					conn.disconnect();
					sandboxService.saveAuthConfirm(healthId, uuid.toString());
					return output;
				   }
					
					catch (Exception e) {
						e.printStackTrace();
					}
					return output;
		 }
	    
	    @SuppressWarnings("unchecked")
	    @ResponseBody
		@RequestMapping(value = "/authConfirmWithDemographic", method = RequestMethod.POST)
		public String authConfirmWithDemographic(@RequestParam("fullName") String fullName,
				@RequestParam("gender") String gender,@RequestParam("dob") String dob,@RequestParam("healthId") String healthId){
			 
			 
			 	String output = "";

				String generateToken = generateToken();

//				JSONObject jsonObject = new JSONObject();

				Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
				String currentDate = instant.toString();

				JSONObject jsonObject = new JSONObject();
				
				UUID uuid = UUID.randomUUID();
				
				//fetching patient info by health id
				
				
				SandBoxPatientInfo sandBoxPatientInfo = hipsandboxService.getSandboxPatient(healthId);
							
				JSONObject demographic = new JSONObject();
				//String[] split = dob.split("-");
				//String dateOfBirth= split[2]+"-"+split[1]+"-"+split[0];
				demographic.put("name", fullName);
				demographic.put("gender", gender);
				demographic.put("dateOfBirth", dob);
		
				JSONObject credential = new JSONObject();
//				credential.put("authCode", "");
				credential.put("demographic", demographic);
		
				
				jsonObject.put("requestId", uuid.toString());
				jsonObject.put("timestamp", currentDate);
				jsonObject.put("transactionId", sandBoxPatientInfo.getAuthInitTransactionId());
				jsonObject.put("credential", credential);
		
				
//				String urlname = "https://dev.abdm.gov.in/gateway/v0.5/users/auth/confirm";
				
				String urlname = HIP_HIU_URL+"v0.5/users/auth/confirm";
		
				try {
					URL url = new URL(urlname);
					HttpURLConnection conn = (HttpURLConnection) url.openConnection();
					conn.setDoOutput(true);
					conn.setRequestMethod("POST");
					conn.setRequestProperty("Content-Type", "application/json");
					conn.setRequestProperty("charset", "utf-8");
//					conn.setRequestProperty("X-CM-ID", "sbx");
					conn.setRequestProperty("X-CM-ID", consentManager);
					conn.setRequestProperty("Authorization", "Bearer " + generateToken);
		
					OutputStream os = conn.getOutputStream();
					os.write(jsonObject.toString().getBytes());
					os.flush();
					os.close();
		
					System.out.println(conn.getResponseCode());
		
					if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
						
						InputStream errorStream = conn.getErrorStream();
						String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
						return result;
//						throw new RuntimeException(
//								"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
					}
					
					BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
		
					output = br.readLine();
					sandboxService.saveAuthConfirm(healthId, uuid.toString());
					
					conn.disconnect();
					return output;
				   }
					
					catch (Exception e) {
						e.printStackTrace();
					}
					return output;
		 }
		 
		 @SuppressWarnings("unchecked")
		@ResponseBody
		@RequestMapping(value = "/confirmWithMobileOTP5", method = RequestMethod.POST)
		public String confirmWithMobileOTP(@RequestParam("otp") String otp,
				@RequestParam("txnId") String txnId){
			 
			 
			 	String output = "";

				String generateToken = generateToken();

				Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
				String currentDate = instant.toString();

				JSONObject requester = new JSONObject();
				requester.put("otp", otp);
				requester.put("txnId", txnId); //health id

				UUID uuid = UUID.randomUUID();			

//				String urlname = "https://nha-suma-azb7fa3pfa-el.a.run.app/v1/auth/confirmWithMobileOTP";
//				String urlname = "https://healthidsbx.abdm.gov.in/api/v1/auth/confirmWithMobileOTP";
				
				String urlname = sandboxURL+"v1/auth/confirmWithMobileOTP";
				try {

					URL url = new URL(urlname);

					HttpURLConnection conn = (HttpURLConnection) url.openConnection();
					conn.setDoOutput(true);
					conn.setRequestMethod("POST");
					conn.setRequestProperty("Content-Type", "application/json");
					conn.setRequestProperty("charset", "utf-8");
					//conn.setRequestProperty("X-CM-ID", "sbx");
					conn.setRequestProperty("Authorization", "Bearer " + generateToken);

					OutputStream os = conn.getOutputStream();
					os.write(requester.toString().getBytes());
					os.flush();
					os.close();

					System.out.println(conn.getResponseCode());

					if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
						
						InputStream errorStream = conn.getErrorStream();
						String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
						return result;
//						throw new RuntimeException(
//								"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
					}
					BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

					output = br.readLine();
					return output;
		       
					// start  update auth init request id in ehat_patient_sandbox table
					
				} catch (Exception ex) {
					ex.printStackTrace();
				}
				return output;
		 }
		 
		 @SuppressWarnings("unchecked")
		@ResponseBody
			@RequestMapping(value = "/confirmWithAadharOTP5", method = RequestMethod.POST)
			public String confirmWithAadharOTP(@RequestParam("otp") String otp,
					@RequestParam("txnId") String txnId){
				 
				 
				 	String output = "";

					String generateToken = generateToken();

					

					Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
					String currentDate = instant.toString();

					JSONObject requester = new JSONObject();
					requester.put("otp", otp);
					requester.put("txnId", txnId); //health id

					UUID uuid = UUID.randomUUID();			

//					String urlname = "https://nha-suma-azb7fa3pfa-el.a.run.app/v1/auth/confirmWithAadhaarOtp";
//					String urlname = "https://healthidsbx.abdm.gov.in/api/v1/auth/confirmWithAadhaarOtp";
					
					String urlname = sandboxURL+"v1/auth/confirmWithAadhaarOtp";
					
					try {

						URL url = new URL(urlname);

						HttpURLConnection conn = (HttpURLConnection) url.openConnection();
						conn.setDoOutput(true);
						conn.setRequestMethod("POST");
						conn.setRequestProperty("Content-Type", "application/json");
						conn.setRequestProperty("charset", "utf-8");
						//conn.setRequestProperty("X-CM-ID", "sbx");
						conn.setRequestProperty("Authorization", "Bearer " + generateToken);

						OutputStream os = conn.getOutputStream();
						os.write(requester.toString().getBytes());
						os.flush();
						os.close();

						System.out.println(conn.getResponseCode());

						if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
							
							InputStream errorStream = conn.getErrorStream();
							String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
							return result;
//							throw new RuntimeException(
//									"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
						}
						BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

						output = br.readLine();
						return output;
			       
						// start  update auth init request id in ehat_patient_sandbox table
						
					} catch (Exception ex) {
						ex.printStackTrace();
					}
					return output;
			 }
	 
		// @author : Dayanand khandekar @reason : To Generate the otp for documentatation
		 @SuppressWarnings("unchecked")
		@ResponseBody
			@RequestMapping(value = "/generateOtpForDocument", method = RequestMethod.POST)
			public SandboxResponse generateOtpForDocument(@RequestParam("mobileNo") String mobileNo,
					HttpServletRequest request) {

				String generateToken = createToken();
				SandboxResponse response = new SandboxResponse();
				
				HttpSession session = request.getSession(true);
				String hospitalHIPUnitId = (String) session.getAttribute("hospitalHIPUnitId");
				
				String output = "";

				JSONObject jsonObject = new JSONObject();
				jsonObject.put("mobile", mobileNo);

				//String urlname = "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/generateOtp";
				//String urlname = "https://healthidsbx.abdm.gov.in/api/v2/document/generate/mobile/otp";
//				String urlname = urlabdmApi+"/v2/document/generate/mobile/otp";
				String urlname = sandboxURL+"v2/document/generate/mobile/otp";
				
				
				try {
					URL url = new URL(urlname);
					HttpURLConnection conn = (HttpURLConnection) url.openConnection();
					conn.setDoOutput(true);
					conn.setRequestMethod("POST");
					conn.setRequestProperty("Content-Type", "application/json");
					conn.setRequestProperty("charset", "utf-8");
//					conn.setRequestProperty("X-HIP-ID", "HIPHMIS");
					conn.setRequestProperty("X-HIP-ID", hospitalHIPUnitId);
					conn.setRequestProperty("Authorization", "Bearer " + generateToken);

					OutputStream os = conn.getOutputStream();
					os.write(jsonObject.toString().getBytes());
					os.flush();
					os.close();

					if (conn.getResponseCode() != 200) {
						
						InputStream errorStream = conn.getErrorStream();
						String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
						response.setErrorResult(result);
						return response;
//						throw new RuntimeException(
//								"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
					}
					BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

					output = br.readLine();
					org.json.JSONObject jsonObject2 = new org.json.JSONObject(output);
					
					response.setTxnId(jsonObject2.getString("txnId"));
					conn.disconnect();
					return response;

				} catch (Exception ex) {
					ex.printStackTrace();
				}
				return null;
			}

		 @ResponseBody
			@RequestMapping(value = "/verifyMobileOTPForDocument", method = RequestMethod.POST)
			public SandboxResponse verifyMobileOTPForDocument(@RequestParam("otp") String otp, @RequestParam("txnId") String txnId) {
			  return   sandboxService.verifyMobileOTPForDocument(otp, txnId);
		 }
                   
		
		 @ResponseBody
			@RequestMapping(value = "/generateHealtIdByDocument", method = RequestMethod.POST)
			public SandboxResponse generateHealtIdByDocument(SandboxDocumentDTO obj,HttpServletRequest request) {
			  return   sandboxService.generateHealtIdByDocument(obj,request);
		 }
		 
		 
		 @ResponseBody
			@RequestMapping(value = "/verifyDocument", method = RequestMethod.POST)
			public SandboxResponse verifyDocument(SandboxDocumentDTO obj,HttpServletRequest request) {
			  return   sandboxService.generateHealtIdByDocument(obj,request);
		 }
      
		 @SuppressWarnings("unchecked")
			@ResponseBody
			@RequestMapping(value = "/patientFind", method = RequestMethod.POST)
			public String patientFind(@RequestParam("healthId") String healthId) {

				String generateToken = createToken();

				String output = "";		
				
				Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
				String currentDate = instant.toString();
				
				UUID uuid = UUID.randomUUID();
				JSONObject jsonObject = new JSONObject();
				
				JSONObject query = new JSONObject();
				
				JSONObject patient = new JSONObject();
				patient.put("id", healthId);
				
				JSONObject requester = new JSONObject();
				requester.put("type", "HIU");
				requester.put("id", "HIUHMIS");
				
				query.put("requester", requester);
				query.put("patient", patient);

				
				jsonObject.put("requestId", uuid.toString());
				jsonObject.put("timestamp", currentDate);
				jsonObject.put("query", query);
				
//				String urlname = "https://healthidsbx.abdm.gov.in/api/v1/search/searchByHealthId";
//				String urlname = "https://dev.abdm.gov.in/gateway/v0.5/patients/find";
				
				String urlname = HIP_HIU_URL+"v0.5/patients/find";
				
				try {
					URL url = new URL(urlname);
					HttpURLConnection conn = (HttpURLConnection) url.openConnection();
					conn.setDoOutput(true);
					conn.setRequestMethod("POST");
					conn.setRequestProperty("Content-Type", "application/json");
					conn.setRequestProperty("charset", "utf-8");
//					conn.setRequestProperty("X-CM-ID", "sbx");
					conn.setRequestProperty("X-CM-ID", consentManager);
					conn.setRequestProperty("Authorization", "Bearer " + generateToken);

					OutputStream os = conn.getOutputStream();
					os.write(jsonObject.toString().getBytes());
					os.flush();
					os.close();

					if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
						
						InputStream errorStream = conn.getErrorStream();
						String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
						return result;
//						throw new RuntimeException(
//								"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
					}
					BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

					output = br.readLine();

					conn.disconnect();

				} catch (Exception ex) {
					ex.printStackTrace();
				}
				return output;
			}  
		 
		 
		    @SuppressWarnings("unchecked")
			@ResponseBody
			@RequestMapping(value = "/notifyViaSMS", method = RequestMethod.POST)
			public String notifyViaSMS(@RequestParam("mobileNo") String mobileNo,@RequestParam("hospitalName") String hospitalName,
					HttpServletRequest request) {

				String generateToken = createToken();

				HttpSession session = request.getSession(true);
				String hospitalHIPUnitId = (String) session.getAttribute("hospitalHIPUnitId");
				
				String output = "";

				Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
				String currentDate = instant.toString();
				
				UUID uuid = UUID.randomUUID();
				JSONObject jsonObject = new JSONObject();
				
				JSONObject notification = new JSONObject();
				notification.put("phoneNo", mobileNo);
				
				
				JSONObject hip = new JSONObject();
				hip.put("name", hospitalName);
				hip.put("id", hospitalHIPUnitId);
//				hip.put("id", "HIPHMIS");
				

				
				jsonObject.put("requestId", uuid.toString());
				jsonObject.put("timestamp", currentDate);
				
//				String urlname = "https://dev.abdm.gov.in/gateway/v0.5/patients/sms/notify2";
				String urlname = HIP_HIU_URL+"v0.5/patients/sms/notify2";
				
				try {
					URL url = new URL(urlname);
					HttpURLConnection conn = (HttpURLConnection) url.openConnection();
					conn.setDoOutput(true);
					conn.setRequestMethod("POST");
					conn.setRequestProperty("Content-Type", "application/json");
					conn.setRequestProperty("charset", "utf-8");
//					conn.setRequestProperty("X-CM-ID", "sbx");
					conn.setRequestProperty("X-CM-ID", consentManager);
					conn.setRequestProperty("Authorization", "Bearer " + generateToken);

					OutputStream os = conn.getOutputStream();
					os.write(jsonObject.toString().getBytes());
					os.flush();
					os.close();

					if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
						
						InputStream errorStream = conn.getErrorStream();
						String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
						return result;
//						throw new RuntimeException(
//								"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
					}
					BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

					output = br.readLine();

					conn.disconnect();

				} catch (Exception ex) {
					ex.printStackTrace();
				}
				return output;
			}
		 
		@ResponseBody
		@RequestMapping(value = "/patientOnFind", method = RequestMethod.POST)
		public SandBoxPatientInfo patientOnFind(@RequestParam("healthId") String healthId,HttpServletRequest req) {
			 
			SandBoxPatientInfo sandboxPatient = hipsandboxService.getSandboxPatient(healthId);
			return sandboxPatient;
			 
		 } 
		
		@ResponseBody
		@RequestMapping(value = "/saveCareContext", method = RequestMethod.POST)
	 void addCareContext(@RequestParam("helathId") String helathId,@RequestParam("careContext") String careContext) {
		 int res=0;
		 sandboxService.addCareContext(helathId, careContext);
//		 return res;
	 }
	
	@ResponseBody
	@RequestMapping(value = "/getData", method = RequestMethod.GET)
	SandboxData getData() {
		 int res=0;
		 SandboxData data = sandboxService.getData();
//		 return res;
		return data;
	 }
	
	@ResponseBody
	@RequestMapping(value = "/addCareContextByMobileOTP", method = RequestMethod.POST)
 int  addCareContextByMobileOTP(@RequestParam("helathId") String helathId,@RequestParam("careContext") String careContext) {
	 int res=0;
	 res=sandboxService.addCareContextByMobileOTP(helathId, careContext);
    return  res;
 }

	@ResponseBody
	@RequestMapping(value = "/changeFlowId", method = RequestMethod.POST)
 int  changeFlowId(@RequestParam("flowId") int flowId) {
	 int res=0;
	 res=sandboxService.changeFlowId(flowId);
    return  res;
 }
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/registerHIP", method = RequestMethod.POST)
	@ResponseBody
	public String registerHIP(@RequestParam("txtHosName") String hospitalName,
			@RequestParam("hInfoUnitId") String unitId,@RequestParam("txtInitials") String initialName) {

		
		String generateToken = generateToken();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("id", unitId);
		jsonObject.put("name", hospitalName);
		jsonObject.put("type", "HIP");
		jsonObject.put("active", true);
		
		JSONArray jsonArray = new JSONArray();
		jsonArray.add(initialName);
		
		jsonObject.put("alias", jsonArray);
		
		String result = "Success";

		String urlname = "https://dev.ndhm.gov.in/devservice/v1/bridges/services";
		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("PUT");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);
			conn.setDoOutput(true);
			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			System.out.println("Response Code----"+conn.getResponseCode());
			if (conn.getResponseCode() != 200) {
				
				InputStream errorStream = conn.getErrorStream();
				result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
				return result;
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			String output = br.readLine();
			//org.json.JSONObject json = new org.json.JSONObject(output);
			System.out.println(output);
			
			conn.disconnect();

		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return result;

	}
	
	@RequestMapping(value = "/getSandboxPatient", method = RequestMethod.POST)
	@ResponseBody
	public SandBoxPatientInfo getSandboxPatient(@RequestParam("patientId")String patientId) {
		
		
		
		SandBoxPatientInfo sandboxPatientById = sandboxService.getSandboxPatientById(Integer.parseInt(patientId));
		String helathId = sandboxPatientById.getHelathId();
		return sandboxPatientById;
		
		
	}
	
	@RequestMapping(value = "/sandboxReport", method = RequestMethod.POST)
	@ResponseBody
	public String sandboxReport(@RequestParam("patientId")String patientId,HttpServletRequest request) {
		
		
//		String immunizationData = sandboxReport.sendDiagnosisData(Integer.parseInt(patientId));
	//	String immunizationData = sandboxReport.immunizationData(Integer.parseInt(patientId), request);
		String dischargeSummaryData = sandboxReport.dischargeSummaryData(Integer.parseInt(patientId));
		
		return dischargeSummaryData;
		
		
	}
	
	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping(value = "/retrieveAbha", method = RequestMethod.POST)
	public SandboxResponse retrievalAbha(@RequestParam("callFrom") String callFrom, @RequestParam("mobileNumber") String mobileOrAadhaar) {


		String generateToken = createToken();
		String output = "";
		SandboxResponse response = new SandboxResponse();
		
		
	if(callFrom.equalsIgnoreCase("MOBILE_OTP")) {
		
		JSONObject jsonObject = new JSONObject();
		
		
		jsonObject.put("mobile", mobileOrAadhaar);
		
		
		String urlname = sandboxURL +"v1/forgot/healthId/mobile/generateOtp";
		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);
			conn.setRequestProperty("X-CM-ID", consentManager);
			

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
				
				InputStream errorStream = conn.getErrorStream();
				String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
				response.setErrorResult(result);
				return response;
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
			org.json.JSONObject jsonObject2 = new org.json.JSONObject(output);
			
			response.setTxnId(jsonObject2.getString("txnId"));
			conn.disconnect();
			

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return response;
		}
	else if(callFrom.equalsIgnoreCase("AADHAAR_OTP")) {
		
		JSONObject jsonObject = new JSONObject();
		
		jsonObject.put("aadhaar", mobileOrAadhaar);
		
		
		String urlname = sandboxURL +"v1/forgot/healthId/aadhaar/generateOtp";
		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);
			conn.setRequestProperty("X-CM-ID", consentManager);
			

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
				
				InputStream errorStream = conn.getErrorStream();
				String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
				response.setErrorResult(result);
				return response;
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
			org.json.JSONObject jsonObject2 = new org.json.JSONObject(output);
			
			response.setTxnId(jsonObject2.getString("txnId"));
			conn.disconnect();
			

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return response;
		
		}
	return response;
	}
	
	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping(value = "/verifyForgetOtp", method = RequestMethod.POST)
	public SandboxResponse verifyForgetOtp(@RequestParam("otp") String otp,@RequestParam("callFrom") String callFrom,
			@RequestParam("firstName") String firstName,@RequestParam("gender") String gender,
			@RequestParam("yearOfBirth") String yearOfBirth,@RequestParam("txnId") String txnId) {


		String generateToken = createToken();
		SandboxResponse response = new SandboxResponse();

		String output = "";
		
		if(callFrom.equalsIgnoreCase("MOBILE_OTP")) {
		
		JSONObject jsonObject = new JSONObject();
		
		jsonObject.put("gender", gender);
		jsonObject.put("firstName", firstName);
		jsonObject.put("name", firstName);
		jsonObject.put("txnId", txnId);
		jsonObject.put("yearOfBirth", yearOfBirth);
		jsonObject.put("otp", otp);
		
		
		String urlname = sandboxURL +"v1/forgot/healthId/mobile";
		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);
			conn.setRequestProperty("X-CM-ID", consentManager);
			

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
				
				InputStream errorStream = conn.getErrorStream();
				String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
				
				//org.json.JSONObject jsonObject2 = new org.json.JSONObject(output);
				//Object object = jsonObject2.get("details");
				response.setErrorResult(result);
				return response;
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
			org.json.JSONObject jsonObject2 = new org.json.JSONObject(output);
			String healthId = jsonObject2.getString("healthId");
			String healthIdNumber = jsonObject2.getString("healthIdNumber");
			response.setHealthId(healthId);
			response.setHealthIdNumber(healthIdNumber);
		//	response.setTxnId(jsonObject2.getString("txnId"));
			conn.disconnect();
			return response;

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return response;
		}
		
	else if(callFrom.equalsIgnoreCase("AADHAAR_OTP")) {
			
		JSONObject jsonObject = new JSONObject();
		
		
		jsonObject.put("gender", gender);
		jsonObject.put("firstName", firstName);
		jsonObject.put("name", firstName);
		jsonObject.put("txnId", txnId);
		jsonObject.put("yearOfBirth", yearOfBirth);
		jsonObject.put("otp", otp);
		
		
		String urlname = sandboxURL +"v1/forgot/healthId/aadhaar";
		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);
			conn.setRequestProperty("X-CM-ID", consentManager);
			

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
				
				InputStream errorStream = conn.getErrorStream();
				String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
				response.setErrorResult(result);
				return response;
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
			org.json.JSONObject jsonObject2 = new org.json.JSONObject(output);
			
			String healthId = jsonObject2.getString("healthId");
			String healthIdNumber = jsonObject2.getString("healthIdNumber");
			response.setHealthId(healthId);
			response.setHealthIdNumber(healthIdNumber);
			//response.setTxnId(jsonObject2.getString("txnId"));
			conn.disconnect();
			return response;

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return response;
			
		}
		return response;
	}
	
	
	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping(value = "/profileSendOtp", method = RequestMethod.POST)
	public SandboxResponse profileSendOtp(@RequestParam("healthIdNumber") String healthIdNumber, @RequestParam("authType") String authType) {


		String generateToken = createToken();
		String output = "";
		SandboxResponse response = new SandboxResponse();
	
		JSONObject jsonObject = new JSONObject();
		
		jsonObject.put("authMethod", authType);
		jsonObject.put("healthid", healthIdNumber);
		
		
		String urlname = sandboxURL +"v1/auth/init";
		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);
		//	conn.setRequestProperty("X-CM-ID", consentManager);
			

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
				
				InputStream errorStream = conn.getErrorStream();
				String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
				response.setErrorResult(result);
				return response;
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
			org.json.JSONObject jsonObject2 = new org.json.JSONObject(output);
			
			response.setTxnId(jsonObject2.getString("txnId"));
			conn.disconnect();
			

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return response;
		
	
	}
	
	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping(value = "/getABHAProfile", method = RequestMethod.POST)
	public String getABHAProfile(@RequestParam("otp") String otp, @RequestParam("txnId") String txnId) {


		String generateToken = createToken();
		String output = "";
		SandboxResponse response = new SandboxResponse();
	
		JSONObject jsonObject = new JSONObject();
		org.json.JSONObject profileDetails = new org.json.JSONObject();
		
		jsonObject.put("otp", otp);
		jsonObject.put("txnId", txnId);
		
		
		String urlname = sandboxURL +"v1/auth/confirmWithAadhaarOtp";
		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);
		//	conn.setRequestProperty("X-CM-ID", consentManager);
			

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
				
				InputStream errorStream = conn.getErrorStream();
				String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
				profileDetails = new org.json.JSONObject(result);
				//response.setErrorResult(result);
				return profileDetails.toString();
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			
			System.out.println("Response Code--------"+conn.getResponseCode());
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
			org.json.JSONObject jsonObject2 = new org.json.JSONObject(output);
			conn.disconnect();
			
			String xToken = jsonObject2.getString("token");
			
			urlname = sandboxURL +"v1/account/profile";
			
				url = new URL(urlname);
				conn = (HttpURLConnection) url.openConnection();

				conn.setDoOutput(true);
				conn.setRequestMethod("GET");
				conn.setRequestProperty("Content-Type", "application/json");
				conn.setRequestProperty("charset", "utf-8");
				conn.setRequestProperty("Authorization", "Bearer " + generateToken);
				conn.setRequestProperty("X-Token", "Bearer " + xToken);
				conn.setRequestProperty("X-HIP-ID", "HIPHMIS");
				

				os = conn.getOutputStream();
				os.write(jsonObject.toString().getBytes());
				os.flush();
				os.close();

				if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
					
					InputStream errorStream = conn.getErrorStream();
					String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
					profileDetails = new org.json.JSONObject(result);
//					response.setErrorResult(result);
					return profileDetails.toString();
//					throw new RuntimeException(
//							"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
				}
				BufferedReader brReader = new BufferedReader(new InputStreamReader((conn.getInputStream())));

				output = brReader.readLine();
				profileDetails = new org.json.JSONObject(output);
				conn.disconnect();
				
				//String xToken = jsonObject2.getString("token");
				} catch (Exception ex) {
			ex.printStackTrace();
		}
		return profileDetails.toString();
		
	
	}
	
	
	
	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping(value = "/getABHACard", method = RequestMethod.POST)
	public String getABHACard(@RequestParam("otp") String otp, @RequestParam("txnId") String txnId) {


		String generateToken = createToken();
		String output = "";
		SandboxResponse response = new SandboxResponse();
	
		JSONObject jsonObject = new JSONObject();
		org.json.JSONObject profileDetails = new org.json.JSONObject();
		
		jsonObject.put("otp", otp);
		jsonObject.put("txnId", txnId);
		
		
		String urlname = sandboxURL +"v1/auth/confirmWithAadhaarOtp";
		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);
		//	conn.setRequestProperty("X-CM-ID", consentManager);
			

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
				
				InputStream errorStream = conn.getErrorStream();
				String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
				profileDetails = new org.json.JSONObject(result);
				//response.setErrorResult(result);
				return profileDetails.toString();
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			
			System.out.println("Response Code--------"+conn.getResponseCode());
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
			org.json.JSONObject jsonObject2 = new org.json.JSONObject(output);
			conn.disconnect();
			
			String xToken = jsonObject2.getString("token");
			
			urlname = sandboxURL +"v1/account/profile";
			
				url = new URL(urlname);
				conn = (HttpURLConnection) url.openConnection();

				conn.setDoOutput(true);
				conn.setRequestMethod("GET");
				conn.setRequestProperty("Content-Type", "application/json");
				conn.setRequestProperty("charset", "utf-8");
				conn.setRequestProperty("Authorization", "Bearer " + generateToken);
				conn.setRequestProperty("X-Token", "Bearer " + xToken);
				conn.setRequestProperty("X-HIP-ID", "HIPHMIS");
				

				os = conn.getOutputStream();
				os.write(jsonObject.toString().getBytes());
				os.flush();
				os.close();

				if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
					
					InputStream errorStream = conn.getErrorStream();
					String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
					profileDetails = new org.json.JSONObject(result);
//					response.setErrorResult(result);
					return profileDetails.toString();
//					throw new RuntimeException(
//							"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
				}
				BufferedReader brReader = new BufferedReader(new InputStreamReader((conn.getInputStream())));

				output = brReader.readLine();
				profileDetails = new org.json.JSONObject(output);
				conn.disconnect();
				
				//String xToken = jsonObject2.getString("token");
				} catch (Exception ex) {
			ex.printStackTrace();
		}
		return profileDetails.toString();
		
	
	}
	
	
}
