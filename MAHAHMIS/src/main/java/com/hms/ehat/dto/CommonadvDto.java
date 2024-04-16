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

import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "ehat_common_advance_master")
public class CommonadvDto {
	@Id
	@GeneratedValue
	@Column(name = "common_adv_id")
	private int commonadv_id;

	@Column(name = "patient_id")
	private int patient_ID;
	
	@Column(name = "treatment_id")
	private int treatmentId=0;

	@Column(name = "common_adv_amnt")
	private double commonadv_amnt;
	
	public double getTotal_amnt() {
		return total_amnt;
	}

	public void setTotal_amnt(double total_amnt) {
		this.total_amnt = total_amnt;
	}

	@Column(name = "total_common_amnt")
	private double total_amnt=0.0;
	
	@Column(name = "deduct_common_amnt")
	private double deduct_amnt;
	
	@Column(name = "remaining_common_amnt")
	private double remaining_amnt=0.0;
	
	@Column(name = "narration")
	private String narration;
	
	
	@Column(name = "created_by",  updatable=false)
	private int createdBy;

	@Column(name = "updated_by")
	private int updatedBy;

	@Column(name = "deleted_by" )
	private int deletedBy;

	@Column(name = "deleted")
	private String deleted;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	
	@Column(name = "unit_id")
	private int unitId;
	
	@Column(name = "transation_flag")
    private String  transationflag;
	
	@Column(name = "post_flag")
	private String postflag;
	
	@Column(name = "paidflag")
	private String paidflag="N";
	@Column(name = "bank")
	private String bank="-";
	@Column(name = "number")
	private String number="-";
	@Column(name = "paymode")
	private int paymode=0;
	
	
	@Column(name = "department_id")
	private int departmentId;
	
	
	@Column(name = "refund_amnt")
	private double refund_amnt=0.0;
	
	@Transient
	private int refundid;
	@Transient
	private String refundStatus;
	@Transient
	private double actualrefund_amnt=0.0;
		
	@Transient
	private double cashAmt;
	
	@Transient
	private double cardAmt;
	
	@Transient
	private double chequeAmt;
	
	@Transient
	private double totAmt;	
	
	@Transient
	private String opdIpdNo;
	
	@Transient
	private String patientName;
	
	@Transient
	private String userNames;
	
	public double getActualrefund_amnt() {
		return actualrefund_amnt;
	}

	public void setActualrefund_amnt(double actualrefund_amnt) {
		this.actualrefund_amnt = actualrefund_amnt;
	}

	public String getRefundStatus() {
		return refundStatus;
	}

	public void setRefundStatus(String refundStatus) {
		this.refundStatus = refundStatus;
	}

	public int getRefundid() {
		return refundid;
	}

	public int getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

	public void setRefundid(int refundid) {
		this.refundid = refundid;
	}

	public double getRefund_amnt() {
		return refund_amnt;
	}

	public void setRefund_amnt(double refund_amnt) {
		this.refund_amnt = refund_amnt;
	}
	@Transient
	private List<CommonadvDto> lstCommonadv;

	public int getCommonadv_id() {
		return commonadv_id;
	}

	public void setCommonadv_id(int commonadv_id) {
		this.commonadv_id = commonadv_id;
	}

	public int getPatient_ID() {
		return patient_ID;
	}

	public void setPatient_ID(int patient_ID) {
		this.patient_ID = patient_ID;
	}

	public double getCommonadv_amnt() {
		return commonadv_amnt;
	}

	public void setCommonadv_amnt(double commonadv_amnt) {
		this.commonadv_amnt = commonadv_amnt;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
		this.deletedBy = deletedBy;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public List<CommonadvDto> getLstCommonadv() {
		return lstCommonadv;
	}

	public void setLstCommonadv(List<CommonadvDto> lstCommonadv) {
		this.lstCommonadv = lstCommonadv;
	}

	public String getNarration() {
		return narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public String getTransationflag() {
		return transationflag;
	}

	public void setTransationflag(String transationflag) {
		this.transationflag = transationflag;
	}

	public String getPostflag() {
		return postflag;
	}

	public void setPostflag(String postflag) {
		this.postflag = postflag;
	}
	
	
	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getPaidflag() {
		return paidflag;
	}

	public void setPaidflag(String paidflag) {
		this.paidflag = paidflag;
	}

	public double getDeduct_amnt() {
		return deduct_amnt;
	}

	public void setDeduct_amnt(double deduct_amnt) {
		this.deduct_amnt = deduct_amnt;
	}

	public double getRemaining_amnt() {
		return remaining_amnt;
	}

	public void setRemaining_amnt(double remaining_amnt) {
		this.remaining_amnt = remaining_amnt;
	}

	public String getBank() {
		return bank;
	}

	public void setBank(String bank) {
		this.bank = bank;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public int getPaymode() {
		return paymode;
	}

	public void setPaymode(int paymode) {
		this.paymode = paymode;
	}

	public double getCashAmt() {
		return cashAmt;
	}

	public void setCashAmt(double cashAmt) {
		this.cashAmt = cashAmt;
	}

	public double getCardAmt() {
		return cardAmt;
	}

	public void setCardAmt(double cardAmt) {
		this.cardAmt = cardAmt;
	}

	public double getChequeAmt() {
		return chequeAmt;
	}

	public void setChequeAmt(double chequeAmt) {
		this.chequeAmt = chequeAmt;
	}

	public double getTotAmt() {
		return totAmt;
	}

	public void setTotAmt(double totAmt) {
		this.totAmt = totAmt;
	}

	public String getOpdIpdNo() {
		return opdIpdNo;
	}

	public void setOpdIpdNo(String opdIpdNo) {
		this.opdIpdNo = opdIpdNo;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getUserNames() {
		return userNames;
	}

	public void setUserNames(String userNames) {
		this.userNames = userNames;
	}	
}
