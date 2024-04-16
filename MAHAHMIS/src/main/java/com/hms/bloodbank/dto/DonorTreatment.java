package com.hms.bloodbank.dto;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@SuppressWarnings("deprecation")
@Entity
@Table(name="bb_donor_treatment")
public class DonorTreatment implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	@Id
	@GeneratedValue
	@Column(name = "donor_treatment_id")
	private Integer donorTreatmentId;
	
	@Column(name = "doner_type")
	private String donorType;
	
	@Column(name = "patient_type")
	private String patient_type;

	@Column(name = "collection")
	private String collection;
	
	@Column(name = "outdoor_details",columnDefinition="TEXT")
	private String outdoorDetails;
	
	@Column(name = "blood_bag_details")
	private String bloodBagetails;
	
	@Column(name = "remark",columnDefinition="TEXT")
	private String remark;

	@ManyToOne(optional = false)
	@JoinColumn(name="donor_id")
	private DonorMaster donorMaster;
	
	@Column(name = "status")
	private String status="Y";
	
	@Column(name = "checkupStatus")
	private String checkupStatus="N";
	
	@Column(name = "collectionStatus")
	private String collectionStatus="N";
	
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_date", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Transient
	private Integer donorId;
	
	@OneToOne(cascade=CascadeType.ALL,mappedBy="donorTreatment")
	@LazyCollection(value=LazyCollectionOption.FALSE)
	private DonorCheckupList donorCheckupList ;
	
	@OneToOne(mappedBy="donorTreatment")
	@LazyCollection(value=LazyCollectionOption.FALSE)
	private DonorBloodBagDetails donorBloodBagDetails ;
	
	@OneToOne(mappedBy="donorTreatment")
	@LazyCollection(value=LazyCollectionOption.FALSE)
	private BloodGroupTesting bloodGroupTesting ;
	
	public Integer getDonorId() {
		return donorId;
	}

	public void setDonorId(Integer donorId) {
		this.donorId = donorId;
	}

	public Integer getDonorTreatmentId() {
		return donorTreatmentId;
	}

	public void setDonorTreatmentId(Integer donorTreatmentId) {
		this.donorTreatmentId = donorTreatmentId;
	}

	public String getDonorType() {
		return donorType;
	}

	public void setDonorType(String donorType) {
		this.donorType = donorType;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public String getPatient_type() {
		return patient_type;
	}

	public void setPatient_type(String patient_type) {
		this.patient_type = patient_type;
	}

	public String getCollection() {
		return collection;
	}

	public void setCollection(String collection) {
		this.collection = collection;
	}

	public String getOutdoorDetails() {
		return outdoorDetails;
	}

	public void setOutdoorDetails(String outdoorDetails) {
		this.outdoorDetails = outdoorDetails;
	}

	public String getBloodBagetails() {
		return bloodBagetails;
	}

	public void setBloodBagetails(String bloodBagetails) {
		this.bloodBagetails = bloodBagetails;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public DonorMaster getDonorMaster() {
		return donorMaster;
	}

	public void setDonorMaster(DonorMaster donorMaster) {
		this.donorMaster = donorMaster;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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
	@JsonIgnore
	public DonorCheckupList getDonorCheckupList() {
		return donorCheckupList;
	}

	public void setDonorCheckupList(DonorCheckupList donorCheckupList) {
		this.donorCheckupList = donorCheckupList;
	}
	@JsonIgnore
	public DonorBloodBagDetails getDonorBloodBagDetails() {
		return donorBloodBagDetails;
	}

	public void setDonorBloodBagDetails(DonorBloodBagDetails donorBloodBagDetails) {
		this.donorBloodBagDetails = donorBloodBagDetails;
	}
	@JsonIgnore
	public BloodGroupTesting getBloodGroupTesting() {
		return bloodGroupTesting;
	}

	public void setBloodGroupTesting(BloodGroupTesting bloodGroupTesting) {
		this.bloodGroupTesting = bloodGroupTesting;
	}

	public String getCheckupStatus() {
		return checkupStatus;
	}

	public void setCheckupStatus(String checkupStatus) {
		this.checkupStatus = checkupStatus;
	}

	public String getCollectionStatus() {
		return collectionStatus;
	}

	public void setCollectionStatus(String collectionStatus) {
		this.collectionStatus = collectionStatus;
	}

	
}
