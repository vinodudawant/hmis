package com.hms.dto;

import java.util.Comparator;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class StandardAndPatientBMIDetailsDTO {

	private int id;
	private String days;
	private String months;
	private String years;

	// private String min_height;
	// private String max_height;
	// private String min_weight;
	// private String max_weight;
	// private String min_headcim;
	// private String max_headcim;

	private String height_3;
	private String height_15;
	private String height_50;
	private String height_85;
	private String height_97;

	private String weight_3;
	private String weight_15;
	private String weight_50;
	private String weight_85;
	private String weight_97;

	private String headcim_3;
	private String headcim_15;
	private String headcim_50;
	private String headcim_85;
	private String headcim_97;

	private String bmi_3;
	private String bmi_15;
	private String bmi_50;
	private String bmi_85;
	private String bmi_97;

	private String patient_weight;
	private String patient_height;
	private String patient_headcim;
	private String patient_bmi;

	private String patientFinalAgeInMonths;
	private String patientFinalAgeInYears;
	private List<StandardAndPatientBMIDetailsDTO> standardAndPatientBMIDetailsDTOList;

	// inner class months comparater ASCENDING
	public static Comparator<StandardAndPatientBMIDetailsDTO> finalAgeInMonthsComparator = new Comparator<StandardAndPatientBMIDetailsDTO>() {
		@Override
		public int compare(StandardAndPatientBMIDetailsDTO o1,
				StandardAndPatientBMIDetailsDTO o2) {

			return ((Float.parseFloat(o1.getPatientFinalAgeInMonths())) < (Float
					.parseFloat(o2.getPatientFinalAgeInMonths())) ? (-1)
					: ((Float.parseFloat(o1.getPatientFinalAgeInMonths())) > (Float
							.parseFloat(o2.getPatientFinalAgeInMonths())) ? 1
							: 0));

		}
	};

	// inner class years comparater ASCENDING
	public static Comparator<StandardAndPatientBMIDetailsDTO> finalAgeInYearsComparator = new Comparator<StandardAndPatientBMIDetailsDTO>() {
		@Override
		public int compare(StandardAndPatientBMIDetailsDTO o1,
				StandardAndPatientBMIDetailsDTO o2) {

			return ((Float.parseFloat(o1.getPatientFinalAgeInYears())) < (Float
					.parseFloat(o2.getPatientFinalAgeInYears())) ? (-1)
					: ((Float.parseFloat(o1.getPatientFinalAgeInYears())) > (Float
							.parseFloat(o2.getPatientFinalAgeInYears())) ? 1
							: 0));

		}
	};

	@JsonGetter("id")
	public int getId() {
		return id;
	}

	@JsonSetter("id")
	public void setId(int id) {
		this.id = id;
	}

	@JsonGetter("days")
	public String getDays() {
		return days;
	}

	@JsonSetter("days")
	public void setDays(String days) {
		this.days = days;
	}

	@JsonGetter("months")
	public String getMonths() {
		return months;
	}

	@JsonSetter("months")
	public void setMonths(String months) {
		this.months = months;
	}

	@JsonGetter("years")
	public String getYears() {
		return years;
	}

	@JsonSetter("years")
	public void setYears(String years) {
		this.years = years;
	}

	@JsonGetter("Ht_P3")
	public String getHeight_3() {
		return height_3;
	}

	@JsonSetter("Ht_P3")
	public void setHeight_3(String height_3) {
		this.height_3 = height_3;
	}

	@JsonGetter("Ht_P15")
	public String getHeight_15() {
		return height_15;
	}

	@JsonSetter("Ht_P15")
	public void setHeight_15(String height_15) {
		this.height_15 = height_15;
	}

	@JsonGetter("Ht_P50")
	public String getHeight_50() {
		return height_50;
	}

	@JsonSetter("Ht_P50")
	public void setHeight_50(String height_50) {
		this.height_50 = height_50;
	}

	@JsonGetter("Ht_P85")
	public String getHeight_85() {
		return height_85;
	}

	@JsonSetter("Ht_P85")
	public void setHeight_85(String height_85) {
		this.height_85 = height_85;
	}

	@JsonGetter("Ht_P97")
	public String getHeight_97() {
		return height_97;
	}

	@JsonSetter("Ht_P97")
	public void setHeight_97(String height_97) {
		this.height_97 = height_97;
	}

	@JsonGetter("Wt_P3")
	public String getWeight_3() {
		return weight_3;
	}

	@JsonSetter("Wt_P3")
	public void setWeight_3(String weight_3) {
		this.weight_3 = weight_3;
	}

	@JsonGetter("Wt_P15")
	public String getWeight_15() {
		return weight_15;
	}

	@JsonSetter("Wt_P15")
	public void setWeight_15(String weight_15) {
		this.weight_15 = weight_15;
	}

	@JsonGetter("Wt_P50")
	public String getWeight_50() {
		return weight_50;
	}

	@JsonSetter("Wt_P50")
	public void setWeight_50(String weight_50) {
		this.weight_50 = weight_50;
	}

	@JsonGetter("Wt_P85")
	public String getWeight_85() {
		return weight_85;
	}

	@JsonSetter("Wt_P85")
	public void setWeight_85(String weight_85) {
		this.weight_85 = weight_85;
	}

	@JsonGetter("Wt_P97")
	public String getWeight_97() {
		return weight_97;
	}

	@JsonSetter("Wt_P97")
	public void setWeight_97(String weight_97) {
		this.weight_97 = weight_97;
	}

	@JsonGetter("Hd_P3")
	public String getHeadcim_3() {
		return headcim_3;
	}

	@JsonSetter("Hd_P3")
	public void setHeadcim_3(String headcim_3) {
		this.headcim_3 = headcim_3;
	}

	@JsonGetter("Hd_P15")
	public String getHeadcim_15() {
		return headcim_15;
	}

	@JsonSetter("Hd_P15")
	public void setHeadcim_15(String headcim_15) {
		this.headcim_15 = headcim_15;
	}

	@JsonGetter("Hd_P50")
	public String getHeadcim_50() {
		return headcim_50;
	}

	@JsonSetter("Hd_P50")
	public void setHeadcim_50(String headcim_50) {
		this.headcim_50 = headcim_50;
	}

	@JsonGetter("Hd_P85")
	public String getHeadcim_85() {
		return headcim_85;
	}

	@JsonSetter("Hd_P85")
	public void setHeadcim_85(String headcim_85) {
		this.headcim_85 = headcim_85;
	}

	@JsonGetter("Hd_P97")
	public String getHeadcim_97() {
		return headcim_97;
	}

	@JsonSetter("Hd_P97")
	public void setHeadcim_97(String headcim_97) {
		this.headcim_97 = headcim_97;
	}

	@JsonGetter("bmi_P3")
	public String getBmi_3() {
		return bmi_3;
	}

	@JsonSetter("bmi_P3")
	public void setBmi_3(String bmi_3) {
		this.bmi_3 = bmi_3;
	}

	@JsonGetter("bmi_P15")
	public String getBmi_15() {
		return bmi_15;
	}

	@JsonSetter("bmi_P15")
	public void setBmi_15(String bmi_15) {
		this.bmi_15 = bmi_15;
	}

	@JsonGetter("bmi_P50")
	public String getBmi_50() {
		return bmi_50;
	}

	@JsonSetter("bmi_P50")
	public void setBmi_50(String bmi_50) {
		this.bmi_50 = bmi_50;
	}

	@JsonGetter("bmi_P85")
	public String getBmi_85() {
		return bmi_85;
	}

	@JsonSetter("bmi_P85")
	public void setBmi_85(String bmi_85) {
		this.bmi_85 = bmi_85;
	}

	@JsonGetter("bmi_P97")
	public String getBmi_97() {
		return bmi_97;
	}

	@JsonSetter("bmi_P97")
	public void setBmi_97(String bmi_97) {
		this.bmi_97 = bmi_97;
	}

	@JsonGetter("Pt_Wt_KG")
	public String getPatient_weight() {
		return patient_weight;
	}

	@JsonSetter("Pt_Wt_KG")
	public void setPatient_weight(String patient_weight) {
		this.patient_weight = patient_weight;
	}

	@JsonGetter("Pt_Ht_CM")
	public String getPatient_height() {
		return patient_height;
	}

	@JsonSetter("Pt_Ht_CM")
	public void setPatient_height(String patient_height) {
		this.patient_height = patient_height;
	}

	@JsonGetter("Pt_Hd_CIM")
	public String getPatient_headcim() {
		return patient_headcim;
	}

	@JsonSetter("Pt_Hd_CIM")
	public void setPatient_headcim(String patient_headcim) {
		this.patient_headcim = patient_headcim;
	}

	@JsonGetter("Pt_bmi")
	public String getPatient_bmi() {
		return patient_bmi;
	}

	@JsonSetter("Pt_bmi")
	public void setPatient_bmi(String patient_bmi) {
		this.patient_bmi = patient_bmi;
	}

	@JsonGetter("Pt_Age_In_Months")
	public String getPatientFinalAgeInMonths() {
		return patientFinalAgeInMonths;
	}

	@JsonSetter("Pt_Age_In_Months")
	public void setPatientFinalAgeInMonths(String patientFinalAgeInMonths) {
		this.patientFinalAgeInMonths = patientFinalAgeInMonths;
	}

	@JsonGetter("Pt_Age_In_Years")
	public String getPatientFinalAgeInYears() {
		return patientFinalAgeInYears;
	}

	@JsonSetter("Pt_Age_In_Years")
	public void setPatientFinalAgeInYears(String patientFinalAgeInYears) {
		this.patientFinalAgeInYears = patientFinalAgeInYears;
	}

	@JsonGetter("standardAndPatientBMIDetailsDTOList")
	public List<StandardAndPatientBMIDetailsDTO> getStandardAndPatientBMIDetailsDTOList() {
		return standardAndPatientBMIDetailsDTOList;
	}

	@JsonSetter("standardAndPatientBMIDetailsDTOList")
	public void setStandardAndPatientBMIDetailsDTOList(
			List<StandardAndPatientBMIDetailsDTO> standardAndPatientBMIDetailsDTOList) {
		this.standardAndPatientBMIDetailsDTOList = standardAndPatientBMIDetailsDTOList;
	}

}
