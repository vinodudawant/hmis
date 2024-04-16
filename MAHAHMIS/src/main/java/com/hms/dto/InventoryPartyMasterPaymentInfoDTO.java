package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryPartyMasterPaymentInfoDTO {

	private Integer  party_master_payment_info_id;
	private Integer  party_master_id;
	private String  party_master_payment_info_tem;
	private String  party_master_payment_info_credit_term;
	private String  party_master_payment_info_bank_name;
	private String party_master_payment_info_account_name ;
	private String  party_master_payment_info_account_number;
	private String  party_master_payment_info_ifsc;
	private String  party_master_payment_info_city;
	private String  party_master_payment_info_address;
	private Integer  party_master_payment_info_delete_flag;
	private Date  party_master_payment_info_update_date;
	private Date  party_master_payment_info_create_date;
	private List<InventoryPartyMasterPaymentInfoDTO> ltinventorypartymasterpaymentinfo;
	private String inv_party_master_filename;
@JsonGetter("inv_party_master_filename")
	public String getInv_party_master_filename() {
		return inv_party_master_filename;
	}
	@JsonSetter("inv_party_master_filename")
	public void setInv_party_master_filename(String inv_party_master_filename) {
		this.inv_party_master_filename = inv_party_master_filename;
	}
	
	@JsonGetter("party_master_payment_info_city")
	public String getParty_master_payment_info_city() {
		return party_master_payment_info_city;
	}
	@JsonSetter("party_master_payment_info_city")
	public void setParty_master_payment_info_city(
			String party_master_payment_info_city) {
		this.party_master_payment_info_city = party_master_payment_info_city;
	}
	/**
	 * @return the party_master_payment_info_id
	 */
	@JsonGetter("party_master_payment_info_id")
	public Integer getParty_master_payment_info_id() {
		return party_master_payment_info_id;
	}
	/**
	 * @param party_master_payment_info_id the party_master_payment_info_id to set
	 */
	@JsonSetter("party_master_payment_info_id")
	public void setParty_master_payment_info_id(Integer party_master_payment_info_id) {
		this.party_master_payment_info_id = party_master_payment_info_id;
	}
	/**
	 * @return the party_master_id
	 */
	@JsonGetter("party_master_id")
	public Integer getParty_master_id() {
		return party_master_id;
	}
	/**
	 * @param party_master_id the party_master_id to set
	 */
	@JsonSetter("party_master_id")
	public void setParty_master_id(Integer party_master_id) {
		this.party_master_id = party_master_id;
	}
	/**
	 * @return the party_master_payment_info_tem
	 */
	@JsonGetter("party_master_payment_info_tem")
	public String getParty_master_payment_info_tem() {
		return party_master_payment_info_tem;
	}
	/**
	 * @param party_master_payment_info_tem the party_master_payment_info_tem to set
	 */
	@JsonSetter("party_master_payment_info_tem")
	public void setParty_master_payment_info_tem(
			String party_master_payment_info_tem) {
		this.party_master_payment_info_tem = party_master_payment_info_tem;
	}
	/**
	 * @return the party_master_payment_info_credit_term
	 */
	@JsonGetter("party_master_payment_info_credit_term")
	public String getParty_master_payment_info_credit_term() {
		return party_master_payment_info_credit_term;
	}
	/**
	 * @param party_master_payment_info_credit_term the party_master_payment_info_credit_term to set
	 */
	@JsonSetter("party_master_payment_info_credit_term")
	public void setParty_master_payment_info_credit_term(
			String party_master_payment_info_credit_term) {
		this.party_master_payment_info_credit_term = party_master_payment_info_credit_term;
	}
	/**
	 * @return the party_master_payment_info_bank_name
	 */
	@JsonGetter("party_master_payment_info_bank_name")
	public String getParty_master_payment_info_bank_name() {
		return party_master_payment_info_bank_name;
	}
	/**
	 * @param party_master_payment_info_bank_name the party_master_payment_info_bank_name to set
	 */
	@JsonSetter("party_master_payment_info_bank_name")
	public void setParty_master_payment_info_bank_name(
			String party_master_payment_info_bank_name) {
		this.party_master_payment_info_bank_name = party_master_payment_info_bank_name;
	}
	/**
	 * @return the party_master_payment_info_account_name
	 */
	@JsonGetter("party_master_payment_info_account_name")
	public String getParty_master_payment_info_account_name() {
		return party_master_payment_info_account_name;
	}
	/**
	 * @param party_master_payment_info_account_name the party_master_payment_info_account_name to set
	 */
	@JsonSetter("party_master_payment_info_account_name")
	public void setParty_master_payment_info_account_name(
			String party_master_payment_info_account_name) {
		this.party_master_payment_info_account_name = party_master_payment_info_account_name;
	}
	/**
	 * @return the party_master_payment_info_account_number
	 */
	@JsonGetter("party_master_payment_info_account_number")
	public String getParty_master_payment_info_account_number() {
		return party_master_payment_info_account_number;
	}
	/**
	 * @param party_master_payment_info_account_number the party_master_payment_info_account_number to set
	 */
	@JsonSetter("party_master_payment_info_account_number")
	public void setParty_master_payment_info_account_number(
			String party_master_payment_info_account_number) {
		this.party_master_payment_info_account_number = party_master_payment_info_account_number;
	}
	/**
	 * @return the party_master_payment_info_ifsc
	 */
	@JsonGetter("party_master_payment_info_ifsc")
	public String getParty_master_payment_info_ifsc() {
		return party_master_payment_info_ifsc;
	}
	/**
	 * @param party_master_payment_info_ifsc the party_master_payment_info_ifsc to set
	 */
	@JsonSetter("party_master_payment_info_ifsc")
	public void setParty_master_payment_info_ifsc(
			String party_master_payment_info_ifsc) {
		this.party_master_payment_info_ifsc = party_master_payment_info_ifsc;
	}
	/**
	 * @return the party_master_payment_info_address
	 */
	@JsonGetter("party_master_payment_info_address")
	public String getParty_master_payment_info_address() {
		return party_master_payment_info_address;
	}
	/**
	 * @param party_master_payment_info_address the party_master_payment_info_address to set
	 */
	@JsonSetter("party_master_payment_info_address")
	public void setParty_master_payment_info_address(
			String party_master_payment_info_address) {
		this.party_master_payment_info_address = party_master_payment_info_address;
	}
	/**
	 * @return the party_master_payment_info_delete_flag
	 */
	@JsonGetter("party_master_payment_info_delete_flag")
	public Integer getParty_master_payment_info_delete_flag() {
		return party_master_payment_info_delete_flag;
	}
	/**
	 * @param party_master_payment_info_delete_flag the party_master_payment_info_delete_flag to set
	 */
	@JsonSetter("party_master_payment_info_delete_flag")
	public void setParty_master_payment_info_delete_flag(
			Integer party_master_payment_info_delete_flag) {
		this.party_master_payment_info_delete_flag = party_master_payment_info_delete_flag;
	}
	/**
	 * @return the party_master_payment_info_update_date
	 */
	@JsonGetter("party_master_payment_info_update_date")
	public Date getParty_master_payment_info_update_date() {
		return party_master_payment_info_update_date;
	}
	/**
	 * @param party_master_payment_info_update_date the party_master_payment_info_update_date to set
	 */
	@JsonSetter("party_master_payment_info_update_date")
	public void setParty_master_payment_info_update_date(
			Date party_master_payment_info_update_date) {
		this.party_master_payment_info_update_date = party_master_payment_info_update_date;
	}
	/**
	 * @return the party_master_payment_info_create_date
	 */
	@JsonGetter("party_master_payment_info_create_date")
	public Date getParty_master_payment_info_create_date() {
		return party_master_payment_info_create_date;
	}
	/**
	 * @param party_master_payment_info_create_date the party_master_payment_info_create_date to set
	 */
	@JsonSetter("party_master_payment_info_create_date")
	public void setParty_master_payment_info_create_date(
			Date party_master_payment_info_create_date) {
		this.party_master_payment_info_create_date = party_master_payment_info_create_date;
	}
	/**
	 * @return the ltinventorypartymasterpaymentinfo
	 */
	@JsonGetter("ltinventorypartymasterpaymentinfo")
	public List<InventoryPartyMasterPaymentInfoDTO> getLtinventorypartymasterpaymentinfo() {
		return ltinventorypartymasterpaymentinfo;
	}
	/**
	 * @param ltinventorypartymasterpaymentinfo the ltinventorypartymasterpaymentinfo to set
	 */
	@JsonSetter("ltinventorypartymasterpaymentinfo")
	public void setLtinventorypartymasterpaymentinfo(
			List<InventoryPartyMasterPaymentInfoDTO> ltinventorypartymasterpaymentinfo) {
		this.ltinventorypartymasterpaymentinfo = ltinventorypartymasterpaymentinfo;
	}
	
	
	
	
	
}
