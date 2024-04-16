package com.hms.dto;

import java.sql.Timestamp;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class TreatmentDoctors {

	private int iD;
	private int treatment_ID;
	private int doctor_ID;
	private Timestamp time;
	private String precription;
	private String comments;
	private String diagnosis;
	private String presenting_Symptoms;
	private String clinical_Findings;
	private String special_Investigations;
	private String riskFactor;
	private String complications;
	private List<TreatmentDoctors> dtList;
	private String referTo;
	private String treatment_flag;
	private String date;
	private String rmo_precription;
	private String stringTime;
	private String follow_up;
	private String no_of_days;
	private String icdCode;
	private List<ICD10_L> icd10List;
	private String invItem;
	private String phyItem;
	private String casualtyItem;
	private String dentalItem;
	private String pathItem;
	
	private int phyId;
	private int casualtyId;
	private int invId;
	private int dentalId;
	private int pathId;
	
	private List<TreatmentTest> ttList;
	private List<CasualtyTreatment> cList;
	private List<DentalTreatment> dList;
	private List<Radiology> rList;
	private List<Pathology> pList;
	private String topic;

	@JsonGetter("topic")
	public String getTopic() {
		return topic;
	}

	@JsonSetter("topic")
	public void setTopic(String topic) {
		this.topic = topic;
	}
	
	@JsonGetter("phyId")
	public int getPhyId() {
		return phyId;
	}

	@JsonSetter("phyId")
	public void setPhyId(int phyId) {
		this.phyId = phyId;
	}

	@JsonGetter("casualtyId")
	public int getCasualtyId() {
		return casualtyId;
	}

	@JsonSetter("casualtyId")
	public void setCasualtyId(int casualtyId) {
		this.casualtyId = casualtyId;
	}
	
	@JsonGetter("invId")
	public int getInvId() {
		return invId;
	}

	@JsonSetter("invId")
	public void setInvId(int invId) {
		this.invId = invId;
	}

	@JsonGetter("dentalId")
	public int getDentalId() {
		return dentalId;
	}

	@JsonSetter("dentalId")
	public void setDentalId(int dentalId) {
		this.dentalId = dentalId;
	}

	@JsonGetter("pathId")
	public int getPathId() {
		return pathId;
	}

	@JsonSetter("pathId")
	public void setPathId(int pathId) {
		this.pathId = pathId;
	}

	@JsonGetter("phyItem")
	public String getPhyItem() {
		return phyItem;
	}

	@JsonSetter("phyItem")
	public void setPhyItem(String phyItem) {
		this.phyItem = phyItem;
	}

	@JsonGetter("casualtyItem")
	public String getCasualtyItem() {
		return casualtyItem;
	}

	@JsonSetter("casualtyItem")
	public void setCasualtyItem(String casualtyItem) {
		this.casualtyItem = casualtyItem;
	}

	@JsonGetter("dentalItem")
	public String getDentalItem() {
		return dentalItem;
	}

	@JsonSetter("dentalItem")
	public void setDentalItem(String dentalItem) {
		this.dentalItem = dentalItem;
	}

	@JsonGetter("icdli")
	public List<ICD10_L> getIcd10List() {
		return icd10List;
	}

	@JsonSetter("icdli")
	public void setIcd10List(List<ICD10_L> icd10List) {
		this.icd10List = icd10List;
	}

	@JsonGetter("icd")
	public String getIcdCode() {
		return icdCode;
	}

	@JsonSetter("icd")
	public void setIcdCode(String icdCode) {
		this.icdCode = icdCode;
	}

	@JsonGetter("follup")
	public String getFollow_up() {
		return follow_up;
	}

	public void setFollow_up(String follow_up) {
		this.follow_up = follow_up;
	}

	@JsonGetter("noof")
	public String getNo_of_days() {
		return no_of_days;
	}

	public void setNo_of_days(String no_of_days) {
		this.no_of_days = no_of_days;
	}

	@JsonGetter("strtm")
	public String getStringTime() {
		return stringTime;
	}

	@JsonSetter("strtm")
	public void setStringTime(String stringTime) {
		this.stringTime = stringTime;
	}

	@JsonGetter("rpre")
	public String getRmo_precription() {
		return rmo_precription;
	}

	@JsonSetter("rpre")
	public void setRmo_precription(String rmo_precription) {
		this.rmo_precription = rmo_precription;
	}

	@JsonGetter("dt")
	public String getDate() {
		return date;
	}

	@JsonSetter("dt")
	public void setDate(String date) {
		this.date = date;
	}

	/**
	 * @return the treatment_flag
	 */
	@JsonGetter("tf")
	public String getTreatment_flag() {
		return treatment_flag;
	}

	/**
	 * @param treatment_flag
	 *            the treatment_flag to set
	 */
	public void setTreatment_flag(String treatment_flag) {
		this.treatment_flag = treatment_flag;
	}

	/**
	 * @return the dtList
	 */
	@JsonGetter("dtl")
	public List<TreatmentDoctors> getDtList() {
		return dtList;
	}

	/**
	 * @param dtList
	 *            the dtList to set
	 */
	public void setDtList(List<TreatmentDoctors> dtList) {
		this.dtList = dtList;
	}

	public TreatmentDoctors(String clinical_Findings, String comments,
			int doctor_ID, int id, String precription,
			String presenting_Symptoms, String special_Investigations,
			String status, Timestamp time, int treatment_ID) {

		this.clinical_Findings = clinical_Findings;
		this.comments = comments;
		this.doctor_ID = doctor_ID;
		this.iD = id;
		this.precription = precription;
		this.presenting_Symptoms = presenting_Symptoms;
		this.special_Investigations = special_Investigations;
		this.diagnosis = status;
		this.time = time;
		this.treatment_ID = treatment_ID;
	}

	public TreatmentDoctors() {
		
	}

	/**
	 * @return the iD
	 */
	@JsonGetter("id")
	public int getiD() {
		return iD;
	}

	/**
	 * @param id
	 *            the iD to set
	 */
	public void setiD(int id) {
		this.iD = id;
	}

	/**
	 * @return the treatment_ID
	 */
	@JsonGetter("ti")
	public int getTreatment_ID() {
		return treatment_ID;
	}

	/**
	 * @param treatment_ID
	 *            the treatment_ID to set
	 */
	public void setTreatment_ID(int treatment_ID) {
		this.treatment_ID = treatment_ID;
	}

	/**
	 * @return the doctor_ID
	 */
	@JsonGetter("di")
	public int getDoctor_ID() {
		return doctor_ID;
	}

	/**
	 * @param doctor_ID
	 *            the doctor_ID to set
	 */
	public void setDoctor_ID(int doctor_ID) {
		this.doctor_ID = doctor_ID;
	}

	/**
	 * @return the time
	 */
	@JsonGetter("tm")
	public Timestamp getTime() {
		return time;
	}

	/**
	 * @param timestamp
	 *            the time to set
	 */
	public void setTime(Timestamp timestamp) {
		this.time = timestamp;
	}

	/**
	 * @return the precription
	 */
	@JsonGetter("pre")
	public String getPrecription() {
		return precription;
	}

	/**
	 * @param precription
	 *            the precription to set
	 */
	public void setPrecription(String precription) {
		this.precription = precription;
	}

	/**
	 * @return the comments
	 */
	@JsonGetter("co")
	public String getComments() {
		return comments;
	}

	/**
	 * @param comments
	 *            the comments to set
	 */
	public void setComments(String comments) {
		this.comments = comments;
	}

	/**
	 * @return the diagnosis
	 */
	@JsonGetter("st")
	public String getDiagnosis() {
		return diagnosis;
	}

	/**
	 * @param diagnosis
	 *            the diagnosis to set
	 */
	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}

	/**
	 * @return the status
	 */

	/**
	 * @return the presenting_Symptoms
	 */
	@JsonGetter("ps")
	public String getPresenting_Symptoms() {
		return presenting_Symptoms;
	}

	/**
	 * @param presenting_Symptoms
	 *            the presenting_Symptoms to set
	 */
	public void setPresenting_Symptoms(String presenting_Symptoms) {
		this.presenting_Symptoms = presenting_Symptoms;
	}

	/**
	 * @return the clinical_Findings
	 */
	@JsonGetter("cf")
	public String getClinical_Findings() {
		return clinical_Findings;
	}

	/**
	 * @param clinical_Findings
	 *            the clinical_Findings to set
	 */
	public void setClinical_Findings(String clinical_Findings) {
		this.clinical_Findings = clinical_Findings;
	}

	/**
	 * @return the special_Investigations
	 */
	@JsonGetter("si")
	public String getSpecial_Investigations() {
		return special_Investigations;
	}

	/**
	 * @param special_Investigations
	 *            the special_Investigations to set
	 */
	public void setSpecial_Investigations(String special_Investigations) {
		this.special_Investigations = special_Investigations;
	}

	public void setReferTo(String referTo) {
		this.referTo = referTo;
	}

	@JsonGetter("rt")
	public String getReferTo() {
		return referTo;
	}

	@JsonGetter("rf")
	public String getRiskFactor() {
		return riskFactor;
	}

	public void setRiskFactor(String riskFactor) {
		this.riskFactor = riskFactor;
	}

	@JsonGetter("cm")
	public String getComplications() {
		return complications;
	}

	public void setComplications(String complications) {
		this.complications = complications;
	}

	@JsonGetter("invItem")
	public String getInvItem() {
		return invItem;
	}

	@JsonSetter("invItem")
	public void setInvItem(String invItem) {
		this.invItem = invItem;
	}

	@JsonGetter("pathItem")
	public String getPathItem() {
		return pathItem;
	}

	@JsonSetter("pathItem")
	public void setPathItem(String pathItem) {
		this.pathItem = pathItem;
	}

	@JsonGetter("ttList")
	public List<TreatmentTest> getTtList() {
		return ttList;
	}

	@JsonSetter("ttList")
	public void setTtList(List<TreatmentTest> ttList) {
		this.ttList = ttList;
	}
	
	@JsonGetter("rList")
	public List<Radiology> getrList() {
		return rList;
	}

	@JsonSetter("rList")
	public void setrList(List<Radiology> rList) {
		this.rList = rList;
	} 
	
	@JsonGetter("dList")
	public List<DentalTreatment> getdList() {
		return dList;
	}
	
	@JsonSetter("dList")
	public void setdList(List<DentalTreatment> dList) {
		this.dList = dList;
	}
	
	@JsonGetter("cList")
	public List<CasualtyTreatment> getcList() {
		return cList;
	}
	
	@JsonSetter("cList")
	public void setcList(List<CasualtyTreatment> cList) {
		this.cList = cList;
	}
	
	@JsonGetter("pList")
	public List<Pathology> getpList() {
		return pList;
	}
	
	@JsonSetter("pList")
	public void setpList(List<Pathology> pList) {
		this.pList = pList;
	}
	
}
