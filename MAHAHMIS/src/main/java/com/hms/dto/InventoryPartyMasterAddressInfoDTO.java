package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryPartyMasterAddressInfoDTO {

	private Integer party_master_address_info_id;
	private Integer party_master_id;
	private String party_master_address_info_type;
	private String party_master_address_info_company;
	private String party_master_address_info_address;
	private String party_master_address_info_street;
	private String party_master_address_info_area;
	private String party_master_address_info_city;
	private String party_master_address_info_pin;
	private String party_master_address_info_state;
	private String party_master_address_info_country;
	private Integer party_master_address_info_delete_flag;
	private Date party_master_address_info_update_date;
	private Date party_master_address_info_create_date;
	private List<InventoryPartyMasterAddressInfoDTO> ltinventorypartymasteraddressinfodto;

	
	@JsonGetter("party_master_address_info_company")
	public String getParty_master_address_info_company() {
		return party_master_address_info_company;
	}
	@JsonSetter("party_master_address_info_company")
	public void setParty_master_address_info_company(
			String party_master_address_info_company) {
		this.party_master_address_info_company = party_master_address_info_company;
	}
	
	/**
	 * @return the party_master_address_info_id
	 */
	@JsonGetter("party_master_address_info_id")
	public Integer getParty_master_address_info_id() {
		return party_master_address_info_id;
	}

	/**
	 * @return the party_master_id
	 */
	@JsonGetter("party_master_id")
	public Integer getParty_master_id() {
		return party_master_id;
	}

	/**
	 * @return the party_master_address_info_type
	 */
	@JsonGetter("party_master_address_info_type")
	public String getParty_master_address_info_type() {
		return party_master_address_info_type;
	}


	/**
	 * @return the party_master_address_info_address
	 */
	@JsonGetter("party_master_address_info_address")
	public String getParty_master_address_info_address() {
		return party_master_address_info_address;
	}

	/**
	 * @return the party_master_address_info_street
	 */
	@JsonGetter("party_master_address_info_street")
	public String getParty_master_address_info_street() {
		return party_master_address_info_street;
	}

	/**
	 * @return the party_master_address_info_area
	 */
	@JsonGetter("party_master_address_info_area")
	public String getParty_master_address_info_area() {
		return party_master_address_info_area;
	}

	/**
	 * @return the party_master_address_info_city
	 */
	@JsonGetter("party_master_address_info_city")
	public String getParty_master_address_info_city() {
		return party_master_address_info_city;
	}

	/**
	 * @return the party_master_address_info_pin
	 */
	@JsonGetter("party_master_address_info_pin")
	public String getParty_master_address_info_pin() {
		return party_master_address_info_pin;
	}

	/**
	 * @return the party_master_address_info_state
	 */
	@JsonGetter("party_master_address_info_state")
	public String getParty_master_address_info_state() {
		return party_master_address_info_state;
	}

	/**
	 * @return the party_master_address_info_country
	 */
	@JsonGetter("party_master_address_info_country")
	public String getParty_master_address_info_country() {
		return party_master_address_info_country;
	}

	/**
	 * @return the party_master_address_info_delete_flag
	 */
	@JsonGetter("party_master_address_info_delete_flag")
	public Integer getParty_master_address_info_delete_flag() {
		return party_master_address_info_delete_flag;
	}

	/**
	 * @return the party_master_address_info_update_date
	 */
	@JsonGetter("party_master_address_info_update_date")
	public Date getParty_master_address_info_update_date() {
		return party_master_address_info_update_date;
	}

	/**
	 * @return the party_master_address_info_create_date
	 */
	@JsonGetter("party_master_address_info_create_date")
	public Date getParty_master_address_info_create_date() {
		return party_master_address_info_create_date;
	}

	/**
	 * @param party_master_address_info_id
	 *            the party_master_address_info_id to set
	 */
	@JsonSetter("party_master_address_info_id")
	public void setParty_master_address_info_id(
			Integer party_master_address_info_id) {
		this.party_master_address_info_id = party_master_address_info_id;
	}

	/**
	 * @param party_master_id
	 *            the party_master_id to set
	 */
	@JsonSetter("party_master_id")
	public void setParty_master_id(Integer party_master_id) {
		this.party_master_id = party_master_id;
	}

	/**
	 * @param party_master_address_info_type
	 *            the party_master_address_info_type to set
	 */
	@JsonSetter("party_master_address_info_type")
	public void setParty_master_address_info_type(
			String party_master_address_info_type) {
		this.party_master_address_info_type = party_master_address_info_type;
	}

	
	/**
	 * @param party_master_address_info_address
	 *            the party_master_address_info_address to set
	 */
	@JsonSetter("party_master_address_info_address")
	public void setParty_master_address_info_address(
			String party_master_address_info_address) {
		this.party_master_address_info_address = party_master_address_info_address;
	}

	/**
	 * @param party_master_address_info_street
	 *            the party_master_address_info_street to set
	 */
	@JsonSetter("party_master_address_info_street")
	public void setParty_master_address_info_street(
			String party_master_address_info_street) {
		this.party_master_address_info_street = party_master_address_info_street;
	}

	/**
	 * @param party_master_address_info_area
	 *            the party_master_address_info_area to set
	 */
	@JsonSetter("party_master_address_info_area")
	public void setParty_master_address_info_area(
			String party_master_address_info_area) {
		this.party_master_address_info_area = party_master_address_info_area;
	}

	/**
	 * @param party_master_address_info_city
	 *            the party_master_address_info_city to set
	 */
	@JsonSetter("party_master_address_info_city")
	public void setParty_master_address_info_city(
			String party_master_address_info_city) {
		this.party_master_address_info_city = party_master_address_info_city;
	}

	/**
	 * @param party_master_address_info_pin
	 *            the party_master_address_info_pin to set
	 */
	@JsonSetter("party_master_address_info_pin")
	public void setParty_master_address_info_pin(
			String party_master_address_info_pin) {
		this.party_master_address_info_pin = party_master_address_info_pin;
	}

	/**
	 * @param party_master_address_info_state
	 *            the party_master_address_info_state to set
	 */
	@JsonSetter("party_master_address_info_state")
	public void setParty_master_address_info_state(
			String party_master_address_info_state) {
		this.party_master_address_info_state = party_master_address_info_state;
	}

	/**
	 * @param party_master_address_info_country
	 *            the party_master_address_info_country to set
	 */
	@JsonSetter("party_master_address_info_country")
	public void setParty_master_address_info_country(
			String party_master_address_info_country) {
		this.party_master_address_info_country = party_master_address_info_country;
	}

 
	/**
	 * @param party_master_address_info_delete_flag
	 *            the party_master_address_info_delete_flag to set
	 */
	@JsonSetter("party_master_address_info_delete_flag")
	public void setParty_master_address_info_delete_flag(
			Integer party_master_address_info_delete_flag) {
		this.party_master_address_info_delete_flag = party_master_address_info_delete_flag;
	}

	/**
	 * @param party_master_address_info_update_date
	 *            the party_master_address_info_update_date to set
	 */
	@JsonSetter("party_master_address_info_update_date")
	public void setParty_master_address_info_update_date(
			Date party_master_address_info_update_date) {
		this.party_master_address_info_update_date = party_master_address_info_update_date;
	}

	/**
	 * @param party_master_address_info_create_date
	 *            the party_master_address_info_create_date to set
	 */
	@JsonSetter("party_master_address_info_create_date")
	public void setParty_master_address_info_create_date(
			Date party_master_address_info_create_date) {
		this.party_master_address_info_create_date = party_master_address_info_create_date;
	}

	/**
	 * @return the ltinventorypartymasteraddressinfodto
	 */
	@JsonGetter("ltinventorypartymasteraddressinfodto")
	public List<InventoryPartyMasterAddressInfoDTO> getLtinventorypartymasteraddressinfodto() {
		return ltinventorypartymasteraddressinfodto;
	}

	/**
	 * @param ltinventorypartymasteraddressinfodto
	 *            the ltinventorypartymasteraddressinfodto to set
	 */
	@JsonSetter("ltinventorypartymasteraddressinfodto")
	public void setLtinventorypartymasteraddressinfodto(
			List<InventoryPartyMasterAddressInfoDTO> ltinventorypartymasteraddressinfodto) {
		this.ltinventorypartymasteraddressinfodto = ltinventorypartymasteraddressinfodto;
	}

}
