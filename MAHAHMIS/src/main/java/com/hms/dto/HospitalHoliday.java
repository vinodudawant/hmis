package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class HospitalHoliday {

	private int idHospitalHoliday;
	private String date;
	private String reason;

	private List<HospitalHoliday> listHospitalHoliday;
	
	
	
	@JsonGetter("liHoliday")
	public List<HospitalHoliday> getListHospitalHoliday() {
		return listHospitalHoliday;
	}
	@JsonSetter("liHoliday")
	public void setListHospitalHoliday(List<HospitalHoliday> listHospitalHoliday) {
		this.listHospitalHoliday = listHospitalHoliday;
	}

	@JsonGetter("hdid")
	public int getIdHospitalHoliday() {
		return idHospitalHoliday;
	}

	@JsonSetter("hdid")
	public void setIdHospitalHoliday(int idHospitalHoliday) {
		this.idHospitalHoliday = idHospitalHoliday;
	}

	@JsonGetter("dt")
	public String getDate() {
		return date;
	}

	@JsonSetter("dt")
	public void setDate(String date) {
		this.date = date;
	}

	@JsonGetter("reason")
	public String getReason() {
		return reason;
	}

	@JsonSetter("reason")
	public void setReason(String reason) {
		this.reason = reason;
	}

}
