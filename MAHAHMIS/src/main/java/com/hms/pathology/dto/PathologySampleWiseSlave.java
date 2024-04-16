package com.hms.pathology.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "pathology_sample_wise_slave")
public class PathologySampleWiseSlave {
	
	@Id
	@GeneratedValue	
	@Column(name = "id")
	private Integer sampleWiseSlaveId;	
	
	@Column(name = "profile_Id")
	private Integer profileId;
	
	@Column(name = "package_id")
	private Integer packageId = 0;
   
	@Column(name = "test_id")
	private Integer testid;	
	@Column(name = "test_flag")	
	private String testflag = "N";
	@Column(name = "test_result")	
	private String testResult;
	
	@Column(name = "patient_id")
	private Integer patientId;	
	
	@Column(name = "treatment_id")
	private Integer treatmentId;	
	
	@Column(name = "unit_id")
	private Integer unitId;		
	
	@Column(name = "test_reason",columnDefinition="LONGTEXT")	
	private String testReason;
	
	@Column(name = "flag_mark")	
	private String flagMark;

	@Column(name = "re_collection_reason")	
	private String recollectionreason;
	
	@Column(name = "reject_test_reason")	
	private Integer rejectTestReason;
	
	@Column(name = "unReject_test_reason")	
	private Integer unRejectTestReason;
	
	@Column(name = "re_collection")	
	private String recollection = "N";
	
	@Column(name = "expression")	
	private String expression;
	
	@Column(name = "re_run_result")	
	private String reRunResult;
	
	@Column(name = "re_run_flag")	
	private String reRunFlag="N";
	
	@Column(name = "collection_date")
	private String collectionDate="";	
	
	@Column(name = "collection_time")
	private String collectionTime="";
	
	@Column(name="reg_ref_doc_id")
	private Integer regRefDocId;
	
	@Column(name = "profile_name", columnDefinition="LONGTEXT")
	private String profileName;


	@Column(name = "template_data", columnDefinition="BLOB")
	private String templateData;
	
	@Column(name = "template_id", columnDefinition="int(11) default 0")
	private Integer templateId;
	
	@Column(name = "template_name", columnDefinition="TEXT")
	private String templateName;
	public String getReRunFlag() {
		return reRunFlag;
	}
	public void setReRunFlag(String reRunFlag) {
		this.reRunFlag = reRunFlag;
	}
	public String getReRunResult() {
		return reRunResult;
	}
	public void setReRunResult(String reRunResult) {
		this.reRunResult = reRunResult;
	}
	public String getExpression() {
		return expression;
	}
	public void setExpression(String expression) {
		this.expression = expression;
	}
	public String getRecollectionreason() {
		return recollectionreason;
	}
	public void setRecollectionreason(String recollectionreason) {
		this.recollectionreason = recollectionreason;
	}
	public String getRecollection() {
		return recollection;
	}
	public void setRecollection(String recollection) {
		this.recollection = recollection;
	}
	public Integer getRejectTestReason() {
		return rejectTestReason;
	}
	public void setRejectTestReason(Integer rejectTestReason) {
		this.rejectTestReason = rejectTestReason;
	}
	public Integer getUnRejectTestReason() {
		return unRejectTestReason;
	}
	public void setUnRejectTestReason(Integer unRejectTestReason) {
		this.unRejectTestReason = unRejectTestReason;
	}
	public String getTestReason() {
		return testReason;
	}
	public void setTestReason(String testReason) {
		this.testReason = testReason;
	}
	public String getFlagMark() {
		return flagMark;
	}
	public void setFlagMark(String flagMark) {
		this.flagMark = flagMark;
	}
	
	public Integer getUnitId() {
		return unitId;
	}
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
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
	
	@Column(name = "bar_code",columnDefinition="int default 0")
	private String barCode="";
	
	@Column(name = "in_out_house",columnDefinition="int default 0")
	private Integer inOutHouse=0;
	
	@Column(name = "api_check",columnDefinition="varchar(1) default 'N'")
	private String api_check="N";
	
	
	@Transient
	private String barcodeId;

	@Transient
	private List<PathologySampleWiseSlave> pathologySampleWiseSlaveList;
	
	public Integer getSampleWiseSlaveId() {
		return sampleWiseSlaveId;
	}
	public void setSampleWiseSlaveId(Integer sampleWiseSlaveId) {
		this.sampleWiseSlaveId = sampleWiseSlaveId;
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
	public List<PathologySampleWiseSlave> getPathologySampleWiseSlaveList() {
		return pathologySampleWiseSlaveList;
	}
	public void setPathologySampleWiseSlaveList(
			List<PathologySampleWiseSlave> pathologySampleWiseSlaveList) {
		this.pathologySampleWiseSlaveList = pathologySampleWiseSlaveList;
	}
	public String getBarcodeId() {
		return barcodeId;
	}
	public void setBarcodeId(String barcodeId) {
		this.barcodeId = barcodeId;
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
	@Transient
	private int masterIdd;

	public int getMasterIdd() {
		return masterIdd;
	}
	public void setMasterIdd(int masterIdd) {
		this.masterIdd = masterIdd;
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
	public String getTemplateData() {
		return templateData;
	}
	public void setTemplateData(String templateData) {
		this.templateData = templateData;
	}
	public Integer getTemplateId() {
		return templateId;
	}
	public void setTemplateId(Integer templateId) {
		this.templateId = templateId;
	}
	public String getTemplateName() {
		return templateName;
	}
	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}
	public String getProfileName() {
		return profileName;
	}
	public void setProfileName(String profileName) {
		this.profileName = profileName;
	}
	public String getApi_check() {
		return api_check;
	}
	public void setApi_check(String api_check) {
		this.api_check = api_check;
	}
	@Override
	public String toString() {
		return "PathologySampleWiseSlave [sampleWiseSlaveId=" + sampleWiseSlaveId + ", profileId=" + profileId
				+ ", packageId=" + packageId + ", testid=" + testid + ", testflag=" + testflag + ", testResult="
				+ testResult + ", patientId=" + patientId + ", treatmentId=" + treatmentId + ", unitId=" + unitId
				+ ", testReason=" + testReason + ", flagMark=" + flagMark + ", recollectionreason=" + recollectionreason
				+ ", rejectTestReason=" + rejectTestReason + ", unRejectTestReason=" + unRejectTestReason
				+ ", recollection=" + recollection + ", expression=" + expression + ", reRunResult=" + reRunResult
				+ ", reRunFlag=" + reRunFlag + ", collectionDate=" + collectionDate + ", collectionTime="
				+ collectionTime + ", regRefDocId=" + regRefDocId + ", profileName=" + profileName + ", templateData="
				+ templateData + ", templateId=" + templateId + ", templateName=" + templateName + ", createdBy="
				+ createdBy + ", updatedBy=" + updatedBy + ", createDate=" + createDate + ", updatedDate=" + updatedDate
				+ ", sampleTypeId=" + sampleTypeId + ", barCode=" + barCode + ", inOutHouse=" + inOutHouse
				+ ", api_check=" + api_check + ", barcodeId=" + barcodeId + ", pathologySampleWiseSlaveList="
				+ pathologySampleWiseSlaveList + ", masterIdd=" + masterIdd + "]";
	}
	
	
	
}