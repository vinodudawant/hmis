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
@Table(name = "dept_master")
public class DeptMasterDto implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "dept_id")
	private Integer deptId;

	@Column(name = "dept_name")
	private String deptName;
	
	@Column(name = "dept_code")
	private String deptCode;


	public String getDeptCode() {
		return deptCode;
	}

	public void setDeptCode(String deptCode) {
		this.deptCode = deptCode;
	}

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

	@Column(name = "is_commercial")
	private String iscommercial;
	
	
	@Column(name = "isclinical")
	private String isclinical="Y";

	
	public String getIsclinical() {
		return isclinical;
	}

	public void setIsclinical(String isclinical) {
		this.isclinical = isclinical;
	}

	@Transient
	private List<DeptMasterDto> lstDepts;
	

	@Transient
	private List<ServiceMasterDto> listService;
	
	
	public List<ServiceMasterDto> getListService() {
		return listService;
	}

	public void setListService(List<ServiceMasterDto> listService) {
		this.listService = listService;
	}

	public Integer getDeptId() {
		return deptId;
	}

	public List<DeptMasterDto> getLstDepts() {
		return lstDepts;
	}

	public void setLstDepts(List<DeptMasterDto> lstDepts) {
		this.lstDepts = lstDepts;
	}

	public void setDeptId(Integer deptId) {
		this.deptId = deptId;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
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
	public String getIscommercial() {
		return iscommercial;
	}

	public void setIscommercial(String iscommercial) {
		this.iscommercial = iscommercial;
	}

}
