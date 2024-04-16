package com.hms.treatment.util;

import java.util.List;

public class FollicularSutdyRecord {
	
	private static final long serialVersionUID = 1L;
	
	private int reportId;
	private int treatmentId;
	private int patientId;
	private int studyid;
	private String initiate_date;
	private String study_date;
	private String days;
	private String rtov;
	private String ltov;
	private String endo;
	private String lmpdate;
	private String studyComment;
	
	private String pod;
	private String drug;
	private String dose;
	
	/*newly added fields for slave details*/
	private String studyIdMaster;
	private String age;
	private String weight;
	private String height;
	
	private String bmi;
	private String afc;
	private String rx;
	private String hsg;
	private String hsa;
	
	private String amhDate;
	private String lhDate;
	private String fshDate;
	private String tshDate;
	private String prlDate;
	
	private String protocoloF;
	
	private String couple_id;
	
	private String inserFlag;
	
	public String getStudyComment() {
		return studyComment;
	}

	public void setStudyComment(String studyComment) {
		this.studyComment = studyComment;
	}

	private List<FollicularSutdyRecord>FollicularReportList;

	
	public String getLmpdate() {
		return lmpdate;
	}

	public void setLmpdate(String lmpdate) {
		this.lmpdate = lmpdate;
	}

	public String getInitiate_date() {
		return initiate_date;
	}

	public void setInitiate_date(String initiate_date) {
		this.initiate_date = initiate_date;
	}

	public String getStudy_date() {
		return study_date;
	}

	public void setStudy_date(String study_date) {
		this.study_date = study_date;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public int getReportId() {
		return reportId;
	}

	public void setReportId(int reportId) {
		this.reportId = reportId;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getStudyid() {
		return studyid;
	}

	public void setStudyid(int studyid) {
		this.studyid = studyid;
	}

	public String getDays() {
		return days;
	}

	public void setDays(String days) {
		this.days = days;
	}

	public String getRtov() {
		return rtov;
	}

	public void setRtov(String rtov) {
		this.rtov = rtov;
	}

	public String getLtov() {
		return ltov;
	}

	public void setLtov(String ltov) {
		this.ltov = ltov;
	}

	public String getEndo() {
		return endo;
	}

	public void setEndo(String endo) {
		this.endo = endo;
	}

	public List<FollicularSutdyRecord> getFollicularReportList() {
		return FollicularReportList;
	}

	public void setFollicularReportList(
			List<FollicularSutdyRecord> follicularReportList) {
		FollicularReportList = follicularReportList;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getPod() {
		return pod;
	}

	public void setPod(String pod) {
		this.pod = pod;
	}

	public String getDrug() {
		return drug;
	}

	public void setDrug(String drug) {
		this.drug = drug;
	}

	public String getDose() {
		return dose;
	}

	public void setDose(String dose) {
		this.dose = dose;
	}

	public String getStudyIdMaster() {
		return studyIdMaster;
	}

	public void setStudyIdMaster(String studyIdMaster) {
		this.studyIdMaster = studyIdMaster;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public String getBmi() {
		return bmi;
	}

	public void setBmi(String bmi) {
		this.bmi = bmi;
	}

	public String getAfc() {
		return afc;
	}

	public void setAfc(String afc) {
		this.afc = afc;
	}

	public String getRx() {
		return rx;
	}

	public void setRx(String rx) {
		this.rx = rx;
	}

	public String getHsg() {
		return hsg;
	}

	public void setHsg(String hsg) {
		this.hsg = hsg;
	}

	public String getHsa() {
		return hsa;
	}

	public void setHsa(String hsa) {
		this.hsa = hsa;
	}

	public String getAmhDate() {
		return amhDate;
	}

	public void setAmhDate(String amhDate) {
		this.amhDate = amhDate;
	}

	public String getLhDate() {
		return lhDate;
	}

	public void setLhDate(String lhDate) {
		this.lhDate = lhDate;
	}

	public String getFshDate() {
		return fshDate;
	}

	public void setFshDate(String fshDate) {
		this.fshDate = fshDate;
	}

	public String getTshDate() {
		return tshDate;
	}

	public void setTshDate(String tshDate) {
		this.tshDate = tshDate;
	}

	public String getPrlDate() {
		return prlDate;
	}

	public void setPrlDate(String prlDate) {
		this.prlDate = prlDate;
	}

	public String getProtocoloF() {
		return protocoloF;
	}

	public void setProtocoloF(String protocoloF) {
		this.protocoloF = protocoloF;
	}

	public String getCouple_id() {
		return couple_id;
	}

	public void setCouple_id(String couple_id) {
		this.couple_id = couple_id;
	}

	public String getInserFlag() {
		return inserFlag;
	}

	public void setInserFlag(String inserFlag) {
		this.inserFlag = inserFlag;
	}
	
	
	

}
