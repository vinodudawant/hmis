package com.hms.ehat.dto;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Immutable;
import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Transient;

@Entity 
@Immutable
@Table(name = "ehat_view_ipd_bed_details_for_tid")
public class IpdBedDetailsDTO implements Serializable{
	

	@Transient
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "treatId")
	private int		treatId=0;
	
	@Column(name = "bId")
	private int		bId=0;
	
	@Column(name = "bedName")
	private String	bedName="";
	
	@Column(name = "beAllFor")
	private String	beAllFor="";
	
	@Column(name = "isolation")
	private int	isolation=0;
	
	@Column(name = "hallId")
	private int	hallId=0;

	@Column(name = "hallName")
	private String hallName="";

	@Column(name = "ehatHallId")
	private int ehatHallId=0;
	
	@Column(name = "hallTypeId")
	private int hallTypeId=0;

	@Column(name = "hallTypeName")
	private String hallTypeName="";

	@Column(name = "ehatHallTypeId")
	private int ehatHallTypeId=0;
	
	@Transient
	private List<IpdBedDetailsDTO> ipdBedDetailsList=null;

	public int getTreatId() {
		return treatId;
	}

	public void setTreatId(int treatId) {
		this.treatId = treatId;
	}

	public int getbId() {
		return bId;
	}

	public void setbId(int bId) {
		this.bId = bId;
	}

	public String getBedName() {
		return bedName;
	}

	public void setBedName(String bedName) {
		this.bedName = bedName;
	}

	public String getBeAllFor() {
		return beAllFor;
	}

	public void setBeAllFor(String beAllFor) {
		this.beAllFor = beAllFor;
	}

	public int getIsolation() {
		return isolation;
	}

	public void setIsolation(int isolation) {
		this.isolation = isolation;
	}

	public int getHallId() {
		return hallId;
	}

	public void setHallId(int hallId) {
		this.hallId = hallId;
	}

	public String getHallName() {
		return hallName;
	}

	public void setHallName(String hallName) {
		this.hallName = hallName;
	}

	public int getEhatHallId() {
		return ehatHallId;
	}

	public void setEhatHallId(int ehatHallId) {
		this.ehatHallId = ehatHallId;
	}

	public int getHallTypeId() {
		return hallTypeId;
	}

	public void setHallTypeId(int hallTypeId) {
		this.hallTypeId = hallTypeId;
	}

	public String getHallTypeName() {
		return hallTypeName;
	}

	public void setHallTypeName(String hallTypeName) {
		this.hallTypeName = hallTypeName;
	}

	public int getEhatHallTypeId() {
		return ehatHallTypeId;
	}

	public void setEhatHallTypeId(int ehatHallTypeId) {
		this.ehatHallTypeId = ehatHallTypeId;
	}

	public List<IpdBedDetailsDTO> getIpdBedDetailsList() {
		return ipdBedDetailsList;
	}

	public void setIpdBedDetailsList(List<IpdBedDetailsDTO> ipdBedDetailsList) {
		this.ipdBedDetailsList = ipdBedDetailsList;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	

}
