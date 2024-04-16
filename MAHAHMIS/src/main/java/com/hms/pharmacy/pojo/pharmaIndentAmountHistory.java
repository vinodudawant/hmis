package com.hms.pharmacy.pojo;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="pharma_indent_amount_history")
public class pharmaIndentAmountHistory {

	@Id
	@GeneratedValue
	@Column(name="idpharma_indent_amount_history_id")
	private Integer idpharmaIndentAmountHistoryId;
	
	@Column(name="treatment_id")
	private Integer treatmentId;
	
	@Column(name="amount_receive")
	private Double amountReceive;
	
	@Column(name="discount")
	private Double discount;
	
	@Column(name="narration")
	private String narration;
	
	@Column(name="final_date")
	private String finalDate;
	
	@Column(name="amount_balance")
	private Double amountBalance;
	
	@Column(name="indent_time")
	private String patientTime;
	
	@Column(name="indent_sale_master_id")
	private Integer indentSaleBillMasterId=0	;
	
	@Column(name="hsp_return_flag")
	private String returnFlag="N";
	
	@Column(name="amount_receive_from_bill")
	private Double amountReceiveFromBill;
	
	@Transient
	private String paidFlag;
	

	public String getPaidFlag() {
		return paidFlag;
	}

	public void setPaidFlag(String paidFlag) {
		this.paidFlag = paidFlag;
	}

	@Transient
	private List<pharmaIndentAmountHistory> lstPharmaIndentAmountHistory;

	public Integer getIdpharmaIndentAmountHistoryId() {
		return idpharmaIndentAmountHistoryId;
	}

	public void setIdpharmaIndentAmountHistoryId(Integer idpharmaIndentAmountHistoryId) {
		this.idpharmaIndentAmountHistoryId = idpharmaIndentAmountHistoryId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public Double getAmountReceive() {
		return amountReceive;
	}

	public void setAmountReceive(Double amountReceive) {
		this.amountReceive = amountReceive;
	}

	public Double getDiscount() {
		return discount;
	}

	public void setDiscount(Double discount) {
		this.discount = discount;
	}

	public String getNarration() {
		return narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}

	public String getFinalDate() {
		return finalDate;
	}

	public void setFinalDate(String finalDate) {
		this.finalDate = finalDate;
	}

	public Double getAmountBalance() {
		return amountBalance;
	}

	public void setAmountBalance(Double amountBalance) {
		this.amountBalance = amountBalance;
	}

	public String getPatientTime() {
		return patientTime;
	}

	public void setPatientTime(String patientTime) {
		this.patientTime = patientTime;
	}

	public Integer getIndentSaleBillMasterId() {
		return indentSaleBillMasterId;
	}

	public void setIndentSaleBillMasterId(Integer indentSaleBillMasterId) {
		this.indentSaleBillMasterId = indentSaleBillMasterId;
	}

	public String getReturnFlag() {
		return returnFlag;
	}

	public void setReturnFlag(String returnFlag) {
		this.returnFlag = returnFlag;
	}

	public Double getAmountReceiveFromBill() {
		return amountReceiveFromBill;
	}

	public void setAmountReceiveFromBill(Double amountReceiveFromBill) {
		this.amountReceiveFromBill = amountReceiveFromBill;
	}

	public List<pharmaIndentAmountHistory> getLstPharmaIndentAmountHistory() {
		return lstPharmaIndentAmountHistory;
	}

	public void setLstPharmaIndentAmountHistory(List<pharmaIndentAmountHistory> lstPharmaIndentAmountHistory) {
		this.lstPharmaIndentAmountHistory = lstPharmaIndentAmountHistory;
	}

	@Override
	public String toString() {
		return "pharmaIndentAmountHistory [idpharmaIndentAmountHistoryId=" + idpharmaIndentAmountHistoryId
				+ ", treatmentId=" + treatmentId + ", amountReceive=" + amountReceive + ", discount=" + discount
				+ ", narration=" + narration + ", finalDate=" + finalDate + ", amountBalance=" + amountBalance
				+ ", patientTime=" + patientTime + ", indentSaleBillMasterId=" + indentSaleBillMasterId
				+ ", returnFlag=" + returnFlag + ", amountReceiveFromBill=" + amountReceiveFromBill
				+ ", lstPharmaIndentAmountHistory=" + lstPharmaIndentAmountHistory + "]";
	}

}