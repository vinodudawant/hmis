package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
@Table(name = "pathology_lab_phlebotomymaster")
public class LabPhlebotomyMaster {
	
	@Id
	@GeneratedValue
	@Column(name = "phlebotomy_master_id")
	private Integer id;
	
    @Column(name = "sample_id")
	private String sampleType;
    
    @Column(name = "center_id")
	private int centerId;	
    
	@Column(name = "collection_date")
	private String collectionDate;
	
	@Column(name = "collection_time")
	private String collectionTime;
	
    @Column(name = "container_id")
	private int containerId;	
    
	@Column(name = "sample_quantity")
	private String sampleQuantity;	
	
	@Column(name = "sample_UnitId")
	private String sampleUnitId;
	
	@Column(name = "advice_id")
	private String adviceId;	
	
	@Column(name = "patient_id")
	private Integer patientId;	
	
	@Column(name = "labrequest_id")
	private Integer labrequestId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "test_status")
	private String teststatus;
	
	@Column(name = "accpeted_flag")
	private String accpetedflag="N";
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;	
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "coll_accepted_date")
	private String acceptedcollectionDate;
	
	@Column(name = "coll_accepted_time")
	private String acceptedcollectiontime;
	
	@Column(name = "accepted_recieved_date")
	private String acceptedrecieveddate;
	
	@Column(name = "accepted_recieved_time")
	private String acceptedrecievedtime;
	
	@Column(name = "accepted_comment")
	private String acceptedcomment;
	
	@Column(name = "rejected_reason")
	private String rejectedreason;
	
	@Column(name = "rejedted_remark")
	private String rejedtedRemark;
	
	@Column(name = "recollection_request")
	private String recollectionRequest;
	
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name="pathology_id")
	private Integer pathoId;
	

	public String getPathologyname() {
		return pathologyname;
	}
	public void setPathologyname(String pathologyname) {
		this.pathologyname = pathologyname;
	}
	public Integer getPathologyId() {
		return pathologyId;
	}
	public void setPathologyId(Integer pathologyId) {
		this.pathologyId = pathologyId;
	}
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "master_id")
	List<LabPhlebotomyMasterSalveTest> labPhlebotomyMasterSalveTest;
	
	@Transient
	private List<LabPhlebotomyMaster> phlebotomytableList;
	
	@Transient
	private String gender;
	@Transient
	private Integer age;
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public String getAccpetedflag() {
		return accpetedflag;
	}
	public void setAccpetedflag(String accpetedflag) {
		this.accpetedflag = accpetedflag;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getSampleType() {
		return sampleType;
	}
	public void setSampleType(String sampleType) {
		this.sampleType = sampleType;
	}
	public int getCenterId() {
		return centerId;
	}
	public void setCenterId(int centerId) {
		this.centerId = centerId;
	}
	public String getCollectionDate() {
		return collectionDate;
	}
	public void setCollectionDate(String collectionDate) {
		this.collectionDate = collectionDate;
	}
	public String getCollectionTime() {
		return collectionTime;
	}
	public void setCollectionTime(String collectionTime) {
		this.collectionTime = collectionTime;
	}
	public int getContainerId() {
		return containerId;
	}
	public void setContainerId(int containerId) {
		this.containerId = containerId;
	}
	public String getSampleQuantity() {
		return sampleQuantity;
	}
	public void setSampleQuantity(String sampleQuantity) {
		this.sampleQuantity = sampleQuantity;
	}
	public String getSampleUnitId() {
		return sampleUnitId;
	}
	public void setSampleUnitId(String sampleUnitId) {
		this.sampleUnitId = sampleUnitId;
	}
	public String getAdviceId() {
		return adviceId;
	}
	public void setAdviceId(String adviceId) {
		this.adviceId = adviceId;
	}
	public String getTeststatus() {
		return teststatus;
	}
	public void setTeststatus(String teststatus) {
		this.teststatus = teststatus;
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
	public List<LabPhlebotomyMaster> getPhlebotomytableList() {
		return phlebotomytableList;
	}
	public void setPhlebotomytableList(List<LabPhlebotomyMaster> phlebotomytableList) {
		this.phlebotomytableList = phlebotomytableList;
	}
	@Transient
	private Integer departmentId;	
	@Transient
	private String departmentname;
	@Transient
	private String patientname;
	@Transient
	private String samplename;
	@Transient
	private String containername;
	@Transient
	private String collectionname;
	@Transient
	private String unitname;
	@Transient
	private String pathologyname;
	@Transient
	private Integer pathologyId;
	@Transient
	private Integer profiId;
	@Transient
	private String profileName;
	@Transient
	private Integer pkgId;
	@Transient
	private String pkgName;
	@Transient
	private Integer testId;
	@Transient
	private String testName;
	@Transient
	private String dispatchDate;
	@Transient
	private String dispactchTime;
	@Transient
	private Integer outsourcemasterId;
	@Transient
	private String mId;
	@Transient
	private String machineName;
	
	public String getmId() {
		return mId;
	}
	public void setmId(String mId) {
		this.mId = mId;
	}
	public String getMachineName() {
		return machineName;
	}
	public void setMachineName(String machineName) {
		this.machineName = machineName;
	}
	public String getDispatchDate() {
		return dispatchDate;
	}
	public void setDispatchDate(String dispatchDate) {
		this.dispatchDate = dispatchDate;
	}
	public String getDispactchTime() {
		return dispactchTime;
	}
	public void setDispactchTime(String dispactchTime) {
		this.dispactchTime = dispactchTime;
	}
	public Integer getOutsourcemasterId() {
		return outsourcemasterId;
	}
	public void setOutsourcemasterId(Integer outsourcemasterId) {
		this.outsourcemasterId = outsourcemasterId;
	}
	@Transient
	private List<LabPhlebotomyMaster> testli;
	
	public List<LabPhlebotomyMaster> getTestli() {
		return testli;
	}
	public void setTestli(List<LabPhlebotomyMaster> testli) {
		this.testli = testli;
	}
	public String getUnitname() {
		return unitname;
	}
	public void setUnitname(String unitname) {
		this.unitname = unitname;
	}
	public String getPatientname() {
		return patientname;
	}
	public void setPatientname(String patientname) {
		this.patientname = patientname;
	}
	public String getSamplename() {
		return samplename;
	}
	public void setSamplename(String samplename) {
		this.samplename = samplename;
	}
	public String getContainername() {
		return containername;
	}
	public void setContainername(String containername) {
		this.containername = containername;
	}
	public String getCollectionname() {
		return collectionname;
	}
	public void setCollectionname(String collectionname) {
		this.collectionname = collectionname;
	}

	public List<LabPhlebotomyMasterSalveTest> getLabPhlebotomyMasterSalveTest() {
		return labPhlebotomyMasterSalveTest;
	}
	public void setLabPhlebotomyMasterSalveTest(List<LabPhlebotomyMasterSalveTest> labPhlebotomyMasterSalveTest) {
		this.labPhlebotomyMasterSalveTest = labPhlebotomyMasterSalveTest;
	}
	
	public String getAcceptedcollectionDate() {
		return acceptedcollectionDate;
	}
	public void setAcceptedcollectionDate(String acceptedcollectionDate) {
		this.acceptedcollectionDate = acceptedcollectionDate;
	}
	public String getAcceptedcollectiontime() {
		return acceptedcollectiontime;
	}
	public void setAcceptedcollectiontime(String acceptedcollectiontime) {
		this.acceptedcollectiontime = acceptedcollectiontime;
	}
	public String getAcceptedrecieveddate() {
		return acceptedrecieveddate;
	}
	public void setAcceptedrecieveddate(String acceptedrecieveddate) {
		this.acceptedrecieveddate = acceptedrecieveddate;
	}
	public String getAcceptedrecievedtime() {
		return acceptedrecievedtime;
	}
	public void setAcceptedrecievedtime(String acceptedrecievedtime) {
		this.acceptedrecievedtime = acceptedrecievedtime;
	}
	public String getAcceptedcomment() {
		return acceptedcomment;
	}
	public void setAcceptedcomment(String acceptedcomment) {
		this.acceptedcomment = acceptedcomment;
	}
	public String getRejectedreason() {
		return rejectedreason;
	}
	public void setRejectedreason(String rejectedreason) {
		this.rejectedreason = rejectedreason;
	}
	public String getRejedtedRemark() {
		return rejedtedRemark;
	}
	public void setRejedtedRemark(String rejedtedRemark) {
		this.rejedtedRemark = rejedtedRemark;
	}
	public String getRecollectionRequest() {
		return recollectionRequest;
	}
	public void setRecollectionRequest(String recollectionRequest) {
		this.recollectionRequest = recollectionRequest;
	}
	public Integer getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}
	public Integer getTestId() {
		return testId;
	}
	public void setTestId(Integer testId) {
		this.testId = testId;
	}
	
	public String getTestName() {
		return testName;
	}
	public void setTestName(String testName) {
		this.testName = testName;
	}
	public Integer getPathoId() {
		return pathoId;
	}
	public void setPathoId(Integer pathoId) {
		this.pathoId = pathoId;
	}
	public Integer getProfiId() {
		return profiId;
	}
	public void setProfiId(Integer profiId) {
		this.profiId = profiId;
	}
	public String getProfileName() {
		return profileName;
	}
	public void setProfileName(String profileName) {
		this.profileName = profileName;
	}
	public Integer getPkgId() {
		return pkgId;
	}
	public void setPkgId(Integer pkgId) {
		this.pkgId = pkgId;
	}
	public String getPkgName() {
		return pkgName;
	}
	public void setPkgName(String pkgName) {
		this.pkgName = pkgName;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	@Override
	public String toString() {
		return "LabPhlebotomyMaster [id=" + id + ", sampleType=" + sampleType + ", centerId=" + centerId
				+ ", collectionDate=" + collectionDate + ", collectionTime=" + collectionTime + ", containerId="
				+ containerId + ", sampleQuantity=" + sampleQuantity + ", sampleUnitId=" + sampleUnitId + ", adviceId="
				+ adviceId + ", patientId=" + patientId + ", labrequestId=" + labrequestId + ", treatmentId="
				+ treatmentId + ", teststatus=" + teststatus + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", acceptedcollectionDate=" + acceptedcollectionDate + ", acceptedcollectiontime="
				+ acceptedcollectiontime + ", acceptedrecieveddate=" + acceptedrecieveddate + ", acceptedrecievedtime="
				+ acceptedrecievedtime + ", acceptedcomment=" + acceptedcomment + ", rejectedreason=" + rejectedreason
				+ ", rejedtedRemark=" + rejedtedRemark + ", recollectionRequest=" + recollectionRequest
				+ ", createDate=" + createDate + ", updatedDate=" + updatedDate + ", labPhlebotomyMasterSalveTest="
				+ labPhlebotomyMasterSalveTest + ", phlebotomytableList=" + phlebotomytableList + ", patientname="
				+ patientname + ", samplename=" + samplename + ", containername=" + containername + ", collectionname="
				+ collectionname + ", unitname=" + unitname + "]";
	}
}