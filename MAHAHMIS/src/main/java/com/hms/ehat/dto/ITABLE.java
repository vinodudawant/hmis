package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "i_table")
public class ITABLE implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "ipopflag")
	private String ipOpFlag="O";
	
	@Id
	@Column(name = "pinno")
	private String pinNo="0";
	
	@Id
	@Column(name = "ref_visitno")
	private String refVisitno="0";

	@Column(name = "admissionno")
	private String admissionno="0";

	@Id
	@Column(name = "reqdatetime")
	private Calendar reqDateTime;
	
	@Id
	@Column(name = "testprof_code")
	private String testProfCode;
	
	@Column(name = "stat")
	private String stat;
	
	@Column(name = "processed")
	private String processed="N";
	
	@Column(name = "package_name")
	private String packageName=" ";

	@Column(name = "patfname")
	private String patFname=" ";
	
	@Column(name ="patmname")
	private String patMname=" ";
	
	@Column(name ="patlname")
	private String patLname=" ";
	
	@Column(name ="pat_dob")
	private String patDob=" ";
	
	@Column(name ="gender")
	private String gender=" ";
	
	@Column(name ="patage")
	private String patAge="0";
	
	@Column(name ="ageunit")
	private String ageUnit="Years";
	
	@Column(name ="refdoccode")
	private String refDocCode="0";
		
	@Column(name ="cencode")
	private String cenCode="0";
	
	@Column(name ="cenname")
	private String cenName="NA";

	@Column(name ="bed_no")
	private String bedNo="0";

	
	@Column(name ="bed_room_no")
	private String bedRoomNo="0";

	@Column(name ="wing_code")
	private String wingCode="0";

	@Column(name ="ward_code")
	private String wardCode="0";

	@Column(name ="nationality")
	private String nationality="Indian";


	@Column(name ="diagnosis")
	private String diagnosis=" ";

		
	@Column(name ="teli_resi")
	private String teliResi=" ";

	
	@Column(name ="teli_work")
	private String teliWork=" ";
	
	
	@Column(name ="teli_mobi")
	private String teliMobi=" ";
	
	
	@Column(name ="patienttypeclass")
	private String patientTypeClass="-";
	
	
	@Column(name ="seqNo")
	private String seqNo=" ";
	
	
	@Column(name ="adddate")
	private Calendar addDate;
	
	@Column(name ="addtime")
	private String addTime;
	
	@Column(name ="doc_name")
	private String docName=" ";
	
	@Column(name ="title")
	private String title=" ";
	
	
	@Column(name ="labno")
	private int labNo=0;
	
	
	@Column(name ="deptcode")
	private String deptCode=" ";

	
	@Column(name ="bedtype")
	private String bedType=" ";
	
	
	@Column(name ="datestamp")
	private Calendar dateStamp;
	
	@Column(name ="pat_years")
	private int patYears=0;
	
	
	@Column(name ="pat_months")
	private int patMonths=0;
	
	@Column(name ="pat_days")
	private int patDays=0;
	
	
	@Column(name ="userid")
	private String userId="0";
	
	@Column(name ="upddate")
	private Calendar updDate;
	
	@Column(name ="patmobile")
	private String patMobile=" ";
	
	
	@Column(name ="webuid")
	private String webUid=" ";
	
	@Column(name ="webpwd")
	private String webPwd=" ";
	
	@Column(name ="docmobile")
	private String docMobile=" ";
	
	@Column(name ="deptname")
	private String deptName=" ";

	public String getIpOpFlag() {
		return ipOpFlag;
	}

	public void setIpOpFlag(String ipOpFlag) {
		this.ipOpFlag = ipOpFlag;
	}

	public String getPinNo() {
		return pinNo;
	}

	public void setPinNo(String pinNo) {
		this.pinNo = pinNo;
	}

	public String getRefVisitno() {
		return refVisitno;
	}

	public void setRefVisitno(String refVisitno) {
		this.refVisitno = refVisitno;
	}

	public String getAdmissionno() {
		return admissionno;
	}

	public void setAdmissionno(String admissionno) {
		this.admissionno = admissionno;
	}

	public Calendar getReqDateTime() {
		return reqDateTime;
	}

	public void setReqDateTime(Calendar reqDateTime) {
		this.reqDateTime = reqDateTime;
	}

	public String getTestProfCode() {
		return testProfCode;
	}

	public void setTestProfCode(String testProfCode) {
		this.testProfCode = testProfCode;
	}

	public String getStat() {
		return stat;
	}

	public void setStat(String stat) {
		this.stat = stat;
	}

	public String getProcessed() {
		return processed;
	}

	public void setProcessed(String processed) {
		this.processed = processed;
	}

	public String getPackageName() {
		return packageName;
	}

	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}

	public String getPatFname() {
		return patFname;
	}

	public void setPatFname(String patFname) {
		this.patFname = patFname;
	}

	public String getPatMname() {
		return patMname;
	}

	public void setPatMname(String patMname) {
		this.patMname = patMname;
	}

	public String getPatLname() {
		return patLname;
	}

	public void setPatLname(String patLname) {
		this.patLname = patLname;
	}


	public String getPatDob() {
		return patDob;
	}

	public void setPatDob(String patDob) {
		this.patDob = patDob;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPatAge() {
		return patAge;
	}

	public void setPatAge(String patAge) {
		this.patAge = patAge;
	}

	public String getAgeUnit() {
		return ageUnit;
	}

	public void setAgeUnit(String ageUnit) {
		this.ageUnit = ageUnit;
	}

	public String getRefDocCode() {
		return refDocCode;
	}

	public void setRefDocCode(String refDocCode) {
		this.refDocCode = refDocCode;
	}

	public String getCenCode() {
		return cenCode;
	}

	public void setCenCode(String cenCode) {
		this.cenCode = cenCode;
	}

	public String getCenName() {
		return cenName;
	}

	public void setCenName(String cenName) {
		this.cenName = cenName;
	}

	public String getBedNo() {
		return bedNo;
	}

	public void setBedNo(String bedNo) {
		this.bedNo = bedNo;
	}

	public String getBedRoomNo() {
		return bedRoomNo;
	}

	public void setBedRoomNo(String bedRoomNo) {
		this.bedRoomNo = bedRoomNo;
	}

	public String getWingCode() {
		return wingCode;
	}

	public void setWingCode(String wingCode) {
		this.wingCode = wingCode;
	}

	public String getWardCode() {
		return wardCode;
	}

	public void setWardCode(String wardCode) {
		this.wardCode = wardCode;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public String getDiagnosis() {
		return diagnosis;
	}

	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}

	public String getTeliResi() {
		return teliResi;
	}

	public void setTeliResi(String teliResi) {
		this.teliResi = teliResi;
	}

	public String getTeliWork() {
		return teliWork;
	}

	public void setTeliWork(String teliWork) {
		this.teliWork = teliWork;
	}

	public String getTeliMobi() {
		return teliMobi;
	}

	public void setTeliMobi(String teliMobi) {
		this.teliMobi = teliMobi;
	}

	public String getPatientTypeClass() {
		return patientTypeClass;
	}

	public void setPatientTypeClass(String patientTypeClass) {
		this.patientTypeClass = patientTypeClass;
	}

	public String getSeqNo() {
		return seqNo;
	}

	public void setSeqNo(String seqNo) {
		this.seqNo = seqNo;
	}

	public Calendar getAddDate() {
		return addDate;
	}

	public void setAddDate(Calendar addDate) {
		this.addDate = addDate;
	}

	public String getAddTime() {
		return addTime;
	}

	public void setAddTime(String addTime) {
		this.addTime = addTime;
	}

	public String getDocName() {
		return docName;
	}

	public void setDocName(String docName) {
		this.docName = docName;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getLabNo() {
		return labNo;
	}

	public void setLabNo(int labNo) {
		this.labNo = labNo;
	}

	public String getDeptCode() {
		return deptCode;
	}

	public void setDeptCode(String deptCode) {
		this.deptCode = deptCode;
	}

	public String getBedType() {
		return bedType;
	}

	public void setBedType(String bedType) {
		this.bedType = bedType;
	}

	public Calendar getDateStamp() {
		return dateStamp;
	}

	public void setDateStamp(Calendar dateStamp) {
		this.dateStamp = dateStamp;
	}

	public int getPatYears() {
		return patYears;
	}

	public void setPatYears(int patYears) {
		this.patYears = patYears;
	}

	public int getPatMonths() {
		return patMonths;
	}

	public void setPatMonths(int patMonths) {
		this.patMonths = patMonths;
	}

	public int getPatDays() {
		return patDays;
	}

	public void setPatDays(int patDays) {
		this.patDays = patDays;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Calendar getUpdDate() {
		return updDate;
	}

	public void setUpdDate(Calendar updDate) {
		this.updDate = updDate;
	}

	public String getPatMobile() {
		return patMobile;
	}

	public void setPatMobile(String patMobile) {
		this.patMobile = patMobile;
	}

	public String getWebUid() {
		return webUid;
	}

	public void setWebUid(String webUid) {
		this.webUid = webUid;
	}

	public String getWebPwd() {
		return webPwd;
	}

	public void setWebPwd(String webPwd) {
		this.webPwd = webPwd;
	}

	public String getDocMobile() {
		return docMobile;
	}

	public void setDocMobile(String docMobile) {
		this.docMobile = docMobile;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	
	
}
