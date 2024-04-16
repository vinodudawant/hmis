package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class IpdPatientRelativeDetails {

	private int patientRelativeId;
	private String patientRelativeTitle;
	private String patientRelativeFirstName;
	private String patientRelativeLastName;
	private String patientRelativeSex;
	private String patientRelativeMobile;
	private String patientRelativeEmail;
	private String patientRelativeAge;
	private String patientRelativeRelation;
	private String patientRelativeAddress;
	private int ipdDoctor_id;
	private int ipdDoctor_spl_id;
	private int ipdDoctor_dept_id;
	private List<PatientSponsredDetails> PatientSponsredDetails;
	private List<MLCDetail> MLCDetail;
	private String mamono;
	private String dischargetype;
	private String referdocname;
	private String operationdate;
	
	public String getOperationdate() {
		return operationdate;
	}
	public void setOperationdate(String operationdate) {
		this.operationdate = operationdate;
	}
	@JsonGetter("referdocname")
	public String getReferdocname() {
		return referdocname;
	}
	@JsonSetter("referdocname")
	public void setReferdocname(String referdocname) {
		this.referdocname = referdocname;
	}
	@JsonGetter("dischargetype")
	public String getDischargetype() {
		return dischargetype;
	}
	@JsonSetter("dischargetype")
	public void setDischargetype(String dischargetype) {
		this.dischargetype = dischargetype;
	}
	@JsonSetter("mamono")
	public String getMamono() {
		return mamono;
	}
	@JsonSetter("mamono")
	public void setMamono(String mamono) {
		this.mamono = mamono;
	}
	@JsonGetter("MLCDetailList")
	public List<MLCDetail> getMLCDetail() {
		return MLCDetail;
	}
	@JsonSetter("MLCDetailList")
	public void setMLCDetail(List<MLCDetail> mLCDetail) {
		MLCDetail = mLCDetail;
	}
	@JsonGetter("PatSponsorDetList")
	public List<PatientSponsredDetails> getPatientSponsredDetails() {
		return PatientSponsredDetails;
	}
	@JsonSetter("PatSponsorDetList")
	public void setPatientSponsredDetails(
			List<PatientSponsredDetails> patientSponsredDetails) {
		PatientSponsredDetails = patientSponsredDetails;
	}
	@JsonGetter("ipdDoctor_id")
	public int getIpdDoctor_id() {
		return ipdDoctor_id;
	}
	@JsonSetter("ipdDoctor_id")
	public void setIpdDoctor_id(int ipdDoctor_id) {
		this.ipdDoctor_id = ipdDoctor_id;
	}
	@JsonGetter("ipdDoctor_spl_id")
	public int getIpdDoctor_spl_id() {
		return ipdDoctor_spl_id;
	}
	@JsonSetter("ipdDoctor_spl_id")
	public void setIpdDoctor_spl_id(int ipdDoctor_spl_id) {
		this.ipdDoctor_spl_id = ipdDoctor_spl_id;
	}
	@JsonGetter("ipdDoctor_dept_id")
	public int getIpdDoctor_dept_id() {
		return ipdDoctor_dept_id;
	}
	@JsonSetter("ipdDoctor_dept_id")
	public void setIpdDoctor_dept_id(int ipdDoctor_dept_id) {
		this.ipdDoctor_dept_id = ipdDoctor_dept_id;
	}
	@JsonGetter("patientRelativeId")
	public int getPatientRelativeId() {
		return patientRelativeId;
	}
	@JsonSetter("patientRelativeId")
	public void setPatientRelativeId(int patientRelativeId) {
		this.patientRelativeId = patientRelativeId;
	}
	@JsonGetter("patientRelativeTitle")
	public String getPatientRelativeTitle() {
		return patientRelativeTitle;
	}
	@JsonSetter("patientRelativeTitle")
	public void setPatientRelativeTitle(String patientRelativeTitle) {
		this.patientRelativeTitle = patientRelativeTitle;
	}
	@JsonGetter("patientRelativeFirstName")
	public String getPatientRelativeFirstName() {
		return patientRelativeFirstName;
	}
	@JsonSetter("patientRelativeFirstName")
	public void setPatientRelativeFirstName(String patientRelativeFirstName) {
		this.patientRelativeFirstName = patientRelativeFirstName;
	}
	@JsonGetter("patientRelativeLastName")
	public String getPatientRelativeLastName() {
		return patientRelativeLastName;
	}
	@JsonSetter("patientRelativeLastName")
	public void setPatientRelativeLastName(String patientRelativeLastName) {
		this.patientRelativeLastName = patientRelativeLastName;
	}
	@JsonGetter("patientRelativeSex")
	public String getPatientRelativeSex() {
		return patientRelativeSex;
	}
	@JsonSetter("patientRelativeSex")
	public void setPatientRelativeSex(String patientRelativeSex) {
		this.patientRelativeSex = patientRelativeSex;
	}
	@JsonGetter("patientRelativeMobile")
	public String getPatientRelativeMobile() {
		return patientRelativeMobile;
	}
	@JsonSetter("patientRelativeMobile")
	public void setPatientRelativeMobile(String patientRelativeMobile) {
		this.patientRelativeMobile = patientRelativeMobile;
	}
	@JsonGetter("patientRelativeEmail")
	public String getPatientRelativeEmail() {
		return patientRelativeEmail;
	}
	@JsonSetter("patientRelativeEmail")
	public void setPatientRelativeEmail(String patientRelativeEmail) {
		this.patientRelativeEmail = patientRelativeEmail;
	}
	@JsonGetter("patientRelativeAge")
	public String getPatientRelativeAge() {
		return patientRelativeAge;
	}
	@JsonSetter("patientRelativeAge")
	public void setPatientRelativeAge(String relativeAge) {
		this.patientRelativeAge = relativeAge;
	}
	@JsonGetter("patientRelativeRelation")
	public String getPatientRelativeRelation() {
		return patientRelativeRelation;
	}
	@JsonSetter("patientRelativeRelation")
	public void setPatientRelativeRelation(String patientRelativeRelation) {
		this.patientRelativeRelation = patientRelativeRelation;
	}
	@JsonGetter("patientRelativeAddress")
	public String getPatientRelativeAddress() {
		return patientRelativeAddress;
	}
	@JsonSetter("patientRelativeAddress")
	public void setPatientRelativeAddress(String patientRelativeAddress) {
		this.patientRelativeAddress = patientRelativeAddress;
	}
	

}
