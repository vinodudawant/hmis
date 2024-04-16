package com.hms.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "paediatric_dept")
public class PaediatricDept {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idpaediatric_dept")
	private int idpaediatric_dept;
	
	@Column(name = "treatment_id")
	private int treatment_id;
	
	@Column(name = "past_history")
	private String pastHistory;
	
	@Column(name = "general_examination")
	private String generalExamination;
	
	@Column(name = "cvs")
	private String cvs;
	
	@Column(name = "rs")
	private String rs;
	
	@Column(name = "pa")
	private String pa;
	
	@Column(name = "cns")
	private String cns;
	
	@Column(name = "ps")
	private String ps;
	
	@Column(name = "platelet_count")
	private String plateletCount;
	
	@Column(name = "urine_r")
	private String urineR;
	
	@Column(name = "stool_r")
	private String stoolR;
	
	@Column(name = "bsl")
	private String bsl;
	
	@Column(name = "csf")
	private String csf;
	
	@Column(name = "ott")
	private String ott;
	
	@Column(name = "srcalcium")
	private String srcalcium;
	
	@Column(name = "coombs_test")
	private String coombTest;
	
	@Column(name = "srna")
	private String pdsrna;
	
	@Column(name = "srk")
	private String pdsrk;
	
	@Column(name = "srcl")
	private String pdsrcl;
	
	@Column(name = "sr_billirubin")
	private String srBillirubin;
	
	@Column(name = "unconj1")
	private String unconj1;
	
	@Column(name = "unconj2")
	private String unconj2;
	
	@Column(name = "x_ray")
	private String x_ray;
	
	@Column(name = "usg")
	private String usg;
	
	@Column(name = "ct_mri")
	private String ct_mri;
	
	@Column(name = "tt")
	private String tt;
	
	@Column(name = "other")
	private String pdFOther;
	
	@Column(name = "course_of_rec")
	private String courseOfRec;
	
	@Column(name = "management")
	private String pdManagement;
	
	@Column(name = "immunisation_status")
	private String immunisationStatus;
	
	
	@Column(name = "other_vaccines")
	private String otherVaccines;
	
	@Column(name = "any_other")
	private String anyOtherPoints;
	
	@Column(name = "follow_up_advice")
	private String followUpAdvise;
	
	@Column(name = "status")
	private String status;

	public int getIdpaediatric_dept() {
		return idpaediatric_dept;
	}

	public void setIdpaediatric_dept(int idpaediatric_dept) {
		this.idpaediatric_dept = idpaediatric_dept;
	}

	public int getTreatment_id() {
		return treatment_id;
	}

	public void setTreatment_id(int treatment_id) {
		this.treatment_id = treatment_id;
	}

	public String getPastHistory() {
		return pastHistory;
	}

	public void setPastHistory(String pastHistory) {
		this.pastHistory = pastHistory;
	}

	public String getGeneralExamination() {
		return generalExamination;
	}

	public void setGeneralExamination(String generalExamination) {
		this.generalExamination = generalExamination;
	}

	public String getCvs() {
		return cvs;
	}

	public void setCvs(String cvs) {
		this.cvs = cvs;
	}

	public String getRs() {
		return rs;
	}

	public void setRs(String rs) {
		this.rs = rs;
	}

	public String getPa() {
		return pa;
	}

	public void setPa(String pa) {
		this.pa = pa;
	}

	public String getCns() {
		return cns;
	}

	public void setCns(String cns) {
		this.cns = cns;
	}

	public String getPs() {
		return ps;
	}

	public void setPs(String ps) {
		this.ps = ps;
	}

	public String getPlateletCount() {
		return plateletCount;
	}

	public void setPlateletCount(String plateletCount) {
		this.plateletCount = plateletCount;
	}

	public String getUrineR() {
		return urineR;
	}

	public void setUrineR(String urineR) {
		this.urineR = urineR;
	}

	public String getStoolR() {
		return stoolR;
	}

	public void setStoolR(String stoolR) {
		this.stoolR = stoolR;
	}

	public String getBsl() {
		return bsl;
	}

	public void setBsl(String bsl) {
		this.bsl = bsl;
	}

	public String getCsf() {
		return csf;
	}

	public void setCsf(String csf) {
		this.csf = csf;
	}

	public String getOtt() {
		return ott;
	}

	public void setOtt(String ott) {
		this.ott = ott;
	}

	public String getSrcalcium() {
		return srcalcium;
	}

	public void setSrcalcium(String srcalcium) {
		this.srcalcium = srcalcium;
	}

	public String getCoombTest() {
		return coombTest;
	}

	public void setCoombTest(String coombTest) {
		this.coombTest = coombTest;
	}

	public String getPdsrna() {
		return pdsrna;
	}

	public void setPdsrna(String pdsrna) {
		this.pdsrna = pdsrna;
	}

	public String getPdsrk() {
		return pdsrk;
	}

	public void setPdsrk(String pdsrk) {
		this.pdsrk = pdsrk;
	}

	public String getPdsrcl() {
		return pdsrcl;
	}

	public void setPdsrcl(String pdsrcl) {
		this.pdsrcl = pdsrcl;
	}

	public String getSrBillirubin() {
		return srBillirubin;
	}

	public void setSrBillirubin(String srBillirubin) {
		this.srBillirubin = srBillirubin;
	}

	public String getUnconj1() {
		return unconj1;
	}

	public void setUnconj1(String unconj1) {
		this.unconj1 = unconj1;
	}

	public String getUnconj2() {
		return unconj2;
	}

	public void setUnconj2(String unconj2) {
		this.unconj2 = unconj2;
	}

	public String getX_ray() {
		return x_ray;
	}

	public void setX_ray(String x_ray) {
		this.x_ray = x_ray;
	}

	public String getUsg() {
		return usg;
	}

	public void setUsg(String usg) {
		this.usg = usg;
	}

	public String getCt_mri() {
		return ct_mri;
	}

	public void setCt_mri(String ct_mri) {
		this.ct_mri = ct_mri;
	}

	public String getTt() {
		return tt;
	}

	public void setTt(String tt) {
		this.tt = tt;
	}

	public String getPdFOther() {
		return pdFOther;
	}

	public void setPdFOther(String pdFOther) {
		this.pdFOther = pdFOther;
	}

	public String getCourseOfRec() {
		return courseOfRec;
	}

	public void setCourseOfRec(String courseOfRec) {
		this.courseOfRec = courseOfRec;
	}

	public String getPdManagement() {
		return pdManagement;
	}

	public void setPdManagement(String pdManagement) {
		this.pdManagement = pdManagement;
	}

	public String getImmunisationStatus() {
		return immunisationStatus;
	}

	public void setImmunisationStatus(String immunisationStatus) {
		this.immunisationStatus = immunisationStatus;
	}

	public String getOtherVaccines() {
		return otherVaccines;
	}

	public void setOtherVaccines(String otherVaccines) {
		this.otherVaccines = otherVaccines;
	}

	public String getAnyOtherPoints() {
		return anyOtherPoints;
	}

	public void setAnyOtherPoints(String anyOtherPoints) {
		this.anyOtherPoints = anyOtherPoints;
	}

	public String getFollowUpAdvise() {
		return followUpAdvise;
	}

	public void setFollowUpAdvise(String followUpAdvise) {
		this.followUpAdvise = followUpAdvise;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
	
}
