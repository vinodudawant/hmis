package com.hms.organdonation.dto;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.mortuary.dto.MortuaryMasterDto;

@Entity
@Component
@Table(name = "organ_collection")
public class OrganCollectionDto {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
	private int organCollectionId;
	
	@Column(name = "prefix")
	private String prefix;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "middle_name")
	private String middleName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "organ_id")
	private Integer organId;
	
	@Column(name = "organ_name")
	private String organName;
	
	@Column(name = "organ_quantity")
	private Integer organQuantity;
	
	@Column(name = "preservation_method_id")
	private Integer preservationMethodId;
	
	@Column(name = "collection_date_time")
	private String collectionDateTime;
	
	@Column(name = "cold_ischemia_time_id")
	private Integer coldIschemiaTimeId;
	
	@Column(name = "surgery_technique_id")
	private Integer surgeryTechniqueId;
	
	@Column(name = "collected_by_user_id")
	private Integer collectedByUserId;
	
	@Column(name = "blood_group_id")
	private Integer bloodGroupId;
	
	@Column(name = "body_type_id")
	private Integer bodyTypeId;
	
	@Column(name = "size")
	private String bodySize;
	


	public String getBodySize() {
		return bodySize;
	}

	public void setBodySize(String bodySize) {
		this.bodySize = bodySize;
	}


	@Column(name = "remarks")
	private String remarks;
	
	@Column(name = "organ_collection_document")
	private String organCollectionDocument;
	
	@Column(name = "is_organ_collected", columnDefinition="varchar(2) default 'Y'")
	private String isOrganCollected="Y";
	
	@Column(name = "is_organ_issued", columnDefinition="varchar(1) default 'N'")
	private String isOrganIssued="N";
	
	@Column(name = "is_stock_inward", columnDefinition="varchar(1) default 'N'")
	private String isStockInward="N";
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@UpdateTimestamp
	@Column(name = "deleted_date_time")
	private Date deletedDate;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@ManyToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name = "organ_donor_id", nullable = false)
	private OrganDonationRegistrationDto organDonationRegistrationDto;
	
	@ManyToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name="organ_donor_treatment_id")
	private OrganDonorTreatmentDto organDonorTreatment;
	
	@ManyToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name="organ_donor_checkup_list_id")
	private OrganDonorCheckupListDto donorCheckupList;
	
	/*
	 * @OneToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name="organ_reaction_id") private OrganReactionDto
	 * organreactiondto;
	 */
	
	@Column(name = "isContainerStatus")
	private Integer isContainerStatus=1;
	
	
	public Integer getIsContainerStatus() {
		return isContainerStatus;
	}

	public void setIsContainerStatus(Integer isContainerStatus) {
		this.isContainerStatus = isContainerStatus;
	}


	@Transient
	private List<OrganCollectionDto> listOrganCollectionDto;
	
	
	/*
	  @OneToOne(cascade=CascadeType.ALL) 
	  @JoinColumn(name="organReactionId") private OrganReactionDto
	  isContainerStatus;
	
	public OrganReactionDto getIsContainerStatus() {
		return isContainerStatus;
	}

	public void setIsContainerStatus(OrganReactionDto isContainerStatus) {
		this.isContainerStatus = isContainerStatus;
	}
	 */
	@Transient
	private String preservationMethodName;
	
	@Transient
	private String stName;
	
	

	@Transient
	private String clodIschemiaTimeName;
	
	@Transient
	private String collectedByUsrName;
	
	@Transient
	private Integer donorId;
	

	
	@Transient
	private Integer donorTreatmentId;

	public int getOrganCollectionId() {
		return organCollectionId;
	}

	public void setOrganCollectionId(int organCollectionId) {
		this.organCollectionId = organCollectionId;
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

	public Integer getOrganId() {
		return organId;
	}

	public void setOrganId(Integer organId) {
		this.organId = organId;
	}

	public Integer getPreservationMethodId() {
		return preservationMethodId;
	}

	public void setPreservationMethodId(Integer preservationMethodId) {
		this.preservationMethodId = preservationMethodId;
	}

	public String getCollectionDateTime() {
		return collectionDateTime;
	}

	public void setCollectionDateTime(String collectionDateTime) {
		this.collectionDateTime = collectionDateTime;
	}

	public Integer getColdIschemiaTimeId() {
		return coldIschemiaTimeId;
	}

	public void setColdIschemiaTimeId(Integer coldIschemiaTimeId) {
		this.coldIschemiaTimeId = coldIschemiaTimeId;
	}

	public Integer getSurgeryTechniqueId() {
		return surgeryTechniqueId;
	}

	public void setSurgeryTechniqueId(Integer surgeryTechniqueId) {
		this.surgeryTechniqueId = surgeryTechniqueId;
	}

	public Integer getCollectedByUserId() {
		return collectedByUserId;
	}

	public void setCollectedByUserId(Integer collectedByUserId) {
		this.collectedByUserId = collectedByUserId;
	}

	public Integer getBloodGroupId() {
		return bloodGroupId;
	}

	public void setBloodGroupId(Integer bloodGroupId) {
		this.bloodGroupId = bloodGroupId;
	}

	public Integer getBodyTypeId() {
		return bodyTypeId;
	}

	public void setBodyTypeId(Integer bodyTypeId) {
		this.bodyTypeId = bodyTypeId;
	}


	public String getOrganCollectionDocument() {
		return organCollectionDocument;
	}

	public void setOrganCollectionDocument(String organCollectionDocument) {
		this.organCollectionDocument = organCollectionDocument;
	}

	public String getIsOrganCollected() {
		return isOrganCollected;
	}

	public void setIsOrganCollected(String isOrganCollected) {
		this.isOrganCollected = isOrganCollected;
	}

	public String getIsOrganIssued() {
		return isOrganIssued;
	}

	public void setIsOrganIssued(String isOrganIssued) {
		this.isOrganIssued = isOrganIssued;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public OrganDonationRegistrationDto getOrganDonationRegistrationDto() {
		return organDonationRegistrationDto;
	}

	public void setOrganDonationRegistrationDto(OrganDonationRegistrationDto organDonationRegistrationDto) {
		this.organDonationRegistrationDto = organDonationRegistrationDto;
	}

	public OrganDonorTreatmentDto getOrganDonorTreatment() {
		return organDonorTreatment;
	}

	public void setOrganDonorTreatment(OrganDonorTreatmentDto organDonorTreatment) {
		this.organDonorTreatment = organDonorTreatment;
	}

	public OrganDonorCheckupListDto getDonorCheckupList() {
		return donorCheckupList;
	}

	public void setDonorCheckupList(OrganDonorCheckupListDto donorCheckupList) {
		this.donorCheckupList = donorCheckupList;
	}

	public List<OrganCollectionDto> getListOrganCollectionDto() {
		return listOrganCollectionDto;
	}

	public void setListOrganCollectionDto(List<OrganCollectionDto> listOrganCollectionDto) {
		this.listOrganCollectionDto = listOrganCollectionDto;
	}

	public String getOrganName() {
		return organName;
	}

	public void setOrganName(String organName) {
		this.organName = organName;
	}

	public Integer getOrganQuantity() {
		return organQuantity;
	}

	public void setOrganQuantity(Integer organQuantity) {
		this.organQuantity = organQuantity;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getIsStockInward() {
		return isStockInward;
	}

	public void setIsStockInward(String isStockInward) {
		this.isStockInward = isStockInward;
	}

	
	public String getPreservationMethodName() {
		return preservationMethodName;
	}

	public void setPreservationMethodName(String preservationMethodName) {
		this.preservationMethodName = preservationMethodName;
	}

	
	
	public String getStName() {
		return stName;
	}

	public void setStName(String stName) {
		this.stName = stName;
	}
	
	

	public String getClodIschemiaTimeName() {
		return clodIschemiaTimeName;
	}

	public void setClodIschemiaTimeName(String clodIschemiaTimeName) {
		this.clodIschemiaTimeName = clodIschemiaTimeName;
	}

	public String getCollectedByUsrName() {
		return collectedByUsrName;
	}

	public void setCollectedByUsrName(String collectedByUsrName) {
		this.collectedByUsrName = collectedByUsrName;
	}

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

	
	
	

	
	

}
