package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;


@Entity
@Table(name = "ehat_nursing_re_assessment_one_day")
public class NursingReAssessment1DayDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name ="re_assessment_id")
	private int reAssessmentId;
	
	@Column(name ="master_id")
	private int masterId;
	
	@Column(name = "reassessment_time")
	private String reAssessmentTime;
	
	@Column(name = "reassessment_temp")
	private String reAssessmentTemp;
	
	@Column(name = "reassessment_pulse")
	private String reAssessmentPulse; 

	@Column(name = "reassessment_rr")
	private String reAssessmentRR;

	@Column(name = "reassessment_bp")
	private String reAssessmentBP; 

	@Column(name = "reassessment_pain")
	private String reAssessmentPain;
	
	@Column(name = "status")
	private String status ="Y";
	
	@Transient
	private List<NursingReAssessment1DayDTO> reAssessmentList;

	public int getReAssessmentId() {
		return reAssessmentId;
	}

	public void setReAssessmentId(int reAssessmentId) {
		this.reAssessmentId = reAssessmentId;
	}


	public int getMasterId() {
		return masterId;
	}

	public void setMasterId(int masterId) {
		this.masterId = masterId;
	}

	public String getReAssessmentTime() {
		return reAssessmentTime;
	}

	public void setReAssessmentTime(String reAssessmentTime) {
		this.reAssessmentTime = reAssessmentTime;
	}

	public String getReAssessmentTemp() {
		return reAssessmentTemp;
	}

	public void setReAssessmentTemp(String reAssessmentTemp) {
		this.reAssessmentTemp = reAssessmentTemp;
	}

	public String getReAssessmentPulse() {
		return reAssessmentPulse;
	}

	public void setReAssessmentPulse(String reAssessmentPulse) {
		this.reAssessmentPulse = reAssessmentPulse;
	}

	public String getReAssessmentRR() {
		return reAssessmentRR;
	}

	public void setReAssessmentRR(String reAssessmentRR) {
		this.reAssessmentRR = reAssessmentRR;
	}

	public String getReAssessmentBP() {
		return reAssessmentBP;
	}

	public void setReAssessmentBP(String reAssessmentBP) {
		this.reAssessmentBP = reAssessmentBP;
	}

	public String getReAssessmentPain() {
		return reAssessmentPain;
	}

	public void setReAssessmentPain(String reAssessmentPain) {
		this.reAssessmentPain = reAssessmentPain;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<NursingReAssessment1DayDTO> getReAssessmentList() {
		return reAssessmentList;
	}

	public void setReAssessmentList(
			List<NursingReAssessment1DayDTO> reAssessmentList) {
		this.reAssessmentList = reAssessmentList;
	} 
	
	
	
}
