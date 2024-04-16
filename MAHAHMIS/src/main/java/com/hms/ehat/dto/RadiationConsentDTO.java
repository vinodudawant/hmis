package com.hms.ehat.dto;
import java.io.Serializable;
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

import org.hibernate.annotations.Immutable;

@Entity 
@Table(name = "ehat_radiation_consent_form")
public class RadiationConsentDTO implements Serializable {
	
	@Id
	@GeneratedValue
	@Column(name = "consent_form_id")
	private Integer consentFormId;	
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "customize_template_id")
	private String customizeTemplateId;
	
	
	@Column(name = "template_data")
	private String templateData;
	
	@Column(name = "date")
	private String date;
	
	@Transient
	private String queryType;
	
	@Column(name = "added_by",updatable=false)
	private int addedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "added_date",updatable=false)
	private Date addedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date")
	private Date updatedDate;
	
	@Column(name = "updated_by")
	private int updatedBy;
	
	@Transient
	private List<RadiationConsentDTO> consentList;

	public Integer getConsentFormId() {
		return consentFormId;
	}

	public void setConsentFormId(Integer consentFormId) {
		this.consentFormId = consentFormId;
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

	public String getCustomizeTemplateId() {
		return customizeTemplateId;
	}

	public void setCustomizeTemplateId(String customizeTemplateId) {
		this.customizeTemplateId = customizeTemplateId;
	}

	public String getTemplateData() {
		return templateData;
	}

	public void setTemplateData(String templateData) {
		this.templateData = templateData;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getQueryType() {
		return queryType;
	}

	public void setQueryType(String queryType) {
		this.queryType = queryType;
	}

	public int getAddedBy() {
		return addedBy;
	}

	public void setAddedBy(int addedBy) {
		this.addedBy = addedBy;
	}

	public Date getAddedDate() {
		return addedDate;
	}

	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public List<RadiationConsentDTO> getConsentList() {
		return consentList;
	}

	public void setConsentList(List<RadiationConsentDTO> consentList) {
		this.consentList = consentList;
	}
	
	
}
