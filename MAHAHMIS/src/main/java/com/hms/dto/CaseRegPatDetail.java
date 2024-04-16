package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class CaseRegPatDetail {

	private String category;
	private String admission_date;
	private String discharge_date;
	private String shifting_date;
	private String status;

	private List<CaseRegPatDetail> caseRegPatDetaillist;

	@JsonGetter("ct")
	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	@JsonGetter("ad")
	public String getAdmission_date() {
		return admission_date;
	}

	public void setAdmission_date(String admission_date) {
		this.admission_date = admission_date;
	}

	@JsonGetter("dd")
	public String getDischarge_date() {
		return discharge_date;
	}

	public void setDischarge_date(String discharge_date) {
		this.discharge_date = discharge_date;
	}

	@JsonGetter("sd")
	public String getShifting_date() {
		return shifting_date;
	}

	public void setShifting_date(String shifting_date) {
		this.shifting_date = shifting_date;
	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("crli")
	public List<CaseRegPatDetail> getCaseRegPatDetaillist() {
		return caseRegPatDetaillist;
	}

	public void setCaseRegPatDetaillist(
			List<CaseRegPatDetail> caseRegPatDetaillist) {
		this.caseRegPatDetaillist = caseRegPatDetaillist;
	}

}
