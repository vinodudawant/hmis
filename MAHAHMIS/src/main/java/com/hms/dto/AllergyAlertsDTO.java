package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class AllergyAlertsDTO {
	private int allergyAlertsMasterID;
	private int allergyAlertsSlaveID;
	private String allergyName;
	private String allergyType;
	private String allergyReaction;
	private String allergyDate;
	private String allergyNotes;
	private List<AllergyAlertsDTO> allergyAlertsDTOList;
	
	@JsonGetter("allergyAlertsMasterID")
	public int getAllergyAlertsMasterID() {
		return allergyAlertsMasterID;
	}

	@JsonSetter("allergyAlertsMasterID")
	public void setAllergyAlertsMasterID(int allergyAlertsMasterID) {
		this.allergyAlertsMasterID = allergyAlertsMasterID;
	}

	@JsonGetter("allergyAlertsSlaveID")
	public int getAllergyAlertsSlaveID() {
		return allergyAlertsSlaveID;
	}

	@JsonSetter("allergyAlerts_ID")
	public void setAllergyAlertsSlaveID(int allergyAlertsSlaveID) {
		this.allergyAlertsSlaveID = allergyAlertsSlaveID;
	}

	@JsonGetter("allergyName")
	public String getAllergyName() {
		return allergyName;
	}

	@JsonSetter("allergyName")
	public void setAllergyName(String allergyName) {
		this.allergyName = allergyName;
	}

	@JsonGetter("allergyType")
	public String getAllergyType() {
		return allergyType;
	}

	@JsonSetter("allergyType")
	public void setAllergyType(String allergyType) {
		this.allergyType = allergyType;
	}

	@JsonGetter("allergyReaction")
	public String getAllergyReaction() {
		return allergyReaction;
	}

	@JsonSetter("allergyReaction")
	public void setAllergyReaction(String allergyReaction) {
		this.allergyReaction = allergyReaction;
	}

	@JsonGetter("allergyDate")
	public String getAllergyDate() {
		return allergyDate;
	}

	@JsonSetter("allergyDate")
	public void setAllergyDate(String allergyDate) {
		this.allergyDate = allergyDate;
	}

	@JsonGetter("allergyNotes")
	public String getAllergyNotes() {
		return allergyNotes;
	}

	@JsonSetter("allergyNotes")
	public void setAllergyNotes(String allergyNotes) {
		this.allergyNotes = allergyNotes;
	}

	@JsonGetter("allergyAlertsDTOList")
	public List<AllergyAlertsDTO> getAllergyAlertsDTOList() {
		return allergyAlertsDTOList;
	}

	@JsonSetter("allergyAlertsDTOList")
	public void setAllergyAlertsDTOList(
			List<AllergyAlertsDTO> allergyAlertsDTOList) {
		this.allergyAlertsDTOList = allergyAlertsDTOList;
	}

}
