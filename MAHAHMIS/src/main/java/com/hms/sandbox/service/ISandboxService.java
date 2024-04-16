package com.hms.sandbox.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.sandbox.dto.ConsentDTO;
import com.hms.sandbox.dto.SandBoxPatientInfo;
import com.hms.sandbox.dto.SandboxData;
import com.hms.sandbox.dto.SandboxDocumentDTO;
import com.hms.sandbox.encryption.SandboxResponse;

/******
 * @author :Vishant Pawar
 * @Date :29-09-2022
 *****/
public interface ISandboxService {

	public List<ConsentDTO> saveConsent(ConsentDTO consentDTO);

	public List<ConsentDTO> getConsentData();

	public SandBoxPatientInfo getSandboxPatientById(int patientId);

	public ConsentDTO getConsentByRequestId(String healthId);

	public ConsentDTO getDataByConsentId(String consentId);

	public ConsentDTO getDecryptedData(int id);

	public void authConfirm(int patientId, String callFrom);

	public SandboxResponse verifyMobileOTPForDocument(String otp, String txnId);

	public SandboxResponse generateHealtIdByDocument(SandboxDocumentDTO obj,HttpServletRequest request);

	public SandboxResponse verifyDocument(SandboxDocumentDTO obj);

	public void savePatientName(String healthId, String fullName);

	void addCareContext(String helathId, String careContex);

	public void saveAuthInit(String healthId, String uuid);

	public void saveAuthConfirm(String healthId, String uuid);

	public void saveAccessToken(String requestId, String token);

	public SandboxData getData();

	int addCareContextByMobileOTP(String helathId, String careContex);

	int changeFlowId(int flowId);

}
