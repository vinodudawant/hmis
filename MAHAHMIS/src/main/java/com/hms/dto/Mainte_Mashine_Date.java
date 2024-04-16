package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class Mainte_Mashine_Date {

	private int mainte_machine_date_id;
	private int mainte_date_id;
	private int mainte_machine_masterid;
	private String machine_name;
	private String machine_code;
	private String from_date;
	private String to_date;
	private int months;
	private String is_update;
	private String date_name;
	private MainteDate objMainteDate;
	private int mainte_machine_id;

	@JsonGetter("mmid")
	public int getMainte_machine_id() {
		return mainte_machine_id;
	}

	@JsonSetter("mmid")
	public void setMainte_machine_id(int mainte_machine_id) {
		this.mainte_machine_id = mainte_machine_id;
	}

	@JsonGetter("objmd")
	public MainteDate getObjMainteDate() {
		return objMainteDate;
	}

	@JsonSetter("objmd")
	public void setObjMainteDate(MainteDate objMainteDate) {
		this.objMainteDate = objMainteDate;
	}

	@JsonGetter("dn")
	public String getDate_name() {
		return date_name;
	}

	@JsonSetter("dn")
	public void setDate_name(String date_name) {
		this.date_name = date_name;
	}

	@JsonGetter("iu")
	public String getIs_update() {
		return is_update;
	}

	@JsonSetter("iu")
	public void setIs_update(String is_update) {
		this.is_update = is_update;
	}

	List<Mainte_Mashine_Date> liMainte_Mashine_Date;

	@JsonGetter("mn")
	public String getMachine_name() {
		return machine_name;
	}

	@JsonGetter("limmd")
	public List<Mainte_Mashine_Date> getLiMainte_Mashine_Date() {
		return liMainte_Mashine_Date;
	}

	@JsonSetter("limmd")
	public void setLiMainte_Mashine_Date(
			List<Mainte_Mashine_Date> liMainte_Mashine_Date) {
		this.liMainte_Mashine_Date = liMainte_Mashine_Date;
	}

	@JsonSetter("mn")
	public void setMachine_name(String machine_name) {
		this.machine_name = machine_name;
	}

	@JsonGetter("mc")
	public String getMachine_code() {
		return machine_code;
	}

	@JsonSetter("mc")
	public void setMachine_code(String machine_code) {
		this.machine_code = machine_code;
	}

	@JsonGetter("fm")
	public String getFrom_date() {
		return from_date;
	}

	@JsonSetter("fm")
	public void setFrom_date(String from_date) {
		this.from_date = from_date;
	}

	@JsonGetter("td")
	public String getTo_date() {
		return to_date;
	}

	@JsonSetter("td")
	public void setTo_date(String to_date) {
		this.to_date = to_date;
	}

	@JsonGetter("nom")
	public int getMonths() {
		return months;
	}

	@JsonSetter("nom")
	public void setMonths(int months) {
		this.months = months;
	}

	@JsonGetter("mmi")
	public int getMainte_machine_date_id() {
		return mainte_machine_date_id;
	}

	@JsonSetter("mmi")
	public void setMainte_machine_date_id(int mainte_machine_date_id) {
		this.mainte_machine_date_id = mainte_machine_date_id;
	}

	@JsonGetter("mdi")
	public int getMainte_date_id() {
		return mainte_date_id;
	}

	@JsonSetter("mdi")
	public void setMainte_date_id(int mainte_date_id) {
		this.mainte_date_id = mainte_date_id;
	}

	@JsonGetter("mmmi")
	public int getMainte_machine_masterid() {
		return mainte_machine_masterid;
	}

	@JsonSetter("mmmi")
	public void setMainte_machine_masterid(int mainte_machine_masterid) {
		this.mainte_machine_masterid = mainte_machine_masterid;
	}
}
