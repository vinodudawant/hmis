package com.hms.ehat.dto;

import java.util.List;

public class DashboardDto {

	Number patientCount;
	int opdCount,ipdCount,diagCount,opdServCount,ipdServCount,diagServCount,availBedCount,cleanBedCount,allotBedCount,oprCount,unitId,userId;
	double grossOpd,grossIpd,grossDiag;
	double discOpd,discIpd,discDiag;
	double netOpd,netIpd,netDiag;
	double recOpd,recIpd,recDiag,recPatient;
	String callFrom,fromDate,toDate,dateForCount;
	List<DashboardDto> lstCount;
	List<DashboardDto> lstGraphDto;
	
	public Number getPatientCount() {
		return patientCount;
	}
	public void setPatientCount(Number patientCount) {
		this.patientCount = patientCount;
	}
	public int getOpdCount() {
		return opdCount;
	}
	public void setOpdCount(int opdCount) {
		this.opdCount = opdCount;
	}
	public int getIpdCount() {
		return ipdCount;
	}
	public void setIpdCount(int ipdCount) {
		this.ipdCount = ipdCount;
	}
	public int getDiagCount() {
		return diagCount;
	}
	public void setDiagCount(int diagCount) {
		this.diagCount = diagCount;
	}
	public int getOpdServCount() {
		return opdServCount;
	}
	public void setOpdServCount(int opdServCount) {
		this.opdServCount = opdServCount;
	}
	public int getIpdServCount() {
		return ipdServCount;
	}
	public void setIpdServCount(int ipdServCount) {
		this.ipdServCount = ipdServCount;
	}
	public int getDiagServCount() {
		return diagServCount;
	}
	public void setDiagServCount(int diagServCount) {
		this.diagServCount = diagServCount;
	}
	public int getAvailBedCount() {
		return availBedCount;
	}
	public void setAvailBedCount(int availBedCount) {
		this.availBedCount = availBedCount;
	}
	public int getCleanBedCount() {
		return cleanBedCount;
	}
	public void setCleanBedCount(int cleanBedCount) {
		this.cleanBedCount = cleanBedCount;
	}
	public int getAllotBedCount() {
		return allotBedCount;
	}
	public void setAllotBedCount(int allotBedCount) {
		this.allotBedCount = allotBedCount;
	}
	public int getOprCount() {
		return oprCount;
	}
	public void setOprCount(int oprCount) {
		this.oprCount = oprCount;
	}
	public int getUnitId() {
		return unitId;
	}
	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public double getGrossOpd() {
		return grossOpd;
	}
	public void setGrossOpd(double grossOpd) {
		this.grossOpd = grossOpd;
	}
	public double getGrossIpd() {
		return grossIpd;
	}
	public void setGrossIpd(double grossIpd) {
		this.grossIpd = grossIpd;
	}
	public double getGrossDiag() {
		return grossDiag;
	}
	public void setGrossDiag(double grossDiag) {
		this.grossDiag = grossDiag;
	}
	public double getDiscOpd() {
		return discOpd;
	}
	public void setDiscOpd(double discOpd) {
		this.discOpd = discOpd;
	}
	public double getDiscIpd() {
		return discIpd;
	}
	public void setDiscIpd(double discIpd) {
		this.discIpd = discIpd;
	}
	public double getDiscDiag() {
		return discDiag;
	}
	public void setDiscDiag(double discDiag) {
		this.discDiag = discDiag;
	}
	public double getNetOpd() {
		return netOpd;
	}
	public void setNetOpd(double netOpd) {
		this.netOpd = netOpd;
	}
	public double getNetIpd() {
		return netIpd;
	}
	public void setNetIpd(double netIpd) {
		this.netIpd = netIpd;
	}
	public double getNetDiag() {
		return netDiag;
	}
	public void setNetDiag(double netDiag) {
		this.netDiag = netDiag;
	}
	public double getRecOpd() {
		return recOpd;
	}
	public void setRecOpd(double recOpd) {
		this.recOpd = recOpd;
	}
	public double getRecIpd() {
		return recIpd;
	}
	public void setRecIpd(double recIpd) {
		this.recIpd = recIpd;
	}
	public double getRecDiag() {
		return recDiag;
	}
	public void setRecDiag(double recDiag) {
		this.recDiag = recDiag;
	}
	public double getRecPatient() {
		return recPatient;
	}
	public void setRecPatient(double recPatient) {
		this.recPatient = recPatient;
	}
	public String getCallFrom() {
		return callFrom;
	}
	public void setCallFrom(String callFrom) {
		this.callFrom = callFrom;
	}
	public String getFromDate() {
		return fromDate;
	}
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}
	public String getToDate() {
		return toDate;
	}
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}
	public String getDateForCount() {
		return dateForCount;
	}
	public void setDateForCount(String dateForCount) {
		this.dateForCount = dateForCount;
	}
	public List<DashboardDto> getLstCount() {
		return lstCount;
	}
	public void setLstCount(List<DashboardDto> lstCount) {
		this.lstCount = lstCount;
	}
	public List<DashboardDto> getLstGraphDto() {
		return lstGraphDto;
	}
	public void setLstGraphDto(List<DashboardDto> lstGraphDto) {
		this.lstGraphDto = lstGraphDto;
	}
}
