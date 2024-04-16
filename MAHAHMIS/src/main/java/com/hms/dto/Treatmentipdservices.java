package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class Treatmentipdservices implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -9123384117361351273L;
	private int idtreatment_ipdservices;
	private int Treatment_ID;
	private int savedby;
	private String gasesMonitor;
	private String instruments;
	private String bedsideprocedures;
	private List<Treatmentipdservices> tipdserviceli;
	private int corporateAccountChages;
	private List<Test> listTest;
	private String deleted ;
	private float pay;
	private float coPay;
	private int hallid;

	@JsonGetter("liservices")
	public List<Test> getListTest() {
		return listTest;
	}

	public void setListTest(List<Test> listTest) {
		this.listTest = listTest;
	}

	@JsonGetter("isid")
	public int getIdtreatment_ipdservices() {
		return idtreatment_ipdservices;
	}

	public void setIdtreatment_ipdservices(int idtreatment_ipdservices) {
		this.idtreatment_ipdservices = idtreatment_ipdservices;
	}

	@JsonGetter("tid")
	public int getTreatment_ID() {
		return Treatment_ID;
	}

	public void setTreatment_ID(int treatment_ID) {
		Treatment_ID = treatment_ID;
	}

	@JsonGetter("sb")
	public int getSavedby() {
		return savedby;
	}

	public void setSavedby(int savedby) {
		this.savedby = savedby;
	}

	@JsonGetter("gas")
	public String getGasesMonitor() {
		return gasesMonitor;
	}

	public void setGasesMonitor(String gasesMonitor) {
		this.gasesMonitor = gasesMonitor;
	}

	@JsonGetter("instr")
	public String getInstruments() {
		return instruments;
	}

	public void setInstruments(String instruments) {
		this.instruments = instruments;
	}

	@JsonGetter("bedsd")
	public String getBedsideprocedures() {
		return bedsideprocedures;
	}

	public void setBedsideprocedures(String bedsideprocedures) {
		this.bedsideprocedures = bedsideprocedures;
	}

	@JsonGetter("isli")
	public List<Treatmentipdservices> getTipdserviceli() {
		return tipdserviceli;
	}

	public void setTipdserviceli(List<Treatmentipdservices> tipdserviceli) {
		this.tipdserviceli = tipdserviceli;
	}

	public void setCharges(int corporateAccountChages) {
		// TODO Auto-generated method stub
		this.corporateAccountChages = corporateAccountChages;
		
	}
	@JsonGetter("corpcharge")
	public int getCharges() {
		// TODO Auto-generated method stub
		return corporateAccountChages ;
		
	}

	@JsonGetter("deleted")
	public String getDeleted() {
		return deleted;
	}

	@JsonSetter("deleted")
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	@JsonGetter("pay")
	public float getPay() {
		return pay;
	}

	@JsonSetter("pay")
	public void setPay(float pay) {
		this.pay = pay;
	}

	@JsonGetter("coPay")
	public float getCoPay() {
		return coPay;
	}

	@JsonSetter("coPay")
	public void setCoPay(float coPay) {
		this.coPay = coPay;
	}
	@JsonGetter("hi")
	public int getHallid() {
		return hallid;
	}
	@JsonSetter("hi")
	public void setHallid(int hallid) {
		this.hallid = hallid;
	}

	
}
