/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all pojos.
	 ******************************************************************************/

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
@Table(name = "ehat_unit_master")
public class UnitMasterDto implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "unit_id")
	private Integer unitId;

	@Column(name = "unit_name")
	private String unitName;
	
	@Column(name = "unit_code")
	private String unitCode;
	
	@Column(name = "state_id")
	private Integer stateId;
	@Column(name = "state_name")
	private String stateName;
	
	@Column(name = "district_id")
	private Integer districtId;
	@Column(name = "district_name")
	private String districtName;
	
	@Column(name = "type_id")
	private Integer typeId;
	@Column(name = "type_name")
	private String typeName;
	
	@Column(name = "hospital_id")
	private Integer hospitalId;
	@Column(name = "hospital_name")
	private String hospitalName;
	
	@Column(name = "year_id")
	private Integer yearId;
	@Column(name = "year")
	private String year;
	
	

	

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	

	@Column(name = "deleted")
	private String deleted="N";

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	@Column(name = "active_flag",columnDefinition="varchar(2) default 'N'")
	private String activeFlag="N";

	@Transient
	private List<UnitMasterDto> lstUnit;
	
	@Transient
	private List<DeptMasterDto> lstDepts;
	
	@Transient
	private List<ServiceMasterDto> listService;

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public String getUnitCode() {
		return unitCode;
	}

	public void setUnitCode(String unitCode) {
		this.unitCode = unitCode;
	}

	public Integer getStateId() {
		return stateId;
	}

	public void setStateId(Integer stateId) {
		this.stateId = stateId;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	public Integer getDistrictId() {
		return districtId;
	}

	public void setDistrictId(Integer districtId) {
		this.districtId = districtId;
	}

	public String getDistrictName() {
		return districtName;
	}

	public void setDistrictName(String districtName) {
		this.districtName = districtName;
	}

	public Integer getTypeId() {
		return typeId;
	}

	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public Integer getHospitalId() {
		return hospitalId;
	}

	public void setHospitalId(Integer hospitalId) {
		this.hospitalId = hospitalId;
	}

	public String getHospitalName() {
		return hospitalName;
	}

	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}

	public Integer getYearId() {
		return yearId;
	}

	public void setYearId(Integer yearId) {
		this.yearId = yearId;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public String getActiveFlag() {
		return activeFlag;
	}

	public void setActiveFlag(String activeFlag) {
		this.activeFlag = activeFlag;
	}

	public List<UnitMasterDto> getLstUnit() {
		return lstUnit;
	}

	public void setLstUnit(List<UnitMasterDto> lstUnit) {
		this.lstUnit = lstUnit;
	}

	public List<DeptMasterDto> getLstDepts() {
		return lstDepts;
	}

	public void setLstDepts(List<DeptMasterDto> lstDepts) {
		this.lstDepts = lstDepts;
	}

	public List<ServiceMasterDto> getListService() {
		return listService;
	}

	public void setListService(List<ServiceMasterDto> listService) {
		this.listService = listService;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	

	

	

}
