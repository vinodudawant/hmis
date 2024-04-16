package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class EmployeeSalaryDetails {

	private int idemployee_salary_details;
	private String emp_name;
	private String emp_code;
	private String salary_date;
	private String contact_no;
	private Float month_fix_salary;
	private String total_duration;
	private int total_days;
	private Float absent_days;
	private Float present_days;
	private Float total_salary;
	private Float monthely_security_deduction;
	private Float payable_salary;
	private List<EmployeeSalaryDetails> employeeSalaryDetailsList;

	@JsonGetter("empsallist")
	public List<EmployeeSalaryDetails> getEmployeeSalaryDetailsList() {
		return employeeSalaryDetailsList;
	}

	@JsonSetter("empsallist")
	public void setEmployeeSalaryDetailsList(
			List<EmployeeSalaryDetails> employeeSalaryDetailsList) {
		this.employeeSalaryDetailsList = employeeSalaryDetailsList;
	}

	@JsonGetter("empsaldetid")
	public int getIdemployee_salary_details() {
		return idemployee_salary_details;
	}

	@JsonSetter("empsaldetid")
	public void setIdemployee_salary_details(int idemployee_salary_details) {
		this.idemployee_salary_details = idemployee_salary_details;
	}

	@JsonGetter("enm")
	public String getEmp_name() {
		return emp_name;
	}

	@JsonSetter("enm")
	public void setEmp_name(String emp_name) {
		this.emp_name = emp_name;
	}

	@JsonGetter("ec")
	public String getEmp_code() {
		return emp_code;
	}

	@JsonSetter("ec")
	public void setEmp_code(String emp_code) {
		this.emp_code = emp_code;
	}

	@JsonGetter("saldt")
	public String getSalary_date() {
		return salary_date;
	}

	@JsonSetter("saldt")
	public void setSalary_date(String salary_date) {
		this.salary_date = salary_date;
	}

	@JsonGetter("conno")
	public String getContact_no() {
		return contact_no;
	}

	@JsonSetter("conno")
	public void setContact_no(String contact_no) {
		this.contact_no = contact_no;
	}

	@JsonGetter("monfixsal")
	public Float getMonth_fix_salary() {
		return month_fix_salary;
	}

	@JsonSetter("monfixsal")
	public void setMonth_fix_salary(Float month_fix_salary) {
		this.month_fix_salary = month_fix_salary;
	}

	@JsonGetter("gettotdur")
	public String getTotal_duration() {
		return total_duration;
	}

	@JsonSetter("gettotdur")
	public void setTotal_duration(String month_total_duration) {
		this.total_duration = month_total_duration;
	}

	@JsonGetter("totday")
	public int getTotal_days() {
		return total_days;
	}

	@JsonSetter("totday")
	public void setTotal_days(int intNo_of_days) {
		this.total_days = intNo_of_days;
	}

	@JsonGetter("absday")
	public Float getAbsent_days() {
		return absent_days;
	}

	@JsonSetter("absday")
	public void setAbsent_days(Float absent_days) {
		this.absent_days = absent_days;
	}

	@JsonGetter("preday")
	public Float getPresent_days() {
		return present_days;
	}

	@JsonSetter("preday")
	public void setPresent_days(Float present_days) {
		this.present_days = present_days;
	}

	@JsonGetter("totsal")
	public Float getTotal_salary() {
		return total_salary;
	}

	@JsonSetter("totsal")
	public void setTotal_salary(Float total_salary) {
		this.total_salary = total_salary;
	}

	@JsonGetter("monsecded")
	public Float getMonthely_security_deduction() {
		return monthely_security_deduction;
	}

	@JsonSetter("monsecded")
	public void setMonthely_security_deduction(Float monthely_security_deduction) {
		this.monthely_security_deduction = monthely_security_deduction;
	}

	@JsonGetter("paysal")
	public Float getPayable_salary() {
		return payable_salary;
	}

	@JsonSetter("paysal")
	public void setPayable_salary(Float payable_salary) {
		this.payable_salary = payable_salary;
	}

}
