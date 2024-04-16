package com.hms.sandbox.encryption;
/******
 * @author :Vishant Pawar
 * @Date :12-10-2022
 *****/
public class KeyMaterial {

	private String privateKey;
	private String publicKey;
	private String nonce;

	public KeyMaterial(String privateKey, String publicKey, String nonce) {
		this.privateKey = privateKey;
		this.publicKey = publicKey;
		this.nonce = nonce;
	}

	public KeyMaterial() {
		super();
		// TODO Auto-generated constructor stub
	}



	public String getPrivateKey() {
		return privateKey;
	}

	public void setPrivateKey(String privateKey) {
		this.privateKey = privateKey;
	}

	public String getPublicKey() {
		return publicKey;
	}

	public void setPublicKey(String publicKey) {
		this.publicKey = publicKey;
	}

	public String getNonce() {
		return nonce;
	}

	public void setNonce(String nonce) {
		this.nonce = nonce;
	}
}
