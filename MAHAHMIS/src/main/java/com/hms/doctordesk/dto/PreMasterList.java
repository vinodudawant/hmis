package com.hms.doctordesk.dto;

public class PreMasterList {

	private String drugName;
	private String prepName;
	private int drugId;
	private int prepId;
	private String uom;
	private String strength;
	
	public String getUom() {
		return uom;
	}
	public void setUom(String uom) {
		this.uom = uom;
	}
	public String getStrength() {
		return strength;
	}
	public void setStrength(String strength) {
		this.strength = strength;
	}
	public String getDrugName() {
		return drugName;
	}
	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}
	public String getPrepName() {
		return prepName;
	}
	public void setPrepName(String prepName) {
		this.prepName = prepName;
	}
	public int getDrugId() {
		return drugId;
	}
	public void setDrugId(int drugId) {
		this.drugId = drugId;
	}
	public int getPrepId() {
		return prepId;
	}
	public void setPrepId(int prepId) {
		this.prepId = prepId;
	}
	
	
	
}
