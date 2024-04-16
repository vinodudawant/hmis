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
@Table(name="inv_goods_issue_mrn_item_slave_new")
@Component
public class GoodsIssueMrnItemSlaveDto {

	
		@Id
		@GeneratedValue
		@Column(name = "id")
		private Integer id;
		
		//item master id
		@Column(name = "mrn_item_slave_id")
		private Integer mrnItemSlaveId;
		
		//item master id
		@Column(name = "item_master_id")
		private Integer itemMasterId;
		
		@Column(name = "item_name")
		private String itemName;
		
		@Column(name = "created_by", updatable = false)
		private Integer createdBy;

		//default value set by rohit to '0' for differente the status of PartiallyReceived and PartiallyReceivedQty
		//if PartiallyReceivedQty and updated by 1 then quantity issued in subinventory tab.. so on UI disabled accept button 
		@Column(name = "updated_by",columnDefinition="int(11) default 0")
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

		//item unit
		@Column(name = "item_uom")
		private String itemUom;
		
		//item issue quantity
		@Column(name = "item_issue_qty",columnDefinition="int(11) default 0")
		private Integer itemIssueQty;
		
		//item canceled quantity by Vishnu
		@Column(name = "item_canceled_qty",columnDefinition="int(11) default 0")
		private Integer itemCanceledQty;
		
		@Column(name = "mrn_received_date")
		private String mrnReceivedDate;
		
		@Column(name = "sub_inventory_id")
		private Integer subInventoryId;
		
		@Column(name = "mrn_quantity")
		private Integer mrnQuantity;
		
		@Column(name = "sub_inventory_name")
		private String subinventoryName;
		
		@Column(name = "mrn_status")
		private String mrnStatus;	
		
		//to save the current subinventory stock value - By Rohit
		@Column(name = "current_subinventory_stock",columnDefinition="int(11) default 0")
		private Integer currentSubInventoryStock;
		
		//to save the current item quantity - By Rohit
		@Column(name = "item_quantity",columnDefinition="int(11) default 0")
		private Integer itemQuantity=0;
		
		//pending request item quantity
		@Column(name = "pending_request_item_quantity",columnDefinition="int(11) default 0")
		private Integer pendingRequestItemQuantity=0;
		
		//requested item quantity
		@Column(name = "requested_item_quantity",columnDefinition="int(11) default 0")
		private Integer requestedItemQuantity=0;
		
		//added to maintain item batch code after MRN Goods issue
		@Column(name = "item_batch_code")
		private String itemBatchCode;

		//added to maintain item batch exp date after MRN Goods issue
		@Column(name = "item_batch_exp_date")
		private String itemBatchExpDate;
		
		@Column(name="current_inv_stock")
		private Integer currentInvStock;
		
		//mrn sub remark
		@Column(name = "goods_issue_sub_remark")
		private String goodsIssueSubRemark;
		
		//added by rohit on 10-11-2020
		//to store mrn master id in goods issue item slave
		@Column(name="mrn_id_goods_issue_slave")
		private Integer mrnIdGoodsIssueSlave;
		
		//added by Rohit on 29-10-2020
		@Transient
		private BigDecimal currentSubInventoryStockUpdated;
		
		@Transient
		private String uomUnitName;
		
		@Transient
		private List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos;
		
		@Transient
		private Integer noOfPages;
		
		//added by Rohit on 30-10-2020
		@Transient
		private Integer returnQuantity;
		
		//added by rohit on 04-02-2021
		//to map and generate the mrn issue report using batch master id
		@Column(name="batch_master_id")
		private Integer batchMasterId;

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public Integer getMrnItemSlaveId() {
			return mrnItemSlaveId;
		}

		public void setMrnItemSlaveId(Integer mrnItemSlaveId) {
			this.mrnItemSlaveId = mrnItemSlaveId;
		}

		public Integer getItemMasterId() {
			return itemMasterId;
		}

		public void setItemMasterId(Integer itemMasterId) {
			this.itemMasterId = itemMasterId;
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

		public String getItemUom() {
			return itemUom;
		}

		public void setItemUom(String itemUom) {
			this.itemUom = itemUom;
		}

		public Integer getItemIssueQty() {
			return itemIssueQty;
		}

		public void setItemIssueQty(Integer itemIssueQty) {
			this.itemIssueQty = itemIssueQty;
		}

		public String getMrnReceivedDate() {
			return mrnReceivedDate;
		}

		public void setMrnReceivedDate(String mrnReceivedDate) {
			this.mrnReceivedDate = mrnReceivedDate;
		}

		public Integer getSubInventoryId() {
			return subInventoryId;
		}

		public void setSubInventoryId(Integer subInventoryId) {
			this.subInventoryId = subInventoryId;
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

		public Integer getItemCanceledQty() {
			return itemCanceledQty;
		}

		public void setItemCanceledQty(Integer itemCanceledQty) {
			this.itemCanceledQty = itemCanceledQty;
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

		public Integer getCurrentInvStock() {
			return currentInvStock;
		}

		public void setCurrentInvStock(Integer currentInvStock) {
			this.currentInvStock = currentInvStock;
		}

		public List<GoodsIssueMrnItemSlaveDto> getGoodsIssueMrnItemSlaveDtos() {
			return goodsIssueMrnItemSlaveDtos;
		}

		public void setGoodsIssueMrnItemSlaveDtos(
				List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos) {
			this.goodsIssueMrnItemSlaveDtos = goodsIssueMrnItemSlaveDtos;
		}

		public Integer getMrnQuantity() {
			return mrnQuantity;
		}

		public void setMrnQuantity(Integer mrnQuantity) {
			this.mrnQuantity = mrnQuantity;
		}

		public String getUomUnitName() {
			return uomUnitName;
		}

		public void setUomUnitName(String uomUnitName) {
			this.uomUnitName = uomUnitName;
		}

		public String getGoodsIssueSubRemark() {
			return goodsIssueSubRemark;
		}

		public void setGoodsIssueSubRemark(String goodsIssueSubRemark) {
			this.goodsIssueSubRemark = goodsIssueSubRemark;
		}

		public BigDecimal getCurrentSubInventoryStockUpdated() {
			return currentSubInventoryStockUpdated;
		}

		public void setCurrentSubInventoryStockUpdated(
				BigDecimal currentSubInventoryStockUpdated) {
			this.currentSubInventoryStockUpdated = currentSubInventoryStockUpdated;
		}

		public Integer getNoOfPages() {
			return noOfPages;
		}

		public void setNoOfPages(Integer noOfPages) {
			this.noOfPages = noOfPages;
		}

		public Integer getReturnQuantity() {
			return returnQuantity;
		}

		public void setReturnQuantity(Integer returnQuantity) {
			this.returnQuantity = returnQuantity;
		}

		public Integer getMrnIdGoodsIssueSlave() {
			return mrnIdGoodsIssueSlave;
		}

		public void setMrnIdGoodsIssueSlave(Integer mrnIdGoodsIssueSlave) {
			this.mrnIdGoodsIssueSlave = mrnIdGoodsIssueSlave;
		}

		public Integer getBatchMasterId() {
			return batchMasterId;
		}

		public void setBatchMasterId(Integer batchMasterId) {
			this.batchMasterId = batchMasterId;
		}

		@Override
		public String toString() {
			return "GoodsIssueMrnItemSlaveDto [id=" + id + ", mrnItemSlaveId="
					+ mrnItemSlaveId + ", itemMasterId=" + itemMasterId
					+ ", itemName=" + itemName + ", createdBy=" + createdBy
					+ ", updatedBy=" + updatedBy + ", createdDate="
					+ createdDate + ", updatedDate=" + updatedDate
					+ ", deleted=" + deleted + ", deletedBy=" + deletedBy
					+ ", deletedDate=" + deletedDate + ", unitId=" + unitId
					+ ", itemUom=" + itemUom + ", itemIssueQty=" + itemIssueQty
					+ ", itemCanceledQty=" + itemCanceledQty
					+ ", mrnReceivedDate=" + mrnReceivedDate
					+ ", subInventoryId=" + subInventoryId + ", mrnQuantity="
					+ mrnQuantity + ", subinventoryName=" + subinventoryName
					+ ", mrnStatus=" + mrnStatus
					+ ", currentSubInventoryStock=" + currentSubInventoryStock
					+ ", itemQuantity=" + itemQuantity
					+ ", pendingRequestItemQuantity="
					+ pendingRequestItemQuantity + ", requestedItemQuantity="
					+ requestedItemQuantity + ", itemBatchCode="
					+ itemBatchCode + ", itemBatchExpDate=" + itemBatchExpDate
					+ ", currentInvStock=" + currentInvStock
					+ ", goodsIssueSubRemark=" + goodsIssueSubRemark
					+ ", mrnIdGoodsIssueSlave=" + mrnIdGoodsIssueSlave
					+ ", currentSubInventoryStockUpdated="
					+ currentSubInventoryStockUpdated + ", uomUnitName="
					+ uomUnitName + ", goodsIssueMrnItemSlaveDtos="
					+ goodsIssueMrnItemSlaveDtos + ", noOfPages=" + noOfPages
					+ ", returnQuantity=" + returnQuantity + ", batchMasterId="
					+ batchMasterId + "]";
		}

		
		
		
	
}
