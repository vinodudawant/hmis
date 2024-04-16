package com.hms.ehat.dto;

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

@Entity
@Immutable
@Table(name = "ehat_view_registration_death")
public class DeathPatientView {
	@Id
	@GeneratedValue
	@Column(name = "patient_id")
	private Integer ptId;
	
	@Column(name = "center_patient_id")
	private String centerPatientId;
 
	@Column(name = "patient_id",insertable=false , updatable=false)
	private String pIdd;
	
	@Column(name = "patient_name")
	private String patientName;
	
	@Column(name = "adharcardNo")
	private String adharcardNo;
	
	@Column(name = "mobile")
	private String mobile;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "department_id")
//	@Transient
	private int department_id=0;
	
	@Column(name = "death_flag")
	private String deathFlag;
	
	
	@Column(name = "t_flag",columnDefinition="varchar(2) default 'N'")
	//@Transient
	private String tFlag;
	
	@Column(name = "treatment_id")
	//@Transient
	private Integer ttId=0;
	
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	
	//@Column(name = "charges_master_slave_id")
	@Transient
	private Integer sponsorchargesSlaveId=0;
	
	@Column(name = "narration")
	private String narration;

	@Column(name = "docid")
	private int docid;
	
	@Column(name = "death_id")
	private int deathId;
	
	@Column(name = "deleted_death")
	private String deleted = "N";
	
	@Column(name = "deleted")
	private String deletedP = "N";
	
	@Column(name = "age")
	private int age;
	
	@Column(name = "gender")
	private String gender;
	
	
	@Column(name = "death_time")
	private String deathTime;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "death_date")
	private Date deathDate;
	
	@Column(name = "doctorName")
	private String doctorName;
	
	@Column(name = "patient_age")
	private String patientAge;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "patient_reg_date")
	private Date patientRegDate;
	
	@Column(name = "address")
	private String address;

	@Column(name = "state_name")
	private String stateName;
	
	@Column(name = "dis_name")
	private String disName;
	
	@Column(name = "city_name")
	private String cityName;
	
	@Column(name = "taluka_name")
	private String talukaName;
	@Temporal(TemporalType.DATE)
	@Column(name = "treatment_start_date")
	private Date treatment_start_date;
	@Transient
	private List<DeathPatientView> lstRegviewDto;
	
	@Transient
	private Double medicineamount;
	
	@Transient
	private String sponsername;
	
	@Transient
	private Double treamentamount;

	@Transient
	private Double advancedamount;
	
	@Transient
	private Double balanceamount;
	@Transient
	private Double discount;
	@Transient
	private String patientstatus;
	@Transient
	private String dignosis;
	
	
	
	public String getCenterPatientId() {
		return centerPatientId;
	}

	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}

	public String getDignosis() {
		return dignosis;
	}

	public void setDignosis(String dignosis) {
		this.dignosis = dignosis;
	}

	public Date getTreatment_start_date() {
		return treatment_start_date;
	}

	public void setTreatment_start_date(Date treatment_start_date) {
		this.treatment_start_date = treatment_start_date;
	}

	public String getPatientstatus() {
		return patientstatus;
	}

	public void setPatientstatus(String patientstatus) {
		this.patientstatus = patientstatus;
	}

	
	public Double getDiscount() {
		return discount;
	}

	public void setDiscount(Double discount) {
		this.discount = discount;
	}

	public Double getMedicineamount() {
		return medicineamount;
	}

	public void setMedicineamount(Double medicineamount) {
		this.medicineamount = medicineamount;
	}

	public String getSponsername() {
		return sponsername;
	}

	public void setSponsername(String sponsername) {
		this.sponsername = sponsername;
	}

	public Double getTreamentamount() {
		return treamentamount;
	}

	public void setTreamentamount(Double treamentamount) {
		this.treamentamount = treamentamount;
	}

	public Double getAdvancedamount() {
		return advancedamount;
	}

	public void setAdvancedamount(Double advancedamount) {
		this.advancedamount = advancedamount;
	}

	public Double getBalanceamount() {
		return balanceamount;
	}

	public void setBalanceamount(Double balanceamount) {
		this.balanceamount = balanceamount;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Integer getTtId() {
		return ttId;
	}

	public void setTtId(Integer ttId) {
		this.ttId = ttId;
	}

	public String gettFlag() {
		return tFlag;
	}

	public void settFlag(String tFlag) {
		this.tFlag = tFlag;
	}

	
	
	public Integer getPtId() {
		return ptId;
	}

	public void setPtId(Integer ptId) {
		this.ptId = ptId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public int getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(int department_id) {
		this.department_id = department_id;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getpIdd() {
		return pIdd;
	}

	public void setpIdd(String pIdd) {
		this.pIdd = pIdd;
	}

	public List<DeathPatientView> getLstRegviewDto() {
		return lstRegviewDto;
	}

	public void setLstRegviewDto(List<DeathPatientView> lstRegviewDto) {
		this.lstRegviewDto = lstRegviewDto;
	}

	public String getDeathFlag() {
		return deathFlag;
	}

	public void setDeathFlag(String deathFlag) {
		this.deathFlag = deathFlag;
	}

	  
	public Integer getSponsorchargesSlaveId() {
		return sponsorchargesSlaveId;
	}

	public void setSponsorchargesSlaveId(Integer sponsorchargesSlaveId) {
		this.sponsorchargesSlaveId = sponsorchargesSlaveId;
	}
	
	public String getAdharcardNo() {
		return adharcardNo;
	}

	public void setAdharcardNo(String adharcardNo) {
		this.adharcardNo = adharcardNo;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getNarration() {
		return narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}

	public int getDocid() {
		return docid;
	}

	public void setDocid(int docid) {
		this.docid = docid;
	}

	public int getDeathId() {
		return deathId;
	}

	public void setDeathId(int deathId) {
		this.deathId = deathId;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDeletedP() {
		return deletedP;
	}

	public void setDeletedP(String deletedP) {
		this.deletedP = deletedP;
	}

	public String getDeathTime() {
		return deathTime;
	}

	public void setDeathTime(String deathTime) {
		this.deathTime = deathTime;
	}

	public Date getDeathDate() {
		return deathDate;
	}

	public void setDeathDate(Date deathDate) {
		this.deathDate = deathDate;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getPatientAge() {
		return patientAge;
	}

	public void setPatientAge(String patientAge) {
		this.patientAge = patientAge;
	}

	public Date getPatientRegDate() {
		return patientRegDate;
	}

	public void setPatientRegDate(Date patientRegDate) {
		this.patientRegDate = patientRegDate;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	public String getDisName() {
		return disName;
	}

	public void setDisName(String disName) {
		this.disName = disName;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getTalukaName() {
		return talukaName;
	}

	public void setTalukaName(String talukaName) {
		this.talukaName = talukaName;
	}

}
