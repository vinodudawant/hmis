package com.hms.bloodbank.dto;

	import java.io.Serializable;
	import java.util.Date;
	import java.util.List;

	import javax.persistence.Column;
	import javax.persistence.Entity;
	import javax.persistence.GeneratedValue;
	import javax.persistence.Id;
	import javax.persistence.Table;
	import javax.persistence.Transient;

	import org.hibernate.annotations.CreationTimestamp;
	import org.hibernate.annotations.UpdateTimestamp;

	@Entity
	@Table(name="bb_blood_type_master")
	public class BloodTypeMaster implements Serializable {
		
		private static final long serialVersionUID = 1L;

		@Id
		@GeneratedValue
		@Column(name = "idblood_type")
		private int bloodTypeId;
		
		@Column(name = "blood_type_name")
		private String bloodTypeName;
		
		@Column(name = "created_by", updatable = false)
		private Integer createdBy;

		@Column(name = "updated_by")
		private Integer updatedBy;

		@CreationTimestamp
		@Column(name = "created_datetime", updatable = false)
		private Date createdDate;

		@UpdateTimestamp
		@Column(name = "updated_datetime")
		private Date updatedDate;
		
		@UpdateTimestamp
		@Column(name = "deleted_datetime")
		private Date deletedDate;

		@Column(name = "deleted_by")
		private Integer deletedBy;

		@Column(name = "unit_id")
		private Integer unitId;
		
		@Column(name = "status")
		private String status="Y";
		
		@Column(name = "blodd_group_ip")
		private String ipAddress = null;
		
		@Transient
		private List<BloodTypeMaster> lstBloodTypeMaster;

		public int getBloodTypeId() {
			return bloodTypeId;
		}

		public void setBloodTypeId(int bloodTypeId) {
			this.bloodTypeId = bloodTypeId;
		}

		public String getBloodTypeName() {
			return bloodTypeName;
		}

		public void setBloodTypeName(String bloodTypeName) {
			this.bloodTypeName = bloodTypeName;
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

		public Integer getUnitId() {
			return unitId;
		}

		public void setUnitId(Integer unitId) {
			this.unitId = unitId;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public String getIpAddress() {
			return ipAddress;
		}

		public void setIpAddress(String ipAddress) {
			this.ipAddress = ipAddress;
		}

		public List<BloodTypeMaster> getLstBloodTypeMaster() {
			return lstBloodTypeMaster;
		}

		public void setLstBloodTypeMaster(List<BloodTypeMaster> lstBloodTypeMaster) {
			this.lstBloodTypeMaster = lstBloodTypeMaster;
		}

		

		

		
		


}
