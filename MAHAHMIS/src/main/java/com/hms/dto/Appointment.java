package com.hms.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

import com.hms.ehat.dto.RegistrationDto;

@XmlRootElement
public class Appointment implements Serializable {

	protected int apptId;
	protected int branchId;
	protected int doctorId;
	protected int treatmentId;
	protected int patientId;
	protected String note;
	protected String details;
	protected String status;
	protected String apptTypeId;
	protected String apptDate;
	protected String docname;

	protected String apptTimeFrom;
	protected String apptTimeTo;
	protected String commonTokenNo;
	protected String mobNo;
	protected String mvrflag;
	private String lastName;
	private String title;

	protected String apptTimeTemp;
	protected String patientName;

	private String radioDayWeekMonth;
	private String valueDayWeekMonth;

	protected List<Appointment> listAppointmet;
	protected List<Appointment> listdocApp;
	
	private int followUpCount;
	private int rescheduleCount;
	private String RegFlag;
	
	private String regType;	
	
	@JsonGetter("regType")
	public String getRegType() {
		return regType;
	}
	@JsonSetter("regType")
	public void setRegType(String regType) {
		this.regType = regType;
	}
	
	@JsonGetter("RegFlag")
	public String getRegFlag() {
		return RegFlag;
	}
	@JsonSetter("RegFlag")
	public void setRegFlag(String regFlag) {
		RegFlag = regFlag;
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

	@JsonGetter("title")
	public String getTitle() {
		return title;
	}

	@JsonSetter("title")
	public void setTitle(String title) {
		this.title = title;
	}

	@JsonGetter("lastName")
	public String getLastName() {
		return lastName;
	}

	@JsonSetter("lastName")
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@JsonGetter("mvrflag")
	public String getMvrflag() {
		return mvrflag;
	}

	@JsonSetter("mvrflag")
	public void setMvrflag(String mvrflag) {
		this.mvrflag = mvrflag;
	}

	@JsonGetter("tokenNo")
	public String getCommonTokenNo() {
		return commonTokenNo;
	}

	@JsonSetter("tokenNo")
	public void setCommonTokenNo(String commonTokenNo) {
		this.commonTokenNo = commonTokenNo;
	}

	@JsonGetter("phs")
	public String getPatient_hosp_status() {
		return patient_hosp_status;
	}

	@JsonSetter("phs")
	public void setPatient_hosp_status(String patient_hosp_status) {
		this.patient_hosp_status = patient_hosp_status;
	}

	protected String patient_hosp_status;

	@JsonGetter("mobNo")
	public String getMobNo() {
		return mobNo;
	}

	@JsonSetter("mobNo")
	public void setMobNo(String mobNo) {
		this.mobNo = mobNo;
	}

	@JsonGetter("attemp")
	public String getApptTimeTemp() {
		return apptTimeTemp;
	}

	@JsonSetter("attemp")
	public void setApptTimeTemp(String apptTimeTemp) {
		this.apptTimeTemp = apptTimeTemp;
	}

	@JsonGetter("docapp")
	public List<Appointment> getListdocApp() {
		return listdocApp;
	}

	@JsonSetter("docapp")
	public void setListdocApp(List<Appointment> listdocApp) {
		this.listdocApp = listdocApp;
	}

	@JsonGetter("docNm")
	public String getDocname() {
		return docname;
	}

	@JsonSetter("docNm")
	public void setDocname(String docname) {
		this.docname = docname;
	}

	@JsonGetter("patid")
	public int getPatientId() {
		return patientId;
	}

	@JsonSetter("patid")
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	protected List<Appointment> arrTimeSlices = new ArrayList<Appointment>();

	@JsonGetter("patNm")
	public String getPatientName() {
		return patientName;
	}

	@JsonSetter("patNm")
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	@JsonGetter("arrtime")
	public List<Appointment> getArrTimeSlices() {
		return arrTimeSlices;
	}

	@JsonSetter("arrtime")
	public void setArrTimeSlices(ArrayList<Appointment> arrTimeSlices2) {
		this.arrTimeSlices = arrTimeSlices2;
	}

	protected RegistrationDto objpatient;

	@JsonGetter("objpat")
	public RegistrationDto getObjpatient() {
		return objpatient;
	}

	@JsonSetter("objpat")
	public void setObjpatient(RegistrationDto objpatient) {
		this.objpatient = objpatient;
	}

	protected Users objUsers;

	protected List<Users> listDoctor;
	protected List<Appointment> DoctmultApp;

	@JsonGetter("docmul")
	public List<Appointment> getDoctmultApp() {
		return DoctmultApp;
	}

	@JsonSetter("docmul")
	public void setDoctmultApp(List<Appointment> doctmultApp) {
		DoctmultApp = doctmultApp;
	}

	@JsonGetter("objuser")
	public Users getObjUsers() {
		return objUsers;
	}

	@JsonSetter("objuser")
	public void setObjUsers(Users objUsers) {
		this.objUsers = objUsers;
	}

	@JsonGetter("lidoc")
	public List<Users> getListDoctor() {
		return listDoctor;
	}

	@JsonSetter("lidoc")
	public void setListDoctor(List<Users> listDoctor) {
		this.listDoctor = listDoctor;
	}

	@JsonGetter("liapp")
	public List<Appointment> getListAppointmet() {
		return listAppointmet;
	}

	@JsonSetter("liapp")
	public void setListAppointmet(List<Appointment> listAppointmet) {
		this.listAppointmet = listAppointmet;
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
	public String getApptDate() {
		return apptDate;
	}

	@JsonSetter("appdt")
	public void setApptDate(String apptDate) {
		this.apptDate = apptDate;
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

}
