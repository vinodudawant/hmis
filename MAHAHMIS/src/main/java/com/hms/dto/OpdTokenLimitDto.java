package com.hms.dto;
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


@Entity
@Table(name="opd_token_limit")
public class OpdTokenLimitDto
{

		@Id
		@GeneratedValue
		@Column(name = "id")
		private Integer tokenid;
		
		@Column(name = "speciality_id")
		private int specialisationId;
		
		@Column(name = "specialization_name")
		private String specializationName;

		public String getSpecializationName() {
			return specializationName;
		}

		public void setSpecializationName(String specializationName) {
			this.specializationName = specializationName;
		}

		@Column(name = "in_count")
		private Integer inCount;
		
		@Column(name = "next_count")
		private Integer nextCount;
		
		@Column(name = "wait_count")
		private Integer waitingCount;
		
		@Column(name = "created_by", updatable = false)
		private Integer createdBy;

		@Column(name = "updated_by")
		private Integer updatedBy;

		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "created_date_time", updatable = false)
		private Date createdDate;

		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "updated_date_time")
		private Date updatedDate;

		@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
		private String deleted="N";

		@Column(name = "deleted_by")
		private Integer deletedBy;

		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "delete_date_time")
		private Date deletedDate;
		
		@Column(name = "unit_id")
		private Integer unitId;

		@Transient
		private List<OpdTokenLimitDto> lstSpecialityMaster;
		
		@Transient
		private Integer  id ;
		
		@Transient
		private Integer in_count;

		@Transient
		private Integer next_count;
		
		@Transient
		private Integer wait_count;

		
		public Integer getTokenid() {
			return tokenid;
		}

		public void setTokenid(Integer tokenid) {
			this.tokenid = tokenid;
		}

		

		public int getSpecialisationId() {
			return specialisationId;
		}

		public void setSpecialisationId(int specialisationId) {
			this.specialisationId = specialisationId;
		}

		public Integer getNextCount() {
			return nextCount;
		}

		public Integer getWaitingCount() {
			return waitingCount;
		}


		public void setNextCount(Integer nextCount) {
			this.nextCount = nextCount;
		}

		public void setWaitingCount(Integer waitingCount) {
			this.waitingCount = waitingCount;
		}

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public Integer getIn_count() {
			return in_count;
		}

		public void setIn_count(Integer in_count) {
			this.in_count = in_count;
		}

		public Integer getNext_count() {
			return next_count;
		}

		public void setNext_count(Integer next_count) {
			this.next_count = next_count;
		}

		public Integer getWait_count() {
			return wait_count;
		}

		public void setWait_count(Integer wait_count) {
			this.wait_count = wait_count;
		}

		public Integer getInCount() {
			return inCount;
		}

		public void setInCount(Integer inCount) {
			this.inCount = inCount;
		}

		

		
		public List<OpdTokenLimitDto> getLstSpecialityMaster() {
			return lstSpecialityMaster;
		}

		public void setLstSpecialityMaster(List<OpdTokenLimitDto> lstSpecialityMaster) {
			this.lstSpecialityMaster = lstSpecialityMaster;
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

		public String getDeleted() {
			return deleted;
		}

		public void setDeleted(String deleted) {
			this.deleted = deleted;
		}

		public Integer getDeletedBy() {
			return deletedBy;
		}

		public void setDeletedBy(Integer deletedBy) {
			this.deletedBy = deletedBy;
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


}

