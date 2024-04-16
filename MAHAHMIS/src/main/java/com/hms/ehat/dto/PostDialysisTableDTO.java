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
@Table(name="ehat_dialysis_onDialysis")
public class PostDialysisTableDTO {
	
	@Id
	@GeneratedValue
	@Column(name = "id_post_Dialysis_table")
	private int idPostDialysisTable;
	
	@Column(name = "id_treatment")
	private Integer treatmentId;
	
	@Column(name = "patient_Id")
	private Integer patientId;
	
	

	@Column(name = "dialysis_started_at")
	private String dialysisStartedAt;
	
	@Column(name = "dialysis_terminated_at")
	private String dialysisTerminatedAt;
	
	
	@Column(name = "time")
	private String time;
	
	@Column(name = "tpr")
	private String tpr;
	
	@Column(name = "blood_pressure")
	private String bloodPressure;
	
	@Column(name = "spo2")
	private String spo2;
	
	@Column(name = "blood_flow")
	private String bloodFlowRate;

	@Column(name = "a_pressure")
	private String aPressure;
	
	@Column(name = "v_pressure")
	private String vPressure;
	
	@Column(name = "temp")
	private String temp;
	
	@Column(name = "herapine_dose")
	private String herapineDose;
	
	@Column(name = "remark")
	private String remark;
	
	@Column(name = "pre_dialysis_collection")
	private String preDialysisCollection;
	
	@Column(name = "post_dialysis_collection")
	private String postDialysisCollection;	
	
	@Column(name = "blood_transfusions")
	private String bloodTransfusions;
	
	@Column(name = "medications")
	private String medications;	
	
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
	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	@Transient
	private List<PostDialysisTableDTO> postDialysisTableList;

	@JsonGetter("listonDialysisTable")
	public List<PostDialysisTableDTO> getPostDialysisTableList() {
		return postDialysisTableList;
	}

	@JsonSetter("listonDialysisTable")
	public void setPostDialysisTableList(
			List<PostDialysisTableDTO> postDialysisTableList) {
		this.postDialysisTableList = postDialysisTableList;
	}

	public int getIdPostDialysisTable() {
		return idPostDialysisTable;
	}

	public void setIdPostDialysisTable(int idPostDialysisTable) {
		this.idPostDialysisTable = idPostDialysisTable;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getDialysisStartedAt() {
		return dialysisStartedAt;
	}

	public void setDialysisStartedAt(String dialysisStartedAt) {
		this.dialysisStartedAt = dialysisStartedAt;
	}

	public String getDialysisTerminatedAt() {
		return dialysisTerminatedAt;
	}

	public void setDialysisTerminatedAt(String dialysisTerminatedAt) {
		this.dialysisTerminatedAt = dialysisTerminatedAt;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getTpr() {
		return tpr;
	}

	public void setTpr(String tpr) {
		this.tpr = tpr;
	}

	public String getBloodPressure() {
		return bloodPressure;
	}

	public void setBloodPressure(String bloodPressure) {
		this.bloodPressure = bloodPressure;
	}

	public String getSpo2() {
		return spo2;
	}

	public void setSpo2(String spo2) {
		this.spo2 = spo2;
	}

	public String getBloodFlowRate() {
		return bloodFlowRate;
	}

	public void setBloodFlowRate(String bloodFlowRate) {
		this.bloodFlowRate = bloodFlowRate;
	}

	public String getaPressure() {
		return aPressure;
	}

	public void setaPressure(String aPressure) {
		this.aPressure = aPressure;
	}

	public String getvPressure() {
		return vPressure;
	}

	public void setvPressure(String vPressure) {
		this.vPressure = vPressure;
	}

	public String getTemp() {
		return temp;
	}

	public void setTemp(String temp) {
		this.temp = temp;
	}

	public String getHerapineDose() {
		return herapineDose;
	}

	public void setHerapineDose(String herapineDose) {
		this.herapineDose = herapineDose;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public String getPreDialysisCollection() {
		return preDialysisCollection;
	}

	public void setPreDialysisCollection(String preDialysisCollection) {
		this.preDialysisCollection = preDialysisCollection;
	}

	public String getPostDialysisCollection() {
		return postDialysisCollection;
	}

	public void setPostDialysisCollection(String postDialysisCollection) {
		this.postDialysisCollection = postDialysisCollection;
	}

	public String getBloodTransfusions() {
		return bloodTransfusions;
	}

	public void setBloodTransfusions(String bloodTransfusions) {
		this.bloodTransfusions = bloodTransfusions;
	}

	public String getMedications() {
		return medications;
	}

	public void setMedications(String medications) {
		this.medications = medications;
	}


	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}
	@Override
	public String toString() {
		return "PostDialysisTableDTO [idPostDialysisTable="
				+ idPostDialysisTable + ", dialysisStartedAt="
				+ dialysisStartedAt + ", dialysisTerminatedAt="
				+ dialysisTerminatedAt + ", time=" + time + ", tpr=" + tpr
				+ ", bloodPressure=" + bloodPressure + ", spo2=" + spo2
				+ ", bloodFlowRate=" + bloodFlowRate + ", aPressure="
				+ aPressure + ", vPressure=" + vPressure + ", temp=" + temp
				+ ", herapineDose=" + herapineDose + ", remark=" + remark
				+ ", preDialysisCollection=" + preDialysisCollection
				+ ", postDialysisCollection=" + postDialysisCollection
				+ ", bloodTransfusions=" + bloodTransfusions + ", medications="
				+ medications + ", createdBy=" + createdBy + ", updatedBy="
				+ updatedBy + ", deletedBy=" + deletedBy + ", deleted="
				+ deleted + ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deletedDate=" + deletedDate
				+ ", postDialysisTableList=" + postDialysisTableList
				+ ", getPostDialysisTableList()=" + getPostDialysisTableList()
				+ ", getIdPostDialysisTable()=" + getIdPostDialysisTable()
				+ ", getDialysisStartedAt()=" + getDialysisStartedAt()
				+ ", getDialysisTerminatedAt()=" + getDialysisTerminatedAt()
				+ ", getTime()=" + getTime() + ", getTpr()=" + getTpr()
				+ ", getBloodPressure()=" + getBloodPressure() + ", getSpo2()="
				+ getSpo2() + ", getBloodFlowRate()=" + getBloodFlowRate()
				+ ", getaPressure()=" + getaPressure() + ", getvPressure()="
				+ getvPressure() + ", getTemp()=" + getTemp()
				+ ", getHerapineDose()=" + getHerapineDose() + ", getRemark()="
				+ getRemark() + ", getCreatedBy()=" + getCreatedBy()
				+ ", getUpdatedBy()=" + getUpdatedBy() + ", getDeletedBy()="
				+ getDeletedBy() + ", getDeleted()=" + getDeleted()
				+ ", getCreatedDate()=" + getCreatedDate()
				+ ", getUpdatedDate()=" + getUpdatedDate()
				+ ", getDeletedDate()=" + getDeletedDate()
				+ ", getPreDialysisCollection()=" + getPreDialysisCollection()
				+ ", getPostDialysisCollection()="
				+ getPostDialysisCollection() + ", getBloodTransfusions()="
				+ getBloodTransfusions() + ", getMedications()="
				+ getMedications() + ", getClass()=" + getClass()
				+ ", hashCode()=" + hashCode() + ", toString()="
				+ super.toString() + "]";
	}
	
	

}
