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

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

@Entity(name = "ehat_roster_shift_allocation")
public class ShiftAllocationMaster {

	
	@Id
	@GeneratedValue
	@Column(name = "shift_allocation_Id")
	private int shiftallocationId;
	
	@Column(name = "shift_id")
	private String shiftid;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "location")
	private String location;
	
	@Column(name = "startTime")
	private String startTime;
	
	@Column(name = "sameDay")
	private String sameDay;
	
	@Column(name = "endTime")
	private String endTime;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "colour_Id")
	private String colourId;
	
	@Column(name = "selected_days")
	private String selecteddays;
	
	@Column(name = "selected_Dates")
	private String selectedDates;
	
	@Column(name = "employee_type")
	private String employeetype;
	
	@Column(name = "employee_id")
	private String employeeidList;
	
	
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
	
	@Transient
	private List<ShiftAllocationMaster>  shiftallocationlist;

	public int getShiftallocationId() {
		return shiftallocationId;
	}

	public void setShiftallocationId(int shiftallocationId) {
		this.shiftallocationId = shiftallocationId;
	}

	public String getShiftid() {
		return shiftid;
	}

	public void setShiftid(String shiftid) {
		this.shiftid = shiftid;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	

	public String getColourId() {
		return colourId;
	}

	public void setColourId(String colourId) {
		this.colourId = colourId;
	}

	public String getSelecteddays() {
		return selecteddays;
	}

	public void setSelecteddays(String selecteddays) {
		this.selecteddays = selecteddays;
	}

	

	public String getSelectedDates() {
		return selectedDates;
	}

	public void setSelectedDates(String selectedDates) {
		this.selectedDates = selectedDates;
	}

	public String getEmployeetype() {
		return employeetype;
	}

	public void setEmployeetype(String employeetype) {
		this.employeetype = employeetype;
	}

	public String getEmployeeidList() {
		return employeeidList;
	}

	public void setEmployeeidList(String employeeidList) {
		this.employeeidList = employeeidList;
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

	@JsonGetter("shiftDetailsList")
	public List<ShiftAllocationMaster> getShiftallocationlist() {
		return shiftallocationlist;
	}

	@JsonSetter("shiftDetailsList")
	public void setShiftallocationlist(
			List<ShiftAllocationMaster> shiftallocationlist) {
		this.shiftallocationlist = shiftallocationlist;
	}
	@Column(name = "schedule_id")
	private int scheduleid;

	public int getScheduleid() {
		return scheduleid;
	}

	public void setScheduleid(int scheduleid) {
		this.scheduleid = scheduleid;
	}
	@Column(name = "count_of_date")
	private int countOfDate;

	public int getCountOfDate() {
		return countOfDate;
	}

	public void setCountOfDate(int countOfDate) {
		this.countOfDate = countOfDate;
	}
	
	@Transient
	private int shiftAllocationId;
	public int getShiftAllocationId() {
		return shiftAllocationId;
	}

	public void setShiftAllocationId(int shiftAllocationId) {
		this.shiftAllocationId = shiftAllocationId;
	}
	@Transient
	private String userName;
	@Transient
	private String userType;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

}
