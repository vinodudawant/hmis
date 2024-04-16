package com.hms.ivf.dto;

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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;



@Entity
@Table(name="gyno_exam_basic_info")
public class GynoExamDto implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "gynoexam_id")
	private int gynoexamid;
	
	
	@Column(name = "checkbox")
	private String checkbox;
	
	@Column(name = "master_pid",columnDefinition="int default 0")
	private int masterMainpId=0;
	
	
	public String getCheckbox() {
		return checkbox;
	}

	public void setCheckbox(String checkbox) {
		this.checkbox = checkbox;
	}

	public int getMasterMainpId() {
		return masterMainpId;
	}

	public void setMasterMainpId(int masterMainpId) {
		this.masterMainpId = masterMainpId;
	}
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "ivf_treatment_id")
	private int ivf_treatmentId;
	
	public int getIvf_treatmentId() {
		return ivf_treatmentId;
	}

	public void setIvf_treatmentId(int ivf_treatmentId) {
		this.ivf_treatmentId = ivf_treatmentId;
	}
	@Column(name = "date",columnDefinition="varchar(500) default ''")
	private String dateF="";
	

	@Column(name = "pa",columnDefinition="varchar(500) default ''")
	private String paA="";
	
	@Column(name = "ps",columnDefinition="varchar(500) default ''")
	private String psA="";
	
	@Column(name = "pv",columnDefinition="varchar(500) default ''")
	private String pvA="";
	
	@Column(name = "afcro",columnDefinition="varchar(500) default ''")
	private String afcroA="";
	
	@Column(name = "afclo",columnDefinition="varchar(500) default ''")
	private String afcloA="";
	
	@Column(name = "rodremark",columnDefinition="varchar(500) default ''")
	private String rodremarkA="";
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Column(name = "deleted_by")
	private int deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	
	@Column(name = "created_by")
	private int createdBy;
	
	@Column(name = "updated_by")
	private int updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;

	
	
	@Override
	public String toString() {
		return "GynoExamDto [gynoexamid=" + gynoexamid + ", patientId=" + patientId + ", treatmentId=" + treatmentId
				+ ", dateF=" + dateF + ", paA=" + paA + ", psA=" + psA + ", pvA=" + pvA + ", afcroA=" + afcroA
				+ ", afcloA=" + afcloA + ", rodremarkA=" + rodremarkA + ", createdDateTime=" + createdDateTime
				+ ", updatedDateTime=" + updatedDateTime + ", deletedBy=" + deletedBy + ", deleted=" + deleted
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", deletedDateTime=" + deletedDateTime
				+ ", listGynExam=" + listGynExam + "]";
	}
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	

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

	public int getGynoexamid() {
		return gynoexamid;
	}

	public void setGynoexamid(int gynoexamid) {
		this.gynoexamid = gynoexamid;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getDateF() {
		return dateF;
	}

	public void setDateF(String dateF) {
		this.dateF = dateF;
	}

	public String getPaA() {
		return paA;
	}

	public void setPaA(String paA) {
		this.paA = paA;
	}

	public String getPsA() {
		return psA;
	}

	public void setPsA(String psA) {
		this.psA = psA;
	}

	public String getPvA() {
		return pvA;
	}

	public void setPvA(String pvA) {
		this.pvA = pvA;
	}

	public String getAfcroA() {
		return afcroA;
	}

	public void setAfcroA(String afcroA) {
		this.afcroA = afcroA;
	}

	public String getAfcloA() {
		return afcloA;
	}

	public void setAfcloA(String afcloA) {
		this.afcloA = afcloA;
	}

	public String getRodremarkA() {
		return rodremarkA;
	}

	public void setRodremarkA(String rodremarkA) {
		this.rodremarkA = rodremarkA;
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

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
		this.deletedBy = deletedBy;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}
	@Transient
	private List<GynoExamDto> listGynExam;

	//private Object getlistGynExam;

	public List<GynoExamDto> getListGynExam() {
		return listGynExam;
	}

	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public void setListGynExam(List<GynoExamDto> listGynExam) {
		// TODO Auto-generated method stub
		this.listGynExam = listGynExam;
	}

	
	
	
	
	
	
}
