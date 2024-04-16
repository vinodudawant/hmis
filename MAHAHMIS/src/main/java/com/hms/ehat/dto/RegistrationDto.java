package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

import com.hms.dto.Treatment;
import com.hms.dto.Users;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;

@Component
@Entity
@Table(name = "ehat_patient")
public class RegistrationDto implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "center_patient_id",updatable=false,columnDefinition="varchar(255) default '-'")
	private String centerPatientId="-";
	
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
	
	@Column(name = "country_id",columnDefinition="int default 1")
	private int countryId;
	
	@Column(name = "area_code",columnDefinition="int default 0")
	private int areaCode;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";	
	
	@Column(name = "organ_donar_flag")
	private String organDonarFlag = "N";

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;	
	
	@CreationTimestamp
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "blocked_date_time")
	private Date blockedDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "mrnno")
	private String mrnno;
 
	@Column(name = "unitcount")
	private Integer unitCount;
	
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
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "image_name")
	private String imageName="patientPhoto.jpg";
	
	@Column(name = "aadhar_image_name",columnDefinition="varchar(250) default 'aadhar.jpg'")
	private String aadharImageName="aadhar.jpg";
	
	@Column(name = "block_flag",columnDefinition="varchar(2) default 'N'")
	private String blockFlag ="N";
	
	@Column(name = "block_narration_1",columnDefinition="text")
	private String blockNarration1 ="-";
	
	@Column(name = "block_narration_2",columnDefinition="text")
	private String blockNarration2 ="-";
	
	@Column(name = "block_narration_3",columnDefinition="text")
	private String blockNarration3 ="-";
	
	@Column(name = "block_user_name_1",columnDefinition="text")
	private String blockUserName1 ="-";
	
	@Column(name = "block_user_name_2",columnDefinition="text")
	private String blockUserName2 ="-";
	
	@Column(name = "block_user_name_3",columnDefinition="text")
	private String blockUserName3 ="-";	
	
	@Column(name = "block_user_id_1",columnDefinition="int default 0")
	private int blockUserId1=0;
	
	@Column(name = "block_user_id_2",columnDefinition="int default 0")
	private int blockUserId2=0;
	
	@Column(name = "block_user_id_3",columnDefinition="int default 0")
	private int blockUserId3=0;	
	
	@Column(name = "passport",columnDefinition="varchar(55) default '-'")
	private String passport;
	
	@Column(name = "visa",columnDefinition="varchar(55) default '-'")
	private String visa;
	
	@Column(name = "relation_id",columnDefinition="int default 0")
	private int relationId;
	
	@Column(name = "relative_name",columnDefinition="varchar(55) default '-'")
	private String relativeName;
	
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
	
	//additional information columns added	
	@Column(name = "old_patient_id",columnDefinition="varchar(20) default '0'")
	private String oldPatientId="0";
	
	@Column(name = "email_id",columnDefinition="varchar(250) default '-'")
	private String emailId;
	
	@Column(name = "marital_status_id",columnDefinition="int default 0")
	private int maritalStatusId;
	
	@Column(name = "nationality_id",columnDefinition="int default 0")
	private int nationalityId;
	
	@Column(name = "religion_id",columnDefinition="int default 0")
	private int religionId;
	
	@Column(name = "language_id",columnDefinition="int default 0")
	private int languageId;
	
	@Column(name = "blood_group_id",columnDefinition="int default 0")
	private int bloodGroupId;
	
	@Column(name = "identity_proof_id",columnDefinition="int default 0")
	private int identityProofId;
	
	@Column(name = "identification_number",columnDefinition="varchar(100) default '-'")
	private String identificationNumber="-";
	
	@Column(name = "annual_income_id",columnDefinition="int default 0")
	private int annualIncomeId;
	
	@Column(name = "occupation",columnDefinition="varchar(250) default '-'")
	private String occupation="-";
	
	@Column(name = "education",columnDefinition="varchar(250) default '-'")
	private String education="-";
	
	@Column(name = "ivf_treat_flag",columnDefinition="varchar(2) default 'N'")
	private String ivfTreatFlag="N";
	
	@Column(name = "health_id", columnDefinition = "varchar(100) default '0'")
	private String healthId="0";

	@Column(name = "health_id_number", columnDefinition = "varchar(100) default '0'")
	private String healthIdNumber="0";

	/*
	 * @Column(name = "town_name", columnDefinition = "varchar(50) default '0'")
	 * private String townName="-";
	 */
	
	
	
	@Transient
	int patientApId;
	 	
	@Transient
	private List<RegistrationDto> listReg;
	
	@Transient
	private List<RegistrationDto> patientList;

	// this is added by Vishnu for maxtreatmentId --17-12-2021--
	@Transient
	private Integer maxTreatmentId;

	@Transient
	private OrganDonationRegistrationDto organDonationRegistrationDto;
	
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="patient_id", nullable=false, updatable=false)
	private List<TreatmentDto> listTreatment;
	
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="patient_id", nullable=false, updatable=false)
	private List<BillMasterDto> listBill;
	
	//@OneToMany(cascade=CascadeType.ALL)
	//@JoinColumn(name="pat_id")
	@Transient
	private List<BillDetailsDto> listBillDetails;
		
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="patient_id", nullable=false)
	private List<PaymentResponsibleDto> listPayRes;
	
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="patient_id", nullable=false)
	private List<MlcDetailsDto> listMlcDetails;
	
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="patient_id", nullable=false)
	private List<MultipleSponsorDto> listMultipleSponsor;
	
	@Column(name = "legacy_uhid_number",columnDefinition="varchar(250) default '0'")
	private String  legacyUHIDNumber="0";

	@Transient
	private List<Users> userList;
	
	@Transient
	private int admitedDays;
	
	@Transient
	private String docName;
	
	@Transient
	private int sourceTypeId;
	
	@Transient
	private String sponsorName;
	
	@Transient
	private String queryType;
	
	@Transient
	Treatment objTreatment = new Treatment();
	
	@Transient
	private int patient_ID;
	@Transient
	private int treatment_id;
	@Transient
	private String title;
	@Transient
	private String bloodGroup;
	@Transient
	private String sex;
	@Transient
	private String weight;
	@Transient
	private Double height;
	@Transient
	private String officeNumber;
	@Transient
	private String wtType;
	@Transient
	private String bedNo;
	@Transient
	private TreatMentBeds objtreatmentbeds;
	
//	@Transient
//	private String healthId;
//	@Transient
//	private String healthIdNumber;
	
	@Transient
	private String age1;
		
	
	public String getAge1() {
		return age1;
	}

	public void setAge1(String age1) {
		this.age1 = age1;
	}
	
	@Transient
	private int patientidivf;
	@Transient
	private String patientNameivf;
	
	@Transient
	private int patientidivffemale;
	@Transient
	private String patientNameivffemale;
	
	@Transient
	private String tflg;
	@Transient
	private int department_id;
	@Transient
	private double patient_weight;
		
	
	public String getTflg() {
		return tflg;
	}

	public void setTflg(String tflg) {
		this.tflg = tflg;
	}

	public int getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(int department_id) {
		this.department_id = department_id;
	}

	public double getPatient_weight() {
		return patient_weight;
	}

	public void setPatient_weight(double patient_weight) {
		this.patient_weight = patient_weight;
	}

	public int getPatientidivffemale() {
		return patientidivffemale;
	}

	public void setPatientidivffemale(int patientidivffemale) {
		this.patientidivffemale = patientidivffemale;
	}

	public String getPatientNameivffemale() {
		return patientNameivffemale;
	}

	public void setPatientNameivffemale(String patientNameivffemale) {
		this.patientNameivffemale = patientNameivffemale;
	}

	public int getPatientidivf() {
		return patientidivf;
	}

	public void setPatientidivf(int patientidivf) {
		this.patientidivf = patientidivf;
	}

	public String getPatientNameivf() {
		return patientNameivf;
	}

	public void setPatientNameivf(String patientNameivf) {
		this.patientNameivf = patientNameivf;
	}

	public int getPatient_ID() {
		return patient_ID;
	}

	public void setPatient_ID(int patient_ID) {
		this.patient_ID = patient_ID;
	}
	
	public int getTreatment_id() {
		return treatment_id;
	}

	public void setTreatment_id(int treatment_id) {
		this.treatment_id = treatment_id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	public Double getHeight() {
		return height;
	}

	public void setHeight(Double height) {
		this.height = height;
	}

	public String getOfficeNumber() {
		return officeNumber;
	}

	public void setOfficeNumber(String officeNumber) {
		this.officeNumber = officeNumber;
	}

	public String getWtType() {
		return wtType;
	}

	public void setWtType(String wtType) {
		this.wtType = wtType;
	}

	public String getBedNo() {
		return bedNo;
	}

	public void setBedNo(String bedNo) {
		this.bedNo = bedNo;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public String getCenterPatientId() {
		return centerPatientId;
	}

	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
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

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
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

	public int getTalukaId() {
		return talukaId;
	}

	public void setTalukaId(int talukaId) {
		this.talukaId = talukaId;
	}

	public int getTownId() {
		return townId;
	}

	public void setTownId(int townId) {
		this.townId = townId;
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

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getOrganDonarFlag() {
		return organDonarFlag;
	}

	public void setOrganDonarFlag(String organDonarFlag) {
		this.organDonarFlag = organDonarFlag;
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

	public Date getBlockedDateTime() {
		return blockedDateTime;
	}

	public void setBlockedDateTime(Date blockedDateTime) {
		this.blockedDateTime = blockedDateTime;
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

	public String getMrnno() {
		return mrnno;
	}

	public void setMrnno(String mrnno) {
		this.mrnno = mrnno;
	}

	public Integer getUnitCount() {
		return unitCount;
	}

	public void setUnitCount(Integer unitCount) {
		this.unitCount = unitCount;
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public String getAadharImageName() {
		return aadharImageName;
	}

	public void setAadharImageName(String aadharImageName) {
		this.aadharImageName = aadharImageName;
	}

	public String getBlockFlag() {
		return blockFlag;
	}

	public void setBlockFlag(String blockFlag) {
		this.blockFlag = blockFlag;
	}

	public String getBlockNarration1() {
		return blockNarration1;
	}

	public void setBlockNarration1(String blockNarration1) {
		this.blockNarration1 = blockNarration1;
	}

	public String getBlockNarration2() {
		return blockNarration2;
	}

	public void setBlockNarration2(String blockNarration2) {
		this.blockNarration2 = blockNarration2;
	}

	public String getBlockNarration3() {
		return blockNarration3;
	}

	public void setBlockNarration3(String blockNarration3) {
		this.blockNarration3 = blockNarration3;
	}

	public String getBlockUserName1() {
		return blockUserName1;
	}

	public void setBlockUserName1(String blockUserName1) {
		this.blockUserName1 = blockUserName1;
	}

	public String getBlockUserName2() {
		return blockUserName2;
	}

	public void setBlockUserName2(String blockUserName2) {
		this.blockUserName2 = blockUserName2;
	}

	public String getBlockUserName3() {
		return blockUserName3;
	}

	public void setBlockUserName3(String blockUserName3) {
		this.blockUserName3 = blockUserName3;
	}

	public int getBlockUserId1() {
		return blockUserId1;
	}

	public void setBlockUserId1(int blockUserId1) {
		this.blockUserId1 = blockUserId1;
	}

	public int getBlockUserId2() {
		return blockUserId2;
	}

	public void setBlockUserId2(int blockUserId2) {
		this.blockUserId2 = blockUserId2;
	}

	public int getBlockUserId3() {
		return blockUserId3;
	}

	public void setBlockUserId3(int blockUserId3) {
		this.blockUserId3 = blockUserId3;
	}

	public String getPassport() {
		return passport;
	}

	public void setPassport(String passport) {
		this.passport = passport;
	}

	public String getVisa() {
		return visa;
	}

	public void setVisa(String visa) {
		this.visa = visa;
	}

	public int getRelationId() {
		return relationId;
	}

	public void setRelationId(int relationId) {
		this.relationId = relationId;
	}

	public String getRelativeName() {
		return relativeName;
	}

	public void setRelativeName(String relativeName) {
		this.relativeName = relativeName;
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

	public String getOldPatientId() {
		return oldPatientId;
	}

	public void setOldPatientId(String oldPatientId) {
		this.oldPatientId = oldPatientId;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public int getMaritalStatusId() {
		return maritalStatusId;
	}

	public void setMaritalStatusId(int maritalStatusId) {
		this.maritalStatusId = maritalStatusId;
	}

	public int getNationalityId() {
		return nationalityId;
	}

	public void setNationalityId(int nationalityId) {
		this.nationalityId = nationalityId;
	}

	public int getReligionId() {
		return religionId;
	}

	public void setReligionId(int religionId) {
		this.religionId = religionId;
	}

	public int getLanguageId() {
		return languageId;
	}

	public void setLanguageId(int languageId) {
		this.languageId = languageId;
	}

	public int getBloodGroupId() {
		return bloodGroupId;
	}

	public void setBloodGroupId(int bloodGroupId) {
		this.bloodGroupId = bloodGroupId;
	}

	public int getIdentityProofId() {
		return identityProofId;
	}

	public void setIdentityProofId(int identityProofId) {
		this.identityProofId = identityProofId;
	}

	public String getIdentificationNumber() {
		return identificationNumber;
	}

	public void setIdentificationNumber(String identificationNumber) {
		this.identificationNumber = identificationNumber;
	}

	public int getAnnualIncomeId() {
		return annualIncomeId;
	}

	public void setAnnualIncomeId(int annualIncomeId) {
		this.annualIncomeId = annualIncomeId;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	public List<RegistrationDto> getListReg() {
		return listReg;
	}

	public void setListReg(List<RegistrationDto> listReg) {
		this.listReg = listReg;
	}

	public List<RegistrationDto> getPatientList() {
		return patientList;
	}

	public void setPatientList(List<RegistrationDto> patientList) {
		this.patientList = patientList;
	}

	public List<Users> getUserList() {
		return userList;
	}

	public void setUserList(List<Users> userList) {
		this.userList = userList;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public List<TreatmentDto> getListTreatment() {
		return listTreatment;
	}

	public void setListTreatment(List<TreatmentDto> listTreatment) {
		this.listTreatment = listTreatment;
	}

	public List<BillMasterDto> getListBill() {
		return listBill;
	}

	public void setListBill(List<BillMasterDto> listBill) {
		this.listBill = listBill;
	}
	
	

	/*
	 * public List<BillDetailsDto> getListBillDetails() { return listBillDetails; }
	 * 
	 * public void setListBillDetails(List<BillDetailsDto> listBillDetails) {
	 * this.listBillDetails = listBillDetails; }
	 * 
	 * public List<BillDetailsIpdDto> getListBillDetailsIpd() { return
	 * listBillDetailsIpd; }
	 * 
	 * public void setListBillDetailsIpd(List<BillDetailsIpdDto> listBillDetailsIpd)
	 * { this.listBillDetailsIpd = listBillDetailsIpd; }
	 */

	public List<BillDetailsDto> getListBillDetails() {
		return listBillDetails;
	}

	public void setListBillDetails(List<BillDetailsDto> listBillDetails) {
		this.listBillDetails = listBillDetails;
	}

	public List<PaymentResponsibleDto> getListPayRes() {
		return listPayRes;
	}

	public void setListPayRes(List<PaymentResponsibleDto> listPayRes) {
		this.listPayRes = listPayRes;
	}

	public List<MlcDetailsDto> getListMlcDetails() {
		return listMlcDetails;
	}

	public void setListMlcDetails(List<MlcDetailsDto> listMlcDetails) {
		this.listMlcDetails = listMlcDetails;
	}

	public List<MultipleSponsorDto> getListMultipleSponsor() {
		return listMultipleSponsor;
	}

	public void setListMultipleSponsor(List<MultipleSponsorDto> listMultipleSponsor) {
		this.listMultipleSponsor = listMultipleSponsor;
	}

	public int getAdmitedDays() {
		return admitedDays;
	}

	public void setAdmitedDays(int admitedDays) {
		this.admitedDays = admitedDays;
	}

	public String getDocName() {
		return docName;
	}

	public void setDocName(String docName) {
		this.docName = docName;
	}

	public int getSourceTypeId() {
		return sourceTypeId;
	}

	public void setSourceTypeId(int sourceTypeId) {
		this.sourceTypeId = sourceTypeId;
	}

	public String getSponsorName() {
		return sponsorName;
	}

	public void setSponsorName(String sponsorName) {
		this.sponsorName = sponsorName;
	}

	public String getQueryType() {
		return queryType;
	}

	public void setQueryType(String queryType) {
		this.queryType = queryType;
	}

	public Treatment getObjTreatment() {
		return objTreatment;
	}

	public void setObjTreatment(Treatment objTreatment) {
		this.objTreatment = objTreatment;
	}

	public TreatMentBeds getObjtreatmentbeds() {
		return objtreatmentbeds;
	}

	public void setObjtreatmentbeds(TreatMentBeds objtreatmentbeds) {
		this.objtreatmentbeds = objtreatmentbeds;
	}

	public OrganDonationRegistrationDto getOrganDonationRegistrationDto() {
		return organDonationRegistrationDto;
	}

	public void setOrganDonationRegistrationDto(
			OrganDonationRegistrationDto organDonationRegistrationDto) {
		this.organDonationRegistrationDto = organDonationRegistrationDto;
	}

	public Integer getMaxTreatmentId() {
		return maxTreatmentId;
	}

	public void setMaxTreatmentId(Integer maxTreatmentId) {
		this.maxTreatmentId = maxTreatmentId;
	}

	public int getPatientApId() {
		return patientApId;
	}

	public void setPatientApId(int patientApId) {
		this.patientApId = patientApId;
	}

	public String getIvfTreatFlag() {
		return ivfTreatFlag;
	}

	public void setIvfTreatFlag(String ivfTreatFlag) {
		this.ivfTreatFlag = ivfTreatFlag;
	}

	public String getHealthId() {
		return healthId;
	}

	public void setHealthId(String healthId) {
		this.healthId = healthId;
	}

	public String getHealthIdNumber() {
		return healthIdNumber;
	}

	public void setHealthIdNumber(String healthIdNumber) {
		this.healthIdNumber = healthIdNumber;
	}

	public String getLegacyUHIDNumber() {
		return legacyUHIDNumber;
	}

	public void setLegacyUHIDNumber(String legacyUHIDNumber) {
		this.legacyUHIDNumber = legacyUHIDNumber;
	}

	@Override
	public String toString() {
		return "RegistrationDto [patientId=" + patientId + ", centerPatientId=" + centerPatientId + ", prefix=" + prefix
				+ ", fName=" + fName + ", mName=" + mName + ", lName=" + lName + ", mobile=" + mobile + ", gender="
				+ gender + ", dob=" + dob + ", age=" + age + ", ageMonths=" + ageMonths + ", ageDays=" + ageDays
				+ ", talukaId=" + talukaId + ", townId=" + townId + ", districtId=" + districtId + ", stateId="
				+ stateId + ", countryId=" + countryId + ", areaCode=" + areaCode + ", unitId=" + unitId + ", deleted="
				+ deleted + ", organDonarFlag=" + organDonarFlag + ", createdBy=" + createdBy + ", createdDateTime="
				+ createdDateTime + ", blockedDateTime=" + blockedDateTime + ", updatedBy=" + updatedBy
				+ ", updatedDateTime=" + updatedDateTime + ", deletedBy=" + deletedBy + ", deletedDateTime="
				+ deletedDateTime + ", mrnno=" + mrnno + ", unitCount=" + unitCount + ", transSMS=" + transSMS
				+ ", transEmail=" + transEmail + ", pramoEmail=" + pramoEmail + ", pramoSMS=" + pramoSMS + ", external="
				+ external + ", emergency=" + emergency + ", adharcardNo=" + adharcardNo + ", address=" + address
				+ ", imageName=" + imageName + ", aadharImageName=" + aadharImageName + ", blockFlag=" + blockFlag
				+ ", blockNarration1=" + blockNarration1 + ", blockNarration2=" + blockNarration2 + ", blockNarration3="
				+ blockNarration3 + ", blockUserName1=" + blockUserName1 + ", blockUserName2=" + blockUserName2
				+ ", blockUserName3=" + blockUserName3 + ", blockUserId1=" + blockUserId1 + ", blockUserId2="
				+ blockUserId2 + ", blockUserId3=" + blockUserId3 + ", passport=" + passport + ", visa=" + visa
				+ ", relationId=" + relationId + ", relativeName=" + relativeName + ", perAddress=" + perAddress
				+ ", pertalukaId=" + pertalukaId + ", pertownId=" + pertownId + ", perdistrictId=" + perdistrictId
				+ ", perstateId=" + perstateId + ", percountryId=" + percountryId + ", perareaCode=" + perareaCode
				+ ", oldPatientId=" + oldPatientId + ", emailId=" + emailId + ", maritalStatusId=" + maritalStatusId
				+ ", nationalityId=" + nationalityId + ", religionId=" + religionId + ", languageId=" + languageId
				+ ", bloodGroupId=" + bloodGroupId + ", identityProofId=" + identityProofId + ", identificationNumber="
				+ identificationNumber + ", annualIncomeId=" + annualIncomeId + ", occupation=" + occupation
				+ ", education=" + education + ", ivfTreatFlag=" + ivfTreatFlag + ", healthId=" + healthId
				+ ", healthIdNumber=" + healthIdNumber + ", patientApId=" + patientApId + ", listReg=" + listReg
				+ ", patientList=" + patientList + ", maxTreatmentId=" + maxTreatmentId
				+ ", organDonationRegistrationDto=" + organDonationRegistrationDto + ", listTreatment=" + listTreatment
				+ ", listBill=" + listBill + ", listBillDetails=" + listBillDetails + ", listPayRes=" + listPayRes
				+ ", listMlcDetails=" + listMlcDetails + ", listMultipleSponsor=" + listMultipleSponsor
				+ ", legacyUHIDNumber=" + legacyUHIDNumber + ", userList=" + userList + ", admitedDays=" + admitedDays
				+ ", docName=" + docName + ", sourceTypeId=" + sourceTypeId + ", sponsorName=" + sponsorName
				+ ", queryType=" + queryType + ", objTreatment=" + objTreatment + ", patient_ID=" + patient_ID
				+ ", treatment_id=" + treatment_id + ", title=" + title + ", bloodGroup=" + bloodGroup + ", sex=" + sex
				+ ", weight=" + weight + ", height=" + height + ", officeNumber=" + officeNumber + ", wtType=" + wtType
				+ ", bedNo=" + bedNo + ", objtreatmentbeds=" + objtreatmentbeds + ", age1=" + age1 + ", patientidivf="
				+ patientidivf + ", patientNameivf=" + patientNameivf + ", patientidivffemale=" + patientidivffemale
				+ ", patientNameivffemale=" + patientNameivffemale + ", tflg=" + tflg + ", department_id="
				+ department_id + ", patient_weight=" + patient_weight + "]";
	}


	
	
	
	
}
