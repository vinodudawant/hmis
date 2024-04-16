package com.hms.pharmacy.pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "pharma_purchase_correction")
public class PurchaseCorrection 
{
	@Id
	@GeneratedValue
	@Column(name = "pur_cor_id")
	private Integer purCorId;
	
	@Column(name = "pur_cor_pur_slave_id")
	private Integer purchaseSlave;
	
	@Column(name = "pur_cor_BatchId")
	private Integer purCorBatchId;
	
	@Column(name = "pur_cor_mrp")
	private Double purCorMrp;
	
	@Column(name="pur_cor_date")
	private Date purCorDate;
	
	@Column(name="pur_bill_rate")
	private Double purBillRate;
	
	@Column(name="pur_purchase_rate")
	private Double purRate;
	
	@Column(name="pur_rate")
	private Double rate;
	
	@Column(name="pur_cor_delete_flag")
	private Integer purCorDeleteFlag;
	
	public Double getPurBillRate() {
		return purBillRate;
	}

	public void setPurBillRate(Double purBillRate) {
		this.purBillRate = purBillRate;
	}

	public Double getPurRate() {
		return purRate;
	}

	public void setPurRate(Double purRate) {
		this.purRate = purRate;
	}

	public Integer getPurCorId() {
		return purCorId;
	}

	public void setPurCorId(Integer purCorId) {
		this.purCorId = purCorId;
	}

	/*public PurchaseSlave getPurchaseSlave() {
		return purchaseSlave;
	}

	public void setPurchaseSlave(PurchaseSlave purchaseSlave) {
		this.purchaseSlave = purchaseSlave;
	}*/
	
	

	public Integer getPurCorBatchId() {
		return purCorBatchId;
	}

	public Integer getPurchaseSlave() {
		return purchaseSlave;
	}

	public void setPurchaseSlave(Integer purchaseSlave) {
		this.purchaseSlave = purchaseSlave;
	}

	public void setPurCorBatchId(Integer purCorBatchId) {
		this.purCorBatchId = purCorBatchId;
	}

	public Double getPurCorMrp() {
		return purCorMrp;
	}

	public void setPurCorMrp(Double purCorMrp) {
		this.purCorMrp = purCorMrp;
	}

	public Date getPurCorDate() {
		return purCorDate;
	}

	public void setPurCorDate(Date purCorDate) {
		this.purCorDate = purCorDate;
	}

	public Integer getPurCorDeleteFlag() {
		return purCorDeleteFlag;
	}

	public void setPurCorDeleteFlag(Integer purCorDeleteFlag) {
		this.purCorDeleteFlag = purCorDeleteFlag;
	}

	public Double getRate() {
		return rate;
	}

	public void setRate(Double rate) {
		this.rate = rate;
	}
	
	
	
}
