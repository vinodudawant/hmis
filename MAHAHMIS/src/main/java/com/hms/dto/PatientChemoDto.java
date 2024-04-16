package com.hms.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;


@Entity
@Table(name = "ehat_patient_chemo_details")
public class PatientChemoDto implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "patchemo_id")
	private Integer pChemoId;
	
	@Column(name = "chemo_name")
	private String chemoName;
	
	@Column(name = "chemo_indication")
	private String chemoIndication;
	
	@Column(name = "weight")
	private String patWeight;
	
	@Column(name = "height")
	private String patHeight;
	
	@Column(name = "bsa")
	private String patBsa;
	
	@Column(name = "blood_orders")
	private String patBlodOrd;
	
	@Column(name = "allergies")
	private String patAllergies;
	
	@Column(name = "history")
	private String patHistory;
	
	@Column(name = "frequency")
	private String patFreq;
	
	@Column(name = "no_of_cycles")
	private String noOfCycle;
	
	@Column(name = "dose")
	private String patDose;
	
	@Column(name = "investigation")
	private String patInvest;
	
	@Column(name = "chemo_orders")
	private String chemoOrders;
	
	@Column(name = "post_medications")
	private String postMed;
	
	@Column(name = "post_chemo_advise")
	private String chemoAdvice;
	
	@Column(name = "flag")
	private String flg="ACTIVE";
	
	@Column(name = "next_Blood_Date")
	private String nextBldDt;
	
	@Column(name = "next_Chemo_Date")
	private String nxtChemoDt;
	
	@Column(name = "next_Visit_Date")
	private String nxtVisDt;
	
	@Column(name = "chemoDate")
	private String chemoDt;
		
	@Column(name = "patient_id")
	private Integer patId;
	
	@Column(name = "treatment_id")
	private Integer treatId;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "deleted")
	private String deleted="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	@Column(name = "status")
	private String Status;
	
	@Transient
	private List<PatientChemoDto> lstPatChemodetails;
	
	public Integer getpChemoId() {
		return pChemoId;
	}

	public void setpChemoId(Integer pChemoId) {
		this.pChemoId = pChemoId;
	}

	public String getChemoName() {
		return chemoName;
	}

	public void setChemoName(String chemoName) {
		this.chemoName = chemoName;
	}

	public String getChemoIndication() {
		return chemoIndication;
	}

	public void setChemoIndication(String chemoIndication) {
		this.chemoIndication = chemoIndication;
	}

	public String getPatWeight() {
		return patWeight;
	}

	public void setPatWeight(String patWeight) {
		this.patWeight = patWeight;
	}

	public String getPatHeight() {
		return patHeight;
	}

	public void setPatHeight(String patHeight) {
		this.patHeight = patHeight;
	}

	public String getPatBsa() {
		return patBsa;
	}

	public void setPatBsa(String patBsa) {
		this.patBsa = patBsa;
	}

	public String getPatBlodOrd() {
		return patBlodOrd;
	}

	public void setPatBlodOrd(String patBlodOrd) {
		this.patBlodOrd = patBlodOrd;
	}

	public String getPatAllergies() {
		return patAllergies;
	}

	public void setPatAllergies(String patAllergies) {
		this.patAllergies = patAllergies;
	}

	public String getPatHistory() {
		return patHistory;
	}

	public void setPatHistory(String patHistory) {
		this.patHistory = patHistory;
	}

	public String getPatFreq() {
		return patFreq;
	}

	public void setPatFreq(String patFreq) {
		this.patFreq = patFreq;
	}

	public String getNoOfCycle() {
		return noOfCycle;
	}

	public void setNoOfCycle(String noOfCycle) {
		this.noOfCycle = noOfCycle;
	}

	public String getPatDose() {
		return patDose;
	}

	public void setPatDose(String patDose) {
		this.patDose = patDose;
	}

	public String getPatInvest() {
		return patInvest;
	}

	public void setPatInvest(String patInvest) {
		this.patInvest = patInvest;
	}

	public String getChemoOrders() {
		return chemoOrders;
	}

	public void setChemoOrders(String chemoOrders) {
		this.chemoOrders = chemoOrders;
	}

	public String getPostMed() {
		return postMed;
	}

	public void setPostMed(String postMed) {
		this.postMed = postMed;
	}

	public String getChemoAdvice() {
		return chemoAdvice;
	}

	public void setChemoAdvice(String chemoAdvice) {
		this.chemoAdvice = chemoAdvice;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public String getFlg() {
		return flg;
	}

	public void setFlg(String flg) {
		this.flg = flg;
	}

	public String getStatus() {
		return Status;
	}

	public void setStatus(String status) {
		Status = status;
	}
	
	public Integer getPatId() {
		return patId;
	}

	public void setPatId(Integer patId) {
		this.patId = patId;
	}

	public Integer getTreatId() {
		return treatId;
	}

	public void setTreatId(Integer treatId) {
		this.treatId = treatId;
	}
	
	public List<PatientChemoDto> getLstPatChemodetails() {
		return lstPatChemodetails;
	}

	public void setLstPatChemodetails(List<PatientChemoDto> lstPatChemodetails) {
		this.lstPatChemodetails = lstPatChemodetails;
	}

	public String getNextBldDt() {
		return nextBldDt;
	}

	public void setNextBldDt(String nextBldDt) {
		this.nextBldDt = nextBldDt;
	}

	public String getNxtChemoDt() {
		return nxtChemoDt;
	}

	public void setNxtChemoDt(String nxtChemoDt) {
		this.nxtChemoDt = nxtChemoDt;
	}

	public String getNxtVisDt() {
		return nxtVisDt;
	}

	public void setNxtVisDt(String nxtVisDt) {
		this.nxtVisDt = nxtVisDt;
	}

	public String getChemoDt() {
		return chemoDt;
	}

	public void setChemoDt(String chemoDt) {
		this.chemoDt = chemoDt;
	}
	
	

}
