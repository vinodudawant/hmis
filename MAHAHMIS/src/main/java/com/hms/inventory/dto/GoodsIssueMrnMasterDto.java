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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;


@Entity
@Table(name="inv_goods_issue_mrn_master_new")
@Component
public class GoodsIssueMrnMasterDto {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "mrn_id")
	private Integer mrnId;
	
	@Column(name = "mrn_date")
	private String mrnDate;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	
	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
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
	
	//subinventory name
	@Column(name = "mrn_subinventory_name")
	private String mrnSubinventoryName;
	
	//subinventory id
	@Column(name = "mrn_subinventory_id")
	private Integer mrnSubinventoryId;
	
	//mrn remark
	@Column(name = "mrn_remark")
	private String mrnRemark;
	
	@Column(name = "user_name")
	private String userName;
	
	//mrn status
	@Column(name = "mrn_status")
	private String mrnStatus;
	
	//userId
	@Column(name="user_id")
	private int userId;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)  
	@OneToMany(cascade = CascadeType.ALL)   
	@JoinColumn(name = "goods_issue_id", nullable = false) 
	private List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos;
	
	@Transient
	private List<GoodsIssueMrnMasterDto> lstGoodsIssueMrnMaster;
	
	@Transient
	private List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos2;
	
	@Transient
	private List<BatchStockDto> batchStockDtos;
	
	@Transient
	private Integer noOfPages;

	public Integer getNoOfPages() {
		return noOfPages;
	}

	public void setNoOfPages(Integer noOfPages) {
		this.noOfPages = noOfPages;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getMrnId() {
		return mrnId;
	}

	public void setMrnId(Integer mrnId) {
		this.mrnId = mrnId;
	}

	public String getMrnDate() {
		return mrnDate;
	}

	public void setMrnDate(String mrnDate) {
		this.mrnDate = mrnDate;
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

	public String getMrnSubinventoryName() {
		return mrnSubinventoryName;
	}

	public void setMrnSubinventoryName(String mrnSubinventoryName) {
		this.mrnSubinventoryName = mrnSubinventoryName;
	}

	public Integer getMrnSubinventoryId() {
		return mrnSubinventoryId;
	}

	public void setMrnSubinventoryId(Integer mrnSubinventoryId) {
		this.mrnSubinventoryId = mrnSubinventoryId;
	}

	public String getMrnRemark() {
		return mrnRemark;
	}

	public void setMrnRemark(String mrnRemark) {
		this.mrnRemark = mrnRemark;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getMrnStatus() {
		return mrnStatus;
	}

	public void setMrnStatus(String mrnStatus) {
		this.mrnStatus = mrnStatus;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public List<GoodsIssueMrnItemSlaveDto> getGoodsIssueMrnItemSlaveDtos() {
		return goodsIssueMrnItemSlaveDtos;
	}

	public void setGoodsIssueMrnItemSlaveDtos(
			List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos) {
		this.goodsIssueMrnItemSlaveDtos = goodsIssueMrnItemSlaveDtos;
	}

	public List<GoodsIssueMrnMasterDto> getLstGoodsIssueMrnMaster() {
		return lstGoodsIssueMrnMaster;
	}

	public void setLstGoodsIssueMrnMaster(
			List<GoodsIssueMrnMasterDto> lstGoodsIssueMrnMaster) {
		this.lstGoodsIssueMrnMaster = lstGoodsIssueMrnMaster;
	}

	public List<BatchStockDto> getBatchStockDtos() {
		return batchStockDtos;
	}

	public void setBatchStockDtos(List<BatchStockDto> batchStockDtos) {
		this.batchStockDtos = batchStockDtos;
	}

	public List<GoodsIssueMrnItemSlaveDto> getGoodsIssueMrnItemSlaveDtos2() {
		return goodsIssueMrnItemSlaveDtos2;
	}

	public void setGoodsIssueMrnItemSlaveDtos2(
			List<GoodsIssueMrnItemSlaveDto> goodsIssueMrnItemSlaveDtos2) {
		this.goodsIssueMrnItemSlaveDtos2 = goodsIssueMrnItemSlaveDtos2;
	}
	
	
	
}
