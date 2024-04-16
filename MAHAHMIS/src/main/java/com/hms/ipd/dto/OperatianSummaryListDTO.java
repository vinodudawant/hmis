package com.hms.ipd.dto;

import java.io.Serializable;
import java.sql.Time;

@SuppressWarnings("serial")
public class OperatianSummaryListDTO implements Serializable {
	private Integer ID;					
	private Integer Patient_ID;
	private Integer patient_id;
	private Integer Treatment_ID;
	private Integer treatment_id;
	private Integer unit_id;
	private String Start_Time;
	private String End_Time;
	private String date;
	private String opStatus;
	private String emergencyFlag;
	private String infectionFlag;
	private Integer ot_id;
	private String criticalFlag;
	private String scheduleFlag;
	private String f_name;
	private String l_name;
	private String prefix;
	private String m_name;
	private String doc_names;
	private String scheduled_procedure;
	public Integer getID() {
		return ID;
	}
	public void setID(Integer iD) {
		ID = iD;
	}
	public Integer getPatient_ID() {
		return Patient_ID;
	}
	public void setPatient_ID(Integer patient_ID) {
		Patient_ID = patient_ID;
	}
	public Integer getTreatment_ID() {
		return Treatment_ID;
	}
	public void setTreatment_ID(Integer treatment_ID) {
		Treatment_ID = treatment_ID;
	}
	
	public String getStart_Time() {
		return Start_Time;
	}
	public void setStart_Time(String start_Time) {
		Start_Time = start_Time;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getOpStatus() {
		return opStatus;
	}
	public void setOpStatus(String opStatus) {
		this.opStatus = opStatus;
	}
	public String getEmergencyFlag() {
		return emergencyFlag;
	}
	public void setEmergencyFlag(String emergencyFlag) {
		this.emergencyFlag = emergencyFlag;
	}
	public String getInfectionFlag() {
		return infectionFlag;
	}
	public void setInfectionFlag(String infectionFlag) {
		this.infectionFlag = infectionFlag;
	}
	public Integer getOt_id() {
		return ot_id;
	}
	public void setOt_id(Integer ot_id) {
		this.ot_id = ot_id;
	}
	public String getCriticalFlag() {
		return criticalFlag;
	}
	public void setCriticalFlag(String criticalFlag) {
		this.criticalFlag = criticalFlag;
	}
	public String getScheduleFlag() {
		return scheduleFlag;
	}
	public void setScheduleFlag(String scheduleFlag) {
		this.scheduleFlag = scheduleFlag;
	}
	public String getF_name() {
		return f_name;
	}
	public void setF_name(String f_name) {
		this.f_name = f_name;
	}
	public String getL_name() {
		return l_name;
	}
	public void setL_name(String l_name) {
		this.l_name = l_name;
	}
	public String getPrefix() {
		return prefix;
	}
	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}
	public String getM_name() {
		return m_name;
	}
	public void setM_name(String m_name) {
		this.m_name = m_name;
	}
	public String getDoc_names() {
		return doc_names;
	}
	public void setDoc_names(String doc_names) {
		this.doc_names = doc_names;
	}
	public String getScheduled_procedure() {
		return scheduled_procedure;
	}
	public void setScheduled_procedure(String scheduled_procedure) {
		this.scheduled_procedure = scheduled_procedure;
	}
	public Integer getPatient_id() {
		return patient_id;
	}
	public void setPatient_id(Integer patient_id) {
		this.patient_id = patient_id;
	}
	public Integer getTreatment_id() {
		return treatment_id;
	}
	public void setTreatment_id(Integer treatment_id) {
		this.treatment_id = treatment_id;
	}
	public Integer getUnit_id() {
		return unit_id;
	}
	public void setUnit_id(Integer unit_id) {
		this.unit_id = unit_id;
	}
	public String getEnd_Time() {
		return End_Time;
	}
	public void setEnd_Time(String end_Time) {
		End_Time = end_Time;
	}
	
	
	

}
