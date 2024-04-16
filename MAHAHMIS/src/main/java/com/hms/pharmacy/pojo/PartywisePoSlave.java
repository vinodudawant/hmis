package com.hms.pharmacy.pojo;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "pharma_partywise_po_slave")
public class PartywisePoSlave implements Serializable {
	@Id
	@GeneratedValue
	@Column(name = "po_slave_id")
	private Integer poSlaveId;

	@Column(name = "po_slave_sr")
	private Integer poSlaveSr;

	@ManyToOne
	@JoinColumn(name = "po_slave_product_id")
	private ProductMaster productMaster;

	@Column(name = "po_slave_qty")
	private Integer poSlaveQty;
	
	@Column(name = "po_slave_amt")
	private Double poSlaveAmt;
	
	@Column(name = "po_slave_mrp")
	private Double poSlaveMrp;
	
	@Column(name = "po_slave_scheme")
	private Double poSlaveScheme;
	
	@Column(name = "po_slave_rate")
	private Double poSlaveRate;
	
	@Column(name = "partywise_po_pur_id")
	private Integer partywisePoPurId=0;
	
	public Integer getPartywisePoPurId() {
		return partywisePoPurId;
	}

	public void setPartywisePoPurId(Integer partywisePoPurId) {
		this.partywisePoPurId = partywisePoPurId;
	}

	@Column(name = "po_stock_qty")
	private Integer totalstockQty;
	
	public Integer getTotalstockQty() {
		return totalstockQty;
	}

	public void setTotalstockQty(Integer totalstockQty) {
		this.totalstockQty = totalstockQty;
	}
	

	public Integer getPoSlaveId() {
		return poSlaveId;
	}

	public void setPoSlaveId(Integer poSlaveId) {
		this.poSlaveId = poSlaveId;
	}

	public Integer getPoSlaveSr() {
		return poSlaveSr;
	}

	public void setPoSlaveSr(Integer poSlaveSr) {
		this.poSlaveSr = poSlaveSr;
	}

	public Integer getPoSlaveQty() {
		return poSlaveQty;
	}

	public void setPoSlaveQty(Integer poSlaveQty) {
		this.poSlaveQty = poSlaveQty;
	}

	public ProductMaster getProductMaster() {
		return productMaster;
	}

	public void setProductMaster(ProductMaster productMaster) {
		this.productMaster = productMaster;
	}

	public Double getPoSlaveAmt() {
		return poSlaveAmt;
	}

	public void setPoSlaveAmt(Double poSlaveAmt) {
		this.poSlaveAmt = poSlaveAmt;
	}

	public Double getPoSlaveMrp() {
		return poSlaveMrp;
	}

	public void setPoSlaveMrp(Double poSlaveMrp) {
		this.poSlaveMrp = poSlaveMrp;
	}

	public Double getPoSlaveScheme() {
		return poSlaveScheme;
	}

	public void setPoSlaveScheme(Double poSlaveScheme) {
		this.poSlaveScheme = poSlaveScheme;
	}

	public Double getPoSlaveRate() {
		return poSlaveRate;
	}

	public void setPoSlaveRate(Double poSlaveRate) {
		this.poSlaveRate = poSlaveRate;
	}

	
}
