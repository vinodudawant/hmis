package com.hms.administrator.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.map.annotate.JsonDeserialize;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

@Entity
@Table(name = "business_master_address_info_slave")
@JsonDeserialize(as = BusinessCustMasterAddressInfoDto.class)
@Component
public class BusinessCustMasterAddressInfoDto {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name =  "id")
	private Integer id;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "street")
	private String street;
	
	@Column(name = "pin")
	private String pin;
	
	@Column(name = "country")
	private String country;
	
	@Column(name = "state")
	private String state;
	
	@Column(name = "city")
	private String city;
	
	@Column(name = "district_name")
	private String districtName;
	
	@Column(name = "taluka_name")
	private String talukaName;
	
	@Column(name = "country_id",columnDefinition="int(11) default 0")
	private Integer countryId=0;	
	
	@Column(name = "state_id",columnDefinition="int(11) default 0")
	private Integer stateId=0;	
	
	@Column(name = "city_id",columnDefinition="int(11) default 0")
	private Integer cityId=0;
		
	@Column(name = "district_id",columnDefinition="int(11) default 0")
	private Integer districtId=0;	
	
	@Column(name = "taluka_id",columnDefinition="int(11) default 0")
	private Integer talukaId=0;
	
	@Column(name = "unit_id",columnDefinition="int(11) default 0")
	private Integer unitId=0;
	
	@Column(name = "deleted", columnDefinition = "varchar(2) default 'N'")
	private String deleted = "N";
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;

	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;

	@Transient
	private List<BusinessCustMasterAddressInfoDto> businessMasterAddressInfoDto;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getPin() {
		return pin;
	}

	public void setPin(String pin) {
		this.pin = pin;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public Integer getCountryId() {
		return countryId;
	}

	public void setCountryId(Integer countryId) {
		this.countryId = countryId;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Integer getStateId() {
		return stateId;
	}

	public void setStateId(Integer stateId) {
		this.stateId = stateId;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Integer getCityId() {
		return cityId;
	}

	public void setCityId(Integer cityId) {
		this.cityId = cityId;
	}

	public String getDistrictName() {
		return districtName;
	}

	public void setDistrictName(String districtName) {
		this.districtName = districtName;
	}

	public Integer getDistrictId() {
		return districtId;
	}

	public void setDistrictId(Integer districtId) {
		this.districtId = districtId;
	}

	public String getTalukaName() {
		return talukaName;
	}

	public void setTalukaName(String talukaName) {
		this.talukaName = talukaName;
	}

	public Integer getTalukaId() {
		return talukaId;
	}

	public void setTalukaId(Integer talukaId) {
		this.talukaId = talukaId;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public List<BusinessCustMasterAddressInfoDto> getBusinessMasterAddressInfoDto() {
		return businessMasterAddressInfoDto;
	}

	public void setBusinessMasterAddressInfoDto(List<BusinessCustMasterAddressInfoDto> businessMasterAddressInfoDto) {
		this.businessMasterAddressInfoDto = businessMasterAddressInfoDto;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	

	@Override
	public String toString() {
		return "BusinessCustMasterAddressInfoDto [id=" + id + ", address="
				+ address + ", street=" + street + ", pin="+ pin + ", country=" + country + ", countryId=" + countryId
				+ ", state=" + state + ", stateId=" + stateId + ", city="
				+ city + ", cityId=" + cityId + ", districtName="
				+ districtName + ", districtId=" + districtId + ", talukaName="
				+ talukaName + ", talukaId=" + talukaId + ", createdBy="
				+ createdBy + ", updatedBy=" + updatedBy + ", createdDate="
				+ createdDate + ", updatedDate=" + updatedDate + ", deleted="
				+ deleted + ", deletedBy=" + deletedBy + ", deletedDate="
				+ deletedDate + ", unitId=" + unitId
				+ ", businessMasterAddressInfoDto=" + businessMasterAddressInfoDto
				+ "]";
	}
	
}
