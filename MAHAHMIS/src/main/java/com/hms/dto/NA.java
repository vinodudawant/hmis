package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class NA implements Serializable {

	protected int na_id;
	protected int user_id;
	protected int branch_id;
	protected String date;
	protected String na_status;
	protected String from_time;
	protected String to_time;
	protected String note;

	protected List<NA> liNA;

	@JsonGetter("liNA")
	public List<NA> getLiNA() {
		return liNA;
	}

	@JsonSetter("liNA")
	public void setLiNA(List<NA> liNA) {
		this.liNA = liNA;
	}

	@JsonGetter("nid")
	public int getNa_id() {
		return na_id;
	}

	@JsonSetter("nid")
	public void setNa_id(int na_id) {
		this.na_id = na_id;
	}

	@JsonGetter("uid")
	public int getUser_id() {
		return user_id;
	}

	@JsonSetter("uid")
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	@JsonGetter("bid")
	public int getBranch_id() {
		return branch_id;
	}

	@JsonSetter("bid")
	public void setBranch_id(int branch_id) {
		this.branch_id = branch_id;
	}

	@JsonGetter("date")
	public String getDate() {
		return date;
	}

	@JsonSetter("date")
	public void setDate(String date) {
		this.date = date;
	}

	@JsonGetter("sts")
	public String getNa_status() {
		return na_status;
	}

	@JsonSetter("sts")
	public void setNa_status(String na_status) {
		this.na_status = na_status;
	}

	@JsonGetter("ftime")
	public String getFrom_time() {
		return from_time;
	}

	@JsonSetter("ftime")
	public void setFrom_time(String from_time) {
		this.from_time = from_time;
	}

	@JsonGetter("ttime")
	public String getTo_time() {
		return to_time;
	}

	@JsonSetter("ttime")
	public void setTo_time(String to_time) {
		this.to_time = to_time;
	}

	@JsonGetter("nte")
	public String getNote() {
		return note;
	}

	@JsonSetter("nte")
	public void setNote(String note) {
		this.note = note;
	}

}
