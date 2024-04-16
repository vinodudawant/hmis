package com.hms.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;


@Entity
@Table(name = "order_master")
public class Order_master {

	@Id
	@GeneratedValue
	@Column(name = "idorder_master")
	private int idorder_master;
	
	@Column(name = "treatment_ID")
	private int treatment_ID;
	
	@Column(name = "date_time",columnDefinition="varchar(450)")
	private String date_time;
	
	@Column(name = "invest_advised",columnDefinition="varchar(450)")
	private String invest_advised;
	
	@Column(name = "ref_adv_remark",columnDefinition="varchar(450)")
	private String ref_adv_remark;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "stat_dose",columnDefinition="varchar(450)")
	private String stat_dose;
	
	@Transient
	private List<Order_master> order_masterList;
	
	@Transient
	private List<Order_comp_druges> order_comp_drugesList;
	
	@Transient
	private List<Order_comp_stat> order_comp_statList;

	@JsonGetter("statDose")
	public String getStat_dose() {
		return stat_dose;
	}

	public void setStat_dose(String stat_dose) {
		this.stat_dose = stat_dose;
	}

	@JsonGetter("ocodrli")
	public List<Order_comp_druges> getOrder_comp_drugesList() {
		return order_comp_drugesList;
	}

	public void setOrder_comp_drugesList(
			List<Order_comp_druges> order_comp_drugesList) {
		this.order_comp_drugesList = order_comp_drugesList;
	}

	@JsonGetter("ocostli")
	public List<Order_comp_stat> getOrder_comp_statList() {
		return order_comp_statList;
	}

	public void setOrder_comp_statList(List<Order_comp_stat> order_comp_statList) {
		this.order_comp_statList = order_comp_statList;
	}

	@JsonGetter("omID")
	public int getIdorder_master() {
		return idorder_master;
	}

	public void setIdorder_master(int idorder_master) {
		this.idorder_master = idorder_master;
	}

	@JsonGetter("treId")
	public int getTreatment_ID() {
		return treatment_ID;
	}

	public void setTreatment_ID(int treatment_ID) {
		this.treatment_ID = treatment_ID;
	}

	@JsonGetter("date")
	public String getDate_time() {
		return date_time;
	}

	public void setDate_time(String date_time) {
		this.date_time = date_time;
	}

	@JsonGetter("invest")
	public String getInvest_advised() {
		return invest_advised;
	}

	public void setInvest_advised(String invest_advised) {
		this.invest_advised = invest_advised;
	}

	@JsonGetter("readrmrk")
	public String getRef_adv_remark() {
		return ref_adv_remark;
	}

	public void setRef_adv_remark(String ref_adv_remark) {
		this.ref_adv_remark = ref_adv_remark;
	}

	@JsonGetter("ormali")
	public List<Order_master> getOrder_masterList() {
		return order_masterList;
	}

	public void setOrder_masterList(List<Order_master> order_masterList) {
		this.order_masterList = order_masterList;
	}

	@JsonGetter("status")
	public String getStatus() {
		return status;
	}

	@JsonSetter("status")
	public void setStatus(String status) {
		this.status = status;
	}
	
	

}
