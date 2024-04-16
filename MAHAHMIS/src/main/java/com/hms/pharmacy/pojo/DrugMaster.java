package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="pharma_drug_master")
public class DrugMaster implements Serializable 
{
	@Id
	@GeneratedValue
	@Column(name="drug_id")
	private Integer drugId;
	
	@Column(name="drug_name")
	private String drugName;
	
	@Column(name="drug_code")
	private String drugCode;
	
	@Column(name="drug_therauptic_use")
	private String drugTheraupticUse;
	
	@Column(name="drug_disc")
	private Integer drugDisc;
	
	@Column(name="drug_billing_must")
	private Integer drugBillingMust;
	
	@Column(name="drug_schedule_h1")
	private Integer drugScheduleH1;
	
	@Column(name="drug_stock_hold")
	private Integer drugStockHold;
	
	@Column(name="drug_delete_flag")
	private Integer  drugDeleteFlag;
	
	
	
	
	public String getDrugCode() {
		return drugCode;
	}

	public void setDrugCode(String drugCode) {
		this.drugCode = drugCode;
	}

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

	@CreationTimestamp
	@Column(name="drug_add_date")
	private Date drugAddDate;
	@UpdateTimestamp
	@Column(name="drug_update_date")
	private Date drugUpdateDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	
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
		
	public Date getDrugAddDate() {
		return drugAddDate;
	}

	public void setDrugAddDate(Date drugAddDate) {
		this.drugAddDate = drugAddDate;
	}

	public Integer getDrugId() {
		return drugId;
	}

	public void setDrugId(Integer drugId) {
		this.drugId = drugId;
	}

	public String getDrugName() {
		return drugName;
	}

	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}

	public String getDrugTheraupticUse() {
		return drugTheraupticUse;
	}

	public void setDrugTheraupticUse(String drugTheraupticUse) {
		this.drugTheraupticUse = drugTheraupticUse;
	}

	public Integer getDrugDisc() {
		return drugDisc;
	}

	public void setDrugDisc(Integer drugDisc) {
		this.drugDisc = drugDisc;
	}

	public Integer getDrugBillingMust() {
		return drugBillingMust;
	}

	public void setDrugBillingMust(Integer drugBillingMust) {
		this.drugBillingMust = drugBillingMust;
	}

	public Integer getDrugScheduleH1() {
		return drugScheduleH1;
	}

	public void setDrugScheduleH1(Integer drugScheduleH1) {
		this.drugScheduleH1 = drugScheduleH1;
	}

	public Integer getDrugStockHold() {
		return drugStockHold;
	}

	public void setDrugStockHold(Integer drugStockHold) {
		this.drugStockHold = drugStockHold;
	}

	public Integer getDrugDeleteFlag() {
		return drugDeleteFlag;
	}

	public void setDrugDeleteFlag(Integer drugDeleteFlag) {
		this.drugDeleteFlag = drugDeleteFlag;
	}

	public Date getDrugUpdateDate() {
		return drugUpdateDate;
	}

	public void setDrugUpdateDate(Date drugUpdateDate) {
		this.drugUpdateDate = drugUpdateDate;
	}

	
	
}
