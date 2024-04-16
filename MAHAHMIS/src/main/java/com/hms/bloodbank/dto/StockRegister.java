package com.hms.bloodbank.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="bb_stock_register")
public class StockRegister implements Serializable {
	
private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "stock_id")
	private Integer stockId;
	
	@Column(name = "component_sep_id")
	private String compSepId;
	
	@Column(name = "bag_id")
	private Integer bagId=0;
	
	@Override
	public String toString() {
		return "StockRegister [discardDate=" + discardDate + "]";
	}

	@Column(name = "donorTreatmentId")
	private Integer donorTreatmentId=0;
	
	@Column(name = "dateOfBagCollection")
	private String dateOfBagCollection;
	
	@Column(name = "inward_date")
	private String inwardDate;
	
	@Column(name = "comp_remark")
	private String compReamrk;
	
	@Column(name = "stock_reamrk")
	private String stock_remark;
	
	@Column(name = "stock_date")
	private Date stockDate;
	
	
	
	@Column(name = "discard_date")
	private String discardDate;
	
	public String getDiscardDate() {
		return discardDate;
	}

	public void setDiscardDate(String discardDate) {
		this.discardDate = discardDate;
	}

	@Column(name = "available_qty")
	private String availableQty;
	
	@Column(name = "discard_qty")
	private String discardQty;
	
	@Column(name = "discard_reason")
	private String discardReason;
	
	@Column(name = "discard_remark")
	private String discardRemark;
	
	@Column(name = "discard_by")
	private int discardby;
	
	@Column(name = "discard_status")
	private Integer discardStatus=0;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_datetime", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_datetime")
	private Date updatedDate;
	
	@UpdateTimestamp
	@Column(name = "deleted_datetime")
	private Date deletedDate;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "status")
	private String status="Y";
	
	@Column(name = "ip_address")
	private String ipAddress = null;
	
	@Column(name = "stock_used")
	private String stockUsed="Y";
	

	@Column(name = "discarddeleted")
	private String discarddeleted="N";
	
	public String getDiscarddeleted() {
		return discarddeleted;
	}

	public void setDiscarddeleted(String discarddeleted) {
		this.discarddeleted = discarddeleted;
	}

	@Transient
	private List<StockRegister> lstStockRegister;
	
	@Transient
	private String volume;
	
	@Transient
	private String blood_group;
	
	@Transient
	private String expiry_date;
	
	@Transient
	private String blood_bag_details;
	
	@Transient
	private String title;
	
	@Transient
	private String first_name;
	
	@Transient
	private String middle_name;
	
	@Transient
	private String last_name;
	
	@Transient
	private Integer donor_id;
	
	
	@Transient
	private String component_remark;
	
	
	public Integer getStockId() {
		return stockId;
	}

	public void setStockId(Integer stockId) {
		this.stockId = stockId;
	}

	public String getCompSepId() {
		return compSepId;
	}

	public void setCompSepId(String compSepId) {
		this.compSepId = compSepId;
	}

	public Integer getBagId() {
		return bagId;
	}

	public void setBagId(Integer bagId) {
		this.bagId = bagId;
	}

	
	public Integer getDonorTreatmentId() {
		return donorTreatmentId;
	}

	public void setDonorTreatmentId(Integer donorTreatmentId) {
		this.donorTreatmentId = donorTreatmentId;
	}

	public String getDateOfBagCollection() {
		return dateOfBagCollection;
	}

	public void setDateOfBagCollection(String dateOfBagCollection) {
		this.dateOfBagCollection = dateOfBagCollection;
	}

	public String getInwardDate() {
		return inwardDate;
	}

	public void setInwardDate(String inwardDate) {
		this.inwardDate = inwardDate;
	}

	public String getCompReamrk() {
		return compReamrk;
	}

	public void setCompReamrk(String compReamrk) {
		this.compReamrk = compReamrk;
	}

	public String getStock_remark() {
		return stock_remark;
	}

	public void setStock_remark(String stock_remark) {
		this.stock_remark = stock_remark;
	}

	public Date getStockDate() {
		return stockDate;
	}

	public void setStockDate(Date stockDate) {
		this.stockDate = stockDate;
	}

	

	public String getAvailableQty() {
		return availableQty;
	}

	public void setAvailableQty(String availableQty) {
		this.availableQty = availableQty;
	}

	public String getDiscardQty() {
		return discardQty;
	}

	public void setDiscardQty(String discardQty) {
		this.discardQty = discardQty;
	}

	public String getDiscardReason() {
		return discardReason;
	}

	public void setDiscardReason(String discardReason) {
		this.discardReason = discardReason;
	}

	

	public Integer getDiscardStatus() {
		return discardStatus;
	}

	public int getDiscardby() {
		return discardby;
	}

	public void setDiscardby(int discardby) {
		this.discardby = discardby;
	}

	public void setDiscardStatus(Integer discardStatus) {
		this.discardStatus = discardStatus;
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

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public List<StockRegister> getLstStockRegister() {
		return lstStockRegister;
	}

	public void setLstStockRegister(List<StockRegister> lstStockRegister) {
		this.lstStockRegister = lstStockRegister;
	}

	public String getDiscardRemark() {
		return discardRemark;
	}

	public void setDiscardRemark(String discardRemark) {
		this.discardRemark = discardRemark;
	}

	public String getVolume() {
		return volume;
	}

	public void setVolume(String volume) {
		this.volume = volume;
	}

	public String getBlood_group() {
		return blood_group;
	}

	public void setBlood_group(String blood_group) {
		this.blood_group = blood_group;
	}

	public String getExpiry_date() {
		return expiry_date;
	}

	public void setExpiry_date(String expiry_date) {
		this.expiry_date = expiry_date;
	}

	public String getBlood_bag_details() {
		return blood_bag_details;
	}

	public void setBlood_bag_details(String blood_bag_details) {
		this.blood_bag_details = blood_bag_details;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getMiddle_name() {
		return middle_name;
	}

	public void setMiddle_name(String middle_name) {
		this.middle_name = middle_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public Integer getDonor_id() {
		return donor_id;
	}

	public void setDonor_id(Integer donor_id) {
		this.donor_id = donor_id;
	}

	public String getComponent_remark() {
		return component_remark;
	}

	public void setComponent_remark(String component_remark) {
		this.component_remark = component_remark;
	}
	
	public String getStockUsed() {
		return stockUsed;
	}

	public void setStockUsed(String stockUsed) {
		this.stockUsed = stockUsed;
	}
	
}
