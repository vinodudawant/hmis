package com.hms.sandbox.dto;

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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

/**
 * @author s2cli
 *
 */
@Component
@Entity
@Table(name = "ehat_patient_sandbox")
public class SandBoxPatientInfo {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "sanbox_patient_id")
	private Integer sandBoxpatientId;

	@Column(name = "patient_id")
	private Integer patientId;

	@Column(name = "center_patient_id", updatable = false, columnDefinition = "varchar(255) default '-'")
	private String centerPatientId = "-";

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

	@Column(name = "age", columnDefinition = "int default 0")
	private int age;

	@Column(name = "age_months", columnDefinition = "int default 0")
	private int ageMonths;

	@Column(name = "age_days", columnDefinition = "int default 0")
	private int ageDays;

	@Column(name = "taluka_id", columnDefinition = "int default 0")
	private int talukaId;

	@Column(name = "town_id", columnDefinition = "int default 0")
	private int townId;

	@Column(name = "district_id", columnDefinition = "int default 0")
	private int districtId;

	@Column(name = "state_id", columnDefinition = "int default 0")
	private int stateId;

	@Column(name = "country_id", columnDefinition = "int default 1")
	private int countryId;

	@Column(name = "area_code", columnDefinition = "int default 0")
	private int areaCode;

	@Column(name = "unit_id", columnDefinition = "int default 1")
	private int unitId;

	@Column(name = "deleted", columnDefinition = "varchar(2) default 'N'")
	private String deleted = "N";

	@Column(name = "organ_donar_flag")
	private String organDonarFlag = "N";

	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
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

	@Column(name = "transSMS", columnDefinition = "varchar(2) default 'N'")
	private String transSMS;

	@Column(name = "transEmail", columnDefinition = "varchar(2) default 'N'")
	private String transEmail;

	@Column(name = "pramoEmail", columnDefinition = "varchar(2) default 'N'")
	private String pramoEmail;

	@Column(name = "pramoSMS", columnDefinition = "varchar(2) default 'N'")
	private String pramoSMS;

	@Column(name = "external", columnDefinition = "varchar(2) default 'N'")
	private String external;

	@Column(name = "emergency", columnDefinition = "varchar(2) default 'N'")
	private String emergency;

	@Column(name = "adharcardNo")
	private String adharcardNo;

	@Column(name = "address")
	private String address;

	@Column(name = "image_name")
	private String imageName = "patientPhoto.jpg";

	@Column(name = "aadhar_image_name", columnDefinition = "varchar(250) default 'aadhar.jpg'")
	private String aadharImageName = "aadhar.jpg";

	@Column(name = "block_flag", columnDefinition = "varchar(2) default 'N'")
	private String blockFlag = "N";

	@Column(name = "block_narration_1", columnDefinition = "text")
	private String blockNarration1 = "-";

	@Column(name = "block_narration_2", columnDefinition = "text")
	private String blockNarration2 = "-";

	@Column(name = "block_narration_3", columnDefinition = "text")
	private String blockNarration3 = "-";

	@Column(name = "block_user_name_1", columnDefinition = "text")
	private String blockUserName1 = "-";

	@Column(name = "block_user_name_2", columnDefinition = "text")
	private String blockUserName2 = "-";

	@Column(name = "block_user_name_3", columnDefinition = "text")
	private String blockUserName3 = "-";

	@Column(name = "block_user_id_1", columnDefinition = "int default 0")
	private int blockUserId1 = 0;

	@Column(name = "block_user_id_2", columnDefinition = "int default 0")
	private int blockUserId2 = 0;

	@Column(name = "block_user_id_3", columnDefinition = "int default 0")
	private int blockUserId3 = 0;

	@Column(name = "passport", columnDefinition = "varchar(55) default '-'")
	private String passport;

	@Column(name = "visa", columnDefinition = "varchar(55) default '-'")
	private String visa;

	@Column(name = "relation_id", columnDefinition = "int default 0")
	private int relationId;

	@Column(name = "relative_name", columnDefinition = "varchar(55) default '-'")
	private String relativeName;

	// Added on 07-May-2018 For Permanant Address.
	@Column(name = "per_address")
	private String perAddress;

	@Column(name = "per_taluka_id", columnDefinition = "int default 0")
	private int pertalukaId;

	@Column(name = "per_town_id", columnDefinition = "int default 0")
	private int pertownId;

	@Column(name = "per_district_id", columnDefinition = "int default 0")
	private int perdistrictId;

	@Column(name = "per_state_id", columnDefinition = "int default 0")
	private int perstateId;

	@Column(name = "per_country_id", columnDefinition = "int default 1")
	private int percountryId;

	@Column(name = "per_area_code", columnDefinition = "int default 0")
	private int perareaCode;

	// additional information columns added
	@Column(name = "old_patient_id", columnDefinition = "varchar(20) default '0'")
	private String oldPatientId = "0";

	@Column(name = "email_id", columnDefinition = "varchar(250) default '-'")
	private String emailId;

	@Column(name = "marital_status_id", columnDefinition = "int default 0")
	private int maritalStatusId;

	@Column(name = "nationality_id", columnDefinition = "int default 0")
	private int nationalityId;

	@Column(name = "religion_id", columnDefinition = "int default 0")
	private int religionId;

	@Column(name = "language_id", columnDefinition = "int default 0")
	private int languageId;

	@Column(name = "blood_group_id", columnDefinition = "int default 0")
	private int bloodGroupId;

	@Column(name = "identity_proof_id", columnDefinition = "int default 0")
	private int identityProofId;

	@Column(name = "identification_number", columnDefinition = "varchar(100) default '-'")
	private String identificationNumber = "-";

	@Column(name = "annual_income_id", columnDefinition = "int default 0")
	private int annualIncomeId;

	@Column(name = "occupation", columnDefinition = "varchar(250) default '-'")
	private String occupation = "-";

	@Column(name = "education", columnDefinition = "varchar(250) default '-'")
	private String education = "-";

	@Column(name = "ivf_treat_flag", columnDefinition = "varchar(2) default 'N'")
	private String ivfTreatFlag = "N";

	@Column(name = "helath_id", columnDefinition = "varchar(100) default '0'")
	private String helathId;

	@Column(name = "helath_id_number", columnDefinition = "varchar(100) default '0'")
	private String helathIdnumber;
	
	@Column(name = "auth_init_request_id", updatable = false, columnDefinition = "varchar(400) default '0'")
	private String authInitRequestId = "0";
	
	@Column(name = "auth_confirm_request_id", updatable = false, columnDefinition = "varchar(400) default '0'")
	private String authConfirmRequestId = "0";

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "patient_id", nullable = false, updatable = false)
	private List<SandBoxPatientDignosis> listSandBoxDigno;
	
	@Column(name = "prescription_encrypted_data")
	private String prescriptionEncryptedData;
	
	@Column(name = "auth_init_transaction_id", updatable = false, columnDefinition = "varchar(400) default '0'")
	private String authInitTransactionId = "0";
	
	@Column(name = "profile_shaire_request_id", updatable = false, columnDefinition = "varchar(400) default '0'")
	private String  profileShaireRequestId = "0";
	
	@Column(name = "care_context_linking_token", columnDefinition = "varchar(500) default '0'")
	private String linkingToken="0";
	
	@Column(name = "patient_full_name", columnDefinition = "varchar(100) default '0'")
	private String patientFullNAme="0";
	
	@Column(name = "link_init_patient_reference_number", columnDefinition = "varchar(100) default '0'")
	private String linkInitpatientRefreneceNumber="0";
	
	@Column(name = "link_init_care_reference_number", columnDefinition = "varchar(100) default '0'")
	private String linkInitCareRefreneceNumber="0";
	
	
	
	public String getPatientFullNAme() {
		return patientFullNAme;
	}

	public void setPatientFullNAme(String patientFullNAme) {
		this.patientFullNAme = patientFullNAme;
	}

	public String getLinkingToken() {
		return linkingToken;
	}

	public void setLinkingToken(String linkingToken) {
		this.linkingToken = linkingToken;
	}

	public String getPrescriptionEncryptedData() {
		return prescriptionEncryptedData;
	}

	public void setPrescriptionEncryptedData(String prescriptionEncryptedData) {
		this.prescriptionEncryptedData = prescriptionEncryptedData;
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

	public String getIvfTreatFlag() {
		return ivfTreatFlag;
	}

	public void setIvfTreatFlag(String ivfTreatFlag) {
		this.ivfTreatFlag = ivfTreatFlag;
	}

	public List<SandBoxPatientDignosis> getListSandBoxDigno() {
		return listSandBoxDigno;
	}

	public void setListSandBoxDigno(List<SandBoxPatientDignosis> listSandBoxDigno) {
		this.listSandBoxDigno = listSandBoxDigno;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getHelathId() {
		return helathId;
	}

	public void setHelathId(String helathId) {
		this.helathId = helathId;
	}

	public String getHelathIdnumber() {
		return helathIdnumber;
	}

	public void setHelathIdnumber(String helathIdnumber) {
		this.helathIdnumber = helathIdnumber;
	}

	public Integer getSandBoxpatientId() {
		return sandBoxpatientId;
	}

	public void setSandBoxpatientId(Integer sandBoxpatientId) {
		this.sandBoxpatientId = sandBoxpatientId;
	}

	public String getAuthInitRequestId() {
		return authInitRequestId;
	}

	public void setAuthInitRequestId(String authInitRequestId) {
		this.authInitRequestId = authInitRequestId;
	}

	public String getAuthConfirmRequestId() {
		return authConfirmRequestId;
	}

	public void setAuthConfirmRequestId(String authConfirmRequestId) {
		this.authConfirmRequestId = authConfirmRequestId;
	}

	public String getAuthInitTransactionId() {
		return authInitTransactionId;
	}

	public void setAuthInitTransactionId(String authInitTransactionId) {
		this.authInitTransactionId = authInitTransactionId;
	}

	public String getProfileShaireRequestId() {
		return profileShaireRequestId;
	}

	public void setProfileShaireRequestId(String profileShaireRequestId) {
		this.profileShaireRequestId = profileShaireRequestId;
	}

	public String getLinkInitpatientRefreneceNumber() {
		return linkInitpatientRefreneceNumber;
	}

	public void setLinkInitpatientRefreneceNumber(String linkInitpatientRefreneceNumber) {
		this.linkInitpatientRefreneceNumber = linkInitpatientRefreneceNumber;
	}

	public String getLinkInitCareRefreneceNumber() {
		return linkInitCareRefreneceNumber;
	}

	public void setLinkInitCareRefreneceNumber(String linkInitCareRefreneceNumber) {
		this.linkInitCareRefreneceNumber = linkInitCareRefreneceNumber;
	}

	@Override
	public String toString() {
		return "SandBoxPatientInfo [sandBoxpatientId=" + sandBoxpatientId + ", patientId=" + patientId
				+ ", centerPatientId=" + centerPatientId + ", prefix=" + prefix + ", fName=" + fName + ", mName="
				+ mName + ", lName=" + lName + ", mobile=" + mobile + ", gender=" + gender + ", dob=" + dob + ", age="
				+ age + ", ageMonths=" + ageMonths + ", ageDays=" + ageDays + ", talukaId=" + talukaId + ", townId="
				+ townId + ", districtId=" + districtId + ", stateId=" + stateId + ", countryId=" + countryId
				+ ", areaCode=" + areaCode + ", unitId=" + unitId + ", deleted=" + deleted + ", organDonarFlag="
				+ organDonarFlag + ", createdBy=" + createdBy + ", createdDateTime=" + createdDateTime
				+ ", blockedDateTime=" + blockedDateTime + ", updatedBy=" + updatedBy + ", updatedDateTime="
				+ updatedDateTime + ", deletedBy=" + deletedBy + ", deletedDateTime=" + deletedDateTime + ", mrnno="
				+ mrnno + ", unitCount=" + unitCount + ", transSMS=" + transSMS + ", transEmail=" + transEmail
				+ ", pramoEmail=" + pramoEmail + ", pramoSMS=" + pramoSMS + ", external=" + external + ", emergency="
				+ emergency + ", adharcardNo=" + adharcardNo + ", address=" + address + ", imageName=" + imageName
				+ ", aadharImageName=" + aadharImageName + ", blockFlag=" + blockFlag + ", blockNarration1="
				+ blockNarration1 + ", blockNarration2=" + blockNarration2 + ", blockNarration3=" + blockNarration3
				+ ", blockUserName1=" + blockUserName1 + ", blockUserName2=" + blockUserName2 + ", blockUserName3="
				+ blockUserName3 + ", blockUserId1=" + blockUserId1 + ", blockUserId2=" + blockUserId2
				+ ", blockUserId3=" + blockUserId3 + ", passport=" + passport + ", visa=" + visa + ", relationId="
				+ relationId + ", relativeName=" + relativeName + ", perAddress=" + perAddress + ", pertalukaId="
				+ pertalukaId + ", pertownId=" + pertownId + ", perdistrictId=" + perdistrictId + ", perstateId="
				+ perstateId + ", percountryId=" + percountryId + ", perareaCode=" + perareaCode + ", oldPatientId="
				+ oldPatientId + ", emailId=" + emailId + ", maritalStatusId=" + maritalStatusId + ", nationalityId="
				+ nationalityId + ", religionId=" + religionId + ", languageId=" + languageId + ", bloodGroupId="
				+ bloodGroupId + ", identityProofId=" + identityProofId + ", identificationNumber="
				+ identificationNumber + ", annualIncomeId=" + annualIncomeId + ", occupation=" + occupation
				+ ", education=" + education + ", ivfTreatFlag=" + ivfTreatFlag + ", helathId=" + helathId
				+ ", helathIdnumber=" + helathIdnumber + ", authInitRequestId=" + authInitRequestId
				+ ", authConfirmRequestId=" + authConfirmRequestId + ", listSandBoxDigno=" + listSandBoxDigno
				+ ", prescriptionEncryptedData=" + prescriptionEncryptedData + ", authInitTransactionId="
				+ authInitTransactionId + ", profileShaireRequestId=" + profileShaireRequestId + ", linkingToken="
				+ linkingToken + ", patientFullNAme=" + patientFullNAme + ", linkInitpatientRefreneceNumber="
				+ linkInitpatientRefreneceNumber + ", linkInitCareRefreneceNumber=" + linkInitCareRefreneceNumber + "]";
	}

		
	
	
	
	
}
