package com.hms.inventory.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name="inv_purchase_order_item_slave")
public class PurchaseOrderItemSlaveDto implements Serializable{

	@Transient
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	
	@CreationTimestamp
	@Column(name="created_date_time" ,updatable = false)
	private Date createdDateTime;
	
	@UpdateTimestamp
	@Column(name="updated_date_time")
	private Date updatedDateTime;
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="created_by",updatable = false)
	private int createdBy;
	
	@Column(name="updated_by")
	private int updatedBy;
	
	@Column(name="deleted_by")
	private int deleted_by;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@Column(name="item_master_id")
	private Integer item_master_id;
	
	@Column(name="item_name")
	private String itemName;
	
	@Column(name="item_quantity")
	private int itemQuantity;
	
	@Column(name="item_unit_price")
	private double itemUnitPrice;
	
	@Column(name="item_trade_discount")
	private double itemTradeDiscount;
	
	@Column(name="item_trade_discount_rupees")
	private double itemTradeDiscountRupees;
	
	@Column(name="item_trade_discount_amount")
	private double itemTradeDiscountAmount;
	
	@Column(name="item_trade_base_amount")
	private double itemTradeBaseAmount;
	
	@Column(name="gst")
	private double gst;
	
	@Column(name="igst")
	private double igst;
	
	//added by Rohit
	//date 25-03-2020
	@Column(name="total_amount")
	private double totalAmount;
	
	@Column(name="item_purchase_factor_uom_1")
	private String itemPurchaseFactorUom1;
	
	@Column(name="item_purchase_factor_uom_2")
	private String itemPurchaseFactorUom2;
	
	@Column(name="item_purchase_factor_uom_3")
	private String itemPurchaseFactorUom3;
	
	@Column(name="item_purchase_factor_uom_4")
	private String itemPurchaseFactorUom4;
	
	@Column(name="item_actual_quantity")
	private double itemActualQuantity;
	
	@Column(name="item_pending_quantity")
	private double itemPendingQuantity;

	//added by Rohit
	//date 25-03-2020
	@Column(name="igst_amount_value")
	private double igstAmountValue;
	
	//added by Rohit
	//date 25-03-2020
	@Column(name="gst_amount_value")
	private double gstAmountValue;
	
	// this is added by vishnu for hsn no
	@Column(name = "hsn_name")
	private String hsnName;
	
	@Column(name = "hsn_name_value")
	private String hsnNameValue;
	
		
	// this is added by vishnu for taxcode  
	@Column(name = "tax_code")
	private String taxCode;
	
	//added by Rohit
	@Column(name = "uom_unit_latest_factor")
	private String uomUnitLatestFactorName; 
	
	//added by Rohit
	@Column(name = "uo_unit_factor_one_name")
	private String uomUnitFactorOneName;
	
	//added by Rohit
	@Column(name = "uom_unit_factor_two_name")
	private String uomUnitFactorTwoName;
	
	//added by Rohit
	@Column(name = "uom_unit_factor_three_name")
	private String uomUnitFactorThreeName;
	
	//added by Rohit
	@Column(name = "uom_unit_factor_four_name")
	private String uomUnitFactorFourName;
	
	//added by Dayanand
	@Column(name = "item_unit_name")
	private String itemUnitName;
	
	@Column(name = "item_asset_status")
	private Integer itemAssetStatus;
	
	@Column(name = "is_item_batch_wise")
	private String isItemBatchWise;
	
	//added by rohit to store the status of item reagent
	@Column(name = "item_reagent_status")
	private Integer itemReagentStatus;
	
	@Column(name = "manufacture_name")
	private String manufactureName;
	
	@Column(name="amc_val")
	private Integer amcVal;
	
	@Column(name="pm_val")
	private Integer pmVal;
	
	@Column(name="amc_Year")
	private String amcYear;
	
	@Column(name="pm_year")
	private String pmYear;
	
	@Column(name="product_warranty")
	private String productWarranty;
	
	@Column(name="product_warranty_duration")
	private Integer productWarrantyDuration;
	
	@Column(name="product_category")
	private String productCategory;
	
	//added by rohit to store the status of item lab equipment
	@Column(name = "item_lab_equipment_status")
	private Integer itemLabEquipmentStatus;
	
	@Transient
	private List<PurchaseOrderItemSlaveDto> lstPurchaseOrderItemSlaveDto;
	
	public void setItemAssetStatus(Integer itemAssetStatus) {
		this.itemAssetStatus = itemAssetStatus;
	}
	
	public Integer getItemAssetStatus() {
		return itemAssetStatus;
	}
	
	public String getIsItemBatchWise() {
		return isItemBatchWise;
	}

	public void setIsItemBatchWise(String isItemBatchWise) {
		this.isItemBatchWise = isItemBatchWise;
	}
	
	public String getItemUnitName() {
			return itemUnitName;
	}

	public void setItemUnitName(String itemUnitName) {
			this.itemUnitName = itemUnitName;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public int getDeleted_by() {
		return deleted_by;
	}

	public void setDeleted_by(int deleted_by) {
		this.deleted_by = deleted_by;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Integer getItem_master_id() {
		return item_master_id;
	}

	public void setItem_master_id(Integer item_master_id) {
		this.item_master_id = item_master_id;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public int getItemQuantity() {
		return itemQuantity;
	}

	public void setItemQuantity(int itemQuantity) {
		this.itemQuantity = itemQuantity;
	}

	public double getItemUnitPrice() {
		return itemUnitPrice;
	}

	public void setItemUnitPrice(double itemUnitPrice) {
		this.itemUnitPrice = itemUnitPrice;
	}

	public double getItemTradeDiscount() {
		return itemTradeDiscount;
	}

	public void setItemTradeDiscount(double itemTradeDiscount) {
		this.itemTradeDiscount = itemTradeDiscount;
	}

	public double getItemTradeDiscountRupees() {
		return itemTradeDiscountRupees;
	}

	public void setItemTradeDiscountRupees(double itemTradeDiscountRupees) {
		this.itemTradeDiscountRupees = itemTradeDiscountRupees;
	}

	public double getItemTradeDiscountAmount() {
		return itemTradeDiscountAmount;
	}

	public void setItemTradeDiscountAmount(double itemTradeDiscountAmount) {
		this.itemTradeDiscountAmount = itemTradeDiscountAmount;
	}

	public double getItemTradeBaseAmount() {
		return itemTradeBaseAmount;
	}

	public void setItemTradeBaseAmount(double itemTradeBaseAmount) {
		this.itemTradeBaseAmount = itemTradeBaseAmount;
	}

	public double getGst() {
		return gst;
	}

	public void setGst(double gst) {
		this.gst = gst;
	}

	public double getIgst() {
		return igst;
	}

	public void setIgst(double igst) {
		this.igst = igst;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getItemPurchaseFactorUom1() {
		return itemPurchaseFactorUom1;
	}

	public void setItemPurchaseFactorUom1(String itemPurchaseFactorUom1) {
		this.itemPurchaseFactorUom1 = itemPurchaseFactorUom1;
	}

	public String getItemPurchaseFactorUom2() {
		return itemPurchaseFactorUom2;
	}

	public void setItemPurchaseFactorUom2(String itemPurchaseFactorUom2) {
		this.itemPurchaseFactorUom2 = itemPurchaseFactorUom2;
	}

	public String getItemPurchaseFactorUom3() {
		return itemPurchaseFactorUom3;
	}

	public void setItemPurchaseFactorUom3(String itemPurchaseFactorUom3) {
		this.itemPurchaseFactorUom3 = itemPurchaseFactorUom3;
	}

	public String getItemPurchaseFactorUom4() {
		return itemPurchaseFactorUom4;
	}

	public void setItemPurchaseFactorUom4(String itemPurchaseFactorUom4) {
		this.itemPurchaseFactorUom4 = itemPurchaseFactorUom4;
	}

	public double getItemActualQuantity() {
		return itemActualQuantity;
	}

	public void setItemActualQuantity(double itemActualQuantity) {
		this.itemActualQuantity = itemActualQuantity;
	}

	public double getItemPendingQuantity() {
		return itemPendingQuantity;
	}

	public String getHsnName() {
		return hsnName;
	}

	public String getTaxCode() {
		return taxCode;
	}

	public void setHsnName(String hsnName) {
		this.hsnName = hsnName;
	}

	public void setTaxCode(String taxCode) {
		this.taxCode = taxCode;
	}

	public void setItemPendingQuantity(double itemPendingQuantity) {
		this.itemPendingQuantity = itemPendingQuantity;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public List<PurchaseOrderItemSlaveDto> getLstPurchaseOrderItemSlaveDto() {
		return lstPurchaseOrderItemSlaveDto;
	}
	
	public double getIgstAmountValue() {
		return igstAmountValue;
	}

	public void setIgstAmountValue(double igstAmountValue) {
		this.igstAmountValue = igstAmountValue;
	}

	public void setLstPurchaseOrderItemSlaveDto(
			List<PurchaseOrderItemSlaveDto> lstPurchaseOrderItemSlaveDto) {
		this.lstPurchaseOrderItemSlaveDto = lstPurchaseOrderItemSlaveDto;
	}

	public double getGstAmountValue() {
		return gstAmountValue;
	}

	public void setGstAmountValue(double gstAmountValue) {
		this.gstAmountValue = gstAmountValue;
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

	public String getHsnNameValue() {
		return hsnNameValue;
	}

	public void setHsnNameValue(String hsnNameValue) {
		this.hsnNameValue = hsnNameValue;
	}

	public Integer getItemReagentStatus() {
		return itemReagentStatus;
	}

	public void setItemReagentStatus(Integer itemReagentStatus) {
		this.itemReagentStatus = itemReagentStatus;
	}

	public String getManufactureName() {
		return manufactureName;
	}

	public void setManufactureName(String manufactureName) {
		this.manufactureName = manufactureName;
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

	public Integer getItemLabEquipmentStatus() {
		return itemLabEquipmentStatus;
	}

	public void setItemLabEquipmentStatus(Integer itemLabEquipmentStatus) {
		this.itemLabEquipmentStatus = itemLabEquipmentStatus;
	}
	
	
}
