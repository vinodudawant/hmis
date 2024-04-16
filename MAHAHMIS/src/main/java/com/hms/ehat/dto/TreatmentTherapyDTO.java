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
@Table(name = "ehat_radiation_treatment_therapy")
public class TreatmentTherapyDTO implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "treatment_therapy_id")
	private int treatmentTherapyId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "therapy_date")
	private String therapyDate;
	
	@Column(name = "energy")
	private String energy;
	
	@Column(name = "skin_size")
	private String skinSize;

	@Column(name = "tumour_size")
	private String tumourSize;
	
	@Column(name = "depth")
	private String depth;
	
	@Column(name = "wedge")
	private String wedge;
	
	@Column(name = "gantry")
	private String gantry;
	
	@Column(name = "coll_angle")
	private String collAngle;
	
	@Column(name = "couch_angle")
	private String couchAngle;	 
	
	@Column(name = "dose_fraction")
	private String doseFraction;
	
	@Column(name = "treatment_time")
	private String treatmentTime;
	
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
	private List<TreatmentTherapyDTO> therapyList;

	public int getTreatmentTherapyId() {
		return treatmentTherapyId;
	}

	public void setTreatmentTherapyId(int treatmentTherapyId) {
		this.treatmentTherapyId = treatmentTherapyId;
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

	public String getTherapyDate() {
		return therapyDate;
	}

	public void setTherapyDate(String therapyDate) {
		this.therapyDate = therapyDate;
	}

	public String getEnergy() {
		return energy;
	}

	public void setEnergy(String energy) {
		this.energy = energy;
	}

	public String getSkinSize() {
		return skinSize;
	}

	public void setSkinSize(String skinSize) {
		this.skinSize = skinSize;
	}

	public String getTumourSize() {
		return tumourSize;
	}

	public void setTumourSize(String tumourSize) {
		this.tumourSize = tumourSize;
	}

	public String getDepth() {
		return depth;
	}

	public void setDepth(String depth) {
		this.depth = depth;
	}

	public String getWedge() {
		return wedge;
	}

	public void setWedge(String wedge) {
		this.wedge = wedge;
	}

	public String getGantry() {
		return gantry;
	}

	public void setGantry(String gantry) {
		this.gantry = gantry;
	}

	public String getCollAngle() {
		return collAngle;
	}

	public void setCollAngle(String collAngle) {
		this.collAngle = collAngle;
	}

	public String getCouchAngle() {
		return couchAngle;
	}

	public void setCouchAngle(String couchAngle) {
		this.couchAngle = couchAngle;
	}

	public String getDoseFraction() {
		return doseFraction;
	}

	public void setDoseFraction(String doseFraction) {
		this.doseFraction = doseFraction;
	}

	public String getTreatmentTime() {
		return treatmentTime;
	}

	public void setTreatmentTime(String treatmentTime) {
		this.treatmentTime = treatmentTime;
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

	public List<TreatmentTherapyDTO> getTherapyList() {
		return therapyList;
	}

	public void setTherapyList(List<TreatmentTherapyDTO> therapyList) {
		this.therapyList = therapyList;
	}
	
	
}
