package com.hms.dto;

import java.io.Serializable;
import java.util.List;

public class RadiationMaster implements Serializable{


	private static final long serialVersionUID = 1L;
	
	private int radiationId;
	private String radiationName;
	private float mould;
	private float ct;
	private float planning;
	private float qa;
	private float imaging;
	private float total;
	private float trtct;
	private float finalc;
	private List<RadiationMaster> radiationList;
	
	
	
	public float getMould() {
		return mould;
	}
	public void setMould(float mould) {
		this.mould = mould;
	}
	public float getCt() {
		return ct;
	}
	public void setCt(float ct) {
		this.ct = ct;
	}
	public float getPlanning() {
		return planning;
	}
	public void setPlanning(float planning) {
		this.planning = planning;
	}
	public float getQa() {
		return qa;
	}
	public void setQa(float qa) {
		this.qa = qa;
	}
	public float getImaging() {
		return imaging;
	}
	public void setImaging(float imaging) {
		this.imaging = imaging;
	}
	public float getTotal() {
		return total;
	}
	public void setTotal(float total) {
		this.total = total;
	}
	public float getTrtct() {
		return trtct;
	}
	public void setTrtct(float trtct) {
		this.trtct = trtct;
	}
	public float getFinalc() {
		return finalc;
	}
	public void setFinalc(float finalc) {
		this.finalc = finalc;
	}
	public int getRadiationId() {
		return radiationId;
	}
	public void setRadiationId(int radiationId) {
		this.radiationId = radiationId;
	}
	public String getRadiationName() {
		return radiationName;
	}
	public void setRadiationName(String radiationName) {
		this.radiationName = radiationName;
	}
	public List<RadiationMaster> getRadiationList() {
		return radiationList;
	}
	public void setRadiationList(List<RadiationMaster> radiationList) {
		this.radiationList = radiationList;
	}
}
