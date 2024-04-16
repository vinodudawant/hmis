package com.hms.pharmacy.pojo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "pharma_purchase_rate")
public class PurchaseRateHistory 
{
	@Id
	@GeneratedValue
	@Column(name = "pur_rate_id")
	private int purRateId;
	
	@Column(name = "pur_slave_id")
	private int purSlaveId;
	
	@Column(name = "batch_id")
	private int batchId;
	
	@Column(name = "pur_rate")
	private Double purRate;
	
	@Column(name = "mrp")
	private Double mrp;
	
	@Column(name = "rate")
	private Double rate;
	
	@Column(name = "bill_rate")
	private Double billRate;
	
	@Column(name = "update_date")
	private Date updateDate;
	
	@Column(name = " unit_id" ,columnDefinition="int default 1")
	private int unitId;
	
	@Transient
	private Integer purCorBatchId;
	
	@Transient
	private Double purCorMrp;
	
	@Transient
	private Double purBillRate;
	
	@Transient
	private String batchCode;
	
	public String getBatchCode() {
		return batchCode;
	}
	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
	}
	
	@Transient
	private Integer product_delete_flag;
	public Integer getProduct_delete_flag() {
		return product_delete_flag;
	}
	public void setProduct_delete_flag(Integer product_delete_flag) {
		this.product_delete_flag = product_delete_flag;
	}

	@Transient
	private String oldBatchCode;
	
	@Transient
	private String productName;
	
	@Transient
	private Integer productId;
	
	@Transient
	private String compName;
	
	@Transient
	private String packType;
	
	@Transient
	private String shelfName;
	
	@Transient
	private String batchExpDate;
		
	public String getBatchExpDate() {
		return batchExpDate;
	}
	public void setBatchExpDate(String batchExpDate) {
		this.batchExpDate = batchExpDate;
	}
	@Transient
	private Integer purCorId;
	
	public Integer getPurCorId() {
		return purCorId;
	}
	public void setPurCorId(Integer purCorId) {
		this.purCorId = purCorId;
	}
	public Double getOldRate() {
		return oldRate;
	}
	public void setOldRate(Double oldRate) {
		this.oldRate = oldRate;
	}
	public Double getOldPurRate() {
		return oldPurRate;
	}
	public void setOldPurRate(Double oldPurRate) {
		this.oldPurRate = oldPurRate;
	}
	public Date getPurCorDate() {
		return purCorDate;
	}
	public void setPurCorDate(Date purCorDate) {
		this.purCorDate = purCorDate;
	}
	@Transient
	private Double oldRate;
	
	@Transient
	private Double oldPurRate;
	
	@Transient
	private Date purCorDate;
		
	public Integer getPurCorBatchId() {
		return purCorBatchId;
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
	public Double getPurBillRate() {
		return purBillRate;
	}
	public void setPurBillRate(Double purBillRate) {
		this.purBillRate = purBillRate;
	}

	public String getOldBatchCode() {
		return oldBatchCode;
	}
	public void setOldBatchCode(String oldBatchCode) {
		this.oldBatchCode = oldBatchCode;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Integer getProductId() {
		return productId;
	}
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	public String getCompName() {
		return compName;
	}
	public void setCompName(String compName) {
		this.compName = compName;
	}
	public String getPackType() {
		return packType;
	}
	public void setPackType(String packType) {
		this.packType = packType;
	}
	public String getShelfName() {
		return shelfName;
	}
	public void setShelfName(String shelfName) {
		this.shelfName = shelfName;
	}
	public int getPurRateId() {
		return purRateId;
	}
	public void setPurRateId(int purRateId) {
		this.purRateId = purRateId;
	}
	public int getPurSlaveId() {
		return purSlaveId;
	}
	public void setPurSlaveId(int purSlaveId) {
		this.purSlaveId = purSlaveId;
	}
	public int getBatchId() {
		return batchId;
	}
	public void setBatchId(int batchId) {
		this.batchId = batchId;
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
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	public Double getBillRate() {
		return billRate;
	}
	public void setBillRate(Double billRate) {
		this.billRate = billRate;
	}
	public int getUnitId() {
		return unitId;
	}
	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}
	
	
}
