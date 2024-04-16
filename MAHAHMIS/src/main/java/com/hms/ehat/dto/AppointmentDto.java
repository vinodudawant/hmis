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
@Table(name ="appointment")
public class AppointmentDto {
		@Id
		@GeneratedValue
		@Column(name = "Patient_ID")
		protected Integer patientId;
		
		
		@Column(name = "Appt_ID")
		protected Integer apptId;
		
		@Column(name = "Doctor_id")
		protected Integer doctorId;
		
		@Column(name = "Treatment_id")
		protected Integer treatmentId;
		
		/*
		 * @Column(name = "appt_date") protected String apptDate;
		 */
		
		@Temporal(TemporalType.DATE)
		@Column(name = "appt_date")
		private Date apptDate;
		
		@Column(name = "Doc_Name")
		protected String docname;

		@Column(name = "Mobile_No")
		protected String mobNo;
		
		@Column(name = "patient_last_name")
		private String lastName;
		
		@Column(name = "patient_title")
		private String title;
		
		@Column(name = "Patient_Name")
		protected String patientName;
		
		@Column(name = "RegFlag")
		protected String RegFlag="N";
		
		@Column(name = "Branch_id",columnDefinition="int default 1")
		private int branchId;
		
		@Column(name = "Note",columnDefinition="varchar(255) default ''")
		private String note;
		
		@Column(name = "Details",columnDefinition="varchar(500) default ''")
		private String details;
		
		
		@Column(name = "appt_type_id",columnDefinition="varchar(500) default ''")
		private String apptTypeId;
		
		@Column(name = "appt_time_from",columnDefinition="varchar(500) default ''")
		private String apptTimeFrom;
		
		@Column(name = "appt_time_to",columnDefinition="varchar(500) default ''")
		private String apptTimeTo;
		
		@Column(name = "patient_hosp_status",columnDefinition="varchar(50) default ''")
		private String patient_hosp_status;
		
		@Column(name = "common_Token_number",columnDefinition="varchar(50) default ''")
		private String commonTokenNo;
		
		@Column(name = "mvrflag",columnDefinition="varchar(50) default ''")
		private String mvrflag;
		
		@Column(name = "regType",columnDefinition="varchar(50) default ''")
		private String regType;
		
		
		@Transient
		private Integer tCount;
		
		@Transient
		private String mName;
		
		@Transient
		private String dob;
		
		@Transient
		private int age;
		
		@Transient
		private int ageMonths;
		
		@Transient
		private int ageDays;
		
		@Transient
		private String address;
		
		@Transient
		private int talukaId;
		
		@Transient
		private int townId;
		
		@Transient
		private int districtId;
		
		@Transient
		private int stateId;
		
		@Transient
		private int countryId;
		
		@Transient
		private int areaCode;
		
		@Transient
		private String perAddress;
		
		@Transient
		private int pertalukaId;
		
		@Transient
		private int pertownId;
		
		@Transient
		private int perdistrictId;
		
		@Transient
		private int perstateId;
		
		@Transient
		private int percountryId;
		
		@Transient
		private int perareaCode;
		
		@Transient
		private List<AppointmentDto> lstAppointment;

	
		public Integer getPatientId() {
			return patientId;
		}

		public void setPatientId(Integer patientId) {
			this.patientId = patientId;
		}

		public Integer getApptId() {
			return apptId;
		}

		public void setApptId(Integer apptId) {
			this.apptId = apptId;
		}

		public Integer getDoctorId() {
			return doctorId;
		}

		public void setDoctorId(Integer doctorId) {
			this.doctorId = doctorId;
		}

		public Integer getTreatmentId() {
			return treatmentId;
		}

		public void setTreatmentId(Integer treatmentId) {
			this.treatmentId = treatmentId;
		}

		

		public String getDocname() {
			return docname;
		}

		public void setDocname(String docname) {
			this.docname = docname;
		}

		 

		public String getMobNo() {
			return mobNo;
		}

		public void setMobNo(String mobNo) {
			this.mobNo = mobNo;
		}

		public String getLastName() {
			return lastName;
		}

		public void setLastName(String lastName) {
			this.lastName = lastName;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getPatientName() {
			return patientName;
		}

		public void setPatientName(String patientName) {
			this.patientName = patientName;
		}

		public List<AppointmentDto> getLstAppointment() {
			return lstAppointment;
		}

		public void setLstAppointment(List<AppointmentDto> lstAppointment) {
			this.lstAppointment = lstAppointment;
		}

		public String getRegFlag() {
			return RegFlag;
		}

		public void setRegFlag(String regFlag) {
			RegFlag = regFlag;
		}

		public Integer gettCount() {
			return tCount;
		}

		public void settCount(Integer tCount) {
			this.tCount = tCount;
		}

		public String getmName() {
			return mName;
		}

		public void setmName(String mName) {
			this.mName = mName;
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

		public String getAddress() {
			return address;
		}

		public void setAddress(String address) {
			this.address = address;
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

		public int getBranchId() {
			return branchId;
		}

		public void setBranchId(int branchId) {
			this.branchId = branchId;
		}

		public String getNote() {
			return note;
		}

		public void setNote(String note) {
			this.note = note;
		}

		public String getDetails() {
			return details;
		}

		public void setDetails(String details) {
			this.details = details;
		}

		public String getApptTypeId() {
			return apptTypeId;
		}

		public void setApptTypeId(String apptTypeId) {
			this.apptTypeId = apptTypeId;
		}

		public String getApptTimeFrom() {
			return apptTimeFrom;
		}

		public void setApptTimeFrom(String apptTimeFrom) {
			this.apptTimeFrom = apptTimeFrom;
		}

		public String getApptTimeTo() {
			return apptTimeTo;
		}

		public void setApptTimeTo(String apptTimeTo) {
			this.apptTimeTo = apptTimeTo;
		}

		public String getPatient_hosp_status() {
			return patient_hosp_status;
		}

		public void setPatient_hosp_status(String patient_hosp_status) {
			this.patient_hosp_status = patient_hosp_status;
		}

		public String getCommonTokenNo() {
			return commonTokenNo;
		}

		public void setCommonTokenNo(String commonTokenNo) {
			this.commonTokenNo = commonTokenNo;
		}

		public String getMvrflag() {
			return mvrflag;
		}

		public void setMvrflag(String mvrflag) {
			this.mvrflag = mvrflag;
		}

		public String getRegType() {
			return regType;
		}

		public void setRegType(String regType) {
			this.regType = regType;
		}

		public Date getApptDate() {
			return apptDate;
		}

		public void setApptDate(Date apptDate) {
			this.apptDate = apptDate;
		}
		
		
 

}
		 
		 