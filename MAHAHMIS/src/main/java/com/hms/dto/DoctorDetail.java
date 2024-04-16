package com.hms.dto;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;


@Entity
@Table(name = "doctor")
public class DoctorDetail {
 
 @Id
 @GeneratedValue
 @Column(name = "Doctor_ID")
 private Integer doctor_ID;
 @Column(name = "doc_name")
 private String doc_name;
 @Column(name = "address")
 private String address;
 @Column(name = "mobileNo")
 private String mobileNo;
 @Column(name = "email_Id")
 private String email_Id;
 @Column(name = "education")
 private String education;
 @Column(name = "specialisation")
 private String specialisation;
 @Column(name = "doc_Type")
 private String doc_Type ;
/* @Column(name = "User_ID")
 private String User_ID ;*/
 @Column(name = "fees")
 private String fees ;
 @Column(name = "followfees")
 private String followfees ;
 @Column(name = "status")
 private String status ;
 @Column(name = "dob")
 private String dob ;
 @Column(name = "apartment")
 private String apartment ;
 @Column(name = "city")
 private String city ;
 @Column(name = "state")
 private String state ;
 @Column(name = "zip")
 private String zip ;
 @Column(name = "dojoin")
 private String dojoin ;
 @Column(name = "schoolNm")
 private String schoolNm ;
 @Column(name = "schoolAdd")
 private String schoolAdd ;
 @Column(name = "schoolForm")
 private String schoolForm ;
 @Column(name = "schooTo")
 private String schooTo ;
 @Column(name = "schoolPercent")
 private String schoolPercent ;
 @Column(name = "colNm")
 private String colNm ;
 @Column(name = "colAdd")
 private String colAdd ;
 @Column(name = "colForm")
 private String colForm ;
 @Column(name = "colTo")
 private String colTo ;
 @Column(name = "colPercent")
 private String colPercent ;
 @Column(name = "colDegree")
 private String colDegree ;
 @Column(name = "pgNm")
 private String pgNm ;
 @Column(name = "pgAdd")
 private String pgAdd ;
 @Column(name = "pgForm")
 private String pgForm ;
 @Column(name = "pgTo")
 private String pgTo ;
 @Column(name = "pgPercent")
 private String pgPercent ;
 @Column(name = "pgDegree")
 private String pgDegree ;
 @Column(name = "cmpnyNm")
 private String cmpnyNm ;
 @Column(name = "cmpnyAdd")
 private String cmpnyAdd ;
 @Column(name = "cmpnyPhone")
 private String cmpnyPhone;
 @Column(name = "cmpnyBoss")
 private String cmpnyBoss ;
 @Column(name = "jobTitle")
 private String jobTitle ;
 @Column(name = "jobResp")
 private String jobResp ;
 @Column(name = "jobForm")
 private String jobForm ;
 @Column(name = "jobTo")
 private String jobTo ;
 @Column(name = "salary")
 private String salary ;
 @Column(name = "hosType")
 private String hosType ;
 @Column(name = "secu_monthly_deduct")
 private String secu_monthly_deduct ;
 @Column(name = "no_of_months_for_secu")
 private String no_of_months_for_secu ;
 @Column(name = "machine_emp_code")
 private String machine_emp_code ;
 @Column(name = "security_current_month")
 private String security_current_month ;
 @Column(name = "total_submit_security")
 private String total_submit_security ;
 @Column(name = "aplicable_leaves")
 private String aplicableleaves ;
 @Column(name = "balance_leaves")
 private String balanceleaves ;
 @Column(name = "charge_type")
 private String charge_type ;
 @Column(name = "department")
 private String deptName ;
 @Column(name = "speciality")
 private String selSpeciality ;
 @Column(name = "overrideFlag")
 private String chkOverrideCharges ;
 @Column(name = "PAN_CardNo")
 private String panCardNo ;
 @Column(name = "CTC")
 private String CTC ;
 @Column(name = "PLVP")
 private String PLVP ;
 @Column(name = "doctorpercent")
 private String doctorpercent ;
 @Column(name = "signature")
 private String signature ;
 @Column(name = "softwareUsed")
 private String softwareUsed ;
 @Column(name = "qualification")
 private String qualification ;
 @Column(name = "designation")
 private String designation ;
 @Column(name = "regNo")
 private String regNo ;
 @Column(name = "sendSMSflag")
 
 private String sendSMSflag ;
 @Column(name = "motivatorAuthorisation")
 private String motivatorAuthorisation ;
 @Column(name = "clinicPercent")
 private double clinicPercent ;
 @Column(name = "testSharedFlag")
 private int testSharedFlag ;
 @Column(name = "docInitial")
 private String docInitial ;
 @Column(name = "doc_cons_per")
 private String doc_cons_per ;
 @Column(name = "doc_inv_per")
 private String doc_inv_per ;
 @Column(name = "doc_pathology_per")
 private String doc_pathology_per ;
 @Column(name = "doc_physio_per")
 private String doc_physio_per ;
 @Column(name = "doc_os_per")
 private String doc_os_per ;
 @Column(name = "doc_casualty_per")
 private String doc_casualty_per ;
 @Column(name = "group_master_id")
 private String group_master_id ;
 @Column(name = "empIdhr")
 private String empIdhr ;
 @Column(name = "doctorfee")
 private String doctorfee ;
 @Column(name = "fixed_income")
 private String fixedIncome ;
 @Column(name = "dynamic_group_master_id")
 private String dynamic_group_master_id ;
 @Column(name = "referal_percent")
 private String referalPercent ;
 @Column(name = "folloup_fees")
 private String folloupfees;
 @Column(name = "folloup_weekend")
 private String folloupWeekend ;
 @Column(name = "resignation_Date")
 private String resignation_Date ;
 @Column(name = "resignation_Rele_Date")
 private String resignation_Rele_Date ;
 @Column(name = "termination_service")
 private String termination_service ;
 @Column(name = "per_visit_charge")
 private String per_visit_charge ;
 @Column(name = "specializationName")
 private String specializationName ;
 
   // @OneToOne(cascade=CascadeType.ALL)
	//@JoinColumn(name="User_ID")
	//private UserDetails UserDetails;
    
    @Transient
	private List<DoctorDetail> listDoctorDetailsDto;

	public Integer getDoctor_ID() {
		return doctor_ID;
	}

	public void setDoctor_ID(Integer doctor_ID) {
		this.doctor_ID = doctor_ID;
	}

	public String getDoc_name() {
		return doc_name;
	}

	public void setDoc_name(String doc_name) {
		this.doc_name = doc_name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getEmail_Id() {
		return email_Id;
	}

	public void setEmail_Id(String email_Id) {
		this.email_Id = email_Id;
	}

	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	public String getSpecialisation() {
		return specialisation;
	}

	public void setSpecialisation(String specialisation) {
		this.specialisation = specialisation;
	}

	public String getDoc_Type() {
		return doc_Type;
	}

	public void setDoc_Type(String doc_Type) {
		this.doc_Type = doc_Type;
	}

	public String getFees() {
		return fees;
	}

	public void setFees(String fees) {
		this.fees = fees;
	}

	public String getFollowfees() {
		return followfees;
	}

	public void setFollowfees(String followfees) {
		this.followfees = followfees;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getApartment() {
		return apartment;
	}

	public void setApartment(String apartment) {
		this.apartment = apartment;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getDojoin() {
		return dojoin;
	}

	public void setDojoin(String dojoin) {
		this.dojoin = dojoin;
	}

	public String getSchoolNm() {
		return schoolNm;
	}

	public void setSchoolNm(String schoolNm) {
		this.schoolNm = schoolNm;
	}

	public String getSchoolAdd() {
		return schoolAdd;
	}

	public void setSchoolAdd(String schoolAdd) {
		this.schoolAdd = schoolAdd;
	}

	public String getSchoolForm() {
		return schoolForm;
	}

	public void setSchoolForm(String schoolForm) {
		this.schoolForm = schoolForm;
	}

	public String getSchooTo() {
		return schooTo;
	}

	public void setSchooTo(String schooTo) {
		this.schooTo = schooTo;
	}

	public String getSchoolPercent() {
		return schoolPercent;
	}

	public void setSchoolPercent(String schoolPercent) {
		this.schoolPercent = schoolPercent;
	}

	public String getColNm() {
		return colNm;
	}

	public void setColNm(String colNm) {
		this.colNm = colNm;
	}

	public String getColAdd() {
		return colAdd;
	}

	public void setColAdd(String colAdd) {
		this.colAdd = colAdd;
	}

	public String getColForm() {
		return colForm;
	}

	public void setColForm(String colForm) {
		this.colForm = colForm;
	}

	public String getColTo() {
		return colTo;
	}

	public void setColTo(String colTo) {
		this.colTo = colTo;
	}

	public String getColPercent() {
		return colPercent;
	}

	public void setColPercent(String colPercent) {
		this.colPercent = colPercent;
	}

	public String getColDegree() {
		return colDegree;
	}

	public void setColDegree(String colDegree) {
		this.colDegree = colDegree;
	}

	public String getPgNm() {
		return pgNm;
	}

	public void setPgNm(String pgNm) {
		this.pgNm = pgNm;
	}

	public String getPgAdd() {
		return pgAdd;
	}

	public void setPgAdd(String pgAdd) {
		this.pgAdd = pgAdd;
	}

	public String getPgForm() {
		return pgForm;
	}

	public void setPgForm(String pgForm) {
		this.pgForm = pgForm;
	}

	public String getPgTo() {
		return pgTo;
	}

	public void setPgTo(String pgTo) {
		this.pgTo = pgTo;
	}

	public String getPgPercent() {
		return pgPercent;
	}

	public void setPgPercent(String pgPercent) {
		this.pgPercent = pgPercent;
	}

	public String getPgDegree() {
		return pgDegree;
	}

	public void setPgDegree(String pgDegree) {
		this.pgDegree = pgDegree;
	}

	public String getCmpnyNm() {
		return cmpnyNm;
	}

	public void setCmpnyNm(String cmpnyNm) {
		this.cmpnyNm = cmpnyNm;
	}

	public String getCmpnyAdd() {
		return cmpnyAdd;
	}

	public void setCmpnyAdd(String cmpnyAdd) {
		this.cmpnyAdd = cmpnyAdd;
	}

	public String getCmpnyPhone() {
		return cmpnyPhone;
	}

	public void setCmpnyPhone(String cmpnyPhone) {
		this.cmpnyPhone = cmpnyPhone;
	}

	public String getCmpnyBoss() {
		return cmpnyBoss;
	}

	public void setCmpnyBoss(String cmpnyBoss) {
		this.cmpnyBoss = cmpnyBoss;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getJobResp() {
		return jobResp;
	}

	public void setJobResp(String jobResp) {
		this.jobResp = jobResp;
	}

	public String getJobForm() {
		return jobForm;
	}

	public void setJobForm(String jobForm) {
		this.jobForm = jobForm;
	}

	public String getJobTo() {
		return jobTo;
	}

	public void setJobTo(String jobTo) {
		this.jobTo = jobTo;
	}

	public String getSalary() {
		return salary;
	}

	public void setSalary(String salary) {
		this.salary = salary;
	}

	public String getHosType() {
		return hosType;
	}

	public void setHosType(String hosType) {
		this.hosType = hosType;
	}

	public String getSecu_monthly_deduct() {
		return secu_monthly_deduct;
	}

	public void setSecu_monthly_deduct(String secu_monthly_deduct) {
		this.secu_monthly_deduct = secu_monthly_deduct;
	}

	public String getNo_of_months_for_secu() {
		return no_of_months_for_secu;
	}

	public void setNo_of_months_for_secu(String no_of_months_for_secu) {
		this.no_of_months_for_secu = no_of_months_for_secu;
	}

	public String getMachine_emp_code() {
		return machine_emp_code;
	}

	public void setMachine_emp_code(String machine_emp_code) {
		this.machine_emp_code = machine_emp_code;
	}

	public String getSecurity_current_month() {
		return security_current_month;
	}

	public void setSecurity_current_month(String security_current_month) {
		this.security_current_month = security_current_month;
	}

	public String getTotal_submit_security() {
		return total_submit_security;
	}

	public void setTotal_submit_security(String total_submit_security) {
		this.total_submit_security = total_submit_security;
	}

	public String getAplicableleaves() {
		return aplicableleaves;
	}

	public void setAplicableleaves(String aplicableleaves) {
		this.aplicableleaves = aplicableleaves;
	}

	public String getBalanceleaves() {
		return balanceleaves;
	}

	public void setBalanceleaves(String balanceleaves) {
		this.balanceleaves = balanceleaves;
	}

	public String getCharge_type() {
		return charge_type;
	}

	public void setCharge_type(String charge_type) {
		this.charge_type = charge_type;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getSelSpeciality() {
		return selSpeciality;
	}

	public void setSelSpeciality(String selSpeciality) {
		this.selSpeciality = selSpeciality;
	}

	public String getChkOverrideCharges() {
		return chkOverrideCharges;
	}

	public void setChkOverrideCharges(String chkOverrideCharges) {
		this.chkOverrideCharges = chkOverrideCharges;
	}

	public String getPanCardNo() {
		return panCardNo;
	}

	public void setPanCardNo(String panCardNo) {
		this.panCardNo = panCardNo;
	}

	public String getCTC() {
		return CTC;
	}

	public void setCTC(String cTC) {
		CTC = cTC;
	}

	public String getPLVP() {
		return PLVP;
	}

	public void setPLVP(String pLVP) {
		PLVP = pLVP;
	}

	public String getDoctorpercent() {
		return doctorpercent;
	}

	public void setDoctorpercent(String doctorpercent) {
		this.doctorpercent = doctorpercent;
	}

	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	public String getSoftwareUsed() {
		return softwareUsed;
	}

	public void setSoftwareUsed(String softwareUsed) {
		this.softwareUsed = softwareUsed;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getRegNo() {
		return regNo;
	}

	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}

	public String getSendSMSflag() {
		return sendSMSflag;
	}

	public void setSendSMSflag(String sendSMSflag) {
		this.sendSMSflag = sendSMSflag;
	}

	public String getMotivatorAuthorisation() {
		return motivatorAuthorisation;
	}

	public void setMotivatorAuthorisation(String motivatorAuthorisation) {
		this.motivatorAuthorisation = motivatorAuthorisation;
	}

	public double getClinicPercent() {
		return clinicPercent;
	}

	public void setClinicPercent(double clinicPercent) {
		this.clinicPercent = clinicPercent;
	}

	public int getTestSharedFlag() {
		return testSharedFlag;
	}

	public void setTestSharedFlag(int testSharedFlag) {
		this.testSharedFlag = testSharedFlag;
	}

	public String getDocInitial() {
		return docInitial;
	}

	public void setDocInitial(String docInitial) {
		this.docInitial = docInitial;
	}

	public String getDoc_cons_per() {
		return doc_cons_per;
	}

	public void setDoc_cons_per(String doc_cons_per) {
		this.doc_cons_per = doc_cons_per;
	}

	public String getDoc_inv_per() {
		return doc_inv_per;
	}

	public void setDoc_inv_per(String doc_inv_per) {
		this.doc_inv_per = doc_inv_per;
	}

	public String getDoc_pathology_per() {
		return doc_pathology_per;
	}

	public void setDoc_pathology_per(String doc_pathology_per) {
		this.doc_pathology_per = doc_pathology_per;
	}

	public String getDoc_physio_per() {
		return doc_physio_per;
	}

	public void setDoc_physio_per(String doc_physio_per) {
		this.doc_physio_per = doc_physio_per;
	}

	public String getDoc_os_per() {
		return doc_os_per;
	}

	public void setDoc_os_per(String doc_os_per) {
		this.doc_os_per = doc_os_per;
	}

	public String getDoc_casualty_per() {
		return doc_casualty_per;
	}

	public void setDoc_casualty_per(String doc_casualty_per) {
		this.doc_casualty_per = doc_casualty_per;
	}

	public String getGroup_master_id() {
		return group_master_id;
	}

	public void setGroup_master_id(String group_master_id) {
		this.group_master_id = group_master_id;
	}

	public String getEmpIdhr() {
		return empIdhr;
	}

	public void setEmpIdhr(String empIdhr) {
		this.empIdhr = empIdhr;
	}

	public String getDoctorfee() {
		return doctorfee;
	}

	public void setDoctorfee(String doctorfee) {
		this.doctorfee = doctorfee;
	}

	public String getFixedIncome() {
		return fixedIncome;
	}

	public void setFixedIncome(String fixedIncome) {
		this.fixedIncome = fixedIncome;
	}

	public String getDynamic_group_master_id() {
		return dynamic_group_master_id;
	}

	public void setDynamic_group_master_id(String dynamic_group_master_id) {
		this.dynamic_group_master_id = dynamic_group_master_id;
	}

	public String getReferalPercent() {
		return referalPercent;
	}

	public void setReferalPercent(String referalPercent) {
		this.referalPercent = referalPercent;
	}

	public String getFolloupfees() {
		return folloupfees;
	}

	public void setFolloupfees(String folloupfees) {
		this.folloupfees = folloupfees;
	}

	public String getFolloupWeekend() {
		return folloupWeekend;
	}

	public void setFolloupWeekend(String folloupWeekend) {
		this.folloupWeekend = folloupWeekend;
	}

	public String getResignation_Date() {
		return resignation_Date;
	}

	public void setResignation_Date(String resignation_Date) {
		this.resignation_Date = resignation_Date;
	}

	public String getResignation_Rele_Date() {
		return resignation_Rele_Date;
	}

	public void setResignation_Rele_Date(String resignation_Rele_Date) {
		this.resignation_Rele_Date = resignation_Rele_Date;
	}

	public String getTermination_service() {
		return termination_service;
	}

	public void setTermination_service(String termination_service) {
		this.termination_service = termination_service;
	}

	public String getPer_visit_charge() {
		return per_visit_charge;
	}

	public void setPer_visit_charge(String per_visit_charge) {
		this.per_visit_charge = per_visit_charge;
	}

	public String getSpecializationName() {
		return specializationName;
	}

	public void setSpecializationName(String specializationName) {
		this.specializationName = specializationName;
	}

	/*public UserDetails getUserDetails() {
		return UserDetails;
	}

	public void setUserDetails(UserDetails userDetails) {
		UserDetails = userDetails;
	}*/

	@Override
	public String toString() {
		return "DoctorDetail [doctor_ID=" + doctor_ID + ", doc_name="
				+ doc_name + ", address=" + address + ", mobileNo=" + mobileNo
				+ ", email_Id=" + email_Id + ", education=" + education
				+ ", specialisation=" + specialisation + ", doc_Type="
				+ doc_Type + ", fees=" + fees + ", followfees=" + followfees
				+ ", status=" + status + ", dob=" + dob + ", apartment="
				+ apartment + ", city=" + city + ", state=" + state + ", zip="
				+ zip + ", dojoin=" + dojoin + ", schoolNm=" + schoolNm
				+ ", schoolAdd=" + schoolAdd + ", schoolForm=" + schoolForm
				+ ", schooTo=" + schooTo + ", schoolPercent=" + schoolPercent
				+ ", colNm=" + colNm + ", colAdd=" + colAdd + ", colForm="
				+ colForm + ", colTo=" + colTo + ", colPercent=" + colPercent
				+ ", colDegree=" + colDegree + ", pgNm=" + pgNm + ", pgAdd="
				+ pgAdd + ", pgForm=" + pgForm + ", pgTo=" + pgTo
				+ ", pgPercent=" + pgPercent + ", pgDegree=" + pgDegree
				+ ", cmpnyNm=" + cmpnyNm + ", cmpnyAdd=" + cmpnyAdd
				+ ", cmpnyPhone=" + cmpnyPhone + ", cmpnyBoss=" + cmpnyBoss
				+ ", jobTitle=" + jobTitle + ", jobResp=" + jobResp
				+ ", jobForm=" + jobForm + ", jobTo=" + jobTo + ", salary="
				+ salary + ", hosType=" + hosType + ", secu_monthly_deduct="
				+ secu_monthly_deduct + ", no_of_months_for_secu="
				+ no_of_months_for_secu + ", machine_emp_code="
				+ machine_emp_code + ", security_current_month="
				+ security_current_month + ", total_submit_security="
				+ total_submit_security + ", aplicableleaves="
				+ aplicableleaves + ", balanceleaves=" + balanceleaves
				+ ", charge_type=" + charge_type + ", deptName=" + deptName
				+ ", selSpeciality=" + selSpeciality + ", chkOverrideCharges="
				+ chkOverrideCharges + ", panCardNo=" + panCardNo + ", CTC="
				+ CTC + ", PLVP=" + PLVP + ", doctorpercent=" + doctorpercent
				+ ", signature=" + signature + ", softwareUsed=" + softwareUsed
				+ ", qualification=" + qualification + ", designation="
				+ designation + ", regNo=" + regNo + ", sendSMSflag="
				+ sendSMSflag + ", motivatorAuthorisation="
				+ motivatorAuthorisation + ", clinicPercent=" + clinicPercent
				+ ", testSharedFlag=" + testSharedFlag + ", docInitial="
				+ docInitial + ", doc_cons_per=" + doc_cons_per
				+ ", doc_inv_per=" + doc_inv_per + ", doc_pathology_per="
				+ doc_pathology_per + ", doc_physio_per=" + doc_physio_per
				+ ", doc_os_per=" + doc_os_per + ", doc_casualty_per="
				+ doc_casualty_per + ", group_master_id=" + group_master_id
				+ ", empIdhr=" + empIdhr + ", doctorfee=" + doctorfee
				+ ", fixedIncome=" + fixedIncome + ", dynamic_group_master_id="
				+ dynamic_group_master_id + ", referalPercent="
				+ referalPercent + ", folloupfees=" + folloupfees
				+ ", folloupWeekend=" + folloupWeekend + ", resignation_Date="
				+ resignation_Date + ", resignation_Rele_Date="
				+ resignation_Rele_Date + ", termination_service="
				+ termination_service + ", per_visit_charge="
				+ per_visit_charge + ", specializationName="
				+ specializationName + "]";
	}

	public List<DoctorDetail> getListDoctorDetailsDto() {
		return listDoctorDetailsDto;
	}

	public void setListDoctorDetailsDto(List<DoctorDetail> listDoctorDetailsDto) {
		this.listDoctorDetailsDto = listDoctorDetailsDto;
	}
 
 
 
 
}


/*package com.hms.dto;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;


@Entity
@Table(name = "doctor")
public class DoctorDetail {
 
 @Id
 @GeneratedValue
 @Column(name = "Doctor_ID")
 private Integer doctor_ID;
 @Column(name = "doc_name")
 private String doc_name;
 @Column(name = "address")
 private String address;
 @Column(name = "mobileNo")
 private String mobileNo;
 @Column(name = "email_Id")
 private String email_Id;
 @Column(name = "education")
 private String education;
 @Column(name = "specialisation")
 private String specialisation;
 @Column(name = "doc_Type")
 private String doc_Type ;
 @Column(name = "User_ID")
 private String User_ID ;
 @Column(name = "fees")
 private String fees ;
 @Column(name = "followfees")
 private String followfees ;
 @Column(name = "status")
 private String status ;
 @Column(name = "dob")
 private String dob ;
 @Column(name = "apartment")
 private String apartment ;
 @Column(name = "city")
 private String city ;
 @Column(name = "state")
 private String state ;
 @Column(name = "zip")
 private String zip ;
 @Column(name = "dojoin")
 private String dojoin ;
 @Column(name = "schoolNm")
 private String schoolNm ;
 @Column(name = "schoolAdd")
 private String schoolAdd ;
 @Column(name = "schoolForm")
 private String schoolForm ;
 @Column(name = "schooTo")
 private String schooTo ;
 @Column(name = "schoolPercent")
 private String schoolPercent ;
 @Column(name = "colNm")
 private String colNm ;
 @Column(name = "colAdd")
 private String colAdd ;
 @Column(name = "colForm")
 private String colForm ;
 @Column(name = "colTo")
 private String colTo ;
 @Column(name = "colPercent")
 private String colPercent ;
 @Column(name = "colDegree")
 private String colDegree ;
 @Column(name = "pgNm")
 private String pgNm ;
 @Column(name = "pgAdd")
 private String pgAdd ;
 @Column(name = "pgForm")
 private String pgForm ;
 @Column(name = "pgTo")
 private String pgTo ;
 @Column(name = "pgPercent")
 private String pgPercent ;
 @Column(name = "pgDegree")
 private String pgDegree ;
 @Column(name = "cmpnyNm")
 private String cmpnyNm ;
 @Column(name = "cmpnyAdd")
 private String cmpnyAdd ;
 @Column(name = "cmpnyPhone")
 private String cmpnyPhone;
 @Column(name = "cmpnyBoss")
 private String cmpnyBoss ;
 @Column(name = "jobTitle")
 private String jobTitle ;
 @Column(name = "jobResp")
 private String jobResp ;
 @Column(name = "jobForm")
 private String jobForm ;
 @Column(name = "jobTo")
 private String jobTo ;
 @Column(name = "salary")
 private String salary ;
 @Column(name = "hosType")
 private String hosType ;
 @Column(name = "secu_monthly_deduct")
 private String secu_monthly_deduct ;
 @Column(name = "no_of_months_for_secu")
 private String no_of_months_for_secu ;
 @Column(name = "machine_emp_code")
 private String machine_emp_code ;
 @Column(name = "security_current_month")
 private String security_current_month ;
 @Column(name = "total_submit_security")
 private String total_submit_security ;
 @Column(name = "aplicable_leaves")
 private String aplicable_leaves ;
 @Column(name = "balance_leaves")
 private String balance_leaves ;
 @Column(name = "charge_type")
 private String charge_type ;
 @Column(name = "department")
 private String department ;
 @Column(name = "speciality")
 private String speciality ;
 @Column(name = "overrideFlag")
 private String overrideFlag ;
 @Column(name = "PAN_CardNo")
 private String PAN_CardNo ;
 @Column(name = "CTC")
 private String CTC ;
 @Column(name = "PLVP")
 private String PLVP ;
 @Column(name = "doctorpercent")
 private String doctorpercent ;
 @Column(name = "signature")
 private String signature ;
 @Column(name = "softwareUsed")
 private String softwareUsed ;
 @Column(name = "qualification")
 private String qualification ;
 @Column(name = "designation")
 private String designation ;
 @Column(name = "regNo")
 private String regNo ;
 @Column(name = "sendSMSflag")
 
 private String sendSMSflag ;
 @Column(name = "motivatorAuthorisation")
 private String motivatorAuthorisation ;
 @Column(name = "clinicPercent")
 private String clinicPercent ;
 @Column(name = "testSharedFlag")
 private String testSharedFlag ;
 @Column(name = "docInitial")
 private String docInitial ;
 @Column(name = "doc_cons_per")
 private String doc_cons_per ;
 @Column(name = "doc_inv_per")
 private String doc_inv_per ;
 @Column(name = "doc_pathology_per")
 private String doc_pathology_per ;
 @Column(name = "doc_physio_per")
 private String doc_physio_per ;
 @Column(name = "doc_os_per")
 private String doc_os_per ;
 @Column(name = "doc_casualty_per")
 private String doc_casualty_per ;
 @Column(name = "group_master_id")
 private String group_master_id ;
 @Column(name = "empIdhr")
 private String empIdhr ;
 @Column(name = "doctorfee")
 private String doctorfee ;
 @Column(name = "fixed_income")
 private String fixed_income ;
 @Column(name = "dynamic_group_master_id")
 private String dynamic_group_master_id ;
 @Column(name = "referal_percent")
 private String referal_percent ;
 @Column(name = "folloup_fees")
 private String folloup_fees ;
 @Column(name = "folloup_weekend")
 private String folloup_weekend ;
 @Column(name = "resignation_Date")
 private String resignation_Date ;
 @Column(name = "resignation_Rele_Date")
 private String resignation_Rele_Date ;
 @Column(name = "termination_service")
 private String termination_service ;
 @Column(name = "per_visit_charge")
 private String per_visit_charge ;
 @Column(name = "specializationName")
 private String specializationName ;
 
    @OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="User_ID")
	private UserDetails UserDetails;
    
    @Transient
	private List<DoctorDetail> listDoctorDetailsDto;

	public Integer getDoctor_ID() {
		return doctor_ID;
	}

	public void setDoctor_ID(Integer doctor_ID) {
		this.doctor_ID = doctor_ID;
	}

	public String getDoc_name() {
		return doc_name;
	}

	public void setDoc_name(String doc_name) {
		this.doc_name = doc_name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getEmail_Id() {
		return email_Id;
	}

	public void setEmail_Id(String email_Id) {
		this.email_Id = email_Id;
	}

	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	public String getSpecialisation() {
		return specialisation;
	}

	public void setSpecialisation(String specialisation) {
		this.specialisation = specialisation;
	}

	public String getDoc_Type() {
		return doc_Type;
	}

	public void setDoc_Type(String doc_Type) {
		this.doc_Type = doc_Type;
	}

	public String getFees() {
		return fees;
	}

	public void setFees(String fees) {
		this.fees = fees;
	}

	public String getFollowfees() {
		return followfees;
	}

	public void setFollowfees(String followfees) {
		this.followfees = followfees;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getApartment() {
		return apartment;
	}

	public void setApartment(String apartment) {
		this.apartment = apartment;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getDojoin() {
		return dojoin;
	}

	public void setDojoin(String dojoin) {
		this.dojoin = dojoin;
	}

	public String getSchoolNm() {
		return schoolNm;
	}

	public void setSchoolNm(String schoolNm) {
		this.schoolNm = schoolNm;
	}

	public String getSchoolAdd() {
		return schoolAdd;
	}

	public void setSchoolAdd(String schoolAdd) {
		this.schoolAdd = schoolAdd;
	}

	public String getSchoolForm() {
		return schoolForm;
	}

	public void setSchoolForm(String schoolForm) {
		this.schoolForm = schoolForm;
	}

	public String getSchooTo() {
		return schooTo;
	}

	public void setSchooTo(String schooTo) {
		this.schooTo = schooTo;
	}

	public String getSchoolPercent() {
		return schoolPercent;
	}

	public void setSchoolPercent(String schoolPercent) {
		this.schoolPercent = schoolPercent;
	}

	public String getColNm() {
		return colNm;
	}

	public void setColNm(String colNm) {
		this.colNm = colNm;
	}

	public String getColAdd() {
		return colAdd;
	}

	public void setColAdd(String colAdd) {
		this.colAdd = colAdd;
	}

	public String getColForm() {
		return colForm;
	}

	public void setColForm(String colForm) {
		this.colForm = colForm;
	}

	public String getColTo() {
		return colTo;
	}

	public void setColTo(String colTo) {
		this.colTo = colTo;
	}

	public String getColPercent() {
		return colPercent;
	}

	public void setColPercent(String colPercent) {
		this.colPercent = colPercent;
	}

	public String getColDegree() {
		return colDegree;
	}

	public void setColDegree(String colDegree) {
		this.colDegree = colDegree;
	}

	public String getPgNm() {
		return pgNm;
	}

	public void setPgNm(String pgNm) {
		this.pgNm = pgNm;
	}

	public String getPgAdd() {
		return pgAdd;
	}

	public void setPgAdd(String pgAdd) {
		this.pgAdd = pgAdd;
	}

	public String getPgForm() {
		return pgForm;
	}

	public void setPgForm(String pgForm) {
		this.pgForm = pgForm;
	}

	public String getPgTo() {
		return pgTo;
	}

	public void setPgTo(String pgTo) {
		this.pgTo = pgTo;
	}

	public String getPgPercent() {
		return pgPercent;
	}

	public void setPgPercent(String pgPercent) {
		this.pgPercent = pgPercent;
	}

	public String getPgDegree() {
		return pgDegree;
	}

	public void setPgDegree(String pgDegree) {
		this.pgDegree = pgDegree;
	}

	public String getCmpnyNm() {
		return cmpnyNm;
	}

	public void setCmpnyNm(String cmpnyNm) {
		this.cmpnyNm = cmpnyNm;
	}

	public String getCmpnyAdd() {
		return cmpnyAdd;
	}

	public void setCmpnyAdd(String cmpnyAdd) {
		this.cmpnyAdd = cmpnyAdd;
	}

	public String getCmpnyPhone() {
		return cmpnyPhone;
	}

	public void setCmpnyPhone(String cmpnyPhone) {
		this.cmpnyPhone = cmpnyPhone;
	}

	public String getCmpnyBoss() {
		return cmpnyBoss;
	}

	public void setCmpnyBoss(String cmpnyBoss) {
		this.cmpnyBoss = cmpnyBoss;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getJobResp() {
		return jobResp;
	}

	public void setJobResp(String jobResp) {
		this.jobResp = jobResp;
	}

	public String getJobForm() {
		return jobForm;
	}

	public void setJobForm(String jobForm) {
		this.jobForm = jobForm;
	}

	public String getJobTo() {
		return jobTo;
	}

	public void setJobTo(String jobTo) {
		this.jobTo = jobTo;
	}

	public String getSalary() {
		return salary;
	}

	public void setSalary(String salary) {
		this.salary = salary;
	}

	public String getHosType() {
		return hosType;
	}

	public void setHosType(String hosType) {
		this.hosType = hosType;
	}

	public String getSecu_monthly_deduct() {
		return secu_monthly_deduct;
	}

	public void setSecu_monthly_deduct(String secu_monthly_deduct) {
		this.secu_monthly_deduct = secu_monthly_deduct;
	}

	public String getNo_of_months_for_secu() {
		return no_of_months_for_secu;
	}

	public void setNo_of_months_for_secu(String no_of_months_for_secu) {
		this.no_of_months_for_secu = no_of_months_for_secu;
	}

	public String getMachine_emp_code() {
		return machine_emp_code;
	}

	public void setMachine_emp_code(String machine_emp_code) {
		this.machine_emp_code = machine_emp_code;
	}

	public String getSecurity_current_month() {
		return security_current_month;
	}

	public void setSecurity_current_month(String security_current_month) {
		this.security_current_month = security_current_month;
	}

	public String getTotal_submit_security() {
		return total_submit_security;
	}

	public void setTotal_submit_security(String total_submit_security) {
		this.total_submit_security = total_submit_security;
	}

	public String getAplicable_leaves() {
		return aplicable_leaves;
	}

	public void setAplicable_leaves(String aplicable_leaves) {
		this.aplicable_leaves = aplicable_leaves;
	}

	public String getBalance_leaves() {
		return balance_leaves;
	}

	public void setBalance_leaves(String balance_leaves) {
		this.balance_leaves = balance_leaves;
	}

	public String getCharge_type() {
		return charge_type;
	}

	public void setCharge_type(String charge_type) {
		this.charge_type = charge_type;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getSpeciality() {
		return speciality;
	}

	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}

	public String getOverrideFlag() {
		return overrideFlag;
	}

	public void setOverrideFlag(String overrideFlag) {
		this.overrideFlag = overrideFlag;
	}

	public String getPAN_CardNo() {
		return PAN_CardNo;
	}

	public void setPAN_CardNo(String pAN_CardNo) {
		PAN_CardNo = pAN_CardNo;
	}

	public String getCTC() {
		return CTC;
	}

	public void setCTC(String cTC) {
		CTC = cTC;
	}

	public String getPLVP() {
		return PLVP;
	}

	public void setPLVP(String pLVP) {
		PLVP = pLVP;
	}

	public String getDoctorpercent() {
		return doctorpercent;
	}

	public void setDoctorpercent(String doctorpercent) {
		this.doctorpercent = doctorpercent;
	}

	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	public String getSoftwareUsed() {
		return softwareUsed;
	}

	public void setSoftwareUsed(String softwareUsed) {
		this.softwareUsed = softwareUsed;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getRegNo() {
		return regNo;
	}

	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}

	public String getSendSMSflag() {
		return sendSMSflag;
	}

	public void setSendSMSflag(String sendSMSflag) {
		this.sendSMSflag = sendSMSflag;
	}

	public String getMotivatorAuthorisation() {
		return motivatorAuthorisation;
	}

	public void setMotivatorAuthorisation(String motivatorAuthorisation) {
		this.motivatorAuthorisation = motivatorAuthorisation;
	}

	public String getClinicPercent() {
		return clinicPercent;
	}

	public void setClinicPercent(String clinicPercent) {
		this.clinicPercent = clinicPercent;
	}

	public String getTestSharedFlag() {
		return testSharedFlag;
	}

	public void setTestSharedFlag(String testSharedFlag) {
		this.testSharedFlag = testSharedFlag;
	}

	public String getDocInitial() {
		return docInitial;
	}

	public void setDocInitial(String docInitial) {
		this.docInitial = docInitial;
	}

	public String getDoc_cons_per() {
		return doc_cons_per;
	}

	public void setDoc_cons_per(String doc_cons_per) {
		this.doc_cons_per = doc_cons_per;
	}

	public String getDoc_inv_per() {
		return doc_inv_per;
	}

	public void setDoc_inv_per(String doc_inv_per) {
		this.doc_inv_per = doc_inv_per;
	}

	public String getDoc_pathology_per() {
		return doc_pathology_per;
	}

	public void setDoc_pathology_per(String doc_pathology_per) {
		this.doc_pathology_per = doc_pathology_per;
	}

	public String getDoc_physio_per() {
		return doc_physio_per;
	}

	public void setDoc_physio_per(String doc_physio_per) {
		this.doc_physio_per = doc_physio_per;
	}

	public String getDoc_os_per() {
		return doc_os_per;
	}

	public void setDoc_os_per(String doc_os_per) {
		this.doc_os_per = doc_os_per;
	}

	public String getDoc_casualty_per() {
		return doc_casualty_per;
	}

	public void setDoc_casualty_per(String doc_casualty_per) {
		this.doc_casualty_per = doc_casualty_per;
	}

	public String getGroup_master_id() {
		return group_master_id;
	}

	public void setGroup_master_id(String group_master_id) {
		this.group_master_id = group_master_id;
	}

	public String getEmpIdhr() {
		return empIdhr;
	}

	public void setEmpIdhr(String empIdhr) {
		this.empIdhr = empIdhr;
	}

	public String getDoctorfee() {
		return doctorfee;
	}

	public void setDoctorfee(String doctorfee) {
		this.doctorfee = doctorfee;
	}

	public String getFixed_income() {
		return fixed_income;
	}

	public void setFixed_income(String fixed_income) {
		this.fixed_income = fixed_income;
	}

	public String getDynamic_group_master_id() {
		return dynamic_group_master_id;
	}

	public void setDynamic_group_master_id(String dynamic_group_master_id) {
		this.dynamic_group_master_id = dynamic_group_master_id;
	}

	public String getReferal_percent() {
		return referal_percent;
	}

	public void setReferal_percent(String referal_percent) {
		this.referal_percent = referal_percent;
	}

	public String getFolloup_fees() {
		return folloup_fees;
	}

	public void setFolloup_fees(String folloup_fees) {
		this.folloup_fees = folloup_fees;
	}

	public String getFolloup_weekend() {
		return folloup_weekend;
	}

	public void setFolloup_weekend(String folloup_weekend) {
		this.folloup_weekend = folloup_weekend;
	}

	public String getResignation_Date() {
		return resignation_Date;
	}

	public void setResignation_Date(String resignation_Date) {
		this.resignation_Date = resignation_Date;
	}

	public String getResignation_Rele_Date() {
		return resignation_Rele_Date;
	}

	public void setResignation_Rele_Date(String resignation_Rele_Date) {
		this.resignation_Rele_Date = resignation_Rele_Date;
	}

	public String getTermination_service() {
		return termination_service;
	}

	public void setTermination_service(String termination_service) {
		this.termination_service = termination_service;
	}

	public String getPer_visit_charge() {
		return per_visit_charge;
	}

	public void setPer_visit_charge(String per_visit_charge) {
		this.per_visit_charge = per_visit_charge;
	}

	public String getSpecializationName() {
		return specializationName;
	}

	public void setSpecializationName(String specializationName) {
		this.specializationName = specializationName;
	}

	public UserDetails getUserDetails() {
		return UserDetails;
	}

	public void setUserDetails(UserDetails userDetails) {
		UserDetails = userDetails;
	}

	@Override
	public String toString() {
		return "DoctorDetail [doctor_ID=" + doctor_ID + ", doc_name="
				+ doc_name + ", address=" + address + ", mobileNo=" + mobileNo
				+ ", email_Id=" + email_Id + ", education=" + education
				+ ", specialisation=" + specialisation + ", doc_Type="
				+ doc_Type + ", fees=" + fees + ", followfees=" + followfees
				+ ", status=" + status + ", dob=" + dob + ", apartment="
				+ apartment + ", city=" + city + ", state=" + state + ", zip="
				+ zip + ", dojoin=" + dojoin + ", schoolNm=" + schoolNm
				+ ", schoolAdd=" + schoolAdd + ", schoolForm=" + schoolForm
				+ ", schooTo=" + schooTo + ", schoolPercent=" + schoolPercent
				+ ", colNm=" + colNm + ", colAdd=" + colAdd + ", colForm="
				+ colForm + ", colTo=" + colTo + ", colPercent=" + colPercent
				+ ", colDegree=" + colDegree + ", pgNm=" + pgNm + ", pgAdd="
				+ pgAdd + ", pgForm=" + pgForm + ", pgTo=" + pgTo
				+ ", pgPercent=" + pgPercent + ", pgDegree=" + pgDegree
				+ ", cmpnyNm=" + cmpnyNm + ", cmpnyAdd=" + cmpnyAdd
				+ ", cmpnyPhone=" + cmpnyPhone + ", cmpnyBoss=" + cmpnyBoss
				+ ", jobTitle=" + jobTitle + ", jobResp=" + jobResp
				+ ", jobForm=" + jobForm + ", jobTo=" + jobTo + ", salary="
				+ salary + ", hosType=" + hosType + ", secu_monthly_deduct="
				+ secu_monthly_deduct + ", no_of_months_for_secu="
				+ no_of_months_for_secu + ", machine_emp_code="
				+ machine_emp_code + ", security_current_month="
				+ security_current_month + ", total_submit_security="
				+ total_submit_security + ", aplicable_leaves="
				+ aplicable_leaves + ", balance_leaves=" + balance_leaves
				+ ", charge_type=" + charge_type + ", department=" + department
				+ ", speciality=" + speciality + ", overrideFlag="
				+ overrideFlag + ", PAN_CardNo=" + PAN_CardNo + ", CTC=" + CTC
				+ ", PLVP=" + PLVP + ", doctorpercent=" + doctorpercent
				+ ", signature=" + signature + ", softwareUsed=" + softwareUsed
				+ ", qualification=" + qualification + ", designation="
				+ designation + ", regNo=" + regNo + ", sendSMSflag="
				+ sendSMSflag + ", motivatorAuthorisation="
				+ motivatorAuthorisation + ", clinicPercent=" + clinicPercent
				+ ", testSharedFlag=" + testSharedFlag + ", docInitial="
				+ docInitial + ", doc_cons_per=" + doc_cons_per
				+ ", doc_inv_per=" + doc_inv_per + ", doc_pathology_per="
				+ doc_pathology_per + ", doc_physio_per=" + doc_physio_per
				+ ", doc_os_per=" + doc_os_per + ", doc_casualty_per="
				+ doc_casualty_per + ", group_master_id=" + group_master_id
				+ ", empIdhr=" + empIdhr + ", doctorfee=" + doctorfee
				+ ", fixed_income=" + fixed_income
				+ ", dynamic_group_master_id=" + dynamic_group_master_id
				+ ", referal_percent=" + referal_percent + ", folloup_fees="
				+ folloup_fees + ", folloup_weekend=" + folloup_weekend
				+ ", resignation_Date=" + resignation_Date
				+ ", resignation_Rele_Date=" + resignation_Rele_Date
				+ ", termination_service=" + termination_service
				+ ", per_visit_charge=" + per_visit_charge
				+ ", specializationName=" + specializationName
				+ ", UserDetails=" + UserDetails + "]";
	}

	public List<DoctorDetail> getListDoctorDetailsDto() {
		return listDoctorDetailsDto;
	}

	public void setListDoctorDetailsDto(List<DoctorDetail> listDoctorDetailsDto) {
		this.listDoctorDetailsDto = listDoctorDetailsDto;
	}
 
 
 
 
}*/