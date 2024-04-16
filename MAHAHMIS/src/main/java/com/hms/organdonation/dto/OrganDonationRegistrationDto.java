package com.hms.organdonation.dto;
import java.io.Serializable;
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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import jdk.nashorn.internal.ir.annotations.Ignore;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hms.ehat.dto.RegistrationDto;

@SuppressWarnings("deprecation")
@Component
@Entity
@Table(name = "organ_donation_registration")
public class OrganDonationRegistrationDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@Column(name = "donor_typeId")
	private Integer donorTypeId;
	
	@Column(name = "donor_type")
	private String donorType;
	
	@Column(name = "intend_to_donate")
	private String intendToDonate;
	
	@Column(name = "prefix")
	private String prefix;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "middle_name")
	private String middleName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "birthdate")
//	private Date birthDate;
	private String birthDate;

	@Column(name = "address")
	private String address;

	@Column(name = "city_id")
	private Integer cityId;

	@Column(name = "district_id")
	private Integer districtId;

	@Column(name = "state_id")
	private Integer stateId;

	@Column(name = "occupation")
	private String occupation;

	@Column(name = "contact_1")
	private String contactNo1;

	@Column(name = "contact_2")
	private String contactNo2;

	@Column(name = "age")
	private Integer age;

	@Column(name = "gender")
	private String gender;

	@Column(name = "blood_group_id")
	private Integer bloodGroupId;

	@Column(name = "body_size")
	private String bodySize;

	@Column(name = "body_type")
	private String bodyType;

	@Column(name = "identity_card")
	private String identityCard;

	@Column(name = "intend_to_donate_organ_id")
	private String intendToDonateOrganId;
	
	@Column(name = "donate_organ_name")
	private String donateOrganName;

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
	
	@Column(name = "is_treatment_generated",columnDefinition="varchar(2) default 'N'")
	private String isTreatmentGenerated="N";
	
	
	
	/*
	 * @OneToOne(optional = false,fetch = FetchType.EAGER)
	 * 
	 * @JoinColumn(name="patient_id",nullable = false) private RegistrationDto
	 * patientRegistered;
	 */
	
	@Column(name = "patient_id",columnDefinition="int default 0")
	private Integer patientId;
	
	@Column(name = "proof_id",columnDefinition="int default 0")
	private Integer proofId;
	
	@Column(name = "intend_select_id",columnDefinition="int default 0")
	private Integer intendSelectId;
	
	
	
	@Transient
	private List<OrganDonationRegistrationDto> listOrganDonationRegistrationDto;
	
	@Transient
	private String donorName;
	
	@Transient
	private String mobile;
	
	@Transient
	private List<OrganDonorTreatmentDto> organDonorTreatmentDtoList;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getDonorTypeId() {
		return donorTypeId;
	}

	public void setDonorTypeId(Integer donorTypeId) {
		this.donorTypeId = donorTypeId;
	}

	public String getDonorType() {
		return donorType;
	}

	public void setDonorType(String donorType) {
		this.donorType = donorType;
	}

	public String getIntendToDonate() {
		return intendToDonate;
	}

	public void setIntendToDonate(String intendToDonate) {
		this.intendToDonate = intendToDonate;
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

	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getCityId() {
		return cityId;
	}

	public void setCityId(Integer cityId) {
		this.cityId = cityId;
	}

	public Integer getDistrictId() {
		return districtId;
	}

	public void setDistrictId(Integer districtId) {
		this.districtId = districtId;
	}

	public Integer getStateId() {
		return stateId;
	}

	public void setStateId(Integer stateId) {
		this.stateId = stateId;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public String getContactNo1() {
		return contactNo1;
	}

	public void setContactNo1(String contactNo1) {
		this.contactNo1 = contactNo1;
	}

	public String getContactNo2() {
		return contactNo2;
	}

	public void setContactNo2(String contactNo2) {
		this.contactNo2 = contactNo2;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Integer getBloodGroupId() {
		return bloodGroupId;
	}

	public void setBloodGroupId(Integer bloodGroupId) {
		this.bloodGroupId = bloodGroupId;
	}

	public String getBodySize() {
		return bodySize;
	}

	public void setBodySize(String bodySize) {
		this.bodySize = bodySize;
	}

	public String getBodyType() {
		return bodyType;
	}

	public void setBodyType(String bodyType) {
		this.bodyType = bodyType;
	}

	public String getIdentityCard() {
		return identityCard;
	}

	public void setIdentityCard(String identityCard) {
		this.identityCard = identityCard;
	}

	public String getIntendToDonateOrganId() {
		return intendToDonateOrganId;
	}

	public void setIntendToDonateOrganId(String intendToDonateOrganId) {
		this.intendToDonateOrganId = intendToDonateOrganId;
	}

	public String getDonateOrganName() {
		return donateOrganName;
	}

	public void setDonateOrganName(String donateOrganName) {
		this.donateOrganName = donateOrganName;
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

	

	public List<OrganDonationRegistrationDto> getListOrganDonationRegistrationDto() {
		return listOrganDonationRegistrationDto;
	}

	public void setListOrganDonationRegistrationDto(
			List<OrganDonationRegistrationDto> listOrganDonationRegistrationDto) {
		this.listOrganDonationRegistrationDto = listOrganDonationRegistrationDto;
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

	public List<OrganDonorTreatmentDto> getOrganDonorTreatmentDtoList() {
		return organDonorTreatmentDtoList;
	}

	public void setOrganDonorTreatmentDtoList(
			List<OrganDonorTreatmentDto> organDonorTreatmentDtoList) {
		this.organDonorTreatmentDtoList = organDonorTreatmentDtoList;
	}

	public String getIsTreatmentGenerated() {
		return isTreatmentGenerated;
	}

	public void setIsTreatmentGenerated(String isTreatmentGenerated) {
		this.isTreatmentGenerated = isTreatmentGenerated;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}
	
	

	public Integer getProofId() {
		return proofId;
	}

	public void setProofId(Integer proofId) {
		this.proofId = proofId;
	}

	public Integer getIntendSelectId() {
		return intendSelectId;
	}

	public void setIntendSelectId(Integer intendSelectId) {
		this.intendSelectId = intendSelectId;
	}

	@Override
	public String toString() {
		return "OrganDonationRegistrationDto [id=" + id + ", donorTypeId=" + donorTypeId + ", donorType=" + donorType
				+ ", intendToDonate=" + intendToDonate + ", prefix=" + prefix + ", firstName=" + firstName
				+ ", middleName=" + middleName + ", lastName=" + lastName + ", birthDate=" + birthDate + ", address="
				+ address + ", cityId=" + cityId + ", districtId=" + districtId + ", stateId=" + stateId
				+ ", occupation=" + occupation + ", contactNo1=" + contactNo1 + ", contactNo2=" + contactNo2 + ", age="
				+ age + ", gender=" + gender + ", bloodGroupId=" + bloodGroupId + ", bodySize=" + bodySize
				+ ", bodyType=" + bodyType + ", identityCard=" + identityCard + ", intendToDonateOrganId="
				+ intendToDonateOrganId + ", donateOrganName=" + donateOrganName + ", Remarks=" + Remarks + ", deleted="
				+ deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deletedDateTime=" + deletedDateTime + ", deletedBy=" + deletedBy
				+ ", unitId=" + unitId + ", isTreatmentGenerated=" + isTreatmentGenerated + ", patientId=" + patientId
				+ ", listOrganDonationRegistrationDto=" + listOrganDonationRegistrationDto + ", donorName=" + donorName
				+ ", mobile=" + mobile + ", organDonorTreatmentDtoList=" + organDonorTreatmentDtoList + "]";
	}

	
	
	

	
}
