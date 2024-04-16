package com.hms.ipd.dto;

import java.math.BigInteger;
import java.util.List;

/************
 * @author : vishant pawar
 * @date : 27-Oct-2023
 * @codeFor : fetch opd dto
 ************/
public class OPDMisReportDTO {

	private String SpecialityName;
	private String doctorName;
	private BigInteger patientCount;
	private Double totalBill;
	
	private List<OPDMisReportDTO> list;
	
	
	

	public List<OPDMisReportDTO> getList() {
		return list;
	}

	public void setList(List<OPDMisReportDTO> list) {
		this.list = list;
	}

	public String getSpecialityName() {
		return SpecialityName;
	}

	public void setSpecialityName(String specialityName) {
		SpecialityName = specialityName;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public BigInteger getPatientCount() {
		return patientCount;
	}

	public void setPatientCount(BigInteger patientCount) {
		this.patientCount = patientCount;
	}

	public Double getTotalBill() {
		return totalBill;
	}

	public void setTotalBill(Double totalBill) {
		this.totalBill = totalBill;
	}

}
