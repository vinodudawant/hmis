package com.hms.pharmacy.pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
@Entity
@Table(name="pharma_opening_stock")
public class OpeningStock 
{  
	@Id
	@GeneratedValue
	@Column(name="opening_stock_id")
	private Integer openingStockId;
	
	@Column(name = "shelf_no")
	private Integer shelfNo;
	
	@Column(name = "opening_qty")
	private Integer quantity;
	
	@Column(name = "opening_batch_code")
	private String batchCode;
	
	@Column(name = "opening_expiry")
	private String batchExpiry;
	
	@Column(name = "opening_vat")
	private Double vat;
	
	@Column(name = "opening_igst")
	private Double igst;
	
	@Column(name = "opening_cess")
	private Double cess;
	
	@Column(name = "opening_pur_rate")
	private Double purRate;
	
	@Column(name = "opening_mrp")
	private Double mrp;
	
	@Column(name = "opening_rate")
    private Double rate;
	
	@Column(name = "opening_Narration")
    private String naration;
       
	@Column(name = "product_id")
	private Integer productId;
	
	@Column(name = "batch_id")
	private Integer batchId;
	
	@Column(name = "opening_stock_type")
	private Integer openingStockType;
	
	@Column(name = "opening_stock_amt")
	private Double amt;
	@CreationTimestamp
	@Column(name = "opening_stock_add_date")
	private Date openingStockAddDate;
	@UpdateTimestamp
	@Column(name = "opening_stock_update_date")
	private Date openingStockUpdateDate;
	
	@Column(name = "opening_stock_delete_flag")
	private int openingStockDeleteFlag;
	
	@Column(name = " unit_id" ,columnDefinition="int default 1")
	private int unitId;
	
	public Double getIgst() {
		return igst;
	}

	public void setIgst(Double igst) {
		this.igst = igst;
	}

	public Double getCess() {
		return cess;
	}

	public void setCess(Double cess) {
		this.cess = cess;
	}

	public Integer getOpeningStockId() {
		return openingStockId;
	}

	public void setOpeningStockId(Integer openingStockId) {
		this.openingStockId = openingStockId;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getBatchCode() {
		return batchCode;
	}

	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
	}

	public String getBatchExpiry() {
		return batchExpiry;
	}

	public void setBatchExpiry(String batchExpiry) {
		this.batchExpiry = batchExpiry;
	}

	public Double getVat() {
		return vat;
	}

	public void setVat(Double vat) {
		this.vat = vat;
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

	public Double getRate() {
		return rate;
	}

	public void setRate(Double rate) {
		this.rate = rate;
	}

	public String getNaration() {
		return naration;
	}

	public void setNaration(String naration) {
		this.naration = naration;
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public Integer getBatchId() {
		return batchId;
	}

	public void setBatchId(Integer batchId) {
		this.batchId = batchId;
	}

	public Integer getShelfNo() {
		return shelfNo;
	}

	public void setShelfNo(Integer shelfNo) {
		this.shelfNo = shelfNo;
	}

	public Integer getOpeningStockType() {
		return openingStockType;
	}

	public void setOpeningStockType(Integer openingStockType) {
		this.openingStockType = openingStockType;
	}

	public Double getAmt() {
		return amt;
	}

	public void setAmt(Double amt) {
		this.amt = amt;
	}

	public Date getOpeningStockAddDate() {
		return openingStockAddDate;
	}

	public void setOpeningStockAddDate(Date openingStockAddDate) {
		this.openingStockAddDate = openingStockAddDate;
	}

	public Date getOpeningStockUpdateDate() {
		return openingStockUpdateDate;
	}

	public void setOpeningStockUpdateDate(Date openingStockUpdateDate) {
		this.openingStockUpdateDate = openingStockUpdateDate;
	}

	public int getOpeningStockDeleteFlag() {
		return openingStockDeleteFlag;
	}

	public void setOpeningStockDeleteFlag(int openingStockDeleteFlag) {
		this.openingStockDeleteFlag = openingStockDeleteFlag;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}
	
	
}