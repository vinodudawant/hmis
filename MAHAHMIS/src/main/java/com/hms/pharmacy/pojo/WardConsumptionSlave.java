package com.hms.pharmacy.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "pharma_ward_consumption_slave")
public class WardConsumptionSlave {
	
	@Id
	@GeneratedValue
	@Column(name = "ward_slave_id")
	private Integer wardSlaveId;

	@ManyToOne
	@JoinColumn(name = "ward_slave_product_id")
	private ProductMaster productMaster;

	@Column(name = "ward_slave_batch_code")
	private String wardSaleBatchCode;
	
	@Column(name = "ward_slave_batch_expiry")
	private String wardBatchExpiry;

	@Column(name = "ward_slave_mrp")
	private Double wardSlaveMrp=0.0;

	@Column(name = "ward_slave_rate")
	private Double wardSlaveRate=0.0;

	@Column(name = "ward_slave_qty")
	private Integer wardSlaveQty=0;

	@Column(name = "ward_slave_amt")
	private Double wardSlaveAmt=0.0;
	
	@Column(name = "ward_slave_rateForPrint")
	private Double wardSlaveRateForPrint=0.0;
	
	@Column(name = "ward_slave_BatchId")
	private Integer wardSlaveBatchId=0;
	
	@Column(name="Biling_Type")	
    private String billingType;
	
	@Column(name = "ward_slave_disc")
	private Double wardSlaveDisc;
	
	@Column(name = "ward_slave_disc_amt")
	private Double wardSlaveDiscAmt;
	
	@Column(name = "ward_slave_rate_per_unit")
	private Double wardSlaveRatePerUnit;
	
	
	public Double getWardSlaveRatePerUnit() {
		return wardSlaveRatePerUnit;
	}

	public void setWardSlaveRatePerUnit(Double wardSlaveRatePerUnit) {
		this.wardSlaveRatePerUnit = wardSlaveRatePerUnit;
	}

	public Double getWardSlaveDisc() {
		return wardSlaveDisc;
	}

	public void setWardSlaveDisc(Double wardSlaveDisc) {
		this.wardSlaveDisc = wardSlaveDisc;
	}

	public Double getWardSlaveDiscAmt() {
		return wardSlaveDiscAmt;
	}

	public void setWardSlaveDiscAmt(Double wardSlaveDiscAmt) {
		this.wardSlaveDiscAmt = wardSlaveDiscAmt;
	}

	public String getBillingType() {
		return billingType;
	}

	public void setBillingType(String billingType) {
		this.billingType = billingType;
	}

	public Integer getWardSlaveId() {
		return wardSlaveId;
	}

	public void setWardSlaveId(Integer wardSlaveId) {
		this.wardSlaveId = wardSlaveId;
	}

	public ProductMaster getProductMaster() {
		return productMaster;
	}

	public void setProductMaster(ProductMaster productMaster) {
		this.productMaster = productMaster;
	}

	public String getWardSaleBatchCode() {
		return wardSaleBatchCode;
	}

	public void setWardSaleBatchCode(String wardSaleBatchCode) {
		this.wardSaleBatchCode = wardSaleBatchCode;
	}

	public String getWardBatchExpiry() {
		return wardBatchExpiry;
	}

	public void setWardBatchExpiry(String wardBatchExpiry) {
		this.wardBatchExpiry = wardBatchExpiry;
	}

	public Double getWardSlaveMrp() {
		return wardSlaveMrp;
	}

	public void setWardSlaveMrp(Double wardSlaveMrp) {
		this.wardSlaveMrp = wardSlaveMrp;
	}

	public Double getWardSlaveRate() {
		return wardSlaveRate;
	}

	public void setWardSlaveRate(Double wardSlaveRate) {
		this.wardSlaveRate = wardSlaveRate;
	}

	public Integer getWardSlaveQty() {
		return wardSlaveQty;
	}

	public void setWardSlaveQty(Integer wardSlaveQty) {
		this.wardSlaveQty = wardSlaveQty;
	}

	public Double getWardSlaveAmt() {
		return wardSlaveAmt;
	}

	public void setWardSlaveAmt(Double wardSlaveAmt) {
		this.wardSlaveAmt = wardSlaveAmt;
	}

	public Double getWardSlaveRateForPrint() {
		return wardSlaveRateForPrint;
	}

	public void setWardSlaveRateForPrint(Double wardSlaveRateForPrint) {
		this.wardSlaveRateForPrint = wardSlaveRateForPrint;
	}

	public Integer getWardSlaveBatchId() {
		return wardSlaveBatchId;
	}

	public void setWardSlaveBatchId(Integer wardSlaveBatchId) {
		this.wardSlaveBatchId = wardSlaveBatchId;
	}
}
