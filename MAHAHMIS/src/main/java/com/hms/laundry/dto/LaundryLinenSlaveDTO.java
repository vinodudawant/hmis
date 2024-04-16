package com.hms.laundry.dto;

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
@Table(name = "laundry_slave")
public class LaundryLinenSlaveDTO implements Serializable {	
	
	@Transient
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "mrn_item_info_slave_id")
	private int mrnItemInfoSlaveId;
	
	@Column(name = "item_name")
	private String itemName;
	
	@Column(name = "item_code",columnDefinition="int default 0")
	private int itemCode;
	
	@Column(name = "send_qty",columnDefinition="int default 0")
	private int sendQty=0;
	
	@Column(name = "pending_qty",columnDefinition="int default 0")
	private int pendingQty=0;
	
	@Column(name = "recieved_qty",columnDefinition="int default 0")
	private int recievedQty=0;
	
	@Column(name = "discard_qty",columnDefinition="int default 0")
	private int discardQty=0;
	
	@Column(name = "return_qty",columnDefinition="int default 0")
	private int returnQty=0;
	
	@Column(name = "narration")
	private String narration="-";

	@Column(name = "dept_name")
	private String deptName;
	
	@Column(name = "dept_id",columnDefinition="int default 0")
	private int deptId;
	
	@Column(name = "raised_by")
	private String raisedBy;
	
	@Column(name = "mrn_status",columnDefinition="int default 0")
	private int mrnStatus;
	
	@Column(name = "pending_qty_lnl",columnDefinition="int default 0")
	private Integer pendingQtyLnl=0;
	
	@Column(name = "recieved_qty_sub_dept",columnDefinition="int default 0")
	private Integer recievedQtySubDept=0;
	
	@Column(name = "total_recieved_qty",columnDefinition="int default 0")
	private Integer totalRecievedQty=0;
	
	@Column(name = "created_by",updatable=false,columnDefinition="int default 0")
	private int createdBy;

	@Column(name = "updated_by",columnDefinition="int default 0")
	private Integer updatedBy;

	@Column(name = "deleted_by",columnDefinition="int default 0")
	private Integer deletedBy;	

	@Column(name = "deleted")
	private String deleted="N";

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "recieved_date")
	private Date recievedDate;
	
	@Column(name = "batch_id",columnDefinition="int default 0")
	private Integer batchId=0;

	public int getMrnItemInfoSlaveId() {
		return mrnItemInfoSlaveId;
	}

	public void setMrnItemInfoSlaveId(int mrnItemInfoSlaveId) {
		this.mrnItemInfoSlaveId = mrnItemInfoSlaveId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public int getItemCode() {
		return itemCode;
	}

	public void setItemCode(int itemCode) {
		this.itemCode = itemCode;
	}

	public int getSendQty() {
		return sendQty;
	}

	public void setSendQty(int sendQty) {
		this.sendQty = sendQty;
	}

	public int getPendingQty() {
		return pendingQty;
	}

	public void setPendingQty(int pendingQty) {
		this.pendingQty = pendingQty;
	}

	public int getRecievedQty() {
		return recievedQty;
	}

	public void setRecievedQty(int recievedQty) {
		this.recievedQty = recievedQty;
	}

	public int getDiscardQty() {
		return discardQty;
	}

	public void setDiscardQty(int discardQty) {
		this.discardQty = discardQty;
	}

	public String getNarration() {
		return narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public int getDeptId() {
		return deptId;
	}

	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}

	public String getRaisedBy() {
		return raisedBy;
	}

	public void setRaisedBy(String raisedBy) {
		this.raisedBy = raisedBy;
	}

	public int getMrnStatus() {
		return mrnStatus;
	}

	public void setMrnStatus(int mrnStatus) {
		this.mrnStatus = mrnStatus;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Date getRecievedDate() {
		return recievedDate;
	}

	public void setRecievedDate(Date recievedDate) {
		this.recievedDate = recievedDate;
	}

	public int getReturnQty() {
		return returnQty;
	}

	public void setReturnQty(int returnQty) {
		this.returnQty = returnQty;
	}

	public Integer getPendingQtyLnl() {
		return pendingQtyLnl;
	}

	public void setPendingQtyLnl(Integer pendingQtyLnl) {
		this.pendingQtyLnl = pendingQtyLnl;
	}

	public Integer getRecievedQtySubDept() {
		return recievedQtySubDept;
	}

	public void setRecievedQtySubDept(Integer recievedQtySubDept) {
		this.recievedQtySubDept = recievedQtySubDept;
	}

	public Integer getTotalRecievedQty() {
		return totalRecievedQty;
	}

	public void setTotalRecievedQty(Integer totalRecievedQty) {
		this.totalRecievedQty = totalRecievedQty;
	}

	public Integer getBatchId() {
		return batchId;
	}

	public void setBatchId(Integer batchId) {
		this.batchId = batchId;
	}
	
	
	
}