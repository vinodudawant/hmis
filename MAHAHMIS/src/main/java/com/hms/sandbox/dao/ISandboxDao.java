package com.hms.sandbox.dao;

import java.util.List;

import com.hms.sandbox.dto.ConsentDTO;
import com.hms.sandbox.dto.SandBoxPatientInfo;
/******
 * @author   :Vishant Pawar
 * @Date     :29-09-2022
 * *****/
public interface ISandboxDao {

	public List<ConsentDTO> saveConsent(ConsentDTO consentDto);
	
	public List<ConsentDTO> getConsentData();
	
	public SandBoxPatientInfo getSandboxPatientById(int patientId);
	
	public ConsentDTO getConsentByRequestId(String healthId);
	
	public ConsentDTO getDataByConsentId(String consentId);
	
	public ConsentDTO getDecryptedData(int id);
}
