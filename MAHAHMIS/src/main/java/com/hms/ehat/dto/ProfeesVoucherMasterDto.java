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
@Table(name = "ehat_profees_voucher_master")
public class ProfeesVoucherMasterDto {

	@Id
	@GeneratedValue
	@Column(name = "voucher_master_id")
	private int voucherMasterId;
	
	@Column(name = "authorised_by_id")
	private int authorisedById;
	
	@Column(name = "doctor_id")
	private int doctorId;
	
	@Column(name = "doctor_name")
	private String doctorName;
	
	@Column(name = "pay_to")
	private String payTo;
	
	@Column(name = "unit_id")
	private int unitId;
	
	@Column(name = "dept_id")
	private int deptId;
	
	@Column(name = "narration")
	private String narration;
	
	@Column(name = "total_amount",columnDefinition="double default 0")
	private double totalAmount;
	
	@Column(name = "total_concession",columnDefinition="double default 0")
	private double totalConcession;
	
	@Column(name = "total_reduction",columnDefinition="double default 0")
	private double totalReduction;
	
	@Column(name = "total_pf_amount",columnDefinition="double default 0")
	private double totalPfAmount;
	
	@Column(name = "total_hosp_amount",columnDefinition="double default 0")
	private double totalHospAmount;
	
	@Column(name = "total_paid_pf",columnDefinition="double default 0")
	private double totalPaidPf;
	
	@Column(name = "cancel_by",columnDefinition="int default 0")
	private int cancelBy;
	
	@Column(name = "cancel_narration")
	private String cancelNarration;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "cancel_date_time")
	private Date cancelDateTime;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted;

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Transient
	private List<ProfessionalFeesDto> listProFees;
	
	@Transient
	private List<ProfeesVoucherMasterDto> listVoucherMaster;
	
	@Transient
	private List<ProfeesVoucherSlaveDto> listVoucherSlave;

	
	//Setter and getter started
	
	
	public int getVoucherMasterId() {
		return voucherMasterId;
	}

	public void setVoucherMasterId(int voucherMasterId) {
		this.voucherMasterId = voucherMasterId;
	}

	public int getAuthorisedById() {
		return authorisedById;
	}

	public void setAuthorisedById(int authorisedById) {
		this.authorisedById = authorisedById;
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

	public String getPayTo() {
		return payTo;
	}

	public void setPayTo(String payTo) {
		this.payTo = payTo;
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

	public String getNarration() {
		return narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
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

	public double getTotalReduction() {
		return totalReduction;
	}

	public void setTotalReduction(double totalReduction) {
		this.totalReduction = totalReduction;
	}

	public double getTotalPfAmount() {
		return totalPfAmount;
	}

	public void setTotalPfAmount(double totalPfAmount) {
		this.totalPfAmount = totalPfAmount;
	}

	public double getTotalHospAmount() {
		return totalHospAmount;
	}

	public void setTotalHospAmount(double totalHospAmount) {
		this.totalHospAmount = totalHospAmount;
	}

	public double getTotalPaidPf() {
		return totalPaidPf;
	}

	public void setTotalPaidPf(double totalPaidPf) {
		this.totalPaidPf = totalPaidPf;
	}

	public int getCancelBy() {
		return cancelBy;
	}

	public void setCancelBy(int cancelBy) {
		this.cancelBy = cancelBy;
	}

	public String getCancelNarration() {
		return cancelNarration;
	}

	public void setCancelNarration(String cancelNarration) {
		this.cancelNarration = cancelNarration;
	}

	public Date getCancelDateTime() {
		return cancelDateTime;
	}

	public void setCancelDateTime(Date cancelDateTime) {
		this.cancelDateTime = cancelDateTime;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public List<ProfessionalFeesDto> getListProFees() {
		return listProFees;
	}

	public void setListProFees(List<ProfessionalFeesDto> listProFees) {
		this.listProFees = listProFees;
	}

	public List<ProfeesVoucherMasterDto> getListVoucherMaster() {
		return listVoucherMaster;
	}

	public void setListVoucherMaster(List<ProfeesVoucherMasterDto> listVoucherMaster) {
		this.listVoucherMaster = listVoucherMaster;
	}

	public List<ProfeesVoucherSlaveDto> getListVoucherSlave() {
		return listVoucherSlave;
	}

	public void setListVoucherSlave(List<ProfeesVoucherSlaveDto> listVoucherSlave) {
		this.listVoucherSlave = listVoucherSlave;
	}	
	
	
}
