package com.hms.operation.util;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class OTOperationNotes {
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
	private List<OTOperationNotes> listOTNotes;
	
	
	@JsonGetter("idOTNotes")
	public int getIdOTOPNotes() {
		return idOTOPNotes;
	}
	@JsonSetter("idOTNotes")
	public void setIdOTOPNotes(int idOTOPNotes) {
		this.idOTOPNotes = idOTOPNotes;
	}
	@JsonGetter("tomid")
	public int getTomID() {
		return tomID;
	}
	@JsonSetter("tomid")
	public void setTomID(int tomID) {
		this.tomID = tomID;
	}
	@JsonGetter("EstBldLoss")
	public String getEstimatedBLoodLoss() {
		return EstimatedBLoodLoss;
	}
	@JsonGetter("ActBldLoss")
	public String getActualBLoodLoss() {
		return ActualBLoodLoss;
	}
	@JsonSetter("ActBldLoss")
	public void setActualBLoodLoss(String actualBLoodLoss) {
		ActualBLoodLoss = actualBLoodLoss;
	}
	@JsonSetter("EstBldLoss")
	public void setEstimatedBLoodLoss(String estimatedBLoodLoss) {
		EstimatedBLoodLoss = estimatedBLoodLoss;
	}
	@JsonGetter("InstCnt")
	public int getInstrumentCount() {
		return InstrumentCount;
	}
	@JsonSetter("InstCnt")
	public void setInstrumentCount(int instrumentCount) {
		InstrumentCount = instrumentCount;
	}
	@JsonGetter("RecBy")
	public String getRecordedBy() {
		return recordedBy;
	}
	@JsonSetter("RecBy")
	public void setRecordedBy(String recordedBy) {
		this.recordedBy = recordedBy;
	}
	@JsonGetter("MOPCnt")
	public String getMopCountRecordedBy() {
		return mopCountRecordedBy;
	}
	@JsonSetter("MOPCnt")
	public void setMopCountRecordedBy(String mopCountRecordedBy) {
		this.mopCountRecordedBy = mopCountRecordedBy;
	}
	@JsonGetter("OTCmt")
	public String getComment() {
		return comment;
	}
	@JsonSetter("OTCmt")
	public void setComment(String comment) {
		this.comment = comment;
	}
	@JsonGetter("idOTTemp")
	public int getTemplateID() {
		return templateID;
	}
	@JsonSetter("idOTTemp")
	public void setTemplateID(int templateID) {
		this.templateID = templateID;
	}
	@JsonGetter("ChkData")
	public String getChkData() {
		return chkData;
	}
	@JsonSetter("ChkData")
	public void setChkData(String chkData) {
		this.chkData = chkData;
	}
	@JsonGetter("listOTNotes")
	public List<OTOperationNotes> getListOTNotes() {
		return listOTNotes;
	}
	@JsonSetter("listOTNotes")
	public void setListOTNotes(List<OTOperationNotes> listOTNotes) {
		this.listOTNotes = listOTNotes;
		}
	
}
