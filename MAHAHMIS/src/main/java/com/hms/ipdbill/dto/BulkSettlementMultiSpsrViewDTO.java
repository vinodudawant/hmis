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
@Table(name = "ehat_bulk_settlement_multi_spsr_view")
@Immutable
public class BulkSettlementMultiSpsrViewDTO {

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
	
	@Column(name = "sponsor_cat_id")
	private Integer sponsorCatId=0;
		
	@Column(name = "total_amt")
	private double totalAmt=0;

	@Column(name = "total_discount")
	private double totalDisc =0;
	
	@Column(name = "total_concn")
	private double totalConcn=0;
	
	@Column(name = "total_tds")
	private double totalTds=0;
	
	@Column(name = "total_paid")
	private double totalPaid=0;
	
	@Column(name = "total_remain")
	private double totalRemain=0;
		
	@Column(name = "deleted")
	private String deleted="N";
	
	@Column(name = "patient_name")
	private String patientName="-";	
		
	@Column(name = "created_date_time")
	private String createdDateTime;
	
	@Column(name = "center_patient_id")
	private String centerPatientId;
	
	@Column(name = "invoice_count")
	private Integer invoiceCount;

	@Transient
	private List<BulkSettlementMultiSpsrViewDTO> listBulkSettlementMultiSpsr;
	
	@Transient
	private List<BulkSettlementViewDTO> listBulkSettlement;

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

	public double getTotalDisc() {
		return totalDisc;
	}

	public void setTotalDisc(double totalDisc) {
		this.totalDisc = totalDisc;
	}	

	public double getTotalConcn() {
		return totalConcn;
	}

	public void setTotalConcn(double totalConcn) {
		this.totalConcn = totalConcn;
	}

	public double getTotalTds() {
		return totalTds;
	}

	public void setTotalTds(double totalTds) {
		this.totalTds = totalTds;
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

	public List<BulkSettlementMultiSpsrViewDTO> getListBulkSettlementMultiSpsr() {
		return listBulkSettlementMultiSpsr;
	}

	public void setListBulkSettlementMultiSpsr(
			List<BulkSettlementMultiSpsrViewDTO> listBulkSettlementMultiSpsr) {
		this.listBulkSettlementMultiSpsr = listBulkSettlementMultiSpsr;
	}

	public List<BulkSettlementViewDTO> getListBulkSettlement() {
		return listBulkSettlement;
	}

	public void setListBulkSettlement(List<BulkSettlementViewDTO> listBulkSettlement) {
		this.listBulkSettlement = listBulkSettlement;
	}

	public String getCenterPatientId() {
		return centerPatientId;
	}

	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}

	public Integer getInvoiceCount() {
		return invoiceCount;
	}

	public void setInvoiceCount(Integer invoiceCount) {
		this.invoiceCount = invoiceCount;
	}

	
	
}
