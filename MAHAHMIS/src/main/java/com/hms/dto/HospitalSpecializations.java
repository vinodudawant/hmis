package com.hms.dto;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

@XmlRootElement
public class HospitalSpecializations {

	private int specializationId;
	private String specializationName;
	private String status;
	private List<HospitalSpecializations> listSpecilizations;

	@JsonGetter("liSplz")
	public List<HospitalSpecializations> getListSpecilizations() {
		return listSpecilizations;
	}

	@JsonSetter("liSplz")
	public void setListSpecilizations(
			List<HospitalSpecializations> listSpecilizations) {
		this.listSpecilizations = listSpecilizations;
	}

	@JsonGetter("splzId")
	public int getSpecializationId() {
		return specializationId;
	}

	@JsonSetter("splzId")
	public void setSpecializationId(int specializationId) {
		this.specializationId = specializationId;
	}

	@JsonGetter("splzNm")
	public String getSpecializationName() {
		return specializationName;
	}

	@JsonSetter("splzNm")
	public void setSpecializationName(String specializationName) {
		this.specializationName = specializationName;
	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}

}
