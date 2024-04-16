package com.hms.inventory.dto;

import java.util.Date;
import java.util.List;

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
@Table(name="inv_opening_stock_new")
public class OpeningStockDto {


	
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

	@Column(name="stock_series")
	private String stockSeries;
	
	@Column(name= "stock_narration")
	private String stockNarration;
	
	@Column(name = "total_item_quantity")
	private Integer totalItemQuantity;
	
	@Column(name = "total_amount")
	private Double totalAmount;

	@Column(name = "item_name")
	private String itemName;
	
	@Transient
	private List<OpeningStockDto> openingStockDtos;
	
	
	@Transient
	private Integer noOfPages;
	
	@Transient
	private String batchNumber;
	
	@Transient
	private Date batchExpDate;
	
	@Transient
	private Integer itemQuantity;
	
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="opening_stock_master_id",nullable = false)
	//private List<OpeningStockItemSlaveDto> openingStockItemSlaveDto;
	private List<OpeningStockItemSlaveDto> lstOpeningStockItemSlaveDto;
	
	// opening stock asset maintenance slave dto
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "opening_stock_master_id",  nullable = false)
	private List<ItemAssetMaintenanceOpeningSlaveDto> lstItemAssetMaintenanceOpeningSlaveDto;
	
	// asset maintenance master dto 
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "opening_master_id",  nullable = true)
	private List<ItemAssetMaintenanceMasterDto> lstItemAssetMaintenanceMasterDto;

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

	public String getStockSeries() {
		return stockSeries;
	}

	public void setStockSeries(String stockSeries) {
		this.stockSeries = stockSeries;
	}

	public String getStockNarration() {
		return stockNarration;
	}

	public void setStockNarration(String stockNarration) {
		this.stockNarration = stockNarration;
	}

	public Integer getTotalItemQuantity() {
		return totalItemQuantity;
	}

	public void setTotalItemQuantity(Integer totalItemQuantity) {
		this.totalItemQuantity = totalItemQuantity;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	

	public List<OpeningStockItemSlaveDto> getLstOpeningStockItemSlaveDto() {
		return lstOpeningStockItemSlaveDto;
	}

	public void setLstOpeningStockItemSlaveDto(
			List<OpeningStockItemSlaveDto> lstOpeningStockItemSlaveDto) {
		this.lstOpeningStockItemSlaveDto = lstOpeningStockItemSlaveDto;
	}

	public List<OpeningStockDto> getOpeningStockDtos() {
		return openingStockDtos;
	}

	public void setOpeningStockDtos(List<OpeningStockDto> openingStockDtos) {
		this.openingStockDtos = openingStockDtos;
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

	public Integer getItemQuantity() {
		return itemQuantity;
	}

	public void setItemQuantity(Integer itemQuantity) {
		this.itemQuantity = itemQuantity;
	}

	public List<ItemAssetMaintenanceOpeningSlaveDto> getLstItemAssetMaintenanceOpeningSlaveDto() {
		return lstItemAssetMaintenanceOpeningSlaveDto;
	}

	public void setLstItemAssetMaintenanceOpeningSlaveDto(
			List<ItemAssetMaintenanceOpeningSlaveDto> lstItemAssetMaintenanceOpeningSlaveDto) {
		this.lstItemAssetMaintenanceOpeningSlaveDto = lstItemAssetMaintenanceOpeningSlaveDto;
	}

	public List<ItemAssetMaintenanceMasterDto> getLstItemAssetMaintenanceMasterDto() {
		return lstItemAssetMaintenanceMasterDto;
	}

	public void setLstItemAssetMaintenanceMasterDto(
			List<ItemAssetMaintenanceMasterDto> lstItemAssetMaintenanceMasterDto) {
		this.lstItemAssetMaintenanceMasterDto = lstItemAssetMaintenanceMasterDto;
	}

	@Override
	public String toString() {
		return "OpeningStockDto [id=" + id + ", createdDateTime="
				+ createdDateTime + ", updatedDateTime=" + updatedDateTime
				+ ", userId=" + userId + ", userName=" + userName
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deleted_by=" + deleted_by + ", deleted=" + deleted
				+ ", deletedDate=" + deletedDate + ", unitId=" + unitId
				+ ", stockSeries=" + stockSeries + ", stockNarration="
				+ stockNarration + ", totalItemQuantity=" + totalItemQuantity
				+ ", totalAmount=" + totalAmount + ", itemName=" + itemName
				+ ", openingStockDtos=" + openingStockDtos + ", noOfPages="
				+ noOfPages + ", batchNumber=" + batchNumber
				+ ", batchExpDate=" + batchExpDate + ", itemQuantity="
				+ itemQuantity + ", lstOpeningStockItemSlaveDto="
				+ lstOpeningStockItemSlaveDto
				+ ", lstItemAssetMaintenanceOpeningSlaveDto="
				+ lstItemAssetMaintenanceOpeningSlaveDto
				+ ", lstItemAssetMaintenanceMasterDto="
				+ lstItemAssetMaintenanceMasterDto + "]";
	}

	

	

	

	
}
