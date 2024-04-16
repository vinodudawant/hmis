package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class MaintenanceExtraItem {
	private int mainte_extra_master_id;
	private String extra_name;
	private int mainte_extra_id;
	private String from;
	private String to;
	private String months;
	private String mstatus;
	private String estatus;
	private List<MaintenanceExtraItem> liExtraMItem;
	
	
	@JsonGetter("lemi")
	public List<MaintenanceExtraItem> getLiExtraMItem() {
		return liExtraMItem;
	}
	@JsonSetter("lemi")
	public void setLiExtraMItem(List<MaintenanceExtraItem> liExtraMItem) {
		this.liExtraMItem = liExtraMItem;
	}

	/**
	 * @return the mstatus
	 */@JsonGetter("ms")
	public String getMstatus() {
		return mstatus;
	}

	/**
	 * @param mstatus the mstatus to set
	 */@JsonSetter("ms")
	public void setMstatus(String mstatus) {
		this.mstatus = mstatus;
	}

	/**
	 * @return the estatus
	 */@JsonGetter("es")
	public String getEstatus() {
		return estatus;
	}

	/**
	 * @param estatus the estatus to set
	 */@JsonSetter("es")
	public void setEstatus(String estatus) {
		this.estatus = estatus;
	}

	@JsonGetter("emi")
	public int getMainte_extra_master_id() {
		return mainte_extra_master_id;
	}

	@JsonSetter("emi")
	public void setMainte_extra_master_id(int mainte_extra_master_id) {
		this.mainte_extra_master_id = mainte_extra_master_id;
	}

	@JsonGetter("en")
	public String getExtra_name() {
		return extra_name;
	}

	@JsonSetter("en")
	public void setExtra_name(String extra_name) {
		this.extra_name = extra_name;
	}

	@JsonGetter("mei")
	public int getMainte_extra_id() {
		return mainte_extra_id;
	}

	@JsonSetter("mei")
	public void setMainte_extra_id(int mainte_extra_id) {
		this.mainte_extra_id = mainte_extra_id;
	}

	@JsonGetter("fm")
	public String getFrom() {
		return from;
	}

	@JsonSetter("fm")
	public void setFrom(String from) {
		this.from = from;
	}

	@JsonGetter("to")
	public String getTo() {
		return to;
	}

	@JsonGetter("to")
	public void setTo(String to) {
		this.to = to;
	}

	@JsonGetter("mon")
	public String getMonths() {
		return months;
	}

	@JsonSetter("mon")
	public void setMonths(String months) {
		this.months = months;
	}
}
