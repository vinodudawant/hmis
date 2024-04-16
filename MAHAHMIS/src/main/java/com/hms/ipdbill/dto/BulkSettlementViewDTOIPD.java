package com.hms.ipdbill.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity
@Table(name = "ehat_bulk_settlement_viewipd")
@Immutable
public class BulkSettlementViewDTOIPD {

	
	/*@Column(name = "bill_receipt_id")
	private Integer billReceiptId;*/
	
	@Id
	@GeneratedValue
	@Column(name = "bill_id")
	private Integer billId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "patient_id",insertable=false , updatable=false)
	private String pIdd;
	
	@Column(name = "department_id")
	private Integer departmentId;
	
	@Column(name = "unit_id")
	private int unitId;
	
	@Column(name = "source_type_id")
	private Integer sourceTypeId=1;
	
	@Column(name = "sponsor_cat_id")
	private Integer sponsorCatId=0;
		
	@Column(name = "total_amt")
	private double totalAmt=0;
	
	/*@Column(name = "total_qty")
	private double totalQty=1;*/
		
	@Column(name = "total_discount")
	private double totalDisc =0;
	
	@Column(name = "total_paid")
	private double totalPaid=0;
	
	@Column(name = "total_remain")
	private double totalRemain=0;
	
	@Column(name = "final_total")
	private double finalTotal=0;
	
	@Column(name = "final_paid")
	private double finalPaid=0;
	
	@Column(name = "final_remain")
	private double finalRemain=0;
	
	/*@Column(name = "receipt_status")
	private String receiptStatus;*/
	
	/*@Column(name = "against_id")
	private Integer againstId=0;*/
	
	/*@Column(name = "payment_type")
	private Integer paymentType=1;
	*/
	@Column(name = "deleted")
	private String deleted="N";
	
	@Column(name = "patient_name")
	private String patientName="-";	
		
	@Column(name = "created_date_time")
	private String createdDateTime;

	@Transient
	private List<BulkSettlementViewDTOIPD> listBulkSettlement2;

	/*public Integer getBillReceiptId() {
		return billReceiptId;
	}

	public void setBillReceiptId(Integer billReceiptId) {
		this.billReceiptId = billReceiptId;
	}*/

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

	public String getpIdd() {
		return pIdd;
	}

	public void setpIdd(String pIdd) {
		this.pIdd = pIdd;
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

	public double getTotalAmt() {
		return totalAmt;
	}

	public void setTotalAmt(double totalAmt) {
		this.totalAmt = totalAmt;
	}

	/*public double getTotalQty() {
		return totalQty;
	}

	public void setTotalQty(double totalQty) {
		this.totalQty = totalQty;
	}*/

	public double getTotalDisc() {
		return totalDisc;
	}

	public void setTotalDisc(double totalDisc) {
		this.totalDisc = totalDisc;
	}

	public double getTotalPaid() {
		return totalPaid;
	}

	public void setTotalPaid(double totalPaid) {
		this.totalPaid = totalPaid;
	}

	public double getTotalRemain() {
		return totalRemain;
	}

	public void setTotalRemain(double totalRemain) {
		this.totalRemain = totalRemain;
	}

	public double getFinalTotal() {
		return finalTotal;
	}

	public void setFinalTotal(double finalTotal) {
		this.finalTotal = finalTotal;
	}

	public double getFinalPaid() {
		return finalPaid;
	}

	public void setFinalPaid(double finalPaid) {
		this.finalPaid = finalPaid;
	}

	public double getFinalRemain() {
		return finalRemain;
	}

	public void setFinalRemain(double finalRemain) {
		this.finalRemain = finalRemain;
	}

/*	public String getReceiptStatus() {
		return receiptStatus;
	}

	public void setReceiptStatus(String receiptStatus) {
		this.receiptStatus = receiptStatus;
	}

	public Integer getAgainstId() {
		return againstId;
	}

	public void setAgainstId(Integer againstId) {
		this.againstId = againstId;
	}
*/
	/*public Integer getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(Integer paymentType) {
		this.paymentType = paymentType;
	}*/

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(String createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public List<BulkSettlementViewDTOIPD> getListBulkSettlement2() {
		return listBulkSettlement2;
	}

	public void setListBulkSettlement2(
			List<BulkSettlementViewDTOIPD> listBulkSettlement2) {
		this.listBulkSettlement2 = listBulkSettlement2;
	}

	
	
	
}
