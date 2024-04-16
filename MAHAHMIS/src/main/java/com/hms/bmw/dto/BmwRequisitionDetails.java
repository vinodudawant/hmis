package com.hms.bmw.dto;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="bmw_requisition_details")
public class BmwRequisitionDetails {

	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private int Id;
	
	@Column(name = "bmw_user_id")
	private int bmwUserId;
	
	
	@Column(name = "nurse_id")
	private Integer nurseId=0;
	
	@Column(name = "time")
	private String  Time;
	
	@Column(name = "department")
	private String Department;
	
	
	@Column(name = "type_of_bag")
	private String TypeOfBag;
	
	@Column(name = "bag_type",columnDefinition="varchar(200) default ''")
	private String BagColour;
	
	@Column(name = "pickup_location")
	private String PickupLocation;
	
	@Column(name = "caller_name")
	private String CallerName;
	
	@Column(name = "ward_id")
	private int WardId;

	@Column(name = "ward_name",columnDefinition="varchar(200) default ''")
	private String WardName;
	
	@Column(name = "weight_of_bag")
	private int WeightOfBag;
	
	@Column(name = "drop_location")
	private String Drop_Location;
	
	@Column(name = "caller_number")
	private long CallerNumber;
	
	@Column(name = "nurse_in_charge",columnDefinition="varchar(200) default ''")
	private String NurseInCharge;
	
	@Column(name = "bag_status",columnDefinition="varchar(100) default 'OPEN'")
	private String bag_Status="OPEN";
	
	@Column(name = "remark")
	private String Remark;
	
	
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
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Transient 
	BigInteger caller_number_duplicate;
	
	@Transient
	private List<BmwRequisitionDetails> LstBmwRequisitionDetails;
	
	@Transient
	private Integer redApproveCount;
	@Transient
	private Integer redCompleteCount;
	@Transient
	private Integer redAssignCount;
	@Transient
	private Integer redOpenCount;
	@Transient
    private Integer yellowApproveCount;
	@Transient
	private Integer yellowCompleteCount;
	@Transient
	private Integer yellowAssignCount;
	@Transient
	private Integer yellowOpenCount;
	@Transient
    private Integer greenApproveCount;
	@Transient
	private Integer greenCompleteCount;
	@Transient
	private Integer greenAssignCount;
	@Transient
	private Integer greenOpenCount;
	@Transient
    private Integer blackApproveCount;
	@Transient
	private Integer blackCompleteCount;
	@Transient
	private Integer blackAssignCount;
	@Transient
	private Integer blackOpenCount;
	


	
	public int getWardId() {
		return WardId;
	}

	public void setWardId(int wardId) {
		WardId = wardId;
	}

	public String getBagColour() {
		return BagColour;
	}

	public void setBagColour(String bagColour) {
		BagColour = bagColour;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getRedApproveCount() {
		return redApproveCount;
	}

	public void setRedApproveCount(Integer redApproveCount) {
		this.redApproveCount = redApproveCount;
	}

	public Integer getRedCompleteCount() {
		return redCompleteCount;
	}

	public void setRedCompleteCount(Integer redCompleteCount) {
		this.redCompleteCount = redCompleteCount;
	}

	public Integer getRedAssignCount() {
		return redAssignCount;
	}

	public void setRedAssignCount(Integer redAssignCount) {
		this.redAssignCount = redAssignCount;
	}

	public Integer getRedOpenCount() {
		return redOpenCount;
	}

	public void setRedOpenCount(Integer redOpenCount) {
		this.redOpenCount = redOpenCount;
	}

	public Integer getYellowApproveCount() {
		return yellowApproveCount;
	}

	public void setYellowApproveCount(Integer yellowApproveCount) {
		this.yellowApproveCount = yellowApproveCount;
	}

	public Integer getYellowCompleteCount() {
		return yellowCompleteCount;
	}

	public void setYellowCompleteCount(Integer yellowCompleteCount) {
		this.yellowCompleteCount = yellowCompleteCount;
	}

	public Integer getYellowAssignCount() {
		return yellowAssignCount;
	}

	public void setYellowAssignCount(Integer yellowAssignCount) {
		this.yellowAssignCount = yellowAssignCount;
	}

	public Integer getYellowOpenCount() {
		return yellowOpenCount;
	}

	public void setYellowOpenCount(Integer yellowOpenCount) {
		this.yellowOpenCount = yellowOpenCount;
	}
    
	public Integer getGreenApproveCount() {
		return greenApproveCount;
	}

	public void setGreenApproveCount(Integer greenApproveCount) {
		this.greenApproveCount = greenApproveCount;
	}

	public Integer getGreenCompleteCount() {
		return greenCompleteCount;
	}

	public void setGreenCompleteCount(Integer greenCompleteCount) {
		this.greenCompleteCount = greenCompleteCount;
	}

	public Integer getGreenAssignCount() {
		return greenAssignCount;
	}

	public void setGreenAssignCount(Integer greenAssignCount) {
		this.greenAssignCount = greenAssignCount;
	}

	public Integer getGreenOpenCount() {
		return greenOpenCount;
	}

	public void setGreenOpenCount(Integer greenOpenCount) {
		this.greenOpenCount = greenOpenCount;
	}

	public Integer getBlackApproveCount() {
		return blackApproveCount;
	}

	public void setBlackApproveCount(Integer blackApproveCount) {
		this.blackApproveCount = blackApproveCount;
	}

	public Integer getBlackCompleteCount() {
		return blackCompleteCount;
	}

	public void setBlackCompleteCount(Integer blackCompleteCount) {
		this.blackCompleteCount = blackCompleteCount;
	}

	public Integer getBlackAssignCount() {
		return blackAssignCount;
	}

	public void setBlackAssignCount(Integer blackAssignCount) {
		this.blackAssignCount = blackAssignCount;
	}

	public Integer getBlackOpenCount() {
		return blackOpenCount;
	}

	public void setBlackOpenCount(Integer blackOpenCount) {
		this.blackOpenCount = blackOpenCount;
	}

	/*
	 * private List<BmwRequisitionDetails> lstBmwRequisitionDetails;
	 * 
	 * 
	 * public List<BmwRequisitionDetails> getLstBmwRequisitionDetails() { return
	 * lstBmwRequisitionDetails; }
	 * 
	 * public void setLstBmwRequisitionDetails(List<BmwRequisitionDetails>
	 * lstBmwRequisitionDetails) { this.lstBmwRequisitionDetails =
	 * lstBmwRequisitionDetails; }
	 */
	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public int getBmwUserId() {
		return bmwUserId;
	}

	public void setBmwUserId(int bmwUserId) {
		this.bmwUserId = bmwUserId;
	}

	
	public int getNurseId() {
		return nurseId;
	}

	public void setNurseId(int nurseId) {
		this.nurseId = nurseId;
	}

	public String getDepartment() {
		return Department;
	}

	public void setDepartment(String department) {
		Department = department;
	}

	public String getTypeOfBag() {
		return TypeOfBag;
	}

	public void setTypeOfBag(String typeOfBag) {
		TypeOfBag = typeOfBag;
	}

	public String getPickupLocation() {
		return PickupLocation;
	}

	public void setPickupLocation(String pickupLocation) {
		PickupLocation = pickupLocation;
	}

	public String getCallerName() {
		return CallerName;
	}

	public void setCallerName(String callerName) {
		CallerName = callerName;
	}

	public String getWardName() {
		return WardName;
	}

	public void setWardName(String wardName) {
		WardName = wardName;
	}

	public int getWeightOfBag() {
		return WeightOfBag;
	}

	public void setWeightOfBag(int weightOfBag) {
		WeightOfBag = weightOfBag;
	}

	public String getDrop_Location() {
		return Drop_Location;
	}

	public void setDrop_Location(String drop_Location) {
		Drop_Location = drop_Location;
	}

	public long getCallerNumber() {
		return CallerNumber;
	}

	public void setCallerNumber(int callerNumber) {
		CallerNumber = callerNumber;
	}

	public String getNurseInCharge() {
		return NurseInCharge;
	}

	public void setNurseInCharge(String nurseInCharge) {
		NurseInCharge = nurseInCharge;
	}

	public String getRemark() {
		return Remark;
	}

	public void setRemark(String remark) {
		Remark = remark;
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

	public String getTime() {
		return Time;
	}

	public void setTime(String time) {
		Time = time;
	}

	public void setCallerNumber(long callerNumber) {
		CallerNumber = callerNumber;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getBag_Status() {
		return bag_Status;
	}

	public void setBag_Status(String bag_Status) {
		this.bag_Status = bag_Status;
	}

	public void setNurseId(Integer nurseId) {
		this.nurseId = nurseId;
	}

	public List<BmwRequisitionDetails> getLstBmwRequisitionDetails() {
		return LstBmwRequisitionDetails;
	}

	public void setLstBmwRequisitionDetails(List<BmwRequisitionDetails> lstBmwRequisitionDetails) {
		LstBmwRequisitionDetails = lstBmwRequisitionDetails;
	}

	
	
	public BigInteger getCaller_number_duplicate() {
		return caller_number_duplicate;
	}

	public void setCaller_number_duplicate(BigInteger caller_number_duplicate) {
		this.caller_number_duplicate = caller_number_duplicate;
	}
	
	
	

}
