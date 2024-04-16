package com.hms.doctordesk.dto;

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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="dd_Prescription_inst")
public class PrescriptionInstructionDto {

	@Id
	@GeneratedValue
	@Column(name="instruction_id")
	private int id;
	
	@Column(name="english_ins")
	private String englishInstruction;
	
	@Column(name="hindi_ins")
	private String hindiInstruction;
	
	@Column(name="marthi_ins")
	private String marathiInstruction;
	
	@Column(name="unicode_marati")
	private String unicode;
	
	@Column(name="referTo")
	private String referTo;
	
	@CreationTimestamp
	@Column(name="created_date_time",updatable = false)
	private Date createdDateTime;
	
	@Column(name="created_by")
	private Integer createdBy;
	
	@Column(name="unit_id")
	private int unitId;
	
	@Column(name="updated_by")
	private int updatedBy;
	
	@Column(name="deleted_by")
	private int deleted_by;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Column(name="unicode_hindi")
	private String unicodeHindi;
	
	@Transient
	List<PrescriptionInstructionDto> listPrescriptionInstructionDto;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEnglishInstruction() {
		return englishInstruction;
	}
	public void setEnglishInstruction(String englishInstruction) {
		this.englishInstruction = englishInstruction;
	}
	public String getHindiInstruction() {
		return hindiInstruction;
	}
	public void setHindiInstruction(String hindiInstruction) {
		this.hindiInstruction = hindiInstruction;
	}
	public String getMarathiInstruction() {
		return marathiInstruction;
	}
	public void setMarathiInstruction(String marathiInstruction) {
		this.marathiInstruction = marathiInstruction;
	}
	public String getUnicode() {
		return unicode;
	}
	public void setUnicode(String unicode) {
		this.unicode = unicode;
	}
	public String getReferTo() {
		return referTo;
	}
	public void setReferTo(String referTo) {
		this.referTo = referTo;
	}
	public Date getCreatedDateTime() {
		return createdDateTime;
	}
	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}
	
	public Integer getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}
	public int getUnitId() {
		return unitId;
	}
	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}
	public int getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}
	public int getDeleted_by() {
		return deleted_by;
	}
	public void setDeleted_by(int deleted_by) {
		this.deleted_by = deleted_by;
	}
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	public List<PrescriptionInstructionDto> getListPrescriptionInstructionDto() {
		return listPrescriptionInstructionDto;
	}
	public void setListPrescriptionInstructionDto(List<PrescriptionInstructionDto> listPrescriptionInstructionDto) {
		this.listPrescriptionInstructionDto = listPrescriptionInstructionDto;
	}
	public String getUnicodeHindi() {
		return unicodeHindi;
	}
	public void setUnicodeHindi(String unicodeHindi) {
		this.unicodeHindi = unicodeHindi;
	}
	@Override
	public String toString() {
		return "PrescriptionInstructionDto [id=" + id + ", englishInstruction=" + englishInstruction
				+ ", hindiInstruction=" + hindiInstruction + ", marathiInstruction=" + marathiInstruction + ", unicode="
				+ unicode + ", referTo=" + referTo + ", createdDateTime=" + createdDateTime + ", createdBy=" + createdBy
				+ ", unitId=" + unitId + ", updatedBy=" + updatedBy + ", deleted_by=" + deleted_by + ", deleted="
				+ deleted + ", unicodeHindi=" + unicodeHindi + ", listPrescriptionInstructionDto="
				+ listPrescriptionInstructionDto + "]";
	}
	
	
	
}
