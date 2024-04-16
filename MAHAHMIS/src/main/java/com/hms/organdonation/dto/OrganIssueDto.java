package com.hms.organdonation.dto;

import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;

@Component
@Entity
@Table(name = "organ_issue")
public class OrganIssueDto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer issueId;

	@Column(name = "blood_group_id")
	private Integer bloodGroupId;
	
	@Column(name = "container_no")
	private String containerNo;
	
	@Column(name = "available_qty")
	private Integer availableQty;
	
	@Column(name = "required_qty")
	private Integer requiredQty;
	
	@Column(name = "expiry_date")
	private String expiryDate;
	
	@Column(name = "organ_size")
	private String organSize;
	
	@Column(name = "is_organ_issued", columnDefinition = "varchar(1) default 'N'")
	private String isOrganIssued = "N";

	@Column(name = "remarks")
	private String Remarks;

	@Column(name = "deleted", columnDefinition = "varchar(2) default 'N'")
	private String deleted = "N";

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
	
/*	
	@ManyToOne(optional = false,fetch = FetchType.EAGER)
	//@JoinColumn(name="organ_id",nullable = false)
	@JoinColumn(name="organ_id")
	private IntendOrganDonorMasterDto intendOrganDonorMasterDto;
	
	@ManyToOne(optional = false,fetch = FetchType.EAGER)
	//@JoinColumn(name="organ_requester_id",nullable = false)
	@JoinColumn(name="organ_requester_id")
	private OrganRequestDto organRequestDto;
	
	@ManyToOne(optional = false,fetch = FetchType.EAGER)
	///@JoinColumn(name="organ_cross_match_id",nullable = false)
	@JoinColumn(name="organ_cross_match_id")
	private OrganCrossMatchDto organCrossMatchDto;
	
	@ManyToOne(optional = false,fetch = FetchType.EAGER)
	//@ManyToOne(optional = false,fetch = FetchType.LAZY)
	//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@JoinColumn(name="stock_inward_id")
	private OrganDonorStockInwardDto OrganDonorStockInwardDto;
	
	*/
	
	@ManyToOne(optional = false,fetch = FetchType.EAGER)
	@JoinColumn(name="organ_id",nullable = false)
	private IntendOrganDonorMasterDto intendOrganDonorMasterDto;
	
	@ManyToOne(optional = false,fetch = FetchType.EAGER)
	@JoinColumn(name="organ_requester_id",nullable = false)
	private OrganRequestDto organRequestDto;
	
	@ManyToOne(optional = false,fetch = FetchType.EAGER)
	@JoinColumn(name="organ_cross_match_id",nullable = false)
	private OrganCrossMatchDto organCrossMatchDto;
	
	@ManyToOne(optional = false,fetch = FetchType.EAGER)
	@JoinColumn(name="stock_inward_id",nullable = false)
	private OrganDonorStockInwardDto OrganDonorStockInwardDto;

	@Transient
	private List<OrganIssueDto> listOrganIssueDto;
	
	@Transient
	private String prefix;
	@Transient
	private String firstName;
	@Transient
	private String middleName;
	@Transient
	private String lastName;
	@Transient
	private String intendToDonateOrgan;
	@Transient
	private String bloodGroup;
	@Transient
	private String bodyType;
	@Transient
	private String priority;
	@Transient
	private String crossMatchDateAndTime;
	@Transient
	private String compatibilityType;
	
	@Transient
	private String donarPrefix;
	@Transient
	private String donarfirstName;
	@Transient
	private String donarmiddleName;
	@Transient
	private String donarlastName;
	
	@Transient
	Integer requestId;
	
	@Transient
	private Integer organCollectionId;
	@Transient
	private Integer donarTreatmentId;

	public Integer getIssueId() {
		return issueId;
	}

	public void setIssueId(Integer issueId) {
		this.issueId = issueId;
	}

	public Integer getBloodGroupId() {
		return bloodGroupId;
	}

	public void setBloodGroupId(Integer bloodGroupId) {
		this.bloodGroupId = bloodGroupId;
	}

	public String getContainerNo() {
		return containerNo;
	}

	public void setContainerNo(String containerNo) {
		this.containerNo = containerNo;
	}

	public Integer getAvailableQty() {
		return availableQty;
	}

	public void setAvailableQty(Integer availableQty) {
		this.availableQty = availableQty;
	}

	public Integer getRequiredQty() {
		return requiredQty;
	}

	public void setRequiredQty(Integer requiredQty) {
		this.requiredQty = requiredQty;
	}

	public String getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}

	public String getOrganSize() {
		return organSize;
	}

	public void setOrganSize(String organSize) {
		this.organSize = organSize;
	}

	public String getIsOrganIssued() {
		return isOrganIssued;
	}

	public void setIsOrganIssued(String isOrganIssued) {
		this.isOrganIssued = isOrganIssued;
	}

	public String getRemarks() {
		return Remarks;
	}

	public void setRemarks(String remarks) {
		Remarks = remarks;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public IntendOrganDonorMasterDto getIntendOrganDonorMasterDto() {
		return intendOrganDonorMasterDto;
	}

	public void setIntendOrganDonorMasterDto(
			IntendOrganDonorMasterDto intendOrganDonorMasterDto) {
		this.intendOrganDonorMasterDto = intendOrganDonorMasterDto;
	}

	public OrganRequestDto getOrganRequestDto() {
		return organRequestDto;
	}

	public void setOrganRequestDto(OrganRequestDto organRequestDto) {
		this.organRequestDto = organRequestDto;
	}

	public OrganCrossMatchDto getOrganCrossMatchDto() {
		return organCrossMatchDto;
	}

	public void setOrganCrossMatchDto(OrganCrossMatchDto organCrossMatchDto) {
		this.organCrossMatchDto = organCrossMatchDto;
	}

	public OrganDonorStockInwardDto getOrganDonorStockInwardDto() {
		return OrganDonorStockInwardDto;
	}

	public void setOrganDonorStockInwardDto(
			OrganDonorStockInwardDto organDonorStockInwardDto) {
		OrganDonorStockInwardDto = organDonorStockInwardDto;
	}

	public List<OrganIssueDto> getListOrganIssueDto() {
		return listOrganIssueDto;
	}

	public void setListOrganIssueDto(List<OrganIssueDto> listOrganIssueDto) {
		this.listOrganIssueDto = listOrganIssueDto;
	}

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
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

	@Override
	public String toString() {
		return "OrganIssueDto [issueId=" + issueId + ", bloodGroupId=" + bloodGroupId + ", containerNo=" + containerNo
				+ ", availableQty=" + availableQty + ", requiredQty=" + requiredQty + ", expiryDate=" + expiryDate
				+ ", organSize=" + organSize + ", isOrganIssued=" + isOrganIssued + ", Remarks=" + Remarks
				+ ", deleted=" + deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", createdDate="
				+ createdDate + ", updatedDate=" + updatedDate + ", deletedDateTime=" + deletedDateTime + ", deletedBy="
				+ deletedBy + ", unitId=" + unitId + ", intendOrganDonorMasterDto=" + intendOrganDonorMasterDto
				+ ", organRequestDto=" + organRequestDto + ", organCrossMatchDto=" + organCrossMatchDto
				+ ", OrganDonorStockInwardDto=" + OrganDonorStockInwardDto + ", listOrganIssueDto=" + listOrganIssueDto
				+ ", prefix=" + prefix + ", firstName=" + firstName + ", middleName=" + middleName + ", lastName="
				+ lastName + "]";
	}

	public String getIntendToDonateOrgan() {
		return intendToDonateOrgan;
	}

	public void setIntendToDonateOrgan(String intendToDonateOrgan) {
		this.intendToDonateOrgan = intendToDonateOrgan;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public String getBodyType() {
		return bodyType;
	}

	public void setBodyType(String bodyType) {
		this.bodyType = bodyType;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public Integer getRequestId() {
		return requestId;
	}

	public void setRequestId(Integer requestId) {
		this.requestId = requestId;
	}

	public Integer getOrganCollectionId() {
		return organCollectionId;
	}

	public void setOrganCollectionId(Integer organCollectionId) {
		this.organCollectionId = organCollectionId;
	}

	public Integer getDonarTreatmentId() {
		return donarTreatmentId;
	}

	public void setDonarTreatmentId(Integer donarTreatmentId) {
		this.donarTreatmentId = donarTreatmentId;
	}

	public String getCrossMatchDateAndTime() {
		return crossMatchDateAndTime;
	}

	public void setCrossMatchDateAndTime(String crossMatchDateAndTime) {
		this.crossMatchDateAndTime = crossMatchDateAndTime;
	}

	public String getCompatibilityType() {
		return compatibilityType;
	}

	public void setCompatibilityType(String compatibilityType) {
		this.compatibilityType = compatibilityType;
	}

	public String getDonarPrefix() {
		return donarPrefix;
	}

	public void setDonarPrefix(String donarPrefix) {
		this.donarPrefix = donarPrefix;
	}

	public String getDonarfirstName() {
		return donarfirstName;
	}

	public void setDonarfirstName(String donarfirstName) {
		this.donarfirstName = donarfirstName;
	}

	public String getDonarmiddleName() {
		return donarmiddleName;
	}

	public void setDonarmiddleName(String donarmiddleName) {
		this.donarmiddleName = donarmiddleName;
	}

	public String getDonarlastName() {
		return donarlastName;
	}

	public void setDonarlastName(String donarlastName) {
		this.donarlastName = donarlastName;
	}
	
	
	

}
