package com.hms.ecogreenapi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PharmaSaleOrderResponseSlaveDTO {
	@JsonProperty("Bill_no")
	String Bill_no;
	
	@JsonProperty("Order_ID")
     String Order_ID;
	
	@JsonProperty("IP_num")
    String IP_num;

	public String getBill_no() {
		return Bill_no;
	}

	public void setBill_no(String bill_no) {
		Bill_no = bill_no;
	}

	public String getOrder_ID() {
		return Order_ID;
	}

	public void setOrder_ID(String order_ID) {
		Order_ID = order_ID;
	}

	public String getIP_num() {
		return IP_num;
	}

	public void setIP_num(String iP_num) {
		IP_num = iP_num;
	}

	@Override
	public String toString() {
		return "PharmaSaleOrderResponseSlaveDTO [Bill_no=" + Bill_no + ", Order_ID=" + Order_ID + ", IP_num=" + IP_num
				+ "]";
	}
	
	
}
