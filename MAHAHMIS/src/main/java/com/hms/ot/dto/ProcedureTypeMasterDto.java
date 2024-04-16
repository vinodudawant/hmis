package com.hms.ot.dto;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="ot_procedure_type")
public class ProcedureTypeMasterDto implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="pro_type_id")
	private int id;
	@Column(name="pro_type_name")
	private String proName;
	
	
	
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
		public String getProName() {
			return proName;
		}
		public void setProName(String proName) {
			this.proName = proName;
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
		
		
		
		
}
