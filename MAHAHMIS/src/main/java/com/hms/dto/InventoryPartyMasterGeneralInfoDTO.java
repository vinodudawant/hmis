package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryPartyMasterGeneralInfoDTO {
	
	private Integer party_master_general_info_id;
	private Integer party_master_id;	
	private String party_master_general_info_mobile;
	private String party_master_general_info_landline;
	private String party_master_general_info_website;
	private String party_master_general_info_comapny_mail;
	private String party_master_general_info_industry_type;
	private Integer party_master_general_info_rating;
	private Integer party_master_general_info_delete_flag;
	private Date party_master_general_info_update_date;
	private Date party_master_general_info_create_date;
	private List<InventoryPartyMasterGeneralInfoDTO> ltinventorypartymastergeneralinfodto;
	private String inv_party_master_panno;

	@JsonGetter("inv_party_master_panno")
	public String getInv_party_master_panno() {
		return inv_party_master_panno;
	}
	@JsonSetter("inv_party_master_panno")
	public void setInv_party_master_panno(String inv_party_master_panno) {
		this.inv_party_master_panno = inv_party_master_panno;
	}
	

	@JsonGetter("party_master_general_info_id")
	public Integer getParty_master_general_info_id() {
		return party_master_general_info_id;
	}
	@JsonSetter("party_master_general_info_id")
	public void setParty_master_general_info_id(Integer party_master_general_info_id) {
		this.party_master_general_info_id = party_master_general_info_id;
	}
	
	@JsonGetter("party_master_id")
	public Integer getParty_master_id() {
		return party_master_id;
	}
	@JsonSetter("party_master_id")
	public void setParty_master_id(Integer party_master_id) {
		this.party_master_id = party_master_id;
	}
	
	@JsonGetter("party_master_general_info_mobile")
	public String getParty_master_general_info_mobile() {
		return party_master_general_info_mobile;
	}
	@JsonSetter("party_master_general_info_mobile")
	public void setParty_master_general_info_mobile(
			String party_master_general_info_mobile) {
		this.party_master_general_info_mobile = party_master_general_info_mobile;
	}
	
	@JsonGetter("party_master_general_info_landline")
	public String getParty_master_general_info_landline() {
		return party_master_general_info_landline;
	}
	@JsonSetter("party_master_general_info_landline")
	public void setParty_master_general_info_landline(
			String party_master_general_info_landline) {
		this.party_master_general_info_landline = party_master_general_info_landline;
	}
	
	
	@JsonGetter("party_master_general_info_website")
	public String getParty_master_general_info_website() {
		return party_master_general_info_website;
	}
	@JsonSetter("party_master_general_info_website")
	public void setParty_master_general_info_website(
			String party_master_general_info_website) {
		this.party_master_general_info_website = party_master_general_info_website;
	}
	
	@JsonGetter("party_master_general_info_comapny_mail")
	public String getParty_master_general_info_comapny_mail() {
		return party_master_general_info_comapny_mail;
	}
	@JsonSetter("party_master_general_info_comapny_mail")
	public void setParty_master_general_info_comapny_mail(
			String party_master_general_info_comapny_mail) {
		this.party_master_general_info_comapny_mail = party_master_general_info_comapny_mail;
	}
	
	@JsonGetter("party_master_general_info_industry_type")
	public String getParty_master_general_info_industry_type() {
		return party_master_general_info_industry_type;
	}
	@JsonSetter("party_master_general_info_industry_type")
	public void setParty_master_general_info_industry_type(
			String party_master_general_info_industry_type) {
		this.party_master_general_info_industry_type = party_master_general_info_industry_type;
	}
	
	@JsonGetter("party_master_general_info_rating")
	public Integer getParty_master_general_info_rating() {
		return party_master_general_info_rating;
	}
	@JsonSetter("party_master_general_info_rating")
	public void setParty_master_general_info_rating(
			Integer party_master_general_info_rating) {
		this.party_master_general_info_rating = party_master_general_info_rating;
	}
	
	@JsonGetter("party_master_general_info_delete_flag")
	public Integer getParty_master_general_info_delete_flag() {
		return party_master_general_info_delete_flag;
	}
	@JsonSetter("party_master_general_info_delete_flag")
	public void setParty_master_general_info_delete_flag(
			Integer party_master_general_info_delete_flag) {
		this.party_master_general_info_delete_flag = party_master_general_info_delete_flag;
	}
	
	@JsonGetter("party_master_general_info_update_date")
	public Date getParty_master_general_info_update_date() {
		return party_master_general_info_update_date;
	}
	@JsonSetter("party_master_general_info_update_date")
	public void setParty_master_general_info_update_date(
			Date party_master_general_info_update_date) {
		this.party_master_general_info_update_date = party_master_general_info_update_date;
	}
	
	@JsonGetter("party_master_general_info_create_date")
	public Date getParty_master_general_info_create_date() {
		return party_master_general_info_create_date;
	}
	@JsonSetter("party_master_general_info_create_date")
	public void setParty_master_general_info_create_date(
			Date party_master_general_info_create_date) {
		this.party_master_general_info_create_date = party_master_general_info_create_date;
	}
	@JsonGetter("ltinventorypartymastergeneralinfodto")
	public List<InventoryPartyMasterGeneralInfoDTO> getLtinventorypartymastergeneralinfodto() {
		return ltinventorypartymastergeneralinfodto;
	}
	@JsonSetter("ltinventorypartymastergeneralinfodto")
	public void setLtinventorypartymastergeneralinfodto(
			List<InventoryPartyMasterGeneralInfoDTO> ltinventorypartymastergeneralinfodto) {
		this.ltinventorypartymastergeneralinfodto = ltinventorypartymastergeneralinfodto;
	}
}
