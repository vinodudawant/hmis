package com.hms.dto;

import java.util.List;

public class Distributer {
	private int distributor_id;
	private float dist_shipp_charg;
	private String dist_name;
	private String dist_addr;
	private String status;
	private List<Distributer> distributerList;
	private List<Distributer_item> distItemList;
	private String mobile;
	public Distributer() {
		super();
	}
	public List<Distributer_item> getDistItemList() {
		return distItemList;
	}
	public void setDistItemList(List<Distributer_item> distItemList) {
		this.distItemList = distItemList;
	}
	//@JsonGetter("sts")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	//@JsonGetter("did")
	public int getDistributor_id() {
		return distributor_id;
	}

	public void setDistributor_id(int distributor_id) {
		this.distributor_id = distributor_id;
	}

	//@JsonGetter("sch")
	public float getDist_shipp_charg() {
		return dist_shipp_charg;
	}

	public void setDist_shipp_charg(float dist_shipp_charg) {
		this.dist_shipp_charg = dist_shipp_charg;
	}

	//@JsonGetter("dn")
	public String getDist_name() {
		return dist_name;
	}

	public void setDist_name(String dist_name) {
		this.dist_name = dist_name;
	}

	//@JsonGetter("da") 
	public String getDist_addr() {
		return dist_addr;
	}
	public void setDist_addr(String dist_addr) {
		this.dist_addr = dist_addr;
	}

	//@JsonGetter("dl")
	public List<Distributer> getDistributerList() {
		return distributerList;
	}

	public void setDistributerList(List<Distributer> distributerList) {
		this.distributerList = distributerList;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

}
