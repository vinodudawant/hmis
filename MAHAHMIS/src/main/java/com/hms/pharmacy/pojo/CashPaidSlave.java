package com.hms.pharmacy.pojo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;

@Entity
@Table(name="pharma_cash_paid_slave")
public class CashPaidSlave implements Serializable 
{
	@Id
	@GeneratedValue
	@Column(name="cash_paid_slave_id")
	private  Integer cashPaidSlaveId;
	
	@Column(name="cash_paid_sr")
	private Integer cashPaidSr;
	
	@ManyToOne
	@JoinColumn(name = "cash_paid_pur_id")
	private PurchaseMaster purchaseMaster;
	
	@Column(name="cash_paid_amt")
	private Double cashPaidAmt;
	
	@Column(name="cash_paid_balance")
	private Double cashPaidBalance;
	
	@Column(name="cash_paid_discount")
	private Double cashPaidDiscount;
	
	@ManyToOne
	@JoinColumn(name = "cash_paid_master_id")
	private CashPaidMaster cashPaidMaster;
	
	@JsonIgnore
	public CashPaidMaster getCashPaidMaster() {
		return cashPaidMaster;
	}
	public void setCashPaidMaster(CashPaidMaster cashPaidMaster) {
		this.cashPaidMaster = cashPaidMaster;
	}
	public Double getCashPaidBalance() {
		return cashPaidBalance;
	}
	public void setCashPaidBalance(Double cashPaidBalance) {
		this.cashPaidBalance = cashPaidBalance;
	}
	public Integer getCashPaidSlaveId() {
		return cashPaidSlaveId;
	}
	public void setCashPaidSlaveId(Integer cashPaidSlaveId) {
		this.cashPaidSlaveId = cashPaidSlaveId;
	}
	
	public Integer getCashPaidSr() {
		return cashPaidSr;
	}
	public void setCashPaidSr(Integer cashPaidSr) {
		this.cashPaidSr = cashPaidSr;
	}
	
	public PurchaseMaster getPurchaseMaster() {
		return purchaseMaster;
	}
	public void setPurchaseMaster(PurchaseMaster purchaseMaster) {
		this.purchaseMaster = purchaseMaster;
	}
	
	public Double getCashPaidAmt() {
		return cashPaidAmt;
	}
	public void setCashPaidAmt(Double cashPaidAmt) {
		this.cashPaidAmt = cashPaidAmt;
	}
	public Double getCashPaidDiscount() {
		return cashPaidDiscount;
	}
	public void setCashPaidDiscount(Double cashPaidDiscount) {
		this.cashPaidDiscount = cashPaidDiscount;
	}
}
