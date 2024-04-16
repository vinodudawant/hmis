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

import com.hms.administrator.dto.CustomizeTemplate;

@Entity
@Table(name="ehat_ot_patient_consentform")
public class OTConsentFormDTO implements Serializable{
	
	@Id
	@GeneratedValue
	@Column(name = "ot_consent_form_id")
	private Integer otConsentFormId;

	@Column(name = "temp_list_id")
	private String tempListId;
	
	@Column(name = "template_data")
	private String templateData;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = "status")
	private String status;
	
	@Transient
	private List<OTConsentFormDTO> lstOtConsentForm;
	
	@Transient
	private List<CustomizeTemplate> lstTemplateNames;
	
	public List<CustomizeTemplate> getLstTemplateNames() {
		return lstTemplateNames;
	}

	public void setLstTemplateNames(List<CustomizeTemplate> lstTemplateNames) {
		this.lstTemplateNames = lstTemplateNames;
	}

	public List<OTConsentFormDTO> getLstOtConsentForm() {
		return lstOtConsentForm;
	}

	public void setLstOtConsentForm(List<OTConsentFormDTO> lstOtConsentForm) {
		this.lstOtConsentForm = lstOtConsentForm;
	}

	public Integer getOtConsentFormId() {
		return otConsentFormId;
	}

	public void setOtConsentFormId(Integer otConsentFormId) {
		this.otConsentFormId = otConsentFormId;
	}

	public String getTempListId() {
		return tempListId;
	}

	public void setTempListId(String tempListId) {
		this.tempListId = tempListId;
	}

	public String getTemplateData() {
		return templateData;
	}

	public void setTemplateData(String templateData) {
		this.templateData = templateData;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
