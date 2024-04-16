package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class CustomizeTemplate {

	protected int idCustomizeTemplate;
	protected String temp_name;
	protected String temp_data;
	protected String type;
	protected String specializaion;
	// protected String historyType;
	protected String objectiveTempData;

	private List<CustomizeTemplate> customizeTemplateList = null;

	private String ipd_opd_flag;
	private String keyValueCKEditorArrayString;
	private String date;
	private String patientId;
	private String treatmentId;
	
	private String discharge_date;
	@JsonGetter("discharge_date")
	public String getDischarge_date() {
		return discharge_date;
	}
	public void setDischarge_date(String discharge_date) {
		this.discharge_date = discharge_date;
	}
	@JsonGetter("discharge_type")
	public String getDischarge_type() {
		return discharge_type;
	}
	public void setDischarge_type(String discharge_type) {
		this.discharge_type = discharge_type;
	}

	private String discharge_type;
	
	@JsonGetter("date")
	public String getDate() {
		return date;
	}
	@JsonSetter("date")
	public void setDate(String date) {
		this.date = date;
	}
	
	@JsonGetter("pid")
	public String getPatientId() {
		return patientId;
	}
	@JsonSetter("pid")
	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
	
	@JsonGetter("tid")
	public String getTreatmentId() {
		return treatmentId;
	}
	@JsonSetter("tid")
	public void setTreatmentId(String treatmentId) {
		this.treatmentId = treatmentId;
	}

	@JsonGetter("type")
	public String getType() {
		return type;
	}

	@JsonSetter("type")
	public void setType(String type) {
		this.type = type;
	}

	@JsonGetter("idpattemp")
	public int getIdCustomizeTemplate() {
		return idCustomizeTemplate;
	}

	@JsonSetter("idpattemp")
	public void setIdCustomizeTemplate(int idCustomizeTemplate) {
		this.idCustomizeTemplate = idCustomizeTemplate;
	}

	@JsonGetter("tempname")
	public String getTemp_name() {
		return temp_name;
	}

	@JsonSetter("tempname")
	public void setTemp_name(String temp_name) {
		this.temp_name = temp_name;
	}

	@JsonGetter("tempdata")
	public String getTemp_data() {
		return temp_data;
	}

	@JsonSetter("tempdata")
	public void setTemp_data(String temp_data) {
		this.temp_data = temp_data;
	}

	@JsonGetter("specialization")
	public String getSpecializaion() {
		return specializaion;
	}

	@JsonSetter("specialization")
	public void setSpecializaion(String specializaion) {
		this.specializaion = specializaion;
	}

	/*
	 * @JsonGetter("hitoryType") public String getHistoryType() { return
	 * historyType; }
	 * 
	 * @JsonSetter("hitoryType") public void setHistoryType(String historyType)
	 * { this.historyType = historyType; }
	 */

	@JsonGetter("objectiveTempData")
	public String getObjectiveTempData() {
		return objectiveTempData;
	}

	@JsonSetter("objectiveTempData")
	public void setObjectiveTempData(String objectiveTempData) {
		this.objectiveTempData = objectiveTempData;
	}

	@JsonGetter("pattemplist")
	public List<CustomizeTemplate> getCustomizeTemplateList() {
		return customizeTemplateList;
	}

	@JsonSetter("pattemplist")
	public void setCustomizeTemplateList(
			List<CustomizeTemplate> patientHistoryTemplateList) {
		this.customizeTemplateList = patientHistoryTemplateList;
	}

	@JsonGetter("ioflg")
	public String getIpd_opd_flag() {
		return ipd_opd_flag;
	}

	@JsonSetter("ioflg")
	public void setIpd_opd_flag(String ipd_opd_flag) {
		this.ipd_opd_flag = ipd_opd_flag;
	}

	@JsonGetter("keyValueCKEditorArrayString")
	public String getKeyValueCKEditorArrayString() {
		return keyValueCKEditorArrayString;
	}

	@JsonSetter("keyValueCKEditorArrayString")
	public void setKeyValueCKEditorArrayString(
			String keyValueCKEditorArrayString) {
		this.keyValueCKEditorArrayString = keyValueCKEditorArrayString;
	}

	private String dietflag;
	@JsonGetter("dietflag")
	public String getDietflag() {
		return dietflag;
	}
	@JsonSetter("dietflag")
	public void setDietflag(String dietflag) {
		this.dietflag = dietflag;
	}
	@Override
	public String toString() {
		return "CustomizeTemplate [idCustomizeTemplate=" + idCustomizeTemplate
				+ ", temp_name=" + temp_name + ", temp_data=" + temp_data
				+ ", type=" + type + ", specializaion=" + specializaion
				+ ", objectiveTempData=" + objectiveTempData
				+ ", customizeTemplateList=" + customizeTemplateList
				+ ", ipd_opd_flag=" + ipd_opd_flag
				+ ", keyValueCKEditorArrayString="
				+ keyValueCKEditorArrayString + ", date=" + date
				+ ", patientId=" + patientId + ", treatmentId=" + treatmentId
				+ ", discharge_date=" + discharge_date + ", discharge_type="
				+ discharge_type + ", dietflag=" + dietflag + "]";
	}
}
