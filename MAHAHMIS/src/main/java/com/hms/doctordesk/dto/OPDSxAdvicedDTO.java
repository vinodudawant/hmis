package com.hms.doctordesk.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
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

import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;

@Entity
@Table(name = "opd_sx_adviced_master")
public class OPDSxAdvicedDTO {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "sx_adviced_master_id")
	private int sxAdviceMasterId;
	
	@Column(name = "procedure_type_id",columnDefinition="int default 0")
	private int procedureTypeId;
	
	@Column(name = "procedure_group_id",columnDefinition="int default 0")
	private int procedureGroupId;
	
	@Column(name = "procedure_name_id",columnDefinition="int default 0")
	private int procedureNameId;
	
	@Column(name = "procedure_name",columnDefinition="varchar(100) default 'N'")
	private String procedureName="";
	
	@Column(name = "radical_flag",columnDefinition="varchar(2) default 'N'")
	private String radicalFlag="N";
	
	@Column(name = "palliative_flag",columnDefinition="varchar(2) default 'N'")
	private String palliativeFlag="N";
	
	@Column(name = "indication_of_surgery",columnDefinition="varchar(500) default ''")
	private String indicationOfSurgery;
	
	@Column(name = "risk_factor",columnDefinition="varchar(500) default ''")
	private String riskFactor;
	
	@Column(name = "advice_date",columnDefinition="varchar(50) default ''")
	private String adviceDate;
	
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
	List<OPDSxAdvicedDTO>  getListOfOPDSxAdviceDTO;
	
	@OneToOne
	@JoinColumn(name="treatment_id")
	public TreatmentDto treatObj;
	
	@ManyToOne
	@JoinColumn(name="patient_id")
	public RegistrationDto patientObj;

	public int getSxAdviceMasterId() {
		return sxAdviceMasterId;
	}

	public void setSxAdviceMasterId(int sxAdviceMasterId) {
		this.sxAdviceMasterId = sxAdviceMasterId;
	}

	public int getProcedureTypeId() {
		return procedureTypeId;
	}

	public void setProcedureTypeId(int procedureTypeId) {
		this.procedureTypeId = procedureTypeId;
	}

	public int getProcedureGroupId() {
		return procedureGroupId;
	}

	public void setProcedureGroupId(int procedureGroupId) {
		this.procedureGroupId = procedureGroupId;
	}

	public int getProcedureNameId() {
		return procedureNameId;
	}

	public void setProcedureNameId(int procedureNameId) {
		this.procedureNameId = procedureNameId;
	}

	public String getIndicationOfSurgery() {
		return indicationOfSurgery;
	}

	public void setIndicationOfSurgery(String indicationOfSurgery) {
		this.indicationOfSurgery = indicationOfSurgery;
	}

	public String getRiskFactor() {
		return riskFactor;
	}

	public void setRiskFactor(String riskFactor) {
		this.riskFactor = riskFactor;
	}

	public String getAdviceDate() {
		return adviceDate;
	}

	public void setAdviceDate(String adviceDate) {
		this.adviceDate = adviceDate;
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

	public List<OPDSxAdvicedDTO> getGetListOfOPDSxAdviceDTO() {
		return getListOfOPDSxAdviceDTO;
	}

	public void setGetListOfOPDSxAdviceDTO(List<OPDSxAdvicedDTO> getListOfOPDSxAdviceDTO) {
		this.getListOfOPDSxAdviceDTO = getListOfOPDSxAdviceDTO;
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

	public String getRadicalFlag() {
		return radicalFlag;
	}

	public void setRadicalFlag(String radicalFlag) {
		this.radicalFlag = radicalFlag;
	}

	public String getPalliativeFlag() {
		return palliativeFlag;
	}

	public void setPalliativeFlag(String palliativeFlag) {
		this.palliativeFlag = palliativeFlag;
	}

	public String getProcedureName() {
		return procedureName;
	}

	public void setProcedureName(String procedureName) {
		this.procedureName = procedureName;
	}
	
	
	
	
	
}
