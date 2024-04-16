package com.hms.registration.dto;

import java.util.Date;
import java.util.List;

public class RegisterOnlyPatientDetails {

	int ptId,ttId=0,billId=0,deptId=0,age,talukaId,districtId,stateId,areaCode,countryId,twnId,pertalukaId,pertownId,perdistrictId,perstateId,percountryId,perareaCode;
	int ageDays,ageMonths,maritalStatusId,nationalityId,languageId,bloodGroupId,identityProofId,annualIncomeId,relationId,religionId,blockUserId1,blockUserId2,blockUserId3,createdBy,updatedBy;
	String centerPatientId,prefix,fName,mName,lName,gender,mobile,emailId,dob,specialityId,deleted,address, transSMS,transEmail,pramoEmail,pramoSMS,external,emergency,adharcardNo;
	String mrnno,oldPatientId,blockNarration1,blockNarration2,blockNarration3,occupation,education,perAddress,relativeName,imageName,aadharImageName,passport,visa;
	Date createdDateTime,updatedDateTime;
	List<RegisterOnlyPatientDetails> lstPatientDetails;
	
	public int getPtId() {
		return ptId;
	}
	public void setPtId(int ptId) {
		this.ptId = ptId;
	}
	public int getTtId() {
		return ttId;
	}
	public void setTtId(int ttId) {
		this.ttId = ttId;
	}
	public int getBillId() {
		return billId;
	}
	public void setBillId(int billId) {
		this.billId = billId;
	}
	public int getDeptId() {
		return deptId;
	}
	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
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
	public int getAreaCode() {
		return areaCode;
	}
	public void setAreaCode(int areaCode) {
		this.areaCode = areaCode;
	}
	public int getCountryId() {
		return countryId;
	}
	public void setCountryId(int countryId) {
		this.countryId = countryId;
	}
	public int getTwnId() {
		return twnId;
	}
	public void setTwnId(int twnId) {
		this.twnId = twnId;
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
	public int getAgeDays() {
		return ageDays;
	}
	public void setAgeDays(int ageDays) {
		this.ageDays = ageDays;
	}
	public int getAgeMonths() {
		return ageMonths;
	}
	public void setAgeMonths(int ageMonths) {
		this.ageMonths = ageMonths;
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
	public int getAnnualIncomeId() {
		return annualIncomeId;
	}
	public void setAnnualIncomeId(int annualIncomeId) {
		this.annualIncomeId = annualIncomeId;
	}
	public int getRelationId() {
		return relationId;
	}
	public void setRelationId(int relationId) {
		this.relationId = relationId;
	}
	public int getReligionId() {
		return religionId;
	}
	public void setReligionId(int religionId) {
		this.religionId = religionId;
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
	public int getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}
	public int getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
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
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getSpecialityId() {
		return specialityId;
	}
	public void setSpecialityId(String specialityId) {
		this.specialityId = specialityId;
	}
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
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
	public String getMrnno() {
		return mrnno;
	}
	public void setMrnno(String mrnno) {
		this.mrnno = mrnno;
	}
	public String getOldPatientId() {
		return oldPatientId;
	}
	public void setOldPatientId(String oldPatientId) {
		this.oldPatientId = oldPatientId;
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
	public String getPerAddress() {
		return perAddress;
	}
	public void setPerAddress(String perAddress) {
		this.perAddress = perAddress;
	}
	public String getRelativeName() {
		return relativeName;
	}
	public void setRelativeName(String relativeName) {
		this.relativeName = relativeName;
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
	public List<RegisterOnlyPatientDetails> getLstPatientDetails() {
		return lstPatientDetails;
	}
	public void setLstPatientDetails(List<RegisterOnlyPatientDetails> lstPatientDetails) {
		this.lstPatientDetails = lstPatientDetails;
	}	
}
