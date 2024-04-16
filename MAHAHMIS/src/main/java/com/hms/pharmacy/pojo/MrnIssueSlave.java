package com.hms.pharmacy.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "pharma_mrn_issue_slave")
public class MrnIssueSlave {
	
	@Id
	@GeneratedValue
	@Column(name = "mrn_issue_slave_id")
	private Integer mrnIssueSlaveId;

	@ManyToOne
	@JoinColumn(name = "mrn_issue_slave_product_id")
	private ProductMaster productMaster;

	@Column(name = "mrn_issue_slave_qty")
	private Integer mrnIssueSlaveQty;

	@Column(name = "mrn_issue_slave_total_issue_qty")
	private Integer mrnIssueSlaveTotalIssueQty;
	
	@Column(name = "mrn_issue_slave_pending_qty")
	private Integer mrnIssueSlavePendingQty;
	
	@Column(name = "mrn_issue_slave_rate")
	private Double mrnIssueSlaveRate;
	
	@Column(name = "mrn_issue_slave_batch_code")
	private String mrnIssueSlaveBatchCode;
	
	@Column(name = "mrn_issue_slave_amt")
	private Double mrnIssueSlaveAmt;
	
	@Column(name = "mrn_issue_slave_batch_expiry")
	private String mrnIssueSlaveBatchExpiry;
	
	@Column(name = "mrn_issue_slave_mrp")
	private Double mrnIssueSlaveMrp;
	
	@Column(name = "mrn_issue_slave_batchId")
	private Integer mrnIssueSlaveBatchId;
	
	@Column(name = "mrn_issue_slave_mrn_slave_id")
	private Integer mrnIssueSlaveMrnSlaveId;
	
	@Column(name = "mrn_issue_slave_vat")
	private Double mrnIssueSlaveVat=0.0;;
	
	@Column(name = "mrn_issue_receive_status")
	private Integer storeMrnReceiveStatus=0;
	

	public Integer getStoreMrnReceiveStatus() {
		return storeMrnReceiveStatus;
	}

	public void setStoreMrnReceiveStatus(Integer storeMrnReceiveStatus) {
		this.storeMrnReceiveStatus = storeMrnReceiveStatus;
	}

	public Integer getMrnIssueSlaveMrnSlaveId() {
		return mrnIssueSlaveMrnSlaveId;
	}

	public void setMrnIssueSlaveMrnSlaveId(Integer mrnIssueSlaveMrnSlaveId) {
		this.mrnIssueSlaveMrnSlaveId = mrnIssueSlaveMrnSlaveId;
	}
	
	public Integer getMrnIssueSlaveId() {
		return mrnIssueSlaveId;
	}

	public void setMrnIssueSlaveId(Integer mrnIssueSlaveId) {
		this.mrnIssueSlaveId = mrnIssueSlaveId;
	}

	public ProductMaster getProductMaster() {
		return productMaster;
	}

	public void setProductMaster(ProductMaster productMaster) {
		this.productMaster = productMaster;
	}

	public Integer getMrnIssueSlaveQty() {
		return mrnIssueSlaveQty;
	}

	public void setMrnIssueSlaveQty(Integer mrnIssueSlaveQty) {
		this.mrnIssueSlaveQty = mrnIssueSlaveQty;
	}

	public Double getMrnIssueSlaveRate() {
		return mrnIssueSlaveRate;
	}

	public void setMrnIssueSlaveRate(Double mrnIssueSlaveRate) {
		this.mrnIssueSlaveRate = mrnIssueSlaveRate;
	}

	public String getMrnIssueSlaveBatchCode() {
		return mrnIssueSlaveBatchCode;
	}

	public void setMrnIssueSlaveBatchCode(String mrnIssueSlaveBatchCode) {
		this.mrnIssueSlaveBatchCode = mrnIssueSlaveBatchCode;
	}

	public Double getMrnIssueSlaveAmt() {
		return mrnIssueSlaveAmt;
	}

	public void setMrnIssueSlaveAmt(Double mrnIssueSlaveAmt) {
		this.mrnIssueSlaveAmt = mrnIssueSlaveAmt;
	}

	public String getMrnIssueSlaveBatchExpiry() {
		return mrnIssueSlaveBatchExpiry;
	}

	public void setMrnIssueSlaveBatchExpiry(String mrnIssueSlaveBatchExpiry) {
		this.mrnIssueSlaveBatchExpiry = mrnIssueSlaveBatchExpiry;
	}

	public Double getMrnIssueSlaveMrp() {
		return mrnIssueSlaveMrp;
	}

	public void setMrnIssueSlaveMrp(Double mrnIssueSlaveMrp) {
		this.mrnIssueSlaveMrp = mrnIssueSlaveMrp;
	}

	public Integer getMrnIssueSlaveBatchId() {
		return mrnIssueSlaveBatchId;
	}

	public void setMrnIssueSlaveBatchId(Integer mrnIssueSlaveBatchId) {
		this.mrnIssueSlaveBatchId = mrnIssueSlaveBatchId;
	}

	public Integer getMrnIssueSlaveTotalIssueQty() {
		return mrnIssueSlaveTotalIssueQty;
	}

	public void setMrnIssueSlaveTotalIssueQty(Integer mrnIssueSlaveTotalIssueQty) {
		this.mrnIssueSlaveTotalIssueQty = mrnIssueSlaveTotalIssueQty;
	}

	public Integer getMrnIssueSlavePendingQty() {
		return mrnIssueSlavePendingQty;
	}

	public void setMrnIssueSlavePendingQty(Integer mrnIssueSlavePendingQty) {
		this.mrnIssueSlavePendingQty = mrnIssueSlavePendingQty;
	}

	public Double getMrnIssueSlaveVat() {
		return mrnIssueSlaveVat;
	}

	public void setMrnIssueSlaveVat(Double mrnIssueSlaveVat) {
		this.mrnIssueSlaveVat = mrnIssueSlaveVat;
	}
}
