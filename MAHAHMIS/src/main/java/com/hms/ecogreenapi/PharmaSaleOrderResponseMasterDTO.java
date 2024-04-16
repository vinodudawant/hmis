package com.hms.ecogreenapi;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
@JsonIgnoreProperties(ignoreUnknown = true)
public class PharmaSaleOrderResponseMasterDTO {
	@JsonProperty("code")
    String code;
	
	@JsonProperty("type")
    String type;
    
	@JsonProperty("Order_Details")
    List<PharmaSaleOrderResponseSlaveDTO>   Order_Details;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<PharmaSaleOrderResponseSlaveDTO> getOrder_Details() {
		return Order_Details;
	}

	public void setOrder_Details(List<PharmaSaleOrderResponseSlaveDTO> order_Details) {
		Order_Details = order_Details;
	}

	@Override
	public String toString() {
		return "PharmaSaleOrderResponseMasterDTO [code=" + code + ", type=" + type + ", Order_Details=" + Order_Details
				+ "]";
	}
    
	
	
    
}
