package com.hms.administrator.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="hospital_departments")
	public class HospitalDepartmentDto 
	{
	@Id
	@GeneratedValue
	@Column(name = "idhospital_departments")
	private int departmentId;
	
	
	@Column(name = "department_name")
	private String departmentName;
	
	@Column(name = "departmentId")
	private int departmentsId;

	@Column(name = "departmentName")
	private String departmentsName="";
	
	
	@Column(name = "status")
	private String status="Y";
	
	@Column(name = "updated_by")
	private int updatedBy;
	
	
	

	@CreationTimestamp
	@Column(name = "created_date_time")
	private Date createdDate;
	
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = "deleted_by")
	private int deletedBy;	
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@Column(name = "unit_id")
	private Integer unitId=0;
	
	public Integer getUnitId() {
		return unitId;
	}
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	@Transient
	private List<HospitalDepartmentDto> listDepartments;
	
	@JsonGetter("liDep")
	public List<HospitalDepartmentDto> getListDepartments() {
		return listDepartments;
	}
	@JsonSetter("liDep")
	public void setListDepartments(
			List<HospitalDepartmentDto> listDepartments) {
		this.listDepartments = listDepartments;
	}
	
	public int getDepartmentsId() {
		return departmentsId;
	}
	public void setDepartmentsId(int departmentsId) {
		this.departmentsId = departmentsId;
	}
	public String getDepartmentsName() {
		return departmentsName;
	}
	public void setDepartmentsName(String departmentsName) {
		this.departmentsName = departmentsName;
	}
	
	
	public int getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}
	public int getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}
	
	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	public Integer getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
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

	public int getDeletedBy() {
		return deletedBy;
	}
	public void setDeletedBy(int deletedBy) {
		this.deletedBy = deletedBy;
	}
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	@Override
	public String toString() {
		return "HospitalDepartmentDto [departmentId=" + departmentId
				+ ", departmentName=" + departmentName + ", status=" + status
				+ ", updatedBy=" + updatedBy + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deletedBy=" + deletedBy
				+ ", deleted=" + deleted + ", listhospitaldeparment="
				+ listDepartments + ", createdBy=" + createdBy + "]";
	}
	
}
