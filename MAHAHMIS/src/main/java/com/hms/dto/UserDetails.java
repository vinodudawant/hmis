package com.hms.dto;

import java.io.Serializable;
import java.util.Date;





import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

@Entity
@Table(name = "users")
public class UserDetails  implements Serializable {
	private static final long serialVersionUID = 1L;
	
	
	@Id
	@GeneratedValue
	@Column(name = "User_ID")
	private Integer userId;
	@Column(name = "User_Name")
	private String userName;
	@Column(name = "user_Type")
	private String userType;
	@Column(name = "password")
	private String password;
	
	/*@Column(name = "created_date")
	private String createdDate;*/
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "Availability")
	private Date availability;
	@Column(name = "status")
	private String status;
	@Column(name = "title")
	private String title;
	@Column(name = "f_name")
	private String fullName;
	@Column(name = "m_name")
	private String middleName;
	@Column(name = "l_name")
	private String lastName;
	@Column(name = "loged_in_status")
	private String logedInStatus;
	@Column(name = "last_loged_in_date_time")
	private String lastLogedInDateTime;
	@Column(name = "last_loged_out_date_time")
	private String lastLogedOutDateTime;
	@Column(name = "current_loged_in_date_time")
	private String currentLogedInDateTime;
	@Column(name = "current_loged_out_date_time")
	private String currentLogedOutDateTime;
	@Column(name = "doctype_id")
	private String doctypeId;
	@Column(name = "doctor_type_id_list")
	private String doctortTypeIdList;
	@Column(name = "unitmaster_id")
	private String unitmasterId;
	@Column(name = "dept_id")
	private String deptId;
	@Column(name = "service_id")
	private String serviceId;
	@Column(name = "empIdhr")
	private String empIdHr;
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;
	@Column(name = "updated_by")
	private Integer updatedBy;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date", updatable = false)
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
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getAvailability() {
		return availability;
	}
	public void setAvailability(Date availability) {
		this.availability = availability;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getMiddleName() {
		return middleName;
	}
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getLogedInStatus() {
		return logedInStatus;
	}
	public void setLogedInStatus(String logedInStatus) {
		this.logedInStatus = logedInStatus;
	}
	public String getLastLogedInDateTime() {
		return lastLogedInDateTime;
	}
	public void setLastLogedInDateTime(String lastLogedInDateTime) {
		this.lastLogedInDateTime = lastLogedInDateTime;
	}
	public String getLastLogedOutDateTime() {
		return lastLogedOutDateTime;
	}
	public void setLastLogedOutDateTime(String lastLogedOutDateTime) {
		this.lastLogedOutDateTime = lastLogedOutDateTime;
	}
	public String getCurrentLogedInDateTime() {
		return currentLogedInDateTime;
	}
	public void setCurrentLogedInDateTime(String currentLogedInDateTime) {
		this.currentLogedInDateTime = currentLogedInDateTime;
	}
	public String getCurrentLogedOutDateTime() {
		return currentLogedOutDateTime;
	}
	public void setCurrentLogedOutDateTime(String currentLogedOutDateTime) {
		this.currentLogedOutDateTime = currentLogedOutDateTime;
	}
	public String getDoctypeId() {
		return doctypeId;
	}
	public void setDoctypeId(String doctypeId) {
		this.doctypeId = doctypeId;
	}
	public String getDoctortTypeIdList() {
		return doctortTypeIdList;
	}
	public void setDoctortTypeIdList(String doctortTypeIdList) {
		this.doctortTypeIdList = doctortTypeIdList;
	}
	public String getUnitmasterId() {
		return unitmasterId;
	}
	public void setUnitmasterId(String unitmasterId) {
		this.unitmasterId = unitmasterId;
	}
	public String getDeptId() {
		return deptId;
	}
	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}
	public String getServiceId() {
		return serviceId;
	}
	public void setServiceId(String serviceId) {
		this.serviceId = serviceId;
	}
	public String getEmpIdHr() {
		return empIdHr;
	}
	public void setEmpIdHr(String empIdHr) {
		this.empIdHr = empIdHr;
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
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	@Override
	public String toString() {
		return "UserDetails [userId=" + userId + ", userName=" + userName
				+ ", userType=" + userType + ", password=" + password
				+ ", availability=" + availability + ", status=" + status
				+ ", title=" + title + ", fullName=" + fullName
				+ ", middleName=" + middleName + ", lastName=" + lastName
				+ ", logedInStatus=" + logedInStatus + ", lastLogedInDateTime="
				+ lastLogedInDateTime + ", lastLogedOutDateTime="
				+ lastLogedOutDateTime + ", currentLogedInDateTime="
				+ currentLogedInDateTime + ", currentLogedOutDateTime="
				+ currentLogedOutDateTime + ", doctypeId=" + doctypeId
				+ ", doctortTypeIdList=" + doctortTypeIdList
				+ ", unitmasterId=" + unitmasterId + ", deptId=" + deptId
				+ ", serviceId=" + serviceId + ", empIdHr=" + empIdHr
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deleted=" + deleted + ", deletedBy="
				+ deletedBy + ", deletedDate=" + deletedDate + ", unitId="
				+ unitId + "]";
	}
	




}