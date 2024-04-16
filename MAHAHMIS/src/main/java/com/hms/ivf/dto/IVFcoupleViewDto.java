package com.hms.ivf.dto;

import java.io.Serializable;
import java.math.BigInteger;
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
@Table(name = "ehat_view_ivf_couple_details")
public class IVFcoupleViewDto implements Serializable {
		@Id
		@GeneratedValue
		@Column(name = "ivf_couple_master_id")
		private Integer coupleID;
	 
		@Column(name = "ivf_couple_master_id",insertable=false , updatable=false)
		private String coupleId;
		
		@Column(name = "couple_No")
		private String coupleNo;
		
		@Column(name = "male_patient_name")
		private String malePatientName;
		
		@Column(name = "female_patient_name")
		private String femalePatientName;
		
		@Column(name = "male_patient_id")
		private Integer malePatientId;
		
		@Column(name = "female_patient_id")
		private Integer femalePatientId;
		
		@Column(name = "male_treatId")
		private BigInteger maleTreatId;
		
		@Column(name = "female_treatId")
		private Integer femaleTreatId;
		
		@Column(name = "male_doctorId")
		private Integer maleDoctorId;
		
		@Column(name = "female_doctorId")
		private Integer femaleDoctorId;
		
		@Column(name = "male_dept_id")
		private Integer maleDeptId;
		
		@Column(name = "female_dept_id")
		private Integer femaleDeptId;
		
		@Column(name = "unit_id")
		private Integer unitId;
		
		@Column(name = "ivf_batch_status")
		private String ivfBatchStatus;
		
		@Column(name = "female_ivf_treat_id")
		private Integer femaleIvfTreatId;
		
		@Column(name = "male_ivf_treat_id")
		private Integer maleIvfTreatId;
		
		public String getCoupleNo() {
			return coupleNo;
		}

		public void setCoupleNo(String coupleNo) {
			this.coupleNo = coupleNo;
		}

		@Column(name = "couple_flag")
		private String coupleFlag;
		
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
		private List<IVFcoupleViewDto> lstCoupleviewDto;
		
		public Date getCreatedDateTime() {
			return createdDateTime;
		}

		public void setCreatedDateTime(Date createdDateTime) {
			this.createdDateTime = createdDateTime;
		}

		public String getCoupleFlag() {
			return coupleFlag;
		}

		public void setCoupleFlag(String coupleFlag) {
			this.coupleFlag = coupleFlag;
		}
 
		public List<IVFcoupleViewDto> getLstCoupleviewDto() {
			return lstCoupleviewDto;
		}

		public void setLstCoupleviewDto(List<IVFcoupleViewDto> lstCoupleviewDto) {
			this.lstCoupleviewDto = lstCoupleviewDto;
		}

		public Integer getCoupleID() {
			return coupleID;
		}

		public void setCoupleID(Integer CoupleID) {
			this.coupleID = CoupleID;
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

		public String getCoupleId() {
			return coupleId;
		}

		public void setCoupleId(String CoupleId) {
			this.coupleId = CoupleId;
		}

		@Transient
		private String countCouple;

		public String getCountCouple() {
			return countCouple;
		}

		public void setCountCouple(String countCouple) {
			this.countCouple = countCouple;
		}
		
		public BigInteger getMaleTreatId() {
			return maleTreatId;
		}

		public void setMaleTreatId(BigInteger maleTreatId) {
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

		public Integer getFemaleIvfTreatId() {
			return femaleIvfTreatId;
		}

		public void setFemaleIvfTreatId(Integer femaleIvfTreatId) {
			this.femaleIvfTreatId = femaleIvfTreatId;
		}

		public Integer getMaleIvfTreatId() {
			return maleIvfTreatId;
		}

		public void setMaleIvfTreatId(Integer maleIvfTreatId) {
			this.maleIvfTreatId = maleIvfTreatId;
		}
		
		

}
		 
		
		 
