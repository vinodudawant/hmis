package com.hms.ehat.dto;
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

@Entity
@Table(name = "pathology_lab_phlebotomy_test_salve")
public class LabPhlebotomyMasterSalveTest {
	
	@Id
	@GeneratedValue	
	@Column(name = "phlebotomy_test_id")
	private Integer phlebotomyprofiletestid;	
	@Column(name = "profile_Id")
	private Integer profileId;
	
	@Column(name = "package_id")
	private Integer packageId;
   
	@Column(name = "test_id")
	private Integer testid;	
	@Column(name = "test_flag")	
	private String testflag;
	@Column(name = "test_result")	
	private String testResult;
	
	@Column(name = "patient_id")
	private Integer patientId;	
	
	@Column(name = "labrequest_id")
	private Integer labrequestId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;	
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;	
	@Column(name = "updated_by")
	private Integer updatedBy;	
	@CreationTimestamp
	@Column(name = "created_date_time",updatable=false)
	private Date createDate;
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;		
	
	@Column(name="low_value")
	private String lowvalue;
	
	@Column(name="critical_low_value")
	private String criticallowvalue;
	
	@Column(name="critical_high_value")
	private String criticalhighvalue;
	
	@Column(name="high_values")
	private String highvalues;
	@Transient
	private List<LabPhlebotomyMasterSalveTest> phlebotomytableListTestsalve;
	public Integer getPhlebotomyprofiletestid() {
		return phlebotomyprofiletestid;
	}
	public void setPhlebotomyprofiletestid(Integer phlebotomyprofiletestid) {
		this.phlebotomyprofiletestid = phlebotomyprofiletestid;
	}
	public String getLowvalue() {
		return lowvalue;
	}
	public void setLowvalue(String lowvalue) {
		this.lowvalue = lowvalue;
	}
	public String getCriticallowvalue() {
		return criticallowvalue;
	}
	public void setCriticallowvalue(String criticallowvalue) {
		this.criticallowvalue = criticallowvalue;
	}
	public String getCriticalhighvalue() {
		return criticalhighvalue;
	}
	public void setCriticalhighvalue(String criticalhighvalue) {
		this.criticalhighvalue = criticalhighvalue;
	}
	public String getHighvalues() {
		return highvalues;
	}
	public void setHighvalues(String highvalues) {
		this.highvalues = highvalues;
	}
	public Integer getPackageId() {
		return packageId;
	}
	public void setPackageId(Integer packageId) {
		this.packageId = packageId;
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
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getUpdatedDate() {
		return updatedDate;
	}
	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}
	
	public Integer getProfileId() {
		return profileId;
	}
	public void setProfileId(Integer profileId) {
		this.profileId = profileId;
	}
	public Integer getTestid() {
		return testid;
	}
	public void setTestid(Integer testid) {
		this.testid = testid;
	}
	public String getTestflag() {
		return testflag;
	}
	public void setTestflag(String testflag) {
		this.testflag = testflag;
	}
	public String getTestResult() {
		return testResult;
	}
	public void setTestResult(String testResult) {
		this.testResult = testResult;
	}
	public List<LabPhlebotomyMasterSalveTest> getPhlebotomytableListTestsalve() {
		return phlebotomytableListTestsalve;
	}
	public void setPhlebotomytableListTestsalve(
			List<LabPhlebotomyMasterSalveTest> phlebotomytableListTestsalve) {
		this.phlebotomytableListTestsalve = phlebotomytableListTestsalve;
	}
	

	@Transient
	private Integer barcodeId;

	public Integer getBarcodeId() {
		return barcodeId;
	}
	public void setBarcodeId(Integer barcodeId) {
		this.barcodeId = barcodeId;
	}
	public Integer getPatientId() {
		return patientId;
	}
	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}
	public Integer getLabrequestId() {
		return labrequestId;
	}
	public void setLabrequestId(Integer labrequestId) {
		this.labrequestId = labrequestId;
	}
	public Integer getTreatmentId() {
		return treatmentId;
	}
	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}
	@Override
	public String toString() {
		return "LabPhlebotomyMasterSalveTest [phlebotomyprofiletestid=" + phlebotomyprofiletestid + ", profileId="
				+ profileId + ", packageId=" + packageId + ", testid=" + testid + ", testflag=" + testflag
				+ ", testResult=" + testResult + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", createDate=" + createDate + ", updatedDate=" + updatedDate + ", phlebotomytableListTestsalve="
				+ phlebotomytableListTestsalve + "]";
	}
}