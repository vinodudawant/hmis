package com.hms.doctordesk.dto;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="dd_cep_template")
public class CurrentEpisodeTemplate {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
    
    @Column(name="template_name")
    private String templateName;
    
    @Column(name="spc_id")
    private int specailzationId;
    
    @Column(name="organ_id")
    private int organId;
    
    @Column(name="fav_flag")
    private int favFlag=0;
    
    @Column(name="type")
    private int type;
    
    @Column(name="spc_name")
    private String spcName;
    
    @Column(name="org_name")
    private String orgName;
    
    @Column(name = "treatment_id")
	private int treatmentId;
	

	@Column(name="patient_id")
	private Integer patientId;
    
	// logs
	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDateTime;

	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDateTime;
	
	@Column(name = "user_id")
	private int userId;
	
	@Column(name = "created_by", updatable = false)
	private int createdBy;
	
	@Column(name = "updated_by")
	private int updatedBy;
	
	@Column(name = "deleted_by")
	private int deleted_by;
	
	@Column(name = "deleted", columnDefinition = "varchar(2) default 'N'")
	private String deleted = "N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getSpecailzationId() {
		return specailzationId;
	}

	public void setSpecailzationId(int specailzationId) {
		this.specailzationId = specailzationId;
	}

	public int getOrganId() {
		return organId;
	}

	public void setOrganId(int organId) {
		this.organId = organId;
	}

	public int getFavFlag() {
		return favFlag;
	}

	public void setFavFlag(int favFlag) {
		this.favFlag = favFlag;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getSpcName() {
		return spcName;
	}

	public void setSpcName(String spcName) {
		this.spcName = spcName;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
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

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
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

	public int getDeleted_by() {
		return deleted_by;
	}

	public void setDeleted_by(int deleted_by) {
		this.deleted_by = deleted_by;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;

	}

	public String getTemplateName() {
		return templateName;
	}

	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}
	
}
