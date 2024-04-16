package com.hms.pharmacy.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="pharma_indent_slave")
public class IndentSlave {

	@Id
	@GeneratedValue
	@Column(name="indent_slave_id")
	private Integer indentSlaveId;
	
	@Column(name = "indent_product_id")
	private Integer indentProductId;
	
	@Column(name = "indent_order_comp_id")
	private Integer indentOrderCompId;
	
	@Column(name = "indent_slave_require_qty",nullable = false, columnDefinition = "int default 0")
	private Integer indentSlaveRequireQty;
	
	@Column(name = "indent_slave_pending_qty", columnDefinition = "int default 0")
	private Integer indentSlavePendingQty;
	
	@Column(name = "indent_product_batch_id", columnDefinition = "int default 0")
	private Integer indentProductBatchId;

	public Integer getIndentSlaveId() {
		return indentSlaveId;
	}

	public void setIndentSlaveId(Integer indentSlaveId) {
		this.indentSlaveId = indentSlaveId;
	}
	

	public Integer getIndentProductId() {
		return indentProductId;
	}

	public Integer getIndentSlaveRequireQty() {
		return indentSlaveRequireQty;
	}

	public void setIndentSlaveRequireQty(Integer indentSlaveRequireQty) {
		this.indentSlaveRequireQty = indentSlaveRequireQty;
	}

	public void setIndentProductId(Integer indentProductId) {
		this.indentProductId = indentProductId;
	}

	public Integer getIndentSlavePendingQty() {
		return indentSlavePendingQty;
	}

	public void setIndentSlavePendingQty(Integer indentSlavePendingQty) {
		this.indentSlavePendingQty = indentSlavePendingQty;
	}

	public Integer getIndentOrderCompId() {
		return indentOrderCompId;
	}

	public void setIndentOrderCompId(Integer indentOrderCompId) {
		this.indentOrderCompId = indentOrderCompId;
	}

	public Integer getIndentProductBatchId() {
		return indentProductBatchId;
	}

	public void setIndentProductBatchId(Integer indentProductBatchId) {
		this.indentProductBatchId = indentProductBatchId;
	}

	@Override
	public String toString() {
		return "IndentSlave [indentSlaveId=" + indentSlaveId + ", indentProductId=" + indentProductId
				+ ", indentOrderCompId=" + indentOrderCompId + ", indentSlaveRequireQty=" + indentSlaveRequireQty
				+ ", indentSlavePendingQty=" + indentSlavePendingQty + ", indentProductBatchId=" + indentProductBatchId
				+ "]";
	}
	
	
}
