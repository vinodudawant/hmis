package com.hms.ipd.dto;

import java.math.BigInteger;
import java.util.List;

/************
 * @author : vishant pawar
 * @date : 27-Oct-2023
 * @codeFor : fetch ipd dto
 ************/
public class IPDMisReportDTO {

	private String name1;
	private BigInteger patientCount;
	private Double totalBill;
	private Double totalDiscount;

	private BigInteger PatientRefCount;
	private BigInteger PatientSelfCount;
	private Double PatientRefAmount;
	private Double PatientSelfAmount;
	private Double PatientRefDis;
	private Double PatientSelfDis;

	private String stringType;

	public String getStringType() {
		return stringType;
	}

	public void setStringType(String stringType) {
		this.stringType = stringType;
	}

	public BigInteger getPatientRefCount() {
		return PatientRefCount;
	}

	public void setPatientRefCount(BigInteger patientRefCount) {
		PatientRefCount = patientRefCount;
	}

	public BigInteger getPatientSelfCount() {
		return PatientSelfCount;
	}

	public void setPatientSelfCount(BigInteger patientSelfCount) {
		PatientSelfCount = patientSelfCount;
	}

	public Double getPatientRefAmount() {
		return PatientRefAmount;
	}

	public void setPatientRefAmount(Double patientRefAmount) {
		PatientRefAmount = patientRefAmount;
	}

	public Double getPatientSelfAmount() {
		return PatientSelfAmount;
	}

	public void setPatientSelfAmount(Double patientSelfAmount) {
		PatientSelfAmount = patientSelfAmount;
	}

	public Double getPatientRefDis() {
		return PatientRefDis;
	}

	public void setPatientRefDis(Double patientRefDis) {
		PatientRefDis = patientRefDis;
	}

	public Double getPatientSelfDis() {
		return PatientSelfDis;
	}

	public void setPatientSelfDis(Double patientSelfDis) {
		PatientSelfDis = patientSelfDis;
	}

	private List<IPDMisReportDTO> list;

	public List<IPDMisReportDTO> getList() {
		return list;
	}

	public void setList(List<IPDMisReportDTO> list) {
		this.list = list;
	}

	public String getName1() {
		return name1;
	}

	public void setName1(String name1) {
		this.name1 = name1;
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

	public Double getTotalDiscount() {
		return totalDiscount;
	}

	public void setTotalDiscount(Double totalDiscount) {
		this.totalDiscount = totalDiscount;
	}

}
