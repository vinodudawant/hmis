package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LeaveMaster {
	private int idLeave_Master;
	private int User_ID;
	private String application_Date;
	private String from;
	private String to;
	private String days;
	private String balance;
	private String approve;
	private String status;
	private String apFrom;
	private String apTo;
	private String apDays;
	private String ename;
	private String reasone;
	private String leaves;
	private String cancellation;
	private List<LeaveMaster> listLeaveMaster;

	@JsonGetter("idlm")
	public int getIdLeave_Master() {
		return idLeave_Master;
	}

	@JsonSetter("idlm")
	public void setIdLeave_Master(int idLeave_Master) {
		this.idLeave_Master = idLeave_Master;
	}

	@JsonGetter("uid")
	public int getUser_ID() {
		return User_ID;
	}

	@JsonSetter("uid")
	public void setUser_ID(int user_ID) {
		User_ID = user_ID;
	}

	@JsonGetter("apdate")
	public String getApplication_Date() {
		return application_Date;
	}

	@JsonSetter("apdate")
	public void setApplication_Date(String application_Date) {
		this.application_Date = application_Date;
	}

	@JsonGetter("from")
	public String getFrom() {
		return from;
	}

	@JsonSetter("from")
	public void setFrom(String from) {
		this.from = from;
	}

	@JsonGetter("to")
	public String getTo() {
		return to;
	}

	@JsonSetter("to")
	public void setTo(String to) {
		this.to = to;
	}

	@JsonGetter("days")
	public String getDays() {
		return days;
	}

	@JsonSetter("days")
	public void setDays(String days) {
		this.days = days;
	}

	@JsonGetter("balance")
	public String getBalance() {
		return balance;
	}

	@JsonSetter("balance")
	public void setBalance(String balance) {
		this.balance = balance;
	}

	@JsonGetter("approve")
	public String getApprove() {
		return approve;
	}

	@JsonSetter("approve")
	public void setApprove(String approve) {
		this.approve = approve;
	}
	@JsonGetter("listLeaveAp")
	public List<LeaveMaster> getListLeaveMaster() {
		return listLeaveMaster;
	}
	@JsonSetter("listLeaveAp")
	public void setListLeaveMaster(List<LeaveMaster> listLeaveMaster) {
		this.listLeaveMaster = listLeaveMaster;
	}
	@JsonGetter("st")
	public String getStatus() {
		return status;
	}
	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}
	@JsonGetter("apFrm")
	public String getApFrom() {
		return apFrom;
	}
	@JsonSetter("apFrm")
	public void setApFrom(String apFrom) {
		this.apFrom = apFrom;
	}
	@JsonGetter("apTo")
	public String getApTo() {
		return apTo;
	}
	@JsonSetter("apTo")
	public void setApTo(String apTo) {
		this.apTo = apTo;
	}
	@JsonGetter("apDays")
	public String getApDays() {
		return apDays;
	}
	@JsonSetter("apDays")
	public void setApDays(String apDays) {
		this.apDays = apDays;
	}
	@JsonGetter("ename")
	public String getEname() {
		return ename;
	}
	@JsonSetter("ename")
	public void setEname(String ename) {
		this.ename = ename;
	}
	@JsonGetter("reason")
	public String getReasone() {
		return reasone;
	}
	@JsonSetter("reason")
	public void setReasone(String reasone) {
		this.reasone = reasone;
	}
	@JsonGetter("selCancellation")
	public String getCancellation() {
		return cancellation;
	}
	@JsonSetter("selCancellation")
	public void setCancellation(String cancellation) {
		this.cancellation = cancellation;
	}

}
