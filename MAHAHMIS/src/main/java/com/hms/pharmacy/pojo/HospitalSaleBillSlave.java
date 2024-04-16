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
@Table(name = "pharma_hospital_bill_slave")
public class HospitalSaleBillSlave implements Serializable {
	@Id
	@GeneratedValue
	@Column(name = "hospital_slave_id")
	private Integer hospitalSlaveId;

	@ManyToOne
	@JoinColumn(name = "hospital_slave_product_id")
	private ProductMaster productMaster;

	@Column(name = "hospital_slave_qty")
	private Integer hospitalSlaveQty;

	@Column(name = "hospital_slave_rate")
	private Double hospitalSlaveRate;
	
	@Column(name = "hospital_slave_batch_code")
	private String hospitalSlaveBatchCode;
	
	@Column(name = "hospital_slave_amt")
	private Double hospitalSlaveAmt;
	
	@Column(name = "hospital_slave_batch_expiry")
	private String hospitalSlaveBatchExpiry;
	
	@Column(name = "hospital_slave_mrp")
	private Double hospitalSlaveMrp;
	
	@Column(name = "hospital_slave_BatchId")
	private Integer hospitalSlaveBatchId;
	
	@Column(name = "hospital_slave_vat")
	private Double hospitalSlaveVat;
	
	@Column(name = "hospital_slave_disc")
	private Double hospitalSlaveDisc;
	
	public Double getHospitalSlaveDisc() {
		return hospitalSlaveDisc;
	}

	public void setHospitalSlaveDisc(Double hospitalSlaveDisc) {
		this.hospitalSlaveDisc = hospitalSlaveDisc;
	}

	public Double getHospitalSlaveVat() {
		return hospitalSlaveVat;
	}

	public void setHospitalSlaveVat(Double hospitalSlaveVat) {
		this.hospitalSlaveVat = hospitalSlaveVat;
	}


	public Double getHospitalSlaveAmt() {
		return hospitalSlaveAmt;
	}

	public void setHospitalSlaveAmt(Double hospitalSlaveAmt) {
		this.hospitalSlaveAmt = hospitalSlaveAmt;
	}

	public Integer getHospitalSlaveId() {
		return hospitalSlaveId;
	}

	public void setHospitalSlaveId(Integer hospitalSlaveId) {
		this.hospitalSlaveId = hospitalSlaveId;
	}

	public ProductMaster getProductMaster() {
		return productMaster;
	}

	public void setProductMaster(ProductMaster productMaster) {
		this.productMaster = productMaster;
	}

	public Integer getHospitalSlaveQty() {
		return hospitalSlaveQty;
	}

	public void setHospitalSlaveQty(Integer hospitalSlaveQty) {
		this.hospitalSlaveQty = hospitalSlaveQty;
	}

	public Double getHospitalSlaveRate() {
		return hospitalSlaveRate;
	}

	public void setHospitalSlaveRate(Double hospitalSlaveRate) {
		this.hospitalSlaveRate = hospitalSlaveRate;
	}

	public String getHospitalSlaveBatchCode() {
		return hospitalSlaveBatchCode;
	}

	public void setHospitalSlaveBatchCode(String hospitalSlaveBatchCode) {
		this.hospitalSlaveBatchCode = hospitalSlaveBatchCode;
	}

	public String getHospitalSlaveBatchExpiry() {
		return hospitalSlaveBatchExpiry;
	}

	public void setHospitalSlaveBatchExpiry(String hospitalSlaveBatchExpiry) {
		this.hospitalSlaveBatchExpiry = hospitalSlaveBatchExpiry;
	}

	public Double getHospitalSlaveMrp() {
		return hospitalSlaveMrp;
	}

	public void setHospitalSlaveMrp(Double hospitalSlaveMrp) {
		this.hospitalSlaveMrp = hospitalSlaveMrp;
	}

	public Integer getHospitalSlaveBatchId() {
		return hospitalSlaveBatchId;
	}

	public void setHospitalSlaveBatchId(Integer hospitalSlaveBatchId) {
		this.hospitalSlaveBatchId = hospitalSlaveBatchId;
	}
	
	
}
