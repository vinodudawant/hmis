package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class SurgicalKitComp {

	private int idsurgical_kit_comp;
	private int idsurgical_kit_master;
	private String item_name;
	private String qty;
	private String surgicalKitName;
	private String item_nameM;
	private String item_nameH;
	private String item_name1ol;
	private String item_name2ol;
	private String item_name3ol;
	
	private String txtPOCLName;
	private String txtPOCLRemark;
	
	
	public String getTxtPOCLName() {
		return txtPOCLName;
	}

	public void setTxtPOCLName(String txtPOCLName) {
		this.txtPOCLName = txtPOCLName;
	}

	public String getTxtPOCLRemark() {
		return txtPOCLRemark;
	}

	public void setTxtPOCLRemark(String txtPOCLRemark) {
		this.txtPOCLRemark = txtPOCLRemark;
	}

	

	private List<SurgicalKitComp> surgicalKitCompList = null;

	@JsonGetter("skname")
	public String getSurgicalKitName() {
		return surgicalKitName;
	}

	@JsonSetter("skname")
	public void setSurgicalKitName(String surgicalKitName) {
		this.surgicalKitName = surgicalKitName;
	}

	@JsonGetter("idskco")
	public int getIdsurgical_kit_comp() {
		return idsurgical_kit_comp;
	}

	@JsonSetter("idskco")
	public void setIdsurgical_kit_comp(int idsurgical_kit_comp) {
		this.idsurgical_kit_comp = idsurgical_kit_comp;
	}

	@JsonGetter("idskm")
	public int getIdsurgical_kit_master() {
		return idsurgical_kit_master;
	}

	@JsonSetter("idskm")
	public void setIdsurgical_kit_master(int idsurgical_kit_master) {
		this.idsurgical_kit_master = idsurgical_kit_master;
	}

	@JsonGetter("itnm")
	public String getItem_name() {
		return item_name;
	}

	@JsonSetter("itnm")
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}

	@JsonGetter("qty")
	public String getQty() {
		return qty;
	}

	@JsonSetter("qty")
	public void setQty(String qty) {
		this.qty = qty;
	}

	@JsonGetter("skcli")
	public List<SurgicalKitComp> getSurgicalKitCompList() {
		return surgicalKitCompList;
	}

	@JsonSetter("skcli")
	public void setSurgicalKitCompList(List<SurgicalKitComp> surgicalKitCompList) {
		this.surgicalKitCompList = surgicalKitCompList;
	}

	@JsonGetter("item_nameM")
	public String getItem_nameM() {
		return item_nameM;
	}

	@JsonSetter("item_nameM")
	public void setItem_nameM(String item_nameM) {
		this.item_nameM = item_nameM;
	}

	@JsonGetter("item_nameH")
	public String getItem_nameH() {
		return item_nameH;
	}

	@JsonSetter("item_nameH")
	public void setItem_nameH(String item_nameH) {
		this.item_nameH = item_nameH;
	}

	@JsonGetter("item_name1ol")
	public String getItem_name1ol() {
		return item_name1ol;
	}

	@JsonSetter("item_name1ol")
	public void setItem_name1ol(String item_name1ol) {
		this.item_name1ol = item_name1ol;
	}

	@JsonGetter("item_name2ol")
	public String getItem_name2ol() {
		return item_name2ol;
	}

	@JsonSetter("item_name2ol")
	public void setItem_name2ol(String item_name2ol) {
		this.item_name2ol = item_name2ol;
	}

	@JsonGetter("item_name3ol")
	public String getItem_name3ol() {
		return item_name3ol;
	}

	@JsonSetter("item_name3ol")
	public void setItem_name3ol(String item_name3ol) {
		this.item_name3ol = item_name3ol;
	}

}
