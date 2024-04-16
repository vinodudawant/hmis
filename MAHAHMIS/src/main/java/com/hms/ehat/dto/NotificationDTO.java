package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import com.hms.ipdbill.dto.IpdBillPatientsDTO;

public class NotificationDTO {

	private int id;
	private int msgCount;
	private String msgText;
	private String logoClass;
	private String msgUrl;
	private Date noteDate;
	private List<NotificationDTO> lstNotify = null;
	private List lstDetails = null;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getMsgCount() {
		return msgCount;
	}
	public void setMsgCount(int msgCount) {
		this.msgCount = msgCount;
	}
	public String getMsgText() {
		return msgText;
	}
	public void setMsgText(String msgText) {
		this.msgText = msgText;
	}
	public String getLogoClass() {
		return logoClass;
	}
	public void setLogoClass(String logoClass) {
		this.logoClass = logoClass;
	}
	public String getMsgUrl() {
		return msgUrl;
	}
	public void setMsgUrl(String msgUrl) {
		this.msgUrl = msgUrl;
	}
	public Date getNoteDate() {
		return noteDate;
	}
	public void setNoteDate(Date noteDate) {
		this.noteDate = noteDate;
	}
	public List<NotificationDTO> getLstNotify() {
		return lstNotify;
	}
	public void setLstNotify(List<NotificationDTO> lstNotify) {
		this.lstNotify = lstNotify;
	}
	public List getLstDetails() {
		return lstDetails;
	}
	public void setLstDetails(List lstDetails) {
		this.lstDetails = lstDetails;
	}	
}
