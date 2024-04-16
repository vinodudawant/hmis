package com.hms.ipd.dto;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.hms.doctordesk.dto.OPDReportInstructionDTO;

@SuppressWarnings("serial")
@Entity
@Table(name = "ehat_individualtreatmentinstruction")
public class IndividualTreatmentInstructionIPD implements Serializable{

	@Id
	@GeneratedValue
	@Column(name = "id_individual_treatment_instruction")
	private Integer idIndividualtreatmentinstruction; 
	
	@Column(name = "treatmentId")
	private Integer treatmentId;
	
	@ManyToOne
	@JoinColumn(name = "id_reportInstruction")
	private OPDReportInstructionDTO opdReportInstruction;
	
	@Column(name="unit_id")
	private Integer unitId;
		

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Calendar createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Calendar updatedDate;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";


	@Column(name = "deleted_by")
	private Integer deletedBy;


	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Calendar deletedDate;


	protected Integer getIdIndividualtreatmentinstruction() {
		return idIndividualtreatmentinstruction;
	}


	protected void setIdIndividualtreatmentinstruction(Integer idIndividualtreatmentinstruction) {
		this.idIndividualtreatmentinstruction = idIndividualtreatmentinstruction;
	}


	protected Integer getTreatmentId() {
		return treatmentId;
	}


	protected void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}


	protected OPDReportInstructionDTO getOpdReportInstruction() {
		return opdReportInstruction;
	}


	protected void setOpdReportInstruction(OPDReportInstructionDTO opdReportInstruction) {
		this.opdReportInstruction = opdReportInstruction;
	}


	protected Integer getUnitId() {
		return unitId;
	}


	protected void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}


	protected Integer getCreatedBy() {
		return createdBy;
	}


	protected void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}


	protected Integer getUpdatedBy() {
		return updatedBy;
	}


	protected void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}


	protected Calendar getCreatedDate() {
		return createdDate;
	}


	protected void setCreatedDate(Calendar createdDate) {
		this.createdDate = createdDate;
	}


	protected Calendar getUpdatedDate() {
		return updatedDate;
	}


	protected void setUpdatedDate(Calendar updatedDate) {
		this.updatedDate = updatedDate;
	}


	protected String getDeleted() {
		return deleted;
	}


	protected void setDeleted(String deleted) {
		this.deleted = deleted;
	}


	protected Integer getDeletedBy() {
		return deletedBy;
	}


	protected void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}


	protected Calendar getDeletedDate() {
		return deletedDate;
	}


	protected void setDeletedDate(Calendar deletedDate) {
		this.deletedDate = deletedDate;
	}


	@Override
	public String toString() {
		return "IndividualTreatmentInstructionIPD [idIndividualtreatmentinstruction=" + idIndividualtreatmentinstruction
				+ ", treatmentId=" + treatmentId + ", opdReportInstruction=" + opdReportInstruction + ", unitId="
				+ unitId + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deleted=" + deleted + ", deletedBy=" + deletedBy
				+ ", deletedDate=" + deletedDate + "]";
	}


	public IndividualTreatmentInstructionIPD() {
		super();
	}


	@Override
	public int hashCode() {
		return Objects.hash(createdBy, createdDate, deleted, deletedBy, deletedDate, idIndividualtreatmentinstruction,
				opdReportInstruction, treatmentId, unitId, updatedBy, updatedDate);
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		IndividualTreatmentInstructionIPD other = (IndividualTreatmentInstructionIPD) obj;
		return Objects.equals(createdBy, other.createdBy) && Objects.equals(createdDate, other.createdDate)
				&& Objects.equals(deleted, other.deleted) && Objects.equals(deletedBy, other.deletedBy)
				&& Objects.equals(deletedDate, other.deletedDate)
				&& Objects.equals(idIndividualtreatmentinstruction, other.idIndividualtreatmentinstruction)
				&& Objects.equals(opdReportInstruction, other.opdReportInstruction)
				&& Objects.equals(treatmentId, other.treatmentId) && Objects.equals(unitId, other.unitId)
				&& Objects.equals(updatedBy, other.updatedBy) && Objects.equals(updatedDate, other.updatedDate);
	}
	
	
}
