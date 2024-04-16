package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryEnquiryItemSlaveDTO 
{
	private Integer purchaseEnquiryItemMasterId;
	private String purchaseEnquiryItemCode;
	private String purchaseEnquiryItemName;
	private String purchaseEnquiryLeadtime;	
	private String purchaseEnquiryExpectedDate;
	private String purchaseEnquiryLeadtimeInwords;
	private String purchaseEnquiryMinCost;
	private String purchaseEnquiryMaxCost;
	private Integer purchaseEnquiryMasterId;
	
	private String purchaseCommonItemDocSeries;	
	private Integer purchaseEnquirySuppliersId;
	private String purchaseEnquirySuppliersName;	
	
	private String purchaseEnquiryInsertedDatetime;
	
	private String purchaseEnquiryUpdatedBy;
	private String purchaseEnquiryUpdatedDate;
	private String purchaseEnquiryCreatedDate;
	private String purchaseEnquiryUpdatedDatetime;
	
	private Integer purchaseEnquiryDeleteFlag;
	
	private List<InventoryEnquiryItemSlaveDTO> ltInventoryEnquiryItemSlaveDTOs;
	
	
	@JsonGetter("purchaseEnquiryItemMasterId")
	public Integer getPurchaseEnquiryItemMasterId() {
		return purchaseEnquiryItemMasterId;
	}

	@JsonSetter("purchaseEnquiryItemMasterId")
	public void setPurchaseEnquiryItemMasterId(Integer purchaseEnquiryItemMasterId) {
		this.purchaseEnquiryItemMasterId = purchaseEnquiryItemMasterId;
	}

	@JsonGetter("purchaseEnquiryItemCode")
	public String getPurchaseEnquiryItemCode() {
		return purchaseEnquiryItemCode;
	}

	@JsonSetter("purchaseEnquiryItemCode")
	public void setPurchaseEnquiryItemCode(String purchaseEnquiryItemCode) {
		this.purchaseEnquiryItemCode = purchaseEnquiryItemCode;
	}

	@JsonGetter("purchaseEnquiryItemName")
	public String getPurchaseEnquiryItemName() {
		return purchaseEnquiryItemName;
	}

	@JsonSetter("purchaseEnquiryItemName")
	public void setPurchaseEnquiryItemName(String purchaseEnquiryItemName) {
		this.purchaseEnquiryItemName = purchaseEnquiryItemName;
	}

	@JsonGetter("purchaseEnquiryLeadtime")
	public String getPurchaseEnquiryLeadtime() {
		return purchaseEnquiryLeadtime;
	}

	@JsonSetter("purchaseEnquiryLeadtime")
	public void setPurchaseEnquiryLeadtime(String purchaseEnquiryLeadtime) {
		this.purchaseEnquiryLeadtime = purchaseEnquiryLeadtime;
	}

	@JsonGetter("purchaseEnquiryExpectedDate")
	public String getPurchaseEnquiryExpectedDate() {
		return purchaseEnquiryExpectedDate;
	}

	@JsonSetter("purchaseEnquiryExpectedDate")
	public void setPurchaseEnquiryExpectedDate(String purchaseEnquiryExpectedDate) {
		this.purchaseEnquiryExpectedDate = purchaseEnquiryExpectedDate;
	}

	@JsonGetter("purchaseEnquiryLeadtimeInwords")
	public String getPurchaseEnquiryLeadtimeInwords() {
		return purchaseEnquiryLeadtimeInwords;
	}

	@JsonSetter("purchaseEnquiryLeadtimeInwords")
	public void setPurchaseEnquiryLeadtimeInwords(
			String purchaseEnquiryLeadtimeInwords) {
		this.purchaseEnquiryLeadtimeInwords = purchaseEnquiryLeadtimeInwords;
	}

	@JsonGetter("purchaseEnquiryMinCost")
	public String getPurchaseEnquiryMinCost() {
		return purchaseEnquiryMinCost;
	}

	@JsonSetter("purchaseEnquiryMinCost")
	public void setPurchaseEnquiryMinCost(String purchaseEnquiryMinCost) {
		this.purchaseEnquiryMinCost = purchaseEnquiryMinCost;
	}

	@JsonGetter("purchaseEnquiryMaxCost")
	public String getPurchaseEnquiryMaxCost() {
		return purchaseEnquiryMaxCost;
	}

	@JsonSetter("purchaseEnquiryMaxCost")
	public void setPurchaseEnquiryMaxCost(String purchaseEnquiryMaxCost) {
		this.purchaseEnquiryMaxCost = purchaseEnquiryMaxCost;
	}

	@JsonGetter("purchaseEnquiryMasterId")
	public Integer getPurchaseEnquiryMasterId() {
		return purchaseEnquiryMasterId;
	}

	@JsonSetter("purchaseEnquiryMasterId")
	public void setPurchaseEnquiryMasterId(Integer purchaseEnquiryMasterId) {
		this.purchaseEnquiryMasterId = purchaseEnquiryMasterId;
	}

	@JsonGetter("purchaseCommonItemDocSeries")
	public String getPurchaseCommonItemDocSeries() {
		return purchaseCommonItemDocSeries;
	}

	@JsonSetter("purchaseCommonItemDocSeries")
	public void setPurchaseCommonItemDocSeries(String purchaseCommonItemDocSeries) {
		this.purchaseCommonItemDocSeries = purchaseCommonItemDocSeries;
	}

	@JsonGetter("purchaseEnquirySuppliersId")
	public Integer getPurchaseEnquirySuppliersId() {
		return purchaseEnquirySuppliersId;
	}

	@JsonSetter("purchaseEnquirySuppliersId")
	public void setPurchaseEnquirySuppliersId(Integer purchaseEnquirySuppliersId) {
		this.purchaseEnquirySuppliersId = purchaseEnquirySuppliersId;
	}

	@JsonGetter("purchaseEnquirySuppliersName")
	public String getPurchaseEnquirySuppliersName() {
		return purchaseEnquirySuppliersName;
	}

	@JsonSetter("purchaseEnquirySuppliersName")
	public void setPurchaseEnquirySuppliersName(String purchaseEnquirySuppliersName) {
		this.purchaseEnquirySuppliersName = purchaseEnquirySuppliersName;
	}

	@JsonGetter("purchaseEnquiryInsertedDatetime")
	public String getPurchaseEnquiryInsertedDatetime() {
		return purchaseEnquiryInsertedDatetime;
	}

	@JsonSetter("purchaseEnquiryInsertedDatetime")
	public void setPurchaseEnquiryInsertedDatetime(
			String purchaseEnquiryInsertedDatetime) {
		this.purchaseEnquiryInsertedDatetime = purchaseEnquiryInsertedDatetime;
	}

	@JsonGetter("purchaseEnquiryUpdatedBy")
	public String getPurchaseEnquiryUpdatedBy() {
		return purchaseEnquiryUpdatedBy;
	}

	@JsonSetter("purchaseEnquiryUpdatedBy")
	public void setPurchaseEnquiryUpdatedBy(String purchaseEnquiryUpdatedBy) {
		this.purchaseEnquiryUpdatedBy = purchaseEnquiryUpdatedBy;
	}

	@JsonGetter("purchaseEnquiryUpdatedDate")
	public String getPurchaseEnquiryUpdatedDate() {
		return purchaseEnquiryUpdatedDate;
	}

	@JsonSetter("purchaseEnquiryUpdatedDate")
	public void setPurchaseEnquiryUpdatedDate(String purchaseEnquiryUpdatedDate) {
		this.purchaseEnquiryUpdatedDate = purchaseEnquiryUpdatedDate;
	}

	@JsonGetter("purchaseEnquiryCreatedDate")
	public String getPurchaseEnquiryCreatedDate() {
		return purchaseEnquiryCreatedDate;
	}

	@JsonSetter("purchaseEnquiryCreatedDate")
	public void setPurchaseEnquiryCreatedDate(String purchaseEnquiryCreatedDate) {
		this.purchaseEnquiryCreatedDate = purchaseEnquiryCreatedDate;
	}

	@JsonGetter("purchaseEnquiryUpdatedDatetime")
	public String getPurchaseEnquiryUpdatedDatetime() {
		return purchaseEnquiryUpdatedDatetime;
	}

	@JsonSetter("purchaseEnquiryUpdatedDatetime")
	public void setPurchaseEnquiryUpdatedDatetime(
			String purchaseEnquiryUpdatedDatetime) {
		this.purchaseEnquiryUpdatedDatetime = purchaseEnquiryUpdatedDatetime;
	}

	@JsonGetter("purchaseEnquiryDeleteFlag")
	public Integer getPurchaseEnquiryDeleteFlag() {
		return purchaseEnquiryDeleteFlag;
	}

	@JsonSetter("purchaseEnquiryDeleteFlag")
	public void setPurchaseEnquiryDeleteFlag(Integer purchaseEnquiryDeleteFlag) {
		this.purchaseEnquiryDeleteFlag = purchaseEnquiryDeleteFlag;
	}
	
	@JsonGetter("ltInventoryEnquiryItemSlaveDTOs")
	public List<InventoryEnquiryItemSlaveDTO> getLtInventoryEnquiryItemSlaveDTOs() {
		return ltInventoryEnquiryItemSlaveDTOs;
	}

	@JsonSetter("ltInventoryEnquiryItemSlaveDTOs")
	public void setLtInventoryEnquiryItemSlaveDTOs(
			List<InventoryEnquiryItemSlaveDTO> ltInventoryEnquiryItemSlaveDTOs) {
		this.ltInventoryEnquiryItemSlaveDTOs = ltInventoryEnquiryItemSlaveDTOs;
	}
}
