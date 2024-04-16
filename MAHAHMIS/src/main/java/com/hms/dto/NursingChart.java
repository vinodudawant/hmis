package com.hms.dto;

import org.codehaus.jackson.annotate.JsonGetter;
import java.util.List;
import org.codehaus.jackson.annotate.JsonSetter;

public class NursingChart {
	
	
	private int id;
	private int treatmentId;
	private String time;
	private String nameOfDrug;
	private String strength;
	private String dose;
	private String date;
	private String sign;
	
	private List<NursingChart> nursingChart;
	
	@JsonGetter("id")
	public int getId() {
		return id;
	}
	
	@JsonSetter("id")
	public void setId(int id) {
		this.id = id;
	}
	
	@JsonGetter("treatmentId")
	public int getTreatmentId() {
		return treatmentId;
	}
	
	@JsonSetter("treatmentId")
	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}
	
	@JsonGetter("time")
	public String getTime() {
		return time;
	}
	
	@JsonSetter("time")
	public void setTime(String time) {
		this.time = time;
	}
	
	@JsonGetter("nameOfDrug")
	public String getNameOfDrug() {
		return nameOfDrug;
	}
	
	@JsonSetter("nameOfDrug")
	public void setNameOfDrug(String nameOfDrug) {
		this.nameOfDrug = nameOfDrug;
	}
	
	@JsonGetter("strength")
	public String getStrength() {
		return strength;
	}
	
	@JsonSetter("strength")
	public void setStrength(String strength) {
		this.strength = strength;
	}
	
	@JsonGetter("dose")
	public String getDose() {
		return dose;
	}
	
	@JsonSetter("dose")
	public void setDose(String dose) {
		this.dose = dose;
	}
	
	@JsonGetter("sign")
	public String getSign() {
		return sign;
	}
	
	@JsonSetter("sign")
	public void setSign(String sign) {
		this.sign = sign;
	}

	@JsonGetter("date")
	public String getDate() {
		return date;
	}

	@JsonSetter("date")
	public void setDate(String date) {
		this.date = date;
	}

	@JsonGetter("nursingChart")
	public List<NursingChart> getNursingChart() {
		return nursingChart;
	}

	@JsonSetter("nursingChart")
	public void setNursingChart(List<NursingChart> nursingChart) {
		this.nursingChart = nursingChart;
	}

}
