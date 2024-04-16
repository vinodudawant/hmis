package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class TrolleyDTO {
	private int trolley_id;
	private String trolley_name;
	private String trolley_type;
	private int trolley_hall_id;
	private String trolley_Hall_name;
	private String trolley_status;
	private String template_id;
	private List<TrolleyDTO> ltTrolleyDTOs;
	private List<GINMaster> GINm;
private List<TemplateMasterDTO> ltTemplateMasterDTOs;

	@JsonGetter("trolley_id")
	public int getTrolley_id() {
		return trolley_id;
	}

	@JsonSetter("trolley_id")
	public void setTrolley_id(int trolley_id) {
		this.trolley_id = trolley_id;
	}

	@JsonGetter("trolley_name")
	public String getTrolley_name() {
		return trolley_name;
	}

	@JsonSetter("trolley_name")
	public void setTrolley_name(String trolley_name) {
		this.trolley_name = trolley_name;
	}

	@JsonGetter("trolley_type")
	public String getTrolley_type() {
		return trolley_type;
	}

	@JsonSetter("trolley_type")
	public void setTrolley_type(String trolley_type) {
		this.trolley_type = trolley_type;
	}

	@JsonGetter("trolley_hall_id")
	public int getTrolley_hall_id() {
		return trolley_hall_id;
	}

	@JsonSetter("trolley_hall_id")
	public void setTrolley_hall_id(int trolley_hall_id) {
		this.trolley_hall_id = trolley_hall_id;
	}

	@JsonGetter("trolley_status")
	public String getTrolley_status() {
		return trolley_status;
	}

	@JsonSetter("trolley_status")
	public void setTrolley_status(String trolley_status) {
		this.trolley_status = trolley_status;
	}

	@JsonGetter("template_id")
	public String getTemplate_id() {
		return template_id;
	}

	@JsonSetter("template_id")
	public void setTemplate_id(String template_id) {
		this.template_id = template_id;
	}

	@JsonGetter("ltTrolleyDTOs")
	public List<TrolleyDTO> getLtTrolleyDTOs() {
		return ltTrolleyDTOs;
	}

	@JsonSetter("ltTrolleyDTOs")
	public void setLtTrolleyDTOs(List<TrolleyDTO> ltTrolleyDTOs) {
		this.ltTrolleyDTOs = ltTrolleyDTOs;
	}

	@JsonGetter("trolley_Hall_name")
	public String getTrolley_Hall_name() {
		return trolley_Hall_name;
	}

	@JsonSetter("trolley_Hall_name")
	public void setTrolley_Hall_name(String trolley_Hall_name) {
		this.trolley_Hall_name = trolley_Hall_name;
	}

	@JsonGetter("gINm")
	public List<GINMaster> getGINm() {
		return GINm;
	}

	@JsonSetter("gINm")
	public void setGINm(List<GINMaster> gINm) {
		GINm = gINm;
	}
	@JsonGetter("ltTemplateMasterDTOs")
	public List<TemplateMasterDTO> getLtTemplateMasterDTOs() {
		return ltTemplateMasterDTOs;
	}
	@JsonSetter("ltTemplateMasterDTOs")
	public void setLtTemplateMasterDTOs(List<TemplateMasterDTO> ltTemplateMasterDTOs) {
		this.ltTemplateMasterDTOs = ltTemplateMasterDTOs;
	}


}
