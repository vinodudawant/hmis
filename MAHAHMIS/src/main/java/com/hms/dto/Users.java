package com.hms.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

//import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonSetter;
import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

@Entity
@Table(name = "users")
public class Users implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "User_ID")
	private int user_ID;
	
	@Column(name = "full_name")
	private String full_name;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "f_name")
	private String f_name;
	
	@Column(name = "m_name")
	private String m_name;
	
	@Column(name = "l_name")
	private String l_name;
	
	@Column(name = "User_Name")
	private String user_Name;
	
	@Column(name = "user_Type")
	private String user_Type;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "created_date")
	private String created_Date;
	
	@Column(name = "Availability")
	private String availability;
	
	@Column(name = "status")
	private String status;
	
	@Transient
	private List<Users> usersList;
	
	@Transient
	private int doc_id;
	
	@Transient
	private Integer usersCount;
	
	@Transient
	private String doc_name;
	
	//@OneToOne(fetch = FetchType.EAGER, mappedBy = "UserDetails", cascade = CascadeType.ALL)
	//@Transient
	 @JsonIgnore
	@OneToOne( mappedBy = "UserDetails")
	private Doctor objDoctor;
	
	@Column(name = "last_loged_in_date_time")
	private String last_loged_in_date_time;
	
	@Column(name = "last_loged_out_date_time")
	private String last_loged_out_date_time;
	
	@Column(name = "current_loged_in_date_time")
	private String current_loged_in_date_time;
	
	@Column(name = "current_loged_out_date_time")
	private String current_loged_out_date_time;
	
	@Column(name = "software_used",columnDefinition="varchar(2) default 'N'")
	private String softwareUsed;
	
	//@Name: paras suryawanshi @date: 18-5-2017 @reason: doctor type master
	@Column(name = "doctype_id")
	private int	dcTypeMasterID;
	
	@Column(name = "unitmaster_id")
	private String  mulSelunit;
	
	// added by kishor @date 15/3/2018
	@Column(name = "doctor_type_id_list")
	private String  doctorTypeIdList;
	
	@Column(name = "dept_id")
	private String  mulDeptid; //@Name: Sagar Kadam @date:07/07/-2017 @reason: dept master
	
	@Column(name = "service_id")
	private String  mulServiceid;  //@Name: Sagar Kadam @date:07/07/-2017 @reason: dept master
		
	//added by Vinod  @date 20/11/2017
	private String  adminServiceid;
	
	@Column(name = "empIdhr")
	private String empIdhr;
	
	@Column(name = "loged_in_status")
	private String logedInStatus;
	
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

	@Column(name = "sign_one")
	private String sign_one;

	@Column(name = "sign_one_doctor")
	private String sign_one_doctor;

	@Column(name = "sign_two")
	private String sign_two;

	@Column(name = "sign_two_doctor")
	private String sign_two_doctor;
	
	//Added By Badrinath  @date 04/07/2023
	@Column(name = "all_services_flag",columnDefinition="varchar(2) default 'N'")
	private String allServicesFlag;
	
	//Added By Badrinath  @date 04/07/2023
	@Column(name = "add_user_sign",columnDefinition="varchar(2) default 'N'")
	private String addUserSign;
	
	@Transient
	private Integer userid;
	
	@Transient
	private String username;

	
	@JsonGetter("empIdhr")
	public String getEmpIdhr() {
		return empIdhr;
	}
	@JsonSetter("empIdhr")
	public void setEmpIdhr(String empIdhr) {
		this.empIdhr = empIdhr;
	}
	@JsonGetter("mulDeptid")
	public String getMulDeptid() {
		return mulDeptid;
	}
	@JsonSetter("mulDeptid")
	public void setMulDeptid(String mulDeptid) {
		this.mulDeptid = mulDeptid;
	}
	@JsonGetter("mulServiceid")
	public String getMulServiceid() {
		return mulServiceid;
	}
	@JsonSetter("mulServiceid")
	public void setMulServiceid(String mulServiceid) {
		this.mulServiceid = mulServiceid;
	}
	@JsonGetter("mulSelunit")
	public String getMulSelunit() {
		return mulSelunit;
	}
	@JsonSetter("mulSelunit")
	public void setMulSelunit(String mulSelunit) {
		this.mulSelunit = mulSelunit;
	}
	@JsonGetter("dcTypeMasterID")
	public int getDcTypeMasterID() {
		return dcTypeMasterID;
	}
	@JsonSetter("dcTypeMasterID")
	public void setDcTypeMasterID(int dcTypeMasterID) {
		this.dcTypeMasterID = dcTypeMasterID;
	}
	
	public String getSoftwareUsed() {
		return softwareUsed;
	}

	public void setSoftwareUsed(String softwareUsed) {
		this.softwareUsed = softwareUsed;
	}

	public String getAdminServiceid() {
		return adminServiceid;
	}
	public void setAdminServiceid(String adminServiceid) {
		this.adminServiceid = adminServiceid;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
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

	@JsonGetter("ua")
	public String getAvailability() {
		return availability;
	}

	@JsonSetter("ua")
	public void setAvailability(String availability) {
		this.availability = availability;
	}

	@JsonGetter("ul")
	public List<Users> getUsersList() {
		return usersList;
	}

	@JsonSetter("ul")
	public void setUsersList(List<Users> usersList) {
		this.usersList = usersList;
	}

	public Users() {

	}

	public Users(String user_Name, String user_Type, String password) {

		this.password = password;
		this.user_Name = user_Name;
		this.user_Type = user_Type;
	}

	public Users(int user_ID, String user_Name, String user_Type,
			String password, String created_Date) {

		this.password = password;
		this.user_ID = user_ID;
		this.user_Name = user_Name;
		this.user_Type = user_Type;
		this.created_Date = created_Date;
	}

	@JsonGetter("cd")
	public String getCreated_Date() {
		return created_Date;
	}

	@JsonSetter("cd")
	public void setCreated_Date(String created_Date) {
		this.created_Date = created_Date;
	}

	@JsonGetter("ui")
	public int getUser_ID() {
		return user_ID;
	}

	@JsonSetter("ui")
	public void setUser_ID(int user_ID) {
		this.user_ID = user_ID;
	}

	@JsonGetter("un")
	public String getUser_Name() {
		return user_Name;
	}

	@JsonSetter("un")
	public void setUser_Name(String user_Name) {
		this.user_Name = user_Name;
	}

	@JsonGetter("ut")
	public String getUser_Type() {
		return user_Type;
	}

	@JsonSetter("ut")
	public void setUser_Type(String user_Type) {
		this.user_Type = user_Type;
	}

	@JsonGetter("up")
	public String getPassword() {
		return password;
	}

	@JsonSetter("up")
	public void setPassword(String password) {
		this.password = password;
	}

	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	 //@JsonIgnore
	//@JsonSetter("obd")
	public void setObjDoctor(Doctor objDoctor) {
		this.objDoctor = objDoctor;
	}
	// @JsonIgnore
	//@JsonGetter("obd")
	public Doctor getObjDoctor() {
		return objDoctor;
	}
	@JsonGetter("fuNm")
	public String getFull_name() {
		return full_name;
	}
	@JsonSetter("fuNm")
	public void setFull_name(String full_name) {
		this.full_name = full_name;
	}
	@JsonGetter("title")
	public String getTitle() {
		return title;
	}
	@JsonSetter("title")
	public void setTitle(String title) {
		this.title = title;
	}
	@JsonGetter("fname")
	public String getF_name() {
		return f_name;
	}
	@JsonSetter("fname")
	public void setF_name(String f_name) {
		this.f_name = f_name;
	}
	@JsonGetter("mname")
	public String getM_name() {
		return m_name;
	}
	@JsonSetter("mname")
	public void setM_name(String m_name) {
		this.m_name = m_name;
	}
	@JsonGetter("lname")
	public String getL_name() {
		return l_name;
	}
	@JsonSetter("lname")
	public void setL_name(String l_name) {
		this.l_name = l_name;
	}
	public String getLast_loged_in_date_time() {
		return last_loged_in_date_time;
	}

	public void setLast_loged_in_date_time(String last_loged_in_date_time) {
		this.last_loged_in_date_time = last_loged_in_date_time;
	}

	public String getLast_loged_out_date_time() {
		return last_loged_out_date_time;
	}

	public void setLast_loged_out_date_time(String last_loged_out_date_time) {
		this.last_loged_out_date_time = last_loged_out_date_time;
	}

	public String getCurrent_loged_in_date_time() {
		return current_loged_in_date_time;
	}

	public void setCurrent_loged_in_date_time(String current_loged_in_date_time) {
		this.current_loged_in_date_time = current_loged_in_date_time;
	}

	public String getCurrent_loged_out_date_time() {
		return current_loged_out_date_time;
	}

	public void setCurrent_loged_out_date_time(String current_loged_out_date_time) {
		this.current_loged_out_date_time = current_loged_out_date_time;
	}
	public String getDoctorTypeIdList() {
		return doctorTypeIdList;
	}
	public void setDoctorTypeIdList(String doctorTypeIdList) {
		this.doctorTypeIdList = doctorTypeIdList;
	}
	public String getLogedInStatus() {
		return logedInStatus;
	}
	public void setLogedInStatus(String logedInStatus) {
		this.logedInStatus = logedInStatus;
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
	public Integer getUserid() {
		return userid;
	}
	public void setUserid(Integer userid) {
		this.userid = userid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
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
	
	public String getAllServicesFlag() {
		return allServicesFlag;
	}
	public void setAllServicesFlag(String allServicesFlag) {
		this.allServicesFlag = allServicesFlag;
	}
	
	public String getAddUserSign() {
		return addUserSign;
	}
	public void setAddUserSign(String addUserSign) {
		this.addUserSign = addUserSign;
	}
	
	public Integer getUsersCount() {
		return usersCount;
	}
	public void setUsersCount(Integer usersCount) {
		this.usersCount = usersCount;
	}
	@Override
	public String toString() {
		return "Users [user_ID=" + user_ID + ", full_name=" + full_name + ", title=" + title + ", f_name=" + f_name
				+ ", m_name=" + m_name + ", l_name=" + l_name + ", user_Name=" + user_Name + ", user_Type=" + user_Type
				+ ", password=" + password + ", created_Date=" + created_Date + ", availability=" + availability
				+ ", status=" + status + ", usersList=" + usersList + ", doc_id=" + doc_id + ", usersCount="
				+ usersCount + ", doc_name=" + doc_name + ", objDoctor=" + objDoctor + ", last_loged_in_date_time="
				+ last_loged_in_date_time + ", last_loged_out_date_time=" + last_loged_out_date_time
				+ ", current_loged_in_date_time=" + current_loged_in_date_time + ", current_loged_out_date_time="
				+ current_loged_out_date_time + ", softwareUsed=" + softwareUsed + ", dcTypeMasterID=" + dcTypeMasterID
				+ ", mulSelunit=" + mulSelunit + ", doctorTypeIdList=" + doctorTypeIdList + ", mulDeptid=" + mulDeptid
				+ ", mulServiceid=" + mulServiceid + ", adminServiceid=" + adminServiceid + ", empIdhr=" + empIdhr
				+ ", logedInStatus=" + logedInStatus + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", createdDate=" + createdDate + ", updatedDate=" + updatedDate + ", deleted=" + deleted
				+ ", deletedBy=" + deletedBy + ", deletedDate=" + deletedDate + ", unitId=" + unitId + ", sign_one="
				+ sign_one + ", sign_one_doctor=" + sign_one_doctor + ", sign_two=" + sign_two + ", sign_two_doctor="
				+ sign_two_doctor + ", allServicesFlag=" + allServicesFlag + ", addUserSign=" + addUserSign
				+ ", userid=" + userid + ", username=" + username + "]";
	}
	
	
	
}