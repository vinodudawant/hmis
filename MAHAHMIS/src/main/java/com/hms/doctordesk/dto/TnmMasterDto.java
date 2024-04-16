
package com.hms.doctordesk.dto;

import java.util.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="dd_tnm_master")
public class TnmMasterDto {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="tnm_master_id")
	private int id;
	@Column(name="tnm_description")
	private String tnmDesc;
	@Column(name="tnm_stage")
	private String tnmStage;
	@Column(name="status")
	private String tnmStatus;
	@Column(name="body_part_id")
	private Integer bodyPartId;
	@Column(name="body_part_name")
	private String bodyPartName;
	//logs
	@CreationTimestamp
	@Column(name="created_date_time",updatable = false)
	private Date createdDateTime;
	@UpdateTimestamp
	@Column(name="updated_date_time")
	private Date updatedDateTime;
	@Column(name="user_id")
	private int userId;
	@Column(name="created_by",updatable = false)
	private int createdBy;
	@Column(name="updated_by")
	private int updatedBy;
	@Column(name="deleted_by")
	private int deleted_by;
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	@Column(name="unit_id")
	private Integer unitId;
	@Column(name="tnm_flag")
	private String tnmFlag;
	
	@Transient
	List<TnmMasterDto> listOfTnmMaster;
	
	public List<TnmMasterDto> getListOfTnmMaster() {
		return listOfTnmMaster;
	}
	public void setListOfTnmMaster(List<TnmMasterDto> listOfTnmMaster) {
		this.listOfTnmMaster = listOfTnmMaster;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTnmDesc() {
		return tnmDesc;
	}
	public void setTnmDesc(String tnmDesc) {
		this.tnmDesc = tnmDesc;
	}
	public String getTnmStage() {
		return tnmStage;
	}
	public void setTnmStage(String tnmStage) {
		this.tnmStage = tnmStage;
	}
	public String getTnmStatus() {
		return tnmStatus;
	}
	public void setTnmStatus(String tnmStatus) {
		this.tnmStatus = tnmStatus;
	}
	public Integer getBodyPartId() {
		return bodyPartId;
	}
	public void setBodyPartId(Integer bodyPartId) {
		this.bodyPartId = bodyPartId;
	}
	public Date getCreatedDateTime() {
		return createdDateTime;
	}
	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}
	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}
	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
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
	public Date getDeletedDate() {
		return deletedDate;
	}
	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}
	public Integer getUnitId() {
		return unitId;
	}
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	public String getTnmFlag() {
		return tnmFlag;
	}
	public void setTnmFlag(String tnmFlag) {
		this.tnmFlag = tnmFlag;
	}
	public String getBodyPartName() {
		return bodyPartName;
	}
	public void setBodyPartName(String bodyPartName) {
		this.bodyPartName = bodyPartName;
	}
	
	
	
}
