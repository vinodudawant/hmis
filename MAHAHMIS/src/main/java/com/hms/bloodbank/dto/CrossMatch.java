package com.hms.bloodbank.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.transaction.TransactionScoped;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="bb_cross_match")
public class CrossMatch implements Serializable {
	
private static final long serialVersionUID = 1L;
	

	@Id
	@GeneratedValue
	@Column(name = "idcrossmatch")
	private int crossMatchId;
	
	@Column(name = "component_name")
	private String componentName;
	
	@Column(name = "blood_bagid")
	private Integer bloodBagId;
	
	@Column(name = "blood_bag")
	private String bloodBag;
	
	@Column(name = "component_volume")
	private String componentVolume;
	
	@Column(name = "expiry_date")
	private String expiryDate;
	
	@Column(name = "requisition_qty")
	private String requisitionQty;
	
	@Column(name = "requ_priority")
	private String requPriority;
	
	@Column(name = "requ_status")
	private Integer requStatus=1;
	
	@Column(name = "require_qty")
	private String requireQty;
	

	@Column(name = "requ_remark")
	private String requRemark;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "compatible_type")
	private String compatibleType;
	
	@Column(name = "remark")
	private String remark;
	
	@Column(name = "bloodRequestId")
	private Integer bloodRequestId=0;
	
	
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
	
	//for issue quantity
	@Column(name = "issue_qty")
	private String issueQty;
	
	@Column(name = "issue_remark")
	private String issueRemark;
	
	@Column(name = "issueDeleted")
	private String issueDeleted="N";
	
	@Column(name = "requdDeleted")
	private String requdDeleted="N";
	
	public String getIssueDeleted() {
		return issueDeleted;
	}

	public void setIssueDeleted(String issueDeleted) {
		this.issueDeleted = issueDeleted;
	}

	public String getRequdDeleted() {
		return requdDeleted;
	}

	public void setRequdDeleted(String requdDeleted) {
		this.requdDeleted = requdDeleted;
	}

	@Column(name = "requPriorityName")
	private String requPriorityName;


	@CreationTimestamp
	@Column(name = "issued_datetime", updatable = false)
	private Date issuedDate;
	
	@Transient
	private List<CrossMatch> lstCrossMatch;
	
	@Transient
	private Integer compatibilityTypeId;	

	@Transient
	private Integer componentId;
	
	@Column(name = "issued_by")
	private Integer issuedBy;
	
	@Transient
	private String age;

	@Transient
	private Integer gender;

	@Transient
	private String bloodgroupname;

	@Transient
	private String contactNo1;

	@Transient
	private String contactNo2;

	@Transient
	private String haemoglobin;

	@Transient
	private String height;

	@Transient
	private String weight;

	@Transient
	private String wardName;

	@Transient
	private String bedNumber;
	
	@Transient
	private String remarks;

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
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

	public String getBloodgroupname() {
		return bloodgroupname;
	}

	public void setBloodgroupname(String bloodgroupname) {
		this.bloodgroupname = bloodgroupname;
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

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	@Transient
	private String patientName;

	@Transient
	private String title;
		
@Transient
private String priority;

	public String getRequPriorityName() {
		return requPriorityName;
	}

	public void setRequPriorityName(String requPriorityName) {
		this.requPriorityName = requPriorityName;
	}

	
	public Integer getCompatibilityTypeId() {
		return compatibilityTypeId;
	}

	public void setCompatibilityTypeId(Integer compatibilityTypeId) {
		this.compatibilityTypeId = compatibilityTypeId;
	}

	public Integer getComponentId() {
		return componentId;
	}

	public void setComponentId(Integer componentId) {
		this.componentId = componentId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public int getCrossMatchId() {
		return crossMatchId;
	}

	public void setCrossMatchId(int crossMatchId) {
		this.crossMatchId = crossMatchId;
	}

	public String getComponentName() {
		return componentName;
	}

	public void setComponentName(String componentName) {
		this.componentName = componentName;
	}

	public String getBloodBag() {
		return bloodBag;
	}

	public void setBloodBag(String bloodBag) {
		this.bloodBag = bloodBag;
	}

	public String getComponentVolume() {
		return componentVolume;
	}

	public void setComponentVolume(String componentVolume) {
		this.componentVolume = componentVolume;
	}

	public String getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}

	
	public String getRequisitionQty() {
		return requisitionQty;
	}

	public void setRequisitionQty(String requisitionQty) {
		this.requisitionQty = requisitionQty;
	}

	public String getRequPriority() {
		return requPriority;
	}

	public void setRequPriority(String requPriority) {
		this.requPriority = requPriority;
	}

	public String getRequireQty() {
		return requireQty;
	}

	public void setRequireQty(String requireQty) {
		this.requireQty = requireQty;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getCompatibleType() {
		return compatibleType;
	}

	public void setCompatibleType(String compatibleType) {
		this.compatibleType = compatibleType;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public List<CrossMatch> getLstCrossMatch() {
		return lstCrossMatch;
	}

	public void setLstCrossMatch(List<CrossMatch> lstCrossMatch) {
		this.lstCrossMatch = lstCrossMatch;
	}

	public Integer getBloodRequestId() {
		return bloodRequestId;
	}

	public void setBloodRequestId(Integer bloodRequestId) {
		this.bloodRequestId = bloodRequestId;
	}

	public Integer getRequStatus() {
		return requStatus;
	}

	public void setRequStatus(Integer requStatus) {
		this.requStatus = requStatus;
	}

	public String getRequRemark() {
		return requRemark;
	}

	public void setRequRemark(String requRemark) {
		this.requRemark = requRemark;
	}


	public String getIssueRemark() {
		return issueRemark;
	}

	public void setIssueRemark(String issueRemark) {
		this.issueRemark = issueRemark;
	}

	public Integer getIssuedBy() {
		return issuedBy;
	}

	public void setIssuedBy(Integer issuedBy) {
		this.issuedBy = issuedBy;
	}

	public Date getIssuedDate() {
		return issuedDate;
	}

	public void setIssuedDate(Date issuedDate) {
		this.issuedDate = issuedDate;
	}

	public Integer getBloodBagId() {
		return bloodBagId;
	}

	public void setBloodBagId(Integer bloodBagId) {
		this.bloodBagId = bloodBagId;
	}

	public String getIssueQty() {
		return issueQty;
	}

	public void setIssueQty(String issueQty) {
		this.issueQty = issueQty;
	}
	
	
}
