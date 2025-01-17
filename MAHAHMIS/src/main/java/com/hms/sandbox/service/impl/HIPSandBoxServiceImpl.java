package com.hms.sandbox.service.impl;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.InvalidAlgorithmParameterException;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.Security;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.ResourceBundle;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.crypto.KeyAgreement;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.bouncycastle.asn1.x9.X9ECParameters;
import org.bouncycastle.crypto.digests.SHA256Digest;
import org.bouncycastle.crypto.ec.CustomNamedCurves;
import org.bouncycastle.crypto.engines.AESEngine;
import org.bouncycastle.crypto.generators.HKDFBytesGenerator;
import org.bouncycastle.crypto.modes.GCMBlockCipher;
import org.bouncycastle.crypto.params.AEADParameters;
import org.bouncycastle.crypto.params.HKDFParameters;
import org.bouncycastle.crypto.params.KeyParameter;
import org.bouncycastle.jce.interfaces.ECPrivateKey;
import org.bouncycastle.jce.interfaces.ECPublicKey;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.jce.spec.ECParameterSpec;
import org.bouncycastle.jce.spec.ECPrivateKeySpec;
import org.bouncycastle.jce.spec.ECPublicKeySpec;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonElement;
import com.hms.doctordesk.dto.OPDPrescriptionDto;
import com.hms.pharmacy.pojo.PreparationMaster;
import com.hms.sandbox.dto.HIPSandboxCareInfo;
import com.hms.sandbox.dto.SandBoxPatientDignosis;
import com.hms.sandbox.dto.SandBoxPatientInfo;
import com.hms.sandbox.dto.SandboxData;
import com.hms.sandbox.encryption.Constants;
import com.hms.sandbox.encryption.DecryptionRequest;
import com.hms.sandbox.encryption.DecryptionResponse;
import com.hms.sandbox.encryption.EncryptionRequest;
import com.hms.sandbox.encryption.EncryptionResponse;
import com.hms.sandbox.encryption.KeyMaterial;
import com.hms.sandbox.encryption.SandboxResponse;
import com.hms.sandbox.service.HIPSandBoxService;
import com.hms.sandbox.service.ISandboxReportService;

@Service
@Transactional
public class HIPSandBoxServiceImpl implements HIPSandBoxService {
	
	private static final Logger LOG = LogManager.getLogger(HIPSandBoxServiceImpl.class);
	
	@Autowired
	SessionFactory sf;
	
	@Autowired
	ISandboxReportService sandboxReportService;
	
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());

//	final String sumaSoftUrl="https://nha-suma-azb7fa3pfa-el.a.run.app/";
	
	ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	final String sandboxURL = resourceBundleEha.getObject("sandboxURL").toString();
	
	final String consentManager = resourceBundleEha.getObject("sandboxConsentManager").toString();
	final String HIP_HIU_URL = resourceBundleEha.getObject("HIP_HIU_URL").toString();
	
	@SuppressWarnings("unchecked")
	@Override
	public void sendHIPDiscoverData(String hipHealthIdd) {
		
		LOG.info("Inside a inside on- discover ");

		int patientId = 0;
		Criteria c = sf.getCurrentSession().createCriteria(SandBoxPatientInfo.class);
		c.add(Restrictions.eq("helathId", hipHealthIdd));
		List<SandBoxPatientInfo> list = c.list();
		if (list.size() > 0) {
			patientId = list.get(0).getSandBoxpatientId();
		}

		HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
				.currentRequestAttributes()).getRequest();
		HttpSession session = httpServletRequest.getSession();
		try {
			Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
			String date = instant.toString();
			System.out.println(date);
			String hipDicovertransactionId = (String) session.getAttribute("hipDicovertransactionId");
			String hipDicoverrequestId = (String) session.getAttribute("hipDicoverrequestId");
			String hipHealthId = (String) session.getAttribute("hipHealthId");

			SandBoxPatientInfo obj = (SandBoxPatientInfo) sf.getCurrentSession().get(SandBoxPatientInfo.class,
					patientId);
			List<SandBoxPatientDignosis> dignolist = obj.getListSandBoxDigno().stream().filter(X -> X.getDeleted().equalsIgnoreCase("N")).collect(Collectors.toList());
			List<HIPSandboxCareInfo> hipdignolist = new ArrayList<>();

			JSONArray jsArrayCare = new JSONArray();

			String refrenceNumber = "0";
			if (dignolist.size() > 0) {
				refrenceNumber = dignolist.get(0).getPatientReferenceNumber();
				for (SandBoxPatientDignosis sobj : dignolist) {
					JSONObject jsonObjectCare = new JSONObject();
					HIPSandboxCareInfo hobj = new HIPSandboxCareInfo();
					hobj.setReferenceNumber(sobj.getCareContextRefNumber());
					hobj.setDisplay(sobj.getDiagndesc());
					hipdignolist.add(hobj);
					jsonObjectCare.put("referenceNumber", sobj.getCareContextRefNumber());
					jsonObjectCare.put("display", sobj.getDiagndesc());
					jsArrayCare.add(jsonObjectCare);
				}
			}

			JSONObject jsonObjectp = new JSONObject();
			jsonObjectp.put("referenceNumber", refrenceNumber);
			jsonObjectp.put("display", "Demo");

			// JSONObject jsonObjectcare = new JSONObject();
			// JSONArray jsArray = new JSONArray(hipdignolist);
			jsonObjectp.put("careContexts", jsArrayCare);

			JSONObject jsonObjectresp = new JSONObject();
			jsonObjectresp.put("requestId", hipDicoverrequestId);

			JSONObject jsonObject = new JSONObject();
			jsonObject.put("requestId", hipDicoverrequestId);
			jsonObject.put("timestamp", date);
			jsonObject.put("transactionId", hipDicovertransactionId);
			jsonObject.put("patient", jsonObjectp);
			jsonObject.put("resp", jsonObjectresp);

			String createToken = createToken();

//			String urlname = "https://dev.abdm.gov.in/gateway/v0.5/care-contexts/on-discover";

			String urlname = HIP_HIU_URL+"v0.5/care-contexts/on-discover";
			
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
//			conn.setRequestProperty("X-CM-ID", "sbx");
			conn.setRequestProperty("X-CM-ID", consentManager);
			conn.setRequestProperty("Authorization", "Bearer " + createToken);
			conn.setDoOutput(true);
			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();
			System.out.println("response code=========" + conn.getResponseCode());
			if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
				throw new RuntimeException(
						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			String output = br.readLine();
			// org.json.JSONObject json = new org.json.JSONObject(output);
			// System.out.println(json);
			// accesToken = json.getString("accessToken");
			conn.disconnect();

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@SuppressWarnings("unchecked")
	@Override
	public void sendHIPOnNotifyData(String patientHealthId,String careContextReference,String consentId) {
		
		LOG.info("Inside a send hip on notify method ");
		HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
				.currentRequestAttributes()).getRequest();
		HttpSession session = httpServletRequest.getSession();
		try {
			Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
			String date = instant.toString();
			System.out.println(date);
			String hipNotifyrequestId = (String) session.getAttribute("hipNotifyrequestId");
			String hipNotifyStatus = (String) session.getAttribute("hipNotifyStatus");
			String hipNotifyconsentId = (String) session.getAttribute("hipNotifyconsentId");
			UUID uuid = UUID.randomUUID();
			JSONObject jsonObjectresp = new JSONObject();
			jsonObjectresp.put("requestId", hipNotifyrequestId);

		//	JSONArray acknowledgement = new JSONArray();
			JSONObject jsonObjectacknowledgement = new JSONObject();
			// jsonObjectacknowledgement.put("status", hipNotifyStatus);
			jsonObjectacknowledgement.put("status", "OK");
			jsonObjectacknowledgement.put("consentId", hipNotifyconsentId);
		//	acknowledgement.add(jsonObjectacknowledgement);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("requestId", uuid.toString());
			jsonObject.put("timestamp", date);

			jsonObject.put("resp", jsonObjectresp);
			jsonObject.put("acknowledgement", jsonObjectacknowledgement);

			String createToken = createToken();
//			String urlname = "https://dev.abdm.gov.in/gateway/v0.5/consents/hip/on-notify";

			String urlname = HIP_HIU_URL+"v0.5/consents/hip/on-notify";
			
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
//			conn.setRequestProperty("X-CM-ID", "sbx");
			conn.setRequestProperty("X-CM-ID", consentManager);
			conn.setRequestProperty("Authorization", "Bearer " + createToken);
			conn.setDoOutput(true);
			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();
			System.out.println("response code=========" + conn.getResponseCode());
			if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
				throw new RuntimeException(
						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			String output = br.readLine();
			// org.json.JSONObject json = new org.json.JSONObject(output);
			// System.out.println(json);
			// accesToken = json.getString("accessToken");
			conn.disconnect();
			
			Criteria c= sf.getCurrentSession().createCriteria(SandBoxPatientInfo.class);
			 c.add(Restrictions.eq("helathId", patientHealthId));
			 
			 SandBoxPatientInfo obj   =(SandBoxPatientInfo) c.list().get(0);
			  int  patientId    =obj.getSandBoxpatientId();
			  System.out.println("patientId====="+patientId);
			
			   // update consent id against care context number
			    String sql="Update ehat_patient_sandbox_diagnosis set hip_consent_id='"+consentId+"' where patient_id="+patientId+" and care_context_ref_number='"+careContextReference+"'    ";
			   SQLQuery sqlQ = sf.getCurrentSession().createSQLQuery(sql);
			   sqlQ.executeUpdate();
			  

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@SuppressWarnings("unchecked")
	public String createToken() {

		String clientId = "SBX_001584";
		String clientSecret = "d6efe4f9-c497-4a5c-bd16-21e415bf21fb";

		String accesToken = "";
		try {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("clientId", clientId);
			jsonObject.put("clientSecret", clientSecret);

//			String urlname = "https://dev.abdm.gov.in/gateway/v0.5/sessions";
			
			String urlname = HIP_HIU_URL+"v0.5/sessions";

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

			if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
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

	@Override
	public KeyMaterial generateKeyValue() {

		String senderPrivateKey = "";
		String senderPublicKey = "";
		String senderNonce = "";

		try {
			KeyPair senderKeyPair = generateKeyPair();
			senderPrivateKey = getBase64String(getEncodedPrivateKey(senderKeyPair.getPrivate()));
			System.out.println("senderPrivateKey-------" + senderPrivateKey);
			senderPublicKey = getBase64String(getEncodedPublicKey(senderKeyPair.getPublic()));
			System.out.println("senderPublicKey-----" + senderPublicKey);

			// Generate random key for sender and receiver
			senderNonce = generateRandomKey();
			System.out.println("senderNonce-----" + senderNonce);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return new KeyMaterial(senderPrivateKey, senderPublicKey, senderNonce);
	}

	private KeyPair generateKeyPair()
			throws NoSuchProviderException, NoSuchAlgorithmException, InvalidAlgorithmParameterException {
		Security.addProvider(new BouncyCastleProvider());
		KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(Constants.ALGORITHM, Constants.PROVIDER);
		X9ECParameters ecParameters = CustomNamedCurves.getByName(Constants.CURVE);
		ECParameterSpec ecSpec = new ECParameterSpec(ecParameters.getCurve(), ecParameters.getG(), ecParameters.getN(),
				ecParameters.getH(), ecParameters.getSeed());

		keyPairGenerator.initialize(ecSpec, new SecureRandom());
		return keyPairGenerator.generateKeyPair();
	}

	private static String getBase64String(byte[] value) {
		return new String(org.bouncycastle.util.encoders.Base64.encode(value));
	}

	public static byte[] getEncodedPrivateKey(PrivateKey key) throws Exception {
		ECPrivateKey ecKey = (ECPrivateKey) key;
		return ecKey.getD().toByteArray();
	}

	public static byte[] getEncodedPublicKey(PublicKey key) throws Exception {
		ECPublicKey ecKey = (ECPublicKey) key;
		return null;//ecKey.getQ().getEncoded(); // getEncoded(true);
	}

	// Method for generating random string
	public static String generateRandomKey() {
		byte[] salt = new byte[32];
		SecureRandom random = new SecureRandom();
		random.nextBytes(salt);
		return getBase64String(salt);
	}

	@SuppressWarnings("unchecked")
	@Override
	public void sendHipRequestNotificationData(String  consentId) {

		LOG.info("Inside a sendHipRequestNotificationData method ");
		HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
				.currentRequestAttributes()).getRequest();
		HttpSession session = httpServletRequest.getSession();
		try {
			Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
			String date = instant.toString();
			System.out.println(date);
			String hipRequestcryptoAlg = (String) session.getAttribute("hipRequestcryptoAlg");
			String hipRequestcurve = (String) session.getAttribute("hipRequestcurve");
			String hipRequestexpiry = (String) session.getAttribute("hipRequestexpiry");
			String hipRequestparameters = (String) "Ephemeral public key";
			String hipRequestKeyValue = (String) session.getAttribute("hipRequestKeyValue");
			String hipRequestNonce = (String) session.getAttribute("hipRequestNonce");
			String hipRequesttransactionId= (String) session.getAttribute("hipRequesttransactionId");
			
			
			//get dyanamic care contet number start
			Criteria c= sf.getCurrentSession().createCriteria(SandBoxPatientDignosis.class);
			 c.add(Restrictions.eq("hipConsentId", consentId));
			 
			 String   careContextRefNumber="0";   
			 int patientId=0;
			 SandBoxPatientInfo sobj =new SandBoxPatientInfo();
			 if(c.list().size() > 0) {
				 
				 SandBoxPatientDignosis obj   =(SandBoxPatientDignosis) c.list().get(0);
				     careContextRefNumber    =obj.getCareContextRefNumber();
				     String sql=" select patient_id  from ehat_patient_sandbox_diagnosis where hip_consent_id ='"+consentId+"' ";
				      SQLQuery query = sf.getCurrentSession().createSQLQuery(sql);
				    int patientIdSandbox  = ((Number) query.uniqueResult()).intValue();
				    
				   
				    if(!careContextRefNumber.equalsIgnoreCase("") && !careContextRefNumber.equalsIgnoreCase(null)) {
					    if(patientIdSandbox > 0) {
					     sobj   = (SandBoxPatientInfo) sf.getCurrentSession().get(SandBoxPatientInfo.class, patientIdSandbox);
					     patientId=sobj.getPatientId();
					    }
				    }
			 }
			String careContextReferenceHipNotify=careContextRefNumber;
			  
		//	String careContextReferenceHipNotify = (String) session.getAttribute("careContextReferenceHipNotify");

			KeyMaterial generateKeyValue = new KeyMaterial();
			final String uri = "http://localhost:8082/keys/generate";

			RestTemplate restTemplate = new RestTemplate();
			String result = restTemplate.getForObject(uri, String.class);

			org.json.JSONObject jsonData = new org.json.JSONObject(result);
//			JsonParser jsonParser = new JsonParser();
//		    JsonObject jsonData = (JsonObject) jsonParser.parse(result);
			System.out.println(jsonData);
			generateKeyValue.setPrivateKey(jsonData.getString("privateKey"));
			generateKeyValue.setPublicKey(jsonData.getString("publicKey"));
			generateKeyValue.setNonce(jsonData.getString("nonce"));

		
//			EncryptionRequest encryptionRequest = new EncryptionRequest();
//			encryptionRequest.setSenderNonce(generateKeyValue.getNonce());
//			encryptionRequest.setSenderPrivateKey(generateKeyValue.getPrivateKey());
//			encryptionRequest.setSenderPublicKey(generateKeyValue.getPublicKey());
//			encryptionRequest.setReceiverPublicKey(hipRequestKeyValue);
//			encryptionRequest.setReceiverPublicKey(hipRequestNonce);
//			encryptData(encryptionRequest);
			
			

			// keyMaterial.put("nonce", nonce ); //Encrypted nonce

			// generate sender key value
		//	KeyMaterial generateKeyPairMaterial = generateKeyValue();

			EncryptionRequest encryptionRequest = new EncryptionRequest();
			
//			  encryptionRequest.setPlainTextData("{\r\n" +
//			  "  \"resourceType\": \"Bundle\",\r\n" +
//			  "  \"id\": \"3739707e-1123-46fe-918f-b52d880e4e7f\",\r\n" +
//			  "  \"meta\": {\r\n" +
//			  "    \"lastUpdated\": \"2022-11-04T00:00:00.000+05:30\"\r\n" + "  },\r\n" +
//			  "  \"identifier\": {\r\n" +
//			  "    \"system\": \"https://www.max.in/bundle\",\r\n" +
//			  "    \"value\": \"3739707e-1123-46fe-918f-b52d880e4e7f\"\r\n" + "  },\r\n" +
//			  "  \"type\": \"document\",\r\n" +
//			  "  \"timestamp\": \"2022-11-04T00:00:00.000+05:30\",\r\n" +
//			  "  \"entry\": [\r\n" + "    {\r\n" +
//			  "      \"fullUrl\": \"Composition/c63d1435-b6b6-46c4-8163-33133bf0d9bf\",\r\n"
//			  + "      \"resource\": {\r\n" +
//			  "        \"resourceType\": \"Composition\",\r\n" +
//			  "        \"id\": \"c63d1435-b6b6-46c4-8163-33133bf0d9bf\",\r\n" +
//			  "        \"identifier\": {\r\n" +
//			  "          \"system\": \"https://www.max.in/document\",\r\n" +
//			  "          \"value\": \"c63d1435-b6b6-46c4-8163-33133bf0d9bf\"\r\n" +
//			  "        },\r\n" + "        \"status\": \"final\",\r\n" +
//			  "        \"type\": {\r\n" + "          \"coding\": [\r\n" +
//			  "            {\r\n" +
//			  "              \"system\": \"https://projecteka.in/sct\",\r\n" +
//			  "              \"code\": \"440545006\",\r\n" +
//			  "              \"display\": \"Prescription record\"\r\n" +
//			  "            }\r\n" + "          ]\r\n" + "        },\r\n" +
//			  "        \"subject\": {\r\n" +
//			  "          \"reference\": \"Patient/RVH9999\"\r\n" + "        },\r\n" +
//			  "        \"encounter\": {\r\n" +
//			  "          \"reference\": \"Encounter/dab7fd2b-6a05-4adb-af35-bcffd6c85b81\"\r\n"
//			  + "        },\r\n" +
//			  "        \"date\": \"2022-11-04T00:00:00.605+05:30\",\r\n" +
//			  "        \"author\": [\r\n" + "          {\r\n" +
//			  "            \"reference\": \"Practitioner/MAX5001\",\r\n" +
//			  "            \"display\": \"Dr Ram Sharma\"\r\n" + "          }\r\n" +
//			  "        ],\r\n" + "        \"title\": \"Prescription\",\r\n" +
//			  "        \"section\": [\r\n" + "          {\r\n" +
//			  "            \"title\": \"OPD Prescription\",\r\n" +
//			  "            \"code\": {\r\n" + "              \"coding\": [\r\n" +
//			  "                {\r\n" +
//			  "                  \"system\": \"https://projecteka.in/sct\",\r\n" +
//			  "                  \"code\": \"440545006\",\r\n" +
//			  "                  \"display\": \"Prescription record\"\r\n" +
//			  "                }\r\n" + "              ]\r\n" + "            },\r\n" +
//			  "            \"entry\": [\r\n" + "              {\r\n" +
//			  "                \"reference\": \"MedicationRequest/68d9667c-00c3-455f-b75d-d580950498a0\"\r\n"
//			  + "              }\r\n" + "            ]\r\n" + "          }\r\n" +
//			  "        ]\r\n" + "      }\r\n" + "    },\r\n" + "    {\r\n" +
//			  "      \"fullUrl\": \"Practitioner/MAX5001\",\r\n" +
//			  "      \"resource\": {\r\n" +
//			  "        \"resourceType\": \"Practitioner\",\r\n" +
//			  "        \"id\": \"MAX5001\",\r\n" + "        \"identifier\": [\r\n" +
//			  "          {\r\n" +
//			  "            \"system\": \"https://www.mciindia.in/doctor\",\r\n" +
//			  "            \"value\": \"MAX5001\"\r\n" + "          }\r\n" +
//			  "        ],\r\n" + "        \"name\": [\r\n" + "          {\r\n" +
//			  "            \"text\": \"Ram Sharma\",\r\n" + "            \"prefix\": [\r\n"
//			  + "              \"Dr\"\r\n" + "            ],\r\n" +
//			  "            \"suffix\": [\r\n" + "              \"MD\"\r\n" +
//			  "            ]\r\n" + "          }\r\n" + "        ]\r\n" + "      }\r\n" +
//			  "    },\r\n" + "    {\r\n" + "      \"fullUrl\": \"Patient/RVH9999\",\r\n" +
//			  "      \"resource\": {\r\n" + "        \"resourceType\": \"Patient\",\r\n" +
//			  "        \"id\": \"RVH9999\",\r\n" + "        \"name\": [\r\n" +
//			  "          {\r\n" + "            \"text\": \"Sourabh Agarwal\"\r\n" +
//			  "          }\r\n" + "        ],\r\n" + "        \"gender\": \"male\"\r\n" +
//			  "      }\r\n" + "    },\r\n" + "    {\r\n" +
//			  "      \"fullUrl\": \"Encounter/dab7fd2b-6a05-4adb-af35-bcffd6c85b81\",\r\n"
//			  + "      \"resource\": {\r\n" +
//			  "        \"resourceType\": \"Encounter\",\r\n" +
//			  "        \"id\": \"dab7fd2b-6a05-4adb-af35-bcffd6c85b81\",\r\n" +
//			  "        \"status\": \"finished\",\r\n" + "        \"class\": {\r\n" +
//			  "          \"system\": \"http://terminology.hl7.org/CodeSystem/v3-ActCode\",\r\n"
//			  + "          \"code\": \"AMB\",\r\n" +
//			  "          \"display\": \"Outpatient visit\"\r\n" + "        },\r\n" +
//			  "        \"subject\": {\r\n" +
//			  "          \"reference\": \"Patient/RVH9999\"\r\n" + "        },\r\n" +
//			  "        \"period\": {\r\n" +
//			  "          \"start\": \"2022-11-04T00:00:00+05:30\"\r\n" + "        }\r\n" +
//			  "      }\r\n" + "    },\r\n" + "    {\r\n" +
//			  "      \"fullUrl\": \"Medication/54ab5657-5e79-4461-a823-20e522eb337d\",\r\n"
//			  + "      \"resource\": {\r\n" +
//			  "        \"resourceType\": \"Medication\",\r\n" +
//			  "        \"id\": \"54ab5657-5e79-4461-a823-20e522eb337d\",\r\n" +
//			  "        \"code\": {\r\n" + "          \"coding\": [\r\n" +
//			  "            {\r\n" +
//			  "              \"system\": \"https://projecteka.in/act\",\r\n" +
//			  "              \"code\": \"R05CB02\",\r\n" +
//			  "              \"display\": \"bromhexine 24 mg\"\r\n" + "            }\r\n" +
//			  "          ]\r\n" + "        }\r\n" + "      }\r\n" + "    },\r\n" +
//			  "    {\r\n" +
//			  "      \"fullUrl\": \"MedicationRequest/68d9667c-00c3-455f-b75d-d580950498a0\",\r\n"
//			  + "      \"resource\": {\r\n" +
//			  "        \"resourceType\": \"MedicationRequest\",\r\n" +
//			  "        \"id\": \"68d9667c-00c3-455f-b75d-d580950498a0\",\r\n" +
//			  "        \"status\": \"active\",\r\n" + "        \"intent\": \"order\",\r\n"
//			  + "        \"medicationReference\": {\r\n" +
//			  "          \"reference\": \"Medication/54ab5657-5e79-4461-a823-20e522eb337d\"\r\n"
//			  + "        },\r\n" + "        \"subject\": {\r\n" +
//			  "          \"reference\": \"Patient/RVH9999\"\r\n" + "        },\r\n" +
//			  "        \"authoredOn\": \"2022-11-04T00:00:00+05:30\",\r\n" +
//			  "        \"requester\": {\r\n" +
//			  "          \"reference\": \"Practitioner/MAX5001\"\r\n" + "        },\r\n" +
//			  "        \"dosageInstruction\": [\r\n" + "          {\r\n" +
//			  "            \"text\": \"1 capsule 2 times a day\"\r\n" + "          }\r\n" +
//			  "        ]\r\n" + "      }\r\n" + "    }\r\n" + "  ]\r\n" + "}");
			 
			
//		
			
		//	JsonParser jsonParser = new JsonParser();
	if(patientId > 0) {
		
		
//		String sendFHIRBundleData = sendFHIRBundleData(patientId);// for prescription
//		above mehtod write in another service
		
		String sendPrescriptionData = sandboxReportService.sendPrescriptionData(patientId); //for prescription
		
		
//		String sendFHIRBundleData = sendFHIRBundleDignosisData(patientId);// for dignosis
//		String sendDiagnosisData = sandboxReportService.sendDiagnosisData(patientId); for dignosis
			
		
		
			encryptionRequest.setPlainTextData(sendPrescriptionData);
		    org.json.JSONObject jsonData2 = new org.json.JSONObject(encryptionRequest.getPlainTextData());
	        System.out.println("data===="+jsonData2.toString());
		    encryptionRequest.setPlainTextData(jsonData2.toString());
			
//		   System.out.println("json data fhir-----------"+sendFHIRBundleData);
			encryptionRequest.setSenderNonce(generateKeyValue.getNonce());
			encryptionRequest.setSenderPrivateKey(generateKeyValue.getPrivateKey());
			encryptionRequest.setSenderPublicKey(generateKeyValue.getPublicKey());

			// set recevicer key value
			encryptionRequest.setReceiverNonce(hipRequestNonce);
			encryptionRequest.setReceiverPublicKey(hipRequestKeyValue);

			
		//	EncryptionResponse encryptData = encryptData(encryptionRequest);
			// encrypted data 
			final String encryptUrl = "http://localhost:8082/encrypt";

			RestTemplate restTemplate2 = new RestTemplate();
			ResponseEntity<String> encryptResult = restTemplate2.postForEntity(encryptUrl,encryptionRequest,String.class);
			
			String resultBody = encryptResult.getBody();
			//JsonParser jsonParser = new JsonParser();
			org.json.JSONObject encryptedData = new org.json.JSONObject(resultBody);
			
			JSONObject jsonObject = new JSONObject();

			JSONObject keyMaterial = new JSONObject();
			keyMaterial.put("cryptoAlg", hipRequestcryptoAlg);
			keyMaterial.put("curve", hipRequestcurve);

			JSONObject dhPublicKey = new JSONObject();
			dhPublicKey.put("expiry", hipRequestexpiry);
			dhPublicKey.put("parameters", hipRequestparameters);
			dhPublicKey.put("keyValue", encryptedData.getString("keyToShare"));
			
			keyMaterial.put("dhPublicKey", dhPublicKey);
			keyMaterial.put("nonce", generateKeyValue.getNonce());
			
			
			//save encrypted data in db
			
//			Session currentSession = sf.getCurrentSession();
			sobj.setPrescriptionEncryptedData(jsonData2.toString());
			//currentSession.merge(sobj);

			// checksum code
			String md5 = getMd5(encryptedData.getString("encryptedData"));

			JSONArray entries = new JSONArray();
			org.json.JSONObject json1 = new org.json.JSONObject();
			json1.put("careContextReference", careContextReferenceHipNotify);
			json1.put("checksum", md5); // MD5 generator
			json1.put("media", "application/fhir+json");
			json1.put("content", encryptedData.getString("encryptedData")); // Encrypted content

			entries.add(json1);
			
			
			//diagnosis data 2 json array 2
			
//			String sendFHIRBundleDataDiagnosis = "{\r\n" + 
//					"    \"resourceType\":\"Bundle\",\r\n" + 
//					"    \"id\":\"ff626758-73cc-4821-978a-2528bb65b918\",\r\n" + 
//					"    \"meta\":{\r\n" + 
//					"       \"lastUpdated\":\"2019-01-03T15:32:26.605+05:30\"\r\n" + 
//					"    },\r\n" + 
//					"    \"timestamp\":\"2019-01-03T15:32:26.605+05:30\",\r\n" + 
//					"    \"identifier\":{\r\n" + 
//					"       \"system\":\"https://www.max.in/bundle\",\r\n" + 
//					"       \"value\":\"ff626758-73cc-4821-978a-2528bb65b918\"\r\n" + 
//					"    },\r\n" + 
//					"    \"type\":\"document\",\r\n" + 
//					"    \"entry\":[\r\n" + 
//					"       {\r\n" + 
//					"          \"fullUrl\":\"Composition/1007DR1\",\r\n" + 
//					"          \"resource\":{\r\n" + 
//					"             \"resourceType\":\"Composition\",\r\n" + 
//					"             \"id\":\"1007DR1\",\r\n" + 
//					"             \"date\":\"2019-01-03T15:32:26.605+05:30\",\r\n" + 
//					"             \"text\":{\r\n" + 
//					"                \"status\":\"generated\",\r\n" + 
//					"                \"div\":\"<div xmlns=\\\"http://www.w3.org/1999/xhtml\\\">Diagnostic Report for Navjot Singh (RVH1002) </div>\"\r\n" + 
//					"             },\r\n" + 
//					"             \"identifier\":{\r\n" + 
//					"                \"system\":\"https://www.max.in/composition\",\r\n" + 
//					"                \"value\":\"1007DR1\"\r\n" + 
//					"             },\r\n" + 
//					"             \"status\":\"final\",\r\n" + 
//					"             \"type\":{\r\n" + 
//					"                \"coding\":[\r\n" + 
//					"                   {\r\n" + 
//					"                      \"system\":\"https://projecteka.in/sct\",\r\n" + 
//					"                      \"code\":\"721981007\",\r\n" + 
//					"                      \"display\":\"Diagnostic Report\"\r\n" + 
//					"                   }\r\n" + 
//					"                ],\r\n" + 
//					"                \"text\":\"Prescription record\"\r\n" + 
//					"             },\r\n" + 
//					"             \"encounter\":{\r\n" + 
//					"                \"reference\":\"Encounter/7fce6ec8-5013-4a27-b0a6-c43232608cda\",\r\n" + 
//					"                \"display\":\"OPD Visit - patient walked in\"\r\n" + 
//					"             },\r\n" + 
//					"             \"subject\":{\r\n" + 
//					"                \"reference\":\"Patient/RVH1002\"\r\n" + 
//					"             },\r\n" + 
//					"             \"author\":[\r\n" + 
//					"                {\r\n" + 
//					"                   \"reference\":\"Organization/MaxSaket01\"\r\n" + 
//					"                },\r\n" + 
//					"                {\r\n" + 
//					"                    \"reference\":\"Practitioner/DHID1234\"\r\n" + 
//					"                }\r\n" + 
//					"             ],\r\n" + 
//					"             \"title\":\"Doc: Surgical Pathology Report\",\r\n" + 
//					"             \"section\":[\r\n" + 
//					"                {\r\n" + 
//					"                   \"title\":\"Section - Diagnostic report: Surgical Pathology\",\r\n" + 
//					"                   \"code\":{\r\n" + 
//					"                      \"coding\":[\r\n" + 
//					"                         {\r\n" + 
//					"                            \"system\":\"https://projecteka.in/sct\",\r\n" + 
//					"                            \"code\":\"721981007\",\r\n" + 
//					"                            \"display\":\"Diagnosti Report: Surgical Pathology\"\r\n" + 
//					"                         }\r\n" + 
//					"                      ]\r\n" + 
//					"                   },\r\n" + 
//					"                   \"entry\":[\r\n" + 
//					"                      {\r\n" + 
//					"                         \"reference\":\"DiagnosticReport/a45840dc-cf6b-4fcc-acec-d54a3bea40ff\"\r\n" + 
//					"                      }\r\n" + 
//					"                   ]\r\n" + 
//					"                }\r\n" + 
//					"             ],\r\n" + 
//					"             \"attester\": [\r\n" + 
//					"               {\r\n" + 
//					"                 \"mode\": \"official\",\r\n" + 
//					"                 \"time\": \"2019-01-04T09:10:14Z\",\r\n" + 
//					"                 \"party\": {\r\n" + 
//					"                   \"reference\": \"Organization/MaxSaket01\",\r\n" + 
//					"                   \"display\": \"Max Super Speciality Hospital, Saket\"\r\n" + 
//					"                 }\r\n" + 
//					"               }\r\n" + 
//					"             ]\r\n" + 
//					"          }\r\n" + 
//					"       },\r\n" + 
//					"       {\r\n" + 
//					"            \"fullUrl\": \"Organization/MaxSaket01\",\r\n" + 
//					"            \"resource\" : {\r\n" + 
//					"                \"resourceType\":\"Organization\",\r\n" + 
//					"                \"id\":\"MaxSaket01\",\r\n" + 
//					"                \"name\":\"Max Super Speciality Hospital, Saket\",\r\n" + 
//					"                \"alias\":[\r\n" + 
//					"                    \"Max\"\r\n" + 
//					"                ],\r\n" + 
//					"                \"identifier\": [\r\n" + 
//					"                  {\r\n" + 
//					"                    \"system\": \"https://facilitysbx.ndhm.gov.in\",\r\n" + 
//					"                    \"value\": \"IN0410000183\"\r\n" + 
//					"                  }\r\n" + 
//					"                ],\r\n" + 
//					"                \"telecom\":[\r\n" + 
//					"                    {\r\n" + 
//					"                        \"system\":\"phone\",\r\n" + 
//					"                        \"value\":\"(+91) 011-2651-5050\"\r\n" + 
//					"                    },\r\n" + 
//					"                    {\r\n" + 
//					"                        \"system\":\"fax\",\r\n" + 
//					"                        \"value\":\"(+91) 011-2651-5051\"\r\n" + 
//					"                    }\r\n" + 
//					"                ],\r\n" + 
//					"                \"address\":[\r\n" + 
//					"                    {\r\n" + 
//					"                        \"line\":[\r\n" + 
//					"                            \"1, 2, Press Enclave Marg, Saket Institutional Area, Saket\"\r\n" + 
//					"                        ],\r\n" + 
//					"                        \"city\":\"New Delhi\",\r\n" + 
//					"                        \"state\":\"New Delhi\",\r\n" + 
//					"                        \"postalCode\":\"110017\",\r\n" + 
//					"                        \"country\":\"INDIA\"\r\n" + 
//					"                    }\r\n" + 
//					"                ],\r\n" + 
//					"                \"endpoint\":[\r\n" + 
//					"                    {\r\n" + 
//					"                        \"reference\":\"https://www.max.in/hospital-network/max-super-speciality-hospital-saket\",\r\n" + 
//					"                        \"display\":\"Website\"\r\n" + 
//					"                    }\r\n" + 
//					"                ]\r\n" + 
//					"            }\r\n" + 
//					"        },\r\n" + 
//					"        {\r\n" + 
//					"            \"fullUrl\": \"Practitioner/DHID1234\",\r\n" + 
//					"            \"resource\": {\r\n" + 
//					"              \"resourceType\": \"Practitioner\",\r\n" + 
//					"              \"id\": \"DHID1234\",\r\n" + 
//					"              \"identifier\": [\r\n" + 
//					"                {\r\n" + 
//					"                  \"system\": \"http://mciindia.org/\",\r\n" + 
//					"                  \"value\": \"2318\"\r\n" + 
//					"                }\r\n" + 
//					"              ],\r\n" + 
//					"              \"name\": [\r\n" + 
//					"                {\r\n" + 
//					"                  \"text\": \"Manju Sengar\",\r\n" + 
//					"                  \"family\": \"Sengar\",\r\n" + 
//					"                  \"given\": [\r\n" + 
//					"                    \"Manju\"\r\n" + 
//					"                  ],\r\n" + 
//					"                  \"prefix\": [\r\n" + 
//					"                    \"Dr\"\r\n" + 
//					"                  ],\r\n" + 
//					"                  \"suffix\": [\r\n" + 
//					"                    \"MD\"\r\n" + 
//					"                  ]\r\n" + 
//					"                }\r\n" + 
//					"              ]\r\n" + 
//					"            }\r\n" + 
//					"        },\r\n" + 
//					"        {\r\n" + 
//					"            \"fullUrl\": \"Patient/RVH1002\",\r\n" + 
//					"            \"resource\": {\r\n" + 
//					"              \"resourceType\": \"Patient\",\r\n" + 
//					"              \"id\": \"RVH1002\",\r\n" + 
//					"              \"identifier\": [\r\n" + 
//					"                {\r\n" + 
//					"                  \"system\": \"https://projecteka.in/PHRID\",\r\n" + 
//					"                  \"value\": \"navjot.singh.2001@ncg\"\r\n" + 
//					"                }\r\n" + 
//					"              ],\r\n" + 
//					"              \"name\": [\r\n" + 
//					"                {\r\n" + 
//					"                  \"text\": \"Navjot Singh\"\r\n" + 
//					"                }\r\n" + 
//					"              ]\r\n" + 
//					"            }\r\n" + 
//					"        },\r\n" + 
//					"        {\r\n" + 
//					"            \"fullUrl\": \"Encounter/7fce6ec8-5013-4a27-b0a6-c43232608cda\",\r\n" + 
//					"            \"resource\": {\r\n" + 
//					"              \"resourceType\": \"Encounter\",\r\n" + 
//					"              \"id\": \"7fce6ec8-5013-4a27-b0a6-c43232608cda\",\r\n" + 
//					"              \"status\": \"finished\",\r\n" + 
//					"              \"class\": {\r\n" + 
//					"                \"system\": \"http://terminology.hl7.org/CodeSystem/v3-ActCode\",\r\n" + 
//					"                \"code\": \"AMB\",\r\n" + 
//					"                \"display\": \"Outpatient visit\"\r\n" + 
//					"              },\r\n" + 
//					"              \"period\": {\r\n" + 
//					"                \"start\": \"2019-01-03T15:32:26.605+05:30\",\r\n" + 
//					"                \"end\": \"2019-01-03T20:32:26.605+05:30\"\r\n" + 
//					"              },\r\n" + 
//					"              \"subject\": {\r\n" + 
//					"                  \"reference\" : \"Patient/RVH1002\"\r\n" + 
//					"              }\r\n" + 
//					"            }\r\n" + 
//					"        },\r\n" + 
//					"       {\r\n" + 
//					"          \"fullUrl\":\"DiagnosticReport/a45840dc-cf6b-4fcc-acec-d54a3bea40ff\",\r\n" + 
//					"          \"resource\":{\r\n" + 
//					"             \"resourceType\":\"DiagnosticReport\",\r\n" + 
//					"             \"id\":\"a45840dc-cf6b-4fcc-acec-d54a3bea40ff\",\r\n" + 
//					"             \"status\":\"final\",\r\n" + 
//					"             \"code\":{\r\n" + 
//					"                \"text\":\"Surgical Pathology Report\"\r\n" + 
//					"             },\r\n" + 
//					"             \"subject\":{\r\n" + 
//					"                \"display\":\"Navjot Singh\",\r\n" + 
//					"                \"reference\":\"Patient/RVH1002\"\r\n" + 
//					"             },\r\n" + 
//					"             \"performer\" : [\r\n" + 
//					"                {\r\n" + 
//					"                    \"reference\":\"Organization/MaxSaket01\"\r\n" + 
//					"                }\r\n" + 
//					"             ],\r\n" + 
//					"             \"resultsInterpreter\"  : [\r\n" + 
//					"                {\r\n" + 
//					"                    \"reference\":\"Practitioner/DHID1234\"\r\n" + 
//					"                }    \r\n" + 
//					"             ],\r\n" + 
//					"             \"result\": [\r\n" + 
//					"               {\r\n" + 
//					"                 \"reference\": \"Observation/fa357bd6-7107-4938-91fa-3da1815dea93\"\r\n" + 
//					"               },\r\n" + 
//					"               {\r\n" + 
//					"                  \"reference\": \"Observation/55feefe7-68ce-4ed4-b7e1-a1d66b423428\"\r\n" + 
//					"               }\r\n" + 
//					"             ],\r\n" + 
//					"             \"effectiveDateTime\":\"2019-01-03T17:32:26.605+05:30\",\r\n" + 
//					"             \"issued\":\"2019-01-03T18:32:26.605+05:30\",\r\n" + 
//					"             \"media\": [\r\n" + 
//					"               {\r\n" + 
//					"                 \"comment\": \"X Ray\",\r\n" + 
//					"                 \"link\": {\r\n" + 
//					"                   \"reference\": \"Media/e63d2a47-3928-4146-b529-823885ac9b8d\",\r\n" + 
//					"                   \"display\": \"Radiology: XRay PA View Chest\"\r\n" + 
//					"                 }\r\n" + 
//					"               }\r\n" + 
//					"             ],\r\n" + 
//					"             \"conclusion\": \"Refer to Doctor. To be correlated with further study.\"\r\n" + 
//					"          }\r\n" + 
//					"       },\r\n" + 
//					"       {\r\n" + 
//					"         \"fullUrl\": \"Observation/fa357bd6-7107-4938-91fa-3da1815dea93\",\r\n" + 
//					"         \"resource\": {\r\n" + 
//					"             \"resourceType\": \"Observation\",\r\n" + 
//					"             \"id\": \"fa357bd6-7107-4938-91fa-3da1815dea93\",\r\n" + 
//					"             \"text\": {\r\n" + 
//					"               \"status\": \"additional\",\r\n" + 
//					"               \"div\": \"<div xmlns=\\\"http://www.w3.org/1999/xhtml\\\"></div>\"\r\n" + 
//					"             },\r\n" + 
//					"             \"status\": \"final\",\r\n" + 
//					"             \"code\": {\r\n" + 
//					"               \"text\": \"Radiologist note\"\r\n" + 
//					"             },\r\n" + 
//					"             \"subject\": {\r\n" + 
//					"               \"display\": \"Navjot Singh\"\r\n" + 
//					"             },\r\n" + 
//					"             \"performer\": [\r\n" + 
//					"               {\r\n" + 
//					"                 \"display\": \"Dr. Manju\"\r\n" + 
//					"               }\r\n" + 
//					"             ],\r\n" + 
//					"             \"valueString\": \"Subdiaphragmatic free gas\"\r\n" + 
//					"         }\r\n" + 
//					"       },\r\n" + 
//					"       {\r\n" + 
//					"         \"fullUrl\": \"Observation/55feefe7-68ce-4ed4-b7e1-a1d66b423428\",\r\n" + 
//					"         \"resource\": {\r\n" + 
//					"             \"resourceType\": \"Observation\",\r\n" + 
//					"             \"id\": \"55feefe7-68ce-4ed4-b7e1-a1d66b423428\",\r\n" + 
//					"             \"text\": {\r\n" + 
//					"               \"status\": \"additional\",\r\n" + 
//					"               \"div\": \"<div xmlns=\\\"http://www.w3.org/1999/xhtml\\\"></div>\"\r\n" + 
//					"             },\r\n" + 
//					"             \"status\": \"final\",\r\n" + 
//					"             \"code\": {\r\n" + 
//					"               \"text\": \"Further investigation\"\r\n" + 
//					"             },\r\n" + 
//					"             \"subject\": {\r\n" + 
//					"               \"display\": \"Navjot Singh\"\r\n" + 
//					"             },\r\n" + 
//					"             \"performer\": [\r\n" + 
//					"               {\r\n" + 
//					"                 \"display\": \"Dr. Manju\"\r\n" + 
//					"               }\r\n" + 
//					"             ],\r\n" + 
//					"             \"valueString\": \"Correlate with Pathology Report\"\r\n" + 
//					"         }\r\n" + 
//					"       },\r\n" + 
//					"       {\r\n" + 
//					"         \"fullUrl\": \"Media/e63d2a47-3928-4146-b529-823885ac9b8d\",\r\n" + 
//					"         \"resource\": {\r\n" + 
//					"           \"resourceType\": \"Media\",\r\n" + 
//					"           \"id\": \"e63d2a47-3928-4146-b529-823885ac9b8d\",\r\n" + 
//					"           \"status\": \"completed\",\r\n" + 
//					"           \"content\": {\r\n" + 
//					"             \"contentType\": \"application/dicom\",\r\n" + 
//					"             \"data\": \"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABESUNNAgAAAFVMBADmAAAA AgABAE9CAAACAAAAAAECAAIAVUkaADEuMi44NDAuMTAwMDguNS4xLjQuMS4xLjIA AgADAFVJQAAxLjIuODI2LjAuMS4zNjgwMDQzLjguMTA1NS4xLjIwMTExMTAyMTUw NzU4NTkxLjAzMjk2MDUwLjY5MTgwOTQzAgAQAFVJFgAxLjIuODQwLjEwMDA4LjEu Mi40LjkxAgASAFVJHAAxLjIuODI2LjAuMS4zNjgwMDQzLjguMTA1NS4xAgATAFNI EABkaWNvbWxpYnJhcnktMTAwAgAWAEFFDABESUNPTUxJQlJBUlkIAAUAQ1MKAElT T19JUiAxMDAIAAgAQ1McAE9SSUdJTkFMXFBSSU1BUllcQVhJQUxcSEVMSVgIABIA REEIADIwMDYxMDEyCAATAFRNDgAwOTE2MDUuMDAwMDAwIAgAFgBVSRoAMS4yLjg0 MC4xMDAwOC41LjEuNC4xLjEuMgAIABgAVUlAADEuMi44MjYuMC4xLjM2ODAwNDMu OC4xMDU1LjEuMjAxMTExMDIxNTA3NTg1OTEuMDMyOTYwNTAuNjkxODA5NDMIACAA REEIADIwMDYxMDEyCAAiAERBCAAyMDA2MTAxMggAIwBEQQgAMjAwNjEwMTIIADAA VE0OADA5MDI1OC4wMDAwMDAgCAAyAFRNDgAwODUyMjkuMDAwMDAwIAgAMwBUTQ4A MDg1MjI5LjcxOTAwMCAIAGAAQ1MCAENUCAAwEExPDABDVDEgYWJkb21lbgAIADIQ U1EAADoAAAD+/wDgMgAAAAgAAAFTSAgAQ1RBQkRPTQAIAAIBU0gGAFhQTE9SRQgA BAFMTwwAQ1QxIGFiZG9tZW4ACAA+EExPCgBBUlRFUklFTExFCAAREVNRAABYAAAA /v8A4FAAAAAIAFARVUkYADEuMi44NDAuMTAwMDguMy4xLjIuMy4zAAgAVRFVSSgA MS4yLjg0MC4xMTM3MDQuMS4xMTEuNTEwNC4xMTYwNjM2NTcyLjUxABAAEABQTgoA QW5vbnltaXplZBAAIABMTwIAMAAQABAQQVMEADAwMFkYABAATE8IAENPTlRSQVNU GAAiAENTBgBIRUxJWAAYAFAARFMEADEuMAAYAGAARFMEADEyMAAYAIgARFMEADAu NQAYAJAARFMEADMwMgAYADAQTE8aAEFSVC5SRU5BTEVTIDEyL0FiZG9tZW4vSHgA GAAAEURTBAAzMDIAGAAgEURTAgAwABgAMBFEUwQAMTUxABgAQBFDUwIAQ1cYAFER SVMEADQwMAAYAFIRSVMEADMwMAAYAGARU0gCAEIAGAAQElNIAgBCABgAAFFDUwQA RkZTACAADQBVSUAAMS4yLjgyNi4wLjEuMzY4MDA0My44LjEwNTUuMS4yMDExMTEw MjE1MDc1ODU5MS45MjQwMjQ2NS43NjA5NTE3MCAADgBVSUAAMS4yLjgyNi4wLjEu MzY4MDA0My44LjEwNTUuMS4yMDExMTEwMjE1MDc1ODU5MS45Njg0Mjk1MC4wNzg3 NzQ0MiAAEQBJUwQANjE2OCAAEwBJUwIAMQAgADIARFMcAC0xNTEuNDkzNTA4XC0z Ni42NTY0NDE3XDEyOTUgADcARFMMADFcMFwwXDBcMVwwACAAUgBVSSYAMS4yLjg0 MC4xMTM3MDQuMS4xMTEuMzcwNC4xMTYwNjM3MTA5LjMgAEEQRFMIAC0zMjUuMDAA IAAAQExUOgBKUEVHIDIwMDAgbG9zc2xlc3MgLSBWZXJzaW9uIDQuMC4yIChjKSBJ bWFnZSBEZXZpY2VzIEdtYkgAKAACAFVTAgABACgABABDUwwATU9OT0NIUk9NRTIA KAAQAFVTAgAAAigAEQBVUwIAAAIoADAARFMWADAuNTg5ODQzNzVcMC41ODk4NDM3 NQAoAAABVVMCABAAKAABAVVTAgAMACgAAgFVUwIACwAoAAMBVVMCAAAAKABQEERT DAAwMDA1MFwwMDA1MAAoAFEQRFMMADAwMzUwXDAwMzUwACgAUhBEUwYALTEwMDAA KABTEERTAgAxACgAECFDUwIAMDEoABIhRFMIADUuODgyNjgwQAAHAExPDABDVDEg YWJkb21lbgBAAAgAU1EAADoAAAD+/wDgMgAAAAgAAAFTSAgAQ1RBQkRPTQAIAAIB U0gGAFhQTE9SRQgABAFMTwwAQ1QxIGFiZG9tZW4AQAAJAFNIDABBMTAwMjYxNzc3 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 AAA=\"\r\n" + 
//					"           }\r\n" + 
//					"         }\r\n" + 
//					"       }\r\n" + 
//					"    ]\r\n" + 
//					" }";
			
//			KeyMaterial generateKeyValueDigno = new KeyMaterial();
//			final String uri2 = "http://localhost:8082/keys/generate";
//
//			RestTemplate restTemplate3 = new RestTemplate();
//			String result2 = restTemplate3.getForObject(uri2, String.class);
//
//			org.json.JSONObject jsonDatasecond = new org.json.JSONObject(result2);
//			System.out.println(jsonData);
//			generateKeyValueDigno.setPrivateKey(jsonDatasecond.getString("privateKey"));
//			generateKeyValueDigno.setPublicKey(jsonDatasecond.getString("publicKey"));
//			generateKeyValueDigno.setNonce(jsonDatasecond.getString("nonce"));
//			
//			org.json.JSONObject jsonDataDiagno = new org.json.JSONObject(sendFHIRBundleDataDiagnosis);
//			EncryptionRequest encryptionRequestDiagno = new EncryptionRequest();
//			encryptionRequestDiagno.setPlainTextData(jsonDataDiagno.toString());
//			encryptionRequestDiagno.setSenderPrivateKey(generateKeyValueDigno.getPrivateKey());
//			encryptionRequestDiagno.setSenderPublicKey(generateKeyValueDigno.getPublicKey());
//			encryptionRequestDiagno.setSenderNonce(generateKeyValueDigno.getNonce());
//			
//			// set recevicer key value
//			encryptionRequestDiagno.setReceiverNonce(hipRequestNonce);
//			encryptionRequestDiagno.setReceiverPublicKey(hipRequestKeyValue);
//			
//			
////			generate encrypt data
//			final String encryptUrl4 = "http://localhost:8082/encrypt";
//
//			RestTemplate restTemplate4 = new RestTemplate();
//			ResponseEntity<String> encryptResultDigno = restTemplate4.
//					postForEntity(encryptUrl4,encryptionRequestDiagno,String.class);
//			
//			String resultBodyDiagno = encryptResultDigno.getBody();
//			//JsonParser jsonParser = new JsonParser();
//			org.json.JSONObject encryptedDataDiagno = new org.json.JSONObject(resultBodyDiagno);
//			
//			String md52 = getMd5(encryptedDataDiagno.getString("encryptedData"));
//			org.json.JSONObject jsonObjectDiagno = new org.json.JSONObject();
//			jsonObjectDiagno.put("careContextReference", careContextReferenceHipNotify);
//			jsonObjectDiagno.put("checksum", md52); // MD5 generator
//			jsonObjectDiagno.put("media", "application/fhir+json");
//			jsonObjectDiagno.put("content", encryptedDataDiagno.get("encryptedData")); 
//			
//			entries.add(jsonObjectDiagno);
			
			

			jsonObject.put("pageCount", 1);
			jsonObject.put("pageNumber", 1);
			jsonObject.put("transactionId", hipRequesttransactionId);

			jsonObject.put("keyMaterial", keyMaterial);
			jsonObject.put("entries", entries);
			
			System.out.println(jsonObject.toString());

			String createToken = createToken();

			String dataPushUrl = (String) session.getAttribute("dataPushUrl");
			
			String urlname = dataPushUrl;
//			String urlname = "https://dev.abdm.gov.in/patient-hiu/data/notification";
				
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("Authorization", "Bearer " + createToken);
			conn.setDoOutput(true);
			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();
			System.out.println("dat push response code============="+conn.getResponseCode());

			if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
				throw new RuntimeException(
						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			String output = br.readLine();
			// accesToken = json.getString("accessToken");
			conn.disconnect();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		

	}

	@SuppressWarnings("unchecked")
	@Override
	public void sendHIPOnRequestData() {
		
		LOG.info("Inside a sendHIPOnRequestData method ");
		HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
				.currentRequestAttributes()).getRequest();
		HttpSession session = httpServletRequest.getSession();
		try {
			Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
			String date = instant.toString();
			System.out.println(date);
			String hipRequestId = (String) session.getAttribute("hipRequestId");
			String hipRequesttransactionId = (String) session.getAttribute("hipRequesttransactionId");

			JSONObject jsonHiRequest = new JSONObject();
			jsonHiRequest.put("transactionId", hipRequesttransactionId);
			jsonHiRequest.put("sessionStatus", "OK");

			JSONObject jsonResp = new JSONObject();
			jsonHiRequest.put("requestId", hipRequestId);

			JSONObject jsonObject = new JSONObject();
			jsonObject.put("requestId", hipRequestId);
			jsonObject.put("hiRequest", jsonHiRequest);
			jsonObject.put("resp", jsonResp);

			String createToken = createToken();
			
//			String urlname = "https://dev.abdm.gov.in/gateway/v0.5/health-information/hip/on-request";
			
			String urlname = HIP_HIU_URL+"v0.5/health-information/hip/on-request";

			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
//			conn.setRequestProperty("X-CM-ID", "sbx");
			conn.setRequestProperty("X-CM-ID", consentManager);
			conn.setRequestProperty("Authorization", "Bearer " + createToken);
			conn.setDoOutput(true);
			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();
			System.out.println("response code=========" + conn.getResponseCode());
			if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
				throw new RuntimeException(
						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			String output = br.readLine();
			
			conn.disconnect();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// encrypt data

	@Override
	public EncryptionResponse encryptData(EncryptionRequest encryptionRequest) {

		try {
			byte[] xorOfRandom = xorOfRandom(encryptionRequest.getSenderNonce(), encryptionRequest.getReceiverNonce());

			String encryptedData = encrypt(xorOfRandom, encryptionRequest.getSenderPrivateKey(),
					encryptionRequest.getReceiverPublicKey(), encryptionRequest.getPlainTextData());

			String keyToShare = getBase64String(getEncodedHIPPublicKey(getKey(encryptionRequest.getSenderPublicKey())));
			return new EncryptionResponse(encryptedData, keyToShare);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	public String encrypt(byte[] xorOfRandom, String senderPrivateKey, String receiverPublicKey, String stringToEncrypt)
			throws Exception {
		System.out.println("<------------------- ENCRYPTION -------------------->");
		// Generating shared secret
		String sharedKey = doECDH(getBytesForBase64String(senderPrivateKey),
				getBytesForBase64String(receiverPublicKey));

		// Generating iv and HKDF-AES key
		byte[] iv = Arrays.copyOfRange(xorOfRandom, xorOfRandom.length - 12, xorOfRandom.length);
		byte[] aesKey = generateAesKey(xorOfRandom, sharedKey);
		// Perform Encryption
		String encryptedData = "";
		try {
			byte[] stringBytes = stringToEncrypt.getBytes();

			GCMBlockCipher cipher = new GCMBlockCipher(new AESEngine());
			AEADParameters parameters = new AEADParameters(new KeyParameter(aesKey), 128, iv, null);

			cipher.init(true, parameters);
			byte[] plainBytes = new byte[cipher.getOutputSize(stringBytes.length)];
			int retLen = cipher.processBytes(stringBytes, 0, stringBytes.length, plainBytes, 0);
			cipher.doFinal(plainBytes, retLen);

			encryptedData = getBase64String(plainBytes);
		} catch (Exception e) {
			System.out.println(e.getLocalizedMessage());
		}

		System.out.println("EncryptedData: " + encryptedData);
		System.out.println("<---------------- Done ------------------->");
		return encryptedData;
	}

	private byte[] xorOfRandom(String senderNonce, String receiverNonce) {
		byte[] randomSender = getBytesForBase64String(senderNonce);
		byte[] randomReceiver = getBytesForBase64String(receiverNonce);

		byte[] combinedRandom = new byte[randomSender.length];
		for (int i = 0; i < randomSender.length; i++) {
			combinedRandom[i] = (byte) (randomSender[i] ^ randomReceiver[i % randomReceiver.length]);
		}
		return combinedRandom;
	}

	public byte[] getBytesForBase64String(String value) {
		return org.bouncycastle.util.encoders.Base64.decode(value);
	}

	public PublicKey getKey(String key) throws Exception {
		byte[] bytesForBase64String = getBytesForBase64String(key);
		PublicKey publicKey = loadPublicKey(bytesForBase64String);

		return publicKey;
	}

	private PublicKey loadPublicKey(byte[] data) throws Exception {
		Security.addProvider(new BouncyCastleProvider());
		X9ECParameters ecP = CustomNamedCurves.getByName(Constants.CURVE);
		ECParameterSpec ecNamedCurveParameterSpec = new ECParameterSpec(ecP.getCurve(), ecP.getG(), ecP.getN(),
				ecP.getH(), ecP.getSeed());

		return KeyFactory.getInstance(Constants.ALGORITHM, Constants.PROVIDER).generatePublic(
				new ECPublicKeySpec(ecNamedCurveParameterSpec.getCurve().decodePoint(data), ecNamedCurveParameterSpec));
	}

	private String doECDH(byte[] dataPrv, byte[] dataPub) throws Exception {

		Security.addProvider(new BouncyCastleProvider());
		KeyAgreement ka = KeyAgreement.getInstance(Constants.ALGORITHM, Constants.PROVIDER);
		ka.init(loadPrivateKey(dataPrv));
		ka.doPhase(loadPublicKey(dataPub), true);
		byte[] secret = ka.generateSecret();
		return getBase64String(secret);
	}

	private PrivateKey loadPrivateKey(byte[] data) throws Exception {
		X9ECParameters ecP = CustomNamedCurves.getByName(Constants.CURVE);
		ECParameterSpec params = new ECParameterSpec(ecP.getCurve(), ecP.getG(), ecP.getN(), ecP.getH(), ecP.getSeed());
		ECPrivateKeySpec privateKeySpec = new ECPrivateKeySpec(new BigInteger(data), params);
		KeyFactory kf = KeyFactory.getInstance(Constants.ALGORITHM, Constants.PROVIDER);
		return kf.generatePrivate(privateKeySpec);
	}

	public byte[] getEncodedHIPPublicKey(PublicKey key) {
		ECPublicKey ecKey = (ECPublicKey) key;
		return ecKey.getEncoded();
	}

	private byte[] generateAesKey(byte[] xorOfRandoms, String sharedKey) {
		byte[] salt = Arrays.copyOfRange(xorOfRandoms, 0, 20);
		HKDFBytesGenerator hkdfBytesGenerator = new HKDFBytesGenerator(new SHA256Digest());
		HKDFParameters hkdfParameters = new HKDFParameters(getBytesForBase64String(sharedKey), salt, null);
		hkdfBytesGenerator.init(hkdfParameters);
		byte[] aesKey = new byte[32];
		hkdfBytesGenerator.generateBytes(aesKey, 0, 32);
		return aesKey;
	}

	@Override
	public DecryptionResponse decryptData(DecryptionRequest decryptionRequest) {

		String decryptedData = "";
		try {
			byte[] xorOfRandom = xorOfRandom(decryptionRequest.getSenderNonce(), decryptionRequest.getReceiverNonce());
			decryptedData = decrypt(xorOfRandom, decryptionRequest.getReceiverPrivateKey(),
					decryptionRequest.getSenderPublicKey(), decryptionRequest.getEncryptedData());

			// return new DecryptionResponse(decryptedData);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new DecryptionResponse(decryptedData);
	}

	public String decrypt(byte[] xorOfRandom, String receiverPrivateKey, String senderPublicKey, String stringToDecrypt)
			throws Exception {
		String sharedKey = doECDH(getBytesForBase64String(receiverPrivateKey),
				getBytesForBase64String(senderPublicKey));

		// Generating iv and HKDF-AES key
		byte[] iv = Arrays.copyOfRange(xorOfRandom, xorOfRandom.length - 12, xorOfRandom.length);
		byte[] aesKey = generateAesKey(xorOfRandom, sharedKey);

		// Perform Decryption
		String decryptedData = "";
		byte[] encryptedBytes = getBytesForBase64String(stringToDecrypt);

		GCMBlockCipher cipher = new GCMBlockCipher(new AESEngine());
		AEADParameters parameters = new AEADParameters(new KeyParameter(aesKey), 128, iv, null);

		cipher.init(false, parameters);
		byte[] plainBytes = new byte[cipher.getOutputSize(encryptedBytes.length)];
		int retLen = cipher.processBytes(encryptedBytes, 0, encryptedBytes.length, plainBytes, 0);
		cipher.doFinal(plainBytes, retLen);

		decryptedData = new String(plainBytes);

		return decryptedData;
	}

	public static String getMd5(String input) {
		try {

			// Static getInstance method is called with hashing MD5
			MessageDigest md = MessageDigest.getInstance("MD5");

			// digest() method is called to calculate message digest
			// of an input digest() return array of byte
			byte[] messageDigest = md.digest(input.getBytes());

			// Convert byte array into signum representation
			BigInteger no = new BigInteger(1, messageDigest);

			// Convert message digest into hex value
			String hashtext = no.toString(16);
			while (hashtext.length() < 32) {
				hashtext = "0" + hashtext;
			}
			return hashtext;
		}

		// For specifying wrong message digest algorithms
		catch (NoSuchAlgorithmException e) {
			throw new RuntimeException(e);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public void authConfirm(String requestId) {
		

		Criteria c= sf.getCurrentSession().createCriteria(SandBoxPatientInfo.class);
		 c.add(Restrictions.eq("authInitRequestId", requestId));
		 
		 SandBoxPatientInfo obj   =(SandBoxPatientInfo) c.list().get(0);
		  int  patientId    =obj.getPatientId();
		  System.out.println("patientId====="+patientId);
		
		HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
				.currentRequestAttributes()).getRequest();

		HttpSession session = httpServletRequest.getSession();
		String sanBoxPatientId = (String) session.getAttribute("sanBoxPatientId");
		
		
		SandBoxPatientInfo sandBoxPatientInfo = (SandBoxPatientInfo) sf.getCurrentSession()
				.createCriteria(SandBoxPatientInfo.class)
				.add(Restrictions.eq("patientId", patientId)).uniqueResult();
		String output = "";

		UUID uuid = UUID.randomUUID();

		Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
		String currentDate = instant.toString();

		String transactionId = (String) session.getAttribute("transactionId");

		JSONObject demographic = new JSONObject();

		String fullName = sandBoxPatientInfo.getfName() + " " + sandBoxPatientInfo.getmName() + " "
				+ sandBoxPatientInfo.getlName();
		String gender = sandBoxPatientInfo.getGender();
		String gender2 = "";
		if (gender.equals("Male")) {
			gender2 = "M";
		} else if (gender.equals("Female")) {
			gender2 = "F";
		}

		String dob = sandBoxPatientInfo.getDob();
		String[] split = dob.split("/");
		String dateOfBirth = split[2] + "-" + split[1] + "-" + split[0];
		demographic.put("name", fullName);
		demographic.put("gender", gender2);
		demographic.put("dateOfBirth", dateOfBirth);

		JSONObject credential = new JSONObject();
//		credential.put("authCode", "");
		credential.put("demographic", demographic);

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("requestId", uuid.toString());
		jsonObject.put("timestamp", currentDate);
		jsonObject.put("transactionId", transactionId);
		jsonObject.put("credential", credential);

		String generateToken = generateToken();

//		String urlname = "https://dev.abdm.gov.in/gateway/v0.5/users/auth/confirm";
		
		String urlname = HIP_HIU_URL+"v0.5/users/auth/confirm";

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
				throw new RuntimeException(
						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}

			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
			// start  update auth init request id in ehat_patient_sandbox table
			System.out.println("uuid==="+uuid.toString());
			 String hql="update SandBoxPatientInfo set authConfirmRequestId='"+uuid.toString()+"' where helathId='"+sandBoxPatientInfo.getHelathId()+"'  ";
			
			Query q = sf.getCurrentSession().createQuery(hql);
			q.executeUpdate();
			conn.disconnect();
			
		//	addCareContext(sandBoxPatientInfo);
//			addCareContext(uuid.toString());
			// return 1;

		} catch (Exception ex) {
			ex.printStackTrace();
			// return 0;
		}
		// return 0;
	}

	@SuppressWarnings("unchecked")
	@Override
	public  int addCareContext(String  requestId) {
		SQLQuery query=sf.getCurrentSession().createSQLQuery("Select flow_id from sandbox_add_care_flow");
		int flowId=(int) query.uniqueResult();
		if(flowId == 3) {
		Criteria c= sf.getCurrentSession().createCriteria(SandBoxPatientInfo.class);
		 c.add(Restrictions.eq("authConfirmRequestId", requestId));
		 SandBoxPatientInfo obj =new SandBoxPatientInfo();
		  int  patientId =0;
		 if(!requestId.equalsIgnoreCase("")) {
			  obj   =(SandBoxPatientInfo) c.list().get(0);
			    patientId    =obj.getPatientId();
		 }
		
		  
		  System.out.println("patientId====="+patientId);

		HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
				.currentRequestAttributes()).getRequest();

		HttpSession session = httpServletRequest.getSession();
		String sanBoxPatientId = (String) session.getAttribute("sanBoxPatientId");
		//sanBoxPatientId = "39926";
		SandBoxPatientInfo sandBoxPatientInfo = (SandBoxPatientInfo) sf.getCurrentSession()
				.createCriteria(SandBoxPatientInfo.class)
				.add(Restrictions.eq("patientId",  patientId)).uniqueResult();
		
		String output = "";

		UUID uuid = UUID.randomUUID();

		
		String accessToken = (String) session.getAttribute("accessToken");

		Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
		String currentDate = instant.toString();

		JSONArray careContextsArray = new JSONArray();
		
		
		List<SandBoxPatientDignosis> listSandBoxDigno = sandBoxPatientInfo.getListSandBoxDigno();
		
		//List<SandBoxPatientDignosis> listSandBoxDigno = sandBoxPatientInfo.getListSandBoxDigno().stream().filter(x -> x.getDeleted().equalsIgnoreCase("N")).collect(Collectors.toList());

		
		SandBoxPatientDignosis sandBoxPatientDignosis2 = listSandBoxDigno.get(listSandBoxDigno.size()-1);
		String patientReferenceNumber = sandBoxPatientDignosis2.getPatientReferenceNumber();
//		if(listSandBoxDigno.size()>0) {
//			patientReferenceNumber=listSandBoxDigno.get(0).getPatientReferenceNumber();
//		}
//		else
//			patientReferenceNumber=sandBoxPatientInfo.getfName()+sandBoxPatientInfo.getlName()+sandBoxPatientInfo.getAge();
			
		
//		for (SandBoxPatientDignosis sandBoxPatientDignosis : listSandBoxDigno) {

			JSONObject careContextObj = new JSONObject();
			careContextObj.put("referenceNumber", sandBoxPatientDignosis2.getCareContextRefNumber());
			careContextObj.put("display", sandBoxPatientDignosis2.getDiagndesc()+" "+todays_date);

			careContextsArray.add(careContextObj);
			//patientReferenceNumber = sandBoxPatientDignosis.getPatientReferenceNumber();
//		}
		
		JSONObject patientObj = new JSONObject();
		patientObj.put("referenceNumber", patientReferenceNumber);
		patientObj.put("display", "----" + patientReferenceNumber + "----");
		patientObj.put("careContexts", careContextsArray);

		JSONObject links = new JSONObject();
		links.put("accessToken", accessToken);
		links.put("patient", patientObj);

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("requestId", uuid.toString());
		jsonObject.put("timestamp", currentDate);
		jsonObject.put("link", links);

		String generateToken = generateToken();

//		String urlname = "https://dev.abdm.gov.in/gateway/v0.5/links/link/add-contexts";
		String urlname = HIP_HIU_URL+"v0.5/links/link/add-contexts";

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
				throw new RuntimeException(
						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();

			conn.disconnect();
			return 1;

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		}
		return 0;
		
	}

	@SuppressWarnings("unchecked")
	public static String generateToken() {

		String clientId = "SBX_001584";
		String clientSecret = "d6efe4f9-c497-4a5c-bd16-21e415bf21fb";

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("clientId", clientId);
		jsonObject.put("clientSecret", clientSecret);

		String accesToken = "";

		String urlname = "https://dev.abdm.gov.in/gateway/v0.5/sessions";
//		String urlname = HIP_HIU_URL+"gateway/v0.5/sessions";
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

	/*
	 * //FHIR Code
	 * 
	 * public validationIntro(String resourceText) { // START SNIPPET:
	 * validationIntro ca.uhn.fhir.context.FhirContext ctx = FhirContext.forDstu3();
	 * 
	 * // Ask the context for a validator FhirValidator validator =
	 * ctx.newValidator();
	 * 
	 * // Create some modules and register them IValidatorModule module1 = new
	 * SchemaBaseValidator(ctx); validator.registerValidatorModule(module1);
	 * IValidatorModule module2 = new SchematronBaseValidator(ctx);
	 * validator.registerValidatorModule(module2);
	 * 
	 * // Pass a resource in to be validated. The resource can // be an
	 * IBaseResource instance, or can be a raw String // containing a serialized
	 * resource as text. Patient resource = new Patient(); ValidationResult result =
	 * validator.validateWithResult(resource); // String resourceText =
	 * "<Patient.....>"; ValidationResult result2 =
	 * validator.validateWithResult(resourceText);
	 * 
	 * // The result object now contains the validation results for
	 * (SingleValidationMessage next : result.getMessages()) {
	 * System.out.println(next.getLocationString() + " " + next.getMessage()); } //
	 * END SNIPPET: validationIntro }
	 */

	
//	 @SuppressWarnings("unchecked")
//	public String sendFHIRBundleData( int patientId) {
//		 
//		
//	       }

	@Override
	public SandBoxPatientInfo getSandboxPatient(String healthId) {
		
		Session currentSession = sf.getCurrentSession();
		Criteria add = currentSession.createCriteria(SandBoxPatientInfo.class).
		add(Restrictions.eq("helathId", healthId));
		List<SandBoxPatientInfo> sandBoxPatientInfo= add.list();
		SandBoxPatientInfo sandBoxPatientInfo2 = sandBoxPatientInfo.get(sandBoxPatientInfo.size()-1);
//		SandBoxPatientInfo sandBoxPatientInfo = (SandBoxPatientInfo) add.uniqueResult();
		return sandBoxPatientInfo2;
	}
	 
//	 @SuppressWarnings("unchecked")
//     public String sendFHIRBundleDignosisData( int patientId) {
//		 
//		 
//	 }
	 
	 @SuppressWarnings("unchecked")
		public void profileOnShare(String healthId,String reqId,String hipCode) {
			 
		 		LOG.info("Inside a profileOnShare method ");
			 
			 	String generateToken = createToken();
			 	Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
				String currentDate = instant.toString();
				JSONObject jsonObject = new JSONObject();
				
				JSONObject acknowledgement = new JSONObject();
				acknowledgement.put("status", "SUCCESS");
				acknowledgement.put("healthId", healthId);
				acknowledgement.put("tokenNumber", "HMIS-"+hipCode+1);
				

				
				UUID uuid = UUID.randomUUID();

				JSONObject response = new JSONObject();
				response.put("requestId", reqId);
				

				jsonObject.put("requestId", uuid.toString());
				jsonObject.put("timestamp", currentDate);
				jsonObject.put("acknowledgement", acknowledgement);
				jsonObject.put("resp", response);

//				String urlname = "https://dev.abdm.gov.in/gateway/v0.5/patients/profile/on-share";
				String urlname = HIP_HIU_URL+"v0.5/patients/profile/on-share";
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
						throw new RuntimeException(
								"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
					}
					BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

					String output = br.readLine();
		       
//					HttpSession session = req.getSession();
//					session.setAttribute("healthId", healthId);
//					req.getRequestDispatcher("/sandbox_hip_linking.jsp").forward(req, res);
					

				} catch (Exception ex) {
					ex.printStackTrace();
				}
		 }

	@Override
	public void updateAuthTransactionId(String requstId, String transactionId) {
		
		LOG.info("Inside a updateAuthTransactionId method ");
		try {
			 String hql="update SandBoxPatientInfo set  authInitTransactionId='"+transactionId+"'    where   authInitRequestId='"+requstId+"'   ";
				
			 Query q = sf.getCurrentSession().createQuery(hql);
			 q.executeUpdate();
			 
			SQLQuery query=sf.getCurrentSession().createSQLQuery("Select flow_id from sandbox_add_care_flow");
			int flowId=(int) query.uniqueResult();
			if(flowId ==3) {
			 authConfirm(requstId);
			}
				// end
		}catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	@Override
	public void updateProfileRequestId(String requestId, String healthId,String hipCode,SandboxData data) {
		LOG.info("Inside a updateProfileRequestId method ");
		try {
			
			
			sf.getCurrentSession().save(data);
			profileOnShare(healthId, requestId,hipCode);
			// update profile request id
//			 String hql="update SandBoxPatientInfo set  profileShaireRequestId='"+requestId+"'    where   helathId='"+healthId+"'   ";
//			
//			 Query  q=sf.getCurrentSession().createQuery(hql);
//			 q.executeUpdate();
		}catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	

	@SuppressWarnings("unchecked")
	@Override
	public void sendLinkOnInitData(int patientId,String requestId,String  transactionId) {
		
		LOG.info("Inside a sendLinkOnInitData method ");
		Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
			String currentDate = instant.toString();
			org.json.JSONObject jsonObject = new org.json.JSONObject();
			  UUID requestUUId = UUID.randomUUID();
			  
			  HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
						.currentRequestAttributes()).getRequest();
			  HttpSession session = httpServletRequest.getSession();
			  String careReferenceNumber = (String) session.getAttribute("careReferenceNumber");
			  String patientReferNumber = (String) session.getAttribute("patientReferNumber");
			  String healthID = (String) session.getAttribute("linkInitid");
			  try {
			  jsonObject.put("requestId", requestUUId.toString());
			  jsonObject.put("timestamp", currentDate);
			  jsonObject.put("transactionId", transactionId);
			  
			  org.json.JSONObject linkObject = new org.json.JSONObject();
			  linkObject.put("referenceNumber", patientReferNumber);
			  linkObject.put("authenticationType", "DIRECT");
			  
			  org.json.JSONObject metaObject = new org.json.JSONObject();
			  metaObject.put("communicationMedium", "MOBILE");
			  metaObject.put("communicationHint", "OTP sent to mobile no 9845XXX767");
			  metaObject.put("communicationExpiry", currentDate);
			  
			  linkObject.put("meta", metaObject);
			  
			  jsonObject.put("link", linkObject);
			  
			  org.json.JSONObject resObject = new org.json.JSONObject();
			  resObject.put("requestId", requestId);
			  
			  jsonObject.put("resp", resObject);
			  
			  String urlname = HIP_HIU_URL+"v0.5/links/link/on-init";
//			  String urlname = "https://dev.abdm.gov.in/gateway/v0.5/links/link/on-init";
			  
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

				System.out.println("link on init response code============"+conn.getResponseCode());
				
				if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
					throw new RuntimeException(
							"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
				}
				BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

				String output = br.readLine();
				org.json.JSONObject json = new org.json.JSONObject(output);
				System.out.println(json);
				//accesToken = json.getString("accessToken");
				conn.disconnect();
				// update link init patient and care context reference number
				String hql="update SandBoxPatientInfo set linkInitpatientRefreneceNumber='"+patientReferNumber+"' and linkInitCareRefreneceNumber='"+careReferenceNumber+"' where helathId='"+healthID+"' ";
			    Query q = sf.getCurrentSession().createQuery(hql);
			    q.executeUpdate();
			    
				  
				
			  }catch (Exception e) {
				e.printStackTrace();
			}
	 }

	@SuppressWarnings("unchecked")
	@Override
	public void sendlinkOnconfirmData(String resRequestId) {
		
		LOG.info("Inside a sendlinkOnconfirmData method ");
		HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
				.currentRequestAttributes()).getRequest();
		HttpSession session = httpServletRequest.getSession();
		try {
			
			
			String patientRefNumber = (String) session.getAttribute("patientRefNumber");
			String linkInitToken =(String) session.getAttribute("linkInitToken");
			
			String careContextReferenceNumber="";
			
			Criteria c = sf.getCurrentSession().createCriteria(SandBoxPatientInfo.class);
			 c.add(Restrictions.eq("linkInitpatientRefreneceNumber", patientRefNumber));
			  
			 List<SandBoxPatientInfo> list = c.list();
			        SandBoxPatientInfo sobj = list.get(0);
			        if(sobj !=null) {
			        	careContextReferenceNumber=sobj.getLinkInitCareRefreneceNumber();
			        }
			   
			
			Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
			 String date = instant.toString();
			 System.out.println(date);

	          UUID uuid = UUID.randomUUID();
			
			  JSONObject jsonObject = new JSONObject();
			  jsonObject.put("requestId", uuid);
			  jsonObject.put("timestamp", date);  
			  
			  JSONObject patient = new JSONObject();
			  patient.put("referenceNumber", patientRefNumber);
			  patient.put("display", "Ref Number");
			  org.json.JSONArray careContexts = new org.json.JSONArray();
			  JSONObject careContextsObj = new JSONObject();
			  careContextsObj.put("referenceNumber", careContextReferenceNumber);
			  careContextsObj.put("display", "Care Context Ref Number");
			  careContexts.put(careContextsObj);
			  
			  patient.put("careContexts", careContexts);
			  
			  jsonObject.put("patient", patient);
			 
			  JSONObject res = new JSONObject();
			  res.put("requestId", resRequestId);
			  jsonObject.put("resp", res);
			  
			 
			  String urlname = HIP_HIU_URL+"v0.5/links/link/on-confirm";
//			  String urlname = "https://dev.abdm.gov.in/gateway/v0.5/links/link/on-confirm";
				
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

				if (conn.getResponseCode() != 200 && conn.getResponseCode() !=202) {
					throw new RuntimeException(
							"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
				}
				BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

				String output = br.readLine();
				org.json.JSONObject json = new org.json.JSONObject(output);
				System.out.println(json);
				//accesToken = json.getString("accessToken");
				conn.disconnect();
			 
			  
		}catch (Exception e) {
			e.printStackTrace();
		}
		
	
	}

	// /v0.5/health-information/hip/on-request api to ACKNOWLEDGED hip request api
	@Override
	public void HIPOnRequest(String transactionId, String requestId, String consentId) {
		LOG.info("Inside a HIPOnRequest method ");
		try {
			
			
			Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
			 String date = instant.toString();
			 System.out.println(date);

	          UUID uuid = UUID.randomUUID();
	          
	          String generateToken = createToken();
			
			  org.json.JSONObject jsonObject = new org.json.JSONObject();
			  jsonObject.put("requestId", uuid);
			  jsonObject.put("timestamp", date);  
			  
			  org.json.JSONObject hiRequest = new org.json.JSONObject();
			  hiRequest.put("transactionId", transactionId);
			  hiRequest.put("sessionStatus", "ACKNOWLEDGED"); 
			 
			  jsonObject.put("hiRequest", hiRequest);
			  
			  org.json.JSONObject resp = new org.json.JSONObject();
			  resp.put("requestId", requestId); 
			  jsonObject.put("resp", resp);
			  
//			   String urlname = "https://dev.abdm.gov.in/gateway/v0.5/health-information/hip/on-request";
			   String urlname = HIP_HIU_URL+"v0.5/health-information/hip/on-request";
				
				URL url = new URL(urlname);
				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				conn.setDoOutput(true);
				conn.setRequestMethod("POST");
				conn.setRequestProperty("Content-Type", "application/json");
				conn.setRequestProperty("charset", "utf-8");
//				conn.setRequestProperty("X-CM-ID", "sbx");
				conn.setRequestProperty("X-CM-ID", consentManager);
				conn.setRequestProperty("Authorization", "Bearer " + generateToken);
				conn.setDoOutput(true);
				OutputStream os = conn.getOutputStream();
				os.write(jsonObject.toString().getBytes());
				os.flush();
				os.close();

				System.out.println("response code ------------"+conn.getResponseCode());
				if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
					throw new RuntimeException(
							"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
				}
				BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

				String output = br.readLine();
//				org.json.JSONObject json = new org.json.JSONObject(output);
//				System.out.println(json);
				//accesToken = json.getString("accessToken");
				conn.disconnect();
		
		
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		try {
			//Thread.sleep(15000);
			sendHipRequestNotificationData(consentId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	 
	
	}

	@SuppressWarnings("unchecked")
	@Override
	public void consentFetch() {
		LOG.info("Inside a consentFetch method ");
		String generateToken = createToken();

		String output = "";

		UUID uuid = UUID.randomUUID();

		HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
				.currentRequestAttributes()).getRequest();
		HttpSession session = httpServletRequest.getSession();

		String consentArtefactsId = (String) session.getAttribute("consentArtefactsId");

		Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
		String currentDate = instant.toString();
		try {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("requestId", uuid.toString());
			jsonObject.put("timestamp", currentDate);
			jsonObject.put("consentId", consentArtefactsId);

//			String urlname = "https://dev.abdm.gov.in/gateway/v0.5/consents/fetch";
			
			String urlname = HIP_HIU_URL+"v0.5/consents/fetch";

			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);
//			conn.setRequestProperty("X-CM-ID", "sbx");
			conn.setRequestProperty("X-CM-ID", consentManager);

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();
			
			System.out.println("res code--------"+conn.getResponseCode());

			if (conn.getResponseCode() != 200 && conn.getResponseCode()!=202) {
				throw new RuntimeException(
						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();

			conn.disconnect();

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		// return output;
		
	}

	@Override
	public void sendCMRequest(String consentId) {
		LOG.info("Inside a sendCMRequest method ");
		String generateToken = createToken();

		String output = "";

		UUID uuid = UUID.randomUUID();

		HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
				.currentRequestAttributes()).getRequest();
		HttpSession session = httpServletRequest.getSession();

		String consentIdSession = (String) session.getAttribute("onFetchConsentId");
		
		String formDate = (String) session.getAttribute("from");
		String toDate = (String) session.getAttribute("to");
		String dataEraseAt = (String) session.getAttribute("dataEraseAt");

		Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
		String currentDate = instant.toString();

//		{
//			   "requestId": "{{$guid}}",
//			    "timestamp": "{{timestamp}}",
//			  "hiRequest": {
//			    "consent": {
//			      "id": "0451d4e0-8e1f-4fa8-95b0-a2376d009deb"
//			    },   
//			    "dataPushUrl": "https://webhook.site/75b9c695-0540-402f-ab6d-623d1a4c28e9/data/push",
//			    "keyMaterial": {
//			      "cryptoAlg": "ECDH",
//			      "curve": "Curve25519",
//			      "dhPublicKey": {
//			        "expiry": "2023-10-11T12:52:34.925",
//			        "parameters": "Curve25519/32byte random key",
//			        "keyValue": "BDULFxazo23n6aylLqt+/fK0/i4m/yZGYDojCA/mVPYdE8ow24PHrC9/GV34i7i1U03ePt7CfgsjedalRM+jGkk="
//			      },
//			      "nonce": "DDiTFOWcKvZaWknK46aLJbS3X3hlu5o4NvvoUUq3FfE="
//			    }
//			  }
//			}

		//KeyMaterial generateKeyValue = hipservice.generateKeyValue();
		try {
			KeyMaterial generateKeyValue = new KeyMaterial();
			final String uri = "http://localhost:8082/keys/generate";
	
			RestTemplate restTemplate = new RestTemplate();
			String result = restTemplate.getForObject(uri, String.class);
	
			org.json.JSONObject jsonData = new org.json.JSONObject(result);
	
			generateKeyValue.setPrivateKey(jsonData.getString("privateKey"));
			generateKeyValue.setPublicKey(jsonData.getString("publicKey"));
			generateKeyValue.setNonce(jsonData.getString("nonce"));
			
				    
		

			org.json.JSONObject consent = new org.json.JSONObject();
			consent.put("id", consentIdSession);

			org.json.JSONObject dhPublicKey = new org.json.JSONObject();
			dhPublicKey.put("expiry", dataEraseAt);
			dhPublicKey.put("parameters", "Curve25519/32byte random key");
			dhPublicKey.put("keyValue", generateKeyValue.getPublicKey());

			org.json.JSONObject keyMaterial = new org.json.JSONObject();
			keyMaterial.put("cryptoAlg", "ECDH");
			keyMaterial.put("curve", "Curve25519");
			keyMaterial.put("nonce", generateKeyValue.getNonce()); // put sender nonce generate
			keyMaterial.put("dhPublicKey", dhPublicKey);

			org.json.JSONObject dateRange = new org.json.JSONObject();
			dateRange.put("form", formDate);
			dateRange.put("to", toDate);
			
			
			org.json.JSONObject hiRequest = new org.json.JSONObject();
			hiRequest.put("consent", consent);
			hiRequest.put("keyMaterial", keyMaterial);
			hiRequest.put("dataPushUrl", "/data/push");
			hiRequest.put("dateRange", dateRange);

			org.json.JSONObject jsonObject = new org.json.JSONObject();
			jsonObject.put("requestId", uuid.toString());
			jsonObject.put("timestamp", currentDate);
			
			jsonObject.put("hiRequest", hiRequest);
			// jsonObject.put("hiRequest", hiRequest);

//			String urlname = "https://dev.abdm.gov.in/gateway/v0.5/health-information/cm/request";
			
			String urlname = HIP_HIU_URL+"v0.5/health-information/cm/request";

			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);
//			conn.setRequestProperty("X-CM-ID", "sbx");
			conn.setRequestProperty("X-CM-ID", consentManager);

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();
			
			System.out.println("res code--------------"+conn.getResponseCode());

			if (conn.getResponseCode() != 200 && conn.getResponseCode()!=202) {
				throw new RuntimeException(
						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();

			conn.disconnect();

		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public void healthInfoNotify(String transactionId) {
		LOG.info("Inside a healthInfoNotify method ");
//		{
//		  "requestId": "499a5a4a-7dda-4f20-9b67-e24589627061",
//		  "timestamp": "2022-10-14T10:30:16.392Z",
//		  "notification": {
//		    "consentId": "a1s2c932-2f70-3ds3-a3b5-2sfd46b12a18d",
//		    "transactionId": "a1s2c932-2f70-3ds3-a3b5-2sfd46b12a18d",
//		    "doneAt": "2022-10-14T10:30:16.392Z",
//		    "notifier": {
//		      "type": "HIU",
//		      "id": "tmh"
//		    },
//		    "statusNotification": {
//		      "sessionStatus": "TRANSFERRED",
//		      "hipId": "max",
//		      "statusResponses": [
//		        {
//		          "careContextReference": "string",
//		          "hiStatus": "OK",
//		          "description": "string"
//		        }
//		      ]
//		    }
//		  }
//		}
	String generateToken = createToken();

	String output = "";
	UUID uuid = UUID.randomUUID();

	Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
	String currentDate = instant.toString();

	try {

		org.json.JSONArray statusResponses = new org.json.JSONArray();
		org.json.JSONObject insideArray = new org.json.JSONObject();
		insideArray.put("careContextReference", uuid.toString());
		insideArray.put("hiStatus", currentDate);
		insideArray.put("description", uuid.toString());
		statusResponses.put(insideArray);

		org.json.JSONObject statusNotification = new org.json.JSONObject();
		statusNotification.put("sessionStatus", "TRANSFERRED");
		statusNotification.put("hipId", "MAX");
		statusNotification.put("statusResponses", statusResponses);

		org.json.JSONObject notifier = new org.json.JSONObject();
		notifier.put("type", uuid.toString());
		notifier.put("id", currentDate);

		org.json.JSONObject notification = new org.json.JSONObject();
		notification.put("consentId", "");
		notification.put("transactionId", "");
		notification.put("doneAt", "");
		notification.put("notifier", notifier);
		notification.put("statusNotification", statusNotification);

		org.json.JSONObject jsonObject = new org.json.JSONObject();
		jsonObject.put("requestId", uuid.toString());
		jsonObject.put("timestamp", currentDate);
		jsonObject.put("notification", notification);

//		String urlname = "https://dev.abdm.gov.in/gateway/v0.5/health-information/notify";
		
		String urlname = HIP_HIU_URL+"v0.5/health-information/notify";

		URL url = new URL(urlname);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setDoOutput(true);
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-Type", "application/json");
		conn.setRequestProperty("charset", "utf-8");
//		conn.setRequestProperty("X-CM-ID", "sbx");
		conn.setRequestProperty("X-CM-ID", consentManager);
		conn.setRequestProperty("Authorization", "Bearer " + generateToken);

		OutputStream os = conn.getOutputStream();
		os.write(jsonObject.toString().getBytes());
		os.flush();
		os.close();

		if (conn.getResponseCode() != 200) {
			throw new RuntimeException(
					"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
		}
		BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

		output = br.readLine();
		org.json.JSONObject jsonObject2 = new org.json.JSONObject(output);
		SandboxResponse response = new SandboxResponse();
		response.setTxnId(jsonObject2.getString("txnId"));
		conn.disconnect();
		// return response;

		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}
