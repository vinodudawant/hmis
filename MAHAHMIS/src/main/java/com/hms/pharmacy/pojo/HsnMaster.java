package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "pharma_hsn_master")
public class HsnMaster implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "idpharma_hsn_master")
	private int hsnId;

	/*@Column(name = "cgst")
	private double cgst;

	@Column(name = "sgst")
	private double sgst;

	@Column(name = "igst")
	private double igst;

	@Column(name = "cess")
	private double cess;*/
	
	@Column(name = "hsn_no")
	private String hsnNo;

	@Column(name = "deleteFlag")
	public int deleteFlag;
	

	@CreationTimestamp
	@Column(name="hsn_add_date")
	private Date hsnAddDate;
	@UpdateTimestamp
	@Column(name="hsn_update_date")
	private Date hsnUpdateDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	
	@Column(name="user_id")
	private Integer userId=0;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	public int getHsnId() {
		return hsnId;
	}

	public void setHsnId(int hsnId) {
		this.hsnId = hsnId;
	}

	/*public double getCgst() {
		return cgst;
	}

	public void setCgst(double cgst) {
		this.cgst = cgst;
	}

	public double getSgst() {
		return sgst;
	}

	public void setSgst(double sgst) {
		this.sgst = sgst;
	}

	public double getIgst() {
		return igst;
	}

	public void setIgst(double igst) {
		this.igst = igst;
	}

	public double getCess() {
		return cess;
	}

	public void setCess(double cess) {
		this.cess = cess;
	}*/

	public int getDeleteFlag() {
		return deleteFlag;
	}

	public void setDeleteFlag(int deleteFlag) {
		this.deleteFlag = deleteFlag;
	}

	public String getHsnNo() {
		return hsnNo;
	}

	public void setHsnNo(String hsnNo) {
		this.hsnNo = hsnNo;
	}

	public Date getHsnAddDate() {
		return hsnAddDate;
	}

	public void setHsnAddDate(Date hsnAddDate) {
		this.hsnAddDate = hsnAddDate;
	}

	public Date getHsnUpdateDate() {
		return hsnUpdateDate;
	}

	public void setHsnUpdateDate(Date hsnUpdateDate) {
		this.hsnUpdateDate = hsnUpdateDate;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
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
	
}
