package com.hms.pharmacy.pojo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.codehaus.jackson.annotate.JsonIgnore;

@Entity
@Table(name="pharma_cheque_paid_slave")
public class ChequePaidSlave  implements Serializable
{
	@Id
	@GeneratedValue
	@Column(name="cheque_paid_slave_id")
	private Integer chequePaidSlaveId;
	
	@Column(name="cheque_paid_sr")
	private Integer chequePaidSr;
	
	
	@ManyToOne
	@JoinColumn(name = "cheque_paid_master_id")
	private ChequePaidMaster chequePaidMaster;
    
	@JsonIgnore
	public ChequePaidMaster getChequePaidMaster() {
		return chequePaidMaster;
	}

	public void setChequePaidMaster(ChequePaidMaster chequePaidMaster) {
		this.chequePaidMaster = chequePaidMaster;
	}

	@ManyToOne
	@JoinColumn(name = "cheque_paid_pur_id")
	private PurchaseMaster purchaseMaster;

	@Column(name="cheque_paid_amt")
	private Double chequePaidAmt;
	
	@Column(name="cheque_paid_disc")
	private Double chequePaidDisc;

	public Integer getChequePaidSlaveId() {
		return chequePaidSlaveId;
	}

	public void setChequePaidSlaveId(Integer chequePaidSlaveId) {
		this.chequePaidSlaveId = chequePaidSlaveId;
	}

	public Integer getChequePaidSr() {
		return chequePaidSr;
	}

	public void setChequePaidSr(Integer chequePaidSr) {
		this.chequePaidSr = chequePaidSr;
	}

	public Double getChequePaidAmt() {
		return chequePaidAmt;
	}

	public void setChequePaidAmt(Double chequePaidAmt) {
		this.chequePaidAmt = chequePaidAmt;
	}

	public Double getChequePaidDisc() {
		return chequePaidDisc;
	}

	public void setChequePaidDisc(Double chequePaidDisc) {
		this.chequePaidDisc = chequePaidDisc;
	}

	public PurchaseMaster getPurchaseMaster() {
		return purchaseMaster;
	}

	public void setPurchaseMaster(PurchaseMaster purchaseMaster) {
		this.purchaseMaster = purchaseMaster;
	}
	
}
