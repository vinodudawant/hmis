package com.hms.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LabTestResultMaster implements Serializable {
	private int idlabTestResultMaster;
	private String approveFlag;
	private String collected_on;
	private String printtests;
	private String dateOfEntry;
	private int idlabPatient;
	private int refDocId;
	private int technicianId;
	private int collectionCenterId;
	private String emergencyPatFlag;
	private Date reportDate;
	private String resultmasterstatus;
	private String reportDueDate;
	private Date approveDate;
	private int idlabPatientType;
	private List<LabTestResultMaster> testresultmasterli;
	private LabPatient objPatient;
	private String collTime;
	private String collOuttime;
	private String colloutDate;
	private String reportDueTime;
	private Float billAmount;
	private String outsourceFlag;
	private int treatment_ID;
	private String refDocNm;
	private String reportNote;
	private String trePatientType;
	private String timeOfEntry;
	private String previousTreatmentFlag;
	private List<LabTest> testlist;
	

	@JsonGetter("trPtTyp")
	public String getTrePatientType() {
		return trePatientType;
	}

	@JsonSetter("trPtTyp")
	public void setTrePatientType(String trePatientType) {
		this.trePatientType = trePatientType;
	}

	@JsonGetter("repnote")
	public String getReportNote() {
		return reportNote;
	}

	@JsonSetter("repnote")
	public void setReportNote(String reportNote) {
		this.reportNote = reportNote;
	}

	@JsonGetter("rfDocNm")
	public String getRefDocNm() {
		return refDocNm;
	}

	@JsonSetter("rfDocNm")
	public void setRefDocNm(String refDocNm) {
		this.refDocNm = refDocNm;
	}

	@JsonGetter("tretId")
	public int getTreatment_ID() {
		return treatment_ID;
	}

	@JsonSetter("tretId")
	public void setTreatment_ID(int treatment_ID) {
		this.treatment_ID = treatment_ID;
	}

	@JsonGetter("outfg")
	public String getOutsourceFlag() {
		return outsourceFlag;
	}

	@JsonSetter("outfg")
	public void setOutsourceFlag(String outsourceFlag) {
		this.outsourceFlag = outsourceFlag;
	}

	@JsonGetter("amt")
	public Float getBillAmount() {
		return billAmount;
	}

	@JsonSetter("amt")
	public void setBillAmount(Float billAmount) {
		this.billAmount = billAmount;
	}

	@JsonGetter("rdutm")
	public String getReportDueTime() {
		return reportDueTime;
	}

	@JsonSetter("rdutm")
	public void setReportDueTime(String reportDueTime) {
		this.reportDueTime = reportDueTime;
	}

	@JsonGetter("colltm")
	public String getCollTime() {
		return collTime;
	}

	@JsonSetter("colltm")
	public void setCollTime(String collTime) {
		this.collTime = collTime;
	}

	@JsonGetter("couttm")
	public String getCollOuttime() {
		return collOuttime;
	}

	@JsonSetter("couttm")
	public void setCollOuttime(String collOuttime) {
		this.collOuttime = collOuttime;
	}

	@JsonGetter("coutdt")
	public String getColloutDate() {
		return colloutDate;
	}

	@JsonSetter("coutdt")
	public void setColloutDate(String colloutDate) {
		this.colloutDate = colloutDate;
	}

	@JsonGetter("objp")
	public LabPatient getObjPatient() {
		return objPatient;
	}

	@JsonSetter("objp")
	public void setObjPatient(LabPatient objPatient) {
		this.objPatient = objPatient;
	}

	@JsonGetter("trmli")
	public List<LabTestResultMaster> getTestresultmasterli() {
		return testresultmasterli;
	}

	@JsonSetter("trmli")
	public void setTestresultmasterli(
			List<LabTestResultMaster> testresultmasterli) {
		this.testresultmasterli = testresultmasterli;
	}

	@JsonGetter("tmid")
	public int getIdlabTestResultMaster() {
		return idlabTestResultMaster;
	}

	@JsonGetter("tmid")
	public void setIdlabTestResultMaster(int idlabTestResultMaster) {
		this.idlabTestResultMaster = idlabTestResultMaster;
	}

	@JsonGetter("tmaf")
	public String getApproveFlag() {
		return approveFlag;
	}

	@JsonSetter("tmaf")
	public void setApproveFlag(String approveFlag) {
		this.approveFlag = approveFlag;
	}

	@JsonGetter("tmcoll")
	public String getCollected_on() {
		return collected_on;
	}

	@JsonSetter("tmcoll")
	public void setCollected_on(String collected_on) {
		this.collected_on = collected_on;
	}

	@JsonGetter("tmps")
	public String getPrinttests() {
		return printtests;
	}

	@JsonSetter("tmps")
	public void setPrinttests(String printtests) {
		this.printtests = printtests;
	}

	@JsonGetter("tmdt")
	public String getDateOfEntry() {
		return dateOfEntry;
	}

	@JsonSetter("tmdt")
	public void setDateOfEntry(String dateOfEntry) {
		this.dateOfEntry = dateOfEntry;
	}

	@JsonGetter("pid")
	public int getIdlabPatient() {
		return idlabPatient;
	}

	@JsonSetter("pid")
	public void setIdlabPatient(int idlabPatient) {
		this.idlabPatient = idlabPatient;
	}

	@JsonGetter("did")
	public int getRefDocId() {
		return refDocId;
	}

	@JsonSetter("did")
	public void setRefDocId(int refDocId) {
		this.refDocId = refDocId;
	}

	@JsonGetter("tid")
	public int getTechnicianId() {
		return technicianId;
	}

	@JsonSetter("tid")
	public void setTechnicianId(int technicianId) {
		this.technicianId = technicianId;
	}

	@JsonGetter("cid")
	public int getCollectionCenterId() {
		return collectionCenterId;
	}

	@JsonSetter("cid")
	public void setCollectionCenterId(int collectionCenterId) {
		this.collectionCenterId = collectionCenterId;
	}

	@JsonGetter("eflg")
	public String getEmergencyPatFlag() {
		return emergencyPatFlag;
	}

	@JsonSetter("eflg")
	public void setEmergencyPatFlag(String emergencyPatFlag) {
		this.emergencyPatFlag = emergencyPatFlag;
	}

	@JsonGetter("rdt")
	public Date getReportDate() {
		return reportDate;
	}

	@JsonSetter("rdt")
	public void setReportDate(Date reportDate) {
		this.reportDate = reportDate;
	}

	@JsonGetter("tmst")
	public String getResultmasterstatus() {
		return resultmasterstatus;
	}

	@JsonSetter("tmst")
	public void setResultmasterstatus(String resultmasterstatus) {
		this.resultmasterstatus = resultmasterstatus;
	}

	@JsonGetter("tmdd")
	public String getReportDueDate() {
		return reportDueDate;
	}

	@JsonSetter("tmdd")
	public void setReportDueDate(String reportDueDate) {
		this.reportDueDate = reportDueDate;
	}

	@JsonGetter("tmad")
	public Date getApproveDate() {
		return approveDate;
	}

	@JsonSetter("tmad")
	public void setApproveDate(Date approveDate) {
		this.approveDate = approveDate;
	}

	@JsonGetter("tmpty")
	public int getIdlabPatientType() {
		return idlabPatientType;
	}

	@JsonSetter("tmpty")
	public void setIdlabPatientType(int idlabPatientType) {
		this.idlabPatientType = idlabPatientType;
	}
	@JsonGetter("tofen")
	public String getTimeOfEntry() {
		return timeOfEntry;
	}
	@JsonSetter("tofen")
	public void setTimeOfEntry(String timeOfEntry) {
		this.timeOfEntry = timeOfEntry;
	}
	@JsonGetter("ptflag")
	public String getPreviousTreatmentFlag() {
		return previousTreatmentFlag;
	}
	@JsonSetter("ptflag")
	public void setPreviousTreatmentFlag(String previousTreatmentFlag) {
		this.previousTreatmentFlag = previousTreatmentFlag;
	}
	@JsonGetter("testlist")
	public List<LabTest> getTestlist() {
		return testlist;
	}
	@JsonSetter("testlist")
	public void setTestlist(List<LabTest> testlist) {
		this.testlist = testlist;
	}

}
