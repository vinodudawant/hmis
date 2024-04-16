package com.hms.ecogreenapi;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@JsonIgnoreProperties(ignoreUnknown = true)
public class EcogreenItemPayloadJson {
	 String c2_code;
	  List<EcogrrenItemDto> rows;
	public String getC2_code() {
		return c2_code;
	}
	public void setC2_code(String c2_code) {
		this.c2_code = c2_code;
	}
	public List<EcogrrenItemDto> getRows() {
		return rows;
	}
	public void setRows(List<EcogrrenItemDto> rows) {
		this.rows = rows;
	}
	@Override
	public String toString() {
		return "EcogreenItemPayloadJson [c2_code=" + c2_code + ", rows=" + rows + "]";
	}
	  
	  
}
