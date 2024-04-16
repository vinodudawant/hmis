package com.hms.organdonation.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Component
@Table(name = "organ_donor_stock_inward")
public class OrganDonorStockInwardDto {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer stockInwardId;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "donor_fname")
	private String donorFName;
	
	@Column(name = "donor_mname")
	private String donorMName;
	
	@Column(name = "donor_lname")
	private String donorLName;
	
	@Column(name = "organ_id")
	private Integer organId;
	
	@Column(name = "dorgan_name")
	private String dorganName;

	@Column(name = "preservation_method_id")
	private Integer preservationMethodId;
	
	@Column(name = "preservation_method")
	private String preservationMethod;
	
	@Column(name = "collection_date_time")
	private String collectionDateTime;
	
	@Column(name = "stock_inward_date_time")
	private String stockInwardDateTime;
	
	@Column(name = "cold_ischemia_time_id")
	private Integer coldIschemiaTimeId;
	
	@Column(name = "cold_ischemia_time")
	private String coldIschemiaTime;
	
	@Column(name = "blood_group_id")
	private Integer bloodGroupId;
	
	@Column(name = "blood_group")
	private String bloodGroup;
	
	@Column(name = "body_type_id")
	private Integer bodyTypeId;
	
	@Column(name = "body_type")
	private String bodyType;
	
	@Column(name = "organ_size")
	private String organSize;
	
	@Column(name = "stock_inward_expiry_date")
	private String stockInwardExpiryDate;
	
	@Column(name = "organ_quantity")
	private Integer organQuantity; 
	
	@Column(name = "organ_available_quantity")
	private Integer organAvailableQuantity; 
	
	@Column(name = "remark")
	private String remark;
	
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
	
	@Column(name = "is_discarded",columnDefinition="varchar(2) default 'N'")
	private String isDiscarded="N";
	
	@Transient
	private Integer donorId;
	
	@Transient
	private Integer donorTreatmentId;
	
	@Transient
	private Integer organCollectionId;
	
	@Transient
	private List<OrganDonorStockInwardDto> lstOrganDonorStockInwardDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "organ_donor_id", nullable = false)
	private OrganDonationRegistrationDto organDonationRegistrationDto;
	
//	//@ManyToOne(optional = false,cascade = CascadeType.ALL)
////	@LazyCollection(value = LazyCollectionOption.FALSE)
//	@ManyToOne(optional = false,fetch = FetchType.LAZY)
//	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//	@JoinColumn(name="organ_donor_treatment_id")
//	private OrganDonorTreatmentDto organDonorTreatment;
	
	@ManyToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name="organ_donor_treatment_id")
	private OrganDonorTreatmentDto organDonorTreatment;
	
	@ManyToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name="organ_collection_id")
	private OrganCollectionDto organCollectionDto;
	
	@Column(name = "containerName")
	private String containerName;

	public String getContainerName() {
		return containerName;
	}

	public void setContainerName(String containerName) {
		this.containerName = containerName;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Integer getStockInwardId() {
		return stockInwardId;
	}

	public void setStockInwardId(Integer stockInwardId) {
		this.stockInwardId = stockInwardId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDonorFName() {
		return donorFName;
	}

	public void setDonorFName(String donorFName) {
		this.donorFName = donorFName;
	}

	public String getDonorMName() {
		return donorMName;
	}

	public void setDonorMName(String donorMName) {
		this.donorMName = donorMName;
	}

	public String getDonorLName() {
		return donorLName;
	}

	public void setDonorLName(String donorLName) {
		this.donorLName = donorLName;
	}

	public Integer getOrganId() {
		return organId;
	}

	public void setOrganId(Integer organId) {
		this.organId = organId;
	}

	public String getDorganName() {
		return dorganName;
	}

	public void setDorganName(String dorganName) {
		this.dorganName = dorganName;
	}

	public Integer getPreservationMethodId() {
		return preservationMethodId;
	}

	public void setPreservationMethodId(Integer preservationMethodId) {
		this.preservationMethodId = preservationMethodId;
	}

	public String getPreservationMethod() {
		return preservationMethod;
	}

	public void setPreservationMethod(String preservationMethod) {
		this.preservationMethod = preservationMethod;
	}

	public String getCollectionDateTime() {
		return collectionDateTime;
	}

	public void setCollectionDateTime(String collectionDateTime) {
		this.collectionDateTime = collectionDateTime;
	}

	public String getStockInwardDateTime() {
		return stockInwardDateTime;
	}

	public void setStockInwardDateTime(String stockInwardDateTime) {
		this.stockInwardDateTime = stockInwardDateTime;
	}

	public Integer getColdIschemiaTimeId() {
		return coldIschemiaTimeId;
	}

	public void setColdIschemiaTimeId(Integer coldIschemiaTimeId) {
		this.coldIschemiaTimeId = coldIschemiaTimeId;
	}

	public String getColdIschemiaTime() {
		return coldIschemiaTime;
	}

	public void setColdIschemiaTime(String coldIschemiaTime) {
		this.coldIschemiaTime = coldIschemiaTime;
	}

	public Integer getBloodGroupId() {
		return bloodGroupId;
	}

	public void setBloodGroupId(Integer bloodGroupId) {
		this.bloodGroupId = bloodGroupId;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public Integer getBodyTypeId() {
		return bodyTypeId;
	}

	public void setBodyTypeId(Integer bodyTypeId) {
		this.bodyTypeId = bodyTypeId;
	}

	public String getBodyType() {
		return bodyType;
	}

	public void setBodyType(String bodyType) {
		this.bodyType = bodyType;
	}

	public String getOrganSize() {
		return organSize;
	}

	public void setOrganSize(String organSize) {
		this.organSize = organSize;
	}

	public String getStockInwardExpiryDate() {
		return stockInwardExpiryDate;
	}

	public void setStockInwardExpiryDate(String stockInwardExpiryDate) {
		this.stockInwardExpiryDate = stockInwardExpiryDate;
	}

	public Integer getOrganQuantity() {
		return organQuantity;
	}

	public void setOrganQuantity(Integer organQuantity) {
		this.organQuantity = organQuantity;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public Integer getDonorId() {
		return donorId;
	}

	public void setDonorId(Integer donorId) {
		this.donorId = donorId;
	}

	public List<OrganDonorStockInwardDto> getLstOrganDonorStockInwardDto() {
		return lstOrganDonorStockInwardDto;
	}

	public void setLstOrganDonorStockInwardDto(
			List<OrganDonorStockInwardDto> lstOrganDonorStockInwardDto) {
		this.lstOrganDonorStockInwardDto = lstOrganDonorStockInwardDto;
	}

	public OrganDonationRegistrationDto getOrganDonationRegistrationDto() {
		return organDonationRegistrationDto;
	}

	public void setOrganDonationRegistrationDto(
			OrganDonationRegistrationDto organDonationRegistrationDto) {
		this.organDonationRegistrationDto = organDonationRegistrationDto;
	}

	public OrganDonorTreatmentDto getOrganDonorTreatment() {
		return organDonorTreatment;
	}

	public void setOrganDonorTreatment(OrganDonorTreatmentDto organDonorTreatment) {
		this.organDonorTreatment = organDonorTreatment;
	}

	public OrganCollectionDto getOrganCollectionDto() {
		return organCollectionDto;
	}

	public void setOrganCollectionDto(OrganCollectionDto organCollectionDto) {
		this.organCollectionDto = organCollectionDto;
	}

	public String getIsDiscarded() {
		return isDiscarded;
	}

	public void setIsDiscarded(String isDiscarded) {
		this.isDiscarded = isDiscarded;
	}

	public Integer getOrganAvailableQuantity() {
		return organAvailableQuantity;
	}

	public void setOrganAvailableQuantity(Integer organAvailableQuantity) {
		this.organAvailableQuantity = organAvailableQuantity;
	}

	@Override
	public String toString() {
		return "OrganDonorStockInwardDto [stockInwardId=" + stockInwardId + ", title=" + title + ", donorFName="
				+ donorFName + ", donorMName=" + donorMName + ", donorLName=" + donorLName + ", organId=" + organId
				+ ", dorganName=" + dorganName + ", preservationMethodId=" + preservationMethodId
				+ ", preservationMethod=" + preservationMethod + ", collectionDateTime=" + collectionDateTime
				+ ", stockInwardDateTime=" + stockInwardDateTime + ", coldIschemiaTimeId=" + coldIschemiaTimeId
				+ ", coldIschemiaTime=" + coldIschemiaTime + ", bloodGroupId=" + bloodGroupId + ", bloodGroup="
				+ bloodGroup + ", bodyTypeId=" + bodyTypeId + ", bodyType=" + bodyType + ", organSize=" + organSize
				+ ", stockInwardExpiryDate=" + stockInwardExpiryDate + ", organQuantity=" + organQuantity
				+ ", organAvailableQuantity=" + organAvailableQuantity + ", remark=" + remark + ", createdBy="
				+ createdBy + ", updatedBy=" + updatedBy + ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deletedDate=" + deletedDate + ", deletedBy=" + deletedBy + ", unitId=" + unitId
				+ ", deleted=" + deleted + ", isDiscarded=" + isDiscarded + ", donorId=" + donorId
				+ ", lstOrganDonorStockInwardDto=" + lstOrganDonorStockInwardDto + ", organDonationRegistrationDto="
				+ organDonationRegistrationDto + ", organDonorTreatment=" + organDonorTreatment
				+ ", organCollectionDto=" + organCollectionDto + "]";
	}

	public Integer getDonorTreatmentId() {
		return donorTreatmentId;
	}

	public void setDonorTreatmentId(Integer donorTreatmentId) {
		this.donorTreatmentId = donorTreatmentId;
	}

	public Integer getOrganCollectionId() {
		return organCollectionId;
	}

	public void setOrganCollectionId(Integer organCollectionId) {
		this.organCollectionId = organCollectionId;
	}

	
	

}
