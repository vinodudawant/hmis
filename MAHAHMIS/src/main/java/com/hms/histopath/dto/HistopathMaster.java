package com.hms.histopath.dto;

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
@Table(name = "histopath_master")
public class HistopathMaster {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer histopathMasterId;

	@Column(name = "patient_id")
	private Integer patientId;

	@Column(name = "treatment_id")
	private Integer treatmentId;

	@Column(name = "test_status")
	private Integer teststatus = 1;

	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createDate;

	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "sample_type_id", columnDefinition = "int default 0")
	private Integer sampleTypeId = 0;

	@Column(name = "business_type", columnDefinition = "int default 0")
	private Integer businessType = 0;

	@Column(name = "customer_type", columnDefinition = "int default 0")
	private Integer customerType = 0;

	@Column(name = "customer_id", columnDefinition = "int default 0")
	private Integer customerId = 0;

	@Column(name = "bar_code")
	private String barCode;

	@Column(name = "in_out_house", columnDefinition = "int default 0")
	private Integer inOutHouse = 0;

	@Column(name = "sample_count", columnDefinition = "int default 0")
	private Integer sampleCount = 0;

	@Column(name = "bil_det_id")
	private Integer bilDetId;

	@Column(name = "ref_doc_id")
	private Integer refdocid=0;

	@Column(name = "profile_Id")
	private Integer profileId;

	@Column(name = "pkg_Id")
	private Integer packageId = 0;

	@Column(name = "pkgFlag")
	private String pkgFlag = "N";

	@Column(name = "container_Id")
	private Integer containerId;

	@Column(name = "sample_Id")
	private Integer sampleId;

	@Column(name = "unit_Id")
	private Integer unitId;

	@Column(name = "service_id")
	private Integer serviceId;

	@Column(name = "sub_service_id")
	private Integer subServiceId;

	@Column(name = "deleted", columnDefinition = "varchar(2) default 'N'")
	private String deleted = "N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date", updatable = false)
	private Date deleteddatetime;

	@Column(name = "lab_center_id")
	private Integer labCenterId;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "accepted_datetime")
	private Date acceptedDateTime;

	@Column(name = "accepted_by")
	private Integer acceptedby;

	@Column(name = "machine_Id")
	private Integer machineId;

	@Column(name = "serial_no")
	private String SerialNo;

	@Column(name = "kitspec_id")
	private String kitSpecId;

	@Column(name = "collection_date")
	private String collectionDate = "";

	@Column(name = "collection_time")
	private String collectionTime = "";

	@Column(name = "reg_ref_doc_id")
	private Integer regRefDocId=0;

	@Transient
	private String Patientname = "";

	@Transient
	private String profileName = "";

	@Transient
	private String refdocname = "";
	
	@Transient
	private String mobile="";
	
	@Transient
	private String unitName="";
	

	@Transient
	private List<HistopathMaster> lstHistoPathol;

	public Integer getHistopathMasterId() {
		return histopathMasterId;
	}

	public void setHistopathMasterId(Integer histopathMasterId) {
		this.histopathMasterId = histopathMasterId;
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

	public Integer getTeststatus() {
		return teststatus;
	}

	public void setTeststatus(Integer teststatus) {
		this.teststatus = teststatus;
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

	public Integer getBilDetId() {
		return bilDetId;
	}

	public void setBilDetId(Integer bilDetId) {
		this.bilDetId = bilDetId;
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

	public Integer getPackageId() {
		return packageId;
	}

	public void setPackageId(Integer packageId) {
		this.packageId = packageId;
	}

	public String getPkgFlag() {
		return pkgFlag;
	}

	public void setPkgFlag(String pkgFlag) {
		this.pkgFlag = pkgFlag;
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

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
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

	public Integer getLabCenterId() {
		return labCenterId;
	}

	public void setLabCenterId(Integer labCenterId) {
		this.labCenterId = labCenterId;
	}

	public Date getAcceptedDateTime() {
		return acceptedDateTime;
	}

	public void setAcceptedDateTime(Date acceptedDateTime) {
		this.acceptedDateTime = acceptedDateTime;
	}

	public Integer getAcceptedby() {
		return acceptedby;
	}

	public void setAcceptedby(Integer acceptedby) {
		this.acceptedby = acceptedby;
	}

	public Integer getMachineId() {
		return machineId;
	}

	public void setMachineId(Integer machineId) {
		this.machineId = machineId;
	}

	public String getSerialNo() {
		return SerialNo;
	}

	public void setSerialNo(String serialNo) {
		SerialNo = serialNo;
	}

	public String getKitSpecId() {
		return kitSpecId;
	}

	public void setKitSpecId(String kitSpecId) {
		this.kitSpecId = kitSpecId;
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

	public String getRefdocname() {
		return refdocname;
	}

	public void setRefdocname(String refdocname) {
		this.refdocname = refdocname;
	}

	public String getProfileName() {
		return profileName;
	}

	public void setProfileName(String profileName) {
		this.profileName = profileName;
	}

	public String getPatientname() {
		return Patientname;
	}

	public void setPatientname(String patientname) {
		Patientname = patientname;
	}


	
	@Transient
	private Integer masterId;
	
	@Transient
	private Integer treatId;
	
	@Transient
	private String acceptedDtTime;
	
	@Transient
	private String emergencyflag;
	
	@Transient
	private String rowCount;
	
	@Transient
	private String pageno;
	
	
	public String getPageno() {
		return pageno;
	}

	public void setPageno(String pageno) {
		this.pageno = pageno;
	}

	public String getRowCount() {
		return rowCount;
	}

	public void setRowCount(String rowCount) {
		this.rowCount = rowCount;
	}

	public String getEmergencyflag() {
		return emergencyflag;
	}

	public void setEmergencyflag(String emergencyflag) {
		this.emergencyflag = emergencyflag;
	}

	public String getAcceptedDtTime() {
		return acceptedDtTime;
	}

	public void setAcceptedDtTime(String acceptedDtTime) {
		this.acceptedDtTime = acceptedDtTime;
	}

	public Integer getTreatId() {
		return treatId;
	}

	public void setTreatId(Integer treatId) {
		this.treatId = treatId;
	}

	public Integer getMasterId() {
		return masterId;
	}

	public void setMasterId(Integer masterId) {
		this.masterId = masterId;
	}

	public List<HistopathMaster> getLstHistoPathol() {
		return lstHistoPathol;
	}

	public void setLstHistoPathol(List<HistopathMaster> lstHistoPathol) {
		this.lstHistoPathol = lstHistoPathol;
	}
	
	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	
	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	@Override
	public String toString() {
		return "HistopathMaster [histopathMasterId=" + histopathMasterId
				+ ", patientId=" + patientId + ", treatmentId=" + treatmentId
				+ ", teststatus=" + teststatus + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", createDate=" + createDate
				+ ", updatedDate=" + updatedDate + ", sampleTypeId="
				+ sampleTypeId + ", businessType=" + businessType
				+ ", customerType=" + customerType + ", customerId="
				+ customerId + ", barCode=" + barCode + ", inOutHouse="
				+ inOutHouse + ", sampleCount=" + sampleCount + ", bilDetId="
				+ bilDetId + ", refdocid=" + refdocid + ", profileId="
				+ profileId + ", packageId=" + packageId + ", pkgFlag="
				+ pkgFlag + ", containerId=" + containerId + ", sampleId="
				+ sampleId + ", unitId=" + unitId + ", serviceId=" + serviceId
				+ ", subServiceId=" + subServiceId + ", deleted=" + deleted
				+ ", deletedBy=" + deletedBy + ", deleteddatetime="
				+ deleteddatetime + ", labCenterId=" + labCenterId
				+ ", acceptedDateTime=" + acceptedDateTime + ", acceptedby="
				+ acceptedby + ", machineId=" + machineId + ", SerialNo="
				+ SerialNo + ", kitSpecId=" + kitSpecId + ", collectionDate="
				+ collectionDate + ", collectionTime=" + collectionTime
				+ ", regRefDocId=" + regRefDocId + ", Patientname="
				+ Patientname + ", lstHistoPathol=" + lstHistoPathol + "]";
	}

}
