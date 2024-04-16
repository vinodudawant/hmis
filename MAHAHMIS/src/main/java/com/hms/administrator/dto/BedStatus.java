package com.hms.administrator.dto;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="bedstate")
public class BedStatus {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idbedState;
	private String bedState;
	private String bedStateStatus;
	@Transient
	private List<BedStatus> bedstatuslist;
	
	public int getIdbedState() {
		return idbedState;
	}
	public void setIdbedState(int idbedState) {
		this.idbedState = idbedState;
	}
	public String getBedState() {
		return bedState;
	}
	public void setBedState(String bedState) {
		this.bedState = bedState;
	}
	public String getBedStateStatus() {
		return bedStateStatus;
	}
	public void setBedStateStatus(String bedStateStatus) {
		this.bedStateStatus = bedStateStatus;
	}
	public List<BedStatus> getBedstatuslist() {
		return bedstatuslist;
	}
	public void setBedstatuslist(List<BedStatus> bedstatuslist) {
		this.bedstatuslist = bedstatuslist;
	}
	@Override
	public String toString() {
		return "BedStatus [idbedState=" + idbedState + ", bedState=" + bedState
				+ ", bedStateStatus=" + bedStateStatus + ", bedstatuslist="
				+ bedstatuslist + ", getIdbedState()=" + getIdbedState()
				+ ", getBedState()=" + getBedState() + ", getBedStateStatus()="
				+ getBedStateStatus() + ", getBedstatuslist()="
				+ getBedstatuslist() + ", getClass()=" + getClass()
				+ ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
				+ "]";
	}
}
