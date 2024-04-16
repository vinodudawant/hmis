package com.hms.registration.dto;

import java.util.Date;
import java.util.List;

import com.hms.ehat.dto.DoctorDto;

/**
 * @author Lenovo
 *
 */
public class MarkvisitPatientDetailsDto {

	int ptId,ttId,billId,deptId,age,unitId,talukaId,districtId,stateId,areaCode,countryId,twnId,token,patientCatId,sponsorCatId,ageDays,sponsorchargesSlaveId,reason_of_visit;
	int refdocid,ageMonths,sourceTypeId,caseType,count,reqGenFormId,referredSource,referredSourceDocId,invoiceCount,relationId,blockUserId1,blockUserId2,blockUserId3;
	int pertalukaId,pertownId,perdistrictId,perstateId,percountryId,perareaCode,maritalStatusId,nationalityId,languageId,bloodGroupId,identityProofId,annualIncomeId,religionId,customerType,customerId;
	Number createdBy,updatedBy;
	String centerPatientId,prefix,fName,mName,lName,gender,mobile,emailId,dob,mrnno,deleted,drId,specialityId,tFlag,empid,transSMS,transEmail,pramoEmail,pramoSMS,external,emergency,adharcardNo;
	String tpaid,address,perAddress,imageName,aadharImageName,referredBy,referredSourceSlave,invoiceFlag,passport,visa,relativeName,oldPatientId,identificationNumber;
	String occupation,education,sactionOrdNo,neisNo,visitNo,ipdOrOpd,treatPermited,diseToBeTreat,blockNarration1,blockNarration2,blockNarration3,admissionDateTime;
	String createdByUser,updatedByUser,casualityFlag,ivfTreatFlag;
	double height,weight,sanctionAmt,f_height,m_height;
	Date createdDateTime,updatedDateTime,refDate,validUpToDate;
	List<MarkvisitPatientDetailsDto> lstMarkVisit;
	List<DoctorDto> lstDoctorDto;
	
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
	public int getUnitId() {
		return unitId;
	}
	public void setUnitId(int unitId) {
		this.unitId = unitId;
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
	public int getToken() {
		return token;
	}
	public void setToken(int token) {
		this.token = token;
	}
	public int getPatientCatId() {
		return patientCatId;
	}
	public void setPatientCatId(int patientCatId) {
		this.patientCatId = patientCatId;
	}
	public int getSponsorCatId() {
		return sponsorCatId;
	}
	public void setSponsorCatId(int sponsorCatId) {
		this.sponsorCatId = sponsorCatId;
	}
	public int getAgeDays() {
		return ageDays;
	}
	public void setAgeDays(int ageDays) {
		this.ageDays = ageDays;
	}
	public int getSponsorchargesSlaveId() {
		return sponsorchargesSlaveId;
	}
	public void setSponsorchargesSlaveId(int sponsorchargesSlaveId) {
		this.sponsorchargesSlaveId = sponsorchargesSlaveId;
	}
	public int getRefdocid() {
		return refdocid;
	}
	public void setRefdocid(int refdocid) {
		this.refdocid = refdocid;
	}
	public int getAgeMonths() {
		return ageMonths;
	}
	public void setAgeMonths(int ageMonths) {
		this.ageMonths = ageMonths;
	}
	public int getSourceTypeId() {
		return sourceTypeId;
	}
	public void setSourceTypeId(int sourceTypeId) {
		this.sourceTypeId = sourceTypeId;
	}
	public int getCaseType() {
		return caseType;
	}
	public void setCaseType(int caseType) {
		this.caseType = caseType;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public Number getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(Number createdBy) {
		this.createdBy = createdBy;
	}
	public Number getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(Number updatedBy) {
		this.updatedBy = updatedBy;
	}
	public int getReqGenFormId() {
		return reqGenFormId;
	}
	public void setReqGenFormId(int reqGenFormId) {
		this.reqGenFormId = reqGenFormId;
	}
	public int getReferredSource() {
		return referredSource;
	}
	public void setReferredSource(int referredSource) {
		this.referredSource = referredSource;
	}
	public int getReferredSourceDocId() {
		return referredSourceDocId;
	}
	public void setReferredSourceDocId(int referredSourceDocId) {
		this.referredSourceDocId = referredSourceDocId;
	}
	public int getInvoiceCount() {
		return invoiceCount;
	}
	public void setInvoiceCount(int invoiceCount) {
		this.invoiceCount = invoiceCount;
	}
	public int getRelationId() {
		return relationId;
	}
	public void setRelationId(int relationId) {
		this.relationId = relationId;
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
	public int getReligionId() {
		return religionId;
	}
	public void setReligionId(int religionId) {
		this.religionId = religionId;
	}
	public int getCustomerType() {
		return customerType;
	}
	public void setCustomerType(int customerType) {
		this.customerType = customerType;
	}
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
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
	public String getMrnno() {
		return mrnno;
	}
	public void setMrnno(String mrnno) {
		this.mrnno = mrnno;
	}
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	public String getDrId() {
		return drId;
	}
	public void setDrId(String drId) {
		this.drId = drId;
	}
	public String getSpecialityId() {
		return specialityId;
	}
	public void setSpecialityId(String specialityId) {
		this.specialityId = specialityId;
	}
	public String gettFlag() {
		return tFlag;
	}
	public void settFlag(String tFlag) {
		this.tFlag = tFlag;
	}
	public String getEmpid() {
		return empid;
	}
	public void setEmpid(String empid) {
		this.empid = empid;
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
	public String getTpaid() {
		return tpaid;
	}
	public void setTpaid(String tpaid) {
		this.tpaid = tpaid;
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
	public String getReferredBy() {
		return referredBy;
	}
	public void setReferredBy(String referredBy) {
		this.referredBy = referredBy;
	}
	public String getReferredSourceSlave() {
		return referredSourceSlave;
	}
	public void setReferredSourceSlave(String referredSourceSlave) {
		this.referredSourceSlave = referredSourceSlave;
	}
	public String getInvoiceFlag() {
		return invoiceFlag;
	}
	public void setInvoiceFlag(String invoiceFlag) {
		this.invoiceFlag = invoiceFlag;
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
	public String getRelativeName() {
		return relativeName;
	}
	public void setRelativeName(String relativeName) {
		this.relativeName = relativeName;
	}
	public String getOldPatientId() {
		return oldPatientId;
	}
	public void setOldPatientId(String oldPatientId) {
		this.oldPatientId = oldPatientId;
	}
	public String getIdentificationNumber() {
		return identificationNumber;
	}
	public void setIdentificationNumber(String identificationNumber) {
		this.identificationNumber = identificationNumber;
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
	public String getSactionOrdNo() {
		return sactionOrdNo;
	}
	public void setSactionOrdNo(String sactionOrdNo) {
		this.sactionOrdNo = sactionOrdNo;
	}
	public String getNeisNo() {
		return neisNo;
	}
	public void setNeisNo(String neisNo) {
		this.neisNo = neisNo;
	}
	public String getVisitNo() {
		return visitNo;
	}
	public void setVisitNo(String visitNo) {
		this.visitNo = visitNo;
	}
	public String getIpdOrOpd() {
		return ipdOrOpd;
	}
	public void setIpdOrOpd(String ipdOrOpd) {
		this.ipdOrOpd = ipdOrOpd;
	}
	public String getTreatPermited() {
		return treatPermited;
	}
	public void setTreatPermited(String treatPermited) {
		this.treatPermited = treatPermited;
	}
	public String getDiseToBeTreat() {
		return diseToBeTreat;
	}
	public void setDiseToBeTreat(String diseToBeTreat) {
		this.diseToBeTreat = diseToBeTreat;
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
	public String getAdmissionDateTime() {
		return admissionDateTime;
	}
	public void setAdmissionDateTime(String admissionDateTime) {
		this.admissionDateTime = admissionDateTime;
	}
	public int getReason_of_visit() {
		return reason_of_visit;
	}
	public void setReason_of_visit(int reason_of_visit) {
		this.reason_of_visit = reason_of_visit;
	}
	public String getCreatedByUser() {
		return createdByUser;
	}
	public void setCreatedByUser(String createdByUser) {
		this.createdByUser = createdByUser;
	}
	public String getUpdatedByUser() {
		return updatedByUser;
	}
	public void setUpdatedByUser(String updatedByUser) {
		this.updatedByUser = updatedByUser;
	}
	public String getCasualityFlag() {
		return casualityFlag;
	}
	public void setCasualityFlag(String casualityFlag) {
		this.casualityFlag = casualityFlag;
	}
	public String getIvfTreatFlag() {
		return ivfTreatFlag;
	}
	public void setIvfTreatFlag(String ivfTreatFlag) {
		this.ivfTreatFlag = ivfTreatFlag;
	}
	public double getHeight() {
		return height;
	}
	public void setHeight(double height) {
		this.height = height;
	}
	public double getWeight() {
		return weight;
	}
	public void setWeight(double weight) {
		this.weight = weight;
	}
	public double getSanctionAmt() {
		return sanctionAmt;
	}
	public void setSanctionAmt(double sanctionAmt) {
		this.sanctionAmt = sanctionAmt;
	}
	
	
	public double getF_height() {
		return f_height;
	}
	public void setF_height(double f_height) {
		this.f_height = f_height;
	}
	public double getM_height() {
		return m_height;
	}
	public void setM_height(double m_height) {
		this.m_height = m_height;
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
	public Date getRefDate() {
		return refDate;
	}
	public void setRefDate(Date refDate) {
		this.refDate = refDate;
	}
	public Date getValidUpToDate() {
		return validUpToDate;
	}
	public void setValidUpToDate(Date validUpToDate) {
		this.validUpToDate = validUpToDate;
	}
	public List<MarkvisitPatientDetailsDto> getLstMarkVisit() {
		return lstMarkVisit;
	}
	public void setLstMarkVisit(List<MarkvisitPatientDetailsDto> lstMarkVisit) {
		this.lstMarkVisit = lstMarkVisit;
	}
	public List<DoctorDto> getLstDoctorDto() {
		return lstDoctorDto;
	}
	public void setLstDoctorDto(List<DoctorDto> lstDoctorDto) {
		this.lstDoctorDto = lstDoctorDto;
	}
}