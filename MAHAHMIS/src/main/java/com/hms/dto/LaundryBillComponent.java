package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LaundryBillComponent {

	private int loundary_bill_component_id;
	private int loundary_bill_master_id;
	private int loundary_items_id;
	private int lbc_qty;
	private String lbc_rate;
	private String lbc_subtotal;

	private List<LaundryBillComponent> laundryBillComponentList;

	private LaundryBillMaster objLaundryBillMaster;
	private LoundaryItem objLoundaryItem;

	@JsonGetter("objli")
	public LoundaryItem getObjLoundaryItem() {
		return objLoundaryItem;
	}

	@JsonSetter("objli")
	public void setObjLoundaryItem(LoundaryItem objLoundaryItem) {
		this.objLoundaryItem = objLoundaryItem;
	}

	@JsonGetter("objlbm")
	public LaundryBillMaster getObjLaundryBillMaster() {
		return objLaundryBillMaster;
	}

	@JsonSetter("objlbm")
	public void setObjLaundryBillMaster(LaundryBillMaster objLaundryBillMaster) {
		this.objLaundryBillMaster = objLaundryBillMaster;
	}

	@JsonGetter("bcid")
	public int getLoundary_bill_component_id() {
		return loundary_bill_component_id;
	}

	@JsonSetter("bcid")
	public void setLoundary_bill_component_id(int loundary_bill_component_id) {
		this.loundary_bill_component_id = loundary_bill_component_id;
	}

	@JsonGetter("bmid")
	public int getLoundary_bill_master_id() {
		return loundary_bill_master_id;
	}

	@JsonSetter("bmid")
	public void setLoundary_bill_master_id(int loundary_bill_master_id) {
		this.loundary_bill_master_id = loundary_bill_master_id;
	}

	@JsonGetter("liid")
	public int getLoundary_items_id() {
		return loundary_items_id;
	}

	@JsonSetter("liid")
	public void setLoundary_items_id(int loundary_items_id) {
		this.loundary_items_id = loundary_items_id;
	}

	@JsonGetter("iqt")
	public int getLbc_qty() {
		return lbc_qty;
	}

	@JsonSetter("iqt")
	public void setLbc_qty(int lbc_qty) {
		this.lbc_qty = lbc_qty;
	}

	@JsonGetter("ir")
	public String getLbc_rate() {
		return lbc_rate;
	}

	@JsonSetter("ir")
	public void setLbc_rate(String string) {
		this.lbc_rate = string;
	}

	@JsonGetter("bcst")
	public String getLbc_subtotal() {
		return lbc_subtotal;
	}

	@JsonSetter("bcst")
	public void setLbc_subtotal(String string) {
		this.lbc_subtotal = string;
	}

	@JsonGetter("lbcl")
	public List<LaundryBillComponent> getLaundryBillComponentList() {
		return laundryBillComponentList;
	}

	@JsonSetter("lbcl")
	public void setLaundryBillComponentList(
			List<LaundryBillComponent> laundryBillComponentList) {
		this.laundryBillComponentList = laundryBillComponentList;
	}

}
