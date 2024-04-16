package com.hms.administrator.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

@SuppressWarnings("deprecation")
@Entity
@Table(name="city")
public class AdminCityDTO implements Serializable {
	
	@Id
	@GeneratedValue
	@Column(name = "idcity")
	private int city_ID;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_date", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date")
	private Date updatedDate;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "status")
	private String status="Y";
	
	@Column(name="taluka_id")
	private int taluka_ID;
	
	@Column(name="district_id")
    private int district_ID;
	
	@Column(name = "state_id")
	private int state_ID;

	@Column(name = "city_name")
	private String cityName;
	
	@Transient
	private List<AdminCityDTO> cityList;

	@Transient
	private String stateName;
	
	@Transient
	private String districtName;
	
	@Transient
	private String talukaName;
	
	@JsonProperty("city_id")
	public int getCity_ID() {
		return city_ID;
	}
	@JsonProperty("city_id")
	public void setCity_ID(int city_ID) {
		this.city_ID = city_ID;
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

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getTaluka_ID() {
		return taluka_ID;
	}

	public void setTaluka_ID(int taluka_ID) {
		this.taluka_ID = taluka_ID;
	}

	public int getDistrict_ID() {
		return district_ID;
	}

	public void setDistrict_ID(int district_ID) {
		this.district_ID = district_ID;
	}

	public int getState_ID() {
		return state_ID;
	}

	public void setState_ID(int state_ID) {
		this.state_ID = state_ID;
	}

	@JsonProperty("city_name")
	public String getCityName() {
		return cityName;
	}

	@JsonProperty("city_name")
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	@JsonProperty("cityList")
	public List<AdminCityDTO> getCityList() {
		return cityList;
	}

	@JsonProperty("cityList")
	public void setCityList(List<AdminCityDTO> cityList) {
		this.cityList = cityList;
	}
	public String getStateName() {
		return stateName;
	}
	public void setStateName(String stateName) {
		this.stateName = stateName;
	}
	public String getDistrictName() {
		return districtName;
	}
	public void setDistrictName(String districtName) {
		this.districtName = districtName;
	}
	public String getTalukaName() {
		return talukaName;
	}
	public void setTalukaName(String talukaName) {
		this.talukaName = talukaName;
	}
	
	
	
	


}
