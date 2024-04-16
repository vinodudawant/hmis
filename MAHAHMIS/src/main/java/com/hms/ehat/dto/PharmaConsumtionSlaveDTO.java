package com.hms.ehat.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;

import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.ProductMaster;
@Entity
@Table(name="ehat_pharma_consumtion_slave")
public class PharmaConsumtionSlaveDTO implements Serializable {
	@Id
	@GeneratedValue
	@Column(name = "patient_slave_id")
	private Integer patientSlaveId;
	
	@ManyToOne
	@JoinColumn(name = "patient_slave_bill_master_id")
	private pharmaConsumtionDTO patientSaleBillMaster;
	
	@ManyToOne
	@JoinColumn(name = "patient_slave_product_id")
	private ProductMaster productMaster;
	
	@Column(name = "patient_slave_batch_code")
	private String patientSlaveBatchCode;
	
	@Column(name = "patient_slave_qty")
	private Integer patientSlaveQty;

	@Column(name = "patient_slave_rate")
	private Double patientSlaveRate;
	
	@Column(name = "patient_slave_batch_expiry")
	private String patientSaleBatchExpiry;
	
	@Column(name = "patient_slave_mrp")
	private Double patientSlaveMrp;
	
	@Column(name = "patient_slave_vat")
	private Double patientSlaveVat;
	
	@Column(name = "patient_slave_disc")
	private Double patientSlaveDisc;
	
	@Column(name = "patient_slave_amt")
	private Double patientSlaveAmt;
	
	@Column(name = "patient_slave_BatchId")
	private Integer patientSlaveBatchId;
	
	@Column(name = "patient_slave_ratePerUnit")
	private Double patientSlaveRatePerUnit;
	
	@Column(name = "patient_slave_vatAmt")
	private Double patientSlaveVatAmt;

	@Column(name = "patient_sale_slave_issue_qty")
	private Double patientSaleSlaveIssueQty;
	
	@Column(name = "patient_sale_slave_disc_amt")
	private Double patientSaleSlaveDiscAmt;
	
	@Column(name = "patient_slave_prescription_id")
	private Integer patientSlavePrescriptionId=0;
	
	@Column(name = "patient_slave_ipdopd_id")
	private Integer patientSlaveipdopdId=0;
	
	@Column(name = "patient_slave_purchase_rate")
	private Double patientSlavePurchaseRate;
	
	@Column(name = "patient_sale_slave_rec_amt")
	private Double patientSaleSlaveRecAmt;
	
	@Column(name = "patient_sale_slave_rem_amt")
	private Double patientSaleSlaveRemAmt;
	
	@Column(name = "rem_amt_after_billing_disc")
	private Double remAmtAfterBillingDisc;
	
	
	
	public Double getPatientSaleSlaveRecAmt() {
		return patientSaleSlaveRecAmt;
	}

	public void setPatientSaleSlaveRecAmt(Double patientSaleSlaveRecAmt) {
		this.patientSaleSlaveRecAmt = patientSaleSlaveRecAmt;
	}

	public Double getPatientSaleSlaveRemAmt() {
		return patientSaleSlaveRemAmt;
	}

	public void setPatientSaleSlaveRemAmt(Double patientSaleSlaveRemAmt) {
		this.patientSaleSlaveRemAmt = patientSaleSlaveRemAmt;
	}

	public Double getRemAmtAfterBillingDisc() {
		return remAmtAfterBillingDisc;
	}

	public void setRemAmtAfterBillingDisc(Double remAmtAfterBillingDisc) {
		this.remAmtAfterBillingDisc = remAmtAfterBillingDisc;
	}
	
	public Double getPatientSlavePurchaseRate() {
		return patientSlavePurchaseRate;
	}

	public void setPatientSlavePurchaseRate(Double patientSlavePurchaseRate) {
		this.patientSlavePurchaseRate = patientSlavePurchaseRate;
	}
	
	public Integer getPatientSlaveipdopdId() {
		return patientSlaveipdopdId;
	}

	public void setPatientSlaveipdopdId(Integer patientSlaveipdopdId) {
		this.patientSlaveipdopdId = patientSlaveipdopdId;
	}

	public Integer getPatientSlavePrescriptionId() {
		return patientSlavePrescriptionId;
	}

	public void setPatientSlavePrescriptionId(Integer patientSlavePrescriptionId) {
		this.patientSlavePrescriptionId = patientSlavePrescriptionId;
	}
	
	public Double getPatientSaleSlaveIssueQty() {
		return patientSaleSlaveIssueQty;
	}

	public void setPatientSaleSlaveIssueQty(Double patientSaleSlaveIssueQty) {
		this.patientSaleSlaveIssueQty = patientSaleSlaveIssueQty;
	}

	public Double getPatientSaleSlaveDiscAmt() {
		return patientSaleSlaveDiscAmt;
	}

	public void setPatientSaleSlaveDiscAmt(Double patientSaleSlaveDiscAmt) {
		this.patientSaleSlaveDiscAmt = patientSaleSlaveDiscAmt;
	}

	public Double getPatientSlaveVatAmt() {
		return patientSlaveVatAmt;
	}

	public void setPatientSlaveVatAmt(Double patientSlaveVatAmt) {
		this.patientSlaveVatAmt = patientSlaveVatAmt;
	}


	public Double getPatientSlaveRatePerUnit() {
		return patientSlaveRatePerUnit;
	}

	public void setPatientSlaveRatePerUnit(Double patientSlaveRatePerUnit) {
		this.patientSlaveRatePerUnit = patientSlaveRatePerUnit;
	}

	public Double getPatientSlaveDisc() {
		return patientSlaveDisc;
	}

	public void setPatientSlaveDisc(Double patientSlaveDisc) {
		this.patientSlaveDisc = patientSlaveDisc;
	}

	public Double getPatientSlaveVat() {
		return patientSlaveVat;
	}

	public void setPatientSlaveVat(Double patientSlaveVat) {
		this.patientSlaveVat = patientSlaveVat;
	}


	
	@JsonIgnore
	
	public pharmaConsumtionDTO getPatientSaleBillMaster() {
		return patientSaleBillMaster;
	}

	public void setPatientSaleBillMaster(pharmaConsumtionDTO patientSaleBillMaster) {
		this.patientSaleBillMaster = patientSaleBillMaster;
	}
	public Integer getPatientSlaveId() {
		return patientSlaveId;
	}

	

	public void setPatientSlaveId(Integer patientSlaveId) {
		this.patientSlaveId = patientSlaveId;
	}

	
	public ProductMaster getProductMaster() {
		return productMaster;
	}

	public void setProductMaster(ProductMaster productMaster) {
		this.productMaster = productMaster;
	}

	public Integer getPatientSlaveQty() {
		return patientSlaveQty;
	}

	public void setPatientSlaveQty(Integer patientSlaveQty) {
		this.patientSlaveQty = patientSlaveQty;
	}

	public Double getPatientSlaveRate() {
		return patientSlaveRate;
	}

	public void setPatientSlaveRate(Double patientSlaveRate) {
		this.patientSlaveRate = patientSlaveRate;
	}
	public String getPatientSlaveBatchCode() {
		return patientSlaveBatchCode;
	}

	public void setPatientSlaveBatchCode(String patientSlaveBatchCode) {
		this.patientSlaveBatchCode = patientSlaveBatchCode;
	}

	public String getPatientSaleBatchExpiry() {
		return patientSaleBatchExpiry;
	}

	public void setPatientSaleBatchExpiry(String patientSaleBatchExpiry) {
		this.patientSaleBatchExpiry = patientSaleBatchExpiry;
	}

	public Double getPatientSlaveMrp() {
		return patientSlaveMrp;
	}

	public void setPatientSlaveMrp(Double patientSlaveMrp) {
		this.patientSlaveMrp = patientSlaveMrp;
	}

	public Double getPatientSlaveAmt() {
		return patientSlaveAmt;
	}

	public void setPatientSlaveAmt(Double patientSlaveAmt) {
		this.patientSlaveAmt = patientSlaveAmt;
	}

	public Integer getPatientSlaveBatchId() {
		return patientSlaveBatchId;
	}

	public void setPatientSlaveBatchId(Integer patientSlaveBatchId) {
		this.patientSlaveBatchId = patientSlaveBatchId;
	}


}
