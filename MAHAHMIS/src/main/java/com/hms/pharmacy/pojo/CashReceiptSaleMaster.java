package com.hms.pharmacy.pojo;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "pharma_cash_receipt_sale_master")
public class CashReceiptSaleMaster {

	@Id
	@GeneratedValue
	@Column(name = "cash_receipt_sale_id")
	private Integer cashReceiptSaleId;
	
	@Column(name = "cash_receipt_sale_doc_id")
	private String cashReceiptSaleDocId;
	
	@Column(name = "cash_receipt_sale_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date cashReceiptSaleDate;
	
	@ManyToOne
	@JoinColumn(name = "cash_receipt_patient_id")
	private PatientMaster patientMaster=new PatientMaster();
	
	@Column(name = "cash_receipt_sale_narration")
	private String cashReceiptSaleNarration;
	
	@Column(name = "cash_receipt_sale_amt")
	private Integer cashReceiptSaleAmt;
	
	@Column(name = "cash_receipt_sale_made_by")
	private String cashReceiptSaleMadeBy;
	
	@Column(name = "cash_receipt_sale_delete_flag")
	private Integer cashReceiptSaleDeleteFlag;
	
	/*
	 * @Column(name = "cash_receipt_sale_update_date") private Date
	 * cashReceiptSaleUpdateDate;
	 */
   
	@CreationTimestamp
	@Column(name="cash_receipt_sale_add_date")
	private Date cashReceiptSaleAddDate;
	@UpdateTimestamp
	@Column(name="cash_receipt_sale_update_date")
	private Date cashReceiptSaleUpdateDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;
   
	
	public Integer getCashReceiptSaleId() {
		return cashReceiptSaleId;
	}

	public void setCashReceiptSaleId(Integer cashReceiptSaleId) {
		this.cashReceiptSaleId = cashReceiptSaleId;
	}

	public String getCashReceiptSaleDocId() {
		return cashReceiptSaleDocId;
	}

	public void setCashReceiptSaleDocId(String cashReceiptSaleDocId) {
		this.cashReceiptSaleDocId = cashReceiptSaleDocId;
	}

	public Date getCashReceiptSaleDate() {
		return cashReceiptSaleDate;
	}

	public void setCashReceiptSaleDate(Date cashReceiptSaleDate) {
		this.cashReceiptSaleDate = cashReceiptSaleDate;
	}

	public PatientMaster getPatientMaster() {
		return patientMaster;
	}

	public void setPatientMaster(PatientMaster patientMaster) {
		this.patientMaster = patientMaster;
	}

	public String getCashReceiptSaleNarration() {
		return cashReceiptSaleNarration;
	}

	public void setCashReceiptSaleNarration(String cashReceiptSaleNarration) {
		this.cashReceiptSaleNarration = cashReceiptSaleNarration;
	}

	public Integer getCashReceiptSaleAmt() {
		return cashReceiptSaleAmt;
	}

	public void setCashReceiptSaleAmt(Integer cashReceiptSaleAmt) {
		this.cashReceiptSaleAmt = cashReceiptSaleAmt;
	}

	public String getCashReceiptSaleMadeBy() {
		return cashReceiptSaleMadeBy;
	}

	public void setCashReceiptSaleMadeBy(String cashReceiptSaleMadeBy) {
		this.cashReceiptSaleMadeBy = cashReceiptSaleMadeBy;
	}

	public Integer getCashReceiptSaleDeleteFlag() {
		return cashReceiptSaleDeleteFlag;
	}

	public void setCashReceiptSaleDeleteFlag(Integer cashReceiptSaleDeleteFlag) {
		this.cashReceiptSaleDeleteFlag = cashReceiptSaleDeleteFlag;
	}

	public Date getCashReceiptSaleUpdateDate() {
		return cashReceiptSaleUpdateDate;
	}

	public void setCashReceiptSaleUpdateDate(Date cashReceiptSaleUpdateDate) {
		this.cashReceiptSaleUpdateDate = cashReceiptSaleUpdateDate;
	}

	public Date getCashReceiptSaleAddDate() {
		return cashReceiptSaleAddDate;
	}

	public void setCashReceiptSaleAddDate(Date cashReceiptSaleAddDate) {
		this.cashReceiptSaleAddDate = cashReceiptSaleAddDate;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}
		
}
