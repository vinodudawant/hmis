package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class UomDTO {
	private int uomId;
	private String uomDescription;
	private String status;
	private List<UomDTO> ltUomDTOs;
	
	
	@JsonGetter("uomId")
	public int getUomId() {
		return uomId;
	}
	@JsonSetter("uomId")
	public void setUomId(int uomId) {
		this.uomId = uomId;
	}
	@JsonGetter("uomDescription")
	public String getUomDescription() {
		return uomDescription;
	}
	@JsonSetter("uomDescription")
	public void setUomDescription(String uomDescription) {
		this.uomDescription = uomDescription;
	}
	@JsonGetter("status")
	public String getStatus() {
		return status;
	}
	@JsonSetter("status")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("ltUomDTOs")
	public List<UomDTO> getLtUomDTOs() {
		return ltUomDTOs;
	}

	@JsonSetter("ltUomDTOs")
	public void setLtUomDTOs(List<UomDTO> ltUomDTOs) {
		this.ltUomDTOs = ltUomDTOs;
	}
	
	
	
}
