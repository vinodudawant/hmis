package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity 
@Table(name = "ehat_emr_patient_template")
public class EhatEMRPatientTemplate implements Serializable{

	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "idehat_emr_patient_template")
	private Integer idEhatEmrTemp;
	
	@Column(name = "patient_id")
	private Integer patientId;

	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "question_id")
	private Integer questionId;
	
	@Column(name = "option_id")
	private Integer optionId=0;
	
	@Column(name = "text_val")
	private String textVal="-";
	
	@Column(name = "assigned_by",updatable=false)
	private Integer addedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "assigned_date_time")
	private Date addedOn;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedOn;
	
	@Column(name = "status_complaint_findings",columnDefinition="varchar(2) default 'N'")
	private String status="N";
	
	@Transient
	private String optionName;
	@Transient
	private String questionName;
	
	@Transient
	private Map map;
	
	public Map getMap() {
		return map;
	}

	public void setMap(Map map) {
		this.map = map;
	}

	public String getOptionName() {
		return optionName;
	}

	public void setOptionName(String optionName) {
		this.optionName = optionName;
	}

	public String getQuestionName() {
		return questionName;
	}

	public void setQuestionName(String questionName) {
		this.questionName = questionName;
	}

	@Transient
	private List<EhatEMRPatientTemplate> listTemp;
	
	@Transient
	private List<QuestionMasterDto> listQue;
	
	@Transient
	private List<QuestionOptionMasterDto> listOption;

	public Integer getIdEhatEmrTemp() {
		return idEhatEmrTemp;
	}

	public void setIdEhatEmrTemp(Integer idEhatEmrTemp) {
		this.idEhatEmrTemp = idEhatEmrTemp;
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

	public Integer getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}

	public Integer getOptionId() {
		return optionId;
	}

	public void setOptionId(Integer optionId) {
		this.optionId = optionId;
	}

	public String getTextVal() {
		return textVal;
	}

	public void setTextVal(String textVal) {
		this.textVal = textVal;
	}

	public Integer getAddedBy() {
		return addedBy;
	}

	public void setAddedBy(Integer addedBy) {
		this.addedBy = addedBy;
	}

	public Date getAddedOn() {
		return addedOn;
	}

	public void setAddedOn(Date addedOn) {
		this.addedOn = addedOn;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedOn() {
		return updatedOn;
	}

	public void setUpdatedOn(Date updatedOn) {
		this.updatedOn = updatedOn;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<EhatEMRPatientTemplate> getListTemp() {
		return listTemp;
	}

	public void setListTemp(List<EhatEMRPatientTemplate> listTemp) {
		this.listTemp = listTemp;
	}

	public List<QuestionMasterDto> getListQue() {
		return listQue;
	}

	public void setListQue(List<QuestionMasterDto> listQue) {
		this.listQue = listQue;
	}

	public List<QuestionOptionMasterDto> getListOption() {
		return listOption;
	}

	public void setListOption(List<QuestionOptionMasterDto> listOption) {
		this.listOption = listOption;
	}
	
	
}
