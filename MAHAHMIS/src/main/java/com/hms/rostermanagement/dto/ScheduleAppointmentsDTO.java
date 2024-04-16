package com.hms.rostermanagement.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.dto.Appointment;
import com.hms.dto.Users;
import com.hms.ehat.dto.RegistrationDto;


@Entity
@Table(name ="appointment")
public class ScheduleAppointmentsDTO implements Serializable{

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "Appt_ID")
	private int apptId;
	
	@Column(name = "Branch_id")
	private int branchId;
	
	@Column(name = "Doctor_id")
	private int doctorId;
	
	@Column(name = "Treatment_id")
	private int treatmentId;
	
	@Column(name = "Patient_ID")
	private int patientId;
	
	@Column(name = "Note")
	private String note;
	
	@Column(name = "Details")
	private String details;
	
	@Column(name = "Status")
	private String status;
	
	@Column(name = "appt_type_id")
	private String apptTypeId;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "appt_date")
	private Date apptDate;
	
	@Column(name = "Doc_Name")
	private String docname;

	@Column(name = "appt_time_from")
	private String apptTimeFrom;
	
	@Column(name = "appt_time_to")
	private String apptTimeTo;
	
	@Column(name = "common_Token_number")
	private String commonTokenNo;
	
	@Column(name = "Mobile_No")
	private String mobNo;
	
	@Column(name = "mvrflag")
	private String mvrflag;
	
	@Column(name = "Patient_Name")
	private String patientName;
	
	@Column(name = "patient_last_name")
	private String lastName;
	
	@Column(name = "patient_title")
	private String title;
	
	@Column(name = "RegFlag")
	private String RegFlag;
	
	@Column(name = "regType")
	private String regType;

	@Column(name="patient_hosp_status")
	private String patient_hosp_status;
	
	

	
	@Transient
	private String apptTimeTemp;
	
	@Transient
	private String radioDayWeekMonth;
	
	@Transient
	
	private String valueDayWeekMonth;

	@Transient
	private int followUpCount;
	
	@Transient
	private int rescheduleCount;
	
	@Transient
	private List<ScheduleAppointmentsDTO> listAppointmet;
	
	@Transient
	private List<ScheduleAppointmentsDTO> listdocApp;
	
	@Transient
	private List<ScheduleAppointmentsDTO> arrTimeSlices = new ArrayList<ScheduleAppointmentsDTO>();
	
	@Transient
	private RegistrationDto objpatient;
	
	@Transient
	private Users objUsers;
	
	@JsonGetter("objuser")
	public Users getObjUsers() {
		return objUsers;
	}

	@JsonSetter("objuser")
	public void setObjUsers(Users objUsers) {
		this.objUsers = objUsers;
	}

	@JsonGetter("objpat")
	public RegistrationDto getObjpatient() {
		return objpatient;
	}

	@JsonSetter("objpat")
	public void setObjpatient(RegistrationDto objpatient) {
		this.objpatient = objpatient;
	}
	
	@Transient
	private List<Users> listDoctor;
	
	@JsonGetter("lidoc")
	public List<Users> getListDoctor() {
		return listDoctor;
	}

	@JsonSetter("lidoc")
	public void setListDoctor(List<Users> listDoctor) {
		this.listDoctor = listDoctor;
	}
	
	@Transient
	private List<Appointment> DoctmultApp;

	@JsonGetter("docmul")
	public List<Appointment> getDoctmultApp() {
		return DoctmultApp;
	}

	@JsonSetter("docmul")
	public void setDoctmultApp(List<Appointment> doctmultApp) {
		DoctmultApp = doctmultApp;
	}

	@JsonGetter("phs")
	public String getPatient_hosp_status() {
		return patient_hosp_status;
	}

	@JsonSetter("phs")
	public void setPatient_hosp_status(String patient_hosp_status) {
		this.patient_hosp_status = patient_hosp_status;
	}
	


	@JsonGetter("apid")
	public int getApptId() {
		return apptId;
	}

	@JsonSetter("apid")
	public void setApptId(int apptId) {
		this.apptId = apptId;

	}

	@JsonGetter("bid")
	public int getBranchId() {
		return branchId;
	}

	@JsonSetter("bid")
	public void setBranchId(int branchId) {
		this.branchId = branchId;

	}

	@JsonGetter("docid")
	public int getDoctorId() {
		return doctorId;
	}

	@JsonSetter("docid")
	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;

	}

	@JsonGetter("tid")
	public int getTreatmentId() {
		return treatmentId;
	}

	@JsonSetter("tid")
	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;

	}

	@JsonGetter("patid")
	public int getPatientId() {
		return patientId;
	}

	@JsonSetter("patid")
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	@JsonGetter("nt")
	public String getNote() {
		return note;
	}

	@JsonSetter("nt")
	public void setNote(String note) {
		this.note = note;
	}

	@JsonGetter("det")
	public String getDetails() {
		return details;
	}

	@JsonSetter("det")
	public void setDetails(String details) {
		this.details = details;
	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("aptyId")
	public String getApptTypeId() {
		return apptTypeId;
	}

	@JsonSetter("aptyId")
	public void setApptTypeId(String appoType) {
		this.apptTypeId = appoType;

	}

	@JsonGetter("appdt")
	public Date getApptDate() {
		return apptDate;
	}

	@JsonSetter("appdt")
	public void setApptDate(Date apptDate) {
		this.apptDate = apptDate;
	}

	@JsonGetter("docNm")
	public String getDocname() {
		return docname;
	}

	@JsonSetter("docNm")
	public void setDocname(String docname) {
		this.docname = docname;
	}

	@JsonGetter("aptf")
	public String getApptTimeFrom() {
		return apptTimeFrom;
	}

	@JsonSetter("aptf")
	public void setApptTimeFrom(String apptTimeFrom) {
		this.apptTimeFrom = apptTimeFrom;
	}

	@JsonGetter("aptto")
	public String getApptTimeTo() {
		return apptTimeTo;
	}

	@JsonSetter("aptto")
	public void setApptTimeTo(String apptTimeTo) {
		this.apptTimeTo = apptTimeTo;
	}

	@JsonGetter("tokenNo")
	public String getCommonTokenNo() {
		return commonTokenNo;
	}

	@JsonSetter("tokenNo")
	public void setCommonTokenNo(String commonTokenNo) {
		this.commonTokenNo = commonTokenNo;
	}

	@JsonGetter("mobNo")
	public String getMobNo() {
		return mobNo;
	}

	@JsonSetter("mobNo")
	public void setMobNo(String mobNo) {
		this.mobNo = mobNo;
	}

	@JsonGetter("mvrflag")
	public String getMvrflag() {
		return mvrflag;
	}

	@JsonSetter("mvrflag")
	public void setMvrflag(String mvrflag) {
		this.mvrflag = mvrflag;
	}

	@JsonGetter("lastName")
	public String getLastName() {
		return lastName;
	}

	@JsonSetter("lastName")
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@JsonGetter("title")
	public String getTitle() {
		return title;
	}

	@JsonSetter("title")
	public void setTitle(String title) {
		this.title = title;
	}

	@JsonGetter("attemp")
	public String getApptTimeTemp() {
		return apptTimeTemp;
	}

	@JsonSetter("attemp")
	public void setApptTimeTemp(String apptTimeTemp) {
		this.apptTimeTemp = apptTimeTemp;
	}

	@JsonGetter("patNm")
	public String getPatientName() {
		return patientName;
	}

	@JsonSetter("patNm")
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	@JsonGetter("radioDayWeekMonth")
	public String getRadioDayWeekMonth() {
		return radioDayWeekMonth;
	}

	@JsonSetter("radioDayWeekMonth")
	public void setRadioDayWeekMonth(String radioDayWeekMonth) {
		this.radioDayWeekMonth = radioDayWeekMonth;
	}

	@JsonGetter("valueDayWeekMonth")
	public String getValueDayWeekMonth() {
		return valueDayWeekMonth;
	}

	@JsonSetter("valueDayWeekMonth")
	public void setValueDayWeekMonth(String valueDayWeekMonth) {
		this.valueDayWeekMonth = valueDayWeekMonth;
	}

	@JsonGetter("followUpCount")
	public int getFollowUpCount() {
		return followUpCount;
	}
	@JsonSetter("followUpCount")
	public void setFollowUpCount(int followUpCount) {
		this.followUpCount = followUpCount;
	}

	@JsonGetter("rescheduleCount")
	public int getRescheduleCount() {
		return rescheduleCount;
	}
	@JsonSetter("rescheduleCount")
	public void setRescheduleCount(int rescheduleCount) {
		this.rescheduleCount = rescheduleCount;
	}

	@JsonGetter("RegFlag")
	public String getRegFlag() {
		return RegFlag;
	}
	@JsonSetter("RegFlag")
	public void setRegFlag(String regFlag) {
		RegFlag = regFlag;
	}

	@JsonGetter("regType")
	public String getRegType() {
		return regType;
	}
	@JsonSetter("regType")
	public void setRegType(String regType) {
		this.regType = regType;
	}

	@JsonGetter("liapp")
	public List<ScheduleAppointmentsDTO> getListAppointmet() {
		return listAppointmet;
	}

	@JsonSetter("liapp")
	public void setListAppointmet(List<ScheduleAppointmentsDTO> listAppointmet) {
		this.listAppointmet = listAppointmet;
	}

	@JsonGetter("docapp")
	public List<ScheduleAppointmentsDTO> getListdocApp() {
		return listdocApp;
	}

	@JsonSetter("docapp")
	public void setListdocApp(List<ScheduleAppointmentsDTO> listdocApp) {
		this.listdocApp = listdocApp;
	}
	
	@JsonGetter("arrtime")
	public List<ScheduleAppointmentsDTO> getArrTimeSlices() {
		return arrTimeSlices;
	}

	@JsonSetter("arrtime")
	public void setArrTimeSlices(ArrayList<ScheduleAppointmentsDTO> arrTimeSlices2) {
		this.arrTimeSlices = arrTimeSlices2;
	}

	

	public void setArrTimeSlices(List<ScheduleAppointmentsDTO> arrTimeSlices) {
		this.arrTimeSlices = arrTimeSlices;
	}
	
	
	
}
