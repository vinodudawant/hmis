package com.hms.ecogreenapi;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
@JsonIgnoreProperties(ignoreUnknown = true)
public class PharmaFetchStockValidationMasterDTO {
	@JsonProperty("StatusCode")
	String statusCode;
	
	@JsonProperty("Status")
	String status;
	
	@JsonProperty("Response")
	List<PharmaFetchStockValidationSlaveDTO> response;

	public String getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<PharmaFetchStockValidationSlaveDTO> getResponse() {
		return response;
	}

	public void setResponse(List<PharmaFetchStockValidationSlaveDTO> response) {
		this.response = response;
	}

	@Override
	public String toString() {
		return "PharmaFetchStockValidationMasterDTO [statusCode=" + statusCode + ", status=" + status + ", response="
				+ response + "]";
	}

	
	
	
}
