package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class ClaimManage implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private int Patient_ID;
	private int Treatment_ID;
	
	private int Claim_amount;
	private int Approve_amt;
	
	private int Amount_req;
	private int final_approve_amt;
	
	private int total_amt;
	private String note;
	
	private List<ClaimManage> clpatientList = null;
	
	@JsonGetter("pl")
	public List<ClaimManage> getClpatientList() {
		return clpatientList;
	}
	@JsonSetter("pl")
	public void setClpatientList(List<ClaimManage> clpatientList) {
		this.clpatientList = clpatientList;
	}

	@JsonGetter("pid")
	public int getPatient_ID() {
		return Patient_ID;
	}
	
	@JsonSetter ("pid")
	public void setPatient_ID(int patient_ID) {
		Patient_ID = patient_ID;
	}
	
	@JsonGetter ("tid")
	public int getTreatment_ID() {
		return Treatment_ID;
	}
	
	@JsonSetter("tid")
	public void setTreatment_ID(int treatment_ID) {
		Treatment_ID = treatment_ID;
	}
	
	@JsonGetter("cliamAmt")
	public int getClaim_amount() {
		return Claim_amount;
	}
	
	@JsonSetter("cliamAmt")
	public void setClaim_amount(int claim_amount) {
		Claim_amount = claim_amount;
	}
	
	@JsonGetter("appAmt")
	public int getApprove_amt() {
		return Approve_amt;
	}
	
	@JsonSetter("appAmt")
	public void setApprove_amt(int approve_amt) {
		Approve_amt = approve_amt;
	}
	
	@JsonGetter("AmtReq")
	public int getAmount_req() {
		return Amount_req;
	}
	
	@JsonSetter("AmtReq")
	public void setAmount_req(int amount_req) {
		Amount_req = amount_req;
	}
	@JsonGetter("finAppAmt")
	public int getFinal_approve_amt() {
		return final_approve_amt;
	}
	
	@JsonSetter("finAppAmt")
	public void setFinal_approve_amt(int final_approve_amt) {
		this.final_approve_amt = final_approve_amt;
	}
	@JsonGetter("TotalAmt")
	public int getTotal_amt() {
		return total_amt;
	}
	@JsonSetter("TotalAmt")
	public void setTotal_amt(int total_amt) {
		this.total_amt = total_amt;
	}
	@JsonGetter("note")
	public String getNote() {
		return note;
	}
	@JsonSetter("note")
	public void setNote(String note) {
		this.note = note;
	}
	
	
	
}
