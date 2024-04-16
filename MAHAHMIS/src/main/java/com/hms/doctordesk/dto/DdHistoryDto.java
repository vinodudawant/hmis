package com.hms.doctordesk.dto;

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
@Table(name="dd_history")
public class DdHistoryDto implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "history_id")
	private int his_Id;
	
	@Column(name = "historyCode")
	private String historyCode;
	
	@Column(name = "family_history")
	private String familyHistory;
	
	@Column(name = "personal_history")
	private String personalHistory;
	
	@Column(name = "family_history_content")
	private String familyHistoryContent;
	
	@Column(name="patient_id")
	private int patientId;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name="user_id")
	private int userId;

	private Integer treatment_id;
	
	@Transient
	private List<DdHistoryDto> lstddHistoryList;

	@Transient
	private List<DdHistoryDto> lstFamilyHistoryMaster;

	public int getHis_Id() {
		return his_Id;
	}

	public void setHis_Id(int his_Id) {
		this.his_Id = his_Id;
	}

	public String getFamilyHistory() {
		return familyHistory;
	}

	public void setFamilyHistory(String familyHistory) {
		this.familyHistory = familyHistory;
	}

	public String getPersonalHistory() {
		return personalHistory;
	}

	public void setPersonalHistory(String personalHistory) {
		this.personalHistory = personalHistory;
	}

	public String getFamilyHistoryContent() {
		return familyHistoryContent;
	}

	public void setFamilyHistoryContent(String familyHistoryContent) {
		this.familyHistoryContent = familyHistoryContent;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
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
	

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public List<DdHistoryDto> getLstddHistoryList() {
		return lstddHistoryList;
	}

	public void setLstddHistoryList(List<DdHistoryDto> lstddHistoryList) {
		this.lstddHistoryList = lstddHistoryList;
	}

	public List<DdHistoryDto> getLstFamilyHistoryMaster() {
		return lstFamilyHistoryMaster;
	}

	public void setLstFamilyHistoryMaster(List<DdHistoryDto> lstFamilyHistoryMaster) {
		this.lstFamilyHistoryMaster = lstFamilyHistoryMaster;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Integer getTreatment_id() {
		return treatment_id;
	}

	public void setTreatment_id(Integer treatment_id) {
		this.treatment_id = treatment_id;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public String getHistoryCode() {
		return historyCode;
	}

	public void setHistoryCode(String historyCode) {
		this.historyCode = historyCode;
	}

	@Override
	public String toString() {
		return "DdHistoryDto [his_Id=" + his_Id + ", historyCode="
				+ historyCode + ", familyHistory=" + familyHistory
				+ ", personalHistory=" + personalHistory
				+ ", familyHistoryContent=" + familyHistoryContent
				+ ", patientId=" + patientId + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deleted=" + deleted
				+ ", deletedBy=" + deletedBy + ", deletedDate=" + deletedDate
				+ ", unitId=" + unitId + ", userId=" + userId
				+ ", treatment_id=" + treatment_id + ", lstddHistoryList="
				+ lstddHistoryList + ", lstFamilyHistoryMaster="
				+ lstFamilyHistoryMaster + ", getHis_Id()=" + getHis_Id()
				+ ", getFamilyHistory()=" + getFamilyHistory()
				+ ", getPersonalHistory()=" + getPersonalHistory()
				+ ", getFamilyHistoryContent()=" + getFamilyHistoryContent()
				+ ", getCreatedBy()=" + getCreatedBy() + ", getUpdatedBy()="
				+ getUpdatedBy() + ", getCreatedDate()=" + getCreatedDate()
				+ ", getUpdatedDate()=" + getUpdatedDate() + ", getDeleted()="
				+ getDeleted() + ", getDeletedBy()=" + getDeletedBy()
				+ ", getDeletedDate()=" + getDeletedDate() + ", getUnitId()="
				+ getUnitId() + ", getUserId()=" + getUserId()
				+ ", getLstddHistoryList()=" + getLstddHistoryList()
				+ ", getLstFamilyHistoryMaster()="
				+ getLstFamilyHistoryMaster() + ", getTreatment_id()="
				+ getTreatment_id() + ", getPatientId()=" + getPatientId()
				+ ", getHistoryCode()=" + getHistoryCode() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + ", toString()="
				+ super.toString() + "]";
	}
	
	
}
