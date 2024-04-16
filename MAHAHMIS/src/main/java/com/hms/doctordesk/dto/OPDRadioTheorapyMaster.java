package com.hms.doctordesk.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
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

import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;

@Entity
@Table(name = "opd_radiothorapy_master")
public class OPDRadioTheorapyMaster {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "radio_theropy_master_id")
	private int radioTheropyMasterId;
	
	@Column(name = "uhid",columnDefinition="varchar(20) default ''")
	private String UHID="";
	
	@Column(name = "serum_creatinine",columnDefinition="varchar(100) default ''")
	private String serumCreatinine="";
	
	@Column(name = "radiation_technique_id",columnDefinition="int default 1")
	private int radiationTechniqueId;
	
	@Column(name = "radition_technique_name",columnDefinition="varchar(40) default ''")
	private String radiationTechniqueName="";
	
	
	
	
	@Column(name = "risk_factor",columnDefinition="varchar(500) default ''")
	private String riskFactor="";
	
	@Column(name = "instruction",columnDefinition="varchar(500) default ''")
	private String instruction="";
	
	@Column(name = "adviced_simulation_date",columnDefinition="varchar(30) default ''")
	private String advicedSimulationDate="";
	
	@Column(name = "adviced_simulation_time",columnDefinition="varchar(30) default ''")
	private String advicedSimulationTime="";
	
	@Column(name = "adviced_treatment_date",columnDefinition="varchar(30) default ''")
	private String advicedTreatmentDate="";
	
	@Column(name = "adviced_treatment_time",columnDefinition="varchar(30) default ''")
	private String advicedTreatmentTime="";
	
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
	List<OPDRadioTheorapyMaster>  getListOfOPDTheropyDTO;
	
	@OneToOne
	@JoinColumn(name="treatment_id")
	public TreatmentDto treatObj;
	
	@ManyToOne
	@JoinColumn(name="patient_id")
	public RegistrationDto patientObj;
	
	
	
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "radio_theropy_master_id", nullable = false)
	public List<OPDRadioTheropySlave> getListOfTheropySlaveDTO;




	public int getRadioTheropyMasterId() {
		return radioTheropyMasterId;
	}




	public void setRadioTheropyMasterId(int radioTheropyMasterId) {
		this.radioTheropyMasterId = radioTheropyMasterId;
	}




	public String getUHID() {
		return UHID;
	}




	public void setUHID(String uHID) {
		UHID = uHID;
	}




	public String getSerumCreatinine() {
		return serumCreatinine;
	}




	public void setSerumCreatinine(String serumCreatinine) {
		this.serumCreatinine = serumCreatinine;
	}




	public int getRadiationTechniqueId() {
		return radiationTechniqueId;
	}




	public void setRadiationTechniqueId(int radiationTechniqueId) {
		this.radiationTechniqueId = radiationTechniqueId;
	}




	public String getRiskFactor() {
		return riskFactor;
	}




	public void setRiskFactor(String riskFactor) {
		this.riskFactor = riskFactor;
	}




	public String getInstruction() {
		return instruction;
	}




	public void setInstruction(String instruction) {
		this.instruction = instruction;
	}




	public String getAdvicedSimulationDate() {
		return advicedSimulationDate;
	}




	public void setAdvicedSimulationDate(String advicedSimulationDate) {
		this.advicedSimulationDate = advicedSimulationDate;
	}




	public String getAdvicedSimulationTime() {
		return advicedSimulationTime;
	}




	public void setAdvicedSimulationTime(String advicedSimulationTime) {
		this.advicedSimulationTime = advicedSimulationTime;
	}




	public String getAdvicedTreatmentDate() {
		return advicedTreatmentDate;
	}




	public void setAdvicedTreatmentDate(String advicedTreatmentDate) {
		this.advicedTreatmentDate = advicedTreatmentDate;
	}




	public String getAdvicedTreatmentTime() {
		return advicedTreatmentTime;
	}




	public void setAdvicedTreatmentTime(String advicedTreatmentTime) {
		this.advicedTreatmentTime = advicedTreatmentTime;
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




	public List<OPDRadioTheorapyMaster> getGetListOfOPDTheropyDTO() {
		return getListOfOPDTheropyDTO;
	}




	public void setGetListOfOPDTheropyDTO(List<OPDRadioTheorapyMaster> getListOfOPDTheropyDTO) {
		this.getListOfOPDTheropyDTO = getListOfOPDTheropyDTO;
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




	public List<OPDRadioTheropySlave> getGetListOfTheropySlaveDTO() {
		return getListOfTheropySlaveDTO;
	}




	public void setGetListOfTheropySlaveDTO(List<OPDRadioTheropySlave> getListOfTheropySlaveDTO) {
		this.getListOfTheropySlaveDTO = getListOfTheropySlaveDTO;
	}




	public String getRadiationTechniqueName() {
		return radiationTechniqueName;
	}




	public void setRadiationTechniqueName(String radiationTechniqueName) {
		this.radiationTechniqueName = radiationTechniqueName;
	}
	
	
	
	

}
