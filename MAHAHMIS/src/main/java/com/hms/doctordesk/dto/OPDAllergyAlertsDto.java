package com.hms.doctordesk.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;

@Entity
@Table(name = "opd_allergy_allerts")
public class OPDAllergyAlertsDto {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "allergy_alerts_id")
	private int allergyAlertsId;
	
	@OneToOne
	@JoinColumn(name="treatment_id")
	public TreatmentDto treatmentDto;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@JoinColumn(name="patient_id")
	public RegistrationDto registrationDto;
	
	@Column(name = "allergy_name", columnDefinition="varchar(100) default ''")
	private String 	allergyName="";
	
	@Column(name = "allergy_type")
	private Integer allergyType;
	
	@Column(name = "allergy_reaction", columnDefinition="varchar(100) default ''")
	private String 	allergyReaction="";
	
	@Column(name = "allergy_date", columnDefinition="varchar(100) default ''")
	private String 	allergyDate="";
	
	@Column(name = "allergy_notes", columnDefinition="varchar(500) default ''")
	private String 	allergyNotes="";
	
	//Metadata
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by",updatable=true)
	private Integer updatedBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private Integer unitId;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private Integer userId;
	
	@Transient
	List<OPDAllergyAlertsDto>  listOPDAllergyAlertsDto;

	public int getAllergyAlertsId() {
		return allergyAlertsId;
	}

	public void setAllergyAlertsId(int allergyAlertsId) {
		this.allergyAlertsId = allergyAlertsId;
	}

	public TreatmentDto getTreatmentDto() {
		return treatmentDto;
	}

	public void setTreatmentDto(TreatmentDto treatmentDto) {
		this.treatmentDto = treatmentDto;
	}

	public RegistrationDto getRegistrationDto() {
		return registrationDto;
	}

	public void setRegistrationDto(RegistrationDto registrationDto) {
		this.registrationDto = registrationDto;
	}

	public String getAllergyName() {
		return allergyName;
	}

	public void setAllergyName(String allergyName) {
		this.allergyName = allergyName;
	}

	public Integer getAllergyType() {
		return allergyType;
	}

	public void setAllergyType(Integer allergyType) {
		this.allergyType = allergyType;
	}

	public String getAllergyReaction() {
		return allergyReaction;
	}

	public void setAllergyReaction(String allergyReaction) {
		this.allergyReaction = allergyReaction;
	}

	public String getAllergyDate() {
		return allergyDate;
	}

	public void setAllergyDate(String allergyDate) {
		this.allergyDate = allergyDate;
	}

	public String getAllergyNotes() {
		return allergyNotes;
	}

	public void setAllergyNotes(String allergyNotes) {
		this.allergyNotes = allergyNotes;
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

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
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

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public List<OPDAllergyAlertsDto> getListOPDAllergyAlertsDto() {
		return listOPDAllergyAlertsDto;
	}

	public void setListOPDAllergyAlertsDto(List<OPDAllergyAlertsDto> listOPDAllergyAlertsDto) {
		this.listOPDAllergyAlertsDto = listOPDAllergyAlertsDto;
	}

	@Override
	public String toString() {
		return "OPDAllergyAlertsDto [allergyAlertsId=" + allergyAlertsId + ", treatmentDto=" + treatmentDto
				+ ", registrationDto=" + registrationDto + ", allergyName=" + allergyName + ", allergyType="
				+ allergyType + ", allergyReaction=" + allergyReaction + ", allergyDate=" + allergyDate
				+ ", allergyNotes=" + allergyNotes + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", createdDate=" + createdDate + ", updatedDate=" + updatedDate + ", deletedDate=" + deletedDate
				+ ", deletedBy=" + deletedBy + ", deleted=" + deleted + ", unitId=" + unitId + ", userId=" + userId
				+ ", listOPDAllergyAlertsDto=" + listOPDAllergyAlertsDto + "]";
	}
	

}
