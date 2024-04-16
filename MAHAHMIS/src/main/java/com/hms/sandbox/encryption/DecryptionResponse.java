package com.hms.sandbox.encryption;

/******
 * @author :Vishant Pawar
 * @Date :12-10-2022
 *****/
public class DecryptionResponse {

	private String decryptedData;

	public DecryptionResponse(String decryptedData) {
		this.decryptedData = decryptedData;
	}

	public String getDecryptedData() {
		return decryptedData;
	}

	public void setDecryptedData(String decryptedData) {
		this.decryptedData = decryptedData;
	}
}
