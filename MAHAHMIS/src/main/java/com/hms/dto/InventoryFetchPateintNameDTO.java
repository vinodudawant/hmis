package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryFetchPateintNameDTO {
	
	private String fName;
	private String lName;
	private String mName;
	
	private Integer Patient_ID;
	private Integer Treatment_ID;
	private String referedTo;
	private String addressLine1=null;
	private String mobile=null;
	private String centerPatientId;
	
	public String getCenterPatientId() {
		return centerPatientId;
	}
	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}
	private List<InventoryFetchPateintNameDTO> ltInventoryFetchPateintNameDTO;
	
	@JsonGetter("fName")
	  
	public String getfName() {
		
		return fName;
	}
	
	@Override
	public String toString() {
		return "InventoryFetchPateintNameDTO [fName=" + fName + ", lName="
				+ lName + ", mName=" + mName + ", Patient_ID=" + Patient_ID
				+ ", Treatment_ID=" + Treatment_ID + ", referedTo=" + referedTo
				+ ", addressLine1=" + addressLine1 + ", mobile=" + mobile
				+ ", ltInventoryFetchPateintNameDTO="
				+ ltInventoryFetchPateintNameDTO + "]";
	}

	@JsonSetter("fName")
	 
	public void setfName(String fName) {
		this.fName = fName;
	}
	@JsonGetter("lName")
	public String getlName() {
		return lName;
	}
	@JsonSetter("lName")
	public void setlName(String lName) {
		this.lName = lName;
	}
	
	@JsonGetter("mName")
	public String getmName() {
		return mName;
	}
	@JsonSetter("mName")
	public void setmName(String mName) {
		this.mName = mName;
	}
	@JsonGetter("Patient_ID")
	public Integer getPatient_ID() {
		return Patient_ID;
	}
	@JsonSetter("Patient_ID")
	public void setPatient_ID(Integer patient_ID) {
		Patient_ID = patient_ID;
	}
	@JsonGetter("Treatment_ID")
	public Integer getTreatment_ID() {
		return Treatment_ID;
	}
	@JsonSetter("Treatment_ID")
	public void setTreatment_ID(Integer treatment_ID) {
		Treatment_ID = treatment_ID;
	}
	@JsonGetter("referedTo")
	public String getReferedTo() {
		return referedTo;
	}
	@JsonSetter("referedTo")
	public void setReferedTo(String referedTo) {
		this.referedTo = referedTo;
	}
	@JsonGetter("ltInventoryFetchPateintNameDTO")
	public List<InventoryFetchPateintNameDTO> getLtInventoryFetchPateintNameDTO() {
		return ltInventoryFetchPateintNameDTO;
	}
	@JsonSetter("ltInventoryFetchPateintNameDTO")
	public void setLtInventoryFetchPateintNameDTO(
			List<InventoryFetchPateintNameDTO> ltInventoryFetchPateintNameDTO) {
		this.ltInventoryFetchPateintNameDTO = ltInventoryFetchPateintNameDTO;
	}
	
	@JsonGetter("addressLine1")	
	public String getAddressLine1() {
		return addressLine1;
	}
	@JsonSetter("addressLine1")
	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}
	@JsonGetter("officeNumber")
	public String getMobile() {
		return mobile;
	}
	@JsonSetter("officeNumber")
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	
}
