package com.hms.bloodbank.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


@SuppressWarnings("deprecation")
@Entity
@Table(name="bb_donor_master")
public class DonorMaster implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	@Id
	@GeneratedValue
	@Column(name = "donor_id")
	private Integer donorId;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "Patient_title_name")
	private String patient_title_name;
	
	public String getPatient_title_name() {
		return patient_title_name;
	}

	public void setPatient_title_name(String patient_title_name) {
		this.patient_title_name = patient_title_name;
	}

	@Column(name = "first_name")
	private String donorFname;

	@Column(name = "middle_name")
	private String donorMname;
	
	@Column(name = "last_name")
	private String donorLname;
	
	@Column(name = "address",columnDefinition="TEXT")
	private String address;
	
	@Column(name = "birth_date")
	private String birthDate;

	@Column(name = "contact_no1")
	private String contactNumber1;
	
	@Column(name = "contact_no2")
	private String contactNumber2;

	@Column(name = "occupation")
	private String occupation;
	
	@Column(name = "age")
	private String age;
	
	@Column(name = "gender")
	private String gender;
	
	@Column(name = "blood_group")
	private String bloodGroup;
	
	@Column(name = "remark",columnDefinition="TEXT")
	private String remark;
	
	@Column(name = "treatmentFlag")
	private String treatmentFlag="N";

//	@OneToMany(cascade=CascadeType.ALL,mappedBy="donorMaster",fetch=FetchType.LAZY)
	//@LazyCollection(value=LazyCollectionOption.FALSE)
	@Transient
	private List<DonorTreatment> donorTreatmentList = new ArrayList<DonorTreatment>();
	
	@Column(name = "status")
	private String status="Y";
	
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
	private Integer maxDonorTreatmentId;

	public Integer getDonorId() {
		return donorId;
	}

	public void setDonorId(Integer donorId) {
		this.donorId = donorId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}



	public String getDonorFname() {
		return donorFname;
	}

	public void setDonorFname(String donorFname) {
		this.donorFname = donorFname;
	}

	public String getDonorMname() {
		return donorMname;
	}

	public void setDonorMname(String donorMname) {
		this.donorMname = donorMname;
	}

	public String getDonorLname() {
		return donorLname;
	}

	public void setDonorLname(String donorLname) {
		this.donorLname = donorLname;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}

	public String getContactNumber1() {
		return contactNumber1;
	}

	public void setContactNumber1(String contactNumber1) {
		this.contactNumber1 = contactNumber1;
	}

	public String getContactNumber2() {
		return contactNumber2;
	}

	public void setContactNumber2(String contactNumber2) {
		this.contactNumber2 = contactNumber2;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
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

	//@JsonIgnore
	public List<DonorTreatment> getDonorTreatmentList() {
		return donorTreatmentList;
	}

	public void setDonorTreatmentList(List<DonorTreatment> donorTreatmentList) {
		this.donorTreatmentList = donorTreatmentList;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}
	
	public Integer getMaxDonorTreatmentId() {
		return maxDonorTreatmentId;
	}

	public void setMaxDonorTreatmentId(Integer maxDonorTreatmentId) {
		this.maxDonorTreatmentId = maxDonorTreatmentId;
	}

	
	public String getTreatmentFlag() {
		return treatmentFlag;
	}

	public void setTreatmentFlag(String treatmentFlag) {
		this.treatmentFlag = treatmentFlag;
	}

	@Override
	public String toString() {
		return "DonorMaster [donorId=" + donorId + ", title=" + title + ", donorFname=" + donorFname + ", donorMname="
				+ donorMname + ", donorLname=" + donorLname + ", address=" + address + ", birthDate=" + birthDate
				+ ", contactNumber1=" + contactNumber1 + ", contactNumber2=" + contactNumber2 + ", occupation="
				+ occupation + ", age=" + age + ", gender=" + gender + ", bloodGroup=" + bloodGroup + ", remark="
				+ remark + ", treatmentFlag=" + treatmentFlag + ", donorTreatmentList=" + donorTreatmentList
				+ ", status=" + status + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", createdDate="
				+ createdDate + ", updatedDate=" + updatedDate + ", deletedDateTime=" + deletedDateTime + ", deletedBy="
				+ deletedBy + ", unitId=" + unitId + ", maxDonorTreatmentId=" + maxDonorTreatmentId + "]";
	}


	
	

	
}