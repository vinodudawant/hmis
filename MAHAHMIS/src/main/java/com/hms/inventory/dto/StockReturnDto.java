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
@Table(name="inv_stock_return_new")
public class StockReturnDto {

	@Transient
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	
	 @Temporal(TemporalType.TIMESTAMP) 
	@CreationTimestamp
	@Column(name="created_date_time", updatable = false)
	private Date createdDateTime;
	
	 @Temporal(TemporalType.TIMESTAMP) 
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
	
	@Column(name="subinv_id")
	private Integer subinvId;
	
	@Column(name="subinv_name")
	private String subinvName;
	
	@Column(name="stock_return_date")
	private String stockReturnDate;
	
	@Column(name="remark")
	private String remark;
	
	@Column(name = "status",columnDefinition="varchar(255) default 'Pending'")
	private String status="Pending";//added by dayanand (12-5-2020) for determine stock return received or not
	
	@Transient
	private List<StockReturnDto> lstStockReturnDto;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name="stock_return_id")
	private List<StockReturnItemSlaveDto> StockReturnItemSlaveDto;
	
	@Transient
	private Integer noOfPages;
	
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

	public Integer getSubinvId() {
		return subinvId;
	}

	public void setSubinvId(Integer subinvId) {
		this.subinvId = subinvId;
	}

	public String getSubinvName() {
		return subinvName;
	}

	public void setSubinvName(String subinvName) {
		this.subinvName = subinvName;
	}

	public String getStockReturnDate() {
		return stockReturnDate;
	}

	public void setStockReturnDate(String stockReturnDate) {
		this.stockReturnDate = stockReturnDate;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public List<StockReturnDto> getLstStockReturnDto() {
		return lstStockReturnDto;
	}

	public void setLstStockReturnDto(List<StockReturnDto> lstStockReturnDto) {
		this.lstStockReturnDto = lstStockReturnDto;
	}

	public List<StockReturnItemSlaveDto> getStockReturnItemSlaveDto() {
		return StockReturnItemSlaveDto;
	}

	public void setStockReturnItemSlaveDto(
			List<StockReturnItemSlaveDto> stockReturnItemSlaveDto) {
		StockReturnItemSlaveDto = stockReturnItemSlaveDto;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getNoOfPages() {
		return noOfPages;
	}

	public void setNoOfPages(Integer noOfPages) {
		this.noOfPages = noOfPages;
	}

	@Override
	public String toString() {
		return "StockReturnDto [id=" + id + ", createdDateTime="
				+ createdDateTime + ", updatedDateTime=" + updatedDateTime
				+ ", userId=" + userId + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", deleted_by=" + deleted_by
				+ ", deleted=" + deleted + ", deletedDate=" + deletedDate
				+ ", unitId=" + unitId + ", subinvId=" + subinvId
				+ ", subinvName=" + subinvName + ", stockReturnDate="
				+ stockReturnDate + ", remark=" + remark + ", status=" + status
				+ ", lstStockReturnDto=" + lstStockReturnDto
				+ ", StockReturnItemSlaveDto=" + StockReturnItemSlaveDto + "]";
	}

	
	
	
	
	
	
}
