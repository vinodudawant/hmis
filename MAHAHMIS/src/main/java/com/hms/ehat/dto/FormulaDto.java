package com.hms.ehat.dto;

import java.io.Serializable;
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
@Table(name = "ehat_formula_master")
public class FormulaDto implements Serializable{

	@Id
	@GeneratedValue
	@Column(name = "formula_id")
	private Integer formulaId;
	
	@Column(name = "formula_name")
	private String formulaName;
	
	@Column(name = "formula")
	private String formula;
	
	@Column(name = "formula_unit")
	private String formulaUnit="-";
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
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
	@Column(name = "formulatestid",columnDefinition="varchar(255) default '-'")
	private String formulatestid="-";
	@Transient
	private String valdation="-";
	@Transient
	private String result="-";
	

	@Transient
	private List<FormulaDto> listFormula;

	public Integer getFormulaId() {
		return formulaId;
	}

	public void setFormulaId(Integer formulaId) {
		this.formulaId = formulaId;
	}

	public String getFormulaName() {
		return formulaName;
	}

	public void setFormulaName(String formulaName) {
		this.formulaName = formulaName;
	}

	public String getFormula() {
		return formula;
	}

	public void setFormula(String formula) {
		this.formula = formula;
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

	public List<FormulaDto> getListFormula() {
		return listFormula;
	}

	public void setListFormula(List<FormulaDto> listFormula) {
		this.listFormula = listFormula;
	}
	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getValdation() {
		return valdation;
	}

	public void setValdation(String valdation) {
		this.valdation = valdation;
	}

	public String getFormulaUnit() {
		return formulaUnit;
	}

	public String getFormulatestid() {
		return formulatestid;
	}

	public void setFormulatestid(String formulatestid) {
		this.formulatestid = formulatestid;
	}

	public void setFormulaUnit(String formulaUnit) {
		this.formulaUnit = formulaUnit;
	}

}
