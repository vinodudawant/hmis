package com.hms.pharmacy.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;



@Entity
@Table(name = "pharma_counter_sale_slave")
public class CounterSaleSlave {
	@Id
	@GeneratedValue
	@Column(name = "counter_slave_id")
	private Integer counterSlaveId;

	@ManyToOne
	@JoinColumn(name = "counter_slave_product_id")
	private ProductMaster productMaster;

	@Column(name = "counter_slave_No")
	private Integer counterSlaveNo;

	@Column(name = "counter_slave_batch_code")
	private String counterSaleBatchCode;
	
	@Column(name = "counter_slave_batch_expiry")
	private String counterSaleBatchExpiry;

	@Column(name = "counter_slave_mrp")
	private Double counterSlaveMrp;

	@Column(name = "counter_slave_rate")
	private Double counterSlaveRate;

	@Column(name = "counter_slave_qty")
	private Integer counterSlaveQty;

	@Column(name = "counter_slave_amt")
	private Double counterSlaveAmt;
	
	@Column(name = "counter_slave_vat")
	private Double counterSlaveVat;
	
	
	@Column(name = "counter_slave_vat_id" , columnDefinition="int default 0")
	private int counterSlaveVatid;
	
	@Column(name = "counter_slave_unit" , columnDefinition="int default 0")
	private int counterslaveunit;
	
	@Column(name = "counter_slave_vatAmt")
	private Double counterSlaveVatAmt;
	
	@Column(name = "counter_slave_rateForPrint")
	private Double counterSlaveRateForPrint;
	
	@Column(name = "counter_slave_disc")
	private Double counterSlaveDisc;
	
	@Column(name = "counter_slave_disc_amt")
	private Double counterSlaveDiscAmt;
	
	@Column(name = "counter_sale_slave_issue_qty")
	private Double counterSaleSlaveIssueQty;
	
	@Column(name = "counter_slave_BatchId")
	private Integer counterSlaveBatchId;
	
	@Column(name = "account_status_counter")
	private String accountStatusCounter;
	
	@Transient
	private Integer counter_slave_qty;
	
	@Transient
	private double counter_slave_mrp;
	
	@Transient
	private double counter_slave_amt;
	
	@Transient
	private double counter_slave_rate;
	
	@Transient
	private String counter_slave_batch_code;
	
	@Transient
	private String counter_slave_batch_expiry;
	
	@Transient
	private String product_name;
	
	@Transient
	private double counter_slave_Vat;
	
	@Transient
	private double counter_slave_vatAmt;
	
	@Transient
	private double counter_slave_rateForPrint;
	
	@Transient 
	private double counter_slave_disc;
	
	@Transient
	private String preparation_name;
	
	@Transient
	private Integer counter_slave_unit;
	
	
	
	
	
	public Integer getCounter_slave_qty() {
		return counter_slave_qty;
	}

	public void setCounter_slave_qty(Integer counter_slave_qty) {
		this.counter_slave_qty = counter_slave_qty;
	}

	public double getCounter_slave_mrp() {
		return counter_slave_mrp;
	}

	public void setCounter_slave_mrp(double counter_slave_mrp) {
		this.counter_slave_mrp = counter_slave_mrp;
	}

	public double getCounter_slave_amt() {
		return counter_slave_amt;
	}

	public void setCounter_slave_amt(double counter_slave_amt) {
		this.counter_slave_amt = counter_slave_amt;
	}

	public double getCounter_slave_rate() {
		return counter_slave_rate;
	}

	public void setCounter_slave_rate(double counter_slave_rate) {
		this.counter_slave_rate = counter_slave_rate;
	}

	public String getCounter_slave_batch_code() {
		return counter_slave_batch_code;
	}

	public void setCounter_slave_batch_code(String counter_slave_batch_code) {
		this.counter_slave_batch_code = counter_slave_batch_code;
	}

	public String getCounter_slave_batch_expiry() {
		return counter_slave_batch_expiry;
	}

	public void setCounter_slave_batch_expiry(String counter_slave_batch_expiry) {
		this.counter_slave_batch_expiry = counter_slave_batch_expiry;
	}

	public String getProduct_name() {
		return product_name;
	}

	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}

	public double getCounter_slave_Vat() {
		return counter_slave_Vat;
	}

	public void setCounter_slave_Vat(double counter_slave_Vat) {
		this.counter_slave_Vat = counter_slave_Vat;
	}

	public double getCounter_slave_vatAmt() {
		return counter_slave_vatAmt;
	}

	public void setCounter_slave_vatAmt(double counter_slave_vatAmt) {
		this.counter_slave_vatAmt = counter_slave_vatAmt;
	}

	public double getCounter_slave_rateForPrint() {
		return counter_slave_rateForPrint;
	}

	public void setCounter_slave_rateForPrint(double counter_slave_rateForPrint) {
		this.counter_slave_rateForPrint = counter_slave_rateForPrint;
	}

	public double getCounter_slave_disc() {
		return counter_slave_disc;
	}

	public void setCounter_slave_disc(double counter_slave_disc) {
		this.counter_slave_disc = counter_slave_disc;
	}

	public String getPreparation_name() {
		return preparation_name;
	}

	public void setPreparation_name(String preparation_name) {
		this.preparation_name = preparation_name;
	}

	public Integer getCounter_slave_unit() {
		return counter_slave_unit;
	}

	public void setCounter_slave_unit(Integer counter_slave_unit) {
		this.counter_slave_unit = counter_slave_unit;
	}

	public Double getCounterSaleSlaveIssueQty() {
		return counterSaleSlaveIssueQty;
	}

	public void setCounterSaleSlaveIssueQty(Double counterSaleSlaveIssueQty) {
		this.counterSaleSlaveIssueQty = counterSaleSlaveIssueQty;
	}

	public Double getCounterSlaveDiscAmt() {
		return counterSlaveDiscAmt;
	}

	public void setCounterSlaveDiscAmt(Double counterSlaveDiscAmt) {
		this.counterSlaveDiscAmt = counterSlaveDiscAmt;
	}

	public Double getCounterSlaveRateForPrint() {
		return counterSlaveRateForPrint;
	}

	public void setCounterSlaveRateForPrint(Double counterSlaveRateForPrint) {
		this.counterSlaveRateForPrint = counterSlaveRateForPrint;
	}

	public Double getCounterSlaveDisc() {
		return counterSlaveDisc;
	}

	public void setCounterSlaveDisc(Double counterSlaveDisc) {
		this.counterSlaveDisc = counterSlaveDisc;
	}


	/*@ManyToOne
	@JoinColumn(name = "counter_slave_master_id")
	private CounterSaleMaster counterSaleMaster;*/
	
	public Double getCounterSlaveVatAmt() {
		return counterSlaveVatAmt;
	}

	public void setCounterSlaveVatAmt(Double counterSlaveVatAmt) {
		this.counterSlaveVatAmt = counterSlaveVatAmt;
	}

	public Double getCounterSlaveVat() {
		return counterSlaveVat;
	}

	public void setCounterSlaveVat(Double counterSlaveVat) {
		this.counterSlaveVat = counterSlaveVat;
	}

	public String getCounterSaleBatchCode() {
		return counterSaleBatchCode;
	}

	public void setCounterSaleBatchCode(String counterSaleBatchCode) {
		this.counterSaleBatchCode = counterSaleBatchCode;
	}

	/*@JsonIgnore
	public CounterSaleMaster getCounterSaleMaster() {
		return counterSaleMaster;
	}

	public void setCounterSaleMaster(CounterSaleMaster counterSaleMaster) {
		this.counterSaleMaster = counterSaleMaster;
	}*/

	public Integer getCounterSlaveId() {
		return counterSlaveId;
	}

	public void setCounterSlaveId(Integer counterSlaveId) {
		this.counterSlaveId = counterSlaveId;
	}

	public ProductMaster getProductMaster() {
		return productMaster;
	}

	public void setProductMaster(ProductMaster productMaster) {
		this.productMaster = productMaster;
	}

	public Integer getCounterSlaveNo() {
		return counterSlaveNo;
	}

	public void setCounterSlaveNo(Integer counterSlaveNo) {
		this.counterSlaveNo = counterSlaveNo;
	}

	public Double getCounterSlaveMrp() {
		return counterSlaveMrp;
	}

	public void setCounterSlaveMrp(Double counterSlaveMrp) {
		this.counterSlaveMrp = counterSlaveMrp;
	}

	public Double getCounterSlaveRate() {
		return counterSlaveRate;
	}

	public void setCounterSlaveRate(Double counterSlaveRate) {
		this.counterSlaveRate = counterSlaveRate;
	}

	/*public Double getCounterSlaveQty() {
		return counterSlaveQty;
	}

	public void setCounterSlaveQty(Double counterSlaveQty) {
		this.counterSlaveQty = counterSlaveQty;
	}*/
	
	public Double getCounterSlaveAmt() {
		return counterSlaveAmt;
	}

	public Integer getCounterSlaveQty() {
		return counterSlaveQty;
	}

	public void setCounterSlaveQty(Integer counterSlaveQty) {
		this.counterSlaveQty = counterSlaveQty;
	}

	public void setCounterSlaveAmt(Double counterSlaveAmt) {
		this.counterSlaveAmt = counterSlaveAmt;
	}

	public String getCounterSaleBatchExpiry() {
		return counterSaleBatchExpiry;
	}

	public void setCounterSaleBatchExpiry(String counterSaleBatchExpiry) {
		this.counterSaleBatchExpiry = counterSaleBatchExpiry;
	}

	public Integer getCounterSlaveBatchId() {
		return counterSlaveBatchId;
	}

	public void setCounterSlaveBatchId(Integer counterSlaveBatchId) {
		this.counterSlaveBatchId = counterSlaveBatchId;
	}

	public int getCounterSlaveVatid() {
		return counterSlaveVatid;
	}

	public void setCounterSlaveVatid(int counterSlaveVatid) {
		this.counterSlaveVatid = counterSlaveVatid;
	}

	public int getCounterslaveunit() {
		return counterslaveunit;
	}

	public void setCounterslaveunit(int counterslaveunit) {
		this.counterslaveunit = counterslaveunit;
	}

	public String getAccountStatusCounter() {
		return accountStatusCounter;
	}

	public void setAccountStatusCounter(String accountStatusCounter) {
		this.accountStatusCounter = accountStatusCounter;
	}
	
	
}
