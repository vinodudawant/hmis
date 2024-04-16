package com.hms.pharmacy.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;

@Entity
@Table(name = "pharma_fifth_counter_sale_slave")
public class FifthCounterSaleSlave {
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

	/*@ManyToOne
	@JoinColumn(name = "counter_slave_master_id")
	private CounterSaleMaster counterSaleMaster;*/
	
	@Column(name = "counter_slave_BatchId")
	private Integer counterSlaveBatchId;

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
}
