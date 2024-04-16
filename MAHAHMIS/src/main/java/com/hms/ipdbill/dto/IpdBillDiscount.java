package com.hms.ipdbill.dto;

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
@Table(name = "ehat_ipdbill_discount")
public class IpdBillDiscount {

	@Id
	@GeneratedValue
	@Column(name = "bill_discount_id")
	private Integer billDiscountId;
	
	@Column(name = "bill_id")
	private Integer billId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "department_id")
	private Integer departmentId;
	
	@Column(name = "unit_id")
	private int unitId;	
	
	@Column(name = "source_type_id")
	private Integer sourceTypeId=1;
	
	@Column(name = "sponsor_cat_id")
	private Integer sponsorCatId=0;
	
	@Column(name = "patient_cat_id")
	private Integer patientCatId=0;
		
	@Column(name = "total_amt")
	private double totalAmt=0;
		
	@Column(name = "total_discount")
	private double totalDisc =0;
	
	@Column(name = "total_discount_inper")
	private double totalDiscInPer =0;
	
	@Column(name = "disc_givenby")
	private Integer discGivenBy =0;
	
	@Column(name = "disc_narrarion")
	private String discNarrtn="-";
	
	@Column(name = "disc_remark")
	private String discRemark="-";
	
	@Column(name = "disc_Auth")
	private Integer discAuth=0;
	
	@Column(name = "pay_flag")
	private String payFlag="P";
		
	@Column(name = "disc_flag")
	private String discFlag="H";
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@Column(name = "approved_amt")
	private double approvedAmt =0;
	
	@Column(name = "approved_status")
	private String approvedStat="N";
	
	@Column(name = "approved_remark")
	private String approvedRemark="-";
	
	@Column(name = "approved_by",updatable=false)
	private Integer approvedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "approved_datetime",updatable=false)
	private Date approvedDateTime;

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
	
	@Column(name = "disc_from",columnDefinition="varchar(255) default '-'")
	private String discountFrom="-";
	
	@Transient
	@Column(name = "patient_id")
	private String pIds;
	
	@Transient
	private String userName;
	
	@Transient
	@Column(name = "center_patient_id")
	private String centerPatientId;
	
	@Transient
	private List<IpdBillDiscount> listIpdBillDiscount;

	public Integer getBillDiscountId() {
		return billDiscountId;
	}

	public void setBillDiscountId(Integer billDiscountId) {
		this.billDiscountId = billDiscountId;
	}

	public Integer getBillId() {
		return billId;
	}

	public void setBillId(Integer billId) {
		this.billId = billId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public Integer getSourceTypeId() {
		return sourceTypeId;
	}

	public void setSourceTypeId(Integer sourceTypeId) {
		this.sourceTypeId = sourceTypeId;
	}

	public Integer getSponsorCatId() {
		return sponsorCatId;
	}

	public void setSponsorCatId(Integer sponsorCatId) {
		this.sponsorCatId = sponsorCatId;
	}

	public Integer getPatientCatId() {
		return patientCatId;
	}

	public void setPatientCatId(Integer patientCatId) {
		this.patientCatId = patientCatId;
	}

	public double getTotalAmt() {
		return totalAmt;
	}

	public void setTotalAmt(double totalAmt) {
		this.totalAmt = totalAmt;
	}

	public double getTotalDisc() {
		return totalDisc;
	}

	public void setTotalDisc(double totalDisc) {
		this.totalDisc = totalDisc;
	}

	public double getTotalDiscInPer() {
		return totalDiscInPer;
	}

	public void setTotalDiscInPer(double totalDiscInPer) {
		this.totalDiscInPer = totalDiscInPer;
	}

	public Integer getDiscGivenBy() {
		return discGivenBy;
	}

	public void setDiscGivenBy(Integer discGivenBy) {
		this.discGivenBy = discGivenBy;
	}

	public String getDiscNarrtn() {
		return discNarrtn;
	}

	public void setDiscNarrtn(String discNarrtn) {
		this.discNarrtn = discNarrtn;
	}

	public String getDiscRemark() {
		return discRemark;
	}

	public void setDiscRemark(String discRemark) {
		this.discRemark = discRemark;
	}

	public Integer getDiscAuth() {
		return discAuth;
	}

	public void setDiscAuth(Integer discAuth) {
		this.discAuth = discAuth;
	}

	public String getPayFlag() {
		return payFlag;
	}

	public void setPayFlag(String payFlag) {
		this.payFlag = payFlag;
	}

	public String getDiscFlag() {
		return discFlag;
	}

	public void setDiscFlag(String discFlag) {
		this.discFlag = discFlag;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public double getApprovedAmt() {
		return approvedAmt;
	}

	public void setApprovedAmt(double approvedAmt) {
		this.approvedAmt = approvedAmt;
	}

	public String getApprovedStat() {
		return approvedStat;
	}

	public void setApprovedStat(String approvedStat) {
		this.approvedStat = approvedStat;
	}

	public String getApprovedRemark() {
		return approvedRemark;
	}

	public void setApprovedRemark(String approvedRemark) {
		this.approvedRemark = approvedRemark;
	}

	public Integer getApprovedBy() {
		return approvedBy;
	}

	public void setApprovedBy(Integer approvedBy) {
		this.approvedBy = approvedBy;
	}

	public Date getApprovedDateTime() {
		return approvedDateTime;
	}

	public void setApprovedDateTime(Date approvedDateTime) {
		this.approvedDateTime = approvedDateTime;
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

	public List<IpdBillDiscount> getListIpdBillDiscount() {
		return listIpdBillDiscount;
	}

	public void setListIpdBillDiscount(List<IpdBillDiscount> listIpdBillDiscount) {
		this.listIpdBillDiscount = listIpdBillDiscount;
	}

	public String getpIds() {
		return pIds;
	}

	public void setpIds(String pIds) {
		this.pIds = pIds;
	}

	public String getCenterPatientId() {
		return centerPatientId;
	}

	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getDiscountFrom() {
		return discountFrom;
	}

	public void setDiscountFrom(String discountFrom) {
		this.discountFrom = discountFrom;
	}
	
	
	
}
