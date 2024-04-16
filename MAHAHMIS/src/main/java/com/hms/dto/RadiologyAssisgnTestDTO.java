package com.hms.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

/**
 * @author Aniket Kanse
 * @since 04/11/2020
 */
@Entity
@Immutable
@Table(name = "radiology_assign_test")
public class RadiologyAssisgnTestDTO implements Serializable{

	private static final long serialVersionUID = -2780707232164902465L;
	
	@Id
	@Column(name = "idradiology_test")
	private Integer idRadiologyTest;
	
	@Column(name = "idradiology_file_master")
	private Integer idRadiologyFileMaster;
	
	@Column(name = "idtest_radiology")
	private Integer idTestRadiology;
	
	@Column(name = "test_amount")
	private Double testAmount;
	
	@Column(name = "asign_by")
	private Integer assignedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "assign_date")
	private Date assignedDate;
	
	@Column(name = "radiologyTestStatus")
	private String radiologyTestStatus;
	
	@Column(name = "radiologyInstruction")
	private String radiologyInstruction;
	
	@Column(name = "radiologyClinicalNote")
	private String radiologyClinicalNote;
	
	@Column(name = "radiologyUrgentflag")
	private String radiologyUrgentflag;
	
	@Column(name = "radiologyCreatinineFlag")
	private String radiologyCreatinineFlag;
	
	@Column(name = "idradiologyTestType")
	private Integer idRadiologyTestType;
	
	@Column(name = "idradiologyBodyPart")
	private Integer idradiologyBodyPart;
	
	@Column(name = "doctor")
	private Integer doctor;
	
	@Column(name = "hospital")
	private Integer hospital;
	
	@Column(name = "idradiology_test_name")
	private Integer idRadiologyTestName;
	
	@Column(name = "note")
	private String note;
	
	@Column(name = "arrivalTime")
	private String arrivalTime;
	
	@Column(name = "takenTime")
	private String takenTime;
	
	@Column(name = "radiologyRISFlag")
	private String radiologyRISFlag;
	
	@Column(name = "bill_details_id")
	private Integer billDetailsId;
	
	@Column(name = "checkUpDoneFlag")
	private String checkUpDoneFlag;
	
	//added by Rohit on 21-01-2021
	//if service is refunded before arrial or taken action then that show get not show in the ris records list 
	@Column(name = "ris_refund",columnDefinition="varchar(2) default 'N'")
	private String risRefund="N";

	@Transient
	private List<RadiologyAssisgnTestDTO> listRadiologyAssisgnTestDTO;

	public Integer getIdRadiologyTest() {
		return idRadiologyTest;
	}

	public void setIdRadiologyTest(Integer idRadiologyTest) {
		this.idRadiologyTest = idRadiologyTest;
	}

	public Integer getIdRadiologyFileMaster() {
		return idRadiologyFileMaster;
	}

	public void setIdRadiologyFileMaster(Integer idRadiologyFileMaster) {
		this.idRadiologyFileMaster = idRadiologyFileMaster;
	}

	public Integer getIdTestRadiology() {
		return idTestRadiology;
	}

	public void setIdTestRadiology(Integer idTestRadiology) {
		this.idTestRadiology = idTestRadiology;
	}

	public Double getTestAmount() {
		return testAmount;
	}

	public void setTestAmount(Double testAmount) {
		this.testAmount = testAmount;
	}

	public Integer getAssignedBy() {
		return assignedBy;
	}

	public void setAssignedBy(Integer assignedBy) {
		this.assignedBy = assignedBy;
	}

	public Date getAssignedDate() {
		return assignedDate;
	}

	public void setAssignedDate(Date assignedDate) {
		this.assignedDate = assignedDate;
	}

	public String getRadiologyTestStatus() {
		return radiologyTestStatus;
	}

	public void setRadiologyTestStatus(String radiologyTestStatus) {
		this.radiologyTestStatus = radiologyTestStatus;
	}

	public String getRadiologyInstruction() {
		return radiologyInstruction;
	}

	public void setRadiologyInstruction(String radiologyInstruction) {
		this.radiologyInstruction = radiologyInstruction;
	}

	public String getRadiologyClinicalNote() {
		return radiologyClinicalNote;
	}

	public void setRadiologyClinicalNote(String radiologyClinicalNote) {
		this.radiologyClinicalNote = radiologyClinicalNote;
	}

	public String getRadiologyUrgentflag() {
		return radiologyUrgentflag;
	}

	public void setRadiologyUrgentflag(String radiologyUrgentflag) {
		this.radiologyUrgentflag = radiologyUrgentflag;
	}

	public String getRadiologyCreatinineFlag() {
		return radiologyCreatinineFlag;
	}

	public void setRadiologyCreatinineFlag(String radiologyCreatinineFlag) {
		this.radiologyCreatinineFlag = radiologyCreatinineFlag;
	}

	public Integer getIdRadiologyTestType() {
		return idRadiologyTestType;
	}

	public void setIdRadiologyTestType(Integer idRadiologyTestType) {
		this.idRadiologyTestType = idRadiologyTestType;
	}

	public Integer getIdradiologyBodyPart() {
		return idradiologyBodyPart;
	}

	public void setIdradiologyBodyPart(Integer idradiologyBodyPart) {
		this.idradiologyBodyPart = idradiologyBodyPart;
	}

	public Integer getDoctor() {
		return doctor;
	}

	public void setDoctor(Integer doctor) {
		this.doctor = doctor;
	}

	public Integer getHospital() {
		return hospital;
	}

	public void setHospital(Integer hospital) {
		this.hospital = hospital;
	}

	public Integer getIdRadiologyTestName() {
		return idRadiologyTestName;
	}

	public void setIdRadiologyTestName(Integer idRadiologyTestName) {
		this.idRadiologyTestName = idRadiologyTestName;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getArrivalTime() {
		return arrivalTime;
	}

	public void setArrivalTime(String arrivalTime) {
		this.arrivalTime = arrivalTime;
	}

	public String getTakenTime() {
		return takenTime;
	}

	public void setTakenTime(String takenTime) {
		this.takenTime = takenTime;
	}

	public String getRadiologyRISFlag() {
		return radiologyRISFlag;
	}

	public void setRadiologyRISFlag(String radiologyRISFlag) {
		this.radiologyRISFlag = radiologyRISFlag;
	}

	public Integer getBillDetailsId() {
		return billDetailsId;
	}

	public void setBillDetailsId(Integer billDetailsId) {
		this.billDetailsId = billDetailsId;
	}

	public String getCheckUpDoneFlag() {
		return checkUpDoneFlag;
	}

	public void setCheckUpDoneFlag(String checkUpDoneFlag) {
		this.checkUpDoneFlag = checkUpDoneFlag;
	}

	public List<RadiologyAssisgnTestDTO> getListRadiologyAssisgnTestDTO() {
		return listRadiologyAssisgnTestDTO;
	}

	public void setListRadiologyAssisgnTestDTO(
			List<RadiologyAssisgnTestDTO> listRadiologyAssisgnTestDTO) {
		this.listRadiologyAssisgnTestDTO = listRadiologyAssisgnTestDTO;
	}
	
	public String getRisRefund() {
		return risRefund;
	}

	public void setRisRefund(String risRefund) {
		this.risRefund = risRefund;
	}

	@Override
	public String toString() {
		return "RadiologyAssisgnTestDTO [idRadiologyTest=" + idRadiologyTest
				+ ", idRadiologyFileMaster=" + idRadiologyFileMaster
				+ ", idTestRadiology=" + idTestRadiology + ", testAmount="
				+ testAmount + ", assignedBy=" + assignedBy + ", assignedDate="
				+ assignedDate + ", radiologyTestStatus=" + radiologyTestStatus
				+ ", radiologyInstruction=" + radiologyInstruction
				+ ", radiologyClinicalNote=" + radiologyClinicalNote
				+ ", radiologyUrgentflag=" + radiologyUrgentflag
				+ ", radiologyCreatinineFlag=" + radiologyCreatinineFlag
				+ ", idRadiologyTestType=" + idRadiologyTestType
				+ ", idradiologyBodyPart=" + idradiologyBodyPart + ", doctor="
				+ doctor + ", hospital=" + hospital + ", idRadiologyTestName="
				+ idRadiologyTestName + ", note=" + note + ", arrivalTime="
				+ arrivalTime + ", takenTime=" + takenTime
				+ ", radiologyRISFlag=" + radiologyRISFlag + ", billDetailsId="
				+ billDetailsId + ", checkUpDoneFlag=" + checkUpDoneFlag
				+ ", risRefund=" + risRefund + ", listRadiologyAssisgnTestDTO="
				+ listRadiologyAssisgnTestDTO + "]";
	}

	
	
	
	
}
