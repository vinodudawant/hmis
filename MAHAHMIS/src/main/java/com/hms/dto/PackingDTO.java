package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class PackingDTO {

	private Integer packingId;
	private String packingName;
	private String packingStatus;
	private List<PackingDTO> ltPackingDTOs;
	
	@JsonGetter("packingId")
	public Integer getPackingId() {
		return packingId;
	}
	@JsonSetter("packingId")
	public void setPackingId(Integer packingId) {
		this.packingId = packingId;
	}
	@JsonGetter("packingName")
	public String getPackingName() {
		return packingName;
	}
	@JsonSetter("packingName")
	public void setPackingName(String packingName) {
		this.packingName = packingName;
	}
	@JsonGetter("packingStatus")
	public String getPackingStatus() {
		return packingStatus;
	}
	@JsonSetter("packingStatus")
	public void setPackingStatus(String packingStatus) {
		this.packingStatus = packingStatus;
	}
	@JsonGetter("ltPackingDTOs")
	public List<PackingDTO> getLtPackingDTOs() {
		return ltPackingDTOs;
	}
	@JsonSetter("ltPackingDTOs")
	public void setLtPackingDTOs(List<PackingDTO> ltPackingDTOs) {
		this.ltPackingDTOs = ltPackingDTOs;
	}
	
}
