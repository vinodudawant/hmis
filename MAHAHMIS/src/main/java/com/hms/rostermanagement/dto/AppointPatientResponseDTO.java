package com.hms.rostermanagement.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Transient;


public class AppointPatientResponseDTO {
	
	
	private int Appt_ID;
	private int Branch_id;
	private int Doctor_id;
	private int Treatment_id;
	private int Patient_ID;
	private String Note;
	private String Details;
	private String Status;
	private String appt_type_id;
	private Date appt_date;
	private String Doc_Name;
	private String appt_time_from;
	private String appt_time_to;
	private String common_Token_number;
	private String Mobile_No;
	private String mvrflag;
	private String Patient_Name;
	private String patient_last_name;
	private String patient_title;
	private String RegFlag;
	private String regType;
	private String patient_hosp_status;
	private int unit_id;

	
	
	@Transient
	private List<AppointPatientResponseDTO> listAppointmet;



	public int getAppt_ID() {
		return Appt_ID;
	}



	public void setAppt_ID(int appt_ID) {
		Appt_ID = appt_ID;
	}



	public int getBranch_id() {
		return Branch_id;
	}



	public void setBranch_id(int branch_id) {
		Branch_id = branch_id;
	}



	public int getDoctor_id() {
		return Doctor_id;
	}



	public void setDoctor_id(int doctor_id) {
		Doctor_id = doctor_id;
	}



	public int getTreatment_id() {
		return Treatment_id;
	}



	public void setTreatment_id(int treatment_id) {
		Treatment_id = treatment_id;
	}



	public int getPatient_ID() {
		return Patient_ID;
	}



	public void setPatient_ID(int patient_ID) {
		Patient_ID = patient_ID;
	}



	public String getNote() {
		return Note;
	}



	public void setNote(String note) {
		Note = note;
	}



	public String getDetails() {
		return Details;
	}



	public void setDetails(String details) {
		Details = details;
	}



	public String getStatus() {
		return Status;
	}



	public void setStatus(String status) {
		Status = status;
	}



	public String getAppt_type_id() {
		return appt_type_id;
	}



	public void setAppt_type_id(String appt_type_id) {
		this.appt_type_id = appt_type_id;
	}



	



	public Date getAppt_date() {
		return appt_date;
	}



	public void setAppt_date(Date appt_date) {
		this.appt_date = appt_date;
	}



	public String getDoc_Name() {
		return Doc_Name;
	}



	public void setDoc_Name(String doc_Name) {
		Doc_Name = doc_Name;
	}



	public String getAppt_time_from() {
		return appt_time_from;
	}



	public void setAppt_time_from(String appt_time_from) {
		this.appt_time_from = appt_time_from;
	}



	public String getAppt_time_to() {
		return appt_time_to;
	}



	public void setAppt_time_to(String appt_time_to) {
		this.appt_time_to = appt_time_to;
	}



	public String getCommon_Token_number() {
		return common_Token_number;
	}



	public void setCommon_Token_number(String common_Token_number) {
		this.common_Token_number = common_Token_number;
	}



	public String getMobile_No() {
		return Mobile_No;
	}



	public void setMobile_No(String mobile_No) {
		Mobile_No = mobile_No;
	}



	public String getMvrflag() {
		return mvrflag;
	}



	public void setMvrflag(String mvrflag) {
		this.mvrflag = mvrflag;
	}



	public String getPatient_Name() {
		return Patient_Name;
	}



	public void setPatient_Name(String patient_Name) {
		Patient_Name = patient_Name;
	}



	public String getPatient_last_name() {
		return patient_last_name;
	}



	public void setPatient_last_name(String patient_last_name) {
		this.patient_last_name = patient_last_name;
	}



	public String getPatient_title() {
		return patient_title;
	}



	public void setPatient_title(String patient_title) {
		this.patient_title = patient_title;
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



	public String getPatient_hosp_status() {
		return patient_hosp_status;
	}



	public void setPatient_hosp_status(String patient_hosp_status) {
		this.patient_hosp_status = patient_hosp_status;
	}



	public List<AppointPatientResponseDTO> getListAppointmet() {
		return listAppointmet;
	}



	public void setListAppointmet(List<AppointPatientResponseDTO> listAppointmet) {
		this.listAppointmet = listAppointmet;
	}



	public int getUnit_id() {
		return unit_id;
	}



	public void setUnit_id(int unit_id) {
		this.unit_id = unit_id;
	}
	
	
	
	
	


}
