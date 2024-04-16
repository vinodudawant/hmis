package com.hms.ambulance.dto;

public class AmbulancePatientCountDto {
	
	Integer approveCount;
	
	Integer cancelCount;
	
	Integer openCount;
	
	Integer assignCount;

	Integer completeCount;
	
	Integer emergencyCount;
	
	public Integer getEmergencyCount() {
		return emergencyCount;
	}

	public void setEmergencyCount(Integer emergencyCount) {
		this.emergencyCount = emergencyCount;
	}

	public Integer getCompleteCount() {
		return completeCount;
	}

	public void setCompleteCount(Integer completeCount) {
		this.completeCount = completeCount;
	}

	public Integer getApproveCount() {
		return approveCount;
	}

	public void setApproveCount(Integer approveCount) {
		this.approveCount = approveCount;
	}

	public Integer getCancelCount() {
		return cancelCount;
	}

	public void setCancelCount(Integer cancelCount) {
		this.cancelCount = cancelCount;
	}

	public Integer getOpenCount() {
		return openCount;
	}

	public void setOpenCount(Integer openCount) {
		this.openCount = openCount;
	}

	public Integer getAssignCount() {
		return assignCount;
	}

	public void setAssignCount(Integer assignCount) {
		this.assignCount = assignCount;
	}
	
}
