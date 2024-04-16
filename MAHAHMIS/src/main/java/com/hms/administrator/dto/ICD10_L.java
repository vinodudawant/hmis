package com.hms.administrator.dto;

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

import com.hms.dto.ICD10_L1;
import com.hms.dto.ICD10_L2;
@Entity
@Table(name="icd10_l")
public class ICD10_L {

	@Id
	@GeneratedValue
	@Column(name = "idicd10_L")
	private int idicd10_L;
	
	@Column(name = "icd_code_L",columnDefinition = "TEXT")
	private String icd_code_L;
	
	@Column(name = "name_L",columnDefinition = "TEXT")
	private String name_L;
	
	@Column(name = "name_L1",columnDefinition = "TEXT")
	private String name_L1;
	
	@Column(name = "icd_flag")
	private int icd_Flag;
	
	@Column(name = "status")
	private String icdStatus;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted")
	private String deleted="N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;

	@Transient
	private List<ICD10_L> icd10_L_List;

	@Transient
	private List<ICD10_L1> icd10_L1_List;

	@Transient
	private List<ICD10_L2> icd10_L2_List;

	public int getIdicd10_L() {
		return idicd10_L;
	}

	public void setIdicd10_L(int idicd10_L) {
		this.idicd10_L = idicd10_L;
	}

	public String getIcd_code_L() {
		return icd_code_L;
	}

	public void setIcd_code_L(String icd_code_L) {
		this.icd_code_L = icd_code_L;
	}

	public String getName_L() {
		return name_L;
	}

	public void setName_L(String name_L) {
		this.name_L = name_L;
	}

	public String getName_L1() {
		return name_L1;
	}

	public void setName_L1(String name_L1) {
		this.name_L1 = name_L1;
	}

	public int getIcd_Flag() {
		return icd_Flag;
	}

	public void setIcd_Flag(int icd_Flag) {
		this.icd_Flag = icd_Flag;
	}

	public String getIcdStatus() {
		return icdStatus;
	}

	public void setIcdStatus(String icdStatus) {
		this.icdStatus = icdStatus;
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

	public List<ICD10_L> getIcd10_L_List() {
		return icd10_L_List;
	}

	public void setIcd10_L_List(List<ICD10_L> icd10_L_List) {
		this.icd10_L_List = icd10_L_List;
	}

	public List<ICD10_L1> getIcd10_L1_List() {
		return icd10_L1_List;
	}

	public void setIcd10_L1_List(List<ICD10_L1> icd10_L1_List) {
		this.icd10_L1_List = icd10_L1_List;
	}

	public List<ICD10_L2> getIcd10_L2_List() {
		return icd10_L2_List;
	}

	public void setIcd10_L2_List(List<ICD10_L2> icd10_L2_List) {
		this.icd10_L2_List = icd10_L2_List;
	}

	
	

	
}