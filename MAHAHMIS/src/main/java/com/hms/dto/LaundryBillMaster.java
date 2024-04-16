package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LaundryBillMaster {

	private int loundary_bill_master_id;
	private int loundary_owners_id;
	private String lbm_grand_total;
	private String lbm_date;
	private String sign;

	private List<LaundryBillMaster> lundryBillMasterList;

	private List<LaundryBillComponent> LaundryBillComponentList;

	private LaundryOwner objLaundryOwner;

	@JsonGetter("lbcl")
	public List<LaundryBillComponent> getLaundryBillComponentList() {
		return LaundryBillComponentList;
	}

	@JsonSetter("lbcl")
	public void setLaundryBillComponentList(
			List<LaundryBillComponent> laundryBillComponentList) {
		LaundryBillComponentList = laundryBillComponentList;
	}

	@JsonGetter("objlo")
	public LaundryOwner getObjLaundryOwner() {
		return objLaundryOwner;
	}

	@JsonSetter("objlo")
	public void setObjLaundryOwner(LaundryOwner objLaundryOwner) {
		this.objLaundryOwner = objLaundryOwner;
	}

	@JsonGetter("bmid")
	public int getLoundary_bill_master_id() {
		return loundary_bill_master_id;
	}

	@JsonSetter("bmid")
	public void setLoundary_bill_master_id(int loundary_bill_master_id) {
		this.loundary_bill_master_id = loundary_bill_master_id;
	}

	@JsonGetter("oid")
	public int getLoundary_owners_id() {
		return loundary_owners_id;
	}

	@JsonSetter("oid")
	public void setLoundary_owners_id(int loundary_owners_id) {
		this.loundary_owners_id = loundary_owners_id;
	}

	@JsonGetter("gt")
	public String getLbm_grand_total() {
		return lbm_grand_total;
	}

	@JsonSetter("gt")
	public void setLbm_grand_total(String string) {
		this.lbm_grand_total = string;
	}

	@JsonGetter("dt")
	public String getLbm_date() {
		return lbm_date;
	}

	@JsonSetter("dt")
	public void setLbm_date(String lbm_date) {
		this.lbm_date = lbm_date;
	}

	@JsonGetter("bsg")
	public String getSign() {
		return sign;
	}

	@JsonSetter("bsg")
	public void setSign(String sign) {
		this.sign = sign;
	}

	@JsonGetter("lbml")
	public List<LaundryBillMaster> getLundryBillMasterList() {
		return lundryBillMasterList;
	}

	@JsonSetter("lbml")
	public void setLundryBillMasterList(
			List<LaundryBillMaster> lundryBillMasterList) {
		this.lundryBillMasterList = lundryBillMasterList;
	}

}
