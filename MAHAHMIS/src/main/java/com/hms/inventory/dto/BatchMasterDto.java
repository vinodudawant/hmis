
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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
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
@Table(name="inv_batch_master")
public class BatchMasterDto implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "item_master_id")
	private Integer itemMasterId;
	
	@Column(name = "item_batch_code")
	private String itemBatchCode;

	@Column(name = "item_batch_exp_date")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date itemBatchExpDate;

	@Column(name="unit_id")
	private Integer unitId;
	
	@CreationTimestamp
	@Column(name="created_date_time" ,updatable = false)
	private Date createdDateTime;
	
	@Column(name="created_by",updatable = false)
	private int createdBy;
	
	@UpdateTimestamp
	@Column(name="updated_date_time")
	private Date updatedDateTime;
	
	@Column(name="updated_by")
	private int updatedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Column(name="deleted_by")
	private int deleted_by;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Transient
	private List<BatchMasterDto> lstBatchMasterDto;
	
	@Transient
	private String itemName;
	
	@Transient
	private Integer itemQuantity;
	
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

	public String getItemBatchCode() {
		return itemBatchCode;
	}

	public void setItemBatchCode(String itemBatchCode) {
		this.itemBatchCode = itemBatchCode;
	}

	

	public Date getItemBatchExpDate() {
		return itemBatchExpDate;
	}

	public void setItemBatchExpDate(Date itemBatchExpDate) {
		this.itemBatchExpDate = itemBatchExpDate;
	}

	public Integer getItemMasterId() {
		return itemMasterId;
	}

	public void setItemMasterId(Integer itemMasterId) {
		this.itemMasterId = itemMasterId;
	}

	public List<BatchMasterDto> getLstBatchMasterDto() {
		return lstBatchMasterDto;
	}

	public void setLstBatchMasterDto(List<BatchMasterDto> lstBatchMasterDto) {
		this.lstBatchMasterDto = lstBatchMasterDto;
	}

	public String getItemName() {
		return itemName;
	}

	public Integer getItemQuantity() {
		return itemQuantity;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public void setItemQuantity(Integer itemQuantity) {
		this.itemQuantity = itemQuantity;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "BatchMasterDto [id=" + id + ", itemMasterId=" + itemMasterId
				+ ", itemBatchCode=" + itemBatchCode + ", itemBatchExpDate="
				+ itemBatchExpDate + ", unitId=" + unitId
				+ ", createdDateTime=" + createdDateTime + ", createdBy="
				+ createdBy + ", updatedDateTime=" + updatedDateTime
				+ ", updatedBy=" + updatedBy + ", deleted=" + deleted
				+ ", deleted_by=" + deleted_by + ", deletedDate=" + deletedDate
				+ ", lstBatchMasterDto=" + lstBatchMasterDto + ", itemName="
				+ itemName + ", itemQuantity=" + itemQuantity + "]";
	}

}
