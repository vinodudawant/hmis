package com.hms.ehat.dto;

import java.util.List;

import com.hms.dto.Users;

public class UserEntryLogReportDto {
	
	private int UserId;
	
	private String UserName;

	private int totalVitalCount;

	private int totalInputCount;

	private int totalOutputCount;

	private int totalOPDPrescriptionCount;
	
	private int totalNurshingPrescriptionCount;

	private int totalotScheduleCount;

	private int totalRegistrationCount;

	private int totalOPDBillCount;

	private int totalIPDBillCount;
	
	private int totalOPDServicesCount;
	
	private int totalIPDServicesCount;
	
	private int totalDiagnoBillCount;
	
	private List<UserEntryLogReportDto> UserEntryLogReportList;
	
	public int getUserId() {
		return UserId;
	}

	public void setUserId(int userId) {
		UserId = userId;
	}

	public String getUserName() {
		return UserName;
	}

	public void setUserName(String userName) {
		UserName = userName;
	}

	public int getTotalVitalCount() {
		return totalVitalCount;
	}

	public void setTotalVitalCount(int totalVitalCount) {
		this.totalVitalCount = totalVitalCount;
	}

	public int getTotalInputCount() {
		return totalInputCount;
	}

	public void setTotalInputCount(int totalInputCount) {
		this.totalInputCount = totalInputCount;
	}

	public int getTotalOutputCount() {
		return totalOutputCount;
	}

	public void setTotalOutputCount(int totalOutputCount) {
		this.totalOutputCount = totalOutputCount;
	}

	public int getTotalOPDPrescriptionCount() {
		return totalOPDPrescriptionCount;
	}

	public void setTotalOPDPrescriptionCount(int totalOPDPrescriptionCount) {
		this.totalOPDPrescriptionCount = totalOPDPrescriptionCount;
	}
	
	

	public int getTotalNurshingPrescriptionCount() {
		return totalNurshingPrescriptionCount;
	}

	public void setTotalNurshingPrescriptionCount(int totalNurshingPrescriptionCount) {
		this.totalNurshingPrescriptionCount = totalNurshingPrescriptionCount;
	}

	public int getTotalotScheduleCount() {
		return totalotScheduleCount;
	}

	public void setTotalotScheduleCount(int totalotScheduleCount) {
		this.totalotScheduleCount = totalotScheduleCount;
	}

	public int getTotalRegistrationCount() {
		return totalRegistrationCount;
	}

	public void setTotalRegistrationCount(int totalRegistrationCount) {
		this.totalRegistrationCount = totalRegistrationCount;
	}

	public int getTotalOPDBillCount() {
		return totalOPDBillCount;
	}

	public void setTotalOPDBillCount(int totalOPDBillCount) {
		this.totalOPDBillCount = totalOPDBillCount;
	}

	public int getTotalIPDBillCount() {
		return totalIPDBillCount;
	}

	public void setTotalIPDBillCount(int totalIPDBillCount) {
		this.totalIPDBillCount = totalIPDBillCount;
	}
	
	

	public int getTotalOPDServicesCount() {
		return totalOPDServicesCount;
	}

	public void setTotalOPDServicesCount(int totalOPDServicesCount) {
		this.totalOPDServicesCount = totalOPDServicesCount;
	}

	public int getTotalIPDServicesCount() {
		return totalIPDServicesCount;
	}

	public void setTotalIPDServicesCount(int totalIPDServicesCount) {
		this.totalIPDServicesCount = totalIPDServicesCount;
	}
	
	public int getTotalDiagnoBillCount() {
		return totalDiagnoBillCount;
	}

	public void setTotalDiagnoBillCount(int totalDiagnoBillCount) {
		this.totalDiagnoBillCount = totalDiagnoBillCount;
	}

	public List<UserEntryLogReportDto> getUserEntryLogReportList() {
		return UserEntryLogReportList;
	}

	public void setUserEntryLogReportList(List<UserEntryLogReportDto> userEntryLogReportList) {
		UserEntryLogReportList = userEntryLogReportList;
	}
	
	

}
