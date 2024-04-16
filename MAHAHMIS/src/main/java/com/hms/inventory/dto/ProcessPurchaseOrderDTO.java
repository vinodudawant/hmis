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

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

@Entity
@Table(name="inv_process_po_master")
public class ProcessPurchaseOrderDTO {
	@Id
	@GeneratedValue
	@Column(name = "process_id")
	private Integer processId;


	@Column(name = "order_date_time", updatable = false)
	private String orderdDate;
	
	@Column(name = "delivery_date_time", updatable = false)
	private String deliveryDate;	
	
	@Column(name = "mrn_id")
	private Integer mrnId;
	
	@Column(name = "mrn_subinventory_id")
	private Integer mrnSubinventoryId;
	
	@Column(name = "mrn_subinventory_name")
	private String mrnSubinventoryName;

	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;		
	
	@Transient
	private List<ProcessPurchaseOrderDTO> lstprocessmaster;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)  
	@OneToMany(cascade = CascadeType.ALL)   
	@JoinColumn(name = "process_id", nullable = false) 
	private List<ProcessPurchaseOrderItemDTO> lstprocessiteminfo;

	public Integer getProcessId() {
		return processId;
	}

	public void setProcessId(Integer processId) {
		this.processId = processId;
	}

	public String getOrderdDate() {
		return orderdDate;
	}

	public void setOrderdDate(String orderdDate) {
		this.orderdDate = orderdDate;
	}

	public String getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(String deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public Integer getMrnId() {
		return mrnId;
	}

	public void setMrnId(Integer mrnId) {
		this.mrnId = mrnId;
	}

	public Integer getMrnSubinventoryId() {
		return mrnSubinventoryId;
	}

	public void setMrnSubinventoryId(Integer mrnSubinventoryId) {
		this.mrnSubinventoryId = mrnSubinventoryId;
	}

	public String getMrnSubinventoryName() {
		return mrnSubinventoryName;
	}

	public void setMrnSubinventoryName(String mrnSubinventoryName) {
		this.mrnSubinventoryName = mrnSubinventoryName;
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

	public List<ProcessPurchaseOrderDTO> getLstprocessmaster() {
		return lstprocessmaster;
	}

	public void setLstprocessmaster(List<ProcessPurchaseOrderDTO> lstprocessmaster) {
		this.lstprocessmaster = lstprocessmaster;
	}

	public List<ProcessPurchaseOrderItemDTO> getLstprocessiteminfo() {
		return lstprocessiteminfo;
	}

	public void setLstprocessiteminfo(
			List<ProcessPurchaseOrderItemDTO> lstprocessiteminfo) {
		this.lstprocessiteminfo = lstprocessiteminfo;
	}

	
}
