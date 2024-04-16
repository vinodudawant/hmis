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
@Table(name ="ehat_fin_bankmaster")
public class FinanceBankMaster {

	@Id
	@GeneratedValue
	@Column(name = "id")
	protected Integer id;
	
	@Column(name = "bank_id")
	protected Integer bankId;
	
	@Column(name = "acc_no")
	protected Long accNo;
	
	@Column(name = "acc_type_id")
	protected Integer accTypeId;
	
	@Column(name = "unit_id")
	protected Integer unitId;
	
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
	private List<FinanceBankMaster> lstFinanceBankMaster;
	
	@Column(name = "bankname")
	private String bankName;
	
	public FinanceBankMaster(){
		
	}
	
	public FinanceBankMaster(Integer bankId, Long accNo, Integer accTypeId,
			Integer unitId, String deleted, Integer createdBy) {
		super();
		this.bankId = bankId;
		this.accNo = accNo;
		this.accTypeId = accTypeId;
		this.unitId = unitId;
		this.deleted = deleted;
		this.createdBy = createdBy;		
	}


	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getBankId() {
		return bankId;
	}

	public void setBankId(Integer bankId) {
		this.bankId = bankId;
	}

	public Long getAccNo() {
		return accNo;
	}

	public void setAccNo(Long accNo) {
		this.accNo = accNo;
	}

	public Integer getAccTypeId() {
		return accTypeId;
	}

	public void setAccTypeId(Integer accTypeId) {
		this.accTypeId = accTypeId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
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

	public List<FinanceBankMaster> getLstFinanceBankMaster() {
		return lstFinanceBankMaster;
	}

	public void setLstFinanceBankMaster(List<FinanceBankMaster> lstFinanceBankMaster) {
		this.lstFinanceBankMaster = lstFinanceBankMaster;
	}
}
