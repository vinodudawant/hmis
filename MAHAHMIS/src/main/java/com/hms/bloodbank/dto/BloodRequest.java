package com.hms.bloodbank.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hms.pharmacy.pojo.CashPaidSlave;

@Entity
@Table(name="bb_blood_request")
public class BloodRequest implements Serializable{
	
	private static final long serialVersionUID = 1L;
	

	@Id
	@GeneratedValue
	@Column(name = "idblood_request")
	private int bloodRequestId;
	
	@Column(name = "patient_name")
	private String patientName;
	
	@Column(name = "contact_no1")
	private String contactNo1;
	

	@Column(name = "contact_no2")
	private String contactNo2;
	
	@Column(name = "age")
	private String age;
	
	@Column(name = "gender")
	private Integer gender=0;
	
	@Column(name = "blood_group")
	private String bloodGroup;
	
	@Column(name = "haemoglobin")
	private String haemoglobin;
	
	@Column(name = "height")
	private String height;
	
	@Column(name = "Weight")
	private String weight;
	
	@Column(name = "Ward_name")
	private String wardName="-";
	
	@Column(name = "bed_number")
	private String bedNumber="-";
	
	
	
	@Column(name = "priority")
	private Integer priority;
	
	@Column(name = "remarks")
	private String remarks="-";
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_datetime", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_datetime")
	private Date updatedDate;
	
	@UpdateTimestamp
	@Column(name = "deleted_datetime")
	private Date deletedDate;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "status")
	private String status="Y";
	
	@Column(name = "ip_address")
	private String ipAddress = null;
	
	@Transient
	private List<BloodRequest> lstBloodRequest;
	
	@Column(name = "priority_name")
	private String priority_name;
	
	@Column(name = "bloodgroupname")
	private String bloodgroupname;
	
	@Column(name = "title")
	private String title;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Column(name = "patient_title")
	private String patient_title;
	
	public String getPatient_title() {
		return patient_title;
	}

	public void setPatient_title(String patient_title) {
		this.patient_title = patient_title;
	}

	public String getBloodgroupname() {
		return bloodgroupname;
	}

	public void setBloodgroupname(String bloodgroupname) {
		this.bloodgroupname = bloodgroupname;
	}

	@OneToMany(cascade=CascadeType.ALL)
	//@OneToMany
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "blood_request_master_id", referencedColumnName = "idblood_request")
	private List<BloodRequestSlave> bloodRequestSlave = new ArrayList<BloodRequestSlave>();

	public int getBloodRequestId() {
		return bloodRequestId;
	}

	public void setBloodRequestId(int bloodRequestId) {
		this.bloodRequestId = bloodRequestId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
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

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public Integer getGender() {
		return gender;
	}

	public void setGender(Integer gender) {
		this.gender = gender;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public String getHaemoglobin() {
		return haemoglobin;
	}

	public void setHaemoglobin(String haemoglobin) {
		this.haemoglobin = haemoglobin;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
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

	public Integer getPriority() {
		return priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public List<BloodRequest> getLstBloodRequest() {
		return lstBloodRequest;
	}

	public void setLstBloodRequest(List<BloodRequest> lstBloodRequest) {
		this.lstBloodRequest = lstBloodRequest;
	}

	public List<BloodRequestSlave> getBloodRequestSlave() {
		return bloodRequestSlave;
	}

	public void setBloodRequestSlave(List<BloodRequestSlave> bloodRequestSlave) {
		this.bloodRequestSlave = bloodRequestSlave;
	}

	public String getPriority_name() {
		return priority_name;
	}

	public void setPriority_name(String priority_name) {
		this.priority_name = priority_name;
	}


	
	

}
