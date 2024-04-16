package com.hms.bloodbank.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@SuppressWarnings("deprecation")
@Entity
@Table(name="bb_blood_group_testing")
public class BloodGroupTesting {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 0;
	
	
	@Id
	@GeneratedValue
	@Column(name = "blood_group_testing_id")
	private Integer bloodGroupTestingId;
	
	
	@Column(name = "blood_group")
	private Integer bloodGroup=0;
	
	@Column(name = "blood_bag_number")
	private String bloodBagNumber;
	
	@Column(name = "blood_cell_grouping")
	private String bloodCellGrouping;
	
	@Column(name = "blood_serum_grouping")
	private String bloodSerumGrouping;
	
	@Column(name = "blood_group_testing_remark")
	private String bloodGroupTestingRemark;
	
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
	
	@Column(name = "blood_group_testing_ip")
	private String ipAddress = null;

	@OneToOne(optional = false)
	@JoinColumn(name="donor_treatment_id")
	private DonorTreatment donorTreatment;
	
	@Transient
	private Integer donorTreatmentId;
	
	@Transient
	private String donor_name;
	
	@Transient
	private Integer donor_id;
	
	@Transient
	private String blood_item_name;
	
	@Transient
	private String type_of_blood_bag;
	
	@Transient
	private String volume_of_collection;
	
	@Transient
	private Date CollectedDate1;
	
	public Date getCollectedDate1() {
		return CollectedDate1;
	}

	public void setCollectedDate1(Date collectedDate1) {
		CollectedDate1 = collectedDate1;
	}



	public Date getCollectedDate() {
		return CollectedDate;
	}

	public void setCollectedDate(Date collectedDate) {
		CollectedDate = collectedDate;
	}



	@Transient
	private Date CollectedDate ;
	@Transient
	private String blood_bag_details_remarks;
	
	
	
	public String getBlood_item_name() {
		return blood_item_name;
	}

	public void setBlood_item_name(String blood_item_name) {
		this.blood_item_name = blood_item_name;
	}

	public String getType_of_blood_bag() {
		return type_of_blood_bag;
	}

	public void setType_of_blood_bag(String type_of_blood_bag) {
		this.type_of_blood_bag = type_of_blood_bag;
	}

	public String getVolume_of_collection() {
		return volume_of_collection;
	}

	public void setVolume_of_collection(String volume_of_collection) {
		this.volume_of_collection = volume_of_collection;
	}

	
	public String getBlood_bag_details_remarks() {
		return blood_bag_details_remarks;
	}

	public void setBlood_bag_details_remarks(String blood_bag_details_remarks) {
		this.blood_bag_details_remarks = blood_bag_details_remarks;
	}

	@Transient
	List<BloodGroupTesting> lstBloodGroupTestingDto;
	

	public String getDonor_name() {
		return donor_name;
	}

	public void setDonor_name(String donor_name) {
		this.donor_name = donor_name;
	}

	public Integer getDonor_id() {
		return donor_id;
	}

	public void setDonor_id(Integer donor_id) {
		this.donor_id = donor_id;
	}

	public Integer getBloodGroupTestingId() {
		return bloodGroupTestingId;
	}

	public void setBloodGroupTestingId(Integer bloodGroupTestingId) {
		this.bloodGroupTestingId = bloodGroupTestingId;
	}


	public Integer getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(Integer bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public String getBloodCellGrouping() {
		return bloodCellGrouping;
	}

	public void setBloodCellGrouping(String bloodCellGrouping) {
		this.bloodCellGrouping = bloodCellGrouping;
	}

	public String getBloodSerumGrouping() {
		return bloodSerumGrouping;
	}

	public void setBloodSerumGrouping(String bloodSerumGrouping) {
		this.bloodSerumGrouping = bloodSerumGrouping;
	}

	public String getBloodGroupTestingRemark() {
		return bloodGroupTestingRemark;
	}

	public void setBloodGroupTestingRemark(String bloodGroupTestingRemark) {
		this.bloodGroupTestingRemark = bloodGroupTestingRemark;
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

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public DonorTreatment getDonorTreatment() {
		return donorTreatment;
	}

	public void setDonorTreatment(DonorTreatment donorTreatment) {
		this.donorTreatment = donorTreatment;
	}

	public Integer getDonorTreatmentId() {
		return donorTreatmentId;
	}

	public void setDonorTreatmentId(Integer donorTreatmentId) {
		this.donorTreatmentId = donorTreatmentId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getBloodBagNumber() {
		return bloodBagNumber;
	}

	public void setBloodBagNumber(String bloodBagNumber) {
		this.bloodBagNumber = bloodBagNumber;
	}

	public List<BloodGroupTesting> getLstBloodGroupTestingDto() {
		return lstBloodGroupTestingDto;
	}

	public void setLstBloodGroupTestingDto(List<BloodGroupTesting> lstBloodGroupTestingDto) {
		this.lstBloodGroupTestingDto = lstBloodGroupTestingDto;
	}
	

}
