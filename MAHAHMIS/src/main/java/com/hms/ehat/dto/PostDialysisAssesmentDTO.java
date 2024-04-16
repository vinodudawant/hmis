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

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;


@Entity
@Table(name="ehat_dialysis_postDialysis")
public class PostDialysisAssesmentDTO {
	
	@Id
	@GeneratedValue
	@Column(name = "id_post_Dialysis_Assesment")
	private int idPostDialysisAssesment;
	
	@Column(name = "id_treatment")
	private Integer treatmentId;
	
	@Column(name = "patient_Id")
	private Integer patientId;
	

	@Column(name = "post_dialysis_wt")
	private String postDialysisWt;
	
	@Column(name = "loss_wt")
	private String lossWt;
	
	@Column(name = "bp")
	private String bp;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;	
	
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
	
	@Column(name = "unit_id")
	private int unitId;
	
	@Transient
	private List<PostDialysisAssesmentDTO> postDialysisList;

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	@JsonGetter("listpostDialysis")
	public List<PostDialysisAssesmentDTO> getPostDialysisList() {
		return postDialysisList;
	}

	@JsonSetter("listpostDialysis")
	public void setPostDialysisList(List<PostDialysisAssesmentDTO> postDialysisList) {
		this.postDialysisList = postDialysisList;
	}

	public int getIdPostDialysisAssesment() {
		return idPostDialysisAssesment;
	}

	public void setIdPostDialysisAssesment(int idPostDialysisAssesment) {
		this.idPostDialysisAssesment = idPostDialysisAssesment;
	}



	
	
	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getPostDialysisWt() {
		return postDialysisWt;
	}

	public void setPostDialysisWt(String postDialysisWt) {
		this.postDialysisWt = postDialysisWt;
	}

	public String getLossWt() {
		return lossWt;
	}

	public void setLossWt(String lossWt) {
		this.lossWt = lossWt;
	}

	public String getBp() {
		return bp;
	}

	public void setBp(String bp) {
		this.bp = bp;
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

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
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

	
	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	@Override
	public String toString() {
		return "PostDialysisAssesmentDTO [idPostDialysisAssesment="
				+ idPostDialysisAssesment + ", postDialysisWt="
				+ postDialysisWt + ", lossWt=" + lossWt + ", bp=" + bp
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deletedBy=" + deletedBy + ", deleted=" + deleted
				+ ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deletedDate=" + deletedDate
				+ ", postDialysisList=" + postDialysisList + "]";
	}


	

}
