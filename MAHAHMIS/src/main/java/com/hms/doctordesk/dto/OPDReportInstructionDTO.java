package com.hms.doctordesk.dto;

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



@Entity
@Table(name = "reportinstruction")
public class OPDReportInstructionDTO {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "reportInstructionID")
	private int reportInstructionID;
	
	@Column(name = "reportInstruction",columnDefinition="varchar(500) default ''")
	private String reportInstruction;

	@Column(name = "reportInstructionHindi",columnDefinition="varchar(500) default ''")
	private String reportInstructionHindi;
	
	@Column(name = "reportInstructionMarathi",columnDefinition="varchar(500) default ''")
	private String reportInstructionMarathi;
	
	@Column(name = "reportInstructionOther1",columnDefinition="varchar(500) default ''")
	private String reportInstructionOther1;
	
	@Column(name = "reportInstructionOther2",columnDefinition="varchar(500) default ''")
	private String reportInstructionOther2;
	
	@Column(name = "reportInstructionOther3",columnDefinition="varchar(500) default ''")
	private String reportInstructionOther3;
	
	@Column(name = "mandatoryInstFlag",columnDefinition="varchar(2) default 'N'")
	private String mandatoryInstFlag="N";
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by",updatable=true)
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	
	@Column(name="unicode_marati")
	private String unicodeMarati;
	
	@Column(name="unicode_hindi")
	private String unicodeHindi;
	
	@Transient
	List<OPDReportInstructionDTO>  getListOfOPDInstructionDTO;
	
	@Transient
	private String  mandatoryCheckedFlag;

	public int getReportInstructionID() {
		return reportInstructionID;
	}

	public void setReportInstructionID(int reportInstructionID) {
		this.reportInstructionID = reportInstructionID;
	}

	public String getReportInstruction() {
		return reportInstruction;
	}

	public void setReportInstruction(String reportInstruction) {
		this.reportInstruction = reportInstruction;
	}

	public String getReportInstructionHindi() {
		return reportInstructionHindi;
	}

	public void setReportInstructionHindi(String reportInstructionHindi) {
		this.reportInstructionHindi = reportInstructionHindi;
	}

	public String getReportInstructionMarathi() {
		return reportInstructionMarathi;
	}

	public void setReportInstructionMarathi(String reportInstructionMarathi) {
		this.reportInstructionMarathi = reportInstructionMarathi;
	}

	public String getReportInstructionOther1() {
		return reportInstructionOther1;
	}

	public void setReportInstructionOther1(String reportInstructionOther1) {
		this.reportInstructionOther1 = reportInstructionOther1;
	}

	public String getReportInstructionOther2() {
		return reportInstructionOther2;
	}

	public void setReportInstructionOther2(String reportInstructionOther2) {
		this.reportInstructionOther2 = reportInstructionOther2;
	}

	public String getReportInstructionOther3() {
		return reportInstructionOther3;
	}

	public void setReportInstructionOther3(String reportInstructionOther3) {
		this.reportInstructionOther3 = reportInstructionOther3;
	}

	public String getMandatoryInstFlag() {
		return mandatoryInstFlag;
	}

	public void setMandatoryInstFlag(String mandatoryInstFlag) {
		this.mandatoryInstFlag = mandatoryInstFlag;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
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

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public List<OPDReportInstructionDTO> getGetListOfOPDInstructionDTO() {
		return getListOfOPDInstructionDTO;
	}

	public void setGetListOfOPDInstructionDTO(List<OPDReportInstructionDTO> getListOfOPDInstructionDTO) {
		this.getListOfOPDInstructionDTO = getListOfOPDInstructionDTO;
	}

	public String getUnicodeMarati() {
		return unicodeMarati;
	}

	public void setUnicodeMarati(String unicodeMarati) {
		this.unicodeMarati = unicodeMarati;
	}

	public String getUnicodeHindi() {
		return unicodeHindi;
	}

	public void setUnicodeHindi(String unicodeHindi) {
		this.unicodeHindi = unicodeHindi;
	}
	
	

	public String getMandatoryCheckedFlag() {
		return mandatoryCheckedFlag;
	}

	public void setMandatoryCheckedFlag(String mandatoryCheckedFlag) {
		this.mandatoryCheckedFlag = mandatoryCheckedFlag;
	}

	@Override
	public String toString() {
		return "OPDReportInstructionDTO [reportInstructionID=" + reportInstructionID + ", reportInstruction="
				+ reportInstruction + ", reportInstructionHindi=" + reportInstructionHindi
				+ ", reportInstructionMarathi=" + reportInstructionMarathi + ", reportInstructionOther1="
				+ reportInstructionOther1 + ", reportInstructionOther2=" + reportInstructionOther2
				+ ", reportInstructionOther3=" + reportInstructionOther3 + ", mandatoryInstFlag=" + mandatoryInstFlag
				+ ", createdDateTime=" + createdDateTime + ", updatedDateTime=" + updatedDateTime + ", deletedBy="
				+ deletedBy + ", deleted=" + deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deletedDateTime=" + deletedDateTime + ", unitId=" + unitId + ", userId=" + userId
				+ ", unicodeMarati=" + unicodeMarati + ", unicodeHindi=" + unicodeHindi
				+ ", getListOfOPDInstructionDTO=" + getListOfOPDInstructionDTO + "]";
	}
	
	
	
	
	

}
