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
import javax.persistence.Table;
import javax.persistence.Transient;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "organ_stock_discard")
public class OrganStockDiscardDto {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer stockDiscardId;
	
	@Column(name = "organ_id")
	private Integer organId;
	
	@Column(name = "dorgan_name")
	private String dorganName;

	@Column(name = "collection_date_time")
	private String collectionDateTime;
	
	@Column(name = "stock_inward_date_time")
	private String stockInwardDateTime;
	
	@Column(name = "stock_stock_expiry_date")
	private String stockStockExpiryDate;
	
	@Column(name = "stock_discard_date")
	private String stockDiscardDate;
	
	@Column(name = "organ_discarded_quantity")
	private Integer organDiscardedQuantity; 
	
	@Column(name = "discard_athorized_by")
	private Integer discardAuthorizedBy;
	
	@Column(name = "discard_athorized_by_name")
	private String discardAuthorizedByName;
	
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
	private String prefix;
	
	@Transient
	private String firstName;
	
	@Transient
	private String middleName;
	
	@Transient
	private String lastName;
	
	@Transient
	private String bodyType;
	
	@Transient
	private Integer donorTreatmentId;
	
	@Transient
	private Integer organCollectionId;
	
	@Transient
	private List<OrganStockDiscardDto> lstOrganStockDiscardDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "organ_donor_id", nullable = false)
	private OrganDonationRegistrationDto organDonationRegistrationDto;
	
	@ManyToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name="organ_donor_treatment_id")
	private OrganDonorTreatmentDto organDonorTreatment;
	
	@ManyToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name="organ_collection_id")
	private OrganCollectionDto organCollectionDto;
	
	@ManyToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name="stock_inward_id")
	private OrganDonorStockInwardDto organDonorStockInwardDto;

	public Integer getStockDiscardId() {
		return stockDiscardId;
	}

	public void setStockDiscardId(Integer stockDiscardId) {
		this.stockDiscardId = stockDiscardId;
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

	public String getStockStockExpiryDate() {
		return stockStockExpiryDate;
	}

	public void setStockStockExpiryDate(String stockStockExpiryDate) {
		this.stockStockExpiryDate = stockStockExpiryDate;
	}

	public String getStockDiscardDate() {
		return stockDiscardDate;
	}

	public void setStockDiscardDate(String stockDiscardDate) {
		this.stockDiscardDate = stockDiscardDate;
	}

	public Integer getOrganDiscardedQuantity() {
		return organDiscardedQuantity;
	}

	public void setOrganDiscardedQuantity(Integer organDiscardedQuantity) {
		this.organDiscardedQuantity = organDiscardedQuantity;
	}

	public Integer getDiscardAuthorizedBy() {
		return discardAuthorizedBy;
	}

	public void setDiscardAuthorizedBy(Integer discardAuthorizedBy) {
		this.discardAuthorizedBy = discardAuthorizedBy;
	}

	public String getDiscardAuthorizedByName() {
		return discardAuthorizedByName;
	}

	public void setDiscardAuthorizedByName(String discardAuthorizedByName) {
		this.discardAuthorizedByName = discardAuthorizedByName;
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
	
	public String getIsDiscarded() {
		return isDiscarded;
	}

	public void setIsDiscarded(String isDiscarded) {
		this.isDiscarded = isDiscarded;
	}

	public Integer getDonorId() {
		return donorId;
	}

	public void setDonorId(Integer donorId) {
		this.donorId = donorId;
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

	public List<OrganStockDiscardDto> getLstOrganStockDiscardDto() {
		return lstOrganStockDiscardDto;
	}

	public void setLstOrganStockDiscardDto(List<OrganStockDiscardDto> lstOrganStockDiscardDto) {
		this.lstOrganStockDiscardDto = lstOrganStockDiscardDto;
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

	public OrganCollectionDto getOrganCollectionDto() {
		return organCollectionDto;
	}

	public void setOrganCollectionDto(OrganCollectionDto organCollectionDto) {
		this.organCollectionDto = organCollectionDto;
	}

	public OrganDonorStockInwardDto getOrganDonorStockInwardDto() {
		return organDonorStockInwardDto;
	}

	public void setOrganDonorStockInwardDto(OrganDonorStockInwardDto organDonorStockInwardDto) {
		this.organDonorStockInwardDto = organDonorStockInwardDto;
	}

	@Override
	public String toString() {
		return "OrganStockDiscardDto [stockDiscardId=" + stockDiscardId + ", organId=" + organId + ", dorganName="
				+ dorganName + ", collectionDateTime=" + collectionDateTime + ", stockInwardDateTime="
				+ stockInwardDateTime + ", stockStockExpiryDate=" + stockStockExpiryDate + ", stockDiscardDate="
				+ stockDiscardDate + ", organDiscardedQuantity=" + organDiscardedQuantity + ", discardAuthorizedBy="
				+ discardAuthorizedBy + ", discardAuthorizedByName=" + discardAuthorizedByName + ", remark=" + remark
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deletedDate=" + deletedDate + ", deletedBy=" + deletedBy
				+ ", unitId=" + unitId + ", deleted=" + deleted + ", isDiscarded=" + isDiscarded + ", donorId="
				+ donorId + ", prefix=" + prefix + ", firstName=" + firstName + ", middleName=" + middleName
				+ ", lastName=" + lastName + ", lstOrganStockDiscardDto=" + lstOrganStockDiscardDto
				+ ", organDonationRegistrationDto=" + organDonationRegistrationDto + ", organDonorTreatment="
				+ organDonorTreatment + ", organCollectionDto=" + organCollectionDto + ", organDonorStockInwardDto="
				+ organDonorStockInwardDto + "]";
	}

	public String getBodyType() {
		return bodyType;
	}

	public void setBodyType(String bodyType) {
		this.bodyType = bodyType;
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
