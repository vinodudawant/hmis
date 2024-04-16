package com.hms.sandbox.service;

import com.hms.sandbox.dto.SandBoxPatientInfo;
import com.hms.sandbox.dto.SandboxData;
import com.hms.sandbox.encryption.DecryptionRequest;
import com.hms.sandbox.encryption.DecryptionResponse;
import com.hms.sandbox.encryption.EncryptionRequest;
import com.hms.sandbox.encryption.EncryptionResponse;
import com.hms.sandbox.encryption.KeyMaterial;

public interface HIPSandBoxService {
	void sendHIPDiscoverData(String hipHealthId);

	void sendHIPOnNotifyData(String patientHealthId, String careContextReference, String consentId);

	KeyMaterial generateKeyValue();

	void sendHipRequestNotificationData(String consentId);

	void sendHIPOnRequestData();

	EncryptionResponse encryptData(EncryptionRequest encryptionRequest);

	DecryptionResponse decryptData(DecryptionRequest decryptionRequest);

	void authConfirm(String requestId);

	int addCareContext(String requestId);

	public SandBoxPatientInfo getSandboxPatient(String healthId);

	public void updateAuthTransactionId(String requstId, String transactionId);

	public void updateProfileRequestId(String requestId, String healthId, String hipCode, SandboxData profile);

	public void sendLinkOnInitData(int patientId, String requestId, String transactionId);

	public void sendlinkOnconfirmData(String resRequestId);

	public void HIPOnRequest(String transactionId, String requestId, String consentId);
	
	public void consentFetch();
	
	public void sendCMRequest(String consentId);
	
	public void healthInfoNotify(String transactionId);

}
