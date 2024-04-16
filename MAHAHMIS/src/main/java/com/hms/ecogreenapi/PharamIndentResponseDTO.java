package com.hms.ecogreenapi;

import java.util.List;

public class PharamIndentResponseDTO {
	
	List<PharmaIndentMasterDTO> lstItemDetails;

	public List<PharmaIndentMasterDTO> getLstItemDetails() {
		return lstItemDetails;
	}

	public void setLstItemDetails(List<PharmaIndentMasterDTO> lstItemDetails) {
		this.lstItemDetails = lstItemDetails;
	}

	@Override
	public String toString() {
		return "PharamIndentResponseDTO [lstItemDetails=" + lstItemDetails + "]";
	}
	
	

}
