package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class TreatmentInstructionDTO {

	private int treatmentInstructionID;
	private int treatmentParentInstructionID;
	private int treatmentChildInstructionID;
	private String treatmentParentInstructionName;
	private String treatmentChildInstructionName;
	private List<TreatmentInstructionDTO> treatmentInstructionDTOList;
	private String MarathidInstruction;

	public String getMarathidInstruction() {
		return MarathidInstruction;
	}

	public void setMarathidInstruction(String marathidInstruction) {
		MarathidInstruction = marathidInstruction;
	}

	@JsonGetter("treatmentInstructionID")
	public int getTreatmentInstructionID() {
		return treatmentInstructionID;
	}

	@JsonSetter("treatmentInstructionID")
	public void setTreatmentInstructionID(int treatmentInstructionID) {
		this.treatmentInstructionID = treatmentInstructionID;
	}

	@JsonGetter("treatmentParentInstructionID")
	public int getTreatmentParentInstructionID() {
		return treatmentParentInstructionID;
	}

	@JsonSetter("treatmentParentInstructionID")
	public void setTreatmentParentInstructionID(int treatmentParentInstructionID) {
		this.treatmentParentInstructionID = treatmentParentInstructionID;
	}

	@JsonGetter("treatmentChildInstructionID")
	public int getTreatmentChildInstructionID() {
		return treatmentChildInstructionID;
	}

	@JsonSetter("treatmentChildInstructionID")
	public void setTreatmentChildInstructionID(int treatmentChildInstructionID) {
		this.treatmentChildInstructionID = treatmentChildInstructionID;
	}

	@JsonGetter("treatmentParentInstructionName")
	public String getTreatmentParentInstructionName() {
		return treatmentParentInstructionName;
	}

	@JsonSetter("treatmentParentInstructionName")
	public void setTreatmentParentInstructionName(
			String treatmentParentInstructionName) {
		this.treatmentParentInstructionName = treatmentParentInstructionName;
	}

	@JsonGetter("treatmentChildInstructionName")
	public String getTreatmentChildInstructionName() {
		return treatmentChildInstructionName;
	}

	@JsonSetter("treatmentChildInstructionName")
	public void setTreatmentChildInstructionName(
			String treatmentChildInstructionName) {
		this.treatmentChildInstructionName = treatmentChildInstructionName;
	}

	@JsonGetter("treatmentInstructionDTOList")
	public List<TreatmentInstructionDTO> getTreatmentInstructionDTOList() {
		return treatmentInstructionDTOList;
	}

	@JsonSetter("treatmentInstructionDTOList")
	public void setTreatmentInstructionDTOList(
			List<TreatmentInstructionDTO> treatmentInstructionDTOList) {
		this.treatmentInstructionDTOList = treatmentInstructionDTOList;
	}

}
