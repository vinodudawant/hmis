package com.hms.pharmacy.pojo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name="pharma_partywise_expiry_debit_note_slave")
public class PartywiseExpiryDebitNoteSlave  implements Serializable 
{
	@Id
	@GeneratedValue
	@Column(name = "partywise_expiry_debit_note_slave_id")
	private Integer debitNoteSlaveId;
	
	@ManyToOne
	@JoinColumn(name = "debit_note_slave_product_id")
	private ProductMaster productMaster;

	@Column(name = "partywise_expiry_debit_note_slave_qty")
	private Integer debitNoteSlaveQty;
	
	@ManyToOne
	@JoinColumn(name = "debit_note_slave_purchase_slave_id")
	private PurchaseSlave purchaseSlave;
	
	@Column(name = "partywise_expiry_debit_note_slave_amt")
	private Double debitNoteSlaveAmt;
	

	public PurchaseSlave getPurchaseSlave() {
		return purchaseSlave;
	}


	public void setPurchaseSlave(PurchaseSlave purchaseSlave) {
		this.purchaseSlave = purchaseSlave;
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
}
