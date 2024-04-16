package com.hms.dto;

import java.io.Serializable;

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

import com.hms.ehat.dto.RisTempateDto;

@Entity 
@Table(name = "ehat_radiology_test_report")
public class RadiologyTemplateReportDTO implements Serializable{

	public List<RisTempateDto> getLstRisTemplate() {
		return lstRisTemplate;
	}

	public void setLstRisTemplate(List<RisTempateDto> lstRisTemplate) {
		this.lstRisTemplate = lstRisTemplate;
	}

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "idradiology_test_report")
//	int idRadiologyTestReport=0;
	Integer idRadiologyTestReport;
	
	@Column(name = "patient_id")
	int patientId=0;
	
	@Column(name = "treatment_id")
	int treatmentId=0;
	
	@Column(name = "template_id")
	int templateId=0;
	
	@Column(name = "test_id")
	int testId=0;
	
	@Column(name = "template_type_id")
	private int templateTypeId; 
	
	@Column(name = "radiology_test_id")
	private int radiologyTestId;
	
	@Column(name = "note")
	String templateData="-";
	
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
	
	@Column(name = "reason_to_update")
	private String reasonToUpdate;
	
	@Column(name = "nuclear_note")
	private String nuclearData;
	
	@Column(name = "nuclear_created_by",updatable=false)
	private Integer nuclearCreatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "nuclear_created_date_time",updatable=false)
	private Date nuclearCreatedDate;
	
	@Transient
	private String groupName;
	
	@Transient
	private Integer doctorId;
	
	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	
	@Column(name = "template_name")
	private String templateName;		//aniket kanse / added on 03 DEC 2020

	@Transient
	private List<RadiologyTemplateReportDTO> listRadiologyTempReportDTO;
	
	@Transient
	private List<RisTempateDto> lstRisTemplate;

	public String getNuclearData() {
		return nuclearData;
	}

	public void setNuclearData(String nuclearData) {
		this.nuclearData = nuclearData;
	}
	
	public Integer getNuclearCreatedBy() {
		return nuclearCreatedBy;
	}

	public void setNuclearCreatedBy(Integer nuclearCreatedBy) {
		this.nuclearCreatedBy = nuclearCreatedBy;
	}

	public Date getNuclearCreatedDate() {
		return nuclearCreatedDate;
	}

	public void setNuclearCreatedDate(Date nuclearCreatedDate) {
		this.nuclearCreatedDate = nuclearCreatedDate;
	}

	public Integer getIdRadiologyTestReport() {
		return idRadiologyTestReport;
	}

	public void setIdRadiologyTestReport(Integer idRadiologyTestReport) {
		this.idRadiologyTestReport = idRadiologyTestReport;
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

	

	public int getTemplateId() {
		return templateId;
	}

	public void setTemplateId(int templateId) {
		this.templateId = templateId;
	}

	public int getTestId() {
		return testId;
	}

	public void setTestId(int testId) {
		this.testId = testId;
	}

	public int getTemplateTypeId() {
		return templateTypeId;
	}

	public void setTemplateTypeId(int templateTypeId) {
		this.templateTypeId = templateTypeId;
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

	public List<RadiologyTemplateReportDTO> getListRadiologyTempReportDTO() {
		return listRadiologyTempReportDTO;
	}

	public void setListRadiologyTempReportDTO(
			List<RadiologyTemplateReportDTO> listRadiologyTempReportDTO) {
		this.listRadiologyTempReportDTO = listRadiologyTempReportDTO;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public int getRadiologyTestId() {
		return radiologyTestId;
	}

	public void setRadiologyTestId(int radiologyTestId) {
		this.radiologyTestId = radiologyTestId;
	}

	public String getReasonToUpdate() {
		return reasonToUpdate;
	}

	public void setReasonToUpdate(String reasonToUpdate) {
		this.reasonToUpdate = reasonToUpdate;
	}
	
	@Transient
	private String testName;
	
	
	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}

	public Integer getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
	}

	public String getTemplateName() {
		return templateName;
	}

	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}

	@Override
	public String toString() {
		return "RadiologyTemplateReportDTO [idRadiologyTestReport=" + idRadiologyTestReport + ", patientId=" + patientId
				+ ", treatmentId=" + treatmentId + ", templateId=" + templateId + ", testId=" + testId
				+ ", templateTypeId=" + templateTypeId + ", radiologyTestId=" + radiologyTestId + ", templateData="
				+ templateData + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", createdDate="
				+ createdDate + ", updatedDate=" + updatedDate + ", status=" + status + ", reasonToUpdate="
				+ reasonToUpdate + ", nuclearData=" + nuclearData + ", nuclearCreatedBy=" + nuclearCreatedBy
				+ ", nuclearCreatedDate=" + nuclearCreatedDate + ", groupName=" + groupName + ", doctorId=" + doctorId
				+ ", templateName=" + templateName + ", listRadiologyTempReportDTO=" + listRadiologyTempReportDTO
				+ ", lstRisTemplate=" + lstRisTemplate + ", testName=" + testName + "]";
	}


	
}
