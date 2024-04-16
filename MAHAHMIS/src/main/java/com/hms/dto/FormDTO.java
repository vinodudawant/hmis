package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class FormDTO {

	private Integer formId;
	private String formType;
	private String status;
	private List<FormDTO> ltFormDTOs;
	
	@JsonGetter("formId")
	public Integer getFormId() {
		return formId;
	}
	@JsonSetter("formId")
	public void setFormId(Integer formId) {
		this.formId = formId;
	}
	@JsonGetter("formType")
	public String getFormType() {
		return formType;
	}
	@JsonSetter("formType")
	public void setFormType(String formType) {
		this.formType = formType;
	}
	@JsonGetter("status")
	public String getStatus() {
		return status;
	}
	@JsonSetter("status")
	public void setStatus(String status) {
		this.status = status;
	}
	@JsonGetter("ltFormDTOs")
	public List<FormDTO> getLtFormDTOs() {
		return ltFormDTOs;
	}
	@JsonSetter("ltFormDTOs")
	public void setLtFormDTOs(List<FormDTO> ltFormDTOs) {
		this.ltFormDTOs = ltFormDTOs;
	}
	
	
	
}
