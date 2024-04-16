package com.hms.ehat.dto;

import java.util.List;


public class DeptPatientCount {

	private static final long serialVersionUID = 1L;
	
	private Integer deptId,progressiveCount,yearCount,monthCount,dayCount;	
	private String deptName;	
	private List<DeptPatientCount> listDeptPatientCount;
	
	public Integer getDeptId() {
		return deptId;
	}
	public void setDeptId(Integer deptId) {
		this.deptId = deptId;
	}	
	public Integer getProgressiveCount() {
		return progressiveCount;
	}
	public void setProgressiveCount(Integer progressiveCount) {
		this.progressiveCount = progressiveCount;
	}
	public Integer getYearCount() {
		return yearCount;
	}
	public void setYearCount(Integer yearCount) {
		this.yearCount = yearCount;
	}
	public Integer getMonthCount() {
		return monthCount;
	}
	public void setMonthCount(Integer monthCount) {
		this.monthCount = monthCount;
	}
	public Integer getDayCount() {
		return dayCount;
	}
	public void setDayCount(Integer dayCount) {
		this.dayCount = dayCount;
	}
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	public List<DeptPatientCount> getListDeptPatientCount() {
		return listDeptPatientCount;
	}
	public void setListDeptPatientCount(List<DeptPatientCount> listDeptPatientCount) {
		this.listDeptPatientCount = listDeptPatientCount;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}	
}
