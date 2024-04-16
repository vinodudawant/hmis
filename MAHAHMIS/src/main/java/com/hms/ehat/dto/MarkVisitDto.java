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

import org.hibernate.annotations.Formula;
import org.hibernate.annotations.Immutable;
@Entity
@Immutable
@Table(name = "markvisitview")
public class MarkVisitDto {
		@Id
		@GeneratedValue
		@Column(name = "patient_id")
		private Integer ptId;
		
		@Column(name = "prefix")
		private String prefix;
		
		@Column(name = "dob")
		private String dob;
 
		@Column(name = "age",columnDefinition="int default 0")
		private int age;
		
		@Column(name = "taluka_id",columnDefinition="int default 0")
		private int talukaId;
		
 		@Column(name = "f_name")
		private String fName;
		
		@Column(name = "unit_id")
		private String unitId;
 
		@Column(name = "m_name")
		private String mName;
		
		@Column(name = "mrnno")
		private String mrnno;
		
		@Column(name = "district_id",columnDefinition="int default 0")
		private int districtId;
		
		@Column(name = "state_id",columnDefinition="int default 0")
		private int stateId;
		
		
		@Column(name = "area_code",columnDefinition="int default 0")
		private int areaCode;
		
		@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
		private String deleted;
		 
		@Column(name = "l_name")
		private String lName;
		
		@Column(name = "gender")
		private String gender;

		@Column(name = "mobile")
		private String mobile;

		@Column(name = "country_id")
		private Integer countryId;

		@Column(name = "town_id")
		private Integer twnId;
		

		@Column(name = "treatment_id")
		private Integer ttId;
		

		@Column(name = "doctor_id")
		private String drId;
		
		@Column(name = "department_id")
		private Integer deptId;
		
		
		@Column(name = "token")
		private Integer token;
		

		@Column(name = "patient_cat_id")
		private Integer patientCatId;
		

		@Column(name = "sponsor_cat_id")
		private Integer sponsorCatId;
		

		@Column(name = "age_days")
		private Integer ageDays;
		 
		@Column(name = "charges_master_slave_id")
		private Integer sponsorchargesSlaveId;
 
		@Column(name = "height")
		private Double height;
		
		@Column(name = "weight")
		private Double weight;
		
		@Column(name = "ref_doc_id")
		private Integer refdocid;
		 
		@Column(name = "age_months")
		private Integer ageMonths;
		 
		@Column(name = "source_type_id")
		private Integer sourceTypeId;
		
		@Column(name = "case_type")
		private int caseType;

		
 		@Column(name = "t_flag",columnDefinition="varchar(2) default 'N'")
		private String tFlag;
		 
		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "created_date_time",updatable=false)
		private Date createdDateTime;
		
		@Column(name = "bill_id")
		private int billId;
		
		@Column(name = "count")
		private int count;
		
		@Column(name = "empid")
		private String empid;
		
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
		
		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "updated_date_time")
		private Date updatedDateTime;

		@Column(name = "updated_by")
		private Integer updatedBy;
		
		
		@Column(name = "created_by",updatable=false)
		private Integer createdBy;
		 
		@Column(name = "tpaid")
		private String tpaid;
		
		@Column(name = "reqGenFormId")
		private int reqGenFormId=0;
		
		@Column(name = "address")
		private String address;
		
		@Column(name = "image_name")
		private String imageName;
		
		@Column(name = "aadhar_image_name")
		private String aadharImageName;
		
		@Column(name = "referred_by")
		private String referredBy;
		
		@Column(name = "referred_source")
		private Integer referredSource=0;
		
		@Column(name = "referred_source_slave")
		private String referredSourceSlave;
		
		@Column(name = "referred_source_docId")
		private Integer referredSourceDocId=0;
		
		@Column(name = "invoice_count")
		private Integer invoiceCount=0;
		
		@Column(name = "invoice_flag")
		private String invoiceFlag="N";
		
		@Column(name = "passport",columnDefinition="varchar(50) default '-'")
		private String passport;
		
		@Column(name = "visa",columnDefinition="varchar(50) default '-'")
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
		private String oldPatientId="-";
		
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
		private String identificationNumber;
		
		@Column(name = "annual_income_id",columnDefinition="int default 0")
		private int annualIncomeId;
		
		@Column(name = "occupation",columnDefinition="varchar(255) default '-'")
		private String occupation;
		
		@Column(name = "education",columnDefinition="varchar(255) default '-'")
		private String education;
		
		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "ref_date")
		private Date refDate;
		
		@Column(name = "saction_ord_no")
		private String sactionOrdNo;
		
		@Column(name = "sanction_amt")
		private double sanctionAmt;
		
		@Column(name = "neis_no")
		private String neisNo;
		
		@Column(name = "visit_no")
		private String visitNo;
		
		@Column(name = "ipd_or_opd")
		private String ipdOrOpd;
		
		@Column(name = "treat_permited")
		private String treatPermited;
		
		@Column(name = "dise_to_be_treat")
		private String diseToBeTreat;
		
		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "valid_upto_date")
		private Date validUpToDate;
		
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
		
		@Column(name = "center_patient_id")
		private String centerPatientId;

		public String getCenterPatientId() {
			return centerPatientId;
		}

		public void setCenterPatientId(String centerPatientId) {
			this.centerPatientId = centerPatientId;
		}

		public int getReqGenFormId() {
			return reqGenFormId;
		}

		public void setReqGenFormId(int reqGenFormId) {
			this.reqGenFormId = reqGenFormId;
		}

		/*@Column(name = "l_name",insertable=false,updatable=false)
		private String userNmae;
		public String getUserNmae() {
			return userNmae;
		}

		public void setUserNmae(String userNmae) {
			this.userNmae = userNmae;
		}
*/
		@Transient
		@Column(name = "admission_date_time")
		private String admissionDateTime;
		
//		@Column(name = "reason_of_visit")
//		private String reason_of_visit;		
		
		@Transient
		@Column(name = "reason_of_visit")
		private Integer reason_of_visit;		

		@Transient
		private List<MarkVisitDto> lstMarkVisit;
		
		 
		@Transient
		private List<DoctorDto> lstDoctorDto;
		
		public String getTpaid() {
			return tpaid;
		}

		public void setTpaid(String tpaid) {
			this.tpaid = tpaid;
		}
		
		public Date getUpdatedDateTime() {
			return updatedDateTime;
		}

		public void setUpdatedDateTime(Date updatedDateTime) {
			this.updatedDateTime = updatedDateTime;
		}

		public Integer getUpdatedBy() {
			return updatedBy;
		}

		public void setUpdatedBy(Integer updatedBy) {
			this.updatedBy = updatedBy;
		}

		public Integer getCreatedBy() {
			return createdBy;
		}

		public void setCreatedBy(Integer createdBy) {
			this.createdBy = createdBy;
		}

		public String getEmpid() {
			return empid;
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

		public void setEmpid(String empid) {
			this.empid = empid;
		}
		
		public Double getHeight() {
			return height;
		}

		public void setHeight(Double height) {
			this.height = height;
		}

		public Double getWeight() {
			return weight;
		}

		public void setWeight(Double weight) {
			this.weight = weight;
		}

		public Integer getRefdocid() {
			return refdocid;
		}

		public void setRefdocid(Integer refdocid) {
			this.refdocid = refdocid;
		}
 
		public Integer getSponsorchargesSlaveId() {
			return sponsorchargesSlaveId;
		}

		public void setSponsorchargesSlaveId(Integer sponsorchargesSlaveId) {
			this.sponsorchargesSlaveId = sponsorchargesSlaveId;
		}

		public Integer getAgeDays() {
			return ageDays;
		}

		public void setAgeDays(Integer ageDays) {
			this.ageDays = ageDays;
		}

		public Integer getAgeMonths() {
			return ageMonths;
		}

		public void setAgeMonths(Integer ageMonths) {
			this.ageMonths = ageMonths;
		}

		
		public Integer getToken() {
			return token;
		}

		public void setToken(Integer token) {
			this.token = token;
		}
		
		public Integer getPatientCatId() {
			return patientCatId;
		}

		public void setPatientCatId(Integer patientCatId) {
			this.patientCatId = patientCatId;
		}

		public Integer getSponsorCatId() {
			return sponsorCatId;
		}

		public void setSponsorCatId(Integer sponsorCatId) {
			this.sponsorCatId = sponsorCatId;
		}

		public Integer getSourceTypeId() {
			return sourceTypeId;
		}

		public void setSourceTypeId(Integer sourceTypeId) {
			this.sourceTypeId = sourceTypeId;
		}

		public List<DoctorDto> getLstDoctorDto() {
			return lstDoctorDto;
		}

		public void setLstDoctorDto(List<DoctorDto> lstDoctorDto) {
			this.lstDoctorDto = lstDoctorDto;
		}

		

		public String getDrId() {
			return drId;
		}

		public void setDrId(String drId) {
			this.drId = drId;
		}
		
		
		public String getUnitId() {
			return unitId;
		}

		public void setUnitId(String unitId) {
			this.unitId = unitId;
		}

		public String gettFlag() {
			return tFlag;
		}

		public void settFlag(String tFlag) {
			this.tFlag = tFlag;
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

		public String getPrefix() {
			return prefix;
		}

		public void setPrefix(String prefix) {
			this.prefix = prefix;
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

		public String getDeleted() {
			return deleted;
		}

		public void setDeleted(String deleted) {
			this.deleted = deleted;
		}

		public Date getCreatedDateTime() {
			return createdDateTime;
		}

		public void setCreatedDateTime(Date createdDateTime) {
			this.createdDateTime = createdDateTime;
		}

		public Integer getPtId() {
			return ptId;
		}

		public void setPtId(Integer ptId) {
			this.ptId = ptId;
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

		public Integer getCountryId() {
			return countryId;
		}

		public void setCountryId(Integer countryId) {
			this.countryId = countryId;
		}

		public Integer getTwnId() {
			return twnId;
		}

		public void setTwnId(Integer twnId) {
			this.twnId = twnId;
		}

		 

		public Integer getTtId() {
			return ttId;
		}

		public void setTtId(Integer ttId) {
			this.ttId = ttId;
		}

		public Integer getDeptId() {
			return deptId;
		}

		public void setDeptId(Integer deptId) {
			this.deptId = deptId;
		}

		public List<MarkVisitDto> getLstMarkVisit() {
			return lstMarkVisit;
		}

		public void setLstMarkVisit(List<MarkVisitDto> lstMarkVisit) {
			this.lstMarkVisit = lstMarkVisit;
		}

		public int getBillId() {
			return billId;
		}

		public void setBillId(int billId) {
			this.billId = billId;
		}

		public int getCount() {
			return count;
		}

		public void setCount(int count) {
			this.count = count;
		}

		public int getCaseType() {
			return caseType;
		}

		public void setCaseType(int caseType) {
			this.caseType = caseType;
		}

		public String getMrnno() {
			return mrnno;
		}

		public void setMrnno(String mrnno) {
			this.mrnno = mrnno;
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

		public String getReferredBy() {
			return referredBy;
		}

		public void setReferredBy(String referredBy) {
			this.referredBy = referredBy;
		}

		public Integer getReferredSource() {
			return referredSource;
		}

		public void setReferredSource(Integer referredSource) {
			this.referredSource = referredSource;
		}

		public String getReferredSourceSlave() {
			return referredSourceSlave;
		}

		public void setReferredSourceSlave(String referredSourceSlave) {
			this.referredSourceSlave = referredSourceSlave;
		}

		public Integer getReferredSourceDocId() {
			return referredSourceDocId;
		}

		public void setReferredSourceDocId(Integer referredSourceDocId) {
			this.referredSourceDocId = referredSourceDocId;
		}

		public Integer getInvoiceCount() {
			return invoiceCount;
		}

		public void setInvoiceCount(Integer invoiceCount) {
			this.invoiceCount = invoiceCount;
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

		public String getInvoiceFlag() {
			return invoiceFlag;
		}

		public void setInvoiceFlag(String invoiceFlag) {
			this.invoiceFlag = invoiceFlag;
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

		public Date getRefDate() {
			return refDate;
		}

		public void setRefDate(Date refDate) {
			this.refDate = refDate;
		}

		public String getSactionOrdNo() {
			return sactionOrdNo;
		}

		public void setSactionOrdNo(String sactionOrdNo) {
			this.sactionOrdNo = sactionOrdNo;
		}

		public double getSanctionAmt() {
			return sanctionAmt;
		}

		public void setSanctionAmt(double sanctionAmt) {
			this.sanctionAmt = sanctionAmt;
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

		public Date getValidUpToDate() {
			return validUpToDate;
		}

		public void setValidUpToDate(Date validUpToDate) {
			this.validUpToDate = validUpToDate;
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

		public String getAdmissionDateTime() {
			return admissionDateTime;
		}

		public void setAdmissionDateTime(String admissionDateTime) {
			this.admissionDateTime = admissionDateTime;
		}
		
//		public String getReason_of_visit() {
//			return reason_of_visit;
//		}
//
//		public void setReason_of_visit(String reason_of_visit) {
//			this.reason_of_visit = reason_of_visit;
//		}
		
		public Integer getReason_of_visit() {
			return reason_of_visit;
		}

		public void setReason_of_visit(Integer reason_of_visit) {
			this.reason_of_visit = reason_of_visit;
		}

		@Override
		public String toString() {
			return "MarkVisitDto [ptId=" + ptId + ", prefix=" + prefix
					+ ", dob=" + dob + ", age=" + age + ", talukaId="
					+ talukaId + ", fName=" + fName + ", unitId=" + unitId
					+ ", mName=" + mName + ", mrnno=" + mrnno + ", districtId="
					+ districtId + ", stateId=" + stateId + ", areaCode="
					+ areaCode + ", deleted=" + deleted + ", lName=" + lName
					+ ", gender=" + gender + ", mobile=" + mobile
					+ ", countryId=" + countryId + ", twnId=" + twnId
					+ ", ttId=" + ttId + ", drId=" + drId + ", deptId="
					+ deptId + ", token=" + token + ", patientCatId="
					+ patientCatId + ", sponsorCatId=" + sponsorCatId
					+ ", ageDays=" + ageDays + ", sponsorchargesSlaveId="
					+ sponsorchargesSlaveId + ", height=" + height
					+ ", weight=" + weight + ", refdocid=" + refdocid
					+ ", ageMonths=" + ageMonths + ", sourceTypeId="
					+ sourceTypeId + ", caseType=" + caseType + ", tFlag="
					+ tFlag + ", createdDateTime=" + createdDateTime
					+ ", billId=" + billId + ", count=" + count + ", empid="
					+ empid + ", transSMS=" + transSMS + ", transEmail="
					+ transEmail + ", pramoEmail=" + pramoEmail + ", pramoSMS="
					+ pramoSMS + ", external=" + external + ", emergency="
					+ emergency + ", adharcardNo=" + adharcardNo
					+ ", updatedDateTime=" + updatedDateTime + ", updatedBy="
					+ updatedBy + ", createdBy=" + createdBy + ", tpaid="
					+ tpaid + ", reqGenFormId=" + reqGenFormId + ", address="
					+ address + ", imageName=" + imageName
					+ ", aadharImageName=" + aadharImageName + ", referredBy="
					+ referredBy + ", referredSource=" + referredSource
					+ ", referredSourceSlave=" + referredSourceSlave
					+ ", referredSourceDocId=" + referredSourceDocId
					+ ", invoiceCount=" + invoiceCount + ", invoiceFlag="
					+ invoiceFlag + ", passport=" + passport + ", visa=" + visa
					+ ", relationId=" + relationId + ", relativeName="
					+ relativeName + ", perAddress=" + perAddress
					+ ", pertalukaId=" + pertalukaId + ", pertownId="
					+ pertownId + ", perdistrictId=" + perdistrictId
					+ ", perstateId=" + perstateId + ", percountryId="
					+ percountryId + ", perareaCode=" + perareaCode
					+ ", oldPatientId=" + oldPatientId + ", emailId=" + emailId
					+ ", maritalStatusId=" + maritalStatusId
					+ ", nationalityId=" + nationalityId + ", religionId="
					+ religionId + ", languageId=" + languageId
					+ ", bloodGroupId=" + bloodGroupId + ", identityProofId="
					+ identityProofId + ", identificationNumber="
					+ identificationNumber + ", annualIncomeId="
					+ annualIncomeId + ", occupation=" + occupation
					+ ", education=" + education + ", refDate=" + refDate
					+ ", sactionOrdNo=" + sactionOrdNo + ", sanctionAmt="
					+ sanctionAmt + ", neisNo=" + neisNo + ", visitNo="
					+ visitNo + ", ipdOrOpd=" + ipdOrOpd + ", treatPermited="
					+ treatPermited + ", diseToBeTreat=" + diseToBeTreat
					+ ", validUpToDate=" + validUpToDate + ", blockNarration1="
					+ blockNarration1 + ", blockNarration2=" + blockNarration2
					+ ", blockNarration3=" + blockNarration3
					+ ", blockUserId1=" + blockUserId1 + ", blockUserId2="
					+ blockUserId2 + ", blockUserId3=" + blockUserId3
					+ ", admissionDateTime=" + admissionDateTime
					+ ", reason_of_visit=" + reason_of_visit
					+ ", lstMarkVisit=" + lstMarkVisit + ", centerPatientId=" + centerPatientId + ", lstDoctorDto="
					+ lstDoctorDto + "]";
		}
		
}
