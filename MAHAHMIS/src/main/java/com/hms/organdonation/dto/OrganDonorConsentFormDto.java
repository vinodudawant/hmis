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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "organ_donor_consent_form")
public class OrganDonorConsentFormDto {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
	private int consentFormId;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "donor_fname")
	private String donorFName;
	
	@Column(name = "donor_mname")
	private String donorMName;
	
	@Column(name = "donor_lname")
	private String donorLName;
	
	@Column(name = "sign_by_name")
	private String signByName;
	
	@Column(name = "ralation")
	private String relation;
	
	@Column(name = "consent_form_file")
	private String consentFormFile;
	
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
	
	@Column(name = "is_organ_collected",columnDefinition="varchar(2) default 'N'")
	private String isOrganCollected="N";
	
	@Transient
	private Integer donorId;
	
	@Transient
	private Integer organDonorTreatmentId;
	
	@Transient
	private Integer organCheckuListId;
	
	@Transient
	private List<OrganDonorConsentFormDto> lstOrganDonorConsentFormDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "organ_donor_id", nullable = false)
	private OrganDonationRegistrationDto organDonationRegistrationDto;
	
	@OneToOne(optional = false,fetch = FetchType.EAGER)
	//@JoinColumn(name = "organ_checkuplist_id", nullable = false,unique=true)
	@JoinColumn(name = "organ_checkuplist_id", nullable = false)
	private OrganDonorCheckupListDto organDonorCheckupListDto;
	
	@OneToOne(optional = false,fetch = FetchType.EAGER)
	//@JoinColumn(name="organ_donor_treatment_id",nullable = false,unique=true)
	@JoinColumn(name="organ_donor_treatment_id",nullable = false)
	private OrganDonorTreatmentDto organDonorTreatment;

	public int getConsentFormId() {
		return consentFormId;
	}

	public void setConsentFormId(int consentFormId) {
		this.consentFormId = consentFormId;
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

	public String getSignByName() {
		return signByName;
	}

	public void setSignByName(String signByName) {
		this.signByName = signByName;
	}

	public String getRelation() {
		return relation;
	}

	public void setRelation(String relation) {
		this.relation = relation;
	}

	public String getConsentFormFile() {
		return consentFormFile;
	}

	public void setConsentFormFile(String consentFormFile) {
		this.consentFormFile = consentFormFile;
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

	public String getIsOrganCollected() {
		return isOrganCollected;
	}

	public void setIsOrganCollected(String isOrganCollected) {
		this.isOrganCollected = isOrganCollected;
	}

	public Integer getDonorId() {
		return donorId;
	}

	public void setDonorId(Integer donorId) {
		this.donorId = donorId;
	}

	public List<OrganDonorConsentFormDto> getLstOrganDonorConsentFormDto() {
		return lstOrganDonorConsentFormDto;
	}

	public void setLstOrganDonorConsentFormDto(
			List<OrganDonorConsentFormDto> lstOrganDonorConsentFormDto) {
		this.lstOrganDonorConsentFormDto = lstOrganDonorConsentFormDto;
	}

	public OrganDonationRegistrationDto getOrganDonationRegistrationDto() {
		return organDonationRegistrationDto;
	}

	public void setOrganDonationRegistrationDto(
			OrganDonationRegistrationDto organDonationRegistrationDto) {
		this.organDonationRegistrationDto = organDonationRegistrationDto;
	}

	public OrganDonorCheckupListDto getOrganDonorCheckupListDto() {
		return organDonorCheckupListDto;
	}

	public void setOrganDonorCheckupListDto(
			OrganDonorCheckupListDto organDonorCheckupListDto) {
		this.organDonorCheckupListDto = organDonorCheckupListDto;
	}

	public OrganDonorTreatmentDto getOrganDonorTreatment() {
		return organDonorTreatment;
	}

	public void setOrganDonorTreatment(OrganDonorTreatmentDto organDonorTreatment) {
		this.organDonorTreatment = organDonorTreatment;
	}

	@Override
	public String toString() {
		return "OrganDonorConsentFormDto [consentFormId=" + consentFormId
				+ ", title=" + title + ", donorFName=" + donorFName
				+ ", donorMName=" + donorMName + ", donorLName=" + donorLName
				+ ", signByName=" + signByName + ", relation=" + relation
				+ ", consentFormFile=" + consentFormFile + ", remark=" + remark
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deletedDate=" + deletedDate + ", deletedBy="
				+ deletedBy + ", unitId=" + unitId + ", deleted=" + deleted
				+ ", isOrganCollected=" + isOrganCollected + ", donorId="
				+ donorId + ", lstOrganDonorConsentFormDto="
				+ lstOrganDonorConsentFormDto
				+ ", organDonationRegistrationDto="
				+ organDonationRegistrationDto + ", organDonorCheckupListDto="
				+ organDonorCheckupListDto + ", organDonorTreatment="
				+ organDonorTreatment + "]";
	}

	public Integer getOrganDonorTreatmentId() {
		return organDonorTreatmentId;
	}

	public void setOrganDonorTreatmentId(Integer organDonorTreatmentId) {
		this.organDonorTreatmentId = organDonorTreatmentId;
	}

	public Integer getOrganCheckuListId() {
		return organCheckuListId;
	}

	public void setOrganCheckuListId(Integer organCheckuListId) {
		this.organCheckuListId = organCheckuListId;
	}
	
	

}
