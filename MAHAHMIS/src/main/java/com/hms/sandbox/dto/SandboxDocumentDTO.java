package com.hms.sandbox.dto;

public class SandboxDocumentDTO {
    String firstName;
    String lastName;
    String districtCode;
    String documentType;
    String documentNumber;
    String gender;
    String mobileNumber;
    String yearOfBirth;
    String stateCode;
    String txnId;
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getDistrictCode() {
		return districtCode;
	}
	public void setDistrictCode(String districtCode) {
		this.districtCode = districtCode;
	}
	public String getDocumentType() {
		return documentType;
	}
	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}
	public String getDocumentNumber() {
		return documentNumber;
	}
	public void setDocumentNumber(String documentNumber) {
		this.documentNumber = documentNumber;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public String getYearOfBirth() {
		return yearOfBirth;
	}
	public void setYearOfBirth(String yearOfBirth) {
		this.yearOfBirth = yearOfBirth;
	}
	public String getStateCode() {
		return stateCode;
	}
	public void setStateCode(String stateCode) {
		this.stateCode = stateCode;
	}
	public String getTxnId() {
		return txnId;
	}
	public void setTxnId(String txnId) {
		this.txnId = txnId;
	}
	@Override
	public String toString() {
		return "SandboxDocumentDTO [firstName=" + firstName + ", lastName=" + lastName + ", districtCode="
				+ districtCode + ", documentType=" + documentType + ", documentNumber=" + documentNumber + ", gender="
				+ gender + ", mobileNumber=" + mobileNumber + ", yearOfBirth=" + yearOfBirth + ", stateCode="
				+ stateCode + ", txnId=" + txnId + "]";
	}
    
    
}
