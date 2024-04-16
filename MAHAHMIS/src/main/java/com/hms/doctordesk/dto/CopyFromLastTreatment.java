package com.hms.doctordesk.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.ehat.dto.BillDetailsDto;


@Entity
public class CopyFromLastTreatment {

	@Id
	@GeneratedValue
	private int id;
	private int treatmentId;
	private int priviousTretamentId;

	
	
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "copy_id")
	private List<PrescrptionMasterDto> PrescrptionMasterDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "copy_id")
	private List<DiagonosisMasterDto> diagonosisMasterDto;


	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "copy_id")
	private List<SurgicalAdviceDto> surgicalAdviceDto;

	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "copy_id")
	private List<DdComplaintDto> ddComplaintDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "copy_id")
	private List<DdClinicalDto> ddClinicalDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "copy_id")
	private List<DdHistoryDto> ddHistoryDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "copy_id")
	private List<BillDetailsDto> billDetailsDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "copy_id")
	private List<DoctorDeskInstructionDto> doctorDeskInstructionDto;
	
	
	// logs
	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDateTime;

	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDateTime;
	@Column(name = "user_id")
	private int userId;
	@Column(name = "created_by", updatable = false)
	private int createdBy;
	@Column(name = "updated_by")
	private int updatedBy;
	@Column(name = "deleted_by")
	private int deleted_by;
	@Column(name = "deleted", columnDefinition = "varchar(2) default 'N'")
	private String deleted = "N";
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	@Column(name = "unit_id")
	private Integer unitId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
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

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
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

	
	public int getPriviousTretamentId() {
		return priviousTretamentId;
	}

	public void setPriviousTretamentId(int priviousTretamentId) {
		this.priviousTretamentId = priviousTretamentId;
	}

	public List<PrescrptionMasterDto> getPrescrptionMasterDto() {
		return PrescrptionMasterDto;
	}

	public void setPrescrptionMasterDto(
			List<PrescrptionMasterDto> prescrptionMasterDto) {
		PrescrptionMasterDto = prescrptionMasterDto;
	}

	public List<DiagonosisMasterDto> getDiagonosisMasterDto() {
		return diagonosisMasterDto;
	}

	public void setDiagonosisMasterDto(List<DiagonosisMasterDto> diagonosisMasterDto) {
		this.diagonosisMasterDto = diagonosisMasterDto;
	}

	public List<SurgicalAdviceDto> getSurgicalAdviceDto() {
		return surgicalAdviceDto;
	}

	public void setSurgicalAdviceDto(List<SurgicalAdviceDto> surgicalAdviceDto) {
		this.surgicalAdviceDto = surgicalAdviceDto;
	}

	public List<DdComplaintDto> getDdComplaintDto() {
		return ddComplaintDto;
	}

	public void setDdComplaintDto(List<DdComplaintDto> ddComplaintDto) {
		this.ddComplaintDto = ddComplaintDto;
	}
	
	public List<DdClinicalDto> getDdClinicalDto() {
		return ddClinicalDto;
	}

	public void setDdClinicalDto(List<DdClinicalDto> ddClinicalDto) {
		this.ddClinicalDto = ddClinicalDto;
	}

	public List<DdHistoryDto> getDdHistoryDto() {
		return ddHistoryDto;
	}

	public void setDdHistoryDto(List<DdHistoryDto> ddHistoryDto) {
		this.ddHistoryDto = ddHistoryDto;
	}

	public List<BillDetailsDto> getBillDetailsDto() {
		return billDetailsDto;
	}

	public void setBillDetailsDto(List<BillDetailsDto> billDetailsDto) {
		this.billDetailsDto = billDetailsDto;
	}

	public List<DoctorDeskInstructionDto> getDoctorDeskInstructionDto() {
		return doctorDeskInstructionDto;
	}

	public void setDoctorDeskInstructionDto(
			List<DoctorDeskInstructionDto> doctorDeskInstructionDto) {
		this.doctorDeskInstructionDto = doctorDeskInstructionDto;
	}
	
}
