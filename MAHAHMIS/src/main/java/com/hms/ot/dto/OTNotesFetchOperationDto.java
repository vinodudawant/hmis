package com.hms.ot.dto;

import java.util.List;

public class OTNotesFetchOperationDto {

	private int idOTOPNotes;
	private int tomID;
	private String EstimatedBLoodLoss;
	private String ActualBLoodLoss;
	private int InstrumentCount;
	private String recordedBy;
	private String mopCountRecordedBy;
	private String comment;
	private int templateID;
	private String chkData;
	private String implantdetails;
	private String opName;
	private String updatedDateTime;
	private List<OTNotesFetchOperationDto> listOTNotes;
	
	
	public int getIdOTOPNotes() {
		return idOTOPNotes;
	}
	public void setIdOTOPNotes(int idOTOPNotes) {
		this.idOTOPNotes = idOTOPNotes;
	}
	public int getTomID() {
		return tomID;
	}
	public void setTomID(int tomID) {
		this.tomID = tomID;
	}
	public String getEstimatedBLoodLoss() {
		return EstimatedBLoodLoss;
	}
	public void setEstimatedBLoodLoss(String estimatedBLoodLoss) {
		EstimatedBLoodLoss = estimatedBLoodLoss;
	}
	public String getActualBLoodLoss() {
		return ActualBLoodLoss;
	}
	public void setActualBLoodLoss(String actualBLoodLoss) {
		ActualBLoodLoss = actualBLoodLoss;
	}
	public int getInstrumentCount() {
		return InstrumentCount;
	}
	public void setInstrumentCount(int instrumentCount) {
		InstrumentCount = instrumentCount;
	}
	public String getRecordedBy() {
		return recordedBy;
	}
	public void setRecordedBy(String recordedBy) {
		this.recordedBy = recordedBy;
	}
	public String getMopCountRecordedBy() {
		return mopCountRecordedBy;
	}
	public void setMopCountRecordedBy(String mopCountRecordedBy) {
		this.mopCountRecordedBy = mopCountRecordedBy;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public int getTemplateID() {
		return templateID;
	}
	public void setTemplateID(int templateID) {
		this.templateID = templateID;
	}
	public String getChkData() {
		return chkData;
	}
	public void setChkData(String chkData) {
		this.chkData = chkData;
	}
	public String getImplantdetails() {
		return implantdetails;
	}
	public void setImplantdetails(String implantdetails) {
		this.implantdetails = implantdetails;
	}
	public String getOpName() {
		return opName;
	}
	public void setOpName(String opName) {
		this.opName = opName;
	}
	public String getUpdatedDateTime() {
		return updatedDateTime;
	}
	public void setUpdatedDateTime(String updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}
	public List<OTNotesFetchOperationDto> getListOTNotes() {
		return listOTNotes;
	}
	public void setListOTNotes(List<OTNotesFetchOperationDto> listOTNotes) {
		this.listOTNotes = listOTNotes;
	}
}
