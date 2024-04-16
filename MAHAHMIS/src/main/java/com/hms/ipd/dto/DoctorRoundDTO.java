package com.hms.ipd.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@SuppressWarnings("serial")
@Entity
@Table(name = "ehat_doctor_round")
public class DoctorRoundDTO  implements Serializable {
	
	@Id
	@GeneratedValue
	@Column(name = "doctor_round_id")
	private Integer doctorRoundId;
	
	@Column(name = "previous_date")
	private Date previousDate;
	
	@Column(name = "from_date")
	private Date fromDate;
	
	@Column(name = "to_date")
	private Date toDate;
	
	
	@OneToMany(cascade=CascadeType.ALL,fetch = FetchType.LAZY)
	@JoinColumn(name = "doctor_round_id")
	private List<DoctorRoundSlaveDTO> listDoctorRoundSlaveDTO ;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	
	@Column(name = "deleted_status", length = 2)
	private String deleted = "N";
	
	@Column(name = "created_by")
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_datetime", updatable = false)
	private Calendar  createDateTime;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_datetime")
	private Calendar  updatedDateTime;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_datetime")
	private Calendar  deletedDateTime;
	
	@Transient
	private List<DoctorRoundDTO> listDoctorRoundDTO;

	public Integer getDoctorRoundId() {
		return doctorRoundId;
	}

	public void setDoctorRoundId(Integer doctorRoundId) {
		this.doctorRoundId = doctorRoundId;
	}


	public List<DoctorRoundSlaveDTO> getListDoctorRoundSlaveDTO() {
		return listDoctorRoundSlaveDTO;
	}

	public void setListDoctorRoundSlaveDTO(List<DoctorRoundSlaveDTO> listDoctorRoundSlaveDTO) {
		this.listDoctorRoundSlaveDTO = listDoctorRoundSlaveDTO;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
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

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Calendar  getCreateDateTime() {
		return createDateTime;
	}

	public void setCreateDateTime(Calendar createDateTime) {
		this.createDateTime = createDateTime;
	}

	public Calendar getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Calendar updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public Calendar getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Calendar deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public List<DoctorRoundDTO> getListDoctorRoundDTO() {
		return listDoctorRoundDTO;
	}

	public void setListDoctorRoundDTO(List<DoctorRoundDTO> listDoctorRoundDTO) {
		this.listDoctorRoundDTO = listDoctorRoundDTO;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public Date getPreviousDate() {
		return previousDate;
	}

	public void setPreviousDate(Date previousDate) {
		this.previousDate = previousDate;
	}

	public Date getFromDate() {
		return fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	public Date getToDate() {
		return toDate;
	}

	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}

	public DoctorRoundDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public DoctorRoundDTO(Integer doctorRoundId, Date previousDate, Date fromDate, Date toDate, Integer unitId,
			Integer treatmentId, String deleted, Integer createdBy, Integer updatedBy, Integer deletedBy,
			Calendar createDateTime, Calendar updatedDateTime, Calendar deletedDateTime) {
		super();
		this.doctorRoundId = doctorRoundId;
		this.previousDate = previousDate;
		this.fromDate = fromDate;
		this.toDate = toDate;
		this.unitId = unitId;
		this.treatmentId = treatmentId;
		this.deleted = deleted;
		this.createdBy = createdBy;
		this.updatedBy = updatedBy;
		this.deletedBy = deletedBy;
		this.createDateTime = createDateTime;
		this.updatedDateTime = updatedDateTime;
		this.deletedDateTime = deletedDateTime;
	}

	@Override
	public String toString() {
		return "DoctorRoundDTO [doctorRoundId=" + doctorRoundId + ", previousDate=" + previousDate + ", fromDate="
				+ fromDate + ", toDate=" + toDate + ", unitId=" + unitId + ", treatmentId=" + treatmentId + ", deleted="
				+ deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", deletedBy=" + deletedBy
				+ ", createDateTime=" + createDateTime + ", updatedDateTime=" + updatedDateTime + ", deletedDateTime="
				+ deletedDateTime + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(createDateTime, createdBy, deleted, deletedBy, deletedDateTime, doctorRoundId, fromDate,
				previousDate, toDate, treatmentId, unitId, updatedBy, updatedDateTime);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DoctorRoundDTO other = (DoctorRoundDTO) obj;
		return Objects.equals(createDateTime, other.createDateTime) && Objects.equals(createdBy, other.createdBy)
				&& Objects.equals(deleted, other.deleted) && Objects.equals(deletedBy, other.deletedBy)
				&& Objects.equals(deletedDateTime, other.deletedDateTime)
				&& Objects.equals(doctorRoundId, other.doctorRoundId) && Objects.equals(fromDate, other.fromDate)
				&& Objects.equals(previousDate, other.previousDate) && Objects.equals(toDate, other.toDate)
				&& Objects.equals(treatmentId, other.treatmentId) && Objects.equals(unitId, other.unitId)
				&& Objects.equals(updatedBy, other.updatedBy) && Objects.equals(updatedDateTime, other.updatedDateTime);
	}

	

}
