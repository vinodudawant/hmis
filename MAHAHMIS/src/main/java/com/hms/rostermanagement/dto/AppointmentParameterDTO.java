package com.hms.rostermanagement.dto;

public class AppointmentParameterDTO {
   
	String appointmentDate;
	String appointmentType;
	
	String actionType;
	String searchType;
	
	String searchName;

	public String getAppointmentDate() {
		return appointmentDate;
	}

	public void setAppointmentDate(String appointmentDate) {
		this.appointmentDate = appointmentDate;
	}

	public String getAppointmentType() {
		return appointmentType;
	}

	public void setAppointmentType(String appointmentType) {
		this.appointmentType = appointmentType;
	}

	public String getActionType() {
		return actionType;
	}

	public void setActionType(String actionType) {
		this.actionType = actionType;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	public String getSearchName() {
		return searchName;
	}

	public void setSearchName(String searchName) {
		this.searchName = searchName;
	}

	@Override
	public String toString() {
		return "AppointmentParameterDTO [appointmentDate=" + appointmentDate + ", appointmentType=" + appointmentType
				+ ", actionType=" + actionType + ", searchType=" + searchType + ", searchName=" + searchName + "]";
	}
	
	
	
}
