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

@Entity 
@Table(name = "ehat_radiation_payment_package")
public class PaymentPackageDTO implements Serializable {

	private static final long serialVersionUID = 2117802665373012719L;

	@Id
	@GeneratedValue
	@Column(name = "payment_package_id")
	private int paymentPackageId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "categories")
	private String categories;
	
	@Column(name = "treatment_mode")
	private String treatmentMode;
	
	@Column(name = "packageAmt")
	private long packageAmt;
	
	@Transient
	private String packageAmtInWords;
	
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
	private List<PaymentPackageDTO> packageList;

	public int getPaymentPackageId() {
		return paymentPackageId;
	}

	public void setPaymentPackageId(int paymentPackageId) {
		this.paymentPackageId = paymentPackageId;
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

	public String getCategories() {
		return categories;
	}

	public void setCategories(String categories) {
		this.categories = categories;
	}

	public String getTreatmentMode() {
		return treatmentMode;
	}

	public void setTreatmentMode(String treatmentMode) {
		this.treatmentMode = treatmentMode;
	}

	public long getPackageAmt() {
		return packageAmt;
	}

	public void setPackageAmt(long packageAmt) {
		this.packageAmt = packageAmt;
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

	public List<PaymentPackageDTO> getPackageList() {
		return packageList;
	}

	public void setPackageList(List<PaymentPackageDTO> packageList) {
		this.packageList = packageList;
	}

	public String getPackageAmtInWords() {
		return packageAmtInWords;
	}

	public void setPackageAmtInWords(String packageAmtInWords) {
		this.packageAmtInWords = packageAmtInWords;
	}
	
	
}
