package com.hms.ivf.dto;

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
@Table(name = "ivf_coversheet_vital_info")
public class IvfCoverSheetVitalDTO {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "coversheet_vital_master_id")
	private int vitalMasterId;
	
	@Column(name = "vital_value",columnDefinition="varchar(20) default ''")
	private String vitalValue="";
	
	@Column(name = "result",columnDefinition="varchar(20) default ''")
	private String result="";
	
	@Column(name = "vital_date",columnDefinition="varchar(20) default ''")
	private String vitalDate="";
	
	@Column(name = "uhid",columnDefinition="varchar(30) default ''")
	private String uhid="";
	
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
	
	@OneToOne
	@JoinColumn(name="treatment_id")
	public TreatmentDto treatObj;
	
	@ManyToOne
	@JoinColumn(name="patient_id")
	public RegistrationDto patientObj;
	
	@OneToOne
	@JoinColumn(name="ivf_treat_id")
	public IVFTreatmentDTO ivfTreatObj;
	
	
	@Transient
	List<IvfCoverSheetVitalDTO>  getListOfOPDCoversheetVitalDTO;


	public int getVitalMasterId() {
		return vitalMasterId;
	}


	public void setVitalMasterId(int vitalMasterId) {
		this.vitalMasterId = vitalMasterId;
	}


	public String getVitalValue() {
		return vitalValue;
	}


	public void setVitalValue(String vitalValue) {
		this.vitalValue = vitalValue;
	}


	public String getResult() {
		return result;
	}


	public void setResult(String result) {
		this.result = result;
	}


	public String getVitalDate() {
		return vitalDate;
	}


	public void setVitalDate(String vitalDate) {
		this.vitalDate = vitalDate;
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




	public String getUhid() {
		return uhid;
	}


	public void setUhid(String uhid) {
		this.uhid = uhid;
	}


	public IVFTreatmentDTO getIvfTreatObj() {
		return ivfTreatObj;
	}


	public void setIvfTreatObj(IVFTreatmentDTO ivfTreatObj) {
		this.ivfTreatObj = ivfTreatObj;
	}


	public List<IvfCoverSheetVitalDTO> getGetListOfOPDCoversheetVitalDTO() {
		return getListOfOPDCoversheetVitalDTO;
	}


	public void setGetListOfOPDCoversheetVitalDTO(List<IvfCoverSheetVitalDTO> getListOfOPDCoversheetVitalDTO) {
		this.getListOfOPDCoversheetVitalDTO = getListOfOPDCoversheetVitalDTO;
	}


	
	
	
	
	
	
}
