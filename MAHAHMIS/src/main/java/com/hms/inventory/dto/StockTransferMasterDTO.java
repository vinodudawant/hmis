package com.hms.inventory.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;


@Entity
@Table(name="inv_stock_transper_master")
public class StockTransferMasterDTO {
	@Id
	@GeneratedValue
	@Column(name = "stock_id")
	private Integer stockId;

	@Column(name = "stock_date")
	private String stockDate;
	
	@Column(name = "stock_remark")
	private String stockRemark;
	
	@Column(name = "mrn_id")
	private Integer mrnId;

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
	
	@Column(name = "subinventory_id")
	private Integer stockSubinventoryId;
	
	@Column(name = "subinventory_name")
	private String stockSubinventoryName;
	

	@Column(name = "slave_item_accepted_status",columnDefinition="varchar(2) default 'N'")
	private String itemAcceptStatus="N";//added by dayanand for item is related stock accept or not 

	
	@Transient
	private String receiveSubInvName;//added by dayanand for display name on stock receive indicating that receive stock from these sub inventoty
	
	@Transient
	private List<StockTransferMasterDTO> lststocktranspermaster;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)  
	 @OneToMany(cascade = CascadeType.ALL)   
	 @JoinColumn(name = "stock_id", nullable = false) 
	 private List<StockTransferItemInfoDTO> lststocktrasiteminfo;

	public Integer getStockId() {
		return stockId;
	}

	public void setStockId(Integer stockId) {
		this.stockId = stockId;
	}

	public String getStockDate() {
		return stockDate;
	}

	public void setStockDate(String stockDate) {
		this.stockDate = stockDate;
	}

	public String getStockRemark() {
		return stockRemark;
	}

	public void setStockRemark(String stockRemark) {
		this.stockRemark = stockRemark;
	}

	public Integer getMrnId() {
		return mrnId;
	}

	public void setMrnId(Integer mrnId) {
		this.mrnId = mrnId;
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

	public Integer getStockSubinventoryId() {
		return stockSubinventoryId;
	}

	public void setStockSubinventoryId(Integer stockSubinventoryId) {
		this.stockSubinventoryId = stockSubinventoryId;
	}

	public String getStockSubinventoryName() {
		return stockSubinventoryName;
	}

	public void setStockSubinventoryName(String stockSubinventoryName) {
		this.stockSubinventoryName = stockSubinventoryName;
	}

	public String getItemAcceptStatus() {
		return itemAcceptStatus;
	}

	public void setItemAcceptStatus(String itemAcceptStatus) {
		this.itemAcceptStatus = itemAcceptStatus;
	}

	public List<StockTransferMasterDTO> getLststocktranspermaster() {
		return lststocktranspermaster;
	}

	public void setLststocktranspermaster(
			List<StockTransferMasterDTO> lststocktranspermaster) {
		this.lststocktranspermaster = lststocktranspermaster;
	}

	public List<StockTransferItemInfoDTO> getLststocktrasiteminfo() {
		return lststocktrasiteminfo;
	}

	public void setLststocktrasiteminfo(
			List<StockTransferItemInfoDTO> lststocktrasiteminfo) {
		this.lststocktrasiteminfo = lststocktrasiteminfo;
	}

	public String getReceiveSubInvName() {
		return receiveSubInvName;
	}

	public void setReceiveSubInvName(String receiveSubInvName) {
		this.receiveSubInvName = receiveSubInvName;
	}

	
	
	
	
	
	

}
