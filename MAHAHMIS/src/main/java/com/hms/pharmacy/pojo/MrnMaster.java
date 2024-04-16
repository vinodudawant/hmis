package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="pharma_store_mrn_master")
public class MrnMaster implements Serializable
{	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name="mrn_id")
	private Integer mrnId=null;
	
	@Column(name="mrn_doc_id")
	private String mrnDocId=null;
	
	@Column(name="mrn_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private java.util.Date mrnDate;
	
	@Column(name="mrn_remark")
	private String mrnRemark=null;
	
	@Column(name="mrn_product_count")
	private Integer mrnProductCount=null;
	
	@Column(name="mrn_delete_flag")
	private  Integer mrnDeleteFlag=0;
	
	@Column(name="mrn_update_date")
	private java.util.Date mrnUpdateDate=null;
	
	@Column(name="mrn_status")
	private String mrnStatus=null;
	
	/*
	 * @OneToMany(cascade=CascadeType.ALL)
	 * 
	 * @LazyCollection(LazyCollectionOption.FALSE)
	 * 
	 * @JoinColumn(name="mrn_slave_master_id",referencedColumnName="mrn_id",
	 * insertable=false, updatable=false) private List<MrnSlave> mrnSlaves=null;
	 */
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name="mrn_slave_master_id",referencedColumnName="mrn_id")
	private List<MrnSlave> mrnSlaves=null;
	
	@Column(name="mrn_store_name")
	private String mrnStoreName=null;
	
	@Column(name="mrn_main_store_name")
	private Integer mrnMainStoreId=null;
	
	@Column(name="mrn_store_id")
	private Integer mrnStoreId=null;
	
	@Column(name="mrn_added_by")
	private String mrnAddedBy=null;
	
	@Column(name="mrn_mod_by")
	private String mrnModBy=null;
	
	@Column(name="mrn_time")
	private String mrnTime=null;
	
	@Column(name="mrn_approved_by")
	private String mrnApprovedBy=null;
	
	@Column(name="mrn_approved")
	private Integer MrnApproved=0;

	@Column(name="unit_id")
	private Integer unitId=0;
	
	public Integer getMrnMainStoreId() {
		return mrnMainStoreId;
	}

	public void setMrnMainStoreId(Integer mrnMainStoreId) {
		this.mrnMainStoreId = mrnMainStoreId;
	}

	public Integer getMrnId() {
		return mrnId;
	}

	public void setMrnId(Integer mrnId) {
		this.mrnId = mrnId;
	}

	public String getMrnDocId() {
		return mrnDocId;
	}

	public void setMrnDocId(String mrnDocId) {
		this.mrnDocId = mrnDocId;
	}

	public java.util.Date getMrnDate() {
		return mrnDate;
	}

	public void setMrnDate(java.util.Date mrnDate) {
		this.mrnDate = mrnDate;
	}

	public String getMrnRemark() {
		return mrnRemark;
	}

	public void setMrnRemark(String mrnRemark) {
		this.mrnRemark = mrnRemark;
	}

	public Integer getMrnProductCount() {
		return mrnProductCount;
	}

	public void setMrnProductCount(Integer mrnProductCount) {
		this.mrnProductCount = mrnProductCount;
	}

	public Integer getMrnDeleteFlag() {
		return mrnDeleteFlag;
	}

	public void setMrnDeleteFlag(Integer mrnDeleteFlag) {
		this.mrnDeleteFlag = mrnDeleteFlag;
	}

	public java.util.Date getMrnUpdateDate() {
		return mrnUpdateDate;
	}

	public void setMrnUpdateDate(java.util.Date mrnUpdateDate) {
		this.mrnUpdateDate = mrnUpdateDate;
	}

	public String getMrnStoreName() {
		return mrnStoreName;
	}

	public void setMrnStoreName(String mrnStoreName) {
		this.mrnStoreName = mrnStoreName;
	}

	public String getMrnAddedBy() {
		return mrnAddedBy;
	}

	public void setMrnAddedBy(String mrnAddedBy) {
		this.mrnAddedBy = mrnAddedBy;
	}

	public String getMrnModBy() {
		return mrnModBy;
	}

	public void setMrnModBy(String mrnModBy) {
		this.mrnModBy = mrnModBy;
	}

	public List<MrnSlave> getMrnSlaves() {
		return mrnSlaves;
	}

	public void setMrnSlaves(List<MrnSlave> mrnSlaves) {
		this.mrnSlaves = mrnSlaves;
	}

	public Integer getMrnStoreId() {
		return mrnStoreId;
	}

	public void setMrnStoreId(Integer mrnStoreId) {
		this.mrnStoreId = mrnStoreId;
	}

	public String getMrnStatus() {
		return mrnStatus;
	}

	public void setMrnStatus(String mrnStatus) {
		this.mrnStatus = mrnStatus;
	}

	public String getMrnTime() {
		return mrnTime;
	}

	public void setMrnTime(String mrnTime) {
		this.mrnTime = mrnTime;
	}

	public String getMrnApprovedBy() {
		return mrnApprovedBy;
	}

	public void setMrnApprovedBy(String mrnApprovedBy) {
		this.mrnApprovedBy = mrnApprovedBy;
	}

	public Integer getMrnApproved() {
		return MrnApproved;
	}

	public void setMrnApproved(Integer mrnApproved) {
		MrnApproved = mrnApproved;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	
	
}
