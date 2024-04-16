package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@SuppressWarnings("serial")
@Entity
@Table(name = "ehat_otoperationnotes")
public class EhatOTOperationNotes implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idehat_OTOperationNotes")
	private Integer idEhatOTOperationNotes;
	
	@Column(name = "treatmentOperationsManageID")
	private int treatmentOperationsManageID;
	
	@Column(name = "estimatedBLoodLoss")
	private String estimatedBLoodLoss;
	
	@Column(name = "actualBloodLoss")
	private String actualBloodLoss;
	
	@Column(name = "instrumentCount")
	private int instrumentCount;
	
	@Column(name = "recordedBy")
	private String recordedBy;
	
	@Column(name = "mopCountRecordedBy")
	private String mopCountRecordedBy;
	
	@Column(name = "comment")
	private String comment;
	
	@Column(name = "templateID")
	private int templateID;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	@Column(name = "status",columnDefinition="varchar(2) default 'N'")
	private String status="N";
	
	@Column(name = "updatedTime")
	private String updatedTime;
	
	@Column(name = "implantDetails")
	private String implantDetails;
	
	@Column(name = "chkEditerdata",columnDefinition="TEXT")
	private String chkEditerdata;
	
	@Transient
	private List<EhatOTOperationNotes> listOTNotes;
	
	public Integer getIdEhatOTOperationNotes() {
		return idEhatOTOperationNotes;
	}


	public void setIdEhatOTOperationNotes(Integer idEhatOTOperationNotes) {
		this.idEhatOTOperationNotes = idEhatOTOperationNotes;
	}


	public int getTreatmentOperationsManageID() {
		return treatmentOperationsManageID;
	}


	public void setTreatmentOperationsManageID(int treatmentOperationsManageID) {
		this.treatmentOperationsManageID = treatmentOperationsManageID;
	}


	public String getEstimatedBLoodLoss() {
		return estimatedBLoodLoss;
	}


	public void setEstimatedBLoodLoss(String estimatedBLoodLoss) {
		this.estimatedBLoodLoss = estimatedBLoodLoss;
	}


	public String getActualBloodLoss() {
		return actualBloodLoss;
	}


	public void setActualBloodLoss(String actualBloodLoss) {
		this.actualBloodLoss = actualBloodLoss;
	}


	public int getInstrumentCount() {
		return instrumentCount;
	}


	public void setInstrumentCount(int instrumentCount) {
		this.instrumentCount = instrumentCount;
	}


	public String getRecordedBy() {
		return recordedBy;
	}


	public void setRecordedBy(String recordedBy) {
		this.recordedBy = recordedBy;
	}


	public String getMopCountRecordedBy() {
		return mopCountRecordedBy;
	}


	public void setMopCountRecordedBy(String mopCountRecordedBy) {
		this.mopCountRecordedBy = mopCountRecordedBy;
	}


	public String getComment() {
		return comment;
	}


	public void setComment(String comment) {
		this.comment = comment;
	}


	public int getTemplateID() {
		return templateID;
	}


	public void setTemplateID(int templateID) {
		this.templateID = templateID;
	}


	public int getUnitId() {
		return unitId;
	}


	public void setUnitId(int unitId) {
		this.unitId = unitId;
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


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getUpdatedTime() {
		return updatedTime;
	}


	public void setUpdatedTime(String updatedTime) {
		this.updatedTime = updatedTime;
	}


	public String getChkEditerdata() {
		return chkEditerdata;
	}


	public void setChkEditerdata(String chkEditerdata) {
		this.chkEditerdata = chkEditerdata;
	}


	public List<EhatOTOperationNotes> getListOTNotes() {
		return listOTNotes;
	}


	public void setListOTNotes(List<EhatOTOperationNotes> listOTNotes) {
		this.listOTNotes = listOTNotes;
	}
	
	
	public String getImplantDetails() {
		return implantDetails;
	}


	public void setImplantDetails(String implantDetails) {
		this.implantDetails = implantDetails;
	}


	@Override
	public String toString() {
		return "EhatOTOperationNotes [idEhatOTOperationNotes=" + idEhatOTOperationNotes
				+ ", treatmentOperationsManageID=" + treatmentOperationsManageID + ", estimatedBLoodLoss="
				+ estimatedBLoodLoss + ", actualBloodLoss=" + actualBloodLoss + ", instrumentCount=" + instrumentCount
				+ ", recordedBy=" + recordedBy + ", mopCountRecordedBy=" + mopCountRecordedBy + ", comment=" + comment
				+ ", templateID=" + templateID + ", unitId=" + unitId + ", createdBy=" + createdBy
				+ ", createdDateTime=" + createdDateTime + ", status=" + status + ", updatedTime=" + updatedTime
				+ ", implantDetails=" + implantDetails + ", chkEditerdata=" + chkEditerdata + ", listOTNotes="
				+ listOTNotes + "]";
	}
}
