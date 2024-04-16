package com.hms.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;


public class RouteDTO {
	
	private int routeId;
	private String prep;
	private String route_name;
	private int prepId;
	private List<RouteDTO> routeList;
	
	@JsonGetter("routeId")
	public int getRouteId() {
		return routeId;
	}
	@JsonSetter("routeId")
	public void setRouteId(int routeId) {
		this.routeId = routeId;
	}
	@JsonGetter("prep")
	public String getPrep() {
		return prep;
	}
	@JsonSetter("prep")
	public void setPrep(String prep) {
		this.prep = prep;
	}
	@JsonGetter("rtnm")
	public String getRoute_name() {
		return route_name;
	}
	@JsonSetter("rtnm")
	public void setRoute_name(String route_name) {
		this.route_name = route_name;
	}
	@JsonGetter("rtlist")
	public List<RouteDTO> getRouteList() {
		return routeList;
	}
	@JsonSetter("rtlist")
	public void setRouteList(List<RouteDTO> routeList) {
		this.routeList = routeList;
	}
	@JsonGetter("prepId")
	public int getPrepId() {
		return prepId;
	}
	@JsonSetter("prepId")
	public void setPrepId(int prepId) {
		this.prepId = prepId;
	}
	
	

}
