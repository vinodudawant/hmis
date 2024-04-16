package com.hms.canteen.dto;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
@Table(name = "ehat_canteen_purchase_slave")
public class CanteenPurSlaveDto implements Serializable{

	@Transient
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name="slave_id")
	private int purslaveId;
	
	@Column(name = "rate")
	private double rate=0.0;
	
	@Column(name = "quantity",columnDefinition="int default 0")
	private int quantity;
	
	@Column(name = "amountslave")
	private double amountslave=0.0;
	
	@Column(name = "itemid",columnDefinition="int default 0")
	private int itemid;
	
	@Column(name = "item_name")
	private String itemName;
	
	@Column(name = "uom")
	private String uom;
	
	@Column(name = "deletedslave",columnDefinition="varchar(5) default 'N'")
	private String deletedslave;

	@Column(name = "created_byslave",updatable=false)
	private Integer createdByslave;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_timeslave",updatable=false)
	private Date createdDateTimeslave;

	@Column(name = "updated_byslave")
	private Integer updatedByslave;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_timeslave")
	private Date updatedDateTimeslave;

	@Column(name = "deleted_byslave")
	private Integer deletedByslave;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_timeslave")
	private Date deletedDateTimeslave;

	@Column(name = "gstamtSlave")
	private double gstamtSlave=0.0;
	
	@Column(name = "groseamountslave")
	private double groseamountslave=0.0;

	public int getPurslaveId() {
		return purslaveId;
	}

	public void setPurslaveId(int purslaveId) {
		this.purslaveId = purslaveId;
	}

	public double getRate() {
		return rate;
	}

	public void setRate(double rate) {
		this.rate = rate;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getAmountslave() {
		return amountslave;
	}

	public void setAmountslave(double amountslave) {
		this.amountslave = amountslave;
	}

	public int getItemid() {
		return itemid;
	}

	public void setItemid(int itemid) {
		this.itemid = itemid;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getUom() {
		return uom;
	}

	public void setUom(String uom) {
		this.uom = uom;
	}

	public String getDeletedslave() {
		return deletedslave;
	}

	public void setDeletedslave(String deletedslave) {
		this.deletedslave = deletedslave;
	}

	public Integer getCreatedByslave() {
		return createdByslave;
	}

	public void setCreatedByslave(Integer createdByslave) {
		this.createdByslave = createdByslave;
	}

	public Date getCreatedDateTimeslave() {
		return createdDateTimeslave;
	}

	public void setCreatedDateTimeslave(Date createdDateTimeslave) {
		this.createdDateTimeslave = createdDateTimeslave;
	}

	public Integer getUpdatedByslave() {
		return updatedByslave;
	}

	public void setUpdatedByslave(Integer updatedByslave) {
		this.updatedByslave = updatedByslave;
	}

	public Date getUpdatedDateTimeslave() {
		return updatedDateTimeslave;
	}

	public void setUpdatedDateTimeslave(Date updatedDateTimeslave) {
		this.updatedDateTimeslave = updatedDateTimeslave;
	}

	public Integer getDeletedByslave() {
		return deletedByslave;
	}

	public void setDeletedByslave(Integer deletedByslave) {
		this.deletedByslave = deletedByslave;
	}

	public Date getDeletedDateTimeslave() {
		return deletedDateTimeslave;
	}

	public void setDeletedDateTimeslave(Date deletedDateTimeslave) {
		this.deletedDateTimeslave = deletedDateTimeslave;
	}

	public double getGstamtSlave() {
		return gstamtSlave;
	}

	public void setGstamtSlave(double gstamtSlave) {
		this.gstamtSlave = gstamtSlave;
	}

	public double getGroseamountslave() {
		return groseamountslave;
	}

	public void setGroseamountslave(double groseamountslave) {
		this.groseamountslave = groseamountslave;
	}
	
	
}
