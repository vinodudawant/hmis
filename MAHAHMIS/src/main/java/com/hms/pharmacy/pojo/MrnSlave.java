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
@Table(name = "pharma_store_mrn_slave")
public class MrnSlave implements Serializable {
	@Id
	@GeneratedValue
	@Column(name = "mrn_slave_id")
	private Integer mrnSlaveId=null;

	@Column(name = "mrn_slave_sr")
	private Integer mrnSlaveSr=null;

	@ManyToOne
	@JoinColumn(name = "mrn_slave_product_id")
	private ProductMaster productMaster=null;

	@Column(name = "mrn_slave_qty")
	private Integer mrnSlaveQty=null;
	
	@Column(name = "mrn_slave_pending_qty")
	private Integer mrnSlavePendingQty=0;
	
	@Column(name = "mrn_slave_status")
	private String mrnSlaveStatus=null;
	
	@Column(name = "store_receive_qty")
	private Integer storeReceiveQty=0;
	
	public Integer getStoreReceiveQty() {
		return storeReceiveQty;
	}

	public void setStoreReceiveQty(Integer storeReceiveQty) {
		this.storeReceiveQty = storeReceiveQty;
	}

	public Integer getMrnSlaveId() {
		return mrnSlaveId;
	}

	public void setMrnSlaveId(Integer mrnSlaveId) {
		this.mrnSlaveId = mrnSlaveId;
	}

	public Integer getMrnSlaveSr() {
		return mrnSlaveSr;
	}

	public void setMrnSlaveSr(Integer mrnSlaveSr) {
		this.mrnSlaveSr = mrnSlaveSr;
	}

	public ProductMaster getProductMaster() {
		return productMaster;
	}

	public void setProductMaster(ProductMaster productMaster) {
		this.productMaster = productMaster;
	}

	public Integer getMrnSlaveQty() {
		return mrnSlaveQty;
	}

	public void setMrnSlaveQty(Integer mrnSlaveQty) {
		this.mrnSlaveQty = mrnSlaveQty;
	}

	public Integer getMrnSlavePendingQty() {
		return mrnSlavePendingQty;
	}

	public void setMrnSlavePendingQty(Integer mrnSlavePendingQty) {
		this.mrnSlavePendingQty = mrnSlavePendingQty;
	}

	/*@Column(name = "po_slave_mrp")
	private Double poSlaveMrp;

	@Column(name = "po_slave_rate")
	private Double poSlaveRate;

	@Column(name = "po_slave_amt")
	private Double poSlaveAmt;

	@Column(name = "po_slave_scheme")
	private Double poSlaveScheme;
	
	@Column(name = "po_slave_Vat")
	private Double poSlaveVat;*/
	
	
	@Override
	public boolean equals(Object obj) {
		MrnSlave mrnSlave=(MrnSlave)obj;
		if(mrnSlave.getMrnSlaveId().equals(mrnSlaveId))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	@Override
	public int hashCode() {
		return mrnSlaveId;
	}

	public String getMrnSlaveStatus() {
		return mrnSlaveStatus;
	}

	public void setMrnSlaveStatus(String mrnSlaveStatus) {
		this.mrnSlaveStatus = mrnSlaveStatus;
	}
}
