package com.hms.pharmacy.pojo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;

@Entity
@Table(name="pharma_credit_note_slave")
public class CreditNoteSlave implements Serializable 
{
	@Id
	@GeneratedValue
	@Column(name = "credit_note_slave_id")
	private Integer creditNoteSlaveId;
	
	@ManyToOne
	@JoinColumn(name = "credit_note_slave_master_id")
	private CreditNoteMaster creditNoteMaster;
	
	@ManyToOne
	@JoinColumn(name = "credit_note_slave_product_id")
	private ProductMaster productMaster;
	
	/*@ManyToOne
	@JoinColumn(name = "credit_note_slave_purchase_slave_id")
	private PurchaseSlave purchaseSlave;*/

	@Column(name = "credit_note_slave_qty")
	private Integer creditSlaveQty;
	
	@Column(name = "credit_note_slave_amt")
	private Double  creditNoteSlaveAmt;
	
	@Column(name = "credit_note_slave_rate")
	private Double creditNoteSlaveRate;
	
	@Column(name = "credit_note_slave_batch_code")
	private String creditNoteSlaveBatchCode;
	
	@Column(name = "credit_note_slave_batch_expiry")
	private String creditNoteSlaveBatchExpiry;
	
	@Column(name = "credit_note_slave_mrp")
	private Double creditNoteSlaveMrp;
	
	@Column(name = "credit_note_slave_BatchId")
	private Integer creditNoteSlaveBatchId;
	
	@Column(name = "credit_note_slave_indent_id")
	private int creditNoteSlaveIndentId=0;
	
	@Column(name = "credit_note_slave_patient_id")
	private int creditNoteSlavePatientId=0;
	
	@Column(name = "credit_note_slave_counter_id")
	private int creditNoteSlaveCounterId=0;
	
	@Column(name = "credit_note_slave_code")
	private String  creditNoteSlaveCode;
	
	@Column(name = "credit_slave_vat")
	private Double creditSlaveVat;
	
	@Column(name = "credit_slave_vatAmt")
	private Double creditSlaveVatAmt;
	
	@Column(name = "credit_slave_ratePerUnit")
	private Double creditNoteSlaveRatePerUnit;
	
	@Column(name = "credit_slave_discAmt")
	private Double creditNoteSlaveDiscAmt;
	
	public Double getCreditNoteSlaveDiscAmt() {
		return creditNoteSlaveDiscAmt;
	}

	public void setCreditNoteSlaveDiscAmt(Double creditNoteSlaveDiscAmt) {
		this.creditNoteSlaveDiscAmt = creditNoteSlaveDiscAmt;
	}

	public Double getCreditNoteSlaveRatePerUnit() {
		return creditNoteSlaveRatePerUnit;
	}

	public void setCreditNoteSlaveRatePerUnit(Double creditNoteSlaveRatePerUnit) {
		this.creditNoteSlaveRatePerUnit = creditNoteSlaveRatePerUnit;
	}
	
	public Double getCreditSlaveVatAmt() {
		return creditSlaveVatAmt;
	}

	public void setCreditSlaveVatAmt(Double creditSlaveVatAmt) {
		this.creditSlaveVatAmt = creditSlaveVatAmt;
	}

	public Double getCreditSlaveVat() {
		return creditSlaveVat;
	}

	public void setCreditSlaveVat(Double creditSlaveVat) {
		this.creditSlaveVat = creditSlaveVat;
	}

	public int getCreditNoteSlaveCounterId() {
		return creditNoteSlaveCounterId;
	}

	public void setCreditNoteSlaveCounterId(int creditNoteSlaveCounterId) {
		this.creditNoteSlaveCounterId = creditNoteSlaveCounterId;
	}
	
	public int getCreditNoteSlavePatientId() {
		return creditNoteSlavePatientId;
	}

	public void setCreditNoteSlavePatientId(int creditNoteSlavePatientId) {
		this.creditNoteSlavePatientId = creditNoteSlavePatientId;
	}
	
	public String getCreditNoteSlaveCode() {
		return creditNoteSlaveCode;
	}

	public void setCreditNoteSlaveCode(String creditNoteSlaveCode) {
		this.creditNoteSlaveCode = creditNoteSlaveCode;
	}

	public Double getCreditNoteSlaveAmt() {
		return creditNoteSlaveAmt;
	}

	public void setCreditNoteSlaveAmt(Double creditNoteSlaveAmt) {
		this.creditNoteSlaveAmt = creditNoteSlaveAmt;
	}


	public Integer getCreditNoteSlaveId() {
		return creditNoteSlaveId;
	}
	
		
	public void setCreditNoteSlaveId(Integer creditNoteSlaveId) {
		this.creditNoteSlaveId = creditNoteSlaveId;
	}
	
	public Integer getCreditSlaveQty() {
		return creditSlaveQty;
	}

	public void setCreditSlaveQty(Integer creditSlaveQty) {
		this.creditSlaveQty = creditSlaveQty;
	}
	@JsonIgnore
	public CreditNoteMaster getCreditNoteMaster() {
		return creditNoteMaster;
	}

	public void setCreditNoteMaster(CreditNoteMaster creditNoteMaster) {
		this.creditNoteMaster = creditNoteMaster;
	}

	public ProductMaster getProductMaster() {
		return productMaster;
	}

	public void setProductMaster(ProductMaster productMaster) {
		this.productMaster = productMaster;
	}

	/*public PurchaseSlave getPurchaseSlave() {
		return purchaseSlave;
	}

	public void setPurchaseSlave(PurchaseSlave purchaseSlave) {
		this.purchaseSlave = purchaseSlave;
	}*/

	public Double getCreditNoteSlaveRate() {
		return creditNoteSlaveRate;
	}

	public void setCreditNoteSlaveRate(Double creditNoteSlaveRate) {
		this.creditNoteSlaveRate = creditNoteSlaveRate;
	}

	public String getCreditNoteSlaveBatchCode() {
		return creditNoteSlaveBatchCode;
	}

	public void setCreditNoteSlaveBatchCode(String creditNoteSlaveBatchCode) {
		this.creditNoteSlaveBatchCode = creditNoteSlaveBatchCode;
	}

	public String getCreditNoteSlaveBatchExpiry() {
		return creditNoteSlaveBatchExpiry;
	}

	public void setCreditNoteSlaveBatchExpiry(String creditNoteSlaveBatchExpiry) {
		this.creditNoteSlaveBatchExpiry = creditNoteSlaveBatchExpiry;
	}

	public Double getCreditNoteSlaveMrp() {
		return creditNoteSlaveMrp;
	}

	public void setCreditNoteSlaveMrp(Double creditNoteSlaveMrp) {
		this.creditNoteSlaveMrp = creditNoteSlaveMrp;
	}

	public Integer getCreditNoteSlaveBatchId() {
		return creditNoteSlaveBatchId;
	}

	public void setCreditNoteSlaveBatchId(Integer creditNoteSlaveBatchId) {
		this.creditNoteSlaveBatchId = creditNoteSlaveBatchId;
	}

	public int getCreditNoteSlaveIndentId() {
		return creditNoteSlaveIndentId;
	}

	public void setCreditNoteSlaveIndentId(int creditNoteSlaveIndentId) {
		this.creditNoteSlaveIndentId = creditNoteSlaveIndentId;
	}
	
	
}
