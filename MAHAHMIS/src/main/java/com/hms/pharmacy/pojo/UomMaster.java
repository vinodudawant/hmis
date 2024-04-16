package com.hms.pharmacy.pojo;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="pharma_uom_master")
public class UomMaster 
{	
	@Id
	@GeneratedValue
	@Column(name="uom_id")
	private Integer uomId;
	
	@Column(name="uom_name")
	private String uomName;
	
	@Column(name="uom_code")
	private String uomCode;
	
	@Column(name="uom_delete_flag")
	private Integer uomDeleteFlag;
	@UpdateTimestamp
	@Column(name="uom_update_date")
	private Date uomUpdateDate;
	
	@CreationTimestamp
	@Column(name = "uom_add_date")
	private Date uomAddDate;

	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Transient
	private List<UomMaster> ListUomMaster;
	
	
	
	
	public String getUomCode() {
		return uomCode;
	}

	public void setUomCode(String uomCode) {
		this.uomCode = uomCode;
	}

	@Column(name="user_id")
	private int userId;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
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

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getUomAddDate() {
		return uomAddDate;
	}

	public void setUomAddDate(Date uomAddDate) {
		this.uomAddDate = uomAddDate;
	}

	public Integer getUomId() {
		return uomId;
	}

	public void setUomId(Integer uomId) {
		this.uomId = uomId;
	}

	public String getUomName() {
		return uomName;
	}

	public void setUomName(String uomName) {
		this.uomName = uomName;
	}

	public Integer getUomDeleteFlag() {
		return uomDeleteFlag;
	}

	public void setUomDeleteFlag(Integer uomDeleteFlag) {
		this.uomDeleteFlag = uomDeleteFlag;
	}

	public Date getUomUpdateDate() {
		return uomUpdateDate;
	}

	public void setUomUpdateDate(Date uomUpdateDate) {
		this.uomUpdateDate = uomUpdateDate;
	}

	public List<UomMaster> getListUomMaster() {
		return ListUomMaster;
	}

	public void setListUomMaster(List<UomMaster> listUomMaster) {
		ListUomMaster = listUomMaster;
	}

	@Override
	public String toString() {
		return "UomMaster [uomId=" + uomId + ", uomName=" + uomName + ", uomDeleteFlag=" + uomDeleteFlag
				+ ", uomUpdateDate=" + uomUpdateDate + ", uomAddDate=" + uomAddDate + ", deletedDate=" + deletedDate
				+ ", ListUomMaster=" + ListUomMaster + ", userId=" + userId + ", unitId=" + unitId + ", createdBy="
				+ createdBy + ", updatedBy=" + updatedBy + ", deletedBy=" + deletedBy + "]";
	}

	

}
