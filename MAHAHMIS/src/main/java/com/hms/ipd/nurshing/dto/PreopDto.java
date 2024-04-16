package com.hms.ipd.nurshing.dto;

import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;

@Entity
@Component
@Table(name = "preop")
public class PreopDto {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
	private int preOpId;
	
	private String preOp;
    
	 
	 @Column(name = "created_by", updatable = false)
		private Integer createdBy;

		@Column(name = "updated_by")
		private Integer updatedBy;

		@CreationTimestamp
		@Column(name = "created_date_time", updatable = false)
		private Date createdDate;

		@UpdateTimestamp
		@Column(name = "updated_date_time")
		private Date updatedDate;
		
		@UpdateTimestamp
		@Column(name = "deleted_date_time")
		private Date deletedDate;

		@Column(name = "deleted_by")
		private Integer deletedBy;
		
		@Column(name = "unit_id",columnDefinition="int default 1")
		private int unitId=1;
		
		@Transient
		List<PreopDto>  getListOfanaesthesiaPreOp;
		
		@OneToOne
		@JoinColumn(name="treatment_id")
		public TreatmentDto treatObj;
		
		@ManyToOne
		@JoinColumn(name="patient_id")
		public RegistrationDto patientObj;

		public int getPreOpId() {
			return preOpId;
		}

		public void setPreOpId(int preOpId) {
			this.preOpId = preOpId;
		}

		public String getPreOp() {
			return preOp;
		}

		public void setPreOp(String preOp) {
			this.preOp = preOp;
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

		public Date getDeletedDate() {
			return deletedDate;
		}

		public void setDeletedDate(Date deletedDate) {
			this.deletedDate = deletedDate;
		}

		public Integer getDeletedBy() {
			return deletedBy;
		}

		public void setDeletedBy(Integer deletedBy) {
			this.deletedBy = deletedBy;
		}

		public int getUnitId() {
			return unitId;
		}

		public void setUnitId(int unitId) {
			this.unitId = unitId;
		}

		public List<PreopDto> getGetListOfanaesthesiaPreOp() {
			return getListOfanaesthesiaPreOp;
		}

		public void setGetListOfanaesthesiaPreOp(List<PreopDto> getListOfanaesthesiaPreOp) {
			this.getListOfanaesthesiaPreOp = getListOfanaesthesiaPreOp;
		}

		public TreatmentDto getTreatObj() {
			return treatObj;
		}

		public void setTreatObj(TreatmentDto treatObj) {
			this.treatObj = treatObj;
		}

		public RegistrationDto getPatientObj() {
			return patientObj;
		}

		public void setPatientObj(RegistrationDto patientObj) {
			this.patientObj = patientObj;
		}
		
}
