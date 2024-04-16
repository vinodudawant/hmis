package com.hms.ehat.dto;

import java.sql.Time;
import java.util.List;

public class DialysisDto {

	private int treatmentId;
	private int patientId;
	private String patientName;
	private String tflag;
	private java.util.Date Date;
	
	

	public java.util.Date getDate() {
		return Date;
	}

	public void setDate(java.util.Date date) {
		Date = date;
	}

	private String prebp;
	private String preweight;
	private String postbp;
	private String postwieight;	
	private String dialysisstartTime;
	private String dialysisendTime;
	private Time duration;	
	private String vp;
	private String ap;
	private String bf;	
	private String herapine_dose;
	private String remark;

	private List<DialysisDto> dialysislist;

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

	public String getPrebp() {
		return prebp;
	}

	public void setPrebp(String prebp) {
		this.prebp = prebp;
	}

	public String getPreweight() {
		return preweight;
	}

	public void setPreweight(String preweight) {
		this.preweight = preweight;
	}

	public String getPostbp() {
		return postbp;
	}

	public void setPostbp(String postbp) {
		this.postbp = postbp;
	}

	public String getPostwieight() {
		return postwieight;
	}

	public void setPostwieight(String postwieight) {
		this.postwieight = postwieight;
	}

	public String getDialysisstartTime() {
		return dialysisstartTime;
	}

	public void setDialysisstartTime(String dialysisstartTime) {
		this.dialysisstartTime = dialysisstartTime;
	}

	public String getDialysisendTime() {
		return dialysisendTime;
	}

	public void setDialysisendTime(String dialysisendTime) {
		this.dialysisendTime = dialysisendTime;
	}


	public Time getDuration() {
		return duration;
	}

	public void setDuration(Time duration) {
		this.duration = duration;
	}

	public String getVp() {
		return vp;
	}

	public void setVp(String vp) {
		this.vp = vp;
	}

	public String getAp() {
		return ap;
	}

	public void setAp(String ap) {
		this.ap = ap;
	}

	public String getBf() {
		return bf;
	}

	public void setBf(String bf) {
		this.bf = bf;
	}

	public String getHerapine_dose() {
		return herapine_dose;
	}

	public void setHerapine_dose(String herapine_dose) {
		this.herapine_dose = herapine_dose;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public List<DialysisDto> getDialysislist() {
		return dialysislist;
	}

	public void setDialysislist(List<DialysisDto> dialysislist) {
		this.dialysislist = dialysislist;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getTflag() {
		return tflag;
	}

	public void setTflag(String tflag) {
		this.tflag = tflag;
	}
	
	

}
