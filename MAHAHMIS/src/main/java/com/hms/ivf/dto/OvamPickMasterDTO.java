package com.hms.ivf.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="ovam_pickup_master_info")
public class OvamPickMasterDTO {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "ovam_pickup_master_id")
	private Integer ovamPickUpMasterId;
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "treatment_id")
	private String treatmentId;
	
	
	@Column(name = "patient_name",columnDefinition="varchar(200) default ''")
	private String patientName="";
	
	@Column(name = "patient_age",columnDefinition="varchar(20) default ''")
	private String patient_age="";
	
	@Column(name = "patient_gender",columnDefinition="varchar(20) default ''")
	private String patient_gender="";
	
	@Column(name = "patient_husband_name",columnDefinition="varchar(200) default ''")
	private String patientHusbandName="";
	
	@Column(name = "cycle_no",columnDefinition="varchar(20) default ''")
	private String cycleNo="";
	
	@Column(name = "embryologist_id",columnDefinition="varchar(20) default ''")
	private String embryologistId="";
	
	@Column(name = "embryologist_name",columnDefinition="varchar(500) default ''")
	private String embryologistName="";
	
	@Column(name = "date_of_ovam_pickup",columnDefinition="varchar(20) default ''")
	private String dateOfOvamPickUp="";
	
	@Column(name = "oocytes_retrieved_ejaculate",columnDefinition="varchar(20) default ''")
	private String oocytesretrievedEjaculate="";
	
	@Column(name = "oocytes_retrieved_pesa",columnDefinition="varchar(20) default ''")
	private String oocytesretrievedPesa="";
	
	@Column(name = "oocytes_retrieved_tesa",columnDefinition="varchar(20) default ''")
	private String oocytesretrievedTesa="";
	
	
	@Column(name = "mature_oocytes_ejaculate",columnDefinition="varchar(20) default ''")
	private String matureoocytesEjaculate="";
	
	@Column(name = "mature_oocytes_pesa",columnDefinition="varchar(20) default ''")
	private String matureoocytesPesa="";
	
	@Column(name = "mature_oocytes_tesa",columnDefinition="varchar(20) default ''")
	private String matureoocytesTesa="";
	
	@Column(name = "oocytes_injected_ejaculate",columnDefinition="varchar(20) default ''")
	private String oocytesinjectedEjaculate="";
	
	@Column(name = "oocytes_injected_pesa",columnDefinition="varchar(20) default ''")
	private String oocytesinjectedPesa="";
	
	@Column(name = "oocytes_injected_tesa",columnDefinition="varchar(20) default ''")
	private String oocytesinjectedTesa="";
	
	@Column(name = "embroys_formed_ejaculate",columnDefinition="varchar(20) default ''")
	private String embroysformedEjaculate="";
	
	@Column(name = "embroys_formed_pesa",columnDefinition="varchar(20) default ''")
	private String embroysformedPesa="";
	
	@Column(name = "embroys_formed_tesa",columnDefinition="varchar(20) default ''")
	private String embroysformedTesa="";
	
	@Column(name = "oocyte_ejaculate_date",columnDefinition="varchar(20) default ''")
	private String oocyteEjaculateDate="";
	
	@Column(name = "mature_oocytes_date",columnDefinition="varchar(20) default ''")
	private String matureoocytesDate="";
	
	@Column(name = "oocytes_injected_date",columnDefinition="varchar(20) default ''")
	private String oocytesinjectedDate="";
	
	
	@Column(name = "embroys_formed_date",columnDefinition="varchar(20) default ''")
	private String embroysformedDate="";
	
	
	
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
	
	@Column(name = "ejaculate_value",columnDefinition="varchar(20) default ''")
	private String ejaculateValue="";
	
	
	@Transient
	List<OvamPickMasterDTO>  getListOfOvamPickUpMasterDTO;

	/*
	 * //@LazyCollection(value = LazyCollectionOption.FALSE)
	 * 
	 * @OneToMany(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "ovam_master_id", nullable = false) private
	 * List<OvamPickUpSlaveDTO> getListOfOvamPickUpSlaveDTO;
	 */


	public Integer getOvamPickUpMasterId() {
		return ovamPickUpMasterId;
	}


	public void setOvamPickUpMasterId(Integer ovamPickUpMasterId) {
		this.ovamPickUpMasterId = ovamPickUpMasterId;
	}


	public Integer getPatientId() {
		return patientId;
	}


	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}


	public String getTreatmentId() {
		return treatmentId;
	}


	public void setTreatmentId(String treatmentId) {
		this.treatmentId = treatmentId;
	}


	public String getPatientName() {
		return patientName;
	}


	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}


	public String getPatient_age() {
		return patient_age;
	}


	public void setPatient_age(String patient_age) {
		this.patient_age = patient_age;
	}


	public String getPatient_gender() {
		return patient_gender;
	}


	public void setPatient_gender(String patient_gender) {
		this.patient_gender = patient_gender;
	}


	public String getPatientHusbandName() {
		return patientHusbandName;
	}


	public void setPatientHusbandName(String patientHusbandName) {
		this.patientHusbandName = patientHusbandName;
	}


	public String getCycleNo() {
		return cycleNo;
	}


	public void setCycleNo(String cycleNo) {
		this.cycleNo = cycleNo;
	}


	public String getEmbryologistId() {
		return embryologistId;
	}


	public void setEmbryologistId(String embryologistId) {
		this.embryologistId = embryologistId;
	}


	public String getEmbryologistName() {
		return embryologistName;
	}


	public void setEmbryologistName(String embryologistName) {
		this.embryologistName = embryologistName;
	}


	public String getDateOfOvamPickUp() {
		return dateOfOvamPickUp;
	}


	public void setDateOfOvamPickUp(String dateOfOvamPickUp) {
		this.dateOfOvamPickUp = dateOfOvamPickUp;
	}


	public String getOocytesretrievedEjaculate() {
		return oocytesretrievedEjaculate;
	}


	public void setOocytesretrievedEjaculate(String oocytesretrievedEjaculate) {
		this.oocytesretrievedEjaculate = oocytesretrievedEjaculate;
	}


	public String getOocytesretrievedPesa() {
		return oocytesretrievedPesa;
	}


	public void setOocytesretrievedPesa(String oocytesretrievedPesa) {
		this.oocytesretrievedPesa = oocytesretrievedPesa;
	}


	public String getOocytesretrievedTesa() {
		return oocytesretrievedTesa;
	}


	public void setOocytesretrievedTesa(String oocytesretrievedTesa) {
		this.oocytesretrievedTesa = oocytesretrievedTesa;
	}


	public String getMatureoocytesEjaculate() {
		return matureoocytesEjaculate;
	}


	public void setMatureoocytesEjaculate(String matureoocytesEjaculate) {
		this.matureoocytesEjaculate = matureoocytesEjaculate;
	}


	public String getMatureoocytesPesa() {
		return matureoocytesPesa;
	}


	public void setMatureoocytesPesa(String matureoocytesPesa) {
		this.matureoocytesPesa = matureoocytesPesa;
	}


	public String getMatureoocytesTesa() {
		return matureoocytesTesa;
	}


	public void setMatureoocytesTesa(String matureoocytesTesa) {
		this.matureoocytesTesa = matureoocytesTesa;
	}


	public String getOocytesinjectedEjaculate() {
		return oocytesinjectedEjaculate;
	}


	public void setOocytesinjectedEjaculate(String oocytesinjectedEjaculate) {
		this.oocytesinjectedEjaculate = oocytesinjectedEjaculate;
	}


	public String getOocytesinjectedPesa() {
		return oocytesinjectedPesa;
	}


	public void setOocytesinjectedPesa(String oocytesinjectedPesa) {
		this.oocytesinjectedPesa = oocytesinjectedPesa;
	}


	public String getOocytesinjectedTesa() {
		return oocytesinjectedTesa;
	}


	public void setOocytesinjectedTesa(String oocytesinjectedTesa) {
		this.oocytesinjectedTesa = oocytesinjectedTesa;
	}


	public String getEmbroysformedEjaculate() {
		return embroysformedEjaculate;
	}


	public void setEmbroysformedEjaculate(String embroysformedEjaculate) {
		this.embroysformedEjaculate = embroysformedEjaculate;
	}


	public String getEmbroysformedPesa() {
		return embroysformedPesa;
	}


	public void setEmbroysformedPesa(String embroysformedPesa) {
		this.embroysformedPesa = embroysformedPesa;
	}


	public String getEmbroysformedTesa() {
		return embroysformedTesa;
	}


	public void setEmbroysformedTesa(String embroysformedTesa) {
		this.embroysformedTesa = embroysformedTesa;
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


	public List<OvamPickMasterDTO> getGetListOfOvamPickUpMasterDTO() {
		return getListOfOvamPickUpMasterDTO;
	}


	public void setGetListOfOvamPickUpMasterDTO(
			List<OvamPickMasterDTO> getListOfOvamPickUpMasterDTO) {
		this.getListOfOvamPickUpMasterDTO = getListOfOvamPickUpMasterDTO;
	}


	public String getOocyteEjaculateDate() {
		return oocyteEjaculateDate;
	}


	public void setOocyteEjaculateDate(String oocyteEjaculateDate) {
		this.oocyteEjaculateDate = oocyteEjaculateDate;
	}


	public String getMatureoocytesDate() {
		return matureoocytesDate;
	}


	public void setMatureoocytesDate(String matureoocytesDate) {
		this.matureoocytesDate = matureoocytesDate;
	}


	public String getOocytesinjectedDate() {
		return oocytesinjectedDate;
	}


	public void setOocytesinjectedDate(String oocytesinjectedDate) {
		this.oocytesinjectedDate = oocytesinjectedDate;
	}


	public String getEmbroysformedDate() {
		return embroysformedDate;
	}


	public void setEmbroysformedDate(String embroysformedDate) {
		this.embroysformedDate = embroysformedDate;
	}


	public String getEjaculateValue() {
		return ejaculateValue;
	}


	public void setEjaculateValue(String ejaculateValue) {
		this.ejaculateValue = ejaculateValue;
	}


	

	

	
	
	
	
}
