package com.hms.pharmacy.pojo;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

@Entity
@Table(name = "pharma_cash_receipt_slave")
public class CashReceiptSlave {

	@Id
	@GeneratedValue
	@Column(name = "cash_receipt_slave_id")
	private Integer cashReceiptSlaveId;
	
	@Column(name = "cash_receipt_slave_sr")
	private Integer cashReceiptSlaveSr;
	
	
	@Column(name = "cash_receipt_slave_master_id")
	private Integer cashReceiptSlaveMasterId;
	
   
	@Column(name = "cash_receipt_slave_pur_id")
	private Integer cashReceiptSlavePurId;
	
      
	@Column(name = "cash_receipt_slave_amt")
	private Double cashReceiptSlaveAmt;
	
	@Column(name = "cash_receipt_slave_disc")
	private Double cashReceiptSlaveDisc;

	public Integer getCashReceiptSlaveId() {
		return cashReceiptSlaveId;
	}

	public void setCashReceiptSlaveId(Integer cashReceiptSlaveId) {
		this.cashReceiptSlaveId = cashReceiptSlaveId;
	}

	public Integer getCashReceiptSlaveSr() {
		return cashReceiptSlaveSr;
	}

	public void setCashReceiptSlaveSr(Integer cashReceiptSlaveSr) {
		this.cashReceiptSlaveSr = cashReceiptSlaveSr;
	}

	public Integer getCashReceiptSlaveMasterId() {
		return cashReceiptSlaveMasterId;
	}

	public void setCashReceiptSlaveMasterId(Integer cashReceiptSlaveMasterId) {
		this.cashReceiptSlaveMasterId = cashReceiptSlaveMasterId;
	}

	public Integer getCashReceiptSlavePurId() {
		return cashReceiptSlavePurId;
	}

	public void setCashReceiptSlavePurId(Integer cashReceiptSlavePurId) {
		this.cashReceiptSlavePurId = cashReceiptSlavePurId;
	}

	public Double getCashReceiptSlaveAmt() {
		return cashReceiptSlaveAmt;
	}

	public void setCashReceiptSlaveAmt(Double cashReceiptSlaveAmt) {
		this.cashReceiptSlaveAmt = cashReceiptSlaveAmt;
	}

	public Double getCashReceiptSlaveDisc() {
		return cashReceiptSlaveDisc;
	}

	public void setCashReceiptSlaveDisc(Double cashReceiptSlaveDisc) {
		this.cashReceiptSlaveDisc = cashReceiptSlaveDisc;
	}

	

}
