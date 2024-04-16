package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;
import com.hms.dto.Appointment;
import com.hms.dto.Users;
import com.hms.rostermanagement.dto.ScheduleAppointmentsDTO;

public class OpdAppSchedReportDto {
	
	
	int apptId,branchId,doctorId,treatmentId,patientId,followUpCount,rescheduleCount;
	
	String patientName,lastName,title,RegFlag,regType,note,details,status,apptTypeId,docname,apptTimeFrom,apptTimeTo,commonTokenNo,mobNo,mvrflag;
	
	String patient_hosp_status,apptTimeTemp,radioDayWeekMonth,valueDayWeekMonth;
	
	Date apptDate;
		
	
	List<ScheduleAppointmentsDTO> listAppointmet;
	

	RegistrationDto objpatient;
	
	Users objUsers;
	
	List<Users> listDoctor;
	
	List<Appointment> DoctmultApp;
	
	List<OpdAppSchedReportDto> lstOpdAppSchedReportDto;

	
	
	public List<OpdAppSchedReportDto> getLstOpdAppSchedReportDto() {
		return lstOpdAppSchedReportDto;
	}

	public void setLstOpdAppSchedReportDto(List<OpdAppSchedReportDto> lstOpdAppSchedReportDto) {
		this.lstOpdAppSchedReportDto = lstOpdAppSchedReportDto;
	}

	public int getApptId() {
		return apptId;
	}

	public void setApptId(int apptId) {
		this.apptId = apptId;
	}

	public int getBranchId() {
		return branchId;
	}

	public void setBranchId(int branchId) {
		this.branchId = branchId;
	}

	public int getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public int getFollowUpCount() {
		return followUpCount;
	}

	public void setFollowUpCount(int followUpCount) {
		this.followUpCount = followUpCount;
	}

	public int getRescheduleCount() {
		return rescheduleCount;
	}

	public void setRescheduleCount(int rescheduleCount) {
		this.rescheduleCount = rescheduleCount;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
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

	public String getRegFlag() {
		return RegFlag;
	}

	public void setRegFlag(String regFlag) {
		RegFlag = regFlag;
	}

	public String getRegType() {
		return regType;
	}

	public void setRegType(String regType) {
		this.regType = regType;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getApptTypeId() {
		return apptTypeId;
	}

	public void setApptTypeId(String apptTypeId) {
		this.apptTypeId = apptTypeId;
	}

	public String getDocname() {
		return docname;
	}

	public void setDocname(String docname) {
		this.docname = docname;
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

	public String getCommonTokenNo() {
		return commonTokenNo;
	}

	public void setCommonTokenNo(String commonTokenNo) {
		this.commonTokenNo = commonTokenNo;
	}

	public String getMobNo() {
		return mobNo;
	}

	public void setMobNo(String mobNo) {
		this.mobNo = mobNo;
	}

	public String getMvrflag() {
		return mvrflag;
	}

	public void setMvrflag(String mvrflag) {
		this.mvrflag = mvrflag;
	}

	public String getPatient_hosp_status() {
		return patient_hosp_status;
	}

	public void setPatient_hosp_status(String patient_hosp_status) {
		this.patient_hosp_status = patient_hosp_status;
	}

	public String getApptTimeTemp() {
		return apptTimeTemp;
	}

	public void setApptTimeTemp(String apptTimeTemp) {
		this.apptTimeTemp = apptTimeTemp;
	}

	public String getRadioDayWeekMonth() {
		return radioDayWeekMonth;
	}

	public void setRadioDayWeekMonth(String radioDayWeekMonth) {
		this.radioDayWeekMonth = radioDayWeekMonth;
	}

	public String getValueDayWeekMonth() {
		return valueDayWeekMonth;
	}

	public void setValueDayWeekMonth(String valueDayWeekMonth) {
		this.valueDayWeekMonth = valueDayWeekMonth;
	}

	public Date getApptDate() {
		return apptDate;
	}

	public void setApptDate(Date apptDate) {
		this.apptDate = apptDate;
	}

	public List<ScheduleAppointmentsDTO> getListAppointmet() {
		return listAppointmet;
	}

	public void setListAppointmet(List<ScheduleAppointmentsDTO> listAppointmet) {
		this.listAppointmet = listAppointmet;
	}

	

	public RegistrationDto getObjpatient() {
		return objpatient;
	}

	public void setObjpatient(RegistrationDto objpatient) {
		this.objpatient = objpatient;
	}

	public Users getObjUsers() {
		return objUsers;
	}

	public void setObjUsers(Users objUsers) {
		this.objUsers = objUsers;
	}

	public List<Users> getListDoctor() {
		return listDoctor;
	}

	public void setListDoctor(List<Users> listDoctor) {
		this.listDoctor = listDoctor;
	}

	public List<Appointment> getDoctmultApp() {
		return DoctmultApp;
	}

	public void setDoctmultApp(List<Appointment> doctmultApp) {
		DoctmultApp = doctmultApp;
	}
	
	
	
}
