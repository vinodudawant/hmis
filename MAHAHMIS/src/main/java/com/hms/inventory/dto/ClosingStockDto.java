package com.hms.inventory.dto;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;



@Entity
@Component
@Table(name="inv_closing_stock_new")
public class ClosingStockDto {
	
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
	
	@Column(name="user_name")
	private String userName;
	
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
	
	@Column(name="closing_stock_date")
	private Date closingStockDate;
	
	@Transient
	private List<ClosingStockDto> lstclosingstockmaster;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)  
	@OneToMany(cascade = CascadeType.ALL)   
	@JoinColumn(name = "close_stock_id",nullable = false) 
	private List<ClosingStockItemSlaveDto> lstclosingstockitemslave;
	
	@Transient
	private Integer noOfPages;
	
	@Transient
	private String batchNumber;
	
	@Transient
	private Date batchExpDate;
	
	@Transient
	private Integer itemDeductQuantity;
	
	@Transient
	private String narration;
	
	@Transient
	private String itemName;
	
	public List<ClosingStockItemSlaveDto> getLstclosingstockitemslave() {
		return lstclosingstockitemslave;
	}

	public void setLstclosingstockitemslave(
			List<ClosingStockItemSlaveDto> lstclosingstockitemslave) {
		this.lstclosingstockitemslave = lstclosingstockitemslave;
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

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
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

	public Date getClosingStockDate() {
		return closingStockDate;
	}

	public void setClosingStockDate(Date closingStockDate) {
		this.closingStockDate = closingStockDate;
	}

	public List<ClosingStockDto> getLstclosingstockmaster() {
		return lstclosingstockmaster;
	}

	public void setLstclosingstockmaster(List<ClosingStockDto> lstclosingstockmaster) {
		this.lstclosingstockmaster = lstclosingstockmaster;
	}

	public Integer getNoOfPages() {
		return noOfPages;
	}

	public void setNoOfPages(Integer noOfPages) {
		this.noOfPages = noOfPages;
	}

	public String getBatchNumber() {
		return batchNumber;
	}

	public void setBatchNumber(String batchNumber) {
		this.batchNumber = batchNumber;
	}

	public Date getBatchExpDate() {
		return batchExpDate;
	}

	public void setBatchExpDate(Date batchExpDate) {
		this.batchExpDate = batchExpDate;
	}

	public Integer getItemDeductQuantity() {
		return itemDeductQuantity;
	}

	public void setItemDeductQuantity(Integer itemDeductQuantity) {
		this.itemDeductQuantity = itemDeductQuantity;
	}

	public String getNarration() {
		return narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	@Override
	public String toString() {
		return "ClosingStockDto [id=" + id + ", createdDateTime="
				+ createdDateTime + ", updatedDateTime=" + updatedDateTime
				+ ", userId=" + userId + ", userName=" + userName
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deleted_by=" + deleted_by + ", deleted=" + deleted
				+ ", deletedDate=" + deletedDate + ", unitId=" + unitId
				+ ", closingStockDate=" + closingStockDate
				+ ", lstclosingstockmaster=" + lstclosingstockmaster
				+ ", lstclosingstockitemslave=" + lstclosingstockitemslave
				+ ", noOfPages=" + noOfPages + ", batchNumber=" + batchNumber
				+ ", batchExpDate=" + batchExpDate + ", itemDeductQuantity="
				+ itemDeductQuantity + ", narration=" + narration
				+ ", itemName=" + itemName + "]";
	}

	
}
