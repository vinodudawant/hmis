package com.hms.dto;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;


public class ChartInfoDto {

	private int id;
	private int chart_id;
	private int Treatment_ID;
	private String cname;
	private String time;
	private String date;
	private String key;
	private String value;
	private String unit;
	private List<ChartInfoDto> listChartInfo;
	
	@JsonGetter("id")
	public int getId() {
		return id;
	}
	@JsonSetter("id")
	public void setId(int id) {
		this.id = id;
	}
	@JsonGetter("chrtid")
	public int getChart_id() {
		return chart_id;
	}
	@JsonSetter("chrtid")
	public void setChart_id(int chart_id) {
		this.chart_id = chart_id;
	}
	@JsonGetter("trid")
	public int getTreatment_ID() {
		return Treatment_ID;
	}
	@JsonSetter("trid")
	public void setTreatment_ID(int treatment_ID) {
		Treatment_ID = treatment_ID;
	}
	@JsonGetter("cname")
	public String getCname() {
		return cname;
	}
	@JsonSetter("cname")
	public void setCname(String cname) {
		this.cname = cname;
	}
	@JsonGetter("time")
	public String getTime() {
		return time;
	}
	@JsonSetter("time")
	public void setTime(String time) {
		this.time = time;
	}
	@JsonGetter("date")
	public String getDate() {
		return date;
	}
	@JsonSetter("date")
	public void setDate(String date) {
		this.date = date;
	}
	@JsonGetter("key")
	public String getKey() {
		return key;
	}
	@JsonSetter("key")
	public void setKey(String key) {
		this.key = key;
	}
	@JsonGetter("value")
	public String getValue() {
		return value;
	}
	@JsonSetter("value")
	public void setValue(String value) {
		this.value = value;
	}
	@JsonGetter("lichrt")
	public List<ChartInfoDto> getListChartInfo() {
		return listChartInfo;
	}
	@JsonSetter("lichrt")
	public void setListChartInfo(List<ChartInfoDto> listChartInfo) {
		this.listChartInfo = listChartInfo;
	}
	@JsonGetter("unit")
	public String getUnit() {
		return unit;
	}
	@JsonSetter("unit")
	public void setUnit(String unit) {
		this.unit = unit;
	}
}
