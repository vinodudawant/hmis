package com.hms.ipd.dto;

import java.util.List;

public class SponsorTestChargesDto {

	private int chargesSlaveId;
	private int isComServId;
	private int isComServlastId;
	private int serviceid;
	private int unitId;
	private double charges,yearWiseCharges;
	private List<SponsorTestChargesDto> lstSponsorTestChargesDto;
	
	public int getChargesSlaveId() {
		return chargesSlaveId;
	}
	public void setChargesSlaveId(int chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}
	public int getIsComServId() {
		return isComServId;
	}
	public void setIsComServId(int isComServId) {
		this.isComServId = isComServId;
	}
	public int getIsComServlastId() {
		return isComServlastId;
	}
	public void setIsComServlastId(int isComServlastId) {
		this.isComServlastId = isComServlastId;
	}
	public int getServiceid() {
		return serviceid;
	}
	public void setServiceid(int serviceid) {
		this.serviceid = serviceid;
	}
	public int getUnitId() {
		return unitId;
	}
	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}
	public double getCharges() {
		return charges;
	}
	public void setCharges(double charges) {
		this.charges = charges;
	}
	public double getYearWiseCharges() {
		return yearWiseCharges;
	}
	public void setYearWiseCharges(double yearWiseCharges) {
		this.yearWiseCharges = yearWiseCharges;
	}
	public List<SponsorTestChargesDto> getLstSponsorTestChargesDto() {
		return lstSponsorTestChargesDto;
	}
	public void setLstSponsorTestChargesDto(List<SponsorTestChargesDto> lstSponsorTestChargesDto) {
		this.lstSponsorTestChargesDto = lstSponsorTestChargesDto;
	}
}
