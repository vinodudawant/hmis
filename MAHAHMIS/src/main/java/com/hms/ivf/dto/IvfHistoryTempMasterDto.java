package com.hms.ivf.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.doctordesk.dto.OPDHistoryMasterDTO;
import com.hms.doctordesk.dto.OPDHistorySlaveDTO;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TemplateIPDHistoryslave;
import com.hms.ehat.dto.TreatmentDto;

@Entity
@Table(name="ivf_history_temp_master_info")
public class IvfHistoryTempMasterDto {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "history_id")
	private int historyId;
	

	
	@Column(name = "template_id",columnDefinition="int default 1")
	private int templateId;
	
	@Column(name = "template_name",columnDefinition="varchar(100) default ''")
	private String templateName;
	
	@Column(name = "medical_officer_name",columnDefinition="varchar(100) default ''")
	private String medicalOfficerName;
	
	@Column(name = "mrn_no",columnDefinition="varchar(100) default ''")
	private String mrnNo;
	
	@Column(name = "chief_complaints",columnDefinition="varchar(500) default ''")
	private String chiefComplaints;
	
	@Column(name = "negative_history",columnDefinition="varchar(500) default ''")
	private String negativeHistory;
	
	@Column(name = "dm_flag",columnDefinition="varchar(20) default 'N'")
	private String dmFlag="N";
	
	@Column(name = "dm_duration",columnDefinition="varchar(20) default '0'")
	private String dmDuration="0";
	
	@Column(name = "htn_flag",columnDefinition="varchar(20) default 'N'")
	private String htnFlag="N";
	
	@Column(name = "htn_duration",columnDefinition="varchar(20) default '0'")
	private String htnDuration="0";
	
	@Column(name = "ihd_flag",columnDefinition="varchar(20) default 'N'")
	private String ihdFlag="N";
	
	@Column(name = "ihd_duration",columnDefinition="varchar(20) default '0'")
	private String ihdDuration="0";
	
	@Column(name = "ba_copd_flag",columnDefinition="varchar(20) default 'N'")
	private String bacopdFlag="N";
	
	@Column(name = "ba_copd_duration",columnDefinition="varchar(20) default '0'")
	private String bacopdDuration="0";
	
	
	@Column(name = "other_flag",columnDefinition="varchar(20) default 'N'")
	private String otherFlag="N";
	
	@Column(name = "other_duration",columnDefinition="varchar(200) default '0'")
	private String otherDuration="0";
	
	
	@Column(name = "past_surgical_history",columnDefinition="varchar(500) default ''")
	private String pastSurgicalHistory;
	
	@Column(name = "medications",columnDefinition="varchar(500) default ''")
	private String medications;
	
	@Column(name = "obs_history",columnDefinition="varchar(500) default ''")
	private String obsHistory;
	
	@Column(name = "any_allergy",columnDefinition="varchar(500) default ''")
	private String anyAllergy;
	
	@Column(name = "family_history",columnDefinition="varchar(500) default ''")
	private String familyHistory;
	
	@Column(name = "personal_history",columnDefinition="varchar(500) default ''")
	private String personalHistory;
	
	
	@Column(name = "temperature",columnDefinition="varchar(20) default ''")
	private String temperature;
	
	@Column(name = "pallor",columnDefinition="varchar(20) default ''")
	private String pallor;
	
	@Column(name = "icterus",columnDefinition="varchar(20) default ''")
	private String icterus;
	
	@Column(name = "pulse",columnDefinition="varchar(20) default ''")
	private String pulse;
	
	@Column(name = "clubbing",columnDefinition="varchar(20) default ''")
	private String clubbing;
	
	@Column(name = "oedema",columnDefinition="varchar(20) default ''")
	private String oedema;
	
	@Column(name = "bp",columnDefinition="varchar(20) default ''")
	private String bp;
	
	@Column(name = "lymph_adenopathy",columnDefinition="varchar(20) default ''")
	private String lymphAdenopathy;
	
	@Column(name = "cvs",columnDefinition="varchar(20) default ''")
	private String cvs;
	
	@Column(name = "rs",columnDefinition="varchar(20) default ''")
	private String rs;
	
	@Column(name = "pa",columnDefinition="varchar(20) default ''")
	private String pa;
	
	@Column(name = "cns",columnDefinition="varchar(20) default ''")
	private String cns;
	

	@Column(name = "local_examination",columnDefinition="varchar(500) default ''")
	private String localExamination;
	
	@Column(name = "investigation_report",columnDefinition="varchar(500) default ''")
	private String investigationReport;
	
	
	
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
	List<IvfHistoryTempMasterDto>  getListOfOPDHistoryDTO;
	
	@OneToOne
	@JoinColumn(name="treatment_id")
	public TreatmentDto treatObj;
	
	@ManyToOne
	@JoinColumn(name="patient_id")
	public RegistrationDto patientObj;
	
	@OneToOne
	@JoinColumn(name="ivf_treat_id")
	public IVFTreatmentDTO ivfTreatObj;
	
	
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "history_master_id", nullable = false)
	public List<IvfHistorySlaveDto> getListOfHistorySlaveDTO;

	public int getHistoryId() {
		return historyId;
	}

	public void setHistoryId(int historyId) {
		this.historyId = historyId;
	}

	

	

	public int getTemplateId() {
		return templateId;
	}

	public void setTemplateId(int templateId) {
		this.templateId = templateId;
	}

	public String getTemplateName() {
		return templateName;
	}

	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}

	public String getMedicalOfficerName() {
		return medicalOfficerName;
	}

	public void setMedicalOfficerName(String medicalOfficerName) {
		this.medicalOfficerName = medicalOfficerName;
	}

	public String getMrnNo() {
		return mrnNo;
	}

	public void setMrnNo(String mrnNo) {
		this.mrnNo = mrnNo;
	}

	public String getChiefComplaints() {
		return chiefComplaints;
	}

	public void setChiefComplaints(String chiefComplaints) {
		this.chiefComplaints = chiefComplaints;
	}

	public String getNegativeHistory() {
		return negativeHistory;
	}

	public void setNegativeHistory(String negativeHistory) {
		this.negativeHistory = negativeHistory;
	}

	public String getDmFlag() {
		return dmFlag;
	}

	public void setDmFlag(String dmFlag) {
		this.dmFlag = dmFlag;
	}

	public String getDmDuration() {
		return dmDuration;
	}

	public void setDmDuration(String dmDuration) {
		this.dmDuration = dmDuration;
	}

	public String getHtnFlag() {
		return htnFlag;
	}

	public void setHtnFlag(String htnFlag) {
		this.htnFlag = htnFlag;
	}

	public String getHtnDuration() {
		return htnDuration;
	}

	public void setHtnDuration(String htnDuration) {
		this.htnDuration = htnDuration;
	}

	public String getIhdFlag() {
		return ihdFlag;
	}

	public void setIhdFlag(String ihdFlag) {
		this.ihdFlag = ihdFlag;
	}

	public String getIhdDuration() {
		return ihdDuration;
	}

	public void setIhdDuration(String ihdDuration) {
		this.ihdDuration = ihdDuration;
	}

	public String getBacopdFlag() {
		return bacopdFlag;
	}

	public void setBacopdFlag(String bacopdFlag) {
		this.bacopdFlag = bacopdFlag;
	}

	public String getBacopdDuration() {
		return bacopdDuration;
	}

	public void setBacopdDuration(String bacopdDuration) {
		this.bacopdDuration = bacopdDuration;
	}

	public String getOtherFlag() {
		return otherFlag;
	}

	public void setOtherFlag(String otherFlag) {
		this.otherFlag = otherFlag;
	}

	public String getOtherDuration() {
		return otherDuration;
	}

	public void setOtherDuration(String otherDuration) {
		this.otherDuration = otherDuration;
	}

	public String getPastSurgicalHistory() {
		return pastSurgicalHistory;
	}

	public void setPastSurgicalHistory(String pastSurgicalHistory) {
		this.pastSurgicalHistory = pastSurgicalHistory;
	}

	public String getMedications() {
		return medications;
	}

	public void setMedications(String medications) {
		this.medications = medications;
	}

	public String getObsHistory() {
		return obsHistory;
	}

	public void setObsHistory(String obsHistory) {
		this.obsHistory = obsHistory;
	}

	public String getAnyAllergy() {
		return anyAllergy;
	}

	public void setAnyAllergy(String anyAllergy) {
		this.anyAllergy = anyAllergy;
	}

	public String getFamilyHistory() {
		return familyHistory;
	}

	public void setFamilyHistory(String familyHistory) {
		this.familyHistory = familyHistory;
	}

	public String getPersonalHistory() {
		return personalHistory;
	}

	public void setPersonalHistory(String personalHistory) {
		this.personalHistory = personalHistory;
	}

	public String getTemperature() {
		return temperature;
	}

	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}

	public String getPallor() {
		return pallor;
	}

	public void setPallor(String pallor) {
		this.pallor = pallor;
	}

	public String getIcterus() {
		return icterus;
	}

	public void setIcterus(String icterus) {
		this.icterus = icterus;
	}

	public String getPulse() {
		return pulse;
	}

	public void setPulse(String pulse) {
		this.pulse = pulse;
	}

	public String getClubbing() {
		return clubbing;
	}

	public void setClubbing(String clubbing) {
		this.clubbing = clubbing;
	}

	public String getOedema() {
		return oedema;
	}

	public void setOedema(String oedema) {
		this.oedema = oedema;
	}

	public String getBp() {
		return bp;
	}

	public void setBp(String bp) {
		this.bp = bp;
	}

	public String getLymphAdenopathy() {
		return lymphAdenopathy;
	}

	public void setLymphAdenopathy(String lymphAdenopathy) {
		this.lymphAdenopathy = lymphAdenopathy;
	}

	public String getCvs() {
		return cvs;
	}

	public void setCvs(String cvs) {
		this.cvs = cvs;
	}

	public String getRs() {
		return rs;
	}

	public void setRs(String rs) {
		this.rs = rs;
	}

	public String getPa() {
		return pa;
	}

	public void setPa(String pa) {
		this.pa = pa;
	}

	public String getCns() {
		return cns;
	}

	public void setCns(String cns) {
		this.cns = cns;
	}

	public String getLocalExamination() {
		return localExamination;
	}

	public void setLocalExamination(String localExamination) {
		this.localExamination = localExamination;
	}

	public String getInvestigationReport() {
		return investigationReport;
	}

	public void setInvestigationReport(String investigationReport) {
		this.investigationReport = investigationReport;
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



	public TreatmentDto getTreatObj() {
		return treatObj;
	}

	public void setTreatObj(TreatmentDto treatObj) {
		this.treatObj = treatObj;
	}

	public RegistrationDto getPatientObj() {
		return patientObj;
	}

	public void setPatientObj(RegistrationDto patientObj) {
		this.patientObj = patientObj;
	}

	public List<IvfHistoryTempMasterDto> getGetListOfOPDHistoryDTO() {
		return getListOfOPDHistoryDTO;
	}

	public void setGetListOfOPDHistoryDTO(List<IvfHistoryTempMasterDto> getListOfOPDHistoryDTO) {
		this.getListOfOPDHistoryDTO = getListOfOPDHistoryDTO;
	}

	public IVFTreatmentDTO getIvfTreatObj() {
		return ivfTreatObj;
	}

	public void setIvfTreatObj(IVFTreatmentDTO ivfTreatObj) {
		this.ivfTreatObj = ivfTreatObj;
	}

	public List<IvfHistorySlaveDto> getGetListOfHistorySlaveDTO() {
		return getListOfHistorySlaveDTO;
	}

	public void setGetListOfHistorySlaveDTO(List<IvfHistorySlaveDto> getListOfHistorySlaveDTO) {
		this.getListOfHistorySlaveDTO = getListOfHistorySlaveDTO;
	}

	@Override
	public String toString() {
		return "IvfHistoryTempMasterDto [historyId=" + historyId + ", templateId=" + templateId + ", templateName="
				+ templateName + ", medicalOfficerName=" + medicalOfficerName + ", mrnNo=" + mrnNo
				+ ", chiefComplaints=" + chiefComplaints + ", negativeHistory=" + negativeHistory + ", dmFlag=" + dmFlag
				+ ", dmDuration=" + dmDuration + ", htnFlag=" + htnFlag + ", htnDuration=" + htnDuration + ", ihdFlag="
				+ ihdFlag + ", ihdDuration=" + ihdDuration + ", bacopdFlag=" + bacopdFlag + ", bacopdDuration="
				+ bacopdDuration + ", otherFlag=" + otherFlag + ", otherDuration=" + otherDuration
				+ ", pastSurgicalHistory=" + pastSurgicalHistory + ", medications=" + medications + ", obsHistory="
				+ obsHistory + ", anyAllergy=" + anyAllergy + ", familyHistory=" + familyHistory + ", personalHistory="
				+ personalHistory + ", temperature=" + temperature + ", pallor=" + pallor + ", icterus=" + icterus
				+ ", pulse=" + pulse + ", clubbing=" + clubbing + ", oedema=" + oedema + ", bp=" + bp
				+ ", lymphAdenopathy=" + lymphAdenopathy + ", cvs=" + cvs + ", rs=" + rs + ", pa=" + pa + ", cns=" + cns
				+ ", localExamination=" + localExamination + ", investigationReport=" + investigationReport
				+ ", createdDateTime=" + createdDateTime + ", updatedDateTime=" + updatedDateTime + ", deletedBy="
				+ deletedBy + ", deleted=" + deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deletedDateTime=" + deletedDateTime + ", unitId=" + unitId + ", userId=" + userId
				+ ", getListOfOPDHistoryDTO=" + getListOfOPDHistoryDTO + ", treatObj=" + treatObj + ", patientObj="
				+ patientObj + ", ivfTreatObj=" + ivfTreatObj + ", getListOfHistorySlaveDTO=" + getListOfHistorySlaveDTO
				+ "]";
	}

	
	
	
	
	


}
