package com.hms.ehat.dto;

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
@Table(name = "profees_dynamic_group_slave")
public class DynamicGroupSlaveDto {

	@Id
	@GeneratedValue
	@Column(name = "d_slave_id")
	private int dSlaveId;
	
	@Column(name = "d_master_id")
	private int dMasterId;
	
	@Column(name = "d_group_name")
	private String dGroupName;
	
	@Column(name = "doctor_id")
	private int doctorId;
	
	@Column(name = "doctor_name")
	private String doctorName;
	
	@Column(name = "personal_percent")
	private Double personalPercent=0.0;
	
	@Column(name = "distribute_percent")
	private Double distributePercent=0.0;
	
	@Column(name = "from_dist_amt_percent")
	private Double fromDistAmtPercent=0.0;
	
	@Column(name = "deleted")
	private String deleted="N";

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "created_date",updatable=false)
	private Date createdDate;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Transient
	private List<DynamicGroupSlaveDto> listDynamicGroupSlave;

	public int getdSlaveId() {
		return dSlaveId;
	}

	public void setdSlaveId(int dSlaveId) {
		this.dSlaveId = dSlaveId;
	}

	public int getdMasterId() {
		return dMasterId;
	}

	public void setdMasterId(int dMasterId) {
		this.dMasterId = dMasterId;
	}

	public String getdGroupName() {
		return dGroupName;
	}

	public void setdGroupName(String dGroupName) {
		this.dGroupName = dGroupName;
	}

	public int getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public Double getPersonalPercent() {
		return personalPercent;
	}

	public void setPersonalPercent(Double personalPercent) {
		this.personalPercent = personalPercent;
	}

	public Double getDistributePercent() {
		return distributePercent;
	}

	public void setDistributePercent(Double distributePercent) {
		this.distributePercent = distributePercent;
	}

	public Double getFromDistAmtPercent() {
		return fromDistAmtPercent;
	}

	public void setFromDistAmtPercent(Double fromDistAmtPercent) {
		this.fromDistAmtPercent = fromDistAmtPercent;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
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

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public List<DynamicGroupSlaveDto> getListDynamicGroupSlave() {
		return listDynamicGroupSlave;
	}

	public void setListDynamicGroupSlave(
			List<DynamicGroupSlaveDto> listDynamicGroupSlave) {
		this.listDynamicGroupSlave = listDynamicGroupSlave;
	}

	
}
