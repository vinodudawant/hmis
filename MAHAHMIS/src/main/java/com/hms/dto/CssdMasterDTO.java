package com.hms.dto;

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
@Table(name = "inv_cssd_master")
public class CssdMasterDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "process_id")
	private Integer processId;

	@Column(name = "dept_name")
	private String deptName;
	
	@Column(name = "dept_id",columnDefinition="int default 0")
	private int deptId;
	
	@Column(name = "raised_by")
	private String raisedBy;
	
	@Column(name = "received_by")
	private String receivedBy;
	
	@Column(name = "mrn_status",columnDefinition="int default 0")
	private int mrnStatus;
	
	@Column(name = "processing_id",columnDefinition="int default 0")
	private Integer processingId;
	
	@Column(name = "machine_id",columnDefinition="int default 0")
	private Integer machineId;
	
	@Column(name = "processing_name")
	private String processingName;
	
	@Column(name = "machine_name")
	private String machineName;
	
	@Column(name = "conducted_by")
	private String conductedBy;
	
	
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
	@Column(name = "processing_date")
	private Date processingDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "recieved_date2")
	private Date recievedDate2;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "reutrn_date")
	private Date reutrnDate;
	
	@Transient
	private List<CssdMasterDTO> listCssd;

	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "master_process_id", referencedColumnName = "process_id")
	private List<CssdSlaveDTO> ltCssdSlave = new ArrayList<CssdSlaveDTO>();


	public Integer getProcessId() {
		return processId;
	}


	public void setProcessId(Integer processId) {
		this.processId = processId;
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


	public List<CssdMasterDTO> getListCssd() {
		return listCssd;
	}


	public void setListCssd(List<CssdMasterDTO> listCssd) {
		this.listCssd = listCssd;
	}


	public List<CssdSlaveDTO> getLtCssdSlave() {
		return ltCssdSlave;
	}


	public void setLtCssdSlave(List<CssdSlaveDTO> ltCssdSlave) {
		this.ltCssdSlave = ltCssdSlave;
	}


	public Integer getProcessingId() {
		return processingId;
	}


	public void setProcessingId(Integer processingId) {
		this.processingId = processingId;
	}


	public Integer getMachineId() {
		return machineId;
	}


	public void setMachineId(Integer machineId) {
		this.machineId = machineId;
	}


	public String getProcessingName() {
		return processingName;
	}


	public void setProcessingName(String processingName) {
		this.processingName = processingName;
	}


	public String getMachineName() {
		return machineName;
	}


	public void setMachineName(String machineName) {
		this.machineName = machineName;
	}


	public String getConductedBy() {
		return conductedBy;
	}


	public void setConductedBy(String conductedBy) {
		this.conductedBy = conductedBy;
	}


	public Date getProcessingDate() {
		return processingDate;
	}


	public void setProcessingDate(Date processingDate) {
		this.processingDate = processingDate;
	}


	public Date getRecievedDate2() {
		return recievedDate2;
	}


	public void setRecievedDate2(Date recievedDate2) {
		this.recievedDate2 = recievedDate2;
	}


	public Date getReutrnDate() {
		return reutrnDate;
	}


	public void setReutrnDate(Date reutrnDate) {
		this.reutrnDate = reutrnDate;
	}


	public String getReceivedBy() {
		return receivedBy;
	}


	public void setReceivedBy(String receivedBy) {
		this.receivedBy = receivedBy;
	}
	
	
	
	
	
}
