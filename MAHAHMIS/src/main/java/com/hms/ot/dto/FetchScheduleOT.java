package com.hms.ot.dto;

import java.io.Serializable;
import java.util.Date;

public class FetchScheduleOT implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Integer ID;
	private String patientCenterId;
	private String criticalFlag;
	private String date;
	private String emergencyFlag;
	private String End_Time;
	private String infectionFlag;
	private String opStatus;
	private Integer ot_id;
	private String scheduleFlag;
	private String Start_Time;
	private Integer treatment_id;

	private Integer patient_id;
	private String aadhar_image_name;
	private String address;
	private String adharcardNo;
	private Integer age;
	private Integer age_days;
	private Integer age_months;
	private Integer annual_income_id;
	private Integer area_code;
	private String block_flag;
	private String block_narration_1;
	private String block_narration_2;
	private String block_narration_3;
	private Integer block_user_id_1;
	private Integer block_user_id_2;
	private Integer block_user_id_3;
	private String block_user_name_1;
	private String block_user_name_2;
	private String block_user_name_3;
	private Date blocked_date_time;
	private Integer blood_group_id;
	private String center_patient_id;
	private Integer country_id;
	private Integer created_by;
	private Date created_date_time;
	private String deleted;
	private Integer deleted_by;
	private Date deleted_date_time;
	private Integer district_id;
	private String dob;
	private String education;
	private String email_id;
	private String emergency;
	private String external;
	private String f_name;
	private String gender;
	private String identification_number;
	private Integer identity_proof_id;
	private String image_name;
	private String l_name;
	private Integer language_id;
	private String m_name;
	private Integer marital_status_id;
	private String mobile;
	private String mrnno;
	private Integer nationality_id;
	private String occupation;
	private String old_patient_id;
	private String passport;
	private String per_address;
	private Integer per_area_code;
	private Integer per_country_id;
	private Integer per_district_id;
	private Integer per_state_id;
	private Integer per_taluka_id;
	private Integer per_town_id;
	private String pramoEmail;
	private String pramoSMS;
	private String prefix;
	private Integer relation_id;
	private String relative_name;
	private Integer religion_id;
	private Integer state_id;
	private Integer taluka_id;
	private Integer town_id;
	private String transEmail;
	private String transSMS;
	private Integer unitcount;
	private Integer unit_id;
	private Integer updated_by;
	private Date updated_date_time;
	private String visa;
	private String ivf_treat_flag;
	private String relative_mb;
	private Integer seropositive;
	private String organ_donar_flag;
	private String health_id;
	private String health_id_number;
	private String legacy_uhid_number;

	private Double BMI;
	private Double BSA;
	private Double HCIM;
	private String adm_cancel_flag;
	private Date admsn_can_date_time;
	private String admsn_canceled_by;
	private String admission_date_time;
	private String cancel_narration;
	private Integer case_type;

	private Integer count;

	private Integer department_id;
	private String dise_to_be_treat;
	private String doctor_id;
	private String empid;
	private Integer emr_high_risk;
	private Double height;
	private String ipd_or_opd;
	private String neis_no;
	private String notes;
	private String opdipdno;
	private Date phy_date_time;
	private String phydis_flag;
	private Integer reason_of_visit;
	private Date ref_date;
	private Integer ref_doc_id;
	private String referred_by;
	private Integer referred_source;
	private Integer referred_source_docId;
	private String referred_source_slave;
	private Integer reqGenFormId;
	private String saction_ord_no;
	private Double sanction_amt;
	private String t_flag;
	private Integer token;
	private String tokenno;
	private String tpaid;
	private String trcount;
	private String treat_permited;

	private Date valid_upto_date;
	private String visit_no;
	private Double weight;
	private Integer specialityId;
	private Double sum_assured_amt;
	private String speciality_id;
	private String casuality_flag;
	private String ref_doc_name;
	private Integer business_type;
	private String collection_date;
	private String collection_time;
	private Integer customer_id;
	private Integer customer_type;
	private String emergency_flag;
	private String registered_at;
	private String appoIntegerment_id;
	private String special_Case;
	private Integer appointment_id;
	private String adharcard_no;
	private String pramo_email;
	private String trans_email;

	
	public String getPramo_email() {
		return pramo_email;
	}
	public void setPramo_email(String pramo_email) {
		this.pramo_email = pramo_email;
	}
	public String getTrans_email() {
		return trans_email;
	}
	public void setTrans_email(String trans_email) {
		this.trans_email = trans_email;
	}
	public String getAdharcard_no() {
		return adharcard_no;
	}
	public void setAdharcard_no(String adharcard_no) {
		this.adharcard_no = adharcard_no;
	}
	public Integer getID() {
		return ID;
	}
	public void setID(Integer iD) {
		ID = iD;
	}
	public String getCriticalFlag() {
		return criticalFlag;
	}
	public void setCriticalFlag(String criticalFlag) {
		this.criticalFlag = criticalFlag;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getEmergencyFlag() {
		return emergencyFlag;
	}
	public void setEmergencyFlag(String emergencyFlag) {
		this.emergencyFlag = emergencyFlag;
	}
	public String getEnd_Time() {
		return End_Time;
	}
	public void setEnd_Time(String end_Time) {
		End_Time = end_Time;
	}
	public String getInfectionFlag() {
		return infectionFlag;
	}
	public void setInfectionFlag(String infectionFlag) {
		this.infectionFlag = infectionFlag;
	}
	public String getOpStatus() {
		return opStatus;
	}
	public void setOpStatus(String opStatus) {
		this.opStatus = opStatus;
	}
	public Integer getOt_id() {
		return ot_id;
	}
	public void setOt_id(Integer ot_id) {
		this.ot_id = ot_id;
	}
	public String getScheduleFlag() {
		return scheduleFlag;
	}
	public void setScheduleFlag(String scheduleFlag) {
		this.scheduleFlag = scheduleFlag;
	}
	public String getStart_Time() {
		return Start_Time;
	}
	public void setStart_Time(String start_Time) {
		Start_Time = start_Time;
	}
	public Integer getTreatment_id() {
		return treatment_id;
	}
	public void setTreatment_id(Integer treatment_id) {
		this.treatment_id = treatment_id;
	}
	public Integer getPatient_id() {
		return patient_id;
	}
	public void setPatient_id(Integer patient_id) {
		this.patient_id = patient_id;
	}
	public String getAadhar_image_name() {
		return aadhar_image_name;
	}
	public void setAadhar_image_name(String aadhar_image_name) {
		this.aadhar_image_name = aadhar_image_name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getAdharcardNo() {
		return adharcardNo;
	}
	public void setAdharcardNo(String adharcardNo) {
		this.adharcardNo = adharcardNo;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public Integer getAge_days() {
		return age_days;
	}
	public void setAge_days(Integer age_days) {
		this.age_days = age_days;
	}
	public Integer getAge_months() {
		return age_months;
	}
	public void setAge_months(Integer age_months) {
		this.age_months = age_months;
	}
	public Integer getAnnual_income_id() {
		return annual_income_id;
	}
	public void setAnnual_income_id(Integer annual_income_id) {
		this.annual_income_id = annual_income_id;
	}
	public Integer getArea_code() {
		return area_code;
	}
	public void setArea_code(Integer area_code) {
		this.area_code = area_code;
	}
	public String getBlock_flag() {
		return block_flag;
	}
	public void setBlock_flag(String block_flag) {
		this.block_flag = block_flag;
	}
	public String getBlock_narration_1() {
		return block_narration_1;
	}
	public void setBlock_narration_1(String block_narration_1) {
		this.block_narration_1 = block_narration_1;
	}
	public String getBlock_narration_2() {
		return block_narration_2;
	}
	public void setBlock_narration_2(String block_narration_2) {
		this.block_narration_2 = block_narration_2;
	}
	public String getBlock_narration_3() {
		return block_narration_3;
	}
	public void setBlock_narration_3(String block_narration_3) {
		this.block_narration_3 = block_narration_3;
	}
	public Integer getBlock_user_id_1() {
		return block_user_id_1;
	}
	public void setBlock_user_id_1(Integer block_user_id_1) {
		this.block_user_id_1 = block_user_id_1;
	}
	public Integer getBlock_user_id_2() {
		return block_user_id_2;
	}
	public void setBlock_user_id_2(Integer block_user_id_2) {
		this.block_user_id_2 = block_user_id_2;
	}
	public Integer getBlock_user_id_3() {
		return block_user_id_3;
	}
	public void setBlock_user_id_3(Integer block_user_id_3) {
		this.block_user_id_3 = block_user_id_3;
	}
	public String getBlock_user_name_1() {
		return block_user_name_1;
	}
	public void setBlock_user_name_1(String block_user_name_1) {
		this.block_user_name_1 = block_user_name_1;
	}
	public String getBlock_user_name_2() {
		return block_user_name_2;
	}
	public void setBlock_user_name_2(String block_user_name_2) {
		this.block_user_name_2 = block_user_name_2;
	}
	public String getBlock_user_name_3() {
		return block_user_name_3;
	}
	public void setBlock_user_name_3(String block_user_name_3) {
		this.block_user_name_3 = block_user_name_3;
	}	
	public Integer getBlood_group_id() {
		return blood_group_id;
	}
	public void setBlood_group_id(Integer blood_group_id) {
		this.blood_group_id = blood_group_id;
	}
	public String getCenter_patient_id() {
		return center_patient_id;
	}
	public void setCenter_patient_id(String center_patient_id) {
		this.center_patient_id = center_patient_id;
	}
	public Integer getCountry_id() {
		return country_id;
	}
	public void setCountry_id(Integer country_id) {
		this.country_id = country_id;
	}
	public Integer getCreated_by() {
		return created_by;
	}
	public void setCreated_by(Integer created_by) {
		this.created_by = created_by;
	}
	
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	public Integer getDeleted_by() {
		return deleted_by;
	}
	public void setDeleted_by(Integer deleted_by) {
		this.deleted_by = deleted_by;
	}
	
	public Integer getDistrict_id() {
		return district_id;
	}
	public void setDistrict_id(Integer district_id) {
		this.district_id = district_id;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getEducation() {
		return education;
	}
	public void setEducation(String education) {
		this.education = education;
	}
	public String getEmail_id() {
		return email_id;
	}
	public void setEmail_id(String email_id) {
		this.email_id = email_id;
	}
	public String getEmergency() {
		return emergency;
	}
	public void setEmergency(String emergency) {
		this.emergency = emergency;
	}
	public String getExternal() {
		return external;
	}
	public void setExternal(String external) {
		this.external = external;
	}
	public String getF_name() {
		return f_name;
	}
	public void setF_name(String f_name) {
		this.f_name = f_name;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getIdentification_number() {
		return identification_number;
	}
	public void setIdentification_number(String identification_number) {
		this.identification_number = identification_number;
	}
	public Integer getIdentity_proof_id() {
		return identity_proof_id;
	}
	public void setIdentity_proof_id(Integer identity_proof_id) {
		this.identity_proof_id = identity_proof_id;
	}
	public String getImage_name() {
		return image_name;
	}
	public void setImage_name(String image_name) {
		this.image_name = image_name;
	}
	public String getL_name() {
		return l_name;
	}
	public void setL_name(String l_name) {
		this.l_name = l_name;
	}
	public Integer getLanguage_id() {
		return language_id;
	}
	public void setLanguage_id(Integer language_id) {
		this.language_id = language_id;
	}
	public String getM_name() {
		return m_name;
	}
	public void setM_name(String m_name) {
		this.m_name = m_name;
	}
	public Integer getMarital_status_id() {
		return marital_status_id;
	}
	public void setMarital_status_id(Integer marital_status_id) {
		this.marital_status_id = marital_status_id;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getMrnno() {
		return mrnno;
	}
	public void setMrnno(String mrnno) {
		this.mrnno = mrnno;
	}
	public Integer getNationality_id() {
		return nationality_id;
	}
	public void setNationality_id(Integer nationality_id) {
		this.nationality_id = nationality_id;
	}
	public String getOccupation() {
		return occupation;
	}
	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}
	public String getOld_patient_id() {
		return old_patient_id;
	}
	public void setOld_patient_id(String old_patient_id) {
		this.old_patient_id = old_patient_id;
	}
	public String getPassport() {
		return passport;
	}
	public void setPassport(String passport) {
		this.passport = passport;
	}
	public String getPer_address() {
		return per_address;
	}
	public void setPer_address(String per_address) {
		this.per_address = per_address;
	}
	public Integer getPer_area_code() {
		return per_area_code;
	}
	public void setPer_area_code(Integer per_area_code) {
		this.per_area_code = per_area_code;
	}
	public Integer getPer_country_id() {
		return per_country_id;
	}
	public void setPer_country_id(Integer per_country_id) {
		this.per_country_id = per_country_id;
	}
	public Integer getPer_district_id() {
		return per_district_id;
	}
	public void setPer_district_id(Integer per_district_id) {
		this.per_district_id = per_district_id;
	}
	public Integer getPer_state_id() {
		return per_state_id;
	}
	public void setPer_state_id(Integer per_state_id) {
		this.per_state_id = per_state_id;
	}
	public Integer getPer_taluka_id() {
		return per_taluka_id;
	}
	public void setPer_taluka_id(Integer per_taluka_id) {
		this.per_taluka_id = per_taluka_id;
	}
	public Integer getPer_town_id() {
		return per_town_id;
	}
	public void setPer_town_id(Integer per_town_id) {
		this.per_town_id = per_town_id;
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
	public String getPrefix() {
		return prefix;
	}
	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}
	public Integer getRelation_id() {
		return relation_id;
	}
	public void setRelation_id(Integer relation_id) {
		this.relation_id = relation_id;
	}
	public String getRelative_name() {
		return relative_name;
	}
	public void setRelative_name(String relative_name) {
		this.relative_name = relative_name;
	}
	public Integer getReligion_id() {
		return religion_id;
	}
	public void setReligion_id(Integer religion_id) {
		this.religion_id = religion_id;
	}
	public Integer getState_id() {
		return state_id;
	}
	public void setState_id(Integer state_id) {
		this.state_id = state_id;
	}
	public Integer getTaluka_id() {
		return taluka_id;
	}
	public void setTaluka_id(Integer taluka_id) {
		this.taluka_id = taluka_id;
	}
	public Integer getTown_id() {
		return town_id;
	}
	public void setTown_id(Integer town_id) {
		this.town_id = town_id;
	}
	public String getTransEmail() {
		return transEmail;
	}
	public void setTransEmail(String transEmail) {
		this.transEmail = transEmail;
	}
	public String getTransSMS() {
		return transSMS;
	}
	public void setTransSMS(String transSMS) {
		this.transSMS = transSMS;
	}
	public Integer getUnitcount() {
		return unitcount;
	}
	public void setUnitcount(Integer unitcount) {
		this.unitcount = unitcount;
	}
	public Integer getUnit_id() {
		return unit_id;
	}
	public void setUnit_id(Integer unit_id) {
		this.unit_id = unit_id;
	}
	public Integer getUpdated_by() {
		return updated_by;
	}
	public void setUpdated_by(Integer updated_by) {
		this.updated_by = updated_by;
	}
	public String getVisa() {
		return visa;
	}
	public void setVisa(String visa) {
		this.visa = visa;
	}
	public String getIvf_treat_flag() {
		return ivf_treat_flag;
	}
	public void setIvf_treat_flag(String ivf_treat_flag) {
		this.ivf_treat_flag = ivf_treat_flag;
	}
	public String getRelative_mb() {
		return relative_mb;
	}
	public void setRelative_mb(String relative_mb) {
		this.relative_mb = relative_mb;
	}
	public Integer getSeropositive() {
		return seropositive;
	}
	public void setSeropositive(Integer seropositive) {
		this.seropositive = seropositive;
	}
	public String getOrgan_donar_flag() {
		return organ_donar_flag;
	}
	public void setOrgan_donar_flag(String organ_donar_flag) {
		this.organ_donar_flag = organ_donar_flag;
	}
	public Double getBMI() {
		return BMI;
	}
	public void setBMI(Double bMI) {
		BMI = bMI;
	}
	public Double getBSA() {
		return BSA;
	}
	public void setBSA(Double bSA) {
		BSA = bSA;
	}
	public Double getHCIM() {
		return HCIM;
	}
	public void setHCIM(Double hCIM) {
		HCIM = hCIM;
	}
	public String getAdm_cancel_flag() {
		return adm_cancel_flag;
	}
	public void setAdm_cancel_flag(String adm_cancel_flag) {
		this.adm_cancel_flag = adm_cancel_flag;
	}
	public String getAdmsn_canceled_by() {
		return admsn_canceled_by;
	}
	public void setAdmsn_canceled_by(String admsn_canceled_by) {
		this.admsn_canceled_by = admsn_canceled_by;
	}
	public String getAdmission_date_time() {
		return admission_date_time;
	}
	public void setAdmission_date_time(String admission_date_time) {
		this.admission_date_time = admission_date_time;
	}
	public String getCancel_narration() {
		return cancel_narration;
	}
	public void setCancel_narration(String cancel_narration) {
		this.cancel_narration = cancel_narration;
	}
	public Integer getCase_type() {
		return case_type;
	}
	public void setCase_type(Integer case_type) {
		this.case_type = case_type;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public Integer getDepartment_id() {
		return department_id;
	}
	public void setDepartment_id(Integer department_id) {
		this.department_id = department_id;
	}
	public String getDise_to_be_treat() {
		return dise_to_be_treat;
	}
	public void setDise_to_be_treat(String dise_to_be_treat) {
		this.dise_to_be_treat = dise_to_be_treat;
	}
	public String getDoctor_id() {
		return doctor_id;
	}
	public void setDoctor_id(String doctor_id) {
		this.doctor_id = doctor_id;
	}
	public String getEmpid() {
		return empid;
	}
	public void setEmpid(String empid) {
		this.empid = empid;
	}
	public Integer getEmr_high_risk() {
		return emr_high_risk;
	}
	public void setEmr_high_risk(Integer emr_high_risk) {
		this.emr_high_risk = emr_high_risk;
	}
	public Double getHeight() {
		return height;
	}
	public void setHeight(Double height) {
		this.height = height;
	}
	public String getIpd_or_opd() {
		return ipd_or_opd;
	}
	public void setIpd_or_opd(String ipd_or_opd) {
		this.ipd_or_opd = ipd_or_opd;
	}
	public String getNeis_no() {
		return neis_no;
	}
	public void setNeis_no(String neis_no) {
		this.neis_no = neis_no;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public String getOpdipdno() {
		return opdipdno;
	}
	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}	
	public String getPhydis_flag() {
		return phydis_flag;
	}
	public void setPhydis_flag(String phydis_flag) {
		this.phydis_flag = phydis_flag;
	}
	public Integer getReason_of_visit() {
		return reason_of_visit;
	}
	public void setReason_of_visit(Integer reason_of_visit) {
		this.reason_of_visit = reason_of_visit;
	}
	public Date getRef_date() {
		return ref_date;
	}
	public void setRef_date(Date ref_date) {
		this.ref_date = ref_date;
	}
	public Integer getRef_doc_id() {
		return ref_doc_id;
	}
	public void setRef_doc_id(Integer ref_doc_id) {
		this.ref_doc_id = ref_doc_id;
	}
	public String getReferred_by() {
		return referred_by;
	}
	public void setReferred_by(String referred_by) {
		this.referred_by = referred_by;
	}
	public Integer getReferred_source() {
		return referred_source;
	}
	public void setReferred_source(Integer referred_source) {
		this.referred_source = referred_source;
	}
	public Integer getReferred_source_docId() {
		return referred_source_docId;
	}
	public void setReferred_source_docId(Integer referred_source_docId) {
		this.referred_source_docId = referred_source_docId;
	}
	public String getReferred_source_slave() {
		return referred_source_slave;
	}
	public void setReferred_source_slave(String referred_source_slave) {
		this.referred_source_slave = referred_source_slave;
	}
	public Integer getReqGenFormId() {
		return reqGenFormId;
	}
	public void setReqGenFormId(Integer reqGenFormId) {
		this.reqGenFormId = reqGenFormId;
	}
	public String getSaction_ord_no() {
		return saction_ord_no;
	}
	public void setSaction_ord_no(String saction_ord_no) {
		this.saction_ord_no = saction_ord_no;
	}
	public Double getSanction_amt() {
		return sanction_amt;
	}
	public void setSanction_amt(Double sanction_amt) {
		this.sanction_amt = sanction_amt;
	}
	public String getT_flag() {
		return t_flag;
	}
	public void setT_flag(String t_flag) {
		this.t_flag = t_flag;
	}
	public Integer getToken() {
		return token;
	}
	public void setToken(Integer token) {
		this.token = token;
	}
	public String getTokenno() {
		return tokenno;
	}
	public void setTokenno(String tokenno) {
		this.tokenno = tokenno;
	}
	public String getTpaid() {
		return tpaid;
	}
	public void setTpaid(String tpaid) {
		this.tpaid = tpaid;
	}
	public String getTrcount() {
		return trcount;
	}
	public void setTrcount(String trcount) {
		this.trcount = trcount;
	}
	public String getTreat_permited() {
		return treat_permited;
	}
	public void setTreat_permited(String treat_permited) {
		this.treat_permited = treat_permited;
	}
	public String getVisit_no() {
		return visit_no;
	}
	public void setVisit_no(String visit_no) {
		this.visit_no = visit_no;
	}
	public Double getWeight() {
		return weight;
	}
	public void setWeight(Double weight) {
		this.weight = weight;
	}
	public Integer getSpecialityId() {
		return specialityId;
	}
	public void setSpecialityId(Integer specialityId) {
		this.specialityId = specialityId;
	}
	public Double getSum_assured_amt() {
		return sum_assured_amt;
	}
	public void setSum_assured_amt(Double sum_assured_amt) {
		this.sum_assured_amt = sum_assured_amt;
	}
	public String getSpeciality_id() {
		return speciality_id;
	}
	public void setSpeciality_id(String speciality_id) {
		this.speciality_id = speciality_id;
	}
	public String getCasuality_flag() {
		return casuality_flag;
	}
	public void setCasuality_flag(String casuality_flag) {
		this.casuality_flag = casuality_flag;
	}
	public String getRef_doc_name() {
		return ref_doc_name;
	}
	public void setRef_doc_name(String ref_doc_name) {
		this.ref_doc_name = ref_doc_name;
	}
	public Integer getBusiness_type() {
		return business_type;
	}
	public void setBusiness_type(Integer business_type) {
		this.business_type = business_type;
	}
	public String getCollection_date() {
		return collection_date;
	}
	public void setCollection_date(String collection_date) {
		this.collection_date = collection_date;
	}
	public String getCollection_time() {
		return collection_time;
	}
	public void setCollection_time(String collection_time) {
		this.collection_time = collection_time;
	}
	public Integer getCustomer_id() {
		return customer_id;
	}
	public void setCustomer_id(Integer customer_id) {
		this.customer_id = customer_id;
	}
	public Integer getCustomer_type() {
		return customer_type;
	}
	public void setCustomer_type(Integer customer_type) {
		this.customer_type = customer_type;
	}
	public String getEmergency_flag() {
		return emergency_flag;
	}
	public void setEmergency_flag(String emergency_flag) {
		this.emergency_flag = emergency_flag;
	}
	public String getRegistered_at() {
		return registered_at;
	}
	public void setRegistered_at(String registered_at) {
		this.registered_at = registered_at;
	}
	public String getAppoIntegerment_id() {
		return appoIntegerment_id;
	}
	public void setAppoIntegerment_id(String appoIntegerment_id) {
		this.appoIntegerment_id = appoIntegerment_id;
	}
	public String getSpecial_Case() {
		return special_Case;
	}
	public void setSpecial_Case(String special_Case) {
		this.special_Case = special_Case;
	}
	public String getPatientCenterId() {
		return patientCenterId;
	}
	public void setPatientCenterId(String patientCenterId) {
		this.patientCenterId = patientCenterId;
	}
	public Date getCreated_date_time() {
		return created_date_time;
	}
	public void setCreated_date_time(Date created_date_time) {
		this.created_date_time = created_date_time;
	}
	public Date getDeleted_date_time() {
		return deleted_date_time;
	}
	public void setDeleted_date_time(Date deleted_date_time) {
		this.deleted_date_time = deleted_date_time;
	}
	public Date getUpdated_date_time() {
		return updated_date_time;
	}
	public void setUpdated_date_time(Date updated_date_time) {
		this.updated_date_time = updated_date_time;
	}
	public Date getAdmsn_can_date_time() {
		return admsn_can_date_time;
	}
	public void setAdmsn_can_date_time(Date admsn_can_date_time) {
		this.admsn_can_date_time = admsn_can_date_time;
	}
	public Integer getAppointment_id() {
		return appointment_id;
	}
	public void setAppointment_id(Integer appointment_id) {
		this.appointment_id = appointment_id;
	}
	public Date getBlocked_date_time() {
		return blocked_date_time;
	}
	public void setBlocked_date_time(Date blocked_date_time) {
		this.blocked_date_time = blocked_date_time;
	}
	public Date getPhy_date_time() {
		return phy_date_time;
	}
	public void setPhy_date_time(Date phy_date_time) {
		this.phy_date_time = phy_date_time;
	}
	public Date getValid_upto_date() {
		return valid_upto_date;
	}
	public void setValid_upto_date(Date valid_upto_date) {
		this.valid_upto_date = valid_upto_date;
	}
	public String getHealth_id() {
		return health_id;
	}
	public void setHealth_id(String health_id) {
		this.health_id = health_id;
	}
	public String getHealth_id_number() {
		return health_id_number;
	}
	public void setHealth_id_number(String health_id_number) {
		this.health_id_number = health_id_number;
	}
	
	public String getLegacy_uhid_number() {
		return legacy_uhid_number;
	}
	public void setLegacy_uhid_number(String legacy_uhid_number) {
		this.legacy_uhid_number = legacy_uhid_number;
	}	
	
	
}
