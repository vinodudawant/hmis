package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class RadiologyTemplate {
	private int idradiologyTemplate;
	protected String temp_name;
	protected String temp_data;
	protected String type;
	protected String objectiveTempData;
	private List<RadiologyTemplate> radiologyTemplateList = null;
	
	
	@JsonGetter("ReadioID")
	public int getIdradiologyTemplate() {
		return idradiologyTemplate;
	}

	@JsonSetter("ReadioID")
	public void setIdradiologyTemplate(int idradiologyTemplate) {
		this.idradiologyTemplate = idradiologyTemplate;
	}

	@JsonGetter("TempName")
	public String getTemp_name() {
		return temp_name;
	}
	
	@JsonSetter("TempName")
	public void setTemp_name(String temp_name) {
		this.temp_name = temp_name;
	}
	
	@JsonGetter("TempData")
	public String getTemp_data() {
		return temp_data;
	}
	
	@JsonSetter("TempData")
	public void setTemp_data(String temp_data) {
		this.temp_data = temp_data;
	}
	
	@JsonGetter("type")
	public String getType() {
		return type;
	}
	@JsonSetter("type")
	public void setType(String type) {
		this.type = type;
	}
	
	@JsonGetter("ObjectiveTempData")
	public String getObjectiveTempData() {
		return objectiveTempData;
	}
	
	@JsonSetter("ObjectiveTempData")
	public void setObjectiveTempData(String objectiveTempData) {
		this.objectiveTempData = objectiveTempData;
	}
	
	@JsonGetter("RTList")
	public List<RadiologyTemplate> getRadiologyTemplateList() {
		return radiologyTemplateList;
	}
	
	@JsonSetter("RTList")
	public void setRadiologyTemplateList(
			List<RadiologyTemplate> radiologyTemplateList) {
		this.radiologyTemplateList = radiologyTemplateList;
	}

}
