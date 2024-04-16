package com.hms.ehat.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity 
@Immutable
@Table(name = "ehat_view_freez_details")
public class Ehat_freez_details {
@Id	
@Column(name = "free_id")	
int free_id;
@Column(name = "service_name",columnDefinition="varchar(255) ")
String service_name;
@Column(name = "service_id",columnDefinition="varchar(255) ")
String service_id;
@Column(name = "submodule_name",columnDefinition="varchar(255) ")
String submodule_name;
@Column(name = "modulen_name",columnDefinition="varchar(255) ")
String modulen_name;
@Transient
private List<Ehat_freez_details> listFreezdetails;



public String getSubmodule_name() {
	return submodule_name;
}
public void setSubmodule_name(String submodule_name) {
	this.submodule_name = submodule_name;
}
public String getModulen_name() {
	return modulen_name;
}
public void setModulen_name(String modulen_name) {
	this.modulen_name = modulen_name;
}
public List<Ehat_freez_details> getListFreezdetails() {
	return listFreezdetails;
}
public void setListFreezdetails(List<Ehat_freez_details> listFreezdetails) {
	this.listFreezdetails = listFreezdetails;
}
public int getFree_id() {
	return free_id;
}
public void setFree_id(int free_id) {
	this.free_id = free_id;
}
public String getService_name() {
	return service_name;
}
public void setService_name(String service_name) {
	this.service_name = service_name;
}
public String getService_id() {
	return service_id;
}
public void setService_id(String service_id) {
	this.service_id = service_id;
}



}
