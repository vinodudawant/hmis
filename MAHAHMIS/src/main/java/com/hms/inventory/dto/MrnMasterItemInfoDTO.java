package com.hms.inventory.dto;


import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;
@Entity
@Table(name="inv_mrn_item_info_slave_new")
@Component
public class MrnMasterItemInfoDTO {
	
	@Id
	@GeneratedValue
	//id
	@Column(name = "item_info_id")
	private Integer itemInfoId;
	
	//item name
	@Column(name = "item_name")
	private String itemName;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";


	@Column(name = "deleted_by")
	private Integer deletedBy;

	
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;	
	
	//item master id
	@Column(name = "item_master_id")
	private Integer itemMasterId;
	
	@Column(name = "item_actual_qty",columnDefinition="int(11) default 0")
	private Integer itemactualQty=0;
	
	@Column(name = "item_reviewed_qty",columnDefinition="int(11) default 0")
	private Integer itemreviewedQty=0;
	
	@Column(name = "item_purchase_qty",columnDefinition="int(11) default 0")
	private Integer itemPurchaseQty=0;
	
	
	@Column(name = "item_last_po_qty",columnDefinition="int(11) default 0")
	private Integer itemlastpoQty=0;
	

	@Column(name = "item_last_po_number",columnDefinition="int(11) default 0")
	private Integer itemlastpoNumber=0;
	
	@Column(name = "item_last_grn_number",columnDefinition="int(11) default 0")
	private Integer itemlastgrnNumber=0;
	
	@Column(name = "item_last_consumption",columnDefinition="int(11) default 0")
	private Integer itemlastConsumption=0;
	
	//item unit
	@Column(name = "item_uom")
	private String itemUom;
	
	@Column(name = "item_status",columnDefinition="varchar(2) default 'N'")
	private String itemStatus="N";
	
	@Column(name = "item_po_status",columnDefinition="varchar(2) default 'N'")
	private String itemPoStatus="N";
	
	@Column(name = "item_po_qty",columnDefinition="int(11) default 0")
	private Integer itemPoQty=0;
	
	
	@Column(name = "item_sto_status",columnDefinition="varchar(2) default 'N'")
	private String itemStoStatus="N";
	
	
	@Column(name = "item_sto_qty",columnDefinition="int(11) default 0")
	private Integer itemStoQty=0;
	
	@Column(name = "item_center_name")
	private String itemCenterName;
	
	@Column(name = "item_available_qty",columnDefinition="int(11) default 0")
	private Integer itemAvailableQty=0;
	
	@Column(name = "item_doc_qty",columnDefinition="int(11) default 0")
	private Integer itemDocQty=0;	
		
	//item issue quantity
	@Column(name = "item_issue_qty",columnDefinition="int(11) default 0")
	private BigDecimal itemIssueQty;
	
	//item canceled quantity by Vishnu
	@Column(name = "item_canceled_qty",columnDefinition="int(11) default 0")
	private Integer itemCanceledQty;
	
	@Column(name = "mrn_received_date")
	private String mrnReceivedDate;
	
	@Column(name = "mrn_sub_inv_consumtion_qty",columnDefinition="int(11) default 0")
	private Integer mrnSubInvConsumtionQty=0;
	
	@Column(name = "mrn_sub_inv_consumtion_date")
	private String mrnSubInvConsumtionDate;
	
	@Column(name = "mrn_fixed_issue_qty")
	private String mrnFixedIssueQty;
	
	@Column(name = "sub_inventory_id")
	private Integer sunInventoryId;
	
	@Column(name = "sub_inventory_name")
	private String subinventoryName;
	
	@Column(name = "mrn_status")
	private String mrnStatus;	
	
	@Column(name = "item_proccesd_qty",columnDefinition="int(11) default 0")
	private Integer itemproccesdQty=0;
	
	@Column(name = "item_current_pen_qty",columnDefinition="int(11) default 0")
	private Integer itemCurrentPenQty=0;
	
	@Column(name = "item_prev_pen_qty",columnDefinition="int(11) default 0")
	private Integer itemPrevPenQty=0;
	
	@Column(name = "mrn_quantity",columnDefinition="int(11) default 0")
	private Integer mrnQuantity=0;
	
	//to save the current subinventory stock value - By Rohit
	@Column(name = "current_subinventory_stock",columnDefinition="int(11) default 0")
	private Integer currentSubInventoryStock;
	
	//to save the current item quantity - By Rohit
	@Column(name = "item_quantity",columnDefinition="int(11) default 0")
	private Integer itemQuantity=0;
	
	//pending request item quantity
	@Column(name = "pending_request_item_quantity",columnDefinition="int(11) default 0")
	private Integer pendingRequestItemQuantity=0;
	
	//mrn sub remark
	@Column(name = "mrn_sub_remark")
	private String mrnSubRemark;

	@Column(name = "item_recieved_qty")
	private Integer itemRecievedQuantity;
	
	//requested item quantity
	@Column(name = "requested_item_quantity",columnDefinition="int(11) default 0")
	private Integer requestedItemQuantity=0;
	
	//added to maintain item batch code after MRN Goods issue
	@Column(name = "item_batch_code")
	private String itemBatchCode;

	//added to maintain item batch exp date after MRN Goods issue
	@Column(name = "item_batch_exp_date")
	private String itemBatchExpDate;
	
	//main inventory stock
	//added by Rohit on 12-02-2021
	@Column(name = "main_inventory_stock",columnDefinition="int(11) default 0")
	private Integer mainInventoryStock=0;
	
	@Transient
	private List<MrnMasterItemInfoDTO> lstMrniteminfo;
	
	@Transient
	private String unitName;

	@Transient
	private Integer item_issue_qty;
	
	public Integer getItemRecievedQuantity() {
		return itemRecievedQuantity;
	}

	public void setItemRecievedQuantity(Integer itemRecievedQuantity) {
		this.itemRecievedQuantity = itemRecievedQuantity;
	}
	
	public Integer getItemInfoId() {
		return itemInfoId;
	}

	public void setItemInfoId(Integer itemInfoId) {
		this.itemInfoId = itemInfoId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
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

	public Integer getItemMasterId() {
		return itemMasterId;
	}

	public void setItemMasterId(Integer itemMasterId) {
		this.itemMasterId = itemMasterId;
	}

	public Integer getItemactualQty() {
		return itemactualQty;
	}

	public void setItemactualQty(Integer itemactualQty) {
		this.itemactualQty = itemactualQty;
	}

	public Integer getItemreviewedQty() {
		return itemreviewedQty;
	}

	public void setItemreviewedQty(Integer itemreviewedQty) {
		this.itemreviewedQty = itemreviewedQty;
	}

	public Integer getItemPurchaseQty() {
		return itemPurchaseQty;
	}

	public void setItemPurchaseQty(Integer itemPurchaseQty) {
		this.itemPurchaseQty = itemPurchaseQty;
	}

	public Integer getItemlastpoQty() {
		return itemlastpoQty;
	}

	public void setItemlastpoQty(Integer itemlastpoQty) {
		this.itemlastpoQty = itemlastpoQty;
	}

	public Integer getItemlastpoNumber() {
		return itemlastpoNumber;
	}

	public void setItemlastpoNumber(Integer itemlastpoNumber) {
		this.itemlastpoNumber = itemlastpoNumber;
	}

	public Integer getItemlastgrnNumber() {
		return itemlastgrnNumber;
	}

	public void setItemlastgrnNumber(Integer itemlastgrnNumber) {
		this.itemlastgrnNumber = itemlastgrnNumber;
	}

	public Integer getItemlastConsumption() {
		return itemlastConsumption;
	}

	public void setItemlastConsumption(Integer itemlastConsumption) {
		this.itemlastConsumption = itemlastConsumption;
	}

	public String getItemUom() {
		return itemUom;
	}

	public void setItemUom(String itemUom) {
		this.itemUom = itemUom;
	}

	public String getItemStatus() {
		return itemStatus;
	}

	public void setItemStatus(String itemStatus) {
		this.itemStatus = itemStatus;
	}

	public String getItemPoStatus() {
		return itemPoStatus;
	}

	public void setItemPoStatus(String itemPoStatus) {
		this.itemPoStatus = itemPoStatus;
	}

	public Integer getItemPoQty() {
		return itemPoQty;
	}

	public void setItemPoQty(Integer itemPoQty) {
		this.itemPoQty = itemPoQty;
	}

	public String getItemStoStatus() {
		return itemStoStatus;
	}

	public void setItemStoStatus(String itemStoStatus) {
		this.itemStoStatus = itemStoStatus;
	}

	public Integer getItemStoQty() {
		return itemStoQty;
	}

	public void setItemStoQty(Integer itemStoQty) {
		this.itemStoQty = itemStoQty;
	}

	public String getItemCenterName() {
		return itemCenterName;
	}

	public void setItemCenterName(String itemCenterName) {
		this.itemCenterName = itemCenterName;
	}

	public Integer getItemAvailableQty() {
		return itemAvailableQty;
	}

	public void setItemAvailableQty(Integer itemAvailableQty) {
		this.itemAvailableQty = itemAvailableQty;
	}

	public Integer getItemDocQty() {
		return itemDocQty;
	}

	public void setItemDocQty(Integer itemDocQty) {
		this.itemDocQty = itemDocQty;
	}

	public BigDecimal getItemIssueQty() {
		return itemIssueQty;
	}

	public void setItemIssueQty(BigDecimal itemIssueQty) {
		this.itemIssueQty = itemIssueQty;
	}

	public Integer getItemCanceledQty() {
		return itemCanceledQty;
	}

	public void setItemCanceledQty(Integer itemCanceledQty) {
		this.itemCanceledQty = itemCanceledQty;
	}

	public String getMrnReceivedDate() {
		return mrnReceivedDate;
	}

	public void setMrnReceivedDate(String mrnReceivedDate) {
		this.mrnReceivedDate = mrnReceivedDate;
	}

	public Integer getMrnSubInvConsumtionQty() {
		return mrnSubInvConsumtionQty;
	}

	public void setMrnSubInvConsumtionQty(Integer mrnSubInvConsumtionQty) {
		this.mrnSubInvConsumtionQty = mrnSubInvConsumtionQty;
	}

	public String getMrnSubInvConsumtionDate() {
		return mrnSubInvConsumtionDate;
	}

	public void setMrnSubInvConsumtionDate(String mrnSubInvConsumtionDate) {
		this.mrnSubInvConsumtionDate = mrnSubInvConsumtionDate;
	}

	public String getMrnFixedIssueQty() {
		return mrnFixedIssueQty;
	}

	public void setMrnFixedIssueQty(String mrnFixedIssueQty) {
		this.mrnFixedIssueQty = mrnFixedIssueQty;
	}

	public Integer getSunInventoryId() {
		return sunInventoryId;
	}

	public void setSunInventoryId(Integer sunInventoryId) {
		this.sunInventoryId = sunInventoryId;
	}

	public String getSubinventoryName() {
		return subinventoryName;
	}

	public void setSubinventoryName(String subinventoryName) {
		this.subinventoryName = subinventoryName;
	}

	public String getMrnStatus() {
		return mrnStatus;
	}

	public void setMrnStatus(String mrnStatus) {
		this.mrnStatus = mrnStatus;
	}

	public Integer getItemproccesdQty() {
		return itemproccesdQty;
	}

	public void setItemproccesdQty(Integer itemproccesdQty) {
		this.itemproccesdQty = itemproccesdQty;
	}

	public Integer getItemCurrentPenQty() {
		return itemCurrentPenQty;
	}

	public void setItemCurrentPenQty(Integer itemCurrentPenQty) {
		this.itemCurrentPenQty = itemCurrentPenQty;
	}

	public Integer getItemPrevPenQty() {
		return itemPrevPenQty;
	}

	public void setItemPrevPenQty(Integer itemPrevPenQty) {
		this.itemPrevPenQty = itemPrevPenQty;
	}

	public Integer getMrnQuantity() {
		return mrnQuantity;
	}

	public void setMrnQuantity(Integer mrnQuantity) {
		this.mrnQuantity = mrnQuantity;
	}

	public Integer getCurrentSubInventoryStock() {
		return currentSubInventoryStock;
	}

	public void setCurrentSubInventoryStock(Integer currentSubInventoryStock) {
		this.currentSubInventoryStock = currentSubInventoryStock;
	}

	public Integer getItemQuantity() {
		return itemQuantity;
	}

	public void setItemQuantity(Integer itemQuantity) {
		this.itemQuantity = itemQuantity;
	}

	public Integer getPendingRequestItemQuantity() {
		return pendingRequestItemQuantity;
	}

	public void setPendingRequestItemQuantity(Integer pendingRequestItemQuantity) {
		this.pendingRequestItemQuantity = pendingRequestItemQuantity;
	}

	public Integer getRequestedItemQuantity() {
		return requestedItemQuantity;
	}

	public void setRequestedItemQuantity(Integer requestedItemQuantity) {
		this.requestedItemQuantity = requestedItemQuantity;
	}

	public List<MrnMasterItemInfoDTO> getLstMrniteminfo() {
		return lstMrniteminfo;
	}

	public void setLstMrniteminfo(List<MrnMasterItemInfoDTO> lstMrniteminfo) {
		this.lstMrniteminfo = lstMrniteminfo;
	}

	public String getItemBatchCode() {
		return itemBatchCode;
	}

	public void setItemBatchCode(String itemBatchCode) {
		this.itemBatchCode = itemBatchCode;
	}

	public String getItemBatchExpDate() {
		return itemBatchExpDate;
	}

	public void setItemBatchExpDate(String itemBatchExpDate) {
		this.itemBatchExpDate = itemBatchExpDate;
	}

	public Integer getItem_issue_qty() {
		return item_issue_qty;
	}

	public void setItem_issue_qty(Integer item_issue_qty) {
		this.item_issue_qty = item_issue_qty;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public String getMrnSubRemark() {
		return mrnSubRemark;
	}

	public void setMrnSubRemark(String mrnSubRemark) {
		this.mrnSubRemark = mrnSubRemark;
	}

	public Integer getMainInventoryStock() {
		return mainInventoryStock;
	}

	public void setMainInventoryStock(Integer mainInventoryStock) {
		this.mainInventoryStock = mainInventoryStock;
	}

	@Override
	public String toString() {
		return "MrnMasterItemInfoDTO [itemInfoId=" + itemInfoId + ", itemName="
				+ itemName + ", createdBy=" + createdBy + ", updatedBy="
				+ updatedBy + ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deleted=" + deleted + ", deletedBy="
				+ deletedBy + ", deletedDate=" + deletedDate + ", unitId="
				+ unitId + ", itemMasterId=" + itemMasterId
				+ ", itemactualQty=" + itemactualQty + ", itemreviewedQty="
				+ itemreviewedQty + ", itemPurchaseQty=" + itemPurchaseQty
				+ ", itemlastpoQty=" + itemlastpoQty + ", itemlastpoNumber="
				+ itemlastpoNumber + ", itemlastgrnNumber=" + itemlastgrnNumber
				+ ", itemlastConsumption=" + itemlastConsumption + ", itemUom="
				+ itemUom + ", itemStatus=" + itemStatus + ", itemPoStatus="
				+ itemPoStatus + ", itemPoQty=" + itemPoQty
				+ ", itemStoStatus=" + itemStoStatus + ", itemStoQty="
				+ itemStoQty + ", itemCenterName=" + itemCenterName
				+ ", itemAvailableQty=" + itemAvailableQty + ", itemDocQty="
				+ itemDocQty + ", itemIssueQty=" + itemIssueQty
				+ ", itemCanceledQty=" + itemCanceledQty + ", mrnReceivedDate="
				+ mrnReceivedDate + ", mrnSubInvConsumtionQty="
				+ mrnSubInvConsumtionQty + ", mrnSubInvConsumtionDate="
				+ mrnSubInvConsumtionDate + ", mrnFixedIssueQty="
				+ mrnFixedIssueQty + ", sunInventoryId=" + sunInventoryId
				+ ", subinventoryName=" + subinventoryName + ", mrnStatus="
				+ mrnStatus + ", itemproccesdQty=" + itemproccesdQty
				+ ", itemCurrentPenQty=" + itemCurrentPenQty
				+ ", itemPrevPenQty=" + itemPrevPenQty + ", mrnQuantity="
				+ mrnQuantity + ", currentSubInventoryStock="
				+ currentSubInventoryStock + ", itemQuantity=" + itemQuantity
				+ ", pendingRequestItemQuantity=" + pendingRequestItemQuantity
				+ ", mrnSubRemark=" + mrnSubRemark + ", itemRecievedQuantity="
				+ itemRecievedQuantity + ", requestedItemQuantity="
				+ requestedItemQuantity + ", itemBatchCode=" + itemBatchCode
				+ ", itemBatchExpDate=" + itemBatchExpDate
				+ ", mainInventoryStock=" + mainInventoryStock
				+ ", lstMrniteminfo=" + lstMrniteminfo + ", unitName="
				+ unitName + ", item_issue_qty=" + item_issue_qty + "]";
	}

	
	
	
}