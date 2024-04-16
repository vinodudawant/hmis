package com.hms.doctordesk.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name="dd_group_instruction")
public class GroupInstructionMaster {
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
	@Column(name="unicode")
	private String unicode;
	@Column(name="referTo")
	private String referTo;
	//Added by Akshata
	@Column(name="other_lan1")
	private String otherInstruction1;
	@Column(name="other_lan2")
	private String otherInstruction2;
	@Column(name="other_lan3")
	private String otherInstruction3;
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
	@Transient
	private List<GroupInstructionMaster> groupinstructionmasterlist;
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
	public List<GroupInstructionMaster> getGroupinstructionmasterlist() {
		return groupinstructionmasterlist;
	}
	public void setGroupinstructionmasterlist(List<GroupInstructionMaster> groupinstructionmasterlist) {
		this.groupinstructionmasterlist = groupinstructionmasterlist;
	}
	public String getOtherInstruction1() {
		return otherInstruction1;
	}
	public void setOtherInstruction1(String otherInstruction1) {
		this.otherInstruction1 = otherInstruction1;
	}
	public String getOtherInstruction2() {
		return otherInstruction2;
	}
	public void setOtherInstruction2(String otherInstruction2) {
		this.otherInstruction2 = otherInstruction2;
	}
	public String getOtherInstruction3() {
		return otherInstruction3;
	}
	public void setOtherInstruction3(String otherInstruction3) {
		this.otherInstruction3 = otherInstruction3;
	}
	@Override
	public String toString() {
		return "GroupInstructionMaster [id=" + id + ", englishInstruction=" + englishInstruction + ", hindiInstruction="
				+ hindiInstruction + ", marathiInstruction=" + marathiInstruction + ", unicode=" + unicode
				+ ", referTo=" + referTo + ", otherInstruction1=" + otherInstruction1 + ", otherInstruction2="
				+ otherInstruction2 + ", otherInstruction3=" + otherInstruction3 + ", createdDateTime="
				+ createdDateTime + ", createdBy=" + createdBy + ", unitId=" + unitId + ", updatedBy=" + updatedBy
				+ ", deleted_by=" + deleted_by + ", deleted=" + deleted + ", groupinstructionmasterlist="
				+ groupinstructionmasterlist + "]";
	}
	
	
	
	
}
