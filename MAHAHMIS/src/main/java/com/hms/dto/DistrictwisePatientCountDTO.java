package com.hms.dto;

import java.util.List;

public class DistrictwisePatientCountDTO {
	
	private String districtName;
	private Integer monthlyOPD;
	private Integer progressiveOPD;
	private Integer monthlyIPD;
	private Integer progressiveIPD;
	private List<DistrictwisePatientCountDTO> lDistrictwisePatientCountDTOs;
	
	public List<DistrictwisePatientCountDTO> getlDistrictwisePatientCountDTOs() {
		return lDistrictwisePatientCountDTOs;
	}
	
	public void setlDistrictwisePatientCountDTOs(
			List<DistrictwisePatientCountDTO> lDistrictwisePatientCountDTOs) {
		this.lDistrictwisePatientCountDTOs = lDistrictwisePatientCountDTOs;
	}
	
	public String getDistrictName() {
		return districtName;
	}
	
	public void setDistrictName(String districtName) {
		this.districtName = districtName;
	}
	
	public Integer getMonthlyOPD() {
		return monthlyOPD;
	}
	
	public void setMonthlyOPD(Integer monthlyOPD) {
		this.monthlyOPD = monthlyOPD;
	}
	
	public Integer getProgressiveOPD() {
		return progressiveOPD;
	}
	
	public void setProgressiveOPD(Integer progressiveOPD) {
		this.progressiveOPD = progressiveOPD;
	}
	
	public Integer getMonthlyIPD() {
		return monthlyIPD;
	}
	
	public void setMonthlyIPD(Integer monthlyIPD) {
		this.monthlyIPD = monthlyIPD;
	}
	
	public Integer getProgressiveIPD() {
		return progressiveIPD;
	}
	
	public void setProgressiveIPD(Integer progressiveIPD) {
		this.progressiveIPD = progressiveIPD;
	}
	

}
