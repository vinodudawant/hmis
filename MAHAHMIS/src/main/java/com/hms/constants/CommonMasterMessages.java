package com.hms.constants;

public enum CommonMasterMessages {
	SAVED("Saved Successfully!"), 
	UPDATED("Updated Successfully!"),
	DELELTED("Deleted Successfully!"),
	SERVICEDOWN("Service Down!")
	  ;
 
    private String message;
 
    CommonMasterMessages(String message) {
        this.message = message;
    }
 
    public String getMessage() {
        return message;
    }

}
