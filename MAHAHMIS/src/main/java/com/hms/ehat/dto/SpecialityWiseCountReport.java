package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

public class SpecialityWiseCountReport {
	
	private String department;
	
	private Number opdCount;
	
	private Number admissionCount;
	
	private Number dischargeCount;
	
	private Number surgeriesCount;
	
	private Number deathCount;
	
	private String recordDate;
	
	private List<SpecialityWiseCountReport> specialityWiseCountReportList;

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	
	public Number getOpdCount() {
		return opdCount;
	}

	public void setOpdCount(Number opdCount) {
		this.opdCount = opdCount;
	}

	public Number getAdmissionCount() {
		return admissionCount;
	}

	public void setAdmissionCount(Number admissionCount) {
		this.admissionCount = admissionCount;
	}

	public Number getDischargeCount() {
		return dischargeCount;
	}

	public void setDischargeCount(Number dischargeCount) {
		this.dischargeCount = dischargeCount;
	}

	public Number getSurgeriesCount() {
		return surgeriesCount;
	}

	public void setSurgeriesCount(Number surgeriesCount) {
		this.surgeriesCount = surgeriesCount;
	}

	public Number getDeathCount() {
		return deathCount;
	}

	public void setDeathCount(Number deathCount) {
		this.deathCount = deathCount;
	}

	public List<SpecialityWiseCountReport> getSpecialityWiseCountReportList() {
		return specialityWiseCountReportList;
	}

	public void setSpecialityWiseCountReportList(List<SpecialityWiseCountReport> specialityWiseCountReportList) {
		this.specialityWiseCountReportList = specialityWiseCountReportList;
	}

	public String getRecordDate() {
		return recordDate;
	}

	public void setRecordDate(String recordDate) {
		this.recordDate = recordDate;
	}
	
	
	
	
	

}
