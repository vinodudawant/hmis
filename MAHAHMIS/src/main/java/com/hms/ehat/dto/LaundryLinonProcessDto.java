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

@Entity
@Table(name = "ehat_laundry_process_master")
public class LaundryLinonProcessDto {
	

		@Id
		@GeneratedValue
		@Column(name = "process_Id")
		private Integer processId;

		@Column(name = "process_code")
		private String processCode;
		
		@Column(name = "processName")
		private String processName;
		
		@Column(name = "discription")
		private String discription;
		
		@Column(name = "seq_no")
		private Integer seqNo;
		
		@Column(name = "unit_id")
		private Integer unitId;
		
		@Column(name = "created_by",updatable=false)
		private Integer createdBy;

		@Column(name = "updated_by")
		private Integer updatedBy;

		@Column(name = "deleted_by")
		private Integer deletedBy;	

		@Column(name = "deleted")
		private String deleted="N";

		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "created_date_time",updatable=false)
		private Date createdDate;

		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "updated_date_time")
		private Date updatedDate;

		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "deleted_date_time")
		private Date deletedDate;

		@Transient
		private List<LaundryLinonProcessDto> listPro;

		public Integer getProcessId() {
			return processId;
		}

		public void setProcessId(Integer processId) {
			this.processId = processId;
		}

		public String getProcessCode() {
			return processCode;
		}

		public void setProcessCode(String processCode) {
			this.processCode = processCode;
		}

		public String getProcessName() {
			return processName;
		}

		public void setProcessName(String processName) {
			this.processName = processName;
		}

		public String getDiscription() {
			return discription;
		}

		public void setDiscription(String discription) {
			this.discription = discription;
		}

		public Integer getSeqNo() {
			return seqNo;
		}

		public void setSeqNo(Integer seqNo) {
			this.seqNo = seqNo;
		}

		public Integer getUnitId() {
			return unitId;
		}

		public void setUnitId(Integer unitId) {
			this.unitId = unitId;
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

		public String getDeleted() {
			return deleted;
		}

		public void setDeleted(String deleted) {
			this.deleted = deleted;
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

		public List<LaundryLinonProcessDto> getListPro() {
			return listPro;
		}

		public void setListPro(List<LaundryLinonProcessDto> listPro) {
			this.listPro = listPro;
		}
		
}
