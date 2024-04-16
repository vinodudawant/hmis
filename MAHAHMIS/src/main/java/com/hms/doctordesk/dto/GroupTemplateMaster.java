package com.hms.doctordesk.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name="dd_group_template")
public class GroupTemplateMaster {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="template_id")
	private int id;
	
	@Column(name="template_name")
	private String tempLateName;
	
	@Column(name="instruction_id")
	private String instructionId;
	
	@CreationTimestamp
	@Column(name="created_date_time",updatable = false)
	private Date createdDateTime;
	@Column(name="created_by")
	private Integer createdBy;
	@Column(name="unit_id")
	private int unitId;
	@Column(name="updated_by")
	private int updatedBy;
	@Column(name="deleted_by")
	private int deleted_by;
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	@Transient
	private List<GroupInstructionMaster> groupInstructionMaster;
	@Transient
	private List<GroupTemplateMaster> grouptemplatemasterlist;
	
	
	public Date getCreatedDateTime() {
		return createdDateTime;
	}
	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}
	public Integer getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}
	public int getUnitId() {
		return unitId;
	}
	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}
	public int getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}
	public int getDeleted_by() {
		return deleted_by;
	}
	public void setDeleted_by(int deleted_by) {
		this.deleted_by = deleted_by;
	}
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	
	

	public List<GroupInstructionMaster> getGroupInstructionMaster() {
		return groupInstructionMaster;
	}
	public void setGroupInstructionMaster(List<GroupInstructionMaster> groupInstructionMaster) {
		this.groupInstructionMaster = groupInstructionMaster;
	}
	public String getInstructionId() {
		return instructionId;
	}
	public void setInstructionId(String instructionId) {
		this.instructionId = instructionId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTempLateName() {
		return tempLateName;
	}
	public void setTempLateName(String tempLateName) {
		this.tempLateName = tempLateName;
	}
	public List<GroupTemplateMaster> getGrouptemplatemasterlist() {
		return grouptemplatemasterlist;
	}
	public void setGrouptemplatemasterlist(List<GroupTemplateMaster> grouptemplatemasterlist) {
		this.grouptemplatemasterlist = grouptemplatemasterlist;
	}
	
	
}
