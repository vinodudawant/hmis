package com.hms.ipd.daoimpl;

import java.lang.invoke.MethodHandles;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.dto.AdminChargeDTO;
import com.hms.dto.Assessment;
import com.hms.dto.DischargeSummery;
import com.hms.dto.Order_comp_druges;
import com.hms.dto.Order_master;
import com.hms.dto.PaediatricDept;
import com.hms.dto.PaediatricDeptNICU;
import com.hms.dto.RouteDTO;
import com.hms.ipd.dao.IPDDischargeSumDAO;
import com.hms.ipd.mapper.ObjectMapper;
import com.hms.model.DocBean;

@SuppressWarnings("unchecked")
@Repository
public class IPDDischargeSumDAOImpl implements IPDDischargeSumDAO {

	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	private @Autowired SessionFactory sessionFactory;

	@Override
	public List<RouteDTO> fetchAllMedicationMasterList(String pageType, String searhFlag, String searchText) {
		LOGGER.info("IPDDischargeSumDAOImpl called method fetchAllMedicationMasterList");
		String sql = "";
		List<RouteDTO> routeList = new ArrayList<RouteDTO>();
		try {
			if (searhFlag.equals("search")) {
				sql = "select route_id as idroute_master, routename as route_name, preparation as  preperation, preparation_name  from dd_route_master where deleted='N' and routename  like '"
						+ searchText + "%' ORDER BY CAST(preperation AS UNSIGNED) ASC ";
			} else {
				sql = "select route_id as idroute_master, routename as route_name, preparation as  preperation, preparation_name  from dd_route_master where deleted='N' ORDER BY CAST(preparation AS UNSIGNED) ASC ";
			}

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = query.list();
			routeList =ObjectMapper.setRouteDTO(list);
		} catch (Exception e) {
			e.printStackTrace();
			e.getMessage();
		}
		return routeList;
	}

	@Override
	public List<Assessment> fetchAssessment(String treatmentId) {
		LOGGER.info("IPDDischargeSumDAOImpl called method fetchAssessment");
		List<Assessment> arrAssessments = new ArrayList<Assessment>();
		String sql = "select count(*) from patient_daignosis_master where treatmentId=" + treatmentId;
		int count_id = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult()).intValue();

		if (count_id > 0) {

			sql = "SELECT max(id) FROM patient_daignosis_master WHERE treatmentId=" + treatmentId + " AND status ='Y'";
			int patient_daignosis_masterId = ((Number) sessionFactory.getCurrentSession().createSQLQuery(sql)
					.uniqueResult()).intValue();
			// For Diagnosied by Dr name.
			sql = "SELECT pds.*,concat(u.title,' ',u.f_name,' ',u.m_name,' ',u.l_name) AS user_name "
					+ "FROM patient_daignosis_slave pds left join users u on u.User_ID=pds.diagnosed_By "
					+ "WHERE patient_daignosis_masterId = :patient_daignosis_masterId AND pds.status ='Y'";
			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql)
					.setParameter("patient_daignosis_masterId", patient_daignosis_masterId);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = query.list();
			LOGGER.info("Assessment list size:" + list.size());
			arrAssessments =ObjectMapper.setAssessment(list);
		}
		return arrAssessments;
	}

	@Override
	public List<Order_master> featchOrderFormByDate(String tid, String date, String type) {
		LOGGER.info("IPDDischargeSumDAOImpl called method featchOrderFormByDate");
		List<Order_master> order_masterli = new ArrayList<Order_master>();
		String sql = "";
		if (type.equals("previous") || type.equals("previousAuto")) {
			sql = "select * from order_master where Treatment_ID = " + tid + "  and status='Y'";

			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> liOrderTemp = query.list();

			for (Map rs : liOrderTemp) {
				Order_master objOrder_master = new Order_master();
				objOrder_master.setDate_time((String) rs.get("date_time"));
				objOrder_master.setTreatment_ID((Integer) rs.get("Treatment_ID"));
				objOrder_master.setIdorder_master((Integer) rs.get("idorder_master"));
				objOrder_master.setStat_dose((String) rs.get("stat_dose"));
				int omID = (Integer) rs.get("idorder_master");
				if (type.equals("previous")) {
					List<Order_comp_druges> order_comp_drugesli = fetchPrevOrderCompDrugs(omID);
					objOrder_master.setOrder_comp_drugesList(order_comp_drugesli);
					order_masterli.add(objOrder_master);
				} else if (type.equals("previousAuto")) {
					List<Order_comp_druges> order_comp_drugesli = fetchOrderCompDruges(omID);
					objOrder_master.setOrder_comp_drugesList(order_comp_drugesli);
					order_masterli.add(objOrder_master);
				}

			}
		} else {
			sql = "select * from order_master where Treatment_ID = " + tid + " and date_time = " + date
					+ " and status='Y'";
			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> liOrderTemp = query.list();

			for (Map rs : liOrderTemp) {
				Order_master objOrder_master = new Order_master();
				objOrder_master.setDate_time((String) rs.get("date_time"));
				objOrder_master.setTreatment_ID((Integer) rs.get("Treatment_ID"));
				objOrder_master.setIdorder_master((Integer) rs.get("idorder_master"));
				objOrder_master.setStat_dose((String) rs.get("stat_dose"));
				int omID = (Integer) rs.get("idorder_master");
				List<Order_comp_druges> order_comp_drugesli = fetchOrderCompDruges(omID);
				objOrder_master.setOrder_comp_drugesList(order_comp_drugesli);
				order_masterli.add(objOrder_master);
			}
		}

		return order_masterli;
	}

	private List<Order_comp_druges> fetchOrderCompDruges(int omID) {
		LOGGER.info("IPDDischargeSumDAOImpl called method fetchOrderCompDruges");
		List<Order_comp_druges> order_comp_drugesli = new ArrayList<Order_comp_druges>();
		String sql = "";

		sql = "SELECT ocd.*,ppm.preparation_name AS preparation_name,"
				+ "IFNULL(concat(pi.english_Instruction,'/',pi.hindi_Instruction,'/',pi.marathi_Instruction),'') AS instruction "
				+ "FROM order_comp_druges ocd "
				+ "LEFT JOIN pharma_preparation_master ppm ON ppm.preparation_id=ocd.prep "
				+ "LEFT JOIN prescription_instruction pi ON pi.idprescription_Instruction=ocd.remarks "
				+ "WHERE ocd.idorder_master = " + omID
				+ " AND ocd.status = 'Y' AND ocd.treatDischargeToOrderFormFlag = 'OrderForm'";

		SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> liOrderTemp = query.list();
		for (Map rs : liOrderTemp) {
			Order_comp_druges objOrder_comp_druges = new Order_comp_druges();
			objOrder_comp_druges.setIdorder_comp_druges((Integer) rs.get("idorder_comp_druges"));
			objOrder_comp_druges.setIdorder_master((Integer) rs.get("idorder_master"));
			String preperation = (String) rs.get("prep");
			if (Integer.parseInt(preperation) != 0) {
				objOrder_comp_druges.setPrep((String) rs.get("prep"));
			} else {
				objOrder_comp_druges.setPrep("-");
			}
			objOrder_comp_druges.setDruges_doses((String) rs.get("druges_doses"));
			objOrder_comp_druges.setInvProdID((String) rs.get("invProdID"));
			objOrder_comp_druges.setStrength((String) rs.get("strength"));
			objOrder_comp_druges.setUnit((String) rs.get("unit"));
			objOrder_comp_druges.setDoseType((String) rs.get("doseType"));
			objOrder_comp_druges.setFrequency((String) rs.get("frequency"));
			objOrder_comp_druges.setRemarks((String) rs.get("remarks"));
			objOrder_comp_druges.setRoute((String) rs.get("route"));
			objOrder_comp_druges.setDays((String) rs.get("days"));
			objOrder_comp_druges.setQuantity((String) rs.get("quantity"));
			objOrder_comp_druges.setPharmaIndentStatus((String) rs.get("pharmaIndentStatus"));
			objOrder_comp_druges.setMorning((String) rs.get("morning"));
			objOrder_comp_druges.setAfternoon((String) rs.get("afternoon"));
			objOrder_comp_druges.setEvening((String) rs.get("evening"));
			objOrder_comp_druges.setNight((String) rs.get("night"));
			objOrder_comp_druges.setDayPrescription((String) rs.get("day_prescription"));
			objOrder_comp_druges.setTimePrescription((String) rs.get("time_Prescription"));
			objOrder_comp_druges.setPrepName((String) rs.get("preparation_name"));
			try {
				int InstructionId = Integer.parseInt(objOrder_comp_druges.getRemarks());
				sql = "SELECT * FROM prescription_instruction where idprescription_Instruction  = " + InstructionId;

				String instruction = "";
				String marathiInstruction = "";
				SQLQuery query2 = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> inslist = query2.list();

				for (Map rs1 : inslist) {
					String eng = (String) rs1.get("english_Instruction");
					String hin = (String) rs1.get("hindi_Instruction");
					String mar = (String) rs1.get("marathi_Instruction");
					marathiInstruction = (String) rs1.get("marathi_Instruction_forPrint");
					instruction = eng;
				}
				objOrder_comp_druges.setInstruction(instruction);
				objOrder_comp_druges.setMarathiInstruction(marathiInstruction);
			} catch (Exception e) {
				objOrder_comp_druges.setInstruction("");
			}
			order_comp_drugesli.add(objOrder_comp_druges);
		}
		return order_comp_drugesli;
	}

	private List<Order_comp_druges> fetchPrevOrderCompDrugs(int omID) {
		LOGGER.info("IPDDischargeSumDAOImpl called method fetchPrevOrderCompDrugs");
		List<Order_comp_druges> order_comp_drugesli = new ArrayList<Order_comp_druges>();
		String sqlOrder = "";
		// added
		sqlOrder = "select Treatment_ID from order_master where idorder_master=" + omID;

		Integer treatId = (Integer) sessionFactory.getCurrentSession().createSQLQuery(sqlOrder).uniqueResult();

		sqlOrder = "select ocd.*,ppm.preparation_name AS preparation_name from  "
				+ "order_comp_druges ocd left join pharma_preparation_master ppm on ocd.prep=ppm.preparation_id "
				+ "where ocd.idorder_master =? AND ocd.status = 'Y' AND ocd.treatDischargeToOrderFormFlag = 'Discharge'";

		SQLQuery query2 = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sqlOrder);
		query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> liOrderTemp = query2.list();

		for (Map rs : liOrderTemp) {
			Order_comp_druges objOrder_comp_druges = new Order_comp_druges();
			objOrder_comp_druges.setTreatmentID(treatId);
			objOrder_comp_druges.setUserID(1);
			objOrder_comp_druges.setIdorder_comp_druges((Integer) rs.get("idorder_comp_druges"));
			objOrder_comp_druges.setIdorder_master((Integer) rs.get("idorder_master"));
			String preperation = (String) rs.get("prep"); // Added By Pooja @Date:23Mar18
			if (Integer.parseInt(preperation) != 0) {
				objOrder_comp_druges.setPrep((String) rs.get("preparation_name"));
			} else {
				objOrder_comp_druges.setPrep("-");
			}
			objOrder_comp_druges.setDruges_doses((String) rs.get("druges_doses"));
			objOrder_comp_druges.setInvProdID((String) rs.get("invProdID"));
			objOrder_comp_druges.setStrength((String) rs.get("strength"));
			objOrder_comp_druges.setUnit((String) rs.get("unit"));
			objOrder_comp_druges.setDoseType((String) rs.get("doseType"));
			objOrder_comp_druges.setFrequency((String) rs.get("frequency"));
			objOrder_comp_druges.setRemarks((String) rs.get("remarks"));
			objOrder_comp_druges.setRoute((String) rs.get("route"));
			objOrder_comp_druges.setDays((String) rs.get("days"));
			objOrder_comp_druges.setQuantity((String) rs.get("quantity"));
			objOrder_comp_druges.setPharmaIndentStatus((String) rs.get("pharmaIndentStatus"));
			objOrder_comp_druges.setMorning((String) rs.get("morning"));
			objOrder_comp_druges.setAfternoon((String) rs.get("afternoon"));
			objOrder_comp_druges.setEvening((String) rs.get("evening"));
			objOrder_comp_druges.setNight((String) rs.get("night"));
			objOrder_comp_druges.setDayPrescription((String) rs.get("day_prescription"));
			try {
				int InstructionId = Integer.parseInt(objOrder_comp_druges.getRemarks());
				String sql = "SELECT * FROM prescription_instruction where idprescription_Instruction  = "
						+ InstructionId;
				String instruction = "";
				String marathiInstruction = "";
				SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> inslist = query.list();
				for (Map rs1 : inslist) {
					String eng = (String) rs1.get("english_Instruction");
					String hin = (String) rs1.get("hindi_Instruction");
					String mar = (String) rs1.get("marathi_Instruction");
					marathiInstruction = (String) rs1.get("marathi_Instruction_forPrint");
					instruction = eng;
				}
				objOrder_comp_druges.setInstruction(instruction);
				objOrder_comp_druges.setMarathiInstruction(marathiInstruction);
			} catch (Exception e) {
				objOrder_comp_druges.setInstruction("");
			}
			order_comp_drugesli.add(objOrder_comp_druges);
		}
		return order_comp_drugesli;
	}

	@Override
	public List<Order_master> featchTreatmentAtDischarge(String tid, String date, String type) {
		LOGGER.info("IPDDischargeSumDAOImpl called method featchTreatmentAtDischarge");
		List<Order_master> order_masterli = new ArrayList<Order_master>();
		String sql = "select * from order_master where Treatment_ID = " + tid + " and status='Y'";
		SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> liOrderTemp = query.list();

		for (Map rs : liOrderTemp) {
			Order_master objOrder_master = new Order_master();

			objOrder_master.setTreatment_ID((Integer) rs.get("Treatment_ID"));

			objOrder_master.setIdorder_master((Integer) rs.get("idorder_master"));

			objOrder_master.setStat_dose((String) rs.get("stat_dose"));
			int omID = (Integer) rs.get("idorder_master");
			int treatID = (Integer) rs.get("Treatment_ID");
			List<Order_comp_druges> order_comp_drugesli = fetchTreatmentAtDischrageOrderCompDruges(treatID);
			objOrder_master.setOrder_comp_drugesList(order_comp_drugesli);
			order_masterli.add(objOrder_master);
		}

		return order_masterli;
	}

	public List<Order_comp_druges> fetchTreatmentAtDischrageOrderCompDruges(int treatID) {
		LOGGER.info("IPDDischargeSumDAOImpl called method fetchTreatmentAtDischrageOrderCompDruges");
		List<Order_comp_druges> order_comp_drugesli = new ArrayList<Order_comp_druges>();
		String sqlOrder = "";

		/*
		 * sqlOrder =
		 * "select * from order_comp_druges where idorder_master=? AND status='Y' AND treatDischargeToOrderFormFlag='Discharge' "
		 * ;
		 */

		String sql = "select omd.idorder_comp_druges,om.idorder_master,ppm.preparation_name,omd.prep,omd.druges_doses,"
				+ "omd.invProdID,omd.strength,omd.unit,omd.doseType,omd.frequency,omd.route,omd.remarks,pi.english_Instruction,"
				+ "pi.hindi_Instruction_forPrint,pi.marathi_Instruction_forPrint,omd.days,omd.quantity,omd.pharmaIndentStatus,"
				+ "omd.morning,omd.afternoon,omd.evening,omd.night,omd.day_prescription  "
				+ "from order_master om,order_comp_druges omd left join prescription_instruction pi  on pi.idprescription_Instruction = omd.remarks ,"
				+ "pharma_preparation_master ppm where om.idorder_master = omd.idorder_master "
				+ "and omd.prep=ppm.preparation_id " + "and om.Treatment_ID = " + treatID
				+ " and om.status = 'Y' and omd.status='Y' and " + "omd.treatDischargeToOrderFormFlag = 'Discharge'";

		SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> liOrderTemp = query.list();

		for (Map rs : liOrderTemp) {

			Order_comp_druges objOrder_comp_druges = new Order_comp_druges();
			objOrder_comp_druges.setIdorder_comp_druges((Integer) rs.get("idorder_comp_druges"));
			objOrder_comp_druges.setIdorder_master((Integer) rs.get("idorder_master"));
			objOrder_comp_druges.setPrep((String) rs.get("prep"));

			objOrder_comp_druges.setDruges_doses((String) rs.get("druges_doses"));
			objOrder_comp_druges.setInvProdID((String) rs.get("invProdID"));
			objOrder_comp_druges.setStrength((String) rs.get("strength"));
			objOrder_comp_druges.setUnit((String) rs.get("unit"));
			objOrder_comp_druges.setDoseType((String) rs.get("doseType"));
			objOrder_comp_druges.setFrequency((String) rs.get("frequency"));
			objOrder_comp_druges.setRemarks((String) rs.get("remarks"));

			String instEnglish = (String) rs.get("english_Instruction");
			String instHindi = (String) rs.get("hindi_Instruction_forPrint");
			String instMarathi = (String) rs.get("marathi_Instruction_forPrint");
			String instruction = instEnglish + "/" + instHindi + "/" + instMarathi;

			objOrder_comp_druges.setInstruction(instruction);
			objOrder_comp_druges.setPrepName((String) rs.get("preparation_name"));

			objOrder_comp_druges.setRoute((String) rs.get("route"));
			objOrder_comp_druges.setDays((String) rs.get("days"));
			objOrder_comp_druges.setQuantity((String) rs.get("quantity"));
			objOrder_comp_druges.setPharmaIndentStatus((String) rs.get("pharmaIndentStatus"));
			objOrder_comp_druges.setMorning((String) rs.get("morning"));
			objOrder_comp_druges.setAfternoon((String) rs.get("afternoon"));
			objOrder_comp_druges.setEvening((String) rs.get("evening"));
			objOrder_comp_druges.setNight((String) rs.get("night"));
			objOrder_comp_druges.setDayPrescription((String) rs.get("day_prescription"));
			order_comp_drugesli.add(objOrder_comp_druges);
		}
		return order_comp_drugesli;
	}

	@Override
	public List<DischargeSummery> fetchDischargeAutoSummary(String patID, String treatID) {
		LOGGER.info("IPDDischargeSumDAOImpl called method fetchDischargeAutoSummary");
		List<DischargeSummery> dslist = new ArrayList<DischargeSummery>();
		List<AdminChargeDTO> dischargedateList = new ArrayList<AdminChargeDTO>();
		String pdType = "";
		try {

			String sql = "SELECT * FROM discharge_summery where Treatment_ID=" + treatID;
			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> dList = query.list();
			for (Map rs1 : dList) {
				DischargeSummery objDischargeSummery = new DischargeSummery();

				objDischargeSummery.setClinical_finding((String) rs1.get("clinical_finding"));
				objDischargeSummery.setDiagnosis((String) rs1.get("diagnosis"));
				objDischargeSummery.setRisk((String) rs1.get("risk"));
				objDischargeSummery.setComplications((String) rs1.get("complications"));
				objDischargeSummery.setPre_symptoms((String) rs1.get("pre_symptoms"));
				objDischargeSummery.setSpl_investigation((String) rs1.get("spl_investigation"));
				objDischargeSummery.setTreatment_given((String) rs1.get("treatment_given"));
				objDischargeSummery.setConditionAtDischarge((String) rs1.get("conditionAtDischarge"));
				objDischargeSummery.setTreatment_advised((String) rs1.get("treatment_advised"));
				objDischargeSummery.setIddischarge_summery((Integer) rs1.get("iddischarge_summery"));
				objDischargeSummery.setTreatmentGiven((String) rs1.get("medicine_given"));
				objDischargeSummery.setInvestigation((String) rs1.get("investigation"));
				objDischargeSummery.setPaed_dept((String) rs1.get("paed_dept"));

				objDischargeSummery.setInvestigationItem((String) rs1.get("investigation_item"));
				objDischargeSummery.setPhysiotherapyItem((String) rs1.get("physiotherapy_item"));
				objDischargeSummery.setDentalItem((String) rs1.get("dental_item"));
				objDischargeSummery.setPathologyItem((String) rs1.get("pathology_item"));
				objDischargeSummery.setCausalityItem((String) rs1.get("causality_service_item"));
				objDischargeSummery.setIdCustomizeTemplate((String) rs1.get("idCustomizeTemplate"));
				objDischargeSummery.setTemplateData((String) rs1.get("templateData"));
				objDischargeSummery.setDischarge_type((String) rs1.get("discharge_type"));
				objDischargeSummery.setPrimaryCOD((String) rs1.get("primaryCauseOfDeath"));
				objDischargeSummery.setSecondaryCOD((String) rs1.get("secondaryCauseOfDeath"));
				objDischargeSummery.setSignificantCondition((String) rs1.get("significantConditionOfDeath"));
				objDischargeSummery.setAdvisedOnDischarge((String) rs1.get("advisedOnDischarge"));

				pdType = (String) rs1.get("paed_dept");
				System.out.println("pdType==" + pdType);
				/******************** fetch paediatric_dept* PD ****************************/
				if (pdType != null && pdType != "" && !pdType.equals("NORMAL")) {
					if (pdType.equals("PD")) {

						String paedList = "SELECT * FROM paediatric_dept where Treatment_ID=" + treatID;
						SQLQuery query2 = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(paedList);
						query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> pList = query2.list();

						for (Map rs2 : pList) {
							PaediatricDept objpd = new PaediatricDept();
							objpd.setPastHistory((String) rs2.get("past_history"));
							objpd.setGeneralExamination((String) rs2.get("general_examination"));
							objpd.setCvs((String) rs2.get("cvs"));
							objpd.setRs((String) rs2.get("rs"));
							objpd.setPa((String) rs2.get("pa"));
							objpd.setCns((String) rs2.get("cns"));
							objpd.setPs((String) rs2.get("ps"));
							objpd.setPlateletCount((String) rs2.get("platelet_count"));
							objpd.setUrineR((String) rs2.get("urine_r"));
							objpd.setStoolR((String) rs2.get("stool_r"));
							objpd.setBsl((String) rs2.get("bsl"));
							objpd.setCsf((String) rs2.get("csf"));
							objpd.setOtt((String) rs2.get("ott"));
							objpd.setSrcalcium((String) rs2.get("srcalcium"));
							objpd.setCoombTest((String) rs2.get("coombs_test"));
							objpd.setPa((String) rs2.get("srna"));
							objpd.setPdsrk((String) rs2.get("srk"));
							objpd.setPdsrcl((String) rs2.get("srcl"));
							objpd.setSrBillirubin((String) rs2.get("sr_billirubin"));
							objpd.setUnconj1((String) rs2.get("unconj1"));
							objpd.setUnconj2((String) rs2.get("unconj2"));
							objpd.setX_ray((String) rs2.get("x_ray"));
							objpd.setUsg((String) rs2.get("usg"));
							objpd.setCt_mri((String) rs2.get("ct_mri"));
							objpd.setTt((String) rs2.get("tt"));
							objpd.setPdFOther((String) rs2.get("other"));
							objpd.setCourseOfRec((String) rs2.get("course_of_rec"));
							objpd.setPdManagement((String) rs2.get("management"));
							objpd.setImmunisationStatus((String) rs2.get("immunisation_status"));
							objpd.setOtherVaccines((String) rs2.get("other_vaccines"));
							objpd.setPdFOther((String) rs2.get("any_other"));
							objpd.setFollowUpAdvise((String) rs2.get("follow_up_advice"));
							objpd.setStatus((String) rs2.get("status"));
							objDischargeSummery.setPaediatricDept(objpd);
						}

					} else if (pdType.equals("nicuPD")) {

						String paedList = "SELECT * FROM paediatric_dept_nicu where Treatment_ID=" + treatID;
						SQLQuery query2 = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(paedList);
						query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> pnList = query2.list();

						for (Map rs3 : pnList) {
							PaediatricDeptNICU objpdn = new PaediatricDeptNICU();
							objpdn.setIpdNo((String) rs3.get("ipd_no"));

							objpdn.setBirthWeight((String) rs3.get("birth_weight"));
							objpdn.setWeightOnAdmission((String) rs3.get("weight_on_add"));
							objpdn.setWeightOnDischarge((String) rs3.get("weight_on_disc"));
							objpdn.setBabysData((String) rs3.get("babys_data"));
							objpdn.setDeliveryData((String) rs3.get("delivery_data"));
							objpdn.setConditionAtBirth((String) rs3.get("condition_at_birth"));
							objpdn.setAncAge((String) rs3.get("anc_age"));
							objpdn.setMbg((String) rs3.get("anc_mbg"));
							objpdn.setRh((String) rs3.get("anc_rh"));
							objpdn.setRegistration((String) rs3.get("registration"));
							objpdn.setImmunized((String) rs3.get("immunity"));
							objpdn.setSerHIV((String) rs3.get("serology_hiv"));
							objpdn.setHbsAG((String) rs3.get("hbs_Ag"));
							objpdn.setVdrl((String) rs3.get("vdrl"));
							objpdn.setDm((String) rs3.get("mh_dm"));
							objpdn.setHtn((String) rs3.get("mh_htn"));
							objpdn.setThyroid((String) rs3.get("thyroid_disorder"));
							objpdn.setFever((String) rs3.get("mh_fever_rash"));
							objpdn.setMedOther((String) rs3.get("mh_other"));
							objpdn.setObsProb((String) rs3.get("obsteric_problem"));
							objpdn.setCourseInHos((String) rs3.get("course_in_hospital"));
							objpdn.setFluids((String) rs3.get("iv_fluids"));
							objpdn.setAntibio((String) rs3.get("antibiotic"));
							objpdn.setSedation1((String) rs3.get("sedation1"));
							objpdn.setSedation2((String) rs3.get("sedation2"));
							objpdn.setDuration((String) rs3.get("ventilation_duration"));
							String vent_id = String.valueOf(rs3.get("ventilation_id"));
							
							String ventilation = "select * from ventilation where idventilation =" + vent_id;

							// get ventilation table data
							SQLQuery query3 = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(ventilation);
							query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> vent = query3.list();

							for (Map rs4 : vent) {
								/*
								 * 
								 * objpdn.setMode1((String) rs4.get("mode1")); objpdn.setMode2((String)
								 * rs4.get("mode2")); objpdn.setPip1((String) rs4.get("pip1"));
								 * objpdn.setPip2((String) rs4.get("pip2")); objpdn.setPeep1((String)
								 * rs4.get("peep1")); objpdn.setPeep2((String) rs4.get("peep2"));
								 * objpdn.setFio1((String) rs4.get("fio1")); objpdn.setFio2((String)
								 * rs4.get("fio2"));
								 */}

							objpdn.setOrganism((String) rs3.get("bc_org"));
							objpdn.setSensitive((String) rs3.get("sensitive_to"));
							objpdn.setBslmax((String) rs3.get("bsl_max"));
							objpdn.setBslmin((String) rs3.get("bsl_min"));
							objpdn.setSrk((String) rs3.get("srk"));
							objpdn.setElectrolyte((String) rs3.get("srna"));
							objpdn.setSrcl((String) rs3.get("srcl"));
							objpdn.setSrca((String) rs3.get("srca"));
							objpdn.setSrmg((String) rs3.get("srmg"));
							String ele_id = String.valueOf(rs3.get("electrolyte_id"));
							String electrolyte = "select * from electrolyte where idelectrolyte =" + ele_id;
							SQLQuery query4 = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(electrolyte);
							query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> ele = query4.list();

							for (Map rs5 : ele) {
								/*
								 * objpdn.setDate1((String) rs5.get("date1")); objpdn.setDate2((String)
								 * rs5.get("date2")); objpdn.setDate3((String) rs5.get("date3"));
								 * objpdn.setDate4((String) rs5.get("date4"));
								 * 
								 * objpdn.setBillirubin1((String) rs5.get("sr_billirubin1"));
								 * objpdn.setBillirubin2((String) rs5.get("sr_billirubin2"));
								 * objpdn.setBillirubin3((String) rs5.get("sr_billirubin3"));
								 * objpdn.setBillirubin4((String) rs5.get("sr_billirubin4"));
								 * 
								 * objpdn.setTotal1((String) rs5.get("total1")); objpdn.setTotal2((String)
								 * rs5.get("total2")); objpdn.setTotal3((String) rs5.get("total3"));
								 * objpdn.setTotal4((String) rs5.get("total4"));
								 * 
								 * objpdn.setIndirect1((String) rs5.get("indirect1"));
								 * objpdn.setIndirect2((String) rs5.get("indirect2"));
								 * objpdn.setIndirect3((String) rs5.get("indirect3"));
								 * objpdn.setIndirect4((String) rs5.get("indirect4"));
								 * 
								 * objpdn.setDirect1((String) rs5.get("direct1")); objpdn.setDirect2((String)
								 * rs5.get("direct2")); objpdn.setDirect3((String) rs5.get("direct3"));
								 * objpdn.setDirect4((String) rs5.get("direct4"));
								 * 
								 * objpdn.setPhototherapy1((String) rs5.get("phototheropy1"));
								 * objpdn.setPhototherapy2((String) rs5.get("phototheropy2"));
								 * objpdn.setPhototherapy3((String) rs5.get("phototheropy3"));
								 * objpdn.setPhototherapy4((String) rs5.get("phototheropy4"));
								 * 
								 */}
							objpdn.setXray((String) rs3.get("x_ray"));
							objpdn.setUsg((String) rs3.get("usg"));
							objpdn.setCtmri((String) rs3.get("ctmri"));
							objpdn.setOtherex((String) rs3.get("imaging_other"));
							String img_id = String.valueOf(rs3.get("imaging_id"));

							String imaging = "select * from imaging where idimaging =" + img_id;
							SQLQuery query5 = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(imaging);
							query5.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> img = query5.list();

							for (Map rs6 : img) {
								/*
								 * objpdn.setRedReflex1((String) rs6.get("red_reflex_rt"));
								 * objpdn.setRedReflex2((String) rs6.get("red_reflex_lt"));
								 * objpdn.setHips1((String) rs6.get("hips_rt")); objpdn.setHips2((String)
								 * rs6.get("hips_lt")); objpdn.setFemorals1((String) rs6.get("fimorals_rt"));
								 * objpdn.setFemorals2((String) rs6.get("fimorals_lt"));
								 * objpdn.setGenitals1((String) rs6.get("genitals_rt"));
								 * objpdn.setGenitals2((String) rs6.get("genitals_lt"));
								 * objpdn.setHernia1((String) rs6.get("hernia_rt")); objpdn.setHernia2((String)
								 * rs6.get("hernia_lt")); objpdn.setHeadcir1((String) rs6.get("head_cir_rt"));
								 * objpdn.setHeadcir2((String) rs6.get("head_cir_lt"));
								 * objpdn.setPcother1((String) rs6.get("other_rt")); objpdn.setPcother2((String)
								 * rs6.get("other_lt"));
								 */}

							String adid = String.valueOf(rs3.get("advice_on_disc_id"));

							String advice = "select * from advice_on_desc where idadvice_on_desc = " + adid;
							SQLQuery query6 = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(advice);
							query6.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> adv = query6.list();
							for (Map rs7 : adv) {
								/*
								 * objpdn.setRopScreen1((String) rs7.get("rop_screening_dt"));
								 * objpdn.setRopScreen2((String) rs7.get("rop_screening_place"));
								 * objpdn.setHearingScreen1((String) rs7.get("hearing_screening_dt"));
								 * objpdn.setHearingScreen2((String) rs7.get("hearing_screening_place"));
								 * objpdn.setUsgBrain1((String) rs7.get("usg_brain_dt"));
								 * objpdn.setUsgBrain2((String) rs7.get("usg_brain_place"));
								 * objpdn.setAdother1((String) rs7.get("other_dt")); objpdn.setAdother2((String)
								 * rs7.get("other_place"));
								 */}
							objpdn.setPriConsult((String) rs3.get("primary_conslt"));
							objpdn.setPriConsultDate((String) rs3.get("pc_date"));
							objpdn.setPriConsultTime((String) rs3.get("pc_time"));
							objpdn.setHrOPD((String) rs3.get("high_risk_opd"));
							objpdn.setHrOPDDate((String) rs3.get("hr_date"));
							objpdn.setHrOPDTime((String) rs3.get("hr_time"));
							objpdn.setFinalOther((String) rs3.get("other"));
							objDischargeSummery.setPaediatricDeptNicu(objpdn);
						}
					}
				}
				dslist.add(objDischargeSummery);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dslist;
	}

	@Override
	public List<DocBean> fetchDocuments(String tid, String patId) {
		LOGGER.info("IPDDischargeSumDAOImpl called method fetchDocuments");
		List<DocBean> documentsList = new ArrayList<DocBean>();
		String sql=null;
		try {
			if (tid.equalsIgnoreCase("-123")) 
				sql = "SELECT * FROM treatment_docs where patient_id ="+patId;			
			else 
				sql = "SELECT * FROM treatment_docs where treatment_id ="+tid;			

			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listDetails = query.list();
			documentsList =ObjectMapper.setDocBean(listDetails);
			return documentsList;
		} catch (HibernateException e) {
			e.printStackTrace();
			return documentsList;
		}
	}
	
	@Override
	public List<Assessment> EditAssessment(int id) {
		LOGGER.info("IPDDischargeSumDAOImpl called method fetchAssessment");
		List<Assessment> arrAssessments = new ArrayList<Assessment>();

		
		String sql;
			
			// For Diagnosied by Dr name.
			sql = "SELECT pds.*,concat(u.title,' ',u.f_name,' ',u.m_name,' ',u.l_name) AS user_name "
					+ "FROM patient_daignosis_slave pds left join users u on u.User_ID=pds.diagnosed_By "
					+ "WHERE id = :id AND pds.status ='Y'";
			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql)
					.setParameter("id", id);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = query.list();
			LOGGER.info("Assessment list size:" + list.size());
			arrAssessments =ObjectMapper.setAssessment(list);
	
		return arrAssessments;
	}
}
