package com.hms.doctordesk.dto;

import java.util.List;

import javax.persistence.Transient;

public class VitalDto {

	String HeaderName;
	
	@Transient
	List<VitalMaster> listOfVitalHeader;
	
	@Transient
	List<VitalInfoDto> listOfVitalValues;

	public String getHeaderName() {
		return HeaderName;
	}

	public void setHeaderName(String headerName) {
		HeaderName = headerName;
	}

	public List<VitalMaster> getListOfVitalHeader() {
		return listOfVitalHeader;
	}

	public void setListOfVitalHeader(List<VitalMaster> listOfVitalHeader) {
		this.listOfVitalHeader = listOfVitalHeader;
	}

	public List<VitalInfoDto> getListOfVitalValues() {
		return listOfVitalValues;
	}

	public void setListOfVitalValues(List<VitalInfoDto> listOfVitalValues) {
		this.listOfVitalValues = listOfVitalValues;
	}	
}
