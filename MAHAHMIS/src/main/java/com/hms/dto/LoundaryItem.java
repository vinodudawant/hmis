package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LoundaryItem {

	private int loundary_items_id;
	private String li_name;
	private float li_rate;
	private int li_hospital_qty;
	private List<LoundaryItem> laundry_list;

	@JsonGetter("lid")
	public int getLoundary_items_id() {
		return loundary_items_id;
	}

	@JsonSetter("lid")
	public void setLoundary_items_id(int loundary_items_id) {
		this.loundary_items_id = loundary_items_id;
	}

	@JsonGetter("ln")
	public String getLi_name() {
		return li_name;
	}

	@JsonSetter("ln")
	public void setLi_name(String li_name) {
		this.li_name = li_name;
	}

	@JsonGetter("lr")
	public float getLi_rate() {
		return li_rate;
	}

	@JsonSetter("lr")
	public void setLi_rate(float li_rate) {
		this.li_rate = li_rate;
	}

	@JsonGetter("lhq")
	public int getLi_hospital_qty() {
		return li_hospital_qty;
	}

	@JsonSetter("lhq")
	public void setLi_hospital_qty(int li_hospital_qty) {
		this.li_hospital_qty = li_hospital_qty;
	}

	@JsonGetter("lil")
	public List<LoundaryItem> getLaundry_list() {
		return laundry_list;
	}

	@JsonSetter("lil")
	public void setLaundry_list(List<LoundaryItem> laundry_list) {
		this.laundry_list = laundry_list;
	}

}
