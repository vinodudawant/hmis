package com.hms.inventory.dto;

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
@Table(name="inv_saction_power_form")
public class SactionFormDTO {
	@Id
	@GeneratedValue
	@Column(name = "sanction_id")
	private Integer sanctionId;
	
	@Column(name = "saction_date")
	private String sanctionDate;
	
	@Column(name = "financial_year_id")
	private Integer financialYear;
	
	@Column(name = "emp_name")
	private String empName;
	
	@Column(name = "sanction_amount")
	private Double empSanAmt;
	
	@Column(name = "party_id")
	private Integer partyId;
	
	
	
	@Column(name = "party_name")
	private String partyName;
	
	@Column(name = "year_name")
	private String yearName;
	
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
	private List<SactionFormDTO> lstsactionform;

	public Integer getSanctionId() {
		return sanctionId;
	}

	public void setSanctionId(Integer sanctionId) {
		this.sanctionId = sanctionId;
	}

	public String getSanctionDate() {
		return sanctionDate;
	}

	public void setSanctionDate(String sanctionDate) {
		this.sanctionDate = sanctionDate;
	}

	public Integer getFinancialYear() {
		return financialYear;
	}

	public void setFinancialYear(Integer financialYear) {
		this.financialYear = financialYear;
	}

	public String getEmpName() {
		return empName;
	}

	public void setEmpName(String empName) {
		this.empName = empName;
	}

	public Double getEmpSanAmt() {
		return empSanAmt;
	}

	public void setEmpSanAmt(Double empSanAmt) {
		this.empSanAmt = empSanAmt;
	}

	public Integer getPartyId() {
		return partyId;
	}

	public void setPartyId(Integer partyId) {
		this.partyId = partyId;
	}

	public String getPartyName() {
		return partyName;
	}

	public void setPartyName(String partyName) {
		this.partyName = partyName;
	}

	public String getYearName() {
		return yearName;
	}

	public void setYearName(String yearName) {
		this.yearName = yearName;
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

	public List<SactionFormDTO> getLstsactionform() {
		return lstsactionform;
	}

	public void setLstsactionform(List<SactionFormDTO> lstsactionform) {
		this.lstsactionform = lstsactionform;
	}

	
	
}
