package com.hms.bloodbank.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="bb_donor_reaction")
public class DonorReaction implements Serializable{
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "reaction_id")
	private Integer donorReactionId;
	
	@Column(name = "donor_treatment_id")
	private Integer donorTreatmentId;
	
	@Column(name = "pain")
	private String pain;

	@Column(name = "allergy_reaction")
	private String allergyReaction;

	@Column(name = "outcome")
	private String outcome;

	@Column(name = "pain_details")
	private String painDetails;

	@Column(name = "allergy_reaction_details")
	private String allergyReactionDetails;

	@Column(name = "outcome_details")
	private String outcomeDetails;

	@Column(name = "remark")
	private String remark;

	@Column(name = "status")
	private String status="Y";
	
	@Column(name = "testingStatus")
	private String testingStatus="N";
	
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
	private String donor_name;
	
	@Transient
	private Integer donor_id;
	
	@Transient
	private String firstName;
	
	@Transient
	private String middleName;
	
	@Transient
	private String lastName;
	
	@Transient
	private String title;
	
	@Transient
	List<DonorReaction> lstDonorReactionDto;
	

	public Integer getDonorReactionId() {
		return donorReactionId;
	}

	public void setDonorReactionId(Integer donorReactionId) {
		this.donorReactionId = donorReactionId;
	}

	public Integer getDonorTreatmentId() {
		return donorTreatmentId;
	}

	public void setDonorTreatmentId(Integer donorTreatmentId) {
		this.donorTreatmentId = donorTreatmentId;
	}

	public String getPain() {
		return pain;
	}

	public void setPain(String pain) {
		this.pain = pain;
	}

	public String getAllergyReaction() {
		return allergyReaction;
	}

	public void setAllergyReaction(String allergyReaction) {
		this.allergyReaction = allergyReaction;
	}

	public String getOutcome() {
		return outcome;
	}

	public void setOutcome(String outcome) {
		this.outcome = outcome;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
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
	
	

	public String getPainDetails() {
		return painDetails;
	}

	public void setPainDetails(String painDetails) {
		this.painDetails = painDetails;
	}

	public String getAllergyReactionDetails() {
		return allergyReactionDetails;
	}

	public void setAllergyReactionDetails(String allergyReactionDetails) {
		this.allergyReactionDetails = allergyReactionDetails;
	}

	public String getOutcomeDetails() {
		return outcomeDetails;
	}

	public void setOutcomeDetails(String outcomeDetails) {
		this.outcomeDetails = outcomeDetails;
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
	
	

	public List<DonorReaction> getLstDonorReactionDto() {
		return lstDonorReactionDto;
	}

	public void setLstDonorReactionDto(List<DonorReaction> lstDonorReactionDto) {
		this.lstDonorReactionDto = lstDonorReactionDto;
	}

	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	

	public String getTestingStatus() {
		return testingStatus;
	}

	public void setTestingStatus(String testingStatus) {
		this.testingStatus = testingStatus;
	}

	@Override
	public String toString() {
		return "DonorReaction [donorReactionId=" + donorReactionId + ", donorTreatmentId=" + donorTreatmentId
				+ ", pain=" + pain + ", allergyReaction=" + allergyReaction + ", outcome=" + outcome + ", painDetails="
				+ painDetails + ", allergyReactionDetails=" + allergyReactionDetails + ", outcomeDetails="
				+ outcomeDetails + ", remark=" + remark + ", status=" + status + ", testingStatus=" + testingStatus
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deletedDateTime=" + deletedDateTime + ", deletedBy=" + deletedBy
				+ ", unitId=" + unitId + ", donor_name=" + donor_name + ", donor_id=" + donor_id + ", firstName="
				+ firstName + ", middleName=" + middleName + ", lastName=" + lastName + ", title=" + title
				+ ", lstDonorReactionDto=" + lstDonorReactionDto + "]";
	}

	
	

	

}
