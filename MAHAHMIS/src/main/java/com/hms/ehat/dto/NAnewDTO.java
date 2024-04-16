package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

import com.hms.rostermanagement.dto.NA;

@Entity
@Table(name ="na")
public class NAnewDTO implements Serializable{

	@Id
	@GeneratedValue
	@Column(name = "na_id")
	private int naId;
	
	@Column(name = "User_id")
	private int userId;
	
	@Column(name = "Branch_id")
	private int branchId;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "na_status")
	private String naStatus;
	
	@Column(name = "from_time")
	private String fromTime;
	
	@Column(name = "tom_time")
	private String toTime;
	
	@Column(name = "note")
	private String note;
	
	@Column(name = "tre_op_id")
	private String tre_op_id;

	@Transient
	private List<NA> listNA;

	@JsonGetter("liNA")
	public List<NA> getLiNA() {
		return listNA;
	}

	@JsonSetter("liNA")
	public void setLiNA(List<NA> liNA) {
		this.listNA = liNA;
	}

	@JsonGetter("nid")
	public int getNa_id() {
		return naId;
	}

	@JsonSetter("nid")
	public void setNa_id(int na_id) {
		this.naId = na_id;
	}

	@JsonGetter("uid")
	public int getUser_id() {
		return userId;
	}

	@JsonSetter("uid")
	public void setUser_id(int user_id) {
		this.userId = user_id;
	}

	@JsonGetter("bid")
	public int getBranch_id() {
		return branchId;
	}

	@JsonSetter("bid")
	public void setBranch_id(int branch_id) {
		this.branchId = branch_id;
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
		return naStatus;
	}

	@JsonSetter("sts")
	public void setNa_status(String na_status) {
		this.naStatus = na_status;
	}

	@JsonGetter("ftime")
	public String getFrom_time() {
		return fromTime;
	}

	@JsonSetter("ftime")
	public void setFrom_time(String from_time) {
		this.fromTime = from_time;
	}

	@JsonGetter("ttime")
	public String getTo_time() {
		return toTime;
	}

	@JsonSetter("ttime")
	public void setTo_time(String to_time) {
		this.toTime = to_time;
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
