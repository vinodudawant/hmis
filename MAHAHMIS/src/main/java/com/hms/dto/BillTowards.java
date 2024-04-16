package com.hms.dto;

import java.util.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class BillTowards {
	
	
	private Integer idtowards;
	private String tname;
	
	private Date date;
	
	@JsonGetter("id")
	public Integer getIdtowards() {
		return idtowards;
	}
	public void setIdtowards(Integer idtowards) {
		this.idtowards = idtowards;
	}
	
	
	private List<BillTowards> listBillTowrdes;
	
	
	@JsonGetter("tname")
	public String getTname() {
		return tname;
	}
	public void setTname(String tname) {
		this.tname = tname;
	}
	public List<BillTowards>getListBillTowards() {
		return listBillTowrdes;
	}
	public void setListBillTowards(List<BillTowards> listBillTowrdes) {
		this.listBillTowrdes = listBillTowrdes;
	}
	
	
}
