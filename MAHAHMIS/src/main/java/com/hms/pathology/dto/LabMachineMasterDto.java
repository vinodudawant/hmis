package com.hms.pathology.dto;

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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "pathology_machine_master")
public class LabMachineMasterDto implements Serializable {

	
private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private int machineId;
	
	@Column(name = "machine_name")
	private String machineName;
	
	@Column(name = "machine_serial_no")
	private String machineSerialNo;	
	
	@Column(name = "machine_status", length = 2)
	private String machineStatus = "N";
	
	@Column(name = "unit_id")
	private int unitId;
	
	@Column(name = "created_by")
	private int createdBy;
	
	@Column(name = "updated_by")
	private int updatedBy;
	
	@Column(name = "deleted_by")
	private int deletedBy;
	
	@CreationTimestamp
	@Column(name = "created_date", updatable = false)
	private Date createDate;
	
	@UpdateTimestamp
	@Column(name = "updated_date")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date")
	private Date deletedDate;

	
	@Column(name = "department_id")
	private Integer departmentId;
	
	@Transient
	private List<LabMachineMasterDto> machineNameList;	
	@Transient
	private List<LabMachineMasterDto> proLi;
	@Transient
	private String machineFlag;	
	@Transient
	private String kitSpecId;
	@Transient
	private Integer testMethodIdWithNormal;
	@Transient
	private String noteIdwithNormal;
	@Transient
	private String clinicalIdWithNormal;
	@Transient
	private String increasedIdWithNormal;	
	@Transient
	private String interpretationWithNormal;
	@Transient
	private String commentsWithNormal;
	@Transient
	private String biologicalReferenceWithNormal;
	
		
	public Integer getTestMethodIdWithNormal() {
		return testMethodIdWithNormal;
	}
	public void setTestMethodIdWithNormal(Integer testMethodIdWithNormal) {
		this.testMethodIdWithNormal = testMethodIdWithNormal;
	}
	public String getKitSpecId() {
		return kitSpecId;
	}
	public void setKitSpecId(String kitSpecId) {
		this.kitSpecId = kitSpecId;
	}
	public String getNoteIdwithNormal() {
		return noteIdwithNormal;
	}
	public void setNoteIdwithNormal(String noteIdwithNormal) {
		this.noteIdwithNormal = noteIdwithNormal;
	}
	public String getClinicalIdWithNormal() {
		return clinicalIdWithNormal;
	}
	public void setClinicalIdWithNormal(String clinicalIdWithNormal) {
		this.clinicalIdWithNormal = clinicalIdWithNormal;
	}
	public String getIncreasedIdWithNormal() {
		return increasedIdWithNormal;
	}
	public void setIncreasedIdWithNormal(String increasedIdWithNormal) {
		this.increasedIdWithNormal = increasedIdWithNormal;
	}
	public String getInterpretationWithNormal() {
		return interpretationWithNormal;
	}
	public void setInterpretationWithNormal(String interpretationWithNormal) {
		this.interpretationWithNormal = interpretationWithNormal;
	}
	public String getCommentsWithNormal() {
		return commentsWithNormal;
	}
	public void setCommentsWithNormal(String commentsWithNormal) {
		this.commentsWithNormal = commentsWithNormal;
	}
	public String getMachineFlag() {
		return machineFlag;
	}
	public void setMachineFlag(String machineFlag) {
		this.machineFlag = machineFlag;
	}
	public Integer getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}
	public int getMachineId() {
		return machineId;
	}
	public void setMachineId(int machineId) {
		this.machineId = machineId;
	}
	public String getMachineName() {
		return machineName;
	}
	public void setMachineName(String machineName) {
		this.machineName = machineName;
	}
	public String getMachineSerialNo() {
		return machineSerialNo;
	}
	public void setMachineSerialNo(String machineSerialNo) {
		this.machineSerialNo = machineSerialNo;
	}
	public String getMachineStatus() {
		return machineStatus;
	}
	public void setMachineStatus(String machineStatus) {
		this.machineStatus = machineStatus;
	}
	public int getUnitId() {
		return unitId;
	}
	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}
	public int getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}
	public int getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}
	public int getDeletedBy() {
		return deletedBy;
	}
	public void setDeletedBy(int deletedBy) {
		this.deletedBy = deletedBy;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
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
	public List<LabMachineMasterDto> getMachineNameList() {
		return machineNameList;
	}
	public void setMachineNameList(List<LabMachineMasterDto> machineNameList) {
		this.machineNameList = machineNameList;
	}
	public List<LabMachineMasterDto> getProLi() {
		return proLi;
	}
	public void setProLi(List<LabMachineMasterDto> proLi) {
		this.proLi = proLi;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getBiologicalReferenceWithNormal() {
		return biologicalReferenceWithNormal;
	}
	public void setBiologicalReferenceWithNormal(
			String biologicalReferenceWithNormal) {
		this.biologicalReferenceWithNormal = biologicalReferenceWithNormal;
	}
	@Override
	public String toString() {
		return "LabMachineMasterDto [machineId=" + machineId + ", machineName="
				+ machineName + ", machineSerialNo=" + machineSerialNo
				+ ", machineStatus=" + machineStatus + ", unitId=" + unitId
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deletedBy=" + deletedBy + ", createDate=" + createDate
				+ ", updatedDate=" + updatedDate + ", deletedDate="
				+ deletedDate + ", machineNameList=" + machineNameList
				+ ", proLi=" + proLi + "]";
	}	

}
