package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class HallWiseTestChargesDTO {

	private int slave_id;
	private int test_id;
	private int hall_id;
	private float charges;
	private float copay_charges;
	private float pay;
	private String test_appicable_flag;
	private String test_type;
	private List<HallWiseTestChargesDTO> hallwisechargeslist;
	
	@JsonGetter("slaveId")
	public int getSlave_id() {
		return slave_id;
	}
	
	@JsonSetter("slaveId")
	public void setSlave_id(int slave_id) {
		this.slave_id = slave_id;
	}
	
	@JsonGetter("testID")
	public int getTest_id() {
		return test_id;
	}
	
	@JsonSetter("testID")
	public void setTest_id(int test_id) {
		this.test_id = test_id;
	}
	
	@JsonGetter("hallID")
	public int getHall_id() {
		return hall_id;
	}
	
	@JsonSetter("hallID")
	public void setHall_id(int hall_id) {
		this.hall_id = hall_id;
	}
	
	@JsonGetter("chrgs")
	public float getCharges() {
		return charges;
	}
	
	@JsonSetter("chrgs")
	public void setCharges(float charges) {
		this.charges = charges;
	}
	
	@JsonGetter("hallwschrgslist")
	public List<HallWiseTestChargesDTO> getHallwisechargeslist() {
		return hallwisechargeslist;
	}
	
	@JsonSetter("hallwschrgslist")
	public void setHallwisechargeslist(
			List<HallWiseTestChargesDTO> hallwisechargeslist) {
		this.hallwisechargeslist = hallwisechargeslist;
	}
	@JsonGetter("testappflg")
	public String getTest_appicable_flag() {
		return test_appicable_flag;
	}
	@JsonSetter("testappflg")
	public void setTest_appicable_flag(String test_appicable_flag) {
		this.test_appicable_flag = test_appicable_flag;
	}
	@JsonGetter("test_type")
	public String getTest_type() {
		return test_type;
	}
	@JsonSetter("test_type")
	public void setTest_type(String test_type) {
		this.test_type = test_type;
	}
	@JsonGetter("copay_chrgs")
	public float getCopay_charges() {
		return copay_charges;
	}
	@JsonSetter("copay_chrgs")
	public void setCopay_charges(float copay_charges) {
		this.copay_charges = copay_charges;
	}
	@JsonGetter("pay")
	public float getPay() {
		return pay;
	}
	@JsonSetter("pay")
	public void setPay(float pay) {
		this.pay = pay;
	}
}
