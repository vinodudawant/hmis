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
@Table(name="fm_follicular_data")
public class FmFollicularData {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "follicylar_master_id")
	 Integer follicylarMasterId;
	
	@Column(name = "lmpdate",columnDefinition="varchar(20) default ''")
	String lmpDate="";
	
	@Column(name = "age",columnDefinition="varchar(30) default ''")
	private String age="";
	
	@Column(name = "weight",columnDefinition="varchar(20) default ''")
	private String weight="";
	
	@Column(name = "height",columnDefinition="varchar(20) default ''")
	private String height="";
	
	@Column(name = "bmi",columnDefinition="varchar(30) default ''")
	private String bmi="";
	
	@Column(name = "afc",columnDefinition="varchar(20) default ''")
	private String afc="";
	
	@Column(name = "rx",columnDefinition="varchar(20) default ''")
	private String rx="";
	
	@Column(name = "hsg",columnDefinition="varchar(20) default ''")
	private String hsg="";
	
	@Column(name = "hsa",columnDefinition="varchar(20) default ''")
	private String hsa="";
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "masterFollicularStudyId",columnDefinition="varchar(20) default ''")
	private String  masterFollicularStudyId="";
	
	
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
	
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by",updatable=true)
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	
	@Transient
	List<FmFollicularData>  getListOfFMDTO;

	public Integer getFollicylarMasterId() {
		return follicylarMasterId;
	}

	public void setFollicylarMasterId(Integer follicylarMasterId) {
		this.follicylarMasterId = follicylarMasterId;
	}

	public String getLmpDate() {
		return lmpDate;
	}

	public void setLmpDate(String lmpDate) {
		this.lmpDate = lmpDate;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public String getBmi() {
		return bmi;
	}

	public void setBmi(String bmi) {
		this.bmi = bmi;
	}

	public String getAfc() {
		return afc;
	}

	public void setAfc(String afc) {
		this.afc = afc;
	}

	public String getRx() {
		return rx;
	}

	public void setRx(String rx) {
		this.rx = rx;
	}

	public String getHsg() {
		return hsg;
	}

	public void setHsg(String hsg) {
		this.hsg = hsg;
	}

	public String getHsa() {
		return hsa;
	}

	public void setHsa(String hsa) {
		this.hsa = hsa;
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

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
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

	public List<FmFollicularData> getGetListOfFMDTO() {
		return getListOfFMDTO;
	}

	public void setGetListOfFMDTO(List<FmFollicularData> getListOfFMDTO) {
		this.getListOfFMDTO = getListOfFMDTO;
	}

	public String getMasterFollicularStudyId() {
		return masterFollicularStudyId;
	}

	public void setMasterFollicularStudyId(String masterFollicularStudyId) {
		this.masterFollicularStudyId = masterFollicularStudyId;
	}
	
	

	
	
}
