package com.hms.ehat.dto;

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

@Entity
@Table(name = "ehat_bill_prefix")
public class EhatBillPrefix {

	@Id
	@GeneratedValue
	@Column(name = "prefix_id")
	private Integer prefixId;	
	
	@Column(name = "hosp_master_id")
	private Integer hospMastId;
	
	@Column(name = "dep_id")
	private Integer depId;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "bill_prefix")
	private String billPrefix;
	
	@Column(name = "bill_middle")
	private String billMiddle;
	
	@Column(name = "bill_sufix")
	private String billSuffix;
	
	@Column(name = "bill_rec_both")
	private Integer billRecBoth;
	
	@Column(name = "deleted")
	private String deleted="N";

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Transient
	private List<EhatBillPrefix> listEhatBillPrefix;

	public Integer getPrefixId() {
		return prefixId;
	}

	public void setPrefixId(Integer prefixId) {
		this.prefixId = prefixId;
	}

	public Integer getHospMastId() {
		return hospMastId;
	}

	public void setHospMastId(Integer hospMastId) {
		this.hospMastId = hospMastId;
	}

	public Integer getDepId() {
		return depId;
	}

	public void setDepId(Integer depId) {
		this.depId = depId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getBillPrefix() {
		return billPrefix;
	}

	public void setBillPrefix(String billPrefix) {
		this.billPrefix = billPrefix;
	}

	public String getBillMiddle() {
		return billMiddle;
	}

	public void setBillMiddle(String billMiddle) {
		this.billMiddle = billMiddle;
	}

	public String getBillSuffix() {
		return billSuffix;
	}

	public void setBillSuffix(String billSuffix) {
		this.billSuffix = billSuffix;
	}

	public Integer getBillRecBoth() {
		return billRecBoth;
	}

	public void setBillRecBoth(Integer billRecBoth) {
		this.billRecBoth = billRecBoth;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public List<EhatBillPrefix> getListEhatBillPrefix() {
		return listEhatBillPrefix;
	}

	public void setListEhatBillPrefix(List<EhatBillPrefix> listEhatBillPrefix) {
		this.listEhatBillPrefix = listEhatBillPrefix;
	}	
}
