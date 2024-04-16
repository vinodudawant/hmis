package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class Chart {
	private int chart_id;
	private String chart_name;
	private float fee;
	private String type;
	
	private List<Chart> cList;
	@JsonGetter("typ")
	public String getType() {
		return type;
	}

	public void setType(String cType) {
		this.type = cType;
	}

	/**
	 * @return the cList
	 */
	@JsonGetter("cl")
	public List<Chart> getClist() {
		return cList;
	}

	/**
	 * @param list
	 *            the cList to set
	 */
	public void setClist(List<Chart> list) {
		cList = list;
	}

	/**
	 * @return the chart_id
	 */
	@JsonGetter("cid")
	public int getChart_id() {
		return chart_id;
	}

	/**
	 * @param chart_id
	 *            the chart_id to set
	 */
	public void setChart_id(int chart_id) {
		this.chart_id = chart_id;
	}

	/**
	 * @return the chart_name
	 */
	@JsonGetter("cn")
	public String getChart_name() {
		return chart_name;
	}

	/**
	 * @param chart_name
	 *            the chart_name to set
	 */
	public void setChart_name(String chart_name) {
		this.chart_name = chart_name;
	}

	/**
	 * @return the fee
	 */
	@JsonGetter("fe")
	public float getFee() {
		return fee;
	}

	/**
	 * @param fee
	 *            the fee to set
	 */
	public void setFee(float fee) {
		this.fee = fee;
	}

}
