package com.hms.pharmacy.pojo;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="pharma_patient_amount_history")
public class PharmaPatientAmountHistoryDto {

	@Id
	@GeneratedValue
	@Column(name="idpharma_patient_amount_history_id")
	private Integer idpharmaPatientAmountHistoryId;
	
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
	
	@Column(name="patient_time")
	private String patientTime;
	
	@Column(name="patient_sale_bill_master_id")
	private Integer patientSaleBillMasterId=0	;
	
	@Column(name="return_flag")
	private String returnFlag="N";
	
	@Transient
	private List<PharmaPatientAmountHistoryDto> listPharmaPatientAmountHistoryDto;

	public Integer getIdpharmaPatientAmountHistoryId() {
		return idpharmaPatientAmountHistoryId;
	}

	public void setIdpharmaPatientAmountHistoryId(Integer idpharmaPatientAmountHistoryId) {
		this.idpharmaPatientAmountHistoryId = idpharmaPatientAmountHistoryId;
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

	public Integer getPatientSaleBillMasterId() {
		return patientSaleBillMasterId;
	}

	public void setPatientSaleBillMasterId(Integer patientSaleBillMasterId) {
		this.patientSaleBillMasterId = patientSaleBillMasterId;
	}

	public String getReturnFlag() {
		return returnFlag;
	}

	public void setReturnFlag(String returnFlag) {
		this.returnFlag = returnFlag;
	}

	public List<PharmaPatientAmountHistoryDto> getListPharmaPatientAmountHistoryDto() {
		return listPharmaPatientAmountHistoryDto;
	}

	public void setListPharmaPatientAmountHistoryDto(
			List<PharmaPatientAmountHistoryDto> listPharmaPatientAmountHistoryDto) {
		this.listPharmaPatientAmountHistoryDto = listPharmaPatientAmountHistoryDto;
	}
	
	
}
