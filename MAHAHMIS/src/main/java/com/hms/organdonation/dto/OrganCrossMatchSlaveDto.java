package com.hms.organdonation.dto;

import java.io.Serializable;
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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

@SuppressWarnings("deprecation")
@Component
@Entity
@Table(name = "organ_cross_match_slave")
public class OrganCrossMatchSlaveDto implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer crossMatchSlaveId;
	
	@Column(name = "lvmpho_cross_test",columnDefinition = "varchar(50)")
	private String lvmphoTest;
	
	@Column(name = "lvmpho_cross_test_result",columnDefinition = "varchar(1)")
	private String lvmphoTestResult;
	
	@Column(name = "lvmpho_cross_test_date",columnDefinition = "varchar(15)")
	private String lvmphoTestDate;
	
	@Column(name = "lvmpho_cross_test_file",columnDefinition = "varchar(50)")
	private String lvmphoTestFile;
	
	@Column(name = "blo_type_comp",columnDefinition = "varchar(50)")
	private String bloTypeComp;
	
	@Column(name = "blo_type_comp_result",columnDefinition = "varchar(1)")
	private String bloTypeCompResult;
	
	@Column(name = "blo_type_comp_date",columnDefinition = "varchar(15)")
	private String bloTypeCompDate;
	
	@Column(name = "blo_type_comp_file",columnDefinition = "varchar(50)")
	private String bloTypeCompFile;
	
	@Column(name = "hum_leu_anti_type",columnDefinition = "varchar(50)")
	private String humLeuAntiType;
	
	@Column(name = "hum_leu_anti_type_result",columnDefinition = "varchar(1)")
	private String humLeuAntiTypeResult;
	
	@Column(name = "hum_leu_anti_type_date",columnDefinition = "varchar(15)")
	private String humLeuAntiTypeDate;
	
	@Column(name = "hum_leu_anti_type_file",columnDefinition = "varchar(50)")
	private String humLeuAntiTypeFile;
	
	@Column(name = "hla_anti",columnDefinition = "varchar(50)")
	private String hlaAnti;
	
	@Column(name = "hla_anti_result",columnDefinition = "varchar(1)")
	private String hlaAntiResult;
	
	@Column(name = "hla_anti_date",columnDefinition = "varchar(15)")
	private String hlaAntiDate;
	
	@Column(name = "hla_anti_file",columnDefinition = "varchar(50)")
	private String hlaAntiFile;
	
	@Column(name = "per_rea_anti",columnDefinition = "varchar(50)")
	private String perReaAnti;
	
	@Column(name = "per_rea_anti_result",columnDefinition = "varchar(1)")
	private String perReaAntiResult;
	
	@Column(name = "per_rea_anti_date",columnDefinition = "varchar(15)")
	private String perReaAntiDate;
	
	@Column(name = "per_rea_anti_file",columnDefinition = "varchar(50)")
	private String perReaAntiFile;
	
	@Column(name = "serum_test",columnDefinition = "varchar(50)")
	private String serumTest;
	
	@Column(name = "serum_result",columnDefinition = "varchar(1)")
	private String serumResult;
	
	@Column(name = "serum_date",columnDefinition = "varchar(15)")
	private String serumDate;

	@Column(name = "serum_file",columnDefinition = "varchar(50)")
	private String serumFile;

	@Column(name = "deleted", columnDefinition = "varchar(1) default 'N'")
	private String deleted = "N";

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

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;

	@Transient
	private List<OrganCrossMatchSlaveDto> listOrganCrossMatchSlaveDto;

	public Integer getCrossMatchSlaveId() {
		return crossMatchSlaveId;
	}

	public void setCrossMatchSlaveId(Integer crossMatchSlaveId) {
		this.crossMatchSlaveId = crossMatchSlaveId;
	}

	public String getLvmphoTest() {
		return lvmphoTest;
	}

	public void setLvmphoTest(String lvmphoTest) {
		this.lvmphoTest = lvmphoTest;
	}

	public String getLvmphoTestResult() {
		return lvmphoTestResult;
	}

	public void setLvmphoTestResult(String lvmphoTestResult) {
		this.lvmphoTestResult = lvmphoTestResult;
	}

	public String getLvmphoTestDate() {
		return lvmphoTestDate;
	}

	public void setLvmphoTestDate(String lvmphoTestDate) {
		this.lvmphoTestDate = lvmphoTestDate;
	}

	public String getLvmphoTestFile() {
		return lvmphoTestFile;
	}

	public void setLvmphoTestFile(String lvmphoTestFile) {
		this.lvmphoTestFile = lvmphoTestFile;
	}

	public String getBloTypeComp() {
		return bloTypeComp;
	}

	public void setBloTypeComp(String bloTypeComp) {
		this.bloTypeComp = bloTypeComp;
	}

	public String getBloTypeCompResult() {
		return bloTypeCompResult;
	}

	public void setBloTypeCompResult(String bloTypeCompResult) {
		this.bloTypeCompResult = bloTypeCompResult;
	}

	public String getBloTypeCompDate() {
		return bloTypeCompDate;
	}

	public void setBloTypeCompDate(String bloTypeCompDate) {
		this.bloTypeCompDate = bloTypeCompDate;
	}

	public String getBloTypeCompFile() {
		return bloTypeCompFile;
	}

	public void setBloTypeCompFile(String bloTypeCompFile) {
		this.bloTypeCompFile = bloTypeCompFile;
	}

	public String getHumLeuAntiType() {
		return humLeuAntiType;
	}

	public void setHumLeuAntiType(String humLeuAntiType) {
		this.humLeuAntiType = humLeuAntiType;
	}

	public String getHumLeuAntiTypeResult() {
		return humLeuAntiTypeResult;
	}

	public void setHumLeuAntiTypeResult(String humLeuAntiTypeResult) {
		this.humLeuAntiTypeResult = humLeuAntiTypeResult;
	}

	public String getHumLeuAntiTypeDate() {
		return humLeuAntiTypeDate;
	}

	public void setHumLeuAntiTypeDate(String humLeuAntiTypeDate) {
		this.humLeuAntiTypeDate = humLeuAntiTypeDate;
	}

	public String getHumLeuAntiTypeFile() {
		return humLeuAntiTypeFile;
	}

	public void setHumLeuAntiTypeFile(String humLeuAntiTypeFile) {
		this.humLeuAntiTypeFile = humLeuAntiTypeFile;
	}

	public String getHlaAnti() {
		return hlaAnti;
	}

	public void setHlaAnti(String hlaAnti) {
		this.hlaAnti = hlaAnti;
	}

	public String getHlaAntiResult() {
		return hlaAntiResult;
	}

	public void setHlaAntiResult(String hlaAntiResult) {
		this.hlaAntiResult = hlaAntiResult;
	}

	public String getHlaAntiDate() {
		return hlaAntiDate;
	}

	public void setHlaAntiDate(String hlaAntiDate) {
		this.hlaAntiDate = hlaAntiDate;
	}

	public String getHlaAntiFile() {
		return hlaAntiFile;
	}

	public void setHlaAntiFile(String hlaAntiFile) {
		this.hlaAntiFile = hlaAntiFile;
	}

	public String getPerReaAnti() {
		return perReaAnti;
	}

	public void setPerReaAnti(String perReaAnti) {
		this.perReaAnti = perReaAnti;
	}

	public String getPerReaAntiResult() {
		return perReaAntiResult;
	}

	public void setPerReaAntiResult(String perReaAntiResult) {
		this.perReaAntiResult = perReaAntiResult;
	}

	public String getPerReaAntiDate() {
		return perReaAntiDate;
	}

	public void setPerReaAntiDate(String perReaAntiDate) {
		this.perReaAntiDate = perReaAntiDate;
	}

	public String getPerReaAntiFile() {
		return perReaAntiFile;
	}

	public void setPerReaAntiFile(String perReaAntiFile) {
		this.perReaAntiFile = perReaAntiFile;
	}

	public String getSerumFile() {
		return serumFile;
	}

	public void setSerumFile(String serumFile) {
		this.serumFile = serumFile;
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

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
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

	public List<OrganCrossMatchSlaveDto> getListOrganCrossMatchSlaveDto() {
		return listOrganCrossMatchSlaveDto;
	}

	public void setListOrganCrossMatchSlaveDto(
			List<OrganCrossMatchSlaveDto> listOrganCrossMatchSlaveDto) {
		this.listOrganCrossMatchSlaveDto = listOrganCrossMatchSlaveDto;
	}
	

}
