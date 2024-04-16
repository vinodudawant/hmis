package com.hms.dto;

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
@Table(name = "ehat_profees_hisab_refer_doctor")
public class HisabProFeesReferDoctorDTO {
	@Id
	@GeneratedValue
	@Column(name = "profees_hisab_id")
	private int profeesHisabId;
	
	@Column(name = "voucher_id")
	private int voucherId=0;
	
	@Column(name = "unit_id")
	private int unitId=0;
	
	@Column(name = "dept_id")
	private int deptId=0;
	
	@Column(name = "doctor_id")
	private int doctorId=0;
	
	@Column(name = "doctor_name")
	private String doctorName="-";
	
	@Temporal(TemporalType.DATE)
	@Column(name = "from_date")
	private Date fromDate;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "to_date")
	private Date toDate;
	
	@Column(name = "total_amount")
	private double totalAmount=0.0;
	
	@Column(name = "total_concession")
	private double totalConcession=0.0;
	
	@Column(name = "total_paid")
	private double totalPatPaid=0.0;
	
	@Column(name = "total_hosp_amt")
	private double totalHospAmount=0.0;
	
	@Column(name = "total_pf_amt")
	private double totalPfAmount=0.0;
	
	@Column(name = "total_pf_paid")
	private double totalPfPaid=0.0;
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@Transient
	private double fixedIncome=0.0;
	
	@Column(name = "created_by",updatable=false)
	private int createdBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "created_date",updatable=false)
	private Date createdDate;

	@Column(name = "updated_by")
	private int updatedBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private int deletedBy=0;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Transient
	private List<HisabProFeesReferDoctorDTO> listVoucher;

	public int getProfeesHisabId() {
		return profeesHisabId;
	}

	public void setProfeesHisabId(int profeesHisabId) {
		this.profeesHisabId = profeesHisabId;
	}

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

	public double getFixedIncome() {
		return fixedIncome;
	}

	public void setFixedIncome(double fixedIncome) {
		this.fixedIncome = fixedIncome;
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

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
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

	public List<HisabProFeesReferDoctorDTO> getListVoucher() {
		return listVoucher;
	}

	public void setListVoucher(List<HisabProFeesReferDoctorDTO> listVoucher) {
		this.listVoucher = listVoucher;
	}

	@Override
	public String toString() {
		return "HisabProFeesReferDoctorDTO [profeesHisabId=" + profeesHisabId + ", voucherId=" + voucherId + ", unitId="
				+ unitId + ", deptId=" + deptId + ", doctorId=" + doctorId + ", doctorName=" + doctorName
				+ ", fromDate=" + fromDate + ", toDate=" + toDate + ", totalAmount=" + totalAmount
				+ ", totalConcession=" + totalConcession + ", totalPatPaid=" + totalPatPaid + ", totalHospAmount="
				+ totalHospAmount + ", totalPfAmount=" + totalPfAmount + ", totalPfPaid=" + totalPfPaid + ", deleted="
				+ deleted + ", fixedIncome=" + fixedIncome + ", createdBy=" + createdBy + ", createdDateTime="
				+ createdDateTime + ", createdDate=" + createdDate + ", updatedBy=" + updatedBy + ", updatedDateTime="
				+ updatedDateTime + ", deletedBy=" + deletedBy + ", deletedDateTime=" + deletedDateTime
				+ ", listVoucher=" + listVoucher + "]";
	}	

}
