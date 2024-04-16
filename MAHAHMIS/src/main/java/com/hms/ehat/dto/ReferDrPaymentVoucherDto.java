package com.hms.ehat.dto;

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
@Table(name = "ehat_refer_doctors_payment_voucher")
public class ReferDrPaymentVoucherDto {


	@Id
	@GeneratedValue
	@Column(name = "voucherId")
	private int voucherId;
	
	@Column(name = "unitId")
	private int unitId;
	
	@Column(name = "deptId")
	private int deptId;
	
	@Column(name = "doctorId")
	private int doctorId;
	
	@Column(name = "doctorName")
	private String doctorName;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "fromDate")
	private Date fromDate;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "toDate")
	private Date toDate;
	
	@Column(name = "totalAmount")
	private double totalAmount=0.0;
	
	@Column(name = "totalConcession")
	private double totalConcession=0.0;
	
	@Column(name = "totalPatPaid")
	private double totalPatPaid=0.0;
	
	@Column(name = "totalHospAmount")
	private double totalHospAmount=0.0;
	
	@Column(name = "totalPfAmount")
	private double totalPfAmount=0.0;
	
	@Column(name = "totalPfPaid")
	private double totalPfPaid=0.0;
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@Column(name = "createdBy",updatable=false)
	private int createdBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "createdDateTime",updatable=false)
	private Date createdDateTime;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "createdDate",updatable=false)
	private Date createdDate;

	@Column(name = "updatedBy")
	private int updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updatedDateTime")
	private Date updatedDateTime;

	@Column(name = "deletedBy")
	private int deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deletedDateTime")
	private Date deletedDateTime;
	
	@Transient
	private List<ReferDrPaymentVoucherDto> listVoucher;
	
	@Transient
	private List<ProfeesDoctorsPaymentDto> listProFees;

	public int getVoucherId() {
		return voucherId;
	}

	public void setVoucherId(int voucherId) {
		this.voucherId = voucherId;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getDeptId() {
		return deptId;
	}

	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}

	public int getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public Date getFromDate() {
		return fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	public Date getToDate() {
		return toDate;
	}

	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public double getTotalConcession() {
		return totalConcession;
	}

	public void setTotalConcession(double totalConcession) {
		this.totalConcession = totalConcession;
	}

	public double getTotalPatPaid() {
		return totalPatPaid;
	}

	public void setTotalPatPaid(double totalPatPaid) {
		this.totalPatPaid = totalPatPaid;
	}

	public double getTotalHospAmount() {
		return totalHospAmount;
	}

	public void setTotalHospAmount(double totalHospAmount) {
		this.totalHospAmount = totalHospAmount;
	}

	public double getTotalPfAmount() {
		return totalPfAmount;
	}

	public void setTotalPfAmount(double totalPfAmount) {
		this.totalPfAmount = totalPfAmount;
	}

	public double getTotalPfPaid() {
		return totalPfPaid;
	}

	public void setTotalPfPaid(double totalPfPaid) {
		this.totalPfPaid = totalPfPaid;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public List<ReferDrPaymentVoucherDto> getListVoucher() {
		return listVoucher;
	}

	public void setListVoucher(List<ReferDrPaymentVoucherDto> listVoucher) {
		this.listVoucher = listVoucher;
	}

	public List<ProfeesDoctorsPaymentDto> getListProFees() {
		return listProFees;
	}

	public void setListProFees(List<ProfeesDoctorsPaymentDto> listProFees) {
		this.listProFees = listProFees;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	

}
