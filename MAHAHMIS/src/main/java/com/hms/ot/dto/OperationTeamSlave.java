package com.hms.ot.dto;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.hms.dto.Doctor;

@Entity
@Table(name = "operation_team_slave")
public class OperationTeamSlave implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idoperation_team_slave")
	private Integer teamSlaveId;

	@ManyToOne
	@JoinColumn(name = "idoperation_team_master")
	@JsonIgnore
	private OperationTeam operationTeam;
	
	@Column(name = "user_id")
	private int user_ID;
	
	@Column(name = "user_name")
	private String userName;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "type")
	private String type;
	
	@Column(name = "doctype")
	private String doctype;
	
	@OneToOne(fetch = FetchType.EAGER, mappedBy = "UserDetails", cascade = CascadeType.ALL)
	//@Transient
	@JsonIgnore
	private Doctor objDoctor;
	
	@Transient
	private String speciality;
	
	@Transient
	private String department;
	
	@Transient
	private String doctor_type;
	
	@Transient
	private String contact_no;
	
	@Transient
	private String email_id;
	
	
	public Integer getTeamSlaveId() {
		return teamSlaveId;
	}

	public void setTeamSlaveId(Integer teamSlaveId) {
		this.teamSlaveId = teamSlaveId;
	}

	public OperationTeam getOperationTeam() {
		return operationTeam;
	}

	public void setOperationTeam(OperationTeam operationTeam) {
		this.operationTeam = operationTeam;
	}

	@JsonGetter("ui")
	public int getUser_ID() {
		return user_ID;
	}

	@JsonSetter("ui")
	public void setUser_ID(int user_ID) {
		this.user_ID = user_ID;
	}
	
	@JsonGetter("fuNm")
	public String getUserName() {
		return userName;
	}
	
	@JsonSetter("fuNm")
	public void setUserName(String userName) {
		this.userName = userName;
	}

	@JsonSetter("st")
	public String getStatus() {
		return status;
	}

	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("ut")
	public String getType() {
		return type;
	}

	@JsonSetter("ut")
	public void setType(String type) {
		this.type = type;
	}

	public String getDoctype() {
		return doctype;
	}

	public void setDoctype(String doctype) {
		this.doctype = doctype;
	}

	@JsonSetter("obd")
	public void setObjDoctor(Doctor objDoctor) {
		this.objDoctor = objDoctor;
	}

	@JsonGetter("obd")
	public Doctor getObjDoctor() {
		return objDoctor;
	}

	public String getSpeciality() {
		return speciality;
	}

	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getDoctor_type() {
		return doctor_type;
	}

	public void setDoctor_type(String doctor_type) {
		this.doctor_type = doctor_type;
	}

	public String getContact_no() {
		return contact_no;
	}

	public void setContact_no(String contact_no) {
		this.contact_no = contact_no;
	}

	public String getEmail_id() {
		return email_id;
	}

	public void setEmail_id(String email_id) {
		this.email_id = email_id;
	}

}
