package com.hms.dto;

import java.sql.Time;
import java.util.List;

public class TimingSchedule {

	private int timing_schedule_id;
	private Time appointment_startTime;
	private int appointment_treatment_duration;
	private Time appointment_endTime;
	private int idhospital;

	private List<TimingSchedule> listTimingSchedule;

	public List<TimingSchedule> getListTimingSchedule() {
		return listTimingSchedule;
	}

	public void setListTimingSchedule(List<TimingSchedule> listTimingSchedule) {
		this.listTimingSchedule = listTimingSchedule;
	}

	public int getIdhospital() {
		return idhospital;
	}

	public void setIdhospital(int idhospital) {
		this.idhospital = idhospital;
	}

	public int getTiming_schedule_id() {
		return timing_schedule_id;
	}

	public void setTiming_schedule_id(int timing_schedule_id) {
		this.timing_schedule_id = timing_schedule_id;
	}

	public Time getAppointment_startTime() {
		return appointment_startTime;
	}

	public void setAppointment_startTime(Time appointment_startTime) {
		this.appointment_startTime = appointment_startTime;
	}

	public int getAppointment_treatment_duration() {
		return appointment_treatment_duration;
	}

	public void setAppointment_treatment_duration(
			int appointment_treatment_duration) {
		this.appointment_treatment_duration = appointment_treatment_duration;
	}

	public Time getAppointment_endTime() {
		return appointment_endTime;
	}

	public void setAppointment_endTime(Time appointment_endTime) {
		this.appointment_endTime = appointment_endTime;
	}

}
