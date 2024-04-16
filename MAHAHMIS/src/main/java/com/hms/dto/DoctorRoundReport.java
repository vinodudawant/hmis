package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

@Entity
@Table(name = "doctorroundreport")
public class DoctorRoundReport implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "drr_id")
	private int drr_id;
	
	@Column(name = "Treatment_ID")
	private int Treatment_ID;

	@Column(name = "date")
	private String date;
	
	@Column(name = "time")
	private String time;
	
	@Column(name="clinical_note")
	private String clinical_note;
	
	@Column(name="treatment")
	private String treatment;

	@Column(name = "roundby")
	private String roundby;

	@Column(name = "status")
	private String status;
	
	@Column(name = "inv_adv")
	private String investigation_advice;
	
	@Column(name = "treatment_bed_id")
	private int treatmentbedid;
	
	@Column(name = "template_val")
	private int templateVal;
		
	@Column(name = "doc_name")
	private String docName;
	
	
	@Column(name = "dr_r_complition_time")
	private String complitionTime;
	
	@Column(name = "nursing_notes")
	private String nursingNotes;
	
	@Column(name = "nurse_add_date")
	private String nurseAddDate;
	
	@Column(name = "nurse_add_time")
	private String nurseAddTime;

	@Column(name = "nurse_user_ip")
	private String userIp;
	
	@Column(name = "nurse_user_id")
	private int userId;
	
	@Column(name="bil_id")
	private int bill_details_id;
	
	@Column(name="temp_name")
	private String tempName;

	@Transient
	private List<DoctorRoundReport> drrList;

	
	public String getDocName() {
		return docName;
	}
	public void setDocName(String docName) {
		this.docName = docName;
	}
	@JsonGetter("blid")
	public int getBill_details_id() {
		return bill_details_id;
	}
	@JsonSetter("blid")
	public void setBill_details_id(int bill_details_id) {
		this.bill_details_id = bill_details_id;
	}

	@JsonGetter("ct")
	public String getComplitionTime() {
		return complitionTime;
	}

	@JsonSetter("ct")
	public void setComplitionTime(String complitionTime) {
		this.complitionTime = complitionTime;
	}

	@JsonGetter("nn")
	public String getNursingNotes() {
		return nursingNotes;
	}

	@JsonSetter("nn")
	public void setNursingNotes(String nursingNotes) {
		this.nursingNotes = nursingNotes;
	}

	@JsonGetter("nad")
	public String getNurseAddDate() {
		return nurseAddDate;
	}

	@JsonSetter("nad")
	public void setNurseAddDate(String nurseAddDate) {
		this.nurseAddDate = nurseAddDate;
	}

	@JsonGetter("nat")
	public String getNurseAddTime() {
		return nurseAddTime;
	}

	@JsonSetter("nat")
	public void setNurseAddTime(String nurseAddTime) {
		this.nurseAddTime = nurseAddTime;
	}

	@JsonGetter("uip")
	public String getUserIp() {
		return userIp;
	}

	@JsonSetter("uip")
	public void setUserIp(String userIp) {
		this.userIp = userIp;
	}

	@JsonGetter("uid")
	public int getUserId() {
		return userId;
	}

	@JsonSetter("uid")
	public void setUserId(int userId) {
		this.userId = userId;
	}

	@JsonGetter("tn")
	public int getTemplateVal() {
		return templateVal;
	}

	@JsonSetter("tn")
	public void setTemplateVal(int templateVal) {
		this.templateVal = templateVal;
	}

	@JsonGetter("trbid")
	public int getTreatmentbedid() {
		return treatmentbedid;
	}

	@JsonSetter("trbid")
	public void setTreatmentbedid(int treatmentbedid) {
		this.treatmentbedid = treatmentbedid;
	}

	@JsonGetter("ia")
	public String getInvestigation_advice() {
		return investigation_advice;
	}

	@JsonSetter("ia")
	public void setInvestigation_advice(String investigation_advice) {
		this.investigation_advice = investigation_advice;
	}

	/**
	 * @return the roundby
	 */
	@JsonGetter("rb")
	public String getRoundby() {
		return roundby;
	}

	/**
	 * @param roundby
	 *            the roundby to set
	 */
	@JsonSetter("rb")
	public void setRoundby(String roundby) {
		this.roundby = roundby;
	}

	
	/**
	 * @return the drrList
	 */
	@JsonGetter("drrl")
	public List<DoctorRoundReport> getDrrList() {
		return drrList;
	}

	/**
	 * @param drrList
	 *            the drrList to set
	 */
	@JsonSetter("drrl")
	public void setDrrList(List<DoctorRoundReport> drrList) {
		this.drrList = drrList;
	}

	/**
	 * @return the drr_id
	 */
	@JsonGetter("di")
	public int getDrr_id() {
		return drr_id;
	}

	/**
	 * @param drr_id
	 *            the drr_id to set
	 */
	@JsonSetter("di")
	public void setDrr_id(int drr_id) {
		this.drr_id = drr_id;
	}

	/**
	 * @return the treatment_ID
	 */
	@JsonGetter("ti")
	public int getTreatment_ID() {
		return Treatment_ID;
	}

	/**
	 * @param treatment_ID
	 *            the treatment_ID to set
	 */
	@JsonSetter("ti")
	public void setTreatment_ID(int treatment_ID) {
		Treatment_ID = treatment_ID;
	}

	/**
	 * @return the date
	 */
	@JsonGetter("dt")
	public String getDate() {
		return date;
	}

	/**
	 * @param date
	 *            the date to set
	 */
	@JsonSetter("dt")
	public void setDate(String date) {
		this.date = date;
	}

	/**
	 * @return the time
	 */
	@JsonGetter("tm")
	public String getTime() {
		return time;
	}

	/**
	 * @param time
	 *            the time to set
	 */
	@JsonSetter("tm")
	public void setTime(String time) {
		this.time = time;
	}

	/**
	 * @return the clinical_note
	 */
	@JsonGetter("cn")
	public String getClinical_note() {
		return clinical_note;
	}

	/**
	 * @param clinical_note
	 *            the clinical_note to set
	 */
	@JsonSetter("cn")
	public void setClinical_note(String clinical_note) {
		this.clinical_note = clinical_note;
	}

	/**
	 * @return the treatment
	 */
	@JsonGetter("tr")
	public String getTreatment() {
		return treatment;
	}

	/**
	 * @param treatment
	 *            the treatment to set
	 */
	@JsonSetter("tr")
	public void setTreatment(String treatment) {
		this.treatment = treatment;
	}
	@JsonGetter("Tname")
	public String gettName() {
		return tempName;
	}

	@JsonSetter("Tname")
	public void settName(String tempName) {
		this.tempName = tempName;
	}
	
	private String docnameroundby;


	public String getDocnameroundby() {
		return docnameroundby;
	}
	public void setDocnameroundby(String docnameroundby) {
		this.docnameroundby = docnameroundby;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getTempName() {
		return tempName;
	}
	public void setTempName(String tempName) {
		this.tempName = tempName;
	}
	
	
}
