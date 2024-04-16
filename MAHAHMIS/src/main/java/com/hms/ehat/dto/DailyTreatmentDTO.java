package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity 
@Table(name = "ehat_radiation_daily_treatment")
public class DailyTreatmentDTO implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "daily_treatment_id")
	private int dailyTreatmentId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "treatment_date")
	private String treatmentDate;
	
	@Column(name = "unit")
	private String unit;
	
	@Column(name = "tumor_dose")
	private String tumorDose;

	@Column(name = "tumour_size")
	private String tumourSize;
	
	@Column(name = "f1MU")
	private String f1MU;
	
	@Column(name = "f2MU")
	private String f2MU;
	
	@Column(name = "f3MU")
	private String f3MU;
	
	@Column(name = "f4MU")
	private String f4MU;
	
	@Column(name = "f5MU")
	private String f5MU;
	
	@Column(name = "f6MU")
	private String f6MU;
	
	@Column(name = "f7MU")
	private String f7MU;
	
	@Column(name = "f8MU")
	private String f8MU;
	
	@Column(name = "f9MU")
	private String f9MU;

	@Column(name = "f10MU")
	private String f10MU;
	
	@Column(name = "f1TD")
	private String f1TD;
	
	@Column(name = "f2TD")
	private String f2TD;
	
	@Column(name = "f3TD")
	private String f3TD;
	
	@Column(name = "f4TD")
	private String f4TD;
	
	@Column(name = "f5TD")
	private String f5TD;
	
	@Column(name = "f6TD")
	private String f6TD;
	
	@Column(name = "f7TD")
	private String f7TD;
	
	@Column(name = "f8TD")
	private String f8TD;
	
	@Column(name = "f9TD")
	private String f9TD;

	@Column(name = "f10TD")
	private String f10TD;
	
	@Column(name = "added_by",updatable=false)
	private int addedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "added_date",updatable=false)
	private Date addedDate;
	
	@Column(name = "updated_by")
	private int updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date")
	private Date updatedDate;
	
	@Column(name = "status")
	private String status ="Y";

	@Transient
	private List<DailyTreatmentDTO> treatmentList;

	public int getDailyTreatmentId() {
		return dailyTreatmentId;
	}

	public void setDailyTreatmentId(int dailyTreatmentId) {
		this.dailyTreatmentId = dailyTreatmentId;
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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTreatmentDate() {
		return treatmentDate;
	}

	public void setTreatmentDate(String treatmentDate) {
		this.treatmentDate = treatmentDate;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getTumorDose() {
		return tumorDose;
	}

	public void setTumorDose(String tumorDose) {
		this.tumorDose = tumorDose;
	}

	public String getTumourSize() {
		return tumourSize;
	}

	public void setTumourSize(String tumourSize) {
		this.tumourSize = tumourSize;
	}

	public String getF1MU() {
		return f1MU;
	}

	public void setF1MU(String f1mu) {
		f1MU = f1mu;
	}

	public String getF2MU() {
		return f2MU;
	}

	public void setF2MU(String f2mu) {
		f2MU = f2mu;
	}

	public String getF3MU() {
		return f3MU;
	}

	public void setF3MU(String f3mu) {
		f3MU = f3mu;
	}

	public String getF4MU() {
		return f4MU;
	}

	public void setF4MU(String f4mu) {
		f4MU = f4mu;
	}

	public String getF5MU() {
		return f5MU;
	}

	public void setF5MU(String f5mu) {
		f5MU = f5mu;
	}

	public String getF6MU() {
		return f6MU;
	}

	public void setF6MU(String f6mu) {
		f6MU = f6mu;
	}

	public String getF7MU() {
		return f7MU;
	}

	public void setF7MU(String f7mu) {
		f7MU = f7mu;
	}

	public String getF8MU() {
		return f8MU;
	}

	public void setF8MU(String f8mu) {
		f8MU = f8mu;
	}

	public String getF9MU() {
		return f9MU;
	}

	public void setF9MU(String f9mu) {
		f9MU = f9mu;
	}

	public String getF10MU() {
		return f10MU;
	}

	public void setF10MU(String f10mu) {
		f10MU = f10mu;
	}

	public String getF1TD() {
		return f1TD;
	}

	public void setF1TD(String f1td) {
		f1TD = f1td;
	}

	public String getF2TD() {
		return f2TD;
	}

	public void setF2TD(String f2td) {
		f2TD = f2td;
	}

	public String getF3TD() {
		return f3TD;
	}

	public void setF3TD(String f3td) {
		f3TD = f3td;
	}

	public String getF4TD() {
		return f4TD;
	}

	public void setF4TD(String f4td) {
		f4TD = f4td;
	}

	public String getF5TD() {
		return f5TD;
	}

	public void setF5TD(String f5td) {
		f5TD = f5td;
	}

	public String getF6TD() {
		return f6TD;
	}

	public void setF6TD(String f6td) {
		f6TD = f6td;
	}

	public String getF7TD() {
		return f7TD;
	}

	public void setF7TD(String f7td) {
		f7TD = f7td;
	}

	public String getF8TD() {
		return f8TD;
	}

	public void setF8TD(String f8td) {
		f8TD = f8td;
	}

	public String getF9TD() {
		return f9TD;
	}

	public void setF9TD(String f9td) {
		f9TD = f9td;
	}

	public String getF10TD() {
		return f10TD;
	}

	public void setF10TD(String f10td) {
		f10TD = f10td;
	}

	public int getAddedBy() {
		return addedBy;
	}

	public void setAddedBy(int addedBy) {
		this.addedBy = addedBy;
	}

	public Date getAddedDate() {
		return addedDate;
	}

	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<DailyTreatmentDTO> getTreatmentList() {
		return treatmentList;
	}

	public void setTreatmentList(List<DailyTreatmentDTO> treatmentList) {
		this.treatmentList = treatmentList;
	}
	
	
}
