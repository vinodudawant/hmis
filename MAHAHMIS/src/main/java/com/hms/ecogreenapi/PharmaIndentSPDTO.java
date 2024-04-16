package com.hms.ecogreenapi;

import java.util.Date;

public class PharmaIndentSPDTO {
	 int indentMasterId;
	 private int storeId;
	 int patientId;
       int treatmentId;
      String patientName;
       String  indentDate;
      String indentStatus;
      String itemName;
      String itemCode;
      int itemRequireQty;
	public int getIndentMasterId() {
		return indentMasterId;
	}
	public void setIndentMasterId(int indentMasterId) {
		this.indentMasterId = indentMasterId;
	}
	public int getPatientId() {
		return patientId;
	}
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}
	public int getTreatmentId() {
		return treatmentId;
	}
	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	
	public String getIndentStatus() {
		return indentStatus;
	}
	public void setIndentStatus(String indentStatus) {
		this.indentStatus = indentStatus;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getItemCode() {
		return itemCode;
	}
	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}
	public int getItemRequireQty() {
		return itemRequireQty;
	}
	public void setItemRequireQty(int itemRequireQty) {
		this.itemRequireQty = itemRequireQty;
	}
	public String getIndentDate() {
		return indentDate;
	}
	public void setIndentDate(String indentDate) {
		this.indentDate = indentDate;
	}
	public int getStoreId() {
		return storeId;
	}
	public void setStoreId(int storeId) {
		this.storeId = storeId;
	}
	@Override
	public String toString() {
		return "PharmaIndentSPDTO [indentMasterId=" + indentMasterId + ", storeId=" + storeId + ", patientId="
				+ patientId + ", treatmentId=" + treatmentId + ", patientName=" + patientName + ", indentDate="
				+ indentDate + ", indentStatus=" + indentStatus + ", itemName=" + itemName + ", itemCode=" + itemCode
				+ ", itemRequireQty=" + itemRequireQty + "]";
	}
	
	
	
	
	
      
      
      
}
