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
@Table(name = "ehat_follicular_study_slave")
public class IVFFollicularStudy {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "idehat_follicular_study_slave")
	private int studyid;
	/*private int mid;*/
	@Transient
	private int treatmentId;
	
	@Column(name = "Patient_ID")
	private int patientId;
	
	@Column(name = "start_date")
	private String start_date;
	
	@Column(name = "end_date")
	private String end_date;
	
	@Column(name = "study_status")
	private String study_status;
	
	@Column(name = "status",columnDefinition="varchar(2) default 'Y'")
	private String status="Y";
	
	/*newly added fields*/
	@Column(name = "age")
	private String age;
	
	@Column(name = "weight")
	private String weight;
	
	@Column(name = "height")
	private String height;
	
	@Column(name = "bmi")
	private String bmi;
	
	@Column(name = "afc")
	private String afc;
	
	@Column(name = "rx")
	private String rx;
	
	@Column(name = "hsg")
	private String hsg;
	
	@Column(name = "hsa")
	private String hsa;
	
	
	private String amhDate;
	private String lhDate;
	private String fshDate;
	private String tshDate;
	private String prlDate;
	
	@Column(name = "protocol_f")
	private String protocoloF;
	
	@Column(name = "save_from")
	private String saveFrom;
	
	@Column(name = "couple_id")
	private String coupleId;
	
	@Column(name = "lmp_date")
	private String lmpdate;
	
	//@Column(name = "couple_id",columnDefinition="int default 1")
	//private int ivfCoupleId=1;
	
	
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
	private List<IVFFollicularStudy> StudyList;
	
	public int getStudyid() {
		return studyid;
	}
	public void setStudyid(int studyid) {
		this.studyid = studyid;
	}
	/*public int getMid() {
		return mid;
	}
	public void setMid(int mid) {
		this.mid = mid;
	}*/
	public String getStart_date() {
		return start_date;
	}
	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}
	public String getEnd_date() {
		return end_date;
	}
	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}
	public String getStudy_status() {
		return study_status;
	}
	public void setStudy_status(String study_status) {
		this.study_status = study_status;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getTreatmentId() {
		return treatmentId;
	}
	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}
	public int getPatientId() {
		return patientId;
	}
	public void setPatientId(int patientId) {
		this.patientId = patientId;
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
	public String getAmhDate() {
		return amhDate;
	}
	public void setAmhDate(String amhDate) {
		this.amhDate = amhDate;
	}
	public String getLhDate() {
		return lhDate;
	}
	public void setLhDate(String lhDate) {
		this.lhDate = lhDate;
	}
	public String getFshDate() {
		return fshDate;
	}
	public void setFshDate(String fshDate) {
		this.fshDate = fshDate;
	}
	public String getTshDate() {
		return tshDate;
	}
	public void setTshDate(String tshDate) {
		this.tshDate = tshDate;
	}
	public String getPrlDate() {
		return prlDate;
	}
	public void setPrlDate(String prlDate) {
		this.prlDate = prlDate;
	}
	public String getProtocoloF() {
		return protocoloF;
	}
	public void setProtocoloF(String protocoloF) {
		this.protocoloF = protocoloF;
	}
	public String getSaveFrom() {
		return saveFrom;
	}
	public void setSaveFrom(String saveFrom) {
		this.saveFrom = saveFrom;
	}
	public String getCoupleId() {
		return coupleId;
	}
	public void setCoupleId(String coupleId) {
		this.coupleId = coupleId;
	}
	public String getLmpdate() {
		return lmpdate;
	}
	public void setLmpdate(String lmpdate) {
		this.lmpdate = lmpdate;
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
	public List<IVFFollicularStudy> getStudyList() {
		return StudyList;
	}
	public void setStudyList(List<IVFFollicularStudy> studyList) {
		StudyList = studyList;
	}
	
	


}
