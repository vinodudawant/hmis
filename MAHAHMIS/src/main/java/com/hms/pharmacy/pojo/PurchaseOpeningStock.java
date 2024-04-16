package com.hms.pharmacy.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
@Entity
@Table(name = "pharma_purchase_opening_stock")
public class PurchaseOpeningStock
{  
	
	@Id
	@GeneratedValue
	@Column(name = "pur_ope_id")
	private Integer purOpeningId;
	
	@ManyToOne
	@JoinColumn(name = "pur_ope_pur_slave_id")
	private PurchaseSlave purchaseSlave;
	
	@Column(name = "pur_ope_batchId")
	private int batchId;
	
	@Column(name = "pur_ope_shelfNo")
	private String shelfNo;
	
	@Column(name = "pur_ope_quantity")
	private Double Quantity;
	
	@Column(name = "pur_ope_batchCode")
	private String batchCode;
	
	@Column(name = "pur_ope_expiry")
	private String expiry;
	
	@Column(name = "pur_ope_vat")
	private Double vat;
	
	@Column(name = "pur_ope_purRate")
	private Double purRate;
	
	@Column(name = "pur_ope_mrp")
	private Double mrp;
	
	@Column(name = "pur_ope_rate")
    private Double rate;
    
	@Column(name = "pur_ope_naration")
    private String Naration;
	
	@Column(name = "pur_ope_closing_stock")
	private Double closingStock;
	
	@Column(name="pur_ope_delete_flag")
	private Integer purOpeningDeleteFlag;
	
	@Column(name="pur_ope_stock_id")
	private Integer stockId;
	
	public Integer getStockId() {
		return stockId;
	}
	public void setStockId(Integer stockId) {
		this.stockId = stockId;
	}
	public Double getClosingStock() {
		return closingStock;
	}
	public void setClosingStock(Double closingStock) {
		this.closingStock = closingStock;
	}
	
       
	public Integer getPurOpeningId() {
		return purOpeningId;
	}
	public void setPurOpeningId(Integer purOpeningId) {
		this.purOpeningId = purOpeningId;
	}
	public PurchaseSlave getPurchaseSlave() {
		return purchaseSlave;
	}
	public void setPurchaseSlave(PurchaseSlave purchaseSlave) {
		this.purchaseSlave = purchaseSlave;
	}
	
	
	public Integer getPurOpeningDeleteFlag() {
		return purOpeningDeleteFlag;
	}
	public void setPurOpeningDeleteFlag(Integer purOpeningDeleteFlag) {
		this.purOpeningDeleteFlag = purOpeningDeleteFlag;
	}
	/*public PurchaseMaster getPurchaseMaster() {
		return purchaseMaster;
	}
	public void setPurchaseMaster(PurchaseMaster purchaseMaster) {
		this.purchaseMaster = purchaseMaster;
	}*/
	public Double getQuantity() {
		return Quantity;
	}
	public void setQuantity(Double quantity) {
		Quantity = quantity;
	}	      
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
/*	public ProductMaster getProductMaster() {
		return productMaster;
	}
	public void setProductMaster(ProductMaster productMaster) {
		this.productMaster = productMaster;
	}*/
	public String getShelfNo() {
		return shelfNo;
	}
	public void setShelfNo(String shelfNo) {
		this.shelfNo = shelfNo;
	}
	public String getNaration() {
		return Naration;
	}
	public void setNaration(String naration) {
		Naration = naration;
	}
	
	public int getBatchId() {
		return batchId;
	}
	public void setBatchId(int batchId) {
		this.batchId = batchId;
	}
	
}
