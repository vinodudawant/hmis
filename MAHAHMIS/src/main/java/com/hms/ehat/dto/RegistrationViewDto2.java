package com.hms.ehat.dto;

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

import org.hibernate.annotations.Immutable;
 
@Entity
@Immutable
@Table(name = "ehat_view_registration2")
public class RegistrationViewDto2 {
		@Id
		@GeneratedValue
		@Column(name = "patient_id")
		private Integer ptId;
	 
		@Column(name = "patient_id",insertable=false , updatable=false)
		private String pIdd;
		/*@Column(name = "f_name")
		private String fName;
		
		@Column(name = "m_name")
		private String mName;
		 
		@Column(name = "l_name")
		private String lName;*/
		@Column(name = "patient_name")
		private String patientName;
		@Column(name = "adharcardNo")
		private String adharcardNo;
		@Column(name = "mobile")
		private String mobile;
		
		@Column(name = "unit_id")
		private Integer unitId;
		
		@Transient
		private Integer prevOpdCount;
		
		@Transient
		private Integer prevDiagCount;

		@Column(name = "department_id")
		private int department_id;
		
		
		//added by tarique aalam
		@Column(name = "opdipdno")
		private String opdipdno;
		
		//added by Abhishek Kumbhar
		@Column(name ="mrnno")
		private String mrnno;
		
		@Column(name ="center_patient_id")
		private String centerPatientId;

		public String getAdharcardNo() {
			return adharcardNo;
		}

		public void setAdharcardNo(String adharcardNo) {
			this.adharcardNo = adharcardNo;
		}

		public String getMobile() {
			return mobile;
		}

		public void setMobile(String mobile) {
			this.mobile = mobile;
		}

		@Column(name = "t_flag",columnDefinition="varchar(2) default 'N'")
		private String tFlag;
		
		@Column(name = "treatment_id")
		private Integer ttId;
		
		
		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "created_date_time",updatable=false)
		private Date createdDateTime;
		
		
		@Column(name = "charges_master_slave_id")
		private Integer sponsorchargesSlaveId;
		
		public Integer getSponsorchargesSlaveId() {
			return sponsorchargesSlaveId;
		}

		public void setSponsorchargesSlaveId(Integer sponsorchargesSlaveId) {
			this.sponsorchargesSlaveId = sponsorchargesSlaveId;
		}

		@Transient
		private List<RegistrationViewDto2> lstRegviewDto;
		
		

		public Date getCreatedDateTime() {
			return createdDateTime;
		}

		public void setCreatedDateTime(Date createdDateTime) {
			this.createdDateTime = createdDateTime;
		}

		public Integer getTtId() {
			return ttId;
		}

		public void setTtId(Integer ttId) {
			this.ttId = ttId;
		}

		public String gettFlag() {
			return tFlag;
		}

		public void settFlag(String tFlag) {
			this.tFlag = tFlag;
		}

		public Integer getPtId() {
			return ptId;
		}

		public void setPtId(Integer ptId) {
			this.ptId = ptId;
		}

		public String getPatientName() {
			return patientName;
		}

		public void setPatientName(String patientName) {
			this.patientName = patientName;
		}

		public int getDepartment_id() {
			return department_id;
		}

		public void setDepartment_id(int department_id) {
			this.department_id = department_id;
		}

		public Integer getUnitId() {
			return unitId;
		}

		public void setUnitId(Integer unitId) {
			this.unitId = unitId;
		}

		public String getpIdd() {
			return pIdd;
		}

		public void setpIdd(String pIdd) {
			this.pIdd = pIdd;
		}

		  
		// Added by vinod
		@Transient
		private List<EhatBillPrefix> listEhatBillPrefix;

		public List<EhatBillPrefix> getListEhatBillPrefix() {
			return listEhatBillPrefix;
		}

		public void setListEhatBillPrefix(List<EhatBillPrefix> listEhatBillPrefix) {
			this.listEhatBillPrefix = listEhatBillPrefix;
		}		
		// Added by vinod

		public List<RegistrationViewDto2> getLstRegviewDto() {
			return lstRegviewDto;
		}

		public void setLstRegviewDto(List<RegistrationViewDto2> lstRegviewDto) {
			this.lstRegviewDto = lstRegviewDto;
		}

		public String getOpdipdno() {
			return opdipdno;
		}

		public void setOpdipdno(String opdipdno) {
			this.opdipdno = opdipdno;
		}
		
		public String getMrnno() {
			return mrnno;
		}

		public void setMrnno(String mrnno) {
			this.mrnno = mrnno;
		}

		public String getCenterPatientId() {
			return centerPatientId;
		}

		public void setCenterPatientId(String centerPatientId) {
			this.centerPatientId = centerPatientId;
		}

		public Integer getPrevOpdCount() {
			return prevOpdCount;
		}

		public void setPrevOpdCount(Integer prevOpdCount) {
			this.prevOpdCount = prevOpdCount;
		}

		public Integer getPrevDiagCount() {
			return prevDiagCount;
		}

		public void setPrevDiagCount(Integer prevDiagCount) {
			this.prevDiagCount = prevDiagCount;
		}
		
		
		 
		
}
		 
		
		 
