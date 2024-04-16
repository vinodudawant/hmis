package com.hms.dto;

import java.io.Serializable;
import java.util.List;

public class RadiotherapyDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private int radiotherapyId;
	private String serum_creatine;
	private String radiationId;
	private String indicationSurgery;
	private String riskFactor;
	private String adviceDate2;
	private List<RadiotherapyDTO>radioList;
	private String radiationName;
	private String instructionsRadio;
	private String adviceDateTreatment;
	
	
	private int treatmentId;
	private int patientId;
	private String advSimTime;
	private String advTrtTime;
	
	private String neoAdjuvant;
	private String adjuvant;
	private String radicalIntent;
	private String radicalPalliative;
	private String concomitantChemo;
	private String branchyTherapy;
	private int userid;
	
	public String getAdvSimTime() {
		return advSimTime;
	}
	public void setAdvSimTime(String advSimTime) {
		this.advSimTime = advSimTime;
	}
	public String getAdvTrtTime() {
		return advTrtTime;
	}
	public void setAdvTrtTime(String advTrtTime) {
		this.advTrtTime = advTrtTime;
	}
	public int getRadiotherapyId() {
		return radiotherapyId;
	}
	public void setRadiotherapyId(int radiotherapyId) {
		this.radiotherapyId = radiotherapyId;
	}
	public String getSerum_creatine() {
		return serum_creatine;
	}
	public void setSerum_creatine(String serum_creatine) {
		this.serum_creatine = serum_creatine;
	}
	public String getRadiationId() {
		return radiationId;
	}
	public void setRadiationId(String radiationId) {
		this.radiationId = radiationId;
	}
	public String getIndicationSurgery() {
		return indicationSurgery;
	}
	public void setIndicationSurgery(String indicationSurgery) {
		this.indicationSurgery = indicationSurgery;
	}
	public String getRiskFactor() {
		return riskFactor;
	}
	public void setRiskFactor(String riskFactor) {
		this.riskFactor = riskFactor;
	}
	public String getAdviceDate2() {
		return adviceDate2;
	}
	public void setAdviceDate2(String adviceDate2) {
		this.adviceDate2 = adviceDate2;
	}
	public List<RadiotherapyDTO> getRadioList() {
		return radioList;
	}
	public void setRadioList(List<RadiotherapyDTO> radioList) {
		this.radioList = radioList;
	}
	public String getRadiationName() {
		return radiationName;
	}
	public void setRadiationName(String radiationName) {
		this.radiationName = radiationName;
	}
	public String getAdviceDateTreatment() {
		return adviceDateTreatment;
	}
	public void setAdviceDateTreatment(String adviceDateTreatment) {
		this.adviceDateTreatment = adviceDateTreatment;
	}
	public String getInstructionsRadio() {
		return instructionsRadio;
	}
	public void setInstructionsRadio(String instructionsRadio) {
		this.instructionsRadio = instructionsRadio;
	}
	public int getTreatmentId() {
		return treatmentId;
	}
	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}
	public int getPatientId() {
		return patientId;
	}
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public String getNeoAdjuvant() {
		return neoAdjuvant;
	}
	public void setNeoAdjuvant(String neoAdjuvant) {
		this.neoAdjuvant = neoAdjuvant;
	}
	public String getAdjuvant() {
		return adjuvant;
	}
	public void setAdjuvant(String adjuvant) {
		this.adjuvant = adjuvant;
	}
	public String getRadicalIntent() {
		return radicalIntent;
	}
	public void setRadicalIntent(String radicalIntent) {
		this.radicalIntent = radicalIntent;
	}
	public String getRadicalPalliative() {
		return radicalPalliative;
	}
	public void setRadicalPalliative(String radicalPalliative) {
		this.radicalPalliative = radicalPalliative;
	}
	public String getBranchyTherapy() {
		return branchyTherapy;
	}
	public void setBranchyTherapy(String branchyTherapy) {
		this.branchyTherapy = branchyTherapy;
	}
	public String getConcomitantChemo() {
		return concomitantChemo;
	}
	public void setConcomitantChemo(String concomitantChemo) {
		this.concomitantChemo = concomitantChemo;
	}
	

}
