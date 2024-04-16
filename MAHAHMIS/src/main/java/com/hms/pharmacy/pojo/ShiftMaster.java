package com.hms.pharmacy.pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity 
@Table(name="pharma_shift_master")
public class ShiftMaster {
	
	@Id
	@GeneratedValue 
	@Column(name="shift_id")
	private Integer shiftId;
	
	@Column(name="shift_name")
	private String shiftName;
	
	@Column(name="shift_start_time")
	private String shiftStartTime;
	
	@Column(name="shift_end_time")
	private String shiftEndTime;
	
	@Column(name="shift_delete_flag")
	private Integer shiftDeleteFlag;
	
	@Column(name="shift_added_by")
	private String shiftAddedBy;
	
	@Column(name="shift_mod_by")
	private String shiftModBy;
	
	@Column(name="shift_update_date")
	private Date shiftUpdateDate;

	@Column(name = "shift_add_date")
	private Date shiftAddDate;

	public Integer getShiftId() {
		return shiftId;
	}

	public void setShiftId(Integer shiftId) {
		this.shiftId = shiftId;
	}

	public String getShiftName() {
		return shiftName;
	}

	public void setShiftName(String shiftName) {
		this.shiftName = shiftName;
	}

	public String getShiftStartTime() {
		return shiftStartTime;
	}

	public void setShiftStartTime(String shiftStartTime) {
		this.shiftStartTime = shiftStartTime;
	}

	public String getShiftEndTime() {
		return shiftEndTime;
	}

	public void setShiftEndTime(String shiftEndTime) {
		this.shiftEndTime = shiftEndTime;
	}

	public String getShiftModBy() {
		return shiftModBy;
	}

	public void setShiftModBy(String shiftModBy) {
		this.shiftModBy = shiftModBy;
	}

	public Integer getShiftDeleteFlag() {
		return shiftDeleteFlag;
	}

	public void setShiftDeleteFlag(Integer shiftDeleteFlag) {
		this.shiftDeleteFlag = shiftDeleteFlag;
	}

	public String getShiftAddedBy() {
		return shiftAddedBy;
	}

	public void setShiftAddedBy(String shiftAddedBy) {
		this.shiftAddedBy = shiftAddedBy;
	}

	public Date getShiftUpdateDate() {
		return shiftUpdateDate;
	}

	public void setShiftUpdateDate(Date shiftUpdateDate) {
		this.shiftUpdateDate = shiftUpdateDate;
	}

	public Date getShiftAddDate() {
		return shiftAddDate;
	}

	public void setShiftAddDate(Date shiftAddDate) {
		this.shiftAddDate = shiftAddDate;
	}
}
