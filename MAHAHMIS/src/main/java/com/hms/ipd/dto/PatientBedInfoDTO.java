package com.hms.ipd.dto;

import java.math.BigInteger;
import java.util.List;

import javax.persistence.Transient;

public class PatientBedInfoDTO {
	
	int bedId;
	
	int hallTypeId;
	
	int hallId;
	
	String idbedstate;
	
	String wardName;
	
	Number isSponsorConfig;
	
	double isoBedCharges;
	
	double normalBedCharges;
	
	double isoNurseCharges;
	
	double normalNurseCharges;
	
	double rehPackCharges;
	
	double sponsorHallCharges;
	
	double sponsorNursingCharges;
	
	double sponsorIsoHallCharges;
	
	double sponsorIsoNursingCharges;
	
	String centerPatientId;
	
	BigInteger patientId;
	
	String patientName;
	
	BigInteger treatmentId;
	
	String doctorId;
	
	String doctorName;
	
	BigInteger noOfBeds;
	
	String mrnNo;
	
	String bedName;
	
	String inDateTime;
	
	BigInteger admitDays;
	
	List<PatientBedInfoDTO>  lstPatientBedInfoDTO;
	
	
	
	@Transient
	private String category_name;

	@Transient
	private BigInteger charges_slave_id;
	
	
	@Transient
	private BigInteger age;
	
	@Transient
	private String discharge_date;
	
	public String getDischarge_date() {
		return discharge_date;
	}

	public void setDischarge_date(String discharge_date) {
		this.discharge_date = discharge_date;
	}

	@Transient
	private String gender;
	

	public String getGender() {
		return gender;
	}

	public BigInteger getCharges_slave_id() {
		return charges_slave_id;
	}

	public void setCharges_slave_id(BigInteger charges_slave_id) {
		this.charges_slave_id = charges_slave_id;
	}

	public BigInteger getAge() {
		return age;
	}

	public void setAge(BigInteger age) {
		this.age = age;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	
	

	public String getCategory_name() {
		return category_name;
	}

	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}

	public int getBedId() {
		return bedId;
	}

	public void setBedId(int bedId) {
		this.bedId = bedId;
	}
	public int getHallTypeId() {
		return hallTypeId;
	}

	public void setHallTypeId(int hallTypeId) {
		this.hallTypeId = hallTypeId;
	}

	public int getHallId() {
		return hallId;
	}

	public void setHallId(int hallId) {
		this.hallId = hallId;
	}

	public String getIdbedstate() {
		return idbedstate;
	}

	public void setIdbedstate(String idbedstate) {
		this.idbedstate = idbedstate;
	}

	public String getWardName() {
		return wardName;
	}

	public Number getIsSponsorConfig() {
		return isSponsorConfig;
	}

	public void setIsSponsorConfig(Number isSponsorConfig) {
		this.isSponsorConfig = isSponsorConfig;
	}

	public void setWardName(String wardName) {
		this.wardName = wardName;
	}

	public double getIsoBedCharges() {
		return isoBedCharges;
	}

	public void setIsoBedCharges(double isoBedCharges) {
		this.isoBedCharges = isoBedCharges;
	}

	public double getNormalBedCharges() {
		return normalBedCharges;
	}

	public void setNormalBedCharges(double normalBedCharges) {
		this.normalBedCharges = normalBedCharges;
	}

	public double getIsoNurseCharges() {
		return isoNurseCharges;
	}

	public void setIsoNurseCharges(double isoNurseCharges) {
		this.isoNurseCharges = isoNurseCharges;
	}

	public double getNormalNurseCharges() {
		return normalNurseCharges;
	}

	public void setNormalNurseCharges(double normalNurseCharges) {
		this.normalNurseCharges = normalNurseCharges;
	}

	public double getRehPackCharges() {
		return rehPackCharges;
	}

	public void setRehPackCharges(double rehPackCharges) {
		this.rehPackCharges = rehPackCharges;
	}

	public double getSponsorHallCharges() {
		return sponsorHallCharges;
	}

	public void setSponsorHallCharges(double sponsorHallCharges) {
		this.sponsorHallCharges = sponsorHallCharges;
	}

	public double getSponsorNursingCharges() {
		return sponsorNursingCharges;
	}

	public void setSponsorNursingCharges(double sponsorNursingCharges) {
		this.sponsorNursingCharges = sponsorNursingCharges;
	}

	public double getSponsorIsoHallCharges() {
		return sponsorIsoHallCharges;
	}

	public void setSponsorIsoHallCharges(double sponsorIsoHallCharges) {
		this.sponsorIsoHallCharges = sponsorIsoHallCharges;
	}

	public double getSponsorIsoNursingCharges() {
		return sponsorIsoNursingCharges;
	}

	public void setSponsorIsoNursingCharges(double sponsorIsoNursingCharges) {
		this.sponsorIsoNursingCharges = sponsorIsoNursingCharges;
	}

	public String getCenterPatientId() {
		return centerPatientId;
	}

	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}

	public BigInteger getPatientId() {
		return patientId;
	}

	public void setPatientId(BigInteger patientId) {
		this.patientId = patientId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public BigInteger getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(BigInteger treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(String doctorId) {
		this.doctorId = doctorId;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public BigInteger getNoOfBeds() {
		return noOfBeds;
	}

	public void setNoOfBeds(BigInteger noOfBeds) {
		this.noOfBeds = noOfBeds;
	}

	public String getMrnNo() {
		return mrnNo;
	}

	public void setMrnNo(String mrnNo) {
		this.mrnNo = mrnNo;
	}

	public String getBedName() {
		return bedName;
	}

	public void setBedName(String bedName) {
		this.bedName = bedName;
	}

	public String getInDateTime() {
		return inDateTime;
	}

	public void setInDateTime(String inDateTime) {
		this.inDateTime = inDateTime;
	}

	public BigInteger getAdmitDays() {
		return admitDays;
	}

	public void setAdmitDays(BigInteger admitDays) {
		this.admitDays = admitDays;
	}

	public List<PatientBedInfoDTO> getLstPatientBedInfoDTO() {
		return lstPatientBedInfoDTO;
	}

	public void setLstPatientBedInfoDTO(List<PatientBedInfoDTO> lstPatientBedInfoDTO) {
		this.lstPatientBedInfoDTO = lstPatientBedInfoDTO;
	}	
}
