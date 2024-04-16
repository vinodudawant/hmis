package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class OTType implements Serializable {

	private static final long serialVersionUID = 1L;

	private int idOT_name;
	private String ot_name;
	private Float theaterCharges;
	private String color;
	
		@JsonGetter("otchrg")
	public Float getTheaterCharges() {
		return theaterCharges;
	}
		@JsonSetter("otchrg")
	public void setTheaterCharges(Float theaterCharges) {
		this.theaterCharges = theaterCharges;
	}
	private List<OTType> otNameList;

	@JsonGetter("otid")
	public int getIdOT_name() {
		return idOT_name;
	}

	public void setIdOT_name(int idOT_name) {
		this.idOT_name = idOT_name;
	}

	@JsonGetter("otnm")
	public String getOt_name() {
		return ot_name;
	}

	public void setOt_name(String ot_name) {
		this.ot_name = ot_name;
	}

	@JsonGetter("liot")
	public List<OTType> getOtNameList() {
		return otNameList;
	}

	public void setOtNameList(List<OTType> otNameList) {
		this.otNameList = otNameList;
	}
	
	@JsonGetter("color")
	public String getColor() {
		return color;
	}
	@JsonSetter("color")
	public void setColor(String color) {
		this.color = color;
	}

	
}
