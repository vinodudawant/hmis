package com.hms.doctordesk.dto;

import java.sql.Timestamp;
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
@Table(name = "opd_chemotheropy_info")
public class OPDChemoTheropyDTO {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "chemo_theropy_master_id")
	private int chemoTheropyMasterId;
	
	@Column(name = "chemotherapy_protocol",columnDefinition="varchar(100) default ''")
	private String 	chemotherapyProtocol="";
	
	@Column(name = "location",columnDefinition="varchar(100) default ''")
	private String 	location="";
	
	@Column(name = "weight",columnDefinition="varchar(100) default ''")
	private String 	weight="";
	
	@Column(name = "height",columnDefinition="varchar(100) default ''")
	private String 	height="";
	
	@Column(name = "bsa",columnDefinition="varchar(100) default ''")
	private String 	bsa="";
	
	@Column(name = "blood_order",columnDefinition="varchar(100) default ''")
	private String 	bloodOrder="";
	
	@Column(name = "allergies",columnDefinition="varchar(100) default ''")
	private String 	allergies="";
	
	@Column(name = "history",columnDefinition="varchar(100) default ''")
	private String 	history="";
	
	@Column(name = "frequency",columnDefinition="varchar(100) default ''")
	private String 	frequency="";
	
	@Column(name = "number_of_cycles",columnDefinition="varchar(100) default ''")
	private String 	numberofCycles="";
	
	@Column(name = "dose",columnDefinition="varchar(1000) default ''")
	private String 	dose="";
	
	@Column(name = "investigations",columnDefinition="varchar(1000) default ''")
	private String 	investigations="";
	
	
	
	@Column(name = "chemo_orders",columnDefinition="varchar(1000) default ''")
	private String  chemoOrders="";
	
	@Column(name = "postMedications",columnDefinition="varchar(1000) default ''")
	private String  postMedications="";
	
	@Column(name = "postChemoAdvice",columnDefinition="varchar(1000) default ''")
	private String  postChemoAdvice="";
	
	//@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "next_blood_test_date")
	private String  nextBloodTestDate;
	
	//@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "next_chemo_date")
	private String  nextChemoDate;
	
	//@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "next_visit_date")
	private String  nextVisitDate;
	
	@Column(name = "uhid",columnDefinition="varchar(20) default ''")
	private String UHID="";
	
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
	
	@Column(name = "start_time",columnDefinition="varchar(5) default ''")
	private String startTime="";
	
	@Column(name = "end_time",columnDefinition="varchar(5) default ''")
	private String endTime="";
	
	@Column(name = "sign",columnDefinition="varchar(8) default ''")
	private String sign="";
	
	@Column(name = "remark",columnDefinition="varchar(10) default ''")
	private String remark="";
	
	
	@Transient
	List<OPDChemoTheropyDTO>  getListOfOPDChemoTheropyDTO;
	
	@OneToOne
	@JoinColumn(name="treatment_id")
	public TreatmentDto treatObj;
	
	@ManyToOne
	@JoinColumn(name="patient_id")
	public RegistrationDto patientObj;

	public int getChemoTheropyMasterId() {
		return chemoTheropyMasterId;
	}

	public void setChemoTheropyMasterId(int chemoTheropyMasterId) {
		this.chemoTheropyMasterId = chemoTheropyMasterId;
	}

	public String getChemotherapyProtocol() {
		return chemotherapyProtocol;
	}

	public void setChemotherapyProtocol(String chemotherapyProtocol) {
		this.chemotherapyProtocol = chemotherapyProtocol;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public String getBsa() {
		return bsa;
	}

	public void setBsa(String bsa) {
		this.bsa = bsa;
	}

	public String getBloodOrder() {
		return bloodOrder;
	}

	public void setBloodOrder(String bloodOrder) {
		this.bloodOrder = bloodOrder;
	}

	public String getAllergies() {
		return allergies;
	}

	public void setAllergies(String allergies) {
		this.allergies = allergies;
	}

	public String getHistory() {
		return history;
	}

	public void setHistory(String history) {
		this.history = history;
	}

	public String getFrequency() {
		return frequency;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}

	public String getNumberofCycles() {
		return numberofCycles;
	}

	public void setNumberofCycles(String numberofCycles) {
		this.numberofCycles = numberofCycles;
	}

	public String getDose() {
		return dose;
	}

	public void setDose(String dose) {
		this.dose = dose;
	}

	public String getInvestigations() {
		return investigations;
	}

	public void setInvestigations(String investigations) {
		this.investigations = investigations;
	}

	public String getChemoOrders() {
		return chemoOrders;
	}

	public void setChemoOrders(String chemoOrders) {
		this.chemoOrders = chemoOrders;
	}

	public String getPostMedications() {
		return postMedications;
	}

	public void setPostMedications(String postMedications) {
		this.postMedications = postMedications;
	}

	public String getPostChemoAdvice() {
		return postChemoAdvice;
	}

	public void setPostChemoAdvice(String postChemoAdvice) {
		this.postChemoAdvice = postChemoAdvice;
	}

	

	public String getUHID() {
		return UHID;
	}

	public void setUHID(String uHID) {
		UHID = uHID;
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

	public List<OPDChemoTheropyDTO> getGetListOfOPDChemoTheropyDTO() {
		return getListOfOPDChemoTheropyDTO;
	}

	public void setGetListOfOPDChemoTheropyDTO(List<OPDChemoTheropyDTO> getListOfOPDChemoTheropyDTO) {
		this.getListOfOPDChemoTheropyDTO = getListOfOPDChemoTheropyDTO;
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

	public String getNextBloodTestDate() {
		return nextBloodTestDate;
	}

	public void setNextBloodTestDate(String nextBloodTestDate) {
		this.nextBloodTestDate = nextBloodTestDate;
	}

	public String getNextChemoDate() {
		return nextChemoDate;
	}

	public void setNextChemoDate(String nextChemoDate) {
		this.nextChemoDate = nextChemoDate;
	}

	public String getNextVisitDate() {
		return nextVisitDate;
	}

	public void setNextVisitDate(String nextVisitDate) {
		this.nextVisitDate = nextVisitDate;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Override
	public String toString() {
		return "OPDChemoTheropyDTO [chemoTheropyMasterId=" + chemoTheropyMasterId + ", chemotherapyProtocol="
				+ chemotherapyProtocol + ", location=" + location + ", weight=" + weight + ", height=" + height
				+ ", bsa=" + bsa + ", bloodOrder=" + bloodOrder + ", allergies=" + allergies + ", history=" + history
				+ ", frequency=" + frequency + ", numberofCycles=" + numberofCycles + ", dose=" + dose
				+ ", investigations=" + investigations + ", chemoOrders=" + chemoOrders + ", postMedications="
				+ postMedications + ", postChemoAdvice=" + postChemoAdvice + ", nextBloodTestDate=" + nextBloodTestDate
				+ ", nextChemoDate=" + nextChemoDate + ", nextVisitDate=" + nextVisitDate + ", UHID=" + UHID
				+ ", createdDateTime=" + createdDateTime + ", updatedDateTime=" + updatedDateTime + ", deletedBy="
				+ deletedBy + ", deleted=" + deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deletedDateTime=" + deletedDateTime + ", unitId=" + unitId + ", userId=" + userId + ", startTime="
				+ startTime + ", endTime=" + endTime + ", sign=" + sign + ", remark=" + remark
				+ ", getListOfOPDChemoTheropyDTO=" + getListOfOPDChemoTheropyDTO + ", treatObj=" + treatObj
				+ ", patientObj=" + patientObj + "]";
	}

	
	
	
	

}
