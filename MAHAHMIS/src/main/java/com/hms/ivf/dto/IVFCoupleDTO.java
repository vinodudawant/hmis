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

@Entity
@Table(name = "ehat_ivf_couple")
   public class IVFCoupleDTO {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ivf_couple_id")
	private Integer ivfCoupleId;

	@Column(name = "male_patient_id")
	private Integer malePatientId;
	
	@Column(name = "female_patient_id")
	private Integer femalePatientId;
	
	@Column(name = "couple_flag")
	private String coupleFlag;
	
	@Column(name = "narration")
	private String narration;
	
	
	@Column(name = "male_dept")
	private Integer maleDept;
	
	@Column(name = "female_dept")
	private Integer femaleDept;
	
	public Integer getMaleDept() {
		return maleDept;
	}

	public void setMaleDept(Integer maleDept) {
		this.maleDept = maleDept;
	}

	public Integer getFemaleDept() {
		return femaleDept;
	}

	public void setFemaleDept(Integer femaleDept) {
		this.femaleDept = femaleDept;
	}

	@Column(name = "ivf_couple_status", columnDefinition = "varchar(2) default 'N'")
	private String ivfCoupleStatus = "N";
	
	@Column(name = "ivf_batch_status", columnDefinition = "varchar(20) default 'Not Generated'")
	private String ivfBatchStatus = "not generated";

	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDateTime;
	
	@Column(name = "created_by")
	private Integer createdBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "status_updated_date_time")
	private Date statusUpdatedDateTime;
	
	@Column(name = "status_updated_by")
	private Integer statusUpdatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id", columnDefinition = "int default 1")
	private int unitId = 1;
	
	@Column(name = "yearmonth")
	private String YearMonth;
	
	
	public String getYearMonth() {
		return YearMonth;
	}

	public void setYearMonth(String yearmonth) {
		YearMonth = yearmonth;
	}

	@Transient
	private List<IVFCoupleDTO> listCouple;

	public Integer getIvfCoupleId() {
		return ivfCoupleId;
	}

	public void setIvfCoupleId(Integer ivfCoupleId) {
		this.ivfCoupleId = ivfCoupleId;
	}

	public String getIvfCoupleStatus() {
		return ivfCoupleStatus;
	}

	public void setIvfCoupleStatus(String ivfCoupleStatus) {
		this.ivfCoupleStatus = ivfCoupleStatus;
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

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}
	
	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}
	
	public Date getStatusUpdatedDateTime() {
		return statusUpdatedDateTime;
	}

	public void setStatusUpdatedDateTime(Date statusUpdatedDateTime) {
		this.statusUpdatedDateTime = statusUpdatedDateTime;
	}
	
	public Integer getstatusUpdatedBy() {
		return statusUpdatedBy;
	}

	public void setstatusUpdatedBy(Integer statusUpdatedBy) {
		this.statusUpdatedBy = statusUpdatedBy;
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

	public Integer getMalePatientId() {
		return malePatientId;
	}

	public void setMalePatientId(Integer malePatientId) {
		this.malePatientId = malePatientId;
	}

	public Integer getFemalePatientId() {
		return femalePatientId;
	}

	public void setFemalePatientId(Integer femalePatientId) {
		this.femalePatientId = femalePatientId;
	}
	
	public String getCoupleFlag() {
		return coupleFlag;
	}

	public void setCoupleFlag(String coupleFlag) {
		this.coupleFlag = coupleFlag;
	}
	
	public String getNarration() {
		return narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}
	
	@Override
	public String toString() {
		return "IVFCoupleDTO [ivfCoupleId=" + ivfCoupleId + ", malePatientId=" + malePatientId + ", femalePatientId=" + femalePatientId
				+ ", ivfCoupleStatus=" + ivfCoupleStatus + ", createdDateTime=" + createdDateTime + ", createdBy=" + createdBy
				+ ", updatedDateTime=" + updatedDateTime + ", updatedBy=" + updatedBy + ", deletedBy=" + deletedBy + ", deletedDateTime="
				+ deletedDateTime + ", unitId=" + unitId + "]";
	}
	
	public List<IVFCoupleDTO> getListCouple() {
		return listCouple;
	}

	public void setListCouple(List<IVFCoupleDTO> listCouple) {
		this.listCouple = listCouple;
	}

	public String getIvfBatchStatus() {
		return ivfBatchStatus;
	}

	public void setIvfBatchStatus(String ivfBatchStatus) {
		this.ivfBatchStatus = ivfBatchStatus;
	}
}
