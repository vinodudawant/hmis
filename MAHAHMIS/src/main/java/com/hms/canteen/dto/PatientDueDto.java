package com.hms.canteen.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
@Table(name = "ehat_patient_dues")
public class PatientDueDto implements Serializable {
	
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name="slave_id")
	private int slaveId;
	
	@Column(name = "patientName")
	private String patientName;
	
	@Column(name = "billId",columnDefinition="int default 0")
	private int billId;
	
	@Column(name = "ipdNo")
	private String ipdNo;
	
	@Column(name = "amount")
	private double amount=0.0;
	
	@Column(name = "recAmount")
	private double recAmount=0.0;

	@Column(name = "pendingAmount")
	private double pendingAmount=0.0;
	
	@Column(name = "paidAmount")
	private double paidAmount=0.0;
	
	@Column(name = "from_d")
	private String fromd;
	
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted;
	
	@Column(name = "narration")
	private String narration;

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;

	@Column(name = "updated_by",columnDefinition="int default 0")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by",columnDefinition="int default 0")
	private Integer deletedByslave;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;

	@Column(name = "unitId",columnDefinition="int default 0")
	private int unitId;
	
	@Transient
	private List<PatientDueDto> lstdue;

	public int getSlaveId() {
		return slaveId;
	}

	public void setSlaveId(int slaveId) {
		this.slaveId = slaveId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public int getBillId() {
		return billId;
	}

	public void setBillId(int billId) {
		this.billId = billId;
	}

	public String getIpdNo() {
		return ipdNo;
	}

	public void setIpdNo(String ipdNo) {
		this.ipdNo = ipdNo;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public double getRecAmount() {
		return recAmount;
	}

	public void setRecAmount(double recAmount) {
		this.recAmount = recAmount;
	}

	public double getPendingAmount() {
		return pendingAmount;
	}

	public void setPendingAmount(double pendingAmount) {
		this.pendingAmount = pendingAmount;
	}

	public double getPaidAmount() {
		return paidAmount;
	}

	public void setPaidAmount(double paidAmount) {
		this.paidAmount = paidAmount;
	}

	

	public String getFromd() {
		return fromd;
	}

	public void setFromd(String fromd) {
		this.fromd = fromd;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getNarration() {
		return narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public Integer getDeletedByslave() {
		return deletedByslave;
	}

	public void setDeletedByslave(Integer deletedByslave) {
		this.deletedByslave = deletedByslave;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public List<PatientDueDto> getLstdue() {
		return lstdue;
	}

	public void setLstdue(List<PatientDueDto> lstdue) {
		this.lstdue = lstdue;
	}

	
	
}
