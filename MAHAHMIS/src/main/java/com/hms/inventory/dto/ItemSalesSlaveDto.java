package com.hms.inventory.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name="inv_item_sales_slave")
public class ItemSalesSlaveDto {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	@CreationTimestamp
	@Column(name="created_date_time",updatable= false)
	private Date createdDateTime;
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
	@Column(name="unit_price")//sales/issue MRP
	private Integer unitPrice;
	@Column(name="sales_factor_uom")//UOM
	private String salesFactorUom;
	@Column(name="sales_uom_factor")//quantity
	private Integer salesUomFactor;
	
	@Transient
	private List<ItemSalesSlaveDto> lstItemSalesSlave;

	

	public List<ItemSalesSlaveDto> getLstItemSalesSlave() {
		return lstItemSalesSlave;
	}

	public void setLstItemSalesSlave(List<ItemSalesSlaveDto> lstItemSalesSlave) {
		this.lstItemSalesSlave = lstItemSalesSlave;
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

	public Integer getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(Integer unitPrice) {
		this.unitPrice = unitPrice;
	}

	public String getSalesFactorUom() {
		return salesFactorUom;
	}

	public void setSalesFactorUom(String salesFactorUom) {
		this.salesFactorUom = salesFactorUom;
	}

	public Integer getSalesUomFactor() {
		return salesUomFactor;
	}

	public void setSalesUomFactor(Integer salesUomFactor) {
		this.salesUomFactor = salesUomFactor;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + createdBy;
		result = prime * result
				+ ((createdDateTime == null) ? 0 : createdDateTime.hashCode());
		result = prime * result + ((deleted == null) ? 0 : deleted.hashCode());
		result = prime * result
				+ ((deletedDate == null) ? 0 : deletedDate.hashCode());
		result = prime * result + deleted_by;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime
				* result
				+ ((lstItemSalesSlave == null) ? 0 : lstItemSalesSlave
						.hashCode());
		result = prime * result
				+ ((salesFactorUom == null) ? 0 : salesFactorUom.hashCode());
		result = prime * result
				+ ((salesUomFactor == null) ? 0 : salesUomFactor.hashCode());
		result = prime * result + ((unitId == null) ? 0 : unitId.hashCode());
		result = prime * result
				+ ((unitPrice == null) ? 0 : unitPrice.hashCode());
		result = prime * result + updatedBy;
		result = prime * result
				+ ((updatedDateTime == null) ? 0 : updatedDateTime.hashCode());
		result = prime * result + userId;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ItemSalesSlaveDto other = (ItemSalesSlaveDto) obj;
		if (createdBy != other.createdBy)
			return false;
		if (createdDateTime == null) {
			if (other.createdDateTime != null)
				return false;
		} else if (!createdDateTime.equals(other.createdDateTime))
			return false;
		if (deleted == null) {
			if (other.deleted != null)
				return false;
		} else if (!deleted.equals(other.deleted))
			return false;
		if (deletedDate == null) {
			if (other.deletedDate != null)
				return false;
		} else if (!deletedDate.equals(other.deletedDate))
			return false;
		if (deleted_by != other.deleted_by)
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (lstItemSalesSlave == null) {
			if (other.lstItemSalesSlave != null)
				return false;
		} else if (!lstItemSalesSlave.equals(other.lstItemSalesSlave))
			return false;
		if (salesFactorUom == null) {
			if (other.salesFactorUom != null)
				return false;
		} else if (!salesFactorUom.equals(other.salesFactorUom))
			return false;
		if (salesUomFactor == null) {
			if (other.salesUomFactor != null)
				return false;
		} else if (!salesUomFactor.equals(other.salesUomFactor))
			return false;
		if (unitId == null) {
			if (other.unitId != null)
				return false;
		} else if (!unitId.equals(other.unitId))
			return false;
		if (unitPrice == null) {
			if (other.unitPrice != null)
				return false;
		} else if (!unitPrice.equals(other.unitPrice))
			return false;
		if (updatedBy != other.updatedBy)
			return false;
		if (updatedDateTime == null) {
			if (other.updatedDateTime != null)
				return false;
		} else if (!updatedDateTime.equals(other.updatedDateTime))
			return false;
		if (userId != other.userId)
			return false;
		return true;
	}

	

}
