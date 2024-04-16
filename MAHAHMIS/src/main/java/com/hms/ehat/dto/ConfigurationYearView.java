package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity
@Table(name="ehat_config_year_view")
@Immutable
public class ConfigurationYearView {
	
	@Id
	@Column(name = "id_configurations")
	private int idConfigurations;
	

	
	@Column(name = "category_name")
	private String categoryName; 
	
	

	@Column(name = "charges")
	private double charges;
	
	@Column(name = "service_id")
	private int serviceId;
	
	
	
	@Column(name = "number_year")
	private double number;
	
	
	@Column(name = "operator_year")
	private String operator; 
	
	@Column(name = "distribute")
	private double distribute;
	
	
	@Column(name = "increaseordecrease")
	private String increaseordecrease; 
	
	@Temporal(TemporalType.DATE)
	@Column(name = "fromDate")
	private Date fromDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "toDate")
	private Date toDate;
	
	@Column(name = " hall_charges",columnDefinition="int default 0")
	private double hallCharges;
	
	@Column(name = " medical_team_charges",columnDefinition="int default 0")
	private double medicalCharges;
	
	
	@Column(name = " department_id",columnDefinition="int default 0")
	private Integer departMentID;
	
	@Column(name = " count_date",columnDefinition="int default 0")
	private int countDate;
	
	@Column(name = "deleted")
	private String deleted;
	
	@Transient
    private List<ConfigurationYearView> lstyearview;

	public int getIdConfigurations() {
		return idConfigurations;
	}

	public void setIdConfigurations(int idConfigurations) {
		this.idConfigurations = idConfigurations;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public double getCharges() {
		return charges;
	}

	public void setCharges(double charges) {
		this.charges = charges;
	}

	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}

	public double getNumber() {
		return number;
	}

	public void setNumber(double number) {
		this.number = number;
	}

	public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	public double getDistribute() {
		return distribute;
	}

	public void setDistribute(double distribute) {
		this.distribute = distribute;
	}

	public String getIncreaseordecrease() {
		return increaseordecrease;
	}

	public void setIncreaseordecrease(String increaseordecrease) {
		this.increaseordecrease = increaseordecrease;
	}

	public Date getFromDate() {
		return fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	public Date getToDate() {
		return toDate;
	}

	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}

	public double getHallCharges() {
		return hallCharges;
	}

	public void setHallCharges(double hallCharges) {
		this.hallCharges = hallCharges;
	}

	public double getMedicalCharges() {
		return medicalCharges;
	}

	public void setMedicalCharges(double medicalCharges) {
		this.medicalCharges = medicalCharges;
	}

	public Integer getDepartMentID() {
		return departMentID;
	}

	public void setDepartMentID(Integer departMentID) {
		this.departMentID = departMentID;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public List<ConfigurationYearView> getLstyearview() {
		return lstyearview;
	}

	public void setLstyearview(List<ConfigurationYearView> lstyearview) {
		this.lstyearview = lstyearview;
	}

	public int getCountDate() {
		return countDate;
	}

	public void setCountDate(int countDate) {
		this.countDate = countDate;
	}
	
	

}
