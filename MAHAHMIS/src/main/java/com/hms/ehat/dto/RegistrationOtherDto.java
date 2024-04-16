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

 
@Entity
@Table(name = "ehat_other_patient")
public class RegistrationOtherDto {

	@Id
	@GeneratedValue
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "appoint_id",columnDefinition="int default 0")
	private Integer appointId;
	
	@Column(name = "app_doctor_id",columnDefinition="int default 0")
	private Integer doctorId;
		
	@Column(name = "prefix")
	private String prefix;

	@Column(name = "f_name")
	private String fName;
	
	@Column(name = "m_name")
	private String mName;
	
	@Column(name = "l_name")
	private String lName;

	@Column(name = "mobile")
	private String mobile;
	
	@Column(name = "gender")
	private String gender;
	
	@Column(name = "dob")
	private String dob;
	
	@Column(name = "age",columnDefinition="int default 0")
	private int age;
	
	@Column(name = "age_months",columnDefinition="int default 0")
	private int ageMonths;
	
	@Column(name = "age_days",columnDefinition="int default 0")
	private int ageDays;
	
	@Column(name = "taluka_id",columnDefinition="int default 0")
	private int talukaId;
	
	@Column(name = "town_id",columnDefinition="int default 0")
	private int townId;
	
	@Column(name = "district_id",columnDefinition="int default 0")
	private int districtId;
	
	@Column(name = "state_id",columnDefinition="int default 0")
	private int stateId;
	
	@Column(name = "country_id",columnDefinition="int default 0")
	private int countryId;
	
	@Column(name = "area_code",columnDefinition="int default 0")
	private int areaCode;
	
	@Column(name = "address")
	private String address;
	
	//Added on 07-May-2018 For Permanant Address.	
	@Column(name = "per_address")
	private String perAddress;
	
	@Column(name = "per_taluka_id",columnDefinition="int default 0")
	private int pertalukaId;
	
	@Column(name = "per_town_id",columnDefinition="int default 0")
	private int pertownId;
	
	@Column(name = "per_district_id",columnDefinition="int default 0")
	private int perdistrictId;
	
	@Column(name = "per_state_id",columnDefinition="int default 0")
	private int perstateId;
	
	@Column(name = "per_country_id",columnDefinition="int default 1")
	private int percountryId;
	
	@Column(name = "per_area_code",columnDefinition="int default 0")
	private int perareaCode;	
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted;

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
 	@Column(name = "transSMS",columnDefinition="varchar(2) default 'N'")
	private String transSMS;
	
	@Column(name = "transEmail",columnDefinition="varchar(2) default 'N'")
	private String transEmail ;
	
	@Column(name = "pramoEmail",columnDefinition="varchar(2) default 'N'")
	private String pramoEmail ;
	
	@Column(name = "pramoSMS",columnDefinition="varchar(2) default 'N'")
	private String pramoSMS ;
	
	@Column(name = "external",columnDefinition="varchar(2) default 'N'")
	private String external ;
	
	@Column(name = "emergency",columnDefinition="varchar(2) default 'N'")
	private String emergency ;
	
	@Column(name = "adharcardNo")
	private String adharcardNo;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
 	@Column(name = "department_id")
	private int departmentId;
	
	@Column(name = "doctor_id")
	private String doctorIdList;
	
	@Column(name = "token",columnDefinition="int default 0")
	private int token;
	
	@Column(name = "t_flag",columnDefinition="varchar(2) default 'N'")
	private String tFlag;	
	
	@Column(name = "ref_doc_id",columnDefinition="int default 0")
	private int refDocId=0;
	
	@Column(name = "weight",columnDefinition="varchar(255) default '0'")
	private String weight;
	
	@Column(name = "height",columnDefinition="varchar(255) default '0'")
	private String height;
	
 	@Column(name = "empid",columnDefinition="varchar(255) default '-'")
	private String empid;
	
  	@Column(name = "tpaid",columnDefinition="varchar(255) default '-'")
	private String tpaid;
 	
	@Column(name = "source_type_id",columnDefinition="int default 1")
	private int sourceTypeId;

	@Column(name = "charges_master_slave_id",columnDefinition="int default 0")
	private Integer sponsorId;
	
	@Column(name = "center_patient_id")
	private String centerPatientId;
 	 
	@Transient
	private List<RegistrationOtherDto> listReg;
	@Transient
	private List<DoctorDto> listDoctorDto;
   
	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

	public String getDoctorIdList() {
		return doctorIdList;
	}

	public void setDoctorIdList(String doctorIdList) {
		this.doctorIdList = doctorIdList;
	}

	public int getToken() {
		return token;
	}

	public void setToken(int token) {
		this.token = token;
	}

	public String gettFlag() {
		return tFlag;
	}

	public void settFlag(String tFlag) {
		this.tFlag = tFlag;
	}

	public int getRefDocId() {
		return refDocId;
	}

	public void setRefDocId(int refDocId) {
		this.refDocId = refDocId;
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

	public String getEmpid() {
		return empid;
	}

	public void setEmpid(String empid) {
		this.empid = empid;
	}

 	public String getTpaid() {
		return tpaid;
	}

	public void setTpaid(String tpaid) {
		this.tpaid = tpaid;
	}

	public int getSourceTypeId() {
		return sourceTypeId;
	}

	public void setSourceTypeId(int sourceTypeId) {
		this.sourceTypeId = sourceTypeId;
	}

	public Integer getSponsorId() {
		return sponsorId;
	}

	public void setSponsorId(Integer sponsorId) {
		this.sponsorId = sponsorId;
	}

	public String getTransSMS() {
		return transSMS;
	}

	public void setTransSMS(String transSMS) {
		this.transSMS = transSMS;
	}

	public String getTransEmail() {
		return transEmail;
	}

	public void setTransEmail(String transEmail) {
		this.transEmail = transEmail;
	}

	public String getPramoEmail() {
		return pramoEmail;
	}

	public void setPramoEmail(String pramoEmail) {
		this.pramoEmail = pramoEmail;
	}

	public String getPramoSMS() {
		return pramoSMS;
	}

	public void setPramoSMS(String pramoSMS) {
		this.pramoSMS = pramoSMS;
	}

	public String getExternal() {
		return external;
	}

	public void setExternal(String external) {
		this.external = external;
	}

	public String getEmergency() {
		return emergency;
	}

	public void setEmergency(String emergency) {
		this.emergency = emergency;
	}

	public String getAdharcardNo() {
		return adharcardNo;
	}

	public void setAdharcardNo(String adharcardNo) {
		this.adharcardNo = adharcardNo;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}
	
	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public String getfName() {
		return fName;
	}

	public void setfName(String fName) {
		this.fName = fName;
	}

	public String getmName() {
		return mName;
	}

	public void setmName(String mName) {
		this.mName = mName;
	}

	public String getlName() {
		return lName;
	}

	public void setlName(String lName) {
		this.lName = lName;
	}


	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public int getTownId() {
		return townId;
	}

	public void setTownId(int townId) {
		this.townId = townId;
	}

	public int getTalukaId() {
		return talukaId;
	}

	public void setTalukaId(int talukaId) {
		this.talukaId = talukaId;
	}

	public int getDistrictId() {
		return districtId;
	}

	public void setDistrictId(int districtId) {
		this.districtId = districtId;
	}

	public int getStateId() {
		return stateId;
	}

	public void setStateId(int stateId) {
		this.stateId = stateId;
	}

	public int getCountryId() {
		return countryId;
	}

	public void setCountryId(int countryId) {
		this.countryId = countryId;
	}

	public int getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(int areaCode) {
		this.areaCode = areaCode;
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

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
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

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public List<RegistrationOtherDto> getListReg() {
		return listReg;
	}

	public void setListReg(List<RegistrationOtherDto> listReg) {
		this.listReg = listReg;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getAgeMonths() {
		return ageMonths;
	}

	public void setAgeMonths(int ageMonths) {
		this.ageMonths = ageMonths;
	}

	public int getAgeDays() {
		return ageDays;
	}

	public void setAgeDays(int ageDays) {
		this.ageDays = ageDays;
	}

	public List<DoctorDto> getListDoctorDto() {
		return listDoctorDto;
	}

	public void setListDoctorDto(List<DoctorDto> listDoctorDto) {
		this.listDoctorDto = listDoctorDto;
	}

	public Integer getAppointId() {
		return appointId;
	}

	public void setAppointId(Integer appointId) {
		this.appointId = appointId;
	}

	public Integer getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPerAddress() {
		return perAddress;
	}

	public void setPerAddress(String perAddress) {
		this.perAddress = perAddress;
	}

	public int getPertalukaId() {
		return pertalukaId;
	}

	public void setPertalukaId(int pertalukaId) {
		this.pertalukaId = pertalukaId;
	}

	public int getPertownId() {
		return pertownId;
	}

	public void setPertownId(int pertownId) {
		this.pertownId = pertownId;
	}

	public int getPerdistrictId() {
		return perdistrictId;
	}

	public void setPerdistrictId(int perdistrictId) {
		this.perdistrictId = perdistrictId;
	}

	public int getPerstateId() {
		return perstateId;
	}

	public void setPerstateId(int perstateId) {
		this.perstateId = perstateId;
	}

	public int getPercountryId() {
		return percountryId;
	}

	public void setPercountryId(int percountryId) {
		this.percountryId = percountryId;
	}

	public int getPerareaCode() {
		return perareaCode;
	}

	public void setPerareaCode(int perareaCode) {
		this.perareaCode = perareaCode;
	}

	public String getCenterPatientId() {
		return centerPatientId;
	}

	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}
	
}
