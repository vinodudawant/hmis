package com.hms.pharmacy.pojo;

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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;



@Entity
@Table(name = "pharma_tax_master")
public class TaxMaster implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "tax_id")
	private Integer taxId;

	@Column(name = "tax_name")
	private String taxName;

	@Column(name = "tax_createdBy")
	private String createdBy;

	@Column(name = "tax_rate")
	private double taxRate;
	
	@Column(name = "tax_type")
	private Integer type;
	
	@Column(name = "tax_delete_flag")
	private Integer taxDeleteFlag;
	
	@UpdateTimestamp
	@Column(name = "tax_update_date")
	private Date taxUpdateDate;

	@CreationTimestamp
	@Column(name = "tax_add_date")
	private Date taxAddDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	

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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	public Date getTaxAddDate() {
		return taxAddDate;
	}

	public void setTaxAddDate(Date taxAddDate) {
		this.taxAddDate = taxAddDate;
	}

	public Integer getTaxId() {
		return taxId;
	}

	public void setTaxId(Integer taxId) {
		this.taxId = taxId;
	}

	public String getTaxName() {
		return taxName;
	}

	public void setTaxName(String taxName) {
		this.taxName = taxName;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public double getTaxRate() {
		return taxRate;
	}

	public void setTaxRate(double taxRate) {
		this.taxRate = taxRate;
	}

	

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getTaxDeleteFlag() {
		return taxDeleteFlag;
	}

	public void setTaxDeleteFlag(Integer taxDeleteFlag) {
		this.taxDeleteFlag = taxDeleteFlag;
	}

	public Date getTaxUpdateDate() {
		return taxUpdateDate;
	}

	public void setTaxUpdateDate(Date taxUpdateDate) {
		this.taxUpdateDate = taxUpdateDate;
	}

	public String getIdAsString() {
		return new Long(taxId).toString();
	}
	
	@Transient
	private List<TaxMaster> lsttaxmaster;


	public List<TaxMaster> getLsttaxmaster() {
		return lsttaxmaster;
	}

	public void setLsttaxmaster(List<TaxMaster> lsttaxmaster) {
		this.lsttaxmaster = lsttaxmaster;
	}
	
	

}
