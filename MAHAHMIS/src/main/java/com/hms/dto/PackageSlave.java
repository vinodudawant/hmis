package com.hms.dto;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class PackageSlave {

	private int package_slave_id;
	private int package_id;
	private int ward_type_id;
	private double package_charges;
	private String availability_status;
	private String hallName;
	
	@JsonGetter("pkslvid")
	public int getPackage_slave_id() {
		return package_slave_id;
	}
	@JsonSetter("pkslvid")
	public void setPackage_slave_id(int package_slave_id) {
		this.package_slave_id = package_slave_id;
	}
	@JsonGetter("pkid")
	public int getPackage_id() {
		return package_id;
	}
	@JsonSetter("pkid")
	public void setPackage_id(int package_id) {
		this.package_id = package_id;
	}
	@JsonGetter("wrdid")
	public int getWard_type_id() {
		return ward_type_id;
	}
	@JsonSetter("wrdid")
	public void setWard_type_id(int ward_type_id) {
		this.ward_type_id = ward_type_id;
	}
	@JsonGetter("chrgs")
	public double getPackage_charges() {
		return package_charges;
	}
	@JsonSetter("chrgs")
	public void setPackage_charges(double package_charges) {
		this.package_charges = package_charges;
	}
	@JsonGetter("availstatus")
	public String getAvailability_status() {
		return availability_status;
	}
	@JsonSetter("availstatus")
	public void setAvailability_status(String availability_status) {
		this.availability_status = availability_status;
	}
	@JsonGetter("hname")
	public String getHallName() {
		return hallName;
	}
	@JsonSetter("hname")
	public void setHallName(String hallName) {
		this.hallName = hallName;
	}
}
