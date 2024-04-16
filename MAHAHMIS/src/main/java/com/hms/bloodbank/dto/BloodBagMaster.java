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
@Table(name="bb_blood_bag_master")
public class BloodBagMaster implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "idblood_bag")
	private int bloodBagId;
	
	@Column(name = "blood_bag_name")
	private String bloodBagtName;
	
	@Column(name = "blood_bag_count", updatable = false)
	private Integer bloodBagCount;
	
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
	
	@Column(name = "blodd_bag_ip")
	private String ipAddress = null;
	
	@Column(name="donor_reaction_status")
	private String donorReactionStatus ="N";
	
	
	public String getDonorReactionStatus() {
		return donorReactionStatus;
	}

	public void setDonorReactionStatus(String donorReactionStatus) {
		this.donorReactionStatus = donorReactionStatus;
	}

	@Transient
	private List<BloodBagMaster> lstBloodBagMaster;

	public int getBloodBagId() {
		return bloodBagId;
	}

	public void setBloodBagId(int bloodBagId) {
		this.bloodBagId = bloodBagId;
	}

	public String getBloodBagtName() {
		return bloodBagtName;
	}

	public void setBloodBagtName(String bloodBagtName) {
		this.bloodBagtName = bloodBagtName;
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

	public List<BloodBagMaster> getLstBloodBagMaster() {
		return lstBloodBagMaster;
	}

	public void setLstBloodBagMaster(List<BloodBagMaster> lstBloodBagMaster) {
		this.lstBloodBagMaster = lstBloodBagMaster;
	}

	public Integer getBloodBagCount() {
		return bloodBagCount;
	}

	public void setBloodBagCount(Integer bloodBagCount) {
		this.bloodBagCount = bloodBagCount;
	}
	
	

}
