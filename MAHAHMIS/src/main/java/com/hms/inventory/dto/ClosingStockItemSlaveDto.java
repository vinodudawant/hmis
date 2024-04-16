package com.hms.inventory.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.map.annotate.JsonDeserialize;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="inv_closing_stock_item_slave")
@JsonDeserialize(as = ClosingStockItemSlaveDto.class)
public class ClosingStockItemSlaveDto {
	
	@Id	
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "item_id")
	private Integer itemId;
	
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp	
	@Column(name="created_date_time" ,updatable = false)
	private Date createdDateTime;
	
	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	@Column(name="updated_date_time")
	private Date updatedDateTime;
	
	@Column(name="user_id")
	private Integer userId;
	
	@Column(name="user_name")
	private String userName;
	
	@Column(name="created_by",updatable = false)
	private Integer createdBy;
	
	@Column(name="updated_by")
	private Integer updatedBy;
	
	@Column(name="deleted_by")
	private Integer deleted_by;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@Column(name = "item_name",columnDefinition="varchar(255) default 'N'")
	private String itemName="N";
	
	@Column(name = "item_batch_code",columnDefinition="varchar(255) default 'N'")
	private String itemBatchCode="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="closing_stock_date")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date itemExpiryDate;
	
	@Column(name="item_current_stock",columnDefinition="int(11) default 0")
	private Integer itemCurrentStock=0;
	
	@Column(name="item_deduct_stock",columnDefinition="int(11) default 0")
	private Integer itemdeductStock=0;
	
	
	@Column(name = "item_narration",length=1000000)
	private String itemNarration="N";
	
	
	@Column(name="item_master_id",columnDefinition="int(11) default 0")
	private Integer itemdMasterId=0;
	
	@Transient
	private List<ClosingStockItemSlaveDto> lstclosingstockitemslave;

	public Integer getItemId() {
		return itemId;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
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

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
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

	public Integer getDeleted_by() {
		return deleted_by;
	}

	public void setDeleted_by(Integer deleted_by) {
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

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemBatchCode() {
		return itemBatchCode;
	}

	public void setItemBatchCode(String itemBatchCode) {
		this.itemBatchCode = itemBatchCode;
	}

	public Date getItemExpiryDate() {
		return itemExpiryDate;
	}

	public void setItemExpiryDate(Date itemExpiryDate) {
		this.itemExpiryDate = itemExpiryDate;
	}

	public Integer getItemCurrentStock() {
		return itemCurrentStock;
	}

	public void setItemCurrentStock(Integer itemCurrentStock) {
		this.itemCurrentStock = itemCurrentStock;
	}

	public Integer getItemdeductStock() {
		return itemdeductStock;
	}

	public void setItemdeductStock(Integer itemdeductStock) {
		this.itemdeductStock = itemdeductStock;
	}

	public String getItemNarration() {
		return itemNarration;
	}

	public void setItemNarration(String itemNarration) {
		this.itemNarration = itemNarration;
	}

	public Integer getItemdMasterId() {
		return itemdMasterId;
	}

	public void setItemdMasterId(Integer itemdMasterId) {
		this.itemdMasterId = itemdMasterId;
	}

	public List<ClosingStockItemSlaveDto> getLstclosingstockitemslave() {
		return lstclosingstockitemslave;
	}

	public void setLstclosingstockitemslave(
			List<ClosingStockItemSlaveDto> lstclosingstockitemslave) {
		this.lstclosingstockitemslave = lstclosingstockitemslave;
	}

	@Override
	public String toString() {
		return "ClosingStockItemSlaveDto [itemId=" + itemId
				+ ", createdDateTime=" + createdDateTime + ", updatedDateTime="
				+ updatedDateTime + ", userId=" + userId + ", userName="
				+ userName + ", createdBy=" + createdBy + ", updatedBy="
				+ updatedBy + ", deleted_by=" + deleted_by + ", deleted="
				+ deleted + ", deletedDate=" + deletedDate + ", unitId="
				+ unitId + ", itemName=" + itemName + ", itemBatchCode="
				+ itemBatchCode + ", itemExpiryDate=" + itemExpiryDate
				+ ", itemCurrentStock=" + itemCurrentStock
				+ ", itemdeductStock=" + itemdeductStock + ", itemNarration="
				+ itemNarration + ", itemdMasterId=" + itemdMasterId
				+ ", lstclosingstockitemslave=" + lstclosingstockitemslave
				+ "]";
	}

	


	
	
	
	

}
