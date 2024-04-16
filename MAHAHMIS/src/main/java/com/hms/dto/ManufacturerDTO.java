package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class ManufacturerDTO {
	private Integer manufacturerId;
	private String manufacturerName;
	private String manufacturerDetail;
	private String manufacturerStatus;
	private List<ManufacturerDTO> ltManufacturerDTOs;
	
	@JsonGetter("manufacturerId")
	public Integer getManufacturerId() {
		return manufacturerId;
	}
	@JsonSetter("manufacturerId")
	public void setManufacturerId(Integer manufacturerId) {
		this.manufacturerId = manufacturerId;
	}
	@JsonGetter("manufacturerName")
	public String getManufacturerName() {
		return manufacturerName;
	}
	@JsonSetter("manufacturerName")
	public void setManufacturerName(String manufacturerName) {
		this.manufacturerName = manufacturerName;
	}
	@JsonGetter("manufacturerDetail")
	public String getManufacturerDetail() {
		return manufacturerDetail;
	}
	@JsonSetter("manufacturerDetail")
	public void setManufacturerDetail(String manufacturerDetail) {
		this.manufacturerDetail = manufacturerDetail;
	}
	@JsonGetter("manufacturerStatus")
	public String getManufacturerStatus() {
		return manufacturerStatus;
	}
	@JsonSetter("manufacturerStatus")
	public void setManufacturerStatus(String manufacturerStatus) {
		this.manufacturerStatus = manufacturerStatus;
	}
	@JsonGetter("ltManufacturerDTOs")
	public List<ManufacturerDTO> getLtManufacturerDTOs() {
		return ltManufacturerDTOs;
	}
	@JsonSetter("ltManufacturerDTOs")
	public void setLtManufacturerDTOs(List<ManufacturerDTO> ltManufacturerDTOs) {
		this.ltManufacturerDTOs = ltManufacturerDTOs;
	}	
	
}
