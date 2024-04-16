package com.hms.rostermanagement.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity(name = "ehat_shift_master")
public class ShiftMasterDto {

	
	@Id
	@GeneratedValue
	@Column(name = "shift_Id")
	private int shiftId;
	@Column(name = "shift_name")
	private String shiftname;
	@Column(name = "abbrevation")
	private String abbrevation;
	@Column(name = "location")
	private String location;
	@Column(name = "startTime")
	private String startTime;
	@Column(name = "sameDay")
	private String sameDay;
	@Column(name = "endTime")
	private String endTime;
	@Column(name = "breakTime")
	private String breakTime;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	@Column(name = "updated_by")
	private Integer updatedBy;
	@Column(name = "deleted_by")
	private Integer deletedBy;	
	@Column(name = "deleted")
	private String deleted="N";
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	public int getShiftId() {
		return shiftId;
	}
	public void setShiftId(int shiftId) {
		this.shiftId = shiftId;
	}
	public String getShiftname() {
		return shiftname;
	}
	public void setShiftname(String shiftname) {
		this.shiftname = shiftname;
	}
	public String getAbbrevation() {
		return abbrevation;
	}
	public void setAbbrevation(String abbrevation) {
		this.abbrevation = abbrevation;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getSameDay() {
		return sameDay;
	}
	public void setSameDay(String sameDay) {
		this.sameDay = sameDay;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getBreakTime() {
		return breakTime;
	}
	public void setBreakTime(String breakTime) {
		this.breakTime = breakTime;
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
	public Integer getDeletedBy() {
		return deletedBy;
	}
	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
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
	
	@Transient
	private List<ShiftMasterDto> shiftmasterList;
	public List<ShiftMasterDto> getShiftmasterList() {
		return shiftmasterList;
	}
	public void setShiftmasterList(List<ShiftMasterDto> shiftmasterList) {
		this.shiftmasterList = shiftmasterList;
	}
	
	
}
