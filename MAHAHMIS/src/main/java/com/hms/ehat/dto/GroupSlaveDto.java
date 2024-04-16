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
@Table(name = "profees_group_slave")
public class GroupSlaveDto {

	@Id
	@GeneratedValue
	@Column(name = "group_slave_id")
	private int groupSlaveId;
	
	@Column(name = "group_master_id")
	private int groupMasterId;
	
	@Column(name = "group_name")
	private String groupName;
	
	@Column(name = "doctor_id")
	private int doctorId;
	
	@Column(name = "doctor_name")
	private String doctorName;
	
	@Column(name = "doctor_percent")
	private double doctorPercent=0.0;
	
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
	private List<GroupSlaveDto> listGroupSlave;

	public int getGroupSlaveId() {
		return groupSlaveId;
	}

	public void setGroupSlaveId(int groupSlaveId) {
		this.groupSlaveId = groupSlaveId;
	}

	public int getGroupMasterId() {
		return groupMasterId;
	}

	public void setGroupMasterId(int groupMasterId) {
		this.groupMasterId = groupMasterId;
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

	public double getDoctorPercent() {
		return doctorPercent;
	}

	public void setDoctorPercent(double doctorPercent) {
		this.doctorPercent = doctorPercent;
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

	public List<GroupSlaveDto> getListGroupSlave() {
		return listGroupSlave;
	}

	public void setListGroupSlave(List<GroupSlaveDto> listGroupSlave) {
		this.listGroupSlave = listGroupSlave;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	
}
