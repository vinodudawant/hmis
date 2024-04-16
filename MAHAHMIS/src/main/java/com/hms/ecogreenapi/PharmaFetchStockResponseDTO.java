package com.hms.ecogreenapi;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
@JsonIgnoreProperties(ignoreUnknown = true)
public class PharmaFetchStockResponseDTO {
   
	@JsonProperty("StatusCode")
	String StatusCode;
	
	
	@JsonProperty("Status")
	String Status;
	
	@JsonProperty("itemdetails")
	List<PharmaFetchStockItemDTO> itemdetails;

	public List<PharmaFetchStockItemDTO> getItemdetails() {
		return itemdetails;
	}

	public void setItemdetails(List<PharmaFetchStockItemDTO> itemdetails) {
		this.itemdetails = itemdetails;
	}

	public String getStatusCode() {
		return StatusCode;
	}

	public void setStatusCode(String statusCode) {
		StatusCode = statusCode;
	}

	public String getStatus() {
		return Status;
	}

	public void setStatus(String status) {
		Status = status;
	}

	@Override
	public String toString() {
		return "PharmaFetchStockResponseDTO [StatusCode=" + StatusCode + ", Status=" + Status + ", itemdetails="
				+ itemdetails + "]";
	}

	
	
	
}
