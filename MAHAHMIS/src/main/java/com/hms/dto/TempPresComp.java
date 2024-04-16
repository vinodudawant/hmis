package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class TempPresComp {

	protected int idtemp_pres_comp;
	protected int id_temp_master;
	protected String medicine_name;
	protected String prep;
	protected String strength;
	protected String frequency;
	protected String dose;
	protected String route;
	protected String instruction;
	protected String days;
	protected String qty;
	private List<TempPresComp> tempPresCompList = null;
	
	@JsonGetter("idtpc")
	public int getIdtemp_pres_comp() {
		return idtemp_pres_comp;
	}

	@JsonSetter("idtpc")
	public void setIdtemp_pres_comp(int idtemp_pres_comp) {
		this.idtemp_pres_comp = idtemp_pres_comp;
	}

	@JsonGetter("idtm")
	public int getId_temp_master() {
		return id_temp_master;
	}

	@JsonSetter("idtm")
	public void setId_temp_master(int id_temp_master) {
		this.id_temp_master = id_temp_master;
	}

	@JsonGetter("prep")
	public String getPrep() {
		return prep;
	}
	@JsonSetter("prep")
	public void setPrep(String prep) {
		this.prep = prep;
	}
	
	@JsonGetter("medNm")
	public String getMedicine_name() {
		return medicine_name;
	}

	@JsonSetter("medNm")
	public void setMedicine_name(String medicine_name) {
		this.medicine_name = medicine_name;
	}
	
	@JsonGetter("strng")
	public String getStrength() {
		return strength;
	}
	@JsonSetter("strng")
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
	@JsonGetter("frqncy")
	public String getFrequency() {
		return frequency;
	}
	@JsonSetter("frqncy")
	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}
	
	@JsonGetter("route")
	public String getRoute() {
		return route;
	}
	@JsonSetter("route")
	public void setRoute(String route) {
		this.route = route;
	}

	@JsonGetter("inst")
	public String getInstruction() {
		return instruction;
	}

	@JsonSetter("inst")
	public void setInstruction(String instruction) {
		this.instruction = instruction;
	}

	@JsonGetter("day")
	public String getDays() {
		return days;
	}

	@JsonSetter("day")
	public void setDays(String days) {
		this.days = days;
	}

	@JsonGetter("qty")
	public String getQty() {
		return qty;
	}

	@JsonSetter("qty")
	public void setQty(String qty) {
		this.qty = qty;
	}

	@JsonGetter("tpcli")
	public List<TempPresComp> getTempPresCompList() {
		return tempPresCompList;
	}

	@JsonSetter("tpcli")
	public void setTempPresCompList(List<TempPresComp> tempPresCompList) {
		this.tempPresCompList = tempPresCompList;
	}

}
