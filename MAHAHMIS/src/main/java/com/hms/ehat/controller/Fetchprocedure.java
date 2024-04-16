package com.hms.ehat.controller;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;



@Entity 
@Immutable
@Table(name = "ehat_view_fetch_procedure")
public class Fetchprocedure {
	@Id	
	@Column(name = "Operation_id")	
	int Operation_id;
	@Column(name = "idoperation_groups")	
	int idoperation_groups;
	@Column(name = "group_name",columnDefinition="varchar(255) ")
	String group_name;
	@Column(name = "idoperation_type_tbl")	
	int idoperation_type_tbl;
	@Column(name = "name",columnDefinition="varchar(255) ")
	String name;
	@Column(name = "opgrade")	
	int opgrade;
	@Transient
	private List<Fetchprocedure> listFetchprocedure;
	
	public int getIdoperation_groups() {
		return idoperation_groups;
	}
	public void setIdoperation_groups(int idoperation_groups) {
		this.idoperation_groups = idoperation_groups;
	}
	public int getIdoperation_type_tbl() {
		return idoperation_type_tbl;
	}
	public void setIdoperation_type_tbl(int idoperation_type_tbl) {
		this.idoperation_type_tbl = idoperation_type_tbl;
	}
	public int getOperation_id() {
		return Operation_id;
	}
	public void setOperation_id(int operation_id) {
		Operation_id = operation_id;
	}
	public String getGroup_name() {
		return group_name;
	}
	public void setGroup_name(String group_name) {
		this.group_name = group_name;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Fetchprocedure> getListFetchprocedure() {
		return listFetchprocedure;
	}
	public void setListFetchprocedure(List<Fetchprocedure> listFetchprocedure) {
		this.listFetchprocedure = listFetchprocedure;
	}
	public int getOpgrade() {
		return opgrade;
	}
	public void setOpgrade(int opgrade) {
		this.opgrade = opgrade;
	}
	
	
}
