package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.Immutable;

@XmlRootElement
@Entity 
@Immutable
@Table(name = "ehat_insurer_api")
public class InsurerInfoDto implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "policy_id")
	private Integer policyId;

	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
		
	@Column(name = "patient_name")
	private String patientName;
	
	@Column(name = "sponsor_name")
	private String sponsorName;
	
	@Transient
	@Column(name = "hsp_id")
	private String hospitalId;
	
	@Transient
	@Column(name = "hsp_name")
	private String hospitalName;
	
	@Transient
	@Column(name = "city_pin")
	private String cityPin;
	
	@Column(name = "adminssion_date")
	private String admissionDate;
	
	@Column(name = "adm_date")
	private String admDate;
	
	@Column(name = "adm_time")
	private String admTime;
		
	@Column(name = "discharge_date")
	private String dischargeDate;
	
	@Column(name = "discharge_time")
	private String dischargeTime;
	
	@Transient
	private List<InsurerInfoDto> listInsurerInfo;

	public Integer getPolicyId() {
		return policyId;
	}

	public void setPolicyId(Integer policyId) {
		this.policyId = policyId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	
	public String getSponsorName() {
		return sponsorName;
	}

	public void setSponsorName(String sponsorName) {
		this.sponsorName = sponsorName;
	}

	public String getHospitalId() {
		return hospitalId;
	}

	public void setHospitalId(String hospitalId) {
		this.hospitalId = hospitalId;
	}

	public String getHospitalName() {
		return hospitalName;
	}

	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}

	public String getCityPin() {
		return cityPin;
	}

	public void setCityPin(String cityPin) {
		this.cityPin = cityPin;
	}

	public String getAdmissionDate() {
		return admissionDate;
	}

	public void setAdmissionDate(String admissionDate) {
		this.admissionDate = admissionDate;
	}	

	public String getAdmDate() {
		return admDate;
	}

	public void setAdmDate(String admDate) {
		this.admDate = admDate;
	}

	public String getAdmTime() {
		return admTime;
	}

	public void setAdmTime(String admTime) {
		this.admTime = admTime;
	}

	public String getDischargeDate() {
		return dischargeDate;
	}

	public void setDischargeDate(String dischargeDate) {
		this.dischargeDate = dischargeDate;
	}

	public String getDischargeTime() {
		return dischargeTime;
	}

	public void setDischargeTime(String dischargeTime) {
		this.dischargeTime = dischargeTime;
	}

	public List<InsurerInfoDto> getListInsurerInfo() {
		return listInsurerInfo;
	}

	public void setListInsurerInfo(List<InsurerInfoDto> listInsurerInfo) {
		this.listInsurerInfo = listInsurerInfo;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}	
}
