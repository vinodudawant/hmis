package com.hms.bloodbank.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@SuppressWarnings("deprecation")
@Entity
@Table(name="bb_donor_checkup_list")
public class DonorCheckupList {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 0;
	
	
	@Id
	@GeneratedValue
	@Column(name = "donor_checkup_id")
	private Integer donorCheckupId;
	
	@Column(name = "donor_felling_good")
	private Integer donorFellingGood=0;
	
	@Column(name = "donor_allergy_record")
	private Integer donorAllergyRecord=0;
	
	@Column(name = "donor_previous_health_issue")
	private Integer donorPreviousHealthIssue=0;
	
	@Column(name = "donor_any_habit")
	private String donorAnyHabit;
	
	@Column(name = "donor_weight")
	private String donorWeight;
	
	@Column(name = "donor_height")
	private String donorHeight;
	
	@Column(name = "donor_temprature")
	private String donorTemprature;
	
	@Column(name = "donor_blood_pressure")
	private String donorBloodPressure;
	
	@Column(name = "donor_pulse")
	private String donorPulse;
	
	@Column(name = "donor_hemoglobin")
	private String donorHemoglobin;
	
	@Column(name = "donor_check_up_done_by")
	private Integer donorCheckUpDoneBy=0;
	
	@Column(name = "donor_check_up_done_status")
	private String donorCheckUpDoneStatus;
	
	@Column(name = "donor_checkup_remark")
	private String donorCheckupRemark;
	
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
	private Integer deletedBy=0;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "status")
	private String status="Y";

	@OneToOne(optional = false)
	@JoinColumn(name="donor_treatment_id")
	private DonorTreatment donorTreatment;
	
	@Transient
	private Integer donorTreatmentId;
	
	@Transient
	private String doc_name;
	
	@Transient
	private String donor_name;
	
	@Transient
	private Integer donor_id;
	
	@Transient
	private String collectionStatus;
	
	@Transient
	private Integer donor_treatment_id;
	
	
	
	
	@Transient
	List<DonorCheckupList> lstDonorCheckupList;
	
	@Transient
	private String last_name;
	
	@Transient
	private String first_name;
	
	@Transient
	private String middle_name;
	
	@Transient 
	private String title;
	
	@Column(name = "donor_checkuplist_ip")
	private String ipAddress = null;
	

	public Integer getDonorCheckupId() {
		return donorCheckupId;
	}

	public void setDonorCheckupId(Integer donorCheckupId) {
		this.donorCheckupId = donorCheckupId;
	}

	public Integer getDonorFellingGood() {
		return donorFellingGood;
	}

	public void setDonorFellingGood(Integer donorFellingGood) {
		this.donorFellingGood = donorFellingGood;
	}

	public Integer getDonorAllergyRecord() {
		return donorAllergyRecord;
	}

	public void setDonorAllergyRecord(Integer donorAllergyRecord) {
		this.donorAllergyRecord = donorAllergyRecord;
	}

	public Integer getDonorPreviousHealthIssue() {
		return donorPreviousHealthIssue;
	}

	public void setDonorPreviousHealthIssue(Integer donorPreviousHealthIssue) {
		this.donorPreviousHealthIssue = donorPreviousHealthIssue;
	}

	public String getDonorAnyHabit() {
		return donorAnyHabit;
	}

	public void setDonorAnyHabit(String donorAnyHabit) {
		this.donorAnyHabit = donorAnyHabit;
	}

	public String getDonorWeight() {
		return donorWeight;
	}

	public void setDonorWeight(String donorWeight) {
		this.donorWeight = donorWeight;
	}

	public String getDonorHeight() {
		return donorHeight;
	}

	public void setDonorHeight(String donorHeight) {
		this.donorHeight = donorHeight;
	}

	public String getDonorBloodPressure() {
		return donorBloodPressure;
	}

	public void setDonorBloodPressure(String donorBloodPressure) {
		this.donorBloodPressure = donorBloodPressure;
	}

	public String getDonorPulse() {
		return donorPulse;
	}

	public void setDonorPulse(String donorPulse) {
		this.donorPulse = donorPulse;
	}

	public String getDonorHemoglobin() {
		return donorHemoglobin;
	}

	public void setDonorHemoglobin(String donorHemoglobin) {
		this.donorHemoglobin = donorHemoglobin;
	}

	public Integer getDonorCheckUpDoneBy() {
		return donorCheckUpDoneBy;
	}

	public void setDonorCheckUpDoneBy(Integer donorCheckUpDoneBy) {
		this.donorCheckUpDoneBy = donorCheckUpDoneBy;
	}

	public String getDonorCheckUpDoneStatus() {
		return donorCheckUpDoneStatus;
	}

	public void setDonorCheckUpDoneStatus(String donorCheckUpDoneStatus) {
		this.donorCheckUpDoneStatus = donorCheckUpDoneStatus;
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

	@JsonIgnore
	public DonorTreatment getDonorTreatment() {
		return donorTreatment;
	}

	public void setDonorTreatment(DonorTreatment donorTreatment) {
		this.donorTreatment = donorTreatment;
	}

	public String getDonorTemprature() {
		return donorTemprature;
	}

	public void setDonorTemprature(String donorTemprature) {
		this.donorTemprature = donorTemprature;
	}

	public String getDonorCheckupRemark() {
		return donorCheckupRemark;
	}

	public void setDonorCheckupRemark(String donorCheckupRemark) {
		this.donorCheckupRemark = donorCheckupRemark;
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

	public String getDoc_name() {
		return doc_name;
	}

	public void setDoc_name(String doc_name) {
		this.doc_name = doc_name;
	}

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

	public List<DonorCheckupList> getLstDonorCheckupList() {
		return lstDonorCheckupList;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
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

	public void setLstDonorCheckupList(List<DonorCheckupList> lstDonorCheckupList) {
		this.lstDonorCheckupList = lstDonorCheckupList;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCollectionStatus() {
		return collectionStatus;
	}

	public void setCollectionStatus(String collectionStatus) {
		this.collectionStatus = collectionStatus;
	}

	public Integer getDonor_treatment_id() {
		return donor_treatment_id;
	}

	public void setDonor_treatment_id(Integer donor_treatment_id) {
		this.donor_treatment_id = donor_treatment_id;
	}
	
	
}
