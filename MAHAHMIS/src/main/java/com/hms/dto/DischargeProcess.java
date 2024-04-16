package com.hms.dto;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class DischargeProcess {

	private int iddischarge_process;
	private int tretID;
	
	private String startTime;
	private String endTime;
	private String staffresp;
	private String remark;
	private String activity;
	private String ID;
	@JsonGetter("ID")
	public String getID() {
		return ID;
	}
	@JsonSetter("ID")
	public void setID(String iD) {
		ID = iD;
	}
	private List<DischargeProcess> dischargesinglist =new ArrayList<DischargeProcess>();
	
	@JsonGetter("tretID")
	public int getTretID() {
		return tretID;
	}
	@JsonSetter("tretID")
	public void setTretID(int tretID) {
		this.tretID = tretID;
	}
	@JsonGetter("dischargesinglist")
	public List<DischargeProcess> getDischargesinglist() {
		return dischargesinglist;
	}
	@JsonSetter("dischargesinglist")
	public void setDischargesinglist(List<DischargeProcess> dischargesinglist) {
		this.dischargesinglist = dischargesinglist;
	}
	@JsonGetter("iddischarge_process")
	public int getIddischarge_process() {
		return iddischarge_process;
	}
	@JsonSetter("iddischarge_process")
	public void setIddischarge_process(int iddischarge_process) {
		this.iddischarge_process = iddischarge_process;
	}
	@JsonGetter("startTime")
	public String getStartTime() {
		return startTime;
	}
	@JsonSetter("startTime")
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	@JsonGetter("endTime")
	public String getEndTime() {
		return endTime;
	}
	@JsonSetter("endTime")
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	@JsonGetter("activity")
	public String getActivity() {
		return activity;
	}
	@JsonSetter("activity")
	public void setActivity(String activity) {
		this.activity = activity;
	}
	@JsonGetter("staffresp")
	public String getStaffresp() {
		return staffresp;
	}
	@JsonSetter("staffresp")
	public void setStaffresp(String staffresp) {
		this.staffresp = staffresp;
	}
	@JsonGetter("remark")
	public String getRemark() {
		return remark;
	}
	@JsonSetter("remark")
	public void setRemark(String remark) {
		this.remark = remark;
	}
	@Override
	public String toString() {
		return "DischargeProcess [iddischarge_process=" + iddischarge_process + ", tretID=" + tretID + ", startTime="
				+ startTime + ", endTime=" + endTime + ", staffresp=" + staffresp + ", remark=" + remark + ", activity="
				+ activity + ", ID=" + ID + ", dischargesinglist=" + dischargesinglist + "]";
	}

	
}
