package com.hms.inventory.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;



@Entity
@Table(name = "inv_good_receipt_note_item_slave")
public class GoodReceiptNoteItemDto implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "item_id")
	private Integer itemId;

	@Column(name = "item_name")
	private String itemName;
	
	@Column(name = "item_quantity")
	private Integer itemQuantity;
	
	@Column(name = "item_unit_price")
	private Double itemUnitPrice;
	
	@Column(name = "item_discount_per")
	private Double itemDiscountPer;
	
	@Column(name = "item_discount_rs")
	private Double itemDiscountRs;
	
	@Column(name = "item_discount_amt")
	private Double itemDiscountAmt;
	
	@Column(name = "item_base_amt")
	private Double itemBaseAmt;
	
	@Column(name = "item_gst")
	private Double itemGst;
	
	@Column(name = "item_igst")
	private Double itemIgst;
	
	@Column(name = "item_gst_amt")
	private Double itemGstAmt;
	
	@Column(name = "item_total_amt")
	private Double itemTotalAmt;
	
	@Column(name = "item_factor1")
	private Integer itemFactor1;
	
	@Column(name = "item_factor2")
	private Integer itemFactor2;
	
	@Column(name = "item_factor3")
	private Integer itemFactor3;
	
	@Column(name = "item_factor4")
	private Integer itemFactor4;
	
	@Column(name = "uom_unit_latest_factor")
	private String uomUnitLatestFactorName; 
	
	@Column(name = "uo_unit_factor_one_name")
	private String uomUnitFactorOneName;
	
	@Column(name = "uom_unit_factor_two_name")
	private String uomUnitFactorTwoName;
	
	@Column(name = "uom_unit_factor_three_name")
	private String uomUnitFactorThreeName;
	
	@Column(name = "uom_unit_factor_four_name")
	private String uomUnitFactorFourName;
	
	@Column(name = "item_expected_qty")
	private Integer itemExpectedQty;
	
	@Column(name = "item_received_qty")
	private Integer itemReceivedQty;
	
	@Column(name = "item_pending_qty")
	private Integer itemPendingQty;
	
	@Column(name = "item_bach_no")
	private String itemBatchNo;
	
			
	@Column(name = "item_manufacture_date")
	private String itemManufactureDate;
	
	@Column(name = "item_expire_date")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date itemExpireDate;
	
	// this is added by vishnu for hsn no
	@Column(name = "hsn_name")
	private String hsnName;

	@Column(name = "hsn_name_value")
	private String hsnNameValue;
	
	// this is added by vishnu for taxcode  
	@Column(name = "tax_code")
	private String taxCode;
	
	//added by rohit on 22-08-2020
	@Column(name = "item_asset_status")
	private Integer itemAssetStatus;
	
	//added by rohit on 22-08-2020
	@Column(name = "is_item_batch_wise")
	private String isItemBatchWise;
	
	//added by rohit to store the status of item lab equipment on 22-08-2020
	@Column(name = "item_lab_equipment_status")
	private Integer itemLabEquipmentStatus;
	
	//added by rohit to store the status of item reagent on 22-08-2020
	@Column(name = "item_reagent_status")
	private Integer itemReagentStatus;
	
	//added by rohit on 22-08-2020
	@Column(name = "item_manufacture_name")
	private String itemManufactureName;
	
	//added by rohit on 22-08-2020
	@Column(name="amc_val")
	private Integer amcVal;
	
	//added by rohit on 22-08-2020
	@Column(name="pm_val")
	private Integer pmVal;
	
	//added by rohit on 22-08-2020
	@Column(name="amc_Year")
	private String amcYear;
	
	//added by rohit on 22-08-2020
	@Column(name="pm_year")
	private String pmYear;
	
	//added by rohit on 22-08-2020
	@Column(name="product_warranty")
	private String productWarranty;
	
	//added by rohit on 22-08-2020
	@Column(name="product_warranty_duration")
	private Integer productWarrantyDuration;
	
	//added by rohit on 22-08-2020
	@Column(name="product_category")
	private String productCategory;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;
	
	@Column(name = "unit_id")
	private Integer unitId;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "batch_id")
	private BatchMasterDto batchMasterDto;
	
	@Column(name = "item_unit_name",columnDefinition="varchar(255) default 'NA'")
	private String itemUnitName="NA";//added by dayanand (17-2-2020) for item unit name 
	
	@Column(name="item_total_gst_igst_amt")
	private Double itemBaseIgstGstAmt;// 27-2-2020 added by dayanand to save total base amount + total tax amount	
	
	
	@Column(name = "igst_amount")
	private Double igstAmount;//added by dayanand (28-2-2020) for save igst amount

	@Transient
	private Integer batchId;
	
	@Column(name="current_item_qty")
	private Integer currentItemQty;
	
	@Column(name="is_item_slave_used",columnDefinition="varchar(2) default 'N'")
	private String isItemSlaveUsed="N";
	
	
	@Transient
	private List<GoodReceiptNoteItemDto> lstGoodReceiptNoteItemDto;
	
	@Transient
	private Integer availableQuantity;
	
	
	
	
	public Integer getAvailableQuantity() {
		return availableQuantity;
	}

	public void setAvailableQuantity(Integer availableQuantity) {
		this.availableQuantity = availableQuantity;
	}

	public String getItemUnitName() {
		return itemUnitName;
	}

	public void setItemUnitName(String itemUnitName) {
		this.itemUnitName = itemUnitName;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Integer getId() {
		return id;
	}

	public Integer getItemId() {
		return itemId;
	}

	public String getItemName() {
		return itemName;
	}

	public Integer getItemQuantity() {
		return itemQuantity;
	}

	public Double getItemDiscountPer() {
		return itemDiscountPer;
	}

	public Double getItemDiscountRs() {
		return itemDiscountRs;
	}

	public Double getItemDiscountAmt() {
		return itemDiscountAmt;
	}

	public Double getItemBaseAmt() {
		return itemBaseAmt;
	}

	public Double getItemGst() {
		return itemGst;
	}

	public Double getItemIgst() {
		return itemIgst;
	}

	public Double getItemGstAmt() {
		return itemGstAmt;
	}

	public Double getItemTotalAmt() {
		return itemTotalAmt;
	}

	public Integer getItemFactor1() {
		return itemFactor1;
	}

	public Integer getItemFactor2() {
		return itemFactor2;
	}

	public Integer getItemFactor3() {
		return itemFactor3;
	}

	public Integer getItemFactor4() {
		return itemFactor4;
	}

	public Integer getItemReceivedQty() {
		return itemReceivedQty;
	}

	public Integer getItemPendingQty() {
		return itemPendingQty;
	}

	public String getItemBatchNo() {
		return itemBatchNo;
	}

	public String getItemManufactureDate() {
		return itemManufactureDate;
	}

	public String getHsnName() {
		return hsnName;
	}

	public String getTaxCode() {
		return taxCode;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public String getDeleted() {
		return deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public BatchMasterDto getBatchMasterDto() {
		return batchMasterDto;
	}

	public Integer getBatchId() {
		return batchId;
	}

	public List<GoodReceiptNoteItemDto> getLstGoodReceiptNoteItemDto() {
		return lstGoodReceiptNoteItemDto;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public void setItemQuantity(Integer itemQuantity) {
		this.itemQuantity = itemQuantity;
	}



	public void setItemDiscountPer(Double itemDiscountPer) {
		this.itemDiscountPer = itemDiscountPer;
	}

	public void setItemDiscountRs(Double itemDiscountRs) {
		this.itemDiscountRs = itemDiscountRs;
	}

	public void setItemDiscountAmt(Double itemDiscountAmt) {
		this.itemDiscountAmt = itemDiscountAmt;
	}

	public void setItemBaseAmt(Double itemBaseAmt) {
		this.itemBaseAmt = itemBaseAmt;
	}

	public void setItemGst(Double itemGst) {
		this.itemGst = itemGst;
	}

	public void setItemIgst(Double itemIgst) {
		this.itemIgst = itemIgst;
	}

	public void setItemGstAmt(Double itemGstAmt) {
		this.itemGstAmt = itemGstAmt;
	}

	public void setItemTotalAmt(Double itemTotalAmt) {
		this.itemTotalAmt = itemTotalAmt;
	}

	public void setItemFactor1(Integer itemFactor1) {
		this.itemFactor1 = itemFactor1;
	}

	public void setItemFactor2(Integer itemFactor2) {
		this.itemFactor2 = itemFactor2;
	}

	public void setItemFactor3(Integer itemFactor3) {
		this.itemFactor3 = itemFactor3;
	}

	public void setItemFactor4(Integer itemFactor4) {
		this.itemFactor4 = itemFactor4;
	}

	public String getUomUnitLatestFactorName() {
		return uomUnitLatestFactorName;
	}

	public void setUomUnitLatestFactorName(String uomUnitLatestFactorName) {
		this.uomUnitLatestFactorName = uomUnitLatestFactorName;
	}

	public String getUomUnitFactorOneName() {
		return uomUnitFactorOneName;
	}

	public void setUomUnitFactorOneName(String uomUnitFactorOneName) {
		this.uomUnitFactorOneName = uomUnitFactorOneName;
	}

	public String getUomUnitFactorTwoName() {
		return uomUnitFactorTwoName;
	}

	public void setUomUnitFactorTwoName(String uomUnitFactorTwoName) {
		this.uomUnitFactorTwoName = uomUnitFactorTwoName;
	}

	public String getUomUnitFactorThreeName() {
		return uomUnitFactorThreeName;
	}

	public void setUomUnitFactorThreeName(String uomUnitFactorThreeName) {
		this.uomUnitFactorThreeName = uomUnitFactorThreeName;
	}

	public String getUomUnitFactorFourName() {
		return uomUnitFactorFourName;
	}

	public void setUomUnitFactorFourName(String uomUnitFactorFourName) {
		this.uomUnitFactorFourName = uomUnitFactorFourName;
	}

	public Integer getItemExpectedQty() {
		return itemExpectedQty;
	}

	public void setItemExpectedQty(Integer itemExpectedQty) {
		this.itemExpectedQty = itemExpectedQty;
	}

	public void setItemReceivedQty(Integer itemReceivedQty) {
		this.itemReceivedQty = itemReceivedQty;
	}

	public void setItemPendingQty(Integer itemPendingQty) {
		this.itemPendingQty = itemPendingQty;
	}

	public void setItemBatchNo(String itemBatchNo) {
		this.itemBatchNo = itemBatchNo;
	}

	public void setItemManufactureDate(String itemManufactureDate) {
		this.itemManufactureDate = itemManufactureDate;
	}

	public void setHsnName(String hsnName) {
		this.hsnName = hsnName;
	}
	
	public String getHsnNameValue() {
		return hsnNameValue;
	}

	public void setHsnNameValue(String hsnNameValue) {
		this.hsnNameValue = hsnNameValue;
	}

	public void setTaxCode(String taxCode) {
		this.taxCode = taxCode;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public void setBatchMasterDto(BatchMasterDto batchMasterDto) {
		this.batchMasterDto = batchMasterDto;
	}

	public void setBatchId(Integer batchId) {
		this.batchId = batchId;
	}

	public void setLstGoodReceiptNoteItemDto(
			List<GoodReceiptNoteItemDto> lstGoodReceiptNoteItemDto) {
		this.lstGoodReceiptNoteItemDto = lstGoodReceiptNoteItemDto;
	}
	
	public Date getItemExpireDate() {
		return itemExpireDate;
	}

	public void setItemExpireDate(Date itemExpireDate) {
		this.itemExpireDate = itemExpireDate;
	}

	public Double getItemUnitPrice() {
		return itemUnitPrice;
	}

	public void setItemUnitPrice(Double itemUnitPrice) {
		this.itemUnitPrice = itemUnitPrice;
	}

	
	public Double getItemBaseIgstGstAmt() {
		return itemBaseIgstGstAmt;
	}

	public void setItemBaseIgstGstAmt(Double itemBaseIgstGstAmt) {
		this.itemBaseIgstGstAmt = itemBaseIgstGstAmt;
	}
	
	

	public Double getIgstAmount() {
		return igstAmount;
	}

	public void setIgstAmount(Double igstAmount) {
		this.igstAmount = igstAmount;
	}

	public Integer getCurrentItemQty() {
		return currentItemQty;
	}

	public void setCurrentItemQty(Integer currentItemQty) {
		this.currentItemQty = currentItemQty;
	}
	
	public Integer getItemAssetStatus() {
		return itemAssetStatus;
	}

	public void setItemAssetStatus(Integer itemAssetStatus) {
		this.itemAssetStatus = itemAssetStatus;
	}

	public String getIsItemBatchWise() {
		return isItemBatchWise;
	}

	public void setIsItemBatchWise(String isItemBatchWise) {
		this.isItemBatchWise = isItemBatchWise;
	}

	public Integer getItemLabEquipmentStatus() {
		return itemLabEquipmentStatus;
	}

	public void setItemLabEquipmentStatus(Integer itemLabEquipmentStatus) {
		this.itemLabEquipmentStatus = itemLabEquipmentStatus;
	}

	public Integer getItemReagentStatus() {
		return itemReagentStatus;
	}

	public void setItemReagentStatus(Integer itemReagentStatus) {
		this.itemReagentStatus = itemReagentStatus;
	}

	public String getItemManufactureName() {
		return itemManufactureName;
	}

	public void setItemManufactureName(String itemManufactureName) {
		this.itemManufactureName = itemManufactureName;
	}

	public Integer getAmcVal() {
		return amcVal;
	}

	public void setAmcVal(Integer amcVal) {
		this.amcVal = amcVal;
	}

	public Integer getPmVal() {
		return pmVal;
	}

	public void setPmVal(Integer pmVal) {
		this.pmVal = pmVal;
	}

	public String getAmcYear() {
		return amcYear;
	}

	public void setAmcYear(String amcYear) {
		this.amcYear = amcYear;
	}

	public String getPmYear() {
		return pmYear;
	}

	public void setPmYear(String pmYear) {
		this.pmYear = pmYear;
	}

	public String getProductWarranty() {
		return productWarranty;
	}

	public void setProductWarranty(String productWarranty) {
		this.productWarranty = productWarranty;
	}

	public Integer getProductWarrantyDuration() {
		return productWarrantyDuration;
	}

	public void setProductWarrantyDuration(Integer productWarrantyDuration) {
		this.productWarrantyDuration = productWarrantyDuration;
	}

	public String getProductCategory() {
		return productCategory;
	}

	public void setProductCategory(String productCategory) {
		this.productCategory = productCategory;
	}

	public String getIsItemSlaveUsed() {
		return isItemSlaveUsed;
	}

	public void setIsItemSlaveUsed(String isItemSlaveUsed) {
		this.isItemSlaveUsed = isItemSlaveUsed;
	}

	@Override
	public String toString() {
		return "GoodReceiptNoteItemDto [id=" + id + ", itemId=" + itemId
				+ ", itemName=" + itemName + ", itemQuantity=" + itemQuantity
				+ ", itemUnitPrice=" + itemUnitPrice + ", itemDiscountPer="
				+ itemDiscountPer + ", itemDiscountRs=" + itemDiscountRs
				+ ", itemDiscountAmt=" + itemDiscountAmt + ", itemBaseAmt="
				+ itemBaseAmt + ", itemGst=" + itemGst + ", itemIgst="
				+ itemIgst + ", itemGstAmt=" + itemGstAmt + ", itemTotalAmt="
				+ itemTotalAmt + ", itemFactor1=" + itemFactor1
				+ ", itemFactor2=" + itemFactor2 + ", itemFactor3="
				+ itemFactor3 + ", itemFactor4=" + itemFactor4
				+ ", uomUnitLatestFactorName=" + uomUnitLatestFactorName
				+ ", uomUnitFactorOneName=" + uomUnitFactorOneName
				+ ", uomUnitFactorTwoName=" + uomUnitFactorTwoName
				+ ", uomUnitFactorThreeName=" + uomUnitFactorThreeName
				+ ", uomUnitFactorFourName=" + uomUnitFactorFourName
				+ ", itemExpectedQty=" + itemExpectedQty + ", itemReceivedQty="
				+ itemReceivedQty + ", itemPendingQty=" + itemPendingQty
				+ ", itemBatchNo=" + itemBatchNo + ", itemManufactureDate="
				+ itemManufactureDate + ", itemExpireDate=" + itemExpireDate
				+ ", hsnName=" + hsnName + ", hsnNameValue=" + hsnNameValue
				+ ", taxCode=" + taxCode + ", itemAssetStatus="
				+ itemAssetStatus + ", isItemBatchWise=" + isItemBatchWise
				+ ", itemLabEquipmentStatus=" + itemLabEquipmentStatus
				+ ", itemReagentStatus=" + itemReagentStatus
				+ ", itemManufactureName=" + itemManufactureName + ", amcVal="
				+ amcVal + ", pmVal=" + pmVal + ", amcYear=" + amcYear
				+ ", pmYear=" + pmYear + ", productWarranty=" + productWarranty
				+ ", productWarrantyDuration=" + productWarrantyDuration
				+ ", productCategory=" + productCategory + ", createdBy="
				+ createdBy + ", unitId=" + unitId + ", updatedBy=" + updatedBy
				+ ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deleted=" + deleted + ", deletedBy="
				+ deletedBy + ", deletedDate=" + deletedDate
				+ ", batchMasterDto=" + batchMasterDto + ", itemUnitName="
				+ itemUnitName + ", itemBaseIgstGstAmt=" + itemBaseIgstGstAmt
				+ ", igstAmount=" + igstAmount + ", batchId=" + batchId
				+ ", currentItemQty=" + currentItemQty + ", isItemSlaveUsed="
				+ isItemSlaveUsed + ", lstGoodReceiptNoteItemDto="
				+ lstGoodReceiptNoteItemDto + "]";
	}

	

}