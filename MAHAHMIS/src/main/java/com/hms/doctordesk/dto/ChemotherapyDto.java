package com.hms.doctordesk.dto;

import java.io.Serializable;
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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@SuppressWarnings("deprecation")
@Entity
@Table(name="chemotherapy_master")
public class ChemotherapyDto implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "idchemotherapy")
	private int chemotherapyId;
	
	@Column(name = "chemotherapy_name")
	private String chemotherapyName;
	
	@Column(name = "chemo_indication")
	private String indication;
	
	@Column(name = "chemo_frequency")
	private String frequency;
	
	@Column(name = "chemo_no_of_cycle")
	private String noOfCycle;
	
	@Column(name = "chemo_dose")
	private String dose;
	
	@Column(name = "chemo_investigation")
	private String investigation;
	
	@Column(name = "chemo_drug_orders")
	private String drugOrders;
	
	@Column(name = "chemo_post_medication")
	private String postMedication;
	
	@Column(name = "chemo_post_advice")
	private String advice;
	
	@Column(name = "weight")
	private String weight;
	
	@Column(name = "height")
	private String height;
	
	@Column(name = "BSA")
	private String bsa;
	
	@Column(name = "blood_orders")
	private String blood_orders;
	
	@Column(name = "allergies")
	private String allergies;
	
	@Column(name = "history")
	private String history;
	
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@CreationTimestamp
	@Column(name = "created_date", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Transient
	private List<ChemotherapyDto> lstchemotherapyMaster;

	public int getChemotherapyId() {
		return chemotherapyId;
	}

	public void setChemotherapyId(int chemotherapyId) {
		this.chemotherapyId = chemotherapyId;
	}

	public String getChemotherapyName() {
		return chemotherapyName;
	}

	public void setChemotherapyName(String chemotherapyName) {
		this.chemotherapyName = chemotherapyName;
	}

	public String getIndication() {
		return indication;
	}

	public void setIndication(String indication) {
		this.indication = indication;
	}

	public String getFrequency() {
		return frequency;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}

	public String getNoOfCycle() {
		return noOfCycle;
	}

	public void setNoOfCycle(String noOfCycle) {
		this.noOfCycle = noOfCycle;
	}

	public String getDose() {
		return dose;
	}

	public void setDose(String dose) {
		this.dose = dose;
	}

	public String getInvestigation() {
		return investigation;
	}

	public void setInvestigation(String investigation) {
		this.investigation = investigation;
	}

	public String getDrugOrders() {
		return drugOrders;
	}

	public void setDrugOrders(String drugOrders) {
		this.drugOrders = drugOrders;
	}

	public String getPostMedication() {
		return postMedication;
	}

	public void setPostMedication(String postMedication) {
		this.postMedication = postMedication;
	}

	public String getAdvice() {
		return advice;
	}

	public void setAdvice(String advice) {
		this.advice = advice;
	}
	
	

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	

	public String getBlood_orders() {
		return blood_orders;
	}

	public void setBlood_orders(String blood_orders) {
		this.blood_orders = blood_orders;
	}

	public String getAllergies() {
		return allergies;
	}

	public void setAllergies(String allergies) {
		this.allergies = allergies;
	}

	public String getHistory() {
		return history;
	}

	public void setHistory(String history) {
		this.history = history;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public List<ChemotherapyDto> getLstchemotherapyMaster() {
		return lstchemotherapyMaster;
	}

	public void setLstchemotherapyMaster(List<ChemotherapyDto> lstchemotherapyMaster) {
		this.lstchemotherapyMaster = lstchemotherapyMaster;
	}

	public String getBsa() {
		return bsa;
	}

	public void setBsa(String bsa) {
		this.bsa = bsa;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}


}
