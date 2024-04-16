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

@Entity
@Component
@Table(name = "organ_reaction")
public class OrganReactionDto {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
	private int organReactionId;
	
	/*
	 * @Column(name = "isContainerStatus") // Added By Annapurna private String
	 * isContainerStatus="N";
	 */

	@Column(name = "prefix")
	private String prefix;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "middle_name")
	private String middleName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "pain")
	private String pain;
	
	@Column(name = "pain_remarks")
	private String painRemarks;
	
	@Column(name = "allergy_reaction")
	private String allergyReaction;
	
	@Column(name = "allergy_reaction_remarks")
	private String allergyReactionRemarks;
	
	@Column(name = "outcome")
	private String outcome;
	
	@Column(name = "organ_reaction_remarks")
	private String organReactionRemarks;
	
	//metadata
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
	
	@Column(name = "is_stock_inward",columnDefinition="varchar(2) default 'N'")
	private String isStockInward="N";
	
	
	@Transient
	private List<OrganReactionDto> listOrganReactionDto;
	
	@OneToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name="organ_collection_id",unique=true)
	private OrganCollectionDto organCollectionDto;
	
	@ManyToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name = "organ_donor_id", nullable = false)
	private OrganDonationRegistrationDto organDonationRegistrationDto;
	
	@ManyToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name = "organ_checkuplist_id", nullable = false)
	private OrganDonorCheckupListDto organDonorCheckupListDto;
	
	@ManyToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name = "organ_treatment_id", nullable = false)
	private OrganDonorTreatmentDto organDonorTreatmentDto;
	
	@Transient
	private Integer donorId;
	
	@Transient
	private String organName;
	

	@Transient
	private Date checkUpDate;

	public int getOrganReactionId() {
		return organReactionId;
	}

	public void setOrganReactionId(int organReactionId) {
		this.organReactionId = organReactionId;
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

	public String getPain() {
		return pain;
	}

	public void setPain(String pain) {
		this.pain = pain;
	}

	public String getPainRemarks() {
		return painRemarks;
	}

	public void setPainRemarks(String painRemarks) {
		this.painRemarks = painRemarks;
	}

	public String getAllergyReaction() {
		return allergyReaction;
	}

	public void setAllergyReaction(String allergyReaction) {
		this.allergyReaction = allergyReaction;
	}

	public String getAllergyReactionRemarks() {
		return allergyReactionRemarks;
	}

	public void setAllergyReactionRemarks(String allergyReactionRemarks) {
		this.allergyReactionRemarks = allergyReactionRemarks;
	}

	public String getOutcome() {
		return outcome;
	}

	public void setOutcome(String outcome) {
		this.outcome = outcome;
	}

	public String getOrganReactionRemarks() {
		return organReactionRemarks;
	}

	public void setOrganReactionRemarks(String organReactionRemarks) {
		this.organReactionRemarks = organReactionRemarks;
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

	public String getIsStockInward() {
		return isStockInward;
	}

	public void setIsStockInward(String isStockInward) {
		this.isStockInward = isStockInward;
	}

	public List<OrganReactionDto> getListOrganReactionDto() {
		return listOrganReactionDto;
	}

	public void setListOrganReactionDto(List<OrganReactionDto> listOrganReactionDto) {
		this.listOrganReactionDto = listOrganReactionDto;
	}

	public OrganCollectionDto getOrganCollectionDto() {
		return organCollectionDto;
	}

	public void setOrganCollectionDto(OrganCollectionDto organCollectionDto) {
		this.organCollectionDto = organCollectionDto;
	}

	public OrganDonationRegistrationDto getOrganDonationRegistrationDto() {
		return organDonationRegistrationDto;
	}

	public void setOrganDonationRegistrationDto(OrganDonationRegistrationDto organDonationRegistrationDto) {
		this.organDonationRegistrationDto = organDonationRegistrationDto;
	}

	public OrganDonorCheckupListDto getOrganDonorCheckupListDto() {
		return organDonorCheckupListDto;
	}

	public void setOrganDonorCheckupListDto(OrganDonorCheckupListDto organDonorCheckupListDto) {
		this.organDonorCheckupListDto = organDonorCheckupListDto;
	}

	public OrganDonorTreatmentDto getOrganDonorTreatmentDto() {
		return organDonorTreatmentDto;
	}

	public void setOrganDonorTreatmentDto(OrganDonorTreatmentDto organDonorTreatmentDto) {
		this.organDonorTreatmentDto = organDonorTreatmentDto;
	}
	
	

	public Integer getDonorId() {
		return donorId;
	}

	public void setDonorId(Integer donorId) {
		this.donorId = donorId;
	}

	
	
	public String getOrganName() {
		return organName;
	}

	public void setOrganName(String organName) {
		this.organName = organName;
	}

	public Date getCheckUpDate() {
		return checkUpDate;
	}

	public void setCheckUpDate(Date checkUpDate) {
		this.checkUpDate = checkUpDate;
	}

	@Override
	public String toString() {
		return "OrganReactionDto [organReactionId=" + organReactionId + ", prefix=" + prefix + ", firstName="
				+ firstName + ", middleName=" + middleName + ", lastName=" + lastName + ", pain=" + pain
				+ ", painRemarks=" + painRemarks + ", allergyReaction=" + allergyReaction + ", allergyReactionRemarks="
				+ allergyReactionRemarks + ", outcome=" + outcome + ", organReactionRemarks=" + organReactionRemarks
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deletedDate=" + deletedDate + ", deletedBy=" + deletedBy
				+ ", unitId=" + unitId + ", deleted=" + deleted + ", isStockInward=" + isStockInward
				+ ", listOrganReactionDto=" + listOrganReactionDto + ", organCollectionDto=" + organCollectionDto
				+ ", organDonationRegistrationDto=" + organDonationRegistrationDto + ", organDonorCheckupListDto="
				+ organDonorCheckupListDto + ", organDonorTreatmentDto=" + organDonorTreatmentDto + ", donorId="
				+ donorId + ", organName=" + organName + ", checkUpDate=" + checkUpDate + "]";
	} 
	
	
	

}
