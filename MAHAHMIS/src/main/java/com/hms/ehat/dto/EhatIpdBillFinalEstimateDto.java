package com.hms.ehat.dto;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Immutable
@Table(name = "ehat_ipd_bill_final_estimate")
public class EhatIpdBillFinalEstimateDto {
	
	@Column(name = "bill_id")
	private Integer billId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "estimate_no")
	private BigInteger estimateNo;
	
	@Column(name = "opdipdno")
	private String opdipdno;
	
	@Column(name = "patient_name")
	private String patientName;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time")
	private Date createdDateTime;

	@Column(name = "discharge_date")
	private String dischargeDate;
	
	@Column(name = "discharge_time")
	private String dischargeTime;

	@Column(name = "discharge_type")
	private String dischargeType;
	
	@Column(name = "quotation_amount")
	private Double quotationAmount;
	
	@Column(name = "amount")
	private Double billAmount;
	
	@Column(name = "diff_in_per")
	private Double diffInPer;
	
	@Transient
	private List<EhatIpdBillFinalEstimateDto> listEhatIpdBillFinalEstimateDto;

	/*-------------------------Getter And Setters--------------------------------*/
	
	
	public Integer getBillId() {
		return billId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public String getOpdipdno() {
		return opdipdno;
	}

	public String getPatientName() {
		return patientName;
	}



	public String getDischargeDate() {
		return dischargeDate;
	}

	public String getDischargeTime() {
		return dischargeTime;
	}

	public String getDischargeType() {
		return dischargeType;
	}

	public Double getQuotationAmount() {
		return quotationAmount;
	}

	public Double getBillAmount() {
		return billAmount;
	}

	public Double getDiffInPer() {
		return diffInPer;
	}

	public List<EhatIpdBillFinalEstimateDto> getListEhatIpdBillFinalEstimateDto() {
		return listEhatIpdBillFinalEstimateDto;
	}

	public void setBillId(Integer billId) {
		this.billId = billId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}



	public void setDischargeDate(String dischargeDate) {
		this.dischargeDate = dischargeDate;
	}

	public void setDischargeTime(String dischargeTime) {
		this.dischargeTime = dischargeTime;
	}

	public void setDischargeType(String dischargeType) {
		this.dischargeType = dischargeType;
	}

	public void setQuotationAmount(Double quotationAmount) {
		this.quotationAmount = quotationAmount;
	}

	public void setBillAmount(Double billAmount) {
		this.billAmount = billAmount;
	}

	public void setDiffInPer(Double diffInPer) {
		this.diffInPer = diffInPer;
	}

	public void setListEhatIpdBillFinalEstimateDto(
			List<EhatIpdBillFinalEstimateDto> listEhatIpdBillFinalEstimateDto) {
		this.listEhatIpdBillFinalEstimateDto = listEhatIpdBillFinalEstimateDto;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public BigInteger getEstimateNo() {
		return estimateNo;
	}

	public void setEstimateNo(BigInteger estimateNo) {
		this.estimateNo = estimateNo;
	}
	

	
}