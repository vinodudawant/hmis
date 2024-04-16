package com.hms.sandbox.dto;

public class HIPSandboxCareInfo {
      
	   String referenceNumber;
	   String display;
	public String getReferenceNumber() {
		return referenceNumber;
	}
	public void setReferenceNumber(String referenceNumber) {
		this.referenceNumber = referenceNumber;
	}
	public String getDisplay() {
		return display;
	}
	public void setDisplay(String display) {
		this.display = display;
	}
	@Override
	public String toString() {
		return "HIPSandboxCareInfo [referenceNumber=" + referenceNumber + ", display=" + display + "]";
	}
	
	
	
	   
	   
}
