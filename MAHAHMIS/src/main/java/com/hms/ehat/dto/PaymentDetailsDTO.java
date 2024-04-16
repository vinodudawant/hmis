package com.hms.ehat.dto;
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

import org.hibernate.annotations.Immutable;

@Entity 
@Table(name = "ehat_radiation_payment_details")
public class PaymentDetailsDTO implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "payment_details_id")
	private int paymentDetailId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "payment_date")
	private String paymentDate;
	
	@Column(name = "reciept_no")
	private String recieptNo;
	
	@Column(name = "amt_paid")
	private String amtPaid;

	@Column(name = "amt_due")
	private String amtDue;
	
	@Column(name = "reciept_sign")
	private String recieptSign;
	
	@Column(name = "patient_sign")
	private String patientSign;	
	
	@Column(name = "added_by",updatable=false)
	private int addedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "added_date",updatable=false)
	private Date addedDate;
	
	@Column(name = "updated_by")
	private int updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date")
	private Date updatedDate;
	
	@Column(name = "status")
	private String status ="Y";

	@Transient
	private List<PaymentDetailsDTO> paymentList;

	public int getPaymentDetailId() {
		return paymentDetailId;
	}

	public void setPaymentDetailId(int paymentDetailId) {
		this.paymentDetailId = paymentDetailId;
	}

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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getRecieptNo() {
		return recieptNo;
	}

	public void setRecieptNo(String recieptNo) {
		this.recieptNo = recieptNo;
	}

	public String getAmtPaid() {
		return amtPaid;
	}

	public void setAmtPaid(String amtPaid) {
		this.amtPaid = amtPaid;
	}

	public String getAmtDue() {
		return amtDue;
	}

	public void setAmtDue(String amtDue) {
		this.amtDue = amtDue;
	}

	public String getRecieptSign() {
		return recieptSign;
	}

	public void setRecieptSign(String recieptSign) {
		this.recieptSign = recieptSign;
	}

	public String getPatientSign() {
		return patientSign;
	}

	public void setPatientSign(String patientSign) {
		this.patientSign = patientSign;
	}

	public int getAddedBy() {
		return addedBy;
	}

	public void setAddedBy(int addedBy) {
		this.addedBy = addedBy;
	}

	public Date getAddedDate() {
		return addedDate;
	}

	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<PaymentDetailsDTO> getPaymentList() {
		return paymentList;
	}

	public void setPaymentList(List<PaymentDetailsDTO> paymentList) {
		this.paymentList = paymentList;
	}
	
}
