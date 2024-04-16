package com.hms.organdonation.dto;

import java.io.Serializable;
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

import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;

@SuppressWarnings("deprecation")
@Component
@Entity
@Table(name = "organ_request_registration")
public class OrganRequestDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer requestId;
	
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

	@Column(name = "contact_2")
	private String contactNo2;

	@Column(name = "age")
	private Integer age;

	@Column(name = "gender")
	private String gender;

	@Column(name = "blood_group_id")
	private Integer bloodGroupId;
	
	@Column(name = "blood_group")
	private String bloodGroup;
	
	@Column(name = "hemoglobin")
	private String hemoglobin;
	
	@Column(name = "weight")
	private Integer weight;
	
	
	@Column(name = "height")
	private Integer height;
	
	@Column(name = "ward_name")
	private String wardName;
	
	@Column(name = "bed_number")
	private String bedNumber;
	
	@Column(name = "intend_to_donate_organ_id")
	private Integer intendToDonateOrganId;
	
	@Column(name = "intend_to_donate_organ")
	private String intendToDonateOrgan;

	@Column(name = "diagnosis_with_id")
	private Integer diagnosisWithId;
	
	@Column(name = "diagnosis_with")
	private String diagnosisWith;
	
	@Column(name = "body_type")
	private String bodyType;
	
	@Column(name = "body_type_id")
	private Integer bodyTypeId;
	
	@Column(name = "body_size")
	private String bodySize;
	
	@Column(name = "referred_by_id")
	private Integer referredById;
	
	@Column(name = "referred_by_name")
	private String referredByName;
	
	@Column(name = "priority",columnDefinition = "varchar(20)")
	private String priority;

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
	
	@ManyToOne(optional = false,fetch = FetchType.EAGER)
	@JoinColumn(name="patient_id",nullable = false)
	private RegistrationDto patientRegistered;
	
	@ManyToOne(optional = false,fetch = FetchType.EAGER)
	@JoinColumn(name="treatment_id",nullable = false)
	private TreatmentDto treatmentDto;

	@Transient
	private List<OrganRequestDto> listOrganRequestDto;

	public Integer getRequestId() {
		return requestId;
	}

	public void setRequestId(Integer requestId) {
		this.requestId = requestId;
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

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public String getHemoglobin() {
		return hemoglobin;
	}

	public void setHemoglobin(String hemoglobin) {
		this.hemoglobin = hemoglobin;
	}

	public Integer getWeight() {
		return weight;
	}

	public void setWeight(Integer weight) {
		this.weight = weight;
	}

	public Integer getHeight() {
		return height;
	}

	public void setHeight(Integer height) {
		this.height = height;
	}

	public String getWardName() {
		return wardName;
	}

	public void setWardName(String wardName) {
		this.wardName = wardName;
	}

	public String getBedNumber() {
		return bedNumber;
	}

	public void setBedNumber(String bedNumber) {
		this.bedNumber = bedNumber;
	}

	public Integer getIntendToDonateOrganId() {
		return intendToDonateOrganId;
	}

	public void setIntendToDonateOrganId(Integer intendToDonateOrganId) {
		this.intendToDonateOrganId = intendToDonateOrganId;
	}

	public String getIntendToDonateOrgan() {
		return intendToDonateOrgan;
	}

	public void setIntendToDonateOrgan(String intendToDonateOrgan) {
		this.intendToDonateOrgan = intendToDonateOrgan;
	}

	public Integer getDiagnosisWithId() {
		return diagnosisWithId;
	}

	public void setDiagnosisWithId(Integer diagnosisWithId) {
		this.diagnosisWithId = diagnosisWithId;
	}

	public String getDiagnosisWith() {
		return diagnosisWith;
	}

	public void setDiagnosisWith(String diagnosisWith) {
		this.diagnosisWith = diagnosisWith;
	}

	public String getBodyType() {
		return bodyType;
	}

	public void setBodyType(String bodyType) {
		this.bodyType = bodyType;
	}

	public Integer getBodyTypeId() {
		return bodyTypeId;
	}

	public void setBodyTypeId(Integer bodyTypeId) {
		this.bodyTypeId = bodyTypeId;
	}

	public String getBodySize() {
		return bodySize;
	}

	public void setBodySize(String bodySize) {
		this.bodySize = bodySize;
	}

	public Integer getReferredById() {
		return referredById;
	}

	public void setReferredById(Integer referredById) {
		this.referredById = referredById;
	}

	public String getReferredByName() {
		return referredByName;
	}

	public void setReferredByName(String referredByName) {
		this.referredByName = referredByName;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
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

	public RegistrationDto getPatientRegistered() {
		return patientRegistered;
	}

	public void setPatientRegistered(RegistrationDto patientRegistered) {
		this.patientRegistered = patientRegistered;
	}

	public TreatmentDto getTreatmentDto() {
		return treatmentDto;
	}

	public void setTreatmentDto(TreatmentDto treatmentDto) {
		this.treatmentDto = treatmentDto;
	}

	public List<OrganRequestDto> getListOrganRequestDto() {
		return listOrganRequestDto;
	}

	public void setListOrganRequestDto(List<OrganRequestDto> listOrganRequestDto) {
		this.listOrganRequestDto = listOrganRequestDto;
	}

	@Override
	public String toString() {
		return "OrganRequestDto [requestId=" + requestId + ", prefix=" + prefix
				+ ", firstName=" + firstName + ", middleName=" + middleName
				+ ", lastName=" + lastName + ", contactNo1=" + contactNo1
				+ ", contactNo2=" + contactNo2 + ", age=" + age + ", gender="
				+ gender + ", bloodGroupId=" + bloodGroupId + ", bloodGroup="
				+ bloodGroup + ", hemoglobin=" + hemoglobin + ", weight="
				+ weight + ", height=" + height + ", wardName=" + wardName
				+ ", bedNumber=" + bedNumber + ", intendToDonateOrganId="
				+ intendToDonateOrganId + ", intendToDonateOrgan="
				+ intendToDonateOrgan + ", diagnosisWithId=" + diagnosisWithId
				+ ", diagnosisWith=" + diagnosisWith + ", bodyType=" + bodyType
				+ ", bodyTypeId=" + bodyTypeId + ", bodySize=" + bodySize
				+ ", referredById=" + referredById + ", referredByName="
				+ referredByName + ", priority=" + priority + ", Remarks="
				+ Remarks + ", deleted=" + deleted + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deletedDateTime="
				+ deletedDateTime + ", deletedBy=" + deletedBy + ", unitId="
				+ unitId + ", patientRegistered=" + patientRegistered
				+ ", treatmentDto=" + treatmentDto + ", listOrganRequestDto="
				+ listOrganRequestDto + "]";
	}

	 

}
