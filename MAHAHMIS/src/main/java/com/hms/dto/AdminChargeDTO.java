package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class AdminChargeDTO {

	private float adminncharge;
	private String ChrgType;
	private String narration;
	private Integer patientid;
	private Integer treatmentid;
	private String dischargedate;
	private String discharge_type;
	private String admissionDate;
	
	@JsonGetter("admissionDate")
	public String getAdmissionDate() {
		return admissionDate;
	}
	@JsonSetter("admissionDate")
	public void setAdmissionDate(String admissionDate) {
		this.admissionDate = admissionDate;
	}
	@JsonGetter("discharge_type")
	public String getDischarge_type() {
		return discharge_type;
	}
	public void setDischarge_type(String discharge_type) {
		this.discharge_type = discharge_type;
	}
	public String getDischargedate() {
		return dischargedate;
	}
	public void setDischargedate(String dischargedate) {
		this.dischargedate = dischargedate;
	}
	private List<AdminChargeDTO> adminchargelist;
	
	public float getAdminncharge() {
		return adminncharge;
	}
	public void setAdminncharge(float adminncharge) {
		this.adminncharge = adminncharge;
	}
	public String getNarration() {
		return narration;
	}
	public void setNarration(String narration) {
		this.narration = narration;
	}
	public Integer getPatientid() {
		return patientid;
	}
	public void setPatientid(Integer patientid) {
		this.patientid = patientid;
	}
	public Integer getTreatmentid() {
		return treatmentid;
	}
	public void setTreatmentid(Integer treatmentid) {
		this.treatmentid = treatmentid;
	}
	public List<AdminChargeDTO> getAdminchargelist() {
		return adminchargelist;
	}
	public void setAdminchargelist(List<AdminChargeDTO> adminchargelist) {
		this.adminchargelist = adminchargelist;
	}
	public String getChrgType() {
		return ChrgType;
	}
	public void setChrgType(String chrgType) {
		ChrgType = chrgType;
	}

}
