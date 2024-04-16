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
@Table(name = "area_wise_patient_view")
public class AreaWisePatientViewDto {
	@Id
	@GeneratedValue
	@Column(name = "patient_id")
	private Integer patientId;
	
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
	
	@Column(name = "block_flag",columnDefinition="varchar(2) default 'N'")
	private String blockFlag ="N";
	
	@Column(name = "block_narration_1",columnDefinition="varchar(5000) default '-'")
	private String blockNarration1 ="-";
	
	@Column(name = "block_narration_2",columnDefinition="varchar(5000) default '-'")
	private String blockNarration2 ="-";
	
	@Column(name = "block_narration_3",columnDefinition="varchar(5000) default '-'")
	private String blockNarration3 ="-";
	
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
	
	@Column(name = "old_patient_id",columnDefinition="int default 0")
	private int oldPatientId=0;
	
	@Column(name = "email_id",columnDefinition="varchar(255) default '-'")
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
	
	@Column(name = "identification_number",columnDefinition="varchar(255) default '-'")
	private String identificationNumber="-";
	
	@Column(name = "annual_income_id",columnDefinition="int default 0")
	private int annualIncomeId;
	
	@Column(name = "occupation",columnDefinition="varchar(255) default '-'")
	private String occupation="-";
	
	@Column(name = "education",columnDefinition="varchar(255) default '-'")
	private String education="-";
	
	@Column(name = "taluka_name")
	private String talukaName;
	
	@Column(name = "dis_name")
	private String distName;
	
	@Column(name = "city_name")
	private String cityName;
	
	@Column(name = "state_name")
	private String stateName;
	
	@Transient
	private List<AreaWisePatientViewDto> listAreaWisePatientView;

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

	public int getOldPatientId() {
		return oldPatientId;
	}

	public void setOldPatientId(int oldPatientId) {
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

	public String getTalukaName() {
		return talukaName;
	}

	public void setTalukaName(String talukaName) {
		this.talukaName = talukaName;
	}

	public String getDistName() {
		return distName;
	}

	public void setDistName(String distName) {
		this.distName = distName;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	public List<AreaWisePatientViewDto> getListAreaWisePatientView() {
		return listAreaWisePatientView;
	}

	public void setListAreaWisePatientView(
			List<AreaWisePatientViewDto> listAreaWisePatientView) {
		this.listAreaWisePatientView = listAreaWisePatientView;
	}

}
