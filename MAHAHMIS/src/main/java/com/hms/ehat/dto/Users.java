package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

/*@Entity
@Table(name = "users")*/
public class Users implements Serializable {

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
	//@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "Availability")
	private String availability;

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
	private String mulSelunit;

	@Column(name = "dept_id")
	private String mulDeptid;

	@Column(name = "service_id")
	private String mulServiceid;

	@Column(name = "empIdhr")
	private String empIdHr;

	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "created_date")
	private String created_Date;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "software_used",columnDefinition="varchar(2) default 'N'")
	private String softwareUsed="N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "sign_one")
	private String sign_one;

	@Column(name = "sign_one_doctor")
	private String sign_one_doctor;

	@Column(name = "sign_two")
	private String sign_two;

	@Column(name = "sign_two_doctor")
	private String sign_two_doctor;

	@Transient
	private int userid;

	@Transient
	private String username;

	@Transient
	private int doc_id;

	@Transient
	private String doc_name;

	@OneToOne(fetch = FetchType.EAGER, mappedBy = "UserDetails", cascade = CascadeType.ALL)
	@Transient
	@JsonIgnore
	private Doctor objDoctor;

	@Transient
	private List<Users> userlist;

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
	public String getAvailability() {
		return availability;
	}
	public void setAvailability(String availability) {
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
	public String getCreated_Date() {
		return created_Date;
	}
	public void setCreated_Date(String created_Date) {
		this.created_Date = created_Date;
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
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	public String getSoftwareUsed() {
		return softwareUsed;
	}
	public void setSoftwareUsed(String softwareUsed) {
		this.softwareUsed = softwareUsed;
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
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getMulSelunit() {
		return mulSelunit;
	}
	public void setMulSelunit(String mulSelunit) {
		this.mulSelunit = mulSelunit;
	}
	public String getMulDeptid() {
		return mulDeptid;
	}
	public void setMulDeptid(String mulDeptid) {
		this.mulDeptid = mulDeptid;
	}
	public String getMulServiceid() {
		return mulServiceid;
	}
	public void setMulServiceid(String mulServiceid) {
		this.mulServiceid = mulServiceid;
	}
	public List<Users> getUserlist() {
		return userlist;
	}
	public void setUserlist(List<Users> userlist) {
		this.userlist = userlist;
	}
	//@JsonGetter("userid")
	public int getUserid() {
		return userid;
	}
	//@JsonSetter("userid")
	public void setUserid(int userid) {
		this.userid = userid;
	}
	//@JsonGetter("username")
	public String getUsername() {
		return username;
	}
	//@JsonSetter("username")
	public void setUsername(String username) {
		this.username = username;
	}
	public int getDoc_id() {
		return doc_id;
	}
	public void setDoc_id(int doc_id) {
		this.doc_id = doc_id;
	}
	public String getDoc_name() {
		return doc_name;
	}
	public void setDoc_name(String doc_name) {
		this.doc_name = doc_name;
	}
	public Doctor getObjDoctor() {
		return objDoctor;
	}
	public void setObjDoctor(Doctor objDoctor) {
		this.objDoctor = objDoctor;
	}
	public String getSign_one() {
		return sign_one;
	}
	public void setSign_one(String sign_one) {
		this.sign_one = sign_one;
	}
	public String getSign_one_doctor() {
		return sign_one_doctor;
	}
	public void setSign_one_doctor(String sign_one_doctor) {
		this.sign_one_doctor = sign_one_doctor;
	}
	public String getSign_two() {
		return sign_two;
	}
	public void setSign_two(String sign_two) {
		this.sign_two = sign_two;
	}
	public String getSign_two_doctor() {
		return sign_two_doctor;
	}
	public void setSign_two_doctor(String sign_two_doctor) {
		this.sign_two_doctor = sign_two_doctor;
	}
	
	
}
