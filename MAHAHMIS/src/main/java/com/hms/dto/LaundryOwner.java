package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LaundryOwner {

	private int loundary_owners_id;
	private String lo_name;
	private String lo_contact;
	private List<LaundryOwner> laundryOwnerList;

	@JsonGetter("oid")
	public int getLoundary_owners_id() {
		return loundary_owners_id;
	}
	@JsonSetter("oid")
	public void setLoundary_owners_id(int loundary_owners_id) {
		this.loundary_owners_id = loundary_owners_id;
	}

	@JsonGetter("on")
	public String getLo_name() {
		return lo_name;
	}
	@JsonSetter("on")
	public void setLo_name(String lo_name) {
		this.lo_name = lo_name;
	}

	@JsonGetter("oc")
	public String getLo_contact() {
		return lo_contact;
	}
	@JsonSetter("oc")
	public void setLo_contact(String lo_contact) {
		this.lo_contact = lo_contact;
	}

	@JsonGetter("lol")
	public List<LaundryOwner> getLaundryOwnerList() {
		return laundryOwnerList;
	}
	@JsonSetter("lol")
	public void setLaundryOwnerList(List<LaundryOwner> laundryOwnerList) {
		this.laundryOwnerList = laundryOwnerList;
	}

}
