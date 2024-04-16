package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

public class IpdBillRefundReportDto {
	
	private Integer bill_refund_id,bill_id,patient_id,pay_mode,unit_id,created_by,against_id;

	private String patient_name,pay_name,bank_number,deleted,receipt_of,ref_remark,gender;

	private Double total_amt,total_paid,total_remain,actual_amt,total_discount;
	
	private Date created_date_time;
	
	List<IpdBillRefundReportDto> lstIpdRef;

	
	
	public Integer getAgainst_id() {
		return against_id;
	}

	public void setAgainst_id(Integer against_id) {
		this.against_id = against_id;
	}
	
	public Integer getCreated_by() {
		return created_by;
	}

	public void setCreated_by(Integer created_by) {
		this.created_by = created_by;
	}
	
	public List<IpdBillRefundReportDto> getLstIpdRef() {
		return lstIpdRef;
	}

	public void setLstIpdRef(List<IpdBillRefundReportDto> lstIpdRef) {
		this.lstIpdRef = lstIpdRef;
	}

	public Integer getUnit_id() {
		return unit_id;
	}

	public void setUnit_id(Integer unit_id) {
		this.unit_id = unit_id;
	}
	
	public Integer getBill_refund_id() {
		return bill_refund_id;
	}

	public void setBill_refund_id(Integer bill_refund_id) {
		this.bill_refund_id = bill_refund_id;
	}

	public Integer getBill_id() {
		return bill_id;
	}

	public void setBill_id(Integer bill_id) {
		this.bill_id = bill_id;
	}

	public Integer getPatient_id() {
		return patient_id;
	}

	public void setPatient_id(Integer patient_id) {
		this.patient_id = patient_id;
	}

	public Integer getPay_mode() {
		return pay_mode;
	}

	public void setPay_mode(Integer pay_mode) {
		this.pay_mode = pay_mode;
	}

	public String getPatient_name() {
		return patient_name;
	}

	public void setPatient_name(String patient_name) {
		this.patient_name = patient_name;
	}

	public String getPay_name() {
		return pay_name;
	}

	public void setPay_name(String pay_name) {
		this.pay_name = pay_name;
	}

	public String getBank_number() {
		return bank_number;
	}

	public void setBank_number(String bank_number) {
		this.bank_number = bank_number;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getReceipt_of() {
		return receipt_of;
	}

	public void setReceipt_of(String receipt_of) {
		this.receipt_of = receipt_of;
	}

	public String getRef_remark() {
		return ref_remark;
	}

	public void setRef_remark(String ref_remark) {
		this.ref_remark = ref_remark;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Double getTotal_amt() {
		return total_amt;
	}

	public void setTotal_amt(Double total_amt) {
		this.total_amt = total_amt;
	}

	public Double getTotal_paid() {
		return total_paid;
	}

	public void setTotal_paid(Double total_paid) {
		this.total_paid = total_paid;
	}

	public Double getTotal_remain() {
		return total_remain;
	}

	public void setTotal_remain(Double total_remain) {
		this.total_remain = total_remain;
	}

	public Double getActual_amt() {
		return actual_amt;
	}

	public void setActual_amt(Double actual_amt) {
		this.actual_amt = actual_amt;
	}

	public Double getTotal_discount() {
		return total_discount;
	}

	public void setTotal_discount(Double total_discount) {
		this.total_discount = total_discount;
	}

	public Date getCreated_date_time() {
		return created_date_time;
	}

	public void setCreated_date_time(Date created_date_time) {
		this.created_date_time = created_date_time;
	}
}
