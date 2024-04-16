package com.hms.sandbox.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.ResourceBundle;
import java.util.UUID;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.json.HTTP;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.hms.configuration.PageEventHandlerBean;
import com.hms.sandbox.dto.ConsentDTO;
import com.hms.sandbox.dto.SandBoxPatientInfo;
import com.hms.sandbox.dto.SandboxData;
import com.hms.sandbox.encryption.DecryptionRequest;
import com.hms.sandbox.encryption.DecryptionResponse;
import com.hms.sandbox.encryption.EncryptionRequest;
import com.hms.sandbox.encryption.KeyMaterial;
import com.hms.sandbox.encryption.SandboxResponse;
import com.hms.sandbox.service.HIPSandBoxService;
import com.hms.sandbox.service.ISandboxService;
import com.hms.sandbox.service.impl.SandboxServiceImpl;

import groovy.util.logging.Slf4j;

/******
 * @author :Vishant Pawar
 * @Date :07-10-2022
 *****/

@Controller
@RequestMapping(value = "")
@Slf4j
public class CallBackController {

	private static final Logger LOG = LogManager.getLogger(CallBackController.class);
	
	@Autowired
	HttpServletRequest request;

	@Autowired
	HIPSandBoxService hipservice;

	@Autowired
	ISandboxService sandboxService;
	
//	final String sumaSoftUrl="https://nha-suma-azb7fa3pfa-el.a.run.app/";
	
	@Autowired
	SessionFactory sf;

	@RequestMapping(value = "/v0.5/users/auth/on-init", method = RequestMethod.POST)
//	@ResponseBody
//	@ResponseStatus(HttpStatus.ACCEPTED)
	public void onInit(@RequestBody String responseData,HttpServletResponse res) {
		 
		LOG.info("Inside a  onInit callback method ");
		  Integer patientId=0;
		  String requestId="";
		  String transactionId="";
		try {

			HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes()).getRequest();
			HttpSession session = httpServletRequest.getSession();
			JSONObject jsonObject = new JSONObject(responseData);

			JSONObject jsonObject2 = jsonObject.getJSONObject("auth");
			 transactionId = jsonObject2.getString("transactionId");
			
			
			JSONObject jsonObject3 = jsonObject.getJSONObject("resp");
			 requestId = jsonObject3.getString("requestId");

			session.setAttribute("response", responseData);
			// System.out.println("Hello----------" + responseData);
			session.setAttribute("transactionId", transactionId);

			String transactionIdInSession = (String) session.getAttribute("transactionId");
			System.out.println(transactionIdInSession);

			
			System.out.println("on-init transactionId===="+transactionId);
			
		
			res.setStatus(HttpServletResponse.SC_ACCEPTED);
			
			
		
			
			
		} catch (Exception e) {

			e.printStackTrace();
		}
		
		hipservice.updateAuthTransactionId(requestId, transactionId);
		//hipservice.authConfirm(requestId);
//		return 202;
	}

	@RequestMapping(value = "/v0.5/users/auth/on-confirm", method = RequestMethod.POST)
	//@ResponseBody
	@ResponseStatus(HttpStatus.ACCEPTED)
	public void onConfirm(@RequestBody String responseData,HttpServletResponse res) {
		LOG.info("Inside a  onConfirm callback method "); 
		int patientId=0;
         String requestId="";
		try {

			HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes()).getRequest();
			HttpSession session = httpServletRequest.getSession();
			JSONObject jsonObject = new JSONObject(responseData);

			JSONObject authObject = jsonObject.getJSONObject("auth");
			String accessToken = authObject.getString("accessToken");
			System.out.println("accessToken----------" + accessToken);

			session.setAttribute("accessToken", accessToken);
			JSONObject jsonObject3 = jsonObject.getJSONObject("resp");
			 requestId = jsonObject3.getString("requestId");
			 
			 
			 sandboxService.saveAccessToken(requestId,accessToken);
		
			 System.out.println("patientId====="+patientId);
			 res.setStatus(HttpServletResponse.SC_ACCEPTED);

		} catch (Exception e) {

			e.printStackTrace();
		}
    
		   hipservice.addCareContext(requestId);
		// return responseData;

	}

	@RequestMapping(value = "/v0.5/links/link/on-add-contexts", method = RequestMethod.POST)
//	@ResponseBody
	public void addContexts(@RequestBody String responseData,HttpServletResponse res) {
		LOG.info("Inside a  addContexts callback method ");
		
		try {

			HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes()).getRequest();
			HttpSession session = httpServletRequest.getSession();
			JSONObject jsonObject = new JSONObject(responseData);

			res.setStatus(HttpServletResponse.SC_ACCEPTED);

		} catch (Exception e) {

			e.printStackTrace();
		}

		// return responseData;

	}

	// @author : Dayanand khandekar @reason : To call call-back api for discover
	@RequestMapping(value = "/v0.5/care-contexts/discover", method = RequestMethod.POST)
	//@ResponseBody
	//@ResponseStatus(HttpStatus.ACCEPTED)
	public void hipDiscover(@RequestBody String responseData,HttpServletResponse rs) {
		LOG.info("Inside a  hipDiscover callback method ");
		
		try {

			HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes()).getRequest();
			
	
			
			
			HttpSession session = httpServletRequest.getSession();
			JSONObject jsonObject = new JSONObject(responseData);

			// JSONObject jsonObject2 = jsonObject.getJSONObject("auth");
			// String hipDicovertransactionId = jsonObject2.getString("transactionId");
			String hipDicovertransactionId = jsonObject.getString("transactionId");
			System.out.println(hipDicovertransactionId);
			String hipDicoverrequestId = jsonObject.getString("requestId");
			System.out.println("hipDicoverrequestId=============" + hipDicoverrequestId);
			System.out.println("hipDicovertransactionId============" + hipDicovertransactionId);
			
			JSONObject jsonObject2 = jsonObject.getJSONObject("patient");
			String hipHealthId = jsonObject2.getString("id");
			System.out.println(hipHealthId);

			session.setAttribute("hipDicovertransactionId", hipDicovertransactionId);
			session.setAttribute("hipDicoverrequestId", hipDicoverrequestId);
			session.setAttribute("hipHealthId", hipHealthId);

			rs.setStatus(HttpServletResponse.SC_ACCEPTED);
			
			hipservice.sendHIPDiscoverData(hipHealthId);

		} catch (Exception e) {

			e.printStackTrace();
		}

	}

	// @author : Dayanand khandekar @reason : To call call-back api for hip notify
	@RequestMapping(value = "/v0.5/consents/hip/notify", method = RequestMethod.POST)
	//@ResponseBody
	public void hipNotify(@RequestBody String responseData,HttpServletResponse res) {
		
		LOG.info("Inside a  hipNotify callback method ");
		
		try {

			HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes()).getRequest();
			HttpSession session = httpServletRequest.getSession();
			JSONObject jsonObject = new JSONObject(responseData);

			String hipNotifyrequestId = jsonObject.getString("requestId");
			System.out.println("hipNotifyrequestId----------" + hipNotifyrequestId);
			JSONObject jsonObject2 = jsonObject.getJSONObject("notification");
			String hipNotifyStatus = jsonObject2.getString("status");
		
			
			System.out.println("hipNotifyStatus===" + hipNotifyStatus);
			String hipNotifyconsentId = jsonObject2.getString("consentId");

			JSONObject jsonObject3 = jsonObject2.getJSONObject("consentDetail");

			JSONArray jsonArray = jsonObject3.getJSONArray("careContexts");
			JSONObject careHipObj = jsonArray.getJSONObject(0);
			String careContextReferenceHipNotify = careHipObj.getString("careContextReference");
			
			

			session.setAttribute("hipNotifyrequestId", hipNotifyrequestId);
			session.setAttribute("hipNotifyStatus", hipNotifyStatus);
			session.setAttribute("hipNotifyconsentId", hipNotifyconsentId);
			session.setAttribute("careContextReferenceHipNotify", careContextReferenceHipNotify);

			// sendHIPOnNotifyData();
			JSONObject jsonPatient = jsonObject3.getJSONObject("patient");
			String patientHealthId = jsonPatient.getString("id");
			
			res.setStatus(HttpServletResponse.SC_ACCEPTED);
			hipservice.sendHIPOnNotifyData( patientHealthId,careContextReferenceHipNotify,hipNotifyconsentId);

			
			
		} catch (Exception e) {

			e.printStackTrace();
		}

	}
	
	// @author : Dayanand khandekar @reason : To call call-back api for hip request
		@RequestMapping(value = "/v0.5/health-information/hip/request", method = RequestMethod.POST)
		//@ResponseBody
		public void hipRequest(@RequestBody String responseData,HttpServletResponse res) {

			LOG.info("Inside a  hipRequest callback method ");
			try {

				res.setStatus(HttpServletResponse.SC_ACCEPTED);
				HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
						.currentRequestAttributes()).getRequest();
				HttpSession session = httpServletRequest.getSession();
				JSONObject jsonObject = new JSONObject(responseData);

				String hipRequestId = jsonObject.getString("requestId");
				System.out.println("hipRequestrequestId----------" + hipRequestId);
				String hipRequesttransactionId = jsonObject.getString("transactionId");
				System.out.println("hipRequesttransactionId----------" + hipRequesttransactionId);
				JSONObject jsonObject2 = jsonObject.getJSONObject("hiRequest");
				String hipRequestNotificationdataPushUrl = jsonObject2.getString("dataPushUrl");
				String dataPushUrl = jsonObject2.getString("dataPushUrl");
				
				session.setAttribute("dataPushUrl", dataPushUrl);
				
				JSONObject jsonObjectKeyMaterial = jsonObject2.getJSONObject("keyMaterial");
				String hipRequestcryptoAlg = jsonObjectKeyMaterial.getString("cryptoAlg");
				String hipRequestcurve = jsonObjectKeyMaterial.getString("curve");
				String hipRequestNonce = jsonObjectKeyMaterial.getString("nonce");

				JSONObject jsondhPublicKey = jsonObjectKeyMaterial.getJSONObject("dhPublicKey");

				String hipRequestKeyValue = jsondhPublicKey.getString("keyValue");
				String hipRequestexpiry = jsondhPublicKey.getString("expiry");

				session.setAttribute("hipRequestId", hipRequestId);
				session.setAttribute("hipRequesttransactionId", hipRequesttransactionId);
				session.setAttribute("hipNotificationdataPushUrl", hipRequestNotificationdataPushUrl);
				session.setAttribute("hipRequestNonce", hipRequestNonce);
				session.setAttribute("hipRequestKeyValue", hipRequestKeyValue);
				session.setAttribute("hipRequestcryptoAlg", hipRequestcryptoAlg);
				session.setAttribute("hipRequestcurve", hipRequestcurve);
				session.setAttribute("hipRequestexpiry", hipRequestexpiry);
				
				JSONObject jsonObjectConsent = jsonObject2.getJSONObject("consent");
				String consentId = jsonObjectConsent.getString("id");

				hipservice.HIPOnRequest(hipRequesttransactionId, hipRequestId,consentId);
//				hipservice.sendHipRequestNotificationData(consentId);

			} catch (Exception e) {

				e.printStackTrace();
			}

		}

	@RequestMapping(value = "/v0.5/consent-requests/on-init", method = RequestMethod.POST)
	//@ResponseBody
	public void consentReqonInit(@RequestBody String responseData,HttpServletResponse res) {
		LOG.info("Inside a  consentReqonInit callback method ");
		try {

			HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes()).getRequest();
			HttpSession session = httpServletRequest.getSession(true);
			JSONObject jsonObject = new JSONObject(responseData);

			JSONObject consentRequest = jsonObject.getJSONObject("consentRequest");
			String consentRequestId = consentRequest.getString("id");
			System.out.println(consentRequestId);
			
			JSONObject resp = jsonObject.getJSONObject("resp");
			String resRequestId = resp.getString("requestId");
			
			String healthId = (String) session.getAttribute("consentHealthId");

			ConsentDTO consentByHealthId = sandboxService.getConsentByRequestId(resRequestId);

			consentByHealthId.setConsentId(consentRequestId);

			List<ConsentDTO> saveConsent = sandboxService.saveConsent(consentByHealthId);

			session.setAttribute("consentRequestId", consentRequestId);

			String transactionIdInSession = (String) session.getAttribute("consentRequestId");
			System.out.println("consent-requests on init =="+transactionIdInSession);
			
			res.setStatus(HttpServletResponse.SC_ACCEPTED);

		} catch (Exception e) {

			e.printStackTrace();
		}

	}

	@RequestMapping(value = "/v0.5/consents/hiu/notify", method = RequestMethod.POST)
	//@ResponseBody
	
	public void hiuNotify(@RequestBody String responseData) {
		LOG.info("Inside a  hiuNotify callback method ");
		try {

			HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes()).getRequest();
			HttpSession session = httpServletRequest.getSession();
			JSONObject jsonObject = new JSONObject(responseData);

			JSONObject notification = jsonObject.getJSONObject("notification");
			String consentRequestId = notification.getString("consentRequestId");

			String status = notification.getString("status");
			ConsentDTO dataByConsentId = sandboxService.getDataByConsentId(consentRequestId);

			JSONArray jsonArray = notification.getJSONArray("consentArtefacts");
			JSONObject consentArtefactsObject= new JSONObject();
			String consentArtefactsId ="";
			if(!status.equals("DENIED")) {
			consentArtefactsObject = jsonArray.getJSONObject(0);
			consentArtefactsId = consentArtefactsObject.getString("id");
			System.out.println(consentArtefactsId);
			}
		
			if(status.equals("GRANTED")) {
				dataByConsentId.setRequestStatus("GRANTED");
			}
			else if(status.equals("EXPIRED")) {
				dataByConsentId.setRequestStatus("EXPIRED");
			}
			else if(status.equals("DENIED")) {
				dataByConsentId.setRequestStatus("DENIED");
			}
			else if(status.equals("REQUESTED")) {
				dataByConsentId.setRequestStatus("REQUESTED");
			}
			else {
				dataByConsentId.setRequestStatus("REVOKED");
			}
			

			dataByConsentId.setConsentArtFactId(consentArtefactsId);
			
			SandBoxPatientInfo sandboxPatient = hipservice.getSandboxPatient(dataByConsentId.getHealthId());
			
			dataByConsentId.setDecryptedData(sandboxPatient.getPrescriptionEncryptedData());
//			dataByConsentId.setDecryptedData("{\"resourceType\":\"Bundle\",\"id\":\"3739707e-1123-46fe-918f-b52d880e4e7f\",\"meta\":{\"lastUpdated\":\"2022-11-02T00:00:00.000+05:30\"},\"identifier\":{\"system\":\"https://www.max.in/bundle\",\"value\":\"3739707e-1123-46fe-918f-b52d880e4e7f\"},\"type\":\"document\",\"timestamp\":\"2022-11-02T00:00:00.000+05:30\",\"entry\":[{\"fullUrl\":\"Composition/c63d1435-b6b6-46c4-8163-33133bf0d9bf\",\"resource\":{\"resourceType\":\"Composition\",\"id\":\"c63d1435-b6b6-46c4-8163-33133bf0d9bf\",\"identifier\":{\"system\":\"https://www.max.in/document\",\"value\":\"c63d1435-b6b6-46c4-8163-33133bf0d9bf\"},\"status\":\"final\",\"type\":{\"coding\":[{\"system\":\"https://projecteka.in/sct\",\"code\":\"440545006\",\"display\":\"Prescriptionrecord\"}]},\"subject\":{\"reference\":\"Patient/RVH9999\"},\"encounter\":{\"reference\":\"Encounter/dab7fd2b-6a05-4adb-af35-bcffd6c85b81\"},\"date\":\"2022-11-02T00:00:00.605+05:30\",\"author\":[{\"reference\":\"Practitioner/MAX5001\",\"display\":\"Dr Ram Sharma\"}],\"title\":\"Prescription\",\"section\":[{\"title\":\"OPDPrescription\",\"code\":{\"coding\":[{\"system\":\"https://projecteka.in/sct\",\"code\":\"440545006\",\"display\":\"Prescriptionrecord\"}]},\"entry\":[{\"reference\":\"MedicationRequest/68d9667c-00c3-455f-b75d-d580950498a0\"}]}]}},{\"fullUrl\":\"Practitioner/MAX5001\",\"resource\":{\"resourceType\":\"Practitioner\",\"id\":\"MAX5001\",\"identifier\":[{\"system\":\"https://www.mciindia.in/doctor\",\"value\":\"MAX5001\"}],\"name\":[{\"text\":\"Ram Sharma\",\"prefix\":[\"Dr\"],\"suffix\":[\"MD\"]}]}},{\"fullUrl\":\"Patient/RVH9999\",\"resource\":{\"resourceType\":\"Patient\",\"id\":\"RVH9999\",\"name\":[{\"text\":\"Sourabh Agarwal\"}],\"gender\":\"male\"}},{\"fullUrl\":\"Encounter/dab7fd2b-6a05-4adb-af35-bcffd6c85b81\",\"resource\":{\"resourceType\":\"Encounter\",\"id\":\"dab7fd2b-6a05-4adb-af35-bcffd6c85b81\",\"status\":\"finished\",\"class\":{\"system\":\"http://terminology.hl7.org/CodeSystem/v3-ActCode\",\"code\":\"AMB\",\"display\":\"Outpatientvisit\"},\"subject\":{\"reference\":\"Patient/RVH9999\"},\"period\":{\"start\":\"2022-11-02T00:00:00+05:30\"}}},{\"fullUrl\":\"Medication/54ab5657-5e79-4461-a823-20e522eb337d\",\"resource\":{\"resourceType\":\"Medication\",\"id\":\"54ab5657-5e79-4461-a823-20e522eb337d\",\"code\":{\"coding\":[{\"system\":\"https://projecteka.in/act\",\"code\":\"R05CB02\",\"display\":\"bromhexine24mg\"}]}}},{\"fullUrl\":\"MedicationRequest/68d9667c-00c3-455f-b75d-d580950498a0\",\"resource\":{\"resourceType\":\"MedicationRequest\",\"id\":\"68d9667c-00c3-455f-b75d-d580950498a0\",\"status\":\"active\",\"intent\":\"order\",\"medicationReference\":{\"reference\":\"Medication/54ab5657-5e79-4461-a823-20e522eb337d\"},\"subject\":{\"reference\":\"Patient/RVH9999\"},\"authoredOn\":\"2022-11-02T00:00:00+05:30\",\"requester\":{\"reference\":\"Practitioner/MAX5001\"},\"dosageInstruction\":[{\"text\":\"1capsule2timesaday\"}]}}]}");
			sandboxService.saveConsent(dataByConsentId);

			session.setAttribute("consentArtefactsId", consentArtefactsId);

			String consentArtefactsIdInSession = (String) session.getAttribute("consentArtefactsId");
			System.out.println(consentArtefactsIdInSession);

//			consentFetch();
			hipservice.consentFetch();
			

		} catch (Exception e) {

			e.printStackTrace();
		}

	}

	@RequestMapping(value = "/v0.5/consents/on-fetch", method = RequestMethod.POST)
	@ResponseBody
	public void consentOnFetch(@RequestBody String responseData) {
		LOG.info("Inside a  consentOnFetch callback method ");
		try {

			HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes()).getRequest();
			HttpSession session = httpServletRequest.getSession();
			JSONObject jsonObject = new JSONObject(responseData);

			JSONObject consent = jsonObject.getJSONObject("consent");

			JSONObject consentDetail = consent.getJSONObject("consentDetail");
			
			
			String consentId = consentDetail.getString("consentId");
			System.out.println(consentId);
			
			JSONObject permission = consentDetail.getJSONObject("permission");
			
			JSONObject dateRange = permission.getJSONObject("dateRange");
			String formDate = dateRange.getString("from");
			String toDate = dateRange.getString("to");
			String dataEraseAt = permission.getString("dataEraseAt");
			System.out.println("dataEraseAt---------"+dataEraseAt);
			session.setAttribute("dataEraseAt", dataEraseAt);

			session.setAttribute("formDate", formDate);
			session.setAttribute("toDate", toDate);
			session.setAttribute("onFetchConsentId", consentId);

			String onFetchConsentIdInSession = (String) session.getAttribute("onFetchConsentId");
			System.out.println(onFetchConsentIdInSession);

//			sendCMRequest(consentId);
			hipservice.sendCMRequest(consentId);

		} catch (Exception e) {

			e.printStackTrace();
		}

	}
	                          
	@RequestMapping(value = "/v0.5​/health-information​/hiu​/on-request", method = RequestMethod.POST)
	@ResponseBody
	public void HIUOnRequest(@RequestBody String responseData) {
		LOG.info("Inside a  HIUOnRequest callback method ");
		try {

			HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes()).getRequest();
			HttpSession session = httpServletRequest.getSession();
			JSONObject jsonObject = new JSONObject(responseData);

			JSONObject hiRequest = jsonObject.getJSONObject("hiRequest");

			// JSONObject consentDetail = hiRequest.getJSONObject("consentDetail");
			String HIUonRequestTransactionId = hiRequest.getString("transactionId");
			// System.out.println(responseData);

			session.setAttribute("HIUonRequestTransactionId", HIUonRequestTransactionId);

			String transactionIdInSession = (String) session.getAttribute("HIUonRequestTransactionId");
			System.out.println("HIUonRequestTransactionId----------" + transactionIdInSession);

			// sendCMRequest(consentId);

		} catch (Exception e) {

			e.printStackTrace();
		}

	}
	
	@RequestMapping(value = "/v0.5/health-information/transfer", method = RequestMethod.POST)
	@ResponseBody
	public void healthInfoTransfer(@RequestBody String responseData) {
		LOG.info("Inside a  HIUOnRequest callback method ");
		try {

			HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes()).getRequest();
			HttpSession session = httpServletRequest.getSession();
			JSONObject jsonObject = new JSONObject(responseData);
			String transactionId = (String) jsonObject.get("transactionId");

			JSONObject keyMaterial = jsonObject.getJSONObject("KeyMaterial");
			System.out.println("keyMaterial-----------" + keyMaterial);

			String nonce = (String) keyMaterial.get("nonce");
			System.out.println("nonce--------------------" + nonce);

			JSONObject dhPublicKey = keyMaterial.getJSONObject("dhPublicKey");
			String keyValue = (String) dhPublicKey.get("keyValue");
			System.out.println("keyValue-------------" + keyValue);

			JSONArray jsonArray = jsonObject.getJSONArray("entries");
			JSONObject jsonObject2 = jsonArray.getJSONObject(0);

			String encryptedData = (String) jsonObject2.get("content");
			System.out.println("encryptedData----------" + encryptedData);

		} catch (Exception e) {

			e.printStackTrace();
		}

	}

	@RequestMapping(value = "/data/push", method = RequestMethod.POST)
	@ResponseBody
	public void receiveDataFromHIU(@RequestBody String responseData) {
		LOG.info("Inside a  receiveDataFromHIU callback method ");
		try {

			HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes()).getRequest();
			HttpSession session = httpServletRequest.getSession();
			JSONObject jsonObject = new JSONObject(responseData);

			String transactionId = (String) jsonObject.get("transactionId");

			JSONObject keyMaterial = jsonObject.getJSONObject("KeyMaterial");
			System.out.println("keyMaterial-----------" + keyMaterial);

			String nonce = (String) keyMaterial.get("nonce");
			System.out.println("nonce--------------------" + nonce);

			JSONObject dhPublicKey = keyMaterial.getJSONObject("dhPublicKey");
			String keyValue = (String) dhPublicKey.get("keyValue");
			System.out.println("keyValue-------------" + keyValue);

			JSONArray jsonArray = jsonObject.getJSONArray("entries");
			JSONObject jsonObject2 = jsonArray.getJSONObject(0);

			String encryptedData = (String) jsonObject2.get("content");
			System.out.println("encryptedData----------" + encryptedData);
			
			
			//generate keys
			KeyMaterial generateKeyValue = new KeyMaterial();
			final String uri = "http://localhost:8082/keys/generate";

			RestTemplate restTemplate = new RestTemplate();
			String result = restTemplate.getForObject(uri, String.class);

			org.json.JSONObject jsonData = new org.json.JSONObject(result);

			

			//KeyMaterial generateKeyValue = hipservice.generateKeyValue();

			DecryptionRequest decryptionRequest = new DecryptionRequest();
			decryptionRequest.setSenderPublicKey(keyValue);
			decryptionRequest.setSenderNonce(nonce);
			decryptionRequest.setReceiverPrivateKey(generateKeyValue.getPrivateKey());
			decryptionRequest.setReceiverNonce(generateKeyValue.getNonce());

			decryptionRequest.setEncryptedData(encryptedData);
//			decryptionRequest.setReceiverNonce(receiverNonce);
			
			// decrypte data function
			
			final String encryptUrl = "http://localhost:8082/encrypt";

			RestTemplate restTemplate2 = new RestTemplate();
			ResponseEntity<String> encryptResult = restTemplate2.postForEntity(encryptUrl,decryptionRequest,String.class);
						
			String resultBody = encryptResult.getBody();
			//JsonParser jsonParser = new JsonParser();
			//org.json.JSONObject encryptedData = new org.json.JSONObject(resultBody);			
			

			DecryptionResponse decryptData = hipservice.decryptData(decryptionRequest);

			System.out.println("decryptData----------" + decryptData);

			// hipservice.encryptData(encryptionRequest)

//			JSONObject consent = jsonObject.getJSONObject("consent");
//
//			JSONObject consentDetail = consent.getJSONObject("consentDetail");
//			String consentId = consentDetail.getString("consentId");
//			System.out.println(consentId);
//
//			session.setAttribute("onFetchConsentId", consentId);
//
//			String transactionIdInSession = (String) session.getAttribute("onFetchConsentId");
//			System.out.println(transactionIdInSession);

			// sendCMRequest(consentId);
			//healthInfoNotify(transactionId);
			hipservice.healthInfoNotify(transactionId);

		} catch (Exception e) {

			e.printStackTrace();
		}

	}

	
	@RequestMapping(value = "/v1.0/patients/profile/share", method = RequestMethod.POST)
//	@ResponseBody
	@ResponseStatus(HttpStatus.ACCEPTED)
	public void  getShaireProfileInfo(@RequestBody String responseData,HttpServletRequest req,HttpServletResponse res) {
		LOG.info("Inside a  getShaireProfileInfo callback method ");
		try {
		HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
				.currentRequestAttributes()).getRequest();
		HttpSession session = httpServletRequest.getSession();
		JSONObject jsonObject = new JSONObject(responseData);
		String  requestId = jsonObject.getString("requestId");
		
		JSONObject profile = jsonObject.getJSONObject("profile");
		
		String hipCode = profile.getString("hipCode");
		JSONObject patient=profile.getJSONObject("patient");
		String healthId = patient.getString("healthId");
		
		String yearOfBirth = patient.getString("yearOfBirth");
		String dayOfBirth = patient.getString("dayOfBirth");
		String monthOfBirth = patient.getString("monthOfBirth");
		
		String dob = dayOfBirth+"/"+monthOfBirth+"/"+yearOfBirth;
		
		SandboxData sandboxData = new SandboxData();
		sandboxData.setGender(patient.getString("gender"));
		sandboxData.setPatientName(patient.getString("name"));
		sandboxData.setHealthId(patient.getString("healthId"));
		sandboxData.setHealthIdNumber(patient.getString("healthIdNumber"));
		sandboxData.setDob(dob);
		
		System.out.println("shaire requestId==="+requestId);
		
		hipservice.updateProfileRequestId(requestId, healthId,hipCode,sandboxData);
		
		
		
		
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		
	}
	
	
	
	//USER_INIT_LINK_CARE_CONTEXT_02
		@RequestMapping(value = "/v0.5/links/link/init", method = RequestMethod.POST)
		@ResponseBody
		public void linkInit(@RequestBody String responseData,HttpServletResponse rs) {
			LOG.info("Inside a  linkInit callback method ");
			try {

				HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
						.currentRequestAttributes()).getRequest();
				HttpSession session = httpServletRequest.getSession();
				JSONObject jsonObject = new JSONObject(responseData);

			
				String linkInittransactionId = jsonObject.getString("transactionId");
				System.out.println("linkInittransactionId==================="+linkInittransactionId);
				String linkInitrequestId= jsonObject.getString("requestId");
				System.out.println("linkInitrequestId============================" + linkInitrequestId);
				JSONObject patient = jsonObject.getJSONObject("patient");
				String healthID = patient.getString("id");
				System.out.println("healthID==="+healthID);
				String patientReferNumber = patient.getString("referenceNumber");
				JSONArray linkInitcareContexts = patient.getJSONArray("careContexts");
				JSONObject careContext = linkInitcareContexts.getJSONObject(0);
				String careReferenceNumber = careContext.getString("referenceNumber");
				
				session.setAttribute("linkInitrequestId", linkInitrequestId);
				session.setAttribute("linkInitid", healthID);
				session.setAttribute("careReferenceNumber", careReferenceNumber);
				session.setAttribute("patientReferNumber", patientReferNumber);
				session.setAttribute("linkInitcareContexts", linkInitcareContexts);
				session.setAttribute("linkInittransactionId", linkInittransactionId);
				
				rs.setStatus(HttpServletResponse.SC_ACCEPTED);
			//	sendLinkOnInitData(int patientId);
				int patientId=8;
	            hipservice.sendLinkOnInitData(patientId,linkInitrequestId,linkInittransactionId);
				
			} catch (Exception e) {

				e.printStackTrace();
			}
		
		}
		
		
		@RequestMapping(value = "/v0.5/links/link/confirm", method = RequestMethod.POST)
		@ResponseBody
		public void linkconfirm(@RequestBody String responseData,HttpServletResponse rs) {
			LOG.info("Inside a  linkconfirm callback method ");
			try {

				HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
						.currentRequestAttributes()).getRequest();
				HttpSession session = httpServletRequest.getSession();
				JSONObject jsonObject = new JSONObject(responseData);
      
				
//				{
//					  "requestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//					  "timestamp": "2022-12-14T05:43:57.684Z",
//					  "confirmation": {
//					    "linkRefNumber": "string",
//					    "token": "string"
//					  }
//					}
				
				String resRequestId=jsonObject.getString("requestId");
				
				JSONObject confirmation=jsonObject.getJSONObject("confirmation");
				String patientRefNumber=confirmation.getString("linkRefNumber");
				String token=confirmation.getString("token");
				
				session.setAttribute("patientRefNumber", patientRefNumber);
				session.setAttribute("linkInitToken", token);
			
				
				rs.setStatus(HttpServletResponse.SC_ACCEPTED);
				int patientId=8;
				hipservice.sendlinkOnconfirmData(resRequestId);
				
	 
			} catch (Exception e) {

				e.printStackTrace();
			}
		
		}
		
		
		// @author : Dayanand khandekar @reason : To call call-back api for sms on-notify
		@RequestMapping(value = "/v0.5/patients/sms/on-notify", method = RequestMethod.POST)
		//@ResponseBody
		public void smsOnNotify(@RequestBody String responseData,HttpServletResponse res) {
			LOG.info("Inside a  smsOnNotify callback method ");
			try {

				HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
						.currentRequestAttributes()).getRequest();
				HttpSession session = httpServletRequest.getSession();
				JSONObject jsonObject = new JSONObject(responseData);
				String status=jsonObject.getString("status");
				
				System.out.println("sms on notify status =========="+status);
				
				res.setStatus(HttpServletResponse.SC_ACCEPTED);
				
			}catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		@RequestMapping(value = "/v0.5/links/context/on-notify", method = RequestMethod.POST)
//		@ResponseBody
//		@ResponseStatus(HttpStatus.ACCEPTED)
		public void  contextOnNotify(@RequestBody String responseData,HttpServletResponse res) {
			LOG.info("Inside a  contextOnNotify callback method ");
			try {
			HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes()).getRequest();
			HttpSession session = httpServletRequest.getSession();
			JSONObject jsonObject = new JSONObject(responseData);
			String  requestId = jsonObject.getString("requestId");
			
			JSONObject acknowledgement = jsonObject.getJSONObject("acknowledgement");
			JSONObject resp=jsonObject.getJSONObject("resp");
			String status = acknowledgement.getString("status");
			res.setStatus(HttpServletResponse.SC_ACCEPTED);
//			if(status.equals("SUCCESS")) {
//				v
//			}
			
			String respReqId = resp.getString("starequestIdtus");
			
			
			System.out.println("shaire requestId==="+requestId);
			
//			hipservice.updateProfileRequestId(requestId, healthId);
			
			
			}catch (Exception e) {
				e.printStackTrace();
			}
			
			
		}

		
		@RequestMapping(value = "/v0.5/consents/hip/on-notify", method = RequestMethod.POST)
		//@ResponseBody
		public void HIPOnNotify(@RequestBody String responseData,HttpServletResponse res) {
			LOG.info("Inside a  HIPOnNotify callback method ");
			try {

				HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
						.currentRequestAttributes()).getRequest();
				HttpSession session = httpServletRequest.getSession();
				JSONObject jsonObject = new JSONObject(responseData);

				JSONObject acknowledgement = jsonObject.getJSONObject("acknowledgement");

				// JSONObject consentDetail = hiRequest.getJSONObject("consentDetail");
				String consentId = acknowledgement.getString("consentId");
				// System.out.println(responseData);

				session.setAttribute("consentId", consentId);

				String consentIdInSession = (String) session.getAttribute("consentId");
				System.out.println("HIUonRequestTransactionId----------" + consentIdInSession);

				res.setStatus(HttpServletResponse.SC_ACCEPTED);
				

			} catch (Exception e) {

				e.printStackTrace();
			}

		}
		
		
		@RequestMapping(value = "/v0.5/patients/on-find", method = RequestMethod.POST)
//		@ResponseBody
//		@ResponseStatus(HttpStatus.ACCEPTED)
		public void  patientOnFind(@RequestBody String responseData,HttpServletResponse res,HttpServletRequest req) {
			LOG.info("Inside a  patientOnFind callback method ");
			try {
			HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes()).getRequest();
			HttpSession session = httpServletRequest.getSession();
			JSONObject jsonObject = new JSONObject(responseData);
			String  requestId = jsonObject.getString("requestId");

			JSONObject patient = jsonObject.getJSONObject("patient");
			
			
			session.setAttribute("jsonObject", jsonObject);
			
//			JSONObject error = jsonObject.getJSONObject("error");
//			String message = error.getString("message");
//			if(patient==null) {
//				
//				
//			}
			String  healthId = patient.getString("id");
			String  patientName = patient.getString("name");
			
			
			//System.out.println(attribute);
			
			//sandboxService.savePatientName(healthId, patientName);
			
			JSONObject resp = jsonObject.getJSONObject("resp");
			String respRequestId = resp.getString("requestId");
			
			
			res.setStatus(HttpServletResponse.SC_ACCEPTED);
			//System.out.println("shaire requestId==="+requestId);
			
			//hipservice.updateProfileRequestId(requestId, healthId);
			
//			HttpSession session2 = req.getSession(true);
//			session2.setAttribute("patientName",patientName);
//			RequestDispatcher rd = req.getRequestDispatcher("/abdm_consent.jsp");
//			req.setAttribute("patientName", patientName);
//			rd.forward(req, res);
			
			}catch (Exception e) {
				e.printStackTrace();
			}
			
			
		}

}
