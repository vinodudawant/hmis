package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "pharma_batch_master")
public class BatchMaster implements Serializable {
	@Id
	@GeneratedValue
	@Column(name = "batch_id")
	private Integer batchId;

	@Column(name = "batch_code")
	private String batchCode;

	@Column(name = "batch_exp_date")
	private String batchExpDate;

	@Column(name = "batch_delete_flag")
	private Integer batchDeleteFlag;

	/*
	 * @Column(name = "batch_update_date") private Date batchUpdateDate;
	 */
	
	@Column(name = "batch_exp_date_timestamp")
	private String batchExpDatetimestamp;
	
	
	@CreationTimestamp
	@Column(name="batch_add_date")
	private Date batchAddDate;
	public Date getBatchAddDate() {
		return batchAddDate;
	}

	public void setBatchAddDate(Date batchAddDate) {
		this.batchAddDate = batchAddDate;
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

	@UpdateTimestamp
	@Column(name="batch_update_date")
	private Date batchUpdateDate;
	
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


	@ManyToOne
	@JoinColumn(name = "batch_product_id")
	private ProductMaster productMaster;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "batchMaster")
	private StockMaster stockMaster;
	
	

	/*@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "batchMaster")
	private PurchaseSlave purchaseSlave;*/

	public String getBatchExpDatetimestamp() {
		return batchExpDatetimestamp;
	}

	public void setBatchExpDatetimestamp(String batchExpDatetimestamp) {
		this.batchExpDatetimestamp = batchExpDatetimestamp;
	}

	public Integer getBatchDeleteFlag() {
		return batchDeleteFlag;
	}

	public void setBatchDeleteFlag(Integer batchDeleteFlag) {
		this.batchDeleteFlag = batchDeleteFlag;
	}

	public Date getBatchUpdateDate() {
		return batchUpdateDate;
	}

	public void setBatchUpdateDate(Date batchUpdateDate) {
		this.batchUpdateDate = batchUpdateDate;
	}

	public StockMaster getStockMaster() {
		return stockMaster;
	}

	public void setStockMaster(StockMaster stockMaster) {
		this.stockMaster = stockMaster;
	}

	@JsonIgnore
	public ProductMaster getProductMaster() {
		return productMaster;
	}

	public void setProductMaster(ProductMaster productMaster) {
		this.productMaster = productMaster;
	}

	public Integer getBatchId() {
		return batchId;
	}

	public void setBatchId(Integer batchId) {
		this.batchId = batchId;
	}

	public String getBatchCode() {
		return batchCode;
	}

	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
	}

	public String getBatchExpDate() {
		return batchExpDate;
	}

	public void setBatchExpDate(String batchExpDate) {
		this.batchExpDate = batchExpDate;
	}
	
	@Override
	public boolean equals(Object obj) {
		BatchMaster batchMaster=(BatchMaster)obj;
		
		if(batchMaster.getBatchId().equals(batchId))
			return true;
		else
			return false;
	}
	
	@Override
	public int hashCode() {
		return batchId;
	}

	/*@JsonIgnore
	public PurchaseSlave getPurchaseSlave() {
		return purchaseSlave;
	}

	public void setPurchaseSlave(PurchaseSlave purchaseSlave) {
		this.purchaseSlave = purchaseSlave;
	}*/
	
	
}
