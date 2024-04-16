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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="bb_test_register")
public class TestRegister implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "test_register_id")
	private Integer testRegisterId;
	
	@Column(name = "donor_treatment_id")
	private Integer donorTreatmentId;
	
	@Column(name = "blood_bag_no")
	private Integer bloodBagNumber;
	
	@Column(name="blood_group")
	private String bloodGroup;
	
	@Column(name = "date_bag_collection")
	private String dateOfBagCollection;
	

	@Column(name = "remark")
	private String remark;

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
	
	@Column(name="sel_component_seperation_id")
	private Integer sel_component_seperation;
	

	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "test_master_id", referencedColumnName = "test_register_id")
	private List<TestRegisterSlave> testRegisterSlave = new ArrayList<TestRegisterSlave>();
	
	@Transient
	private List<TestRegister> testRegister = new ArrayList<TestRegister>();

	@Transient
	private String test_result;
	
	@Transient
	private String testremark;
	
	@Transient
	private String date_time;
	
	@Transient
	private String test_name;
	
	@Transient
	private String donor_name;
	
	@Transient
	private Integer donor_id;
	
	@Transient
	private String bloodGroupName;
	
	public Integer getTestRegisterId() {
		return testRegisterId;
	}

	public void setTestRegisterId(Integer testRegisterId) {
		this.testRegisterId = testRegisterId;
	}

	public Integer getBloodBagNumber() {
		return bloodBagNumber;
	}

	public void setBloodBagNumber(Integer bloodBagNumber) {
		this.bloodBagNumber = bloodBagNumber;
	}

	public String getDateOfBagCollection() {
		return dateOfBagCollection;
	}

	public void setDateOfBagCollection(String dateOfBagCollection) {
		this.dateOfBagCollection = dateOfBagCollection;
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

	public Integer getDonorTreatmentId() {
		return donorTreatmentId;
	}

	public void setDonorTreatmentId(Integer donorTreatmentId) {
		this.donorTreatmentId = donorTreatmentId;
	}

	public List<TestRegisterSlave> getTestRegisterSlave() {
		return testRegisterSlave;
	}

	public void setTestRegisterSlave(List<TestRegisterSlave> testRegisterSlave) {
		this.testRegisterSlave = testRegisterSlave;
	}

	public String getTest_result() {
		return test_result;
	}

	public void setTest_result(String test_result) {
		this.test_result = test_result;
	}

	public String getTestremark() {
		return testremark;
	}

	public void setTestremark(String testremark) {
		this.testremark = testremark;
	}

	public String getDate_time() {
		return date_time;
	}

	public void setDate_time(String date_time) {
		this.date_time = date_time;
	}

	public String getTest_name() {
		return test_name;
	}

	public void setTest_name(String test_name) {
		this.test_name = test_name;
	}

	public List<TestRegister> getTestRegister() {
		return testRegister;
	}

	public void setTestRegister(List<TestRegister> testRegister) {
		this.testRegister = testRegister;
	}

	public String getDonor_name() {
		return donor_name;
	}

	public void setDonor_name(String donor_name) {
		this.donor_name = donor_name;
	}

	public Integer getDonor_id() {
		return donor_id;
	}

	public void setDonor_id(Integer donor_id) {
		this.donor_id = donor_id;
	}

	public String getBloodGroupName() {
		return bloodGroupName;
	}

	public void setBloodGroupName(String bloodGroupName) {
		this.bloodGroupName = bloodGroupName;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public Integer getSel_component_seperation() {
		return sel_component_seperation;
	}

	public void setSel_component_seperation(Integer sel_component_seperation) {
		this.sel_component_seperation = sel_component_seperation;
	}

	

	
}
