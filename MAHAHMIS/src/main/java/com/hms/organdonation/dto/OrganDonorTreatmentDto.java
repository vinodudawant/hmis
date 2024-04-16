package com.hms.organdonation.dto;

import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
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

import com.hms.ehat.dto.RegistrationDto;

@Entity
@Component
@Table(name = "organ_donor_treatment")
public class OrganDonorTreatmentDto {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer organDonorTreatmentId;
	
	@Column(name = "doner_type")
	private String donorType;
	
	@Column(name = "donor_type_id")
	private Integer donorTypeId;
	
	@Column(name = "intent_to_donate_id")
	private String intendToDonateOrganId;
	
	@Column(name = "donate_organ_name")
	private String donateOrganName;
	
	@Column(name = "remark",columnDefinition="TEXT")
	private String remark;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@ManyToOne(optional = false)
	@JoinColumn(name="organ_donor_id")
	private OrganDonationRegistrationDto organDonationRegistrationDto;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
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
	
	@UpdateTimestamp
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "is_treatment_closed",columnDefinition="varchar(2) default 'N'")
	private String isTreatmentClosed="N";
	
	@Column(name = "prefix")
	private String prefix;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "middle_name")
	private String middleName;

	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "contact_1")
	private String contactNo1;
	
	/*
	 * @ManyToOne(optional = false,fetch = FetchType.EAGER)
	 * 
	 * @JoinColumn(name="patient_id") private RegistrationDto patientRegistered;
	 */
	
	@Column(name = "patient_id",columnDefinition="int default 0")
	private Integer patientId;
	

	@Column(name = "intend_select_id",columnDefinition="int default 0")
	private Integer intendSelectId;
	
	@Column(name = "is_checkup",columnDefinition="varchar(2) default 'N'")
	private String isCheckup="N";// added by dayanand(9-5-2022) update after saving checkuplist form to Y
	
	@Transient
	private Integer donorId;
	
	@Transient
	private String donorName;
	
	@Transient
	private String mobile;
	
	@Transient
	private String bodySize;//Added By Annapurna
	
	
	public String getBodySize() {
		return bodySize;
	}

	public void setBodySize(String bodySize) {
		this.bodySize = bodySize;
	}

	
	@Transient
	private List<OrganDonorTreatmentDto> listOrganDonorTreatmentDto;
	
	/*@OneToOne(cascade=CascadeType.ALL,mappedBy="organDonorTreatment")
	@LazyCollection(value=LazyCollectionOption.FALSE)
	private OrganDonorCheckupListDto organDonorCheckupListDto;*/
	
	/*@OneToOne(cascade=CascadeType.ALL,mappedBy="organDonorTreatment")
	@LazyCollection(value=LazyCollectionOption.FALSE)
	private OrganDonorConsentFormDto organDonorConsentFormDto;*/
	

	public Integer getOrganDonorTreatmentId() {
		return organDonorTreatmentId;
	}

	public void setOrganDonorTreatmentId(Integer organDonorTreatmentId) {
		this.organDonorTreatmentId = organDonorTreatmentId;
	}

	public String getDonorType() {
		return donorType;
	}

	public void setDonorType(String donorType) {
		this.donorType = donorType;
	}

	public Integer getDonorTypeId() {
		return donorTypeId;
	}

	public void setDonorTypeId(Integer donorTypeId) {
		this.donorTypeId = donorTypeId;
	}

	public String getIntendToDonateOrganId() {
		return intendToDonateOrganId;
	}

	public void setIntendToDonateOrganId(String intendToDonateOrganId) {
		this.intendToDonateOrganId = intendToDonateOrganId;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public OrganDonationRegistrationDto getOrganDonationRegistrationDto() {
		return organDonationRegistrationDto;
	}

	public void setOrganDonationRegistrationDto(
			OrganDonationRegistrationDto organDonationRegistrationDto) {
		this.organDonationRegistrationDto = organDonationRegistrationDto;
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

	public Integer getDonorId() {
		return donorId;
	}

	public void setDonorId(Integer donorId) {
		this.donorId = donorId;
	}



	public List<OrganDonorTreatmentDto> getListOrganDonorTreatmentDto() {
		return listOrganDonorTreatmentDto;
	}

	public void setListOrganDonorTreatmentDto(
			List<OrganDonorTreatmentDto> listOrganDonorTreatmentDto) {
		this.listOrganDonorTreatmentDto = listOrganDonorTreatmentDto;
	}

	public String getIsTreatmentClosed() {
		return isTreatmentClosed;
	}

	public void setIsTreatmentClosed(String isTreatmentClosed) {
		this.isTreatmentClosed = isTreatmentClosed;
	}

	public String getDonateOrganName() {
		return donateOrganName;
	}

	public void setDonateOrganName(String donateOrganName) {
		this.donateOrganName = donateOrganName;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	

	public String getContactNo1() {
		return contactNo1;
	}

	public void setContactNo1(String contactNo1) {
		this.contactNo1 = contactNo1;
	}
	
	
	

	public String getDonorName() {
		return donorName;
	}

	public void setDonorName(String donorName) {
		this.donorName = donorName;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public Integer getIntendSelectId() {
		return intendSelectId;
	}

	public void setIntendSelectId(Integer intendSelectId) {
		this.intendSelectId = intendSelectId;
	}

	@Override
	public String toString() {
		return "OrganDonorTreatmentDto [organDonorTreatmentId=" + organDonorTreatmentId + ", donorType=" + donorType
				+ ", donorTypeId=" + donorTypeId + ", intendToDonateOrganId=" + intendToDonateOrganId
				+ ", donateOrganName=" + donateOrganName + ", remark=" + remark + ", organDonationRegistrationDto="
				+ organDonationRegistrationDto + ", deleted=" + deleted + ", createdBy=" + createdBy + ", updatedBy="
				+ updatedBy + ", createdDate=" + createdDate + ", updatedDate=" + updatedDate + ", deletedDateTime="
				+ deletedDateTime + ", deletedBy=" + deletedBy + ", unitId=" + unitId + ", isTreatmentClosed="
				+ isTreatmentClosed + ", prefix=" + prefix + ", firstName=" + firstName + ", middleName=" + middleName
				+ ", lastName=" + lastName + ", contactNo1=" + contactNo1 + ", patientId=" + patientId
				+ ", intendSelectId=" + intendSelectId + ", donorId=" + donorId + ", donorName=" + donorName
				+ ", mobile=" + mobile + ", listOrganDonorTreatmentDto=" + listOrganDonorTreatmentDto + "]";
	}

	public String getIsCheckup() {
		return isCheckup;
	}

	public void setIsCheckup(String isCheckup) {
		this.isCheckup = isCheckup;
	}

	
	
	
	
	

	/*public OrganDonorCheckupListDto getOrganDonorCheckupListDto() {
		return organDonorCheckupListDto;
	}

	public void setOrganDonorCheckupListDto(
			OrganDonorCheckupListDto organDonorCheckupListDto) {
		this.organDonorCheckupListDto = organDonorCheckupListDto;
	}

	public OrganDonorConsentFormDto getOrganDonorConsentFormDto() {
		return organDonorConsentFormDto;
	}

	public void setOrganDonorConsentFormDto(
			OrganDonorConsentFormDto organDonorConsentFormDto) {
		this.organDonorConsentFormDto = organDonorConsentFormDto;
	}*/
	
	

}
