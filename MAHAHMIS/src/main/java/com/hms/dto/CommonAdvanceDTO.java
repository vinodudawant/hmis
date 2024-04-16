package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class CommonAdvanceDTO {
	private int patient_ID;
	private int treatment_ID;
	private	int userid;
	private String commonAd_Date;
	private String commonAd_Time;
	private Double commonAd_Amt;
	private String commonAd_Narr;
	private	int commonAd_MasterId;
	private	int commonAd_SlaveId;
	private Double total_amount;
	private String trcount;
	private Double add_amount;
	private Double remaining_amount;
	private Double deducted_amount;
	private Double refunded_amount;
	private String transation_flag;
	private String last_update;
	private String Tflag;
	private String post_flag;
	private String receipt_type;
	private	int receiptno;
	private List<CommonAdvanceDTO> CommonAdvanceList;
	public String getPatName() {
		return patName;
	}
	public void setPatName(String patName) {
		this.patName = patName;
	}
	private String patName;
	
	@JsonGetter("add_amount")
	public Double getAdd_amount() {
		return add_amount;
	}
	@JsonSetter("add_amount")
	public void setAdd_amount(Double add_amount) {
		this.add_amount = add_amount;
	}
	@JsonGetter("remaining_amount")
	public Double getRemaining_amount() {
		return remaining_amount;
	}
	@JsonSetter("remaining_amount")
	public void setRemaining_amount(Double remaining_amount) {
		this.remaining_amount = remaining_amount;
	}
	@JsonGetter("deducted_amount")
	public Double getDeducted_amount() {
		return deducted_amount;
	}
	@JsonSetter("deducted_amount")
	public void setDeducted_amount(Double deducted_amount) {
		this.deducted_amount = deducted_amount;
	}
	@JsonGetter("transation_flag")
	public String getTransation_flag() {
		return transation_flag;
	}
	@JsonSetter("transation_flag")
	public void setTransation_flag(String transation_flag) {
		this.transation_flag = transation_flag;
	}
	@JsonGetter("last_update")
	public String getLast_update() {
		return last_update;
	}
	@JsonSetter("last_update")
	public void setLast_update(String last_update) {
		this.last_update = last_update;
	}
	
	@JsonGetter("patient_ID")
	public int getPatient_ID() {
		return patient_ID;
	}
	
	@JsonSetter("patient_ID")
	public void setPatient_ID(int patient_ID) {
		this.patient_ID = patient_ID;
	}
	
	@JsonGetter("treatment_ID")
	public int getTreatment_ID() {
		return treatment_ID;
	}
	
	@JsonSetter("treatment_ID")
	public void setTreatment_ID(int treatment_ID) {
		this.treatment_ID = treatment_ID;
	}
	
	@JsonGetter("commonAd_Date")
	public String getCommonAd_Date() {
		return commonAd_Date;
	}
	
	@JsonSetter("commonAd_Date")
	public void setCommonAd_Date(String commonAd_Date) {
		this.commonAd_Date = commonAd_Date;
	}
	
	@JsonGetter("commonAd_Time")
	public String getCommonAd_Time() {
		return commonAd_Time;
	}
	
	@JsonSetter("commonAd_Time")
	public void setCommonAd_Time(String commonAd_Time) {
		this.commonAd_Time = commonAd_Time;
	}
	
	@JsonGetter("commonAd_Amt")
	public Double getCommonAd_Amt() {
		return commonAd_Amt;
	}
	
	@JsonSetter("commonAd_Amt")
	public void setCommonAd_Amt(Double commonAd_Amt) {
		this.commonAd_Amt = commonAd_Amt;
	}
	
	@JsonGetter("commonAd_Narr")
	public String getCommonAd_Narr() {
		return commonAd_Narr;
	}
	
	@JsonSetter("commonAd_Narr")
	public void setCommonAd_Narr(String commonAd_Narr) {
		this.commonAd_Narr = commonAd_Narr;
	}
	
	@JsonGetter("CommonAdvanceList")
	public List<CommonAdvanceDTO> getCommonAdvanceList() {
		return CommonAdvanceList;
	}
	
	@JsonSetter("CommonAdvanceList")
	public void setCommonAdvanceList(List<CommonAdvanceDTO> commonAdvanceList) {
		CommonAdvanceList = commonAdvanceList;
	}
	
	@JsonGetter("userid")
	public int getUserid() {
		return userid;
	}
	
	@JsonSetter("userid")
	public void setUserid(int userid) {
		this.userid = userid;
	}

	@JsonGetter("cadmid")
	public int getCommonAd_MasterId() {
		return commonAd_MasterId;
	}

	@JsonSetter("cadmid")
	public void setCommonAd_MasterId(int commonAd_MasterId) {
		this.commonAd_MasterId = commonAd_MasterId;
	}

	@JsonGetter("cadsid")
	public int getCommonAd_SlaveId() {
		return commonAd_SlaveId;
	}

	@JsonSetter("cadsid")
	public void setCommonAd_SlaveId(int commonAd_SlaveId) {
		this.commonAd_SlaveId = commonAd_SlaveId;
	}
	@JsonGetter("totalCAamt")
	public Double getTotal_amount() {
		return total_amount;
	}
	@JsonSetter("totalCAamt")
	public void setTotal_amount(Double total_amount) {
		this.total_amount = total_amount;
	}
	@JsonGetter("trcount")
	public String getTrcount() {
		return trcount;
	}
	@JsonSetter("trcount")
	public void setTrcount(String trcount) {
		this.trcount = trcount;
	}
	@JsonGetter("Tflag")
	public String getTflag() {
		return Tflag;
	}
	@JsonSetter("Tflag")
	public void setTflag(String tflag) {
		Tflag = tflag;
	}
	@JsonGetter("post_flag")
	public String getPost_flag() {
		return post_flag;
	}
	@JsonSetter("post_flag")
	public void setPost_flag(String post_flag) {
		this.post_flag = post_flag;
	}
	@JsonGetter("receiptno")
	public int getReceiptno() {
		return receiptno;
	}
	@JsonSetter("receiptno")
	public void setReceiptno(int receiptno) {
		this.receiptno = receiptno;
	}
	@JsonGetter("receipt_type")
	public String getReceipt_type() {
		return receipt_type;
	}
	@JsonSetter("receipt_type")
	public void setReceipt_type(String receipt_type) {
		this.receipt_type = receipt_type;
	}
	@JsonGetter("refunded_amount")
	public Double getRefunded_amount() {
		return refunded_amount;
	}
	@JsonSetter("refunded_amount")
	public void setRefunded_amount(Double refunded_amount) {
		this.refunded_amount = refunded_amount;
	}
	
}
