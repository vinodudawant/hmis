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
@Table(name = "ehat_view_registration")
public class RegistrationViewDto {
		@Id
		@GeneratedValue
		@Column(name = "patient_id")
		private Integer ptId;
		
		@Column(name = "center_patient_id")
		private String centerPatientId;
	 
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
		
		@Column(name = "department_id")
		private int department_id;
		
		@Column(name = "block_flag",columnDefinition="varchar(2) default 'N'")
		private String blockFlag ;
		
		@Column(name = "block_narration_1",columnDefinition="varchar(5000) default '-'")
		private String blockNarration1 ="-";
		
		@Column(name = "block_narration_2",columnDefinition="varchar(5000) default '-'")
		private String blockNarration2 ="-";
		
		@Column(name = "block_narration_3",columnDefinition="varchar(5000) default '-'")
		private String blockNarration3 ="-";
		
		@Column(name = "block_user_name_1",columnDefinition="varchar(500) default '-'")
		private String blockUserName1 ="-";
		
		@Column(name = "block_user_name_2",columnDefinition="varchar(500) default '-'")
		private String blockUserName2 ="-";
		
		@Column(name = "block_user_name_3",columnDefinition="varchar(500) default '-'")
		private String blockUserName3 ="-";
		
		@Column(name = "block_user_id_1",columnDefinition="int default 0")
		private int blockUserId1=0;
		
		@Column(name = "block_user_id_2",columnDefinition="int default 0")
		private int blockUserId2=0;
		
		@Column(name = "block_user_id_3",columnDefinition="int default 0")
		private int blockUserId3=0;

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
		private List<RegistrationViewDto> lstRegviewDto;
				
		// Added by vinod
		@Transient
		private List<EhatBillPrefix> listEhatBillPrefix;
		// Added by vinod
		
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
 
		
		public List<RegistrationViewDto> getLstRegviewDto() {
			return lstRegviewDto;
		}

		public void setLstRegviewDto(List<RegistrationViewDto> lstRegviewDto) {
			this.lstRegviewDto = lstRegviewDto;
		}

		public Integer getPtId() {
			return ptId;
		}

		public void setPtId(Integer ptId) {
			this.ptId = ptId;
		}		

		public String getCenterPatientId() {
			return centerPatientId;
		}

		public void setCenterPatientId(String centerPatientId) {
			this.centerPatientId = centerPatientId;
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

		public List<EhatBillPrefix> getListEhatBillPrefix() {
			return listEhatBillPrefix;
		}

		public void setListEhatBillPrefix(List<EhatBillPrefix> listEhatBillPrefix) {
			this.listEhatBillPrefix = listEhatBillPrefix;
		}

		public String getBlockFlag() {
			return blockFlag;
		}

		public void setBlockFlag(String blockFlag) {
			this.blockFlag = blockFlag;
		}

		public String getBlockNarration1() {
			return blockNarration1;
		}

		public void setBlockNarration1(String blockNarration1) {
			this.blockNarration1 = blockNarration1;
		}

		public String getBlockNarration2() {
			return blockNarration2;
		}

		public void setBlockNarration2(String blockNarration2) {
			this.blockNarration2 = blockNarration2;
		}

		public String getBlockNarration3() {
			return blockNarration3;
		}

		public void setBlockNarration3(String blockNarration3) {
			this.blockNarration3 = blockNarration3;
		}

		public int getBlockUserId1() {
			return blockUserId1;
		}

		public void setBlockUserId1(int blockUserId1) {
			this.blockUserId1 = blockUserId1;
		}

		public int getBlockUserId2() {
			return blockUserId2;
		}

		public void setBlockUserId2(int blockUserId2) {
			this.blockUserId2 = blockUserId2;
		}

		public int getBlockUserId3() {
			return blockUserId3;
		}

		public void setBlockUserId3(int blockUserId3) {
			this.blockUserId3 = blockUserId3;
		}

		public String getBlockUserName1() {
			return blockUserName1;
		}

		public void setBlockUserName1(String blockUserName1) {
			this.blockUserName1 = blockUserName1;
		}

		public String getBlockUserName2() {
			return blockUserName2;
		}

		public void setBlockUserName2(String blockUserName2) {
			this.blockUserName2 = blockUserName2;
		}

		public String getBlockUserName3() {
			return blockUserName3;
		}

		public void setBlockUserName3(String blockUserName3) {
			this.blockUserName3 = blockUserName3;
		}
		
		@Transient
		private String countpatient;
		
		@Transient
		private String legacyUHIDNumber;

		public String getCountpatient() {
			return countpatient;
		}

		public void setCountpatient(String countpatient) {
			this.countpatient = countpatient;
		}

		public String getLegacyUHIDNumber() {
			return legacyUHIDNumber;
		}

		public void setLegacyUHIDNumber(String legacyUHIDNumber) {
			this.legacyUHIDNumber = legacyUHIDNumber;
		}

		@Override
		public String toString() {
			return "RegistrationViewDto [ptId=" + ptId + ", centerPatientId=" + centerPatientId + ", pIdd=" + pIdd
					+ ", patientName=" + patientName + ", adharcardNo=" + adharcardNo + ", mobile=" + mobile
					+ ", unitId=" + unitId + ", department_id=" + department_id + ", blockFlag=" + blockFlag
					+ ", blockNarration1=" + blockNarration1 + ", blockNarration2=" + blockNarration2
					+ ", blockNarration3=" + blockNarration3 + ", blockUserName1=" + blockUserName1
					+ ", blockUserName2=" + blockUserName2 + ", blockUserName3=" + blockUserName3 + ", blockUserId1="
					+ blockUserId1 + ", blockUserId2=" + blockUserId2 + ", blockUserId3=" + blockUserId3 + ", tFlag="
					+ tFlag + ", ttId=" + ttId + ", createdDateTime=" + createdDateTime + ", sponsorchargesSlaveId="
					+ sponsorchargesSlaveId + ", lstRegviewDto=" + lstRegviewDto + ", listEhatBillPrefix="
					+ listEhatBillPrefix + ", countpatient=" + countpatient + ", legacyUHIDNumber=" + legacyUHIDNumber
					+ "]";
		}
		
		
}
		 
		
		 
