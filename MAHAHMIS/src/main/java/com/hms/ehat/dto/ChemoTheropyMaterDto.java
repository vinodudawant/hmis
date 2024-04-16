package com.hms.ehat.dto;

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
@Entity
@Table(name="ehat_chemotherapy_master")
public class ChemoTheropyMaterDto implements Serializable{

	/**
	 * @author Vikas Godse-Chempotherapy Master
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "chemotheropy_id")
	private Integer chemotheropyId;
	
	@Column(name = "chemo_protocol_name")
	private String chemoTheropyName;
	
	@Column(name = "chemo_indication")
	private String indication;
	
	@Column(name = "weight")
	private String weight;
	
	@Column(name = "height")
	private String height;
	
	@Column(name = "chemo_bsa")
	private String bsa;
	
	@Column(name = "blood_orders")
	private String bloodOrders;
	
	@Column(name = "chemo_allergies")
	private String allergies;
	
	@Column(name = "chemo_history")
	private String history;
	
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
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = "status")
	private String status;
	
	@Transient
	private List<ChemoTheropyMaterDto> lstChemoTheropy;
	
	@Transient
    private List<ChemoTheropyMaterDto> lstChemoProto;

	public Integer getChemotheropyId() {
		return chemotheropyId;
	}

	public void setChemotheropyId(Integer chemotheropyId) {
		this.chemotheropyId = chemotheropyId;
	}

	public String getChemoTheropyName() {
		return chemoTheropyName;
	}

	public void setChemoTheropyName(String chemoTheropyName) {
		this.chemoTheropyName = chemoTheropyName;
	}

	public String getIndication() {
		return indication;
	}

	public void setIndication(String indication) {
		this.indication = indication;
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

	public String getBsa() {
		return bsa;
	}

	public void setBsa(String bsa) {
		this.bsa = bsa;
	}

	public String getBloodOrders() {
		return bloodOrders;
	}

	public void setBloodOrders(String bloodOrders) {
		this.bloodOrders = bloodOrders;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<ChemoTheropyMaterDto> getLstChemoTheropy() {
		return lstChemoTheropy;
	}

	public void setLstChemoTheropy(List<ChemoTheropyMaterDto> lstChemoTheropy) {
		this.lstChemoTheropy = lstChemoTheropy;
	}

	public List<ChemoTheropyMaterDto> getLstChemoProto() {
		return lstChemoProto;
	}

	public void setLstChemoProto(List<ChemoTheropyMaterDto> lstChemoProto) {
		this.lstChemoProto = lstChemoProto;
	}
	
	
}
