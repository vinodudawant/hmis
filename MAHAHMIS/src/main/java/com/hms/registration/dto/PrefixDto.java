package com.hms.registration.dto;

import java.util.List;

public class PrefixDto {

	int prefix_dropdown_id;
	String prefix_dropdown_description;
	
	List<PrefixDto> lstPrefix;
	public int getPrefix_dropdown_id() {
		return prefix_dropdown_id;
	}
	public void setPrefix_dropdown_id(int prefix_dropdown_id) {
		this.prefix_dropdown_id = prefix_dropdown_id;
	}
	public String getPrefix_dropdown_description() {
		return prefix_dropdown_description;
	}
	public void setPrefix_dropdown_description(String prefix_dropdown_description) {
		this.prefix_dropdown_description = prefix_dropdown_description;
	}
	public List<PrefixDto> getLstPrefix() {
		return lstPrefix;
	}
	public void setLstPrefix(List<PrefixDto> lstPrefix) {
		this.lstPrefix = lstPrefix;
	}
}
