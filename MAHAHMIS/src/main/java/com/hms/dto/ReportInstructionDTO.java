package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class ReportInstructionDTO {

	private int reportInstructionID;
	private String reportInstruction;

	private String reportInstructionHindi;
	private String reportInstructionMarathi;
	private String reportInstructionOther1;
	private String reportInstructionOther2;
	private String reportInstructionOther3;
	private String mandatoryInstFlag;

	private List<ReportInstructionDTO> reportInstructionDTOList;

	@JsonGetter("reportInstructionID")
	public int getReportInstructionID() {
		return reportInstructionID;
	}

	@JsonSetter("reportInstructionID")
	public void setReportInstructionID(int reportInstructionID) {
		this.reportInstructionID = reportInstructionID;
	}

	@JsonGetter("reportInstruction")
	public String getReportInstruction() {
		return reportInstruction;
	}

	@JsonSetter("reportInstruction")
	public void setReportInstruction(String reportInstruction) {
		this.reportInstruction = reportInstruction;
	}

	@JsonGetter("reportInstructionDTOList")
	public List<ReportInstructionDTO> getReportInstructionDTOList() {
		return reportInstructionDTOList;
	}

	@JsonSetter("reportInstructionDTOList")
	public void setReportInstructionDTOList(
			List<ReportInstructionDTO> reportInstructionDTOList) {
		this.reportInstructionDTOList = reportInstructionDTOList;
	}

	@JsonGetter("reportInstructionHindi")
	public String getReportInstructionHindi() {
		return reportInstructionHindi;
	}

	@JsonSetter("reportInstructionHindi")
	public void setReportInstructionHindi(String reportInstructionHindi) {
		this.reportInstructionHindi = reportInstructionHindi;
	}

	@JsonGetter("reportInstructionMarathi")
	public String getReportInstructionMarathi() {
		return reportInstructionMarathi;
	}

	@JsonSetter("reportInstructionMarathi")
	public void setReportInstructionMarathi(String reportInstructionMarathi) {
		this.reportInstructionMarathi = reportInstructionMarathi;
	}

	@JsonGetter("reportInstructionOther1")
	public String getReportInstructionOther1() {
		return reportInstructionOther1;
	}

	@JsonSetter("reportInstructionOther1")
	public void setReportInstructionOther1(String reportInstructionOther1) {
		this.reportInstructionOther1 = reportInstructionOther1;
	}

	@JsonGetter("reportInstructionOther2")
	public String getReportInstructionOther2() {
		return reportInstructionOther2;
	}

	@JsonSetter("reportInstructionOther2")
	public void setReportInstructionOther2(String reportInstructionOther2) {
		this.reportInstructionOther2 = reportInstructionOther2;
	}

	@JsonGetter("reportInstructionOther3")
	public String getReportInstructionOther3() {
		return reportInstructionOther3;
	}

	@JsonSetter("reportInstructionOther3")
	public void setReportInstructionOther3(String reportInstructionOther3) {
		this.reportInstructionOther3 = reportInstructionOther3;
	}

	@JsonGetter("mandatoryInstFlag")
	public String getMandatoryInstFlag() {
		return mandatoryInstFlag;
	}

	@JsonSetter("mandatoryInstFlag")
	public void setMandatoryInstFlag(String mandatoryInstFlag) {
		this.mandatoryInstFlag = mandatoryInstFlag;
	}

}
