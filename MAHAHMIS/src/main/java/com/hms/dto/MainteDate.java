package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class MainteDate {

	private int mainte_dates_id;

	private String date_name;
	private List<MainteDate> liMainteDate;

	@JsonGetter("mainte_dates_id")
	public int getMainte_dates_id() {
		return mainte_dates_id;
	}

	@JsonGetter("liMainteDate")
	public List<MainteDate> getLiMainteDate() {
		return liMainteDate;
	}

	@JsonSetter("liMainteDate")
	public void setLiMainteDate(List<MainteDate> liMainteDate) {
		this.liMainteDate = liMainteDate;
	}

	@JsonSetter("mainte_dates_id")
	public void setMainte_dates_id(int mainte_dates_id) {
		this.mainte_dates_id = mainte_dates_id;
	}

	@JsonGetter("date_name")
	public String getDate_name() {
		return date_name;
	}

	@JsonSetter("date_name")
	public void setDate_name(String date_name) {
		this.date_name = date_name;
	}

}
