package com.hms.constants;

public enum BedManagementMessages {

		BEDALLOCATED("Bed Allocated Successfully."), 
		BEDALREADYALLOCATED("Bed already allocated to this patient."), 
	    BEDNOTAVAILABLE("This Bed Is Already Allocated For Patient."), 
	    BEDSHIFTED("Bed Shifted Successfully."),
	    BEDSAMEALREADYALLOCATED("This Bed Is Already Allocated This Patient."),
	    BEDOCCUPIED("Bed already occupied,select another bed."),
	    BEDSERVICEDOWN("Bed Service is down.")
	    ;
	 
	    private String message;
	 
	    BedManagementMessages(String message) {
	        this.message = message;
	    }
	 
	    public String getMessage() {
	        return message;
	    }
}
