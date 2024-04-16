package com.hms.ehat.dto;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

import java.io.Serializable;

@Entity 
@Table(name = "ehat_radiation_techno_checklist")
public class TechnologistCheckListDTO implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "techno_checklist_id")
	private int technoChecklistId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "techno_date")
	private String technoDate;
	
	@Column(name = "datewise_tech_sign")
	private String dateWiseTechSign;
	
	@Column(name = "datewise_to_sign")
	private String dateWiseTOSign;

	@Column(name = "weekly_tech_sign")
	private String weeklyTechSign;
	
	@Column(name = "weekly_to_sign")
	private String weeklyTOSign;
	
	@Column(name = "instructions")
	private String instructions;
	
	@Column(name = "daily_reviews")
	private String dailyReviews;
	
	@Column(name = "weekly_reviews")
	private String weeklyReviews;	 
	
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
	private List<TechnologistCheckListDTO> checkList;

	public int getTechnoChecklistId() {
		return technoChecklistId;
	}

	public void setTechnoChecklistId(int technoChecklistId) {
		this.technoChecklistId = technoChecklistId;
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

	public String getTechnoDate() {
		return technoDate;
	}

	public void setTechnoDate(String technoDate) {
		this.technoDate = technoDate;
	}

	public String getDateWiseTechSign() {
		return dateWiseTechSign;
	}

	public void setDateWiseTechSign(String dateWiseTechSign) {
		this.dateWiseTechSign = dateWiseTechSign;
	}

	public String getDateWiseTOSign() {
		return dateWiseTOSign;
	}

	public void setDateWiseTOSign(String dateWiseTOSign) {
		this.dateWiseTOSign = dateWiseTOSign;
	}

	public String getWeeklyTechSign() {
		return weeklyTechSign;
	}

	public void setWeeklyTechSign(String weeklyTechSign) {
		this.weeklyTechSign = weeklyTechSign;
	}

	public String getWeeklyTOSign() {
		return weeklyTOSign;
	}

	public void setWeeklyTOSign(String weeklyTOSign) {
		this.weeklyTOSign = weeklyTOSign;
	}

	public String getInstructions() {
		return instructions;
	}

	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}

	public String getDailyReviews() {
		return dailyReviews;
	}

	public void setDailyReviews(String dailyReviews) {
		this.dailyReviews = dailyReviews;
	}

	public String getWeeklyReviews() {
		return weeklyReviews;
	}

	public void setWeeklyReviews(String weeklyReviews) {
		this.weeklyReviews = weeklyReviews;
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

	public List<TechnologistCheckListDTO> getCheckList() {
		return checkList;
	}

	public void setCheckList(List<TechnologistCheckListDTO> checkList) {
		this.checkList = checkList;
	}
	
	
}
