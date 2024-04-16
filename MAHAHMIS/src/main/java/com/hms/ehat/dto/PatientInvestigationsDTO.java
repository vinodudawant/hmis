package com.hms.ehat.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity 
@Immutable
@Table(name = "ehat_view_doc_desk_investigations")
public class PatientInvestigationsDTO {

	@Id
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "template_id")
	private Integer templateId;
	
	@Column(name = "template_name")
	private String templateName;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "investigation")
	private String investigation;
	
	@Column(name = "test_report_id") // primary key of test report in table "ehat_radiology_test_report"
	private Integer testReportId;
	
	@Column(name = "idradiology_test")
	private Integer idRadiologyTest;
	
	@Column(name = "test_id")
	private Integer testId;
	
	@Column(name = "pkViewRisRecordsDTO")
	private Integer pkViewRisRecordsDTO;
	
	@Transient
	private List<PatientInvestigationsDTO> listPatientInvestigations;

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

	public String getInvestigation() {
		return investigation;
	}

	public void setInvestigation(String investigation) {
		this.investigation = investigation;
	}

	public Integer getTemplateId() {
		return templateId;
	}

	public void setTemplateId(Integer templateId) {
		this.templateId = templateId;
	}

	public String getTemplateName() {
		return templateName;
	}

	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}

	public List<PatientInvestigationsDTO> getListPatientInvestigations() {
		return listPatientInvestigations;
	}

	public void setListPatientInvestigations(
			List<PatientInvestigationsDTO> listPatientInvestigations) {
		this.listPatientInvestigations = listPatientInvestigations;
	}
	

	public Integer getTestReportId() {
		return testReportId;
	}

	public void setTestReportId(Integer testReportId) {
		this.testReportId = testReportId;
	}
	
	public Integer getIdRadiologyTest() {
		return idRadiologyTest;
	}

	public void setIdRadiologyTest(Integer idRadiologyTest) {
		this.idRadiologyTest = idRadiologyTest;
	}

	public Integer getTestId() {
		return testId;
	}

	public void setTestId(Integer testId) {
		this.testId = testId;
	}

	public Integer getPkViewRisRecordsDTO() {
		return pkViewRisRecordsDTO;
	}

	public void setPkViewRisRecordsDTO(Integer pkViewRisRecordsDTO) {
		this.pkViewRisRecordsDTO = pkViewRisRecordsDTO;
	}

	@Override
	public String toString() {
		return "PatientInvestigationsDTO [patientId=" + patientId
				+ ", templateId=" + templateId + ", templateName="
				+ templateName + ", treatmentId=" + treatmentId
				+ ", investigation=" + investigation + ", testReportId="
				+ testReportId + ", idRadiologyTest=" + idRadiologyTest
				+ ", testId=" + testId + ", pkViewRisRecordsDTO="
				+ pkViewRisRecordsDTO + ", listPatientInvestigations="
				+ listPatientInvestigations + "]";
	}

	

	
}
