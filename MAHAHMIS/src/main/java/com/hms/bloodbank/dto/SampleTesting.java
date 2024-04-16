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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@SuppressWarnings("deprecation")
@Entity
@JsonIgnoreProperties
@Table(name="bb_bloodrequest_sample_testing")
public class SampleTesting implements Serializable {
	
private static final long serialVersionUID = 1L;
	
	
	@Id
	@GeneratedValue
	@Column(name = "sample_testing_id")
	private Integer sampletestingid;
	
	
	@Column(name = "blood_requestid")
	private Integer bloodRequestId=0;
		
	@Column(name = "test_id") 
	private Integer testId=0;
	
	/*
	 * @Column(name = "test_name") private String testName;
	 * 
	 * @Column(name = "result") private String result;
	 * 
	 * @Column(name = "date") private String date;
	 * 
	 * @Column(name = "remark") private String remark;
	 */
	


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
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_datetime")
	private Date deletedDate;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "status")
	private String status="Y";
	
	@Column(name = "ip")
	private String ipAddress = null;
	
	@Column(name = "deleted")
	private String deleted = "N";
	
	@Transient
	private List<SampleTesting> listsampleTesting=new ArrayList<SampleTesting>();;
	
	@Transient
	private String patientName;
	
	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	@Transient
	private String testName;
	
	@Transient
	private String result;
	
	@Transient
	private String date_time;
	
	@Transient
	private String date;
	
	@Transient
	private String remark;
	
	@Transient
	private String contactNo1;
	
	@Transient
	private String contactNo2;
	
	@Transient
	private String age;
	
	@Transient
	private Integer gender;
	
	@Transient
	private String blood_group;
	
	@Transient
	private String haemoglobin;

	@Transient
	private String height;
	
	@Transient
	private String Weight;
	
	@Transient
	private String wardName;
	
	@Transient
	private String bedNumber;
	
	@Transient
	private String bloodGroup;
	
	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}
 
	@Transient
	private String bloodgroupname;
	

	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "sampletest_master_id", referencedColumnName = "sample_testing_id")
	private List<SampleTesting_Slave> sampleTesting_Slave = new ArrayList<SampleTesting_Slave>();

 
	public Integer getTestId() {
		return testId;
	}

	public String getBloodgroupname() {
		return bloodgroupname;
	}

	public void setBloodgroupname(String bloodgroupname) {
		this.bloodgroupname = bloodgroupname;
	}

	public void setTestId(Integer testId) {
		this.testId = testId;
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

	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getDate_time() {
		return date_time;
	}

	public void setDate_time(String date_time) {
		this.date_time = date_time;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public String getBlood_group() {
		return blood_group;
	}

	public void setBlood_group(String blood_group) {
		this.blood_group = blood_group;
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
		return Weight;
	}

	public void setWeight(String weight) {
		Weight = weight;
	}

	

	public List<SampleTesting_Slave> getSampleTesting_Slave() {
		return sampleTesting_Slave;
	}

	public void setSampleTesting_Slave(List<SampleTesting_Slave> sampleTesting_Slave) {
		this.sampleTesting_Slave = sampleTesting_Slave;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	
	public Integer getSampletestingid() {
		return sampletestingid;
	}

	public void setSampletestingid(Integer sampletestingid) {
		this.sampletestingid = sampletestingid;
	}

	

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getBloodRequestId() {
		return bloodRequestId;
	}

	public void setBloodRequestId(Integer bloodRequestId) {
		this.bloodRequestId = bloodRequestId;
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

	public List<SampleTesting> getListsampleTesting() {
		return listsampleTesting;
	}

	public void setListsampleTesting(List<SampleTesting> listsampleTesting) {
		this.listsampleTesting = listsampleTesting;
	}

	

	

}
