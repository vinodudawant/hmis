package com.hms.ivf.dto;

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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="follicular_basic_info")
public class FollicularStudyBasicInfoDTO {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "follicular_id")
	private Integer follicularId;
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "master_mollicular_id",columnDefinition="int default 0")
	private int masterMollicularId=0;
	
	@Column(name = "datef",columnDefinition="varchar(20) default ''")
	private String dateF="";
	
	@Column(name = "amhf",columnDefinition="varchar(20) default ''")
	private String amhF="";
	
	@Column(name = "fshf",columnDefinition="varchar(20) default ''")
	private String fshF="";
	
	@Column(name = "tshf",columnDefinition="varchar(20) default ''")
	private String tshF="";
	
	@Column(name = "prlf",columnDefinition="varchar(20) default ''")
	private String prlF="";
	
	@Column(name = "e2f",columnDefinition="varchar(20) default ''")
	private String e2F="";
	
	@Column(name = "p4f",columnDefinition="varchar(20) default ''")
	private String p4F="";
	
	@Column(name = "lhf",columnDefinition="varchar(20) default ''")
	private String lhF="";
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	
	@Column(name = "created_by")
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	
	@Transient
	List<FollicularStudyBasicInfoDTO>  getListForFollicularStudy;

	public Integer getFollicularId() {
		return follicularId;
	}

	public void setFollicularId(Integer follicularId) {
		this.follicularId = follicularId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getMasterMollicularId() {
		return masterMollicularId;
	}

	public void setMasterMollicularId(int masterMollicularId) {
		this.masterMollicularId = masterMollicularId;
	}

	public String getDateF() {
		return dateF;
	}

	public void setDateF(String dateF) {
		this.dateF = dateF;
	}

	public String getAmhF() {
		return amhF;
	}

	public void setAmhF(String amhF) {
		this.amhF = amhF;
	}

	public String getFshF() {
		return fshF;
	}

	public void setFshF(String fshF) {
		this.fshF = fshF;
	}

	public String getTshF() {
		return tshF;
	}

	public void setTshF(String tshF) {
		this.tshF = tshF;
	}

	public String getPrlF() {
		return prlF;
	}

	public void setPrlF(String prlF) {
		this.prlF = prlF;
	}

	public String getE2F() {
		return e2F;
	}

	public void setE2F(String e2f) {
		e2F = e2f;
	}

	public String getP4F() {
		return p4F;
	}

	public void setP4F(String p4f) {
		p4F = p4f;
	}

	public String getLhF() {
		return lhF;
	}

	public void setLhF(String lhF) {
		this.lhF = lhF;
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

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "FollicularStudyBasicInfoDTO [follicularId=" + follicularId
				+ ", patientId=" + patientId + ", treatmentId=" + treatmentId
				+ ", masterMollicularId=" + masterMollicularId + ", dateF="
				+ dateF + ", amhF=" + amhF + ", fshF=" + fshF + ", tshF="
				+ tshF + ", prlF=" + prlF + ", e2F=" + e2F + ", p4F=" + p4F
				+ ", lhF=" + lhF + ", createdDateTime=" + createdDateTime
				+ ", updatedDateTime=" + updatedDateTime + ", deletedBy="
				+ deletedBy + ", deletedDateTime=" + deletedDateTime
				+ ", unitId=" + unitId + ", userId=" + userId + "]";
	}

	public List<FollicularStudyBasicInfoDTO> getGetListForFollicularStudy() {
		return getListForFollicularStudy;
	}

	public void setGetListForFollicularStudy(
			List<FollicularStudyBasicInfoDTO> getListForFollicularStudy) {
		this.getListForFollicularStudy = getListForFollicularStudy;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	
	
}
