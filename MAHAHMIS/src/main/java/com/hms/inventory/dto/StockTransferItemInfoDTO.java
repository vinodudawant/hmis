package com.hms.inventory.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="inv_stock_transper_item_info")
public class StockTransferItemInfoDTO {
	@Id
	@GeneratedValue
	@Column(name = "item_info_id")
	private Integer itemInfoId;

	@Column(name = "item_name")
	private String itemName;
	
	@Column(name = "item_master_id")
	private Integer itemMasterId=0;
	
	@Column(name = "item_batch_id")
	private Integer itemBatchId=0;
	
	
	@Column(name = "item_batch_name")
	private String batchName="NA";
	
	@Column(name = "item_expiray_date")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date itemExpirayDate;
	
	@Column(name = "item_avilable_qty")
	private Integer itemAvailableQty=0;
	
	
	@Column(name = "item_transper_qty")
	private Integer itemTransperQty=0;
	
	@Column(name = "item_transper_request_qty")
	private Integer itemTransperreqQty=0;
	

	@Column(name = "item_issue_qty")
	private Integer itemIssueQty=0;
	
	@Column(name = "item_remain_qty")
	private Integer itemRemainQty=0;
	
	@Column(name = "item_Receive_qty")
	private Integer itemReceiveQty=0;
	

	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	

	@Column(name = "stock_received_by", updatable = false)
	private Integer stockReceivedBy;


	
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;
	
	@Column(name = "stock_receive_date_time", updatable = false)
	private Date stockReceiveDateTime;


	
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";


	@Column(name = "deleted_by")
	private Integer deletedBy;

	
	@Column(name = "delete_date_time")
	private String deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;	
	
	
	@Column(name = "send_subinventory_id")//added by dayanand for adding requesting subinventory id in receiving subinventory 
	private Integer sendSubinventoryId=0;
	
	@Column(name = "send_subinventory_name")//added by dayanand for adding requesting subinventory name in receiving subinventory 
	private String sendSubinventoryName;
	
	@Column(name = "subinventory_id")
	private Integer stockSubinventoryId;
	
	@Column(name = "subinventory_name")
	private String stockSubinventoryName;
	
	@Column(name = "mrn_item_slave_id")//added by dayanand for updating value in MrnItemSlaveInfo after transper qty 
	private Integer mrnitemSalveId=0;
	
	
	@Column(name = "item_receive_qty_view")
	private Integer itemreceiveQtyForView=0;
	
	@Column(name = "item_pending_qty_view")
	private Integer itemPendingQtyForView=0;
	
	@Transient
	private List<StockTransferItemInfoDTO> lststocktrasiteminfo;

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

	public Integer getItemMasterId() {
		return itemMasterId;
	}

	public void setItemMasterId(Integer itemMasterId) {
		this.itemMasterId = itemMasterId;
	}

	public Integer getItemBatchId() {
		return itemBatchId;
	}

	public void setItemBatchId(Integer itemBatchId) {
		this.itemBatchId = itemBatchId;
	}

	public String getBatchName() {
		return batchName;
	}

	public void setBatchName(String batchName) {
		this.batchName = batchName;
	}

	public Date getItemExpirayDate() {
		return itemExpirayDate;
	}

	public void setItemExpirayDate(Date itemExpirayDate) {
		this.itemExpirayDate = itemExpirayDate;
	}

	public Integer getItemAvailableQty() {
		return itemAvailableQty;
	}

	public void setItemAvailableQty(Integer itemAvailableQty) {
		this.itemAvailableQty = itemAvailableQty;
	}

	public Integer getItemTransperQty() {
		return itemTransperQty;
	}

	public void setItemTransperQty(Integer itemTransperQty) {
		this.itemTransperQty = itemTransperQty;
	}

	public Integer getItemTransperreqQty() {
		return itemTransperreqQty;
	}

	public void setItemTransperreqQty(Integer itemTransperreqQty) {
		this.itemTransperreqQty = itemTransperreqQty;
	}

	public Integer getItemIssueQty() {
		return itemIssueQty;
	}

	public void setItemIssueQty(Integer itemIssueQty) {
		this.itemIssueQty = itemIssueQty;
	}

	public Integer getItemRemainQty() {
		return itemRemainQty;
	}

	public void setItemRemainQty(Integer itemRemainQty) {
		this.itemRemainQty = itemRemainQty;
	}

	public Integer getItemReceiveQty() {
		return itemReceiveQty;
	}

	public void setItemReceiveQty(Integer itemReceiveQty) {
		this.itemReceiveQty = itemReceiveQty;
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

	public Integer getStockReceivedBy() {
		return stockReceivedBy;
	}

	public void setStockReceivedBy(Integer stockReceivedBy) {
		this.stockReceivedBy = stockReceivedBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getStockReceiveDateTime() {
		return stockReceiveDateTime;
	}

	public void setStockReceiveDateTime(Date stockReceiveDateTime) {
		this.stockReceiveDateTime = stockReceiveDateTime;
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

	public String getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(String deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Integer getSendSubinventoryId() {
		return sendSubinventoryId;
	}

	public void setSendSubinventoryId(Integer sendSubinventoryId) {
		this.sendSubinventoryId = sendSubinventoryId;
	}

	public String getSendSubinventoryName() {
		return sendSubinventoryName;
	}

	public void setSendSubinventoryName(String sendSubinventoryName) {
		this.sendSubinventoryName = sendSubinventoryName;
	}

	public Integer getStockSubinventoryId() {
		return stockSubinventoryId;
	}

	public void setStockSubinventoryId(Integer stockSubinventoryId) {
		this.stockSubinventoryId = stockSubinventoryId;
	}

	public String getStockSubinventoryName() {
		return stockSubinventoryName;
	}

	public void setStockSubinventoryName(String stockSubinventoryName) {
		this.stockSubinventoryName = stockSubinventoryName;
	}

	public Integer getMrnitemSalveId() {
		return mrnitemSalveId;
	}

	public void setMrnitemSalveId(Integer mrnitemSalveId) {
		this.mrnitemSalveId = mrnitemSalveId;
	}

	public Integer getItemreceiveQtyForView() {
		return itemreceiveQtyForView;
	}

	public void setItemreceiveQtyForView(Integer itemreceiveQtyForView) {
		this.itemreceiveQtyForView = itemreceiveQtyForView;
	}

	public Integer getItemPendingQtyForView() {
		return itemPendingQtyForView;
	}

	public void setItemPendingQtyForView(Integer itemPendingQtyForView) {
		this.itemPendingQtyForView = itemPendingQtyForView;
	}

	public List<StockTransferItemInfoDTO> getLststocktrasiteminfo() {
		return lststocktrasiteminfo;
	}

	public void setLststocktrasiteminfo(
			List<StockTransferItemInfoDTO> lststocktrasiteminfo) {
		this.lststocktrasiteminfo = lststocktrasiteminfo;
	}

	
	
	

	
	

}
