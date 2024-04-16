package com.hms.dto;

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
@Table(name="doctor_specilities")
public class DoctorSpecility {
	@Id
	@GeneratedValue
	@Column(name = "iddoctor_specilities")
	private int idDoctorSpecilities;
	
	@Column(name = "spl_name")
	private String specialityName;
	
	@Column(name = "wd_consultation")
	private int wdConsultation;
	
	@Column(name = "wd_followup")
	private int wdFolloup;
	
	@Column(name = "we_consultation")
	private int weConsultation;
	
	@Column(name = "we_followup")
	private int weFolloup;
	
	@Column(name = "status",columnDefinition="varchar(2) default 'Y'")
	private String status;
	
	
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
	
	
	private Integer corporateAcId;

	@JsonGetter("corporateId")
	public Integer getCorporateAcId() {
		return corporateAcId;
	}

	@JsonSetter("corporateId")
	public void setCorporateAcId(Integer corporateAcId) {
		this.corporateAcId = corporateAcId;
	}

	@Transient
	private List<DoctorSpecility> listDoctorSpecility;

	@JsonGetter("liDocSpl")
	public List<DoctorSpecility> getListDoctorSpecility() {
		return listDoctorSpecility;
	}

	public void setListDoctorSpecility(List<DoctorSpecility> listDoctorSpecility) {
		this.listDoctorSpecility = listDoctorSpecility;
	}

	@JsonGetter("idDocSpl")
	public int getIdDoctorSpecilities() {
		return idDoctorSpecilities;
	}

	public void setIdDoctorSpecilities(int idDoctorSpecilities) {
		this.idDoctorSpecilities = idDoctorSpecilities;
	}

	@JsonGetter("splNm")
	public String getSpecialityName() {
		return specialityName;
	}

	public void setSpecialityName(String specialityName) {
		this.specialityName = specialityName;
	}

	@JsonGetter("wdCon")
	public int getWdConsultation() {
		return wdConsultation;
	}

	public void setWdConsultation(int wdConsultation) {
		this.wdConsultation = wdConsultation;
	}

	@JsonGetter("wdFl")
	public int getWdFolloup() {
		return wdFolloup;
	}

	public void setWdFolloup(int wdFolloup) {
		this.wdFolloup = wdFolloup;
	}

	@JsonGetter("weCon")
	public int getWeConsultation() {
		return weConsultation;
	}

	public void setWeConsultation(int weConsultation) {
		this.weConsultation = weConsultation;
	}

	@JsonGetter("weFl")
	public int getWeFolloup() {
		return weFolloup;
	}

	public void setWeFolloup(int weFolloup) {
		this.weFolloup = weFolloup;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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
	

}
