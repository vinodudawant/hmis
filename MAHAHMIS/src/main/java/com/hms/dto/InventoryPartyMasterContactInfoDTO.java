package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryPartyMasterContactInfoDTO {

	private Integer party_contact_info_id;
	private Integer party_master_id;
	private String party_contact_info_name;
	private String party_contact_info_designation;
	private String party_contact_info_address;
	private String party_contact_info_gender;
	private String party_contact_info_dob;
	private String party_contact_info_phone_number1;
	private String party_contact_info_phone_number2;
	private String party_contact_info_mobile;
	private String party_contact_info_email;
	private Integer party_contact_info_delete_flag;
	private Date party_contact_info_update_date;
	private Date party_contact_info_create_date;
	private List<InventoryPartyMasterContactInfoDTO> ltinventorypartymastrecontactinfodto;

	@JsonGetter("party_contact_info_id")
	public Integer getParty_contact_info_id() {
		return party_contact_info_id;
	}

	@JsonSetter("party_contact_info_id")
	public void setParty_contact_info_id(Integer party_contact_info_id) {
		this.party_contact_info_id = party_contact_info_id;
	}

	@JsonGetter("party_master_id")
	public Integer getParty_master_id() {
		return party_master_id;
	}

	@JsonSetter("party_master_id")
	public void setParty_master_id(Integer party_master_id) {
		this.party_master_id = party_master_id;
	}
	@JsonGetter("party_contact_info_dob")
	public String getParty_contact_info_dob() {
		return party_contact_info_dob;
	}
	@JsonSetter("party_contact_info_dob")
	public void setParty_contact_info_dob(String party_contact_info_dob) {
		this.party_contact_info_dob = party_contact_info_dob;
	}


	@JsonGetter("party_contact_info_name")
	public String getParty_contact_info_name() {
		return party_contact_info_name;
	}

	@JsonSetter("party_contact_info_name")
	public void setParty_contact_info_name(String party_contact_info_name) {
		this.party_contact_info_name = party_contact_info_name;
	}

	@JsonGetter("party_contact_info_designation")
	public String getParty_contact_info_designation() {
		return party_contact_info_designation;
	}

	@JsonSetter("party_contact_info_designation")
	public void setParty_contact_info_designation(
			String party_contact_info_designation) {
		this.party_contact_info_designation = party_contact_info_designation;
	}

	@JsonGetter("party_contact_info_address")
	public String getParty_contact_info_address() {
		return party_contact_info_address;
	}

	@JsonSetter("party_contact_info_address")
	public void setParty_contact_info_address(String party_contact_info_address) {
		this.party_contact_info_address = party_contact_info_address;
	}

	@JsonGetter("party_contact_info_gender")
	public String getParty_contact_info_gender() {
		return party_contact_info_gender;
	}

	@JsonSetter("party_contact_info_gender")
	public void setParty_contact_info_gender(String party_contact_info_gender) {
		this.party_contact_info_gender = party_contact_info_gender;
	}

	@JsonGetter("party_contact_info_phone_number1")
	public String getParty_contact_info_phone_number1() {
		return party_contact_info_phone_number1;
	}

	@JsonSetter("party_contact_info_phone_number1")
	public void setParty_contact_info_phone_number1(
			String party_contact_info_phone_number1) {
		this.party_contact_info_phone_number1 = party_contact_info_phone_number1;
	}

	@JsonGetter("party_contact_info_phone_number2")
	public String getParty_contact_info_phone_number2() {
		return party_contact_info_phone_number2;
	}

	@JsonSetter("party_contact_info_phone_number2")
	public void setParty_contact_info_phone_number2(
			String party_contact_info_phone_number2) {
		this.party_contact_info_phone_number2 = party_contact_info_phone_number2;
	}

	@JsonGetter("party_contact_info_mobile")
	public String getParty_contact_info_mobile() {
		return party_contact_info_mobile;
	}

	@JsonSetter("party_contact_info_mobile")
	public void setParty_contact_info_mobile(String party_contact_info_mobile) {
		this.party_contact_info_mobile = party_contact_info_mobile;
	}

	@JsonSetter("party_contact_info_email")
	public String getParty_contact_info_email() {
		return party_contact_info_email;
	}

	@JsonSetter("party_contact_info_email")
	public void setParty_contact_info_email(String party_contact_info_email) {
		this.party_contact_info_email = party_contact_info_email;
	}

	@JsonGetter("party_contact_info_delete_flag")
	public Integer getParty_contact_info_delete_flag() {
		return party_contact_info_delete_flag;
	}

	@JsonSetter("party_contact_info_delete_flag")
	public void setParty_contact_info_delete_flag(
			Integer party_contact_info_delete_flag) {
		this.party_contact_info_delete_flag = party_contact_info_delete_flag;
	}

	@JsonGetter("party_contact_info_update_date")
	public Date getParty_contact_info_update_date() {
		return party_contact_info_update_date;
	}

	@JsonSetter("party_contact_info_update_date")
	public void setParty_contact_info_update_date(
			Date party_contact_info_update_date) {
		this.party_contact_info_update_date = party_contact_info_update_date;
	}

	@JsonGetter("party_contact_info_create_date")
	public Date getParty_contact_info_create_date() {
		return party_contact_info_create_date;
	}

	@JsonSetter("party_contact_info_create_date")
	public void setParty_contact_info_create_date(
			Date party_contact_info_create_date) {
		this.party_contact_info_create_date = party_contact_info_create_date;
	}

	/**
	 * @return the ltinventorypartymastrecontactinfodto
	 */
	@JsonGetter("ltinventorypartymastrecontactinfodto")
	public List<InventoryPartyMasterContactInfoDTO> getLtinventorypartymastrecontactinfodto() {
		return ltinventorypartymastrecontactinfodto;
	}

	/**
	 * @param ltinventorypartymastrecontactinfodto
	 *            the ltinventorypartymastrecontactinfodto to set
	 */
	@JsonSetter("ltinventorypartymastrecontactinfodto")
	public void setLtinventorypartymastrecontactinfodto(
			List<InventoryPartyMasterContactInfoDTO> ltinventorypartymastrecontactinfodto) {
		this.ltinventorypartymastrecontactinfodto = ltinventorypartymastrecontactinfodto;
	}

}
