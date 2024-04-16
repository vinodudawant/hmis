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
import org.springframework.stereotype.Component;


@Entity
@Component
@Table(name="inv_opening_stock_item_slave")
public class OpeningStockItemSlaveDto implements Serializable{

	@Transient
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@CreationTimestamp
	@Column(name="created_date_time" ,updatable = false)
	private Date createdDateTime;
	
	@UpdateTimestamp
	@Column(name="updated_date_time")
	private Date updatedDateTime;
	
	@Column(name="user_id")
	private Integer userId;
	
	@Column(name="created_by",updatable = false)
	private Integer createdBy;
	
	@Column(name="user_name")
	private String userName;
	
	@Column(name="deleted_by")
	private int deleted_by;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	//added by rohit
	@Column(name = "uom_unit_latest_factor")
	private String uomUnitLatestFactorName; 
	
	//added by rohit
	@Column(name = "uo_unit_factor_one_name")
	private String uomUnitFactorOneName;
	
	//added by rohit
	@Column(name = "uom_unit_factor_two_name")
	private String uomUnitFactorTwoName;
	
	//added by rohit
	@Column(name = "uom_unit_factor_three_name")
	private String uomUnitFactorThreeName;
	
	@Column(name = "uom_unit_factor_four_name")
	private String uomUnitFactorFourName;
	
	//added by rohit to store the status of item reagent
	@Column(name = "item_reagent_status")
	private Integer itemReagentStatus;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@Column(name="item_master_id")
	private Integer item_master_id;
	
	@Column(name="item_name")
	private String itemName;
	
	@Column(name="item_quantity")
	private Integer itemQuantity;
	
	@Column(name="item_unit_price")
	private Double itemUnitPrice;
	
	@Column(name="item_trade_discount")
	private Double itemTradeDiscount;
	
	@Column(name="item_trade_discount_rupees")
	private Double itemTradeDiscountRupees;
	
	@Column(name="item_trade_discount_amount")
	private Double itemTradeDiscountAmount;
	
	@Column(name="item_trade_base_amount")
	private Double itemTradeBaseAmount;
	
	@Column(name="gst")
	private Double gst;
	
	@Column(name="igst")
	private Double igst;
	
	@Column(name="total_tax_amount")
	private Double totalTaxAmount;//added by dayanand (19-3-2020) to save total tax amt
	
	@Column(name="total_amount")
	private Double totalAmount;
	
	@Column(name="item_purchase_factor_uom_1")
	private String itemPurchaseFactorUom1;
	
	@Column(name="item_purchase_factor_uom_2")
	private String itemPurchaseFactorUom2;
	
	@Column(name="item_purchase_factor_uom_3")
	private String itemPurchaseFactorUom3;
	
	@Column(name="item_purchase_factor_uom_4")
	private String itemPurchaseFactorUom4;
	
	@Column(name="item_actual_quantity")
	private Double itemActualQuantity;
	
	@Column(name="batch_no")
	private String batchNo;//added by dayanand(30-1-2020)
	
	@Column(name="manufac_date")
	private String manufacDate;//added by dayanand(30-1-2020)
	
	@Column(name="expiry_date")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date expiryDate;//added by dayanand(30-1-2020)
	
	/*//added by Rohit 27-10-2020
	//to store previous available qty of opening stock batch wise
	@Column(name="os_previous_available_qty")
	private Integer osPreviousAvailableQty;*/

	@Transient
	private List<OpeningStockItemSlaveDto> lstOpeningStockItemSlaveDto;
	
	@Transient
	private Integer batchId;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "batch_id")
	private BatchMasterDto batchMasterDto;

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

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
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

	public Integer getItemReagentStatus() {
		return itemReagentStatus;
	}

	public void setItemReagentStatus(Integer itemReagentStatus) {
		this.itemReagentStatus = itemReagentStatus;
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

	public Integer getItemQuantity() {
		return itemQuantity;
	}

	public void setItemQuantity(Integer itemQuantity) {
		this.itemQuantity = itemQuantity;
	}

	public Double getItemUnitPrice() {
		return itemUnitPrice;
	}

	public void setItemUnitPrice(Double itemUnitPrice) {
		this.itemUnitPrice = itemUnitPrice;
	}

	public Double getItemTradeDiscount() {
		return itemTradeDiscount;
	}

	public void setItemTradeDiscount(Double itemTradeDiscount) {
		this.itemTradeDiscount = itemTradeDiscount;
	}

	public Double getItemTradeDiscountRupees() {
		return itemTradeDiscountRupees;
	}

	public void setItemTradeDiscountRupees(Double itemTradeDiscountRupees) {
		this.itemTradeDiscountRupees = itemTradeDiscountRupees;
	}

	public Double getItemTradeDiscountAmount() {
		return itemTradeDiscountAmount;
	}

	public void setItemTradeDiscountAmount(Double itemTradeDiscountAmount) {
		this.itemTradeDiscountAmount = itemTradeDiscountAmount;
	}

	public Double getItemTradeBaseAmount() {
		return itemTradeBaseAmount;
	}

	public void setItemTradeBaseAmount(Double itemTradeBaseAmount) {
		this.itemTradeBaseAmount = itemTradeBaseAmount;
	}

	public Double getGst() {
		return gst;
	}

	public void setGst(Double gst) {
		this.gst = gst;
	}

	public Double getIgst() {
		return igst;
	}

	public void setIgst(Double igst) {
		this.igst = igst;
	}

	public Double getTotalTaxAmount() {
		return totalTaxAmount;
	}

	public void setTotalTaxAmount(Double totalTaxAmount) {
		this.totalTaxAmount = totalTaxAmount;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
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

	public Double getItemActualQuantity() {
		return itemActualQuantity;
	}

	public void setItemActualQuantity(Double itemActualQuantity) {
		this.itemActualQuantity = itemActualQuantity;
	}

	public String getBatchNo() {
		return batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}

	public String getManufacDate() {
		return manufacDate;
	}

	public void setManufacDate(String manufacDate) {
		this.manufacDate = manufacDate;
	}

	public Date getExpiryDate() {
		return expiryDate;
	}

	public Integer getBatchId() {
		return batchId;
	}

	public void setBatchId(Integer batchId) {
		this.batchId = batchId;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}

	public List<OpeningStockItemSlaveDto> getLstOpeningStockItemSlaveDto() {
		return lstOpeningStockItemSlaveDto;
	}

	public void setLstOpeningStockItemSlaveDto(
			List<OpeningStockItemSlaveDto> lstOpeningStockItemSlaveDto) {
		this.lstOpeningStockItemSlaveDto = lstOpeningStockItemSlaveDto;
	}

	public BatchMasterDto getBatchMasterDto() {
		return batchMasterDto;
	}

	public void setBatchMasterDto(BatchMasterDto batchMasterDto) {
		this.batchMasterDto = batchMasterDto;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	/*public Integer getOsPreviousAvailableQty() {
		return osPreviousAvailableQty;
	}

	public void setOsPreviousAvailableQty(Integer osPreviousAvailableQty) {
		this.osPreviousAvailableQty = osPreviousAvailableQty;
	}*/

	@Override
	public String toString() {
		return "OpeningStockItemSlaveDto [id=" + id + ", createdDateTime="
				+ createdDateTime + ", updatedDateTime=" + updatedDateTime
				+ ", userId=" + userId + ", createdBy=" + createdBy
				+ ", userName=" + userName + ", deleted_by=" + deleted_by
				+ ", deleted=" + deleted + ", deletedDate=" + deletedDate
				+ ", uomUnitLatestFactorName=" + uomUnitLatestFactorName
				+ ", uomUnitFactorOneName=" + uomUnitFactorOneName
				+ ", uomUnitFactorTwoName=" + uomUnitFactorTwoName
				+ ", uomUnitFactorThreeName=" + uomUnitFactorThreeName
				+ ", uomUnitFactorFourName=" + uomUnitFactorFourName
				+ ", itemReagentStatus=" + itemReagentStatus + ", unitId="
				+ unitId + ", item_master_id=" + item_master_id + ", itemName="
				+ itemName + ", itemQuantity=" + itemQuantity
				+ ", itemUnitPrice=" + itemUnitPrice + ", itemTradeDiscount="
				+ itemTradeDiscount + ", itemTradeDiscountRupees="
				+ itemTradeDiscountRupees + ", itemTradeDiscountAmount="
				+ itemTradeDiscountAmount + ", itemTradeBaseAmount="
				+ itemTradeBaseAmount + ", gst=" + gst + ", igst=" + igst
				+ ", totalTaxAmount=" + totalTaxAmount + ", totalAmount="
				+ totalAmount + ", itemPurchaseFactorUom1="
				+ itemPurchaseFactorUom1 + ", itemPurchaseFactorUom2="
				+ itemPurchaseFactorUom2 + ", itemPurchaseFactorUom3="
				+ itemPurchaseFactorUom3 + ", itemPurchaseFactorUom4="
				+ itemPurchaseFactorUom4 + ", itemActualQuantity="
				+ itemActualQuantity + ", batchNo=" + batchNo
				+ ", manufacDate=" + manufacDate + ", expiryDate=" + expiryDate
				+ ", lstOpeningStockItemSlaveDto="
				+ lstOpeningStockItemSlaveDto + ", batchId=" + batchId
				+ ", batchMasterDto=" + batchMasterDto + ", getId()=" + getId()
				+ ", getCreatedDateTime()=" + getCreatedDateTime()
				+ ", getUpdatedDateTime()=" + getUpdatedDateTime()
				+ ", getUserId()=" + getUserId() + ", getCreatedBy()="
				+ getCreatedBy() + ", getUserName()=" + getUserName()
				+ ", getDeleted_by()=" + getDeleted_by() + ", getDeleted()="
				+ getDeleted() + ", getDeletedDate()=" + getDeletedDate()
				+ ", getUomUnitLatestFactorName()="
				+ getUomUnitLatestFactorName() + ", getUomUnitFactorOneName()="
				+ getUomUnitFactorOneName() + ", getUomUnitFactorTwoName()="
				+ getUomUnitFactorTwoName() + ", getUomUnitFactorThreeName()="
				+ getUomUnitFactorThreeName() + ", getUomUnitFactorFourName()="
				+ getUomUnitFactorFourName() + ", getItemReagentStatus()="
				+ getItemReagentStatus() + ", getUnitId()=" + getUnitId()
				+ ", getItem_master_id()=" + getItem_master_id()
				+ ", getItemName()=" + getItemName() + ", getItemQuantity()="
				+ getItemQuantity() + ", getItemUnitPrice()="
				+ getItemUnitPrice() + ", getItemTradeDiscount()="
				+ getItemTradeDiscount() + ", getItemTradeDiscountRupees()="
				+ getItemTradeDiscountRupees()
				+ ", getItemTradeDiscountAmount()="
				+ getItemTradeDiscountAmount() + ", getItemTradeBaseAmount()="
				+ getItemTradeBaseAmount() + ", getGst()=" + getGst()
				+ ", getIgst()=" + getIgst() + ", getTotalTaxAmount()="
				+ getTotalTaxAmount() + ", getTotalAmount()="
				+ getTotalAmount() + ", getItemPurchaseFactorUom1()="
				+ getItemPurchaseFactorUom1()
				+ ", getItemPurchaseFactorUom2()="
				+ getItemPurchaseFactorUom2()
				+ ", getItemPurchaseFactorUom3()="
				+ getItemPurchaseFactorUom3()
				+ ", getItemPurchaseFactorUom4()="
				+ getItemPurchaseFactorUom4() + ", getItemActualQuantity()="
				+ getItemActualQuantity() + ", getBatchNo()=" + getBatchNo()
				+ ", getManufacDate()=" + getManufacDate()
				+ ", getExpiryDate()=" + getExpiryDate() + ", getBatchId()="
				+ getBatchId() + ", getLstOpeningStockItemSlaveDto()="
				+ getLstOpeningStockItemSlaveDto() + ", getBatchMasterDto()="
				+ getBatchMasterDto() + ", getClass()=" + getClass()
				+ ", hashCode()=" + hashCode() + ", toString()="
				+ super.toString() + "]";
	}
	
	
	
}
