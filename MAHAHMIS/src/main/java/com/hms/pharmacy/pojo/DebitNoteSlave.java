package com.hms.pharmacy.pojo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;

@Entity
@Table(name = "pharma_debit_note_slave")
public class DebitNoteSlave implements Serializable {
	@Id
	@GeneratedValue
	@Column(name = "debit_note_slave_id")
	private Integer debitNoteSlaveId;

	@ManyToOne
	@JoinColumn(name = "debit_note_slave_master_id")
	private DebitNoteMaster debitNoteMaster;
	
	@ManyToOne
	@JoinColumn(name = "debit_note_slave_product_id")
	private ProductMaster productMaster;

	@Column(name = "debit_note_slave_qty")
	private Integer debitNoteSlaveQty;

	@Column(name = "debit_note_slave_amt")
	private Double debitNoteSlaveAmt;
	
	@Column(name = "debit_note_slave_rate")
	private Double debitNoteSlaveRate;
	
	@Column(name = "debit_note_slave_batch_code")
	private String debitNoteSlaveBatchCode;
	
	@Column(name = "debit_note_slave_batch_expiry")
	private String debitNoteSlaveBatchExpiry;
	
	@Column(name = "debit_note_slave_mrp")
	private Double debitNoteSlaveMrp;
	
	@Column(name = "debit_note_slave_BatchId")
	private Integer debitNoteSlaveBatchId;
	
	@Column(name = "debit_note_slave_gst")
	private Double debitNoteSlaveGST;
	
	@Column(name = "debit_note_slave_purchase_id")
	private int debitNoteSlavePurchaseId=0;
	
	@Column(name = "account_status_debit")
	private String accountStatusDebit;
	
	@Column(name = "debit_slave_scheme")
	private Integer debitSlaveScheme=0;
	
	@Column(name = "debit_slave_scheme_amt")
	private Double debitSlaveSchemeAmt;
	
	@Column(name = "debit_note_slave_disc")
	private Double debitNoteSlaveDisc;
	
	@Column(name = "debit_note_slave_disc_amt")
	private Double debitNoteSlaveDiscAmt;
	
	@Column(name = "debit_note_slave_narration")
	private String debitNoteSlaveNarration;
	
	@Transient
	private Double amountBal; 
	
	
	@Transient
	private Double indentNetAmount; 
	

	public Double getIndentNetAmount() {
		return indentNetAmount;
	}

	public void setIndentNetAmount(Double indentNetAmount) {
		this.indentNetAmount = indentNetAmount;
	}

	public Double getAmountBal() {
		return amountBal;
	}

	public void setAmountBal(Double amountBal) {
		this.amountBal = amountBal;
	}

	public String getAccountStatusDebit() {
		return accountStatusDebit;
	}

	public void setAccountStatusDebit(String accountStatusDebit) {
		this.accountStatusDebit = accountStatusDebit;
	}

	public Double getDebitNoteSlaveGST() {
		return debitNoteSlaveGST;
	}

	public void setDebitNoteSlaveGST(Double debitNoteSlaveGST) {
		this.debitNoteSlaveGST = debitNoteSlaveGST;
	}

	public int getDebitNoteSlavePurchaseId() {
		return debitNoteSlavePurchaseId;
	}

	public void setDebitNoteSlavePurchaseId(int debitNoteSlavePurchaseId) {
		this.debitNoteSlavePurchaseId = debitNoteSlavePurchaseId;
	}

	public Integer getDebitNoteSlaveId() {
		return debitNoteSlaveId;
	}

	public void setDebitNoteSlaveId(Integer debitNoteSlaveId) {
		this.debitNoteSlaveId = debitNoteSlaveId;
	}

	public ProductMaster getProductMaster() {
		return productMaster;
	}

	public void setProductMaster(ProductMaster productMaster) {
		this.productMaster = productMaster;
	}

	public Integer getDebitNoteSlaveQty() {
		return debitNoteSlaveQty;
	}

	public void setDebitNoteSlaveQty(Integer debitNoteSlaveQty) {
		this.debitNoteSlaveQty = debitNoteSlaveQty;
	}

	public Double getDebitNoteSlaveAmt() {
		return debitNoteSlaveAmt;
	}

	public void setDebitNoteSlaveAmt(Double debitNoteSlaveAmt) {
		this.debitNoteSlaveAmt = debitNoteSlaveAmt;
	}

	public Double getDebitNoteSlaveRate() {
		return debitNoteSlaveRate;
	}

	public void setDebitNoteSlaveRate(Double debitNoteSlaveRate) {
		this.debitNoteSlaveRate = debitNoteSlaveRate;
	}

	public String getDebitNoteSlaveBatchCode() {
		return debitNoteSlaveBatchCode;
	}

	public void setDebitNoteSlaveBatchCode(String debitNoteSlaveBatchCode) {
		this.debitNoteSlaveBatchCode = debitNoteSlaveBatchCode;
	}

	public String getDebitNoteSlaveBatchExpiry() {
		return debitNoteSlaveBatchExpiry;
	}

	public void setDebitNoteSlaveBatchExpiry(String debitNoteSlaveBatchExpiry) {
		this.debitNoteSlaveBatchExpiry = debitNoteSlaveBatchExpiry;
	}

	public Double getDebitNoteSlaveMrp() {
		return debitNoteSlaveMrp;
	}

	public void setDebitNoteSlaveMrp(Double debitNoteSlaveMrp) {
		this.debitNoteSlaveMrp = debitNoteSlaveMrp;
	}

	public Integer getDebitNoteSlaveBatchId() {
		return debitNoteSlaveBatchId;
	}

	public void setDebitNoteSlaveBatchId(Integer debitNoteSlaveBatchId) {
		this.debitNoteSlaveBatchId = debitNoteSlaveBatchId;
	}
	
	@JsonIgnore
	public DebitNoteMaster getDebitNoteMaster() {
		return debitNoteMaster;
	}

	public void setDebitNoteMaster(DebitNoteMaster debitNoteMaster) {
		this.debitNoteMaster = debitNoteMaster;
	}
	
	public Integer getDebitSlaveScheme() {
		return debitSlaveScheme;
	}

	public void setDebitSlaveScheme(Integer debitSlaveScheme) {
		this.debitSlaveScheme = debitSlaveScheme;
	}
	
	public Double getDebitSlaveSchemeAmt() {
		return debitSlaveSchemeAmt;
	}

	public void setDebitSlaveSchemeAmt(Double debitSlaveSchemeAmt) {
		this.debitSlaveSchemeAmt = debitSlaveSchemeAmt;
	}
	
	public Double getDebitNoteSlaveDisc() {
		return debitNoteSlaveDisc;
	}

	public void setDebitNoteSlaveDisc(Double debitNoteSlaveDisc) {
		this.debitNoteSlaveDisc = debitNoteSlaveDisc;
	}
	
	public Double getDebitNoteSlaveDiscAmt() {
		return debitNoteSlaveDiscAmt;
	}

	public void setDebitNoteSlaveDiscAmt(Double debitNoteSlaveDiscAmt) {
		this.debitNoteSlaveDiscAmt = debitNoteSlaveDiscAmt;
	}
	
	public String getDebitNoteSlaveNarration() {
		return debitNoteSlaveNarration;
	}

	public void setDebitNoteSlaveNarration(String debitNoteSlaveNarration) {
		this.debitNoteSlaveNarration = debitNoteSlaveNarration;
	}
}