package com.hms.pharmacy.pojo;

import javax.persistence.ManyToOne;

public class CorrectionRate 
{
	private String batchCode;
	private int batchId;
	private String expiry;
	private Double tRate;
	private Double purRate;
	private Double mrp;
	private Double closingStock;
	
	@ManyToOne
	private PurchaseMaster purchaseMaster;

	public String getBatchCode() {
		return batchCode;
	}

	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
	}

	public String getExpiry() {
		return expiry;
	}

	public void setExpiry(String expiry) {
		this.expiry = expiry;
	}

	public Double gettRate() {
		return tRate;
	}

	public void settRate(Double tRate) {
		this.tRate = tRate;
	}

	public Double getPurRate() {
		return purRate;
	}

	public void setPurRate(Double purRate) {
		this.purRate = purRate;
	}

	public Double getMrp() {
		return mrp;
	}

	public void setMrp(Double mrp) {
		this.mrp = mrp;
	}

	public Double getClosingStock() {
		return closingStock;
	}

	public void setClosingStock(Double closingStock) {
		this.closingStock = closingStock;
	}

	public PurchaseMaster getPurchaseMaster() {
		return purchaseMaster;
	}

	public void setPurchaseMaster(PurchaseMaster purchaseMaster) {
		this.purchaseMaster = purchaseMaster;
	}

	public int getBatchId() {
		return batchId;
	}

	public void setBatchId(int batchId) {
		this.batchId = batchId;
	}
	
	
	
}

