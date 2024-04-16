package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class DentalTreatment {

	private int idDentalTreatment;
	private int idDentalService;
	private String serviceName;
	private List<DentalTreatment> dList;
	
	@JsonGetter("idDentalTreatment")
	public int getIdDentalTreatment() {
		return idDentalTreatment;
	}
	
	@JsonSetter("idDentalTreatment")
	public void setIdDentalTreatment(int idDentalTreatment) {
		this.idDentalTreatment = idDentalTreatment;
	}
	
	@JsonGetter("idDentalService")
	public int getIdDentalService() {
		return idDentalService;
	}
	
	@JsonSetter("idDentalService")
	public void setIdDentalService(int idDentalService) {
		this.idDentalService = idDentalService;
	}
	
	@JsonGetter("serviceName")
	public String getServiceName() {
		return serviceName;
	}
	
	@JsonSetter("serviceName")
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	@JsonGetter("dList")
	public List<DentalTreatment> getdList() {
		return dList;
	}
	
	@JsonSetter("dList")
	public void setdList(List<DentalTreatment> dList) {
		this.dList = dList;
	}
}
