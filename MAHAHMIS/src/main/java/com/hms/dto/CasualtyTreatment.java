package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class CasualtyTreatment {

	private int idCasualtyTreatment;
	private int idCasualtyService;
	private String serviceName;
	private String instruction;
	private String clinicalNotes;
	private int referDocId;
	private int referHosId;
	private int billSlaveID;
	private int casualityUrgent;
	private int hallId;
	
	private List<CasualtyTreatment> cList;
	
	public int getHallId() {
		return hallId;
	}

	public void setHallId(int hallId) {
		this.hallId = hallId;
	}
	
	@JsonGetter("casualityUrgent")
	public int getCasualityUrgent() {
		return casualityUrgent;
	}

	@JsonSetter("casualityUrgent")
	public void setCasualityUrgent(int casualityUrgent) {
		this.casualityUrgent = casualityUrgent;
	}

	@JsonGetter("billSlaveID")
	public int getBillSlaveID() {
		return billSlaveID;
	}

	@JsonSetter("billSlaveID")
	public void setBillSlaveID(int billSlaveID) {
		this.billSlaveID = billSlaveID;
	}

	@JsonGetter("idCasualtyTreatment")
	public int getIdCasualtyTreatment() {
		return idCasualtyTreatment;
	}
	
	@JsonSetter("idCasualtyTreatment")
	public void setIdCasualtyTreatment(int idCasualtyTreatment) {
		this.idCasualtyTreatment = idCasualtyTreatment;
	}
	
	@JsonGetter("idCasualtyService")
	public int getIdCasualtyService() {
		return idCasualtyService;
	}
	
	@JsonSetter("idCasualtyService")
	public void setIdCasualtyService(int idCasualtyService) {
		this.idCasualtyService = idCasualtyService;
	}
	
	@JsonGetter("serviceName")
	public String getServiceName() {
		return serviceName;
	}
	
	@JsonSetter("serviceName")
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	@JsonGetter("cList")	
	public List<CasualtyTreatment> getcList() {
		return cList;
	}
	
	@JsonSetter("cList")
	public void setcList(List<CasualtyTreatment> cList) {
		this.cList = cList;
	}
	@JsonGetter("referHosId")	
	public int getReferHosId() {
		return referHosId;
	}
	@JsonSetter("referHosId")
	public void setReferHosId(int referHosId) {
		this.referHosId = referHosId;
	}
	@JsonGetter("referDocId")	
	public int getReferDocId() {
		return referDocId;
	}
	@JsonSetter("referDocId")
	public void setReferDocId(int referDocId) {
		this.referDocId = referDocId;
	}
	@JsonGetter("instruction")	
	public String getInstruction() {
		return instruction;
	}
	@JsonSetter("instruction")
	public void setInstruction(String instruction) {
		this.instruction = instruction;
	}
	@JsonGetter("clinicalNotes")	
	public String getClinicalNotes() {
		return clinicalNotes;
	}
	@JsonSetter("clinicalNotes")
	public void setClinicalNotes(String clinicalNotes) {
		this.clinicalNotes = clinicalNotes;
	}
	
}
