package com.hms.ecogreenapi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PharmaFetchStockValidationSlaveDTO {

	String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "PharmaFetchStockValidationSlaveDTO [message=" + message + "]";
	}
	
	
} 
