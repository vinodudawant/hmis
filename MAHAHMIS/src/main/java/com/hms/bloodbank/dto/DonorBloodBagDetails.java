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
@Table(name="bb_donor_blood_bag_details")
public class DonorBloodBagDetails {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 0;
	
	
	@Id
	@GeneratedValue
	@Column(name = "bloodbag_details_id")
	private Integer bloodBagDetailsId;
	
	@Column(name = "type_of_blood_bag")
	private String typeOfBloodBag;
	
	@Column(name = "blood_bag_details")
	private String bloodBagDetails;
	
	@Column(name = "blood_group")
	private String bloodGroup;
	
	@Column(name = "blood_group_name")
	private String bloodGroupname;
	
	public String getBloodGroupname() {
		return bloodGroupname;
	}

	public void setBloodGroupname(String bloodGroupname) {
		this.bloodGroupname = bloodGroupname;
	}

	@Column(name = "collected_by")
	private String collectedBy;
	
	@Column(name = "blood_item_name")
	private String bloodItemName;
	
	@Column(name = "volume_of_collection")
	private String volumeOfCollection;
	
	@Column(name = "blood_bag_details_remarks")
	private String bloodBagDetailsRemarks;
	
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
	
	@Column(name = "bloodGroupTestingStatus")
	private String bloodGroupTestingStatus="N";
	
	@Column(name = "sampleDispatchStatus")
	private String sampleDispatchStatus="N";
	
	
	public String getSampleDispatchStatus() {
		return sampleDispatchStatus;
	}

	public void setSampleDispatchStatus(String sampleDispatchStatus) {
		this.sampleDispatchStatus = sampleDispatchStatus;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getBloodGroupTestingStatus() {
		return bloodGroupTestingStatus;
	}

	public void setBloodGroupTestingStatus(String bloodGroupTestingStatus) {
		this.bloodGroupTestingStatus = bloodGroupTestingStatus;
	}

	@Column(name = "reactionStatus")
	private String reactionStatus="N";
	
	@OneToOne(optional = false)
	@JoinColumn(name="donor_treatment_id")
	private DonorTreatment donorTreatment;
	
	@Transient
	private Integer donorTreatmentId;
	
	@Column(name = "blodd_bag_details_ip")
	private String ipAddress = null;
	
	@Column(name = "sample_bag_barcode")
	private String sampleBagBarcode;
	
	@Column(name = "quantity")
	private Integer quantity=0;
	
	@Transient
	private List<DonorBloodBagDetails> listDonorBloodBagDetails;
	
	@Transient
	private String donor_name;
	
	@Transient
	private Integer donor_treatment_id;
	
	@Transient
	private Integer donor_id;
	
	
	@Transient
	private String title;
	
	@Transient
	private String Patient_title_name;
	
	public String getPatient_title_name() {
		return Patient_title_name;
	}

	public void setPatient_title_name(String patient_title_name) {
		Patient_title_name = patient_title_name;
	}

	@Transient
	private String first_name;
	
	@Transient
	private String middle_name;
	
	@Transient
	private String last_name;
	

	public Integer getBloodBagDetailsId() {
		return bloodBagDetailsId;
	}

	public void setBloodBagDetailsId(Integer bloodBagDetailsId) {
		this.bloodBagDetailsId = bloodBagDetailsId;
	}

	public String getTypeOfBloodBag() {
		return typeOfBloodBag;
	}

	public void setTypeOfBloodBag(String typeOfBloodBag) {
		this.typeOfBloodBag = typeOfBloodBag;
	}

	public String getBloodBagDetails() {
		return bloodBagDetails;
	}

	public void setBloodBagDetails(String bloodBagDetails) {
		this.bloodBagDetails = bloodBagDetails;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public String getCollectedBy() {
		return collectedBy;
	}

	public void setCollectedBy(String collectedBy) {
		this.collectedBy = collectedBy;
	}

	public String getBloodItemName() {
		return bloodItemName;
	}

	public void setBloodItemName(String bloodItemName) {
		this.bloodItemName = bloodItemName;
	}

	public String getVolumeOfCollection() {
		return volumeOfCollection;
	}

	public void setVolumeOfCollection(String volumeOfCollection) {
		this.volumeOfCollection = volumeOfCollection;
	}

	public String getBloodBagDetailsRemarks() {
		return bloodBagDetailsRemarks;
	}

	public void setBloodBagDetailsRemarks(String bloodBagDetailsRemarks) {
		this.bloodBagDetailsRemarks = bloodBagDetailsRemarks;
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

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public String getSampleBagBarcode() {
		return sampleBagBarcode;
	}

	public void setSampleBagBarcode(String sampleBagBarcode) {
		this.sampleBagBarcode = sampleBagBarcode;
	}

	public List<DonorBloodBagDetails> getListDonorBloodBagDetails() {
		return listDonorBloodBagDetails;
	}

	public void setListDonorBloodBagDetails(List<DonorBloodBagDetails> listDonorBloodBagDetails) {
		this.listDonorBloodBagDetails = listDonorBloodBagDetails;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getDonor_name() {
		return donor_name;
	}

	public void setDonor_name(String donor_name) {
		this.donor_name = donor_name;
	}

	public Integer getDonor_treatment_id() {
		return donor_treatment_id;
	}

	public void setDonor_treatment_id(Integer donor_treatment_id) {
		this.donor_treatment_id = donor_treatment_id;
	}

	public Integer getDonor_id() {
		return donor_id;
	}

	public void setDonor_id(Integer donor_id) {
		this.donor_id = donor_id;
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

	public String getReactionStatus() {
		return reactionStatus;
	}

	public void setReactionStatus(String reactionStatus) {
		this.reactionStatus = reactionStatus;
	}
	
	

}
