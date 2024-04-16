package com.hms.doctordesk.dto;

public class DoctorDeskCountDto {
	private long opdcount;
	private long ipdcount;
	private long ercount;
	private long closedcount;
	public long getOpdcount() {
		return opdcount;
	}
	public void setOpdcount(long opdcount) {
		this.opdcount = opdcount;
	}
	public long getIpdcount() {
		return ipdcount;
	}
	public void setIpdcount(long ipdcount) {
		this.ipdcount = ipdcount;
	}
	public long getErcount() {
		return ercount;
	}
	public void setErcount(long ercount) {
		this.ercount = ercount;
	}
	public long getClosedcount() {
		return closedcount;
	}
	public void setClosedcount(long closedcount) {
		this.closedcount = closedcount;
	}
	

}
