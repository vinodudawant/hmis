package com.hms.ivf.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

import com.hms.ehat.dto.EhatBillPrefix;
 
@Entity
@Immutable
@Table(name = "ehat_view_ivf_batch_details")
public class IVFBatchViewDto implements Serializable {
		@Id
		@GeneratedValue
		@Column(name = "ivf_batch_master_id")
		private Integer batchID;
	 
		@Column(name = "ivf_batch_master_id",insertable=false , updatable=false)
		private String batchId;
		
		@Column(name = "batch_No")
		private String batchNo;
		
		@Column(name = "ivf_couple_id")
		private Integer coupleID;
		
		@Column(name = "male_patient_name")
		private String malePatientName;
		
		@Column(name = "female_patient_name")
		private String femalePatientName;
		
		@Column(name = "male_patient_id")
		private Integer malePatientId;
		
		@Column(name = "female_patient_id")
		private Integer femalePatientId;
		
		@Column(name = "male_treatId")
		private Integer maleTreatId;
		
		@Column(name = "female_treatId")
		private Integer femaleTreatId;
		
		@Column(name = "male_doctor_Id")
		private Integer maleDoctorId;
		
		@Column(name = "female_doctor_Id")
		private Integer femaleDoctorId;
		
		@Column(name = "male_dept_id")
		private Integer maleDeptId;
		
		@Column(name = "female_dept_id")
		private Integer femaleDeptId;
		
		@Column(name = "unit_id")
		private Integer unitId;
		
		@Column(name = "ivf_batch_status")
		private String ivfBatchStatus;
		
		@Column(name = "pick_up_date")
		private String pickUpDate;
		
		@Column(name = "ivf_couple_status")
		private String ivfCoupleStatus;
		
		public String getBatchNo() {
			return batchNo;
		}

		public void setBatchNo(String batchNo) {
			this.batchNo = batchNo;
		}

		public Integer getMaleDoctorId() {
			return maleDoctorId;
		}

		public void setMaleDoctorId(Integer maleDoctorId) {
			this.maleDoctorId = maleDoctorId;
		}

		public Integer getFemaleDoctorId() {
			return femaleDoctorId;
		}

		public void setFemaleDoctorId(Integer femaleDoctorId) {
			this.femaleDoctorId = femaleDoctorId;
		}

		@Column(name = "created_date_time")
		private Date createdDateTime;
		
		@Transient
		private List<IVFBatchViewDto> lstBatchviewDto;
		
		public Date getCreatedDateTime() {
			return createdDateTime;
		}

		public void setCreatedDateTime(Date createdDateTime) {
			this.createdDateTime = createdDateTime;
		}

		public List<IVFBatchViewDto> getLstBatchviewDto() {
			return lstBatchviewDto;
		}

		public void setLstBatchviewDto(List<IVFBatchViewDto> lstBatchviewDto) {
			this.lstBatchviewDto = lstBatchviewDto;
		}

		public Integer getBatchID() {
			return batchID;
		}

		public void setBatchID(Integer batchID) {
			this.batchID = batchID;
		}

		public String getMalePatientName() {
			return malePatientName;
		}

		public void setMalePatientName(String MalePatientName) {
			this.malePatientName = MalePatientName;
		}
		
		public String getFemalePatientName() {
			return femalePatientName;
		}

		public void setFemalePatientName(String FemalePatientName) {
			this.femalePatientName = FemalePatientName;
		}

		public Integer getMalePatientId() {
			return malePatientId;
		}

		public void setMalePatientId(Integer malePatientId) {
			this.malePatientId = malePatientId;
		}

		public Integer getFemalePatientId() {
			return femalePatientId;
		}

		public void setFemalePatientId(Integer femalePatientId) {
			this.femalePatientId = femalePatientId;
		}
		
		public Integer getUnitId() {
			return unitId;
		}

		public void setUnitId(Integer unitId) {
			this.unitId = unitId;
		}

		public String getBatchId() {
			return batchId;
		}

		public void setBatchId(String BatchId) {
			this.batchId = BatchId;
		}

		public Integer getMaleTreatId() {
			return maleTreatId;
		}

		public void setMaleTreatId(Integer maleTreatId) {
			this.maleTreatId = maleTreatId;
		}

		public Integer getFemaleTreatId() {
			return femaleTreatId;
		}

		public void setFemaleTreatId(Integer femaleTreatId) {
			this.femaleTreatId = femaleTreatId;
		}
		
		public Integer getMaleDeptId() {
			return maleDeptId;
		}

		public void setMaleDeptId(Integer maleDeptId) {
			this.maleDeptId = maleDeptId;
		}

		public Integer getFemaleDeptId() {
			return femaleDeptId;
		}

		public void setFemaleDeptId(Integer femaleDeptId) {
			this.femaleDeptId = femaleDeptId;
		}
		
		public String getIvfBatchStatus() {
			return ivfBatchStatus;
		}

		public void setIvfBatchStatus(String ivfBatchStatus) {
			this.ivfBatchStatus = ivfBatchStatus;
		}

		public Integer getCoupleID() {
			return coupleID;
		}

		public void setCoupleID(Integer CoupleID) {
			this.coupleID = CoupleID;
		}
		
		public String getPickUpDate() {
			return pickUpDate;
		}
		public void setPickUpDate(String pickUpDate) {
			this.pickUpDate = pickUpDate;
		}
		
		public String getIvfCoupleStatus() {
			return ivfCoupleStatus;
		}

		public void setIvfCoupleStatus(String ivfCoupleStatus) {
			this.ivfCoupleStatus = ivfCoupleStatus;
		}
}
		 
		
		 
