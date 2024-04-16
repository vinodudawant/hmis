package com.hms.pathology.dto;

import java.math.BigInteger;
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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "pathology_sample_wise_super_master")
public class PathologySampleWiseSuperMaster {
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer sampleWiseSuperMasterId;
    
	@Column(name = "patient_id")
	private Integer patientId;	
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "test_status")
	private Integer teststatus=1;
		
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
	
	@Column(name = "sample_type_id",columnDefinition="int default 0")
	private Integer sampleTypeId=0;
	
	@Column(name = "business_type",columnDefinition="int default 0")
	private Integer businessType=0;
	
	@Column(name = "customer_type",columnDefinition="int default 0")
	private Integer customerType=0;
	
	@Column(name = "customer_id",columnDefinition="int default 0")
	private Integer customerId=0;
	
	@Column(name = "collected_flag",columnDefinition="varchar(2) default 'N'")
	private String collectedFlag="N";
	
	@Column(name = "bar_code")
	private String barCode;
	
	@Column(name = "in_out_house",columnDefinition="int default 0")
	private Integer inOutHouse=0;
	
	@Column(name = "sample_count",columnDefinition="int default 0")
	private Integer sampleCount=0;
	
	@Column(name="ref_doc_id")
	private Integer refdocid;
	
	@Column(name="profile_Id")
	private Integer profileId;
	
	@Column(name="pkg_Id")
	private Integer packageId=0;
	
	@Column(name="container_Id")
	private Integer containerId;
	
	@Column(name="sample_Id")
	private Integer sampleId;
	
	@Column(name="unit_Id")
	private Integer unitId;
	@Column(name="phlebo_teststatus")
	private String phleboteststatus="U";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "collected_date",updatable=false)
	private Date collecteddatetime;	

	@Column(name = "collected_by")
	private Integer collectedBy;
	
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "rejected_date",updatable=false)
	private Date rejecteddatetime;	

	@Column(name = "rejected_by")
	private Integer rejectedBy;
	
	@Column(name="service_id")
	private Integer serviceId;
	
	@Column(name="sub_service_id")
	private Integer subServiceId;

	@Column(name = "deleted")
	private String deleted="N";
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date",updatable=false)
	private Date deleteddatetime;	

	@Column(name = "remarks")
	private String remarks;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "unauthorized_date",updatable=false)
	private Date unauthorizeddatetime;	

	@Column(name = "unauthorized_by")
	private Integer unauthorizedBy;
	
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "authorized_date",updatable=false)
	private Date authorizeddatetime;	

	@Column(name = "authorized_by")
	private Integer authorizedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "post_date",updatable=false)
	private Date postdatetime;	

	@Column(name = "post_by")
	private Integer postBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "back_accession_date",updatable=false)
	private Date backToaccessiondatetime;	

	@Column(name = "back_accession_by")
	private Integer backaccessionBy;
	
	@Column(name = "collection_date")
	private String collectionDate="";	
	
	@Column(name = "collection_time")
	private String collectionTime="";

	@Column(name="reg_ref_doc_id")
	private Integer regRefDocId;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "master_id")
	List<PathologySampleWiseMaster> pathologySampleWiseMaster;
	
	@Transient
	private List<PathologySampleWiseSuperMaster> labSampleWiseMasterDtoList;
	@Transient
	private List<PathologySampleWiseSuperMaster> testli;
	
	@Transient
	private List<PathologySampleWiseSuperMaster> proLi;	
	@Transient
	private Integer departmentId;
	@Transient
	private String patientname;
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
	private String docname;
	@Transient
	private String datetime;
	@Transient
	private String testresult;	
	@Transient
	private String methodename;	
	@Transient
	private String mobile;	
	@Transient
	private String patientgander;
	@Transient
	private Integer patientage;	
	@Transient
	private String patientmobile;	
	@Transient
	private Integer rejectreason;	
	@Transient
	private String recollectionReason;
	
	
	
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	public Integer getDeletedBy() {
		return deletedBy;
	}
	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}
	public Date getDeleteddatetime() {
		return deleteddatetime;
	}
	public void setDeleteddatetime(Date deleteddatetime) {
		this.deleteddatetime = deleteddatetime;
	}
	public Date getRejecteddatetime() {
		return rejecteddatetime;
	}
	public void setRejecteddatetime(Date rejecteddatetime) {
		this.rejecteddatetime = rejecteddatetime;
	}
	public Integer getRejectedBy() {
		return rejectedBy;
	}
	public void setRejectedBy(Integer rejectedBy) {
		this.rejectedBy = rejectedBy;
	}

	
	public List<PathologySampleWiseSuperMaster> getProLi() {
		return proLi;
	}
	public void setProLi(List<PathologySampleWiseSuperMaster> proLi) {
		this.proLi = proLi;
	}
	
	public Integer getRejectreason() {
		return rejectreason;
	}
	public void setRejectreason(Integer rejectreason) {
		this.rejectreason = rejectreason;
	}
	public String getRecollectionReason() {
		return recollectionReason;
	}
	public void setRecollectionReason(String recollectionReason) {
		this.recollectionReason = recollectionReason;
	}
	public String getPatientmobile() {
		return patientmobile;
	}
	public void setPatientmobile(String patientmobile) {
		this.patientmobile = patientmobile;
	}
	public Integer getPatientage() {
		return patientage;
	}
	public void setPatientage(Integer patientage) {
		this.patientage = patientage;
	}
	public String getPatientgander() {
		return patientgander;
	}
	public void setPatientgander(String patientgander) {
		this.patientgander = patientgander;
	}

	@Transient
	private String lowvalue;
	@Transient
	private String highvalue;
	@Transient
	private String abnormalvalue;
	@Transient
	private String masterId;	
	@Transient
	private String rowCount;
	
	@Transient
	private String labcl;
	@Transient
	private String labch;	
	@Transient
	private String nonexisthigh;
	@Transient
	private String nonexistlow;
	@Transient
	private String defaultvalue;
	
	@Transient
	private String flagmark;
	
	public String getFlagmark() {
		return flagmark;
	}
	public void setFlagmark(String flagmark) {
		this.flagmark = flagmark;
	}

	@Transient
	private String rejecttestflag;
	
	
	public String getRejecttestflag() {
		return rejecttestflag;
	}
	public void setRejecttestflag(String rejecttestflag) {
		this.rejecttestflag = rejecttestflag;
	}
	public String getLabcl() {
		return labcl;
	}
	public void setLabcl(String labcl) {
		this.labcl = labcl;
	}
	public String getLabch() {
		return labch;
	}
	public void setLabch(String labch) {
		this.labch = labch;
	}
	public String getNonexisthigh() {
		return nonexisthigh;
	}
	public void setNonexisthigh(String nonexisthigh) {
		this.nonexisthigh = nonexisthigh;
	}
	public String getNonexistlow() {
		return nonexistlow;
	}
	public void setNonexistlow(String nonexistlow) {
		this.nonexistlow = nonexistlow;
	}
	public String getDefaultvalue() {
		return defaultvalue;
	}
	public void setDefaultvalue(String defaultvalue) {
		this.defaultvalue = defaultvalue;
	}
	public Integer getPackageId() {
		return packageId;
	}
	public void setPackageId(Integer packageId) {
		this.packageId = packageId;
	}
	public Integer getTeststatus() {
		return teststatus;
	}
	public void setTeststatus(Integer teststatus) {
		this.teststatus = teststatus;
	}

	public String getMasterId() {
		return masterId;
	}
	public void setMasterId(String masterId) {
		this.masterId = masterId;
	}
	public String getLowvalue() {
		return lowvalue;
	}
	public void setLowvalue(String lowvalue) {
		this.lowvalue = lowvalue;
	}
	public String getHighvalue() {
		return highvalue;
	}
	public void setHighvalue(String highvalue) {
		this.highvalue = highvalue;
	}
	public String getAbnormalvalue() {
		return abnormalvalue;
	}
	public void setAbnormalvalue(String abnormalvalue) {
		this.abnormalvalue = abnormalvalue;
	}
	public String getMethodename() {
		return methodename;
	}
	public void setMethodename(String methodename) {
		this.methodename = methodename;
	}
	public String getTestresult() {
		return testresult;
	}
	public void setTestresult(String testresult) {
		this.testresult = testresult;
	}


	@Transient
	private String barcodenumber;	
	@Transient
	private BigInteger samplenumber;
	@Transient	
	private String containername;	
	@Transient	
	private String samplename;
	@Transient
	private String unitname;	
	@Column(name="bil_det_id")
	private Integer bilDetId;		
	@Transient
	private String gender;
	@Transient
	private String testcode;
	@Transient
	private Integer masterid;	
	@Transient
	private String testflag;
	@Transient
	private String testreason;	
	@Transient
	private String comments;	
	@Transient
	private String interpretation;	
	@Transient
	private String collecteddate;	
	@Transient
	private String postdate;
	@Transient
	private String provision;
	
	@Transient
	private String headingname;		
	@Transient
	private Integer headingId;
	
	@Transient
	private String objFormula;
	
	@Transient
	private String testReasonName;
	
	public String getTestReasonName() {
		return testReasonName;
	}
	public void setTestReasonName(String testReasonName) {
		this.testReasonName = testReasonName;
	}
	public String getObjFormula() {
		return objFormula;
	}
	public void setObjFormula(String objFormula) {
		this.objFormula = objFormula;
	}
	public Integer getHeadingId() {
		return headingId;
	}
	public void setHeadingId(Integer headingId) {
		this.headingId = headingId;
	}
	public String getHeadingname() {
		return headingname;
	}
	public void setHeadingname(String headingname) {
		this.headingname = headingname;
	}
	public String getProvision() {
		return provision;
	}
	public void setProvision(String provision) {
		this.provision = provision;
	}
	public String getCollecteddate() {
		return collecteddate;
	}
	public void setCollecteddate(String collecteddate) {
		this.collecteddate = collecteddate;
	}
	public String getPostdate() {
		return postdate;
	}
	public void setPostdate(String postdate) {
		this.postdate = postdate;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public String getInterpretation() {
		return interpretation;
	}
	public void setInterpretation(String interpretation) {
		this.interpretation = interpretation;
	}
	public String getTestreason() {
		return testreason;
	}
	public void setTestreason(String testreason) {
		this.testreason = testreason;
	}
	public String getTestflag() {
		return testflag;
	}
	public void setTestflag(String testflag) {
		this.testflag = testflag;
	}
	public Integer getMasterid() {
		return masterid;
	}
	public void setMasterid(Integer masterid) {
		this.masterid = masterid;
	}
	public String getTestcode() {
		return testcode;
	}
	public void setTestcode(String testcode) {
		this.testcode = testcode;
	}
	public List<PathologySampleWiseSuperMaster> getTestli() {
		return testli;
	}
	public void setTestli(List<PathologySampleWiseSuperMaster> testli) {
		this.testli = testli;
	}
	
	public Integer getCollectedBy() {
		return collectedBy;
	}
	public void setCollectedBy(Integer collectedBy) {
		this.collectedBy = collectedBy;
	}
	public Date getCollecteddatetime() {
		return collecteddatetime;
	}
	public void setCollecteddatetime(Date collecteddatetime) {
		this.collecteddatetime = collecteddatetime;
	}
	public String getPhleboteststatus() {
		return phleboteststatus;
	}
	public void setPhleboteststatus(String phleboteststatus) {
		this.phleboteststatus = phleboteststatus;
	}
	public Integer getUnitId() {
		return unitId;
	}
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	public String getContainername() {
		return containername;
	}
	public void setContainername(String containername) {
		this.containername = containername;
	}
	public String getSamplename() {
		return samplename;
	}
	public void setSamplename(String samplename) {
		this.samplename = samplename;
	}
	public String getUnitname() {
		return unitname;
	}
	public void setUnitname(String unitname) {
		this.unitname = unitname;
	}
	public BigInteger getSamplenumber() {
		return samplenumber;
	}
	public void setSamplenumber(BigInteger samplenumber) {
		this.samplenumber = samplenumber;
	}
	public String getBarcodenumber() {
		return barcodenumber;
	}
	public void setBarcodenumber(String barcodenumber) {
		this.barcodenumber = barcodenumber;
	}
	
	public Integer getSampleWiseSuperMasterId() {
		return sampleWiseSuperMasterId;
	}
	public void setSampleWiseSuperMasterId(Integer sampleWiseSuperMasterId) {
		this.sampleWiseSuperMasterId = sampleWiseSuperMasterId;
	}
	public Integer getPatientId() {
		return patientId;
	}
	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
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
	public Integer getSampleTypeId() {
		return sampleTypeId;
	}
	public void setSampleTypeId(Integer sampleTypeId) {
		this.sampleTypeId = sampleTypeId;
	}
	
	public String getBarCode() {
		return barCode;
	}
	public void setBarCode(String barCode) {
		this.barCode = barCode;
	}
	public Integer getInOutHouse() {
		return inOutHouse;
	}
	public void setInOutHouse(Integer inOutHouse) {
		this.inOutHouse = inOutHouse;
	}
	public Integer getSampleCount() {
		return sampleCount;
	}
	public void setSampleCount(Integer sampleCount) {
		this.sampleCount = sampleCount;
	}
	public Integer getRefdocid() {
		return refdocid;
	}
	public void setRefdocid(Integer refdocid) {
		this.refdocid = refdocid;
	}
	public Integer getProfileId() {
		return profileId;
	}
	public void setProfileId(Integer profileId) {
		this.profileId = profileId;
	}
	
	public List<PathologySampleWiseMaster> getPathologySampleWiseMaster() {
		return pathologySampleWiseMaster;
	}
	public void setPathologySampleWiseMaster(
			List<PathologySampleWiseMaster> pathologySampleWiseMaster) {
		this.pathologySampleWiseMaster = pathologySampleWiseMaster;
	}
	public List<PathologySampleWiseSuperMaster> getLabSampleWiseMasterDtoList() {
		return labSampleWiseMasterDtoList;
	}
	public void setLabSampleWiseMasterDtoList(
			List<PathologySampleWiseSuperMaster> labSampleWiseMasterDtoList) {
		this.labSampleWiseMasterDtoList = labSampleWiseMasterDtoList;
	}
	public Integer getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}
	public String getPatientname() {
		return patientname;
	}
	public void setPatientname(String patientname) {
		this.patientname = patientname;
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
	public String getDocname() {
		return docname;
	}
	public void setDocname(String docname) {
		this.docname = docname;
	}
	public String getDatetime() {
		return datetime;
	}
	public void setDatetime(String datetime) {
		this.datetime = datetime;
	}	
	public Integer getContainerId() {
		return containerId;
	}
	public void setContainerId(Integer containerId) {
		this.containerId = containerId;
	}
	public Integer getSampleId() {
		return sampleId;
	}
	public void setSampleId(Integer sampleId) {
		this.sampleId = sampleId;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public Integer getServiceId() {
		return serviceId;
	}
	public void setServiceId(Integer serviceId) {
		this.serviceId = serviceId;
	}
	public Integer getSubServiceId() {
		return subServiceId;
	}
	public void setSubServiceId(Integer subServiceId) {
		this.subServiceId = subServiceId;
	}
	public Integer getBilDetId() {
		return bilDetId;
	}
	public void setBilDetId(Integer bilDetId) {
		this.bilDetId = bilDetId;
	}
	public String getRowCount() {
		return rowCount;
	}
	public void setRowCount(String rowCount) {
		this.rowCount = rowCount;
	}
	public Date getUnauthorizeddatetime() {
		return unauthorizeddatetime;
	}
	public void setUnauthorizeddatetime(Date unauthorizeddatetime) {
		this.unauthorizeddatetime = unauthorizeddatetime;
	}
	public Integer getUnauthorizedBy() {
		return unauthorizedBy;
	}
	public void setUnauthorizedBy(Integer unauthorizedBy) {
		this.unauthorizedBy = unauthorizedBy;
	}
	public Date getAuthorizeddatetime() {
		return authorizeddatetime;
	}
	public void setAuthorizeddatetime(Date authorizeddatetime) {
		this.authorizeddatetime = authorizeddatetime;
	}
	public Integer getAuthorizedBy() {
		return authorizedBy;
	}
	public void setAuthorizedBy(Integer authorizedBy) {
		this.authorizedBy = authorizedBy;
	}
	public Date getPostdatetime() {
		return postdatetime;
	}
	public void setPostdatetime(Date postdatetime) {
		this.postdatetime = postdatetime;
	}
	public Integer getPostBy() {
		return postBy;
	}
	public void setPostBy(Integer postBy) {
		this.postBy = postBy;
	}
	public Date getBackToaccessiondatetime() {
		return backToaccessiondatetime;
	}
	public void setBackToaccessiondatetime(Date backToaccessiondatetime) {
		this.backToaccessiondatetime = backToaccessiondatetime;
	}
	public Integer getBackaccessionBy() {
		return backaccessionBy;
	}
	public void setBackaccessionBy(Integer backaccessionBy) {
		this.backaccessionBy = backaccessionBy;
	}

	
	public Integer getBusinessType() {
		return businessType;
	}
	public void setBusinessType(Integer businessType) {
		this.businessType = businessType;
	}
	public Integer getCustomerType() {
		return customerType;
	}
	public void setCustomerType(Integer customerType) {
		this.customerType = customerType;
	}
	public Integer getCustomerId() {
		return customerId;
	}
	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}
	public String getCollectedFlag() {
		return collectedFlag;
	}
	public void setCollectedFlag(String collectedFlag) {
		this.collectedFlag = collectedFlag;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	
	@Transient
	private String createdByName;
	@Transient
	private String collectedByName;
	@Transient
	private String rejectedByName;
	@Transient
	private String unauthorizedByName;
	@Transient
	private String authorizedByName;
	@Transient
	private String postByName;

	public String getCreatedByName() {
		return createdByName;
	}
	public void setCreatedByName(String createdByName) {
		this.createdByName = createdByName;
	}
	public String getCollectedByName() {
		return collectedByName;
	}
	public void setCollectedByName(String collectedByName) {
		this.collectedByName = collectedByName;
	}
	public String getRejectedByName() {
		return rejectedByName;
	}
	public void setRejectedByName(String rejectedByName) {
		this.rejectedByName = rejectedByName;
	}
	public String getUnauthorizedByName() {
		return unauthorizedByName;
	}
	public void setUnauthorizedByName(String unauthorizedByName) {
		this.unauthorizedByName = unauthorizedByName;
	}
	public String getAuthorizedByName() {
		return authorizedByName;
	}
	public void setAuthorizedByName(String authorizedByName) {
		this.authorizedByName = authorizedByName;
	}
	public String getPostByName() {
		return postByName;
	}
	public void setPostByName(String postByName) {
		this.postByName = postByName;
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
	public Integer getRegRefDocId() {
		return regRefDocId;
	}
	public void setRegRefDocId(Integer regRefDocId) {
		this.regRefDocId = regRefDocId;
	}
}