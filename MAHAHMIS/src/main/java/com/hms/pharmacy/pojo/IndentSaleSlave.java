package com.hms.pharmacy.pojo;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "pharma_indent_sale_slave")
public class IndentSaleSlave {
	@Id
	@GeneratedValue
	@Column(name = "indent_sale_slave_id")
	private Integer indentSaleSlaveId;

	@ManyToOne
	@JoinColumn(name = "indent_sale_slave_product_id")
	private ProductMaster productMaster;

	@Column(name = "indent_sale_slave_qty")
	private Integer indentSaleSlaveQty;

	@Column(name = "indent_sale_slave_rate")
	private Double indentSaleSlaveRate;
	
	@Column(name = "indent_sale_slave_batch_code")
	private String indentSaleSlaveBatchCode;
	
	@Column(name = "indent_sale_slave_amt")
	private Double indentSaleSlaveAmt;
	
	@Column(name = "indent_sale_slave_batch_expiry")
	private String indentSaleSlaveBatchExpiry;
	
	@Column(name = "indent_sale_slave_mrp")
	private Double indentSaleSlaveMrp;
	
	@Column(name = "indent_sale_slave_BatchId")
	private Integer indentSaleSlaveBatchId;

	@Column(name = "indent_slave_vat")
	private Double indentSlaveVat;
	
	@Column(name = "indent_slave_vat_id", columnDefinition="int default 0")
	private int indentSlaveVatId;
	
	@Column(name = "indent_slave_unit" , columnDefinition="int default 0")
	private int indentlaveunit;
	
	@Column(name = "indent_slave_Dis")
	private Double indentSlaveDis;
	
	@Column(name = "indent_slave_Dis_Amt")
	private Double indentSlaveDisAmt;
	
	@Column(name = "indent_slave_ratePerUnit")
	private Double indentSlaveRatePerUnit;
	
	@Column(name = "indent_slave_vatAmt")
	private Double indentSlaveVatAmt;
	
	@Column(name = "indent_sale_slave_issue_qty")
	private Integer indentSaleSlaveIssueQty;
	
	@Column(name = "indent_sale_slave_rec_amt")
	private Double indentSaleSlaveRecAmt;
	
	@Column(name = "indent_sale_slave_rem_amt")
	private Double indentSaleSlaveRemAmt;
	
	@Column(name = "rem_amt_after_billing_disc")
	private Double remAmtAfterBillingDisc;
	
	@Column(name="amt_receive_flag")
	private String amtReceiveFlag;
	
	
		
	public String getAmtReceiveFlag() {
		return amtReceiveFlag;
	}

	public void setAmtReceiveFlag(String amtReceiveFlag) {
		this.amtReceiveFlag = amtReceiveFlag;
	}

	public Double getRemAmtAfterBillingDisc() {
		return remAmtAfterBillingDisc;
	}

	public void setRemAmtAfterBillingDisc(Double remAmtAfterBillingDisc) {
		this.remAmtAfterBillingDisc = remAmtAfterBillingDisc;
	}

	public Double getIndentSaleSlaveRemAmt() {
		return indentSaleSlaveRemAmt;
	}

	public void setIndentSaleSlaveRemAmt(Double indentSaleSlaveRemAmt) {
		this.indentSaleSlaveRemAmt = indentSaleSlaveRemAmt;
	}

	public Double getIndentSaleSlaveRecAmt() {
		return indentSaleSlaveRecAmt;
	}

	public void setIndentSaleSlaveRecAmt(Double indentSaleSlaveRecAmt) {
		this.indentSaleSlaveRecAmt = indentSaleSlaveRecAmt;
	}

	public Integer getIndentSaleSlaveIssueQty() {
		return indentSaleSlaveIssueQty;
	}

	public void setIndentSaleSlaveIssueQty(Integer indentSaleSlaveIssueQty) {
		this.indentSaleSlaveIssueQty = indentSaleSlaveIssueQty;
	}

	public Double getIndentSlaveVatAmt() {
		return indentSlaveVatAmt;
	}

	public void setIndentSlaveVatAmt(Double indentSlaveVatAmt) {
		this.indentSlaveVatAmt = indentSlaveVatAmt;
	}

	public Double getIndentSlaveRatePerUnit() {
		return indentSlaveRatePerUnit;
	}

	public void setIndentSlaveRatePerUnit(Double indentSlaveRatePerUnit) {
		this.indentSlaveRatePerUnit = indentSlaveRatePerUnit;
	}

	public Double getIndentSlaveDis() {
		return indentSlaveDis;
	}

	public void setIndentSlaveDis(Double indentSlaveDis) {
		this.indentSlaveDis = indentSlaveDis;
	}

	public Double getIndentSlaveVat() {
		return indentSlaveVat;
	}

	public void setIndentSlaveVat(Double indentSlaveVat) {
		this.indentSlaveVat = indentSlaveVat;
	}

	public Integer getIndentSaleSlaveId() {
		return indentSaleSlaveId;
	}

	public void setIndentSaleSlaveId(Integer indentSaleSlaveId) {
		this.indentSaleSlaveId = indentSaleSlaveId;
	}

	public ProductMaster getProductMaster() {
		return productMaster;
	}

	public void setProductMaster(ProductMaster productMaster) {
		this.productMaster = productMaster;
	}

	public Integer getIndentSaleSlaveQty() {
		return indentSaleSlaveQty;
	}

	public void setIndentSaleSlaveQty(Integer indentSaleSlaveQty) {
		this.indentSaleSlaveQty = indentSaleSlaveQty;
	}

	public Double getIndentSaleSlaveRate() {
		return indentSaleSlaveRate;
	}

	public void setIndentSaleSlaveRate(Double indentSaleSlaveRate) {
		this.indentSaleSlaveRate = indentSaleSlaveRate;
	}

	public String getIndentSaleSlaveBatchCode() {
		return indentSaleSlaveBatchCode;
	}

	public void setIndentSaleSlaveBatchCode(String indentSaleSlaveBatchCode) {
		this.indentSaleSlaveBatchCode = indentSaleSlaveBatchCode;
	}

	public Double getIndentSaleSlaveAmt() {
		return indentSaleSlaveAmt;
	}

	public void setIndentSaleSlaveAmt(Double indentSaleSlaveAmt) {
		this.indentSaleSlaveAmt = indentSaleSlaveAmt;
	}

	public String getIndentSaleSlaveBatchExpiry() {
		return indentSaleSlaveBatchExpiry;
	}

	public void setIndentSaleSlaveBatchExpiry(String indentSaleSlaveBatchExpiry) {
		this.indentSaleSlaveBatchExpiry = indentSaleSlaveBatchExpiry;
	}

	public Double getIndentSaleSlaveMrp() {
		return indentSaleSlaveMrp;
	}

	public void setIndentSaleSlaveMrp(Double indentSaleSlaveMrp) {
		this.indentSaleSlaveMrp = indentSaleSlaveMrp;
	}

	public Integer getIndentSaleSlaveBatchId() {
		return indentSaleSlaveBatchId;
	}

	public void setIndentSaleSlaveBatchId(Integer indentSaleSlaveBatchId) {
		this.indentSaleSlaveBatchId = indentSaleSlaveBatchId;
	}
	
	public Double getIndentSlaveDisAmt() {
		return indentSlaveDisAmt;
	}

	public void setIndentSlaveDisAmt(Double indentSlaveDisAmt) {
		this.indentSlaveDisAmt = indentSlaveDisAmt;
	}

	public int getIndentSlaveVatId() {
		return indentSlaveVatId;
	}

	public void setIndentSlaveVatId(int indentSlaveVatId) {
		this.indentSlaveVatId = indentSlaveVatId;
	}

	public int getIndentlaveunit() {
		return indentlaveunit;
	}

	public void setIndentlaveunit(int indentlaveunit) {
		this.indentlaveunit = indentlaveunit;
	}
	
	
}
