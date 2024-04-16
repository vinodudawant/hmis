package com.hms.laundry.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

@Entity
@Table(name = "laundry_master")
public class LaundryLinenMasterDTO implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "mrn_id")
	private Integer mrnId;

	@Column(name = "dept_name")
	private String deptName;
	
	@Column(name = "dept_id",columnDefinition="int default 0")
	private int deptId;
	
	@Column(name = "raised_by")
	private String raisedBy;
	
	@Column(name = "mrn_status",columnDefinition="int default 0")
	private int mrnStatus;
		
	
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId;
	
	@Column(name = "created_by",updatable=false,columnDefinition="int default 1")
	private int createdBy;

	@Column(name = "updated_by",columnDefinition="int default 0")
	private int updatedBy;

	@Column(name = "deleted_by",columnDefinition="int default 0")
	private int deletedBy;	

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
	@Column(name = "mrn_date",updatable=false)
	private Date mrnDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "recieved_date")
	private Date recievedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "recieved_date2")
	private Date recievedDate2;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "reutrn_date")
	private Date reutrnDate;
	
	@Transient
	private List<LaundryLinenMasterDTO> listLL;

	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "master_mrn_id", referencedColumnName = "mrn_id")
	private List<LaundryLinenSlaveDTO> ltlandlSlave = new ArrayList<LaundryLinenSlaveDTO>();


	public Integer getMrnId() {
		return mrnId;
	}


	public void setMrnId(Integer mrnId) {
		this.mrnId = mrnId;
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


	public int getUnitId() {
		return unitId;
	}


	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}


	public int getCreatedBy() {
		return createdBy;
	}


	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}


	public int getUpdatedBy() {
		return updatedBy;
	}


	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}


	public int getDeletedBy() {
		return deletedBy;
	}


	public void setDeletedBy(int deletedBy) {
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


	public Date getMrnDate() {
		return mrnDate;
	}


	public void setMrnDate(Date mrnDate) {
		this.mrnDate = mrnDate;
	}


	public Date getRecievedDate() {
		return recievedDate;
	}


	public void setRecievedDate(Date recievedDate) {
		this.recievedDate = recievedDate;
	}


	public List<LaundryLinenMasterDTO> getListLL() {
		return listLL;
	}


	public void setListLL(List<LaundryLinenMasterDTO> listLL) {
		this.listLL = listLL;
	}


	public List<LaundryLinenSlaveDTO> getLtlandlSlave() {
		return ltlandlSlave;
	}


	public void setLtlandlSlave(List<LaundryLinenSlaveDTO> ltlandlSlave) {
		this.ltlandlSlave = ltlandlSlave;
	}


	public Date getReutrnDate() {
		return reutrnDate;
	}


	public void setReutrnDate(Date reutrnDate) {
		this.reutrnDate = reutrnDate;
	}


	public Date getRecievedDate2() {
		return recievedDate2;
	}


	public void setRecievedDate2(Date recievedDate2) {
		this.recievedDate2 = recievedDate2;
	}
	
	
}	
	

