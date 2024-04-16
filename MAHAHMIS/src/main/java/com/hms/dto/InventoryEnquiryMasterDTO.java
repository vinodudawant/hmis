package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryEnquiryMasterDTO 
{
	private Integer purchaseEnquiryMasterId;
	private String purchaseEnquiryDate;
	private String purchaseEnquiryExpectedDate;
	private String purchaseEnquiryExpiryDate;
	private String purchaseEnquirySuppliersId;
	private String purchaseEnquirySuppliersName;
	private String purchaseEnquiryDocSeries;
	private String purchaseEnquiryGeneratorName;
	private Integer purchaseEnquiryGeneratorId;
	
	private String purchaseEnquiryInsertedDatetime;
	
	private String purchaseEnquiryDeletedByName;
	private String purchaseEnquiryDeletedDate;
	private String purchaseEnquiryDeletedDatetime;
	
	private String purchaseEnquiryUpdatedDatetime;
	private String purchaseEnquiryMasterFormName;
	private String purchaseEnquiryUpdatedBy;
	private String purchaseEnquiryUpdatedDate;
	
	private String purchaseEnquiryCreatedDate;
	private Integer purchaseEnquiryDeleteFlag;
	private String purchaseEnquirySms;
	private String purchaseEnquiryEmail;
	
	private List<InventoryEnquiryMasterDTO> ltInventoryEnquiryMasterDTOs; 
	                                       
	private List<InventoryEnquiryItemSlaveDTO>ltInventoryEnquiryItemSlaveDTO;
	
	private List<InventoryPartyMasterDTO>ltInventoryPartyMasterDTOs;
		
	@JsonGetter("purchaseEnquiryMasterId")
	public Integer getPurchaseEnquiryMasterId() {
		return purchaseEnquiryMasterId;
	}
	
	@JsonSetter("purchaseEnquiryMasterId")
	public void setPurchaseEnquiryMasterId(Integer purchaseEnquiryMasterId) {
		this.purchaseEnquiryMasterId = purchaseEnquiryMasterId;
	}
	
	@JsonGetter("purchaseEnquiryDate")
	public String getPurchaseEnquiryDate() {
		return purchaseEnquiryDate;
	}
	
	@JsonSetter("purchaseEnquiryDate")
	public void setPurchaseEnquiryDate(String purchaseEnquiryDate) {
		this.purchaseEnquiryDate = purchaseEnquiryDate;
	}
	
	@JsonGetter("purchaseEnquiryExpectedDate")
	public String getPurchaseEnquiryExpectedDate() {
		return purchaseEnquiryExpectedDate;
	}
	
	@JsonSetter("purchaseEnquiryExpectedDate")
	public void setPurchaseEnquiryExpectedDate(String purchaseEnquiryExpectedDate) {
		this.purchaseEnquiryExpectedDate = purchaseEnquiryExpectedDate;
	}
	
	@JsonGetter("purchaseEnquiryExpiryDate")
	public String getPurchaseEnquiryExpiryDate() {
		return purchaseEnquiryExpiryDate;
	}
	
	@JsonSetter("purchaseEnquiryExpiryDate")
	public void setPurchaseEnquiryExpiryDate(String purchaseEnquiryExpiryDate) {
		this.purchaseEnquiryExpiryDate = purchaseEnquiryExpiryDate;
	}
	
	@JsonGetter("purchaseEnquirySuppliersId")
	public String getPurchaseEnquirySuppliersId() {
		return purchaseEnquirySuppliersId;
	}
	
	@JsonSetter("purchaseEnquirySuppliersId")
	public void setPurchaseEnquirySuppliersId(String purchaseEnquirySuppliersId) {
		this.purchaseEnquirySuppliersId = purchaseEnquirySuppliersId;
	}
	
	@JsonGetter("purchaseEnquiryDocSeries")
	public String getPurchaseEnquiryDocSeries() {
		return purchaseEnquiryDocSeries;
	}
	
	@JsonSetter("purchaseEnquiryDocSeries")
	public void setPurchaseEnquiryDocSeries(String purchaseEnquiryDocSeries) {
		this.purchaseEnquiryDocSeries = purchaseEnquiryDocSeries;
	}
	
	@JsonGetter("purchaseEnquiryGeneratorName")
	public String getPurchaseEnquiryGeneratorName() {
		return purchaseEnquiryGeneratorName;
	}
	
	@JsonSetter("purchaseEnquiryGeneratorName")
	public void setPurchaseEnquiryGeneratorName(String purchaseEnquiryGeneratorName) {
		this.purchaseEnquiryGeneratorName = purchaseEnquiryGeneratorName;
	}
	
	@JsonGetter("purchaseEnquiryGeneratorId")
	public Integer getPurchaseEnquiryGeneratorId() {
		return purchaseEnquiryGeneratorId;
	}
	
	@JsonSetter("purchaseEnquiryGeneratorId")
	public void setPurchaseEnquiryGeneratorId(Integer purchaseEnquiryGeneratorId) {
		this.purchaseEnquiryGeneratorId = purchaseEnquiryGeneratorId;
	}
	
	@JsonGetter("purchaseEnquiryDeletedByName")
	public String getPurchaseEnquiryDeletedByName() {
		return purchaseEnquiryDeletedByName;
	}
	
	@JsonSetter("purchaseEnquiryDeletedByName")
	public void setPurchaseEnquiryDeletedByName(String purchaseEnquiryDeletedByName) {
		this.purchaseEnquiryDeletedByName = purchaseEnquiryDeletedByName;
	}
	
	@JsonGetter("purchaseEnquiryDeletedDate")
	public String getPurchaseEnquiryDeletedDate() {
		return purchaseEnquiryDeletedDate;
	}
	
	@JsonSetter("purchaseEnquiryDeletedDate")
	public void setPurchaseEnquiryDeletedDate(String purchaseEnquiryDeletedDate) {
		this.purchaseEnquiryDeletedDate = purchaseEnquiryDeletedDate;
	}
	
	@JsonGetter("purchaseEnquiryDeletedDatetime")
	public String getPurchaseEnquiryDeletedDatetime() {
		return purchaseEnquiryDeletedDatetime;
	}
	
	@JsonSetter("purchaseEnquiryDeletedDatetime")
	public void setPurchaseEnquiryDeletedDatetime(
			String purchaseEnquiryDeletedDatetime) {
		this.purchaseEnquiryDeletedDatetime = purchaseEnquiryDeletedDatetime;
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
	
	@JsonGetter("purchaseEnquiryMasterFormName")
	public String getPurchaseEnquiryMasterFormName() {
		return purchaseEnquiryMasterFormName;
	}
	
	@JsonSetter("purchaseEnquiryMasterFormName")
	public void setPurchaseEnquiryMasterFormName(
			String purchaseEnquiryMasterFormName) {
		this.purchaseEnquiryMasterFormName = purchaseEnquiryMasterFormName;
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
	
	@JsonGetter("purchaseEnquiryDeleteFlag")
	public Integer getPurchaseEnquiryDeleteFlag() {
		return purchaseEnquiryDeleteFlag;
	}
	
	@JsonSetter("purchaseEnquiryDeleteFlag")
	public void setPurchaseEnquiryDeleteFlag(Integer purchaseEnquiryDeleteFlag) {
		this.purchaseEnquiryDeleteFlag = purchaseEnquiryDeleteFlag;
	}

	@JsonSetter("purchaseEnquirySuppliersName")
	public String getPurchaseEnquirySuppliersName() {
		return purchaseEnquirySuppliersName;
	}
	
	@JsonGetter("purchaseEnquirySuppliersName")
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
	
	@JsonSetter("purchaseEnquirySms")
	public String getPurchaseEnquirySms() {
		return purchaseEnquirySms;
	}

	@JsonSetter("purchaseEnquirySms")
	public void setPurchaseEnquirySms(String purchaseEnquirySms) {
		this.purchaseEnquirySms = purchaseEnquirySms;
	}

	@JsonSetter("purchaseEnquiryEmail")
	public String getPurchaseEnquiryEmail() {
		return purchaseEnquiryEmail;
	}

	@JsonSetter("purchaseEnquiryEmail")
	public void setPurchaseEnquiryEmail(String purchaseEnquiryEmail) {
		this.purchaseEnquiryEmail = purchaseEnquiryEmail;
	}
	
	
	@JsonGetter("ltInventoryEnquiryMasterDTOs")
	public List<InventoryEnquiryMasterDTO> getLtInventoryEnquiryMasterDTOs() {
		return ltInventoryEnquiryMasterDTOs;
	}
	
	@JsonSetter("ltInventoryEnquiryMasterDTOs")
	public void setLtInventoryEnquiryMasterDTOs(
			List<InventoryEnquiryMasterDTO> ltInventoryEnquiryMasterDTOs) {
		this.ltInventoryEnquiryMasterDTOs = ltInventoryEnquiryMasterDTOs;
	}

	public List<InventoryEnquiryItemSlaveDTO> getLtInventoryEnquiryItemSlaveDTO() {
		return ltInventoryEnquiryItemSlaveDTO;
	}

	public void setLtInventoryEnquiryItemSlaveDTO(
			List<InventoryEnquiryItemSlaveDTO> ltInventoryEnquiryItemSlaveDTO) {
		this.ltInventoryEnquiryItemSlaveDTO = ltInventoryEnquiryItemSlaveDTO;
	}

	public List<InventoryPartyMasterDTO> getLtInventoryPartyMasterDTOs() {
		return ltInventoryPartyMasterDTOs;
	}

	public void setLtInventoryPartyMasterDTOs(
			List<InventoryPartyMasterDTO> ltInventoryPartyMasterDTOs) {
		this.ltInventoryPartyMasterDTOs = ltInventoryPartyMasterDTOs;
	}		
}
