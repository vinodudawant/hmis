package com.hms.sandbox.service.impl;

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
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hms.sandbox.dao.ISandboxDao;
import com.hms.sandbox.dto.ConsentDTO;
import com.hms.sandbox.dto.RSA;
import com.hms.sandbox.dto.SandBoxPatientDignosis;
import com.hms.sandbox.dto.SandBoxPatientInfo;
import com.hms.sandbox.dto.SandboxData;
import com.hms.sandbox.dto.SandboxDocumentDTO;
import com.hms.sandbox.encryption.SandboxResponse;
import com.hms.sandbox.service.ISandboxService;

/******
 * @author :Vishant Pawar
 * @Date :29-09-2022
 *****/

@Service
@Transactional
public class SandboxServiceImpl implements ISandboxService {
	
	private static final Logger LOG = LogManager.getLogger(SandboxServiceImpl.class);
//	final static String urlabdmApi="https://healthidsbx.abdm.gov.in/api";
	@Autowired
	ISandboxDao sandboxDao;
	
	@Autowired
	SessionFactory sf;
	
	//final String sumaSoftUrl="https://nha-suma-azb7fa3pfa-el.a.run.app/";
	
	ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	final String sandboxURL = resourceBundleEha.getObject("sandboxURL").toString();
	
	final String consentManager = resourceBundleEha.getObject("sandboxConsentManager").toString();
	
	final String HIP_HIU_URL = resourceBundleEha.getObject("HIP_HIU_URL").toString();

	@Override
	public List<ConsentDTO> saveConsent(ConsentDTO consentDTO) {

		return sandboxDao.saveConsent(consentDTO);
	}

	@Override
	public List<ConsentDTO> getConsentData() {
		
		return sandboxDao.getConsentData();
	}

	@Override
	public SandBoxPatientInfo getSandboxPatientById(int patientId) {
		
		return sandboxDao.getSandboxPatientById(patientId);
	}

	@Override
	public ConsentDTO getConsentByRequestId(String healthId) {
		
		return sandboxDao.getConsentByRequestId(healthId);
	}

	@Override
	public ConsentDTO getDataByConsentId(String consentId) {
		
		return sandboxDao.getDataByConsentId(consentId);
	}

	@Override
	public ConsentDTO getDecryptedData(int id) {
		
		return sandboxDao.getDecryptedData(id);
	}

	@Override
	public void authConfirm(int patientId,String callFrom) {
		
		LOG.info("Inside a authConfirm method ");
		String authTransactionId="";
		String shaireRequestId="";
		String healthId="";
		   try {
		Criteria	 c=sf.getCurrentSession().createCriteria(SandBoxPatientInfo.class);
		      c.add(Restrictions.eq("patientId", patientId));
		      
		    List<SandBoxPatientInfo>  list= c.list();
		    if(callFrom.equalsIgnoreCase("confirm")) {
		    	authTransactionId= list.get(0).getAuthInitTransactionId();
		    	sendAuthConfirmData(patientId, authTransactionId);
		    }else if(callFrom.equalsIgnoreCase("shaire")) {
		    	shaireRequestId=list.get(0).getProfileShaireRequestId();
		    	healthId=list.get(0).getHelathId();
		    	profileOnShare(healthId,shaireRequestId);
		    }
		    
		   }catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	
	@SuppressWarnings("unchecked")
	public static String generateToken() {

		LOG.info("Inside a generateToken method ");
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
	void sendAuthConfirmData(int patientId,String authTransactionId) {

		LOG.info("Inside a sendAuthConfirmData method ");
		System.out.println("sendAuthConfirmData  patientId ="+patientId);
		System.out.println("authTransactionId  authTransactionId ="+authTransactionId);

		Criteria c= sf.getCurrentSession().createCriteria(SandBoxPatientInfo.class);
		// c.add(Restrictions.eq("authInitRequestId", requestId));
		 c.add(Restrictions.eq("authInitTransactionId", authTransactionId));
		 
		// SandBoxPatientInfo obj   =(SandBoxPatientInfo) c.list().get(0);
		 // int  patientId    =obj.getPatientId();
		  System.out.println("patientId====="+patientId);
		
		HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
				.currentRequestAttributes()).getRequest();

		//HttpSession session = httpServletRequest.getSession();
		//String sanBoxPatientId = (String) session.getAttribute("sanBoxPatientId");
		
		
		SandBoxPatientInfo sandBoxPatientInfo = (SandBoxPatientInfo) sf.getCurrentSession()
				.createCriteria(SandBoxPatientInfo.class)
				.add(Restrictions.eq("patientId", patientId)).uniqueResult();
		String output = "";

		UUID uuid = UUID.randomUUID();

		Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
		String currentDate = instant.toString();

		//String transactionId = (String) session.getAttribute("transactionId");

		String transactionId=authTransactionId;
		
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

			//addCareContext(sandBoxPatientInfo);
			// return 1;

		} catch (Exception ex) {
			ex.printStackTrace();
			// return 0;
		}
		// return 0;
	
	}
	
	@SuppressWarnings("unchecked")
	public void profileOnShare(String healthId,String reqId) {
		
		LOG.info("Inside a profileOnShare method ");
		System.out.println("profileOnShare healthId=="+healthId);
		
		System.out.println("profileOnShare reqId=="+reqId);

		
		 
		 	String generateToken = generateToken();
		 	Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
			String currentDate = instant.toString();
			JSONObject jsonObject = new JSONObject();
			
			JSONObject acknowledgement = new JSONObject();
			acknowledgement.put("status", "SUCCESS");
			acknowledgement.put("healthId", healthId);

			
			UUID uuid = UUID.randomUUID();

			JSONObject response = new JSONObject();
			response.put("requestId", reqId);
			

			jsonObject.put("requestId", uuid.toString());
			jsonObject.put("timestamp", currentDate);
			jsonObject.put("acknowledgement", acknowledgement);
			jsonObject.put("resp", response);

			//String urlname = "https://dev.abdm.gov.in/gateway/v0.5/patients/profile/on-share";
//			String urlname = "https://nha-suma-azb7fa3pfa-el.a.run.app/v1.0/patients/profile/on-share";
			
			String urlname = HIP_HIU_URL+"v0.5/patients/profile/on-share";
			
			try {

				URL url = new URL(urlname);

				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				conn.setDoOutput(true);
				conn.setRequestMethod("POST");
				conn.setRequestProperty("Content-Type", "application/json");
				conn.setRequestProperty("charset", "utf-8");
//				conn.setRequestProperty("X-CM-ID", "sbx");
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
	       
				
				
				

			} catch (Exception ex) {
				ex.printStackTrace();
			}
	 }

	@SuppressWarnings("unchecked")
	@Override
	public SandboxResponse verifyMobileOTPForDocument(String  otp,String txnId) {
		LOG.info("Inside a verifyMobileOTPForDocument method ");
		String generateToken = generateToken();

		String output = "";
		 String encryptedMessage="";
		 String decryptedMessage ="";
		JSONObject jsonObject = new JSONObject();
		   RSA robj=new RSA();
		   try {
		    encryptedMessage = robj.encrypt(otp);
            decryptedMessage = robj.decrypt(encryptedMessage);

           System.err.println("Encrypted:\n"+encryptedMessage);
           System.err.println("Decrypted:\n"+decryptedMessage);
		   }catch (Exception e) {
			e.printStackTrace();
		}
		jsonObject.put("otp", encryptedMessage);
		jsonObject.put("txnId", txnId);

//		String urlname = "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/verifyMobileOTP";
	
		//String urlname = "https://healthidsbx.abdm.gov.in/api/v2/document/verify/mobile/otp";
		String urlname =  sandboxURL+"v2/document/verify/mobile/otp";
		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			//conn.setRequestProperty("charset", "utf-8");
			//conn.setRequestProperty("X-HIP-ID", "HIPHMIS");
			//conn.setRequestProperty("Authorization", "Bearer " + generateToken);

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();
       
			System.out.println("Response code in verify mobile===="+conn.getResponseCode());
			
			if (conn.getResponseCode() != 200) {
				throw new RuntimeException(
						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
			org.json.JSONObject jsonObject2 = new org.json.JSONObject(output);
			SandboxResponse response = new SandboxResponse();
			String token = jsonObject2.getString("token");
			System.out.println("verfiy otp document===="+token);
			//response.setTxnId(jsonObject2.getString("token"));
			conn.disconnect();
			return response;

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public SandboxResponse generateHealtIdByDocument(SandboxDocumentDTO obj,HttpServletRequest request) {
	
		LOG.info("Inside a generateHealtIdByDocument method ");
		String generateToken = generateToken();
	
	String output = "";
	
	HttpSession session = request.getSession(true);
	String hospitalHIPUnitId = (String) session.getAttribute("hospitalHIPUnitId");

	JSONObject jsonObject = new JSONObject();
	jsonObject.put("firstName", obj.getFirstName());
	jsonObject.put("gender", obj.getGender());
	jsonObject.put("mobile", obj.getMobileNumber());
	jsonObject.put("stateCode", obj.getStateCode());
	jsonObject.put("yearOfBirth", obj.getYearOfBirth());
	jsonObject.put("districtCode", obj.getDistrictCode());
	jsonObject.put("documentType", obj.getDocumentType());
	jsonObject.put("documentNumber", obj.getDocumentNumber());
	jsonObject.put("txnId", obj.getTxnId());
	jsonObject.put("lastName", obj.getLastName());

	//String urlname = "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/generateOtp";
	//String urlname = "https://healthidsbx.abdm.gov.in/api/v2/document/generate/mobile/otp";
	String urlname = sandboxURL+"v2/document";
//	String urlname = sumaSoftUrl+"v1/registration/aadhaar/generateOtp";
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
			throw new RuntimeException(
					"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
		}
		BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

		output = br.readLine();
		org.json.JSONObject jsonObject2 = new org.json.JSONObject(output);
		SandboxResponse response = new SandboxResponse();
		response.setHealthId(jsonObject2.getString("healthId"));
		conn.disconnect();
		return response;

	} catch (Exception ex) {
		ex.printStackTrace();
	}
	return null;
	
	}

	@SuppressWarnings({ "unchecked", "unchecked" })
	@Override
	public SandboxResponse verifyDocument(SandboxDocumentDTO obj) {
		String generateToken = generateToken();
	
	SandboxResponse response = new SandboxResponse();
	String output = "";

	JSONObject jsonObject = new JSONObject();
	jsonObject.put("firstName", obj.getFirstName());
	jsonObject.put("gender", obj.getGender());
	jsonObject.put("mobile", obj.getMobileNumber());
	jsonObject.put("stateCode", obj.getStateCode());
	jsonObject.put("yearOfBirth", obj.getYearOfBirth());
	jsonObject.put("districtCode", obj.getDistrictCode());
	jsonObject.put("documentType", obj.getDocumentType());
	jsonObject.put("documentNumber", obj.getDocumentNumber());
	//jsonObject.put("txnId", obj.getTxnId());
	jsonObject.put("lastName", obj.getLastName());

	//String urlname = "https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/generateOtp";
	//String urlname = "https://healthidsbx.abdm.gov.in/api/v2/document/generate/mobile/otp";
	String urlname = sandboxURL+"v2/document/validate";
//	String urlname = sumaSoftUrl+"v1/registration/aadhaar/generateOtp";
	try {
		URL url = new URL(urlname);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setDoOutput(true);
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-Type", "application/json");
		conn.setRequestProperty("charset", "utf-8");
		conn.setRequestProperty("X-HIP-ID", "HIPHMIS");
//		conn.setRequestProperty("X-HIP-ID", hospitalHIPUnitId);
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
//			throw new RuntimeException(
//					"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
		}
		BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

		output = br.readLine();
		org.json.JSONObject jsonObject2 = new org.json.JSONObject(output);
		
		response.setHealthIdNumber(jsonObject2.getString("healthIdNumber"));
		conn.disconnect();
		return response;

	} catch (Exception ex) {
		ex.printStackTrace();
	}
	return null;
	
	}

	@Override
	public void savePatientName(String healthId, String fullName) {
		
		LOG.info("Inside a savePatientName method ");
		Criteria c= sf.getCurrentSession().createCriteria(SandBoxPatientInfo.class);
		 c.add(Restrictions.eq("healthId", healthId));
		 SandBoxPatientInfo sandBoxPatientInfo =new SandBoxPatientInfo();
		 if(!healthId.equalsIgnoreCase("")) {
			 sandBoxPatientInfo   =(SandBoxPatientInfo) c.list().get(0);
		 }
		
		sandBoxPatientInfo.setPatientFullNAme(fullName);
		sf.getCurrentSession().merge(sandBoxPatientInfo);
		
		
	}
	
	@Override
	public void addCareContext(String helathId, String careContex) {
		
		LOG.info("Inside a addCareContext method ");
		try {
		SandBoxPatientInfo sandBoxPatientInfo = (SandBoxPatientInfo) sf.getCurrentSession().
				createCriteria(SandBoxPatientInfo.class).add
		(Restrictions.eq("helathId", helathId)).uniqueResult();
		SandBoxPatientDignosis sandBoxPatientDignosis = new SandBoxPatientDignosis();
		List<SandBoxPatientDignosis> list = new ArrayList<SandBoxPatientDignosis>();
		String patientRefrence="HIMS"+helathId;
		if(sandBoxPatientInfo !=null) {
			sandBoxPatientDignosis.setPatientReferenceNumber(patientRefrence);
			sandBoxPatientDignosis.setCareContextRefNumber(careContex+"00");
			sandBoxPatientDignosis.setDiagoName(careContex);
			sandBoxPatientDignosis.setDiagndesc(careContex);
			list.add(sandBoxPatientDignosis);
			
			sandBoxPatientInfo.setListSandBoxDigno(list);
			sf.getCurrentSession().merge(sandBoxPatientInfo);
			String addDiagnosisSanbox = addDiagnosisSandbox(sandBoxPatientInfo);	
//			return 1;
		}
		
		}catch (Exception e) {
			e.printStackTrace();
		}
		
//		return 0;
	}
	@SuppressWarnings({ "unchecked", "unused" })
	public String addDiagnosisSandbox(SandBoxPatientInfo sandBoxPatientInfo){
		
		LOG.info("Inside a addDiagnosisSandbox method ");
		
		
		String output = "";

		String generateToken = generateToken();

		JSONObject jsonObject = new JSONObject();

		Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
		String currentDate = instant.toString();

		JSONObject requester = new JSONObject();
		requester.put("type", "HIP");
		requester.put("id", "HIPHMIS");

		UUID uuid = UUID.randomUUID();

		JSONObject query = new JSONObject();
		query.put("id", sandBoxPatientInfo.getHelathId());
		query.put("purpose", "KYC_AND_LINK");
		query.put("authMode", "DEMOGRAPHICS");
		query.put("requester", requester);

		jsonObject.put("requestId", uuid.toString());
		jsonObject.put("timestamp", currentDate);
		jsonObject.put("query", query);

//		String urlname = "https://dev.abdm.gov.in/gateway/v0.5/users/auth/init";
		String urlname = HIP_HIU_URL+"v0.5/users/auth/init";
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
				return result;
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
       
			// start  update auth init request id in ehat_patient_sandbox table
			System.out.println("uuid==="+uuid.toString());
			 String hql="update SandBoxPatientInfo set authInitRequestId='"+uuid.toString()+"' where helathId='"+sandBoxPatientInfo.getHelathId()+"'  ";
			
			Query q = sf.getCurrentSession().createQuery(hql);
			q.executeUpdate();
			// end
			
			conn.disconnect(); 
			//authConfirm(sandBoxPatientInfo);
			return "success";

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return "success";
	}

	@Override
	public void saveAuthInit(String healthId,String uuid) {
		
		LOG.info("Inside a saveAuthInit method ");
		// start  update auth init request id in ehat_patient_sandbox table
		System.out.println("uuid==="+uuid.toString());
		String hql="update SandBoxPatientInfo set authInitRequestId='"+uuid.toString()+"' where helathId='"+healthId+"'  ";
			
		Query q = sf.getCurrentSession().createQuery(hql);
		q.executeUpdate();
					// end
		
	}

	@Override
	public void saveAccessToken(String requestId,String token) {
		
		LOG.info("Inside a saveAccessToken method ");
		
		Criteria c= sf.getCurrentSession().createCriteria(SandBoxPatientInfo.class);
		 c.add(Restrictions.eq("authConfirmRequestId", requestId));
		 SandBoxPatientInfo sandBoxPatientInfo =new SandBoxPatientInfo();
		  if(!requestId.equalsIgnoreCase("")) {
			  sandBoxPatientInfo   =(SandBoxPatientInfo) c.list().get(0);
		 }
		
		 sandBoxPatientInfo.setLinkingToken(token);
		 sf.getCurrentSession().merge(sandBoxPatientInfo);
	}

	@Override
	public void saveAuthConfirm(String healthId, String uuid) {
		
		LOG.info("Inside a saveAuthConfirm method ");
		// start  update auth init request id in ehat_patient_sandbox table
		System.out.println("uuid==="+uuid.toString());
		String hql="update SandBoxPatientInfo set authConfirmRequestId='"+uuid+"' where helathId='"+healthId+"'  ";
					
		Query q = sf.getCurrentSession().createQuery(hql);
		q.executeUpdate();
		// end
	}

	@Override
	public SandboxData getData() {
		
		LOG.info("Inside a getData method ");
		Session currentSession = sf.getCurrentSession();
		Criteria createCriteria = currentSession.createCriteria
				(SandboxData.class);
		List<SandboxData> sandboxData= createCriteria.list();
		return sandboxData.get(sandboxData.size()-1);
	}

	
	@SuppressWarnings("unchecked")
	@Override
	public int addCareContextByMobileOTP(String helathId, String careContex) {
		
		LOG.info("Inside a addCareContextByMobileOTP method ");
		String output = "";

		UUID uuid = UUID.randomUUID();
		String accessToken="";
		SandBoxPatientInfo sandBoxPatientInfo = (SandBoxPatientInfo) sf.getCurrentSession()	.createCriteria(SandBoxPatientInfo.class)
				.add(Restrictions.eq("helathId",  helathId)).uniqueResult();
		
		if(sandBoxPatientInfo !=null) {
			accessToken=sandBoxPatientInfo.getLinkingToken();
		}
		
		

		Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
		String currentDate = instant.toString();
		
		JSONArray careContextsArray = new JSONArray();
		JSONObject careContextObj = new JSONObject();
		careContextObj.put("referenceNumber", careContex+"00");
		careContextObj.put("display", careContex);

		careContextsArray.add(careContextObj);
		
		JSONObject patientObj = new JSONObject();
		
		String patientReferenceNumber="HIMS"+helathId;
		
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
				
//				InputStream errorStream = conn.getErrorStream();
//				String result = IOUtils.toString(errorStream, StandardCharsets.UTF_8);
//				return result;
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
		return 0;
	}
	@Override
	public int changeFlowId(int flowId) {
		  try {
			  String sql="update sandbox_add_care_flow set flow_id="+flowId+" ";
			 SQLQuery q=sf.getCurrentSession().createSQLQuery(sql);
			 q.executeUpdate();
			 return 1;
		  }catch (Exception e) {
			// TODO: handle exception
		}
		return 0;
	}

	
}
