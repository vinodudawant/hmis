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
@Table(name="embryo_transfer_master_info")
public class EmbryoTransferMasterDTO {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "embryo_transfer_master_id")
	private Integer embryoTransferMasterId;
	
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
	
	@Column(name = "patient_husband_name",columnDefinition="varchar(20) default ''")
	private String patientHusbandName="";
	
	@Column(name = "cycle_no",columnDefinition="varchar(20) default ''")
	private String cycleNo="";
	
	@Column(name = "embryologist_name",columnDefinition="varchar(500) default ''")
	private String embryologistName="";
	
	
	@Column(name = "date_of_embryo_transper",columnDefinition="varchar(20) default ''")
	private String dateofEmbryoTransper="";
	
	@Column(name = "embryo_transper_flag",columnDefinition="varchar(20) default ''")
	private String embryoTransperFlag="";
	
	@Column(name = "anaethesia",columnDefinition="varchar(20) default ''")
	private String anaThesia="";
	
	@Column(name = "no_of_embryo_transpered",columnDefinition="varchar(20) default ''")
	private String noofEmbryoTranspered="";
	
	@Column(name = "time_of_embryo_transper",columnDefinition="varchar(20) default ''")
	private String timeofEmbryoTransper="";
	
	@Column(name = "embryologist_fresh_id",columnDefinition="varchar(20) default ''")
	private String freshembryologistId="";
	
	@Column(name = "embryologist_fresh_name",columnDefinition="varchar(500) default ''")
	private String freshembryologistName="";
	
	@Column(name = "endometrium",columnDefinition="varchar(20) default ''")
	private String Endometrium="";
	
	@Column(name = "doctor_fresh_id",columnDefinition="varchar(200) default ''")
	private String doctorFreshId="";
	
	@Column(name = "doctor_fresh_name",columnDefinition="varchar(200) default ''")
	private String doctorFreshName="";
	
	@Column(name = "cathetor_used",columnDefinition="varchar(20) default ''")
	private String cathetorUsed="";
	
	@Column(name = "witness",columnDefinition="varchar(20) default ''")
	private String witness="";
	
	@Column(name = "natureofet",columnDefinition="varchar(20) default ''")
	private String natureOfET="";
	
	@Column(name = "blood_in_catheter",columnDefinition="varchar(20) default ''")
	private String bloodInCatheter="";
	
	@Column(name = "embryo_returned",columnDefinition="varchar(20) default ''")
	private String embryoReturned="";
	
	@Column(name = "beta_hcg_due_date_fresh",columnDefinition="varchar(20) default ''")
	private String betaHCGDueDateFresh="";
	
	@Column(name = "number_frozen",columnDefinition="varchar(20) default ''")
	private String numberFrozen="";
	
	@Column(name = "embryo_number",columnDefinition="varchar(20) default ''")
	private String embryoNumber="";
	
	@Column(name = "number_of_straws",columnDefinition="varchar(20) default ''")
	private String numberofStraws="";
	
	@Column(name = "straw_description",columnDefinition=" varchar(500) default ''")
	private String strawDescription="";
	
	
	@Column(name = "storage_site",columnDefinition="varchar(20) default ''")
	private String storageSite="";
	
	@Column(name = "comments",columnDefinition="varchar(500) default ''")
	private String comments="";
	
	@Column(name = "assisted_hatching_flag",columnDefinition="varchar(20) default ''")
	private String assistedHatchingFalg="";
	
	@Column(name = "date_of_attached_hatching",columnDefinition="varchar(20) default ''")
	private String dateOfAttachedHatching="";
	
	@Column(name = "time_of_attached_hatching",columnDefinition="varchar(20) default ''")
	private String timeOfAttachedHatching="";
	
	
	@Column(name = "blastocyst_flag",columnDefinition="varchar(20) default ''")
	private String blastocystFalg="";
	
	@Column(name = "date_of_blastocyst",columnDefinition="varchar(20) default ''")
	private String dateOfBlastocyst="";
	
	@Column(name = "time_of_blastocyst",columnDefinition="varchar(20) default ''")
	private String timeOfBlastocyst="";
	
	@Column(name = "frozen_date",columnDefinition="varchar(20) default ''")
	private String frozenDate="";
	
	@Column(name = "frozen_time",columnDefinition="varchar(20) default ''")
	private String frozenTime="";
	
	@Column(name = "frozen_thawed",columnDefinition="varchar(20) default ''")
	private String frozenThawed="";
	
	@Column(name = "frozen_transfered",columnDefinition="varchar(20) default ''")
	private String frozenTransfered="";
	
	@Column(name = "frozen_balance",columnDefinition="varchar(20) default ''")
	private String frozenBalance="";
	
	@Column(name = "frozen_beta_hCG_due_on",columnDefinition="varchar(20) default ''")
	private String frozenBetaHCGDueon="";
	
	
	@Column(name = "couple_id",columnDefinition="varchar(20) default ''")
	private String coupleId="";
	
	@Column(name = "batch_creation_id",columnDefinition="varchar(20) default ''")
	private String batchCreationId="";
	
	
	
	
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
	List<EmbryoTransferMasterDTO>  getListOfEmbryoTransferMasterDTO;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "embryo_master_id", nullable = false)
	private List<EmbryoFreshSlaveDTO> getListOfEmbryoFreshSlaveDTO;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "embryo_master_id", nullable = false)
	private List<EmbryoFrozenSlaveDTO> getListOfEmbryoFrozenSlaveDTO;

	public Integer getEmbryoTransferMasterId() {
		return embryoTransferMasterId;
	}

	public void setEmbryoTransferMasterId(Integer embryoTransferMasterId) {
		this.embryoTransferMasterId = embryoTransferMasterId;
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

	public String getEmbryologistName() {
		return embryologistName;
	}

	public void setEmbryologistName(String embryologistName) {
		this.embryologistName = embryologistName;
	}

	public String getDateofEmbryoTransper() {
		return dateofEmbryoTransper;
	}

	public void setDateofEmbryoTransper(String dateofEmbryoTransper) {
		this.dateofEmbryoTransper = dateofEmbryoTransper;
	}

	public String getEmbryoTransperFlag() {
		return embryoTransperFlag;
	}

	public void setEmbryoTransperFlag(String embryoTransperFlag) {
		this.embryoTransperFlag = embryoTransperFlag;
	}

	public String getAnaThesia() {
		return anaThesia;
	}

	public void setAnaThesia(String anaThesia) {
		this.anaThesia = anaThesia;
	}

	public String getNoofEmbryoTranspered() {
		return noofEmbryoTranspered;
	}

	public void setNoofEmbryoTranspered(String noofEmbryoTranspered) {
		this.noofEmbryoTranspered = noofEmbryoTranspered;
	}

	public String getTimeofEmbryoTransper() {
		return timeofEmbryoTransper;
	}

	public void setTimeofEmbryoTransper(String timeofEmbryoTransper) {
		this.timeofEmbryoTransper = timeofEmbryoTransper;
	}

	public String getFreshembryologistId() {
		return freshembryologistId;
	}

	public void setFreshembryologistId(String freshembryologistId) {
		this.freshembryologistId = freshembryologistId;
	}

	public String getFreshembryologistName() {
		return freshembryologistName;
	}

	public void setFreshembryologistName(String freshembryologistName) {
		this.freshembryologistName = freshembryologistName;
	}

	public String getEndometrium() {
		return Endometrium;
	}

	public void setEndometrium(String endometrium) {
		Endometrium = endometrium;
	}

	public String getDoctorFreshId() {
		return doctorFreshId;
	}

	public void setDoctorFreshId(String doctorFreshId) {
		this.doctorFreshId = doctorFreshId;
	}

	public String getDoctorFreshName() {
		return doctorFreshName;
	}

	public void setDoctorFreshName(String doctorFreshName) {
		this.doctorFreshName = doctorFreshName;
	}

	public String getCathetorUsed() {
		return cathetorUsed;
	}

	public void setCathetorUsed(String cathetorUsed) {
		this.cathetorUsed = cathetorUsed;
	}

	public String getWitness() {
		return witness;
	}

	public void setWitness(String witness) {
		this.witness = witness;
	}

	public String getNatureOfET() {
		return natureOfET;
	}

	public void setNatureOfET(String natureOfET) {
		this.natureOfET = natureOfET;
	}

	public String getBloodInCatheter() {
		return bloodInCatheter;
	}

	public void setBloodInCatheter(String bloodInCatheter) {
		this.bloodInCatheter = bloodInCatheter;
	}

	public String getEmbryoReturned() {
		return embryoReturned;
	}

	public void setEmbryoReturned(String embryoReturned) {
		this.embryoReturned = embryoReturned;
	}

	public String getBetaHCGDueDateFresh() {
		return betaHCGDueDateFresh;
	}

	public void setBetaHCGDueDateFresh(String betaHCGDueDateFresh) {
		this.betaHCGDueDateFresh = betaHCGDueDateFresh;
	}

	public String getNumberFrozen() {
		return numberFrozen;
	}

	public void setNumberFrozen(String numberFrozen) {
		this.numberFrozen = numberFrozen;
	}

	public String getEmbryoNumber() {
		return embryoNumber;
	}

	public void setEmbryoNumber(String embryoNumber) {
		this.embryoNumber = embryoNumber;
	}

	public String getNumberofStraws() {
		return numberofStraws;
	}

	public void setNumberofStraws(String numberofStraws) {
		this.numberofStraws = numberofStraws;
	}

	public String getStrawDescription() {
		return strawDescription;
	}

	public void setStrawDescription(String strawDescription) {
		this.strawDescription = strawDescription;
	}

	public String getStorageSite() {
		return storageSite;
	}

	public void setStorageSite(String storageSite) {
		this.storageSite = storageSite;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getAssistedHatchingFalg() {
		return assistedHatchingFalg;
	}

	public void setAssistedHatchingFalg(String assistedHatchingFalg) {
		this.assistedHatchingFalg = assistedHatchingFalg;
	}

	public String getDateOfAttachedHatching() {
		return dateOfAttachedHatching;
	}

	public void setDateOfAttachedHatching(String dateOfAttachedHatching) {
		this.dateOfAttachedHatching = dateOfAttachedHatching;
	}

	public String getTimeOfAttachedHatching() {
		return timeOfAttachedHatching;
	}

	public void setTimeOfAttachedHatching(String timeOfAttachedHatching) {
		this.timeOfAttachedHatching = timeOfAttachedHatching;
	}

	public String getBlastocystFalg() {
		return blastocystFalg;
	}

	public void setBlastocystFalg(String blastocystFalg) {
		this.blastocystFalg = blastocystFalg;
	}

	public String getDateOfBlastocyst() {
		return dateOfBlastocyst;
	}

	public void setDateOfBlastocyst(String dateOfBlastocyst) {
		this.dateOfBlastocyst = dateOfBlastocyst;
	}

	public String getTimeOfBlastocyst() {
		return timeOfBlastocyst;
	}

	public void setTimeOfBlastocyst(String timeOfBlastocyst) {
		this.timeOfBlastocyst = timeOfBlastocyst;
	}

	public String getFrozenDate() {
		return frozenDate;
	}

	public void setFrozenDate(String frozenDate) {
		this.frozenDate = frozenDate;
	}

	public String getFrozenTime() {
		return frozenTime;
	}

	public void setFrozenTime(String frozenTime) {
		this.frozenTime = frozenTime;
	}

	public String getFrozenThawed() {
		return frozenThawed;
	}

	public void setFrozenThawed(String frozenThawed) {
		this.frozenThawed = frozenThawed;
	}

	public String getFrozenTransfered() {
		return frozenTransfered;
	}

	public void setFrozenTransfered(String frozenTransfered) {
		this.frozenTransfered = frozenTransfered;
	}

	public String getFrozenBalance() {
		return frozenBalance;
	}

	public void setFrozenBalance(String frozenBalance) {
		this.frozenBalance = frozenBalance;
	}

	public String getFrozenBetaHCGDueon() {
		return frozenBetaHCGDueon;
	}

	public void setFrozenBetaHCGDueon(String frozenBetaHCGDueon) {
		this.frozenBetaHCGDueon = frozenBetaHCGDueon;
	}

	public String getCoupleId() {
		return coupleId;
	}

	public void setCoupleId(String coupleId) {
		this.coupleId = coupleId;
	}

	public String getBatchCreationId() {
		return batchCreationId;
	}

	public void setBatchCreationId(String batchCreationId) {
		this.batchCreationId = batchCreationId;
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

	public List<EmbryoTransferMasterDTO> getGetListOfEmbryoTransferMasterDTO() {
		return getListOfEmbryoTransferMasterDTO;
	}

	public void setGetListOfEmbryoTransferMasterDTO(
			List<EmbryoTransferMasterDTO> getListOfEmbryoTransferMasterDTO) {
		this.getListOfEmbryoTransferMasterDTO = getListOfEmbryoTransferMasterDTO;
	}

	public List<EmbryoFreshSlaveDTO> getGetListOfEmbryoFreshSlaveDTO() {
		return getListOfEmbryoFreshSlaveDTO;
	}

	public void setGetListOfEmbryoFreshSlaveDTO(
			List<EmbryoFreshSlaveDTO> getListOfEmbryoFreshSlaveDTO) {
		this.getListOfEmbryoFreshSlaveDTO = getListOfEmbryoFreshSlaveDTO;
	}

	public List<EmbryoFrozenSlaveDTO> getGetListOfEmbryoFrozenSlaveDTO() {
		return getListOfEmbryoFrozenSlaveDTO;
	}

	public void setGetListOfEmbryoFrozenSlaveDTO(
			List<EmbryoFrozenSlaveDTO> getListOfEmbryoFrozenSlaveDTO) {
		this.getListOfEmbryoFrozenSlaveDTO = getListOfEmbryoFrozenSlaveDTO;
	}
	
	
	

	
	
}
