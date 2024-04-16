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

import org.springframework.stereotype.Component;
@Entity
@Table(name="ehat_inventory_tax_setup")
@Component
public class InventoryTaxSetUpMDTO {
	@Id
	@GeneratedValue
	@Column(name = "tax_id")
	private Integer tax_id;
	
	@Column(name = "tax_code")
	private String tax_code;
	
	@Column(name = "hsn_name")
	private String hsnName;
	
	@Column(name = "tax_description")
	private String tax_description;	
	
	@Column(name = "sgst_rate")
	private Double sgst;
	
	@Column(name = "cgst_rate")
	private Double cgst;
	
	@Column(name = "tax_rate")
	private Double tax_rate;
	
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
	private List<InventoryTaxSetUpMDTO> lstinventoryTaxSetUps;

	public Integer getTax_id() {
		return tax_id;
	}

	public void setTax_id(Integer tax_id) {
		this.tax_id = tax_id;
	}

	public String getTax_code() {
		return tax_code;
	}

	public void setTax_code(String tax_code) {
		this.tax_code = tax_code;
	}

	public String getHsnName() {
		return hsnName;
	}

	public void setHsnName(String hsnName) {
		this.hsnName = hsnName;
	}

	public String getTax_description() {
		return tax_description;
	}

	public void setTax_description(String tax_description) {
		this.tax_description = tax_description;
	}

	public Double getSgst() {
		return sgst;
	}

	public void setSgst(Double sgst) {
		this.sgst = sgst;
	}

	public Double getCgst() {
		return cgst;
	}

	public void setCgst(Double cgst) {
		this.cgst = cgst;
	}

	public Double getTax_rate() {
		return tax_rate;
	}

	public void setTax_rate(Double tax_rate) {
		this.tax_rate = tax_rate;
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

	public List<InventoryTaxSetUpMDTO> getLstinventoryTaxSetUps() {
		return lstinventoryTaxSetUps;
	}

	public void setLstinventoryTaxSetUps(
			List<InventoryTaxSetUpMDTO> lstinventoryTaxSetUps) {
		this.lstinventoryTaxSetUps = lstinventoryTaxSetUps;
	}	
}
