package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "ehat_master_config")
public class MasterConfigDto implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "master_config_id")
	private Integer Id;

	@Column(name = "unit_id")
	private int unitId;
	
	@Column(name = "dept_id")
	private int deptId;
	
	@Column(name = "service_id")
	private int serviceId;
	
	@Column(name = "config_count")
	private int configCount=0;


	@Column(name = "created_by")
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by" )
	private Integer deletedBy;

	@Column(name = "deleted")
	private String deleted="N";

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;

	
	


	@Transient
	private List<UnitMasterDto> lstUnit;
	
	

	@Transient
	private List<DeptMasterDto> lstDept;
	

	@Transient
	private List<ServiceMasterDto> lstService;
	
	
	@Transient
	private List<MasterConfigDto> lstConfigMaster;
	

	public List<MasterConfigDto> getLstConfigMaster() {
		return lstConfigMaster;
	}


	public void setLstConfigMaster(List<MasterConfigDto> lstConfigMaster) {
		this.lstConfigMaster = lstConfigMaster;
	}

	
	
	
	
	public List<DeptMasterDto> getLstDept() {
		return lstDept;
	}


	public void setLstDept(List<DeptMasterDto> lstDept) {
		this.lstDept = lstDept;
	}


	public List<ServiceMasterDto> getLstService() {
		return lstService;
	}


	public void setLstService(List<ServiceMasterDto> lstService) {
		this.lstService = lstService;
	}


	public Integer getId() {
		return Id;
	}


	public void setId(Integer id) {
		Id = id;
	}



	public int getUnitId() {
		return unitId;
	}



	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}



	public int getDeptId() {
		return deptId;
	}



	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}



	public int getServiceId() {
		return serviceId;
	}



	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}



	public int getConfigCount() {
		return configCount;
	}



	public void setConfigCount(int configCount) {
		this.configCount = configCount;
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



	public List<UnitMasterDto> getLstUnit() {
		return lstUnit;
	}



	public void setLstUnit(List<UnitMasterDto> lstUnit) {
		this.lstUnit = lstUnit;
	}
	
	 

}
