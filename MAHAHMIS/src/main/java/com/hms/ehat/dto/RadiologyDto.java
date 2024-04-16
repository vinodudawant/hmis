package com.hms.ehat.dto;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Immutable;
@Immutable
@Entity
@Table(name = "radiology_file_master")
public class RadiologyDto {
	

	@Id
	@GeneratedValue
	@Column(name = "idradiology_file_master")
	private int idradiology_file_master;

	@Column(name = "status")
	private String status="Y";

	
	@Column(name = "treatment_id")
	private int treatment_id;

	@Column(name = "radio_total")
	private float radio_total;

	@Column(name = "idbill" )
	private int idbill;

	public int getIdradiology_file_master() {
		return idradiology_file_master;
	}

	public void setIdradiology_file_master(int idradiology_file_master) {
		this.idradiology_file_master = idradiology_file_master;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getTreatment_id() {
		return treatment_id;
	}

	public void setTreatment_id(int treatment_id) {
		this.treatment_id = treatment_id;
	}

	public float getRadio_total() {
		return radio_total;
	}

	public void setRadio_total(float radio_total) {
		this.radio_total = radio_total;
	}

	public int getIdbill() {
		return idbill;
	}

	public void setIdbill(int idbill) {
		this.idbill = idbill;
	}
	}
