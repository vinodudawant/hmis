package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class ChartTypeTbl {
	private int idchartTypeTbl;
	private String name;
	private String status;
	private int cType;
	@JsonGetter("ct")
	public int getcType() {
		return cType;
	}
	@JsonSetter("ct")
	public void setcType(int cType) {
		this.cType = cType;
	}
	private String fee;
	@JsonGetter("fee")
	public String getFee() {
		return fee;
	}
	@JsonSetter("fee")
	public void setFee(String fee) {
		this.fee = fee;
	}
	private List<ChartTypeTbl> listChartType;
	
	
	@JsonGetter("idct")
	public int getIdchartTypeTbl() {
		return idchartTypeTbl;
	}
	@JsonSetter("idct")
	public void setIdchartTypeTbl(int idchartTypeTbl) {
		this.idchartTypeTbl = idchartTypeTbl;
	}
	@JsonGetter("cn")
	public String getName() {
		return name;
	}
	@JsonSetter("cn")
	public void setName(String name) {
		this.name = name;
	}
	@JsonGetter("st")
	public String getStatus() {
		return status;
	}
	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}
	@JsonGetter("lict")
	public List<ChartTypeTbl> getListChartType() {
		return listChartType;
	}
	@JsonSetter("lict")
	public void setListChartType(List<ChartTypeTbl> listChartType) {
		this.listChartType = listChartType;
	}


}
