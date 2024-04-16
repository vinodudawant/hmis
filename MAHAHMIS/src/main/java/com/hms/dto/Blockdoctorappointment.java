package com.hms.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="blockdoctorappointment")
public class Blockdoctorappointment {
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="idblockDocApp")
	private Integer idblockDocApp;
	@Column(name="date")
    private String date;
	@Column(name="doctor_id")
	private Integer doctor_id;
	public Integer getIdblockDocApp() {
		return idblockDocApp;
	}
	public void setIdblockDocApp(Integer idblockDocApp) {
		this.idblockDocApp = idblockDocApp;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public Integer getDoctor_id() {
		return doctor_id;
	}
	public void setDoctor_id(Integer doctor_id) {
		this.doctor_id = doctor_id;
	}
	
	
	
	
}
