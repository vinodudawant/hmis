package com.hms.bloodbank.dto;

import java.io.Serializable;
import java.util.ArrayList;
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
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.pharmacy.pojo.PurchaseSlave;

@Entity
@Table(name="bb_transfusion_reaction")
public class TransfusionReaction implements Serializable {
	
private static final long serialVersionUID = 1L;
	

	@Id
	@GeneratedValue
	@Column(name = "idtransfusion")
	private int transfusionId;
	
	@Column(name = "component_name")
	private String componentName;
	
	@Column(name = "blood_bag")
	private String bloodBag;
	
	@Column(name = "component_volume")
	private String componentVolume;
	
	@Column(name = "expiry_date")
	private String expiryDate;
	
	@Column(name = "issue_qty")
	private String issueQty;
	
	@Column(name = "compatible_type")
	private String compatibleType;
	
	@Column(name = "bloodRequestId")
	private Integer bloodRequestId=0;
	
	@Column(name = "start_time")
	private String startTime;
	
	@Column(name = "end_time")
	private String endTime;
	
	@Column(name = "rateid")
	private Integer rateId=0;
	
	@Column(name = "rate")
	private String rate;
	
	@Column(name = "trans_qty")
	private String transQty;
	
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
	private Integer deletedBy=0;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "status")
	private String status="Y";
	
	@Column(name = "ip_address")
	private String ipAddress = null;
	
	@Transient
	private List<TransfusionReaction> lstTransfusion;
	
	@Transient
	private int crossMatchId ;
	
	public int getCrossMatchId() {
		return crossMatchId;
	}

	public void setCrossMatchId(int crossMatchId) {
		this.crossMatchId = crossMatchId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public int getTransfusionId() {
		return transfusionId;
	}

	public void setTransfusionId(int transfusionId) {
		this.transfusionId = transfusionId;
	}

	
	//Added By Annapurna
 /*	@OneToMany(cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)	
	private List<TransfusionObservation> lstTransfusionObservation = new ArrayList<TransfusionObservation>();

	public List<TransfusionObservation> getLstTransfusionObservation() {
		return lstTransfusionObservation;
	}

	public void setLstTransfusionObservation(List<TransfusionObservation> lstTransfusionObservation) {
		this.lstTransfusionObservation = lstTransfusionObservation;
		}
		 */
	
	@Column(name = "observation1")
	private String observation1;
	
	@Column(name = "pre_transfusion1")
	private String preTransfusion1;
	
	@Column(name = "post_transfusion1")
	private String postTransfusion1;
	
	@Column(name = "during_transfusion1")
	private String duringTransfusion1;
	
	@Column(name = "observation2")
	private String observation2;
	
	@Column(name = "pre_transfusion2")
	private String preTransfusion2;
	
	@Column(name = "post_transfusion2")
	private String postTransfusion2;
	
	@Column(name = "during_transfusion2")
	private String duringTransfusion2;
	
	@Column(name = "observation3")
	private String observation3;
	
	@Column(name = "pre_transfusion3")
	private String preTransfusion3;
	
	@Column(name = "post_transfusion3")
	private String postTransfusion3;
	
	@Column(name = "during_transfusion3")
	private String duringTransfusion3;
	
	@Column(name = "remark")
	private String remark;
	
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
private Integer priority;

@Transient
private String patientName;

@Transient
private String title;
	
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

public Integer getPriority() {
	return priority;
}

public void setPriority(Integer priority) {
	this.priority = priority;
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

	public String getObservation1() {
		return observation1;
	}

	public void setObservation1(String observation1) {
		this.observation1 = observation1;
	}

	public String getPreTransfusion1() {
		return preTransfusion1;
	}

	public void setPreTransfusion1(String preTransfusion1) {
		this.preTransfusion1 = preTransfusion1;
	}

	public String getPostTransfusion1() {
		return postTransfusion1;
	}

	public void setPostTransfusion1(String postTransfusion1) {
		this.postTransfusion1 = postTransfusion1;
	}

	public String getDuringTransfusion1() {
		return duringTransfusion1;
	}

	public void setDuringTransfusion1(String duringTransfusion1) {
		this.duringTransfusion1 = duringTransfusion1;
	}

	public String getObservation2() {
		return observation2;
	}

	public void setObservation2(String observation2) {
		this.observation2 = observation2;
	}

	public String getPreTransfusion2() {
		return preTransfusion2;
	}

	public void setPreTransfusion2(String preTransfusion2) {
		this.preTransfusion2 = preTransfusion2;
	}

	public String getPostTransfusion2() {
		return postTransfusion2;
	}

	public void setPostTransfusion2(String postTransfusion2) {
		this.postTransfusion2 = postTransfusion2;
	}

	public String getDuringTransfusion2() {
		return duringTransfusion2;
	}

	public void setDuringTransfusion2(String duringTransfusion2) {
		this.duringTransfusion2 = duringTransfusion2;
	}

	public String getObservation3() {
		return observation3;
	}

	public void setObservation3(String observation3) {
		this.observation3 = observation3;
	}

	public String getPreTransfusion3() {
		return preTransfusion3;
	}

	public void setPreTransfusion3(String preTransfusion3) {
		this.preTransfusion3 = preTransfusion3;
	}

	public String getPostTransfusion3() {
		return postTransfusion3;
	}

	public void setPostTransfusion3(String postTransfusion3) {
		this.postTransfusion3 = postTransfusion3;
	}

	public String getDuringTransfusion3() {
		return duringTransfusion3;
	}

	public void setDuringTransfusion3(String duringTransfusion3) {
		this.duringTransfusion3 = duringTransfusion3;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public String getIssueQty() {
		return issueQty;
	}

	public void setIssueQty(String issueQty) {
		this.issueQty = issueQty;
	}

	public String getCompatibleType() {
		return compatibleType;
	}

	public void setCompatibleType(String compatibleType) {
		this.compatibleType = compatibleType;
	}

	public Integer getBloodRequestId() {
		return bloodRequestId;
	}

	public void setBloodRequestId(Integer bloodRequestId) {
		this.bloodRequestId = bloodRequestId;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getRate() {
		return rate;
	}

	public void setRate(String rate) {
		this.rate = rate;
	}

	public String getTransQty() {
		return transQty;
	}

	public void setTransQty(String transQty) {
		this.transQty = transQty;
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

	public List<TransfusionReaction> getLstTransfusion() {
		return lstTransfusion;
	}

	public void setLstTransfusion(List<TransfusionReaction> lstTransfusion) {
		this.lstTransfusion = lstTransfusion;
	}

	public Integer getRateId() {
		return rateId;
	}

	public void setRateId(Integer rateId) {
		this.rateId = rateId;
	}
	

}
