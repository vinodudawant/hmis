package com.hms.sandbox.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.hms.sandbox.dto.HIPSandboxCareInfo;
import com.hms.sandbox.dto.SandBoxPatientDignosis;
import com.hms.sandbox.dto.SandBoxPatientInfo;
import com.hms.sandbox.encryption.KeyMaterial;
import com.hms.sandbox.service.HIPSandBoxService;

import groovy.util.logging.Slf4j;

@Controller
@RequestMapping(value = "/hipsandbox")
@Slf4j
public class HIPSandBoxController {
	
	@Autowired
	SessionFactory sf;
	
	@Autowired
	HIPSandBoxService hipService;
   
	//@author : Dayanand khandekar  @reason : To generate the token
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/session", method = RequestMethod.POST)
	public static String generateToken() {

		String clientId = "SBX_001584";
		String clientSecret = "d6efe4f9-c497-4a5c-bd16-21e415bf21fb";

		JSONObject jsonObject = new JSONObject();
		try {
			jsonObject.put("clientId", clientId);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
			jsonObject.put("clientSecret", clientSecret);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

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
	
	//@author : Dayanand khandekar  @reason : To call call-back api  for discover
	@RequestMapping(value = "/v0.5/care-contexts/discover", method = RequestMethod.POST)
	@ResponseBody
	public void hipDiscover(@RequestBody String responseData) {

		try {

			HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes()).getRequest();
			HttpSession session = httpServletRequest.getSession();
			JSONObject jsonObject = new JSONObject(responseData);

		//	JSONObject jsonObject2 = jsonObject.getJSONObject("auth");
			//String hipDicovertransactionId = jsonObject2.getString("transactionId");
			String hipDicovertransactionId = jsonObject.getString("transactionId");
			System.out.println(hipDicovertransactionId);
			String hipDicoverrequestId= jsonObject.getString("requestId");
			System.out.println("hipDicoverrequestId----------" + hipDicoverrequestId);
			JSONObject jsonObject2 = jsonObject.getJSONObject("patient");
			String hipHealthId = jsonObject2.getString("id");
			System.out.println(hipHealthId);
		
			session.setAttribute("hipDicovertransactionId", hipDicovertransactionId);
			session.setAttribute("hipDicoverrequestId", hipDicoverrequestId);
			session.setAttribute("hipHealthId", hipHealthId);
			
			//String transactionIdInSession =(String) session.getAttribute("transactionId");
			//System.out.println(transactionIdInSession);
			int patientId=0;
			Criteria c   =sf.getCurrentSession().createCriteria(SandBoxPatientInfo.class);
			       c.add(Restrictions.eq("helathId", hipHealthId));
			 List<SandBoxPatientInfo>  list  = c.list();
			 if(list.size() > 0 ) {
				 patientId=list.get(0).getPatientId();
			 }
			     
 
		} catch (Exception e) {

			e.printStackTrace();
		}
	
	}
	
	
	
	public void sendHIPDiscoverData(int patientId) {
		HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
				.currentRequestAttributes()).getRequest();
		HttpSession session = httpServletRequest.getSession();
		try {
		Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
		String date = instant.toString();
		System.out.println(date);
		String hipDicovertransactionId =(String) session.getAttribute("hipDicovertransactionId");
		String hipDicoverrequestId =(String) session.getAttribute("hipDicoverrequestId");
		String hipHealthId =(String) session.getAttribute("hipHealthId");
		
		SandBoxPatientInfo obj   =(SandBoxPatientInfo) sf.getCurrentSession().get(SandBoxPatientInfo.class, patientId);
        List<SandBoxPatientDignosis>  dignolist		=obj.getListSandBoxDigno();
        List<HIPSandboxCareInfo>  hipdignolist=new ArrayList<>();
        String refrenceNumber="0";
        if(dignolist.size() > 0) {
        	refrenceNumber=dignolist.get(0).getPatientReferenceNumber();
        	   for(SandBoxPatientDignosis sobj  :dignolist) {
        		   HIPSandboxCareInfo hobj=new HIPSandboxCareInfo();
        		       hobj.setReferenceNumber(sobj.getCareContextRefNumber());
        		       hobj.setDisplay(sobj.getDiagndesc());
        		       hipdignolist.add(hobj);
        	   }
        }
       
        
        JSONObject jsonObjectp = new JSONObject();
		  jsonObjectp.put("referenceNumber", refrenceNumber);
		  jsonObjectp.put("display", "Demo");
        
		  //JSONObject jsonObjectcare = new JSONObject();
		  JSONArray jsArray = new JSONArray(hipdignolist);
		  jsonObjectp.put("careContexts", jsArray);
		 
		  
		  JSONObject jsonObjectresp = new JSONObject();
		  jsonObjectresp.put("requestId", hipDicoverrequestId);
		  
        
        JSONObject jsonObject = new JSONObject();
		jsonObject.put("requestId", hipDicoverrequestId);
		jsonObject.put("timestamp", date);
		jsonObject.put("transactionId", hipDicovertransactionId);
		jsonObject.put("patient", jsonObjectp);
		jsonObject.put("resp", jsonObjectresp);

		String urlname = "https://dev.abdm.gov.in/gateway/v0.5/care-contexts/on-discover";
		
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
		//accesToken = json.getString("accessToken");
		conn.disconnect();
		
		
		
		}catch (Exception e) {
			e.printStackTrace();
		}
	

	}
	
	
	//@author : Dayanand khandekar  @reason : To call call-back api  for hip notify
		@RequestMapping(value = "/v0.5/consents/hip/notify", method = RequestMethod.POST)
		@ResponseBody
		public void hipNotify(@RequestBody String responseData) {

			try {

				HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
						.currentRequestAttributes()).getRequest();
				HttpSession session = httpServletRequest.getSession();
				JSONObject jsonObject = new JSONObject(responseData);

			
				String hipDicovertransactionId = jsonObject.getString("transactionId");
				System.out.println(hipDicovertransactionId);
				String hipNotifyrequestId= jsonObject.getString("requestId");
				System.out.println("hipNotifyrequestId----------" + hipNotifyrequestId);
				JSONObject jsonObject2 = jsonObject.getJSONObject("notification");
				String hipNotifyStatus = jsonObject2.getString("status");
				System.out.println("hipNotifyStatus==="+hipNotifyStatus);
				String hipNotifyconsentId = jsonObject2.getString("consentId");
			
				session.setAttribute("hipNotifyrequestId", hipNotifyrequestId);
				session.setAttribute("hipNotifyStatus", hipNotifyStatus);
				session.setAttribute("hipNotifyconsentId", hipNotifyconsentId);
				
				
				sendHIPOnNotifyData();
	 
			} catch (Exception e) {

				e.printStackTrace();
			}
		
		}
		
		
		
		public void sendHIPOnNotifyData() {
			HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes()).getRequest();
			HttpSession session = httpServletRequest.getSession();
			try {
				Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
				String date = instant.toString();
				System.out.println(date);
				String hipNotifyrequestId =(String) session.getAttribute("hipNotifyrequestId");
				String hipNotifyStatus =(String) session.getAttribute("hipNotifyStatus");
				String hipNotifyconsentId =(String) session.getAttribute("hipNotifyconsentId");
				
				JSONObject jsonObjectresp = new JSONObject();
				  jsonObjectresp.put("requestId", hipNotifyrequestId);
				  
				  JSONObject jsonObjectacknowledgement = new JSONObject();
				  jsonObjectacknowledgement.put("status", hipNotifyStatus);
				  jsonObjectacknowledgement.put("consentId", hipNotifyconsentId);
				
				 JSONObject jsonObject = new JSONObject();
				 jsonObject.put("requestId", hipNotifyrequestId);
				 jsonObject.put("timestamp", date);
				 jsonObject.put("timestamp", date);
				 
				 jsonObject.put("resp", jsonObjectresp);
				 jsonObject.put("acknowledgement", jsonObjectacknowledgement);
				 
				 
				 String urlname = "https://dev.abdm.gov.in/gateway/v0.5/consents/hip/on-notify";
					
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
					//accesToken = json.getString("accessToken");
					conn.disconnect();
				 
				  
			}catch (Exception e) {
				e.printStackTrace();
			}
		}

		@RequestMapping(value = "/keys/generate", method = RequestMethod.GET,produces = "application/json")
	//	 @GetMapping(value = "", )
		    public KeyMaterial generate() throws Exception { 
		    	
			final String uri = "http://localhost:8082/keys/generate";

		    RestTemplate restTemplate = new RestTemplate();
		    String result = restTemplate.getForObject(uri, String.class);

		    JsonParser jsonParser = new JsonParser();
			JsonObject jsonData = (JsonObject) jsonParser.parse(result);
		    System.out.println(jsonData);
			
			KeyMaterial generateKeyValue = hipService.generateKeyValue();
			System.out.println("generateKeyValue---------"+generateKeyValue);
//		    	KeyPair keyPair = generateKeyPair();
//		        String receiverPrivateKey = getBase64String(getEncodedPrivateKey(keyPair.getPrivate()));
//		        String receiverPublicKey = getBase64String(getEncodedPublicKey(keyPair.getPublic()));
//		        String receiverNonce = generateRandomKey();
		        return generateKeyValue;
		    }
}
