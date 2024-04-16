package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "pharma_doctor_master")
public class DoctorMaster implements Serializable
{
	
	@Id
	@GeneratedValue
	@Column(name = "doctor_id")
	private Integer doctorId;

	@Column(name = "doctor_name")
	private String doctorName;

	@Column(name = "doctor_address")
	private String doctorAddress;

	@Column(name = "doctor_phone")
	private String doctorPhone;

	@Column(name = "doctor_reg_no")
	private String doctorRegNo;

	@Column(name = "doctor_delete_flag")
	private Integer doctorDeleteFlag;

	@Column(name = "doctor_update_date")
	private Date doctorUpdateDate;
	
	public Date getDoctorAddDate() {
		return doctorAddDate;
	}

	public void setDoctorAddDate(Date doctorAddDate) {
		this.doctorAddDate = doctorAddDate;
	}

	@Column(name = "doctor_add_date")
	private Date doctorAddDate;

	public Integer getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getDoctorAddress() {
		return doctorAddress;
	}

	public void setDoctorAddress(String doctorAddress) {
		this.doctorAddress = doctorAddress;
	}

	public String getDoctorPhone() {
		return doctorPhone;
	}

	public void setDoctorPhone(String doctorPhone) {
		this.doctorPhone = doctorPhone;
	}

	public String getDoctorRegNo() {
		return doctorRegNo;
	}

	public void setDoctorRegNo(String doctorRegNo) {
		this.doctorRegNo = doctorRegNo;
	}

	public Integer getDoctorDeleteFlag() {
		return doctorDeleteFlag;
	}

	public void setDoctorDeleteFlag(Integer doctorDeleteFlag) {
		this.doctorDeleteFlag = doctorDeleteFlag;
	}

	public Date getDoctorUpdateDate() {
		return doctorUpdateDate;
	}

	public void setDoctorUpdateDate(Date doctorUpdateDate) {
		this.doctorUpdateDate = doctorUpdateDate;
	}

}
