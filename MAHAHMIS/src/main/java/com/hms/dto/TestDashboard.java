package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class TestDashboard {
	
	private int id;
	private String desciption;
	private String perticuler;
	private String date;
	private String consultant;
	private String instructions;
	private String status;
	private List<TestDashboard> testDashboard;

	private String testCode;
	private String bodyPartName;
	private String clinicalNotes;
	private int idradiologyGroup;
	private int idradiologyBodyPart;
	private int refDocId;
	private int refHospId;
	private int idcasualityservice;
	
	private String testType; // pathology, investigation, Casuality Services
	private int billSlaveID;
	private int investigationSlaveID;
	private String urgentflag;
	private String timeOfEntery;
	


	@JsonGetter("urgentflag")
	public String getUrgentflag() {
		return urgentflag;
	}

	@JsonSetter("urgentflag")
	public void setUrgentflag(String urgentflag) {
		this.urgentflag = urgentflag;
	}

	@JsonGetter("billSlaveID")
	public int getBillSlaveID() {
		return billSlaveID;
	}
	
	@JsonSetter("billSlaveID")
	public void setBillSlaveID(int billSlaveID) {
		this.billSlaveID = billSlaveID;
	}
	
	@JsonGetter("investigationSlaveID")
	public int getInvestigationSlaveID() {
		return investigationSlaveID;
	}

	@JsonSetter("investigationSlaveID")
	public void setInvestigationSlaveID(int investigationSlaveID) {
		this.investigationSlaveID = investigationSlaveID;
	}

	@JsonGetter("perticuler")
	public String getPerticuler() {
		return perticuler;
	}
	@JsonSetter("perticuler")
	public void setPerticuler(String perticuler) {
		this.perticuler = perticuler;
	}
	@JsonGetter("date")
	public String getDate() {
		return date;
	}
	@JsonSetter("date")
	public void setDate(String date) {
		this.date = date;
	}
	@JsonGetter("consultant")
	public String getConsultant() {
		return consultant;
	}
	@JsonSetter("consultant")
		public void setConsultant(String consultant) {
		this.consultant = consultant;
	}
		@JsonGetter("instructions")
	public String getInstructions() {
		return instructions;
	}
		@JsonSetter("instructions")
	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}
	@JsonGetter("status")
	public String getStatus() {
		return status;
	}
	@JsonSetter("status")
	public void setStatus(String status) {
		this.status = status;
	}
	@JsonGetter("testDashboard")
	public List<TestDashboard> getTestDashboard() {
		return testDashboard;
	}
	@JsonSetter("testDashboard")
	public void setTestDashboard(List<TestDashboard> testDashboard) {
		this.testDashboard = testDashboard;
	}
	@JsonGetter("id")
	public int getId() {
		return id;
	}
	@JsonSetter("id")
	public void setId(int id) {
		this.id = id;
	}
	@JsonGetter("desciption")
	public String getDesciption() {
		return desciption;
	}
	@JsonSetter("desciption")
	public void setDesciption(String desciption) {
		this.desciption = desciption;
	}

	public String getTestType() {
		return testType;
	}

	public void setTestType(String testType) {
		this.testType = testType;
	}

	public String getTestCode() {
		return testCode;
	}

	public void setTestCode(String testCode) {
		this.testCode = testCode;
	}

	public String getBodyPartName() {
		return bodyPartName;
	}

	public void setBodyPartName(String bodyPartName) {
		this.bodyPartName = bodyPartName;
	}

	public String getClinicalNotes() {
		return clinicalNotes;
	}

	public void setClinicalNotes(String clinicalNotes) {
		this.clinicalNotes = clinicalNotes;
	}
	public int getIdradiologyGroup() {
		return idradiologyGroup;
	}
	public void setIdradiologyGroup(int idradiologyGroup) {
		this.idradiologyGroup = idradiologyGroup;
	}
	public int getIdradiologyBodyPart() {
		return idradiologyBodyPart;
	}
	public void setIdradiologyBodyPart(int idradiologyBodyPart) {
		this.idradiologyBodyPart = idradiologyBodyPart;
	}
	public int getRefDocId() {
		return refDocId;
	}
	public void setRefDocId(int refDocId) {
		this.refDocId = refDocId;
	}
	public int getRefHospId() {
		return refHospId;
	}
	public void setRefHospId(int refHospId) {
		this.refHospId = refHospId;
	}
	public int getIdcasualityservice() {
		return idcasualityservice;
	}
	public void setIdcasualityservice(int idcasualityservice) {
		this.idcasualityservice = idcasualityservice;
	}
	@JsonGetter("time")
	public String getTimeOfEntery() {
		return timeOfEntery;
	}
	@JsonSetter("time")
	public void setTimeOfEntery(String timeOfEntery) {
		this.timeOfEntery = timeOfEntery;
	}


}
