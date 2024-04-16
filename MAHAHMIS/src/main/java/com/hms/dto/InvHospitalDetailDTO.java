package com.hms.dto;

import java.util.List;

public class InvHospitalDetailDTO {
	
  
	  private Integer idinvhospitaldetails; 
	  private String inv_hospital_address;
	  private String inv_hospital_name;
	  private String inv_hospital_district;
	  private String inv_hospital_taluka;
	  private String inv_hospital_state;
	  private String inv_hospital_country;
	  private String inv_hospital_pincode;
	  private String inv_hospital_created_date;
	  private String inv_hospital_update_date;
	  private Integer inv_hospital_delete_flag;
	  private String inv_hospital_deleted_by_name;
	  private Integer inv_hospital_deleted_by_id;
	  
	  private String termsAndCondition;
	  
	  private List<InvHospitalDetailDTO> ltinvHospitalDetailDTOs;
	  
	public Integer getIdinvhospitaldetails() {
		return idinvhospitaldetails;
	}
	public void setIdinvhospitaldetails(Integer idinvhospitaldetails) {
		this.idinvhospitaldetails = idinvhospitaldetails;
	}
	public String getInv_hospital_address() {
		return inv_hospital_address;
	}
	public void setInv_hospital_address(String inv_hospital_address) {
		this.inv_hospital_address = inv_hospital_address;
	}
	public String getInv_hospital_name() {
		return inv_hospital_name;
	}
	public void setInv_hospital_name(String inv_hospital_name) {
		this.inv_hospital_name = inv_hospital_name;
	}
	public String getInv_hospital_district() {
		return inv_hospital_district;
	}
	public void setInv_hospital_district(String inv_hospital_district) {
		this.inv_hospital_district = inv_hospital_district;
	}
	public String getInv_hospital_taluka() {
		return inv_hospital_taluka;
	}
	public void setInv_hospital_taluka(String inv_hospital_taluka) {
		this.inv_hospital_taluka = inv_hospital_taluka;
	}
	public String getInv_hospital_state() {
		return inv_hospital_state;
	}
	public void setInv_hospital_state(String inv_hospital_state) {
		this.inv_hospital_state = inv_hospital_state;
	}
	public String getInv_hospital_country() {
		return inv_hospital_country;
	}
	public void setInv_hospital_country(String inv_hospital_country) {
		this.inv_hospital_country = inv_hospital_country;
	}
	public String getInv_hospital_pincode() {
		return inv_hospital_pincode;
	}
	public void setInv_hospital_pincode(String inv_hospital_pincode) {
		this.inv_hospital_pincode = inv_hospital_pincode;
	}
	public String getInv_hospital_created_date() {
		return inv_hospital_created_date;
	}
	public void setInv_hospital_created_date(String inv_hospital_created_date) {
		this.inv_hospital_created_date = inv_hospital_created_date;
	}
	public String getInv_hospital_update_date() {
		return inv_hospital_update_date;
	}
	public void setInv_hospital_update_date(String inv_hospital_update_date) {
		this.inv_hospital_update_date = inv_hospital_update_date;
	}
	public Integer getInv_hospital_delete_flag() {
		return inv_hospital_delete_flag;
	}
	public void setInv_hospital_delete_flag(Integer inv_hospital_delete_flag) {
		this.inv_hospital_delete_flag = inv_hospital_delete_flag;
	}
	public String getInv_hospital_deleted_by_name() {
		return inv_hospital_deleted_by_name;
	}
	public void setInv_hospital_deleted_by_name(String inv_hospital_deleted_by_name) {
		this.inv_hospital_deleted_by_name = inv_hospital_deleted_by_name;
	}
	public Integer getInv_hospital_deleted_by_id() {
		return inv_hospital_deleted_by_id;
	}
	public void setInv_hospital_deleted_by_id(Integer inv_hospital_deleted_by_id) {
		this.inv_hospital_deleted_by_id = inv_hospital_deleted_by_id;
	}
	
	public List<InvHospitalDetailDTO> getLtinvHospitalDetailDTOs() {
		return ltinvHospitalDetailDTOs;
	}
	public void setLtinvHospitalDetailDTOs(List<InvHospitalDetailDTO> ltinvHospitalDetailDTOs) {
		this.ltinvHospitalDetailDTOs = ltinvHospitalDetailDTOs;
	}
	public String getTermsAndCondition() {
		return termsAndCondition;
	}
	public void setTermsAndCondition(String termsAndCondition) {
		this.termsAndCondition = termsAndCondition;
	} 
	  

}
