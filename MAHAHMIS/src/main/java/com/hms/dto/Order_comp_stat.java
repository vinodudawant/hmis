package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class Order_comp_stat {

	private int idorder_comp_stat;
	private int idorder_master;
	private String state_doses;
	private List<Order_comp_stat> Order_comp_statList;

	@JsonGetter("ocsID")
	public int getIdorder_comp_stat() {
		return idorder_comp_stat;
	}

	public void setIdorder_comp_stat(int idorder_comp_stat) {
		this.idorder_comp_stat = idorder_comp_stat;
	}

	@JsonGetter("omID")
	public int getIdorder_master() {
		return idorder_master;
	}

	public void setIdorder_master(int idorder_master) {
		this.idorder_master = idorder_master;
	}

	@JsonGetter("stdo")
	public String getState_doses() {
		return state_doses;
	}

	public void setState_doses(String state_doses) {
		this.state_doses = state_doses;
	}

	@JsonGetter("orcostli")
	public List<Order_comp_stat> getOrder_comp_statList() {
		return Order_comp_statList;
	}

	public void setOrder_comp_statList(List<Order_comp_stat> order_comp_statList) {
		Order_comp_statList = order_comp_statList;
	}

}
