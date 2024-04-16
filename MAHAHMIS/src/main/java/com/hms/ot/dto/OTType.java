package com.hms.ot.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;

@Entity
@Table(name = "ot_type")
public class OTType implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "idot_name")
	private int idOT_name;
	
	@Column(name = "ot_name")
	private String ot_name;
	
	@Column(name = "theaterCharges")
	private Float theaterCharges;
	
	@Column(name = "color")
	private String color;
	
	@Column(name = "status")
	private String status;
	
	@Transient
	private List<OTType> otNameList;
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("otchrg")
	public Float getTheaterCharges() {
		return theaterCharges;
	}

	@JsonSetter("otchrg")
	public void setTheaterCharges(Float theaterCharges) {
		this.theaterCharges = theaterCharges;
	}

	@JsonGetter("otid")
	public int getIdOT_name() {
		return idOT_name;
	}

	public void setIdOT_name(int idOT_name) {
		this.idOT_name = idOT_name;
	}

	@JsonGetter("otnm")
	public String getOt_name() {
		return ot_name;
	}

	public void setOt_name(String ot_name) {
		this.ot_name = ot_name;
	}

	@JsonGetter("liot")
	public List<OTType> getOtNameList() {
		return otNameList;
	}

	public void setOtNameList(List<OTType> otNameList) {
		this.otNameList = otNameList;
	}

	@JsonGetter("color")
	public String getColor() {
		return color;
	}

	@JsonSetter("color")
	public void setColor(String color) {
		this.color = color;
	}
	
}
