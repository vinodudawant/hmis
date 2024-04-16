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
@Table(name = "ehat_canteen_slave")
public class CanteenSaleSlave implements Serializable{

	@Transient
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name="slave_id")
	private int canteenslaveId;
	
	/*@ManyToOne
	@JoinColumn(name = "canteen_slave_master_id")
	private CanteenMaster canteenSlaveMasterId;
	*/
	

	/*public CanteenMaster getCanteenSlaveMasterId() {
		return canteenSlaveMasterId;
	}

	public void setCanteenSlaveMasterId(CanteenMaster canteenSlaveMasterId) {
		this.canteenSlaveMasterId = canteenSlaveMasterId;
	}*/

	@Column(name = "rate")
	private double rate=0.0;
	
	@Column(name = "quantity",columnDefinition="int default 0")
	private int quantity;
	
	@Column(name = "amountslave")
	private double amountslave=0.0;
	
	@Column(name = "subserviceid",columnDefinition="int default 0")
	private int subserviceid;
	
	@Column(name = "serviceid",columnDefinition="int default 0")
	private int serviceid;
	
	@Column(name = "subserviceName",columnDefinition="varchar(255) default '-'")
	private String subserviceName;
	
	@Column(name = "deletedslave",columnDefinition="varchar(2) default 'N'")
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
	
	@Column(name = "billdetailsid",columnDefinition="int default 0")
	private int billdetailsid;
	
	public int getBilldetailsid() {
		return billdetailsid;
	}

	public void setBilldetailsid(int billdetailsid) {
		this.billdetailsid = billdetailsid;
	}
	
	
	
	public int getCanteenslaveId() {
		return canteenslaveId;
	}

	public void setCanteenslaveId(int canteenslaveId) {
		this.canteenslaveId = canteenslaveId;
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

	public int getSubserviceid() {
		return subserviceid;
	}

	public void setSubserviceid(int subserviceid) {
		this.subserviceid = subserviceid;
	}

	public int getServiceid() {
		return serviceid;
	}

	public void setServiceid(int serviceid) {
		this.serviceid = serviceid;
	}

	public String getSubserviceName() {
		return subserviceName;
	}

	public void setSubserviceName(String subserviceName) {
		this.subserviceName = subserviceName;
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
