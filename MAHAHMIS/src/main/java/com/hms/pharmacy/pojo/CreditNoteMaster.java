package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="pharma_credit_note_master")
public class CreditNoteMaster implements Serializable 
{
	@Id
	@GeneratedValue
	@Column(name="credit_note_id")
	private Integer creditNoteId;
	
	@Column(name="credit_note_doc_no")
	private String creditNoteDocNo;
	
	@Column(name="credit_note_patient_name")
	private String patientName;
	
	@Column(name="credit_note_patient_address")
	private String patientAddress;
	
	@Column(name="credit_note_patient_phone")
	private String patientPhone;
	
	
	@Column(name="credit_note_transaction_type")
	private String  creditNoteTransactionType;
	
	@Column(name="credit_note_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date creditNotDate;
	
	
	@Column(name="credit_note_narration")
	private String creditNoteNarration;
	
	@Column(name="credit_note_disc_percent")
	private String creditNoteDiscPercent;
	
	@Column(name="credit_note_dicscount")
	private String creditNoteDiscount;
	
	@Column(name="credit_note_surcharge")
	private String creditNoteSurcharge;
	
	@Column(name="credit_note_bill_no")
	private String creditNoteBillNo;
		
	@Column(name="credit_note_bill_date")
	private Date creditNoteBillDate;
	
	@Column(name="credit_note_enter_by")
	private String creditNoteEntryBy;
	
	@Column(name="credit_note_less")
	private String creditNoteLess;
	
	@Column(name="credit_note_add")
	private String creditNoteAdd;
	
	@Column(name="credit_note_gross_amt")
	private Double creditNoteGrossAmt;
	
	@Column(name="credit_note_net_amt")
	private Double creditNoteNetAmt;
	
	@Column(name="credit_note_delete_flag")
	private Integer creditNoteDeleteFlag;
	
	@Column(name="credit_note_update_date")
	private Date creditNoteUpdateDate;
	
	@Column(name="credit_note_treatmentId")
	private Integer creditNoteTreatmentId;
	
	@Column(name="credit_note_user_id")
	private Integer creditNoteUserId=0;
	
	@Column(name="credit_note_store_id")
	private Integer creditNoteStoreId=0;
	
	@Column(name = " unit_id" ,columnDefinition="int default 1")
	private int unitId;
	
	@CreationTimestamp
	@Column(name="created_date")
	private Date createdDate;
	@UpdateTimestamp
	@Column(name="updated_Date")
	private Date UpdateDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;
   
	public Integer getCreditNoteTreatmentId() {
		return creditNoteTreatmentId;
	}

	public void setCreditNoteTreatmentId(Integer creditNoteTreatmentId) {
		this.creditNoteTreatmentId = creditNoteTreatmentId;
	}

	@Column(name="credit_note_patientSaleId")
	private int creditNotePatientSaleId=0;

	@Column(name="credit_note_CounterSaleId")
	private int creditNoteCounterSaleId=0;

	@Column(name = "credit_tax_vat5")
	private Double creditTaxVat5;
	
	@Column(name = "credit_tax_vat55")
	private Double creditTaxVat55=0.0;
	
	@Column(name = "credit_tax_vat12")
	private Double creditTaxVat12;
	
	@Column(name = "credit_tax_vat0")
	private Double creditTaxVat0;
	
	@Column(name="credit_note_patientId")
	private int creditPatientId;
	
	@Column(name="credit_note_type")
	private String creditNoteType;
	
	@Column(name = "credit_note_prev_bal")
	private Double creditNotePrevBal=0.0;
	
	@Column(name = "credit_note_payable")
	private Double creditNotePayable=0.0;
	
	@Column(name = "credit_note_current_bal")
	private Double creditNoteCurrentBal=0.0;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "credit_note_slave_master_id", referencedColumnName = "credit_note_id")
	private List<CreditNoteSlave> creditNoteSlaves = new ArrayList<CreditNoteSlave>();
	
	@Column(name = "credit_note_time")
	private String creditNoteTime=null;
	
	@Column(name = "credit_tax_vat6")
	private Double creditTaxVat6=0.0;
	
	@Column(name = "credit_tax_vat135")
	private Double creditTaxVat135=0.0;
	
	@Column(name="credit_note_IndentSaleId")
	private int creditNotIndentSaleId=0;
	
	

	public int getCreditNotIndentSaleId() {
		return creditNotIndentSaleId;
	}

	public void setCreditNotIndentSaleId(int creditNotIndentSaleId) {
		this.creditNotIndentSaleId = creditNotIndentSaleId;
	}

	public Double getCreditTaxVat6() {
		return creditTaxVat6;
	}

	public void setCreditTaxVat6(Double creditTaxVat6) {
		this.creditTaxVat6 = creditTaxVat6;
	}

	public Double getCreditTaxVat135() {
		return creditTaxVat135;
	}

	public void setCreditTaxVat135(Double creditTaxVat135) {
		this.creditTaxVat135 = creditTaxVat135;
	}

	
	
	public String getCreditNoteType() {
		return creditNoteType;
	}

	public void setCreditNoteType(String creditNoteType) {
		this.creditNoteType = creditNoteType;
	}

	public int getCreditPatientId() {
		return creditPatientId;
	}

	public void setCreditPatientId(int creditPatientId) {
		this.creditPatientId = creditPatientId;
	}

	public Double getCreditTaxVat5() {
		return creditTaxVat5;
	}

	public void setCreditTaxVat5(Double creditTaxVat5) {
		this.creditTaxVat5 = creditTaxVat5;
	}

	public Double getCreditTaxVat12() {
		return creditTaxVat12;
	}

	public void setCreditTaxVat12(Double creditTaxVat12) {
		this.creditTaxVat12 = creditTaxVat12;
	}

	public Double getCreditTaxVat0() {
		return creditTaxVat0;
	}

	public void setCreditTaxVat0(Double creditTaxVat0) {
		this.creditTaxVat0 = creditTaxVat0;
	}

	public int getCreditNoteCounterSaleId() {
		return creditNoteCounterSaleId;
	}

	public void setCreditNoteCounterSaleId(int creditNoteCounterSaleId) {
		this.creditNoteCounterSaleId = creditNoteCounterSaleId;
	}

	public int getCreditNotePatientSaleId() {
		return creditNotePatientSaleId;
	}

	public void setCreditNotePatientSaleId(int creditNotePatientSaleId) {
		this.creditNotePatientSaleId = creditNotePatientSaleId;
	}

	public Date getCreditNoteUpdateDate() {
		return creditNoteUpdateDate;
	}

	public void setCreditNoteUpdateDate(Date creditNoteUpdateDate) {
		this.creditNoteUpdateDate = creditNoteUpdateDate;
	}

	public String getCreditNoteBillNo() {
		return creditNoteBillNo;
	}

	public void setCreditNoteBillNo(String creditNoteBillNo) {
		this.creditNoteBillNo = creditNoteBillNo;
	}
	
	
	
	
	public List<CreditNoteSlave> getCreditNoteSlaves() {
		return creditNoteSlaves;
	}

	public void setCreditNoteSlaves(List<CreditNoteSlave> creditNoteSlaves) {
		this.creditNoteSlaves = creditNoteSlaves;
	}

	public String getPatientPhone() {
		return patientPhone;
	}

	public void setPatientPhone(String patientPhone) {
		this.patientPhone = patientPhone;
	}
	
	public Integer getCreditNoteId() {
		return creditNoteId;
	}

	public void setCreditNoteId(Integer creditNoteId) {
		this.creditNoteId = creditNoteId;
	}

	public String getCreditNoteDocNo() {
		return creditNoteDocNo;
	}

	public void setCreditNoteDocNo(String creditNoteDocNo) {
		this.creditNoteDocNo = creditNoteDocNo;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getPatientAddress() {
		return patientAddress;
	}

	public void setPatientAddress(String patientAddress) {
		this.patientAddress = patientAddress;
	}                                                                                                                                                                  

	public String getCreditNoteTransactionType() {
		return creditNoteTransactionType;
	}

	public void setCreditNoteTransactionType(String creditNoteTransactionType) {
		this.creditNoteTransactionType = creditNoteTransactionType;
	}

	public Date getCreditNotDate() {
		return creditNotDate;
	}

	public void setCreditNotDate(Date creditNotDate) {
		this.creditNotDate = creditNotDate;
	}

	public String getCreditNoteNarration() {
		return creditNoteNarration;
	}

	public void setCreditNoteNarration(String creditNoteNarration) {
		this.creditNoteNarration = creditNoteNarration;
	}

	public String getCreditNoteDiscPercent() {
		return creditNoteDiscPercent;
	}

	public void setCreditNoteDiscPercent(String creditNoteDiscPercent) {
		this.creditNoteDiscPercent = creditNoteDiscPercent;
	}

	public String getCreditNoteDiscount() {
		return creditNoteDiscount;
	}

	public void setCreditNoteDiscount(String creditNoteDiscount) {
		this.creditNoteDiscount = creditNoteDiscount;
	}

	public String getCreditNoteSurcharge() {
		return creditNoteSurcharge;
	}

	public void setCreditNoteSurcharge(String creditNoteSurcharge) {
		this.creditNoteSurcharge = creditNoteSurcharge;
	}

	

	public Date getCreditNoteBillDate() {
		return creditNoteBillDate;
	}

	public void setCreditNoteBillDate(Date creditNoteBillDate) {
		this.creditNoteBillDate = creditNoteBillDate;
	}

	public String getCreditNoteEntryBy() {
		return creditNoteEntryBy;
	}

	public void setCreditNoteEntryBy(String creditNoteEntryBy) {
		this.creditNoteEntryBy = creditNoteEntryBy;
	}

	public String getCreditNoteLess() {
		return creditNoteLess;
	}

	public void setCreditNoteLess(String creditNoteLess) {
		this.creditNoteLess = creditNoteLess;
	}

	public String getCreditNoteAdd() {
		return creditNoteAdd;
	}

	public void setCreditNoteAdd(String creditNoteAdd) {
		this.creditNoteAdd = creditNoteAdd;
	}

	public Double getCreditNoteGrossAmt() {
		return creditNoteGrossAmt;
	}

	public void setCreditNoteGrossAmt(Double creditNoteGrossAmt) {
		this.creditNoteGrossAmt = creditNoteGrossAmt;
	}

	public Double getCreditNoteNetAmt() {
		return creditNoteNetAmt;
	}

	public void setCreditNoteNetAmt(Double creditNoteNetAmt) {
		this.creditNoteNetAmt = creditNoteNetAmt;
	}

	public Integer getCreditNoteDeleteFlag() {
		return creditNoteDeleteFlag;
	}

	public void setCreditNoteDeleteFlag(Integer creditNoteDeleteFlag) {
		this.creditNoteDeleteFlag = creditNoteDeleteFlag;
	}

	public Integer getCreditNoteUserId() {
		return creditNoteUserId;
	}

	public void setCreditNoteUserId(Integer creditNoteUserId) {
		this.creditNoteUserId = creditNoteUserId;
	}

	public Integer getCreditNoteStoreId() {
		return creditNoteStoreId;
	}

	public void setCreditNoteStoreId(Integer creditNoteStoreId) {
		this.creditNoteStoreId = creditNoteStoreId;
	}

	public Double getCreditTaxVat55() {
		return creditTaxVat55;
	}

	public void setCreditTaxVat55(Double creditTaxVat55) {
		this.creditTaxVat55 = creditTaxVat55;
	}

	public Double getCreditNotePrevBal() {
		return creditNotePrevBal;
	}

	public Double getCreditNotePayable() {
		return creditNotePayable;
	}

	public void setCreditNotePrevBal(Double creditNotePrevBal) {
		this.creditNotePrevBal = creditNotePrevBal;
	}

	public void setCreditNotePayable(Double creditNotePayable) {
		this.creditNotePayable = creditNotePayable;
	}

	public Double getCreditNoteCurrentBal() {
		return creditNoteCurrentBal;
	}

	public void setCreditNoteCurrentBal(Double creditNoteCurrentBal) {
		this.creditNoteCurrentBal = creditNoteCurrentBal;
	}

	public String getCreditNoteTime() {
		return creditNoteTime;
	}

	public void setCreditNoteTime(String creditNoteTime) {
		this.creditNoteTime = creditNoteTime;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdateDate() {
		return UpdateDate;
	}

	public void setUpdateDate(Date updateDate) {
		UpdateDate = updateDate;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
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
