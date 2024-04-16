package com.hms.treatment.util;
import java.io.Serializable;
import java.util.List;


public class FollicularStudy implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private int studyid;
	/*private int mid;*/
	private int treatmentId;
	private int patientId;
	private String start_date;
	private String end_date;
	private String study_status;
	private String status;
	
	/*newly added fields*/
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
	
	private String saveFrom;
	
	private String coupleId;
	
	private String lmpdate;
	
	
	private List<FollicularStudy> StudyList;
	
	public int getStudyid() {
		return studyid;
	}
	public void setStudyid(int studyid) {
		this.studyid = studyid;
	}
	/*public int getMid() {
		return mid;
	}
	public void setMid(int mid) {
		this.mid = mid;
	}*/
	public String getStart_date() {
		return start_date;
	}
	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}
	public String getEnd_date() {
		return end_date;
	}
	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}
	public String getStudy_status() {
		return study_status;
	}
	public void setStudy_status(String study_status) {
		this.study_status = study_status;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
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
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public List<FollicularStudy> getStudyList() {
		return StudyList;
	}
	public void setStudyList(List<FollicularStudy> studyList) {
		StudyList = studyList;
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
	public String getSaveFrom() {
		return saveFrom;
	}
	public void setSaveFrom(String saveFrom) {
		this.saveFrom = saveFrom;
	}
	public String getCoupleId() {
		return coupleId;
	}
	public void setCoupleId(String coupleId) {
		this.coupleId = coupleId;
	}
	public String getLmpdate() {
		return lmpdate;
	}
	public void setLmpdate(String lmpdate) {
		this.lmpdate = lmpdate;
	}
	
	
}
