package com.hms.sandbox.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name = "ehat_sandbox_consent")
public class ConsentDTO {

	@Id
	@GeneratedValue
	@Column(name = "consent_id")
	private int id;

	@Column(name = "patient_name")
	private String patientName;

	@Column(name = "health_id")
	private String healthId;

	@Column(name = "consent_req_id")
	private String consentId;

	@Column(name = "consent_artfact_id")
	private String consentArtFactId;

	@Column(name = "decrypted_data")
	private String decryptedData;

	@Column(name = "request_id")
	private String requestId;

	@Column(name = "hiu")
	private String hiu;

	@Column(name = "date_range_from")
	private String dateRangeFrom;

	@Column(name = "date_range_to")
	private String dateRangeTo;

	@Column(name = "hi_types")
	private String hiTypes;

	@Column(name = "data_erase_at")
	private String dataEraseAt;

	@Column(name = "consent_purpose")
	private String consentPurpose;

	@Column(name = "doctor_name")
	private String doctorName;

	@Column(name = "request_status", columnDefinition = "varchar(255) default 'Request Initiated'")
	private String requestStatus;

	@Transient
	public String errorList;
	
	
//
//	public JsonObject getList() {
//		return list;
//	}
//
//	public void setList(JsonObject list) {
//		this.list = list;
//	}

	public String getErrorList() {
		return errorList;
	}

	public void setErrorList(String errorList) {
		this.errorList = errorList;
	}

	public String getRequestStatus() {
		return requestStatus;
	}

	public void setRequestStatus(String requestStatus) {
		this.requestStatus = requestStatus;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getHealthId() {
		return healthId;
	}

	public void setHealthId(String healthId) {
		this.healthId = healthId;
	}

	public String getHiu() {
		return hiu;
	}

	public void setHiu(String hiu) {
		this.hiu = hiu;
	}

	public String getDateRangeFrom() {
		return dateRangeFrom;
	}

	public void setDateRangeFrom(String dateRangeFrom) {
		this.dateRangeFrom = dateRangeFrom;
	}

	public String getDateRangeTo() {
		return dateRangeTo;
	}

	public void setDateRangeTo(String dateRangeTo) {
		this.dateRangeTo = dateRangeTo;
	}

	public String getHiTypes() {
		return hiTypes;
	}

	public void setHiTypes(String hiTypes) {
		this.hiTypes = hiTypes;
	}

	public String getDataEraseAt() {
		return dataEraseAt;
	}

	public void setDataEraseAt(String dataEraseAt) {
		this.dataEraseAt = dataEraseAt;
	}

	public String getConsentPurpose() {
		return consentPurpose;
	}

	public void setConsentPurpose(String consentPurpose) {
		this.consentPurpose = consentPurpose;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getConsentId() {
		return consentId;
	}

	public void setConsentId(String consentId) {
		this.consentId = consentId;
	}

	public String getConsentArtFactId() {
		return consentArtFactId;
	}

	public void setConsentArtFactId(String consentArtFactId) {
		this.consentArtFactId = consentArtFactId;
	}

	public String getDecryptedData() {
		return decryptedData;
	}

	public void setDecryptedData(String decryptedData) {
		this.decryptedData = decryptedData;
	}

	public String getRequestId() {
		return requestId;
	}

	public void setRequestId(String requestId) {
		this.requestId = requestId;
	}

	@Override
	public String toString() {
		return "ConsentDTO [id=" + id + ", patientName=" + patientName + ", healthId=" + healthId + ", consentId="
				+ consentId + ", consentArtFactId=" + consentArtFactId + ", decryptedData=" + decryptedData
				+ ", requestId=" + requestId + ", hiu=" + hiu + ", dateRangeFrom=" + dateRangeFrom + ", dateRangeTo="
				+ dateRangeTo + ", hiTypes=" + hiTypes + ", dataEraseAt=" + dataEraseAt + ", consentPurpose="
				+ consentPurpose + ", doctorName=" + doctorName + ", requestStatus=" + requestStatus + "]";
	}

}
