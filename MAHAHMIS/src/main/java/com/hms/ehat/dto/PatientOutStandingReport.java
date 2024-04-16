package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Immutable
@Table(name = "ehat_view_patient_outstanding_report")
public class PatientOutStandingReport {
	
	@Column(name = "deptId")
	private int deptId;
	
	@Column(name = "patientId")
	private int patientId;
	
	@Column(name = "billId")
	private int billId;
	
	@Column(name = "billNo")
	private int billNo;
	
	@Column(name = "patientName")
	private String patientName;
	
	@Column(name = "deptName")
	private String deptName;
	
	@Column(name = "totalRemain")
	private Double totalRemain=0.0;
	
	@Column(name = "totalBill")
	private Double totalBill=0.0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "createdDateTime",updatable=false)
	private Date createdDateTime;
	
	@Transient
	private List<PatientOutStandingReport> listProFees;
	
	@Column(name = "outStandingRemark")
	private String outStandingRemark;
	
	@Column(name = "outStandingReason")
	private String outStandingReason;
	
	
	

	public String getOutStandingRemark() {
		return outStandingRemark;
	}

	public void setOutStandingRemark(String outStandingRemark) {
		this.outStandingRemark = outStandingRemark;
	}

	public String getOutStandingReason() {
		return outStandingReason;
	}

	public void setOutStandingReason(String outStandingReason) {
		this.outStandingReason = outStandingReason;
	}

	public int getDeptId() {
		return deptId;
	}

	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public int getBillId() {
		return billId;
	}

	public void setBillId(int billId) {
		this.billId = billId;
	}

	public int getBillNo() {
		return billNo;
	}

	public void setBillNo(int billNo) {
		this.billNo = billNo;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public Double getTotalRemain() {
		return totalRemain;
	}

	public void setTotalRemain(Double totalRemain) {
		this.totalRemain = totalRemain;
	}

	public Double getTotalBill() {
		return totalBill;
	}

	public void setTotalBill(Double totalBill) {
		this.totalBill = totalBill;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public List<PatientOutStandingReport> getListProFees() {
		return listProFees;
	}

	public void setListProFees(List<PatientOutStandingReport> listProFees) {
		this.listProFees = listProFees;
	}

	@Override
	public String toString() {
		return "PatientOutStandingReport [deptId=" + deptId + ", patientId=" + patientId + ", billId=" + billId
				+ ", billNo=" + billNo + ", patientName=" + patientName + ", deptName=" + deptName + ", totalRemain="
				+ totalRemain + ", totalBill=" + totalBill + ", createdDateTime=" + createdDateTime + ", listProFees="
				+ listProFees + "]";
	}

	
	
	
	

}
