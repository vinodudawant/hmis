package com.hms.ecogreenapi;

public class PharmaUpdateIndentPayload {
     String  orderNo;
     String status;
     String callFrom;
     String departMentId;
     String treatmentId;
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCallFrom() {
		return callFrom;
	}
	public void setCallFrom(String callFrom) {
		this.callFrom = callFrom;
	}
	public String getDepartMentId() {
		return departMentId;
	}
	public void setDepartMentId(String departMentId) {
		this.departMentId = departMentId;
	}
	public String getTreatmentId() {
		return treatmentId;
	}
	public void setTreatmentId(String treatmentId) {
		this.treatmentId = treatmentId;
	}
	@Override
	public String toString() {
		return "PharmaUpdateIndentPayload [orderNo=" + orderNo + ", status=" + status + ", callFrom=" + callFrom
				+ ", departMentId=" + departMentId + ", treatmentId=" + treatmentId + "]";
	} 
    
     

	
	
	
     
     
     
     
}
